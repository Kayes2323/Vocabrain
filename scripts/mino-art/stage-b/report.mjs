// Stage B report builder: layer sheet, clean-plate, inpaint map, arm gap test, diff sheet. Local only.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(new URL('../../../package.json', import.meta.url));
const sharp = require('sharp');
const W = 1536, H = 1024, N = W * H;
const OUT = '../out/';
const st = JSON.parse(fs.readFileSync(OUT + 'stats.json'));
const OWN = fs.readFileSync(OUT + 'ownership.bin');
const ID = st.ID, LAYERS = st.LAYERS;
const rawLayer = {};
for (const n of LAYERS) rawLayer[n] = await sharp(OUT + `layer-${n}.png`).ensureAlpha().raw().toBuffer();
const alpha = (n, i) => rawLayer[n][i * 4 + 3];

// ---- binary closing (square SE) via box sums ----
function boxSum(mask, r, dilateMode) { // returns Uint8: dilation (any in window) or erosion (all in window)
  const w = W, h = H; const tmp = new Int32Array(N), out = new Uint8Array(N);
  for (let y = 0; y < h; y++) { const row = y * w; const pre = new Int32Array(w + 1); for (let x = 0; x < w; x++) pre[x + 1] = pre[x] + mask[row + x];
    for (let x = 0; x < w; x++) { const a = Math.max(0, x - r), b = Math.min(w, x + r + 1); tmp[row + x] = pre[b] - pre[a]; } }
  for (let x = 0; x < w; x++) { const pre = new Int32Array(h + 1); for (let y = 0; y < h; y++) pre[y + 1] = pre[y] + tmp[y * w + x];
    for (let y = 0; y < h; y++) { const a = Math.max(0, y - r), b = Math.min(h, y + r + 1); const s = pre[b] - pre[a];
      out[y * w + x] = dilateMode ? (s > 0 ? 1 : 0) : 0; if (!dilateMode) { const full = (Math.min(w, 0) , 0); out[y * w + x] = s; } } }
  return out;
}
function dilate(m, r) { return boxSum(m, r, true); }
function erode(m, r) { const inv = new Uint8Array(N); for (let i = 0; i < N; i++) inv[i] = m[i] ? 0 : 1; const d = dilate(inv, r); const o = new Uint8Array(N); for (let i = 0; i < N; i++) o[i] = d[i] ? 0 : 1; return o; }
function close(m, r) { return erode(dilate(m, r), r); }
const solid = (n, th = 128) => { const m = new Uint8Array(N); for (let i = 0; i < N; i++) m[i] = alpha(n, i) >= th ? 1 : 0; return m; };
const nonzero = (n) => { const m = new Uint8Array(N); for (let i = 0; i < N; i++) m[i] = alpha(n, i) > 0 ? 1 : 0; return m; };
const ownedBy = (...names) => { const ids = names.map((n) => ID[n]); const m = new Uint8Array(N); for (let i = 0; i < N; i++) m[i] = ids.includes(OWN[i]) ? 1 : 0; return m; };

// ---- convex hull helper (estimate of a part's full extent) ----
function hullMask(maskArr) {
  const pts = []; for (let y = 0; y < H; y++) { let first = -1, last = -1; for (let x = 0; x < W; x++) if (maskArr[y * W + x]) { if (first < 0) first = x; last = x; } if (first >= 0) { pts.push([first, y]); pts.push([last, y]); } }
  pts.sort((p, q) => p[0] - q[0] || p[1] - q[1]); const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = []; for (const p of pts) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
  const up = []; for (const p of [...pts].reverse()) { while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
  const hull = lo.slice(0, -1).concat(up.slice(0, -1)); return hull;
}
async function rasterHull(maskArr) { const hull = hullMask(maskArr); const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="black"/><polygon points="${hull.map((p) => p.join(',')).join(' ')}" fill="white"/></svg>`;
  const { data } = await sharp(Buffer.from(svg)).greyscale().raw().toBuffer({ resolveWithObject: true }); const m = new Uint8Array(N); for (let i = 0; i < N; i++) m[i] = data[i] > 127 ? 1 : 0; return m; }
const unionMask = (...ms) => { const m = new Uint8Array(N); for (const a of ms) for (let i = 0; i < N; i++) if (a[i]) m[i] = 1; return m; };

// ---- hidden-pixel (inpaint) zones: ESTIMATES = (convex hull of the visible part) ∩ (pixels owned by a front layer) ----
const zones = {};
const hullBody = await rasterHull(solid('body'));
const hullArmL = await rasterHull(solid('armLeft')), hullArmR = await rasterHull(solid('armRight'));
const hullNote = await rasterHull(solid('notebook'));
const hullBackpack = await rasterHull(unionMask(solid('backpack'), solid('tag')));
const hullFootL = await rasterHull(solid('footL')), hullFootR = await rasterHull(solid('footR'));
function zone(name, closed, layerName, coveredBy) {
  const cov = ownedBy(...coveredBy); const z = new Uint8Array(N); let c = 0;
  for (let i = 0; i < N; i++) if (closed[i] && alpha(layerName, i) < 10 && cov[i]) { z[i] = 1; c++; }
  zones[name] = { mask: z, px: c };
}
zone('A. body hidden by arms / pencil / notebook / tag  (MUST be painted)', hullBody, 'body', ['armLeft', 'armRight', 'pencil', 'notebook', 'tag']);
zone('B. body hidden by head mask + eyes + mouth  (low priority)', hullBody, 'body', ['mask', 'eyeL', 'eyeR', 'mouth']);
zone('C. body hidden by feet  (low priority)', hullBody, 'body', ['footL', 'footR']);
zone('D. left arm hidden by pencil', hullArmL, 'armLeft', ['pencil']);
zone('E. right arm hidden by notebook', hullArmR, 'armRight', ['notebook']);
zone('F. notebook hidden by right arm', hullNote, 'notebook', ['armRight']);
zone('G. backpack hidden by tag / left arm / pencil  (extent uncertain)', hullBackpack, 'backpack', ['tag', 'armLeft', 'pencil']);
zone('H. foot tops hidden under body', unionMask(hullFootL, hullFootR), 'footL', ['body']);
const rimFilled = fs.readFileSync(OUT + 'rim-filled-mask.bin'), holeFilled = fs.readFileSync(OUT + 'filled-mask.bin');
{ const z = new Uint8Array(N); let c = 0; for (let i = 0; i < N; i++) if (rimFilled[i] || holeFilled[i]) { z[i] = 1; c++; } zones['I. mask under eyes/mouth  (flat-white PROTOTYPE FILL — not master pixels)'] = { mask: z, px: c }; }

// ---- 1) inpaint map ----
const src = await sharp('master.png').ensureAlpha().raw().toBuffer();
const cols = [[255, 0, 80], [255, 160, 0], [150, 0, 255], [0, 200, 255], [0, 220, 120], [255, 255, 0], [255, 0, 255], [120, 120, 255], [120, 120, 255], [255, 128, 0]];
const names = Object.keys(zones);
const mapBuf = Buffer.alloc(N * 3);
for (let i = 0; i < N; i++) { const a = src[i * 4 + 3] / 255; for (let c = 0; c < 3; c++) mapBuf[i * 3 + c] = Math.round(src[i * 4 + c] * a * 0.35 + 235 * (1 - a * 0.35)); }
names.forEach((nm, k) => { const z = zones[nm].mask, col = cols[k % cols.length]; for (let i = 0; i < N; i++) if (z[i]) { for (let c = 0; c < 3; c++) mapBuf[i * 3 + c] = Math.round(mapBuf[i * 3 + c] * 0.25 + col[c] * 0.75); } });
await sharp(mapBuf, { raw: { width: W, height: H, channels: 3 } }).extract({ left: 180, top: 0, width: 1160, height: 1000 }).png().toFile(OUT + 'inpaint-map.png');

// ---- 2) clean plate ----
const plateLayers = ['backpack', 'body', 'footR', 'footL', 'mask'];
const base = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 217, g: 211, b: 240, alpha: 1 } } }).png().toBuffer();
// holes overlay (magenta) where body hole zones lie
const holeOverlay = Buffer.alloc(N * 4);
for (const nm of names.slice(0, 1)) { const z = zones[nm].mask; for (let i = 0; i < N; i++) if (z[i]) { holeOverlay[i * 4] = 255; holeOverlay[i * 4 + 1] = 0; holeOverlay[i * 4 + 2] = 160; holeOverlay[i * 4 + 3] = 190; } }
const holePng = await sharp(holeOverlay, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
const plateFull = await sharp(base).composite([...plateLayers.map((n) => ({ input: OUT + `layer-${n}.png` })), { input: holePng }]).png().toBuffer();
await sharp(plateFull).extract({ left: 180, top: 0, width: 1160, height: 1000 }).png().toFile(OUT + 'clean-plate.png');
const plateNoHoles = await sharp(base).composite(plateLayers.map((n) => ({ input: OUT + `layer-${n}.png` }))).png().toBuffer();
await sharp(plateNoHoles).extract({ left: 180, top: 0, width: 1160, height: 1000 }).png().toFile(OUT + 'clean-plate-raw.png');

// ---- 3) layer sheet ----
const cell = 360, pad = 8, colsN = 4; const order = ['backpack', 'body', 'footL', 'footR', 'tag', 'mask', 'eyeL', 'eyeR', 'mouth', 'armLeft', 'armRight', 'notebook', 'pencil'];
const checker = (w, h) => { const s = 12; let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#fff"/>`; for (let y = 0; y < h; y += s) for (let x = 0; x < w; x += s) if (((x / s) + (y / s)) % 2 === 0) svg += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#d9d9e6"/>`; return Buffer.from(svg + '</svg>'); };
const tiles = [];
for (let k = 0; k < order.length; k++) {
  const n = order[k]; const [x0, y0, x1, y1] = st.stats[n].bbox; let bx0 = x0, by0 = y0, bx1 = x1, by1 = y1;
  if (n === 'body') { bx0 = 222; bx1 = 1290; by0 = 19; by1 = 991; } // exclude faint stray specks from crop
  const w = bx1 - bx0 + 1, h = by1 - by0 + 1; const sc = Math.min((cell - 2 * pad) / w, (cell - 2 * pad - 30) / h);
  const crop = await sharp(OUT + `layer-${n}.png`).extract({ left: bx0, top: by0, width: w, height: h }).resize(Math.max(1, Math.round(w * sc)), Math.max(1, Math.round(h * sc))).png().toBuffer();
  const meta = await sharp(crop).metadata();
  const tile = await sharp(checker(cell, cell)).composite([
    { input: crop, left: Math.round((cell - meta.width) / 2), top: 26 + Math.round((cell - 26 - meta.height) / 2) },
    { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cell}" height="26"><rect width="100%" height="26" fill="#241a4d"/><text x="8" y="18" font-size="14" font-family="sans-serif" fill="#fff">${k + 1}. ${n}  ·  ${st.stats[n].pixels.toLocaleString()} px  ·  bbox ${x0},${y0}–${x1},${y1}</text></svg>`), left: 0, top: 0 }]).png().toBuffer();
  tiles.push({ input: tile, left: (k % colsN) * (cell + 6), top: Math.floor(k / colsN) * (cell + 6) });
}
await sharp({ create: { width: colsN * (cell + 6), height: Math.ceil(order.length / colsN) * (cell + 6), channels: 3, background: '#ffffff' } }).composite(tiles).png().toFile(OUT + 'layer-sheet.png');

// ---- 4) arm rotation / gap test ----
const b64 = async (n) => 'data:image/png;base64,' + (await sharp(OUT + `layer-${n}.png`).toBuffer()).toString('base64');
const img = {}; for (const n of LAYERS) img[n] = await b64(n);
const neutralUnion = new Uint8Array(N); for (const n of LAYERS) for (let i = 0; i < N; i++) if (alpha(n, i) > 8) neutralUnion[i] = 1;
const sil = Buffer.alloc(N * 4); for (let i = 0; i < N; i++) if (neutralUnion[i] && hullBody[i]) { sil[i * 4] = 255; sil[i * 4 + 2] = 255; sil[i * 4 + 3] = 255; }
const silB64 = 'data:image/png;base64,' + (await sharp(sil, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer()).toString('base64');
const pivL = [540, 575], pivR = [1175, 540];
const frame = (aL, aR) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}"><rect width="100%" height="100%" fill="#d9d3f0"/>
<image href="${silB64}" width="${W}" height="${H}"/>
${['backpack', 'body', 'footR', 'footL', 'tag', 'mask', 'mouth', 'eyeR', 'eyeL'].map((n) => `<image href="${img[n]}" width="${W}" height="${H}"/>`).join('')}
<g transform="rotate(${aR} ${pivR[0]} ${pivR[1]})"><image href="${img.notebook}" width="${W}" height="${H}"/><image href="${img.armRight}" width="${W}" height="${H}"/></g>
<g transform="rotate(${aL} ${pivL[0]} ${pivL[1]})"><image href="${img.armLeft}" width="${W}" height="${H}"/><image href="${img.pencil}" width="${W}" height="${H}"/></g>
</svg>`;
const frames = [['neutral', 0, 0], ['left arm -20°', -20, 0], ['left arm +20°', 20, 0], ['right arm -20°', 0, -20], ['right arm +20°', 0, 20], ['both ±12° (wave-ish)', -12, 12]];
const gap = {}; const gtiles = [];
for (let k = 0; k < frames.length; k++) {
  const [label, aL, aR] = frames[k];
  const buf = await sharp(Buffer.from(frame(aL, aR)), { density: 72 }).raw().toBuffer({ resolveWithObject: true });
  let magenta = 0; for (let i = 0; i < N; i++) { const o = i * buf.info.channels; if (buf.data[o] > 235 && buf.data[o + 1] < 25 && buf.data[o + 2] > 235) magenta++; }
  gap[label] = magenta;
  const png = await sharp(Buffer.from(frame(aL, aR))).extract({ left: 180, top: 0, width: 1160, height: 1000 }).resize(386, 333).png().toBuffer();
  gtiles.push({ input: await sharp(png).composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="386" height="333"><rect width="386" height="22" fill="#241a4d"/><text x="6" y="16" font-size="13" font-family="sans-serif" fill="#fff">${label} · exposed gap ${magenta.toLocaleString()} px</text></svg>`) }]).png().toBuffer(), left: (k % 3) * 390, top: Math.floor(k / 3) * 337 });
}
await sharp({ create: { width: 3 * 390, height: 2 * 337, channels: 3, background: '#fff' } }).composite(gtiles).png().toFile(OUT + 'arm-gap-test.png');

// ---- summary json ----
const summary = { zones: Object.fromEntries(names.map((n) => [n, zones[n].px])), gapPx: gap, pivots: { left: pivL, right: pivR } };
fs.writeFileSync(OUT + 'report.json', JSON.stringify(summary, null, 1));
console.log(JSON.stringify(summary, null, 1));

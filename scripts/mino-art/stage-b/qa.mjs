// Stage B QA (local): neutral recomposite + pixel diff, rotation/gap tests, layer sheet with provenance,
// clean plate, facial-state previews. Reads ../out2 (complete.mjs) and ../out (extract.mjs).
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(new URL('../../../package.json', import.meta.url));
const sharp = require('sharp');
const W = 1536, H = 1024, N = W * H;
const DIR = process.cwd() + '/'; const O = DIR + '../out2/', I = DIR + '../out/';
const meta = JSON.parse(fs.readFileSync(O + 'complete.json'));
const layers = meta.layers;
const BASE = ['backpack', 'footR', 'footL', 'body', 'tag', 'mask'];
const FACE_DEFAULT = ['mouth', 'eyeR', 'eyeL'];
const FRONT = ['armRight', 'notebook', 'armRightHand', 'armLeft', 'pencil'];
const NEUTRAL = [...BASE, ...FACE_DEFAULT, ...FRONT];
const rd = (n) => sharp(O + `layer-${n}.png`).ensureAlpha().raw().toBuffer();
const px = {}; for (const n of Object.keys(layers)) px[n] = await rd(n);
const src = await sharp(DIR + 'master.png').ensureAlpha().raw().toBuffer();
const lav = [217, 211, 240];

// ---------- 1) neutral recomposite + diff ----------
const comp = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite(NEUTRAL.map((n) => ({ input: O + `layer-${n}.png` }))).raw().toBuffer();
await sharp(comp, { raw: { width: W, height: H, channels: 4 } }).png().toFile(O + 'recomposite.png');
let diffPx = 0, maxD = 0, sum = 0; const hist = { exact: 0, '1-2': 0, '3-8': 0, '9-32': 0, '33+': 0 }; const heat = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) { const sa = src[i * 4 + 3] / 255, ca = comp[i * 4 + 3] / 255; let d = Math.abs(src[i * 4 + 3] - comp[i * 4 + 3]);
  for (let c = 0; c < 3; c++) d = Math.max(d, Math.abs(src[i * 4 + c] * sa + lav[c] * (1 - sa) - (comp[i * 4 + c] * ca + lav[c] * (1 - ca))));
  if (d > 0) { diffPx++; sum += d; } if (d > maxD) maxD = d;
  if (d === 0) hist.exact++; else if (d <= 2) hist['1-2']++; else if (d <= 8) hist['3-8']++; else if (d <= 32) hist['9-32']++; else hist['33+']++;
  const v = Math.min(255, d * 8); heat[i * 4] = v; heat[i * 4 + 3] = 255; }
await sharp(heat, { raw: { width: W, height: H, channels: 4 } }).extract({ left: 180, top: 0, width: 1160, height: 1000 }).png().toFile(O + 'diff-heat.png');
const diff = { diffPx, pct: +(100 * diffPx / N).toFixed(3), maxChannelDiff: +maxD.toFixed(2), meanOverDiff: +(sum / Math.max(1, diffPx)).toFixed(2), hist };
// where do the >8 px live (bbox of the worst pixels) ?
let worst = []; for (let i = 0; i < N; i++) { const sa = src[i * 4 + 3] / 255, ca = comp[i * 4 + 3] / 255; let d = Math.abs(src[i * 4 + 3] - comp[i * 4 + 3]); for (let c = 0; c < 3; c++) d = Math.max(d, Math.abs(src[i * 4 + c] * sa + lav[c] * (1 - sa) - (comp[i * 4 + c] * ca + lav[c] * (1 - ca)))); if (d > 8) worst.push([i % W, (i / W) | 0, d]); }
diff.over8 = worst.length; if (worst.length) diff.over8Bbox = [Math.min(...worst.map((p) => p[0])), Math.min(...worst.map((p) => p[1])), Math.max(...worst.map((p) => p[0])), Math.max(...worst.map((p) => p[1]))];

// ---------- 2) hull (for gap definition) ----------
function hullPts(m) { const pts = []; for (let y = 0; y < H; y++) { let f = -1, l = -1; for (let x = 0; x < W; x++) if (m[y * W + x]) { if (f < 0) f = x; l = x; } if (f >= 0) { pts.push([f, y]); pts.push([l, y]); } }
  pts.sort((p, q) => p[0] - q[0] || p[1] - q[1]); const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = []; for (const p of pts) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
  const up = []; for (const p of [...pts].reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); } return lo.slice(0, -1).concat(up.slice(0, -1)); }
const bodyMask = new Uint8Array(N); for (let i = 0; i < N; i++) bodyMask[i] = px.body[i * 4 + 3] >= 128 ? 1 : 0;
const hp = hullPts(bodyMask); const hsvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="black"/><polygon points="${hp.map((p) => p.join(',')).join(' ')}" fill="white"/></svg>`;
const hd = await sharp(Buffer.from(hsvg)).greyscale().raw().toBuffer(); const hullBody = new Uint8Array(N); for (let i = 0; i < N; i++) hullBody[i] = hd[i] > 127 ? 1 : 0;
// neutral silhouette = union of original-master alpha (the shape the character actually has)
const neutralSil = new Uint8Array(N); for (let i = 0; i < N; i++) neutralSil[i] = src[i * 4 + 3] > 128 ? 1 : 0;

// ---------- 3) rotation / gap tests ----------
const b64 = async (n) => 'data:image/png;base64,' + (await sharp(O + `layer-${n}.png`).toBuffer()).toString('base64');
const img = {}; for (const n of Object.keys(layers)) img[n] = await b64(n);
const sil = Buffer.alloc(N * 4); for (let i = 0; i < N; i++) if (neutralSil[i] && hullBody[i]) { sil[i * 4] = 255; sil[i * 4 + 2] = 255; sil[i * 4 + 3] = 255; }
const silB64 = 'data:image/png;base64,' + (await sharp(sil, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer()).toString('base64');
const pivL = [540, 575], pivR = [1175, 540];
const stack = (aL, aR, underlay) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${underlay ? `<rect width="100%" height="100%" fill="#d9d3f0"/><image href="${silB64}" width="${W}" height="${H}"/>` : ''}
${[...BASE, ...FACE_DEFAULT].map((n) => `<image href="${img[n]}" width="${W}" height="${H}"/>`).join('')}
<g transform="rotate(${aR} ${pivR[0]} ${pivR[1]})"><image href="${img.armRight}" width="${W}" height="${H}"/><image href="${img.notebook}" width="${W}" height="${H}"/><image href="${img.armRightHand}" width="${W}" height="${H}"/></g>
<g transform="rotate(${aL} ${pivL[0]} ${pivL[1]})"><image href="${img.armLeft}" width="${W}" height="${H}"/><image href="${img.pencil}" width="${W}" height="${H}"/></g></svg>`;
const frames = [['neutral', 0, 0], ['L arm -20°', -20, 0], ['L arm +20°', 20, 0], ['R arm -20°', 0, -20], ['R arm +20°', 0, 20], ['both -12° / +12°', -12, 12], ['both +12° / -12°', 12, -12], ['both -20° / +20°', -20, 20]];
const gaps = {}; const gt = [];
for (let k = 0; k < frames.length; k++) { const [label, aL, aR] = frames[k];
  const raw = await sharp(Buffer.from(stack(aL, aR, false))).ensureAlpha().raw().toBuffer(); let gap = 0, thin = 0; for (let i = 0; i < N; i++) if (neutralSil[i] && hullBody[i]) { const a = raw[i * 4 + 3]; if (a < 200) gap++; else if (a < 250) thin++; }
  gaps[label] = { holesInsideBodyPx: gap, thinSeamPx: thin };
  const png = await sharp(Buffer.from(stack(aL, aR, true))).extract({ left: 180, top: 0, width: 1160, height: 1000 }).resize(386, 333).png().toBuffer();
  gt.push({ input: await sharp(png).composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="386" height="333"><rect width="386" height="22" fill="#241a4d"/><text x="6" y="16" font-size="13" font-family="sans-serif" fill="#fff">${label} · holes ${gap.toLocaleString()} px · thin ${thin.toLocaleString()}</text></svg>`) }]).png().toBuffer(), left: (k % 4) * 390, top: Math.floor(k / 4) * 337 }); }
await sharp({ create: { width: 4 * 390, height: 2 * 337, channels: 3, background: '#fff' } }).composite(gt).png().toFile(O + 'arm-gap-test.png');

// ---------- 4) clean plate (no movable parts) ----------
const base = await sharp({ create: { width: W, height: H, channels: 4, background: '#d9d3f0' } }).png().toBuffer();
await sharp(await sharp(base).composite(BASE.map((n) => ({ input: O + `layer-${n}.png` }))).png().toBuffer()).extract({ left: 180, top: 0, width: 1160, height: 1000 }).png().toFile(O + 'clean-plate.png');

// ---------- 5) facial-state previews ----------
const states = [['neutral (original)', ['eyeL', 'eyeR', 'mouth']], ['blink', ['eyeL-closed', 'eyeR-closed', 'mouth']], ['wink (right eye)', ['eyeL', 'eyeR-wink', 'mouth']], ['mouth small-open', ['eyeL', 'eyeR', 'mouth-small']], ['mouth wide-open', ['eyeL', 'eyeR', 'mouth-wide']], ['blink + wide-open', ['eyeL-closed', 'eyeR-closed', 'mouth-wide']]];
const ft = []; const fw = 590, fh = 400;
for (let k = 0; k < states.length; k++) { const [label, parts] = states[k];
  const full = await sharp(base).composite([...BASE.map((n) => ({ input: O + `layer-${n}.png` })), ...parts.map((n) => ({ input: O + `layer-${n}.png` }))]).png().toBuffer();
  const crop = await sharp(full).extract({ left: 540, top: 170, width: fw, height: fh }).png().toBuffer();
  ft.push({ input: await sharp(crop).composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${fw}" height="${fh}"><rect width="${fw}" height="24" fill="#241a4d"/><text x="8" y="17" font-size="14" font-family="sans-serif" fill="#fff">${label}</text></svg>`) }]).png().toBuffer(), left: (k % 3) * (fw + 6), top: Math.floor(k / 3) * (fh + 6) }); }
await sharp({ create: { width: 3 * (fw + 6), height: 2 * (fh + 6), channels: 3, background: '#fff' } }).composite(ft).png().toFile(O + 'face-states.png');

// ---------- 6) provenance counts + map + layer sheet ----------
const holeF = fs.readFileSync(I + 'filled-mask.bin'), rimF = fs.readFileSync(I + 'rim-filled-mask.bin');
const prov = {}; const gen = new Set(['eyeL-closed', 'eyeR-closed', 'eyeR-wink', 'mouth-small', 'mouth-wide']);
for (const n of Object.keys(layers)) { const rc = fs.readFileSync(O + `recon-${n}.bin`); let orig = 0, rec = 0, proto = 0, g = 0;
  for (let i = 0; i < N; i++) { const a = px[n][i * 4 + 3]; if (!a) continue; if (gen.has(n)) g++; else if (rc[i]) rec++; else if (n === 'mask' && (holeF[i] || rimF[i])) proto++; else orig++; }
  prov[n] = { original: orig, locallyReconstructed: rec, prototypeFillOfMask: proto, locallyGenerated: g }; }
const map = Buffer.alloc(N * 3); for (let i = 0; i < N * 3; i++) map[i] = 235;
const paint = (n, col, which) => { const rc = fs.readFileSync(O + `recon-${n}.bin`); for (let i = 0; i < N; i++) { const a = px[n][i * 4 + 3] / 255; if (!a) continue; const isRec = rc[i], isProto = n === 'mask' && (holeF[i] || rimF[i]); if (which === 'orig' && (isRec || isProto)) continue; if (which === 'rec' && !(isRec || isProto)) continue; const c = which === 'orig' ? [px[n][i * 4], px[n][i * 4 + 1], px[n][i * 4 + 2]] : (isProto ? [255, 160, 0] : col); for (let k = 0; k < 3; k++) map[i * 3 + k] = Math.round(map[i * 3 + k] * (1 - a) + (which === 'orig' ? c[k] * 0.45 + 235 * 0.55 : c[k]) * a); } };
for (const n of NEUTRAL) paint(n, null, 'orig'); for (const n of NEUTRAL) paint(n, [0, 200, 110], 'rec');
await sharp(map, { raw: { width: W, height: H, channels: 3 } }).extract({ left: 180, top: 0, width: 1160, height: 1000 }).png().toFile(O + 'provenance-map.png');

const order = ['backpack', 'body', 'footL', 'footR', 'tag', 'mask', 'eyeL', 'eyeR', 'mouth', 'eyeL-closed', 'eyeR-closed', 'eyeR-wink', 'mouth-small', 'mouth-wide', 'armLeft', 'armRight', 'armRightHand', 'notebook', 'pencil'];
const cell = 340, cols = 5; const tiles = [];
const checker = (w, h) => { const s = 12; let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#fff"/>`; for (let y = 0; y < h; y += s) for (let x = 0; x < w; x += s) if (((x / s) + (y / s)) % 2 === 0) svg += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#d9d9e6"/>`; return Buffer.from(svg + '</svg>'); };
for (let k = 0; k < order.length; k++) { const n = order[k]; const [x0, y0, x1, y1] = layers[n].bbox; let bx0 = x0, by0 = y0, bx1 = x1, by1 = y1; if (n === 'body') { bx0 = 222; bx1 = 1290; by0 = 19; by1 = 991; }
  const w = bx1 - bx0 + 1, h = by1 - by0 + 1, sc = Math.min((cell - 16) / w, (cell - 16 - 44) / h);
  const crop = await sharp(O + `layer-${n}.png`).extract({ left: bx0, top: by0, width: w, height: h }).resize(Math.max(1, Math.round(w * sc)), Math.max(1, Math.round(h * sc))).png().toBuffer(); const m = await sharp(crop).metadata(); const p = prov[n];
  const tag = gen.has(n) ? `LOCAL-GENERATED ${p.locallyGenerated.toLocaleString()} px` : `orig ${p.original.toLocaleString()} · recon ${(p.locallyReconstructed + p.prototypeFillOfMask).toLocaleString()}`;
  tiles.push({ input: await sharp(checker(cell, cell)).composite([{ input: crop, left: Math.round((cell - m.width) / 2), top: 44 + Math.round((cell - 44 - m.height) / 2) }, { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cell}" height="44"><rect width="100%" height="44" fill="${gen.has(n) ? '#0a5a3a' : '#241a4d'}"/><text x="8" y="17" font-size="13" font-family="sans-serif" fill="#fff">${k + 1}. ${n}</text><text x="8" y="36" font-size="12" font-family="sans-serif" fill="#ddd">${tag}</text></svg>`), left: 0, top: 0 }]).png().toBuffer(), left: (k % cols) * (cell + 6), top: Math.floor(k / cols) * (cell + 6) }); }
await sharp({ create: { width: cols * (cell + 6), height: Math.ceil(order.length / cols) * (cell + 6), channels: 3, background: '#fff' } }).composite(tiles).png().toFile(O + 'layer-sheet.png');

const out = { diff, gaps, provenance: prov };
fs.writeFileSync(O + 'qa.json', JSON.stringify(out, null, 1)); console.log(JSON.stringify(out, null, 1));

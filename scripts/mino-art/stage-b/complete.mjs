// Stage B completion (local only): repair hidden regions, clean edges, feather internal seams,
// and draw matching facial states. Inputs: ../out/layer-*.png from extract.mjs. Outputs: ../out2/.
// Every pixel that is not a master pixel is recorded in a reconstruction mask (provenance).
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(new URL('../../../package.json', import.meta.url));
const sharp = require('sharp');
const W = 1536, H = 1024, N = W * H;
const DIR = process.cwd() + '/';
const IN = DIR + '../out/', OUT = DIR + '../out2/';
fs.mkdirSync(OUT, { recursive: true });

const st = JSON.parse(fs.readFileSync(IN + 'stats.json'));
const LAYERS = st.LAYERS, ID = st.ID;
const OWN = fs.readFileSync(IN + 'ownership.bin');
const MS = await sharp(DIR + 'master.png').ensureAlpha().raw().toBuffer(); const MA = (i) => MS[i * 4 + 3]; // master alpha
const L = {}; for (const n of LAYERS) L[n] = Uint8Array.from(await sharp(IN + `layer-${n}.png`).ensureAlpha().raw().toBuffer());
const recon = {}; for (const n of LAYERS) recon[n] = new Uint8Array(N); // 1 = pixel not taken from the master
const A = (n, i) => L[n][i * 4 + 3];

// ---------------- utilities ----------------
function boxAny(mask, r) { // dilation (square) via prefix sums
  const tmp = new Int32Array(N), out = new Uint8Array(N);
  for (let y = 0; y < H; y++) { const row = y * W; const pre = new Int32Array(W + 1); for (let x = 0; x < W; x++) pre[x + 1] = pre[x] + mask[row + x];
    for (let x = 0; x < W; x++) tmp[row + x] = pre[Math.min(W, x + r + 1)] - pre[Math.max(0, x - r)]; }
  for (let x = 0; x < W; x++) { const pre = new Int32Array(H + 1); for (let y = 0; y < H; y++) pre[y + 1] = pre[y] + tmp[y * W + x];
    for (let y = 0; y < H; y++) out[y * W + x] = (pre[Math.min(H, y + r + 1)] - pre[Math.max(0, y - r)]) > 0 ? 1 : 0; }
  return out;
}
const invert = (m) => { const o = new Uint8Array(N); for (let i = 0; i < N; i++) o[i] = m[i] ? 0 : 1; return o; };
const erodeBox = (m, r) => invert(boxAny(invert(m), r));
const maskOf = (pred) => { const m = new Uint8Array(N); for (let i = 0; i < N; i++) m[i] = pred(i) ? 1 : 0; return m; };
const ownedBy = (...names) => { const ids = names.map((n) => ID[n]); return maskOf((i) => ids.includes(OWN[i])); };

function hullPts(m) {
  const pts = []; for (let y = 0; y < H; y++) { let f = -1, l = -1; for (let x = 0; x < W; x++) if (m[y * W + x]) { if (f < 0) f = x; l = x; } if (f >= 0) { pts.push([f, y]); pts.push([l, y]); } }
  pts.sort((p, q) => p[0] - q[0] || p[1] - q[1]); const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = []; for (const p of pts) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
  const up = []; for (const p of [...pts].reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
  return lo.slice(0, -1).concat(up.slice(0, -1));
}
async function hullMask(m) {
  const h = hullPts(m); const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="black"/><polygon points="${h.map((p) => p.join(',')).join(' ')}" fill="white"/></svg>`;
  const { data } = await sharp(Buffer.from(svg)).greyscale().raw().toBuffer({ resolveWithObject: true }); return maskOf((i) => data[i] > 127);
}
function removeSmallComponents(name, minSize, th = 128) { // zero out alpha of connected blobs smaller than minSize px (specks / slivers)
  const lab = new Int32Array(N), st2 = new Int32Array(N), sizes = []; let nid = 0;
  for (let q = 0; q < N; q++) { if (lab[q] || A(name, q) < th) continue; nid++; let sp = 0, c = 0; st2[sp++] = q; lab[q] = nid;
    while (sp) { const i = st2[--sp]; c++; const x = i % W, y = (i / W) | 0; for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1]) if (j >= 0 && !lab[j] && A(name, j) >= th) { lab[j] = nid; st2[sp++] = j; } }
    sizes[nid] = c; }
  let removed = 0; for (let i = 0; i < N; i++) if (A(name, i) > 0 && lab[i] !== 0 && sizes[lab[i]] < minSize) { L[name][i * 4 + 3] = 0; removed++; } return removed;
}

// ---------------- push-pull inpainting (smooth low-frequency extension) ----------------
function pushPull(known, rgb) {
  const lv = []; let w = W, h = H;
  let ws = new Float32Array(N), cs = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) if (known[i]) { ws[i] = 1; for (let c = 0; c < 3; c++) cs[i * 3 + c] = rgb[i * 3 + c]; }
  lv.push({ w, h, ws, cs });
  while (w > 1 || h > 1) {
    const nw = (w + 1) >> 1, nh = (h + 1) >> 1, w2 = new Float32Array(nw * nh), c2 = new Float32Array(nw * nh * 3);
    for (let y = 0; y < nh; y++) for (let x = 0; x < nw; x++) { let sw = 0, s0 = 0, s1 = 0, s2 = 0;
      for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) { const xx = 2 * x + dx, yy = 2 * y + dy; if (xx < w && yy < h) { const k = yy * w + xx; sw += ws[k]; s0 += cs[k * 3]; s1 += cs[k * 3 + 1]; s2 += cs[k * 3 + 2]; } }
      const o = y * nw + x; w2[o] = sw / 4; c2[o * 3] = s0 / 4; c2[o * 3 + 1] = s1 / 4; c2[o * 3 + 2] = s2 / 4; }
    w = nw; h = nh; ws = w2; cs = c2; lv.push({ w, h, ws, cs });
  }
  // pull
  let top = lv[lv.length - 1]; let R = new Float32Array(top.w * top.h * 3);
  for (let i = 0; i < top.w * top.h; i++) for (let c = 0; c < 3; c++) R[i * 3 + c] = top.ws[i] > 0 ? top.cs[i * 3 + c] / top.ws[i] : 128;
  for (let l = lv.length - 2; l >= 0; l--) {
    const { w: fw, h: fh, ws: fws, cs: fcs } = lv[l], cw = lv[l + 1].w, ch = lv[l + 1].h; const Rn = new Float32Array(fw * fh * 3);
    for (let y = 0; y < fh; y++) for (let x = 0; x < fw; x++) {
      const gx = Math.min(cw - 1, Math.max(0, (x + 0.5) / 2 - 0.5)), gy = Math.min(ch - 1, Math.max(0, (y + 0.5) / 2 - 0.5)); const x0 = Math.floor(gx), y0 = Math.floor(gy), x1 = Math.min(cw - 1, x0 + 1), y1 = Math.min(ch - 1, y0 + 1), tx = gx - x0, ty = gy - y0; const o = y * fw + x;
      for (let c = 0; c < 3; c++) { const up = (R[(y0 * cw + x0) * 3 + c] * (1 - tx) + R[(y0 * cw + x1) * 3 + c] * tx) * (1 - ty) + (R[(y1 * cw + x0) * 3 + c] * (1 - tx) + R[(y1 * cw + x1) * 3 + c] * tx) * ty;
        const wv = Math.min(1, fws[o]); Rn[o * 3 + c] = fws[o] > 0 ? (fcs[o * 3 + c] + (1 - wv) * up * 1) / (wv + (1 - wv)) : up; if (wv >= 1) Rn[o * 3 + c] = fcs[o * 3 + c]; } }
    R = Rn;
  }
  return R;
}
// seeded PRNG
const rng = (seed) => () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };

// Fill `zone` pixels of layer `name`: smooth extension + fur residual taken from real pixels of the same layer.
function fillZone(name, zone, { block = 32, seed = 7, lowR = 4, maxRes = 38 } = {}) {
  const buf = L[name]; const zc = zone.reduce((a, v) => a + v, 0); if (!zc) return 0;
  const lowA = maskOf((i) => buf[i * 4 + 3] < 128);
  const bad = boxAny(zone.map((v, i) => (v || lowA[i] ? 1 : 0)), 3);              // keep 3 px away from holes and silhouette edges
  const known = maskOf((i) => buf[i * 4 + 3] >= 250 && !bad[i] && !zone[i]);
  const rgb = new Float32Array(N * 3); for (let i = 0; i < N; i++) if (known[i]) for (let c = 0; c < 3; c++) rgb[i * 3 + c] = buf[i * 4 + c];
  const pp = pushPull(known, rgb);
  // residual = pixel - low-pass(known) (normalised box blur, radius 4, 2 passes)
  const wk = new Float32Array(N), ck = new Float32Array(N * 3); for (let i = 0; i < N; i++) if (known[i]) { wk[i] = 1; for (let c = 0; c < 3; c++) ck[i * 3 + c] = rgb[i * 3 + c]; }
  // channel-wise blur (simple, one-off cost)
  const blurCh = (src, stride, c) => { const r = lowR, tmp = new Float32Array(N), out = new Float32Array(N);
    for (let y = 0; y < H; y++) { let s = 0; for (let x = -r; x <= r; x++) s += src[(y * W + Math.min(W - 1, Math.max(0, x))) * stride + c]; for (let x = 0; x < W; x++) { tmp[y * W + x] = s; s += src[(y * W + Math.min(W - 1, x + r + 1)) * stride + c] - src[(y * W + Math.max(0, x - r)) * stride + c]; } }
    for (let x = 0; x < W; x++) { let s = 0; for (let y = -r; y <= r; y++) s += tmp[Math.min(H - 1, Math.max(0, y)) * W + x]; for (let y = 0; y < H; y++) { out[y * W + x] = s; s += tmp[Math.min(H - 1, y + r + 1) * W + x] - tmp[Math.max(0, y - r) * W + x]; } } return out; };
  const bw = blurCh(wk, 1, 0), low = [0, 1, 2].map((c) => blurCh(ck, 3, c));
  const res = new Float32Array(N * 3), resOk = new Uint8Array(N);
  for (let i = 0; i < N; i++) if (known[i] && bw[i] > 0.5 * (2 * lowR + 1) ** 2) { resOk[i] = 1; for (let c = 0; c < 3; c++) res[i * 3 + c] = rgb[i * 3 + c] - low[c][i] / bw[i]; }
  // valid source blocks (fully known+residual-ok) using an integral image
  const ii = new Int32Array((W + 1) * (H + 1)); for (let y = 0; y < H; y++) { let row = 0; for (let x = 0; x < W; x++) { row += resOk[y * W + x]; ii[(y + 1) * (W + 1) + x + 1] = ii[y * (W + 1) + x + 1] + row; } }
  const full = (x, y) => x + block <= W && y + block <= H && (ii[(y + block) * (W + 1) + x + block] - ii[y * (W + 1) + x + block] - ii[(y + block) * (W + 1) + x] + ii[y * (W + 1) + x]) === block * block;
  const clean = (x, y) => { for (let yy = y; yy < y + block; yy += 2) for (let xx = x; xx < x + block; xx += 2) { const o = (yy * W + xx) * 3; if (Math.abs(res[o]) > maxRes || Math.abs(res[o + 1]) > maxRes || Math.abs(res[o + 2]) > maxRes) return false; } return true; };
  const srcs = []; for (let y = 0; y + block <= H; y += 8) for (let x = 0; x + block <= W; x += 8) if (full(x, y) && clean(x, y)) srcs.push([x, y]);
  const rnd = rng(seed); const pick = new Map(); let count = 0;
  for (let i = 0; i < N; i++) if (zone[i]) { const x = i % W, y = (i / W) | 0; const bx = (x / block) | 0, by = (y / block) | 0, key = by * 4096 + bx;
    if (!pick.has(key)) pick.set(key, srcs.length ? srcs[(rnd() * srcs.length) | 0] : null);
    const sblk = pick.get(key); const o = i * 4;
    for (let c = 0; c < 3; c++) { let v = pp[i * 3 + c]; if (sblk) { const sx = sblk[0] + (x % block), sy = sblk[1] + (y % block); v += res[(sy * W + sx) * 3 + c]; } buf[o + c] = Math.max(0, Math.min(255, Math.round(v))); }
    buf[o + 3] = 253; recon[name][i] = 1; count++; }
  return count;
}

// ---------------- 1) cleanup of original layers ----------------
const report = { cleanup: {}, fills: {}, feather: {} };
const rgbToHsv = (r, g, b) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0; if (d > 0) { if (mx === r) h = ((g - b) / d) % 6; else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4; h *= 60; if (h < 0) h += 360; } return [h, mx === 0 ? 0 : d / mx, mx]; };
for (const arm of ['armLeft', 'armRight']) {
  report.cleanup[arm] = { strayRemoved: removeSmallComponents(arm, 400), defringed: 0 };
  const buf = L[arm]; const lowA = maskOf((i) => buf[i * 4 + 3] < 128); const edge = boxAny(lowA, 3);
  const fixes = [];
  for (let i = 0; i < N; i++) { if (buf[i * 4 + 3] === 0 || !edge[i]) continue; const [h, s, v] = rgbToHsv(buf[i * 4], buf[i * 4 + 1], buf[i * 4 + 2]); const purple = h >= 232 && h <= 290 && s > 0.3 && v > 0.45; if (purple) continue;
    const x = i % W, y = (i / W) | 0; let r = 0, g = 0, b = 0, c = 0; for (let dy = -7; dy <= 7; dy++) for (let dx = -7; dx <= 7; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const j = yy * W + xx; if (buf[j * 4 + 3] >= 250 && !edge[j]) { r += buf[j * 4]; g += buf[j * 4 + 1]; b += buf[j * 4 + 2]; c++; } }
    if (c) fixes.push([i, r / c, g / c, b / c]); }
  for (const [i, r, g, b] of fixes) { buf[i * 4] = Math.round(r); buf[i * 4 + 1] = Math.round(g); buf[i * 4 + 2] = Math.round(b); recon[arm][i] = 1; }
  report.cleanup[arm].defringed = fixes.length;
}
report.cleanup.footLStray = removeSmallComponents('footL', 300);
report.cleanup.footRStray = removeSmallComponents('footR', 300);

// ---------------- 2) fill hidden regions ----------------
const solid = (n) => maskOf((i) => A(n, i) >= 128);
const hullBody = await hullMask(solid('body')), hullArmL = await hullMask(solid('armLeft')), hullArmR = await hullMask(solid('armRight'));
const hullNote = await hullMask(solid('notebook')), hullBP = await hullMask(maskOf((i) => A('backpack', i) >= 128 || A('tag', i) >= 128));
const hullFL = await hullMask(solid('footL')), hullFR = await hullMask(solid('footR'));
const lowOf = (n) => maskOf((i) => A(n, i) < 10);
const maskOwned = ownedBy('mask', 'eyeL', 'eyeR', 'mouth'); const maskInner = erodeBox(maskOwned, 48);
const zBody = maskOf((i) => hullBody[i] && A('body', i) < 10 && (['armLeft', 'armRight', 'pencil', 'notebook', 'tag'].some((n) => OWN[i] === ID[n]) || (maskOwned[i] && !maskInner[i])));
const zBP = maskOf((i) => hullBP[i] && A('backpack', i) < 10 && OWN[i] !== 0 && OWN[i] !== ID.backpack);
{ // body leftovers (pale page edges, dark specks, grey ring remnants) next to the covered area are not body fur: re-fill them too
  const near = boxAny(zBody, 8); const b = L.body; let c = 0;
  for (let i = 0; i < N; i++) if (near[i] && !zBody[i] && b[i * 4 + 3] > 0) { const [h, sat, v] = rgbToHsv(b[i * 4], b[i * 4 + 1], b[i * 4 + 2]); const pale = sat < 0.3 && v > 0.6, foreign = sat > 0.25 && v > 0.25 && (h < 100 || h > 320); if (pale || foreign) { b[i * 4 + 3] = 0; zBody[i] = 1; c++; } }
  report.cleanup.bodyLeftoversRefilled = c; }
// Outline of the true torso: along rows where the arms/notebook hide the silhouette, interpolate it (minimum-curvature)
// from the visible rows above and below, and never fill beyond it - the hull alone can bulge wider than the real body.
{
  // exterior = transparent pixels connected to the image border (small transparent slivers inside the figure don't count)
  const EXT = new Uint8Array(N); { const st3 = new Int32Array(N); let sp = 0; const push = (j) => { if (!EXT[j] && MA(j) < 40) { EXT[j] = 1; st3[sp++] = j; } };
    for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x); } for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1); }
    while (sp) { const i = st3[--sp]; const x = i % W, y = (i / W) | 0; if (x > 0) push(i - 1); if (x < W - 1) push(i + 1); if (y > 0) push(i - W); if (y < H - 1) push(i + W); } }
  const exterior = (i) => { const x = i % W, y = (i / W) | 0; for (const [dx, dy] of [[-4, 0], [4, 0], [0, -4], [0, 4], [-3, -3], [3, 3], [-3, 3], [3, -3]]) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) return true; const j = yy * W + xx; if (EXT[j]) return true; if ([ID.backpack, ID.tag, ID.footL, ID.footR].includes(OWN[j])) return true; } return false; };
  // a row's silhouette edge is "visible" when the first/last non-backpack pixel on it belongs to the torso itself
  // (not to an arm, the pencil, the notebook, a foot or the mask which may stick out past it)
  const xl = new Float32Array(H).fill(NaN), xr = new Float32Array(H).fill(NaN);
  const skip = (o) => o === ID.backpack || o === ID.tag;
  for (let y = 0; y < H; y++) {
    let x = 0; for (; x < W; x++) { const i = y * W + x; if (MA(i) > 128 && !skip(OWN[i])) break; }
    if (x < W && OWN[y * W + x] === ID.body) xl[y] = x;
    let x2 = W - 1; for (; x2 >= 0; x2--) { const i = y * W + x2; if (MA(i) > 128 && !skip(OWN[i])) break; }
    if (x2 >= 0 && OWN[y * W + x2] === ID.body) xr[y] = x2;
  }
  const relax = (arr) => { const known = arr.map((v) => !Number.isNaN(v)); let a = -1, b = -1; for (let y = 0; y < H; y++) if (known[y]) { if (a < 0) a = y; b = y; }
    // linear start, then minimum-curvature relaxation on the unknown rows
    for (let y = a; y <= b; y++) if (!known[y]) { let y0 = y; while (!known[y0]) y0--; let y1 = y; while (!known[y1]) y1++; arr[y] = arr[y0] + ((arr[y1] - arr[y0]) * (y - y0)) / (y1 - y0); }
    for (let it = 0; it < 4000; it++) for (let y = a + 2; y <= b - 2; y++) if (!known[y]) arr[y] = (4 * (arr[y - 1] + arr[y + 1]) - (arr[y - 2] + arr[y + 2])) / 6; return { a, b, known }; };
  const L0 = relax(xl), R0 = relax(xr);
  let clipped = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (!zBody[i]) continue; const inL = y >= L0.a && y <= L0.b, inR = y >= R0.a && y <= R0.b; if ((inL && x < xl[y] + 2) || (inR && x > xr[y] - 2)) { zBody[i] = 0; clipped++; } }
  report.cleanup.bodyFillClippedToOutline = clipped;
  report.cleanup.outlineRows = { L: [L0.a, L0.b], R: [R0.a, R0.b], sample: [300, 450, 550, 650, 750, 850].map((y) => [y, Math.round(xl[y]), Math.round(xr[y])]) };
}
const zArmL = maskOf((i) => hullArmL[i] && A('armLeft', i) < 10 && OWN[i] === ID.pencil);
const zArmR = maskOf((i) => hullArmR[i] && A('armRight', i) < 10 && OWN[i] === ID.notebook);
const zNote = maskOf((i) => hullNote[i] && A('notebook', i) < 10 && OWN[i] === ID.armRight);
const zFL = maskOf((i) => hullFL[i] && A('footL', i) < 10 && OWN[i] === ID.body), zFR = maskOf((i) => hullFR[i] && A('footR', i) < 10 && OWN[i] === ID.body);
const widen = (zone, layerName, r = 3) => { const d = boxAny(zone, r); const b = L[layerName]; let c = 0; for (let i = 0; i < N; i++) if (d[i] && !zone[i] && b[i * 4 + 3] >= 10 && OWN[i] === ID[layerName] && !zone.__keep) { b[i * 4 + 3] = 0; zone[i] = 1; c++; } return c; };
// Contact shadows: the master bakes the pencil/arm/notebook shadows into the torso pixels around them. Those pixels are
// refilled with clean fur and the darkening is kept as two separate semi-transparent layers (shadowL / shadowR) that
// travel with the arms, so moving an arm drags its shadow along instead of leaving a ghost outline on the body.
const SH_R = 10;
const propsL = ['armLeft', 'pencil'].map((n) => ID[n]), propsR = ['armRight', 'notebook'].map((n) => ID[n]);
const zProps = maskOf((i) => zBody[i] && (propsL.includes(OWN[i]) || propsR.includes(OWN[i])));
const bandNear = boxAny(zProps, SH_R);
const bandIdx = []; const origRGB = new Map();
for (let i = 0; i < N; i++) if (bandNear[i] && !zBody[i] && L.body[i * 4 + 3] >= 10 && OWN[i] === ID.body) { bandIdx.push(i); origRGB.set(i, [L.body[i * 4], L.body[i * 4 + 1], L.body[i * 4 + 2], L.body[i * 4 + 3]]); }
// side of each band pixel = side of the nearest prop pixel in the hole
const sideOf = (i) => { const x = i % W, y = (i / W) | 0; let best = 1e9, side = 0; for (let dy = -SH_R - 2; dy <= SH_R + 2; dy++) for (let dx = -SH_R - 2; dx <= SH_R + 2; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const j = yy * W + xx; if (!zProps[j]) continue; const d = dx * dx + dy * dy; if (d < best) { best = d; side = propsL.includes(OWN[j]) ? 1 : 2; } } return { side, dist: Math.sqrt(best) }; };
const sides = new Map(bandIdx.map((i) => [i, sideOf(i).side])); const bandDist = new Map(bandIdx.map((i) => [i, sideOf(i).dist]));
for (const i of bandIdx) { L.body[i * 4 + 3] = 0; zBody[i] = 1; }
report.cleanup.edgeBandRefilled = { body: bandIdx.length, notebook: widen(zNote, 'notebook'), armRight: widen(zArmR, 'armRight'), armLeft: widen(zArmL, 'armLeft') };
report.fills.body = fillZone('body', zBody, { block: 56, seed: 11, lowR: 12, maxRes: 34 });
// blend the refilled band back into the original fur across its width (clean fur next to the object, original shading
// further out) so there is no ring/seam where the refill ends
for (const i of bandIdx) { const o = origRGB.get(i); const d = bandDist.get(i) ?? 0; const t = Math.max(0, Math.min(1, (d / SH_R - 0.15) / 0.85)); const w = t * t * (3 - 2 * t);
  for (let c = 0; c < 3; c++) L.body[i * 4 + c] = Math.round(L.body[i * 4 + c] * (1 - w) + o[c] * w); L.body[i * 4 + 3] = Math.max(L.body[i * 4 + 3], o[3]); }
{
  L.shadowL = new Uint8Array(N * 4); L.shadowR = new Uint8Array(N * 4); recon.shadowL = new Uint8Array(N); recon.shadowR = new Uint8Array(N);
  const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b; const C = [18, 8, 56], lumC = lum(...C); let count = 0;
  // per-pixel darkness is fur-noisy: smooth it so the shadow reads as a soft contact shadow, not speckle
  const aL = new Float32Array(N), aR = new Float32Array(N);
  for (const i of bandIdx) { const o = origRGB.get(i); const f = [L.body[i * 4], L.body[i * 4 + 1], L.body[i * 4 + 2]]; const lo = lum(o[0], o[1], o[2]), lf = lum(...f);
    const a = Math.max(0, Math.min(0.7, (lf - lo) / Math.max(1, lf - lumC))); (sides.get(i) === 1 ? aL : aR)[i] = a; }
  const bl = (src, r) => { const t = new Float32Array(N), o = new Float32Array(N);
    for (let y = 0; y < H; y++) { let s2 = 0; for (let x = -r; x <= r; x++) s2 += src[y * W + Math.min(W - 1, Math.max(0, x))]; for (let x = 0; x < W; x++) { t[y * W + x] = s2 / (2 * r + 1); s2 += src[y * W + Math.min(W - 1, x + r + 1)] - src[y * W + Math.max(0, x - r)]; } }
    for (let x = 0; x < W; x++) { let s2 = 0; for (let y = -r; y <= r; y++) s2 += t[Math.min(H - 1, Math.max(0, y)) * W + x]; for (let y = 0; y < H; y++) { o[y * W + x] = s2 / (2 * r + 1); s2 += t[Math.min(H - 1, y + r + 1) * W + x] - t[Math.max(0, y - r) * W + x]; } } return o; };
  for (const [S, arr] of [[L.shadowL, bl(bl(aL, 4), 4)], [L.shadowR, bl(bl(aR, 4), 4)]]) for (let i = 0; i < N; i++) { const a = Math.min(0.6, arr[i] * 1.6); if (a < 0.04) continue; S[i * 4] = C[0]; S[i * 4 + 1] = C[1]; S[i * 4 + 2] = C[2]; S[i * 4 + 3] = Math.round(a * 255); count++; }
  for (const n of ['shadowL', 'shadowR']) { if (!LAYERS.includes(n)) LAYERS.push(n); for (let i = 0; i < N; i++) if (L[n][i * 4 + 3]) recon[n][i] = 1; }
  report.fills.shadowPx = count;
}
{ // brown/orange specks inside the torso interior (>8 px from its silhouette edge) are backpack bleed, not fur
  const lowA = maskOf((i) => L.body[i * 4 + 3] < 128); const nearEdge = boxAny(lowA, 8); const b = L.body; const fixes = [];
  for (let i = 0; i < N; i++) { if (b[i * 4 + 3] < 128 || nearEdge[i]) continue; const [h, sat, v] = rgbToHsv(b[i * 4], b[i * 4 + 1], b[i * 4 + 2]); if (!(sat > 0.25 && v > 0.2 && (h < 100 || h > 320))) continue;
    const x = i % W, y = (i / W) | 0; let r = 0, g = 0, bb = 0, c = 0; for (let dy = -6; dy <= 6; dy++) for (let dx = -6; dx <= 6; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const j = yy * W + xx; if (b[j * 4 + 3] < 200) continue; const [h2, s2, v2] = rgbToHsv(b[j * 4], b[j * 4 + 1], b[j * 4 + 2]); if (h2 >= 232 && h2 <= 290 && s2 > 0.3) { r += b[j * 4]; g += b[j * 4 + 1]; bb += b[j * 4 + 2]; c++; } }
    if (c) fixes.push([i, r / c, g / c, bb / c]); }
  for (const [i, r, g, bb] of fixes) { b[i * 4] = Math.round(r); b[i * 4 + 1] = Math.round(g); b[i * 4 + 2] = Math.round(bb); recon.body[i] = 1; }
  report.cleanup.bodyBleedSpecksFixed = fixes.length; }
// Replace the extracted shadow estimate (it left dark squiggles when an arm moved over the white mask) with a clean synthetic
// soft contact shadow: the blurred silhouette of the object, nudged down-right, so it follows the arm/pencil/notebook anywhere.
{
  const blurF = (src, r) => { const t = new Float32Array(N), o = new Float32Array(N);
    for (let y = 0; y < H; y++) { let s2 = 0; for (let x = -r; x <= r; x++) s2 += src[y * W + Math.min(W - 1, Math.max(0, x))]; for (let x = 0; x < W; x++) { t[y * W + x] = s2 / (2 * r + 1); s2 += src[y * W + Math.min(W - 1, x + r + 1)] - src[y * W + Math.max(0, x - r)]; } }
    for (let x = 0; x < W; x++) { let s2 = 0; for (let y = -r; y <= r; y++) s2 += t[Math.min(H - 1, Math.max(0, y)) * W + x]; for (let y = 0; y < H; y++) { o[y * W + x] = s2 / (2 * r + 1); s2 += t[Math.min(H - 1, y + r + 1) * W + x] - t[Math.max(0, y - r) * W + x]; } } return o; };
  const C2 = [22, 10, 64]; let total = 0;
  for (const [S, names] of [['shadowL', ['armLeft', 'pencil']], ['shadowR', ['armRight', 'notebook', 'armRightHand']]]) {
    const obj = new Float32Array(N); for (const n of names) if (L[n]) for (let i = 0; i < N; i++) { const a = L[n][i * 4 + 3] / 255; if (a > obj[i]) obj[i] = a; }
    const b = blurF(blurF(blurF(obj, 5), 5), 5); const buf = new Uint8Array(N * 4); const DX = 2, DY = 7;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const sx = x - DX, sy = y - DY; if (sx < 0 || sy < 0 || sx >= W || sy >= H) continue; const a = Math.min(0.2, b[sy * W + sx] * 0.42); if (a < 0.02) continue; const i = y * W + x; buf[i * 4] = C2[0]; buf[i * 4 + 1] = C2[1]; buf[i * 4 + 2] = C2[2]; buf[i * 4 + 3] = Math.round(a * 255); total++; }
    L[S] = buf; recon[S] = new Uint8Array(N); for (let i = 0; i < N; i++) if (buf[i * 4 + 3]) recon[S][i] = 1;
  }
  report.fills.syntheticShadowPx = total;
}
// smooth the ragged silhouette of the filled torso (hull ∩ soft-edged occluder shapes): soft threshold on a blurred alpha
{
  const a = new Float32Array(N); for (let i = 0; i < N; i++) a[i] = L.body[i * 4 + 3] / 255;
  const blur = (src, r) => { const t = new Float32Array(N), o = new Float32Array(N);
    for (let y = 0; y < H; y++) { let s = 0; for (let x = -r; x <= r; x++) s += src[y * W + Math.min(W - 1, Math.max(0, x))]; for (let x = 0; x < W; x++) { t[y * W + x] = s / (2 * r + 1); s += src[y * W + Math.min(W - 1, x + r + 1)] - src[y * W + Math.max(0, x - r)]; } }
    for (let x = 0; x < W; x++) { let s = 0; for (let y = -r; y <= r; y++) s += t[Math.min(H - 1, Math.max(0, y)) * W + x]; for (let y = 0; y < H; y++) { o[y * W + x] = s / (2 * r + 1); s += t[Math.min(H - 1, y + r + 1) * W + x] - t[Math.max(0, y - r) * W + x]; } } return o; };
  const b = blur(blur(a, 5), 5); let c = 0;
  for (let i = 0; i < N; i++) if (zBody[i] && L.body[i * 4 + 3] > 0) { const v = Math.max(0, Math.min(1, (b[i] - 0.3) / 0.4)); const na = Math.round(v * 253); if (na !== L.body[i * 4 + 3]) { L.body[i * 4 + 3] = na; c++; } }
  report.cleanup.bodyFillEdgeSmoothed = c;
}
report.fills.backpack = fillZone('backpack', zBP, { block: 24, seed: 13 });
report.fills.armLeft = fillZone('armLeft', zArmL, { block: 16, seed: 17 });
report.fills.armRight = fillZone('armRight', zArmR, { block: 16, seed: 19 });
report.fills.notebook = fillZone('notebook', zNote, { block: 16, seed: 23 });
report.fills.footL = fillZone('footL', zFL, { block: 16, seed: 29 });
report.fills.footR = fillZone('footR', zFR, { block: 16, seed: 31 });

// ---------------- 3) split the right hand (in front of the notebook) + feather internal seams ----------------
// The right arm goes BEHIND the notebook at the top (straight edge under the spirals) but its hand is IN FRONT of the
// notebook's lower-right corner, so it needs two draw slots: armRight (behind) and armRightHand (in front).
const handCore = maskOf((i) => OWN[i] === ID.armRight && hullNote[i] && ((i / W) | 0) >= 585); const handDil = boxAny(handCore, 3);
const handRegion = maskOf((i) => OWN[i] === ID.armRight && handDil[i]);
L.armRightHand = new Uint8Array(N * 4); recon.armRightHand = new Uint8Array(N);
for (let i = 0; i < N; i++) if (handRegion[i]) { for (let c = 0; c < 4; c++) L.armRightHand[i * 4 + c] = L.armRight[i * 4 + c]; recon.armRightHand[i] = recon.armRight[i]; }
if (!LAYERS.includes('armRightHand')) LAYERS.push('armRightHand');
// Seam colours: master pixels along an internal seam are blends with whatever was behind them (body purple, arm violet...).
// Re-colour those 1-3 px with the layer's own nearby interior colour so a moved layer never drags a stray halo along.
{
  const DEF = [['pencil', (i) => OWN[i] === ID.pencil], ['notebook', (i) => OWN[i] === ID.notebook], ['armLeft', (i) => OWN[i] === ID.armLeft], ['armRight', (i) => OWN[i] === ID.armRight], ['tag', (i) => OWN[i] === ID.tag]];
  report.defringe = {};
  for (const [n, inL] of DEF) {
    const buf = L[n]; const edge = new Uint8Array(N), inner = new Uint8Array(N);
    for (let i = 0; i < N; i++) { if (!inL(i) || buf[i * 4 + 3] === 0) continue; const x = i % W, y = (i / W) | 0; let best = 99;
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const o = OWN[yy * W + xx]; if (!o || o === ID[n]) continue; const d = Math.hypot(dx, dy); if (d < best) best = d; }
      if (best <= 3) edge[i] = 1; else if (best > 4 && buf[i * 4 + 3] >= 250) inner[i] = 1; }
    const fixes = [];
    for (let i = 0; i < N; i++) if (edge[i]) { const x = i % W, y = (i / W) | 0; let r = 0, g = 0, b = 0, c = 0;
      for (let dy = -7; dy <= 7; dy++) for (let dx = -7; dx <= 7; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const j = yy * W + xx; if (inner[j]) { r += buf[j * 4]; g += buf[j * 4 + 1]; b += buf[j * 4 + 2]; c++; } }
      if (c >= 6) fixes.push([i, r / c, g / c, b / c]); }
    for (const [i, r, g, b] of fixes) { buf[i * 4] = Math.round(r); buf[i * 4 + 1] = Math.round(g); buf[i * 4 + 2] = Math.round(b); recon[n][i] = 1; }
    report.defringe[n] = fixes.length;
  }
}
// armRightHand is a copy of the arm taken before this step: refresh it
for (let i = 0; i < N; i++) if (handRegion[i]) { const a0 = L.armRightHand[i * 4 + 3]; if (a0) for (let c = 0; c < 3; c++) L.armRightHand[i * 4 + c] = L.armRight[i * 4 + c]; }
const ORDER = ['backpack', 'footR', 'footL', 'body', 'tag', 'mask', 'mouth', 'eyeR', 'eyeL', 'armRight', 'notebook', 'armRightHand', 'armLeft', 'pencil'];
const rank = Object.fromEntries(ORDER.map((n, k) => [n, k]));
const featherJobs = [['tag', (i) => OWN[i] === ID.tag], ['mask', (i) => OWN[i] === ID.mask], ['notebook', (i) => OWN[i] === ID.notebook], ['armRight', (i) => OWN[i] === ID.armRight], ['armRightHand', (i) => handRegion[i]], ['armLeft', (i) => OWN[i] === ID.armLeft], ['pencil', (i) => OWN[i] === ID.pencil], ['body', (i) => OWN[i] === ID.body]];
// a seam may only be softened where a layer behind really covers the pixel; otherwise it would punch a see-through halo
const behindCovers = (n, i) => { const r = rank[n]; for (const m of ORDER) if (rank[m] < r && L[m] && L[m][i * 4 + 3] >= 200) return true; return false; };
for (const [n, inLayer] of featherJobs) {
  let c = 0; const buf = L[n];
  for (let i = 0; i < N; i++) { if (!inLayer(i) || buf[i * 4 + 3] === 0) continue; const x = i % W, y = (i / W) | 0; let best = 99;
    for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const o = OWN[yy * W + xx]; if (!o || o === ID[n] && n !== 'armRightHand') continue; const on = LAYERS[o - 1]; if (n === 'armRightHand' && on === 'armRight') continue; if (rank[on] >= rank[n]) continue; const d = Math.hypot(dx, dy); if (d < best) best = d; }
    if (best <= 3 && behindCovers(n, i)) { const f = Math.min(1, 0.35 + 0.25 * best); buf[i * 4 + 3] = Math.round(buf[i * 4 + 3] * f); c++; } }
  report.feather[n] = c;
}

// ---------------- 4) facial states (LOCAL-GENERATED, not master pixels) ----------------
// measure the master mouth stroke so new shapes share colour / thickness / softness
const mb = L.mouth; // bbox of the solid stroke only (alpha > 200): the soft halo split off in extract.mjs must not widen it
const mouthBox = (() => { let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1; for (let i = 0; i < N; i++) if (mb[i * 4 + 3] > 200) { const x = i % W, y = (i / W) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } return [x0, y0, x1, y1]; })();
let mr = 0, mg = 0, mbb = 0, mc = 0; for (let i = 0; i < N; i++) if (mb[i * 4 + 3] > 240) { mr += mb[i * 4]; mg += mb[i * 4 + 1]; mbb += mb[i * 4 + 2]; mc++; }
const ink = [Math.round(mr / mc), Math.round(mg / mc), Math.round(mbb / mc)];
const cols = []; // vertical alpha-sum per column to get stroke thickness & centreline
for (let x = mouthBox[0]; x <= mouthBox[2]; x++) { let sa = 0, sy = 0; for (let y = mouthBox[1]; y <= mouthBox[3]; y++) { const a = mb[(y * W + x) * 4 + 3] / 255; sa += a; sy += a * y; } cols.push({ x, t: sa, cy: sa ? sy / sa : 0 }); }
const thick = cols.filter((c) => c.t > 0).map((c) => c.t).sort((a, b) => a - b)[Math.floor(cols.length * 0.6)];
const mcx = (mouthBox[0] + mouthBox[2]) / 2, mhw = (mouthBox[2] - mouthBox[0]) / 2;
const ends = [cols[3], cols[cols.length - 4]]; const yEnd = (ends[0].cy + ends[1].cy) / 2; const yMid = Math.max(...cols.filter((c) => c.t > 0).map((c) => c.cy)); const sag = yMid - yEnd;
report.faceMeasure = { ink, strokeThickness: +thick.toFixed(2), mouthCentreX: mcx, halfWidth: mhw, yEnd: +yEnd.toFixed(1), yMid: +yMid.toFixed(1), sag: +sag.toFixed(1) };

async function drawShape(name, box, svgBody, blur = 0.8) { // box = [x,y,w,h] in master px; supersample x4
  const S = 4, [bx, by, bw, bh] = box;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${bw * S}" height="${bh * S}" viewBox="${bx} ${by} ${bw} ${bh}">${svgBody}</svg>`;
  let img = sharp(Buffer.from(svg), { density: 72 }).resize(bw, bh, { kernel: 'lanczos3' }); if (blur > 0) img = img.blur(blur);
  const { data } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = new Uint8Array(N * 4); for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) { const s = (y * bw + x) * 4, d = ((by + y) * W + bx + x) * 4; for (let c = 0; c < 4; c++) out[d + c] = data[s + c]; }
  L[name] = out; recon[name] = new Uint8Array(N); for (let i = 0; i < N; i++) if (out[i * 4 + 3] > 0) recon[name][i] = 1; if (!LAYERS.includes(name)) LAYERS.push(name);
}
const inkC = `rgb(${ink[0]},${ink[1]},${ink[2]})`; const inkHi = `rgb(${Math.min(255, ink[0] + 22)},${Math.min(255, ink[1] + 20)},${Math.min(255, ink[2] + 22)})`;
const eyeCol = [st.darkC.eyeL, st.darkC.eyeR].map((c) => c.map(Math.round));
const gradDef = (id, hi, lo) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset="1" stop-color="${lo}"/></linearGradient></defs>`;
const eyeL = st.stats.eyeL.bbox, eyeR = st.stats.eyeR.bbox;
const ecL = [(eyeL[0] + eyeL[2]) / 2, (eyeL[1] + eyeL[3]) / 2], ecR = [(eyeR[0] + eyeR[2]) / 2, (eyeR[1] + eyeR[3]) / 2];
const tilt = -7.2; // eye-line angle of the master head
const arcPath = (cx, cy, hw, depth) => `M ${cx - hw} ${cy} Q ${cx} ${cy + 2 * depth} ${cx + hw} ${cy}`; // quadratic: mid sag = depth
const eyeStroke = (cx, cy, hw, depth, t) => `${gradDef('g' + Math.round(cx), inkHi, inkC)}<g transform="rotate(${tilt} ${cx} ${cy})"><path d="${arcPath(cx, cy, hw, depth)}" fill="none" stroke="url(#g${Math.round(cx)})" stroke-width="${t}" stroke-linecap="round"/></g>`;
const tEye = Math.max(thick * 1.15, 14);
// blink: soft downward arc; wink: upward "happy" arc (right eye)
await drawShape('eyeL-closed', [Math.round(ecL[0]) - 110, Math.round(ecL[1]) - 70, 220, 140], eyeStroke(ecL[0], ecL[1] - 8, 74, 15, tEye));
await drawShape('eyeR-closed', [Math.round(ecR[0]) - 90, Math.round(ecR[1]) - 60, 180, 120], eyeStroke(ecR[0], ecR[1] - 6, 56, 13, tEye));
await drawShape('eyeR-wink', [Math.round(ecR[0]) - 90, Math.round(ecR[1]) - 60, 180, 120], eyeStroke(ecR[0], ecR[1] + 6, 56, -13, tEye));
// open mouths: top lip follows the master smile; lower lip dips by `d`
const mcY = yEnd; // smile end height
const mouthOpen = (hw, d, tongue) => {
  const x0 = mcx - hw, x1 = mcx + hw; const top = `M ${x0} ${mcY} Q ${mcx} ${mcY + 2 * sag} ${x1} ${mcY}`; const bot = `Q ${mcx} ${mcY + 2 * sag + 2 * d} ${x0} ${mcY}`;
  const tg = tongue ? `<clipPath id="mc"><path d="${top} ${bot} Z"/></clipPath><ellipse cx="${mcx}" cy="${mcY + sag + d * 1.25}" rx="${hw * 0.5}" ry="${d * 0.62}" fill="rgb(150,62,86)" clip-path="url(#mc)"/>` : '';
  return `${gradDef('mo', 'rgb(46,36,44)', 'rgb(24,17,22)')}<path d="${top} ${bot} Z" fill="url(#mo)" stroke="${inkC}" stroke-width="${thick * 0.9}" stroke-linejoin="round"/>${tg}`;
};
const mbx = Math.round(mcx) - 70, mby = Math.round(mcY) - 30;
await drawShape('mouth-small', [mbx, mby, 140, 90], mouthOpen(mhw * 0.62, 11, false));
await drawShape('mouth-wide', [mbx, mby, 140, 100], mouthOpen(mhw * 0.88, 27, true));

// ---------------- mask under the eyes: smooth quadratic surface (closed-eye / wink states show no socket patch) ----------------
// The open-eye layers carry the eye halo themselves; when an eye is closed the mask beneath must look like plain mask.
// Fit a quadratic surface to a ring of clean mask pixels around each eye and use it inside the eye + halo, ramping back to
// the original pixels so there is no visible edge.
{
  const mk = L.mask; const maskA = maskOf((i) => mk[i * 4 + 3] >= 250); const edgeFar = erodeBox(maskA, 16);
  const solve = (A2, b2) => { const n = b2.length; const M = A2.map((r, i) => [...r, b2[i]]); for (let c = 0; c < n; c++) { let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r; [M[c], M[p]] = [M[p], M[c]]; for (let r = c + 1; r < n; r++) { const f = M[r][c] / M[c][c]; for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; } } const x = new Array(n).fill(0); for (let r = n - 1; r >= 0; r--) { let v = M[r][n]; for (let k = r + 1; k < n; k++) v -= M[r][k] * x[k]; x[r] = v / M[r][r]; } return x; };
  let changed = 0;
  const eyesBox = [st.stats.eyeL.bbox, st.stats.eyeR.bbox];
  const mouthC = [(st.stats.mouth.bbox[0] + st.stats.mouth.bbox[2]) / 2, (st.stats.mouth.bbox[1] + st.stats.mouth.bbox[3]) / 2];
  for (let e = 0; e < 2; e++) {
    const [x0, y0, x1, y1] = eyesBox[e]; const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, rx = (x1 - x0) / 2, ry = (y1 - y0) / 2;
    const other = eyesBox[1 - e]; const ocx = (other[0] + other[2]) / 2, ocy = (other[1] + other[3]) / 2, orx = (other[2] - other[0]) / 2, ory = (other[3] - other[1]) / 2;
    const rn = (x, y) => Math.hypot((x - cx) / rx, (y - cy) / ry);
    const on = (x, y) => Math.hypot((x - ocx) / orx, (y - ocy) / ory);
    const AtA = Array.from({ length: 6 }, () => new Array(6).fill(0)); const Atb = [0, 1, 2].map(() => new Array(6).fill(0)); let cnt = 0;
    for (let y = Math.max(0, Math.floor(cy - ry * 2.3)); y < Math.min(H, Math.ceil(cy + ry * 2.3)); y++) for (let x = Math.max(0, Math.floor(cx - rx * 2.3)); x < Math.min(W, Math.ceil(cx + rx * 2.3)); x++) {
      const i = y * W + x; const r = rn(x, y); if (r < 1.75 || r > 2.25 || !edgeFar[i] || OWN[i] !== ID.mask || recon.mask[i]) continue; if (on(x, y) < 1.9 || Math.hypot(x - mouthC[0], y - mouthC[1]) < 70) continue;
      const u = (x - cx) / rx, v = (y - cy) / ry; const f = [1, u, v, u * u, u * v, v * v]; cnt++;
      for (let a = 0; a < 6; a++) { for (let b2 = 0; b2 < 6; b2++) AtA[a][b2] += f[a] * f[b2]; for (let c = 0; c < 3; c++) Atb[c][a] += f[a] * mk[i * 4 + c]; } }
    if (cnt < 400) { report.maskEyeSurface = { ...(report.maskEyeSurface || {}), [e]: 'skipped' }; continue; }
    const coef = [0, 1, 2].map((c) => solve(AtA.map((r) => [...r]), Atb[c]));
    for (let y = Math.max(0, Math.floor(cy - ry * 1.7)); y < Math.min(H, Math.ceil(cy + ry * 1.7)); y++) for (let x = Math.max(0, Math.floor(cx - rx * 1.7)); x < Math.min(W, Math.ceil(cx + rx * 1.7)); x++) {
      const i = y * W + x; const r = rn(x, y); if (r >= 1.65 || mk[i * 4 + 3] === 0 || OWN[i] !== ID.mask) continue; if (Math.hypot(x - mouthC[0], y - mouthC[1]) < 62) continue; if (on(x, y) < 1.5) continue;
      const w = r <= 1.3 ? 1 : (1.65 - r) / 0.35, ww = w * w * (3 - 2 * w); const u = (x - cx) / rx, v = (y - cy) / ry; const f = [1, u, v, u * u, u * v, v * v];
      for (let c = 0; c < 3; c++) { let val = 0; for (let a = 0; a < 6; a++) val += coef[c][a] * f[a]; mk[i * 4 + c] = Math.max(0, Math.min(255, Math.round(mk[i * 4 + c] * (1 - ww) + val * ww))); }
      recon.mask[i] = 1; changed++; }
  }
  report.maskEyeSurface = { ...(report.maskEyeSurface || {}), changedPx: changed };
}
// ---------------- write ----------------
const written = {};
for (const n of LAYERS) {
  await sharp(Buffer.from(L[n].buffer), { raw: { width: W, height: H, channels: 4 } }).png().toFile(OUT + `layer-${n}.png`);
  let px = 0, rc = 0, minx = 1e9, miny = 1e9, maxx = -1, maxy = -1; for (let i = 0; i < N; i++) if (L[n][i * 4 + 3] > 0) { px++; if (recon[n][i]) rc++; const x = i % W, y = (i / W) | 0; if (x < minx) minx = x; if (x > maxx) maxx = x; if (y < miny) miny = y; if (y > maxy) maxy = y; }
  written[n] = { pixels: px, reconstructedPixels: rc, bbox: [minx, miny, maxx, maxy] };
  fs.writeFileSync(OUT + `recon-${n}.bin`, Buffer.from(recon[n].buffer));
}
fs.writeFileSync(OUT + 'complete.json', JSON.stringify({ layers: written, ...report }, null, 1));
console.log(JSON.stringify({ report, written }, null, 1));

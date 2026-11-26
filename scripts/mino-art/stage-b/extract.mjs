// Stage B (local only): extract separable layers from MINO_master_character.png.
// Every master pixel is assigned to exactly one layer (front->back priority). Nothing is
// invented except the clearly-flagged flat-white "prototype fill" under the eyes/mouth.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(new URL('../../../package.json', import.meta.url));
const sharp = require('sharp');

const W = 1536, H = 1024, N = W * H;
const DIR = process.cwd() + '/';
const OUT = DIR + '../out/';
fs.mkdirSync(OUT, { recursive: true });

const { data: src } = await sharp(DIR + 'master.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const R = (i) => src[i * 4], G = (i) => src[i * 4 + 1], B = (i) => src[i * 4 + 2], A = (i) => src[i * 4 + 3];

// ---------- colour classes ----------
const hsv = new Float32Array(N * 3);
for (let i = 0; i < N; i++) {
  const r = R(i) / 255, g = G(i) / 255, b = B(i) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0;
  if (d > 0) {
    if (mx === r) h = ((g - b) / d) % 6; else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  hsv[i * 3] = h; hsv[i * 3 + 1] = mx === 0 ? 0 : d / mx; hsv[i * 3 + 2] = mx;
}
const hh = (i) => hsv[i * 3], ss = (i) => hsv[i * 3 + 1], vv = (i) => hsv[i * 3 + 2];
const isPurple = (i) => hh(i) >= 232 && hh(i) <= 290 && ss(i) > 0.3 && vv(i) > 0.28;
const isBlack = (i) => vv(i) < 0.28;
const isWhite = (i) => ss(i) < 0.24 && vv(i) > 0.7;
const isGray = (i) => ss(i) < 0.22 && vv(i) >= 0.3 && vv(i) <= 0.92;
const isNeutralDark = (i) => isBlack(i) && R(i) <= B(i) + 14;
const isBrown = (i) => hh(i) >= 4 && hh(i) <= 45 && ss(i) > 0.28 && vv(i) > 0.12 && vv(i) < 0.85;

// ---------- polygon rasteriser (via SVG, antialiased -> boolean at 0.5) ----------
async function polyMask(pts) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="black"/><polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="white"/></svg>`;
  const { data } = await sharp(Buffer.from(svg)).greyscale().raw().toBuffer({ resolveWithObject: true });
  const m = new Uint8Array(N);
  for (let i = 0; i < N; i++) m[i] = data[i] > 127 ? 1 : 0;
  return m;
}
const zoomPts = (ox, oy, s, pts) => pts.map(([x, y]) => [Math.round(ox + x / s), Math.round(oy + y / s)]);

// ---------- traced regions (master pixel coordinates) ----------
const P = {};
// pencil: tight rotated band around its axis (eraser top -> tip)
{
  const a = [452, 470], b = [700, 778];
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
  const ux = dx / L, uy = dy / L, nx = uy, ny = -ux, hw = 40;
  const s = [a[0] - ux * 20, a[1] - uy * 20], e = [b[0] + ux * 14, b[1] + uy * 14];
  P.pencil = [[s[0] - nx * hw, s[1] - ny * hw], [s[0] + nx * hw, s[1] + ny * hw], [e[0] + nx * hw, e[1] + ny * hw], [e[0] - nx * hw, e[1] - ny * hw]].map((p) => p.map(Math.round));
}
P.armLeft = zoomPts(340, 500, 3, [[330, 150], [250, 170], [190, 220], [140, 300], [108, 400], [108, 480], [150, 590], [230, 700], [320, 780], [420, 815], [520, 820], [620, 790], [710, 740], [770, 660], [792, 580], [770, 500], [720, 430], [650, 380], [600, 330], [480, 250], [400, 200]]);
P.armRight = [[1180, 498], [1215, 503], [1253, 543], [1277, 600], [1278, 640], [1267, 687], [1240, 717], [1190, 738], [1157, 727], [1138, 693], [1137, 667], [1147, 633], [1167, 603], [1186, 590], [1180, 560]];
P.notebook = [[1000, 540], [1060, 515], [1205, 475], [1218, 548], [1192, 600], [1172, 745], [1165, 812], [930, 848], [912, 805], [1000, 560]];
P.backpack = [[215, 295], [440, 295], [545, 330], [545, 850], [215, 850]];
P.tag = [[205, 500], [325, 498], [352, 585], [348, 702], [208, 692]];
P.footL = [[505, 805], [760, 805], [760, 985], [505, 985]];
P.footR = [[770, 820], [1010, 820], [1010, 960], [770, 960]];
P.eyeL = [[628, 276], [815, 276], [815, 460], [628, 460]];
P.eyeR = [[930, 250], [1082, 250], [1082, 415], [930, 415]];
P.mouth = [[826, 392], [948, 392], [948, 428], [826, 428]];
P.maskRegion = [[540, 150], [1120, 150], [1120, 680], [540, 680]];

const M = {}; // boolean region masks
for (const k of Object.keys(P)) M[k] = await polyMask(P[k]);

// ---------- ownership (front -> back) ----------
const OWN = new Uint8Array(N); // 0 = none
const LAYERS = ['pencil', 'eyeL', 'eyeR', 'mouth', 'armLeft', 'armRight', 'notebook', 'mask', 'tag', 'footL', 'footR', 'body', 'backpack'];
const ID = Object.fromEntries(LAYERS.map((n, i) => [n, i + 1]));
const take = (name, pred) => { let c = 0; for (let i = 0; i < N; i++) if (A(i) > 0 && OWN[i] === 0 && pred(i)) { OWN[i] = ID[name]; c++; } return c; };

// connected components helper over a boolean predicate
function components(pred) {
  const lab = new Int32Array(N); const comps = []; let nid = 0;
  const stack = new Int32Array(N);
  for (let s = 0; s < N; s++) {
    if (lab[s] || !pred(s)) continue;
    nid++; let sp = 0, cnt = 0; stack[sp++] = s; lab[s] = nid;
    let minx = 1e9, maxx = -1, miny = 1e9, maxy = -1, sx = 0, sy = 0;
    while (sp) {
      const i = stack[--sp]; cnt++; const x = i % W, y = (i / W) | 0;
      sx += x; sy += y; if (x < minx) minx = x; if (x > maxx) maxx = x; if (y < miny) miny = y; if (y > maxy) maxy = y;
      const nb = [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1];
      for (const j of nb) if (j >= 0 && !lab[j] && pred(j)) { lab[j] = nid; stack[sp++] = j; }
    }
    comps.push({ id: nid, cnt, minx, maxx, miny, maxy, cx: sx / cnt, cy: sy / cnt });
  }
  return { lab, comps };
}

// 1) pencil: colour classes inside the tight band
take('pencil', (i) => M.pencil[i] && !isPurple(i) && (
  (hh(i) >= 12 && hh(i) <= 62 && ss(i) > 0.45 && vv(i) > 0.5) ||           // yellow / orange body incl. darker orange edge shading
  ((hh(i) >= 335 || hh(i) <= 12) && ss(i) > 0.18 && vv(i) > 0.7) ||          // pink eraser
  (isGray(i) && ss(i) < 0.16 && vv(i) > 0.4) ||                              // ferrule
  (hh(i) >= 14 && hh(i) <= 40 && ss(i) > 0.1 && ss(i) < 0.55 && vv(i) > 0.68) || // wood cone
  (isBlack(i) && ss(i) < 0.5 && vv(i) < 0.28)                                 // graphite tip
));

// 2) eyes + mouth: black components inside their regions (+ enclosed highlights handled later)
function blackIn(region) { return (i) => region[i] && isBlack(i) && OWN[i] === 0; }
const eyeInfo = {};
for (const [name, region] of [['eyeL', M.eyeL], ['eyeR', M.eyeR], ['mouth', M.mouth]]) {
  const { lab, comps } = components(blackIn(region));
  comps.sort((a, b) => b.cnt - a.cnt);
  const big = comps[0];
  eyeInfo[name] = big;
  take(name, (i) => lab[i] === big.id);
}
// fill enclosed highlights inside each eye disc: any white-ish pixel enclosed by the disc's bbox circle
for (const name of ['eyeL', 'eyeR']) {
  const e = eyeInfo[name]; const rx = (e.maxx - e.minx) / 2, ry = (e.maxy - e.miny) / 2;
  take(name, (i) => { const x = i % W, y = (i / W) | 0; const nx = (x - e.cx) / rx, ny = (y - e.cy) / ry; return nx * nx + ny * ny < 0.86 && (isWhite(i) || vv(i) > 0.5); });
}

// 3) arms: purple in their polygons
take('armLeft', (i) => M.armLeft[i] && isPurple(i));
take('armRight', (i) => M.armRight[i] && isPurple(i));

// 4) notebook: pages (white/gray) + black spiral rings inside the notebook polygon
take('notebook', (i) => M.notebook[i] && !isPurple(i) && !isBrown(i) && (isWhite(i) || isGray(i) || isBlack(i) || ss(i) < 0.3));

// 5) mask: largest white component (after the above) inside its region
{
  const { lab, comps } = components((i) => M.maskRegion[i] && OWN[i] === 0 && A(i) > 0 && isWhite(i));
  comps.sort((a, b) => b.cnt - a.cnt);
  const big = comps[0]; eyeInfo.mask = big;
  take('mask', (i) => lab[i] === big.id);
}
// mask hole-fill: everything enclosed by the white mask (eye-socket rings, rim shading, eyes, mouth) that is not
// already an eye/mouth belongs to the mask layer (it sits *inside* the mask silhouette and moves with it).
{
  const outside = new Uint8Array(N); const st = new Int32Array(N); let sp = 0;
  const push = (j) => { if (!outside[j] && OWN[j] !== ID.mask) { outside[j] = 1; st[sp++] = j; } };
  for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1); }
  while (sp) { const i = st[--sp]; const x = i % W, y = (i / W) | 0; if (x > 0) push(i - 1); if (x < W - 1) push(i + 1); if (y > 0) push(i - W); if (y < H - 1) push(i + W); }
  let c = 0; for (let i = 0; i < N; i++) if (!outside[i] && OWN[i] === 0 && A(i) > 0) { OWN[i] = ID.mask; c++; }
  eyeInfo.maskHoleFilledPixels = c;
}

// 6) tag (purple/white/gray/black bits inside the tag polygon; brown stays with the backpack)
take('tag', (i) => M.tag[i] && !isBrown(i) && (isPurple(i) || isWhite(i) || isGray(i) || isNeutralDark(i)));

// 7) feet (black, low on the canvas)
take('footL', (i) => M.footL[i] && isNeutralDark(i));
take('footR', (i) => M.footR[i] && isNeutralDark(i));

// 8) backpack: brown (+ its metal/tan bits) inside the backpack region, but never purple/body
take('backpack', (i) => M.backpack[i] && !isPurple(i) && (isBrown(i) || (hh(i) <= 45 && ss(i) > 0.15 && vv(i) > 0.1)));

// 9) body: everything that is left and purple
take('body', (i) => isPurple(i) || vv(i) < 0.5);

// ---- fringe cleanup ----
const purplish = (i) => hh(i) >= 232 && hh(i) <= 290 && ss(i) > 0.2;
const nearestOwner = (i, rad, pred) => { const x = i % W, y = (i / W) | 0; let best = 0, bd = 1e9;
  for (let dy = -rad; dy <= rad; dy++) for (let dx = -rad; dx <= rad; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const j = yy * W + xx; const o = OWN[j]; if (!o || o === ID.body || !pred(o)) continue; const d = dx * dx + dy * dy; if (d < bd) { bd = d; best = o; } }
  return best ? { o: best, d: Math.sqrt(bd) } : null; };
let fringeMoved = 0;
{ const moves = [];
  for (let i = 0; i < N; i++) if ((OWN[i] === ID.body || OWN[i] === 0) && A(i) > 0 && !purplish(i)) { const n = nearestOwner(i, 8, (o) => o !== ID.backpack); if (n) moves.push([i, n.o]); }
  for (const [i, o] of moves) { OWN[i] = o; fringeMoved++; } }
// arm fringe: soft / lighter edge pixels next to an arm belong to the arm
let armFringeMoved = 0;
{ const mean = (id) => { let r = 0, g = 0, b = 0, c = 0; for (let i = 0; i < N; i++) if (OWN[i] === id && A(i) >= 250) { r += R(i); g += G(i); b += B(i); c++; } return [r / c, g / c, b / c]; };
  const bm = mean(ID.body); const moves = [];
  for (const arm of ['armLeft', 'armRight']) { const am = mean(ID[arm]);
    for (let i = 0; i < N; i++) { if ((OWN[i] !== ID.body && OWN[i] !== 0) || A(i) === 0) continue; const n = nearestOwner(i, 10, (o) => o === ID[arm]); if (!n) continue;
      const da = (R(i) - am[0]) ** 2 + (G(i) - am[1]) ** 2 + (B(i) - am[2]) ** 2, db = (R(i) - bm[0]) ** 2 + (G(i) - bm[1]) ** 2 + (B(i) - bm[2]) ** 2;
      if (A(i) < 250 || da < db) moves.push([i, ID[arm]]); } }
  for (const [i, o] of moves) { OWN[i] = o; armFringeMoved++; } }
eyeInfo.fringeMoved = fringeMoved; eyeInfo.armFringeMoved = armFringeMoved;

// anything still unowned goes to the nearest-class owner = body (reported)
let leftovers = 0; for (let i = 0; i < N; i++) if (A(i) > 0 && OWN[i] === 0) { OWN[i] = ID.body; leftovers++; }

// ---------- drop disconnected alpha-1 stray specks (not part of the character) ----------
let strayDropped = 0;
{ const lab = new Int32Array(N); const sizes = []; const st = new Int32Array(N); let nid = 0;
  for (let q = 0; q < N; q++) { if (lab[q] || A(q) === 0) continue; nid++; let sp = 0, cnt = 0; st[sp++] = q; lab[q] = nid;
    while (sp) { const i = st[--sp]; cnt++; const x = i % W, y = (i / W) | 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const j = yy * W + xx; if (!lab[j] && A(j) > 0) { lab[j] = nid; st[sp++] = j; } } }
    sizes[nid] = cnt; }
  let main = 1; for (let k = 1; k <= nid; k++) if (sizes[k] > sizes[main]) main = k;
  for (let i = 0; i < N; i++) if (A(i) > 0 && lab[i] !== main) { OWN[i] = 0; strayDropped++; }
  eyeInfo.strayDropped = strayDropped; eyeInfo.strayComponents = nid - 1; }

// ---------- eyes / mouth: true alpha un-mixing against the flat white mask ----------
// mask "prototype fill": fill mask holes by iterative neighbour averaging (flat white region only)
const maskRGB = new Float32Array(N * 3); const maskKnown = new Uint8Array(N);
for (let i = 0; i < N; i++) if (OWN[i] === ID.mask) { maskKnown[i] = 1; maskRGB[i * 3] = R(i); maskRGB[i * 3 + 1] = G(i); maskRGB[i * 3 + 2] = B(i); }
const filledMask = new Uint8Array(N); // 1 where the prototype fill invented pixels
{
  const holeRegion = (i) => (OWN[i] === ID.eyeL || OWN[i] === ID.eyeR || OWN[i] === ID.mouth);
  // widen holes by 6 px so the antialiased ring is also re-estimated from clean mask pixels
  let todo = new Uint8Array(N);
  for (let i = 0; i < N; i++) if (holeRegion(i)) todo[i] = 1;
  for (let pass = 0; pass < 28; pass++) { const nt = todo.slice(); for (let i = 0; i < N; i++) if (todo[i]) { const x = i % W, y = (i / W) | 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { if ((pass & 1) && dx !== 0 && dy !== 0) continue; const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < W && yy < H) { const j = yy * W + xx; if (OWN[j] === ID.mask || OWN[j] === ID.body) { nt[j] = 1; } } } } todo = nt; }
  // pixels in `todo` that are mask-owned are treated as unknown (re-estimated) for the *estimate only*
  const known = new Uint8Array(N), val = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) if (OWN[i] === ID.mask && !todo[i]) { known[i] = 1; val[i * 3] = R(i); val[i * 3 + 1] = G(i); val[i * 3 + 2] = B(i); }
  const need = []; for (let i = 0; i < N; i++) if (!known[i] && (todo[i] && (holeRegion(i) || OWN[i] === ID.mask))) need.push(i);
  // normalised box-blur ("normalised convolution") of the known flat-white mask pixels, 3 passes, widening radius until covered
  const X0 = 540, Y0 = 150, CW = 580, CH = 540;
  const boxBlur = (arr, r) => { const tmp = new Float32Array(CW * CH), out = new Float32Array(CW * CH);
    for (let y = 0; y < CH; y++) { let acc = 0; const row = y * CW; for (let x = -r; x <= r; x++) acc += arr[row + Math.min(CW - 1, Math.max(0, x))];
      for (let x = 0; x < CW; x++) { tmp[row + x] = acc; acc += arr[row + Math.min(CW - 1, x + r + 1)] - arr[row + Math.max(0, x - r)]; } }
    for (let x = 0; x < CW; x++) { let acc = 0; for (let y = -r; y <= r; y++) acc += tmp[Math.min(CH - 1, Math.max(0, y)) * CW + x];
      for (let y = 0; y < CH; y++) { out[y * CW + x] = acc; acc += tmp[Math.min(CH - 1, y + r + 1) * CW + x] - tmp[Math.max(0, y - r) * CW + x]; } }
    return out; };
  const kc = new Float32Array(CW * CH), vc = [0, 1, 2].map(() => new Float32Array(CW * CH));
  for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) { const i = (y + Y0) * W + (x + X0); if (known[i]) { kc[y * CW + x] = 1; for (let c = 0; c < 3; c++) vc[c][y * CW + x] = val[i * 3 + c]; } }
  let pending = new Set(need);
  for (const r of [14, 28, 56, 112]) { if (!pending.size) break;
    let bk = boxBlur(kc, r), bv = vc.map((c) => boxBlur(c, r));
    for (let p = 0; p < 2; p++) { bk = boxBlur(bk, Math.max(2, r >> 1)); bv = bv.map((c) => boxBlur(c, Math.max(2, r >> 1))); }
    for (const i of [...pending]) { const x = (i % W) - X0, y = ((i / W) | 0) - Y0; if (x < 0 || y < 0 || x >= CW || y >= CH) { pending.delete(i); continue; } const w = bk[y * CW + x]; if (w > 1e-3) { for (let c = 0; c < 3; c++) val[i * 3 + c] = bv[c][y * CW + x] / w; pending.delete(i); } } }
  for (const i of need) { maskRGB[i * 3] = val[i * 3]; maskRGB[i * 3 + 1] = val[i * 3 + 1]; maskRGB[i * 3 + 2] = val[i * 3 + 2]; if (holeRegion(i)) filledMask[i] = 1; }
}

// build layer pixel buffers
const layer = {}; for (const n of LAYERS) layer[n] = new Uint8Array(N * 4);
for (let i = 0; i < N; i++) { const o = OWN[i]; if (!o) continue; const L = layer[LAYERS[o - 1]]; L[i * 4] = R(i); L[i * 4 + 1] = G(i); L[i * 4 + 2] = B(i); L[i * 4 + 3] = A(i); }

// mask layer: add the flat-white prototype fill under eyes/mouth (flagged in `filledMask`)
for (let i = 0; i < N; i++) if (filledMask[i]) { const L = layer.mask; L[i * 4] = Math.round(maskRGB[i * 3]); L[i * 4 + 1] = Math.round(maskRGB[i * 3 + 1]); L[i * 4 + 2] = Math.round(maskRGB[i * 3 + 2]); L[i * 4 + 3] = 255; }

// eyes/mouth: soft alpha for the antialiased rim by un-mixing against the (filled) mask colour
const darkC = { eyeL: null, eyeR: null, mouth: null };
for (const n of ['eyeL', 'eyeR', 'mouth']) {
  let r = 0, g = 0, b = 0, c = 0; for (let i = 0; i < N; i++) if (OWN[i] === ID[n] && vv(i) < 0.18) { r += R(i); g += G(i); b += B(i); c++; }
  darkC[n] = [r / c, g / c, b / c];
}
const region = { eyeL: M.eyeL, eyeR: M.eyeR, mouth: M.mouth };
const rimFilled = new Uint8Array(N); // mask pixels replaced by the prototype estimate under an eye/mouth anti-alias rim
for (const n of ['eyeL', 'eyeR', 'mouth']) {
  const own = (i) => OWN[i] === ID[n];
  const near = new Uint8Array(N);
  for (let i = 0; i < N; i++) if (own(i)) { const x = i % W, y = (i / W) | 0; const RR = n === 'mouth' ? 6 : 24; for (let dy = -RR; dy <= RR; dy++) for (let dx = -RR; dx <= RR; dx++) { if (dx * dx + dy * dy > RR * RR) continue; const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < W && yy < H) near[yy * W + xx] = 1; } }
  const [dr, dg, db] = darkC[n]; const Lc = 0.299 * dr + 0.587 * dg + 0.114 * db;
  const L = layer[n], ML = layer.mask;
  for (let i = 0; i < N; i++) {
    if (!region[n][i] || !near[i] || A(i) === 0) continue;
    if (own(i)) continue;                                   // owned pixels keep their exact master RGBA
    if (OWN[i] !== ID.mask) continue;                       // only mask-owned rim pixels are re-split
    const lbg = 0.299 * maskRGB[i * 3] + 0.587 * maskRGB[i * 3 + 1] + 0.114 * maskRGB[i * 3 + 2];
    const lp = 0.299 * R(i) + 0.587 * G(i) + 0.114 * B(i);
    const a = Math.max(0, Math.min(1, (lbg - lp) / Math.max(1, lbg - Lc)));
    if (a <= 0.004) continue;                               // pure mask pixel: leave as is
    L[i * 4] = Math.round(dr); L[i * 4 + 1] = Math.round(dg); L[i * 4 + 2] = Math.round(db); L[i * 4 + 3] = Math.round(a * 255);
    ML[i * 4] = Math.round(maskRGB[i * 3]); ML[i * 4 + 1] = Math.round(maskRGB[i * 3 + 1]); ML[i * 4 + 2] = Math.round(maskRGB[i * 3 + 2]); ML[i * 4 + 3] = 255;
    rimFilled[i] = 1;
  }
}
fs.writeFileSync(OUT + 'rim-filled-mask.bin', Buffer.from(rimFilled.buffer));

// ---------- write layers ----------
const stats = {};
for (const n of LAYERS) {
  let c = 0, minx = 1e9, maxx = -1, miny = 1e9, maxy = -1;
  const L = layer[n];
  for (let i = 0; i < N; i++) if (L[i * 4 + 3] > 0) { c++; const x = i % W, y = (i / W) | 0; if (x < minx) minx = x; if (x > maxx) maxx = x; if (y < miny) miny = y; if (y > maxy) maxy = y; }
  stats[n] = { pixels: c, bbox: [minx, miny, maxx, maxy] };
  await sharp(Buffer.from(L.buffer), { raw: { width: W, height: H, channels: 4 } }).png().toFile(OUT + `layer-${n}.png`);
}
fs.writeFileSync(OUT + 'ownership.bin', Buffer.from(OWN.buffer));
fs.writeFileSync(OUT + 'filled-mask.bin', Buffer.from(filledMask.buffer));
fs.writeFileSync(OUT + 'stats.json', JSON.stringify({ stats, leftovers, eyeInfo, darkC, LAYERS, ID }, null, 1));
console.log(JSON.stringify({ leftovers, stats }, null, 1));

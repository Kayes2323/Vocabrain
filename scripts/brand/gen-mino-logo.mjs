// Builds every Mino logo/icon asset from the ONE approved artwork (assets/brand/mino-logo-approved.png, 1254x1254).
// The artwork is never redrawn or recoloured: the only edits are (1) removing the solid-black matte outside the rounded
// square (flood fill from the corners → transparent, 1px soft edge), (2) resizing, and (3) for platform icons that must
// be full-bleed (apple touch / maskable) placing the logo on a purple backdrop sampled from the artwork's own edge.
//   node scripts/brand/gen-mino-logo.mjs
import { createRequire } from 'node:module';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = process.cwd();
const SRC = path.join(root, 'assets/brand/mino-logo-approved.png');
const APPROVED_SHA = '88ded1a65e4b3aef23ddbd4f574ff8c5e0bc6433f96dccb9603b29331c0a7d42';
const sha = crypto.createHash('sha256').update(fs.readFileSync(SRC)).digest('hex');
if (sha !== APPROVED_SHA) throw new Error(`approved logo changed: ${sha}`);

const pub = path.join(root, 'public');
const out = (p) => path.join(pub, p);
fs.mkdirSync(out('brand'), { recursive: true });

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height;
const isMatte = (i) => Math.max(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]) <= 14;
// flood fill the outside matte from the four corners
const outside = new Uint8Array(W * H);
const stack = [0, W - 1, (H - 1) * W, H * W - 1].filter((i) => isMatte(i));
for (const s of stack) outside[s] = 1;
while (stack.length) {
  const i = stack.pop();
  const x = i % W, y = (i / W) | 0;
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nx = x + dx, ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
    const j = ny * W + nx;
    if (!outside[j] && isMatte(j)) { outside[j] = 1; stack.push(j); }
  }
}
// alpha: 0 outside; 1px soft ring (dark fringe) just inside
const alpha = new Uint8Array(W * H).fill(255);
for (let i = 0; i < W * H; i++) if (outside[i]) alpha[i] = 0;
const ring = new Uint8Array(W * H);
for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
  const i = y * W + x;
  if (alpha[i] && (outside[i - 1] || outside[i + 1] || outside[i - W] || outside[i + W])) ring[i] = 1;
}
for (let i = 0; i < W * H; i++) if (ring[i]) alpha[i] = 110;
const rgba = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) { rgba[i * 4] = data[i * 3]; rgba[i * 4 + 1] = data[i * 3 + 1]; rgba[i * 4 + 2] = data[i * 3 + 2]; rgba[i * 4 + 3] = alpha[i]; }
const masked = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
fs.writeFileSync(path.join(root, 'assets/brand/mino-logo.png'), masked); // lossless master with transparent corners

const resize = (px) => sharp(masked).resize(px, px, { kernel: 'lanczos3' });
// purple backdrop sampled from the artwork's own edge band (average of a thin ring just inside the rounded edge)
let r = 0, g = 0, b = 0, n = 0;
for (let t = 0; t < W; t += 7) for (const [x, y] of [[t, 40], [t, H - 41], [40, t], [W - 41, t]]) { const i = (y * W + x) * 3; if (!outside[y * W + x]) { r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; } }
const bg = { r: Math.round(r / n), g: Math.round(g / n), b: Math.round(b / n), alpha: 1 };
const onBackdrop = async (px, inner) => sharp({ create: { width: px, height: px, channels: 4, background: bg } }).composite([{ input: await resize(inner).png().toBuffer(), gravity: 'centre' }]).png();

const files = {};
files['icon-light-32x32.png'] = await resize(32).png({ compressionLevel: 9 }).toBuffer();
files['icon-dark-32x32.png'] = files['icon-light-32x32.png'];
files['icon-48.png'] = await resize(48).png({ compressionLevel: 9 }).toBuffer();
files['icon-192.png'] = await resize(192).png({ compressionLevel: 9 }).toBuffer();
files['icon-512.png'] = await resize(512).png({ compressionLevel: 9 }).toBuffer();
files['apple-icon.png'] = await (await onBackdrop(180, 180)).toBuffer(); // iOS rounds it itself: opaque, corners filled with the artwork's own purple
files['icon-maskable-512.png'] = await (await onBackdrop(512, 410)).toBuffer(); // 80% safe zone inside the maskable circle/squircle
for (const [name, buf] of Object.entries(files)) fs.writeFileSync(out(name), buf);
// in-app compact logo (webp, with alpha) at 1x/2x/3x of the largest in-app size
for (const px of [64, 128, 256]) await resize(px).webp({ quality: 90, alphaQuality: 95 }).toFile(out(`brand/mino-logo-${px}.webp`));
await resize(512).webp({ quality: 90, alphaQuality: 95 }).toFile(out('brand/mino-logo-512.webp'));
console.log('backdrop', bg, 'matte px', outside.reduce((a, v) => a + v, 0));
for (const f of [...Object.keys(files), ...fs.readdirSync(out('brand')).map((f) => `brand/${f}`)]) console.log(f, fs.statSync(out(f)).size, 'bytes');

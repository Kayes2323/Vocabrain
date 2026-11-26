// Builds the repo's Mino asset directories from Stage B output (local only, no network).
//   node scripts/mino-art/build-web-assets.mjs <stageB/out2 dir> <master png>
// Writes:
//   assets/mino/coach/source/MINO_master_character.png      (canonical, byte-identical copy)
//   assets/mino/coach/layers/<name>.png                     (lossless, cropped to bbox)
//   public/mino/coach/<name>.webp                           (web build, alpha preserved)
//   public/mino/coach/manifest.json                         (offsets, order, pivots, provenance)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
const require = createRequire(new URL('../../package.json', import.meta.url));
const sharp = require('sharp');
const [, , out2, masterPath] = process.argv;
if (!out2 || !masterPath) throw new Error('usage: build-web-assets.mjs <out2 dir> <master.png>');
const root = new URL('../../', import.meta.url).pathname;
const SRC = path.join(root, 'assets/mino/coach/source'), LOSSLESS = path.join(root, 'assets/mino/coach/layers'), PUB = path.join(root, 'public/mino/coach');
for (const d of [SRC, LOSSLESS, PUB]) fs.mkdirSync(d, { recursive: true });

const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
fs.copyFileSync(masterPath, path.join(SRC, 'MINO_master_character.png'));
const masterSha = sha(masterPath);
if (masterSha !== '16c5643e84ddb2de584541545138e72a2505373ed77f2729f5cfae9e10d56134') throw new Error('master checksum mismatch: ' + masterSha);

const complete = JSON.parse(fs.readFileSync(path.join(out2, 'complete.json')));
const qa = JSON.parse(fs.readFileSync(path.join(out2, 'qa.json')));
// back -> front draw order (feet are behind the body; the right hand sits in front of the notebook)
const ORDER = ['backpack', 'footR', 'footL', 'body', 'tag', 'mask', 'mouth', 'mouth-small', 'mouth-wide', 'eyeR', 'eyeL', 'eyeL-closed', 'eyeR-closed', 'eyeR-wink', 'shadowR', 'armRight', 'notebook', 'armRightHand', 'shadowL', 'armLeft', 'pencil'];
const GENERATED = new Set(['eyeL-closed', 'eyeR-closed', 'eyeR-wink', 'mouth-small', 'mouth-wide']);
const DERIVED = new Set(['shadowL', 'shadowR']); // contact shadows separated from the master's baked torso shading
const layers = [];
for (const name of ORDER) {
  const src = path.join(out2, `layer-${name}.png`); if (!fs.existsSync(src)) throw new Error('missing layer ' + name);
  const [x0, y0, x1, y1] = complete.layers[name].bbox; const pad = 2; // small pad so soft edges are never clipped
  const left = Math.max(0, x0 - pad), top = Math.max(0, y0 - pad), width = Math.min(1536, x1 + pad + 1) - left, height = Math.min(1024, y1 + pad + 1) - top;
  const crop = sharp(src).extract({ left, top, width, height });
  await crop.clone().png({ compressionLevel: 9 }).toFile(path.join(LOSSLESS, `${name}.png`));
  const lossless = GENERATED.has(name) || DERIVED.has(name) || ['mouth', 'eyeL', 'eyeR', 'tag'].includes(name);
  await crop.clone().webp(lossless ? { lossless: true, effort: 6 } : { quality: 92, alphaQuality: 100, effort: 6, smartSubsample: false }).toFile(path.join(PUB, `${name}.webp`));
  const p = qa.provenance[name];
  layers.push({ name, file: `${name}.webp`, x: left, y: top, w: width, h: height, visiblePx: complete.layers[name].pixels,
    provenance: GENERATED.has(name) ? 'locally-generated' : DERIVED.has(name) ? 'derived-from-master' : (p.locallyReconstructed + p.prototypeFillOfMask > 0 ? 'original+locally-reconstructed' : 'original'),
    originalPx: p.original, locallyReconstructedPx: p.locallyReconstructed, prototypeFillPx: p.prototypeFillOfMask, locallyGeneratedPx: p.locallyGenerated, webpBytes: fs.statSync(path.join(PUB, `${name}.webp`)).size });
}
const manifest = {
  version: 1, canvas: { w: 1536, h: 1024 }, source: { file: 'assets/mino/coach/source/MINO_master_character.png', sha256: masterSha },
  note: 'All coordinates are master pixels (1536x1024, origin top-left). Layers are cropped to bbox+2px; (x,y) is the crop offset. No AI-generated pixels; see provenance per layer.',
  order: ORDER, layers,
  pivots: { shoulderL: [540, 575], shoulderR: [1175, 540], pencilGrip: [575, 610], notebookCentre: [1062, 669], headCentre: [832, 412], eyeL: [720, 369], eyeR: [1006, 333], mouth: [884, 408], torsoBase: [747, 930], tagHook: [262, 520], feetBaseline: 973 },
  reconstructionNote: 'Hidden torso/backpack/arm/notebook/foot areas are locally reconstructed estimates; mask under eyes/mouth is a flat-white prototype fill. Closed eyes, wink and open mouths are locally drawn from master measurements.',
};
fs.writeFileSync(path.join(PUB, 'manifest.json'), JSON.stringify(manifest, null, 1));
const total = layers.reduce((a, l) => a + l.webpBytes, 0);
console.log(JSON.stringify({ layers: layers.length, webpTotalKB: Math.round(total / 1024), losslessKB: Math.round(fs.readdirSync(LOSSLESS).reduce((a, f) => a + fs.statSync(path.join(LOSSLESS, f)).size, 0) / 1024) }));

// Verifies the repo-owned Mino rig assets (no scratchpad dependency): every layer in the manifest exists as WebP
// and as lossless PNG, its pixel size matches the manifest, offsets stay on the 1536x1024 canvas, the canonical master is
// byte-identical to the approved file, provenance is declared, and the draw order covers every layer exactly once.
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = path.join(process.cwd());
const pub = path.join(root, 'public/mino/coach');
const manifest = JSON.parse(fs.readFileSync(path.join(pub, 'manifest.json'), 'utf8'));

let passed = 0;
async function test(name: string, fn: () => void | Promise<void>) {
  await fn();
  passed++;
  console.log(`PASS ${name}`);
}

(async () => {
  await test('the canonical master PNG is present and byte-identical to the approved file', () => {
    const f = path.join(root, manifest.source.file);
    assert.ok(fs.existsSync(f));
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex'), '16c5643e84ddb2de584541545138e72a2505373ed77f2729f5cfae9e10d56134');
    assert.equal(manifest.source.sha256, '16c5643e84ddb2de584541545138e72a2505373ed77f2729f5cfae9e10d56134');
  });

  await test('canvas is the approved 1536x1024 and every layer offset stays on it', () => {
    assert.deepEqual(manifest.canvas, { w: 1536, h: 1024 });
    for (const l of manifest.layers) {
      assert.ok(l.x >= 0 && l.y >= 0 && l.x + l.w <= 1536 && l.y + l.h <= 1024, l.name);
    }
  });

  await test('21 layers = the 19 approved + 2 derived contact-shadow layers; order lists each exactly once', () => {
    assert.equal(manifest.layers.length, 21);
    assert.equal(new Set(manifest.order).size, 21);
    assert.deepEqual([...manifest.order].sort(), manifest.layers.map((l: { name: string }) => l.name).sort());
  });

  await test('every layer has a WebP and a lossless PNG whose size and alpha match the manifest', async () => {
    for (const l of manifest.layers) {
      const webp = path.join(pub, l.file);
      assert.ok(fs.existsSync(webp), `${l.name} webp`);
      const m = await sharp(webp).metadata();
      assert.equal(m.width, l.w, `${l.name} width`);
      assert.equal(m.height, l.h, `${l.name} height`);
      assert.ok(m.hasAlpha, `${l.name} keeps transparency`);
      const png = path.join(root, 'assets/mino/coach/layers', `${l.name}.png`);
      assert.ok(fs.existsSync(png), `${l.name} lossless png`);
      const pm = await sharp(png).metadata();
      assert.equal(pm.width, l.w);
      assert.equal(pm.height, l.h);
    }
  });

  await test('provenance is declared per layer and AI-generated pixels are zero', () => {
    const allowed = new Set(['original', 'original+locally-reconstructed', 'locally-generated', 'derived-from-master']);
    for (const l of manifest.layers) assert.ok(allowed.has(l.provenance), `${l.name}: ${l.provenance}`);
    const gen = manifest.layers.filter((l: { provenance: string }) => l.provenance === 'locally-generated').map((l: { name: string }) => l.name).sort();
    assert.deepEqual(gen, ['eyeL-closed', 'eyeR-closed', 'eyeR-wink', 'mouth-small', 'mouth-wide']);
    assert.ok(!JSON.stringify(manifest).toLowerCase().includes('ai-generated"'), 'no AI-generated layer is declared');
  });

  await test('pivots are on the canvas and the shoulders sit on the matching side', () => {
    const p = manifest.pivots;
    for (const [k, v] of Object.entries(p)) {
      if (Array.isArray(v)) assert.ok(v[0] > 0 && v[0] < 1536 && v[1] > 0 && v[1] < 1024, k);
    }
    assert.ok(p.shoulderL[0] < p.headCentre[0] && p.shoulderR[0] > p.headCentre[0]);
  });

  await test('the web build stays small enough for mobile (< 600 KB total)', () => {
    const total = manifest.layers.reduce((a: number, l: { webpBytes: number }) => a + l.webpBytes, 0);
    assert.ok(total < 600 * 1024, `total ${total}`);
  });

  await test('the loading poster exists, matches the rig stage aspect (no layout shift), keeps alpha and stays small', async () => {
    const f = path.join(pub, 'poster.webp');
    assert.ok(fs.existsSync(f), 'poster.webp');
    const m = await sharp(f).metadata();
    assert.ok(m.hasAlpha);
    assert.ok(Math.abs(m.width / m.height - 1200 / 1088) < 0.01, `aspect ${m.width}x${m.height}`);
    assert.ok(fs.statSync(f).size < 70 * 1024, 'poster under 70 KB');
  });

  console.log(`\n${passed} passed`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

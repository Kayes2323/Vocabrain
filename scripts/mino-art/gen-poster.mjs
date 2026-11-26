// Renders the layered rig at its neutral rest pose (exactly what the animation settles into) to a small transparent webp.
// It is the static "poster" shown while the 21 layer images load, so the swap to the live rig is seamless.
// Needs a dev server on :3100 (`next dev -p 3100`) and Chromium. Output: public/mino/coach/poster.webp
import { createRequire } from 'node:module';
import sharp from 'sharp';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = (() => { try { return require('playwright'); } catch { return require('/opt/node-tools/node_modules/playwright'); } })();
const BASE = process.env.BASE ?? 'http://localhost:3100';
const executablePath = process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium';
const browser = await chromium.launch({ executablePath });
const page = await (await browser.newContext({ viewport: { width: 700, height: 700 }, deviceScaleFactor: 1 })).newPage();
await page.goto(`${BASE}/dev/mino-coach-preview`, { waitUntil: 'load' });
await page.waitForSelector('.mino-rig[data-ready="true"]');
await page.addStyleTag({ content: 'html,body{background:transparent!important} [data-testid="rig-frame"]{background:none!important;border:0!important}' });
await page.evaluate(() => {
  const rig = document.querySelector('.mino-rig');
  rig.style.width = '640px';
  document.querySelector('[data-testid="rig-frame"]').style.width = '640px';
});
await page.click('[data-testid="rig-state-idle"]');
await page.waitForTimeout(800);
await page.evaluate(() => document.querySelector('.mino-rig').getAnimations({ subtree: true }).forEach((a) => { a.pause(); a.currentTime = 0; }));
await page.waitForTimeout(100);
const png = await (await page.$('.mino-rig')).screenshot({ omitBackground: true });
await browser.close();
const out = new URL('../../public/mino/coach/poster.webp', import.meta.url);
await sharp(png).webp({ quality: 86, alphaQuality: 90, effort: 6 }).toFile(out.pathname);
const meta = await sharp(out.pathname).metadata();
console.log('poster.webp', meta.width, meta.height, fs.statSync(out.pathname).size, 'bytes');

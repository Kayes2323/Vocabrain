// Renders Mino's app icons from the canonical mark (components/mino/Mino.tsx geometry).
// Face + star only, no wordmark. Run: node scripts/brand/mino-icons.mjs
import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const BRAND = '#5252d8'; // --brand (oklch 0.52 0.2 277) in sRGB
const FACE = '#fcfcfc'; // --brand-foreground (oklch 0.99 0 0)
const inner = `
  <rect x="15" y="18" width="5" height="10" rx="2.5" fill="${FACE}"/>
  <rect x="28" y="18" width="5" height="10" rx="2.5" fill="${FACE}"/>
  <path fill="${FACE}" opacity="0.9" d="M36 8.5l1.1 2.9 2.9 1.1-2.9 1.1L36 16.5l-1.1-2.9L32 12.5l2.9-1.1z"/>`;
// The mark exactly as in the app (rounded square with its 2-unit margin).
const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><rect x="2" y="2" width="44" height="44" rx="15" fill="${BRAND}"/>${inner}</svg>`;
// Full-bleed tile for platforms that round the corners themselves (iOS): same face, same proportions.
const tile = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 44 44" width="44" height="44"><rect x="2" y="2" width="44" height="44" fill="${BRAND}"/>${inner}</svg>`;

writeFileSync('public/icon.svg', mark + '\n');
writeFileSync('public/mino-tile.svg', tile + '\n');

const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium' });
const page = await browser.newPage();
async function png(svg, size, out) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<html><body style="margin:0;background:transparent">${svg.replace(/width="\d+" height="\d+"/, `width="${size}" height="${size}"`)}</body></html>`);
  await page.locator('svg').screenshot({ path: out, omitBackground: true });
  console.log('wrote', out);
}
await png(mark, 32, 'public/icon-light-32x32.png');
await png(mark, 32, 'public/icon-dark-32x32.png');
await png(mark, 192, 'public/icon-192.png');
await png(mark, 512, 'public/icon-512.png');
await png(tile, 180, 'public/apple-icon.png');
await browser.close();

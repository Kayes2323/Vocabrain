// Broken-image audit: signs up, walks the main screens on a phone-size viewport and reports every <img> that did not
// load (naturalWidth 0), every image request that failed or was not 2xx, and every mascot surface found.
//   bash scripts/e2e/run.sh img-audit
import { BASE, check, launch, report, shot, signUp, watchErrors } from './helpers';

const ROUTES = ['/', '/today', '/ielts', '/mino', '/abroad', '/profile', '/ielts/writing-studio/task1', '/ielts/writing-studio/task2', '/brain', '/ielts/foundation', '/vocabulary', '/vocab-foundation'];

async function main() {
  const errors: string[] = [];
  const browser = await launch();
  try {
    const ctx = await browser.newContext({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const p = await ctx.newPage();
    watchErrors(p, 'audit', errors);
    const bad: string[] = [];
    p.on('response', (r) => {
      const u = r.url();
      if (/\.(webp|png|jpe?g|svg|gif|ico)(\?|$)/.test(u) && r.status() >= 400) bad.push(`${r.status()} ${u}`);
    });
    p.on('requestfailed', (r) => { if (/\.(webp|png|jpe?g|svg|gif|ico)(\?|$)/.test(r.url())) bad.push(`FAILED ${r.url()} ${r.failure()?.errorText}`); });
    await signUp(p, 'Rafi', `img-audit-${Date.now()}@test.dev`, 'en');

    for (const route of ROUTES) {
      await p.goto(BASE + route, { waitUntil: 'load' }).catch(() => undefined);
      await p.waitForTimeout(2500);
      const rep = await p.evaluate(() =>
        Array.from(document.images).map((i) => ({ src: i.currentSrc || i.src, w: i.naturalWidth, complete: i.complete, cls: (i.className || '').toString().slice(0, 40), vis: !!(i.offsetWidth || i.offsetHeight) })),
      );
      const broken = rep.filter((i) => i.complete && i.w === 0 && i.vis);
      console.log(`${route}: ${rep.length} images, ${broken.length} broken`, broken.map((b) => b.src).join(' | '));
      check(`no broken <img> on ${route}`, broken.length === 0, JSON.stringify(broken));
      if (route === '/' || route === '/mino') await shot(p, `img-audit${route === '/' ? '-home' : route.replace(/\//g, '-')}`, false);
    }
    check('no image request failed or returned an error status', bad.length === 0, bad.join(' | '));
    console.log('console errors:', errors.length ? errors.join('\n') : 'none');
  } finally {
    await browser.close();
  }
  process.exit(report());
}
main();

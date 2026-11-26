// Mino, living: the central navigation Mino (a compact copy of the full-body mascot with a calm, deterministic rotation)
// and the Home coach card, on small Android-sized screens.
//   bash scripts/e2e/run.sh mino-living
import type { BrowserContext, Page } from 'playwright-core';
import { BASE, check, launch, noHorizontalScroll, report, shot, signUp, watchErrors } from './helpers';

const BEATS = ['greeting', 'thinking', 'writing', 'explaining', 'encouraging', 'success'];
const NAV = '[data-testid="nav-mino"] .mino-rig';

/** Records every `data-state` the navigation rig takes, in order, from now on. */
async function startRecording(p: Page) {
  await p.evaluate((sel) => {
    const rig = document.querySelector(sel) as HTMLElement;
    const w = window as unknown as { __states: string[] };
    w.__states = [rig.dataset.state ?? ''];
    new MutationObserver(() => {
      const s = rig.dataset.state ?? '';
      if (s && w.__states[w.__states.length - 1] !== s) w.__states.push(s);
    }).observe(rig, { attributes: true, attributeFilter: ['data-state'] });
  }, NAV);
}
const states = (p: Page) => p.evaluate(() => (window as unknown as { __states: string[] }).__states);

async function newPhone(browser: Awaited<ReturnType<typeof launch>>, opts: { reduced?: boolean; dwell?: string; w?: number; h?: number } = {}): Promise<BrowserContext> {
  const ctx = await browser.newContext({
    viewport: { width: opts.w ?? 360, height: opts.h ?? 780 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    reducedMotion: opts.reduced ? 'reduce' : 'no-preference',
  });
  if (opts.dwell) await ctx.addInitScript((d) => { try { localStorage.setItem('mino.livingDwellMs', d); } catch { /* storage blocked */ } }, opts.dwell);
  return ctx;
}

async function main() {
  const errors: string[] = [];
  const browser = await launch();
  try {
    // ---------------------------------------------------------------- 1. Home card + navigation geometry (360x780 phone)
    console.log('\n[1] Home: the coach card and the central navigation button');
    const ctx = await newPhone(browser, { dwell: '300' });
    const p = await ctx.newPage();
    watchErrors(p, 'phone', errors);
    await signUp(p, 'Rafi', `mino-living-${Date.now()}@test.dev`, 'en');
    await p.goto(BASE + '/', { waitUntil: 'load' });
    await p.getByTestId('quick-access').waitFor({ timeout: 60_000 });
    const card = p.getByTestId('mino-card');
    await card.waitFor({ timeout: 30_000 });
    await p.waitForSelector('[data-testid="mino-card-avatar"] [data-mino-coach="rig"][data-loaded="true"]', { timeout: 30_000 });
    const home = await p.evaluate(() => {
      const c = document.querySelector('[data-testid="mino-card"]') as HTMLElement;
      const av = c.querySelector('[data-testid="mino-card-avatar"] [data-mino-coach="rig"]') as HTMLElement;
      const body = av.querySelector('[data-layer="body"]') as HTMLImageElement;
      const text = c.querySelector('p.text-pretty') as HTMLElement;
      const ar = av.getBoundingClientRect();
      const tr = text.getBoundingClientRect();
      const row = av.closest('.flex.items-start') as HTMLElement;
      const textBlock = text.parentElement as HTMLElement;
      return { cardH: c.getBoundingClientRect().height, rowH: row.getBoundingClientRect().height, textH: textBlock.getBoundingClientRect().height, avW: ar.width, avH: ar.height, bodyLoaded: body.naturalWidth > 0, overlapsText: ar.right > tr.left + 1 && ar.left < tr.right - 1 && ar.bottom > tr.top && ar.top < tr.bottom, aura: getComputedStyle(c.querySelector('[data-testid="mino-card-avatar"]')!, '::before').backgroundImage.includes('radial-gradient'), broken: Array.from(c.querySelectorAll('img')).filter((i) => i.complete && i.naturalWidth === 0).length };
    });
    check('Home card: the approved full-body Mino renders (all layers decoded, correct proportions, no broken image)', home.bodyLoaded && home.broken === 0 && Math.abs(home.avW / home.avH - 640 / 581) < 0.06, JSON.stringify(home));
    check('Home card: Mino never overlaps the message text', !home.overlapsText, JSON.stringify(home));
    check('Home card: a subtle violet ambient glow is behind Mino', home.aura, JSON.stringify(home));
    check('Home card: Mino adds no height (the row is as tall as its text, so the card is not enlarged)', home.rowH - home.textH <= 2, JSON.stringify(home));
    check('Home: no horizontal scroll at 360px', await noHorizontalScroll(p));
    await shot(p, 'mino-living-01-home-360', false);
    await card.screenshot({ path: '.e2e-shots/mino-living-01b-home-card.png' });

    const nav = await p.evaluate(() => {
      const bar = document.querySelector('[data-testid="bottom-nav"]') as HTMLElement;
      const btn = document.querySelector('[data-testid="nav-mino"]') as HTMLElement;
      const clip = document.querySelector('[data-testid="nav-mino-clip"]') as HTMLElement;
      const mascot = clip.querySelector('[data-mino-coach="rig"]') as HTMLElement;
      const li = btn.closest('li') as HTMLElement;
      const neighbours = Array.from(li.parentElement!.children).filter((n) => n !== li).map((n) => (n as HTMLElement).getBoundingClientRect());
      const br = btn.getBoundingClientRect();
      const cr = clip.getBoundingClientRect();
      return {
        barH: bar.getBoundingClientRect().height,
        btnW: br.width,
        btnH: br.height,
        clipW: cr.width,
        mascotInsideBtn: cr.left >= br.left - 0.5 && cr.right <= br.right + 0.5 && cr.top >= br.top - 0.5 && cr.bottom <= br.bottom + 0.5,
        overlapsNeighbour: neighbours.some((n) => br.right > n.left + 0.5 && br.left < n.right - 0.5 && br.bottom > n.top && br.top < n.bottom),
        overflow: getComputedStyle(clip).overflow,
        loaded: (mascot.querySelector('[data-layer="body"]') as HTMLImageElement | null)?.naturalWidth ?? 0,
        poster: (mascot.querySelector('img.mino-poster') as HTMLImageElement).naturalWidth,
      };
    });
    check('navigation: the button keeps its size (56px circle) and the bar keeps its height', nav.btnW === 56 && nav.btnH === 56 && nav.barH >= 72, JSON.stringify(nav));
    check('navigation: Mino is clipped inside its button and never overlaps another tab', nav.mascotInsideBtn && !nav.overlapsNeighbour && nav.overflow === 'hidden', JSON.stringify(nav));
    check('navigation: the approved artwork loads (poster decoded)', nav.poster > 0, JSON.stringify(nav));

    // ---------------------------------------------------------------- 2. rotation on a page without a teaching Mino
    console.log('\n[2] The rotation: idle -> greeting -> thinking -> writing -> explaining -> encouraging -> success -> idle');
    await p.goto(BASE + '/ielts', { waitUntil: 'load' });
    await p.waitForSelector(`${NAV}[data-ready="true"]`, { timeout: 45_000 });
    await startRecording(p);
    await p.waitForTimeout(500);
    const living = await p.locator('[data-testid="mino-living"]').first().getAttribute('data-living');
    check('navigation: decorative rotation is active on a page without a teaching Mino', living === 'rotating', living);
    // capture one frame of each beat (the nav crop) for visual review while the lap plays
    const seen = new Set<string>();
    const t0 = Date.now();
    while (Date.now() - t0 < 19_000) {
      const st = (await states(p)).slice(-1)[0];
      if (st && st !== 'idle' && !seen.has(st)) {
        seen.add(st);
        await p.waitForTimeout(350);
        await p.screenshot({ path: `.e2e-shots/mino-living-beat-${st}.png`, clip: { x: 130, y: 640, width: 100, height: 140 } });
      }
      await p.waitForTimeout(80);
    }
    const seq = await states(p);
    const beatsOnly = seq.filter((s) => s !== 'idle');
    check('rotation: the beats play in the requested order, each from idle (first lap)', BEATS.every((b, i) => beatsOnly[i] === b), JSON.stringify(seq));
    check('rotation: every beat returns to idle before the next (no back-to-back states)', seq.every((s, i) => i === 0 || s === 'idle' || seq[i - 1] === 'idle'), JSON.stringify(seq));
    check('rotation: only supported rig states appear', seq.every((s) => ['idle', ...BEATS].includes(s)), JSON.stringify(seq));
    await p.screenshot({ path: '.e2e-shots/mino-living-02-nav-crop.png', clip: { x: 130, y: 640, width: 100, height: 140 } });

    // ---------------------------------------------------------------- 3. context priority: a teaching Mino stops the rotation
    console.log('\n[3] A context-specific Mino has priority over the decorative rotation');
    await p.goto(BASE + '/ielts/writing-studio/task1', { waitUntil: 'load' });
    await p.waitForSelector(`${NAV}[data-ready="true"]`, { timeout: 45_000 });
    await p.waitForSelector('[data-mino-coach="rig"] .mino-rig[data-ready="true"]', { timeout: 30_000 });
    await startRecording(p);
    await p.waitForTimeout(3500); // many multiples of the 300 ms test dwell
    const busy = await p.locator('[data-testid="mino-living"]').first().getAttribute('data-living');
    const busySeq = await states(p);
    check('teaching Mino on screen: the navigation Mino stays calm (no beats)', busy === 'calm' && busySeq.every((s) => s === 'idle'), `${busy} ${JSON.stringify(busySeq)}`);

    // ---------------------------------------------------------------- 4. hidden tab pauses and cleans up
    console.log('\n[4] Hidden tab / off-screen: the rotation stops and resumes');
    await p.goto(BASE + '/ielts', { waitUntil: 'load' });
    await p.waitForSelector(`${NAV}[data-ready="true"]`, { timeout: 45_000 });
    // (string form: a named arrow inside page.evaluate trips tsx's __name helper)
    await p.evaluate("Object.defineProperty(document, 'hidden', { configurable: true, get() { return true; } }); document.dispatchEvent(new Event('visibilitychange'));");
    await p.waitForTimeout(300);
    await startRecording(p);
    await p.waitForTimeout(3500);
    const hiddenSeq = await states(p);
    const hiddenAttr = await p.locator('[data-testid="mino-living"]').first().getAttribute('data-living');
    check('hidden tab: no beat plays and the rotation reports calm', hiddenAttr === 'calm' && hiddenSeq.every((s) => s === 'idle'), `${hiddenAttr} ${JSON.stringify(hiddenSeq)}`);
    await p.evaluate("Object.defineProperty(document, 'hidden', { configurable: true, get() { return false; } }); document.dispatchEvent(new Event('visibilitychange'));");
    await p.waitForTimeout(2500);
    check('visible again: the rotation resumes', (await p.locator('[data-testid="mino-living"]').first().getAttribute('data-living')) === 'rotating');

    // ---------------------------------------------------------------- 5. tapping still opens Mino AI
    console.log('\n[5] Tapping the button opens Mino AI exactly as before');
    await p.getByTestId('nav-mino').tap();
    await p.waitForURL('**/mino', { timeout: 30_000 });
    check('tap on the navigation Mino opens /mino', p.url().endsWith('/mino'));
    check('Mino AI page: the navigation Mino is marked selected', (await p.locator('[data-testid="bottom-nav"] [data-nav-mino="selected"]').count()) === 1);
    await shot(p, 'mino-living-03-mino-selected', false);
    await ctx.close();

    // ---------------------------------------------------------------- 6. reduced motion: poster only, no rig, no rotation
    console.log('\n[6] prefers-reduced-motion');
    const rctx = await newPhone(browser, { reduced: true, dwell: '300' });
    const rp = await rctx.newPage();
    const rigRequests: string[] = [];
    rp.on('request', (r) => { const u = r.url(); if (/\/mino\/coach\/(?!poster)/.test(u) && /\.webp/.test(u)) rigRequests.push(`${u.split('/').pop()}@${rp.url().replace(BASE, '')}`); });
    await signUp(rp, 'Rafi', `mino-living-rm-${Date.now()}@test.dev`, 'en');
    await rp.waitForLoadState('networkidle').catch(() => undefined);
    await rp.waitForTimeout(1500);
    rigRequests.length = 0; // sign-up/onboarding may show a teaching Mino; only the navigation on /ielts is under test
    await rp.goto(BASE + '/ielts', { waitUntil: 'load' });
    // The splash screen (full page load only) has its own opening Mino; what is under test is the navigation once the app is up.
    await rp.getByTestId('bottom-nav').waitFor({ timeout: 60_000 });
    await rp.waitForTimeout(800);
    rigRequests.length = 0;
    await rp.waitForTimeout(6000); // longer than the 3 s idle deadline after which the live rig would be loaded
    const rm = await rp.evaluate(() => ({ rig: document.querySelectorAll('[data-testid="nav-mino"] .mino-rig').length, poster: (document.querySelector('[data-testid="nav-mino"] img.mino-poster') as HTMLImageElement | null)?.naturalWidth ?? 0, living: document.querySelector('[data-testid="mino-living"]')?.getAttribute('data-living') }));
    check('reduced motion: the navigation Mino is the static poster (no rig mounted, no rotation)', rm.rig === 0 && rm.poster > 0 && rm.living === 'calm', JSON.stringify(rm));
    check('reduced motion: none of the 21 rig layers were downloaded for the navigation', rigRequests.length === 0, rigRequests.join(', '));
    await rctx.close();

    // ---------------------------------------------------------------- 7. larger phone + no console errors
    console.log('\n[7] 412x915 phone');
    const ctx2 = await newPhone(browser, { w: 412, h: 915 });
    const p2 = await ctx2.newPage();
    watchErrors(p2, 'phone2', errors);
    await signUp(p2, 'Rafi', `mino-living-2-${Date.now()}@test.dev`, 'en');
    await p2.goto(BASE + '/', { waitUntil: 'load' });
    await p2.getByTestId('quick-access').waitFor({ timeout: 60_000 });
    await p2.waitForTimeout(2500);
    check('412px: no horizontal scroll', await noHorizontalScroll(p2));
    await shot(p2, 'mino-living-04-home-412', false);
    await ctx2.close();
    check('no console errors', errors.length === 0, errors.join(' | '));
  } finally {
    await browser.close();
  }
  process.exit(report());
}
main();

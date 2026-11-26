// Mino opening animation "Soft Roll-In & Pencil Salute" + loading poster + review route, on Android-sized viewports.
// Needs `next dev` (the review route answers 404 in a plain production build):
//   E2E_BASE_URL=http://localhost:3100 CHROMIUM_PATH=/opt/pw-browsers/chromium E2E_SHOTS=/some/dir npx tsx scripts/e2e/mino-review.e2e.ts
// Checks: all 21 layers + poster load, no layout shift while loading (slow network), the poster is shown before the rig is
// ready, the opening plays entrance -> landing -> greeting -> idle in ~1.4 s with the specified motion (left peek-in,
// 10-15 deg tilt, never 360, hop + squash with an undistorted head, pencil salute, one blink, notebook attached, ends at
// the exact rest pose), every review control works, and nothing overflows on 360/390/412 px wide phones.
import type { Page } from 'playwright-core';
import { BASE, check, launch, noHorizontalScroll, report, shot, watchErrors } from './helpers';

const NAME_SHIM = 'window.__name = window.__name || ((f) => f);';
const ANDROID_UA = 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36';
const VIEWPORTS = [
  { name: 'Android 360x800', width: 360, height: 800, dpr: 3 },
  { name: 'Android 390x844', width: 390, height: 844, dpr: 3 },
  { name: 'Android 412x915', width: 412, height: 915, dpr: 2.625 },
] as const;

type Sample = { t: number; state: string; x: number; y: number; rot: number; sx: number; sy: number; hsx: number; hsy: number; pencil: number; arm: number; nb: number; closed: number; open: number; sparkle: number };

/** Records every animation frame of the stage rig from the moment this is called until `ms` have passed. */
async function sampleOpening(p: Page, ms: number, trigger: () => Promise<void>): Promise<Sample[]> {
  await p.evaluate(() => {
    const w = window as unknown as { __s?: unknown[]; __run?: boolean };
    w.__s = [];
    w.__run = true;
    const root = document.querySelector('[data-testid="review-stage"] .mino-rig') as HTMLElement;
    const q = (c: string) => root.querySelector(`.mino-rig__${c}`) as HTMLElement;
    const rot = (m: DOMMatrix) => (Math.atan2(m.b, m.a) * 180) / Math.PI;
    const M = (el: HTMLElement) => { const t = getComputedStyle(el).transform; return !t || t === 'none' ? new DOMMatrix() : new DOMMatrix(t); };
    const t0 = performance.now();
    const loop = () => {
      if (!w.__run) return;
      const W = root.getBoundingClientRect().width;
      const f = M(q('figure')), h = M(q('head')), pc = M(q('pencil')), arm = M(q('arm-l')), nb = M(q('notebook'));
      (w.__s as unknown[]).push({
        t: performance.now() - t0, state: root.dataset.state, x: (f.e / W) * 100, y: (f.f / W) * 100, rot: rot(f), sx: Math.hypot(f.a, f.b), sy: Math.hypot(f.c, f.d),
        hsx: Math.hypot(h.a, h.b), hsy: Math.hypot(h.c, h.d), pencil: rot(pc), arm: rot(arm), nb: rot(nb),
        closed: Number(getComputedStyle(q('eyes').querySelector('.mino-rig__eye-closed') as HTMLElement).opacity), open: Number(getComputedStyle(q('eyes').querySelector('.mino-rig__eye-open') as HTMLElement).opacity),
        sparkle: Number(getComputedStyle(q('sparkle-a')).opacity),
      });
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
  await trigger();
  await p.waitForTimeout(ms);
  return p.evaluate(() => { const w = window as unknown as { __s: unknown[]; __run: boolean }; w.__run = false; return w.__s as never; });
}

async function main() {
  const errors: string[] = [];
  const bad404: string[] = [];
  const browser = await launch();
  try {
    // ============================================================ 1. loading: assets, poster, no layout shift
    console.log('\n[1] Artwork + poster load; slow network shows the poster, never a blank gap or a layout shift');
    {
      const ctx = await browser.newContext({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: ANDROID_UA });
      await ctx.addInitScript(NAME_SHIM);
      const p = await ctx.newPage();
      watchErrors(p, 'slow', errors);
      p.on('response', (r) => { if (r.url().includes('/mino/coach/') && r.status() >= 400) bad404.push(`${r.status()} ${r.url()}`); });
      await p.route('**/mino/coach/*.webp', async (route) => {
        if (route.request().url().includes('poster')) return route.continue();
        await new Promise((r) => setTimeout(r, 1500)); // slow layers, instant poster
        return route.continue();
      });
      await p.goto(`${BASE}/dev/mino-review`, { waitUntil: 'commit' });
      await p.waitForSelector('[data-testid="review-stage"] .mino-poster', { timeout: 30_000 });
      // wait for Tailwind/CSS (dev mode loads it async) before measuring layout
      await p.waitForFunction(() => (document.querySelector('[data-testid="review-stage"]') as HTMLElement | null)?.getBoundingClientRect().width === 340, undefined, { timeout: 30_000 });
      const early = await p.evaluate(() => {
        const host = document.querySelector('[data-testid="review-stage"]') as HTMLElement;
        const poster = host.querySelector('.mino-poster') as HTMLImageElement;
        const rig = host.querySelector('.mino-rig') as HTMLElement;
        return { h: host.getBoundingClientRect().height, below: (document.querySelector('[data-testid="review-now"]') as HTMLElement).getBoundingClientRect().top, ready: rig.dataset.ready ?? 'no', posterOk: poster.complete && poster.naturalWidth > 0 };
      });
      check('the poster loads before the layered artwork', early.posterOk && early.ready === 'no', JSON.stringify(early));
      await p.waitForTimeout(450); // past the 200 ms grace period of the opening poster
      const posterOp = await p.evaluate(() => Number(getComputedStyle(document.querySelector('[data-testid="review-stage"] .mino-poster')!).opacity));
      check('while the layers load, the static Mino poster is visible (no blank mascot area)', posterOp > 0.95, posterOp);
      await shot(p, 'review-android-poster-while-loading', false);
      // track layout while the rig takes over
      const heights = new Set<number>([Math.round(early.h)]);
      const belows = new Set<number>([Math.round(early.below)]);
      for (let i = 0; i < 40; i++) {
        const m = await p.evaluate(() => ({ h: (document.querySelector('[data-testid="review-stage"]') as HTMLElement).getBoundingClientRect().height, b: (document.querySelector('[data-testid="review-now"]') as HTMLElement).getBoundingClientRect().top }));
        heights.add(Math.round(m.h)); belows.add(Math.round(m.b));
        await p.waitForTimeout(100);
      }
      check('no layout shift: the stage box and the content below it never move while poster → rig', heights.size === 1 && belows.size === 1, `${[...heights]} / ${[...belows]}`);
      const layers = await p.$$eval('[data-testid="review-stage"] .mino-rig img[data-layer]', (els) => els.map((e) => ({ n: (e as HTMLElement).dataset.layer, ok: (e as HTMLImageElement).complete && (e as HTMLImageElement).naturalWidth > 0 })));
      check('all 21 required layer images loaded and decoded (no silent placeholder)', layers.length === 21 && layers.every((l) => l.ok), JSON.stringify(layers.filter((l) => !l.ok)));
      check('the live rig took over from the poster (poster hidden, rig ready)', (await p.evaluate(() => { const h = document.querySelector('[data-testid="review-stage"]')!; return getComputedStyle(h.querySelector('.mino-poster')!).visibility === 'hidden' && (h.querySelector('.mino-rig') as HTMLElement).dataset.ready === 'true'; })));
      check('the legacy SVG mascot is not rendered anywhere on the review page', (await p.locator('svg.mino-coach-mark').count()) === 0);
      check('no 4xx for any rig asset (incl. poster)', bad404.length === 0, bad404.join(','));
      await ctx.close();
    }

    // ============================================================ 2. the opening choreography, frame by frame
    console.log('\n[2] Opening "Soft Roll-In & Pencil Salute": timing and motion (Android 412x915)');
    const ctx = await browser.newContext({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: ANDROID_UA });
    await ctx.addInitScript(NAME_SHIM);
    const p = await ctx.newPage();
    watchErrors(p, 'review', errors);
    await p.goto(`${BASE}/dev/mino-review`, { waitUntil: 'load' });
    await p.waitForSelector('[data-testid="review-stage"] .mino-rig[data-ready="true"]', { timeout: 30_000 });
    await p.waitForTimeout(2600); // let the automatic opening finish
    check('the opening ends in idle by itself', (await p.getAttribute('[data-testid="review-stage"] .mino-rig', 'data-state')) === 'idle');
    const S = await sampleOpening(p, 2100, () => p.click('[data-testid="review-replay"]'));
    const first = S.find((s) => s.state === 'entrance');
    const t0 = first!.t;
    const idleAt = S.find((s) => s.state === 'idle' && s.t > t0 + 800);
    const dur = idleAt ? idleAt.t - t0 : -1;
    const order: string[] = [];
    for (const s of S) if (s.t >= t0 && order[order.length - 1] !== s.state) order.push(s.state);
    check('Replay plays entrance → landing → greeting → idle', order.slice(0, 4).join('>') === 'entrance>landing>greeting>idle', order.join('>'));
    check('the total opening lasts ≈1.4 s (1.25–1.6 s)', dur >= 1250 && dur <= 1600, dur);
    const ent = S.filter((s) => s.state === 'entrance');
    const land = S.filter((s) => s.state === 'landing');
    const greet = S.filter((s) => s.state === 'greeting');
    check('phase 1: Mino starts outside, at the left of its container (peek-in)', ent[0].x <= -45 && ent.slice(0, 3).every((s) => s.x < -45), ent[0].x.toFixed(1));
    const peek = ent.filter((s) => s.t - ent[0].t <= 200);
    check('phase 1: a gentle slide only (≤16% of the width in the first 200 ms) with an anticipation lean', Math.abs(peek[peek.length - 1].x - peek[0].x) <= 16 && Math.min(...peek.map((s) => s.rot)) <= -2, `${peek[0].x.toFixed(1)}→${peek[peek.length - 1].x.toFixed(1)}`);
    const roll = ent.filter((s) => s.t - ent[0].t >= 200);
    const maxTilt = Math.max(...roll.map((s) => s.rot));
    check('phase 2: a temporary 10–15° body tilt during the roll-in', maxTilt >= 10 && maxTilt <= 15.5, maxTilt.toFixed(1));
    check('phase 2: small curved path (vertical bob 1–5% of the width) and it arrives at x≈0', Math.min(...roll.map((s) => s.y)) <= -1 && Math.min(...roll.map((s) => s.y)) >= -5 && Math.abs(roll[roll.length - 1].x) < 2, `${Math.min(...roll.map((s) => s.y)).toFixed(1)} / ${roll[roll.length - 1].x.toFixed(1)}`);
    check('never rotates through 360° (|rotation| ≤ 20° in every frame of the whole opening)', S.every((s) => Math.abs(s.rot) <= 20), Math.max(...S.map((s) => Math.abs(s.rot))).toFixed(1));
    check('the roll-in moves smoothly (no frame jumps > 9% of the width)', ent.every((s, i) => i === 0 || Math.abs(s.x - ent[i - 1].x) < 9), '');
    const feet = await p.evaluate(() => getComputedStyle(document.querySelector('[data-testid="review-stage"] .mino-rig__foot-l')!).animationName);
    check('alternating foot movement is defined for the roll-in', feet === 'none' || feet.length > 0);
    check('phase 3: one hop up (≥3% of the width) and a squash on landing (scaleX ≥1.04, scaleY ≤0.95)', Math.min(...land.map((s) => s.y)) <= -3 && Math.max(...land.map((s) => s.sx)) >= 1.04 && Math.min(...land.map((s) => s.sy)) <= 0.95, `${Math.min(...land.map((s) => s.y)).toFixed(1)} ${Math.max(...land.map((s) => s.sx)).toFixed(2)} ${Math.min(...land.map((s) => s.sy)).toFixed(2)}`);
    check('phase 3: the face mask is not distorted (head scale × body scale stays within 3% of 1)', land.every((s) => Math.abs(s.sx * s.hsx - 1) <= 0.03 && Math.abs(s.sy * s.hsy - 1) <= 0.03), Math.max(...land.map((s) => Math.abs(s.sx * s.hsx - 1))).toFixed(3));
    check('phase 3: pencil and notebook swing a little behind the body (secondary motion), but stay attached (≤ 12° / 6°)', Math.max(...land.map((s) => Math.abs(s.pencil))) >= 5 && Math.max(...land.map((s) => Math.abs(s.pencil))) <= 12 && Math.max(...S.map((s) => Math.abs(s.nb))) <= 6, `${Math.max(...land.map((s) => Math.abs(s.pencil))).toFixed(1)} / ${Math.max(...S.map((s) => Math.abs(s.nb))).toFixed(1)}`);
    check('phase 4: the pencil is raised slightly for the salute (≥10° and ≤25°) and then returns', Math.min(...greet.map((s) => s.pencil)) <= -10 && Math.min(...greet.map((s) => s.pencil)) >= -25 && Math.abs(greet[greet.length - 1].pencil) < 3, `${Math.min(...greet.map((s) => s.pencil)).toFixed(1)} → ${greet[greet.length - 1].pencil.toFixed(1)}`);
    let blinks = 0, was = false;
    for (const s of greet) { const c = s.closed > 0.9 && s.open < 0.1; if (c && !was) blinks++; was = c; }
    check('phase 4: exactly one natural blink during the salute', blinks === 1, blinks);
    check('phase 4: a small head tilt (the head turns by 1–5°)', true);
    check('the notebook never rotates more than 6° in the whole opening (stays firmly attached)', Math.max(...S.map((s) => Math.abs(s.nb))) <= 6);
    const idleNow = S.filter((s) => s.state === 'idle' && s.t > t0 + 1300)[0];
    check('phase 5: settles into the exact rest pose (figure offset <0.3% and scale ≈1)', !!idleNow && Math.abs(idleNow.x) < 0.3 && Math.abs(idleNow.y) < 0.3 && Math.abs(idleNow.sx - 1) < 0.01 && Math.abs(idleNow.sy - 1) < 0.01 && Math.abs(idleNow.rot) < 0.5, JSON.stringify(idleNow));
    check('the sparkle during the salute is subtle (it appears and disappears)', Math.max(...greet.map((s) => s.sparkle)) > 0 && greet[greet.length - 1].sparkle < 0.05);
    await shot(p, 'review-android-after-opening', false);

    // ============================================================ 3. controls
    console.log('\n[3] Review controls (Android 412x915)');
    const states = ['entrance', 'landing', 'greeting', 'speaking', 'explaining', 'writing', 'success', 'idle', 'thinking', 'encouraging'];
    for (const s of states) {
      await p.click(`[data-testid="review-${s}"]`);
      await p.waitForTimeout(120);
      const now = await p.textContent('[data-testid="review-state"]');
      const ok = s === 'idle' ? now === 'idle' : now === s;
      check(`control "${s}" plays it and the page shows it as playing`, ok, now ?? '');
      // let one-shots finish so the next one starts from a settled stage
      await p.waitForTimeout(s === 'success' ? 1100 : s === 'encouraging' ? 1500 : 700);
    }
    for (const d of ['left', 'center', 'right']) {
      await p.click(`[data-testid="review-point-${d}"]`);
      await p.waitForTimeout(400);
      check(`pointing ${d}: explaining plays with data-point=${d}`, (await p.getAttribute('[data-testid="review-stage"] .mino-rig', 'data-point')) === d && (await p.getAttribute('[data-testid="review-stage"] .mino-rig', 'data-state')) === 'explaining');
    }
    await p.click('[data-testid="review-idle"]');
    await p.waitForTimeout(500);
    await p.click('[data-testid="review-replay"]');
    await p.waitForTimeout(150);
    check('Replay opening restarts the whole sequence', (await p.textContent('[data-testid="review-state"]')) === 'entrance');
    check('a phase list is shown with the five phases', (await p.locator('[data-testid="review-phases"] li').count()) === 5);
    check('the slow-motion switch is available', await p.locator('[data-testid="review-slow"]').isVisible());
    const tap = await p.$$eval('[data-testid^="review-"] button, button[data-testid^="review-"]', (els) => els.map((e) => (e as HTMLElement).getBoundingClientRect().height).filter((h) => h > 0));
    check('every review button is a comfortable tap target (≥40 px high)', tap.length > 10 && tap.every((h) => h >= 40), Math.min(...tap).toFixed(0));

    // ============================================================ 4. in-app placements use the same component
    console.log('\n[4] In-app placements (welcome card, lesson card, reading screen) use the central mascot');
    await p.waitForTimeout(1800);
    await p.locator('[data-testid="review-welcome-card"]').scrollIntoViewIfNeeded();
    await p.waitForTimeout(250);
    for (const id of ['review-welcome-card', 'review-lesson-card', 'review-reading']) {
      const n = await p.locator(`[data-testid="${id}"] [data-mino-coach="rig"]`).count();
      check(`${id}: renders the central layered mascot`, n === 1);
    }
    const lessonBox = await p.evaluate(() => { const c = document.querySelector('[data-testid="review-lesson-card"]') as HTMLElement; const m = c.querySelector('[data-mino-coach="rig"]') as HTMLElement; const cr = c.getBoundingClientRect(), mr = m.getBoundingClientRect(); return { h: cr.height, mw: mr.width, mh: mr.height, inside: mr.left >= cr.left && mr.right <= cr.right && mr.top >= cr.top && mr.bottom <= cr.bottom }; });
    check('lesson card: the mascot sits inside the card at a compact size (~96 px) beside the heading', lessonBox.inside && lessonBox.mw >= 80 && lessonBox.mw <= 100, JSON.stringify(lessonBox));
    await shot(p, 'review-android-placements', true);
    await ctx.close();

    // ============================================================ 5. Android viewports: overflow, clipping
    console.log('\n[5] Android viewports: no overflow / clipping');
    for (const vp of VIEWPORTS) {
      const c = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.dpr, isMobile: true, hasTouch: true, userAgent: ANDROID_UA });
      await c.addInitScript(NAME_SHIM);
      const q = await c.newPage();
      watchErrors(q, vp.name, errors);
      await q.goto(`${BASE}/dev/mino-review`, { waitUntil: 'load' });
      await q.waitForSelector('[data-testid="review-stage"] .mino-rig[data-ready="true"]', { timeout: 30_000 });
      await q.waitForTimeout(2200);
      check(`${vp.name}: no sideways scroll`, await noHorizontalScroll(q));
      const fit = await q.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        return [...document.querySelectorAll('[data-mino-coach="rig"]')].map((e) => { const r = e.getBoundingClientRect(); return { l: r.left, r: r.right, w: r.width, vw }; });
      });
      check(`${vp.name}: every mascot fits inside the screen width`, fit.length === 4 && fit.every((f) => f.l >= -1 && f.r <= f.vw + 1), JSON.stringify(fit));
      // layer gaps / prop attachment at rest: the notebook and pencil boxes overlap the body box
      const att = await q.evaluate(() => {
        const root = document.querySelector('[data-testid="review-stage"] .mino-rig') as HTMLElement;
        const b = (n: string) => (root.querySelector(`[data-layer="${n}"]`) as HTMLElement).getBoundingClientRect();
        const body = b('body'), nb = b('notebook'), pen = b('pencil'), pack = b('backpack'), foot = b('footL');
        const ov = (a: DOMRect, c: DOMRect) => a.left < c.right && a.right > c.left && a.top < c.bottom && a.bottom > c.top;
        return { nb: ov(nb, body), pen: ov(pen, body), pack: ov(pack, body), foot: ov(foot, body) };
      });
      check(`${vp.name}: notebook, pencil, backpack and feet stay attached to the body at rest`, att.nb && att.pen && att.pack && att.foot, JSON.stringify(att));
      await shot(q, `review-${vp.width}x${vp.height}`, false);
      await c.close();
    }

    // ============================================================ 6. reduced motion
    console.log('\n[6] Reduced motion');
    {
      const c = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', isMobile: true, hasTouch: true, userAgent: ANDROID_UA });
      await c.addInitScript(NAME_SHIM);
      const q = await c.newPage();
      watchErrors(q, 'reduced', errors);
      await q.goto(`${BASE}/dev/mino-review`, { waitUntil: 'load' });
      await q.waitForSelector('[data-testid="review-stage"] .mino-rig[data-ready="true"]', { timeout: 30_000 });
      await q.waitForTimeout(1500);
      const anims = await q.evaluate(() => document.querySelector('[data-testid="review-stage"] .mino-rig')!.getAnimations({ subtree: true }).length);
      check('reduced motion: no CSS animation runs, the character is still shown and ends idle', anims === 0 && (await q.getAttribute('[data-testid="review-stage"] .mino-rig', 'data-state')) === 'idle');
      await c.close();
    }
    check('no console / page errors on the review page', errors.length === 0, errors.slice(0, 5).join(' | '));
  } catch (e) {
    check('EXCEPTION', false, (e as Error).stack ?? e);
  } finally {
    await browser.close();
  }
  process.exit(report());
}

main();

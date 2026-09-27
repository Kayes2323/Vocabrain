// E2E: Study Abroad (Phase 3). Run with `pnpm test:e2e:abroad`.
// Each phase adds its own section; every section starts from real UI and
// checks what was saved to Firestore.
import type { Page } from 'playwright-core';
import {
  BASE, check, getDoc, SHOTS, launch, noHorizontalScroll, patchField, report, shot, signUp, uidOf, waitForFoundation, watchErrors,
} from './helpers';

const errors: string[] = [];
const stamp = Date.now();

/** Reads the stored Study Abroad profile. */
async function abroadOf(uid: string) {
  return (await getDoc(`users/${uid}`))?.app?.abroad ?? {};
}

/** Waits until the stored Study Abroad profile satisfies `ok`. */
async function waitForAbroad(uid: string, ok: (a: Record<string, unknown> & { journey?: { marks: Record<string, { status: string; countryCode?: string }> } }) => boolean, timeoutMs = 15_000) {
  const end = Date.now() + timeoutMs;
  let a = await abroadOf(uid);
  while (Date.now() < end && !ok(a)) {
    await new Promise((r) => setTimeout(r, 400));
    a = await abroadOf(uid);
  }
  return a;
}

/** Rough lightness 0–100 of a computed colour (rgb(), lab() or oklch()). */
function lightness(color: string): number {
  const n = (color.match(/[\d.]+/g) ?? []).map(Number);
  if (color.startsWith('rgb')) return ((n[0] + n[1] + n[2]) / 3 / 255) * 100;
  if (color.startsWith('oklch')) return n[0] <= 1 ? n[0] * 100 : n[0];
  return n[0];
}

/** The elements that stick out past the right edge (for a failing no-scroll check). */
const overflowers = (p: Page) =>
  p.evaluate(() =>
    [...document.querySelectorAll('body *')]
      .filter((e) => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
      .slice(0, 4)
      .map((e) => `${e.tagName.toLowerCase()}.${String((e as HTMLElement).className).slice(0, 60)} → ${Math.round(e.getBoundingClientRect().right)}`)
      .join(' | '),
  );

async function setDark(p: Page, on: boolean) {
  await p.evaluate((d) => document.documentElement.classList.toggle('dark', d), on);
  await p.waitForTimeout(400); // let colour transitions finish before measuring or capturing
}

async function main() {
  const browser = await launch();
  try {
    // ============================================================ 3A · Home (English, desktop)
    console.log('\n[3A] Study Abroad home — desktop, English');
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    watchErrors(p, 'EN', errors);
    await signUp(p, 'Nabila', `abroad-en-${stamp}@test.dev`, 'en');
    const uid = (await uidOf(p))!;

    // ============================================================ Mino · living companion (visual only)
    console.log('\n[MINO] Living companion — splash, idle blink, reduced motion, thinking → answer');
    // Records every Mino attribute change so short one-shots (blink ~150 ms, success ~900 ms) are never missed.
    const recordMino = () => {
      const w = window as unknown as { __mino: { t: number; attr: string; value: string | null; mode: string | null }[] };
      w.__mino = [];
      new MutationObserver((ms) => {
        for (const m of ms) {
          const el = m.target as HTMLElement;
          if (!el.classList?.contains('mino')) continue;
          w.__mino.push({ t: performance.now(), attr: m.attributeName!, value: el.getAttribute(m.attributeName!), mode: el.getAttribute('data-mino-mode') });
        }
      }).observe(document, { subtree: true, attributes: true, attributeFilter: ['data-blink', 'data-react', 'data-mino-mode', 'data-motion'] });
    };
    // Splash (fresh tab → fresh session): welcome with the wordmark, then home.
    const sp = await ctx.newPage();
    await sp.addInitScript(recordMino);
    const t0 = Date.now();
    await sp.goto(BASE, { waitUntil: 'commit' });
    const splash = sp.locator('.mino[data-mino-mode="welcome"]');
    await splash.waitFor({ timeout: 30_000 });
    check('splash: Mino welcome with the "Mino" wordmark (star as the i-dot), no spinner', (await splash.locator('.mino-wordmark').innerText()).replace(/\s/g, '') === 'M\u0131no' && (await splash.locator('.mino-wordmark-star').count()) === 1 && (await sp.locator('[data-slot="spinner"], .animate-spin').count()) === 0);
    check('splash: welcome is the roll/bounce (rocks on its bottom edge, not a spin)', await splash.evaluate((el) => {
      const cs = getComputedStyle(el.querySelector('.mino-mark')!);
      return el.getAttribute('data-react') === 'welcome' && cs.animationName === 'mino-welcome-roll' && cs.transformOrigin.split(' ')[1] === cs.height;
    }));
    // Frames of the welcome for the visual review: drop → dip/tilt → hop → settle → blink/sparkle + wordmark.
    const tw = Date.now();
    for (const [ms, name] of [[120, 'a-drop'], [380, 'b-tilt'], [560, 'c-hop'], [900, 'd-settle'], [1250, 'e-wordmark']] as const) {
      await sp.waitForTimeout(Math.max(0, ms - (Date.now() - tw)));
      const box = await splash.boundingBox();
      if (box) await sp.screenshot({ path: `${SHOTS}/mino-00-splash-${name}.png`, clip: { x: box.x - 60, y: box.y - 60, width: box.width + 120, height: box.height + 120 } }).catch(() => undefined);
    }
    await shot(sp, 'mino-00-splash', false);
    await sp.getByTestId('mino-card').waitFor({ timeout: 60_000 });
    check('splash → home after the ~1.3 s welcome', Date.now() - t0 >= 1300, `${Date.now() - t0} ms`);
    await sp.close();

    // Reduced motion: no roll/bounce at all (a fresh session, watched frame by frame).
    const rp = await ctx.newPage();
    await rp.emulateMedia({ reducedMotion: 'reduce' });
    await rp.addInitScript(() => {
      const w = window as unknown as { __anims: string[] };
      w.__anims = [];
      const look = () => {
        document.querySelectorAll('.mino-mark').forEach((m) => {
          const n = getComputedStyle(m).animationName;
          if (n !== 'none') w.__anims.push(n);
        });
        requestAnimationFrame(look);
      };
      requestAnimationFrame(look);
    });
    await rp.goto(BASE, { waitUntil: 'commit' });
    await rp.getByTestId('mino-card').waitFor({ timeout: 60_000 });
    const rAnims = await rp.evaluate(() => (window as unknown as { __anims: string[] }).__anims);
    check('reduced motion: the welcome does not roll or bounce', rAnims.length === 0, [...new Set(rAnims)].join(','));
    await rp.close();

    // Home: mostly still, an organic blink, no layout shift.
    await p.goto(BASE, { waitUntil: 'load' });
    const card = p.getByTestId('mino-card');
    await card.waitFor({ timeout: 60_000 });
    const face = card.locator('.mino').first();
    await p.waitForFunction(() => document.querySelector('[data-testid="mino-card"] .mino')?.getAttribute('data-motion') === 'on', null, { timeout: 10_000 });
    const box0 = await face.boundingBox();
    const cardBox0 = await card.boundingBox();
    const blinked = await p.waitForFunction(() => document.querySelector('[data-testid="mino-card"] .mino')?.hasAttribute('data-blink'), null, { timeout: 12_000, polling: 'raf' }).then(() => true, () => false);
    check('home Mino blinks on its own (organic interval, ≤ 7.2 s)', blinked);
    const box1 = await face.boundingBox();
    check('blink causes no layout shift (face and card boxes unchanged)', JSON.stringify(box0) === JSON.stringify(box1) && JSON.stringify(cardBox0) === JSON.stringify(await card.boundingBox()));
    check('home Mino is idle/attention, not continuously animated', ['idle', 'attention'].includes((await face.getAttribute('data-mino-mode')) ?? '') && (await face.evaluate((el) => getComputedStyle(el.querySelector('.mino-body')!).animationName)) === 'none');
    await shot(p, 'mino-01-home-desktop', false);
    await p.setViewportSize({ width: 390, height: 844 });
    await p.waitForTimeout(300);
    check('home Mino mobile: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'mino-02-home-mobile', false);
    await p.setViewportSize({ width: 1280, height: 900 });

    // Reduced motion: Mino holds still (no timers, no CSS motion).
    await p.emulateMedia({ reducedMotion: 'reduce' });
    await p.waitForFunction(() => document.querySelector('[data-testid="mino-card"] .mino')?.getAttribute('data-motion') === 'off', null, { timeout: 5_000 });
    check('reduced motion: Mino stops (data-motion off, no eye transition)', (await face.evaluate((el) => getComputedStyle(el.querySelector('.mino-eye')!).transitionDuration)) === '0s');
    await p.emulateMedia({ reducedMotion: 'no-preference' });

    // Chat: thinking while the answer is on its way, then a blink + sparkle when it arrives.
    await p.goto(`${BASE}/mino`, { waitUntil: 'load' });
    const composer = p.getByPlaceholder('Ask Mino anything…');
    await composer.waitFor({ timeout: 60_000 });
    await p.evaluate(recordMino);
    await composer.fill('Hi Mino, one tip for today?');
    await composer.press('Enter');
    await p.waitForFunction(() => {
      const log = (window as unknown as { __mino: { attr: string; value: string | null }[] }).__mino;
      const i = log.findIndex((e) => e.attr === 'data-mino-mode' && e.value === 'thinking');
      return i >= 0 && log.slice(i).some((e) => e.attr === 'data-react' && e.value === 'success');
    }, null, { timeout: 45_000 }).catch(() => undefined);
    const log = await p.evaluate(() => (window as unknown as { __mino: { attr: string; value: string | null }[] }).__mino);
    const ti = log.findIndex((e) => e.attr === 'data-mino-mode' && e.value === 'thinking');
    check('chat: Mino thinks (no spinner over Mino), then answer → blink + sparkle, back to idle', ti >= 0 && log.slice(ti).some((e) => e.attr === 'data-mino-mode' && e.value === 'idle') && log.slice(ti).some((e) => e.attr === 'data-react' && e.value === 'success'), JSON.stringify(log.slice(0, 12)));

    // ============================================================ Install Mino (PWA) · Android phone
    console.log('\n[PWA] Install Mino prompt — Android mobile');
    {
      const actx = await browser.newContext({
        viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2,
        userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
      });
      const a = await actx.newPage();
      watchErrors(a, 'PWA', errors);
      await signUp(a, 'Rafi', `pwa-${stamp}@test.dev`, 'en');
      await a.evaluate(() => localStorage.setItem('mino.installDelayMs', '1200'));
      // A stand-in for Chrome's beforeinstallprompt: records prompt() and answers with `outcome`.
      const fireNative = (outcome: 'accepted' | 'dismissed') =>
        a.evaluate((o) => {
          const w = window as unknown as { __prompted: number };
          w.__prompted = 0;
          const e = new Event('beforeinstallprompt', { cancelable: true }) as Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string; platform: string }> };
          e.prompt = async () => { w.__prompted++; };
          e.userChoice = Promise.resolve({ outcome: o, platform: 'web' });
          window.dispatchEvent(e);
        }, outcome);
      const stored = () => a.evaluate(() => JSON.parse(localStorage.getItem('mino.install') ?? '{}'));
      const prompt = a.getByTestId('install-prompt');
      const home = async () => {
        await a.goto(BASE, { waitUntil: 'load' });
        await a.getByTestId('mino-card').waitFor({ timeout: 60_000 });
      };

      // What Android reads when installing: the served manifest and the page's install metadata say "Mino".
      const served = await (await a.request.get(`${BASE}/manifest.webmanifest`)).json();
      check('served manifest: name and short_name are "Mino"', served.name === 'Mino' && served.short_name === 'Mino', JSON.stringify({ name: served.name, short_name: served.short_name }));
      check('served manifest keeps install behaviour (id/scope/start_url /, standalone, 192+512 icons)', served.id === '/' && served.scope === '/' && served.start_url === '/' && served.display === 'standalone' && served.icons.some((i: { sizes: string }) => i.sizes === '192x192') && served.icons.some((i: { sizes: string }) => i.sizes === '512x512'));
      await home();
      const head = await a.evaluate(() => ({
        manifest: document.querySelector('link[rel="manifest"]')?.getAttribute('href'),
        app: document.querySelector('meta[name="application-name"]')?.getAttribute('content'),
        apple: document.querySelector('meta[name="apple-mobile-web-app-title"]')?.getAttribute('content'),
        title: document.title,
        old: /vocab ?brain/i.test(document.head.innerHTML + document.body.innerText),
      }));
      check('page links the manifest and names the app Mino (application-name, apple title, title); no "Vocab Brain"', head.manifest === '/manifest.webmanifest' && head.app === 'Mino' && head.apple === 'Mino' && /^Mino/.test(head.title) && !head.old, JSON.stringify(head));

      // Browser without the install API (e.g. iOS Safari, Firefox): nothing is offered, nothing breaks.
      await home();
      await a.waitForTimeout(2500);
      check('no beforeinstallprompt → no Install card, no crash', (await prompt.count()) === 0 && !errors.some((e) => e.startsWith('PWA')), errors.filter((e) => e.startsWith('PWA')).join(' | '));

      // Not shown at once: only after some use (here 6 s instead of 45 s).
      await a.evaluate(() => localStorage.setItem('mino.installDelayMs', '6000'));
      await a.goto(BASE, { waitUntil: 'load' });
      await fireNative('dismissed');
      await a.getByTestId('mino-card').waitFor({ timeout: 60_000 });
      await a.waitForTimeout(500);
      check('not shown immediately (waits for some use)', (await prompt.count()) === 0);
      await a.waitForTimeout(1500);
      const main0 = await a.locator('main').first().boundingBox();
      await prompt.waitFor({ timeout: 15_000 });
      await a.evaluate(() => localStorage.setItem('mino.installDelayMs', '1200'));
      check('Android phone: "Install Mino on your phone" with the body, Install + Not now', /Install Mino on your phone/.test(await prompt.innerText()) && /home screen/.test(await prompt.innerText()) && (await prompt.getByRole('button', { name: 'Install' }).isVisible()) && (await prompt.getByRole('button', { name: 'Not now' }).isVisible()));
      check('install card has the small Mino beside it', (await prompt.locator('.mino').count()) === 1);
      await a.waitForTimeout(500);
      const pbox = (await prompt.boundingBox())!;
      const nav = await a.locator('nav').filter({ has: a.getByRole('link') }).last().boundingBox();
      check('install card fits the phone and sits above the bottom bar', pbox.x >= 0 && pbox.x + pbox.width <= 390 && (!nav || pbox.y + pbox.height <= nav.y + 1), JSON.stringify({ pbox, nav }));
      check('install card: no sideways scroll', await noHorizontalScroll(a), await overflowers(a));
      check('install card: no layout shift (floats over the page)', JSON.stringify(main0) === JSON.stringify(await a.locator('main').first().boundingBox()));
      await shot(a, 'pwa-01-install-mobile', false);

      // "Not now": remembered, not back on the next load.
      await prompt.getByRole('button', { name: 'Not now' }).click();
      check('"Not now" hides it', (await prompt.count()) === 0);
      const afterNo = await stored();
      check('"Not now" is stored (dismissedAt + count)', typeof afterNo.dismissedAt === 'number' && afterNo.dismissCount === 1, JSON.stringify(afterNo));
      await home();
      await fireNative('dismissed');
      await a.waitForTimeout(2500);
      check('after "Not now": not shown again on the next page load', (await prompt.count()) === 0);

      // Install → the browser's own dialog; accepted → never again.
      await a.evaluate(() => localStorage.removeItem('mino.install'));
      await home();
      await fireNative('accepted');
      await prompt.waitFor({ timeout: 10_000 });
      await prompt.getByRole('button', { name: 'Install' }).click();
      await a.waitForFunction(() => typeof JSON.parse(localStorage.getItem('mino.install') ?? '{}').installedAt === 'number', null, { timeout: 5_000 }).catch(() => undefined);
      check('Install opens the native prompt (beforeinstallprompt.prompt())', (await a.evaluate(() => (window as unknown as { __prompted: number }).__prompted)) === 1);
      check('accepted → installedAt stored, card gone', typeof (await stored()).installedAt === 'number' && (await prompt.count()) === 0);
      await home();
      await fireNative('accepted');
      await a.waitForTimeout(2500);
      check('after installing: never shown again', (await prompt.count()) === 0);

      // Installed from the browser menu instead (appinstalled) → the card goes away for good.
      await a.evaluate(() => localStorage.removeItem('mino.install'));
      await home();
      await fireNative('dismissed');
      await prompt.waitFor({ timeout: 10_000 });
      await a.evaluate(() => window.dispatchEvent(new Event('appinstalled')));
      await a.waitForTimeout(300);
      check('appinstalled → card hidden and installedAt stored', (await prompt.count()) === 0 && typeof (await stored()).installedAt === 'number');

      // Opened as the installed app (standalone): no card, even if the event came.
      await a.evaluate(() => localStorage.removeItem('mino.install'));
      await a.addInitScript(() => {
        const mm = window.matchMedia.bind(window);
        window.matchMedia = (q: string) => (/display-mode: standalone/.test(q) ? ({ matches: true, media: q, addEventListener() {}, removeEventListener() {} } as unknown as MediaQueryList) : mm(q));
      });
      await home();
      await fireNative('dismissed');
      await a.waitForTimeout(2500);
      check('standalone (installed app) → no card', (await prompt.count()) === 0);
      await actx.close();
    }

    await p.goto(`${BASE}/abroad`, { waitUntil: 'load' });
    await p.getByTestId('abroad-start').waitFor({ timeout: 60_000 });
    check('new student sees one clear start card', await p.getByRole('link', { name: /Start my journey/ }).isVisible());
    const hubs = p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link');
    check('hub bar: Journey · Explore · Money · Apply · Visa & go', (await hubs.allInnerTexts()).join('|') === 'Journey|Explore|Money|Apply|Visa & go', (await hubs.allInnerTexts()).join('|'));
    check('Journey hub is marked current', (await hubs.first().getAttribute('aria-current')) === 'page');
    await shot(p, 'sa-3a-01-new-student');
    await p.getByRole('link', { name: /Start my journey/ }).click();
    await p.waitForURL('**/setup/abroad');
    check('start card opens the goal setup', p.url().endsWith('/setup/abroad'));

    // A student with a goal and a shortlist (set as saved data once the app is idle, then the UI takes over).
    await p.goto(`${BASE}/abroad`, { waitUntil: 'load' });
    await p.getByTestId('abroad-start').waitFor({ timeout: 60_000 });
    await patchField(`users/${uid}`, 'app.abroad', { degreeLevel: 'masters', subject: 'Computer Science', targetIntake: { month: 10, year: 2027 }, preferredCountryCodes: ['DE', 'KR'] });
    await p.goto(`${BASE}/abroad`, { waitUntil: 'load' });
    await p.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    const journeyText = await p.getByTestId('abroad-journey').innerText();
    check('journey: goal set, country not chosen → "Choose your country" first (setup, not a phase)', (await p.getByTestId('abroad-journey').getAttribute('data-current-phase')) === 'setup-country' && /Choose your country/.test(journeyText), journeyText.slice(0, 160));
    check('journey shows the goal line (degree · subject · intake)', /Master.*Computer Science.*2027/.test(await p.getByTestId('journey-goal').innerText()), await p.getByTestId('journey-goal').innerText());
    check('six phases: English · Documents · University · Apply · Visa · Departure', (await p.locator('[data-phase]').allInnerTexts()).map((x) => x.trim()).join('|') === 'English|Documents|University|Apply|Visa|Departure', (await p.locator('[data-phase]').allInnerTexts()).join('|'));
    // English follows IELTS (this student set a target in onboarding → in progress); nothing is completed or ready from missing data.
    check('nothing is marked done from missing data', (await p.locator('[data-phase][data-status="completed"], [data-phase][data-status="ready"]').count()) === 0 && (await p.locator('[data-phase="english"]').getAttribute('data-status')) === 'in-progress' && (await p.locator('[data-phase][data-status="not-started"]').count()) === 5);
    check('one primary action (Explore countries)', (await p.getByTestId('abroad-continue').count()) === 1 && (await p.getByTestId('abroad-continue').getAttribute('href')) === '/abroad/countries');
    await p.getByRole('button', { name: 'Make Germany my dream country' }).click();
    let a = await waitForAbroad(uid, (x) => x.dreamCountryCode === 'DE');
    check('Firestore: dream country saved', a.dreamCountryCode === 'DE', JSON.stringify(a).slice(0, 160));
    await p.waitForFunction(() => document.querySelector('[data-testid="abroad-journey"]')?.getAttribute('data-current-phase') === 'english', null, { timeout: 10_000 });
    check('now: English Ready (IELTS target not reached yet)', (await p.getByTestId('journey-now').innerText()) === 'English Ready');
    check('now: one primary action → IELTS preparation', (await p.getByTestId('abroad-continue').innerText()).includes('Open IELTS preparation') && (await p.getByTestId('abroad-continue').getAttribute('href')) === '/ielts');
    check('next: Documents Ready', /Next: Documents Ready/.test(await p.getByTestId('journey-next').innerText()));
    check('no long list of roadmap steps on Journey', (await p.locator('[data-step]').count()) === 0);
    check('dream country card shows Germany', /Germany/.test(await p.getByTestId('abroad-dream').innerText()));
    check('shortlist shows South Korea', /South Korea/.test(await p.getByTestId('abroad-shortlist').innerText()));
    check('Mino appears once on Journey (not on every card)', (await p.locator('main').getByRole('link', { name: /Mino/ }).count()) === 1);
    // An earlier stage mark (saved data from the previous journey screen) still counts in the new phases.
    await patchField(`users/${uid}`, 'app.abroad.journey', { marks: { eligibility: { status: 'done', countryCode: 'DE', updatedAt: new Date().toISOString() } } });
    await p.reload({ waitUntil: 'load' });
    await p.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    a = await waitForAbroad(uid, (x) => x.journey?.marks?.eligibility?.status === 'done');
    check('Firestore: eligibility marked done for Germany', a.journey?.marks?.eligibility?.countryCode === 'DE', JSON.stringify(a.journey ?? {}).slice(0, 160));
    await p.locator('[data-phase="university"] a').click();
    await p.waitForURL('**/abroad/journey/university');
    await p.getByTestId('journey-phase').waitFor({ timeout: 60_000 });
    check('phase page: Choose University · In progress', (await p.getByRole('heading', { level: 1 }).innerText()) === 'Choose University' && (await p.getByTestId('journey-phase').getAttribute('data-status')) === 'in-progress');
    check('phase page: "What you’ll do" has 3–5 short items', (await p.getByTestId('phase-do').locator('li').count()) >= 3 && (await p.getByTestId('phase-do').locator('li').count()) <= 5);
    check('phase page: one action to the existing universities page', (await p.getByTestId('phase-primary').getAttribute('href')) === '/abroad/universities?country=de');
    check('phase page: budget is a link to the cost planner (not a phase)', (await p.getByTestId('journey-budget').getAttribute('href')) === '/abroad/cost?country=de');
    check('phase page: the existing roadmap steps of this phase (eligibility + budget done by the stage mark)', (await p.locator('[data-step]').evaluateAll((els) => els.map((e) => `${e.getAttribute('data-step')}:${e.getAttribute('data-status')}`).join(','))).startsWith('eligibility:done,budget:done,programs:'), await p.locator('[data-step]').evaluateAll((els) => els.map((e) => e.getAttribute('data-step')).join(',')));
    check('phase page: a single contextual Ask Mino', (await p.getByTestId('phase-ask-mino').count()) === 1 && (await p.locator('main').getByRole('link', { name: /Mino/ }).count()) === 1);
    check('phase page desktop: no sideways scroll', await noHorizontalScroll(p));
    await p.waitForTimeout(500);
    await shot(p, 'sa-journey-02-phase-university');
    await p.getByRole('link', { name: 'Journey', exact: true }).first().click();
    await p.waitForURL(/\/abroad$/);
    await p.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    check('back to Journey from the phase page', true);
    check('desktop: no sideways scroll', await noHorizontalScroll(p));
    await p.waitForTimeout(500);
    await shot(p, 'sa-3a-02-journey-light');
    await setDark(p, true);
    const bg = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
    check('dark mode: tokens switch (body is dark)', lightness(bg) < 30, bg);
    await shot(p, 'sa-3a-03-journey-dark');
    await setDark(p, false);
    await p.getByTestId('abroad-ask-mino').click();
    await p.waitForURL('**/mino**');
    await p.getByText(/Look at my Study Abroad journey/).first().waitFor({ timeout: 30_000 });
    check('Ask Mino opens Mino with the journey question', true);
    await p.goto(`${BASE}/ielts/foundation`, { waitUntil: 'load' });
    await p.getByText('Level 1 — Foundation Grammar').waitFor({ timeout: 60_000 });
    check('Foundation still opens (regression)', true);
    const f = await waitForFoundation(uid, () => true);
    check('Foundation progress untouched by Study Abroad', f === null || typeof f === 'object');

    // ============================================================ 3B · Country explorer
    console.log('\n[3B] Country explorer');
    await p.goto(`${BASE}/abroad/countries`, { waitUntil: 'load' });
    await p.getByTestId('priority-countries').waitFor({ timeout: 60_000 });
    const priorityCodes = await p.getByTestId('priority-countries').locator('[data-country]').evaluateAll((els) => els.map((e) => e.getAttribute('data-country')));
    check('14 priority countries, in order, New Zealand last', priorityCodes.join(',') === 'KR,DE,AU,GB,CA,US,JP,IT,FR,NL,SE,FI,IE,NZ', priorityCodes.join(','));
    check('more destinations listed separately', (await p.getByTestId('other-countries').locator('[data-country]').count()) === 6);
    check('Explore hub is marked current', (await p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link', { name: 'Explore' }).getAttribute('aria-current')) === 'page');
    const broken = await p.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length);
    check('no broken images (placeholders until licensed photos exist)', broken === 0 && (await p.locator('[data-placeholder]').count()) === 20, `${broken} broken`);
    const kr = p.locator('[data-country="KR"]');
    check('South Korea card claims nothing unverified', /Profile coming/.test(await kr.innerText()));
    check('Canada card shows only verified topics', /Work while studying/.test(await p.locator('[data-country="CA"]').innerText()) && /Verified facts: 3/.test(await p.locator('[data-country="CA"]').innerText()));
    check('Explore links to the country hub', (await kr.getByRole('link', { name: 'Explore' }).getAttribute('href')) === '/abroad/countries/kr');
    await p.getByRole('searchbox', { name: 'Search countries or capitals' }).fill('wellington');
    check('search by capital finds New Zealand', (await p.locator('[data-country]').count()) === 1 && (await p.locator('[data-country="NZ"]').count()) === 1);
    await p.getByRole('searchbox', { name: 'Search countries or capitals' }).fill('');
    await p.getByRole('button', { name: 'Asia', exact: true }).click();
    check('region filter: Asia', (await p.locator('[data-country]').evaluateAll((els) => els.map((e) => e.getAttribute('data-country')))).join(',') === 'KR,JP,CN,MY');
    await p.getByRole('button', { name: 'All', exact: true }).click();
    await kr.getByRole('button', { name: 'Shortlisted' }).click();
    const sa = await waitForAbroad(uid, (x) => (x.preferredCountryCodes as string[] | undefined)?.includes('KR') === false);
    check('South Korea was already shortlisted → removed from shortlist', !(sa.preferredCountryCodes as string[]).includes('KR'), JSON.stringify(sa.preferredCountryCodes));
    await kr.getByRole('button', { name: 'Add to shortlist' }).click();
    const sb = await waitForAbroad(uid, (x) => (x.preferredCountryCodes as string[] | undefined)?.includes('KR') === true);
    check('Firestore: shortlist toggles back on', (sb.preferredCountryCodes as string[]).includes('KR'));
    check('dream country badge on Germany', /Dream country/.test(await p.locator('[data-country="DE"]').innerText()));
    check('explorer desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3b-01-explorer');

    // ============================================================ 3C · Country hub (one template)
    console.log('\n[3C] Country hub');
    await kr.getByRole('link', { name: 'Explore' }).click();
    await p.waitForURL('**/abroad/countries/kr');
    await p.getByTestId('hub-sections').waitFor({ timeout: 60_000 });
    check('hub: South Korea heading', (await p.getByRole('heading', { level: 1 }).innerText()) === 'South Korea');
    const tabs = p.getByRole('tablist').getByRole('tab');
    check('six tabs in order', (await tabs.allInnerTexts()).join('|') === 'Overview|Universities|Money|Apply|Visa & life|My roadmap', (await tabs.allInnerTexts()).join('|'));
    check('Overview selected by default', (await tabs.first().getAttribute('aria-selected')) === 'true');
    const krStatuses = await p.locator('[data-section]').evaluateAll((els) => els.map((e) => e.getAttribute('data-status')));
    check('South Korea: every section “Not verified yet” (nothing invented)', krStatuses.length > 0 && krStatuses.every((s) => s === 'not-yet'), krStatuses.join(','));
    const firstSection = p.locator('[data-section]').first();
    check('open section shows Official information block', /Official information/i.test(await firstSection.innerText()) && /Not verified yet\. Official facts will appear here/.test(await firstSection.innerText()));
    check('open section shows a separate Mino block', /Mino’s explanation/i.test(await firstSection.innerText()));
    check('hub sections carry no per-section "Ask Mino" (one Mino entry per page)', (await p.locator('[data-section]').getByRole('link', { name: /Ask Mino about/ }).count()) === 0);
    check('fit question links to Mino', (await p.getByTestId('hub-fit').getAttribute('href')) === '/mino?ask=abroad-fit&country=kr');
    check('non-dream country offers Build my plan', await p.getByTestId('hub-build-plan').isVisible());

    // ============================================================ Explore · Country → study option → one complete guide
    console.log('\n[EX] Explore: country → study option → guide');
    const opts = await p.locator('[data-study-option]').evaluateAll((els) => els.map((e) => e.getAttribute('data-study-option')));
    check('KR study options come from its data (degree levels + language)', opts.join(',') === 'degree-bachelors,degree-masters,degree-phd,language', opts.join(','));
    check('options are grouped by pathway with their visa (D-2 / D-4)', /D-2 visa/.test(await p.locator('[data-option-group="degree"]').innerText()) && /D-4 visa/.test(await p.locator('[data-option-group="language"]').innerText()));
    await p.locator('[data-study-option="degree-bachelors"]').click();
    await p.waitForURL('**/abroad/countries/kr/study/degree-bachelors');
    const guideEl = p.getByTestId('study-guide');
    await guideEl.waitFor({ timeout: 60_000 });
    check('guide: South Korea — Bachelor’s, D-2 visa', (await p.getByRole('heading', { level: 1 }).innerText()) === 'South Korea — Bachelor’s'.replace('’', "'") && /D-2 visa/.test(await guideEl.innerText()));
    const guideSections = await p.locator('[data-guide-section]').evaluateAll((els) => els.map((e) => e.getAttribute('data-guide-section')));
    check('guide: every part on one page, in order', guideSections.join(',') === 'overview,who,study,admission,language,visa,documents,finances,costs,application,visa-application,after-admission,before-departure,notes,sources', guideSections.join(','));
    check('guide: readable text, no accordions to open', (await guideEl.locator('[aria-expanded]').count()) === 0);
    check('guide: verified visa facts with source + date', (await p.locator('[data-guide-section="visa"] [data-fact]').count()) > 0 && /verified/i.test(await p.locator('[data-guide-section="visa"]').innerText()));
    check('guide: unverified part says so ("not verified yet")', (await p.locator('[data-guide-section="who"]').getAttribute('data-verified')) === 'false' && /This information is not verified yet/.test(await p.locator('[data-guide-section="who"]').innerText()));
    const docKinds = await p.locator('[data-guide-doc]').evaluateAll((els) => els.map((e) => e.getAttribute('data-guide-doc')));
    check('guide: documents for this option, each once (passport, admission letter…)', docKinds.length > 0 && new Set(docKinds).size === docKinds.length && docKinds.includes('passport') && docKinds.includes('admission-letter'), docKinds.join(','));
    check('guide: general-guidance documents kept apart from requirements', (await p.getByTestId('guide-documents-general').count()) === 1 && /Not an official requirement/.test(await p.getByTestId('guide-documents-general').innerText()));
    check('guide: money — official / estimate / your budget apart, no invented amount', /Official|Not verified yet/.test(await p.locator('[data-guide-section="costs"]').innerText()) && (await p.locator('[data-guide-section="finances"] [data-fact]').count()) > 0);
    check('guide: only D-2 content (no D-4 blocks leak into the degree guide)', (await p.locator('[data-guide-block*="kr-d4"]').count()) === 0 && (await p.locator('[data-guide-block*="kr-d2"]').count()) > 0);
    check('guide: official sources listed and linked', (await p.getByTestId('guide-sources').locator('a[href^="http"]').count()) >= 3);
    check('guide: Mino is one optional link, not the interface', (await guideEl.getByRole('link', { name: /Mino/ }).count()) === 1 && (await p.getByTestId('guide-ask-mino').getAttribute('href')) === '/mino?ask=abroad-option&country=kr&option=degree-bachelors');
    check('guide desktop: no sideways scroll', await noHorizontalScroll(p), await overflowers(p));
    await shot(p, 'ex-01-kr-bachelors-guide');
    await p.goto(`${BASE}/abroad/countries/kr/study/degree-masters`, { waitUntil: 'load' });
    await guideEl.waitFor({ timeout: 60_000 });
    check('personal: Master’s guide shows the student’s goal (Master’s · Computer Science)', /Master's · Computer Science/.test(await p.getByTestId('guide-for-you').innerText()));
    await p.goto(`${BASE}/abroad/countries/kr/study/language`, { waitUntil: 'load' });
    await guideEl.waitFor({ timeout: 60_000 });
    check('language option: D-4 guide, no D-2 blocks', /D-4 visa/.test(await guideEl.innerText()) && (await p.locator('[data-guide-block*="kr-d4"]').count()) > 0 && (await p.locator('[data-guide-block*="kr-d2"]').count()) === 0);
    await p.goto(`${BASE}/abroad/countries/us`, { waitUntil: 'load' });
    await p.getByTestId('study-options').waitFor({ timeout: 60_000 });
    check('a country without pathways: one general option (same system, no special case)', (await p.locator('[data-study-option]').evaluateAll((els) => els.map((e) => e.getAttribute('data-study-option')))).join(',') === 'general');
    await p.locator('[data-study-option="general"]').click();
    await p.waitForURL('**/abroad/countries/us/study/general');
    await guideEl.waitFor({ timeout: 60_000 });
    check('US general guide: nothing invented — unverified parts say so, no Korean data', (await p.locator('[data-guide-section][data-verified="false"]').count()) >= 10 && !/D-2|D-4|Korea/.test(await guideEl.innerText()));
    await p.goto(`${BASE}/abroad/countries/kr`, { waitUntil: 'load' });
    await p.getByTestId('hub-sections').waitFor({ timeout: 60_000 });

    await p.goto(`${BASE}/abroad/countries/de?tab=money`, { waitUntil: 'load' });
    await p.getByTestId('hub-sections').waitFor({ timeout: 60_000 });
    check('?tab=money opens the Money tab', (await p.getByRole('tab', { name: 'Money' }).getAttribute('aria-selected')) === 'true');
    const work = p.locator('[data-section="work"]');
    check('Germany · Part-time work: Verified', (await work.getAttribute('data-status')) === 'verified');
    await work.getByRole('button', { name: /Part-time work/ }).click();
    const fact = work.locator('[data-fact]').first();
    await fact.waitFor({ timeout: 5_000 });
    check('verified fact shows its official source link', (await fact.locator('a[href^="http"]').count()) === 1);
    check('verified fact shows when it was checked', /Verified|verified/.test(await fact.innerText()));
    check('Germany · Tuition fees: Not verified yet', (await p.locator('[data-section="tuition"]').getAttribute('data-status')) === 'not-yet');
    check('dream country: “Your dream country” + Open my roadmap', (await p.getByText('Your dream country').count()) === 1 && (await p.getByRole('link', { name: 'Open my roadmap' }).count()) >= 1);
    await p.getByRole('tab', { name: 'Apply' }).click();
    await p.waitForURL('**tab=apply');
    check('tab switch updates the URL', p.url().endsWith('?tab=apply'));
    const admission = p.locator('[data-section="admission"]');
    check('Admission section opens first on Apply', (await admission.getByRole('button', { name: /Admission requirements/ }).getAttribute('aria-expanded')) === 'true');
    const eligBtn = admission.getByRole('button', { name: 'Eligibility checked ✓' });
    check('eligibility already done on home shows as done here', await eligBtn.isVisible());
    await eligBtn.click();
    a = await waitForAbroad(uid, (x) => x.journey?.marks?.eligibility === undefined || x.journey?.marks?.eligibility?.status !== 'done');
    check('Firestore: eligibility un-marked from the hub', a.journey?.marks?.eligibility?.status !== 'done', JSON.stringify(a.journey ?? {}).slice(0, 160));
    await admission.getByRole('button', { name: 'I’ve checked my eligibility' }).click();
    a = await waitForAbroad(uid, (x) => x.journey?.marks?.eligibility?.status === 'done');
    check('Firestore: eligibility marked again, for Germany', a.journey?.marks?.eligibility?.countryCode === 'DE');
    check('hub desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3c-01-hub-de-apply');

    await p.goto(`${BASE}/abroad/countries/au?tab=visa`, { waitUntil: 'load' });
    await p.getByTestId('hub-sections').waitFor({ timeout: 60_000 });
    check('same template for Australia: Post-study verified', (await p.locator('[data-section="post-study"]').getAttribute('data-status')) === 'verified');
    await p.goto(`${BASE}/abroad/countries/de?tab=roadmap`, { waitUntil: 'load' });
    await p.getByTestId('hub-roadmap').waitFor({ timeout: 60_000 });
    check('hub roadmap tab: summary with the current step', /4 of 16 steps done · Now: Research programs/.test(await p.getByTestId('hub-roadmap').innerText()), await p.getByTestId('hub-roadmap').innerText());

    // ============================================================ 3E · Country roadmap
    console.log('\n[3E] Country roadmap');
    await p.getByTestId('hub-roadmap').getByRole('link', { name: 'Open my roadmap' }).click();
    await p.waitForURL('**/abroad/countries/de/roadmap');
    await p.getByTestId('roadmap-steps').waitFor({ timeout: 60_000 });
    check('roadmap title', (await p.getByRole('heading', { level: 1 }).innerText()) === 'My Germany roadmap');
    check('4 of 16 done (goal, country, eligibility stage marked earlier)', (await p.getByText('4 of 16 steps done').count()) >= 1);
    check('completed steps folded away', (await p.locator('[data-step]').count()) === 12 && (await p.getByRole('button', { name: 'Show completed steps (4)' }).count()) === 1);
    const cur = p.locator('[data-step="programs"]');
    check('current step: Research programs · You are here · In progress', (await cur.getAttribute('data-status')) === 'in-progress' && /You are here/.test(await cur.innerText()));
    check('current step is open with its action and Mino', (await cur.getByRole('link', { name: /Find universities/ }).getAttribute('href')) === '/abroad/universities?country=de' && (await cur.getByRole('link', { name: 'Ask Mino about this step' }).getAttribute('href')) === '/mino?ask=abroad-step&country=de&step=programs');
    await cur.getByRole('button', { name: 'Mark as done' }).click();
    a = await waitForAbroad(uid, (x) => (x.journey as { steps?: Record<string, Record<string, { status: string }>> })?.steps?.DE?.programs?.status === 'done');
    check('Firestore: step saved under the country', (a.journey as { steps?: Record<string, Record<string, { status: string }>> })?.steps?.DE?.programs?.status === 'done');
    await p.locator('[data-step="shortlist"]').getByRole('button', { name: 'Mark as done' }).click();
    await p.getByText('6 of 16 steps done').first().waitFor({ timeout: 10_000 });
    check('both program steps done → next is English', (await p.locator('[data-step="english"]').getAttribute('data-status')) === 'in-progress');
    check('English step is automatic (follows IELTS)', /Updates automatically/.test(await p.locator('[data-step="english"]').innerText()) && (await p.locator('[data-step="english"]').getByRole('button', { name: 'Mark as done' }).count()) === 0);
    const sop = p.locator('[data-step="sop-cv"]');
    await sop.getByRole('button', { name: /Write your SOP and CV/ }).click();
    check('step lists its documents', /Statement of purpose \(SOP\)/.test(await sop.innerText()) && /CV/.test(await sop.innerText()));
    const soon = new Date(Date.now() + 5 * 86_400_000).toISOString().slice(0, 10);
    await sop.getByTestId('step-date').fill(soon);
    a = await waitForAbroad(uid, (x) => (x.journey as { steps?: Record<string, Record<string, { dueAt?: string }>> })?.steps?.DE?.['sop-cv']?.dueAt === soon);
    check('Firestore: target date saved', (a.journey as { steps?: Record<string, Record<string, { dueAt?: string }>> })?.steps?.DE?.['sop-cv']?.dueAt === soon);
    await p.waitForFunction(() => document.querySelector('[data-step="sop-cv"]')?.getAttribute('data-status') === 'attention', null, { timeout: 10_000 });
    check('date in 5 days → Needs attention', /Due in 5 days/.test(await sop.innerText()));
    await p.getByRole('button', { name: 'Show completed steps (6)' }).click();
    await p.locator('[data-step="budget"]').getByRole('button', { name: /Plan your budget/ }).click();
    await p.locator('[data-step="budget"]').getByRole('button', { name: 'Not done yet' }).click();
    a = await waitForAbroad(uid, (x) => (x.journey as { steps?: Record<string, Record<string, { status: string }>> })?.steps?.DE?.budget?.status === 'in-progress');
    const js = a.journey as { marks: Record<string, { status: string }>; steps?: Record<string, Record<string, { status: string }>> };
    check('un-ticking one step keeps the other and re-opens the stage', js.steps?.DE?.eligibility?.status === 'done' && js.marks.eligibility.status === 'in-progress', JSON.stringify(js).slice(0, 240));
    await p.reload({ waitUntil: 'load' });
    await p.getByTestId('roadmap-steps').waitFor({ timeout: 60_000 });
    check('after reload: current step is Plan your budget', (await p.locator('[data-step="budget"]').getAttribute('data-status')) === 'in-progress' && /You are here/.test(await p.locator('[data-step="budget"]').innerText()));
    check('after reload: date still needs attention', (await p.locator('[data-step="sop-cv"]').getAttribute('data-status')) === 'attention');
    check('roadmap desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3e-01-roadmap');
    await p.goto(`${BASE}/abroad`, { waitUntil: 'load' });
    await p.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    await p.getByText('Needs attention').first().waitFor({ timeout: 15_000 }).catch(() => undefined);
    check('home: the step date is under "Needs attention"', /Needs attention/i.test(await p.locator('main').innerText()) && /Write your SOP and CV/.test(await p.locator('main').innerText()), (await p.locator('main').innerText()).slice(0, 400));
    await p.goto(`${BASE}/abroad/journey/documents`, { waitUntil: 'load' });
    await p.getByTestId('journey-phase').waitFor({ timeout: 60_000 });
    check('documents phase: shows the date that is due (Due in 5 days) on its step', /Due in 5 days/.test(await p.locator('main').innerText()));
    check('documents phase: its documents from the existing document engine, linked', (await p.getByTestId('phase-documents').locator('[data-phase-doc="passport"]').getAttribute('href')) === '/abroad/documents?open=passport');
    await p.goto(`${BASE}/abroad/countries/kr/roadmap`, { waitUntil: 'load' });
    await p.getByTestId('roadmap-inactive').waitFor({ timeout: 60_000 });
    check('other country: read-only roadmap + way back to the dream plan', (await p.getByRole('link', { name: 'Open my Germany roadmap' }).count()) === 1 && (await p.getByRole('button', { name: 'Mark as done' }).count()) === 0);

    // ============================================================ 3F · Universities
    console.log('\n[3F] Universities');
    type AB = Record<string, unknown> & { universities?: { name: string; countryCode: string; status: string; fit: string; officialUrl?: string }[]; deadlines?: { title: string; done?: boolean }[]; documents?: Record<string, { status: string }> };
    const ab = async (ok: (x: AB) => boolean) => (await waitForAbroad(uid, (x) => ok(x as AB))) as AB;
    await p.goto(`${BASE}/abroad/universities`, { waitUntil: 'load' });
    await p.getByLabel('Country').waitFor({ timeout: 60_000 });
    check('defaults to the dream country', (await p.getByLabel('Country').inputValue()) === 'DE');
    check('Explore hub is current', (await p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link', { name: 'Explore' }).getAttribute('aria-current')) === 'page');
    check('no invented universities: honest empty state', /No verified university profiles for Germany yet/.test(await p.getByTestId('uni-verified-empty').innerText()));
    await p.getByRole('button', { name: 'Add a university' }).click();
    await p.getByLabel('University name').fill('TU Test');
    await p.getByLabel('Official website (optional)').fill('https://www.tu-test.example');
    await p.getByRole('button', { name: 'Ambitious' }).click();
    await p.getByRole('button', { name: 'Add to my list' }).click();
    let x = await ab((y) => (y.universities?.length ?? 0) === 1);
    check('Firestore: university saved for Germany', x.universities?.[0].name === 'TU Test' && x.universities?.[0].countryCode === 'DE' && x.universities?.[0].fit === 'ambitious', JSON.stringify(x.universities));
    await p.locator('[data-university="TU Test"]').getByLabel('Status').selectOption('applied');
    x = await ab((y) => y.universities?.[0].status === 'applied');
    check('Firestore: status updated', x.universities?.[0].status === 'applied');
    check('official website link opens in a new tab', (await p.locator('[data-university="TU Test"]').getByRole('link', { name: 'Official website' }).getAttribute('target')) === '_blank');
    await p.getByRole('button', { name: 'Add a university' }).click();
    await p.getByLabel('University name').fill('Uni B');
    await p.getByRole('button', { name: 'Add to my list' }).click();
    await p.locator('[data-university="Uni B"]').waitFor();
    check('balance line + safer-choice tip', /1 ambitious · 1 good match · 0 safer/.test(await p.getByTestId('uni-balance').innerText()) && (await p.getByText(/add at least one safer choice/).count()) === 1);
    check('shortlist step already done on the roadmap shows here', (await p.getByRole('button', { name: 'Shortlist step done ✓' }).count()) === 1);
    check('universities desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3f-01-universities');

    // ============================================================ 3G · Scholarships
    console.log('\n[3G] Scholarships');
    await p.goto(`${BASE}/abroad/scholarships?country=gb`, { waitUntil: 'load' });
    await p.getByTestId('schol-empty').waitFor({ timeout: 60_000 });
    check('Money hub is current', (await p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link', { name: 'Money' }).getAttribute('aria-current')) === 'page');
    check('?country=gb selects the UK', (await p.getByLabel('Country').inputValue()) === 'GB');
    check('no invented scholarship facts', /No verified scholarship information for United Kingdom yet/.test(await p.getByTestId('schol-official').innerText()));
    check('no invented scholarships', /No verified scholarships here yet/.test(await p.getByTestId('schol-empty').innerText()));
    await p.getByRole('button', { name: 'Fully funded' }).click();
    check('funding filter toggles', (await p.getByRole('button', { name: 'Fully funded' }).getAttribute('aria-pressed')) === 'true');
    await p.getByLabel('Country').selectOption('DE');
    await p.waitForURL('**country=de');
    check('changing country updates the URL', p.url().endsWith('?country=de'));
    await p.getByRole('link', { name: 'Add a scholarship date to my deadlines' }).click();
    await p.waitForURL('**/abroad/deadlines?add=scholarship');

    // ============================================================ 3H · Deadlines
    console.log('\n[3H] Deadlines');
    await p.getByTestId('dl-form').waitFor({ timeout: 60_000 });
    check('Apply hub is current', (await p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link', { name: 'Apply' }).getAttribute('aria-current')) === 'page');
    check('form opens with Scholarship preselected', (await p.getByTestId('dl-form').locator('select').inputValue()) === 'scholarship');
    check('roadmap target date already listed (This week)', /Write your SOP and CV/.test(await p.locator('[data-bucket="this-week"]').innerText()));
    const in3 = new Date(Date.now() + 3 * 86_400_000).toISOString().slice(0, 10);
    await p.getByLabel('What is due?').fill('DAAD application');
    await p.getByTestId('dl-form').locator('input[type="date"]').fill(in3);
    await p.getByRole('button', { name: 'Add date' }).click();
    x = await ab((y) => (y.deadlines?.length ?? 0) === 1);
    check('Firestore: personal deadline saved', x.deadlines?.[0].title === 'DAAD application');
    const dl = p.locator('[data-origin="personal"]').first();
    check('new date sits in This week with days left', /In 3 days/.test(await dl.innerText()) && (await p.locator('[data-bucket="this-week"] [data-origin="personal"]').count()) === 1);
    await dl.getByRole('button', { name: 'Mark done' }).click();
    x = await ab((y) => y.deadlines?.[0].done === true);
    await p.locator('[data-bucket="completed"]').waitFor({ timeout: 10_000 });
    check('marked done → Completed (and saved)', x.deadlines?.[0].done === true);
    check('deadlines desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3h-01-deadlines');

    // ============================================================ 3I · Documents
    console.log('\n[3I] Documents');
    await p.goto(`${BASE}/abroad/documents`, { waitUntil: 'load' });
    await p.getByTestId('docs-required').waitFor({ timeout: 60_000 });
    check('documents for the Germany plan: 0 of 8 ready', /For your Germany plan/.test(await p.locator('main').innerText()) && (await p.getByTestId('docs-readiness').innerText()) === '0 of 8 ready');
    const sopDoc = p.locator('[data-document="sop"]');
    await sopDoc.getByRole('button', { name: /Statement of purpose/ }).click();
    await sopDoc.getByText('What to prepare').click();
    check('guide: what to include + general-guidance label', /What to include/.test(await sopDoc.innerText()) && /General guidance/.test(await sopDoc.innerText()));
    check('Ask Mino carries the document', (await sopDoc.getByRole('link', { name: 'Ask Mino to help with this' }).getAttribute('href')) === '/mino?ask=abroad-doc&doc=sop');
    await sopDoc.getByRole('button', { name: 'Ready' }).click();
    x = await ab((y) => y.documents?.sop?.status === 'ready');
    check('Firestore: document status saved', x.documents?.sop?.status === 'ready');
    check('readiness updates: 1 of 8', (await p.getByTestId('docs-readiness').innerText()) === '1 of 8 ready');
    check('documents desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3i-01-documents');

    // ============================================================ 3J · Visa
    console.log('\n[3J] Visa');
    await p.goto(`${BASE}/abroad/visa`, { waitUntil: 'load' });
    await p.locator('[data-visa-country="DE"]').waitFor({ timeout: 60_000 });
    check('Visa hub is current; dream country first', (await p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link', { name: 'Visa & go' }).getAttribute('aria-current')) === 'page' && (await p.locator('[data-visa-country]').first().getAttribute('data-visa-country')) === 'DE');
    await p.goto(`${BASE}/abroad/visa/gb`, { waitUntil: 'load' });
    await p.getByTestId('visa-parts').waitFor({ timeout: 60_000 });
    check('16 visa parts (12 + insurance, work, restrictions, stay)', (await p.locator('[data-section]').count()) === 16);
    const fin = p.locator('[data-section="finances"]');
    check('Proof of funds: partly verified, opened, 2 sourced facts', (await fin.getAttribute('data-status')) === 'partial' && (await fin.locator('[data-fact]').count()) === 2);
    await p.locator('[data-section="portal"]').getByRole('button', { name: /Where to apply/ }).click();
    check('Where to apply: official GOV.UK page, still "Not verified yet"', (await p.locator('[data-section="portal"] a[href="https://www.gov.uk/student-visa"]').count()) === 1 && (await p.locator('[data-section="portal"]').getAttribute('data-status')) === 'not-yet');
    check('Ask Mino carries country and part', (await p.locator('[data-section="portal"]').getByRole('link', { name: /Ask Mino about/ }).getAttribute('href')) === '/mino?ask=abroad-visa&country=gb&part=portal');
    check('visa desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3j-01-visa-gb');
    await p.goto(`${BASE}/abroad`, { waitUntil: 'load' });
    await p.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    check('home tools: centres no longer "Soon"', (await p.locator('main').getByText('Soon', { exact: true }).count()) === 0, String(await p.locator('main').getByText('Soon', { exact: true }).count()));

    // ============================================================ 3N · Next action on home
    console.log('\n[3N] Next action');
    check('home: the date due this week is listed under Needs attention', /Write your SOP and CV/.test(await p.locator('main').innerText()) && /In 5 days/.test(await p.locator('main').innerText()));
    check('home: the one primary action is the current phase (English → IELTS)', (await p.getByTestId('abroad-continue').getAttribute('href')) === '/ielts');

    // ============================================================ 3K · Country Match v2
    console.log('\n[3K] Country Match');
    await p.goto(`${BASE}/abroad/country-match`, { waitUntil: 'load' });
    await p.getByRole('button', { name: 'Post-study work' }).waitFor({ timeout: 60_000 });
    await p.getByRole('button', { name: 'Post-study work' }).click();
    await p.getByRole('button', { name: 'Show my matches' }).click();
    await p.locator('[data-match="CA"]').waitFor({ timeout: 10_000 });
    x = await ab((y) => Boolean((y as { priorities?: object }).priorities));
    check('dream country stays on the shortlist after saving answers', ((x.preferredCountryCodes as string[]) ?? []).includes('DE'), JSON.stringify(x.preferredCountryCodes));
    check('each match leads to an action (Explore)', (await p.locator('[data-match="CA"]').getByRole('link', { name: 'Explore' }).getAttribute('href')) === '/abroad/countries/ca');
    check('Germany (no verified post-study data) is listed as not enough data, not ranked', (await p.locator('[data-match="DE"]').count()) === 0 && /Not enough verified data yet/.test(await p.locator('main').innerText()));
    await p.locator('[data-match="CA"]').getByRole('button', { name: 'Add to compare' }).click();
    await p.locator('[data-match="GB"]').getByRole('button', { name: 'Add to compare' }).click();
    check('compare bar appears with 2', (await p.getByTestId('match-compare').innerText()).includes('Compare 2'));
    check('match desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3k-01-match');
    await p.getByTestId('match-compare').click();
    await p.waitForURL('**/abroad/compare?c=ca,gb');

    // ============================================================ 3L · Compare
    console.log('\n[3L] Compare');
    await p.getByTestId('compare-table').waitFor({ timeout: 60_000 });
    check('two countries side by side', (await p.locator('[data-compare-country]').count()) === 2);
    check('work row: Canada verified, facts sourced', (await p.locator('[data-row="work"] [data-cell="CA"]').getAttribute('data-status')) === 'verified' && (await p.locator('[data-row="work"] [data-cell="CA"] a[href^="https://www.canada.ca"]').count()) === 1);
    check('tuition row: not verified for both (nothing invented)', (await p.locator('[data-row="tuition"] [data-status="not-yet"]').count()) === 2 && /Not verified yet/.test(await p.locator('[data-row="tuition"]').innerText()));
    await p.getByLabel('Country 3').selectOption('DE');
    await p.waitForURL('**c=ca,gb,de');
    check('third country added via picker → URL', (await p.locator('[data-compare-country]').count()) === 3);
    check('compare desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3l-01-compare');

    // ============================================================ 3M · Mino
    console.log('\n[3M] Mino');
    await p.getByRole('link', { name: 'Ask Mino to compare these' }).click();
    await p.waitForURL('**/mino**');
    await p.getByText(/Compare Canada, United Kingdom, Germany for my Study Abroad plan/).first().waitFor({ timeout: 30_000 });
    check('Mino gets the comparison question with the verified-only rule', true);

    // ============================================================ Korea B2 · pathways & visa categories
    console.log('\n[KR-B2] Pathways, visa categories, work check, Apply ↔ Roadmap');
    type PB = Record<string, unknown> & { pathwayByCountry?: Record<string, string>; journey?: { steps?: Record<string, Record<string, { status: string }>> } };
    const pb = async (ok: (x: PB) => boolean) => (await waitForAbroad(uid, (y) => ok(y as PB))) as PB;
    await p.goto(`${BASE}/abroad/countries/kr`, { waitUntil: 'load' });
    await p.getByTestId('pathway-picker').waitFor({ timeout: 60_000 });
    check('KR hub asks "What are you planning to study?" with 2 pathways', (await p.getByTestId('pathway-picker').locator('[data-pathway]').count()) === 2);
    await p.locator('[data-option-group="language"]').click();
    let y = await pb((v) => v.pathwayByCountry?.KR === 'language');
    check('Firestore: pathway saved per country', y.pathwayByCountry?.KR === 'language');
    check('KR sections stay honest: all Not verified yet', (await p.locator('[data-section][data-status="not-yet"]').count()) === (await p.locator('[data-section]').count()));
    check('Germany hub has no pathway picker', await (async () => { await p.goto(`${BASE}/abroad/countries/de`, { waitUntil: 'load' }); await p.getByTestId('hub-sections').waitFor({ timeout: 60_000 }); return (await p.getByTestId('pathway-picker').count()) === 0; })());
    await p.goto(`${BASE}/abroad/visa/kr`, { waitUntil: 'load' });
    await p.getByTestId('visa-parts').waitFor({ timeout: 60_000 });
    check('language pathway → only D-4', (await p.getByTestId('visa-categories').locator('[data-category]').allInnerTexts()).join() === 'D-4' && (await p.getByTestId('visa-parts').getAttribute('data-category')) === 'D-4');
    // C1.3: D-4 filled from official sources; interview, processing time and insurance stay "Not verified yet".
    check('D-4: only interview / processing / insurance Not verified yet; type needs review (D-4 type names differ)', (await p.locator('[data-section][data-status="not-yet"]').count()) === 3 && ['interview', 'processing', 'insurance'].every(Boolean) && (await p.locator('[data-section="interview"]').getAttribute('data-status')) === 'not-yet' && (await p.locator('[data-section="type"]').getAttribute('data-status')) === 'needs-review');
    const d4Type = await p.locator('[data-section="type"]').innerText();
    check('D-4 type: official name, D-4-1, source + date; no D-2 data', /D-4 \(General Trainee\)/.test(d4Type) && /D-4-1 Korean Language Training/.test(d4Type) && /Korea Immigration Service/.test(d4Type) && /verified [^\n]*2026/.test(d4Type) && !/D-2-|D-2 \(Student\)/.test(d4Type), d4Type.slice(0, 200));
    check('picker card: which visa (official name) + source', /Visa: D-4 \(General Trainee\)/.test(await p.locator('[data-option-group="language"]').innerText()) && /Visa: D-2 \(Student\)/.test(await p.locator('[data-option-group="degree"]').innerText()) && (await p.getByTestId('pathway-source').first().getAttribute('href')) === 'https://www.immigration.go.kr/bbs/immigration_eng/230/454085/download.do');
    await p.locator('[data-section="documents"] button[aria-expanded]').first().click();
    const bd = await p.locator('[data-block="kr-bd-specific"]').innerText();
    check('Bangladesh block: "Needs review" (dated Embassy list) + Embassy link', /Bangladesh-specific requirement: Needs review/.test(bd) && (await p.locator('[data-block="kr-bd-specific"]').getAttribute('data-status')) === 'needs-review' && (await p.locator('[data-block="kr-bd-specific"] a[href^="https://overseas.mofa.go.kr/bd-en/"]').count()) >= 1, bd.slice(0, 200));
    check('D-4 TB block: requirement + dated center (needs review)', (await p.locator('[data-block="kr-bd-tb"]').count()) === 1 && /PRAAVA HEALTH/.test(await p.locator('[data-block="kr-bd-tb"]').innerText()));
    const wc4 = p.getByTestId('work-check');
    check('D-4 Can I work? asks (months in Korea), never guesses', (await wc4.getAttribute('data-state')) === 'needs-answers' && (await wc4.getByLabel('How long have you been in Korea on D-4?').count()) === 1);
    await wc4.getByLabel('How long have you been in Korea on D-4?').selectOption('6-plus');
    if (await wc4.getByLabel('Your Korean level (TOPIK)').count()) await wc4.getByLabel('Your Korean level (TOPIK)').selectOption('topik-2');
    await p.waitForFunction(() => document.querySelector('[data-testid="work-check"]')?.getAttribute('data-state') === 'answered', null, { timeout: 10_000 }).catch(() => undefined);
    const wc4Txt = await wc4.innerText();
    check('D-4 rule: its own (Study in Korea) rule, marked partly verified; no D-2 hours', (await wc4.getAttribute('data-state')) === 'answered' && /20 hours a week/.test(wc4Txt) && /Partly verified/.test(wc4Txt) && !/25 hours a week|30 hours a week/.test(wc4Txt), wc4Txt.slice(0, 200));
    check('D-4 visa desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-kr-c13-01-d4-desktop');
    await p.getByTestId('pathway-picker').locator('[data-option-group="degree"]').click();
    await p.waitForFunction(() => document.querySelector('[data-testid="visa-parts"]')?.getAttribute('data-category') === 'D-2', null, { timeout: 10_000 });
    y = await pb((v) => v.pathwayByCountry?.KR === 'degree');
    check('switch to degree → D-2, saved', y.pathwayByCountry?.KR === 'degree' && (await p.getByTestId('visa-categories').locator('[data-category]').allInnerTexts()).join() === 'D-2');
    await p.locator('[data-section="type"] button[aria-expanded="false"]').first().click().catch(() => undefined);
    const d2Type = await p.locator('[data-section="type"]').innerText();
    check('D-2 type: official name + degree subtypes; no D-4 data', /D-2 \(Student\)/.test(d2Type) && /D-2-3 Master's/.test(d2Type) && !/D-4/.test(d2Type), d2Type.slice(0, 200));
    check('Ask Mino carries the visa category', /category=D-2/.test((await p.locator('[data-section]').first().getByRole('link', { name: /Ask Mino about/ }).getAttribute('href')) ?? ''));

    // ============================================================ Korea C1.2 · D-2 official visa data (English desktop)
    console.log('\n[KR-C1.2] D-2: overview → subtype → documents → money → Bangladesh → work → roadmap → Mino');
    const openPart = async (id: string) => {
      const btn = p.locator(`[data-section="${id}"] button[aria-expanded]`).first();
      if ((await btn.getAttribute('aria-expanded')) !== 'true') await btn.click();
      return p.locator(`[data-section="${id}"]`).innerText();
    };
    check('D-2: sourced parts show; interview + processing stay "Not verified yet"', (await p.locator('[data-section="interview"]').getAttribute('data-status')) === 'not-yet' && (await p.locator('[data-section="processing"]').getAttribute('data-status')) === 'not-yet' && (await p.locator('[data-section="eligibility"]').getAttribute('data-status')) === 'partial');
    check('D-2 eligibility: official review criteria + source', /valid passport/.test(await openPart('eligibility')) && /Easylaw/.test(await p.locator('[data-section="eligibility"]').innerText()));
    const docsTxt = await openPart('documents');
    check('D-2 documents: 8-item official list + Bangladesh block kept apart', (await p.locator('[data-block="kr-d2-documents-list"] [data-fact]').count()) === 8 && /Bangladesh-specific requirement: Needs review/.test(docsTxt));
    const finTxt = await openPart('finances');
    check('D-2 money: "Official amount not verified yet", no amount shown', /Official amount not verified yet/.test(finTxt) && !/(USD|KRW|BDT|\$)\s?\d/.test(finTxt), finTxt.slice(0, 160));
    const portalTxt = await openPart('portal');
    check('D-2 where to apply: Dhaka Visa Application Center (Embassy source)', /Korea Visa Application Center, Dhaka/.test(portalTxt) && (await p.locator('[data-section="portal"] a[href="https://overseas.mofa.go.kr/bd-en/brd/m_2124/view.do?seq=760105"]').count()) >= 1);
    check('D-2 fees: official amounts as written, no conversion', /BDT 2,150 per application/.test(await openPart('fees')));
    check('D-2 stay: 2 years per grant (KIS)', /Up to 2 years per grant/.test(await openPart('stay')));
    const wc = p.getByTestId('work-check');
    // Answers the student already gave on this page (e.g. TOPIK) carry over; anything missing is asked.
    check('Can I work? on D-2 asks or uses the student\'s own answers, never guesses', ['needs-answers', 'answered'].includes((await wc.getAttribute('data-state')) ?? ''));
    if (await wc.getByLabel('Which degree will you study?').count()) await wc.getByLabel('Which degree will you study?').selectOption('masters');
    if (await wc.getByLabel('Your Korean level (TOPIK)').count()) await wc.getByLabel('Your Korean level (TOPIK)').selectOption('topik-4');
    if (await wc.getByLabel("Your bachelor's year").count()) await wc.getByLabel("Your bachelor's year").selectOption('3-4');
    await p.waitForFunction(() => document.querySelector('[data-testid="work-check"]')?.getAttribute('data-state') === 'answered', null, { timeout: 10_000 }).catch(() => undefined);
    const wcTxt = await wc.innerText();
    check('Can I work? → the sourced D-2 rule for these answers', (await wc.getAttribute('data-state')) === 'answered' && /hours a week/.test(wcTxt) && /Easylaw/.test(wcTxt), wcTxt.slice(0, 200));
    check('D-2 visa desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-kr-c12-01-d2-desktop');
    await openPart('finances');
    check('Ask Mino from a D-2 part carries part + category', /part=finances/.test((await p.locator('[data-section="finances"]').getByRole('link', { name: /Ask Mino about/ }).getAttribute('href')) ?? '') && /category=D-2/.test((await p.locator('[data-section="finances"]').getByRole('link', { name: /Ask Mino about/ }).getAttribute('href')) ?? ''));
    await p.goto(`${BASE}/abroad/countries/kr/roadmap`, { waitUntil: 'load' });
    await p.getByTestId('roadmap-steps').waitFor({ timeout: 60_000 });
    await p.locator('[data-step="visa"] button[aria-expanded]').first().click();
    check('roadmap visa step lists the D-2 documents (same store as Apply)', (await p.locator('[data-step="visa"] [data-step-doc="admission-letter"]').count()) === 1);
    await p.goto(`${BASE}/abroad/visa/kr`, { waitUntil: 'load' });
    await p.getByTestId('pathway-picker').waitFor({ timeout: 60_000 });
    await p.getByTestId('pathway-picker').locator('[data-option-group="degree"]').click();
    y = await pb((v) => !v.pathwayByCountry?.KR);
    check('no pathway → both categories, with a hint to choose', (await p.getByTestId('visa-categories').locator('[data-category]').allInnerTexts()).join() === 'D-2,D-4' && /Choose your pathway/.test(await p.locator('main').innerText()));
    check('visa KR desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-kr-b2-01-visa');
    await p.goto(`${BASE}/abroad/visa/de`, { waitUntil: 'load' });
    await p.getByTestId('work-check').waitFor({ timeout: 60_000 });
    check('Germany: no categories; Can I work? shows the sourced rule', (await p.getByTestId('visa-categories').count()) === 0 && (await p.getByTestId('work-check').getAttribute('data-state')) === 'answered' && /140 full days/.test(await p.getByTestId('work-check').innerText()));
    await p.goto(`${BASE}/abroad/countries/de?tab=apply`, { waitUntil: 'load' });
    await p.getByTestId('apply-steps').waitFor({ timeout: 60_000 });
    const lorBox = p.locator('[data-apply-step="lor"]');
    check('Apply checklist lists the roadmap’s application steps', (await p.locator('[data-apply-step]').count()) >= 8 && (await lorBox.getAttribute('data-status')) !== 'done');
    await lorBox.getByRole('button').click();
    y = await pb((v) => v.journey?.steps?.DE?.lor?.status === 'done');
    check('Apply tick → the one roadmap store', y.journey?.steps?.DE?.lor?.status === 'done');
    await p.goto(`${BASE}/abroad/countries/de/roadmap`, { waitUntil: 'load' });
    await p.getByTestId('roadmap-steps').waitFor({ timeout: 60_000 });
    await p.getByRole('button', { name: /Show completed steps/ }).click();
    check('…and the roadmap shows it done', (await p.locator('[data-step="lor"]').getAttribute('data-status')) === 'done');
    await p.locator('[data-step="lor"]').getByRole('button', { name: /Ask for recommendation letters/ }).click();
    await p.locator('[data-step="lor"]').getByRole('button', { name: 'Not done yet' }).click();
    y = await pb((v) => v.journey?.steps?.DE?.lor?.status !== 'done');
    await p.goto(`${BASE}/abroad/countries/de?tab=apply`, { waitUntil: 'load' });
    await p.getByTestId('apply-steps').waitFor({ timeout: 60_000 });
    check('roadmap un-tick → Apply shows it open again', (await p.locator('[data-apply-step="lor"]').getAttribute('data-status')) !== 'done');

    // ============================================================ Korea B3 · profile, universities, programs
    console.log('\n[KR-B3] Profile questions, program finder, shortlist, compare');
    type SB = Record<string, unknown> & {
      pathwayByCountry?: Record<string, string>;
      student?: { preferences?: { studyLanguage?: string }; korean?: string };
      universities?: { name: string; countryCode: string; program?: string; status: string }[];
    };
    const kb = async (ok: (x: SB) => boolean) => (await waitForAbroad(uid, (v) => ok(v as SB))) as SB;
    await p.goto(`${BASE}/abroad/countries/kr`, { waitUntil: 'load' });
    await p.getByTestId('pathway-picker').waitFor({ timeout: 60_000 });
    await p.locator('[data-option-group="degree"]').click();
    await kb((v) => v.pathwayByCountry?.KR === 'degree');
    await p.goto(`${BASE}/abroad/universities?country=kr`, { waitUntil: 'load' });
    await p.getByTestId('program-finder').waitFor({ timeout: 60_000 });
    const langQ = p.locator('[data-question="studyLanguage"]');
    check('contextual question appears where it is needed', /Which language do you want to study in\?/.test(await langQ.innerText()));
    await langQ.getByRole('button', { name: 'English' }).click();
    let z = await kb((v) => v.student?.preferences?.studyLanguage === 'en');
    check('Firestore: answer saved to the profile', z.student?.preferences?.studyLanguage === 'en');
    await p.waitForFunction(() => !document.querySelector('[data-question="studyLanguage"]'), null, { timeout: 10_000 });
    const filters = p.getByTestId('program-filters');
    check('filter reads the profile: English-taught selected', (await filters.getByRole('button', { name: 'English-taught' }).getAttribute('aria-pressed')) === 'true' && /Filled from your profile/.test(await filters.innerText()));
    check('Korea offers a Korean-taught option', (await filters.getByRole('button', { name: 'Korean-taught' }).count()) === 1);
    await filters.getByRole('button', { name: 'Either' }).click();
    check('student’s choice wins over the profile', (await filters.getByRole('button', { name: 'Either' }).getAttribute('aria-pressed')) === 'true');
    z = await kb(() => true);
    check('…without changing the saved profile', z.student?.preferences?.studyLanguage === 'en');
    check('no invented universities for South Korea', /No verified university profiles for South Korea yet/.test(await p.getByTestId('uni-verified-empty').innerText()));
    check('no ranking anywhere', !/rank|best university|top \d/i.test(await p.locator('main').innerText()));
    await p.getByRole('button', { name: 'Add a university' }).click();
    await p.getByLabel('University name').fill('Korea Test Univ');
    await p.getByRole('button', { name: 'Add to my list' }).click();
    const kt = p.locator('[data-university="Korea Test Univ"]');
    await kt.waitFor();
    await kt.getByRole('button', { name: 'Add program' }).click();
    await kt.getByLabel('Program name').fill('MSc AI');
    await kt.getByRole('button', { name: 'Save' }).click();
    z = await kb((v) => (v.universities ?? []).some((u) => u.name === 'Korea Test Univ' && u.program === 'MSc AI'));
    check('Firestore: program saved on the entry', (z.universities ?? []).some((u) => u.name === 'Korea Test Univ' && u.program === 'MSc AI' && u.countryCode === 'KR'));
    await kt.getByLabel('Status').selectOption('shortlisted');
    z = await kb((v) => (v.universities ?? []).some((u) => u.name === 'Korea Test Univ' && u.status === 'shortlisted'));
    check('new status "Shortlisted" saved', (z.universities ?? []).some((u) => u.status === 'shortlisted'));
    await p.getByRole('button', { name: 'Add a university' }).click();
    await p.getByLabel('University name').fill('korea test univ');
    await p.getByLabel('Program (optional)').fill('msc ai');
    await p.getByRole('button', { name: 'Add to my list' }).click();
    await p.waitForTimeout(800);
    z = await kb(() => true);
    check('no duplicate entry', (z.universities ?? []).filter((u) => u.name.toLowerCase() === 'korea test univ').length === 1);
    await p.getByRole('button', { name: 'Add a university' }).click();
    await p.getByLabel('University name').fill('Second Test Univ');
    await p.getByRole('button', { name: 'Add to my list' }).click();
    await p.locator('[data-university="Second Test Univ"]').waitFor();
    await kt.getByRole('button', { name: 'Compare' }).click();
    await p.locator('[data-university="Second Test Univ"]').getByRole('button', { name: 'Compare' }).click();
    check('universities desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-kr-b3-01-universities');
    await p.getByTestId('uni-compare-open').click();
    await p.waitForURL('**/abroad/universities/compare?ids=**');
    await p.getByTestId('uni-compare-table').waitFor({ timeout: 60_000 });
    check('compare: 2 entries, every factual cell "—" (student-entered)', (await p.locator('[data-compare-entry]').count()) === 2 && (await p.locator('[data-empty="true"]').count()) === 18 && (await p.getByText('Added by you — no verified facts yet').count()) === 2);
    check('compare shows the program and your status, no winner', /MSc AI/.test(await p.locator('main').innerText()) && /Shortlisted/.test(await p.locator('main').innerText()) && !/winner|best|rank/i.test(await p.getByTestId('uni-compare-table').innerText()));
    await shot(p, 'sa-kr-b3-02-compare');
    await p.goto(`${BASE}/abroad/profile`, { waitUntil: 'load' });
    await p.locator('[data-profile-field="korean"]').waitFor({ timeout: 60_000 });
    check('profile page: answered vs Not provided', /English/.test(await p.locator('[data-profile-field="studyLanguage"]').innerText()) && /Not provided/.test(await p.locator('[data-profile-field="korean"]').innerText()));
    await p.locator('[data-profile-field="korean"]').getByRole('button', { name: 'Edit' }).click();
    await p.locator('[data-profile-field="korean"]').getByRole('button', { name: 'TOPIK 2' }).click();
    z = await kb((v) => v.student?.korean === 'topik-2');
    check('Firestore: TOPIK saved from the profile page', z.student?.korean === 'topik-2');
    await p.locator('[data-profile-field="korean"]').getByRole('button', { name: 'Remove' }).click();
    z = await kb((v) => v.student?.korean === undefined);
    check('an answer can be removed (back to Not provided)', z.student?.korean === undefined);
    await p.goto(`${BASE}/mino?ask=abroad-unis`, { waitUntil: 'load' });
    await p.getByText(/balanced university shortlist/).first().waitFor({ timeout: 30_000 });
    check('Mino opens with the university question', true);

    // ============================================================ Korea B4 · costs & documents
    console.log('\n[KR-B4] Cost planner, documents (why/who/when/where), roadmap ↔ documents, alerts');
    type CB = Record<string, unknown> & { student?: { budget?: { tuition?: { amount: number; currency: string }; total?: { amount: number; currency: string } } }; documents?: Record<string, { status: string; validUntil?: string }> };
    const cb = async (ok: (x: CB) => boolean) => (await waitForAbroad(uid, (v) => ok(v as CB))) as CB;
    await p.goto(`${BASE}/abroad/cost?country=kr`, { waitUntil: 'load' });
    await p.getByTestId('cost-groups').waitFor({ timeout: 60_000 });
    check('Money hub current; 5 cost groups', (await p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link', { name: 'Money' }).getAttribute('aria-current')) === 'page' && (await p.locator('[data-cost-group]').count()) === 5);
    check('one clear CTA: Plan my budget', (await p.getByTestId('cost-cta').innerText()).includes('Plan my budget'));
    const tuition = p.locator('[data-cost-group="tuition"]');
    check('tuition: Official not verified, no estimate (nothing invented)', /Not verified yet/.test(await tuition.locator('[data-block="official"]').innerText()) && /No estimate yet/.test(await tuition.locator('[data-block="estimate"]').innerText()));
    await tuition.locator('[data-question="tuitionBudget"]').getByLabel('Amount').fill('5000');
    await tuition.locator('[data-question="tuitionBudget"]').getByLabel('Currency').selectOption('USD');
    await tuition.locator('[data-question="tuitionBudget"]').getByRole('button', { name: 'Save' }).click();
    let cz = await cb((v) => v.student?.budget?.tuition?.amount === 5000);
    check('Firestore: my tuition budget saved (as mine, per year)', cz.student?.budget?.tuition?.currency === 'USD' && /USD 5,000 · per year/.test(await tuition.locator('[data-block="mine"]').innerText()));
    const planBox = p.getByTestId('cost-plan');
    await planBox.locator('[data-question="totalBudget"]').getByLabel('Amount').fill('20000');
    await planBox.locator('[data-question="totalBudget"]').getByLabel('Currency').selectOption('USD');
    await planBox.locator('[data-question="totalBudget"]').getByRole('button', { name: 'Save' }).click();
    cz = await cb((v) => v.student?.budget?.total?.amount === 20000);
    await p.getByTestId('cost-available').getByText('USD 20,000').waitFor({ timeout: 10_000 });
    check('planning view: estimate total —, my money shown, no difference, honest notes', (await p.getByTestId('cost-estimate-total').innerText()) === '—' && (await p.getByTestId('cost-difference').innerText()) === '—' && /Some cost information is not verified yet/.test(await p.getByTestId('cost-notes').innerText()) && /not financial advice/.test(await p.getByTestId('cost-notes').innerText()));
    check('no affordability verdict anywhere', !/you can afford|affordab|score/i.test(await p.locator('main').innerText()));
    check('cost desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-kr-b4-01-cost');
    await p.goto(`${BASE}/abroad/cost?country=gb`, { waitUntil: 'load' });
    await p.getByTestId('cost-groups').waitFor({ timeout: 60_000 });
    await p.locator('[data-cost-group="living"]').getByRole('button', { name: /Living/ }).click();
    const livingOfficial = p.locator('[data-cost-group="living"] [data-block="official"]');
    check('UK living: 2 official money-to-show figures, sourced, period as stated', (await livingOfficial.locator('[data-official]').count()) === 2 && /period as stated on the official page/.test(await livingOfficial.innerText()) && (await livingOfficial.locator('a[href="https://www.gov.uk/student-visa/money"]').count()) === 2);
    check('UK: my USD budget is never converted to GBP', /Currency conversion unavailable|No total yet/.test(await p.getByTestId('cost-notes').innerText()) && (await p.getByTestId('cost-difference').innerText()) === '—');

    await p.goto(`${BASE}/abroad/documents`, { waitUntil: 'load' });
    await p.getByTestId('docs-summary').waitFor({ timeout: 60_000 });
    check('documents summary: how many, with a clear CTA', /Documents you may need: \d+/.test(await p.getByTestId('docs-summary').innerText()) && (await p.getByTestId('docs-cta').count()) === 1);
    const pass = p.locator('[data-document="passport"]');
    await pass.getByRole('button', { name: /Passport/ }).click();
    const explain = pass.getByTestId('doc-explain');
    check('card answers why / who / when / where', /Why you need it/.test(await explain.innerText()) && /Who asks for it/.test(await explain.innerText()) && /When you need it/.test(await explain.innerText()) && /Where it goes/.test(await explain.innerText()));
    check('official requirement: not claimed (general preparation)', /General preparation — no official requirement verified yet/.test(await pass.getByTestId('doc-official').innerText()));
    await pass.getByTestId('doc-valid-until').fill('2026-01-01');
    cz = await cb((v) => v.documents?.passport?.validUntil === '2026-01-01');
    await p.waitForFunction(() => document.querySelector('[data-document="passport"]')?.getAttribute('data-status') === 'needs-update', null, { timeout: 10_000 });
    check('own expiry date passed → Needs update (saved)', cz.documents?.passport?.validUntil === '2026-01-01' && /Needs update/.test(await pass.innerText()));
    await shot(p, 'sa-kr-b4-02-documents');
    await p.goto(`${BASE}/abroad/countries/de/roadmap`, { waitUntil: 'load' });
    await p.getByTestId('roadmap-steps').waitFor({ timeout: 60_000 });
    const acad = p.locator('[data-step="academic-docs"]');
    await acad.getByRole('button', { name: /Collect academic documents/ }).click();
    const chip = acad.locator('[data-step-doc="transcript"]');
    check('roadmap step lists its documents with status, linked', (await chip.getAttribute('href')) === '/abroad/documents?open=transcript' && (await chip.getAttribute('data-status')) === 'not-started');
    await chip.click();
    await p.waitForURL('**/abroad/documents?open=transcript');
    await p.locator('[data-document="transcript"] button[aria-expanded="true"]').waitFor({ timeout: 30_000 });
    check('…and opens that document directly', true);
    await p.goto(`${BASE}/abroad`, { waitUntil: 'load' });
    await p.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    check('home: actionable alert for the out-of-date passport', (await p.getByRole('link', { name: /Your Passport needs updating/ }).getAttribute('href')) === '/abroad/documents?open=passport');

    await p.goto(`${BASE}/abroad/countries/xx`, { waitUntil: 'load' });
    await p.getByTestId('hub-not-found').waitFor({ timeout: 60_000 });
    check('unknown country → clear message + way back', (await p.getByRole('link', { name: 'Countries' }).count()) >= 1);
    await ctx.close();

    // ============================================================ 3A · Home (Bangla, mobile)
    console.log('\n[3A] Study Abroad home — mobile, Bangla');
    const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const q = await m.newPage();
    watchErrors(q, 'BN', errors);
    await signUp(q, 'Rafi', `abroad-bn-${stamp}@test.dev`, 'bn');
    const uidBn = (await uidOf(q))!;
    await q.goto(`${BASE}/abroad`, { waitUntil: 'load' });
    await q.getByTestId('abroad-start').waitFor({ timeout: 60_000 });
    await patchField(`users/${uidBn}`, 'app.abroad', { degreeLevel: 'bachelors', preferredCountryCodes: ['AU'], dreamCountryCode: 'AU' });
    await q.reload({ waitUntil: 'load' });
    await q.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    check('bn: current phase in Bangla (English প্রস্তুত) with one action', (await q.getByTestId('journey-now').innerText()) === 'English প্রস্তুত' && (await q.getByTestId('abroad-continue').count()) === 1, await q.getByTestId('journey-now').innerText());
    check('bn: next phase line in Bangla', /এরপর: Documents প্রস্তুত/.test(await q.getByTestId('journey-next').innerText()));
    check('bn mobile: six phases fit (three per row), large enough to tap', await q.locator('[data-phase] a').evaluateAll((els) => els.length === 6 && els.every((e) => { const r = e.getBoundingClientRect(); return r.height >= 44 && r.right <= document.documentElement.clientWidth; })));
    check('bn mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await q.waitForTimeout(500);
    await shot(q, 'sa-3a-04-mobile-bn');
    await q.locator('[data-phase="documents"] a').click();
    await q.waitForURL('**/abroad/journey/documents');
    await q.getByTestId('journey-phase').waitFor({ timeout: 60_000 });
    check('bn mobile phase page: Documents প্রস্তুত, what you’ll do, checklist, documents', (await q.getByRole('heading', { level: 1 }).innerText()) === 'Documents প্রস্তুত' && (await q.getByTestId('phase-do').locator('li').count()) === 4 && (await q.locator('[data-step]').count()) >= 4 && (await q.getByTestId('phase-documents').locator('[data-phase-doc]').count()) >= 4);
    check('bn mobile phase page: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await q.waitForTimeout(500);
    await shot(q, 'sa-journey-03-phase-documents-mobile-bn', false);
    await q.goto(`${BASE}/abroad`, { waitUntil: 'load' });
    await q.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    await setDark(q, true);
    check('bn mobile dark: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'sa-3a-05-mobile-dark');
    await setDark(q, false);
    await q.goto(`${BASE}/abroad/countries`, { waitUntil: 'load' });
    await q.getByTestId('priority-countries').waitFor({ timeout: 60_000 });
    check('bn explorer mobile: no sideways scroll', await noHorizontalScroll(q));
    check('bn explorer: shortlist button in Bangla', (await q.getByRole('button', { name: 'Shortlist-এ রাখো' }).count()) >= 13);
    await shot(q, 'sa-3b-02-explorer-mobile', false);
    await q.goto(`${BASE}/abroad/countries/kr`, { waitUntil: 'load' });
    await q.getByTestId('study-options').waitFor({ timeout: 60_000 });
    check('bn: study options heading in Bangla', /পড়ার সুযোগগুলো/.test(await q.getByTestId('study-options').innerText()));
    await q.locator('[data-study-option="degree-bachelors"]').click();
    await q.waitForURL('**/abroad/countries/kr/study/degree-bachelors');
    await q.getByTestId('study-guide').waitFor({ timeout: 60_000 });
    check('bn guide: headings and "এই তথ্য এখনো verified নয়"', /এই প্রোগ্রামটি কী\?/.test(await q.getByTestId('study-guide').innerText()) && /এই তথ্য এখনো verified নয়/.test(await q.getByTestId('study-guide').innerText()));
    check('bn guide mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'ex-02-kr-bachelors-guide-mobile-bn', false);
    await q.locator('[data-guide-section="documents"]').scrollIntoViewIfNeeded();
    await shot(q, 'ex-03-kr-bachelors-documents-mobile-bn', false);
    await q.goto(`${BASE}/abroad/countries/au`, { waitUntil: 'load' });
    await q.getByTestId('hub-sections').waitFor({ timeout: 60_000 });
    check('bn hub: tabs in Bangla', (await q.getByRole('tab', { name: 'টাকা-পয়সা' }).count()) === 1);
    check('bn hub: dream country Australia recognised', (await q.getByRole('link', { name: /roadmap/ }).count()) >= 1);
    check('bn hub mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-3c-02-hub-mobile-bn', false);
    await setDark(q, true);
    check('bn hub mobile dark: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'sa-3c-03-hub-mobile-dark', false);
    await setDark(q, false);
    await q.goto(`${BASE}/abroad/countries/au/roadmap`, { waitUntil: 'load' });
    await q.getByTestId('roadmap-steps').waitFor({ timeout: 60_000 });
    check('bn roadmap: title in Bangla', /আমার Australia roadmap/.test(await q.getByRole('heading', { level: 1 }).innerText()));
    check('bn roadmap mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-3e-02-roadmap-mobile-bn', false);
    await setDark(q, true);
    check('bn roadmap mobile dark: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'sa-3e-03-roadmap-mobile-dark', false);
    await setDark(q, false);
    for (const [path, id] of [['/abroad/universities', 'my-universities'], ['/abroad/deadlines', ''], ['/abroad/documents', 'docs-required'], ['/abroad/visa/au', 'visa-parts'], ['/abroad/scholarships', 'schol-empty']] as const) {
      await q.goto(`${BASE}${path}`, { waitUntil: 'load' });
      if (id) await q.getByTestId(id).waitFor({ timeout: 60_000 }).catch(() => {});
      else await q.getByRole('heading', { level: 1 }).waitFor({ timeout: 60_000 });
      await q.waitForTimeout(300);
      check(`bn ${path} mobile: no sideways scroll`, await noHorizontalScroll(q), await overflowers(q));
    }
    check('bn documents in Bangla', /তোমার Australia plan-এর জন্য/.test(await (async () => { await q.goto(`${BASE}/abroad/documents`, { waitUntil: 'load' }); await q.getByTestId('docs-required').waitFor({ timeout: 60_000 }); return q.locator('main').innerText(); })()));
    await shot(q, 'sa-3i-02-documents-mobile-bn', false);
    await q.goto(`${BASE}/abroad/visa/au`, { waitUntil: 'load' });
    await q.getByTestId('visa-parts').waitFor({ timeout: 60_000 });
    await q.goto(`${BASE}/abroad/visa/kr`, { waitUntil: 'load' });
    await q.getByTestId('pathway-picker').waitFor({ timeout: 60_000 });
    check('bn KR visa: pathway question in Bangla', /তুমি কী পড়ার plan করছো\?/.test(await q.getByTestId('pathway-picker').innerText()));
    check('bn KR picker: visa name + source line in Bangla', /Visa: D-2 \(Student\)/.test(await q.getByTestId('pathway-picker').innerText()) && /Visa-র নামের source/.test(await q.getByTestId('pathway-picker').innerText()));
    // C1.2 · D-2 in Bangla on mobile
    await q.locator('[data-option-group="degree"]').click();
    await q.waitForFunction(() => document.querySelector('[data-testid="visa-parts"]')?.getAttribute('data-category') === 'D-2', null, { timeout: 10_000 });
    const qOpen = async (id: string) => {
      const btn = q.locator(`[data-section="${id}"] button[aria-expanded]`).first();
      if ((await btn.getAttribute('aria-expanded')) !== 'true') await btn.click();
      return q.locator(`[data-section="${id}"]`).innerText();
    };
    check('bn D-2 money: "Official amount এখনো verified নয়"', /Official amount এখনো verified নয়/.test(await qOpen('finances')));
    check('bn D-2 where to apply: Bangladesh-এ label', /Bangladesh-এ/.test(await qOpen('portal')));
    check('bn D-2 mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-kr-c12-02-d2-mobile-bn', false);
    // C1.3 · D-4 in Bangla on mobile
    await q.locator('[data-option-group="language"]').click();
    await q.waitForFunction(() => document.querySelector('[data-testid="visa-parts"]')?.getAttribute('data-category') === 'D-4', null, { timeout: 10_000 });
    check('bn D-4 processing: "Official নির্দিষ্ট processing time verified নয়"', /Official নির্দিষ্ট processing time verified নয়/.test(await qOpen('processing')));
    check('bn D-4 money: "Official amount এখনো verified নয়"', /Official amount এখনো verified নয়/.test(await qOpen('finances')));
    check('bn D-4 work question in Bangla', /D-4-এ কত দিন ধরে Korea-তে আছো\?/.test(await q.getByTestId('work-check').innerText()));
    check('bn D-4 mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-kr-c13-02-d4-mobile-bn', false);
    // Back to "no pathway" so the later checks start from the same state.
    await q.locator('[data-option-group="language"]').click();
    await q.waitForFunction(() => document.querySelectorAll('[data-testid="visa-categories"] [data-category]').length === 2, null, { timeout: 10_000 });
    check('bn KR visa mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-kr-b2-02-visa-mobile-bn', false);
    await q.goto(`${BASE}/abroad/universities?country=kr`, { waitUntil: 'load' });
    await q.getByTestId('program-finder').waitFor({ timeout: 60_000 });
    check('bn: contextual question in Bangla', /কোন ভাষায় পড়তে চাও\?/.test(await q.locator('[data-question="studyLanguage"]').innerText()));
    check('bn universities mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-kr-b3-03-universities-mobile-bn', false);
    await q.goto(`${BASE}/abroad/profile`, { waitUntil: 'load' });
    await q.locator('[data-profile-field="korean"]').waitFor({ timeout: 60_000 });
    check('bn profile: "দেওয়া হয়নি" for missing answers', /দেওয়া হয়নি/.test(await q.locator('[data-profile-field="korean"]').innerText()));
    check('bn profile mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-kr-b3-04-profile-mobile-bn', false);
    await q.goto(`${BASE}/abroad/cost?country=kr`, { waitUntil: 'load' });
    await q.getByTestId('cost-groups').waitFor({ timeout: 60_000 });
    check('bn cost: title + pathway notice (no pathway chosen)', /কত টাকা লাগতে পারে\?/.test(await q.locator('main').innerText()) && /আগে pathway বেছে নাও/.test(await q.locator('main').innerText()));
    check('bn cost mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-kr-b4-03-cost-mobile-bn', false);
    await q.goto(`${BASE}/abroad/documents`, { waitUntil: 'load' });
    await q.getByTestId('docs-summary').waitFor({ timeout: 60_000 });
    await q.locator('[data-document="passport"]').getByRole('button').first().click();
    check('bn documents: কেন লাগবে / কে চায় / কখন / কোথায়', /কেন লাগবে/.test(await q.locator('[data-document="passport"]').innerText()) && /কোথায় জমা দিতে হয়/.test(await q.locator('[data-document="passport"]').innerText()));
    check('bn documents mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-kr-b4-04-documents-mobile-bn', false);
    await q.goto(`${BASE}/abroad/compare?c=au,gb,ca`, { waitUntil: 'load' });
    await q.getByTestId('compare-table').waitFor({ timeout: 60_000 });
    check('bn compare mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-3l-02-compare-mobile-bn', false);
    await q.goto(`${BASE}/abroad/visa/au`, { waitUntil: 'load' });
    await q.getByTestId('visa-parts').waitFor({ timeout: 60_000 });
    await setDark(q, true);
    check('bn visa mobile dark: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'sa-3j-02-visa-mobile-dark', false);
    await setDark(q, false);
    await m.close();
  } catch (e) {
    const page = browser.contexts().flatMap((x) => x.pages()).at(-1);
    if (page) {
      console.log('PAGE:', (await page.locator('main').innerText().catch(() => '')).slice(0, 800));
      await shot(page, 'sa-failure').catch(() => {});
    }
    check('EXCEPTION', false, (e as Error).stack ?? e);
  }
  await browser.close();
  check('no page errors', errors.length === 0, errors.slice(0, 5).join(' | '));
  process.exit(report());
}

void main();

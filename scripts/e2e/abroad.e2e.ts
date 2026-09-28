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
    await p.getByTestId('priority-countries').waitFor({ timeout: 60_000 });
    check('landing: country cards first, no journey or roadmap on the front page', (await p.getByTestId('abroad-journey').count()) === 0 && (await p.getByTestId('abroad-start').count()) === 0 && (await p.locator('[data-phase]').count()) === 0 && (await p.locator('main').getByRole('link', { name: /Mino/ }).count()) === 0);
    check('landing: every card titled "Study in …"', (await p.getByTestId('study-in').count()) === 21 && (await p.locator('[data-country="KR"]').getByTestId('study-in').innerText()) === 'Study in South Korea' && (await p.locator('[data-country="IE"]').getByTestId('study-in').innerText()) === 'Study in Ireland');
    check('landing: no ranking score shown', !/\d+\s*%|#\d|score/i.test(await p.getByTestId('study-destinations').innerText()));
    check('landing desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-guide-00-landing');
    await p.goto(`${BASE}/abroad/journey`, { waitUntil: 'load' });
    await p.getByTestId('abroad-start').waitFor({ timeout: 60_000 });
    check('new student sees one clear start card', await p.getByRole('link', { name: /Set my goal/ }).isVisible());
    check('new student: no stage guessed (no phase shown before a goal)', (await p.locator('[data-phase]').count()) === 0);
    const hubs = p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link');
    check('hub bar: Home · Money · Apply · Visa & go', (await hubs.allInnerTexts()).join('|') === 'Home|Money|Apply|Visa & go', (await hubs.allInnerTexts()).join('|'));
    check('Home hub is marked current', (await hubs.first().getAttribute('aria-current')) === 'page');
    await shot(p, 'sa-3a-01-new-student');
    await p.getByRole('link', { name: /Set my goal/ }).click();
    await p.waitForURL('**/setup/abroad');
    check('start card opens the goal setup', p.url().endsWith('/setup/abroad'));

    // A student with a goal and a shortlist (set as saved data once the app is idle, then the UI takes over).
    await p.goto(`${BASE}/abroad/journey`, { waitUntil: 'load' });
    await p.getByTestId('abroad-start').waitFor({ timeout: 60_000 });
    await patchField(`users/${uid}`, 'app.abroad', { degreeLevel: 'masters', subject: 'Computer Science', targetIntake: { month: 10, year: 2027 }, preferredCountryCodes: ['DE', 'KR'] });
    await p.goto(`${BASE}/abroad/journey`, { waitUntil: 'load' });
    await p.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    const journeyText = await p.getByTestId('abroad-journey').innerText();
    check('journey: goal set, country not chosen → "Choose your country" first (setup, not a phase)', (await p.getByTestId('abroad-journey').getAttribute('data-current-phase')) === 'setup-country' && /Choose your country/.test(journeyText), journeyText.slice(0, 160));
    check('journey shows the goal line (degree · subject · intake)', /Master.*Computer Science.*2027/.test(await p.getByTestId('journey-goal').innerText()), await p.getByTestId('journey-goal').innerText());
    check('six phases: English · Documents · University · Apply · Visa · Departure', (await p.locator('[data-phase]').allInnerTexts()).map((x) => x.trim()).join('|') === 'English|Documents|University|Apply|Visa|Departure', (await p.locator('[data-phase]').allInnerTexts()).join('|'));
    // English follows IELTS (this student set a target in onboarding → in progress); nothing is completed or ready from missing data.
    check('nothing is marked done from missing data', (await p.locator('[data-phase][data-status="completed"], [data-phase][data-status="ready"]').count()) === 0 && (await p.locator('[data-phase="english"]').getAttribute('data-status')) === 'in-progress' && (await p.locator('[data-phase][data-status="not-started"]').count()) === 5);
    check('one primary action (choose a country → the destinations below)', (await p.getByTestId('abroad-continue').count()) === 1 && (await p.getByTestId('abroad-continue').getAttribute('href')) === '/abroad');
    await patchField(`users/${uid}`, 'app.abroad.dreamCountryCode', 'DE');
    await p.reload({ waitUntil: 'load' });
    await p.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    let a = await waitForAbroad(uid, (x) => x.dreamCountryCode === 'DE');
    check('Firestore: dream country saved', a.dreamCountryCode === 'DE', JSON.stringify(a).slice(0, 160));
    await p.waitForFunction(() => document.querySelector('[data-testid="abroad-journey"]')?.getAttribute('data-current-phase') === 'english', null, { timeout: 10_000 });
    check('now: English Ready (IELTS target not reached yet)', (await p.getByTestId('journey-now').innerText()) === 'English Ready');
    check('now: one primary action → IELTS preparation', (await p.getByTestId('abroad-continue').innerText()).includes('Open IELTS preparation') && (await p.getByTestId('abroad-continue').getAttribute('href')) === '/ielts');
    check('next: Documents Ready', /Next: Documents Ready/.test(await p.getByTestId('journey-next').innerText()));
    check('no long list of roadmap steps on Journey', (await p.locator('[data-step]').count()) === 0);
    check('journey goal line shows the dream country Germany', /Germany/.test(await p.getByTestId('journey-goal').innerText()));
    check('no Mino prompts on the journey card', (await p.locator('main').getByRole('link', { name: /Mino/ }).count()) === 0);
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
    await p.locator('main a[href="/abroad/journey"]').first().click();
    await p.waitForURL(/\/abroad\/journey$/);
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
    check('more destinations listed separately', (await p.getByTestId('other-countries').locator('[data-country]').count()) === 7);
    check('Home hub is marked current', (await p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link', { name: 'Home' }).getAttribute('aria-current')) === 'page');
    const broken = await p.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length);
    // Photos are lazy-loaded: bring each card into view once so they all load.
    for (const el of await p.locator('[data-country-photo]').all()) await el.scrollIntoViewIfNeeded();
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForFunction(() => [...document.querySelectorAll('[data-country-photo] img')].every((i) => (i as HTMLImageElement).complete), null, { timeout: 30_000 }).catch(() => undefined);
    const photos = await p.locator('[data-country]').evaluateAll((cards) =>
      cards.map((c) => ({ card: c.getAttribute('data-country'), photo: c.querySelector('[data-country-photo]')?.getAttribute('data-country-photo') ?? null, w: (c.querySelector('[data-country-photo] img') as HTMLImageElement | null)?.naturalWidth ?? 0 })),
    );
    const withPhoto = photos.filter((x) => x.photo);
    check('no broken images', broken === 0, `${broken} broken`);
    check('all 21 country cards show their photo, no placeholders', withPhoto.length === 21 && (await p.locator('[data-placeholder]').count()) === 0, withPhoto.map((x) => x.card).join(','));
    check('Ireland photo sits in the Ireland card', (await p.locator('[data-country="IE"] [data-country-photo="IE"] img').getAttribute('src'))?.startsWith('/images/countries/ie-') === true);
    check('all card photos share one frame ratio', new Set(await p.locator('[data-country-photo]').evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return (r.width / r.height).toFixed(2); }))).size === 1);
    check('every photo sits in its own country\'s card', withPhoto.every((x) => x.photo === x.card), JSON.stringify(withPhoto));
    check('photos actually load', withPhoto.every((x) => x.w > 0), JSON.stringify(withPhoto.filter((x) => !x.w)));
    const fit = await p.locator('[data-country-photo] img').first().evaluate((i) => getComputedStyle(i).objectFit);
    check('photos cover the frame without stretching', fit === 'cover', fit);
    await shot(p, 'abroad-country-photos');
    const kr = p.locator('[data-country="KR"]');
    check('South Korea card claims nothing unverified (no verified chip)', (await kr.getByTestId('card-verified').count()) === 0);
    check('Canada card shows its verified-facts count', (await p.locator('[data-country="CA"]').getByTestId('card-verified').innerText()) === '3 verified facts');
    check('Explore links to the country page', (await kr.getByRole('link', { name: 'Explore' }).getAttribute('href')) === '/abroad/countries/kr');
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

    // ============================================================ Country guide → degree guide (South Korea)
    console.log('\n[Guide] South Korea guide');
    await kr.getByRole('link', { name: 'Explore' }).click();
    await p.waitForURL('**/abroad/countries/kr');
    await p.getByTestId('country-guide').waitFor({ timeout: 60_000 });
    check('guide: "Study in South Korea" heading', /Study in South Korea/.test(await p.getByRole('heading', { level: 1 }).innerText()));
    check('guide: photo of South Korea on top', (await p.getByTestId('country-guide').locator('[data-country-photo="KR"]').count()) === 1);
    check('guide: overview answers on the page (no accordion)', (await p.getByTestId('guide-overview').locator('[data-guide-q]').count()) >= 8 && (await p.getByTestId('country-guide').locator('button[aria-expanded]').count()) === 0);
    check('guide: degree cards in order Bachelor’s, Master’s, PhD', (await p.getByTestId('guide-degrees').locator('[data-degree]').evaluateAll((els) => els.map((e) => e.getAttribute('data-degree')).join(','))) === 'bachelors,masters,phd');
    const faq = p.getByTestId('guide-faq');
    check('guide: most asked questions, bold headings with answers below', (await faq.locator('[data-faq]').count()) >= 14 && (await faq.locator('h3').first().evaluate((h) => Number(getComputedStyle(h).fontWeight))) >= 700);
    check('guide: TOPIK and IELTS questions answered', /Do you need TOPIK\?/.test(await faq.innerText()) && /What IELTS score might you need\?/.test(await faq.innerText()));
    check('guide: no journey, roadmap, next step or Mino on the country page', (await p.locator('main').getByRole('link', { name: /Mino/ }).count()) === 0 && !/My roadmap|Build my plan|Next step|Your Study Abroad journey/.test(await p.locator('main').innerText()));
    check('guide: never "fully funded", never ranked', !/fully funded|ranking|top university|best university/i.test(await p.locator('main').innerText()));
    check('guide: sources at the end, each a link', (await p.getByTestId('guide-sources').locator('a[href^="https://"]').count()) >= 6 && /Sources & Official References/.test(await p.getByTestId('guide-sources').innerText()));
    check('guide: planning tools kept behind one quiet link', (await p.getByTestId('guide-more').getAttribute('href')) === '/abroad/countries/kr/hub');
    check('guide desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-guide-01-country');
    const photoSrc = await p.locator('[data-country-photo="KR"] img').first().getAttribute('src');
    await p.reload({ waitUntil: 'load' });
    await p.getByTestId('country-guide').waitFor({ timeout: 60_000 });
    check('guide: photo stays the same after reload', (await p.locator('[data-country-photo="KR"] img').first().getAttribute('src')) === photoSrc);

    await p.getByTestId('guide-degrees').locator('[data-degree="bachelors"]').click();
    await p.waitForURL('**/abroad/countries/kr/degree/bachelors');
    await p.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    const ba = p.getByTestId('degree-guide');
    check("bachelor's: heading", /Bachelor's in South Korea/.test(await p.getByRole('heading', { level: 1 }).innerText()));
    check("bachelor's: sections in reading order", (await ba.locator('[data-guide-section]').evaluateAll((els) => els.map((e) => e.getAttribute('data-guide-section')).join(','))) === 'eligibility,language,costs,documents,apply,scholarships,universities,work,visa,after');
    check("bachelor's: only bachelor's rules (D-2-2, no D-2-3 / D-2-4 / thesis)", /D-2-2/.test(await ba.innerText()) && !/D-2-3|D-2-4|thesis|dissertation/.test(await ba.innerText()));
    const costs = ba.getByTestId('guide-costs');
    check("bachelor's: costs split into Official / Estimate / Your own budget", (await costs.locator('[data-cost-group]').evaluateAll((els) => els.map((e) => e.getAttribute('data-cost-group')).join(','))) === 'official,estimate,mine');
    check("bachelor's: official fee from the program's own page, estimate from the guidebook", /8,202,000/.test(await costs.locator('[data-cost-group="official"]').innerText()) && /5,000,000–7,000,000/.test(await costs.locator('[data-cost-group="estimate"]').innerText()));
    check("bachelor's: no affordability verdict, nothing converted", !/you can afford|affordable|not enough|≈/i.test(await costs.innerText()) && /nothing is converted/.test(await costs.innerText()));
    const uniNames = await ba.getByTestId('guide-universities').locator('[data-university] p.font-semibold').allInnerTexts();
    check("bachelor's: universities listed alphabetically, never ranked", uniNames.length === 10 && uniNames.join('|') === [...uniNames].sort((x, y) => x.localeCompare(y)).join('|'), uniNames.join('|'));
    check("bachelor's: verified programs linked under their university", (await ba.locator('[data-university="kr-yonsei"] [data-program="kr-yonsei-uic"]').count()) === 1 && (await ba.locator('[data-university="kr-woosong"] [data-program="kr-woosong-solbridge-bba"]').count()) === 1);
    check("bachelor's: GKS undergraduate only", (await ba.locator('[data-scholarship]').evaluateAll((els) => els.map((e) => e.getAttribute('data-scholarship')).join(','))) === 'kr-gks-u-2027');
    check("bachelor's: unverified points say so", (await ba.locator('[data-guide-status="not-verified"]').count()) >= 1);
    check("bachelor's: sources at the end", (await ba.getByTestId('guide-sources').locator('a').count()) >= 10);
    check("bachelor's desktop: no sideways scroll", await noHorizontalScroll(p));
    await shot(p, 'sa-guide-02-bachelors');
    await ba.getByRole('link', { name: "Master's in South Korea" }).click();
    await p.waitForURL('**/abroad/countries/kr/degree/masters');
    await p.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    check("master's: D-2-3 only, GKS graduate, no bachelor's fee", /D-2-3/.test(await p.getByTestId('degree-guide').innerText()) && !/D-2-2|D-2-4|8,202,000|12 years of school/.test(await p.getByTestId('degree-guide').innerText()) && (await p.locator('[data-scholarship]').evaluateAll((els) => els.map((e) => e.getAttribute('data-scholarship')).join(','))) === 'kr-gks-g');
    check("master's: no verified master's program claimed", (await p.getByTestId('guide-universities').locator('[data-program]').count()) === 0);
    await p.goto(`${BASE}/abroad/countries/kr/degree/phd`, { waitUntil: 'load' });
    await p.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    const phdText = await p.getByTestId('degree-guide').innerText();
    check('PhD: research proposal and supervisor questions, marked not verified', /Do you need a research proposal\?/.test(phdText) && /Do you need a supervisor before applying\?/.test(phdText) && (await p.locator('[data-guide-q="proposal"] [data-guide-status="not-verified"]').count()) === 1);
    check('PhD: D-2-4 only, stay limit needs re-check', /D-2-4/.test(phdText) && !/D-2-2|D-2-3/.test(phdText) && (await p.locator('[data-guide-q="visa"] [data-guide-status="needs-review"]').count()) === 1);
    await shot(p, 'sa-guide-03-phd');
    await p.goto(`${BASE}/abroad/countries/kr/degree/diploma`, { waitUntil: 'load' });
    await p.getByTestId('degree-not-found').waitFor({ timeout: 60_000 });
    check('unknown degree → clear message + way back', (await p.getByRole('link', { name: 'Study in South Korea' }).count()) === 1);

    // ============================================================ Germany guide (its own research)
    console.log('\n[Guide] Germany');
    await p.goto(`${BASE}/abroad/countries/de`, { waitUntil: 'load' });
    await p.getByTestId('country-guide').waitFor({ timeout: 60_000 });
    const deGuide = p.getByTestId('country-guide');
    check('DE guide: "Study in Germany" heading and photo', /Study in Germany/.test(await p.getByRole('heading', { level: 1 }).innerText()) && (await deGuide.locator('[data-country-photo="DE"]').count()) === 1);
    check('DE guide: degree cards Bachelor’s, Master’s, PhD', (await p.getByTestId('guide-degrees').locator('[data-degree]').evaluateAll((els) => els.map((e) => e.getAttribute('data-degree')).join(','))) === 'bachelors,masters,phd');
    const deFaq = p.getByTestId('guide-faq');
    check('DE guide: most asked questions incl. APS and blocked account', (await deFaq.locator('[data-faq]').count()) >= 20 && /Is APS required\?/.test(await deFaq.innerText()) && /11,904/.test(await deFaq.innerText()));
    check('DE guide: nothing from South Korea', !/Korea|TOPIK|D-2|GKS|₩|KRW/.test(await deGuide.innerText()));
    check('DE guide: living in Germany section', /Living in Germany/.test(await p.getByTestId('guide-life').innerText()));
    check('DE guide: small sources at the end of each major section', (await deGuide.locator('[data-section-sources]').count()) >= 3 && (await p.getByTestId('guide-sources').locator('a[href*="diplo.de"]').count()) >= 1);
    check('DE guide: estimates and unknowns are labelled', (await deFaq.locator('[data-guide-kind="estimate"]').count()) >= 1 && (await deFaq.locator('[data-guide-status="not-verified"]').count()) >= 1);
    check('DE guide: no Mino, no journey on the page', (await p.locator('main').getByRole('link', { name: /Mino/ }).count()) === 0 && !/My roadmap|Build my plan/.test(await p.locator('main').innerText()));
    check('DE guide desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-guide-de-01-country');
    await p.getByTestId('guide-degrees').locator('[data-degree="bachelors"]').click();
    await p.waitForURL('**/abroad/countries/de/degree/bachelors');
    await p.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    const deBa = p.getByTestId('degree-guide');
    const deBaText = await deBa.innerText();
    check("DE bachelor's: HSC route (Studienkolleg / one year) explained", /Studienkolleg/.test(deBaText) && /one completed academic year/i.test(deBaText));
    check("DE bachelor's: documents grouped A–E, each document explained once", (await deBa.locator('[data-doc-group]').count()) === 5 && (await deBa.locator('[data-document="passport"]').count()) === 1 && (await deBa.locator('[data-document="supervisor-letter"]').count()) === 0);
    check("DE bachelor's: costs split Official / Estimate / Your own budget", (await deBa.getByTestId('guide-costs').locator('[data-cost-group]').evaluateAll((els) => els.map((e) => e.getAttribute('data-cost-group')).join(','))) === 'official,estimate,mine' && /EUR 11,904/.test(await deBa.getByTestId('guide-costs').locator('[data-cost-group="official"]').innerText()));
    check("DE bachelor's: sources that disagree are shown, not chosen", (await deBa.locator('[data-discrepancy]').count()) >= 3);
    check("DE bachelor's: verified universities, alphabetical", (await deBa.getByTestId('guide-universities').locator('[data-university]').evaluateAll((els) => els.map((e) => e.getAttribute('data-university')).join(','))) === 'de-rwth,de-stuttgart');
    check("DE bachelor's: Deutschlandstipendium only (DAAD funds master’s and up)", (await deBa.locator('[data-scholarship]').evaluateAll((els) => els.map((e) => e.getAttribute('data-scholarship')).join(','))) === 'de-deutschlandstipendium');
    check("DE bachelor's: only bachelor's rules", !/supervisor|VPD|EPOS/.test(deBaText));
    check("DE bachelor's desktop: no sideways scroll", await noHorizontalScroll(p));
    await shot(p, 'sa-guide-de-02-bachelors');
    await p.goto(`${BASE}/abroad/countries/de/degree/masters`, { waitUntil: 'load' });
    await p.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    const deMaText = await p.getByTestId('degree-guide').innerText();
    check("DE master's: VFS intake, EPOS and Deutschlandstipendium, no Studienkolleg exam", /VFS/.test(deMaText) && (await p.locator('[data-scholarship]').evaluateAll((els) => els.map((e) => e.getAttribute('data-scholarship')).sort().join(','))) === 'de-daad-epos,de-deutschlandstipendium' && !/Feststellungsprüfung/.test(deMaText));
    await p.goto(`${BASE}/abroad/countries/de/degree/phd`, { waitUntil: 'load' });
    await p.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    check('DE PhD: supervisor letter in the documents, no bachelor/master tuition', (await p.locator('[data-document="supervisor-letter"]').count()) === 1 && !/1,684|Baden-Württemberg \(non-EU/.test(await p.getByTestId('guide-costs').innerText()));
    await shot(p, 'sa-guide-de-03-phd');

    // ============================================================ Japan guide (its own research)
    console.log('\n[Guide] Japan');
    await p.goto(`${BASE}/abroad/countries/jp`, { waitUntil: 'load' });
    await p.getByTestId('country-guide').waitFor({ timeout: 60_000 });
    const jpGuide = p.getByTestId('country-guide');
    check('JP guide: "Study in Japan" heading and photo', /Study in Japan/.test(await p.getByRole('heading', { level: 1 }).innerText()) && (await jpGuide.locator('[data-country-photo="JP"]').count()) === 1);
    check('JP guide: degree cards Bachelor’s, Master’s, PhD', (await p.getByTestId('guide-degrees').locator('[data-degree]').evaluateAll((els) => els.map((e) => e.getAttribute('data-degree')).join(','))) === 'bachelors,masters,phd');
    const jpFaq = p.getByTestId('guide-faq');
    check('JP guide: most asked questions incl. the Bachelor’s question and 28-hour rule', (await jpFaq.locator('[data-faq]').count()) >= 14 && /What do you need to study for a Bachelor's in Japan\?/.test(await jpFaq.innerText()) && /28 hours a week/.test(await jpFaq.innerText()));
    check('JP guide: nothing from South Korea or Germany', !/Korea|TOPIK|D-2|₩|Sperrkonto|Studienkolleg|DAAD/.test(await jpGuide.innerText()));
    check('JP guide: sources per section and official sources at the end', (await jpGuide.locator('[data-section-sources]').count()) >= 3 && (await p.getByTestId('guide-sources').locator('a[href*="emb-japan.go.jp"]').count()) >= 1);
    check('JP guide: no Mino, no journey on the page', (await p.locator('main').getByRole('link', { name: /Mino/ }).count()) === 0 && !/My roadmap|Build my plan/.test(await p.locator('main').innerText()));
    check('JP guide desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-guide-jp-01-country');
    await p.getByTestId('guide-degrees').locator('[data-degree="bachelors"]').click();
    await p.waitForURL('**/abroad/countries/jp/degree/bachelors');
    await p.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    const jpBa = p.getByTestId('degree-guide');
    const jpBaText = await jpBa.innerText();
    check("JP bachelor's: 12 years (HSC) and the EJU explained, no graduate rules", /12 years/.test(jpBaText) && /EJU/.test(jpBaText) && !/thesis advisor|16 years of formal/.test(jpBaText));
    check("JP bachelor's: COE step-by-step visa, Bangladesh time/fee marked not verified", /Certificate of Eligibility/.test(jpBaText) && (await jpBa.locator('[data-guide-q="visa-time"] [data-guide-status="not-verified"]').count()) === 1);
    check("JP bachelor's: costs Official / Estimate / Your own budget, in yen", (await jpBa.getByTestId('guide-costs').locator('[data-cost-group]').evaluateAll((els) => els.map((e) => e.getAttribute('data-cost-group')).join(','))) === 'official,estimate,mine' && /535,800/.test(await jpBa.getByTestId('guide-costs').locator('[data-cost-group="official"]').innerText()));
    check("JP bachelor's: differing JASSO figures shown, not chosen", (await jpBa.locator('[data-discrepancy]').count()) >= 1);
    check("JP bachelor's: documents grouped A–E, each once", (await jpBa.locator('[data-doc-group]').count()) === 5 && (await jpBa.locator('[data-document="coe"]').count()) === 1 && (await jpBa.locator('[data-document="research-proposal"]').count()) === 0);
    check("JP bachelor's: university examples alphabetical incl. Institute of Science Tokyo", (await jpBa.getByTestId('guide-universities').locator('[data-university]').evaluateAll((els) => els.map((e) => e.getAttribute('data-university')).join(','))) === 'jp-science-tokyo,jp-kyoto,jp-osaka,jp-utokyo,jp-tohoku');
    check("JP bachelor's: MEXT undergraduate + JASSO Honors", (await jpBa.locator('[data-scholarship]').evaluateAll((els) => els.map((e) => e.getAttribute('data-scholarship')).sort().join(','))) === 'jp-jasso-honors,jp-mext-undergraduate');
    check("JP bachelor's desktop: no sideways scroll", await noHorizontalScroll(p));
    await shot(p, 'sa-guide-jp-02-bachelors');
    await p.goto(`${BASE}/abroad/countries/jp/degree/masters`, { waitUntil: 'load' });
    await p.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    const jpMaText = await p.getByTestId('degree-guide').innerText();
    check("JP master's: 16 years, research proposal and advisor; MEXT research", /16 years/.test(jpMaText) && /research proposal/i.test(jpMaText) && (await p.locator('[data-document="research-proposal"]').count()) === 1 && (await p.locator('[data-scholarship="jp-mext-research"]').count()) === 1);
    await p.goto(`${BASE}/abroad/countries/jp/degree/phd`, { waitUntil: 'load' });
    await p.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    check('JP PhD: master’s requirement, no undergraduate EJU rules', /master's or professional degree/i.test(await p.getByTestId('degree-guide').innerText()) && !/EJU \(Examination/.test(await p.getByTestId('degree-guide').innerText()));
    await shot(p, 'sa-guide-jp-03-phd');
    // ============================================================ Italy guide (its own research)
    console.log('\n[Guide] Italy');
    await p.goto(`${BASE}/abroad/countries/it`, { waitUntil: 'load' });
    await p.getByTestId('country-guide').waitFor({ timeout: 60_000 });
    const itGuide = p.getByTestId('country-guide');
    check('IT guide: "Study in Italy" heading and photo', /Study in Italy/.test(await p.getByRole('heading', { level: 1 }).innerText()) && (await itGuide.locator('[data-country-photo="IT"]').count()) === 1);
    check('IT guide: degree cards Bachelor’s, Master’s, PhD', (await p.getByTestId('guide-degrees').locator('[data-degree]').evaluateAll((els) => els.map((e) => e.getAttribute('data-degree')).join(','))) === 'bachelors,masters,phd');
    const itFaq = p.getByTestId('guide-faq');
    const itFaqText = await itFaq.innerText();
    check('IT guide: most asked questions incl. HSC, TOLC, DSU and the 20-hour rule', (await itFaq.locator('[data-faq]').count()) >= 15 && /Can you apply for a Bachelor's with HSC\?/.test(itFaqText) && /TOLC/.test(itFaqText) && /DSU/.test(itFaqText) && /20 hours a week/.test(itFaqText));
    check('IT guide: nothing from South Korea, Germany or Japan', !/Korea|TOPIK|₩|Sperrkonto|Studienkolleg|DAAD|MEXT|JASSO|EJU/.test(await itGuide.innerText()));
    check('IT guide: sources per section and the Embassy of Italy in Dhaka at the end', (await itGuide.locator('[data-section-sources]').count()) >= 3 && (await p.getByTestId('guide-sources').locator('a[href*="ambdhaka.esteri.it"]').count()) >= 1);
    check('IT guide: no Mino, no journey on the page', (await p.locator('main').getByRole('link', { name: /Mino/ }).count()) === 0 && !/My roadmap|Build my plan/.test(await p.locator('main').innerText()));
    check('IT guide desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-guide-it-01-country');
    await p.getByTestId('guide-degrees').locator('[data-degree="bachelors"]').click();
    await p.waitForURL('**/abroad/countries/it/degree/bachelors');
    await p.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    const itBa = p.getByTestId('degree-guide');
    const itBaText = await itBa.innerText();
    check("IT bachelor's: 12 years (HSC), TOLC and Universitaly explained, no PhD rules", /at least 12 years/.test(itBaText) && /TOLC-I/.test(itBaText) && /Universitaly/.test(itBaText) && !/16,243|PhD call/.test(itBaText));
    check("IT bachelor's: step-by-step visa, 30 November deadline, time/fee not verified", /30 November 2026/.test(itBaText) && (await itBa.locator('[data-guide-q="visa-time"] [data-guide-status="not-verified"]').count()) === 1);
    check("IT bachelor's: costs Official / Estimate / Your own budget, in euro", (await itBa.getByTestId('guide-costs').locator('[data-cost-group]').evaluateAll((els) => els.map((e) => e.getAttribute('data-cost-group')).join(','))) === 'official,estimate,mine' && /10,179\.85/.test(await itBa.getByTestId('guide-costs').locator('[data-cost-group="official"]').innerText()));
    check("IT bachelor's: 6- vs 12-month bank statement difference shown", (await itBa.locator('[data-guide-q="funds"] [data-discrepancy]').count()) === 1);
    check("IT bachelor's: documents grouped A–E, each once, TOLC but no research proposal", (await itBa.locator('[data-doc-group]').count()) === 5 && (await itBa.locator('[data-document="cimea-dov"]').count()) === 1 && (await itBa.locator('[data-document="tolc"]').count()) === 1 && (await itBa.locator('[data-document="program-extras"]').count()) === 0);
    check("IT bachelor's: university examples alphabetical", (await itBa.getByTestId('guide-universities').locator('[data-university]').evaluateAll((els) => els.map((e) => e.getAttribute('data-university')).join(','))) === 'it-polimi,it-sapienza,it-unibo,it-unipd,it-unipi');
    check("IT bachelor's: regional DSU only (MAECI is not for bachelor's)", (await itBa.locator('[data-scholarship]').evaluateAll((els) => els.map((e) => e.getAttribute('data-scholarship')).sort().join(','))) === 'it-dsu-regional');
    check("IT bachelor's desktop: no sideways scroll", await noHorizontalScroll(p));
    await shot(p, 'sa-guide-it-02-bachelors');
    await p.goto(`${BASE}/abroad/countries/it/degree/masters`, { waitUntil: 'load' });
    await p.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    const itMaText = await p.getByTestId('degree-guide').innerText();
    check("IT master's: bachelor's needed, MAECI + DSU, no TOLC", /bachelor's degree/.test(itMaText) && /EUR 1,200 a month/.test(itMaText) && !/TOLC-I/.test(itMaText) && (await p.locator('[data-scholarship]').evaluateAll((els) => els.map((e) => e.getAttribute('data-scholarship')).sort().join(','))) === 'it-dsu-regional,it-maeci');
    await p.goto(`${BASE}/abroad/countries/it/degree/phd`, { waitUntil: 'load' });
    await p.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    const itPhText = await p.getByTestId('degree-guide').innerText();
    check('IT PhD: calls (bando), stipend example, no TOLC', /bando/.test(itPhText) && /16,243/.test(itPhText) && !/TOLC-I/.test(itPhText) && (await p.locator('[data-document="program-extras"]').count()) === 1);
    await shot(p, 'sa-guide-it-03-phd');
    await p.goto(`${BASE}/abroad/countries/ca`, { waitUntil: 'load' });
    await p.getByTestId('hub-sections').waitFor({ timeout: 60_000 });
    check('a country without a guide keeps its existing page (nothing borrowed from South Korea)', (await p.getByTestId('country-guide').count()) === 0);
    await p.goto(`${BASE}/abroad/countries/kr/hub`, { waitUntil: 'load' });
    console.log('\n[3C] Country hub');
    await p.getByTestId('hub-sections').waitFor({ timeout: 60_000 });
    check('hub: South Korea heading', (await p.getByRole('heading', { level: 1 }).innerText()) === 'South Korea');
    const tabs = p.getByRole('tablist').getByRole('tab');
    check('six tabs in order', (await tabs.allInnerTexts()).join('|') === 'Overview|Universities|Money|Apply|Visa & life|My roadmap', (await tabs.allInnerTexts()).join('|'));
    check('Overview selected by default', (await tabs.first().getAttribute('aria-selected')) === 'true');
    const krStatuses = await p.locator('[data-section]').evaluateAll((els) => els.map((e) => e.getAttribute('data-status')));
    check('South Korea overview: only Education has official facts (C2.1); the rest “Not verified yet”', krStatuses.length > 0 && krStatuses.filter((s) => s !== 'not-yet').length === 1 && (await p.locator('[data-section="education"]').getAttribute('data-status')) !== 'not-yet', krStatuses.join(','));
    await p.locator('[data-section="education"] h3 button').click();
    check('KR education: official guidebook linked once at the end of the section', (await p.locator('[data-section="education"] [data-section-sources] a[href*="studyinkorea.go.kr"]').count()) === 1);
    await p.locator('[data-section]').first().locator('h3 button').click(); // back to the section open by default
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
    check('guide: verified visa facts, content first; one small source link at the end of the section', (await p.locator('[data-guide-section="visa"] [data-fact]').count()) > 0 && (await p.locator('[data-guide-section="visa"] [data-section-sources]').count()) === 1 && !/verified \d/.test(await p.locator('[data-guide-section="visa"]').innerText()));
    check('guide: unverified part says so ("not verified yet")', (await p.locator('[data-guide-section="who"]').getAttribute('data-verified')) === 'false' && /This information is not verified yet/.test(await p.locator('[data-guide-section="who"]').innerText()));
    const docKinds = await p.locator('[data-guide-doc]').evaluateAll((els) => els.map((e) => e.getAttribute('data-guide-doc')));
    check('guide: documents for this option, each once (passport, admission letter…)', docKinds.length > 0 && new Set(docKinds).size === docKinds.length && docKinds.includes('passport') && docKinds.includes('admission-letter'), docKinds.join(','));
    check('guide: general-guidance documents kept apart from requirements', (await p.getByTestId('guide-documents-general').count()) === 1 && /Not an official requirement/.test(await p.getByTestId('guide-documents-general').innerText()));
    check('guide: money — official / estimate / your budget apart, no invented amount', /Official|Not verified yet/.test(await p.locator('[data-guide-section="costs"]').innerText()) && (await p.locator('[data-guide-section="finances"] [data-fact]').count()) > 0);
    check('guide: only D-2 content (no D-4 blocks leak into the degree guide)', (await p.locator('[data-guide-block*="kr-d4"]').count()) === 0 && (await p.locator('[data-guide-block*="kr-d2"]').count()) > 0);
    check('guide: "Sources" list at the end — short linked names with the date checked', (await p.getByTestId('guide-sources').locator('a[href^="http"]').count()) >= 3 && /checked/.test(await p.getByTestId('guide-sources').innerText()) && !/https?:\/\//.test(await p.getByTestId('guide-sources').innerText()));
    check('guide: Mino is one optional link, not the interface', (await guideEl.getByRole('link', { name: /Mino/ }).count()) === 1 && (await p.getByTestId('guide-ask-mino').getAttribute('href')) === '/mino?ask=abroad-option&country=kr&option=degree-bachelors');
    const c21 = async (id: string) => p.locator(`[data-guide-section="${id}"]`).innerText();
    check('C2.1 guide: study, admission, language and application now read as verified text', (await p.locator('[data-guide-section="study"][data-verified="true"], [data-guide-section="admission"][data-verified="true"], [data-guide-section="language"][data-verified="true"], [data-guide-section="application"][data-verified="true"]').count()) === 4);
    check("C2.1 guide (Bachelor's): 12-year schooling rule, TOPIK 3 vs English-taught, spring/fall intake", /12-year program/.test(await c21('admission')) && /TOPIK level 3 or above/.test(await c21('language')) && /TOPIK is not mandatory/.test(await c21('language')) && /Spring semester/.test(await c21('application')));
    check('guide desktop: no sideways scroll', await noHorizontalScroll(p), await overflowers(p));
    await shot(p, 'ex-01-kr-bachelors-guide');
    await p.goto(`${BASE}/abroad/countries/kr/study/degree-masters`, { waitUntil: 'load' });
    await guideEl.waitFor({ timeout: 60_000 });
    check('personal: Master’s guide shows the student’s goal (Master’s · Computer Science)', /Master's · Computer Science/.test(await p.getByTestId('guide-for-you').innerText()));
    check("C2.1 guide (Master's): bachelor's degree required, no school-years rule; thesis and graduate schools", /You hold a bachelor's degree/.test(await c21('admission')) && !/12-year/.test(await c21('admission')) && /24 credits/.test(await c21('study')));
    await p.goto(`${BASE}/abroad/countries/kr/study/language`, { waitUntil: 'load' });
    await guideEl.waitFor({ timeout: 60_000 });
    check('language option: D-4 guide, no D-2 blocks', /D-4 visa/.test(await guideEl.innerText()) && (await p.locator('[data-guide-block*="kr-d4"]').count()) > 0 && (await p.locator('[data-guide-block*="kr-d2"]').count()) === 0);
    check('C2.1 guide (language course): institute admission steps, no degree-only TOPIK/intake rules', /Submit documents → document evaluation/.test(await c21('admission')) && !/TOPIK level 3 or above|Spring semester/.test(await guideEl.innerText()));
    await p.goto(`${BASE}/abroad/countries/us`, { waitUntil: 'load' });
    await p.getByTestId('study-options').waitFor({ timeout: 60_000 });
    check('a country without pathways: one general option (same system, no special case)', (await p.locator('[data-study-option]').evaluateAll((els) => els.map((e) => e.getAttribute('data-study-option')))).join(',') === 'general');
    await p.locator('[data-study-option="general"]').click();
    await p.waitForURL('**/abroad/countries/us/study/general');
    await guideEl.waitFor({ timeout: 60_000 });
    check('US general guide: nothing invented — unverified parts say so, no Korean data', (await p.locator('[data-guide-section][data-verified="false"]').count()) >= 10 && !/D-2|D-4|Korea/.test(await guideEl.innerText()));
    await p.goto(`${BASE}/abroad/countries/kr/hub`, { waitUntil: 'load' });
    await p.getByTestId('hub-sections').waitFor({ timeout: 60_000 });

    await p.goto(`${BASE}/abroad/countries/de/hub?tab=money`, { waitUntil: 'load' });
    await p.getByTestId('hub-sections').waitFor({ timeout: 60_000 });
    check('?tab=money opens the Money tab', (await p.getByRole('tab', { name: 'Money' }).getAttribute('aria-selected')) === 'true');
    const work = p.locator('[data-section="work"]');
    check('Germany · Part-time work: Verified', (await work.getAttribute('data-status')) === 'verified');
    await work.getByRole('button', { name: /Part-time work/ }).click();
    const fact = work.locator('[data-fact]').first();
    await fact.waitFor({ timeout: 5_000 });
    check('verified fact reads clean (no citation under the fact)', (await fact.locator('a[href^="http"]').count()) === 0);
    check('section ends with a small official source link + when it was checked', (await work.locator('[data-section-sources] a[href^="http"]').count()) >= 1 && /checked/.test(await work.locator('[data-section-sources]').innerText()));
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
    await p.goto(`${BASE}/abroad/countries/de/hub?tab=roadmap`, { waitUntil: 'load' });
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
    await p.goto(`${BASE}/abroad/journey`, { waitUntil: 'load' });
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
    check('Home hub is current', (await p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link', { name: 'Home' }).getAttribute('aria-current')) === 'page');
    await p.getByTestId('uni-registry').waitFor({ timeout: 30_000 });
    check('Germany: only the verified universities, no invented programs', /RWTH Aachen University/.test(await p.getByTestId('uni-registry').innerText()) && /University of Stuttgart/.test(await p.getByTestId('uni-registry').innerText()) && (await p.getByTestId('uni-verified-empty').count()) === 1);
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
    // C2.4 · South Korea: the GKS records, in the source's words (never "Fully funded").
    await p.goto(`${BASE}/abroad/scholarships?country=kr`, { waitUntil: 'load' });
    await p.locator('[data-scholarship]').first().waitFor({ timeout: 60_000 });
    const gksIds = await p.locator('[data-scholarship]').evaluateAll((els) => els.map((e) => e.getAttribute('data-scholarship')));
    const gksTxt = (await p.locator('[data-scholarship]').allInnerTexts()).join(' ');
    // The list follows the student's degree: GKS-U for a bachelor's goal, GKS-G for master's / PhD.
    check('KR scholarships: a GKS record for the student’s degree, with coverage in the source’s words', gksIds.length === 1 && /^kr-gks-/.test(gksIds[0] ?? '') && /Airfare, Korean language training fees, tuition and monthly allowances/.test(gksTxt), gksIds.join(','));
    if (gksIds[0] === 'kr-gks-u-2027') check('GKS-U status comes from the Embassy dates', (await p.locator('[data-scholarship="kr-gks-u-2027"]').getAttribute('data-status')) === (Date.now() <= Date.parse('2026-09-30T23:59:59Z') ? 'open' : 'deadline-passed'));
    else check('GKS-G: no guessed deadline (status unknown until NIIED announces it)', (await p.locator('[data-scholarship="kr-gks-g"]').getAttribute('data-status')) === 'unknown' && !/Deadline/.test(gksTxt));
    check('KR scholarships: no "Fully funded" claim on any GKS record', !/Fully funded|Partly funded/.test(await p.locator('[data-scholarship]').allInnerTexts().then((x) => x.join(' '))));
    check('KR scholarships: official GKS facts shown at the top', /Global Korea Scholarship/.test(await p.getByTestId('schol-official').innerText()));
    await p.goto(`${BASE}/abroad/scholarships?country=gb`, { waitUntil: 'load' });
    await p.getByTestId('schol-empty').waitFor({ timeout: 60_000 });
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
    await p.goto(`${BASE}/abroad/journey`, { waitUntil: 'load' });
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
    await p.goto(`${BASE}/abroad/countries/kr/hub`, { waitUntil: 'load' });
    await p.getByTestId('pathway-picker').waitFor({ timeout: 60_000 });
    check('KR hub asks "What are you planning to study?" with 2 pathways', (await p.getByTestId('pathway-picker').locator('[data-pathway]').count()) === 2);
    await p.locator('[data-pathway="language"]').click();
    let y = await pb((v) => v.pathwayByCountry?.KR === 'language');
    check('Firestore: pathway saved per country', y.pathwayByCountry?.KR === 'language');
    const filled = (await p.locator('[data-section]:not([data-status="not-yet"])').evaluateAll((els) => els.map((e) => e.getAttribute('data-section')))).join(',');
    check('KR sections stay honest: only the sourced C2.1 sections are filled', filled === 'education', filled);
    check('Germany hub has no pathway picker', await (async () => { await p.goto(`${BASE}/abroad/countries/de/hub`, { waitUntil: 'load' }); await p.getByTestId('hub-sections').waitFor({ timeout: 60_000 }); return (await p.getByTestId('pathway-picker').count()) === 0; })());
    await p.goto(`${BASE}/abroad/visa/kr`, { waitUntil: 'load' });
    await p.getByTestId('visa-parts').waitFor({ timeout: 60_000 });
    check('language pathway → only D-4', (await p.getByTestId('visa-categories').locator('[data-category]').allInnerTexts()).join() === 'D-4' && (await p.getByTestId('visa-parts').getAttribute('data-category')) === 'D-4');
    // C1.3: D-4 filled from official sources; C2.2 adds insurance and the (older-source) funds amount.
    check('D-4: only interview / processing Not verified yet; type and funds need review', (await p.locator('[data-section][data-status="not-yet"]').count()) === 2 && (await p.locator('[data-section="interview"]').getAttribute('data-status')) === 'not-yet' && (await p.locator('[data-section="insurance"]').getAttribute('data-status')) !== 'not-yet' && (await p.locator('[data-section="type"]').getAttribute('data-status')) === 'needs-review' && (await p.locator('[data-section="finances"]').getAttribute('data-status')) === 'needs-review');
    const d4Type = await p.locator('[data-section="type"]').innerText();
    check('D-4 type: official name, D-4-1, source + date; no D-2 data', /D-4 \(General Trainee\)/.test(d4Type) && /D-4-1 Korean Language Training/.test(d4Type) && /Korea Immigration Service/.test((await p.locator('[data-section="type"] [data-section-sources]').getAttribute('data-sources')) ?? '') && /checked [^\n]*2026/.test(d4Type) && !/D-2-|D-2 \(Student\)/.test(d4Type), d4Type.slice(0, 200));
    check('picker card: which visa (official name) + source', /Visa: D-4 \(General Trainee\)/.test(await p.locator('[data-pathway="language"]').innerText()) && /Visa: D-2 \(Student\)/.test(await p.locator('[data-pathway="degree"]').innerText()) && (await p.getByTestId('pathway-source').first().getAttribute('href')) === 'https://www.immigration.go.kr/bbs/immigration_eng/230/454085/download.do');
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
    await p.getByTestId('pathway-picker').locator('[data-pathway="degree"]').click();
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
    await p.getByTestId('pathway-picker').locator('[data-pathway="degree"]').click();
    y = await pb((v) => !v.pathwayByCountry?.KR);
    check('no pathway → both categories, with a hint to choose', (await p.getByTestId('visa-categories').locator('[data-category]').allInnerTexts()).join() === 'D-2,D-4' && /Choose your pathway/.test(await p.locator('main').innerText()));
    check('visa KR desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-kr-b2-01-visa');
    await p.goto(`${BASE}/abroad/visa/de`, { waitUntil: 'load' });
    await p.getByTestId('work-check').waitFor({ timeout: 60_000 });
    check('Germany: no categories; Can I work? shows the sourced rule', (await p.getByTestId('visa-categories').count()) === 0 && (await p.getByTestId('work-check').getAttribute('data-state')) === 'answered' && /140 full days/.test(await p.getByTestId('work-check').innerText()));
    await p.goto(`${BASE}/abroad/countries/de/hub?tab=apply`, { waitUntil: 'load' });
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
    await p.goto(`${BASE}/abroad/countries/de/hub?tab=apply`, { waitUntil: 'load' });
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
    await p.goto(`${BASE}/abroad/countries/kr/hub`, { waitUntil: 'load' });
    await p.getByTestId('pathway-picker').waitFor({ timeout: 60_000 });
    await p.locator('[data-pathway="degree"]').click();
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
    // C2.5 · university registry: official facts only, alphabetical, filterable, never ranked.
    const reg = p.getByTestId('uni-registry');
    const regIds = await reg.locator('[data-registry-university]').evaluateAll((els) => els.map((e) => e.getAttribute('data-registry-university')));
    check('KR registry: 10 universities, listed alphabetically (not ranked)', regIds.length === 10 && regIds[0] === 'kr-chonnam' && regIds[9] === 'kr-yonsei' && /Listed alphabetically, not ranked/.test(await reg.innerText()), regIds.join(','));
    check('KR registry card: city · type from Study in Korea, English-taught note, official + admissions links', /Seoul · Public \(national\)/.test(await reg.locator('[data-registry-university="kr-snu"]').innerText()) && /Has English-taught programs/.test(await reg.locator('[data-registry-university="kr-snu"]').innerText()) && (await reg.locator('[data-registry-university="kr-snu"] a[href="https://en.snu.ac.kr/admission"]').count()) === 1);
    await filters.getByRole('button', { name: 'Public' }).click();
    check('type filter: Public → only national universities', (await reg.locator('[data-registry-university]').count()) === 5 && (await reg.locator('[data-registry-university][data-ownership="private"]').count()) === 0);
    await filters.locator('select').selectOption('Busan');
    check('city filter: Busan + Public → Pusan National University only', (await reg.locator('[data-registry-university]').evaluateAll((els) => els.map((e) => e.getAttribute('data-registry-university')))).join(',') === 'kr-pnu');
    await filters.locator('select').selectOption('');
    await filters.getByRole('button', { name: 'All', exact: true }).click();
    const progIds = await p.locator('[data-program]').evaluateAll((els) => els.map((e) => e.getAttribute('data-program')));
    check('C2.6 programs: only officially checked programs, with the university and city', progIds.includes('kr-yonsei-uic') || progIds.includes('kr-woosong-solbridge-bba') || /No reviewed programs fit these filters yet/.test(await p.getByTestId('program-finder').innerText()), progIds.join(','));
    check('no ranking anywhere (only the "not ranked" note)', !/rank|best university|top \d/i.test((await p.locator('main').innerText()).replace(/not ranked/gi, '')));
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
    const tuitionEst = await tuition.locator('[data-block="estimate"]').innerText();
    check('tuition (C2.4): Official not verified; guidebook estimate in KRW with its basis, never an official figure', /Not verified yet/.test(await tuition.locator('[data-block="official"]').innerText()) && /KRW/.test(tuitionEst) && /midpoint/.test(tuitionEst), tuitionEst.slice(0, 200));
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
    check('planning view (C2.4): estimate total in KRW, my money in USD, no difference (never converted), honest notes', /KRW/.test(await p.getByTestId('cost-estimate-total').innerText()) && (await p.getByTestId('cost-difference').innerText()) === '—' && /Some cost information is not verified yet/.test(await p.getByTestId('cost-notes').innerText()) && /not financial advice/.test(await p.getByTestId('cost-notes').innerText()));
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
    await p.goto(`${BASE}/abroad/journey`, { waitUntil: 'load' });
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
    await q.goto(`${BASE}/abroad/journey`, { waitUntil: 'load' });
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
    await q.goto(`${BASE}/abroad/journey`, { waitUntil: 'load' });
    await q.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    await setDark(q, true);
    check('bn mobile dark: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'sa-3a-05-mobile-dark');
    await setDark(q, false);
    await q.goto(`${BASE}/abroad/countries`, { waitUntil: 'load' });
    await q.getByTestId('priority-countries').waitFor({ timeout: 60_000 });
    check('bn explorer mobile: no sideways scroll', await noHorizontalScroll(q));
    check('bn explorer: shortlist button in Bangla', (await q.getByRole('button', { name: 'Shortlist-এ রাখুন' }).count()) >= 13);
    await shot(q, 'sa-3b-02-explorer-mobile', false);
    await q.goto(`${BASE}/abroad/countries/kr`, { waitUntil: 'load' });
    await q.getByTestId('country-guide').waitFor({ timeout: 60_000 });
    check('bn guide: heading and most asked questions in Bangla', /South Korea-এ পড়াশোনা/.test(await q.getByRole('heading', { level: 1 }).innerText()) && /সবচেয়ে বেশি জিজ্ঞেস করা প্রশ্ন/.test(await q.getByTestId('guide-faq').innerText()) && /TOPIK লাগবে কি\?/.test(await q.getByTestId('guide-faq').innerText()));
    check('bn guide: respectful আপনি, never তুমি', !/তুমি|তোমার/.test(await q.locator('main').innerText()));
    check('bn guide mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-guide-04-country-mobile-bn');
    await q.getByTestId('guide-degrees').locator('[data-degree="masters"]').click();
    await q.waitForURL('**/abroad/countries/kr/degree/masters');
    await q.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    check('bn degree: Master’s guide in Bangla, sources at the end', /অন্য subject থেকে আবেদন করা যায় কি\?/.test(await q.getByTestId('degree-guide').innerText()) && (await q.getByTestId('guide-sources').locator('a').count()) >= 8);
    check('bn degree mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-guide-05-masters-mobile-bn');
    await q.goto(`${BASE}/abroad/countries/de/degree/bachelors`, { waitUntil: 'load' });
    await q.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    check('bn DE bachelor’s: in Bangla, respectful আপনি', /HSC দিয়ে আবেদন করা যায় কি\?/.test(await q.getByTestId('degree-guide').innerText()) && !/তুমি|তোমার/.test(await q.locator('main').innerText()));
    check('bn DE bachelor’s mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-guide-de-04-bachelors-mobile-bn');
    await q.goto(`${BASE}/abroad/countries/jp/degree/bachelors`, { waitUntil: 'load' });
    await q.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    check('bn JP bachelor’s: Bangla question headings, respectful আপনি', /জাপানে Bachelor's পড়তে কী কী লাগে\?/.test(await q.getByTestId('degree-guide').innerText()) && /জাপানে Student Visa কীভাবে পাওয়া যায়\?/.test(await q.getByTestId('degree-guide').innerText()) && !/তুমি|তোমার/.test(await q.locator('main').innerText()));
    check('bn JP bachelor’s mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-guide-jp-04-bachelors-mobile-bn');
    await q.goto(`${BASE}/abroad/countries/it/degree/bachelors`, { waitUntil: 'load' });
    await q.getByTestId('degree-guide').waitFor({ timeout: 60_000 });
    const bnIt = await q.getByTestId('degree-guide').innerText();
    check('bn IT bachelor’s: Bangla question headings, respectful আপনি', /HSC-র পরেই কি সরাসরি আবেদন করা যায়\?/.test(bnIt) && /Bangladesh থেকে Italy-র student visa কীভাবে পাবেন\?/.test(bnIt) && !/তুমি|তোমার/.test(await q.locator('main').innerText()));
    check('bn IT bachelor’s mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-guide-it-04-bachelors-mobile-bn');
    await q.goto(`${BASE}/abroad/countries/kr/hub`, { waitUntil: 'load' });
    await q.getByTestId('study-options').waitFor({ timeout: 60_000 });
    check('bn: study options heading in Bangla', /একটা program বেছে নিন/.test(await q.getByTestId('study-options').innerText()));
    await q.locator('[data-study-option="degree-bachelors"]').click();
    await q.waitForURL('**/abroad/countries/kr/study/degree-bachelors');
    await q.getByTestId('study-guide').waitFor({ timeout: 60_000 });
    check('bn guide: respectful Bangla (no তুমি/তোমার) and "তথ্যের উৎস" at the end', !/তুমি|তোমার|তোমাকে/.test(await q.locator('main').innerText()) && /তথ্যের উৎস/.test(await q.getByTestId('study-guide').innerText()));
    check('bn guide: headings and "এই তথ্য এখনো verified নয়"', /এই প্রোগ্রামটি কী\?/.test(await q.getByTestId('study-guide').innerText()) && /এই তথ্য এখনো verified নয়/.test(await q.getByTestId('study-guide').innerText()));
    const bnDepart = await q.locator('[data-guide-section="before-departure"]').innerText();
    check('bn guide (C2.8): arrival — law requirements apart from practical steps, in Bangla', /আইনে যা বাধ্যতামূলক/.test(bnDepart) && /আইনি বাধ্যবাধকতা নয়/.test(bnDepart) && bnDepart.indexOf('আইনে যা বাধ্যতামূলক') < bnDepart.indexOf('আইনি বাধ্যবাধকতা নয়'));
    check('bn guide (C2.4): costs show tuition range and GKS in the student’s language', /Bachelor's: ₩5,000,000–7,000,000/.test(await q.locator('[data-guide-section="costs"]').innerText()) && /Global Korea Scholarship/.test(await q.locator('[data-guide-section="costs"]').innerText()));
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
    check('bn documents in Bangla', /আপনার Australia plan-এর জন্য/.test(await (async () => { await q.goto(`${BASE}/abroad/documents`, { waitUntil: 'load' }); await q.getByTestId('docs-required').waitFor({ timeout: 60_000 }); return q.locator('main').innerText(); })()));
    await shot(q, 'sa-3i-02-documents-mobile-bn', false);
    await q.goto(`${BASE}/abroad/visa/au`, { waitUntil: 'load' });
    await q.getByTestId('visa-parts').waitFor({ timeout: 60_000 });
    await q.goto(`${BASE}/abroad/visa/kr`, { waitUntil: 'load' });
    await q.getByTestId('pathway-picker').waitFor({ timeout: 60_000 });
    check('bn KR visa: pathway question in Bangla', /আপনি কী পড়ার plan করছেন\?/.test(await q.getByTestId('pathway-picker').innerText()));
    check('bn KR picker: visa name + source line in Bangla', /Visa: D-2 \(Student\)/.test(await q.getByTestId('pathway-picker').innerText()) && /Visa-র নামের source/.test(await q.getByTestId('pathway-picker').innerText()));
    // C1.2 · D-2 in Bangla on mobile
    await q.locator('[data-pathway="degree"]').click();
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
    await q.locator('[data-pathway="language"]').click();
    await q.waitForFunction(() => document.querySelector('[data-testid="visa-parts"]')?.getAttribute('data-category') === 'D-4', null, { timeout: 10_000 });
    check('bn D-4 processing: "Official নির্দিষ্ট processing time verified নয়"', /Official নির্দিষ্ট processing time verified নয়/.test(await qOpen('processing')));
    const bnD4Money = await qOpen('finances');
    check('bn D-4 money (C2.2): older guidebook amount shown with a "confirm with the Embassy / VAC" note', /10 million KRW/.test(bnD4Money) && /পুরনো official guidebook/.test(bnD4Money) && /Visa Application Center/.test(bnD4Money));
    check('bn D-4 work question in Bangla', /D-4-এ কত দিন ধরে Korea-তে আছেন\?/.test(await q.getByTestId('work-check').innerText()));
    check('bn D-4 mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-kr-c13-02-d4-mobile-bn', false);
    // Back to "no pathway" so the later checks start from the same state.
    await q.locator('[data-pathway="language"]').click();
    await q.waitForFunction(() => document.querySelectorAll('[data-testid="visa-categories"] [data-category]').length === 2, null, { timeout: 10_000 });
    check('bn KR visa mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-kr-b2-02-visa-mobile-bn', false);
    await q.goto(`${BASE}/abroad/universities?country=kr`, { waitUntil: 'load' });
    await q.getByTestId('program-finder').waitFor({ timeout: 60_000 });
    check('bn: contextual question in Bangla', /কোন ভাষায় পড়তে চান\?/.test(await q.locator('[data-question="studyLanguage"]').innerText()));
    check('bn universities mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-kr-b3-03-universities-mobile-bn', false);
    await q.goto(`${BASE}/abroad/profile`, { waitUntil: 'load' });
    await q.locator('[data-profile-field="korean"]').waitFor({ timeout: 60_000 });
    check('bn profile: "দেওয়া হয়নি" for missing answers', /দেওয়া হয়নি/.test(await q.locator('[data-profile-field="korean"]').innerText()));
    check('bn profile mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-kr-b3-04-profile-mobile-bn', false);
    await q.goto(`${BASE}/abroad/cost?country=kr`, { waitUntil: 'load' });
    await q.getByTestId('cost-groups').waitFor({ timeout: 60_000 });
    check('bn cost: title + pathway notice (no pathway chosen)', /কত টাকা লাগতে পারে\?/.test(await q.locator('main').innerText()) && /আগে pathway বেছে নিন/.test(await q.locator('main').innerText()));
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

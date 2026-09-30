// Home: goal → Quick access (today's learning, IELTS Foundation, Practice Test,
// Speaking Test, Study Abroad) → Mino; today's learning on its own page with
// the CTA that follows today's plan; the bottom navigation with a raised,
// blinking Mino. Bangla on a small Android screen, English on desktop.
//   bash scripts/e2e/run.sh home
import type { Page } from 'playwright-core';
import { createBrainWord } from '../../lib/engine/brain';
import { localDateKey } from '../../lib/engine/dates';
import { BASE, check, launch, noHorizontalScroll, patchField, putDoc, report, shot, signUp, uidOf, watchErrors } from './helpers';

const TEXT = {
  bn: { start: 'আজকের পড়া শুরু করুন', cont: 'আজকের পড়া চালিয়ে যান', finish: 'আজকের পড়া শেষ করুন', done: 'আজকের পড়া সম্পন্ন হয়েছে', today: 'আজকের পড়া' },
  en: { start: 'Start today’s learning', cont: 'Continue today’s learning', finish: 'Finish today’s learning', done: 'Today’s learning completed', today: "Today's Learning" },
};

async function cta(p: Page) {
  await p.goto(BASE + '/today', { waitUntil: 'load' });
  const el = p.getByTestId('today-cta');
  await el.waitFor({ timeout: 60_000 });
  const status = p.getByTestId('today-status');
  return { text: (await el.innerText()).trim(), state: await el.getAttribute('data-state'), href: await el.getAttribute('href'), status: (await status.count()) ? (await status.innerText()).trim() : '' };
}

async function home(p: Page) {
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.getByTestId('quick-access').waitFor({ timeout: 60_000 });
}

async function run(p: Page, lang: 'bn' | 'en', tag: string) {
  const T = TEXT[lang];
  const mobile = tag.includes('mobile');
  const uid = (await uidOf(p))!;
  const today = localDateKey(new Date());
  const days = (done: string[]) => patchField(`users/${uid}`, 'app.study.days', { [today]: { mode: 'normal', done } });

  // ---------------------------------------------------------------- Home structure
  await home(p);
  const y = async (sel: string) => (await p.locator(sel).first().boundingBox())!.y;
  check(`${tag}: order — greeting, goal & progress, Quick access`, (await y('h1')) < (await y('[data-testid="progress-card"]')) && (await y('[data-testid="progress-card"]')) < (await y('[data-testid="quick-access"]')));
  if (mobile && (await p.getByTestId('mino-card').count())) check(`${tag}: Mino comes after Quick access`, (await y('[data-testid="quick-access"]')) < (await y('[data-testid="mino-card"]')));
  const ids = await p.locator('[data-quick]').evaluateAll((els) => els.map((e) => e.getAttribute('data-quick')));
  check(`${tag}: Quick access has exactly the 5 destinations`, ids.join(',') === 'today,foundation,brain,readingVocab,abroad', ids.join(','));
  check(`${tag}: no separate today's-learning section on Home`, (await p.getByTestId('today-card').count()) === 0 && (await p.getByTestId('today-cta').count()) === 0);
  check(`${tag}: today tile shows today's progress`, /0\/[24]|০\/[২৪]/.test(await p.getByTestId('quick-today-status').innerText()), await p.getByTestId('quick-today-status').innerText());
  const small = await p.locator('[data-quick]').evaluateAll((els) => els.filter((e) => { const r = e.getBoundingClientRect(); return r.height < 44 || r.width < 44; }).length);
  check(`${tag}: every shortcut is comfortably tappable (≥ 44 px)`, small === 0);
  check(`${tag}: home has no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, `home-${tag}`, false);

  // ---------------------------------------------------------------- Quick access destinations
  for (const [id, url] of [['foundation', '/ielts/foundation'], ['brain', '/ielts/vocabulary/notebook'], ['readingVocab', '/ielts/vocabulary/reading'], ['abroad', '/abroad'], ['today', '/today']] as const) {
    await home(p);
    await p.locator(`[data-quick="${id}"]`).click();
    await p.waitForURL(`**${url}`, { timeout: 30_000 });
    check(`${tag}: "${id}" opens ${url}`, new URL(p.url()).pathname === url);
  }
  await p.getByTestId('today-card').waitFor({ timeout: 30_000 });
  // A new student with no saved words has reading + vocabulary; the full plan (4 tasks) is checked below.
  check(`${tag}: today's page — tasks, time and progress`, (await p.locator('[data-task]').count()) === 2 && /\d|[০-৯]/.test(await p.getByTestId('today-time').innerText()) && (await p.getByTestId('today-progress').count()) === 1);
  const activeNav = mobile ? '[data-testid="bottom-nav"] a[aria-current="page"]' : 'aside a[aria-current="page"]';
  check(`${tag}: today's page keeps Home as the active tab`, (await p.locator(activeNav).getAttribute('href')) === '/');
  check(`${tag}: today's page has no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, `today-${tag}`, false);

  // ---------------------------------------------------------------- CTA follows today's plan (existing state)
  let c = await cta(p);
  check(`${tag}: new student → "${T.start}"`, c.text === T.start && c.state === 'not-started', JSON.stringify(c));
  await days(['reading']);
  c = await cta(p);
  check(`${tag}: daily goal one step from done → "${T.finish}"`, c.text === T.finish && c.state === 'finishing', JSON.stringify(c));
  const word = createBrainWord(
    { word: 'resilient', lemma: 'resilient', meaning: 'able to recover quickly', synonyms: [], antonyms: [], collocations: [], dictionarySource: 'none' },
    { type: 'manual', title: 'E2E' },
    undefined,
  );
  await putDoc(`users/${uid}/vocabulary/${word.id}`, word);
  c = await cta(p);
  check(`${tag}: started but not finished → "${T.cont}"`, c.text === T.cont && c.state === 'in-progress', JSON.stringify(c));
  check(`${tag}: full plan shows all 4 tasks (Vocabulary Review, Reading, Writing, Speaking)`, (await p.locator('[data-task]').evaluateAll((els) => els.map((e) => e.getAttribute('data-task')))).join(',') === 'vocabulary,reading,writing,speaking');
  check(`${tag}: the CTA opens the next task of the existing flow`, c.href === '/review', c.href);
  await days(['reading', 'vocabulary', 'writing', 'speaking']);
  c = await cta(p);
  check(`${tag}: everything done → "${T.done}" + next learning action`, c.status === T.done && c.state === 'completed' && (c.href === '/review' || c.href === '/ielts'), JSON.stringify(c));
  await home(p);
  check(`${tag}: today tile on Home says completed`, (await p.getByTestId('quick-today-status').innerText()).trim() === T.done);

  // ---------------------------------------------------------------- navigation
  if (mobile) {
    const nav = p.getByTestId('bottom-nav');
    const navBox = (await nav.boundingBox())!;
    check(`${tag}: bottom nav is taller (≥ 72 px) with 5 tabs, icon + label`, navBox.height >= 72 && (await nav.locator('a').count()) === 5);
    const cut = await nav.locator('a > span:last-child').evaluateAll((els) => els.filter((e) => e.scrollWidth > e.clientWidth + 1).map((e) => e.textContent));
    check(`${tag}: no nav label is cut off`, cut.length === 0, cut.join(','));
    check(`${tag}: Home tab active with its colored pill`, (await nav.locator('a[aria-current="page"]').getAttribute('href')) === '/' && (await nav.locator('a[aria-current="page"] .bg-tint-blue').count()) === 1);
    const mino = p.getByTestId('nav-mino');
    const mBox = (await mino.boundingBox())!;
    const iconBox = (await nav.locator('a[data-nav="ielts"] svg').boundingBox())!;
    check(`${tag}: Mino is larger and raised above the bar`, mBox.height > iconBox.height * 1.8 && mBox.y < navBox.y);
    const others = await nav.locator('a:not([data-nav="mino"])').evaluateAll((els) => els.map((e) => e.getBoundingClientRect()));
    check(`${tag}: Mino does not overlap other tabs`, others.every((r) => r.right <= mBox.x + 1 || r.left >= mBox.x + mBox.width - 1));
    await p.waitForFunction(() => document.querySelector('[data-testid="nav-mino"] .mino')?.getAttribute('data-motion') === 'on', null, { timeout: 10_000 });
    const before = await mino.boundingBox();
    const blinked = await p.waitForFunction(() => document.querySelector('[data-testid="nav-mino"] .mino')?.hasAttribute('data-blink'), null, { timeout: 12_000, polling: 'raf' }).then(() => true, () => false);
    check(`${tag}: Mino in the nav blinks on its own (every few seconds)`, blinked);
    const during = await mino.boundingBox();
    check(`${tag}: the blink causes no layout shift`, JSON.stringify(before) === JSON.stringify(during));
    await p.locator('a[data-nav="ielts"]').click();
    await p.waitForURL('**/ielts');
    await p.waitForFunction(() => document.querySelector('[data-testid="nav-mino"] .mino')?.getAttribute('data-motion') === 'on', null, { timeout: 10_000 });
    check(`${tag}: Mino keeps blinking on other tabs (IELTS)`, (await p.locator('[data-testid="bottom-nav"] a[aria-current="page"]').getAttribute('href')) === '/ielts');
    // Content never hides behind the bar: the page's end sits above it.
    await home(p);
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // The page's own content (inside the padded container), not the padding itself.
    const lastBottom = await p.evaluate(() => document.querySelector('main > div > div')!.getBoundingClientRect().bottom);
    check(`${tag}: content ends above the bottom nav`, lastBottom <= (await nav.boundingBox())!.y + 1, `${lastBottom} vs ${(await nav.boundingBox())!.y}`);
    await shot(p, `home-bottom-${tag}`, false);
  } else {
    check(`${tag}: desktop uses the side rail (bottom nav hidden)`, !(await p.getByTestId('bottom-nav').isVisible()));
    check(`${tag}: side rail Mino is alive`, (await p.locator('aside .mino').getAttribute('data-mino-mode')) === 'idle');
  }
}

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  try {
    // Small Android phone.
    const mctx = await browser.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const mob = await mctx.newPage();
    watchErrors(mob, 'bn-mobile', errors);
    await signUp(mob, 'Rafi', `home-bn-${stamp}@test.dev`, 'bn');
    console.log('\n[HOME] Bangla · small Android');
    await run(mob, 'bn', 'bn mobile');

    // Reduced motion: Mino in the nav stays still.
    const rp = await mctx.newPage();
    await rp.emulateMedia({ reducedMotion: 'reduce' });
    await rp.goto(BASE + '/', { waitUntil: 'load' });
    await rp.getByTestId('nav-mino').waitFor({ timeout: 60_000 });
    await rp.waitForTimeout(500);
    check('reduced motion: Mino in the nav does not animate', (await rp.locator('[data-testid="nav-mino"] .mino').getAttribute('data-motion')) === 'off');
    await rp.close();

    const desk = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
    watchErrors(desk, 'en-desktop', errors);
    await signUp(desk, 'Nadia', `home-en-${stamp}@test.dev`, 'en');
    console.log('\n[HOME] English · desktop');
    await run(desk, 'en', 'en desktop');

    // Tablet width: bottom nav, no overflow.
    const tab = await (await browser.newContext({ viewport: { width: 700, height: 1000 } })).newPage();
    await tab.goto(BASE + '/', { waitUntil: 'load' }).catch(() => undefined);
  } catch (e) {
    check('EXCEPTION ' + (e as Error).message.split('\n')[0], false, (e as Error).stack);
  } finally {
    check('no page errors', errors.length === 0, errors.join(' | '));
    await browser.close();
  }
  process.exit(report());
}
main();

// The IELTS learning path: Continue Learning, the seven stages (only the
// current one open), Home ↔ IELTS ↔ Today showing the same next step, the
// English check at the end of Start Here, and honest progress numbers.
// Bangla on a small Android screen, English on desktop.
//   bash scripts/e2e/run.sh curriculum
import type { Page } from 'playwright-core';
import { scoreDiagnostic } from '../../lib/foundation';
import { BASE, check, getDoc, launch, noHorizontalScroll, patchField, playLesson, report, shot, signUp, uidOf, watchErrors, type Lang } from './helpers';

const STAGES = ['start-here', 'english-foundation', 'ielts-basics', 'skill-building', 'practice', 'mock-tests', 'target-ready'];
const TEXT = {
  bn: { start: 'এখান থেকে শুরু', foundationTitle: 'এবার আপনার দরকারি English foundation তৈরি করা যাক', check: 'আপনার English level যাচাই করুন' },
  en: { start: 'Start Here', foundationTitle: "Now let's build the English foundation you need", check: 'Check your English level' },
};

async function ielts(p: Page) {
  await p.goto(BASE + '/ielts', { waitUntil: 'load' });
  await p.getByTestId('continue-learning').waitFor({ timeout: 60_000 });
}
const cont = async (p: Page) => ({
  kind: await p.getByTestId('continue-learning').getAttribute('data-kind'),
  title: (await p.getByTestId('continue-title').innerText()).trim(),
  href: await p.getByTestId('continue-cta').getAttribute('href'),
});
const stageState = (p: Page, id: string) => p.locator(`[data-stage="${id}"]`).getAttribute('data-state');
const openStages = (p: Page) => p.locator('[data-testid^="stage-steps-"]').evaluateAll((els) => els.map((e) => e.getAttribute('data-testid')!.replace('stage-steps-', '')));
const lessonRec = () => ({ completedAt: new Date().toISOString(), score: 90, best: 90, attempts: 1 });

async function run(p: Page, lang: Lang, tag: string) {
  const T = TEXT[lang];
  const uid = (await uidOf(p))!;
  const setLessons = (ids: string[]) => patchField(`users/${uid}`, 'app.foundation.lessons', Object.fromEntries(ids.map((id) => [id, lessonRec()])));

  // ---------------------------------------------------------------- new student
  await ielts(p);
  let c = await cont(p);
  check(`${tag}: new student → Continue opens Start Here's first lesson`, c.kind === 'lesson' && c.href === '/ielts/foundation/lesson/ib-1', JSON.stringify(c));
  const y = async (sel: string) => (await p.locator(sel).first().boundingBox())!.y;
  check(`${tag}: Continue Learning is the first thing on the IELTS page`, (await y('[data-testid="continue-learning"]')) < (await y('[data-testid="learning-path"]')));
  const ids = await p.locator('[data-stage]').evaluateAll((els) => els.map((e) => e.getAttribute('data-stage')));
  check(`${tag}: seven stages in order`, ids.join(',') === STAGES.join(','), ids.join(','));
  check(`${tag}: ● Start Here current, ○ the rest upcoming`, (await stageState(p, 'start-here')) === 'current' && (await stageState(p, 'english-foundation')) === 'upcoming');
  check(`${tag}: only the current stage is expanded`, (await openStages(p)).join(',') === 'start-here');
  check(`${tag}: stage titles in the student's language`, (await p.locator('[data-stage="start-here"]').innerText()).includes(T.start));
  check(`${tag}: honest stats start at zero`, /^(0|০)\//.test((await p.getByTestId('stat-lessons').innerText()).trim()));
  // Progressive disclosure: a later stage opens and closes on tap.
  await p.getByTestId('stage-toggle-english-foundation').click();
  check(`${tag}: tapping a stage shows its steps`, (await p.getByTestId('stage-steps-english-foundation').isVisible()) && (await p.locator('[data-step="sentences"]').getAttribute('href')) === '/ielts/foundation/lesson/sb-1');
  await p.getByTestId('stage-toggle-english-foundation').click();
  check(`${tag}: and hides them again`, (await p.getByTestId('stage-steps-english-foundation').count()) === 0);
  check(`${tag}: IELTS page has no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, `curriculum-new-${tag}`);

  // Home and Today point to the same next step.
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.getByTestId('home-continue').waitFor({ timeout: 60_000 });
  check(`${tag}: Home shows the same next step`, (await p.getByTestId('home-continue').getAttribute('href')) === c.href);
  await p.goto(BASE + '/today', { waitUntil: 'load' });
  await p.getByTestId('today-card').waitFor({ timeout: 60_000 });
  check(`${tag}: Today's Learning starts with that lesson`, (await p.locator('[data-task]').first().getAttribute('href')) === c.href);

  // ---------------------------------------------------------------- play the first lesson from Continue
  if (lang === 'en') {
    await ielts(p);
    await p.getByTestId('continue-cta').click();
    await p.waitForURL('**/ielts/foundation/lesson/ib-1', { timeout: 30_000 });
    await playLesson(p, lang);
    await p.waitForTimeout(1500);
    await ielts(p);
    c = await cont(p);
    check(`${tag}: after the lesson, Continue moves to the next one`, c.href === '/ielts/foundation/lesson/ib-2', JSON.stringify(c));
    check(`${tag}: 1 lesson completed is counted`, (await p.getByTestId('stat-lessons').innerText()).trim().startsWith('1/'));
    check(`${tag}: the finished step is ticked`, (await p.locator('[data-step="what-is-ielts"]').getAttribute('data-state')) === 'done');
  }

  // ---------------------------------------------------------------- end of Start Here → the check (optional)
  await setLessons(['ib-1', 'ib-2', 'ib-3', 'ib-4']);
  await ielts(p);
  c = await cont(p);
  check(`${tag}: Start Here done → "Check your English level"`, c.kind === 'check' && c.title === T.check && c.href === '/ielts/foundation/diagnostic', JSON.stringify(c));
  check(`${tag}: the check can be skipped`, (await p.getByTestId('continue-skip').getAttribute('href')) === '/ielts/foundation/lesson/sb-1');
  check(`${tag}: ✓ Start Here, ● English Foundation (now expanded)`, (await stageState(p, 'start-here')) === 'done' && (await stageState(p, 'english-foundation')) === 'current' && (await openStages(p)).join(',') === 'english-foundation');

  // Took the check → "Now let's build the English foundation you need".
  await patchField(`users/${uid}`, 'app.foundation.diagnostic', JSON.parse(JSON.stringify(scoreDiagnostic({}))));
  await ielts(p);
  c = await cont(p);
  check(`${tag}: after the check → Start English Foundation`, c.kind === 'foundation-start' && c.title === T.foundationTitle && c.href === '/ielts/foundation/lesson/sb-1', JSON.stringify(c));
  await shot(p, `curriculum-foundation-${tag}`);

  // Deep in English Foundation: the path, not module order (articles come before the tenses).
  const ef = ['sb-1', 'sb-2', 'sb-3', 'sb-4', 'sb-5', 'po-1', 'pn-1', 'pn-2', 'pn-3', 'pn-4', 'ppr-1', 'ppr-2', 'ppr-3', 'pvb-1', 'pvb-2', 'pvb-3', 'pvb-4', 'pvb-5', 'sb-6', 'sb-7'];
  await setLessons(['ib-1', 'ib-2', 'ib-3', 'ib-4', ...ef]);
  await ielts(p);
  c = await cont(p);
  check(`${tag}: after verbs and sentence patterns → Articles`, c.href === '/ielts/foundation/lesson/ar-1', JSON.stringify(c));
  check(`${tag}: step states — done, current`, (await p.locator('[data-step="sentence-patterns"]').getAttribute('data-state')) === 'done' && (await p.locator('[data-step="articles"]').getAttribute('data-state')) === 'current');
  check(`${tag}: a long stage shows the steps around the current one`, (await p.locator('[data-step="nouns"]').count()) === 0 && (await p.locator('[data-step="english-foundation"] [data-step]').count()) === 0);
  await p.getByTestId('stage-all-english-foundation').click();
  check(`${tag}: "Show all" lists every step`, (await p.locator('[data-testid="stage-steps-english-foundation"] [data-step]').count()) === 21 && (await p.locator('[data-step="verbs"]').getAttribute('data-state')) === 'done');
  check(`${tag}: stats count only completed lessons`, (await p.getByTestId('stat-lessons').innerText()).trim().startsWith(lang === 'bn' ? '২৪/' : '24/'), await p.getByTestId('stat-lessons').innerText());
  const f = (await getDoc(`users/${uid}`)).app.foundation;
  check(`${tag}: no data was changed by viewing`, Object.keys(f.lessons).length === 24);
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.getByTestId('home-continue').waitFor({ timeout: 60_000 });
  check(`${tag}: Home follows the same path`, (await p.getByTestId('home-continue').getAttribute('href')) === '/ielts/foundation/lesson/ar-1');
  await p.goto(BASE + '/ielts/foundation', { waitUntil: 'load' });
  await p.getByText(/Articles|Article/).first().waitFor({ timeout: 60_000 });
  check(`${tag}: Foundation library still lists every module`, (await p.locator('a[href^="/ielts/foundation/"]').count()) >= 16);
}

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  try {
    const mob = await (await browser.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })).newPage();
    watchErrors(mob, 'bn-mobile', errors);
    await signUp(mob, 'Rafi', `curr-bn-${stamp}@test.dev`, 'bn');
    console.log('\n[CURRICULUM] Bangla · small Android');
    await run(mob, 'bn', 'bn mobile');

    const desk = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
    watchErrors(desk, 'en-desktop', errors);
    await signUp(desk, 'Nadia', `curr-en-${stamp}@test.dev`, 'en');
    console.log('\n[CURRICULUM] English · desktop');
    await run(desk, 'en', 'en desktop');
  } catch (e) {
    check('EXCEPTION ' + (e as Error).message.split('\n')[0], false, (e as Error).stack);
  } finally {
    check('no page errors', errors.length === 0, errors.join(' | '));
    await browser.close();
  }
  process.exit(report());
}
main();

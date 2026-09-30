// The IELTS learning path: Continue Learning, the seven stages (only the
// current one open), Home ↔ IELTS ↔ Today showing the same next step, the
// English check at the end of Start Here, and honest progress numbers.
// Bangla on a small Android screen, English on desktop.
//   bash scripts/e2e/run.sh curriculum
import type { Page } from 'playwright-core';
import { scoreDiagnostic } from '../../lib/foundation';
import { BASE, check, getDoc, launch, noHorizontalScroll, patchField, playLesson, report, shot, signUp, uidOf, watchErrors, type Lang } from './helpers';

const TOPICS = [
  'sentences', 'parts-of-speech', 'nouns', 'pronouns', 'verbs', 'sentence-patterns', 'articles', 'tenses', 'agreement', 'adjectives-adverbs',
  'prepositions', 'connectors', 'complex-sentences', 'punctuation', 'common-errors', 'foundation-review', 'vocabulary-foundation',
];
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
  check(`${tag}: tapping English Foundation shows its topic cards`, (await p.getByTestId('stage-steps-english-foundation').isVisible()) && (await p.locator('[data-testid="stage-steps-english-foundation"] [data-topic]').count()) === 17);
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
  check(`${tag}: IELTS page — the same cards: Simple & Compound done, Articles current`, (await p.locator('[data-topic="sentence-patterns"]').getAttribute('data-state')) === 'done' && (await p.locator('[data-topic="articles"]').getAttribute('data-state')) === 'current');
  check(`${tag}: stats count only completed lessons`, (await p.getByTestId('stat-lessons').innerText()).trim().startsWith(lang === 'bn' ? '২৪/' : '24/'), await p.getByTestId('stat-lessons').innerText());
  const f = (await getDoc(`users/${uid}`)).app.foundation;
  check(`${tag}: no data was changed by viewing`, Object.keys(f.lessons).length === 24);
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.getByTestId('home-continue').waitFor({ timeout: 60_000 });
  check(`${tag}: Home follows the same path`, (await p.getByTestId('home-continue').getAttribute('href')) === '/ielts/foundation/lesson/ar-1');

  // ---------------------------------------------------------------- Foundation page: topic cards
  await setLessons(['ib-1', 'ib-2', 'ib-3', 'ib-4', ...ef, 'ar-1', 'ar-2', 'ar-3']);
  await p.goto(BASE + '/ielts/foundation', { waitUntil: 'load' });
  await p.getByTestId('topic-cards').waitFor({ timeout: 60_000 });
  const topics = await p.locator('[data-testid="foundation-level1"] [data-topic]').evaluateAll((els) => els.map((e) => e.getAttribute('data-topic')));
  check(`${tag}: 16 topic cards in order, Vocabulary alongside`, topics.join(',') === TOPICS.join(','), topics.join(','));
  check(`${tag}: Level 1 header and topic progress (6 of 16 done)`, (await p.getByTestId('topics-done').innerText()).trim().startsWith(lang === 'bn' ? '৬/১৬' : '6/16'), await p.getByTestId('topics-done').innerText());
  const articles = p.locator('[data-topic="articles"]');
  const artText = await articles.innerText();
  check(`${tag}: progress kept per card — Articles 3/9, 33%`, (lang === 'bn' ? /৩\/৯/.test(artText) && /৩৩%/.test(artText) : /3\/9/.test(artText) && /33%/.test(artText)), artText);
  check(`${tag}: finished cards say so, not-started cards show their size`, (await p.locator('[data-topic="nouns"]').getAttribute('data-state')) === 'done' && /Completed|সম্পন্ন/.test(await p.locator('[data-topic="nouns"]').innerText()) && !/%/.test(await p.locator('[data-topic="agreement"]').innerText()));
  check(`${tag}: the current card offers Continue at the next lesson`, (await articles.getAttribute('data-state')) === 'current' && (await articles.getByTestId('topic-continue').getAttribute('href')) === '/ielts/foundation/lesson/ar-4');
  check(`${tag}: all cards start closed`, (await p.locator('[data-testid^="topic-body-"][data-open="true"]').count()) === 0);
  await p.getByTestId('topic-toggle-articles').click();
  await p.waitForTimeout(400);
  check(`${tag}: tapping a card opens its lessons in place (no navigation)`, new URL(p.url()).pathname === '/ielts/foundation' && (await p.getByTestId('topic-body-articles').getAttribute('data-open')) === 'true' && (await articles.locator('[data-lesson]').count()) === 9);
  check(`${tag}: lesson states — done ✓ and the next one marked`, (await articles.locator('[data-lesson="ar-1"]').getAttribute('data-state')) === 'done' && (await articles.locator('[data-lesson="ar-4"]').getAttribute('data-state')) === 'current');
  check(`${tag}: chevron points down when open`, (await p.getByTestId('topic-toggle-articles').getAttribute('aria-expanded')) === 'true');
  await shot(p, `topics-open-${tag}`);
  await p.getByTestId('topic-toggle-tenses').click();
  await p.waitForTimeout(700);
  check(`${tag}: one card open at a time`, (await p.getByTestId('topic-body-articles').getAttribute('data-open')) === 'false' && (await p.getByTestId('topic-body-tenses').getAttribute('data-open')) === 'true');
  check(`${tag}: Tenses holds all 15 lessons, simple forms before perfect`, (await p.locator('[data-topic="tenses"] [data-lesson]').evaluateAll((els) => els.map((e) => e.getAttribute('data-lesson')))).join(',') === 't-1,t-2,t-3,t-4,t-5,t-8,t-6,t-13,t-7,t-14,t-9,t-10,t-11,t-15,t-12');
  check(`${tag}: the open card stays in view`, ((await p.getByTestId('topic-toggle-tenses').boundingBox())!.y) >= -1);
  check(`${tag}: the module (quiz & challenge) is one tap away`, (await p.locator('[data-topic="tenses"] [data-module-link="tenses"]').getAttribute('href')) === '/ielts/foundation/tenses');
  await p.getByTestId('topic-toggle-tenses').click();
  await p.waitForTimeout(400);
  check(`${tag}: and closes again`, (await p.getByTestId('topic-body-tenses').getAttribute('data-open')) === 'false');
  const wide = await p.locator('[data-topic]').evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().right > window.innerWidth + 1).length);
  check(`${tag}: cards fit the screen, no sideways scroll`, wide === 0 && (await noHorizontalScroll(p)));
  const small = await p.locator('[data-testid^="topic-toggle-"]').evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().height < 44).length);
  check(`${tag}: card headers are comfortable touch targets`, small === 0);
  await shot(p, `topics-${tag}`);
  await p.getByTestId('topic-toggle-articles').click();
  await p.waitForTimeout(400);
  await articles.locator('[data-lesson="ar-4"]').click();
  await p.waitForURL('**/ielts/foundation/lesson/ar-4', { timeout: 30_000 });
  check(`${tag}: a lesson in the card opens the lesson`, true);
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

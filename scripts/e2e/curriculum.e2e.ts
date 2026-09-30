// The IELTS learning path: Continue Learning, the seven stages (only the
// current one open), Home ↔ IELTS ↔ Today showing the same next step, the
// English check at the end of Start Here, and honest progress numbers.
// Bangla on a small Android screen, English on desktop.
//   bash scripts/e2e/run.sh curriculum
import type { Page } from 'playwright-core';
import { scoreDiagnostic } from '../../lib/foundation';
import { BASE, check, getDoc, launch, noHorizontalScroll, patchField, playLesson, report, shot, signUp, uidOf, watchErrors, type Lang } from './helpers';

const TOPICS = [
  'sentence-basics', 'parts-of-speech', 'noun', 'pronoun', 'verb-helping-verbs', 'simple-compound-sentences', 'articles', 'tenses', 'agreement', 'adjectives-adverbs',
  'prepositions', 'connectors', 'complex-sentences', 'punctuation', 'common-errors', 'foundation-review', 'vocabulary-foundation',
];
const TEXT = {
  bn: { start: 'এখান থেকে শুরু', foundationTitle: 'এবার আপনার দরকারি English foundation তৈরি করা যাক', check: 'আপনার English level যাচাই করুন' },
  en: { start: 'Start Here', foundationTitle: "Now let's build the English foundation you need", check: 'Check your English level' },
};

// The next step on the path is shown on Home ("Continue learning").
async function home(p: Page) {
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.getByTestId('home-continue').waitFor({ timeout: 60_000 });
}
const cont = async (p: Page) => {
  const link = p.getByTestId('home-continue');
  return {
    kind: await link.getAttribute('data-kind'),
    title: (await link.locator('span > span').nth(1).innerText()).trim(),
    href: await link.getAttribute('href'),
  };
};
async function hub(p: Page) {
  await p.goto(BASE + '/ielts', { waitUntil: 'load' });
  await p.getByTestId('ielts-hub').waitFor({ timeout: 60_000 });
}
async function progress(p: Page) {
  await p.goto(BASE + '/ielts/progress', { waitUntil: 'load' });
  await p.getByTestId('stat-lessons').waitFor({ timeout: 60_000 });
  return (await p.getByTestId('stat-lessons').innerText()).trim();
}
const lessonRec = () => ({ completedAt: new Date().toISOString(), score: 90, best: 90, attempts: 1 });

async function run(p: Page, lang: Lang, tag: string) {
  const T = TEXT[lang];
  const uid = (await uidOf(p))!;
  const setLessons = (ids: string[]) => patchField(`users/${uid}`, 'app.foundation.lessons', Object.fromEntries(ids.map((id) => [id, lessonRec()])));

  // ---------------------------------------------------------------- new student
  await home(p);
  let c = await cont(p);
  check(`${tag}: new student → Continue opens Start Here's first lesson`, c.kind === 'lesson' && c.href === '/ielts/foundation/lesson/ib-1', JSON.stringify(c));

  // ---------------------------------------------------------------- IELTS page: a short list of places to go
  await hub(p);
  check(`${tag}: IELTS page — no learning-path timeline, no progress block`, (await p.getByTestId('learning-path').count()) === 0 && (await p.getByTestId('learning-stats').count()) === 0 && (await p.getByTestId('continue-learning').count()) === 0 && !(await p.locator('main').innerText()).includes(lang === 'bn' ? 'আপনার শেখার পথ' : 'Your learning path'));
  const secY = await Promise.all(['plan', 'learn', 'practice', 'test', 'tools'].map(async (id) => (await p.locator(`#hub-${id}`).boundingBox())!.y));
  check(`${tag}: sections in order — My IELTS Plan, Learn, Practice, Test, Tools`, secY.every((v, i) => i === 0 || v > secY[i - 1]), secY.join(','));
  const hrefs = await p.locator('main a').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  check(`${tag}: My IELTS Plan first, then Progress, Foundation, 4 skills, Practice Tests, Band calculator`, JSON.stringify(hrefs.slice(0, 3)) === JSON.stringify(['/ielts/plan', '/ielts/progress', '/ielts/foundation']) && hrefs.includes('/ielts/tests') && hrefs.includes('/ielts/band-calculator') && hrefs.includes('/ielts/reading'), hrefs.join(' '));
  const tall = await p.locator('main a').evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().height > 96).length);
  check(`${tag}: compact cards (none taller than 96 px)`, tall === 0);
  check(`${tag}: IELTS page has no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, `ielts-hub-${tag}`);
  await p.locator('main a[href="/ielts/progress"]').click();
  await p.waitForURL('**/ielts/progress', { timeout: 30_000 });
  await p.getByTestId('stat-lessons').waitFor({ timeout: 60_000 });
  check(`${tag}: Progress opens its own page, stats start at zero`, /^(0|০)\//.test((await p.getByTestId('stat-lessons').innerText()).trim()));
  await hub(p);
  await p.locator('main a[href="/ielts/plan"]').click();
  await p.waitForURL('**/ielts/plan', { timeout: 30_000 });
  check(`${tag}: My IELTS Plan opens the existing plan page`, new URL(p.url()).pathname === '/ielts/plan');

  // Today points to the same next step.
  await p.goto(BASE + '/today', { waitUntil: 'load' });
  await p.getByTestId('today-card').waitFor({ timeout: 60_000 });
  check(`${tag}: Today's Learning starts with that lesson`, (await p.locator('[data-task]').first().getAttribute('href')) === c.href);

  // ---------------------------------------------------------------- play the first lesson from Continue
  if (lang === 'en') {
    await home(p);
    await p.getByTestId('home-continue').click();
    await p.waitForURL('**/ielts/foundation/lesson/ib-1', { timeout: 30_000 });
    await playLesson(p, lang);
    await p.waitForTimeout(1500);
    await home(p);
    c = await cont(p);
    check(`${tag}: after the lesson, Continue moves to the next one`, c.href === '/ielts/foundation/lesson/ib-2', JSON.stringify(c));
    check(`${tag}: 1 lesson completed is counted on Progress`, (await progress(p)).startsWith('1/'));
  }

  // ---------------------------------------------------------------- end of Start Here → the check (optional)
  await setLessons(['ib-1', 'ib-2', 'ib-3', 'ib-4']);
  await home(p);
  c = await cont(p);
  check(`${tag}: Start Here done → "Check your English level"`, c.kind === 'check' && c.title === T.check && c.href === '/ielts/foundation/diagnostic', JSON.stringify(c));

  // Took the check → "Now let's build the English foundation you need".
  await patchField(`users/${uid}`, 'app.foundation.diagnostic', JSON.parse(JSON.stringify(scoreDiagnostic({}))));
  await home(p);
  c = await cont(p);
  check(`${tag}: after the check → Start English Foundation`, c.kind === 'foundation-start' && c.title === T.foundationTitle && c.href === '/ielts/foundation/lesson/sb-1', JSON.stringify(c));
  await shot(p, `curriculum-foundation-${tag}`);

  // Deep in English Foundation: the path, not module order (articles come before the tenses).
  const ef = ['sb-1', 'sb-2', 'sb-3', 'sb-4', 'sb-5', 'po-1', 'pn-1', 'pn-2', 'pn-3', 'pn-4', 'ppr-1', 'ppr-2', 'ppr-3', 'pvb-1', 'pvb-2', 'pvb-3', 'pvb-4', 'pvb-5', 'sb-6', 'sb-7'];
  await setLessons(['ib-1', 'ib-2', 'ib-3', 'ib-4', ...ef]);
  await home(p);
  c = await cont(p);
  check(`${tag}: after verbs and sentence patterns → Articles`, c.href === '/ielts/foundation/lesson/ar-1', JSON.stringify(c));
  const stat = await progress(p);
  check(`${tag}: Progress counts only completed lessons`, stat.startsWith(lang === 'bn' ? '২৪/' : '24/'), stat);
  const f = (await getDoc(`users/${uid}`)).app.foundation;
  check(`${tag}: no data was changed by viewing`, Object.keys(f.lessons).length === 24);
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.getByTestId('home-continue').waitFor({ timeout: 60_000 });
  check(`${tag}: Home follows the same path`, (await p.getByTestId('home-continue').getAttribute('href')) === '/ielts/foundation/lesson/ar-1');

  // ---------------------------------------------------------------- CARD → PAGE → CARD → PAGE (the acceptance flow)
  await setLessons(['ib-1', 'ib-2', 'ib-3', 'ib-4', 'sb-1', 'sb-2']);
  await hub(p);
  await p.locator('main a[href="/ielts/foundation"]').first().click();
  await p.waitForURL('**/ielts/foundation', { timeout: 30_000 });
  await p.getByTestId('topic-cards').waitFor({ timeout: 60_000 });
  const sb = p.locator('[data-topic="sentence-basics"]');
  const sbText = await sb.innerText();
  check(`${tag}: Foundation — Sentence Basics card shows 2/5 lessons, 40%`, (lang === 'bn' ? /২\/৫/.test(sbText) && /৪০%/.test(sbText) : /2\/5/.test(sbText) && /40%/.test(sbText)), sbText);
  check(`${tag}: topic cards are links, nothing expands (no accordion)`, (await sb.evaluate((e) => e.tagName)) === 'A' && (await p.locator('[aria-expanded]').filter({ has: p.locator('[data-topic]') }).count()) === 0 && (await p.locator('[data-testid^="topic-body-"], [data-testid^="topic-toggle-"]').count()) === 0);
  await sb.getByText(/Sentence Basics/).first().click();
  await p.waitForURL('**/ielts/foundation/sentence-basics', { timeout: 30_000 });
  check(`${tag}: ONE tap on the card title opens the Sentence Basics page`, new URL(p.url()).pathname === '/ielts/foundation/sentence-basics');
  await p.getByTestId('lesson-cards').waitFor({ timeout: 60_000 });
  const cards = await p.locator('[data-lesson-card]').evaluateAll((els) => els.map((e) => `${e.getAttribute('data-lesson-card')}:${e.getAttribute('data-state')}`));
  check(`${tag}: topic page — 5 lesson cards: ✓ ✓ ● then later ones`, cards.join(',') === 'sb-1:done,sb-2:done,sb-3:current,sb-4:locked,sb-5:locked', cards.join(','));
  check(`${tag}: a later lesson says what to finish first`, /Verb|verb/.test(await p.locator('[data-lesson-card="sb-4"]').innerText()), await p.locator('[data-lesson-card="sb-4"]').innerText());
  check(`${tag}: topic progress 2/5`, (lang === 'bn' ? /২\/৫/ : /2\/5/).test(await p.getByTestId('topic-progress').innerText()));
  check(`${tag}: topic page has no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, `topic-page-${tag}`);
  await p.locator('[data-lesson-card="sb-3"]').click();
  await p.waitForURL('**/ielts/foundation/sentence-basics/verb', { timeout: 30_000 });
  await p.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
  check(`${tag}: ONE tap on "Verb" opens the Verb lesson page`, new URL(p.url()).pathname === '/ielts/foundation/sentence-basics/verb');
  check(`${tag}: the lesson page links back to Sentence Basics`, (await p.getByTestId('lesson-back').getAttribute('href')) === '/ielts/foundation/sentence-basics');
  await p.goBack();
  await p.waitForURL('**/ielts/foundation/sentence-basics', { timeout: 30_000 });
  await p.getByTestId('lesson-cards').waitFor({ timeout: 60_000 });
  check(`${tag}: browser/Android back returns to the topic page`, true);
  await p.goBack();
  await p.waitForURL(/\/ielts\/foundation$/, { timeout: 30_000 });
  check(`${tag}: and back again to Foundation`, new URL(p.url()).pathname === '/ielts/foundation');
  // Tapping an empty part of a card (bottom-right corner, the progress area) also navigates.
  await p.getByTestId('topic-cards').waitFor({ timeout: 60_000 });
  const tenses = p.locator('[data-topic="tenses"]');
  const box = (await tenses.boundingBox())!;
  await tenses.click({ position: { x: box.width - 12, y: box.height - 8 } });
  await p.waitForURL('**/ielts/foundation/tenses', { timeout: 30_000 });
  await p.getByTestId('lesson-cards').waitFor({ timeout: 60_000 });
  check(`${tag}: tapping anywhere on a card navigates (Tenses)`, new URL(p.url()).pathname === '/ielts/foundation/tenses');
  check(`${tag}: Tenses page — 15 lesson cards, simple forms before perfect`, (await p.locator('[data-lesson-card]').evaluateAll((els) => els.map((e) => e.getAttribute('data-lesson-card')))).join(',') === 't-1,t-2,t-3,t-4,t-5,t-8,t-6,t-13,t-7,t-14,t-9,t-10,t-11,t-15,t-12');
  check(`${tag}: Tenses page keeps the Final Mastery Challenge`, await p.locator('main a[href="/ielts/foundation/challenge/tenses"]').isVisible());
  await p.locator('[data-lesson-card="t-2"]').click();
  await p.waitForURL('**/ielts/foundation/tenses/present-simple', { timeout: 30_000 });
  await p.getByTestId('lesson-back').click();
  await p.waitForURL('**/ielts/foundation/tenses', { timeout: 30_000 });
  check(`${tag}: the lesson's back link returns to its topic`, new URL(p.url()).pathname === '/ielts/foundation/tenses');
  const po = await p.goto(BASE + '/ielts/foundation/parts-of-speech', { waitUntil: 'load' });
  await p.getByTestId('lesson-cards').waitFor({ timeout: 60_000 });
  check(`${tag}: Parts of Speech page — its lesson, then every unit, lab and final challenge`, Boolean(po?.ok()) && (await p.locator('[data-lesson-card="po-1"]').count()) === 1 && (await p.locator('main a[href="/ielts/foundation/parts-of-speech/noun"]').count()) >= 1);

  // ---------------------------------------------------------------- Foundation page: progress on every card
  await setLessons(['ib-1', 'ib-2', 'ib-3', 'ib-4', ...ef, 'ar-1', 'ar-2', 'ar-3']);
  await p.goto(BASE + '/ielts/foundation', { waitUntil: 'load' });
  await p.getByTestId('topic-cards').waitFor({ timeout: 60_000 });
  const topics = await p.locator('[data-testid="foundation-level1"] [data-topic]').evaluateAll((els) => els.map((e) => e.getAttribute('data-topic')));
  check(`${tag}: 16 topic cards in order, Vocabulary alongside`, topics.join(',') === TOPICS.join(','), topics.join(','));
  check(`${tag}: Level 1 header and topic progress (6 of 16 done)`, (await p.getByTestId('topics-done').innerText()).trim().startsWith(lang === 'bn' ? '৬/১৬' : '6/16'), await p.getByTestId('topics-done').innerText());
  const articles = p.locator('[data-topic="articles"]');
  const artText = await articles.innerText();
  check(`${tag}: progress kept per card — Articles 3/9, 33%`, (lang === 'bn' ? /৩\/৯/.test(artText) && /৩৩%/.test(artText) : /3\/9/.test(artText) && /33%/.test(artText)), artText);
  check(`${tag}: finished cards say so, not-started cards show their size`, (await p.locator('[data-topic="noun"]').getAttribute('data-state')) === 'done' && /Completed|সম্পন্ন/.test(await p.locator('[data-topic="noun"]').innerText()) && !/%/.test(await p.locator('[data-topic="agreement"]').innerText()));
  check(`${tag}: the current card is marked and opens its topic`, (await articles.getAttribute('data-state')) === 'current' && (await articles.getAttribute('href')) === '/ielts/foundation/articles');
  const wide = await p.locator('[data-topic]').evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().right > window.innerWidth + 1).length);
  check(`${tag}: cards fit the screen, no sideways scroll`, wide === 0 && (await noHorizontalScroll(p)));
  const small = await p.locator('[data-topic]').evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().height < 44).length);
  check(`${tag}: cards are comfortable touch targets`, small === 0);
  await shot(p, `topics-${tag}`);
  await articles.click();
  await p.waitForURL('**/ielts/foundation/articles', { timeout: 30_000 });
  await p.getByTestId('lesson-cards').waitFor({ timeout: 60_000 });
  const arts = await p.locator('[data-lesson-card]').evaluateAll((els) => els.map((e) => e.getAttribute('data-state')));
  check(`${tag}: Articles page — ✓ ar-1..3, ● ar-4 next`, arts.slice(0, 4).join(',') === 'done,done,done,current', arts.join(','));
  const f2 = (await getDoc(`users/${uid}`)).app.foundation;
  check(`${tag}: progress untouched by browsing`, Object.keys(f2.lessons).length === 27);
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

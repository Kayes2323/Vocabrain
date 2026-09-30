// IELTS Progress (phase 4): its own page from the IELTS navigation; a new
// student sees zeros and no made-up scores; a real lesson, practice and a
// test section show up in Foundation, the skills, Practice, Mock Tests and
// Recent activity; everything survives a refresh; the plan is connected.
// Bangla on a small Android screen, English on desktop.
//   bash scripts/e2e/run.sh progress
import type { Page } from 'playwright-core';
import { applyMyPlan, generateMyPlan } from '../../lib/engine';
import { getStage, stageLessons } from '../../lib/foundation/curriculum';
import { LIBRARY } from '../../lib/content/reading-library';
import { BOOKS } from '../../lib/ielts/content';
import type { PlanAnswers, UserProfile } from '../../lib/models';
import { BASE, check, getDoc, launch, noHorizontalScroll, patchField, playLesson, putDoc, report, shot, signUp, uidOf, watchErrors, type Lang } from './helpers';

const FOUNDATION_TOTAL = stageLessons(getStage('english-foundation')).length;
const TEST = BOOKS[0].tests[0];
const dayKey = (offset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const attr = (p: Page, id: string, name: string) => p.getByTestId(id).getAttribute(name);
const text = async (p: Page, id: string) => (await p.getByTestId(id).innerText()).trim();

async function open(p: Page) {
  await p.goto(BASE + '/ielts/progress', { waitUntil: 'load' });
  await p.getByTestId('progress-foundation').waitFor({ timeout: 60_000 });
  await p.waitForTimeout(500);
}

async function run(p: Page, lang: Lang, tag: string, realLesson: boolean) {
  const uid = (await uidOf(p))!;
  await p.waitForTimeout(2000);

  // ---------------------------------------------------------------- navigation from the IELTS page
  await p.goto(BASE + '/ielts', { waitUntil: 'load' });
  await p.getByTestId('ielts-hub').waitFor({ timeout: 60_000 });
  check(`${tag}: the IELTS page has no progress dashboard, only the Progress entry`, (await p.getByTestId('progress-overall').count()) === 0 && (await p.getByTestId('learning-stats').count()) === 0 && (await p.locator('main a[href="/ielts/progress"]').count()) === 1);
  await p.locator('main a[href="/ielts/progress"]').click();
  await p.waitForURL('**/ielts/progress', { timeout: 30_000 });
  await p.getByTestId('progress-foundation').waitFor({ timeout: 60_000 });
  check(`${tag}: Progress opens as its own page from the IELTS page`, (await p.getByTestId('ielts-progress').count()) === 1);

  // ---------------------------------------------------------------- a new student: zeros, no invented scores
  check(`${tag}: new student — explains how progress starts`, (await p.getByTestId('progress-empty').count()) === 1);
  check(`${tag}: Foundation 0 of ${FOUNDATION_TOTAL}`, (await attr(p, 'foundation-lessons', 'data-done')) === '0' && (await attr(p, 'foundation-lessons', 'data-total')) === String(FOUNDATION_TOTAL));
  check(`${tag}: no skill shows a score`, (await p.locator('[data-testid^="skill-noscore-"]').count()) === 4 && (await p.locator('[data-testid^="skill-latest-"]').count()) === 0);
  check(`${tag}: no mock result, no band anywhere`, (await p.getByTestId('mock-latest').count()) === 0 && !/Band \d/.test(await p.locator('main').innerText()));
  check(`${tag}: no plan → a way to create one`, (await p.getByTestId('progress-plan').locator('a[href="/ielts/plan"]').count()) === 1);
  check(`${tag}: no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, `progress-empty-${lang}`);

  // ---------------------------------------------------------------- lesson completion
  let lessons = 0;
  if (realLesson) {
    await p.goto(`${BASE}/ielts/foundation/lesson/sb-1`, { waitUntil: 'load' });
    await p.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
    await playLesson(p, lang);
    for (let i = 0; i < 40 && !(await getDoc(`users/${uid}`)).app.foundation?.lessons?.['sb-1']; i++) await p.waitForTimeout(250);
    lessons = 1;
  } else {
    const now = new Date().toISOString();
    await patchField(`users/${uid}`, 'app.foundation.lessons', Object.fromEntries(['sb-1', 'sb-2', 'ls-1'].map((id) => [id, { completedAt: now, score: 90, best: 90, attempts: 1 }])));
    lessons = 2;
  }
  await open(p);
  check(`${tag}: a completed lesson is counted in Foundation`, (await attr(p, 'foundation-lessons', 'data-done')) === String(lessons));
  check(`${tag}: the empty note is gone`, (await p.getByTestId('progress-empty').count()) === 0);
  check(`${tag}: the lesson is in Recent activity`, (await p.locator('[data-history="lesson"]').count()) === (realLesson ? 1 : 3));
  if (!realLesson) check(`${tag}: a Listening lesson counts for Listening`, (await attr(p, 'skill-lessons-listening', 'data-done')) === '1');

  // ---------------------------------------------------------------- practice: a Reading Library passage, a vocabulary recall day
  const passage = LIBRARY[0];
  const today = dayKey();
  await patchField(`users/${uid}`, 'app.study.readingLibrary', { [passage.id]: { answers: {}, checked: true, score: { correct: 9, total: 13 }, updatedAt: new Date().toISOString() } });
  await patchField(`users/${uid}`, 'app.study.days', { [today]: { mode: 'normal', done: ['reading', 'vocabulary'] } });
  await patchField(`users/${uid}`, 'app.study.completedTasks', { reading: 1, vocabulary: 1 });
  // ---------------------------------------------------------------- a submitted test section with its result
  const at = new Date().toISOString();
  await putDoc(`users/${uid}/testSessions/${TEST.id}-listening-e2e`, {
    id: `${TEST.id}-listening-e2e`, testId: TEST.id, bookId: TEST.bookId, skill: 'listening', status: 'submitted', startedAt: at, updatedAt: at, submittedAt: at,
    timeLimitSeconds: 1800, elapsedSeconds: 1500, answers: { q1: 'x' }, flagged: [], currentNumber: 40,
    result: { skill: 'listening', correct: 30, total: 40, estimatedBand: 7, byPart: [], byType: [], questions: [] },
  });
  await putDoc(`users/${uid}/testSessions/${TEST.id}-reading-draft`, {
    id: `${TEST.id}-reading-draft`, testId: TEST.id, bookId: TEST.bookId, skill: 'reading', status: 'in-progress', startedAt: at, updatedAt: at,
    timeLimitSeconds: 3600, elapsedSeconds: 60, answers: {}, flagged: [], currentNumber: 1,
  });
  await open(p);
  check(`${tag}: Reading shows the checked passage and its score`, (await text(p, 'skill-passages-reading')).includes(lang === 'bn' ? '১/' : '1/') && /9\/13|৯\/১৩/.test(await text(p, 'skill-latest-reading')));
  check(`${tag}: Practice counts the passage and the recall day`, /^(1|১)/.test(await text(p, 'practice-reading')) && /^(1|১)/.test(await text(p, 'practice-vocabulary')));
  check(`${tag}: Listening shows the submitted section with its real result`, /(1|১)$/.test(await text(p, 'skill-sections-listening')) && /30\/40|৩০\/৪০/.test(await text(p, 'skill-latest-listening')) && (await text(p, 'skill-latest-listening')).includes('7.0'));
  check(`${tag}: an unfinished section is not counted`, /^(1|১)\s/.test(await text(p, 'mock-sections')) && /(0|০)$/.test(await text(p, 'skill-sections-reading')));
  check(`${tag}: Mock Tests: latest and best recorded`, (await text(p, 'mock-latest')).includes('7.0') && (await p.getByTestId('mock-best-listening').count()) === 1);
  check(`${tag}: no trend from a single section`, (await p.getByTestId('mock-trend').count()) === 0);
  check(`${tag}: Recent activity lists the test and the passage`, (await p.locator('[data-history="test"]').count()) === 1 && (await p.locator('[data-history="passage"]').count()) === 1);
  check(`${tag}: Writing and Speaking still have no score`, (await p.getByTestId('skill-noscore-writing').count()) === 1 && (await p.getByTestId('skill-noscore-speaking').count()) === 1);

  // A second, better section → a trend, no prediction.
  const later = new Date(Date.now() + 60_000).toISOString();
  await putDoc(`users/${uid}/testSessions/${TEST.id}-listening-e2e2`, {
    id: `${TEST.id}-listening-e2e2`, testId: TEST.id, bookId: TEST.bookId, skill: 'listening', status: 'submitted', startedAt: later, updatedAt: later, submittedAt: later,
    timeLimitSeconds: 1800, elapsedSeconds: 1500, answers: { q1: 'x' }, flagged: [], currentNumber: 40,
    result: { skill: 'listening', correct: 34, total: 40, estimatedBand: 8, byPart: [], byType: [], questions: [] },
  });
  await open(p);
  check(`${tag}: trend shows the change between sections`, (await attr(p, 'mock-trend', 'data-direction')) === 'up');
  check(`${tag}: best recorded is the better section`, (await text(p, 'mock-best-listening')).includes('8.0'));
  check(`${tag}: Listening average of 2`, (await p.getByTestId('skill-average-listening').count()) === 1);

  // ---------------------------------------------------------------- refresh
  const before = await p.locator('main').innerText();
  await p.reload({ waitUntil: 'load' });
  await p.getByTestId('progress-foundation').waitFor({ timeout: 60_000 });
  await p.getByTestId('mock-trend').waitFor({ timeout: 30_000 });
  check(`${tag}: a refresh shows the same progress`, (await p.locator('main').innerText()) === before);

  // ---------------------------------------------------------------- plan connection
  const app = (await getDoc(`users/${uid}`)).app as UserProfile;
  const answers: PlanAnswers = { targetDate: dayKey(100), targetBand: 7, currentLevel: 'intermediate', dailyStudyMinutes: 60, studyDaysPerWeek: 7, weakSkills: ['listening'], studyPreference: 'mixed' };
  await patchField(`users/${uid}`, 'app.ielts', applyMyPlan(app, generateMyPlan(answers)).ielts);
  await open(p);
  await p.getByTestId('progress-plan-today').waitFor({ timeout: 30_000 });
  const done = Number(await attr(p, 'progress-plan-today', 'data-done'));
  const total = Number(await attr(p, 'progress-plan-today', 'data-total'));
  check(`${tag}: Today's plan shows tasks done / total`, total > 0 && done >= 0 && done <= total, `${done}/${total}`);
  check(`${tag}: plan completion and target shown`, (await p.getByTestId('progress-plan-completion').count()) === 1 && (await text(p, 'progress-plan-target')).includes('7.0'));
  check(`${tag}: no sideways scroll with data`, await noHorizontalScroll(p));
  await shot(p, `progress-full-${lang}`);
  await p.getByTestId('progress-plan-open').click();
  await p.waitForURL(`**/ielts/plan/day/${today}`, { timeout: 30_000 });
  check(`${tag}: the plan card opens today's plan`, p.url().endsWith(`/ielts/plan/day/${today}`));

  // ---------------------------------------------------------------- viewing never writes
  const f = (await getDoc(`users/${uid}`)).app;
  check(`${tag}: viewing Progress changed nothing`, Object.keys(f.foundation.lessons).length === (realLesson ? 1 : 3) && f.study.completedTasks.reading === 1);
}

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  try {
    const mob = await (await browser.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })).newPage();
    watchErrors(mob, 'bn-mobile', errors);
    await signUp(mob, 'Rafi', `progress-bn-${stamp}@test.dev`, 'bn');
    console.log('\n[PROGRESS] Bangla · small Android');
    await run(mob, 'bn', 'bn mobile', false);

    const desk = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
    watchErrors(desk, 'en-desktop', errors);
    await signUp(desk, 'Nadia', `progress-en-${stamp}@test.dev`, 'en');
    console.log('\n[PROGRESS] English · desktop');
    await run(desk, 'en', 'en desktop', true);

    const out = await (await browser.newContext()).newPage();
    await out.goto(BASE + '/ielts/progress', { waitUntil: 'load' });
    await out.getByText('Welcome to Mino').waitFor({ timeout: 90_000 });
    check('signed out: Progress asks to sign in', (await out.getByTestId('ielts-progress').count()) === 0);
  } catch (e) {
    check('EXCEPTION ' + (e as Error).message.split('\n')[0], false, (e as Error).stack);
  } finally {
    check('no page errors', errors.length === 0, errors.join(' | '));
    await browser.close();
  }
  process.exit(report());
}
main();

/** Study plan engine checks. Run: pnpm test:plan */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildStudyPlan } from '../lib/engine/study-plan';
import { buildDailyPlan, dailyPlanState, markActivityDone } from '../lib/engine/daily-plan';
import { completeLesson, PARALLEL_LESSONS, PATH_LESSONS } from '../lib/foundation';
import { HOME_QUICK_ACCESS, IELTS_SECTIONS, PRIMARY_NAV } from '../lib/navigation';
import { getTranslator } from '../lib/i18n';
import { emptyProfile, type UserProfile } from '../lib/models';

const tr = getTranslator('en').t;
const text = (m: { key: string; vars?: Record<string, string | number> }) => tr(m.key, m.vars);

let passed = 0;
const test = (name: string, fn: () => void) => {
  try {
    fn();
    passed++;
    console.log(`PASS ${name}`);
  } catch (e) {
    console.log(`FAIL ${name}\n  ${(e as Error).message}`);
    process.exitCode = 1;
  }
};

const NOW = new Date('2026-09-26T09:00:00'); // Saturday
const profile = (patch: Partial<UserProfile['ielts']> = {}): UserProfile => {
  const p = emptyProfile('u1');
  p.ielts = { ...p.ielts, targetBand: 7, currentBands: { listening: 6.5, reading: 6.5, writing: 5.5, speaking: 6 }, weeklyStudyHours: 7, ...patch };
  return p;
};

test('7-day plan: one rest day, minutes add up every study day', () => {
  const plan = buildStudyPlan(profile(), 7, {}, NOW);
  assert.equal(plan.days.length, 7);
  assert.equal(plan.days.filter((d) => d.rest).length, 1);
  assert.equal(plan.minutesPerDay, 70);
  for (const d of plan.days.filter((x) => !x.rest)) assert.equal(d.blocks.reduce((n, b) => n + b.minutes, 0), 70, d.date);
  assert.equal(plan.startDate, '2026-09-26');
});

test('biggest gap to target gets the most time; weak test area adds more', () => {
  const plan = buildStudyPlan(profile(), 30, {}, NOW);
  assert.equal(plan.focus.filter((f) => f.kind !== 'vocabulary')[0].kind, 'writing');
  const boosted = buildStudyPlan(profile({ currentBands: { listening: 6, reading: 6, writing: 6, speaking: 6 } }), 30, {
    weakAreas: [{ skill: 'reading', label: 'Matching Headings', accuracy: 40 }],
  }, NOW);
  assert.equal(boosted.focus.filter((f) => f.kind !== 'vocabulary')[0].kind, 'reading');
  assert.match(boosted.focus.find((f) => f.kind === 'reading')!.reason.map(text).join(' '), /Matching Headings is your weakest area \(40% correct\)/);
  assert.ok(boosted.days.some((d) => d.blocks.some((b) => text(b.title).includes('Matching Headings strategy'))));
});

test('every skill appears within a week; practice tests come after the foundation', () => {
  const plan = buildStudyPlan(profile(), 30, {}, NOW);
  for (const k of ['listening', 'reading', 'writing', 'speaking', 'vocabulary'] as const) {
    assert.ok(plan.days.slice(0, 7).some((d) => d.blocks.some((b) => b.kind === k)), k);
  }
  const firstTest = plan.days.find((d) => d.blocks.some((b) => b.kind === 'test'))!;
  const foundation = plan.phases.find((p) => p.id === 'foundation')!;
  assert.ok(firstTest.day > foundation.toDay);
});

test('plan never runs past the test date', () => {
  const plan = buildStudyPlan(profile({ testDate: '2026-10-06' }), 30, {}, NOW);
  assert.equal(plan.horizonDays, 10);
  assert.equal(plan.testDate, '2026-10-06');
  assert.equal(buildStudyPlan(profile({ testDate: '2026-12-20' }), 'test', {}, NOW).horizonDays, 85);
});

test('only real app links; Listening says it is not in the app yet', () => {
  const plan = buildStudyPlan(profile(), 90, {}, NOW);
  const base = join(__dirname, '..', 'app', '(app)');
  const hrefs = new Set(plan.days.flatMap((d) => d.blocks.map((b) => b.href)).filter(Boolean) as string[]);
  for (const h of hrefs) assert.ok(existsSync(join(base, h, 'page.tsx')), h);
  const listening = plan.days.flatMap((d) => d.blocks).find((b) => b.kind === 'listening')!;
  assert.equal(listening.href, undefined);
  assert.match(text(listening.title), /coming/);
});

test('missing data becomes stated assumptions, not guesses', () => {
  const p = emptyProfile('u2');
  const plan = buildStudyPlan(p, 14, {}, NOW);
  assert.equal(plan.minutesPerDay, 60);
  const assume = plan.assumptions.map(text).join(' | ');
  assert.match(assume, /Study time not set/);
  assert.match(assume, /No target band/);
  assert.match(assume, /No practice tests yet/);
  assert.ok(plan.focus.every((f) => f.kind === 'vocabulary' || /No data yet/.test(f.reason.map(text).join(' '))));
  assert.ok(![...plan.assumptions, ...plan.focus.flatMap((f) => f.reason)].some((m) => text(m) === m.key), 'all keys exist');
  assert.equal(JSON.stringify(plan).match(/guarantee/i), null);
});

// ---------------------------------------------------------------- Home: today's learning CTA
test('home CTA state comes from today’s plan (no separate progress store): start → continue → finish → completed', () => {
  const brain = { total: 5, due: 3 }; // 5 tasks: lesson, vocabulary, reading, writing, speaking
  let p = emptyProfile('u1');
  const state = () => dailyPlanState(buildDailyPlan(p, brain, NOW), p);
  assert.equal(state(), 'not-started', 'new student');
  p = markActivityDone(p, 'reading', NOW);
  assert.equal(state(), 'in-progress', 'started, several tasks open');
  p = markActivityDone(markActivityDone(p, 'vocabulary', NOW), 'writing', NOW);
  p = { ...p, foundation: completeLesson(p.foundation, 'ib-1', 90, NOW) };
  assert.equal(state(), 'finishing', 'only the last task of the daily goal is open');
  p = markActivityDone(p, 'speaking', NOW);
  assert.equal(state(), 'completed');
  // Yesterday's work doesn't count as having started today.
  assert.equal(dailyPlanState(buildDailyPlan(p, brain, new Date('2026-09-27T09:00:00')), p), 'not-started');
  // A task the plan marks done by itself (nothing due to review) is not "starting".
  const q = emptyProfile('u2');
  assert.equal(dailyPlanState(buildDailyPlan(q, { total: 5, due: 0 }, NOW), q), 'not-started');
});

test('Today’s Learning starts with the next lesson of the current curriculum stage', () => {
  const brain = { total: 5, due: 3 };
  let p = emptyProfile('u1');
  let plan = buildDailyPlan(p, brain, NOW);
  assert.deepEqual(plan.tasks.map((x) => x.kind), ['lesson', 'vocabulary', 'reading', 'writing', 'speaking']);
  assert.equal(plan.tasks[0].lessonId, 'ib-1', 'a new student starts with Start Here');
  assert.equal(plan.tasks[0].href, '/ielts/foundation/lesson/ib-1');
  assert.equal(plan.tasks[0].done, false);
  p = { ...p, foundation: completeLesson(p.foundation, 'ib-1', 90, NOW) };
  plan = buildDailyPlan(p, brain, NOW);
  assert.equal(plan.tasks[0].done, true, 'one lesson a day completes the task');
  assert.equal(plan.tasks[0].lessonId, 'ib-2', 'and it points to the next lesson for tomorrow');
  assert.equal(tr(plan.tasks[0].detailKey, plan.tasks[0].detailVars), 'Lesson done today — well done');
  assert.equal(buildDailyPlan(p, brain, new Date('2026-09-27T09:00:00')).tasks[0].done, false, 'a new day, a new lesson');
  // Short days keep the lesson; with every lesson done, the plan is practice only.
  const minimum = { ...p, study: { ...p.study, days: { '2026-09-27': { mode: 'minimum' as const, done: [] } } } };
  assert.deepEqual(buildDailyPlan(minimum, brain, new Date('2026-09-27T09:00:00')).tasks.map((x) => x.kind), ['lesson', 'vocabulary', 'speaking']);
  const all = [...PATH_LESSONS, ...PARALLEL_LESSONS].reduce((fp, id) => completeLesson(fp, id, 90, NOW), p.foundation);
  const finished = { ...p, foundation: { ...all, days: {} } };
  assert.deepEqual(buildDailyPlan(finished, brain, new Date('2026-09-27T09:00:00')).tasks.map((x) => x.kind), ['vocabulary', 'reading', 'writing', 'speaking']);
});

test('home CTA texts: Bangla and English, no "Continue learning" on the home card', () => {
  const bn = getTranslator('bn').t;
  assert.deepEqual(['todayStart', 'todayContinue', 'todayFinish', 'todayCompleted'].map((k) => bn(`home.${k}`)), ['আজকের পড়া শুরু করুন', 'আজকের পড়া চালিয়ে যান', 'আজকের পড়া শেষ করুন', 'আজকের পড়া সম্পন্ন হয়েছে']);
  assert.deepEqual(['todayStart', 'todayContinue', 'todayFinish', 'todayCompleted'].map((k) => tr(`home.${k}`)), ['Start today’s learning', 'Continue today’s learning', 'Finish today’s learning', 'Today’s learning completed']);
  const card = readFileSync(join(process.cwd(), 'components/home/TodayCard.tsx'), 'utf8');
  assert.doesNotMatch(card, /continuePlan|startPlan|allDone|continueTitle/);
});

test('home Quick access: one hub with exactly 5 destinations, all existing pages; Mino stands out in the nav', () => {
  assert.deepEqual(HOME_QUICK_ACCESS.map((q) => q.id), ['today', 'foundation', 'brain', 'readingVocab', 'abroad']);
  const ielts = new Set(IELTS_SECTIONS.map((x) => x.href));
  assert.ok(ielts.has(HOME_QUICK_ACCESS.find((q) => q.id === 'foundation')!.href), 'foundation opens its IELTS page');
  assert.equal(HOME_QUICK_ACCESS.find((q) => q.id === 'brain')!.href, '/ielts/vocabulary/notebook');
  assert.equal(HOME_QUICK_ACCESS.find((q) => q.id === 'readingVocab')!.href, '/ielts/vocabulary/reading');
  for (const page of ['app/(app)/ielts/vocabulary/notebook/page.tsx', 'app/(app)/ielts/vocabulary/reading/page.tsx']) assert.ok(existsSync(join(process.cwd(), page)), page);
  // Practice Test and Speaking Test left Home but stay in the IELTS section.
  assert.ok(ielts.has('/ielts/tests') && ielts.has('/ielts/tests/vb-practice-1/speaking'), 'tests and speaking are still reachable from IELTS');
  assert.equal(HOME_QUICK_ACCESS.find((q) => q.id === 'today')!.href, '/today');
  assert.equal(HOME_QUICK_ACCESS.find((q) => q.id === 'abroad')!.href, '/abroad');
  for (const q of HOME_QUICK_ACCESS) assert.ok(tr(`home.quick.${q.id}.title`) !== `home.quick.${q.id}.title` && getTranslator('bn').t(`home.quick.${q.id}.title`) !== `home.quick.${q.id}.title`, q.id);
  assert.equal(new Set(HOME_QUICK_ACCESS.map((q) => q.tint)).size, 5, 'each shortcut has its own accent');
  assert.equal(new Set(PRIMARY_NAV.map((n) => n.tint)).size, 5, 'each nav tab has its own active color');
  assert.deepEqual(PRIMARY_NAV.filter((n) => n.featured).map((n) => n.href), ['/mino']);
  const nav = readFileSync(join(process.cwd(), 'components/shell/BottomNav.tsx'), 'utf8');
  assert.match(nav, /<MinoMark size="md" alive \/>/, 'Mino in the nav is larger and always alive (blinks)');
  const home = readFileSync(join(process.cwd(), 'app/(app)/page.tsx'), 'utf8');
  assert.doesNotMatch(home, /TodayCard/, "today's learning lives inside Quick access, not as its own section on Home");
});

console.log(`\n${passed} passed`);

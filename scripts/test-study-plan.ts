/** Study plan engine checks. Run: pnpm test:plan */
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { buildStudyPlan } from '../lib/engine/study-plan';
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

console.log(`\n${passed} passed`);

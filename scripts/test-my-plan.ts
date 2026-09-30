// Unit tests: My IELTS Plan — validation, rule-based generation, save/edit.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  applyMyPlan, changedFields, generateMyPlan, isCompletePlan, phaseStatus, planAnswers, sessionPattern, skillShare, suggestedAnswers, validatePlanAnswers,
} from '../lib/engine';
import { en } from '../lib/i18n/locales/en';
import { bn } from '../lib/i18n/locales/bn';
import { emptyProfile, type PlanAnswers } from '../lib/models';

let passed = 0;
const test = (name: string, fn: () => void) => {
  try {
    fn();
    passed++;
    console.log('PASS', name);
  } catch (e) {
    console.error('FAIL', name);
    throw e;
  }
};

const NOW = new Date('2026-10-01T10:00:00');
const base: PlanAnswers = {
  targetDate: '2027-03-15',
  targetBand: 7.5,
  currentLevel: 'intermediate',
  dailyStudyMinutes: 120,
  studyDaysPerWeek: 6,
  weakSkills: ['writing', 'reading'],
  studyPreference: 'mixed',
};
const days = (a: string, b: string) => Math.round((new Date(`${b}T00:00`).getTime() - new Date(`${a}T00:00`).getTime()) / 86_400_000);

test('validation: dates, bands, choices — nothing incomplete can be saved', () => {
  assert.deepEqual(validatePlanAnswers(base, NOW), {});
  assert.equal(validatePlanAnswers({ ...base, targetDate: '2026-09-30' }, NOW).targetDate, 'datePast');
  assert.equal(validatePlanAnswers({ ...base, targetDate: '2026-10-01' }, NOW).targetDate, 'datePast', 'today is too late to plan for');
  assert.equal(validatePlanAnswers({ ...base, targetDate: '2026-10-02' }, NOW).targetDate, undefined, 'tomorrow is fine');
  assert.equal(validatePlanAnswers({ ...base, targetDate: '2029-01-01' }, NOW).targetDate, 'dateFar');
  assert.equal(validatePlanAnswers({ ...base, targetDate: 'not-a-date' }, NOW).targetDate, 'dateMissing');
  assert.equal(validatePlanAnswers({ ...base, targetBand: 7.25 }, NOW).targetBand, 'band');
  assert.equal(validatePlanAnswers({ ...base, dailyStudyMinutes: 45 }, NOW).dailyStudyMinutes, 'minutes');
  assert.equal(validatePlanAnswers({ ...base, studyDaysPerWeek: 2 }, NOW).studyDaysPerWeek, 'days');
  const { studyPreference: _, ...partial } = base;
  assert.equal(isCompletePlan(partial, NOW), false);
  assert.equal(isCompletePlan(base, NOW), true);
});

test('generation: phases in order, back to back, from today to the day before the test', () => {
  const plan = generateMyPlan(base, NOW);
  assert.deepEqual(plan.phases.map((p) => p.id), ['foundation', 'skill-building', 'practice', 'mock-tests', 'final-review']);
  assert.equal(plan.phases[0].startDate, '2026-10-01');
  assert.equal(plan.phases.at(-1)!.endDate, '2027-03-14');
  for (let i = 1; i < plan.phases.length; i++) assert.equal(days(plan.phases[i - 1].endDate, plan.phases[i].startDate), 1, 'no gaps, no overlaps');
  assert.equal(plan.phases.reduce((s, p) => s + p.days, 0), plan.totals.days);
  assert.equal(plan.totals.days, days('2026-10-01', '2027-03-15'));
  assert.equal(plan.totals.studyDays, plan.phases.reduce((s, p) => s + p.studyDays, 0));
  assert.equal(plan.totals.hours, Math.round((plan.totals.studyDays * 120) / 60));
  assert.ok(Math.abs(plan.totals.studyDays - (plan.totals.days * 6) / 7) <= plan.phases.length, 'study days follow days per week');
  assert.equal(plan.status, 'active');
  assert.equal(plan.revisions, 0);
});

test('generation: level and time left shape the plan', () => {
  const beginner = generateMyPlan({ ...base, currentLevel: 'beginner' }, NOW);
  const advanced = generateMyPlan({ ...base, currentLevel: 'advanced' }, NOW);
  const foundationDays = (p: typeof beginner) => p.phases.find((x) => x.id === 'foundation')?.days ?? 0;
  assert.ok(foundationDays(beginner) > foundationDays(generateMyPlan(base, NOW)), 'a beginner gets more Foundation');
  assert.equal(foundationDays(advanced), 0, 'an advanced student skips Foundation');
  const soon = generateMyPlan({ ...base, targetDate: '2026-10-20' }, NOW);
  assert.ok(soon.notes.includes('short'));
  assert.equal(foundationDays(soon), 0, 'little time: no Foundation phase for an intermediate student');
  const soonMock = soon.phases.find((p) => p.id === 'mock-tests')!.days / soon.totals.days;
  const longMock = generateMyPlan(base, NOW).phases.find((p) => p.id === 'mock-tests')!.days / generateMyPlan(base, NOW).totals.days;
  assert.ok(soonMock > longMock, 'a close test date means relatively more mock tests');
  const tiny = generateMyPlan({ ...base, targetDate: '2026-10-05', dailyStudyMinutes: 30 }, NOW);
  assert.ok(tiny.phases.length >= 1 && tiny.phases.every((p) => p.days > 0));
  assert.ok(tiny.notes.includes('fewHours'));
  assert.ok(generateMyPlan({ ...base, currentLevel: 'beginner', targetBand: 8, targetDate: '2027-01-01' }, NOW).notes.includes('bigGap'));
});

test('skill time follows the weak skills; sessions follow the preference', () => {
  const s = skillShare(['writing', 'reading']);
  assert.equal(Object.values(s).reduce((a, b) => a + b, 0), 100);
  assert.ok(s.writing > s.listening && s.reading > s.speaking);
  assert.deepEqual(skillShare([]), { listening: 25, reading: 25, writing: 25, speaking: 25 }, 'all about the same');
  assert.deepEqual(sessionPattern(120, 'short'), { sessionMinutes: 30, sessionsPerDay: 4 });
  assert.deepEqual(sessionPattern(120, 'long'), { sessionMinutes: 120, sessionsPerDay: 1 });
  assert.deepEqual(sessionPattern(30, 'mixed'), { sessionMinutes: 30, sessionsPerDay: 1 });
});

test('phase status by date', () => {
  const plan = generateMyPlan(base, NOW);
  assert.equal(phaseStatus(plan.phases[0], NOW), 'current');
  assert.equal(phaseStatus(plan.phases[1], NOW), 'upcoming');
  assert.equal(phaseStatus(plan.phases[0], new Date('2027-03-01T10:00:00')), 'done');
});

test('save: one plan on the profile, shared facts kept in step, nothing else touched', () => {
  const p = emptyProfile('u');
  p.foundation.lessons['sb-1'] = { completedAt: 'x', score: 90, best: 90, attempts: 1 };
  p.study.completedTasks.reading = 4;
  const saved = applyMyPlan(p, generateMyPlan(base, NOW));
  assert.equal(saved.ielts.plan!.targetBand, 7.5);
  assert.equal(saved.ielts.targetBand, 7.5);
  assert.equal(saved.ielts.testDate, '2027-03-15');
  assert.equal(saved.ielts.testDateUnknown, false);
  assert.equal(saved.ielts.weeklyStudyHours, 12);
  assert.equal(saved.ielts.studyDays!.length, 6);
  assert.deepEqual(saved.foundation.lessons, p.foundation.lessons, 'lesson progress untouched');
  assert.equal(saved.study.completedTasks.reading, 4, 'practice history untouched');
  // Saving again replaces the plan (never a second one).
  const again = applyMyPlan(saved, generateMyPlan({ ...base, targetBand: 7 }, NOW, saved.ielts.plan));
  assert.equal(again.ielts.plan!.targetBand, 7);
  assert.equal(Object.keys(again.ielts).filter((k) => k === 'plan').length, 1);
});

test('edit: changes listed, plan rebuilt from today, first-save date and history kept', () => {
  const first = generateMyPlan(base, NOW);
  const later = new Date('2026-11-15T09:00:00');
  const next = { ...planAnswers(first), dailyStudyMinutes: 60, weakSkills: ['speaking' as const] };
  assert.deepEqual(changedFields(planAnswers(first), next), ['dailyStudyMinutes', 'weakSkills']);
  assert.deepEqual(changedFields(planAnswers(first), { ...planAnswers(first), weakSkills: ['reading', 'writing'] }), [], 'order of skills does not count as a change');
  const edited = generateMyPlan(next, later, first);
  assert.equal(edited.createdAt, first.createdAt);
  assert.equal(edited.revisions, 1);
  assert.equal(edited.phases[0].startDate, '2026-11-15', 'future planning starts from the day of the change');
  assert.ok(edited.skillShare.speaking > edited.skillShare.reading);
});

test('setup starts from what the student already told the app', () => {
  const p = emptyProfile('u');
  p.ielts = { ...p.ielts, targetBand: 6.5, testDate: '2027-02-01', weeklyStudyHours: 5, studyDays: [0, 1, 2, 3, 4] };
  p.foundation.diagnostic = { level: 'developing' } as never;
  const s = suggestedAnswers(p, NOW);
  assert.deepEqual([s.targetBand, s.targetDate, s.studyDaysPerWeek, s.dailyStudyMinutes, s.currentLevel], [6.5, '2027-02-01', 5, 60, 'intermediate']);
  p.ielts.testDate = '2026-01-01';
  assert.equal(suggestedAnswers(p, NOW).targetDate, undefined, 'a past test date is not suggested');
});

test('text: English and Bangla, respectful Bangla, no promises', () => {
  const en_ = (en as unknown as Record<string, unknown>).myPlan;
  const bn_ = (bn as unknown as Record<string, unknown>).myPlan;
  const keys = (o: unknown, pre = ''): string[] => Object.entries(o as object).flatMap(([k, v]) => (typeof v === 'object' ? keys(v, `${pre}${k}.`) : [`${pre}${k}`]));
  assert.deepEqual(keys(bn_).sort(), keys(en_).sort(), 'same keys in both languages');
  const text = JSON.stringify(bn_);
  assert.doesNotMatch(text, /তুমি|তোমার|তোমাকে|তুই|তোর|করো\b|দেখো\b|পারবে\b/);
  assert.doesNotMatch(JSON.stringify(en_), /guarantee(d|s)? (a|your) band|you will (get|score)/i);
  const src = readFileSync('components/plan/PlanSetupFlow.tsx', 'utf8') + readFileSync('components/plan/MyPlanHome.tsx', 'utf8');
  assert.doesNotMatch(src, /country|university|visa|passport|phone/i, 'only IELTS preparation questions');
});

console.log(`\n${passed} passed`);

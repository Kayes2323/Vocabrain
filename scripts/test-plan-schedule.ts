// Unit tests: My IELTS Plan daily schedule — days, tasks, time, variety,
// status from real activity, skip, and editing without losing history.
import assert from 'node:assert/strict';
import {
  addDays, applyMyPlan, dayTasks, generateMyPlan, isStudyDay, planDates, planDay, planProgress, rebasePlan, scheduleTo, sectionsByDate, setDaySkipped, skillRotation,
  taskHref, type ActivityContext,
} from '../lib/engine';
import { emptyProfile, type PlanAnswers, type UserProfile } from '../lib/models';

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

const NOW = new Date('2026-10-01T10:00:00'); // a Thursday
const TODAY = '2026-10-01';
const answers: PlanAnswers = {
  targetDate: '2027-03-15',
  targetBand: 7.5,
  currentLevel: 'intermediate',
  dailyStudyMinutes: 120,
  studyDaysPerWeek: 6,
  weakSkills: ['writing', 'reading'],
  studyPreference: 'mixed',
};
const withPlan = (a: PlanAnswers = answers, now = NOW): UserProfile => applyMyPlan(emptyProfile('u'), generateMyPlan(a, now));
const ctx = (profile: UserProfile, over: Partial<ActivityContext> = {}): ActivityContext => ({ profile, sections: {}, today: TODAY, ...over });
const studyDaysFrom = (plan: NonNullable<UserProfile['ielts']['plan']>, from: string, n: number) => {
  const out: string[] = [];
  for (let d = from; out.length < n && d <= scheduleTo(plan); d = addDays(d, 1)) if (isStudyDay(plan, d)) out.push(d);
  return out;
};

test('schedule runs from today to the day before the test; rest day each week; the test day is marked', () => {
  const plan = withPlan().ielts.plan!;
  const dates = planDates(plan);
  assert.equal(dates[0], TODAY);
  assert.equal(dates.at(-1), '2027-03-15');
  const week = Array.from({ length: 7 }, (_, i) => addDays(TODAY, i));
  assert.equal(week.filter((d) => isStudyDay(plan, d)).length, 6, '6 study days a week');
  assert.equal(new Date(`${week.find((d) => !isStudyDay(plan, d))}T00:00`).getDay(), 5, 'Friday is the rest day');
  assert.equal(planDay(plan, '2027-03-15', ctx(withPlan())).state, 'test');
  assert.deepEqual(dayTasks(plan, '2027-03-15'), [], 'no study on the test day');
});

test('each study day fits the daily time, with realistic task lengths', () => {
  for (const minutes of [30, 60, 120, 240]) {
    const plan = withPlan({ ...answers, dailyStudyMinutes: minutes }).ielts.plan!;
    for (const d of studyDaysFrom(plan, TODAY, 200)) {
      const tasks = dayTasks(plan, d);
      const total = tasks.reduce((s, t) => s + t.minutes, 0);
      if (tasks[0]?.kind === 'light-review') assert.ok(total <= 30);
      else assert.equal(total, minutes, `${minutes} min/day on ${d}`);
      assert.ok(tasks.every((t) => t.minutes >= 5), 'no tiny tasks');
      if (minutes >= 60) assert.ok(tasks.every((t) => t.minutes >= 10), `${d}: tasks of at least 10 min`);
    }
  }
});

test('days vary; weak skills come up more often; phases change the kind of work', () => {
  const plan = withPlan().ielts.plan!;
  const days = studyDaysFrom(plan, TODAY, 14).map((d) => dayTasks(plan, d).map((t) => t.kind).join('+'));
  assert.ok(new Set(days).size >= 3, `not every day the same: ${[...new Set(days)].join(' | ')}`);
  const rot = skillRotation(plan.skillShare);
  const count = (s: string) => rot.filter((x) => x === s).length;
  assert.ok(count('writing') > count('listening') && count('reading') > count('speaking'), rot.join(','));
  const kindsIn = (phase: string) => {
    const p = plan.phases.find((x) => x.id === phase)!;
    return new Set(studyDaysFrom(plan, p.startDate, 12).flatMap((d) => dayTasks(plan, d).map((t) => t.kind)));
  };
  assert.ok(kindsIn('foundation').has('foundation'), 'Foundation phase: Foundation lessons');
  assert.ok(kindsIn('mock-tests').has('mock'), 'Mock Tests phase: mock tests');
  const last = studyDaysFrom(plan, addDays(plan.targetDate, -8), 8).at(-1)!;
  assert.deepEqual(dayTasks(plan, last).map((t) => t.kind), ['light-review'], 'the last study day is light');
});

test('task status comes from real activity only — opening a page is not completing', () => {
  let p = withPlan();
  const plan = p.ielts.plan!;
  const today = dayTasks(plan, TODAY);
  const view = () => planDay(p.ielts.plan!, TODAY, ctx(p));
  assert.equal(view().state, 'today');
  assert.ok(view().tasks.every((t) => t.status === 'todo'));
  // A lesson started but not finished: in progress, not done.
  p = { ...p, foundation: { ...p.foundation, inProgress: { lessonId: 'ib-1', page: 2, answers: {}, attempt: 1, updatedAt: NOW.toISOString() } as never } };
  assert.equal(view().tasks.find((t) => t.kind === 'foundation')!.status, 'partial');
  // Finished lessons today.
  const lessons = Object.fromEntries(['ib-1', 'ib-2', 'ib-3'].map((id) => [id, { completedAt: NOW.toISOString(), score: 90, best: 90, attempts: 1 }]));
  p = { ...p, foundation: { ...p.foundation, inProgress: undefined, lessons } };
  assert.equal(view().tasks.find((t) => t.kind === 'foundation')!.status, 'done');
  // A skill task: its real activity that day.
  const skill = today.find((t) => ['reading', 'writing', 'speaking', 'listening'].includes(t.kind))!;
  assert.equal(view().tasks.find((t) => t.kind === skill.kind)!.status, 'todo');
  const withSkill = planDay(plan, TODAY, ctx(p, { sections: sectionsByDate([{ skill: skill.kind, status: 'submitted', submittedAt: NOW.toISOString() }]) }));
  assert.equal(withSkill.tasks.find((t) => t.kind === skill.kind)!.status, 'done');
  assert.equal(planDay(plan, TODAY, ctx(p, { sections: sectionsByDate([{ skill: skill.kind, status: 'in-progress' }]) })).tasks.find((t) => t.kind === skill.kind)!.status, 'todo', 'an unfinished test section does not count');
  // Another day's activity does not count for today.
  const yesterday = planDay(plan, TODAY, ctx(p, { sections: sectionsByDate([{ skill: skill.kind, status: 'submitted', submittedAt: '2026-09-30T10:00:00' }]) }));
  assert.equal(yesterday.tasks.find((t) => t.kind === skill.kind)!.status, 'todo');
});

test('days: done, partial, missed, skipped (kept, never marked done), upcoming', () => {
  const p = withPlan();
  const plan = p.ielts.plan!;
  const [d1, d2] = studyDaysFrom(plan, TODAY, 2);
  const later = ctx(p, { today: addDays(d2, 1) });
  assert.equal(planDay(plan, d1, later).state, 'missed');
  assert.equal(planDay(plan, d2, ctx(p)).state, 'upcoming');
  const skipped = setDaySkipped(p, d1, true, NOW);
  const v = planDay(skipped.ielts.plan!, d1, ctx(skipped, { today: addDays(d2, 1) }));
  assert.equal(v.state, 'skipped');
  assert.equal(v.tasks.length, dayTasks(plan, d1).length, 'tasks are kept');
  assert.ok(v.tasks.every((t) => t.status !== 'done'), 'skipping is not completing');
  assert.equal(dayTasks(skipped.ielts.plan!, d2).length, dayTasks(plan, d2).length, 'future days untouched');
  const undone = setDaySkipped(skipped, d1, false);
  assert.equal(undone.ielts.plan!.log![d1], undefined);
});

test('plan progress counts tasks done on planned days up to today', () => {
  let p = withPlan();
  const plan = p.ielts.plan!;
  assert.deepEqual(planProgress(plan, ctx(p)), { done: 0, total: dayTasks(plan, TODAY).length, daysStudied: 0, daysPlanned: 1 });
  p = { ...p, study: { ...p.study, days: { [TODAY]: { mode: 'normal', done: ['vocabulary', 'reading', 'writing', 'speaking', 'listening'] } } } };
  assert.ok(planProgress(plan, ctx(p)).done >= 1);
});

test('editing the plan changes future days only; past days and completed work stay', () => {
  let p = withPlan();
  const first = p.ielts.plan!;
  const past = studyDaysFrom(first, TODAY, 10);
  const editDay = addDays(past.at(-1)!, 1);
  // Real work on the first two days; one day skipped.
  p = { ...p, study: { ...p.study, days: { [past[0]]: { mode: 'normal', done: ['vocabulary'] }, [past[1]]: { mode: 'normal', done: ['vocabulary'] } } } };
  p = setDaySkipped(p, past[2], true, NOW);
  const before = past.map((d) => planDay(p.ielts.plan!, d, ctx(p, { today: editDay })));
  const edited = generateMyPlan({ ...answers, dailyStudyMinutes: 60, weakSkills: ['speaking'] }, new Date(`${editDay}T09:00:00`), p.ielts.plan);
  const rebased = rebasePlan(p.ielts.plan!, edited, p, {}, editDay);
  const q = applyMyPlan(p, rebased);
  const plan = q.ielts.plan!;
  for (const [i, d] of past.entries()) {
    const after = planDay(plan, d, ctx(q, { today: editDay }));
    assert.deepEqual(after.tasks.map((t) => [t.kind, t.minutes]), before[i].tasks.map((t) => [t.kind, t.minutes]), `${d}: same tasks as before the edit`);
    assert.equal(after.state, before[i].state, `${d}: same state`);
  }
  assert.equal(planDay(plan, past[2], ctx(q, { today: editDay })).state, 'skipped', 'skipped day stays skipped');
  const future = studyDaysFrom(plan, editDay, 3);
  assert.ok(future.every((d) => dayTasks(plan, d).reduce((s, t) => s + t.minutes, 0) <= 60), 'future days use the new daily time');
  assert.equal(plan.revisions, 1);
  assert.equal(plan.createdAt, first.createdAt);
});

test('tasks open the real place in the app', () => {
  const p = withPlan();
  assert.equal(taskHref({ kind: 'foundation', minutes: 20, count: 1 }, p), '/ielts/foundation/lesson/ib-1', 'the next lesson on the path');
  assert.equal(taskHref({ kind: 'reading', minutes: 30, count: 1 }, p), '/ielts/reading');
  assert.equal(taskHref({ kind: 'vocabulary', minutes: 15, count: 1 }, p), '/review');
  assert.equal(taskHref({ kind: 'mock', minutes: 120, count: 1, full: true }, p), '/ielts/tests');
  assert.match(taskHref({ kind: 'writing', minutes: 40, count: 1 }, p), /^\/ielts\/tests\/.+\/writing$/);
});

console.log(`\n${passed} passed`);

// Daily schedule for My IELTS Plan. The task list of every study day is a pure
// function of the saved plan and the date, so the schedule is the same on every
// device and never needs to be stored day by day. What must be remembered is
// stored on the plan: skipped days (log) and the task lists of days planned
// under an earlier version (history, frozen when the plan is edited).
//
// A task's status is never stored or ticked by hand: it is read from what the
// student actually did that day — lessons completed, passages finished, test
// sections submitted, recall sessions, reviews.
import { IELTS_SKILLS, type IELTSSkill } from '@/lib/constants';
import { nextLesson } from '@/lib/foundation/progress';
import { lessonHref } from '@/lib/foundation/curriculum';
import type { FrozenPlanDay, MyPlan, MyPlanPhaseId, ScheduleTask, ScheduleTaskKind, UserProfile } from '@/lib/models';
import { localDateKey } from './dates';

const parseDay = (key: string) => new Date(`${key}T00:00`);
export const addDays = (key: string, n: number) => {
  // Calendar arithmetic (not +24 h), so days never repeat or skip on a daylight-saving change.
  const [y, m, d] = key.split('-').map(Number);
  return localDateKey(new Date(y, m - 1, d + n));
};
const weekday = (key: string) => parseDay(key).getDay();

/** Weekday order for a default study week: Saturday first, Friday rest last. */
export const WEEK_ORDER = [6, 0, 1, 2, 3, 4, 5];
export const studyWeekdays = (plan: MyPlan) => plan.studyWeekdays ?? WEEK_ORDER.slice(0, plan.studyDaysPerWeek);

/** First day of the current schedule. */
export const scheduleFrom = (plan: MyPlan) => plan.phases[0]?.startDate ?? plan.targetDate;
/** Last day with study (the day before the test). */
export const scheduleTo = (plan: MyPlan) => addDays(plan.targetDate, -1);

export function phaseOn(plan: MyPlan, date: string): MyPlanPhaseId | undefined {
  return plan.phases.find((p) => p.startDate <= date && date <= p.endDate)?.id;
}

export const isStudyDay = (plan: MyPlan, date: string) =>
  date >= scheduleFrom(plan) && date <= scheduleTo(plan) && studyWeekdays(plan).includes(weekday(date)) && Boolean(phaseOn(plan, date));

/** Study days from `from` up to and including `date` (0-based index of `date`). */
function studyIndex(plan: MyPlan, from: string, date: string): number {
  const days = studyWeekdays(plan);
  let n = -1;
  for (let d = from; d <= date; d = addDays(d, 1)) if (days.includes(weekday(d))) n++;
  return Math.max(0, n);
}

/** Skills in a repeating order, weak skills more often (smooth weighted round robin). */
export function skillRotation(share: Record<IELTSSkill, number>, length = 20): IELTSSkill[] {
  const current = Object.fromEntries(IELTS_SKILLS.map((s) => [s, 0])) as Record<IELTSSkill, number>;
  const total = IELTS_SKILLS.reduce((a, s) => a + share[s], 0);
  const out: IELTSSkill[] = [];
  for (let i = 0; i < length; i++) {
    for (const s of IELTS_SKILLS) current[s] += share[s];
    const pick = IELTS_SKILLS.reduce((best, s) => (current[s] > current[best] ? s : best), IELTS_SKILLS[0]);
    current[pick] -= total;
    out.push(pick);
  }
  return out;
}

/** Split `total` minutes by weights into 5-minute steps (at least 10 each), summing to `total`. */
function splitMinutes(total: number, weights: number[]): number[] {
  let parts = weights.map((w) => w);
  // Drop parts that would be shorter than 10 minutes.
  const sum = () => parts.reduce((a, b) => a + b, 0);
  const live = () => parts.filter((w) => w > 0);
  while (live().length > 1 && live().some((w) => (w / sum()) * total < 10)) {
    const i = parts.indexOf(Math.min(...live()));
    parts = parts.map((w, k) => (k === i ? 0 : w));
  }
  const s = sum();
  const out = parts.map((w) => (w > 0 ? Math.max(5, Math.round(((w / s) * total) / 5) * 5) : 0));
  const diff = total - out.reduce((a, b) => a + b, 0);
  const big = out.indexOf(Math.max(...out));
  out[big] += diff;
  return out;
}

const FOUNDATION_LEVELS = new Set(['beginner', 'elementary', 'intermediate']);

/**
 * The tasks planned for a date (empty on rest days and outside the plan).
 * Days frozen by an earlier edit keep their original tasks.
 */
export function dayTasks(plan: MyPlan, date: string): ScheduleTask[] {
  const frozen = plan.history?.[date];
  if (frozen) return frozen.tasks;
  if (!isStudyDay(plan, date)) return [];
  const phase = phaseOn(plan, date)!;
  const phaseStart = plan.phases.find((p) => p.id === phase)!.startDate;
  const i = studyIndex(plan, scheduleFrom(plan), date);
  const iInPhase = studyIndex(plan, phaseStart, date);
  const rot = skillRotation(plan.skillShare);
  const a = rot[i % rot.length];
  const b = rot.slice((i % rot.length) + 1).concat(rot).find((s) => s !== a) ?? IELTS_SKILLS.find((s) => s !== a)!;
  const D = plan.dailyStudyMinutes;
  const lastStudyDay = !Array.from({ length: 7 }, (_, k) => addDays(date, k + 1)).some((d) => isStudyDay(plan, d));

  let recipe: [ScheduleTaskKind, number][];
  switch (phase) {
    case 'foundation':
      recipe = [['foundation', 0.5], [a, 0.35], ['vocabulary', 0.15]];
      break;
    case 'skill-building':
      recipe = FOUNDATION_LEVELS.has(plan.currentLevel) ? [['foundation', 0.2], [a, 0.45], [b, 0.2], ['vocabulary', 0.15]] : [[a, 0.5], [b, 0.35], ['vocabulary', 0.15]];
      break;
    case 'practice':
      recipe = iInPhase % 4 === 3 ? [[a, 0.55], ['review', 0.25], ['vocabulary', 0.2]] : [[a, 0.5], [b, 0.35], ['vocabulary', 0.15]];
      break;
    case 'mock-tests':
      recipe = iInPhase % 3 === 0 ? (D >= 150 ? [['mock', 1]] : [['mock', 0.8], ['review', 0.2]]) : [[a, 0.6], ['review', 0.25], ['vocabulary', 0.15]];
      break;
    case 'final-review':
      recipe = lastStudyDay ? [['light-review', 1]] : [['review', 0.35], [a, 0.4], ['vocabulary', 0.25]];
      break;
  }
  const total = recipe[0][0] === 'light-review' ? Math.min(30, D) : D;
  const minutes = splitMinutes(total, recipe.map((r) => r[1]));
  return recipe
    .map(([kind], k) => ({ kind, minutes: minutes[k] }))
    .filter((t) => t.minutes > 0)
    .map((t) => ({
      ...t,
      count: t.kind === 'foundation' ? Math.min(3, Math.max(1, Math.round(t.minutes / 20))) : 1,
      ...(t.kind === 'mock' ? { full: D >= 150 } : {}),
    }));
}

// ---------------------------------------------------------------- status from real activity

export type TaskStatus = 'todo' | 'partial' | 'done';

/** What the student did, by local date. Test sections come from test sessions. */
export interface ActivityContext {
  profile: UserProfile;
  /** Submitted test sections: date key → skills. */
  sections: Record<string, IELTSSkill[]>;
  today: string;
  /** Words due for recall today (to know there is nothing to recall). */
  brain?: { total: number; due: number };
}

export function sectionsByDate(sessions: { skill: string; status: string; submittedAt?: string }[]): Record<string, IELTSSkill[]> {
  const out: Record<string, IELTSSkill[]> = {};
  for (const s of sessions) {
    if (s.status !== 'submitted' || !s.submittedAt) continue;
    const key = localDateKey(new Date(s.submittedAt));
    (out[key] ??= []).push(s.skill as IELTSSkill);
  }
  return out;
}

const lessonsOn = (p: UserProfile, date: string) => Object.values(p.foundation?.lessons ?? {}).filter((l) => l.completedAt && localDateKey(new Date(l.completedAt)) === date).length;
const doneOn = (p: UserProfile, date: string, kind: string) => (p.study.days[date]?.done ?? []).includes(kind as never);

export function taskStatus(task: ScheduleTask, date: string, ctx: ActivityContext): TaskStatus {
  const p = ctx.profile;
  const sec = ctx.sections[date] ?? [];
  switch (task.kind) {
    case 'foundation': {
      const n = lessonsOn(p, date);
      if (n >= task.count) return 'done';
      return n > 0 || (date === ctx.today && p.foundation?.inProgress) ? 'partial' : 'todo';
    }
    case 'vocabulary':
      if (doneOn(p, date, 'vocabulary')) return 'done';
      return date === ctx.today && ctx.brain && ctx.brain.total > 0 && ctx.brain.due === 0 ? 'done' : 'todo';
    case 'reading':
    case 'writing':
    case 'speaking':
      return doneOn(p, date, task.kind) || sec.includes(task.kind) ? 'done' : 'todo';
    case 'listening':
      return sec.includes('listening') ? 'done' : 'todo';
    case 'review': {
      const d = p.foundation?.days[date];
      return (d?.reviews ?? 0) + (d?.quizzes ?? 0) > 0 ? 'done' : 'todo';
    }
    case 'mock': {
      const written = (['listening', 'reading', 'writing'] as const).filter((s) => sec.includes(s)).length;
      if (!task.full) return sec.length > 0 ? 'done' : 'todo';
      return written === 3 ? 'done' : sec.length > 0 ? 'partial' : 'todo';
    }
    case 'light-review': {
      const any = lessonsOn(p, date) > 0 || (p.study.days[date]?.done.length ?? 0) > 0 || sec.length > 0 || (p.foundation?.days[date]?.reviews ?? 0) > 0;
      return any ? 'done' : 'todo';
    }
  }
}

export type DayState = 'rest' | 'done' | 'partial' | 'skipped' | 'missed' | 'today' | 'upcoming' | 'test';

export interface PlanDayView {
  date: string;
  phase?: MyPlanPhaseId;
  tasks: (ScheduleTask & { status: TaskStatus })[];
  minutes: number;
  done: number;
  state: DayState;
  skipped: boolean;
}

export function planDay(plan: MyPlan, date: string, ctx: ActivityContext): PlanDayView {
  const tasks = dayTasks(plan, date).map((t) => ({ ...t, status: taskStatus(t, date, ctx) }));
  const done = tasks.filter((t) => t.status === 'done').length;
  const skipped = Boolean(plan.log?.[date]);
  const minutes = tasks.reduce((s, t) => s + t.minutes, 0);
  let state: DayState;
  if (date === plan.targetDate) state = 'test';
  else if (!tasks.length) state = 'rest';
  else if (done === tasks.length) state = 'done';
  else if (skipped) state = 'skipped';
  else if (date === ctx.today) state = 'today';
  else if (date > ctx.today) state = 'upcoming';
  else state = done > 0 || tasks.some((t) => t.status === 'partial') ? 'partial' : 'missed';
  return { date, phase: plan.history?.[date]?.phase ?? phaseOn(plan, date), tasks, minutes, done, state, skipped };
}

/** Every date in the plan, oldest first: frozen history, then the current schedule up to the test day. */
export function planDates(plan: MyPlan): string[] {
  const from = [scheduleFrom(plan), ...Object.keys(plan.history ?? {})].sort()[0];
  const out: string[] = [];
  for (let d = from; d <= plan.targetDate; d = addDays(d, 1)) out.push(d);
  return out;
}

/** Tasks done / planned on study days up to today (skipped days count as planned). */
export function planProgress(plan: MyPlan, ctx: ActivityContext): { done: number; total: number; daysStudied: number; daysPlanned: number } {
  let done = 0;
  let total = 0;
  let daysStudied = 0;
  let daysPlanned = 0;
  for (const d of planDates(plan)) {
    if (d > ctx.today) break;
    const v = planDay(plan, d, ctx);
    if (!v.tasks.length) continue;
    daysPlanned++;
    total += v.tasks.length;
    done += v.done;
    if (v.state === 'done') daysStudied++;
  }
  return { done, total, daysStudied, daysPlanned };
}

// ---------------------------------------------------------------- links

const SKILL_HREF: Record<IELTSSkill, string> = {
  listening: '/ielts/tests',
  reading: '/ielts/reading',
  writing: '/ielts/tests/vb-practice-1/writing',
  speaking: '/ielts/tests/vb-practice-1/speaking',
};

/** Where a task is done in the app. Foundation opens the student's next lesson on the path. */
export function taskHref(task: ScheduleTask, profile: UserProfile): string {
  switch (task.kind) {
    case 'foundation': {
      const next = profile.foundation ? nextLesson(profile.foundation) : undefined;
      return next ? lessonHref(next.lesson.id) : '/ielts/foundation';
    }
    case 'vocabulary':
      return '/review';
    case 'review':
      return '/ielts/foundation';
    case 'mock':
      return '/ielts/tests';
    case 'light-review':
      return '/review';
    default:
      return SKILL_HREF[task.kind];
  }
}

// ---------------------------------------------------------------- skip & edit

/** Skip a day (or undo). Tasks are kept; the day shows as skipped, never as done. */
export function setDaySkipped(profile: UserProfile, date: string, skipped: boolean, now = new Date()): UserProfile {
  const plan = profile.ielts.plan;
  if (!plan) return profile;
  const log = { ...plan.log };
  if (skipped) log[date] = { skippedAt: now.toISOString() };
  else delete log[date];
  return { ...profile, ielts: { ...profile.ielts, plan: { ...plan, log } } };
}

/** Did the student do anything today (so today's task list must not change under them)? */
function activeOn(profile: UserProfile, date: string, sections: Record<string, IELTSSkill[]>) {
  return lessonsOn(profile, date) > 0 || (profile.study.days[date]?.done.length ?? 0) > 0 || (sections[date]?.length ?? 0) > 0 || Boolean(profile.foundation?.days[date]?.reviews);
}

/**
 * An edited plan: past days (and today, if the student already started it)
 * keep the tasks they were planned with; skipped days stay skipped; the new
 * schedule applies from today on.
 */
export function rebasePlan(previous: MyPlan, next: MyPlan, profile: UserProfile, sections: Record<string, IELTSSkill[]>, today: string): MyPlan {
  const history: Record<string, FrozenPlanDay> = { ...previous.history };
  for (let d = scheduleFrom(previous); d <= today && d <= scheduleTo(previous); d = addDays(d, 1)) {
    if (history[d]) continue;
    if (d === today && !activeOn(profile, d, sections)) continue;
    const tasks = dayTasks(previous, d);
    if (tasks.length) history[d] = { phase: phaseOn(previous, d)!, tasks };
  }
  return { ...next, history, log: { ...previous.log } };
}

import type { IELTSSkill } from '@/lib/constants';
import type { PlanMode, PlanTaskKind, UserProfile } from '@/lib/models';
import { daysSince, localDateKey } from './dates';
import { skillGaps } from './ielts';

export interface PlanTask {
  kind: PlanTaskKind;
  /** i18n key for the task title, e.g. "Writing Task 2". */
  titleKey: string;
  minutes: number;
  href: string;
}

export interface DailyPlan {
  date: string;
  mode: PlanMode;
  tasks: PlanTask[];
  done: PlanTaskKind[];
}

/** After this many days without activity the plan switches to catch-up mode. */
export const CATCH_UP_AFTER_DAYS = 3;

const DEFAULT_DAILY_MINUTES = 50;
const DEFAULT_PRIORITY: IELTSSkill[] = ['writing', 'speaking', 'reading', 'listening'];

function round5(n: number, min = 5): number {
  return Math.max(min, Math.round(n / 5) * 5);
}

export function dailyMinutes(profile: UserProfile): number {
  const { weeklyStudyHours, studyDays } = profile.ielts;
  if (!weeklyStudyHours) return DEFAULT_DAILY_MINUTES;
  const days = studyDays?.length || 6;
  return Math.min(150, Math.max(30, Math.round((weeklyStudyHours * 60) / days)));
}

/** Skills ordered by how much they need attention. */
export function skillPriority(profile: UserProfile): IELTSSkill[] {
  const gaps = skillGaps(profile.ielts).map((g) => g.skill);
  return [...gaps, ...DEFAULT_PRIORITY.filter((s) => !gaps.includes(s))];
}

function task(kind: PlanTaskKind, minutes: number, profile: UserProfile): PlanTask {
  const lessonId = profile.vocabulary.lastLessonId;
  return {
    kind,
    minutes,
    titleKey: `plan.task.${kind}`,
    href:
      kind === 'vocabulary'
        ? lessonId
          ? `/ielts/vocabulary/lessons/${lessonId}`
          : '/ielts/vocabulary'
        : `/ielts/${kind}`,
  };
}

export function needsCatchUp(profile: UserProfile, now = new Date()): boolean {
  const last = profile.study.lastActiveDate;
  return last !== undefined && daysSince(last, now) >= CATCH_UP_AFTER_DAYS;
}

/**
 * Today's plan: three tasks normally, a 15-minute minimum day on request,
 * or a lighter restart after a gap. The student's choice for the day sticks.
 */
export function buildDailyPlan(profile: UserProfile, now = new Date()): DailyPlan {
  const date = localDateKey(now);
  const log = profile.study.days[date];
  const mode: PlanMode = log?.mode ?? (needsCatchUp(profile, now) ? 'catch-up' : 'normal');
  const [first, second] = skillPriority(profile);

  let tasks: PlanTask[];
  if (mode === 'minimum') {
    tasks = [task('vocabulary', 5, profile), task('listening', 5, profile), task('speaking', 5, profile)];
  } else if (mode === 'catch-up') {
    tasks = [task('vocabulary', 10, profile), task(first, 15, profile)];
  } else {
    const total = dailyMinutes(profile);
    tasks = [
      task(first, round5(total * 0.5, 10), profile),
      task('vocabulary', round5(total * 0.3, 10), profile),
      task(second, round5(total * 0.2, 10), profile),
    ];
  }
  return { date, mode, tasks, done: log?.done ?? [] };
}

/** Returns the profile with a task toggled for today and totals updated. */
export function toggleTask(profile: UserProfile, plan: DailyPlan, kind: PlanTaskKind): UserProfile {
  const wasDone = plan.done.includes(kind);
  const done = wasDone ? plan.done.filter((k) => k !== kind) : [...plan.done, kind];
  const count = profile.study.completedTasks[kind] ?? 0;
  return {
    ...profile,
    study: {
      ...profile.study,
      completedTasks: { ...profile.study.completedTasks, [kind]: Math.max(0, count + (wasDone ? -1 : 1)) },
      days: { ...profile.study.days, [plan.date]: { mode: plan.mode, done } },
      lastActiveDate: done.length > 0 ? plan.date : profile.study.lastActiveDate,
    },
  };
}

export function setPlanMode(profile: UserProfile, plan: DailyPlan, mode: PlanMode): UserProfile {
  return {
    ...profile,
    study: { ...profile.study, days: { ...profile.study.days, [plan.date]: { mode, done: plan.done } } },
  };
}

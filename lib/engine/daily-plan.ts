import type { PlanMode, PlanTaskKind, UserProfile } from '@/lib/models';
import { daysSince, localDateKey } from './dates';

/**
 * Today's Learning. Vocabulary-first: review what's due, read one passage
 * (and save new words), then use a word in Writing and in Speaking. Tasks
 * complete automatically when the student finishes the real activity.
 */
export type DailyTaskKind = 'vocabulary' | 'reading' | 'writing' | 'speaking';

export interface PlanTask {
  kind: DailyTaskKind;
  /** i18n key for the title, e.g. "Vocabulary Review". */
  titleKey: string;
  /** i18n key + vars for the detail line, e.g. "12 words". */
  detailKey: string;
  detailVars?: Record<string, string | number>;
  minutes: number;
  href: string;
  done: boolean;
}

export interface DailyPlan {
  date: string;
  mode: PlanMode;
  tasks: PlanTask[];
}

/** What the plan needs to know about the student's Brain. */
export interface BrainContext {
  total: number;
  due: number;
}

/** After this many days without activity the plan switches to catch-up mode. */
export const CATCH_UP_AFTER_DAYS = 3;

export function needsCatchUp(profile: UserProfile, now = new Date()): boolean {
  const last = profile.study.lastActiveDate;
  return last !== undefined && daysSince(last, now) >= CATCH_UP_AFTER_DAYS;
}

export function buildDailyPlan(profile: UserProfile, brain: BrainContext, now = new Date()): DailyPlan {
  const date = localDateKey(now);
  const log = profile.study.days[date];
  const mode: PlanMode = log?.mode ?? (needsCatchUp(profile, now) ? 'catch-up' : 'normal');
  const done = new Set(log?.done ?? []);
  const short = mode !== 'normal';

  const reviewCap = mode === 'minimum' ? 8 : mode === 'catch-up' ? 10 : 20;
  const reviewCount = Math.min(brain.due, reviewCap);
  const vocabulary: PlanTask =
    brain.total === 0
      ? { kind: 'vocabulary', titleKey: 'plan.task.vocabulary', detailKey: 'plan.detail.noWords', minutes: 5, href: '/ielts/reading', done: false }
      : {
          kind: 'vocabulary',
          titleKey: 'plan.task.vocabulary',
          detailKey: reviewCount > 0 ? 'plan.detail.words' : 'plan.detail.allReviewed',
          detailVars: { n: reviewCount },
          minutes: mode === 'minimum' ? 5 : Math.min(20, Math.max(5, reviewCount)),
          href: '/review',
          // Nothing due counts as done: the student is up to date.
          done: done.has('vocabulary') || brain.due === 0,
        };

  const reading: PlanTask = {
    kind: 'reading',
    titleKey: 'plan.task.reading',
    detailKey: 'plan.detail.passage',
    minutes: short ? 5 : 10,
    href: '/ielts/reading',
    done: done.has('reading'),
  };
  const writing: PlanTask = {
    kind: 'writing',
    titleKey: 'plan.task.writing',
    detailKey: 'plan.detail.sentence',
    minutes: 5,
    href: '/practice/writing',
    done: done.has('writing'),
  };
  const speaking: PlanTask = {
    kind: 'speaking',
    titleKey: 'plan.task.speaking',
    detailKey: 'plan.detail.prompt',
    minutes: 5,
    href: '/practice/speaking',
    done: done.has('speaking'),
  };

  // Practice needs at least one recalled word; before that, reading comes first.
  const canPractise = brain.total > 0;
  const tasks =
    mode === 'minimum'
      ? [vocabulary, reading, speaking]
      : mode === 'catch-up'
        ? [vocabulary, reading]
        : canPractise
          ? [vocabulary, reading, writing, speaking]
          : [reading, vocabulary];

  return { date, mode, tasks };
}

/**
 * Marks an activity as done today (idempotent per day) and counts it towards
 * the journey. Called by real activities: finishing a passage, a review
 * session, a writing or speaking practice.
 */
export function markActivityDone(profile: UserProfile, kind: PlanTaskKind, now = new Date()): UserProfile {
  const date = localDateKey(now);
  const log = profile.study.days[date] ?? { mode: needsCatchUp(profile, now) ? 'catch-up' : 'normal', done: [] };
  if (log.done.includes(kind)) return profile;
  return {
    ...profile,
    study: {
      ...profile.study,
      completedTasks: { ...profile.study.completedTasks, [kind]: (profile.study.completedTasks[kind] ?? 0) + 1 },
      days: { ...profile.study.days, [date]: { ...log, done: [...log.done, kind] } },
      lastActiveDate: date,
    },
  };
}

export function setPlanMode(profile: UserProfile, mode: PlanMode, now = new Date()): UserProfile {
  const date = localDateKey(now);
  const log = profile.study.days[date];
  return {
    ...profile,
    study: { ...profile.study, days: { ...profile.study.days, [date]: { mode, done: log?.done ?? [] } } },
  };
}

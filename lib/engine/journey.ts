import type { UserProfile } from '@/lib/models';
import {
  CURRICULUM, CURRICULUM_STAGE_IDS, lessonPlace, PARALLEL_LESSONS, PATH_LESSONS, stageLessons, type CurriculumStageId, type CurriculumStep, type StepCheck,
} from '@/lib/foundation/curriculum';
import { checkIsNext, conceptMastery, nextLesson, testedOutOfFoundation } from '@/lib/foundation/progress';
import { knownSkillCount, overallBand } from './ielts';

/**
 * The IELTS journey: the seven curriculum stages. Every stage and step has an
 * explicit completion rule based on what the student has actually done —
 * lessons completed, practice sessions finished, tests taken, bands reached —
 * so progress is never an arbitrary number.
 */
export const JOURNEY_STAGE_IDS = CURRICULUM_STAGE_IDS;
export type JourneyStageId = CurriculumStageId;

export const JOURNEY_RULES = {
  /** Practice sessions of each kind to finish a Practice step. */
  practicePerSkill: 5,
  /** Grammar reviews + quizzes to finish the grammar practice step. */
  grammarPractice: 5,
  /** Full mock tests to finish the Mock Tests stage. */
  mockTests: 2,
} as const;

export type StepState = 'done' | 'current' | 'upcoming';

export interface JourneyStepStatus {
  step: CurriculumStep;
  state: StepState;
  /** Lessons done (or skipped after the check) / lessons in the step. */
  lessonsDone: number;
  lessonsTotal: number;
  /** 0–1. */
  progress: number;
}

export interface JourneyStageStatus {
  id: JourneyStageId;
  state: StepState;
  /** 0-1 progress inside this stage. */
  progress: number;
  steps: JourneyStepStatus[];
  /** Main-path lessons done / total (0/0 for stages without lessons). */
  lessonsDone: number;
  lessonsTotal: number;
  /** A strong English check counts English Foundation as done (lessons stay open). */
  testedOut?: boolean;
}

export interface IELTSJourney {
  stages: JourneyStageStatus[];
  current: JourneyStageId;
  /** 0-100: the average progress of the seven stages. */
  percent: number;
}

function checkProgress(check: StepCheck, profile: UserProfile): number {
  const { ielts, study } = profile;
  const fp = profile.foundation;
  switch (check) {
    case 'foundation-check':
      return fp?.diagnostic ? 1 : 0;
    case 'band-estimate':
      return ielts.diagnostic ? 1 : knownSkillCount(ielts.currentBands) / 4;
    case 'grammar-practice': {
      const n = Object.values(fp?.days ?? {}).reduce((s, d) => s + (d.reviews ?? 0) + (d.quizzes ?? 0), 0);
      return Math.min(1, n / JOURNEY_RULES.grammarPractice);
    }
    case 'vocabulary':
    case 'reading':
    case 'writing':
    case 'speaking':
      return Math.min(1, (study.completedTasks[check] ?? 0) / JOURNEY_RULES.practicePerSkill);
    case 'mock':
      return Math.min(1, study.mockTestsCompleted / JOURNEY_RULES.mockTests);
    case 'target': {
      const overall = overallBand(ielts.currentBands);
      if (overall === undefined || ielts.targetBand === undefined) return 0;
      return overall >= ielts.targetBand ? 1 : 0;
    }
  }
}

function stepProgress(step: CurriculumStep, profile: UserProfile, skipped: Set<string>) {
  const lessons = step.lessons ?? [];
  const lessonsDone = lessons.filter((id) => profile.foundation?.lessons[id] || skipped.has(id)).length;
  const progress = lessons.length ? lessonsDone / lessons.length : step.check ? checkProgress(step.check, profile) : 0;
  return { lessonsDone, lessonsTotal: lessons.length, progress };
}

export function ieltsJourney(profile: UserProfile): IELTSJourney {
  const fp = profile.foundation;
  const skipped = new Set(fp?.diagnostic?.skippedLessons ?? []);
  const testedOut = Boolean(fp && testedOutOfFoundation(fp));

  const raw = CURRICULUM.map((stage) => {
    const steps = stage.steps.map((step) => ({ step, ...stepProgress(step, profile, skipped) }));
    // What finishes the stage: its main-path lessons, else its checked steps.
    const required = steps.filter((s) => !s.step.optional && !s.step.parallel && (s.lessonsTotal > 0 || s.step.check));
    const lessons = stageLessons(stage);
    const lessonsDone = lessons.filter((id) => fp?.lessons[id] || skipped.has(id)).length;
    let progress = lessons.length
      ? lessonsDone / lessons.length
      : required.length
        ? required.reduce((s, x) => s + x.progress, 0) / required.length
        : 0;
    const out = stage.id === 'english-foundation' && testedOut;
    if (out) progress = 1;
    return { stage, steps, progress, lessonsDone, lessonsTotal: lessons.length, testedOut: out };
  });

  let currentIndex = raw.findIndex((s) => s.progress < 1);
  const allDone = currentIndex === -1;
  if (allDone) currentIndex = raw.length - 1;

  const stages: JourneyStageStatus[] = raw.map((s, i) => {
    const state: StepState = allDone || s.progress >= 1 ? 'done' : i === currentIndex ? 'current' : i < currentIndex ? 'done' : 'upcoming';
    // Inside a stage: the first unfinished required step is "current".
    let marked = false;
    const steps: JourneyStepStatus[] = s.steps.map((x) => {
      const done = x.progress >= 1;
      const isCurrent = !done && !marked && state === 'current' && !x.step.parallel && !x.step.optional;
      if (isCurrent) marked = true;
      return { step: x.step, state: done ? 'done' : isCurrent ? 'current' : 'upcoming', lessonsDone: x.lessonsDone, lessonsTotal: x.lessonsTotal, progress: x.progress };
    });
    return {
      id: s.stage.id,
      state,
      progress: s.progress,
      steps,
      lessonsDone: s.lessonsDone,
      lessonsTotal: s.lessonsTotal,
      ...(s.testedOut ? { testedOut: true } : {}),
    };
  });

  const percent = allDone ? 100 : Math.round((raw.reduce((sum, s) => sum + s.progress, 0) / raw.length) * 100);
  return { stages, current: JOURNEY_STAGE_IDS[currentIndex], percent };
}

// ---------------------------------------------------------------- continue learning

export type ContinueStep =
  | { kind: 'resume'; lessonId: string; stage: JourneyStageId }
  /** The English check at the end of Start Here; `skipLessonId` starts the lessons without it. */
  | { kind: 'check'; skipLessonId?: string }
  /** Start Here is done: the first English Foundation lesson. */
  | { kind: 'foundation-start'; lessonId: string }
  | { kind: 'lesson'; lessonId: string; stage: JourneyStageId }
  /** A stage without lessons (Practice, Mock Tests, Target Ready): its current step. */
  | { kind: 'step'; stage: JourneyStageId; step: CurriculumStep }
  | { kind: 'done' };

/** The one next step on the curriculum path — the same answer on Home, IELTS and Today. */
export function continueLearning(profile: UserProfile, journey = ieltsJourney(profile)): ContinueStep {
  const fp = profile.foundation;
  const next = fp ? nextLesson(fp) : undefined;
  const stageOf = (id: string) => lessonPlace(id)?.stage.id ?? journey.current;
  if (fp?.inProgress && next) return { kind: 'resume', lessonId: next.lesson.id, stage: stageOf(next.lesson.id) };
  if (fp && checkIsNext(fp)) return { kind: 'check', ...(next ? { skipLessonId: next.lesson.id } : {}) };
  if (next && PATH_LESSONS.includes(next.lesson.id)) {
    const stage = stageOf(next.lesson.id);
    const foundation = journey.stages.find((s) => s.id === 'english-foundation')!;
    if (stage === 'english-foundation' && foundation.lessonsDone === 0) return { kind: 'foundation-start', lessonId: next.lesson.id };
    return { kind: 'lesson', lessonId: next.lesson.id, stage };
  }
  const current = journey.stages.find((s) => s.id === journey.current)!;
  const step = current.state !== 'done' ? (current.steps.find((s) => s.state === 'current') ?? current.steps.find((s) => s.state !== 'done')) : undefined;
  if (step?.step.href) return { kind: 'step', stage: current.id, step: step.step };
  if (next && PARALLEL_LESSONS.includes(next.lesson.id)) return { kind: 'lesson', lessonId: next.lesson.id, stage: stageOf(next.lesson.id) };
  return { kind: 'done' };
}

// ---------------------------------------------------------------- honest numbers

export interface LearningStats {
  /** Curriculum lessons completed (not opened, not skipped). */
  lessonsDone: number;
  lessonsTotal: number;
  /** Finished practice sessions: daily tasks plus grammar reviews and quizzes. */
  practiceSessions: number;
  /** Grammar topics with every kind of mastery evidence. */
  topicsMastered: number;
}

export function learningStats(profile: UserProfile): LearningStats {
  const fp = profile.foundation;
  const all = [...PATH_LESSONS, ...PARALLEL_LESSONS];
  const tasks = Object.values(profile.study.completedTasks).reduce<number>((s, n) => s + (n ?? 0), 0);
  const grammar = Object.values(fp?.days ?? {}).reduce((s, d) => s + (d.reviews ?? 0) + (d.quizzes ?? 0), 0);
  return {
    lessonsDone: all.filter((id) => fp?.lessons[id]).length,
    lessonsTotal: all.length,
    practiceSessions: tasks + grammar,
    topicsMastered: fp ? Object.keys(fp.concepts).filter((c) => conceptMastery(fp, c).level === 'mastered').length : 0,
  };
}

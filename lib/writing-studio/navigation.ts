/**
 * Mino Writing Studio — the navigation model (pure, no React): every route in the hierarchy, lesson/module status, the
 * "continue" target, and the validated "where did I come from" back-destination of a lesson. Kept free of UI so it is
 * unit-tested (scripts/test-writing-studio-navigation.ts) and so the screens never build URLs by hand.
 *
 *   /ielts/writing-studio                      Level 1: Task 1 / Task 2
 *   /ielts/writing-studio/task1                Level 2: Learn · Practice · Exam · Mistake Revision
 *   /ielts/writing-studio/task1/learn          Level 3: the seven module cards
 *   /ielts/writing-studio/task1/learn/visual-information            Module 2 sub-hub: core lecture + seven chart types
 *   /ielts/writing-studio/task1/learn/visual-information/[chartType] one chart type's own area
 *   /ielts/writing-studio/task1/lesson/[lessonId]   (existing, unchanged)
 *
 * No learning data lives here: statuses are read from the learner's existing `writingStudio` progress.
 */
import type { WritingStudioProgress } from '@/lib/models';
import type { ModuleSummary, TaskId, VisualTrainingArea } from './types';
import { getLesson } from './lessons';
import { TASK1_VISUALS } from './content';

export const WS_ROOT = '/ielts/writing-studio';
export const TASKS: readonly TaskId[] = ['task1', 'task2'];
export const isTaskId = (v: unknown): v is TaskId => v === 'task1' || v === 'task2';

export const taskHref = (task: TaskId) => `${WS_ROOT}/${task}`;
export const learnHref = (task: TaskId) => `${taskHref(task)}/learn`;
export const VISUAL_LESSON_ID = 'visual-information';
export const visualHubHref = () => `${learnHref('task1')}/visual-information`;
export const chartTypeHref = (chartTypeId: string) => `${visualHubHref()}/${chartTypeId}`;
export const mistakesHref = (task: TaskId) => `${taskHref(task)}/mistakes`;
export const progressHref = () => `${WS_ROOT}/progress`;
export const practiceHref = (task: TaskId) => (task === 'task1' ? `${taskHref(task)}/chart-analysis-board` : `${taskHref(task)}/idea-development-board`);
export const examHref = (task: TaskId) => `${WS_ROOT}/exam/${task}`;
export const EXAM_MINUTES: Record<TaskId, number> = { task1: 20, task2: 40 };

// ------------------------------------------------------------------ lesson links and the validated way back

/** Where a lesson was opened from. Only these fixed keys are ever accepted: a return destination is never a URL from the query string. */
export const LESSON_ORIGINS = ['learn', 'visual', 'mistakes', 'progress'] as const;
export type LessonOrigin = (typeof LESSON_ORIGINS)[number];

export function lessonHref(task: TaskId, lessonId: string, from?: LessonOrigin): string {
  return `${taskHref(task)}/lesson/${lessonId}${from ? `?from=${from}` : ''}`;
}

export interface LessonBack {
  origin: LessonOrigin;
  href: string;
  label: { en: string; bn: string };
}

/**
 * The parent screen a lesson returns to. `from` is the raw query value: anything that is not one of the fixed origins
 * (including full URLs, paths, `//evil.example`) is ignored. Direct links with no origin return to the lesson's own parent:
 * the Visual Information hub for the core lecture, Learn Mode for every other lesson.
 */
export function resolveLessonBack(task: TaskId, lessonId: string, from: string | null | undefined): LessonBack {
  const known = (LESSON_ORIGINS as readonly string[]).includes(from ?? '') ? (from as LessonOrigin) : undefined;
  // 'visual' only exists for Task 1's core lecture and the chart-type courses.
  const chart = task === 'task1' ? TASK1_VISUALS.find((v) => v.courseLessonId === lessonId || v.courseLessonIds?.includes(lessonId)) : undefined;
  const inVisual = task === 'task1' && (lessonId === VISUAL_LESSON_ID || !!chart);
  const origin: LessonOrigin = known === 'visual' && !inVisual ? 'learn' : (known ?? (inVisual ? 'visual' : 'learn'));
  switch (origin) {
    case 'visual':
      if (chart) return { origin, href: chartTypeHref(chart.id), label: typeof chart.title === 'string' ? { en: chart.title, bn: chart.title } : chart.title };
      return { origin, href: visualHubHref(), label: { en: 'Visual Information', bn: 'Visual Information' } };
    case 'mistakes':
      return { origin, href: mistakesHref(task), label: { en: 'Mistake Revision', bn: 'Mistake Revision' } };
    case 'progress':
      return { origin, href: progressHref(), label: { en: 'Progress', bn: 'Progress' } };
    default:
      return { origin: 'learn', href: learnHref(task), label: { en: 'Learn Mode', bn: 'Learn Mode' } };
  }
}

// ------------------------------------------------------------------ status

export type ModuleStatus = 'not-started' | 'in-progress' | 'completed';

/** Lessons the learner has opened and moved through on this device (see lesson-activity.ts): id → last activity (ms). */
export type StartedLessons = Record<string, number>;

export function lessonStatus(progress: WritingStudioProgress, lessonId: string | undefined, started: StartedLessons = {}): ModuleStatus {
  if (!lessonId) return 'not-started';
  if (progress.lessons[lessonId]) return 'completed';
  return started[lessonId] ? 'in-progress' : 'not-started';
}

export const moduleStatus = (progress: WritingStudioProgress, m: ModuleSummary, started: StartedLessons = {}): ModuleStatus => lessonStatus(progress, m.builtLessonId, started);

/**
 * The one module to offer as "continue where you left off", or undefined when there is nothing real to continue:
 * 1. a lesson the learner started but has not completed (most recent first);
 * 2. otherwise, if they have completed something, the next module not yet completed;
 * 3. otherwise (a brand-new learner, or everything is done) nothing.
 */
export function continueModule(modules: ModuleSummary[], progress: WritingStudioProgress, started: StartedLessons = {}): ModuleSummary | undefined {
  const open = modules.filter((m) => m.builtLessonId && !progress.lessons[m.builtLessonId]);
  const inProgress = open.filter((m) => started[m.builtLessonId!]).sort((a, b) => started[b.builtLessonId!] - started[a.builtLessonId!]);
  if (inProgress.length) return inProgress[0];
  const anyDone = modules.some((m) => m.builtLessonId && progress.lessons[m.builtLessonId]);
  return anyDone ? open[0] : undefined;
}

/** Where a module card opens. Task 1's Module 2 is the nested Visual Information hub; every other module is its existing lesson route. */
export function moduleHref(task: TaskId, m: ModuleSummary): string {
  if (task === 'task1' && m.builtLessonId === VISUAL_LESSON_ID) return visualHubHref();
  return lessonHref(task, m.builtLessonId ?? m.id, 'learn');
}

/** Where "continue" goes: straight into the lesson (the hub is for choosing; a started core lecture resumes in the lecture). */
export function continueHref(task: TaskId, m: ModuleSummary): string {
  const id = m.builtLessonId ?? m.id;
  return lessonHref(task, id, task === 'task1' && id === VISUAL_LESSON_ID ? 'visual' : 'learn');
}

// ------------------------------------------------------------------ chart types

export type ChartTypeState = 'course' | 'preview';

/**
 * A chart type offers its own course only when `courseLessonId` names a registered lesson. The legacy `builtLessonId`
 * (a generic shared lesson) is deliberately ignored, so no chart type is ever routed to content that is not its own.
 */
export function chartTypeState(area: VisualTrainingArea): ChartTypeState {
  return area.courseLessonId && getLesson(area.courseLessonId) ? 'course' : 'preview';
}

export const chartTypeById = (areas: VisualTrainingArea[], id: string) => areas.find((a) => a.id === id);

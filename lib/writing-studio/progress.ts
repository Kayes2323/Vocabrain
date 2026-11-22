// Mino Writing Studio — real progress, derived from the student's own
// profile (users/{uid}.app.writingStudio). Record functions are pure,
// immutable updates saved through useProfile().updateProfile; derive
// functions turn that history into what the screens show. No sample data.

import type { WritingStudioExamMode, WritingStudioMistakeRecord, WritingStudioProgress } from '@/lib/models';
import type { AcademyStats, IndependenceLevel, MistakeCategory, ModuleSummary, ProgressPoint, TaskId } from './types';

const MISTAKES_CAP = 60;
const EXAMS_CAP = 30;
const PRACTICE_CAP = 60;

const TASK_NUM: Record<TaskId, 1 | 2> = { task1: 1, task2: 2 };

export function recordLesson(progress: WritingStudioProgress, lessonId: string, task: 1 | 2, band: number | null): WritingStudioProgress {
  const prev = progress.lessons[lessonId];
  const best = band === null ? prev?.bestBand ?? null : prev?.bestBand != null ? Math.max(prev.bestBand, band) : band;
  return {
    ...progress,
    lessons: {
      ...progress.lessons,
      [lessonId]: { task, completedAt: new Date().toISOString(), attempts: (prev?.attempts ?? 0) + 1, lastBand: band, bestBand: best },
    },
  };
}

export function recordMistakes(
  progress: WritingStudioProgress,
  task: 1 | 2,
  source: 'ai' | 'local',
  mistakes: { category: string; quote: string; fix: string; why: string }[],
): WritingStudioProgress {
  if (mistakes.length === 0) return progress;
  const at = new Date().toISOString();
  const added: WritingStudioMistakeRecord[] = mistakes.map((m) => ({ at, task, source, ...m }));
  return { ...progress, mistakes: [...progress.mistakes, ...added].slice(-MISTAKES_CAP) };
}

export function recordExam(
  progress: WritingStudioProgress,
  mode: WritingStudioExamMode,
  task1Band: number | null,
  task2Band: number | null,
  overallBand: number | null,
): WritingStudioProgress {
  return { ...progress, exams: [...progress.exams, { at: new Date().toISOString(), mode, task1Band, task2Band, overallBand }].slice(-EXAMS_CAP) };
}

export function recordPractice(progress: WritingStudioProgress, task: 1 | 2, kind: 'chart-board' | 'idea-board'): WritingStudioProgress {
  return { ...progress, practice: [...progress.practice, { at: new Date().toISOString(), task, kind }].slice(-PRACTICE_CAP) };
}

function recentBands(progress: WritingStudioProgress, task: 1 | 2, limit = 8): { at: string; band: number }[] {
  const fromLessons = Object.values(progress.lessons)
    .filter((l) => l.task === task && l.lastBand !== null)
    .map((l) => ({ at: l.completedAt, band: l.lastBand as number }));
  const fromExams = progress.exams.flatMap((e) => {
    if (e.mode === 'full') {
      const band = task === 1 ? e.task1Band : e.task2Band;
      return band !== null ? [{ at: e.at, band }] : [];
    }
    if ((e.mode === 'task1' && task === 1) || (e.mode === 'task2' && task === 2)) {
      return e.overallBand !== null ? [{ at: e.at, band: e.overallBand }] : [];
    }
    return [];
  });
  return [...fromLessons, ...fromExams].sort((a, b) => a.at.localeCompare(b.at)).slice(-limit);
}

/** The four-level gradual-independence system, computed from real completion and recent bands (spec §13). */
export function deriveIndependenceLevel(progress: WritingStudioProgress, task: 1 | 2, lessonsCompleted: number): IndependenceLevel {
  if (lessonsCompleted === 0) return 1;
  const bands = recentBands(progress, task).map((b) => b.band);
  const avg = bands.length ? bands.reduce((a, b) => a + b, 0) / bands.length : 0;
  if (lessonsCompleted >= 4 && avg >= 6.5) return 4;
  if (lessonsCompleted >= 2 && avg >= 6) return 3;
  return 2;
}

export function deriveAcademyStats(progress: WritingStudioProgress, taskId: TaskId, modules: ModuleSummary[]): AcademyStats {
  const task = TASK_NUM[taskId];
  const lessonsCompleted = modules.filter((m) => m.builtLessonId && progress.lessons[m.builtLessonId]).length;
  const practiceSessions = progress.practice.filter((p) => p.task === task).length;
  const mockTestsTaken = progress.exams.filter((e) => e.mode === taskId || e.mode === 'full').length;

  const counts = new Map<string, number>();
  progress.mistakes.filter((m) => m.task === task).forEach((m) => counts.set(m.category, (counts.get(m.category) ?? 0) + 1));
  const focusAreas = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([label]) => label);

  return {
    task: taskId,
    modulesTotal: modules.length,
    lessonsCompleted,
    lessonsTotal: modules.length,
    practiceSessions,
    mockTestsTaken,
    currentLevel: deriveIndependenceLevel(progress, task, lessonsCompleted),
    focusAreas,
  };
}

/** Groups real recorded mistakes by category for the Mistake Revision screen (spec §12). Empty when nothing has been recorded yet. */
export function deriveMistakeCategories(progress: WritingStudioProgress, modules: { task1: ModuleSummary[]; task2: ModuleSummary[] }, limit = 6): MistakeCategory[] {
  const groups = new Map<string, { task: 1 | 2; occurrences: WritingStudioMistakeRecord[] }>();
  progress.mistakes.forEach((m) => {
    const key = `${m.task}:${m.category}`;
    const g = groups.get(key) ?? { task: m.task, occurrences: [] };
    g.occurrences.push(m);
    groups.set(key, g);
  });

  const fallbackLesson = (task: 1 | 2) => (task === 1 ? modules.task1 : modules.task2).find((m) => m.builtLessonId)?.builtLessonId;

  return [...groups.entries()]
    .map(([key, g]) => {
      const sorted = [...g.occurrences].sort((a, b) => a.at.localeCompare(b.at));
      const mid = Math.floor(sorted.length / 2);
      const older = sorted.slice(0, mid).length;
      const recent = sorted.slice(mid).length;
      const trend: MistakeCategory['trend'] = recent > older ? 'up' : recent < older ? 'down' : 'flat';
      const latest = sorted[sorted.length - 1];
      return {
        id: key,
        label: `${latest.category} (Task ${g.task})`,
        occurrences: sorted.length,
        trend,
        example: { quote: latest.quote, fix: latest.fix, why: latest.why },
        relatedLessonId: fallbackLesson(g.task),
      };
    })
    .sort((a, b) => b.occurrences - a.occurrences)
    .slice(0, limit);
}

/** Band history across lessons and exams, oldest first, for the Progress screen's chart. Empty until the student has at least one scored attempt. */
export function deriveProgressTrend(progress: WritingStudioProgress, limit = 10): ProgressPoint[] {
  const points: { at: string; band: number }[] = [
    ...Object.values(progress.lessons)
      .filter((l) => l.lastBand !== null)
      .map((l) => ({ at: l.completedAt, band: l.lastBand as number })),
    ...progress.exams
      .filter((e) => e.overallBand !== null)
      .map((e) => ({ at: e.at, band: e.overallBand as number })),
  ].sort((a, b) => a.at.localeCompare(b.at));

  return points.slice(-limit).map((p, i, arr) => ({
    label: i === arr.length - 1 ? 'Latest' : new Date(p.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    band: p.band,
  }));
}

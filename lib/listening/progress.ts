/**
 * Shared progress & diagnostic engine (brief §9). Pure functions only — no
 * Firestore here (same pattern as `lib/foundation/progress.ts`).
 * `ListeningProgress` is stored at `profile.listening`, inside the existing
 * `users/{uid}.app` document — no new Firestore collection, no rules
 * change, works for guests on-device, exactly like Foundation's own
 * progress (see docs/FOUNDATION.md "Storage").
 *
 * Nothing here invents a number. A learner who has not practised yet gets
 * zero attempts, zero accuracy and `'foundation'` mastery — never a
 * plausible-looking placeholder.
 */
import type { ListeningLessonRecord, ListeningProgress } from '@/lib/models';
import { LISTENING_MODULES, findLesson } from './modules';
import type { Lesson, Module } from './model';

export type { ListeningProgress };

export const emptyListeningProgress = (): ListeningProgress => ({ lessons: {}, skills: {}, errors: {}, days: {} });

const today = (now: Date) => now.toISOString().slice(0, 10);

/** Marks a stage as opened/finished by the learner. Completion of a stage with no real questions yet records engagement, not a score. */
export function recordStageVisit(progress: ListeningProgress, lessonId: string, stageId: string, minutes: number, now = new Date()): ListeningProgress {
  const day = today(now);
  const current = progress.lessons[lessonId] ?? { stagesCompleted: [], attempts: 0, lastPracticedAt: now.toISOString() };
  const stagesCompleted = current.stagesCompleted.includes(stageId) ? current.stagesCompleted : [...current.stagesCompleted, stageId];
  const lessons = { ...progress.lessons, [lessonId]: { ...current, stagesCompleted, lastPracticedAt: now.toISOString() } };
  const prevDay = progress.days[day] ?? { minutesPracticed: 0, lessonsTouched: 0 };
  const touchedToday = current.stagesCompleted.length > 0;
  const days = { ...progress.days, [day]: { minutesPracticed: prevDay.minutesPracticed + minutes, lessonsTouched: prevDay.lessonsTouched + (touchedToday ? 0 : 1) } };
  return { ...progress, lessons, days };
}

/** Records a real answered question: updates skill stats and, on a wrong answer, every error tag it carries. */
export function recordAnswer(progress: ListeningProgress, skillTag: string, correct: boolean, errorTags: string[], now = new Date()): ListeningProgress {
  const stat = progress.skills[skillTag] ?? { attempts: 0, correct: 0 };
  const skills = { ...progress.skills, [skillTag]: { attempts: stat.attempts + 1, correct: stat.correct + (correct ? 1 : 0), lastPracticedAt: now.toISOString() } };
  let errors = progress.errors;
  if (!correct) {
    errors = { ...errors };
    for (const tag of errorTags) {
      const e = errors[tag];
      errors[tag] = { count: (e?.count ?? 0) + 1, lastAt: now.toISOString() };
    }
  }
  return { ...progress, skills, errors };
}

/** A lesson is complete once every stage with real content has been both opened and (where it has questions) answered through. While a lesson is `audio-pending`, completion means every stage was opened. */
export function isLessonComplete(lesson: Lesson, record: ListeningLessonRecord | undefined): boolean {
  if (!record) return false;
  return lesson.stages.every((s) => record.stagesCompleted.includes(s.id));
}

export function isModuleComplete(module: Module, progress: ListeningProgress): boolean {
  return module.lessons.length > 0 && module.lessons.every((l) => isLessonComplete(l, progress.lessons[l.id]));
}

/**
 * Mastery levels with fixed, documented criteria (brief §9: "not arbitrary
 * progress percentages"). Levels above `'recognition'` require modules that
 * have no lessons yet, so they are unreachable until that content ships —
 * which is correct: nobody should be told they have "Complex Listening"
 * mastery from Sound Gym alone.
 */
export type MasteryLevel = 'foundation' | 'recognition' | 'comprehension' | 'complex-listening' | 'ielts-performance';

export const MASTERY_CRITERIA: Record<MasteryLevel, string> = {
  foundation: 'Starting point for every learner.',
  recognition: 'All 6 Sound Gym lessons completed.',
  comprehension: 'Recognition, plus the Speech Decoder module completed.',
  'complex-listening': 'Comprehension, plus Conversation Intelligence and Academic Mind completed.',
  'ielts-performance': 'Complex Listening, plus IELTS Transfer Zone completed.',
};

export function masteryLevel(progress: ListeningProgress, modules: Module[] = LISTENING_MODULES): MasteryLevel {
  const byId = (id: string) => modules.find((m) => m.id === id)!;
  const recognition = isModuleComplete(byId('sound-gym'), progress);
  if (!recognition) return 'foundation';
  const comprehension = isModuleComplete(byId('speech-decoder'), progress);
  if (!comprehension) return 'recognition';
  const complex = isModuleComplete(byId('conversation-intelligence'), progress) && isModuleComplete(byId('academic-mind'), progress);
  if (!complex) return 'comprehension';
  const ielts = isModuleComplete(byId('ielts-transfer-zone'), progress);
  return ielts ? 'ielts-performance' : 'complex-listening';
}

/** Skills with 3+ attempts and under 70% accuracy — "which skills are still weak" (brief §10). */
export function weakSkills(progress: ListeningProgress, minAttempts = 3): { skillTag: string; accuracy: number; attempts: number }[] {
  return Object.entries(progress.skills)
    .filter(([, s]) => s.attempts >= minAttempts && s.correct / s.attempts < 0.7)
    .map(([skillTag, s]) => ({ skillTag, accuracy: s.correct / s.attempts, attempts: s.attempts }))
    .sort((a, b) => a.accuracy - b.accuracy);
}

/** The most frequent error tags, newest-first on ties — "what mistakes do I repeatedly make" (brief §10). */
export function topErrors(progress: ListeningProgress, n = 3): { code: string; count: number; lastAt: string }[] {
  return Object.entries(progress.errors)
    .map(([code, e]) => ({ code, ...e }))
    .sort((a, b) => b.count - a.count || b.lastAt.localeCompare(a.lastAt))
    .slice(0, n);
}

/**
 * The next lesson to recommend. A first-time learner (no progress at all)
 * gets Sound Gym's first lesson — a sensible default, not a fabricated
 * "personalised" pick (brief §10). Once Sound Gym is finished, the next
 * module is recommended even while it has no lessons yet, so the learner
 * is told the truth ("in development") instead of nothing.
 */
export function recommendedNext(progress: ListeningProgress, modules: Module[] = LISTENING_MODULES): { module: Module; lesson?: Lesson } {
  for (const module of modules) {
    if (module.lessons.length === 0) return { module };
    const next = module.lessons.find((l) => !isLessonComplete(l, progress.lessons[l.id]));
    if (next) return { module, lesson: next };
  }
  return { module: modules[modules.length - 1] };
}

/** Resumable position: the learner's in-progress lesson, if its stage still exists. */
export function continueLearning(progress: ListeningProgress): { lessonId: string; stageId: string } | undefined {
  const ip = progress.inProgress;
  if (!ip) return undefined;
  return findLesson(ip.lessonId)?.lesson.stages.some((s) => s.id === ip.stageId) ? { lessonId: ip.lessonId, stageId: ip.stageId } : undefined;
}

export function totalMinutesPracticed(progress: ListeningProgress): number {
  return Object.values(progress.days).reduce((sum, d) => sum + d.minutesPracticed, 0);
}

export function lessonsCompletedCount(progress: ListeningProgress, modules: Module[] = LISTENING_MODULES): number {
  return modules.flatMap((m) => m.lessons).filter((l) => isLessonComplete(l, progress.lessons[l.id])).length;
}

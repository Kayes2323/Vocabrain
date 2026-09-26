// Foundation learning engine: progress, adaptive path, answer/mistake
// tracking, concept review and daily plan. Pure functions over the student's
// stored FoundationProgress, so every number shown comes from real data.
import { localDateKey } from '@/lib/engine/dates';
import type { FoundationDiagnosticRecord, FoundationMistake, FoundationProgress, UserProfile } from '@/lib/models';
import { CONCEPTS, findLesson, LEVELS, MODULES } from './content';
import { CONCEPT_PATTERN, patternModules, POS_NAMED_PATTERNS } from './content/pos-patterns';
import { expectedAnswer, posPairs } from './grade';
import type { ErrorTag, Exercise, FoundationSkill, Lesson, Module, Pos, Unit } from './model';

export const MAX_MISTAKES = 150;
/** Mistakes on one concept within this window (since its last passed review) that trigger a review. */
export const REVIEW_THRESHOLD = 3;
export const REVIEW_WINDOW_DAYS = 14;
export const REVIEW_QUESTIONS = 5;
export const QUIZ_QUESTIONS = 8;
/** Score that passes a lesson test, review or quiz. */
export const PASS_SCORE = 80;

export type LessonOutcome = 'strong' | 'good' | 'practice';

/** ≥80: move on · 60–79: good, review the misses · <60: a little more practice. */
export function lessonOutcome(score: number): LessonOutcome {
  return score >= PASS_SCORE ? 'strong' : score >= 60 ? 'good' : 'practice';
}

export const lessonTotal = (m: Module) => m.lessons.length + (m.planned?.length ?? 0);
export const lessonsDone = (m: Module, fp: FoundationProgress) => m.lessons.filter((l) => fp.lessons[l.id]).length;
export const isComingSoon = (m: Module) => m.lessons.length === 0 && !m.href;
const skippedSet = (fp: FoundationProgress) => new Set(fp.diagnostic?.skippedLessons ?? []);

/** 0–100: completed lessons (and lessons skipped after the check) over all lessons, written and planned. */
export function moduleProgress(m: Module, fp: FoundationProgress): number {
  const total = lessonTotal(m);
  const skipped = skippedSet(fp);
  const done = m.lessons.filter((l) => fp.lessons[l.id] || skipped.has(l.id)).length;
  return total ? Math.round((done / total) * 100) : 0;
}

export function levelProgress(level: number, fp: FoundationProgress): number {
  const mods = MODULES.filter((m) => m.level === level);
  const skipped = skippedSet(fp);
  const total = mods.reduce((s, m) => s + lessonTotal(m), 0);
  const done = mods.reduce((s, m) => s + m.lessons.filter((l) => fp.lessons[l.id] || skipped.has(l.id)).length, 0);
  return total ? Math.round((done / total) * 100) : 0;
}

/** A strong check lets the student skip the basic lessons (they stay open for review). */
export const testedOutOfFoundation = (fp: FoundationProgress) => fp.diagnostic?.level === 'strong';

export interface SkillProgress {
  skill: FoundationSkill;
  /** 0–100, or null when no lessons exist yet for this skill. */
  percent: number | null;
  done: number;
  total: number;
}

/** Progress per skill: completed (or skipped-after-check) lessons / all lessons for that skill (written + planned). */
export function skillProgress(fp: FoundationProgress): SkillProgress[] {
  const skills: FoundationSkill[] = ['grammar', 'vocabulary', 'listening', 'reading', 'writing', 'speaking'];
  const skipped = skippedSet(fp);
  return skills.map((skill) => {
    let total = 0;
    let done = 0;
    let written = 0;
    for (const m of MODULES) {
      for (const l of m.lessons) {
        if (l.skill !== skill) continue;
        total++;
        written++;
        if (fp.lessons[l.id] || skipped.has(l.id)) done++;
      }
      if (m.skill === skill) total += m.planned?.length ?? 0;
    }
    return { skill, done, total, percent: written ? Math.round((done / total) * 100) : null };
  });
}

// ---------------------------------------------------------------- lessons

export function allLessons(): { module: Module; lesson: Lesson; index: number }[] {
  return MODULES.flatMap((module) => module.lessons.map((lesson, index) => ({ module, lesson, index })));
}

export type LessonState = 'done' | 'skipped' | 'available' | 'locked';

/**
 * A lesson opens when its prerequisites (by default the previous lesson in the
 * module) are done or were skipped after the check. Completed and skipped
 * lessons always stay open for review.
 */
/** The previous lesson in the module, or in the same unit when the module has units. */
function defaultPrereqs(module: Module, lesson: Lesson): string[] {
  const pool = lesson.unit ? module.lessons.filter((l) => l.unit === lesson.unit) : module.lessons;
  const index = pool.indexOf(lesson);
  return index > 0 ? [pool[index - 1].id] : [];
}

export function lessonState(module: Module, lesson: Lesson, fp: FoundationProgress): LessonState {
  if (fp.lessons[lesson.id]) return 'done';
  const skipped = skippedSet(fp);
  if (skipped.has(lesson.id)) return 'skipped';
  const prereqs = lesson.prerequisites ?? defaultPrereqs(module, lesson);
  const open = prereqs.every((id) => fp.lessons[id] || skipped.has(id));
  return open || fp.inProgress?.lessonId === lesson.id ? 'available' : 'locked';
}

const moduleOf = (lessonId: string) => MODULES.find((m) => m.lessons.some((l) => l.id === lessonId));

/** Recommended module to start with (the module of the adaptive start lesson). */
export function recommendedModule(fp: FoundationProgress): Module | undefined {
  const start = fp.diagnostic?.startLessonId;
  return start ? moduleOf(start) : fp.diagnostic ? MODULES[0] : undefined;
}

/**
 * The next lesson: an unfinished lesson in progress, else the first open lesson
 * not yet done in the recommended module, then the course in order.
 */
export function nextLesson(fp: FoundationProgress): { module: Module; lesson: Lesson } | undefined {
  if (fp.inProgress) {
    const m = moduleOf(fp.inProgress.lessonId);
    const lesson = m?.lessons.find((l) => l.id === fp.inProgress!.lessonId);
    if (m && lesson) return { module: m, lesson };
  }
  const rec = recommendedModule(fp);
  const ordered = [...(rec ? [rec] : []), ...MODULES.filter((m) => m !== rec)];
  for (const module of ordered) {
    const lesson = module.lessons.find((l) => lessonState(module, l, fp) === 'available');
    if (lesson) return { module, lesson };
  }
  return undefined;
}

// ---------------------------------------------------------------- guidance
// "Guide, don't block": nothing is locked. These only say which recommended
// step comes first, so the UI can show a friendly reminder.

/**
 * The recommended lesson to do before opening `target`, when the student is
 * jumping ahead of the path. Modules with nothing to study yet never ask.
 */
export function stepBeforeModule(target: Module, fp: FoundationProgress): { module: Module; lesson: Lesson } | undefined {
  if (isComingSoon(target)) return undefined;
  const next = nextLesson(fp);
  if (!next || next.module.id === target.id) return undefined;
  return MODULES.indexOf(target) > MODULES.indexOf(next.module) ? next : undefined;
}

/** The recommended lesson to do before `lesson`, when its prerequisites are not done yet. */
export function stepBeforeLesson(module: Module, lesson: Lesson, fp: FoundationProgress): Lesson | undefined {
  if (lessonState(module, lesson, fp) !== 'locked') return undefined;
  const skipped = skippedSet(fp);
  const index = module.lessons.indexOf(lesson);
  const prereqs = lesson.prerequisites ?? (index > 0 ? [module.lessons[index - 1].id] : []);
  const missing = prereqs.find((id) => !fp.lessons[id] && !skipped.has(id));
  const first = module.lessons.find((l) => (!lesson.unit || l.unit === lesson.unit) && lessonState(module, l, fp) === 'available');
  return first ?? (missing ? findLesson(missing)?.lesson : undefined);
}

// ---------------------------------------------------------------- answers

const today = (now: Date) => localDateKey(now);

function bumpDay(fp: FoundationProgress, now: Date, patch: Partial<Record<'lessons' | 'questions' | 'correct' | 'reviews' | 'quizzes', number>>) {
  const key = today(now);
  const d = fp.days[key] ?? { lessons: 0, questions: 0, correct: 0 };
  const next = { ...d };
  for (const [k, v] of Object.entries(patch) as [keyof typeof next, number][]) next[k] = (next[k] ?? 0) + v;
  return { ...fp.days, [key]: next };
}

export interface AnswerEvent {
  /** Lesson id, "diagnostic", "review:<concept>", "quiz:<module>". */
  source: string;
  exercise: Exercise;
  answer: string;
  /** null = self-checked writing. */
  correct: boolean | null;
  attempt: number;
  now?: Date;
}

/** Records one answer: today's counters, concept accuracy and, when wrong, the full mistake. */
export function recordAnswer(fp: FoundationProgress, e: AnswerEvent): FoundationProgress {
  const now = e.now ?? new Date();
  const at = now.toISOString();
  const graded = e.correct !== null;
  let next: FoundationProgress = { ...fp, days: bumpDay(fp, now, { questions: 1, correct: e.correct ? 1 : 0 }) };
  const c = e.exercise.concept;
  if (c && graded) {
    const prev = fp.concepts[c] ?? { attempts: 0, correct: 0, lastAt: at };
    const recall = e.exercise.type === 'gap' || e.exercise.type === 'correct' || (e.exercise.type === 'spot' && !e.exercise.fixOptions);
    next = {
      ...next,
      concepts: {
        ...fp.concepts,
        [c]: {
          ...prev,
          attempts: prev.attempts + 1,
          correct: prev.correct + (e.correct ? 1 : 0),
          lastAt: at,
          ...(recall ? { recallAttempts: (prev.recallAttempts ?? 0) + 1, recallCorrect: (prev.recallCorrect ?? 0) + (e.correct ? 1 : 0) } : {}),
        },
      },
    };
  }
  if (e.correct === false) {
    const ex = e.exercise;
    const pairs = posPairs(ex, e.answer);
    const mistake: FoundationMistake = {
      at,
      source: e.source,
      questionId: ex.id,
      questionType: ex.type,
      prompt: (ex.sentence ?? (ex.type === 'spot' ? ex.words.join(' ') : ex.prompt.en)).slice(0, 160),
      answer: e.answer.slice(0, 160),
      correctAnswer: expectedAnswer(ex).slice(0, 160),
      tag: ex.tag,
      ...(c ? { concept: c } : {}),
      ...(pairs.length ? { pos: pairs } : {}),
      ...(ex.family ? { family: ex.family } : {}),
      ...(exercisePattern(ex) ? { pattern: exercisePattern(ex) } : {}),
      attempt: e.attempt,
    };
    next = {
      ...next,
      mistakes: [...fp.mistakes, mistake].slice(-MAX_MISTAKES),
      errors: addErrors(fp.errors, [ex.tag], at),
    };
  }
  return next;
}

export function addErrors(errors: FoundationProgress['errors'], tags: ErrorTag[], at: string): FoundationProgress['errors'] {
  const next = { ...errors };
  for (const tag of tags) next[tag] = { count: (next[tag]?.count ?? 0) + 1, lastAt: at };
  return next;
}

/** Saves where the student is in a lesson, so a refresh or another device resumes it. */
export function saveInProgress(
  fp: FoundationProgress,
  lessonId: string,
  page: number,
  answers: NonNullable<FoundationProgress['inProgress']>['answers'],
  attempt: number,
  now = new Date(),
): FoundationProgress {
  return { ...fp, inProgress: { lessonId, page, answers, attempt, updatedAt: now.toISOString() } };
}

/** Finishes a lesson: score, attempts, today's count; clears the resume point; schedules spaced review. */
export function completeLesson(fp: FoundationProgress, lessonId: string, score: number, now = new Date()): FoundationProgress {
  const prev = fp.lessons[lessonId];
  const { inProgress, ...rest } = fp;
  const concept = findLesson(lessonId)?.lesson.concept;
  const stats = concept ? fp.concepts[concept] : undefined;
  // First review the same day; a weak score restarts the schedule.
  const srs = concept && (!stats?.srs || score < 60) ? { stage: 0, dueAt: addDays(now, STAGE_DAYS[0]), passes: stats?.srs?.passes ?? 0 } : stats?.srs;
  return {
    ...rest,
    ...(concept && srs ? { concepts: { ...fp.concepts, [concept]: { ...(stats ?? { attempts: 0, correct: 0, lastAt: now.toISOString() }), srs } } } : {}),
    ...(inProgress && inProgress.lessonId !== lessonId ? { inProgress } : {}),
    lessons: {
      ...fp.lessons,
      [lessonId]: { completedAt: now.toISOString(), score, best: Math.max(score, prev?.best ?? 0), attempts: (prev?.attempts ?? 0) + 1 },
    },
    days: bumpDay(fp, now, { lessons: 1 }),
  };
}

/** Most frequent error categories, all time. */
export function topErrors(fp: FoundationProgress, n = 3): { tag: ErrorTag; count: number }[] {
  return Object.entries(fp.errors)
    .map(([tag, e]) => ({ tag: tag as ErrorTag, count: e.count }))
    .filter((e) => e.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

/** Modules that practise a tag (Level 1 first). */
export const modulesForTag = (tag: ErrorTag) => MODULES.filter((m) => m.tags.includes(tag)).sort((a, b) => a.level - b.level || a.number - b.number);

// ---------------------------------------------------------------- concepts & review

/** Mistakes on a concept since its last passed review, within the review window. */
export function recentConceptMistakes(fp: FoundationProgress, concept: string, now = new Date()): FoundationMistake[] {
  const since = Math.max(Date.parse(fp.concepts[concept]?.reviewedAt ?? '') || 0, now.getTime() - REVIEW_WINDOW_DAYS * 86_400_000);
  return fp.mistakes.filter((m) => m.concept === concept && Date.parse(m.at) > since);
}

/** Concepts with repeated recent mistakes, most mistakes first. */
export function reviewDue(fp: FoundationProgress, now = new Date()): { concept: string; count: number }[] {
  return CONCEPTS.map((c) => ({ concept: c.id, count: recentConceptMistakes(fp, c.id, now).length }))
    .filter((x) => x.count >= REVIEW_THRESHOLD)
    .sort((a, b) => b.count - a.count);
}

export type TopicStatus = 'strong' | 'weak' | 'review' | 'learning';

export interface TopicSummary {
  concept: string;
  attempts: number;
  accuracy: number;
  status: TopicStatus;
  recentMistakes: number;
}

/** Strong / weak / review topics, from real answers only (concepts with at least one graded answer). */
export function topicSummary(fp: FoundationProgress, now = new Date()): TopicSummary[] {
  const due = new Set(reviewDue(fp, now).map((d) => d.concept));
  return CONCEPTS.flatMap((c) => {
    const s = fp.concepts[c.id];
    if (!s || s.attempts === 0) return [];
    const accuracy = Math.round((s.correct / s.attempts) * 100);
    const status: TopicStatus = due.has(c.id) ? 'review' : s.attempts >= 5 && accuracy >= 80 ? 'strong' : s.attempts >= 3 && accuracy < 60 ? 'weak' : 'learning';
    return [{ concept: c.id, attempts: s.attempts, accuracy, status, recentMistakes: recentConceptMistakes(fp, c.id, now).length }];
  });
}

/**
 * Records a finished review. A pass clears the concept's recent mistakes and
 * moves the spaced-review schedule forward (same day → 1 → 3 → 7 → 14 → 30
 * days); a miss brings it back to tomorrow.
 */
export function recordReview(fp: FoundationProgress, concept: string, score: number, now = new Date()): FoundationProgress {
  const prev = fp.concepts[concept] ?? { attempts: 0, correct: 0, lastAt: now.toISOString() };
  const passed = score >= PASS_SCORE;
  const stage = prev.srs?.stage ?? 0;
  const nextStage = passed ? Math.min(stage + 1, STAGE_DAYS.length - 1) : 0;
  const srs = { stage: nextStage, dueAt: addDays(now, passed ? STAGE_DAYS[nextStage] : 1), passes: (prev.srs?.passes ?? 0) + (passed ? 1 : 0) };
  return {
    ...fp,
    concepts: { ...fp.concepts, [concept]: { ...prev, lastReviewScore: score, srs, ...(passed ? { reviewedAt: now.toISOString() } : {}) } },
    days: bumpDay(fp, now, { reviews: 1 }),
  };
}

/** Spaced-review intervals in days: same day (3 h), 1, 3, 7, 14, 30. */
export const STAGE_DAYS = [0.125, 1, 3, 7, 14, 30];
const addDays = (now: Date, days: number) => new Date(now.getTime() + days * 86_400_000).toISOString();

export type DueReview = { concept: string; reason: 'mistakes'; count: number } | { concept: string; reason: 'scheduled'; stage: number };

/** Everything due for review: repeated mistakes first, then scheduled spaced reviews. */
export function dueReviews(fp: FoundationProgress, now = new Date()): DueReview[] {
  const mistakes = reviewDue(fp, now).map((d): DueReview => ({ concept: d.concept, reason: 'mistakes', count: d.count }));
  const taken = new Set(mistakes.map((m) => m.concept));
  const scheduled = CONCEPTS.flatMap((c): DueReview[] => {
    const srs = fp.concepts[c.id]?.srs;
    return srs && !taken.has(c.id) && Date.parse(srs.dueAt) <= now.getTime() ? [{ concept: c.id, reason: 'scheduled', stage: srs.stage }] : [];
  });
  return [...mistakes, ...scheduled];
}

/** Records Mino's check of a personal sentence (application). A "needs work" result is stored as a mistake. */
export function recordApplication(
  fp: FoundationProgress,
  e: { source: string; exercise: Exercise; text: string; verdict: 'correct' | 'minor' | 'needs-work'; corrected: string; attempt: number; now?: Date },
): FoundationProgress {
  const now = e.now ?? new Date();
  const at = now.toISOString();
  const c = e.exercise.concept;
  let next = fp;
  if (c) {
    const prev = fp.concepts[c] ?? { attempts: 0, correct: 0, lastAt: at };
    next = { ...next, concepts: { ...fp.concepts, [c]: { ...prev, applied: (prev.applied ?? 0) + 1, appliedCorrect: (prev.appliedCorrect ?? 0) + (e.verdict === 'needs-work' ? 0 : 1), lastAt: at } } };
  }
  if (e.verdict === 'needs-work') {
    const mistake: FoundationMistake = {
      at, source: e.source, questionId: e.exercise.id, questionType: 'write',
      prompt: e.exercise.prompt.en.slice(0, 160), answer: e.text.slice(0, 160), correctAnswer: e.corrected.slice(0, 160),
      tag: e.exercise.tag, ...(c ? { concept: c } : {}), attempt: e.attempt,
    };
    next = { ...next, mistakes: [...next.mistakes, mistake].slice(-MAX_MISTAKES), errors: addErrors(next.errors, [e.exercise.tag], at) };
  }
  return next;
}

export type MasteryLevel = 'new' | 'learning' | 'practising' | 'mastered';

export interface Mastery {
  level: MasteryLevel;
  /** The four kinds of evidence, each from stored answers. */
  recognition: boolean;
  recall: boolean;
  application: boolean;
  consistency: boolean;
}

/**
 * Mastery is not "lesson completed": recognition (≥80% on 3+ choice answers),
 * recall (2+ correct typed answers), application (a personal sentence Mino
 * judged correct) and consistency (2+ passed spaced reviews).
 */
export function conceptMastery(fp: FoundationProgress, concept: string): Mastery {
  const s = fp.concepts[concept];
  if (!s || (s.attempts === 0 && !s.applied)) return { level: 'new', recognition: false, recall: false, application: false, consistency: false };
  const recN = s.attempts - (s.recallAttempts ?? 0);
  const recC = s.correct - (s.recallCorrect ?? 0);
  const recognition = recN >= 3 && recC / recN >= 0.8;
  const recall = (s.recallCorrect ?? 0) >= 2;
  const application = (s.appliedCorrect ?? 0) >= 1;
  const consistency = (s.srs?.passes ?? 0) >= 2;
  const level: MasteryLevel = recognition && recall && application && consistency ? 'mastered' : recognition && recall ? 'practising' : 'learning';
  return { level, recognition, recall, application, consistency };
}

export function recordQuiz(fp: FoundationProgress, now = new Date()): FoundationProgress {
  return { ...fp, days: bumpDay(fp, now, { quizzes: 1 }) };
}

const graded = (e: Exercise) => e.type !== 'write';

function seeded(seed: string) {
  let h = [...seed].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) >>> 0, 11);
  return () => ((h = (h * 1103515245 + 12345) >>> 0) % 100_000) / 100_000;
}

function shuffle<T>(items: T[], seed: string): T[] {
  const rand = seeded(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const allExercises = (lessons: Lesson[]) => lessons.flatMap((l) => l.steps.flatMap((s) => (s.kind === 'practice' ? s.exercises : [])));

/**
 * Review questions for a concept: up to two the student recently missed (a real
 * retest), topped up with others on the same concept. Stable within a day.
 */
export function reviewQuestions(fp: FoundationProgress, concept: string, now = new Date()): Exercise[] {
  const pool = allExercises(MODULES.flatMap((m) => m.lessons)).filter((e) => e.concept === concept && graded(e));
  const missedIds = new Set(recentConceptMistakes(fp, concept, now).map((m) => m.questionId));
  const missed = shuffle(pool.filter((e) => missedIds.has(e.id)), `${concept}:${today(now)}:m`).slice(0, 2);
  const rest = shuffle(pool.filter((e) => !missed.includes(e)), `${concept}:${today(now)}`);
  return shuffle([...missed, ...rest].slice(0, REVIEW_QUESTIONS), `${concept}:${today(now)}:order`);
}

/** A quiz over the lessons the student has finished in a module. */
export function quizQuestions(fp: FoundationProgress, module: Module, now = new Date()): Exercise[] {
  const done = module.lessons.filter((l) => fp.lessons[l.id] && l.kind !== 'test');
  return shuffle(allExercises(done).filter(graded), `${module.id}:${today(now)}`).slice(0, QUIZ_QUESTIONS);
}

export const canQuiz = (fp: FoundationProgress, module: Module) => quizQuestions(fp, module).length >= 5;

// ---------------------------------------------------------------- adaptive start

/** Lessons skipped after the check, and where the adaptive path starts. */
export function adaptiveStart(record: Pick<FoundationDiagnosticRecord, 'level' | 'areas' | 'concepts'>): { skippedLessons: string[]; startLessonId: string } {
  const [basics, tenses] = [MODULES.find((m) => m.id === 'sentence-basics')!, MODULES.find((m) => m.id === 'tenses')!];
  const concepts = record.concepts ?? {};
  const skipped: string[] = [];
  if (record.level !== 'needs') {
    // Sentence Basics: skip when sentence construction was solid.
    if (record.level === 'strong' || record.areas.sentence >= 75) skipped.push(...basics.lessons.map((l) => l.id));
    // Tenses: skip lessons whose concept the check proved; strong students also skip the intro.
    for (const l of tenses.lessons) {
      if (l.concept && concepts[l.concept] === true && record.level === 'strong') skipped.push(l.id);
      else if (l.concept && concepts[l.concept] === true && record.areas.grammar >= 67) skipped.push(l.id);
    }
    if (record.level === 'strong') skipped.push(tenses.lessons[0].id);
  }
  const skip = new Set(skipped);
  const start = [...basics.lessons, ...tenses.lessons].find((l) => !skip.has(l.id)) ?? tenses.lessons[0];
  return { skippedLessons: skipped, startLessonId: start.id };
}

// ---------------------------------------------------------------- journey

export const FOUNDATION_JOURNEY = ['check', 'grammar', 'vocabulary', 'ielts-basics', 'listening', 'reading', 'writing', 'speaking', 'practice', 'mock'] as const;
export type FoundationStageId = (typeof FOUNDATION_JOURNEY)[number];
export interface FoundationStage {
  id: FoundationStageId;
  state: 'done' | 'current' | 'locked';
  /** 0–100 for stages with lessons, else undefined. */
  progress?: number;
  /** No lessons written for this stage yet. */
  soon?: boolean;
}

/** The guided path: each stage opens only when the one before is done. */
export function foundationJourney(fp: FoundationProgress): FoundationStage[] {
  const skipped = skippedSet(fp);
  const grammarLessons = MODULES.filter((m) => m.level === 1 && m.skill === 'grammar').flatMap((m) => m.lessons);
  const grammarDone = grammarLessons.filter((l) => fp.lessons[l.id] || skipped.has(l.id)).length;
  const stageModules: Partial<Record<FoundationStageId, string>> = {
    vocabulary: 'vocabulary-foundation',
    'ielts-basics': 'ielts-intro',
    listening: 'listening-foundation',
    reading: 'reading-foundation',
    writing: 'writing-foundation',
    speaking: 'speaking-foundation',
  };
  const complete: Record<FoundationStageId, { done: boolean; progress?: number; soon?: boolean }> = {
    check: { done: Boolean(fp.diagnostic) },
    grammar: { done: grammarLessons.length > 0 && grammarDone === grammarLessons.length, progress: grammarLessons.length ? Math.round((grammarDone / grammarLessons.length) * 100) : 0 },
    vocabulary: { done: false },
    'ielts-basics': { done: false },
    listening: { done: false },
    reading: { done: false },
    writing: { done: false },
    speaking: { done: false },
    practice: { done: false },
    mock: { done: false },
  };
  for (const [stage, id] of Object.entries(stageModules) as [FoundationStageId, string][]) {
    const m = MODULES.find((x) => x.id === id);
    if (!m) continue;
    complete[stage] = { done: m.lessons.length > 0 && lessonsDone(m, fp) === m.lessons.length && !m.planned?.length, progress: moduleProgress(m, fp), soon: isComingSoon(m) };
  }
  let open = true;
  return FOUNDATION_JOURNEY.map((id) => {
    const c = complete[id];
    const state: FoundationStage['state'] = c.done && open ? 'done' : open ? 'current' : 'locked';
    if (!c.done) open = false;
    return { id, state, ...(c.progress !== undefined ? { progress: c.progress } : {}), ...(c.soon ? { soon: true } : {}) };
  });
}

// ---------------------------------------------------------------- daily goal & plan

export interface DailyGoal {
  lessons: number;
  questions: number;
  doneLessons: number;
  doneQuestions: number;
}

/** Small, achievable targets scaled to the student's weekly study time. */
export function dailyGoal(profile: Pick<UserProfile, 'ielts' | 'foundation'>, now = new Date()): DailyGoal {
  const hours = profile.ielts.weeklyStudyHours ?? 5;
  const [lessons, questions] = hours <= 3 ? [1, 10] : hours <= 7 ? [2, 15] : [2, 20];
  const d = profile.foundation.days[today(now)];
  return { lessons, questions, doneLessons: d?.lessons ?? 0, doneQuestions: d?.questions ?? 0 };
}

export type PlanItemKind = 'review' | 'lesson' | 'vocabulary' | 'quiz' | 'reading' | 'mino';

export interface PlanItem {
  kind: PlanItemKind;
  minutes: number;
  href: string;
  done: boolean;
  /** Lesson / concept / module id the item is about. */
  ref?: string;
}

export interface BrainCounts {
  total: number;
  due: number;
}

/**
 * Today's Foundation plan, highest priority first, trimmed to the student's
 * daily minutes so it stays achievable.
 */
export function foundationDailyPlan(profile: Pick<UserProfile, 'ielts' | 'foundation' | 'study'>, brain: BrainCounts, now = new Date()): PlanItem[] {
  const fp = profile.foundation;
  const key = today(now);
  const d = fp.days[key];
  const studyDone = new Set(profile.study.days[key]?.done ?? []);
  const budget = Math.max(20, Math.min(60, Math.round(((profile.ielts.weeklyStudyHours ?? 5) * 60) / 6)));
  const items: PlanItem[] = [];
  const due = dueReviews(fp, now)[0];
  if (due) items.push({ kind: 'review', minutes: due.reason === 'mistakes' ? 5 : 3, href: `/ielts/foundation/review/${due.concept}`, done: false, ref: due.concept });
  const next = nextLesson(fp);
  if (next) items.push({ kind: 'lesson', minutes: next.lesson.minutes, href: `/ielts/foundation/lesson/${next.lesson.id}`, done: Boolean(fp.lessons[next.lesson.id]) && localDateKey(new Date(fp.lessons[next.lesson.id].completedAt)) === key, ref: next.lesson.id });
  items.push(
    brain.total === 0
      ? { kind: 'vocabulary', minutes: 5, href: '/ielts/reading', done: studyDone.has('vocabulary') }
      : { kind: 'vocabulary', minutes: Math.min(10, Math.max(5, brain.due)), href: '/review', done: brain.due === 0 || studyDone.has('vocabulary') },
  );
  const quizModule = MODULES.find((m) => canQuiz(fp, m));
  if (quizModule) items.push({ kind: 'quiz', minutes: 10, href: `/ielts/foundation/quiz/${quizModule.id}`, done: (d?.quizzes ?? 0) > 0, ref: quizModule.id });
  items.push({ kind: 'reading', minutes: 10, href: '/ielts/reading', done: studyDone.has('reading') });
  if (fp.mistakes.length >= REVIEW_THRESHOLD) items.push({ kind: 'mino', minutes: 5, href: '/mino?ask=foundation-review', done: false });

  const plan: PlanItem[] = [];
  let used = 0;
  for (const item of items) {
    if (plan.length > 0 && used + item.minutes > budget) continue;
    plan.push(item);
    used += item.minutes;
  }
  return plan;
}

// ---------------------------------------------------------------- next action & Mino

export type NextAction =
  | { kind: 'check' }
  | { kind: 'resume'; lessonId: string }
  | { kind: 'review'; concept: string; count: number; reason: 'mistakes' | 'scheduled' }
  | { kind: 'lesson'; lessonId: string }
  | { kind: 'quiz'; moduleId: string }
  | { kind: 'done' };

/** The one obvious thing to do now. */
export function nextAction(fp: FoundationProgress, now = new Date()): NextAction {
  if (!fp.diagnostic && Object.keys(fp.lessons).length === 0 && fp.mistakes.length === 0 && !fp.inProgress) return { kind: 'check' };
  if (fp.inProgress && nextLesson(fp)) return { kind: 'resume', lessonId: fp.inProgress.lessonId };
  const due = dueReviews(fp, now)[0];
  if (due) return { kind: 'review', concept: due.concept, count: due.reason === 'mistakes' ? due.count : 0, reason: due.reason };
  const next = nextLesson(fp);
  if (next) return { kind: 'lesson', lessonId: next.lesson.id };
  const quiz = MODULES.find((m) => canQuiz(fp, m));
  return quiz ? { kind: 'quiz', moduleId: quiz.id } : { kind: 'done' };
}

/**
 * Plain-text summary of the student's real Foundation data for Mino. Every
 * number here is computed from stored answers; Mino must not add others.
 */
export function foundationSummaryLines(fp: FoundationProgress, now = new Date()): string[] {
  const lines: string[] = [];
  const done = Object.keys(fp.lessons).length;
  if (!fp.diagnostic && done === 0 && fp.mistakes.length === 0 && !fp.posFinal && !Object.keys(fp.finals ?? {}).length) {
    return ['- IELTS Foundation: not started (no foundation check, no lessons). For beginners or students unsure where to start, suggest the Foundation check.'];
  }
  const d = fp.diagnostic;
  const title = (id?: string) => (id ? (allLessons().find((x) => x.lesson.id === id)?.lesson.title.en ?? id) : '');
  lines.push(
    `- IELTS Foundation check: ${d ? `${d.completedAt.slice(0, 10)} → ${d.level} (${d.percent}%; ${Object.entries(d.areas).map(([a, p]) => `${a} ${p}%`).join(', ')})${d.skippedLessons?.length ? `; ${d.skippedLessons.length} lessons skipped after the check` : ''}` : 'not taken'}.`,
  );
  const next = nextLesson(fp);
  lines.push(
    `- Foundation progress: ${done} lessons completed; Level 1 ${levelProgress(1, fp)}%${fp.inProgress ? `; unfinished lesson "${title(fp.inProgress.lessonId)}"` : ''}${next ? `; next lesson "${next.lesson.title.en}" (${next.module.title.en})` : ''}.`,
  );
  const topics = topicSummary(fp, now);
  if (topics.length) {
    lines.push(`- Foundation topics (from real answers): ${topics.map((x) => `${x.concept} ${x.accuracy}% of ${x.attempts} [${x.status}${x.recentMistakes ? `, ${x.recentMistakes} recent mistakes` : ''}]`).join('; ')}.`);
  }
  const mastery = CONCEPTS.map((c) => [c.id, conceptMastery(fp, c.id)] as const).filter(([, m]) => m.level !== 'new');
  if (mastery.length) lines.push(`- Foundation mastery (recognition/recall/application/consistency): ${mastery.map(([id, m]) => `${id} ${m.level} [${[m.recognition, m.recall, m.application, m.consistency].map((x) => (x ? '✓' : '·')).join('')}]`).join('; ')}.`);
  const scheduled = dueReviews(fp, now).filter((d) => d.reason === 'scheduled');
  if (scheduled.length) lines.push(`- Spaced review due now: ${scheduled.map((d) => d.concept).join(', ')}.`);
  const due = reviewDue(fp, now);
  if (due.length) lines.push(`- Review due: ${due.map((x) => `${x.concept} (${x.count} mistakes in the last ${REVIEW_WINDOW_DAYS} days)`).join(', ')}. Suggest the 5-minute review at /ielts/foundation/review/<concept>.`);
  const errs = topErrors(fp, 4);
  if (errs.length) lines.push(`- Foundation mistake categories (all time): ${errs.map((e) => `${e.tag} ×${e.count}`).join(', ')}.`);
  const recent = fp.mistakes.slice(-5).reverse();
  if (recent.length) {
    lines.push(`- Latest Foundation mistakes: ${recent.map((m) => `"${m.prompt}" → answered "${m.answer}", correct "${m.correctAnswer}" (${m.concept ?? m.tag}, ${m.at.slice(0, 10)})`).join(' | ')}.`);
  }
  const t = fp.days[today(now)];
  lines.push(`- Foundation today: ${t ? `${t.lessons} lessons, ${t.questions} questions (${t.correct} correct)` : 'nothing yet'}.`);
  lines.push(...posSummaryLines(fp, now));
  for (const p of patternsFor(fp, 'tenses', now).filter((x) => !x.modules.includes('parts-of-speech')).slice(0, 2)) {
    lines.push(
      `- Open Tenses pattern: ${POS_NAMED_PATTERNS[p.pair].title.en} ×${p.count} in ${REVIEW_WINDOW_DAYS} days (latest: "${p.latest.prompt}" → answered "${p.latest.answer}", correct "${p.latest.correctAnswer}", ${p.latest.at.slice(0, 10)}). A 5-question fix is at /ielts/foundation/fix/${p.pair}.`,
    );
  }
  if (fp.finals?.tenses) {
    const f = fp.finals.tenses;
    lines.push(`- Tenses Final Mastery Challenge: last ${f.score}% (best ${f.best}%, ${f.attempts} attempt${f.attempts > 1 ? 's' : ''}, level reached ${f.level}/3, ${f.at.slice(0, 10)}).`);
  }
  return lines;
}

/** Open patterns whose fix belongs on a module's page. */
export const patternsFor = (fp: FoundationProgress, moduleId: string, now = new Date()) => posPatterns(fp, now).filter((p) => p.modules.includes(moduleId));

export { LEVELS };

// ---------------------------------------------------------------- parts of speech

export const PATTERN_THRESHOLD = 3;
export const FIX_QUESTIONS = 5;

export const pairKey = (expected: string, chosen: string) => `${expected}>${chosen}`;

/** The named pattern a question checks: its own, else its concept's (tagging never has one). */
export function exercisePattern(ex: Exercise): string | undefined {
  if (ex.pattern) return ex.pattern;
  if (ex.type === 'tag' || ex.type === 'write') return undefined;
  return ex.concept ? CONCEPT_PATTERN[ex.concept] : undefined;
}

export const isNamedPattern = (key: string) => key in POS_NAMED_PATTERNS;

export interface PosPattern {
  /** "expected>chosen" for a job pair, or a named pattern id ("sv-agreement"). */
  pair: string;
  /** Job pairs only. */
  expected?: Pos;
  chosen?: Pos;
  /** Named patterns only: the unit that teaches it. */
  unit?: string;
  /** Module pages that offer this fix; the first is its home. */
  modules: string[];
  count: number;
  /** The latest mistake with this pair (the student's own sentence). */
  latest: FoundationMistake;
}

/**
 * Open mistake patterns: the same "expected → chosen" pair 3+ times in the
 * last 14 days (after the last passed fix), or in the last two such mistakes.
 * One mistake is never a pattern.
 */
export function posPatterns(fp: FoundationProgress, now = new Date()): PosPattern[] {
  const since = now.getTime() - REVIEW_WINDOW_DAYS * 86_400_000;
  const keysOf = (m: FoundationMistake) => [...(m.pos ?? []).map((p) => pairKey(p.expected, p.chosen)), ...(m.pattern && isNamedPattern(m.pattern) ? [m.pattern] : [])];
  const withKeys = fp.mistakes.filter((m) => keysOf(m).length);
  const found = new Map<string, { count: number; latest: FoundationMistake }>();
  for (const m of withKeys) {
    const t = new Date(m.at).getTime();
    if (t < since) continue;
    for (const key of new Set(keysOf(m))) {
      const fixedAt = fp.posFixes?.[key];
      if (fixedAt && t <= new Date(fixedAt).getTime()) continue;
      const cur = found.get(key);
      found.set(key, { count: (cur?.count ?? 0) + 1, latest: m });
    }
  }
  // Two in a row (the last two mistakes that had a pattern) also count.
  const lastTwo = withKeys.slice(-2);
  const inRow = lastTwo.length === 2 ? keysOf(lastTwo[0]).filter((k) => keysOf(lastTwo[1]).includes(k)) : [];
  return [...found.entries()]
    .filter(([key, v]) => v.count >= PATTERN_THRESHOLD || (inRow.includes(key) && v.count >= 2))
    // Only confusions a full 5-question fix can practise (e.g. not jobs without a unit).
    .filter(([key]) => fixQuestions(fp, key, now).length >= FIX_QUESTIONS)
    .map(([pair, v]): PosPattern => {
      if (isNamedPattern(pair)) return { pair, unit: POS_NAMED_PATTERNS[pair].unit, modules: patternModules(pair), count: v.count, latest: v.latest };
      const [expected, chosen] = pair.split('>') as [Pos, Pos];
      return { pair, expected, chosen, modules: patternModules(pair), count: v.count, latest: v.latest };
    })
    .sort((a, b) => b.count - a.count || b.latest.at.localeCompare(a.latest.at));
}

const posExercises = () =>
  MODULES.filter((m) => m.units).flatMap((m) => allExercises(m.lessons)).filter(graded);

/**
 * A targeted fix: 5 questions on one confusion. First questions where the
 * wrong job is exactly the one the student keeps choosing, then the reverse
 * contrast, then any question on the expected job.
 */
export function fixQuestions(fp: FoundationProgress, pair: string, now = new Date()): Exercise[] {
  const pool = posExercises();
  if (isNamedPattern(pair)) {
    // Named patterns are taught across modules (e.g. verb form in Parts of Speech and Tenses).
    const own = allExercises(MODULES.flatMap((m) => m.lessons)).filter((e) => graded(e) && exercisePattern(e) === pair);
    return shuffle(own, `${pair}:${today(now)}`).slice(0, FIX_QUESTIONS);
  }
  const [expected, chosen] = pair.split('>');
  const exact = pool.filter((e) => e.pos === expected && Object.values(e.wrongPos ?? {}).includes(chosen as Pos));
  const tagged = pool.filter((e) => e.type === 'tag' && e.tokens.some((t) => t.pos === expected) && e.tokens.some((t) => t.pos === chosen));
  const reverse = pool.filter((e) => e.pos === chosen && Object.values(e.wrongPos ?? {}).includes(expected as Pos));
  const same = pool.filter((e) => e.pos === expected);
  // Jobs taught mostly through sentences (pronoun, preposition, conjunction): tagging and the unit's own questions.
  const taggedExpected = pool.filter((e) => e.type === 'tag' && e.tokens.some((t) => t.pos === expected));
  const unitConcept = MODULES.flatMap((m) => m.units ?? []).find((u) => u.pos === expected)?.concept;
  const unitPool = unitConcept ? pool.filter((e) => e.concept === unitConcept) : [];
  const seen = new Set<string>();
  const out: Exercise[] = [];
  for (const group of [exact, tagged, reverse, same, taggedExpected, unitPool]) {
    for (const e of shuffle(group, `${pair}:${today(now)}`)) {
      if (out.length >= FIX_QUESTIONS) break;
      if (!seen.has(e.id)) {
        seen.add(e.id);
        out.push(e);
      }
    }
  }
  return shuffle(out, `${pair}:${today(now)}:order`);
}

/** A passed fix (80%+) closes the pattern; older mistakes with that pair no longer count. */
export function recordFix(fp: FoundationProgress, pair: string, score: number, now = new Date()): FoundationProgress {
  const days = bumpDay(fp, now, { reviews: 1 });
  if (score < PASS_SCORE) return { ...fp, days };
  return { ...fp, days, posFixes: { ...(fp.posFixes ?? {}), [pair]: now.toISOString() } };
}

export type UnitStatus = 'new' | 'learning' | 'practising' | 'review' | 'mastered';

export const unitLessons = (module: Module, unit: Unit) => module.lessons.filter((l) => l.unit === unit.id);
export const unitLessonTotal = (module: Module, unit: Unit) => unitLessons(module, unit).length + (unit.planned?.length ?? 0);
export const unitLessonsDone = (module: Module, unit: Unit, fp: FoundationProgress) => unitLessons(module, unit).filter((l) => fp.lessons[l.id]).length;
export function unitProgress(module: Module, unit: Unit, fp: FoundationProgress): number {
  if (unit.challenge) return fp.posFinal?.best ?? 0;
  const total = unitLessonTotal(module, unit);
  return total ? Math.round((unitLessonsDone(module, unit, fp) / total) * 100) : 0;
}

/**
 * Status from real answers, never from opening a lesson:
 * review = an open mistake pattern on this job, a failed or overdue review;
 * mastered / practising come from the concept's four mastery checks.
 */
export function unitStatus(module: Module, unit: Unit, fp: FoundationProgress, now = new Date()): UnitStatus {
  if (unit.challenge) return !fp.posFinal ? 'new' : fp.posFinal.best >= PASS_SCORE ? 'mastered' : 'review';
  const lessons = unitLessons(module, unit);
  const started = lessons.some((l) => fp.lessons[l.id] || fp.inProgress?.lessonId === l.id);
  const stats = unit.concept ? fp.concepts[unit.concept] : undefined;
  if (!started && !stats) return 'new';
  const patterns = posPatterns(fp, now);
  const inPattern = patterns.some((p) => (unit.pos && (p.expected === unit.pos || p.chosen === unit.pos)) || p.unit === unit.id);
  const overdue = stats?.srs && new Date(stats.srs.dueAt).getTime() < now.getTime() - 3 * 86_400_000;
  const failedReview = stats?.lastReviewScore !== undefined && stats.lastReviewScore < PASS_SCORE;
  const needsReview = unit.concept ? reviewDue(fp, now).some((r) => r.concept === unit.concept) : false;
  if (inPattern || overdue || failedReview || needsReview) return 'review';
  const mastery = unit.concept ? conceptMastery(fp, unit.concept) : undefined;
  if (mastery?.level === 'mastered') return 'mastered';
  if (mastery?.level === 'practising') return 'practising';
  return 'learning';
}

export const UNIT_CHECK_QUESTIONS = 8;

/**
 * A unit check: 8 questions from the unit's finished lessons, with up to 3
 * recently missed ones first. Scored like a concept review (same SRS).
 */
export function unitCheckQuestions(fp: FoundationProgress, module: Module, unit: Unit, now = new Date()): Exercise[] {
  const pool = allExercises(unitLessons(module, unit).filter((l) => fp.lessons[l.id])).filter(graded);
  const missedIds = new Set(unit.concept ? recentConceptMistakes(fp, unit.concept, now).map((m) => m.questionId) : []);
  const missed = shuffle(pool.filter((e) => missedIds.has(e.id)), `unit:${unit.id}:${today(now)}:m`).slice(0, 3);
  const rest = shuffle(pool.filter((e) => !missed.includes(e)), `unit:${unit.id}:${today(now)}`);
  return shuffle([...missed, ...rest].slice(0, UNIT_CHECK_QUESTIONS), `unit:${unit.id}:${today(now)}:order`);
}

export const canUnitCheck = (fp: FoundationProgress, module: Module, unit: Unit) => Boolean(unit.concept) && unitCheckQuestions(fp, module, unit).length >= 5;

/** The next lesson in a unit: unfinished one in progress, else the first not done. */
export function unitNextLesson(module: Module, unit: Unit, fp: FoundationProgress): Lesson | undefined {
  const lessons = unitLessons(module, unit);
  return lessons.find((l) => fp.inProgress?.lessonId === l.id) ?? lessons.find((l) => !fp.lessons[l.id]);
}

const withArticle = (w: string) => `${/^[aeiou]/.test(w) ? 'an' : 'a'} ${w}`;

/** Lines for Mino: unit status with accuracy, open patterns with the student's own example, weak word families. */
export function posSummaryLines(fp: FoundationProgress, now = new Date()): string[] {
  const module = MODULES.find((m) => m.units);
  if (!module?.units) return [];
  const started = module.units.filter((u) => unitStatus(module, u, fp, now) !== 'new');
  if (started.length === 0) return [];
  const lines: string[] = [];
  const unitText = started.map((u) => {
    const s = u.concept ? fp.concepts[u.concept] : undefined;
    const acc = s && s.attempts ? ` (${Math.round((s.correct / s.attempts) * 100)}% of ${s.attempts})` : '';
    return `${u.title.en} ${unitStatus(module, u, fp, now)}${acc}`;
  });
  lines.push(`- Parts of Speech: ${started.length}/${module.units.length} units started; ${unitText.join('; ')}.`);
  for (const p of posPatterns(fp, now).slice(0, 3)) {
    const what = p.expected && p.chosen ? `chose ${withArticle(p.chosen)} where ${withArticle(p.expected)} was needed` : `${POS_NAMED_PATTERNS[p.pair].title.en} mistakes`;
    lines.push(
      `- Open Parts of Speech pattern: ${what} ×${p.count} in ${REVIEW_WINDOW_DAYS} days (latest: "${p.latest.prompt}" → answered "${p.latest.answer}", correct "${p.latest.correctAnswer}", ${p.latest.at.slice(0, 10)}). A 5-question fix is at /ielts/foundation/fix/${p.pair}.`,
    );
  }
  if (fp.posFinal) {
    const f = fp.posFinal;
    const weakParts = Object.entries(f.parts).filter(([, v]) => v.total && v.correct / v.total < 0.67).map(([k]) => k);
    lines.push(`- Final Mastery Challenge: last ${f.score}% (best ${f.best}%, ${f.attempts} attempt${f.attempts > 1 ? 's' : ''}, level reached ${f.level}/3, ${f.at.slice(0, 10)})${weakParts.length ? `; weaker parts: ${weakParts.join(', ')}` : ''}.`);
  }
  const since = now.getTime() - 30 * 86_400_000;
  const families = new Map<string, number>();
  for (const m of fp.mistakes) if (m.family && new Date(m.at).getTime() >= since) families.set(m.family, (families.get(m.family) ?? 0) + 1);
  if (families.size) lines.push(`- Word families missed (30 days): ${[...families.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([f, n]) => `${f} ×${n}`).join(', ')}.`);
  return lines;
}

// ---------------------------------------------------------------- final mastery challenge

export const FINAL_PER_PART = 3;
export type FinalLevel = 1 | 2 | 3;

/** Where the adaptive challenge starts: from the student's accuracy on the challenge's concepts (default: Parts of Speech). */
export function finalStartLevel(fp: FoundationProgress, concepts?: string[]): FinalLevel {
  const module = MODULES.find((m) => m.units);
  const ids = concepts ?? (module?.units ?? []).flatMap((u) => (u.concept ? [u.concept] : []));
  const stats = ids.flatMap((c) => (fp.concepts[c] ? [fp.concepts[c]] : []));
  const attempts = stats.reduce((n, s) => n + s.attempts, 0);
  if (attempts < 20) return 2;
  const acc = stats.reduce((n, s) => n + s.correct, 0) / attempts;
  return acc >= 0.85 ? 3 : acc < 0.6 ? 1 : 2;
}

/** The latest result of a challenge ("pos" lives in posFinal, others in finals). */
export const finalRecord = (fp: FoundationProgress, id = 'pos') => (id === 'pos' ? fp.posFinal : fp.finals?.[id]);

/** Right → one level harder, wrong → one level easier. */
export const nextFinalLevel = (level: FinalLevel, correct: boolean): FinalLevel => (correct ? Math.min(3, level + 1) : Math.max(1, level - 1)) as FinalLevel;

/** The unused item closest to the current level (easier first on a tie); order varies by seed. */
export function pickFinalItem<T extends { id: string; level: FinalLevel }>(items: T[], level: FinalLevel, used: Set<string>, seed: string): T | undefined {
  const free = shuffle(items.filter((i) => !used.has(i.id)), seed);
  return free.sort((a, b) => Math.abs(a.level - level) - Math.abs(b.level - level) || a.level - b.level)[0];
}

export function recordFinal(
  fp: FoundationProgress,
  r: { score: number; level: FinalLevel; parts: Record<string, { correct: number; total: number }> },
  now = new Date(),
  id = 'pos',
): FoundationProgress {
  const prev = finalRecord(fp, id);
  const rec = { at: now.toISOString(), score: r.score, best: Math.max(prev?.best ?? 0, r.score), attempts: (prev?.attempts ?? 0) + 1, level: r.level, parts: r.parts };
  const days = bumpDay(fp, now, { quizzes: 1 });
  return id === 'pos' ? { ...fp, days, posFinal: rec } : { ...fp, days, finals: { ...(fp.finals ?? {}), [id]: rec } };
}

// ---------------------------------------------------------------- lab: your own mistakes first

export const OWN_MISTAKES_MAX = 8;

/** Questions the student got wrong in Parts of Speech in the last 14 days (newest first, each once). */
export function ownMistakeQuestions(fp: FoundationProgress, now = new Date()): Exercise[] {
  const since = now.getTime() - REVIEW_WINDOW_DAYS * 86_400_000;
  const pool = new Map(posExercises().map((e) => [e.id, e]));
  const out: Exercise[] = [];
  for (const m of [...fp.mistakes].reverse()) {
    if (out.length >= OWN_MISTAKES_MAX || new Date(m.at).getTime() < since) break;
    const e = pool.get(m.questionId);
    if (e && !out.includes(e)) out.push(e);
  }
  return out;
}

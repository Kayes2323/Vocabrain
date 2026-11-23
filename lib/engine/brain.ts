import type { BrainWord, RecallAttempt, RecallExercise, RecallRating, RecallSnapshot, UsageAttempt, WordInfo, WordSource, WordStatus } from '@/lib/models';
import type { Verdict as MinoVerdict } from '@/lib/mino-eval/types';

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Spaced review: a saved word gets a first quick recall straight away, then
 * reviews after 1, 3, 7, 14, 30 and 60 days. Each successful recall moves it
 * one step; a failure sends it back to tomorrow.
 */
export const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 60] as const;
export const MAX_STAGE = REVIEW_INTERVAL_DAYS.length;
const HISTORY_LIMIT = 20;

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  return new Date(startOfDay(date).getTime() + days * DAY_MS);
}

export function wordId(lemma: string): string {
  return lemma.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '') || 'word';
}

export function deriveStatus(w: Pick<BrainWord, 'stage' | 'recallCount' | 'writingUsageCount' | 'speakingUsageCount'>): WordStatus {
  const used = w.writingUsageCount + w.speakingUsageCount;
  if (w.stage >= 5 && w.writingUsageCount > 0 && w.speakingUsageCount > 0) return 'mastered';
  if (w.stage >= 4 && used > 0) return 'strong';
  if (w.stage >= 2 && used > 0) return 'active';
  if (w.stage >= 2) return 'recalling';
  if (w.recallCount > 0) return 'learning';
  return 'new';
}

/**
 * Confidence 0–100 from real recalls: recent accuracy (last 5) weighs 60%,
 * memory stage 40%. 0 until the first recall.
 */
export function wordConfidence(w: Pick<BrainWord, 'stage' | 'recallCount' | 'recallHistory'>): number {
  if (w.recallCount === 0) return 0;
  const recent = w.recallHistory.slice(-5);
  const accuracy = recent.length ? recent.filter((r) => r.correct).length / recent.length : 0;
  return Math.round(accuracy * 60 + (w.stage / MAX_STAGE) * 40);
}

function withStatus(w: BrainWord): BrainWord {
  return { ...w, status: deriveStatus(w), confidence: wordConfidence(w) };
}

/** A word the student keeps getting wrong. */
export const isWeakWord = (w: BrainWord) =>
  w.consecutiveFailures > 0 || (w.recallCount >= 3 && w.successfulRecallCount / w.recallCount < 0.5);

export function createBrainWord(info: WordInfo, source: WordSource, originalSentence: string | undefined, now = new Date()): BrainWord {
  const iso = now.toISOString();
  return withStatus({
    id: wordId(info.lemma),
    word: info.word,
    lemma: info.lemma,
    source,
    originalSentence,
    meaning: info.meaning,
    meaningBn: info.meaningBn,
    partOfSpeech: info.partOfSpeech,
    synonyms: info.synonyms,
    antonyms: info.antonyms,
    collocations: info.collocations,
    exampleSentence: info.exampleSentence,
    ...(info.acceptedAnswers?.length ? { acceptedAnswers: info.acceptedAnswers } : {}),
    status: 'new',
    createdAt: iso,
    updatedAt: iso,
    stage: 0,
    // Due immediately: a first quick recall on the day of the encounter.
    nextReviewAt: iso,
    recallCount: 0,
    successfulRecallCount: 0,
    consecutiveFailures: 0,
    writingUsageCount: 0,
    speakingUsageCount: 0,
    recallHistory: [],
    usageHistory: [],
  });
}

export function isDue(w: BrainWord, now = new Date()): boolean {
  return new Date(w.nextReviewAt).getTime() <= now.getTime();
}

/** Words due for review, failed-last-time first, then oldest due. */
export function dueWords(words: BrainWord[], now = new Date()): BrainWord[] {
  return words
    .filter((w) => isDue(w, now))
    .sort((a, b) => b.consecutiveFailures - a.consecutiveFailures || a.nextReviewAt.localeCompare(b.nextReviewAt));
}

/**
 * Adaptive spacing. Correct: next interval (1, 3, 7, 14, 30, 60 days), and 1.5×
 * longer when the last three recalls were all right or the student rated it
 * Easy; half the interval when it felt Hard. Wrong (or Again): back to stage 0
 * and tomorrow — or in 4 hours when it is the second failure in a row.
 */
export function nextReviewDate(w: Pick<BrainWord, 'recallHistory' | 'consecutiveFailures'>, stage: number, correct: boolean, now: Date, rating?: RecallRating): Date {
  if (!correct) return w.consecutiveFailures + 1 >= 2 ? new Date(now.getTime() + 4 * 3_600_000) : addDays(now, 1);
  const base = REVIEW_INTERVAL_DAYS[Math.min(Math.max(stage, 1), MAX_STAGE) - 1];
  if (rating === 'hard') return addDays(now, Math.max(1, Math.round(base / 2)));
  const streak = w.recallHistory.slice(-2).filter((r) => r.correct).length === 2;
  const good = stage >= 3 && streak ? base * 1.5 : base;
  return addDays(now, Math.round(rating === 'easy' ? good * 1.5 : good));
}

/**
 * A recall's outcome: a plain success/failure, or `'partial'` for an answer
 * Mino judged partially correct — not a success, but not a plain miss either.
 */
export type RecallOutcome = boolean | 'partial';

/**
 * A Mino verdict, as the signal {@link applyRecall} should schedule on. `'uncertain'` (Mino's
 * `unable_to_evaluate` — an empty, gibberish or unreadable answer Mino genuinely could not judge)
 * is deliberately NOT a {@link RecallOutcome}: it is not a verified result, so it must never reach
 * `applyRecall` at all. A caller that gets `'uncertain'` back skips the Brain write entirely —
 * the attempt is neither a success nor a failure, and the learner is asked to try again, never
 * silently marked wrong for an answer Mino could not actually read.
 */
export function recallOutcomeFromVerdict(verdict: MinoVerdict): RecallOutcome | 'uncertain' {
  if (verdict === 'correct') return true;
  if (verdict === 'partially_correct') return 'partial';
  if (verdict === 'unable_to_evaluate') return 'uncertain';
  return false;
}

/**
 * One recall. The answer's correctness is the main signal; a rating (when the
 * student gives one) only tunes the spacing: Again counts as not recalled,
 * Hard keeps the word at its current step, Easy stretches the next interval.
 *
 * A `'partial'` outcome (Mino judged the answer partially correct) is never
 * scheduled like a full success — it never advances the stage or counts as a
 * successful recall — but it is also not treated like a flat miss: the stage
 * is kept rather than reset to 0, and it does not extend the failure streak
 * that triggers the steeper same-day backoff, since some of the answer was
 * genuinely retained.
 */
export function applyRecall(w: BrainWord, exercise: RecallExercise, correctAnswer: RecallOutcome, answer: string | undefined, now = new Date(), rating?: RecallRating, attemptId?: string): BrainWord {
  // The same card recorded twice (a retry after a slow save, a double tap) is one attempt.
  if (attemptId && w.recallHistory.some((a) => a.id === attemptId)) return w;
  const partial = correctAnswer === 'partial';
  const correct = correctAnswer === true && rating !== 'again';
  // An answer recorded without a rating keeps what it needs to take a rating later, exactly.
  const before: RecallSnapshot | undefined = rating
    ? undefined
    : { stage: w.stage, nextReviewAt: w.nextReviewAt, ...(w.lastReviewedAt ? { lastReviewedAt: w.lastReviewedAt } : {}), recallCount: w.recallCount, successfulRecallCount: w.successfulRecallCount, consecutiveFailures: w.consecutiveFailures };
  const stage = !correct ? (partial ? w.stage : 0) : rating === 'hard' ? Math.max(w.stage, 1) : Math.min(w.stage + 1, MAX_STAGE);
  return withStatus({
    ...w,
    stage,
    nextReviewAt: nextReviewDate(w, stage, correct, now, rating).toISOString(),
    lastReviewedAt: now.toISOString(),
    updatedAt: now.toISOString(),
    recallCount: w.recallCount + 1,
    successfulRecallCount: w.successfulRecallCount + (correct ? 1 : 0),
    consecutiveFailures: correct ? 0 : partial ? w.consecutiveFailures : w.consecutiveFailures + 1,
    recallHistory: [
      ...w.recallHistory,
      {
        ...(attemptId ? { id: attemptId } : {}),
        at: now.toISOString(),
        exercise,
        correct,
        ...(partial ? { partial: true } : {}),
        answer: answer?.slice(0, 200),
        ...(rating ? { rating, ratedAt: now.toISOString() } : {}),
        ...(before ? { before } : {}),
      },
    ].slice(-HISTORY_LIMIT),
  });
}

/**
 * The learner's self-rating for an answer that was already recorded. Applied
 * to the latest attempt it gives exactly the schedule the rating would have
 * given together with the answer; it is a no-op for an attempt that is already
 * rated, unknown, or no longer the latest (the rating is then only noted).
 */
export function applyRating(w: BrainWord, attemptId: string, rating: RecallRating, now = new Date()): BrainWord {
  const index = w.recallHistory.findIndex((a) => a.id === attemptId);
  if (index < 0) return w;
  const attempt: RecallAttempt = w.recallHistory[index];
  if (attempt.rating) return w;
  const isLatest = index === w.recallHistory.length - 1;
  if (!isLatest || !attempt.before) {
    return { ...w, recallHistory: w.recallHistory.map((a, i) => (i === index ? { ...stripBefore(a), rating, ratedAt: now.toISOString() } : a)), updatedAt: now.toISOString() };
  }
  const restored: BrainWord = { ...w, ...attempt.before, recallHistory: w.recallHistory.slice(0, -1) };
  const reapplied = applyRecall(restored, attempt.exercise, true, attempt.answer, new Date(attempt.at), rating, attemptId);
  return { ...reapplied, updatedAt: now.toISOString() };
}

function stripBefore(a: RecallAttempt): RecallAttempt {
  const { before: _before, ...rest } = a;
  void _before;
  return rest;
}

/** Answered but not rated: the attempt is stored and counts; only the self-rating is missing. */
export const isUnrated = (a: RecallAttempt) => !a.rating;

export function applyUsage(w: BrainWord, attempt: Omit<UsageAttempt, 'at'>, now = new Date()): BrainWord {
  return withStatus({
    ...w,
    updatedAt: now.toISOString(),
    writingUsageCount: w.writingUsageCount + (attempt.mode === 'writing' && attempt.correct ? 1 : 0),
    speakingUsageCount: w.speakingUsageCount + (attempt.mode === 'speaking' && attempt.correct ? 1 : 0),
    usageHistory: [...w.usageHistory, { ...attempt, text: attempt.text.slice(0, 600), at: now.toISOString() }].slice(-10),
  });
}

/**
 * Recall formats for each memory stage: first recognise the meaning, then
 * recall the English word from Bangla, then find it in a sentence, then
 * connect it to synonyms, and only once it is well known, use it yourself.
 */
export const STAGE_FORMATS: RecallExercise[][] = [
  ['choice', 'meaning'],
  ['recall-en', 'meaning'],
  ['context', 'completion', 'recall-en'],
  ['synonym', 'completion', 'recall-en'],
  ['sentence', 'context', 'synonym', 'recall-en'],
];

/** Whether a word has what a format needs (a sentence to blank, a Bangla meaning, synonyms…). */
export function canUseFormat(w: BrainWord, ex: RecallExercise, distractors = 3): boolean {
  switch (ex) {
    case 'choice':
      return distractors >= 3 && Boolean(w.meaningBn || w.meaning);
    case 'recall-en':
      return Boolean(w.meaningBn);
    case 'context':
      return Boolean(w.originalSentence);
    case 'completion':
      return Boolean(w.exampleSentence);
    case 'synonym':
      return w.synonyms.length > 0;
    case 'meaning':
      return Boolean(w.meaning || w.meaningBn);
    case 'sentence':
      return true;
  }
}

/**
 * Which recall format to use next: by memory stage (rotating inside the stage
 * so the same word is not asked the same way twice in a row), unless the word
 * has a known problem to work on.
 */
export function nextExercise(w: BrainWord, problem?: string, distractors = 3): RecallExercise {
  if (problem === 'meaning') return 'meaning';
  if (problem === 'context' && w.originalSentence) return 'context';
  if (problem === 'recall') return w.exampleSentence ? 'completion' : w.meaningBn ? 'recall-en' : 'meaning';
  const formats = STAGE_FORMATS[Math.min(w.stage, STAGE_FORMATS.length - 1)].filter((ex) => canUseFormat(w, ex, distractors));
  if (formats.length === 0) return 'meaning';
  return formats[w.recallCount % formats.length];
}

/**
 * Notebook groups: New (never recalled) · Learning (recalled at least once, not
 * mastered) · Mastered. Every count on every screen is computed from these, over
 * the words in `users/{uid}/vocabulary` — the one authoritative store.
 */
export type BrainGroup = 'new' | 'learning' | 'mastered';
export const brainGroup = (w: Pick<BrainWord, 'status'>): BrainGroup => (w.status === 'new' ? 'new' : w.status === 'mastered' ? 'mastered' : 'learning');

/** The notebook's filters. `review` (due now) cuts across the groups; the rest partition the words. */
export const BRAIN_FILTERS = ['all', 'new', 'learning', 'review', 'mastered'] as const;
export type BrainFilter = (typeof BRAIN_FILTERS)[number];

export function matchesBrainFilter(w: BrainWord, filter: BrainFilter, now = new Date()): boolean {
  if (filter === 'all') return true;
  if (filter === 'review') return isDue(w, now);
  return brainGroup(w) === filter;
}

/** One count per filter, from the same words and the same rule the list uses. */
export function brainCounts(words: BrainWord[], now = new Date()): Record<BrainFilter, number> {
  return Object.fromEntries(BRAIN_FILTERS.map((f) => [f, words.filter((w) => matchesBrainFilter(w, f, now)).length])) as Record<BrainFilter, number>;
}

/** Words that have been recalled but not yet used by the student: ready for practice. */
export function wordsReadyToUse(words: BrainWord[], mode: 'writing' | 'speaking'): BrainWord[] {
  const count = (w: BrainWord) => (mode === 'writing' ? w.writingUsageCount : w.speakingUsageCount);
  return words
    .filter((w) => w.successfulRecallCount > 0)
    .sort((a, b) => count(a) - count(b) || b.stage - a.stage);
}

export interface BrainSummary {
  total: number;
  due: number;
  failedLastTime: number;
  byStatus: Record<WordStatus, number>;
  /** Started but not yet mastered. */
  learning: number;
  mastered: number;
  /** When the next word becomes due, if none is due now. */
  nextDueAt?: string;
}

export function brainSummary(words: BrainWord[], now = new Date()): BrainSummary {
  const byStatus = { new: 0, learning: 0, recalling: 0, active: 0, strong: 0, mastered: 0 } as Record<WordStatus, number>;
  words.forEach((w) => (byStatus[w.status] += 1));
  const due = dueWords(words, now);
  const upcoming = words.filter((w) => !isDue(w, now)).map((w) => w.nextReviewAt).sort()[0];
  return {
    total: words.length,
    due: due.length,
    failedLastTime: due.filter((w) => w.consecutiveFailures > 0).length,
    byStatus,
    learning: brainCounts(words, now).learning,
    mastered: byStatus.mastered,
    ...(due.length === 0 && upcoming ? { nextDueAt: upcoming } : {}),
  };
}

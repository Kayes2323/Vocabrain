import type { BrainWord, RecallExercise, UsageAttempt, WordInfo, WordSource, WordStatus } from '@/lib/models';

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
 * longer when the last three recalls were all right. Wrong: back to stage 0 and
 * tomorrow — or in 4 hours when it is the second failure in a row.
 */
export function nextReviewDate(w: Pick<BrainWord, 'recallHistory' | 'consecutiveFailures'>, stage: number, correct: boolean, now: Date): Date {
  if (!correct) return w.consecutiveFailures + 1 >= 2 ? new Date(now.getTime() + 4 * 3_600_000) : addDays(now, 1);
  const base = REVIEW_INTERVAL_DAYS[Math.min(stage, MAX_STAGE) - 1];
  const streak = w.recallHistory.slice(-2).filter((r) => r.correct).length === 2;
  return addDays(now, stage >= 3 && streak ? Math.round(base * 1.5) : base);
}

export function applyRecall(w: BrainWord, exercise: RecallExercise, correct: boolean, answer: string | undefined, now = new Date()): BrainWord {
  const stage = correct ? Math.min(w.stage + 1, MAX_STAGE) : 0;
  return withStatus({
    ...w,
    stage,
    nextReviewAt: nextReviewDate(w, stage, correct, now).toISOString(),
    lastReviewedAt: now.toISOString(),
    updatedAt: now.toISOString(),
    recallCount: w.recallCount + 1,
    successfulRecallCount: w.successfulRecallCount + (correct ? 1 : 0),
    consecutiveFailures: correct ? 0 : w.consecutiveFailures + 1,
    recallHistory: [...w.recallHistory, { at: now.toISOString(), exercise, correct, answer: answer?.slice(0, 200) }].slice(-HISTORY_LIMIT),
  });
}

export function applyUsage(w: BrainWord, attempt: Omit<UsageAttempt, 'at'>, now = new Date()): BrainWord {
  return withStatus({
    ...w,
    updatedAt: now.toISOString(),
    writingUsageCount: w.writingUsageCount + (attempt.mode === 'writing' && attempt.correct ? 1 : 0),
    speakingUsageCount: w.speakingUsageCount + (attempt.mode === 'speaking' && attempt.correct ? 1 : 0),
    usageHistory: [...w.usageHistory, { ...attempt, text: attempt.text.slice(0, 600), at: now.toISOString() }].slice(-10),
  });
}

/** Which free-recall exercise to use next, varied by stage and what the word has. */
export function nextExercise(w: BrainWord, problem?: string): RecallExercise {
  if (problem === 'meaning') return 'meaning';
  if (problem === 'context' && w.originalSentence) return 'context';
  if (problem === 'recall') return w.exampleSentence ? 'completion' : 'meaning';
  const cycle: RecallExercise[] = ['meaning', 'context', 'synonym', 'completion'];
  for (let i = 0; i < cycle.length; i++) {
    const candidate = cycle[(w.stage + i) % cycle.length];
    if (candidate === 'context' && !w.originalSentence) continue;
    if (candidate === 'synonym' && w.synonyms.length === 0) continue;
    if (candidate === 'completion' && !w.exampleSentence) continue;
    return candidate;
  }
  return 'meaning';
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
}

export function brainSummary(words: BrainWord[], now = new Date()): BrainSummary {
  const byStatus = { new: 0, learning: 0, recalling: 0, active: 0, strong: 0, mastered: 0 } as Record<WordStatus, number>;
  words.forEach((w) => (byStatus[w.status] += 1));
  const due = dueWords(words, now);
  return { total: words.length, due: due.length, failedLastTime: due.filter((w) => w.consecutiveFailures > 0).length, byStatus };
}

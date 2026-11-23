import type { BrainWord, WordStatus } from '@/lib/models';
import { WORD_STATUSES } from '@/lib/models';

/**
 * Validation of Brain documents (users/{uid}/vocabulary/{id}). The Firestore
 * rules are the authority on what may be stored; this mirrors them so the app
 * can refuse an invalid write with a clear reason before sending it, and so a
 * document that is already invalid (written before the rules existed) can be
 * read without breaking the screen.
 *
 * Keep in sync with the `validBrainWord` function in firestore.rules.
 */
export const MAX_STAGE_VALUE = 6;
export const RECALL_HISTORY_MAX = 20;
export const USAGE_HISTORY_MAX = 10;
export const LIST_MAX = 40;

// Month 01–12, day 01–31, hour 00–23, minute/second 00–59. (Firestore rules can check this shape but cannot do calendar
// arithmetic, so the app additionally rejects impossible days such as 30 February.)
const ISO = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d{1,6})?Z$/;

export function isIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || value.length > 32 || !ISO.test(value)) return false;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value.slice(0, 10);
}

const isCount = (v: unknown, max = 1_000_000) => typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= max;
const isText = (v: unknown, max: number) => typeof v === 'string' && v.length <= max;
const isList = (v: unknown, max = LIST_MAX, item = 200) => Array.isArray(v) && v.length <= max && v.every((x) => typeof x === 'string' && x.length <= item);

export interface BrainIssue {
  field: string;
  problem: string;
}

/** Fields that are checked when present; a legacy document may lack some of them. */
export function brainWordIssues(raw: unknown): BrainIssue[] {
  const d = (raw ?? {}) as Record<string, unknown>;
  const issues: BrainIssue[] = [];
  const bad = (field: string, problem: string) => issues.push({ field, problem });
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return [{ field: '(document)', problem: 'must be an object' }];
  if (typeof d.word !== 'string' || d.word.length === 0 || d.word.length > 64) bad('word', 'must be 1–64 characters');
  if ('stage' in d && !(isCount(d.stage, MAX_STAGE_VALUE))) bad('stage', `must be a whole number 0–${MAX_STAGE_VALUE}`);
  if ('nextReviewAt' in d && !isIsoDate(d.nextReviewAt)) bad('nextReviewAt', 'must be an ISO-8601 UTC date-time');
  for (const f of ['createdAt', 'updatedAt', 'lastReviewedAt'] as const) if (f in d && d[f] !== undefined && !isIsoDate(d[f])) bad(f, 'must be an ISO-8601 UTC date-time');
  if ('status' in d && !WORD_STATUSES.includes(d.status as WordStatus)) bad('status', 'must be a known status');
  for (const f of ['recallCount', 'successfulRecallCount', 'consecutiveFailures', 'writingUsageCount', 'speakingUsageCount'] as const) if (f in d && !isCount(d[f])) bad(f, 'must be a whole number ≥ 0');
  if ('confidence' in d && d.confidence !== undefined && !(typeof d.confidence === 'number' && d.confidence >= 0 && d.confidence <= 100)) bad('confidence', 'must be 0–100');
  for (const f of ['meaning', 'meaningBn', 'lemma', 'partOfSpeech', 'exampleSentence'] as const) if (f in d && d[f] !== undefined && !isText(d[f], 1000)) bad(f, 'text too long');
  if ('originalSentence' in d && d.originalSentence !== undefined && !isText(d.originalSentence, 2000)) bad('originalSentence', 'text too long');
  for (const f of ['synonyms', 'antonyms', 'collocations', 'acceptedAnswers'] as const) if (f in d && !isList(d[f])) bad(f, 'must be a short list of short text');
  if ('recallHistory' in d && !(Array.isArray(d.recallHistory) && d.recallHistory.length <= RECALL_HISTORY_MAX)) bad('recallHistory', `at most ${RECALL_HISTORY_MAX} attempts`);
  if ('usageHistory' in d && !(Array.isArray(d.usageHistory) && d.usageHistory.length <= USAGE_HISTORY_MAX)) bad('usageHistory', `at most ${USAGE_HISTORY_MAX} attempts`);
  return issues;
}

export const isValidBrainWord = (raw: unknown) => brainWordIssues(raw).length === 0;

/** Thrown when the app refuses to store an invalid word. */
export class BrainValidationError extends Error {
  constructor(public readonly issues: BrainIssue[]) {
    super(`Invalid vocabulary record: ${issues.map((i) => `${i.field} ${i.problem}`).join('; ')}`);
    this.name = 'BrainValidationError';
  }
}

export function assertValidBrainWord(word: unknown): void {
  const issues = brainWordIssues(word);
  if (issues.length) throw new BrainValidationError(issues);
}

/**
 * Reading a stored document defensively. The stored data is never changed; the
 * in-memory copy is repaired so one bad value cannot break a screen or make a
 * word undue forever (an unreadable review date means "review now").
 */
export function sanitizeBrainWord(raw: BrainWord, now = new Date()): BrainWord {
  const stage = isCount(raw.stage, MAX_STAGE_VALUE) ? raw.stage : Math.min(Math.max(Math.trunc(Number(raw.stage)) || 0, 0), MAX_STAGE_VALUE);
  const iso = now.toISOString();
  return {
    ...raw,
    stage,
    nextReviewAt: isIsoDate(raw.nextReviewAt) ? raw.nextReviewAt : iso,
    createdAt: isIsoDate(raw.createdAt) ? raw.createdAt : iso,
    updatedAt: isIsoDate(raw.updatedAt) ? raw.updatedAt : iso,
    status: WORD_STATUSES.includes(raw.status) ? raw.status : 'new',
    synonyms: Array.isArray(raw.synonyms) ? raw.synonyms : [],
    antonyms: Array.isArray(raw.antonyms) ? raw.antonyms : [],
    collocations: Array.isArray(raw.collocations) ? raw.collocations : [],
    recallHistory: Array.isArray(raw.recallHistory) ? raw.recallHistory : [],
    usageHistory: Array.isArray(raw.usageHistory) ? raw.usageHistory : [],
    recallCount: isCount(raw.recallCount) ? raw.recallCount : 0,
    successfulRecallCount: isCount(raw.successfulRecallCount) ? raw.successfulRecallCount : 0,
    consecutiveFailures: isCount(raw.consecutiveFailures) ? raw.consecutiveFailures : 0,
    writingUsageCount: isCount(raw.writingUsageCount) ? raw.writingUsageCount : 0,
    speakingUsageCount: isCount(raw.speakingUsageCount) ? raw.speakingUsageCount : 0,
  };
}

/** A usable meaning to build a prompt or a recall question from (never invented). */
export function hasUsableMeaning(w: Pick<BrainWord, 'meaning' | 'meaningBn'>): boolean {
  return [w.meaning, w.meaningBn].some((m) => typeof m === 'string' && m.trim().length >= 2);
}

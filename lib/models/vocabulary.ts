import type { ID, ISODate, LicenseStatus } from './common';

/**
 * The student's Brain: every word they saved, with where it came from and
 * how well they can recall and use it. Stored at users/{uid}/vocabulary/{id}
 * (or localStorage for guests).
 */

/** Learning states shown in My Notebook, from first save to full command. */
export const WORD_STATUSES = ['new', 'learning', 'recalling', 'active', 'strong', 'mastered'] as const;
export type WordStatus = (typeof WORD_STATUSES)[number];

/**
 * Recall formats, from recognising a word to producing it:
 * choice (pick the meaning) → recall-en (Bangla → type the English word) →
 * context / completion (the word in a sentence) → synonym → sentence (use it yourself).
 * `meaning` (type what it means) is the general fallback.
 */
export type RecallExercise = 'choice' | 'meaning' | 'recall-en' | 'context' | 'completion' | 'synonym' | 'sentence';

/** How the recall felt, when the student rates it (Again = not recalled). */
export type RecallRating = 'again' | 'hard' | 'good' | 'easy';

/** What is going wrong when a word keeps failing. */
export type WordProblem = 'meaning' | 'context' | 'recall' | 'collocation' | 'usage' | 'pronunciation';

export type WordSourceType = 'reading-passage' | 'word-bank' | 'lesson' | 'manual';

export interface WordSource {
  type: WordSourceType;
  title: string;
  passageId?: ID;
  licenseStatus?: LicenseStatus;
}

/** Scheduler fields as they were just before an answer, so a later self-rating can be applied exactly. */
export interface RecallSnapshot {
  stage: number;
  nextReviewAt: ISODate;
  lastReviewedAt?: ISODate;
  recallCount: number;
  successfulRecallCount: number;
  consecutiveFailures: number;
}

export interface RecallAttempt {
  /** Stable key of this attempt (one per card shown). Recording the same key twice is a no-op. */
  id?: string;
  at: ISODate;
  exercise: RecallExercise;
  correct: boolean;
  /** Mino judged this a partially correct answer: not a success, but not treated as a plain miss either. */
  partial?: boolean;
  answer?: string;
  /** The learner's self-rating. Absent = the answer was recorded but not (yet) rated. */
  rating?: RecallRating;
  ratedAt?: ISODate;
  /** Present only while the attempt is still unrated: lets the rating be applied exactly as if it came with the answer. */
  before?: RecallSnapshot;
}

export interface UsageAttempt {
  at: ISODate;
  mode: 'writing' | 'speaking';
  text: string;
  /** The word was used correctly and naturally. */
  correct: boolean;
  /** i18n keys of the feedback given. */
  feedback?: string[];
}

export interface BrainWord {
  id: ID;
  word: string;
  /** Lowercase dictionary form, used to avoid duplicates. */
  lemma: string;
  source: WordSource;
  originalSentence?: string;
  meaning: string;
  meaningBn?: string;
  partOfSpeech?: string;
  synonyms: string[];
  antonyms: string[];
  collocations: string[];
  exampleSentence?: string;
  /** Derived from the fields below on every write (see lib/engine/brain.ts). */
  status: WordStatus;
  createdAt: ISODate;
  updatedAt: ISODate;
  /** Successful spaced recalls in a row (0-6). Drives the review interval. */
  stage: number;
  nextReviewAt: ISODate;
  lastReviewedAt?: ISODate;
  recallCount: number;
  successfulRecallCount: number;
  consecutiveFailures: number;
  /** Successful uses in the student's own writing / speaking. */
  writingUsageCount: number;
  speakingUsageCount: number;
  /** 0–100 from recent recall accuracy and memory stage (derived on every write). */
  confidence?: number;
  /** Most recent attempts, capped so documents stay small. */
  recallHistory: RecallAttempt[];
  usageHistory: UsageAttempt[];
}

/** Dictionary information for a word, before it is saved. */
export interface WordInfo {
  word: string;
  lemma: string;
  meaning: string;
  meaningBn?: string;
  partOfSpeech?: string;
  synonyms: string[];
  antonyms: string[];
  collocations: string[];
  exampleSentence?: string;
  /** Where the definition came from, e.g. "Mino glossary". */
  dictionarySource: 'glossary' | 'word-bank' | 'dictionary-api' | 'mino' | 'none';
}

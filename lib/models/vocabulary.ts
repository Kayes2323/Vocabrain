import type { ID, ISODate, LicenseStatus } from './common';

/**
 * The student's Brain: every word they saved, with where it came from and
 * how well they can recall and use it. Stored at users/{uid}/vocabulary/{id}
 * (or localStorage for guests).
 */

/** Learning states shown in My Notebook, from first save to full command. */
export const WORD_STATUSES = ['new', 'learning', 'recalling', 'active', 'strong', 'mastered'] as const;
export type WordStatus = (typeof WORD_STATUSES)[number];

/** Free-recall exercise types. Never multiple choice. */
export type RecallExercise = 'meaning' | 'synonym' | 'context' | 'completion';

/** What is going wrong when a word keeps failing. */
export type WordProblem = 'meaning' | 'context' | 'recall' | 'collocation' | 'usage' | 'pronunciation';

export type WordSourceType = 'reading-passage' | 'word-bank' | 'lesson' | 'manual';

export interface WordSource {
  type: WordSourceType;
  title: string;
  passageId?: ID;
  licenseStatus?: LicenseStatus;
}

export interface RecallAttempt {
  at: ISODate;
  exercise: RecallExercise;
  correct: boolean;
  answer?: string;
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
  /** Where the definition came from, e.g. "Vocab Brain glossary". */
  dictionarySource: 'glossary' | 'word-bank' | 'dictionary-api' | 'none';
}

import type { ContentProvenance, ID, ISODate } from './common';

/** Ordered from first contact to full command of a word. */
export const MASTERY_LEVELS = [
  'encountered',
  'recognised',
  'understood',
  'retrievable',
  'usable',
  'transferable',
  'mastered',
] as const;
export type MasteryLevel = (typeof MASTERY_LEVELS)[number];

export const MASTERY_LEVEL_INFO: Record<MasteryLevel, { label: string; description: string }> = {
  encountered: { label: 'Encountered', description: 'You met the word in context.' },
  recognised: { label: 'Recognised', description: 'You know you have seen it before.' },
  understood: { label: 'Understood', description: 'You know what it means here.' },
  retrievable: { label: 'Retrievable', description: 'You can recall it without a prompt.' },
  usable: { label: 'Usable', description: 'You use it correctly in your own sentences.' },
  transferable: { label: 'Transferable', description: 'You use it naturally in new contexts.' },
  mastered: { label: 'Mastered', description: 'Accurate, appropriate and natural in Writing and Speaking.' },
};

/** Separate strengths tracked per word; a word can be strong in one and weak in another. */
export type MasteryDimension =
  | 'recognition'
  | 'meaning'
  | 'collocation'
  | 'writing'
  | 'speaking'
  | 'newContext';

export type DimensionStatus = 'not-started' | 'developing' | 'secure';

export interface WordSense {
  meaning: string;
  /** Explains how a synonym differs, e.g. "crucial: essential for an outcome". */
  nuance?: string;
}

export interface VocabularyItem {
  id: ID;
  userId: ID;
  word: string;
  partOfSpeech?: string;
  senses: WordSense[];
  translation?: { language: string; text: string };
  synonyms?: WordSense[];
  antonyms?: string[];
  collocations?: string[];
  wordFamily?: string[];
  connotation?: 'positive' | 'neutral' | 'negative';
  mastery: MasteryLevel;
  dimensions: Partial<Record<MasteryDimension, DimensionStatus>>;
  createdAt: ISODate;
  nextReviewAt?: ISODate;
}

/** One time the student met a word. Captured automatically from reading. */
export interface VocabularyEncounter {
  id: ID;
  itemId: ID;
  userId: ID;
  sentence: string;
  surroundingContext?: string;
  passageId?: ID;
  passageTitle?: string;
  topic?: string;
  source?: Pick<ContentProvenance, 'source' | 'sourceType'>;
  encounteredAt: ISODate;
}

export interface VocabularyReview {
  id: ID;
  itemId: ID;
  userId: ID;
  dimension: MasteryDimension;
  /** e.g. context-clue, synonym-recognition, paraphrase, sentence-writing. */
  exerciseType: string;
  correct: boolean;
  reviewedAt: ISODate;
}

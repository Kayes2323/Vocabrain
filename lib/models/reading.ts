import type { ContentProvenance, ID, ISODate } from './common';

/**
 * A reading passage. Provenance is mandatory: Cambridge passages may only be
 * stored with `licenseStatus: 'licensed'`. "Cambridge-style" original passages
 * are `vocab-brain-original`.
 */
export interface ReadingPassage extends ContentProvenance {
  id: ID;
  title: string;
  topic: string;
  difficulty: 'band-5' | 'band-6' | 'band-7' | 'band-8' | 'band-9';
  estimatedMinutes: number;
  body: string;
}

export interface ReadingAttempt {
  id: ID;
  userId: ID;
  passageId: ID;
  startedAt: ISODate;
  completedAt?: ISODate;
  savedItemIds: ID[];
  score?: { correct: number; total: number };
}

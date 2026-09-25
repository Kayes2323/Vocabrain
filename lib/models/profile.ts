import type { DegreeLevel, IELTSSkill } from '@/lib/constants';
import type { ID, ISODate, Money } from './common';

export type SkillBands = Partial<Record<IELTSSkill, number>>;

export interface IELTSProfile {
  targetBand?: number;
  /** Most recent self-reported or measured band per skill. */
  currentBands: SkillBands;
  testDate?: ISODate;
  /** True once the student says the test isn't booked yet. */
  testDateUnknown?: boolean;
  weeklyStudyHours?: number;
  /** 0 = Sunday ... 6 = Saturday. */
  studyDays?: number[];
  startedAt?: ISODate;
}

export type PriorityFactor =
  | 'affordability'
  | 'academicFit'
  | 'career'
  | 'scholarship'
  | 'lifestyle'
  | 'postStudyWork'
  | 'safety';

export interface StudyAbroadProfile {
  degreeLevel?: DegreeLevel;
  subject?: string;
  /** Month is 1-12. */
  targetIntake?: { month: number; year: number };
  annualBudget?: Money;
  /** Weights sum to 100. Personalised in Country Match (Phase 5). */
  priorities?: Partial<Record<PriorityFactor, number>>;
  preferredCountryCodes?: string[];
}

export interface VocabularyProgress {
  lastLessonId?: number;
  lastBand?: 6 | 7 | 8 | 9;
  /** IDs of word-bank entries the student saved. Becomes VocabularyItem in Phase 2. */
  savedWordIds: string[];
}

export interface UserProfile {
  userId: ID;
  displayName?: string;
  ielts: IELTSProfile;
  abroad: StudyAbroadProfile;
  vocabulary: VocabularyProgress;
  updatedAt: ISODate;
}

export function emptyProfile(userId: ID): UserProfile {
  return {
    userId,
    ielts: { currentBands: {} },
    abroad: {},
    vocabulary: { savedWordIds: [] },
    updatedAt: new Date().toISOString(),
  };
}

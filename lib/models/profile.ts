import type { DegreeLevel, IELTSSkill } from '@/lib/constants';
import type { ID, ISODate, Money } from './common';

export type Locale = 'en' | 'bn';

/** Why the student came to Vocab Brain. IELTS is the primary path today. */
export type StudentGoal = 'ielts' | 'abroad' | 'english' | 'unsure';

export type SkillBands = Partial<Record<IELTSSkill, number>>;

/**
 * Result of the "find your starting point" check. Always an estimate: it is
 * never presented as an official IELTS score.
 */
export interface DiagnosticResult {
  completedAt: ISODate;
  /** How the estimate was produced. Timed skill tests will add 'test'. */
  method: 'self-assessment';
  bands: Record<IELTSSkill, number>;
}

export interface IELTSProfile {
  targetBand?: number;
  /** The student chose "Not sure" for the target. */
  targetUnsure?: boolean;
  takenBefore?: boolean;
  /** Overall band from a previous official test, if the student remembers it. */
  previousOverall?: number;
  /** Latest estimate per skill (diagnostic, calculator or self-report). */
  currentBands: SkillBands;
  diagnostic?: DiagnosticResult;
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
  /** Weights sum to 100. Personalised in Country Match. */
  priorities?: Partial<Record<PriorityFactor, number>>;
  preferredCountryCodes?: string[];
}

/** Per-word learning signals. Keyed by a stable word key. */
export interface WordStats {
  /** Times the word was shown. */
  seen: number;
  /** Times the student said they recalled it before revealing. */
  recalled: number;
  /** Times the student said they didn't know it yet. */
  missed: number;
  lastSeenAt: ISODate;
}

export interface VocabularyProgress {
  lastLessonId?: number;
  lastBand?: 6 | 7 | 8 | 9;
  /** IDs of word-bank entries the student saved to their Brain. */
  savedWordIds: string[];
  words: Record<string, WordStats>;
}

export type PlanTaskKind = IELTSSkill | 'vocabulary';
export type PlanMode = 'normal' | 'minimum' | 'catch-up';

/** What happened on one study day (YYYY-MM-DD, local time). */
export interface DailyLog {
  mode: PlanMode;
  done: PlanTaskKind[];
}

export interface StudyProgress {
  /** Completed daily-plan tasks per kind, all time. Drives the IELTS journey. */
  completedTasks: Partial<Record<PlanTaskKind, number>>;
  mockTestsCompleted: number;
  days: Record<string, DailyLog>;
  /** Last local date the student completed anything. */
  lastActiveDate?: string;
  /** Passage ids the student finished reading. */
  readPassages?: string[];
}

export interface UserProfile {
  userId: ID;
  displayName?: string;
  language?: Locale;
  goal?: StudentGoal;
  onboardedAt?: ISODate;
  ielts: IELTSProfile;
  abroad: StudyAbroadProfile;
  vocabulary: VocabularyProgress;
  study: StudyProgress;
  updatedAt: ISODate;
}

export function emptyProfile(userId: ID): UserProfile {
  return {
    userId,
    ielts: { currentBands: {} },
    abroad: {},
    vocabulary: { savedWordIds: [], words: {} },
    study: { completedTasks: {}, mockTestsCompleted: 0, days: {} },
    updatedAt: new Date().toISOString(),
  };
}

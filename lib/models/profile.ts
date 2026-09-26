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

/** Areas the Foundation diagnostic checks. */
export type FoundationArea = 'grammar' | 'vocabulary' | 'sentence' | 'reading' | 'listening';
export type FoundationLevel = 'strong' | 'developing' | 'needs';

export interface FoundationDiagnosticRecord {
  completedAt: ISODate;
  level: FoundationLevel;
  /** 0-100 overall and per area. */
  percent: number;
  areas: Record<FoundationArea, number>;
  /** Module ids to focus on, most needed first. */
  focusModules: string[];
  /** Concepts the check tested: true = answered correctly. (v2) */
  concepts?: Record<string, boolean>;
  /** Lessons the student may skip; they stay open for review. (v2) */
  skippedLessons?: string[];
  /** Where the adaptive path starts. (v2) */
  startLessonId?: string;
}

export interface FoundationLessonRecord {
  completedAt: ISODate;
  /** 0-100, last attempt. */
  score: number;
  best: number;
  attempts: number;
}

/** One wrong answer, kept so Mino and the review system work from real data. */
export interface FoundationMistake {
  at: ISODate;
  /** Lesson id, or "diagnostic" / "review:<concept>" / "quiz:<module>". */
  source: string;
  questionId: string;
  questionType: string;
  /** The question text (short) and the sentence it was about. */
  prompt: string;
  answer: string;
  correctAnswer: string;
  /** Error category (tense, article, agreement…). */
  tag: string;
  /** Finer concept (present-perfect…), when known. */
  concept?: string;
  /** Attempt number of this lesson/session. */
  attempt: number;
}

/** Per-concept accuracy: drives weak/strong topics and review. */
export interface FoundationConceptStats {
  /** All graded answers on this concept (recognition + recall). */
  attempts: number;
  correct: number;
  lastAt: ISODate;
  /** Typed answers without options (active recall). */
  recallAttempts?: number;
  recallCorrect?: number;
  /** Personal sentences checked by Mino, and how many were correct. */
  applied?: number;
  appliedCorrect?: number;
  /** Spaced review: stage 0–5 (same day, 1, 3, 7, 14, 30 days) and when it is due. */
  srs?: { stage: number; dueAt: ISODate; passes: number };
  /** Last passed review; mistakes before it no longer trigger a review. */
  reviewedAt?: ISODate;
  lastReviewScore?: number;
}

/** What the student did on one local day (YYYY-MM-DD). */
export interface FoundationDay {
  lessons: number;
  questions: number;
  correct: number;
  reviews?: number;
  quizzes?: number;
}

/** A lesson the student left part-way: resumes on any device. */
export interface FoundationInProgress {
  lessonId: string;
  page: number;
  /** Exercise id → answer and whether it was right (null = self-checked writing). */
  answers: Record<string, { answer: string; correct: boolean | null }>;
  attempt: number;
  updatedAt: ISODate;
}

/** IELTS Foundation course progress. Stored in the profile (users/{uid}.app). */
export interface FoundationProgress {
  introSeenAt?: ISODate;
  diagnostic?: FoundationDiagnosticRecord;
  lessons: Record<string, FoundationLessonRecord>;
  /** Mistake counts per error category, all time. */
  errors: Record<string, { count: number; lastAt: ISODate }>;
  concepts: Record<string, FoundationConceptStats>;
  /** Most recent mistakes, newest last (capped). */
  mistakes: FoundationMistake[];
  days: Record<string, FoundationDay>;
  inProgress?: FoundationInProgress;
}

/** One local day of Vocabulary Foundation work (YYYY-MM-DD). */
export interface VocabDay {
  newWords: number;
  recalls: number;
  recallCorrect: number;
  sentences: number;
  sentencesCorrect: number;
  missionDoneAt?: ISODate;
}

/** An unfinished mission, so a refresh or another device resumes it. */
export interface VocabSession {
  date: string;
  words: string[];
  phase: 'discover' | 'recall' | 'use' | 'done';
  /** Position inside the phase. */
  index: number;
  /** Results so far, by `${phase}:${wordId}` (recall has two kinds per word). */
  results: Record<string, { correct: boolean; answer?: string }>;
}

/**
 * Vocabulary Foundation progress. The words themselves (meaning, review
 * schedule, recall and usage history) live in the Brain
 * (users/{uid}/vocabulary/{id}); this only records the course around them.
 */
export interface VocabFoundationProgress {
  /** Words met in the course and whether the first guess from context was right. */
  discovered: Record<string, { at: ISODate; guessedRight: boolean }>;
  days: Record<string, VocabDay>;
  session?: VocabSession;
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
  foundation: FoundationProgress;
  vocabFoundation: VocabFoundationProgress;
  updatedAt: ISODate;
}

export function emptyProfile(userId: ID): UserProfile {
  return {
    userId,
    ielts: { currentBands: {} },
    abroad: {},
    vocabulary: { savedWordIds: [], words: {} },
    study: { completedTasks: {}, mockTestsCompleted: 0, days: {} },
    foundation: { lessons: {}, errors: {}, concepts: {}, mistakes: [], days: {} },
    vocabFoundation: { discovered: {}, days: {} },
    updatedAt: new Date().toISOString(),
  };
}

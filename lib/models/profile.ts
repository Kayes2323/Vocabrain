import type { DegreeLevel, IELTSSkill } from '@/lib/constants';
import type { ID, ISODate, Money } from './common';

export type Locale = 'en' | 'bn';

/** Why the student came to Mino. IELTS is the primary path today. */
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
  /** Shortlisted countries (the dream country may be one of them). */
  preferredCountryCodes?: string[];
  /** The one country the active journey is for. */
  dreamCountryCode?: string;
  /** Chosen study pathway per country (country code → pathway id defined by that country). */
  pathwayByCountry?: Record<string, string>;
  /** The student's own progress on journey stages/steps; computed rules never live here. */
  journey?: StudentJourneyState;
  /** Universities the student is considering (their own list, from official websites). */
  universities?: SavedUniversity[];
  /** Scholarship ids (from the reviewed registry) the student saved. */
  savedScholarships?: string[];
  /** Dates the student added themselves. */
  deadlines?: PersonalDeadline[];
  /** How far each document is. */
  documents?: Partial<Record<string, DocumentProgress>>;
  /**
   * What the student told us about themselves, asked one question at a time
   * where a feature needs it. Every field is optional; missing = "Not provided",
   * never assumed. (Degree and subject wanted: `degreeLevel`, `subject` above.)
   */
  student?: StudentStudyProfile;
}

export type EducationLevel = 'ssc' | 'hsc' | 'diploma' | 'bachelors' | 'masters' | 'phd' | 'other';
export type GradeScale = 'cgpa-4' | 'cgpa-5' | 'percentage' | 'other';
export type EnglishLevel = 'basic' | 'intermediate' | 'advanced';
export type KoreanLevel = 'none' | 'beginner' | 'topik-1' | 'topik-2' | 'topik-3' | 'topik-4' | 'topik-5' | 'topik-6';
/** Study-language preference: English, the country's own language, or either. */
export type StudyLanguagePreference = 'en' | 'local' | 'either';
export type UniversityTypePreference = 'public' | 'private' | 'any';

export interface StudentStudyProfile {
  education?: { level?: EducationLevel; field?: string; status?: 'studying' | 'graduated'; graduationYear?: number };
  result?: { value: number; scale: GradeScale };
  english?: { level?: EnglishLevel; /** Official IELTS overall, if taken. */ ielts?: number };
  korean?: KoreanLevel;
  preferences?: { city?: string; universityType?: UniversityTypePreference; studyLanguage?: StudyLanguagePreference };
  /** Planning numbers the student chose: tuition per year, living per month, total money available. */
  budget?: { tuition?: Money; living?: Money; total?: Money };
  updatedAt?: ISODate;
}

export type UniversityFit = 'ambitious' | 'match' | 'safer';
export type UniversityStatus = 'interested' | 'researching' | 'shortlisted' | 'applying' | 'applied' | 'offer' | 'rejected' | 'not-proceeding';

export interface SavedUniversity {
  id: string;
  name: string;
  countryCode: string;
  program?: string;
  /** Link to a reviewed program record, when there is one. */
  programId?: string;
  /** The university's own website, as the student entered it. */
  officialUrl?: string;
  fit: UniversityFit;
  status: UniversityStatus;
  /** Link to a reviewed registry record, when there is one. */
  universityId?: string;
  addedAt: ISODate;
  updatedAt?: ISODate;
}

export type PersonalDeadlineKind = 'university' | 'scholarship' | 'test' | 'visa' | 'personal';

export interface PersonalDeadline {
  id: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  kind: PersonalDeadlineKind;
  countryCode?: string;
  done?: boolean;
  createdAt: ISODate;
}

export type DocumentStatus = 'not-started' | 'drafting' | 'ready';

export interface DocumentProgress {
  status: DocumentStatus;
  updatedAt: ISODate;
  /** The student's own "valid until" date (e.g. passport expiry, test result validity); past → needs update. */
  validUntil?: string;
}

/**
 * What the student has told us about their journey. Only manual facts are
 * stored (a step marked done, a personal due date); statuses that follow from
 * data (e.g. IELTS ready, a shortlist exists) are always computed.
 */
export interface StudentJourneyState {
  /** Stage/step id → the student's own mark. */
  marks: Record<string, JourneyMark>;
  /** Roadmap steps per country (country code → step id → mark). Kept per country so switching back never loses work. */
  steps?: Record<string, Record<string, JourneyMark>>;
  updatedAt?: ISODate;
}

export interface JourneyMark {
  status: 'done' | 'in-progress';
  updatedAt: ISODate;
  /** A personal due date for this step. */
  dueAt?: ISODate;
  note?: string;
  /** The dream country when the mark was made (marks belong to one journey). */
  countryCode?: string;
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
  /** Reading Library answers and results, by passage id. */
  readingLibrary?: Record<string, ReadingLibraryProgress>;
}

/** The student's saved state for one Reading Library passage. */
export interface ReadingLibraryProgress {
  answers: Record<string, string>;
  /** Answers were checked at least once. */
  checked?: boolean;
  score?: { correct: number; total: number };
  updatedAt: string;
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
  /** Parts of Speech: the job the answer needed and the job the student chose (one per word for tagging). */
  pos?: { expected: string; chosen: string }[];
  /** Word family of the answer, when known. */
  family?: string;
  /** Named mistake pattern (e.g. "sv-agreement"), when the question checks one. */
  pattern?: string;
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
  /** Parts of Speech mistake patterns ("adjective>adverb") fixed in a targeted session, and when. */
  posFixes?: Record<string, ISODate>;
  /** Parts of Speech Final Mastery Challenge: latest result. */
  posFinal?: PosFinalRecord;
  /** Other modules' Final Mastery Challenges (e.g. "tenses"), same shape as posFinal. */
  finals?: Record<string, PosFinalRecord>;
}

/** Final Mastery Challenge result: score, the level reached (1–3) and per-part answers. */
export interface PosFinalRecord {
  at: ISODate;
  score: number;
  best: number;
  attempts: number;
  /** Adaptive level at the end (1 easy – 3 hard). */
  level: number;
  parts: Record<string, { correct: number; total: number }>;
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

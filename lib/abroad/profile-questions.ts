import type {
  EducationLevel,
  EnglishLevel,
  GradeScale,
  KoreanLevel,
  Money,
  StudentStudyProfile,
  StudyAbroadProfile,
  StudyLanguagePreference,
  UniversityTypePreference,
} from '@/lib/models';

/**
 * Progressive profiling: each feature asks only the one question it needs,
 * where it needs it, saves the answer and carries on. Nothing here is
 * required and nothing is ever inferred from a missing answer.
 */
export const PROFILE_QUESTION_IDS = [
  'studyLanguage',
  'universityType',
  'city',
  'educationLevel',
  'educationField',
  'educationStatus',
  'graduationYear',
  'result',
  'englishLevel',
  'ielts',
  'korean',
  'tuitionBudget',
  'livingBudget',
  'totalBudget',
] as const;
export type ProfileQuestionId = (typeof PROFILE_QUESTION_IDS)[number];

export type ProfileAnswer = string | number | Money | { value: number; scale: GradeScale };

export interface ProfileQuestion {
  id: ProfileQuestionId;
  kind: 'choice' | 'text' | 'number' | 'money' | 'grade';
  /** Choice values (labels come from i18n: sa.profileQ.<id>.options.<value>). */
  options?: readonly string[];
  read: (s: StudentStudyProfile) => ProfileAnswer | undefined;
  write: (s: StudentStudyProfile, v: ProfileAnswer) => StudentStudyProfile;
  /** Rejects answers that can't be right (e.g. an IELTS band of 12). */
  valid?: (v: ProfileAnswer) => boolean;
}

const EDUCATION: readonly EducationLevel[] = ['ssc', 'hsc', 'diploma', 'bachelors', 'masters', 'phd', 'other'];
const KOREAN: readonly KoreanLevel[] = ['none', 'beginner', 'topik-1', 'topik-2', 'topik-3', 'topik-4', 'topik-5', 'topik-6'];
const SCALES: readonly GradeScale[] = ['cgpa-4', 'cgpa-5', 'percentage', 'other'];
const SCALE_MAX: Record<GradeScale, number> = { 'cgpa-4': 4, 'cgpa-5': 5, percentage: 100, other: Number.POSITIVE_INFINITY };
const isMoney = (v: ProfileAnswer): v is Money => typeof v === 'object' && 'amount' in v && v.amount > 0 && /^[A-Z]{3}$/.test(v.currency);
const pref = (s: StudentStudyProfile) => s.preferences ?? {};

export const PROFILE_QUESTIONS: Record<ProfileQuestionId, ProfileQuestion> = {
  studyLanguage: {
    id: 'studyLanguage',
    kind: 'choice',
    options: ['en', 'local', 'either'],
    read: (s) => pref(s).studyLanguage,
    write: (s, v) => ({ ...s, preferences: { ...pref(s), studyLanguage: v as StudyLanguagePreference } }),
  },
  universityType: {
    id: 'universityType',
    kind: 'choice',
    options: ['public', 'private', 'any'],
    read: (s) => pref(s).universityType,
    write: (s, v) => ({ ...s, preferences: { ...pref(s), universityType: v as UniversityTypePreference } }),
  },
  city: {
    id: 'city',
    kind: 'text',
    read: (s) => pref(s).city,
    write: (s, v) => ({ ...s, preferences: { ...pref(s), city: String(v).trim() } }),
    valid: (v) => typeof v === 'string' && v.trim().length > 0 && v.length <= 60,
  },
  educationLevel: {
    id: 'educationLevel',
    kind: 'choice',
    options: EDUCATION,
    read: (s) => s.education?.level,
    write: (s, v) => ({ ...s, education: { ...s.education, level: v as EducationLevel } }),
  },
  educationField: {
    id: 'educationField',
    kind: 'text',
    read: (s) => s.education?.field,
    write: (s, v) => ({ ...s, education: { ...s.education, field: String(v).trim() } }),
    valid: (v) => typeof v === 'string' && v.trim().length > 0 && v.length <= 80,
  },
  educationStatus: {
    id: 'educationStatus',
    kind: 'choice',
    options: ['studying', 'graduated'],
    read: (s) => s.education?.status,
    write: (s, v) => ({ ...s, education: { ...s.education, status: v as 'studying' | 'graduated' } }),
  },
  graduationYear: {
    id: 'graduationYear',
    kind: 'number',
    read: (s) => s.education?.graduationYear,
    write: (s, v) => ({ ...s, education: { ...s.education, graduationYear: Number(v) } }),
    valid: (v) => Number.isInteger(v) && (v as number) >= 1980 && (v as number) <= 2040,
  },
  result: {
    id: 'result',
    kind: 'grade',
    options: SCALES,
    read: (s) => s.result,
    write: (s, v) => ({ ...s, result: v as { value: number; scale: GradeScale } }),
    valid: (v) => typeof v === 'object' && 'scale' in v && SCALES.includes(v.scale) && v.value > 0 && v.value <= SCALE_MAX[v.scale],
  },
  englishLevel: {
    id: 'englishLevel',
    kind: 'choice',
    options: ['basic', 'intermediate', 'advanced'],
    read: (s) => s.english?.level,
    write: (s, v) => ({ ...s, english: { ...s.english, level: v as EnglishLevel } }),
  },
  ielts: {
    id: 'ielts',
    kind: 'number',
    read: (s) => s.english?.ielts,
    write: (s, v) => ({ ...s, english: { ...s.english, ielts: Number(v) } }),
    // IELTS bands are 0–9 in half steps.
    valid: (v) => typeof v === 'number' && v >= 0 && v <= 9 && Number.isInteger(v * 2),
  },
  korean: {
    id: 'korean',
    kind: 'choice',
    options: KOREAN,
    read: (s) => s.korean,
    write: (s, v) => ({ ...s, korean: v as KoreanLevel }),
  },
  tuitionBudget: {
    id: 'tuitionBudget',
    kind: 'money',
    read: (s) => s.budget?.tuition,
    write: (s, v) => ({ ...s, budget: { ...s.budget, tuition: v as Money } }),
    valid: isMoney,
  },
  livingBudget: {
    id: 'livingBudget',
    kind: 'money',
    read: (s) => s.budget?.living,
    write: (s, v) => ({ ...s, budget: { ...s.budget, living: v as Money } }),
    valid: isMoney,
  },
  totalBudget: {
    id: 'totalBudget',
    kind: 'money',
    read: (s) => s.budget?.total,
    write: (s, v) => ({ ...s, budget: { ...s.budget, total: v as Money } }),
    valid: isMoney,
  },
};

/** The student's answer, or undefined ("Not provided"). */
export const profileAnswer = (abroad: StudyAbroadProfile, id: ProfileQuestionId): ProfileAnswer | undefined =>
  PROFILE_QUESTIONS[id].read(abroad.student ?? {});

/** Which of these questions the student hasn't answered yet. */
export const missingQuestions = (abroad: StudyAbroadProfile, ids: readonly ProfileQuestionId[]) => ids.filter((id) => profileAnswer(abroad, id) === undefined);

/** Saves one answer (invalid answers are ignored, never "corrected"). */
export function answerQuestion(abroad: StudyAbroadProfile, id: ProfileQuestionId, value: ProfileAnswer, now = new Date()): StudyAbroadProfile {
  const q = PROFILE_QUESTIONS[id];
  if (q.options && q.kind === 'choice' && !q.options.includes(String(value))) return abroad;
  if (q.valid && !q.valid(value)) return abroad;
  return { ...abroad, student: { ...q.write(abroad.student ?? {}, value), updatedAt: now.toISOString() } };
}

/** Removes one answer (back to "Not provided"). */
export function clearAnswer(abroad: StudyAbroadProfile, id: ProfileQuestionId, now = new Date()): StudyAbroadProfile {
  const s = structuredClone(abroad.student ?? {});
  const drop: Record<ProfileQuestionId, () => void> = {
    studyLanguage: () => delete s.preferences?.studyLanguage,
    universityType: () => delete s.preferences?.universityType,
    city: () => delete s.preferences?.city,
    educationLevel: () => delete s.education?.level,
    educationField: () => delete s.education?.field,
    educationStatus: () => delete s.education?.status,
    graduationYear: () => delete s.education?.graduationYear,
    result: () => delete s.result,
    englishLevel: () => delete s.english?.level,
    ielts: () => delete s.english?.ielts,
    korean: () => delete s.korean,
    tuitionBudget: () => delete s.budget?.tuition,
    livingBudget: () => delete s.budget?.living,
    totalBudget: () => delete s.budget?.total,
  };
  drop[id]();
  return { ...abroad, student: { ...s, updatedAt: now.toISOString() } };
}

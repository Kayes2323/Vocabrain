// Product-wide constants. Anything that names the product, Mino, or IELTS
// structure lives here so screens never hard-code it.

export const APP_NAME = 'Vocab Brain';
export const APP_TAGLINE =
  'IELTS preparation, vocabulary mastery and study-abroad planning, guided by Mino, your personal AI mentor.';

export const MINO = {
  name: 'Mino',
  role: 'Your Personal AI Mentor',
} as const;

export const IELTS_SKILLS = ['listening', 'reading', 'writing', 'speaking'] as const;
export type IELTSSkill = (typeof IELTS_SKILLS)[number];

export const IELTS_SKILL_LABELS: Record<IELTSSkill, string> = {
  listening: 'Listening',
  reading: 'Reading',
  writing: 'Writing',
  speaking: 'Speaking',
};

/** Valid IELTS band scores, 0.5 steps. Target pickers start at 5.0. */
export const IELTS_TARGET_BANDS = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9] as const;
export const IELTS_SKILL_BANDS = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9] as const;

export const WEEKLY_STUDY_HOUR_OPTIONS = [3, 5, 8, 12, 15] as const;

/** Free users can open this many topic lessons. */
export const FREE_LESSON_LIMIT = 2;
/** Free users can open this word-bank band. Higher bands are premium. */
export const FREE_BAND_LEVEL = 6;

export const DEGREE_LEVELS = [
  { id: 'foundation', label: 'Foundation / Pathway' },
  { id: 'bachelors', label: "Bachelor's" },
  { id: 'masters', label: "Master's" },
  { id: 'phd', label: 'PhD / Doctorate' },
  { id: 'other', label: 'Something else' },
] as const;
export type DegreeLevel = (typeof DEGREE_LEVELS)[number]['id'];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

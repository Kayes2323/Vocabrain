import type { DegreeLevel } from '@/lib/constants';
import { getCountry } from '@/lib/content/countries';
import { SCHOLARSHIPS } from '@/lib/content/scholarships';
import { PROGRAMS, UNIVERSITIES } from '@/lib/content/universities';
import type {
  KoreanLevel,
  Money,
  Program,
  SourcedValue,
  StudyAbroadProfile,
  StudyLanguagePreference,
  University,
  UniversityTypePreference,
} from '@/lib/models';
import { factStatus } from './sections';

/**
 * University & program discovery: factual filters and per-dimension match
 * explanations. There is no ranking and no overall score anywhere here —
 * results keep registry order, and every verdict carries its reason.
 */

/** A value we may rely on: verified or partly verified (stale or not-verified values count as unknown). */
export function usable<T>(sv: SourcedValue<T> | undefined, now = new Date()): T | undefined {
  if (!sv) return undefined;
  const s = factStatus(sv, undefined, now);
  return s === 'verified' || s === 'partly-verified' ? sv.value : undefined;
}

export interface ProgramFilters {
  degreeLevel?: DegreeLevel;
  subject?: string;
  studyLanguage?: StudyLanguagePreference;
  ownership?: UniversityTypePreference;
  city?: string;
  /** Same-currency range only: there is no exchange-rate source, so nothing is converted. */
  tuition?: { min?: Money; max?: Money };
  scholarship?: boolean;
}

export type FilterKey = keyof ProgramFilters;

export interface ProgramRow {
  program: Program;
  university: University;
}

/** Scholarships linked to a program or its university that have a verified record. */
export function verifiedScholarshipIds(row: ProgramRow, now = new Date()): string[] {
  const ids = [...(row.program.scholarshipIds ?? []), ...(row.university.scholarshipIds ?? [])];
  return SCHOLARSHIPS.filter((s) => ids.includes(s.id) && usable(s.eligibility, now) !== undefined).map((s) => s.id);
}

export function studyLanguages(row: ProgramRow, now = new Date()): string[] | undefined {
  return usable(row.program.studyLanguages, now) ?? usable(row.university.studyLanguages, now);
}

type Tri = 'yes' | 'no' | 'unknown';

/** Does one filter hold for a row? Unknown when the data isn't verified or can't be compared. */
export function checkFilter(row: ProgramRow, key: FilterKey, f: ProgramFilters, now = new Date()): Tri {
  const { program, university } = row;
  switch (key) {
    case 'degreeLevel':
      return !f.degreeLevel ? 'yes' : program.degreeLevel === f.degreeLevel ? 'yes' : 'no';
    case 'subject': {
      const q = f.subject?.trim().toLowerCase();
      return !q ? 'yes' : `${program.subject} ${program.title}`.toLowerCase().includes(q) ? 'yes' : 'no';
    }
    case 'studyLanguage': {
      if (!f.studyLanguage || f.studyLanguage === 'either') return 'yes';
      const langs = studyLanguages(row, now);
      const local = getCountry(university.countryCode)?.localLanguage;
      const want = f.studyLanguage === 'en' ? 'en' : local;
      if (!langs || !want) return 'unknown';
      if (langs.includes(want)) return 'yes';
      // A partly verified list names some teaching languages, not all of them: a missing one is unknown, not "no".
      const partial = (row.program.studyLanguages ?? row.university.studyLanguages)?.status === 'partly-verified';
      return partial ? 'unknown' : 'no';
    }
    case 'ownership': {
      if (!f.ownership || f.ownership === 'any') return 'yes';
      const o = usable(university.ownership, now);
      return !o ? 'unknown' : o === f.ownership ? 'yes' : 'no';
    }
    case 'city': {
      const q = f.city?.trim().toLowerCase();
      if (!q) return 'yes';
      return !university.city ? 'unknown' : university.city.toLowerCase() === q ? 'yes' : 'no';
    }
    case 'tuition': {
      const { min, max } = f.tuition ?? {};
      if (!min && !max) return 'yes';
      const fee = usable(program.tuition, now);
      if (!fee) return 'unknown';
      if ((min && min.currency !== fee.currency) || (max && max.currency !== fee.currency)) return 'unknown';
      return (!min || fee.amount >= min.amount) && (!max || fee.amount <= max.amount) ? 'yes' : 'no';
    }
    case 'scholarship':
      return !f.scholarship ? 'yes' : verifiedScholarshipIds(row, now).length ? 'yes' : 'unknown';
  }
}

/** Every reviewed program in a country, with its university. */
export function programRows(countryCode: string): ProgramRow[] {
  const code = countryCode.toUpperCase();
  return PROGRAMS.flatMap((program) => {
    const university = UNIVERSITIES.find((u) => u.id === program.universityId && u.countryCode === code);
    return university ? [{ program, university }] : [];
  });
}

/**
 * Filters rows. `fits` meet every filter on verified data; `unknown` break
 * none but have at least one filter we can't check yet (shown separately,
 * never silently included or dropped).
 */
export function filterPrograms(rows: ProgramRow[], f: ProgramFilters, now = new Date()) {
  const keys = Object.keys(f) as FilterKey[];
  const fits: ProgramRow[] = [];
  const unknown: (ProgramRow & { unknownFilters: FilterKey[] })[] = [];
  for (const row of rows) {
    const results = keys.map((k) => [k, checkFilter(row, k, f, now)] as const);
    if (results.some(([, r]) => r === 'no')) continue;
    const unk = results.filter(([, r]) => r === 'unknown').map(([k]) => k);
    if (unk.length) unknown.push({ ...row, unknownFilters: unk });
    else fits.push(row);
  }
  return { fits, unknown };
}

/** The filters a university record itself can answer (degree, subject, tuition and scholarships belong to programs). */
export const UNIVERSITY_FILTERS = ['studyLanguage', 'ownership', 'city'] as const;

/**
 * The country's reviewed universities against the university-level filters,
 * in registry order (no ranking). `unknown` = can't be checked on verified data.
 */
export function filterUniversities(countryCode: string, f: ProgramFilters, now = new Date()) {
  const code = countryCode.toUpperCase();
  const fits: University[] = [];
  const unknown: (University & { unknownFilters: FilterKey[] })[] = [];
  for (const university of UNIVERSITIES.filter((u) => u.countryCode === code)) {
    const row: ProgramRow = { university, program: { id: '', universityId: university.id, title: '', degreeLevel: 'bachelors', subject: '' } };
    const results = UNIVERSITY_FILTERS.map((k) => [k, checkFilter(row, k, f, now)] as const);
    if (results.some(([, r]) => r === 'no')) continue;
    const unk = results.filter(([, r]) => r === 'unknown').map(([k]) => k);
    if (unk.length) unknown.push({ ...university, unknownFilters: unk });
    else fits.push(university);
  }
  return { fits, unknown };
}

/** Distinct cities of a country's reviewed universities (for the city filter). */
export const universityCities = (countryCode: string) =>
  [...new Set(UNIVERSITIES.filter((u) => u.countryCode === countryCode.toUpperCase() && u.city).map((u) => u.city!))].sort();

// ------------------------------------------------------------------ match explanations

export type MatchDimension = 'degree' | 'subject' | 'studyLanguage' | 'english' | 'otherLanguage' | 'budget' | 'city' | 'ownership' | 'academic';
/** fits ✓ · check △ (verified data that may not fit, or needs reading) · no-data ? · no-profile ? (tell us) */
export type MatchVerdict = 'fits' | 'check' | 'no-data' | 'no-profile';

export interface MatchItem {
  dimension: MatchDimension;
  verdict: MatchVerdict;
}

const TOPIK_LEVEL: Partial<Record<KoreanLevel, number>> = { 'topik-1': 1, 'topik-2': 2, 'topik-3': 3, 'topik-4': 4, 'topik-5': 5, 'topik-6': 6, none: 0, beginner: 0 };

/**
 * How one program lines up with what the student told us — dimension by
 * dimension, each with a verdict. No totals, no ranking.
 */
export function explainMatch(row: ProgramRow, abroad: StudyAbroadProfile, now = new Date()): MatchItem[] {
  const s = abroad.student ?? {};
  const out: MatchItem[] = [];
  const push = (dimension: MatchDimension, verdict: MatchVerdict) => out.push({ dimension, verdict });

  push('degree', !abroad.degreeLevel ? 'no-profile' : abroad.degreeLevel === row.program.degreeLevel ? 'fits' : 'check');
  push('subject', !abroad.subject ? 'no-profile' : checkFilter(row, 'subject', { subject: abroad.subject }, now) === 'yes' ? 'fits' : 'check');

  const lang = s.preferences?.studyLanguage;
  if (!lang) push('studyLanguage', 'no-profile');
  else {
    const r = checkFilter(row, 'studyLanguage', { studyLanguage: lang }, now);
    push('studyLanguage', r === 'yes' ? 'fits' : r === 'no' ? 'check' : 'no-data');
  }

  const eng = usable(row.program.english, now);
  if (!eng) push('english', 'no-data');
  else if (s.english?.ielts === undefined || eng.test !== 'IELTS') push('english', s.english?.ielts === undefined ? 'no-profile' : 'check');
  else push('english', s.english.ielts >= eng.overall ? 'fits' : 'check');

  const other = usable(row.program.otherLanguage, now);
  if (other) {
    const lvl = other.language === 'ko' && s.korean ? TOPIK_LEVEL[s.korean] : undefined;
    if (other.level === undefined) push('otherLanguage', 'check');
    else if (lvl === undefined) push('otherLanguage', 'no-profile');
    else push('otherLanguage', lvl >= other.level ? 'fits' : 'check');
  }

  const budget = s.budget?.tuition;
  const fee = usable(row.program.tuition, now);
  if (!fee) push('budget', 'no-data');
  else if (!budget) push('budget', 'no-profile');
  else if (budget.currency !== fee.currency) push('budget', 'check'); // never converted
  else if (row.program.tuitionPeriod !== 'year') push('budget', 'check'); // the budget is per year; never re-computed
  else push('budget', fee.amount <= budget.amount ? 'fits' : 'check');

  const city = s.preferences?.city;
  if (city) {
    const r = checkFilter(row, 'city', { city }, now);
    push('city', r === 'yes' ? 'fits' : r === 'no' ? 'check' : 'no-data');
  }
  const type = s.preferences?.universityType;
  if (type && type !== 'any') {
    const r = checkFilter(row, 'ownership', { ownership: type }, now);
    push('ownership', r === 'yes' ? 'fits' : r === 'no' ? 'check' : 'no-data');
  }
  // Admission requirements are text: the student reads them; the app never decides eligibility.
  push('academic', usable(row.program.admission, now) ? 'check' : 'no-data');
  return out;
}

/** Filters pre-filled from the profile; the student's own choice on the page always wins. */
export function filtersFromProfile(abroad: StudyAbroadProfile): ProgramFilters {
  const p = abroad.student?.preferences ?? {};
  return {
    ...(abroad.degreeLevel ? { degreeLevel: abroad.degreeLevel } : {}),
    ...(p.studyLanguage ? { studyLanguage: p.studyLanguage } : {}),
    ...(p.universityType ? { ownership: p.universityType } : {}),
    ...(p.city ? { city: p.city } : {}),
  };
}

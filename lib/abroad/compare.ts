import type { Country, CountrySectionId } from '@/lib/models';
import { countrySections, type ResolvedSection } from './sections';
import { PROGRAMS, UNIVERSITIES } from '@/lib/content/universities';
import type { SavedUniversity, SourceRef } from '@/lib/models';
import { studyLanguages, usable, verifiedScholarshipIds } from './programs';

/** What the comparison lines up, in order. Each row is a hub section, so facts come from one place. */
export const COMPARE_ROWS: CountrySectionId[] = ['work', 'post-study', 'living', 'tuition', 'scholarships', 'visa', 'deadlines', 'education'];

export const MAX_COMPARE = 3;

/** Parses ?c=de,gb,ca into up to three known, distinct country codes. */
export function parseCompare(raw: string | null, known: (code: string) => Country | undefined): string[] {
  const out: string[] = [];
  for (const part of (raw ?? '').split(',')) {
    const c = known(part.trim())?.code;
    if (c && !out.includes(c)) out.push(c);
  }
  return out.slice(0, MAX_COMPARE);
}

/** Row × country cells: the section with its facts, or its "not verified" status. */
export function compareTable(countries: Country[], now = new Date()) {
  const sections = countries.map((c) => countrySections(c, now));
  return COMPARE_ROWS.map((id) => ({ id, cells: sections.map((list) => list.find((s) => s.id === id) as ResolvedSection) }));
}

// ------------------------------------------------------------------ universities & programs

export const UNIVERSITY_COMPARE_ROWS = [
  'studyLanguage',
  'ownership',
  'city',
  'tuition',
  'admission',
  'english',
  'otherLanguage',
  'applicationWindow',
  'scholarship',
] as const;
export type UniversityCompareRow = (typeof UNIVERSITY_COMPARE_ROWS)[number];

/** One cell: a verified value with its source, or nothing ("—"). Never a guess, never a winner. */
export interface CompareCell {
  value?: string;
  source?: SourceRef;
  verified?: string;
}

const money = (m: { amount: number; currency: string }) => `${m.currency} ${m.amount.toLocaleString('en-US')}`;

/**
 * Up to three shortlist entries side by side. Only entries linked to a
 * reviewed university/program can show values; the student's own entries
 * show "—" for every factual row until a reviewed record exists.
 */
export function compareUniversities(entries: SavedUniversity[], now = new Date()) {
  const items = entries.slice(0, MAX_COMPARE).map((entry) => {
    const university = entry.universityId ? UNIVERSITIES.find((u) => u.id === entry.universityId) : undefined;
    const program = entry.programId ? PROGRAMS.find((p) => p.id === entry.programId) : undefined;
    return { entry, university, program };
  });
  const cell = <T,>(sv: { value: T; source: SourceRef; lastVerified: string } | undefined, fmt: (v: T) => string): CompareCell => {
    const v = usable(sv, now);
    return v === undefined || !sv ? {} : { value: fmt(v), source: sv.source, verified: sv.lastVerified };
  };
  const rows = UNIVERSITY_COMPARE_ROWS.map((id) => ({
    id,
    cells: items.map(({ university, program }): CompareCell => {
      if (!university) return {};
      switch (id) {
        case 'studyLanguage': {
          const langs = program ? studyLanguages({ program, university }, now) : usable(university.studyLanguages, now);
          const sv = program?.studyLanguages ?? university.studyLanguages;
          return langs && sv ? { value: langs.join(' + ').toUpperCase(), source: sv.source, verified: sv.lastVerified } : {};
        }
        case 'ownership':
          return cell(university.ownership, (v) => v);
        case 'city':
          return university.city ? { value: university.city, source: university.officialSource } : {};
        case 'tuition':
          return cell(program?.tuition, money);
        case 'admission':
          return cell(program?.admission, (v) => v);
        case 'english':
          return cell(program?.english, (v) => `${v.test} ${v.overall}${v.minimumPerSkill ? ` (each ${v.minimumPerSkill})` : ''}`);
        case 'otherLanguage':
          return cell(program?.otherLanguage, (v) => [v.test ?? v.language.toUpperCase(), v.level, v.note].filter((x) => x !== undefined).join(' '));
        case 'applicationWindow':
          return cell(program?.applicationWindow, (v) => `${v.opens ? `${v.opens} – ` : ''}${v.closes}`);
        case 'scholarship': {
          const ids = program ? verifiedScholarshipIds({ program, university }, now) : [];
          return ids.length ? { value: String(ids.length) } : {};
        }
      }
    }),
  }));
  return { items, rows };
}

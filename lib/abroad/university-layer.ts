import type { DegreeLevel } from '@/lib/constants';
import type { Bilingual, ISODate, SourceRef } from '@/lib/models';

/**
 * The country → university → program layer: researched university profiles,
 * their English-taught programs, application steps, and country-level student
 * visa statistics. Every dynamic value carries its own status, source and
 * last-verified date; a value that could not be verified is absent (null),
 * never guessed.
 */

/** Internal verification state (admin/developer layer). */
export type DataStatus = 'verified' | 'partly-verified' | 'not-verified' | 'needs-review' | 'outdated';

/** One global ranking edition. Different ranking systems are never mixed into one number. */
export interface RankingEntry {
  provider: 'QS World University Rankings';
  year: number;
  /** The rank exactly as the provider prints it (e.g. "25", "=158", "601-610"); null = not ranked in this edition. */
  rank: string | null;
  sourceUrl: string;
  lastVerified: ISODate;
  status: DataStatus;
}

export type IntakeStatus = 'confirmed' | 'not-published' | 'varies' | 'needs-review';

/** A sourced piece of text shown to students, with its own status. */
export interface SourcedText {
  text: Bilingual;
  status: DataStatus;
  sources: SourceRef[];
  /** Academic year / intake the value applies to, e.g. "2026/27". */
  period?: string;
  lastVerified: ISODate;
  /** Internal research note (not shown to students). */
  note?: string;
}

export interface IntakeInfo {
  /** Absent when not published or not verified — the UI shows that instead of a guess. */
  value?: Bilingual;
  status: IntakeStatus;
  sources: SourceRef[];
  lastVerified: ISODate;
}

export interface MoneyFact {
  amount: number;
  max?: number;
  currency: string;
  period: 'semester' | 'year' | 'program' | 'one-time';
}

export interface ProgramProfile {
  id: string;
  title: string;
  level: DegreeLevel;
  faculty?: string;
  /** Language(s) of instruction exactly as the source states them. */
  languages: Bilingual;
  /** True only when the source says the program is taught in English only. */
  englishOnly: boolean;
  duration?: Bilingual;
  tuition: SourcedText & { money?: MoneyFact };
  deadline: SourcedText;
  nextIntake: IntakeInfo;
  requirements: SourcedText;
  english: SourcedText;
  /** Documents the program's own sources list; kept separate from the university-wide list. */
  documents?: SourcedText;
  applyVia?: Bilingual;
  url: string;
  sources: SourceRef[];
  lastVerified: ISODate;
}

export interface ApplicationStep {
  title: Bilingual;
  body: Bilingual;
}

export interface UniversityProfile {
  /** Same id as the University record in the country registry. */
  id: string;
  countryCode: string;
  name: string;
  city: string;
  ownership: 'public' | 'private';
  officialUrl: string;
  admissionsUrl?: string;
  ranking: RankingEntry;
  overview: Bilingual;
  /** Study areas only when a source lists them. */
  areas?: Bilingual;
  tuition: SourcedText & { money?: MoneyFact };
  semesterFee?: SourcedText;
  deadlines: SourcedText;
  nextIntake: IntakeInfo;
  admission: SourcedText;
  english: SourcedText;
  documents: { required: Bilingual[]; mayBeRequired: Bilingual[]; status: DataStatus; sources: SourceRef[] };
  applicationFee: SourcedText;
  scholarships: SourcedText;
  /** How applications are submitted (own portal, uni-assist, national portal…). */
  applicationRoute: SourcedText;
  steps: { items: ApplicationStep[]; status: DataStatus; sources: SourceRef[] };
  programs: ProgramProfile[];
  lastVerified: ISODate;
}

export type StatScope = 'bangladesh' | 'all-nationalities';

/** One verified statistic. The scope is always stated; a country total is never shown as Bangladesh-specific. */
export interface VisaStatistic {
  id: string;
  scope: StatScope;
  title: Bilingual;
  /** What exactly is counted (visa type, applicants). */
  covers: Bilingual;
  period: string;
  figures: { label: Bilingual; value: string }[];
  source: SourceRef;
  status: DataStatus;
  lastVerified: ISODate;
}

/** A data point that was researched but could not be verified (kept for the admin layer). */
export interface UnverifiedData {
  id: string;
  label: Bilingual;
  status: 'not-verified' | 'needs-review';
  note: string;
}

export interface CountryUniversityLayer {
  code: string;
  universities: UniversityProfile[];
  visaStats: VisaStatistic[];
  /** Researched but unverified items (e.g. Bangladesh-specific visa approval rate). */
  unverified: UnverifiedData[];
  lastVerified: ISODate;
}

/** Universities in the order the ranking prints them (unranked last), for the "Top universities" list. */
export const byRanking = (list: UniversityProfile[]): UniversityProfile[] =>
  [...list].sort((a, b) => rankNumber(a.ranking.rank) - rankNumber(b.ranking.rank) || a.name.localeCompare(b.name));

export function rankNumber(rank: string | null): number {
  if (!rank) return Number.POSITIVE_INFINITY;
  const n = parseInt(rank.replace(/^=/, ''), 10);
  return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
}

/** "#25" / "#=158" as QS prints it; null when not ranked. */
export const rankLabel = (rank: string | null): string | null => (rank ? `#${rank}` : null);

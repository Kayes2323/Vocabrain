import type { DegreeLevel } from '@/lib/constants';
import type { ID, ISODate, Money, SourceRef, SourcedValue } from './common';

/**
 * Country records hold only sourced, dated facts. Screens read from the
 * registry and never hard-code a country list or a figure.
 */
export interface Country {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  region: 'Europe' | 'North America' | 'Oceania' | 'Asia' | 'Middle East' | 'Africa' | 'Latin America';
  flag: string;
  /** 1–14: position in the priority list for Bangladeshi students; absent = "all countries". */
  priority?: number;
  /** Capital city (stable, not a changeable fact). */
  capital?: string;
  /** One line for the card; written and reviewed in the content phase. */
  tagline?: Bilingual;
  /** Popular study cities; content phase. */
  cities?: string[];
  /** A licensed photo for cards and the hub hero; a styled placeholder is shown until one is added. */
  hero?: LicensedImage;
  data: CountryData;
  /** Reviewed section content beyond what CountryData already holds (explanations, links, completeness). */
  sections?: Partial<Record<CountrySectionId, CountrySection>>;
  /** How this country's roadmap differs from the 16-step template. */
  roadmap?: RoadmapOverride;
}

/** Plain bilingual text for Study Abroad content. */
export interface Bilingual {
  en: string;
  bn: string;
}

/**
 * An image we are allowed to show: where it came from, who made it and under
 * which licence. Never add an image without all of these.
 */
export interface LicensedImage {
  /** Path under /public (e.g. /abroad/countries/kr.webp) or an allowed remote URL. */
  src: string;
  alt: Bilingual;
  /** Author / photographer as the source requires it to be credited. */
  credit: string;
  /** e.g. "Wikimedia Commons", "Unsplash". */
  source: string;
  sourceUrl: string;
  /** e.g. "CC BY-SA 4.0", "Unsplash License". */
  license: string;
}

export interface CountryData {
  tuition?: SourcedValue<{ min: Money; max: Money }>[];
  livingCost?: SourcedValue<Money>[];
  visaInformation?: SourcedValue<string>[];
  workRules?: SourcedValue<string>[];
  postStudyOptions?: SourcedValue<string>[];
  scholarshipInformation?: SourcedValue<string>[];
  language?: SourcedValue<string[]>;
  intakes?: SourcedValue<string[]>;
  applicationPatterns?: SourcedValue<string>[];
  sources?: SourceRef[];
  /** Structured, sourced numbers used by Country Match (never estimated). */
  metrics?: CountryMetrics;
}

export interface CountryMetrics {
  /** Post-study work permission in months (range when it depends on the degree or date). */
  postStudyWorkMonths?: SourcedValue<{ min: number; max: number }>;
  /** Work allowed during term, hours per week. */
  termWorkHoursPerWeek?: SourcedValue<number>;
}

// ============================================================== reusable content
// Content records are reviewed, typed data in the codebase (no CMS yet). Every
// changeable value is a SourcedValue; statuses (open/closed, this week, needs
// review, verified) are always computed from dates, never stored.

/** When a content record was written and last changed (for review and a future API/CMS). */
export interface ContentMeta {
  createdAt: ISODate;
  updatedAt: ISODate;
  /** Clearly marked demonstration data; never shown as real. */
  sample?: boolean;
}

/** The 24 sections of a country hub. */
export const COUNTRY_SECTION_IDS = [
  'why', 'education', 'subjects', 'cities', 'universities', 'tuition', 'living', 'work', 'scholarships',
  'admission', 'english', 'documents', 'application', 'offer', 'visa', 'visa-fees', 'accommodation',
  'student-life', 'culture', 'safety', 'post-study', 'deadlines', 'faq', 'journey',
] as const;
export type CountrySectionId = (typeof COUNTRY_SECTION_IDS)[number];

/** A fact in a section: what it is, and the sourced value. */
export interface SectionFact {
  label: Bilingual;
  fact: SourcedValue<string | Money | number>;
}

/** Reviewed content for one section of one country. */
export interface CountrySection {
  facts?: SectionFact[];
  /** A reviewer confirmed the facts answer the section fully (else it is "partly verified"). */
  complete?: boolean;
  /** Mino's plain-language explanation of the facts above (reviewed; adds no new facts). */
  explanation?: Bilingual;
  /** Official pages to read, even before facts are verified. */
  links?: SourceRef[];
}

export interface University extends Partial<ContentMeta> {
  id: ID;
  name: string;
  countryCode: string;
  city?: string;
  /** The university's own website: always an official source. */
  officialUrl: string;
  applicationPortalUrl?: string;
  programIds?: ID[];
  scholarshipIds?: ID[];
}

export interface EnglishRequirement {
  test: 'IELTS' | 'TOEFL' | 'PTE' | 'Duolingo' | 'other';
  overall: number;
  minimumPerSkill?: number;
}

export interface Program extends Partial<ContentMeta> {
  id: ID;
  universityId: ID;
  title: string;
  degreeLevel: DegreeLevel;
  subject: string;
  language?: string;
  durationMonths?: number;
  tuition?: SourcedValue<Money>;
  english?: SourcedValue<EnglishRequirement>;
  admission?: SourcedValue<string>;
  /** Months (1–12) the program starts. */
  intakes?: number[];
  documents?: DocumentKind[];
  deadlineIds?: ID[];
  officialUrl?: string;
}

export type ScholarshipProvider = 'government' | 'university' | 'other';
export type ScholarshipFunding = 'full' | 'partial';

export interface Scholarship extends Partial<ContentMeta> {
  id: ID;
  name: string;
  provider: ScholarshipProvider;
  /** Absent = open to several countries. */
  countryCode?: string;
  universityId?: ID;
  degreeLevels: DegreeLevel[];
  /** Absent = any subject. */
  subjects?: string[];
  funding: ScholarshipFunding;
  coverage?: SourcedValue<string>;
  eligibility: SourcedValue<string>;
  requirements?: SourcedValue<string>;
  documents?: DocumentKind[];
  applicationMethod?: SourcedValue<string>;
  opensAt?: SourcedValue<ISODate>;
  deadline?: SourcedValue<ISODate>;
  officialUrl: string;
  applyUrl?: string;
}

export type DeadlineKind = 'university' | 'scholarship' | 'intake' | 'application' | 'visa' | 'test' | 'personal';

/** One object for every kind of date; personal ones live in the student's profile. */
export interface Deadline extends Partial<ContentMeta> {
  id: ID;
  kind: DeadlineKind;
  title: Bilingual;
  countryCode?: string;
  /** What the date belongs to (a program, scholarship, visa guide…). */
  owner?: { type: 'program' | 'scholarship' | 'visa' | 'country' | 'test'; id: ID };
  degreeLevel?: DegreeLevel;
  /** Intake the date applies to, e.g. { month: 10, year: 2027 }. */
  intake?: { month: number; year: number };
  date: SourcedValue<ISODate>;
}

export const VISA_PART_IDS = [
  'type', 'eligibility', 'documents', 'finances', 'process', 'portal', 'fees', 'biometrics', 'interview', 'processing', 'mistakes', 'pre-departure',
] as const;
export type VisaPartId = (typeof VISA_PART_IDS)[number];

export interface VisaGuide extends Partial<ContentMeta> {
  countryCode: string;
  /** Official name of the student visa. */
  visaType?: SourcedValue<string>;
  parts: Partial<Record<VisaPartId, CountrySection>>;
}

export type DocumentKind =
  | 'cv'
  | 'sop'
  | 'lor'
  | 'transcript'
  | 'certificate'
  | 'passport'
  | 'financial'
  | 'english-test'
  | 'portfolio'
  | 'other';

/** How to prepare one kind of document (general guidance, not country rules). */
export interface DocumentGuide {
  kind: DocumentKind;
  what: Bilingual;
  why: Bilingual;
  contains: Bilingual[];
  mistakes: Bilingual[];
  checklist: Bilingual[];
  /** Documents Mino will help write with a guided builder later. */
  builder?: 'sop' | 'cv' | 'lor';
  /** Country-specific notes, only from official sources. */
  countryNotes?: Record<string, SourcedValue<string>>;
}

/** A step of a country roadmap (the 16-step template, with per-country overrides). */
export interface RoadmapStepDef {
  id: string;
  /** Journey stage the step belongs to. */
  stage: string;
  title: Bilingual;
  description: Bilingual;
  /** Where the student does the step. */
  action?: { label: Bilingual; href: string };
  documents?: DocumentKind[];
  /** What Mino should help with on this step. */
  minoPrompt?: Bilingual;
}

export interface RoadmapOverride {
  /** Add a country-specific step after `after` (a step id). */
  add?: { after: string; step: RoadmapStepDef; source?: SourceRef }[];
  /** Step ids this country does not need (e.g. no interview). */
  skip?: string[];
  rename?: Record<string, Bilingual>;
}

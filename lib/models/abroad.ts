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
  /** Ways to study here (e.g. degree vs language training), each tied to visa categories. */
  pathways?: StudyPathway[];
  /** Questions the "Can I work?" check may ask (options are country-defined). */
  workQuestions?: WorkQuestion[];
}

// ============================================================== pathways & visas
// Generic: a country lists its pathways and visa categories as data. The
// engines never assume a country-specific id, code or rule.

/** Broad kind, for icons/copy only; behaviour comes from the pathway's data. */
export type PathwayKind = 'degree' | 'language' | 'exchange' | 'vocational' | 'other';

export interface StudyPathway {
  id: string;
  kind: PathwayKind;
  name: Bilingual;
  /** Plain description (general guidance, not an official fact). */
  description?: Bilingual;
  /** Degree levels this pathway covers (absent = not degree-bound). */
  degreeLevels?: DegreeLevel[];
  visaCategoryIds: string[];
  /** Sourced language requirements (e.g. English / local language). */
  languageRequirements?: SectionFact[];
  documents?: DocumentRequirement[];
  /** Roadmap changes for students on this pathway. */
  roadmap?: RoadmapOverride;
  /** Official pages about this pathway. */
  links?: SourceRef[];
}

export interface VisaCategory {
  id: string;
  /** Official code as the country writes it (e.g. a letter-number code). */
  code: string;
  name: Bilingual;
  pathwayIds: string[];
  description?: Bilingual;
  /** Sourced content per visa part; missing parts show "Not verified yet". */
  parts: Partial<Record<VisaPartId, CountrySection>>;
  documents?: DocumentRequirement[];
  roadmap?: RoadmapOverride;
  appliesTo?: Applicability;
  links?: SourceRef[];
}

/** A document a pathway, visa category, program or scholarship asks for. */
export interface DocumentRequirement {
  kind: DocumentKind;
  /** Why it is needed: admission, visa, scholarship… */
  purpose: 'admission' | 'visa' | 'scholarship' | 'arrival' | 'general';
  /** The official statement of the requirement; absent = not verified yet. */
  requirement?: SourcedValue<string>;
  appliesTo?: DocumentApplicability;
}

export interface DocumentApplicability extends Applicability {
  visaCategoryIds?: string[];
  programIds?: string[];
  scholarshipIds?: string[];
}

/** One "Can I work?" question; options are values rules compare against. */
export interface WorkQuestion {
  id: string;
  label: Bilingual;
  options: { value: string; label: Bilingual }[];
}

/**
 * A sourced, conditional work rule. It applies when every condition matches
 * the student's answers; `pathway` and `visaCategory` are built-in inputs.
 */
export interface WorkRule {
  id: string;
  /** input id → accepted values (all must match). */
  conditions: Record<string, string[]>;
  /** What is allowed / required under these conditions. */
  outcome: SourcedValue<string>;
  /** Plain explanation (general guidance). */
  explanation?: Bilingual;
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
  // Appended (never inserted) so 01–24 keep their numbers.
  'arrival',
] as const;
export type CountrySectionId = (typeof COUNTRY_SECTION_IDS)[number];

/**
 * Who a piece of content applies to. Values are ids the country defines (e.g.
 * pathways "degree" / "language"); absent = applies to everyone. The engine
 * never assumes a country-specific value.
 */
export interface Applicability {
  pathways?: string[];
  degreeLevels?: DegreeLevel[];
}

/** A fact in a section: what it is, and the sourced value. */
export interface SectionFact {
  label: Bilingual;
  fact: SourcedValue<string | Money | number>;
  appliesTo?: Applicability;
}

/**
 * A titled, sourced block inside a section (e.g. "Korean language / TOPIK"
 * inside Language requirements, "Who may this suit?" inside Why study here).
 * Keeps the 01–24 section numbering stable while a country adds depth.
 */
export interface SectionBlock {
  id: string;
  title: Bilingual;
  facts?: SectionFact[];
  /** General guidance (not an official fact); shown labelled as such. */
  guidance?: Bilingual;
  /** Official pages to read, even before facts are verified. */
  links?: SourceRef[];
  /** A reviewer confirmed the facts answer the block fully. */
  complete?: boolean;
  appliesTo?: Applicability;
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
  /** Deeper sourced blocks inside this section. */
  blocks?: SectionBlock[];
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
  // Appended so 01–12 keep their numbers.
  'insurance', 'work', 'restrictions',
] as const;
export type VisaPartId = (typeof VISA_PART_IDS)[number];

export interface VisaGuide extends Partial<ContentMeta> {
  countryCode: string;
  /** Official name of the student visa (single-category countries). */
  visaType?: SourcedValue<string>;
  /** Country-level parts (apply to every category). */
  parts: Partial<Record<VisaPartId, CountrySection>>;
  /** Visa categories, when the country has more than one route. */
  categories?: VisaCategory[];
  /** Sourced, conditional work rules for the "Can I work?" check. */
  workRules?: WorkRule[];
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
  | 'photo'
  | 'admission-letter'
  /** A test in a language other than English (e.g. the country's own language). */
  | 'language-test'
  | 'university-specific'
  | 'visa-specific'
  | 'scholarship-specific'
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

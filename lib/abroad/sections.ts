import {
  COUNTRY_SECTION_IDS,
  type Applicability,
  type Country,
  type CountrySection,
  type CountrySectionId,
  type FactStatus,
  type SectionBlock,
  type SectionFact,
  type SourceRef,
  type SourcedValue,
} from '@/lib/models';
import type { DegreeLevel } from '@/lib/constants';

/** The six tabs of a country hub, in order. */
export const HUB_TABS = ['overview', 'universities', 'money', 'apply', 'visa', 'roadmap'] as const;
export type HubTab = (typeof HUB_TABS)[number];

/**
 * Where each section lives, and the action it leads to: every information
 * section ends in something the student can do (information → decision → action).
 * `href` may contain {code} (lower-case country code).
 */
export const SECTION_DEFS: Record<CountrySectionId, { tab: HubTab; action?: { id: string; href: string } }> = {
  why: { tab: 'overview', action: { id: 'fit', href: '/mino?ask=abroad-fit&country={code}' } },
  education: { tab: 'overview' },
  subjects: { tab: 'overview', action: { id: 'shortlist-universities', href: '/abroad/universities?country={code}' } },
  cities: { tab: 'overview' },
  universities: { tab: 'universities', action: { id: 'shortlist-universities', href: '/abroad/universities?country={code}' } },
  tuition: { tab: 'money', action: { id: 'budget', href: '/abroad/cost?country={code}' } },
  living: { tab: 'money', action: { id: 'budget', href: '/abroad/cost?country={code}' } },
  work: { tab: 'money' },
  scholarships: { tab: 'money', action: { id: 'scholarships', href: '/abroad/scholarships?country={code}' } },
  admission: { tab: 'apply', action: { id: 'eligibility', href: 'mark:eligibility' } },
  english: { tab: 'apply', action: { id: 'ielts', href: '/ielts' } },
  documents: { tab: 'apply', action: { id: 'documents', href: '/abroad/documents' } },
  application: { tab: 'apply', action: { id: 'roadmap', href: '/abroad/countries/{code}/roadmap' } },
  offer: { tab: 'apply' },
  visa: { tab: 'visa', action: { id: 'visa', href: '/abroad/visa/{code}' } },
  'visa-fees': { tab: 'visa', action: { id: 'visa', href: '/abroad/visa/{code}' } },
  accommodation: { tab: 'visa' },
  'student-life': { tab: 'overview' },
  culture: { tab: 'overview' },
  safety: { tab: 'overview' },
  'post-study': { tab: 'visa' },
  deadlines: { tab: 'apply', action: { id: 'deadlines', href: '/abroad/deadlines?country={code}' } },
  faq: { tab: 'overview', action: { id: 'ask', href: '/mino?ask=abroad-fit&country={code}' } },
  journey: { tab: 'roadmap', action: { id: 'roadmap', href: '/abroad/countries/{code}/roadmap' } },
  arrival: { tab: 'visa', action: { id: 'roadmap', href: '/abroad/countries/{code}/roadmap' } },
};

/** Sections of one tab, in the approved 01–24 order. */
export const sectionsOfTab = (tab: HubTab) => COUNTRY_SECTION_IDS.filter((id) => SECTION_DEFS[id].tab === tab);
export const sectionNumber = (id: CountrySectionId) => String(COUNTRY_SECTION_IDS.indexOf(id) + 1).padStart(2, '0');

/** How long a verified fact stays trusted before it must be checked again (days). */
export const REVIEW_AFTER_DAYS: Partial<Record<CountrySectionId, number>> = {
  tuition: 180,
  living: 180,
  scholarships: 90,
  visa: 90,
  'visa-fees': 90,
  deadlines: 60,
  'post-study': 180,
  work: 365,
  arrival: 180,
};
const DEFAULT_REVIEW_DAYS = 365;
const DAY = 86_400_000;

/**
 * True when a fact is past its review date, expired, not yet in force, or
 * flagged by a reviewer. The review window counts from the latest of
 * lastVerified and reviewedAt.
 */
export function factNeedsReview(fact: SourcedValue<unknown>, sectionId: CountrySectionId | undefined, now = new Date()): boolean {
  const t = now.getTime();
  if (fact.status === 'needs-review') return true;
  if (fact.validUntil && Date.parse(fact.validUntil) < t) return true;
  if (fact.validFrom && Date.parse(fact.validFrom) > t) return true;
  if (fact.reviewAt) return Date.parse(fact.reviewAt) <= t;
  const days = (sectionId && REVIEW_AFTER_DAYS[sectionId]) ?? DEFAULT_REVIEW_DAYS;
  const checked = Math.max(Date.parse(fact.lastVerified), fact.reviewedAt ? Date.parse(fact.reviewedAt) : 0);
  return checked + days * DAY < t;
}

/** The status a student sees for one fact: the reviewer's judgement, overridden by dates. */
export function factStatus(fact: SourcedValue<unknown>, sectionId: CountrySectionId | undefined, now = new Date()): FactStatus {
  if (fact.status === 'not-verified') return 'not-verified';
  if (factNeedsReview(fact, sectionId, now)) return 'needs-review';
  return fact.status ?? 'verified';
}

/** Status of a section or block (a group of facts). */
export type SectionStatus = 'verified' | 'partial' | 'needs-review' | 'not-yet';

/**
 * Only facts a student may see count: "not-verified" facts are never shown
 * (their source becomes an official page to read instead).
 */
export function groupStatus(facts: SectionFact[], complete: boolean | undefined, reviewAs: CountrySectionId | undefined, now = new Date()): SectionStatus {
  if (facts.length === 0) return 'not-yet';
  const statuses = facts.map((f) => factStatus(f.fact, reviewAs, now));
  if (statuses.includes('needs-review')) return 'needs-review';
  if (statuses.includes('partly-verified') || !complete) return 'partial';
  return 'verified';
}

/** Splits facts into the ones to show and the sources of hidden (not-verified) ones. */
export function visibleFacts(facts: SectionFact[]): { shown: SectionFact[]; pending: SourceRef[] } {
  const shown: SectionFact[] = [];
  const pending: SourceRef[] = [];
  for (const f of facts) {
    if (f.fact.status === 'not-verified') {
      if (f.fact.source.url && !pending.some((p) => p.url === f.fact.source.url)) pending.push(f.fact.source);
    } else shown.push(f);
  }
  return { shown, pending };
}

/** What we know about the student, for filtering content by applicability. */
export interface ApplicabilityContext {
  pathway?: string;
  degreeLevel?: DegreeLevel;
}

/**
 * Whether content applies to the student. Unknown student answers never hide
 * content (they see everything, labelled with who it is for).
 */
export function appliesTo(app: Applicability | undefined, ctx: ApplicabilityContext = {}): boolean {
  if (!app) return true;
  if (app.pathways?.length && ctx.pathway && !app.pathways.includes(ctx.pathway)) return false;
  if (app.degreeLevels?.length && ctx.degreeLevel && !app.degreeLevels.includes(ctx.degreeLevel)) return false;
  return true;
}

export interface ResolvedBlock extends Omit<SectionBlock, 'facts'> {
  status: SectionStatus;
  facts: SectionFact[];
  stale: number;
}

export function resolveBlock(block: SectionBlock, reviewAs: CountrySectionId, now: Date): ResolvedBlock {
  const { shown, pending } = visibleFacts(block.facts ?? []);
  const links = [...(block.links ?? []), ...pending.filter((p) => !block.links?.some((l) => l.url === p.url))];
  return {
    ...block,
    facts: shown,
    ...(links.length ? { links } : {}),
    status: groupStatus(shown, block.complete, reviewAs, now),
    stale: shown.filter((f) => factNeedsReview(f.fact, reviewAs, now)).length,
  };
}

export interface ResolvedSection extends Omit<CountrySection, 'blocks'> {
  id: CountrySectionId;
  number: string;
  tab: HubTab;
  /** Status over the section's own facts and all its blocks. */
  status: SectionStatus;
  facts: SectionFact[];
  blocks: ResolvedBlock[];
  /** Facts that must be checked again before they are relied on. */
  stale: number;
}

const L = (en: string, bn: string) => ({ en, bn });

/**
 * Facts the country registry already holds (CountryData), placed in their
 * section. Nothing is copied into two places: sections read the registry.
 */
function derivedFacts(country: Country): Partial<Record<CountrySectionId, SectionFact[]>> {
  const d = country.data;
  const text = <T,>(list: SourcedValue<T>[] | undefined, label: ReturnType<typeof L>, fmt: (v: T) => string | SectionFact['fact']['value']) =>
    (list ?? []).map((f): SectionFact => ({ label, fact: { ...f, value: fmt(f.value) } }));
  return {
    work: text(d.workRules, L('Work while studying', 'পড়ার সময় কাজ'), (v) => v),
    living: text(d.livingCost, L('Money to show (official)', 'দেখানোর মতো টাকা (official)'), (v) => v),
    'post-study': text(d.postStudyOptions, L('After your studies', 'পড়া শেষে'), (v) => v),
    tuition: text(d.tuition, L('Tuition', 'Tuition'), (v) => `${v.min.currency} ${v.min.amount.toLocaleString('en-US')}–${v.max.amount.toLocaleString('en-US')}`),
    scholarships: text(d.scholarshipInformation, L('Scholarships', 'Scholarship'), (v) => v),
    visa: text(d.visaInformation, L('Student visa', 'Student visa'), (v) => v),
    application: text(d.applicationPatterns, L('How applications work', 'Application কীভাবে হয়'), (v) => v),
    deadlines: text(d.intakes ? [d.intakes] : undefined, L('Intakes', 'Intake'), (v) => v.join(', ')),
    education: text(d.language ? [d.language] : undefined, L('Languages of study', 'পড়াশোনার ভাষা'), (v) => v.join(', ')),
  };
}

/**
 * Every section of a country, with its facts, blocks and a computed status.
 * A section is "verified" only when it and every block with facts are.
 * With a context, facts and blocks for other pathways/degrees are left out.
 */
export function countrySections(country: Country, now = new Date(), ctx?: ApplicabilityContext): ResolvedSection[] {
  const derived = derivedFacts(country);
  return COUNTRY_SECTION_IDS.map((id) => {
    const { blocks: ownBlocks, ...own } = country.sections?.[id] ?? {};
    const { shown, pending } = visibleFacts([...(derived[id] ?? []), ...(own.facts ?? [])].filter((f) => appliesTo(f.appliesTo, ctx)));
    const blocks = (ownBlocks ?? []).filter((b) => appliesTo(b.appliesTo, ctx)).map((b) => resolveBlock({ ...b, facts: b.facts?.filter((f) => appliesTo(f.appliesTo, ctx)) }, id, now));
    const links = [...(own.links ?? []), ...pending.filter((p) => !own.links?.some((l) => l.url === p.url))];
    const ownStatus = groupStatus(shown, own.complete, id, now);
    const withFacts = [...(shown.length ? [ownStatus] : []), ...blocks.filter((b) => b.facts.length).map((b) => b.status)];
    const status: SectionStatus =
      withFacts.length === 0 ? 'not-yet' : withFacts.includes('needs-review') ? 'needs-review' : withFacts.every((x) => x === 'verified') ? 'verified' : 'partial';
    const stale = shown.filter((f) => factNeedsReview(f.fact, id, now)).length + blocks.reduce((n, b) => n + b.stale, 0);
    return { ...own, ...(links.length ? { links } : {}), id, number: sectionNumber(id), tab: SECTION_DEFS[id].tab, status, facts: shown, blocks, stale };
  });
}

/** Tab-level summary: how many of its sections have verified or partly verified facts. */
export function tabProgress(sections: ResolvedSection[], tab: HubTab) {
  const list = sections.filter((s) => s.tab === tab);
  return { total: list.length, withFacts: list.filter((s) => s.status !== 'not-yet').length, verified: list.filter((s) => s.status === 'verified').length };
}

/** Fills {code} in an action link. */
export const actionHref = (href: string, code: string) => href.replace(/\{code\}/g, code.toLowerCase());

import { COUNTRY_SECTION_IDS, type Country, type CountrySection, type CountrySectionId, type SectionFact, type SourcedValue } from '@/lib/models';

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
  tuition: { tab: 'money', action: { id: 'budget', href: '/abroad/country-match' } },
  living: { tab: 'money', action: { id: 'budget', href: '/abroad/country-match' } },
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
};
const DEFAULT_REVIEW_DAYS = 365;
const DAY = 86_400_000;

/** True when a fact is past its review date, expired, or not yet in force. */
export function factNeedsReview(fact: SourcedValue<unknown>, sectionId: CountrySectionId | undefined, now = new Date()): boolean {
  const t = now.getTime();
  if (fact.validUntil && Date.parse(fact.validUntil) < t) return true;
  if (fact.reviewAt) return Date.parse(fact.reviewAt) <= t;
  const days = (sectionId && REVIEW_AFTER_DAYS[sectionId]) ?? DEFAULT_REVIEW_DAYS;
  return Date.parse(fact.lastVerified) + days * DAY < t;
}

export type SectionStatus = 'verified' | 'partial' | 'not-yet';

export interface ResolvedSection extends CountrySection {
  id: CountrySectionId;
  number: string;
  tab: HubTab;
  status: SectionStatus;
  facts: SectionFact[];
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

/** Every section of a country, with its facts and a computed status. */
export function countrySections(country: Country, now = new Date()): ResolvedSection[] {
  const derived = derivedFacts(country);
  return COUNTRY_SECTION_IDS.map((id) => {
    const own = country.sections?.[id] ?? {};
    const facts = [...(derived[id] ?? []), ...(own.facts ?? [])];
    const stale = facts.filter((f) => factNeedsReview(f.fact, id, now)).length;
    const status: SectionStatus = facts.length === 0 ? 'not-yet' : own.complete && stale === 0 ? 'verified' : 'partial';
    return { ...own, id, number: sectionNumber(id), tab: SECTION_DEFS[id].tab, status, facts, stale };
  });
}

/** Tab-level summary: how many of its sections have verified or partly verified facts. */
export function tabProgress(sections: ResolvedSection[], tab: HubTab) {
  const list = sections.filter((s) => s.tab === tab);
  return { total: list.length, withFacts: list.filter((s) => s.status !== 'not-yet').length, verified: list.filter((s) => s.status === 'verified').length };
}

/** Fills {code} in an action link. */
export const actionHref = (href: string, code: string) => href.replace(/\{code\}/g, code.toLowerCase());

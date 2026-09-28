import type { DegreeLevel } from '@/lib/constants';
import type { Bilingual, SourceRef } from '@/lib/models';

/**
 * Country → degree → questions and answers: the Study Abroad reading guide.
 *
 * Each country has its own guide (its own file, nothing inherited from
 * another country). An answer is written in plain language from facts already
 * read from official sources, lists those sources, and says when a fact is
 * not (fully) verified. Unknown stays unknown: such an answer says so.
 * University, scholarship and cost figures are not re-typed here; the page
 * reads them from the existing registries (see `embed`).
 */

export type GuideStatus = 'verified' | 'partly-verified' | 'needs-review' | 'not-verified';

/** What an answer is: an official fact, a planning estimate, or general guidance (never shown as a fact). */
export type GuideKind = 'fact' | 'estimate' | 'guidance';

export interface GuideAnswer {
  id: string;
  q: Bilingual;
  /** Short paragraphs. */
  a: Bilingual[];
  /** An optional list under the paragraphs. */
  list?: Bilingual[];
  /** Omitted = verified. */
  status?: GuideStatus;
  /** Omitted = fact. */
  kind?: GuideKind;
  /** high = the authority itself (embassy, ministry); medium = an official summary (e.g. DAAD). */
  confidence?: 'high' | 'medium';
  /** Two official sources disagree: both are cited and neither is chosen. */
  discrepancy?: Bilingual;
  /** The same rule for every degree level (labelled so on the page). */
  allDegrees?: boolean;
  sources: SourceRef[];
}

/** One money line exactly as its source states it (never converted). */
export interface GuideCost {
  id: string;
  label: Bilingual;
  /** Amount and period in the source's own currency, e.g. "₩5,000,000–7,000,000 per semester". */
  value: Bilingual;
  note?: Bilingual;
  status?: GuideStatus;
  /** Structured amount (the source's currency; never converted). */
  amount?: { value: number; max?: number; currency: string; period: 'semester' | 'month' | 'year' | 'one-time' };
  /** Who or what the amount applies to. */
  appliesTo?: Bilingual;
  source: SourceRef;
}

export interface GuideCosts {
  /** Stated by an official body for a specific fee (a university's fee page, the Embassy's visa fee…). */
  official: GuideCost[];
  /** Planning ranges (e.g. the Ministry of Education guidebook). Never called official. */
  estimates: GuideCost[];
}

/** Data the page reads from the existing registries, filtered to the country and degree. */
export type GuideEmbed = 'costs' | 'universities' | 'scholarships' | 'documents';

/** Where a document belongs: general, program-specific, visa, Bangladesh-specific, after arrival. */
export const DOC_GROUPS = ['general', 'program', 'visa', 'bangladesh', 'arrival'] as const;
export type GuideDocGroup = (typeof DOC_GROUPS)[number];

/** One document, explained once and referenced from every group that needs it. */
export interface GuideDocument {
  id: string;
  name: Bilingual;
  why: Bilingual;
  who: Bilingual;
  when: Bilingual;
  where: Bilingual;
  prepare: Bilingual;
  groups: GuideDocGroup[];
  /** Omitted = every degree. */
  degrees?: GuideDegree[];
  status?: GuideStatus;
  sources: SourceRef[];
}

/**
 * A comparable, sourced value for Mino's future country comparison (not shown
 * to students yet). Estimates stay estimates; a not-verified factor has no value.
 */
export interface GuideFactor {
  id: 'public-tuition' | 'funds-to-show' | 'living-cost' | 'work-during-study' | 'post-study-stay' | 'english-programs' | 'visa-fee';
  value?: { min?: number; max?: number; unit: string; text: Bilingual };
  kind: GuideKind;
  status: GuideStatus;
  degrees?: GuideDegree[];
  source?: SourceRef;
}

export type GuideItem = GuideAnswer | { embed: GuideEmbed };

export interface GuideSection {
  id: string;
  title: Bilingual;
  items: GuideItem[];
}

export const GUIDE_DEGREES = ['bachelors', 'masters', 'phd'] as const satisfies readonly DegreeLevel[];
export type GuideDegree = (typeof GUIDE_DEGREES)[number];

export interface DegreeGuide {
  level: GuideDegree;
  /** One line on the degree card. */
  card: Bilingual;
  intro: Bilingual;
  sections: GuideSection[];
  costs: GuideCosts;
}

export interface CountryGuide {
  code: string;
  intro: Bilingual;
  overview: GuideAnswer[];
  faqs: GuideAnswer[];
  degrees: Record<GuideDegree, DegreeGuide>;
  /** The date the facts were last read from their sources (YYYY-MM-DD). */
  checkedAt: string;
  /** Living in the country (accommodation, transport, registration…), shown after the questions. */
  life?: GuideAnswer[];
  /** Documents, each explained once (the `documents` embed groups them). */
  documents?: GuideDocument[];
  /** Show a small source list at the end of each major section. */
  sourcesPerSection?: boolean;
  /** Comparable values for Mino (future country comparison). */
  factors?: GuideFactor[];
}

export const isAnswer = (item: GuideItem): item is GuideAnswer => 'q' in item;

export const isGuideDegree = (level: string | undefined): level is GuideDegree => (GUIDE_DEGREES as readonly string[]).includes(level ?? '');

/** Every source a set of answers and costs cites, once each, in first-cited order. */
export function guideSources(answers: GuideAnswer[], costs: GuideCost[] = [], extra: SourceRef[] = []): SourceRef[] {
  const out: SourceRef[] = [];
  const add = (s: SourceRef) => {
    if (!out.some((x) => x.url === s.url && x.name === s.name)) out.push(s);
  };
  answers.forEach((a) => a.sources.forEach(add));
  costs.forEach((c) => add(c.source));
  extra.forEach(add);
  return out;
}

/** All answers in a degree guide, in reading order. */
export const degreeAnswers = (d: DegreeGuide): GuideAnswer[] => d.sections.flatMap((s) => s.items.filter(isAnswer));

/** A country's documents for one degree (each once). */
export const documentsFor = (g: CountryGuide, level: GuideDegree): GuideDocument[] => (g.documents ?? []).filter((d) => !d.degrees || d.degrees.includes(level));

/**
 * What Mino may use from a guide: each answer labelled FACT / ESTIMATE /
 * GUIDANCE, or NOT VERIFIED with no answer text (so nothing unverified can be
 * repeated as fact). Filtered to one degree when the student has one.
 */
export function guideForMino(g: CountryGuide, level?: GuideDegree) {
  const label = (a: GuideAnswer) =>
    a.status === 'not-verified' ? 'NOT VERIFIED' : a.kind === 'estimate' ? 'ESTIMATE' : a.kind === 'guidance' ? 'GUIDANCE' : 'FACT';
  const item = (a: GuideAnswer) => ({
    question: a.q.en,
    label: label(a),
    ...(a.status === 'not-verified' ? {} : { answer: a.a.map((p) => p.en).join(' ') }),
    ...(a.status && a.status !== 'verified' ? { status: a.status } : {}),
    ...(a.discrepancy ? { sourcesDisagree: a.discrepancy.en } : {}),
    sources: a.sources.map((s) => ({ name: s.name, url: s.url })),
  });
  const levels = level ? [level] : GUIDE_DEGREES;
  const costs = (l: GuideDegree) => [
    ...g.degrees[l].costs.official.filter((c) => c.status !== 'not-verified').map((c) => ({ label: 'FACT', item: c.label.en, value: c.value.en, ...(c.status && c.status !== 'verified' ? { status: c.status } : {}), source: c.source.name })),
    ...g.degrees[l].costs.estimates.map((c) => ({ label: 'ESTIMATE', item: c.label.en, value: c.value.en, source: c.source.name })),
  ];
  return {
    checkedAt: g.checkedAt,
    overview: g.overview.map(item),
    mostAsked: g.faqs.map(item),
    ...(g.life ? { living: g.life.map(item) } : {}),
    degrees: Object.fromEntries(levels.map((l) => [l, { answers: degreeAnswers(g.degrees[l]).map(item), costs: costs(l) }])),
    ...(g.documents ? { documents: g.documents.filter((d) => !level || !d.degrees || d.degrees.includes(level)).map((d) => ({ name: d.name.en, label: d.status === 'not-verified' ? 'NOT VERIFIED' : 'FACT', groups: d.groups, ...(d.status === 'not-verified' ? {} : { why: d.why.en, when: d.when.en, where: d.where.en }) })) } : {}),
    factors: (g.factors ?? []).filter((f) => !level || !f.degrees || f.degrees.includes(level)).map((f) => ({ id: f.id, label: f.status === 'not-verified' ? 'NOT VERIFIED' : f.kind.toUpperCase(), ...(f.status === 'not-verified' || !f.value ? {} : { value: f.value.text.en }), ...(f.source ? { source: f.source.name } : {}) })),
    rule: 'Answer from these labelled items only. FACT = official; ESTIMATE = a planning range, always say it is an estimate; GUIDANCE = general advice; NOT VERIFIED = say it is not verified yet and point to the official source. When sourcesDisagree is present, name both sources and do not choose one.',
  };
}

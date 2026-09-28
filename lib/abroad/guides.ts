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

export interface GuideAnswer {
  id: string;
  q: Bilingual;
  /** Short paragraphs. */
  a: Bilingual[];
  /** An optional list under the paragraphs. */
  list?: Bilingual[];
  /** Omitted = verified. */
  status?: GuideStatus;
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
  source: SourceRef;
}

export interface GuideCosts {
  /** Stated by an official body for a specific fee (a university's fee page, the Embassy's visa fee…). */
  official: GuideCost[];
  /** Planning ranges (e.g. the Ministry of Education guidebook). Never called official. */
  estimates: GuideCost[];
}

/** Data the page reads from the existing registries, filtered to the country and degree. */
export type GuideEmbed = 'costs' | 'universities' | 'scholarships';

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

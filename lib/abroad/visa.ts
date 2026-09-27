import { visaGuide } from '@/lib/content/visa';
import { getVisaCategory } from './pathways';
import { VISA_PART_IDS, type Country, type SectionFact, type SourceRef, type SourcedValue, type VisaCategory, type VisaPartId } from '@/lib/models';
import { appliesTo, factNeedsReview, factStatus, groupStatus, type ApplicabilityContext, resolveBlock, visibleFacts, type ResolvedBlock, type SectionStatus } from './sections';

export interface ResolvedVisaPart {
  id: VisaPartId;
  number: string;
  status: SectionStatus;
  facts: SectionFact[];
  stale: number;
  links?: SourceRef[];
  explanation?: { en: string; bn: string };
  /** Deeper sourced blocks (e.g. subtypes, or a country-specific requirement not verified yet). */
  blocks?: ResolvedBlock[];
}

/**
 * The 12 parts of a country's student-visa guide. Facts come from the
 * reviewed VisaGuide, plus official facts the country registry already holds
 * (money to show → finances). A part without facts is "not verified yet";
 * the official visa pages the hub lists are offered on "portal".
 */
export function visaParts(country: Country, now = new Date(), categoryId?: string, ctx?: ApplicabilityContext): ResolvedVisaPart[] {
  const guide = visaGuide(country.code);
  // Country-level parts apply to every category; a category adds its own.
  const category = getVisaCategory(country, categoryId);
  const derived: Partial<Record<VisaPartId, SectionFact[]>> = {
    finances: (country.data.livingCost ?? []).map((f) => ({ label: { en: 'Money to show', bn: 'যে টাকা দেখাতে হবে' }, fact: f })),
    type: category?.officialName
      ? [{ label: { en: 'Official visa name', bn: 'Official visa-র নাম' }, fact: category.officialName }]
      : !category && guide?.visaType
        ? [{ label: { en: 'Visa name', bn: 'Visa-র নাম' }, fact: guide.visaType }]
        : [],
  };
  return VISA_PART_IDS.map((id, i) => {
    const owns = [guide?.parts[id], category?.parts[id]].filter((x): x is NonNullable<typeof x> => Boolean(x));
    const own = { explanation: category?.parts[id]?.explanation ?? guide?.parts[id]?.explanation };
    const complete = owns.length > 0 && owns.every((o) => o.complete);
    // With a context (e.g. the student's degree), facts and blocks for other degrees/pathways are left out.
    const { shown: facts, pending } = visibleFacts([...(derived[id] ?? []), ...owns.flatMap((o) => o.facts ?? [])].filter((f) => appliesTo(f.appliesTo, ctx)));
    const stale = facts.filter((f) => factNeedsReview(f.fact, 'visa', now)).length;
    const blocks = owns
      .flatMap((o) => o.blocks ?? [])
      .filter((b) => appliesTo(b.appliesTo, ctx))
      .map((b) => resolveBlock({ ...b, facts: b.facts?.filter((f) => appliesTo(f.appliesTo, ctx)) }, 'visa', now));
    const withFacts = [...(facts.length ? [groupStatus(facts, complete, 'visa', now)] : []), ...blocks.filter((b) => b.facts.length).map((b) => b.status)];
    const status: SectionStatus =
      withFacts.length === 0 ? 'not-yet' : withFacts.includes('needs-review') ? 'needs-review' : withFacts.every((x) => x === 'verified') ? 'verified' : 'partial';
    const ownLinks = owns.flatMap((o) => o.links ?? []);
    const links = [...(id === 'portal' ? [...ownLinks, ...(category?.links ?? []), ...(country.sections?.visa?.links ?? [])] : ownLinks), ...pending];
    return {
      id,
      number: String(i + 1).padStart(2, '0'),
      status,
      facts,
      stale: stale + blocks.reduce((n, b) => n + b.stale, 0),
      ...(links.length ? { links } : {}),
      ...(own.explanation ? { explanation: own.explanation } : {}),
      ...(blocks.length ? { blocks } : {}),
    };
  });
}

/** A category's official name, only when it may be shown (verified or partly verified, never not-verified). */
export function verifiedVisaName(category: Pick<VisaCategory, 'officialName'> | undefined, now = new Date()): SourcedValue<string> | undefined {
  const n = category?.officialName;
  return n && factStatus(n, 'visa', now) !== 'not-verified' ? n : undefined;
}

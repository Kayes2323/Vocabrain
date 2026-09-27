import { visaGuide } from '@/lib/content/visa';
import { getVisaCategory } from './pathways';
import { VISA_PART_IDS, type Country, type SectionFact, type SourceRef, type VisaPartId } from '@/lib/models';
import { factNeedsReview, groupStatus, visibleFacts, type SectionStatus } from './sections';

export interface ResolvedVisaPart {
  id: VisaPartId;
  number: string;
  status: SectionStatus;
  facts: SectionFact[];
  stale: number;
  links?: SourceRef[];
  explanation?: { en: string; bn: string };
}

/**
 * The 12 parts of a country's student-visa guide. Facts come from the
 * reviewed VisaGuide, plus official facts the country registry already holds
 * (money to show → finances). A part without facts is "not verified yet";
 * the official visa pages the hub lists are offered on "portal".
 */
export function visaParts(country: Country, now = new Date(), categoryId?: string): ResolvedVisaPart[] {
  const guide = visaGuide(country.code);
  // Country-level parts apply to every category; a category adds its own.
  const category = getVisaCategory(country, categoryId);
  const derived: Partial<Record<VisaPartId, SectionFact[]>> = {
    finances: (country.data.livingCost ?? []).map((f) => ({ label: { en: 'Money to show', bn: 'যে টাকা দেখাতে হবে' }, fact: f })),
    type: !category && guide?.visaType ? [{ label: { en: 'Visa name', bn: 'Visa-র নাম' }, fact: guide.visaType }] : [],
  };
  return VISA_PART_IDS.map((id, i) => {
    const owns = [guide?.parts[id], category?.parts[id]].filter((x): x is NonNullable<typeof x> => Boolean(x));
    const own = { explanation: category?.parts[id]?.explanation ?? guide?.parts[id]?.explanation };
    const complete = owns.length > 0 && owns.every((o) => o.complete);
    const { shown: facts, pending } = visibleFacts([...(derived[id] ?? []), ...owns.flatMap((o) => o.facts ?? [])]);
    const stale = facts.filter((f) => factNeedsReview(f.fact, 'visa', now)).length;
    const status: SectionStatus = groupStatus(facts, complete, 'visa', now);
    const ownLinks = owns.flatMap((o) => o.links ?? []);
    const links = [...(id === 'portal' ? [...ownLinks, ...(category?.links ?? []), ...(country.sections?.visa?.links ?? [])] : ownLinks), ...pending];
    return { id, number: String(i + 1).padStart(2, '0'), status, facts, stale, ...(links.length ? { links } : {}), ...(own.explanation ? { explanation: own.explanation } : {}) };
  });
}

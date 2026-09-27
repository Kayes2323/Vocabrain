import { visaGuide } from '@/lib/content/visa';
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
export function visaParts(country: Country, now = new Date()): ResolvedVisaPart[] {
  const guide = visaGuide(country.code);
  const derived: Partial<Record<VisaPartId, SectionFact[]>> = {
    finances: (country.data.livingCost ?? []).map((f) => ({ label: { en: 'Money to show', bn: 'যে টাকা দেখাতে হবে' }, fact: f })),
    type: guide?.visaType ? [{ label: { en: 'Visa name', bn: 'Visa-র নাম' }, fact: guide.visaType }] : [],
  };
  return VISA_PART_IDS.map((id, i) => {
    const own = guide?.parts[id] ?? {};
    const { shown: facts, pending } = visibleFacts([...(derived[id] ?? []), ...(own.facts ?? [])]);
    const stale = facts.filter((f) => factNeedsReview(f.fact, 'visa', now)).length;
    const status: SectionStatus = groupStatus(facts, own.complete, 'visa', now);
    const links = [...(id === 'portal' ? [...(own.links ?? []), ...(country.sections?.visa?.links ?? [])] : (own.links ?? [])), ...pending];
    return { id, number: String(i + 1).padStart(2, '0'), status, facts, stale, ...(links.length ? { links } : {}), ...(own.explanation ? { explanation: own.explanation } : {}) };
  });
}

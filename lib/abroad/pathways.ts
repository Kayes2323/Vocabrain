import { visaGuide } from '@/lib/content/visa';
import type { Country, StudyAbroadProfile, StudyPathway, VisaCategory } from '@/lib/models';
import type { ApplicabilityContext } from './sections';

/**
 * Study pathways and visa categories, read from each country's data. Nothing
 * here knows a specific country: a country without pathways behaves exactly
 * as before (one route, country-level visa guide).
 */
export const countryPathways = (country: Pick<Country, 'pathways'> | undefined): StudyPathway[] => country?.pathways ?? [];

export function getPathway(country: Pick<Country, 'pathways'> | undefined, id: string | undefined): StudyPathway | undefined {
  return id ? countryPathways(country).find((p) => p.id === id) : undefined;
}

/** The student's pathway for a country, if they chose one that the country still offers. */
export function selectedPathway(abroad: StudyAbroadProfile, country: Pick<Country, 'code' | 'pathways'> | undefined): StudyPathway | undefined {
  return country ? getPathway(country, abroad.pathwayByCountry?.[country.code]) : undefined;
}

/** Saves (or clears) the pathway for one country; other countries' choices stay. */
export function setPathway(abroad: StudyAbroadProfile, code: string, pathwayId: string | undefined): StudyAbroadProfile {
  const next = { ...abroad.pathwayByCountry };
  if (pathwayId) next[code.toUpperCase()] = pathwayId;
  else delete next[code.toUpperCase()];
  return { ...abroad, pathwayByCountry: next };
}

/** What content filtering needs to know about the student for this country. */
export function pathwayContext(abroad: StudyAbroadProfile, country: Pick<Country, 'code' | 'pathways'> | undefined): ApplicabilityContext {
  const pathway = selectedPathway(abroad, country);
  return { ...(pathway ? { pathway: pathway.id } : {}), ...(abroad.degreeLevel ? { degreeLevel: abroad.degreeLevel } : {}) };
}

/** Visa categories of a country; with a pathway, only the ones that pathway uses. */
export function visaCategoriesFor(country: Pick<Country, 'code' | 'pathways'>, pathwayId?: string): VisaCategory[] {
  const all = visaGuide(country.code)?.categories ?? [];
  const pathway = getPathway(country, pathwayId);
  if (!pathway) return all;
  return all.filter((c) => pathway.visaCategoryIds.includes(c.id) || c.pathwayIds.includes(pathway.id));
}

export function getVisaCategory(country: Pick<Country, 'code'>, id: string | undefined): VisaCategory | undefined {
  return id ? visaGuide(country.code)?.categories?.find((c) => c.id === id) : undefined;
}

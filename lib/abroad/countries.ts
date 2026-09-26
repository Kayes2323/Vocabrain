import type { Country } from '@/lib/models';

/**
 * What a country card may say. Only topics backed by a verified official fact
 * appear; the exact figures and their sources live on the country hub.
 */
export type IndicatorId = 'work' | 'postStudy' | 'living' | 'tuition' | 'scholarships';

export interface CountryIndicators {
  verified: IndicatorId[];
  /** Number of verified official facts for the country. */
  facts: number;
}

export function countryIndicators(country: Country): CountryIndicators {
  const d = country.data;
  const verified: IndicatorId[] = [];
  if (d.workRules?.length || d.metrics?.termWorkHoursPerWeek) verified.push('work');
  if (d.postStudyOptions?.length || d.metrics?.postStudyWorkMonths) verified.push('postStudy');
  if (d.livingCost?.length) verified.push('living');
  if (d.tuition?.length) verified.push('tuition');
  if (d.scholarshipInformation?.length) verified.push('scholarships');
  const facts = Object.entries(d).reduce((n, [key, v]) => (!v || key === 'sources' || key === 'metrics' ? n : n + (Array.isArray(v) ? v.length : 1)), 0);
  return { verified, facts };
}

/** Canonical country URL (lower-case code). */
export const countryHref = (code: string, tab?: string) => `/abroad/countries/${code.toLowerCase()}${tab ? `?tab=${tab}` : ''}`;

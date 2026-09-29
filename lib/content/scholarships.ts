import type { Scholarship } from '@/lib/models';
import { KR_SCHOLARSHIPS } from './kr-scholarships';
import { DE_SCHOLARSHIPS } from './de-registry';
import { GB_SCHOLARSHIPS } from './gb-registry';
import { AU_SCHOLARSHIPS } from './au-registry';
import { US_SCHOLARSHIPS } from './us-registry';
import { IT_SCHOLARSHIPS } from './it-registry';
import { JP_SCHOLARSHIPS } from './jp-registry';
import { TR_SCHOLARSHIPS } from './tr-registry';

/**
 * Reviewed scholarship records. Each one is checked on its
 * official page (eligibility, coverage, opening date and deadline as
 * SourcedValues). Status (open / opening soon / closed / passed) is always
 * computed from those dates — see lib/abroad/status.ts.
 */
export const SCHOLARSHIPS: Scholarship[] = [...KR_SCHOLARSHIPS, ...DE_SCHOLARSHIPS, ...JP_SCHOLARSHIPS, ...IT_SCHOLARSHIPS, ...TR_SCHOLARSHIPS, ...GB_SCHOLARSHIPS, ...AU_SCHOLARSHIPS, ...US_SCHOLARSHIPS];

export const scholarshipsFor = (code: string | undefined) => (code ? SCHOLARSHIPS.filter((s) => !s.countryCode || s.countryCode === code.toUpperCase()) : SCHOLARSHIPS);

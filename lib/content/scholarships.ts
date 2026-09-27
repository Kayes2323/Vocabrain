import type { Scholarship } from '@/lib/models';
import { KR_SCHOLARSHIPS } from './kr-scholarships';

/**
 * Reviewed scholarship records. Each one is checked on its
 * official page (eligibility, coverage, opening date and deadline as
 * SourcedValues). Status (open / opening soon / closed / passed) is always
 * computed from those dates — see lib/abroad/status.ts.
 */
export const SCHOLARSHIPS: Scholarship[] = [...KR_SCHOLARSHIPS];

export const scholarshipsFor = (code: string | undefined) => (code ? SCHOLARSHIPS.filter((s) => !s.countryCode || s.countryCode === code.toUpperCase()) : SCHOLARSHIPS);

import type { VisaGuide } from '@/lib/models';
import { KR_D2, KR_D2_WORK_RULES } from './kr-d2';
import { KR_D4, KR_D4_WORK_RULES } from './kr-d4';
import { KR_SHARED_PARTS } from './kr-shared';

/**
 * Reviewed student-visa guides, one per country, split into visa parts; a
 * country with several routes lists visa categories (each with its own parts).
 * Empty until checked against the official immigration website: visa rules,
 * fees and processing times must never be written from memory.
 */
export const VISA_GUIDES: VisaGuide[] = [
  {
    // South Korea (C1.1): route names and who each visa is for, from the Korea
    // Immigration Service and Study in Korea. Requirements, fees, processing,
    // stay length and work rules come in C1.2–C1.4, each with source and date.
    countryCode: 'KR',
    // Shared by D-2 and D-4 (country level): see kr-shared.ts.
    parts: KR_SHARED_PARTS,
    categories: [
      KR_D2,
      KR_D4,
    ],
    // Conditional part-time rules per route; each rule names its pathway.
    workRules: [...KR_D2_WORK_RULES, ...KR_D4_WORK_RULES],
  },
];

export const visaGuide = (code: string) => VISA_GUIDES.find((g) => g.countryCode === code.toUpperCase());

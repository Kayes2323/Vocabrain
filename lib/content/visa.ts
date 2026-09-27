import type { VisaGuide } from '@/lib/models';

/**
 * Reviewed student-visa guides, one per country, split into visa parts; a
 * country with several routes lists visa categories (each with its own parts).
 * Empty until checked against the official immigration website: visa rules,
 * fees and processing times must never be written from memory.
 */
export const VISA_GUIDES: VisaGuide[] = [
  {
    // South Korea: two routes, no facts yet (Phase C adds each part from HiKorea /
    // the Korea Immigration Service, with source and date).
    countryCode: 'KR',
    parts: {},
    categories: [
      { id: 'kr-d2', code: 'D-2', name: { en: 'D-2 visa', bn: 'D-2 visa' }, pathwayIds: ['degree'], parts: {} },
      { id: 'kr-d4', code: 'D-4', name: { en: 'D-4 visa', bn: 'D-4 visa' }, pathwayIds: ['language'], parts: {} },
    ],
    workRules: [],
  },
];

export const visaGuide = (code: string) => VISA_GUIDES.find((g) => g.countryCode === code.toUpperCase());

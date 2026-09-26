import type { VisaGuide } from '@/lib/models';

/**
 * Reviewed student-visa guides, one per country, split into the 12 visa parts.
 * Empty until checked against the official immigration website: visa rules,
 * fees and processing times must never be written from memory.
 */
export const VISA_GUIDES: VisaGuide[] = [];

export const visaGuide = (code: string) => VISA_GUIDES.find((g) => g.countryCode === code.toUpperCase());

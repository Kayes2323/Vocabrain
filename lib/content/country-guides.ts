import type { CountryGuide } from '@/lib/abroad/guides';
import { KR_GUIDE } from './kr-guide';

/**
 * Reading guides by country code. A country without an entry has no guide
 * (its page shows the existing country hub); nothing falls back to another
 * country's guide.
 */
export const COUNTRY_GUIDES: Record<string, CountryGuide> = { KR: KR_GUIDE };

export const getCountryGuide = (code: string | undefined): CountryGuide | undefined => (code ? COUNTRY_GUIDES[code.toUpperCase()] : undefined);

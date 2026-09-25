import type { Country } from '@/lib/models';

/**
 * Initial destination registry. Only identity fields live here; every
 * tuition, visa or work-rights figure must be added as a SourcedValue with an
 * official source and a lastVerified date (Phase 5). Until then `data` stays
 * empty and the UI says so rather than guessing.
 */
export const COUNTRIES: Country[] = [
  { code: 'CA', name: 'Canada', region: 'North America', flag: '🇨🇦', data: {} },
  { code: 'US', name: 'United States', region: 'North America', flag: '🇺🇸', data: {} },
  { code: 'GB', name: 'United Kingdom', region: 'Europe', flag: '🇬🇧', data: {} },
  { code: 'IE', name: 'Ireland', region: 'Europe', flag: '🇮🇪', data: {} },
  { code: 'DE', name: 'Germany', region: 'Europe', flag: '🇩🇪', data: {} },
  { code: 'FR', name: 'France', region: 'Europe', flag: '🇫🇷', data: {} },
  { code: 'NL', name: 'Netherlands', region: 'Europe', flag: '🇳🇱', data: {} },
  { code: 'IT', name: 'Italy', region: 'Europe', flag: '🇮🇹', data: {} },
  { code: 'ES', name: 'Spain', region: 'Europe', flag: '🇪🇸', data: {} },
  { code: 'SE', name: 'Sweden', region: 'Europe', flag: '🇸🇪', data: {} },
  { code: 'FI', name: 'Finland', region: 'Europe', flag: '🇫🇮', data: {} },
  { code: 'NO', name: 'Norway', region: 'Europe', flag: '🇳🇴', data: {} },
  { code: 'DK', name: 'Denmark', region: 'Europe', flag: '🇩🇰', data: {} },
  { code: 'AU', name: 'Australia', region: 'Oceania', flag: '🇦🇺', data: {} },
  { code: 'KR', name: 'South Korea', region: 'Asia', flag: '🇰🇷', data: {} },
  { code: 'JP', name: 'Japan', region: 'Asia', flag: '🇯🇵', data: {} },
  { code: 'CN', name: 'China', region: 'Asia', flag: '🇨🇳', data: {} },
  { code: 'MY', name: 'Malaysia', region: 'Asia', flag: '🇲🇾', data: {} },
  { code: 'TR', name: 'Turkey', region: 'Europe', flag: '🇹🇷', data: {} },
];

export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

/** Number of sourced data points a country currently has. */
export function countVerifiedDataPoints(country: Country): number {
  return Object.entries(country.data).reduce((n, [key, v]) => {
    if (!v || key === 'sources') return n;
    return n + (Array.isArray(v) ? v.length : 1);
  }, 0);
}

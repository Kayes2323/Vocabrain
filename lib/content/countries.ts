import type { Country, CountryData, SourceRef } from '@/lib/models';

/**
 * Destination registry. Every figure is a SourcedValue copied from an official
 * government page on `lastVerified`, with a link. Nothing is estimated: when a
 * fact couldn't be confirmed it is left out, and the UI and Mino say
 * "not verified yet". Re-check these pages regularly; rules change.
 */
const VERIFIED = '2026-09-26';
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });

const UK_MONEY = gov('GOV.UK – Student visa: money you need', 'https://www.gov.uk/student-visa/money');
const UK_GRADUATE = gov('GOV.UK – Graduate visa', 'https://www.gov.uk/graduate-visa');
const UK_STUDENT = gov('GOV.UK – Student visa', 'https://www.gov.uk/student-visa');
const CA_FUNDS = gov('IRCC – Proof of financial support', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html');
const CA_PGWP = gov('IRCC – About the post-graduation work permit', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/about.html');
const CA_WORK = gov('IRCC – Work off campus', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html');
const AU_STUDENT = gov('Department of Home Affairs – Student visa (subclass 500)', 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500');
const AU_485 = gov('Department of Home Affairs – Temporary Graduate visa (subclass 485)', 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485');
const DE_WORK = gov('Make it in Germany (Federal Government) – Study and work', 'https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany/work');

const v = <T,>(value: T, source: SourceRef, notes?: string) => ({ value, source, lastVerified: VERIFIED, ...(notes ? { notes } : {}) });

const UK: CountryData = {
  livingCost: [
    v({ amount: 1529, currency: 'GBP' }, UK_MONEY, 'Per month, for up to 9 months, for courses in London (money to show for a Student visa).'),
    v({ amount: 1171, currency: 'GBP' }, UK_MONEY, 'Per month, for up to 9 months, for courses outside London.'),
  ],
  postStudyOptions: [
    v('Graduate visa: 2 years if you apply on or before 31 December 2026; 18 months if you apply on or after 1 January 2027; 3 years for a PhD or other doctoral qualification.', UK_GRADUATE),
  ],
  workRules: [v('You may be able to work; how much depends on what you study and whether it is term time (see the official page).', UK_STUDENT)],
  metrics: { postStudyWorkMonths: v({ min: 18, max: 24 }, UK_GRADUATE, "Bachelor's/Master's; 24 months if applying by 31 Dec 2026, 18 months from 1 Jan 2027.") },
};

const CA: CountryData = {
  livingCost: [v({ amount: 23448, currency: 'CAD' }, CA_FUNDS, 'Per year for one person, all provinces except Quebec, excluding tuition and travel; applications from 1 September 2026.')],
  postStudyOptions: [
    v("Post-graduation work permit: master's graduates (program of at least 8 months) can apply for 3 years; other programs of 8 months to under 2 years up to the program length; programs of 2 years or more up to 3 years.", CA_PGWP),
  ],
  workRules: [v('Up to 24 hours per week off campus during academic sessions (if eligible).', CA_WORK)],
  metrics: {
    postStudyWorkMonths: v({ min: 8, max: 36 }, CA_PGWP, 'Depends on program length; 36 months for eligible master\'s and 2+ year programs.'),
    termWorkHoursPerWeek: v(24, CA_WORK),
  },
};

const AU: CountryData = {
  postStudyOptions: [v('Temporary Graduate visa (subclass 485): usually between 2 and 3 years, depending on your qualification.', AU_485)],
  workRules: [v('Up to 48 hours a fortnight while your course is in session.', AU_STUDENT)],
  metrics: {
    postStudyWorkMonths: v({ min: 24, max: 36 }, AU_485, 'Usually 2–3 years depending on qualification.'),
    termWorkHoursPerWeek: v(24, AU_STUDENT, '48 hours per fortnight.'),
  },
};

const DE: CountryData = {
  workRules: [
    v('Students from non-EU countries may work 140 full days or 280 half days a year, or up to 20 hours a week during the lecture period.', DE_WORK),
  ],
  metrics: { termWorkHoursPerWeek: v(20, DE_WORK, 'Or 140 full / 280 half days a year.') },
};

export const COUNTRIES: Country[] = [
  { code: 'CA', name: 'Canada', region: 'North America', flag: '🇨🇦', data: CA },
  { code: 'US', name: 'United States', region: 'North America', flag: '🇺🇸', data: {} },
  { code: 'GB', name: 'United Kingdom', region: 'Europe', flag: '🇬🇧', data: UK },
  { code: 'IE', name: 'Ireland', region: 'Europe', flag: '🇮🇪', data: {} },
  { code: 'DE', name: 'Germany', region: 'Europe', flag: '🇩🇪', data: DE },
  { code: 'FR', name: 'France', region: 'Europe', flag: '🇫🇷', data: {} },
  { code: 'NL', name: 'Netherlands', region: 'Europe', flag: '🇳🇱', data: {} },
  { code: 'IT', name: 'Italy', region: 'Europe', flag: '🇮🇹', data: {} },
  { code: 'ES', name: 'Spain', region: 'Europe', flag: '🇪🇸', data: {} },
  { code: 'SE', name: 'Sweden', region: 'Europe', flag: '🇸🇪', data: {} },
  { code: 'FI', name: 'Finland', region: 'Europe', flag: '🇫🇮', data: {} },
  { code: 'NO', name: 'Norway', region: 'Europe', flag: '🇳🇴', data: {} },
  { code: 'DK', name: 'Denmark', region: 'Europe', flag: '🇩🇰', data: {} },
  { code: 'AU', name: 'Australia', region: 'Oceania', flag: '🇦🇺', data: AU },
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
    if (!v || key === 'sources' || key === 'metrics') return n;
    return n + (Array.isArray(v) ? v.length : 1);
  }, 0);
}

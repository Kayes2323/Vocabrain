import type { Country, CountryData, SourceRef } from '@/lib/models';
import { KR_KIS_NAVIGATOR, KR_SIK_VISA } from './kr-sources';

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

/**
 * `sections[id].complete` records a reviewer's judgement that the verified facts
 * answer that section fully (e.g. the official work rule); anything else with
 * facts shows as "partly verified" (e.g. money-to-show is not a full living cost).
 *
 * Priority destinations for Bangladeshi students (1–14, in the approved order)
 * first, then every other destination. Adding a country = adding one entry;
 * the explorer, hub and matching read this list and nothing else.
 */
export const COUNTRIES: Country[] = [
  {
    code: 'KR',
    name: 'South Korea',
    region: 'Asia',
    flag: '🇰🇷',
    priority: 1,
    capital: 'Seoul',
    localLanguage: 'ko',
    data: {},
    // Degree → D-2 (Student), language/training → D-4 (General Trainee): the
    // mapping is read from the Korea Immigration Service and Study in Korea
    // (see lib/content/visa.ts). Other facts are added in Phase C, sourced.
    // The TOPIK answer comes from the student's profile (same option values).
    workQuestions: [
      {
        id: 'korean',
        label: { en: 'Your Korean level (TOPIK)', bn: 'তোমার Korean level (TOPIK)' },
        options: [
          { value: 'none', label: { en: 'None yet', bn: 'এখনো নেই' } },
          { value: 'beginner', label: { en: 'Beginner (no TOPIK)', bn: 'Beginner (TOPIK নেই)' } },
          ...[1, 2, 3, 4, 5, 6].map((n) => ({ value: `topik-${n}`, label: { en: `TOPIK ${n}`, bn: `TOPIK ${n}` } })),
        ],
      },
      {
        // Bachelor's hours differ by year (asked here only; never guessed).
        id: 'yearOfStudy',
        label: { en: "Your bachelor's year", bn: "Bachelor's-এর কোন বর্ষ" },
        options: [
          { value: '1-2', label: { en: 'Year 1–2', bn: '১ম–২য় বর্ষ' } },
          { value: '3-4', label: { en: 'Year 3–4', bn: '৩য়–৪র্থ বর্ষ' } },
        ],
      },
    ],
    pathways: [
      {
        id: 'degree',
        kind: 'degree',
        name: { en: "Degree study (Bachelor's, Master's, PhD)", bn: "Degree (Bachelor's, Master's, PhD)" },
        description: { en: 'Study for a full degree at a university.', bn: 'University-তে পুরো একটা degree পড়া।' },
        degreeLevels: ['bachelors', 'masters', 'phd'],
        visaCategoryIds: ['kr-d2'],
        links: [KR_SIK_VISA, KR_KIS_NAVIGATOR],
      },
      {
        id: 'language',
        kind: 'language',
        name: { en: 'Korean language / training program', bn: 'Korean ভাষা / training program' },
        description: {
          en: 'Study the Korean language (or a training program), before a degree or on its own.',
          bn: 'Korean ভাষা (বা training program) পড়া — degree-র আগে, বা আলাদাভাবে।',
        },
        visaCategoryIds: ['kr-d4'],
        links: [KR_SIK_VISA, KR_KIS_NAVIGATOR],
      },
    ],
  },
  { code: 'DE', name: 'Germany', region: 'Europe', flag: '🇩🇪', priority: 2, capital: 'Berlin', data: DE, sections: { work: { complete: true } } },
  { code: 'AU', name: 'Australia', region: 'Oceania', flag: '🇦🇺', priority: 3, capital: 'Canberra', data: AU, sections: { work: { complete: true }, 'post-study': { complete: true }, visa: { links: [AU_STUDENT] } } },
  { code: 'GB', name: 'United Kingdom', region: 'Europe', flag: '🇬🇧', priority: 4, capital: 'London', data: UK, sections: { 'post-study': { complete: true }, visa: { links: [UK_STUDENT] } } },
  { code: 'CA', name: 'Canada', region: 'North America', flag: '🇨🇦', priority: 5, capital: 'Ottawa', data: CA, sections: { work: { complete: true }, 'post-study': { complete: true } } },
  { code: 'US', name: 'United States', region: 'North America', flag: '🇺🇸', priority: 6, capital: 'Washington, D.C.', data: {} },
  { code: 'JP', name: 'Japan', region: 'Asia', flag: '🇯🇵', priority: 7, capital: 'Tokyo', data: {} },
  { code: 'IT', name: 'Italy', region: 'Europe', flag: '🇮🇹', priority: 8, capital: 'Rome', data: {} },
  { code: 'FR', name: 'France', region: 'Europe', flag: '🇫🇷', priority: 9, capital: 'Paris', data: {} },
  { code: 'NL', name: 'Netherlands', region: 'Europe', flag: '🇳🇱', priority: 10, capital: 'Amsterdam', data: {} },
  { code: 'SE', name: 'Sweden', region: 'Europe', flag: '🇸🇪', priority: 11, capital: 'Stockholm', data: {} },
  { code: 'FI', name: 'Finland', region: 'Europe', flag: '🇫🇮', priority: 12, capital: 'Helsinki', data: {} },
  { code: 'IE', name: 'Ireland', region: 'Europe', flag: '🇮🇪', priority: 13, capital: 'Dublin', data: {} },
  { code: 'NZ', name: 'New Zealand', region: 'Oceania', flag: '🇳🇿', priority: 14, capital: 'Wellington', data: {} },
  { code: 'ES', name: 'Spain', region: 'Europe', flag: '🇪🇸', capital: 'Madrid', data: {} },
  { code: 'NO', name: 'Norway', region: 'Europe', flag: '🇳🇴', capital: 'Oslo', data: {} },
  { code: 'DK', name: 'Denmark', region: 'Europe', flag: '🇩🇰', capital: 'Copenhagen', data: {} },
  { code: 'CN', name: 'China', region: 'Asia', flag: '🇨🇳', capital: 'Beijing', data: {} },
  { code: 'MY', name: 'Malaysia', region: 'Asia', flag: '🇲🇾', capital: 'Kuala Lumpur', data: {} },
  { code: 'TR', name: 'Turkey', region: 'Europe', flag: '🇹🇷', capital: 'Ankara', data: {} },
];

export function getCountry(code: string): Country | undefined {
  const c = code.toUpperCase();
  return COUNTRIES.find((x) => x.code === c);
}

/** The 14 priority countries, in order. */
export const PRIORITY_COUNTRIES = COUNTRIES.filter((c) => c.priority).sort((a, b) => a.priority! - b.priority!);
/** Every other destination, by name. */
export const OTHER_COUNTRIES = COUNTRIES.filter((c) => !c.priority).sort((a, b) => a.name.localeCompare(b.name));

/** Number of sourced data points a country currently has. */
export function countVerifiedDataPoints(country: Country): number {
  return Object.entries(country.data).reduce((n, [key, v]) => {
    if (!v || key === 'sources' || key === 'metrics') return n;
    return n + (Array.isArray(v) ? v.length : 1);
  }, 0);
}

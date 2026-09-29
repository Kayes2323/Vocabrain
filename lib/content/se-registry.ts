import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import { SE_CHALMERS, SE_KTH, SE_LUND, SE_READ, SE_SISGP, SE_SU, SE_UU } from './se-sources';

/**
 * Sweden: university examples and scholarships. Universities are examples
 * (alphabetical, never ordered by quality); only what the source states is
 * stored.
 */
const META = { createdAt: SE_READ, updatedAt: SE_READ };
const fact = (value: string, source: SourceRef): SourcedValue<string> => ({
  value,
  source,
  lastVerified: SE_READ,
  reviewedAt: SE_READ,
  reviewAt: '2027-03-29',
  status: 'verified',
  confidence: 'high',
});

const uni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'SE',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const SE_UNIVERSITIES: University[] = [
  uni('se-chalmers', 'Chalmers University of Technology', 'Gothenburg', SE_CHALMERS),
  uni('se-kth', 'KTH Royal Institute of Technology', 'Stockholm', SE_KTH),
  uni('se-lund', 'Lund University', 'Lund', SE_LUND),
  uni('se-su', 'Stockholm University', 'Stockholm', SE_SU),
  uni('se-uu', 'Uppsala University', 'Uppsala', SE_UU),
];

export const SE_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'se-si-sisgp',
    name: 'Swedish Institute Scholarship for Global Professionals (SISGP)',
    provider: 'government',
    countryCode: 'SE',
    degreeLevels: ['masters'],
    coverage: fact('Full tuition fee coverage, a living allowance of SEK 12,000 a month and a one-time travel grant of SEK 15,000 (insurance is not included).', SE_SISGP),
    eligibility: fact("Citizens of the 34 eligible countries, which include Bangladesh, applying for full-time master's studies in Sweden, with demonstrated work experience (3,000 hours for most countries) and leadership experience.", SE_SISGP),
    applicationMethod: fact('Apply to the Swedish Institute in its application period (9–25 February 2026 for the autumn 2026 intake), using the application number from your University Admissions application.', SE_SISGP),
    officialUrl: SE_SISGP.url!,
    ...META,
  },
];

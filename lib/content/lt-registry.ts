import type { Scholarship, SourceRef, University } from '@/lib/models';
import { LT_ISM, LT_KTU, LT_READ, LT_VMU, LT_VU } from './lt-sources';

/**
 * Lithuania: university examples. Universities are examples (alphabetical,
 * never ordered by quality). No country-wide scholarship record is listed
 * here: the Lithuanian State Scholarship (full-time master's) and VMU/KTU
 * tuition-fee waivers are university/programme-specific and change their
 * quotas, countries and deadlines every call — see Study in Lithuania's own
 * scholarships page, cited in the guide, rather than a record that would go
 * stale.
 */
const META = { createdAt: LT_READ, updatedAt: LT_READ };

const mkUni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'LT',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const LT_UNIVERSITIES: University[] = [
  mkUni('lt-ism', 'ISM University of Management and Economics', 'Vilnius / Kaunas', LT_ISM),
  mkUni('lt-ktu', 'Kaunas University of Technology (KTU)', 'Kaunas', LT_KTU),
  mkUni('lt-vmu', 'Vytautas Magnus University (VMU)', 'Kaunas', LT_VMU),
  mkUni('lt-vu', 'Vilnius University', 'Vilnius', LT_VU),
];

export const LT_SCHOLARSHIPS: Scholarship[] = [];

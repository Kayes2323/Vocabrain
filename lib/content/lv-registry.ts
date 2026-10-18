import type { Scholarship, University } from '@/lib/models';
import { LV_READ } from './lv-sources';

/**
 * Latvia: university examples, built the same way as mt-registry.ts /
 * pl-registry.ts. Universities are examples (alphabetical, never ordered by
 * quality). Study in Latvia's own official list of eligible countries for
 * the Latvian state scholarship (39 countries, read directly as a PDF for
 * this guide) does not name Bangladesh among them, and neither the
 * University of Latvia's, RTU's nor RSU's own pages read for this guide
 * named any other scholarship, waiver or fee reduction confirmed open to
 * Bangladeshi applicants. Latvia's scholarship registry is therefore
 * honestly empty, the same way Lithuania's, Switzerland's, Malaysia's,
 * Poland's and Malta's were when no real programme covering Bangladesh
 * was found.
 */
const META = { createdAt: LV_READ, updatedAt: LV_READ };

const mkUni = (id: string, name: string, city: string, officialUrl: string): University => ({
  id,
  name,
  countryCode: 'LV',
  city,
  officialUrl,
  officialSource: { name, url: officialUrl, sourceType: 'official-university' },
  ...META,
});

export const LV_UNIVERSITIES: University[] = [
  mkUni('lv-rsu', 'Rīga Stradiņš University (RSU)', 'Riga', 'https://www.rsu.lv/en'),
  mkUni('lv-rtu', 'Riga Technical University (RTU)', 'Riga', 'https://www.rtu.lv/en'),
  mkUni('lv-ul', 'University of Latvia (Latvijas Universitāte)', 'Riga', 'https://www.lu.lv/en/'),
];

/** No real, verified scholarship for Bangladeshi applicants was found on the official pages read for this guide. */
export const LV_SCHOLARSHIPS: Scholarship[] = [];

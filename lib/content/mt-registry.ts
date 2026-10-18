import type { Scholarship, University } from '@/lib/models';
import { MT_READ } from './mt-sources';

/**
 * Malta: university examples, built the same way as pl-registry.ts /
 * my-registry.ts. Universities are examples (alphabetical, never ordered by
 * quality). The University of Malta's own scholarships page ("Scholarships
 * – International Office") states plainly, as read for this guide, that
 * "Currently there are no scholarships available at the UM" — so no UM
 * scholarship record is invented to fill this file. myscholarship.gov.mt,
 * the Maltese government's own scholarships portal, lists scholarship
 * schemes by MQF level but names no eligible-country list confirming
 * Bangladeshi eligibility for any currently open scheme on the pages read
 * for this guide, so no government scholarship record is added either.
 * Malta's scholarship registry is therefore honestly empty, the same way
 * Lithuania's, Switzerland's, Malaysia's and Poland's were when no real
 * programme covered Bangladesh.
 */
const META = { createdAt: MT_READ, updatedAt: MT_READ };

const mkUni = (id: string, name: string, city: string, officialUrl: string): University => ({
  id,
  name,
  countryCode: 'MT',
  city,
  officialUrl,
  officialSource: { name, url: officialUrl, sourceType: 'official-university' },
  ...META,
});

export const MT_UNIVERSITIES: University[] = [
  mkUni('mt-mcast', 'Malta College of Arts, Science and Technology (MCAST)', 'Paola', 'https://mcast.edu.mt/'),
  mkUni('mt-um', 'University of Malta', 'Msida', 'https://www.um.edu.mt/'),
];

/** No real, verified scholarship for Bangladeshi applicants was found on the official pages read for this guide. */
export const MT_SCHOLARSHIPS: Scholarship[] = [];

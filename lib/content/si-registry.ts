import type { Scholarship, SourceRef, University } from '@/lib/models';
import { SI_READ, SI_UL, SI_UM, SI_UNG, SI_UP } from './si-sources';

/**
 * Slovenia: university examples. Universities are examples (alphabetical,
 * never ordered by quality). No country-wide scholarship record is listed
 * here: the Ad Futura scholarship for foreign nationals, run by the Public
 * Scholarship, Development, Disability and Maintenance Fund of the Republic
 * of Slovenia, is open only to citizens of Western Balkan countries for
 * postgraduate study — it does not name Bangladesh, and no other verified
 * Slovenian government scholarship open to Bangladeshi students was found on
 * the pages read. See the guide's own scholarship answer for the full,
 * honest picture.
 */
const META = { createdAt: SI_READ, updatedAt: SI_READ };

const mkUni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'SI',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const SI_UNIVERSITIES: University[] = [
  mkUni('si-ul', 'University of Ljubljana', 'Ljubljana', SI_UL),
  mkUni('si-um', 'University of Maribor', 'Maribor', SI_UM),
  mkUni('si-ung', 'University of Nova Gorica', 'Nova Gorica', SI_UNG),
  mkUni('si-up', 'University of Primorska', 'Koper', SI_UP),
];

export const SI_SCHOLARSHIPS: Scholarship[] = [];

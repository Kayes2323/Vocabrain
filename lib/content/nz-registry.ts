import type { Scholarship, SourceRef, University } from '@/lib/models';
import { NZ_AUCKLAND, NZ_AUT, NZ_LINCOLN, NZ_MASSEY, NZ_OTAGO, NZ_READ, NZ_VUW, NZ_WAIKATO } from './nz-sources';

/**
 * New Zealand: university examples. Universities are examples (alphabetical,
 * never ordered by quality). No scholarship is listed: the government's
 * Manaaki scholarships do not include Bangladesh (checked on NZ_READ), and
 * university scholarships were not verified.
 */
const META = { createdAt: NZ_READ, updatedAt: NZ_READ };

const uni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'NZ',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const NZ_UNIVERSITIES: University[] = [
  uni('nz-aut', 'Auckland University of Technology', 'Auckland', NZ_AUT),
  uni('nz-lincoln', 'Lincoln University', 'Lincoln', NZ_LINCOLN),
  uni('nz-massey', 'Massey University', 'Palmerston North', NZ_MASSEY),
  uni('nz-vuw', 'Te Herenga Waka—Victoria University of Wellington', 'Wellington', NZ_VUW),
  uni('nz-auckland', 'University of Auckland', 'Auckland', NZ_AUCKLAND),
  uni('nz-otago', 'University of Otago', 'Dunedin', NZ_OTAGO),
  uni('nz-waikato', 'University of Waikato', 'Hamilton', NZ_WAIKATO),
];

export const NZ_SCHOLARSHIPS: Scholarship[] = [];

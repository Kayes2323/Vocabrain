import type { Scholarship, SourceRef, University } from '@/lib/models';
import { FI_AALTO, FI_LUT, FI_OULU, FI_READ, FI_TUNI, FI_UH, FI_UTU } from './fi-sources';

/**
 * Finland: university examples. Universities are examples (alphabetical,
 * never ordered by quality). No scholarship is listed: Study in Finland says
 * scholarships are offered by the universities (usually tuition only); no
 * Finnish government scholarship for degree studies was found on FI_READ.
 */
const META = { createdAt: FI_READ, updatedAt: FI_READ };

const uni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'FI',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const FI_UNIVERSITIES: University[] = [
  uni('fi-aalto', 'Aalto University', 'Espoo', FI_AALTO),
  uni('fi-lut', 'LUT University', 'Lappeenranta', FI_LUT),
  uni('fi-tuni', 'Tampere University', 'Tampere', FI_TUNI),
  uni('fi-helsinki', 'University of Helsinki', 'Helsinki', FI_UH),
  uni('fi-oulu', 'University of Oulu', 'Oulu', FI_OULU),
  uni('fi-utu', 'University of Turku', 'Turku', FI_UTU),
];

export const FI_SCHOLARSHIPS: Scholarship[] = [];

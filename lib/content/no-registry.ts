import type { Scholarship, SourceRef, University } from '@/lib/models';
import { NO_NMBU, NO_NTNU, NO_READ, NO_UIB, NO_UIO, NO_UIT } from './no-sources';

/**
 * Norway: university examples. Universities are examples (alphabetical,
 * never ordered by quality). No scholarship is listed: no Norwegian government
 * scholarship for full degrees open to Bangladeshi students was found in the
 * official sources read on NO_READ; nothing is invented.
 */
const META = { createdAt: NO_READ, updatedAt: NO_READ };

const uni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'NO',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const NO_UNIVERSITIES: University[] = [
  uni('no-nmbu', 'Norwegian University of Life Sciences', 'Ås', NO_NMBU),
  uni('no-ntnu', 'Norwegian University of Science and Technology', 'Trondheim', NO_NTNU),
  uni('no-uit', 'UiT The Arctic University of Norway', 'Tromsø', NO_UIT),
  uni('no-uib', 'University of Bergen', 'Bergen', NO_UIB),
  uni('no-uio', 'University of Oslo', 'Oslo', NO_UIO),
];

export const NO_SCHOLARSHIPS: Scholarship[] = [];

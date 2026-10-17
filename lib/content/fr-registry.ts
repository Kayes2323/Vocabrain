import type { Scholarship, SourceRef, University } from '@/lib/models';
import { FR_POLYTECHNIQUE, FR_READ, FR_SACLAY, FR_SCIENCESPO, FR_SORBONNE } from './fr-sources';

/**
 * France: university examples, built the same way as si-registry.ts /
 * cz-registry.ts. Universities are examples (alphabetical, never ordered by
 * quality). No country-wide scholarship record is listed here: the Eiffel
 * Excellence Scholarship (run by the French Ministry for Europe and Foreign
 * Affairs) is open to applicants worldwide including Bangladesh, but it can
 * only be applied for through a French host institution once that
 * institution nominates the candidate — it is not a fixed, always-open
 * national award a student applies to directly, and no official page names
 * Bangladesh specifically. See the guide's own scholarship answer for the
 * full, honest picture.
 */
const META = { createdAt: FR_READ, updatedAt: FR_READ };

const mkUni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'FR',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const FR_UNIVERSITIES: University[] = [
  mkUni('fr-polytechnique', 'École Polytechnique', 'Palaiseau', FR_POLYTECHNIQUE),
  mkUni('fr-saclay', 'Université Paris-Saclay', 'Gif-sur-Yvette', FR_SACLAY),
  mkUni('fr-sciencespo', 'Sciences Po', 'Paris', FR_SCIENCESPO),
  mkUni('fr-sorbonne', 'Sorbonne Université', 'Paris', FR_SORBONNE),
];

export const FR_SCHOLARSHIPS: Scholarship[] = [];

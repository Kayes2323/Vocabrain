import type { Scholarship, SourceRef, University } from '@/lib/models';
import { CZ_BUT, CZ_CTU, CZ_CUNI, CZ_MUNI, CZ_READ } from './cz-sources';

/**
 * Czech Republic: university examples. Universities are examples
 * (alphabetical, never ordered by quality). No country-wide scholarship
 * record is listed here: the Czech Government Scholarship for developing
 * countries (which names Bangladesh) is administered centrally by the
 * Ministry of Education, Youth and Sports and changes its eligible
 * programmes and deadline every call — see the guide's own scholarship
 * answer and the MEYS page it cites, rather than a record that would go stale.
 */
const META = { createdAt: CZ_READ, updatedAt: CZ_READ };

const mkUni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'CZ',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const CZ_UNIVERSITIES: University[] = [
  mkUni('cz-but', 'Brno University of Technology (BUT/VUT)', 'Brno', CZ_BUT),
  mkUni('cz-ctu', 'Czech Technical University in Prague (CTU)', 'Prague', CZ_CTU),
  mkUni('cz-cuni', 'Charles University', 'Prague', CZ_CUNI),
  mkUni('cz-muni', 'Masaryk University', 'Brno', CZ_MUNI),
];

export const CZ_SCHOLARSHIPS: Scholarship[] = [];

import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import { IE_GALWAY, IE_HEA_GOIIES, IE_READ, IE_TCD, IE_UCC, IE_UCD } from './ie-sources';

/**
 * Ireland: university examples, built the same way as fr-registry.ts /
 * si-registry.ts. Universities are examples (alphabetical, never ordered by
 * quality). Unlike France and Slovenia, Ireland does have one genuinely
 * open, directly-applied-for government scholarship for Bangladeshi
 * students: the Government of Ireland International Education Scholarship
 * (GOI-IES), run by the Higher Education Authority. Its eligibility rule is
 * "a domiciliary of origin outside the EU/EEA, Switzerland and the United
 * Kingdom" (Russian and Belarusian nationals excluded) — it does not name
 * or exclude Bangladesh, and unlike France's Eiffel scholarship a student
 * applies to it directly online once they hold an offer, rather than only
 * through an institution's own nomination. See the guide's own scholarship
 * answer for the full picture, including that the 2026 call is closed.
 */
const META = { createdAt: IE_READ, updatedAt: IE_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: IE_READ,
  reviewedAt: IE_READ,
  reviewAt: '2027-03-01',
  status: opts.status ?? 'verified',
  confidence: source.sourceType === 'official-government' || source.sourceType === 'official-scholarship' ? 'high' : 'medium',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const mkUni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'IE',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const IE_UNIVERSITIES: University[] = [
  mkUni('ie-galway', 'University of Galway', 'Galway', IE_GALWAY),
  mkUni('ie-tcd', 'Trinity College Dublin', 'Dublin', IE_TCD),
  mkUni('ie-ucc', 'University College Cork', 'Cork', IE_UCC),
  mkUni('ie-ucd', 'University College Dublin', 'Dublin', IE_UCD),
];

export const IE_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'ie-goi-ies',
    name: 'Government of Ireland International Education Scholarship (GOI-IES)',
    provider: 'government',
    countryCode: 'IE',
    degreeLevels: ['masters', 'phd'],
    coverage: fact('A stipend of EUR 10,000 for one year of full-time study, plus a full fee waiver for that year from the host higher education institution. 60 scholarships are awarded each year.', IE_HEA_GOIIES),
    eligibility: fact(
      'Open to applicants with a domiciliary of origin outside the EU/EEA, Switzerland and the United Kingdom (Russian and Belarusian nationals are not eligible). The official page does not name or exclude Bangladesh, so Bangladeshi applicants are eligible on nationality grounds. A candidate must already hold a conditional or final offer of admission to a master’s, postgraduate diploma or PhD (NFQ level 9 or 10) programme at an eligible Irish higher education institution before applying, and cannot have held a GOI-IES scholarship before.',
      IE_HEA_GOIIES,
    ),
    applicationMethod: fact('Apply directly online via the GOI-IES application portal (not through an institution’s nomination), with two references uploaded through the portal; a maximum of one application per candidate per cycle.', IE_HEA_GOIIES),
    deadline: fact('2026-03-12', IE_HEA_GOIIES, { notes: 'The 2026 call closed on 12 March 2026 (5pm Irish time); the page states the 2026 call is now closed, so the next cycle’s dates were not available at the time of this research.', status: 'needs-review' }),
    officialUrl: IE_HEA_GOIIES.url!,
    ...META,
  },
];

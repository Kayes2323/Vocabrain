import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import { NL_EUR, NL_LEIDEN, NL_READ, NL_STUDYINNL_SCHOLARSHIP, NL_TUDELFT, NL_UU, NL_UVA } from './nl-sources';

/**
 * Netherlands: university examples, built the same way as ie-registry.ts /
 * fr-registry.ts / si-registry.ts. Universities are examples (alphabetical,
 * never ordered by quality). The Netherlands does have one genuinely open
 * scholarship for Bangladeshi students: the NL Scholarship (formerly Holland
 * Scholarship), run by the Dutch Ministry of Education, Culture and Science
 * together with participating institutions and administered by Nuffic. Its
 * own eligibility criteria name only "non-EEA nationality" — they do not name
 * or exclude Bangladesh — so it is genuinely open the way Ireland's GOI-IES
 * is, though (like GOI-IES) the student still applies and meets the chosen
 * institution's own requirements, and it is a one-off EUR 5,000 payment, not
 * a full-tuition scholarship. See the guide's own scholarship answer.
 */
const META = { createdAt: NL_READ, updatedAt: NL_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: NL_READ,
  reviewedAt: NL_READ,
  reviewAt: '2027-03-01',
  status: opts.status ?? 'verified',
  confidence: source.sourceType === 'official-government' || source.sourceType === 'official-scholarship' ? 'high' : 'medium',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const mkUni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'NL',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const NL_UNIVERSITIES: University[] = [
  mkUni('nl-eur', 'Erasmus University Rotterdam', 'Rotterdam', NL_EUR),
  mkUni('nl-leiden', 'Leiden University', 'Leiden', NL_LEIDEN),
  mkUni('nl-tudelft', 'Delft University of Technology', 'Delft', NL_TUDELFT),
  mkUni('nl-uu', 'Utrecht University', 'Utrecht', NL_UU),
  mkUni('nl-uva', 'University of Amsterdam', 'Amsterdam', NL_UVA),
];

export const NL_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'nl-scholarship',
    name: 'NL Scholarship (formerly Holland Scholarship)',
    provider: 'government',
    countryCode: 'NL',
    degreeLevels: ['bachelors', 'masters'],
    coverage: fact('A one-off payment of EUR 5,000 paid in the first year of study. The page states explicitly that this is not a full-tuition scholarship.', NL_STUDYINNL_SCHOLARSHIP),
    eligibility: fact(
      'Open to applicants whose nationality is outside the European Economic Area (EEA), applying for a full-time bachelor’s or master’s programme at one of the participating Dutch institutions, who meet that institution’s own specific requirements and do not already hold a degree from a Dutch education institution. The official page does not name or exclude Bangladesh, so Bangladeshi applicants are eligible on nationality grounds, the way IE’s GOI-IES is for Ireland. It is financed by the Dutch Ministry of Education, Culture and Science together with participating research universities and universities of applied sciences, and administered by Nuffic.',
      NL_STUDYINNL_SCHOLARSHIP,
    ),
    applicationMethod: fact('Apply through the participating institution you are admitted to, by that institution’s own deadline; the list of participating institutions changes each year and is published on Study in NL. Applications for the 2026-2027 academic year opened on 1 November 2025.', NL_STUDYINNL_SCHOLARSHIP),
    officialUrl: NL_STUDYINNL_SCHOLARSHIP.url!,
    ...META,
  },
];

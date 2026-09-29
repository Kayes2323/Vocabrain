import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import { CA_CGRSD, CA_DAL, CA_MCGILL, CA_READ, CA_UALBERTA, CA_UBC, CA_UOFT, CA_WATERLOO } from './ca-sources';

/**
 * Canada: university examples and scholarships. Universities are examples
 * (alphabetical, never ordered by quality); only what the source states is
 * stored. The Study in Canada Scholarships are short exchanges nominated by
 * institutions, not degree funding, so they are explained in the guide but not
 * listed here. Vanier CGS no longer accepts applications.
 */
const META = { createdAt: CA_READ, updatedAt: CA_READ };
const fact = (value: string, source: SourceRef): SourcedValue<string> => ({
  value,
  source,
  lastVerified: CA_READ,
  reviewedAt: CA_READ,
  reviewAt: '2027-03-29',
  status: 'verified',
  confidence: 'high',
});

const uni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'CA',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const CA_UNIVERSITIES: University[] = [
  uni('ca-dal', 'Dalhousie University', 'Halifax', CA_DAL),
  uni('ca-mcgill', 'McGill University', 'Montreal', CA_MCGILL),
  uni('ca-ualberta', 'University of Alberta', 'Edmonton', CA_UALBERTA),
  uni('ca-ubc', 'University of British Columbia', 'Vancouver', CA_UBC),
  uni('ca-utoronto', 'University of Toronto', 'Toronto', CA_UOFT),
  uni('ca-uwaterloo', 'University of Waterloo', 'Waterloo', CA_WATERLOO),
];

export const CA_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'ca-cgrs-d',
    name: 'Canada Graduate Research Scholarship – Doctoral (CGRS D)',
    provider: 'government',
    countryCode: 'CA',
    degreeLevels: ['phd'],
    coverage: fact('CAD 40,000 per year.', CA_CGRSD),
    eligibility: fact('International applicants must already be registered in their doctoral program at an eligible Canadian institution by the application deadline; up to 15% of awards are available to international applicants.', CA_CGRSD),
    applicationMethod: fact('Apply in the CGRS D competition described on the NSERC program page, once you are registered in a doctoral program at an eligible Canadian institution; ask that institution about its internal process.', CA_CGRSD),
    officialUrl: CA_CGRSD.url!,
    ...META,
  },
];

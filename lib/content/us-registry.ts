import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import { US_FULBRIGHT_BD, US_GATECH, US_PSU, US_READ, US_SYRACUSE, US_TXST, US_UCSD, US_UNR } from './us-sources';

/**
 * United States: university examples and scholarships. Universities are
 * examples (alphabetical, never ordered by quality); only what the source states is stored.
 */
const META = { createdAt: US_READ, updatedAt: US_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: US_READ,
  reviewedAt: US_READ,
  reviewAt: '2027-03-29',
  status: opts.status ?? 'verified',
  confidence: 'high',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const uni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'US',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const US_UNIVERSITIES: University[] = [
  uni('us-gatech', 'Georgia Institute of Technology', 'Atlanta', US_GATECH),
  uni('us-psu', 'Pennsylvania State University', 'University Park', US_PSU),
  uni('us-syracuse', 'Syracuse University', 'Syracuse', US_SYRACUSE),
  uni('us-txst', 'Texas State University', 'San Marcos', US_TXST),
  uni('us-ucsd', 'University of California San Diego', 'San Diego', US_UCSD),
  uni('us-unr', 'University of Nevada, Reno', 'Reno', US_UNR),
];

export const US_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'us-fulbright-bd',
    name: 'Fulbright Foreign Student Program — Bangladesh (U.S. Department of State)',
    provider: 'government',
    countryCode: 'US',
    degreeLevels: ['masters'],
    eligibility: fact(
      "For a master's degree in the United States (2027-2028 round). Bangladeshi citizens living in Bangladesh when they apply, with at least a four-year bachelor's degree and an outstanding academic record, at least two years of full-time professional experience relevant to the proposed field, and a minimum TOEFL score of 90 or IELTS 7.",
      US_FULBRIGHT_BD,
    ),
    applicationMethod: fact('Online application through IIE (apply.iie.org/ffsp2027) with transcripts and certificates, three recommendation letters uploaded by the referees, the academic records information form, a valid TOEFL or IELTS score and a GRE or GMAT score if available. The 2027-2028 round closed on 11 July 2026 (11:59 p.m. BST).', US_FULBRIGHT_BD),
    officialUrl: US_FULBRIGHT_BD.url!,
    ...META,
  },
];

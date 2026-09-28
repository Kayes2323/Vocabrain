import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import {
  AU_ADELAIDE,
  AU_ANU,
  AU_AWARDS_BD,
  AU_MELBOURNE,
  AU_MONASH,
  AU_READ,
  AU_RTP_FAQ,
  AU_SYDNEY,
  AU_UNSW,
  AU_UQ,
  AU_UWA,
} from './au-sources';

/**
 * Australia: university examples and scholarships. Universities are examples
 * (alphabetical, never ordered by quality); only what the source states is stored.
 */
const META = { createdAt: AU_READ, updatedAt: AU_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: AU_READ,
  reviewedAt: AU_READ,
  reviewAt: '2027-03-28',
  status: opts.status ?? 'verified',
  confidence: 'high',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const uni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'AU',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const AU_UNIVERSITIES: University[] = [
  uni('au-adelaide', 'Adelaide University', 'Adelaide', AU_ADELAIDE),
  uni('au-anu', 'Australian National University', 'Canberra', AU_ANU),
  uni('au-monash', 'Monash University', 'Melbourne', AU_MONASH),
  uni('au-uq', 'The University of Queensland', 'Brisbane', AU_UQ),
  uni('au-melbourne', 'University of Melbourne', 'Melbourne', AU_MELBOURNE),
  uni('au-sydney', 'University of Sydney', 'Sydney', AU_SYDNEY),
  uni('au-uwa', 'University of Western Australia', 'Perth', AU_UWA),
  uni('au-unsw', 'UNSW Sydney', 'Sydney', AU_UNSW),
];

export const AU_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'au-australia-awards',
    name: 'Australia Awards Scholarships — Bangladesh (Australian Government, DFAT)',
    provider: 'government',
    countryCode: 'AU',
    degreeLevels: ['masters'],
    coverage: fact(
      'Full tuition fees, a return air ticket, an establishment allowance, a contribution to living expenses, Overseas Student Health Cover and other listed support.',
      AU_AWARDS_BD,
    ),
    eligibility: fact(
      "For Bangladeshi citizens applying for a Master's by Coursework or by Research starting in 2027, under one of the applicant target groups set out in the intake information. English: IELTS Academic 6.5 overall with no band below 6.0 (or equivalent).",
      AU_AWARDS_BD,
      { status: 'partly-verified', notes: 'Target-group details: read the intake PDF.' },
    ),
    applicationMethod: fact('Online through OASIS. The 2027-intake round was open from 1 February to 30 April 2026, followed by shortlisting, an interview and notification in late 2026; the next round is expected to open in early 2027.', AU_AWARDS_BD),
    officialUrl: AU_AWARDS_BD.url!,
    ...META,
  },
  {
    id: 'au-rtp',
    name: 'Research Training Program (RTP) scholarships (Australian Government, awarded by universities)',
    provider: 'government',
    countryCode: 'AU',
    degreeLevels: ['phd'],
    coverage: fact(
      'A university may give one or more of: a fees offset (fully offsets the research degree tuition fees), a stipend for living costs (at least the base full-time RTP rate), and allowances (for example relocation, thesis costs or OSHC for international students).',
      AU_RTP_FAQ,
    ),
    eligibility: fact(
      'Domestic or international students enrolled in a research doctorate or research masters at an eligible Australian university. Not for bachelor or coursework master\'s degrees. Selection is competitive and set by each university, and universities may spend at most 10% of their RTP funding each year on international students.',
      AU_RTP_FAQ,
    ),
    applicationMethod: fact("Through the chosen university: each university runs its own application, selection and offer process and deadlines, set out in its RTP scholarship policy.", AU_RTP_FAQ),
    officialUrl: AU_RTP_FAQ.url!,
    ...META,
  },
];

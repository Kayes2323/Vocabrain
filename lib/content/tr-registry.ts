import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import { TR_ANKARA, TR_BOGAZICI, TR_HACETTEPE, TR_ITU, TR_METU, TR_READ, TR_TB_CRITERIA, TR_TB_FULLTIME } from './tr-sources';

/**
 * Turkey: university examples and scholarships. Universities are examples
 * (alphabetical, never ordered by quality); only what the source states is stored.
 */
const META = { createdAt: TR_READ, updatedAt: TR_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: TR_READ,
  reviewedAt: TR_READ,
  reviewAt: '2027-03-28',
  status: opts.status ?? 'verified',
  confidence: 'high',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const uni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'TR',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const TR_UNIVERSITIES: University[] = [
  uni('tr-ankara', 'Ankara University', 'Ankara', TR_ANKARA),
  uni('tr-bogazici', 'Boğaziçi University', 'Istanbul', TR_BOGAZICI),
  uni('tr-hacettepe', 'Hacettepe University', 'Ankara', TR_HACETTEPE),
  uni('tr-itu', 'Istanbul Technical University', 'Istanbul', TR_ITU),
  uni('tr-metu', 'Middle East Technical University', 'Ankara', TR_METU),
];

export const TR_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'tr-turkiye-burslari',
    name: 'Türkiye Scholarships (Türkiye Bursları) — full-time programs',
    provider: 'government',
    countryCode: 'TR',
    degreeLevels: ['bachelors', 'masters', 'phd'],
    coverage: fact(
      "University and department placement; monthly stipend (undergraduate TRY 6,500, master's TRY 9,500, PhD TRY 13,000); tuition fee; a one-year Turkish language course; accommodation; health insurance; a flight ticket at the start and at the end of studies. Merit Scholarship holders receive twice the regular stipend.",
      TR_TB_FULLTIME,
    ),
    eligibility: fact(
      "Citizens of all countries (not Turkish citizens, and not those already enrolled at a Turkish university at the level they apply for). Age: under 21 for bachelor's, under 30 for master's, under 35 for PhD. Minimum academic achievement: 70% for bachelor's, 75% for graduate programs, 90% for medicine, dentistry and pharmacy. No graduate scholarships in health sciences.",
      TR_TB_CRITERIA,
    ),
    applicationMethod: fact('Online through the Türkiye Scholarships Application System (TBBS), every year between 10 January and 20 February.', TR_TB_FULLTIME),
    officialUrl: TR_TB_FULLTIME.url!,
    ...META,
  },
];

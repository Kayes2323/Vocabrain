import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import { IT_EMB_MAECI_GRANTS, IT_ERGO_GRANT, IT_ERGO_INTL, IT_POLIMI, IT_READ, IT_SAPIENZA, IT_STUDY_IN_ITALY, IT_UNIBO, IT_UNIPD, IT_UNIPI } from './it-sources';

/**
 * Italy: university examples and scholarships. Universities are examples
 * (alphabetical, never ordered by quality); only what the source states is stored.
 */
const META = { createdAt: IT_READ, updatedAt: IT_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: IT_READ,
  reviewedAt: IT_READ,
  reviewAt: '2027-03-28',
  status: opts.status ?? 'verified',
  confidence: source.url?.includes('esteri.it') ? 'high' : 'medium',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const uni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'IT',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const IT_UNIVERSITIES: University[] = [
  uni('it-polimi', 'Politecnico di Milano', 'Milan', IT_POLIMI),
  uni('it-sapienza', 'Sapienza University of Rome', 'Rome', IT_SAPIENZA),
  uni('it-unibo', 'University of Bologna', 'Bologna', IT_UNIBO),
  uni('it-unipd', 'University of Padua', 'Padua', IT_UNIPD),
  uni('it-unipi', 'University of Pisa', 'Pisa', IT_UNIPI),
];

export const IT_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'it-maeci',
    name: 'Italian Government (MAECI) study grants for foreign students',
    provider: 'government',
    countryCode: 'IT',
    degreeLevels: ['masters', 'phd'],
    coverage: fact('EUR 1,200 per month (A.Y. 2026-2027).', IT_EMB_MAECI_GRANTS),
    eligibility: fact(
      "For study, training or research at state or legally recognised Italian institutions: second-cycle master's programmes, AFAM (art, music and dance) courses, PhD programmes, jointly supervised research, and advanced Italian language and culture courses. Not for bachelor's programmes.",
      IT_EMB_MAECI_GRANTS,
    ),
    applicationMethod: fact(
      'Online, after registering on the Study in Italy portal; for A.Y. 2026-2027 the deadline was 26 March 2026. The call for the next year is published there.',
      IT_STUDY_IN_ITALY,
      { status: 'partly-verified', notes: 'Deadline from the Embassy of Italy in Dhaka notice for 2026-2027; check the new call each year.' },
    ),
    officialUrl: IT_STUDY_IN_ITALY.url!,
    ...META,
  },
  {
    id: 'it-dsu-regional',
    name: 'Regional right-to-study (DSU) scholarship — example: ER.GO, Emilia-Romagna',
    provider: 'government',
    countryCode: 'IT',
    degreeLevels: ['bachelors', 'masters'],
    coverage: fact(
      'A sum of money whose amount depends on family income band and whether the student lives in the city, commutes or lives away; eligible students are also fully exempt from university fees and refunded the regional tax, and part can be taken as meal credit. Each region runs its own call.',
      IT_ERGO_GRANT,
    ),
    eligibility: fact(
      'Economic, merit (minimum credits each year) and enrolment requirements set in the regional call; no merit-only grants. Students whose family income and assets are abroad submit documents from their home country, legalised (or apostilled where allowed) and translated, and need an Italian tax code.',
      IT_ERGO_INTL,
    ),
    applicationMethod: fact('Apply every academic year by the call’s deadlines, which are final; you can apply before enrolling.', IT_ERGO_GRANT),
    officialUrl: IT_ERGO_GRANT.url!,
    ...META,
  },
];

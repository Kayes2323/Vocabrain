import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import { DE_DAAD_EPOS, DE_DEUTSCHLANDSTIPENDIUM, DE_READ, DE_RWTH_FAQ, DE_STUTTGART_FEES } from './de-sources';

/**
 * Germany: university and scholarship records, each read on its official page
 * on DE_READ. Only what the page states is stored; nothing is ranked.
 */
const META = { createdAt: DE_READ, updatedAt: DE_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: DE_READ,
  reviewedAt: DE_READ,
  reviewAt: '2027-03-28',
  status: opts.status ?? 'verified',
  confidence: source.sourceType === 'official-university' ? 'high' : 'medium',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

export const DE_UNIVERSITIES: University[] = [
  {
    id: 'de-rwth',
    name: 'RWTH Aachen University',
    countryCode: 'DE',
    city: 'Aachen',
    officialUrl: 'https://www.rwth-aachen.de',
    description: {
      en: 'No tuition fees, except for programs of RWTH Academy (the university’s own FAQ).',
      bn: 'Tuition fee নেই, শুধু RWTH Academy-র program ছাড়া (university-র নিজের FAQ)।',
    },
    officialSource: DE_RWTH_FAQ,
    status: 'verified',
    ...META,
  },
  {
    id: 'de-stuttgart',
    name: 'University of Stuttgart',
    countryCode: 'DE',
    city: 'Stuttgart',
    officialUrl: 'https://www.uni-stuttgart.de/en/',
    description: {
      en: 'Non-EU/EEA students pay a tuition fee of EUR 1,500 per semester (set by the state of Baden-Württemberg), plus the semester fee, currently EUR 184.',
      bn: 'EU/EEA-র বাইরের student-রা প্রতি semester-এ EUR 1,500 tuition দেন (Baden-Württemberg রাজ্যের নিয়ম), সঙ্গে semester fee, এখন EUR 184।',
    },
    officialSource: DE_STUTTGART_FEES,
    status: 'verified',
    ...META,
  },
];

export const DE_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'de-daad-epos',
    name: 'DAAD Development-Related Postgraduate Courses (EPOS)',
    provider: 'government',
    countryCode: 'DE',
    degreeLevels: ['masters', 'phd'],
    coverage: fact('Monthly payments of 992 euros for graduates (Master’s) or 1,300 euros for doctoral candidates (1,400 euros beginning with February 2026).', DE_DAAD_EPOS),
    eligibility: fact(
      'Graduates from development and newly industrialised countries (see the DAAD list of eligible countries) with a degree with far above average results (upper third) and at least two years of related professional experience after the first degree (bachelor) at the time of application. Doctoral degrees only in exceptional cases.',
      DE_DAAD_EPOS,
    ),
    applicationMethod: fact('Deadlines and the application route differ by course; each course is listed in the DAAD scholarship database entry.', DE_DAAD_EPOS),
    officialUrl: DE_DAAD_EPOS.url!,
    ...META,
  },
  {
    id: 'de-deutschlandstipendium',
    name: 'Deutschlandstipendium',
    provider: 'government',
    countryCode: 'DE',
    degreeLevels: ['bachelors', 'masters'],
    coverage: fact('300 euros per month.', DE_DEUTSCHLANDSTIPENDIUM),
    eligibility: fact('A public-private scholarship for high-achieving students, open to international students; the details are on the official website and at your university.', DE_DEUTSCHLANDSTIPENDIUM, {
      status: 'partly-verified',
      notes: 'Only the amount and that international students can receive it were read on the official page; the application rules are set per university.',
    }),
    officialUrl: DE_DEUTSCHLANDSTIPENDIUM.url!,
    ...META,
  },
];

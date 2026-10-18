import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import {
  MY_EMGS_FAQ,
  MY_MOHE_MIS_GUIDELINES,
  MY_MONASH_ENTRY,
  MY_READ,
  MY_UKM_QS,
  MY_UM_HOW_TO_APPLY,
  MY_UPM_INTL_ADMISSION,
  MY_UTM_QS,
} from './my-sources';

/**
 * Malaysia: university examples, built the same way as es-registry.ts /
 * dk-registry.ts. Universities are examples (alphabetical, never ordered by
 * quality). The Ministry of Higher Education's own Malaysia International
 * Scholarship (MIS) exists and is open to postgraduate applicants from a
 * long, explicitly named list of "recipient countries" (ASEAN, Commonwealth
 * members named by name, and dozens of other named countries) — but
 * Bangladesh was not found named anywhere on that list in the official 2026
 * guidelines document read for this guide, so Bangladeshi eligibility is
 * recorded honestly as not confirmed, not guessed.
 */
const META = { createdAt: MY_READ, updatedAt: MY_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: MY_READ,
  reviewedAt: MY_READ,
  reviewAt: '2027-03-01',
  status: opts.status ?? 'verified',
  confidence: source.sourceType === 'official-government' || source.sourceType === 'official-scholarship' ? 'high' : 'medium',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const mkUni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'MY',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const MY_UNIVERSITIES: University[] = [
  mkUni('my-monash', 'Monash University Malaysia', 'Bandar Sunway, Selangor', MY_MONASH_ENTRY),
  mkUni('my-ukm', 'Universiti Kebangsaan Malaysia (UKM)', 'Bangi, Selangor', MY_UKM_QS),
  mkUni('my-um', 'Universiti Malaya (UM)', 'Kuala Lumpur', MY_UM_HOW_TO_APPLY),
  mkUni('my-upm', 'Universiti Putra Malaysia (UPM)', 'Serdang, Selangor', MY_UPM_INTL_ADMISSION),
  mkUni('my-utm', 'Universiti Teknologi Malaysia (UTM)', 'Skudai, Johor / Kuala Lumpur', MY_UTM_QS),
];

export const MY_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'my-mis',
    name: 'Malaysia International Scholarship (MIS)',
    provider: 'government',
    countryCode: 'MY',
    degreeLevels: ['masters', 'phd'],
    coverage: fact(
      'MOHE’s own 2026 guidelines document states MIS pays tuition fees for the entire sponsorship period directly to the university, plus a monthly living allowance of RM 1,500, paid every four months on submission of a progress report.',
      MY_MOHE_MIS_GUIDELINES,
    ),
    eligibility: fact(
      'MOHE’s own 2026 guidelines document names MIS "recipient countries" exhaustively: ASEAN member states, a named group of Commonwealth countries, and a long list of other named countries (including, among others, China, Japan, South Korea, Saudi Arabia, the UAE and several Central Asian and Middle Eastern states). Bangladesh was not found named anywhere on that list in the official document read for this guide, so Bangladeshi eligibility for MIS is not confirmed. Separately, EMGS’s own FAQ page says only that an applicant should also check directly with their chosen institution for its own scholarships.',
      MY_MOHE_MIS_GUIDELINES,
      { status: 'not-verified' },
    ),
    applicationMethod: fact('Online, through MOHE’s own MIS application system (biasiswa.mohe.gov.my), with a certified passport copy, academic transcripts, an English-proficiency result, two reference letters, and (for Master’s by research/PhD) a research proposal.', MY_MOHE_MIS_GUIDELINES),
    deadline: fact('MOHE’s own portal states the 2026/2027-cycle application window had already closed as of the page read for this guide (checking of outcomes ran 8 October–31 December 2026); the next cycle’s dates were not published on the page read.', MY_MOHE_MIS_GUIDELINES, { status: 'partly-verified' }),
    officialUrl: MY_MOHE_MIS_GUIDELINES.url!,
    ...META,
  },
];

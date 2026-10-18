import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import {
  DK_AAU_FINANCE_FEES,
  DK_AU_TUITION,
  DK_CBS_MASTERS_ADMISSION,
  DK_DTU_FEES,
  DK_KU_SCHOLARSHIPS,
  DK_KU_TUITION,
  DK_READ,
  DK_SID_SCHOLARSHIPS,
} from './dk-sources';

/**
 * Denmark: university examples, built the same way as at-registry.ts /
 * hu-registry.ts. Universities are examples (alphabetical, never ordered by
 * quality). Denmark's own Danish Government Scholarship is not a single
 * centrally-run scheme like Hungary's Stipendium Hungaricum: Study in
 * Denmark's own "Scholarships" page and each university's own scholarship
 * page, read for this guide, describe it as a limited number of tuition
 * waivers and/or living-cost grants that Danish universities themselves
 * administer and award to highly qualified non-EU/EEA full-degree
 * applicants — every such applicant is automatically considered, with no
 * separate application. No official page read for this guide names
 * Bangladesh specifically as an eligible or targeted country, so this is
 * recorded as an honestly-scoped, university-administered scholarship, not
 * a Bangladesh-specific one.
 */
const META = { createdAt: DK_READ, updatedAt: DK_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: DK_READ,
  reviewedAt: DK_READ,
  reviewAt: '2027-03-01',
  status: opts.status ?? 'verified',
  confidence: source.sourceType === 'official-government' || source.sourceType === 'official-scholarship' ? 'high' : 'medium',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const mkUni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'DK',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const DK_UNIVERSITIES: University[] = [
  mkUni('dk-aalborg', 'Aalborg University (AAU)', 'Aalborg', DK_AAU_FINANCE_FEES),
  mkUni('dk-au', 'Aarhus University', 'Aarhus', DK_AU_TUITION),
  mkUni('dk-cbs', 'Copenhagen Business School (CBS)', 'Frederiksberg', DK_CBS_MASTERS_ADMISSION),
  mkUni('dk-dtu', 'Technical University of Denmark (DTU)', 'Kongens Lyngby', DK_DTU_FEES),
  mkUni('dk-ku', 'University of Copenhagen', 'Copenhagen', DK_KU_TUITION),
];

export const DK_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'dk-government-scholarship',
    name: 'Danish Government Scholarship',
    provider: 'government',
    countryCode: 'DK',
    degreeLevels: ['bachelors', 'masters'],
    coverage: fact(
      'Study in Denmark’s own page and each university’s own scholarship page, read for this guide, describe this as a limited number of government-funded scholarships each Danish university receives per year, for highly qualified full-degree students from non-EU/EEA countries and Switzerland. The scholarship consists of two parts and can be given as a full or partial tuition-fee waiver and/or a grant towards living costs — not automatically both, and not given to every eligible applicant. Aalborg University’s own page states it grants only "approximately 15" scholarships a year, with a monthly stipend of DKK 11,225 (EUR 1,503) in 2026, and advises applicants not to rely on receiving one.',
      DK_SID_SCHOLARSHIPS,
      { status: 'partly-verified', notes: 'Coverage and the number awarded vary by university; no single national amount or quota applies to every institution.' },
    ),
    eligibility: fact(
      'You must be a citizen of a country outside the EU/EEA or Switzerland, enrolled in (or applying to) a full-degree higher-education programme, and — per Study in Denmark’s own page — granted (or in the process of being granted) a time-limited Danish residence permit on the basis of education. All eligible non-EU/EEA applicants are automatically considered by the university when they apply for admission; there is no separate scholarship application. No official page read for this guide names Bangladesh individually as an eligible or targeted country — eligibility rests on the broad "non-EU/EEA" wording, the same basis Austria’s Ernst Mach Grant and several other countries’ broadest non-targeted offers use, not a Bangladesh-specific nomination like Hungary’s Stipendium Hungaricum.',
      DK_SID_SCHOLARSHIPS,
    ),
    applicationMethod: fact(
      'No separate application: Study in Denmark’s own page and the universities’ own pages state that all eligible non-EU/EEA applicants to a full-degree programme are automatically considered for the scholarship as part of their regular programme application; the scholarship is awarded and administered entirely by the individual university.',
      DK_SID_SCHOLARSHIPS,
    ),
    deadline: fact(
      'Tied to each university’s own application deadline for the programme applied to (set per university and programme) — there is no separate scholarship deadline. Aalborg University’s own page states scholarship decisions are communicated to applicants by early July at the latest.',
      DK_SID_SCHOLARSHIPS,
      { status: 'partly-verified' },
    ),
    officialUrl: DK_SID_SCHOLARSHIPS.url!,
    ...META,
  },
];

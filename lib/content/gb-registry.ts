import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import {
  GB_BIRMINGHAM,
  GB_CAMBRIDGE,
  GB_CHEVENING_COVER,
  GB_CHEVENING_ELIG,
  GB_CSC_MASTERS,
  GB_CSC_PHD,
  GB_EDINBURGH,
  GB_GREAT_BD,
  GB_IMPERIAL,
  GB_KCL,
  GB_MANCHESTER,
  GB_OXFORD,
  GB_READ,
  GB_UCL,
} from './gb-sources';

/**
 * United Kingdom: university examples and scholarships. Universities are
 * examples (alphabetical, never ordered by quality); only what the source states is stored.
 */
const META = { createdAt: GB_READ, updatedAt: GB_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: GB_READ,
  reviewedAt: GB_READ,
  reviewAt: '2027-03-28',
  status: opts.status ?? 'verified',
  confidence: 'high',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const uni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'GB',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const GB_UNIVERSITIES: University[] = [
  uni('gb-imperial', 'Imperial College London', 'London', GB_IMPERIAL),
  uni('gb-kcl', "King's College London", 'London', GB_KCL),
  uni('gb-ucl', 'University College London', 'London', GB_UCL),
  uni('gb-birmingham', 'University of Birmingham', 'Birmingham', GB_BIRMINGHAM),
  uni('gb-cambridge', 'University of Cambridge', 'Cambridge', GB_CAMBRIDGE),
  uni('gb-edinburgh', 'University of Edinburgh', 'Edinburgh', GB_EDINBURGH),
  uni('gb-manchester', 'University of Manchester', 'Manchester', GB_MANCHESTER),
  uni('gb-oxford', 'University of Oxford', 'Oxford', GB_OXFORD),
];

export const GB_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'gb-chevening',
    name: 'Chevening Scholarships (UK Government)',
    provider: 'government',
    countryCode: 'GB',
    degreeLevels: ['masters'],
    coverage: fact('Tuition fees, economy travel to and from your country, arrival and departure allowances, the visa application cost, a contribution to TB testing if required, and a monthly living allowance (different inside and outside London).', GB_CHEVENING_COVER),
    eligibility: fact(
      "For a one-year master's at a UK university. Citizen of a Chevening-eligible country (Bangladesh is on Chevening's country list); at least two years' work experience after your undergraduate degree (2,800 hours); an undergraduate degree that qualifies you for a UK master's; apply to three different eligible UK courses and hold an unconditional offer from one by Chevening's deadline; return home for at least two years after the scholarship.",
      GB_CHEVENING_ELIG,
    ),
    officialUrl: GB_CHEVENING_ELIG.url!,
    ...META,
  },
  {
    id: 'gb-commonwealth-masters',
    name: "Commonwealth Master's Scholarships (Commonwealth Scholarship Commission)",
    provider: 'government',
    countryCode: 'GB',
    degreeLevels: ['masters'],
    coverage: fact("Approved return airfare; approved tuition fees (fully covered by agreement with the university); a stipend of £1,712 a month, or £2,000 a month in the London metropolitan area (current rates); a study travel grant.", GB_CSC_MASTERS),
    eligibility: fact(
      "Citizens of eligible Commonwealth countries (Bangladesh is listed) who are permanently resident there, hold a first degree of at least upper second-class (2:1) standard (or a 2:2 plus a relevant postgraduate qualification) by September 2027, and could not otherwise afford to study in the UK. One-year taught master's only; no MBAs. Scholars must return home — switching to a Graduate visa is not permitted.",
      GB_CSC_MASTERS,
    ),
    applicationMethod: fact('Apply through a nominator (in most cases the national nominating agency) and on CSC Central; the CSC does not accept direct applications. For 2027/28 the CSC closing date is 20 October (16:00 BST); nominators set their own earlier dates.', GB_CSC_MASTERS),
    officialUrl: GB_CSC_MASTERS.url!,
    ...META,
  },
  {
    id: 'gb-great-bangladesh',
    name: 'GREAT Scholarships — Bangladesh (British Council and UK universities)',
    provider: 'government',
    countryCode: 'GB',
    degreeLevels: ['masters'],
    coverage: fact('£10,000 towards tuition fees for a one-year taught postgraduate course (2026-27).', GB_GREAT_BD),
    eligibility: fact('Bangladeshi passport holders with an undergraduate degree who meet the English requirement, at a participating university (the list changes each year); application procedures and deadlines are set by each university.', GB_GREAT_BD),
    officialUrl: GB_GREAT_BD.url!,
    ...META,
  },
  {
    id: 'gb-commonwealth-phd',
    name: 'Commonwealth PhD Scholarships (Commonwealth Scholarship Commission)',
    provider: 'government',
    countryCode: 'GB',
    degreeLevels: ['phd'],
    coverage: fact('Tuition fees, airfare and a living stipend.', GB_CSC_PHD),
    eligibility: fact(
      'For citizens of least developed Commonwealth countries and fragile states, applying through nominating agencies; commitment to return home. Whether Bangladesh is on the current eligible list is not verified here.',
      GB_CSC_PHD,
      { status: 'needs-review', notes: 'Eligible country list not read; check the CSC page.' },
    ),
    applicationMethod: fact('Through nominating agencies; the 2027/28 round closes on 20 October 2026.', GB_CSC_PHD),
    officialUrl: GB_CSC_PHD.url!,
    ...META,
  },
];

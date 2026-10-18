import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import {
  AT_JKU_INTL,
  AT_OEAD_ERNST_MACH,
  AT_READ,
  AT_TUGRAZ_OVERVIEW,
  AT_TUWIEN,
  AT_UIBK,
  AT_UNIVIE,
} from './at-sources';

/**
 * Austria: university examples, built the same way as hu-registry.ts /
 * ch-registry.ts. Universities are examples (alphabetical, never ordered by
 * quality). Unlike Hungary's Stipendium Hungaricum, Austria's OeAD does not
 * run a comparable full-degree (Bachelor's/Master's/PhD) government
 * scholarship that names Bangladesh as an eligible country: its "Our
 * scholarships and funding programmes from A to Z" and "Overview: grants
 * and scholarships" pages, read for this guide, show the Ernst Mach Grant
 * family as Austria's broad, worldwide/non-European scholarship offer, and
 * these are short study-period or research grants (1–10 months), not
 * funded full degrees. No official page read for this guide named a
 * Bangladesh-specific full-degree scholarship, so none is invented here —
 * this is stated plainly rather than papered over with an unverified claim.
 */
const META = { createdAt: AT_READ, updatedAt: AT_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: AT_READ,
  reviewedAt: AT_READ,
  reviewAt: '2027-03-01',
  status: opts.status ?? 'verified',
  confidence: source.sourceType === 'official-government' || source.sourceType === 'official-scholarship' ? 'high' : 'medium',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const mkUni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'AT',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const AT_UNIVERSITIES: University[] = [
  mkUni('at-jku-linz', 'Johannes Kepler University Linz (JKU)', 'Linz', AT_JKU_INTL),
  mkUni('at-tu-graz', 'Graz University of Technology (TU Graz)', 'Graz', AT_TUGRAZ_OVERVIEW),
  mkUni('at-tu-wien', 'TU Wien', 'Vienna', AT_TUWIEN),
  mkUni('at-uibk', 'University of Innsbruck', 'Innsbruck', AT_UIBK),
  mkUni('at-univie', 'University of Vienna', 'Vienna', AT_UNIVIE),
];

export const AT_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'at-ernst-mach-grant-worldwide',
    name: 'Ernst Mach Grant worldwide',
    provider: 'government',
    countryCode: 'AT',
    degreeLevels: ['phd'],
    coverage: fact(
      'OeAD’s own programme page states this grant funds a research project in Austria for 1 to 9 months for young researchers (age limit 35) from all disciplines and countries except Austria. The page read for this guide does not itemize the monthly stipend amount, so no figure is shown here — contact OeAD (mach@oead.at) or see the linked FAQ for the current amount. It is a short research-stay grant, not funding for a full doctoral degree.',
      AT_OEAD_ERNST_MACH,
      { status: 'partly-verified' },
    ),
    eligibility: fact(
      'Open to "young researchers from all disciplines and countries (except Austria)" per OeAD’s own page — Bangladesh is not named individually, but is covered by this "all countries" wording, unlike Hungary’s Stipendium Hungaricum, which names Bangladesh and its Sending Partner authority directly. No Bangladesh-specific nomination step was found for this grant.',
      AT_OEAD_ERNST_MACH,
    ),
    applicationMethod: fact(
      'Online application through OeAD’s grants.at portal, open from September to the 1 December closing date each year, per OeAD’s own programme page.',
      AT_OEAD_ERNST_MACH,
    ),
    deadline: fact('1 December each year (online application opens from September).', AT_OEAD_ERNST_MACH),
    officialUrl: AT_OEAD_ERNST_MACH.url!,
    ...META,
  },
  {
    id: 'at-ernst-mach-grant-fh',
    name: 'Ernst Mach Grant for studying at an Austrian University of Applied Sciences (Fachhochschule)',
    provider: 'government',
    countryCode: 'AT',
    degreeLevels: ['bachelors', 'masters'],
    coverage: fact(
      'OeAD’s own programme page describes this as a grant to spend one or two semesters (4 to 10 months) at an Austrian Fachhochschule (university of applied sciences) — a study-period grant, not funding for a complete Bachelor’s or Master’s degree. The page read for this guide does not itemize the monthly stipend amount.',
      AT_OEAD_ERNST_MACH,
      { status: 'partly-verified' },
    ),
    eligibility: fact(
      'Open to "undergraduates and graduates from non-European universities" (age limit 35), per OeAD’s own page — this covers Bangladeshi applicants by the broad "non-European" wording, but no Bangladesh-specific nomination or quota was found.',
      AT_OEAD_ERNST_MACH,
    ),
    applicationMethod: fact('Online application through OeAD’s grants.at portal, available from October to the 1 February closing date of the following year, per OeAD’s own page.', AT_OEAD_ERNST_MACH),
    deadline: fact('1 February each year (online application available from October).', AT_OEAD_ERNST_MACH),
    officialUrl: AT_OEAD_ERNST_MACH.url!,
    ...META,
  },
];

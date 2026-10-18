import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import { CH_EPFL, CH_ETHZ, CH_READ, CH_SBFI_SGS, CH_SBFI_SGS_ASIA_LIST, CH_SBFI_SGS_GLANCE, CH_UNIGE, CH_UZH } from './ch-sources';

/**
 * Switzerland: university examples, built the same way as nl-registry.ts /
 * ie-registry.ts. Universities are examples (alphabetical, never ordered by
 * quality). Switzerland does have a genuinely open, verified federal
 * scholarship for Bangladeshi applicants: the Swiss Government Excellence
 * Scholarship (SGS, run by the Federal Commission for Scholarships for
 * Foreign Students / FCS, also called ESKAS). Its own official "at a
 * glance" page and country list name Bangladesh directly, with the
 * application routed through the Embassy of Switzerland in Dhaka — but
 * unlike the Netherlands' NL Scholarship or Ireland's GOI-IES, SGS for
 * Bangladesh is Research Fellowship / PhD scholarship only (for applicants
 * who already hold a master's degree), not open to Bachelor's or standalone
 * Master's applicants. See the guide's own scholarship answer.
 */
const META = { createdAt: CH_READ, updatedAt: CH_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: CH_READ,
  reviewedAt: CH_READ,
  reviewAt: '2027-03-01',
  status: opts.status ?? 'verified',
  confidence: source.sourceType === 'official-government' || source.sourceType === 'official-scholarship' ? 'high' : 'medium',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const mkUni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'CH',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const CH_UNIVERSITIES: University[] = [
  mkUni('ch-epfl', 'EPFL – École polytechnique fédérale de Lausanne', 'Lausanne', CH_EPFL),
  mkUni('ch-ethz', 'ETH Zurich', 'Zürich', CH_ETHZ),
  mkUni('ch-unige', 'University of Geneva', 'Geneva', CH_UNIGE),
  mkUni('ch-uzh', 'University of Zurich', 'Zürich', CH_UZH),
];

export const CH_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'ch-sgs',
    name: 'Swiss Government Excellence Scholarship (SGS / FCS / ESKAS)',
    provider: 'government',
    countryCode: 'CH',
    degreeLevels: ['phd'],
    coverage: fact('CHF 2,450 per month to cover basic living expenses for one person (not a salary), for a Research Fellowship (up to 12 months) or a PhD scholarship (12 months, renewable twice, up to 36 months). For non-EU/EFTA holders, the FCS also covers compulsory health-insurance premiums, a one-time CHF 600 rental-deposit grant, a Half-Fare Travelcard and a return-flight allowance. Tuition/semester fees (roughly CHF 600–2,000 per semester at some institutions) are not covered and must be paid by the scholarship holder.', CH_SBFI_SGS_GLANCE),
    eligibility: fact(
      'For Bangladesh specifically, the Research Fellowship and PhD scholarship types are available (the Art scholarship is not, as it is limited to a short list of countries that does not include Bangladesh). Applicants must hold a master’s degree or equivalent completed by 31 July 2027 (30 June 2027 for ETH Zurich), be born after 31 December 1991, and secure a letter of support from an academic supervisor at a Swiss higher-education institution before applying — the official page does not name or exclude Bangladesh beyond listing it among the scholarship programme’s 183 eligible countries, so Bangladeshi applicants who already hold a master’s degree are genuinely eligible, through the Embassy of Switzerland in Bangladesh.',
      CH_SBFI_SGS_ASIA_LIST,
    ),
    applicationMethod: fact('Applications are submitted online via GO ESKAS (Grants Online) and processed by the Embassy of Switzerland in Bangladesh (Dhaka), which forwards them to the FCS; a PhD/research applicant must independently find and secure a letter of support from a supervisor at a Swiss institution before applying, since applications without one are not considered.', CH_SBFI_SGS),
    deadline: fact('For the 2027–2028 academic year, the online call opens 20 August 2026 and the deadline for Bangladesh is 30 October 2026 (11:59 PM Swiss local time), per the Embassy of Switzerland in Bangladesh’s listing on the SBFI’s official Asia country list.', CH_SBFI_SGS_ASIA_LIST),
    officialUrl: CH_SBFI_SGS.url!,
    ...META,
  },
];

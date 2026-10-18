import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import { HU_BME, HU_DEBRECEN, HU_ELTE, HU_READ, HU_SEMMELWEIS, HU_SH_APPLY, HU_SH_CALL_BA_MA_OTM, HU_SH_PARTNERS } from './hu-sources';

/**
 * Hungary: university examples, built the same way as ch-registry.ts /
 * nl-registry.ts / ie-registry.ts. Universities are examples (alphabetical,
 * never ordered by quality). Hungary's flagship scholarship, Stipendium
 * Hungaricum, is genuinely open to Bangladeshi applicants: its own official
 * Sending Partner list and the 2026/2027 Call for Applications both name the
 * "People's Republic of Bangladesh" as an eligible Sending Partner, and the
 * Partners page names Bangladesh's own Sending Partner authority. Unlike a
 * scholarship that simply accepts applications from anywhere, Stipendium
 * Hungaricum requires the applicant to also be nominated by that Sending
 * Partner — an application the Sending Partner does not forward is not
 * considered at all, which the guide's own scholarship answer explains.
 */
const META = { createdAt: HU_READ, updatedAt: HU_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: HU_READ,
  reviewedAt: HU_READ,
  reviewAt: '2027-03-01',
  status: opts.status ?? 'verified',
  confidence: source.sourceType === 'official-government' || source.sourceType === 'official-scholarship' ? 'high' : 'medium',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const mkUni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'HU',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const HU_UNIVERSITIES: University[] = [
  mkUni('hu-bme', 'Budapest University of Technology and Economics (BME)', 'Budapest', HU_BME),
  mkUni('hu-debrecen', 'University of Debrecen', 'Debrecen', HU_DEBRECEN),
  mkUni('hu-elte', 'Eötvös Loránd University (ELTE)', 'Budapest', HU_ELTE),
  mkUni('hu-semmelweis', 'Semmelweis University', 'Budapest', HU_SEMMELWEIS),
];

export const HU_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'hu-stipendium-hungaricum',
    name: 'Stipendium Hungaricum Scholarship Programme',
    provider: 'government',
    countryCode: 'HU',
    degreeLevels: ['bachelors', 'masters', 'phd'],
    coverage: fact(
      'Tuition-free education (full exemption from tuition fees); a monthly stipend of HUF 43,700 (about EUR 110 at the exchange rate used in the 2026/2027 call) towards living expenses for 12 months a year until the completion of studies, for non-degree, bachelor’s, master’s and one-tier master’s levels; a free dormitory place where institutional capacity allows, or otherwise a contribution of HUF 40,000/month (about EUR 100) towards accommodation costs (this contribution may not cover the full rent in bigger cities, especially Budapest); and medical insurance under Hungary’s own social-security health-care legislation plus supplementary medical insurance of up to HUF 65,000/year (about EUR 165). These provisions are stated as only a contribution towards living expenses, not full coverage, so applicants need their own extra funds.',
      HU_SH_CALL_BA_MA_OTM,
    ),
    eligibility: fact(
      'The 2026/2027 Call for Applications (for bachelor’s, master’s, one-tier master’s, non-degree and postgraduate specialist-training levels; doctoral-level scholarships are covered by a separate Call for Applications not reviewed for this guide) lists the "People’s Republic of Bangladesh" directly among its eligible Sending Partners, and the programme’s own Partners page names "Secondary and Higher Education Division, Ministry of Education" as Bangladesh’s Sending Partner authority. Applications are only considered if the applicant is nominated by that authority — an application submitted to Tempus Public Foundation without a nomination from the Sending Partner is not considered at all, so a Bangladeshi applicant must apply to both Tempus Public Foundation and to the Secondary and Higher Education Division of Bangladesh’s Ministry of Education, by each one’s own deadline.',
      HU_SH_PARTNERS,
    ),
    applicationMethod: fact(
      'Applicants submit their documents online to Tempus Public Foundation by 15 January 2026, 2 p.m. (for the bachelor’s/master’s/one-tier master’s/non-degree 2026/2027 call), and must separately submit an application to Bangladesh’s Sending Partner (the Secondary and Higher Education Division, Ministry of Education) by that authority’s own deadline — applicants are strongly advised to contact that authority directly to confirm its exact procedure, since Sending Partners set their own requirements and deadlines. The Sending Partner reviews and pre-selects applications and forwards a nomination list (with a reserve list) to Tempus Public Foundation by the end of February 2026; only nominated applicants are then forwarded to Hungarian host institutions for the academic admission decision.',
      HU_SH_APPLY,
    ),
    deadline: fact(
      'For the 2026/2027 academic year (bachelor’s, master’s, one-tier master’s, non-degree and postgraduate specialist-training levels): applicant submission to Tempus Public Foundation by 15 January 2026, 2 p.m.; Sending Partner nomination to Tempus Public Foundation by the end of February 2026; a recommendation-letter deadline of 15 March 2026 for self-financed students who wish to continue as a scholarship holder; institutional admission decisions around the end of May to June/July–August 2026; visa application process until 30 September 2026; arrival in Hungary around September 2026. Bangladesh’s own Sending Partner may set an earlier internal deadline for its nomination step, which was not itemized on the official pages read for this guide.',
      HU_SH_CALL_BA_MA_OTM,
    ),
    officialUrl: HU_SH_APPLY.url!,
    ...META,
  },
];

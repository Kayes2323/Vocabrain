import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import { PL_AGH_FEES, PL_AMU_TUITION, PL_NAWA_BANACH, PL_READ, PL_STUDY_GOV_BANACH, PL_UJ_FEES, PL_UW_FEES, PL_WUT_HOW_TO_APPLY } from './pl-sources';

/**
 * Poland: university examples, built the same way as my-registry.ts /
 * es-registry.ts. Universities are examples (alphabetical, never ordered by
 * quality). NAWA's own Banach Scholarship Programme exists and is open to
 * citizens of 36 countries covered by Polish Aid — but study.gov.pl's own
 * reproduction of the official eligible-country list (Albania, Angola,
 * Argentina, Armenia, Azerbaijan, Belarus, Bosnia and Herzegovina, Brazil,
 * Montenegro, Philippines, Georgia, India, Indonesia, Iraq, Iran, Jordan,
 * Kazakhstan, Kenya, Kosovo, Lebanon, North Macedonia, Mexico, Moldova,
 * Mongolia, Nigeria, Palestine, Papua New Guinea, Peru, Rwanda, Senegal,
 * Serbia, Tanzania, Tunisia, Ukraine, Uzbekistan, Vietnam) does not name
 * Bangladesh, so Bangladeshi eligibility is recorded honestly as not
 * confirmed, not guessed.
 */
const META = { createdAt: PL_READ, updatedAt: PL_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: PL_READ,
  reviewedAt: PL_READ,
  reviewAt: '2027-03-01',
  status: opts.status ?? 'verified',
  confidence: source.sourceType === 'official-government' || source.sourceType === 'official-scholarship' ? 'high' : 'medium',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const mkUni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'PL',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const PL_UNIVERSITIES: University[] = [
  mkUni('pl-agh', 'AGH University of Krakow', 'Kraków', PL_AGH_FEES),
  mkUni('pl-amu', 'Adam Mickiewicz University, Poznań', 'Poznań', PL_AMU_TUITION),
  mkUni('pl-uj', 'Jagiellonian University', 'Kraków', PL_UJ_FEES),
  mkUni('pl-uw', 'University of Warsaw', 'Warsaw', PL_UW_FEES),
  mkUni('pl-wut', 'Warsaw University of Technology', 'Warsaw', PL_WUT_HOW_TO_APPLY),
];

export const PL_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'pl-banach',
    name: 'Banach NAWA Programme',
    provider: 'government',
    countryCode: 'PL',
    degreeLevels: ['masters'],
    coverage: fact(
      'NAWA’s own programme page states the scholarship covers Master’s-level studies in Polish or English at Polish universities supervised by the Minister of Science and Higher Education, and includes a monthly stipend, exemption from tuition fees at public universities (or for a preparatory course), a one-off travel allowance of PLN 2,500, and for the English track a Polish-language-and-culture course.',
      PL_NAWA_BANACH,
    ),
    eligibility: fact(
      'NAWA’s own programme page and study.gov.pl’s own reproduction of the official call for proposals name the Programme’s 36 eligible "countries covered by Polish Aid" exhaustively — Albania, Angola, Argentina, Armenia, Azerbaijan, Belarus, Bosnia and Herzegovina, Brazil, Montenegro, Philippines, Georgia, India, Indonesia, Iraq, Iran, Jordan, Kazakhstan, Kenya, Kosovo, Lebanon, North Macedonia, Mexico, Moldova, Mongolia, Nigeria, Palestine, Papua New Guinea, Peru, Rwanda, Senegal, Serbia, Tanzania, Tunisia, Ukraine, Uzbekistan and Vietnam — and Bangladesh was not found named anywhere on that list, so Bangladeshi eligibility for the Banach Programme is not confirmed.',
      PL_STUDY_GOV_BANACH,
      { status: 'not-verified' },
    ),
    applicationMethod: fact('Through NAWA’s own online application system, following the official call for proposals; applicants may apply for Master’s studies starting 2026/2027, or a preparatory course followed by Master’s studies starting 2027/2028.', PL_NAWA_BANACH),
    deadline: fact('Not itemized in full detail on the pages read for this guide; NAWA’s own page points applicants to the official call for proposals for exact dates, which were not independently read in full for this guide.', PL_NAWA_BANACH, { status: 'partly-verified' }),
    officialUrl: PL_NAWA_BANACH.url!,
    ...META,
  },
];

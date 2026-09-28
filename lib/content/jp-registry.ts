import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import { JP_EMBASSY_IE_MEXT, JP_EMBASSY_MEXT, JP_KYOTO, JP_OSAKA, JP_READ, JP_SCIENCE_TOKYO, JP_SIJ_GUIDE_2026, JP_TOHOKU, JP_UTOKYO } from './jp-sources';

/**
 * Japan: university examples and scholarships. Universities are examples
 * (alphabetical, never ranked); only what the source states is stored.
 */
const META = { createdAt: JP_READ, updatedAt: JP_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: JP_READ,
  reviewedAt: JP_READ,
  reviewAt: '2027-03-28',
  status: opts.status ?? 'verified',
  confidence: source.url?.includes('emb-japan') ? 'high' : 'medium',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const uni = (id: string, name: string, city: string, source: SourceRef, description?: University['description']): University => ({
  id,
  name,
  countryCode: 'JP',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...(description ? { description } : {}),
  ...META,
});

export const JP_UNIVERSITIES: University[] = [
  uni('jp-science-tokyo', 'Institute of Science Tokyo', 'Tokyo', JP_SCIENCE_TOKYO, {
    en: 'Established on October 1, 2024 by the merger of Tokyo Institute of Technology and Tokyo Medical and Dental University (two national university corporations).',
    bn: '১ October ২০২৪-এ Tokyo Institute of Technology আর Tokyo Medical and Dental University (দুটি national university corporation) মিলে গঠিত।',
  }),
  uni('jp-kyoto', 'Kyoto University', 'Kyoto', JP_KYOTO),
  uni('jp-osaka', 'Osaka University', 'Osaka', JP_OSAKA),
  uni('jp-tohoku', 'Tohoku University', 'Sendai', JP_TOHOKU),
  uni('jp-utokyo', 'The University of Tokyo', 'Tokyo', JP_UTOKYO),
];

const MEXT_COVERS = 'Entrance examination, matriculation and university tuition fees, and flights to and from Japan.';
export const JP_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'jp-mext-undergraduate',
    name: 'Japanese Government (MEXT) Scholarship — Undergraduate Students',
    provider: 'government',
    countryCode: 'JP',
    degreeLevels: ['bachelors'],
    coverage: fact(`${MEXT_COVERS} A monthly allowance of JPY 117,000 (subject to change).`, JP_EMBASSY_IE_MEXT, { notes: 'Allowance figure from an Embassy of Japan notice for the 2027 round; confirm the amount in the Bangladesh application guideline.' }),
    eligibility: fact(
      'Bangladeshi nationals aged 17–25 on 1 April of the scholarship year. Humanities & social science: GPA 4.5 in both SSC and HSC with A+ in English and Mathematics. Science (engineering / medical science): GPA 5 in both SSC and HSC with A+ in English, Mathematics, Physics and Chemistry. Usually 5 years including Japanese-language training.',
      JP_EMBASSY_MEXT,
      { status: 'needs-review', notes: 'Embassy page posted 2020-10-05; check the current round’s requirements.' },
    ),
    applicationMethod: fact(
      'Embassy recommendation: advertised by the Ministry of Education, Bangladesh (usually April), applications in May, written exam and interview June–July, final selection by MEXT December–January, departure in April or October of the next year.',
      JP_EMBASSY_MEXT,
      { status: 'needs-review', notes: 'Schedule from the 2020 Embassy page.' },
    ),
    officialUrl: JP_EMBASSY_MEXT.url!,
    ...META,
  },
  {
    id: 'jp-mext-research',
    name: "Japanese Government (MEXT) Scholarship — Research Students (Master's / PhD)",
    provider: 'government',
    countryCode: 'JP',
    degreeLevels: ['masters', 'phd'],
    coverage: fact(`${MEXT_COVERS} A monthly allowance of JPY 143,000–145,000 (subject to change).`, JP_EMBASSY_IE_MEXT, { notes: 'Allowance figure from an Embassy of Japan notice for the 2027 round; confirm the amount in the Bangladesh application guideline.' }),
    eligibility: fact(
      "Bangladeshi nationals under 35 on 1 April of the scholarship year; for a master's, a completed bachelor's or 16 years of education; for a doctorate, a completed master's or 18 years of education; first class throughout (60% or CGPA 3.5 out of 4).",
      JP_EMBASSY_MEXT,
      { status: 'needs-review', notes: 'Embassy page posted 2020-10-05; check the current round’s requirements.' },
    ),
    applicationMethod: fact(
      'Two routes: Embassy recommendation (advertised by the Ministry of Education, Bangladesh; written exam in English and Japanese, and interview), or University recommendation (apply directly to a Japanese university, usually November–February; MEXT selects at the end of June).',
      JP_EMBASSY_MEXT,
      { status: 'needs-review', notes: 'Schedule from the 2020 Embassy page.' },
    ),
    officialUrl: JP_EMBASSY_MEXT.url!,
    ...META,
  },
  {
    id: 'jp-jasso-honors',
    name: 'Monbukagakusho Honors Scholarship for Privately-Financed International Students (JASSO)',
    provider: 'government',
    countryCode: 'JP',
    degreeLevels: ['bachelors', 'masters', 'phd'],
    coverage: fact('Paid for one year or six months; around 7,000 students. The monthly amount is not verified here.', JP_SIJ_GUIDE_2026, { status: 'partly-verified' }),
    eligibility: fact('Privately financed international students (graduate, undergraduate and others) chosen on grades and household income; selection depends on the school. Excellent EJU scores can also lead to a reservation for it.', JP_SIJ_GUIDE_2026),
    officialUrl: JP_SIJ_GUIDE_2026.url!,
    ...META,
  },
];

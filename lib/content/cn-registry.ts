import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import { CN_EMB_CSC, CN_FUDAN, CN_PKU, CN_READ, CN_SJTU, CN_TSINGHUA, CN_ZJU } from './cn-sources';

/**
 * China: university examples and scholarships. Universities are examples
 * (alphabetical, never ordered by quality); only what the source states is stored.
 */
const META = { createdAt: CN_READ, updatedAt: CN_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: CN_READ,
  reviewedAt: CN_READ,
  reviewAt: '2027-03-29',
  status: opts.status ?? 'verified',
  confidence: 'high',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const uni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'CN',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const CN_UNIVERSITIES: University[] = [
  uni('cn-fudan', 'Fudan University', 'Shanghai', CN_FUDAN),
  uni('cn-pku', 'Peking University', 'Beijing', CN_PKU),
  uni('cn-sjtu', 'Shanghai Jiao Tong University', 'Shanghai', CN_SJTU),
  uni('cn-tsinghua', 'Tsinghua University', 'Beijing', CN_TSINGHUA),
  uni('cn-zju', 'Zhejiang University', 'Hangzhou', CN_ZJU),
];

export const CN_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'cn-csc-type-a',
    name: 'Chinese Government Scholarship (CSC Type A) — Bangladesh',
    provider: 'government',
    countryCode: 'CN',
    degreeLevels: ['bachelors', 'masters', 'phd'],
    coverage: fact('Full tuition fees, on-campus accommodation, comprehensive medical insurance, a monthly living allowance of approximately CNY 2,500–3,500 depending on program level, and an international round-trip airfare.', CN_EMB_CSC),
    eligibility: fact("Bangladeshi students applying for a bachelor's, master's or doctoral degree (or a one-year Chinese language program) at a Chinese university, administered by the China Scholarship Council.", CN_EMB_CSC),
    applicationMethod: fact('Online at www.campuschina.org. The round announced on 19 December 2025 closed on 10 January 2026; the next round is announced by the Chinese Embassy in Bangladesh.', CN_EMB_CSC),
    officialUrl: CN_EMB_CSC.url!,
    ...META,
  },
];

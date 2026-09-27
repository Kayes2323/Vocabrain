import type { SourceRef, SourcedValue } from '@/lib/models';

/**
 * Official South Korea sources (Phase C). Every KR fact cites one of these by
 * its original official URL. Confidence is internal only (never shown):
 * high = Korea Immigration Service / HiKorea / Ministry of Justice / Embassy,
 * medium = Study in Korea (NIIED) summaries.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });

export const KR_KIS_NAVIGATOR = gov(
  'Korea Immigration Service (Ministry of Justice) – Visa Navigator',
  'https://www.immigration.go.kr/bbs/immigration_eng/230/454085/download.do',
);
export const KR_SIK_VISA = gov('Study in Korea (NIIED) – Visa and stay', 'https://www.studyinkorea.go.kr/en_US/plan/visaAndStay.do');
export const KR_SIK_WORK = gov('Study in Korea (NIIED) – Part-time work for international students', 'https://www.studyinkorea.go.kr/in/work/aboutForeignerEmploymentSystem.do');
export const KR_HIKOREA = gov('HiKorea (Korea Immigration Service)', 'https://www.hikorea.go.kr');
export const KR_EMBASSY_BD = gov('Embassy of the Republic of Korea in Bangladesh', 'https://overseas.mofa.go.kr/bd-en/index.do');
export const KR_EMBASSY_BD_VISA = gov('Embassy of the Republic of Korea in Bangladesh – Visa issuance', 'https://overseas.mofa.go.kr/bd-en/brd/m_23302/list.do');

/** C1.1 review: read on this date; re-check in six months. */
export const KR_C1_READ = '2026-09-27';
export const KR_C1_REVIEW_AT = '2027-03-27';

/** A KR fact from an official source, with the C1 review dates. */
export function krFact(
  value: string,
  source: SourceRef,
  confidence: 'high' | 'medium',
  opts: { status?: SourcedValue<string>['status']; notes?: string; applicableDegree?: string } = {},
): SourcedValue<string> {
  return {
    value,
    source,
    lastVerified: KR_C1_READ,
    reviewedAt: KR_C1_READ,
    reviewAt: KR_C1_REVIEW_AT,
    status: opts.status ?? 'verified',
    confidence,
    ...(opts.notes ? { notes: opts.notes } : {}),
    ...(opts.applicableDegree ? { applicableDegree: opts.applicableDegree } : {}),
  };
}

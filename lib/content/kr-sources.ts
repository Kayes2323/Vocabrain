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
// Ministry of Government Legislation "Easy-to-find living law" (easylaw.go.kr): other government source → medium.
export const KR_EASYLAW_VISA = gov('Easylaw (Ministry of Government Legislation) – International students: visa and period of stay', 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=2853&ccfNo=2&cciNo=1&cnpClsNo=1');
export const KR_EASYLAW_REGISTRATION = gov('Easylaw (Ministry of Government Legislation) – International students: alien registration', 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=2853&ccfNo=2&cciNo=3&cnpClsNo=1');
export const KR_EASYLAW_INSURANCE = gov('Easylaw (Ministry of Government Legislation) – International students: national health insurance', 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=2853&ccfNo=3&cciNo=5&cnpClsNo=1');
export const KR_EASYLAW_WORK = gov('Easylaw (Ministry of Government Legislation) – International students: part-time work', 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=2853&ccfNo=3&cciNo=6&cnpClsNo=1');
export const KR_VISA_PORTAL = gov('Korea Visa Portal (Ministry of Justice)', 'https://www.visa.go.kr/main/openMain.do');
export const KR_EMBASSY_BD_VAC = gov('Embassy of Korea in Bangladesh – Korea Visa Application Center launch and visa procedures (2026-08-27)', 'https://overseas.mofa.go.kr/bd-en/brd/m_2124/view.do?seq=760105');
export const KR_EMBASSY_BD_UNIVERSITIES = gov('Embassy of Korea in Bangladesh – Important information for applicants to Korean universities (2026-07-24)', 'https://overseas.mofa.go.kr/bd-en/brd/m_2124/view.do?seq=760100');
// The student-visa page was first posted 2021-02-07 and later edited (it mentions the e-Form from 4 May 2025);
// it still says to apply at the Embassy, which the VAC notice of 2026-08-27 replaced → its facts are "needs-review".
export const KR_EMBASSY_BD_STUDENT_DOCS = gov(
  'Embassy of Korea in Bangladesh – Documents for student visa application (posted 2021-02-07, edited after May 2025)',
  'https://overseas.mofa.go.kr/bd-en/brd/m_23302/view.do?seq=2',
);
export const KR_EMBASSY_BD_TB = gov('Embassy of Korea in Bangladesh – Notice on designated tuberculosis test center (2023-10-26)', 'https://overseas.mofa.go.kr/bd-en/brd/m_23302/view.do?seq=12');
export const KR_EASYLAW_GUIDE_PDF = gov('Easylaw (Ministry of Government Legislation) – International students guide (PDF, as of 2026-08-15)', 'https://www.easylaw.go.kr/CSP/FileDownload.laf?flType=pdf&onhunqnaYn=N&csmSeq=2853');
export const KR_HIKOREA_MANUAL = gov('HiKorea – Integrated guide manual by status of stay (latest)', 'https://www.hikorea.go.kr/board/BoardNtcDetailR.pt?BBS_SEQ=1&BBS_GB_CD=BS10&NTCCTT_SEQ=1062&page=1');
export const KR_EMBASSY_BD_VISA = gov('Embassy of the Republic of Korea in Bangladesh – Visa issuance', 'https://overseas.mofa.go.kr/bd-en/brd/m_23302/list.do');

/** C1.1 review: read on this date; re-check in six months. */
export const KR_C1_READ = '2026-09-27';
export const KR_C1_REVIEW_AT = '2027-03-27';

/** A KR fact from an official source, with the C1 review dates. */
export function krFact(
  value: string,
  source: SourceRef,
  confidence: 'high' | 'medium',
  opts: { status?: SourcedValue<string>['status']; notes?: string; applicableDegree?: string; reviewAt?: string; validFrom?: string } = {},
): SourcedValue<string> {
  return {
    value,
    source,
    lastVerified: KR_C1_READ,
    reviewedAt: KR_C1_READ,
    reviewAt: opts.reviewAt ?? KR_C1_REVIEW_AT,
    ...(opts.validFrom ? { validFrom: opts.validFrom } : {}),
    status: opts.status ?? 'verified',
    confidence,
    ...(opts.notes ? { notes: opts.notes } : {}),
    ...(opts.applicableDegree ? { applicableDegree: opts.applicableDegree } : {}),
  };
}

// C2.1 · Ministry of Education / NIIED guidebook. The PDF carries no edition date; it cites the part-time rules
// "effective from July 2023" and apostille parties "as of November 7, 2023", so it is at least that recent.
export const KR_NIIED_GUIDEBOOK = gov(
  'Study in Korea (Ministry of Education / NIIED) – "The Global First Step of Studying Abroad in South Korea" guidebook (undated; cites rules to Nov 2023)',
  'https://www.studyinkorea.go.kr/public/new/file/guideBook_en.pdf',
);
export const KR_TOPIK = gov('TOPIK – Test of Proficiency in Korean (NIIED)', 'https://www.topik.go.kr');
export const KR_ACADEMYINFO = gov('Higher Education in Korea (Academyinfo)', 'https://www.academyinfo.go.kr');

// C2.4 · Scholarships
export const KR_EMBASSY_BD_GKS_U_2027 = gov(
  'Embassy of Korea in Bangladesh – 2027 Global Korea Scholarship for Undergraduate Degrees (2026-09-10)',
  'https://overseas.mofa.go.kr/bd-en/brd/m_2124/view.do?seq=760106',
);
export const KR_SIK_SCHOLARSHIPS = gov('Study in Korea (NIIED) – Scholarships (GKS)', 'https://www.studyinkorea.go.kr/en/plan/scholarship.do');

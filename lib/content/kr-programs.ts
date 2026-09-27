import type { Program } from '@/lib/models';
import { krFact, krValue, uniSite } from './kr-sources';

/**
 * South Korea programs, C2.6: only fields read on the program's own official
 * page. Anything not stated there is left out (shown as "Not verified yet").
 */
const META = { createdAt: '2026-09-27', updatedAt: '2026-09-27' };

const UIC_APPLY = uniSite('Yonsei University – Underwood International College: Apply (international first-year)', 'https://uic.yonsei.ac.kr/admission.php?mid=m04_02_02');
const UIC_FEES = uniSite('Yonsei University – Underwood International College: Tuition fee & scholarship', 'https://uic.yonsei.ac.kr/admission.php?mid=m04_03');
const SOL_CRITERIA = uniSite('SolBridge International School of Business (Woosong University) – Admission criteria', 'https://www.solbridge.ac.kr/story/page/index.jsp?code=solbridge0601');
const WSU_PROGRAMS = uniSite('Woosong University – Undergraduate programs taught in English', 'https://english.wsu.ac.kr/page/index.jsp?code=eng0201');

export const KR_PROGRAMS: Program[] = [
  {
    id: 'kr-yonsei-uic',
    universityId: 'kr-yonsei',
    title: 'Underwood International College (UIC) — undergraduate',
    degreeLevel: 'bachelors',
    subject: 'Liberal arts and interdisciplinary majors',
    studyLanguages: krValue(['en'], UIC_FEES, 'high', { notes: 'The college describes itself as "English-based liberal arts education".' }),
    tuition: krValue({ amount: 8_202_000, currency: 'KRW' }, UIC_FEES, 'high', {
      notes: 'International Students Track, per semester (first semester: KRW 8,416,000). Miscellaneous fees KRW 56,000 extra. Academic year not stated on the page.',
    }),
    tuitionPeriod: 'semester',
    admission: krFact(
      'From the 2027 intake, proof of English proficiency is required: a TOEFL, IELTS or CEFR certificate, IB / AP English, or a diploma or Medium of Instruction certificate from English-medium schooling. No minimum score is set.',
      UIC_APPLY,
      'high',
    ),
    officialUrl: UIC_APPLY.url,
    officialSource: UIC_APPLY,
    status: 'verified',
    ...META,
  },
  {
    id: 'kr-woosong-solbridge-bba',
    universityId: 'kr-woosong',
    title: 'Bachelor of Business Administration (BBA) — SolBridge International School of Business',
    degreeLevel: 'bachelors',
    subject: 'Business Administration',
    studyLanguages: krValue(['en'], WSU_PROGRAMS, 'high', { notes: 'Listed by Woosong University among its programs taught in English.' }),
    english: krValue({ test: 'IELTS' as const, overall: 5.5 }, SOL_CRITERIA, 'high', { notes: 'IELTS 5.5 "or its equivalent". Lower scores may get conditional acceptance after the interview.' }),
    admission: krFact(
      'An academic transcript with a CGPA of C+ or higher; English proficiency; an online interview with a faculty member; and funds to cover first-year tuition and other fees.',
      SOL_CRITERIA,
      'high',
    ),
    officialUrl: 'https://solbridge.ac.kr/story/Bachelor-of-Business-Administration/',
    officialSource: SOL_CRITERIA,
    status: 'verified',
    ...META,
  },
];

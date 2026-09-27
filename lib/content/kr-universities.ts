import type { SourceRef, University } from '@/lib/models';
import { KR_SIK_ENGLISH_TRACK, krValue, uniSite } from './kr-sources';

/**
 * South Korea university registry, C2.5: a first representative set, in
 * alphabetical order (never ranked). What each record may claim:
 * - National / private and "has English-track programs": the Study in Korea
 *   (NIIED) English Track Pavilion, which labels each university.
 * - City: the address on the university's own website.
 * Tuition, programs and requirements live on programs, checked one by one.
 */
const META = { createdAt: '2026-09-27', updatedAt: '2026-09-27' };
const ownership = (o: 'public' | 'private') =>
  krValue(o, KR_SIK_ENGLISH_TRACK, 'medium', { notes: o === 'public' ? 'Labelled "National University" by Study in Korea.' : 'Labelled "Private University" by Study in Korea.' });
const englishTrack = () =>
  // Partly verified: the source shows English-taught programs exist, not the full list of teaching languages.
  krValue(['en'], KR_SIK_ENGLISH_TRACK, 'medium', { status: 'partly-verified', notes: 'Listed in the English Track Pavilion: it runs programs taught in English. Other programs may be taught in Korean.' });

function uni(id: string, name: string, city: string, o: 'public' | 'private', officialUrl: string, admissions: string, addressPage: SourceRef): University {
  return {
    id,
    name,
    countryCode: 'KR',
    city,
    officialUrl,
    applicationPortalUrl: admissions,
    ownership: ownership(o),
    studyLanguages: englishTrack(),
    officialSource: addressPage,
    status: 'verified',
    ...META,
  };
}

export const KR_UNIVERSITIES: University[] = [
  uni('kr-chonnam', 'Chonnam National University', 'Gwangju', 'public', 'https://international.jnu.ac.kr/', 'https://international.jnu.ac.kr/', uniSite('Chonnam National University – Office of International Affairs', 'https://international.jnu.ac.kr/')),
  uni('kr-donga', 'Dong-A University', 'Busan', 'private', 'https://english.donga.ac.kr', 'https://english.donga.ac.kr/english/CMS/Contents/Contents.do?mCode=MN050', uniSite('Dong-A University (English site)', 'https://english.donga.ac.kr/english/CMS/Contents/Contents.do?mCode=MN041')),
  uni('kr-jbnu', 'Jeonbuk National University', 'Jeonju', 'public', 'https://www.jbnu.ac.kr/en/index.do', 'https://www.jbnu.ac.kr/en/admission/undergradute/application.do', uniSite('Jeonbuk National University – Admissions', 'https://www.jbnu.ac.kr/en/admission/undergradute/application.do')),
  uni('kr-kaist', 'KAIST (Korea Advanced Institute of Science and Technology)', 'Daejeon', 'public', 'https://www.kaist.ac.kr/en/', 'https://admission.kaist.ac.kr/', uniSite('KAIST', 'https://www.kaist.ac.kr/en/')),
  uni('kr-khu', 'Kyung Hee University', 'Seoul', 'private', 'https://www.khu.ac.kr/eng/user/main/view.do', 'https://www.khu.ac.kr/eng/user/contents/view.do?menuNo=300150', uniSite('Kyung Hee University – Admissions', 'https://www.khu.ac.kr/eng/user/contents/view.do?menuNo=300150')),
  uni('kr-pnu', 'Pusan National University', 'Busan', 'public', 'https://www.pusan.ac.kr/eng/Main.do', 'https://www.pusan.ac.kr/eng/CMS/Contents/Contents.do?mCode=MN013', uniSite('Pusan National University – Undergraduate admissions', 'https://www.pusan.ac.kr/eng/CMS/Contents/Contents.do?mCode=MN013')),
  uni('kr-snu', 'Seoul National University', 'Seoul', 'public', 'https://en.snu.ac.kr', 'https://en.snu.ac.kr/admission', uniSite('Seoul National University – Admissions', 'https://en.snu.ac.kr/admission')),
  uni('kr-skku', 'Sungkyunkwan University', 'Seoul', 'private', 'https://www.skku.edu/eng/', 'https://admission-global.skku.edu/', uniSite('Sungkyunkwan University – International admissions contact', 'https://admission-global.skku.edu/eng/etc/inquiry.html')),
  uni('kr-woosong', 'Woosong University', 'Daejeon', 'private', 'https://english.wsu.ac.kr/', 'https://english.wsu.ac.kr/page/index.jsp?code=eng0301', uniSite('Woosong University – Admissions requirements', 'https://english.wsu.ac.kr/page/index.jsp?code=eng0301')),
  uni('kr-yonsei', 'Yonsei University', 'Seoul', 'private', 'https://www.yonsei.ac.kr/en_sc/2241/subview.do', 'https://www.yonsei.ac.kr/en_sc/2252/subview.do', uniSite('Yonsei University – Contact us', 'https://www.yonsei.ac.kr/en_sc/2241/subview.do')),
];

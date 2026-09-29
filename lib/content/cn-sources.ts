import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the China guide, each read on CN_READ.
 * Confidence (internal): high = the Chinese Embassy in Bangladesh, Chinese
 * municipal government (Beijing) pages quoting national exit-entry law, and
 * the universities themselves.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });

/** Read on this date; re-check within six months. */
export const CN_READ = '2026-09-29';

// Chinese Embassy in Bangladesh
export const CN_EMB_VISA = gov('Embassy of China in Bangladesh – Important notices for Chinese visa application (12 September 2025)', 'https://bd.china-embassy.gov.cn/eng/sghd/202509/t20250912_11707745.htm');
export const CN_EMB_CSC = sch('Embassy of China in Bangladesh – Announcement: Chinese Government Scholarship (CSC Type A), 19 December 2025', 'https://bd.china-embassy.gov.cn/eng/sghd/202512/t20251219_11776194.htm');
export const CN_EMB_CSC_2023 = sch('Embassy of China in Bangladesh – 2023-2024 Chinese Government Scholarship results', 'https://bd.china-embassy.gov.cn/eng/zmjw/202306/t20230619_11099620.htm');

// Chinese government (Beijing municipal pages quoting national law)
export const CN_BJ_VISA = gov('Beijing Municipal Government – Guidelines for application for student visas to China (X1/X2)', 'https://english.beijing.gov.cn/studyinginbeijing/visaapplications/202306/t20230614_3134241.html');
export const CN_BJ_RP_WORK = gov('Beijing Municipal Government – Residence permits endorsed with internship or work-study (incl. national Exit-Entry regulations)', 'https://english.beijing.gov.cn/mostrequested/residencepermit/international/202405/t20240528_3695884.html');

// Scholarship portal
export const CN_CAMPUSCHINA = sch('China Scholarship Council – Study in China (CSC online application)', 'https://www.campuschina.org/');

// Universities (their own pages)
export const CN_ZJU_UG = uni('Zhejiang University – Application guide for undergraduate programs 2026', 'https://iczu.zju.edu.cn/admissionsen/2024/1030/c68988a2981659/page.htm');
export const CN_ZJU_MA = uni('Zhejiang University – Application guide for master’s degree programs 2026', 'https://iczu.zju.edu.cn/admissionsen/2024/1030/c68989a2981849/page.htm');
export const CN_ZJU_PHD = uni('Zhejiang University – Application guide for doctoral degree programs 2026', 'https://iczu.zju.edu.cn/admissionsen/2024/1030/c68990a2981900/page.htm');
export const CN_TSINGHUA_ELIG = uni('Tsinghua University – Undergraduate admissions: eligibility', 'https://international.join-tsinghua.edu.cn/Admission1/Eligibility.htm');
export const CN_FUDAN = uni('Fudan University', 'https://www.fudan.edu.cn/en/');
export const CN_PKU = uni('Peking University', 'https://english.pku.edu.cn/');
export const CN_SJTU = uni('Shanghai Jiao Tong University', 'https://en.sjtu.edu.cn/');
export const CN_TSINGHUA = uni('Tsinghua University', 'https://www.tsinghua.edu.cn/en/');
export const CN_ZJU = uni('Zhejiang University', 'https://www.zju.edu.cn/english/');

import type { SourceRef } from '@/lib/models';

/**
 * Official Japan sources for the Japan guide, each read on JP_READ.
 * Confidence (internal): high = the Embassy of Japan in Bangladesh / MOFA /
 * the university itself; medium = JASSO "Study in Japan" summaries.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const JP_READ = '2026-09-28';

// Embassy of Japan in Bangladesh / Ministry of Foreign Affairs
export const JP_EMBASSY_DOCS = gov('Embassy of Japan in Bangladesh – Visa: documents required (Study, College/University)', 'https://www.bd.emb-japan.go.jp/en/visa/visaadditional.html');
export const JP_EMBASSY_MEXT = gov('Embassy of Japan in Bangladesh – MEXT Scholarship details for Bangladeshi students (posted 2020-10-05)', 'https://www.bd.emb-japan.go.jp/itpr_en/scholarshipnotice.html');
export const JP_MOFA_STUDENT = gov('Ministry of Foreign Affairs of Japan – General visa: Student', 'https://www.mofa.go.jp/j_info/visit/visa/long/visa6.html');
export const JP_EMBASSY_IE_MEXT = gov('Embassy of Japan in Ireland – MEXT Japanese Government Scholarship 2027 (allowances)', 'https://www.ie.emb-japan.go.jp/itpr_en/00_000055.html');

// JASSO – Study in Japan (government-approved)
export const JP_SIJ_UNIVERSITIES = gov('Study in Japan (JASSO) – Universities (undergraduate): admission requirements and first-year cost', 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/');
export const JP_SIJ_GRADUATE = gov('Study in Japan (JASSO) – Graduate schools: requirements, research proposal, advisor, documents', 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/graduate-schools/');
export const JP_SIJ_FEES = gov('Study in Japan (JASSO) – Academic fees', 'https://www.studyinjapan.go.jp/en/planning/academic-fees/');
export const JP_SIJ_LIVING = gov('Study in Japan (JASSO) – Living costs and expenses (2023 lifestyle survey)', 'https://www.studyinjapan.go.jp/en/life/cost-of-living/');
export const JP_SIJ_WORK = gov('Study in Japan (JASSO) – Part-time work', 'https://www.studyinjapan.go.jp/en/work-in-japan/part-time-jobs/');
export const JP_SIJ_INSURANCE = gov('Study in Japan (JASSO) – Insurance: National Health Insurance', 'https://www.studyinjapan.go.jp/en/life/insurance/');
export const JP_SIJ_ENGLISH = gov('Study in Japan (JASSO) – Degree programs in English', 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/english-programs/');
export const JP_SIJ_GUIDE_2026 = gov('Study in Japan (JASSO) – Basic Guide 2026 (PDF): EJU, tuition by university type, scholarships', 'https://www.studyinjapan.go.jp/en/assets/pdf/basic_guide_2026_english.pdf');

// Universities (their own websites)
export const JP_UTOKYO = uni('The University of Tokyo', 'https://www.u-tokyo.ac.jp/en/');
export const JP_KYOTO = uni('Kyoto University', 'https://www.kyoto-u.ac.jp/en');
export const JP_OSAKA = uni('Osaka University', 'https://www.osaka-u.ac.jp/en');
export const JP_TOHOKU = uni('Tohoku University', 'https://www.tohoku.ac.jp/en/');
export const JP_SCIENCE_TOKYO = uni('Institute of Science Tokyo – Established on October 1, 2024', 'https://www.isct.ac.jp/en/news/fqsr7lxwvnbe');

import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Sweden guide, each read on SE_READ.
 * Confidence (internal): high = the Swedish Migration Agency
 * (Migrationsverket), University Admissions in Sweden, Study in Sweden and the
 * Swedish Institute, and the universities themselves.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });

/** Read on this date; re-check within six months. */
export const SE_READ = '2026-09-29';

// Swedish Migration Agency
export const SE_PERMIT = gov('Swedish Migration Agency – Residence permit for studies at higher education', 'https://www.migrationsverket.se/en/you-want-to-apply/study/higher-education.html');
export const SE_NEW_RULES = gov('Swedish Migration Agency – New rules for residence permits for studies in higher education (25 May 2026)', 'https://www.migrationsverket.se/nyheter/news-archive/2026-05-25-new-rules-for-residence-permits-for-studies-in-higher-education.html');
export const SE_AFTER = gov('Swedish Migration Agency – Look for work after completing your studies in Sweden', 'https://www.migrationsverket.se/en/you-want-to-extend/study/look-for-work-after-completing-your-studies-in-sweden.html');

// University Admissions in Sweden (Swedish Council for Higher Education)
export const SE_UA_FEES = gov('Universityadmissions.se – Fees and scholarships', 'https://www.universityadmissions.se/en/support-centre/fees-and-scholarships/');
export const SE_UA_APPLY = gov('Universityadmissions.se – Admissions application (rounds and rules)', 'https://www.universityadmissions.se/en/support-centre/admissions-application/');
export const SE_UA_ENGLISH = gov('Universityadmissions.se – English language requirements', 'https://www.universityadmissions.se/en/entry-requirements/english-language-requirements/');
export const SE_UA_BD_BA = gov("Universityadmissions.se – Bangladesh: documents for bachelor's", 'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/country-instructions/bangladesh/');
export const SE_UA_BD_MA = gov("Universityadmissions.se – Bangladesh: documents for master's", 'https://www.universityadmissions.se/en/apply-to-masters/provide-application-documents-masters/country-instructions/bangladesh/');

// Study in Sweden (Swedish Institute)
export const SE_COSTS = gov('Study in Sweden (Swedish Institute) – Fees & costs', 'https://studyinsweden.se/plan-your-studies/fees-costs/');
export const SE_SISGP = sch('Swedish Institute – SI Scholarship for Global Professionals', 'https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/');

// Universities (their own pages)
export const SE_UU_FEES = uni("Uppsala University – Tuition fees for master's students", 'https://www.uu.se/en/study/masters-studies/fees');
export const SE_UU_FINANCING = uni('Uppsala University – Financing', 'https://www.uu.se/en/study/masters-studies/living-in-sweden/financing');
export const SE_CHALMERS = uni('Chalmers University of Technology', 'https://www.chalmers.se/en/');
export const SE_KTH = uni('KTH Royal Institute of Technology', 'https://www.kth.se/en');
export const SE_LUND = uni('Lund University', 'https://www.lunduniversity.lu.se/');
export const SE_SU = uni('Stockholm University', 'https://www.su.se/english/');
export const SE_UU = uni('Uppsala University', 'https://www.uu.se/en');

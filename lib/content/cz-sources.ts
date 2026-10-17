import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Czech Republic guide, each read on CZ_READ.
 * Confidence (internal): high = the Ministry of the Interior's Information
 * Portal for Foreigners (ipc.gov.cz / cizinci.cz), the Ministry of Foreign
 * Affairs (mzv.gov.cz), and the Ministry of Education, Youth and Sports
 * (msmt.gov.cz, for the government scholarship); medium = Study in Czechia
 * (studyin.gov.cz, the government-backed national study-promotion portal run
 * with DZS/MEYS) and universities' own pages for admission and tuition.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const CZ_READ = '2026-10-17';

// Ministry of the Interior — Information Portal for Foreigners (ipc.gov.cz / cizinci.cz)
export const CZ_IPC_LT_VISA = gov('Ministry of the Interior – Long-term Visa for the Purpose of Studies (ipc.gov.cz)', 'https://ipc.gov.cz/en/visa-and-residence-permit-types/third-country-nationals/long-term-visa/long-term-visa-for-the-purpose-of-studies/');
export const CZ_IPC_LT_PERMIT = gov('Ministry of the Interior – Long-term Residence Permit for the Purpose of Studies (ipc.gov.cz)', 'https://ipc.gov.cz/en/visa-and-residence-permit-types/third-country-nationals/long-term-residence-permits/long-term-residence-permit-in-the-czech-republic-for-the-purpose-of-studies/');
export const CZ_IPC_JOBSEEK = gov('Ministry of the Interior – Long-term Residence Permit for the Purpose of Seeking Employment or Starting a Business (ipc.gov.cz)', 'https://ipc.gov.cz/en/visa-and-residence-permit-types/third-country-nationals/long-term-residence-permits/long-term-residence-permit-for-the-purpose-of-seeking-employment-or-starting-a-business/');
export const CZ_IPC_FUNDS = gov('Ministry of the Interior – Proof of Funds for the Stay (Finances) (ipc.gov.cz)', 'https://ipc.gov.cz/en/forms-and-documents/documents/proof-of-funds-for-the-residence-finances/');
export const CZ_IPC_INSURANCE = gov('Ministry of the Interior – Medical Insurance (ipc.gov.cz)', 'https://ipc.gov.cz/en/forms-and-documents/documents/medical-insurance/');

// Ministry of Foreign Affairs (mzv.gov.cz)
export const CZ_MZV_LT_VISA = gov('Ministry of Foreign Affairs – Long-Term Visa', 'https://mzv.gov.cz/jnp/en/information_for_aliens/long_stay_visa/long_stay_visa.mobi');
export const CZ_MZV_SCHOLARSHIP_BD = gov('Embassy of the Czech Republic in New Delhi – Czech Government scholarships for Bangladeshi students', 'https://mzv.gov.cz/newdelhi/en/pr/education/czech_government_scholarships_for_2.html');

// Ministry of Education, Youth and Sports (msmt.gov.cz)
export const CZ_MSMT_SCHOLARSHIPS = gov('Ministry of Education, Youth and Sports – Government Scholarships: Developing Countries', 'https://msmt.gov.cz/en/scholarships/government-scholarships-developing-countries');

// Study in Czechia (studyin.gov.cz) — government-backed study-promotion portal (MEYS / DZS)
export const CZ_STUDYIN_VISAS = gov('Study in Czechia – Visas and Residence Permits for Studying in Czechia', 'https://studyin.gov.cz/get-ready-for-czechia/visas-and-permits/');
export const CZ_STUDYIN_WORK = gov('Study in Czechia – Work During Studies in Czechia', 'https://studyin.gov.cz/get-ready-for-czechia/work-during-studies/');

// Universities (their own pages)
export const CZ_CUNI = uni('Charles University', 'https://cuni.cz/UKEN-1.html');
export const CZ_CUNI_APPLY = uni('Charles University – How to Apply', 'https://cuni.cz/UKEN-329.html');
export const CZ_CUNI_TUITION = uni('Charles University – Tuition Fees', 'https://cuni.cz/UKEN-372.html');
export const CZ_CTU = uni('Czech Technical University in Prague (CTU)', 'https://www.cvut.cz/en');
export const CZ_CTU_ENTRANCE = uni('Czech Technical University in Prague – Entrance Procedures', 'https://www.cvut.cz/en/entrance-procedures');
export const CZ_CTU_FIT_BACHELOR = uni('CTU Faculty of Information Technology – Bachelor Study Program (Informatics)', 'https://fit.cvut.cz/en/applicants/admissions-procedure/bachelor-study-program');
export const CZ_CTU_FEL_TUITION = uni('CTU Faculty of Electrical Engineering – Tuition Fees', 'https://fel.cvut.cz/en/admissions/admission-procedures/tuition-fees');
export const CZ_MUNI = uni('Masaryk University (MUNI)', 'https://www.muni.cz/en');
export const CZ_MUNI_APPLY = uni('Masaryk University – How to Apply', 'https://www.muni.cz/en/admissions/bachelors-and-masters-studies/how-to-apply');
export const CZ_MUNI_TUITION = uni('Masaryk University – Tuition Fees and Financial Aid', 'https://www.muni.cz/en/admissions/bachelors-and-masters-studies/tuition-fees-and-financial-aid');
export const CZ_MUNI_FSS_ENGLISH = uni('Masaryk University, Faculty of Social Studies – Bachelor’s Studies (English proficiency requirements)', 'https://www.fss.muni.cz/en/faculty-of-social-studies/admissions/bachelors-studies');
export const CZ_BUT = uni('Brno University of Technology (BUT/VUT)', 'https://www.vut.cz/en');
export const CZ_BUT_JOIN = uni('Brno University of Technology – Join BUT', 'https://www.vut.cz/en/study-options/join-but');

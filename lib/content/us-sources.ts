import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the United States guide, each read on US_READ.
 * Confidence (internal): high = U.S. Department of State (travel.state.gov,
 * EducationUSA, U.S. Embassy Dhaka), Department of Homeland Security
 * (Study in the States / SEVP, ICE), USCIS, the Federal Register and the
 * universities themselves.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });

/** Read on this date; re-check within six months (U.S. student rules changed in September 2026). */
export const US_READ = '2026-09-29';

// U.S. Department of State
export const US_VISA = gov('U.S. Department of State – Student visa (F-1): how to apply', 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html');
export const US_FEES = gov('U.S. Department of State – Fees for visa services', 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/fees-visa-services.html');
export const US_RECIPROCITY_BD = gov('U.S. Department of State – Visa reciprocity: Bangladesh', 'https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/Bangladesh.html');
export const US_EMBASSY_EDUSA = gov('U.S. Embassy in Bangladesh – EducationUSA frequently asked questions', 'https://bd.usembassy.gov/educationusa-frequently-asked-questions/');
export const US_EDUSA_GRAD_FUNDS = gov('EducationUSA (U.S. Department of State) – Finance your studies: graduate', 'https://educationusa.state.gov/your-5-steps-us-study/finance-your-studies/graduate');
export const US_EDUSA_UG_APPLY = gov('EducationUSA (U.S. Department of State) – Complete your application: undergraduate', 'https://educationusa.state.gov/your-5-steps-us-study/complete-your-application/undergraduate');

// U.S. Department of Homeland Security / USCIS / Federal Register
export const US_SEVIS_FEE = gov('U.S. Immigration and Customs Enforcement – I-901 SEVIS fee', 'https://www.ice.gov/sevis/i901');
export const US_FUNDS = gov('Study in the States (DHS) – Financial ability', 'https://studyinthestates.dhs.gov/students/prepare/financial-ability');
export const US_WORK = gov('Study in the States (DHS) – Working in the United States', 'https://studyinthestates.dhs.gov/students/work/working-in-the-united-states');
export const US_CPT = gov('Study in the States (DHS) – F-1 Curricular Practical Training (CPT)', 'https://studyinthestates.dhs.gov/sevis-help-hub/student-records/fm-student-employment/f-1-curricular-practical-training-cpt');
export const US_OPT = gov('USCIS – Optional Practical Training (OPT) for F-1 students', 'https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students');
export const US_DS_RULE = gov('Study in the States (DHS) – Final rule: fixed time period of admission (quick facts)', 'https://studyinthestates.dhs.gov/final-rule-establishing-a-fixed-time-period-of-admission-and-an-extension-of-stay-procedure-quick');
export const US_DS_FR = gov('Federal Register – Establishing a Fixed Time Period of Admission … (final rule, 17 July 2026)', 'https://www.federalregister.gov/documents/2026/07/17/2026-14439/establishing-a-fixed-time-period-of-admission-and-an-extension-of-stay-procedure-for-nonimmigrant');

// Scholarships
export const US_FULBRIGHT_BD = sch('U.S. Embassy in Bangladesh – Fulbright Foreign Student Program announcement (2027-2028)', 'https://bd.usembassy.gov/fulbright-foreign-student-program-announcement/');

// Universities (their own pages)
export const US_PSU_BD = uni('Penn State – International credentials: Bangladesh', 'https://www.psu.edu/resources/international-students/credentials/bangladesh');
export const US_UCSD_INTL = uni('UC San Diego – International student admissions', 'https://admissions.ucsd.edu/international/');
export const US_TXST_BD = uni('Texas State University – Secondary credentials: Bangladesh', 'https://www.admissions.txst.edu/future-students/international/secondary-credentials/list-by-country/bangladesh.html');
export const US_GATECH_GRAD = uni('Georgia Tech – Graduate admission: country-specific requirements', 'https://grad.gatech.edu/admissions/international/country-specific-requirements');
export const US_UNR_GRAD = uni('University of Nevada, Reno – International and three-year degree equivalency (graduate)', 'https://www.unr.edu/grad/admissions/requirements/international/equivalent-degrees');
export const US_SYRACUSE_GRAD = uni('Syracuse University – Equivalence of a U.S. bachelor’s degree', 'https://www.syracuse.edu/admissions-aid/application-process/international/graduate/equivalence-us-bachelors/');
export const US_GATECH = uni('Georgia Institute of Technology', 'https://www.gatech.edu/');
export const US_PSU = uni('Pennsylvania State University', 'https://www.psu.edu/');
export const US_SYRACUSE = uni('Syracuse University', 'https://www.syracuse.edu/');
export const US_TXST = uni('Texas State University', 'https://www.txst.edu/');
export const US_UCSD = uni('University of California San Diego', 'https://ucsd.edu/');
export const US_UNR = uni('University of Nevada, Reno', 'https://www.unr.edu/');

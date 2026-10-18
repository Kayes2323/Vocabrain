import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Ireland guide, each read on IE_READ. Built the
 * same way as fr-sources.ts / si-sources.ts / cz-sources.ts / lt-sources.ts:
 * every fact traces back to one of these. Confidence (internal): high =
 * Ireland's Immigration Service Delivery (irishimmigration.ie, under the
 * Department of Justice, Home Affairs and Migration) and the Department of
 * Foreign Affairs (ireland.ie); medium = the Higher Education Authority
 * (hea.ie, the state agency that manages the Government of Ireland
 * scholarships) and university pages for admission, fees and English
 * requirements.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const IE_READ = '2026-10-17';

// Immigration Service Delivery (irishimmigration.ie) — visas, registration, work, post-study
export const IE_ISD_STUDY = gov('Immigration Service Delivery – Coming to study in Ireland', 'https://www.irishimmigration.ie/coming-to-study-in-ireland/');
export const IE_ISD_VISA_HOWTO = gov('Immigration Service Delivery – How to apply for long term study visa', 'https://www.irishimmigration.ie/coming-to-study-in-ireland/what-are-my-study-visa-options/how-to-apply-for-long-term-study-visa/');
export const IE_ISD_FAQ = gov('Immigration Service Delivery – Frequently asked questions for students', 'https://www.irishimmigration.ie/coming-to-study-in-ireland/frequently-asked-questions-for-students/');
export const IE_ISD_FINANCE = gov('Immigration Service Delivery – Information on Student Finances', 'https://www.irishimmigration.ie/coming-to-study-in-ireland/what-are-my-study-options/a-fee-paying-private-primary-or-secondary-school/information-on-student-finances/');
export const IE_ISD_GRAD = gov('Immigration Service Delivery – Third level graduate programme', 'https://www.irishimmigration.ie/my-situation-has-changed-since-i-arrived-in-ireland/third-level-graduate-programme/');
export const IE_ISD_VISA_LIST = gov('Immigration Service Delivery – Visa & Non-Visa Required Nationalities', 'https://www.irishimmigration.ie/visa-non-visa-required-nationalities/');
export const IE_ISD_REGISTER = gov('Immigration Service Delivery – How to register your immigration permission for the first time', 'https://www.irishimmigration.ie/registering-your-immigration-permission/how-to-register-your-immigration-permission-for-the-first-time/');

// Department of Foreign Affairs (ireland.ie)
export const IE_DFA_VISAS = gov('Department of Foreign Affairs – Visas for Ireland', 'https://www.ireland.ie/en/dfa/visas-for-ireland/');
export const IE_DFA_EMBASSIES = gov('Department of Foreign Affairs – Irish Embassies and Consulates Abroad (Bangladesh)', 'https://www.ireland.ie/en/dfa/embassies/');

// Higher Education Authority — Government of Ireland International Education Scholarships
export const IE_HEA_GOIIES = sch('Higher Education Authority – Government of Ireland International Education Scholarships', 'https://hea.ie/policy/internationalisation/goi-ies/');

// Trinity College Dublin
export const IE_TCD = uni('Trinity College Dublin', 'https://www.tcd.ie/');
export const IE_TCD_INTL = uni('Trinity College Dublin – International Applicants', 'https://www.tcd.ie/study/international/');
export const IE_TCD_ENTRY = uni('Trinity College Dublin – Entry Requirements for International Students', 'https://www.tcd.ie/study/international/how-to-apply/entry-requirements.php');
export const IE_TCD_ENGLISH = uni('Trinity College Dublin – English Language Requirements', 'https://www.tcd.ie/study/english-language-requirements/');
export const IE_TCD_UG_FEES = uni('Trinity College Dublin – Undergraduate Fees', 'https://www.tcd.ie/courses/undergraduate/fees/');
export const IE_TCD_UG_ADMISSION = uni('Trinity College Dublin – Undergraduate Admission Requirements', 'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/');

// University College Dublin
export const IE_UCD = uni('University College Dublin', 'https://www.ucd.ie/');
export const IE_UCD_FEES = uni('UCD – International (Non-EU) Programme Fees', 'https://www.ucd.ie/students/fees/noneucoursefees/');
export const IE_UCD_HOWTOAPPLY = uni('UCD Global – How to Apply', 'https://www.ucd.ie/global/study-at-ucd/faqs/');
export const IE_UCD_ENGLISH = uni('UCD Registry – Minimum English Language Requirements', 'https://www.ucd.ie/registry/prospectivestudents/admissions/policiesandgeneralregulations/generalrequirements/minimumenglishlanguagerequirements/');
export const IE_UCD_GOI_SCHOLARSHIP = uni('UCD Global – Government of Ireland Scholarships', 'https://www.ucd.ie/global/study-at-ucd/scholarshipsfinances/scholarships/governmentofirelandscholarships/');

// University College Cork
export const IE_UCC = uni('University College Cork', 'https://www.ucc.ie/');
export const IE_UCC_UG_FEES = uni('UCC – International Undergraduate Fees 2026/27', 'https://www.ucc.ie/en/financeoffice/fees/schedules/internationalundergraduatefees202627/');
export const IE_UCC_APPLY = uni('UCC – How do I apply? (visiting / non-EU students)', 'https://www.ucc.ie/en/international/studyatucc/undergraduateprogrammes/');
export const IE_UCC_ENGLISH = uni('UCC – Undergraduate English Language Entry Requirements', 'https://www.ucc.ie/en/study/comparison/english/undergraduate/');

// University of Galway
export const IE_GALWAY = uni('University of Galway', 'https://www.universityofgalway.ie/');
export const IE_GALWAY_ENTRY = uni('University of Galway – Entry Requirements (international)', 'https://www.universityofgalway.ie/global-galway/studyinireland/entryrequirements/');
export const IE_GALWAY_PG_FEES = uni('University of Galway – Postgraduate fees', 'https://www.universityofgalway.ie/student-fees/how-much/postgraduate-fees/');
export const IE_GALWAY_UG_FEES = uni('University of Galway – Fees & Funding (undergraduate course fees)', 'https://www.universityofgalway.ie/courses/fees-and-funding/fees.html');
export const IE_GALWAY_HOWTOAPPLY = uni('University of Galway – How to Apply', 'https://www.universityofgalway.ie/courses/how-to-apply/');

// QS World University Rankings 2027 (topuniversities.com)
export const IE_TCD_QS = uni('QS World University Rankings 2027 – Trinity College Dublin (topuniversities.com)', 'https://www.topuniversities.com/universities/trinity-college-dublin-university-dublin');
export const IE_UCD_QS = uni('QS World University Rankings 2027 – University College Dublin (topuniversities.com)', 'https://www.topuniversities.com/universities/university-college-dublin');
export const IE_UCC_QS = uni('QS World University Rankings 2027 – University College Cork (topuniversities.com)', 'https://www.topuniversities.com/universities/university-college-cork');
export const IE_GALWAY_QS = uni('QS World University Rankings 2027 – University of Galway (topuniversities.com)', 'https://www.topuniversities.com/universities/university-galway');

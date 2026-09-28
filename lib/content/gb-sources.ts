import type { SourceRef } from '@/lib/models';

/**
 * Official UK sources for the United Kingdom guide, each read on GB_READ.
 * Confidence (internal): high = GOV.UK / UKVI, UCAS, the scholarship bodies
 * and the universities themselves.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });

/** Read on this date; re-check within six months. */
export const GB_READ = '2026-09-28';

// GOV.UK / UK Visas and Immigration
export const GB_VISA = gov('GOV.UK – Student visa: overview (eligibility, when to apply, fees, how long you can stay)', 'https://www.gov.uk/student-visa');
export const GB_VISA_MONEY = gov('GOV.UK – Student visa: money you need', 'https://www.gov.uk/student-visa/money');
export const GB_VISA_ENGLISH = gov('GOV.UK – Student visa: knowledge of English', 'https://www.gov.uk/student-visa/knowledge-of-english');
export const GB_VISA_DOCS = gov('GOV.UK – Student visa: documents you’ll need to apply', 'https://www.gov.uk/student-visa/documents-you-must-provide');
export const GB_VISA_COURSE = gov('GOV.UK – Student visa: your course and CAS', 'https://www.gov.uk/student-visa/course');
export const GB_VISA_FAMILY = gov('GOV.UK – Student visa: your partner and children', 'https://www.gov.uk/student-visa/family-members');
export const GB_APPENDIX_STUDENT = gov('GOV.UK – Immigration Rules: Appendix Student (work conditions)', 'https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-student');
export const GB_IHS = gov('GOV.UK – Immigration health surcharge: how much you have to pay', 'https://www.gov.uk/healthcare-immigration-application/how-much-pay');
export const GB_TB = gov('GOV.UK – Countries where you need a TB test for your UK visa application', 'https://www.gov.uk/tb-test-visa/countries-where-you-need-a-tb-test-to-enter-the-uk');
export const GB_TB_BD = gov('GOV.UK – Bangladesh: tuberculosis test clinics for a UK visa', 'https://www.gov.uk/government/publications/tuberculosis-test-for-a-uk-visa-clinics-in-bangladesh');
export const GB_GRADUATE = gov('GOV.UK – Graduate visa', 'https://www.gov.uk/graduate-visa');
export const GB_VAC = gov('GOV.UK – Find a visa application centre (Bangladesh: VFS Global)', 'https://www.gov.uk/find-a-visa-application-centre');
export const GB_VFS_BD = gov('UK Visa Application Centres in Bangladesh (VFS Global, commissioned by UKVI)', 'https://visa.vfsglobal.com/bgd/en/gbr/attend-centre');

// UCAS
export const GB_UCAS_DATES = uni('UCAS – Dates and deadlines for uni applications', 'https://www.ucas.com/applying/applying-to-university/dates-and-deadlines-for-uni-applications');
export const GB_UCAS_FORM = uni('UCAS – How to fill in the UCAS application (2027 fee)', 'https://www.ucas.com/discover/advice-for-parents-carers-and-guardians/how-to-fill-in-the-ucas-application');

// Scholarships
export const GB_CHEVENING_ELIG = sch('Chevening – Eligibility criteria', 'https://www.chevening.org/resource-hub/guidance/eligibility/');
export const GB_CHEVENING_COVER = sch('Chevening – What does a Chevening Scholarship cover?', 'https://www.chevening.org/faqs/what-does-a-chevening-scholarship-cover/');
export const GB_CSC_MASTERS = sch('Commonwealth Scholarship Commission – Commonwealth Master’s Scholarships (2027/28)', 'https://cscuk.fcdo.gov.uk/scholarships/commonwealth-masters-scholarships/');
export const GB_CSC_PHD = sch('Commonwealth Scholarship Commission – Commonwealth PhD Scholarships (2027/28)', 'https://cscuk.fcdo.gov.uk/scholarships/commonwealth-phd-scholarships-for-least-developed-countries-and-vulnerable-states/');
export const GB_GREAT_BD = sch('British Council Study UK – GREAT Scholarships: Bangladesh (2026-27)', 'https://study-uk.britishcouncil.org/scholarships-funding/great-scholarships/bangladesh');
export const GB_UKRI = gov('UKRI – Support for UKRI-funded students (minimum stipend and fee)', 'https://www.ukri.org/manage-your-award/support-for-ukri-funded-students/');

// Universities (their own websites)
export const GB_EDINBURGH_BD = uni('University of Edinburgh – Undergraduate entry requirements: Bangladesh', 'https://www.ed.ac.uk/studying/international/country/asia/south-asia/bangladesh');
export const GB_MANCHESTER_BD = uni('University of Manchester – Entry requirements for students from Bangladesh', 'https://www.manchester.ac.uk/study/international/country-specific-information/bangladesh/entry-requirements/');
export const GB_BIRMINGHAM = uni('University of Birmingham', 'https://www.birmingham.ac.uk/');
export const GB_CAMBRIDGE = uni('University of Cambridge', 'https://www.cam.ac.uk/');
export const GB_EDINBURGH = uni('University of Edinburgh', 'https://www.ed.ac.uk/');
export const GB_IMPERIAL = uni('Imperial College London', 'https://www.imperial.ac.uk/');
export const GB_KCL = uni("King's College London", 'https://www.kcl.ac.uk/');
export const GB_MANCHESTER = uni('University of Manchester', 'https://www.manchester.ac.uk/');
export const GB_OXFORD = uni('University of Oxford', 'https://www.ox.ac.uk/');
export const GB_UCL = uni('University College London', 'https://www.ucl.ac.uk/');

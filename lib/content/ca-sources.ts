import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Canada guide, each read on CA_READ.
 * Confidence (internal): high = Immigration, Refugees and Citizenship Canada
 * (IRCC), the Government of Quebec, Statistics Canada, Global Affairs Canada
 * (EduCanada), NSERC and the universities themselves.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });

/** Read on this date; re-check within six months. */
export const CA_READ = '2026-09-29';

// IRCC — study permit
export const CA_APPLY = gov('IRCC – Study permit: How to apply (modified 2 September 2026)', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/apply.html');
export const CA_GUIDE_5269 = gov('IRCC – Guide 5269: Applying for a study permit outside Canada (modified 3 February 2026)', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5269-applying-study-permit-outside-canada.html');
export const CA_FUNDS = gov('IRCC – Study permit: Proof of financial support (modified 28 August 2026)', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html');
export const CA_PAL = gov('IRCC – Provincial or territorial attestation letter (PAL/TAL) (modified 2 September 2026)', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/provincial-attestation-letter.html');
export const CA_FEES = gov('IRCC – Citizenship and immigration application fees: Fee list (modified 21 September 2026)', 'https://ircc.canada.ca/english/information/fees/fees.asp');
export const CA_MEDICAL = gov('IRCC – Medical exams for visitors, students and workers', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/medical-exams/requirements-temporary-residents.html');
export const CA_MEDICAL_LIST = gov('IRCC – Find out if you need a medical exam: countries and territories (modified 16 July 2026)', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/medical-exams/requirements-temporary-residents/country-requirements.html');
export const CA_VAC = gov('IRCC – Find a visa application centre (modified 24 August 2026)', 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/contact-ircc/offices/find-visa-application-centre.html');

// IRCC — work
export const CA_WORK = gov('IRCC – Work off campus as an international student (modified 15 April 2026)', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html');
export const CA_SPOUSE = gov('IRCC – Help your spouse or common-law partner work in Canada (modified 3 February 2026)', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/help-your-spouse-common-law-partner-work-canada.html');
export const CA_PGWP_ELIG = gov('IRCC – Post-graduation work permit: Who can apply (modified 24 June 2026)', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/eligibility.html');
export const CA_PGWP_ABOUT = gov('IRCC – About the post-graduation work permit (PGWP) (modified 9 March 2026)', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/about.html');
export const CA_PGWP_APPLY = gov('IRCC – Post-graduation work permit: How to apply (modified 28 August 2026)', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/apply.html');

// Quebec
export const CA_QC_COSTS = gov('Gouvernement du Québec – Costs related to studying in Québec', 'https://www.quebec.ca/en/education/study-quebec/required-conditions/costs-studies');

// Statistics Canada and EduCanada
export const CA_STATCAN = gov('Statistics Canada – Table 37-10-0045-01: Canadian and international tuition fees by level of study (released 16 September 2026)', 'https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3710004501');
export const CA_EDUCANADA_COST = gov('EduCanada (Global Affairs Canada) – Study costs for international students in Canada', 'https://www.educanada.ca/programs-programmes/education_cost-cout_education.aspx?lang=eng');

// Scholarships
export const CA_SICS = sch('EduCanada (Global Affairs Canada) – Study in Canada Scholarships', 'https://www.educanada.ca/scholarships-bourses/can/institutions/study-in-canada-sep-etudes-au-canada-pct.aspx?lang=eng');
export const CA_CGRSD = sch('NSERC – Canada Graduate Research Scholarship – Doctoral program (modified 8 July 2026)', 'https://nserc-crsng.canada.ca/en/funding-opportunity/canada-graduate-research-scholarship-doctoral-program');
export const CA_VANIER = sch('Vanier Canada Graduate Scholarships (program page)', 'https://vanier.gc.ca/en/home-accueil.html');

// Universities (their own pages)
export const CA_UALBERTA_BD = uni('University of Alberta – Undergraduate entrance requirements: Bangladesh', 'https://www.ualberta.ca/en/admissions/how-to-apply/international-admission-requirements/international-curricula/bangladesh.html');
export const CA_UOFT_COUNTRY = uni('University of Toronto – International high school requirements by country', 'https://future.utoronto.ca/international-high-school-requirements-country');
export const CA_UOFT_ENGLISH = uni('University of Toronto – English language requirements (undergraduate)', 'https://future.utoronto.ca/english-language-requirements');
export const CA_UOFT_SGS_ENGLISH = uni('University of Toronto School of Graduate Studies – English-language proficiency testing', 'https://www.sgs.utoronto.ca/future-students/admission-application-requirements/english-language-proficiency-testing/');
export const CA_WATERLOO_BD = uni('University of Waterloo – Computer Science admission requirements for high school students from Bangladesh', 'https://uwaterloo.ca/future-students/admissions/admission-requirements/computer-science/high-school/international/bangladesh');
export const CA_DAL = uni('Dalhousie University', 'https://www.dal.ca/');
export const CA_MCGILL = uni('McGill University', 'https://www.mcgill.ca/');
export const CA_UALBERTA = uni('University of Alberta', 'https://www.ualberta.ca/');
export const CA_UBC = uni('University of British Columbia', 'https://www.ubc.ca/');
export const CA_UOFT = uni('University of Toronto', 'https://www.utoronto.ca/');
export const CA_WATERLOO = uni('University of Waterloo', 'https://uwaterloo.ca/');

import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Denmark guide, built the same way as
 * at-sources.ts / hu-sources.ts / lt-sources.ts: every fact traces back to
 * one of these. Confidence (internal): high = the Danish Agency for
 * International Recruitment and Integration (SIRI — Styrelsen for
 * International Rekruttering og Integration, under the Ministry of
 * Immigration and Integration), which decides every student residence and
 * work permit, and the Danish Ministry of Foreign Affairs' own Bangladesh
 * mission page (um.dk); medium = the official "Study in Denmark" portal
 * (studyindenmark.dk, run by the Ministry of Higher Education and Science's
 * Danish Agency for Higher Education and Science / Uddannelses- og
 * Forskningsstyrelsen) and university admissions pages. Denmark is an
 * EU/EEA and Schengen member, so this guide is built from Denmark's own
 * national rules (which still apply fully to Bangladeshi, non-EU/EEA
 * applicants) — nothing is borrowed from another EU country's guide (e.g.
 * Austria's, Hungary's, Switzerland's, the Netherlands', Ireland's,
 * France's, Slovenia's, the Czech Republic's or Lithuania's).
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months (the 1 October 2026 rule change makes the visa/post-study pages especially worth rereading). */
export const DK_READ = '2026-10-18';

// New to Denmark (nyidanmark.dk) — SIRI, under the Ministry of Immigration and Integration
export const DK_SIRI_STUDY = gov('New to Denmark (SIRI) – You want to apply for a residence and work permit as a student', 'https://www.nyidanmark.dk/en-GB/You-want-to-apply/Study');
export const DK_SIRI_HIGHER_ED = gov('New to Denmark (SIRI) – Higher educational programmes (residence permit for students)', 'https://nyidanmark.dk/en-GB/You-want-to-apply/Study/Higher-Education');
export const DK_SIRI_NEW_RULES_2026 = gov('New to Denmark (SIRI) – New rules for third-country students in state-approved higher educational programmes (from 1 October 2026)', 'https://www.nyidanmark.dk/en-GB/News-Front-Page/2026/09/SIRI---Nye-regler-for-studerende');
export const DK_SIRI_ACCOMPANYING_FAMILY = gov('New to Denmark (SIRI) – Accompanying family members: study and PhD', 'https://www.nyidanmark.dk/en-GB/You-want-to-apply/Family/Accompanying-family-members/Accompanying-family---study-and-PhD');

// Danish Ministry of Foreign Affairs (um.dk) — Denmark's mission in Bangladesh
export const DK_UM_BANGLADESH = gov('Denmark in Bangladesh – Royal Danish Embassy in Dhaka (Ministry of Foreign Affairs)', 'https://um.dk/bangladesh/en');
export const DK_UM_BANGLADESH_VISA = gov('Denmark in Bangladesh – Visa (Royal Danish Embassy in Dhaka)', 'https://um.dk/bangladesh/en/travel-and-residence/practical-information/visa/');

// Study in Denmark (studyindenmark.dk) — Danish Agency for Higher Education and Science
export const DK_SID_TUITION = sch('Study in Denmark – Tuition Fees', 'https://studyindenmark.dk/study-options/tuition-fees-and-scholarships');
export const DK_SID_SCHOLARSHIPS = sch('Study in Denmark – Scholarships', 'https://studyindenmark.dk/study-options/scholarships');

// Lifeindenmark.dk / Aarhus University — health insurance / CPR (cited only for the general CPR/health-card mechanism, not as a university-specific rule)
export const DK_LIFEINDENMARK_ARRIVE = gov('Lifeindenmark.dk – When you arrive: register as a citizen and get the health insurance card ("the yellow card")', 'https://lifeindenmark.borger.dk/theme/when-you-arrive');

// University of Copenhagen (ku.dk)
export const DK_KU_TUITION = uni('University of Copenhagen – Application deposit fee and tuition fees', 'https://www.ku.dk/studies/admission/application-deposit-fee-and-tuition-fees');
export const DK_KU_MASTERS_DEADLINES = uni('University of Copenhagen – Important dates and deadlines for master’s programmes', 'https://www.ku.dk/studies/admission/masters-important-dates-and-deadlines');
export const DK_KU_BACHELOR = uni('University of Copenhagen – Admission requirements (bachelor’s)', 'https://www.ku.dk/studies/admission/bachelor');
export const DK_KU_SCHOLARSHIPS = sch('University of Copenhagen – Scholarships for full degree students', 'https://www.ku.dk/studies/admission/scholarships-for-full-degree-students');

// Technical University of Denmark (dtu.dk)
export const DK_DTU_FEES = uni('DTU – Fees and funding for paying students enrolled in a DTU study programme', 'https://www.dtu.dk/english/education/graduate/fees-and-funding');
export const DK_DTU_DEADLINES = uni('DTU – Application deadlines for DTU’s MSc programmes', 'https://www.dtu.dk/english/education/graduate/admission-and-deadlines/application_procedure_dk/application-deadlines');
export const DK_DTU_ENGLISH = uni('DTU – Applying for an MSc at DTU: English language requirements', 'https://www.dtu.dk/english/education/graduate/admission-and-deadlines/application_procedure/apply/language-test-requirements');

// Aarhus University (au.dk)
export const DK_AU_DEADLINES = uni('Aarhus University – Deadlines and important dates (master’s)', 'https://masters.au.dk/deadlines-and-important-dates');
export const DK_AU_TUITION = uni('Aarhus University – Tuition fees and application fee (master’s)', 'https://masters.au.dk/tuitionfees');
export const DK_AU_BACHELOR_TUITION = uni('Aarhus University – Tuition fees and application fee at Aarhus University (bachelor’s)', 'https://bachelor.au.dk/en/international-applicants/moreinfo/tuition-fees-and-application-fee');

// Copenhagen Business School (cbs.dk)
export const DK_CBS_MASTERS_ADMISSION = uni('Copenhagen Business School – Application and admission (master’s)', 'https://www.cbs.dk/en/study-programmes/master-programmes/application-and-admission');
export const DK_CBS_BACHELOR_ADMISSION = uni('Copenhagen Business School – Application and admission (bachelor’s)', 'https://www.cbs.dk/en/study-programmes/bachelor-programmes/application-and-admission');

// Aalborg University (aau.dk)
export const DK_AAU_MASTER_APPLY = uni('Aalborg University – How and when to apply (master’s)', 'https://www.en.aau.dk/education/apply/master/how-and-when-to-apply');
export const DK_AAU_FINANCE_FEES = uni('Aalborg University – Finance and fees (master’s): tuition fee rates, application fee and scholarships', 'https://www.en.aau.dk/education/apply/master/finance-and-fees');
export const DK_AAU_BACHELOR_NON_EU = uni('Aalborg University – Admission requirements for non-EU applicants (bachelor’s)', 'https://www.en.aau.dk/education/apply/bachelor/non-eu-eea-admission-requirements');

// QS World University Rankings 2027 (topuniversities.com)
export const DK_KU_QS = uni('QS World University Rankings 2027 – University of Copenhagen (topuniversities.com)', 'https://www.topuniversities.com/universities/university-copenhagen');
export const DK_DTU_QS = uni('QS World University Rankings 2027 – Technical University of Denmark (topuniversities.com)', 'https://www.topuniversities.com/universities/technical-university-denmark');
export const DK_AU_QS = uni('QS World University Rankings 2027 – Aarhus University (topuniversities.com)', 'https://www.topuniversities.com/universities/aarhus-university');
export const DK_CBS_QS = uni('QS – Copenhagen Business School profile (topuniversities.com): not ranked in the overall QS World University Rankings 2027, only in a QS WUR subject ranking', 'https://www.topuniversities.com/universities/copenhagen-business-school');
export const DK_AAU_QS = uni('QS World University Rankings 2027 – Aalborg University (topuniversities.com)', 'https://www.topuniversities.com/universities/aalborg-university');

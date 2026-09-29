import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the New Zealand guide, each read on NZ_READ.
 * Confidence (internal): high = Immigration New Zealand, Education New
 * Zealand (Study with New Zealand, Manaaki scholarships) and the universities
 * themselves.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });

/** Read on this date; re-check within six months. */
export const NZ_READ = '2026-09-29';

// Immigration New Zealand
export const NZ_VISA = gov('Immigration New Zealand – Fee Paying Student Visa', 'https://www.immigration.govt.nz/visas/fee-paying-student-visa/');
export const NZ_PSW = gov('Immigration New Zealand – Post-Study Work Visa', 'https://www.immigration.govt.nz/visas/post-study-work-visa/');
export const NZ_TB = gov('Immigration New Zealand – Countries with a low incidence of tuberculosis', 'https://www.immigration.govt.nz/process-to-apply/applying-for-a-visa/providing-evidence-and-documents-to-support-your-visa-application/health-requirements/countries-with-a-low-incidence-of-tuberculosis/');

// Education New Zealand
export const NZ_COSTS = gov('Study with New Zealand (Education New Zealand) – Tuition fees and cost of living', 'https://www.studywithnewzealand.govt.nz/en/plan-your-studies/cost-of-living');
export const NZ_PHD = gov('Study with New Zealand (Education New Zealand) – PhD study', 'https://www.studywithnewzealand.govt.nz/en/study-options/higher-education/phd');
export const NZ_MANAAKI = sch('Manaaki New Zealand Scholarships (Education New Zealand) – Check eligible countries', 'https://www.nzscholarships.govt.nz/check-eligible-countries');

// Universities (their own pages)
export const NZ_WAIKATO_ENTRY = uni('University of Waikato – Entry requirements for international students', 'https://www.waikato.ac.nz/study/apply/international/entry-requirements-for-international-students/');
export const NZ_MASSEY_ENTRY = uni('Massey University – Entry requirements for international students', 'https://www.massey.ac.nz/study/entry-requirements-to-study-at-massey/entry-requirements-for-international-students/');
export const NZ_AUT_ENTRY = uni('AUT – International student entry requirements', 'https://www.aut.ac.nz/study/entry-requirements/international-student-entry-requirements');
export const NZ_LINCOLN_ENTRY = uni('Lincoln University – Overseas undergraduate entry criteria', 'https://www.lincoln.ac.nz/study/apply-and-enrol/apply/international-undergraduate-entry-criteria/');
export const NZ_VUW_ENTRY = uni('Te Herenga Waka—Victoria University of Wellington – Entry requirements (international)', 'https://www.wgtn.ac.nz/international/applying/entry-requirements');
export const NZ_AUT = uni('Auckland University of Technology', 'https://www.aut.ac.nz/');
export const NZ_LINCOLN = uni('Lincoln University', 'https://www.lincoln.ac.nz/');
export const NZ_MASSEY = uni('Massey University', 'https://www.massey.ac.nz/');
export const NZ_VUW = uni('Te Herenga Waka—Victoria University of Wellington', 'https://www.wgtn.ac.nz/');
export const NZ_AUCKLAND = uni('University of Auckland', 'https://www.auckland.ac.nz/');
export const NZ_OTAGO = uni('University of Otago', 'https://www.otago.ac.nz/');
export const NZ_WAIKATO = uni('University of Waikato', 'https://www.waikato.ac.nz/');

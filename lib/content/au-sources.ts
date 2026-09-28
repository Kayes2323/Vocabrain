import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Australia guide, each read on AU_READ.
 * Confidence (internal): high = Department of Home Affairs, Department of
 * Education / Study Australia, DFAT (Australia Awards), the Australian High
 * Commission in Dhaka and the universities themselves.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });

/** Read on this date; re-check within six months. */
export const AU_READ = '2026-09-28';

// Department of Home Affairs
export const AU_VISA = gov('Department of Home Affairs – Student visa (subclass 500)', 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500');
export const AU_485 = gov('Department of Home Affairs – Temporary Graduate visa (subclass 485)', 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485');
export const AU_485_PHE = gov('Department of Home Affairs – Temporary Graduate visa: Post-Higher Education Work stream', 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485/post-higher-education-work');
export const AU_HEALTH = gov('Department of Home Affairs – Health requirement', 'https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/health');
export const AU_HC_DHAKA = gov('Australian High Commission, Bangladesh – Visas and migration (biometrics, AVAC Dhaka)', 'https://bangladesh.embassy.gov.au/daca/05.html');
export const AU_VFS_BD = gov('Australian Visa Application Centre, Bangladesh (VFS Global, for the Department of Home Affairs)', 'https://visa.vfsglobal.com/bgd/en/aus');

// Department of Education / Study Australia
export const AU_COSTS = gov('Study Australia (Australian Government) – Living and education costs', 'https://www.studyaustralia.gov.au/en/life-in-australia/living-and-education-costs');
export const AU_ACCOM = gov('Study Australia (Australian Government) – Accommodation', 'https://www.studyaustralia.gov.au/en/life-in-australia/accommodation');
export const AU_LOCATIONS = gov('Study Australia (Australian Government) – Locations in Australia', 'https://www.studyaustralia.gov.au/en/life-in-australia/locations-in-australia');
export const AU_RTP = gov('Department of Education – Research Training Program (RTP)', 'https://www.education.gov.au/research-block-grants/research-training-program');
export const AU_RTP_FAQ = gov('Department of Education – RTP: Frequently Asked Questions for students', 'https://www.education.gov.au/research-block-grants/research-training-program/research-training-program-frequently-asked-questions-students');

// Australia Awards (DFAT)
export const AU_AWARDS_BD = sch('DFAT – Australia Awards Bangladesh: information for the 2027 intake', 'https://www.dfat.gov.au/sites/default/files/australia-awards-bangladesh-information-for-intake.pdf');
export const AU_AWARDS_HANDBOOK = sch('DFAT – Australia Awards Scholarships Policy Handbook', 'https://www.dfat.gov.au/sites/default/files/aus-awards-scholarships-policy-handbook.pdf');
export const AU_AWARDS_SITE = sch('Australia Awards Bangladesh', 'https://australiaawardsbangladesh.org/');

// Universities (their own websites)
export const AU_UNSW_TABLE = uni('UNSW Sydney – 2027 international undergraduate entry requirements table', 'https://www.unsw.edu.au/content/dam/pdfs/future-students/2027-int-ug-entry-table.pdf');
export const AU_MONASH_MIN = uni('Monash University – Minimum entry requirements', 'https://www.monash.edu/admissions/entry-requirements/minimum');
export const AU_MELB_UG = uni('University of Melbourne – International undergraduate entry requirements', 'https://study.unimelb.edu.au/how-to-apply/undergraduate-study/international-applications/entry-requirements');
export const AU_UQ_UG = uni('The University of Queensland – Review undergraduate entry requirements', 'https://study.uq.edu.au/admissions/undergraduate/review-entry-requirements');
export const AU_ADELAIDE = uni('Adelaide University', 'https://adelaide.edu.au/');
export const AU_ANU = uni('Australian National University', 'https://www.anu.edu.au/');
export const AU_MELBOURNE = uni('University of Melbourne', 'https://www.unimelb.edu.au/');
export const AU_MONASH = uni('Monash University', 'https://www.monash.edu/');
export const AU_SYDNEY = uni('University of Sydney', 'https://www.sydney.edu.au/');
export const AU_UNSW = uni('UNSW Sydney', 'https://www.unsw.edu.au/');
export const AU_UQ = uni('The University of Queensland', 'https://www.uq.edu.au/');
export const AU_UWA = uni('University of Western Australia', 'https://www.uwa.edu.au/');

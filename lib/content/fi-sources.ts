import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Finland guide, each read on FI_READ.
 * Confidence (internal): high = the Finnish Immigration Service (Migri),
 * Finland abroad (the Embassy of Finland serving Bangladesh, in New Delhi),
 * Studyinfo.fi and Study in Finland (Finnish National Agency for Education),
 * and the universities themselves.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const FI_READ = '2026-09-29';

// Finnish Immigration Service (Migri)
export const FI_PERMIT = gov('Finnish Immigration Service (Migri) – Residence permit application for studies', 'https://migri.fi/en/residence-permit-application-for-studies');
export const FI_INCOME = gov('Finnish Immigration Service (Migri) – Income requirement for students', 'https://migri.fi/en/income-requirement-for-students');
export const FI_INSURANCE = gov('Finnish Immigration Service (Migri) – Insurance for students', 'https://migri.fi/en/insurance');
export const FI_AFTER = gov('Finnish Immigration Service (Migri) – Residence permit to look for work or to start a business (students and researchers)', 'https://migri.fi/en/residence-permit-to-look-for-work');

// Finland abroad: Bangladesh (Embassy of Finland, New Delhi)
export const FI_EMB_RP = gov('Finland abroad: Bangladesh – Residence permits to Finland', 'https://finlandabroad.fi/web/bgd/residence-permits-to-finland');
export const FI_EMB_VERIFY = gov('Finland abroad: Bangladesh – Verification of Bangladeshi documents at VFS New Delhi (25 August 2025)', 'https://finlandabroad.fi/web/bgd/current-affairs/-/asset_publisher/h5w4iTUJhNne/content/verification-of-srilankan-and-bangladeshi-documents-required-from-3rd-of-november-onwards-in-vfs-new-delhi/384951');

// Studyinfo / Study in Finland (Finnish National Agency for Education)
export const FI_ADMISSIONS = gov("Study in Finland – Bachelor's and master's admissions", 'https://www.studyinfinland.fi/admissions/bachelors-and-masters-admissions');
export const FI_JOINT_2026 = gov('Study in Finland – Joint application 7–21 January 2026', 'https://www.studyinfinland.fi/news-events/January-2026-joint-application');
export const FI_FUNDING = gov('Study in Finland – Funding your studies (tuition fees and scholarships)', 'https://www.studyinfinland.fi/funding-your-studies');
export const FI_APP_FEE = gov('Studyinfo.fi – Application fee', 'https://studyinfo.fi/konfo/en/sivu/application-fee');

// Universities (their own pages)
export const FI_UH_FEES = uni('University of Helsinki – Tuition fees and scholarship programme', 'https://www.helsinki.fi/en/admissions-and-education/apply-bachelors-and-masters-programmes/tuition-fees-and-scholarship-programme');
export const FI_AALTO = uni('Aalto University', 'https://www.aalto.fi/en');
export const FI_LUT = uni('LUT University', 'https://www.lut.fi/en');
export const FI_TUNI = uni('Tampere University', 'https://www.tuni.fi/en');
export const FI_UH = uni('University of Helsinki', 'https://www.helsinki.fi/en');
export const FI_OULU = uni('University of Oulu', 'https://www.oulu.fi/en');
export const FI_UTU = uni('University of Turku', 'https://www.utu.fi/en');

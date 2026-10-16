import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Lithuania guide, each read on LT_READ.
 * Confidence (internal): high = the Migration Department under the Ministry
 * of the Interior (migracija.lrv.lt / Migris), the European Commission's EU
 * Immigration Portal page for Lithuania (built from the same Lithuanian
 * rules), and Study in Lithuania (the national study-promotion body under
 * the Ministry of Education, Science and Sport); medium = the universities'
 * own pages for their admission, tuition and migration guidance.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const LT_READ = '2026-10-16';

// Migration Department under the Ministry of the Interior (migracija.lrv.lt / Migris)
export const LT_MIGRIS_FEES = gov('Migration Department under the Ministry of the Interior – State fees for residence permits', 'https://migracija.lrv.lt/en/services/state-fees-for-services/residence-permits/');
export const LT_MIGRIS_SINCE2020 = gov('Migration Department under the Ministry of the Interior – Residence permits since 2020', 'https://migracija.lrv.lt/en/activities/identity-documents/residence-permits-documents/residence-permits-since-2020/');

// EU Immigration Portal, Lithuania page (European Commission, built from Lithuania's own rules)
export const LT_EU_PORTAL = gov('EU Immigration Portal – Student in Lithuania', 'https://home-affairs.ec.europa.eu/policies/migration-and-asylum/eu-immigration-portal/student-lithuania_en');

// Study in Lithuania (national study-promotion body, Ministry of Education, Science and Sport)
export const LT_STUDYIN_VISAS = gov('Study in Lithuania – Visas and Permits', 'https://studyin.lt/how-to-apply/visas-and-permits/');
export const LT_STUDYIN_FEES = gov('Study in Lithuania – Tuition Fees', 'https://studyin.lt/how-to-apply/tuition-fees/');
export const LT_STUDYIN_SCHOLARSHIPS = gov('Study in Lithuania – Scholarships', 'https://studyin.lt/scholarships/');

// Universities (their own pages)
export const LT_VU = uni('Vilnius University', 'https://www.vu.lt/en');
export const LT_VU_BACHELORS = uni("Vilnius University – Apply to Bachelor's Studies", 'https://www.vu.lt/en/admissions/admissions-to-bachelor-studies');
export const LT_VU_TUITION = uni('Vilnius University – Tuition Fees', 'https://www.vu.lt/en/students/services-for-students/finance/tuition-fees');
export const LT_KTU = uni('Kaunas University of Technology (KTU)', 'https://en.ktu.edu/');
export const LT_KTU_BACHELORS = uni("Kaunas University of Technology – Bachelor's and Integrated studies (Admissions)", 'https://admissions.ktu.edu/bachelor/');
export const LT_VMU = uni('Vytautas Magnus University (VMU)', 'https://www.vdu.lt/en/');
export const LT_VMU_DEGREE = uni('Vytautas Magnus University – Admission to Degree Studies', 'https://www.vdu.lt/en/studies/degree-studies/');
export const LT_VMU_TUITION = uni('Vytautas Magnus University – Tuition fees', 'https://www.vdu.lt/en/studies/degree-studies/tuition-fees/');
export const LT_ISM = uni('ISM University of Management and Economics', 'https://www.ism.lt/en');
export const LT_ISM_MIGRATION = uni('ISM University of Management and Economics – Migration (Temporary Residence Permit guide)', 'https://www.ism.lt/en/migration/');

import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Austria guide, built the same way as
 * hu-sources.ts / ch-sources.ts: every fact traces back to one of these.
 * Confidence (internal): high = the Migration Platform of the Austrian
 * Federal Government (migration.gv.at, run jointly by the Federal Ministry
 * of the Interior/BMI, the Federal Ministry for European and International
 * Affairs/BMEIA and the Federal Ministry of Labour and Social Affairs,
 * Health, Care and Consumer Protection/BMASGPK — the authorities behind
 * residence permits, visas and the Red-White-Red Card) and the Federal
 * Ministry of Women, Science and Research's own tuition-fee page
 * (bmfwf.gv.at); medium = OeAD-GmbH (oead.at, Austria's Agency for
 * Education and Internationalisation, financed by and acting on behalf of
 * the Federal Ministry of Women, Science and Research — the body that
 * explains the in-country residence-permit process and runs Austria's
 * scholarship/grant programmes, but is not itself the deciding residence
 * authority) and university admissions pages. Austria is an EU/EEA and
 * Schengen member, so this guide is built from Austria's own national
 * rules (which still apply fully to Bangladeshi, non-EU/EEA applicants) —
 * nothing is borrowed from another EU country's guide (e.g. Hungary's,
 * Switzerland's, the Netherlands', Ireland's or France's).
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const AT_READ = '2026-10-18';

// Migration Platform of the Austrian Federal Government (migration.gv.at) — BMI/BMEIA/BMASGPK
export const AT_MIGRATION_PERMANENT = gov('Migration.gv.at – Permanent immigration (general requirements for residence permits)', 'https://www.migration.gv.at/en/types-of-immigration/permanent-immigration/');
export const AT_MIGRATION_GRADUATES = gov('Migration.gv.at – Graduates of Austrian universities and universities of applied sciences', 'https://www.migration.gv.at/en/types-of-immigration/permanent-immigration/graduates/');
export const AT_MIGRATION_STUDENT_GUIDE = gov('Migration.gv.at – Guide to entry and residence requirements for foreign students (PDF)', 'https://www.migration.gv.at/fileadmin/downloads/infoblaetter/Leitfaden-Studi-engl.pdf');
export const AT_MIGRATION_RWR_PLUS = gov('Migration.gv.at – Red-White-Red Card plus', 'https://www.migration.gv.at/en/types-of-immigration/permanent-immigration/redwhiteredcardplus/');

// Federal Ministry of Women, Science and Research (bmfwf.gv.at)
export const AT_BMFWF_TUITION = gov('Federal Ministry of Women, Science and Research (BMFWF) – Tuition and course fees', 'https://www.bmfwf.gv.at/en/science/studying/tuition-fees.html');

// OeAD-GmbH (oead.at) — Austria's Agency for Education and Internationalisation
export const AT_OEAD_RESIDENCE_STUDENT = uni('OeAD – Residence permit – student (no mobility programme)', 'https://oead.at/en/to-austria/entry-and-residence/residence-permit-student-no-mobility-programme');
export const AT_OEAD_GRANTS_OVERVIEW = sch('OeAD – Overview: grants and scholarships', 'https://oead.at/en/study-research-teaching/overview-grants-and-scholarships');
export const AT_OEAD_PROGRAMMES_A_TO_Z = sch('OeAD – Our scholarships and funding programmes from A to Z', 'https://oead.at/en/the-oead/our-programmes-from-a-to-z');
export const AT_OEAD_ERNST_MACH = sch('OeAD – Ernst Mach Grant (worldwide / Fachhochschule / Follow-Up / ASEA-UNINET)', 'https://oead.at/en/to-austria/grants-and-scholarships/ernst-mach-grant/');

// University of Vienna (univie.ac.at)
export const AT_UNIVIE = uni('University of Vienna – Application and admission', 'https://studieren.univie.ac.at/en/admission-procedure/');
export const AT_UNIVIE_COUNTRY_SPECIFIC = uni('University of Vienna – Country-specific requirements for admission', 'https://studieren.univie.ac.at/en/admission/info-third-country-students/');

// TU Wien (tuwien.at)
export const AT_TUWIEN = uni('TU Wien – Admission', 'https://www.tuwien.at/en/studies/admission');
export const AT_TUWIEN_MASTERS = uni('TU Wien – Admission to Master’s Programmes', 'https://www.tuwien.at/en/studies/admission/masters-programmes');
export const AT_TUWIEN_OTHER_BACHELOR = uni('TU Wien – Admission with a Bachelor’s degree of another national or international university', 'https://www.tuwien.at/en/studies/admission/masters-programmes/other-inter-national-bachelors-degree');

// University of Innsbruck (uibk.ac.at)
export const AT_UIBK = uni('University of Innsbruck – Admission to Study Programmes', 'https://www.uibk.ac.at/en/admission-department/admission/');
export const AT_UIBK_THIRD_COUNTRIES = uni('University of Innsbruck – Information on third countries', 'https://www.uibk.ac.at/en/admission-department/admission/information-on-third-countries/');
export const AT_UIBK_DEADLINES = uni('University of Innsbruck – Application and admission deadlines', 'https://www.uibk.ac.at/en/admission-department/application-and-admission-deadlines/');

// TU Graz (tugraz.at)
export const AT_TUGRAZ_ADMISSION_PERIODS = uni('TU Graz – Admission Periods', 'https://www.tugraz.at/en/studying-and-teaching/studying-at-tu-graz/prospective-students/admission/admission-periods');
export const AT_TUGRAZ_OVERVIEW = uni('TU Graz – Overview of admission to degree programmes at TU Graz', 'https://www.tugraz.at/en/studying-and-teaching/studying-at-tu-graz/prospective-students/admission/overview-of-admission-to-degree-programmes-at-tu-graz');

// Johannes Kepler University Linz (jku.at)
export const AT_JKU_DEADLINES = uni('JKU Linz – Dates & Deadlines', 'https://www.jku.at/en/degree-programs/students/dates-deadlines/');
export const AT_JKU_INTL = uni('JKU Linz – International Students', 'https://www.jku.at/en/degree-programs/international-students/international-students/');

// QS World University Rankings 2027 (topuniversities.com)
export const AT_UNIVIE_QS = uni('QS World University Rankings 2027 – University of Vienna (topuniversities.com)', 'https://www.topuniversities.com/universities/university-vienna');
export const AT_TUWIEN_QS = uni('QS World University Rankings 2027 – Technische Universität Wien (topuniversities.com)', 'https://www.topuniversities.com/universities/technische-universitat-wien');
export const AT_UIBK_QS = uni('QS World University Rankings 2027 – Universität Innsbruck (topuniversities.com)', 'https://www.topuniversities.com/universities/universitat-innsbruck');
export const AT_TUGRAZ_QS = uni('QS World University Rankings 2027 – Graz University of Technology (topuniversities.com)', 'https://www.topuniversities.com/universities/graz-university-technology');
export const AT_JKU_QS = uni('QS World University Rankings 2027 – Johannes Kepler University Linz (topuniversities.com)', 'https://www.topuniversities.com/universities/johannes-kepler-university-linz');

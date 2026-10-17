import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Slovenia guide, each read on SI_READ.
 * Confidence (internal): high = the Ministry of the Interior's Infotujci
 * portal for third-country nationals (infotujci.si), the European
 * Commission's Migration and Home Affairs "Student in Slovenia" page (an
 * EU institutional summary of the same Slovenian rules), and the Public
 * Scholarship, Development, Disability and Maintenance Fund of the
 * Republic of Slovenia (srips-rs.si, which runs the Ad Futura scholarship
 * programme); medium = Study in Slovenia (studyinslovenia.si, the
 * government-backed national study-promotion portal run by CMEPIUS, a
 * public institution under the Ministry of Education) and universities'
 * own pages for admission and tuition.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const intergov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'intergovernmental' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const SI_READ = '2026-10-17';

// Ministry of the Interior — Infotujci (infotujci.si), third-country nationals
export const SI_INFOTUJCI_STUDY = gov('Ministry of the Interior – Temporary Residence Permit for the Purpose of Studies (infotujci.si)', 'https://infotujci.si/en/third-country-nationals/purposes-of-residence/purpose-of-residence-studies/');
export const SI_INFOTUJCI_JOBSEEKER = gov('Ministry of the Interior – Temporary Residence Permit for Students for the Purpose of Seeking Employment or Self-employment (infotujci.si)', 'https://infotujci.si/en/vsebina/drzavljani-izven-eu/temporary-residence-permit/based-on-studies/dovoljenje-za-zacasno-prebivanje-studentov-zaradi-iskanja-zaposlitve-ali-samozaposlitve/');

// European Commission — Migration and Home Affairs (an EU institutional summary of Slovenia's own rules)
export const SI_EC_STUDENT = intergov('European Commission, Migration and Home Affairs – Student in Slovenia', 'https://home-affairs.ec.europa.eu/policies/migration-and-asylum/eu-immigration-portal/student-slovenia_en');

// Study in Slovenia (studyinslovenia.si) — government-backed national study-promotion portal, run by CMEPIUS
export const SI_STUDYIN_VISA = gov('Study in Slovenia – Temporary Residence: International Students', 'https://studyinslovenia.si/live/visa-and-residence-permit/');
export const SI_STUDYIN_WORK = gov('Study in Slovenia – Working', 'https://studyinslovenia.si/live/working/');
export const SI_STUDYIN_HEALTH = gov('Study in Slovenia – Health Insurance', 'https://studyinslovenia.si/live/health-insurance/');
export const SI_STUDYIN_TUITION = gov('Study in Slovenia – Tuition and Funding', 'https://studyinslovenia.si/study/tuition-and-funding/');

// Public Scholarship, Development, Disability and Maintenance Fund of the Republic of Slovenia (srips-rs.si) — runs the Ad Futura programme
export const SI_SRIPS_ADFUTURA = gov('Public Scholarship, Development, Disability and Maintenance Fund of the Republic of Slovenia – Scholarships for Studies of Foreign Nationals in Slovenia (Ad Futura)', 'https://www.srips-rs.si/en/scholarships/ad-futura-scholarships/scholarships-for-studies-of-foreign-nationals-in-slovenia');

// Universities (their own pages)
export const SI_UL = uni('University of Ljubljana', 'https://www.uni-lj.si/en');
export const SI_UL_TUITION = uni('University of Ljubljana – Tuition Fees and Other Study Contributions', 'https://www.uni-lj.si/en/study/tuition-fees-and-other-study-contributions');
export const SI_UL_ENROLMENT = uni('University of Ljubljana – Call for Enrolment', 'https://www.uni-lj.si/en/study/bachelors-and-single-cycle-masters-study/call-for-enrolment');
export const SI_UM = uni('University of Maribor', 'https://www.um.si/en/home-page/');
export const SI_UM_ADMISSION = uni('University of Maribor – Admission Requirements for Foreign Citizens of Non-EU Member States 2026/2027', 'https://moja.um.si/en/future-students/SiteAssets/Strani/enrolment/Admission_req_non_EU_citizens_2026_27_Final_KM.pdf');
export const SI_UP = uni('University of Primorska', 'https://www.upr.si/en');
export const SI_UP_TUITION = uni('University of Primorska – Tuition Fees', 'https://www.upr.si/en/study--enrolment/529-tuition-fees/');
export const SI_UP_APPLY = uni('University of Primorska – Application & Enrolment (Welcome to University of Primorska)', 'https://welcome.upr.si/student/prepare/application-enrolment/');
export const SI_UNG = uni('University of Nova Gorica', 'https://ung.si/en/');
export const SI_UNG_FEES = uni('University of Nova Gorica – Fees', 'https://ung.si/en/education/fees/');

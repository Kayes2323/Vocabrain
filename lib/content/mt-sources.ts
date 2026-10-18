import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Malta guide, built the same way as
 * pl-sources.ts / my-sources.ts: every fact traces back to one of these.
 * Confidence (internal): high = Identità (identita.gov.mt / expatriates FAQ),
 * the Maltese government's own residence-permit agency (renamed from
 * "Identity Malta Agency"), whose Expatriates Unit issues the study
 * residence permit, and the ELT Council / Jobsplus pages on third-country
 * students working while studying; medium = the University of Malta's (UM)
 * own official pages (um.edu.mt), MCAST's own official pages (mcast.edu.mt),
 * and myscholarship.gov.mt (the Maltese government's own scholarships
 * portal). Malta is an EU/Schengen member state, and its visa, residence,
 * work-rights and post-study rules are read fresh from Malta's own official
 * pages — nothing is carried over from the EU guides built earlier this
 * session (Poland's, Lithuania's, the Czech Republic's, Slovenia's,
 * Hungary's, Austria's, Switzerland's, the Netherlands', Ireland's,
 * France's, Denmark's or Spain's) or from Malaysia's.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });
const rank = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'ranking-publisher' });

/** Read on this date; re-check within six months. */
export const MT_READ = '2026-10-18';

// Identità (Identity Malta Agency) — identita.gov.mt, Malta's own residence-permit authority
export const MT_IDENTITA_STUDY_FAQ = gov('Identità – Frequently Asked Questions: Expatriates / Non-EU Non-Employment / Study', 'https://identita.gov.mt/frequently-asked-questions/expatriates/non-eu-non-employment/study/');

// ELT Council — eltcouncil.gov.mt (English Language Teaching Council, a Maltese government body)
export const MT_ELTCOUNCIL_TCN_WORK = gov('ELT Council – Procedure for third-country students seeking employment in Malta (PDF)', 'https://eltcouncil.gov.mt/wp-content/uploads/2019/08/Procedure-for-TCN-Students-seeking-employment-in-Malta.pdf');

// MFHEA — Malta Further & Higher Education Authority, mfhea.mt
export const MT_MFHEA_OVERVIEW = gov('Malta Further & Higher Education Authority (MFHEA) – Overview', 'https://mfhea.mt/overview/');
export const MT_MFHEA_INSTITUTIONS = gov('MFHEA – Qualifications Recognition: list of licensed institutions', 'https://qualifications.mfhea.gov.mt/#/institutions');

// myscholarship.gov.mt — the Maltese government's own scholarships portal
export const MT_MYSCHOLARSHIP_HOME = gov('myscholarship.gov.mt – Welcome (Malta government scholarship schemes)', 'https://myscholarship.gov.mt/en/');

// University of Malta (UM) — um.edu.mt
export const MT_UM_FEES_NON_EU = uni('University of Malta – Tuition Fees payable by Non-EU & Non-EEA students (PDF)', 'https://www.um.edu.mt/__data/assets/pdf_file/0009/363186/FeesNonEUStudents.pdf');
export const MT_UM_TUITION_FEES = uni('University of Malta – Tuition Fees (International Office)', 'https://www.um.edu.mt/international/students/tuitionfees/');
export const MT_UM_ENGLISH = uni('University of Malta – English language requirements', 'https://www.um.edu.mt/international/students/englishlanguagerequirements/');
export const MT_UM_DATES_DEADLINES = uni('University of Malta – Dates and deadlines', 'https://www.um.edu.mt/study/datesanddeadlines/');
export const MT_UM_SCHOLARSHIPS = uni('University of Malta – Scholarships (International Office)', 'https://www.um.edu.mt/study/feesfunding/scholarships/');
export const MT_UM_DOCTORAL_SCHOLARSHIPS = uni('University of Malta – Doctoral School: Scholarships and Grants', 'https://www.um.edu.mt/doctoralschool/feesfunding/');
export const MT_UM_BANGLADESH = uni('University of Malta – Country-specific qualifications: Bangladesh', 'https://www.um.edu.mt/study/admissionsadvice/international/country-specificqualifications/bangladesh');

// MCAST — Malta College of Arts, Science and Technology, mcast.edu.mt
export const MT_MCAST_FEES_NON_EU = uni('MCAST – Fee & Payments for non-EU Candidates', 'https://mcast.edu.mt/fee-payments-for-non-eu-candidates/');

// QS World University Rankings 2027 (topuniversities.com)
export const MT_UM_QS = rank('QS World University Rankings 2027 – University of Malta (topuniversities.com)', 'https://www.topuniversities.com/universities/university-malta');
// MCAST was not found listed in the QS World University Rankings 2027 search — checked against the ranking's own university search.
export const MT_QS_SEARCH = rank('QS World University Rankings – university search (topuniversities.com)', 'https://www.topuniversities.com/university-rankings/world-university-rankings/2027');

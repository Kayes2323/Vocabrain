import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Latvia guide, built the same way as
 * mt-sources.ts / pl-sources.ts: every fact traces back to one of these.
 * Confidence (internal): high = PMLP (Pilsonības un migrācijas lietu
 * pārvalde / Office of Citizenship and Migration Affairs — OCMA), Latvia's
 * own residence-permit authority, and the Ministry of Foreign Affairs
 * (mfa.gov.lv / mfa.gov.lv's New Delhi mission, which has consular
 * territorial competence for Bangladesh); medium = each university's own
 * official pages (lu.lv, rtu.lv, apply.rtu.lv, rsu.lv) and the "Study in
 * Latvia" national portal (studyinlatvia.eu / studyinlatvia.lv), which is
 * run for the Latvian higher-education sector but is a promotional/
 * informational portal, not the legal authority itself — so its figures are
 * cross-checked against PMLP's and each university's own pages wherever
 * possible. Latvia is an EU/Schengen member state, and its visa, residence,
 * work-rights and post-study rules are read fresh from Latvia's own
 * official pages — nothing is carried over from the EU guides built earlier
 * this session (Poland's, Malta's, Lithuania's, the Czech Republic's,
 * Slovenia's, Hungary's, Austria's, Switzerland's, the Netherlands',
 * Ireland's, France's, Denmark's or Spain's) or from Malaysia's.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });
const rank = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'ranking-publisher' });

/** Read on this date; re-check within six months. */
export const LV_READ = '2026-10-18';

// PMLP (Pilsonības un migrācijas lietu pārvalde) — Latvia's own residence-permit authority, pmlp.gov.lv
export const LV_PMLP_RESIDENCE_HOWTO = gov('PMLP – Are you planning to obtain a residence permit to study? Find out how to do it!', 'https://www.pmlp.gov.lv/en/article/are-you-planning-obtain-residence-permit-study-find-out-how-do-it');
export const LV_PMLP_GENERAL_EDU_DOCS = gov('PMLP – Documents required: studying in an accredited general education institution', 'https://www.pmlp.gov.lv/en/studying-accredited-general-education-institution');

// Ministry of Foreign Affairs (mfa.gov.lv) — Latvia's own MFA, territorial competence for Bangladesh via the Embassy of Latvia in India
export const LV_MFA_BANGLADESH = gov('Embassy of Latvia in India – Bangladeshi nationals (students)', 'https://www2.mfa.gov.lv/en/newdelhi/consular-section/applying-for-a-long-stay-visa/students/bangladeshi-nationals');

// University of Latvia (Latvijas Universitāte, UL) — lu.lv
export const LV_UL_VISAS = uni('University of Latvia – Visas and Residence Permits (international students)', 'https://www.lu.lv/gribustudet/arzemju-studentiem-eng/degree/visas/');
export const LV_UL_DEGREE_STUDIES = uni('University of Latvia – Degree studies: admission steps, deadlines and fees', 'https://www.lu.lv/en/admissions/degree-studies/');
export const LV_UL_LANGUAGE = uni('University of Latvia – Language proficiency requirements', 'https://www.lu.lv/en/admission/for-international-students/degree/language-proficiency/');
export const LV_UL_LAW_PROGRAMME = uni('University of Latvia – Bachelor’s programme "Law": fees and places 2026/2027', 'https://www.lu.lv/en/studies/study-programmes-1/bachelors-study-programmes/law-1/');

// Riga Technical University (RTU) — rtu.lv / apply.rtu.lv (RTU's own application portal)
export const LV_RTU_SCHOLARSHIPS = uni('Riga Technical University – Scholarships (Latvian government scholarship)', 'https://www.rtu.lv/en/iad/Studies-3/scholarships');
export const LV_RTU_APPLY_PROGRAMMES = uni('RTU apply portal – English-taught programmes and tuition fees (apply.rtu.lv)', 'https://apply.rtu.lv/courses/search/id/876117-37mqd8');

// Rīga Stradiņš University (RSU) — rsu.lv
export const LV_RSU_TUITION = uni('Rīga Stradiņš University – Tuition Fees for Studies in English 2026/2027', 'https://www.rsu.lv/en/study-here/admissions/tuition-fees-studies-english');

// Study in Latvia — the national higher-education promotion portal (studyinlatvia.eu / studyinlatvia.lv)
export const LV_STUDYINLATVIA_FEES = gov('Study in Latvia – FAQ: Fees and costs', 'https://studyinlatvia.eu/faq/fees-and-costs');
export const LV_STUDYINLATVIA_WORK = gov('Study in Latvia – FAQ: Working in Latvia', 'https://studyinlatvia.eu/faq/working-in-latvia');
export const LV_STUDYINLATVIA_VISA = gov('Study in Latvia – FAQ: Visa and residence permit', 'https://studyinlatvia.eu/faq/visa-and-residence-permit');
export const LV_STUDYINLATVIA_SCHOLARSHIPS = gov('Study in Latvia – Scholarships (Latvian state scholarship)', 'https://studyinlatvia.lv/scholarships');
export const LV_STUDYINLATVIA_ELIGIBLE_COUNTRIES = gov('Study in Latvia – The list of eligible countries for the Latvian state scholarship (PDF)', 'https://cms.studyinlatvia.lv/storage/app/media/The%20list%20of%20eligible%20countries.pdf');

// QS World University Rankings 2027 (topuniversities.com)
export const LV_UL_QS = rank('QS World University Rankings 2027 – University of Latvia (topuniversities.com)', 'https://www.topuniversities.com/universities/university-latvia');
export const LV_RTU_QS = rank('QS World University Rankings 2027 – Riga Technical University (topuniversities.com)', 'https://www.topuniversities.com/universities/riga-technical-university');
// RSU was not found listed in the QS World University Rankings 2027 search — checked against the ranking's own university search.
export const LV_QS_SEARCH = rank('QS World University Rankings – university search (topuniversities.com)', 'https://www.topuniversities.com/university-rankings/world-university-rankings/2027');

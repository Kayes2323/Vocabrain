import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Poland guide, built the same way as
 * my-sources.ts / es-sources.ts: every fact traces back to one of these.
 * Confidence (internal): high = the Office for Foreigners (Urząd do Spraw
 * Cudzoziemców / UDSC, gov.pl/web/udsc-en) — Poland's national authority for
 * residence permits — and the Moduł Obsługi Spraw (MOS, the UDSC/Ministry of
 * Interior and Administration's own casework portal, mos.cudzoziemcy.gov.pl),
 * which between them set and explain the rules a consulate or Voivodeship
 * Office applies; Poland's own diplomatic-mission pages (gov.pl/web/india,
 * gov.pl/web/armenia-en, gov.pl/web/usa-en — the Ministry of Foreign Affairs'
 * own country-mission sites, used here because Bangladesh has no Polish
 * embassy handling visas and the Embassy of the Republic of Poland in New
 * Delhi is the mission of record); and NAWA, the Polish National Agency for
 * Academic Exchange (nawa.gov.pl), a state agency under the Ministry of
 * Science and Higher Education that administers Poland's own government
 * scholarships for international students. medium = study.gov.pl ("Study in
 * Poland", a .gov.pl portal run with NAWA and Polish higher-education
 * institutions) and university admissions/fee pages. Poland is an EU/
 * Schengen member, and its visa, work-rights and post-study rules are read
 * fresh from Poland's own official pages — nothing is carried over from the
 * other EU guides built earlier this session (Spain's, Denmark's, Austria's,
 * Hungary's, Switzerland's, the Netherlands', Ireland's, France's,
 * Slovenia's, the Czech Republic's or Lithuania's) or from Malaysia's.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const PL_READ = '2026-10-18';

// Office for Foreigners (Urząd do Spraw Cudzoziemców / UDSC) — gov.pl/web/udsc-en
export const PL_UDSC_WORK_STUDENT = gov('Office for Foreigners (UDSC) – Work Student', 'https://www.gov.pl/web/udsc-en/work-student');
export const PL_UDSC_GRADUATE_PERMIT = gov('Office for Foreigners (UDSC) – Permit for temporary residence – graduate', 'https://www.gov.pl/web/udsc-en/permit-for-temporary-residence--graduate');

// Moduł Obsługi Spraw (MOS) — the UDSC/Ministry of Interior and Administration's own casework portal, mos.cudzoziemcy.gov.pl
export const PL_MOS_WORK_WITHOUT_PERMIT = gov('Moduł Obsługi Spraw (MOS) – Performing work without a work permit', 'https://www.mos.cudzoziemcy.gov.pl/en/categories-information/doing-the-job/performing-work-without-a-work-permit/');
export const PL_MOS_STUDY_PERMIT = gov('Moduł Obsługi Spraw (MOS) – Permit – Studies', 'https://mos.cudzoziemcy.gov.pl/en/categories-information/possibilities-legalization/non-eu-continued-stay/permit-temporary/study/permit-studies/');

// Poland's own diplomatic-mission pages (Ministry of Foreign Affairs, gov.pl)
export const PL_MFA_INDIA_D_VISA = gov('Embassy of the Republic of Poland in New Delhi – D-Type national visa (covers Bangladesh)', 'https://www.gov.pl/web/india/d-type-national-visa');
export const PL_MFA_ARMENIA_FUNDS = gov('Poland in Armenia – Financial resources required from the foreigner to enter Poland (D-type visa, nationwide regulation)', 'https://www.gov.pl/web/armenia-en/financial-resources-required-from-the-foreigner-to-enter-poland-on-the-basis-of-d-type-national-visa');
export const PL_MFA_USA_D_VISA = gov('Poland in US – D-Type national visa (document checklist)', 'https://www.gov.pl/web/usa-en/d-type-national-visa');

// NAWA – Polish National Agency for Academic Exchange (nawa.gov.pl)
export const PL_NAWA_BANACH = sch('NAWA – The Banach NAWA Scholarship Programme', 'https://nawa.gov.pl/en/students/foreign-students/the-banach-scholarship-programme');

// study.gov.pl – "Study in Poland" (gov.pl portal, run with NAWA and Polish higher-education institutions)
export const PL_STUDY_GOV_VISA = gov('Study in Poland (study.gov.pl) – Visa & Application', 'https://study.gov.pl/visa-application');
export const PL_STUDY_GOV_BANACH = sch('Study in Poland (study.gov.pl) – Banach NAWA Programme (full eligible-country list)', 'https://study.gov.pl/stefan-banach-nawa-programme');

// University of Warsaw (UW) — rekrutacja.uw.edu.pl
export const PL_UW_FEES = uni('University of Warsaw – Application and tuition fees', 'https://rekrutacja.uw.edu.pl/en/application-and-tuition-fees/');
export const PL_UW_FEES_2026 = uni('University of Warsaw – Tuition fees in the academic year 2026/2027 (PDF)', 'https://rekrutacja.uw.edu.pl/files/pdf/tuition_fees_2026-2027_05.10.2026.pdf');

// Jagiellonian University (UJ), Kraków — welcome.uj.edu.pl
export const PL_UJ_FEES = uni('Jagiellonian University – Fees', 'https://welcome.uj.edu.pl/en_GB/admission/fees');
export const PL_UJ_ISAD_FEES = uni('Jagiellonian University – International Studies in Architecture and Design (ISAD) – Fees and Financial Aid', 'https://isad.uj.edu.pl/prospective-students/fees');

// Warsaw University of Technology (WUT/PW) — students.pw.edu.pl
export const PL_WUT_BSC_OFFER = uni('Warsaw University of Technology – B.Sc. offer (international tuition fees)', 'https://www.students.pw.edu.pl/Studies-Offer/B.Sc.-offer');
export const PL_WUT_MSC_OFFER = uni('Warsaw University of Technology – M.Sc. offer (international tuition fees)', 'https://www.students.pw.edu.pl/Studies-Offer/M.Sc.-offer');
export const PL_WUT_HOW_TO_APPLY = uni('Warsaw University of Technology – How to Apply', 'https://www.students.pw.edu.pl/How-to-Apply');
export const PL_WUT_ADMISSION_BSC = uni('Warsaw University of Technology – Admission to B.Sc.', 'https://www.students.pw.edu.pl/How-to-Apply/Admission-to-B.Sc');
export const PL_WUT_ENGLISH = uni('Warsaw University of Technology – English Proficiency (application glossary)', 'https://www.students.pw.edu.pl/Resources/Application-Glossary/English-Proficiency');

// AGH University of Krakow — international.agh.edu.pl
export const PL_AGH_FEES = uni('AGH University of Krakow – Fees', 'https://www.international.agh.edu.pl/en/studies/fees');
export const PL_AGH_DOCS_BACHELOR = uni('AGH University of Krakow – Required documents (Bachelor)', 'https://www.international.agh.edu.pl/en/studies/recruitment/required-documents-bachelor');
export const PL_AGH_DOCS_MASTER = uni('AGH University of Krakow – Required documents (Master)', 'https://www.international.agh.edu.pl/en/studies/recruitment/required-documents-master');

// Adam Mickiewicz University (AMU), Poznań — amu.edu.pl
export const PL_AMU_TUITION = uni('Adam Mickiewicz University, Poznań – Tuition Fees', 'https://amu.edu.pl/en/admissions/tuition-fees');
export const PL_AMU_QA = uni('Adam Mickiewicz University, Poznań – Recruitment Q&A', 'https://amu.edu.pl/en/admissions/recruitment-q-and-a');

// QS World University Rankings 2027 (topuniversities.com)
export const PL_UW_QS = uni('QS World University Rankings 2027 – University of Warsaw (topuniversities.com)', 'https://www.topuniversities.com/universities/university-warsaw');
export const PL_UJ_QS = uni('QS World University Rankings 2027 – Jagiellonian University (topuniversities.com)', 'https://www.topuniversities.com/universities/jagiellonian-university');
export const PL_WUT_QS = uni('QS World University Rankings 2027 – Warsaw University of Technology (topuniversities.com)', 'https://www.topuniversities.com/universities/warsaw-university-technology');
export const PL_AGH_QS = uni('QS World University Rankings 2027 – AGH University of Krakow (topuniversities.com)', 'https://www.topuniversities.com/universities/agh-university-krakow');
export const PL_AMU_QS = uni('QS World University Rankings 2027 – Adam Mickiewicz University, Poznań (topuniversities.com)', 'https://www.topuniversities.com/universities/adam-mickiewicz-university-poznan');

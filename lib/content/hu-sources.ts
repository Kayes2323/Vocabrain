import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Hungary guide, built the same way as
 * ch-sources.ts / nl-sources.ts / ie-sources.ts / fr-sources.ts /
 * si-sources.ts / cz-sources.ts / lt-sources.ts: every fact traces back to
 * one of these. Confidence (internal): high = the National Directorate-
 * General for Aliens Policing (NDGAP, known by its Hungarian acronym OIF,
 * oif.gov.hu — the national immigration authority for residence permits
 * including the study-purpose permit, the D-type visa and the post-study
 * job-seeking permit) and the Stipendium Hungaricum Scholarship Programme's
 * own site (stipendiumhungaricum.hu, run by Tempus Public Foundation on
 * behalf of the Hungarian Ministry of Foreign Affairs and Trade); medium =
 * the government-backed "Study in Hungary" portal (studyinhungary.hu, also
 * run by Tempus Public Foundation) and university admissions/fee pages.
 * Hungary is an EU/EEA and Schengen member, so this guide is built from
 * Hungary's own national rules (which still apply fully to Bangladeshi,
 * non-EU/EEA applicants) — nothing is borrowed from another EU country's
 * guide (e.g. Czech Republic's, Slovenia's, France's, Ireland's, the
 * Netherlands' or Lithuania's).
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const HU_READ = '2026-10-18';

// OIF / NDGAP (oif.gov.hu) — National Directorate-General for Aliens Policing: residence permits, D-type visa, work rights, post-study
export const HU_OIF_STUDENT_PERMIT = gov('OIF (NDGAP) – Residence of the student, pupil: Residence Permit for the Purpose of Studies', 'https://oif.gov.hu/factsheets/residence-of-the-student-pupil');
export const HU_OIF_D_VISA_PICKUP = gov('OIF (NDGAP) – "D" type visa: picking up the first residence permit', 'https://oif.gov.hu/factsheets/d-type-visa-picking-up-the-first-residence-permit');
export const HU_OIF_JOBSEEKING_PERMIT = gov('OIF (NDGAP) – Residence permit for the purpose of seeking a job or starting a business', 'https://oif.gov.hu/factsheets/residence-permit-for-the-purpose-of-seeking-a-job-or-starting-a-business');
export const HU_OIF_PROCEDURAL_FEES = gov('OIF (NDGAP) – Procedural fees', 'https://oif.gov.hu/factsheets/procedural-fees');

// Study in Hungary (studyinhungary.hu) — Tempus Public Foundation's government-backed study-promotion portal
export const HU_SIH_VISA = uni('Study in Hungary – Visa', 'https://studyinhungary.hu/living-in-hungary/menu/formalities/visa.html');
export const HU_SIH_HEALTH = uni('Study in Hungary – Health care and Insurance', 'https://studyinhungary.hu/living-in-hungary/menu/formalities/health-care-and-insurance.html');
export const HU_SIH_TUITION = uni('Study in Hungary – Tuition Fees and Funding Options', 'https://studyinhungary.hu/study-in-hungary/menu/studying-in-hungary/tuition-fees-and-funding-options.html');

// Stipendium Hungaricum (stipendiumhungaricum.hu) — Tempus Public Foundation, on behalf of the Ministry of Foreign Affairs and Trade
export const HU_SH_APPLY = sch('Stipendium Hungaricum – Apply for Scholarship', 'https://stipendiumhungaricum.hu/apply/');
export const HU_SH_PARTNERS = sch('Stipendium Hungaricum – Partners (Sending Partner list, incl. Bangladesh)', 'https://stipendiumhungaricum.hu/partners/');
export const HU_SH_CALL_BA_MA_OTM = sch(
  'Stipendium Hungaricum – Call for Applications 2026/2027 (bachelor’s, master’s, one-tier master’s, non-degree & postgraduate specialist training) (PDF)',
  'https://stipendiumhungaricum.hu/wp-content/uploads/2025/10/BA_MA_OTM_Call_for_Applications_2026_27.pdf',
);

// University of Debrecen (edu.unideb.hu)
export const HU_DEBRECEN = uni('University of Debrecen', 'https://edu.unideb.hu/');
export const HU_DEBRECEN_ADMISSION = uni('University of Debrecen – Application and admission', 'https://edu.unideb.hu/p/application-and-admission');
export const HU_DEBRECEN_FEES = uni('University of Debrecen – Tuition Fee, Application + Entrance fee', 'https://edu.unideb.hu/p/tuition-fee-application-entrance-fee');

// Budapest University of Technology and Economics (BME)
export const HU_BME = uni('Budapest University of Technology and Economics (BME)', 'https://www.bme.hu/en/application_and_admission');
export const HU_BME_ADMISSION = uni('BME Xplore – Admission', 'https://xplore.bme.hu/admission/');
export const HU_BME_TUITION = uni('BME Xplore – Tuition fees (2026/27)', 'https://xplore.bme.hu/tuition-fees/');

// Eötvös Loránd University (ELTE)
export const HU_ELTE = uni('Eötvös Loránd University (ELTE)', 'https://www.elte.hu/en/how-to-apply');
export const HU_ELTE_SCIENCE_FEE = uni('ELTE Faculty of Science – Application & Registration fee', 'https://ttk.elte.hu/en/application-registration-fee');

// Semmelweis University
export const HU_SEMMELWEIS = uni('Semmelweis University', 'https://semmelweis.hu/admission/programs/medicine/');
export const HU_SEMMELWEIS_FEES = uni('Semmelweis University (CTM) – Fees and costs of the application and enrollment procedure', 'https://semmelweis.hu/admission/2025/04/16/fees-and-costs-of-the-application-and-enrollment-procedure-5/');

// QS World University Rankings 2027 (topuniversities.com)
export const HU_ELTE_QS = uni('QS World University Rankings 2027 – Eötvös Loránd University (topuniversities.com)', 'https://www.topuniversities.com/universities/eotvos-lorand-university');
export const HU_BME_QS = uni('QS World University Rankings 2027 – Budapest University of Technology and Economics (topuniversities.com)', 'https://www.topuniversities.com/universities/budapest-university-technology-economics');
export const HU_SEMMELWEIS_QS = uni('QS Rankings profile – Semmelweis University (QS WUR by Subject 2026; not in the 2027 overall QS World University Rankings) (topuniversities.com)', 'https://www.topuniversities.com/universities/semmelweis-university');
export const HU_DEBRECEN_QS = uni('QS World University Rankings 2027 – University of Debrecen (topuniversities.com)', 'https://www.topuniversities.com/universities/university-debrecen');

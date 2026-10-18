import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Switzerland guide, each read on CH_READ. Built the
 * same way as nl-sources.ts / ie-sources.ts / fr-sources.ts / si-sources.ts /
 * cz-sources.ts / lt-sources.ts: every fact traces back to one of these.
 * Confidence (internal): high = the State Secretariat for Migration (SEM,
 * sem.admin.ch — the federal authority for visas and residence permits), the
 * Federal Department of Foreign Affairs' Embassy of Switzerland in
 * Bangladesh (schweiz-bangladesch.eda.admin.ch, the Swiss diplomatic mission
 * that handles visa applications from Bangladesh), the Federal Office of
 * Public Health (bag.admin.ch, mandatory health insurance) and the State
 * Secretariat for Education, Research and Innovation / Federal Commission
 * for Scholarships for Foreign Students (sbfi.admin.ch, Swiss Government
 * Excellence Scholarships); medium = university admissions and fee pages.
 * Switzerland is not an EU/EEA member (though it is in the Schengen area),
 * so its own federal and cantonal rules are used throughout — nothing is
 * borrowed from Germany's, France's or any other EU country's guide.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const CH_READ = '2026-10-18';

// SEM (sem.admin.ch) — State Secretariat for Migration: work rights, post-study job search, entry/visa
export const CH_SEM_WORK_FAQ = gov('SEM – FAQ: Working (non-EU/EFTA students; after-graduation job search)', 'https://www.sem.admin.ch/sem/en/home/themen/arbeit/faq.html');
export const CH_SEM_ENTRY_FAQ = gov('SEM – FAQ: Entry', 'https://www.sem.admin.ch/sem/en/home/themen/einreise/faq.html');
export const CH_SEM_CANTONAL_AUTHORITIES = gov('SEM – Cantonal immigration and labour market authorities', 'https://www.sem.admin.ch/sem/en/home/sem/kontakt/kantonale_behoerden/adressen_kantone_und.html');

// Embassy of Switzerland in Bangladesh (Dhaka) — the Swiss representation that handles visas from Bangladesh
export const CH_EDA_BD_EMBASSY = gov('Embassy of Switzerland in Bangladesh', 'https://www.schweiz-bangladesch.eda.admin.ch/en/embassy-of-switzerland');
export const CH_EDA_BD_VISA_ENTRY = gov('Embassy of Switzerland in Bangladesh – Visa and entry to Switzerland', 'https://www.schweiz-bangladesch.eda.admin.ch/en/visa-and-entry-to-switzerland');
export const CH_EDA_BD_PROCESS = gov('Embassy of Switzerland in Bangladesh – Process for visa application', 'https://www.schweiz-bangladesch.eda.admin.ch/en/process-for-visa-application');
export const CH_EDA_BD_STUDENT_VISA_CHECKLIST = gov(
  'Embassy of Switzerland in Bangladesh – Checklist for Student Visa (National/Visa D) for Switzerland and Liechtenstein',
  'https://www.schweiz-bangladesch.eda.admin.ch/dam/en/eda-cms/nXPJg5CPJo7H/Student-visa-requirements_EN.pdf',
);
export const CH_EDA_NATIONAL_VISA_DOCS = gov('EDA – Which documents should I submit with a national visa application? (Visa D Study leaflet)', 'https://www.schweiz-kanada.eda.admin.ch/en/documents-national-visa');

// Federal Office of Public Health (bag.admin.ch) — mandatory health insurance
export const CH_BAG_HEALTH_INSURANCE = gov('Federal Office of Public Health (BAG) – Requirement to obtain health insurance for persons resident in Switzerland', 'https://www.bag.admin.ch/en/health-insurance-requirement-to-obtain-insurance-for-persons-resident-in-switzerland');

// SBFI / Federal Commission for Scholarships for Foreign Students (FCS/ESKAS) — Swiss Government Excellence Scholarships
export const CH_SBFI_SGS = sch('SBFI – Swiss Government Excellence Scholarships 2027–2028', 'https://www.sbfi.admin.ch/en/swiss-government-excellence-scholarships');
export const CH_SBFI_SGS_GLANCE = sch('SBFI – Swiss Government Excellence Scholarships at a Glance', 'https://www.sbfi.admin.ch/en/swiss-government-excellence-scholarships-at-a-glance');
export const CH_SBFI_SGS_ASIA_LIST = sch('SBFI – A-Z list of countries and territories: Asia (incl. Bangladesh/Embassy of Switzerland in Bangladesh)', 'https://www.sbfi.admin.ch/dam/en/sd-web/ETBRLVHEDk7K/2026-08-04_Asia_List_of_countries_and_territories_complete.pdf');

// ETH Zurich
export const CH_ETHZ = uni('ETH Zurich', 'https://ethz.ch/en.html');
export const CH_ETHZ_TUITION = uni('ETH Zurich – Tuition fees', 'https://ethz.ch/students/en/studies/financial/tuition-fees.html');
export const CH_ETHZ_FEES_PDF = uni('ETH Zurich – Tuition, semester and other fees (PDF)', 'https://ethz.ch/content/dam/ethz/main/education/finanzielles/files-en/tuition-fees.pdf');
export const CH_ETHZ_BACHELOR_APPLY = uni('ETH Zurich – Application process (non-Swiss matriculation certificate)', 'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/how-to-apply.html');
export const CH_ETHZ_BACHELOR_DATES = uni('ETH Zurich – Dates Autumn Semester 2026 & 2027 (non-Swiss matriculation certificate)', 'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/dates.html');
export const CH_ETHZ_JOBSEEKING = uni('ETH Zurich – Residence permit after graduation for job seeking purposes', 'https://ethz.ch/en/studies/international/end-studies/residence-permit-job-seeking.html');

// EPFL
export const CH_EPFL = uni('EPFL – École polytechnique fédérale de Lausanne', 'https://www.epfl.ch/en/home/');
export const CH_EPFL_TUITION = uni('EPFL – Tuition fee and other fees', 'https://www.epfl.ch/education/studies/en/rules-and-procedures/study-taxes/tuition-fee-other-fees/');
export const CH_EPFL_BACHELOR_ADMISSION = uni('EPFL – Bachelor/CMS admission criteria & application', 'https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application/');
export const CH_EPFL_MASTER_ADMISSION = uni('EPFL – Master admission criteria & application', 'https://www.epfl.ch/education/admission/admission-2/master-admission-criteria-application/');
export const CH_EPFL_MASTER_ONLINE_APPLY = uni('EPFL – Online application (Master, fees, deadlines)', 'https://www.epfl.ch/education/admission/admission-2/master-admission-criteria-application/online-application/');

// University of Zurich (UZH)
export const CH_UZH = uni('University of Zurich', 'https://www.uzh.ch/en.html');
export const CH_UZH_FEES = uni('University of Zurich – Fees and Contributions', 'https://www.uzh.ch/en/studies/application/fees.html');
export const CH_UZH_BACHELOR_ADMISSION = uni('University of Zurich – Admission to a Bachelor’s Program', 'https://www.uzh.ch/en/studies/application/bachelor.html');
export const CH_UZH_MASTER_ADMISSION = uni('University of Zurich – Admission to the Master’s Program', 'https://www.uzh.ch/en/studies/application/master.html');
export const CH_UZH_LANGUAGE_REQUIREMENTS = uni('University of Zurich – Language Requirements', 'https://www.uzh.ch/en/studies/application/languagerequirements.html');

// University of Geneva (UNIGE)
export const CH_UNIGE = uni('University of Geneva', 'https://www.unige.ch/en/university/presentation/');
export const CH_UNIGE_FEES = uni('University of Geneva – Tuition fees (register at UNIGE)', 'https://www.unige.ch/immatriculations/en/informations/fees');

// QS World University Rankings 2027 (topuniversities.com)
export const CH_ETHZ_QS = uni('QS World University Rankings 2027 – ETH Zurich (topuniversities.com)', 'https://www.topuniversities.com/universities/eth-zurich');
export const CH_EPFL_QS = uni('QS World University Rankings 2027 – EPFL (topuniversities.com)', 'https://www.topuniversities.com/universities/epfl-ecole-polytechnique-federale-de-lausanne');
export const CH_UZH_QS = uni('QS World University Rankings 2027 – University of Zurich (topuniversities.com)', 'https://www.topuniversities.com/universities/university-zurich');
export const CH_UNIGE_QS = uni('QS World University Rankings 2027 – University of Geneva (topuniversities.com)', 'https://www.topuniversities.com/universities/university-geneva');

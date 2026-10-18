import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Netherlands guide, each read on NL_READ. Built the
 * same way as ie-sources.ts/fr-sources.ts/si-sources.ts/cz-sources.ts/lt-sources.ts:
 * every fact traces back to one of these. Confidence (internal): high = the
 * Immigration and Naturalisation Service (IND, ind.nl — the Ministry of
 * Justice and Security's agency for residence permits and visas), the
 * Ministry of Foreign Affairs' Netherlands Worldwide portal
 * (netherlandsworldwide.nl, for the MVV application from Bangladesh) and the
 * Netherlands Labour Authority (nllabourauthority.nl, part of the Ministry of
 * Social Affairs and Employment, for work-permit rules); medium = Study in NL
 * (studyinnl.org), the Dutch government-backed study-abroad promotion site run
 * by Nuffic, and university pages for admission, fees and English requirements.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const agency = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const NL_READ = '2026-10-17';

// IND (ind.nl) — residence permits, visas, income requirements, orientation year, fees
export const NL_IND_MVV = gov('IND – Provisional residence permit (MVV)', 'https://ind.nl/en/provisional-residence-permit-mvv');
export const NL_IND_STUDY_PERMIT = gov('IND – Student residence permit for university or higher professional education', 'https://ind.nl/en/residence-permits/study/student-residence-permit-for-university-or-higher-professional-education');
export const NL_IND_ORIENTATION_YEAR = gov('IND – Residence permit for orientation year', 'https://ind.nl/en/residence-permits/work/residence-permit-for-orientation-year');
export const NL_IND_BACKGROUND = gov('IND – International students and the IND', 'https://ind.nl/en/about-us/background-articles/international-students-and-the-ind');
export const NL_IND_INCOME_STUDY = gov('IND – Income requirements study', 'https://ind.nl/en/income-requirements-study');
export const NL_IND_REQUIRED_AMOUNTS = gov('IND – Required amounts income requirements', 'https://ind.nl/en/required-amounts-income-requirements');
export const NL_IND_FEES = gov('IND – Fees: costs of an application', 'https://ind.nl/en/fees-costs-of-an-application');

// Netherlands Worldwide (Ministry of Foreign Affairs) — MVV application from Bangladesh
export const NL_WORLDWIDE_MVV_BD = gov('Netherlands Worldwide – Applying for an MVV visa sticker for the Netherlands in Bangladesh', 'https://www.netherlandsworldwide.nl/visa-the-netherlands/mvv-long-stay/apply-bangladesh');

// Netherlands Labour Authority (Ministry of Social Affairs and Employment) — work rights
export const NL_LABOUR_FOREIGN_STUDENTS = agency('Netherlands Labour Authority – Foreign students', 'https://www.nllabourauthority.nl/topics/foreign-nationals-employment-act/foreign-students');

// Study in NL (studyinnl.org, run by Nuffic) — visa, tuition, scholarship and health-insurance guidance
export const NL_STUDYINNL_VISA = agency('Study in NL – Do you need a visa?', 'https://www.studyinnl.org/plan-your-stay/do-you-need-a-visa');
export const NL_STUDYINNL_TUITION = agency('Study in NL – Tuition fees', 'https://www.studyinnl.org/finances/tuition-fees');
export const NL_STUDYINNL_SCHOLARSHIP = sch('Study in NL – NL Scholarship', 'https://www.studyinnl.org/finances/nl-scholarship');
export const NL_STUDYINNL_HEALTHCARE = agency('Study in NL – Healthcare insurance', 'https://www.studyinnl.org/plan-your-stay/healthcare-insurance');

// University of Amsterdam
export const NL_UVA = uni('University of Amsterdam', 'https://www.uva.nl/');
export const NL_UVA_TUITION = uni('University of Amsterdam – Tuition fees', 'https://www.uva.nl/en/education/fees-and-funding/tuition-fees/tuition-fees.html');
export const NL_UVA_BACHELOR_APPLY = uni('University of Amsterdam – Applying for a Bachelor’s programme', 'https://www.uva.nl/en/education/admissions/bachelors/applying-for-a-bachelors-programme.html');

// Delft University of Technology (TU Delft)
export const NL_TUDELFT = uni('Delft University of Technology', 'https://www.tudelft.nl/en');
export const NL_TUDELFT_TUITION = uni('TU Delft – Tuition Fee & Finances', 'https://www.tudelft.nl/en/education/study-programme-orientation/practical-matters/tuition-fee-finances');
export const NL_TUDELFT_BSC_INTL_ADMISSION = uni('TU Delft – BSc International, admission requirements', 'https://www.tudelft.nl/en/education/admission-and-application/bsc-international-diploma/1-admission-requirements/');

// Utrecht University
export const NL_UU = uni('Utrecht University', 'https://www.uu.nl/en');
export const NL_UU_BACHELOR_TUITION = uni('Utrecht University – Tuition fees (Bachelor’s)', 'https://www.uu.nl/en/bachelors/general-information/how-to-apply/fees/tuition-fees');
export const NL_UU_MASTER_TUITION = uni('Utrecht University – Tuition Fees (Master’s)', 'https://www.uu.nl/en/masters/general-information/application-and-admission/fees/tuition-fees');
export const NL_UU_BACHELOR_APPLY_EXAMPLE = uni('Utrecht University – Application and admission, Economics and Business Economics (example)', 'https://www.uu.nl/en/bachelors/economics-and-business-economics/application-and-admission');

// Leiden University
export const NL_LEIDEN = uni('Leiden University', 'https://www.universiteitleiden.nl/en');
export const NL_LEIDEN_BACHELOR_TUITION = uni('Leiden University – Tuition fee (Bachelor’s)', 'https://www.universiteitleiden.nl/en/education/admission-and-application/bachelors/tuition-fee');
export const NL_LEIDEN_MASTER_TUITION = uni('Leiden University – Tuition fee (Master’s)', 'https://www.universiteitleiden.nl/en/education/admission-and-application/masters/tuition-fee');
export const NL_LEIDEN_BACHELOR_APPLY = uni('Leiden University – Application procedure (Bachelor’s)', 'https://www.universiteitleiden.nl/en/education/admission-and-application/bachelors/application-procedure');
export const NL_LEIDEN_BACHELOR_DEADLINES = uni('Leiden University – Application deadlines (Bachelor’s)', 'https://www.universiteitleiden.nl/en/education/admission-and-application/bachelors/application-deadlines');
export const NL_LEIDEN_MASTER_DEADLINES = uni('Leiden University – Application deadlines (Master’s)', 'https://www.universiteitleiden.nl/en/education/admission-and-application/masters/application-deadlines');

// Erasmus University Rotterdam
export const NL_EUR = uni('Erasmus University Rotterdam', 'https://www.eur.nl/en');
export const NL_EUR_TUITION = uni('Erasmus University Rotterdam – Tuition fee 2026-2027', 'https://www.eur.nl/en/education/practical-matters/registration/tuition-fee/tuition-fee-2026-2027');
export const NL_EUR_APPLICATION_FEE = uni('Erasmus University Rotterdam – Application fee', 'https://www.eur.nl/en/education/practical-matters/registration/application-fee');
export const NL_EUR_IBEB_APPLY = uni('Erasmus University Rotterdam – International Bachelor Economics and Business Economics, Application (example)', 'https://www.eur.nl/en/bachelor/international-bachelor-economics-and-business-economics/application');

// QS World University Rankings 2027 (topuniversities.com)
export const NL_UVA_QS = uni('QS World University Rankings 2027 – University of Amsterdam (topuniversities.com)', 'https://www.topuniversities.com/universities/university-amsterdam');
export const NL_TUDELFT_QS = uni('QS World University Rankings 2027 – Delft University of Technology (topuniversities.com)', 'https://www.topuniversities.com/universities/delft-university-technology');
export const NL_UU_QS = uni('QS World University Rankings 2027 – Utrecht University (topuniversities.com)', 'https://www.topuniversities.com/universities/utrecht-university');
export const NL_LEIDEN_QS = uni('QS World University Rankings 2027 – Leiden University (topuniversities.com)', 'https://www.topuniversities.com/universities/leiden-university');
export const NL_EUR_QS = uni('QS World University Rankings 2027 – Erasmus University Rotterdam (topuniversities.com)', 'https://www.topuniversities.com/universities/erasmus-university-rotterdam');

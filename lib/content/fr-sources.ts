import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the France guide, each read on FR_READ. Built the same
 * way as si-sources.ts/cz-sources.ts: every fact traces back to one of these.
 * Confidence (internal): high = French government sources — service-public.fr /
 * the Ministry of the Interior (work rights, residence permits), the French
 * government's own online-procedure portals (demarche.numerique.gouv.fr,
 * administration-etrangers-en-france.interieur.gouv.fr), France-Visas (the
 * official visa portal) and the French Embassy in Bangladesh (bd.ambafrance.org);
 * medium = Campus France (campusfrance.org / bangladesh.campusfrance.org), the
 * official national agency for studying in France under the French Ministries
 * for Europe and Foreign Affairs and for Higher Education, and university pages
 * for admission and tuition.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const agency = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const FR_READ = '2026-10-17';

// service-public.fr / Ministry of the Interior — work rights and visas
export const FR_SP_WORK = gov('service-public.fr – Can a non-European student work in France?', 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2713?lang=en');
export const FR_SP_VISA = gov('service-public.fr – Long-stay visa as a residence permit (VLS-TS)', 'https://www.service-public.fr/particuliers/vosdroits/F2231');

// France's online immigration procedure portals (Ministry of the Interior)
export const FR_VALIDATE_VLS = gov('administration-etrangers-en-france.interieur.gouv.fr – Validate your VLS-TS visa on arrival', 'https://administration-etrangers-en-france.interieur.gouv.fr/');
export const FR_APS_BILATERAL = gov('demarche.numerique.gouv.fr – Demande d’autorisation provisoire de séjour pour fin d’études et recherche d’emploi (bilateral-agreement nationalities)', 'https://demarche.numerique.gouv.fr/commencer/apsfinetudes');
export const FR_RECE_GENERAL = gov('demarche.numerique.gouv.fr – Demande de titre de séjour "recherche d’emploi ou création d’entreprise" (RECE)', 'https://demarche.numerique.gouv.fr/commencer/rece1235');

// France-Visas — the official visa portal
export const FR_VISAS_PORTAL = gov('France-Visas – official visa portal', 'https://france-visas.gouv.fr/');

// Campus France — the national agency for studying in France
export const FR_CF_VLSTS = agency('Campus France – Long Stay Visa valid as Residence Permit (VLS-TS "Étudiant")', 'https://www.campusfrance.org/en/student-long-stay-visa');
export const FR_CF_EEF_COUNTRIES = agency('Campus France – Which countries are affected by the "Études en France" procedure?', 'https://www.campusfrance.org/en/faq/which-countries-are-affected-by-the-etudes-en-france-studying-in-france-procedure');
export const FR_CF_COST = agency('Campus France – What is the cost of life in France?', 'https://www.campusfrance.org/en/faq/what-is-the-cost-of-life-in-france');
export const FR_CF_BD_PROCEDURE = agency('Campus France Bangladesh – Procedure', 'https://www.bangladesh.campusfrance.org/en/procedure');
export const FR_CF_BD_VISA_DOCS = agency('Campus France Bangladesh – Documents for visa', 'https://www.bangladesh.campusfrance.org/en/documents-for-visa');

// Universities (their own official pages)
export const FR_SORBONNE = uni('Sorbonne Université', 'https://www.sorbonne-universite.fr/en');
export const FR_SORBONNE_FEES = uni('Sorbonne Université – Enrolment procedures and tuition fees', 'https://www.sorbonne-universite.fr/en/education/study-sorbonne-university/enrolment-procedures-and-tuition-fees');
export const FR_SORBONNE_EXEMPTION = uni('Sorbonne Université – Governing Board approves its exemption policy for international students, 2026/2027', 'https://www.sorbonne-universite.fr/en/news/governing-board-sorbonne-university-unanimously-approves-its-exemption-policy-international');
export const FR_SACLAY = uni('Université Paris-Saclay', 'https://www.universite-paris-saclay.fr/en');
export const FR_SACLAY_MASTERS = uni('Université Paris-Saclay – International students: applying for a Master’s degree', 'https://www.universite-paris-saclay.fr/en/admission/etudiants-internationaux/international-students-applying-masters-degree');
export const FR_SACLAY_FEES = uni('Université Paris-Saclay – Tuition fees', 'https://www.universite-paris-saclay.fr/en/admission/tuition-fees');
export const FR_SCIENCESPO = uni('Sciences Po', 'https://www.sciencespo.fr/en');
export const FR_SCIENCESPO_FEES = uni('Sciences Po – Tuition fees at a glance', 'https://www.sciencespo.fr/en/admissions-and-financial-aid/tuition-fees/');
export const FR_SCIENCESPO_UG = uni('Sciences Po – Undergraduate Admissions: which procedure corresponds to your situation?', 'https://www.sciencespo.fr/en/admissions-and-financial-aid/undergraduate-studies/');
export const FR_SCIENCESPO_GRAD = uni('Sciences Po – Graduate Admissions: which procedure applies to your situation?', 'https://www.sciencespo.fr/en/admissions-and-financial-aid/graduate-studies-how-to-apply/');
export const FR_POLYTECHNIQUE = uni('École Polytechnique', 'https://www.polytechnique.edu/');
export const FR_POLYTECHNIQUE_BSC = uni('École Polytechnique – Bachelor of Science programme page', 'https://programmes.polytechnique.edu/en/bachelor/bachelor-of-science');
export const FR_IPPARIS_QS = uni('QS World University Rankings 2027 – Institut Polytechnique de Paris (topuniversities.com)', 'https://www.topuniversities.com/universities/institut-polytechnique-de-paris');

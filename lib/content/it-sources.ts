import type { SourceRef } from '@/lib/models';

/**
 * Official Italian sources for the Italy guide, each read on IT_READ.
 * Confidence (internal): high = the Embassy of Italy in Dhaka / an Italian
 * consulate (MAECI) / MUR / the university itself; medium = other public
 * bodies' summaries (CISIA, regional DSU agencies, the migrants portal).
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const IT_READ = '2026-09-28';

// Embassy of Italy in Dhaka / Ministry of Foreign Affairs (MAECI)
export const IT_EMB_NOTICE = gov('Embassy of Italy in Dhaka – Notice for Student Visa Applicants (10 June 2026)', 'https://ambdhaka.esteri.it/en/news/dall_ambasciata/2026/06/notice-for-student-visa-applicants/');
export const IT_EMB_MAECI_GRANTS = gov('Embassy of Italy in Dhaka – Italian Government study grants A.Y. 2026-2027 (15 March 2026)', 'https://ambdhaka.esteri.it/en/news/dall_ambasciata/2026/03/italian-government-study-grants-for-foreign-and-italian-students-residing-abroad-a-y-2026-2027/');
export const IT_EMB_CHECKLIST = gov('Embassy of Italy in Dhaka – Checklist for study visa (university pre-enrolment), published by its visa service provider VFS Global', 'https://visa.vfsglobal.com/one-pager/italy/bangladesh/english/pdf/checklist-for-study-visa-university-pre-enrolment.pdf');
export const IT_CONSULATE_PROCEDURE = gov('Consulate General of Italy (MAECI network) – 2026/27–2027/28 enrolment procedure for non-EU students (PDF)', 'https://consgerusalemme.esteri.it/wp-content/uploads/2026/07/ENG-2026-2027-IMMATRICOLAZIONE-STUDENTI-STRANIERI-EXTRA-UE.pdf');
export const IT_STUDY_IN_ITALY = gov('Study in Italy (MAECI) – calls for Italian Government scholarships', 'https://studyinitaly.esteri.it/ListaBandi');

// Ministry of University and Research (MUR) / Universitaly
export const IT_UNIVERSITALY_PROCEDURE = gov('Universitaly (MUR) – Procedures for international students 2026-2027 and 2027-2028', 'https://www.universitaly.it/studenti-stranieri');
export const IT_UNIVERSITALY_STEPS = gov('Universitaly (MUR) – First steps in Italy', 'https://www.universitaly.it/first-steps');
export const IT_MUR_CIRCULAR = gov('MUR – Circular: procedures for international students 2026-2027 (PDF, via Universitaly)', 'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf');
export const IT_MUR_POOR_COUNTRIES = gov('MUR – Decree no. 176 of 24 February 2026: list of particularly poor countries for 2026/2027 (PDF)', 'https://www.mur.gov.it/sites/default/files/2026-03/Decreto%20Ministeriale%20n.%20176%20del%2024-2-2026.pdf');

// Other public bodies
export const IT_CISIA_TOLC = gov('CISIA (inter-university consortium) – What is the TOLC', 'https://www.cisiaonline.it/en/tolc/all-about-TOLC/what-is-the-TOLC');
export const IT_MIGRANTS_STUDY = gov('Integrazione Migranti (Italian Government portal) – Study: residence permit, work and conversion', 'https://integrazionemigranti.gov.it/it-it/Ricerca-norme/Dettaglio-norma/id/14/Studio');
export const IT_ERGO_INTL = gov('ER.GO (Emilia-Romagna regional agency for the right to study) – International students: documents', 'https://www.er-go.it/studenti-internazionali');
export const IT_ERGO_GRANT = gov('ER.GO – Borsa di studio (DSU scholarship)', 'https://www.er-go.it/esplora-i-benefici/benefici-erogati-da-er.go/borsa-di-studio');

// Universities (their own websites)
export const IT_POLIMI_FOREIGN_INCOME = uni('Politecnico di Milano – Students with income and assets abroad (2026/2027)', 'https://www.polimi.it/studenti/tasse-universitarie/studenti-con-reddito-e-patrimonio-allestero');
export const IT_UNIBO_FEES = uni('University of Bologna – Fees and exemptions: amounts and deadlines (2026/27)', 'https://www.unibo.it/en/study/enrolment-fees-and-other-procedures/degree-programmes/tuition-fees-and-exemptions');
export const IT_UNIPI_PHD = uni('University of Pisa – PhD admission calls 2026/2027', 'https://www.unipi.it/didattica/corsi/dottorati/bando2026-27/');
export const IT_UNIPV_PREENROL = uni('University of Pavia – Pre-enrolment and visa application a.y. 2026/2027', 'https://apply.unipv.eu/en_GB/news/new/88-information-pre-enrollment-and-visa-application-ay-20262027');
export const IT_POLIMI = uni('Politecnico di Milano', 'https://www.polimi.it/en');
export const IT_UNIBO = uni('University of Bologna', 'https://www.unibo.it/en');
export const IT_UNIPI = uni('University of Pisa', 'https://www.unipi.it/en/');
export const IT_UNIPD = uni('University of Padua', 'https://www.unipd.it/en/');
export const IT_SAPIENZA = uni('Sapienza University of Rome', 'https://www.uniroma1.it/en');

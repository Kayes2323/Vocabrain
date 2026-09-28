import type { SourceRef } from '@/lib/models';

/**
 * Official Germany sources for the Germany guide. Each was read on DE_READ.
 * Confidence (internal): high = the German Embassy Dhaka / Federal Government
 * (Make it in Germany) / the university itself; medium = DAAD summaries.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const DE_READ = '2026-09-28';

// German Embassy Dhaka (Federal Foreign Office)
export const DE_EMBASSY_STUDY = gov('German Embassy Dhaka – Information regarding Study Visa', 'https://dhaka.diplo.de/bd-en/service/2685884-2685884');
export const DE_EMBASSY_FAQ = gov('German Embassy Dhaka – FAQ Student Visa', 'https://dhaka.diplo.de/bd-en/service/2689586-2689586');
export const DE_EMBASSY_NATIONAL = gov('German Embassy Dhaka – National Visa (fees and processing times)', 'https://dhaka.diplo.de/bd-en/service/2682868-2682868');
export const DE_EMBASSY_VFS_MASTER = gov(
  'German Embassy Dhaka – VFS information sheet: National Visa, Study (Master) (PDF)',
  'https://dhaka.diplo.de/resource/blob/2685896/8b23064d027a95ab904d29a1defa5fc0/p-01b-vfs-requirements-for-student-visa-master--data.pdf',
);
export const DE_CSP = gov('Federal Foreign Office – Consular Services Portal', 'https://digital.diplo.de/');

// DAAD (German Academic Exchange Service)
export const DE_DAAD_BD_BACHELOR = gov('DAAD Bangladesh – Bachelor Studies', 'https://www.daad-bangladesh.org/en/studying-in-germany/bachelor-studies/');
export const DE_DAAD_BD_MASTER = gov('DAAD Bangladesh – Master Studies', 'https://www.daad-bangladesh.org/en/studying-in-germany/master-studies/');
export const DE_DAAD_BD_PHD = gov('DAAD Bangladesh – PhD Studies', 'https://www.daad-bangladesh.org/en/studying-in-germany/phd-studies/');
export const DE_SIG_FUNDING = gov('Study in Germany (DAAD) – Funding: living costs, semester fee, tuition fees, health insurance', 'https://www.study-in-germany.com/en/plan-your-studies/preparation/funding/');
export const DE_DAAD_ADMISSION_DB = gov('DAAD – Database on admission requirements', 'https://www.daad.de/en/studying-in-germany/requirements/admission-database/');
export const DE_DAAD_SCHOLARSHIP_DB = gov('DAAD – Scholarship database', 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/');
export const DE_DAAD_EPOS = gov('DAAD – Development-Related Postgraduate Courses (EPOS)', 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50076777');
export const DE_UNIASSIST_DEADLINES = gov('uni-assist – Deadlines and processing time', 'https://www.uni-assist.de/en/how-to-apply/plan-your-application/deadlines-processing-time/');

// Federal Government
export const DE_MIIG_WORK = gov('Make it in Germany (Federal Government) – Study and work', 'https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany/work');
export const DE_MIIG_VISA_STUDY = gov('Make it in Germany (Federal Government) – Visa for studying', 'https://www.make-it-in-germany.com/en/visa-residence/types/studying');
export const DE_MIIG_SKILLED_ACT = gov('Make it in Germany (Federal Government) – The new Skilled Immigration Act', 'https://www.make-it-in-germany.com/en/visa-residence/skilled-immigration-act');
export const DE_MIIG_REGISTRATION = gov(
  'Make it in Germany (Federal Government) – First steps in Germany (brochure): registering your address',
  'https://www.make-it-in-germany.com/fileadmin/1_Rebrush_2022/a_Fachkraefte/PDF-Dateien/3_Visum_u_Aufenthalt/Visagrafik_EN/Broschuere_Chancenkarte_EN.pdf',
);
export const DE_DEUTSCHLANDSTIPENDIUM = gov(
  'Deutschlandstipendium (Federal Ministry) – What you need to know',
  'https://www.deutschlandstipendium.de/deutschlandstipendium/de/services/english/the-deutschlandstipendium-best-of-both-worlds-for-students.html',
);

// Universities (their own pages)
export const DE_STUTTGART_FEES = uni('University of Stuttgart – Tuition fees for international students and for a second degree', 'https://www.student.uni-stuttgart.de/en/organizing-studies/formalities/tuition-and-fees/tuition-fee/');
export const DE_STUTTGART_FEES_OVERVIEW = uni('University of Stuttgart – Fees and charges', 'https://www.student.uni-stuttgart.de/en/organizing-studies/formalities/tuition-and-fees/');
export const DE_RWTH_FAQ = uni('RWTH Aachen University – International Student Center: FAQ', 'https://www.rwth-aachen.de/cms/root/studium/im-studium/internationales/~inno/faq/?lidx=1');
export const DE_RWTH_COSTS = uni(
  'RWTH Aachen University – Costs',
  'https://www.rwth-aachen.de/cms/root/studium/vor-dem-studium/internationale-studieninteressierte/organisation-des-studienaufenthaltes/internationale-studierende/~bqmo/kosten/?lidx=1',
);

import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Norway guide, each read on NO_READ.
 * Confidence (internal): high = Study in Norway (run by the Norwegian
 * Directorate for Higher Education and Skills, HK-dir), HK-dir, the
 * Government (regjeringen.no) and Parliament (stortinget.no), Norway in
 * Bangladesh (norway.no) and the universities themselves. UDI's own pages
 * could not be read on NO_READ (blocked by a captcha), so nothing is taken
 * from them directly.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const NO_READ = '2026-09-29';

// HK-dir / Study in Norway
export const NO_COSTS = gov('Study in Norway (HK-dir) – Cost and requirements', 'https://studyinnorway.no/cost-and-requirements');
export const NO_AFTER = gov('Study in Norway (HK-dir) – Working in Norway after completing a degree', 'https://studyinnorway.no/working-norway-after-completing-degree');
export const NO_GSU = gov('HK-dir – Higher Education Entrance Qualification (GSU list)', 'https://hkdir.no/en/foreign-education/lists-and-databases/higher-education-entrance-qualification-gsu');
export const NO_GSU_LANG = gov('HK-dir – Language requirements for Higher Education Entrance Qualification', 'https://hkdir.no/en/foreign-education/lists-and-databases/higher-education-entrance-qualification-gsu/language-requirements-Higher-Education-Entrance-Qualification');

// Government and Parliament (tuition law)
export const NO_GOV_FEES = gov('Regjeringen.no – Åpner for lavere studieavgift (press release, 21 October 2025)', 'https://www.regjeringen.no/no/aktuelt/regjeringen-vil-endre-universitets-og-hoyskoleloven-apner-for-lavere-studieavgift-og-avvikler-blind-klagesensur/id3125570/');
export const NO_STORTING_FEES = gov('Stortinget – Innst. 312 L (2025–2026), committee recommendation on tuition fees (19 May 2026)', 'https://www.stortinget.no/no/Saker-og-publikasjoner/Publikasjoner/Innstillinger/Stortinget/2025-2026/inns-202526-312l/?all=true');

// Norway in Bangladesh
export const NO_EMB_RP = gov('Norway in Bangladesh (Norwegian Embassy) – Residence permit', 'https://www.norway.no/en/bangladesh/services-info/visitors-visa-res-permit/res-permit/');

// Universities (their own pages)
export const NO_UIO_FEES = uni('University of Oslo – Tuition fees', 'https://www.uio.no/english/studies/admission/tuition/');
export const NO_UIO_FEE_TABLE = uni('University of Oslo – How much is the tuition fee? (2026/2027 and 2027/2028)', 'https://www.uio.no/english/studies/admission/tuition/table-of-costs/');
export const NO_UIO_MASTER = uni("University of Oslo – Application and admission to master's degree programmes", 'https://www.uio.no/english/studies/admission/master/');
export const NO_NTNU_FEES = uni('NTNU – Tuition fees', 'https://www.ntnu.edu/studies/tuition-fee');
export const NO_NTNU_APPLY = uni("NTNU – Apply for an international master's degree", 'https://www.ntnu.edu/studies/imp/how_to_apply');
export const NO_NTNU_ENGLISH = uni('NTNU – English language requirements', 'https://www.ntnu.edu/studies/langcourses/languagerequirements');
export const NO_NMBU = uni('Norwegian University of Life Sciences (NMBU)', 'https://www.nmbu.no/en');
export const NO_NTNU = uni('Norwegian University of Science and Technology (NTNU)', 'https://www.ntnu.edu/');
export const NO_UIT = uni('UiT The Arctic University of Norway', 'https://en.uit.no/');
export const NO_UIB = uni('University of Bergen', 'https://www.uib.no/en');
export const NO_UIO = uni('University of Oslo', 'https://www.uio.no/english/');

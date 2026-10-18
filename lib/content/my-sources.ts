import type { SourceRef } from '@/lib/models';

/**
 * Official sources for the Malaysia guide, built the same way as
 * es-sources.ts / dk-sources.ts: every fact traces back to one of these.
 * Confidence (internal): high = the Immigration Department of Malaysia's own
 * imi.gov.my (the authority that actually issues the Student Pass and the
 * eVAL/SEV) and Education Malaysia Global Services' own
 * educationmalaysia.gov.my / visa.educationmalaysia.gov.my (EMGS — a company
 * limited by guarantee under the Ministry of Higher Education and the
 * MANDATORY, centralised gateway through which every international
 * student's visa/pass application to a Malaysian institution is processed;
 * EMGS screens the application and forwards it to the Immigration
 * Department, which alone issues the electronic Visa Approval Letter (eVAL)
 * and later endorses the Student Pass in the passport after arrival — this
 * two-body EMGS→Immigration structure is Malaysia's own system and is NOT
 * modelled on the single-national-immigration-office pattern used in the
 * Europe-focused guides built earlier this session); medium = the Ministry
 * of Higher Education's own MOHE scholarship portal (biasiswa.mohe.gov.my)
 * and university admissions/fee pages. The High Commission of Malaysia in
 * Dhaka (kln.gov.my) is also official-government. Malaysia is NOT an
 * EU/Schengen country and its visa, work-rights and post-study rules are
 * read fresh from Malaysia's own official pages — nothing is carried over
 * from the European guides (Spain's, Denmark's, Austria's, Hungary's,
 * Switzerland's, the Netherlands', Ireland's, France's, Slovenia's, the
 * Czech Republic's or Lithuania's) or from the South Korea university layer.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const sch = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-scholarship' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const MY_READ = '2026-10-18';

// Immigration Department of Malaysia (imi.gov.my) — Ministry of Home Affairs
export const MY_IMI_STUDENT_PASS = gov('Immigration Department of Malaysia – Student Pass', 'https://www.imi.gov.my/index.php/en/main-services/pass/student-pass/');
export const MY_IMI_SEV_LIST = sch('EMGS – SEV Required Countries', 'https://visa.educationmalaysia.gov.my/guidelines/sev-required-countries');

// Education Malaysia Global Services (EMGS) — educationmalaysia.gov.my / visa.educationmalaysia.gov.my
export const MY_EMGS_FAQ = sch('EMGS – Application Guide FAQ (How to Study in Malaysia)', 'https://educationmalaysia.gov.my/get-in-touch/faq');
export const MY_EMGS_REQUIRED_DOCS = sch('EMGS – Required Documents for a Student Visa Application', 'https://visa.educationmalaysia.gov.my/guidelines/required-documents');
export const MY_EMGS_INSURANCE = sch('EMGS – Insurance (medical insurance scheme for international students)', 'https://visa.educationmalaysia.gov.my/guidelines/insurance-new-2026');
export const MY_EMGS_GRADUATE_PASS = sch('EMGS – Graduate Pass', 'https://visa.educationmalaysia.gov.my/graduate-pass');
export const MY_EMGS_COST_OF_LIVING = sch('EMGS – Cost of Living for International Students in Malaysia', 'https://educationmalaysia.gov.my/plan-your-studies/plan-your-budget/cost-of-living');
export const MY_EMGS_PART_TIME_WORK = sch('EMGS Hub – Part-time job while studying?', 'https://hub.emgs.com.my/part-time-job-while-studying/');

// High Commission of Malaysia, Dhaka (kln.gov.my) — Ministry of Foreign Affairs Malaysia
export const MY_KLN_DHAKA = gov('High Commission of Malaysia, Dhaka', 'https://www.kln.gov.my/web/bgd_dhaka/home');

// Ministry of Higher Education (MOHE) — biasiswa.mohe.gov.my
export const MY_MOHE_MIS_PORTAL = sch('MOHE – Malaysia International Scholarship (MIS) portal', 'https://biasiswa.mohe.gov.my/INTER/');
export const MY_MOHE_MIS_GUIDELINES = sch('MOHE – Guidelines for the Application of the Malaysia International Scholarship (MIS) 2026', 'https://biasiswa.mohe.gov.my/INTER/doc/MIS/Guidelines%20MIS%202026.pdf');

// Universiti Malaya (UM) — study.um.edu.my
export const MY_UM_FAQ = uni('Universiti Malaya – FAQs & Info (Study@UM)', 'https://study.um.edu.my/faqs-amp-info');
export const MY_UM_INTERNATIONAL = uni('Universiti Malaya – International Student (arrival guide)', 'https://study.um.edu.my/international-student');
export const MY_UM_HOW_TO_APPLY = uni('Universiti Malaya – How To Apply', 'https://study.um.edu.my/how-to-apply');

// Universiti Putra Malaysia (UPM) — akademik.upm.edu.my
export const MY_UPM_INTL_ADMISSION = uni('UPM – International Student Admission', 'https://akademik.upm.edu.my/international_student_admission-3955');
export const MY_UPM_FEES = uni('UPM – International Undergraduate Studies Fees', 'https://eng.upm.edu.my/upload/dokumen/FKJUR1_FEES_FOR_INTER_STD.pdf');

// Universiti Kebangsaan Malaysia (UKM)
export const MY_UKM_QS = uni('QS World University Rankings 2027 – Universiti Kebangsaan Malaysia (topuniversities.com)', 'https://www.topuniversities.com/universities/universiti-kebangsaan-malaysia-ukm');

// Universiti Teknologi Malaysia (UTM)
export const MY_UTM_QS = uni('QS World University Rankings 2027 – Universiti Teknologi Malaysia (topuniversities.com)', 'https://www.topuniversities.com/universities/universiti-teknologi-malaysia-utm');

// Monash University Malaysia — monash.edu.my
export const MY_MONASH_FEES = uni('Monash University Malaysia – Fees (Undergraduate Courses)', 'https://www.monash.edu.my/study/undergraduate/fees');
export const MY_MONASH_ENTRY = uni('Monash University Malaysia – Entry Requirements', 'https://www.monash.edu.my/study/entry-requirements');
export const MY_MONASH_ENGLISH = uni('Monash University Malaysia – English language requirements', 'https://www.monash.edu.my/study/entry-requirements/english');

// QS World University Rankings 2027 (topuniversities.com)
export const MY_UM_QS = uni('QS World University Rankings 2027 – Universiti Malaya (topuniversities.com)', 'https://www.topuniversities.com/universities/universiti-malaya-um');
export const MY_UPM_QS = uni('QS World University Rankings 2027 – Universiti Putra Malaysia (topuniversities.com)', 'https://www.topuniversities.com/universities/universiti-putra-malaysia-upm');
export const MY_MONASH_QS = uni('QS World University Rankings 2027 – Monash University (parent institution; Malaysia campus not ranked separately) (topuniversities.com)', 'https://www.topuniversities.com/universities/monash-university');

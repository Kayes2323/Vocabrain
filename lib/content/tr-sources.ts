import type { SourceRef } from '@/lib/models';

/**
 * Official Turkish sources for the Turkey guide, each read on TR_READ.
 * Confidence (internal): high = Ministry of Foreign Affairs, Presidency of
 * Migration Management, Council of Higher Education (YÖK) "Study in Türkiye",
 * Türkiye Scholarships (YTB); medium = pages that only point elsewhere.
 */
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uni = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });

/** Read on this date; re-check within six months. */
export const TR_READ = '2026-09-28';

// Council of Higher Education (YÖK) – Study in Türkiye
export const TR_SIT_SYSTEM = gov('Study in Türkiye (Council of Higher Education) – Turkish higher education system, admissions and tuition', 'https://www.studyinturkiye.gov.tr/StudyinTurkey/ShowDetail?rID=Ec/rgHEN8Zg=&&cId=PE4Nr0mMoY4=');
export const TR_SIT_VISA = gov('Study in Türkiye (Council of Higher Education) – Visa and residence', 'https://www.studyinturkiye.gov.tr/StudyinTurkey/ShowDetail?rID=Egqvn0o1tiU=&&cId=PE4Nr0mMoY4=');
export const TR_SIT_WORK = gov('Study in Türkiye (Council of Higher Education) – Work opportunities', 'https://www.studyinturkiye.gov.tr/StudyinTurkey/ShowDetail?rID=rlsyTUzKZzY=&&cId=PE4Nr0mMoY4=');
export const TR_SIT_HOUSING = gov('Study in Türkiye (Council of Higher Education) – Accommodation', 'https://www.studyinturkiye.gov.tr/StudyinTurkey/ShowDetail?rID=zYA/A7eMEsM=&&cId=PE4Nr0mMoY4=');
export const TR_SIT_HEALTH = gov('Study in Türkiye (Council of Higher Education) – Healthcare services and insurance', 'https://www.studyinturkiye.gov.tr/StudyinTurkey/ShowDetail?rID=aOSryNclUYg=&&cId=PE4Nr0mMoY4=');
export const TR_SIT_TRYOS = gov('Study in Türkiye (Council of Higher Education) – What is TR-YÖS', 'https://www.studyinturkiye.gov.tr/StudyinTurkey/ShowDetail?rID=U85vwhrYhog=&&cId=rVtWfWaOnRc=');
export const TR_SIT_TRYOS_FAQ = gov('Study in Türkiye (Council of Higher Education) – TR-YÖS frequently asked questions', 'https://www.studyinturkiye.gov.tr/StudyinTurkey/StudyinTurkeyTRYOS');

// Türkiye Scholarships (YTB)
export const TR_TB_CRITERIA = gov('Türkiye Scholarships – Criteria & scholarship programs', 'https://www.turkiyeburslari.gov.tr/scholarshipsprograms');
export const TR_TB_FULLTIME = gov('Türkiye Scholarships – Full-time scholarship programs (scope, stipends, application period)', 'https://www.turkiyeburslari.gov.tr/fulltimeprograms');

// Ministry of Foreign Affairs / Presidency of Migration Management
export const TR_MFA_VISA = gov('Ministry of Foreign Affairs of Türkiye – General information about Turkish visas (student – education visa)', 'https://www.mfa.gov.tr/general-information-about-turkish-visas.en.mfa');
export const TR_EMB_DHAKA = gov('Embassy of the Republic of Türkiye in Dhaka', 'https://dhaka-emb.mfa.gov.tr/');
export const TR_GOC_PERMITS = gov('Presidency of Migration Management – Residence permit types (student, short-term after graduation)', 'https://en.goc.gov.tr/residence-permit-types');

// Universities (their own websites)
export const TR_ANKARA = uni('Ankara University', 'https://en.ankara.edu.tr/');
export const TR_BOGAZICI = uni('Boğaziçi University', 'https://bogazici.edu.tr/en');
export const TR_HACETTEPE = uni('Hacettepe University', 'https://www.hacettepe.edu.tr/english/');
export const TR_ITU = uni('Istanbul Technical University', 'https://www.itu.edu.tr/en');
export const TR_METU = uni('Middle East Technical University', 'https://www.metu.edu.tr/');

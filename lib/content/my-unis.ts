import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, ProgramProfile, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import {
  MY_MONASH_ENGLISH,
  MY_MONASH_ENTRY,
  MY_MONASH_FEES,
  MY_MONASH_QS,
  MY_READ,
  MY_UKM_QS,
  MY_UM_HOW_TO_APPLY,
  MY_UM_QS,
  MY_UPM_FEES,
  MY_UPM_INTL_ADMISSION,
  MY_UPM_QS,
  MY_UTM_QS,
} from './my-sources';

/**
 * Malaysia: university → program layer, built the same way as Spain's,
 * Denmark's and the other European layers (lib/content/es-unis.ts,
 * dk-unis.ts) and the KR/DE pattern. Rankings are QS World University
 * Rankings 2027 as printed on each institution's topuniversities.com
 * profile. Monash University Malaysia is NOT ranked separately by QS — only
 * the parent Monash University (Australia) carries a QS World University
 * Rankings entry, which Monash's own Malaysia pages cite as context — so
 * Monash Malaysia's own `ranking.rank` is left null here rather than
 * borrowing the parent institution's number for a different campus.
 * Anything that could not be verified on an official page is left marked
 * not-verified — never guessed.
 */

const READ = MY_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the institution’s official admissions page.', 'যাচাই হয়নি — institution-এর official admissions page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Apply through EMGS, then obtain Malaysia’s Single Entry Visa', 'EMGS-এর মাধ্যমে আবেদন করুন, তারপর Malaysia-র Single Entry Visa নিন'),
  body: b('Once admitted, apply online through EMGS while still outside Malaysia. EMGS screens your application and forwards it to the Immigration Department of Malaysia for the electronic Visa Approval Letter (eVAL); Bangladesh is on EMGS’s own list of countries additionally requiring a Single Entry Visa (SEV), applied for through Malaysia’s eVISA portal only after the eVAL is issued. See the Malaysia Student Pass section on the country page.', 'ভর্তি হলে, Malaysia-র বাইরে থাকা অবস্থায় EMGS-এর মাধ্যমে অনলাইনে আবেদন করুন। EMGS আপনার application screen করে electronic Visa Approval Letter (eVAL)-এর জন্য Immigration Department of Malaysia-এ পাঠায়; Bangladesh EMGS-এর নিজের সেই দেশের তালিকায় আছে যাদের অতিরিক্তভাবে Single Entry Visa (SEV) লাগে, যা eVAL ইস্যু হওয়ার পরই Malaysia-র eVISA portal-এর মাধ্যমে আবেদন করতে হয়। Country page-এর Malaysia Student Pass অংশ দেখুন।'),
};

// ------------------------------------------------------------------ universities

const UM: UniversityProfile = {
  id: 'my-um',
  countryCode: 'MY',
  name: 'Universiti Malaya (UM)',
  city: 'Kuala Lumpur',
  ownership: 'public',
  officialUrl: 'https://study.um.edu.my/',
  admissionsUrl: MY_UM_HOW_TO_APPLY.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '56', sourceUrl: MY_UM_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Malaysia’s highest-ranked university in the QS World University Rankings 2027, based in Kuala Lumpur, teaching almost all programmes in English with Foundation, Diploma, Bachelor’s, Master’s and Doctoral degrees through a dedicated International Channel on its own MAYA Portal.',
    'QS World University Rankings 2027-এ Malaysia-র সর্বোচ্চ rank পাওয়া university, Kuala Lumpur-এ, নিজের MAYA Portal-এর একটি নিবেদিত International Channel-এর মাধ্যমে Foundation, Diploma, Bachelor\'s, Master\'s, আর Doctoral degree-এ প্রায় সব programme English-এ পড়ায়।',
  ),
  tuition: NOT_VERIFIED_FEE([MY_UM_HOW_TO_APPLY]),
  deadlines: txt(
    'UM’s own "How To Apply" page lists separate windows per channel and intake: for example its 2026/2027 International-Channel undergraduate applications opened 9 Feb 2026 and closed 30 Aug 2026 for the October intake (except Medicine, 9 June 2026), with a second window for the March intake opening 7 Sept 2026 and closing 30 Jan 2027.',
    'UM-এর নিজের "How To Apply" page প্রতিটি channel আর intake-এর জন্য আলাদা window তালিকাভুক্ত করে: উদাহরণস্বরূপ এর 2026/2027 International-Channel undergraduate application October intake-এর জন্য 9 Feb 2026-এ খুলে 30 Aug 2026-এ বন্ধ হয়েছে (Medicine ছাড়া, 9 June 2026), আর March intake-এর জন্য দ্বিতীয় window 7 Sept 2026-এ খুলে 30 Jan 2027-এ বন্ধ হয়।',
    'verified',
    [MY_UM_HOW_TO_APPLY],
  ),
  nextIntake: intake('confirmed', [MY_UM_HOW_TO_APPLY], b('October 2026 and March 2027 undergraduate intakes (International Channel)', 'October 2026 আর March 2027 undergraduate intake (International Channel)')),
  admission: txt('UM’s own FAQ describes three admission channels — UPU (Malaysian citizens only), SATU/Open Channel (Malaysian citizens only) and the International Channel (international applicants, via the MAYA Portal) — plus a single MAYA-Portal-only channel for all Master’s and Doctoral applicants, Malaysian or international.', 'UM-এর নিজের FAQ তিনটি admission channel বর্ণনা করে — UPU (শুধু Malaysian নাগরিক), SATU/Open Channel (শুধু Malaysian নাগরিক), আর International Channel (international আবেদনকারী, MAYA Portal-এর মাধ্যমে) — সঙ্গে সব Master\'s আর Doctoral আবেদনকারীর জন্য (Malaysian বা international) একটি একক MAYA-Portal-only channel।', 'verified', [MY_UM_HOW_TO_APPLY]),
  english: txt('UM’s own FAQ exempts applicants from countries whose national language is English, or who studied at an English-medium institution, from a separate English test; others must meet programme-specific requirements set by the faculty.', 'UM-এর নিজের FAQ এমন আবেদনকারীদের একটি আলাদা English test থেকে ছাড় দেয় যাদের দেশের জাতীয় ভাষা English, বা যারা English-medium institution-এ পড়েছেন; অন্যদের faculty-র ঠিক করা programme-specific শর্ত পূরণ করতে হয়।', 'verified', [MY_UM_HOW_TO_APPLY]),
  documents: {
    required: [
      b('Passport-size photo (official guidelines)', 'Passport-size photo (official guideline)'),
      b('Passport copy (first page, for non-citizen applicants)', 'Passport copy (প্রথম page, non-citizen আবেদনকারীর জন্য)'),
      b('Academic transcript and certificate', 'Academic transcript আর certificate'),
      b('English proficiency certificate', 'English proficiency certificate'),
    ],
    mayBeRequired: [b('Qualification verification letter, research proposal (for research Master’s/PhD), or sponsorship/scholarship letter', 'Qualification verification letter, research proposal (research Master\'s/PhD-এর জন্য), বা sponsorship/scholarship letter')],
    status: 'verified',
    sources: [MY_UM_HOW_TO_APPLY],
  },
  applicationFee: txt('RM 500 per application for international Foundation, Bachelor’s, Master’s and Doctoral full-time applications; RM 500 for Master’s Online & Distance Learning; RM 500 for part-time Master’s/Doctoral — per UM’s own fee schedule.', 'International Foundation, Bachelor\'s, Master\'s, আর Doctoral full-time application-এর জন্য RM 500 প্রতি application; Master\'s Online & Distance Learning-এর জন্য RM 500; part-time Master\'s/Doctoral-এর জন্য RM 500 — UM-এর নিজের fee schedule অনুযায়ী।', 'verified', [MY_UM_HOW_TO_APPLY]),
  scholarships: txt('No UM-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য UM-specific একটি full-degree scholarship পাওয়া যায়নি।', 'not-verified', [MY_UM_HOW_TO_APPLY]),
  applicationRoute: txt('Online via UM’s own International Channel (apply.um.edu.my) for Foundation/Bachelor’s, or the MAYA Portal for all Master’s/Doctoral applicants.', 'Foundation/Bachelor\'s-এর জন্য UM-এর নিজের International Channel (apply.um.edu.my), বা সব Master\'s/Doctoral আবেদনকারীর জন্য MAYA Portal-এর মাধ্যমে online।', 'verified', [MY_UM_HOW_TO_APPLY]),
  steps: {
    items: [
      { title: b('Check your channel and the right intake window', 'আপনার channel আর সঠিক intake window দেখুন'), body: b('International applicants use the International Channel (Foundation/Bachelor’s) or the MAYA Portal (Master’s/Doctoral), per UM’s own page.', 'UM-এর নিজের page অনুযায়ী, international আবেদনকারীরা International Channel (Foundation/Bachelor\'s) বা MAYA Portal (Master\'s/Doctoral) ব্যবহার করেন।') },
      { title: b('Apply online and pay the RM 500 application fee', 'অনলাইনে আবেদন করুন আর RM 500 application fee পরিশোধ করুন'), body: b('Submit all required documents, including your English-proficiency certificate.', 'আপনার English-proficiency certificate সহ সব প্রয়োজনীয় documents জমা দিন।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [MY_UM_HOW_TO_APPLY],
  },
  programs: [],
  lastVerified: READ,
};

const UPM: UniversityProfile = {
  id: 'my-upm',
  countryCode: 'MY',
  name: 'Universiti Putra Malaysia (UPM)',
  city: 'Serdang, Selangor',
  ownership: 'public',
  officialUrl: 'https://akademik.upm.edu.my/international_student_admission-3955',
  admissionsUrl: MY_UPM_INTL_ADMISSION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '138', sourceUrl: MY_UPM_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A public, research-intensive university in Serdang, Selangor, with a dedicated International Student Admission office and its own published international-undergraduate fee schedule.',
    'Serdang, Selangor-এ একটি public, research-intensive university, একটি নিবেদিত International Student Admission office আর নিজস্ব প্রকাশিত international-undergraduate fee schedule সহ।',
  ),
  tuition: {
    ...txt(
      'UPM’s own international-undergraduate-fees document lists per-semester Bachelor’s fees mostly between RM 5,000 and RM 8,125, depending on the programme (e.g. RM 5,000/semester for English Language or Communication; RM 7,500/semester for Biology or Chemistry majors; RM 8,125/semester for Human Development) — well below Europe-style figures.',
      'UPM-এর নিজের international-undergraduate-fees document প্রতি সেমিস্টারে Bachelor\'s fee programme অনুযায়ী বেশিরভাগ RM 5,000 থেকে RM 8,125-এর মধ্যে তালিকাভুক্ত করে (যেমন English Language বা Communication-এর জন্য RM 5,000/সেমিস্টার; Biology বা Chemistry major-এর জন্য RM 7,500/সেমিস্টার; Human Development-এর জন্য RM 8,125/সেমিস্টার) — Europe-style সংখ্যার থেকে অনেক কম।',
      'verified',
      [MY_UPM_FEES],
    ),
    money: { amount: 5000, max: 8125, currency: 'RM', period: 'semester' },
  },
  deadlines: NOT_VERIFIED_FEE([MY_UPM_INTL_ADMISSION]),
  nextIntake: intake('not-published', [MY_UPM_INTL_ADMISSION]),
  admission: txt('UPM’s own International Student Admission page lists a "How To Apply" guide and an official Entry Qualifications document for international students; exact programme-by-programme deadlines were not itemized in full detail on the pages read for this guide.', 'UPM-এর নিজের International Student Admission page একটি "How To Apply" guide আর international student-দের জন্য একটি official Entry Qualifications document তালিকাভুক্ত করে; প্রতিটি programme-এর সঠিক deadline এই guide-এর জন্য পড়া page-এ সম্পূর্ণ বিস্তারিতভাবে তালিকাভুক্ত হয়নি।', 'partly-verified', [MY_UPM_INTL_ADMISSION]),
  english: NOT_VERIFIED_FEE([MY_UPM_FEES]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [MY_UPM_INTL_ADMISSION] },
  applicationFee: txt('A non-refundable application fee of USD 65 / RM 280, per UPM’s own how-to-apply document.', 'UPM-এর নিজের how-to-apply document অনুযায়ী, একটি non-refundable application fee USD 65 / RM 280।', 'verified', [MY_UPM_FEES]),
  scholarships: txt('No UPM-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য UPM-specific একটি full-degree scholarship পাওয়া যায়নি।', 'not-verified', [MY_UPM_INTL_ADMISSION]),
  applicationRoute: txt('Online via UPM’s own e-SMP International Candidates Online Application system.', 'UPM-এর নিজস্ব e-SMP International Candidates Online Application system-এর মাধ্যমে online।', 'verified', [MY_UPM_INTL_ADMISSION]),
  steps: {
    items: [
      { title: b('Check UPM’s own Entry Qualifications document for international students', 'International student-দের জন্য UPM-এর নিজের Entry Qualifications document দেখুন'), body: b('Lists which prior qualifications UPM accepts, programme by programme.', 'UPM কোন কোন আগের যোগ্যতা গ্রহণ করে তা programme অনুযায়ী তালিকাভুক্ত করে।') },
      { title: b('Apply online via e-SMP and pay the USD 65 / RM 280 fee', 'e-SMP-এর মাধ্যমে অনলাইনে আবেদন করুন আর USD 65 / RM 280 fee পরিশোধ করুন'), body: b('Non-refundable, per UPM’s own document.', 'UPM-এর নিজের document অনুযায়ী, non-refundable।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [MY_UPM_INTL_ADMISSION, MY_UPM_FEES],
  },
  programs: [],
  lastVerified: READ,
};

const UKM: UniversityProfile = {
  id: 'my-ukm',
  countryCode: 'MY',
  name: 'Universiti Kebangsaan Malaysia (UKM)',
  city: 'Bangi, Selangor',
  ownership: 'public',
  officialUrl: 'https://www.ukm.my/',
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '130', sourceUrl: MY_UKM_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A public university in Bangi, Selangor ("the National University"), ranked in the QS World University Rankings 2027 with a notably high International Student Ratio sub-score among Malaysian universities.',
    'Bangi, Selangor-এ একটি public university ("the National University"), QS World University Rankings 2027-এ ranked, Malaysian university-দের মধ্যে একটি উল্লেখযোগ্য উচ্চ International Student Ratio sub-score সহ।',
  ),
  tuition: NOT_VERIFIED_FEE([MY_UKM_QS]),
  deadlines: NOT_VERIFIED_FEE([MY_UKM_QS]),
  nextIntake: intake('not-published', [MY_UKM_QS]),
  admission: txt('UKM’s own international-admissions pages were not independently read in full detail for this guide beyond its QS World University Rankings profile; applicants should check ukm.my directly.', 'এই guide-এর জন্য UKM-এর নিজের international-admissions page তার QS World University Rankings profile-এর বাইরে বিস্তারিতভাবে স্বাধীনভাবে পড়া হয়নি; আবেদনকারীদের সরাসরি ukm.my চেক করা উচিত।', 'not-verified', [MY_UKM_QS]),
  english: NOT_VERIFIED_FEE([MY_UKM_QS]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [MY_UKM_QS] },
  applicationFee: NOT_VERIFIED_FEE([MY_UKM_QS]),
  scholarships: txt('UKM is among the public universities listed on MOHE’s own Malaysia International Scholarship (MIS) supported-institution list — but MIS’s own Bangladesh eligibility is not confirmed (see the country guide).', 'UKM MOHE-র নিজের Malaysia International Scholarship (MIS) সমর্থিত-institution তালিকায় আছে — কিন্তু MIS-এর নিজের Bangladesh eligibility নিশ্চিত না (country guide দেখুন)।', 'partly-verified', [MY_UKM_QS]),
  applicationRoute: NOT_VERIFIED_FEE([MY_UKM_QS]),
  steps: {
    items: [
      { title: b('Check ukm.my directly for the international-admissions process', 'International-admissions process-এর জন্য সরাসরি ukm.my চেক করুন'), body: b('Not independently itemized in detail for this guide.', 'এই guide-এর জন্য বিস্তারিতভাবে স্বাধীনভাবে তালিকাভুক্ত হয়নি।') },
      VISA_STEP,
    ],
    status: 'not-verified',
    sources: [MY_UKM_QS],
  },
  programs: [],
  lastVerified: READ,
};

const UTM: UniversityProfile = {
  id: 'my-utm',
  countryCode: 'MY',
  name: 'Universiti Teknologi Malaysia (UTM)',
  city: 'Skudai, Johor (main campus); Kuala Lumpur campus',
  ownership: 'public',
  officialUrl: 'https://www.utm.my/',
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=158', sourceUrl: MY_UTM_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A public, engineering- and technology-focused university based in Skudai, Johor, with a Kuala Lumpur campus, ranked #25 in the QS Asian University Rankings per its own topuniversities.com profile.',
    'Skudai, Johor-এ ভিত্তিক একটি public, engineering আর technology-focused university, Kuala Lumpur-এ একটি campus সহ, তার নিজের topuniversities.com profile অনুযায়ী QS Asian University Rankings-এ #25 ranked।',
  ),
  tuition: NOT_VERIFIED_FEE([MY_UTM_QS]),
  deadlines: NOT_VERIFIED_FEE([MY_UTM_QS]),
  nextIntake: intake('not-published', [MY_UTM_QS]),
  admission: txt('UTM’s own international-admissions pages (admission.utm.my) were not independently read in full detail for this guide beyond its QS World University Rankings profile; applicants should check admission.utm.my directly.', 'এই guide-এর জন্য UTM-এর নিজের international-admissions page (admission.utm.my) তার QS World University Rankings profile-এর বাইরে বিস্তারিতভাবে স্বাধীনভাবে পড়া হয়নি; আবেদনকারীদের সরাসরি admission.utm.my চেক করা উচিত।', 'not-verified', [MY_UTM_QS]),
  english: NOT_VERIFIED_FEE([MY_UTM_QS]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [MY_UTM_QS] },
  applicationFee: NOT_VERIFIED_FEE([MY_UTM_QS]),
  scholarships: txt('UTM is among the public universities listed on MOHE’s own Malaysia International Scholarship (MIS) supported-institution list — but MIS’s own Bangladesh eligibility is not confirmed (see the country guide).', 'UTM MOHE-র নিজের Malaysia International Scholarship (MIS) সমর্থিত-institution তালিকায় আছে — কিন্তু MIS-এর নিজের Bangladesh eligibility নিশ্চিত না (country guide দেখুন)।', 'partly-verified', [MY_UTM_QS]),
  applicationRoute: NOT_VERIFIED_FEE([MY_UTM_QS]),
  steps: {
    items: [
      { title: b('Check admission.utm.my directly for the international-admissions process', 'International-admissions process-এর জন্য সরাসরি admission.utm.my চেক করুন'), body: b('Not independently itemized in detail for this guide.', 'এই guide-এর জন্য বিস্তারিতভাবে স্বাধীনভাবে তালিকাভুক্ত হয়নি।') },
      VISA_STEP,
    ],
    status: 'not-verified',
    sources: [MY_UTM_QS],
  },
  programs: [],
  lastVerified: READ,
};

const MONASH_BCS: ProgramProfile = {
  id: 'my-monash-bachelor-computer-science',
  title: 'Bachelor of Computer Science',
  level: 'bachelors' as const,
  faculty: 'School of Information Technology',
  languages: b('English', 'ইংরেজি'),
  englishOnly: true,
  duration: b('3 years', '3 বছর'),
  tuition: {
    ...txt('RM 57,600 per year for international students (RM 48,480/year for Malaysian students), per Monash University Malaysia’s own fees page — several times a typical Malaysian public-university Bachelor’s fee.', 'Monash University Malaysia-র নিজের fees page অনুযায়ী, international student-দের জন্য বছরে RM 57,600 (Malaysian student-দের জন্য বছরে RM 48,480) — একটি সাধারণ Malaysian public-university Bachelor\'s fee-র চেয়ে কয়েক গুণ বেশি।', 'verified', [MY_MONASH_FEES]),
    money: { amount: 57600, currency: 'RM', period: 'year' },
  },
  deadline: NOT_VERIFIED_FEE([MY_MONASH_ENTRY]),
  nextIntake: intake('varies', [MY_MONASH_ENTRY]),
  requirements: txt('Monash University Malaysia’s own entry-requirements page states international students must meet the University’s own academic entry requirements and additionally hold a valid Malaysian Student Pass (visa) as required by the Malaysian Government.', 'Monash University Malaysia-র নিজের entry-requirements page বলে international student-দের University-র নিজের academic ভর্তির শর্ত পূরণ করতে হয় আর অতিরিক্তভাবে Malaysian Government-এর চাওয়া একটি valid Malaysian Student Pass (visa) থাকতে হয়।', 'verified', [MY_MONASH_ENTRY]),
  english: txt('Monash’s own English-requirements page sets a specific minimum for Arts, Business and Economics, Education and Law programmes (IELTS 7 overall, no band below 6.5); other faculties, including Information Technology, set their own figures not itemized in full on the pages read for this guide.', 'Monash-এর নিজের English-requirements page Arts, Business and Economics, Education, আর Law programme-এর জন্য একটি নির্দিষ্ট ন্যূনতম ঠিক করে (IELTS 7 overall, কোনো band 6.5-এর নিচে না); Information Technology-সহ অন্য faculty নিজস্ব সংখ্যা ঠিক করে যা এই guide-এর জন্য পড়া page-এ সম্পূর্ণভাবে তালিকাভুক্ত হয়নি।', 'partly-verified', [MY_MONASH_ENGLISH]),
  applyVia: b('Monash University Malaysia’s own online application system', 'Monash University Malaysia-র নিজস্ব online application system'),
  url: 'https://www.monash.edu.my/study/undergraduate/information-technology/bachelor-computer-science',
  sources: [MY_MONASH_FEES, MY_MONASH_ENTRY],
  lastVerified: READ,
};

const MONASH: UniversityProfile = {
  id: 'my-monash',
  countryCode: 'MY',
  name: 'Monash University Malaysia',
  city: 'Bandar Sunway, Selangor',
  ownership: 'private',
  officialUrl: 'https://www.monash.edu.my/',
  admissionsUrl: MY_MONASH_ENTRY.url,
  // QS World University Rankings 2027 does not rank Monash Malaysia as a separate campus — only the parent
  // Monash University (Australia) is ranked, which Monash's own Malaysia pages cite for context only.
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: null, sourceUrl: MY_MONASH_QS.url!, lastVerified: READ, status: 'not-verified' },
  overview: b(
    'A private, international-branch campus of Australia’s Monash University, in Bandar Sunway, Selangor, teaching Monash-branded degrees entirely in English. Monash’s own Malaysia pages cite the parent Monash University’s QS World University Rankings 2027 position (#31) for context, but QS does not issue a separate rank for the Malaysia campus itself.',
    'Australia-র Monash University-র একটি private, international-branch campus, Bandar Sunway, Selangor-এ, সম্পূর্ণভাবে English-এ Monash-branded degree পড়ায়। Monash-এর নিজের Malaysia page প্রসঙ্গের জন্য parent Monash University-র QS World University Rankings 2027 position (#31) উদ্ধৃত করে, কিন্তু QS Malaysia campus-এর জন্য নিজে আলাদা rank দেয় না।',
  ),
  tuition: {
    ...txt(
      'Set entirely by Monash itself and published directly on its own course-fee pages, well above typical Malaysian public-university levels — e.g. RM 57,600/year for the Bachelor of Computer Science, up to RM 148,320/year for the Bachelor of Medical Science and Doctor of Medicine, both for international students (reviewed per intake).',
      'সম্পূর্ণভাবে Monash নিজেই ঠিক করে আর সরাসরি নিজের course-fee page-এ প্রকাশ করে, সাধারণ Malaysian public-university level-এর থেকে অনেক বেশি — যেমন Bachelor of Computer Science-এর জন্য বছরে RM 57,600, Bachelor of Medical Science and Doctor of Medicine-এর জন্য বছরে RM 148,320 পর্যন্ত, দুটোই international student-দের জন্য (প্রতি intake পুনর্বিবেচিত)।',
      'verified',
      [MY_MONASH_FEES],
    ),
    money: { amount: 57600, max: 148320, currency: 'RM', period: 'year' },
  },
  deadlines: NOT_VERIFIED_FEE([MY_MONASH_ENTRY]),
  nextIntake: intake('varies', [MY_MONASH_ENTRY]),
  admission: txt('Monash University Malaysia’s own entry-requirements page states applicants must meet the University’s own academic entry requirements plus the Malaysian Government’s own international-student Student Pass requirement.', 'Monash University Malaysia-র নিজের entry-requirements page বলে আবেদনকারীদের University-র নিজের academic ভর্তির শর্ত আর Malaysian Government-এর নিজের international-student Student Pass শর্ত দুটোই পূরণ করতে হয়।', 'verified', [MY_MONASH_ENTRY]),
  english: txt('Monash’s own English-requirements page sets specific minimums per faculty (e.g. IELTS 7, no band below 6.5, for Arts, Business and Economics, Education and Law); it also accepts Year-12-level English study or prior English-medium tertiary study as alternatives.', 'Monash-এর নিজের English-requirements page প্রতি faculty-তে নির্দিষ্ট ন্যূনতম ঠিক করে (যেমন Arts, Business and Economics, Education, আর Law-এর জন্য IELTS 7, কোনো band 6.5-এর নিচে না); এটা Year-12-level English study বা আগের English-medium tertiary study-কেও বিকল্প হিসেবে গ্রহণ করে।', 'verified', [MY_MONASH_ENGLISH]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [MY_MONASH_ENTRY] },
  applicationFee: NOT_VERIFIED_FEE([MY_MONASH_ENTRY]),
  scholarships: txt('No Monash-Malaysia-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য Monash-Malaysia-specific একটি full-degree scholarship পাওয়া যায়নি।', 'not-verified', [MY_MONASH_ENTRY]),
  applicationRoute: txt('Online via Monash University Malaysia’s own application system.', 'Monash University Malaysia-র নিজস্ব application system-এর মাধ্যমে online।', 'partly-verified', [MY_MONASH_ENTRY]),
  steps: {
    items: [
      { title: b('Confirm your faculty’s English-language requirement', 'আপনার faculty-র English-ভাষার শর্ত নিশ্চিত করুন'), body: b('Minimums are set per faculty, not university-wide, per Monash’s own page.', 'Monash-এর নিজের page অনুযায়ী, ন্যূনতম প্রতি faculty অনুযায়ী ঠিক হয়, university-wide না।') },
      { title: b('Apply online through Monash’s own application system', 'Monash-এর নিজস্ব application system-এর মাধ্যমে অনলাইনে আবেদন করুন'), body: b('Tuition is published directly on each course’s own fee page.', 'Tuition সরাসরি প্রতিটি course-এর নিজের fee page-এ প্রকাশিত হয়।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [MY_MONASH_ENTRY, MY_MONASH_FEES],
  },
  programs: [MONASH_BCS],
  lastVerified: READ,
};

export const MY_UNI_LAYER: CountryUniversityLayer = {
  code: 'MY',
  universities: [MONASH, UKM, UM, UPM, UTM],
  visaStats: [],
  unverified: [
    {
      id: 'my-bd-visa-approval-rate',
      label: b('Bangladesh-specific Student Pass/eVAL approval or refusal rate', 'বাংলাদেশ-নির্দিষ্ট Student Pass/eVAL অনুমোদন বা প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific approval-rate figure, or a verified country-wide international-student headcount broken down by nationality from an official Malaysian source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'my-minimum-funds-figure',
      label: b('Official minimum bank-balance / proof-of-funds figure for a Student Pass', 'Student Pass-এর জন্য official ন্যূনতম bank-balance / proof-of-funds সংখ্যা'),
      status: 'not-verified',
      note: 'EMGS’s own "Required Documents" page, which itemizes everything needed for a Student Pass application, does not list a bank-statement or minimum-funds requirement; institutions instead manage a refundable personal bond with the Immigration Department whose exact country-specific amount was not independently read from the linked fee document for this guide.',
    },
    {
      id: 'my-ukm-utm-admission-detail',
      label: b('UKM’s and UTM’s own full international-admissions process and fee schedule', 'UKM আর UTM-এর নিজস্ব সম্পূর্ণ international-admissions process আর fee schedule'),
      status: 'needs-review',
      note: 'UKM’s and UTM’s QS World University Rankings profiles were read and verified, but their own international-admissions and fee pages (ukm.my, admission.utm.my) were not independently read in full detail for this guide — their tuition, deadlines and admission routes are left not-verified rather than estimated from third-party sources.',
    },
  ],
  lastVerified: READ,
};

import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, ProgramProfile, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import {
  AT_BMFWF_TUITION,
  AT_JKU_DEADLINES,
  AT_JKU_INTL,
  AT_JKU_QS,
  AT_OEAD_RESIDENCE_STUDENT,
  AT_READ,
  AT_TUGRAZ_ADMISSION_PERIODS,
  AT_TUGRAZ_OVERVIEW,
  AT_TUGRAZ_QS,
  AT_TUWIEN,
  AT_TUWIEN_MASTERS,
  AT_TUWIEN_OTHER_BACHELOR,
  AT_TUWIEN_QS,
  AT_UIBK,
  AT_UIBK_DEADLINES,
  AT_UIBK_QS,
  AT_UIBK_THIRD_COUNTRIES,
  AT_UNIVIE,
  AT_UNIVIE_COUNTRY_SPECIFIC,
  AT_UNIVIE_QS,
} from './at-sources';

/**
 * Austria: university → program layer, built the same way as Hungary's,
 * Switzerland's, the Netherlands', Ireland's, France's, Czech Republic's,
 * Slovenia's, Lithuania's, Germany's and South Korea's (lib/content/
 * hu-unis.ts, ch-unis.ts, nl-unis.ts, ie-unis.ts, fr-unis.ts, cz-unis.ts,
 * si-unis.ts, lt-unis.ts, de-unis.ts, kr-unis.ts). Rankings are QS World
 * University Rankings 2027 as printed on each institution's
 * topuniversities.com profile. Unlike Hungary, where each university sets
 * its own tuition fee, Austria fixes the non-EU degree-student tuition
 * figure by national law (EUR 726.72/semester plus the EUR 24.70 ÖH fee) —
 * the same at every public university here — so that figure is repeated
 * per university rather than researched separately for each one. Admission
 * deadlines, requirements and language rules are genuinely
 * institution-specific and come from each institution's own official
 * pages. Anything that could not be verified on an official page is left
 * marked unverified — never guessed.
 */

const READ = AT_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the institution’s official admissions page.', 'যাচাই হয়নি — institution-এর official admissions page দেখুন।', 'not-verified', sources);
const NATIONAL_TUITION_TEXT = b(
  'Set by national law, not by this institution: EUR 726.72 per semester for non-EU degree students holding a Residence Permit – Student, plus the mandatory EUR 24.70 ÖH (Austrian Students’ Union) fee charged to every student — the same figure at every Austrian public university. Austria’s own "Order on Tuition Fees" may waive this for citizens of countries on the OECD DAC list of Least Developed Countries, a list Bangladesh remains on as of this guide’s read date, though this was not independently confirmed on the ordinance’s own text.',
  'এই institution দিয়ে না, জাতীয় আইন দিয়ে ঠিক: Residence Permit – Student থাকা non-EU degree student-দের জন্য প্রতি সেমিস্টারে EUR 726.72, সঙ্গে সব student-কে চার্জ করা বাধ্যতামূলক EUR 24.70 ÖH (Austrian Students\' Union) fee — প্রতিটি Austrian public university-তে একই সংখ্যা। Austria-র নিজের "Order on Tuition Fees" OECD DAC list of Least Developed Countries-এ থাকা দেশের নাগরিকদের জন্য এটা মাফ করতে পারে, এই guide-এর read date পর্যন্ত Bangladesh যে তালিকায় আছে, যদিও এটা ordinance-এর নিজের লেখায় স্বাধীনভাবে নিশ্চিত হয়নি।',
);
const VISA_STEP = {
  title: b('Apply for Austria’s Residence Permit – Student', 'Austria-র Residence Permit – Student-এর আবেদন করুন'),
  body: b('Once admitted, apply in person before the competent Austrian representative authority (embassy or consulate) in your country of residence for the "Residence Permit – Student" (Aufenthaltsbewilziehung – Student). OeAD’s own checklist states a decision period of 90 days, extended by a further 90 days if additional documents are needed, and a non-refundable application fee of EUR 218. See the Austria student-visa section on the country page.', 'ভর্তি হলে, আপনার বসবাসের দেশে দায়িত্বে থাকা Austrian representative authority (embassy বা consulate)-এ ব্যক্তিগতভাবে "Residence Permit – Student"-এর আবেদন করুন। OeAD-এর নিজের checklist বলে সিদ্ধান্তের সময়কাল 90 দিন, অতিরিক্ত document লাগলে আরো 90 দিন বাড়ে, আর একটি non-refundable application fee EUR 218। Country page-এর Austria student-visa অংশ দেখুন।'),
};

// ------------------------------------------------------------------ universities

const UNIVIE: UniversityProfile = {
  id: 'at-univie',
  countryCode: 'AT',
  name: 'University of Vienna',
  city: 'Vienna',
  ownership: 'public',
  officialUrl: 'https://studieren.univie.ac.at/en/admission-procedure/',
  admissionsUrl: AT_UNIVIE.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=140', sourceUrl: AT_UNIVIE_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Austria’s oldest and largest university, founded in 1365, offering 178 degree programmes across sciences, humanities, social sciences and law, with around 45,700 students, over 17,900 of them international, from roughly 130 countries.',
    'Austria-র সবচেয়ে পুরনো আর সবচেয়ে বড় university, 1365 সালে প্রতিষ্ঠিত, sciences, humanities, social sciences, আর law জুড়ে 178টা degree programme দেয়, প্রায় 45,700 student সহ, যার 17,900-র বেশি international, প্রায় 130টা দেশ থেকে।',
  ),
  tuition: { ...txt(NATIONAL_TUITION_TEXT.en, NATIONAL_TUITION_TEXT.bn, 'verified', [AT_BMFWF_TUITION]), money: { amount: 726.72, currency: 'EUR', period: 'semester' } },
  deadlines: txt('Application periods depend on your chosen degree programme, whether it runs an entrance exam or selection procedure, and your citizenship — the University of Vienna’s own "find your programme" and deadlines pages give the exact window per programme, not one single university-wide date.', 'Application period আপনার বাছা degree programme, এতে একটি entrance exam বা selection procedure চলে কিনা, আর আপনার নাগরিকত্বের উপর নির্ভর করে — University of Vienna-র নিজের "find your programme" আর deadlines page প্রতি programme-এ সঠিক window দেয়, একটি single university-wide তারিখ না।', 'partly-verified', [AT_UNIVIE]),
  nextIntake: intake('confirmed', [AT_UNIVIE], b('Set per programme — check the study profile for your chosen degree', 'প্রতি programme অনুযায়ী ঠিক — আপনার বাছা degree-র জন্য study profile দেখুন')),
  admission: txt('Applications go through u:space, the University of Vienna’s student portal, after confirming the programme-specific requirements (documents, language proficiency, application period) via the degree programme’s own study profile and, for Master’s programmes, the Master Access Guide (MAG). Some countries have additional country-specific document requirements listed on the university’s own page (e.g. China, Türkiye); a Bangladesh-specific entry was not found there for this guide.', 'Programme-specific শর্ত (document, language proficiency, application period) degree programme-এর নিজের study profile আর, Master\'s programme-এর জন্য, Master Access Guide (MAG)-এর মাধ্যমে নিশ্চিত করার পর, u:space, University of Vienna-র student portal-এর মাধ্যমে application জমা দিতে হয়। কিছু দেশের university-র নিজের page-এ তালিকাভুক্ত অতিরিক্ত country-specific document শর্ত আছে (যেমন China, Türkiye); এই guide-এর জন্য সেখানে একটি Bangladesh-specific entry পাওয়া যায়নি।', 'partly-verified', [AT_UNIVIE, AT_UNIVIE_COUNTRY_SPECIFIC]),
  english: NOT_VERIFIED_FEE([AT_UNIVIE]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [AT_UNIVIE] },
  applicationFee: NOT_VERIFIED_FEE([AT_UNIVIE]),
  scholarships: txt('No University-of-Vienna-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide; OeAD’s own, broader Ernst Mach Grant family is the closest national offer, and it funds short study periods or research stays, not a complete degree.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য University-of-Vienna-specific একটি full-degree scholarship পাওয়া যায়নি; OeAD-এর নিজের, বিস্তৃত Ernst Mach Grant family সবচেয়ে কাছের জাতীয় offer, আর এটা সংক্ষিপ্ত study period বা research stay funds করে, একটি সম্পূর্ণ degree না।', 'not-verified', [AT_UNIVIE]),
  applicationRoute: txt('Online application via u:space after checking the degree programme’s own study profile and deadlines page.', 'Degree programme-এর নিজের study profile আর deadlines page দেখার পর u:space-এর মাধ্যমে online application।', 'verified', [AT_UNIVIE]),
  steps: {
    items: [
      { title: b('Find your degree programme and check its study profile', 'আপনার degree programme খুঁজুন আর তার study profile দেখুন'), body: b('Each programme’s study profile states its exact deadlines, study places and any entrance exam or selection procedure.', 'প্রতিটি programme-এর study profile তার সঠিক deadline, study place, আর কোনো entrance exam বা selection procedure বলে।') },
      { title: b('Check country-specific document requirements and prepare your application', 'Country-specific document শর্ত দেখুন আর আপনার application তৈরি করুন'), body: b('Legalisation and translation of foreign documents can take time — start early.', 'বিদেশি document-এর legalisation আর translation সময় নিতে পারে — আগে থেকে শুরু করুন।') },
      { title: b('Apply via u:space within the application period', 'Application period-এর মধ্যে u:space-এর মাধ্যমে আবেদন করুন'), body: b('Upload all required documents in full.', 'সব প্রয়োজনীয় document সম্পূর্ণভাবে upload করুন।') },
      VISA_STEP,
    ],
    status: 'partly-verified',
    sources: [AT_UNIVIE],
  },
  programs: [],
  lastVerified: READ,
};

const TUWIEN_MASTERS_PROGRAM: ProgramProfile = {
  id: 'at-tuwien-masters-english',
  title: 'English-taught Master’s programmes (general)',
  level: 'masters',
  faculty: 'Varies by programme',
  languages: b('English', 'ইংরেজি'),
  englishOnly: true,
  duration: b('Set per programme', 'প্রতি programme অনুযায়ী ঠিক'),
  tuition: { ...txt(NATIONAL_TUITION_TEXT.en, NATIONAL_TUITION_TEXT.bn, 'verified', [AT_BMFWF_TUITION]), money: { amount: 726.72, currency: 'EUR', period: 'semester' } },
  deadline: txt('Non-EU/EEA application window: 16 January–15 July 2026 for the Winter Semester 2026/27 intake; 16 July 2026–15 January 2027 for the Summer Semester 2027 intake.', 'Non-EU/EEA application window: Winter Semester 2026/27 intake-এর জন্য 16 January–15 July 2026; Summer Semester 2027 intake-এর জন্য 16 July 2026–15 January 2027।', 'verified', [AT_TUWIEN_MASTERS]),
  nextIntake: intake('confirmed', [AT_TUWIEN_MASTERS], b('Winter Semester 2026/27 or Summer Semester 2027', 'Winter Semester 2026/27 বা Summer Semester 2027')),
  requirements: txt('A Bachelor’s degree (or equivalent) of at least 180 ECTS credits; non-EU citizens without a residence permit already in Austria must show proof of a valid residence permit, or of applying for one, at pre-registration.', 'অন্তত 180 ECTS credit-এর একটি Bachelor\'s degree (বা সমতুল্য); Austria-তে এখনো residence permit না থাকা non-EU নাগরিকদের pre-registration-এ একটি valid residence permit-এর প্রমাণ, বা তার জন্য আবেদনের প্রমাণ দেখাতে হয়।', 'verified', [AT_TUWIEN_MASTERS, AT_TUWIEN_OTHER_BACHELOR]),
  english: txt('CEFR B2, e.g. IELTS Academic 6.5 or TOEFL iBT 87 (or 4.5 under a new scale valid since 21 January 2026).', 'CEFR B2, যেমন IELTS Academic 6.5 বা TOEFL iBT 87 (বা 21 January 2026 থেকে valid একটি নতুন স্কেলে 4.5)।', 'verified', [AT_TUWIEN_MASTERS]),
  applyVia: b('TU Wien’s own online application system (self-financed)', 'TU Wien-এর নিজস্ব online application system (self-financed)'),
  url: 'https://www.tuwien.at/en/studies/admission/masters-programmes',
  sources: [AT_TUWIEN_MASTERS],
  lastVerified: READ,
};

const TUWIEN: UniversityProfile = {
  id: 'at-tu-wien',
  countryCode: 'AT',
  name: 'TU Wien',
  city: 'Vienna',
  ownership: 'public',
  officialUrl: 'https://www.tuwien.at/en/studies/admission',
  admissionsUrl: AT_TUWIEN.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=191', sourceUrl: AT_TUWIEN_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Austria’s largest institute of technology, offering engineering, natural-sciences, computer-science, architecture and business-informatics programmes, with a large international student body.',
    'Austria-র সবচেয়ে বড় institute of technology, engineering, natural sciences, computer science, architecture, আর business-informatics programme দেয়, একটি বড় international student body সহ।',
  ),
  tuition: { ...txt(NATIONAL_TUITION_TEXT.en, NATIONAL_TUITION_TEXT.bn, 'verified', [AT_BMFWF_TUITION]), money: { amount: 726.72, currency: 'EUR', period: 'semester' } },
  deadlines: txt('Non-EU/EEA applicants: 16 January–15 July 2026 for the Winter Semester 2026/27 intake; 16 July 2026–15 January 2027 for the Summer Semester 2027 intake. The form of admission (and the exact deadline) also depends on whether you completed the Austrian Matura or a secondary education abroad.', 'Non-EU/EEA আবেদনকারী: Winter Semester 2026/27 intake-এর জন্য 16 January–15 July 2026; Summer Semester 2027 intake-এর জন্য 16 July 2026–15 January 2027। ভর্তির ধরন (আর সঠিক deadline)-ও নির্ভর করে আপনি Austrian Matura সম্পন্ন করেছেন বা বিদেশে secondary education সম্পন্ন করেছেন তার উপর।', 'verified', [AT_TUWIEN, AT_TUWIEN_MASTERS]),
  nextIntake: intake('confirmed', [AT_TUWIEN_MASTERS], b('Winter Semester 2026/27 or Summer Semester 2027', 'Winter Semester 2026/27 বা Summer Semester 2027')),
  admission: txt('For German-taught Bachelor’s programmes, non-EU applicants must prove German at CEFR A2 at application and reach C1 before final admission. For English-taught Master’s programmes, German proficiency is not required, but a relevant Bachelor’s degree of at least 180 ECTS credits is.', 'German-taught Bachelor\'s programme-এর জন্য, non-EU আবেদনকারীদের application-এ CEFR A2-এ German প্রমাণ করতে হয় আর পূর্ণ ভর্তির আগে C1-এ পৌঁছাতে হয়। English-taught Master\'s programme-এর জন্য, German দক্ষতা প্রয়োজন না, কিন্তু অন্তত 180 ECTS credit-এর একটি সম্পর্কিত Bachelor\'s degree লাগে।', 'verified', [AT_TUWIEN_MASTERS, AT_TUWIEN_OTHER_BACHELOR]),
  english: txt('English-taught Master’s programmes: CEFR B2, e.g. IELTS Academic 6.5 or TOEFL iBT 87 (or 4.5 under a new scale valid since 21 January 2026). German-taught Bachelor’s programmes: German A2 at application, C1 before final admission.', 'English-taught Master\'s programme: CEFR B2, যেমন IELTS Academic 6.5 বা TOEFL iBT 87 (বা 21 January 2026 থেকে valid একটি নতুন স্কেলে 4.5)। German-taught Bachelor\'s programme: application-এ German A2, পূর্ণ ভর্তির আগে C1।', 'verified', [AT_TUWIEN_MASTERS]),
  documents: {
    required: [b('Proof of German competence (German-taught programmes) or English proficiency (English-taught Master’s)', 'German competence-র প্রমাণ (German-taught programme) বা English দক্ষতা (English-taught Master\'s)'), b('Bachelor’s degree certificate/transcript (Master’s applicants)', 'Bachelor\'s degree সনদ/transcript (Master\'s আবেদনকারী)'), b('Valid residence permit, or evidence of applying for one (non-EU citizens not already resident)', 'Valid residence permit, বা তার জন্য আবেদনের প্রমাণ (এখনো resident না এমন non-EU নাগরিক)')],
    mayBeRequired: [b('Supplementary German examination evidence (transfer applicants)', 'Supplementary German examination-এর প্রমাণ (transfer আবেদনকারী)')],
    status: 'verified',
    sources: [AT_TUWIEN_OTHER_BACHELOR],
  },
  applicationFee: NOT_VERIFIED_FEE([AT_TUWIEN]),
  scholarships: txt('No TU-Wien-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য TU-Wien-specific একটি full-degree scholarship পাওয়া যায়নি।', 'not-verified', [AT_TUWIEN]),
  applicationRoute: txt('Online application via TU Wien’s own admission system, within its non-EU/EEA application window.', 'TU Wien-এর নিজস্ব admission system-এর মাধ্যমে online application, তার non-EU/EEA application window-এর মধ্যে।', 'verified', [AT_TUWIEN]),
  steps: {
    items: [
      { title: b('Check the form of admission for your background', 'আপনার background-এর জন্য ভর্তির ধরন দেখুন'), body: b('It depends on whether you completed the Austrian Matura or a secondary/Bachelor’s education abroad.', 'এটা নির্ভর করে আপনি Austrian Matura বা বিদেশে secondary/Bachelor\'s education সম্পন্ন করেছেন তার উপর।') },
      { title: b('Apply within the non-EU/EEA window (16 January–15 July 2026 for Winter Semester 2026/27)', 'Non-EU/EEA window-এর মধ্যে আবেদন করুন (Winter Semester 2026/27-এর জন্য 16 January–15 July 2026)'), body: b('Submit the required language and degree documents.', 'প্রয়োজনীয় ভাষা আর degree document জমা দিন।') },
      VISA_STEP,
      { title: b('Pre-register with your admission letter and residence permit', 'আপনার admission letter আর residence permit দিয়ে pre-register করুন'), body: b('Non-EU citizens show their valid residence permit at this step.', 'Non-EU নাগরিকরা এই পদক্ষেপে তাদের valid residence permit দেখান।') },
    ],
    status: 'verified',
    sources: [AT_TUWIEN, AT_TUWIEN_MASTERS, AT_TUWIEN_OTHER_BACHELOR],
  },
  programs: [TUWIEN_MASTERS_PROGRAM],
  lastVerified: READ,
};

const UIBK: UniversityProfile = {
  id: 'at-uibk',
  countryCode: 'AT',
  name: 'University of Innsbruck',
  city: 'Innsbruck',
  ownership: 'public',
  officialUrl: 'https://www.uibk.ac.at/en/admission-department/admission/',
  admissionsUrl: AT_UIBK.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '333', sourceUrl: AT_UIBK_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Western Austria’s largest university, with a broad range of Bachelor’s, Diploma, Master’s and Doctoral/PhD programmes and a dedicated admission department page for applicants with school-leaving certificates and degrees from third (non-EU/EEA) countries.',
    'Western Austria-র সবচেয়ে বড় university, বিস্তৃত Bachelor\'s, Diploma, Master\'s, আর Doctoral/PhD programme সহ, আর third (non-EU/EEA) দেশ থেকে school-leaving সনদ আর degree থাকা আবেদনকারীদের জন্য একটি নিবেদিত admission department page।',
  ),
  tuition: { ...txt(NATIONAL_TUITION_TEXT.en, NATIONAL_TUITION_TEXT.bn, 'verified', [AT_BMFWF_TUITION]), money: { amount: 726.72, currency: 'EUR', period: 'semester' } },
  deadlines: NOT_VERIFIED_FEE([AT_UIBK_DEADLINES]),
  nextIntake: intake('not-published', [AT_UIBK_DEADLINES]),
  admission: txt('The University of Innsbruck’s own page for "third countries" covers application with school-leaving certificates and university degrees issued outside the EU/EEA — the exact equivalence assessment and any entrance procedure are set per programme, and were not itemized in full detail on the pages read for this guide.', 'University of Innsbruck-এর নিজের "third countries" page EU/EEA-র বাইরে ইস্যু করা school-leaving সনদ আর university degree দিয়ে application কভার করে — সঠিক সমতুল্যতা মূল্যায়ন আর কোনো entrance procedure প্রতি programme অনুযায়ী ঠিক হয়, আর এই guide-এর জন্য পড়া page-এ সম্পূর্ণ বিস্তারিতভাবে তালিকাভুক্ত হয়নি।', 'partly-verified', [AT_UIBK_THIRD_COUNTRIES]),
  english: NOT_VERIFIED_FEE([AT_UIBK]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [AT_UIBK_THIRD_COUNTRIES] },
  applicationFee: NOT_VERIFIED_FEE([AT_UIBK]),
  scholarships: txt('No University-of-Innsbruck-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য University-of-Innsbruck-specific একটি full-degree scholarship পাওয়া যায়নি।', 'not-verified', [AT_UIBK]),
  applicationRoute: txt('Online application via the University of Innsbruck’s own admission system, after checking the third-countries page for your certificate type.', 'আপনার সনদের ধরনের জন্য third-countries page দেখার পর University of Innsbruck-এর নিজস্ব admission system-এর মাধ্যমে online application।', 'partly-verified', [AT_UIBK_THIRD_COUNTRIES]),
  steps: {
    items: [
      { title: b('Check the third-countries admission page for your certificate', 'আপনার সনদের জন্য third-countries admission page দেখুন'), body: b('Find out whether your school-leaving certificate or degree needs an equivalence assessment.', 'আপনার school-leaving সনদ বা degree-এর একটি সমতুল্যতা মূল্যায়ন লাগে কিনা জানুন।') },
      { title: b('Apply within the application and admission deadlines', 'Application আর admission deadline-এর মধ্যে আবেদন করুন'), body: b('Deadlines were not itemized in detail on the pages read for this guide — check the university’s own deadlines page.', 'এই guide-এর জন্য পড়া page-এ deadline বিস্তারিতভাবে তালিকাভুক্ত হয়নি — university-র নিজের deadlines page দেখুন।') },
      VISA_STEP,
    ],
    status: 'not-verified',
    sources: [AT_UIBK_THIRD_COUNTRIES, AT_UIBK_DEADLINES],
  },
  programs: [],
  lastVerified: READ,
};

const TUGRAZ: UniversityProfile = {
  id: 'at-tu-graz',
  countryCode: 'AT',
  name: 'Graz University of Technology (TU Graz)',
  city: 'Graz',
  ownership: 'public',
  officialUrl: 'https://www.tugraz.at/en/studying-and-teaching/studying-at-tu-graz/prospective-students/admission/overview-of-admission-to-degree-programmes-at-tu-graz',
  admissionsUrl: AT_TUGRAZ_OVERVIEW.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=409', sourceUrl: AT_TUGRAZ_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Founded in 1811, one of Austria’s leading technical universities, with around 13,000 students (roughly 2,000 international) across seven faculties, known for engineering and natural-sciences programmes.',
    '1811 সালে প্রতিষ্ঠিত, Austria-র শীর্ষ technical university-গুলোর একটা, প্রায় 13,000 student সহ (প্রায় 2,000 international) সাতটা faculty জুড়ে, engineering আর natural-sciences programme-এর জন্য পরিচিত।',
  ),
  tuition: { ...txt(NATIONAL_TUITION_TEXT.en, NATIONAL_TUITION_TEXT.bn, 'verified', [AT_BMFWF_TUITION]), money: { amount: 726.72, currency: 'EUR', period: 'semester' } },
  deadlines: txt('TU Graz runs separate admission periods by programme type: for one intake, Bachelor’s admission without an admission procedure runs 11 January–5 February 2027 and Master’s admission 11 January–30 April 2027; for another intake, Master’s admission runs 6 July–30 November 2026, per TU Graz’s own admission-periods page.', 'TU Graz programme-এর ধরন অনুযায়ী আলাদা admission period চালায়: এক intake-এর জন্য, admission procedure ছাড়া Bachelor\'s admission 11 January–5 February 2027 আর Master\'s admission 11 January–30 April 2027 চলে; আরেক intake-এর জন্য, TU Graz-এর নিজের admission-periods page অনুযায়ী Master\'s admission 6 July–30 November 2026 চলে।', 'verified', [AT_TUGRAZ_ADMISSION_PERIODS]),
  nextIntake: intake('confirmed', [AT_TUGRAZ_ADMISSION_PERIODS], b('Winter or summer semester, depending on programme and admission period', 'Winter বা summer semester, programme আর admission period অনুযায়ী')),
  admission: NOT_VERIFIED_FEE([AT_TUGRAZ_OVERVIEW]),
  english: NOT_VERIFIED_FEE([AT_TUGRAZ_OVERVIEW]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [AT_TUGRAZ_OVERVIEW] },
  applicationFee: NOT_VERIFIED_FEE([AT_TUGRAZ_OVERVIEW]),
  scholarships: txt('No TU-Graz-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য TU-Graz-specific একটি full-degree scholarship পাওয়া যায়নি।', 'not-verified', [AT_TUGRAZ_OVERVIEW]),
  applicationRoute: txt('Online application via TU Graz’s own admission system, within the admission period that matches your programme type.', 'আপনার programme-এর ধরনের সাথে মিলে এমন admission period-এর মধ্যে TU Graz-এর নিজস্ব admission system-এর মাধ্যমে online application।', 'verified', [AT_TUGRAZ_ADMISSION_PERIODS]),
  steps: {
    items: [
      { title: b('Identify the right admission period for your programme type', 'আপনার programme-এর ধরনের জন্য সঠিক admission period চিহ্নিত করুন'), body: b('Bachelor’s and Master’s programmes, and programmes with or without an admission procedure, run different windows.', 'Bachelor\'s আর Master\'s programme, আর admission procedure থাকা বা না থাকা programme, আলাদা window চালায়।') },
      { title: b('Apply within that window', 'সেই window-এর মধ্যে আবেদন করুন'), body: b('Requirements beyond the admission period were not itemized in detail on the pages read for this guide.', 'এই guide-এর জন্য পড়া page-এ admission period-এর বাইরে শর্ত বিস্তারিতভাবে তালিকাভুক্ত হয়নি।') },
      VISA_STEP,
    ],
    status: 'partly-verified',
    sources: [AT_TUGRAZ_ADMISSION_PERIODS, AT_TUGRAZ_OVERVIEW],
  },
  programs: [],
  lastVerified: READ,
};

const JKU: UniversityProfile = {
  id: 'at-jku-linz',
  countryCode: 'AT',
  name: 'Johannes Kepler University Linz (JKU)',
  city: 'Linz',
  ownership: 'public',
  officialUrl: 'https://www.jku.at/en/degree-programs/international-students/international-students/',
  admissionsUrl: AT_JKU_INTL.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=458', sourceUrl: AT_JKU_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A comparatively young university (founded 1966) with faculties of social sciences/economics/business, law, engineering/natural sciences and medicine (opened 2014), known for its law programme and its park-like single campus.',
    'তুলনামূলকভাবে একটি নতুন university (1966 সালে প্রতিষ্ঠিত) social sciences/economics/business, law, engineering/natural sciences, আর medicine (2014 সালে খোলা) faculty সহ, তার law programme আর park-like single campus-এর জন্য পরিচিত।',
  ),
  tuition: { ...txt(NATIONAL_TUITION_TEXT.en, NATIONAL_TUITION_TEXT.bn, 'verified', [AT_BMFWF_TUITION]), money: { amount: 726.72, currency: 'EUR', period: 'semester' } },
  deadlines: txt('General admission period for the winter semester 2026/27: 8 July–31 October 2026 (extendable to 31 October 2026 for special cases, per JKU’s own notes); for the summer semester 2026: 7 January–5 February 2026 (extendable to 31 March 2026 in special cases). Master’s-programme applicants follow the same general windows with their own start dates, per JKU’s own dates-and-deadlines page.', 'Winter semester 2026/27-এর জন্য সাধারণ admission period: 8 July–31 October 2026 (JKU-এর নিজের নোট অনুযায়ী বিশেষ ক্ষেত্রে 31 October 2026 পর্যন্ত বাড়ানো যায়); summer semester 2026-এর জন্য: 7 January–5 February 2026 (বিশেষ ক্ষেত্রে 31 March 2026 পর্যন্ত বাড়ানো যায়)। Master\'s-programme আবেদনকারীরা JKU-এর নিজের dates-and-deadlines page অনুযায়ী তাদের নিজের শুরুর তারিখ সহ একই সাধারণ window অনুসরণ করেন।', 'verified', [AT_JKU_DEADLINES]),
  nextIntake: intake('confirmed', [AT_JKU_DEADLINES], b('Winter semester 2026/27 or summer semester 2026/27', 'Winter semester 2026/27 বা summer semester 2026/27')),
  admission: txt('JKU’s own international-students page states that application submissions must always be made by the applicants themselves and are free of charge; the exact academic requirements per programme (equivalence of secondary or Bachelor’s qualifications) were not itemized in full detail on the pages read for this guide.', 'JKU-এর নিজের international-students page বলে application submission সবসময় আবেদনকারী নিজেই করতে হয় আর তা বিনামূল্যে; প্রতি programme-এর সঠিক academic শর্ত (secondary বা Bachelor\'s যোগ্যতার সমতুল্যতা) এই guide-এর জন্য পড়া page-এ সম্পূর্ণ বিস্তারিতভাবে তালিকাভুক্ত হয়নি।', 'partly-verified', [AT_JKU_INTL]),
  english: NOT_VERIFIED_FEE([AT_JKU_INTL]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [AT_JKU_INTL] },
  applicationFee: txt('JKU’s own page states application submissions are free of charge.', 'JKU-এর নিজের page বলে application submission বিনামূল্যে।', 'verified', [AT_JKU_INTL]),
  scholarships: txt('No JKU-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য JKU-specific একটি full-degree scholarship পাওয়া যায়নি।', 'not-verified', [AT_JKU_INTL]),
  applicationRoute: txt('Direct, self-submitted online application via JKU’s own system, within the general admission period for your intended semester.', 'আপনার ইচ্ছিত semester-এর সাধারণ admission period-এর মধ্যে JKU-এর নিজস্ব system-এর মাধ্যমে সরাসরি, নিজে-জমা-দেওয়া online application।', 'verified', [AT_JKU_INTL, AT_JKU_DEADLINES]),
  steps: {
    items: [
      { title: b('Check the dates-and-deadlines page for your intended semester', 'আপনার ইচ্ছিত semester-এর জন্য dates-and-deadlines page দেখুন'), body: b('Winter and summer semesters have different, specific windows, with limited extensions for special cases.', 'Winter আর summer semester-এর আলাদা, নির্দিষ্ট window আছে, বিশেষ ক্ষেত্রে সীমিত extension সহ।') },
      { title: b('Submit your own application — it is free of charge', 'আপনার নিজের application জমা দিন — এটা বিনামূল্যে'), body: b('Applications must be submitted by the applicant themselves, per JKU’s own page.', 'JKU-এর নিজের page অনুযায়ী, application আবেদনকারী নিজেকেই জমা দিতে হয়।') },
      VISA_STEP,
    ],
    status: 'partly-verified',
    sources: [AT_JKU_INTL, AT_JKU_DEADLINES],
  },
  programs: [],
  lastVerified: READ,
};

export const AT_UNI_LAYER: CountryUniversityLayer = {
  code: 'AT',
  universities: [JKU, TUGRAZ, TUWIEN, UIBK, UNIVIE],
  visaStats: [],
  unverified: [
    {
      id: 'at-bd-visa-approval-rate',
      label: b('Bangladesh-specific residence-permit approval or refusal rate', 'বাংলাদেশ-নির্দিষ্ট residence-permit অনুমোদন বা প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific approval-rate figure, or a verified country-wide international-student headcount broken down by nationality from an official Austrian source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'at-minimum-funds-amount',
      label: b('A single official nationwide minimum-funds figure for the student residence permit', 'Student residence permit-এর জন্য একটি একক official জাতীয় ন্যূনতম-funds সংখ্যা'),
      status: 'not-verified',
      note: 'Migration.gv.at lists "sufficient means of subsistence" as a general requirement, and OeAD’s own checklist points to proof of funds without naming a figure; no single official amount specific to students was found on the pages read for this guide.',
    },
    {
      id: 'at-ldc-waiver-bangladesh-confirmed',
      label: b('Direct confirmation that the Least-Developed-Countries tuition waiver names Bangladesh', 'Least-Developed-Countries tuition waiver Bangladesh-কে নাম দেয় তার সরাসরি নিশ্চিতকরণ'),
      status: 'needs-review',
      note: 'The Federal Ministry’s own tuition-fee page confirms the waiver exists for countries on the OECD DAC list of Least Developed Countries, and Bangladesh remains an officially designated LDC as of this guide’s read date (scheduled to graduate 24 November 2026) — but the Austrian ordinance’s own country list, and the current OECD DAC list itself, were not independently read for this guide, so Bangladesh’s inclusion is a strong possibility, not a directly confirmed fact.',
    },
  ],
  lastVerified: READ,
};

import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, ProgramProfile, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import {
  FR_IPPARIS_QS,
  FR_POLYTECHNIQUE_BSC,
  FR_READ,
  FR_SACLAY_FEES,
  FR_SACLAY_MASTERS,
  FR_SCIENCESPO_FEES,
  FR_SCIENCESPO_GRAD,
  FR_SCIENCESPO_UG,
  FR_SORBONNE_EXEMPTION,
  FR_SORBONNE_FEES,
} from './fr-sources';

/**
 * France: university → program layer, built the same way as the Czech
 * Republic's, Slovenia's, Lithuania's, Germany's and South Korea's
 * (lib/content/cz-unis.ts, si-unis.ts, lt-unis.ts, de-unis.ts, kr-unis.ts).
 * Rankings are QS World University Rankings 2027 as printed on each
 * institution's topuniversities.com profile. École Polytechnique no longer
 * has its own current QS profile (its own topuniversities.com page still
 * shows 2021 data): since 2019 it has been a founding school of the merged
 * Institut Polytechnique de Paris, which is the entity QS now ranks (#=43 in
 * the 2027 edition) — that rank is shown here for École Polytechnique with a
 * note, rather than reusing its stale 2021 figure. Tuition, deadlines and
 * requirements come from each institution's own official pages. Anything
 * that could not be verified on an official page is left marked unverified
 * — never guessed.
 */

const READ = FR_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const qs = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'ranking-publisher' });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the institution’s official admissions page.', 'যাচাই হয়নি — institution-এর official admissions page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Apply for the VLS-TS student visa through Études en France', 'Études en France-এর মাধ্যমে VLS-TS student visa-র আবেদন'),
  body: b('After admission, complete the "I am accepted" step on the Études en France portal (Bangladesh is on its country list), then apply for a VLS-TS student visa and validate it online within 3 months of arriving in France. See the France student-visa section on the country page.', 'ভর্তির পর, Études en France portal-এ "I am accepted" পদক্ষেপ সম্পূর্ণ করুন (Bangladesh এর country list-এ আছে), তারপর VLS-TS student visa-র আবেদন করুন আর France-এ পৌঁছানোর 3 মাসের মধ্যে অনলাইনে validate করুন। Country page-এর France student-visa অংশ দেখুন।'),
};

// ------------------------------------------------------------------ sources

const QS_SORBONNE = qs('QS World University Rankings 2027 – Sorbonne University (topuniversities.com)', 'https://www.topuniversities.com/universities/sorbonne-university');
const QS_SACLAY = qs('QS World University Rankings 2027 – Université Paris-Saclay (topuniversities.com)', 'https://www.topuniversities.com/universities/universite-paris-saclay');
const QS_SCIENCESPO = qs('QS World University Rankings 2027 – Sciences Po (topuniversities.com)', 'https://www.topuniversities.com/universities/sciences-po-paris');
const QS_IPPARIS = FR_IPPARIS_QS;

// ------------------------------------------------------------------ universities

const SORBONNE: UniversityProfile = {
  id: 'fr-sorbonne',
  countryCode: 'FR',
  name: 'Sorbonne Université',
  city: 'Paris',
  ownership: 'public',
  officialUrl: 'https://www.sorbonne-universite.fr/en',
  admissionsUrl: FR_SORBONNE_FEES.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '73', sourceUrl: QS_SORBONNE.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A large, comprehensive public research university formed by the 2018 merger of Paris-Sorbonne and Pierre & Marie Curie universities, with faculties spanning arts and humanities, health sciences, and science and engineering. About 10,200 of its roughly 53,400 students are international.',
    '2018-এ Paris-Sorbonne আর Pierre & Marie Curie university-র merger-এ তৈরি একটি বড়, comprehensive public research university, arts and humanities, health sciences, আর science and engineering জুড়ে faculty সহ। এর প্রায় 53,400 student-এর মধ্যে প্রায় 10,200 international।',
  ),
  tuition: {
    ...txt(
      'The national registration fee for 2026/2027 is EUR 178/year (Bachelor’s), EUR 255/year (Master’s) or EUR 398/year (Doctorate), set by the French Ministries of Higher Education and of Economy and Finance and paid by every student. On top of that, non-EU/EEA/Swiss/Monegasque/Andorran/Quebec students pay the "droits différenciés" surcharge introduced nationally in 2019, unless exempt — but Sorbonne Université’s Governing Board voted on 7 July 2026 to grant a full or partial exemption to every non-EU applicant who applies and meets its criteria (financial resources, health, distance from family, family difficulty, disability), so a Bangladeshi applicant who successfully applies for the exemption pays only the national fee. Doctoral students, refugees, and several other categories are automatically exempt from the surcharge regardless.',
      '2026/2027-এর জাতীয় registration fee বছরে EUR 178 (Bachelor\'s), EUR 255 (Master\'s) বা EUR 398 (Doctorate), French Ministries of Higher Education আর Economy and Finance ঠিক করে আর প্রতিটি student দেয়। তার উপর, non-EU/EEA/Swiss/Monegasque/Andorran/Quebec student-রা 2019-এ জাতীয়ভাবে চালু করা "droits différenciés" surcharge দেন, exempt না হলে — কিন্তু Sorbonne Université-র Governing Board 7 July 2026-এ আবেদন করা আর এর criteria (financial resources, health, family থেকে দূরত্ব, family difficulty, disability) পূরণ করা প্রতিটি non-EU আবেদনকারীকে পূর্ণ বা আংশিক exemption দেওয়ার ভোট দিয়েছে, তাই exemption আবেদন সফল হওয়া একজন Bangladeshi আবেদনকারী শুধু জাতীয় fee দেন। Doctoral student, refugee, আর আরও কয়েকটি category নির্বিশেষে স্বয়ংক্রিয়ভাবে surcharge থেকে exempt।',
      'verified',
      [FR_SORBONNE_FEES, FR_SORBONNE_EXEMPTION],
    ),
  },
  deadlines: NOT_VERIFIED_FEE([FR_SORBONNE_FEES]),
  nextIntake: intake('varies', [FR_SORBONNE_FEES]),
  admission: txt(
    'Admission procedures and deadlines vary by faculty (Arts and Humanities, Health, or Science and Engineering) and level (Bachelor’s, Master’s, Doctoral), and are reset every year in the university’s own decree on application and enrolment timetables. Applicants must also pay the compulsory annual CVEC (Student and Campus Life Contribution) to CROUS before enrolling.',
    'ভর্তির প্রক্রিয়া আর শেষ তারিখ faculty (Arts and Humanities, Health, বা Science and Engineering) আর level (Bachelor\'s, Master\'s, Doctoral) অনুযায়ী আলাদা, আর university-র নিজস্ব application and enrolment timetable-এর decree-তে প্রতি বছর নতুন করে ঠিক হয়। আবেদনকারীদের ভর্তির আগে CROUS-কে বাধ্যতামূলক বার্ষিক CVEC (Student and Campus Life Contribution)-ও দিতে হয়।',
    'verified',
    [FR_SORBONNE_FEES],
  ),
  english: NOT_VERIFIED_FEE([FR_SORBONNE_FEES]),
  documents: {
    required: [b('Académique records and prior certificates/diplomas', 'Academic record আর আগের সনদ/diploma'), b('Completed Études en France / institutional application', 'সম্পূর্ণ করা Études en France / institutional application'), b('CVEC payment receipt, before enrolment', 'CVEC payment-এর receipt, ভর্তির আগে')],
    mayBeRequired: [b('English or French language proficiency proof, where the programme requires it', 'প্রয়োজনে English বা French ভাষার দক্ষতার প্রমাণ'), b('An application for the non-EU tuition-fee exemption', 'non-EU tuition-fee exemption-এর জন্য একটি application')],
    status: 'partly-verified',
    sources: [FR_SORBONNE_FEES, FR_SORBONNE_EXEMPTION],
  },
  applicationFee: NOT_VERIFIED_FEE([FR_SORBONNE_FEES]),
  scholarships: txt(
    'Sorbonne Université’s own exemption scheme can reduce a non-EU student’s tuition to the national fee; it is a fee exemption, not a living-cost scholarship. No separate Sorbonne scholarship specifically for Bangladeshi students was found on the pages read.',
    'Sorbonne Université-র নিজস্ব exemption scheme একজন non-EU student-এর tuition জাতীয় fee-তে কমাতে পারে; এটা একটা fee exemption, থাকা-খাওয়ার খরচের scholarship না। Bangladesh-এর student-দের জন্য বিশেষভাবে আলাদা কোনো Sorbonne scholarship পড়া page-এ পাওয়া যায়নি।',
    'partly-verified',
    [FR_SORBONNE_EXEMPTION],
  ),
  applicationRoute: txt('Each faculty runs its own application process; non-French-Baccalaureate international applicants also register via the Études en France platform where required.', 'প্রতিটি faculty নিজস্ব application process চালায়; non-French-Baccalaureate international আবেদনকারীরা প্রয়োজনে Études en France platform-এও register করেন।', 'partly-verified', [FR_SORBONNE_FEES]),
  steps: {
    items: [
      { title: b('Choose a faculty and programme', 'একটি faculty আর programme বাছুন'), body: b('Arts and Humanities, Health, or Science and Engineering; each sets its own English-taught offerings and requirements.', 'Arts and Humanities, Health, বা Science and Engineering; প্রতিটি নিজস্ব ইংরেজি-মাধ্যম offering আর শর্ত ঠিক করে।') },
      { title: b('Apply via Études en France and the faculty’s own process', 'Études en France আর faculty-র নিজস্ব process দিয়ে আবেদন করুন'), body: b('Bangladesh is on Campus France’s list of countries where this platform is required alongside the institution’s own admissions route.', 'Bangladesh Campus France-র তালিকার একটি দেশ যেখানে institution-এর নিজস্ব admissions route-এর সাথে এই platform লাগে।') },
      { title: b('Apply for the non-EU tuition-fee exemption, if eligible', 'যোগ্য হলে non-EU tuition-fee exemption-এর আবেদন করুন'), body: b('Via the Student Life and Student Associations support platform, under the campaign for non-EU differentiated-fee exemptions.', 'Student Life and Student Associations support platform-এর মাধ্যমে, non-EU differentiated-fee exemption-এর campaign-এর অধীনে।') },
      { title: b('Pay the CVEC before enrolling', 'ভর্তির আগে CVEC দিন'), body: b('A compulsory annual contribution paid to CROUS.', 'CROUS-কে দেওয়া একটি বাধ্যতামূলক বার্ষিক contribution।') },
      VISA_STEP,
      { title: b('Complete administrative enrolment', 'Administrative enrolment সম্পূর্ণ করুন'), body: b('The process varies by faculty and level; follow the university’s own enrolment guides.', 'প্রক্রিয়া faculty আর level অনুযায়ী আলাদা; university-র নিজস্ব enrolment guide অনুসরণ করুন।') },
    ],
    status: 'verified',
    sources: [FR_SORBONNE_FEES],
  },
  programs: [],
  lastVerified: READ,
};

const SACLAY: UniversityProfile = {
  id: 'fr-saclay',
  countryCode: 'FR',
  name: 'Université Paris-Saclay',
  city: 'Gif-sur-Yvette',
  ownership: 'public',
  officialUrl: 'https://www.universite-paris-saclay.fr/en',
  admissionsUrl: FR_SACLAY_MASTERS.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '76', sourceUrl: QS_SACLAY.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A large public research university and grouping formed around Paris-Saclay, bringing together faculties, grandes écoles (including CentraleSupélec, ENS Paris-Saclay and AgroParisTech) and IUTs, with a strong focus on science and engineering alongside other disciplines.',
    'Paris-Saclay-এর চারপাশে তৈরি একটি বড় public research university আর grouping, faculty, grande école (CentraleSupélec, ENS Paris-Saclay আর AgroParisTech-সহ), আর IUT একসাথে নিয়ে, অন্য বিষয়ের সাথে science and engineering-এর উপর জোর দিয়ে।',
  ),
  tuition: {
    ...txt(
      'National fees for 2025–2026 are EUR 178 (Bachelor’s), EUR 254 (Master’s) and EUR 397 (Doctorate) a year, set by ministerial decree; 2026/2027 fees were "coming soon" on the university’s own page at the time of this research. Non-EU students subject to the "droits différenciés" surcharge are eligible for a partial exemption bringing their fee in line with the domestic rate, under the university’s own Board of Governors resolution (CA-2026-013, 3 February 2026) — the exact current waiver procedure for 2026/2027 was listed as "to be published shortly" on the page read.',
      '2025–2026-এর জাতীয় fee বছরে EUR 178 (Bachelor\'s), EUR 254 (Master\'s) আর EUR 397 (Doctorate), ministerial decree ঠিক করে; এই গবেষণার সময় university-র নিজের page-এ 2026/2027-এর fee "coming soon" ছিল। "Droits différenciés" surcharge-এর অধীন non-EU student-রা তাদের fee দেশীয় rate-এর সমান করা একটি partial exemption-এর যোগ্য, university-র নিজস্ব Board of Governors resolution (CA-2026-013, 3 February 2026)-এর অধীনে — পড়া page-এ 2026/2027-এর সঠিক বর্তমান waiver procedure "to be published shortly" বলা ছিল।',
      'partly-verified',
      [FR_SACLAY_FEES],
    ),
  },
  deadlines: NOT_VERIFIED_FEE([FR_SACLAY_MASTERS]),
  nextIntake: intake('varies', [FR_SACLAY_MASTERS]),
  admission: txt(
    'Which application platform you use depends on your nationality, country of residence and the exact Master’s programme: students from a country under the "Études en France" procedure (Bangladesh among them) apply first via the university’s own INCEPTION platform for the course’s starting dates, then, once admitted, complete the Études en France portal’s "I am accepted" section. Foreign applicants who have not studied at a French institution in the last two academic years must also give the contact details of two academic referees.',
    'কোন application platform ব্যবহার করবেন তা আপনার জাতীয়তা, থাকার দেশ, আর ঠিক কোন Master\'s programme তার উপর নির্ভর করে: "Études en France" procedure-এর আওতায় থাকা দেশের student-রা (Bangladesh তাদের মধ্যে) প্রথমে course-এর শুরুর তারিখের জন্য university-র নিজস্ব INCEPTION platform দিয়ে আবেদন করেন, তারপর, ভর্তি হলে, Études en France portal-এর "I am accepted" অংশ সম্পূর্ণ করেন। শেষ দুই শিক্ষাবর্ষে কোনো ফরাসি institution-এ পড়েননি এমন বিদেশি আবেদনকারীদের দুইজন academic referee-র যোগাযোগের তথ্যও দিতে হয়।',
    'verified',
    [FR_SACLAY_MASTERS],
  ),
  english: NOT_VERIFIED_FEE([FR_SACLAY_MASTERS]),
  documents: {
    required: [b('Prior-degree certificates and transcripts', 'আগের degree-র সনদ আর transcript'), b('Completed INCEPTION application, then the Études en France "I am accepted" section where required', 'সম্পূর্ণ করা INCEPTION application, তারপর প্রয়োজনে Études en France-এর "I am accepted" অংশ'), b('Two academic referees’ contact details, for applicants who have not studied in France in the last two years', 'শেষ দুই বছরে France-এ পড়েননি এমন আবেদনকারীদের জন্য দুইজন academic referee-র যোগাযোগের তথ্য')],
    mayBeRequired: [b('English-proficiency proof, where the programme requires it', 'প্রয়োজনে English-proficiency-র প্রমাণ')],
    status: 'partly-verified',
    sources: [FR_SACLAY_MASTERS],
  },
  applicationFee: NOT_VERIFIED_FEE([FR_SACLAY_MASTERS]),
  scholarships: NOT_VERIFIED_FEE([FR_SACLAY_FEES]),
  applicationRoute: txt('Online via the university’s own INCEPTION platform (and monmaster.gouv.fr for some Master’s 1 programmes not on the INCEPTION list for French/EU students); non-EU applicants under the Études en France procedure also complete that platform’s "I am accepted" section once admitted.', 'University-র নিজস্ব INCEPTION platform-এ online (আর French/EU student-দের জন্য INCEPTION তালিকায় নেই এমন কিছু Master\'s 1 programme-এর জন্য monmaster.gouv.fr); Études en France procedure-এর আওতায় থাকা non-EU আবেদনকারীরা ভর্তি হলে সেই platform-এর "I am accepted" অংশও সম্পূর্ণ করেন।', 'verified', [FR_SACLAY_MASTERS]),
  steps: {
    items: [
      { title: b('Choose a Master’s programme', 'একটি Master\'s programme বাছুন'), body: b('Check whether it is on the INCEPTION M1 list or uses monmaster.gouv.fr instead (for French/EU candidates).', 'এটা INCEPTION M1 তালিকায় আছে কিনা, বা French/EU আবেদনকারীদের জন্য এর বদলে monmaster.gouv.fr ব্যবহার করে কিনা দেখুন।') },
      { title: b('Apply via INCEPTION', 'INCEPTION-এর মাধ্যমে আবেদন করুন'), body: b('The university’s own platform for international and Études en France applicants.', 'International আর Études en France আবেদনকারীদের জন্য university-র নিজস্ব platform।') },
      { title: b('Complete the Études en France "I am accepted" section, if applicable', 'প্রযোজ্য হলে Études en France-এর "I am accepted" অংশ সম্পূর্ণ করুন'), body: b('Required for applicants from countries under the procedure, including Bangladesh.', 'Bangladesh-সহ procedure-এর আওতায় থাকা দেশের আবেদনকারীদের জন্য লাগে।') },
      { title: b('Apply for the differentiated-fee partial exemption, if eligible', 'যোগ্য হলে differentiated-fee partial exemption-এর আবেদন করুন'), body: b('Under the university’s own Board of Governors resolution.', 'University-র নিজস্ব Board of Governors resolution-এর অধীনে।') },
      VISA_STEP,
      { title: b('Complete enrolment', 'Enrolment সম্পূর্ণ করুন'), body: b('Pay tuition fees (by instalment if you choose) and the CVEC before the university’s deadline.', 'University-র শেষ তারিখের আগে tuition fee (চাইলে instalment-এ) আর CVEC দিন।') },
    ],
    status: 'verified',
    sources: [FR_SACLAY_MASTERS],
  },
  programs: [],
  lastVerified: READ,
};

const SCIENCESPO: UniversityProfile = {
  id: 'fr-sciencespo',
  countryCode: 'FR',
  name: 'Sciences Po',
  city: 'Paris',
  ownership: 'public',
  officialUrl: 'https://www.sciencespo.fr/en',
  admissionsUrl: FR_SCIENCESPO_FEES.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=354', sourceUrl: QS_SCIENCESPO.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A selective research university specialising in the social sciences and humanities (politics, economics, law, international affairs), with a seven-campus undergraduate network (Dijon, Le Havre, Menton, Nancy, Paris, Poitiers, Reims) and eight graduate schools in Paris. It sets its own tuition fees, entirely separate from the national public-university fee system.',
    'Social sciences and humanities (politics, economics, law, international affairs)-এ বিশেষজ্ঞ একটি selective research university, একটি সাত-campus undergraduate network (Dijon, Le Havre, Menton, Nancy, Paris, Poitiers, Reims) আর Paris-এ আটটি graduate school সহ। এটা জাতীয় public-university fee system থেকে সম্পূর্ণ আলাদা নিজস্ব tuition fee ঠিক করে।',
  ),
  tuition: {
    ...txt(
      'For students whose parents’ tax residence is outside the European Economic Area, Sciences Po charges a flat EUR 14,900/year at undergraduate level and EUR 20,640/year at graduate (Master’s) level for students enrolling in September 2026 — its own official tuition page states these rates apply to non-European students specifically, with no income-based reduction (that calculator is offered only to French/EEA-resident families). About 27% of all students receive a scholarship and 36% are exempt from tuition, but the page does not break this down by non-EU nationality.',
      'যাদের পিতা-মাতার tax residence European Economic Area-এর বাইরে, তাদের জন্য Sciences Po September 2026-এ ভর্তি হওয়া student-দের জন্য undergraduate level-এ একটি flat বছরে EUR 14,900 আর graduate (Master\'s) level-এ বছরে EUR 20,640 নেয় — এর নিজস্ব official tuition page বলে এই rate নির্দিষ্টভাবে non-European student-দের জন্য প্রযোজ্য, কোনো income-based ছাড় নেই (সেই calculator শুধু French/EEA-resident family-দের জন্য দেওয়া হয়)। সব student-এর প্রায় 27% scholarship পান আর 36% tuition থেকে exempt, কিন্তু page এটাকে non-EU জাতীয়তা অনুযায়ী ভাগ করে না।',
      'verified',
      [FR_SCIENCESPO_FEES],
    ),
    money: { amount: 14900, max: 20640, currency: 'EUR', period: 'year' },
  },
  deadlines: NOT_VERIFIED_FEE([FR_SCIENCESPO_UG]),
  nextIntake: intake('varies', [FR_SCIENCESPO_UG]),
  admission: txt(
    'Which admissions procedure you use depends on your own situation, not a single route: French-Baccalaureate candidates use Parcoursup for the undergraduate College, while candidates with a foreign secondary-school diploma (the Bangladeshi HSC route) apply via Sciences Po’s own admissions website. At graduate level, applicants with a non-French bachelor’s degree (or a master’s-level degree where their home system awards no undergraduate qualification) use the "international graduate admissions procedure," separate from the domestic one used by holders of a French undergraduate degree.',
    'কোন admissions procedure ব্যবহার করবেন তা আপনার নিজের পরিস্থিতির উপর নির্ভর করে, একক কোনো route না: French-Baccalaureate candidate-রা undergraduate College-এর জন্য Parcoursup ব্যবহার করেন, যদিও বিদেশি secondary-school diploma থাকা candidate-রা (Bangladeshi HSC route) Sciences Po-র নিজস্ব admissions website দিয়ে আবেদন করেন। Graduate level-এ, non-French bachelor\'s degree থাকা আবেদনকারীরা (বা নিজ system undergraduate যোগ্যতা না দিলে master\'s-level degree) "international graduate admissions procedure" ব্যবহার করেন, যা French undergraduate degree থাকা মানুষের দেশীয় procedure থেকে আলাদা।',
    'verified',
    [FR_SCIENCESPO_UG, FR_SCIENCESPO_GRAD],
  ),
  english: NOT_VERIFIED_FEE([FR_SCIENCESPO_UG]),
  documents: {
    required: [b('Foreign secondary-school diploma (or non-French bachelor’s degree for graduate applicants)', 'বিদেশি secondary-school diploma (বা graduate আবেদনকারীদের জন্য non-French bachelor\'s degree)'), b('Application via Sciences Po’s own admissions website or international graduate procedure', 'Sciences Po-র নিজস্ব admissions website বা international graduate procedure-এর মাধ্যমে application')],
    mayBeRequired: [b('Demonstrated command of English for English-taught programmes', 'ইংরেজি-মাধ্যম programme-এর জন্য দেখানো English দক্ষতা')],
    status: 'partly-verified',
    sources: [FR_SCIENCESPO_UG, FR_SCIENCESPO_GRAD],
  },
  applicationFee: NOT_VERIFIED_FEE([FR_SCIENCESPO_UG]),
  scholarships: txt(
    'Sciences Po states that limited financial resources should not be a barrier and that nearly one in three students receives a scholarship, with over EUR 11.5 million set aside for grants and financial aid; the exact share of that aid available to non-EU/Bangladeshi students specifically was not itemized on the page read.',
    'Sciences Po বলে সীমিত আর্থিক সামর্থ্য বাধা হওয়া উচিত না আর প্রায় তিনজনের একজন student scholarship পান, grant আর financial aid-এর জন্য EUR 11.5 million-এর বেশি রাখা হয়েছে; এই সাহায্যের ঠিক কতটা non-EU/Bangladeshi student-দের জন্য পাওয়া যায়, তা পড়া page-এ তালিকাভুক্ত ছিল না।',
    'partly-verified',
    [FR_SCIENCESPO_FEES],
  ),
  applicationRoute: txt('Parcoursup for French-Baccalaureate undergraduate candidates; Sciences Po’s own admissions website for a foreign-secondary-school undergraduate applicant; its international graduate admissions procedure for a non-French bachelor’s-degree holder applying to a Master’s programme.', 'French-Baccalaureate undergraduate candidate-দের জন্য Parcoursup; বিদেশি-secondary-school undergraduate আবেদনকারীর জন্য Sciences Po-র নিজস্ব admissions website; Master\'s programme-এ আবেদন করা non-French bachelor\'s-degree থাকা মানুষের জন্য এর international graduate admissions procedure।', 'verified', [FR_SCIENCESPO_UG, FR_SCIENCESPO_GRAD]),
  steps: {
    items: [
      { title: b('Identify your admissions pathway', 'আপনার admissions pathway চিহ্নিত করুন'), body: b('Foreign-secondary-school undergraduate applicants and non-French-bachelor’s graduate applicants each use their own procedure, not Parcoursup or the domestic graduate route.', 'বিদেশি-secondary-school undergraduate আবেদনকারী আর non-French-bachelor\'s graduate আবেদনকারী প্রত্যেকে নিজের procedure ব্যবহার করেন, Parcoursup বা দেশীয় graduate route না।') },
      { title: b('Submit your application on the correct platform', 'ঠিক platform-এ আপনার application জমা দিন'), body: b('Sciences Po’s own admissions website (undergraduate) or its international graduate admissions procedure (Master’s).', 'Sciences Po-র নিজস্ব admissions website (undergraduate) বা এর international graduate admissions procedure (Master\'s)।') },
      { title: b('Complete the Études en France portal, if applicable', 'প্রযোজ্য হলে Études en France portal সম্পূর্ণ করুন'), body: b('Bangladesh is on Campus France’s country list for this mandatory procedure.', 'এই বাধ্যতামূলক procedure-এর জন্য Bangladesh Campus France-র country list-এ আছে।') },
      VISA_STEP,
      { title: b('Confirm your place and pay tuition', 'আপনার জায়গা নিশ্চিত করুন আর tuition দিন'), body: b('EUR 14,900/year (undergraduate) or EUR 20,640/year (graduate) for non-European students, per Sciences Po’s own 2026/2027 tuition page.', 'Sciences Po-র নিজের 2026/2027 tuition page অনুযায়ী non-European student-দের জন্য বছরে EUR 14,900 (undergraduate) বা বছরে EUR 20,640 (graduate)।') },
    ],
    status: 'verified',
    sources: [FR_SCIENCESPO_UG, FR_SCIENCESPO_GRAD, FR_SCIENCESPO_FEES],
  },
  programs: [],
  lastVerified: READ,
};

const BSC: ProgramProfile = {
  id: 'fr-polytechnique-bsc',
  title: 'Bachelor of Science',
  level: 'bachelors',
  faculty: 'Mathematics and Science',
  languages: b('Entirely in English', 'সম্পূর্ণ ইংরেজিতে'),
  englishOnly: true,
  duration: b('3 years (180 ECTS)', '3 বছর (180 ECTS)'),
  tuition: {
    ...txt('EUR 15,900/year for EU students and EUR 19,200/year for non-EU students, per the programme’s own page, which notes rates are subject to change.', 'Programme-এর নিজের page অনুযায়ী EU student-দের জন্য বছরে EUR 15,900 আর non-EU student-দের জন্য বছরে EUR 19,200, যা বলে rate পরিবর্তনযোগ্য।', 'verified', [FR_POLYTECHNIQUE_BSC]),
    money: { amount: 19200, currency: 'EUR', period: 'year' },
  },
  deadline: NOT_VERIFIED_FEE([FR_POLYTECHNIQUE_BSC]),
  nextIntake: intake('confirmed', [FR_POLYTECHNIQUE_BSC], b('September', 'September')),
  requirements: txt('A highly selective, multidisciplinary programme for students with a strong interest in mathematics and science; the programme’s own page describes assessing team spirit, independent and collaborative work, perseverance and motivation during selection, on top of academic strength — it does not itemize a single exam or minimum grade.', 'গণিত আর বিজ্ঞানে প্রবল আগ্রহ থাকা student-দের জন্য একটি খুবই selective, multidisciplinary programme; programme-এর নিজের page academic strength-এর সাথে নির্বাচনের সময় team spirit, একা আর একসাথে কাজ করা, perseverance আর motivation মূল্যায়নের কথা বলে — এটা একটি একক exam বা ন্যূনতম grade তালিকাভুক্ত করে না।', 'partly-verified', [FR_POLYTECHNIQUE_BSC]),
  english: txt('The programme’s general admissions data lists IELTS 6.5+ or TOEFL iBT 90+ as its English benchmark.', 'Programme-এর সাধারণ admissions data এর English benchmark হিসেবে IELTS 6.5+ বা TOEFL iBT 90+ তালিকাভুক্ত করে।', 'partly-verified', [FR_POLYTECHNIQUE_BSC]),
  applyVia: b('École Polytechnique’s own candidatures.polytechnique.fr portal', 'École Polytechnique-এর নিজস্ব candidatures.polytechnique.fr portal'),
  url: 'https://programmes.polytechnique.edu/en/bachelor/bachelor-of-science',
  sources: [FR_POLYTECHNIQUE_BSC],
  lastVerified: READ,
};

const POLYTECHNIQUE: UniversityProfile = {
  id: 'fr-polytechnique',
  countryCode: 'FR',
  name: 'École Polytechnique',
  city: 'Palaiseau',
  ownership: 'public',
  officialUrl: 'https://www.polytechnique.edu/',
  admissionsUrl: 'https://programmes.polytechnique.edu/en/bachelor/bachelor-of-science',
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=43', sourceUrl: QS_IPPARIS.url!, lastVerified: READ, status: 'partly-verified' },
  overview: b(
    'Also known as "l’X", a highly selective French grande école combining research, academics and innovation in science, technology and engineering, and a founding member of the merged Institut Polytechnique de Paris. Around 80% of Bachelor of Science students and 44% of all students are international. École Polytechnique no longer has its own current QS World University Rankings profile (its own topuniversities.com page still shows a stale 2021 figure, #61, rather than a 2027 one); the rank shown here (#=43) is Institut Polytechnique de Paris’s 2027 QS World University Ranking, the merged entity of which École Polytechnique is a founding school.',
    '"l’X" নামেও পরিচিত, বিজ্ঞান, প্রযুক্তি আর engineering-এ research, academics আর innovation একসাথে করা একটি খুবই selective ফরাসি grande école, আর merged Institut Polytechnique de Paris-এর একটি founding member। Bachelor of Science student-দের প্রায় 80% আর সব student-এর 44% international। École Polytechnique-এর নিজের কোনো বর্তমান QS World University Rankings profile নেই (এর নিজের topuniversities.com page এখনো একটা পুরনো 2021 সংখ্যা, #61, দেখায়, 2027-এর না); এখানে দেখানো rank (#=43) হলো Institut Polytechnique de Paris-এর 2027 QS World University Ranking, যে merged entity-র École Polytechnique একটি founding school।',
  ),
  tuition: {
    ...txt(
      'The Bachelor of Science programme states EUR 15,900/year for EU students and EUR 19,200/year for non-EU students (rates subject to change); the Ingénieur Polytechnicien and Master’s/MSc&T programmes set their own separate fees, not itemized together on the pages read for this guide.',
      'Bachelor of Science programme বছরে EUR 15,900 (EU student) আর বছরে EUR 19,200 (non-EU student) বলে (rate পরিবর্তনযোগ্য); Ingénieur Polytechnicien আর Master\'s/MSc&T programme নিজস্ব আলাদা fee ঠিক করে, এই guide-এর জন্য পড়া page-এ একসাথে তালিকাভুক্ত ছিল না।',
      'partly-verified',
      [FR_POLYTECHNIQUE_BSC],
    ),
    money: { amount: 19200, currency: 'EUR', period: 'year' },
  },
  deadlines: NOT_VERIFIED_FEE([FR_POLYTECHNIQUE_BSC]),
  nextIntake: intake('confirmed', [FR_POLYTECHNIQUE_BSC], b('September', 'September')),
  admission: txt(
    'Admission is highly selective and programme-specific; the Bachelor of Science looks beyond grades alone at team spirit, independence, perseverance and motivation. Applications are submitted through the school’s own online candidature portal.',
    'ভর্তি খুবই selective আর programme-specific; Bachelor of Science শুধু grade-এর বাইরে team spirit, independence, perseverance আর motivation দেখে। Application school-এর নিজস্ব online candidature portal-এর মাধ্যমে জমা দিতে হয়।',
    'partly-verified',
    [FR_POLYTECHNIQUE_BSC],
  ),
  english: txt('IELTS 6.5+ or TOEFL iBT 90+ for the Bachelor of Science, per the programme’s general admissions data; Master’s-level English requirements were listed separately and not confirmed in detail for this guide.', 'Programme-এর সাধারণ admissions data অনুযায়ী Bachelor of Science-এ IELTS 6.5+ বা TOEFL iBT 90+; Master\'s-level English শর্ত আলাদাভাবে তালিকাভুক্ত ছিল আর এই guide-এর জন্য বিস্তারিতভাবে নিশ্চিত হয়নি।', 'partly-verified', [FR_POLYTECHNIQUE_BSC]),
  documents: {
    required: [b('Secondary-school records showing strong mathematics and science results', 'গণিত আর বিজ্ঞানে ভালো result দেখানো secondary-school record'), b('Completed online candidature application', 'সম্পূর্ণ করা online candidature application')],
    mayBeRequired: [b('English-proficiency proof (IELTS/TOEFL)', 'English-proficiency-র প্রমাণ (IELTS/TOEFL)')],
    status: 'partly-verified',
    sources: [FR_POLYTECHNIQUE_BSC],
  },
  applicationFee: NOT_VERIFIED_FEE([FR_POLYTECHNIQUE_BSC]),
  scholarships: NOT_VERIFIED_FEE([FR_POLYTECHNIQUE_BSC]),
  applicationRoute: txt('Online via École Polytechnique’s own candidatures.polytechnique.fr portal.', 'École Polytechnique-এর নিজস্ব candidatures.polytechnique.fr portal-এ online।', 'verified', [FR_POLYTECHNIQUE_BSC]),
  steps: {
    items: [
      { title: b('Choose a programme', 'একটি programme বাছুন'), body: b('The Bachelor of Science (English-taught, 3 years) or one of the Ingénieur Polytechnicien, Master’s/MSc&T or doctoral programmes.', 'Bachelor of Science (ইংরেজি-মাধ্যম, 3 বছর) বা Ingénieur Polytechnicien, Master\'s/MSc&T বা doctoral programme-এর একটি।') },
      { title: b('Submit your application via the online candidature portal', 'Online candidature portal দিয়ে আপনার application জমা দিন'), body: b('Selection looks at academic record alongside motivation, team spirit and independence.', 'Selection academic record-এর সাথে motivation, team spirit আর independence দেখে।') },
      { title: b('Complete the Études en France portal, if applicable', 'প্রযোজ্য হলে Études en France portal সম্পূর্ণ করুন'), body: b('Bangladesh is on Campus France’s country list for this mandatory procedure.', 'এই বাধ্যতামূলক procedure-এর জন্য Bangladesh Campus France-র country list-এ আছে।') },
      VISA_STEP,
      { title: b('Enrol and pay tuition', 'Enrol করুন আর tuition দিন'), body: b('EUR 19,200/year for the Bachelor of Science (non-EU rate, subject to change).', 'Bachelor of Science-এ বছরে EUR 19,200 (non-EU rate, পরিবর্তনযোগ্য)।') },
    ],
    status: 'verified',
    sources: [FR_POLYTECHNIQUE_BSC],
  },
  programs: [BSC],
  lastVerified: READ,
};

export const FR_UNI_LAYER: CountryUniversityLayer = {
  code: 'FR',
  universities: [POLYTECHNIQUE, SACLAY, SCIENCESPO, SORBONNE],
  visaStats: [],
  unverified: [
    {
      id: 'fr-bd-visa-approval-rate',
      label: b('Bangladesh-specific VLS-TS/residence-permit approval or refusal rate', 'বাংলাদেশ-নির্দিষ্ট VLS-TS/residence-permit অনুমোদন বা প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific visa or residence-permit approval-rate figure, or a verified country-wide international-student headcount broken down by nationality from an official French statistics source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'fr-differentiated-fee-exact-amount',
      label: b('The exact national "droits différenciés" amount for 2026/2027', '2026/2027-এর সঠিক জাতীয় "droits différenciés" পরিমাণ'),
      status: 'needs-review',
      note: 'University pages (Sorbonne Université, Université Paris-Saclay) confirm the regime and its 2026 ministerial decree exist, and press/ICEF reporting gives figures around EUR 2,895–2,902 (bachelor’s) and EUR 3,941–3,950 (master’s), but no official ministry PDF stating the exact national amount was read directly for this guide — only the exemption policies built on top of it.',
    },
  ],
  lastVerified: READ,
};

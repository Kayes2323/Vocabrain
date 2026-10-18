import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import {
  LV_MFA_BANGLADESH,
  LV_PMLP_RESIDENCE_HOWTO,
  LV_QS_SEARCH,
  LV_READ,
  LV_RSU_TUITION,
  LV_RTU_APPLY_PROGRAMMES,
  LV_RTU_QS,
  LV_RTU_SCHOLARSHIPS,
  LV_UL_DEGREE_STUDIES,
  LV_UL_LANGUAGE,
  LV_UL_LAW_PROGRAMME,
  LV_UL_QS,
  LV_UL_VISAS,
} from './lv-sources';

/**
 * Latvia: university → program layer, built the same way as Malta's and
 * Poland's (lib/content/mt-unis.ts, pl-unis.ts). The ranking is QS World
 * University Rankings 2027 as printed on each university's own
 * topuniversities.com profile. Anything that could not be verified on an
 * official page is left marked not-verified — never guessed.
 */

const READ = LV_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the institution’s official admissions page.', 'যাচাই হয়নি — institution-এর official admissions page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Apply for the residence permit — the embassy of Latvia in India handles Bangladeshi applicants', 'Residence permit-এর জন্য আবেদন করুন — Bangladesh-এর আবেদনকারীদের ভারতে Latvia-র embassy দেখে'),
  body: b('Bangladesh is one of the countries whose citizens need an additional assessment before a Latvian visa or residence permit is issued. Per the Ministry of Foreign Affairs’ own page, Bangladeshi nationals intending to study in Latvia apply for the residence permit in person at the Embassy of Latvia in India; once PMLP (the Office of Citizenship and Migration Affairs) approves it, the same embassy issues the long-stay (D) visa. See the Latvia visa section on the country page.', 'Bangladesh তাদের মধ্যে একটি দেশ যাদের নাগরিকদের Latvia-র visa বা residence permit দেওয়ার আগে additional assessment লাগে। Ministry of Foreign Affairs-এর নিজের page অনুযায়ী, Latvia-এ পড়তে ইচ্ছুক Bangladeshi নাগরিকরা ভারতে Latvia-র embassy-তে সশরীরে residence permit-এর জন্য আবেদন করেন; PMLP (Office of Citizenship and Migration Affairs) অনুমোদনের পর, একই embassy দীর্ঘমেয়াদী (D) visa ইস্যু করে। Country page-এর Latvia visa section দেখুন।'),
};

// ------------------------------------------------------------------ universities

const UL: UniversityProfile = {
  id: 'lv-ul',
  countryCode: 'LV',
  name: 'University of Latvia (Latvijas Universitāte)',
  city: 'Riga',
  ownership: 'public',
  officialUrl: 'https://www.lu.lv/en/',
  admissionsUrl: LV_UL_DEGREE_STUDIES.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '781-790', sourceUrl: LV_UL_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Latvia’s largest public university, based in Riga and ranked 781-790 in the QS World University Rankings 2027, with both Latvian-taught and English-taught Bachelor’s, Master’s and PhD programmes and its own International Students Unit.',
    'Latvia-র সবচেয়ে বড় public university, Riga-তে, QS World University Rankings 2027-এ 781-790 অবস্থানে, Latvian আর English-এ পড়ানো Bachelor\'s, Master\'s আর PhD programme দুটোই আছে, সঙ্গে নিজস্ব International Students Unit।',
  ),
  tuition: {
    ...txt(
      'UL’s own fee schedule sets tuition per programme, not one nationwide figure. The Bachelor’s programme "Law" (taught in Latvian), as published on UL’s own programme page for the 2025/26 academic year, charges EUR 2,850/year for EU/EEA/Swiss citizens and EUR 3,700/year for citizens of other countries (including Bangladesh); other programmes, especially English-taught ones, carry their own separate fees that were not itemized for every programme on the pages read for this guide. Study in Latvia’s own national FAQ states tuition across Latvian institutions generally ranges from under EUR 1,600/year for some Bachelor’s programmes up to EUR 15,000/year for Dentistry and EUR 25,600/year for an Executive MBA, but that figure spans several universities, not UL alone.',
      'UL-এর নিজের fee schedule প্রতি programme অনুযায়ী tuition ঠিক করে, একক জাতীয় সংখ্যা না। Bachelor\'s programme "Law" (Latvian-এ পড়ানো), UL-এর নিজের programme page-এ 2025/26 শিক্ষাবর্ষের জন্য প্রকাশিত অনুযায়ী, EU/EEA/Swiss নাগরিকদের জন্য বছরে EUR 2,850 আর অন্য দেশের (Bangladesh-সহ) নাগরিকদের জন্য বছরে EUR 3,700 নেয়; অন্য programme, বিশেষত English-এ পড়ানো programme-এর নিজস্ব আলাদা fee আছে যা এই guide-এর জন্য পড়া page-এ প্রতিটি programme অনুযায়ী তালিকাভুক্ত হয়নি। Study in Latvia-র নিজের জাতীয় FAQ বলে Latvian institution জুড়ে tuition সাধারণত কিছু Bachelor\'s programme-এর জন্য বছরে EUR 1,600-এর কম থেকে Dentistry-র জন্য বছরে EUR 15,000 আর Executive MBA-র জন্য বছরে EUR 25,600 পর্যন্ত, কিন্তু এই সংখ্যা একাধিক university জুড়ে, একা UL না।',
      'partly-verified',
      [LV_UL_LAW_PROGRAMME],
    ),
    money: { amount: 2850, max: 3700, currency: 'EUR', period: 'year' },
  },
  deadlines: txt(
    'UL’s own admissions page describes a multi-step process (document check, online application, diploma legalisation, accommodation, visa/residence permit, arrival) rather than one simple deadline; a specific Winter intake deadline of 15 January was published only for the part-time Master’s in Optometry. General Bachelor’s/Master’s/PhD intake deadlines by applicant category (EU/EEA, visa-free, visa-required, additional-assessment) were not itemized by exact date on the pages read for this guide — always check the current cycle’s own dates on UL’s site.',
    'UL-এর নিজের admissions page একক সহজ deadline-এর বদলে একটি বহু-পদক্ষেপের process (document check, online application, diploma legalisation, accommodation, visa/residence permit, arrival) বর্ণনা করে; part-time Master\'s in Optometry-র জন্যই একটি নির্দিষ্ট Winter intake deadline 15 January প্রকাশিত হয়েছিল। Applicant category অনুযায়ী (EU/EEA, visa-free, visa-required, additional-assessment) সাধারণ Bachelor\'s/Master\'s/PhD intake deadline এই guide-এর জন্য পড়া page-এ সঠিক তারিখ দিয়ে তালিকাভুক্ত হয়নি — সবসময় UL-এর site-এ চলতি cycle-এর নিজের date চেক করুন।',
    'partly-verified',
    [LV_UL_DEGREE_STUDIES],
  ),
  nextIntake: intake('varies', [LV_UL_DEGREE_STUDIES], b('A main intake around the start of the academic year (autumn), applied for online via apply.lu.lv; at least one Winter (part-time) intake also exists for specific programmes', 'শিক্ষাবর্ষ শুরুর (autumn) দিকে একটি মূল intake, apply.lu.lv-এর মাধ্যমে অনলাইনে আবেদন; নির্দিষ্ট programme-এর জন্য অন্তত একটি Winter (part-time) intake-ও আছে')),
  admission: txt(
    'UL’s own admissions page lists Bangladesh among the countries whose citizens require "additional assessment" before a Latvian visa or residence permit is issued (per Latvian Cabinet of Ministers Regulation No. 212/2016). For these applicants, UL cannot submit the residence-permit invitation to an embassy on the student’s behalf in the same way it can for EU or visa-free-country citizens — the student must apply for the residence permit and visa in person at the Embassy of Latvia in their country of origin (for Bangladesh, the Embassy of Latvia in India) or at another country’s embassy authorised to issue Latvian visas; UL has no authority to do this step itself.',
    'UL-এর নিজের admissions page Bangladesh-কে সেই দেশগুলোর মধ্যে তালিকাভুক্ত করে যাদের নাগরিকদের Latvian visa বা residence permit দেওয়ার আগে "additional assessment" লাগে (Latvian Cabinet of Ministers Regulation No. 212/2016 অনুযায়ী)। এই আবেদনকারীদের জন্য, UL EU বা visa-free-country নাগরিকদের জন্য যেভাবে করতে পারে সেভাবে student-এর পক্ষে residence-permit invitation একটি embassy-তে জমা দিতে পারে না — student-কে তার দেশের origin-এর (Bangladesh-এর জন্য, ভারতে Latvia-র Embassy) Embassy of Latvia-তে বা Latvian visa ইস্যু করার অনুমোদিত অন্য দেশের embassy-তে সশরীরে visa আর residence permit-এর জন্য আবেদন করতে হয়; এই পদক্ষেপ করার অনুমোদন UL-এর নিজের নেই।',
    'verified',
    [LV_UL_VISAS],
  ),
  english: txt(
    'UL’s own Language Proficiency page requires an internationally recognised English test taken within the last 5 years (IELTS 6.0 overall, TOEFL iBT 80/4 depending on the test version, CAE/CPE any level, PTE Academic 55, among others), unless previous studies were completed in English in one of a short named list of countries (not including Bangladesh), in which case the English requirement may still apply for Bachelor’s programmes where a grade in English is part of the admission competition.',
    'UL-এর নিজের Language Proficiency page গত ৫ বছরের মধ্যে নেওয়া একটি internationally recognised English test চায় (IELTS 6.0 overall, TOEFL iBT 80/4 test version অনুযায়ী, CAE/CPE কোনো level, PTE Academic 55, এর মধ্যে আরও), যদি না আগের পড়াশোনা একটি সংক্ষিপ্ত তালিকাভুক্ত দেশে (Bangladesh তার মধ্যে নেই) English-এ সম্পন্ন হয়ে থাকে, সেক্ষেত্রেও Bachelor\'s programme-এ যদি admission competition-এর অংশ English-এ একটি grade হয় তবে English-এর শর্ত প্রযোজ্য থাকতে পারে।',
    'verified',
    [LV_UL_LANGUAGE],
  ),
  documents: {
    required: [
      b('Final diploma/certificate and transcript, original language plus notarised English translation', 'Final diploma/certificate আর transcript, মূল ভাষায় সঙ্গে notarised English translation'),
      b('English (or other) language proficiency document (unless exempt)', 'English (বা অন্য) language proficiency document (exempt না হলে)'),
      b('Passport copy and one photograph', 'Passport copy আর একটি ছবি'),
      b('Application fee payment proof (EUR 170)', 'Application fee পরিশোধের proof (EUR 170)'),
    ],
    mayBeRequired: [b('Motivation letter and CV (programme-dependent)', 'Motivation letter আর CV (programme-নির্ভর)'), b('For PhD applicants: a 3–5 page dissertation justification/framework and an entrance interview', 'PhD আবেদনকারীদের জন্য: একটি 3–5 পাতার dissertation justification/framework আর একটি entrance interview')],
    status: 'verified',
    sources: [LV_UL_DEGREE_STUDIES],
  },
  applicationFee: txt('UL’s own admissions page states the online application is only considered once a non-refundable EUR 170 application fee is paid; this fee cannot be paid after the admission deadline even if the invoice itself was issued close to it.', 'UL-এর নিজের admissions page বলে online application শুধু একটি non-refundable EUR 170 application fee পরিশোধের পরই বিবেচিত হয়; এই fee admission deadline-এর পরে পরিশোধ করা যায় না, invoice নিজেই deadline-এর কাছাকাছি ইস্যু হলেও।', 'verified', [LV_UL_DEGREE_STUDIES]),
  scholarships: txt(
    'Not verified as currently open to Bangladeshi applicants. Study in Latvia’s own list of 39 countries eligible for the Latvian state scholarship (the main national scholarship, which UL students can also apply for) does not include Bangladesh. No UL-specific scholarship or fee waiver for Bangladeshi applicants was found on the pages read for this guide.',
    'বর্তমানে Bangladeshi আবেদনকারীদের জন্য খোলা কিনা যাচাই হয়নি। Study in Latvia-র নিজের Latvian state scholarship-এর (মূল জাতীয় scholarship, যার জন্য UL-এর student-রাও আবেদন করতে পারে) 39টি যোগ্য দেশের তালিকায় Bangladesh নেই। এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য UL-নির্দিষ্ট কোনো scholarship বা fee waiver পাওয়া যায়নি।',
    'not-verified',
    [LV_UL_DEGREE_STUDIES],
  ),
  applicationRoute: txt('Online via UL’s own application portal, apply.lu.lv, as described on UL’s own degree-studies admissions page.', 'UL-এর নিজস্ব application portal, apply.lu.lv-এর মাধ্যমে online, UL-এর নিজের degree-studies admissions page-এ বর্ণিত।', 'verified', [LV_UL_DEGREE_STUDIES]),
  steps: {
    items: [
      { title: b('Check general admission criteria and prepare documents', 'সাধারণ admission শর্ত চেক করুন আর document তৈরি করুন'), body: b('Diploma/transcript recognition, language proficiency and other programme-specific requirements, per UL’s own admissions page.', 'Diploma/transcript recognition, language proficiency, আর অন্য programme-নির্দিষ্ট শর্ত, UL-এর নিজের admissions page অনুযায়ী।') },
      { title: b('Apply online via apply.lu.lv and pay the EUR 170 application fee', 'apply.lu.lv-এর মাধ্যমে অনলাইনে আবেদন করুন আর EUR 170 application fee পরিশোধ করুন'), body: b('Documents are accepted only as PDF; the application is considered only once the fee payment is confirmed.', 'Document শুধু PDF-এ গ্রহণযোগ্য; application শুধু fee payment নিশ্চিত হওয়ার পরই বিবেচিত হয়।') },
      { title: b('Legalise your educational documents (Hague Convention) before applying for a visa or residence permit', 'Visa বা residence permit-এর জন্য আবেদনের আগে আপনার educational document legalise করুন (Hague Convention)'), body: b('UL’s own page states this step must be completed before the visa/residence-permit stage.', 'UL-এর নিজের page বলে এই পদক্ষেপ visa/residence-permit পর্যায়ের আগে সম্পন্ন করতে হবে।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [LV_UL_DEGREE_STUDIES, LV_UL_VISAS],
  },
  programs: [],
  lastVerified: READ,
};

const RTU: UniversityProfile = {
  id: 'lv-rtu',
  countryCode: 'LV',
  name: 'Riga Technical University (RTU)',
  city: 'Riga',
  ownership: 'public',
  officialUrl: 'https://www.rtu.lv/en',
  admissionsUrl: LV_RTU_APPLY_PROGRAMMES.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '751-760', sourceUrl: LV_RTU_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Latvia’s highest-ranked university in the QS World University Rankings 2027 (751-760) and the country’s main technical university, based in Riga with additional campuses, offering over 30 English-taught programmes through its own application portal, apply.rtu.lv.',
    'QS World University Rankings 2027-এ Latvia-র সর্বোচ্চ rank পাওয়া university (751-760) আর দেশের মূল technical university, Riga-তে, আরও campus সহ, নিজস্ব application portal, apply.rtu.lv-এর মাধ্যমে 30-এর বেশি English-এ পড়ানো programme দেয়।',
  ),
  tuition: {
    ...txt(
      'RTU’s own application portal (apply.rtu.lv) lists per-programme tuition, not one nationwide figure. For English-taught programmes open for the 2026/27 intakes: Bachelor’s "Computer Systems" EUR 5,030/year, Bachelor’s "Engineering Technology, Mechanics and Mechanical Engineering" EUR 4,030/year, Master’s "Business Informatics" EUR 5,650/year, Master’s "Computer Systems" EUR 6,150/year, Master’s "Architecture" EUR 9,300/year; RTU Riga Business School’s part-time MBA (non-EU/EEA applicants) is EUR 20,400 for the whole 2.5-year programme, and its Executive MBA (non-EU/EEA applicants) EUR 33,000 for the whole 2-year programme. Fees are set per programme, so always check the exact one on apply.rtu.lv.',
      'RTU-র নিজের application portal (apply.rtu.lv) প্রতি programme অনুযায়ী tuition তালিকাভুক্ত করে, একক জাতীয় সংখ্যা না। 2026/27 intake-এর জন্য খোলা English-taught programme-এর জন্য: Bachelor\'s "Computer Systems" বছরে EUR 5,030, Bachelor\'s "Engineering Technology, Mechanics and Mechanical Engineering" বছরে EUR 4,030, Master\'s "Business Informatics" বছরে EUR 5,650, Master\'s "Computer Systems" বছরে EUR 6,150, Master\'s "Architecture" বছরে EUR 9,300; RTU Riga Business School-এর part-time MBA (non-EU/EEA আবেদনকারী) সম্পূর্ণ 2.5-বছরের programme-এর জন্য EUR 20,400, আর এর Executive MBA (non-EU/EEA আবেদনকারী) সম্পূর্ণ 2-বছরের programme-এর জন্য EUR 33,000। Fee প্রতি programme অনুযায়ী ঠিক হয়, তাই সবসময় apply.rtu.lv-এ সঠিক programme চেক করুন।',
      'verified',
      [LV_RTU_APPLY_PROGRAMMES],
    ),
    money: { amount: 4030, max: 9300, currency: 'EUR', period: 'year' },
  },
  deadlines: txt(
    'Deadlines are set per programme and intake on apply.rtu.lv rather than one university-wide date; for example, the Spring 2026/27 intake for several Master’s programmes shows a 15 November 2026 deadline, while the RTU Riga Business School’s MBA/EMBA (Autumn 2027/28) show an "Early Bird" deadline of 14 May 2027 and a general deadline of 6 June 2027. Always check the exact programme’s own deadline on apply.rtu.lv.',
    'Deadline একক university-wide date-এর বদলে apply.rtu.lv-এ প্রতি programme আর intake অনুযায়ী ঠিক হয়; উদাহরণস্বরূপ, কয়েকটি Master\'s programme-এর Spring 2026/27 intake-এ 15 November 2026 deadline দেখায়, যখন RTU Riga Business School-এর MBA/EMBA (Autumn 2027/28) একটি "Early Bird" deadline 14 May 2027 আর একটি সাধারণ deadline 6 June 2027 দেখায়। সবসময় apply.rtu.lv-এ সঠিক programme-এর নিজের deadline চেক করুন।',
    'verified',
    [LV_RTU_APPLY_PROGRAMMES],
  ),
  nextIntake: intake('varies', [LV_RTU_APPLY_PROGRAMMES], b('Autumn and Spring semesters, with the exact intakes and deadlines shown per programme on apply.rtu.lv', 'Autumn আর Spring semester, apply.rtu.lv-এ প্রতি programme অনুযায়ী সঠিক intake আর deadline দেখানো হয়')),
  admission: txt(
    'Applications are submitted directly through apply.rtu.lv, RTU’s own application portal, where each programme lists its own study mode, duration, language and tuition fee. Programme-specific entry requirements (subject prerequisites, interviews, portfolio) were not itemized in one place on the pages read for this guide — check the individual programme page on apply.rtu.lv.',
    'Application সরাসরি apply.rtu.lv-এর মাধ্যমে জমা দিতে হয়, RTU-র নিজের application portal, যেখানে প্রতিটি programme তার নিজের study mode, duration, language, আর tuition fee তালিকাভুক্ত করে। Programme-নির্দিষ্ট entry requirement (subject prerequisite, interview, portfolio) এই guide-এর জন্য পড়া page-এ একসাথে তালিকাভুক্ত হয়নি — apply.rtu.lv-এ নির্দিষ্ট programme page চেক করুন।',
    'partly-verified',
    [LV_RTU_APPLY_PROGRAMMES],
  ),
  english: NOT_VERIFIED_FEE([LV_RTU_APPLY_PROGRAMMES]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [LV_RTU_APPLY_PROGRAMMES] },
  applicationFee: NOT_VERIFIED_FEE([LV_RTU_APPLY_PROGRAMMES]),
  scholarships: txt(
    'RTU’s own Scholarships page offers only the Latvian government scholarship, available "in accordance with bilateral agreements on co-operation in education and science concluded between [the] Latvian government and a few countries" — the same Latvian state scholarship administered nationally through Study in Latvia / VIAA, whose own list of 39 eligible countries does not include Bangladesh. No Bangladesh-specific or general RTU scholarship was found on the pages read for this guide.',
    'RTU-র নিজের Scholarships page শুধু Latvian government scholarship দেয়, "Latvian government আর কয়েকটি দেশের মধ্যে সম্পাদিত education আর science-এ সহযোগিতার bilateral agreement অনুযায়ী" পাওয়া যায় — একই জাতীয় Latvian state scholarship যা Study in Latvia / VIAA-এর মাধ্যমে জাতীয়ভাবে পরিচালিত হয়, যার নিজের 39টি যোগ্য দেশের তালিকায় Bangladesh নেই। এই guide-এর জন্য পড়া page-এ Bangladesh-specific বা সাধারণ কোনো RTU scholarship পাওয়া যায়নি।',
    'verified',
    [LV_RTU_SCHOLARSHIPS],
  ),
  applicationRoute: txt('Online via apply.rtu.lv, RTU’s own application portal, which also covers RTU Riga Business School and its other faculties/academies.', 'apply.rtu.lv-এর মাধ্যমে online, RTU-র নিজের application portal, যা RTU Riga Business School আর এর অন্য faculty/academy-ও কভার করে।', 'verified', [LV_RTU_APPLY_PROGRAMMES]),
  steps: {
    items: [
      { title: b('Find your programme on apply.rtu.lv', 'apply.rtu.lv-এ আপনার programme খুঁজুন'), body: b('Each listing states its own tuition fee, duration, language and application deadline.', 'প্রতিটি listing তার নিজের tuition fee, duration, language, আর application deadline জানায়।') },
      { title: b('Apply online before the programme’s own deadline', 'Programme-এর নিজের deadline-এর আগে অনলাইনে আবেদন করুন'), body: b('Deadlines differ by programme and intake, so check the exact one you are applying to.', 'Deadline programme আর intake অনুযায়ী আলাদা, তাই যেটায় আবেদন করছেন তার সঠিকটি চেক করুন।') },
      VISA_STEP,
    ],
    status: 'partly-verified',
    sources: [LV_RTU_APPLY_PROGRAMMES],
  },
  programs: [],
  lastVerified: READ,
};

const RSU: UniversityProfile = {
  id: 'lv-rsu',
  countryCode: 'LV',
  name: 'Rīga Stradiņš University (RSU)',
  city: 'Riga',
  ownership: 'public',
  officialUrl: 'https://www.rsu.lv/en',
  admissionsUrl: LV_RSU_TUITION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '1001-1200', sourceUrl: LV_QS_SEARCH.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A Riga public university best known internationally for English-medium Medicine and Dentistry, ranked 1001-1200 in the QS World University Rankings 2027, with tuition fees set in individual student contracts and paid semester by semester.',
    'Riga-র একটি public university, আন্তর্জাতিকভাবে English-medium Medicine আর Dentistry-র জন্য সবচেয়ে বেশি পরিচিত, QS World University Rankings 2027-এ 1001-1200 অবস্থানে, individual student contract-এ ঠিক করা tuition fee, semester অনুযায়ী পরিশোধযোগ্য।',
  ),
  tuition: {
    ...txt(
      'RSU’s own tuition page for the 2026/2027 academic year lists Medicine at EUR 13,500/year for all six years, Dentistry at EUR 15,500/year for its first five years, and the Bachelor’s "International Business and Start-up Entrepreneurship" at EUR 3,300/year for three years. English-taught Master’s programmes range from EUR 3,400/year (International Relations & Diplomacy) to EUR 5,000/year (Digital Strategy and Artificial Intelligence Management, Biostatistics), and Doctoral programmes from EUR 6,000/year (Social Sciences) to EUR 20,000/year (Health Care). A one-time, non-refundable EUR 1,800 registration administration fee applies only to students starting Medicine or Dentistry, on top of a EUR 100 application fee (EUR 30 for Latvian citizens who completed secondary education in Latvia).',
      'RSU-র নিজের tuition page 2026/2027 শিক্ষাবর্ষের জন্য Medicine-কে সব ছয় বছরের জন্য বছরে EUR 13,500, Dentistry-কে প্রথম পাঁচ বছরের জন্য বছরে EUR 15,500, আর Bachelor\'s "International Business and Start-up Entrepreneurship"-কে তিন বছরের জন্য বছরে EUR 3,300 তালিকাভুক্ত করে। English-taught Master\'s programme বছরে EUR 3,400 (International Relations & Diplomacy) থেকে বছরে EUR 5,000 (Digital Strategy and Artificial Intelligence Management, Biostatistics) পর্যন্ত, আর Doctoral programme বছরে EUR 6,000 (Social Sciences) থেকে বছরে EUR 20,000 (Health Care) পর্যন্ত। শুধু Medicine বা Dentistry শুরু করা student-দের জন্য একটি একবারের, non-refundable EUR 1,800 registration administration fee প্রযোজ্য, EUR 100 application fee-র (Latvia-তে secondary education শেষ করা Latvian নাগরিকদের জন্য EUR 30) পাশাপাশি।',
      'verified',
      [LV_RSU_TUITION],
    ),
    money: { amount: 3300, max: 20000, currency: 'EUR', period: 'year' },
  },
  deadlines: txt(
    'RSU’s own tuition page states the tuition fee and other payments must be paid within two weeks of the offer or competition-result e-mail, and all international students pay on a semester basis. A February 2026 intake for Medicine was described as under review on RSU’s own admissions page; a full, itemised 2026/27 deadline table by intake and programme was not read for this guide — check RSU’s current admissions page directly.',
    'RSU-র নিজের tuition page বলে tuition fee আর অন্য payment offer বা competition-result e-mail পাওয়ার দুই সপ্তাহের মধ্যে পরিশোধ করতে হয়, আর সব international student semester অনুযায়ী পরিশোধ করে। Medicine-এর জন্য February 2026 intake RSU-র নিজের admissions page-এ under review বলে বর্ণিত ছিল; intake আর programme অনুযায়ী একটি সম্পূর্ণ, তালিকাভুক্ত 2026/27 deadline table এই guide-এর জন্য পড়া হয়নি — সরাসরি RSU-র চলতি admissions page চেক করুন।',
    'partly-verified',
    [LV_RSU_TUITION],
  ),
  nextIntake: intake('varies', [LV_RSU_TUITION], b('Payments and intakes run on a semester basis; a February intake exists for some programmes (e.g. Medicine) alongside the main autumn intake', 'Payment আর intake semester অনুযায়ী চলে; মূল autumn intake-এর পাশাপাশি কিছু programme-এর (যেমন Medicine) জন্য একটি February intake আছে')),
  admission: NOT_VERIFIED_FEE([LV_RSU_TUITION]),
  english: NOT_VERIFIED_FEE([LV_RSU_TUITION]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [LV_RSU_TUITION] },
  applicationFee: txt('RSU’s own tuition page lists a single, non-refundable EUR 100 application fee (EUR 30 for Latvian citizens who obtained their secondary education in Latvia), plus — for Medicine and Dentistry only — a separate, one-time EUR 1,800 registration administration fee.', 'RSU-র নিজের tuition page একটি একক, non-refundable EUR 100 application fee তালিকাভুক্ত করে (Latvia-তে secondary education পাওয়া Latvian নাগরিকদের জন্য EUR 30), এর সাথে — শুধু Medicine আর Dentistry-র জন্য — একটি আলাদা, একবারের EUR 1,800 registration administration fee।', 'verified', [LV_RSU_TUITION]),
  scholarships: NOT_VERIFIED_FEE([LV_RSU_TUITION]),
  applicationRoute: txt('Online via RSU’s own admissions process; the specific application portal/system was not itemized on the pages read for this guide.', 'RSU-র নিজের admissions process-এর মাধ্যমে online; নির্দিষ্ট application portal/system এই guide-এর জন্য পড়া page-এ তালিকাভুক্ত হয়নি।', 'partly-verified', [LV_RSU_TUITION]),
  steps: {
    items: [
      { title: b('Receive your RSU offer of study place or competition-result e-mail', 'আপনার RSU offer of study place বা competition-result e-mail পান'), body: b('The payment deadline for tuition and other fees is set relative to this date — usually within two weeks.', 'Tuition আর অন্য fee-র জন্য payment deadline এই তারিখের সাপেক্ষে ঠিক হয় — সাধারণত দুই সপ্তাহের মধ্যে।') },
      { title: b('Pay the application fee, and the registration fee if starting Medicine or Dentistry', 'Application fee পরিশোধ করুন, আর Medicine বা Dentistry শুরু করলে registration fee-ও'), body: b('EUR 100 application fee for everyone (EUR 30 for Latvian citizens educated in Latvia); EUR 1,800 registration administration fee only for Medicine/Dentistry.', 'সবার জন্য EUR 100 application fee (Latvia-তে পড়া Latvian নাগরিকদের জন্য EUR 30); শুধু Medicine/Dentistry-র জন্য EUR 1,800 registration administration fee।') },
      VISA_STEP,
    ],
    status: 'partly-verified',
    sources: [LV_RSU_TUITION],
  },
  programs: [],
  lastVerified: READ,
};

export const LV_UNI_LAYER: CountryUniversityLayer = {
  code: 'LV',
  universities: [RSU, RTU, UL],
  visaStats: [],
  unverified: [
    {
      id: 'lv-bd-visa-approval-rate',
      label: b('Bangladesh-specific visa/residence-permit approval or refusal rate', 'বাংলাদেশ-নির্দিষ্ট visa/residence-permit অনুমোদন বা প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific study-visa or study-residence-permit approval-rate figure, nor a verified Latvia-wide international-student headcount broken down by nationality from an official Latvian source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'lv-subsistence-figure-discrepancy',
      label: b('Minimum monthly subsistence amount for a study residence permit', 'Study residence permit-এর জন্য ন্যূনতম মাসিক subsistence পরিমাণ'),
      status: 'needs-review',
      note: 'PMLP’s own page on general (school-level) education residence permits states the required subsistence is EUR 500/month for an adult. The University of Latvia’s own visa page, for university-level (degree) studies, instead states at least EUR 780/month. The two official pages give different figures for different education levels, so neither is treated as the single correct amount for degree study — both are shown, with their own source.',
    },
    {
      id: 'lv-ul-additional-assessment-processing-time',
      label: b('Processing time for the residence permit for "additional assessment" countries (including Bangladesh)', '"Additional assessment" দেশের (Bangladesh-সহ) জন্য residence permit-এর processing time'),
      status: 'not-verified',
      note: 'The University of Latvia’s own visa page states its general residence-permit procedure "takes over 40 days" (or 45 days in one of its own repeated sections) once documents are submitted, but does not give a separate, confirmed processing time specific to the embassy-based process that "additional assessment" countries such as Bangladesh must use, which involves PMLP approving the application before the Embassy of Latvia in India issues the visa. No separate, confirmed figure for that combined process was found on the pages read for this guide.',
    },
  ],
  lastVerified: READ,
};

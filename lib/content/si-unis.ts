import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import { SI_READ, SI_UL_ENROLMENT, SI_UL_TUITION, SI_UM, SI_UM_ADMISSION, SI_UNG_FEES, SI_UP_APPLY, SI_UP_TUITION } from './si-sources';

/**
 * Slovenia: university → program layer, built the same way as the Czech
 * Republic's, Lithuania's, Germany's and South Korea's
 * (lib/content/cz-unis.ts, lt-unis.ts, de-unis.ts, kr-unis.ts). Rankings are
 * QS World University Rankings 2027 as printed on each university's
 * topuniversities.com profile (University of Nova Gorica is not ranked in
 * that edition, only in QS's separate Europe university ranking, so its
 * World ranking is left null rather than substituted); tuition, deadlines
 * and requirements come from the university's (often faculty's) own
 * official pages. Anything that could not be verified on an official page
 * is left marked unverified — never guessed.
 */

const READ = SI_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const qs = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'ranking-publisher' });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the university’s (or faculty’s) official application page.', 'যাচাই হয়নি — university-র (বা faculty-র) official আবেদনের page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Apply for a Slovenian temporary residence permit for studies', 'পড়ার জন্য Slovenian temporary residence permit-এর আবেদন'),
  body: b('After admission, use your decision on acceptance to apply for a temporary residence permit for studies at a Slovenian diplomatic mission abroad, or — if already legally resident in Slovenia — at the competent administrative unit. See the Slovenia residence-permit section on the country page.', 'ভর্তির পর, আপনার decision on acceptance দিয়ে বিদেশে একটি Slovenian diplomatic mission-এ পড়ার জন্য temporary residence permit-এর আবেদন করুন, বা — Slovenia-তে আগে থেকেই আইনিভাবে থাকলে — সংশ্লিষ্ট administrative unit-এ। Country page-এর Slovenia residence-permit অংশ দেখুন।'),
};

// ------------------------------------------------------------------ sources

const QS_UL = qs('QS World University Rankings 2027 – University of Ljubljana (topuniversities.com)', 'https://www.topuniversities.com/universities/university-ljubljana');
const QS_UM = qs('QS World University Rankings 2027 – University of Maribor (topuniversities.com)', 'https://www.topuniversities.com/universities/university-maribor');
const QS_UP = qs('QS World University Rankings 2027 – University of Primorska (topuniversities.com)', 'https://www.topuniversities.com/universities/university-primorska');
const QS_UNG = qs('QS World University Rankings – University of Nova Gorica (topuniversities.com)', 'https://www.topuniversities.com/universities/university-nova-gorica');

// ------------------------------------------------------------------ universities

const UL: UniversityProfile = {
  id: 'si-ul',
  countryCode: 'SI',
  name: 'University of Ljubljana',
  city: 'Ljubljana',
  ownership: 'public',
  officialUrl: 'https://www.uni-lj.si/en',
  admissionsUrl: SI_UL_ENROLMENT.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=530', sourceUrl: QS_UL.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'The largest and oldest university in Slovenia, with around 25 faculties and academies. The Higher Education Enrolment and Information Service (VPIS) runs the first and second application periods for undergraduate and integrated master\'s programmes; the second application period for non-EU citizens, and admission to most master\'s and doctoral programmes, is managed by the individual faculties.',
    'Slovenia-র সবচেয়ে বড় আর পুরনো university, প্রায় ২৫টি faculty আর academy সহ। Higher Education Enrolment and Information Service (VPIS) undergraduate আর integrated master\'s programme-এর প্রথম আর দ্বিতীয় আবেদনের সময় চালায়; non-EU নাগরিকদের জন্য দ্বিতীয় আবেদনের সময়, আর অধিকাংশ master\'s আর doctoral programme-এর ভর্তি, আলাদা faculty-গুলো দেখে।',
  ),
  tuition: {
    ...txt(
      'No tuition for full-time bachelor\'s and master\'s study for Slovenians, EU/Switzerland/Iceland/Liechtenstein/Norway citizens, citizens of countries with a bilateral agreement (Bosnia and Herzegovina, North Macedonia, Montenegro, Kosovo, Serbia), permanent residents who are Slovenian tax residents, people with international/temporary protection, CMEPIUS/Ad Futura scholarship holders, and exchange students. Everyone else — including Bangladeshi applicants — pays tuition, set per faculty and programme in the university\'s own annual price list; doctoral students (and all part-time students) pay tuition regardless of nationality.',
      'Full-time bachelor\'s আর master\'s পড়ায় tuition নেই Slovenian, EU/Switzerland/Iceland/Liechtenstein/Norway নাগরিক, bilateral agreement থাকা দেশের নাগরিক (Bosnia and Herzegovina, North Macedonia, Montenegro, Kosovo, Serbia), Slovenia-র tax resident permanent resident, international/temporary protection পাওয়া মানুষ, CMEPIUS/Ad Futura scholarship holder, আর exchange student-দের জন্য। বাকি সবাই — Bangladesh-এর আবেদনকারী-সহ — tuition দেন, যা university-র নিজস্ব বার্ষিক price list-এ প্রতি faculty আর programme অনুযায়ী ঠিক হয়; doctoral student (আর সব part-time student) জাতীয়তা নির্বিশেষে tuition দেন।',
      'verified',
      [SI_UL_TUITION],
    ),
  },
  deadlines: NOT_VERIFIED_FEE([SI_UL_ENROLMENT]),
  nextIntake: intake('varies', [SI_UL_ENROLMENT]),
  admission: txt(
    'For undergraduate and single-cycle master\'s programmes, the first application period (around 18 February – 18 March for the 2026/27 intake) and its non-EU candidate list are run centrally by VPIS; a second application period for remaining non-EU places is then managed directly by the faculties (around early September for the 2026/27 intake). Applications are submitted electronically via the national eVŠ portal. Master\'s and doctoral admission is otherwise handled by the enrolling faculty.',
    'Undergraduate আর single-cycle master\'s programme-এর জন্য, প্রথম আবেদনের সময় (2026/27 intake-এর জন্য প্রায় ১৮ February – ১৮ March) আর এর non-EU candidate তালিকা VPIS কেন্দ্রীয়ভাবে চালায়; বাকি non-EU জায়গার জন্য দ্বিতীয় আবেদনের সময় তখন সরাসরি faculty-গুলো দেখে (2026/27 intake-এর জন্য প্রায় early September)। আবেদন জাতীয় eVŠ portal-এ electronically জমা দিতে হয়। Master\'s আর doctoral ভর্তি অন্যথায় ভর্তি করা faculty দেখে।',
    'verified',
    [SI_UL_ENROLMENT],
  ),
  english: NOT_VERIFIED_FEE([SI_UL_ENROLMENT]),
  documents: {
    required: [b('Secondary-education or prior-degree certificates (with recognition decision, if issued abroad)', 'Secondary-education বা আগের degree-র সনদ (বিদেশে ইস্যু হলে recognition decision সহ)'), b('Completed electronic application via the eVŠ portal', 'eVŠ portal-এর মাধ্যমে পূর্ণ করা electronic application')],
    mayBeRequired: [b('Faculty-specific entrance-test results', 'Faculty-specific entrance-test-এর result'), b('English or Slovene language proficiency proof, where the programme requires it', 'প্রয়োজনে English বা Slovene ভাষার দক্ষতার প্রমাণ')],
    status: 'partly-verified',
    sources: [SI_UL_ENROLMENT],
  },
  applicationFee: NOT_VERIFIED_FEE([SI_UL_ENROLMENT]),
  scholarships: txt(
    'The university enrols students holding a CMEPIUS/Ad Futura scholarship tuition-free; individual faculties may offer their own additional scholarships, not itemized on the pages read.',
    'University CMEPIUS/Ad Futura scholarship থাকা student-দের tuition-free ভর্তি করে; আলাদা faculty নিজস্ব অতিরিক্ত scholarship দিতে পারে, যা পড়া page-এ তালিকাভুক্ত ছিল না।',
    'partly-verified',
    [SI_UL_TUITION],
  ),
  applicationRoute: txt('Online via the national eVŠ e-application portal (portal.evs.gov.si), with the faculties running the second non-EU application period directly.', 'জাতীয় eVŠ e-application portal-এ (portal.evs.gov.si) online, দ্বিতীয় non-EU আবেদনের সময় faculty-গুলো সরাসরি চালায়।', 'verified', [SI_UL_ENROLMENT]),
  steps: {
    items: [
      { title: b('Choose a faculty and study programme', 'একটি faculty আর study programme বাছুন'), body: b('Browse the university\'s catalogue of study programmes; each one states its own admission requirements.', 'University-র study programme catalogue দেখুন; প্রতিটি নিজস্ব ভর্তির শর্ত বলে।') },
      { title: b('Submit the electronic application via eVŠ', 'eVŠ-র মাধ্যমে electronic application জমা দিন'), body: b('Non-EU candidates apply in the first application period (around mid-February to mid-March) for the main round, or the second period (early September) for remaining places.', 'Non-EU আবেদনকারীরা main round-এ প্রথম আবেদনের সময়ে (মাঝ-February থেকে মাঝ-March) আবেদন করেন, বা বাকি জায়গার জন্য দ্বিতীয় সময়ে (early September)।') },
      { title: b('Complete the recognition of foreign education', 'বিদেশি পড়ার recognition সম্পন্ন করুন'), body: b('Secondary-school or prior-degree certificates issued outside Slovenia go through a recognition procedure.', 'Slovenia-র বাইরে ইস্যু করা secondary-school বা আগের degree-র সনদ একটি recognition procedure-এর মধ্য দিয়ে যায়।') },
      { title: b('Receive your decision on acceptance', 'Decision on acceptance গ্রহণ করুন'), body: b('This document is used for your residence-permit application and enrolment.', 'এই document residence-permit আবেদন আর enrolment-এ ব্যবহার হয়।') },
      VISA_STEP,
      { title: b('Enrol at the faculty', 'Faculty-তে enrol করুন'), body: b('Complete the online enrolment form and submit documentation in person at the faculty, by the deadline it sets.', 'Online enrolment form পূর্ণ করে, faculty-র ঠিক করা শেষ তারিখের মধ্যে সশরীরে document জমা দিন।') },
    ],
    status: 'verified',
    sources: [SI_UL_ENROLMENT],
  },
  programs: [],
  lastVerified: READ,
};

const UM: UniversityProfile = {
  id: 'si-um',
  countryCode: 'SI',
  name: 'University of Maribor',
  city: 'Maribor',
  ownership: 'public',
  officialUrl: 'https://www.um.si/en/home-page/',
  admissionsUrl: SI_UM_ADMISSION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '901-950', sourceUrl: QS_UM.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Slovenia\'s second-largest university, with 17 faculties. Its own Higher Education Application and Information Centre (VPIC) runs the first application period for non-EU candidates to undergraduate and long-cycle/integrated master\'s programmes; the second and third periods are run directly by the faculties.',
    'Slovenia-র দ্বিতীয়-সবচেয়ে বড় university, ১৭টি faculty সহ। এর নিজস্ব Higher Education Application and Information Centre (VPIC) undergraduate আর long-cycle/integrated master\'s programme-এ non-EU আবেদনকারীদের জন্য প্রথম আবেদনের সময় চালায়; দ্বিতীয় আর তৃতীয় সময় সরাসরি faculty-গুলো চালায়।',
  ),
  tuition: {
    ...txt(
      'Tuition fees for undergraduate and long-cycle/integrated master\'s studies are set individually by each faculty and paid on enrolment for the full academic year; citizens of countries with a bilateral higher-education agreement with Slovenia (Bosnia and Herzegovina, North Macedonia, Montenegro, Kosovo, Serbia) do not pay. Third-party estimates put non-EU bachelor\'s/master\'s fees at roughly EUR 1,800–4,930 a year by faculty, but no single official university-wide figure was read on an official page.',
      'Undergraduate আর long-cycle/integrated master\'s পড়ার tuition fee প্রতিটি faculty নিজে ঠিক করে আর পূর্ণ শিক্ষাবর্ষের জন্য ভর্তির সময় দিতে হয়; Slovenia-র সাথে bilateral higher-education agreement থাকা দেশের নাগরিকরা (Bosnia and Herzegovina, North Macedonia, Montenegro, Kosovo, Serbia) দেন না। তৃতীয় পক্ষের estimate অনুযায়ী non-EU bachelor\'s/master\'s fee প্রায় বছরে EUR 1,800–4,930, faculty অনুযায়ী, কিন্তু কোনো official page-এ একক university-জুড়ে সংখ্যা পড়া হয়নি।',
      'partly-verified',
      [SI_UM_ADMISSION],
    ),
  },
  deadlines: txt(
    'For the 2026/27 academic year, the first application period for non-EU citizens (with separate deadlines for candidates applying in Slovene and for English-taught programmes) ran 18 February – 18 March 2026; the second application period opened 3–4 September 2026. Enrolment of admitted candidates must be completed by 30 September 2026 (30 October 2026 in exceptional, legitimate cases).',
    '2026/27 শিক্ষাবর্ষের জন্য, non-EU নাগরিকদের প্রথম আবেদনের সময় (Slovene-এ আবেদনকারী আর ইংরেজি-মাধ্যম programme-এর জন্য আলাদা শেষ তারিখ সহ) ১৮ February – ১৮ March 2026 ছিল; দ্বিতীয় আবেদনের সময় ৩–৪ September 2026-এ খোলে। ভর্তি হওয়া আবেদনকারীদের enrolment ৩০ September 2026-এর মধ্যে শেষ করতে হবে (ব্যতিক্রমী, যুক্তিসঙ্গত কারণে ৩০ October 2026)।',
    'verified',
    [SI_UM_ADMISSION],
  ),
  nextIntake: intake('confirmed', [SI_UM_ADMISSION], b('First application period 18 February – 18 March 2026; enrolment by 30 September 2026', 'প্রথম আবেদনের সময় ১৮ February – ১৮ March 2026; ৩০ September 2026-এর মধ্যে enrolment')),
  admission: txt(
    'Non-EU candidates need: successfully completed appropriate secondary education (a recognised national exit exam, e.g. the Slovene matura, or an equivalent), Slovene or English language proficiency where the chosen programme requires it, a completed recognition procedure for secondary-school certificates obtained abroad, and — for some programmes — a test of specific aptitudes. A 2025 law (ZVIS-1, Article 13) requires the University of Maribor to conduct a direct interview with applicants who are citizens of a country whose nationals need a Schengen visa (which includes Bangladesh) to assess their suitability.',
    'Non-EU আবেদনকারীদের লাগে: উপযুক্ত secondary education সফলভাবে শেষ করা (একটি স্বীকৃত জাতীয় exit exam, যেমন Slovene matura, বা সমমান), বাছা programme-এ লাগলে Slovene বা English ভাষার দক্ষতা, বিদেশে পাওয়া secondary-school সনদের একটি সম্পন্ন recognition procedure, আর — কিছু programme-এর জন্য — নির্দিষ্ট aptitude-এর test। 2025-এর একটি আইন (ZVIS-1, Article 13) University of Maribor-কে এমন আবেদনকারীর সাথে সরাসরি interview নিতে বাধ্য করে যিনি Schengen visa লাগে এমন দেশের (যার মধ্যে Bangladesh আছে) নাগরিক, তার উপযুক্ততা যাচাই করতে।',
    'verified',
    [SI_UM_ADMISSION],
  ),
  english: txt(
    'An English-language certificate is required before enrolling into the first year only for the Faculty of Logistics\' English-taught Systems Logistics programme (level B2, English at the matura/matriculation examination, or completed education in English); other faculties\' English requirements for their English-taught programmes were not itemized on the page read.', 'শুধু Faculty of Logistics-এর ইংরেজি-মাধ্যম Systems Logistics programme-এর প্রথম বর্ষে ভর্তির আগে একটি English-ভাষার সনদ লাগে (level B2, matura/matriculation পরীক্ষায় English, বা English-এ সম্পন্ন পড়া); অন্য faculty-গুলোর ইংরেজি-মাধ্যম programme-এর English শর্ত পড়া page-এ তালিকাভুক্ত ছিল না।',
    'partly-verified',
    [SI_UM_ADMISSION],
  ),
  documents: {
    required: [b('Passport (personal-data page)', 'Passport (personal-data page)'), b('Secondary-school final certificate (e-copy) and translation into Slovenian or English if required', 'Secondary-school-এর final certificate (e-copy) আর প্রয়োজনে Slovenian বা English-এ translation'), b('Annual certificates for all years of secondary school', 'Secondary school-এর সব বছরের annual certificate'), b('A short chronological description of your prior education', 'আগের পড়ার একটি সংক্ষিপ্ত কালানুক্রমিক বিবরণ'), b('Decision on recognition of certificates obtained abroad', 'বিদেশে পাওয়া সনদের recognition decision')],
    mayBeRequired: [b('Slovene-language exam certificate, where the programme requires it', 'প্রয়োজনে Slovene-ভাষার exam-এর সনদ'), b('Aptitude-test results, for programmes that require one', 'প্রয়োজন হলে aptitude-test-এর result')],
    status: 'verified',
    sources: [SI_UM_ADMISSION],
  },
  applicationFee: NOT_VERIFIED_FEE([SI_UM_ADMISSION]),
  scholarships: NOT_VERIFIED_FEE([SI_UM_ADMISSION]),
  applicationRoute: txt('Online via the national eVŠ e-application portal (portal.evs.gov.si); the first application period is processed centrally by VPIC, later periods directly by the faculties.', 'জাতীয় eVŠ e-application portal-এ (portal.evs.gov.si) online; প্রথম আবেদনের সময় VPIC কেন্দ্রীয়ভাবে প্রক্রিয়া করে, পরের সময় সরাসরি faculty-গুলো।', 'verified', [SI_UM_ADMISSION]),
  steps: {
    items: [
      { title: b('Choose up to three study programmes', 'সর্বোচ্চ তিনটি study programme বাছুন'), body: b('List them in order of preference; after the first-period deadline, changes are no longer possible.', 'পছন্দের ক্রমে তালিকা করুন; প্রথম সময়ের শেষ তারিখের পর, পরিবর্তন সম্ভব নয়।') },
      { title: b('Submit the e-application via eVŠ', 'eVŠ-র মাধ্যমে e-application জমা দিন'), body: b('Apply either as a non-EU candidate, or as a non-EU candidate for an English-taught programme — not both at once.', 'non-EU আবেদনকারী হিসেবে, বা ইংরেজি-মাধ্যম programme-এর non-EU আবেদনকারী হিসেবে আবেদন করুন — দুটো একসাথে নয়।') },
      { title: b('Attend the admission interview, if citizen of a higher-migration-risk country', 'Higher-migration-risk দেশের নাগরিক হলে ভর্তির interview দিন'), body: b('Required under the 2025 Higher Education Act for applicants, including Bangladeshi nationals, who need a Schengen visa.', '2025 Higher Education Act-এর অধীনে বাধ্যতামূলক, Bangladesh-সহ Schengen visa লাগে এমন আবেদনকারীদের জন্য।') },
      { title: b('Sit an aptitude test, if your programme requires one', 'প্রয়োজনে aptitude test দিন'), body: b('Scheduled by the individual faculty, typically between late June and early July.', 'আলাদা faculty ঠিক করে, সাধারণত late June থেকে early July-এর মধ্যে।') },
      VISA_STEP,
      { title: b('Enrol at the faculty', 'Faculty-তে enrol করুন'), body: b('By the deadline on your decision on acceptance (30 September 2026 for the general round, 31 August 2026 for the English-taught first-period round).', 'আপনার decision on acceptance-এ দেওয়া শেষ তারিখের মধ্যে (general round-এর জন্য ৩০ September 2026, ইংরেজি-মাধ্যম প্রথম সময়ের round-এর জন্য ৩১ August 2026)।') },
    ],
    status: 'verified',
    sources: [SI_UM_ADMISSION],
  },
  programs: [],
  lastVerified: READ,
};

const UP: UniversityProfile = {
  id: 'si-up',
  countryCode: 'SI',
  name: 'University of Primorska',
  city: 'Koper',
  ownership: 'public',
  officialUrl: 'https://www.upr.si/en',
  admissionsUrl: SI_UP_APPLY.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '1201-1400', sourceUrl: QS_UP.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A medium-sized public university on the Slovenian coast in Koper, with six faculties and one research institute, with a notably international student body and several English-taught programmes.',
    'Slovenia-র coast-এ Koper-এ একটি মাঝারি আকারের সরকারি university, ছয়টি faculty আর একটি research institute সহ, যথেষ্ট international student সহ আর কয়েকটি ইংরেজি-মাধ্যম programme সহ।',
  ),
  tuition: {
    ...txt(
      'Full-time undergraduate and master\'s study is tuition-free for Slovenians, EU citizens, Slovenians abroad, permanent residents of Slovenia who are Slovenian taxpayers, citizens of the bilateral-agreement Western Balkan countries, people with granted temporary protection, and CMEPIUS/Ad Futura scholarship holders. For 2026/2027, tuition for everyone else runs EUR 2,500.00–3,850.00/year for bachelor\'s programmes, EUR 2,998.00–4,400.00/year for master\'s programmes, and EUR 1,000.00–5,800.00/year for doctoral programmes (varying by faculty and study year), published per programme on the university\'s own price list.',
      'Full-time undergraduate আর master\'s পড়া tuition-free Slovenian, EU নাগরিক, বিদেশে থাকা Slovenian, Slovenia-র tax দেওয়া permanent resident, bilateral-agreement Western Balkan দেশের নাগরিক, temporary protection পাওয়া মানুষ, আর CMEPIUS/Ad Futura scholarship holder-দের জন্য। 2026/2027-এর জন্য, বাকি সবার tuition bachelor\'s programme-এ বছরে EUR 2,500.00–3,850.00, master\'s programme-এ বছরে EUR 2,998.00–4,400.00, আর doctoral programme-এ বছরে EUR 1,000.00–5,800.00 (faculty আর পড়ার বছর অনুযায়ী আলাদা), university-র নিজস্ব price list-এ প্রতি programme অনুযায়ী প্রকাশিত।',
      'verified',
      [SI_UP_TUITION],
    ),
    money: { amount: 2500, max: 5800, currency: 'EUR', period: 'year' },
  },
  deadlines: txt(
    'Non-EU citizens (outside the Western Balkan bilateral-agreement group) can apply to undergraduate programmes for 2026/2027 in two periods: 18 February – 18 March 2026 (document deadline 18 March, or 13 July for candidates whose final certificates issue in 2026) and 20–27 July 2026. Western Balkan citizens have four periods running from 18 February through 24 September 2026; master\'s-level non-EU (non-Western-Balkan) applicants apply 8 April – 3 August 2026 or 20–27 August 2026.',
    'Non-EU নাগরিক (Western Balkan bilateral-agreement গ্রুপের বাইরে) 2026/2027-এর undergraduate programme-এর জন্য দুই সময়ে আবেদন করতে পারেন: ১৮ February – ১৮ March 2026 (document-এর শেষ তারিখ ১৮ March, বা 2026-এ final certificate ইস্যু হওয়া আবেদনকারীদের জন্য ১৩ July) আর ২০–২৭ July 2026। Western Balkan নাগরিকদের ১৮ February থেকে ২৪ September 2026 পর্যন্ত চার সময় আছে; master\'s-level non-EU (non-Western-Balkan) আবেদনকারীরা ৮ April – ৩ August 2026 বা ২০–২৭ August 2026-এ আবেদন করেন।',
    'verified',
    [SI_UP_APPLY],
  ),
  nextIntake: intake('confirmed', [SI_UP_APPLY], b('Non-EU first application period 18 February – 18 March 2026', 'Non-EU প্রথম আবেদনের সময় ১৮ February – ১৮ March 2026')),
  admission: txt(
    'Applications for degree study are submitted electronically via the national eVŠ portal; non-EU applicants (citizens of countries with higher migration risk, i.e. needing a Schengen visa) go through a mandatory interview as part of the admission procedure. The UP Admissions Office oversees undergraduate admission; postgraduate admission is managed by each faculty\'s own Student Office.',
    'Degree পড়ার আবেদন জাতীয় eVŠ portal-এ electronically জমা দিতে হয়; non-EU আবেদনকারীরা (higher migration risk-এর দেশের নাগরিক, অর্থাৎ Schengen visa লাগে) ভর্তি প্রক্রিয়ার অংশ হিসেবে একটি বাধ্যতামূলক interview-এর মধ্য দিয়ে যান। UP Admissions Office undergraduate ভর্তি দেখে; postgraduate ভর্তি প্রতিটি faculty-র নিজস্ব Student Office দেখে।',
    'verified',
    [SI_UP_APPLY],
  ),
  english: NOT_VERIFIED_FEE([SI_UP_APPLY]),
  documents: {
    required: [b('Secondary-education or prior-degree documents', 'Secondary-education বা আগের degree-র document'), b('Completed e-application via the eVŠ portal', 'eVŠ portal-এর মাধ্যমে পূর্ণ করা e-application')],
    mayBeRequired: [b('English-proficiency proof, where the programme requires it (B1 or B2)', 'প্রয়োজনে English-proficiency-র প্রমাণ (B1 বা B2)'), b('Interview attendance, for citizens of higher-migration-risk countries', 'Higher-migration-risk দেশের নাগরিকদের জন্য interview-এ উপস্থিতি')],
    status: 'partly-verified',
    sources: [SI_UP_APPLY],
  },
  applicationFee: NOT_VERIFIED_FEE([SI_UP_APPLY]),
  scholarships: NOT_VERIFIED_FEE([SI_UP_TUITION]),
  applicationRoute: txt('Online via the national eVŠ e-application portal (portal.evs.gov.si).', 'জাতীয় eVŠ e-application portal-এ (portal.evs.gov.si) online।', 'verified', [SI_UP_APPLY]),
  steps: {
    items: [
      { title: b('Choose a faculty and study programme', 'একটি faculty আর study programme বাছুন'), body: b('Six faculties and one research institute; several programmes are taught fully or partly in English.', 'ছয়টি faculty আর একটি research institute; কয়েকটি programme সম্পূর্ণ বা আংশিকভাবে ইংরেজিতে পড়ানো হয়।') },
      { title: b('Submit the e-application via eVŠ within your application period', 'আপনার আবেদনের সময়ের মধ্যে eVŠ-র মাধ্যমে e-application জমা দিন'), body: b('Non-EU citizens outside the Western Balkan bilateral-agreement group have two undergraduate application periods.', 'Western Balkan bilateral-agreement গ্রুপের বাইরের non-EU নাগরিকদের undergraduate-এ দুটি আবেদনের সময় আছে।') },
      { title: b('Attend the admission interview, if required', 'প্রয়োজনে ভর্তির interview দিন'), body: b('Mandatory for citizens of countries whose nationals need a Schengen visa.', 'Schengen visa লাগে এমন দেশের নাগরিকদের জন্য বাধ্যতামূলক।') },
      { title: b('Pay tuition on enrolment, unless exempt', 'Exempt না হলে ভর্তির সময় tuition দিন'), body: b('EUR 2,500–3,850/year for bachelor\'s programmes in 2026/2027, by faculty and programme.', '2026/2027-এ bachelor\'s programme-এ বছরে EUR 2,500–3,850, faculty আর programme অনুযায়ী।') },
      VISA_STEP,
      { title: b('Enrol at the faculty', 'Faculty-তে enrol করুন'), body: b('Based on your decision on acceptance, by the deadline it states.', 'আপনার decision on acceptance-এ দেওয়া শেষ তারিখের মধ্যে।') },
    ],
    status: 'verified',
    sources: [SI_UP_APPLY, SI_UP_TUITION],
  },
  programs: [],
  lastVerified: READ,
};

const UNG: UniversityProfile = {
  id: 'si-ung',
  countryCode: 'SI',
  name: 'University of Nova Gorica',
  city: 'Nova Gorica',
  ownership: 'private',
  officialUrl: 'https://ung.si/en/',
  admissionsUrl: SI_UNG_FEES.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: null, sourceUrl: QS_UNG.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A small, private, research-oriented university founded in 1995, with schools of engineering and management, humanities, environmental sciences, science, arts, and viticulture and enology, plus a graduate school for doctoral study. It is not ranked in the QS World University Rankings 2027 edition; topuniversities.com instead lists it in a separate QS Europe university ranking.',
    'একটি ছোট, private, গবেষণা-কেন্দ্রিক university, 1995 সালে প্রতিষ্ঠিত, engineering and management, humanities, environmental sciences, science, arts, আর viticulture and enology-র school সহ, সাথে doctoral পড়ার জন্য একটি graduate school। এটা QS World University Rankings 2027 সংস্করণে ranked না; topuniversities.com বরং এটাকে আলাদা একটি QS Europe university ranking-এ তালিকাভুক্ত করে।',
  ),
  tuition: {
    ...txt(
      'Set per programme: full-time bachelor\'s and most master\'s programmes charge Slovenian, EU and bilateral-agreement students nothing, but non-EU/non-exempt students (and all part-time students) pay EUR 2,800.00–3,500.00/year for bachelor\'s programmes, EUR 2,800.00–5,000.00/year for master\'s programmes (one master\'s, Leadership in Open Education, is EUR 5,000.00/year for everyone), and EUR 4,000.00/year for doctoral programmes, per the university\'s 2025/2026 published price list.',
      'প্রতি programme অনুযায়ী ঠিক হয়: full-time bachelor\'s আর অধিকাংশ master\'s programme-এ Slovenian, EU আর bilateral-agreement student-দের কিছু দিতে হয় না, কিন্তু non-EU/non-exempt student (আর সব part-time student) bachelor\'s programme-এ বছরে EUR 2,800.00–3,500.00, master\'s programme-এ বছরে EUR 2,800.00–5,000.00 (একটি master\'s, Leadership in Open Education, সবার জন্য বছরে EUR 5,000.00), আর doctoral programme-এ বছরে EUR 4,000.00 দেন, university-র 2025/2026-এর প্রকাশিত price list অনুযায়ী।',
      'verified',
      [SI_UNG_FEES],
    ),
    money: { amount: 2800, max: 5000, currency: 'EUR', period: 'year' },
  },
  deadlines: NOT_VERIFIED_FEE([SI_UNG_FEES]),
  nextIntake: intake('varies', [SI_UNG_FEES]),
  admission: txt(
    'An interview fee of EUR 30.00 is charged specifically "for a candidate from the list of countries with a higher migration risk" under Article 13 of the Higher Education Act (ZViS), per study programme applied to; general admission is otherwise handled per programme by the enrolling school.',
    'Higher Education Act (ZViS)-এর Article 13-এর অধীনে বিশেষভাবে "higher migration risk-এর দেশের তালিকার আবেদনকারীর জন্য" প্রতি আবেদন করা study programme-এ EUR 30.00 interview fee নেওয়া হয়; সাধারণ ভর্তি অন্যথায় প্রতি programme ভর্তি করা school দেখে।',
    'partly-verified',
    [SI_UNG_FEES],
  ),
  english: NOT_VERIFIED_FEE([SI_UNG_FEES]),
  documents: {
    required: [b('Programme-specific application documents (set by the enrolling school)', 'Programme-specific আবেদনের document (ভর্তি করা school ঠিক করে)')],
    mayBeRequired: [b('Attendance at an admission interview, with its own EUR 30 fee, for applicants from higher-migration-risk countries', 'Higher-migration-risk দেশের আবেদনকারীদের জন্য, নিজস্ব EUR 30 fee সহ ভর্তির interview-এ উপস্থিতি')],
    status: 'not-verified',
    sources: [SI_UNG_FEES],
  },
  applicationFee: txt('EUR 30.00 per study programme, specifically for the mandatory interview of applicants from higher-migration-risk countries; no separate general application fee was itemized on the page read.', 'Higher-migration-risk দেশের আবেদনকারীদের বাধ্যতামূলক interview-এর জন্য প্রতি study programme-এ বিশেষভাবে EUR 30.00; পড়া page-এ আলাদা কোনো সাধারণ application fee তালিকাভুক্ত ছিল না।', 'partly-verified', [SI_UNG_FEES]),
  scholarships: txt(
    'The University of Nova Gorica Scholarship Fund and the University of Nova Gorica Foundation both run their own scholarship calls for students, administered by the university itself; eligibility and amounts were not itemized on the page read.',
    'University of Nova Gorica Scholarship Fund আর University of Nova Gorica Foundation দুটোই student-দের জন্য নিজস্ব scholarship call চালায়, university নিজেই administer করে; যোগ্যতা আর পরিমাণ পড়া page-এ তালিকাভুক্ত ছিল না।',
    'not-verified',
    [SI_UNG_FEES],
  ),
  applicationRoute: NOT_VERIFIED_FEE([SI_UNG_FEES]),
  steps: {
    items: [
      { title: b('Choose a school and study programme', 'একটি school আর study programme বাছুন'), body: b('Engineering and management, humanities, environmental sciences, science, arts, or viticulture and enology, plus doctoral study at the graduate school.', 'Engineering and management, humanities, environmental sciences, science, arts, বা viticulture and enology, সাথে graduate school-এ doctoral পড়া।') },
      { title: b('Submit your application to the enrolling school', 'ভর্তি করা school-এ আবেদন জমা দিন'), body: b('Requirements are set per programme; not itemized on the page read.', 'শর্ত প্রতি programme অনুযায়ী ঠিক হয়; পড়া page-এ তালিকাভুক্ত ছিল না।') },
      { title: b('Attend the admission interview, if from a higher-migration-risk country', 'Higher-migration-risk দেশের হলে ভর্তির interview দিন'), body: b('Costs EUR 30 per study programme applied to, under Article 13 of the Higher Education Act (ZViS).', 'Higher Education Act (ZViS)-এর Article 13-এর অধীনে প্রতি আবেদন করা study programme-এ EUR 30 খরচ হয়।') },
      { title: b('Pay the first instalment of tuition, unless exempt', 'Exempt না হলে tuition-এর প্রথম instalment দিন'), body: b('Tuition can be paid in two equal instalments: on enrolment, and by 31 January.', 'Tuition দুটি সমান instalment-এ দেওয়া যায়: ভর্তির সময়, আর ৩১ January-এর মধ্যে।') },
      VISA_STEP,
      { title: b('Pay the annual UNG fee', 'বার্ষিক UNG fee দিন'), body: b('A EUR 15 fee for e-services and library membership is due on enrolment.', 'E-services আর library membership-এর জন্য EUR 15 fee ভর্তির সময় দিতে হয়।') },
    ],
    status: 'partly-verified',
    sources: [SI_UNG_FEES],
  },
  programs: [],
  lastVerified: READ,
};

export const SI_UNI_LAYER: CountryUniversityLayer = {
  code: 'SI',
  universities: [UL, UM, UNG, UP],
  visaStats: [],
  unverified: [
    {
      id: 'si-bd-visa-approval-rate',
      label: b('Bangladesh-specific temporary-residence-permit (study) approval or refusal rate', 'বাংলাদেশ-নির্দিষ্ট temporary-residence-permit (study) অনুমোদন বা প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific residence-permit approval-rate figure, or a verified country-wide international-student headcount broken down by nationality from an official Slovenian statistics source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'si-english-requirements-by-faculty',
      label: b('A single, university-wide minimum English score for every Slovenian university', 'প্রতিটি Slovenian university-র জন্য একক, university-জুড়ে ন্যূনতম English score'),
      status: 'not-verified',
      note: 'Slovenian public universities set English requirements per faculty and programme, not centrally; only a handful of faculty-level examples (e.g. University of Maribor\'s Faculty of Logistics) could be verified from an official page, so no single figure is shown for a university as a whole.',
    },
  ],
  lastVerified: READ,
};

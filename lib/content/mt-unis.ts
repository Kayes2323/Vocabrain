import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import {
  MT_MCAST_FEES_NON_EU,
  MT_QS_SEARCH,
  MT_READ,
  MT_UM_BANGLADESH,
  MT_UM_DATES_DEADLINES,
  MT_UM_DOCTORAL_SCHOLARSHIPS,
  MT_UM_ENGLISH,
  MT_UM_FEES_NON_EU,
  MT_UM_QS,
  MT_UM_SCHOLARSHIPS,
  MT_UM_TUITION_FEES,
} from './mt-sources';

/**
 * Malta: university → program layer, built the same way as Poland's and
 * Malaysia's (lib/content/pl-unis.ts, my-unis.ts). The ranking is QS World
 * University Rankings 2027 as printed on the University of Malta's
 * topuniversities.com profile; MCAST was not found listed in that edition's
 * search, so its rank is honestly recorded as null. Anything that could not
 * be verified on an official page is left marked not-verified — never
 * guessed.
 */

const READ = MT_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the institution’s official admissions page.', 'যাচাই হয়নি — institution-এর official admissions page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Get a Type D national visa if needed, then apply in person for a study residence permit', 'প্রয়োজনে একটি Type D national visa নিন, তারপর সশরীরে একটি study residence permit-এর জন্য আবেদন করুন'),
  body: b('If your nationality needs a visa to enter Schengen, get a National Long-Stay (Type D) visa for study purposes from a Maltese embassy or consulate before travelling. You cannot get the residence permit itself from abroad — after arriving in Malta, apply in person, online through Identità’s Expatriates Portal plus a biometrics appointment, for the study residence permit. See the Malta visa section on the country page.', 'আপনার nationality-র Schengen-এ ঢুকতে visa লাগলে, যাওয়ার আগে একটি Maltese embassy বা consulate থেকে পড়াশোনার জন্য একটি National Long-Stay (Type D) visa নিন। Residence permit নিজেই বিদেশ থেকে পাওয়া যায় না — Malta-এ পৌঁছানোর পর, সশরীরে, Identità-র Expatriates Portal-এর মাধ্যমে অনলাইনে, সঙ্গে একটি biometrics appointment, study residence permit-এর জন্য আবেদন করুন। Country page-এর Malta visa section দেখুন।'),
};

// ------------------------------------------------------------------ universities

const UM: UniversityProfile = {
  id: 'mt-um',
  countryCode: 'MT',
  name: 'University of Malta',
  city: 'Msida',
  ownership: 'public',
  officialUrl: 'https://www.um.edu.mt/',
  admissionsUrl: MT_UM_TUITION_FEES.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=696', sourceUrl: MT_UM_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Malta’s only public university and the country’s highest-ranked institution in the QS World University Rankings 2027 (joint 696th), based in Msida, teaching entirely in English and running a dedicated International School for Foundation Studies for overseas applicants, including from Bangladesh, who hold a secondary qualification not directly accepted for undergraduate entry.',
    'Malta-এর একমাত্র public university আর QS World University Rankings 2027-এ (joint 696th) দেশের সর্বোচ্চ rank পাওয়া institution, Msida-তে, সম্পূর্ণভাবে English-এ পড়ায় আর বিদেশি আবেদনকারীদের জন্য, Bangladesh থেকেও, যাদের secondary qualification সরাসরি undergraduate ভর্তির জন্য গ্রহণযোগ্য নয়, একটি নিবেদিত International School for Foundation Studies চালায়।',
  ),
  tuition: {
    ...txt(
      'UM’s own non-EU/non-EEA fee schedule sets an annual fee per programme category, not a single nationwide figure — e.g. arts-based and business-related undergraduate programmes EUR 8,500/year, science-based undergraduate programmes EUR 10,800/year, arts/business postgraduate (Certificate/Diploma/Master’s, except the Executive MBA) EUR 10,800/year, science-based postgraduate EUR 13,400/year, the Executive MBA EUR 14,400/year, doctoral programmes EUR 11,000/year full-time (EUR 5,500/year part-time), and Doctor of Medicine and Surgery or Master of Dental Surgery EUR 26,000/year. Certain programmes may also carry additional bench fees, decided case by case.',
      'UM-এর নিজের non-EU/non-EEA fee schedule প্রতি programme category অনুযায়ী একটি বার্ষিক fee ঠিক করে, একক জাতীয় সংখ্যা না — যেমন arts-based আর business-related undergraduate programme বছরে EUR 8,500, science-based undergraduate programme বছরে EUR 10,800, arts/business postgraduate (Certificate/Diploma/Master\'s, Executive MBA ছাড়া) বছরে EUR 10,800, science-based postgraduate বছরে EUR 13,400, Executive MBA বছরে EUR 14,400, doctoral programme বছরে EUR 11,000 full-time (part-time বছরে EUR 5,500), আর Doctor of Medicine and Surgery বা Master of Dental Surgery বছরে EUR 26,000। কিছু programme-এ অতিরিক্ত bench fee-ও লাগতে পারে, case by case ঠিক হয়।',
      'verified',
      [MT_UM_FEES_NON_EU],
    ),
    money: { amount: 8500, max: 26000, currency: 'EUR', period: 'year' },
  },
  deadlines: txt(
    'UM’s own dates-and-deadlines page states, for the October 2026 intake, the deadline for non-EU applicants requiring a visa to travel to Malta was 1 July 2026 at 14:00, and the general late-application deadline was 15 September 2026 at 14:00; a smaller February intake also runs. Deadlines for the next cycle were not yet published on the page read for this guide — always check the current cycle’s own dates.',
    'UM-এর নিজের dates-and-deadlines page বলে, October 2026 intake-এর জন্য, Malta-এ যাওয়ার জন্য visa লাগা non-EU আবেদনকারীদের deadline ছিল 1 July 2026, 14:00-এ, আর সাধারণ late-application deadline ছিল 15 September 2026, 14:00-এ; একটি ছোট February intake-ও চলে। এই guide-এর জন্য পড়া page-এ পরের cycle-এর deadline তখনো প্রকাশিত হয়নি — সবসময় চলতি cycle-এর নিজের date চেক করুন।',
    'partly-verified',
    [MT_UM_DATES_DEADLINES],
  ),
  nextIntake: intake('confirmed', [MT_UM_DATES_DEADLINES], b('A main October intake (apply online from the previous November) and a smaller February intake', 'একটি মূল October intake (আগের November থেকে অনলাইনে আবেদন) আর একটি ছোট February intake')),
  admission: txt(
    'UM’s own Bangladesh country-specific page states that applicants holding the Higher Secondary Certificate (HSC) are offered pathway programmes at UM’s own International School for Foundation Studies to develop the skills needed for undergraduate entry, with entry into those programmes at that school’s sole discretion; Master’s applicants are assessed case by case against each course’s own classification/GPA requirement on UM’s Course Finder.',
    'UM-এর নিজের Bangladesh country-specific page বলে Higher Secondary Certificate (HSC) থাকা আবেদনকারীদের undergraduate ভর্তির জন্য প্রয়োজনীয় দক্ষতা তৈরি করতে UM-এর নিজের International School for Foundation Studies-এ pathway programme দেওয়া হয়, এই programme-এ ভর্তি সেই school-এর একক বিচারে; Master\'s আবেদনকারীদের UM-এর Course Finder-এ প্রতিটি course-এর নিজস্ব classification/GPA শর্তের বিরুদ্ধে case by case মূল্যায়ন করা হয়।',
    'verified',
    [MT_UM_BANGLADESH],
  ),
  english: txt(
    'UM’s own English Language Requirements page requires applicants who completed secondary education overseas to present a Secure English Language Test (SELT) result — e.g. Academic IELTS 6.0 overall (6.0 writing, 5.5 reading/listening/speaking) for an undergraduate course, or 6.5 overall (6.0 in each skill) for a postgraduate/doctoral course; TOEFL iBT, Cambridge certificates, Pearson PTE Academic, Trinity ISE and UM’s own International Student English Test (ISET) are also accepted, each at its own stated level. The SELT deadline for the October 2026 intake was 1 July 2026 for non-EU applicants needing a visa.',
    'UM-এর নিজের English Language Requirements page overseas-এ secondary education শেষ করা আবেদনকারীদের একটি Secure English Language Test (SELT) result জমা দিতে বলে — যেমন undergraduate course-এর জন্য Academic IELTS 6.0 overall (6.0 writing, 5.5 reading/listening/speaking), বা postgraduate/doctoral course-এর জন্য 6.5 overall (প্রতি skill-এ 6.0); TOEFL iBT, Cambridge certificate, Pearson PTE Academic, Trinity ISE, আর UM-এর নিজের International Student English Test (ISET)-ও গ্রহণযোগ্য, প্রতিটি নিজস্ব ঠিক করা level-এ। October 2026 intake-এর জন্য visa লাগা non-EU আবেদনকারীদের SELT deadline ছিল 1 July 2026।',
    'verified',
    [MT_UM_ENGLISH],
  ),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [MT_UM_TUITION_FEES] },
  applicationFee: NOT_VERIFIED_FEE([MT_UM_TUITION_FEES]),
  scholarships: txt(
    'UM’s own Scholarships page (International Office), as read for this guide, states plainly: "Currently there are no scholarships available at the UM." The Doctoral School’s own Scholarships and Grants page separately lists "Funded studentships" (specific, project-tied PhD positions) and points to the same non-EU/EEA scholarships page; no current, general, full-degree UM scholarship for Bangladeshi applicants was confirmed on the official pages read for this guide.',
    'UM-এর নিজের Scholarships page (International Office), এই guide-এর জন্য পড়া অনুযায়ী, সরাসরি বলে: "Currently there are no scholarships available at the UM।" Doctoral School-এর নিজের Scholarships and Grants page আলাদাভাবে "Funded studentships" (নির্দিষ্ট, project-ভিত্তিক PhD position) তালিকাভুক্ত করে আর একই non-EU/EEA scholarships page-এর দিকে নির্দেশ করে; এই guide-এর জন্য পড়া official page-এ Bangladeshi আবেদনকারীদের জন্য কোনো বর্তমান, সাধারণ, full-degree UM scholarship নিশ্চিত হয়নি।',
    'verified',
    [MT_UM_SCHOLARSHIPS, MT_UM_DOCTORAL_SCHOLARSHIPS],
  ),
  applicationRoute: txt('Online via UM’s own Course Finder / application portal (um.edu.mt/courses), as described on UM’s own dates-and-deadlines page.', 'UM-এর নিজস্ব Course Finder / application portal (um.edu.mt/courses)-এর মাধ্যমে online, UM-এর নিজের dates-and-deadlines page-এ বর্ণিত।', 'partly-verified', [MT_UM_DATES_DEADLINES]),
  steps: {
    items: [
      { title: b('Check your programme’s fee category and SELT deadline', 'আপনার programme-এর fee category আর SELT deadline দেখুন'), body: b('Non-EU fees are set per programme category on UM’s own fee schedule, and the English-test deadline is earlier for applicants who need a visa.', 'Non-EU fee UM-এর নিজের fee schedule-এ প্রতি programme category অনুযায়ী ঠিক হয়, আর visa লাগা আবেদনকারীদের জন্য English-test deadline আগে।') },
      { title: b('Apply online via UM’s Course Finder before the visa-applicant deadline', 'Visa-applicant deadline-এর আগে UM-এর Course Finder-এর মাধ্যমে অনলাইনে আবেদন করুন'), body: b('Non-EU applicants who need a visa to travel to Malta face an earlier cut-off than other applicants, per UM’s own dates-and-deadlines page.', 'UM-এর নিজের dates-and-deadlines page অনুযায়ী, Malta-এ যাওয়ার জন্য visa লাগা non-EU আবেদনকারীদের অন্য আবেদনকারীদের তুলনায় আগে deadline।') },
      VISA_STEP,
    ],
    status: 'partly-verified',
    sources: [MT_UM_TUITION_FEES, MT_UM_DATES_DEADLINES],
  },
  programs: [],
  lastVerified: READ,
};

const MCAST: UniversityProfile = {
  id: 'mt-mcast',
  countryCode: 'MT',
  name: 'Malta College of Arts, Science and Technology (MCAST)',
  city: 'Paola',
  ownership: 'public',
  officialUrl: 'https://mcast.edu.mt/',
  admissionsUrl: MT_MCAST_FEES_NON_EU.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: null, sourceUrl: MT_QS_SEARCH.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Malta’s state vocational and applied-higher-education college, teaching in English from certificate level up to Doctoral degrees (MQF Levels 1–8), with its own international office and non-EU fee schedule; not listed in the QS World University Rankings 2027.',
    'Malta-এর রাষ্ট্রীয় vocational আর applied-higher-education college, certificate level থেকে Doctoral degree (MQF Level 1–8) পর্যন্ত English-এ পড়ায়, নিজস্ব international office আর non-EU fee schedule সহ; QS World University Rankings 2027-এ তালিকাভুক্ত না।',
  ),
  tuition: NOT_VERIFIED_FEE([MT_MCAST_FEES_NON_EU]),
  deadlines: txt(
    'MCAST’s own fee-and-payments page states full-time course applications from international students not residing in Malta are accepted between April and mid-August, and advises applying for the student visa at least 75 days before the course start date; the first instalment of tuition must be paid before MCAST issues visa-supporting documentation. A full, itemised non-EU fee table by course was not read for this guide — MCAST’s own downloadable payment-schedule PDF should be checked directly.',
    'MCAST-এর নিজের fee-and-payments page বলে Malta-তে না থাকা international student-দের থেকে full-time course application April থেকে mid-August-এর মধ্যে গ্রহণ করা হয়, আর course শুরুর তারিখের অন্তত 75 দিন আগে student visa-র জন্য আবেদনের পরামর্শ দেয়; MCAST visa-সহায়ক documentation ইস্যু করার আগে tuition-এর প্রথম কিস্তি পরিশোধ করতে হয়। এই guide-এর জন্য course অনুযায়ী একটি সম্পূর্ণ, তালিকাভুক্ত non-EU fee table পড়া হয়নি — MCAST-এর নিজের downloadable payment-schedule PDF সরাসরি দেখা উচিত।',
    'partly-verified',
    [MT_MCAST_FEES_NON_EU],
  ),
  nextIntake: intake('varies', [MT_MCAST_FEES_NON_EU], b('Full-time applications from non-resident international students are taken between April and mid-August', 'Malta-তে না থাকা international student-দের full-time application April থেকে mid-August-এর মধ্যে নেওয়া হয়')),
  admission: NOT_VERIFIED_FEE([MT_MCAST_FEES_NON_EU]),
  english: txt('MCAST’s own fee-and-payments page confirms the official language of instruction is English; a specific IELTS/TOEFL minimum for non-EU applicants was not itemized on the pages read for this guide.', 'MCAST-এর নিজের fee-and-payments page নিশ্চিত করে পড়ানোর official ভাষা English; এই guide-এর জন্য পড়া page-এ non-EU আবেদনকারীদের জন্য একটি নির্দিষ্ট IELTS/TOEFL ন্যূনতম তালিকাভুক্ত হয়নি।', 'partly-verified', [MT_MCAST_FEES_NON_EU]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [MT_MCAST_FEES_NON_EU] },
  applicationFee: NOT_VERIFIED_FEE([MT_MCAST_FEES_NON_EU]),
  scholarships: txt('MCAST’s own fee-and-payments page describes a Bachelor’s-level scholarship exempting students from fees for their final year of a 3- or 4-year degree (forfeited if the student must repeat a year), plus a separate 70% tax-rebate funding opportunity (Malta’s Get Qualified scheme) available to students who pay tax in Malta after graduating. No Bangladesh-specific, full-degree, upfront scholarship was found on the pages read for this guide.', 'MCAST-এর নিজের fee-and-payments page একটি Bachelor\'s-level scholarship বর্ণনা করে যা 3- বা 4-বছরের degree-র শেষ বছরের fee থেকে exempt করে (একটি বছর repeat করতে হলে বাতিল হয়), সঙ্গে একটি আলাদা 70% tax-rebate funding সুযোগ (Malta-র Get Qualified scheme) যা গ্র্যাজুয়েশনের পর Malta-তে tax দেওয়া student-দের জন্য পাওয়া যায়। এই guide-এর জন্য পড়া page-এ কোনো Bangladesh-specific, full-degree, আগাম scholarship পাওয়া যায়নি।', 'partly-verified', [MT_MCAST_FEES_NON_EU]),
  applicationRoute: txt('Online, after a non-EU candidate requests an account; MCAST’s own international team (applyinternational@mcast.edu.mt / MG2i International) handles identity verification before the application proceeds.', 'অনলাইনে, একজন non-EU candidate account-এর জন্য request করার পর; MCAST-এর নিজের international team (applyinternational@mcast.edu.mt / MG2i International) application এগোনোর আগে identity verification করে।', 'partly-verified', [MT_MCAST_FEES_NON_EU]),
  steps: {
    items: [
      { title: b('Request an online account and apply between April and mid-August', 'একটি অনলাইন account-এর জন্য request করুন আর April থেকে mid-August-এর মধ্যে আবেদন করুন'), body: b('MCAST’s own international team verifies identity and basic data before the application can proceed.', 'MCAST-এর নিজের international team application এগোনোর আগে identity আর basic data verify করে।') },
      { title: b('Pay the first tuition instalment to receive visa-supporting documents', 'Visa-সহায়ক document পেতে প্রথম tuition কিস্তি পরিশোধ করুন'), body: b('Apply for your student visa at least 75 days before the course start date, per MCAST’s own guidance.', 'MCAST-এর নিজের পরামর্শ অনুযায়ী, course শুরুর তারিখের অন্তত 75 দিন আগে আপনার student visa-র জন্য আবেদন করুন।') },
      VISA_STEP,
    ],
    status: 'partly-verified',
    sources: [MT_MCAST_FEES_NON_EU],
  },
  programs: [],
  lastVerified: READ,
};

export const MT_UNI_LAYER: CountryUniversityLayer = {
  code: 'MT',
  universities: [MCAST, UM],
  visaStats: [],
  unverified: [
    {
      id: 'mt-bd-visa-approval-rate',
      label: b('Bangladesh-specific visa/residence-permit approval or refusal rate', 'বাংলাদেশ-নির্দিষ্ট visa/residence-permit অনুমোদন বা প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific study-visa or study-residence-permit approval-rate figure, or a verified Malta-wide international-student headcount broken down by nationality from an official Maltese source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'mt-minimum-funds-figure',
      label: b('Exact euro amount of the "60% of national minimum wage or poverty line" funds threshold', '"জাতীয় minimum wage বা poverty line-এর 60%" funds-এর সীমার সঠিক euro পরিমাণ'),
      status: 'not-verified',
      note: 'Identità’s own FAQ states the minimum financial-means threshold is 60% of Malta’s annual national minimum wage or poverty line (whichever is higher), pro-rated to the household size and stay duration, but does not itself print the resulting euro figure on the page read; the current national minimum-wage rate was found only on secondary (non-official) sources for this guide, so no converted euro amount is shown as an official figure.',
    },
    {
      id: 'mt-um-postgrad-fee-waiver-detail',
      label: b('University of Malta non-EU/EEA Master-by-Research/PhD fee-waiver scheme (40%–100%)', 'University of Malta-র non-EU/EEA Master-by-Research/PhD fee-waiver scheme (40%–100%)'),
      status: 'needs-review',
      note: 'Several aggregator (non-official) pages describe a UM tuition fee-waiver scheme of 40%–100% for unconditionally accepted non-EU/EEA Master by Research and PhD applicants, decided by an interview-based selection board. UM’s own Scholarships page, read directly for this guide, instead states plainly that no scholarships are currently available at UM, and the specific page the aggregators cite (um.edu.mt/study/feesfunding/scholarships/masterresearchphd) returned a 404 when read directly for this guide — so this scheme’s current existence and terms are not confirmed from an official page read here.',
    },
  ],
  lastVerified: READ,
};

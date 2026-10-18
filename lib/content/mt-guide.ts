import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  MT_ELTCOUNCIL_TCN_WORK,
  MT_IDENTITA_STUDY_FAQ,
  MT_MCAST_FEES_NON_EU,
  MT_MFHEA_INSTITUTIONS,
  MT_MYSCHOLARSHIP_HOME,
  MT_READ,
  MT_UM_BANGLADESH,
  MT_UM_DATES_DEADLINES,
  MT_UM_DOCTORAL_SCHOLARSHIPS,
  MT_UM_ENGLISH,
  MT_UM_FEES_NON_EU,
  MT_UM_SCHOLARSHIPS,
} from './mt-sources';

/**
 * Malta reading guide, researched on its own from Malta's own official
 * sources (Identità, the Maltese government's own residence-permit agency,
 * identita.gov.mt, whose Expatriates Unit issues the student residence
 * permit; the ELT Council, a Maltese government body, eltcouncil.gov.mt;
 * the Malta Further & Higher Education Authority (MFHEA), mfhea.mt; the
 * Maltese government's own scholarships portal, myscholarship.gov.mt; and
 * the official pages of the University of Malta (UM) and the Malta College
 * of Arts, Science and Technology (MCAST)). Nothing is taken from another
 * country's guide. Malta IS an EU/Schengen member state (unlike Malaysia,
 * built earlier this session), so a Bangladeshi applicant needs a national
 * ("Type D") long-stay visa to travel (if visa-required), then must apply,
 * in person and only after arriving in Malta, for a study residence permit
 * through Identità's own Expatriates Portal — a different, in-country-only
 * process from Poland's own D-type-visa-then-Voivodeship-Office system or
 * Malaysia's EMGS→Immigration two-body system, both built earlier this
 * session. Amounts stay in euro (EUR), the source's own currency. It
 * covers Bachelor's, Master's and PhD study for Bangladeshi students.
 */

const b = (en: string, bn: string): Bilingual => ({ en, bn });

interface Opts {
  list?: Bilingual[];
  status?: GuideStatus;
  kind?: GuideKind;
  discrepancy?: Bilingual;
  allDegrees?: boolean;
}
function qa(id: string, q: Bilingual, a: Bilingual[], sources: SourceRef[], o: Opts = {}): GuideAnswer {
  return {
    id,
    q,
    a,
    sources,
    confidence: 'high',
    ...(o.list ? { list: o.list } : {}),
    ...(o.status ? { status: o.status } : {}),
    ...(o.kind ? { kind: o.kind } : {}),
    ...(o.discrepancy ? { discrepancy: o.discrepancy } : {}),
    ...(o.allDegrees ? { allDegrees: true } : {}),
  };
}

const CHECK_UNI = b(
  'The University of Malta (UM) and the Malta College of Arts, Science and Technology (MCAST) are not identical: UM sets non-EU/non-EEA tuition per programme category in its own fee schedule, while MCAST sets its own, separately published non-EU fee structure by course. Always check the exact programme on the institution’s own admissions page.',
  'University of Malta (UM) আর Malta College of Arts, Science and Technology (MCAST) একরকম না: UM তার নিজের fee schedule-এ প্রতি programme category অনুযায়ী non-EU/non-EEA tuition ঠিক করে, যখন MCAST আলাদাভাবে প্রকাশিত নিজস্ব non-EU fee structure প্রতি course অনুযায়ী ঠিক করে। সবসময় প্রতিষ্ঠানের নিজের admissions page-এ সঠিক programme দেখে নিন।',
);

const EU_NOTE = b(
  'Malta is an EU/Schengen member. A Bangladeshi applicant who needs a visa to enter Schengen must first get a National Long-Stay (Type D) visa for study purposes from a Maltese embassy or consulate before travelling; the study residence permit itself cannot be obtained from abroad — it must be applied for in person, online through Identità’s own Expatriates Portal, only after arriving in Malta.',
  'Malta EU/Schengen সদস্য। Schengen-এ ঢুকতে visa লাগা একজন Bangladeshi আবেদনকারীকে যাওয়ার আগে একটি Maltese embassy বা consulate থেকে পড়াশোনার জন্য একটি National Long-Stay (Type D) visa নিতে হবে; study residence permit নিজেই বিদেশ থেকে পাওয়া যায় না — Malta-এ পৌঁছানোর পরই, সশরীরে, Identità-র নিজের Expatriates Portal-এর মাধ্যমে অনলাইনে এর জন্য আবেদন করতে হবে।',
);

// ------------------------------------------------------------------ shared answers

const visaRequired = (id: string) =>
  qa(
    id,
    b('Does a Bangladeshi student need a visa to study in Malta?', 'Bangladesh-এর student-দের Malta-এ পড়তে visa লাগে কি?'),
    [
      b(
        'Yes, in two stages. If your nationality needs a visa to enter Schengen (as Bangladeshi nationals generally do), you first need a National Long-Stay (Type D) visa for study purposes from a Maltese embassy or consulate before travelling, per Identità’s own FAQ. This visa lets you enter Malta for education, but it is not the residence permit itself. Once in Malta, if your course lasts longer than 90 days, you must separately apply, in person and only from inside Malta, for a study residence permit — Identità’s own FAQ states this permit is for third-country nationals accepted into a full-time higher-education course (at least 15 hours of study per week) at MQF Level 5 or higher, at an institution licensed by the Malta Further & Higher Education Authority (MFHEA).',
        'হ্যাঁ, দুটি ধাপে। আপনার nationality Schengen-এ ঢুকতে visa চাইলে (Bangladeshi নাগরিকদের সাধারণত লাগে), Identità-র নিজের FAQ অনুযায়ী, যাওয়ার আগে আপনার প্রথমে পড়াশোনার জন্য একটি National Long-Stay (Type D) visa একটি Maltese embassy বা consulate থেকে লাগবে। এই visa আপনাকে শিক্ষার জন্য Malta-এ ঢোকার অনুমতি দেয়, কিন্তু এটা residence permit নিজেই না। Malta-এ পৌঁছানোর পর, আপনার course 90 দিনের বেশি হলে, আপনাকে আলাদাভাবে, সশরীরে আর শুধু Malta-এর ভেতর থেকে, একটি study residence permit-এর জন্য আবেদন করতে হবে — Identità-র নিজের FAQ বলে এই permit MQF Level 5 বা তার বেশি-র একটি full-time higher-education course-এ (সপ্তাহে অন্তত 15 ঘণ্টা পড়াশোনা) ভর্তি হওয়া, Malta Further & Higher Education Authority (MFHEA)-র licensed একটি institution-এর, third-country national-দের জন্য।',
      ),
      EU_NOTE,
    ],
    [MT_IDENTITA_STUDY_FAQ],
    { allDegrees: true },
  );

const permitProcess = (id: string) =>
  qa(
    id,
    b('How does the study residence permit application work, and how long does it take?', 'Study residence permit application কীভাবে কাজ করে, আর কত সময় লাগে?'),
    [
      b(
        'Identità’s own FAQ describes the process: after arriving in Malta on the correct visa (or within your visa-free period), you apply online via Identità’s Expatriates Portal, choosing "Study – New" (Form CEA N.01), uploading your acceptance letter, proof of tuition payment, proof of funds, insurance and accommodation documents, and paying the fee online. You are then called in person only for biometrics and, later, to collect your eResidence card. Identità’s own page says processing "typically takes a few weeks," and if you applied while your visa or initial entry period was still valid, you may legally remain in Malta while the decision is pending, even if that visa expires during the wait. A first-time permit is normally issued for one year or for the length of the course if shorter; multi-year courses get the permit renewed annually (Form CEA N.02) before each expiry.',
        'Identità-র নিজের FAQ এই process বর্ণনা করে: সঠিক visa-তে (বা আপনার visa-free সময়ের মধ্যে) Malta-এ পৌঁছানোর পর, আপনি Identità-র Expatriates Portal-এর মাধ্যমে অনলাইনে আবেদন করেন, "Study – New" (Form CEA N.01) বেছে, আপনার admission letter, tuition payment-এর proof, funds-এর proof, insurance আর accommodation document upload করে, আর অনলাইনে fee পরিশোধ করে। তারপর আপনাকে শুধু biometrics-এর জন্য আর, পরে, eResidence card সংগ্রহ করতে সশরীরে ডাকা হয়। Identità-র নিজের page বলে processing "typically takes a few weeks," আর আপনার visa বা প্রাথমিক entry period valid থাকতে থাকতে আবেদন করলে, সিদ্ধান্তের জন্য অপেক্ষা করার সময় আপনি Malta-এ আইনগতভাবে থাকতে পারেন, সেই visa অপেক্ষার সময় মেয়াদ শেষ হলেও। প্রথম permit সাধারণত এক বছরের জন্য, বা course ছোট হলে তার দৈর্ঘ্যের জন্য, ইস্যু হয়; একাধিক-বছরের course প্রতিটি মেয়াদ শেষ হওয়ার আগে বার্ষিক renew হয় (Form CEA N.02)।',
      ),
    ],
    [MT_IDENTITA_STUDY_FAQ],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'Partly verified: Identità’s own FAQ sets the rule, not the resulting euro figure. The minimum financial means required is 60% of Malta’s annual national minimum wage or poverty line (whichever is higher) for your household size, pro-rated to cover the duration of your studies; recent bank statements (the last 3 months) should clearly show you meet this. If your funds are held abroad, you must also show you can access them from Malta (e.g. an international card plus local ATM-withdrawal receipts), or rely on a sponsor’s declaration, ID copy and proof of financial capacity. The exact current euro amount this threshold works out to was not itemized on an official page read for this guide — Identità or your institution’s international office should be asked for the precise figure.',
        'আংশিকভাবে যাচাই করা: Identità-র নিজের FAQ নিয়ম ঠিক করে, ফলস্বরূপ euro সংখ্যা না। প্রয়োজনীয় ন্যূনতম আর্থিক সামর্থ্য আপনার household size-এর জন্য Malta-র বার্ষিক জাতীয় minimum wage বা poverty line-এর (যেটা বেশি) 60%, আপনার পড়াশোনার সময়কাল অনুযায়ী pro-rated; সাম্প্রতিক bank statement (গত 3 মাসের) স্পষ্টভাবে দেখাতে হবে আপনি এটা পূরণ করেন। আপনার funds বিদেশে থাকলে, Malta থেকে এতে access আছে তা-ও দেখাতে হবে (যেমন একটি international card সঙ্গে local ATM-withdrawal receipt), বা একজন sponsor-এর declaration, ID copy, আর আর্থিক সামর্থ্যের proof-এর উপর নির্ভর করতে হবে। এই threshold-এর সঠিক বর্তমান euro পরিমাণ এই guide-এর জন্য পড়া official page-এ তালিকাভুক্ত হয়নি — সঠিক সংখ্যার জন্য Identità বা আপনার institution-এর international office-কে জিজ্ঞাসা করা উচিত।',
      ),
    ],
    [MT_IDENTITA_STUDY_FAQ],
    { allDegrees: true, status: 'partly-verified' },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('Is health insurance compulsory?', 'Health insurance কি বাধ্যতামূলক?'),
    [
      b(
        'Yes, for most students, but University of Malta, MCAST and ITS students are exempt. Identità’s own FAQ requires private health insurance with a minimum of EUR 100,000 coverage for medical treatment and hospitalisation in Malta, valid for the entire duration of studies — unless you are enrolled at the University of Malta, MCAST or ITS, which are public institutions whose students can access public healthcare without charge and are exempt from buying private insurance. If your course is longer than 3 months, Identità’s own FAQ also requires a health screening (e.g. chest X-ray, blood tests) after arrival, through the Infectious Disease Prevention & Control Unit (IDCU), with its clearance included in your application.',
        'হ্যাঁ, অধিকাংশ student-এর জন্য, কিন্তু University of Malta, MCAST, আর ITS-এর student-রা exempt। Identità-র নিজের FAQ Malta-এ medical treatment আর hospitalisation-এর জন্য অন্তত EUR 100,000 coverage-এর private health insurance চায়, পুরো পড়াশোনার সময়ের জন্য valid — যদি না আপনি University of Malta, MCAST, বা ITS-এ ভর্তি হন, যেগুলো public institution যার student-রা বিনামূল্যে public healthcare access করতে পারে আর private insurance কেনা থেকে exempt। আপনার course 3 মাসের বেশি হলে, Identità-র নিজের FAQ পৌঁছানোর পর একটি health screening-ও চায় (যেমন chest X-ray, blood test), Infectious Disease Prevention & Control Unit (IDCU)-এর মাধ্যমে, যার clearance আপনার application-এ অন্তর্ভুক্ত করতে হয়।',
      ),
    ],
    [MT_IDENTITA_STUDY_FAQ],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Malta, and how many hours?', 'Malta-এ পড়ার পাশাপাশি কাজ করা যায় কি, আর কত ঘণ্টা?'),
    [
      b(
        'Yes, with conditions. Identità’s own FAQ states that after the first 90 days of your stay, students holding a study residence permit for an MQF Level 5+ course may work part-time up to 20 hours per week, combined across all employers — full-time work (40 hours/week) is not permitted during term time, and students on courses below MQF Level 5 are not eligible to work part-time under a study residence permit at all. A job itself needs an employer-obtained Employment Licence from Jobsplus (described on the ELT Council’s own published procedure for third-country students), tying you to that specific employer; working without the licence, or beyond 20 hours, risks your permit. You must also keep attending classes (minimum attendance around 75%) and keep making academic progress — work is secondary to your studies. Self-employment/freelancing is not available to students on a study residence permit.',
        'হ্যাঁ, শর্তের সাথে। Identità-র নিজের FAQ বলে আপনার থাকার প্রথম 90 দিন পরে, MQF Level 5+ course-এর জন্য study residence permit থাকা student-রা সপ্তাহে 20 ঘণ্টা পর্যন্ত part-time কাজ করতে পারে, সব employer মিলিয়ে — term time-এ full-time কাজ (সপ্তাহে 40 ঘণ্টা) অনুমোদিত না, আর MQF Level 5-এর নিচের course-এর student-রা study residence permit-এর অধীনে একেবারেই part-time কাজ করার যোগ্য না। একটি চাকরির জন্য নিজেই employer-এর নেওয়া Jobsplus-এর একটি Employment Licence লাগে (ELT Council-এর নিজের প্রকাশিত third-country student procedure-এ বর্ণিত), যা আপনাকে সেই নির্দিষ্ট employer-এর সাথে বেঁধে দেয়; licence ছাড়া, বা 20 ঘণ্টার বেশি কাজ করলে আপনার permit ঝুঁকিতে পড়ে। আপনাকে ক্লাসে উপস্থিতিও (ন্যূনতম প্রায় 75%) রাখতে হবে আর academic progress করতে থাকতে হবে — কাজ আপনার পড়াশোনার তুলনায় গৌণ। Self-employment/freelancing study residence permit-এ থাকা student-দের জন্য উপলব্ধ না।',
      ),
    ],
    [MT_IDENTITA_STUDY_FAQ, MT_ELTCOUNCIL_TCN_WORK],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Malta to work after graduating?', 'পড়া শেষে Malta-এ কাজের জন্য থাকা যায়?'),
    [
      b(
        'Yes, with a one-time, 9-month bridge. Identità’s own FAQ describes a post-study residence permit (Form CEA N.03) for non-EU students who complete an MQF Level 5+ course while holding a valid study permit: it lets you stay up to 9 months to look for a job or start a business related to your field, cannot be renewed or extended, and can only be granted once. It is not itself a work permit — once you get a job offer, your prospective employer must separately apply for a Single Permit (Malta’s combined work-and-residence permit) or an Employment Licence, which can be done while you remain in Malta rather than leaving to apply from abroad. You must apply for the post-study permit before your student permit expires, with proof of course completion, funds for 9 months (pro-rated from the same 60%-of-minimum-wage/poverty-line rule), insurance (no longer exempt even if you were as a UM/MCAST/ITS student) and accommodation.',
        'হ্যাঁ, একবারের, 9-মাসের একটি সেতু সহ। Identità-র নিজের FAQ MQF Level 5+ একটি course শেষ করা, একটি valid study permit থাকা non-EU student-দের জন্য একটি post-study residence permit (Form CEA N.03) বর্ণনা করে: এটা আপনাকে আপনার field-সম্পর্কিত চাকরি খুঁজতে বা ব্যবসা শুরু করতে 9 মাস পর্যন্ত থাকার অনুমতি দেয়, renew বা extend করা যায় না, আর একবারই দেওয়া যায়। এটা নিজেই একটি work permit না — চাকরির offer পাওয়ার পর, আপনার সম্ভাব্য employer-কে আলাদাভাবে একটি Single Permit (Malta-র combined work-and-residence permit) বা একটি Employment Licence-এর জন্য আবেদন করতে হবে, যা আপনি Malta-এ থাকতে থাকতেই করা যায়, বিদেশ থেকে আবেদনের জন্য ফিরে যাওয়া লাগে না। আপনার student permit-এর মেয়াদ শেষ হওয়ার আগে post-study permit-এর জন্য আবেদন করতে হবে, course সম্পন্নের proof, 9 মাসের funds (একই 60%-of-minimum-wage/poverty-line নিয়ম থেকে pro-rated), insurance (UM/MCAST/ITS student হিসেবে exempt থাকলেও আর না) আর accommodation সহ।',
      ),
    ],
    [MT_IDENTITA_STUDY_FAQ],
    { status: 'verified' },
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'Not verified yet as currently open to Bangladeshi applicants. The University of Malta’s own Scholarships page (International Office), as read for this guide, states plainly: "Currently there are no scholarships available at the UM." A separate, project-tied "Funded studentships" list and a "Government scholarships" link out to myscholarship.gov.mt exist elsewhere on UM’s site, but neither is a general, upfront award. The Maltese government’s own myscholarship.gov.mt portal lists scholarship schemes by MQF level (6–8) but, on the pages read for this guide, did not name an eligible-country list confirming Bangladeshi eligibility for any specific, currently open scheme. MCAST’s own fee-and-payments page describes a Bachelor’s final-year fee exemption (forfeited if a year is repeated) and a separate 70% tax-rebate funding route (Malta’s Get Qualified scheme) available only after graduating and paying tax in Malta — neither is an upfront, full-degree scholarship for Bangladeshi applicants.',
        'যাচাই হয়নি এখনো বাংলাদেশি আবেদনকারীদের জন্য বর্তমানে খোলা কিনা। University of Malta-র নিজের Scholarships page (International Office), এই guide-এর জন্য পড়া অনুযায়ী, সরাসরি বলে: "Currently there are no scholarships available at the UM।" UM-এর site-এ আলাদাভাবে একটি project-ভিত্তিক "Funded studentships" তালিকা আর একটি "Government scholarships" link (myscholarship.gov.mt-এর দিকে) আছে, কিন্তু কোনোটাই একটি সাধারণ, আগাম award না। Maltese government-এর নিজের myscholarship.gov.mt portal MQF level (6–8) অনুযায়ী scholarship scheme তালিকাভুক্ত করে কিন্তু, এই guide-এর জন্য পড়া page-এ, কোনো নির্দিষ্ট, বর্তমানে খোলা scheme-এর জন্য Bangladeshi eligibility নিশ্চিতকারী যোগ্য-দেশের তালিকার নাম দেয়নি। MCAST-এর নিজের fee-and-payments page একটি Bachelor\'s শেষ-বছরের fee exemption (একটি বছর repeat করলে বাতিল) আর একটি আলাদা 70% tax-rebate funding route (Malta-র Get Qualified scheme) বর্ণনা করে যা শুধু গ্র্যাজুয়েশনের পর আর Malta-তে tax দেওয়ার পর পাওয়া যায় — দুটোই Bangladeshi আবেদনকারীদের জন্য একটি আগাম, full-degree scholarship না।',
      ),
    ],
    [MT_UM_SCHOLARSHIPS, MT_UM_DOCTORAL_SCHOLARSHIPS, MT_MYSCHOLARSHIP_HOME, MT_MCAST_FEES_NON_EU],
    { status: 'not-verified', kind: 'guidance' },
  );

// ------------------------------------------------------------------ documents

const AUTHORITY = b('Identità (identita.gov.mt), via the Expatriates Portal.', 'Identità (identita.gov.mt), Expatriates Portal-এর মাধ্যমে।');

export const MT_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Valid passport (6–8+ months beyond intended stay)', 'বৈধ passport (থাকার ইচ্ছিত সময়ের চেয়ে 6–8+ মাস বেশি)'),
    why: b('Identità’s own FAQ requires a full copy of a valid passport for identity and travel-history purposes, and states a permit cannot be granted beyond the passport’s expiry.', 'Identità-র নিজের FAQ পরিচয় আর ভ্রমণের ইতিহাসের জন্য একটি valid passport-এর একটি সম্পূর্ণ copy চায়, আর বলে passport-এর মেয়াদের বেশি একটি permit দেওয়া যায় না।'),
    who: AUTHORITY,
    when: b('With the study residence permit application, after arrival.', 'Study residence permit application-এর সঙ্গে, পৌঁছানোর পর।'),
    where: b('Submitted online via the Expatriates Portal; originals shown at the biometrics appointment.', 'Expatriates Portal-এর মাধ্যমে অনলাইনে জমা; biometrics appointment-এ original দেখাতে হয়।'),
    prepare: b('Renew an expiring passport before applying — your permit cannot extend beyond its expiry.', 'মেয়াদ শেষ হওয়ার কাছাকাছি passport আবেদনের আগে renew করুন — আপনার permit এর মেয়াদের বেশি হতে পারবে না।'),
    groups: ['general', 'visa'],
    sources: [MT_IDENTITA_STUDY_FAQ],
  },
  {
    id: 'type-d-visa',
    name: b('National Long-Stay (Type D) visa (if your nationality needs one)', 'National Long-Stay (Type D) visa (আপনার nationality-র লাগলে)'),
    why: b('Identità’s own FAQ requires visa-required nationalities to obtain a Type D visa for study purposes before travelling; the study residence permit cannot be obtained from abroad.', 'Identità-র নিজের FAQ visa লাগা nationality-দের যাওয়ার আগে পড়াশোনার জন্য একটি Type D visa নিতে বলে; study residence permit বিদেশ থেকে পাওয়া যায় না।'),
    who: b('A Maltese embassy or consulate.', 'একটি Maltese embassy বা consulate।'),
    when: b('Before travelling to Malta.', 'Malta-এ যাওয়ার আগে।'),
    where: b('The Maltese embassy/consulate covering Bangladesh.', 'Bangladesh কভার করা Maltese embassy/consulate।'),
    prepare: b('Make sure the visa’s stated purpose is education and matches your course — entering on the wrong visa type can cause a permit refusal.', 'Visa-র উল্লেখিত উদ্দেশ্য education আর আপনার course-এর সাথে মিলছে তা নিশ্চিত করুন — ভুল visa type-এ ঢুকলে permit প্রত্যাখ্যাত হতে পারে।'),
    groups: ['general', 'visa'],
    sources: [MT_IDENTITA_STUDY_FAQ],
  },
  {
    id: 'acceptance-letter',
    name: b('Official acceptance/enrolment letter', 'Official acceptance/enrolment letter (ভর্তির চিঠি)'),
    why: b('Identità’s own FAQ requires a letterhead acceptance letter stating the course title, MQF level, exact start/end dates, full-time status (15+ hours/week) and, if applicable, confirmation of language proficiency.', 'Identità-র নিজের FAQ একটি letterhead acceptance letter চায় যাতে course title, MQF level, সঠিক শুরু/শেষের তারিখ, full-time status (সপ্তাহে 15+ ঘণ্টা), আর প্রয়োজনে language proficiency-র নিশ্চিতকরণ থাকে।'),
    who: b('The Maltese institution you were admitted to (e.g. UM or MCAST).', 'যে Maltese institution-এ ভর্তি হয়েছেন (যেমন UM বা MCAST)।'),
    when: b('Issued after admission, needed for both the visa and the residence-permit application.', 'ভর্তির পর ইস্যু হয়, visa আর residence-permit application দুটোর জন্য লাগে।'),
    where: b('Submitted with both the visa application and the Expatriates Portal application.', 'Visa application আর Expatriates Portal application দুটোর সাথেই জমা দিতে হয়।'),
    prepare: b('If you needed a visa to enter, the course named here must match the purpose on your visa.', 'ঢুকতে visa লাগলে, এখানে উল্লেখিত course আপনার visa-র উদ্দেশ্যের সাথে মিলতে হবে।'),
    groups: ['general', 'program', 'visa'],
    sources: [MT_IDENTITA_STUDY_FAQ],
  },
  {
    id: 'proof-of-tuition-payment',
    name: b('Proof of tuition payment', 'Tuition payment-এর proof'),
    why: b('Identità’s own FAQ requires a receipt or bank-transfer confirmation showing the school received at least the first semester’s/year’s tuition, to confirm you are fully enrolled.', 'Identità-র নিজের FAQ একটি receipt বা bank-transfer confirmation চায় যা দেখায় school অন্তত প্রথম সেমিস্টার/বছরের tuition পেয়েছে, আপনি সম্পূর্ণভাবে ভর্তি তা নিশ্চিত করতে।'),
    who: b('Your institution’s finance office.', 'আপনার institution-এর finance office।'),
    when: b('With the residence-permit application, and again at each renewal.', 'Residence-permit application-এর সঙ্গে, আর প্রতি renewal-এও আবার।'),
    where: b('Uploaded to the Expatriates Portal.', 'Expatriates Portal-এ upload করতে হয়।'),
    prepare: b('Keep the receipt for proof-of-tuition-payment at each annual renewal, not only the first time.', 'শুধু প্রথমবার না, প্রতি বার্ষিক renewal-এও proof-of-tuition-payment-এর জন্য receipt রাখুন।'),
    groups: ['general', 'visa'],
    sources: [MT_IDENTITA_STUDY_FAQ],
  },
  {
    id: 'proof-of-funds',
    name: b('Proof of sufficient funds', 'পর্যাপ্ত funds-এর proof'),
    why: b('Identità’s own FAQ sets the minimum at 60% of Malta’s annual national minimum wage or poverty line (whichever is higher), pro-rated to your household size and study duration, shown via 3 months of bank statements.', 'Identità-র নিজের FAQ ন্যূনতম পরিমাণ ঠিক করে Malta-র বার্ষিক জাতীয় minimum wage বা poverty line-এর (যেটা বেশি) 60%-তে, আপনার household size আর পড়াশোনার সময়কাল অনুযায়ী pro-rated, 3 মাসের bank statement দিয়ে দেখাতে হয়।'),
    who: AUTHORITY,
    when: b('With the residence-permit application, and updated at each renewal.', 'Residence-permit application-এর সঙ্গে, আর প্রতি renewal-এ update করতে হয়।'),
    where: b('Uploaded to the Expatriates Portal.', 'Expatriates Portal-এ upload করতে হয়।'),
    prepare: b('The exact current euro figure is not published on a simple table — confirm it with Identità or your institution; if funds are held abroad, show local access (an international card plus Malta ATM-withdrawal receipts).', 'সঠিক বর্তমান euro সংখ্যা একটি সাধারণ table-এ প্রকাশিত না — Identità বা আপনার institution-এর সাথে এটা নিশ্চিত করুন; funds বিদেশে থাকলে, local access দেখান (একটি international card সঙ্গে Malta-র ATM-withdrawal receipt)।'),
    groups: ['general', 'visa', 'bangladesh'],
    sources: [MT_IDENTITA_STUDY_FAQ],
  },
  {
    id: 'health-insurance',
    name: b('Private health insurance (min. EUR 100,000) — UM/MCAST/ITS students exempt', 'Private health insurance (ন্যূনতম EUR 100,000) — UM/MCAST/ITS student-রা exempt'),
    why: b('Identità’s own FAQ requires health insurance covering at least EUR 100,000 for medical treatment and hospitalisation, valid for the whole stay — except for students at UM, MCAST or ITS, who access public healthcare without charge instead.', 'Identità-র নিজের FAQ medical treatment আর hospitalisation-এর জন্য অন্তত EUR 100,000 কভার করা health insurance চায়, পুরো থাকার জন্য valid — UM, MCAST, বা ITS-এর student ছাড়া, যারা বিনামূল্যে public healthcare access করে।'),
    who: b('An insurer meeting Identità’s own stated conditions (not needed if exempt).', 'Identità-র নিজের শর্ত পূরণ করা একটি insurer (exempt হলে লাগে না)।'),
    when: b('With the residence-permit application; renew to cover your whole stay.', 'Residence-permit application-এর সঙ্গে; পুরো থাকার সময় কভার করতে renew করুন।'),
    where: b('Uploaded to the Expatriates Portal.', 'Expatriates Portal-এ upload করতে হয়।'),
    prepare: b('If you are exempt as a UM/MCAST/ITS student, cite the exemption and provide proof of enrolment instead of a policy — but note the exemption ends once you move to the post-study permit.', 'UM/MCAST/ITS student হিসেবে exempt হলে, একটি policy-র বদলে exemption উল্লেখ করুন আর ভর্তির proof দিন — কিন্তু মনে রাখুন post-study permit-এ গেলে এই exemption শেষ হয়ে যায়।'),
    groups: ['general', 'visa', 'arrival'],
    sources: [MT_IDENTITA_STUDY_FAQ],
  },
  {
    id: 'health-screening',
    name: b('Health screening clearance (courses over 3 months)', 'Health screening clearance (3 মাসের বেশি course)'),
    why: b('Identità’s own FAQ requires students on courses longer than 3 months to complete a health screening (e.g. chest X-ray, blood tests for infectious disease) through the Infectious Disease Prevention & Control Unit (IDCU) after arrival.', 'Identità-র নিজের FAQ 3 মাসের বেশি course-এর student-দের পৌঁছানোর পর Infectious Disease Prevention & Control Unit (IDCU)-এর মাধ্যমে একটি health screening (যেমন chest X-ray, সংক্রামক রোগের জন্য blood test) সম্পন্ন করতে বলে।'),
    who: b('The Infectious Disease Prevention & Control Unit (IDCU).', 'Infectious Disease Prevention & Control Unit (IDCU) নামের সংস্থা।'),
    when: b('After arrival in Malta, before your first permit is approved.', 'Malta-এ পৌঁছানোর পর, আপনার প্রথম permit অনুমোদনের আগে।'),
    where: b('As instructed by IDCU or your institution shortly after arrival.', 'পৌঁছানোর পরপরই IDCU বা আপনার institution-এর নির্দেশ অনুযায়ী।'),
    prepare: b('Courses under 3 months are exempt from this requirement.', '3 মাসের কম course এই শর্ত থেকে exempt।'),
    groups: ['visa', 'arrival'],
    sources: [MT_IDENTITA_STUDY_FAQ],
  },
  {
    id: 'accommodation-proof',
    name: b('Proof of accommodation (lease + Housing Authority approval, or university housing declaration)', 'Accommodation-এর proof (lease + Housing Authority approval, বা university housing declaration)'),
    why: b('Identità’s own FAQ requires either a registered residential lease (with a Housing Authority approval and a notarised Lease Agreement Attestation Form) or, for university/school-provided accommodation, a Declaration of Accommodation Form instead.', 'Identità-র নিজের FAQ একটি registered residential lease (Housing Authority approval আর একটি notarised Lease Agreement Attestation Form সহ) বা, university/school-দেওয়া accommodation-এর জন্য, এর বদলে একটি Declaration of Accommodation Form চায়।'),
    who: b('Your landlord (and, for private leases, a lawyer/notary/legal procurator for the attestation).', 'আপনার landlord (আর, private lease-এর জন্য, attestation-এর জন্য একজন lawyer/notary/legal procurator)।'),
    when: b('With the residence-permit application; a new attestation is needed each time you sign a new lease or change address.', 'Residence-permit application-এর সঙ্গে; নতুন lease সাইন করলে বা ঠিকানা বদলালে প্রতিবার একটি নতুন attestation লাগে।'),
    where: b('Uploaded to the Expatriates Portal.', 'Expatriates Portal-এ upload করতে হয়।'),
    prepare: b('Living in university/school accommodation skips the lease paperwork entirely — just the Declaration of Accommodation Form.', 'University/school accommodation-এ থাকলে lease-এর কাগজপত্র সম্পূর্ণভাবে বাদ যায় — শুধু Declaration of Accommodation Form।'),
    groups: ['visa', 'arrival'],
    sources: [MT_IDENTITA_STUDY_FAQ],
  },
  {
    id: 'post-study-permit-application',
    name: b('Post-study (9-month job-search) residence permit application', 'Post-study (9-মাসের job-search) residence permit application'),
    why: b('Identità’s own FAQ describes Form CEA N.03, which lets a graduate of an MQF Level 5+ course stay up to 9 months, once only, to search for a job or start a business, provided it is filed while the student permit is still valid.', 'Identità-র নিজের FAQ Form CEA N.03 বর্ণনা করে, যা MQF Level 5+ course-এর একজন গ্র্যাজুয়েটকে চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য একবারই, 9 মাস পর্যন্ত থাকার অনুমতি দেয়, যদি student permit এখনো valid থাকতে থাকতে এটা জমা দেওয়া হয়।'),
    who: AUTHORITY,
    when: b('After finishing final exams/thesis, before your current student permit expires.', 'শেষ পরীক্ষা/thesis শেষ করার পর, আপনার বর্তমান student permit-এর মেয়াদ শেষ হওয়ার আগে।'),
    where: b('Submitted online via the Expatriates Portal.', 'Expatriates Portal-এর মাধ্যমে অনলাইনে জমা দিতে হয়।'),
    prepare: b('This permit is one-time and non-renewable — plan your job search and apply for a work permit (Single Permit/Employment Licence) well within the 9 months.', 'এই permit একবারের আর non-renewable — 9 মাসের মধ্যেই আপনার চাকরি খোঁজা পরিকল্পনা করুন আর একটি work permit (Single Permit/Employment Licence)-এর জন্য আবেদন করুন।'),
    groups: ['arrival'],
    sources: [MT_IDENTITA_STUDY_FAQ],
  },
];

// ------------------------------------------------------------------ costs (source's own currency, never converted)

const UM_TUITION_EXAMPLE: GuideCost = {
  id: 'um-tuition-example',
  label: b('Tuition example: University of Malta, non-EU/non-EEA fee schedule', 'Tuition উদাহরণ: University of Malta, non-EU/non-EEA fee schedule'),
  value: b('UM’s own non-EU/non-EEA fee schedule sets an annual fee per programme category — arts/business undergraduate EUR 8,500/year, science undergraduate EUR 10,800/year, arts/business postgraduate EUR 10,800/year, science postgraduate EUR 13,400/year, doctoral programmes EUR 11,000/year full-time, Medicine & Surgery/Dental Surgery EUR 26,000/year.', 'UM-এর নিজের non-EU/non-EEA fee schedule প্রতি programme category অনুযায়ী একটি বার্ষিক fee ঠিক করে — arts/business undergraduate বছরে EUR 8,500, science undergraduate বছরে EUR 10,800, arts/business postgraduate বছরে EUR 10,800, science postgraduate বছরে EUR 13,400, doctoral programme বছরে EUR 11,000 full-time, Medicine & Surgery/Dental Surgery বছরে EUR 26,000।'),
  status: 'verified',
  amount: { value: 8500, max: 26000, currency: 'EUR', period: 'year' },
  source: MT_UM_FEES_NON_EU,
};
const MCAST_FEE_NOT_ITEMIZED: GuideCost = {
  id: 'mcast-fee-not-itemized',
  label: b('MCAST non-EU fee structure (not itemized here)', 'MCAST non-EU fee structure (এখানে তালিকাভুক্ত না)'),
  value: b('MCAST’s own fee-and-payments page confirms international (non-EU) candidates pay course fees (Malta/EU candidates study free), with fees paid in instalments, but its full fee amounts live in a separate, downloadable payment-schedule PDF that was not itemized course by course for this guide.', 'MCAST-এর নিজের fee-and-payments page নিশ্চিত করে international (non-EU) candidate-রা course fee দেয় (Malta/EU candidate বিনামূল্যে পড়ে), fee কিস্তিতে পরিশোধযোগ্য, কিন্তু এর সম্পূর্ণ fee পরিমাণ একটি আলাদা, downloadable payment-schedule PDF-এ আছে যা এই guide-এর জন্য course অনুযায়ী তালিকাভুক্ত হয়নি।'),
  status: 'partly-verified',
  source: MT_MCAST_FEES_NON_EU,
};

// ------------------------------------------------------------------ common sections

const commonTail = () => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [{ embed: 'costs' as const }] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa(
        'types',
        b('Which institutions are there?', 'কোন কোন institution আছে?'),
        [
          b(
            'The examples below — the University of Malta (UM), the country’s only public university, and the Malta College of Arts, Science and Technology (MCAST), a state vocational and applied-higher-education college teaching from certificate level up to Doctoral degrees — are listed alphabetically, not ordered by quality. Both teach in English and set their own, separately published non-EU fee structures. Always check the exact programme on the institution’s own admissions page.',
            'নিচের উদাহরণ — University of Malta (UM), দেশের একমাত্র public university, আর Malta College of Arts, Science and Technology (MCAST), একটি রাষ্ট্রীয় vocational আর applied-higher-education college যা certificate level থেকে Doctoral degree পর্যন্ত পড়ায় — বর্ণানুক্রমে, মান অনুযায়ী নয়। দুটোই English-এ পড়ায় আর নিজস্ব, আলাদাভাবে প্রকাশিত non-EU fee structure ঠিক করে। সবসময় প্রতিষ্ঠানের নিজের admissions page-এ সঠিক programme দেখুন।',
          ),
        ],
        [MT_MFHEA_INSTITUTIONS],
      ),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work'), insurance('insurance')] },
  { id: 'visa', title: b('Visa and residence permit', 'Visa আর residence permit'), items: [visaRequired('visa-required'), permitProcess('permit-process'), funds('funds')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('HSC holders are offered UM’s own Foundation Studies pathway, not direct entry · work-permit covers MQF Level 5+ courses only, 20 hrs/week after 90 days · Type D visa (if needed) + in-country study residence permit', 'HSC থাকা student-দের UM-এর নিজের Foundation Studies pathway দেওয়া হয়, সরাসরি ভর্তি না · MQF Level 5+ course-এর জন্যই work-permit, 90 দিন পর সপ্তাহে 20 ঘণ্টা · Type D visa (লাগলে) + দেশের ভেতরে study residence permit'),
  intro: b(
    'Malta is an EU/Schengen member, so a Bangladeshi Bachelor’s applicant who needs a visa to enter Schengen must get a National Long-Stay (Type D) visa for study before travelling, then, only after arriving in Malta, apply in person via Identità’s own Expatriates Portal for a study residence permit — available only for full-time courses at MQF Level 5 or higher at an MFHEA-licensed institution. UM’s own Bangladesh country-specific page states that Higher Secondary Certificate (HSC) holders are not admitted directly to undergraduate degrees, but are offered pathway programmes at UM’s own International School for Foundation Studies, at that school’s sole discretion. UM’s own non-EU fee schedule sets arts/business undergraduate programmes at EUR 8,500/year and science-based undergraduate programmes (except Medicine & Surgery) at EUR 10,800/year; MCAST runs its own, separately published non-EU fee structure. The English requirement is a Secure English Language Test (SELT) — e.g. Academic IELTS 6.0 overall for undergraduate entry. After the first 90 days, you may work part-time up to 20 hours/week (combined across employers) once your employer gets you a Jobsplus Employment Licence; no self-employment, and attendance (around 75%) and academic progress must be kept up. Private health insurance of at least EUR 100,000 is compulsory unless you study at UM or MCAST (both public, exempt via public healthcare).',
    'Malta EU/Schengen সদস্য, তাই Schengen-এ ঢুকতে visa লাগা একজন Bangladeshi Bachelor\'s আবেদনকারীর যাওয়ার আগে পড়াশোনার জন্য একটি National Long-Stay (Type D) visa লাগবে, তারপর, Malta-এ পৌঁছানোর পরই, Identità-র নিজের Expatriates Portal-এর মাধ্যমে সশরীরে একটি study residence permit-এর জন্য আবেদন করতে হবে — যা শুধু MFHEA-licensed একটি institution-এর MQF Level 5 বা তার বেশি-র full-time course-এর জন্য পাওয়া যায়। UM-এর নিজের Bangladesh country-specific page বলে Higher Secondary Certificate (HSC) থাকা student-দের সরাসরি undergraduate degree-তে ভর্তি করা হয় না, বরং UM-এর নিজের International School for Foundation Studies-এ pathway programme দেওয়া হয়, সেই school-এর একক বিচারে। UM-এর নিজের non-EU fee schedule arts/business undergraduate programme বছরে EUR 8,500, আর science-based undergraduate programme (Medicine & Surgery ছাড়া) বছরে EUR 10,800 ঠিক করে; MCAST তার নিজের, আলাদাভাবে প্রকাশিত non-EU fee structure চালায়। English-এর শর্ত একটি Secure English Language Test (SELT) — যেমন undergraduate ভর্তির জন্য Academic IELTS 6.0 overall। প্রথম 90 দিন পর, আপনার employer একটি Jobsplus Employment Licence নিলে, সপ্তাহে 20 ঘণ্টা পর্যন্ত (সব employer মিলিয়ে) part-time কাজ করতে পারেন; কোনো self-employment না, আর উপস্থিতি (প্রায় 75%) আর academic progress বজায় রাখতে হবে। UM বা MCAST-এ পড়লে (দুটোই public, public healthcare-এর মাধ্যমে exempt) ছাড়া অন্তত EUR 100,000-এর private health insurance বাধ্যতামূলক।',
  ),
  costs: { official: [UM_TUITION_EXAMPLE], estimates: [MCAST_FEE_NOT_ITEMIZED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b('What do you need to study a Bachelor’s in Malta from Bangladesh?', 'Bangladesh থেকে Malta-এ Bachelor\'s পড়তে কী কী লাগে?'),
          [
            b(
              'UM’s own general entry requirement is the Matriculation Certificate (six subjects: two at Advanced Level, four at Intermediate Level including Systems of Knowledge) plus SEC passes at Grade 5 or better in Maltese, English and Mathematics — but UM’s own Bangladesh country-specific page says HSC holders are instead offered a pathway through UM’s own International School for Foundation Studies, entry into which is at that school’s sole discretion. An English SELT result (e.g. SELT/IELTS) and the full Type D visa (if needed) plus in-country study residence permit process also apply.',
              'UM-এর নিজের সাধারণ entry requirement Matriculation Certificate (ছয়টি subject: দুটি Advanced Level, চারটি Intermediate Level, Systems of Knowledge সহ) সঙ্গে Maltese, English, আর Mathematics-এ Grade 5 বা তার বেশি SEC pass — কিন্তু UM-এর নিজের Bangladesh country-specific page বলে HSC থাকা student-দের বরং UM-এর নিজের International School for Foundation Studies-এর মাধ্যমে একটি pathway দেওয়া হয়, যেখানে ভর্তি সেই school-এর একক বিচারে। একটি English SELT result (যেমন SELT/IELTS) আর পূর্ণ Type D visa (লাগলে) সঙ্গে দেশের ভেতরে study residence permit process-ও প্রযোজ্য।',
            ),
            CHECK_UNI,
          ],
          [MT_UM_BANGLADESH],
          { status: 'verified' },
        ),
        qa(
          'hsc',
          b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'),
          [
            b(
              'No, not directly at UM. UM’s own Bangladesh country-specific page states HSC holders are offered pathway (Foundation Studies) programmes to develop the skills needed for undergraduate entry, rather than direct admission; entry into those programmes is at the International School for Foundation Studies’ sole discretion. MCAST’s own general entry rules for an HSC holder were not itemized on the pages read for this guide — confirm directly with MCAST’s international office.',
              'না, UM-এ সরাসরি না। UM-এর নিজের Bangladesh country-specific page বলে HSC থাকা student-দের সরাসরি ভর্তির বদলে undergraduate ভর্তির জন্য প্রয়োজনীয় দক্ষতা তৈরি করতে pathway (Foundation Studies) programme দেওয়া হয়; এই programme-এ ভর্তি International School for Foundation Studies-এর একক বিচারে। একজন HSC-ধারীর জন্য MCAST-এর নিজের সাধারণ ভর্তির নিয়ম এই guide-এর জন্য পড়া page-এ তালিকাভুক্ত হয়নি — সরাসরি MCAST-এর international office-এর সাথে নিশ্চিত করুন।',
            ),
          ],
          [MT_UM_BANGLADESH],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b('When and how do you apply?', 'কখন আর কীভাবে আবেদন করবেন?'),
          [
            b(
              'UM’s own dates-and-deadlines page states the academic year starts every October (apply online from the previous November), with a smaller February intake; for the October 2026 intake, non-EU applicants needing a visa faced a 1 July 2026 deadline, and the general late-application deadline was 15 September 2026. MCAST’s own fee-and-payments page states full-time applications from non-resident international students are taken between April and mid-August, and advises applying for the student visa at least 75 days before the course start date. Check each institution’s own current-cycle dates directly.',
              'UM-এর নিজের dates-and-deadlines page বলে শিক্ষাবর্ষ প্রতি October শুরু হয় (আগের November থেকে অনলাইনে আবেদন), সঙ্গে একটি ছোট February intake; October 2026 intake-এর জন্য, visa লাগা non-EU আবেদনকারীদের 1 July 2026 deadline ছিল, আর সাধারণ late-application deadline ছিল 15 September 2026। MCAST-এর নিজের fee-and-payments page বলে Malta-তে না থাকা international student-দের full-time application April থেকে mid-August-এর মধ্যে নেওয়া হয়, আর course শুরুর তারিখের অন্তত 75 দিন আগে student visa-র জন্য আবেদনের পরামর্শ দেয়। প্রতিটি institution-এর বর্তমান cycle-এর date সরাসরি চেক করুন।',
            ),
          ],
          [MT_UM_DATES_DEADLINES, MT_MCAST_FEES_NON_EU],
          { status: 'verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language requirements', 'ভাষার শর্ত'),
      items: [
        qa(
          'english',
          b('How much English do you need for an undergraduate course?', 'Undergraduate course-এ কত English লাগে?'),
          [
            b(
              'UM’s own English Language Requirements page sets Academic IELTS 6.0 overall (6.0 writing, 5.5 reading/listening/speaking) for an undergraduate course, or equivalents on TOEFL iBT, Cambridge, Pearson PTE Academic, Trinity ISE or UM’s own International Student English Test (ISET). The deadline for submitting this result is earlier (e.g. 1 July for the October 2026 intake) for non-EU applicants who needed a visa. MCAST’s own specific English minimum for undergraduate-level courses was not itemized on the pages read for this guide.',
              'UM-এর নিজের English Language Requirements page undergraduate course-এর জন্য Academic IELTS 6.0 overall (6.0 writing, 5.5 reading/listening/speaking) ঠিক করে, বা TOEFL iBT, Cambridge, Pearson PTE Academic, Trinity ISE, বা UM-এর নিজের International Student English Test (ISET)-এ সমতুল্য। Visa লাগা non-EU আবেদনকারীদের জন্য এই result জমা দেওয়ার deadline আগে (যেমন October 2026 intake-এর জন্য 1 July)। Undergraduate-level course-এর জন্য MCAST-এর নিজের নির্দিষ্ট English ন্যূনতম এই guide-এর জন্য পড়া page-এ তালিকাভুক্ত হয়নি।',
            ),
          ],
          [MT_UM_ENGLISH],
          { status: 'verified' },
        ),
      ],
    },
    {
      id: 'tuition',
      title: b('Tuition and scholarships', 'Tuition আর scholarship'),
      items: [
        qa(
          'tuition',
          b('How much is a Bachelor’s in Malta?', 'Malta-এ Bachelor\'s-এ খরচ কত?'),
          [
            b(
              'Set per institution and per programme category, not as one nationwide figure. UM’s own non-EU/non-EEA fee schedule charges EUR 8,500/year for arts-based and business-related undergraduate programmes, and EUR 10,800/year for science-based undergraduate programmes (except Medicine & Surgery, which is EUR 26,000/year). MCAST’s own non-EU fee structure is published in a separate, downloadable payment-schedule PDF that was not itemized by course for this guide.',
              'Institution আর programme category অনুযায়ী ঠিক হয়, একক জাতীয় সংখ্যা না। UM-এর নিজের non-EU/non-EEA fee schedule arts-based আর business-related undergraduate programme-এর জন্য বছরে EUR 8,500, আর science-based undergraduate programme-এর জন্য (Medicine & Surgery ছাড়া, যা বছরে EUR 26,000) বছরে EUR 10,800 নেয়। MCAST-এর নিজের non-EU fee structure একটি আলাদা, downloadable payment-schedule PDF-এ প্রকাশিত যা এই guide-এর জন্য course অনুযায়ী তালিকাভুক্ত হয়নি।',
            ),
            CHECK_UNI,
          ],
          [MT_UM_FEES_NON_EU, MT_MCAST_FEES_NON_EU],
          { status: 'verified' },
        ),
        scholarships('scholarships'),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b('Master’s applications assessed case by case against a classification/GPA requirement · UM says no scholarships currently available · same Type D visa + in-country residence permit process', 'Master\'s application classification/GPA শর্তের বিরুদ্ধে case by case মূল্যায়ন করা হয় · UM বলে বর্তমানে কোনো scholarship নেই · একই Type D visa + দেশের ভেতরে residence permit process'),
  intro: b(
    'Master’s admission at UM is assessed case by case: UM’s own Bangladesh country-specific page recommends checking each programme’s own classification/GPA requirement on UM’s Course Finder, rather than one nationwide rule. UM’s own non-EU fee schedule sets arts/business postgraduate programmes (Certificate, Diploma, Doctor of Laws, Master’s — except the Executive MBA) at EUR 10,800/year, science-based postgraduate programmes at EUR 13,400/year, and the Executive MBA at EUR 14,400/year. UM’s own Scholarships page, read for this guide, states plainly that no scholarships are currently available at UM; its Doctoral School separately lists project-tied "Funded studentships" (mainly for PhD/Master-by-Research positions) and a link to the government’s own myscholarship.gov.mt portal, which did not name Bangladesh as eligible for a specific open scheme on the pages read. As with Bachelor’s level, a Bangladeshi applicant needing a Schengen visa must obtain the Type D visa before travelling, then apply in person, only after arrival, for the study residence permit through Identità.',
    'UM-এ Master\'s ভর্তি case by case মূল্যায়ন করা হয়: UM-এর নিজের Bangladesh country-specific page একক জাতীয় নিয়মের বদলে UM-এর Course Finder-এ প্রতিটি programme-এর নিজস্ব classification/GPA শর্ত চেক করার পরামর্শ দেয়। UM-এর নিজের non-EU fee schedule arts/business postgraduate programme (Certificate, Diploma, Doctor of Laws, Master\'s — Executive MBA ছাড়া) বছরে EUR 10,800, science-based postgraduate programme বছরে EUR 13,400, আর Executive MBA বছরে EUR 14,400 ঠিক করে। UM-এর নিজের Scholarships page, এই guide-এর জন্য পড়া অনুযায়ী, সরাসরি বলে বর্তমানে UM-এ কোনো scholarship নেই; এর Doctoral School আলাদাভাবে project-ভিত্তিক "Funded studentships" (মূলত PhD/Master-by-Research position-এর জন্য) আর government-এর নিজের myscholarship.gov.mt portal-এর একটি link তালিকাভুক্ত করে, যা পড়া page-এ কোনো নির্দিষ্ট খোলা scheme-এর জন্য Bangladesh-কে যোগ্য বলে নাম দেয়নি। Bachelor\'s level-এর মতোই, Schengen visa লাগা একজন Bangladeshi আবেদনকারীকে যাওয়ার আগে Type D visa নিতে হবে, তারপর পৌঁছানোর পরই, সশরীরে, Identità-র মাধ্যমে study residence permit-এর জন্য আবেদন করতে হবে।',
  ),
  costs: { official: [UM_TUITION_EXAMPLE], estimates: [MCAST_FEE_NOT_ITEMIZED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b('What do you need for a Master’s in Malta?', 'Malta-এ Master\'s-এ কী লাগে?'),
          [
            b(
              'UM’s own Bangladesh country-specific page states Master’s applications are always assessed case by case following a complete application, and recommends checking the specific classification/GPA requirement listed for each course on UM’s Course Finder, since this varies by programme rather than following one general undergraduate-degree rule.',
              'UM-এর নিজের Bangladesh country-specific page বলে Master\'s application সবসময় একটি সম্পূর্ণ application পাওয়ার পর case by case মূল্যায়ন করা হয়, আর UM-এর Course Finder-এ প্রতিটি course-এর জন্য তালিকাভুক্ত নির্দিষ্ট classification/GPA শর্ত চেক করার পরামর্শ দেয়, কারণ এটা একটি সাধারণ undergraduate-degree নিয়ম অনুসরণের বদলে programme অনুযায়ী আলাদা।',
            ),
          ],
          [MT_UM_BANGLADESH],
          { status: 'verified' },
        ),
      ],
    },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b('When and how do you apply?', 'কখন আর কীভাবে আবেদন করবেন?'),
          [
            b(
              'The same October (main) and February (smaller) intakes apply to Master’s study, per UM’s own dates-and-deadlines page; most of UM’s Master’s by Research and all Doctoral Degrees (except Doctor of Pharmacy) have more than one entry point and applicants can apply at any time, submitting a research proposal as part of the process. Coursework Master’s programmes generally follow the same October/February cycle as other courses.',
              'UM-এর নিজের dates-and-deadlines page অনুযায়ী, Master\'s study-র জন্যও একই October (মূল) আর February (ছোট) intake প্রযোজ্য; UM-এর অধিকাংশ Master\'s by Research আর সব Doctoral Degree-র (Doctor of Pharmacy ছাড়া) একাধিক entry point আছে আর আবেদনকারীরা যেকোনো সময় আবেদন করতে পারেন, process-এর অংশ হিসেবে একটি research proposal জমা দিয়ে। Coursework Master\'s programme সাধারণত অন্য course-এর মতো একই October/February cycle অনুসরণ করে।',
            ),
          ],
          [MT_UM_DATES_DEADLINES],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language requirements', 'ভাষার শর্ত'),
      items: [
        qa(
          'english',
          b('How much IELTS do you need for a Master’s?', 'Master\'s-এ IELTS কত লাগে?'),
          [
            b(
              'UM’s own English Language Requirements page sets Academic IELTS 6.5 overall (6.0 in each of writing/reading/listening/speaking) for a postgraduate or doctoral course, higher than the undergraduate minimum; TOEFL iBT, Cambridge, Pearson PTE Academic, Trinity ISE or UM’s own ISET equivalents are also accepted at their own postgraduate level. Master’s-by-research and PhD applicants must submit their SELT pass before the course starts, not by a fixed intake deadline.',
              'UM-এর নিজের English Language Requirements page postgraduate বা doctoral course-এর জন্য Academic IELTS 6.5 overall (writing/reading/listening/speaking-এর প্রতিটিতে 6.0) ঠিক করে, undergraduate ন্যূনতমের চেয়ে বেশি; TOEFL iBT, Cambridge, Pearson PTE Academic, Trinity ISE, বা UM-এর নিজের ISET সমতুল্যও নিজস্ব postgraduate level-এ গ্রহণযোগ্য। Master\'s-by-research আর PhD আবেদনকারীদের একটি নির্দিষ্ট intake deadline-এর বদলে course শুরুর আগে তাদের SELT pass জমা দিতে হয়।',
            ),
          ],
          [MT_UM_ENGLISH],
          { status: 'verified' },
        ),
      ],
    },
    {
      id: 'tuition',
      title: b('Tuition and scholarships', 'Tuition আর scholarship'),
      items: [
        qa(
          'tuition',
          b('How much is a Master’s in Malta?', 'Malta-এ Master\'s-এ খরচ কত?'),
          [
            b(
              'UM’s own non-EU/non-EEA fee schedule sets arts/business postgraduate programmes (Certificate, Diploma, Doctor of Laws, Master’s, except the Executive MBA) at EUR 10,800/year, science-based postgraduate programmes at EUR 13,400/year, and the Executive MBA specifically at EUR 14,400/year (its own preparatory programme EUR 8,500). Certain programmes may also carry additional bench fees.',
              'UM-এর নিজের non-EU/non-EEA fee schedule arts/business postgraduate programme (Certificate, Diploma, Doctor of Laws, Master\'s, Executive MBA ছাড়া) বছরে EUR 10,800, science-based postgraduate programme বছরে EUR 13,400, আর বিশেষভাবে Executive MBA বছরে EUR 14,400 ঠিক করে (এর নিজের preparatory programme EUR 8,500)। কিছু programme-এ অতিরিক্ত bench fee-ও লাগতে পারে।',
            ),
            CHECK_UNI,
          ],
          [MT_UM_FEES_NON_EU],
          { status: 'verified' },
        ),
        scholarships('scholarships'),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ PhD

const PHD: DegreeGuide = {
  level: 'phd',
  card: b('Doctoral Degrees (except Doctor of Pharmacy) have more than one entry point, apply any time with a research proposal · EUR 11,000/year full-time (non-EU) · doctoral students on the standard study residence permit, same rights/limits as other degrees', 'Doctoral Degree-র (Doctor of Pharmacy ছাড়া) একাধিক entry point আছে, একটি research proposal দিয়ে যেকোনো সময় আবেদন করা যায় · non-EU-এর জন্য full-time বছরে EUR 11,000 · সাধারণ study residence permit-এ doctoral student, অন্য degree-র মতোই অধিকার/সীমা'),
  intro: b(
    'A PhD at the University of Malta is pursued through UM’s own Doctoral School; UM’s own dates-and-deadlines page states all Doctoral Degrees except the Doctorate of Pharmacy have more than one entry point and prospective applicants can apply at any time during the year, submitting a research proposal as part of the application. UM’s own non-EU/non-EEA fee schedule sets doctoral programmes at EUR 11,000/year full-time (EUR 5,500/year part-time), with an annual extension fee of EUR 600/year if an extension of studies is granted. UM’s own Doctoral School Scholarships and Grants page lists "Funded studentships" (specific, project-tied positions) separately from UM’s general Scholarships page, which states plainly that no scholarships are currently available at UM. As with other degree levels, Bangladeshi applicants who need a Schengen visa must obtain the Type D visa before travelling, then apply in person, only after arrival, for the study residence permit through Identità, available for MQF Level 5+ courses including doctoral study, with the same 20-hour/week work allowance and 9-month post-study permit on completion.',
    'University of Malta-এ একটি PhD UM-এর নিজের Doctoral School-এর মাধ্যমে করা হয়; UM-এর নিজের dates-and-deadlines page বলে Doctorate of Pharmacy ছাড়া সব Doctoral Degree-র একাধিক entry point আছে আর সম্ভাব্য আবেদনকারীরা বছরের যেকোনো সময় আবেদন করতে পারেন, application-এর অংশ হিসেবে একটি research proposal জমা দিয়ে। UM-এর নিজের non-EU/non-EEA fee schedule doctoral programme-এর জন্য full-time বছরে EUR 11,000 (part-time বছরে EUR 5,500) ঠিক করে, studies-এর extension দেওয়া হলে বছরে EUR 600-এর একটি annual extension fee সহ। UM-এর নিজের Doctoral School Scholarships and Grants page UM-এর সাধারণ Scholarships page থেকে আলাদাভাবে "Funded studentships" (নির্দিষ্ট, project-ভিত্তিক position) তালিকাভুক্ত করে, যা সরাসরি বলে বর্তমানে UM-এ কোনো scholarship নেই। অন্য degree level-এর মতোই, Schengen visa লাগা Bangladeshi আবেদনকারীদের যাওয়ার আগে Type D visa নিতে হবে, তারপর পৌঁছানোর পরই, সশরীরে, Identità-র মাধ্যমে study residence permit-এর জন্য আবেদন করতে হবে, যা doctoral study-সহ MQF Level 5+ course-এর জন্য পাওয়া যায়, একই সপ্তাহে 20-ঘণ্টা কাজের সুযোগ আর সম্পন্নের পর 9-মাসের post-study permit সহ।',
  ),
  costs: { official: [], estimates: [MCAST_FEE_NOT_ITEMIZED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Malta?', 'Malta-এ কীভাবে PhD পাওয়া যায়?'),
          [
            b(
              'Apply directly through UM’s own Doctoral School, which (per UM’s own dates-and-deadlines page) accepts applications at any time of year for all Doctoral Degrees except the Doctorate of Pharmacy, with a research proposal submitted as part of the application; exact supervisor/faculty-level requirements (interview, minimum classification) were not itemized nationally on the pages read for this guide — check UM’s Doctoral School directly for your field.',
              'সরাসরি UM-এর নিজের Doctoral School-এর মাধ্যমে আবেদন করুন, যা (UM-এর নিজের dates-and-deadlines page অনুযায়ী) Doctorate of Pharmacy ছাড়া সব Doctoral Degree-র জন্য বছরের যেকোনো সময় application গ্রহণ করে, application-এর অংশ হিসেবে একটি research proposal জমা দিয়ে; সঠিক supervisor/faculty-level শর্ত (interview, ন্যূনতম classification) এই guide-এর জন্য পড়া page-এ জাতীয়ভাবে তালিকাভুক্ত হয়নি — আপনার field-এর জন্য সরাসরি UM-এর Doctoral School চেক করুন।',
            ),
            CHECK_UNI,
          ],
          [MT_UM_DATES_DEADLINES],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language requirements', 'ভাষার শর্ত'),
      items: [
        qa(
          'english',
          b('How much IELTS do you need for a PhD?', 'PhD-তে IELTS কত লাগে?'),
          [
            b(
              'The same postgraduate/doctoral SELT minimum as Master’s applies — UM’s own English Language Requirements page sets Academic IELTS 6.5 overall (6.0 in each skill) — but PhD applicants must submit their SELT pass before commencement of studies rather than by a fixed intake deadline.',
              'Master\'s-এর মতোই একই postgraduate/doctoral SELT ন্যূনতম প্রযোজ্য — UM-এর নিজের English Language Requirements page Academic IELTS 6.5 overall (প্রতি skill-এ 6.0) ঠিক করে — কিন্তু PhD আবেদনকারীদের একটি নির্দিষ্ট intake deadline-এর বদলে পড়াশোনা শুরুর আগে তাদের SELT pass জমা দিতে হয়।',
            ),
          ],
          [MT_UM_ENGLISH],
          { status: 'verified' },
        ),
      ],
    },
    {
      id: 'funding',
      title: b('Fees and funded positions', 'Fee আর funded position'),
      items: [
        qa(
          'tuition',
          b('How much does a PhD cost, and are there funded positions?', 'PhD-তে খরচ কত, আর funded position আছে কি?'),
          [
            b(
              'UM’s own non-EU/non-EEA fee schedule sets doctoral programmes at EUR 11,000/year full-time (EUR 5,500/year part-time), plus a EUR 600/year extension fee if needed. UM’s own Doctoral School Scholarships and Grants page lists "Funded studentships" — specific, project-tied positions, not a general award — separately from UM’s general Scholarships page, which states plainly that no scholarships are currently available at UM.',
              'UM-এর নিজের non-EU/non-EEA fee schedule doctoral programme-এর জন্য full-time বছরে EUR 11,000 (part-time বছরে EUR 5,500) ঠিক করে, প্রয়োজনে একটি EUR 600/বছরের extension fee সহ। UM-এর নিজের Doctoral School Scholarships and Grants page "Funded studentships" তালিকাভুক্ত করে — নির্দিষ্ট, project-ভিত্তিক position, সাধারণ award না — UM-এর সাধারণ Scholarships page থেকে আলাদাভাবে, যা সরাসরি বলে বর্তমানে UM-এ কোনো scholarship নেই।',
            ),
          ],
          [MT_UM_FEES_NON_EU, MT_UM_DOCTORAL_SCHOLARSHIPS, MT_UM_SCHOLARSHIPS],
          { status: 'verified' },
        ),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ the country

export const MT_GUIDE: CountryGuide = {
  code: 'MT',
  checkedAt: MT_READ,
  sourcesPerSection: true,
  intro: b(
    'Malta is an EU/Schengen member, so a Bangladeshi applicant who needs a visa to enter Schengen must first get a National Long-Stay (Type D) visa for study purposes from a Maltese embassy or consulate before travelling. The study residence permit itself cannot be obtained from abroad — Identità’s own FAQ states it must be applied for in person, online via Identità’s own Expatriates Portal, only after arriving in Malta, for a full-time course (15+ hours/week) at MQF Level 5 or higher at an institution licensed by the Malta Further & Higher Education Authority (MFHEA). Processing "typically takes a few weeks," and a first-time permit is usually valid for one year (or the course’s length if shorter), renewed annually. A minimum financial-means threshold of 60% of Malta’s annual national minimum wage or poverty line (whichever is higher), pro-rated to your stay, and private health insurance of at least EUR 100,000 (waived for UM/MCAST/ITS students, who access public healthcare) are both required. After the first 90 days, students on MQF Level 5+ courses may work up to 20 hours/week (combined across employers) once an employer secures a Jobsplus Employment Licence; students on courses below MQF Level 5 may not work part-time at all under this permit. Graduates of an MQF Level 5+ course may apply once, before their student permit expires, for a 9-month post-study residence permit to search for work or start a business — itself not a work permit, but allowing an in-country transition once a Single Permit or Employment Licence is secured. The University of Malta (UM), the country’s only public university and sole institution ranked in the QS World University Rankings 2027 (joint 696th), sets non-EU/non-EEA tuition per programme category — EUR 8,500–26,000/year — and its own Scholarships page states plainly that no scholarships are currently available at UM. The Malta College of Arts, Science and Technology (MCAST) is Malta’s state vocational and applied-higher-education college, with its own separate non-EU fee structure. UM’s own Bangladesh country-specific page confirms HSC holders are offered a Foundation Studies pathway rather than direct undergraduate entry. This guide is built from Identità (identita.gov.mt), the ELT Council (eltcouncil.gov.mt), the Malta Further & Higher Education Authority (mfhea.mt), myscholarship.gov.mt, and the official pages of the University of Malta and MCAST.',
    'Malta EU/Schengen সদস্য, তাই Schengen-এ ঢুকতে visa লাগা একজন Bangladeshi আবেদনকারীর যাওয়ার আগে প্রথমে পড়াশোনার জন্য একটি Maltese embassy বা consulate থেকে একটি National Long-Stay (Type D) visa লাগবে। Study residence permit নিজেই বিদেশ থেকে পাওয়া যায় না — Identità-র নিজের FAQ বলে এটা Malta-এ পৌঁছানোর পরই, সশরীরে, Identità-র নিজের Expatriates Portal-এর মাধ্যমে অনলাইনে, Malta Further & Higher Education Authority (MFHEA)-র licensed একটি institution-এর MQF Level 5 বা তার বেশি-র একটি full-time course-এর (সপ্তাহে 15+ ঘণ্টা) জন্য আবেদন করতে হয়। Processing "typically takes a few weeks," আর প্রথম permit সাধারণত এক বছরের জন্য (course ছোট হলে তার দৈর্ঘ্যের জন্য) valid, বার্ষিক renew হয়। আপনার থাকার অনুযায়ী pro-rated Malta-র বার্ষিক জাতীয় minimum wage বা poverty line-এর (যেটা বেশি) 60%-এর একটি ন্যূনতম আর্থিক-সামর্থ্য threshold, আর অন্তত EUR 100,000-এর private health insurance (UM/MCAST/ITS student-দের জন্য মাফ, যারা public healthcare access করে) দুটোই লাগে। প্রথম 90 দিন পর, MQF Level 5+ course-এর student-রা একজন employer একটি Jobsplus Employment Licence পেলে সপ্তাহে 20 ঘণ্টা পর্যন্ত (সব employer মিলিয়ে) কাজ করতে পারে; MQF Level 5-এর নিচের course-এর student-রা এই permit-এর অধীনে একেবারেই part-time কাজ করতে পারে না। MQF Level 5+ course-এর গ্র্যাজুয়েটরা তাদের student permit-এর মেয়াদ শেষ হওয়ার আগে একবার, চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য একটি 9-মাসের post-study residence permit-এর আবেদন করতে পারে — নিজেই একটি work permit না, কিন্তু একটি Single Permit বা Employment Licence পাওয়ার পর দেশের ভেতরে পরিবর্তনের অনুমতি দেয়। University of Malta (UM), দেশের একমাত্র public university আর QS World University Rankings 2027-এ (joint 696th) তালিকাভুক্ত একমাত্র institution, প্রতি programme category অনুযায়ী non-EU/non-EEA tuition ঠিক করে — EUR 8,500–26,000/বছর — আর এর নিজের Scholarships page সরাসরি বলে বর্তমানে UM-এ কোনো scholarship নেই। Malta College of Arts, Science and Technology (MCAST) Malta-র রাষ্ট্রীয় vocational আর applied-higher-education college, নিজস্ব আলাদা non-EU fee structure সহ। UM-এর নিজের Bangladesh country-specific page নিশ্চিত করে HSC থাকা student-দের সরাসরি undergraduate ভর্তির বদলে একটি Foundation Studies pathway দেওয়া হয়। এই guide Identità (identita.gov.mt), ELT Council (eltcouncil.gov.mt), Malta Further & Higher Education Authority (mfhea.mt), myscholarship.gov.mt, আর University of Malta আর MCAST-এর official page থেকে তৈরি।',
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [MT_IDENTITA_STUDY_FAQ, MT_UM_BANGLADESH, MT_UM_SCHOLARSHIPS],
      {
        kind: 'guidance',
        list: [
          b('Assuming you can apply for the study residence permit from Bangladesh — Identità’s own FAQ states this permit can only be applied for in person, from inside Malta, after you arrive.', 'ধরে নেওয়া যে Bangladesh থেকে study residence permit-এর জন্য আবেদন করা যায় — Identità-র নিজের FAQ বলে এই permit শুধু সশরীরে, Malta-এর ভেতর থেকে, পৌঁছানোর পরই আবেদন করা যায়।'),
          b('Assuming HSC gives you direct entry to a UM Bachelor’s degree — UM’s own Bangladesh page offers a Foundation Studies pathway instead, at that school’s own discretion.', 'ধরে নেওয়া যে HSC UM-এর একটি Bachelor\'s degree-তে সরাসরি ভর্তির অনুমতি দেয় — UM-এর নিজের Bangladesh page এর বদলে একটি Foundation Studies pathway দেয়, সেই school-এর নিজের বিচারে।'),
          b('Assuming you can work part-time on any course — Identità’s own FAQ limits the 20-hour/week work right to MQF Level 5+ courses only; sub-degree students cannot work part-time under a study residence permit.', 'ধরে নেওয়া যে কোনো course-এ part-time কাজ করা যায় — Identità-র নিজের FAQ 20-ঘণ্টা/সপ্তাহের কাজের অধিকার শুধু MQF Level 5+ course-এ সীমিত করে; sub-degree student-রা study residence permit-এর অধীনে part-time কাজ করতে পারে না।'),
          b('Assuming UM currently offers a general scholarship for Bangladeshi applicants because aggregator sites describe a fee-waiver scheme — UM’s own Scholarships page, read for this guide, states plainly there are currently no scholarships at UM.', 'ধরে নেওয়া যে UM বর্তমানে Bangladeshi আবেদনকারীদের জন্য একটি সাধারণ scholarship দেয় কারণ aggregator site একটি fee-waiver scheme বর্ণনা করে — UM-এর নিজের Scholarships page, এই guide-এর জন্য পড়া অনুযায়ী, সরাসরি বলে বর্তমানে UM-এ কোনো scholarship নেই।'),
          b('Assuming the 9-month post-study permit itself lets you work full-time — it is a job-search permit, not a work permit; your employer must still separately secure a Single Permit or Employment Licence.', 'ধরে নেওয়া যে 9-মাসের post-study permit নিজেই আপনাকে full-time কাজ করার অনুমতি দেয় — এটা একটি job-search permit, work permit না; আপনার employer-কে এখনও আলাদাভাবে একটি Single Permit বা Employment Licence নিতে হবে।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b('What do you need to study a Bachelor’s in Malta from Bangladesh?', 'Bangladesh থেকে Malta-এ Bachelor\'s পড়তে কী কী লাগে?'), [b('UM’s own general entry requirement, an institution offer (UM offers HSC holders a Foundation Studies pathway, not direct entry), a SELT English result where required, and the full Type D visa (if needed) plus in-country study residence permit process.', 'UM-এর নিজের সাধারণ entry requirement, একটি institution offer (UM HSC থাকা student-দের একটি Foundation Studies pathway দেয়, সরাসরি ভর্তি না), প্রয়োজনে একটি SELT English result, আর পূর্ণ Type D visa (লাগলে) সঙ্গে দেশের ভেতরে study residence permit process।')], [MT_UM_BANGLADESH], { status: 'verified' }),
    qa('hsc', b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'), [b('No, not directly at UM: HSC holders are offered a pathway through UM’s own International School for Foundation Studies instead, at that school’s sole discretion. MCAST’s own rule for HSC holders was not itemized on the pages read for this guide.', 'না, UM-এ সরাসরি না: HSC থাকা student-দের বরং UM-এর নিজের International School for Foundation Studies-এর মাধ্যমে একটি pathway দেওয়া হয়, সেই school-এর একক বিচারে। HSC থাকা student-দের জন্য MCAST-এর নিজের নিয়ম এই guide-এর জন্য পড়া page-এ তালিকাভুক্ত হয়নি।')], [MT_UM_BANGLADESH], { status: 'partly-verified' }),
    qa('cost', b('How much does it cost to study in Malta?', 'Malta-এ পড়াশোনার খরচ কত?'), [b('Set per institution and programme category. UM’s own non-EU/non-EEA schedule runs EUR 8,500–26,000/year depending on category (EUR 8,500 arts/business undergraduate, EUR 10,800 science undergraduate or arts/business postgraduate, EUR 13,400 science postgraduate, EUR 11,000 doctoral full-time, EUR 26,000 Medicine & Surgery/Dental Surgery); MCAST’s own non-EU fees are published separately.', 'Institution আর programme category অনুযায়ী ঠিক হয়। UM-এর নিজের non-EU/non-EEA schedule category অনুযায়ী বছরে EUR 8,500–26,000 (EUR 8,500 arts/business undergraduate, EUR 10,800 science undergraduate বা arts/business postgraduate, EUR 13,400 science postgraduate, EUR 11,000 doctoral full-time, EUR 26,000 Medicine & Surgery/Dental Surgery); MCAST-এর নিজের non-EU fee আলাদাভাবে প্রকাশিত।')], [MT_UM_FEES_NON_EU, MT_MCAST_FEES_NON_EU], { status: 'verified' }),
    qa('ielts', b('How much IELTS do you need for Malta?', 'Malta-এ IELTS কত লাগে?'), [b('UM’s own English Language Requirements page sets Academic IELTS 6.0 overall for an undergraduate course and 6.5 overall (6.0 per skill) for postgraduate/doctoral; non-EU applicants needing a visa face an earlier submission deadline. MCAST’s own specific minimum was not itemized on the pages read for this guide.', 'UM-এর নিজের English Language Requirements page undergraduate course-এর জন্য Academic IELTS 6.0 overall আর postgraduate/doctoral-এর জন্য 6.5 overall (প্রতি skill-এ 6.0) ঠিক করে; visa লাগা non-EU আবেদনকারীদের জন্য জমার deadline আগে। MCAST-এর নিজের নির্দিষ্ট ন্যূনতম এই guide-এর জন্য পড়া page-এ তালিকাভুক্ত হয়নি।')], [MT_UM_ENGLISH], { status: 'verified' }),
    qa('visa', b('What do you need for the visa and residence permit?', 'Visa আর residence permit-এর জন্য কী কী লাগে?'), [b('If you need a visa for Schengen: a Type D national visa before travelling. After arriving in Malta: an in-person Expatriates Portal application (Form CEA N.01) with your acceptance letter, proof of tuition payment, proof of funds (60% of minimum wage/poverty line, pro-rated), health insurance (EUR 100,000+, unless UM/MCAST/ITS), health screening (courses over 3 months), and accommodation proof.', 'Schengen-এর জন্য visa লাগলে: যাওয়ার আগে একটি Type D national visa। Malta-এ পৌঁছানোর পর: আপনার acceptance letter, tuition payment-এর proof, funds-এর proof (minimum wage/poverty line-এর 60%, pro-rated), health insurance (EUR 100,000+, UM/MCAST/ITS ছাড়া), health screening (3 মাসের বেশি course), আর accommodation-এর proof সহ একটি সশরীরে Expatriates Portal application (Form CEA N.01)।')], [MT_IDENTITA_STUDY_FAQ]),
    qa('work', b('Can you work while studying in Malta?', 'Malta-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b('Yes, on MQF Level 5+ courses only: up to 20 hours/week (combined across employers) after your first 90 days, once an employer secures a Jobsplus Employment Licence for you. Sub-degree (below MQF Level 5) students may not work part-time under a study residence permit.', 'হ্যাঁ, শুধু MQF Level 5+ course-এ: প্রথম 90 দিন পর, একজন employer আপনার জন্য একটি Jobsplus Employment Licence পেলে, সপ্তাহে 20 ঘণ্টা পর্যন্ত (সব employer মিলিয়ে)। MQF Level 5-এর নিচের (sub-degree) course-এর student-রা study residence permit-এর অধীনে part-time কাজ করতে পারে না।')], [MT_IDENTITA_STUDY_FAQ, MT_ELTCOUNCIL_TCN_WORK], { status: 'verified' }),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('Not verified yet as currently open to Bangladeshi applicants: UM’s own Scholarships page states plainly there are currently no scholarships at UM, and myscholarship.gov.mt did not name Bangladesh as eligible for a specific open scheme on the pages read. MCAST offers a final-year Bachelor’s fee exemption and a post-graduation tax rebate, neither an upfront scholarship.', 'যাচাই হয়নি এখনো বাংলাদেশি আবেদনকারীদের জন্য বর্তমানে খোলা কিনা: UM-এর নিজের Scholarships page সরাসরি বলে বর্তমানে UM-এ কোনো scholarship নেই, আর myscholarship.gov.mt পড়া page-এ কোনো নির্দিষ্ট খোলা scheme-এর জন্য Bangladesh-কে যোগ্য বলে নাম দেয়নি। MCAST একটি শেষ-বছরের Bachelor\'s fee exemption আর গ্র্যাজুয়েশনের পর একটি tax rebate দেয়, কোনোটাই আগাম scholarship না।')], [MT_UM_SCHOLARSHIPS, MT_MYSCHOLARSHIP_HOME], { status: 'not-verified' }),
    qa('after', b('Can you stay in Malta after graduating?', 'পড়া শেষে Malta-এ থাকা যায়?'), [b('Yes: graduates of an MQF Level 5+ course may apply once, before their student permit expires, for a 9-month post-study permit to search for a job or start a business — not itself a work permit, but a bridge while a Single Permit or Employment Licence is secured.', 'হ্যাঁ: MQF Level 5+ course-এর গ্র্যাজুয়েটরা তাদের student permit-এর মেয়াদ শেষ হওয়ার আগে একবার, চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য একটি 9-মাসের post-study permit-এর আবেদন করতে পারে — নিজেই work permit না, কিন্তু একটি Single Permit বা Employment Licence নেওয়ার সময় একটি সেতু।')], [MT_IDENTITA_STUDY_FAQ]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('60% of Malta’s annual national minimum wage or poverty line (whichever is higher), pro-rated to your household size and stay — but Identità’s own FAQ does not itself print the resulting euro figure, so the exact current amount should be confirmed with Identità or your institution.', 'Malta-র বার্ষিক জাতীয় minimum wage বা poverty line-এর (যেটা বেশি) 60%, আপনার household size আর থাকার সময় অনুযায়ী pro-rated — কিন্তু Identità-র নিজের FAQ নিজেই ফলস্বরূপ euro সংখ্যা প্রকাশ করে না, তাই সঠিক বর্তমান পরিমাণ Identità বা আপনার institution-এর সাথে নিশ্চিত করা উচিত।')], [MT_IDENTITA_STUDY_FAQ], { status: 'partly-verified' }),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Passport, (if needed) the Type D visa, acceptance letter, proof of tuition payment, proof of funds, health insurance (or UM/MCAST/ITS exemption proof), health screening (courses over 3 months), accommodation proof, and — after completing your studies — the 9-month post-study permit application.', 'Passport, (লাগলে) Type D visa, acceptance letter, tuition payment-এর proof, funds-এর proof, health insurance (বা UM/MCAST/ITS exemption-এর proof), health screening (3 মাসের বেশি course), accommodation-এর proof, আর — পড়াশোনা শেষে — 9-মাসের post-study permit application।')], [MT_IDENTITA_STUDY_FAQ]),
    qa('masters', b('What do you need for a Master’s?', 'Master\'s-এ কী লাগে?'), [b('A case-by-case assessment against each course’s own classification/GPA requirement on UM’s Course Finder, plus the higher SELT postgraduate minimum (Academic IELTS 6.5 overall). No general UM scholarship currently covers Master’s study.', 'UM-এর Course Finder-এ প্রতিটি course-এর নিজস্ব classification/GPA শর্তের বিরুদ্ধে একটি case-by-case মূল্যায়ন, সঙ্গে বেশি SELT postgraduate ন্যূনতম (Academic IELTS 6.5 overall)। বর্তমানে কোনো সাধারণ UM scholarship Master\'s study কভার করে না।')], [MT_UM_BANGLADESH]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Direct application to UM’s own Doctoral School, which accepts applications year-round (except for Doctor of Pharmacy) with a research proposal; non-EU doctoral fees are EUR 11,000/year full-time, and project-tied "Funded studentships" exist separately from UM’s general (currently empty) scholarships list.', 'UM-এর নিজের Doctoral School-এ সরাসরি আবেদন, যা (Doctor of Pharmacy ছাড়া) বছরজুড়ে একটি research proposal দিয়ে application গ্রহণ করে; non-EU doctoral fee full-time বছরে EUR 11,000, আর project-ভিত্তিক "Funded studentships" UM-এর সাধারণ (বর্তমানে খালি) scholarship তালিকা থেকে আলাদাভাবে আছে।')], [MT_UM_DATES_DEADLINES, MT_UM_FEES_NON_EU]),
    qa('universities', b('Which institutions are there?', 'কোন কোন institution আছে?'), [b('Two examples on each degree page — the University of Malta (UM) and the Malta College of Arts, Science and Technology (MCAST) — listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ দুটি উদাহরণ — University of Malta (UM) আর Malta College of Arts, Science and Technology (MCAST) — বর্ণানুক্রমে, মান অনুযায়ী নয়।')], [MT_MFHEA_INSTITUTIONS]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: UM’s own country-specific page confirms HSC holders are offered a Foundation Studies pathway, not direct undergraduate entry. Not found on official pages read for this guide: the exact euro figure behind the 60%-of-minimum-wage/poverty-line funds threshold, a Bangladesh-specific visa/permit approval rate, and confirmation that any Malta government scholarship scheme currently names Bangladesh as eligible — these are stated plainly as not confirmed, rather than guessed.', 'Bangladesh-এর জন্য যাচাই করা: UM-এর নিজের country-specific page নিশ্চিত করে HSC থাকা student-দের একটি Foundation Studies pathway দেওয়া হয়, সরাসরি undergraduate ভর্তি না। এই guide-এর জন্য পড়া official page-এ পাওয়া যায়নি: 60%-of-minimum-wage/poverty-line funds threshold-এর পিছনের সঠিক euro সংখ্যা, একটি Bangladesh-specific visa/permit অনুমোদনের হার, আর কোনো Malta government scholarship scheme বর্তমানে Bangladesh-কে যোগ্য বলে নাম দেয় তার নিশ্চিতকরণ — এগুলো অনুমান না করে সরাসরি নিশ্চিত না বলে বলা হয়েছে।'),
    ], [MT_UM_BANGLADESH, MT_IDENTITA_STUDY_FAQ], { status: 'verified' }),
  ],
  life: [
    qa('arrival', b('What happens when you arrive?', 'পৌঁছানোর পর কী হয়?'), [b('Identità’s own FAQ says you apply online via the Expatriates Portal (Form CEA N.01) for your study residence permit, then attend in person only for biometrics and, once approved, to collect your eResidence card; if your course is longer than 3 months you must also complete a health screening with the Infectious Disease Prevention & Control Unit. Processing typically takes a few weeks, and you may legally remain in Malta while it is pending if you applied on time.', 'Identità-র নিজের FAQ বলে আপনি আপনার study residence permit-এর জন্য Expatriates Portal-এর মাধ্যমে অনলাইনে (Form CEA N.01) আবেদন করেন, তারপর শুধু biometrics-এর জন্য আর, অনুমোদিত হলে, eResidence card সংগ্রহ করতে সশরীরে উপস্থিত হন; আপনার course 3 মাসের বেশি হলে Infectious Disease Prevention & Control Unit-এর সাথে একটি health screening-ও সম্পন্ন করতে হয়। Processing সাধারণত কয়েক সপ্তাহ লাগে, আর সময়মতো আবেদন করলে অপেক্ষার সময় আপনি Malta-এ আইনগতভাবে থাকতে পারেন।')], [MT_IDENTITA_STUDY_FAQ]),
  ],
  documents: MT_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'funds-to-show', kind: 'fact', status: 'not-verified', source: MT_IDENTITA_STUDY_FAQ },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { min: 0, max: 20, unit: 'hours/week combined across employers, after the first 90 days, MQF Level 5+ courses only', text: b('Up to 20 hours/week (combined across employers) after the first 90 days, for MQF Level 5+ courses only, with an employer-held Jobsplus Employment Licence.', 'প্রথম 90 দিন পর, শুধু MQF Level 5+ course-এ, সপ্তাহে 20 ঘণ্টা পর্যন্ত (সব employer মিলিয়ে), একটি employer-এর Jobsplus Employment Licence সহ।') }, source: MT_IDENTITA_STUDY_FAQ },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { min: 9, max: 9, unit: 'months (one-time post-study job-search permit)', text: b('A one-off, 9-month post-study residence permit to search for a job or start a business, open to graduates of MQF Level 5+ courses of any nationality.', 'চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য একবারের, 9-মাসের post-study residence permit, যেকোনো nationality-র MQF Level 5+ course-এর গ্র্যাজুয়েটদের জন্য খোলা।') }, source: MT_IDENTITA_STUDY_FAQ },
    { id: 'public-tuition', kind: 'estimate', status: 'verified', value: { min: 8500, max: 26000, unit: 'EUR/year (University of Malta’s own non-EU/non-EEA fee schedule, by programme category)', text: b('Roughly EUR 8,500–26,000/year at the University of Malta, depending on the programme category — an example, not a nationwide figure.', 'University of Malta-তে programme category অনুযায়ী প্রায় EUR 8,500–26,000/বছর — একটি উদাহরণ, জাতীয় সংখ্যা না।') }, source: MT_UM_FEES_NON_EU },
  ],
};

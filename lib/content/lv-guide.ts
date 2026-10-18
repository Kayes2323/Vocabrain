import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  LV_MFA_BANGLADESH,
  LV_PMLP_GENERAL_EDU_DOCS,
  LV_PMLP_RESIDENCE_HOWTO,
  LV_READ,
  LV_RSU_TUITION,
  LV_RTU_APPLY_PROGRAMMES,
  LV_RTU_SCHOLARSHIPS,
  LV_STUDYINLATVIA_ELIGIBLE_COUNTRIES,
  LV_STUDYINLATVIA_FEES,
  LV_STUDYINLATVIA_SCHOLARSHIPS,
  LV_STUDYINLATVIA_VISA,
  LV_STUDYINLATVIA_WORK,
  LV_UL_DEGREE_STUDIES,
  LV_UL_LANGUAGE,
  LV_UL_LAW_PROGRAMME,
  LV_UL_VISAS,
} from './lv-sources';

/**
 * Latvia reading guide, researched on its own from Latvia's own official
 * sources (PMLP — Pilsonības un migrācijas lietu pārvalde / Office of
 * Citizenship and Migration Affairs, Latvia's own residence-permit
 * authority, pmlp.gov.lv; the Ministry of Foreign Affairs' own Embassy of
 * Latvia in India page, which has territorial consular competence for
 * Bangladesh, mfa.gov.lv; and the official pages of the University of
 * Latvia (UL), Riga Technical University (RTU) and Rīga Stradiņš University
 * (RSU)), plus Study in Latvia, the national higher-education promotion
 * portal, cross-checked wherever possible against the universities' and
 * PMLP's own pages. Nothing is taken from another country's guide. Latvia
 * IS an EU/Schengen member state (like Malta and Poland, built earlier this
 * session), but Bangladesh is specifically named by Latvia's own pages as
 * one of the "additional assessment" countries: unlike most visa-free or
 * ordinary visa-required nationalities, a Bangladeshi applicant cannot get
 * the residence-permit invitation processed by the university alone and
 * must apply for both the residence permit and the long-stay (D) visa in
 * person at the Embassy of Latvia in India — a different process from
 * Malta's own in-country-only Expatriates Portal system or Poland's own
 * D-type-visa-then-Voivodeship-Office system, both built earlier this
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
  'University of Latvia (UL), Riga Technical University (RTU) and Rīga Stradiņš University (RSU) are not identical: each sets its own tuition fee per programme on its own fee pages, and application steps and deadlines differ between them. Always check the exact programme on the institution’s own admissions page.',
  'University of Latvia (UL), Riga Technical University (RTU), আর Rīga Stradiņš University (RSU) একরকম না: প্রত্যেকে তার নিজের fee page-এ প্রতি programme অনুযায়ী আলাদা tuition fee ঠিক করে, আর application-এর পদক্ষেপ আর deadline প্রতিটিতে আলাদা। সবসময় প্রতিষ্ঠানের নিজের admissions page-এ সঠিক programme দেখে নিন।',
);

const ADDITIONAL_ASSESSMENT_NOTE = b(
  'Latvia is an EU/Schengen member. Bangladesh is one of the countries named on Latvia’s own official lists whose citizens require "additional assessment" before a visa or residence permit is issued. This means a Bangladeshi applicant cannot simply arrive on any Schengen visa and sort out the residence permit inside Latvia the way some other nationalities can — Bangladeshi nationals must apply for the residence permit, and then the long-stay (D) visa, in person at the Embassy of Latvia in India, which has territorial consular competence for Bangladesh.',
  'Latvia EU/Schengen সদস্য। Bangladesh তাদের মধ্যে একটি দেশ যা Latvia-র নিজের official তালিকায় নাম আছে যাদের নাগরিকদের visa বা residence permit দেওয়ার আগে "additional assessment" লাগে। এর মানে একজন Bangladeshi আবেদনকারী সহজভাবে কোনো Schengen visa-তে এসে Latvia-র ভেতরে residence permit ঠিক করতে পারে না, যেমন অন্য কিছু জাতীয়তা করতে পারে — Bangladeshi নাগরিকদের ভারতে Latvia-র Embassy-তে সশরীরে residence permit-এর জন্য, তারপর দীর্ঘমেয়াদী (D) visa-র জন্য আবেদন করতে হয়, যার Bangladesh-এর জন্য territorial consular competence আছে।',
);

// ------------------------------------------------------------------ shared answers

const visaRequired = (id: string) =>
  qa(
    id,
    b('Does a Bangladeshi student need a visa to study in Latvia?', 'Bangladesh-এর student-দের Latvia-এ পড়তে visa লাগে কি?'),
    [
      b(
        'Yes. The Ministry of Foreign Affairs’ own page for the Embassy of Latvia in India states that nationals of the People’s Republic of Bangladesh who intend to enter Latvia for study purposes apply for the residence permit at the Embassy of Latvia in India in person; once PMLP (the Office of Citizenship and Migration Affairs) decides to grant residence rights, the student can then apply for a long-stay (D) visa at the same embassy. The University of Latvia’s own visa page separately lists Bangladesh (alongside around 30 other states) as needing this "additional assessment" — the university itself has no authority to carry out this step for the student.',
        'হ্যাঁ। Ministry of Foreign Affairs-এর নিজের page, ভারতে Latvia-র Embassy-র জন্য, বলে People\'s Republic of Bangladesh-এর যে নাগরিকরা পড়াশোনার জন্য Latvia-এ ঢুকতে চান তারা সশরীরে ভারতে Latvia-র Embassy-তে residence permit-এর জন্য আবেদন করেন; PMLP (Office of Citizenship and Migration Affairs) residence অধিকার দেওয়ার সিদ্ধান্ত নেওয়ার পর, student তখন একই embassy-তে দীর্ঘমেয়াদী (D) visa-র জন্য আবেদন করতে পারে। University of Latvia-র নিজের visa page আলাদাভাবে Bangladesh-কে (আরও প্রায় 30টি রাষ্ট্রের সাথে) এই "additional assessment"-এর প্রয়োজনীয়তার তালিকায় রাখে — এই পদক্ষেপ student-এর পক্ষে করার অনুমোদন university-র নিজের নেই।',
      ),
      ADDITIONAL_ASSESSMENT_NOTE,
    ],
    [LV_MFA_BANGLADESH, LV_UL_VISAS],
    { allDegrees: true },
  );

const permitProcess = (id: string) =>
  qa(
    id,
    b('How does the residence permit application work, and how long does it take?', 'Residence permit application কীভাবে কাজ করে, আর কত সময় লাগে?'),
    [
      b(
        'A Bangladeshi applicant first needs an "invitation" document: the chosen university sends PMLP the student’s passport copy, date and place of birth, citizenship, home address and the name of the Embassy of Latvia where documents will be submitted, and PMLP approves this invitation. The student then submits the actual residence-permit application in person at the Embassy of Latvia in India: the invitation, application form, passport (valid at least 3 months beyond the planned permit), a photo, proof of study-fee payment, a police-clearance statement (if resident over 12 months in that country), proof of subsistence, proof of accommodation, the study agreement, the AIC (Academic Information Centre) decision recognising prior education, and the state duty payment. PMLP’s own general-education guidance describes an equivalent document set for the same kind of application. Examination of the submitted documents costs EUR 160 (within 30 days), EUR 280 (within 10 business days) or EUR 560 (within 5 business days), per the fee table on the University of Latvia’s own visa page, and the university states the whole procedure "takes over 40 days" (45 days in one part of the same page). Once PMLP approves the residence permit, the Embassy of Latvia in India issues the long-stay (D) visa.',
        'একজন Bangladeshi আবেদনকারীর প্রথমে একটি "invitation" document লাগে: বাছাই করা university PMLP-কে student-এর passport copy, জন্মের তারিখ আর স্থান, citizenship, home address, আর document জমা দেওয়ার জন্য যে Embassy of Latvia-তে করা হবে তার নাম পাঠায়, আর PMLP এই invitation অনুমোদন করে। তারপর student ভারতে Latvia-র Embassy-তে সশরীরে আসল residence-permit application জমা দেয়: invitation, application form, passport (পরিকল্পিত permit-এর অন্তত 3 মাস বেশি valid), একটি ছবি, study-fee payment-এর proof, একটি police-clearance statement (সেই দেশে 12 মাসের বেশি থাকলে), subsistence-এর proof, accommodation-এর proof, study agreement, AIC (Academic Information Centre)-এর আগের শিক্ষা স্বীকৃতির decision, আর state duty payment। PMLP-র নিজের general-education guidance একই ধরনের application-এর জন্য একটি সমতুল্য document set বর্ণনা করে। জমা দেওয়া document পরীক্ষার জন্য খরচ EUR 160 (30 দিনের মধ্যে), EUR 280 (10 কর্মদিবসের মধ্যে), বা EUR 560 (5 কর্মদিবসের মধ্যে), University of Latvia-র নিজের visa page-এর fee table অনুযায়ী, আর university বলে পুরো procedure-এ "40 দিনের বেশি" লাগে (একই page-এর একটি অংশে 45 দিন)। PMLP residence permit অনুমোদনের পর, ভারতে Latvia-র Embassy দীর্ঘমেয়াদী (D) visa ইস্যু করে।',
      ),
    ],
    [LV_UL_VISAS, LV_MFA_BANGLADESH, LV_PMLP_RESIDENCE_HOWTO],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'The two official pages read for this guide disagree. PMLP’s own page on residence permits for general (school-level) education states the required subsistence is EUR 500/month for an adult applicant (EUR 150/month for an accompanying minor). The University of Latvia’s own visa page, specifically for its university-level (degree) students, instead states at least EUR 780/month, shown via an original bank statement (stamped and signed) plus a bank-card copy, valid for 3 months from approval. Because the two figures apply to different education levels and were not reconciled on either page, both are shown here rather than choosing one — a Bangladeshi applicant to a degree programme should plan around the higher, university-specific EUR 780/month figure and confirm the current amount directly with their chosen university or PMLP.',
        'এই guide-এর জন্য পড়া দুটি official page একমত না। PMLP-র নিজের general (school-level) education-এর জন্য residence permit page বলে একজন প্রাপ্তবয়স্ক আবেদনকারীর জন্য প্রয়োজনীয় subsistence বছরে EUR 500/মাস (সঙ্গী minor-এর জন্য EUR 150/মাস)। University of Latvia-র নিজের visa page, বিশেষভাবে এর university-level (degree) student-দের জন্য, এর বদলে অন্তত EUR 780/মাস বলে, একটি original bank statement (stamp আর signature সহ) সঙ্গে একটি bank-card copy দিয়ে দেখাতে হয়, approval-এর তারিখ থেকে 3 মাসের জন্য valid। যেহেতু দুটি সংখ্যা আলাদা শিক্ষা স্তরে প্রযোজ্য আর কোনো page-এই মেলানো হয়নি, একটি বেছে না নিয়ে দুটিই এখানে দেখানো হলো — একটি degree programme-এর Bangladeshi আবেদনকারীর বেশি, university-নির্দিষ্ট EUR 780/মাস সংখ্যা ধরে পরিকল্পনা করা উচিত আর সরাসরি তার বাছাই করা university বা PMLP-র সাথে বর্তমান পরিমাণ নিশ্চিত করা উচিত।',
      ),
    ],
    [LV_PMLP_GENERAL_EDU_DOCS, LV_UL_VISAS],
    { allDegrees: true, status: 'needs-review', discrepancy: b('PMLP’s general-education page says EUR 500/month; the University of Latvia’s own degree-level visa page says at least EUR 780/month.', 'PMLP-র general-education page বলে EUR 500/মাস; University of Latvia-র নিজের degree-level visa page বলে অন্তত EUR 780/মাস।') },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Latvia, and how many hours?', 'Latvia-এ পড়ার পাশাপাশি কাজ করা যায় কি, আর কত ঘণ্টা?'),
    [
      b(
        'Yes, and the rule depends on your degree level. Study in Latvia’s own FAQ, citing Latvia’s Immigration Law, states a full-time Bachelor’s student has the right to work up to 20 hours/week part-time (or full-time, 40 hours/week, during holidays) with any employer, while a full-time Master’s or doctoral student has the right to work with no hour restriction at all. Neither route needs a separate work permit beyond the study residence permit, per the same source — though the student should confirm this directly with PMLP, since this guide could not independently read the Immigration Law’s own clauses for this fact.',
        'হ্যাঁ, আর নিয়ম আপনার degree level-এর উপর নির্ভর করে। Study in Latvia-র নিজের FAQ, Latvia-র Immigration Law উল্লেখ করে, বলে একজন full-time Bachelor\'s student-এর সপ্তাহে 20 ঘণ্টা পর্যন্ত part-time (বা ছুটিতে full-time, সপ্তাহে 40 ঘণ্টা) যেকোনো employer-এর সাথে কাজ করার অধিকার আছে, যখন একজন full-time Master\'s বা doctoral student-এর কোনো ঘণ্টার সীমা ছাড়াই কাজ করার অধিকার আছে। একই source অনুযায়ী, দুই route-এর কোনোটিতেই study residence permit-এর বাইরে আলাদা work permit লাগে না — তবে student-এর সরাসরি PMLP-র সাথে এটা নিশ্চিত করা উচিত, কারণ এই guide স্বাধীনভাবে Immigration Law-এর নিজের clause এই fact-এর জন্য পড়তে পারেনি।',
      ),
    ],
    [LV_STUDYINLATVIA_WORK],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Latvia to work after graduating?', 'পড়া শেষে Latvia-এ কাজের জন্য থাকা যায়?'),
    [
      b(
        'Yes, with different lengths by degree level. Study in Latvia’s own FAQ states Bachelor’s graduates receive a residence permit for the study period plus an additional 4 months after graduation (to apply for Master’s study or find a job). Master’s and doctoral graduates also receive the study period plus 4 months, and may additionally request a 9-month extension to look for a job beyond those 4 months — this extension must be requested before the current permit expires, and PMLP examines each application individually, so it is not guaranteed. None of this is itself a work permit: the student’s prospective employer must separately enter into an employment contract and obtain a work permit before the student can actually start working.',
        'হ্যাঁ, degree level অনুযায়ী আলাদা দৈর্ঘ্যে। Study in Latvia-র নিজের FAQ বলে Bachelor\'s গ্র্যাজুয়েটরা পড়াশোনার সময়ের সাথে গ্র্যাজুয়েশনের পর আরও 4 মাসের একটি residence permit পায় (Master\'s study-র জন্য আবেদন বা চাকরি খোঁজার জন্য)। Master\'s আর doctoral গ্র্যাজুয়েটরাও পড়াশোনার সময় সাথে 4 মাস পায়, আর সেই 4 মাসের উপরে চাকরি খোঁজার জন্য একটি 9-মাসের extension-এর জন্য অতিরিক্ত আবেদন করতে পারে — এই extension বর্তমান permit-এর মেয়াদ শেষ হওয়ার আগে চাওয়া লাগে, আর PMLP প্রতিটি application আলাদাভাবে পরীক্ষা করে, তাই এটা নিশ্চিত না। এর কোনোটাই নিজেই একটি work permit না: student-এর সম্ভাব্য employer-কে আলাদাভাবে একটি employment contract করতে হবে আর একটি work permit পেতে হবে student আসলে কাজ শুরু করার আগে।',
      ),
    ],
    [LV_STUDYINLATVIA_VISA],
    { status: 'verified' },
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'Not verified yet as currently open to Bangladeshi applicants. Study in Latvia’s own official list of eligible countries for the Latvian state scholarship — the main national scholarship for Bachelor’s, Master’s and PhD study in Latvia, EUR 500/month for Bachelor’s/Master’s or EUR 700/month for PhD, administered by VIAA (the State Education Development Agency) — names 39 specific countries whose citizens may apply; Bangladesh is not one of them, since the scholarship is granted under bilateral education/science co-operation agreements that Latvia has signed with each listed country. RTU’s own Scholarships page confirms this is the same, bilateral-agreement-based "Latvian government scholarship" and names no other general scholarship. No RSU or University of Latvia scholarship for Bangladeshi applicants was found on the pages read for this guide either.',
        'বর্তমানে Bangladeshi আবেদনকারীদের জন্য খোলা কিনা যাচাই হয়নি। Study in Latvia-র নিজের Latvian state scholarship-এর (Latvia-এ Bachelor\'s, Master\'s, আর PhD study-র জন্য মূল জাতীয় scholarship, Bachelor\'s/Master\'s-এর জন্য বছরে EUR 500/মাস বা PhD-র জন্য EUR 700/মাস, VIAA (State Education Development Agency) পরিচালিত) যোগ্য দেশের official তালিকায় নির্দিষ্ট 39টি দেশের নাম আছে যাদের নাগরিকরা আবেদন করতে পারে; Bangladesh তার মধ্যে নেই, কারণ এই scholarship Latvia প্রতিটি তালিকাভুক্ত দেশের সাথে সম্পাদিত bilateral education/science co-operation agreement-এর অধীনে দেওয়া হয়। RTU-র নিজের Scholarships page নিশ্চিত করে এটাই একই, bilateral-agreement-ভিত্তিক "Latvian government scholarship" আর অন্য কোনো সাধারণ scholarship-এর নাম দেয় না। এই guide-এর জন্য পড়া page-এ RSU বা University of Latvia-র কোনো Bangladeshi আবেদনকারীদের জন্য scholarship-ও পাওয়া যায়নি।',
      ),
    ],
    [LV_STUDYINLATVIA_SCHOLARSHIPS, LV_STUDYINLATVIA_ELIGIBLE_COUNTRIES, LV_RTU_SCHOLARSHIPS],
    { status: 'not-verified', kind: 'guidance' },
  );

// ------------------------------------------------------------------ documents

const AUTHORITY = b('PMLP (Pilsonības un migrācijas lietu pārvalde), via the Embassy of Latvia in India for Bangladeshi applicants.', 'PMLP (Pilsonības un migrācijas lietu pārvalde), Bangladeshi আবেদনকারীদের জন্য ভারতে Latvia-র Embassy-র মাধ্যমে।');

export const LV_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Valid passport (3+ months beyond the planned permit)', 'বৈধ passport (পরিকল্পিত permit-এর চেয়ে 3+ মাস বেশি)'),
    why: b('The University of Latvia’s own visa page requires the passport to stay valid for at least 3 months longer than the planned residence-permit term, and PMLP’s own general guidance also requires a full, valid travel document.', 'University of Latvia-র নিজের visa page passport-কে পরিকল্পিত residence-permit মেয়াদের চেয়ে অন্তত 3 মাস বেশি valid থাকতে বলে, আর PMLP-র নিজের general guidance-ও একটি পূর্ণ, valid travel document চায়।'),
    who: AUTHORITY,
    when: b('With the residence-permit application, at the Embassy of Latvia in India.', 'Residence-permit application-এর সঙ্গে, ভারতে Latvia-র Embassy-তে।'),
    where: b('Submitted in person; the original must be presented.', 'সশরীরে জমা দিতে হয়; original দেখাতে হয়।'),
    prepare: b('Renew an expiring passport well before applying — the permit cannot extend beyond it.', 'আবেদনের ভালো আগেই মেয়াদ শেষ হওয়ার কাছাকাছি passport renew করুন — permit এর বেশি হতে পারবে না।'),
    groups: ['general', 'visa'],
    sources: [LV_UL_VISAS],
  },
  {
    id: 'invitation',
    name: b('Residence-permit invitation document', 'Residence-permit invitation document (আমন্ত্রণপত্র)'),
    why: b('For Bangladesh, an "additional assessment" country, the university first sends PMLP the student’s basic data to get an invitation approved, before the student can submit the actual application at the embassy.', 'Bangladesh-এর জন্য, একটি "additional assessment" দেশ, university প্রথমে PMLP-কে student-এর basic data পাঠায় একটি invitation অনুমোদনের জন্য, student embassy-তে আসল application জমা দেওয়ার আগে।'),
    who: b('The chosen Latvian university, submitted to PMLP.', 'বাছাই করা Latvian university, PMLP-কে জমা দেওয়া হয়।'),
    when: b('After the student is accepted, before applying at the embassy.', 'Student ভর্তি হওয়ার পর, embassy-তে আবেদনের আগে।'),
    where: b('University coordinator ↔ PMLP, then forwarded to the student for the embassy application.', 'University coordinator ↔ PMLP, তারপর student-এর কাছে embassy application-এর জন্য পাঠানো হয়।'),
    prepare: b('Give your university your accommodation address in Latvia and the embassy you will apply at as soon as you know them, so the invitation is accurate.', 'Latvia-এ আপনার accommodation address আর যে embassy-তে আবেদন করবেন তা জানার সাথে সাথে আপনার university-কে দিন, যাতে invitation সঠিক হয়।'),
    groups: ['general', 'visa'],
    sources: [LV_UL_VISAS],
  },
  {
    id: 'study-agreement',
    name: b('Study agreement with the university', 'University-র সাথে study agreement'),
    why: b('PMLP’s own guidance requires a contract on studies in the Republic of Latvia for accredited educational institutions/universities, confirming the course and its duration.', 'PMLP-র নিজের guidance accredited educational institution/university-র জন্য Latvia Republic-এ পড়াশোনার একটি contract চায়, course আর এর দৈর্ঘ্য নিশ্চিত করতে।'),
    who: b('Your Latvian university.', 'আপনার Latvian university।'),
    when: b('Issued after admission; needed for both the embassy visa/permit application and arrival.', 'ভর্তির পর ইস্যু হয়; embassy visa/permit application আর পৌঁছানো দুটোর জন্যই লাগে।'),
    where: b('Two originals signed; one kept by the university, one by the student until graduation.', 'দুই original সাইন করা হয়; একটি university-র কাছে, একটি student-এর কাছে গ্র্যাজুয়েশন পর্যন্ত থাকে।'),
    prepare: b('Keep your copy safe for the whole duration of your studies — it may be requested at renewal.', 'পুরো পড়াশোনার সময়ের জন্য আপনার কপি সাবধানে রাখুন — renewal-এ চাওয়া হতে পারে।'),
    groups: ['general', 'program', 'visa'],
    sources: [LV_PMLP_RESIDENCE_HOWTO],
  },
  {
    id: 'proof-of-funds',
    name: b('Proof of sufficient funds (subsistence)', 'পর্যাপ্ত funds-এর proof (subsistence)'),
    why: b('Official pages disagree on the exact amount — PMLP’s general-education page says EUR 500/month, the University of Latvia’s own degree-level page says at least EUR 780/month — shown via an original bank statement plus a bank-card copy, valid 3 months from approval.', 'Official page সঠিক পরিমাণে একমত না — PMLP-র general-education page বলে EUR 500/মাস, University of Latvia-র নিজের degree-level page বলে অন্তত EUR 780/মাস — একটি original bank statement সঙ্গে bank-card copy দিয়ে দেখাতে হয়, approval থেকে 3 মাসের জন্য valid।'),
    who: AUTHORITY,
    when: b('With the residence-permit application, and refreshed at each extension.', 'Residence-permit application-এর সঙ্গে, আর প্রতি extension-এ নতুন করে।'),
    where: b('Submitted at the Embassy of Latvia in India.', 'ভারতে Latvia-র Embassy-তে জমা দিতে হয়।'),
    prepare: b('Confirm the current required amount directly with your university or PMLP before relying on either EUR 500 or EUR 780/month.', 'EUR 500 বা EUR 780/মাসের কোনোটিতে নির্ভর করার আগে সরাসরি আপনার university বা PMLP-র সাথে বর্তমান প্রয়োজনীয় পরিমাণ নিশ্চিত করুন।'),
    groups: ['general', 'visa', 'bangladesh'],
    sources: [LV_PMLP_GENERAL_EDU_DOCS, LV_UL_VISAS],
  },
  {
    id: 'police-clearance',
    name: b('Police-clearance (no-criminal-conviction) certificate', 'Police-clearance (no-criminal-conviction) certificate (পুলিশ ছাড়পত্র)'),
    why: b('Required for applicants over 14 who have resided in a country for more than 12 months, per both PMLP’s own general-education page and the University of Latvia’s own visa page.', 'PMLP-র নিজের general-education page আর University of Latvia-র নিজের visa page দুটোই অনুযায়ী, 14 বছরের বেশি বয়সী আর কোনো দেশে 12 মাসের বেশি থাকা আবেদনকারীদের জন্য প্রয়োজনীয়।'),
    who: b('A competent institution in Bangladesh (or your country of residence).', 'Bangladesh-এ (বা আপনার থাকার দেশে) একটি competent institution।'),
    when: b('With the residence-permit application; legalised copies are valid for 6 months from approval.', 'Residence-permit application-এর সঙ্গে; legalised copy approval থেকে 6 মাসের জন্য valid।'),
    where: b('Legalised and submitted at the Embassy of Latvia in India.', 'Legalised আর ভারতে Latvia-র Embassy-তে জমা দিতে হয়।'),
    prepare: b('Start this early — police-clearance certificates and their legalisation can take weeks.', 'এটা আগেভাগে শুরু করুন — police-clearance certificate আর এর legalisation সপ্তাহ লাগতে পারে।'),
    groups: ['general', 'visa', 'bangladesh'],
    sources: [LV_PMLP_GENERAL_EDU_DOCS, LV_UL_VISAS],
  },
  {
    id: 'proof-of-accommodation',
    name: b('Proof of accommodation in Latvia', 'Latvia-এ accommodation-এর proof'),
    why: b('The University of Latvia’s own visa page requires a document confirming your place of accommodation; the university itself can provide this if you will stay in its residence hall.', 'University of Latvia-র নিজের visa page আপনার accommodation-এর জায়গা নিশ্চিত করা একটি document চায়; university নিজেই এটা দিতে পারে যদি আপনি এর residence hall-এ থাকেন।'),
    who: b('Your university (for dormitory housing) or a landlord.', 'আপনার university (dormitory housing-এর জন্য) বা একজন landlord।'),
    when: b('With the residence-permit application; valid for 3 months from approval.', 'Residence-permit application-এর সঙ্গে; approval থেকে 3 মাসের জন্য valid।'),
    where: b('Submitted at the Embassy of Latvia in India.', 'ভারতে Latvia-র Embassy-তে জমা দিতে হয়।'),
    prepare: b('Applying for a university dormitory place as soon as you are accepted avoids separate lease paperwork and notarised attestations.', 'ভর্তি হওয়ার সাথে সাথে university dormitory-র জন্য আবেদন করলে আলাদা lease কাগজপত্র আর notarised attestation এড়ানো যায়।'),
    groups: ['general', 'visa', 'arrival'],
    sources: [LV_UL_VISAS],
  },
  {
    id: 'aic-decision',
    name: b('AIC decision recognising your prior education', 'AIC decision যা আপনার আগের শিক্ষা স্বীকৃতি দেয়'),
    why: b('Previous diplomas must be recognised as sufficient for study at a Latvian university; the University of Latvia’s own visa page lists an AIC (Academic Information Centre) decision as a required residence-permit document, given by the university after its own recognition process.', 'আগের diploma Latvian university-তে পড়াশোনার জন্য পর্যাপ্ত বলে স্বীকৃত হতে হয়; University of Latvia-র নিজের visa page একটি AIC (Academic Information Centre) decision-কে একটি প্রয়োজনীয় residence-permit document হিসেবে তালিকাভুক্ত করে, university-র নিজের recognition process-এর পর দেওয়া হয়।'),
    who: b('The Academic Information Centre (AIC), via your university.', 'Academic Information Centre (AIC), আপনার university-র মাধ্যমে।'),
    when: b('After admission, before the residence-permit application; legalisation of the underlying diploma/transcript must be completed first.', 'ভর্তির পর, residence-permit application-এর আগে; এর পেছনের diploma/transcript-এর legalisation প্রথমে সম্পন্ন করতে হয়।'),
    where: b('Handled by the university’s international office, then given to the student.', 'University-র international office এটা পরিচালনা করে, তারপর student-কে দেওয়া হয়।'),
    prepare: b('Legalise your original diploma and transcript under the Hague Convention before applying — this step is a prerequisite, not something to leave for later.', 'আবেদনের আগে আপনার original diploma আর transcript Hague Convention-এর অধীনে legalise করুন — এই পদক্ষেপ একটি prerequisite, পরে রাখার কিছু না।'),
    groups: ['general', 'program', 'visa'],
    sources: [LV_UL_VISAS, LV_UL_DEGREE_STUDIES],
  },
  {
    id: 'state-duty-payment',
    name: b('State duty payment for document examination', 'Document examination-এর জন্য state duty payment'),
    why: b('The University of Latvia’s own visa page sets this at EUR 160 (within 30 days), EUR 280 (within 10 business days) or EUR 560 (within 5 business days) for a first-time permit.', 'University of Latvia-র নিজের visa page প্রথমবারের permit-এর জন্য এটা EUR 160 (30 দিনের মধ্যে), EUR 280 (10 কর্মদিবসের মধ্যে), বা EUR 560 (5 কর্মদিবসের মধ্যে) ঠিক করে।'),
    who: AUTHORITY,
    when: b('With the residence-permit application.', 'Residence-permit application-এর সঙ্গে।'),
    where: b('Paid at the embassy or at PMLP, per the University of Latvia’s own fee table.', 'University of Latvia-র নিজের fee table অনুযায়ী embassy-তে বা PMLP-তে পরিশোধ করতে হয়।'),
    prepare: b('Choosing the standard (30-day) processing speed is the cheapest option if your timeline allows it.', 'সময় থাকলে standard (30-দিনের) processing speed সবচেয়ে কম খরচের option।'),
    groups: ['general', 'visa'],
    sources: [LV_UL_VISAS],
  },
  {
    id: 'extension-application',
    name: b('Post-graduation residence-permit extension (job-search, 9 months)', 'গ্র্যাজুয়েশনের পর residence-permit extension (job-search, 9 মাস)'),
    why: b('Study in Latvia’s own FAQ describes this additional 9-month extension for Master’s and doctoral graduates on top of the automatic 4 months after graduation, to look for a job — it must be requested in advance, before the current permit expires, and is not guaranteed.', 'Study in Latvia-র নিজের FAQ Master\'s আর doctoral গ্র্যাজুয়েটদের জন্য গ্র্যাজুয়েশনের পর স্বয়ংক্রিয় 4 মাসের উপরে এই অতিরিক্ত 9-মাসের extension বর্ণনা করে, চাকরি খোঁজার জন্য — বর্তমান permit-এর মেয়াদ শেষ হওয়ার আগে, আগে থেকে চাওয়া লাগে, আর এটা নিশ্চিত না।'),
    who: AUTHORITY,
    when: b('Before your current residence permit (study period + 4 months) expires.', 'আপনার বর্তমান residence permit (পড়াশোনার সময় + 4 মাস) মেয়াদ শেষ হওয়ার আগে।'),
    where: b('Submitted through the same channel as your original application.', 'আপনার মূল application-এর মতো একই চ্যানেলে জমা দিতে হয়।'),
    prepare: b('Only Master’s and doctoral graduates can request this extra 9 months; Bachelor’s graduates get only the automatic 4 months.', 'শুধু Master\'s আর doctoral গ্র্যাজুয়েটরা এই অতিরিক্ত 9 মাস চাইতে পারে; Bachelor\'s গ্র্যাজুয়েটরা শুধু স্বয়ংক্রিয় 4 মাস পায়।'),
    groups: ['arrival'],
    sources: [LV_STUDYINLATVIA_VISA],
  },
];

// ------------------------------------------------------------------ costs (source's own currency, never converted)

const UL_TUITION_EXAMPLE: GuideCost = {
  id: 'ul-tuition-example',
  label: b('Tuition example: University of Latvia, Bachelor’s "Law" (2025/26, Latvian-taught)', 'Tuition উদাহরণ: University of Latvia, Bachelor\'s "Law" (2025/26, Latvian-এ পড়ানো)'),
  value: b('UL’s own programme page sets the non-EU/non-EEA fee at EUR 3,700/year for this programme (EUR 2,850/year for EU/EEA/Swiss citizens); other programmes, especially English-taught ones, carry their own separate fees not itemized here.', 'UL-এর নিজের programme page এই programme-এর জন্য non-EU/non-EEA fee বছরে EUR 3,700 ঠিক করে (EU/EEA/Swiss নাগরিকদের জন্য বছরে EUR 2,850); অন্য programme, বিশেষত English-এ পড়ানো, নিজস্ব আলাদা fee বহন করে যা এখানে তালিকাভুক্ত করা হয়নি।'),
  status: 'verified',
  amount: { value: 2850, max: 3700, currency: 'EUR', period: 'year' },
  source: LV_UL_LAW_PROGRAMME,
};
const RTU_TUITION_EXAMPLE: GuideCost = {
  id: 'rtu-tuition-example',
  label: b('Tuition example: Riga Technical University, English-taught programmes', 'Tuition উদাহরণ: Riga Technical University, English-এ পড়ানো programme'),
  value: b('RTU’s own application portal shows, for example, EUR 4,030–5,030/year for Bachelor’s programmes and EUR 5,650–9,300/year for Master’s programmes, with its Riga Business School MBA at EUR 20,400 and EMBA at EUR 33,000 for the whole programme — the same fee for EU and non-EU applicants on each listing read for this guide.', 'RTU-র নিজের application portal, উদাহরণস্বরূপ, Bachelor\'s programme-এর জন্য বছরে EUR 4,030–5,030 আর Master\'s programme-এর জন্য বছরে EUR 5,650–9,300 দেখায়, এর Riga Business School MBA সম্পূর্ণ programme-এর জন্য EUR 20,400 আর EMBA EUR 33,000 — এই guide-এর জন্য পড়া প্রতিটি listing-এ EU আর non-EU আবেদনকারীদের জন্য একই fee।'),
  status: 'verified',
  amount: { value: 4030, max: 9300, currency: 'EUR', period: 'year' },
  source: LV_RTU_APPLY_PROGRAMMES,
};
const RSU_TUITION_EXAMPLE: GuideCost = {
  id: 'rsu-tuition-example',
  label: b('Tuition example: Rīga Stradiņš University, Medicine and Dentistry (2026/27)', 'Tuition উদাহরণ: Rīga Stradiņš University, Medicine আর Dentistry (2026/27)'),
  value: b('RSU’s own tuition page sets Medicine at EUR 13,500/year for all six years and Dentistry at EUR 15,500/year for its first five years, plus a one-time EUR 1,800 registration fee for these two programmes only and a EUR 100 general application fee.', 'RSU-র নিজের tuition page Medicine-কে সব ছয় বছরের জন্য বছরে EUR 13,500 আর Dentistry-কে প্রথম পাঁচ বছরের জন্য বছরে EUR 15,500 ঠিক করে, এর সাথে শুধু এই দুই programme-এর জন্য একবারের EUR 1,800 registration fee আর একটি সাধারণ EUR 100 application fee।'),
  status: 'verified',
  amount: { value: 13500, max: 15500, currency: 'EUR', period: 'year' },
  source: LV_RSU_TUITION,
};
const NATIONAL_RANGE_ESTIMATE: GuideCost = {
  id: 'national-range-estimate',
  label: b('National range across Latvian institutions (Study in Latvia)', 'Latvian institution জুড়ে জাতীয় range (Study in Latvia)'),
  value: b('Study in Latvia’s own FAQ gives a national planning range of under EUR 1,600/year for some Bachelor’s programmes up to EUR 15,000/year for Dentistry and EUR 25,600/year for an Executive MBA — spanning several universities, not any one of them alone.', 'Study in Latvia-র নিজের FAQ একটি জাতীয় পরিকল্পনা range দেয়, কিছু Bachelor\'s programme-এর জন্য বছরে EUR 1,600-এর কম থেকে Dentistry-র জন্য বছরে EUR 15,000 আর Executive MBA-র জন্য বছরে EUR 25,600 পর্যন্ত — একাধিক university জুড়ে, একাটিও একা না।'),
  status: 'partly-verified',
  source: LV_STUDYINLATVIA_FEES,
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
            'The examples below — the University of Latvia (UL), the country’s largest public university; Riga Technical University (RTU), Latvia’s main technical university; and Rīga Stradiņš University (RSU), known internationally for English-medium Medicine and Dentistry — are listed alphabetically by code, not ordered by quality. All three teach some programmes in English and set their own, separately published fee schedules. Always check the exact programme on the institution’s own admissions page.',
            'নিচের উদাহরণ — University of Latvia (UL), দেশের সবচেয়ে বড় public university; Riga Technical University (RTU), Latvia-র মূল technical university; আর Rīga Stradiņš University (RSU), আন্তর্জাতিকভাবে English-medium Medicine আর Dentistry-র জন্য পরিচিত — কোড অনুযায়ী বর্ণানুক্রমে, মান অনুযায়ী নয়। তিনটিই কিছু programme English-এ পড়ায় আর নিজস্ব, আলাদাভাবে প্রকাশিত fee schedule ঠিক করে। সবসময় প্রতিষ্ঠানের নিজের admissions page-এ সঠিক programme দেখুন।',
          ),
        ],
        [LV_STUDYINLATVIA_FEES],
      ),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work')] },
  { id: 'visa', title: b('Visa and residence permit', 'Visa আর residence permit'), items: [visaRequired('visa-required'), permitProcess('permit-process'), funds('funds')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Work right: 20 hrs/week part-time (40 hrs during holidays) · residence permit = study period + 4 months after graduation · Bangladesh needs "additional assessment" — apply in person at the Embassy of Latvia in India', 'কাজের অধিকার: সপ্তাহে 20 ঘণ্টা part-time (ছুটিতে 40 ঘণ্টা) · residence permit = পড়াশোনার সময় + গ্র্যাজুয়েশনের পর 4 মাস · Bangladesh-এর "additional assessment" লাগে — ভারতে Latvia-র Embassy-তে সশরীরে আবেদন করুন'),
  intro: b(
    'Latvia is an EU/Schengen member, and Bangladesh is named on Latvia’s own official lists as one of the countries needing "additional assessment" before a visa or residence permit is issued — a Bangladeshi applicant must apply for the residence permit, and then the long-stay (D) visa, in person at the Embassy of Latvia in India, which has territorial consular competence for Bangladesh, rather than sorting this out inside Latvia the way some other nationalities can. Tuition is set per programme: the University of Latvia’s own Bachelor’s "Law" programme charges EUR 3,700/year for non-EU citizens (its own English-taught Bachelor’s programmes carry separate fees not itemized for every programme here); RTU’s own application portal lists English-taught Bachelor’s programmes from EUR 4,030–5,030/year; RSU’s own tuition page sets its Bachelor’s "International Business and Start-up Entrepreneurship" at EUR 3,300/year. A full-time Bachelor’s student may work up to 20 hours/week part-time (40 hours/week during holidays) with any employer, per Study in Latvia’s own FAQ. The residence permit normally runs for the study period plus 4 months after graduation. No scholarship for Bangladeshi applicants was confirmed: the Latvian state scholarship’s own list of 39 eligible countries does not include Bangladesh.',
    'Latvia EU/Schengen সদস্য, আর Bangladesh Latvia-র নিজের official তালিকায় সেই দেশগুলোর মধ্যে একটি যাদের visa বা residence permit দেওয়ার আগে "additional assessment" লাগে — একজন Bangladeshi আবেদনকারীকে ভারতে Latvia-র Embassy-তে সশরীরে residence permit-এর জন্য, তারপর দীর্ঘমেয়াদী (D) visa-র জন্য আবেদন করতে হয়, যার Bangladesh-এর জন্য territorial consular competence আছে, Latvia-র ভেতরে এটা ঠিক করার বদলে যেমন অন্য কিছু জাতীয়তা করতে পারে। Tuition প্রতি programme অনুযায়ী ঠিক হয়: University of Latvia-র নিজের Bachelor\'s "Law" programme non-EU নাগরিকদের জন্য বছরে EUR 3,700 নেয় (এর নিজের English-taught Bachelor\'s programme আলাদা fee বহন করে যা এখানে প্রতিটির জন্য তালিকাভুক্ত করা হয়নি); RTU-র নিজের application portal English-taught Bachelor\'s programme বছরে EUR 4,030–5,030 থেকে তালিকাভুক্ত করে; RSU-র নিজের tuition page এর Bachelor\'s "International Business and Start-up Entrepreneurship"-কে বছরে EUR 3,300 ঠিক করে। Study in Latvia-র নিজের FAQ অনুযায়ী, একজন full-time Bachelor\'s student যেকোনো employer-এর সাথে সপ্তাহে 20 ঘণ্টা পর্যন্ত part-time (ছুটিতে সপ্তাহে 40 ঘণ্টা) কাজ করতে পারে। Residence permit সাধারণত পড়াশোনার সময় সাথে গ্র্যাজুয়েশনের পর 4 মাস পর্যন্ত চলে। Bangladeshi আবেদনকারীদের জন্য কোনো scholarship নিশ্চিত হয়নি: Latvian state scholarship-এর নিজের 39টি যোগ্য দেশের তালিকায় Bangladesh নেই।',
  ),
  costs: { official: [UL_TUITION_EXAMPLE, RTU_TUITION_EXAMPLE, RSU_TUITION_EXAMPLE], estimates: [NATIONAL_RANGE_ESTIMATE] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and English-taught programmes', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর English-taught programme'),
      items: [
        qa(
          'requirements',
          b('What do you need to study a Bachelor’s in Latvia from Bangladesh?', 'Bangladesh থেকে Latvia-এ Bachelor\'s পড়তে কী কী লাগে?'),
          [
            b(
              'A secondary-school diploma/certificate recognised as sufficient for admission to a Latvian university (checked by the Academic Information Centre, AIC, as part of the application), an institution offer, an English-proficiency result where the programme requires one, and the full "additional assessment" residence-permit and D-visa process at the Embassy of Latvia in India.',
              'একটি secondary-school diploma/certificate যা একটি Latvian university-তে ভর্তির জন্য পর্যাপ্ত বলে স্বীকৃত (application-এর অংশ হিসেবে Academic Information Centre, AIC দ্বারা চেক করা), একটি institution offer, programme-এ প্রয়োজন হলে একটি English-proficiency result, আর ভারতে Latvia-র Embassy-তে পূর্ণ "additional assessment" residence-permit আর D-visa process।',
            ),
            CHECK_UNI,
          ],
          [LV_UL_DEGREE_STUDIES],
          { status: 'verified' },
        ),
        qa(
          'english-programmes',
          b('Can you study a Bachelor’s in English?', 'English-এ কি Bachelor\'s পড়া যায়?'),
          [
            b(
              'Yes, at all three universities in this guide, though not every programme is English-taught: RTU’s own application portal lists over 30 English-taught programmes across Bachelor’s, Master’s and executive levels; RSU teaches some Bachelor’s programmes (e.g. International Business and Start-up Entrepreneurship) and its well-known Medicine/Dentistry programmes in English; the University of Latvia runs a mix of Latvian-taught and English-taught Bachelor’s programmes, so check each specific programme’s language of instruction before applying.',
              'হ্যাঁ, এই guide-এর তিনটি university-তেই, যদিও প্রতিটি programme English-taught না: RTU-র নিজের application portal Bachelor\'s, Master\'s, আর executive level জুড়ে 30-এর বেশি English-taught programme তালিকাভুক্ত করে; RSU কিছু Bachelor\'s programme (যেমন International Business and Start-up Entrepreneurship) আর এর পরিচিত Medicine/Dentistry programme English-এ পড়ায়; University of Latvia Latvian-taught আর English-taught Bachelor\'s programme-এর মিশ্রণ চালায়, তাই আবেদনের আগে প্রতিটি নির্দিষ্ট programme-এর পড়ানোর ভাষা চেক করুন।',
            ),
          ],
          [LV_RTU_APPLY_PROGRAMMES, LV_RSU_TUITION, LV_UL_LAW_PROGRAMME],
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
              'UL’s own admissions page runs applications through apply.lu.lv with a main intake around the start of the academic year; a Winter intake deadline of 15 January was confirmed only for a specific part-time Master’s programme. RTU’s own apply.rtu.lv portal lists Autumn and Spring intakes with per-programme deadlines (e.g. 15 November for several Spring 2026/27 Master’s programmes). RSU’s own tuition page states tuition payments run on a semester basis, with a February intake for some programmes alongside the main autumn one. General, single-date Bachelor’s deadlines across every applicant category were not itemized on the pages read for this guide — check each university’s own current-cycle dates.',
              'UL-এর নিজের admissions page apply.lu.lv-এর মাধ্যমে application চালায় শিক্ষাবর্ষ শুরুর দিকে একটি মূল intake সহ; একটি Winter intake deadline 15 January শুধু একটি নির্দিষ্ট part-time Master\'s programme-এর জন্য নিশ্চিত হয়েছিল। RTU-র নিজের apply.rtu.lv portal Autumn আর Spring intake তালিকাভুক্ত করে প্রতি-programme deadline সহ (যেমন কয়েকটি Spring 2026/27 Master\'s programme-এর জন্য 15 November)। RSU-র নিজের tuition page বলে tuition payment semester অনুযায়ী চলে, মূল autumn-এর পাশাপাশি কিছু programme-এর জন্য একটি February intake। এই guide-এর জন্য পড়া page-এ প্রতিটি applicant category জুড়ে সাধারণ, একক-তারিখ Bachelor\'s deadline তালিকাভুক্ত হয়নি — প্রতিটি university-র নিজের চলতি cycle-এর date চেক করুন।',
            ),
          ],
          [LV_UL_DEGREE_STUDIES, LV_RTU_APPLY_PROGRAMMES, LV_RSU_TUITION],
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
          b('How much English do you need for an undergraduate course?', 'Undergraduate course-এ কত English লাগে?'),
          [
            b(
              'UL’s own Language Proficiency page requires an internationally recognised test taken within the last 5 years: IELTS 6.0 overall, TOEFL iBT 80 (tests before 21 January 2026) or 4 on the new scale (tests after), CAE/CPE at any level, FCE at least grade B, or PTE Academic at least 55 — unless previous education was completed in English in a short named list of countries that does not include Bangladesh. RTU’s and RSU’s own specific English minimums for Bachelor’s entry were not itemized on the pages read for this guide — each programme listing on apply.rtu.lv or RSU’s own admissions pages should be checked directly.',
              'UL-এর নিজের Language Proficiency page গত 5 বছরের মধ্যে নেওয়া একটি internationally recognised test চায়: IELTS 6.0 overall, TOEFL iBT 80 (21 January 2026-এর আগের test) বা নতুন scale-এ 4 (পরের test), CAE/CPE কোনো level, FCE অন্তত grade B, বা PTE Academic অন্তত 55 — যদি না আগের শিক্ষা একটি সংক্ষিপ্ত তালিকাভুক্ত দেশে (যাতে Bangladesh নেই) English-এ সম্পন্ন হয়ে থাকে। Bachelor\'s ভর্তির জন্য RTU আর RSU-র নিজস্ব নির্দিষ্ট English ন্যূনতম এই guide-এর জন্য পড়া page-এ তালিকাভুক্ত হয়নি — apply.rtu.lv বা RSU-র নিজের admissions page-এ প্রতিটি programme listing সরাসরি চেক করা উচিত।',
            ),
          ],
          [LV_UL_LANGUAGE],
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
          b('How much is a Bachelor’s in Latvia?', 'Latvia-এ Bachelor\'s-এ খরচ কত?'),
          [
            b(
              'Set per institution and per programme, not as one nationwide figure. UL’s own "Law" programme charges EUR 3,700/year for non-EU citizens; RTU’s own portal lists English-taught Bachelor’s programmes at EUR 4,030–5,030/year; RSU’s own tuition page sets "International Business and Start-up Entrepreneurship" at EUR 3,300/year. Study in Latvia’s own national FAQ gives a broader planning range of under EUR 1,600/year to EUR 15,000/year across all Latvian institutions and levels.',
              'Institution আর programme অনুযায়ী ঠিক হয়, একক জাতীয় সংখ্যা না। UL-এর নিজের "Law" programme non-EU নাগরিকদের জন্য বছরে EUR 3,700 নেয়; RTU-র নিজের portal English-taught Bachelor\'s programme বছরে EUR 4,030–5,030 তালিকাভুক্ত করে; RSU-র নিজের tuition page "International Business and Start-up Entrepreneurship"-কে বছরে EUR 3,300 ঠিক করে। Study in Latvia-র নিজের জাতীয় FAQ সব Latvian institution আর level জুড়ে বছরে EUR 1,600-এর কম থেকে EUR 15,000 পর্যন্ত একটি বিস্তৃত পরিকল্পনা range দেয়।',
            ),
            CHECK_UNI,
          ],
          [LV_UL_LAW_PROGRAMME, LV_RTU_APPLY_PROGRAMMES, LV_RSU_TUITION, LV_STUDYINLATVIA_FEES],
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
  card: b('Full-time Master’s students may work with no hour restriction · residence permit = study period + 4 months, extendable by 9 more months to job-search · same "additional assessment" visa route for Bangladesh', 'Full-time Master\'s student কোনো ঘণ্টার সীমা ছাড়াই কাজ করতে পারে · residence permit = পড়াশোনার সময় + 4 মাস, আরও 9 মাস job-search-এর জন্য বাড়ানো যায় · Bangladesh-এর জন্য একই "additional assessment" visa route'),
  intro: b(
    'Master’s admission is assessed per programme at each university — UL’s own English-taught and Latvian-taught Master’s programmes, RTU’s own English-taught Master’s programmes (e.g. Business Informatics EUR 5,650/year, Computer Systems EUR 6,150/year, Architecture EUR 9,300/year, or RTU Riga Business School’s MBA/EMBA for non-EU/EEA applicants at EUR 20,400/EUR 33,000 for the whole programme), and RSU’s own English-taught Master’s programmes (EUR 3,400–5,000/year). A full-time Master’s student may work with no hour restriction, per Study in Latvia’s own FAQ — a notably more generous rule than the Bachelor’s-level 20-hour/40-hour cap. The residence permit runs for the study period plus 4 months after graduation, with the possibility (not guaranteed) of requesting a further 9-month extension to look for a job. As with Bachelor’s level, Bangladesh needs "additional assessment": the residence permit and D visa must be applied for in person at the Embassy of Latvia in India. No Master’s scholarship for Bangladeshi applicants was confirmed; the Latvian state scholarship’s 39 eligible countries do not include Bangladesh.',
    'Master\'s ভর্তি প্রতি university-তে প্রতি programme অনুযায়ী মূল্যায়ন করা হয় — UL-এর নিজের English-taught আর Latvian-taught Master\'s programme, RTU-র নিজের English-taught Master\'s programme (যেমন Business Informatics বছরে EUR 5,650, Computer Systems বছরে EUR 6,150, Architecture বছরে EUR 9,300, বা RTU Riga Business School-এর non-EU/EEA আবেদনকারীদের জন্য MBA/EMBA সম্পূর্ণ programme-এর জন্য EUR 20,400/EUR 33,000), আর RSU-র নিজের English-taught Master\'s programme (বছরে EUR 3,400–5,000)। Study in Latvia-র নিজের FAQ অনুযায়ী, একজন full-time Master\'s student কোনো ঘণ্টার সীমা ছাড়াই কাজ করতে পারে — Bachelor\'s-level 20-ঘণ্টা/40-ঘণ্টার সীমার চেয়ে উল্লেখযোগ্যভাবে বেশি উদার একটি নিয়ম। Residence permit পড়াশোনার সময় সাথে গ্র্যাজুয়েশনের পর 4 মাস পর্যন্ত চলে, চাকরি খোঁজার জন্য আরও একটি 9-মাসের extension (নিশ্চিত না) চাওয়ার সম্ভাবনা সহ। Bachelor\'s level-এর মতোই, Bangladesh-এর "additional assessment" লাগে: residence permit আর D visa ভারতে Latvia-র Embassy-তে সশরীরে আবেদন করতে হয়। Bangladeshi আবেদনকারীদের জন্য কোনো Master\'s scholarship নিশ্চিত হয়নি; Latvian state scholarship-এর 39টি যোগ্য দেশে Bangladesh নেই।',
  ),
  costs: { official: [UL_TUITION_EXAMPLE, RTU_TUITION_EXAMPLE], estimates: [NATIONAL_RANGE_ESTIMATE] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b('What do you need for a Master’s in Latvia?', 'Latvia-এ Master\'s-এ কী লাগে?'),
          [
            b(
              'A recognised Bachelor’s degree diploma and transcript (legalised and translated for degrees from outside the EU/EEA), the programme’s own English (or other language) proficiency requirement, and the same "additional assessment" residence-permit and D-visa process at the Embassy of Latvia in India that applies at every degree level for Bangladeshi applicants.',
              'একটি স্বীকৃত Bachelor\'s degree diploma আর transcript (EU/EEA-র বাইরের degree-র জন্য legalised আর অনুবাদিত), programme-এর নিজস্ব English (বা অন্য ভাষার) proficiency শর্ত, আর Bangladeshi আবেদনকারীদের জন্য প্রতিটি degree level-এ প্রযোজ্য ভারতে Latvia-র Embassy-তে একই "additional assessment" residence-permit আর D-visa process।',
            ),
          ],
          [LV_UL_DEGREE_STUDIES],
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
              'The same per-university intakes as Bachelor’s level apply — UL via apply.lu.lv, RTU via apply.rtu.lv (Autumn and Spring intakes, per-programme deadlines), RSU by semester. UL’s own degree-studies page additionally notes that most of its Master’s by Research programmes have more than one entry point and can be applied to at any time, with a research proposal as part of the process.',
              'Bachelor\'s level-এর মতোই একই প্রতি-university intake প্রযোজ্য — UL apply.lu.lv-এর মাধ্যমে, RTU apply.rtu.lv-এর মাধ্যমে (Autumn আর Spring intake, প্রতি-programme deadline), RSU semester অনুযায়ী। UL-এর নিজের degree-studies page অতিরিক্তভাবে উল্লেখ করে এর অধিকাংশ Master\'s by Research programme-এর একাধিক entry point আছে আর যেকোনো সময় আবেদন করা যায়, process-এর অংশ হিসেবে একটি research proposal সহ।',
            ),
          ],
          [LV_UL_DEGREE_STUDIES, LV_RTU_APPLY_PROGRAMMES, LV_RSU_TUITION],
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
              'UL’s own Language Proficiency page accepts the same general test list as for Bachelor’s (IELTS 6.0 overall, TOEFL iBT 80/4, CAE/CPE any level, PTE Academic 55, among others) for most Master’s programmes, except its own "English Studies" Master’s, which instead requires IELTS 7, TOEFL iBT 100/5, or a C1-level equivalent on the other accepted tests.',
              'UL-এর নিজের Language Proficiency page অধিকাংশ Master\'s programme-এর জন্য Bachelor\'s-এর মতোই একই সাধারণ test তালিকা গ্রহণ করে (IELTS 6.0 overall, TOEFL iBT 80/4, CAE/CPE কোনো level, PTE Academic 55, এর মধ্যে আরও), এর নিজের "English Studies" Master\'s ছাড়া, যার জন্য এর বদলে IELTS 7, TOEFL iBT 100/5, বা অন্য গ্রহণযোগ্য test-এ একটি C1-level সমতুল্য লাগে।',
            ),
          ],
          [LV_UL_LANGUAGE],
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
          b('How much is a Master’s in Latvia?', 'Latvia-এ Master\'s-এ খরচ কত?'),
          [
            b(
              'RTU’s own portal lists English-taught Master’s programmes from EUR 5,650/year (Business Informatics) to EUR 9,300/year (Architecture), with its Riga Business School MBA/EMBA for non-EU/EEA applicants at EUR 20,400/EUR 33,000 for the whole programme. RSU’s own tuition page sets English-taught Master’s programmes at EUR 3,400–5,000/year. UL’s own programme-specific fees were not itemized for every English-taught Master’s programme on the pages read for this guide — check the specific course page.',
              'RTU-র নিজের portal English-taught Master\'s programme বছরে EUR 5,650 (Business Informatics) থেকে বছরে EUR 9,300 (Architecture) পর্যন্ত তালিকাভুক্ত করে, এর Riga Business School-এর non-EU/EEA আবেদনকারীদের জন্য MBA/EMBA সম্পূর্ণ programme-এর জন্য EUR 20,400/EUR 33,000। RSU-র নিজের tuition page English-taught Master\'s programme-কে বছরে EUR 3,400–5,000 ঠিক করে। UL-এর নিজস্ব programme-নির্দিষ্ট fee এই guide-এর জন্য পড়া page-এ প্রতিটি English-taught Master\'s programme-এর জন্য তালিকাভুক্ত হয়নি — নির্দিষ্ট course page চেক করুন।',
            ),
            CHECK_UNI,
          ],
          [LV_RTU_APPLY_PROGRAMMES, LV_RSU_TUITION],
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
  card: b('Doctoral tuition from EUR 6,000–20,000/year (RSU) · full-time PhD students may work with no hour restriction · same residence-permit + extension rights as Master’s', 'Doctoral tuition বছরে EUR 6,000–20,000 (RSU) থেকে শুরু · full-time PhD student কোনো ঘণ্টার সীমা ছাড়াই কাজ করতে পারে · Master\'s-এর মতোই একই residence-permit + extension অধিকার'),
  intro: b(
    'A PhD is pursued directly through the chosen university’s own doctoral programme. RSU’s own tuition page sets its Doctoral programmes at EUR 6,000/year (Social Sciences) to EUR 20,000/year (Health Care); RTU’s and UL’s own doctoral fee schedules were not itemized for every field on the pages read for this guide, though UL’s own degree-studies page notes that most Doctoral Degrees have more than one entry point and can be applied to year-round, with a research proposal and, for UL, an entrance examination plus interview as part of the application. Like Master’s students, a full-time PhD student may work with no hour restriction, per Study in Latvia’s own FAQ, and the "study period + 4 months, extendable by 9 more months" residence-permit rule applies at this level too. The same "additional assessment" visa process for Bangladesh — residence permit and D visa applied for in person at the Embassy of Latvia in India — applies to PhD applicants as well. No PhD scholarship for Bangladeshi applicants was confirmed from the pages read for this guide.',
    'একটি PhD সরাসরি বাছাই করা university-র নিজের doctoral programme-এর মাধ্যমে করা হয়। RSU-র নিজের tuition page এর Doctoral programme-কে বছরে EUR 6,000 (Social Sciences) থেকে বছরে EUR 20,000 (Health Care) ঠিক করে; RTU আর UL-এর নিজস্ব doctoral fee schedule এই guide-এর জন্য পড়া page-এ প্রতিটি field-এর জন্য তালিকাভুক্ত হয়নি, যদিও UL-এর নিজের degree-studies page উল্লেখ করে এর অধিকাংশ Doctoral Degree-র একাধিক entry point আছে আর বছরজুড়ে আবেদন করা যায়, application-এর অংশ হিসেবে একটি research proposal আর, UL-এর জন্য, একটি entrance examination সঙ্গে interview সহ। Master\'s student-দের মতোই, Study in Latvia-র নিজের FAQ অনুযায়ী, একজন full-time PhD student কোনো ঘণ্টার সীমা ছাড়াই কাজ করতে পারে, আর "পড়াশোনার সময় + 4 মাস, আরও 9 মাস বাড়ানো যায়" residence-permit নিয়ম এই level-এও প্রযোজ্য। Bangladesh-এর জন্য একই "additional assessment" visa process — residence permit আর D visa ভারতে Latvia-র Embassy-তে সশরীরে আবেদন — PhD আবেদনকারীদের জন্যও প্রযোজ্য। এই guide-এর জন্য পড়া page থেকে Bangladeshi আবেদনকারীদের জন্য কোনো PhD scholarship নিশ্চিত হয়নি।',
  ),
  costs: { official: [RSU_TUITION_EXAMPLE], estimates: [] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Latvia?', 'Latvia-এ কীভাবে PhD পাওয়া যায়?'),
          [
            b(
              'Apply directly through the chosen university’s own doctoral school/programme. UL’s own degree-studies page states PhD applicants must submit two Bachelor’s diplomas and a Master’s degree diploma (original language plus notarised English translation), a 3–5 page dissertation justification/framework, and a completed CV form, after which successful applicants are invited to an online interview following an entrance examination. Exact supervisor/faculty-level requirements at RTU and RSU were not itemized nationally on the pages read for this guide — check each doctoral school directly for your field.',
              'সরাসরি বাছাই করা university-র নিজের doctoral school/programme-এর মাধ্যমে আবেদন করুন। UL-এর নিজের degree-studies page বলে PhD আবেদনকারীদের দুটি Bachelor\'s diploma আর একটি Master\'s degree diploma (মূল ভাষায় সঙ্গে notarised English translation), একটি 3–5 পাতার dissertation justification/framework, আর একটি সম্পন্ন CV form জমা দিতে হয়, যার পর সফল আবেদনকারীদের একটি entrance examination-এর পর একটি online interview-এ আমন্ত্রণ জানানো হয়। RTU আর RSU-র সঠিক supervisor/faculty-level শর্ত এই guide-এর জন্য পড়া page-এ জাতীয়ভাবে তালিকাভুক্ত হয়নি — আপনার field-এর জন্য সরাসরি প্রতিটি doctoral school চেক করুন।',
            ),
            CHECK_UNI,
          ],
          [LV_UL_DEGREE_STUDIES],
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
              'UL’s own Language Proficiency page applies the same general test minimum used for most Master’s programmes (e.g. IELTS 6.0 overall) to PhD applicants too, taken within the last 5 years, unless previous education was completed in English in a short named list of countries (not including Bangladesh).',
              'UL-এর নিজের Language Proficiency page অধিকাংশ Master\'s programme-এ ব্যবহৃত একই সাধারণ test ন্যূনতম (যেমন IELTS 6.0 overall) PhD আবেদনকারীদের জন্যও প্রযোজ্য করে, গত 5 বছরের মধ্যে নেওয়া, যদি না আগের শিক্ষা একটি সংক্ষিপ্ত তালিকাভুক্ত দেশে (যাতে Bangladesh নেই) English-এ সম্পন্ন হয়ে থাকে।',
            ),
          ],
          [LV_UL_LANGUAGE],
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
              'RSU’s own tuition page sets Doctoral programmes at EUR 6,000/year (Social Sciences) to EUR 20,000/year (Health Care). No general, upfront scholarship or funded doctoral position for Bangladeshi applicants was confirmed on the pages read for this guide at any of the three universities — the Latvian state scholarship’s own 39 eligible countries do not include Bangladesh.',
              'RSU-র নিজের tuition page Doctoral programme-কে বছরে EUR 6,000 (Social Sciences) থেকে বছরে EUR 20,000 (Health Care) ঠিক করে। এই guide-এর জন্য পড়া page-এ তিনটি university-র কোনোটিতেই Bangladeshi আবেদনকারীদের জন্য কোনো সাধারণ, আগাম scholarship বা funded doctoral position নিশ্চিত হয়নি — Latvian state scholarship-এর নিজের 39টি যোগ্য দেশে Bangladesh নেই।',
            ),
          ],
          [LV_RSU_TUITION, LV_STUDYINLATVIA_ELIGIBLE_COUNTRIES],
          { status: 'verified' },
        ),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ the country

export const LV_GUIDE: CountryGuide = {
  code: 'LV',
  checkedAt: LV_READ,
  sourcesPerSection: true,
  intro: b(
    'Latvia is an EU/Schengen member, but Bangladesh is specifically named on Latvia’s own official lists as one of the countries needing "additional assessment" before a visa or residence permit is issued (per the Ministry of Foreign Affairs’ own Embassy of Latvia in India page and the University of Latvia’s own visa page). This means a Bangladeshi applicant cannot sort out the residence permit inside Latvia the way some other nationalities can: the residence permit, and then the long-stay (D) visa, must both be applied for in person at the Embassy of Latvia in India, which has territorial consular competence for Bangladesh. PMLP (Pilsonības un migrācijas lietu pārvalde, the Office of Citizenship and Migration Affairs) is Latvia’s own residence-permit authority. The two official pages read for this guide disagree on the required monthly subsistence amount (PMLP’s general-education page: EUR 500/month; the University of Latvia’s own degree-level visa page: at least EUR 780/month), so both figures are shown rather than one being chosen. Work rights differ sharply by degree level: a full-time Bachelor’s student may work up to 20 hours/week part-time (40 hours/week during holidays), while a full-time Master’s or doctoral student may work with no hour restriction, per Study in Latvia’s own FAQ. The residence permit normally covers the study period plus 4 months after graduation, with Master’s/doctoral graduates able to request a further 9-month extension to look for work. Riga Technical University (RTU) is Latvia’s highest-ranked university in the QS World University Rankings 2027 (751-760), followed by the University of Latvia (UL, 781-790) and Rīga Stradiņš University (RSU, 1001-1200, known internationally for English-medium Medicine and Dentistry). Tuition is set per programme by each university — UL’s own "Law" programme is EUR 3,700/year for non-EU citizens; RTU’s own portal lists English-taught programmes from EUR 4,030/year; RSU’s own tuition page sets Medicine at EUR 13,500/year and Dentistry at EUR 15,500/year. The Latvian state scholarship, Latvia’s main national scholarship, is open only to citizens of 39 named countries under bilateral education agreements — Bangladesh is not one of them, so no scholarship for Bangladeshi applicants was found. This guide is built from PMLP (pmlp.gov.lv), the Ministry of Foreign Affairs’ Embassy of Latvia in India page, and the official pages of the University of Latvia, RTU and RSU, cross-checked against Study in Latvia, the national promotion portal.',
    'Latvia EU/Schengen সদস্য, কিন্তু Bangladesh Latvia-র নিজের official তালিকায় নির্দিষ্টভাবে সেই দেশগুলোর মধ্যে একটি যাদের visa বা residence permit দেওয়ার আগে "additional assessment" লাগে (Ministry of Foreign Affairs-এর নিজের ভারতে Latvia-র Embassy page আর University of Latvia-র নিজের visa page অনুযায়ী)। এর মানে একজন Bangladeshi আবেদনকারী Latvia-র ভেতরে residence permit ঠিক করতে পারে না, যেমন অন্য কিছু জাতীয়তা করতে পারে: residence permit, তারপর দীর্ঘমেয়াদী (D) visa, দুটোই ভারতে Latvia-র Embassy-তে সশরীরে আবেদন করতে হয়, যার Bangladesh-এর জন্য territorial consular competence আছে। PMLP (Pilsonības un migrācijas lietu pārvalde, Office of Citizenship and Migration Affairs) Latvia-র নিজের residence-permit authority। এই guide-এর জন্য পড়া দুটি official page প্রয়োজনীয় মাসিক subsistence পরিমাণে একমত না (PMLP-র general-education page: EUR 500/মাস; University of Latvia-র নিজের degree-level visa page: অন্তত EUR 780/মাস), তাই একটি বেছে না নিয়ে দুটি সংখ্যাই দেখানো হয়েছে। কাজের অধিকার degree level অনুযায়ী তীব্রভাবে আলাদা: একজন full-time Bachelor\'s student সপ্তাহে 20 ঘণ্টা পর্যন্ত part-time (ছুটিতে সপ্তাহে 40 ঘণ্টা) কাজ করতে পারে, যখন একজন full-time Master\'s বা doctoral student Study in Latvia-র নিজের FAQ অনুযায়ী কোনো ঘণ্টার সীমা ছাড়াই কাজ করতে পারে। Residence permit সাধারণত পড়াশোনার সময় সাথে গ্র্যাজুয়েশনের পর 4 মাস কভার করে, Master\'s/doctoral গ্র্যাজুয়েটরা চাকরি খোঁজার জন্য আরও একটি 9-মাসের extension চাইতে পারে। Riga Technical University (RTU) QS World University Rankings 2027-এ (751-760) Latvia-র সর্বোচ্চ rank পাওয়া university, তারপর University of Latvia (UL, 781-790) আর Rīga Stradiņš University (RSU, 1001-1200, আন্তর্জাতিকভাবে English-medium Medicine আর Dentistry-র জন্য পরিচিত)। Tuition প্রতি university-তে প্রতি programme অনুযায়ী ঠিক হয় — UL-এর নিজের "Law" programme non-EU নাগরিকদের জন্য বছরে EUR 3,700; RTU-র নিজের portal English-taught programme বছরে EUR 4,030 থেকে তালিকাভুক্ত করে; RSU-র নিজের tuition page Medicine-কে বছরে EUR 13,500 আর Dentistry-কে বছরে EUR 15,500 ঠিক করে। Latvian state scholarship, Latvia-র মূল জাতীয় scholarship, শুধু bilateral education agreement-এর অধীনে নামিত 39টি দেশের নাগরিকদের জন্য খোলা — Bangladesh তার মধ্যে নেই, তাই Bangladeshi আবেদনকারীদের জন্য কোনো scholarship পাওয়া যায়নি। এই guide PMLP (pmlp.gov.lv), Ministry of Foreign Affairs-এর ভারতে Latvia-র Embassy page, আর University of Latvia, RTU, RSU-র official page থেকে তৈরি, Study in Latvia, জাতীয় promotion portal-এর বিরুদ্ধে cross-check করা।',
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [LV_MFA_BANGLADESH, LV_UL_VISAS, LV_STUDYINLATVIA_SCHOLARSHIPS],
      {
        kind: 'guidance',
        list: [
          b('Assuming you can sort out the residence permit after arriving in Latvia — the University of Latvia’s own visa page lists Bangladesh among the "additional assessment" countries that must apply for the residence permit and visa in person at the Embassy of Latvia in India, before travelling.', 'ধরে নেওয়া যে Latvia-এ পৌঁছানোর পর residence permit ঠিক করা যায় — University of Latvia-র নিজের visa page Bangladesh-কে সেই "additional assessment" দেশগুলোর তালিকায় রাখে যাদের যাওয়ার আগে ভারতে Latvia-র Embassy-তে সশরীরে residence permit আর visa-র জন্য আবেদন করতে হয়।'),
          b('Assuming one subsistence figure applies everywhere — official pages give two different monthly amounts (EUR 500 for general education, EUR 780 for university-level study), so confirm the correct one with your specific university.', 'ধরে নেওয়া যে একটি subsistence সংখ্যা সবখানে প্রযোজ্য — official page দুটি আলাদা মাসিক পরিমাণ দেয় (general education-এর জন্য EUR 500, university-level study-র জন্য EUR 780), তাই আপনার নির্দিষ্ট university-র সাথে সঠিকটি নিশ্চিত করুন।'),
          b('Assuming work rights are the same at every degree level — Bachelor’s students are capped at 20 hours/week part-time, while Master’s and doctoral students may work with no hour restriction at all, per Study in Latvia’s own FAQ.', 'ধরে নেওয়া যে কাজের অধিকার সব degree level-এ একই — Bachelor\'s student সপ্তাহে 20 ঘণ্টা part-time-এ সীমিত, যখন Master\'s আর doctoral student Study in Latvia-র নিজের FAQ অনুযায়ী কোনো ঘণ্টার সীমা ছাড়াই কাজ করতে পারে।'),
          b('Assuming the Latvian state scholarship covers Bangladesh because it is described as open to "30+ countries" — Study in Latvia’s own official list names exactly 39 eligible countries, and Bangladesh is not one of them.', 'ধরে নেওয়া যে Latvian state scholarship Bangladesh কভার করে কারণ এটা "30+ দেশের" জন্য খোলা বলে বর্ণিত — Study in Latvia-র নিজের official তালিকা ঠিক 39টি যোগ্য দেশের নাম দেয়, আর Bangladesh তার মধ্যে নেই।'),
          b('Assuming the post-graduation residence-permit extension applies to everyone — only Master’s and doctoral graduates can request the extra 9-month job-search extension; Bachelor’s graduates get only the automatic 4 months.', 'ধরে নেওয়া যে গ্র্যাজুয়েশনের পর residence-permit extension সবার জন্য প্রযোজ্য — শুধু Master\'s আর doctoral গ্র্যাজুয়েটরা অতিরিক্ত 9-মাসের job-search extension চাইতে পারে; Bachelor\'s গ্র্যাজুয়েটরা শুধু স্বয়ংক্রিয় 4 মাস পায়।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b('What do you need to study a Bachelor’s in Latvia from Bangladesh?', 'Bangladesh থেকে Latvia-এ Bachelor\'s পড়তে কী কী লাগে?'), [b('A recognised secondary-school diploma, an institution offer, English-proficiency proof where required, and the full "additional assessment" residence-permit and D-visa process at the Embassy of Latvia in India.', 'একটি স্বীকৃত secondary-school diploma, একটি institution offer, প্রয়োজনে English-proficiency proof, আর ভারতে Latvia-র Embassy-তে পূর্ণ "additional assessment" residence-permit আর D-visa process।')], [LV_UL_DEGREE_STUDIES], { status: 'verified' }),
    qa('additional-assessment', b('What does "additional assessment" mean for Bangladeshi applicants?', 'Bangladeshi আবেদনকারীদের জন্য "additional assessment"-এর মানে কী?'), [b('Bangladesh is one of around 30 countries Latvia names as needing extra scrutiny before a visa or residence permit is granted; the university cannot handle this on the student’s behalf the way it can for EU or visa-free-country applicants — the student applies in person at the Embassy of Latvia in India, both for the residence permit and, once PMLP approves it, the D visa.', 'Bangladesh সেই প্রায় 30টি দেশের একটি যাদের visa বা residence permit দেওয়ার আগে বেশি যাচাই প্রয়োজন বলে Latvia নাম দেয়; EU বা visa-free-country আবেদনকারীদের জন্য যেভাবে করতে পারে সেভাবে university student-এর পক্ষে এটা করতে পারে না — student ভারতে Latvia-র Embassy-তে সশরীরে আবেদন করে, residence permit আর, PMLP অনুমোদনের পর, D visa দুটোর জন্যই।')], [LV_UL_VISAS, LV_MFA_BANGLADESH], { status: 'verified' }),
    qa('cost', b('How much does it cost to study in Latvia?', 'Latvia-এ পড়াশোনার খরচ কত?'), [b('Set per institution and programme. Study in Latvia’s own FAQ gives a national range of under EUR 1,600/year to EUR 15,000/year (EUR 25,600/year for an Executive MBA); UL’s "Law" is EUR 3,700/year (non-EU), RTU’s English-taught programmes run EUR 4,030–9,300/year, and RSU’s Medicine/Dentistry are EUR 13,500/15,500 per year.', 'Institution আর programme অনুযায়ী ঠিক হয়। Study in Latvia-র নিজের FAQ বছরে EUR 1,600-এর কম থেকে EUR 15,000 (Executive MBA-র জন্য বছরে EUR 25,600) পর্যন্ত একটি জাতীয় range দেয়; UL-এর "Law" বছরে EUR 3,700 (non-EU), RTU-র English-taught programme বছরে EUR 4,030–9,300, আর RSU-র Medicine/Dentistry বছরে EUR 13,500/15,500।')], [LV_STUDYINLATVIA_FEES, LV_UL_LAW_PROGRAMME, LV_RTU_APPLY_PROGRAMMES, LV_RSU_TUITION], { status: 'verified' }),
    qa('ielts', b('How much IELTS do you need for Latvia?', 'Latvia-এ IELTS কত লাগে?'), [b('UL’s own Language Proficiency page sets IELTS 6.0 overall for most Bachelor’s/Master’s/PhD programmes, or 7 for its "English Studies" Master’s; RTU’s and RSU’s own specific minimums were not itemized on the pages read for this guide.', 'UL-এর নিজের Language Proficiency page অধিকাংশ Bachelor\'s/Master\'s/PhD programme-এর জন্য IELTS 6.0 overall ঠিক করে, বা এর "English Studies" Master\'s-এর জন্য 7; RTU আর RSU-র নিজস্ব নির্দিষ্ট ন্যূনতম এই guide-এর জন্য পড়া page-এ তালিকাভুক্ত হয়নি।')], [LV_UL_LANGUAGE], { status: 'verified' }),
    qa('visa', b('What do you need for the visa and residence permit?', 'Visa আর residence permit-এর জন্য কী কী লাগে?'), [b('As an "additional assessment" country: an invitation approved by PMLP, then an in-person application at the Embassy of Latvia in India with your passport, study agreement, proof of funds, police-clearance certificate, accommodation proof, AIC education-recognition decision, and the state duty payment (EUR 160–560 depending on processing speed).', '"Additional assessment" দেশ হিসেবে: PMLP-অনুমোদিত একটি invitation, তারপর ভারতে Latvia-র Embassy-তে সশরীরে একটি application, আপনার passport, study agreement, funds-এর proof, police-clearance certificate, accommodation-এর proof, AIC education-recognition decision, আর state duty payment (processing speed অনুযায়ী EUR 160–560) সহ।')], [LV_UL_VISAS]),
    qa('work', b('Can you work while studying in Latvia?', 'Latvia-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b('Yes: Bachelor’s students up to 20 hours/week part-time (40 during holidays); Master’s and doctoral students with no hour restriction at all, per Study in Latvia’s own FAQ.', 'হ্যাঁ: Bachelor\'s student সপ্তাহে 20 ঘণ্টা পর্যন্ত part-time (ছুটিতে 40); Master\'s আর doctoral student কোনো ঘণ্টার সীমা ছাড়াই, Study in Latvia-র নিজের FAQ অনুযায়ী।')], [LV_STUDYINLATVIA_WORK], { status: 'verified' }),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('Not verified yet as currently open to Bangladeshi applicants: the Latvian state scholarship’s own list of 39 eligible countries, granted under bilateral education agreements, does not include Bangladesh, and no university-specific scholarship for Bangladeshi applicants was found.', 'যাচাই হয়নি এখনো বাংলাদেশি আবেদনকারীদের জন্য বর্তমানে খোলা কিনা: bilateral education agreement-এর অধীনে দেওয়া Latvian state scholarship-এর নিজের 39টি যোগ্য দেশের তালিকায় Bangladesh নেই, আর Bangladeshi আবেদনকারীদের জন্য কোনো university-নির্দিষ্ট scholarship পাওয়া যায়নি।')], [LV_STUDYINLATVIA_SCHOLARSHIPS, LV_STUDYINLATVIA_ELIGIBLE_COUNTRIES], { status: 'not-verified' }),
    qa('after', b('Can you stay in Latvia after graduating?', 'পড়া শেষে Latvia-এ থাকা যায়?'), [b('Yes: the residence permit runs for the study period plus 4 months after graduation for every degree level; Master’s and doctoral graduates can additionally request a 9-month job-search extension, not guaranteed, requested before the current permit expires.', 'হ্যাঁ: প্রতিটি degree level-এর জন্য residence permit পড়াশোনার সময় সাথে গ্র্যাজুয়েশনের পর 4 মাস পর্যন্ত চলে; Master\'s আর doctoral গ্র্যাজুয়েটরা অতিরিক্তভাবে একটি 9-মাসের job-search extension চাইতে পারে, নিশ্চিত না, বর্তমান permit-এর মেয়াদ শেষ হওয়ার আগে চাওয়া লাগে।')], [LV_STUDYINLATVIA_VISA]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('Official pages disagree: PMLP’s general-education page says EUR 500/month; the University of Latvia’s own degree-level visa page says at least EUR 780/month. Confirm the correct figure for your level of study directly with your university or PMLP.', 'Official page একমত না: PMLP-র general-education page বলে EUR 500/মাস; University of Latvia-র নিজের degree-level visa page বলে অন্তত EUR 780/মাস। আপনার পড়াশোনার level-এর জন্য সঠিক সংখ্যা সরাসরি আপনার university বা PMLP-র সাথে নিশ্চিত করুন।')], [LV_PMLP_GENERAL_EDU_DOCS, LV_UL_VISAS], { status: 'needs-review' }),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Passport, invitation document, study agreement, proof of funds, police-clearance certificate, proof of accommodation, AIC education-recognition decision, the state duty payment, and — for Master’s/doctoral graduates — the post-graduation extension application.', 'Passport, invitation document, study agreement, funds-এর proof, police-clearance certificate, accommodation-এর proof, AIC education-recognition decision, state duty payment, আর — Master\'s/doctoral গ্র্যাজুয়েটদের জন্য — গ্র্যাজুয়েশনের পরের extension application।')], [LV_UL_VISAS]),
    qa('masters', b('What do you need for a Master’s?', 'Master\'s-এ কী লাগে?'), [b('A recognised Bachelor’s diploma, the programme’s own English requirement, and the same "additional assessment" visa process. Full-time Master’s students may work with no hour restriction, unlike Bachelor’s students.', 'একটি স্বীকৃত Bachelor\'s diploma, programme-এর নিজস্ব English শর্ত, আর একই "additional assessment" visa process। Bachelor\'s student-দের মতো না, full-time Master\'s student কোনো ঘণ্টার সীমা ছাড়াই কাজ করতে পারে।')], [LV_UL_DEGREE_STUDIES, LV_STUDYINLATVIA_WORK]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Direct application to the chosen university’s own doctoral school, with a research proposal (and, at UL, an entrance examination plus interview). RSU’s own doctoral tuition runs EUR 6,000–20,000/year; no funded position for Bangladeshi applicants was confirmed.', 'বাছাই করা university-র নিজের doctoral school-এ সরাসরি আবেদন, একটি research proposal সহ (আর, UL-এ, একটি entrance examination সঙ্গে interview)। RSU-র নিজের doctoral tuition বছরে EUR 6,000–20,000 চলে; Bangladeshi আবেদনকারীদের জন্য কোনো funded position নিশ্চিত হয়নি।')], [LV_UL_DEGREE_STUDIES, LV_RSU_TUITION]),
    qa('universities', b('Which institutions are there?', 'কোন কোন institution আছে?'), [b('Three examples on each degree page — the University of Latvia (UL), Riga Technical University (RTU) and Rīga Stradiņš University (RSU) — listed alphabetically by code, not ordered by quality.', 'প্রতিটি degree page-এ তিনটি উদাহরণ — University of Latvia (UL), Riga Technical University (RTU), আর Rīga Stradiņš University (RSU) — কোড অনুযায়ী বর্ণানুক্রমে, মান অনুযায়ী নয়।')], [LV_STUDYINLATVIA_FEES]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: both the University of Latvia’s own visa page and the Ministry of Foreign Affairs’ own Embassy of Latvia in India page confirm Bangladesh needs "additional assessment," applying for the residence permit and D visa in person at the Embassy of Latvia in India, and that the Latvian state scholarship’s 39 eligible countries do not include Bangladesh. Not found on official pages read for this guide: a Bangladesh-specific visa/permit approval rate, and a single, reconciled monthly-subsistence figure (two official pages give EUR 500 and EUR 780) — these are stated plainly as not confirmed, rather than guessed.', 'Bangladesh-এর জন্য যাচাই করা: University of Latvia-র নিজের visa page আর Ministry of Foreign Affairs-এর নিজের ভারতে Latvia-র Embassy page দুটোই নিশ্চিত করে Bangladesh-এর "additional assessment" লাগে, ভারতে Latvia-র Embassy-তে সশরীরে residence permit আর D visa-র জন্য আবেদন, আর Latvian state scholarship-এর 39টি যোগ্য দেশে Bangladesh নেই। এই guide-এর জন্য পড়া official page-এ পাওয়া যায়নি: একটি Bangladesh-specific visa/permit অনুমোদনের হার, আর একটি একক, মেলানো মাসিক-subsistence সংখ্যা (দুটি official page EUR 500 আর EUR 780 দেয়) — এগুলো অনুমান না করে সরাসরি নিশ্চিত না বলে বলা হয়েছে।'),
    ], [LV_UL_VISAS, LV_MFA_BANGLADESH, LV_STUDYINLATVIA_ELIGIBLE_COUNTRIES], { status: 'verified' }),
  ],
  life: [
    qa('arrival', b('What happens when you arrive?', 'পৌঁছানোর পর কী হয়?'), [b('Having already received the D visa at the Embassy of Latvia in India, you travel to Latvia, register your place of residence, and (per the University of Latvia’s own admissions page) visit the International Students Unit to collect your student card and residence-permit card from PMLP, then your faculty for orientation and course registration.', 'ভারতে Latvia-র Embassy-তে D visa পাওয়ার পর, আপনি Latvia-এ যান, আপনার থাকার জায়গা register করেন, আর (University of Latvia-র নিজের admissions page অনুযায়ী) আপনার student card আর PMLP থেকে residence-permit card সংগ্রহ করতে International Students Unit-এ যান, তারপর orientation আর course registration-এর জন্য আপনার faculty-তে।')], [LV_UL_DEGREE_STUDIES]),
  ],
  documents: LV_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'funds-to-show', kind: 'fact', status: 'needs-review', source: LV_UL_VISAS },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { min: 0, max: 20, unit: 'hours/week part-time for Bachelor’s (40 hrs/week during holidays); no restriction for Master’s/PhD', text: b('Bachelor’s students: up to 20 hours/week part-time (40 during holidays). Master’s and doctoral students: no hour restriction at all.', 'Bachelor\'s student: সপ্তাহে 20 ঘণ্টা পর্যন্ত part-time (ছুটিতে 40)। Master\'s আর doctoral student: কোনো ঘণ্টার সীমা নেই।') }, source: LV_STUDYINLATVIA_WORK },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { min: 4, max: 13, unit: 'months (4 automatic after graduation; Master’s/PhD may request a further 9, not guaranteed)', text: b('4 months automatically after graduation at every degree level; Master’s and doctoral graduates may additionally request a 9-month job-search extension, not guaranteed.', 'প্রতিটি degree level-এ গ্র্যাজুয়েশনের পর স্বয়ংক্রিয়ভাবে 4 মাস; Master\'s আর doctoral গ্র্যাজুয়েটরা অতিরিক্তভাবে একটি 9-মাসের job-search extension চাইতে পারে, নিশ্চিত না।') }, source: LV_STUDYINLATVIA_VISA },
    { id: 'public-tuition', kind: 'estimate', status: 'verified', value: { min: 1600, max: 15000, unit: 'EUR/year (Study in Latvia’s own national planning range, excluding the Executive MBA outlier)', text: b('Roughly EUR 1,600–15,000/year across Latvian institutions, depending on the programme — a national range, not a single university’s figure.', 'Latvian institution জুড়ে প্রায় EUR 1,600–15,000/বছর, programme অনুযায়ী — একটি জাতীয় range, একটি university-র সংখ্যা না।') }, source: LV_STUDYINLATVIA_FEES },
  ],
};

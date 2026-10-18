import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  DK_AAU_FINANCE_FEES,
  DK_AU_DEADLINES,
  DK_AU_TUITION,
  DK_CBS_BACHELOR_ADMISSION,
  DK_CBS_MASTERS_ADMISSION,
  DK_DTU_DEADLINES,
  DK_DTU_ENGLISH,
  DK_DTU_FEES,
  DK_KU_BACHELOR,
  DK_KU_MASTERS_DEADLINES,
  DK_KU_SCHOLARSHIPS,
  DK_KU_TUITION,
  DK_LIFEINDENMARK_ARRIVE,
  DK_READ,
  DK_SID_SCHOLARSHIPS,
  DK_SID_TUITION,
  DK_SIRI_ACCOMPANYING_FAMILY,
  DK_SIRI_HIGHER_ED,
  DK_SIRI_NEW_RULES_2026,
  DK_SIRI_STUDY,
  DK_UM_BANGLADESH,
  DK_UM_BANGLADESH_VISA,
} from './dk-sources';

/**
 * Denmark reading guide, researched on its own from Danish official
 * sources (New to Denmark / nyidanmark.dk — run by SIRI, the Danish Agency
 * for International Recruitment and Integration, under the Ministry of
 * Immigration and Integration — for the residence permit, work rights and
 * post-study job-seeking permit; the official "Study in Denmark" portal,
 * studyindenmark.dk, for tuition ranges and scholarships; the Danish
 * Ministry of Foreign Affairs' own Bangladesh mission page, um.dk; and
 * university pages). Nothing is taken from another country's guide.
 * Denmark IS an EU/EEA and full Schengen member — but a Bangladeshi
 * applicant is still a "third-country national" under Danish immigration
 * law, so Denmark's own national rules (not an EU-wide rule borrowed from
 * another member state's guide) apply throughout. Amounts stay in DKK/EUR,
 * the sources' own currencies, and are never converted into each other
 * beyond what the source itself states. It covers Bachelor's, Master's and
 * PhD study for Bangladeshi (non-EU/EEA) students.
 *
 * Important: SIRI's own 30 September 2026 notice (read for this guide on
 * 2026-10-18, i.e. after the change took effect) states that new rules for
 * third-country students took effect on 1 October 2026. This guide is
 * written for an applicant applying ON OR AFTER that date — the rule that
 * applies going forward — and says plainly where the pre-1-October-2026
 * rule (which still governs anyone who already applied before that date)
 * was different.
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
  'The University of Copenhagen, DTU, Aarhus University, Copenhagen Business School and Aalborg University are not identical: each Danish public university sets its own tuition-fee rates per programme, its own application deadlines and its own admission requirements. Always check the exact programme on the institution’s own admissions page.',
  'University of Copenhagen, DTU, Aarhus University, Copenhagen Business School, আর Aalborg University একরকম না: প্রতিটি Danish public university প্রতি programme-এর জন্য নিজের tuition-fee rate, নিজের application deadline, আর নিজের ভর্তির শর্ত ঠিক করে। সবসময় প্রতিষ্ঠানের নিজের admissions page-এ সঠিক programme দেখে নিন।',
);

const EU_NOTE = b(
  'Denmark is an EU/EEA member and a full Schengen member — but Bangladesh is not an EU/EEA country, so a Bangladeshi applicant is still a "third-country national" under Danish immigration law and needs Denmark’s own residence (and work) permit as a student, applied for through SIRI, not a simplified EU-citizen process.',
  'Denmark EU/EEA-র সদস্য আর একটি পূর্ণ Schengen সদস্য — কিন্তু Bangladesh EU/EEA দেশ না, তাই একজন Bangladeshi আবেদনকারী Danish immigration আইনের অধীনে এখনো একজন "third-country national", আর তার SIRI-এর মাধ্যমে আবেদন করা Denmark-এর নিজের student residence (আর work) permit লাগে, কোনো সহজ EU-নাগরিক process না।',
);

const POST_1_OCT_NOTE = b(
  'SIRI’s own 30 September 2026 notice states new rules took effect on 1 October 2026: the date your application is submitted (not the date a decision is made) decides which rules apply to you. This guide describes the rule for applications submitted on or after 1 October 2026.',
  'SIRI-এর নিজের 30 September 2026-এর notice বলে নতুন নিয়ম 1 October 2026 থেকে কার্যকর হয়েছে: আপনার application জমা দেওয়ার তারিখ (সিদ্ধান্তের তারিখ না) ঠিক করে কোন নিয়ম আপনার জন্য প্রযোজ্য। এই guide 1 October 2026 বা তারপর জমা দেওয়া application-এর জন্য নিয়ম বর্ণনা করে।',
);

// ------------------------------------------------------------------ shared answers

const visaRequired = (id: string) =>
  qa(
    id,
    b('Does a Bangladeshi student need a residence permit to study in Denmark?', 'Bangladesh-এর student-দের Denmark-এ পড়তে residence permit লাগে কি?'),
    [
      b(
        'Yes. SIRI’s own page states that if you have been admitted to a higher educational programme in Denmark — an academy profession, professional bachelor’s, bachelor’s, part-time master’s or master’s degree programme, including an Erasmus Mundus, Erasmus+ or Nordic Master joint programme with a Danish degree — you can be granted a residence and work permit as a student, applied for through SIRI (the Danish Agency for International Recruitment and Integration). You must be studying full-time; a permit cannot be granted to study part-time.',
        'হ্যাঁ। SIRI-এর নিজের page বলে, আপনি যদি Denmark-এ একটি higher educational programme-এ ভর্তি হয়ে থাকেন — একটি academy profession, professional bachelor\'s, bachelor\'s, part-time master\'s, বা master\'s degree programme, Erasmus Mundus, Erasmus+, বা Nordic Master joint programme সহ যা Danish degree দেয় — তাহলে আপনি SIRI (Danish Agency for International Recruitment and Integration)-এর মাধ্যমে আবেদন করা একটি student residence আর work permit পেতে পারেন। আপনাকে পূর্ণ-কালীন পড়তে হবে; part-time পড়ার জন্য permit দেওয়া হয় না।',
      ),
      EU_NOTE,
    ],
    [DK_SIRI_STUDY, DK_SIRI_HIGHER_ED],
    { allDegrees: true },
  );

const visaProcess = (id: string) =>
  qa(
    id,
    b('How does the application work, and how long does it take?', 'Application কীভাবে কাজ করে, আর কত সময় লাগে?'),
    [
      b(
        'SIRI’s own page states the normal processing time is 2 months, extended to up to 3 months if further information is needed, with a processing fee of DKK 3,060. Your educational institution completes its own part of the two-part application form first; you then complete yours (online via the ST1 form, or on paper). You must create a case-order ID and pay the fee before submitting, have your biometric features (facial photo and fingerprints) recorded within 14 days of an online submission, and — if applying from outside Denmark — submit at a Danish diplomatic mission or application centre in your country of residence.',
        'SIRI-এর নিজের page বলে স্বাভাবিক processing time 2 মাস, আরো information লাগলে 3 মাস পর্যন্ত বাড়ে, সঙ্গে একটি processing fee DKK 3,060। আপনার educational institution প্রথমে দুই-ভাগের application form-এর নিজের ভাগ সম্পূর্ণ করে; তারপর আপনি আপনার ভাগ সম্পূর্ণ করেন (অনলাইনে ST1 form দিয়ে, বা কাগজে)। জমা দেওয়ার আগে আপনাকে একটি case-order ID তৈরি করতে হয় আর fee পরিশোধ করতে হয়, online submission-এর 14 দিনের মধ্যে আপনার biometric feature (facial photo আর fingerprint) রেকর্ড করতে হয়, আর — Denmark-এর বাইরে থেকে আবেদন করলে — আপনার বসবাসের দেশে একটি Danish diplomatic mission বা application centre-এ জমা দিতে হয়।',
      ),
    ],
    [DK_SIRI_HIGHER_ED],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'SIRI’s own page gives a specific figure: you have sufficient funds if your disposable amount corresponds to DKK 7,426 per month (2026 level), multiplied by the number of months you will study, up to a maximum of DKK 89,112 for 12 months or more. Accepted proof is a bank statement (no more than 30 days old, in your own name, showing balance and currency) or documentation that a scholarship or student loan granted to you covers the same monthly amount — SIRI’s own page explicitly does not accept restricted stocks, bonds, an investment portfolio, or a statement in someone else’s name (e.g. a parent’s). If you have already paid your first semester’s tuition fee, that payment itself is accepted as proof of sufficient funds, with no further documentation needed.',
        'SIRI-এর নিজের page একটি নির্দিষ্ট সংখ্যা দেয়: আপনার disposable amount মাসে DKK 7,426 (2026 level)-এর সমান হলে আপনার যথেষ্ট funds আছে, আপনার পড়ার মাসের সংখ্যা দিয়ে গুণ করে, 12 মাস বা তার বেশির জন্য সর্বোচ্চ DKK 89,112 পর্যন্ত। গ্রহণযোগ্য প্রমাণ একটি bank statement (30 দিনের বেশি পুরনো না, আপনার নিজের নামে, balance আর currency দেখায়) বা একটি scholarship বা student loan-এর documentation যা আপনাকে দেওয়া হয়েছে আর একই মাসিক পরিমাণ কভার করে — SIRI-এর নিজের page স্পষ্টভাবে restricted stock, bond, investment portfolio, বা অন্য কারো (যেমন বাবা-মা) নামে statement গ্রহণ করে না। আপনি যদি আপনার প্রথম semester-এর tuition fee আগেই পরিশোধ করে থাকেন, সেই পরিশোধই যথেষ্ট funds-এর প্রমাণ হিসেবে গ্রহণ করা হয়, আর কোনো documentation লাগে না।',
      ),
    ],
    [DK_SIRI_HIGHER_ED],
    { allDegrees: true },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('Is health insurance compulsory, and how do you get it?', 'Health insurance কি বাধ্যতামূলক, আর কীভাবে পাওয়া যায়?'),
    [
      b(
        'Not a separate private-insurance requirement once you are properly registered: Aarhus University’s own page states plainly that once you have a Danish CPR number, health insurance is covered by the Danish state, and Lifeindenmark.dk (the official portal SIRI itself links students to) states the health insurance card — "the yellow card" — is issued when you register for a CPR number with Citizen Service in your municipality or an International Citizen Service centre. SIRI’s own page does not describe a separate compulsory pre-entry travel-health-insurance product for students the way some other countries’ guides do, but you should budget for the period before your CPR registration is complete, and arrange your own cover for that gap.',
        'নিজে একটি আলাদা private-insurance শর্ত না, একবার আপনি ঠিকভাবে register করলে: Aarhus University-র নিজের page স্পষ্টভাবে বলে একবার আপনার একটি Danish CPR number থাকলে, health insurance Danish state কভার করে, আর Lifeindenmark.dk (SIRI নিজেই student-দের যে official portal-এ link করে) বলে health insurance card — "the yellow card" — আপনার municipality-র Citizen Service বা একটি International Citizen Service centre-এ CPR number-এর জন্য register করলে ইস্যু হয়। SIRI-এর নিজের page student-দের জন্য একটি আলাদা বাধ্যতামূলক pre-entry travel-health-insurance পণ্যের কথা বলে না যেভাবে অন্য কিছু দেশের guide বলে, কিন্তু আপনার CPR registration সম্পূর্ণ হওয়ার আগের সময়ের জন্য বাজেট রাখা উচিত, আর সেই সময়ের জন্য নিজের cover ব্যবস্থা করা উচিত।',
      ),
    ],
    [DK_LIFEINDENMARK_ARRIVE, DK_SIRI_HIGHER_ED],
    { allDegrees: true, status: 'partly-verified' },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Denmark, and how many hours?', 'Denmark-এ পড়ার পাশাপাশি কাজ করা যায় কি, আর কত ঘণ্টা?'),
    [
      b(
        'It depends on your programme. SIRI’s own page states that a student in a state-approved higher educational programme is granted a limited work permit together with the residence permit, allowing 90 hours per month during the normal study period (September to May) and full-time work in June, July and August — working more hours than this is treated as illegal work and can lead to a warning, a fine, or revocation of your residence permit. If you are instead enrolled in a non-state-approved programme and you applied for your residence permit on or after 2 May 2025, SIRI’s own page states you will not be granted a limited work permit at all and therefore have no right to work — so always confirm your programme’s state-approval status before counting on any work income.',
        'এটা নির্ভর করে আপনার programme-এর উপর। SIRI-এর নিজের page বলে একটি state-approved higher educational programme-এর student-কে residence permit-এর সঙ্গে একটি limited work permit দেওয়া হয়, যা স্বাভাবিক পড়ার সময় (September থেকে May) সপ্তাহে না, মাসে 90 ঘণ্টা কাজের অনুমতি দেয়, আর June, July, আর August মাসে full-time কাজের অনুমতি দেয় — এর বেশি কাজ করা illegal work হিসেবে গণ্য হয় আর warning, fine, বা আপনার residence permit বাতিল হতে পারে। আপনি যদি একটি non-state-approved programme-এ ভর্তি হয়ে থাকেন আর 2 May 2025 বা তার পরে আপনার residence permit-এর জন্য আবেদন করে থাকেন, SIRI-এর নিজের page বলে আপনাকে কোনো limited work permit দেওয়া হবে না, তাই আপনার কাজ করার অধিকার থাকবে না — তাই কোনো কাজের আয়ের উপর নির্ভর করার আগে সবসময় আপনার programme-এর state-approval status নিশ্চিত করুন।',
      ),
    ],
    [DK_SIRI_HIGHER_ED],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Denmark to look for work after graduating?', 'পড়া শেষে কাজ খোঁজার জন্য Denmark-এ থাকা যায়?'),
    [
      b(
        'Yes, through a "job seeking permit" — but exactly how long depends on when you apply and your degree level, and the rule changed on 1 October 2026. SIRI’s own page states that if you obtain a Danish academy profession degree, professional bachelor’s, bachelor’s, part-time master’s or master’s degree (or a master’s for working professionals) in a state-approved programme and you applied for your residence permit on or after 1 October 2026, you will generally be granted a 6-month or 1-year job-seeking permit. SIRI’s own 30 September 2026 notice confirms this is a reduction from the previous 3-year permit, which still applies only to students who applied before 1 October 2026. PhD students are not affected by the change at all and are still generally granted a 3-year job-seeking permit regardless of when they applied. The job-seeking permit carries the same work rights as during study (90 hours/month, full-time in June–August), and if you receive a job offer you can apply for a new residence and work permit based on that job.',
        'হ্যাঁ, একটি "job seeking permit"-এর মাধ্যমে — কিন্তু ঠিক কত দিন তা নির্ভর করে আপনি কখন আবেদন করেন আর আপনার degree level-এর উপর, আর নিয়মটা 1 October 2026-এ পরিবর্তিত হয়েছে। SIRI-এর নিজের page বলে আপনি যদি একটি state-approved programme-এ Danish academy profession degree, professional bachelor\'s, bachelor\'s, part-time master\'s, বা master\'s degree (বা working professional-দের জন্য master\'s) পান আর 1 October 2026 বা তার পরে আপনার residence permit-এর জন্য আবেদন করে থাকেন, আপনাকে সাধারণত একটি 6-month বা 1-year job-seeking permit দেওয়া হবে। SIRI-এর নিজের 30 September 2026-এর notice নিশ্চিত করে এটা আগের 3-year permit থেকে কমানো, যা এখনো শুধু 1 October 2026-এর আগে আবেদন করা student-দের জন্য প্রযোজ্য। PhD student-রা এই পরিবর্তনে প্রভাবিত হন না, তারা কখন আবেদন করেছেন তা নির্বিশেষে এখনো সাধারণত একটি 3-year job-seeking permit পান। Job-seeking permit পড়ার সময়ের মতোই একই কাজের অধিকার দেয় (মাসে 90 ঘণ্টা, June–August-এ full-time), আর একটি চাকরির offer পেলে আপনি সেই চাকরির ভিত্তিতে একটি নতুন residence আর work permit-এর জন্য আবেদন করতে পারেন।',
      ),
      POST_1_OCT_NOTE,
    ],
    [DK_SIRI_HIGHER_ED, DK_SIRI_NEW_RULES_2026],
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'Denmark does not run a single, centrally-administered full-degree scheme that names Bangladesh the way Hungary’s Stipendium Hungaricum does. Study in Denmark’s own "Scholarships" page and the universities’ own scholarship pages, read for this guide, describe the "Danish Government Scholarship" as a limited number of government-funded scholarships each Danish university receives per year for highly qualified non-EU/EEA/Swiss full-degree applicants — awarded as a full or partial tuition-fee waiver and/or a living-cost grant, administered entirely by the individual university, with no separate scholarship application (every eligible non-EU/EEA applicant is automatically considered). Aalborg University’s own page states it awards only "approximately 15" of these a year and advises applicants not to count on receiving one. No official page read for this guide names Bangladesh individually as an eligible or targeted country.',
        'Hungary-র Stipendium Hungaricum-এর মতো Bangladesh-কে নাম দেওয়া একটি একক, কেন্দ্রীয়ভাবে পরিচালিত full-degree scheme Denmark চালায় না। Study in Denmark-এর নিজের "Scholarships" page আর universities-এর নিজের scholarship page, এই guide-এর জন্য পড়া, "Danish Government Scholarship"-কে প্রতি বছর প্রতিটি Danish university-র পাওয়া সীমিত সংখ্যক government-funded scholarship হিসেবে বর্ণনা করে, highly qualified non-EU/EEA/Swiss full-degree আবেদনকারীদের জন্য — একটি full বা partial tuition-fee waiver আর/বা একটি living-cost grant হিসেবে দেওয়া হয়, সম্পূর্ণভাবে individual university দ্বারা পরিচালিত, কোনো আলাদা scholarship application ছাড়াই (প্রতিটি যোগ্য non-EU/EEA আবেদনকারী স্বয়ংক্রিয়ভাবে বিবেচিত হয়)। Aalborg University-র নিজের page বলে তারা বছরে শুধু "প্রায় 15"টা দেয় আর আবেদনকারীদের এটা পাওয়ার উপর নির্ভর না করার পরামর্শ দেয়। এই guide-এর জন্য পড়া কোনো official page Bangladesh-কে আলাদাভাবে একটি যোগ্য বা লক্ষ্য করা দেশ হিসেবে নাম দেয়নি।',
      ),
    ],
    [DK_SID_SCHOLARSHIPS, DK_KU_SCHOLARSHIPS, DK_AAU_FINANCE_FEES],
    { status: 'partly-verified', kind: 'guidance' },
  );

// ------------------------------------------------------------------ documents

const AUTHORITY = b('SIRI (the Danish Agency for International Recruitment and Integration), via a Danish diplomatic mission or application centre in your country of residence (for Bangladesh, the Royal Danish Embassy in Dhaka handles Danish visa and representation matters), or in Denmark if you are already residing there legally.', 'SIRI (Danish Agency for International Recruitment and Integration), আপনার বসবাসের দেশে একটি Danish diplomatic mission বা application centre-এর মাধ্যমে (Bangladesh-এর জন্য, Royal Danish Embassy in Dhaka Danish visa আর representation বিষয় দেখে), বা আপনি যদি Denmark-এ আইনগতভাবে থাকেন তাহলে সরাসরি Denmark-এ।');

export const DK_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Valid passport (all pages, including empty ones)', 'Valid passport (সব পাতা, খালি পাতাসহ)'),
    why: b('SIRI’s own checklist for the higher-education residence permit lists a copy of all pages of your passport — including every empty page and the front and back cover — among the documents to gather before applying.', 'Higher-education residence permit-এর জন্য SIRI-এর নিজের checklist আবেদনের আগে সংগ্রহ করার document-এর মধ্যে আপনার passport-এর সব পাতার একটি কপি — প্রতিটি খালি পাতা আর সামনে-পিছনের cover সহ — তালিকাভুক্ত করে।'),
    who: AUTHORITY,
    when: b('With the application; your permit cannot be valid beyond 3 months before your passport expires.', 'Application-এর সঙ্গে; আপনার passport-এর মেয়াদ শেষ হওয়ার 3 মাস আগের পরে আপনার permit valid থাকতে পারে না।'),
    where: b('Submitted online with your ST1 application, or on paper at the Danish mission/SIRI branch office.', 'ST1 application-এর সঙ্গে অনলাইনে, বা কাগজে Danish mission/SIRI branch office-এ জমা দিতে হয়।'),
    prepare: b('Keep it valid well beyond your intended stay, since a short-validity passport shortens your residence permit’s validity too.', 'প্রত্যাশিত থাকার সময়ের চেয়ে বেশ বেশি valid রাখুন, কারণ কম-মেয়াদি passport আপনার residence permit-এর মেয়াদও কমিয়ে দেয়।'),
    groups: ['general', 'visa'],
    sources: [DK_SIRI_HIGHER_ED],
  },
  {
    id: 'admission',
    name: b('Confirmation of admission to a higher educational programme', 'একটি higher educational programme-এ ভর্তির confirmation'),
    why: b('Proof of the purpose of residence: you must be admitted to a higher educational programme or a qualifying preparatory course at an institution that is state-approved or has a valid advisory statement from the Accreditation Council / EVA before applying.', 'থাকার উদ্দেশ্যের প্রমাণ: আবেদনের আগে আপনাকে একটি state-approved বা Accreditation Council/EVA-র থেকে valid advisory statement থাকা institution-এর একটি higher educational programme বা যোগ্য preparatory course-এ ভর্তি হতে হবে।'),
    who: b('The Danish educational institution you applied to — it completes its own part of the two-part application form first.', 'যে Danish educational institution-এ আবেদন করেছেন — তারা দুই-ভাগের application form-এর নিজের ভাগ প্রথমে সম্পূর্ণ করে।'),
    when: b('After admission, before you complete your own part of the residence-permit application.', 'ভর্তির পর, residence-permit application-এর নিজের ভাগ সম্পূর্ণ করার আগে।'),
    where: b('The institution’s part is completed in the ST1 online system; you are notified by email to complete yours.', 'Institution-এর ভাগ ST1 online system-এ সম্পূর্ণ করা হয়; আপনার ভাগ সম্পূর্ণ করতে ইমেইলে জানানো হয়।'),
    prepare: b('Make sure the institution uses the same email address you plan to register with, or you will not be able to access your part of the application.', 'নিশ্চিত করুন institution যে email address ব্যবহার করে তা আপনি যে address দিয়ে register করবেন তার সাথে একই, না হলে আপনি application-এর নিজের ভাগ access করতে পারবেন না।'),
    groups: ['general', 'program', 'visa'],
    sources: [DK_SIRI_HIGHER_ED],
  },
  {
    id: 'funds',
    name: b('Proof of sufficient funds', 'যথেষ্ট funds-এর প্রমাণ'),
    why: b('SIRI’s own page requires a disposable amount of DKK 7,426 per month (2026 level), up to a maximum of DKK 89,112 for 12 months or more, shown by a bank statement no more than 30 days old (in your own name), or documentation that a scholarship or student loan covers the same amount — or your first semester’s tuition-fee payment itself, which is accepted in place of this document.', 'SIRI-এর নিজের page মাসে DKK 7,426 (2026 level) disposable amount চায়, 12 মাস বা তার বেশির জন্য সর্বোচ্চ DKK 89,112 পর্যন্ত, 30 দিনের বেশি পুরনো না এমন একটি bank statement দিয়ে (আপনার নিজের নামে), বা একটি scholarship বা student loan একই পরিমাণ কভার করে এমন documentation দিয়ে দেখাতে হয় — বা আপনার প্রথম semester-এর tuition-fee payment নিজেই, যা এই document-এর বদলে গ্রহণ করা হয়।'),
    who: AUTHORITY,
    when: b('With the application.', 'Application-এর সঙ্গে।'),
    where: b('Uploaded with your ST1 application.', 'আপনার ST1 application-এর সঙ্গে upload করতে হয়।'),
    prepare: b('SIRI explicitly does not accept restricted stocks, bonds, an investment portfolio, or a bank statement in someone else’s name (e.g. a parent’s) as proof.', 'SIRI স্পষ্টভাবে restricted stock, bond, investment portfolio, বা অন্য কারো (যেমন বাবা-মা) নামে bank statement প্রমাণ হিসেবে গ্রহণ করে না।'),
    groups: ['visa', 'bangladesh'],
    sources: [DK_SIRI_HIGHER_ED],
  },
  {
    id: 'biometrics',
    name: b('Biometric features (facial photo and fingerprints)', 'Biometric feature (facial photo আর fingerprint)'),
    why: b('SIRI’s own page states every applicant must have their biometric features recorded; refusing this means the application is not processed at all.', 'SIRI-এর নিজের page বলে প্রতিটি আবেদনকারীর biometric feature রেকর্ড করতে হয়; এটা না করলে application মোটেও প্রক্রিয়া করা হয় না।'),
    who: b('A Danish diplomatic mission abroad (for Bangladesh, the Royal Danish Embassy in Dhaka), or a SIRI branch office if applying from within Denmark.', 'বিদেশে একটি Danish diplomatic mission (Bangladesh-এর জন্য, Royal Danish Embassy in Dhaka), বা Denmark-এর ভিতর থেকে আবেদন করলে একটি SIRI branch office।'),
    when: b('Within 14 days of an online application, or at submission if using the paper form.', 'একটি online application-এর 14 দিনের মধ্যে, বা paper form ব্যবহার করলে জমা দেওয়ার সময়।'),
    where: b('Book an appointment at the relevant mission/branch office in advance.', 'সংশ্লিষ্ট mission/branch office-এ আগে থেকে appointment বুক করুন।'),
    prepare: b('If you cannot book an appointment within the 14-day window, email SIRI with your scheduled date to avoid rejection.', '14 দিনের সময়ের মধ্যে appointment বুক করতে না পারলে, আবেদন বাতিল এড়াতে আপনার নির্ধারিত তারিখ জানিয়ে SIRI-কে ইমেইল করুন।'),
    groups: ['visa'],
    sources: [DK_SIRI_HIGHER_ED],
  },
  {
    id: 'cpr-health-card',
    name: b('CPR registration and the health insurance card ("the yellow card")', 'CPR registration আর health insurance card ("the yellow card")'),
    why: b('Lifeindenmark.dk states the health insurance card is issued once you register for a CPR number with your municipality’s Citizen Service (or an International Citizen Service centre) — Aarhus University’s own page confirms that once you have a CPR number, health insurance is covered by the Danish state.', 'Lifeindenmark.dk বলে আপনার municipality-র Citizen Service (বা একটি International Citizen Service centre)-এ CPR number-এর জন্য register করলেই health insurance card ইস্যু হয় — Aarhus University-র নিজের page নিশ্চিত করে একবার আপনার CPR number থাকলে health insurance Danish state কভার করে।'),
    who: b('Your municipality’s Citizen Service / International Citizen Service centre.', 'আপনার municipality-র Citizen Service / International Citizen Service centre।'),
    when: b('As soon as possible after arrival in Denmark.', 'Denmark-এ পৌঁছানোর পর যত দ্রুত সম্ভব।'),
    where: b('In person at the relevant centre, with your residence permit and accommodation details.', 'সংশ্লিষ্ট centre-এ ব্যক্তিগতভাবে, আপনার residence permit আর accommodation details সহ।'),
    prepare: b('Budget for the gap between arrival and your CPR registration being complete, since state-covered health insurance only begins once you have a CPR number.', 'পৌঁছানো আর আপনার CPR registration সম্পূর্ণ হওয়ার মধ্যকার ফাঁকের জন্য বাজেট রাখুন, কারণ state-covered health insurance আপনার CPR number হওয়ার পরই শুরু হয়।'),
    groups: ['visa', 'arrival'],
    sources: [DK_LIFEINDENMARK_ARRIVE],
  },
];

// ------------------------------------------------------------------ costs (source's own currency, never converted)

const VISA_FEE_COST: GuideCost = { id: 'residence-permit-fee', label: b('Residence-permit processing fee (SIRI)', 'Residence-permit processing fee (SIRI)'), value: b('DKK 3,060, charged by SIRI to process the higher-education residence and work permit application.', 'SIRI higher-education residence আর work permit application প্রক্রিয়া করার জন্য DKK 3,060 চার্জ করে।'), amount: { value: 3060, currency: 'DKK', period: 'one-time' }, source: DK_SIRI_HIGHER_ED };
const FUNDS_COST: GuideCost = { id: 'funds-to-show', label: b('Funds to show per month', 'মাসে যত টাকা দেখাতে হয়'), value: b('DKK 7,426 per month (2026 level), up to a maximum of DKK 89,112 for 12 months or more of study.', 'মাসে DKK 7,426 (2026 level), 12 মাস বা তার বেশি পড়ার জন্য সর্বোচ্চ DKK 89,112 পর্যন্ত।'), amount: { value: 7426, currency: 'DKK', period: 'month' }, source: DK_SIRI_HIGHER_ED };
const TUITION_RANGE: GuideCost = { id: 'full-degree-tuition-range', label: b('Annual tuition, full-degree non-EU/EEA students (country-wide range)', 'বছরে Tuition, non-EU/EEA full-degree student (দেশব্যাপী range)'), value: b('Study in Denmark’s own page gives USD 8,000–21,000 / EUR 6,000–16,000 (DKK 45,000–120,000) per year for full-degree students — the page itself says to contact the institution for exact fees, since actual tuition varies widely by university and programme.', 'Study in Denmark-এর নিজের page full-degree student-দের জন্য বছরে USD 8,000–21,000 / EUR 6,000–16,000 (DKK 45,000–120,000) দেয় — page নিজেই সঠিক fee-র জন্য institution-এর সাথে যোগাযোগ করতে বলে, কারণ আসল tuition university আর programme অনুযায়ী ব্যাপকভাবে আলাদা হয়।'), amount: { value: 6000, max: 16000, currency: 'EUR', period: 'year' }, source: DK_SID_TUITION };
const UNVERIFIED: GuideCost[] = [
  { id: 'living-cost', label: b('Monthly cost of living', 'মাসিক জীবনযাপন খরচ'), value: b('No single official, nationwide monthly living-cost figure was confirmed on the pages read for this guide; the University of Copenhagen’s own page estimates living in Copenhagen specifically (not Denmark-wide) at EUR 1,280–1,800 per month, which should not be read as an official national figure.', 'এই guide-এর জন্য পড়া page-এ একটি একক official, দেশব্যাপী মাসিক জীবনযাপন খরচের সংখ্যা নিশ্চিত হয়নি; University of Copenhagen-এর নিজের page বিশেষভাবে Copenhagen-এ (Denmark-ব্যাপী না) থাকাকে মাসে EUR 1,280–1,800 অনুমান করে, যা একটি official জাতীয় সংখ্যা হিসেবে পড়া উচিত না।'), status: 'partly-verified', source: DK_KU_TUITION },
];

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
        b('Which universities are there?', 'কোন কোন university আছে?'),
        [b('The examples below — Aalborg University, Aarhus University, Copenhagen Business School, DTU and the University of Copenhagen — are listed alphabetically by their English names, not ordered by quality. Unlike Austria, where tuition is fixed nationally, each Danish public university sets its own non-EU/EEA tuition-fee rates per programme — Study in Denmark’s own country-wide range (EUR 6,000–16,000/year) hides real differences between, say, a DTU engineering MSc (EUR 15,000/year) and an Aalborg University economics MSc (EUR 7,450/year) — so always check the exact programme on the institution’s own admissions page.', 'নিচের উদাহরণ — Aalborg University, Aarhus University, Copenhagen Business School, DTU, আর University of Copenhagen — তাদের ইংরেজি নাম অনুযায়ী বর্ণানুক্রমে, মান অনুযায়ী নয়। Austria-র মতো না, যেখানে tuition জাতীয়ভাবে ঠিক, প্রতিটি Danish public university প্রতি programme-এর জন্য নিজের non-EU/EEA tuition-fee rate ঠিক করে — Study in Denmark-এর নিজের দেশব্যাপী range (EUR 6,000–16,000/year) একটি DTU engineering MSc (EUR 15,000/year) আর একটি Aalborg University economics MSc (EUR 7,450/year)-এর মধ্যে আসল পার্থক্য আড়াল করে — তাই সবসময় প্রতিষ্ঠানের নিজের admissions page-এ সঠিক programme দেখুন।')], [DK_SID_TUITION]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work'), insurance('insurance')] },
  { id: 'visa', title: b('Student residence permit', 'Student residence permit'), items: [visaRequired('visa-required'), visaProcess('visa-process'), funds('funds')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Each university sets its own tuition and deadlines (around 15 March for most bachelor’s programmes) · residence-permit process ≈ 2–3 months · 90 hours/month work during term (state-approved programmes only)', 'প্রতি university নিজের tuition আর deadline ঠিক করে (অধিকাংশ bachelor\'s programme-এর জন্য প্রায় 15 March) · residence-permit process ≈ 2–3 মাস · term-এ মাসে 90 ঘণ্টা কাজ (শুধু state-approved programme-এ)'),
  intro: b(
    'Danish public universities admit Bachelor’s applicants through each institution’s own online application system; the University of Copenhagen, CBS and Aalborg University all set 15 March, 12:00 CET as their bachelor’s application deadline for applicants with foreign qualifications, and all charge a non-EU/EEA application fee (CBS: EUR 150; comparable fees apply elsewhere) before the application is even assessed. As a Bangladeshi applicant you also need Denmark’s student residence and work permit, applied for through SIRI — normally decided within 2 months, up to 3 if more documents are needed, for a DKK 3,060 fee. Tuition is not fixed nationally: Study in Denmark’s own country-wide range is EUR 6,000–16,000 a year, but CBS alone states EUR 13,000/year for its bachelor’s programmes, so you must check your own chosen university.',
    'Danish public university-গুলো প্রতিটি institution-এর নিজস্ব online application system-এর মাধ্যমে Bachelor\'s আবেদনকারীদের ভর্তি করে; University of Copenhagen, CBS, আর Aalborg University সবাই বিদেশি যোগ্যতা থাকা আবেদনকারীদের জন্য bachelor\'s application deadline 15 March, 12:00 CET ঠিক করে, আর সবাই application মূল্যায়নের আগেই একটি non-EU/EEA application fee চার্জ করে (CBS: EUR 150; অন্য জায়গায়ও সমতুল্য fee প্রযোজ্য)। Bangladeshi আবেদনকারী হিসেবে আপনার SIRI-এর মাধ্যমে আবেদন করা Denmark-এর student residence আর work permit-ও লাগে — সাধারণত 2 মাসের মধ্যে সিদ্ধান্ত হয়, বেশি document লাগলে 3 মাস পর্যন্ত, একটি DKK 3,060 fee-র জন্য। Tuition জাতীয়ভাবে ঠিক না: Study in Denmark-এর নিজের দেশব্যাপী range বছরে EUR 6,000–16,000, কিন্তু CBS একা তার bachelor\'s programme-এর জন্য বছরে EUR 13,000 বলে, তাই আপনাকে আপনার বাছা university চেক করতে হবে।',
  ),
  costs: { official: [VISA_FEE_COST, FUNDS_COST, TUITION_RANGE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in Denmark from Bangladesh?", "Bangladesh থেকে Denmark-এ Bachelor's পড়তে কী কী লাগে?"),
          [b('A secondary-school qualification each university assesses individually for equivalence to the Danish upper-secondary exam, the English (or Danish) proficiency the programme is taught in, an online application through the institution’s own system by its deadline (15 March, 12:00 CET at the University of Copenhagen, CBS and Aalborg University for foreign qualifications), payment of a non-EU/EEA application fee, and — since Bangladesh is not EU/EEA — Denmark’s student residence and work permit applied for through SIRI. CBS’s own page states it offers an "appraisal" round where applicants with a non-EU educational background can have their qualifications checked against entry requirements before applying.', 'প্রতিটি university আলাদাভাবে মূল্যায়ন করা Danish upper-secondary exam-এর সমতুল্য একটি secondary-school যোগ্যতা, programme যে ভাষায় (English বা Danish) পড়ানো হয় তার দক্ষতা, institution-এর নিজের system-এর মাধ্যমে তার deadline-এর মধ্যে একটি online application (বিদেশি যোগ্যতার জন্য University of Copenhagen, CBS, আর Aalborg University-তে 15 March, 12:00 CET), একটি non-EU/EEA application fee পরিশোধ, আর — Bangladesh EU/EEA না হওয়ায় — SIRI-এর মাধ্যমে আবেদন করা Denmark-এর student residence আর work permit। CBS-এর নিজের page বলে তারা একটি "appraisal" round দেয় যেখানে non-EU educational background থাকা আবেদনকারীরা আবেদনের আগে তাদের যোগ্যতা entry requirement-এর সাথে চেক করাতে পারেন।'), CHECK_UNI],
          [DK_KU_BACHELOR, DK_CBS_BACHELOR_ADMISSION],
          { status: 'partly-verified' },
        ),
        qa(
          'hsc',
          b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'),
          [b('Not verified yet as a single nationwide rule — each Danish university assesses a foreign secondary certificate such as the Bangladeshi HSC for equivalence to the Danish upper-secondary exam itself, and the exact conversion or any extra requirement (foundation year, specific subject combinations) was not itemized on a single official page read for this guide. CBS’s own "appraisal" service lets you check this before you apply; other universities should be asked directly.', 'একক জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি — প্রতিটি Danish university Bangladeshi HSC-র মতো একটি বিদেশি secondary সনদ Danish upper-secondary exam-এর সমতুল্য কিনা তা নিজে মূল্যায়ন করে, আর সঠিক conversion বা অতিরিক্ত কোনো শর্ত (foundation year, নির্দিষ্ট subject combination) এই guide-এর জন্য পড়া একটি একক official page-এ তালিকাভুক্ত হয়নি। CBS-এর নিজের "appraisal" service আপনাকে আবেদনের আগে এটা চেক করতে দেয়; অন্য university-দের সরাসরি জিজ্ঞাসা করা উচিত।')],
          [DK_CBS_BACHELOR_ADMISSION],
          { status: 'not-verified' },
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
          [b('All applicants with a foreign secondary qualification must apply online by 15 March, 12:00 CET, per the University of Copenhagen’s own page — CBS and Aalborg University’s own pages confirm the same national bachelor’s deadline. CBS’s own page states that if you miss this deadline, you cannot apply until the following year. The University of Copenhagen’s own page allows admission requirements to be completed up to 5 July, even though the application itself is due 15 March.', 'University of Copenhagen-এর নিজের page অনুযায়ী, বিদেশি secondary যোগ্যতা থাকা সব আবেদনকারীকে অনলাইনে 15 March, 12:00 CET-এর মধ্যে আবেদন করতে হয় — CBS আর Aalborg University-র নিজের page একই জাতীয় bachelor\'s deadline নিশ্চিত করে। CBS-এর নিজের page বলে আপনি এই deadline মিস করলে, পরের বছর পর্যন্ত আবেদন করতে পারবেন না। University of Copenhagen-এর নিজের page ভর্তির শর্ত 5 July পর্যন্ত পূরণ করার সুযোগ দেয়, যদিও application নিজেই 15 March-এর মধ্যে দিতে হয়।')],
          [DK_KU_BACHELOR, DK_CBS_BACHELOR_ADMISSION, DK_AAU_FINANCE_FEES],
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
          b('How much English do you need for a Bachelor’s?', "Bachelor's-এ কত English লাগে?"),
          [b('Not verified yet as a single national minimum — set per university and per programme, and language requirements were not itemized nationally on the official pages read for this guide. DTU’s own page (for its Master’s programmes) accepts IELTS Academic 6.5 as a reference point, but bachelor’s-level English requirements must be confirmed with your own chosen programme.', 'একক জাতীয় ন্যূনতম হিসেবে এখনো যাচাই হয়নি — প্রতি university আর প্রতি programme অনুযায়ী ঠিক হয়, আর এই guide-এর জন্য পড়া official page-এ ভাষার শর্ত জাতীয়ভাবে তালিকাভুক্ত হয়নি। DTU-এর নিজের page (তার Master\'s programme-এর জন্য) IELTS Academic 6.5-কে একটি reference point হিসেবে গ্রহণ করে, কিন্তু bachelor\'s-level English শর্ত আপনার নিজের বাছা programme-এর সাথে নিশ্চিত করতে হবে।')],
          [DK_DTU_ENGLISH],
          { status: 'not-verified' },
        ),
      ],
    },
    {
      id: 'tuition',
      title: b('Tuition and scholarships', 'Tuition আর scholarship'),
      items: [
        qa(
          'tuition',
          b("How much is a Bachelor's in Denmark?", "Denmark-এ Bachelor's-এ খরচ কত?"),
          [b('Not a single national figure, unlike Austria. Study in Denmark’s own country-wide range for full-degree students is EUR 6,000–16,000 a year, but CBS’s own page states its bachelor’s programmes cost EUR 13,000/year (EUR 6,500/semester), well above the middle of that range — always check your own university’s own tuition page, since rates differ sharply by institution and programme.', 'Austria-র মতো না, একটি একক জাতীয় সংখ্যা নয়। Study in Denmark-এর নিজের দেশব্যাপী range full-degree student-দের জন্য বছরে EUR 6,000–16,000, কিন্তু CBS-এর নিজের page বলে তার bachelor\'s programme বছরে EUR 13,000 (EUR 6,500/semester) খরচ করে, সেই range-এর মাঝামাঝির চেয়ে বেশ বেশি — সবসময় আপনার নিজের university-র নিজের tuition page দেখুন, কারণ rate institution আর programme অনুযায়ী ব্যাপকভাবে আলাদা হয়।'), CHECK_UNI],
          [DK_SID_TUITION, DK_CBS_BACHELOR_ADMISSION],
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
  card: b('A relevant Bachelor’s needed · most Danish public universities’ English-taught Master’s have a 15 January (autumn) / 15 September (spring) non-EU deadline · tuition ranges from about EUR 3,725/semester to EUR 16,000/year', 'সম্পর্কিত Bachelor\'s লাগে · অধিকাংশ Danish public university-র English-taught Master\'s-এ non-EU deadline 15 January (autumn) / 15 September (spring) · tuition প্রায় EUR 3,725/semester থেকে EUR 16,000/year পর্যন্ত'),
  intro: b(
    'Master’s admission in Denmark follows an institution-by-institution pattern, but non-EU/EEA deadlines cluster strongly around mid-January for a September start: the University of Copenhagen (15 January), DTU (15 January) and Aarhus University (15 January) all share this date, while Aalborg University sets 15 January for fee-paying (non-EU) applicants to its September intake. English-taught programmes are common — DTU’s own page accepts IELTS Academic 6.5 — but tuition is never a single figure: DTU charges EUR 7,500/semester (EUR 15,000/year) for most MSc programmes, CBS charges EUR 16,000/year, and Aalborg University’s own rate table lists fees from DKK 27,800/semester (about EUR 3,725) for some programmes (e.g. Economics and Business Administration) up to DKK 57,850/semester (about EUR 7,745) for most engineering and science programmes. As a Bangladeshi applicant you still need Denmark’s student residence and work permit through SIRI once admitted.',
    'Denmark-এ Master\'s ভর্তি institution-by-institution ধারা অনুসরণ করে, কিন্তু non-EU/EEA deadline জোরালোভাবে mid-January-তে একটি September শুরুর জন্য জমে ওঠে: University of Copenhagen (15 January), DTU (15 January), আর Aarhus University (15 January) সবাই এই তারিখ ভাগ করে, যখন Aalborg University তার September intake-এর fee-paying (non-EU) আবেদনকারীদের জন্য 15 January ঠিক করে। English-taught programme সাধারণ — DTU-এর নিজের page IELTS Academic 6.5 গ্রহণ করে — কিন্তু tuition কখনো একটি একক সংখ্যা না: DTU অধিকাংশ MSc programme-এর জন্য EUR 7,500/semester (EUR 15,000/year) চার্জ করে, CBS EUR 16,000/year চার্জ করে, আর Aalborg University-র নিজের rate table কিছু programme-এর (যেমন Economics and Business Administration) জন্য DKK 27,800/semester (প্রায় EUR 3,725) থেকে অধিকাংশ engineering আর science programme-এর জন্য DKK 57,850/semester (প্রায় EUR 7,745) পর্যন্ত fee তালিকাভুক্ত করে। Bangladeshi আবেদনকারী হিসেবে ভর্তি হলে আপনার এখনো SIRI-এর মাধ্যমে Denmark-এর student residence আর work permit লাগে।',
  ),
  costs: { official: [VISA_FEE_COST, FUNDS_COST, TUITION_RANGE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in Denmark?", "Denmark-এ Master's-এ কী লাগে?"),
          [b('A relevant Bachelor’s degree assessed by your chosen university — exact academic requirements (field relevance, minimum grades) are set per programme, not nationally, and were not itemized in full detail on the official pages read for this guide. Non-EU/EEA applicants must pay each university’s own application fee (DTU, CBS and Aalborg University all charge EUR 150 per application round) and, once admitted, Denmark’s student residence and work permit through SIRI.', 'আপনার বাছা university দ্বারা মূল্যায়িত একটি সম্পর্কিত Bachelor\'s degree — সঠিক academic শর্ত (field-এর সম্পর্ক, ন্যূনতম grade) জাতীয়ভাবে না, প্রতি programme অনুযায়ী ঠিক হয়, আর এই guide-এর জন্য পড়া official page-এ সম্পূর্ণ বিস্তারিতভাবে তালিকাভুক্ত হয়নি। Non-EU/EEA আবেদনকারীদের প্রতিটি university-র নিজের application fee পরিশোধ করতে হয় (DTU, CBS, আর Aalborg University সবাই প্রতি application round-এ EUR 150 চার্জ করে) আর, ভর্তি হলে, SIRI-এর মাধ্যমে Denmark-এর student residence আর work permit।')],
          [DK_DTU_FEES, DK_CBS_MASTERS_ADMISSION, DK_AAU_FINANCE_FEES],
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
          [b('For a September start, DTU’s own page sets 15 January as the non-EU application deadline (and the deadline to meet English-language requirements); the University of Copenhagen’s own page confirms 15 January for non-EU applicants; Aarhus University’s own page sets the same 15 January deadline for its summer (August/September) intake; and Aalborg University’s own page sets 15 January for fee-paying (non-EU) applicants to its September intake (non-fee-paying, mostly EU/EEA, applicants have a later 1 March deadline there). For a February/spring start, DTU’s own page sets 15 September as the non-EU deadline, and Aarhus University’s own page sets 15 October for its winter intake, available only for a limited number of programmes.', 'একটি September শুরুর জন্য, DTU-এর নিজের page non-EU application deadline (আর English-language শর্ত পূরণের deadline) হিসেবে 15 January ঠিক করে; University of Copenhagen-এর নিজের page non-EU আবেদনকারীদের জন্য 15 January নিশ্চিত করে; Aarhus University-র নিজের page তার summer (August/September) intake-এর জন্য একই 15 January deadline ঠিক করে; আর Aalborg University-র নিজের page তার September intake-এর fee-paying (non-EU) আবেদনকারীদের জন্য 15 January ঠিক করে (non-fee-paying, মূলত EU/EEA, আবেদনকারীদের সেখানে পরে 1 March deadline আছে)। একটি February/spring শুরুর জন্য, DTU-এর নিজের page non-EU deadline হিসেবে 15 September ঠিক করে, আর Aarhus University-র নিজের page তার winter intake-এর জন্য 15 October ঠিক করে, যা শুধু সীমিত সংখ্যক programme-এ পাওয়া যায়।')],
          [DK_DTU_DEADLINES, DK_KU_MASTERS_DEADLINES, DK_AU_DEADLINES, DK_AAU_FINANCE_FEES],
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
          b('How much IELTS do you need for a Master’s?', 'Master\'s-এ IELTS কত লাগে?'),
          [b('Not a single national minimum — DTU’s own page states IELTS Academic 6.5 (or TOEFL equivalent) by the application deadline for its MSc programmes; other universities and other programmes set their own requirements, so always confirm directly with your own chosen programme.', 'একক জাতীয় ন্যূনতম না — DTU-এর নিজের page তার MSc programme-এর জন্য application deadline-এর মধ্যে IELTS Academic 6.5 (বা সমতুল্য TOEFL) বলে; অন্য university আর অন্য programme নিজস্ব শর্ত ঠিক করে, তাই সবসময় সরাসরি আপনার নিজের বাছা programme-এর সাথে নিশ্চিত করুন।')],
          [DK_DTU_ENGLISH],
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
          b("How much is a Master's in Denmark?", "Denmark-এ Master's-এ খরচ কত?"),
          [b('Tuition varies sharply by university and programme, unlike Austria’s single national figure. DTU charges EUR 7,500 per semester (EUR 30,000 total for a 2-year MSc); CBS charges EUR 8,000 per semester (EUR 16,000/year); and Aalborg University’s own 2026 rate table lists DKK 27,800/semester (about EUR 3,725) for programmes such as Economics and Business Administration up to DKK 57,850/semester (about EUR 7,745) for most engineering, science and medical programmes. The University of Copenhagen’s own page states tuition is set per programme, selected on its own tuition-fee page, rather than a flat university-wide rate.', 'Austria-র একক জাতীয় সংখ্যার মতো না, tuition university আর programme অনুযায়ী ব্যাপকভাবে আলাদা হয়। DTU প্রতি semester-এ EUR 7,500 চার্জ করে (একটি 2-year MSc-এর জন্য সর্বমোট EUR 30,000); CBS প্রতি semester-এ EUR 8,000 চার্জ করে (EUR 16,000/year); আর Aalborg University-র নিজের 2026 rate table Economics and Business Administration-এর মতো programme-এর জন্য DKK 27,800/semester (প্রায় EUR 3,725) থেকে অধিকাংশ engineering, science, আর medical programme-এর জন্য DKK 57,850/semester (প্রায় EUR 7,745) পর্যন্ত fee তালিকাভুক্ত করে। University of Copenhagen-এর নিজের page বলে tuition প্রতি programme অনুযায়ী ঠিক হয়, তার নিজের tuition-fee page-এ বাছাই করে দেখতে হয়, একটি flat university-wide rate না।'), CHECK_UNI],
          [DK_DTU_FEES, DK_CBS_MASTERS_ADMISSION, DK_AAU_FINANCE_FEES, DK_KU_TUITION],
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
  card: b('PhD positions are usually paid employment, not fee-paying study · unaffected by the 1 October 2026 job-seeking-permit cut: PhD graduates still get up to 3 years · same SIRI residence-permit process', 'PhD position সাধারণত বেতনভুক্ত চাকরি, fee-paying পড়া না · 1 October 2026-এর job-seeking-permit কমানোর প্রভাব নেই: PhD গ্র্যাজুয়েটরা এখনো 3 বছর পর্যন্ত পান · একই SIRI residence-permit process'),
  intro: b(
    'Admission requirements for a PhD at a Danish university (a relevant Master’s, acceptance by a specific supervisor or doctoral school, a research proposal) are set at faculty or programme level, not nationally, and were not itemized in detail on the official pages read for this guide. What this guide can confirm nationally is on the immigration side: SIRI’s own page and its 30 September 2026 notice both state that PhD students are not affected by the 1 October 2026 rule change — they are still generally granted a 3-year job-seeking permit after completing their PhD, and (unlike bachelor’s/master’s students applying from that date) their accompanying family members can still be granted a residence permit. As with other degree levels, Bangladeshi applicants need Denmark’s student residence and work permit through SIRI once admitted.',
    'একটি Danish university-তে PhD-র ভর্তির শর্ত (একটি সম্পর্কিত Master\'s, একটি নির্দিষ্ট supervisor বা doctoral school দ্বারা গ্রহণ, একটি research proposal) জাতীয়ভাবে না, faculty বা programme level-এ ঠিক হয়, আর এই guide-এর জন্য পড়া official page-এ বিস্তারিতভাবে তালিকাভুক্ত হয়নি। Immigration-এর দিকে এই guide যা জাতীয়ভাবে নিশ্চিত করতে পারে তা হলো: SIRI-এর নিজের page আর তার 30 September 2026-এর notice দুটোই বলে PhD student-রা 1 October 2026-এর নিয়ম পরিবর্তনে প্রভাবিত হন না — তারা এখনো PhD শেষ করার পর সাধারণত একটি 3-year job-seeking permit পান, আর (সেই তারিখ থেকে আবেদন করা bachelor\'s/master\'s student-দের মতো না) তাদের accompanying family member এখনো একটি residence permit পেতে পারেন। অন্য degree level-এর মতোই, Bangladeshi আবেদনকারীদের ভর্তি হলে SIRI-এর মাধ্যমে Denmark-এর student residence আর work permit লাগে।',
  ),
  costs: { official: [VISA_FEE_COST], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Denmark?', 'Denmark-এ কীভাবে PhD পাওয়া যায়?'),
          [
            b('Not verified yet as general national rules: apply directly to a specific PhD position or supervisor at your chosen Danish university, with a relevant Master’s degree — exact admission requirements (research proposal, interview, minimum grades) are set at faculty or programme level, not nationally, and were not itemized in detail on the official pages read for this guide. PhD positions in Denmark are commonly structured as paid employment (a salaried position) rather than fee-paying enrolment, but this guide could not independently confirm this as a universal rule from a single official immigration or education source, so it is shown as general guidance rather than a confirmed fact.', 'সাধারণ জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: আপনার বাছা Danish university-তে একটি সম্পর্কিত Master\'s degree নিয়ে সরাসরি একটি নির্দিষ্ট PhD position বা supervisor-কে আবেদন করুন — সঠিক ভর্তির শর্ত (research proposal, interview, ন্যূনতম grade) জাতীয়ভাবে না, faculty বা programme level-এ ঠিক হয়, আর এই guide-এর জন্য পড়া official page-এ বিস্তারিতভাবে তালিকাভুক্ত হয়নি। Denmark-এ PhD position সাধারণত বেতনভুক্ত চাকরি (একটি salaried position) হিসেবে গঠিত হয়, fee-paying ভর্তি না, কিন্তু এই guide একটি একক official immigration বা education source থেকে এটা একটি সর্বজনীন নিয়ম হিসেবে স্বাধীনভাবে নিশ্চিত করতে পারেনি, তাই এটা একটি নিশ্চিত fact-এর পরিবর্তে general guidance হিসেবে দেখানো হয়েছে।'),
            CHECK_UNI,
          ],
          [DK_SIRI_HIGHER_ED],
          { status: 'not-verified' },
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
          [b('Not verified yet as a single general rule: each PhD programme or supervisor states its own language expectations, which were not itemized nationally on the pages read for this guide.', 'সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: প্রতিটি PhD programme বা supervisor নিজের ভাষার প্রত্যাশা দেয়, যা এই guide-এর জন্য পড়া page-এ জাতীয়ভাবে তালিকাভুক্ত হয়নি।')],
          [DK_DTU_ENGLISH],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ the country

export const DK_GUIDE: CountryGuide = {
  code: 'DK',
  checkedAt: DK_READ,
  sourcesPerSection: true,
  intro: b(
    'Denmark is an EU/EEA and full Schengen member — but Bangladesh is not, so a Bangladeshi applicant is a "third-country national" under Danish law and needs Denmark’s own student residence and work permit, processed by SIRI (the Danish Agency for International Recruitment and Integration) and applied for through a Danish diplomatic mission or application centre in the applicant’s country of residence (for Bangladesh, the Royal Danish Embassy in Dhaka handles Danish visa and representation matters, per the Ministry of Foreign Affairs’ own um.dk page — though this guide could not independently confirm from an official SIRI/nyidanmark.dk source that this specific mission processes the student residence permit as opposed to short-stay Schengen visas, so this is a strong inference, not a directly confirmed fact). SIRI’s own page states normal processing takes 2 months (up to 3 if more documents are needed), for a DKK 3,060 fee, and sets a specific financial-proof figure: DKK 7,426 of disposable funds per month (2026 level), up to a maximum of DKK 89,112 for 12 months or more. A crucial, recent change: SIRI’s own 30 September 2026 notice states that for third-country students in state-approved bachelor’s/master’s-level programmes who apply on or after 1 October 2026, the post-study "job seeking" residence permit was cut from 3 years to 6 months or 1 year, and their accompanying family members can no longer be granted a residence permit at all — PhD students are entirely unaffected and keep the 3-year job-seeking permit and family-member rights. During study, students in state-approved programmes can work 90 hours a month during term (September–May) and full-time in June–August, with a limited work permit granted alongside the residence permit — but students in non-state-approved programmes who applied on or after 2 May 2025 get no work permit at all. Once you have a Danish CPR number, health insurance is covered by the Danish state (confirmed by Aarhus University’s own page and the official Lifeindenmark.dk portal), rather than a separate compulsory private product. Tuition is never a single national figure, unlike Austria: Study in Denmark’s own country-wide range is EUR 6,000–16,000 a year, but real university figures span from about EUR 3,725/semester (some Aalborg University programmes) to EUR 16,000/year (CBS). The "Danish Government Scholarship" is university-administered, automatic for eligible non-EU/EEA applicants, and names no specific country, including Bangladesh — Aalborg University’s own page states it awards only about 15 a year and advises against relying on one. This guide is built from New to Denmark/nyidanmark.dk (SIRI), the official Study in Denmark portal (studyindenmark.dk), the Ministry of Foreign Affairs’ Bangladesh mission page (um.dk) and university pages.',
    'Denmark EU/EEA আর একটি পূর্ণ Schengen সদস্য — কিন্তু Bangladesh না, তাই একজন Bangladeshi আবেদনকারী Danish আইনের অধীনে একজন "third-country national", আর তার SIRI (Danish Agency for International Recruitment and Integration) দ্বারা প্রক্রিয়াকৃত আর আবেদনকারীর বসবাসের দেশে একটি Danish diplomatic mission বা application centre-এর মাধ্যমে আবেদন করা Denmark-এর নিজের student residence আর work permit লাগে (Bangladesh-এর জন্য, Ministry of Foreign Affairs-এর নিজের um.dk page অনুযায়ী, Royal Danish Embassy in Dhaka Danish visa আর representation বিষয় দেখে — যদিও এই guide একটি official SIRI/nyidanmark.dk source থেকে স্বাধীনভাবে নিশ্চিত করতে পারেনি যে এই বিশেষ mission short-stay Schengen visa-র বিপরীতে student residence permit প্রক্রিয়া করে, তাই এটা একটি জোরালো অনুমান, একটি সরাসরি নিশ্চিত fact না)। SIRI-এর নিজের page বলে স্বাভাবিক processing 2 মাস নেয় (আরো document লাগলে 3 মাস পর্যন্ত), একটি DKK 3,060 fee-র জন্য, আর একটি নির্দিষ্ট financial-proof সংখ্যা ঠিক করে: মাসে DKK 7,426 disposable funds (2026 level), 12 মাস বা তার বেশির জন্য সর্বোচ্চ DKK 89,112 পর্যন্ত। একটি গুরুত্বপূর্ণ, সাম্প্রতিক পরিবর্তন: SIRI-এর নিজের 30 September 2026-এর notice বলে state-approved bachelor\'s/master\'s-level programme-এর third-country student যারা 1 October 2026 বা তার পরে আবেদন করেন, তাদের পড়া-পরবর্তী "job seeking" residence permit 3 বছর থেকে 6 মাস বা 1 বছরে কমানো হয়েছে, আর তাদের accompanying family member আর কোনো residence permit পেতে পারেন না — PhD student-রা সম্পূর্ণভাবে প্রভাবিত হন না আর 3-year job-seeking permit আর family-member অধিকার বজায় রাখেন। পড়ার সময়, state-approved programme-এর student-রা term-এ (September–May) মাসে 90 ঘণ্টা কাজ করতে পারেন আর June–August-এ full-time, residence permit-এর সঙ্গে একটি limited work permit দেওয়া হয় — কিন্তু non-state-approved programme-এর student যারা 2 May 2025 বা তার পরে আবেদন করেছেন তারা কোনো work permit পান না। একবার আপনার একটি Danish CPR number থাকলে, health insurance Danish state কভার করে (Aarhus University-র নিজের page আর official Lifeindenmark.dk portal দ্বারা নিশ্চিত), একটি আলাদা বাধ্যতামূলক private পণ্য না। Tuition কখনো একটি একক জাতীয় সংখ্যা না, Austria-র মতো না: Study in Denmark-এর নিজের দেশব্যাপী range বছরে EUR 6,000–16,000, কিন্তু আসল university সংখ্যা প্রায় EUR 3,725/semester (কিছু Aalborg University programme) থেকে EUR 16,000/year (CBS) পর্যন্ত বিস্তৃত। "Danish Government Scholarship" university-administered, যোগ্য non-EU/EEA আবেদনকারীদের জন্য স্বয়ংক্রিয়, আর Bangladesh সহ কোনো নির্দিষ্ট দেশের নাম দেয় না — Aalborg University-র নিজের page বলে তারা বছরে শুধু প্রায় 15টা দেয় আর একটার উপর নির্ভর না করার পরামর্শ দেয়। এই guide New to Denmark/nyidanmark.dk (SIRI), official Study in Denmark portal (studyindenmark.dk), Ministry of Foreign Affairs-এর Bangladesh mission page (um.dk), আর university page থেকে তৈরি।',
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [DK_SIRI_HIGHER_ED, DK_SIRI_NEW_RULES_2026, DK_SID_TUITION],
      {
        kind: 'guidance',
        list: [
          b('Assuming Denmark’s EU/Schengen membership means a simplified visa process for Bangladeshi applicants — Bangladesh is not EU/EEA, so a Bangladeshi applicant is a third-country national and needs the full SIRI student residence-permit process.', 'ধরে নেওয়া যে Denmark-এর EU/Schengen সদস্যতা Bangladeshi আবেদনকারীদের জন্য একটি সরলীকৃত visa process মানে — Bangladesh EU/EEA না, তাই একজন Bangladeshi আবেদনকারী একজন third-country national আর পূর্ণ SIRI student residence-permit process লাগে।'),
          b('Assuming the job-seeking permit is still 3 years for bachelor’s/master’s graduates — SIRI’s own 30 September 2026 notice cut this to 6 months or 1 year for anyone applying on or after 1 October 2026; only PhD graduates keep the 3-year permit.', 'ধরে নেওয়া যে bachelor\'s/master\'s গ্র্যাজুয়েটদের জন্য job-seeking permit এখনো 3 বছর — SIRI-এর নিজের 30 September 2026-এর notice 1 October 2026 বা তার পরে আবেদন করা কারো জন্য এটা 6 মাস বা 1 বছরে কমিয়েছে; শুধু PhD গ্র্যাজুয়েটরা 3-year permit বজায় রাখেন।'),
          b('Assuming you automatically get a work permit whatever your programme — only state-approved programmes carry the 90-hours/month work permit; a non-state-approved programme with a residence permit applied for on or after 2 May 2025 gets none at all.', 'ধরে নেওয়া যে আপনার programme যাই হোক, স্বয়ংক্রিয়ভাবে একটি work permit পাবেন — শুধু state-approved programme-এ মাসে 90-ঘণ্টার work permit থাকে; 2 May 2025 বা তার পরে আবেদন করা residence permit থাকা একটি non-state-approved programme-এ কোনোটাই পাওয়া যায় না।'),
          b('Assuming tuition is a single national figure the way Austria fixes it — Danish public universities each set their own non-EU/EEA tuition per programme, ranging from about EUR 3,725/semester to EUR 16,000/year across the examples in this guide.', 'ধরে নেওয়া যে Austria যেভাবে ঠিক করে, tuition একটি একক জাতীয় সংখ্যা — Danish public university-গুলো প্রতিটি নিজের non-EU/EEA tuition প্রতি programme অনুযায়ী ঠিক করে, এই guide-এর উদাহরণে প্রায় EUR 3,725/semester থেকে EUR 16,000/year পর্যন্ত বিস্তৃত।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in Denmark from Bangladesh?", "Bangladesh থেকে Denmark-এ Bachelor's পড়তে কী কী লাগে?"), [b('A secondary-school qualification your chosen university assesses for equivalence to the Danish upper-secondary exam, the English or Danish proficiency the programme is taught in, an online application by 15 March (12:00 CET) for foreign qualifications at most universities, a non-EU/EEA application fee, and — since Bangladesh is not EU/EEA — Denmark’s student residence and work permit through SIRI.', 'আপনার বাছা university দ্বারা Danish upper-secondary exam-এর সমতুল্য মূল্যায়িত একটি secondary-school যোগ্যতা, programme যে ভাষায় (English বা Danish) পড়ানো হয় তার দক্ষতা, অধিকাংশ university-তে বিদেশি যোগ্যতার জন্য 15 March (12:00 CET)-এর মধ্যে একটি online application, একটি non-EU/EEA application fee, আর — Bangladesh EU/EEA না হওয়ায় — SIRI-এর মাধ্যমে Denmark-এর student residence আর work permit।')], [DK_KU_BACHELOR, DK_SIRI_HIGHER_ED], { status: 'partly-verified' }),
    qa('hsc', b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'), [b('Not verified yet as a single rule — your HSC certificate must be assessed by your chosen institution for equivalence to the Danish upper-secondary exam; CBS’s own "appraisal" service can check this before you apply. A dedicated nationwide HSC-grade-conversion rule was not found on an official page for this guide.', 'একক নিয়ম হিসেবে এখনো যাচাই হয়নি — আপনার HSC সনদ আপনার বাছা institution দ্বারা Danish upper-secondary exam-এর সমতুল্য হিসেবে মূল্যায়ন করতে হয়; CBS-এর নিজের "appraisal" service এটা আবেদনের আগে চেক করতে পারে। এই guide-এর জন্য একটি নির্দিষ্ট জাতীয় HSC-grade-conversion নিয়ম কোনো official page-এ পাওয়া যায়নি।')], [DK_CBS_BACHELOR_ADMISSION], { status: 'not-verified' }),
    qa('cost', b('How much does it cost to study in Denmark?', 'Denmark-এ পড়াশোনার খরচ কত?'), [b('Not a single national figure: Study in Denmark’s own range is EUR 6,000–16,000 a year for full-degree students, but real examples range from about EUR 3,725/semester (some Aalborg University programmes) to EUR 16,000/year (CBS’s master’s programmes) — plus the DKK 3,060 residence-permit fee.', 'একটি একক জাতীয় সংখ্যা না: Study in Denmark-এর নিজের range full-degree student-দের জন্য বছরে EUR 6,000–16,000, কিন্তু আসল উদাহরণ প্রায় EUR 3,725/semester (কিছু Aalborg University programme) থেকে EUR 16,000/year (CBS-এর master\'s programme) পর্যন্ত বিস্তৃত — সঙ্গে DKK 3,060 residence-permit fee।')], [DK_SID_TUITION], { status: 'verified' }),
    qa('ielts', b('How much IELTS do you need for Denmark?', 'Denmark-এ IELTS কত লাগে?'), [b('Not a single national minimum; DTU’s own page states IELTS Academic 6.5 for its MSc programmes, but each university and programme sets its own requirement — always check your own institution.', 'একক জাতীয় ন্যূনতম না; DTU-এর নিজের page তার MSc programme-এর জন্য IELTS Academic 6.5 বলে, কিন্তু প্রতিটি university আর programme নিজস্ব শর্ত ঠিক করে — সবসময় আপনার নিজের institution দেখুন।')], [DK_DTU_ENGLISH], { status: 'partly-verified' }),
    qa('visa', b('What do you need for the student residence permit?', 'Student residence permit-এর জন্য কী কী লাগে?'), [b('A residence-and-work-permit application through SIRI, with your passport, admission confirmation, proof of sufficient funds (DKK 7,426/month, 2026 level) and recorded biometric features — SIRI’s own page says the decision normally takes 2 months (up to 3 if more documents are needed), plus a DKK 3,060 fee.', 'SIRI-এর মাধ্যমে একটি residence-and-work-permit application, আপনার passport, admission confirmation, যথেষ্ট funds-এর প্রমাণ (মাসে DKK 7,426, 2026 level), আর রেকর্ড করা biometric feature সহ — SIRI-এর নিজের page বলে সিদ্ধান্তে স্বাভাবিকভাবে 2 মাস লাগে (বেশি document লাগলে 3 মাস পর্যন্ত), সঙ্গে একটি DKK 3,060 fee।')], [DK_SIRI_HIGHER_ED]),
    qa('work', b('Can you work while studying in Denmark?', 'Denmark-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b('Yes, if your programme is state-approved: 90 hours a month during term (September–May) and full-time in June–August, with a limited work permit granted alongside your residence permit. Non-state-approved programmes with a residence permit applied for on or after 2 May 2025 get no work permit at all.', 'হ্যাঁ, আপনার programme state-approved হলে: term-এ (September–May) মাসে 90 ঘণ্টা আর June–August-এ full-time, আপনার residence permit-এর সঙ্গে একটি limited work permit দেওয়া হয়। 2 May 2025 বা তার পরে আবেদন করা residence permit থাকা non-state-approved programme কোনো work permit পায় না।')], [DK_SIRI_HIGHER_ED]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('No comparable, centrally-run full-degree scholarship naming Bangladesh was found — the Danish Government Scholarship is awarded by individual universities to a limited number of highly qualified non-EU/EEA applicants (around 15 a year at Aalborg University, for example), with automatic consideration but no guarantee.', 'Bangladesh-কে নাম দেওয়া একটি সমতুল্য, কেন্দ্রীয়ভাবে পরিচালিত full-degree scholarship পাওয়া যায়নি — Danish Government Scholarship individual university দ্বারা highly qualified non-EU/EEA আবেদনকারীদের সীমিত সংখ্যাকে দেওয়া হয় (উদাহরণস্বরূপ, Aalborg University-তে বছরে প্রায় 15টা), স্বয়ংক্রিয় বিবেচনা সহ কিন্তু কোনো গ্যারান্টি ছাড়া।')], [DK_SID_SCHOLARSHIPS, DK_AAU_FINANCE_FEES], { status: 'partly-verified' }),
    qa('after', b('Can you stay in Denmark after graduating?', 'পড়া শেষে Denmark-এ থাকা যায়?'), [b('Yes, with a job-seeking residence permit — but SIRI’s own 30 September 2026 notice cut this from 3 years to 6 months or 1 year for bachelor’s/master’s graduates who apply on or after 1 October 2026; PhD graduates are unaffected and keep the 3-year permit.', 'হ্যাঁ, একটি job-seeking residence permit দিয়ে — কিন্তু SIRI-এর নিজের 30 September 2026-এর notice 1 October 2026 বা তার পরে আবেদন করা bachelor\'s/master\'s গ্র্যাজুয়েটদের জন্য এটা 3 বছর থেকে 6 মাস বা 1 বছরে কমিয়েছে; PhD গ্র্যাজুয়েটরা প্রভাবিত হন না আর 3-year permit বজায় রাখেন।')], [DK_SIRI_HIGHER_ED, DK_SIRI_NEW_RULES_2026]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('A single official figure: DKK 7,426 of disposable funds per month (2026 level), up to a maximum of DKK 89,112 for 12 months or more, shown by a bank statement, scholarship/loan documentation, or your first paid semester’s tuition.', 'একটি একক official সংখ্যা: মাসে DKK 7,426 disposable funds (2026 level), 12 মাস বা তার বেশির জন্য সর্বোচ্চ DKK 89,112 পর্যন্ত, একটি bank statement, scholarship/loan documentation, বা আপনার প্রথম পরিশোধিত semester-এর tuition দিয়ে দেখাতে হয়।')], [DK_SIRI_HIGHER_ED], { status: 'verified' }),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before the residence-permit stage: admission confirmation, language proficiency. At the residence-permit stage: a passport, proof of sufficient funds, and recorded biometric features. After arrival: CPR registration and the health insurance ("yellow") card.', 'Residence-permit পর্যায়ের আগে: admission confirmation, ভাষার দক্ষতা। Residence-permit পর্যায়ে: একটি passport, যথেষ্ট funds-এর প্রমাণ, আর রেকর্ড করা biometric feature। পৌঁছানোর পর: CPR registration আর health insurance ("yellow") card।')], [DK_SIRI_HIGHER_ED]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b('A relevant Bachelor’s degree, assessed per programme; most non-EU deadlines for a September start cluster around 15 January (University of Copenhagen, DTU, Aarhus University, and Aalborg University’s fee-paying route).', 'প্রতি programme অনুযায়ী মূল্যায়িত একটি সম্পর্কিত Bachelor\'s degree; September শুরুর জন্য অধিকাংশ non-EU deadline 15 January-এর কাছে জমে ওঠে (University of Copenhagen, DTU, Aarhus University, আর Aalborg University-র fee-paying route)।')], [DK_DTU_DEADLINES, DK_KU_MASTERS_DEADLINES]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Not verified yet as general national rules: usually a relevant Master’s degree and acceptance by a specific supervisor or doctoral school, whose exact requirements are set at faculty level, not nationally, and were not itemized in detail on the pages read for this guide.', 'সাধারণ জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: সাধারণত একটি সম্পর্কিত Master\'s degree আর একটি নির্দিষ্ট supervisor বা doctoral school দ্বারা গ্রহণ, যার সঠিক শর্ত জাতীয়ভাবে না, faculty level-এ ঠিক হয়, আর এই guide-এর জন্য পড়া page-এ বিস্তারিতভাবে তালিকাভুক্ত হয়নি।')], [DK_SIRI_HIGHER_ED], { status: 'not-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — Aalborg University, Aarhus University, Copenhagen Business School, DTU and the University of Copenhagen — are listed alphabetically by English name, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — Aalborg University, Aarhus University, Copenhagen Business School, DTU, আর University of Copenhagen — তাদের ইংরেজি নাম অনুযায়ী বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [DK_KU_TUITION]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: the Ministry of Foreign Affairs’ own um.dk page confirms the Royal Danish Embassy in Dhaka is Denmark’s diplomatic mission in Bangladesh and handles Danish visa matters there — though this guide could not independently confirm from a SIRI/nyidanmark.dk source that student residence-permit applications (as opposed to short-stay Schengen visas) are specifically processed or received there, so this is a strong inference, not a directly confirmed fact. No official page read for this guide names Bangladesh individually for the Danish Government Scholarship, gives a Bangladeshi-HSC-specific grade-conversion formula, or states a Bangladesh-specific visa approval/refusal rate — these are not verified here.', 'Bangladesh-এর জন্য যাচাই করা: Ministry of Foreign Affairs-এর নিজের um.dk page নিশ্চিত করে Royal Danish Embassy in Dhaka Bangladesh-এ Denmark-এর diplomatic mission আর সেখানে Danish visa বিষয় দেখে — যদিও এই guide একটি SIRI/nyidanmark.dk source থেকে স্বাধীনভাবে নিশ্চিত করতে পারেনি যে student residence-permit application (short-stay Schengen visa-র বিপরীতে) বিশেষভাবে সেখানে প্রক্রিয়া বা গ্রহণ করা হয়, তাই এটা একটি জোরালো অনুমান, একটি সরাসরি নিশ্চিত fact না। এই guide-এর জন্য পড়া কোনো official page Danish Government Scholarship-এর জন্য Bangladesh-কে আলাদাভাবে নাম দেয় না, একটি Bangladeshi-HSC-specific grade-conversion formula দেয় না, বা একটি Bangladesh-specific visa approval/refusal rate বলে না — এগুলো এখানে যাচাই হয়নি।'),
    ], [DK_UM_BANGLADESH, DK_UM_BANGLADESH_VISA], { status: 'partly-verified' }),
  ],
  life: [
    qa('arrival', b('What happens when you arrive?', 'পৌঁছানোর পর কী হয়?'), [b('Register your residence with your municipality’s Citizen Service (or an International Citizen Service centre) to get a CPR number — Lifeindenmark.dk’s own page states this also issues your health insurance card ("the yellow card"), after which health insurance is covered by the Danish state. Keep your Danish address and do not stay abroad for more than 6 successive months, or your permit lapses, per SIRI’s own page.', 'আপনার municipality-র Citizen Service (বা একটি International Citizen Service centre)-এ আপনার residence register করুন একটি CPR number পাওয়ার জন্য — Lifeindenmark.dk-এর নিজের page বলে এটা আপনার health insurance card ("the yellow card")-ও ইস্যু করে, তারপর health insurance Danish state কভার করে। আপনার Danish address বজায় রাখুন আর 6 ধারাবাহিক মাসের বেশি বিদেশে থাকবেন না, না হলে SIRI-এর নিজের page অনুযায়ী আপনার permit lapse হয়ে যায়।')], [DK_LIFEINDENMARK_ARRIVE, DK_SIRI_HIGHER_ED]),
  ],
  documents: DK_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'estimate', status: 'partly-verified', value: { min: 6000, max: 16000, unit: 'EUR/year (country-wide range; varies sharply by university and programme)', text: b('EUR 6,000–16,000/year, a country-wide range — not a single fixed figure as in Austria.', 'EUR 6,000–16,000/year, একটি দেশব্যাপী range — Austria-র মতো একটি একক নির্দিষ্ট সংখ্যা না।') }, source: DK_SID_TUITION },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 7426, max: 7426, unit: 'DKK/month (2026 level; max DKK 89,112 for 12+ months)', text: b('DKK 7,426 per month (2026 level), up to a maximum of DKK 89,112 for 12 months or more.', 'মাসে DKK 7,426 (2026 level), 12 মাস বা তার বেশির জন্য সর্বোচ্চ DKK 89,112 পর্যন্ত।') }, source: DK_SIRI_HIGHER_ED },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { min: 90, max: 90, unit: 'hours/month during term (state-approved programmes only; full-time June–August)', text: b('90 hours/month during term (September–May) and full-time in June–August, for state-approved programmes only.', 'Term-এ (September–May) মাসে 90 ঘণ্টা আর June–August-এ full-time, শুধু state-approved programme-এ।') }, source: DK_SIRI_HIGHER_ED },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { min: 6, max: 12, unit: 'months (job-seeking permit for bachelor’s/master’s graduates applying on or after 1 Oct 2026; PhD graduates keep 3 years = 36 months)', text: b('6 months or 1 year for bachelor’s/master’s graduates applying on or after 1 October 2026 (3 years for PhD graduates, unaffected by the change).', '1 October 2026 বা তার পরে আবেদন করা bachelor\'s/master\'s গ্র্যাজুয়েটদের জন্য 6 মাস বা 1 বছর (PhD গ্র্যাজুয়েটদের জন্য 3 বছর, পরিবর্তনে অপ্রভাবিত)।') }, source: DK_SIRI_NEW_RULES_2026 },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 3060, max: 3060, unit: 'DKK (one-time, SIRI processing fee)', text: b('DKK 3,060, a one-time SIRI processing fee.', 'DKK 3,060, একটি one-time SIRI processing fee।') }, source: DK_SIRI_HIGHER_ED },
  ],
};

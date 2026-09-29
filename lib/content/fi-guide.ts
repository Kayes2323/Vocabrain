import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  FI_ADMISSIONS,
  FI_AFTER,
  FI_APP_FEE,
  FI_EMB_RP,
  FI_EMB_VERIFY,
  FI_FUNDING,
  FI_INCOME,
  FI_INSURANCE,
  FI_JOINT_2026,
  FI_PERMIT,
  FI_READ,
  FI_UH_FEES,
} from './fi-sources';

/**
 * Finland reading guide, researched on its own from Finnish official sources
 * (Migri, Finland abroad: Bangladesh, Studyinfo.fi, Study in Finland and
 * university pages). Nothing is taken from another country's guide. Amounts
 * stay in euros (EUR) and are never converted. It covers English-taught
 * programmes for non-EU/EEA (Bangladeshi) students.
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
  'Requirements are not the same for every Finnish programme: each university and programme sets its own, including English test scores and entrance exams. Always check the programme on Studyinfo.fi and the university page.',
  'সব Finnish programme-এ শর্ত এক নয়: প্রতিটি university আর programme নিজের শর্ত ঠিক করে, English test score আর entrance exam-সহ। Studyinfo.fi-তে programme আর university-র page অবশ্যই দেখে নিন।',
);

// ------------------------------------------------------------------ shared answers

const permit = (id: string) =>
  qa(
    id,
    b('What do you need for a Finnish residence permit for studies?', 'Finland-এর পড়ার residence permit-এর জন্য কী কী লাগে?'),
    [
      b(
        'Admission to a Finnish institution for studies that end in a degree, proof that the tuition fee is paid (or a scholarship), at least EUR 800 a month for living — for studies of a year or longer, EUR 9,600 must be in your bank account when you apply — and private insurance covering medical and medicine costs. The processing fee is EUR 600 online (EUR 750 on paper). Higher-education degree students get a continuous (A) permit.',
        'Finland-এর প্রতিষ্ঠানে degree-র জন্য ভর্তি, tuition fee দেওয়ার প্রমাণ (বা scholarship), থাকার জন্য মাসে অন্তত EUR 800 — এক বছর বা বেশি পড়লে আবেদনের সময় bank account-এ EUR 9,600 থাকতে হবে — আর চিকিৎসা ও ওষুধের খরচ কভার করা private insurance। Processing fee online-এ EUR 600 (কাগজে EUR 750)। Higher education degree-র student-রা ধারাবাহিক (A) permit পান।',
      ),
      b(
        'From Bangladesh: apply in Migri\'s online service Enter Finland, then book an appointment and prove your identity with your passport at the VFS Global Application Centre in New Delhi (India), where you also pay the fee. Documents of Bangladeshi origin to be legalised by the Embassy must first be verified by VFS Global (from 3 November 2025).',
        'Bangladesh থেকে: Migri-র online service Enter Finland-এ আবেদন, তারপর appointment নিয়ে New Delhi (India)-র VFS Global Application Centre-এ passport দিয়ে পরিচয় প্রমাণ করতে হয়, fee-ও সেখানে দিতে হয়। দূতাবাস যেসব Bangladesh-এর document সত্যায়ন করবে, সেগুলো আগে VFS Global-কে দিয়ে যাচাই করাতে হয় (৩ November 2025 থেকে)।',
      ),
    ],
    [FI_PERMIT, FI_INCOME, FI_EMB_RP, FI_EMB_VERIFY],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [b('At least EUR 800 a month. If your studies last one year or longer, you must have EUR 9,600 in your bank account when you submit the application (proof for the first year); if they are shorter, EUR 800 for each month. If tuition is paid later, that amount must also be in your account. If your institution gives free accommodation, the requirement is EUR 400 a month (EUR 270 with free meals too).', 'মাসে অন্তত EUR 800। পড়া এক বছর বা বেশি হলে আবেদন জমার সময় bank account-এ EUR 9,600 থাকতে হবে (প্রথম বছরের প্রমাণ); কম হলে প্রতি মাসের জন্য EUR 800। Tuition পরে দিলে সেই টাকাও account-এ থাকতে হবে। প্রতিষ্ঠান বিনা খরচে বাসা দিলে শর্ত মাসে EUR 400 (বিনা খরচে খাবারও দিলে EUR 270)।')],
    [FI_INCOME, FI_PERMIT],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Finland?', 'Finland-এ পড়ার পাশাপাশি কাজ করা যায়?'),
    [b('Yes: with a residence permit for studies you may work in any field for an average of 30 hours a week (120 hours a month or 1,560 hours a year on average). Some weeks can be longer, and you may work full-time in holidays, as long as the yearly average stays within the limit. Internships and thesis work agreed as part of your studies are not limited.', 'হ্যাঁ: পড়ার residence permit নিয়ে যেকোনো ক্ষেত্রে গড়ে সপ্তাহে ৩০ ঘণ্টা কাজ করা যায় (গড়ে মাসে ১২০ বা বছরে ১,৫৬০ ঘণ্টা)। কোনো সপ্তাহে বেশি হতে পারে, ছুটিতে full-time-ও করা যায়, যদি বছরের গড় সীমার মধ্যে থাকে। পড়ার অংশ হিসেবে চুক্তি করা internship আর thesis-এর কাজে সীমা নেই।')],
    [FI_PERMIT, FI_INCOME],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Finland after graduating?', 'পড়া শেষে Finland-এ থাকা যায়?'),
    [b('Yes: after graduating you can apply for a residence permit to look for work or start a business, for up to two years. You can take it in up to three parts of at least six months each, within three years. Apply before your current permit expires (as an extended permit, EUR 230 online), or later as a first permit within five years of your study permit expiring (EUR 750 online). It does not promise permanent residence.', 'হ্যাঁ: graduation-এর পর কাজ খোঁজা বা ব্যবসা শুরুর জন্য সর্বোচ্চ দুই বছরের residence permit-এর আবেদন করা যায়। এটা তিন বছরের মধ্যে সর্বোচ্চ তিন ভাগে নেওয়া যায়, প্রতিটি অন্তত ছয় মাস। বর্তমান permit শেষ হওয়ার আগে আবেদন (extended permit হিসেবে, online-এ EUR 230), বা পরে study permit শেষের পাঁচ বছরের মধ্যে প্রথম permit হিসেবে (online-এ EUR 750)। এটা স্থায়ী বসবাসের নিশ্চয়তা দেয় না।')],
    [FI_AFTER],
    { allDegrees: true },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('What insurance do you need?', 'কী insurance লাগে?'),
    [b('Private insurance that covers medical and medicine expenses, valid when you arrive and for your studies. The excess may not be more than EUR 300, and if your studies last at least two years, the insurance must cover medicine costs up to EUR 40,000. Attach the insurance certificate to your application.', 'চিকিৎসা আর ওষুধের খরচ কভার করা private insurance, পৌঁছানোর সময় থেকে আর পড়ার সময় জুড়ে বৈধ। Excess EUR 300-এর বেশি হতে পারবে না, আর পড়া অন্তত দুই বছরের হলে insurance-কে EUR 40,000 পর্যন্ত ওষুধের খরচ কভার করতে হবে। Insurance certificate আবেদনের সঙ্গে দিন।')],
    [FI_INSURANCE, FI_PERMIT],
    { allDegrees: true },
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [b('Study in Finland says scholarships are offered by the universities, are competitive and usually cover tuition fees only. No Finnish government scholarship for bachelor\'s or master\'s degree studies was found in the official sources read — be careful with posts that promise one.', 'Study in Finland বলে scholarship দেয় university-গুলো, প্রতিযোগিতামূলক, আর সাধারণত শুধু tuition কভার করে। পড়া official source-গুলোতে bachelor\'s বা master\'s degree-র কোনো Finland সরকারি scholarship পাওয়া যায়নি — যেসব পোস্ট এমন প্রতিশ্রুতি দেয়, সাবধান থাকুন।')],
    [FI_FUNDING],
    { status: 'partly-verified' },
  );

const apply = (id: string) =>
  qa(
    id,
    b('When and how do you apply?', 'কখন আর কীভাবে আবেদন করবেন?'),
    [b('Most English-taught programmes are in the joint application on Studyinfo.fi: one application to up to six programmes in January for studies starting in autumn (in 2026: 7–21 January, almost 300 English-taught options). A few programmes also take applications in September for a January start, and some universities run separate applications. Applicants from outside the EU/EEA/Switzerland pay a EUR 100 application fee within seven days.', 'বেশিরভাগ ইংরেজি-মাধ্যম programme Studyinfo.fi-র joint application-এ: January-তে একটি আবেদনে সর্বোচ্চ ছয়টি programme, autumn-এ শুরুর জন্য (2026-এ: ৭–২১ January, প্রায় ৩০০টি ইংরেজি-মাধ্যম সুযোগ)। কিছু programme September-এ January-তে শুরুর জন্য আবেদন নেয়, আর কিছু university আলাদা আবেদন নেয়। EU/EEA/Switzerland-এর বাইরের আবেদনকারীরা সাত দিনের মধ্যে EUR 100 আবেদন fee দেন।')],
    [FI_ADMISSIONS, FI_JOINT_2026, FI_APP_FEE],
    { kind: 'guidance' },
  );

// ------------------------------------------------------------------ documents

const MIGRI = b('Migri (the Finnish Immigration Service).', 'Finland-এর অভিবাসন দপ্তর Migri।');

export const FI_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Needed for the university application and to prove your identity for the residence permit.', 'University-র আবেদনে আর residence permit-এ পরিচয় প্রমাণে লাগে।'),
    who: MIGRI,
    when: b('From the application to the identity appointment.', 'আবেদন থেকে পরিচয় যাচাইয়ের appointment পর্যন্ত।'),
    where: b('Shown at the VFS Global Application Centre in New Delhi.', 'New Delhi-র VFS Global Application Centre-এ দেখাতে হয়।'),
    prepare: b('Bring the passport itself (a travel document) to the appointment.', 'Appointment-এ মূল passport (travel document) নিয়ে যান।'),
    groups: ['general', 'visa'],
    sources: [FI_EMB_RP],
  },
  {
    id: 'academic',
    name: b('Certificates and transcripts', 'সনদ আর transcript'),
    why: b('University documents (before admission): show that your previous studies qualify you for the programme.', 'University-র document (ভর্তির আগে): দেখায় যে আগের পড়া programme-এর যোগ্যতা দেয়।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('As the programme instructs after the application.', 'আবেদনের পর programme-এর নির্দেশ অনুযায়ী।'),
    where: b('Through Studyinfo.fi or the university.', 'Studyinfo.fi বা university-র মাধ্যমে।'),
    prepare: b('Each university lists the documents and certification it needs.', 'কোন document আর কেমন সত্যায়ন লাগবে, প্রতিটি university জানায়।'),
    groups: ['general', 'program'],
    sources: [FI_ADMISSIONS],
  },
  {
    id: 'english',
    name: b('English test result', 'ইংরেজি test-এর ফল'),
    why: b('University document if the programme requires proof of English; accepted tests and scores vary by university and programme.', 'Programme ইংরেজির প্রমাণ চাইলে university-র document; কোন test আর কত score, university আর programme অনুযায়ী আলাদা।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('By the programme\'s deadline.', 'Programme-এর শেষ তারিখের মধ্যে।'),
    where: b('As instructed by the university.', 'University-র নির্দেশ অনুযায়ী।'),
    prepare: b('Commonly accepted: IELTS, TOEFL, PTE or Cambridge English.', 'সাধারণত গ্রহণযোগ্য: IELTS, TOEFL, PTE বা Cambridge English।'),
    groups: ['program'],
    sources: [FI_ADMISSIONS],
  },
  {
    id: 'research',
    name: b('Doctoral application documents (PhD)', 'Doctoral আবেদনের document (PhD)'),
    why: b('Doctoral admission is decided by each university and doctoral programme.', 'Doctoral ভর্তির সিদ্ধান্ত নেয় প্রতিটি university আর doctoral programme।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('By the doctoral programme\'s deadline.', 'Doctoral programme-এর শেষ তারিখের মধ্যে।'),
    where: b('The university\'s doctoral admissions page.', 'University-র doctoral admissions page।'),
    prepare: b('Not verified here as a general rule — follow the programme.', 'সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি — programme অনুসরণ করুন।'),
    groups: ['program'],
    degrees: ['phd'],
    status: 'not-verified',
    sources: [FI_FUNDING],
  },
  {
    id: 'tuition-paid',
    name: b('Tuition payment or scholarship document', 'Tuition দেওয়ার প্রমাণ বা scholarship-এর document'),
    why: b('Residence permit requirement: documentation of the paid tuition fee or of a scholarship.', 'Residence permit-এর শর্ত: tuition দেওয়া বা scholarship-এর প্রমাণ।'),
    who: b('Your university; checked by Migri.', 'আপনার university; যাচাই করে Migri।'),
    when: b('Before the permit application.', 'Permit আবেদনের আগে।'),
    where: b('Attached in Enter Finland.', 'Enter Finland-এ সংযুক্ত।'),
    prepare: b('If you pay later, the amount must be in your bank account when you apply.', 'পরে দিলে আবেদনের সময় সেই টাকা bank account-এ থাকতে হবে।'),
    groups: ['visa'],
    sources: [FI_PERMIT],
  },
  {
    id: 'finance',
    name: b('Bank statement (EUR 9,600 for the first year)', 'Bank statement (প্রথম বছরের জন্য EUR 9,600)'),
    why: b('Residence permit requirement: EUR 800 a month; for studies of a year or longer, EUR 9,600 in your bank account when you apply.', 'Residence permit-এর শর্ত: মাসে EUR 800; এক বছর বা বেশি পড়লে আবেদনের সময় bank account-এ EUR 9,600।'),
    who: MIGRI,
    when: b('When you submit the application.', 'আবেদন জমার সময়।'),
    where: b('Attached in Enter Finland.', 'Enter Finland-এ সংযুক্ত।'),
    prepare: b('The money must be in your bank account at the time of the application.', 'আবেদনের সময় টাকা আপনার bank account-এ থাকতে হবে।'),
    groups: ['visa', 'bangladesh'],
    sources: [FI_INCOME],
  },
  {
    id: 'insurance',
    name: b('Insurance certificate', 'Insurance certificate (বিমার সনদ)'),
    why: b('Residence permit requirement: private insurance for medical and medicine costs (excess at most EUR 300; EUR 40,000 medicine cover for studies of two years or more).', 'Residence permit-এর শর্ত: চিকিৎসা আর ওষুধের জন্য private insurance (excess সর্বোচ্চ EUR 300; দুই বছর বা বেশি পড়লে EUR 40,000 ওষুধের কভার)।'),
    who: MIGRI,
    when: b('With the application; valid on arrival.', 'আবেদনের সঙ্গে; পৌঁছানোর সময় বৈধ।'),
    where: b('Attached in Enter Finland.', 'Enter Finland-এ সংযুক্ত।'),
    prepare: b('Check the policy meets every condition before buying.', 'কেনার আগে policy সব শর্ত পূরণ করে কিনা দেখুন।'),
    groups: ['visa', 'arrival'],
    sources: [FI_INSURANCE],
  },
  {
    id: 'vfs-delhi',
    name: b('Identity appointment at VFS New Delhi', 'VFS New Delhi-তে পরিচয় যাচাইয়ের appointment'),
    why: b('Applicants from Bangladesh prove their identity and pay the fee at the VFS Global Application Centre in New Delhi (India).', 'Bangladesh-এর আবেদনকারীরা New Delhi (India)-র VFS Global Application Centre-এ পরিচয় প্রমাণ আর fee দেন।'),
    who: b('The Embassy of Finland in New Delhi, which serves Bangladesh.', 'Bangladesh-এর দায়িত্বে থাকা New Delhi-র Finland দূতাবাস।'),
    when: b('After the online application in Enter Finland.', 'Enter Finland-এ online আবেদনের পরে।'),
    where: b('VFS Global Application Centre, New Delhi.', 'New Delhi-র VFS Global Application Centre।'),
    prepare: b('Plan travel to India (an Indian visa is needed — not verified here). Bangladeshi documents to be legalised must first be verified by VFS Global.', 'India যাওয়ার পরিকল্পনা করুন (India-র visa লাগবে — এখানে যাচাই হয়নি)। সত্যায়নের জন্য Bangladesh-এর document আগে VFS Global-কে দিয়ে যাচাই করাতে হয়।'),
    groups: ['visa', 'bangladesh'],
    sources: [FI_EMB_RP, FI_EMB_VERIFY],
  },
];

// ------------------------------------------------------------------ costs (EUR, never converted)

const PERMIT_FEE: GuideCost = { id: 'visa-fee', label: b('Residence permit for studies (online)', 'পড়ার residence permit (online)'), value: b('EUR 600 (EUR 750 on paper)', 'EUR 600 (কাগজে EUR 750)'), amount: { value: 600, currency: 'EUR', period: 'one-time' }, source: FI_PERMIT };
const FUNDS: GuideCost = { id: 'funds-living', label: b('Funds in your account (studies of a year or longer)', 'Account-এ টাকা (এক বছর বা বেশি পড়া)'), value: b('EUR 9,600 for the first year (EUR 800 a month)', 'প্রথম বছরের জন্য EUR 9,600 (মাসে EUR 800)'), amount: { value: 9600, currency: 'EUR', period: 'year' }, source: FI_INCOME };
const APP_FEE: GuideCost = { id: 'application-fee', label: b('Studyinfo application fee (non-EU/EEA)', 'Studyinfo-র আবেদন fee (non-EU/EEA)'), value: b('EUR 100', 'EUR 100'), amount: { value: 100, currency: 'EUR', period: 'one-time' }, source: FI_APP_FEE };
const TUITION_RANGE: GuideCost = { id: 'tuition', label: b("Tuition — English-taught bachelor's and master's (Study in Finland)", "Tuition — ইংরেজি-মাধ্যম bachelor's আর master's (Study in Finland)"), value: b('Typically EUR 9,000–20,000 a year', 'সাধারণত বছরে EUR 9,000–20,000'), status: 'partly-verified', amount: { value: 9000, max: 20000, currency: 'EUR', period: 'year' }, source: FI_FUNDING };
const TUITION_UH: GuideCost = { id: 'tuition', label: b("Tuition — example (University of Helsinki master's)", "Tuition — উদাহরণ (University of Helsinki master's)"), value: b('EUR 13,000, 15,000 or 18,000 a year by programme', 'Programme অনুযায়ী বছরে EUR 13,000, 15,000 বা 18,000'), status: 'partly-verified', amount: { value: 13000, max: 18000, currency: 'EUR', period: 'year' }, source: FI_UH_FEES };
const TUITION_PHD: GuideCost = { id: 'tuition', label: b('Tuition — doctoral programmes', 'Tuition — doctoral programme'), value: b('No tuition fees', 'কোনো tuition fee নেই'), source: FI_FUNDING };
const UNVERIFIED: GuideCost[] = [
  { id: 'insurance', label: b('Student insurance', 'Student insurance'), value: b('Not verified — depends on the policy', 'যাচাই হয়নি — policy-র উপর নির্ভর করে'), status: 'not-verified', source: FI_INSURANCE },
  { id: 'rent', label: b('Accommodation', 'বাসাভাড়া'), value: b('Not verified — varies by city', 'যাচাই হয়নি — শহর অনুযায়ী আলাদা'), status: 'not-verified', source: FI_INCOME },
  { id: 'india-trip', label: b('Travel to New Delhi for the identity appointment', 'পরিচয় যাচাইয়ের জন্য New Delhi যাতায়াত'), value: b('Not verified', 'যাচাই হয়নি'), status: 'not-verified', source: FI_EMB_RP },
];

// ------------------------------------------------------------------ common sections

const commonTail = () => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [{ embed: 'costs' as const }, funds('funds')] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa('types', b('Which universities are there?', 'কোন কোন university আছে?'), [b('The examples below are Finnish universities, listed alphabetically, not ordered by quality. Fees, entrance exams and scholarships differ at each, so check the official page.', 'নিচের উদাহরণগুলো Finland-এর university, বর্ণানুক্রমে, মান অনুযায়ী নয়। Fee, entrance exam আর scholarship প্রতিটিতে আলাদা, তাই official page দেখুন।')], [FI_ADMISSIONS]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work')] },
  { id: 'visa', title: b('Residence permit', 'Residence permit'), items: [permit('visa'), insurance('insurance')] },
  { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Joint application in January · EUR 9,600 in your account', 'January-তে joint application · account-এ EUR 9,600'),
  intro: b(
    "For an English-taught bachelor's in Finland you need a school-leaving certificate that qualifies you for higher education in your home country, plus the programme's own requirements (often an English test, and sometimes an entrance exam). You apply in the January joint application on Studyinfo.fi, pay tuition, and apply for a residence permit — from Bangladesh, your identity is checked at VFS New Delhi.",
    "Finland-এ ইংরেজি-মাধ্যম bachelor's-এর জন্য লাগে এমন স্কুল-শেষের সনদ, যা আপনার দেশে উচ্চশিক্ষার যোগ্যতা দেয়, সঙ্গে programme-এর নিজের শর্ত (প্রায়ই English test, কখনো entrance exam)। Studyinfo.fi-র January joint application-এ আবেদন, tuition দেওয়া, আর residence permit — Bangladesh থেকে পরিচয় যাচাই হয় VFS New Delhi-তে।",
  ),
  costs: { official: [PERMIT_FEE, FUNDS, APP_FEE], estimates: [TUITION_RANGE, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in Finland from Bangladesh?", "Bangladesh থেকে Finland-এ Bachelor's পড়তে কী কী লাগে?"),
          [b('A school-leaving certificate that qualifies you for higher education at home, the programme\'s requirements (English test, possibly an entrance exam), the Studyinfo application and EUR 100 fee, tuition paid, EUR 9,600 in your account, insurance and a residence permit with an identity check at VFS New Delhi.', 'দেশে উচ্চশিক্ষার যোগ্যতা দেয় এমন স্কুল-শেষের সনদ, programme-এর শর্ত (English test, হয়তো entrance exam), Studyinfo-তে আবেদন আর EUR 100 fee, tuition দেওয়া, account-এ EUR 9,600, insurance আর VFS New Delhi-তে পরিচয় যাচাইসহ residence permit।'), CHECK_UNI],
          [FI_ADMISSIONS, FI_APP_FEE, FI_INCOME, FI_EMB_RP],
        ),
        qa(
          'hsc',
          b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"),
          [b('Not verified yet for Bangladesh specifically: Study in Finland says you need a high-school diploma that qualifies you for higher education in your home country, but how each Finnish university treats the Bangladesh HSC was not verified. Check the programme\'s eligibility on Studyinfo.fi and the university page.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: Study in Finland বলে দেশে উচ্চশিক্ষার যোগ্যতা দেয় এমন high-school diploma লাগে, কিন্তু প্রতিটি Finland-এর university Bangladesh-এর HSC কীভাবে দেখে, যাচাই হয়নি। Studyinfo.fi আর university-র page-এ programme-এর যোগ্যতা দেখুন।')],
          [FI_ADMISSIONS],
          { status: 'not-verified' },
        ),
      ],
    },
    { id: 'apply', title: b('Applying', 'আবেদন'), items: [apply('process')] },
    {
      id: 'language',
      title: b('English, Finnish and Swedish', 'ইংরেজি, Finnish আর Swedish'),
      items: [
        qa(
          'english',
          b("How much IELTS do you need for a Bachelor's in Finland?", "Finland-এ Bachelor's-এ IELTS কত লাগে?"),
          [b('Set by each university and programme: commonly accepted tests are IELTS, TOEFL, PTE or Cambridge English, with minimum scores that vary. This guide covers English-taught programmes; requirements for Finnish- or Swedish-taught programmes were not verified.', 'প্রতিটি university আর programme ঠিক করে: সাধারণত IELTS, TOEFL, PTE বা Cambridge English গ্রহণযোগ্য, ন্যূনতম score আলাদা। এই guide ইংরেজি-মাধ্যম programme নিয়ে; Finnish বা Swedish-মাধ্যম programme-এর শর্ত যাচাই হয়নি।'), CHECK_UNI],
          [FI_ADMISSIONS],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'tuition',
      title: b('Tuition and scholarships', 'Tuition আর scholarship'),
      items: [
        qa(
          'tuition',
          b("How much is a Bachelor's in Finland?", "Finland-এ Bachelor's-এ খরচ কত?"),
          [b("Students from outside the EU/EEA/Switzerland usually pay tuition for English-taught bachelor's programmes: typically EUR 9,000–20,000 a year (Study in Finland). The exact fee is set per programme.", "EU/EEA/Switzerland-এর বাইরের student-রা সাধারণত ইংরেজি-মাধ্যম bachelor's-এ tuition দেন: সাধারণত বছরে EUR 9,000–20,000 (Study in Finland)। সঠিক fee programme অনুযায়ী।")],
          [FI_FUNDING],
          { kind: 'estimate', status: 'partly-verified' },
        ),
        scholarships('scholarships'),
      ],
    },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b("Bachelor's needed · UAS master's also need work experience", "Bachelor's লাগে · UAS master's-এ কাজের অভিজ্ঞতাও"),
  intro: b(
    "A Finnish master's needs a bachelor's degree; master's programmes at universities of applied sciences (UAS) also require two years of relevant work experience. Most English-taught master's are in the January joint application. Tuition is usually charged (for example EUR 13,000–18,000 a year at the University of Helsinki), and universities offer competitive scholarships.",
    "Finland-এর master's-এ bachelor's degree লাগে; universities of applied sciences (UAS)-এর master's-এ দুই বছরের প্রাসঙ্গিক কাজের অভিজ্ঞতাও লাগে। বেশিরভাগ ইংরেজি-মাধ্যম master's January joint application-এ। সাধারণত tuition নেওয়া হয় (যেমন University of Helsinki-তে বছরে EUR 13,000–18,000), আর university-গুলো প্রতিযোগিতামূলক scholarship দেয়।",
  ),
  costs: { official: [PERMIT_FEE, FUNDS, APP_FEE], estimates: [TUITION_UH, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in Finland?", "Finland-এ Master's-এ কী লাগে?"),
          [b("A bachelor's degree, plus the programme's requirements (English test, and sometimes entrance exams, GMAT or interviews). For master's programmes at universities of applied sciences you also need two years of relevant work experience. How Finnish universities assess a Bangladeshi degree was not verified here.", "Bachelor's degree, সঙ্গে programme-এর শর্ত (English test, কখনো entrance exam, GMAT বা interview)। Universities of applied sciences-এর master's-এ দুই বছরের প্রাসঙ্গিক কাজের অভিজ্ঞতাও লাগে। Finland-এর university Bangladesh-এর degree কীভাবে মূল্যায়ন করে, এখানে যাচাই হয়নি।"), CHECK_UNI],
          [FI_ADMISSIONS],
          { status: 'partly-verified' },
        ),
      ],
    },
    { id: 'apply', title: b('Applying', 'আবেদন'), items: [apply('process')] },
    {
      id: 'language',
      title: b('English and IELTS', 'ইংরেজি আর IELTS'),
      items: [
        qa(
          'english',
          b("How much IELTS do you need for a Master's?", "Master's-এ IELTS কত লাগে?"),
          [b('Set by each university and programme; commonly accepted tests are IELTS, TOEFL, PTE or Cambridge English. A general minimum score was not verified.', 'প্রতিটি university আর programme ঠিক করে; সাধারণত IELTS, TOEFL, PTE বা Cambridge English গ্রহণযোগ্য। সাধারণ ন্যূনতম score যাচাই হয়নি।'), CHECK_UNI],
          [FI_ADMISSIONS],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'tuition',
      title: b('Tuition and scholarships', 'Tuition আর scholarship'),
      items: [
        qa(
          'tuition',
          b("How much is a Master's in Finland?", "Finland-এ Master's-এ খরচ কত?"),
          [b("Typically EUR 9,000–20,000 a year for students from outside the EU/EEA/Switzerland (Study in Finland). Example: the University of Helsinki's English-taught master's programmes cost EUR 13,000, 15,000 or 18,000 a year depending on the programme, and the university runs a scholarship programme.", "EU/EEA/Switzerland-এর বাইরের student-দের জন্য সাধারণত বছরে EUR 9,000–20,000 (Study in Finland)। উদাহরণ: University of Helsinki-র ইংরেজি-মাধ্যম master's programme অনুযায়ী বছরে EUR 13,000, 15,000 বা 18,000, আর university-র একটি scholarship programme আছে।")],
          [FI_FUNDING, FI_UH_FEES],
          { kind: 'estimate', status: 'partly-verified' },
        ),
        scholarships('scholarships'),
      ],
    },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ PhD

const PHD: DegreeGuide = {
  level: 'phd',
  card: b('No tuition · apply to the doctoral programme', 'Tuition নেই · doctoral programme-এ আবেদন'),
  intro: b(
    'Doctoral programmes in Finland do not charge tuition fees. Admission, supervision and funding are arranged with each university\'s doctoral programme. You still need a residence permit, EUR 800 a month (EUR 9,600 in your account for the first year, unless the institution supports your living) and insurance.',
    'Finland-এ doctoral programme-এ tuition fee নেই। ভর্তি, supervision আর funding প্রতিটি university-র doctoral programme-এর সঙ্গে ঠিক হয়। তবুও residence permit, মাসে EUR 800 (প্রতিষ্ঠান খরচ না দিলে প্রথম বছরের জন্য account-এ EUR 9,600) আর insurance লাগে।',
  ),
  costs: { official: [PERMIT_FEE, FUNDS], estimates: [TUITION_PHD, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Finland?', 'Finland-এ কীভাবে PhD পাওয়া যায়?'),
          [
            b('Doctoral programmes do not charge tuition fees. Entry requirements, application rounds, English scores and funding (employment or grants) are set by each university and were not verified here as general rules.', 'Doctoral programme-এ tuition fee নেই। ভর্তির শর্ত, আবেদনের সময়, English score আর funding (চাকরি বা grant) প্রতিটি university ঠিক করে, সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি।'),
            CHECK_UNI,
          ],
          [FI_FUNDING],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('English and IELTS', 'ইংরেজি আর IELTS'),
      items: [
        qa(
          'english',
          b('How much IELTS do you need for a PhD?', 'PhD-তে IELTS কত লাগে?'),
          [b('Not verified yet as a general rule: each doctoral programme states its own English requirement.', 'সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: প্রতিটি doctoral programme নিজের ইংরেজি শর্ত দেয়।')],
          [FI_ADMISSIONS],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ the country

export const FI_GUIDE: CountryGuide = {
  code: 'FI',
  checkedAt: FI_READ,
  sourcesPerSection: true,
  intro: b(
    "Finland offers almost 300 English-taught bachelor's and master's options through the January joint application on Studyinfo.fi (EUR 100 fee for non-EU/EEA applicants). Students from outside the EU/EEA pay tuition (typically EUR 9,000–20,000 a year); doctoral programmes are tuition-free. For the residence permit you need EUR 9,600 in your account for the first year and private insurance, and from Bangladesh you prove your identity at VFS New Delhi. You may work 30 hours a week on average, and graduates can get a permit to look for work for up to two years. This guide is built from Migri, Finland abroad, Studyinfo.fi, Study in Finland and university pages.",
    "Finland-এ প্রায় ৩০০টি ইংরেজি-মাধ্যম bachelor's আর master's সুযোগ, Studyinfo.fi-র January joint application-এ (non-EU/EEA আবেদনকারীদের fee EUR 100)। EU/EEA-র বাইরের student-রা tuition দেন (সাধারণত বছরে EUR 9,000–20,000); doctoral programme-এ tuition নেই। Residence permit-এ প্রথম বছরের জন্য account-এ EUR 9,600 আর private insurance লাগে, আর Bangladesh থেকে পরিচয় প্রমাণ করতে হয় VFS New Delhi-তে। গড়ে সপ্তাহে ৩০ ঘণ্টা কাজ করা যায়, আর graduate-রা কাজ খোঁজার জন্য সর্বোচ্চ দুই বছরের permit পান। এই guide Migri, Finland abroad, Studyinfo.fi, Study in Finland আর university-র page থেকে তৈরি।",
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [FI_EMB_RP, FI_EMB_VERIFY, FI_INCOME, FI_FUNDING, FI_INSURANCE],
      {
        kind: 'guidance',
        list: [
          b('Not planning for the identity appointment in New Delhi — Bangladeshi applicants must go to VFS New Delhi.', 'New Delhi-তে পরিচয় যাচাইয়ের appointment-এর পরিকল্পনা না করা — Bangladesh-এর আবেদনকারীদের VFS New Delhi-তে যেতে হয়।'),
          b('Applying without EUR 9,600 in your own bank account at the time of the application.', 'আবেদনের সময় নিজের bank account-এ EUR 9,600 ছাড়া আবেদন করা।'),
          b('Believing posts about Finnish "government scholarships" for degree studies — scholarships come from the universities.', 'Degree-র জন্য Finland-এর "সরকারি scholarship"-এর পোস্ট বিশ্বাস করা — scholarship দেয় university-গুলো।'),
          b('Buying insurance with an excess above EUR 300.', 'EUR 300-এর বেশি excess-এর insurance কেনা।'),
          b('Missing the Studyinfo application fee (EUR 100, within seven days).', 'Studyinfo-র আবেদন fee (EUR 100, সাত দিনের মধ্যে) মিস করা।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in Finland from Bangladesh?", "Bangladesh থেকে Finland-এ Bachelor's পড়তে কী কী লাগে?"), [b('A school certificate that qualifies you for higher education at home, the programme\'s requirements, the Studyinfo joint application (EUR 100 fee), tuition paid, EUR 9,600 in your account, insurance, and a residence permit with an identity check at VFS New Delhi.', 'দেশে উচ্চশিক্ষার যোগ্যতা দেয় এমন স্কুল-সনদ, programme-এর শর্ত, Studyinfo joint application (EUR 100 fee), tuition দেওয়া, account-এ EUR 9,600, insurance, আর VFS New Delhi-তে পরিচয় যাচাইসহ residence permit।')], [FI_ADMISSIONS, FI_APP_FEE, FI_INCOME, FI_EMB_RP]),
    qa('hsc', b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"), [b('Not verified yet for Bangladesh specifically: you need a diploma that qualifies you for higher education at home; how universities treat the HSC was not verified. Check Studyinfo.fi.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: দেশে উচ্চশিক্ষার যোগ্যতা দেয় এমন diploma লাগে; university-গুলো HSC কীভাবে দেখে, যাচাই হয়নি। Studyinfo.fi দেখুন।')], [FI_ADMISSIONS], { status: 'not-verified' }),
    qa('cost', b('How much does it cost to study in Finland?', 'Finland-এ পড়াশোনার খরচ কত?'), [b("Tuition typically EUR 9,000–20,000 a year for English-taught bachelor's and master's (University of Helsinki master's: EUR 13,000–18,000); doctoral programmes free. Living: at least EUR 800 a month, EUR 9,600 in your account for the first year. Permit EUR 600 online; application fee EUR 100.", "ইংরেজি-মাধ্যম bachelor's আর master's-এ tuition সাধারণত বছরে EUR 9,000–20,000 (University of Helsinki master's: EUR 13,000–18,000); doctoral programme বিনা খরচে। থাকা: মাসে অন্তত EUR 800, প্রথম বছরের জন্য account-এ EUR 9,600। Permit online-এ EUR 600; আবেদন fee EUR 100।")], [FI_FUNDING, FI_UH_FEES, FI_INCOME, FI_PERMIT, FI_APP_FEE], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for Finland?', 'Finland-এ IELTS কত লাগে?'), [b('Set by each university and programme; commonly accepted tests are IELTS, TOEFL, PTE or Cambridge English. No single national minimum was verified.', 'প্রতিটি university আর programme ঠিক করে; সাধারণত IELTS, TOEFL, PTE বা Cambridge English গ্রহণযোগ্য। একক জাতীয় ন্যূনতম যাচাই হয়নি।')], [FI_ADMISSIONS], { status: 'partly-verified' }),
    qa('visa', b('What do you need for the residence permit?', 'Residence permit-এর জন্য কী কী লাগে?'), [b('Admission, tuition paid (or a scholarship), EUR 800 a month (EUR 9,600 in your account for a year or longer), private insurance, and the EUR 600 online fee. From Bangladesh: apply in Enter Finland and prove your identity at VFS New Delhi.', 'ভর্তি, tuition দেওয়া (বা scholarship), মাসে EUR 800 (এক বছর বা বেশি পড়লে account-এ EUR 9,600), private insurance, আর online-এ EUR 600 fee। Bangladesh থেকে: Enter Finland-এ আবেদন আর VFS New Delhi-তে পরিচয় প্রমাণ।')], [FI_PERMIT, FI_INCOME, FI_EMB_RP]),
    qa('work', b('Can you work while studying in Finland?', 'Finland-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b('Yes, an average of 30 hours a week (1,560 hours a year); more in some weeks and full-time in holidays, as long as the yearly average holds.', 'হ্যাঁ, গড়ে সপ্তাহে ৩০ ঘণ্টা (বছরে ১,৫৬০ ঘণ্টা); কোনো সপ্তাহে বেশি আর ছুটিতে full-time, যদি বছরের গড় ঠিক থাকে।')], [FI_PERMIT]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('Scholarships come from the universities, are competitive and usually cover tuition only. No Finnish government scholarship for degree studies was found in the official sources read. Doctoral programmes charge no tuition.', 'Scholarship দেয় university-গুলো, প্রতিযোগিতামূলক, সাধারণত শুধু tuition কভার করে। পড়া official source-গুলোতে degree-র কোনো Finland সরকারি scholarship পাওয়া যায়নি। Doctoral programme-এ tuition নেই।')], [FI_FUNDING], { status: 'partly-verified' }),
    qa('after', b('Can you stay in Finland after graduating?', 'পড়া শেষে Finland-এ থাকা যায়?'), [b('Yes: a residence permit to look for work or start a business for up to two years, which you can take in up to three parts within three years. It does not promise permanent residence.', 'হ্যাঁ: কাজ খোঁজা বা ব্যবসা শুরুর জন্য সর্বোচ্চ দুই বছরের residence permit, তিন বছরের মধ্যে সর্বোচ্চ তিন ভাগে নেওয়া যায়। এটা স্থায়ী বসবাসের নিশ্চয়তা দেয় না।')], [FI_AFTER]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('At least EUR 800 a month; for studies of a year or longer, EUR 9,600 in your bank account when you apply. Less if your institution provides free housing (EUR 400) or housing and meals (EUR 270).', 'মাসে অন্তত EUR 800; এক বছর বা বেশি পড়লে আবেদনের সময় bank account-এ EUR 9,600। প্রতিষ্ঠান বিনা খরচে বাসা দিলে কম (EUR 400), বাসা আর খাবার দিলে EUR 270।')], [FI_INCOME]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before admission (university): passport, certificates and transcripts, an English test; for a PhD, the doctoral programme\'s documents. After admission (permit): tuition payment or scholarship document, a bank statement with EUR 9,600, an insurance certificate, and your passport at the VFS New Delhi identity appointment.', 'ভর্তির আগে (university): passport, সনদ আর transcript, English test; PhD-তে doctoral programme-এর document। ভর্তির পরে (permit): tuition দেওয়া বা scholarship-এর document, EUR 9,600-সহ bank statement, insurance certificate, আর VFS New Delhi-র পরিচয় যাচাইয়ে passport।')], [FI_ADMISSIONS, FI_PERMIT, FI_EMB_RP]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A bachelor's degree and the programme's requirements; UAS master's also need two years of relevant work experience. Tuition example: University of Helsinki EUR 13,000–18,000 a year.", "Bachelor's degree আর programme-এর শর্ত; UAS master's-এ দুই বছরের প্রাসঙ্গিক কাজের অভিজ্ঞতাও লাগে। Tuition উদাহরণ: University of Helsinki বছরে EUR 13,000–18,000।")], [FI_ADMISSIONS, FI_UH_FEES]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Apply to a university\'s doctoral programme; there are no tuition fees. Entry rules and funding are set per programme (not verified here as general rules).', 'University-র doctoral programme-এ আবেদন; tuition fee নেই। ভর্তির নিয়ম আর funding প্রতিটি programme-এ আলাদা (সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি)।')], [FI_FUNDING], { status: 'partly-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — Aalto University, LUT University, Tampere University and the universities of Helsinki, Oulu and Turku — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — Aalto University, LUT University, Tampere University, আর Helsinki, Oulu ও Turku-র university — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [FI_ADMISSIONS]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: the Embassy of Finland in New Delhi serves Bangladesh; you prove your identity and pay the fee at the VFS Global Application Centre in New Delhi, and Bangladeshi documents to be legalised by the Embassy must first be verified by VFS Global (from 3 November 2025). How universities assess the HSC or a Bangladeshi degree, the Indian visa for the trip and processing times: not verified yet.', 'Bangladesh-এর জন্য যাচাই করা: New Delhi-র Finland দূতাবাস Bangladesh-এর দায়িত্বে; New Delhi-র VFS Global Application Centre-এ পরিচয় প্রমাণ আর fee দিতে হয়, আর দূতাবাস যেসব Bangladesh-এর document সত্যায়ন করবে, সেগুলো আগে VFS Global-কে দিয়ে যাচাই করাতে হয় (৩ November 2025 থেকে)। University-গুলো HSC বা Bangladesh-এর degree কীভাবে দেখে, যাত্রার জন্য India-র visa আর processing time: এখনো যাচাই হয়নি।'),
    ], [FI_EMB_RP, FI_EMB_VERIFY]),
  ],
  life: [
    qa('health-care', b('How does healthcare work?', 'চিকিৎসা ব্যবস্থা কেমন?'), [b('As a student you must personally cover the costs if you become ill in Finland, so the residence permit requires private insurance for medical and medicine expenses (excess at most EUR 300; EUR 40,000 medicine cover for studies of two years or more).', 'Student হিসেবে Finland-এ অসুস্থ হলে খরচ নিজেকে দিতে হয়, তাই residence permit-এ চিকিৎসা আর ওষুধের জন্য private insurance লাগে (excess সর্বোচ্চ EUR 300; দুই বছর বা বেশি পড়লে EUR 40,000 ওষুধের কভার)।')], [FI_INSURANCE]),
  ],
  documents: FI_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'estimate', status: 'partly-verified', value: { min: 9000, max: 20000, unit: 'EUR/year', text: b("Typically EUR 9,000–20,000 a year for English-taught bachelor's and master's; doctoral programmes free.", "ইংরেজি-মাধ্যম bachelor's আর master's-এ সাধারণত বছরে EUR 9,000–20,000; doctoral বিনা খরচে।") }, source: FI_FUNDING },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 9600, unit: 'EUR/year', text: b('EUR 800 a month; EUR 9,600 in your account for the first year of studies lasting a year or longer.', 'মাসে EUR 800; এক বছর বা বেশি পড়ায় প্রথম বছরের জন্য account-এ EUR 9,600।') }, source: FI_INCOME },
    { id: 'living-cost', kind: 'estimate', status: 'partly-verified', value: { min: 800, unit: 'EUR/month', text: b('Migri assumes at least EUR 800 a month for housing, food and other needs.', 'Migri-র হিসাবে বাসা, খাবার আর অন্যান্য প্রয়োজনে মাসে অন্তত EUR 800।') }, source: FI_INCOME },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { max: 30, unit: 'hours/week', text: b('An average of 30 hours a week (1,560 hours a year).', 'গড়ে সপ্তাহে ৩০ ঘণ্টা (বছরে ১,৫৬০ ঘণ্টা)।') }, source: FI_PERMIT },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { max: 24, unit: 'months', text: b('Permit to look for work or start a business for up to two years.', 'কাজ খোঁজা বা ব্যবসা শুরুর জন্য সর্বোচ্চ দুই বছরের permit।') }, source: FI_AFTER },
    { id: 'english-programs', kind: 'fact', status: 'verified', value: { unit: 'programs', text: b("Almost 300 English-taught bachelor's and master's options in the January 2026 joint application.", "January 2026 joint application-এ প্রায় ৩০০টি ইংরেজি-মাধ্যম bachelor's আর master's সুযোগ।") }, source: FI_JOINT_2026 },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 600, unit: 'EUR', text: b('EUR 600 online (EUR 750 on paper).', 'Online-এ EUR 600 (কাগজে EUR 750)।') }, source: FI_PERMIT },
  ],
};

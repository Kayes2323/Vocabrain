import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  NO_AFTER,
  NO_COSTS,
  NO_EMB_RP,
  NO_GOV_FEES,
  NO_GSU,
  NO_GSU_LANG,
  NO_NTNU_APPLY,
  NO_NTNU_ENGLISH,
  NO_NTNU_FEES,
  NO_READ,
  NO_STORTING_FEES,
  NO_UIO_FEE_TABLE,
  NO_UIO_FEES,
  NO_UIO_MASTER,
} from './no-sources';

/**
 * Norway reading guide, researched on its own from Norwegian official sources
 * (Study in Norway / HK-dir, regjeringen.no, stortinget.no, Norway in
 * Bangladesh and university pages). Nothing is taken from another country's
 * guide. Amounts stay in Norwegian kroner (NOK) and are never converted.
 * Norway is NOT tuition-free for students from outside the EU/EEA/Switzerland.
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
  'Requirements are not the same at every Norwegian university: each university and programme sets its own. Always check the official page of the university you apply to.',
  'Norway-র সব university-তে শর্ত এক নয়: প্রতিটি university আর programme নিজের শর্ত ঠিক করে। যে university-তে আবেদন করবেন, তার official page অবশ্যই দেখে নিন।',
);

const FEE_LAW = b(
  'The law is changing: public universities must charge students from outside the EU/EEA/Switzerland, but the Government proposed (October 2025) and a parliamentary committee recommended (May 2026) removing the rule that the fee must cover the full cost — the fee would still be mandatory. The date it takes effect is set later. The University of Oslo already lists lower fees for 2027/2028 than for 2026/2027 for many programmes. Check your university\'s current table before you apply.',
  'আইন বদলাচ্ছে: EU/EEA/Switzerland-এর বাইরের student-দের কাছ থেকে সরকারি university-কে fee নিতেই হবে, তবে সরকার (October 2025) প্রস্তাব দিয়েছে আর সংসদীয় কমিটি (May 2026) সুপারিশ করেছে যে fee-কে পুরো খরচের সমান হতে হবে — এই নিয়ম তুলে দেওয়া হোক; fee তবুও বাধ্যতামূলক থাকবে। কবে কার্যকর হবে, পরে ঠিক হবে। University of Oslo অনেক programme-এ 2026/2027-এর চেয়ে 2027/2028-এর জন্য কম fee দেখাচ্ছে। আবেদনের আগে আপনার university-র বর্তমান table দেখুন।',
);

// ------------------------------------------------------------------ shared answers

const tuitionFree = (id: string) =>
  qa(
    id,
    b('Is studying in Norway free?', 'Norway-তে পড়াশোনা কি বিনা খরচে?'),
    [
      b(
        'Not for you: students from outside the EU/EEA/Switzerland must normally pay tuition fees at Norwegian public universities (since autumn 2023). Exemptions include exchange students, doctoral candidates and students in certain schemes such as NORPART, NORHED or Erasmus Mundus. Every student also pays a semester fee of about NOK 1,000 to the student welfare organisation.',
        'আপনার জন্য নয়: EU/EEA/Switzerland-এর বাইরের student-দের Norway-র সরকারি university-তে সাধারণত tuition fee দিতে হয় (autumn 2023 থেকে)। ছাড় পান exchange student, doctoral candidate আর NORPART, NORHED বা Erasmus Mundus-এর মতো কিছু scheme-এর student। প্রত্যেক student student welfare organisation-কে প্রতি semester-এ প্রায় NOK 1,000 semester fee-ও দেন।',
      ),
    ],
    [NO_COSTS, NO_UIO_FEES],
    { allDegrees: true, discrepancy: FEE_LAW },
  );

const permit = (id: string) =>
  qa(
    id,
    b('What do you need for a Norwegian study permit?', 'Norway-র study permit-এর জন্য কী কী লাগে?'),
    [
      b(
        'Students from outside the EU/EEA/Switzerland must apply for a residence permit for studies (study permit) and pay an application fee. From Bangladesh you register the application online in UDI\'s portal and pay the fee, then hand in your passport and documents at the VFS Global application centre with the signed cover letter. UDI (the Norwegian Directorate of Immigration) decides; if granted, a sticker is placed in your passport.',
        'EU/EEA/Switzerland-এর বাইরের student-দের পড়ার জন্য residence permit (study permit)-এর আবেদন আর আবেদন fee দিতে হয়। Bangladesh থেকে UDI-র portal-এ online আবেদন রেজিস্টার করে fee দেন, তারপর স্বাক্ষর করা cover letter-সহ passport আর document VFS Global application centre-এ জমা দেন। সিদ্ধান্ত নেয় UDI (Norway-র অভিবাসন দপ্তর); অনুমোদন হলে passport-এ sticker লাগানো হয়।',
      ),
      b(
        'The application fee amount, processing time and any housing requirement could not be verified (UDI\'s pages could not be read on the day this guide was checked) — check udi.no before applying.',
        'আবেদন fee-র অঙ্ক, processing time আর বাসস্থানের কোনো শর্ত আছে কিনা যাচাই করা যায়নি (এই guide যাচাইয়ের দিন UDI-র page পড়া যায়নি) — আবেদনের আগে udi.no দেখুন।',
      ),
    ],
    [NO_COSTS, NO_EMB_RP],
    { status: 'partly-verified', allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'Study in Norway gives NOK 170,368 a year, or NOK 15,488 a month, for 2026–2027 as the amount students from outside the EU/EEA/Switzerland must document to cover living costs. Tuition fees are extra and are paid to the university (the University of Oslo, for example, lets you use its payment confirmation as documentation for the permit).',
        'Study in Norway-র হিসাবে 2026–2027-এ EU/EEA/Switzerland-এর বাইরের student-দের থাকার খরচের জন্য বছরে NOK 170,368, বা মাসে NOK 15,488 দেখাতে হয়। Tuition fee এর উপরে, university-কে দিতে হয় (যেমন University of Oslo-র payment confirmation permit-এর document হিসেবে ব্যবহার করা যায়)।',
      ),
    ],
    [NO_COSTS, NO_UIO_FEES],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Norway?', 'Norway-তে পড়ার পাশাপাশি কাজ করা যায়?'),
    [b('Yes: students from outside the EU/EEA/Switzerland may work up to 20 hours a week while studying, and full-time during holidays.', 'হ্যাঁ: EU/EEA/Switzerland-এর বাইরের student-রা পড়ার সময় সপ্তাহে সর্বোচ্চ ২০ ঘণ্টা, আর ছুটিতে full-time কাজ করতে পারেন।')],
    [NO_COSTS],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Norway after graduating?', 'পড়া শেষে Norway-তে থাকা যায়?'),
    [
      b(
        'If you complete your degree in Norway on a study permit, you may (under certain conditions) get a job seeker permit for up to one year after graduation. If you find a relevant job, you may apply for a skilled worker permit. The detailed conditions are on UDI\'s site and were not verified here.',
        'Study permit নিয়ে Norway-তে degree শেষ করলে (কিছু শর্তে) graduation-এর পর সর্বোচ্চ এক বছরের job seeker permit পেতে পারেন। প্রাসঙ্গিক চাকরি পেলে skilled worker permit-এর আবেদন করা যায়। বিস্তারিত শর্ত UDI-র site-এ, এখানে যাচাই হয়নি।',
      ),
    ],
    [NO_AFTER],
    { status: 'partly-verified', allDegrees: true },
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'No Norwegian government scholarship for a full degree open to Bangladeshi students was found in the official sources read. NORPART and NORHED are institutional partnership schemes (their students are exempt from tuition), not scholarships you apply for yourself. University awards are not verified here.',
        'পড়া official source-গুলোতে Bangladesh-এর student-দের জন্য পুরো degree-র কোনো Norway সরকারি scholarship পাওয়া যায়নি। NORPART আর NORHED প্রতিষ্ঠানের partnership scheme (এদের student-রা tuition ছাড় পান), নিজে আবেদন করার scholarship নয়। University-র award এখানে যাচাই হয়নি।',
      ),
    ],
    [NO_COSTS],
    { status: 'partly-verified' },
  );

const living = (id: string) =>
  qa(
    id,
    b('How much are living costs?', 'থাকা-খাওয়ার খরচ কত?'),
    [b('Study in Norway estimates at least NOK 15,488 a month (NOK 170,368 a year, 2026–2027), plus the semester fee of about NOK 1,000. Rent differs by city and is not verified here.', 'Study in Norway-র হিসাবে মাসে অন্তত NOK 15,488 (বছরে NOK 170,368, 2026–2027), সঙ্গে প্রায় NOK 1,000 semester fee। বাসাভাড়া শহরভেদে আলাদা, এখানে যাচাই হয়নি।')],
    [NO_COSTS],
    { kind: 'estimate', status: 'partly-verified', allDegrees: true },
  );

// ------------------------------------------------------------------ documents

const UDI = b('UDI (the Norwegian Directorate of Immigration).', 'Norway-র অভিবাসন দপ্তর UDI।');

export const NO_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Needed for the university application and handed in for the permit sticker.', 'University-র আবেদনে লাগে, আর permit-এর sticker-এর জন্য জমা দিতে হয়।'),
    who: UDI,
    when: b('From the application to the permit decision.', 'আবেদন থেকে permit-এর সিদ্ধান্ত পর্যন্ত।'),
    where: b('University application; handed in at VFS Global in Bangladesh.', 'University-র আবেদন; Bangladesh-এ VFS Global-এ জমা।'),
    prepare: b('Pages with photo, full name, date of birth and nationality.', 'ছবি, পুরো নাম, জন্মতারিখ আর জাতীয়তার page।'),
    groups: ['general', 'visa'],
    sources: [NO_EMB_RP, NO_NTNU_APPLY],
  },
  {
    id: 'academic',
    name: b('Certificates and transcripts', 'সনদ আর transcript'),
    why: b('University documents (before admission): show that you meet the academic requirement.', 'University-র document (ভর্তির আগে): দেখায় যে academic শর্ত পূরণ করছেন।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('With the application.', 'আবেদনের সময়।'),
    where: b('The university\'s application portal (for example Søknadsweb).', 'University-র আবেদন portal (যেমন Søknadsweb)।'),
    prepare: b('Upper secondary and all university diplomas and transcripts, with authorised English translations if needed.', 'উচ্চমাধ্যমিক আর সব university-র সনদ ও transcript, লাগলে অনুমোদিত ইংরেজি অনুবাদসহ।'),
    groups: ['general', 'program'],
    sources: [NO_NTNU_APPLY, NO_GSU],
  },
  {
    id: 'english',
    name: b('English test result', 'ইংরেজি test-এর ফল'),
    why: b('University document: each level and university sets its score.', 'University-র document: প্রতিটি স্তর আর university নিজের score ঠিক করে।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('Before or with the application.', 'আবেদনের আগে বা সঙ্গে।'),
    where: b('Uploaded with the application (some universities also need it sent directly by the test body).', 'আবেদনের সঙ্গে upload (কিছু university test প্রতিষ্ঠান থেকে সরাসরিও চায়)।'),
    prepare: b('Check the accepted tests on your university\'s page.', 'আপনার university-র page-এ কোন test গ্রহণযোগ্য দেখুন।'),
    groups: ['program'],
    sources: [NO_NTNU_ENGLISH, NO_GSU_LANG],
  },
  {
    id: 'research',
    name: b('Application for a PhD position', 'PhD position-এর আবেদন'),
    why: b('PhD candidates in Norway are normally employees: you apply for an advertised position, with the documents the job advert lists.', 'Norway-তে PhD candidate সাধারণত কর্মী: বিজ্ঞাপিত position-এ আবেদন করতে হয়, বিজ্ঞাপনে যে document চাওয়া হয় তা দিয়ে।'),
    who: b('The university or research institution.', 'University বা গবেষণা প্রতিষ্ঠান।'),
    when: b('By the deadline in the job advert.', 'চাকরির বিজ্ঞাপনের শেষ তারিখের মধ্যে।'),
    where: b('The institution\'s vacancy page.', 'প্রতিষ্ঠানের vacancy page।'),
    prepare: b('Documents per advert — not verified here as a general rule.', 'বিজ্ঞাপন অনুযায়ী document — সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি।'),
    groups: ['program'],
    degrees: ['phd'],
    status: 'partly-verified',
    sources: [NO_AFTER],
  },
  {
    id: 'admission',
    name: b('Admission letter', 'ভর্তির চিঠি (admission letter)'),
    why: b('Study permit document (after admission): shows you are admitted to full-time study.', 'Study permit-এর document (ভর্তির পরে): দেখায় যে আপনি full-time পড়ায় ভর্তি।'),
    who: b('Your university.', 'আপনার university।'),
    when: b('Before the study permit application.', 'Study permit আবেদনের আগে।'),
    where: b('Uploaded in UDI\'s application portal.', 'UDI-র application portal-এ upload।'),
    prepare: b('Keep the original letter.', 'মূল চিঠি রেখে দিন।'),
    groups: ['visa'],
    status: 'partly-verified',
    sources: [NO_COSTS],
  },
  {
    id: 'fees-paid',
    name: b('Tuition payment or exemption', 'Tuition দেওয়ার প্রমাণ বা ছাড়ের চিঠি'),
    why: b('Study permit document: universities such as the University of Oslo and NTNU issue a payment confirmation (or exemption decision) you use for the permit.', 'Study permit-এর document: University of Oslo আর NTNU-র মতো university payment confirmation (বা ছাড়ের সিদ্ধান্ত) দেয়, যা permit-এ ব্যবহার করা যায়।'),
    who: b('Your university.', 'আপনার university।'),
    when: b('By the deadline on your invoice, before the permit application.', 'Invoice-এর শেষ তারিখের মধ্যে, permit আবেদনের আগে।'),
    where: b('Paid to the university; uploaded with the permit application.', 'University-কে দিতে হয়; permit আবেদনের সঙ্গে upload।'),
    prepare: b('The University of Oslo does not allow instalments for the first payment.', 'University of Oslo প্রথম payment কিস্তিতে নেয় না।'),
    groups: ['visa'],
    sources: [NO_UIO_FEES, NO_NTNU_FEES],
  },
  {
    id: 'finance',
    name: b('Proof of living funds', 'থাকার খরচের টাকার প্রমাণ'),
    why: b('Study permit document: NOK 170,368 a year (2026–2027) for living costs.', 'Study permit-এর document: থাকার খরচের জন্য বছরে NOK 170,368 (2026–2027)।'),
    who: UDI,
    when: b('With the study permit application.', 'Study permit আবেদনের সঙ্গে।'),
    where: b('Uploaded in UDI\'s portal.', 'UDI-র portal-এ upload।'),
    prepare: b('Accepted forms of proof are listed on udi.no (not verified here).', 'কোন ধরনের প্রমাণ গ্রহণযোগ্য, udi.no-তে লেখা (এখানে যাচাই হয়নি)।'),
    groups: ['visa', 'bangladesh'],
    status: 'partly-verified',
    sources: [NO_COSTS],
  },
  {
    id: 'vfs',
    name: b('Signed cover letter and VFS appointment', 'স্বাক্ষর করা cover letter আর VFS appointment'),
    why: b('After registering online and paying the fee, you print and sign the cover letter and hand it in with your passport and documents.', 'Online রেজিস্টার আর fee দেওয়ার পর cover letter প্রিন্ট ও স্বাক্ষর করে passport আর document-সহ জমা দিতে হয়।'),
    who: b('Norway in Bangladesh; the application is processed by UDI.', 'Bangladesh-এ Norway-র দূতাবাস; আবেদন process করে UDI।'),
    when: b('After the online application and payment.', 'Online আবেদন আর payment-এর পরে।'),
    where: b('The VFS Global application centre for Norway in Bangladesh.', 'Bangladesh-এ Norway-র VFS Global application centre।'),
    prepare: b('You collect the result at the VFS centre or by courier.', 'ফল VFS centre থেকে বা courier-এ পাবেন।'),
    groups: ['visa', 'bangladesh'],
    sources: [NO_EMB_RP],
  },
  {
    id: 'semester-fee',
    name: b('Semester fee to the student welfare organisation', 'Student welfare organisation-এর semester fee'),
    why: b('After arrival: every student pays about NOK 1,000 per semester.', 'পৌঁছানোর পরে: প্রত্যেক student প্রতি semester-এ প্রায় NOK 1,000 দেন।'),
    who: b('Your university\'s student welfare organisation (Samskipnad).', 'আপনার university-র student welfare organisation (Samskipnad)।'),
    when: b('Each semester.', 'প্রতি semester-এ।'),
    where: b('Through your university.', 'University-র মাধ্যমে।'),
    prepare: b('Pay it to be able to register for the semester.', 'Semester-এ নিবন্ধনের জন্য এটা দিন।'),
    groups: ['arrival'],
    status: 'partly-verified',
    sources: [NO_COSTS],
  },
];

// ------------------------------------------------------------------ costs (NOK, never converted)

const FUNDS: GuideCost = { id: 'funds-living', label: b('Living funds to document (2026–2027)', 'দেখাতে হবে থাকার খরচ (2026–2027)'), value: b('NOK 170,368 a year (NOK 15,488 a month)', 'বছরে NOK 170,368 (মাসে NOK 15,488)'), amount: { value: 170368, currency: 'NOK', period: 'year' }, source: NO_COSTS };
const SEMESTER: GuideCost = { id: 'semester-fee', label: b('Semester fee (student welfare organisation)', 'Semester fee (student welfare organisation)'), value: b('About NOK 1,000 a semester', 'প্রতি semester-এ প্রায় NOK 1,000'), amount: { value: 1000, currency: 'NOK', period: 'semester' }, source: NO_COSTS };
const TUITION_NTNU: GuideCost = { id: 'tuition', label: b('Tuition — example (NTNU, 2026/2027)', 'Tuition — উদাহরণ (NTNU, 2026/2027)'), value: b('NOK 176,300 or 205,600 a year by subject (medicine, dentistry, veterinary: NOK 528,650)', 'বিষয় অনুযায়ী বছরে NOK 176,300 বা 205,600 (medicine, dentistry, veterinary: NOK 528,650)'), status: 'partly-verified', amount: { value: 176300, max: 205600, currency: 'NOK', period: 'year' }, source: NO_NTNU_FEES };
const TUITION_UIO_MA: GuideCost = { id: 'tuition', label: b("Tuition — example (University of Oslo master's, 2026/2027)", "Tuition — উদাহরণ (University of Oslo master's, 2026/2027)"), value: b('NOK 204,000 or 295,000 a year by programme', 'Programme অনুযায়ী বছরে NOK 204,000 বা 295,000'), status: 'partly-verified', amount: { value: 204000, max: 295000, currency: 'NOK', period: 'year' }, source: NO_UIO_FEE_TABLE };
const TUITION_PHD: GuideCost = { id: 'tuition', label: b('Tuition — PhD', 'Tuition — PhD'), value: b('Doctoral candidates are normally exempt at public institutions', 'সরকারি প্রতিষ্ঠানে doctoral candidate-রা সাধারণত ছাড় পান'), status: 'partly-verified', source: NO_COSTS };
const UNVERIFIED: GuideCost[] = [
  { id: 'visa-fee', label: b('Study permit application fee', 'Study permit আবেদন fee'), value: b('Not verified — see udi.no', 'যাচাই হয়নি — udi.no দেখুন'), status: 'not-verified', source: NO_COSTS },
  { id: 'rent', label: b('Accommodation', 'বাসাভাড়া'), value: b('Not verified — varies by city', 'যাচাই হয়নি — শহর অনুযায়ী আলাদা'), status: 'not-verified', source: NO_COSTS },
  { id: 'insurance', label: b('Health insurance', 'Health insurance'), value: b('Not verified', 'যাচাই হয়নি'), status: 'not-verified', source: NO_COSTS },
];

// ------------------------------------------------------------------ common sections

const commonTail = () => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [living('living'), { embed: 'costs' as const }, funds('funds')] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa('types', b('Which universities are there?', 'কোন কোন university আছে?'), [b('The examples below are Norwegian public universities, listed alphabetically, not ordered by quality. Fees, entry rules and languages of instruction differ at each, so check the official page.', 'নিচের উদাহরণগুলো Norway-র সরকারি university, বর্ণানুক্রমে, মান অনুযায়ী নয়। Fee, ভর্তির নিয়ম আর পড়ানোর ভাষা প্রতিটিতে আলাদা, তাই official page দেখুন।')], [NO_COSTS]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work')] },
  { id: 'visa', title: b('Study permit', 'Study permit'), items: [permit('visa')] },
  { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('HSC alone may not be enough · English and Norwegian requirements', 'শুধু HSC যথেষ্ট নাও হতে পারে · ইংরেজি আর Norwegian-এর শর্ত'),
  intro: b(
    "For a bachelor's in Norway, applicants with foreign schooling must meet the Higher Education Entrance Qualification (GSU) set by HK-dir. For many countries this means 1–2 years of university study at home after upper secondary school, as well as language requirements in English and Norwegian. Students from outside the EU/EEA/Switzerland pay tuition.",
    "Norway-তে bachelor's-এর জন্য বিদেশি শিক্ষার আবেদনকারীদের HK-dir-এর Higher Education Entrance Qualification (GSU) পূরণ করতে হয়। অনেক দেশের জন্য এর মানে উচ্চমাধ্যমিকের পর নিজ দেশে ১–২ বছর university-তে পড়া, সঙ্গে ইংরেজি আর Norwegian ভাষার শর্ত। EU/EEA/Switzerland-এর বাইরের student-রা tuition দেন।",
  ),
  costs: { official: [FUNDS, SEMESTER], estimates: [TUITION_NTNU, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in Norway from Bangladesh?", "Bangladesh থেকে Norway-তে Bachelor's পড়তে কী কী লাগে?"),
          [b('The GSU education requirement, English and Norwegian language requirements, admission, tuition paid, NOK 170,368 a year for living, and a study permit.', 'GSU-র শিক্ষাগত শর্ত, ইংরেজি আর Norwegian ভাষার শর্ত, ভর্তি, tuition দেওয়া, থাকার জন্য বছরে NOK 170,368, আর study permit।'), CHECK_UNI],
          [NO_GSU, NO_GSU_LANG, NO_COSTS],
        ),
        qa(
          'hsc',
          b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"),
          [
            b(
              'Not verified yet for Bangladesh: the GSU list says that for many countries 1–2 years of higher education in the home country after upper secondary school are required, but the Bangladesh entry itself could not be read. Check the GSU list on hkdir.no for Bangladesh before you plan.',
              'Bangladesh-এর জন্য এখনো যাচাই হয়নি: GSU তালিকা বলে অনেক দেশের জন্য উচ্চমাধ্যমিকের পর নিজ দেশে ১–২ বছর উচ্চশিক্ষা লাগে, কিন্তু Bangladesh-এর নির্দিষ্ট অংশ পড়া যায়নি। পরিকল্পনার আগে hkdir.no-র GSU তালিকায় Bangladesh দেখুন।',
            ),
          ],
          [NO_GSU],
          { status: 'not-verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('English, Norwegian and IELTS', 'ইংরেজি, Norwegian আর IELTS'),
      items: [
        qa(
          'english',
          b("How much IELTS do you need for a Bachelor's in Norway?", "Norway-তে Bachelor's-এ IELTS কত লাগে?"),
          [b('The general entrance requirement (GSU) accepts IELTS Academic with a minimum score of 5.0 or TOEFL iBT 60. The GSU also sets a Norwegian language requirement; check whether your programme is taught in English and what it asks.', 'সাধারণ ভর্তির শর্ত (GSU)-তে IELTS Academic ন্যূনতম 5.0 বা TOEFL iBT 60 গ্রহণযোগ্য। GSU Norwegian ভাষার শর্তও দেয়; আপনার programme ইংরেজিতে কিনা আর কী চায়, দেখে নিন।'), CHECK_UNI],
          [NO_GSU_LANG],
          { status: 'partly-verified' },
        ),
      ],
    },
    { id: 'tuition', title: b('Tuition', 'Tuition'), items: [tuitionFree('tuition-free'), scholarships('scholarships')] },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b('English-taught options · deadline around 1 December', 'ইংরেজি-মাধ্যম সুযোগ · শেষ তারিখ প্রায় ১ December'),
  intro: b(
    "Norwegian universities such as NTNU and the University of Oslo offer master's programmes in English. Applicants from outside the EU/EEA/Switzerland usually apply between October/November and 1 December for the following autumn, and pay tuition. After graduating you may get a job seeker permit for up to one year.",
    "NTNU আর University of Oslo-র মতো Norway-র university ইংরেজিতে master's programme দেয়। EU/EEA/Switzerland-এর বাইরের আবেদনকারীরা সাধারণত পরের autumn-এর জন্য October/November থেকে ১ December-এর মধ্যে আবেদন করেন, আর tuition দেন। Graduation-এর পর সর্বোচ্চ এক বছরের job seeker permit পেতে পারেন।",
  ),
  costs: { official: [FUNDS, SEMESTER], estimates: [TUITION_UIO_MA, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in Norway?", "Norway-তে Master's-এ কী লাগে?"),
          [b("Example (NTNU, international master's): a relevant bachelor's degree with a grade average of at least C on the ECTS scale, English documentation, passport, documentation of funding, upper secondary and university diplomas and transcripts, and a CV. NTNU lists extra verification for some countries; Bangladesh is not among them.", "উদাহরণ (NTNU, international master's): ECTS scale-এ অন্তত C গড়সহ প্রাসঙ্গিক bachelor's degree, ইংরেজির প্রমাণ, passport, টাকার প্রমাণ, উচ্চমাধ্যমিক আর university-র সনদ ও transcript, আর CV। NTNU কিছু দেশের জন্য আলাদা যাচাই চায়; সেই তালিকায় Bangladesh নেই।"), CHECK_UNI],
          [NO_NTNU_APPLY],
        ),
        qa(
          'deadline',
          b("When do you apply for a Master's?", "Master's-এ কখন আবেদন করতে হয়?"),
          [b('For applicants from outside the EU/EEA/Switzerland: the University of Oslo\'s portal opens 15 October and closes 1 December; NTNU\'s window for autumn 2026 was 1 November to 1 December 2025. Check the dates for your intake on the university page.', 'EU/EEA/Switzerland-এর বাইরের আবেদনকারীদের জন্য: University of Oslo-র portal খোলে ১৫ October, বন্ধ হয় ১ December; autumn 2026-এর জন্য NTNU-র সময় ছিল ১ November থেকে ১ December 2025। আপনার intake-এর তারিখ university-র page-এ দেখুন।')],
          [NO_UIO_MASTER, NO_NTNU_APPLY],
        ),
      ],
    },
    {
      id: 'language',
      title: b('English and IELTS', 'ইংরেজি আর IELTS'),
      items: [
        qa(
          'english',
          b("How much IELTS do you need for a Master's?", "Master's-এ IELTS কত লাগে?"),
          [b("Example (NTNU, international master's): IELTS Academic with at least 6.5 on each part, TOEFL iBT 90, or PTE Academic 62.", "উদাহরণ (NTNU, international master's): IELTS Academic, প্রতিটি অংশে অন্তত 6.5; TOEFL iBT 90; বা PTE Academic 62।"), CHECK_UNI],
          [NO_NTNU_ENGLISH],
        ),
      ],
    },
    {
      id: 'tuition',
      title: b('Tuition', 'Tuition'),
      items: [
        tuitionFree('tuition-free'),
        qa(
          'tuition',
          b("How much is a Master's in Norway?", "Norway-তে Master's-এ খরচ কত?"),
          [b("Examples for 2026/2027: the University of Oslo charges NOK 204,000 or 295,000 a year depending on the programme; NTNU charges NOK 176,300 (humanities, social sciences, business) or NOK 205,600 (natural sciences, technology and others) a year, with a few programmes much lower. The full year is paid before the study permit application at the University of Oslo.", "2026/2027-এর উদাহরণ: University of Oslo programme অনুযায়ী বছরে NOK 204,000 বা 295,000 নেয়; NTNU বছরে NOK 176,300 (humanities, social sciences, business) বা NOK 205,600 (natural sciences, technology ও অন্যান্য) নেয়, কিছু programme-এ অনেক কম। University of Oslo-তে study permit আবেদনের আগে পুরো বছরের fee দিতে হয়।")],
          [NO_UIO_FEE_TABLE, NO_NTNU_FEES, NO_UIO_FEES],
          { kind: 'estimate', status: 'partly-verified', discrepancy: FEE_LAW },
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
  card: b('A paid job, not a student place · no tuition', 'বেতনের চাকরি, student-এর আসন নয় · tuition নেই'),
  intro: b(
    'In Norway, PhD candidates are normally employees rather than students: most positions are advertised as paid jobs, for example on Jobbnorge.no or Euraxess. Doctoral candidates are normally exempt from tuition fees at public institutions.',
    'Norway-তে PhD candidate সাধারণত student নন, কর্মী: বেশিরভাগ position বেতনের চাকরি হিসেবে বিজ্ঞাপিত হয়, যেমন Jobbnorge.no বা Euraxess-এ। সরকারি প্রতিষ্ঠানে doctoral candidate-রা সাধারণত tuition fee থেকে ছাড় পান।',
  ),
  costs: { official: [FUNDS, SEMESTER], estimates: [TUITION_PHD, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Norway?', 'Norway-তে কীভাবে PhD পাওয়া যায়?'),
          [
            b('By applying for an advertised PhD position. Study in Norway says PhD candidates are normally considered employees, and most universities advertise positions on Jobbnorge.no; research positions are also listed on Euraxess.', 'বিজ্ঞাপিত PhD position-এ আবেদন করে। Study in Norway বলে PhD candidate-দের সাধারণত কর্মী ধরা হয়, আর বেশিরভাগ university Jobbnorge.no-তে position দেয়; গবেষণার position Euraxess-এও থাকে।'),
            b('Entry requirements, salary and the permit type for employed PhD candidates are set per position and were not verified here.', 'ভর্তির শর্ত, বেতন আর চাকরিরত PhD candidate-দের permit-এর ধরন প্রতিটি position-এ আলাদা, এখানে যাচাই হয়নি।'),
          ],
          [NO_AFTER],
          { status: 'partly-verified' },
        ),
        qa(
          'fees',
          b('Do PhD candidates pay tuition?', 'PhD candidate-রা কি tuition দেন?'),
          [b('Normally no: Study in Norway says doctoral candidates are normally exempt from tuition at public institutions, and NTNU states that PhD students are exempted.', 'সাধারণত না: Study in Norway বলে সরকারি প্রতিষ্ঠানে doctoral candidate-রা সাধারণত tuition থেকে ছাড় পান, আর NTNU জানায় PhD student-রা ছাড়প্রাপ্ত।')],
          [NO_COSTS, NO_NTNU_FEES],
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
          [b('Not verified yet as a general rule: each position states its own English requirement in the job advert.', 'সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: প্রতিটি position-এর বিজ্ঞাপনে নিজের ইংরেজি শর্ত থাকে।')],
          [NO_AFTER],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ the country

export const NO_GUIDE: CountryGuide = {
  code: 'NO',
  checkedAt: NO_READ,
  sourcesPerSection: true,
  intro: b(
    "Norway is not tuition-free for students from outside the EU/EEA/Switzerland: public universities charge them fees (PhD candidates are normally exempt and usually employed). Universities such as NTNU and the University of Oslo offer master's programmes in English; bachelor's entry also has a Norwegian language requirement. You need to document NOK 170,368 a year for living, may work 20 hours a week, and can get a job seeker permit for up to one year after graduating. This guide is built from Study in Norway (HK-dir), HK-dir, the Government and Parliament, Norway in Bangladesh and university pages.",
    "EU/EEA/Switzerland-এর বাইরের student-দের জন্য Norway বিনা খরচের নয়: সরকারি university তাদের কাছ থেকে fee নেয় (PhD candidate-রা সাধারণত ছাড় পান আর চাকরিতে থাকেন)। NTNU আর University of Oslo-র মতো university ইংরেজিতে master's programme দেয়; bachelor's-এ ভর্তিতে Norwegian ভাষার শর্তও আছে। থাকার জন্য বছরে NOK 170,368 দেখাতে হয়, সপ্তাহে ২০ ঘণ্টা কাজ করা যায়, আর graduation-এর পর সর্বোচ্চ এক বছরের job seeker permit পাওয়া যায়। এই guide Study in Norway (HK-dir), HK-dir, সরকার ও সংসদ, Bangladesh-এ Norway-র দূতাবাস আর university-র page থেকে তৈরি।",
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [NO_COSTS, NO_GSU, NO_UIO_MASTER, NO_GOV_FEES],
      {
        kind: 'guidance',
        list: [
          b('Believing Norway is tuition-free for Bangladeshi students — it is not (except normally for PhD candidates).', 'Norway Bangladesh-এর student-দের জন্য বিনা খরচের — এটা বিশ্বাস করা; আসলে নয় (PhD candidate ছাড়া)।'),
          b("Assuming the HSC alone gives entry to a bachelor's — check the GSU list first.", "ধরে নেওয়া যে শুধু HSC দিয়েই bachelor's-এ ঢোকা যায় — আগে GSU তালিকা দেখুন।"),
          b("Missing the 1 December master's deadline for applicants from outside the EU/EEA.", "EU/EEA-র বাইরের আবেদনকারীদের master's-এর ১ December-এর শেষ তারিখ মিস করা।"),
          b('Working more than 20 hours a week during studies.', 'পড়ার সময় সপ্তাহে ২০ ঘণ্টার বেশি কাজ করা।'),
          b('Using last year\'s fee table — fees are adjusted every year and the law is changing.', 'গত বছরের fee table ব্যবহার করা — fee প্রতি বছর বদলায়, আর আইনও বদলাচ্ছে।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in Norway from Bangladesh?", "Bangladesh থেকে Norway-তে Bachelor's পড়তে কী কী লাগে?"), [b('The GSU entrance requirement (often 1–2 years of university study at home after school), English and usually Norwegian, admission, tuition paid, NOK 170,368 a year for living, and a study permit.', 'GSU-র ভর্তির শর্ত (প্রায়ই স্কুলের পর নিজ দেশে ১–২ বছর university-তে পড়া), ইংরেজি আর সাধারণত Norwegian, ভর্তি, tuition দেওয়া, থাকার জন্য বছরে NOK 170,368, আর study permit।')], [NO_GSU, NO_GSU_LANG, NO_COSTS], { status: 'partly-verified' }),
    qa('hsc', b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"), [b('Not verified yet for Bangladesh: the GSU list requires 1–2 years of higher education after school for many countries, but the Bangladesh entry could not be read. Check hkdir.no.', 'Bangladesh-এর জন্য এখনো যাচাই হয়নি: GSU তালিকা অনেক দেশের জন্য স্কুলের পর ১–২ বছর উচ্চশিক্ষা চায়, কিন্তু Bangladesh-এর অংশ পড়া যায়নি। hkdir.no দেখুন।')], [NO_GSU], { status: 'not-verified' }),
    qa('cost', b('How much does it cost to study in Norway?', 'Norway-তে পড়াশোনার খরচ কত?'), [b("Tuition examples for 2026/2027: NTNU NOK 176,300 or 205,600 a year by subject; University of Oslo master's NOK 204,000 or 295,000. Living: NOK 170,368 a year to document, plus a semester fee of about NOK 1,000. PhD candidates are normally exempt from tuition.", "2026/2027-এর tuition উদাহরণ: NTNU বিষয় অনুযায়ী বছরে NOK 176,300 বা 205,600; University of Oslo master's NOK 204,000 বা 295,000। থাকা: বছরে NOK 170,368 দেখাতে হয়, সঙ্গে প্রায় NOK 1,000 semester fee। PhD candidate-রা সাধারণত tuition ছাড় পান।")], [NO_NTNU_FEES, NO_UIO_FEE_TABLE, NO_COSTS], { status: 'partly-verified', discrepancy: FEE_LAW }),
    qa('ielts', b('How much IELTS do you need for Norway?', 'Norway-তে IELTS কত লাগে?'), [b("For general entrance (GSU): IELTS Academic 5.0 or TOEFL iBT 60. For NTNU's international master's: IELTS 6.5 on each part. Each university sets its own.", "সাধারণ ভর্তিতে (GSU): IELTS Academic 5.0 বা TOEFL iBT 60। NTNU-র international master's-এ: প্রতিটি অংশে IELTS 6.5। প্রতিটি university নিজের শর্ত ঠিক করে।")], [NO_GSU_LANG, NO_NTNU_ENGLISH]),
    qa('visa', b('What do you need for the study permit?', 'Study permit-এর জন্য কী কী লাগে?'), [b('Apply online in UDI\'s portal and pay the fee, then hand in your passport, the signed cover letter and documents (admission, tuition payment, NOK 170,368 a year for living) at VFS Global in Bangladesh. The fee amount and processing time were not verified.', 'UDI-র portal-এ online আবেদন আর fee, তারপর passport, স্বাক্ষর করা cover letter আর document (ভর্তি, tuition দেওয়া, থাকার জন্য বছরে NOK 170,368) Bangladesh-এর VFS Global-এ জমা। Fee-র অঙ্ক আর processing time যাচাই হয়নি।')], [NO_EMB_RP, NO_COSTS], { status: 'partly-verified' }),
    qa('work', b('Can you work while studying in Norway?', 'Norway-তে পড়ার পাশাপাশি কাজ করা যায়?'), [b('Up to 20 hours a week while studying, and full-time during holidays.', 'পড়ার সময় সপ্তাহে ২০ ঘণ্টা পর্যন্ত, আর ছুটিতে full-time।')], [NO_COSTS]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('No Norwegian government scholarship for a full degree open to Bangladeshi students was found in the official sources read. PhD positions are paid jobs, and doctoral candidates are normally exempt from tuition.', 'পড়া official source-গুলোতে Bangladesh-এর student-দের জন্য পুরো degree-র কোনো Norway সরকারি scholarship পাওয়া যায়নি। PhD position বেতনের চাকরি, আর doctoral candidate-রা সাধারণত tuition ছাড় পান।')], [NO_COSTS, NO_AFTER], { status: 'partly-verified' }),
    qa('after', b('Can you stay in Norway after graduating?', 'পড়া শেষে Norway-তে থাকা যায়?'), [b('Under certain conditions, a job seeker permit for up to one year after completing your degree in Norway; with a relevant job you may apply for a skilled worker permit. It does not promise permanent residence.', 'কিছু শর্তে Norway-তে degree শেষে সর্বোচ্চ এক বছরের job seeker permit; প্রাসঙ্গিক চাকরি পেলে skilled worker permit-এর আবেদন। এটা স্থায়ী বসবাসের নিশ্চয়তা দেয় না।')], [NO_AFTER], { status: 'partly-verified' }),
    qa('tuition-free', b('Is studying in Norway free?', 'Norway-তে পড়াশোনা কি বিনা খরচে?'), [b('No, not for students from outside the EU/EEA/Switzerland since autumn 2023, except for exemptions such as exchange students and (normally) doctoral candidates.', 'না, autumn 2023 থেকে EU/EEA/Switzerland-এর বাইরের student-দের জন্য নয়; ছাড় পান exchange student আর (সাধারণত) doctoral candidate-রা।')], [NO_COSTS], { discrepancy: FEE_LAW }),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('NOK 170,368 a year, or NOK 15,488 a month (2026–2027), for living costs — tuition is extra.', 'থাকার খরচের জন্য বছরে NOK 170,368, বা মাসে NOK 15,488 (2026–2027) — tuition এর বাইরে।')], [NO_COSTS]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before admission (university): passport, diplomas and transcripts, English test, CV; for a PhD, the documents in the job advert. After admission (permit): admission letter, tuition payment or exemption, proof of NOK 170,368 a year, and the signed cover letter handed in at VFS Global.', 'ভর্তির আগে (university): passport, সনদ আর transcript, English test, CV; PhD-তে চাকরির বিজ্ঞাপনের document। ভর্তির পরে (permit): ভর্তির চিঠি, tuition দেওয়া বা ছাড়ের চিঠি, বছরে NOK 170,368-এর প্রমাণ, আর VFS Global-এ জমা দেওয়া স্বাক্ষর করা cover letter।')], [NO_NTNU_APPLY, NO_EMB_RP, NO_COSTS]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A relevant bachelor's (NTNU: at least a C average on the ECTS scale), IELTS 6.5 on each part at NTNU, and an application by 1 December for applicants from outside the EU/EEA.", "প্রাসঙ্গিক bachelor's (NTNU: ECTS scale-এ অন্তত C গড়), NTNU-তে প্রতিটি অংশে IELTS 6.5, আর EU/EEA-র বাইরের আবেদনকারীদের ১ December-এর মধ্যে আবেদন।")], [NO_NTNU_APPLY, NO_NTNU_ENGLISH, NO_UIO_MASTER]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Apply for an advertised PhD position (usually a paid job, e.g. on Jobbnorge.no). Doctoral candidates are normally exempt from tuition. Requirements are set per position.', 'বিজ্ঞাপিত PhD position-এ আবেদন (সাধারণত বেতনের চাকরি, যেমন Jobbnorge.no-তে)। Doctoral candidate-রা সাধারণত tuition ছাড় পান। শর্ত প্রতিটি position-এ আলাদা।')], [NO_AFTER, NO_COSTS], { status: 'partly-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — the Norwegian University of Life Sciences, the Norwegian University of Science and Technology (NTNU), UiT The Arctic University of Norway and the universities of Bergen and Oslo — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — Norwegian University of Life Sciences, Norwegian University of Science and Technology (NTNU), UiT The Arctic University of Norway, আর Bergen ও Oslo-র university — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [NO_COSTS]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: you apply online with UDI, pay the fee, and hand in your passport and documents at VFS Global in Bangladesh; UDI decides and you collect the result at VFS or by courier. NTNU asks no extra degree verification for Bangladesh. Whether the HSC alone meets the GSU, the permit fee and processing time: not verified yet — check hkdir.no and udi.no.', 'Bangladesh-এর জন্য যাচাই করা: UDI-তে online আবেদন আর fee, তারপর Bangladesh-এর VFS Global-এ passport আর document জমা; সিদ্ধান্ত নেয় UDI, আর ফল VFS থেকে বা courier-এ পান। NTNU Bangladesh-এর degree-র জন্য আলাদা যাচাই চায় না। শুধু HSC দিয়ে GSU পূরণ হয় কিনা, permit fee আর processing time: এখনো যাচাই হয়নি — hkdir.no আর udi.no দেখুন।'),
    ], [NO_EMB_RP, NO_NTNU_APPLY, NO_GSU]),
  ],
  life: [
    qa('health-care', b('How does healthcare work?', 'চিকিৎসা ব্যবস্থা কেমন?'), [b('Not verified yet: health insurance and healthcare rules for students were not verified in the official sources read. Check udi.no and your university before you arrive.', 'এখনো যাচাই হয়নি: student-দের health insurance আর চিকিৎসার নিয়ম পড়া official source-গুলোতে যাচাই হয়নি। পৌঁছানোর আগে udi.no আর আপনার university দেখুন।')], [NO_COSTS], { status: 'not-verified' }),
  ],
  documents: NO_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'estimate', status: 'partly-verified', value: { min: 176300, max: 295000, unit: 'NOK/year', text: b('Examples 2026/2027: NTNU NOK 176,300–205,600; University of Oslo master\'s NOK 204,000–295,000 a year. PhD normally exempt.', '2026/2027-এর উদাহরণ: NTNU NOK 176,300–205,600; University of Oslo master\'s বছরে NOK 204,000–295,000। PhD সাধারণত ছাড়।') }, source: NO_NTNU_FEES },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 170368, unit: 'NOK/year', text: b('NOK 170,368 a year (NOK 15,488 a month), 2026–2027.', 'বছরে NOK 170,368 (মাসে NOK 15,488), 2026–2027।') }, source: NO_COSTS },
    { id: 'living-cost', kind: 'estimate', status: 'partly-verified', value: { min: 15488, unit: 'NOK/month', text: b('At least NOK 15,488 a month (Study in Norway estimate).', 'মাসে অন্তত NOK 15,488 (Study in Norway-র হিসাব)।') }, source: NO_COSTS },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { max: 20, unit: 'hours/week', text: b('Up to 20 hours a week while studying; full-time in holidays.', 'পড়ার সময় সপ্তাহে ২০ ঘণ্টা পর্যন্ত; ছুটিতে full-time।') }, source: NO_COSTS },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { max: 12, unit: 'months', text: b('Job seeker permit for up to one year after graduating in Norway (under conditions).', 'Norway-তে graduation-এর পর (শর্তসাপেক্ষে) সর্বোচ্চ এক বছরের job seeker permit।') }, source: NO_AFTER },
    { id: 'english-programs', kind: 'fact', status: 'verified', value: { unit: 'programs', text: b("Master's programmes in English at universities such as NTNU; general entry also has a Norwegian language requirement.", "NTNU-র মতো university-তে ইংরেজিতে master's programme; সাধারণ ভর্তিতে Norwegian ভাষার শর্তও আছে।") }, source: NO_NTNU_APPLY },
    { id: 'visa-fee', kind: 'fact', status: 'not-verified' },
  ],
};

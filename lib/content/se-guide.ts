import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  SE_AFTER,
  SE_COSTS,
  SE_NEW_RULES,
  SE_PERMIT,
  SE_READ,
  SE_SISGP,
  SE_UA_APPLY,
  SE_UA_BD_BA,
  SE_UA_BD_MA,
  SE_UA_ENGLISH,
  SE_UA_FEES,
  SE_UU_FEES,
  SE_UU_FINANCING,
} from './se-sources';

/**
 * Sweden reading guide, researched on its own from Swedish official sources
 * (Migrationsverket, University Admissions in Sweden, Study in Sweden, the
 * Swedish Institute and university pages), including the new study-permit
 * rules in force from 11 June 2026. Amounts stay in Swedish kronor (SEK) and
 * are never converted. EU/EEA students are not covered: this guide is for
 * Bangladeshi (non-EU/EEA) students.
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
  'Requirements are not the same for every Swedish programme: each university and programme sets its own specific requirements. Always check the programme on universityadmissions.se and the university page.',
  'সব Swedish programme-এ শর্ত এক নয়: প্রতিটি university আর programme নিজের নির্দিষ্ট শর্ত ঠিক করে। universityadmissions.se-তে programme আর university-র page অবশ্যই দেখে নিন।',
);

const WORK_CHANGE = b(
  'The rule changed on 11 June 2026: before, students with a study permit could work without an hour limit. Permits granted before 11 June 2026 keep the old rule until they are extended; advice online written before June 2026 is out of date.',
  'নিয়মটি ১১ June 2026-এ বদলেছে: আগে study permit-ধারী student-রা ঘণ্টার সীমা ছাড়া কাজ করতে পারতেন। ১১ June 2026-এর আগে পাওয়া permit-এ extension না হওয়া পর্যন্ত পুরোনো নিয়ম থাকে; June 2026-এর আগে লেখা অনলাইন পরামর্শ এখন পুরোনো।',
);

// ------------------------------------------------------------------ shared answers

const permit = (id: string) =>
  qa(
    id,
    b('What do you need for a Swedish study permit?', 'Sweden-এর study permit-এর জন্য কী কী লাগে?'),
    [
      b(
        'A residence permit for studies at higher education needs: admission to full-time studies (30 credits a semester), any tuition fee already paid before you apply, the ability to support yourself (at least SEK 10,656 a month in 2026, for the whole permit period), and comprehensive health insurance if your studies last less than a year. The fee is SEK 1,500 for adults. You apply online, and the permit must be issued before you travel.',
        'Higher education-এর study permit-এ লাগে: full-time পড়ায় ভর্তি (প্রতি semester-এ ৩০ credit), আবেদনের আগেই tuition fee দেওয়া, নিজের খরচ চালানোর সামর্থ্য (2026-এ মাসে অন্তত SEK 10,656, permit-এর পুরো সময়ের জন্য), আর পড়া এক বছরের কম হলে comprehensive health insurance। প্রাপ্তবয়স্কদের fee SEK 1,500। আবেদন online-এ, আর যাওয়ার আগেই permit পেতে হবে।',
      ),
      b(
        'You may need to show your passport or be interviewed at a Swedish embassy (sometimes by video). From 11 June 2026 the study-result requirement is stricter: 37.5 credits in the first year and 45 credits a year after that.',
        'Swedish দূতাবাসে passport দেখাতে বা interview দিতে হতে পারে (কখনো video-তে)। ১১ June 2026 থেকে পড়ার ফলের শর্ত কড়া: প্রথম বছরে ৩৭.৫ credit, তারপর প্রতি বছরে ৪৫ credit।',
      ),
    ],
    [SE_PERMIT, SE_NEW_RULES],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [b('At least SEK 10,656 a month if you apply in 2026 (SEK 10,584 in 2025), enough for the whole period of the permit, plus any tuition fee paid before you apply. Extra amounts apply for a spouse (SEK 4,440 a month) and each child (SEK 2,664 a month).', '2026-এ আবেদন করলে মাসে অন্তত SEK 10,656 (2025-এ SEK 10,584), permit-এর পুরো সময়ের জন্য, সঙ্গে আবেদনের আগে দেওয়া tuition fee। Spouse-এর জন্য মাসে SEK 4,440 আর প্রতিটি সন্তানের জন্য মাসে SEK 2,664 অতিরিক্ত।')],
    [SE_PERMIT],
    { allDegrees: true },
  );

const living = (id: string) =>
  qa(
    id,
    b('How much are living costs?', 'থাকা-খাওয়ার খরচ কত?'),
    [b('Study in Sweden estimates around SEK 10,656 a month: food SEK 2,716, accommodation SEK 4,900, local travel SEK 650, phone/internet SEK 400 and miscellaneous SEK 1,990. Textbooks can add about SEK 750 a month. Housing is usually the largest cost and differs by city.', 'Study in Sweden-এর হিসাবে মাসে প্রায় SEK 10,656: খাবার SEK 2,716, বাসা SEK 4,900, স্থানীয় যাতায়াত SEK 650, phone/internet SEK 400, অন্যান্য SEK 1,990। বইয়ের জন্য মাসে প্রায় SEK 750 বাড়তে পারে। বাসাই সাধারণত সবচেয়ে বড় খরচ, শহরভেদে আলাদা।')],
    [SE_COSTS],
    { kind: 'estimate', status: 'partly-verified', allDegrees: true },
  );

const workUgPg = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Sweden?', 'Sweden-এ পড়ার পাশাপাশি কাজ করা যায়?'),
    [b("Yes, but limited: at bachelor's or master's level, if your permit was granted on or after 11 June 2026, you may work at most 15 hours a week during semesters, and without limit in June, July and August.", "হ্যাঁ, তবে সীমিত: bachelor's বা master's পর্যায়ে ১১ June 2026 বা পরে permit পেলে semester-এ সপ্তাহে সর্বোচ্চ ১৫ ঘণ্টা, আর June, July ও August-এ সীমা ছাড়া কাজ করা যায়।")],
    [SE_PERMIT, SE_NEW_RULES],
    { discrepancy: WORK_CHANGE },
  );

const afterUgPg = (id: string) =>
  qa(
    id,
    b('Can you stay in Sweden after graduating?', 'পড়া শেষে Sweden-এ থাকা যায়?'),
    [b("You can apply, before your study permit expires, for a residence permit to look for work or start a business: up to one year after completing bachelor's or master's level studies. You must have completed a programme of at least two semesters, passed all courses and be able to support yourself (SEK 10,656 a month in 2026); the fee is SEK 1,500. It does not promise permanent residence.", "Study permit শেষ হওয়ার আগে কাজ খোঁজা বা ব্যবসা শুরুর জন্য residence permit-এর আবেদন করা যায়: bachelor's বা master's পর্যায় শেষে সর্বোচ্চ এক বছর। অন্তত দুই semester-এর programme শেষ করা, সব course পাশ আর নিজের খরচ চালানোর সামর্থ্য (2026-এ মাসে SEK 10,656) লাগে; fee SEK 1,500। এটা স্থায়ী বসবাসের নিশ্চয়তা দেয় না।")],
    [SE_AFTER],
  );

// ------------------------------------------------------------------ documents

const MIGRATION = b('The Swedish Migration Agency (Migrationsverket).', 'Sweden-এর অভিবাসন দপ্তর Migrationsverket।');

export const SE_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Identification for University Admissions and the study permit; you may have to show it at a Swedish embassy.', 'University Admissions আর study permit-এর পরিচয়পত্র; Swedish দূতাবাসে দেখাতে হতে পারে।'),
    who: MIGRATION,
    when: b('From the application to the permit decision.', 'আবেদন থেকে permit-এর সিদ্ধান্ত পর্যন্ত।'),
    where: b('A copy of the photo page to universityadmissions.se; the original at the embassy if asked.', 'Photo page-এর কপি universityadmissions.se-তে; বলা হলে মূলটা দূতাবাসে।'),
    prepare: b('The page with your personal data and photograph.', 'ব্যক্তিগত তথ্য আর ছবির page।'),
    groups: ['general', 'visa'],
    sources: [SE_UA_BD_BA, SE_PERMIT],
  },
  {
    id: 'english',
    name: b('English test result', 'ইংরেজি test-এর ফল'),
    why: b('University Admissions document: Bangladeshi upper secondary English does not meet the Swedish English requirement, so a test (or certain university studies) is needed.', 'University Admissions-এর document: Bangladesh-এর উচ্চমাধ্যমিকের ইংরেজি Sweden-এর ইংরেজি শর্ত পূরণ করে না, তাই test (বা নির্দিষ্ট university-র পড়া) লাগে।'),
    who: b('University Admissions in Sweden.', 'Sweden-এর University Admissions।'),
    when: b('By the document deadline of the admission round.', 'Admission round-এর document-এর শেষ তারিখের মধ্যে।'),
    where: b('Submitted to universityadmissions.se.', 'universityadmissions.se-তে জমা।'),
    prepare: b('Check whether your programme asks for English 6 or English 7.', 'আপনার programme English 6 না English 7 চায়, দেখে নিন।'),
    groups: ['program', 'bangladesh'],
    sources: [SE_UA_ENGLISH, SE_UA_BD_BA],
  },
  {
    id: 'hsc',
    name: b('HSC certificate with marks sheet (bachelor\'s)', 'HSC সনদ আর marks sheet (bachelor\'s)'),
    why: b("University Admissions document: the HSC (and some other Bangladeshi certificates) can give general eligibility for bachelor's studies.", "University Admissions-এর document: HSC (আর Bangladesh-এর আরও কিছু সনদ) bachelor's-এর সাধারণ যোগ্যতা দিতে পারে।"),
    who: b('University Admissions in Sweden.', 'Sweden-এর University Admissions।'),
    when: b('With the application.', 'আবেদনের সঙ্গে।'),
    where: b('Submitted to universityadmissions.se.', 'universityadmissions.se-তে জমা।'),
    prepare: b('Issued by the Education Board (not the school); if you graduated after 2009 you need a pass in Mathematics (from the HSC or the SSC).', 'শিক্ষা বোর্ডের দেওয়া (স্কুলের নয়); 2009-এর পরে পাশ করলে Mathematics-এ পাশ লাগে (HSC বা SSC থেকে)।'),
    groups: ['program', 'bangladesh'],
    degrees: ['bachelors'],
    sources: [SE_UA_BD_BA],
  },
  {
    id: 'degree',
    name: b('University transcripts and diploma (master\'s)', 'University-র transcript আর diploma (master\'s)'),
    why: b("University Admissions document: shows your bachelor's degree for master's eligibility.", "University Admissions-এর document: master's-এর যোগ্যতার জন্য আপনার bachelor's degree দেখায়।"),
    who: b('University Admissions in Sweden.', 'Sweden-এর University Admissions।'),
    when: b('By the document deadline.', 'Document-এর শেষ তারিখের মধ্যে।'),
    where: b('Submitted to universityadmissions.se.', 'universityadmissions.se-তে জমা।'),
    prepare: b("For Bangladesh: issued and attested (stamped and signed) by the university itself — college-issued mark sheets and MyGov e-apostilles are not accepted.", "Bangladesh-এর জন্য: university নিজে দেবে আর সত্যায়ন (সিল ও স্বাক্ষর) করবে — college-এর mark sheet আর MyGov-এর e-apostille গ্রহণযোগ্য নয়।"),
    groups: ['program', 'bangladesh'],
    degrees: ['masters'],
    sources: [SE_UA_BD_MA],
  },
  {
    id: 'research',
    name: b('Doctoral application documents (PhD)', 'Doctoral আবেদনের document (PhD)'),
    why: b('Doctoral positions are applied for directly at the university, not through University Admissions.', 'Doctoral position-এ সরাসরি university-তে আবেদন করতে হয়, University Admissions-এর মাধ্যমে নয়।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('By the deadline in the advert.', 'বিজ্ঞাপনের শেষ তারিখের মধ্যে।'),
    where: b("The university's vacancy page.", 'University-র vacancy page।'),
    prepare: b('Not verified here as a general rule — follow the advert.', 'সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি — বিজ্ঞাপন অনুসরণ করুন।'),
    groups: ['program'],
    degrees: ['phd'],
    status: 'not-verified',
    sources: [SE_UA_FEES],
  },
  {
    id: 'tuition-paid',
    name: b('Proof of tuition payment', 'Tuition দেওয়ার প্রমাণ'),
    why: b('Study permit requirement: any tuition fee must be paid before you apply for the permit; the process does not start until the first instalment is paid.', 'Study permit-এর শর্ত: permit-এর আবেদনের আগেই tuition দিতে হয়; প্রথম কিস্তি না দেওয়া পর্যন্ত প্রক্রিয়া শুরু হয় না।'),
    who: b('Your university.', 'আপনার university।'),
    when: b('As soon as the university sends payment instructions.', 'University payment-এর নির্দেশনা পাঠানো মাত্র।'),
    where: b('Paid to the university.', 'University-কে দিতে হয়।'),
    prepare: b('Keep the receipt for the permit application.', 'Permit আবেদনের জন্য রসিদ রেখে দিন।'),
    groups: ['visa'],
    sources: [SE_PERMIT, SE_UA_FEES],
  },
  {
    id: 'finance',
    name: b('Proof of funds', 'টাকার প্রমাণ'),
    why: b('Study permit requirement: at least SEK 10,656 a month (2026) for the whole permit period.', 'Study permit-এর শর্ত: permit-এর পুরো সময়ের জন্য মাসে অন্তত SEK 10,656 (2026)।'),
    who: MIGRATION,
    when: b('With the online application.', 'Online আবেদনের সঙ্গে।'),
    where: b("Uploaded in the Migration Agency's e-service.", 'Migrationsverket-এর e-service-এ upload।'),
    prepare: b('Accepted forms of proof are listed by the Migration Agency.', 'কোন ধরনের প্রমাণ গ্রহণযোগ্য, Migrationsverket জানায়।'),
    groups: ['visa'],
    sources: [SE_PERMIT],
  },
  {
    id: 'insurance',
    name: b('Comprehensive health insurance (studies under one year)', 'Comprehensive health insurance (এক বছরের কম পড়া)'),
    why: b('Study permit requirement only if your studies last less than one year.', 'শুধু পড়া এক বছরের কম হলে study permit-এর শর্ত।'),
    who: MIGRATION,
    when: b('Before the permit decision.', 'Permit-এর সিদ্ধান্তের আগে।'),
    where: b('Uploaded with the application.', 'আবেদনের সঙ্গে upload।'),
    prepare: b('Longer programmes: check what applies after arrival.', 'দীর্ঘ programme: পৌঁছানোর পর কী প্রযোজ্য দেখে নিন।'),
    groups: ['visa'],
    sources: [SE_PERMIT],
  },
  {
    id: 'embassy',
    name: b('Passport check or interview at a Swedish embassy (if asked)', 'Swedish দূতাবাসে passport দেখানো বা interview (বলা হলে)'),
    why: b('The Migration Agency may ask you to present your passport or be interviewed, sometimes by video.', 'Migrationsverket passport দেখাতে বা interview দিতে বলতে পারে, কখনো video-তে।'),
    who: b('The Embassy of Sweden, for the Migration Agency.', 'Migrationsverket-এর পক্ষে Sweden-এর দূতাবাস।'),
    when: b('After you apply, when contacted.', 'আবেদনের পর, যোগাযোগ করলে।'),
    where: b('A Swedish embassy or consulate-general (for Bangladesh: not verified here).', 'Swedish দূতাবাস বা consulate-general (Bangladesh-এর জন্য: এখানে যাচাই হয়নি)।'),
    prepare: b('Apply early so there is time for this step.', 'এই ধাপের সময় রাখতে আগেভাগে আবেদন করুন।'),
    groups: ['visa', 'bangladesh'],
    status: 'partly-verified',
    sources: [SE_PERMIT],
  },
  {
    id: 'address',
    name: b('Notify your address', 'ঠিকানা জানানো'),
    why: b('After arrival: under the rules from 11 June 2026 you must notify the Migration Agency of your address.', 'পৌঁছানোর পরে: ১১ June 2026-এর নিয়মে Migrationsverket-কে আপনার ঠিকানা জানাতে হবে।'),
    who: MIGRATION,
    when: b('After you arrive and settle.', 'পৌঁছে থাকার জায়গা ঠিক হলে।'),
    where: b('To the Migration Agency.', 'Migrationsverket-কে।'),
    prepare: b('How and by when: check the Migration Agency (not verified here).', 'কীভাবে আর কবের মধ্যে: Migrationsverket দেখুন (এখানে যাচাই হয়নি)।'),
    groups: ['arrival'],
    status: 'partly-verified',
    sources: [SE_NEW_RULES],
  },
];

// ------------------------------------------------------------------ costs (SEK, never converted)

const PERMIT_FEE: GuideCost = { id: 'visa-fee', label: b('Study permit fee (adults)', 'Study permit fee (প্রাপ্তবয়স্ক)'), value: b('SEK 1,500', 'SEK 1,500'), amount: { value: 1500, currency: 'SEK', period: 'one-time' }, source: SE_PERMIT };
const FUNDS: GuideCost = { id: 'funds-living', label: b('Funds to show (applications in 2026)', 'দেখাতে হবে (2026-এ আবেদন)'), value: b('At least SEK 10,656 a month for the permit period', 'Permit-এর সময় জুড়ে মাসে অন্তত SEK 10,656'), amount: { value: 10656, currency: 'SEK', period: 'month' }, source: SE_PERMIT };
const APP_FEE: GuideCost = { id: 'application-fee', label: b('University Admissions application fee', 'University Admissions-এর আবেদন fee'), value: b('SEK 900 per semester you apply', 'যে semester-এ আবেদন, সেই semester-এ SEK 900'), amount: { value: 900, currency: 'SEK', period: 'one-time' }, source: SE_UA_FEES };
const TUITION_UU: GuideCost = { id: 'tuition', label: b("Tuition — example (Uppsala University master's)", "Tuition — উদাহরণ (Uppsala University master's)"), value: b('SEK 49,500–90,000 per semester, depending on the programme', 'Programme অনুযায়ী প্রতি semester-এ SEK 49,500–90,000'), status: 'partly-verified', amount: { value: 49500, max: 90000, currency: 'SEK', period: 'semester' }, source: SE_UU_FEES };
const TUITION_UG: GuideCost = { id: 'tuition', label: b("Tuition — bachelor's", "Tuition — bachelor's"), value: b('Not verified — set by each university per programme', 'যাচাই হয়নি — প্রতিটি university programme অনুযায়ী ঠিক করে'), status: 'not-verified', source: SE_UA_FEES };
const TUITION_PHD: GuideCost = { id: 'tuition', label: b('Tuition — doctoral studies', 'Tuition — doctoral'), value: b('Doctoral students are exempt from tuition fees', 'Doctoral student-রা tuition fee থেকে ছাড়প্রাপ্ত'), source: SE_UA_FEES };
const UNVERIFIED: GuideCost[] = [
  { id: 'rent', label: b('Accommodation', 'বাসাভাড়া'), value: b('Not verified — varies by city', 'যাচাই হয়নি — শহর অনুযায়ী আলাদা'), status: 'not-verified', source: SE_COSTS },
  { id: 'insurance', label: b('Health insurance (studies under one year)', 'Health insurance (এক বছরের কম পড়া)'), value: b('Not verified — depends on the policy', 'যাচাই হয়নি — policy-র উপর নির্ভর করে'), status: 'not-verified', source: SE_PERMIT },
];

// ------------------------------------------------------------------ common sections

const commonTail = () => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [living('living'), { embed: 'costs' as const }, funds('funds')] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa('types', b('Which universities are there?', 'কোন কোন university আছে?'), [b('The examples below are Swedish universities, listed alphabetically, not ordered by quality. Programmes in English are searched and applied for on universityadmissions.se.', 'নিচের উদাহরণগুলো Sweden-এর university, বর্ণানুক্রমে, মান অনুযায়ী নয়। ইংরেজি-মাধ্যম programme universityadmissions.se-তে খোঁজা আর আবেদন করা হয়।')], [SE_UA_APPLY]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'visa', title: b('Study permit', 'Study permit'), items: [permit('visa')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('HSC accepted · English test needed · 15 h/week work', 'HSC গ্রহণযোগ্য · English test লাগে · সপ্তাহে ১৫ ঘণ্টা কাজ'),
  intro: b(
    "University Admissions in Sweden accepts the Bangladesh HSC (issued by the Education Board) for general eligibility for bachelor's studies, but Bangladeshi school English does not meet the English requirement, so you need an English test. You apply centrally on universityadmissions.se (fee SEK 900), pay tuition before the study permit, and may work up to 15 hours a week during semesters.",
    "University Admissions in Sweden bachelor's-এর সাধারণ যোগ্যতায় Bangladesh-এর HSC (শিক্ষা বোর্ডের দেওয়া) গ্রহণ করে, কিন্তু Bangladesh-এর স্কুলের ইংরেজি ইংরেজির শর্ত পূরণ করে না, তাই English test লাগে। universityadmissions.se-তে কেন্দ্রীয়ভাবে আবেদন (fee SEK 900), study permit-এর আগে tuition দেওয়া, আর semester-এ সপ্তাহে ১৫ ঘণ্টা পর্যন্ত কাজ।",
  ),
  costs: { official: [PERMIT_FEE, FUNDS, APP_FEE], estimates: [TUITION_UG, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in Sweden from Bangladesh?", "Bangladesh থেকে Sweden-এ Bachelor's পড়তে কী কী লাগে?"),
          [b("The HSC (or another accepted Bangladeshi certificate) issued by the Education Board, a pass in Mathematics if you graduated after 2009, an English test, any programme-specific requirements, an application on universityadmissions.se, tuition paid, SEK 10,656 a month for living, and a study permit.", "শিক্ষা বোর্ডের দেওয়া HSC (বা Bangladesh-এর অন্য গ্রহণযোগ্য সনদ), 2009-এর পরে পাশ করলে Mathematics-এ পাশ, English test, programme-এর নির্দিষ্ট শর্ত, universityadmissions.se-তে আবেদন, tuition দেওয়া, থাকার জন্য মাসে SEK 10,656, আর study permit।"), CHECK_UNI],
          [SE_UA_BD_BA, SE_PERMIT],
        ),
        qa(
          'hsc',
          b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"),
          [b("Yes for general eligibility: University Admissions lists the Higher Secondary Certificate, the Madrasah Alim Certificate, the Vocational HSC and some diplomas as Bangladeshi qualifications. Submit the certificate with marks sheet from the Education Board (BISE or the Technical Education Board, not the school). If you graduated after 2009, a pass in Mathematics is required (from the HSC or, if missing, the SSC). Programmes can add specific requirements.", "সাধারণ যোগ্যতার জন্য হ্যাঁ: University Admissions Bangladesh-এর qualification হিসেবে Higher Secondary Certificate, Madrasah Alim Certificate, Vocational HSC আর কিছু diploma দেখায়। শিক্ষা বোর্ডের (BISE বা Technical Education Board, স্কুলের নয়) marks sheet-সহ সনদ জমা দিন। 2009-এর পরে পাশ করলে Mathematics-এ পাশ লাগে (HSC থেকে, না থাকলে SSC থেকে)। Programme নির্দিষ্ট শর্ত যোগ করতে পারে।"), CHECK_UNI],
          [SE_UA_BD_BA],
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
          [b('International students are encouraged to apply in the first admission round: deadline in mid-January for the autumn semester and mid-August for the spring semester. The second round is not recommended if you need a residence permit, because there is usually not enough time. Pay the SEK 900 application fee by the fee deadline.', 'International student-দের প্রথম admission round-এ আবেদন করতে বলা হয়: autumn semester-এর জন্য শেষ তারিখ January-এর মাঝামাঝি, spring-এর জন্য August-এর মাঝামাঝি। Residence permit লাগলে দ্বিতীয় round সুপারিশ করা হয় না, কারণ সাধারণত সময় থাকে না। SEK 900 আবেদন fee শেষ তারিখের মধ্যে দিন।')],
          [SE_UA_APPLY, SE_UA_FEES],
          { kind: 'guidance' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('English and IELTS', 'ইংরেজি আর IELTS'),
      items: [
        qa(
          'english',
          b('How much IELTS do you need for Sweden?', 'Sweden-এ IELTS কত লাগে?'),
          [b('The standard requirement "English 6" means IELTS Academic 6.5 overall with no section below 5.5; "English 7" means 7.0 with no section below 6.0. Upper secondary English from Bangladesh does not count, even if you studied English at school.', 'সাধারণ শর্ত "English 6" মানে IELTS Academic overall 6.5, কোনো section 5.5-এর নিচে নয়; "English 7" মানে 7.0, কোনো section 6.0-এর নিচে নয়। Bangladesh-এর উচ্চমাধ্যমিকের ইংরেজি গণ্য হয় না, স্কুলে ইংরেজি পড়লেও।'), CHECK_UNI],
          [SE_UA_ENGLISH, SE_UA_BD_BA],
        ),
      ],
    },
    {
      id: 'tuition',
      title: b('Tuition and scholarships', 'Tuition আর scholarship'),
      items: [
        qa(
          'tuition',
          b("How much is a Bachelor's in Sweden?", "Sweden-এ Bachelor's-এ খরচ কত?"),
          [b("Not verified yet as a figure: most non-EU/EEA students pay tuition, and each university decides the fee for each programme — see the programme on universityadmissions.se. The first instalment must be paid before the residence permit process starts.", "অঙ্ক হিসেবে এখনো যাচাই হয়নি: বেশিরভাগ non-EU/EEA student tuition দেন, আর প্রতিটি university প্রতিটি programme-এর fee ঠিক করে — universityadmissions.se-তে programme দেখুন। Residence permit প্রক্রিয়া শুরুর আগে প্রথম কিস্তি দিতে হয়।")],
          [SE_UA_FEES],
          { status: 'not-verified' },
        ),
        qa(
          'scholarships',
          b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
          [b("The Swedish Institute scholarship open to Bangladeshi citizens is for master's studies only, not bachelor's. For bachelor's studies, only university scholarships may exist; they are not verified here.", "Bangladesh-এর নাগরিকদের জন্য খোলা Swedish Institute-এর scholarship শুধু master's-এর জন্য, bachelor's-এর নয়। Bachelor's-এর জন্য শুধু university-র scholarship থাকতে পারে; এখানে যাচাই হয়নি।")],
          [SE_SISGP, SE_UA_FEES],
          { status: 'partly-verified' },
        ),
      ],
    },
    { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [workUgPg('work')] },
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [afterUgPg('after')] },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b('SI scholarship for Bangladesh · deadline mid-January', 'Bangladesh-এর জন্য SI scholarship · শেষ তারিখ January-এর মাঝামাঝি'),
  intro: b(
    "A Swedish master's needs a bachelor's degree of at least 180 credits (or equivalent), English 6 and any programme requirements. You apply on universityadmissions.se (up to four programmes, deadline mid-January for autumn). Bangladeshi citizens can apply for the Swedish Institute Scholarship for Global Professionals. After graduating you can apply for up to one year to look for work.",
    "Sweden-এর master's-এ লাগে অন্তত ১৮০ credit-এর (বা সমমানের) bachelor's degree, English 6 আর programme-এর শর্ত। universityadmissions.se-তে আবেদন (সর্বোচ্চ চারটি programme, autumn-এর জন্য শেষ তারিখ January-এর মাঝামাঝি)। Bangladesh-এর নাগরিকরা Swedish Institute Scholarship for Global Professionals-এর আবেদন করতে পারেন। পড়া শেষে কাজ খোঁজার জন্য সর্বোচ্চ এক বছরের আবেদন করা যায়।",
  ),
  costs: { official: [PERMIT_FEE, FUNDS, APP_FEE], estimates: [TUITION_UU, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in Sweden?", "Sweden-এ Master's-এ কী লাগে?"),
          [b("A bachelor's degree of 180 credits (or equivalent), English 6 and the programme's specific requirements. You can apply for up to four programmes in one round. For Bangladesh, transcripts and the diploma must be issued and attested (stamped and signed) by the university itself — college-issued mark sheets and MyGov e-apostilles are not accepted.", "১৮০ credit-এর (বা সমমানের) bachelor's degree, English 6 আর programme-এর নির্দিষ্ট শর্ত। এক round-এ সর্বোচ্চ চারটি programme-এ আবেদন করা যায়। Bangladesh-এর জন্য transcript আর diploma university নিজে দেবে আর সত্যায়ন (সিল ও স্বাক্ষর) করবে — college-এর mark sheet আর MyGov-এর e-apostille গ্রহণযোগ্য নয়।"), CHECK_UNI],
          [SE_UA_APPLY, SE_UA_BD_MA],
        ),
        qa(
          'deadline',
          b("When do you apply for a Master's?", "Master's-এ কখন আবেদন করতে হয়?"),
          [b('In the first admission round: deadline in mid-January for the autumn semester (mid-August for spring). Non-EU/EEA students should not rely on the second round, because there is usually not enough time for the residence permit.', 'প্রথম admission round-এ: autumn semester-এর জন্য শেষ তারিখ January-এর মাঝামাঝি (spring-এর জন্য August-এর মাঝামাঝি)। Non-EU/EEA student-দের দ্বিতীয় round-এর উপর ভরসা করা উচিত নয়, কারণ residence permit-এর জন্য সাধারণত সময় থাকে না।')],
          [SE_UA_APPLY],
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
          [b('Usually English 6: IELTS Academic 6.5 overall with no section below 5.5. Some programmes require English 7: IELTS 7.0 with no section below 6.0.', 'সাধারণত English 6: IELTS Academic overall 6.5, কোনো section 5.5-এর নিচে নয়। কিছু programme English 7 চায়: IELTS 7.0, কোনো section 6.0-এর নিচে নয়।'), CHECK_UNI],
          [SE_UA_ENGLISH],
        ),
      ],
    },
    {
      id: 'tuition',
      title: b('Tuition and scholarships', 'Tuition আর scholarship'),
      items: [
        qa(
          'tuition',
          b("How much is a Master's in Sweden?", "Sweden-এ Master's-এ খরচ কত?"),
          [b("Each university sets its fees. Example: Uppsala University's master's fees page gives SEK 49,500 to 90,000 per semester depending on the programme. The first instalment must be paid before the residence permit process starts.", "প্রতিটি university নিজের fee ঠিক করে। উদাহরণ: Uppsala University-র master's fee page programme অনুযায়ী প্রতি semester-এ SEK 49,500 থেকে 90,000 দেখায়। Residence permit প্রক্রিয়া শুরুর আগে প্রথম কিস্তি দিতে হয়।")],
          [SE_UU_FEES, SE_UU_FINANCING, SE_UA_FEES],
          {
            kind: 'estimate',
            status: 'partly-verified',
            discrepancy: b("Uppsala University's own pages disagree: the fees page says SEK 49,500–90,000 per semester, while the financing page says SEK 50,000–72,500. Check the exact fee on your programme page.", "Uppsala University-র নিজের page-গুলো মেলে না: fee page বলে প্রতি semester-এ SEK 49,500–90,000, আর financing page বলে SEK 50,000–72,500। আপনার programme page-এ সঠিক fee দেখুন।"),
          },
        ),
        qa(
          'sisgp',
          b('Is there a scholarship for Bangladeshi students?', 'Bangladesh-এর student-দের জন্য কোনো scholarship আছে?'),
          [b("Yes: the Swedish Institute Scholarship for Global Professionals (SISGP) is open to citizens of 34 countries including Bangladesh, for full-time master's studies. It covers full tuition, SEK 12,000 a month for living and a one-time travel grant of SEK 15,000 (insurance is not included). You need at least 3,000 hours of work experience and leadership experience. The 2026 application period was 9–25 February 2026, for the autumn intake; you use your University Admissions application number.", "হ্যাঁ: Swedish Institute Scholarship for Global Professionals (SISGP) Bangladesh-সহ ৩৪টি দেশের নাগরিকদের জন্য, full-time master's-এ। এটা পুরো tuition, থাকার জন্য মাসে SEK 12,000 আর এককালীন SEK 15,000 travel grant দেয় (insurance নেই)। অন্তত ৩,০০০ ঘণ্টার কাজের অভিজ্ঞতা আর নেতৃত্বের অভিজ্ঞতা লাগে। 2026-এর আবেদন সময় ছিল ৯–২৫ February 2026, autumn intake-এর জন্য; University Admissions-এর আবেদন নম্বর লাগে।")],
          [SE_SISGP],
        ),
        { embed: 'scholarships' as const },
      ],
    },
    { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [workUgPg('work')] },
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [afterUgPg('after')] },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ PhD

const PHD: DegreeGuide = {
  level: 'phd',
  card: b('No tuition · apply to the university directly', 'Tuition নেই · সরাসরি university-তে আবেদন'),
  intro: b(
    'Doctoral students in Sweden are exempt from tuition fees and from the University Admissions application fee. Doctoral positions are applied for at each university. After completing doctoral studies, you can apply for a residence permit to look for work for between one year and 18 months.',
    'Sweden-এ doctoral student-রা tuition fee আর University Admissions-এর আবেদন fee থেকে ছাড়প্রাপ্ত। Doctoral position-এ প্রতিটি university-তে আবেদন করতে হয়। Doctoral পড়া শেষে কাজ খোঁজার জন্য এক বছর থেকে ১৮ মাসের residence permit-এর আবেদন করা যায়।',
  ),
  costs: { official: [PERMIT_FEE, FUNDS], estimates: [TUITION_PHD, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Sweden?', 'Sweden-এ কীভাবে PhD পাওয়া যায়?'),
          [
            b('Doctoral students are exempt from tuition and application fees. Entry requirements, the application process, funding and whether the position is employment are set by each university and were not verified here as general rules — read the position advert.', 'Doctoral student-রা tuition আর আবেদন fee থেকে ছাড়প্রাপ্ত। ভর্তির শর্ত, আবেদনের প্রক্রিয়া, funding আর position চাকরি কিনা — প্রতিটি university ঠিক করে, সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি — position-এর বিজ্ঞাপন পড়ুন।'),
            CHECK_UNI,
          ],
          [SE_UA_FEES],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'work',
      title: b('Working while studying', 'পড়ার সময় কাজ'),
      items: [
        qa(
          'work',
          b('Can doctoral students work alongside their studies?', 'Doctoral student-রা কি পড়ার পাশাপাশি কাজ করতে পারেন?'),
          [b("Not verified yet: the 15-hour weekly limit from 11 June 2026 is stated for studies at bachelor's or master's level; what applies to doctoral students was not stated on the pages read. Check with the Migration Agency and your university.", "এখনো যাচাই হয়নি: ১১ June 2026-এর সপ্তাহে ১৫ ঘণ্টার সীমা bachelor's বা master's পর্যায়ের জন্য বলা আছে; doctoral student-দের জন্য কী প্রযোজ্য, পড়া page-গুলোতে লেখা নেই। Migrationsverket আর আপনার university-র কাছে জেনে নিন।")],
          [SE_PERMIT, SE_NEW_RULES],
          { status: 'not-verified' },
        ),
      ],
    },
    {
      id: 'after',
      title: b('After your studies', 'পড়া শেষে'),
      items: [
        qa(
          'after',
          b('Can you stay in Sweden after a PhD?', 'PhD-র পরে Sweden-এ থাকা যায়?'),
          [b('After completing doctoral studies you can apply, before your permit expires, for a residence permit to look for work or start a business for between one year and 18 months. You must be able to support yourself (SEK 10,656 a month in 2026); the fee is SEK 1,500. It does not promise permanent residence.', 'Doctoral পড়া শেষে permit শেষ হওয়ার আগে কাজ খোঁজা বা ব্যবসা শুরুর জন্য এক বছর থেকে ১৮ মাসের residence permit-এর আবেদন করা যায়। নিজের খরচ চালানোর সামর্থ্য লাগে (2026-এ মাসে SEK 10,656); fee SEK 1,500। এটা স্থায়ী বসবাসের নিশ্চয়তা দেয় না।')],
          [SE_AFTER],
        ),
      ],
    },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ the country

export const SE_GUIDE: CountryGuide = {
  code: 'SE',
  checkedAt: SE_READ,
  sourcesPerSection: true,
  intro: b(
    "Sweden offers bachelor's and master's programmes in English through one central application site, universityadmissions.se (fee SEK 900). Bangladeshi students pay tuition (doctoral students do not), must show SEK 10,656 a month for the permit period, and — under new rules from 11 June 2026 — may work at most 15 hours a week during semesters at bachelor's or master's level. Master's students from Bangladesh can apply for the Swedish Institute scholarship. This guide is built from Migrationsverket, University Admissions in Sweden, Study in Sweden, the Swedish Institute and university pages.",
    "Sweden-এ ইংরেজিতে bachelor's আর master's programme একটি কেন্দ্রীয় আবেদন site-এ, universityadmissions.se-তে (fee SEK 900)। Bangladesh-এর student-রা tuition দেন (doctoral student-রা দেন না), permit-এর সময় জুড়ে মাসে SEK 10,656 দেখাতে হয়, আর ১১ June 2026-এর নতুন নিয়মে bachelor's বা master's পর্যায়ে semester-এ সপ্তাহে সর্বোচ্চ ১৫ ঘণ্টা কাজ করা যায়। Bangladesh-এর master's student-রা Swedish Institute-এর scholarship-এর আবেদন করতে পারেন। এই guide Migrationsverket, University Admissions in Sweden, Study in Sweden, Swedish Institute আর university-র page থেকে তৈরি।",
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [SE_NEW_RULES, SE_UA_BD_BA, SE_UA_BD_MA, SE_UA_APPLY, SE_PERMIT],
      {
        kind: 'guidance',
        list: [
          b('Believing old advice that students can work unlimited hours — from 11 June 2026 it is 15 hours a week during semesters.', 'পুরোনো পরামর্শ বিশ্বাস করা যে student-রা সীমা ছাড়া কাজ করতে পারেন — ১১ June 2026 থেকে semester-এ সপ্তাহে ১৫ ঘণ্টা।'),
          b('Using school English instead of an English test — Bangladeshi upper secondary English does not count.', 'English test-এর বদলে স্কুলের ইংরেজি ব্যবহার — Bangladesh-এর উচ্চমাধ্যমিকের ইংরেজি গণ্য হয় না।'),
          b("Submitting college-issued mark sheets or a MyGov e-apostille for a master's application — they are not accepted.", "Master's আবেদনে college-এর mark sheet বা MyGov-এর e-apostille দেওয়া — গ্রহণযোগ্য নয়।"),
          b('Applying in the second admission round when you need a residence permit.', 'Residence permit লাগলেও দ্বিতীয় admission round-এ আবেদন করা।'),
          b('Falling behind in credits — from 11 June 2026 you need 37.5 credits in the first year and 45 a year after that.', 'Credit-এ পিছিয়ে পড়া — ১১ June 2026 থেকে প্রথম বছরে ৩৭.৫ আর পরে প্রতি বছরে ৪৫ credit লাগে।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in Sweden from Bangladesh?", "Bangladesh থেকে Sweden-এ Bachelor's পড়তে কী কী লাগে?"), [b('The HSC from the Education Board (with a Mathematics pass if you graduated after 2009), an English test (IELTS 6.5, no section below 5.5), an application on universityadmissions.se, tuition paid, SEK 10,656 a month for living and a study permit.', 'শিক্ষা বোর্ডের HSC (2009-এর পরে পাশ করলে Mathematics-এ পাশসহ), English test (IELTS 6.5, কোনো section 5.5-এর নিচে নয়), universityadmissions.se-তে আবেদন, tuition দেওয়া, থাকার জন্য মাসে SEK 10,656 আর study permit।')], [SE_UA_BD_BA, SE_UA_ENGLISH, SE_PERMIT]),
    qa('hsc', b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"), [b('Yes for general eligibility: University Admissions accepts the Bangladesh HSC (also the Alim and Vocational HSC), issued by the Education Board. Programmes can add specific requirements, and you still need an English test.', 'সাধারণ যোগ্যতার জন্য হ্যাঁ: University Admissions শিক্ষা বোর্ডের দেওয়া Bangladesh-এর HSC (Alim আর Vocational HSC-ও) গ্রহণ করে। Programme নির্দিষ্ট শর্ত যোগ করতে পারে, আর English test তবুও লাগে।')], [SE_UA_BD_BA]),
    qa('cost', b('How much does it cost to study in Sweden?', 'Sweden-এ পড়াশোনার খরচ কত?'), [b("Tuition is set per programme (example: Uppsala University master's SEK 49,500–90,000 per semester); doctoral students pay none. Living: about SEK 10,656 a month (Study in Sweden), which is also the permit minimum in 2026. Application fee SEK 900; permit fee SEK 1,500.", "Tuition programme অনুযায়ী (উদাহরণ: Uppsala University master's প্রতি semester-এ SEK 49,500–90,000); doctoral student-রা দেন না। থাকা: মাসে প্রায় SEK 10,656 (Study in Sweden), যা 2026-এ permit-এর minimum-ও। আবেদন fee SEK 900; permit fee SEK 1,500।")], [SE_UU_FEES, SE_COSTS, SE_UA_FEES, SE_PERMIT], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for Sweden?', 'Sweden-এ IELTS কত লাগে?'), [b('English 6 (the usual requirement): IELTS Academic 6.5 with no section below 5.5. English 7: 7.0 with no section below 6.0.', 'English 6 (সাধারণ শর্ত): IELTS Academic 6.5, কোনো section 5.5-এর নিচে নয়। English 7: 7.0, কোনো section 6.0-এর নিচে নয়।')], [SE_UA_ENGLISH]),
    qa('visa', b('What do you need for the study permit?', 'Study permit-এর জন্য কী কী লাগে?'), [b('Admission to full-time studies, tuition paid before applying, at least SEK 10,656 a month for the whole permit period (2026), and health insurance if studying under a year. Apply online; fee SEK 1,500; you may be asked to show your passport or be interviewed at a Swedish embassy. The permit must be issued before you travel.', 'Full-time পড়ায় ভর্তি, আবেদনের আগে tuition দেওয়া, permit-এর পুরো সময়ের জন্য মাসে অন্তত SEK 10,656 (2026), আর এক বছরের কম পড়লে health insurance। Online-এ আবেদন; fee SEK 1,500; Swedish দূতাবাসে passport দেখাতে বা interview দিতে বলা হতে পারে। যাওয়ার আগেই permit পেতে হবে।')], [SE_PERMIT]),
    qa('work', b('Can you work while studying in Sweden?', 'Sweden-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b("At bachelor's or master's level, with a permit granted on or after 11 June 2026: at most 15 hours a week during semesters, unlimited in June, July and August.", "Bachelor's বা master's পর্যায়ে, ১১ June 2026 বা পরে permit পেলে: semester-এ সপ্তাহে সর্বোচ্চ ১৫ ঘণ্টা, June, July ও August-এ সীমা নেই।")], [SE_PERMIT, SE_NEW_RULES], { discrepancy: WORK_CHANGE }),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b("For master's studies: yes, the Swedish Institute Scholarship for Global Professionals includes Bangladesh (full tuition, SEK 12,000 a month, travel grant). For bachelor's: university scholarships only, not verified here. Doctoral students pay no tuition.", "Master's-এর জন্য: হ্যাঁ, Swedish Institute Scholarship for Global Professionals-এ Bangladesh আছে (পুরো tuition, মাসে SEK 12,000, travel grant)। Bachelor's-এর জন্য: শুধু university-র scholarship, এখানে যাচাই হয়নি। Doctoral student-রা tuition দেন না।")], [SE_SISGP, SE_UA_FEES], { status: 'partly-verified' }),
    qa('after', b('Can you stay in Sweden after graduating?', 'পড়া শেষে Sweden-এ থাকা যায়?'), [b("Yes, you can apply before your study permit expires for a permit to look for work: up to one year after bachelor's or master's studies, and between one year and 18 months after doctoral studies. You must have completed a programme of at least two semesters. It does not promise permanent residence.", "হ্যাঁ, study permit শেষ হওয়ার আগে কাজ খোঁজার permit-এর আবেদন করা যায়: bachelor's বা master's-এর পরে সর্বোচ্চ এক বছর, doctoral-এর পরে এক বছর থেকে ১৮ মাস। অন্তত দুই semester-এর programme শেষ করতে হবে। এটা স্থায়ী বসবাসের নিশ্চয়তা দেয় না।")], [SE_AFTER]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('At least SEK 10,656 a month if you apply in 2026, for the whole permit period, plus tuition paid before you apply.', '2026-এ আবেদন করলে permit-এর পুরো সময়ের জন্য মাসে অন্তত SEK 10,656, সঙ্গে আবেদনের আগে দেওয়া tuition।')], [SE_PERMIT]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b("Before admission (University Admissions): passport copy, English test, and the HSC with marks sheet (bachelor's) or university-attested transcripts and diploma (master's); for a PhD, the documents in the university's advert. After admission (permit): tuition payment, proof of funds, insurance if studying under a year, and a passport check or interview if asked.", "ভর্তির আগে (University Admissions): passport-এর কপি, English test, আর marks sheet-সহ HSC (bachelor's) বা university-সত্যায়িত transcript ও diploma (master's); PhD-তে university-র বিজ্ঞাপনের document। ভর্তির পরে (permit): tuition দেওয়া, টাকার প্রমাণ, এক বছরের কম পড়লে insurance, আর বলা হলে passport দেখানো বা interview।")], [SE_UA_BD_BA, SE_UA_BD_MA, SE_PERMIT]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A bachelor's of 180 credits (or equivalent), English 6 (IELTS 6.5, no section below 5.5), programme requirements, and university-attested documents for Bangladesh. Apply by mid-January for autumn; up to four programmes.", "১৮০ credit-এর (বা সমমানের) bachelor's, English 6 (IELTS 6.5, কোনো section 5.5-এর নিচে নয়), programme-এর শর্ত, আর Bangladesh-এর জন্য university-সত্যায়িত document। Autumn-এর জন্য January-এর মাঝামাঝির মধ্যে আবেদন; সর্বোচ্চ চারটি programme।")], [SE_UA_APPLY, SE_UA_ENGLISH, SE_UA_BD_MA]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Apply to the university for a doctoral position; doctoral students are exempt from tuition and the application fee. Entry rules and funding are set per position (not verified here as general rules).', 'Doctoral position-এর জন্য university-তে আবেদন; doctoral student-রা tuition আর আবেদন fee থেকে ছাড়প্রাপ্ত। ভর্তির নিয়ম আর funding প্রতিটি position-এ আলাদা (সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি)।')], [SE_UA_FEES], { status: 'partly-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — Chalmers University of Technology, KTH Royal Institute of Technology, Lund University, Stockholm University and Uppsala University — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — Chalmers University of Technology, KTH Royal Institute of Technology, Lund University, Stockholm University আর Uppsala University — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [SE_UA_APPLY]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b("Verified for Bangladesh: the HSC, Alim and Vocational HSC from the Education Board give general eligibility for bachelor's; school English does not count; master's documents must be issued and attested by the university (no college mark sheets or MyGov e-apostilles); Bangladesh is eligible for the SI Scholarship for Global Professionals. Where Bangladeshi applicants show their passport or are interviewed, and current processing times: not verified yet.", "Bangladesh-এর জন্য যাচাই করা: শিক্ষা বোর্ডের HSC, Alim আর Vocational HSC bachelor's-এর সাধারণ যোগ্যতা দেয়; স্কুলের ইংরেজি গণ্য হয় না; master's-এর document university নিজে দেবে ও সত্যায়ন করবে (college-এর mark sheet বা MyGov e-apostille নয়); Bangladesh SI Scholarship for Global Professionals-এর যোগ্য। Bangladesh-এর আবেদনকারীরা কোথায় passport দেখান বা interview দেন, আর বর্তমান processing time: এখনো যাচাই হয়নি।"),
    ], [SE_UA_BD_BA, SE_UA_BD_MA, SE_SISGP, SE_PERMIT]),
  ],
  life: [
    qa('health-care', b('How does healthcare work?', 'চিকিৎসা ব্যবস্থা কেমন?'), [b('Not verified yet beyond the permit rule: comprehensive health insurance is required if your studies last less than one year. What applies for longer programmes was not verified here — check with the Migration Agency and your university.', 'Permit-এর নিয়মের বাইরে এখনো যাচাই হয়নি: পড়া এক বছরের কম হলে comprehensive health insurance লাগে। দীর্ঘ programme-এ কী প্রযোজ্য, এখানে যাচাই হয়নি — Migrationsverket আর আপনার university-র কাছে জেনে নিন।')], [SE_PERMIT], { status: 'not-verified' }),
  ],
  documents: SE_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'estimate', status: 'partly-verified', value: { min: 49500, max: 90000, unit: 'SEK/semester', text: b("Set per programme; example: Uppsala University master's SEK 49,500–90,000 per semester. Doctoral students pay none.", "Programme অনুযায়ী; উদাহরণ: Uppsala University master's প্রতি semester-এ SEK 49,500–90,000। Doctoral student-রা দেন না।") }, source: SE_UU_FEES },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 10656, unit: 'SEK/month', text: b('At least SEK 10,656 a month (applications in 2026) for the whole permit period.', 'Permit-এর পুরো সময়ের জন্য মাসে অন্তত SEK 10,656 (2026-এ আবেদন)।') }, source: SE_PERMIT },
    { id: 'living-cost', kind: 'estimate', status: 'partly-verified', value: { min: 10656, unit: 'SEK/month', text: b('About SEK 10,656 a month (Study in Sweden).', 'মাসে প্রায় SEK 10,656 (Study in Sweden)।') }, source: SE_COSTS },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { max: 15, unit: 'hours/week', text: b("Bachelor's/master's permits from 11 June 2026: at most 15 hours a week in semesters; unlimited June–August.", "১১ June 2026 থেকে bachelor's/master's permit: semester-এ সপ্তাহে সর্বোচ্চ ১৫ ঘণ্টা; June–August সীমা নেই।") }, source: SE_NEW_RULES },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { max: 12, unit: 'months', text: b("Up to one year to look for work after bachelor's/master's studies (one year to 18 months after doctoral studies).", "Bachelor's/master's-এর পরে কাজ খোঁজার জন্য সর্বোচ্চ এক বছর (doctoral-এর পরে এক বছর থেকে ১৮ মাস)।") }, source: SE_AFTER },
    { id: 'english-programs', kind: 'fact', status: 'verified', value: { unit: 'programs', text: b("Bachelor's and master's programmes taught in English, applied for on universityadmissions.se.", "ইংরেজি-মাধ্যম bachelor's আর master's programme, universityadmissions.se-তে আবেদন।") }, source: SE_UA_APPLY },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 1500, unit: 'SEK', text: b('Study permit fee SEK 1,500 (adults).', 'Study permit fee SEK 1,500 (প্রাপ্তবয়স্ক)।') }, source: SE_PERMIT },
  ],
};

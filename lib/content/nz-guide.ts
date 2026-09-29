import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  NZ_AUT_ENTRY,
  NZ_COSTS,
  NZ_LINCOLN_ENTRY,
  NZ_MANAAKI,
  NZ_MASSEY_ENTRY,
  NZ_PHD,
  NZ_PSW,
  NZ_READ,
  NZ_TB,
  NZ_VISA,
  NZ_VUW_ENTRY,
  NZ_WAIKATO_ENTRY,
} from './nz-sources';

/**
 * New Zealand reading guide, researched on its own from New Zealand official
 * sources (Immigration New Zealand, Education New Zealand and university
 * pages). Nothing is taken from another country's guide. Amounts stay in New
 * Zealand dollars (NZD) and are never converted.
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
  'Requirements are not the same at every New Zealand university: each university and program sets its own. Always check the official page of the university you apply to.',
  'New Zealand-এর সব university-তে শর্ত এক নয়: প্রতিটি university আর program নিজের শর্ত ঠিক করে। যে university-তে আবেদন করবেন, তার official page অবশ্যই দেখে নিন।',
);

// ------------------------------------------------------------------ shared answers

const visa = (id: string) =>
  qa(
    id,
    b('What do you need for the New Zealand student visa?', 'New Zealand-এর student visa-র জন্য কী কী লাগে?'),
    [
      b(
        'The Fee Paying Student Visa needs an offer of place from an approved education provider, enough money for your tuition fees (or a scholarship) and your living expenses (or an acceptable sponsor), a way to leave New Zealand at the end (a ticket or money for one), good health, good character, a genuine reason to study, and full medical and travel insurance for your stay. Your provider must also declare that you have the English ability to pass the course.',
        'Fee Paying Student Visa-র জন্য লাগে: অনুমোদিত education provider-এর offer of place, tuition fee (বা scholarship) আর থাকার খরচের মতো টাকা (বা গ্রহণযোগ্য sponsor), শেষে New Zealand ছাড়ার ব্যবস্থা (টিকিট বা টিকিটের টাকা), ভালো স্বাস্থ্য, ভালো চরিত্র, পড়ার প্রকৃত কারণ, আর থাকার পুরো সময়ের medical ও travel insurance। Provider-কে ঘোষণাও দিতে হয় যে course পাশ করার মতো ইংরেজি আপনার আছে।',
      ),
      b(
        'The visa costs from NZD 850 (the exact fee depends on your country), lets you stay up to 4 years, and 80% of applications are processed within 8 weeks. Applying from outside New Zealand you can apply with a conditional offer: the visa can be approved in principle, but you need an unconditional offer and proof that your fees are paid before the visa is issued.',
        'Visa-র খরচ NZD 850 থেকে শুরু (সঠিক fee আপনার দেশের উপর নির্ভর করে), সর্বোচ্চ ৪ বছর থাকা যায়, আর ৮০% আবেদন ৮ সপ্তাহের মধ্যে process হয়। New Zealand-এর বাইরে থেকে conditional offer নিয়েও আবেদন করা যায়: visa নীতিগতভাবে অনুমোদন হতে পারে, কিন্তু visa দেওয়ার আগে unconditional offer আর fee দেওয়ার প্রমাণ লাগবে।',
      ),
    ],
    [NZ_VISA],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'Living expenses of NZD 20,000 for each year of tertiary study (or NZD 1,667 a month if the study is shorter than a year), plus proof that you can pay tuition for one course or one year, whichever is shorter — usually a receipt from your provider — plus a ticket out of New Zealand or money to buy one. A sponsor or guarantor can cover these.',
        'Tertiary পড়াশোনার প্রতি বছরের জন্য থাকার খরচ NZD 20,000 (পড়া এক বছরের কম হলে মাসে NZD 1,667), সঙ্গে এক course বা এক বছরের (যেটা কম) tuition দেওয়ার প্রমাণ — সাধারণত provider-এর রসিদ — সঙ্গে New Zealand ছাড়ার টিকিট বা টিকিটের টাকা। Sponsor বা guarantor এগুলো দিতে পারেন।',
      ),
    ],
    [NZ_VISA],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in New Zealand?', 'New Zealand-এ পড়ার পাশাপাশি কাজ করা যায়?'),
    [
      b(
        'Yes, if your visa conditions allow it: part-time up to 25 hours a week while studying, and full-time during scheduled holidays and the Christmas and New Year break. Study with New Zealand says PhD students have no limit on the hours they can work.',
        'হ্যাঁ, আপনার visa-র শর্ত অনুমতি দিলে: পড়ার সময় সপ্তাহে সর্বোচ্চ ২৫ ঘণ্টা part-time, আর নির্ধারিত ছুটি আর Christmas-New Year-এর ছুটিতে full-time। Study with New Zealand বলে PhD student-দের কাজের ঘণ্টার কোনো সীমা নেই।',
      ),
      b('The exact rights are printed on your visa — check them before you start work.', 'সঠিক অধিকার আপনার visa-তে লেখা থাকে — কাজ শুরুর আগে দেখে নিন।'),
    ],
    [NZ_VISA, NZ_PHD],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('What are the options to stay and work in New Zealand after your studies?', 'পড়া শেষে New Zealand-এ থাকা বা কাজ করার সুযোগ কী?'),
    [
      b(
        'The Post-Study Work Visa: up to 3 years depending on what you studied, from NZD 1,670, available once. With a degree at level 7 or higher (studied full-time in New Zealand for at least 30 weeks) you can work for any employer in any job; with a lower non-degree qualification the job must relate to your studies.',
        'Post-Study Work Visa: কী পড়েছেন তার উপর নির্ভর করে সর্বোচ্চ ৩ বছর, NZD 1,670 থেকে, শুধু একবার পাওয়া যায়। Level 7 বা তার বেশি degree থাকলে (New Zealand-এ অন্তত ৩০ সপ্তাহ full-time পড়া) যেকোনো নিয়োগকর্তার যেকোনো চাকরি করা যায়; নিচের non-degree qualification হলে চাকরি পড়ার বিষয়ের সঙ্গে সম্পর্কিত হতে হবে।',
      ),
      b(
        'Apply no later than 3 months after your student visa expires (6 months after a doctoral degree). It is temporary and does not promise permanent residence.',
        'Student visa শেষ হওয়ার ৩ মাসের মধ্যে আবেদন করুন (doctoral degree-র পরে ৬ মাস)। এটা অস্থায়ী, স্থায়ী বসবাসের নিশ্চয়তা দেয় না।',
      ),
    ],
    [NZ_PSW],
    { allDegrees: true },
  );

const health = (id: string) =>
  qa(
    id,
    b('What health checks and insurance do you need?', 'কী স্বাস্থ্য পরীক্ষা আর insurance লাগে?'),
    [
      b(
        'Bangladesh is not on Immigration New Zealand\'s list of countries with a low incidence of tuberculosis, so if you are coming for more than 6 months you need a chest X-ray. A full medical certificate is not usually needed for fee-paying students, but you must be in good health.',
        'Immigration New Zealand-এর যক্ষ্মা (TB)-কম দেশের তালিকায় Bangladesh নেই, তাই ৬ মাসের বেশি সময়ের জন্য গেলে chest X-ray লাগবে। Fee-paying student-দের সাধারণত পূর্ণ medical certificate লাগে না, তবে ভালো স্বাস্থ্য থাকতে হবে।',
      ),
      b(
        'Travel and health insurance from the start of your course until your visa expires is a visa condition; your provider tells you what it must cover or may arrange it. Immigration New Zealand says PhD students do not need to have insurance. A police certificate may be needed if you are 17 or older and will be in New Zealand for 24 months or longer.',
        'Course শুরু থেকে visa শেষ হওয়া পর্যন্ত travel আর health insurance visa-র শর্ত; কী কভার করতে হবে provider জানায়, বা ব্যবস্থা করে দিতে পারে। Immigration New Zealand বলে PhD student-দের insurance লাগে না। ১৭ বা তার বেশি বয়স হলে আর New Zealand-এ ২৪ মাস বা বেশি থাকলে police certificate লাগতে পারে।',
      ),
    ],
    [NZ_TB, NZ_VISA],
    { allDegrees: true },
  );

const tuition = (id: string, level: 'bachelors' | 'masters') =>
  qa(
    id,
    b('How much is tuition in New Zealand?', 'New Zealand-এ tuition কত?'),
    [
      level === 'bachelors'
        ? b('Study with New Zealand gives about NZD 35,000 to 55,000 a year for a bachelor\'s degree (figures updated March 2025). The exact fee depends on the university and subject.', 'Study with New Zealand-এর হিসাবে bachelor\'s degree-তে বছরে প্রায় NZD 35,000 থেকে 55,000 (March 2025-এ হালনাগাদ)। সঠিক fee university আর বিষয়ের উপর নির্ভর করে।')
        : b('Study with New Zealand gives about NZD 20,000 to 45,000 a year for a postgraduate degree. The exact fee depends on the university and subject.', 'Study with New Zealand-এর হিসাবে postgraduate degree-তে বছরে প্রায় NZD 20,000 থেকে 45,000। সঠিক fee university আর বিষয়ের উপর নির্ভর করে।'),
    ],
    [NZ_COSTS],
    { kind: 'estimate', status: 'partly-verified' },
  );

const living = (id: string) =>
  qa(
    id,
    b('How much are living costs?', 'থাকা-খাওয়ার খরচ কত?'),
    [
      b(
        'The visa minimum is NZD 20,000 a year. Study with New Zealand gives universities\' own estimates: NZD 20,000–27,000 a year at Victoria University of Wellington and the University of Auckland, and NZD 18,000–21,000 at the University of Otago. Costs depend on the city and your lifestyle.',
        'Visa-র minimum বছরে NZD 20,000। Study with New Zealand university-গুলোর নিজের হিসাব দেয়: Victoria University of Wellington আর University of Auckland-এ বছরে NZD 20,000–27,000, University of Otago-তে NZD 18,000–21,000। খরচ শহর আর জীবনযাপনের উপর নির্ভর করে।',
      ),
    ],
    [NZ_COSTS, NZ_VISA],
    {
      kind: 'estimate',
      status: 'partly-verified',
      allDegrees: true,
      discrepancy: b(
        'The visa minimum (NZD 20,000) is at the low end of the universities\' own estimates (up to NZD 27,000 in Wellington and Auckland) — budget for the university\'s figure, not only the visa minimum.',
        'Visa-র minimum (NZD 20,000) university-গুলোর নিজের হিসাবের নিচের দিকে (Wellington আর Auckland-এ NZD 27,000 পর্যন্ত) — শুধু visa-র minimum নয়, university-র অঙ্ক ধরে বাজেট করুন।',
      ),
    },
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'The New Zealand Government\'s Manaaki New Zealand Scholarships are not open to Bangladesh: Bangladesh is not on the eligible-country list (the eligible Asian countries are Cambodia, Indonesia, Lao PDR, Malaysia, Nepal, the Philippines, Thailand, Timor-Leste and Viet Nam). Posts online that say otherwise are wrong.',
        'New Zealand সরকারের Manaaki New Zealand Scholarship Bangladesh-এর জন্য খোলা নয়: যোগ্য দেশের তালিকায় Bangladesh নেই (যোগ্য এশীয় দেশ: Cambodia, Indonesia, Lao PDR, Malaysia, Nepal, Philippines, Thailand, Timor-Leste আর Viet Nam)। অনলাইনে যেসব পোস্ট অন্য কথা বলে, সেগুলো ভুল।',
      ),
      b('University scholarships for international students exist at some universities but are not verified here — check each university\'s scholarship page.', 'কিছু university-তে international student-দের scholarship আছে, তবে এখানে যাচাই হয়নি — প্রতিটি university-র scholarship page দেখুন।'),
    ],
    [NZ_MANAAKI],
    { status: 'partly-verified', allDegrees: true },
  );

// ------------------------------------------------------------------ documents

const INZ = b('Immigration New Zealand.', 'New Zealand-এর অভিবাসন দপ্তর Immigration New Zealand।');

export const NZ_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Needed for the university application and the visa.', 'University-র আবেদন আর visa — দুটোতেই লাগে।'),
    who: INZ,
    when: b('From the application to arrival.', 'আবেদন থেকে পৌঁছানো পর্যন্ত।'),
    where: b('University application and the online visa application.', 'University-র আবেদন আর online visa আবেদন।'),
    prepare: b('Check that it is valid for your whole stay.', 'পুরো থাকার সময় বৈধ কিনা দেখে নিন।'),
    groups: ['general', 'visa'],
    sources: [NZ_VISA],
  },
  {
    id: 'academic',
    name: b('Certificates and transcripts', 'সনদ আর transcript'),
    why: b('University documents (before admission): show you meet the academic entry requirement of your program.', 'University-র document (ভর্তির আগে): দেখায় যে আপনার program-এর academic শর্ত পূরণ করছেন।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('With the application.', 'আবেদনের সময়।'),
    where: b('The university\'s international application.', 'University-র international আবেদনে।'),
    prepare: b('SSC/HSC or degree certificates and full transcripts; each university lists what it needs.', 'SSC/HSC বা degree-র সনদ আর পূর্ণ transcript; কী লাগবে প্রতিটি university জানায়।'),
    groups: ['general', 'program'],
    sources: [NZ_WAIKATO_ENTRY, NZ_MASSEY_ENTRY],
  },
  {
    id: 'english',
    name: b('English test result', 'ইংরেজি test-এর ফল'),
    why: b('University document: the visa itself has no set score — your provider declares your English is enough to pass.', 'University-র document: visa-র নিজের কোনো নির্দিষ্ট score নেই — provider ঘোষণা দেয় যে আপনার ইংরেজি পাশ করার মতো।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('Before or with the application.', 'আবেদনের আগে বা সঙ্গে।'),
    where: b('Sent to the university.', 'University-তে পাঠাতে হয়।'),
    prepare: b('Example (Waikato): IELTS Academic 6.0 with no band below 5.5 for undergraduate, 6.5 with no band below 6.0 for postgraduate.', 'উদাহরণ (Waikato): undergraduate-এ IELTS Academic 6.0, কোনো band 5.5-এর নিচে নয়; postgraduate-এ 6.5, কোনো band 6.0-এর নিচে নয়।'),
    groups: ['program'],
    sources: [NZ_WAIKATO_ENTRY, NZ_VISA],
  },
  {
    id: 'research',
    name: b('Research experience and supervisor support (PhD)', 'গবেষণার অভিজ্ঞতা আর supervisor-এর সমর্থন (PhD)'),
    why: b('University requirement: you need experience in independent research and may need a supervisor\'s support before applying.', 'University-র শর্ত: স্বাধীন গবেষণার অভিজ্ঞতা লাগে, আর আবেদনের আগে supervisor-এর সমর্থন লাগতে পারে।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('Before applying.', 'আবেদনের আগে।'),
    where: b('Contact your preferred university directly.', 'পছন্দের university-র সঙ্গে সরাসরি যোগাযোগ করুন।'),
    prepare: b('Research proposal format: not verified here — check the university.', 'Research proposal-এর ধরন: এখানে যাচাই হয়নি — university দেখুন।'),
    groups: ['program'],
    degrees: ['phd'],
    status: 'partly-verified',
    sources: [NZ_PHD],
  },
  {
    id: 'offer',
    name: b('Offer of place (with the provider\'s declaration)', 'Offer of place (provider-এর ঘোষণাসহ)'),
    why: b('Visa document (after admission): from an approved provider; it includes a signed declaration that the course suits you and your English is adequate.', 'Visa-র document (ভর্তির পরে): অনুমোদিত provider-এর; এতে স্বাক্ষরিত ঘোষণা থাকে যে course আপনার জন্য উপযুক্ত আর আপনার ইংরেজি যথেষ্ট।'),
    who: b('Your education provider.', 'আপনার education provider।'),
    when: b('Before the visa is issued (a conditional offer is enough to apply from outside New Zealand).', 'Visa দেওয়ার আগে (বাইরে থেকে আবেদনের জন্য conditional offer-ই যথেষ্ট)।'),
    where: b('Uploaded with the visa application.', 'Visa আবেদনের সঙ্গে upload।'),
    prepare: b('An unconditional offer is needed before final approval.', 'চূড়ান্ত অনুমোদনের আগে unconditional offer লাগবে।'),
    groups: ['visa'],
    sources: [NZ_VISA],
  },
  {
    id: 'fees-paid',
    name: b('Tuition fee receipt', 'Tuition fee-র রসিদ'),
    why: b('Visa document: proof you paid fees for one course or one year, whichever is shorter.', 'Visa-র document: এক course বা এক বছরের (যেটা কম) fee দেওয়ার প্রমাণ।'),
    who: INZ,
    when: b('Before the visa is issued — from outside NZ you may pay after approval in principle.', 'Visa দেওয়ার আগে — বাইরে থেকে নীতিগত অনুমোদনের পরে দেওয়া যায়।'),
    where: b('A letter or receipt from your provider.', 'Provider-এর চিঠি বা রসিদ।'),
    prepare: b('Keep the receipt showing the course value.', 'Course-এর মূল্য লেখা রসিদ রেখে দিন।'),
    groups: ['visa'],
    sources: [NZ_VISA],
  },
  {
    id: 'finance',
    name: b('Proof of living funds and onward travel', 'থাকার খরচ আর ফেরার যাতায়াতের প্রমাণ'),
    why: b('Visa document: NZD 20,000 a year of study, and a ticket out or money for one.', 'Visa-র document: পড়ার প্রতি বছরে NZD 20,000, আর ফেরার টিকিট বা তার টাকা।'),
    who: INZ,
    when: b('With the visa application.', 'Visa আবেদনের সঙ্গে।'),
    where: b('Uploaded with the application.', 'আবেদনের সঙ্গে upload।'),
    prepare: b('Your own funds, or a sponsor\'s bank statements or guarantee.', 'নিজের টাকা, বা sponsor-এর bank statement বা guarantee।'),
    groups: ['visa'],
    sources: [NZ_VISA],
  },
  {
    id: 'xray',
    name: b('Chest X-ray', 'Chest X-ray (বুকের এক্স-রে)'),
    why: b('Visa health requirement: Bangladesh is not a low-TB-incidence country, so stays over 6 months need a chest X-ray.', 'Visa-র স্বাস্থ্য শর্ত: Bangladesh TB-কম দেশ নয়, তাই ৬ মাসের বেশি থাকলে chest X-ray লাগে।'),
    who: INZ,
    when: b('Before the visa application.', 'Visa আবেদনের আগে।'),
    where: b('A clinic approved by Immigration New Zealand (Bangladesh clinics: not verified here).', 'Immigration New Zealand-অনুমোদিত clinic (Bangladesh-এর clinic এখানে যাচাই হয়নি)।'),
    prepare: b('Follow Immigration New Zealand\'s health instructions.', 'Immigration New Zealand-এর স্বাস্থ্য-নির্দেশনা মেনে চলুন।'),
    groups: ['visa', 'bangladesh'],
    status: 'partly-verified',
    sources: [NZ_TB, NZ_VISA],
  },
  {
    id: 'police',
    name: b('Police certificate (if needed)', 'Police certificate (লাগলে)'),
    why: b('Visa character requirement: may be needed if you are 17+ and will be in New Zealand 24 months or longer.', 'Visa-র চরিত্রের শর্ত: ১৭+ বয়স আর New Zealand-এ ২৪ মাস বা বেশি থাকলে লাগতে পারে।'),
    who: INZ,
    when: b('Less than 6 months old when you apply.', 'আবেদনের সময় ৬ মাসের কম পুরোনো।'),
    where: b('Issued in each country you have lived in.', 'যে দেশে থেকেছেন, সেখান থেকে।'),
    prepare: b('Apply early — it can take time.', 'আগেভাগে আবেদন করুন — সময় লাগতে পারে।'),
    groups: ['visa'],
    sources: [NZ_VISA],
  },
  {
    id: 'insurance',
    name: b('Medical and travel insurance', 'Medical আর travel insurance'),
    why: b('Visa condition from the start of the course until the visa expires (not needed for PhD students).', 'Course শুরু থেকে visa শেষ পর্যন্ত visa-র শর্ত (PhD student-দের লাগে না)।'),
    who: b('Immigration New Zealand; your provider says what it must cover.', 'Immigration New Zealand; কী কভার করতে হবে provider জানায়।'),
    when: b('Before your course starts.', 'Course শুরুর আগে।'),
    where: b('Often arranged through the university.', 'প্রায়ই university-র মাধ্যমে।'),
    prepare: b('Check it is acceptable to your provider.', 'Provider-এর কাছে গ্রহণযোগ্য কিনা দেখে নিন।'),
    groups: ['visa', 'arrival'],
    sources: [NZ_VISA],
  },
];

// ------------------------------------------------------------------ costs (NZD, never converted)

const VISA_FEE: GuideCost = { id: 'visa-fee', label: b('Fee Paying Student Visa', 'Fee Paying Student Visa'), value: b('From NZD 850', 'NZD 850 থেকে'), amount: { value: 850, currency: 'NZD', period: 'one-time' }, note: b('The exact fee depends on your country.', 'সঠিক fee আপনার দেশের উপর নির্ভর করে।'), source: NZ_VISA };
const LIVING: GuideCost = { id: 'funds-living', label: b('Living costs to show (visa minimum)', 'দেখাতে হবে থাকার খরচ (visa-র minimum)'), value: b('NZD 20,000 per year of study', 'পড়ার প্রতি বছরে NZD 20,000'), amount: { value: 20000, currency: 'NZD', period: 'year' }, source: NZ_VISA };
const PSW_FEE: GuideCost = { id: 'psw-fee', label: b('Post-Study Work Visa (later)', 'Post-Study Work Visa (পরে)'), value: b('From NZD 1,670', 'NZD 1,670 থেকে'), amount: { value: 1670, currency: 'NZD', period: 'one-time' }, source: NZ_PSW };
const TUITION_UG: GuideCost = { id: 'tuition', label: b('Tuition — bachelor\'s (Study with New Zealand range)', 'Tuition — bachelor\'s (Study with New Zealand-এর সীমা)'), value: b('About NZD 35,000–55,000 a year', 'বছরে প্রায় NZD 35,000–55,000'), status: 'partly-verified', amount: { value: 35000, max: 55000, currency: 'NZD', period: 'year' }, source: NZ_COSTS };
const TUITION_PG: GuideCost = { id: 'tuition', label: b('Tuition — postgraduate (Study with New Zealand range)', 'Tuition — postgraduate (Study with New Zealand-এর সীমা)'), value: b('About NZD 20,000–45,000 a year', 'বছরে প্রায় NZD 20,000–45,000'), status: 'partly-verified', amount: { value: 20000, max: 45000, currency: 'NZD', period: 'year' }, source: NZ_COSTS };
const TUITION_PHD: GuideCost = { id: 'tuition', label: b('Tuition — PhD (same as domestic students)', 'Tuition — PhD (দেশীয় student-দের সমান)'), value: b('About NZD 6,500–7,500 a year for most subjects', 'বেশিরভাগ বিষয়ে বছরে প্রায় NZD 6,500–7,500'), status: 'partly-verified', amount: { value: 6500, max: 7500, currency: 'NZD', period: 'year' }, source: NZ_COSTS };
const UNVERIFIED: GuideCost[] = [
  { id: 'application-fee', label: b('University application fee', 'University-র আবেদন fee'), value: b('Not verified — set by each university', 'যাচাই হয়নি — প্রতিটি university ঠিক করে'), status: 'not-verified', source: NZ_COSTS },
  { id: 'insurance', label: b('Medical and travel insurance', 'Medical আর travel insurance'), value: b('Not verified — depends on the policy', 'যাচাই হয়নি — policy-র উপর নির্ভর করে'), status: 'not-verified', source: NZ_VISA },
  { id: 'rent', label: b('Accommodation', 'বাসাভাড়া'), value: b('Not verified — varies by city', 'যাচাই হয়নি — শহর অনুযায়ী আলাদা'), status: 'not-verified', source: NZ_COSTS },
  { id: 'health-checks', label: b('Chest X-ray and police certificate', 'Chest X-ray আর police certificate'), value: b('Not verified', 'যাচাই হয়নি'), status: 'not-verified', source: NZ_TB },
];

// ------------------------------------------------------------------ common sections

const commonTail = () => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [living('living'), { embed: 'costs' as const }, funds('funds')] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa('types', b('Which universities are there?', 'কোন কোন university আছে?'), [b('The examples below are New Zealand universities, listed alphabetically, not ordered by quality. Entry rules, fees and scholarships differ at each, so check the official page.', 'নিচের উদাহরণগুলো New Zealand-এর university, বর্ণানুক্রমে, মান অনুযায়ী নয়। ভর্তির নিয়ম, fee আর scholarship প্রতিটিতে আলাদা, তাই official page দেখুন।')], [NZ_COSTS]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work')] },
  { id: 'visa', title: b('Student visa', 'Student visa'), items: [visa('visa'), health('health')] },
  { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('After HSC with a GPA of 4.0/5.0 at many universities', 'অনেক university-তে HSC-তে GPA 4.0/5.0-এর পরে'),
  intro: b(
    "Several New Zealand universities accept the Bangladesh HSC directly for a bachelor's degree, usually with a GPA of 4.0 out of 5.0. You apply to the university, receive an offer of place, and apply for the Fee Paying Student Visa. Graduates with a degree can apply for a Post-Study Work Visa of up to 3 years.",
    "New Zealand-এর কয়েকটি university bachelor's-এ সরাসরি Bangladesh-এর HSC গ্রহণ করে, সাধারণত ৫-এর মধ্যে GPA 4.0 থাকলে। University-তে আবেদন করে offer of place নিয়ে Fee Paying Student Visa-র আবেদন। Degree শেষে সর্বোচ্চ ৩ বছরের Post-Study Work Visa-র আবেদন করা যায়।",
  ),
  costs: { official: [VISA_FEE, LIVING, PSW_FEE], estimates: [TUITION_UG, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in New Zealand from Bangladesh?", "Bangladesh থেকে New Zealand-এ Bachelor's পড়তে কী কী লাগে?"),
          [b('Your HSC (or Alim, if the university accepts it) with the required GPA, an English test score, and the university\'s application. Then an offer of place, tuition payment, living funds, a chest X-ray and the student visa.', 'প্রয়োজনীয় GPA-সহ আপনার HSC (বা university মানলে Alim), English test score আর university-র আবেদন। তারপর offer of place, tuition দেওয়া, থাকার খরচের টাকা, chest X-ray আর student visa।'), CHECK_UNI],
          [NZ_WAIKATO_ENTRY, NZ_VISA, NZ_TB],
        ),
        qa(
          'hsc',
          b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"),
          [
            b(
              'Yes at many universities: the University of Waikato, Massey University, AUT and Lincoln University all accept the Bangladesh HSC with a GPA of 4.0 out of 5.0 (Lincoln also specifies the subject groups). Waikato and AUT note that each university decides whether it accepts the Alim as equivalent.',
              'অনেক university-তে হ্যাঁ: University of Waikato, Massey University, AUT আর Lincoln University — সবাই ৫-এর মধ্যে GPA 4.0-সহ Bangladesh-এর HSC গ্রহণ করে (Lincoln বিষয়ের গ্রুপও ঠিক করে দেয়)। Waikato আর AUT জানায়, Alim-কে সমমান ধরবে কিনা প্রতিটি university নিজে ঠিক করে।',
            ),
            CHECK_UNI,
          ],
          [NZ_WAIKATO_ENTRY, NZ_MASSEY_ENTRY, NZ_AUT_ENTRY, NZ_LINCOLN_ENTRY],
        ),
      ],
    },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b('What is the full process, step by step?', 'পুরো প্রক্রিয়া ধাপে ধাপে কেমন?'),
          [b('1) Check the university\'s Bangladesh entry requirement. 2) Take an English test. 3) Apply to the university and get an offer of place. 4) Pay the first year\'s tuition (from outside New Zealand you may wait until the visa is approved in principle). 5) Get a chest X-ray and prepare proof of NZD 20,000 a year and a return ticket or funds. 6) Apply for the Fee Paying Student Visa. Intake dates and application deadlines are set by each university and are not verified here.', '১) University-র Bangladesh-এর ভর্তির শর্ত দেখুন। ২) English test দিন। ৩) University-তে আবেদন করে offer of place নিন। ৪) প্রথম বছরের tuition দিন (বাইরে থেকে visa নীতিগতভাবে অনুমোদন পর্যন্ত অপেক্ষা করা যায়)। ৫) Chest X-ray করান আর বছরে NZD 20,000 ও ফেরার টিকিট বা টাকার প্রমাণ তৈরি করুন। ৬) Fee Paying Student Visa-র আবেদন করুন। ভর্তির সময় আর শেষ তারিখ প্রতিটি university ঠিক করে, এখানে যাচাই হয়নি।')],
          [NZ_WAIKATO_ENTRY, NZ_VISA, NZ_TB],
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
          b('How much IELTS do you need for New Zealand?', 'New Zealand-এ IELTS কত লাগে?'),
          [b("For a bachelor's, examples: the University of Waikato asks for IELTS Academic 6.0 with no band below 5.5 (or TOEFL iBT 80 with writing 21, or PTE Academic 50 with no score below 42); Victoria University of Wellington also asks for IELTS 6.0 with no band below 5.5 (some programs, such as midwifery, need 7.0). The visa itself sets no score.", "Bachelor's-এর উদাহরণ: University of Waikato চায় IELTS Academic 6.0, কোনো band 5.5-এর নিচে নয় (বা TOEFL iBT 80, writing 21; বা PTE Academic 50, কোনো score 42-এর নিচে নয়); Victoria University of Wellington-ও IELTS 6.0, কোনো band 5.5-এর নিচে নয় চায় (midwifery-র মতো কিছু program-এ 7.0)। Visa-র নিজের কোনো score নেই।"), CHECK_UNI],
          [NZ_WAIKATO_ENTRY, NZ_VUW_ENTRY, NZ_VISA],
        ),
      ],
    },
    { id: 'scholarships', title: b('Scholarships', 'Scholarship'), items: [scholarships('scholarships')] },
    { id: 'tuition', title: b('Tuition', 'Tuition'), items: [tuition('tuition', 'bachelors')] },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b("After a bachelor's · often with a B average", "Bachelor's-এর পরে · প্রায়ই B গড়সহ"),
  intro: b(
    "New Zealand master's degrees are taught or by thesis. Universities ask for a recognised bachelor's degree with a set average and a higher English score than for undergraduate study. After the course, a Post-Study Work Visa of up to 3 years is possible.",
    "New Zealand-এর master's হয় taught বা thesis-ভিত্তিক। University স্বীকৃত bachelor's degree আর নির্দিষ্ট গড় চায়, আর undergraduate-এর চেয়ে বেশি English score। Course শেষে সর্বোচ্চ ৩ বছরের Post-Study Work Visa সম্ভব।",
  ),
  costs: { official: [VISA_FEE, LIVING, PSW_FEE], estimates: [TUITION_PG, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in New Zealand?", "New Zealand-এ Master's-এ কী লাগে?"),
          [b("Example (University of Waikato): a recognised bachelor's degree, or a qualification the Academic Board considers equivalent, with a B-/B/B+ average (B/B+ for a master's by thesis), and the same average in a relevant subject if required; some faculties require an honours degree.", "উদাহরণ (University of Waikato): স্বীকৃত bachelor's degree, বা Academic Board যাকে সমমান মনে করে, B-/B/B+ গড়সহ (thesis-ভিত্তিক master's-এ B/B+), আর লাগলে প্রাসঙ্গিক বিষয়েও একই গড়; কিছু faculty honours degree চায়।"), CHECK_UNI],
          [NZ_WAIKATO_ENTRY],
        ),
        qa(
          'cgpa',
          b('How is a Bangladeshi CGPA compared?', 'Bangladesh-এর CGPA কীভাবে তুলনা করা হয়?'),
          [b('Not verified yet: how each university converts a Bangladeshi CGPA to its B average, and whether a three-year degree is accepted, is not stated on the pages read. Ask the university\'s international admissions office.', 'এখনো যাচাই হয়নি: প্রতিটি university Bangladesh-এর CGPA কীভাবে তাদের B গড়ে রূপান্তর করে, আর তিন বছরের degree গ্রহণ করে কিনা, পড়া page-গুলোতে লেখা নেই। University-র international admissions office-কে জিজ্ঞেস করুন।')],
          [NZ_WAIKATO_ENTRY],
          { status: 'not-verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('English and IELTS', 'ইংরেজি আর IELTS'),
      items: [
        qa(
          'english',
          b('How much IELTS do you need for a Master\'s?', 'Master\'s-এ IELTS কত লাগে?'),
          [b('Example (University of Waikato, postgraduate): IELTS Academic 6.5 with no band below 6.0, TOEFL iBT 90 with writing 21, or PTE Academic 58 with no score below 50.', 'উদাহরণ (University of Waikato, postgraduate): IELTS Academic 6.5, কোনো band 6.0-এর নিচে নয়; TOEFL iBT 90, writing 21; বা PTE Academic 58, কোনো score 50-এর নিচে নয়।'), CHECK_UNI],
          [NZ_WAIKATO_ENTRY],
        ),
      ],
    },
    { id: 'scholarships', title: b('Scholarships', 'Scholarship'), items: [scholarships('scholarships')] },
    { id: 'tuition', title: b('Tuition', 'Tuition'), items: [tuition('tuition', 'masters')] },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ PhD

const PHD: DegreeGuide = {
  level: 'phd',
  card: b('Research doctorate · domestic fees for international students', 'গবেষণা doctorate · international student-দের দেশীয় fee'),
  intro: b(
    "International PhD students in New Zealand pay the same fees as New Zealand students — about NZD 6,500–7,500 a year for most subjects. A PhD usually takes 3 or 4 years of full-time research; you need independent research experience and may need a supervisor's support before applying. Study with New Zealand says PhD students have no limit on work hours, and partners can apply for an open work visa.",
    "New Zealand-এ international PhD student-রা New Zealand-এর student-দের সমান fee দেন — বেশিরভাগ বিষয়ে বছরে প্রায় NZD 6,500–7,500। PhD-তে সাধারণত ৩ বা ৪ বছর full-time গবেষণা লাগে; স্বাধীন গবেষণার অভিজ্ঞতা লাগে, আর আবেদনের আগে supervisor-এর সমর্থন লাগতে পারে। Study with New Zealand বলে PhD student-দের কাজের ঘণ্টার সীমা নেই, আর partner open work visa-র আবেদন করতে পারেন।",
  ),
  costs: { official: [VISA_FEE, LIVING, PSW_FEE], estimates: [TUITION_PHD, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'master',
          b('What do you need for a PhD in New Zealand?', 'New Zealand-এ PhD-তে কী লাগে?'),
          [
            b('Your qualifications must show sufficient knowledge of your subject, and you must have experience in independent research. You may need the support of a research supervisor before you can apply — contact your preferred university directly.', 'আপনার qualification-এ বিষয়ে যথেষ্ট জ্ঞান দেখাতে হবে, আর স্বাধীন গবেষণার অভিজ্ঞতা থাকতে হবে। আবেদনের আগে research supervisor-এর সমর্থন লাগতে পারে — পছন্দের university-র সঙ্গে সরাসরি যোগাযোগ করুন।'),
            b('Minimum grades, research proposal and interview: not verified yet as general rules — each university sets its own.', 'Minimum grade, research proposal আর interview: সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি — প্রতিটি university নিজে ঠিক করে।'),
            CHECK_UNI,
          ],
          [NZ_PHD],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'funding',
      title: b('Fees, funding and family', 'Fee, funding আর পরিবার'),
      items: [
        qa(
          'fees',
          b('How much does a PhD cost?', 'PhD-তে খরচ কত?'),
          [b('International PhD students pay the same as New Zealand PhD students: about NZD 6,500 to 7,500 a year for most subjects (updated March 2025). Living costs and the visa funds requirement still apply. PhD scholarships and stipends are set by each university and are not verified here.', 'International PhD student-রা New Zealand-এর PhD student-দের সমান দেন: বেশিরভাগ বিষয়ে বছরে প্রায় NZD 6,500 থেকে 7,500 (March 2025-এ হালনাগাদ)। থাকার খরচ আর visa-র টাকার শর্ত তবুও থাকে। PhD scholarship আর stipend প্রতিটি university ঠিক করে, এখানে যাচাই হয়নি।')],
          [NZ_COSTS, NZ_PHD],
          { kind: 'estimate', status: 'partly-verified' },
        ),
        qa(
          'family',
          b('Can your family come with you?', 'পরিবার সঙ্গে যেতে পারে কি?'),
          [b('Study with New Zealand says a PhD student\'s partner or spouse can apply for an open work visa for the duration of the studies, and children can be enrolled as domestic students in state schools. Each family member applies for their own visa.', 'Study with New Zealand বলে PhD student-এর partner বা spouse পড়ার পুরো সময়ের জন্য open work visa-র আবেদন করতে পারেন, আর সন্তানদের state school-এ দেশীয় student হিসেবে ভর্তি করা যায়। পরিবারের প্রত্যেকে নিজের visa-র আবেদন করেন।')],
          [NZ_PHD, NZ_VISA],
        ),
        scholarships('scholarships'),
      ],
    },
    {
      id: 'language',
      title: b('English and IELTS', 'ইংরেজি আর IELTS'),
      items: [
        qa(
          'english',
          b('How much IELTS do you need for a PhD?', 'PhD-তে IELTS কত লাগে?'),
          [b('Not verified yet as a general rule for doctoral study: each university sets its own score. For comparison, the University of Waikato\'s postgraduate requirement is IELTS Academic 6.5 with no band below 6.0.', 'Doctoral পড়াশোনার সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: প্রতিটি university নিজের score ঠিক করে। তুলনার জন্য, University of Waikato-র postgraduate শর্ত IELTS Academic 6.5, কোনো band 6.0-এর নিচে নয়।')],
          [NZ_WAIKATO_ENTRY],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ the country

export const NZ_GUIDE: CountryGuide = {
  code: 'NZ',
  checkedAt: NZ_READ,
  sourcesPerSection: true,
  intro: b(
    "New Zealand offers bachelor's, master's and PhD degrees in English. Many universities accept the Bangladesh HSC directly; international PhD students pay domestic fees. You need an offer of place and the Fee Paying Student Visa, which allows up to 25 hours of work a week; afterwards a Post-Study Work Visa of up to 3 years is possible. This guide is built from Immigration New Zealand, Education New Zealand and university pages.",
    "New Zealand-এ ইংরেজিতে bachelor's, master's আর PhD পড়া যায়। অনেক university সরাসরি Bangladesh-এর HSC গ্রহণ করে; international PhD student-রা দেশীয় fee দেন। Offer of place আর Fee Paying Student Visa লাগে, যাতে সপ্তাহে ২৫ ঘণ্টা পর্যন্ত কাজ করা যায়; পরে সর্বোচ্চ ৩ বছরের Post-Study Work Visa সম্ভব। এই guide Immigration New Zealand, Education New Zealand আর university-র page থেকে তৈরি।",
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [NZ_MANAAKI, NZ_VISA, NZ_TB, NZ_COSTS, NZ_PSW],
      {
        kind: 'guidance',
        list: [
          b('Believing online posts that Manaaki scholarships are open to Bangladesh — they are not.', 'Manaaki scholarship Bangladesh-এর জন্য খোলা — অনলাইনের এমন পোস্ট বিশ্বাস করা; আসলে খোলা নয়।'),
          b('Budgeting only the NZD 20,000 visa minimum when universities estimate up to NZD 27,000 a year.', 'University-র হিসাব বছরে NZD 27,000 পর্যন্ত হলেও শুধু visa-র NZD 20,000 ধরে বাজেট করা।'),
          b('Forgetting the chest X-ray (Bangladesh is not a low-TB-incidence country).', 'Chest X-ray ভুলে যাওয়া (Bangladesh TB-কম দেশ নয়)।'),
          b('Working more than the hours on your visa.', 'Visa-য় লেখা ঘণ্টার বেশি কাজ করা।'),
          b('Missing the Post-Study Work Visa deadline (3 months after your student visa expires).', 'Post-Study Work Visa-র শেষ তারিখ মিস করা (student visa শেষের ৩ মাস পরে)।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in New Zealand from Bangladesh?", "Bangladesh থেকে New Zealand-এ Bachelor's পড়তে কী কী লাগে?"), [b('HSC with the required GPA (often 4.0 out of 5.0), an English score, a university offer of place, the first year\'s tuition paid, NZD 20,000 a year for living, a chest X-ray and the Fee Paying Student Visa.', 'প্রয়োজনীয় GPA-সহ HSC (প্রায়ই ৫-এর মধ্যে 4.0), English score, university-র offer of place, প্রথম বছরের tuition দেওয়া, থাকার জন্য বছরে NZD 20,000, chest X-ray আর Fee Paying Student Visa।')], [NZ_WAIKATO_ENTRY, NZ_VISA, NZ_TB]),
    qa('hsc', b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"), [b('Yes at many universities: Waikato, Massey, AUT and Lincoln accept the Bangladesh HSC with a GPA of 4.0 out of 5.0. Each university sets its own rules.', 'অনেক university-তে হ্যাঁ: Waikato, Massey, AUT আর Lincoln ৫-এর মধ্যে GPA 4.0-সহ Bangladesh-এর HSC গ্রহণ করে। প্রতিটি university নিজের নিয়ম ঠিক করে।')], [NZ_WAIKATO_ENTRY, NZ_MASSEY_ENTRY, NZ_AUT_ENTRY, NZ_LINCOLN_ENTRY]),
    qa('cost', b('How much does it cost to study in New Zealand?', 'New Zealand-এ পড়াশোনার খরচ কত?'), [b('Study with New Zealand gives yearly tuition of about NZD 35,000–55,000 for a bachelor\'s, NZD 20,000–45,000 for postgraduate study and NZD 6,500–7,500 for a PhD. Living costs: the visa minimum is NZD 20,000 a year; universities estimate NZD 18,000–27,000. Visa from NZD 850.', 'Study with New Zealand-এর হিসাবে বছরে tuition: bachelor\'s-এ প্রায় NZD 35,000–55,000, postgraduate-এ NZD 20,000–45,000, PhD-তে NZD 6,500–7,500। থাকার খরচ: visa-র minimum বছরে NZD 20,000; university-গুলোর হিসাব NZD 18,000–27,000। Visa NZD 850 থেকে।')], [NZ_COSTS, NZ_VISA], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for New Zealand?', 'New Zealand-এ IELTS কত লাগে?'), [b('Set by each university. Example (Waikato): IELTS 6.0 with no band below 5.5 for undergraduate, 6.5 with no band below 6.0 for postgraduate. The visa sets no score.', 'প্রতিটি university ঠিক করে। উদাহরণ (Waikato): undergraduate-এ IELTS 6.0, কোনো band 5.5-এর নিচে নয়; postgraduate-এ 6.5, কোনো band 6.0-এর নিচে নয়। Visa-র কোনো score নেই।')], [NZ_WAIKATO_ENTRY, NZ_VISA]),
    qa('visa', b('What do you need for the student visa?', 'Student visa-র জন্য কী কী লাগে?'), [b('An offer of place, tuition paid, NZD 20,000 a year for living, onward travel, health (chest X-ray for Bangladesh), character, a genuine intention to study and insurance. From NZD 850; 80% processed within 8 weeks; up to 4 years.', 'Offer of place, tuition দেওয়া, থাকার জন্য বছরে NZD 20,000, ফেরার যাতায়াত, স্বাস্থ্য (Bangladesh-এর জন্য chest X-ray), চরিত্র, পড়ার প্রকৃত ইচ্ছা আর insurance। NZD 850 থেকে; ৮০% আবেদন ৮ সপ্তাহে; সর্বোচ্চ ৪ বছর।')], [NZ_VISA, NZ_TB]),
    qa('work', b('Can you work while studying in New Zealand?', 'New Zealand-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b('Up to 25 hours a week while studying and full-time in scheduled holidays, if your visa allows. PhD students have no limit on hours (Study with New Zealand).', 'Visa অনুমতি দিলে পড়ার সময় সপ্তাহে ২৫ ঘণ্টা পর্যন্ত আর নির্ধারিত ছুটিতে full-time। PhD student-দের ঘণ্টার সীমা নেই (Study with New Zealand)।')], [NZ_VISA, NZ_PHD]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('The government\'s Manaaki New Zealand Scholarships do not include Bangladesh. International PhD students pay domestic fees, which lowers the cost. University scholarships are not verified here.', 'সরকারের Manaaki New Zealand Scholarship-এ Bangladesh নেই। International PhD student-রা দেশীয় fee দেন, তাতে খরচ কমে। University-র scholarship এখানে যাচাই হয়নি।')], [NZ_MANAAKI, NZ_PHD], { status: 'partly-verified' }),
    qa('after', b('What are the options to stay and work in New Zealand after your studies?', 'পড়া শেষে New Zealand-এ থাকা বা কাজ করার সুযোগ কী?'), [b('The Post-Study Work Visa: up to 3 years, from NZD 1,670, once only; with a level 7+ degree any job. Apply within 3 months of your student visa expiring (6 months after a doctorate). It does not promise permanent residence.', 'Post-Study Work Visa: সর্বোচ্চ ৩ বছর, NZD 1,670 থেকে, শুধু একবার; level 7+ degree থাকলে যেকোনো চাকরি। Student visa শেষের ৩ মাসের মধ্যে আবেদন (doctorate-এর পরে ৬ মাস)। এটা স্থায়ী বসবাসের নিশ্চয়তা দেয় না।')], [NZ_PSW]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('NZD 20,000 per year of study for living (NZD 1,667 a month for shorter study), tuition for one course or year, and a ticket out or money for one.', 'থাকার জন্য পড়ার প্রতি বছরে NZD 20,000 (কম সময়ের পড়ায় মাসে NZD 1,667), এক course বা এক বছরের tuition, আর ফেরার টিকিট বা তার টাকা।')], [NZ_VISA]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before admission (university): passport, HSC or degree certificates and transcripts, English test, and for a PhD research experience and supervisor support. After admission (visa): offer of place, fee receipt, proof of funds and onward travel, chest X-ray, police certificate if needed, and insurance.', 'ভর্তির আগে (university): passport, HSC বা degree-র সনদ আর transcript, English test, আর PhD-তে গবেষণার অভিজ্ঞতা ও supervisor-এর সমর্থন। ভর্তির পরে (visa): offer of place, fee-র রসিদ, টাকা আর ফেরার যাতায়াতের প্রমাণ, chest X-ray, লাগলে police certificate, আর insurance।')], [NZ_VISA, NZ_WAIKATO_ENTRY, NZ_PHD]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A recognised bachelor's with a set average (Waikato: B-/B/B+, B/B+ for a thesis master's) and IELTS 6.5 with no band below 6.0 at Waikato.", "নির্দিষ্ট গড়সহ স্বীকৃত bachelor's (Waikato: B-/B/B+, thesis master's-এ B/B+) আর Waikato-তে IELTS 6.5, কোনো band 6.0-এর নিচে নয়।")], [NZ_WAIKATO_ENTRY]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Sufficient subject knowledge, independent research experience and often a supervisor\'s support. International PhD students pay domestic fees (about NZD 6,500–7,500 a year).', 'বিষয়ে যথেষ্ট জ্ঞান, স্বাধীন গবেষণার অভিজ্ঞতা আর প্রায়ই supervisor-এর সমর্থন। International PhD student-রা দেশীয় fee দেন (বছরে প্রায় NZD 6,500–7,500)।')], [NZ_PHD, NZ_COSTS]),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — Auckland University of Technology, Lincoln University, Massey University, Te Herenga Waka—Victoria University of Wellington and the universities of Auckland, Otago and Waikato — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — Auckland University of Technology, Lincoln University, Massey University, Te Herenga Waka—Victoria University of Wellington, আর Auckland, Otago ও Waikato-র university — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [NZ_COSTS]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: universities such as Waikato, Massey, AUT and Lincoln accept the HSC with a GPA of 4.0 out of 5.0; Bangladesh is not a low-TB-incidence country, so a chest X-ray is needed for stays over 6 months; Bangladesh is not eligible for Manaaki New Zealand Scholarships. Where Bangladeshi applicants give biometrics or lodge documents, and other Bangladesh-specific requirements: not verified yet.', 'Bangladesh-এর জন্য যাচাই করা: Waikato, Massey, AUT আর Lincoln-এর মতো university ৫-এর মধ্যে GPA 4.0-সহ HSC গ্রহণ করে; Bangladesh TB-কম দেশ নয়, তাই ৬ মাসের বেশি থাকলে chest X-ray লাগে; Bangladesh Manaaki New Zealand Scholarship-এ যোগ্য নয়। Bangladesh-এর আবেদনকারীরা কোথায় biometrics দেন বা document জমা দেন, আর অন্যান্য Bangladesh-নির্দিষ্ট শর্ত: এখনো যাচাই হয়নি।'),
    ], [NZ_WAIKATO_ENTRY, NZ_MASSEY_ENTRY, NZ_TB, NZ_MANAAKI]),
  ],
  life: [
    qa('health-care', b('How does healthcare work?', 'চিকিৎসা ব্যবস্থা কেমন?'), [b('Through the medical and travel insurance that is a condition of your visa (PhD students are exempt). What a policy covers depends on the provider and is not verified here.', 'Visa-র শর্ত হিসেবে থাকা medical আর travel insurance-এর মাধ্যমে (PhD student-দের লাগে না)। Policy কী কভার করে, তা provider-এর উপর নির্ভর করে, এখানে যাচাই হয়নি।')], [NZ_VISA], { status: 'partly-verified' }),
  ],
  documents: NZ_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'estimate', status: 'partly-verified', value: { min: 20000, max: 55000, unit: 'NZD/year', text: b("About NZD 35,000–55,000 (bachelor's) and NZD 20,000–45,000 (postgraduate) a year; PhD about NZD 6,500–7,500 (domestic fees).", "বছরে প্রায় NZD 35,000–55,000 (bachelor's) আর NZD 20,000–45,000 (postgraduate); PhD প্রায় NZD 6,500–7,500 (দেশীয় fee)।") }, source: NZ_COSTS },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 20000, unit: 'NZD/year', text: b('NZD 20,000 per year of study, plus tuition for one course or year and onward travel.', 'পড়ার প্রতি বছরে NZD 20,000, সঙ্গে এক course বা বছরের tuition আর ফেরার যাতায়াত।') }, source: NZ_VISA },
    { id: 'living-cost', kind: 'estimate', status: 'partly-verified', value: { min: 18000, max: 27000, unit: 'NZD/year', text: b('Universities estimate NZD 18,000–27,000 a year depending on the city.', 'শহর অনুযায়ী university-গুলোর হিসাব বছরে NZD 18,000–27,000।') }, source: NZ_COSTS },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { max: 25, unit: 'hours/week', text: b('Up to 25 hours a week while studying; full-time in scheduled holidays.', 'পড়ার সময় সপ্তাহে ২৫ ঘণ্টা পর্যন্ত; নির্ধারিত ছুটিতে full-time।') }, source: NZ_VISA },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { max: 36, unit: 'months', text: b('Post-Study Work Visa up to 3 years, depending on what you studied.', 'কী পড়েছেন তার উপর নির্ভর করে Post-Study Work Visa সর্বোচ্চ ৩ বছর।') }, source: NZ_PSW },
    { id: 'english-programs', kind: 'fact', status: 'verified', value: { unit: 'programs', text: b('Programs are taught in English; universities set the IELTS score.', 'Program ইংরেজিতে পড়ানো হয়; IELTS score university ঠিক করে।') }, source: NZ_WAIKATO_ENTRY },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 850, unit: 'NZD', text: b('From NZD 850 (depends on your country).', 'NZD 850 থেকে (দেশ অনুযায়ী)।') }, source: NZ_VISA },
  ],
};

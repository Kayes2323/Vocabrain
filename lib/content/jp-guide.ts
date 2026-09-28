import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  JP_EMBASSY_DOCS,
  JP_EMBASSY_MEXT,
  JP_MOFA_STUDENT,
  JP_READ,
  JP_SIJ_ENGLISH,
  JP_SIJ_FEES,
  JP_SIJ_GRADUATE,
  JP_SIJ_GUIDE_2026,
  JP_SIJ_INSURANCE,
  JP_SIJ_LIVING,
  JP_SIJ_UNIVERSITIES,
  JP_SIJ_WORK,
} from './jp-sources';

/**
 * Japan reading guide, researched on its own from Japanese official sources
 * (Embassy of Japan in Bangladesh, MOFA, JASSO "Study in Japan", the
 * universities). Nothing is taken from another country's guide. Where two
 * official figures differ, both are shown and the answer says so.
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
  const high = sources.some((s) => s.url?.includes('emb-japan') || s.url?.includes('mofa.go.jp') || s.sourceType === 'official-university');
  return {
    id,
    q,
    a,
    sources,
    confidence: high ? 'high' : 'medium',
    ...(o.list ? { list: o.list } : {}),
    ...(o.status ? { status: o.status } : {}),
    ...(o.kind ? { kind: o.kind } : {}),
    ...(o.discrepancy ? { discrepancy: o.discrepancy } : {}),
    ...(o.allDegrees ? { allDegrees: true } : {}),
  };
}

const CHECK_UNI = b(
  'This can vary by university and program; always check the official admission guidelines of the university you apply to.',
  'এটা university/program অনুযায়ী পরিবর্তিত হতে পারে; যে university-তে আবেদন করবেন, তার official admission guideline অবশ্যই দেখে নিন।',
);

// ------------------------------------------------------------------ shared answers

const coe = (id: string) =>
  qa(
    id,
    b('How do you get a student visa for Japan?', 'জাপানে Student Visa কীভাবে পাওয়া যায়?'),
    [
      b(
        'Step 1 — Admission: get accepted by a Japanese university.',
        'ধাপ ১ — ভর্তি: জাপানের একটি university-তে ভর্তির সুযোগ নিন।',
      ),
      b(
        'Step 2 — Certificate of Eligibility (COE): the COE is issued by a regional immigration authority of the Immigration Services Agency of Japan and certifies that you meet the conditions for landing. A proxy in Japan (usually your school) applies for it on your behalf.',
        'ধাপ ২ — Certificate of Eligibility (COE): জাপানের Immigration Services Agency-র আঞ্চলিক অফিস COE দেয়; এটা প্রমাণ করে যে আপনি জাপানে ঢোকার শর্ত পূরণ করছেন। জাপানে থাকা একজন প্রতিনিধি (সাধারণত আপনার university) আপনার হয়ে এর আবেদন করে।',
      ),
      b(
        'Step 3 — Visa: apply at the Embassy of Japan in Bangladesh with the COE and the documents below. A COE makes the visa application and the landing examination smoother, but it does not guarantee a visa. Applying without a COE is possible, but needs many more documents and can take several months.',
        'ধাপ ৩ — Visa: COE আর নিচের document নিয়ে Bangladesh-এর Japan Embassy-তে আবেদন করবেন। COE থাকলে visa আবেদন আর বিমানবন্দরের পরীক্ষা সহজ হয়, তবে visa নিশ্চিত হয় না। COE ছাড়া আবেদন করা যায়, কিন্তু অনেক বেশি document লাগে আর কয়েক মাস লাগতে পারে।',
      ),
      b(
        'The "Student" status of residence is granted for a period set by the Minister of Justice, up to 4 years and 3 months.',
        '"Student" status of residence-এর মেয়াদ বিচার মন্ত্রী ঠিক করেন, সর্বোচ্চ ৪ বছর ৩ মাস।',
      ),
    ],
    [JP_MOFA_STUDENT, JP_EMBASSY_DOCS],
    { allDegrees: true },
  );

const visaTime = (id: string) =>
  qa(
    id,
    b('How long does the visa take? How much is the fee?', 'Visa-তে কত সময় লাগে? Fee কত?'),
    [
      b(
        'Not verified yet for applications from Bangladesh. MOFA only says that applying without a COE can take several months. Check the Embassy of Japan in Bangladesh for the current processing time and fee.',
        'Bangladesh থেকে আবেদনের ক্ষেত্রে এখনো যাচাই হয়নি। MOFA শুধু বলে, COE ছাড়া আবেদন করলে কয়েক মাস লাগতে পারে। বর্তমান সময় আর fee-র জন্য Bangladesh-এর Japan Embassy-র সঙ্গে যোগাযোগ করুন।',
      ),
    ],
    [JP_MOFA_STUDENT, JP_EMBASSY_DOCS],
    { status: 'not-verified', allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work part-time? How many hours?', 'Part-time কাজ করা যায় কি? কত ঘণ্টা?'),
    [
      b(
        'Yes, with permission: apply for "permission to engage in activities other than that permitted under the status of residence" at a Regional Immigration Services Bureau. Students with a "Student" status of more than three months can get it at the airport when they first land in Japan.',
        'হ্যাঁ, অনুমতি নিয়ে: Regional Immigration Services Bureau-তে "permission to engage in activities other than that permitted under the status of residence"-এর আবেদন করতে হয়। তিন মাসের বেশি মেয়াদের "Student" status থাকলে প্রথমবার জাপানে নামার সময় বিমানবন্দরেই এটা নেওয়া যায়।',
      ),
      b(
        'Limit: within 28 hours a week, and up to 8 hours a day during the long school holidays. The work must not affect your studies, must not be in adult entertainment businesses (prohibited by law), and you must keep your student status. Breaking these rules can lead to punishment and even deportation.',
        'সীমা: সপ্তাহে ২৮ ঘণ্টার মধ্যে, আর লম্বা ছুটিতে দিনে সর্বোচ্চ ৮ ঘণ্টা। কাজ যেন পড়াশোনার ক্ষতি না করে, adult entertainment ব্যবসায় হবে না (আইনে নিষিদ্ধ), আর student status থাকতে হবে। নিয়ম ভাঙলে শাস্তি, এমনকি দেশে ফেরত পাঠানো হতে পারে।',
      ),
      b(
        'JASSO’s survey: about 65% of privately financed international students work, earning about JPY 81,000 a month on average, which is not enough to cover all study costs. JASSO warns that claims of "JPY 3,000 an hour" or "JPY 200,000–300,000 a month" are false; the average hourly wage is about JPY 1,300.',
        'JASSO-র জরিপ: নিজের খরচে পড়া international student-দের প্রায় ৬৫% কাজ করেন, গড়ে মাসে প্রায় ¥81,000 আয় করেন, যা পড়ার সব খরচের জন্য যথেষ্ট নয়। JASSO সতর্ক করে, "ঘণ্টায় ¥3,000" বা "মাসে ¥200,000–300,000" আয়ের দাবি মিথ্যা; গড় ঘণ্টাপ্রতি মজুরি প্রায় ¥1,300।',
      ),
    ],
    [JP_SIJ_WORK, JP_SIJ_GUIDE_2026],
    { allDegrees: true },
  );

const living = (id: string) =>
  qa(
    id,
    b('How much is the living cost?', 'থাকা-খাওয়ার খরচ কত?'),
    [
      b(
        'JASSO’s 2023 survey of privately financed international students puts the average monthly living cost at about JPY 105,000 (excluding study costs). Housing averages JPY 41,000 a month nationally and JPY 57,000 in Tokyo; commuting costs are also higher in big cities.',
        'নিজের খরচে পড়া international student-দের নিয়ে JASSO-র ২০২৩ সালের জরিপ অনুযায়ী মাসে গড় থাকা-খাওয়ার খরচ প্রায় ¥105,000 (পড়ার খরচ বাদে)। বাসাভাড়া দেশে গড়ে মাসে ¥41,000, Tokyo-তে ¥57,000; বড় শহরে যাতায়াত খরচও বেশি।',
      ),
      b(
        'Health: National Health Insurance covers 70% of medical costs, so you pay 30% of the bill.',
        'স্বাস্থ্য: National Health Insurance চিকিৎসা খরচের ৭০% দেয়, তাই bill-এর ৩০% আপনাকে দিতে হয়।',
      ),
      b(
        'A breakdown for food and transport and the initial set-up costs on arrival are not verified here.',
        'খাবার ও যাতায়াতের আলাদা হিসাব আর পৌঁছানোর পর শুরুর খরচ এখানে যাচাই করা হয়নি।',
      ),
    ],
    [JP_SIJ_LIVING, JP_SIJ_INSURANCE],
    { kind: 'estimate', allDegrees: true },
  );

const financialProof = (id: string) =>
  qa(
    id,
    b('What financial proof is needed?', 'কী ধরনের আর্থিক প্রমাণ লাগে?'),
    [
      b(
        'The Embassy of Japan in Bangladesh lists a document certifying your financial capabilities and, if paid, the receipts for tuition payment and remittance. No fixed amount is published in the sources we read; your university or its COE application will tell you what it needs.',
        'Bangladesh-এর Japan Embassy আর্থিক সামর্থ্যের document আর tuition দিয়ে থাকলে তার রসিদ চায়। আমরা যে source পড়েছি, তাতে নির্দিষ্ট কোনো অঙ্ক নেই; আপনার university বা তার COE আবেদনে কী লাগবে তা জানাবে।',
      ),
    ],
    [JP_EMBASSY_DOCS],
    { status: 'partly-verified', allDegrees: true },
  );

// ------------------------------------------------------------------ documents

export const JP_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport (and old passports)', 'Passport (আর পুরনো passport)'),
    why: b('Your identity and travel document; the visa is placed in it.', 'আপনার পরিচয় ও ভ্রমণের document; visa এতেই লাগানো হয়।'),
    who: b('Embassy of Japan in Bangladesh.', 'Bangladesh-এর Japan Embassy।'),
    when: b('At the visa application.', 'Visa আবেদনের সময়।'),
    where: b('Embassy of Japan in Bangladesh.', 'Bangladesh-এর Japan Embassy-তে।'),
    prepare: b('A valid passport and any old passports.', 'বৈধ passport আর পুরনো passport থাকলে সেগুলো।'),
    groups: ['general', 'visa'],
    sources: [JP_EMBASSY_DOCS],
  },
  {
    id: 'coe',
    name: b('Certificate of Eligibility (COE)', 'Certificate of Eligibility (COE)'),
    why: b('Certifies you meet the conditions for landing in Japan as a student.', 'প্রমাণ করে যে student হিসেবে জাপানে ঢোকার শর্ত আপনি পূরণ করছেন।'),
    who: b('Issued by the Immigration Services Agency of Japan; required by the Embassy.', 'Immigration Services Agency of Japan দেয়; Embassy চায়।'),
    when: b('After admission, before the visa application.', 'ভর্তির পরে, visa আবেদনের আগে।'),
    where: b('Applied for in Japan by a proxy (usually your school); submitted to the Embassy.', 'জাপানে প্রতিনিধি (সাধারণত university) আবেদন করে; Embassy-তে জমা দেবেন।'),
    prepare: b('Send your school what it asks for the COE application. MEXT scholarship awardees do not need a COE for the visa.', 'COE আবেদনের জন্য university যা চায় তা পাঠান। MEXT scholarship পাওয়া student-দের visa-র জন্য COE লাগে না।'),
    groups: ['visa'],
    sources: [JP_MOFA_STUDENT, JP_EMBASSY_DOCS],
  },
  {
    id: 'acceptance',
    name: b('Acceptance letter', 'Acceptance letter'),
    why: b('Shows a Japanese institution has accepted you.', 'দেখায় যে জাপানের একটি প্রতিষ্ঠান আপনাকে নিয়েছে।'),
    who: b('Embassy of Japan in Bangladesh.', 'Bangladesh-এর Japan Embassy।'),
    when: b('At the visa application.', 'Visa আবেদনের সময়।'),
    where: b('Embassy of Japan in Bangladesh.', 'Bangladesh-এর Japan Embassy-তে।'),
    prepare: b('The acceptance letter issued by the Japanese institute.', 'জাপানের প্রতিষ্ঠানের দেওয়া acceptance letter।'),
    groups: ['visa'],
    sources: [JP_EMBASSY_DOCS],
  },
  {
    id: 'academic',
    name: b('Academic certificates and transcripts', 'শিক্ষাগত সনদ ও transcript'),
    why: b('Proof of your previous education (12 years for a bachelor’s, 16 for a master’s).', 'আগের পড়াশোনার প্রমাণ (bachelor’s-এর জন্য ১২ বছর, master’s-এর জন্য ১৬ বছর)।'),
    who: b('The university; the Embassy of Japan in Bangladesh.', 'University; Bangladesh-এর Japan Embassy।'),
    when: b('With the university application, and again for the visa.', 'University-র আবেদনের সঙ্গে, আবার visa-র জন্যও।'),
    where: b('University; Embassy of Japan in Bangladesh.', 'University-তে; Bangladesh-এর Japan Embassy-তে।'),
    prepare: b('Original academic certificates and registration cards (1 original + 1 photocopy for the Embassy); graduate applicants also a transcript from the last school and the graduation diploma.', 'মূল শিক্ষাগত সনদ ও registration card (Embassy-র জন্য ১টি মূল + ১টি ফটোকপি); graduate-এর জন্য শেষ প্রতিষ্ঠানের transcript আর graduation সনদও।'),
    groups: ['general', 'visa', 'bangladesh'],
    sources: [JP_EMBASSY_DOCS, JP_SIJ_GRADUATE],
  },
  {
    id: 'language',
    name: b('Language test (Japanese / English)', 'ভাষার পরীক্ষা (Japanese / English)'),
    why: b('Shows you can study in the program’s language.', 'দেখায় যে program-এর ভাষায় আপনি পড়তে পারবেন।'),
    who: b('The university.', 'University।'),
    when: b('With the university application.', 'University-র আবেদনের সঙ্গে।'),
    where: b('University.', 'University-তে।'),
    prepare: b('For Japanese-taught undergraduate programs, usually the EJU scores the university asks for; for English-taught programs, an English test (graduate guideline: TOEFL iBT 75–80 or IELTS 6).', 'Japanese-এ পড়ানো undergraduate program-এ সাধারণত university যা চায় সেই EJU score; English program-এ English test (graduate-এর নির্দেশক: TOEFL iBT 75–80 বা IELTS 6)।'),
    groups: ['program'],
    sources: [JP_SIJ_GUIDE_2026, JP_SIJ_GRADUATE],
  },
  {
    id: 'recommendation',
    name: b('Letter of recommendation', 'Letter of recommendation'),
    why: b('Tells the graduate school about your academic ability.', 'Graduate school-কে আপনার academic যোগ্যতা জানায়।'),
    who: b('Graduate schools (most ask for it).', 'Graduate school (বেশিরভাগ চায়)।'),
    when: b('With the graduate application; also useful when you contact a professor.', 'Graduate আবেদনের সঙ্গে; professor-কে যোগাযোগের সময়ও কাজে লাগে।'),
    where: b('Graduate school.', 'Graduate school-এ।'),
    prepare: b('From your advisor at your current or last university.', 'বর্তমান বা শেষ university-র advisor-এর কাছ থেকে।'),
    groups: ['program'],
    degrees: ['masters', 'phd'],
    sources: [JP_SIJ_GRADUATE],
  },
  {
    id: 'research-proposal',
    name: b('Research proposal', 'Research proposal'),
    why: b('Most graduate schools require it: it shows your topic and how you will research it.', 'বেশিরভাগ graduate school চায়: এতে আপনার বিষয় আর গবেষণার পদ্ধতি দেখা যায়।'),
    who: b('Graduate schools.', 'Graduate school।'),
    when: b('With the graduate application (and when you contact a potential advisor).', 'Graduate আবেদনের সঙ্গে (আর সম্ভাব্য advisor-কে যোগাযোগের সময়)।'),
    where: b('Graduate school.', 'Graduate school-এ।'),
    prepare: b('Usually around 2,000 words: purpose, background, significance, methods and references. The format and length differ by school.', 'সাধারণত প্রায় ২,০০০ শব্দ: উদ্দেশ্য, পটভূমি, গুরুত্ব, পদ্ধতি আর তথ্যসূত্র। Format আর দৈর্ঘ্য school অনুযায়ী আলাদা।'),
    groups: ['program'],
    degrees: ['masters', 'phd'],
    sources: [JP_SIJ_GRADUATE],
  },
  {
    id: 'thesis',
    name: b('Graduation thesis and abstract', 'Graduation thesis ও abstract'),
    why: b('Shows your previous research.', 'আপনার আগের গবেষণা দেখায়।'),
    who: b('Graduate schools.', 'Graduate school।'),
    when: b('With the graduate application.', 'Graduate আবেদনের সঙ্গে।'),
    where: b('Graduate school.', 'Graduate school-এ।'),
    prepare: b('Your university research or graduation thesis with an abstract, if the school asks for it.', 'School চাইলে university-র research বা graduation thesis আর তার abstract।'),
    groups: ['program'],
    degrees: ['masters', 'phd'],
    sources: [JP_SIJ_GRADUATE],
  },
  {
    id: 'finance',
    name: b('Financial documents', 'আর্থিক document'),
    why: b('Shows you can pay for your studies and living.', 'দেখায় যে পড়া আর থাকার খরচ আপনি চালাতে পারবেন।'),
    who: b('Embassy of Japan in Bangladesh (and the COE application).', 'Bangladesh-এর Japan Embassy (আর COE আবেদন)।'),
    when: b('For the COE and the visa.', 'COE আর visa-র জন্য।'),
    where: b('Your school (COE); Embassy of Japan in Bangladesh.', 'আপনার university (COE); Bangladesh-এর Japan Embassy।'),
    prepare: b('A document certifying financial capabilities, and tuition payment / remittance receipts if you have paid. No fixed amount is published in the sources we read.', 'আর্থিক সামর্থ্যের document, আর tuition দিয়ে থাকলে তার / টাকা পাঠানোর রসিদ। আমরা যে source পড়েছি, তাতে নির্দিষ্ট অঙ্ক নেই।'),
    groups: ['visa'],
    status: 'partly-verified',
    sources: [JP_EMBASSY_DOCS],
  },
  {
    id: 'form-photo-resume',
    name: b('Visa application form, photos and resume', 'Visa application form, ছবি ও resume'),
    why: b('The formal visa application.', 'Visa-র আনুষ্ঠানিক আবেদন।'),
    who: b('Embassy of Japan in Bangladesh.', 'Bangladesh-এর Japan Embassy।'),
    when: b('At the visa application.', 'Visa আবেদনের সময়।'),
    where: b('Embassy of Japan in Bangladesh.', 'Bangladesh-এর Japan Embassy-তে।'),
    prepare: b('The application form, two photos (see the Embassy’s photo requirement) and a resume (MEXT awardees do not need the resume). Every document except the passport and photos: 1 original + 1 photocopy.', 'Application form, দুটি ছবি (Embassy-র ছবির নিয়ম দেখুন) আর resume (MEXT পাওয়া student-দের resume লাগে না)। Passport আর ছবি ছাড়া প্রতিটি document: ১টি মূল + ১টি ফটোকপি।'),
    groups: ['visa', 'bangladesh'],
    sources: [JP_EMBASSY_DOCS],
  },
  {
    id: 'work-permission',
    name: b('Permission for part-time work', 'Part-time কাজের অনুমতি'),
    why: b('You may only work with this permission.', 'এই অনুমতি ছাড়া কাজ করা যায় না।'),
    who: b('Immigration Services Bureau.', 'Immigration Services Bureau।'),
    when: b('On first landing at the airport (Student status over three months), or later.', 'প্রথমবার বিমানবন্দরে নামার সময় (তিন মাসের বেশি Student status), বা পরে।'),
    where: b('At the airport, or at a Regional Immigration Services Bureau.', 'বিমানবন্দরে, বা Regional Immigration Services Bureau-তে।'),
    prepare: b('Apply for "permission to engage in activities other than that permitted under the status of residence".', '"permission to engage in activities other than that permitted under the status of residence"-এর আবেদন করুন।'),
    groups: ['arrival'],
    sources: [JP_SIJ_WORK],
  },
];

// ------------------------------------------------------------------ costs

const TUITION_OFFICIAL: GuideCost = {
  id: 'national-tuition',
  label: b('Tuition at national universities (standard)', 'National university-র tuition (standard)'),
  value: b('JPY 535,800 per year', 'বছরে ¥535,800'),
  amount: { value: 535800, currency: 'JPY', period: 'year' },
  appliesTo: b('National universities; undergraduate, master’s and doctoral programs', 'National university; undergraduate, master’s আর doctoral'),
  source: JP_SIJ_GUIDE_2026,
};
const LIVING_EST: GuideCost[] = [
  { id: 'living', label: b('Living cost (average)', 'থাকা-খাওয়ার খরচ (গড়)'), value: b('About JPY 105,000 per month', 'মাসে প্রায় ¥105,000'), amount: { value: 105000, currency: 'JPY', period: 'month' }, note: b('JASSO 2023 survey; excludes study costs.', 'JASSO ২০২৩ জরিপ; পড়ার খরচ বাদে।'), source: JP_SIJ_LIVING },
  { id: 'housing', label: b('Housing', 'বাসাভাড়া'), value: b('JPY 41,000 per month (national average); JPY 57,000 in Tokyo', 'মাসে ¥41,000 (দেশের গড়); Tokyo-তে ¥57,000'), amount: { value: 41000, max: 57000, currency: 'JPY', period: 'month' }, source: JP_SIJ_LIVING },
];
const FIRST_YEAR_UG: GuideCost[] = [
  { id: 'first-year-national', label: b('First year incl. admission fee — national', 'প্রথম বছর (ভর্তি fee-সহ) — national'), value: b('About JPY 820,000', 'প্রায় ¥820,000'), amount: { value: 820000, currency: 'JPY', period: 'one-time' }, source: JP_SIJ_FEES },
  {
    id: 'first-year-public',
    label: b('First year incl. admission fee — local public', 'প্রথম বছর (ভর্তি fee-সহ) — local public'),
    value: b('About JPY 910,000–930,000', 'প্রায় ¥910,000–930,000'),
    amount: { value: 910000, max: 930000, currency: 'JPY', period: 'one-time' },
    note: b('JASSO’s fee page says about 910,000; its universities page says about 930,000.', 'JASSO-র fee page বলে প্রায় ৯,১০,০০০; universities page বলে প্রায় ৯,৩০,০০০।'),
    source: JP_SIJ_FEES,
  },
  {
    id: 'first-year-private',
    label: b('First year incl. admission fee — private (excl. medicine, dentistry, pharmacy)', 'প্রথম বছর (ভর্তি fee-সহ) — private (medicine, dentistry, pharmacy বাদে)'),
    value: b('About JPY 1,100,000–1,300,000', 'প্রায় ¥1,100,000–1,300,000'),
    amount: { value: 1100000, max: 1300000, currency: 'JPY', period: 'one-time' },
    note: b('JASSO’s universities page says about 1,100,000; its fee page says about 1,300,000.', 'JASSO-র universities page বলে প্রায় ১১,০০,০০০; fee page বলে প্রায় ১৩,০০,০০০।'),
    source: JP_SIJ_UNIVERSITIES,
  },
];
const FIRST_YEAR_GRAD: GuideCost[] = [
  { id: 'first-year-grad-national', label: b('First year incl. admission fee — national graduate school', 'প্রথম বছর (ভর্তি fee-সহ) — national graduate school'), value: b('About JPY 820,000', 'প্রায় ¥820,000'), amount: { value: 820000, currency: 'JPY', period: 'one-time' }, source: JP_SIJ_GRADUATE },
  { id: 'first-year-grad-public', label: b('First year incl. admission fee — public graduate school', 'প্রথম বছর (ভর্তি fee-সহ) — public graduate school'), value: b('About JPY 900,000', 'প্রায় ¥900,000'), amount: { value: 900000, currency: 'JPY', period: 'one-time' }, source: JP_SIJ_GRADUATE },
  { id: 'first-year-grad-private', label: b('First year incl. admission fee — private graduate school (excl. medicine, dentistry, pharmacy)', 'প্রথম বছর (ভর্তি fee-সহ) — private graduate school (medicine, dentistry, pharmacy বাদে)'), value: b('About JPY 1,100,000', 'প্রায় ¥1,100,000'), amount: { value: 1100000, currency: 'JPY', period: 'one-time' }, source: JP_SIJ_GRADUATE },
];

// ------------------------------------------------------------------ degree guides

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('4 years · after 12 years of school (HSC)', '৪ বছর · ১২ বছরের পড়াশোনা (HSC) শেষে'),
  intro: b(
    'Japanese universities admit international students who have completed 12 years of formal education, so the HSC meets the basic requirement. Most undergraduate programs teach in Japanese, and many universities use the EJU exam in selection; some programs teach entirely in English.',
    'জাপানের university ১২ বছরের formal education শেষ করা international student নেয়, তাই HSC দিয়ে মূল শর্ত পূরণ হয়। বেশিরভাগ undergraduate program Japanese-এ পড়ায়, আর অনেক university বাছাইয়ে EJU পরীক্ষা ব্যবহার করে; কিছু program পুরোপুরি English-এ।',
  ),
  costs: { official: [TUITION_OFFICIAL], estimates: [...FIRST_YEAR_UG, ...LIVING_EST] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'who',
          b("What do you need to study for a Bachelor's in Japan?", "জাপানে Bachelor's পড়তে কী কী লাগে?"),
          [
            b(
              'The basic requirement is 12 years of formal school education (in Bangladesh, SSC + HSC). Those with fewer than 12 years must first complete a designated university preparatory course of one to two years. Other routes include foreign qualifications such as the International Baccalaureate or GCE A-Level.',
              'মূল শর্ত হলো ১২ বছরের formal পড়াশোনা (Bangladesh-এ SSC + HSC)। ১২ বছরের কম হলে আগে এক থেকে দুই বছরের নির্ধারিত university preparatory course শেষ করতে হয়। International Baccalaureate বা GCE A-Level-এর মতো বিদেশি যোগ্যতা দিয়েও আবেদন করা যায়।',
            ),
            b('Then you need the university’s own selection (see below), language proof, and after admission a COE and a student visa.', 'তারপর লাগবে university-র নিজের বাছাই (নিচে দেখুন), ভাষার প্রমাণ, আর ভর্তির পরে COE ও student visa।'),
          ],
          [JP_SIJ_UNIVERSITIES, JP_SIJ_GUIDE_2026],
        ),
        qa(
          'grades',
          b('What grades are needed?', 'কত grade লাগে?'),
          [
            b(
              'Not verified yet: no national minimum grade is given in the official sources we read; each university sets its own criteria. (For the MEXT scholarship the Embassy sets its own GPA requirement; see Scholarships.)',
              'এখনো যাচাই হয়নি: আমরা যে official source পড়েছি, তাতে জাতীয় কোনো minimum grade নেই; প্রতিটি university নিজের শর্ত ঠিক করে। (MEXT scholarship-এর জন্য Embassy আলাদা GPA শর্ত দেয়; Scholarship অংশ দেখুন।)',
            ),
            CHECK_UNI,
          ],
          [JP_SIJ_UNIVERSITIES],
          { status: 'not-verified' },
        ),
        qa(
          'selection',
          b('Is there an entrance exam? What is the EJU?', 'ভর্তি পরীক্ষা আছে কি? EJU কী?'),
          [
            b(
              'Selection is set by each university. Many use the EJU (Examination for Japanese University Admission for International Students): it tests Japanese and basic academic skills (science, "Japan and the World", mathematics). About 500 universities — more than 60% of Japanese universities and almost all national universities — use EJU scores. It is held twice a year (June and November), and scores are valid for two years.',
              'বাছাই প্রতিটি university নিজে ঠিক করে। অনেকে EJU (Examination for Japanese University Admission for International Students) ব্যবহার করে: এতে Japanese আর মূল academic দক্ষতা (বিজ্ঞান, "Japan and the World", গণিত) যাচাই হয়। প্রায় ৫০০টি university — জাপানের ৬০%-এর বেশি আর প্রায় সব national university — EJU score নেয়। বছরে দুবার হয় (June আর November), score দুই বছর বৈধ।',
            ),
            b(
              'Bangladesh is not in the 2026 list of overseas EJU venues (the list includes India and Sri Lanka among others). Some universities accept only EJU results from a particular session.',
              '২০২৬-এর বিদেশি EJU কেন্দ্রের তালিকায় Bangladesh নেই (তালিকায় India, Sri Lanka ইত্যাদি আছে)। কিছু university শুধু নির্দিষ্ট session-এর EJU ফল নেয়।',
            ),
          ],
          [JP_SIJ_GUIDE_2026],
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language', 'ভাষা'),
      items: [
        qa(
          'japanese',
          b('Do you need Japanese?', 'Japanese ভাষা লাগবে কি?'),
          [
            b(
              'For Japanese-taught programs, yes. Undergraduate programs are normally taught in Japanese, and the EJU’s "Japanese as a Foreign Language" section tests academic Japanese. The level each program requires is set by the university.',
              'Japanese-এ পড়ানো program-এ হ্যাঁ। Undergraduate program সাধারণত Japanese-এ পড়ানো হয়, আর EJU-র "Japanese as a Foreign Language" অংশে academic Japanese যাচাই হয়। কোন program কোন level চায়, তা university ঠিক করে।',
            ),
            CHECK_UNI,
          ],
          [JP_SIJ_GUIDE_2026, JP_SIJ_GRADUATE],
        ),
        qa(
          'english',
          b('Can you study in English? Do you need IELTS/TOEFL?', 'English-এ পড়া যায় কি? IELTS/TOEFL লাগবে?'),
          [
            b(
              'Yes, at some universities: there are degree programs you can complete taking classes only in English. For those, an English test is usually required; the score is set by each university. JASSO’s published guideline (TOEFL iBT 75–80 / IELTS 6) is for graduate schools; an undergraduate guideline is not verified here.',
              'হ্যাঁ, কিছু university-তে: শুধু English-এ class করে degree শেষ করা যায় এমন program আছে। সেগুলোর জন্য সাধারণত English test লাগে; score প্রতিটি university ঠিক করে। JASSO-র নির্দেশক score (TOEFL iBT 75–80 / IELTS 6) graduate school-এর জন্য; undergraduate-এর নির্দেশক এখানে যাচাই হয়নি।',
            ),
          ],
          [JP_SIJ_ENGLISH, JP_SIJ_GRADUATE],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'costs',
      title: b('Costs', 'খরচ'),
      items: [
        qa(
          'tuition',
          b('How much does it cost to study in Japan?', 'জাপানে পড়াশোনার খরচ কত?'),
          [
            b(
              'Annual tuition: national universities JPY 535,800 (standard); local public JPY 536,340 on average; private undergraduate JPY 1,140,619 on average. Including the admission fee, the first year costs about JPY 820,000 at a national university.',
              'বার্ষিক tuition: national university ¥535,800 (standard); local public গড়ে ¥536,340; private undergraduate গড়ে ¥1,140,619। ভর্তি fee মিলিয়ে national university-তে প্রথম বছরে প্রায় ¥820,000।',
            ),
            b('Medical, dental and pharmaceutical programs at private universities cost much more (about JPY 3,800,000 in the first year). Application / exam fees differ by university and are not verified here.', 'Private university-র medicine, dentistry আর pharmacy program-এ খরচ অনেক বেশি (প্রথম বছরে প্রায় ¥3,800,000)। আবেদন / পরীক্ষার fee university অনুযায়ী আলাদা, এখানে যাচাই হয়নি।'),
          ],
          [JP_SIJ_GUIDE_2026, JP_SIJ_FEES, JP_SIJ_UNIVERSITIES],
          {
            discrepancy: b(
              'JASSO gives two first-year figures for private universities: about JPY 1,100,000 (universities page) and about JPY 1,300,000 (academic fees page); for local public ones about 930,000 and 910,000. The real fee is in each university’s guidelines.',
              'Private university-র প্রথম বছরের খরচ নিয়ে JASSO দুটো অঙ্ক দেয়: প্রায় ¥1,100,000 (universities page) আর প্রায় ¥1,300,000 (academic fees page); local public-এ প্রায় ৯,৩০,০০০ আর ৯,১০,০০০। আসল fee প্রতিটি university-র guideline-এ।',
            ),
          },
        ),
        living('living'),
        { embed: 'costs' },
        financialProof('funds'),
      ],
    },
    { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' }] },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b('How does the application process work?', 'আবেদনের প্রক্রিয়া কেমন?'),
          [b('Choose a university and program, read its admission guidelines, take the exams it asks for (for example the EJU), apply, and after admission your university applies for your COE. Then you apply for the visa.', 'University ও program বেছে তার admission guideline পড়ুন, যে পরীক্ষা চায় তা দিন (যেমন EJU), আবেদন করুন; ভর্তির পরে university আপনার COE-র আবেদন করে। তারপর visa-র আবেদন।')],
          [JP_SIJ_GUIDE_2026, JP_MOFA_STUDENT],
        ),
        qa(
          'when',
          b('When does the academic year start?', 'শিক্ষাবর্ষ কখন শুরু হয়?'),
          [b('Most Japanese schools start in April; many universities now also admit students in the fall (September or October). Application periods are set by each university.', 'জাপানের বেশিরভাগ প্রতিষ্ঠানে April-এ শুরু; এখন অনেক university fall-এও (September বা October) ভর্তি নেয়। আবেদনের সময় প্রতিটি university ঠিক করে।')],
          [JP_SIJ_GRADUATE],
        ),
      ],
    },
    {
      id: 'scholarships',
      title: b('Scholarships', 'Scholarship'),
      items: [{ embed: 'scholarships' }],
    },
    {
      id: 'universities',
      title: b('Universities', 'University'),
      items: [
        qa(
          'types',
          b('What kinds of universities are there?', 'কী ধরনের university আছে?'),
          [b('National, local public and private universities. The examples below are listed alphabetically, not ordered by quality; check each university’s own page for its programs and requirements.', 'National, local public আর private university। নিচের উদাহরণগুলো বর্ণানুক্রমে সাজানো, মান অনুযায়ী নয়; program আর শর্তের জন্য প্রতিটি university-র নিজের page দেখুন।')],
          [JP_SIJ_FEES],
        ),
        { embed: 'universities' },
      ],
    },
    { id: 'work', title: b('Part-time work', 'Part-time কাজ'), items: [work('work')] },
    { id: 'visa', title: b('Visa', 'Visa'), items: [coe('visa'), visaTime('visa-time')] },
  ],
};

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b("2 years · after a 4-year bachelor's (16 years)", "২ বছর · ৪ বছরের bachelor's (১৬ বছর) শেষে"),
  intro: b(
    "A master's in Japan generally lasts 2 years. You need a 4-year bachelor's or 16 years of education (other routes exist). Most graduate schools ask for a research proposal, and you often have to find a thesis advisor yourself. More and more graduate programs are taught entirely in English.",
    "জাপানে master's সাধারণত ২ বছরের। ৪ বছরের bachelor's বা ১৬ বছরের পড়াশোনা লাগে (অন্য পথও আছে)। বেশিরভাগ graduate school research proposal চায়, আর অনেক সময় thesis advisor নিজেকেই খুঁজতে হয়। English-এ পুরোপুরি পড়ানো graduate program বাড়ছে।",
  ),
  costs: { official: [TUITION_OFFICIAL], estimates: [...FIRST_YEAR_GRAD, ...LIVING_EST] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in Japan?", "জাপানে Master's করতে কী লাগে?"),
          [
            b(
              "One of: graduation from a four-year university; 16 years of formal education; or at least 3 years of study at a foreign university with a bachelor's degree (other routes include individual admission assessment for those aged 22 or above).",
              "এর যেকোনো একটি: চার বছরের university থেকে graduation; ১৬ বছরের formal পড়াশোনা; অথবা বিদেশি university-তে অন্তত ৩ বছর পড়ে bachelor's degree (২২ বা তার বেশি বয়সে university-র নিজস্ব যোগ্যতা যাচাইয়ের পথও আছে)।",
            ),
            CHECK_UNI,
          ],
          [JP_SIJ_GRADUATE],
        ),
        qa(
          'related',
          b('Must your subject be related? What GPA?', 'বিষয় কি সংশ্লিষ্ট হতে হবে? কত GPA?'),
          [
            b(
              'Not verified yet: the official sources we read set no national rule on related subjects or a minimum GPA; each graduate school decides.',
              'এখনো যাচাই হয়নি: আমরা যে official source পড়েছি, তাতে সংশ্লিষ্ট বিষয় বা minimum GPA নিয়ে জাতীয় নিয়ম নেই; প্রতিটি graduate school নিজে ঠিক করে।',
            ),
            CHECK_UNI,
          ],
          [JP_SIJ_GRADUATE],
          { status: 'not-verified' },
        ),
        qa(
          'advisor',
          b('Do you need a research proposal and an advisor?', 'Research proposal আর advisor লাগবে কি?'),
          [
            b(
              'Most graduate schools require a research proposal (usually around 2,000 words: purpose, background, significance, methods, references). In most cases you must find your own thesis advisor, and some schools require the advisor’s approval before you apply.',
              'বেশিরভাগ graduate school research proposal চায় (সাধারণত প্রায় ২,০০০ শব্দ: উদ্দেশ্য, পটভূমি, গুরুত্ব, পদ্ধতি, তথ্যসূত্র)। বেশিরভাগ ক্ষেত্রে thesis advisor নিজেকেই খুঁজতে হয়, আর কিছু school আবেদনের আগে advisor-এর সম্মতি চায়।',
            ),
            b(
              'When you contact a professor, explain your past research, your research plan and why you chose them; JASSO advises also sending a recommendation letter from your current or last advisor.',
              'Professor-কে লেখার সময় আগের গবেষণা, গবেষণার পরিকল্পনা আর কেন তাঁকে বেছেছেন তা জানান; JASSO বর্তমান বা শেষ advisor-এর recommendation letter-ও পাঠাতে বলে।',
            ),
          ],
          [JP_SIJ_GRADUATE],
        ),
        qa(
          'selection',
          b('How are students selected?', 'কীভাবে বাছাই হয়?'),
          [
            b(
              'Often by a combination of document screening, an academic test, an interview, an essay and an oral examination; each school decides. Some graduate schools let you apply directly, others prefer that you first study as a "research student" (a non-degree status).',
              'সাধারণত document যাচাই, academic পরীক্ষা, interview, essay আর মৌখিক পরীক্ষার মিলিত পদ্ধতিতে; প্রতিটি school নিজে ঠিক করে। কিছু graduate school সরাসরি আবেদন নেয়, কেউ চায় আগে "research student" (degree ছাড়া) হিসেবে পড়ুন।',
            ),
          ],
          [JP_SIJ_GRADUATE],
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language', 'ভাষা'),
      items: [
        qa(
          'english',
          b('Can you study in English? Which IELTS/TOEFL score?', 'English-এ পড়া যায় কি? IELTS/TOEFL কত?'),
          [
            b(
              'Yes: especially at graduate level, many schools offer degree programs taught entirely in English. JASSO’s guideline for graduate schools is TOEFL iBT 75–80 or IELTS 6; the actual score is set by each program.',
              'হ্যাঁ: বিশেষ করে graduate level-এ অনেক school পুরোপুরি English-এ degree program দেয়। Graduate school-এর জন্য JASSO-র নির্দেশক score TOEFL iBT 75–80 বা IELTS 6; আসল score প্রতিটি program ঠিক করে।',
            ),
            b('Most graduate programs are still taught in Japanese; for those, the school sets the Japanese requirement.', 'বেশিরভাগ graduate program এখনো Japanese-এ; সেগুলোর Japanese-এর শর্ত school ঠিক করে।'),
          ],
          [JP_SIJ_GRADUATE, JP_SIJ_ENGLISH],
          { kind: 'guidance' },
        ),
      ],
    },
    {
      id: 'costs',
      title: b('Costs', 'খরচ'),
      items: [
        qa(
          'tuition',
          b('How much does a Master’s cost?', 'Master’s-এ খরচ কত?'),
          [
            b(
              'Annual tuition: national JPY 535,800 (standard); local public JPY 530,802 on average; private JPY 881,727 on average. Including the admission fee, the first year costs about JPY 820,000 (national), 900,000 (public) or 1,100,000 (private).',
              'বার্ষিক tuition: national ¥535,800 (standard); local public গড়ে ¥530,802; private গড়ে ¥881,727। ভর্তি fee মিলিয়ে প্রথম বছরে প্রায় ¥820,000 (national), ¥900,000 (public) বা ¥1,100,000 (private)।',
            ),
          ],
          [JP_SIJ_GUIDE_2026, JP_SIJ_GRADUATE],
        ),
        living('living'),
        { embed: 'costs' },
        financialProof('funds'),
      ],
    },
    { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' }] },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'when',
          b('When do programs start?', 'Program কখন শুরু হয়?'),
          [b('Most schools start in April; many universities also offer fall admission (September or October). Deadlines are set by each graduate school.', 'বেশিরভাগ প্রতিষ্ঠান April-এ শুরু; অনেক university fall-এও (September বা October) ভর্তি নেয়। Deadline প্রতিটি graduate school ঠিক করে।')],
          [JP_SIJ_GRADUATE],
        ),
      ],
    },
    { id: 'scholarships', title: b('Scholarships', 'Scholarship'), items: [{ embed: 'scholarships' }] },
    { id: 'universities', title: b('Universities', 'University'), items: [{ embed: 'universities' }] },
    { id: 'work', title: b('Part-time work', 'Part-time কাজ'), items: [work('work')] },
    { id: 'visa', title: b('Visa', 'Visa'), items: [coe('visa'), visaTime('visa-time')] },
  ],
};

const PHD: DegreeGuide = {
  level: 'phd',
  card: b("about 3 years after a master's", "master's-এর পরে প্রায় ৩ বছর"),
  intro: b(
    "Japanese doctoral programs take about 5 years including the 2-year master's; after a master's, you join the second half (about 3 years). You need a master's or an equivalent degree, a research proposal and usually an advisor.",
    "জাপানে doctoral program ২ বছরের master's-সহ প্রায় ৫ বছরের; master's থাকলে পরের অংশে (প্রায় ৩ বছর) যোগ দেন। Master's বা সমমানের degree, research proposal আর সাধারণত একজন advisor লাগে।",
  ),
  costs: { official: [TUITION_OFFICIAL], estimates: [...FIRST_YEAR_GRAD, ...LIVING_EST] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'master',
          b('What do you need for a PhD in Japan?', 'জাপানে PhD করতে কী লাগে?'),
          [
            b(
              "For the second half of a doctoral program: a master's or professional degree (or a foreign equivalent), or a bachelor's plus at least 2 years at a university or research institute with ability equal to a master's holder (or individual assessment for those aged 24 or above).",
              "Doctoral program-এর দ্বিতীয় অংশের জন্য: master's বা professional degree (বা বিদেশি সমমান), অথবা bachelor's-এর পরে university বা গবেষণা প্রতিষ্ঠানে অন্তত ২ বছর কাজ করে master's-এর সমান যোগ্যতা (বা ২৪ বছর বা তার বেশি বয়সে school-এর নিজস্ব যাচাই)।",
            ),
            b('Medical, dental and veterinary PhDs take 4 years after a 6-year bachelor’s program.', 'Medicine, dentistry আর veterinary-র PhD ৬ বছরের bachelor’s-এর পরে ৪ বছরের।'),
          ],
          [JP_SIJ_GRADUATE],
        ),
        qa(
          'proposal',
          b('Do you need a research proposal and a supervisor?', 'Research proposal আর supervisor লাগবে কি?'),
          [
            b(
              'Yes, in most cases: most graduate schools require a research proposal, and you usually have to find your own advisor; some schools require the advisor’s approval before you apply. Your research achievements, plan and reasons for choosing the advisor matter.',
              'বেশিরভাগ ক্ষেত্রে হ্যাঁ: বেশিরভাগ graduate school research proposal চায়, আর সাধারণত advisor নিজেকেই খুঁজতে হয়; কিছু school আবেদনের আগে advisor-এর সম্মতি চায়। আপনার গবেষণার অর্জন, পরিকল্পনা আর advisor বেছে নেওয়ার কারণ গুরুত্বপূর্ণ।',
            ),
          ],
          [JP_SIJ_GRADUATE],
        ),
        qa(
          'selection',
          b('How are PhD students selected?', 'PhD-তে কীভাবে বাছাই হয়?'),
          [b('Usually a combination of document screening, an academic test, an interview, an essay and an oral examination; doctoral applicants also submit their master’s diploma or expected-graduation certificate.', 'সাধারণত document যাচাই, academic পরীক্ষা, interview, essay আর মৌখিক পরীক্ষা মিলিয়ে; doctoral আবেদনকারীরা master’s-এর সনদ বা সম্ভাব্য graduation-এর প্রত্যয়নপত্রও দেন।')],
          [JP_SIJ_GRADUATE],
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language', 'ভাষা'),
      items: [
        qa(
          'language',
          b('Japanese or English?', 'Japanese নাকি English?'),
          [b('Graduate programs are mostly in Japanese, but programs taught entirely in English are growing. JASSO’s graduate guideline is TOEFL iBT 75–80 or IELTS 6; each program sets its own requirement.', 'Graduate program বেশিরভাগ Japanese-এ, তবে পুরোপুরি English-এ পড়ানো program বাড়ছে। JASSO-র graduate নির্দেশক TOEFL iBT 75–80 বা IELTS 6; প্রতিটি program নিজের শর্ত ঠিক করে।')],
          [JP_SIJ_GRADUATE, JP_SIJ_ENGLISH],
          { kind: 'guidance' },
        ),
      ],
    },
    {
      id: 'funding',
      title: b('Funding and costs', 'Funding ও খরচ'),
      items: [
        { embed: 'scholarships' },
        qa(
          'tuition',
          b('How much does a PhD cost?', 'PhD-তে খরচ কত?'),
          [b('Annual tuition: national JPY 535,800 (standard); local public JPY 530,802 on average; private JPY 663,923 on average (doctoral programs).', 'বার্ষিক tuition: national ¥535,800 (standard); local public গড়ে ¥530,802; private গড়ে ¥663,923 (doctoral program)।')],
          [JP_SIJ_GUIDE_2026],
        ),
        living('living'),
        { embed: 'costs' },
        financialProof('funds'),
      ],
    },
    { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' }] },
    { id: 'universities', title: b('Universities', 'University'), items: [{ embed: 'universities' }] },
    { id: 'work', title: b('Part-time work', 'Part-time কাজ'), items: [work('work')] },
    { id: 'visa', title: b('Visa', 'Visa'), items: [coe('visa'), visaTime('visa-time')] },
  ],
};

// ------------------------------------------------------------------ the country

export const JP_GUIDE: CountryGuide = {
  code: 'JP',
  checkedAt: JP_READ,
  sourcesPerSection: true,
  intro: b(
    'Japan admits international students after 12 years of school, has national universities with a standard tuition, a government scholarship (MEXT) and a growing number of English-taught programs, especially at graduate level. This guide is built from Japanese official sources.',
    'জাপান ১২ বছরের পড়াশোনা শেষ করা international student নেয়; national university-তে standard tuition, সরকারি scholarship (MEXT) আর বিশেষ করে graduate level-এ English-এ পড়ানো program বাড়ছে। এই guide জাপানের official source থেকে তৈরি।',
  ),
  overview: [
    qa(
      'why',
      b('Why do international students choose Japan?', 'International student-রা কেন জাপান বেছে নেন?'),
      [
        b(
          'Factually: national universities charge a standard tuition of JPY 535,800 a year; there are government scholarships (MEXT, and JASSO’s Honors Scholarship for privately financed students); more degree programs are taught entirely in English, especially at graduate level; and students may work part-time with permission.',
          'তথ্য অনুযায়ী: national university-তে বার্ষিক standard tuition ¥535,800; সরকারি scholarship আছে (MEXT, আর নিজের খরচে পড়া student-দের জন্য JASSO-র Honors Scholarship); বিশেষ করে graduate level-এ পুরোপুরি English-এ পড়ানো program বাড়ছে; আর অনুমতি নিয়ে part-time কাজ করা যায়।',
        ),
      ],
      [JP_SIJ_GUIDE_2026, JP_SIJ_GRADUATE, JP_SIJ_WORK],
    ),
    qa(
      'system',
      b('How does the education system work?', 'শিক্ষাব্যবস্থা কেমন?'),
      [
        b(
          'Higher education starts after 12 years of school (6 + 3 + 3). There are national, local public and private universities; a bachelor’s generally takes 4 years (6 for medicine, dentistry, veterinary science and pharmacy), a master’s 2 years, and a doctorate about 5 years including the master’s.',
          'উচ্চশিক্ষা শুরু হয় ১২ বছরের স্কুলের পরে (৬ + ৩ + ৩)। National, local public আর private university আছে; bachelor’s সাধারণত ৪ বছর (medicine, dentistry, veterinary আর pharmacy-তে ৬), master’s ২ বছর, আর doctorate master’s-সহ প্রায় ৫ বছর।',
        ),
      ],
      [JP_SIJ_GUIDE_2026, JP_SIJ_GRADUATE],
    ),
    qa(
      'calendar',
      b('When does the academic year start?', 'শিক্ষাবর্ষ কখন শুরু হয়?'),
      [b('Most schools start in April; many universities also have fall admission (September or October).', 'বেশিরভাগ প্রতিষ্ঠান April-এ শুরু; অনেক university fall-এও (September বা October) ভর্তি নেয়।')],
      [JP_SIJ_GRADUATE],
    ),
    qa(
      'languages',
      b('Which language will you study in?', 'কোন ভাষায় পড়বেন?'),
      [b('Degree programs are normally taught in Japanese, but more programs — especially graduate ones — are taught entirely in English. Japanese-taught undergraduate admission often uses the EJU.', 'Degree program সাধারণত Japanese-এ, তবে বিশেষ করে graduate level-এ পুরোপুরি English-এ পড়ানো program বাড়ছে। Japanese-এ undergraduate ভর্তিতে প্রায়ই EJU লাগে।')],
      [JP_SIJ_GRADUATE, JP_SIJ_GUIDE_2026],
    ),
    qa(
      'visa-overview',
      b('How does the student visa work?', 'Student visa কীভাবে কাজ করে?'),
      [b('After admission, your school in Japan applies for your Certificate of Eligibility (COE); with it you apply for the visa at the Embassy of Japan in Bangladesh. A COE does not guarantee a visa.', 'ভর্তির পরে জাপানের university আপনার Certificate of Eligibility (COE)-র আবেদন করে; COE নিয়ে Bangladesh-এর Japan Embassy-তে visa-র আবেদন করবেন। COE থাকলেই visa নিশ্চিত নয়।')],
      [JP_MOFA_STUDENT, JP_EMBASSY_DOCS],
    ),
  ],
  faqs: [
    qa('bachelors', b("What do you need to study for a Bachelor's in Japan?", "জাপানে Bachelor's পড়তে কী কী লাগে?"), [b('12 years of formal education (SSC + HSC), the university’s selection (often the EJU), language proof, then a COE and a student visa.', '১২ বছরের formal পড়াশোনা (SSC + HSC), university-র বাছাই (প্রায়ই EJU), ভাষার প্রমাণ, তারপর COE আর student visa।')], [JP_SIJ_UNIVERSITIES, JP_SIJ_GUIDE_2026]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A 4-year bachelor's or 16 years of education (or 3+ years at a foreign university with a bachelor's), usually a research proposal and often an advisor who accepts you.", "৪ বছরের bachelor's বা ১৬ বছরের পড়াশোনা (বা বিদেশি university-তে ৩+ বছরে bachelor's), সাধারণত research proposal আর অনেক সময় একজন advisor-এর সম্মতি।")], [JP_SIJ_GRADUATE]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b("A master's or equivalent, a research proposal and usually an advisor.", "Master's বা সমমান, research proposal আর সাধারণত একজন advisor।")], [JP_SIJ_GRADUATE]),
    qa('grades', b('What grades are required?', 'কত grade লাগে?'), [b('Not verified yet: no national minimum is given in the official sources we read. This can vary by university and program; check the official university page.', 'এখনো যাচাই হয়নি: আমরা যে official source পড়েছি, তাতে জাতীয় কোনো minimum নেই। এটা university/program অনুযায়ী পরিবর্তিত হতে পারে; official university page দেখুন।')], [JP_SIJ_UNIVERSITIES], { status: 'not-verified' }),
    qa('exam', b('Is there an entrance exam?', 'ভর্তি পরীক্ষা আছে কি?'), [b('Each university decides. About 500 universities, including almost all national ones, use the EJU for undergraduate admission; graduate schools often combine document screening, tests, interviews and essays.', 'প্রতিটি university নিজে ঠিক করে। প্রায় ৫০০টি university, প্রায় সব national-সহ, undergraduate ভর্তিতে EJU ব্যবহার করে; graduate school প্রায়ই document যাচাই, পরীক্ষা, interview আর essay মিলিয়ে বাছাই করে।')], [JP_SIJ_GUIDE_2026, JP_SIJ_GRADUATE]),
    qa('japanese', b('Do you need Japanese?', 'Japanese লাগবে কি?'), [b('For Japanese-taught programs, yes (the level is set by each university; the EJU tests academic Japanese). For English-taught programs, generally no.', 'Japanese-এ পড়ানো program-এ হ্যাঁ (level প্রতিটি university ঠিক করে; EJU-তে academic Japanese যাচাই হয়)। English program-এ সাধারণত না।')], [JP_SIJ_GUIDE_2026, JP_SIJ_ENGLISH]),
    qa('ielts', b('Do you need IELTS or TOEFL?', 'IELTS বা TOEFL লাগবে কি?'), [b('For English-taught programs, usually. JASSO’s guideline for graduate schools is TOEFL iBT 75–80 or IELTS 6; the score is set by each program, so it can vary.', 'English program-এ সাধারণত হ্যাঁ। Graduate school-এর জন্য JASSO-র নির্দেশক TOEFL iBT 75–80 বা IELTS 6; score প্রতিটি program ঠিক করে, তাই আলাদা হতে পারে।')], [JP_SIJ_GRADUATE], { status: 'partly-verified' }),
    qa('cost', b('How much does it cost to study in Japan?', 'জাপানে পড়াশোনার খরচ কত?'), [b('Tuition at a national university is JPY 535,800 a year (standard); the first year with the admission fee is about JPY 820,000. Private universities cost more. Living costs average about JPY 105,000 a month (estimate).', 'National university-তে বার্ষিক tuition ¥535,800 (standard); ভর্তি fee-সহ প্রথম বছরে প্রায় ¥820,000। Private university-তে খরচ বেশি। থাকা-খাওয়া মাসে গড়ে প্রায় ¥105,000 (আনুমানিক)।')], [JP_SIJ_GUIDE_2026, JP_SIJ_FEES, JP_SIJ_LIVING]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('For the visa (Embassy of Japan in Bangladesh): application form, passport (and old passports), two photos, the COE, resume, acceptance letter, original academic certificates, financial documents and tuition payment receipts. Graduate schools also ask for a research proposal and recommendation letter. Each degree guide explains every document once.', 'Visa-র জন্য (Bangladesh-এর Japan Embassy): application form, passport (আর পুরনো passport), দুটি ছবি, COE, resume, acceptance letter, মূল শিক্ষাগত সনদ, আর্থিক document আর tuition-এর রসিদ। Graduate school research proposal আর recommendation letter-ও চায়। প্রতিটি degree guide-এ প্রতিটি document একবার ব্যাখ্যা করা আছে।')], [JP_EMBASSY_DOCS, JP_SIJ_GRADUATE]),
    qa('visa', b('How do you get a student visa for Japan?', 'জাপানে Student Visa কীভাবে পাওয়া যায়?'), [b('Admission → your school applies for the COE → you apply for the visa at the Embassy of Japan in Bangladesh. Processing time and fee for Bangladesh are not verified here.', 'ভর্তি → university COE-র আবেদন করে → আপনি Bangladesh-এর Japan Embassy-তে visa-র আবেদন করেন। Bangladesh-এর processing time আর fee এখানে যাচাই হয়নি।')], [JP_MOFA_STUDENT, JP_EMBASSY_DOCS], { status: 'partly-verified' }),
    qa('work', b('Can you work part-time?', 'Part-time কাজ করা যায় কি?'), [b('Yes, with permission (you can get it at the airport on first arrival): within 28 hours a week, up to 8 hours a day in long holidays. Part-time income alone cannot cover study costs.', 'হ্যাঁ, অনুমতি নিয়ে (প্রথমবার পৌঁছে বিমানবন্দরেই নেওয়া যায়): সপ্তাহে ২৮ ঘণ্টার মধ্যে, লম্বা ছুটিতে দিনে সর্বোচ্চ ৮ ঘণ্টা। শুধু part-time আয়ে পড়ার খরচ চলে না।')], [JP_SIJ_WORK]),
    qa('scholarships', b('Which scholarships are there?', 'কী কী scholarship আছে?'), [b('The Japanese Government (MEXT) Scholarship (Embassy or University recommendation) covers exam, admission and tuition fees, flights and a monthly allowance; JASSO’s Monbukagakusho Honors Scholarship supports privately financed students; universities may have their own.', 'জাপান সরকারের (MEXT) Scholarship (Embassy বা University recommendation) পরীক্ষা, ভর্তি আর tuition fee, বিমানভাড়া আর মাসিক ভাতা দেয়; নিজের খরচে পড়া student-দের জন্য JASSO-র Monbukagakusho Honors Scholarship আছে; university-র নিজস্ব scholarship-ও থাকতে পারে।')], [JP_EMBASSY_MEXT, JP_SIJ_GUIDE_2026]),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('National, local public and private universities. Examples on each degree page (for example the University of Tokyo, Kyoto University, Osaka University, Tohoku University and the Institute of Science Tokyo — formerly Tokyo Institute of Technology) are listed alphabetically, not ordered by quality.', 'National, local public আর private university। প্রতিটি degree page-এ উদাহরণ (যেমন University of Tokyo, Kyoto University, Osaka University, Tohoku University আর Institute of Science Tokyo — আগের Tokyo Institute of Technology) বর্ণানুক্রমে দেওয়া, মান অনুযায়ী সাজানো নয়।')], [JP_SIJ_FEES]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('The Embassy of Japan in Bangladesh asks for 1 original + 1 photocopy of every document except the passport and photos, and may ask for more. The EJU is not held in Bangladesh (2026 venue list). MEXT Embassy-recommendation rounds are advertised by the Ministry of Education, Bangladesh.', 'Bangladesh-এর Japan Embassy passport আর ছবি ছাড়া প্রতিটি document-এর ১টি মূল + ১টি ফটোকপি চায়, আরও document চাইতে পারে। EJU Bangladesh-এ হয় না (২০২৬-এর কেন্দ্রের তালিকা)। MEXT-এর Embassy recommendation-এর বিজ্ঞাপন দেয় Bangladesh-এর শিক্ষা মন্ত্রণালয়।'),
    ], [JP_EMBASSY_DOCS, JP_SIJ_GUIDE_2026, JP_EMBASSY_MEXT]),
  ],
  life: [
    qa('housing', b('Where do students live, and what does it cost?', 'Student-রা কোথায় থাকেন, খরচ কত?'), [b('Housing averages JPY 41,000 a month nationally and JPY 57,000 in Tokyo (JASSO 2023). In big cities it is harder to rent near school, which raises commuting costs.', 'বাসাভাড়া দেশে গড়ে মাসে ¥41,000, Tokyo-তে ¥57,000 (JASSO ২০২৩)। বড় শহরে প্রতিষ্ঠানের কাছে ভাড়া পাওয়া কঠিন, তাই যাতায়াত খরচ বাড়ে।')], [JP_SIJ_LIVING], { kind: 'estimate' }),
    qa('health', b('How does health insurance work?', 'স্বাস্থ্যবীমা কেমন?'), [b('National Health Insurance covers 70% of medical costs; you pay 30% of the bill. Ask your city office about enrolment.', 'National Health Insurance চিকিৎসা খরচের ৭০% দেয়; bill-এর ৩০% আপনি দেন। নিবন্ধনের জন্য আপনার city office-এ জিজ্ঞেস করুন।')], [JP_SIJ_INSURANCE], { status: 'partly-verified' }),
    qa('prices', b('What do everyday things cost?', 'দৈনন্দিন জিনিসের দাম কেমন?'), [b('Examples from Japan’s retail price survey (December 2025): rice 5 kg JPY 4,979; bread 1 kg JPY 524; milk 1 litre JPY 267; 10 eggs JPY 313.', 'জাপানের খুচরা দামের জরিপ (December 2025) থেকে উদাহরণ: চাল ৫ কেজি ¥4,979; পাউরুটি ১ কেজি ¥524; দুধ ১ লিটার ¥267; ১০টি ডিম ¥313।')], [JP_SIJ_LIVING], { kind: 'estimate' }),
    qa('before', b('What should you prepare before going to Japan?', 'জাপান যাওয়ার আগে কী প্রস্তুতি নেবেন?'), [b('Your COE and visa, a financial plan that does not rely on part-time work (JASSO’s advice), your accommodation, and — if you plan to work — the work permission, which you can request on arrival at the airport.', 'COE আর visa, part-time কাজের উপর নির্ভর না করা আর্থিক পরিকল্পনা (JASSO-র পরামর্শ), থাকার জায়গা, আর কাজ করতে চাইলে কাজের অনুমতি, যা বিমানবন্দরে পৌঁছেই চাওয়া যায়।')], [JP_SIJ_WORK, JP_MOFA_STUDENT], { kind: 'guidance' }),
  ],
  documents: JP_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'fact', status: 'verified', value: { min: 535800, unit: 'JPY/year', text: b('JPY 535,800 a year at national universities (standard).', 'National university-তে বছরে ¥535,800 (standard)।') }, source: JP_SIJ_GUIDE_2026 },
    { id: 'funds-to-show', kind: 'fact', status: 'not-verified' },
    { id: 'living-cost', kind: 'estimate', status: 'verified', value: { min: 105000, unit: 'JPY/month', text: b('About JPY 105,000 a month (estimate).', 'মাসে প্রায় ¥105,000 (আনুমানিক)।') }, source: JP_SIJ_LIVING },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { max: 28, unit: 'hours/week', text: b('Within 28 hours a week; 8 hours a day in long holidays.', 'সপ্তাহে ২৮ ঘণ্টার মধ্যে; লম্বা ছুটিতে দিনে ৮ ঘণ্টা।') }, source: JP_SIJ_WORK },
    { id: 'post-study-stay', kind: 'fact', status: 'not-verified' },
    { id: 'english-programs', kind: 'fact', status: 'partly-verified', value: { unit: 'programs', text: b('Programs taught entirely in English exist, more at graduate level; count not verified.', 'পুরোপুরি English-এ পড়ানো program আছে, graduate level-এ বেশি; সংখ্যা যাচাই হয়নি।') }, source: JP_SIJ_GRADUATE },
    { id: 'visa-fee', kind: 'fact', status: 'not-verified' },
  ],
};

import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  GB_APPENDIX_STUDENT,
  GB_CHEVENING_COVER,
  GB_CHEVENING_ELIG,
  GB_CSC_MASTERS,
  GB_CSC_PHD,
  GB_EDINBURGH_BD,
  GB_GRADUATE,
  GB_GREAT_BD,
  GB_IHS,
  GB_MANCHESTER_BD,
  GB_READ,
  GB_TB,
  GB_TB_BD,
  GB_UCAS_DATES,
  GB_UCAS_FORM,
  GB_UKRI,
  GB_VAC,
  GB_VFS_BD,
  GB_VISA,
  GB_VISA_COURSE,
  GB_VISA_DOCS,
  GB_VISA_ENGLISH,
  GB_VISA_FAMILY,
  GB_VISA_MONEY,
} from './gb-sources';

/**
 * United Kingdom reading guide, researched on its own from UK official
 * sources (GOV.UK / UKVI, UCAS, Chevening, the Commonwealth Scholarship
 * Commission, the British Council, UKRI and university pages). Nothing is
 * taken from another country's guide. Tuition is set per university and
 * course, so no single tuition figure is shown.
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
  'Requirements are not the same at every UK university: each university and course sets its own. Always check the official course page of the university you apply to.',
  'UK-র সব university-তে শর্ত এক নয়: প্রতিটি university আর course নিজের শর্ত ঠিক করে। যে university-তে আবেদন করবেন, তার official course page অবশ্যই দেখে নিন।',
);

// ------------------------------------------------------------------ shared answers

const visa = (id: string) =>
  qa(
    id,
    b('How do you get a UK Student visa from Bangladesh?', 'Bangladesh থেকে UK Student visa কীভাবে পাবেন?'),
    [
      b(
        'You need: an unconditional offer on a course from a licensed student sponsor, which sends you a CAS (Confirmation of Acceptance for Studies) number; enough money for your course fees and living costs; English at the required level; and parental consent if you are 16 or 17.',
        'লাগবে: licensed student sponsor-এর কোনো course-এ unconditional offer, যার পরে তারা আপনাকে CAS (Confirmation of Acceptance for Studies) নম্বর পাঠায়; course fee আর থাকার খরচের মতো টাকা; প্রয়োজনীয় level-এর ইংরেজি; আর ১৬ বা ১৭ বছর হলে বাবা-মায়ের সম্মতি।',
      ),
      b(
        'When: from outside the UK you can apply at the earliest 6 months before your course starts, and you must apply within 6 months of receiving your CAS. A decision usually takes about 3 weeks from outside the UK. The fee is £558, plus the healthcare surcharge.',
        'কখন: UK-র বাইরে থেকে course শুরুর সর্বোচ্চ ৬ মাস আগে আবেদন করা যায়, আর CAS পাওয়ার ৬ মাসের মধ্যে আবেদন করতে হয়। বাইরে থেকে সিদ্ধান্ত পেতে সাধারণত প্রায় ৩ সপ্তাহ লাগে। Fee £558, সঙ্গে healthcare surcharge।',
      ),
      b(
        'In Bangladesh you give your biometrics at the UK Visa Application Centre in Dhaka, run by VFS Global; after submitting the online application you have up to 240 days to book and attend. If approved you get an eVisa (an online record) linked to your passport through a UKVI account.',
        'Bangladesh-এ ঢাকার UK Visa Application Centre-এ biometrics দিতে হয়, যা VFS Global চালায়; online আবেদন জমার পরে appointment নিয়ে যাওয়ার জন্য ২৪০ দিন পর্যন্ত সময় পাবেন। অনুমোদন হলে UKVI account-এর মাধ্যমে আপনার passport-এর সঙ্গে যুক্ত eVisa (online রেকর্ড) পাবেন।',
      ),
      b(
        'You can arrive up to 1 month before a course longer than 6 months, but never before the start date on your visa. Degree-level students aged 18+ can usually stay up to 5 years.',
        '৬ মাসের বেশি course হলে শুরুর ১ মাস আগে পর্যন্ত পৌঁছানো যায়, তবে visa-র start date-এর আগে কখনো নয়। ১৮+ বয়সের degree-level student সাধারণত ৫ বছর পর্যন্ত থাকতে পারেন।',
      ),
    ],
    [GB_VISA, GB_VISA_COURSE, GB_VAC, GB_VFS_BD],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show for the Student visa?', 'UK Student visa-র জন্য কত টাকা দেখাতে হয়?'),
    [
      b(
        'Course fee: enough to pay for your course for one academic year (up to 9 months) — the amount is on your CAS. Living costs: £1,529 a month for courses in London, or £1,171 a month outside London, for up to 9 months. Extra money is needed for each family member.',
        'Course fee: এক শিক্ষাবর্ষের (সর্বোচ্চ ৯ মাস) course fee দেওয়ার মতো টাকা — অঙ্ক CAS-এ লেখা থাকে। থাকার খরচ: London-এ course হলে মাসে £1,529, London-এর বাইরে মাসে £1,171, সর্বোচ্চ ৯ মাসের জন্য। পরিবারের প্রতিজনের জন্য বাড়তি টাকা লাগে।',
      ),
      b(
        'You must have held the money for at least 28 days in a row, and the end of that 28-day period must be within 31 days of the date you apply. Bangladesh is not on the "differential evidence" list, so Bangladeshi applicants must show this evidence. A student loan or official sponsorship is shown with a letter from the lender or sponsor.',
        'টাকাটা অন্তত একটানা ২৮ দিন থাকতে হবে, আর সেই ২৮ দিনের শেষ দিন আবেদনের তারিখের ৩১ দিনের মধ্যে হতে হবে। Bangladesh "differential evidence" তালিকায় নেই, তাই Bangladesh-এর আবেদনকারীদের এই প্রমাণ দেখাতেই হবে। Student loan বা official sponsorship থাকলে loan বা sponsor প্রতিষ্ঠানের চিঠি দিয়ে দেখাতে হয়।',
      ),
    ],
    [GB_VISA_MONEY],
    { allDegrees: true },
  );

const english = (id: string) =>
  qa(
    id,
    b('How much IELTS do you need? Are there alternatives?', 'IELTS কত লাগে? বিকল্প আছে কি?'),
    [
      b(
        'For the visa, degree-level study needs English equivalent to CEFR B2. Bangladesh is not on the list of exempt countries. You can prove it with a Secure English Language Test (SELT) from an approved provider, a UK qualification or UK degree, or a degree taught in English outside the UK assessed by Ecctis. A university (Higher Education Provider) may also assess your English itself, so it may accept a different test — still at B2 level.',
        'Visa-র জন্য degree-level পড়াশোনায় CEFR B2-এর সমমানের ইংরেজি লাগে। Bangladesh ছাড়প্রাপ্ত দেশের তালিকায় নেই। প্রমাণ দেওয়া যায় approved provider-এর Secure English Language Test (SELT), UK-র qualification বা UK degree, অথবা Ecctis-এর যাচাই করা UK-র বাইরের English-medium degree দিয়ে। University (Higher Education Provider) নিজেও আপনার ইংরেজি যাচাই করতে পারে, তাই অন্য test-ও নিতে পারে — তবে সেটাও B2 level-এর হতে হবে।',
      ),
      b(
        'The exact IELTS (or TOEFL iBT and other) score is set by each course, not by the visa rules. Example: the University of Manchester accepts a range of global English tests and does not accept "English was the medium of instruction" as proof.',
        'ঠিক কত IELTS (বা TOEFL iBT ইত্যাদি) score লাগবে, তা visa-র নিয়ম নয়, প্রতিটি course ঠিক করে। উদাহরণ: University of Manchester বিভিন্ন আন্তর্জাতিক English test নেয়, কিন্তু "পড়াশোনা ইংরেজি মাধ্যমে ছিল" — এটাকে প্রমাণ হিসেবে নেয় না।',
      ),
      CHECK_UNI,
    ],
    [GB_VISA_ENGLISH, GB_MANCHESTER_BD],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in the UK?', 'UK-তে পড়ার পাশাপাশি কাজ করা যায়?'),
    [
      b(
        'Yes, within limits. A full-time degree-level student sponsored by a higher education provider with a track record of compliance may work up to 20 hours a week during term time, and full-time outside term time.',
        'হ্যাঁ, সীমার মধ্যে। যে higher education provider-এর নিয়ম মানার ভালো রেকর্ড আছে, তার sponsor করা full-time degree-level student term চলাকালীন সপ্তাহে ২০ ঘণ্টা পর্যন্ত, আর term-এর বাইরে full-time কাজ করতে পারেন।',
      ),
      b(
        'You cannot be self-employed, work in certain jobs (for example as a professional sportsperson or sports coach), or claim public funds. Your visa decision states your exact conditions.',
        'Self-employed হওয়া, কিছু নির্দিষ্ট কাজ (যেমন পেশাদার খেলোয়াড় বা sports coach) করা, বা public funds (সরকারি সুবিধা) নেওয়া যায় না। আপনার visa-র সিদ্ধান্তে ঠিক কী শর্ত, তা লেখা থাকে।',
      ),
    ],
    [GB_APPENDIX_STUDENT, GB_VISA],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in the UK after your studies?', 'পড়া শেষে UK-তে থাকা যায় কি?'),
    [
      b(
        "Yes, through the Graduate visa, applied for from inside the UK before your Student visa expires, once your university has told the Home Office you completed the course. It lasts 2 years if you apply on or before 31 December 2026 and 18 months if you apply on or after 1 January 2027; 3 years after a PhD.",
        'হ্যাঁ, Graduate visa দিয়ে — Student visa শেষ হওয়ার আগে UK-র ভেতর থেকেই আবেদন করতে হয়, university Home Office-কে course শেষ হওয়ার কথা জানানোর পরে। ৩১ December ২০২৬ বা তার আগে আবেদন করলে ২ বছর, ১ January ২০২৭ বা পরে আবেদন করলে ১৮ মাস; PhD-র পরে ৩ বছর।',
      ),
      b(
        'The fee is £937 plus the healthcare surcharge (usually £1,035 a year). You can work in most jobs, look for work or be self-employed. It cannot be extended, but you may switch to another visa such as the Skilled Worker visa.',
        'Fee £937, সঙ্গে healthcare surcharge (সাধারণত বছরে £1,035)। বেশিরভাগ চাকরি করা, চাকরি খোঁজা বা self-employed হওয়া যায়। মেয়াদ বাড়ানো যায় না, তবে Skilled Worker visa-র মতো অন্য visa-তে যাওয়া যেতে পারে।',
      ),
    ],
    [GB_GRADUATE, GB_VISA],
    { allDegrees: true },
  );

const ihs = (id: string) =>
  qa(
    id,
    b('What is the Immigration Health Surcharge (IHS)?', 'Immigration Health Surcharge (IHS) কী?'),
    [
      b(
        'A healthcare fee paid with the visa application. For students it is £776 per year of the visa (for example £1,552 for a 2-year visa); part of a year over 6 months counts as a full year, and up to 18 months costs one and a half years. The visa can last longer than the course, so check the length you are given.',
        'Visa আবেদনের সঙ্গে দেওয়া স্বাস্থ্যসেবার fee। Student-দের জন্য visa-র প্রতি বছরে £776 (যেমন ২ বছরের visa-তে £1,552); ৬ মাসের বেশি আংশিক বছর পুরো বছর ধরা হয়, আর ১৮ মাস পর্যন্ত হলে দেড় বছরের সমান। Visa course-এর চেয়ে লম্বা হতে পারে, তাই দেওয়া মেয়াদ দেখে হিসাব করুন।',
      ),
    ],
    [GB_IHS],
    { allDegrees: true },
  );

const tb = (id: string) =>
  qa(
    id,
    b('Do Bangladeshi applicants need a TB test?', 'Bangladesh-এর আবেদনকারীদের কি TB test লাগে?'),
    [
      b(
        'Yes. Bangladesh is on the list of countries where you need a tuberculosis (TB) test for a UK visa if you have lived there for 6 months or more and are coming to the UK for more than 6 months. The test must be done at a Home Office-approved clinic in Bangladesh (listed on GOV.UK).',
        'হ্যাঁ। যে দেশগুলো থেকে UK visa-র জন্য tuberculosis (TB) test লাগে, Bangladesh তার তালিকায় আছে — যদি সেখানে ৬ মাস বা তার বেশি থাকেন আর UK-তে ৬ মাসের বেশি সময়ের জন্য যান। Test করাতে হবে Bangladesh-এ Home Office-অনুমোদিত clinic-এ (GOV.UK-এ তালিকা আছে)।',
      ),
      b('The clinic fee is not verified here.', 'Clinic-এর fee এখানে যাচাই করা হয়নি।'),
    ],
    [GB_TB, GB_TB_BD],
    { allDegrees: true },
  );

const living = (id: string) =>
  qa(
    id,
    b('How much are living costs?', 'থাকা-খাওয়ার খরচ কত?'),
    [
      b(
        'The only official figure is the visa minimum: £1,529 a month in London and £1,171 a month outside London (for up to 9 months). Real costs for rent, food and transport vary a lot by city and are not verified here — London is set higher by the rules themselves.',
        'একমাত্র official অঙ্ক হলো visa-র minimum: London-এ মাসে £1,529, London-এর বাইরে মাসে £1,171 (সর্বোচ্চ ৯ মাস)। বাসাভাড়া, খাবার আর যাতায়াতের আসল খরচ শহর অনুযায়ী অনেক আলাদা, এখানে যাচাই হয়নি — নিয়মেই London-এর অঙ্ক বেশি ধরা আছে।',
      ),
    ],
    [GB_VISA_MONEY],
    { kind: 'estimate', status: 'partly-verified', allDegrees: true },
  );

const tuition = (id: string) =>
  qa(
    id,
    b('How much is tuition in the UK?', 'UK-তে tuition কত?'),
    [
      b(
        'Not verified yet as a single figure: tuition for international students is set by each university and differs by course and level. The amount for your first year appears on your CAS, and you must show it for the visa. Check the fee on the course page.',
        'এখনো একক অঙ্ক হিসেবে যাচাই হয়নি: international student-দের tuition প্রতিটি university ঠিক করে, আর course ও level অনুযায়ী আলাদা। আপনার প্রথম বছরের অঙ্ক CAS-এ থাকে, আর visa-র জন্য সেটা দেখাতে হয়। Course page-এ fee দেখে নিন।',
      ),
    ],
    [GB_VISA_MONEY],
    { status: 'not-verified' },
  );

const dependants = (id: string) =>
  qa(
    id,
    b('Can you bring your spouse or children?', 'স্বামী/স্ত্রী বা সন্তান সঙ্গে নেওয়া যায় কি?'),
    [
      b(
        'Only in limited cases: GOV.UK says partners and children can apply if the student is government-sponsored or a full-time postgraduate student on a qualifying course. Extra money must be shown for each family member. Check the qualifying-course rules on GOV.UK before planning.',
        'শুধু সীমিত ক্ষেত্রে: GOV.UK অনুযায়ী student সরকারি sponsorship-এ থাকলে বা qualifying course-এ full-time postgraduate student হলে partner আর সন্তান আবেদন করতে পারেন। পরিবারের প্রতিজনের জন্য বাড়তি টাকা দেখাতে হয়। পরিকল্পনার আগে GOV.UK-এ qualifying course-এর নিয়ম দেখে নিন।',
      ),
    ],
    [GB_VISA_FAMILY],
    { status: 'partly-verified', allDegrees: true },
  );

// ------------------------------------------------------------------ documents

export const GB_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Required for the visa; your eVisa is linked to it.', 'Visa-র জন্য লাগে; আপনার eVisa এর সঙ্গে যুক্ত হয়।'),
    who: b('UK Visas and Immigration.', 'UK-র অভিবাসন দপ্তর UK Visas and Immigration (UKVI)।'),
    when: b('From the university application to the visa.', 'University-র আবেদন থেকে visa পর্যন্ত।'),
    where: b('Online visa application and VFS Global, Dhaka.', 'Online visa আবেদন আর VFS Global, ঢাকা।'),
    prepare: b('A current passport — the one you will travel with.', 'বৈধ passport — যেটা নিয়ে ভ্রমণ করবেন।'),
    groups: ['general', 'visa'],
    sources: [GB_VISA_DOCS, GB_VISA],
  },
  {
    id: 'academic',
    name: b('Certificates and transcripts', 'সনদ আর transcript'),
    why: b("University documents: show you meet the course's academic entry requirements.", 'University-র document: দেখায় যে course-এর academic শর্ত পূরণ করছেন।'),
    who: b('The university (through UCAS for most bachelor’s courses).', 'University (বেশিরভাগ bachelor’s course-এ UCAS-এর মাধ্যমে)।'),
    when: b('With the application.', 'আবেদনের সময়।'),
    where: b('UCAS or the university’s postgraduate application portal.', 'UCAS বা university-র postgraduate application portal।'),
    prepare: b('SSC/HSC or degree certificates and full transcripts; each university lists what it needs.', 'SSC/HSC বা degree-র সনদ আর পূর্ণ transcript; কী লাগবে তা প্রতিটি university জানায়।'),
    groups: ['general', 'program'],
    sources: [GB_MANCHESTER_BD, GB_UCAS_FORM],
  },
  {
    id: 'english',
    name: b('English language test result', 'ইংরেজি test-এর ফল'),
    why: b('Needed by the university and the visa (B2 for degree level).', 'University আর visa — দুটোর জন্যই লাগে (degree level-এ B2)।'),
    who: b('The university sets the score; UKVI sets the minimum level.', 'Score ঠিক করে university; minimum level ঠিক করে UKVI।'),
    when: b('Before or with the application; before the CAS.', 'আবেদনের আগে বা সঙ্গে; CAS-এর আগে।'),
    where: b('An approved SELT provider, or the test the university accepts.', 'Approved SELT provider, বা university যে test নেয়।'),
    prepare: b('Check the course page for the exact test and score.', 'ঠিক কোন test আর score, তা course page-এ দেখুন।'),
    groups: ['program', 'visa'],
    sources: [GB_VISA_ENGLISH, GB_MANCHESTER_BD],
  },
  {
    id: 'personal-statement',
    name: b('Personal statement', 'Personal statement (ব্যক্তিগত বিবৃতি)'),
    why: b('University document: explains why you want the course and why you are suitable.', 'University-র document: কেন এই course চান আর কেন আপনি উপযুক্ত, তা ব্যাখ্যা করে।'),
    who: b('UCAS (bachelor’s) or the university (postgraduate).', 'UCAS (bachelor’s) বা university (postgraduate)।'),
    when: b('With the application.', 'আবেদনের সময়।'),
    where: b('UCAS application or the university portal.', 'UCAS-এর আবেদন বা university portal।'),
    prepare: b('Written by you, in your own words.', 'নিজের ভাষায় নিজে লিখবেন।'),
    groups: ['program'],
    sources: [GB_UCAS_FORM],
  },
  {
    id: 'reference',
    name: b('Reference(s)', 'Reference (সুপারিশপত্র)'),
    why: b('University or scholarship document: a teacher or employer comments on your ability.', 'University বা scholarship-এর document: শিক্ষক বা নিয়োগকর্তা আপনার যোগ্যতা নিয়ে মন্তব্য করেন।'),
    who: b('UCAS needs a reference before an application can be sent; universities and scholarships set their own numbers.', 'UCAS-এ reference ছাড়া আবেদন পাঠানো যায় না; university আর scholarship কতজন চায় তা নিজেরা ঠিক করে।'),
    when: b('Before submitting.', 'জমা দেওয়ার আগে।'),
    where: b('Through UCAS, the university portal or the scholarship system.', 'UCAS, university portal বা scholarship system-এ।'),
    prepare: b('Ask referees early.', 'আগেভাগে referee-দের অনুরোধ করুন।'),
    groups: ['program'],
    sources: [GB_UCAS_FORM, GB_CSC_MASTERS],
  },
  {
    id: 'cv',
    name: b('CV and portfolio or work experience evidence (if the course asks)', 'CV আর portfolio বা কাজের অভিজ্ঞতার প্রমাণ (course চাইলে)'),
    why: b("University document for some postgraduate courses (for example Manchester's MBA needs three years' work experience).", "কিছু postgraduate course-এর university document (যেমন Manchester-এর MBA-তে তিন বছরের কাজের অভিজ্ঞতা লাগে)।"),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('With the application.', 'আবেদনের সময়।'),
    where: b('The university portal.', 'University portal-এ।'),
    prepare: b('Not verified for other courses: check the course page.', 'অন্য course-এর জন্য যাচাই হয়নি: course page দেখুন।'),
    groups: ['program'],
    degrees: ['masters', 'phd'],
    status: 'partly-verified',
    sources: [GB_MANCHESTER_BD],
  },
  {
    id: 'research-proposal',
    name: b('Research proposal', 'Research proposal (গবেষণা প্রস্তাব)'),
    why: b('University document: a PhD is individually supervised, and the proposal shows your planned research.', 'University-র document: PhD-তে আলাদা supervisor থাকেন, আর proposal দেখায় আপনি কী গবেষণা করবেন।'),
    who: b('The university (for example Manchester requires one with a formal application).', 'University (যেমন Manchester আনুষ্ঠানিক আবেদনের সঙ্গে চায়)।'),
    when: b('With the application, after contacting a potential supervisor.', 'আবেদনের সঙ্গে, সম্ভাব্য supervisor-এর সঙ্গে যোগাযোগের পরে।'),
    where: b('The university’s research admissions portal.', 'University-র research admissions portal।'),
    prepare: b('Discuss your idea with the potential supervisor first.', 'আগে সম্ভাব্য supervisor-এর সঙ্গে আপনার idea নিয়ে কথা বলুন।'),
    groups: ['program'],
    degrees: ['phd'],
    sources: [GB_MANCHESTER_BD],
  },
  {
    id: 'scholarship-docs',
    name: b('Scholarship application documents (for example Commonwealth)', 'Scholarship আবেদনের document (যেমন Commonwealth)'),
    why: b('Scholarship documents — separate from the university and visa documents.', 'Scholarship-এর document — university আর visa-র document থেকে আলাদা।'),
    who: b('The scholarship body (for example the Commonwealth Scholarship Commission).', 'Scholarship প্রতিষ্ঠান (যেমন Commonwealth Scholarship Commission)।'),
    when: b('By the scholarship deadline (Commonwealth 2027/28: 20 October).', 'Scholarship-এর শেষ তারিখের মধ্যে (Commonwealth ২০২৭/২৮: ২০ October)।'),
    where: b('The scholarship’s own system (CSC Central for Commonwealth).', 'Scholarship-এর নিজের system (Commonwealth-এর জন্য CSC Central)।'),
    prepare: b('Commonwealth Master’s: passport or national ID, full transcripts of all higher education (with certified translations), and at least two signed references in PDF.', 'Commonwealth Master’s: passport বা জাতীয় পরিচয়পত্র, সব উচ্চশিক্ষার পূর্ণ transcript (প্রত্যয়িত অনুবাদসহ), আর অন্তত দুটি স্বাক্ষরিত reference, PDF-এ।'),
    groups: ['program', 'bangladesh'],
    degrees: ['masters', 'phd'],
    sources: [GB_CSC_MASTERS],
  },
  {
    id: 'cas',
    name: b('CAS (Confirmation of Acceptance for Studies)', 'CAS (ভর্তির নিশ্চয়তা, Confirmation of Acceptance for Studies)'),
    why: b('Visa document: the reference number your university sends after an unconditional offer; you cannot apply without it.', 'Visa-র document: unconditional offer-এর পরে university যে reference নম্বর পাঠায়; এটা ছাড়া আবেদন করা যায় না।'),
    who: b('Issued by the university (licensed student sponsor).', 'University (licensed student sponsor) দেয়।'),
    when: b('After you accept an unconditional offer; apply for the visa within 6 months of receiving it.', 'Unconditional offer গ্রহণের পরে; পাওয়ার ৬ মাসের মধ্যে visa-র আবেদন করতে হবে।'),
    where: b('Entered on your online visa application.', 'Online visa আবেদনে লিখতে হয়।'),
    prepare: b('Check the course fee shown on it — that is what you must show.', 'এতে লেখা course fee দেখে নিন — ওই অঙ্কই দেখাতে হবে।'),
    groups: ['visa'],
    sources: [GB_VISA_COURSE, GB_VISA_MONEY],
  },
  {
    id: 'finance',
    name: b('Financial evidence (28 days)', 'আর্থিক প্রমাণ (২৮ দিন)'),
    why: b('Visa document: shows course fees for the first year plus living costs (£1,529 or £1,171 a month for up to 9 months).', 'Visa-র document: প্রথম বছরের course fee আর থাকার খরচ দেখায় (মাসে £1,529 বা £1,171, সর্বোচ্চ ৯ মাস)।'),
    who: b('UK Visas and Immigration.', 'UK-র অভিবাসন দপ্তর UK Visas and Immigration (UKVI)।'),
    when: b('Held for 28 days in a row, ending within 31 days of your application.', 'একটানা ২৮ দিন রাখা, যার শেষ দিন আবেদনের ৩১ দিনের মধ্যে।'),
    where: b('Uploaded with the visa application.', 'Visa আবেদনের সঙ্গে upload।'),
    prepare: b('Bangladeshi applicants must provide it (Bangladesh is not on the differential evidence list). A sponsor must give written consent if they paid your fees and living costs in the last 12 months.', 'Bangladesh-এর আবেদনকারীদের দিতেই হবে (Bangladesh differential evidence তালিকায় নেই)। গত ১২ মাসে কোনো sponsor fee ও থাকার খরচ দিয়ে থাকলে তার লিখিত সম্মতি লাগবে।'),
    groups: ['visa', 'bangladesh'],
    sources: [GB_VISA_MONEY, GB_VISA_DOCS],
  },
  {
    id: 'tb-test',
    name: b('TB test certificate', 'TB test-এর সনদ'),
    why: b('Visa document: required for people who have lived in Bangladesh for 6 months or more and are coming for more than 6 months.', 'Visa-র document: Bangladesh-এ ৬ মাস বা বেশি থেকেছেন আর ৬ মাসের বেশি সময়ের জন্য যাচ্ছেন — তাদের লাগে।'),
    who: b('UK Visas and Immigration.', 'UK-র অভিবাসন দপ্তর UK Visas and Immigration (UKVI)।'),
    when: b('Before the visa application.', 'Visa আবেদনের আগে।'),
    where: b('A Home Office-approved clinic in Bangladesh.', 'Bangladesh-এর Home Office-অনুমোদিত clinic।'),
    prepare: b('Use only a clinic on the GOV.UK list.', 'শুধু GOV.UK তালিকার clinic ব্যবহার করুন।'),
    groups: ['visa', 'bangladesh'],
    sources: [GB_TB, GB_TB_BD],
  },
  {
    id: 'atas',
    name: b('ATAS certificate (if your course needs one)', 'ATAS সনদ (course-এ লাগলে)'),
    why: b("Visa document for some master's and PhD courses in sensitive subjects (RQF level 7 or above).", "কিছু সংবেদনশীল বিষয়ের master's আর PhD course-এর (RQF level 7 বা তার বেশি) visa document।"),
    who: b('UK Government (Academic Technology Approval Scheme).', 'UK সরকার (Academic Technology Approval Scheme)।'),
    when: b('Before the visa application.', 'Visa আবেদনের আগে।'),
    where: b('Online ATAS application.', 'Online ATAS আবেদন।'),
    prepare: b('Your university tells you if your course needs it.', 'আপনার course-এ লাগবে কিনা, university জানায়।'),
    groups: ['visa'],
    degrees: ['masters', 'phd'],
    sources: [GB_VISA_COURSE, GB_VISA_DOCS],
  },
  {
    id: 'parental-consent',
    name: b('Parental consent (if you are under 18)', 'বাবা-মায়ের সম্মতি (১৮ বছরের কম হলে)'),
    why: b('Visa document: consent for the application, living and care arrangements and travel.', 'Visa-র document: আবেদন, থাকা-দেখাশোনার ব্যবস্থা আর ভ্রমণের সম্মতি।'),
    who: b('UK Visas and Immigration.', 'UK-র অভিবাসন দপ্তর UK Visas and Immigration (UKVI)।'),
    when: b('With the visa application.', 'Visa আবেদনের সঙ্গে।'),
    where: b('Uploaded with the application.', 'আবেদনের সঙ্গে upload।'),
    prepare: b('Written consent from both parents (or the one with sole responsibility) and a birth certificate showing their names.', 'বাবা-মা দুজনের (বা যিনি একমাত্র দায়িত্বে) লিখিত সম্মতি আর তাদের নামসহ জন্মসনদ।'),
    groups: ['visa'],
    degrees: ['bachelors'],
    sources: [GB_VISA_DOCS],
  },
  {
    id: 'biometrics',
    name: b('Biometrics appointment at VFS Global, Dhaka', 'VFS Global, ঢাকা-য় biometrics appointment'),
    why: b('Visa step: you prove your identity after the online application.', 'Visa-র ধাপ: online আবেদনের পরে পরিচয় প্রমাণ করতে হয়।'),
    who: b('UK Visas and Immigration, through VFS Global.', 'UKVI, VFS Global-এর মাধ্যমে।'),
    when: b('Within 240 days of submitting the online application.', 'Online আবেদন জমার ২৪০ দিনের মধ্যে।'),
    where: b('UK Visa Application Centre, Dhaka (Sunday–Thursday).', 'UK Visa Application Centre, ঢাকা (রবিবার–বৃহস্পতিবার)।'),
    prepare: b('Bring the documents listed in your application.', 'আবেদনে তালিকাভুক্ত document নিয়ে যান।'),
    groups: ['visa', 'bangladesh'],
    sources: [GB_VFS_BD, GB_VAC],
  },
  {
    id: 'evisa',
    name: b('eVisa and UKVI account', 'eVisa আর UKVI account'),
    why: b('Your immigration status is an online record, not a sticker.', 'আপনার অভিবাসন-অবস্থা একটি online রেকর্ড, sticker নয়।'),
    who: b('UK Visas and Immigration.', 'UK-র অভিবাসন দপ্তর UK Visas and Immigration (UKVI)।'),
    when: b('After approval, before travel.', 'অনুমোদনের পরে, ভ্রমণের আগে।'),
    where: b('Set up a UKVI account online.', 'Online-এ UKVI account খুলুন।'),
    prepare: b('Link the passport you will travel with.', 'যে passport নিয়ে যাবেন, সেটা যুক্ত করুন।'),
    groups: ['arrival'],
    sources: [GB_VISA],
  },
];

// ------------------------------------------------------------------ costs (GBP, never converted)

const VISA_FEE: GuideCost = { id: 'visa-fee', label: b('Student visa fee (from outside the UK)', 'Student visa fee (UK-র বাইরে থেকে)'), value: b('£558', '£558'), amount: { value: 558, currency: 'GBP', period: 'one-time' }, source: GB_VISA };
const IHS_COST: GuideCost = { id: 'ihs', label: b('Immigration Health Surcharge (students)', 'Immigration Health Surcharge (student)'), value: b('£776 per year of the visa', 'visa-র প্রতি বছরে £776'), amount: { value: 776, currency: 'GBP', period: 'year' }, note: b('Charged for the full visa length, which can be longer than the course.', 'পুরো visa-র মেয়াদের জন্য নেওয়া হয়, যা course-এর চেয়ে লম্বা হতে পারে।'), source: GB_IHS };
const LIVE_LONDON: GuideCost = { id: 'funds-london', label: b('Living costs to show — London', 'দেখাতে হবে থাকার খরচ — London'), value: b('£1,529 per month, for up to 9 months', 'মাসে £1,529, সর্বোচ্চ ৯ মাস'), amount: { value: 1529, currency: 'GBP', period: 'month' }, source: GB_VISA_MONEY };
const LIVE_OUTSIDE: GuideCost = { id: 'funds-outside', label: b('Living costs to show — outside London', 'দেখাতে হবে থাকার খরচ — London-এর বাইরে'), value: b('£1,171 per month, for up to 9 months', 'মাসে £1,171, সর্বোচ্চ ৯ মাস'), amount: { value: 1171, currency: 'GBP', period: 'month' }, source: GB_VISA_MONEY };
const UCAS_FEE: GuideCost = { id: 'ucas-fee', label: b('UCAS application fee (2027 entry)', 'UCAS আবেদন fee (২০২৭ entry)'), value: b('£34.50 for up to five choices', 'সর্বোচ্চ পাঁচটি choice-এর জন্য £34.50'), amount: { value: 34.5, currency: 'GBP', period: 'one-time' }, source: GB_UCAS_FORM };
const UNVERIFIED: GuideCost[] = [
  { id: 'tuition', label: b('Tuition', 'Tuition'), value: b('Not verified — set by each university and course; shown on your CAS', 'যাচাই হয়নি — প্রতিটি university আর course ঠিক করে; CAS-এ লেখা থাকে'), status: 'not-verified', source: GB_VISA_MONEY },
  { id: 'rent-food', label: b('Accommodation, food and transport', 'বাসা, খাবার আর যাতায়াত'), value: b('Not verified — varies by city; London is higher', 'যাচাই হয়নি — শহর অনুযায়ী আলাদা; London-এ বেশি'), status: 'not-verified', source: GB_VISA_MONEY },
  { id: 'tb-fee', label: b('TB test and set-up costs', 'TB test আর শুরুর খরচ'), value: b('Not verified', 'যাচাই হয়নি'), status: 'not-verified', source: GB_TB_BD },
];

// ------------------------------------------------------------------ common sections

const commonTail = (level: 'bachelors' | 'masters' | 'phd') => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [...(level === 'phd' ? [] : [tuition('tuition')]), living('living'), ihs('ihs'), { embed: 'costs' as const }, funds('funds')] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa('types', b('Which universities are there?', 'কোন কোন university আছে?'), [b('The examples below are UK institutions listed alphabetically, not ordered by quality. Entry rules, fees and scholarships differ at each, so check the official page.', 'নিচের উদাহরণগুলো UK-র প্রতিষ্ঠান, বর্ণানুক্রমে সাজানো, মান অনুযায়ী নয়। ভর্তির নিয়ম, fee আর scholarship প্রতিটিতে আলাদা, তাই official page দেখুন।')], [GB_VISA_COURSE]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work')] },
  { id: 'visa', title: b('Student visa', 'Student visa'), items: [visa('visa'), tb('tb'), dependants('dependants')] },
  { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Usually 3 years (4 in Scotland) · often after a foundation year', 'সাধারণত ৩ বছর (Scotland-এ ৪) · প্রায়ই foundation year-এর পরে'),
  intro: b(
    "Most UK bachelor's courses are applied for through UCAS. With the Bangladesh HSC, universities usually ask you to complete a foundation programme first (the University of Edinburgh and the University of Manchester both say so); A-levels or the IB can allow direct entry. Then you need a CAS and a Student visa.",
    "UK-র বেশিরভাগ bachelor's course-এ UCAS-এর মাধ্যমে আবেদন করতে হয়। Bangladesh-এর HSC দিয়ে university সাধারণত আগে একটি foundation programme শেষ করতে বলে (University of Edinburgh আর University of Manchester — দুটোই তাই বলে); A-level বা IB থাকলে সরাসরি ভর্তি হওয়া যেতে পারে। তারপর CAS আর Student visa।",
  ),
  costs: { official: [UCAS_FEE, VISA_FEE, IHS_COST, LIVE_LONDON, LIVE_OUTSIDE], estimates: UNVERIFIED },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: can you go after HSC?', 'সবচেয়ে বেশি জিজ্ঞাসা: HSC-র পরে যাওয়া যায়?'),
      items: [
        qa(
          'hsc',
          b("Can you do a Bachelor's in the UK straight after HSC?", "HSC শেষ করে কি সরাসরি UK-তে Bachelor's করা যায়?"),
          [
            b(
              'Usually not directly. The University of Edinburgh says HSC applicants are usually required to complete a foundation year and does not accept the HSC for direct entry. The University of Manchester says HSC applicants must complete a university-recognised foundation programme before joining an undergraduate course.',
              'সাধারণত সরাসরি নয়। University of Edinburgh বলে, HSC আবেদনকারীদের সাধারণত foundation year শেষ করতে হয়, আর সরাসরি ভর্তিতে HSC নেয় না। University of Manchester বলে, undergraduate course-এ যোগ দেওয়ার আগে HSC আবেদনকারীদের university-স্বীকৃত foundation programme শেষ করতে হবে।',
            ),
            b(
              'Examples of routes at Manchester: an integrated foundation year in science, engineering and biosciences (HSC with at least 80% overall and 80% in Mathematics and Physics), or INTO Manchester foundation programmes (HSC with at least 65%). A-levels or the IB can allow direct entry to year one.',
              'Manchester-এর উদাহরণ: science, engineering আর biosciences-এ integrated foundation year (HSC-তে মোট অন্তত ৮০% আর Mathematics ও Physics-এ ৮০%), অথবা INTO Manchester-এর foundation programme (HSC-তে অন্তত ৬৫%)। A-level বা IB থাকলে সরাসরি প্রথম বর্ষে ভর্তি হওয়া যেতে পারে।',
            ),
            CHECK_UNI,
          ],
          [GB_EDINBURGH_BD, GB_MANCHESTER_BD],
        ),
        qa(
          'requirements',
          b("What do you need for a UK Bachelor's?", "UK-তে Bachelor's পড়তে কী কী লাগে?"),
          [b('Accepted qualifications (for HSC holders, usually a completed foundation programme), grades and subjects the course asks for, English at the level the course sets (at least B2 for the visa), a UCAS application with a personal statement and a reference, then a CAS, money to show and a Student visa.', 'গ্রহণযোগ্য qualification (HSC থাকলে সাধারণত শেষ করা foundation programme), course যে grade আর বিষয় চায়, course-এর ঠিক করা level-এর ইংরেজি (visa-র জন্য অন্তত B2), personal statement আর reference-সহ UCAS আবেদন, তারপর CAS, দেখানোর মতো টাকা আর Student visa।')],
          [GB_MANCHESTER_BD, GB_UCAS_FORM, GB_VISA],
        ),
      ],
    },
    {
      id: 'apply',
      title: b('UCAS and deadlines', 'UCAS আর শেষ তারিখ'),
      items: [
        qa(
          'ucas',
          b('How does UCAS work?', 'UCAS কীভাবে কাজ করে?'),
          [
            b(
              'You apply once through UCAS to up to five choices, with a personal statement and a reference; the 2027 application fee is £34.50. For 2027 entry, applications opened on 12 May 2026 and can be sent from 1 September 2026.',
              'UCAS-এ একবারে সর্বোচ্চ পাঁচটি choice-এ আবেদন করবেন, personal statement আর reference-সহ; ২০২৭-এর আবেদন fee £34.50। ২০২৭ entry-র আবেদন ১২ May ২০২৬ থেকে শুরু, আর ১ September ২০২৬ থেকে পাঠানো যায়।',
            ),
            b(
              'Key dates for 2027 entry: 15 October 2026 (18:00 UK time) for Oxford, Cambridge and most medicine, dentistry and veterinary courses; 13 January 2027 (18:00) — the equal consideration date for most courses; 30 June 2027 — after this, applications go into Clearing.',
              '২০২৭ entry-র মূল তারিখ: ১৫ October ২০২৬ (UK সময় ১৮:০০) — Oxford, Cambridge আর বেশিরভাগ medicine, dentistry ও veterinary course; ১৩ January ২০২৭ (১৮:০০) — বেশিরভাগ course-এর equal consideration তারিখ; ৩০ June ২০২৭ — এর পরে আবেদন Clearing-এ যায়।',
            ),
          ],
          [GB_UCAS_DATES, GB_UCAS_FORM],
        ),
        qa(
          'process',
          b('What is the full process, step by step?', 'পুরো প্রক্রিয়া ধাপে ধাপে কেমন?'),
          [b('1) Check each university’s Bangladesh entry page and plan a foundation route if needed. 2) Take an English test the course accepts. 3) Apply on UCAS. 4) Accept an offer and meet its conditions. 5) Get your CAS. 6) Keep the required money for 28 days, get a TB test, and apply for the Student visa (at most 6 months before the course). 7) Give biometrics at VFS Dhaka and get your eVisa.', '১) প্রতিটি university-র Bangladesh entry page দেখে দরকার হলে foundation route ঠিক করুন। ২) Course যে English test নেয়, তা দিন। ৩) UCAS-এ আবেদন। ৪) Offer গ্রহণ করে শর্ত পূরণ। ৫) CAS নিন। ৬) দরকারি টাকা ২৮ দিন রাখুন, TB test করান, Student visa-র আবেদন করুন (course শুরুর সর্বোচ্চ ৬ মাস আগে)। ৭) VFS ঢাকা-য় biometrics দিয়ে eVisa নিন।')],
          [GB_MANCHESTER_BD, GB_UCAS_DATES, GB_VISA, GB_VISA_MONEY, GB_TB_BD],
          { kind: 'guidance' },
        ),
      ],
    },
    { id: 'language', title: b('English and IELTS', 'ইংরেজি আর IELTS'), items: [english('english')] },
    {
      id: 'scholarships',
      title: b('Scholarships', 'Scholarship'),
      items: [
        qa(
          'scholarships',
          b("Are there scholarships for a Bachelor's?", "Bachelor's-এর জন্য scholarship আছে কি?"),
          [b("The major UK government scholarships covered here (Chevening, Commonwealth, GREAT) are for postgraduate study. Undergraduate scholarships are university-specific and are not verified here — check each university's scholarship page for Bangladeshi students.", "এখানে যে বড় UK সরকারি scholarship-গুলো আছে (Chevening, Commonwealth, GREAT), সেগুলো postgraduate পড়ার জন্য। Undergraduate scholarship প্রতিটি university-র নিজস্ব, এখানে যাচাই হয়নি — Bangladesh-এর student-দের জন্য প্রতিটি university-র scholarship page দেখুন।")],
          [GB_CHEVENING_ELIG, GB_CSC_MASTERS, GB_GREAT_BD],
          { status: 'partly-verified' },
        ),
        { embed: 'scholarships' },
      ],
    },
    ...commonTail('bachelors'),
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b('Often 1 year (taught) · after a bachelor’s', 'প্রায়ই ১ বছর (taught) · bachelor’s-এর পরে'),
  intro: b(
    "UK taught master's degrees are applied for directly to each university. Chevening, Commonwealth Master's and GREAT Scholarships all fund one-year taught master's courses, and Bangladesh is eligible for each. After the course you can apply for the Graduate visa.",
    "UK-র taught master's-এ প্রতিটি university-তে সরাসরি আবেদন করতে হয়। Chevening, Commonwealth Master's আর GREAT Scholarship — তিনটিই এক বছরের taught master's-এর জন্য, আর Bangladesh তিনটিতেই যোগ্য। Course শেষে Graduate visa-র আবেদন করা যায়।",
  ),
  costs: { official: [VISA_FEE, IHS_COST, LIVE_LONDON, LIVE_OUTSIDE], estimates: UNVERIFIED },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a UK Master's?", "UK-তে Master's-এ কী লাগে?"),
          [
            b(
              "A bachelor's degree the university accepts, in a subject relevant to the course (prerequisites are on the course page), English at the course's level, and the documents the course asks for (usually transcripts, a personal statement and references; some courses ask for a CV, portfolio or work experience).",
              "University যে bachelor's degree মানে, course-এর সঙ্গে সম্পর্কিত বিষয়ে (পূর্বশর্ত course page-এ থাকে), course-এর ঠিক করা level-এর ইংরেজি, আর course যে document চায় (সাধারণত transcript, personal statement আর reference; কিছু course CV, portfolio বা কাজের অভিজ্ঞতা চায়)।",
            ),
            CHECK_UNI,
          ],
          [GB_MANCHESTER_BD],
        ),
        qa(
          'cgpa',
          b('What CGPA is needed?', 'কত CGPA লাগে?'),
          [
            b(
              "It varies by university. Example: the University of Manchester considers students with at least a four-year bachelor's from a reputable Bangladeshi university, typically with a minimum GPA of 3.2/4 — this can vary by the university of prior study and the grading scale, and some departments ask for more.",
              "University অনুযায়ী আলাদা। উদাহরণ: University of Manchester Bangladesh-এর স্বীকৃত university থেকে অন্তত চার বছরের bachelor's থাকা student-দের বিবেচনা করে, সাধারণত minimum GPA 3.2/4 — আগের university আর grading scale অনুযায়ী বদলাতে পারে, আর কিছু department বেশি চায়।",
            ),
            CHECK_UNI,
          ],
          [GB_MANCHESTER_BD],
        ),
      ],
    },
    { id: 'language', title: b('English and IELTS', 'ইংরেজি আর IELTS'), items: [english('english')] },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b('How do you apply for a Master’s?', 'Master’s-এ কীভাবে আবেদন করবেন?'),
          [b('Apply directly to each university through its postgraduate portal by its deadline (set by the university). If you also apply for a scholarship, apply to the university early — Chevening needs an unconditional offer from one of your three course choices by its own deadline, and the Commonwealth Commission asks you to have applied for admission before its selection.', 'প্রতিটি university-র postgraduate portal-এ তার শেষ তারিখের মধ্যে সরাসরি আবেদন করুন (তারিখ university ঠিক করে)। Scholarship-এর জন্যও আবেদন করলে university-তে আগে আবেদন করুন — Chevening-এর নিজের শেষ তারিখের মধ্যে তিনটি course choice-এর একটি থেকে unconditional offer লাগে, আর Commonwealth Commission চায় বাছাইয়ের আগেই ভর্তির আবেদন করা থাকুক।')],
          [GB_MANCHESTER_BD, GB_CHEVENING_ELIG, GB_CSC_MASTERS],
        ),
      ],
    },
    {
      id: 'scholarships',
      title: b('Scholarships', 'Scholarship'),
      items: [
        qa(
          'chevening',
          b('What is Chevening?', 'Chevening কী?'),
          [
            b(
              "The UK Government's scholarship for a one-year master's at any UK university. It covers tuition, economy travel, arrival and departure allowances, the visa application cost, a contribution to TB testing and a monthly living allowance.",
              'যেকোনো UK university-তে এক বছরের master\'s-এর জন্য UK সরকারের scholarship। এতে tuition, economy বিমানভাড়া, আসা-যাওয়ার ভাতা, visa আবেদনের খরচ, TB test-এর খরচে অংশ আর মাসিক থাকার ভাতা থাকে।',
            ),
            b(
              "You need at least two years' work experience (2,800 hours) after your undergraduate degree, must apply to three different eligible UK courses and hold an unconditional offer from one by Chevening's deadline, and must return home for at least two years afterwards.",
              'Undergraduate degree-র পরে অন্তত দুই বছরের কাজের অভিজ্ঞতা (২,৮০০ ঘণ্টা) লাগবে, তিনটি আলাদা যোগ্য UK course-এ আবেদন করে Chevening-এর শেষ তারিখের মধ্যে একটি থেকে unconditional offer থাকতে হবে, আর পরে অন্তত দুই বছর দেশে ফিরে থাকতে হবে।',
            ),
          ],
          [GB_CHEVENING_ELIG, GB_CHEVENING_COVER],
        ),
        qa(
          'commonwealth',
          b("What is the Commonwealth Master's Scholarship?", "Commonwealth Master's Scholarship কী?"),
          [
            b(
              "A UK government scholarship for citizens of eligible Commonwealth countries — Bangladesh is on the list. It covers approved tuition, return airfare and a stipend of £1,712 a month (£2,000 in London). You need a 2:1 first degree (or a 2:2 plus a relevant postgraduate qualification) and must be unable to afford UK study otherwise. You apply through a nominator (the national nominating agency) and on CSC Central — for 2027/28 by 20 October. Scholars must return home; switching to a Graduate visa is not allowed.",
              "যোগ্য Commonwealth দেশের নাগরিকদের জন্য UK সরকারের scholarship — Bangladesh তালিকায় আছে। এতে অনুমোদিত tuition, আসা-যাওয়ার বিমানভাড়া আর মাসে £1,712 (London-এ £2,000) ভাতা থাকে। প্রথম degree-তে 2:1 (বা 2:2-এর সঙ্গে প্রাসঙ্গিক postgraduate qualification) লাগবে, আর এই scholarship ছাড়া UK-তে পড়ার সামর্থ্য না থাকতে হবে। আবেদন একটি nominator (জাতীয় nominating agency)-এর মাধ্যমে আর CSC Central-এ — ২০২৭/২৮-এর জন্য ২০ October-এর মধ্যে। Scholar-দের দেশে ফিরতে হয়; Graduate visa-তে যাওয়া যায় না।",
            ),
          ],
          [GB_CSC_MASTERS],
        ),
        qa(
          'great',
          b('What are GREAT Scholarships?', 'GREAT Scholarship কী?'),
          [b('£10,000 towards tuition for a one-year taught postgraduate course, for Bangladeshi passport holders at participating UK universities (the list changes each year; for 2026-27 it includes the University of Manchester and others). Each university runs its own application and deadline.', 'অংশগ্রহণকারী UK university-তে এক বছরের taught postgraduate course-এর tuition-এ £10,000, Bangladesh-এর passport-ধারীদের জন্য (তালিকা প্রতি বছর বদলায়; ২০২৬-২৭-এ University of Manchester-সহ কয়েকটি আছে)। প্রতিটি university নিজের আবেদন আর শেষ তারিখ ঠিক করে।')],
          [GB_GREAT_BD],
        ),
        { embed: 'scholarships' },
      ],
    },
    ...commonTail('masters'),
  ],
};

// ------------------------------------------------------------------ PhD

const PHD: DegreeGuide = {
  level: 'phd',
  card: b('Research degree · after a master’s or strong bachelor’s', 'গবেষণা degree · master’s বা ভালো bachelor’s-এর পরে'),
  intro: b(
    'A UK PhD is individually supervised research. You usually contact a potential supervisor first and apply with a research proposal. Funding is either a funded studentship or scholarship, or self-funded; after a PhD the Graduate visa lasts 3 years.',
    'UK-র PhD হলো একজন supervisor-এর অধীনে গবেষণা। সাধারণত আগে সম্ভাব্য supervisor-এর সঙ্গে যোগাযোগ করে research proposal-সহ আবেদন করতে হয়। খরচ চলে funded studentship বা scholarship দিয়ে, নয়তো নিজের টাকায়; PhD-র পরে Graduate visa ৩ বছরের।',
  ),
  costs: { official: [VISA_FEE, IHS_COST, LIVE_LONDON, LIVE_OUTSIDE], estimates: UNVERIFIED },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'master',
          b('What do you need for a UK PhD?', 'UK-তে PhD-তে কী লাগে?'),
          [
            b(
              'Example: the University of Manchester considers students from Bangladesh for PhDs case by case. PhDs are individually supervised, so it strongly recommends contacting a potential supervisor or the academic school before applying, and a research proposal is required with the formal application.',
              'উদাহরণ: University of Manchester Bangladesh-এর student-দের PhD-র জন্য আলাদা আলাদা করে বিবেচনা করে। PhD-তে আলাদা supervisor থাকেন, তাই আবেদনের আগে সম্ভাব্য supervisor বা academic school-এর সঙ্গে যোগাযোগ করার জোর পরামর্শ দেয়, আর আনুষ্ঠানিক আবেদনের সঙ্গে research proposal লাগে।',
            ),
            b('Academic background, research experience and English score are set by each university and programme.', 'Academic background, গবেষণার অভিজ্ঞতা আর English score প্রতিটি university ও programme ঠিক করে।'),
            CHECK_UNI,
          ],
          [GB_MANCHESTER_BD],
          { status: 'partly-verified' },
        ),
        qa(
          'interview',
          b('Is there an interview?', 'Interview হয় কি?'),
          [b('Not verified yet as a general rule: many programmes interview shortlisted applicants, but each university decides. Check the programme page.', 'এখনো সাধারণ নিয়ম হিসেবে যাচাই হয়নি: অনেক programme বাছাই করা আবেদনকারীদের interview নেয়, তবে প্রতিটি university নিজে ঠিক করে। Programme page দেখুন।')],
          [GB_MANCHESTER_BD],
          { status: 'not-verified' },
        ),
      ],
    },
    { id: 'language', title: b('English and IELTS', 'ইংরেজি আর IELTS'), items: [english('english')] },
    {
      id: 'funding',
      title: b('Funded or self-funded', 'Funded নাকি নিজের খরচে'),
      items: [
        qa(
          'funded',
          b('What is the difference between funded and self-funded PhDs?', 'Funded আর self-funded PhD-র পার্থক্য কী?'),
          [
            b(
              'Funded: a studentship or scholarship pays tuition and a stipend. For UK Research and Innovation (UKRI) studentships the minimum stipend is £21,805 a year from 1 October 2026, and the minimum fee is £5,238 for 2026-27 — but eligibility for international students depends on each studentship.',
              'Funded: studentship বা scholarship tuition আর ভাতা দেয়। UK Research and Innovation (UKRI)-র studentship-এ ১ October ২০২৬ থেকে minimum ভাতা বছরে £21,805, আর ২০২৬-২৭-এর minimum fee £5,238 — তবে international student যোগ্য কিনা, তা প্রতিটি studentship-এর উপর নির্ভর করে।',
            ),
            b(
              'Self-funded: you pay the international tuition fee and must show the first year’s fee (on your CAS) plus living costs for the visa. International PhD fees are set by each university and are not verified here.',
              'Self-funded: international tuition fee নিজে দিতে হয়, আর visa-র জন্য প্রথম বছরের fee (CAS-এ থাকে) ও থাকার খরচ দেখাতে হয়। International PhD fee প্রতিটি university ঠিক করে, এখানে যাচাই হয়নি।',
            ),
          ],
          [GB_UKRI, GB_VISA_MONEY],
          { status: 'partly-verified' },
        ),
        qa(
          'commonwealth',
          b('Is there a Commonwealth PhD Scholarship?', 'Commonwealth PhD Scholarship আছে কি?'),
          [b('Yes, for citizens of least developed Commonwealth countries and fragile states, through nominating agencies; it covers tuition, airfare and a living stipend, and the 2027/28 round closes on 20 October 2026. Whether Bangladesh is on the current eligible list is not verified here — check the Commission’s page.', 'হ্যাঁ, স্বল্পোন্নত Commonwealth দেশ আর ভঙ্গুর রাষ্ট্রের নাগরিকদের জন্য, nominating agency-র মাধ্যমে; এতে tuition, বিমানভাড়া আর থাকার ভাতা থাকে, আর ২০২৭/২৮-এর আবেদন ২০ October ২০২৬-এ শেষ। Bangladesh বর্তমান যোগ্য তালিকায় আছে কিনা, এখানে যাচাই হয়নি — Commission-এর page দেখুন।')],
          [GB_CSC_PHD],
          { status: 'partly-verified' },
        ),
        { embed: 'scholarships' },
      ],
    },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b('How do you apply for a PhD?', 'PhD-তে কীভাবে আবেদন করবেন?'),
          [b('Find a supervisor or advertised project, contact them, prepare a research proposal, apply through the university’s research admissions, apply for funding by its own deadline, then get your CAS (and an ATAS certificate if your subject needs one) and apply for the Student visa.', 'Supervisor বা বিজ্ঞাপিত project খুঁজে যোগাযোগ করুন, research proposal তৈরি করুন, university-র research admissions-এ আবেদন করুন, funding-এর জন্য তার নিজের শেষ তারিখের মধ্যে আবেদন করুন, তারপর CAS (আর বিষয়ে লাগলে ATAS সনদ) নিয়ে Student visa-র আবেদন।')],
          [GB_MANCHESTER_BD, GB_VISA_COURSE],
          { kind: 'guidance' },
        ),
      ],
    },
    ...commonTail('phd'),
  ],
};

// ------------------------------------------------------------------ the country

export const GB_GUIDE: CountryGuide = {
  code: 'GB',
  checkedAt: GB_READ,
  sourcesPerSection: true,
  intro: b(
    "The UK offers bachelor's, often one-year taught master's, and research PhDs, taught in English. You apply through UCAS (bachelor's) or directly (postgraduate), get a CAS from the university and apply for a Student visa; after graduating, the Graduate visa lets you stay and work. This guide is built from GOV.UK, UCAS, the scholarship bodies and university pages.",
    "UK-তে ইংরেজিতে bachelor's, প্রায়ই এক বছরের taught master's আর গবেষণাভিত্তিক PhD পড়া যায়। আবেদন UCAS-এ (bachelor's) বা সরাসরি (postgraduate), university থেকে CAS নিয়ে Student visa; পড়া শেষে Graduate visa দিয়ে থেকে কাজ করা যায়। এই guide GOV.UK, UCAS, scholarship প্রতিষ্ঠান আর university-র page থেকে তৈরি।",
  ),
  overview: [
    qa(
      'system',
      b('How does UK higher education work for international students?', 'International student-দের জন্য UK-র উচ্চশিক্ষা কেমন?'),
      [
        b(
          "Degree-level courses are RQF level 6 (bachelor's), 7 (master's) and 8 (doctorate); Scotland uses different level numbers. To study on a Student visa you need an offer from a licensed student sponsor. Bachelor's applications mostly go through UCAS; master's and PhD applications go directly to the university.",
          "Degree-level course হলো RQF level 6 (bachelor's), 7 (master's) আর 8 (doctorate); Scotland-এ level-এর নম্বর আলাদা। Student visa-তে পড়তে licensed student sponsor-এর offer লাগে। Bachelor's-এর আবেদন বেশিরভাগ UCAS-এ; master's আর PhD-র আবেদন সরাসরি university-তে।",
        ),
      ],
      [GB_VISA_COURSE, GB_UCAS_DATES],
    ),
    qa(
      'intakes',
      b('When do courses start, and when do you apply?', 'Course কখন শুরু হয়, আবেদন কখন?'),
      [b('Most courses start in September/October. For 2027 undergraduate entry, UCAS’s main equal consideration date is 13 January 2027 (15 October 2026 for Oxford, Cambridge and most medicine). Postgraduate deadlines are set by each university; scholarships close much earlier (Commonwealth 2027/28: 20 October). The visa can be applied for at most 6 months before the course starts.', 'বেশিরভাগ course September/October-এ শুরু হয়। ২০২৭ undergraduate entry-র জন্য UCAS-এর মূল equal consideration তারিখ ১৩ January ২০২৭ (Oxford, Cambridge আর বেশিরভাগ medicine-এর জন্য ১৫ October ২০২৬)। Postgraduate-এর শেষ তারিখ প্রতিটি university ঠিক করে; scholarship অনেক আগে বন্ধ হয় (Commonwealth ২০২৭/২৮: ২০ October)। Visa-র আবেদন course শুরুর সর্বোচ্চ ৬ মাস আগে করা যায়।')],
      [GB_UCAS_DATES, GB_CSC_MASTERS, GB_VISA],
    ),
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [GB_VISA_MONEY, GB_VISA_COURSE, GB_EDINBURGH_BD, GB_MANCHESTER_BD, GB_TB_BD, GB_CSC_MASTERS],
      {
        kind: 'guidance',
        list: [
          b('Moving money into the account too late — funds must be held for 28 days in a row, ending within 31 days of applying.', 'দেরিতে account-এ টাকা রাখা — টাকা একটানা ২৮ দিন থাকতে হবে, যার শেষ দিন আবেদনের ৩১ দিনের মধ্যে।'),
          b('Assuming HSC gives direct entry — many universities require a foundation programme first.', 'HSC দিয়ে সরাসরি ভর্তি ধরে নেওয়া — অনেক university আগে foundation programme চায়।'),
          b('Relying on "medium of instruction" letters — some universities do not accept them as English proof.', '"Medium of instruction" চিঠির উপর নির্ভর করা — কিছু university এটাকে ইংরেজির প্রমাণ হিসেবে নেয় না।'),
          b('Forgetting the TB test or using a clinic that is not Home Office-approved.', 'TB test ভুলে যাওয়া, বা Home Office-অনুমোদিত নয় এমন clinic ব্যবহার।'),
          b('Applying for the visa more than 6 months after getting the CAS.', 'CAS পাওয়ার ৬ মাসের বেশি পরে visa-র আবেদন।'),
          b('Missing scholarship deadlines, which close long before course deadlines.', 'Scholarship-এর শেষ তারিখ মিস করা, যা course-এর তারিখের অনেক আগে শেষ হয়।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('hsc', b("Can you do a Bachelor's in the UK after HSC?", "HSC শেষ করে কি UK-তে Bachelor's করা যায়?"), [b('Usually after a foundation programme: the University of Edinburgh and the University of Manchester both say HSC applicants need a foundation year or programme before an undergraduate course. A-levels or the IB can allow direct entry. Each university sets its own rules.', 'সাধারণত একটি foundation programme-এর পরে: University of Edinburgh আর University of Manchester — দুটোই বলে, undergraduate course-এর আগে HSC আবেদনকারীদের foundation year বা programme লাগে। A-level বা IB থাকলে সরাসরি ভর্তি হওয়া যেতে পারে। প্রতিটি university নিজের নিয়ম ঠিক করে।')], [GB_EDINBURGH_BD, GB_MANCHESTER_BD]),
    qa('masters-cost', b("How much does a Master's in the UK cost?", "UK-তে Master's করতে কত টাকা লাগে?"), [b('Tuition is set by each university and course (not verified as one figure). Official costs: visa fee £558, IHS £776 per visa year, and for the visa you must show your first-year fee plus £1,529 a month (London) or £1,171 a month (outside London) for up to 9 months.', 'Tuition প্রতিটি university আর course ঠিক করে (একক অঙ্ক হিসেবে যাচাই হয়নি)। Official খরচ: visa fee £558, IHS visa-র প্রতি বছরে £776, আর visa-র জন্য প্রথম বছরের fee সঙ্গে মাসে £1,529 (London) বা £1,171 (London-এর বাইরে), সর্বোচ্চ ৯ মাস দেখাতে হবে।')], [GB_VISA, GB_IHS, GB_VISA_MONEY], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for the UK?', 'UK-তে IELTS কত লাগে?'), [b('The visa needs English equivalent to CEFR B2 for degree-level study; the exact IELTS or other test score is set by each course. Bangladesh is not exempt from proving English.', 'Degree-level পড়াশোনায় visa-র জন্য CEFR B2-এর সমমানের ইংরেজি লাগে; ঠিক কত IELTS বা অন্য test score, তা প্রতিটি course ঠিক করে। Bangladesh ইংরেজির প্রমাণ দেওয়া থেকে ছাড় পায় না।')], [GB_VISA_ENGLISH]),
    qa('funds', b('How much money do you need to show for a UK Student visa?', 'UK Student visa-র জন্য কত টাকা দেখাতে হয়?'), [b('Your first year’s course fee (as on your CAS) plus £1,529 a month in London or £1,171 a month outside London, for up to 9 months — held for 28 days in a row, ending within 31 days of applying.', 'প্রথম বছরের course fee (CAS অনুযায়ী) সঙ্গে London-এ মাসে £1,529 বা বাইরে মাসে £1,171, সর্বোচ্চ ৯ মাস — একটানা ২৮ দিন রাখা, যার শেষ দিন আবেদনের ৩১ দিনের মধ্যে।')], [GB_VISA_MONEY]),
    qa('work', b('Can you work while studying in the UK?', 'UK-তে পড়ার পাশাপাশি কাজ করা যায়?'), [b('Degree-level students at a higher education provider with a good compliance record can work up to 20 hours a week in term time and full-time outside term time. No self-employment.', 'ভালো নিয়ম-পালনের রেকর্ড থাকা higher education provider-এর degree-level student term-এ সপ্তাহে ২০ ঘণ্টা পর্যন্ত আর term-এর বাইরে full-time কাজ করতে পারেন। Self-employment নয়।')], [GB_APPENDIX_STUDENT]),
    qa('scholarships', b('Can you get a scholarship for the UK?', 'UK-তে scholarship পাওয়া যায়?'), [b("Yes, mainly for postgraduate study: Chevening (one-year master's), Commonwealth Master's Scholarships (Bangladesh eligible), GREAT Scholarships (£10,000 towards tuition, for Bangladesh) and PhD studentships. Undergraduate scholarships are university-specific.", "হ্যাঁ, মূলত postgraduate-এর জন্য: Chevening (এক বছরের master's), Commonwealth Master's Scholarship (Bangladesh যোগ্য), GREAT Scholarship (Bangladesh-এর জন্য tuition-এ £10,000) আর PhD studentship। Undergraduate scholarship প্রতিটি university-র নিজস্ব।")], [GB_CHEVENING_ELIG, GB_CSC_MASTERS, GB_GREAT_BD, GB_UKRI]),
    qa('chevening', b('What is Chevening?', 'Chevening কী?'), [b("The UK Government's scholarship for a one-year master's. It covers tuition, travel, visa costs and a living allowance; you need two years' work experience after your degree and must return home for two years afterwards.", 'এক বছরের master\'s-এর জন্য UK সরকারের scholarship। এতে tuition, ভ্রমণ, visa-র খরচ আর থাকার ভাতা থাকে; degree-র পরে দুই বছরের কাজের অভিজ্ঞতা লাগে, আর পরে দুই বছর দেশে ফিরে থাকতে হয়।')], [GB_CHEVENING_ELIG, GB_CHEVENING_COVER]),
    qa('after', b('Can you stay in the UK after your studies?', 'UK-তে পড়া শেষ করার পর থাকা যায় কি?'), [b('Yes, on the Graduate visa: 2 years if you apply by 31 December 2026, 18 months from 1 January 2027, and 3 years after a PhD. The fee is £937 plus the healthcare surcharge. (Commonwealth scholars cannot switch to it.)', 'হ্যাঁ, Graduate visa-তে: ৩১ December ২০২৬-এর মধ্যে আবেদন করলে ২ বছর, ১ January ২০২৭ থেকে ১৮ মাস, আর PhD-র পরে ৩ বছর। Fee £937, সঙ্গে healthcare surcharge। (Commonwealth scholar-রা এতে যেতে পারেন না।)')], [GB_GRADUATE, GB_CSC_MASTERS]),
    qa('visa', b('How do you get the UK Student visa?', 'UK Student visa কীভাবে পাবেন?'), [b('Unconditional offer → CAS → funds held 28 days, TB test → online application (at most 6 months before the course, fee £558 + IHS) → biometrics at VFS Global Dhaka → decision usually in about 3 weeks → eVisa.', 'Unconditional offer → CAS → ২৮ দিন টাকা রাখা, TB test → online আবেদন (course-এর সর্বোচ্চ ৬ মাস আগে, fee £558 + IHS) → VFS Global ঢাকা-য় biometrics → সাধারণত প্রায় ৩ সপ্তাহে সিদ্ধান্ত → eVisa।')], [GB_VISA, GB_VISA_COURSE, GB_TB_BD, GB_VFS_BD]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('University: certificates and transcripts, English test, personal statement, reference(s), and for some courses a CV, portfolio or research proposal. Visa: passport, CAS, financial evidence, TB test, ATAS if required, parental consent if under 18. Scholarship documents are separate. Each degree guide explains every document once.', 'University: সনদ আর transcript, English test, personal statement, reference, আর কিছু course-এ CV, portfolio বা research proposal। Visa: passport, CAS, আর্থিক প্রমাণ, TB test, দরকার হলে ATAS, ১৮-র কম হলে বাবা-মায়ের সম্মতি। Scholarship-এর document আলাদা। প্রতিটি degree guide-এ প্রতিটি document একবার ব্যাখ্যা করা আছে।')], [GB_VISA_DOCS, GB_UCAS_FORM, GB_CSC_MASTERS]),
    qa('bachelors', b("What do you need for a Bachelor's?", "Bachelor's-এ কী লাগে?"), [b('Accepted qualifications (HSC holders: usually a foundation programme), English, a UCAS application with personal statement and reference, then CAS and visa.', 'গ্রহণযোগ্য qualification (HSC থাকলে সাধারণত foundation programme), ইংরেজি, personal statement আর reference-সহ UCAS আবেদন, তারপর CAS আর visa।')], [GB_MANCHESTER_BD, GB_UCAS_FORM]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A relevant bachelor's the university accepts (Manchester example: typically GPA 3.2/4 from a four-year degree), English, and the course's documents; apply directly to the university.", "University যে প্রাসঙ্গিক bachelor's মানে (Manchester-এর উদাহরণ: চার বছরের degree-তে সাধারণত GPA 3.2/4), ইংরেজি আর course-এর document; সরাসরি university-তে আবেদন।")], [GB_MANCHESTER_BD]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('A supervisor’s interest, a research proposal and funding (a studentship or scholarship, or self-funding); requirements are set by each university.', 'Supervisor-এর আগ্রহ, research proposal আর funding (studentship, scholarship, নয়তো নিজের খরচ); শর্ত প্রতিটি university ঠিক করে।')], [GB_MANCHESTER_BD, GB_UKRI]),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b("Examples on each degree page — Imperial College London, King's College London, University College London and the universities of Birmingham, Cambridge, Edinburgh, Manchester and Oxford — are listed alphabetically, not ordered by quality.", "প্রতিটি degree page-এ উদাহরণ — Imperial College London, King's College London, University College London, আর Birmingham, Cambridge, Edinburgh, Manchester ও Oxford-এর university — বর্ণানুক্রমে দেওয়া, মান অনুযায়ী সাজানো নয়।")], [GB_VISA_COURSE]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: you need a TB test from an approved clinic; you must show financial evidence and prove English (Bangladesh is on neither exemption list); biometrics are given at the UK Visa Application Centre in Dhaka (VFS Global); Bangladesh is eligible for Commonwealth Master’s and GREAT Scholarships; with HSC, universities such as Edinburgh and Manchester require a foundation programme. Other Bangladesh-specific requirements: not verified yet.', 'Bangladesh-এর জন্য যাচাই করা: approved clinic-এ TB test লাগবে; আর্থিক প্রমাণ আর ইংরেজির প্রমাণ দিতে হবে (Bangladesh কোনো ছাড়ের তালিকায় নেই); biometrics দিতে হয় ঢাকার UK Visa Application Centre-এ (VFS Global); Bangladesh Commonwealth Master\'s আর GREAT Scholarship-এ যোগ্য; HSC থাকলে Edinburgh আর Manchester-এর মতো university foundation programme চায়। অন্যান্য Bangladesh-নির্দিষ্ট শর্ত: এখনো যাচাই হয়নি।'),
    ], [GB_TB_BD, GB_VISA_MONEY, GB_VISA_ENGLISH, GB_VFS_BD, GB_CSC_MASTERS, GB_GREAT_BD, GB_EDINBURGH_BD, GB_MANCHESTER_BD]),
  ],
  life: [
    qa('arrival', b('When can you arrive, and what happens then?', 'কখন পৌঁছাতে পারবেন, তারপর কী?'), [b('For a course longer than 6 months you can arrive up to 1 month before it starts, but not before the start date on your visa. Your status is an eVisa linked to your passport through your UKVI account.', '৬ মাসের বেশি course-এ শুরুর ১ মাস আগে পর্যন্ত পৌঁছানো যায়, তবে visa-র start date-এর আগে নয়। আপনার অবস্থা UKVI account-এর মাধ্যমে passport-এর সঙ্গে যুক্ত একটি eVisa।')], [GB_VISA]),
    qa('health', b('How does healthcare work?', 'চিকিৎসা ব্যবস্থা কেমন?'), [b('You pay the Immigration Health Surcharge with your visa (£776 per year for students). What it gives you access to in detail is not verified here.', 'Visa-র সঙ্গে Immigration Health Surcharge দিতে হয় (student-দের জন্য বছরে £776)। এর বিনিময়ে বিস্তারিত কী সুবিধা পাওয়া যায়, তা এখানে যাচাই হয়নি।')], [GB_IHS], { status: 'partly-verified' }),
  ],
  documents: GB_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'fact', status: 'not-verified' },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 1171, max: 1529, unit: 'GBP/month', text: b('First-year fee plus £1,529 a month (London) or £1,171 (outside London), up to 9 months.', 'প্রথম বছরের fee সঙ্গে মাসে £1,529 (London) বা £1,171 (বাইরে), সর্বোচ্চ ৯ মাস।') }, source: GB_VISA_MONEY },
    { id: 'living-cost', kind: 'estimate', status: 'partly-verified', value: { min: 1171, max: 1529, unit: 'GBP/month', text: b('Only the visa minimum is official; real costs vary by city.', 'শুধু visa-র minimum official; আসল খরচ শহর অনুযায়ী আলাদা।') }, source: GB_VISA_MONEY },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { max: 20, unit: 'hours/week', text: b('Up to 20 hours a week in term time for degree-level students; full-time outside term.', 'Degree-level student-দের term-এ সপ্তাহে ২০ ঘণ্টা পর্যন্ত; term-এর বাইরে full-time।') }, source: GB_APPENDIX_STUDENT },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { min: 18, max: 36, unit: 'months', text: b('Graduate visa: 2 years if applying by 31 Dec 2026, 18 months from 1 Jan 2027; 3 years after a PhD.', 'Graduate visa: ৩১ Dec ২০২৬-এর মধ্যে আবেদনে ২ বছর, ১ Jan ২০২৭ থেকে ১৮ মাস; PhD-র পরে ৩ বছর।') }, source: GB_GRADUATE },
    { id: 'english-programs', kind: 'fact', status: 'verified', value: { unit: 'programs', text: b('Courses are taught in English; B2 English is needed for degree-level study.', 'Course ইংরেজিতে পড়ানো হয়; degree-level-এ B2 ইংরেজি লাগে।') }, source: GB_VISA_ENGLISH },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 558, unit: 'GBP', text: b('£558 from outside the UK, plus the healthcare surcharge (£776 a year for students).', 'UK-র বাইরে থেকে £558, সঙ্গে healthcare surcharge (student-দের বছরে £776)।') }, source: GB_VISA },
  ],
};

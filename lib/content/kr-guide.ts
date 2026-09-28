import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideStatus } from '@/lib/abroad/guides';
import { KR_PROGRAMS } from './kr-programs';
import {
  KR_ACADEMYINFO,
  KR_C1_READ,
  KR_EASYLAW_INSURANCE,
  KR_EASYLAW_REGISTRATION,
  KR_EASYLAW_VISA,
  KR_EASYLAW_WORK,
  KR_EMBASSY_BD_GKS_U_2027,
  KR_EMBASSY_BD_STUDENT_DOCS,
  KR_EMBASSY_BD_TB,
  KR_EMBASSY_BD_UNIVERSITIES,
  KR_EMBASSY_BD_VAC,
  KR_HIKOREA,
  KR_KIS_NAVIGATOR,
  KR_NIIED_GUIDEBOOK,
  KR_SIK_SCHOLARSHIPS,
  KR_SIK_VISA,
  KR_SIK_WORK,
  KR_TOPIK,
} from './kr-sources';

/**
 * South Korea reading guide (overview, most asked questions, and one guide
 * per degree). Every answer restates facts already read from the official
 * sources in kr-sources.ts (C1–C2.x); nothing new is claimed here. Where the
 * sources don't settle something, the answer says it is not verified and who
 * decides (usually the university's own admission guide).
 */

const b = (en: string, bn: string): Bilingual => ({ en, bn });
const G = KR_NIIED_GUIDEBOOK;

function qa(id: string, q: Bilingual, a: Bilingual[], sources: SourceRef[], opts: { list?: Bilingual[]; status?: GuideStatus } = {}): GuideAnswer {
  return { id, q, a, sources, ...(opts.list ? { list: opts.list } : {}), ...(opts.status ? { status: opts.status } : {}) };
}

// Program pages already read in C2.6 (their own official sources).
const program = (id: string) => KR_PROGRAMS.find((p) => p.id === id)!;
const UIC = program('kr-yonsei-uic');
const SOLBRIDGE = program('kr-woosong-solbridge-bba');
const UIC_SOURCE = UIC.tuition!.source;
const UIC_APPLY = UIC.admission!.source;
const SOL_SOURCE = SOLBRIDGE.english!.source;

// ------------------------------------------------------------------ shared answers

const ADMISSION_FIRST = b(
  'Admission comes first and the visa second: you apply for the student visa only once you hold the admission letter.',
  'আগে admission, পরে visa: admission letter হাতে পাওয়ার পরই student visa-র আবেদন করবেন।',
);
const UNI_DECIDES = b(
  "These are general standards. The university's own admission guide for your department has the final word, so read it before you prepare anything.",
  'এগুলো সাধারণ নিয়ম। শেষ কথা বলে আপনার department-এর admission guide, তাই কিছু প্রস্তুত করার আগে সেটা পড়ে নিন।',
);

const englishTaught = (id: string) =>
  qa(
    id,
    b('Can you study in English?', 'English-এ পড়া যায় কি?'),
    [
      b(
        'Yes, in some departments. About 30% of all courses in Korea are taught in English, with a higher share in graduate schools, and some universities have international faculties where every course is in English.',
        'হ্যাঁ, কিছু department-এ। Korea-র মোট course-এর প্রায় ৩০% English-এ পড়ানো হয়, graduate school-এ এই হার আরও বেশি। কিছু university-র international faculty-তে সব course-ই English-এ।',
      ),
      b(
        'If your department teaches in English, TOPIK is not mandatory: you can be admitted with a recognised English test such as TOEFL, and you do not need TOPIK 4 to graduate.',
        'আপনার department English-এ পড়ালে TOPIK বাধ্যতামূলক নয়: TOEFL-এর মতো স্বীকৃত English test দিয়ে ভর্তি হওয়া যায়, আর graduation-এর জন্য TOPIK 4 লাগে না।',
      ),
      b(
        "A university that runs English-taught programs may still teach other programs in Korean. Whether your own department teaches in English is written in its admission guide.",
        'কোনো university-তে English program থাকলেও তার অন্য program Korean-এ পড়ানো হতে পারে। আপনার department কোন ভাষায় পড়ায়, তা তার admission guide-এ লেখা থাকে।',
      ),
    ],
    [G],
  );

const koreanTaught = (id: string) =>
  qa(
    id,
    b('Can you study in Korean?', 'Korean-এ পড়া যায় কি?'),
    [
      b(
        'Yes. Most degree courses are taught in Korean. For a Korean-taught degree, TOPIK level 3 or above is generally required for admission, and level 4 or above for graduation.',
        'হ্যাঁ। বেশিরভাগ degree course Korean-এ পড়ানো হয়। Korean-এ পড়ানো degree-র জন্য সাধারণত ভর্তির সময় TOPIK level 3 বা তার বেশি, আর graduation-এর জন্য level 4 বা তার বেশি লাগে।',
      ),
      b(
        'Universities run Korean language institutes (regular programs of 10–40 weeks) that many students attend before starting a Korean-taught degree.',
        'University-গুলোর নিজস্ব Korean language institute আছে (regular program ১০–৪০ সপ্তাহের)। Korean-এ পড়ানো degree শুরুর আগে অনেকে সেখানে পড়েন।',
      ),
    ],
    [G],
  );

const topik = (id: string) =>
  qa(
    id,
    b('What TOPIK level might you need?', 'TOPIK কোন level লাগতে পারে?'),
    [
      b(
        'TOPIK (Test of Proficiency in Korean) has two parts: TOPIK I covers levels 1–2 (beginner) and TOPIK II covers levels 3–6 (intermediate to advanced). Your level comes from your total score.',
        'TOPIK (Test of Proficiency in Korean)-এর দুটো ভাগ: TOPIK I-এ level ১–২ (beginner), TOPIK II-তে level ৩–৬ (intermediate থেকে advanced)। মোট score থেকে level ঠিক হয়।',
      ),
      b(
        'Korean-taught degree: generally level 3 for admission and level 4 for graduation. English-taught department: TOPIK is not mandatory. Exchange students, GKS scholars, foreign-government scholars and some departments have different rules; ask the university.',
        'Korean-এ পড়ানো degree: সাধারণত ভর্তিতে level ৩, graduation-এ level ৪। English-এ পড়ানো department: TOPIK বাধ্যতামূলক নয়। Exchange student, GKS scholar, বিদেশি সরকারের scholar আর কিছু department-এর নিয়ম আলাদা; university-কে জিজ্ঞেস করুন।',
      ),
      b('Exam dates for the year are announced on the official TOPIK website.', 'বছরের পরীক্ষার তারিখ official TOPIK website-এ ঘোষণা করা হয়।'),
    ],
    [G, KR_TOPIK],
  );

const ielts = (id: string, extra: Bilingual[] = [], sources: SourceRef[] = []) =>
  qa(
    id,
    b('What IELTS score might you need?', 'IELTS কত লাগতে পারে?'),
    [
      b(
        'There is no single national IELTS minimum in Korea; each university sets its own English requirement for its English-taught programs. The official sources we read do not give one number for everyone.',
        'Korea-তে সবার জন্য একটা জাতীয় IELTS minimum নেই; প্রতিটি university তার English program-এর জন্য নিজের English requirement ঠিক করে। আমরা যে official source পড়েছি, তাতে সবার জন্য একটা score দেওয়া নেই।',
      ),
      ...extra,
      b(
        "For the visa, the Korean Embassy in Bangladesh's student page lists an English score certificate (TOEFL / IELTS) from the last 2 years. That page is older than the new Visa Application Center, so confirm it when you apply.",
        'Visa-র জন্য Bangladesh-এর Korean Embassy-র student page-এ গত ২ বছরের English score certificate (TOEFL / IELTS)-এর কথা আছে। Page-টি নতুন Visa Application Center-এর আগের, তাই apply করার সময় নিশ্চিত হয়ে নিন।',
      ),
    ],
    [G, ...sources, KR_EMBASSY_BD_STUDENT_DOCS],
    { status: 'partly-verified' },
  );

const IELTS_BACHELOR_EXAMPLES = [
  b(
    "Two bachelor's programs we checked on their own pages: SolBridge International School of Business (Woosong University) asks for IELTS 5.5 or equivalent for its BBA (lower scores may get conditional acceptance after the interview). Yonsei University's Underwood International College asks for proof of English from the 2027 intake (TOEFL, IELTS, CEFR, IB / AP English, or English-medium schooling) and sets no minimum score.",
    'আমরা দুটো bachelor’s program-এর নিজস্ব page দেখেছি: SolBridge International School of Business (Woosong University) তার BBA-র জন্য IELTS 5.5 বা সমমানের score চায় (কম score হলে interview-এর পরে শর্তসাপেক্ষে ভর্তি হতে পারে)। Yonsei University-র Underwood International College ২০২৭ intake থেকে English দক্ষতার প্রমাণ চায় (TOEFL, IELTS, CEFR, IB / AP English বা English-medium-এ পড়াশোনা), কোনো minimum score ঠিক করা নেই।',
  ),
];

const visaDocuments = (id: string, degreeCert: Bilingual) =>
  qa(
    id,
    b('What documents do you need?', 'কী কী documents লাগে?'),
    [
      b(
        'For admission, each university publishes its own list in its admission guide; we have not verified one list that applies to every university. The general student visa (D-2) list from Study in Korea is below.',
        'Admission-এর জন্য প্রতিটি university তার admission guide-এ নিজের list দেয়; সব university-র জন্য একটা list আমরা যাচাই করতে পারিনি। নিচে Study in Korea-র দেওয়া student visa (D-2)-র সাধারণ list।',
      ),
      degreeCert,
      b(
        "The Korean Embassy in Bangladesh's student page also lists: a police clearance certificate (within 3 months), education certificates and transcripts attested by the Ministry of Education and the Ministry of Foreign Affairs, family documents (birth certificate, family relationship certificate, parents' no-objection letter) and bank and tax papers. That page is older than the new Visa Application Center, so check the current list when you apply.",
        'Bangladesh-এর Korean Embassy-র student page-এ আরও আছে: police clearance certificate (৩ মাসের মধ্যে), শিক্ষা মন্ত্রণালয় ও পররাষ্ট্র মন্ত্রণালয়ের attest করা সনদ ও transcript, পরিবারের কাগজ (জন্ম সনদ, পারিবারিক সম্পর্কের সনদ, বাবা-মায়ের no-objection letter) আর bank ও tax-এর কাগজ। Page-টি নতুন Visa Application Center-এর আগের, তাই apply করার সময় বর্তমান list দেখে নিন।',
      ),
      b(
        'Bangladesh is on the Embassy’s list of countries with a high risk of tuberculosis, so long-term visa applicants (staying more than 90 days) submit a tuberculosis test result.',
        'Bangladesh Embassy-র tuberculosis-এর উচ্চ ঝুঁকির দেশের তালিকায় আছে, তাই দীর্ঘমেয়াদি visa-র (৯০ দিনের বেশি) আবেদনকারীদের tuberculosis test-এর ফল জমা দিতে হয়।',
      ),
    ],
    [KR_SIK_VISA, KR_NIIED_GUIDEBOOK, KR_EMBASSY_BD_STUDENT_DOCS, KR_EMBASSY_BD_TB],
    {
      status: 'partly-verified',
      list: [
        b('Passport and a copy of it', 'Passport ও তার copy'),
        b('One passport-size photo taken within the last 6 months', 'গত ৬ মাসের মধ্যে তোলা একটি passport-size ছবি'),
        b('Standard admission letter issued by the university president or dean', 'University-র president বা dean-এর দেওয়া standard admission letter'),
        b("Copy of the university's business registration certificate", 'University-র business registration certificate-এর copy'),
        b('Proof of your highest education', 'আপনার সর্বোচ্চ শিক্ষাগত যোগ্যতার প্রমাণ'),
        b('Proof of financial ability', 'আর্থিক সামর্থ্যের প্রমাণ'),
        b("Family relationship documents (only if your parents' bank statements are used)", 'পারিবারিক সম্পর্কের কাগজ (শুধু বাবা-মায়ের bank statement দিলে)'),
        b('Tuberculosis test result (where required)', 'Tuberculosis test-এর ফল (যেখানে লাগে)'),
      ],
    },
  );

const applyWhen = (id: string, extra: Bilingual[] = [], sources: SourceRef[] = []) =>
  qa(
    id,
    b('When should you apply?', 'কখন apply করবেন?'),
    [
      b(
        'Korean universities have two main semesters. Spring semester (starts in March): applications typically from September to November of the previous year. Fall semester (starts in September): typically from April to June of the same year.',
        'Korea-র university-তে দুটো প্রধান semester। Spring semester (March-এ শুরু): সাধারণত আগের বছরের September থেকে November-এ আবেদন। Fall semester (September-এ শুরু): সাধারণত একই বছরের April থেকে June-এ।',
      ),
      b(
        'These are typical periods. Each university publishes its own dates, and results come on the university’s own schedule.',
        'এগুলো সাধারণ সময়। প্রতিটি university নিজের তারিখ প্রকাশ করে, ফলও দেয় নিজের সময়সূচি অনুযায়ী।',
      ),
      ...extra,
      b(
        "After admission, prepare the visa. The Embassy's student page says to apply at least five days before the academic term starts; that page is older than the new Visa Application Center, and no official fixed processing time is published, so leave yourself time.",
        'Admission-এর পরে visa-র প্রস্তুতি। Embassy-র student page বলে, semester শুরুর অন্তত ৫ দিন আগে apply করতে; page-টি নতুন Visa Application Center-এর আগের, আর কোনো official নির্দিষ্ট processing time প্রকাশ করা নেই, তাই হাতে সময় রাখুন।',
      ),
    ],
    [G, ...sources, KR_EMBASSY_BD_STUDENT_DOCS],
  );

const applyProcess = (id: string) =>
  qa(
    id,
    b('How does the application process work?', 'Application process কেমন?'),
    [
      b(
        'Most universities select by document screening; some also hold interviews or exams. Online applications are now widely used.',
        'বেশিরভাগ university document দেখে বাছাই করে; কেউ কেউ interview বা পরীক্ষাও নেয়। এখন বেশিরভাগ জায়গায় online-এ আবেদন হয়।',
      ),
      ADMISSION_FIRST,
    ],
    [G],
    {
      list: [
        b('Choose the university and department, and read its admission guide', 'University ও department বেছে নিন, তার admission guide পড়ুন'),
        b('Get the application form and prepare the documents', 'Application form নিন, documents প্রস্তুত করুন'),
        b('Submit the application', 'আবেদন জমা দিন'),
        b('Receive the admission letter', 'Admission letter পান'),
        b('Prepare the visa documents and apply for the D-2 visa', 'Visa-র documents প্রস্তুত করে D-2 visa-র আবেদন করুন'),
        b('Receive the visa, travel, and register within 90 days of arrival', 'Visa পেয়ে যাত্রা করুন, পৌঁছানোর ৯০ দিনের মধ্যে registration করুন'),
      ],
    },
  );

const universityScholarships = (id: string) =>
  qa(
    id,
    b('Do universities give scholarships?', 'University কি scholarship দেয়?'),
    [
      b(
        "According to Study in Korea, most universities give international students scholarships of 30–100% of tuition based on academic performance. The conditions are on each university's website.",
        'Study in Korea অনুযায়ী, বেশিরভাগ university পড়াশোনার ফলাফলের ভিত্তিতে international student-দের tuition-এর ৩০–১০০% পর্যন্ত scholarship দেয়। শর্তগুলো প্রতিটি university-র website-এ থাকে।',
      ),
    ],
    [KR_SIK_SCHOLARSHIPS],
  );

const workAnswer = (id: string, level: 'bachelors' | 'graduate') =>
  qa(
    id,
    b('What are the part-time work rules?', 'Part-time কাজের নিয়ম কী?'),
    [
      b(
        'Working is not allowed by default. You need permission in advance from the immigration office for your address; you must have a certain level of Korean, keep up with your studies and be confirmed by your school’s international student officer.',
        'এমনিতে কাজ করা যায় না। আগে থেকে আপনার এলাকার immigration office-এর permission লাগবে; নির্দিষ্ট মানের Korean জানতে হবে, পড়াশোনা ঠিক রাখতে হবে, আর school-এর international student officer-এর confirmation লাগবে।',
      ),
      level === 'bachelors'
        ? b(
            "Bachelor's, years 1–2: with TOPIK 3 (or an equivalent level), up to 25 hours a week on weekdays and no limit on weekends and vacations; without it, up to 10 hours a week. Years 3–4: the same, but TOPIK 4 is needed for the 25 hours. Up to 30 weekday hours at a certified university or with excellent grades or Korean.",
            "Bachelor's, ১ম–২য় বর্ষ: TOPIK 3 (বা সমমান) থাকলে weekday-তে সপ্তাহে সর্বোচ্চ ২৫ ঘণ্টা, weekend ও ছুটিতে কোনো সীমা নেই; না থাকলে সপ্তাহে সর্বোচ্চ ১০ ঘণ্টা। ৩য়–৪র্থ বর্ষ: একই নিয়ম, তবে ২৫ ঘণ্টার জন্য TOPIK 4 লাগবে। Certified university-তে বা খুব ভালো ফল বা Korean থাকলে weekday-তে সর্বোচ্চ ৩০ ঘণ্টা।",
          )
        : b(
            "Master's and PhD: with TOPIK 4 (or an equivalent level), up to 30 hours a week on weekdays and no limit on weekends and vacations (up to 35 weekday hours at a certified university or with excellent grades or Korean). Without TOPIK 4, up to 15 hours a week. For graduate students below TOPIK 4 at a certified university, the two official sources differ (15 or 10 hours), so ask the immigration office (1345).",
            "Master's ও PhD: TOPIK 4 (বা সমমান) থাকলে weekday-তে সপ্তাহে সর্বোচ্চ ৩০ ঘণ্টা, weekend ও ছুটিতে কোনো সীমা নেই (certified university-তে বা খুব ভালো ফল বা Korean থাকলে weekday-তে সর্বোচ্চ ৩৫ ঘণ্টা)। TOPIK 4 না থাকলে সপ্তাহে সর্বোচ্চ ১৫ ঘণ্টা। Certified university-তে TOPIK 4-এর নিচের graduate student-দের ক্ষেত্রে দুই official source-এ দুই রকম লেখা (১৫ বা ১০ ঘণ্টা), তাই immigration office-কে (1345) জিজ্ঞেস করুন।",
          ),
      b(
        'Not allowed: professional (E-1 to E-7) work without separate permission; manufacturing (unless Korean level 4 or higher), construction and seafarer jobs; delivery riders, couriers, designated drivers and similar platform or commission work; dispatch or subcontracted work; remote work.',
        'যা করা যাবে না: আলাদা permission ছাড়া professional (E-1 থেকে E-7) কাজ; manufacturing (Korean level 4 বা বেশি না থাকলে), construction ও জাহাজের কাজ; delivery rider, courier, designated driver এবং এ ধরনের platform বা commission-ভিত্তিক কাজ; dispatch বা subcontract কাজ; remote কাজ।',
      ),
    ],
    [KR_EASYLAW_WORK, KR_SIK_WORK],
    level === 'graduate' ? { status: 'partly-verified' } : {},
  );

const visaAnswer = (id: string, type: string, stay: Bilingual, stayStatus?: GuideStatus) =>
  qa(
    id,
    b('Which visa do you need?', 'কোন visa লাগবে?'),
    [
      b(
        `The D-2 (Student) visa, type ${type}. You apply after you receive the admission letter. Each grant of stay is up to 2 years and can be extended.`,
        `D-2 (Student) visa, ধরন ${type}। Admission letter পাওয়ার পরে apply করবেন। প্রতিবার সর্বোচ্চ ২ বছরের অনুমতি দেওয়া হয়, পরে বাড়ানো যায়।`,
      ),
      stay,
      b(
        'In Bangladesh, since 2 September 2026, visa applications are submitted and passports collected only through the Korea Visa Application Center in Dhaka; the Embassy decides on the visa. The visa fee is USD 40 / 60 / 70 / 90 depending on the visa type and stay, and is non-refundable; the Center’s service fee is BDT 2,150 per application.',
        'Bangladesh-এ ২ September ২০২৬ থেকে visa-র আবেদন জমা ও passport ফেরত নেওয়া হয় শুধু Dhaka-র Korea Visa Application Center-এর মাধ্যমে; visa-র সিদ্ধান্ত নেয় Embassy। Visa fee visa-র ধরন ও মেয়াদ অনুযায়ী USD 40 / 60 / 70 / 90, এটি ফেরতযোগ্য নয়; Center-এর service fee প্রতি আবেদনে BDT 2,150।',
      ),
      b(
        'After arrival: if you stay more than 90 days, register at the immigration office within 90 days of entry. You join the National Health Insurance from the date of registration; D-2 students pay 50% of the monthly premium.',
        'পৌঁছানোর পরে: ৯০ দিনের বেশি থাকলে entry-র ৯০ দিনের মধ্যে immigration office-এ registration করতে হবে। Registration-এর দিন থেকে আপনি National Health Insurance-এর সদস্য; D-2 student-রা মাসিক premium-এর ৫০% দেন।',
      ),
    ],
    [KR_SIK_VISA, KR_KIS_NAVIGATOR, KR_EMBASSY_BD_VAC, KR_EASYLAW_REGISTRATION, KR_EASYLAW_INSURANCE],
    stayStatus ? { status: stayStatus } : {},
  );

const afterGraduation = (id: string, e7: Bilingual) =>
  qa(
    id,
    b('What options are there after graduation?', 'Graduation-এর পরে কী options থাকে?'),
    [
      b(
        'You can change to the Job Seeker visa (D-10-1) to look for professional work. It is extended 6 months at a time, up to 2 years; internships are allowed (up to 6 months per company), simple or physical labour is not.',
        'চাকরি খুঁজতে Job Seeker visa-য় (D-10-1) বদলানো যায়। প্রতিবার ৬ মাস করে, সর্বোচ্চ ২ বছর পর্যন্ত বাড়ানো যায়; internship করা যায় (প্রতি company-তে সর্বোচ্চ ৬ মাস), সাধারণ বা শারীরিক শ্রমের কাজ নয়।',
      ),
      e7,
      b('Visa rules after graduation change often; check the current rules on HiKorea before you decide.', 'Graduation-এর পরের visa নিয়ম প্রায়ই বদলায়; সিদ্ধান্ত নেওয়ার আগে HiKorea-তে বর্তমান নিয়ম দেখে নিন।'),
    ],
    [G, KR_HIKOREA],
  );

const checkUniversity = (id: string) =>
  qa(
    id,
    b('What should you check before paying a university or agent?', 'University বা agent-কে টাকা দেওয়ার আগে কী দেখবেন?'),
    [
      b(
        "The Korean Embassy in Bangladesh advises checking the university's financial condition, operating status, eligibility to recruit international students, programs and refund policy on its official website or with its office, and not relying only on consultants or agencies.",
        'Bangladesh-এর Korean Embassy পরামর্শ দেয়: university-র আর্থিক অবস্থা, চালু আছে কিনা, international student নেওয়ার অনুমতি, program আর refund policy তার official website বা office থেকে যাচাই করুন; শুধু consultant বা agency-র উপর নির্ভর করবেন না।',
      ),
      b(
        'Before paying, confirm that an official Certificate of Admission was issued in the university’s name, the exact fees and bank account, and the refund conditions if enrolment is cancelled or the visa is refused. Keep contracts, receipts and messages. The Embassy does not arrange admission and cannot mediate refund disputes.',
        'টাকা দেওয়ার আগে নিশ্চিত হোন: university-র নামে official Certificate of Admission দেওয়া হয়েছে, fee-র সঠিক অঙ্ক ও bank account, আর ভর্তি বাতিল বা visa না পেলে refund-এর শর্ত। চুক্তি, রসিদ আর message রেখে দিন। Embassy admission ঠিক করে দেয় না, refund-এর বিরোধেও মধ্যস্থতা করে না।',
      ),
    ],
    [KR_EMBASSY_BD_UNIVERSITIES],
  );

// ------------------------------------------------------------------ costs

const EST_NOTE = b('Ministry of Education / NIIED guidebook range; the exact fee is on the university’s own page.', 'Ministry of Education / NIIED guidebook-এর range; সঠিক fee university-র নিজের page-এ।');
const livingEstimates: GuideCost[] = [
  { id: 'living', label: b('Living cost (average)', 'থাকা-খাওয়ার খরচ (গড়)'), value: b('₩750,000–1,000,000 per month', 'মাসে ₩750,000–1,000,000'), source: G },
  {
    id: 'housing',
    label: b('Accommodation', 'থাকার জায়গা'),
    value: b('₩500,000–700,000 per month', 'মাসে ₩500,000–700,000'),
    note: b('Dormitory costs vary by university; ask its dormitory office.', 'Dormitory-র খরচ university অনুযায়ী আলাদা; dormitory office-এ জিজ্ঞেস করুন।'),
    source: G,
  },
  { id: 'meals', label: b('Meals', 'খাবার'), value: b('₩200,000–300,000 per month (one cafeteria meal ₩5,000–15,000)', 'মাসে ₩200,000–300,000 (cafeteria-য় এক বেলা ₩5,000–15,000)'), source: G },
  { id: 'transport', label: b('Transport', 'যাতায়াত'), value: b('₩50,000–100,000 per month', 'মাসে ₩50,000–100,000'), source: G },
  { id: 'other', label: b('Other (phone, internet, insurance…)', 'অন্যান্য (phone, internet, insurance…)'), value: b('₩100,000–200,000 per month', 'মাসে ₩100,000–200,000'), source: G },
];
const visaCosts: GuideCost[] = [
  {
    id: 'visa-fee',
    label: b('Visa fee (Embassy in Bangladesh)', 'Visa fee (Bangladesh-এর Embassy)'),
    value: b('USD 40 / 60 / 70 / 90 by visa type and stay, non-refundable', 'Visa-র ধরন ও মেয়াদ অনুযায়ী USD 40 / 60 / 70 / 90, ফেরতযোগ্য নয়'),
    source: KR_EMBASSY_BD_VAC,
  },
  { id: 'vac-fee', label: b('Visa Application Center service fee (Dhaka)', 'Visa Application Center service fee (Dhaka)'), value: b('BDT 2,150 per application', 'প্রতি আবেদনে BDT 2,150'), source: KR_EMBASSY_BD_VAC },
  {
    id: 'tb-test',
    label: b('Tuberculosis test (designated centre, 2023 notice)', 'Tuberculosis test (নির্দিষ্ট centre, ২০২৩-এর notice)'),
    value: b('BDT 1,500 (X-ray) or BDT 7,000 (X-ray + sputum test)', 'BDT 1,500 (X-ray) বা BDT 7,000 (X-ray + sputum test)'),
    status: 'needs-review',
    note: b('From a 2023 notice; the centre and fees may have changed.', '২০২৩-এর notice থেকে; centre ও fee বদলে থাকতে পারে।'),
    source: KR_EMBASSY_BD_TB,
  },
];
const tuitionEstimate = (range: string): GuideCost => ({
  id: 'tuition',
  label: b('Tuition', 'Tuition'),
  value: b(`${range} per semester`, `প্রতি semester-এ ${range}`),
  note: EST_NOTE,
  source: G,
});

// ------------------------------------------------------------------ degree guides

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('4–6 years · after 12 years of school', '৪–৬ বছর · ১২ বছরের স্কুল শেষে'),
  intro: b(
    "A bachelor's degree in South Korea usually takes 4–6 years. You apply to a university after finishing 12 years of school, in Korean or, in some departments, in English.",
    'South Korea-তে bachelor’s সাধারণত ৪–৬ বছরের। ১২ বছরের স্কুল শেষ করে university-তে আবেদন করবেন; পড়া হয় Korean-এ, কিছু department-এ English-এ।',
  ),
  costs: {
    official: [
      {
        id: 'uic-tuition',
        label: b('Tuition — Yonsei University, Underwood International College (one program)', 'Tuition — Yonsei University, Underwood International College (একটি program)'),
        value: b('KRW 8,202,000 per semester (first semester KRW 8,416,000)', 'প্রতি semester-এ KRW 8,202,000 (প্রথম semester KRW 8,416,000)'),
        note: b('International Students Track, from the college’s own fee page. Other programs charge differently.', 'International Students Track, college-এর নিজের fee page থেকে। অন্য program-এর fee আলাদা।'),
        source: UIC_SOURCE,
      },
      ...visaCosts,
    ],
    estimates: [tuitionEstimate('₩5,000,000–7,000,000'), ...livingEstimates],
  },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'who',
          b("Who can apply for a Bachelor's in South Korea?", "South Korea-তে Bachelor's-এর জন্য কারা আবেদন করতে পারেন?"),
          [
            b(
              'Students who have completed the entire primary and secondary curriculum in their home country (a 12-year program).',
              'যাঁরা নিজের দেশে প্রাথমিক ও মাধ্যমিক পুরো পড়াশোনা (১২ বছরের program) শেষ করেছেন।',
            ),
            b(
              'Where the school system is shorter than 12 years, admission is possible if you completed the whole primary and secondary program there and the university confirms it with evidence such as a graduation certificate.',
              'যে দেশে স্কুলের পড়াশোনা ১২ বছরের কম, সেখানে পুরো প্রাথমিক ও মাধ্যমিক পড়াশোনা শেষ করলে এবং university graduation certificate-এর মতো প্রমাণ দেখে নিশ্চিত করলে ভর্তি হওয়া যায়।',
            ),
            UNI_DECIDES,
          ],
          [G],
        ),
        qa(
          'academic',
          b('What is the academic requirement?', 'Academic requirement কী?'),
          [
            b(
              'Nationally, the requirement is finishing 12 years of school (in Bangladesh terms, HSC or equivalent). Minimum grades are set by each university; the official national sources give no single grade.',
              'জাতীয়ভাবে শর্ত হলো ১২ বছরের স্কুল শেষ করা (Bangladesh-এ HSC বা সমমান)। কত grade লাগবে তা প্রতিটি university ঠিক করে; জাতীয় official source-এ সবার জন্য একটা grade দেওয়া নেই।',
            ),
            b(
              'Example from a program page we checked: SolBridge (Woosong University) asks for a transcript with a CGPA of C+ or higher, English proficiency, an online interview and funds for first-year tuition.',
              'আমরা যাচাই করেছি এমন একটি program-এর উদাহরণ: SolBridge (Woosong University) চায় C+ বা তার বেশি CGPA-সহ transcript, English দক্ষতা, একটি online interview আর প্রথম বছরের tuition-এর টাকা।',
            ),
          ],
          [G, SOL_SOURCE],
          { status: 'partly-verified' },
        ),
        qa(
          'subjects',
          b('Are there subject requirements?', 'Subject requirement আছে কি?'),
          [
            b(
              'Not verified yet. The official sources we read set no national subject rule for bachelor’s admission. If a department needs particular school subjects, its admission guide says so.',
              'এখনো যাচাই হয়নি। আমরা যে official source পড়েছি, তাতে bachelor’s ভর্তির জন্য কোনো জাতীয় subject নিয়ম নেই। কোনো department নির্দিষ্ট subject চাইলে তার admission guide-এ লেখা থাকে।',
            ),
          ],
          [G],
          { status: 'not-verified' },
        ),
        qa(
          'age',
          b('Is there an age limit?', 'বয়সের সীমা আছে কি?'),
          [
            b(
              'The official sources we read set no general age limit for bachelor’s admission. The government scholarship is different: GKS undergraduate applicants must be under 25.',
              'আমরা যে official source পড়েছি, তাতে bachelor’s ভর্তির জন্য সাধারণ কোনো বয়সসীমা নেই। সরকারি scholarship আলাদা: GKS undergraduate-এ আবেদনকারীর বয়স ২৫-এর কম হতে হবে।',
            ),
          ],
          [G, KR_SIK_SCHOLARSHIPS],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language', 'ভাষা'),
      items: [englishTaught('english'), koreanTaught('korean'), topik('topik'), ielts('ielts', IELTS_BACHELOR_EXAMPLES, [SOL_SOURCE, UIC_APPLY])],
    },
    {
      id: 'costs',
      title: b('Duration and costs', 'সময় ও খরচ'),
      items: [
        qa(
          'duration',
          b('How many years does it take?', 'কত বছর লাগে?'),
          [
            b("Usually 4–6 years for a bachelor's degree.", "Bachelor's সাধারণত ৪–৬ বছরের।"),
            b(
              "With the GKS scholarship it takes 5–7 years: 1 year of Korean language training plus 4–6 years of degree.",
              'GKS scholarship-এ ৫–৭ বছর: ১ বছর Korean ভাষা training, তারপর ৪–৬ বছরের degree।',
            ),
          ],
          [G, KR_EMBASSY_BD_GKS_U_2027],
        ),
        qa(
          'tuition',
          b('How much is tuition?', 'Tuition fee কত?'),
          [
            b(
              "Tuition differs by university and program. The Ministry of Education guidebook gives ₩5,000,000–7,000,000 per semester as a typical range for bachelor's degrees, and national universities, which receive government funding, generally charge less than private ones.",
              "Tuition university ও program অনুযায়ী আলাদা। Ministry of Education-এর guidebook bachelor's-এর জন্য প্রতি semester-এ সাধারণত ₩5,000,000–7,000,000 বলে; সরকারি অনুদান পাওয়া national university-র tuition সাধারণত private university-র চেয়ে কম।",
            ),
            b("The exact fee is on the university's own fee page or on Academyinfo.", 'সঠিক fee university-র নিজের fee page-এ বা Academyinfo-তে পাবেন।'),
          ],
          [G, KR_ACADEMYINFO],
        ),
        { embed: 'costs' },
      ],
    },
    {
      id: 'documents',
      title: b('Documents', 'Documents'),
      items: [
        visaDocuments(
          'documents',
          b(
            'Your proof of education is your high school (HSC or equivalent) certificate, in principle the original, confirmed by apostille or by a Korean consul, with a translation if it is not in Korean or English.',
            'শিক্ষার প্রমাণ হিসেবে দেবেন high school (HSC বা সমমান)-এর সনদ, নিয়ম অনুযায়ী original, apostille বা Korean consul-এর confirmation-সহ; Korean বা English-এ না হলে অনুবাদসহ।',
          ),
        ),
      ],
    },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        applyProcess('process'),
        applyWhen(
          'when',
          [
            b(
              'GKS undergraduate 2027 (Bangladesh, Embassy track): online applications 15–30 September 2026; shortlisted applicants are interviewed in English at the Embassy.',
              'GKS undergraduate 2027 (Bangladesh, Embassy track): online আবেদন ১৫–৩০ September ২০২৬; shortlist হলে Embassy-তে English-এ interview।',
            ),
          ],
          [KR_EMBASSY_BD_GKS_U_2027],
        ),
        checkUniversity('check'),
      ],
    },
    {
      id: 'scholarships',
      title: b('Scholarships', 'Scholarship'),
      items: [{ embed: 'scholarships' }, universityScholarships('university-scholarships')],
    },
    { id: 'universities', title: b('Universities', 'University'), items: [{ embed: 'universities' }] },
    { id: 'work', title: b('Part-time work', 'Part-time কাজ'), items: [workAnswer('work', 'bachelors')] },
    {
      id: 'visa',
      title: b('Visa', 'Visa'),
      items: [
        visaAnswer(
          'visa',
          'D-2-2',
          b(
            "In total, a bachelor's student may stay up to 6 years after admission (up to 7 years for 5-year programs), according to Study in Korea; the Korea Immigration Service has not confirmed this yet.",
            "Study in Korea অনুযায়ী bachelor's student ভর্তির পর মোট ৬ বছর পর্যন্ত থাকতে পারেন (৫ বছরের program-এ ৭ বছর); Korea Immigration Service এখনো এটা নিশ্চিত করেনি।",
          ),
          'partly-verified',
        ),
      ],
    },
    {
      id: 'after',
      title: b('After graduation', 'Graduation-এর পরে'),
      items: [
        afterGraduation(
          'after',
          b(
            "For a work visa (E-7), graduates usually need a related bachelor's plus at least 1 year of experience (or a related master's, or 5+ years of experience). Each of the 87 occupations has its own conditions.",
            "কাজের visa (E-7)-এর জন্য সাধারণত সংশ্লিষ্ট bachelor's আর অন্তত ১ বছরের অভিজ্ঞতা লাগে (বা সংশ্লিষ্ট master's, বা ৫ বছরের বেশি অভিজ্ঞতা)। ৮৭টি পেশার প্রতিটির নিজের শর্ত আছে।",
          ),
        ),
      ],
    },
  ],
};

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b("2+ years · after a bachelor's", "২+ বছর · bachelor's শেষে"),
  intro: b(
    "A master's degree in South Korea takes two years or more, usually coursework followed by a thesis. You apply with a bachelor's degree, to a Korean-taught or an English-taught program.",
    "South Korea-তে master's দুই বছর বা তার বেশি সময়ের, সাধারণত course-এর পরে thesis। Bachelor's degree নিয়ে Korean বা English-এ পড়ানো program-এ আবেদন করবেন।",
  ),
  costs: { official: visaCosts, estimates: [tuitionEstimate('₩6,000,000–8,000,000'), ...livingEstimates] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa('bachelor', b("Do you need a bachelor's degree?", "Bachelor's degree লাগবে কি?"), [b("Yes. The general requirement for a master's is a bachelor's degree.", "হ্যাঁ। Master's-এর সাধারণ শর্ত হলো bachelor's degree।"), UNI_DECIDES], [G]),
        qa(
          'related',
          b('Can you apply from a different subject?', 'অন্য subject থেকে আবেদন করা যায় কি?'),
          [
            b(
              'Not verified yet. The official national sources we read have no rule on related or unrelated subjects; each graduate school and department decides, and its admission guide says what it accepts.',
              'এখনো যাচাই হয়নি। আমরা যে জাতীয় official source পড়েছি, তাতে সংশ্লিষ্ট বা অন্য subject নিয়ে কোনো নিয়ম নেই; প্রতিটি graduate school ও department নিজে ঠিক করে, তার admission guide-এ লেখা থাকে।',
            ),
          ],
          [G],
          { status: 'not-verified' },
        ),
        qa(
          'gpa',
          b('Is there a minimum GPA?', 'Minimum GPA আছে কি?'),
          [
            b(
              'No single national minimum is set in the sources we read; each university sets its own. For the government scholarship (GKS graduate), your average in your most recent program must be at least 80%.',
              'আমরা যে source পড়েছি, তাতে সবার জন্য একটা জাতীয় minimum নেই; প্রতিটি university নিজে ঠিক করে। সরকারি scholarship (GKS graduate)-এর জন্য সর্বশেষ program-এ আপনার গড় অন্তত ৮০% হতে হবে।',
            ),
          ],
          [G, KR_SIK_SCHOLARSHIPS],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'study',
      title: b('How the degree works', 'Degree কীভাবে চলে'),
      items: [
        qa(
          'structure',
          b('Coursework or research?', 'Course নাকি research?'),
          [
            b(
              "A master's usually means about 24 credits of courses, then a thesis examined by a committee of at least three examiners. It takes two years or more.",
              "Master's-এ সাধারণত প্রায় ২৪ credit-এর course, তারপর thesis, যা অন্তত তিনজন examiner-এর committee মূল্যায়ন করে। সময় লাগে দুই বছর বা তার বেশি।",
            ),
            b(
              'There are two kinds of graduate school: general graduate schools, which focus on academic study, and specialised graduate schools, which are professionally oriented.',
              'Graduate school দুই ধরনের: general graduate school (academic পড়াশোনা) আর specialised graduate school (পেশাভিত্তিক)।',
            ),
            b('Each university sets its own credit and thesis rules in its guide.', 'Credit ও thesis-এর নিয়ম প্রতিটি university তার guide-এ নিজে ঠিক করে।'),
          ],
          [G],
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language', 'ভাষা'),
      items: [englishTaught('english'), koreanTaught('korean'), topik('topik'), ielts('ielts')],
    },
    {
      id: 'costs',
      title: b('Costs', 'খরচ'),
      items: [
        qa(
          'tuition',
          b('How much is tuition?', 'Tuition fee কত?'),
          [
            b(
              "The Ministry of Education guidebook gives ₩6,000,000–8,000,000 per semester as a typical range for master's degrees. National universities generally charge less than private ones. The exact fee is on the university's own fee page or on Academyinfo.",
              "Ministry of Education-এর guidebook master's-এর জন্য প্রতি semester-এ সাধারণত ₩6,000,000–8,000,000 বলে। National university-র tuition সাধারণত private-এর চেয়ে কম। সঠিক fee university-র নিজের fee page-এ বা Academyinfo-তে পাবেন।",
            ),
          ],
          [G, KR_ACADEMYINFO],
        ),
        { embed: 'costs' },
      ],
    },
    {
      id: 'documents',
      title: b('Documents', 'Documents'),
      items: [
        visaDocuments(
          'documents',
          b(
            "Your proof of education is your bachelor's degree certificate, in principle the original, confirmed by apostille or by a Korean consul, with a translation if it is not in Korean or English.",
            "শিক্ষার প্রমাণ হিসেবে দেবেন bachelor's degree-র সনদ, নিয়ম অনুযায়ী original, apostille বা Korean consul-এর confirmation-সহ; Korean বা English-এ না হলে অনুবাদসহ।",
          ),
        ),
      ],
    },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        applyProcess('process'),
        applyWhen('when', [
          b(
            'GKS graduate: applications are usually taken in February–March, through the Korean Embassy or directly by a GKS university; check the GKS notices for the next round.',
            'GKS graduate: সাধারণত February–March-এ আবেদন নেওয়া হয়, Korean Embassy-র মাধ্যমে বা সরাসরি GKS university-তে; পরের round-এর জন্য GKS notice দেখুন।',
          ),
        ], [KR_SIK_SCHOLARSHIPS]),
        checkUniversity('check'),
      ],
    },
    { id: 'scholarships', title: b('Scholarships', 'Scholarship'), items: [{ embed: 'scholarships' }, universityScholarships('university-scholarships')] },
    { id: 'universities', title: b('Universities', 'University'), items: [{ embed: 'universities' }] },
    { id: 'work', title: b('Part-time work', 'Part-time কাজ'), items: [workAnswer('work', 'graduate')] },
    {
      id: 'visa',
      title: b('Visa', 'Visa'),
      items: [
        visaAnswer(
          'visa',
          'D-2-3',
          b(
            "In total, a master's student may stay up to 5 years after admission (up to 6 years for 3-year programs), according to Study in Korea; the Korea Immigration Service has not confirmed this yet.",
            "Study in Korea অনুযায়ী master's student ভর্তির পর মোট ৫ বছর পর্যন্ত থাকতে পারেন (৩ বছরের program-এ ৬ বছর); Korea Immigration Service এখনো এটা নিশ্চিত করেনি।",
          ),
          'partly-verified',
        ),
      ],
    },
    {
      id: 'after',
      title: b('After graduation', 'Graduation-এর পরে'),
      items: [
        afterGraduation(
          'after',
          b(
            "For a work visa (E-7), a master's degree in a related field is one of the usual routes. Each of the 87 occupations has its own conditions.",
            "কাজের visa (E-7)-এর একটি সাধারণ পথ হলো সংশ্লিষ্ট বিষয়ে master's degree। ৮৭টি পেশার প্রতিটির নিজের শর্ত আছে।",
          ),
        ),
      ],
    },
  ],
};

const PHD: DegreeGuide = {
  level: 'phd',
  card: b("3+ years · after a master's", "৩+ বছর · master's শেষে"),
  intro: b(
    "A doctoral degree in South Korea takes three years or more: coursework, then a dissertation examined by at least five examiners. You apply with a master's degree.",
    "South Korea-তে PhD তিন বছর বা তার বেশি সময়ের: প্রথমে course, তারপর dissertation, যা অন্তত পাঁচজন examiner মূল্যায়ন করেন। Master's degree নিয়ে আবেদন করবেন।",
  ),
  costs: { official: visaCosts, estimates: [tuitionEstimate('₩7,000,000–9,000,000'), ...livingEstimates] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa('master', b("Do you need a master's degree?", "Master's degree লাগবে কি?"), [b("Yes. The general requirement for a doctoral program is a master's degree.", "হ্যাঁ। PhD-র সাধারণ শর্ত হলো master's degree।"), UNI_DECIDES], [G]),
        qa(
          'proposal',
          b('Do you need a research proposal?', 'Research proposal লাগবে কি?'),
          [
            b(
              'Not verified yet. The official national sources we read do not say whether a research proposal (study or research plan) is required for doctoral admission. The graduate school’s admission guide lists what it asks for.',
              'এখনো যাচাই হয়নি। আমরা যে জাতীয় official source পড়েছি, তাতে PhD ভর্তিতে research proposal (study বা research plan) লাগবে কিনা বলা নেই। Graduate school-এর admission guide-এ কী কী চায় তা লেখা থাকে।',
            ),
          ],
          [G],
          { status: 'not-verified' },
        ),
        qa(
          'supervisor',
          b('Do you need a supervisor before applying?', 'আবেদনের আগে supervisor লাগবে কি?'),
          [
            b(
              'Not verified yet. The official national sources we read do not say whether you must contact or be accepted by a supervisor before applying. Check the department’s admission guide.',
              'এখনো যাচাই হয়নি। আবেদনের আগে supervisor-এর সঙ্গে যোগাযোগ বা তাঁর সম্মতি লাগবে কিনা, আমরা যে জাতীয় official source পড়েছি তাতে বলা নেই। Department-এর admission guide দেখুন।',
            ),
          ],
          [G],
          { status: 'not-verified' },
        ),
        qa(
          'background',
          b('What academic or research background is needed?', 'কেমন academic বা research background লাগে?'),
          [
            b(
              "Beyond the master's degree, no national rule is set in the sources we read; each department decides. For the government scholarship (GKS graduate), you must be under 40 and have an average of at least 80% in your most recent program.",
              "Master's degree-র বাইরে আমরা যে source পড়েছি তাতে কোনো জাতীয় নিয়ম নেই; প্রতিটি department নিজে ঠিক করে। সরকারি scholarship (GKS graduate)-এর জন্য বয়স ৪০-এর কম আর সর্বশেষ program-এ গড় অন্তত ৮০% হতে হবে।",
            ),
          ],
          [G, KR_SIK_SCHOLARSHIPS],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'study',
      title: b('How the degree works', 'Degree কীভাবে চলে'),
      items: [
        qa(
          'research',
          b('What does the research process look like?', 'Research-এর ধাপ কেমন?'),
          [
            b(
              'A doctoral program takes three years or more: usually about 36 credits of courses, then a dissertation examined by at least five examiners.',
              'PhD তিন বছর বা তার বেশি সময়ের: সাধারণত প্রায় ৩৬ credit-এর course, তারপর dissertation, যা অন্তত পাঁচজন examiner মূল্যায়ন করেন।',
            ),
            b('Each university sets its own credit, qualifying and dissertation rules in its guide.', 'Credit, qualifying আর dissertation-এর নিয়ম প্রতিটি university তার guide-এ নিজে ঠিক করে।'),
          ],
          [G],
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language', 'ভাষা'),
      items: [englishTaught('english'), koreanTaught('korean'), topik('topik'), ielts('ielts')],
    },
    {
      id: 'funding',
      title: b('Funding and costs', 'Funding ও খরচ'),
      items: [
        { embed: 'scholarships' },
        universityScholarships('university-scholarships'),
        qa(
          'tuition',
          b('How much is tuition?', 'Tuition fee কত?'),
          [
            b(
              'The Ministry of Education guidebook gives ₩7,000,000–9,000,000 per semester as a typical range for doctoral programs. National universities generally charge less than private ones. The exact fee is on the university’s own fee page or on Academyinfo.',
              'Ministry of Education-এর guidebook PhD-র জন্য প্রতি semester-এ সাধারণত ₩7,000,000–9,000,000 বলে। National university-র tuition সাধারণত private-এর চেয়ে কম। সঠিক fee university-র নিজের fee page-এ বা Academyinfo-তে পাবেন।',
            ),
          ],
          [G, KR_ACADEMYINFO],
        ),
        { embed: 'costs' },
      ],
    },
    {
      id: 'documents',
      title: b('Documents', 'Documents'),
      items: [
        visaDocuments(
          'documents',
          b(
            "Your proof of education is your master's degree certificate, in principle the original, confirmed by apostille or by a Korean consul, with a translation if it is not in Korean or English.",
            "শিক্ষার প্রমাণ হিসেবে দেবেন master's degree-র সনদ, নিয়ম অনুযায়ী original, apostille বা Korean consul-এর confirmation-সহ; Korean বা English-এ না হলে অনুবাদসহ।",
          ),
        ),
      ],
    },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        applyProcess('process'),
        applyWhen('when', [
          b(
            'GKS graduate (also for PhD): applications are usually taken in February–March, through the Korean Embassy or directly by a GKS university.',
            'GKS graduate (PhD-র জন্যও): সাধারণত February–March-এ আবেদন নেওয়া হয়, Korean Embassy-র মাধ্যমে বা সরাসরি GKS university-তে।',
          ),
        ], [KR_SIK_SCHOLARSHIPS]),
        checkUniversity('check'),
      ],
    },
    { id: 'universities', title: b('Universities', 'University'), items: [{ embed: 'universities' }] },
    { id: 'work', title: b('Part-time work', 'Part-time কাজ'), items: [workAnswer('work', 'graduate')] },
    {
      id: 'visa',
      title: b('Visa', 'Visa'),
      items: [
        visaAnswer(
          'visa',
          'D-2-4',
          b(
            'The total stay limit for doctoral students is not settled: Study in Korea gives up to 8 years after admission, but the same text also says "up to 7 years for 5-year programs", which looks inconsistent. Check with the Korea Immigration Service.',
            'PhD student-দের মোট থাকার সীমা নিশ্চিত নয়: Study in Korea ভর্তির পর ৮ বছর পর্যন্ত বলে, কিন্তু একই লেখায় "৫ বছরের program-এ ৭ বছর" আছে, যা অসংগত মনে হয়। Korea Immigration Service-এ জেনে নিন।',
          ),
          'needs-review',
        ),
      ],
    },
    {
      id: 'after',
      title: b('After graduation', 'Graduation-এর পরে'),
      items: [
        afterGraduation(
          'after',
          b(
            'For a work visa (E-7), each of the 87 occupations has its own conditions; a related master’s or higher degree is one of the usual routes.',
            'কাজের visa (E-7)-এর ক্ষেত্রে ৮৭টি পেশার প্রতিটির নিজের শর্ত আছে; সংশ্লিষ্ট master’s বা তার বেশি degree একটি সাধারণ পথ।',
          ),
        ),
      ],
    },
  ],
};

// ------------------------------------------------------------------ the country

export const KR_GUIDE: CountryGuide = {
  code: 'KR',
  checkedAt: KR_C1_READ,
  intro: b(
    'South Korea teaches most degrees in Korean, with English-taught programs in some departments, and offers a government scholarship (GKS) to international students. This guide gathers what you need to know, from official Korean sources, in one place.',
    'South Korea-তে বেশিরভাগ degree Korean-এ পড়ানো হয়, কিছু department-এ English-এ। International student-দের জন্য সরকারি scholarship (GKS) আছে। Official Korean source থেকে দরকারি তথ্য এই page-এ এক জায়গায় দেওয়া হলো।',
  ),
  overview: [
    qa(
      'why',
      b('What does South Korea offer international students?', 'International student-দের জন্য South Korea-তে কী আছে?'),
      [
        b(
          'Degree programs from associate to doctoral level, with part of the teaching in English (about 30% of all courses); a government scholarship (GKS) that covers airfare, Korean language training, tuition and monthly allowances; permission to work part-time while studying; and a job-seeker visa after graduation.',
          'Associate থেকে PhD পর্যন্ত degree program, যার একটা অংশ English-এ পড়ানো হয় (মোট course-এর প্রায় ৩০%); সরকারি scholarship (GKS), যা বিমান ভাড়া, Korean ভাষা training, tuition আর মাসিক ভাতা দেয়; পড়ার সময় অনুমতি নিয়ে part-time কাজের সুযোগ; আর graduation-এর পরে চাকরি খোঁজার visa।',
        ),
      ],
      [G, KR_SIK_SCHOLARSHIPS, KR_EASYLAW_WORK],
    ),
    qa(
      'system',
      b('How does the education system work?', 'শিক্ষাব্যবস্থা কেমন?'),
      [
        b(
          'School follows a 6-3-3-4 structure: elementary (6 years), middle (3), high school (3), then university (4). Higher education has junior colleges (2–3 year programs), universities (4-year programs) and graduate schools; master’s and doctoral programs are usually offered by 4-year universities.',
          'পড়াশোনার কাঠামো ৬-৩-৩-৪: প্রাথমিক (৬ বছর), মাধ্যমিক (৩), উচ্চ মাধ্যমিক (৩), তারপর university (৪)। উচ্চশিক্ষায় আছে junior college (২–৩ বছরের program), university (৪ বছরের program) আর graduate school; master’s ও PhD সাধারণত ৪ বছরের university-তেই হয়।',
        ),
        b('National universities receive government funding; private universities do not.', 'National university সরকারি অনুদান পায়; private university পায় না।'),
      ],
      [G],
    ),
    qa(
      'options',
      b('What can international students study?', 'International student-রা কী পড়তে পারেন?'),
      [
        b(
          "Full degrees (associate, bachelor's, master's, doctoral), Korean language training at university-affiliated institutes, and exchange or summer / winter programs. This guide covers the Bachelor's, Master's and PhD.",
          "পুরো degree (associate, bachelor's, master's, PhD), university-র Korean language institute-এ ভাষা training, আর exchange বা summer / winter program। এই guide-এ Bachelor's, Master's ও PhD নিয়ে লেখা।",
        ),
      ],
      [G],
    ),
    qa(
      'languages',
      b('Which languages are degrees taught in?', 'কোন ভাষায় পড়ানো হয়?'),
      [
        b(
          'Mostly Korean. About 30% of all courses are taught in English, more in graduate schools, and some universities have international faculties that teach everything in English. Korean-taught degrees generally ask for TOPIK 3 to enter and TOPIK 4 to graduate; English-taught departments accept an English test instead.',
          'বেশিরভাগ Korean-এ। মোট course-এর প্রায় ৩০% English-এ, graduate school-এ আরও বেশি; কিছু university-র international faculty সব course English-এ পড়ায়। Korean-এ পড়ানো degree-তে সাধারণত ভর্তিতে TOPIK 3 আর graduation-এ TOPIK 4 লাগে; English-এ পড়ানো department TOPIK-এর বদলে English test নেয়।',
        ),
      ],
      [G],
    ),
    qa(
      'degrees',
      b('How long is each degree?', 'কোন degree কত বছরের?'),
      [b("Bachelor's: 4–6 years. Master's: 2 years or more. Doctoral: 3 years or more.", "Bachelor's: ৪–৬ বছর। Master's: ২ বছর বা বেশি। PhD: ৩ বছর বা বেশি।")],
      [G],
    ),
    qa(
      'admission',
      b('How does admission work?', 'ভর্তির নিয়ম কেমন?'),
      [
        b(
          "General eligibility: 12 years of school for a bachelor's, a bachelor's degree for a master's, a master's degree for a PhD. Universities select mostly by document screening, some with interviews or exams, and most take applications online.",
          "সাধারণ যোগ্যতা: bachelor's-এর জন্য ১২ বছরের স্কুল, master's-এর জন্য bachelor's degree, PhD-র জন্য master's degree। University-গুলো মূলত document দেখে বাছাই করে, কেউ কেউ interview বা পরীক্ষা নেয়; বেশিরভাগ আবেদন online-এ।",
        ),
        UNI_DECIDES,
      ],
      [G],
    ),
    qa(
      'calendar',
      b('When does the academic year start?', 'শিক্ষাবর্ষ কখন শুরু হয়?'),
      [
        b(
          'There are two main semesters: spring, starting in March, and fall, starting in September. Applications for spring are typically taken from September to November of the previous year, and for fall from April to June.',
          'দুটো প্রধান semester: spring (March-এ শুরু) আর fall (September-এ শুরু)। Spring-এর আবেদন সাধারণত আগের বছরের September–November-এ, fall-এর আবেদন April–June-এ।',
        ),
      ],
      [G],
    ),
    qa(
      'keep-in-mind',
      b('What should international students keep in mind?', 'International student হিসেবে কী মাথায় রাখবেন?'),
      [
        ADMISSION_FIRST,
        b(
          'Work of any kind needs permission in advance. If you stay more than 90 days, register at the immigration office within 90 days of arrival, and report changes of address or school within 15 days.',
          'যেকোনো কাজের জন্য আগে থেকে permission লাগে। ৯০ দিনের বেশি থাকলে পৌঁছানোর ৯০ দিনের মধ্যে immigration office-এ registration করতে হবে, আর ঠিকানা বা school বদলালে ১৫ দিনের মধ্যে জানাতে হবে।',
        ),
        b(
          "The Korean Embassy in Bangladesh asks students to check a university themselves on its official website, not only through agents, and to confirm fees, bank account and refund conditions before paying.",
          'Bangladesh-এর Korean Embassy বলে, শুধু agent-এর কথায় নয়, university-র official website থেকে নিজে যাচাই করুন, আর টাকা দেওয়ার আগে fee, bank account ও refund-এর শর্ত নিশ্চিত করুন।',
        ),
      ],
      [KR_KIS_NAVIGATOR, KR_EASYLAW_REGISTRATION, KR_EMBASSY_BD_UNIVERSITIES],
    ),
  ],
  faqs: [
    qa(
      'what-needed',
      b('What do you need to study in South Korea?', 'South Korea-তে পড়তে কী কী লাগে?'),
      [
        b(
          "An admission letter from a Korean university (you meet the degree's general eligibility and the university's own requirements), proof of language (TOPIK for Korean-taught programs, an English test for English-taught ones), and then a D-2 student visa.",
          'Korea-র একটি university-র admission letter (degree-র সাধারণ যোগ্যতা আর university-র নিজের শর্ত পূরণ করে), ভাষার প্রমাণ (Korean-এ পড়ানো program-এ TOPIK, English-এ পড়ানো program-এ English test), তারপর D-2 student visa।',
        ),
      ],
      [G, KR_SIK_VISA],
    ),
    qa(
      'tuition',
      b('How much is tuition in South Korea?', 'South Korea-তে tuition fee কত?'),
      [
        b(
          "Typical ranges per semester (Ministry of Education guidebook, an estimate): Bachelor's ₩5,000,000–7,000,000; Master's ₩6,000,000–8,000,000; Doctoral ₩7,000,000–9,000,000. National universities generally charge less than private ones.",
          "প্রতি semester-এ সাধারণ range (Ministry of Education-এর guidebook, আনুমানিক): Bachelor's ₩5,000,000–7,000,000; Master's ₩6,000,000–8,000,000; PhD ₩7,000,000–9,000,000। National university-র tuition সাধারণত private-এর চেয়ে কম।",
        ),
        b(
          "An official example: Yonsei University's Underwood International College charges KRW 8,202,000 per semester (International Students Track). The exact fee for your program is on the university’s own page or on Academyinfo.",
          'একটি official উদাহরণ: Yonsei University-র Underwood International College প্রতি semester-এ KRW 8,202,000 নেয় (International Students Track)। আপনার program-এর সঠিক fee university-র নিজের page-এ বা Academyinfo-তে।',
        ),
      ],
      [G, UIC_SOURCE, KR_ACADEMYINFO],
    ),
    qa(
      'bachelors',
      b("What do you need for a Bachelor's?", "Bachelor's করতে কী লাগে?"),
      [b("12 years of completed schooling (HSC or equivalent), plus the university's own requirements and language proof. The Bachelor's guide below has the details.", "১২ বছরের স্কুল শেষ (HSC বা সমমান), সঙ্গে university-র নিজের শর্ত আর ভাষার প্রমাণ। বিস্তারিত নিচের Bachelor's guide-এ।")],
      [G],
    ),
    qa(
      'masters',
      b("What do you need for a Master's?", "Master's করতে কী লাগে?"),
      [b("A bachelor's degree, plus the graduate school's own requirements and language proof. The Master's guide below has the details.", "Bachelor's degree, সঙ্গে graduate school-এর নিজের শর্ত আর ভাষার প্রমাণ। বিস্তারিত নিচের Master's guide-এ।")],
      [G],
    ),
    qa(
      'phd',
      b('What do you need for a PhD?', 'PhD করতে কী লাগে?'),
      [b("A master's degree, plus the graduate school's own requirements and language proof. The PhD guide below has the details.", "Master's degree, সঙ্গে graduate school-এর নিজের শর্ত আর ভাষার প্রমাণ। বিস্তারিত নিচের PhD guide-এ।")],
      [G],
    ),
    qa(
      'english',
      b('Are English-taught programs available?', 'English-এ পড়ানো program পাওয়া যায় কি?'),
      [
        b(
          'Yes, in some departments and in international faculties; about 30% of all courses are in English, more at graduate level. Two we checked: Yonsei University’s Underwood International College and the SolBridge BBA at Woosong University.',
          'হ্যাঁ, কিছু department-এ আর international faculty-তে; মোট course-এর প্রায় ৩০% English-এ, graduate level-এ আরও বেশি। আমরা যাচাই করেছি এমন দুটো: Yonsei University-র Underwood International College আর Woosong University-র SolBridge BBA।',
        ),
      ],
      [G, UIC_SOURCE, SOL_SOURCE],
    ),
    qa(
      'topik',
      b('Do you need TOPIK?', 'TOPIK লাগবে কি?'),
      [
        b(
          'For a Korean-taught degree, generally yes: TOPIK 3 or above to enter and TOPIK 4 or above to graduate. For an English-taught department, TOPIK is not mandatory. GKS scholars, exchange students and some departments have different rules.',
          'Korean-এ পড়ানো degree-তে সাধারণত হ্যাঁ: ভর্তিতে TOPIK 3 বা বেশি, graduation-এ TOPIK 4 বা বেশি। English-এ পড়ানো department-এ TOPIK বাধ্যতামূলক নয়। GKS scholar, exchange student আর কিছু department-এর নিয়ম আলাদা।',
        ),
      ],
      [G],
    ),
    qa(
      'ielts',
      b('What IELTS score might you need?', 'IELTS কত লাগতে পারে?'),
      [
        b(
          'No single national minimum; each university sets its own. Examples we checked: SolBridge BBA, IELTS 5.5 or equivalent; Yonsei UIC, proof of English with no minimum score (from the 2027 intake).',
          'সবার জন্য একটা জাতীয় minimum নেই; প্রতিটি university নিজে ঠিক করে। আমরা যাচাই করেছি এমন উদাহরণ: SolBridge BBA-তে IELTS 5.5 বা সমমান; Yonsei UIC-তে English-এর প্রমাণ লাগে, কোনো minimum score নেই (২০২৭ intake থেকে)।',
        ),
      ],
      [G, SOL_SOURCE, UIC_APPLY],
      { status: 'partly-verified' },
    ),
    qa(
      'cost',
      b('How much might it cost in total?', 'মোট কত টাকা খরচ হতে পারে?'),
      [
        b(
          'Tuition (above) plus living costs, which the Ministry of Education guidebook puts at about ₩750,000–1,000,000 a month on average (accommodation ₩500,000–700,000 of it), plus visa and travel costs. These are estimates; amounts are shown in the source’s currency and are not converted.',
          'Tuition (উপরে) আর থাকা-খাওয়ার খরচ, যা Ministry of Education-এর guidebook অনুযায়ী মাসে গড়ে প্রায় ₩750,000–1,000,000 (এর মধ্যে থাকার জায়গা ₩500,000–700,000), সঙ্গে visa আর যাতায়াতের খরচ। এগুলো আনুমানিক; অঙ্ক source-এর মুদ্রাতেই দেখানো, convert করা হয়নি।',
        ),
      ],
      [G],
    ),
    qa(
      'documents',
      b('What documents do you need?', 'কী কী documents লাগে?'),
      [
        b(
          'Admission documents are set by each university. For the D-2 visa: passport, photo, the standard admission letter, the university’s business registration certificate, proof of your highest education, proof of financial ability and, for Bangladesh, a tuberculosis test result. Each degree guide lists them in full.',
          'Admission-এর documents প্রতিটি university ঠিক করে। D-2 visa-র জন্য: passport, ছবি, standard admission letter, university-র business registration certificate, সর্বোচ্চ শিক্ষার প্রমাণ, আর্থিক সামর্থ্যের প্রমাণ, আর Bangladesh-এর জন্য tuberculosis test-এর ফল। প্রতিটি degree guide-এ পুরো list আছে।',
        ),
      ],
      [KR_SIK_VISA, KR_EMBASSY_BD_TB],
    ),
    qa(
      'scholarships',
      b('Are scholarships available?', 'Scholarship পাওয়া যায় কি?'),
      [
        b(
          "Yes. The government's Global Korea Scholarship (GKS) has an undergraduate track and a graduate track (master's and PhD) and covers airfare, Korean language training fees, tuition and monthly allowances. Most universities also give international students scholarships of 30–100% of tuition based on academic performance.",
          "হ্যাঁ। সরকারের Global Korea Scholarship (GKS)-এর undergraduate আর graduate (master's ও PhD) দুটো ভাগ আছে; এটি বিমান ভাড়া, Korean ভাষা training-এর fee, tuition আর মাসিক ভাতা দেয়। বেশিরভাগ university-ও ফলাফলের ভিত্তিতে tuition-এর ৩০–১০০% পর্যন্ত scholarship দেয়।",
        ),
      ],
      [KR_SIK_SCHOLARSHIPS],
    ),
    qa(
      'work',
      b('Can you work part-time?', 'Part-time কাজ করা যায় কি?'),
      [
        b(
          'Yes, with permission from the immigration office obtained in advance. Weekly hours depend on your degree, your year and your Korean level (for example, up to 25 weekday hours for a bachelor’s student in years 1–2 with TOPIK 3). Each degree guide has the full rule.',
          'হ্যাঁ, আগে থেকে immigration office-এর permission নিয়ে। সপ্তাহে কত ঘণ্টা, তা degree, বর্ষ আর Korean level-এর উপর নির্ভর করে (যেমন TOPIK 3 থাকলে ১ম–২য় বর্ষের bachelor’s student weekday-তে সর্বোচ্চ ২৫ ঘণ্টা)। প্রতিটি degree guide-এ পুরো নিয়ম আছে।',
        ),
      ],
      [KR_EASYLAW_WORK, KR_SIK_WORK],
    ),
    qa(
      'when',
      b('When do you apply?', 'Application কখন করতে হয়?'),
      [
        b(
          'For the March (spring) semester, typically September–November of the previous year; for the September (fall) semester, typically April–June. Each university sets its own dates. GKS undergraduate 2027 in Bangladesh: 15–30 September 2026. GKS graduate: usually February–March.',
          'March (spring) semester-এর জন্য সাধারণত আগের বছরের September–November; September (fall) semester-এর জন্য সাধারণত April–June। প্রতিটি university নিজের তারিখ ঠিক করে। Bangladesh-এ GKS undergraduate 2027: ১৫–৩০ September ২০২৬। GKS graduate: সাধারণত February–March।',
        ),
      ],
      [G, KR_EMBASSY_BD_GKS_U_2027, KR_SIK_SCHOLARSHIPS],
    ),
    qa(
      'universities',
      b('What kinds of universities are there for international students?', 'International student-দের জন্য কী ধরনের university আছে?'),
      [
        b(
          'Junior colleges, 4-year universities and graduate schools; each is either national (government-funded, generally lower tuition) or private. Some run international faculties that teach in English. Public information on every Korean university, including tuition, is on Academyinfo.',
          'Junior college, ৪ বছরের university আর graduate school; প্রতিটি হয় national (সরকারি অনুদানে চলে, tuition সাধারণত কম) নয়তো private। কিছু university-র international faculty English-এ পড়ায়। Korea-র প্রতিটি university-র tuition-সহ public তথ্য Academyinfo-তে আছে।',
        ),
      ],
      [G, KR_ACADEMYINFO],
    ),
    qa(
      'visa',
      b('Which visa do you need?', 'কোন visa লাগবে?'),
      [
        b(
          "The D-2 (Student) visa: D-2-2 for a bachelor's, D-2-3 for a master's, D-2-4 for a doctorate. You apply after admission; in Bangladesh, through the Korea Visa Application Center in Dhaka (since 2 September 2026).",
          "D-2 (Student) visa: bachelor's-এর জন্য D-2-2, master's-এর জন্য D-2-3, PhD-র জন্য D-2-4। Admission-এর পরে apply করবেন; Bangladesh-এ Dhaka-র Korea Visa Application Center-এর মাধ্যমে (২ September ২০২৬ থেকে)।",
        ),
      ],
      [KR_SIK_VISA, KR_EASYLAW_VISA, KR_EMBASSY_BD_VAC],
    ),
    qa(
      'after',
      b('Can you stay after graduating?', 'Graduation-এর পরে থাকা যায় কি?'),
      [
        b(
          'You can change to the Job Seeker visa (D-10-1) to look for professional work, for up to 2 years in 6-month steps, and later apply for a work visa such as E-7. Rules change often; check HiKorea.',
          'পেশাদার চাকরি খুঁজতে Job Seeker visa-য় (D-10-1) বদলানো যায়, ৬ মাস করে সর্বোচ্চ ২ বছর; পরে E-7-এর মতো কাজের visa-র আবেদন করা যায়। নিয়ম প্রায়ই বদলায়; HiKorea দেখুন।',
        ),
      ],
      [G, KR_HIKOREA],
    ),
  ],
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
};

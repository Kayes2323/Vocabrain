import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import { uniSite } from './kr-sources';

/**
 * South Korea: university → program layer, built the same way as Germany's
 * (lib/content/de-unis.ts). Rankings are QS World University Rankings 2027 as
 * printed on each university's topuniversities.com profile; tuition, deadlines
 * and requirements come from the university's own official pages. Anything
 * that could not be verified on an official page is left marked unverified —
 * never guessed.
 */

const READ = '2026-10-16';
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const qs = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'ranking-publisher' });
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the university’s official application page.', 'যাচাই হয়নি — university-র official আবেদনের page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Apply for the Korean D-2 student visa', 'Korea-র D-2 student visa-র আবেদন'),
  body: b('After admission, apply for a D-2 visa at the Korean Embassy/Visa Application Center in your home country. See the Korea study visa section on the country page.', 'ভর্তির পরে নিজের দেশের Korean Embassy/Visa Application Center-এ D-2 visa-র আবেদন। Country page-এর Korea study visa অংশ দেখুন।'),
};

// ------------------------------------------------------------------ sources

const QS_SNU = qs('QS World University Rankings 2027 – Seoul National University (topuniversities.com)', 'https://www.topuniversities.com/universities/seoul-national-university-snu');
const QS_KAIST = qs('QS World University Rankings 2027 – KAIST (topuniversities.com)', 'https://www.topuniversities.com/universities/korea-advanced-institute-science-technology-kaist');
const QS_YONSEI = qs('QS World University Rankings 2027 – Yonsei University (topuniversities.com)', 'https://www.topuniversities.com/universities/yonsei-university');
const QS_SKKU = qs('QS World University Rankings 2027 – Sungkyunkwan University (SKKU) (topuniversities.com)', 'https://www.topuniversities.com/universities/sungkyunkwan-university-skku');
const QS_KHU = qs('QS World University Rankings 2027 – Kyung Hee University (topuniversities.com)', 'https://www.topuniversities.com/universities/kyung-hee-university');

const SNU_REGISTRATION = uniSite('Seoul National University – Registration (tuition payment)', 'https://en.snu.ac.kr/academics/resources/registration');
const SNU_ADMISSION_NOTICE = uniSite('Seoul National University – Admissions Information / Notices', 'https://en.snu.ac.kr/admission/overview/notice');

const KAIST_ADMISSION = uniSite('KAIST – International Graduate Admissions', 'https://admission.kaist.ac.kr/intl-graduate');
const KAIST_COST = uniSite('KAIST – Cost of Studying at KAIST', 'https://admission.kaist.ac.kr/intl-graduate/FinancialSupport/CostofAttendance');
const KAIST_SCHOLARSHIP = uniSite('KAIST – KAIST Scholarship', 'https://admission.kaist.ac.kr/intl-graduate/FinancialSupport/Scholarship/KAISTScholarship');

const YONSEI_SCHEDULE = uniSite("Yonsei University Graduate School – Int'l Student Track, Submission Schedule", 'https://graduate.yonsei.ac.kr/graduate_en/admission/schedule.do');
const YONSEI_SPRING = uniSite("Yonsei University Graduate School – Int'l Student Track, Spring admission", 'https://graduate.yonsei.ac.kr/graduate_en/admission/forein_schedule.do');
const YONSEI_FALL = uniSite("Yonsei University Graduate School – Int'l Student Track, Fall admission", 'https://graduate.yonsei.ac.kr/graduate_en/admission/forein_fall_schedule.do');
const YONSEI_FEE_PDF = uniSite('Yonsei University – 2026 Graduate School Tuition and Admission Fee (PDF)', 'https://www.yonsei.ac.kr/sites/en_sc/down/2026_fee2.pdf');

const SKKU_GRAD_NOTICE = uniSite('SKKU Admissions – Graduate Notice board (international applicants)', 'https://admission-global.skku.edu/eng/etc/bbs_list.html?ctg_cd=Graduate');
const SKKU_GRAD_SCHOLARSHIP = uniSite('SKKU – Graduate scholarships for international students', 'https://www.skku.edu/eng/International/StudySKKU/Scholarship.do');

const KHU_GLOBAL_ADMISSIONS = uniSite('Kyung Hee University – Global Admissions (Graduate International)', 'https://www.khu.ac.kr/eng/user/main/view.do');
const KHU_SCHOLARSHIPS = uniSite('Kyung Hee University – Admissions Scholarships', 'https://www.khu.ac.kr/eng/user/contents/view.do?menuNo=300152');

const SIK_STATISTICS = gov('Study in Korea (Ministry of Education / NIIED, data from KEDI) – Statistics in Korea', 'https://www.studyinkorea.go.kr/ko/why/koreaStatistics.do?tab=student-status');

// ------------------------------------------------------------------ universities

const SNU: UniversityProfile = {
  id: 'kr-snu',
  countryCode: 'KR',
  name: 'Seoul National University (SNU)',
  city: 'Seoul',
  ownership: 'public',
  officialUrl: 'https://en.snu.ac.kr',
  admissionsUrl: SNU_ADMISSION_NOTICE.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '38', sourceUrl: QS_SNU.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A national university in Seoul (Gwanak-gu), South Korea’s top-ranked university. Graduate admission for international students runs through a dedicated International Admissions track, separate per department.',
    'Seoul (Gwanak-gu)-এর একটি জাতীয় university, দক্ষিণ কোরিয়ার সবচেয়ে উপরের র‍্যাঙ্কিং-এর university। International student-দের graduate ভর্তি আলাদা International Admissions track-এ হয়, department অনুযায়ী আলাদা।',
  ),
  tuition: {
    ...txt(
      'Average undergraduate tuition was KRW 6,034,163 per year (2024 figure, official page). Fees vary by college and major; the graduate tuition chart officially published is from 2015 and is out of date — check the current amount with the department before applying.',
      'Undergraduate-এর গড় tuition বছরে KRW 6,034,163 (2024-এর হিসাব, official page)। College আর major অনুযায়ী fee আলাদা; officially প্রকাশিত graduate tuition chart ২০১৫ সালের, হালনাগাদ নয় — আবেদনের আগে department-এর কাছে বর্তমান পরিমাণ যাচাই করুন।',
      'outdated',
      [SNU_REGISTRATION],
    ),
  },
  deadlines: txt(
    'Set per department and intake (Spring/Fall); SNU publishes a separate International Admissions notice for each cycle.',
    'Department আর intake (Spring/Fall) অনুযায়ী আলাদা; প্রতি cycle-এর জন্য SNU আলাদা International Admissions notice প্রকাশ করে।',
    'partly-verified',
    [SNU_ADMISSION_NOTICE],
  ),
  nextIntake: intake('varies', [SNU_ADMISSION_NOTICE]),
  admission: txt('Set by each graduate department; most require a department-level review in addition to the central Office of Admissions.', 'প্রতিটি graduate department নিজে ঠিক করে; বেশিরভাগেই central Office of Admissions-এর পাশাপাশি department-level review লাগে।', 'partly-verified', [SNU_ADMISSION_NOTICE]),
  english: txt('Set by each department (no single university-wide minimum confirmed on the official page read).', 'প্রতিটি department নিজে ঠিক করে (official page-এ কোনো একক university-wide minimum পাওয়া যায়নি)।', 'not-verified', [SNU_ADMISSION_NOTICE]),
  documents: { required: [], mayBeRequired: [b('Documents are set by each department', 'Document প্রতিটি department ঠিক করে')], status: 'not-verified', sources: [SNU_ADMISSION_NOTICE] },
  applicationFee: NOT_VERIFIED_FEE([SNU_ADMISSION_NOTICE]),
  scholarships: txt(
    'SNU President Fellowship (SPF): aimed at teaching staff from developing countries pursuing a doctoral degree — full tuition waiver for up to 6 semesters, a monthly stipend, round-trip airfare and health-insurance reimbursement. Other scholarships are set per department/cycle.',
    'SNU President Fellowship (SPF): উন্নয়নশীল দেশের শিক্ষকদের জন্য যারা doctoral degree করছেন — ৬ semester পর্যন্ত full tuition waiver, মাসিক stipend, round-trip বিমান ভাড়া আর health-insurance reimbursement। অন্য scholarship department/cycle অনুযায়ী আলাদা।',
    'partly-verified',
    [SNU_ADMISSION_NOTICE],
  ),
  applicationRoute: txt('Online application through the central Office of Admissions, with department-level review.', 'Central Office of Admissions-এর মাধ্যমে online আবেদন, department-level review সহ।', 'partly-verified', [SNU_ADMISSION_NOTICE]),
  steps: {
    items: [
      { title: b('Choose a department and intake', 'Department আর intake বেছে নিন'), body: b('Check that department’s own International Admissions notice for the cycle you want.', 'যে cycle চান তার জন্য ওই department-এর নিজস্ব International Admissions notice দেখুন।') },
      { title: b('Apply online and submit documents', 'Online আবেদন ও document জমা'), body: b('Submit the documents the department’s notice lists by its deadline.', 'Department-এর notice-এ তালিকাভুক্ত document নির্ধারিত সময়ের মধ্যে জমা দিন।') },
      VISA_STEP,
    ],
    status: 'not-verified',
    sources: [SNU_ADMISSION_NOTICE],
  },
  programs: [],
  lastVerified: READ,
};

const KAIST: UniversityProfile = {
  id: 'kr-kaist',
  countryCode: 'KR',
  name: 'KAIST (Korea Advanced Institute of Science and Technology)',
  city: 'Daejeon',
  ownership: 'public',
  officialUrl: 'https://www.kaist.ac.kr/en/',
  admissionsUrl: KAIST_ADMISSION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '65', sourceUrl: QS_KAIST.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A national research-focused institute in Daejeon; graduate programs are taught in English and most international students receive a KAIST Scholarship that covers tuition and a stipend.',
    'Daejeon-এর একটি জাতীয় research-কেন্দ্রিক institute; graduate program ইংরেজিতে পড়ানো হয় আর বেশিরভাগ international student KAIST Scholarship পান, যা tuition ও stipend কভার করে।',
  ),
  tuition: {
    ...txt(
      'Official 2023 academic-year budget: tuition KRW 19,118,000/year, plus about KRW 11,070,787/year for housing, meals, insurance and other living costs (about KRW 30,188,787/year total). Figures are from the 2023 cycle and may have changed; confirm the current year’s figure before applying.',
      '2023 শিক্ষাবর্ষের official budget: tuition বছরে KRW 19,118,000, সাথে থাকা-খাওয়া, insurance ও অন্য জীবনযাত্রার খরচ বছরে প্রায় KRW 11,070,787 (মোট প্রায় KRW 30,188,787/বছর)। পরিসংখ্যান ২০২৩ cycle-এর, বদলাতে পারে; আবেদনের আগে বর্তমান বছরের পরিমাণ যাচাই করুন।',
      'outdated',
      [KAIST_COST],
    ),
    money: { amount: 19118000, currency: 'KRW', period: 'year' },
  },
  deadlines: txt(
    'Spring 2027 entry: online application August 18 – September 1, 2026; recommendation letters due September 8, 2026; decisions announced December 18, 2026. Fall 2027 dates were not yet announced on the official page read.',
    'Spring 2027 intake: online আবেদন ১৮ August – ১ September 2026; recommendation letter-এর শেষ তারিখ ৮ September 2026; সিদ্ধান্ত ঘোষণা ১৮ December 2026। Fall 2027-এর তারিখ পড়া official page-এ এখনো ঘোষণা হয়নি।',
    'verified',
    [KAIST_ADMISSION],
  ),
  nextIntake: intake('confirmed', [KAIST_ADMISSION], b('Spring 2027 (applications August 18 – September 1, 2026)', 'Spring 2027 (আবেদন ১৮ August – ১ September 2026)')),
  admission: txt(
    'Eligible with citizenship from (or a bachelor’s/higher degree completed in) a country such as Australia, Canada, the UK or the USA, or a degree from an English-medium institution elsewhere (with a Certificate of English Medium of Instruction), or an upcoming KAIST degree.',
    'যোগ্যতা: Australia, Canada, UK বা USA-র মতো দেশের নাগরিকত্ব (বা সেখানে সম্পন্ন করা bachelor’s/উচ্চতর degree), বা অন্য কোথাও English-medium institution-এর degree (Certificate of English Medium of Instruction সহ), বা আসন্ন KAIST degree।',
    'verified',
    [KAIST_ADMISSION],
  ),
  english: txt(
    'English Proficiency Test taken on or after September 2, 2023: TOEFL iBT minimum 83 (Home Edition accepted; MyBest Scores not accepted), or IELTS Academic minimum 6.5 overall (IELTS Online accepted; One Skill Retake not accepted), or TOEIC minimum 720 (Listening & Reading), or TEPS minimum 326.',
    'English Proficiency Test ২ September 2023 বা পরে নেওয়া: TOEFL iBT সর্বনিম্ন 83 (Home Edition গ্রহণযোগ্য; MyBest Scores গ্রহণযোগ্য নয়), বা IELTS Academic সর্বনিম্ন 6.5 overall (IELTS Online গ্রহণযোগ্য; One Skill Retake গ্রহণযোগ্য নয়), বা TOEIC সর্বনিম্ন 720 (Listening & Reading), বা TEPS সর্বনিম্ন 326।',
    'verified',
    [KAIST_ADMISSION],
  ),
  documents: {
    required: [b('Online application form', 'Online application form'), b('English Proficiency Test score (where required)', 'English Proficiency Test score (যেখানে প্রয়োজন)'), b('Recommendation letter(s) submitted online by the recommender', 'Recommender-এর নিজের submit করা recommendation letter')],
    mayBeRequired: [b('Certificate of English Medium of Instruction (if your degree is from a non-English-track country)', 'Degree non-English-track দেশ থেকে হলে Certificate of English Medium of Instruction')],
    status: 'partly-verified',
    sources: [KAIST_ADMISSION],
  },
  applicationFee: NOT_VERIFIED_FEE([KAIST_ADMISSION]),
  scholarships: txt(
    'KAIST Scholarship benefits about 94% of international students: covers the full tuition fee and guarantees minimum living expenses; the exact rate can vary by student.',
    'KAIST Scholarship প্রায় 94% international student পান: পূর্ণ tuition fee কভার করে আর সর্বনিম্ন জীবনযাত্রার খরচ নিশ্চিত করে; হার student অনুযায়ী আলাদা হতে পারে।',
    'verified',
    [KAIST_SCHOLARSHIP],
  ),
  applicationRoute: txt('Online through the KAIST graduate admissions ApplyWeb portal.', 'KAIST graduate admissions-এর ApplyWeb portal-এ online।', 'verified', [KAIST_ADMISSION]),
  steps: {
    items: [
      { title: b('Create an account and apply online', 'Account খুলে online আবেদন'), body: b('Apply through the ApplyWeb portal during the online application period.', 'Online application period-এ ApplyWeb portal দিয়ে আবেদন করুন।') },
      { title: b('Submit recommendation letters', 'Recommendation letter জমা'), body: b('Your recommender submits the letter online by its own, slightly later deadline.', 'Recommender নিজে online letter জমা দেন, একটু পরের নিজস্ব deadline-এ।') },
      { title: b('Wait for the decision', 'সিদ্ধান্তের অপেক্ষা'), body: b('Decisions are announced on the date KAIST publishes for that cycle.', 'KAIST ওই cycle-এর জন্য যে তারিখ প্রকাশ করে সেদিন সিদ্ধান্ত ঘোষণা হয়।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [KAIST_ADMISSION],
  },
  programs: [
    {
      id: 'kr-kaist-grad-general',
      title: "Master's / Master's-PhD Integrated / PhD (English-taught graduate programs, all departments)",
      level: 'masters',
      languages: b('English', 'ইংরেজি'),
      englishOnly: true,
      tuition: {
        ...txt('KRW 19,118,000/year (2023 academic-year figure); most admitted international students receive a KAIST Scholarship that covers it.', 'বছরে KRW 19,118,000 (2023 শিক্ষাবর্ষের হিসাব); ভর্তি হওয়া বেশিরভাগ international student-এর জন্য KAIST Scholarship এটা কভার করে।', 'outdated', [KAIST_COST]),
        money: { amount: 19118000, currency: 'KRW', period: 'year' },
      },
      deadline: txt('Spring 2027 entry: August 18 – September 1, 2026.', 'Spring 2027 intake: ১৮ August – ১ September 2026।', 'verified', [KAIST_ADMISSION]),
      nextIntake: intake('confirmed', [KAIST_ADMISSION], b('Spring 2027', 'Spring 2027')),
      requirements: txt('Bachelor’s degree (or expected) for master’s entry; meet the English Proficiency Test minimum unless exempt by citizenship/medium of instruction.', "Master's-এ ভর্তির জন্য bachelor's degree (বা প্রত্যাশিত); nationality/medium of instruction-এ exempt না হলে English Proficiency Test-এর minimum পূরণ করতে হবে।", 'verified', [KAIST_ADMISSION]),
      english: txt('TOEFL iBT 83 / IELTS Academic 6.5 / TOEIC 720 / TEPS 326 minimum, taken on or after September 2, 2023 (unless exempt).', 'TOEFL iBT 83 / IELTS Academic 6.5 / TOEIC 720 / TEPS 326 সর্বনিম্ন, ২ September 2023 বা পরে নেওয়া (exempt না হলে)।', 'verified', [KAIST_ADMISSION]),
      applyVia: b('ApplyWeb (KAIST graduate admissions portal)', 'ApplyWeb (KAIST graduate admissions portal)'),
      url: KAIST_ADMISSION.url!,
      sources: [KAIST_ADMISSION],
      lastVerified: READ,
    },
  ],
  lastVerified: READ,
};

const YONSEI: UniversityProfile = {
  id: 'kr-yonsei',
  countryCode: 'KR',
  name: 'Yonsei University',
  city: 'Seoul',
  ownership: 'private',
  officialUrl: 'https://www.yonsei.ac.kr/en_sc/',
  admissionsUrl: YONSEI_SCHEDULE.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '42', sourceUrl: QS_YONSEI.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A major private university in Seoul with Seoul and Mirae (Wonju) campuses; the Graduate School runs a separate International Student Track with its own application windows for Spring and Fall.',
    'Seoul আর Mirae (Wonju) campus নিয়ে Seoul-এর একটি বড় private university; Graduate School-এ আলাদা International Student Track আছে, Spring আর Fall-এর জন্য নিজস্ব আবেদনের সময় সহ।',
  ),
  tuition: {
    ...txt(
      'The official tuition and admission-fee chart is published as a PDF each year; the exact current figure was not read from that PDF here — check it directly before applying.',
      'Official tuition আর admission-fee chart প্রতি বছর PDF আকারে প্রকাশ হয়; এখানে ওই PDF থেকে সঠিক বর্তমান পরিমাণ পড়া হয়নি — আবেদনের আগে সরাসরি দেখে নিন।',
      'not-verified',
      [YONSEI_FEE_PDF],
    ),
  },
  deadlines: txt(
    'Spring 2027 (Seoul Campus): application October 7–14, 2026. Fall 2026 (Seoul Campus): application April 6–13, 2026. Seoul and Mirae campus applications cannot be submitted together.',
    'Spring 2027 (Seoul Campus): আবেদন ৭–১৪ October 2026। Fall 2026 (Seoul Campus): আবেদন ৬–১৩ April 2026। Seoul আর Mirae campus-এ একসাথে আবেদন করা যায় না।',
    'verified',
    [YONSEI_SPRING, YONSEI_FALL],
  ),
  nextIntake: intake('confirmed', [YONSEI_SPRING], b('Spring 2027 (applications October 7–14, 2026)', 'Spring 2027 (আবেদন ৭–১৪ October 2026)')),
  admission: txt('Set per graduate department/program; applicants follow the Seoul Campus or Mirae Campus International Student Track guideline, not both.', 'Graduate department/program অনুযায়ী আলাদা; আবেদনকারীরা Seoul Campus বা Mirae Campus-এর একটিমাত্র International Student Track guideline অনুসরণ করেন।', 'partly-verified', [YONSEI_SCHEDULE]),
  english: txt('Set per program in the official admissions guideline PDF; not itemized on the page read.', 'Official admissions guideline PDF-এ program অনুযায়ী আলাদা; পড়া page-এ তা তালিকাভুক্ত ছিল না।', 'not-verified', [YONSEI_SPRING]),
  documents: { required: [], mayBeRequired: [b('Study and research plan', 'Study and research plan'), b('Letter of recommendation', 'Letter of recommendation'), b('School report form', 'School report form')], status: 'partly-verified', sources: [YONSEI_SPRING] },
  applicationFee: NOT_VERIFIED_FEE([YONSEI_SPRING]),
  scholarships: txt('Scholarship types include full, half or one-third tuition reduction per semester, set per program/case; not itemized university-wide on the pages read.', 'Scholarship: full, half বা one-third tuition কমানো, প্রতি semester, program/case অনুযায়ী; পড়া page-এ university-wide তালিকা নেই।', 'not-verified', [YONSEI_SCHEDULE]),
  applicationRoute: txt('Online through the Graduate School’s application system (gradnet.co.kr/yonsei), plus the documents listed in that cycle’s guideline PDF.', 'Graduate School-এর application system-এ online (gradnet.co.kr/yonsei), আর সেই cycle-এর guideline PDF-এ তালিকাভুক্ত document সহ।', 'verified', [YONSEI_SPRING]),
  steps: {
    items: [
      { title: b('Pick Seoul or Mirae campus and the intake', 'Seoul বা Mirae campus আর intake বাছুন'), body: b('Multiple applications between the two campuses are not allowed.', 'দুই campus-এ একসাথে একাধিক আবেদন করা যায় না।') },
      { title: b('Apply online within the application period', 'আবেদনের সময়ের মধ্যে online আবেদন'), body: b('Submit via the gradnet.co.kr/yonsei system and upload the documents the guideline PDF lists.', 'gradnet.co.kr/yonsei system-এ জমা দিন, guideline PDF-এ তালিকাভুক্ত document upload করুন।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [YONSEI_SPRING, YONSEI_FALL],
  },
  programs: [],
  lastVerified: READ,
};

const SKKU: UniversityProfile = {
  id: 'kr-skku',
  countryCode: 'KR',
  name: 'Sungkyunkwan University (SKKU)',
  city: 'Seoul / Suwon',
  ownership: 'private',
  officialUrl: 'https://www.skku.edu/eng',
  admissionsUrl: SKKU_GRAD_NOTICE.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '108', sourceUrl: QS_SKKU.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A major private university with campuses in Seoul (Humanities & Social Sciences) and Suwon (Natural Sciences). Degree-seeking international graduate admission is handled by Graduate Admissions, separately from the short-term exchange/visiting program.',
    'Seoul (Humanities & Social Sciences) আর Suwon (Natural Sciences) campus নিয়ে একটি বড় private university। Degree-seeking international graduate ভর্তি Graduate Admissions দেখে, স্বল্পমেয়াদী exchange/visiting program থেকে আলাদা।',
  ),
  tuition: NOT_VERIFIED_FEE([SKKU_GRAD_NOTICE]),
  deadlines: txt(
    'SKKU Graduate Admissions publishes a separate application-guide notice for each round (for example a 2027 Spring 1st Round guide); exact degree-program tuition and dates are announced per round on its own notice board.',
    'SKKU Graduate Admissions প্রতি round-এর জন্য আলাদা application guide notice প্রকাশ করে (যেমন 2027 Spring 1st Round guide); degree program-এর সঠিক tuition আর তারিখ প্রতি round-এর নিজস্ব notice board-এ ঘোষণা হয়।',
    'partly-verified',
    [SKKU_GRAD_NOTICE],
  ),
  nextIntake: intake('varies', [SKKU_GRAD_NOTICE]),
  admission: txt('Set per graduate school/department; check the current round’s application guide on the Graduate notice board.', 'Graduate school/department অনুযায়ী আলাদা; Graduate notice board-এ চলতি round-এর application guide দেখুন।', 'not-verified', [SKKU_GRAD_NOTICE]),
  english: txt('Set per program; not itemized university-wide on the page read.', 'Program অনুযায়ী আলাদা; পড়া page-এ university-wide তালিকা নেই।', 'not-verified', [SKKU_GRAD_NOTICE]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [SKKU_GRAD_NOTICE] },
  applicationFee: NOT_VERIFIED_FEE([SKKU_GRAD_NOTICE]),
  scholarships: txt('SKKU publishes graduate scholarships for international students (tuition waivers and, for STEM fields, stipend support) on its scholarship page; exact amounts are set per case.', 'SKKU international graduate student-দের জন্য scholarship প্রকাশ করে (tuition waiver আর STEM field-এ stipend support); সঠিক পরিমাণ case অনুযায়ী আলাদা।', 'partly-verified', [SKKU_GRAD_SCHOLARSHIP]),
  applicationRoute: txt('Online application through SKKU’s graduate admissions system; the current round’s notice gives the exact portal link.', 'SKKU-র graduate admissions system-এ online আবেদন; চলতি round-এর notice-এ সঠিক portal link দেওয়া থাকে।', 'partly-verified', [SKKU_GRAD_NOTICE]),
  steps: {
    items: [
      { title: b('Check the current round’s application guide', 'চলতি round-এর application guide দেখুন'), body: b('SKKU Graduate Admissions posts a fresh guide for each round on its notice board.', 'SKKU Graduate Admissions প্রতি round-এর জন্য notice board-এ নতুন guide দেয়।') },
      { title: b('Apply online and submit documents', 'Online আবেদন ও document জমা'), body: b('Follow the document list and deadline in that round’s guide.', 'সেই round-এর guide-এর document তালিকা আর deadline অনুসরণ করুন।') },
      VISA_STEP,
    ],
    status: 'not-verified',
    sources: [SKKU_GRAD_NOTICE],
  },
  programs: [],
  lastVerified: READ,
};

const KHU: UniversityProfile = {
  id: 'kr-khu',
  countryCode: 'KR',
  name: 'Kyung Hee University',
  city: 'Seoul / Yongin',
  ownership: 'private',
  officialUrl: 'https://www.khu.ac.kr/eng',
  admissionsUrl: KHU_GLOBAL_ADMISSIONS.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=309', sourceUrl: QS_KHU.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A private university with campuses in Seoul and Yongin (Gyeonggi-do); Global Admissions runs a recurring international graduate-admission cycle (Spring and Fall, plus additional recruitment rounds) with 100%-English-taught majors available.',
    'Seoul আর Yongin (Gyeonggi-do)-তে campus নিয়ে একটি private university; Global Admissions পুনরাবৃত্ত international graduate ভর্তি cycle চালায় (Spring আর Fall, সাথে additional recruitment round), 100%-ইংরেজিতে পড়ানো major-ও আছে।',
  ),
  tuition: NOT_VERIFIED_FEE([KHU_GLOBAL_ADMISSIONS]),
  deadlines: txt(
    '2027 Spring Semester graduate international admission: online application September 7 – October 2, 2026; document arrival check September 28 – October 12, 2026; interview November 28, 2026; result announcement December 11, 2026; registration by January 11, 2027.',
    '2027 Spring Semester graduate international ভর্তি: online আবেদন ৭ September – ২ October 2026; document পৌঁছানোর check ২৮ September – ১২ October 2026; interview ২৮ November 2026; ফলাফল ঘোষণা ১১ December 2026; registration ১১ January 2027-এর মধ্যে।',
    'verified',
    [KHU_GLOBAL_ADMISSIONS],
  ),
  nextIntake: intake('confirmed', [KHU_GLOBAL_ADMISSIONS], b('Spring 2027 (applications September 7 – October 2, 2026)', 'Spring 2027 (আবেদন ৭ September – ২ October 2026)')),
  admission: txt('Online application plus document submission and verification by the stated dates; an admission interview is held before the result announcement.', 'নির্ধারিত তারিখের মধ্যে online আবেদন আর document জমা/যাচাই; ফলাফল ঘোষণার আগে একটি admission interview হয়।', 'verified', [KHU_GLOBAL_ADMISSIONS]),
  english: txt('Not itemized university-wide on the page read; 100%-English-taught majors are available and some programs may set their own English requirement.', 'পড়া page-এ university-wide তালিকা নেই; 100%-ইংরেজিতে পড়ানো major আছে, কিছু program নিজস্ব English requirement ঠিক করতে পারে।', 'not-verified', [KHU_GLOBAL_ADMISSIONS]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [KHU_GLOBAL_ADMISSIONS] },
  applicationFee: NOT_VERIFIED_FEE([KHU_GLOBAL_ADMISSIONS]),
  scholarships: txt(
    'Graduate International Student Programs Globalization scholarship: full tuition for the first semester for admitted international students, and up to a 100% tuition waiver for up to 4 years after admission depending on the student.',
    'Graduate International Student Programs Globalization scholarship: ভর্তি হওয়া international student-দের প্রথম semester-এর পূর্ণ tuition, আর ভর্তির পর ৪ বছর পর্যন্ত student অনুযায়ী ১০০% পর্যন্ত tuition waiver।',
    'verified',
    [KHU_SCHOLARSHIPS],
  ),
  applicationRoute: txt('Online via the uwayapply.com application system; document submission by post (postmark deadline) to the Division of Global Admissions.', 'uwayapply.com application system-এ online; Division of Global Admissions-এ ডাকযোগে document জমা (postmark deadline)।', 'verified', [KHU_GLOBAL_ADMISSIONS]),
  steps: {
    items: [
      { title: b('Apply online within the stated window', 'নির্ধারিত সময়ের মধ্যে online আবেদন'), body: b('Apply via uwayapply.com and pay the application fee before the deadline.', 'uwayapply.com-এ আবেদন করে deadline-এর আগে application fee দিন।') },
      { title: b('Submit documents by post', 'ডাকযোগে document জমা'), body: b('Documents must be postmarked within the application period and sent to the Division of Global Admissions address.', 'Document আবেদনের সময়ের মধ্যে postmark হয়ে Division of Global Admissions-এর ঠিকানায় পাঠাতে হবে।') },
      { title: b('Attend the admission interview', 'Admission interview-এ অংশ নিন'), body: b('An interview/audition is held before the result announcement; check the notice for time and location.', 'ফলাফল ঘোষণার আগে interview/audition হয়; সময় ও স্থান notice-এ দেখুন।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [KHU_GLOBAL_ADMISSIONS],
  },
  programs: [],
  lastVerified: READ,
};

export const KR_UNI_LAYER: CountryUniversityLayer = {
  code: 'KR',
  universities: [SNU, KAIST, YONSEI, SKKU, KHU],
  visaStats: [
    {
      id: 'kr-intl-students-2025',
      scope: 'all-nationalities',
      title: b('International students in Korean higher education', 'কোরিয়ার উচ্চশিক্ষায় international student'),
      covers: b('All international students enrolled at domestic higher-education institutions, all nationalities (not Bangladesh-specific)', 'দেশীয় উচ্চশিক্ষা প্রতিষ্ঠানে ভর্তি হওয়া সব international student, সব জাতীয়তা (বাংলাদেশ-নির্দিষ্ট নয়)'),
      period: '2025',
      figures: [
        { label: b('Total international students', 'মোট international student'), value: '253,434' },
        { label: b('Master’s programs', 'Master’s program'), value: '41,278' },
        { label: b('Doctoral programs', 'Doctoral program'), value: '17,762' },
      ],
      source: SIK_STATISTICS,
      status: 'verified',
      lastVerified: READ,
    },
  ],
  unverified: [
    {
      id: 'kr-bd-d2-approval-rate',
      label: b('Bangladesh-specific D-2 student visa approval/refusal rate', 'বাংলাদেশ-নির্দিষ্ট D-2 student visa অনুমোদন/প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific D-2 approval-rate figure was found; Korea’s overall international-student count (studyinkorea.go.kr/KEDI) is verified above but is not Bangladesh-specific or visa-approval data.',
    },
    {
      id: 'kr-grad-application-fees',
      label: b('Graduate application fees at SNU, Yonsei, SKKU and Kyung Hee', 'SNU, Yonsei, SKKU ও Kyung Hee-র graduate application fee'),
      status: 'not-verified',
      note: 'Third-party sources quote figures (e.g. around KRW 90,000 for SNU), but none were confirmed on the universities’ own official pages read, so they are left out rather than guessed.',
    },
  ],
  lastVerified: READ,
};

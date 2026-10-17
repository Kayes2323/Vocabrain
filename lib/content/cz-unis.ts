import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import { CZ_BUT_JOIN, CZ_CTU_ENTRANCE, CZ_CTU_FEL_TUITION, CZ_CTU_FIT_BACHELOR, CZ_CUNI_APPLY, CZ_CUNI_TUITION, CZ_MUNI_APPLY, CZ_MUNI_FSS_ENGLISH, CZ_MUNI_TUITION, CZ_READ } from './cz-sources';

/**
 * Czech Republic: university → program layer, built the same way as
 * Lithuania's, Germany's and South Korea's (lib/content/lt-unis.ts,
 * de-unis.ts, kr-unis.ts). Rankings are QS World University Rankings 2027 as
 * printed on each university's topuniversities.com profile; tuition,
 * deadlines and requirements come from the university's (often faculty's)
 * own official pages. Czech public universities are not centrally
 * administered: each faculty can set its own fee, deadline and requirement,
 * so a university-wide figure is marked partly- or not-verified where the
 * official pages read did not give one single figure. Anything that could
 * not be verified on an official page is left marked unverified — never
 * guessed.
 */

const READ = CZ_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const qs = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'ranking-publisher' });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the university’s (or faculty’s) official application page.', 'যাচাই হয়নি — university-র (বা faculty-র) official আবেদনের page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Apply for a Czech long-term visa or residence permit for studies', 'পড়ার জন্য Czech long-term visa বা residence permit-এর আবেদন'),
  body: b('After admission, use your acceptance letter to apply for a long-term visa for studies (or a long-term residence permit for studies) at a Czech embassy, or directly at a Ministry of the Interior office. See the Czech Republic visa section on the country page.', 'ভর্তির পর, আপনার acceptance letter দিয়ে Czech embassy-তে পড়ার জন্য long-term visa (বা long-term residence permit)-এর আবেদন করুন, বা সরাসরি Ministry of the Interior office-এ। Country page-এর Czech Republic visa অংশ দেখুন।'),
};

// ------------------------------------------------------------------ sources

const QS_CUNI = qs('QS World University Rankings 2027 – Charles University (topuniversities.com)', 'https://www.topuniversities.com/universities/charles-university');
const QS_CTU = qs('QS World University Rankings 2027 – Czech Technical University in Prague (topuniversities.com)', 'https://www.topuniversities.com/universities/czech-technical-university-prague');
const QS_MUNI = qs('QS World University Rankings 2027 – Masaryk University (topuniversities.com)', 'https://www.topuniversities.com/universities/masaryk-university');
const QS_BUT = qs('QS World University Rankings 2027 – Brno University of Technology (topuniversities.com)', 'https://www.topuniversities.com/universities/brno-university-technology');

// ------------------------------------------------------------------ universities

const CUNI: UniversityProfile = {
  id: 'cz-cuni',
  countryCode: 'CZ',
  name: 'Charles University',
  city: 'Prague',
  ownership: 'public',
  officialUrl: 'https://cuni.cz/UKEN-1.html',
  admissionsUrl: CZ_CUNI_APPLY.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=273', sourceUrl: QS_CUNI.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'The oldest university in Central Europe, in Prague, with 17 independent faculties and no central admission office. Each faculty runs its own application, deadline and entrance requirements for its own study programmes.',
    'Central Europe-র সবচেয়ে পুরনো university, Prague-এ, ১৭টি independent faculty সহ আর কোনো central admission office নেই। প্রতিটি faculty নিজের study programme-এর জন্য নিজস্ব application, deadline আর ভর্তির শর্ত চালায়।',
  ),
  tuition: {
    ...txt(
      'Studies in English (and German, French or Russian) are charged tuition; across all its foreign-language programmes the university states fees ranging from EUR 40 to EUR 30,620 a year depending on the chosen programme — check the specific programme in the catalogue for its exact fee. Studies taught in Czech are free of charge, except for a fee charged only if a student exceeds the standard length of study by more than one year.',
      'ইংরেজি (আর German, French বা Russian)-এ পড়ায় tuition লাগে; এর সব বিদেশি-ভাষার programme জুড়ে university বলে fee programme অনুযায়ী বছরে EUR 40 থেকে EUR 30,620-এর মধ্যে — সঠিক fee জানতে catalogue-এ নির্দিষ্ট programme দেখুন। Czech-মাধ্যম পড়া বিনা খরচে, শুধু পড়ার স্বাভাবিক সময় এক বছরের বেশি পার হলে fee লাগে।',
      'partly-verified',
      [CZ_CUNI_TUITION],
    ),
    money: { amount: 40, max: 30620, currency: 'EUR', period: 'year' },
  },
  deadlines: NOT_VERIFIED_FEE([CZ_CUNI_APPLY]),
  nextIntake: intake('varies', [CZ_CUNI_APPLY]),
  admission: txt(
    'There is no central admission office: each of the 17 faculties sets its own application, deadline and entrance requirements (an entrance exam for some programmes; an overall profile evaluation for others). Applicants choose a study programme from the university\'s catalogue, pay an application fee, sit an entrance exam if required, and receive a letter of acceptance once admitted.',
    'কোনো central admission office নেই: ১৭টি faculty-র প্রতিটি নিজস্ব application, deadline আর ভর্তির শর্ত ঠিক করে (কিছু programme-এ entrance exam; অন্যগুলোয় overall profile evaluation)। আবেদনকারীরা university-র catalogue থেকে একটি study programme বাছেন, application fee দেন, প্রয়োজনে entrance exam দেন, আর ভর্তি হলে letter of acceptance পান।',
    'verified',
    [CZ_CUNI_APPLY],
  ),
  english: NOT_VERIFIED_FEE([CZ_CUNI_APPLY]),
  documents: {
    required: [b('Secondary-education or bachelor’s graduation documents (recognised)', 'স্বীকৃত secondary-education বা bachelor’s-এর graduation document'), b('Completed and submitted programme application', 'পূর্ণ করে জমা দেওয়া programme application'), b('Proof of payment of the application fee', 'Application fee দেওয়ার প্রমাণ')],
    mayBeRequired: [b('Entrance-exam results, where the programme requires one', 'প্রয়োজন হলে entrance-exam-এর result'), b('Faculty- and programme-specific documents', 'Faculty আর programme-specific document')],
    status: 'partly-verified',
    sources: [CZ_CUNI_APPLY],
  },
  applicationFee: NOT_VERIFIED_FEE([CZ_CUNI_APPLY]),
  scholarships: txt(
    'Charles University has its own scholarships page; the exact tiers and current deadlines were not itemized on the pages read here. The Czech Government\'s scholarship for developing countries (named Bangladesh-eligible) can be used for selected English-taught master\'s and doctoral programmes at Czech public universities, Charles University among them.',
    'Charles University-র নিজস্ব scholarships page আছে; সঠিক স্তর আর বর্তমান শেষ তারিখ এখানে পড়া page-এ তালিকাভুক্ত ছিল না। Czech সরকারের developing countries-এর scholarship (Bangladesh-যোগ্য বলে নামযুক্ত) Czech-এর public university-তে — Charles University-সহ — নির্বাচিত ইংরেজি-মাধ্যম master\'s আর doctoral programme-এর জন্য ব্যবহার করা যায়।',
    'partly-verified',
    [CZ_CUNI_TUITION],
  ),
  applicationRoute: txt('Online via each faculty\'s own application system (no central admission office).', 'প্রতিটি faculty-র নিজস্ব application system-এ online (কোনো central admission office নেই)।', 'verified', [CZ_CUNI_APPLY]),
  steps: {
    items: [
      { title: b('Choose a faculty and study programme', 'একটি faculty আর study programme বাছুন'), body: b('Browse the university\'s catalogue of study programmes; each listing states its own admission requirements and contact details.', 'University-র study programme catalogue দেখুন; প্রতিটি listing-এ নিজস্ব ভর্তির শর্ত আর contact details দেওয়া থাকে।') },
      { title: b('Submit the application and pay the fee', 'আবেদন জমা দিয়ে fee দিন'), body: b('Submission is processed by the faculty\'s own Admission Office once the application fee is paid.', 'Application fee দেওয়া হলে faculty-র নিজস্ব Admission Office আবেদন প্রক্রিয়া করে।') },
      { title: b('Sit an entrance exam, if required', 'প্রয়োজনে entrance exam দিন'), body: b('Some programmes require an entrance exam (in person or online); others assess the candidate\'s profile and documents only.', 'কিছু programme-এ entrance exam লাগে (সশরীরে বা online); অন্যগুলো কেবল candidate-এর profile আর document মূল্যায়ন করে।') },
      { title: b('Submit recognition of previous education', 'আগের পড়ার recognition জমা দিন'), body: b('Submit certificates and diplomas to the faculty by the enrolment date at the latest.', 'সনদ আর diploma অন্তত enrolment-এর তারিখের মধ্যে faculty-কে জমা দিন।') },
      { title: b('Receive your letter of acceptance', 'Letter of acceptance গ্রহণ করুন'), body: b('This document is used for your visa application and enrolment.', 'এই document visa আবেদন আর enrolment-এ ব্যবহার হয়।') },
      VISA_STEP,
      { title: b('Enrol and attend matriculation', 'Enrol করে matriculation-এ যান'), body: b('Enrolment dates are set by the faculty\'s own Admission Office.', 'Enrolment-এর তারিখ faculty-র নিজস্ব Admission Office ঠিক করে।') },
    ],
    status: 'verified',
    sources: [CZ_CUNI_APPLY],
  },
  programs: [],
  lastVerified: READ,
};

const CTU: UniversityProfile = {
  id: 'cz-ctu',
  countryCode: 'CZ',
  name: 'Czech Technical University in Prague (CTU)',
  city: 'Prague',
  ownership: 'public',
  officialUrl: 'https://www.cvut.cz/en',
  admissionsUrl: CZ_CTU_ENTRANCE.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=432', sourceUrl: QS_CTU.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A large public technical university in Prague, taught at faculty level: every study programme is offered, taught and administered by one of its faculties or institutes, each with its own deadline and entrance procedure. Applicants apply to a faculty, not to the university rectorate.',
    'Prague-এ একটি বড় সরকারি technical university, faculty level-এ পড়ানো হয়: প্রতিটি study programme এর faculty বা institute-এর একটি দ্বারা offer, পড়ানো আর administer হয়, প্রতিটির নিজস্ব deadline আর ভর্তি প্রক্রিয়া সহ। আবেদনকারীরা faculty-তে আবেদন করেন, university rectorate-এ নয়।',
  ),
  tuition: {
    ...txt(
      'Set per faculty: the Faculty of Information Technology charges CZK 64,000 per semester (about CZK 128,000 a year) for its English-taught bachelor\'s programme in Informatics; the Faculty of Electrical Engineering charges CZK 110,000 a year for bachelor\'s programmes, CZK 132,000 a year for master\'s, and CZK 1,000 a year for doctoral programmes. No single university-wide figure exists.',
      'Faculty অনুযায়ী ঠিক হয়: Faculty of Information Technology তার ইংরেজি-মাধ্যম Informatics bachelor\'s programme-এর জন্য সেমিস্টারে CZK 64,000 (বছরে প্রায় CZK 128,000) নেয়; Faculty of Electrical Engineering bachelor\'s programme-এর জন্য বছরে CZK 110,000, master\'s-এর জন্য CZK 132,000, আর doctoral programme-এর জন্য CZK 1,000 নেয়। University-জুড়ে একক কোনো সংখ্যা নেই।',
      'verified',
      [CZ_CTU_FIT_BACHELOR, CZ_CTU_FEL_TUITION],
    ),
    money: { amount: 64000, max: 132000, currency: 'CZK', period: 'semester' },
  },
  deadlines: txt(
    'Set per faculty: the Faculty of Information Technology\'s bachelor\'s application deadline was 31 March 2026, with registration from 30 June to 16 September 2026 and classes starting 21 September 2026 for that intake. The faculties and institutes each set their own dates.',
    'Faculty অনুযায়ী ঠিক হয়: Faculty of Information Technology-র bachelor\'s আবেদনের শেষ তারিখ ছিল ৩১ March 2026, registration ৩০ June থেকে ১৬ September 2026, আর সেই intake-এর ক্লাস শুরু ২১ September 2026। প্রতিটি faculty আর institute নিজস্ব তারিখ ঠিক করে।',
    'verified',
    [CZ_CTU_FIT_BACHELOR],
  ),
  nextIntake: intake('varies', [CZ_CTU_ENTRANCE]),
  admission: txt(
    'An electronic application is submitted per faculty, with an admission-procedure fee of CZK 950. Bachelor\'s applicants need a certificate of secondary-school graduation; master\'s applicants a bachelor\'s degree from an appropriate field; doctoral applicants a master\'s degree. Each faculty sets its own entrance-procedure requirements beyond these minimums.',
    'প্রতিটি faculty-তে একটি electronic application জমা দিতে হয়, admission-procedure fee CZK 950। Bachelor\'s আবেদনকারীদের secondary-school graduation-এর সনদ লাগে; master\'s আবেদনকারীদের উপযুক্ত field-এর bachelor\'s degree; doctoral আবেদনকারীদের master\'s degree। এই ন্যূনতমের বাইরে প্রতিটি faculty নিজস্ব entrance-procedure শর্ত ঠিক করে।',
    'verified',
    [CZ_CTU_ENTRANCE],
  ),
  english: NOT_VERIFIED_FEE([CZ_CTU_ENTRANCE]),
  documents: {
    required: [b('Certificate of secondary-school graduation (bachelor’s) or an appropriate prior degree (master’s/doctoral)', 'Secondary-school graduation-এর সনদ (bachelor’s) বা উপযুক্ত আগের degree (master’s/doctoral)'), b('Completed electronic application', 'পূর্ণ করা electronic application'), b('Proof that fees and charges have been paid', 'Fee আর charge দেওয়ার প্রমাণ')],
    mayBeRequired: [b('Assessment of previous foreign education', 'আগের বিদেশি পড়ার assessment'), b('Faculty-specific entrance-exam results', 'Faculty-specific entrance-exam-এর result')],
    status: 'verified',
    sources: [CZ_CTU_ENTRANCE],
  },
  applicationFee: txt('CZK 950 for the admission procedure (example: Faculty of Information Technology, which states the same amount in euros as approximately EUR 39).', 'Admission procedure-এর জন্য CZK 950 (উদাহরণ: Faculty of Information Technology, যা একই পরিমাণ euro-তে প্রায় EUR 39 বলে)।', 'verified', [CZ_CTU_FIT_BACHELOR]),
  scholarships: txt(
    'The Faculty of Electrical Engineering lists scholarships for foreign students in its master\'s programmes and merit scholarships; the exact tiers were not itemized on the page read. The Czech Government\'s scholarship for developing countries (Bangladesh-eligible) can also be used for selected English-taught programmes.',
    'Faculty of Electrical Engineering তার master\'s programme-এর বিদেশি student-দের জন্য scholarship আর merit scholarship তালিকাভুক্ত করে; সঠিক স্তর পড়া page-এ ছিল না। Czech সরকারের developing countries-এর scholarship (Bangladesh-যোগ্য) নির্বাচিত ইংরেজি-মাধ্যম programme-এর জন্যও ব্যবহার করা যায়।',
    'partly-verified',
    [CZ_CTU_FEL_TUITION],
  ),
  applicationRoute: txt('Online, per faculty, via CTU\'s electronic application system (prihlaska.cvut.cz).', 'Online, প্রতি faculty, CTU-র electronic application system-এ (prihlaska.cvut.cz)।', 'verified', [CZ_CTU_ENTRANCE]),
  steps: {
    items: [
      { title: b('Choose a faculty and programme', 'একটি faculty আর programme বাছুন'), body: b('All programmes are offered by a faculty or institute, not the rectorate — check that faculty\'s own page for its procedure.', 'সব programme একটি faculty বা institute দেয়, rectorate নয় — সেই faculty-র নিজস্ব page-এ প্রক্রিয়া দেখুন।') },
      { title: b('Submit the electronic application and pay the fee', 'Electronic application জমা দিয়ে fee দিন'), body: b('Pay the CZK 950 admission-procedure fee.', 'CZK 950 admission-procedure fee দিন।') },
      { title: b('Meet the faculty\'s entrance requirements', 'Faculty-র ভর্তির শর্ত পূরণ করুন'), body: b('Degree-level minimums apply everywhere; each faculty adds its own exam or assessment.', 'Degree-level ন্যূনতম সব জায়গায় প্রযোজ্য; প্রতিটি faculty নিজস্ব exam বা assessment যুক্ত করে।') },
      { title: b('Pay the first semester\'s tuition fee', 'প্রথম সেমিস্টারের tuition fee দিন'), body: b('Required to register into study once admitted (example: CZK 64,000 at FIT).', 'ভর্তি হওয়ার পর পড়ায় register করতে এটা লাগে (উদাহরণ: FIT-এ CZK 64,000)।') },
      VISA_STEP,
      { title: b('Register for classes', 'ক্লাসের জন্য register করুন'), body: b('Registration windows and start dates are set per faculty and intake.', 'Registration-এর সময় আর শুরুর তারিখ প্রতি faculty আর intake অনুযায়ী ঠিক হয়।') },
    ],
    status: 'verified',
    sources: [CZ_CTU_ENTRANCE, CZ_CTU_FIT_BACHELOR],
  },
  programs: [
    {
      id: 'cz-ctu-fit-bachelor',
      title: 'Informatics (English-taught Bachelor’s)',
      level: 'bachelors',
      languages: b('English', 'ইংরেজি'),
      englishOnly: true,
      tuition: {
        ...txt('CZK 64,000 per semester, payable before each semester starts.', 'সেমিস্টার শুরুর আগে সেমিস্টারে CZK 64,000 দিতে হয়।', 'verified', [CZ_CTU_FIT_BACHELOR]),
        money: { amount: 64000, currency: 'CZK', period: 'semester' },
      },
      deadline: txt('Application by 31 March 2026 (CZK 950 admission fee); registration from 30 June to 16 September 2026 for the intake starting 21 September 2026.', 'আবেদন ৩১ March 2026-এর মধ্যে (CZK 950 admission fee); ২১ September 2026-এ শুরু হওয়া intake-এর জন্য registration ৩০ June থেকে ১৬ September 2026।', 'verified', [CZ_CTU_FIT_BACHELOR]),
      nextIntake: intake('confirmed', [CZ_CTU_FIT_BACHELOR], b('Intake starting 21 September 2026', '২১ September 2026-এ শুরু হওয়া intake')),
      requirements: txt('Certificate of secondary-school graduation; the admission-procedure fee (CZK 950) must be paid when filing the application.', 'Secondary-school graduation-এর সনদ; আবেদন জমার সময় admission-procedure fee (CZK 950) দিতে হয়।', 'verified', [CZ_CTU_FIT_BACHELOR]),
      english: NOT_VERIFIED_FEE([CZ_CTU_FIT_BACHELOR]),
      applyVia: b('prihlaska.cvut.cz (online application)', 'prihlaska.cvut.cz (online application)'),
      url: CZ_CTU_FIT_BACHELOR.url!,
      sources: [CZ_CTU_FIT_BACHELOR],
      lastVerified: READ,
    },
  ],
  lastVerified: READ,
};

const MUNI: UniversityProfile = {
  id: 'cz-muni',
  countryCode: 'CZ',
  name: 'Masaryk University',
  city: 'Brno',
  ownership: 'public',
  officialUrl: 'https://www.muni.cz/en',
  admissionsUrl: CZ_MUNI_APPLY.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=454', sourceUrl: QS_MUNI.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A large public university in Brno offering bachelor\'s and master\'s programmes taught in both English and Czech, with each faculty setting its own application deadline and entrance requirements.',
    'Brno-এ একটি বড় সরকারি university, English আর Czech দুই ভাষাতেই bachelor\'s আর master\'s programme দেয়, প্রতিটি faculty নিজস্ব আবেদনের শেষ তারিখ আর ভর্তির শর্ত ঠিক করে।',
  ),
  tuition: {
    ...txt(
      'Set per faculty for English-taught programmes: for example the Faculty of Informatics charges EUR 4,500/year, the Faculty of Social Studies EUR 3,000/year (Sep 2026 intake) or EUR 3,500/year (Feb 2027 intake), the Faculty of Economics and Administration CZK 100,000–120,000/year, and the Faculty of Medicine CZK 380,000/year for General Medicine. Czech-taught programmes are completely tuition-free (a serious working knowledge of Czech is required).',
      'ইংরেজি-মাধ্যম programme-এর fee faculty অনুযায়ী ঠিক হয়: যেমন Faculty of Informatics বছরে EUR 4,500, Faculty of Social Studies বছরে EUR 3,000 (Sep 2026 intake) বা EUR 3,500 (Feb 2027 intake), Faculty of Economics and Administration বছরে CZK 100,000–120,000, আর Faculty of Medicine-এ General Medicine-এর জন্য বছরে CZK 380,000। Czech-মাধ্যম programme সম্পূর্ণ tuition-free (তবে Czech ভাষায় গুরুত্বপূর্ণ দক্ষতা লাগে)।',
      'verified',
      [CZ_MUNI_TUITION],
    ),
    money: { amount: 3000, max: 380000, currency: 'EUR', period: 'year' },
  },
  deadlines: txt(
    'Set per faculty: for example the Faculty of Education and Faculty of Arts (bachelor\'s) run 1 October–31 March / 1 December–30 April application windows, the Faculty of Pharmacy 1 December–31 May (non-EU) or 1 December–31 July (EU), and the Faculty of Social Studies two intakes (1 November–15 May for September; 1 July–31 October for February).',
    'Faculty অনুযায়ী ঠিক হয়: যেমন Faculty of Education আর Faculty of Arts (bachelor\'s)-এ ১ October–৩১ March / ১ December–৩০ April আবেদনের সময়, Faculty of Pharmacy-তে ১ December–৩১ May (non-EU) বা ১ December–৩১ July (EU), আর Faculty of Social Studies-এ দুটি intake (September-এর জন্য ১ November–১৫ May; February-এর জন্য ১ July–৩১ October)।',
    'verified',
    [CZ_MUNI_APPLY],
  ),
  nextIntake: intake('varies', [CZ_MUNI_APPLY]),
  admission: txt(
    'Applications are submitted per faculty, by its own deadline, with each faculty stating its own admission requirements (an entrance exam or scored test for some programmes, document-based evaluation for others).',
    'আবেদন প্রতিটি faculty-তে, এর নিজস্ব শেষ তারিখের মধ্যে জমা দিতে হয়, প্রতিটি faculty নিজস্ব ভর্তির শর্ত বলে (কিছু programme-এ entrance exam বা score করা test, অন্যগুলোয় document-ভিত্তিক মূল্যায়ন)।',
    'verified',
    [CZ_MUNI_APPLY],
  ),
  english: txt(
    'The Faculty of Social Studies states a B2-level requirement for English-taught bachelor\'s programmes, accepted via IELTS Academic/General (5.5–6.5), TOEFL iBT (72), TOEIC, telc English B2, or equivalent. Other faculties set their own list.',
    'Faculty of Social Studies ইংরেজি-মাধ্যম bachelor\'s programme-এর জন্য B2-level শর্ত বলে, IELTS Academic/General (5.5–6.5), TOEFL iBT (72), TOEIC, telc English B2, বা সমমানের মাধ্যমে গ্রহণযোগ্য। অন্য faculty নিজস্ব তালিকা ঠিক করে।',
    'partly-verified',
    [CZ_MUNI_FSS_ENGLISH],
  ),
  documents: {
    required: [b('Secondary-education or prior-degree documents', 'Secondary-education বা আগের degree-র document'), b('Completed faculty application', 'পূর্ণ করা faculty application')],
    mayBeRequired: [b('English-proficiency certificate (programme-dependent)', 'ইংরেজি-দক্ষতার সনদ (programme-নির্ভর)'), b('Entrance-exam or scored-test results', 'Entrance-exam বা score করা test-এর result')],
    status: 'partly-verified',
    sources: [CZ_MUNI_APPLY],
  },
  applicationFee: NOT_VERIFIED_FEE([CZ_MUNI_APPLY]),
  scholarships: txt(
    'Masaryk University offers an accommodation grant each semester to eligible full-time students (not within the standard length of study yet, no permanent address in Brno), faculty-run scholarships, and administers the Ministry of Education, Youth and Sports\' government scholarship for international students and PhD candidates; it also certifies US Federal Direct Student Loans.',
    'Masaryk University যোগ্য full-time student-দের (স্বাভাবিক পড়ার সময় পার হয়নি, Brno-তে স্থায়ী ঠিকানা নেই) প্রতি সেমিস্টারে accommodation grant দেয়, faculty-চালিত scholarship দেয়, আর international student আর PhD candidate-দের জন্য Ministry of Education, Youth and Sports-এর সরকারি scholarship administer করে; US Federal Direct Student Loan-ও certify করে।',
    'verified',
    [CZ_MUNI_TUITION],
  ),
  applicationRoute: txt('Online, per faculty, via the university\'s own Information System.', 'Online, প্রতি faculty, university-র নিজস্ব Information System-এ।', 'verified', [CZ_MUNI_APPLY]),
  steps: {
    items: [
      { title: b('Choose a faculty and decide Czech or English', 'একটি faculty বাছুন আর Czech বা English ঠিক করুন'), body: b('Czech-taught programmes are tuition-free but need a serious working knowledge of Czech.', 'Czech-মাধ্যম programme tuition-free, কিন্তু Czech ভাষায় গুরুত্বপূর্ণ দক্ষতা লাগে।') },
      { title: b('Apply within the faculty\'s window', 'Faculty-র সময়ের মধ্যে আবেদন করুন'), body: b('Each faculty sets its own application period — some run two intakes a year.', 'প্রতিটি faculty নিজস্ব আবেদনের সময় ঠিক করে — কিছু বছরে দুটি intake চালায়।') },
      { title: b('Meet entrance requirements', 'ভর্তির শর্ত পূরণ করুন'), body: b('An entrance exam, scored test or document-based evaluation, depending on the faculty.', 'Faculty অনুযায়ী entrance exam, score করা test, বা document-ভিত্তিক মূল্যায়ন।') },
      VISA_STEP,
      { title: b('Apply for the accommodation grant, if eligible', 'যোগ্য হলে accommodation grant-এর আবেদন করুন'), body: b('Submitted each November (autumn semester) or April (spring semester) through the university\'s Information System.', 'University-র Information System-এর মাধ্যমে প্রতি November (autumn semester) বা April (spring semester) জমা দিতে হয়।') },
    ],
    status: 'verified',
    sources: [CZ_MUNI_APPLY, CZ_MUNI_TUITION],
  },
  programs: [],
  lastVerified: READ,
};

const BUT: UniversityProfile = {
  id: 'cz-but',
  countryCode: 'CZ',
  name: 'Brno University of Technology (BUT/VUT)',
  city: 'Brno',
  ownership: 'public',
  officialUrl: 'https://www.vut.cz/en',
  admissionsUrl: CZ_BUT_JOIN.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=588', sourceUrl: QS_BUT.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A public technical university in Brno with 8 faculties and over 160 study programmes in Czech and English; the fourth-highest-ranked Czech university in QS World University Rankings 2027.',
    'Brno-তে ৮টি faculty আর ১৬০+ Czech আর English study programme সহ একটি সরকারি technical university; QS World University Rankings 2027-এ চতুর্থ-সর্বোচ্চ-ranked Czech university।',
  ),
  tuition: {
    ...txt(
      'Set per faculty and programme: non-EU bachelor\'s and master\'s tuition examples read range from EUR 1,000/year (Faculty of Electrical Engineering and Communication) to EUR 5,500/year (Faculty of Architecture); the university states fees are usually between EUR 1,000 and EUR 3,500 a year overall, though some programmes exceed that range. A handful of double-degree programmes are tuition-exempt.',
      'Faculty আর programme অনুযায়ী ঠিক হয়: পড়া উদাহরণে non-EU bachelor\'s আর master\'s tuition বছরে EUR 1,000 (Faculty of Electrical Engineering and Communication) থেকে EUR 5,500 (Faculty of Architecture) পর্যন্ত; university বলে সামগ্রিকভাবে fee সাধারণত বছরে EUR 1,000 থেকে EUR 3,500-এর মধ্যে, তবে কিছু programme সেই range ছাড়িয়ে যায়। কয়েকটি double-degree programme tuition-exempt।',
      'verified',
      [CZ_BUT_JOIN],
    ),
    money: { amount: 1000, max: 5500, currency: 'EUR', period: 'year' },
  },
  deadlines: txt(
    'Set per faculty and programme: for example the Faculty of Architecture\'s bachelor\'s programme closed 8 February 2027, and the Faculty of Civil Engineering\'s bachelor\'s and master\'s programmes closed 31 May 2027. Many 2026/2027-intake programmes on the page read already show "Applications are closed."',
    'Faculty আর programme অনুযায়ী ঠিক হয়: যেমন Faculty of Architecture-র bachelor\'s programme ৮ February 2027-এ বন্ধ হয়েছে, আর Faculty of Civil Engineering-র bachelor\'s আর master\'s programme ৩১ May 2027-এ। পড়া page-এ 2026/2027-intake-এর অনেক programme-ই "Applications are closed" দেখায়।',
    'needs-review',
    [CZ_BUT_JOIN],
  ),
  nextIntake: intake('needs-review', [CZ_BUT_JOIN]),
  admission: txt(
    'Admission procedure and the e-application vary by faculty; the fee for submitting the e-application is EUR 28. Six steps are listed university-wide: choose a programme, check the admission procedure, submit the electronic application, pass the entrance exam, apply for a visa if needed, and validate previous education.',
    'Admission procedure আর e-application faculty অনুযায়ী আলাদা; e-application জমার fee EUR 28। University-জুড়ে ছয়টি step তালিকাভুক্ত: programme বাছুন, admission procedure দেখুন, electronic application জমা দিন, entrance exam দিন, প্রয়োজনে visa-র আবেদন করুন, আর আগের পড়া validate করুন।',
    'verified',
    [CZ_BUT_JOIN],
  ),
  english: NOT_VERIFIED_FEE([CZ_BUT_JOIN]),
  documents: {
    required: [b('Completed electronic application (e-application)', 'পূর্ণ করা electronic application (e-application)'), b('Proof of payment of the EUR 28 e-application fee', 'EUR 28 e-application fee দেওয়ার প্রমাণ')],
    mayBeRequired: [b('Faculty-specific entrance-exam results', 'Faculty-specific entrance-exam-এর result'), b('Validation of previous education', 'আগের পড়ার validation')],
    status: 'partly-verified',
    sources: [CZ_BUT_JOIN],
  },
  applicationFee: txt('EUR 28 for submitting the e-application.', 'E-application জমার জন্য EUR 28।', 'verified', [CZ_BUT_JOIN]),
  scholarships: txt(
    'The university offers accommodation scholarships and scholarships for outstanding study results to all students, plus a scholarship covering half the tuition fee for non-EU master\'s applicants (administered with JCMM, a regional agency); several individual master\'s programmes also flag their own "scholarship available" badge.',
    'University সব student-কে accommodation scholarship আর ভালো result-এর জন্য scholarship দেয়, সাথে non-EU master\'s আবেদনকারীদের জন্য tuition fee-র অর্ধেক কভার করা একটি scholarship (JCMM, একটি regional agency-র সাথে administer করা); আলাদা কিছু master\'s programme-এ নিজস্ব "scholarship available" badge-ও দেখায়।',
    'partly-verified',
    [CZ_BUT_JOIN],
  ),
  applicationRoute: txt('Online via the university\'s e-application system (vutbr.cz/eprihlaska), per faculty.', 'University-র e-application system-এ (vutbr.cz/eprihlaska) online, প্রতি faculty।', 'verified', [CZ_BUT_JOIN]),
  steps: {
    items: [
      { title: b('Choose your study programme', 'আপনার study programme বাছুন'), body: b('160+ programmes across 8 faculties, in Czech and English.', '৮টি faculty জুড়ে ১৬০+ programme, Czech আর English-এ।') },
      { title: b('Check the admission procedure', 'Admission procedure দেখুন'), body: b('Admission procedure varies by programme and faculty — visit that faculty\'s own website.', 'Admission procedure programme আর faculty অনুযায়ী আলাদা — সেই faculty-র নিজস্ব website দেখুন।') },
      { title: b('Submit the electronic application', 'Electronic application জমা দিন'), body: b('Pay the EUR 28 e-application fee.', 'EUR 28 e-application fee দিন।') },
      { title: b('Pass the entrance exam', 'Entrance exam দিন'), body: b('Set per faculty and programme.', 'Faculty আর programme অনুযায়ী ঠিক হয়।') },
      VISA_STEP,
      { title: b('Validate your previous education', 'আগের পড়া validate করুন'), body: b('Required before enrolment is finalised.', 'Enrolment নিশ্চিত হওয়ার আগে লাগে।') },
    ],
    status: 'verified',
    sources: [CZ_BUT_JOIN],
  },
  programs: [],
  lastVerified: READ,
};

export const CZ_UNI_LAYER: CountryUniversityLayer = {
  code: 'CZ',
  universities: [BUT, CTU, CUNI, MUNI],
  visaStats: [],
  unverified: [
    {
      id: 'cz-bd-visa-approval-rate',
      label: b('Bangladesh-specific long-term visa/residence-permit (study) approval or refusal rate', 'বাংলাদেশ-নির্দিষ্ট long-term visa/residence-permit (study) অনুমোদন বা প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific visa or residence-permit approval-rate figure, or a verified country-wide international-student headcount broken down by nationality from an official Czech statistics source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'cz-english-requirements-by-faculty',
      label: b('A single, university-wide minimum English score for every Czech university', 'প্রতিটি Czech university-র জন্য একক, university-জুড়ে ন্যূনতম English score'),
      status: 'not-verified',
      note: 'Czech public universities set English requirements per faculty and programme, not centrally; only individual faculty examples (e.g. Masaryk\'s Faculty of Social Studies) could be verified from an official page, so no single figure is shown for a university as a whole.',
    },
  ],
  lastVerified: READ,
};

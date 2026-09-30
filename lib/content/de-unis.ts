import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import { DE_RWTH_FAQ, DE_STUTTGART_FEES } from './de-sources';

/**
 * Germany: university → program layer. Rankings are QS World University
 * Rankings 2027 as printed on each university's topuniversities.com profile;
 * programs, fees and deadlines come from the university's own pages or the
 * DAAD programme databases (Germany's official national portal). Anything that
 * could not be verified is left out and listed as unverified — never guessed.
 */

const READ = '2026-09-29';
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const gov = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-government' });
const uniSrc = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'official-university' });
const qs = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'ranking-publisher' });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the university’s application page.', 'যাচাই হয়নি — university-র আবেদনের page দেখুন।', 'not-verified', sources);
const VISA_STEP = { title: b('Apply for the German student visa', 'Germany-র student visa-র আবেদন'), body: b('After admission, apply for a national (D) visa for study. See the Germany study visa section on the country page.', 'ভর্তির পরে পড়াশোনার জন্য national (D) visa-র আবেদন। Country page-এর Germany study visa অংশ দেখুন।') };

// ------------------------------------------------------------------ sources

const QS_TUM = qs('QS World University Rankings 2027 – Technical University of Munich (topuniversities.com)', 'https://www.topuniversities.com/universities/technical-university-munich');
const QS_LMU = qs('QS World University Rankings 2027 – Ludwig-Maximilians-Universität München (topuniversities.com)', 'https://www.topuniversities.com/universities/ludwig-maximilians-universitat-munchen');
const QS_HD = qs('QS World University Rankings 2027 – Universität Heidelberg (topuniversities.com)', 'https://www.topuniversities.com/universities/universitat-heidelberg');
const QS_RWTH = qs('QS World University Rankings 2027 – RWTH Aachen University (topuniversities.com)', 'https://www.topuniversities.com/universities/rwth-aachen-university');
const QS_KIT = qs('QS World University Rankings 2027 – KIT, Karlsruhe Institute of Technology (topuniversities.com)', 'https://www.topuniversities.com/universities/kit-karlsruhe-institute-technology');
const QS_TUB = qs('QS World University Rankings 2027 – Technische Universität Berlin (topuniversities.com)', 'https://www.topuniversities.com/universities/technische-universitat-berlin-tu-berlin');
const QS_STU = qs('QS World University Rankings 2027 – Universität Stuttgart (topuniversities.com)', 'https://www.topuniversities.com/universities/universitat-stuttgart');

const TUM_FEES = uniSrc('TUM – Tuition fees for students from non-EU countries', 'https://www.tum.de/en/studies/fees/tuition');
const TUM_DEA = uniSrc('TUM – Data Engineering and Analytics, Master of Science (M.Sc.)', 'https://www.tum.de/en/studies/degree-programs/detail/data-engineering-and-analytics-master-of-science-msc');
const TUM_WAIVER = uniSrc('TUM – Scholarships and waivers for international students', 'https://www.tum.de/en/studies/fees/tuition/scholarships-and-waivers');
const LMU_FEES = uniSrc('LMU Munich – Fees and tuition fees', 'https://www.lmu.de/en/workspace-for-students/abc-study-guide/fees-and-tuition-fees/');
const LMU_DATES = uniSrc('LMU Munich – Dates and deadlines for international degree students', 'https://www.lmu.de/en/study/degree-students/dates-and-deadlines/');
const LMU_MASTER_GUIDE = uniSrc("LMU Munich – Guide to applying for a master's degree program", 'https://www.lmu.de/en/study/degree-students/applications-for-admission/guidelines-and-faqs/guide-to-applying-for-a-masters-degree/');
const LMU_STAT = uniSrc("LMU Munich, Department of Statistics – Information for those interested in the Master's program", 'https://www.stat.lmu.de/en/studies/interested-master/');
const DAAD_LMU_STAT = gov('DAAD – Statistics and Data Science (Master), LMU Munich', 'https://www.daad.de/en/studying-in-germany/universities/all-degree-programmes/detail/ludwig-maximilians-university-munich-statistics-and-data-science-w32676/?hec-id=w32676');
const HD_FEES = uniSrc('Heidelberg University – Tuition fees for international students', 'https://www.uni-heidelberg.de/en/study/management-of-studies/semester-fees/tuition-fees-for-international-students');
const DAAD_HD_SC = gov('DAAD – Scientific Computing (Master), Heidelberg University', 'https://www.daad.de/en/studying-in-germany/universities/all-degree-programmes/detail/heidelberg-university-scientific-computing-w28686/?hec-id=w28686');
const RWTH_INTL_MASTER = uniSrc('RWTH Aachen University – International Applicants: Master', 'https://www.rwth-aachen.de/cms/root/studium/vor-dem-studium/bewerbung-um-einen-studienplatz/master-bewerbung/~dqml/bewerbung-master-internationale/?lidx=1');
const RWTH_INTL_PROGRAMS = uniSrc("RWTH Aachen University – International (English-taught) Master's degree programs", 'https://www.rwth-aachen.de/cms/root/studium/vor-dem-studium/studiengaenge/~csei/internationale-masterprogramme/?lidx=1');
const DAAD_RWTH_SSE = gov('DAAD International Programmes – Software Systems Engineering, RWTH Aachen University', 'https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/3696/');
const KIT_FEES = uniSrc('KIT International Affairs – Tuition fees', 'https://www.intl.kit.edu/istudies/12606.php');
const TUB_FINANCE = uniSrc('TU Berlin – Financing your studies', 'https://www.tu.berlin/en/studying/organizing-your-studies/financing-your-studies');
const TUB_SEMESTER = uniSrc('TU Berlin – Semester fees', 'https://www.tu.berlin/en/studierendensekretariat/topics-a-z/semester-fees');
const DAAD_TUB_CS = gov('DAAD – Computer Science (Master), TU Berlin', 'https://www.daad.de/en/studying-in-germany/universities/all-degree-programmes/detail/berlin-university-of-technology-computer-science-w15731/?hec-id=w15731');
const STU_INFOTECH = uniSrc('University of Stuttgart – Information Technology (INFOTECH), M.Sc.', 'https://www.uni-stuttgart.de/en/study/study-programs/Information-Technology-INFOTECH-M.Sc./');
const DAAD_STU_INFOTECH = gov('DAAD International Programmes – Information Technology (INFOTECH), University of Stuttgart', 'https://www2.daad.de/deutschland/studienangebote/international-programmes/en/detail/3677/');
const AA_VISA_STATS = gov('Federal Foreign Office (Auswärtiges Amt) – Statistics on processed visas', 'https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt/2231558-2231558');

const BW_FEE_EN = 'EUR 1,500 per semester for students from outside the EU/EEA (Baden-Württemberg state rule), plus the semester fee.';
const BW_FEE_BN = 'EU/EEA-র বাইরের student-দের প্রতি semester-এ EUR 1,500 (Baden-Württemberg রাজ্যের নিয়ম), সঙ্গে semester fee।';

// ------------------------------------------------------------------ universities

const TUM: UniversityProfile = {
  id: 'de-tum',
  countryCode: 'DE',
  name: 'Technical University of Munich (TUM)',
  city: 'Munich',
  ownership: 'public',
  officialUrl: 'https://www.tum.de/en/',
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '25', sourceUrl: QS_TUM.url!, lastVerified: READ, status: 'verified' },
  overview: b('A public university in Munich. Since winter semester 2024/25, newly enrolling students from non-EU countries pay tuition fees for bachelor’s and master’s programs.', 'Munich-এর একটি সরকারি university। Winter semester 2024/25 থেকে non-EU দেশের নতুন ভর্তি হওয়া student-রা bachelor’s আর master’s program-এ tuition fee দেন।'),
  tuition: {
    ...txt("Non-EU students: bachelor's programs usually EUR 2,000 or 3,000 per semester; master's programs usually EUR 4,000 or 6,000 per semester, depending on the program. Doctorates are not charged these fees.", "Non-EU student: bachelor's program-এ সাধারণত প্রতি semester-এ EUR 2,000 বা 3,000; master's-এ সাধারণত EUR 4,000 বা 6,000, program অনুযায়ী। Doctorate-এ এই fee নেই।", 'verified', [TUM_FEES]),
    money: { amount: 2000, max: 6000, currency: 'EUR', period: 'semester' },
  },
  deadlines: txt('Deadlines vary by program — each program page lists its own application periods.', 'শেষ তারিখ program অনুযায়ী আলাদা — প্রতিটি program page-এ নিজস্ব আবেদনের সময় দেওয়া আছে।', 'verified', [TUM_DEA]),
  nextIntake: intake('varies', [TUM_DEA]),
  admission: txt('Set per program; many master’s programs use an aptitude assessment. Applicants whose qualification was obtained outside Germany may need a preliminary documentation (VPD) from uni-assist.', 'Program অনুযায়ী; অনেক master’s program-এ aptitude assessment হয়। Germany-র বাইরের qualification হলে uni-assist-এর preliminary documentation (VPD) লাগতে পারে।', 'partly-verified', [TUM_DEA]),
  english: txt('Varies by program (see each program).', 'Program অনুযায়ী আলাদা (প্রতিটি program দেখুন)।', 'partly-verified', [TUM_DEA]),
  documents: {
    required: [b('Degree certificate or transcript of studies to date', 'Degree certificate বা এ পর্যন্ত পড়ার transcript'), b('Proof of English proficiency', 'ইংরেজি দক্ষতার প্রমাণ'), b('Passport', 'Passport'), b('Résumé', 'Résumé (CV)')],
    mayBeRequired: [b('Statement of purpose, essay, curricular analysis (program-specific)', 'Statement of purpose, essay, curricular analysis (program অনুযায়ী)'), b('Preliminary documentation (VPD) for qualifications from outside Germany', 'Germany-র বাইরের qualification-এর জন্য preliminary documentation (VPD)')],
    status: 'partly-verified',
    sources: [TUM_DEA],
  },
  applicationFee: NOT_VERIFIED_FEE([TUM_DEA]),
  scholarships: txt('TUM offers a need-based waiver scholarship that waives the international tuition fees for the standard duration of the program (applied for before the first semester).', 'TUM প্রয়োজনভিত্তিক waiver scholarship দেয়, যা program-এর নির্ধারিত সময় জুড়ে international tuition fee মওকুফ করে (প্রথম semester-এর আগে আবেদন)।', 'verified', [TUM_WAIVER]),
  applicationRoute: txt('Online through the TUMonline application portal.', 'TUMonline application portal-এ online।', 'verified', [TUM_DEA]),
  steps: {
    items: [
      { title: b('Choose a program and check its application period', 'Program বেছে আবেদনের সময় দেখুন'), body: b('Each TUM program lists its own winter and summer application periods.', 'TUM-এর প্রতিটি program নিজের winter আর summer আবেদনের সময় দেয়।') },
      { title: b('Get a VPD if needed', 'লাগলে VPD নিন'), body: b('If your qualification was obtained outside Germany, the program may require a preliminary documentation (VPD) from uni-assist.', 'Germany-র বাইরের qualification হলে program uni-assist-এর preliminary documentation (VPD) চাইতে পারে।') },
      { title: b('Apply in TUMonline', 'TUMonline-এ আবেদন'), body: b('Create an account and upload the documents the program lists (for example transcripts, English proof, statement of purpose, résumé, passport).', 'Account খুলে program-এর তালিকার document upload করুন (যেমন transcript, ইংরেজির প্রমাণ, statement of purpose, résumé, passport)।') },
      { title: b('Aptitude assessment', 'Aptitude assessment'), body: b('Many master’s programs assess applicants in an aptitude assessment; the program page states the procedure.', 'অনেক master’s program aptitude assessment-এ মূল্যায়ন করে; পদ্ধতি program page-এ লেখা।') },
      { title: b('Admission, fees and enrolment', 'ভর্তি, fee আর enrolment'), body: b('After admission, pay the semester fee and, if it applies to you, the international tuition fee, then enrol.', 'ভর্তির পরে semester fee আর প্রযোজ্য হলে international tuition fee দিয়ে enrol করুন।') },
      VISA_STEP,
    ],
    status: 'partly-verified',
    sources: [TUM_DEA, TUM_FEES],
  },
  programs: [
    {
      id: 'de-tum-dea',
      title: 'Data Engineering and Analytics',
      level: 'masters',
      languages: b('Usually English (most modules); some courses may be taught in German', 'সাধারণত ইংরেজি (বেশিরভাগ module); কিছু course German-এ হতে পারে'),
      englishOnly: false,
      duration: b('4 semesters', '৪ semester'),
      tuition: { ...txt('EUR 6,000 per semester for international students from third countries.', 'Third country-র international student-দের প্রতি semester-এ EUR 6,000।', 'verified', [TUM_DEA]), money: { amount: 6000, currency: 'EUR', period: 'semester' } },
      deadline: txt('Winter semester: 1 February – 31 May. Summer semester: 1 October – 30 November.', 'Winter semester: ১ February – ৩১ May। Summer semester: ১ October – ৩০ November।', 'verified', [TUM_DEA]),
      nextIntake: intake('confirmed', [TUM_DEA], b('Summer semester 2027 (applications 1 October – 30 November 2026)', 'Summer semester 2027 (আবেদন ১ October – ৩০ November 2026)')),
      requirements: txt('Aptitude assessment for the master’s program.', 'Master’s program-এর জন্য aptitude assessment।', 'verified', [TUM_DEA]),
      english: txt('Sufficient English language skills; the exact accepted tests and scores are not stated on the program page read.', 'যথেষ্ট ইংরেজি দক্ষতা; গ্রহণযোগ্য test আর score পড়া program page-এ লেখা নেই।', 'partly-verified', [TUM_DEA]),
      documents: txt('Degree certificate or transcript, transcript of records, English proof, statement of purpose, essay, curriculum and curricular analysis, résumé, passport, and a VPD if the qualification was obtained outside Germany.', 'Degree certificate বা transcript, transcript of records, ইংরেজির প্রমাণ, statement of purpose, essay, curriculum ও curricular analysis, résumé, passport, আর Germany-র বাইরের qualification হলে VPD।', 'verified', [TUM_DEA]),
      applyVia: b('TUMonline', 'TUMonline'),
      url: TUM_DEA.url!,
      sources: [TUM_DEA],
      lastVerified: READ,
    },
  ],
  lastVerified: READ,
};

const LMU: UniversityProfile = {
  id: 'de-lmu',
  countryCode: 'DE',
  name: 'LMU Munich (Ludwig-Maximilians-Universität München)',
  city: 'Munich',
  ownership: 'public',
  officialUrl: 'https://www.lmu.de/en/',
  admissionsUrl: LMU_MASTER_GUIDE.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '61', sourceUrl: QS_LMU.url!, lastVerified: READ, status: 'verified' },
  overview: b('A public university in Munich. International degree students register with the LMU International Office in addition to applying to the department.', 'Munich-এর একটি সরকারি university। International degree student-রা department-এ আবেদনের পাশাপাশি LMU International Office-এও আবেদন করেন।'),
  tuition: txt('No tuition fees are charged (since winter semester 2013/14). All students pay the Munich Student Union (Studierendenwerk) fee each semester.', 'কোনো tuition fee নেওয়া হয় না (winter semester 2013/14 থেকে)। সব student প্রতি semester-এ Munich Student Union (Studierendenwerk)-এর fee দেন।', 'verified', [LMU_FEES]),
  deadlines: txt('International Office deadlines: 15 January (summer semester) and 15 July (winter semester). Departments may set earlier deadlines.', 'International Office-এর শেষ তারিখ: ১৫ January (summer semester) আর ১৫ July (winter semester)। Department আগের শেষ তারিখ দিতে পারে।', 'verified', [LMU_DATES, LMU_MASTER_GUIDE]),
  nextIntake: intake('varies', [LMU_DATES]),
  admission: txt('Set by each program (department).', 'প্রতিটি program (department) ঠিক করে।', 'partly-verified', [LMU_MASTER_GUIDE]),
  english: txt('Varies by program (see each program).', 'Program অনুযায়ী আলাদা (প্রতিটি program দেখুন)।', 'partly-verified', [LMU_STAT]),
  documents: { required: [], mayBeRequired: [b('Documents are set by each department', 'Document প্রতিটি department ঠিক করে')], status: 'not-verified', sources: [LMU_MASTER_GUIDE] },
  applicationFee: NOT_VERIFIED_FEE([LMU_MASTER_GUIDE]),
  scholarships: txt('Not verified here.', 'এখানে যাচাই হয়নি।', 'not-verified', [LMU_FEES]),
  applicationRoute: txt('Apply to the department and, separately, register with the LMU International Office (15 January for summer, 15 July for winter).', 'Department-এ আবেদন, আর আলাদাভাবে LMU International Office-এ নিবন্ধন (summer-এর জন্য ১৫ January, winter-এর জন্য ১৫ July)।', 'verified', [LMU_MASTER_GUIDE]),
  steps: {
    items: [
      { title: b('Choose a program and check the department timeline', 'Program বেছে department-এর সময়সূচি দেখুন'), body: b('Departments set their own application window and deadline, which can be earlier than the International Office deadline.', 'Department নিজের আবেদনের সময় আর শেষ তারিখ ঠিক করে, যা International Office-এর চেয়ে আগে হতে পারে।') },
      { title: b('Apply to the department', 'Department-এ আবেদন'), body: b('Submit the department application (for example, the Statistics department runs an aptitude assessment).', 'Department-এর আবেদন জমা দিন (যেমন Statistics department aptitude assessment নেয়)।') },
      { title: b('Register with the International Office', 'International Office-এ নিবন্ধন'), body: b('International applicants also apply separately to the LMU International Office by 15 January (summer) or 15 July (winter).', 'International আবেদনকারীরা আলাদাভাবে LMU International Office-এ ১৫ January (summer) বা ১৫ July (winter)-এর মধ্যে আবেদন করেন।') },
      { title: b('Admission and enrolment', 'ভর্তি আর enrolment'), body: b('After admission, pay the Student Union fee and enrol.', 'ভর্তির পরে Student Union fee দিয়ে enrol করুন।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [LMU_MASTER_GUIDE, LMU_STAT, LMU_FEES],
  },
  programs: [
    {
      id: 'de-lmu-stat-ds',
      title: 'Statistics and Data Science',
      level: 'masters',
      faculty: 'Department of Statistics',
      languages: b('English', 'ইংরেজি'),
      englishOnly: true,
      duration: b('4 semesters', '৪ semester'),
      tuition: txt('No tuition fees at LMU; the Student Union fee applies.', 'LMU-তে tuition fee নেই; Student Union fee প্রযোজ্য।', 'verified', [LMU_FEES]),
      deadline: txt('Winter: portal opens 1 April, department deadline 15 May, International Office 15 July. Summer: portal opens 15 October, department deadline 15 November, International Office 15 January.', 'Winter: portal খোলে ১ April, department-এর শেষ তারিখ ১৫ May, International Office ১৫ July। Summer: portal খোলে ১৫ October, department-এর শেষ তারিখ ১৫ November, International Office ১৫ January।', 'verified', [LMU_STAT]),
      nextIntake: intake('confirmed', [LMU_STAT, DAAD_LMU_STAT], b('Summer semester 2027 (department deadline 15 November 2026)', 'Summer semester 2027 (department-এর শেষ তারিখ ১৫ November 2026)')),
      requirements: txt("A bachelor's degree (180 ECTS) with statistics or data science as a major, minor or focus; at least 150 ECTS proven at application; knowledge of statistical modelling and inference, machine learning principles, probability, linear algebra, analysis and statistical programming. Admission by aptitude assessment.", "Statistics বা data science major, minor বা focus-সহ bachelor's (180 ECTS); আবেদনের সময় অন্তত 150 ECTS প্রমাণ; statistical modelling ও inference, machine learning, probability, linear algebra, analysis আর statistical programming-এর জ্ঞান। Aptitude assessment-এর মাধ্যমে ভর্তি।", 'verified', [LMU_STAT, DAAD_LMU_STAT]),
      english: txt('English at level B2 (or a degree taught in English).', 'ইংরেজি B2 স্তরে (বা ইংরেজি-মাধ্যম degree)।', 'verified', [LMU_STAT]),
      applyVia: b('Department portal, plus the LMU International Office', 'Department portal, সঙ্গে LMU International Office'),
      url: LMU_STAT.url!,
      sources: [LMU_STAT, DAAD_LMU_STAT, LMU_FEES],
      lastVerified: READ,
    },
  ],
  lastVerified: READ,
};

const HEIDELBERG: UniversityProfile = {
  id: 'de-heidelberg',
  countryCode: 'DE',
  name: 'Heidelberg University',
  city: 'Heidelberg',
  ownership: 'public',
  officialUrl: 'https://www.uni-heidelberg.de/en',
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '86', sourceUrl: QS_HD.url!, lastVerified: READ, status: 'verified' },
  overview: b('A public university in Heidelberg, in the state of Baden-Württemberg.', 'Baden-Württemberg রাজ্যের Heidelberg-এর একটি সরকারি university।'),
  tuition: { ...txt(BW_FEE_EN + " Applies to bachelor's and consecutive master's programs.", BW_FEE_BN + " Bachelor's আর consecutive master's program-এ প্রযোজ্য।", 'verified', [HD_FEES]), money: { amount: 1500, currency: 'EUR', period: 'semester' } },
  deadlines: txt('Deadlines vary by program.', 'শেষ তারিখ program অনুযায়ী আলাদা।', 'partly-verified', [DAAD_HD_SC]),
  nextIntake: intake('varies', [DAAD_HD_SC]),
  admission: txt('Set per program; many master’s programs have admission restrictions.', 'Program অনুযায়ী; অনেক master’s program-এ ভর্তির সীমাবদ্ধতা আছে।', 'partly-verified', [DAAD_HD_SC]),
  english: txt('Not verified as a university-wide rule.', 'University-র সাধারণ নিয়ম হিসেবে যাচাই হয়নি।', 'not-verified', [DAAD_HD_SC]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [DAAD_HD_SC] },
  applicationFee: NOT_VERIFIED_FEE([DAAD_HD_SC]),
  scholarships: txt('Not verified here.', 'এখানে যাচাই হয়নি।', 'not-verified', [HD_FEES]),
  applicationRoute: txt('Not verified as a university-wide rule — see the program.', 'University-র সাধারণ নিয়ম হিসেবে যাচাই হয়নি — program দেখুন।', 'not-verified', [DAAD_HD_SC]),
  steps: { items: [], status: 'not-verified', sources: [DAAD_HD_SC] },
  programs: [
    {
      id: 'de-heidelberg-sc',
      title: 'Scientific Computing',
      level: 'masters',
      languages: b('English, German', 'ইংরেজি, German'),
      englishOnly: false,
      duration: b('4 semesters', '৪ semester'),
      tuition: { ...txt('EUR 1,500 per semester for students from outside the EU/EEA.', 'EU/EEA-র বাইরের student-দের প্রতি semester-এ EUR 1,500।', 'verified', [DAAD_HD_SC, HD_FEES]), money: { amount: 1500, currency: 'EUR', period: 'semester' } },
      deadline: txt('DAAD lists 1 April – 30 September 2026 for winter semester 2026/27 (non-EU applicants). Heidelberg’s own deadline page was not read — confirm there.', 'DAAD-এ winter semester 2026/27-এর জন্য (non-EU) ১ April – ৩০ September 2026 দেওয়া। Heidelberg-এর নিজের শেষ তারিখের page পড়া হয়নি — সেখানে নিশ্চিত করুন।', 'partly-verified', [DAAD_HD_SC], { note: 'A third-party site states 31 July for non-EU applicants; the DAAD national portal states 30 September 2026. Needs the university page.' }),
      nextIntake: intake('needs-review', [DAAD_HD_SC]),
      requirements: txt('Admission restricted; see the admission regulations.', 'ভর্তি সীমিত; admission regulations দেখুন।', 'partly-verified', [DAAD_HD_SC]),
      english: txt('Not stated in the DAAD entry.', 'DAAD-এর তথ্যে লেখা নেই।', 'not-verified', [DAAD_HD_SC]),
      url: DAAD_HD_SC.url!,
      sources: [DAAD_HD_SC, HD_FEES],
      lastVerified: READ,
    },
  ],
  lastVerified: READ,
};

const RWTH: UniversityProfile = {
  id: 'de-rwth',
  countryCode: 'DE',
  name: 'RWTH Aachen University',
  city: 'Aachen',
  ownership: 'public',
  officialUrl: 'https://www.rwth-aachen.de',
  admissionsUrl: RWTH_INTL_MASTER.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '104', sourceUrl: QS_RWTH.url!, lastVerified: READ, status: 'verified' },
  overview: b("A public university in Aachen. Besides German-taught programs, RWTH offers several master's programs taught entirely in English.", "Aachen-এর একটি সরকারি university। German-মাধ্যম program ছাড়াও RWTH পুরোপুরি ইংরেজিতে কয়েকটি master's program দেয়।"),
  areas: b("English-taught master's include Electrical Engineering, Information Technology and Computer Engineering; Engineering Geohazards; Physics; Software Systems Engineering; Transforming City Regions.", "ইংরেজি-মাধ্যম master's: Electrical Engineering, Information Technology and Computer Engineering; Engineering Geohazards; Physics; Software Systems Engineering; Transforming City Regions।"),
  tuition: txt('No tuition fees, except for RWTH Academy programs. Every student pays a student body and social contribution of about EUR 300 per semester on average.', 'Tuition fee নেই, শুধু RWTH Academy-র program ছাড়া। প্রত্যেক student প্রতি semester-এ গড়ে প্রায় EUR 300 student body ও social contribution দেন।', 'verified', [DE_RWTH_FAQ]),
  semesterFee: txt('About EUR 300 per semester on average (RWTH FAQ); DAAD lists approx. EUR 360 for Software Systems Engineering.', 'প্রতি semester-এ গড়ে প্রায় EUR 300 (RWTH FAQ); Software Systems Engineering-এর জন্য DAAD প্রায় EUR 360 দেখায়।', 'partly-verified', [DE_RWTH_FAQ, DAAD_RWTH_SSE], { note: 'Two official figures differ (≈300 vs ≈360); kept both.' }),
  deadlines: txt('Non-EU/EEA applicants, open-admission master’s: 1 March (winter semester) and 1 September (summer semester).', 'Non-EU/EEA আবেদনকারী, open-admission master’s: ১ March (winter semester) আর ১ September (summer semester)।', 'verified', [RWTH_INTL_MASTER]),
  nextIntake: intake('varies', [RWTH_INTL_MASTER]),
  admission: txt('Some master’s programs have restricted admission, others open admission.', 'কিছু master’s program-এ সীমিত ভর্তি, কিছুতে open admission।', 'verified', [RWTH_INTL_MASTER]),
  english: txt('Varies by program (see each program).', 'Program অনুযায়ী আলাদা (প্রতিটি program দেখুন)।', 'partly-verified', [DAAD_RWTH_SSE]),
  documents: { required: [], mayBeRequired: [b('Documents are set by each program', 'Document প্রতিটি program ঠিক করে')], status: 'not-verified', sources: [RWTH_INTL_MASTER] },
  applicationFee: NOT_VERIFIED_FEE([RWTH_INTL_MASTER]),
  scholarships: txt('International students can apply for the Deutschlandstipendium (Germany Scholarship).', 'International student-রা Deutschlandstipendium (Germany Scholarship)-এর আবেদন করতে পারেন।', 'verified', [DE_RWTH_FAQ]),
  applicationRoute: txt('Online through the RWTHonline portal.', 'RWTHonline portal-এ online।', 'verified', [RWTH_INTL_MASTER]),
  steps: {
    items: [
      { title: b('Choose a program', 'Program বেছে নিন'), body: b('Check whether the program has open or restricted admission and whether it is taught in English.', 'Program open না সীমিত ভর্তির, আর ইংরেজিতে কিনা দেখুন।') },
      { title: b('Apply in RWTHonline by the non-EU deadline', 'Non-EU শেষ তারিখের মধ্যে RWTHonline-এ আবেদন'), body: b('For open-admission master’s: 1 March for winter, 1 September for summer.', 'Open-admission master’s: winter-এর জন্য ১ March, summer-এর জন্য ১ September।') },
      { title: b('Submit program documents', 'Program-এর document জমা'), body: b('Upload what the program requires (for Software Systems Engineering, for example, the GRE general test for non-EU citizens).', 'Program যা চায় upload করুন (যেমন Software Systems Engineering-এ non-EU নাগরিকদের GRE general test)।') },
      { title: b('Admission and enrolment', 'ভর্তি আর enrolment'), body: b('After admission, pay the semester contribution and enrol.', 'ভর্তির পরে semester contribution দিয়ে enrol করুন।') },
      VISA_STEP,
    ],
    status: 'partly-verified',
    sources: [RWTH_INTL_MASTER, DAAD_RWTH_SSE],
  },
  programs: [
    {
      id: 'de-rwth-sse',
      title: 'Software Systems Engineering',
      level: 'masters',
      languages: b('English', 'ইংরেজি'),
      englishOnly: true,
      duration: b('4 semesters', '৪ semester'),
      tuition: txt('No tuition fees; semester contribution approx. EUR 360.', 'Tuition fee নেই; semester contribution প্রায় EUR 360।', 'verified', [DAAD_RWTH_SSE]),
      deadline: txt('Non-EU applicants: until 1 March (winter semester start only).', 'Non-EU আবেদনকারী: ১ March পর্যন্ত (শুধু winter semester-এ শুরু)।', 'verified', [DAAD_RWTH_SSE, RWTH_INTL_MASTER]),
      nextIntake: intake('confirmed', [DAAD_RWTH_SSE], b('Winter semester 2027/28 (non-EU deadline 1 March 2027)', 'Winter semester 2027/28 (non-EU শেষ তারিখ ১ March 2027)')),
      requirements: txt('A first degree in computer science, computer engineering, informatics or a closely related field from a recognised university, above-average results, a substantial background in computer science and mathematics, and the GRE general test for applicants who are not EU/EEA citizens.', 'স্বীকৃত university থেকে computer science, computer engineering, informatics বা ঘনিষ্ঠ বিষয়ে প্রথম degree, গড়ের চেয়ে ভালো ফল, computer science আর mathematics-এ শক্ত ভিত্তি, আর EU/EEA নাগরিক নন এমন আবেদনকারীদের GRE general test।', 'verified', [DAAD_RWTH_SSE]),
      english: txt('IELTS Academic 5.5 is listed; details are in RWTH’s language requirements.', 'IELTS Academic 5.5 দেওয়া আছে; বিস্তারিত RWTH-এর ভাষার শর্তে।', 'partly-verified', [DAAD_RWTH_SSE]),
      applyVia: b('RWTHonline', 'RWTHonline'),
      url: DAAD_RWTH_SSE.url!,
      sources: [DAAD_RWTH_SSE, RWTH_INTL_PROGRAMS],
      lastVerified: READ,
    },
  ],
  lastVerified: READ,
};

const KIT: UniversityProfile = {
  id: 'de-kit',
  countryCode: 'DE',
  name: 'Karlsruhe Institute of Technology (KIT)',
  city: 'Karlsruhe',
  ownership: 'public',
  officialUrl: 'https://www.kit.edu/english/',
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '110', sourceUrl: QS_KIT.url!, lastVerified: READ, status: 'verified' },
  overview: b('A public university in Karlsruhe, in the state of Baden-Württemberg.', 'Baden-Württemberg রাজ্যের Karlsruhe-এর একটি সরকারি university।'),
  tuition: { ...txt("EUR 1,500 per semester for international students from non-EU countries in bachelor's, teacher's and consecutive master's programs (Baden-Württemberg Act on State University Fees), plus the semester fee.", "Non-EU দেশের international student-দের bachelor's, teacher's আর consecutive master's program-এ প্রতি semester-এ EUR 1,500 (Baden-Württemberg-এর আইন), সঙ্গে semester fee।", 'verified', [KIT_FEES]), money: { amount: 1500, currency: 'EUR', period: 'semester' } },
  deadlines: txt('Not verified here — deadlines are set per program.', 'এখানে যাচাই হয়নি — শেষ তারিখ program অনুযায়ী।', 'not-verified', [KIT_FEES]),
  nextIntake: intake('needs-review', [KIT_FEES]),
  admission: txt('Not verified here.', 'এখানে যাচাই হয়নি।', 'not-verified', [KIT_FEES]),
  english: txt('Not verified here.', 'এখানে যাচাই হয়নি।', 'not-verified', [KIT_FEES]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [KIT_FEES] },
  applicationFee: NOT_VERIFIED_FEE([KIT_FEES]),
  scholarships: txt('Not verified here.', 'এখানে যাচাই হয়নি।', 'not-verified', [KIT_FEES]),
  applicationRoute: txt('Not verified here.', 'এখানে যাচাই হয়নি।', 'not-verified', [KIT_FEES]),
  steps: { items: [], status: 'not-verified', sources: [KIT_FEES] },
  programs: [],
  lastVerified: READ,
};

const TUB: UniversityProfile = {
  id: 'de-tuberlin',
  countryCode: 'DE',
  name: 'Technische Universität Berlin (TU Berlin)',
  city: 'Berlin',
  ownership: 'public',
  officialUrl: 'https://www.tu.berlin/en/',
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=158', sourceUrl: QS_TUB.url!, lastVerified: READ, status: 'verified' },
  overview: b('A public university in Berlin. TU Berlin states that there are no tuition fees to pay; some continuing-education master’s courses charge their own fees.', 'Berlin-এর একটি সরকারি university। TU Berlin জানায় কোনো tuition fee দিতে হয় না; কিছু continuing-education master’s course নিজস্ব fee নেয়।'),
  tuition: txt('No tuition fees (TU Berlin). Some continuing-education master’s courses charge a course fee.', 'Tuition fee নেই (TU Berlin)। কিছু continuing-education master’s course-এ course fee আছে।', 'verified', [TUB_FINANCE]),
  semesterFee: txt('EUR 149.56 per semester without the Semesterticket (TU Berlin semester fees page).', 'Semesterticket ছাড়া প্রতি semester-এ EUR 149.56 (TU Berlin-এর semester fee page)।', 'partly-verified', [TUB_SEMESTER]),
  deadlines: txt('Not verified here — the DAAD entry refers to university-wide deadlines on TU Berlin’s site.', 'এখানে যাচাই হয়নি — DAAD-এর তথ্য TU Berlin-এর site-এর সাধারণ শেষ তারিখ দেখায়।', 'not-verified', [DAAD_TUB_CS]),
  nextIntake: intake('needs-review', [DAAD_TUB_CS]),
  admission: txt('Not verified here.', 'এখানে যাচাই হয়নি।', 'not-verified', [DAAD_TUB_CS]),
  english: txt('Not verified here.', 'এখানে যাচাই হয়নি।', 'not-verified', [DAAD_TUB_CS]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [DAAD_TUB_CS] },
  applicationFee: NOT_VERIFIED_FEE([DAAD_TUB_CS]),
  scholarships: txt('Not verified here.', 'এখানে যাচাই হয়নি।', 'not-verified', [TUB_FINANCE]),
  applicationRoute: txt('Not verified here.', 'এখানে যাচাই হয়নি।', 'not-verified', [DAAD_TUB_CS]),
  steps: { items: [], status: 'not-verified', sources: [DAAD_TUB_CS] },
  programs: [
    {
      id: 'de-tuberlin-cs',
      title: 'Computer Science',
      level: 'masters',
      languages: b('English, German', 'ইংরেজি, German'),
      englishOnly: false,
      duration: b('4 semesters', '৪ semester'),
      tuition: txt('No tuition fees at TU Berlin; the semester fee applies.', 'TU Berlin-এ tuition fee নেই; semester fee প্রযোজ্য।', 'verified', [TUB_FINANCE]),
      deadline: txt('Not verified — the DAAD entry shows the 2026/27 deadlines as expired and refers to TU Berlin’s university-wide deadlines.', 'যাচাই হয়নি — DAAD-এর তথ্যে 2026/27-এর শেষ তারিখ পেরিয়ে গেছে দেখায় আর TU Berlin-এর সাধারণ শেষ তারিখ দেখতে বলে।', 'not-verified', [DAAD_TUB_CS]),
      nextIntake: intake('needs-review', [DAAD_TUB_CS]),
      requirements: txt('Not verified here — see TU Berlin’s program page.', 'এখানে যাচাই হয়নি — TU Berlin-এর program page দেখুন।', 'not-verified', [DAAD_TUB_CS]),
      english: txt('Not verified here.', 'এখানে যাচাই হয়নি।', 'not-verified', [DAAD_TUB_CS]),
      url: DAAD_TUB_CS.url!,
      sources: [DAAD_TUB_CS, TUB_FINANCE],
      lastVerified: READ,
    },
  ],
  lastVerified: READ,
};

const STUTTGART: UniversityProfile = {
  id: 'de-stuttgart',
  countryCode: 'DE',
  name: 'University of Stuttgart',
  city: 'Stuttgart',
  ownership: 'public',
  officialUrl: 'https://www.uni-stuttgart.de/en/',
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=318', sourceUrl: QS_STU.url!, lastVerified: READ, status: 'verified' },
  overview: b('A public university in Stuttgart, in the state of Baden-Württemberg.', 'Baden-Württemberg রাজ্যের Stuttgart-এর একটি সরকারি university।'),
  tuition: { ...txt('EUR 1,500 per semester for non-EU/EEA students (Baden-Württemberg), plus the semester fee (EUR 184 on the university’s fee page).', 'Non-EU/EEA student-দের প্রতি semester-এ EUR 1,500 (Baden-Württemberg), সঙ্গে semester fee (university-র fee page-এ EUR 184)।', 'verified', [DE_STUTTGART_FEES]), money: { amount: 1500, currency: 'EUR', period: 'semester' } },
  semesterFee: txt('EUR 184 (university fee page); DAAD lists approx. EUR 200 for INFOTECH.', 'EUR 184 (university-র fee page); INFOTECH-এর জন্য DAAD প্রায় EUR 200 দেখায়।', 'partly-verified', [DE_STUTTGART_FEES, DAAD_STU_INFOTECH], { note: 'Two official figures differ (184 vs ≈200).' }),
  deadlines: txt('Deadlines vary by program.', 'শেষ তারিখ program অনুযায়ী আলাদা।', 'partly-verified', [DAAD_STU_INFOTECH]),
  nextIntake: intake('varies', [DAAD_STU_INFOTECH]),
  admission: txt('Set per program.', 'Program অনুযায়ী।', 'partly-verified', [DAAD_STU_INFOTECH]),
  english: txt('Varies by program (see each program).', 'Program অনুযায়ী আলাদা (প্রতিটি program দেখুন)।', 'partly-verified', [DAAD_STU_INFOTECH]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [DAAD_STU_INFOTECH] },
  applicationFee: NOT_VERIFIED_FEE([DAAD_STU_INFOTECH]),
  scholarships: txt('Not verified here.', 'এখানে যাচাই হয়নি।', 'not-verified', [DE_STUTTGART_FEES]),
  applicationRoute: txt('Online through the University of Stuttgart’s application portal.', 'University of Stuttgart-এর application portal-এ online।', 'partly-verified', [DAAD_STU_INFOTECH]),
  steps: { items: [], status: 'not-verified', sources: [DAAD_STU_INFOTECH] },
  programs: [
    {
      id: 'de-stuttgart-infotech',
      title: 'Information Technology (INFOTECH)',
      level: 'masters',
      languages: b('English', 'ইংরেজি'),
      englishOnly: true,
      duration: b('4 semesters', '৪ semester'),
      tuition: { ...txt('EUR 1,500 per semester for non-EU/EEA students (Baden-Württemberg), plus the semester fee.', 'Non-EU/EEA student-দের প্রতি semester-এ EUR 1,500 (Baden-Württemberg), সঙ্গে semester fee।', 'verified', [DE_STUTTGART_FEES]), money: { amount: 1500, currency: 'EUR', period: 'semester' } },
      deadline: txt('Winter semester: 15 November – 15 January. Summer semester: 15 May – 15 July.', 'Winter semester: ১৫ November – ১৫ January। Summer semester: ১৫ May – ১৫ July।', 'verified', [DAAD_STU_INFOTECH]),
      nextIntake: intake('confirmed', [DAAD_STU_INFOTECH], b('Winter semester 2027/28 (applications 15 November 2026 – 15 January 2027)', 'Winter semester 2027/28 (আবেদন ১৫ November 2026 – ১৫ January 2027)')),
      requirements: txt('A B.Sc. (or similar) of at least three years in a field such as computer science, communications, electrical or electronics engineering, information technology or automation, with a CGPA equivalent to “good” or better (at least 70% or 2.5 in German grades).', 'Computer science, communications, electrical বা electronics engineering, information technology বা automation-এর মতো বিষয়ে অন্তত তিন বছরের B.Sc. (বা সমমান), CGPA “good” বা ভালো (অন্তত 70% বা German grade-এ 2.5)।', 'verified', [DAAD_STU_INFOTECH]),
      english: txt('English at level C1.', 'ইংরেজি C1 স্তরে।', 'verified', [DAAD_STU_INFOTECH, STU_INFOTECH]),
      applyVia: b('University of Stuttgart online application', 'University of Stuttgart-এর online আবেদন'),
      url: STU_INFOTECH.url!,
      sources: [STU_INFOTECH, DAAD_STU_INFOTECH, DE_STUTTGART_FEES],
      lastVerified: READ,
    },
  ],
  lastVerified: READ,
};

export const DE_UNI_LAYER: CountryUniversityLayer = {
  code: 'DE',
  universities: [TUM, LMU, HEIDELBERG, RWTH, KIT, TUB, STUTTGART],
  visaStats: [
    {
      id: 'de-national-visas-2025',
      scope: 'all-nationalities',
      title: b('National (category D) visas issued by German missions', 'জার্মান মিশনের দেওয়া national (D category) visa'),
      covers: b('All nationalities and all long-stay purposes (study, work, family and others) — not student visas only and not Bangladesh-specific.', 'সব দেশের নাগরিক আর সব দীর্ঘমেয়াদি উদ্দেশ্য (পড়াশোনা, কাজ, পরিবার ইত্যাদি) — শুধু student visa নয়, Bangladesh-নির্দিষ্টও নয়।'),
      period: '2025',
      figures: [{ label: b('National visas issued', 'দেওয়া national visa'), value: '480,864' }],
      source: AA_VISA_STATS,
      status: 'verified',
      lastVerified: READ,
    },
  ],
  unverified: [
    { id: 'bd-study-visa-rate', label: b('Bangladesh-specific student visa approval / refusal rate', 'Bangladesh-নির্দিষ্ট student visa অনুমোদন / প্রত্যাখ্যানের হার'), status: 'not-verified', note: 'No official Bangladesh-specific study-visa decision statistic identified on the Federal Foreign Office statistics page (29 Sep 2026).' },
    { id: 'bd-students-count', label: b('Number of Bangladeshi students in Germany', 'Germany-তে Bangladesh-এর student-এর সংখ্যা'), status: 'not-verified', note: 'Wissenschaft weltoffen 2025 (DAAD/DZHW) reports ~402,000 international students in WS 2024/25; a Bangladesh figure was not confirmed from the report.' },
    { id: 'study-visa-count', label: b('Number of study visa applications processed (all nationalities)', 'প্রক্রিয়াকৃত study visa আবেদনের সংখ্যা (সব দেশ)'), status: 'needs-review', note: 'A search excerpt of the Federal Foreign Office page mentioned about 100,000 study-visa applications processed, but the sentence could not be confirmed on the page itself.' },
  ],
  lastVerified: READ,
};

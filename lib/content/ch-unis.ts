import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, ProgramProfile, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import {
  CH_EPFL,
  CH_EPFL_BACHELOR_ADMISSION,
  CH_EPFL_MASTER_ADMISSION,
  CH_EPFL_MASTER_ONLINE_APPLY,
  CH_EPFL_QS,
  CH_EPFL_TUITION,
  CH_ETHZ,
  CH_ETHZ_BACHELOR_APPLY,
  CH_ETHZ_BACHELOR_DATES,
  CH_ETHZ_FEES_PDF,
  CH_ETHZ_JOBSEEKING,
  CH_ETHZ_QS,
  CH_ETHZ_TUITION,
  CH_READ,
  CH_UNIGE,
  CH_UNIGE_FEES,
  CH_UNIGE_QS,
  CH_UZH,
  CH_UZH_BACHELOR_ADMISSION,
  CH_UZH_FEES,
  CH_UZH_LANGUAGE_REQUIREMENTS,
  CH_UZH_MASTER_ADMISSION,
  CH_UZH_QS,
} from './ch-sources';

/**
 * Switzerland: university → program layer, built the same way as the
 * Netherlands', Ireland's, France's, Czech Republic's, Slovenia's,
 * Lithuania's, Germany's and South Korea's (lib/content/nl-unis.ts,
 * ie-unis.ts, fr-unis.ts, cz-unis.ts, si-unis.ts, lt-unis.ts, de-unis.ts,
 * kr-unis.ts). Rankings are QS World University Rankings 2027 as printed on
 * each institution's topuniversities.com profile. Tuition, deadlines and
 * requirements come from each institution's own official pages. ETH Zurich
 * and EPFL (Switzerland's two federal institutes of technology) charge a
 * flat federal fee structure (a lower rate for students who qualify, a
 * threefold rate for most others, including most foreign students since
 * autumn 2025), while the cantonal universities of Zurich and Geneva set
 * their own fee structures. Anything that could not be verified on an
 * official page is left marked unverified — never guessed.
 */

const READ = CH_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the institution’s official admissions page.', 'যাচাই হয়নি — institution-এর official admissions page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Apply for the national visa D and residence permit for study', 'National visa D আর পড়ার জন্য residence permit-এর আবেদন করুন'),
  body: b('Once admitted, apply in person at the Embassy of Switzerland in Bangladesh (Dhaka) for a national visa D; the Embassy forwards your file to the cantonal migration authority, which decides on and issues the actual residence permit (Permit B) — the whole process takes about three months per the Embassy’s own checklist. Register with your commune within 14 days of arrival and take out compulsory Swiss health insurance within three months. See the Switzerland student-visa section on the country page.', 'ভর্তি হলে, একটি national visa D-র জন্য Embassy of Switzerland in Bangladesh (Dhaka)-এ সশরীরে আবেদন করুন; Embassy আপনার ফাইল cantonal migration authority-তে পাঠায়, যারা আসল residence permit (Permit B)-এর সিদ্ধান্ত নেয় আর ইস্যু করে — Embassy-র নিজের checklist অনুযায়ী সম্পূর্ণ process প্রায় তিন মাস লাগে। পৌঁছানোর 14 দিনের মধ্যে আপনার commune-এ register করুন আর তিন মাসের মধ্যে compulsory Swiss health insurance নিন। Country page-এর Switzerland student-visa অংশ দেখুন।'),
};

// ------------------------------------------------------------------ universities

const ETHZ: UniversityProfile = {
  id: 'ch-ethz',
  countryCode: 'CH',
  name: 'ETH Zurich',
  city: 'Zürich',
  ownership: 'public',
  officialUrl: 'https://ethz.ch/en.html',
  admissionsUrl: CH_ETHZ_BACHELOR_APPLY.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=8', sourceUrl: CH_ETHZ_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Switzerland’s federal institute of technology in Zürich, with 16 departments spanning engineering, natural sciences, mathematics, architecture and management. Bachelor’s programmes are taught in German; most Master’s programmes are taught in English.',
    'Zürich-এ Switzerland-এর federal institute of technology, engineering, natural sciences, mathematics, architecture, আর management জুড়ে 16টি department সহ। Bachelor\'s programme জার্মানে পড়ানো হয়; অধিকাংশ Master\'s programme ইংরেজিতে পড়ানো হয়।',
  ),
  tuition: {
    ...txt(
      'ETH Zurich charges the same official rate to every Bachelor’s/Master’s student in a given fee group: CHF 730/semester (the "simple" fee) for students with Swiss or Liechtenstein citizenship, or who were resident in Switzerland/Liechtenstein when they obtained their university entrance qualification, or who meet specific family-reunification/permit criteria; CHF 2,190/semester (the "threefold" fee) for everyone else, which from Autumn Semester 2025 includes most foreign Bachelor’s and Master’s students who did not already live in Switzerland before their studies. The fee-group assignment happens once before the start of studies and is not revisited on progressing from Bachelor’s to Master’s.',
      'ETH Zurich একই official rate প্রতিটি fee group-এর Bachelor\'s/Master\'s student-কে চার্জ করে: CHF 730/semester ("simple" fee) Swiss বা Liechtenstein নাগরিকত্ব থাকা, বা university entrance qualification পাওয়ার সময় Switzerland/Liechtenstein-এ resident ছিলেন, বা নির্দিষ্ট family-reunification/permit শর্ত পূরণ করা student-দের জন্য; CHF 2,190/semester ("threefold" fee) বাকি সবার জন্য, যা Autumn Semester 2025 থেকে পড়ার আগে Switzerland-এ না থাকা অধিকাংশ বিদেশি Bachelor\'s আর Master\'s student-কে অন্তর্ভুক্ত করে। Fee-group assignment পড়া শুরুর আগে একবার হয় আর Bachelor\'s থেকে Master\'s-এ progress করার সময় আবার দেখা হয় না।',
      'verified',
      [CH_ETHZ_TUITION, CH_ETHZ_FEES_PDF],
    ),
    money: { amount: 730, max: 2190, currency: 'CHF', period: 'semester' },
  },
  deadlines: txt('For Bachelor’s applicants with a non-Swiss matriculation certificate, the application period runs 1 December to 31 March (23:59 CET) for an Autumn Semester start — ETH Zurich admits Bachelor’s students only in Autumn. A German-language certificate is due by 31 March; for applicants needing the ETH Entrance Examination, the certificate of university admission is due later (e.g. by 15 October for Autumn Semester 2026).', 'Non-Swiss matriculation সনদসম্পন্ন Bachelor\'s আবেদনকারীদের জন্য, একটি Autumn Semester শুরুর জন্য application period 1 December থেকে 31 March (23:59 CET) পর্যন্ত চলে — ETH Zurich শুধু Autumn-এ Bachelor\'s student ভর্তি করে। একটি German-language সনদ 31 March-এর মধ্যে চাই; ETH Entrance Examination লাগা আবেদনকারীদের জন্য, university admission-এর সনদ পরে চাই (যেমন Autumn Semester 2026-এর জন্য 15 October-এর মধ্যে)।', 'verified', [CH_ETHZ_BACHELOR_APPLY, CH_ETHZ_BACHELOR_DATES]),
  nextIntake: intake('confirmed', [CH_ETHZ_BACHELOR_APPLY], b('Autumn Semester only (Bachelor’s)', 'শুধু Autumn Semester (Bachelor\'s)')),
  admission: txt('Applicants with a non-Swiss upper-secondary school-leaving certificate apply online via eApply; admission requirements are country- and certificate-specific, and some applicants must pass the ETH Entrance Examination. A German-language certificate meeting ETH’s requirement must be submitted by the application deadline.', 'Non-Swiss upper-secondary school-leaving সনদসম্পন্ন আবেদনকারীরা eApply-এর মাধ্যমে online আবেদন করেন; ভর্তির শর্ত দেশ- আর সনদ-নির্দিষ্ট, আর কিছু আবেদনকারীকে ETH Entrance Examination পাস করতে হয়। ETH-র শর্ত পূরণ করা একটি German-language সনদ application deadline-এর মধ্যে জমা দিতে হয়।', 'verified', [CH_ETHZ_BACHELOR_APPLY]),
  english: NOT_VERIFIED_FEE([CH_ETHZ_BACHELOR_APPLY]),
  documents: {
    required: [b('Non-Swiss upper-secondary school-leaving certificate', 'Non-Swiss upper-secondary school-leaving সনদ'), b('German-language certificate meeting ETH’s requirement, by the application deadline', 'Application deadline-এর মধ্যে ETH-র শর্ত পূরণ করা German-language সনদ'), b('Online application via eApply', 'eApply-এর মাধ্যমে online application')],
    mayBeRequired: [b('Certificate of passing the ETH Entrance Examination, for applicants whose qualification requires it', 'যে আবেদনকারীদের যোগ্যতার জন্য লাগে তাদের জন্য ETH Entrance Examination পাসের সনদ')],
    status: 'verified',
    sources: [CH_ETHZ_BACHELOR_APPLY, CH_ETHZ_BACHELOR_DATES],
  },
  applicationFee: txt('CHF 50 for applicants with a Swiss matriculation certificate, CHF 150 for applicants with a non-Swiss matriculation certificate, one-off.', 'Swiss matriculation সনদসম্পন্ন আবেদনকারীদের জন্য CHF 50, non-Swiss matriculation সনদসম্পন্ন আবেদনকারীদের জন্য CHF 150, একবারের।', 'verified', [CH_ETHZ_FEES_PDF]),
  scholarships: NOT_VERIFIED_FEE([CH_ETHZ_TUITION]),
  applicationRoute: txt('Online application via ETH Zurich’s own eApply system.', 'ETH Zurich-এর নিজস্ব eApply system-এর মাধ্যমে online application।', 'verified', [CH_ETHZ_BACHELOR_APPLY]),
  steps: {
    items: [
      { title: b('Check the country- and certificate-specific admission requirements', 'দেশ- আর সনদ-নির্দিষ্ট ভর্তির শর্ত দেখুন'), body: b('Confirm whether your certificate requires the ETH Entrance Examination.', 'আপনার সনদে ETH Entrance Examination লাগে কিনা নিশ্চিত করুন।') },
      { title: b('Apply online via eApply (1 December – 31 March)', 'eApply-এর মাধ্যমে online আবেদন করুন (1 December – 31 March)'), body: b('Submit by 23:59 CET on 31 March for an Autumn Semester start.', 'Autumn Semester শুরুর জন্য 31 March, 23:59 CET-এর মধ্যে জমা দিন।') },
      { title: b('Submit your German-language certificate by 31 March', '31 March-এর মধ্যে আপনার German-language সনদ জমা দিন'), body: b('Required for Bachelor’s admission regardless of your intended study language at Master’s level.', 'Master\'s level-এ আপনার উদ্দেশ্যমূলক পড়ার ভাষা যা-ই হোক, Bachelor\'s ভর্তির জন্য লাগে।') },
      VISA_STEP,
      { title: b('Pay tuition and enrol', 'Tuition দিয়ে enrol করুন'), body: b('CHF 730 or CHF 2,190 per semester depending on your fee group, assigned once before your studies begin.', 'আপনার fee group অনুযায়ী সেমিস্টারে CHF 730 বা CHF 2,190, পড়া শুরুর আগে একবার assign করা হয়।') },
    ],
    status: 'verified',
    sources: [CH_ETHZ_BACHELOR_APPLY, CH_ETHZ_TUITION],
  },
  programs: [],
  lastVerified: READ,
};

const EPFL_CS_MASTER: ProgramProfile = {
  id: 'ch-epfl-cs',
  title: 'Master in Computer Science',
  level: 'masters',
  faculty: 'School of Computer and Communication Sciences (IC)',
  languages: b('Entirely in English', 'সম্পূর্ণ ইংরেজিতে'),
  englishOnly: true,
  duration: b('Typically 2 years (full-time)', 'সাধারণত 2 বছর (full-time)'),
  tuition: {
    ...txt('Same as EPFL’s general Master’s fee: CHF 730 or CHF 2,190 per semester depending on fee group.', 'EPFL-এর সাধারণ Master\'s fee-র মতোই: fee group অনুযায়ী সেমিস্টারে CHF 730 বা CHF 2,190।', 'verified', [CH_EPFL_TUITION]),
    money: { amount: 730, max: 2190, currency: 'CHF', period: 'semester' },
  },
  deadline: txt('Applications open mid-November, closing either 15 December or 31 March (the applicant freely chooses either window); decisions follow by late March or mid-June respectively.', 'Application mid-November থেকে খোলে, 15 December বা 31 March-এ বন্ধ হয় (আবেদনকারী দুটোর একটি মুক্তভাবে বাছতে পারেন); সিদ্ধান্ত আসে late March বা mid-June-এ।', 'verified', [CH_EPFL_MASTER_ONLINE_APPLY]),
  nextIntake: intake('confirmed', [CH_EPFL_MASTER_ONLINE_APPLY], b('Autumn (per the chosen December/March application window)', 'Autumn (বাছা December/March application window অনুযায়ী)')),
  requirements: txt('A Bachelor’s degree (or equivalent) in a field related to the programme; only one Master’s application per academic year is allowed at EPFL.', 'Programme-এর সাথে সম্পর্কিত একটি Bachelor\'s degree (বা সমতুল্য); EPFL-এ প্রতি academic year-এ শুধু একটি Master\'s application অনুমোদিত।', 'verified', [CH_EPFL_MASTER_ADMISSION]),
  english: txt('The programme is taught entirely in English; strong English skills are expected and TOEFL/IELTS certificates are welcomed but not required.', 'Programme সম্পূর্ণ ইংরেজিতে পড়ানো হয়; শক্তিশালী ইংরেজি দক্ষতা প্রত্যাশিত আর TOEFL/IELTS সনদ স্বাগত কিন্তু আবশ্যক না।', 'verified', [CH_EPFL_MASTER_ADMISSION]),
  applyVia: b('EPFL’s own online application system', 'EPFL-এর নিজস্ব online application system'),
  url: 'https://www.epfl.ch/schools/ic/education/master/computer-science/education-master-computer-science-admission-criteria/',
  sources: [CH_EPFL_MASTER_ADMISSION],
  lastVerified: READ,
};

const EPFL: UniversityProfile = {
  id: 'ch-epfl',
  countryCode: 'CH',
  name: 'EPFL – École polytechnique fédérale de Lausanne',
  city: 'Lausanne',
  ownership: 'public',
  officialUrl: 'https://www.epfl.ch/en/home/',
  admissionsUrl: CH_EPFL_BACHELOR_ADMISSION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=22', sourceUrl: CH_EPFL_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Switzerland’s other federal institute of technology, in Lausanne, specialising in engineering, basic sciences, computer and communication sciences, and architecture. Bachelor’s programmes require French at CEFR level B2; most Master’s programmes (including Computer Science) are taught entirely in English.',
    'Lausanne-এ Switzerland-এর আরেকটি federal institute of technology, engineering, basic sciences, computer and communication sciences, আর architecture-এ বিশেষায়িত। Bachelor\'s programme CEFR level B2-তে ফ্রেঞ্চ চায়; অধিকাংশ Master\'s programme (Computer Science-সহ) সম্পূর্ণ ইংরেজিতে পড়ানো হয়।',
  ),
  tuition: {
    ...txt(
      'EPFL charges the same federal fee structure as ETH Zurich: CHF 730/semester for students who qualify for the simple-fee group (Swiss/Liechtenstein citizenship or equivalent residence history), and CHF 2,190/semester for other students since autumn 2025 — which covers most foreign students who did not already live in Switzerland before their studies. Students not undertaking any credited study work for a whole semester pay only CHF 50 for that semester.',
      'EPFL ETH Zurich-এর মতোই একই federal fee structure চার্জ করে: simple-fee group-এর জন্য যোগ্য student-দের (Swiss/Liechtenstein নাগরিকত্ব বা সমতুল্য residence history) জন্য CHF 730/semester, আর 2025 autumn থেকে অন্য student-দের জন্য CHF 2,190/semester — যা পড়ার আগে Switzerland-এ না থাকা অধিকাংশ বিদেশি student-কে কভার করে। একটি সম্পূর্ণ সেমিস্টারের জন্য কোনো credited study work না করা student সেই সেমিস্টারে শুধু CHF 50 দেন।',
      'verified',
      [CH_EPFL_TUITION],
    ),
    money: { amount: 730, max: 2190, currency: 'CHF', period: 'semester' },
  },
  deadlines: txt('Bachelor’s admission criteria are assessed on an ongoing basis per EPFL’s own admission page; Master’s applications close either 15 December or 31 March, whichever window the applicant chooses.', 'EPFL-এর নিজের admission page অনুযায়ী Bachelor\'s ভর্তির শর্ত চলমান ভিত্তিতে মূল্যায়ন করা হয়; Master\'s application আবেদনকারীর বাছা window অনুযায়ী 15 December বা 31 March-এ বন্ধ হয়।', 'partly-verified', [CH_EPFL_BACHELOR_ADMISSION, CH_EPFL_MASTER_ONLINE_APPLY]),
  nextIntake: intake('confirmed', [CH_EPFL_MASTER_ONLINE_APPLY], b('Autumn', 'Autumn')),
  admission: txt('Bachelor’s: EPFL requires CEFR B2-level French for all applicants, including those from EU/EFTA/UK countries, the International Baccalaureate, or any other upper-secondary system, unless French was part of their upper-secondary education. Master’s: open to anyone holding a relevant Bachelor’s degree from a university, limited to one programme application per academic year, with an application fee of CHF 150 for a foreign Bachelor’s-degree holder (CHF 0 for an EPFL Bachelor’s graduate).', 'Bachelor\'s: EPFL সব আবেদনকারীর জন্য CEFR B2-level ফ্রেঞ্চ চায়, EU/EFTA/UK দেশ, International Baccalaureate, বা অন্য কোনো upper-secondary system থেকে আসা আবেদনকারীসহ, যদি না তাদের upper-secondary শিক্ষায় ফ্রেঞ্চ ছিল। Master\'s: একটি university-র সম্পর্কিত Bachelor\'s degree থাকা যে কারো জন্য খোলা, প্রতি academic year-এ একটি programme application-এ সীমাবদ্ধ, একটি বিদেশি Bachelor\'s-degree holder-এর জন্য CHF 150 application fee সহ (EPFL Bachelor\'s graduate-এর জন্য CHF 0)।', 'verified', [CH_EPFL_BACHELOR_ADMISSION, CH_EPFL_MASTER_ONLINE_APPLY]),
  english: txt('Not required at Bachelor’s level (French B2 is required instead). At Master’s level, the programme’s own language of instruction applies (several, including Computer Science, are taught entirely in English); TOEFL/IELTS certificates are welcomed but not required for Computer Science.', 'Bachelor\'s level-এ আবশ্যক না (এর পরিবর্তে French B2 লাগে)। Master\'s level-এ, programme-এর নিজস্ব পড়ানোর ভাষা প্রযোজ্য (Computer Science-সহ কয়েকটি সম্পূর্ণ ইংরেজিতে পড়ানো হয়); Computer Science-এর জন্য TOEFL/IELTS সনদ স্বাগত কিন্তু আবশ্যক না।', 'verified', [CH_EPFL_BACHELOR_ADMISSION, CH_EPFL_MASTER_ADMISSION]),
  documents: {
    required: [b('CEFR B2 French-proficiency attestation (Bachelor’s, unless exempt)', 'CEFR B2 French-দক্ষতার attestation (Bachelor\'s, exempt না হলে)'), b('University degree certificate(s) (Master’s, once available)', 'University degree সনদ (Master\'s, available হলে)'), b('Online application form', 'Online application form')],
    mayBeRequired: [b('Recommendation letters (Master’s)', 'Recommendation letters (Master\'s)'), b('Work certificates, if applicable', 'প্রযোজ্য হলে work certificate')],
    status: 'verified',
    sources: [CH_EPFL_BACHELOR_ADMISSION, CH_EPFL_MASTER_ONLINE_APPLY],
  },
  applicationFee: txt('CHF 150 for a Master’s applicant holding a foreign Bachelor’s degree (CHF 0 for an EPFL Bachelor’s graduate, or a UNIL Bachelor’s graduate applying to the Sustainable Management and Technology Master’s). A separate Bachelor’s application fee was not itemized on the pages read for this guide.', 'একটি বিদেশি Bachelor\'s degree থাকা একজন Master\'s আবেদনকারীর জন্য CHF 150 (EPFL Bachelor\'s graduate, বা Sustainable Management and Technology Master\'s-এ আবেদন করা একজন UNIL Bachelor\'s graduate-এর জন্য CHF 0)। এই guide-এর জন্য পড়া page-এ আলাদা Bachelor\'s application fee তালিকাভুক্ত ছিল না।', 'partly-verified', [CH_EPFL_MASTER_ONLINE_APPLY]),
  scholarships: NOT_VERIFIED_FEE([CH_EPFL_TUITION]),
  applicationRoute: txt('Entirely online, in French or English, via EPFL’s own application system.', 'সম্পূর্ণ অনলাইনে, ফ্রেঞ্চ বা ইংরেজিতে, EPFL-এর নিজস্ব application system-এর মাধ্যমে।', 'verified', [CH_EPFL_MASTER_ONLINE_APPLY]),
  steps: {
    items: [
      { title: b('Confirm your French (Bachelor’s) or field match (Master’s)', 'আপনার ফ্রেঞ্চ (Bachelor\'s) বা field মিল (Master\'s) নিশ্চিত করুন'), body: b('Bachelor’s needs CEFR B2 French; Master’s needs a Bachelor’s degree in a related field.', 'Bachelor\'s-এ CEFR B2 ফ্রেঞ্চ লাগে; Master\'s-এ সম্পর্কিত field-এ একটি Bachelor\'s degree লাগে।') },
      { title: b('Apply online by the chosen deadline', 'বাছা deadline-এর মধ্যে online আবেদন করুন'), body: b('Master’s: 15 December or 31 March; pay the CHF 150 fee if applicable.', 'Master\'s: 15 December বা 31 March; প্রযোজ্য হলে CHF 150 fee দিন।') },
      VISA_STEP,
      { title: b('Pay tuition and enrol', 'Tuition দিয়ে enrol করুন'), body: b('CHF 730 or CHF 2,190 per semester depending on your fee group.', 'আপনার fee group অনুযায়ী সেমিস্টারে CHF 730 বা CHF 2,190।') },
    ],
    status: 'verified',
    sources: [CH_EPFL_MASTER_ONLINE_APPLY, CH_EPFL_TUITION],
  },
  programs: [EPFL_CS_MASTER],
  lastVerified: READ,
};

const UZH: UniversityProfile = {
  id: 'ch-uzh',
  countryCode: 'CH',
  name: 'University of Zurich',
  city: 'Zürich',
  ownership: 'public',
  officialUrl: 'https://www.uzh.ch/en.html',
  admissionsUrl: CH_UZH_BACHELOR_ADMISSION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=98', sourceUrl: CH_UZH_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Switzerland’s largest university, a cantonal (not federal) institution with seven faculties spanning arts and social sciences, theology, law, business/economics, medicine, science and veterinary medicine. Teaching language is mainly German, with a number of English-taught Master’s programmes.',
    'Switzerland-এর সবচেয়ে বড় university, একটি cantonal (federal না) institution, arts and social sciences, theology, law, business/economics, medicine, science, আর veterinary medicine জুড়ে সাতটি faculty সহ। পড়ানোর ভাষা মূলত জার্মান, কয়েকটি ইংরেজি-মাধ্যম Master\'s programme সহ।',
  ),
  tuition: {
    ...txt(
      'A base tuition fee of CHF 720 per semester applies to all students, plus a surcharge for foreign students: CHF 500/semester at Bachelor’s level, or CHF 100/semester at Master’s, PhD or Teacher-training level. The application fee itself is CHF 100 generally, or CHF 150 for Bachelor’s/Master’s applicants with a foreign qualification (from 1 January 2025).',
      'সব student-এর জন্য একটি CHF 720 base tuition fee প্রতি সেমিস্টারে প্রযোজ্য, সঙ্গে বিদেশি student-দের জন্য একটি surcharge: Bachelor\'s level-এ CHF 500/semester, বা Master\'s, PhD, বা Teacher-training level-এ CHF 100/semester। Application fee নিজেই সাধারণত CHF 100, বা বিদেশি যোগ্যতাসম্পন্ন Bachelor\'s/Master\'s আবেদনকারীদের জন্য CHF 150 (1 January 2025 থেকে)।',
      'verified',
      [CH_UZH_FEES],
    ),
    money: { amount: 720, max: 1220, currency: 'CHF', period: 'semester' },
  },
  deadlines: NOT_VERIFIED_FEE([CH_UZH_BACHELOR_ADMISSION]),
  nextIntake: intake('not-published', [CH_UZH_BACHELOR_ADMISSION]),
  admission: txt('Bachelor’s: requires a diploma (at least a Bachelor’s-level qualification) from a state-accredited non-Swiss university, or an upper-secondary qualification recognised as equivalent, per country-specific rules published by swissuniversities.ch; some applicants must sit the Complementary Examination (ECUS). Master’s: academic admission requirements are set per faculty/programme and a complete application dossier generally takes up to three months to assess.', 'Bachelor\'s: একটি state-accredited non-Swiss university থেকে একটি diploma (অন্তত Bachelor\'s-level যোগ্যতা), বা swissuniversities.ch-এর প্রকাশিত দেশ-নির্দিষ্ট নিয়ম অনুযায়ী সমতুল্য স্বীকৃত একটি upper-secondary যোগ্যতা লাগে; কিছু আবেদনকারীকে Complementary Examination (ECUS) দিতে হয়। Master\'s: academic ভর্তির শর্ত প্রতি faculty/programme ঠিক হয় আর একটি সম্পূর্ণ application dossier মূল্যায়ন করতে সাধারণত তিন মাস পর্যন্ত সময় লাগে।', 'verified', [CH_UZH_BACHELOR_ADMISSION, CH_UZH_MASTER_ADMISSION]),
  english: txt('For English-taught study programmes: IELTS Academic 7.0 overall (minimum 6.5 in Speaking and Writing, certificate not older than 2 years), or TOEFL iBT 100 (test date before 21 January 2026; a new scale of 5, with minimum 5 in Speaking/Writing, applies for test dates from that date), or C1 Advanced grade B, or C2 Proficiency. A UZH Bachelor’s degree exempts an applicant from this requirement.', 'ইংরেজি-মাধ্যম study programme-এর জন্য: IELTS Academic 7.0 overall (Speaking আর Writing-এ ন্যূনতম 6.5, সনদ 2 বছরের বেশি পুরনো না), বা TOEFL iBT 100 (21 January 2026-এর আগে test date; সেই তারিখ থেকে Speaking/Writing-এ ন্যূনতম 5 সহ একটি নতুন 5-স্কেল প্রযোজ্য), বা C1 Advanced grade B, বা C2 Proficiency। একটি UZH Bachelor\'s degree একজন আবেদনকারীকে এই শর্ত থেকে exempt করে।', 'verified', [CH_UZH_LANGUAGE_REQUIREMENTS]),
  documents: {
    required: [b('Diploma / upper-secondary qualification assessed as equivalent', 'সমতুল্য মূল্যায়িত diploma / upper-secondary যোগ্যতা'), b('Language certificate, where the programme is not in your qualification’s language', 'প্রোগ্রাম আপনার যোগ্যতার ভাষায় না হলে একটি language সনদ')],
    mayBeRequired: [b('Complementary Examination (ECUS) certificate, for applicants whose country-specific requirements call for it', 'যাদের দেশ-নির্দিষ্ট শর্তে লাগে তাদের জন্য Complementary Examination (ECUS) সনদ')],
    status: 'partly-verified',
    sources: [CH_UZH_BACHELOR_ADMISSION, CH_UZH_LANGUAGE_REQUIREMENTS],
  },
  applicationFee: txt('CHF 100 generally, or CHF 150 for Bachelor’s/Master’s applicants with a foreign qualification (from 1 January 2025); a surcharge of CHF 300 applies for a late Bachelor’s application with a Swiss qualification only.', 'সাধারণত CHF 100, বা বিদেশি যোগ্যতাসম্পন্ন Bachelor\'s/Master\'s আবেদনকারীদের জন্য CHF 150 (1 January 2025 থেকে); শুধু Swiss যোগ্যতার একটি দেরিতে Bachelor\'s application-এর জন্য CHF 300 surcharge প্রযোজ্য।', 'verified', [CH_UZH_FEES]),
  scholarships: NOT_VERIFIED_FEE([CH_UZH_FEES]),
  applicationRoute: txt('Online application through UZH’s own admissions portal.', 'UZH-এর নিজস্ব admissions portal-এর মাধ্যমে online application।', 'partly-verified', [CH_UZH_BACHELOR_ADMISSION]),
  steps: {
    items: [
      { title: b('Confirm your qualification’s equivalence and language requirement', 'আপনার যোগ্যতার সমতুল্যতা আর ভাষার শর্ত নিশ্চিত করুন'), body: b('Check swissuniversities.ch’s country-specific rules; sit the ECUS exam if required.', 'swissuniversities.ch-এর দেশ-নির্দিষ্ট নিয়ম দেখুন; প্রয়োজনে ECUS exam দিন।') },
      { title: b('Apply online and pay the application fee', 'Online আবেদন করুন আর application fee দিন'), body: b('CHF 100, or CHF 150 for a foreign qualification.', 'CHF 100, বা বিদেশি যোগ্যতার জন্য CHF 150।') },
      VISA_STEP,
      { title: b('Pay tuition and enrol', 'Tuition দিয়ে enrol করুন'), body: b('CHF 720 base fee plus the applicable foreign-student surcharge.', 'CHF 720 base fee সঙ্গে প্রযোজ্য বিদেশি-student surcharge।') },
    ],
    status: 'partly-verified',
    sources: [CH_UZH_BACHELOR_ADMISSION, CH_UZH_FEES],
  },
  programs: [],
  lastVerified: READ,
};

const UNIGE: UniversityProfile = {
  id: 'ch-unige',
  countryCode: 'CH',
  name: 'University of Geneva',
  city: 'Geneva',
  ownership: 'public',
  officialUrl: 'https://www.unige.ch/en/university/presentation/',
  admissionsUrl: CH_UNIGE_FEES.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '168', sourceUrl: CH_UNIGE_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A public research university in Geneva, with faculties including science, medicine, law, economics and management, and social sciences, and close ties to international organisations. Teaching is mainly in French, with a number of English-taught Master’s programmes.',
    'Geneva-তে একটি public research university, science, medicine, law, economics and management, আর social sciences-সহ faculty, আর international organisation-র সাথে ঘনিষ্ঠ সম্পর্ক। পড়ানো মূলত ফ্রেঞ্চে, কয়েকটি ইংরেজি-মাধ্যম Master\'s programme সহ।',
  ),
  tuition: {
    ...txt(
      'The University of Geneva’s own registration page states a flat fee of CHF 500 per semester (CHF 65 in fixed fees and CHF 435 in administrative fees), paid in one instalment — no separate, higher foreign-student surcharge was itemized on this official page, unlike ETH Zurich, EPFL or the University of Zurich.',
      'University of Geneva-র নিজের registration page সেমিস্টারে একটি flat CHF 500 fee বলে (CHF 65 fixed fee আর CHF 435 administrative fee), এক কিস্তিতে পরিশোধিত — ETH Zurich, EPFL, বা University of Zurich-এর মতো এই official page-এ আলাদা, বেশি বিদেশি-student surcharge তালিকাভুক্ত ছিল না।',
      'verified',
      [CH_UNIGE_FEES],
    ),
    money: { amount: 500, currency: 'CHF', period: 'semester' },
  },
  deadlines: NOT_VERIFIED_FEE([CH_UNIGE_FEES]),
  nextIntake: intake('not-published', [CH_UNIGE_FEES]),
  admission: NOT_VERIFIED_FEE([CH_UNIGE_FEES]),
  english: NOT_VERIFIED_FEE([CH_UNIGE_FEES]),
  documents: {
    required: [],
    mayBeRequired: [],
    status: 'not-verified',
    sources: [CH_UNIGE_FEES],
  },
  applicationFee: txt('Registration fees of CHF 500/semester (CHF 65 fixed + CHF 435 administrative) are stated on UNIGE’s own page; a distinct one-off application fee separate from this registration fee was not itemized on the page read for this guide.', 'UNIGE-র নিজের page-এ CHF 500/semester (CHF 65 fixed + CHF 435 administrative) registration fee বলা আছে; এই registration fee থেকে আলাদা একটি স্বতন্ত্র one-off application fee এই guide-এর জন্য পড়া page-এ তালিকাভুক্ত ছিল না।', 'partly-verified', [CH_UNIGE_FEES]),
  scholarships: NOT_VERIFIED_FEE([CH_UNIGE_FEES]),
  applicationRoute: NOT_VERIFIED_FEE([CH_UNIGE_FEES]),
  steps: {
    items: [
      { title: b('Check your programme’s own admission page', 'আপনার programme-এর নিজের admission page দেখুন'), body: b('UNIGE’s admission requirements per faculty/programme were not itemized nationally for this guide.', 'UNIGE-র প্রতি faculty/programme ভর্তির শর্ত এই guide-এর জন্য জাতীয়ভাবে তালিকাভুক্ত হয়নি।') },
      VISA_STEP,
      { title: b('Pay the CHF 500/semester registration fee and enrol', 'CHF 500/semester registration fee দিয়ে enrol করুন'), body: b('Paid in one instalment, per UNIGE’s own registration page.', 'UNIGE-র নিজের registration page অনুযায়ী এক কিস্তিতে পরিশোধিত।') },
    ],
    status: 'partly-verified',
    sources: [CH_UNIGE_FEES],
  },
  programs: [],
  lastVerified: READ,
};

export const CH_UNI_LAYER: CountryUniversityLayer = {
  code: 'CH',
  universities: [EPFL, ETHZ, UNIGE, UZH],
  visaStats: [],
  unverified: [
    {
      id: 'ch-bd-visa-approval-rate',
      label: b('Bangladesh-specific visa D/residence-permit approval or refusal rate', 'বাংলাদেশ-নির্দিষ্ট visa D/residence-permit অনুমোদন বা প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific approval-rate figure, or a verified country-wide international-student headcount broken down by nationality from an official Swiss source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'ch-minimum-funds-amount',
      label: b('A single official nationwide minimum-funds figure for the student visa', 'Student visa-র জন্য একটি একক official জাতীয় ন্যূনতম-funds সংখ্যা'),
      status: 'not-verified',
      note: 'The Embassy of Switzerland in Bangladesh’s own checklist assesses a sponsor declaration and financial documents per application rather than naming one fixed amount; cantons may also set their own figures, which were not itemized on an official page read for this guide.',
    },
  ],
  lastVerified: READ,
};

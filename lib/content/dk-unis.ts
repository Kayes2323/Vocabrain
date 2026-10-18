import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, ProgramProfile, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import {
  DK_AAU_FINANCE_FEES,
  DK_AAU_MASTER_APPLY,
  DK_AAU_QS,
  DK_AU_DEADLINES,
  DK_AU_QS,
  DK_AU_TUITION,
  DK_CBS_BACHELOR_ADMISSION,
  DK_CBS_MASTERS_ADMISSION,
  DK_CBS_QS,
  DK_DTU_DEADLINES,
  DK_DTU_ENGLISH,
  DK_DTU_FEES,
  DK_DTU_QS,
  DK_KU_BACHELOR,
  DK_KU_MASTERS_DEADLINES,
  DK_KU_QS,
  DK_KU_SCHOLARSHIPS,
  DK_KU_TUITION,
  DK_READ,
  DK_SIRI_HIGHER_ED,
} from './dk-sources';

/**
 * Denmark: university → program layer, built the same way as Austria's,
 * Hungary's, Switzerland's, the Netherlands', Ireland's, France's, the
 * Czech Republic's, Slovenia's, Lithuania's, Germany's and South Korea's
 * (lib/content/at-unis.ts, hu-unis.ts, ch-unis.ts, nl-unis.ts, ie-unis.ts,
 * fr-unis.ts, cz-unis.ts, si-unis.ts, lt-unis.ts, de-unis.ts, kr-unis.ts).
 * Rankings are QS World University Rankings 2027 as printed on each
 * institution's topuniversities.com profile. Unlike Austria, where tuition
 * is fixed nationally, Denmark lets each public university set its own
 * non-EU/EEA tuition-fee rate per programme, so tuition is researched
 * separately for each institution here, and (for Aalborg University,
 * which prints a full programme-by-programme rate table) left as a range
 * rather than one figure. Admission deadlines, requirements and language
 * rules are genuinely institution-specific and come from each
 * institution's own official pages. Anything that could not be verified on
 * an official page is left marked unverified — never guessed.
 */

const READ = DK_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the institution’s official admissions page.', 'যাচাই হয়নি — institution-এর official admissions page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Apply for Denmark’s student residence and work permit through SIRI', 'SIRI-এর মাধ্যমে Denmark-এর student residence আর work permit-এর আবেদন করুন'),
  body: b('Once admitted, apply through SIRI (the Danish Agency for International Recruitment and Integration) via nyidanmark.dk — normally a 2-month decision (up to 3 months if more documents are needed), for a DKK 3,060 fee, with your biometric features recorded within 14 days of an online submission. See the Denmark student-visa section on the country page.', 'ভর্তি হলে, nyidanmark.dk-এর মাধ্যমে SIRI (Danish Agency for International Recruitment and Integration)-এর কাছে আবেদন করুন — সাধারণত একটি 2-মাসের সিদ্ধান্ত (আরো document লাগলে 3 মাস পর্যন্ত), একটি DKK 3,060 fee-র জন্য, online submission-এর 14 দিনের মধ্যে আপনার biometric feature রেকর্ড করা সহ। Country page-এর Denmark student-visa অংশ দেখুন।'),
};

// ------------------------------------------------------------------ universities

const KU: UniversityProfile = {
  id: 'dk-ku',
  countryCode: 'DK',
  name: 'University of Copenhagen',
  city: 'Copenhagen',
  ownership: 'public',
  officialUrl: 'https://www.ku.dk/studies/admission/application-deposit-fee-and-tuition-fees',
  admissionsUrl: DK_KU_TUITION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=90', sourceUrl: DK_KU_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Denmark’s oldest and largest university, offering degree programmes across sciences, humanities, social sciences, law, theology and health sciences; tuition is charged per programme (one semester, 30 ECTS, at a time) rather than at one flat university-wide rate.',
    'Denmark-এর সবচেয়ে পুরনো আর সবচেয়ে বড় university, sciences, humanities, social sciences, law, theology, আর health sciences জুড়ে degree programme দেয়; tuition একটি flat university-wide rate-এ না, প্রতি programme অনুযায়ী (একবারে এক semester, 30 ECTS) চার্জ করা হয়।',
  ),
  tuition: txt('Charged per programme, one semester (30 ECTS) at a time, for up to four consecutive semesters regardless of how many ECTS you take each semester — the University of Copenhagen’s own page requires you to select your study level and programme to see the exact figure; no single flat rate applies to every programme.', 'প্রতি programme অনুযায়ী চার্জ করা হয়, একবারে এক semester (30 ECTS), সর্বোচ্চ চার ধারাবাহিক semester পর্যন্ত আপনি প্রতি semester-এ যত ECTS নেন তা নির্বিশেষে — University of Copenhagen-এর নিজের page সঠিক সংখ্যা দেখতে আপনার study level আর programme বাছাই করতে বলে; কোনো একক flat rate প্রতিটি programme-এ প্রযোজ্য না।', 'partly-verified', [DK_KU_TUITION]),
  deadlines: txt('Master’s programmes: 15 January (autumn, Non-EU/EEA/Swiss) or 15 October (spring), per the University of Copenhagen’s own dates-and-deadlines page. Bachelor’s programmes with a foreign qualification: 15 March, 12:00 CET, with admission requirements completable up to 5 July.', 'Master\'s programme: 15 January (autumn, Non-EU/EEA/Swiss) বা 15 October (spring), University of Copenhagen-এর নিজের dates-and-deadlines page অনুযায়ী। বিদেশি যোগ্যতা থাকা Bachelor\'s programme: 15 March, 12:00 CET, ভর্তির শর্ত 5 July পর্যন্ত পূরণ করার সুযোগ সহ।', 'verified', [DK_KU_MASTERS_DEADLINES, DK_KU_BACHELOR]),
  nextIntake: intake('confirmed', [DK_KU_MASTERS_DEADLINES], b('Autumn (September) or spring semester, depending on programme', 'Autumn (September) বা spring semester, programme অনুযায়ী')),
  admission: txt('Applicants with citizenship from outside the EU/EEA or Nordic countries must pay tuition fees (subject to specific exemptions, e.g. a permanent Danish/Nordic residence permit); a non-refundable application deposit fee of DKK 1,120 (about EUR 150) is also charged per application round for master’s programmes, deducted from your first tuition payment if admitted.', 'EU/EEA বা Nordic দেশের বাইরের নাগরিকত্ব থাকা আবেদনকারীদের tuition fee পরিশোধ করতে হয় (নির্দিষ্ট exemption সাপেক্ষে, যেমন একটি permanent Danish/Nordic residence permit); master\'s programme-এর জন্য প্রতি application round-এ একটি non-refundable application deposit fee DKK 1,120 (প্রায় EUR 150)-ও চার্জ করা হয়, ভর্তি হলে প্রথম tuition payment থেকে বাদ দেওয়া হয়।', 'verified', [DK_KU_TUITION]),
  english: NOT_VERIFIED_FEE([DK_KU_TUITION]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [DK_KU_TUITION] },
  applicationFee: txt('DKK 1,120 (about EUR 150) application deposit fee per application round for master’s programmes, deducted from the first tuition payment if admitted and not refunded if a tuition waiver is awarded.', 'Master\'s programme-এর জন্য প্রতি application round-এ DKK 1,120 (প্রায় EUR 150) application deposit fee, ভর্তি হলে প্রথম tuition payment থেকে বাদ দেওয়া হয় আর একটি tuition waiver পেলে ফেরত দেওয়া হয় না।', 'verified', [DK_KU_TUITION]),
  scholarships: txt('The Danish Government Scholarship: a limited number of full or partial tuition-fee waivers and/or living-cost grants for highly qualified non-EU/EEA applicants, automatically considered with no separate application — not a Bangladesh-specific scholarship, and some faculties (e.g. Social Sciences) state only "2-3 per year" are available.', 'Danish Government Scholarship: highly qualified non-EU/EEA আবেদনকারীদের জন্য সীমিত সংখ্যক full বা partial tuition-fee waiver আর/বা living-cost grant, কোনো আলাদা application ছাড়াই স্বয়ংক্রিয়ভাবে বিবেচিত — একটি Bangladesh-specific scholarship না, আর কিছু faculty (যেমন Social Sciences) বলে বছরে শুধু "2-3টা" পাওয়া যায়।', 'partly-verified', [DK_KU_SCHOLARSHIPS]),
  applicationRoute: txt('Online application through the University of Copenhagen’s own admission system, after paying the application deposit fee and selecting your study level and programme on its own tuition page.', 'Application deposit fee পরিশোধ করার পর আর তার নিজের tuition page-এ আপনার study level আর programme বাছাই করার পর University of Copenhagen-এর নিজস্ব admission system-এর মাধ্যমে online application।', 'verified', [DK_KU_TUITION]),
  steps: {
    items: [
      { title: b('Select your study level and programme to see the exact tuition figure', 'সঠিক tuition সংখ্যা দেখতে আপনার study level আর programme বাছাই করুন'), body: b('Tuition is charged per programme, one semester (30 ECTS) at a time — there is no single university-wide rate.', 'Tuition প্রতি programme অনুযায়ী চার্জ করা হয়, একবারে এক semester (30 ECTS) — কোনো একক university-wide rate নেই।') },
      { title: b('Pay the DKK 1,120 application deposit fee before submitting', 'জমা দেওয়ার আগে DKK 1,120 application deposit fee পরিশোধ করুন'), body: b('Upload your payment receipt with each application; without it, the application is not processed.', 'আপনার application-এর সঙ্গে payment receipt upload করুন; এটা ছাড়া application প্রক্রিয়া হয় না।') },
      { title: b('Apply online by the master’s (15 January/15 October) or bachelor’s (15 March) deadline', 'Master\'s (15 January/15 October) বা bachelor\'s (15 March) deadline-এর মধ্যে অনলাইনে আবেদন করুন'), body: b('Submit all required documents in full.', 'সব প্রয়োজনীয় document সম্পূর্ণভাবে জমা দিন।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [DK_KU_TUITION, DK_KU_MASTERS_DEADLINES],
  },
  programs: [],
  lastVerified: READ,
};

const DTU_MASTERS_PROGRAM: ProgramProfile = {
  id: 'dk-dtu-msc-general',
  title: 'English-taught MSc programmes (general, 2-year regular MSc / Industry MSc)',
  level: 'masters',
  faculty: 'Varies by programme',
  languages: b('English', 'ইংরেজি'),
  englishOnly: true,
  duration: b('2 years (120 ECTS), the standard MSc length', '2 বছর (120 ECTS), স্বাভাবিক MSc দৈর্ঘ্য'),
  tuition: { ...txt('EUR 7,500 per semester for non-EU/EEA fee-paying students, so EUR 30,000 in total for a 2-year MSc, per DTU’s own fees-and-funding page.', 'DTU-এর নিজের fees-and-funding page অনুযায়ী, non-EU/EEA fee-paying student-দের জন্য প্রতি semester-এ EUR 7,500, তাই একটি 2-year MSc-এর জন্য সর্বমোট EUR 30,000।', 'verified', [DK_DTU_FEES]), money: { amount: 7500, currency: 'EUR', period: 'semester' } },
  deadline: txt('Non-EU citizens (fee-paying students): 15 January for the autumn intake (semester starts September); 15 September for the spring intake (semester starts February) — the same dates are also the deadline to fulfil the English-language requirement.', 'Non-EU নাগরিক (fee-paying student): autumn intake (semester শুরু September)-এর জন্য 15 January; spring intake (semester শুরু February)-এর জন্য 15 September — একই তারিখ English-language শর্ত পূরণের deadline-ও।', 'verified', [DK_DTU_DEADLINES]),
  nextIntake: intake('confirmed', [DK_DTU_DEADLINES], b('Autumn (September) or spring (February) intake', 'Autumn (September) বা spring (February) intake')),
  requirements: txt('A relevant Bachelor’s degree; exact programme-level academic requirements are set per programme and were not itemized nationally on the pages read for this guide.', 'একটি সম্পর্কিত Bachelor\'s degree; সঠিক programme-level academic শর্ত প্রতি programme অনুযায়ী ঠিক হয় আর এই guide-এর জন্য পড়া page-এ জাতীয়ভাবে তালিকাভুক্ত হয়নি।', 'partly-verified', [DK_DTU_DEADLINES]),
  english: txt('IELTS Academic 6.5 (or TOEFL equivalent), documented no later than the application deadline, per DTU’s own English-language-requirements page.', 'DTU-এর নিজের English-language-requirements page অনুযায়ী, application deadline-এর মধ্যে IELTS Academic 6.5 (বা সমতুল্য TOEFL) documented করতে হয়।', 'verified', [DK_DTU_ENGLISH]),
  applyVia: b('DTU’s own online application portal (fee-paying, non-EU route)', 'DTU-এর নিজস্ব online application portal (fee-paying, non-EU route)'),
  url: 'https://www.dtu.dk/english/education/graduate/fees-and-funding',
  sources: [DK_DTU_FEES, DK_DTU_DEADLINES, DK_DTU_ENGLISH],
  lastVerified: READ,
};

const DTU: UniversityProfile = {
  id: 'dk-dtu',
  countryCode: 'DK',
  name: 'Technical University of Denmark (DTU)',
  city: 'Kongens Lyngby',
  ownership: 'public',
  officialUrl: 'https://www.dtu.dk/english',
  admissionsUrl: DK_DTU_FEES.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '105', sourceUrl: DK_DTU_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Denmark’s leading technical university, offering engineering, natural-sciences and technology MSc programmes with a large international student body and dedicated English-taught Industry MSc routes.',
    'Denmark-এর শীর্ষ technical university, engineering, natural sciences, আর technology MSc programme দেয়, একটি বড় international student body আর নিবেদিত English-taught Industry MSc route সহ।',
  ),
  tuition: { ...txt('EUR 7,500 per semester for non-EU/EEA fee-paying students enrolled in a DTU study programme, per DTU’s own fees-and-funding page — EUR 30,000 in total for the standard 2-year MSc.', 'DTU-এর নিজের fees-and-funding page অনুযায়ী, DTU study programme-এ ভর্তি হওয়া non-EU/EEA fee-paying student-দের জন্য প্রতি semester-এ EUR 7,500 — স্বাভাবিক 2-year MSc-এর জন্য সর্বমোট EUR 30,000।', 'verified', [DK_DTU_FEES]), money: { amount: 7500, currency: 'EUR', period: 'semester' } },
  deadlines: txt('Non-EU citizens (fee-paying students): 15 January for the autumn intake; 15 September for the spring intake, per DTU’s own application-deadlines page.', 'DTU-এর নিজের application-deadlines page অনুযায়ী, non-EU নাগরিক (fee-paying student): autumn intake-এর জন্য 15 January; spring intake-এর জন্য 15 September।', 'verified', [DK_DTU_DEADLINES]),
  nextIntake: intake('confirmed', [DK_DTU_DEADLINES], b('Autumn (September) or spring (February) intake', 'Autumn (September) বা spring (February) intake')),
  admission: txt('Online application portal opens 1 December for the autumn intake; applicants must submit a relevant Bachelor’s degree and meet the English-language requirement by the same 15 January/15 September deadline as the application itself.', 'Autumn intake-এর জন্য online application portal 1 December খোলে; আবেদনকারীদের একটি সম্পর্কিত Bachelor\'s degree জমা দিতে হয় আর application-এর মতো একই 15 January/15 September deadline-এর মধ্যে English-language শর্ত পূরণ করতে হয়।', 'verified', [DK_DTU_DEADLINES]),
  english: txt('IELTS Academic 6.5 (or TOEFL equivalent), per DTU’s own English-language-requirements page.', 'DTU-এর নিজের English-language-requirements page অনুযায়ী, IELTS Academic 6.5 (বা সমতুল্য TOEFL)।', 'verified', [DK_DTU_ENGLISH]),
  documents: {
    required: [b('Bachelor’s degree certificate/transcript', 'Bachelor\'s degree সনদ/transcript'), b('IELTS Academic 6.5 or equivalent TOEFL score', 'IELTS Academic 6.5 বা সমতুল্য TOEFL score')],
    mayBeRequired: [],
    status: 'partly-verified',
    sources: [DK_DTU_ENGLISH],
  },
  applicationFee: NOT_VERIFIED_FEE([DK_DTU_FEES]),
  scholarships: txt('No DTU-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide; DTU’s own fees page describes only the standard tuition-fee structure.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য DTU-specific একটি full-degree scholarship পাওয়া যায়নি; DTU-এর নিজের fees page শুধু standard tuition-fee structure বর্ণনা করে।', 'not-verified', [DK_DTU_FEES]),
  applicationRoute: txt('Online application via DTU’s own portal (fee-paying, non-EU route), within the 15 January (autumn) or 15 September (spring) window.', '15 January (autumn) বা 15 September (spring) window-এর মধ্যে DTU-এর নিজস্ব portal-এর মাধ্যমে online application (fee-paying, non-EU route)।', 'verified', [DK_DTU_DEADLINES]),
  steps: {
    items: [
      { title: b('Confirm your English test meets IELTS Academic 6.5 (or equivalent)', 'নিশ্চিত করুন আপনার English test IELTS Academic 6.5 (বা সমতুল্য) পূরণ করে'), body: b('This must be documented by the same deadline as your application.', 'এটা আপনার application-এর মতো একই deadline-এর মধ্যে documented করতে হয়।') },
      { title: b('Apply online by 15 January (autumn) or 15 September (spring)', '15 January (autumn) বা 15 September (spring)-এর মধ্যে অনলাইনে আবেদন করুন'), body: b('Submit your Bachelor’s degree documents and pay the non-EU tuition deposit as instructed.', 'আপনার Bachelor\'s degree document জমা দিন আর নির্দেশ অনুযায়ী non-EU tuition deposit পরিশোধ করুন।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [DK_DTU_DEADLINES, DK_DTU_ENGLISH],
  },
  programs: [DTU_MASTERS_PROGRAM],
  lastVerified: READ,
};

const AU: UniversityProfile = {
  id: 'dk-au',
  countryCode: 'DK',
  name: 'Aarhus University',
  city: 'Aarhus',
  ownership: 'public',
  officialUrl: 'https://international.au.dk/',
  admissionsUrl: DK_AU_TUITION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=128', sourceUrl: DK_AU_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'One of Denmark’s largest universities, offering over 50 English-taught Master’s programmes; tuition and the application fee are charged to non-EU/EEA/Swiss citizens, with rates varying by programme on the university’s own current-rates page.',
    'Denmark-এর সবচেয়ে বড় university-গুলোর একটা, 50-র বেশি English-taught Master\'s programme দেয়; tuition আর application fee non-EU/EEA/Swiss নাগরিকদের চার্জ করা হয়, rate university-র নিজের current-rates page-এ programme অনুযায়ী আলাদা।',
  ),
  tuition: txt('Non-EU/EEA/Swiss citizens must pay tuition; the annual rate varies by programme and is published on Aarhus University’s own "current tuition fee rates" page rather than at one flat figure for the whole university.', 'Non-EU/EEA/Swiss নাগরিকদের tuition পরিশোধ করতে হয়; বার্ষিক rate programme অনুযায়ী আলাদা আর Aarhus University-র নিজের "current tuition fee rates" page-এ প্রকাশিত, পুরো university-র জন্য একটি flat সংখ্যায় না।', 'partly-verified', [DK_AU_TUITION]),
  deadlines: txt('Master’s, summer (August/September) intake: application opens 1 November, non-EU deadline 15 January. Winter (January/February) intake, limited programmes: application opens 24 August, non-EU deadline 15 October — per Aarhus University’s own deadlines page.', 'Master\'s, summer (August/September) intake: application 1 November খোলে, non-EU deadline 15 January। Winter (January/February) intake, সীমিত programme: application 24 August খোলে, non-EU deadline 15 October — Aarhus University-র নিজের deadlines page অনুযায়ী।', 'verified', [DK_AU_DEADLINES]),
  nextIntake: intake('confirmed', [DK_AU_DEADLINES], b('Summer (August/September) intake, or a limited winter (January/February) intake for some programmes', 'Summer (August/September) intake, বা কিছু programme-এর জন্য একটি সীমিত winter (January/February) intake')),
  admission: txt('Non-EU/EEA/Swiss applicants pay a EUR 150 application fee covering up to three applications to Aarhus University, due by the application deadline; the fee is reimbursed if you accept an offer and remain enrolled by 1 October (summer intake) or 1 March (winter intake).', 'Non-EU/EEA/Swiss আবেদনকারীরা Aarhus University-তে সর্বোচ্চ তিনটা application কভার করা EUR 150 application fee পরিশোধ করেন, application deadline-এর মধ্যে; আপনি offer গ্রহণ করে 1 October (summer intake) বা 1 March (winter intake)-এর মধ্যে enrolled থাকলে fee ফেরত দেওয়া হয়।', 'verified', [DK_AU_DEADLINES]),
  english: NOT_VERIFIED_FEE([DK_AU_TUITION]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [DK_AU_TUITION] },
  applicationFee: txt('EUR 150 (about DKK 1,125), covering up to three applications per intake.', 'EUR 150 (প্রায় DKK 1,125), প্রতি intake-এ সর্বোচ্চ তিনটা application কভার করে।', 'verified', [DK_AU_DEADLINES]),
  scholarships: txt('No Aarhus-University-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide; Study in Denmark’s own, broader Danish Government Scholarship is the closest national offer and is university-administered, with no separate scholarship application.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য Aarhus-University-specific একটি full-degree scholarship পাওয়া যায়নি; Study in Denmark-এর নিজের, বিস্তৃত Danish Government Scholarship সবচেয়ে কাছের জাতীয় offer, আর এটা university-administered, কোনো আলাদা scholarship application ছাড়া।', 'not-verified', [DK_AU_TUITION]),
  applicationRoute: txt('Online application via Aarhus University’s own portal, within the summer (1 November–15 January) or limited winter (24 August–15 October) application window.', 'Summer (1 November–15 January) বা সীমিত winter (24 August–15 October) application window-এর মধ্যে Aarhus University-র নিজস্ব portal-এর মাধ্যমে online application।', 'verified', [DK_AU_DEADLINES]),
  steps: {
    items: [
      { title: b('Check the current tuition-fee rate for your programme', 'আপনার programme-এর জন্য current tuition-fee rate দেখুন'), body: b('Rates are published per programme, not as one university-wide figure.', 'Rate প্রতি programme অনুযায়ী প্রকাশিত, একটি university-wide সংখ্যা না।') },
      { title: b('Pay the EUR 150 application fee and apply by 15 January (summer) or 15 October (winter)', 'EUR 150 application fee পরিশোধ করুন আর 15 January (summer) বা 15 October (winter)-এর মধ্যে আবেদন করুন'), body: b('The application portal opens well in advance (1 November for summer, 24 August for winter).', 'Application portal আগে থেকে খোলে (summer-এর জন্য 1 November, winter-এর জন্য 24 August)।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [DK_AU_DEADLINES, DK_AU_TUITION],
  },
  programs: [],
  lastVerified: READ,
};

const CBS: UniversityProfile = {
  id: 'dk-cbs',
  countryCode: 'DK',
  name: 'Copenhagen Business School (CBS)',
  city: 'Frederiksberg',
  ownership: 'public',
  officialUrl: 'https://www.cbs.dk/en/study-programmes/international-students',
  admissionsUrl: DK_CBS_MASTERS_ADMISSION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: null, sourceUrl: DK_CBS_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'One of Europe’s largest business schools; CBS is not ranked in the overall QS World University Rankings 2027 (its topuniversities.com profile shows only a QS WUR subject ranking, #18 in marketing, as of this guide’s read date). It offers business, economics and social-science bachelor’s and master’s programmes, and runs its own "appraisal" service to pre-check non-EU qualifications.',
    'ইউরোপের সবচেয়ে বড় business school-গুলোর একটা; CBS সামগ্রিক QS World University Rankings 2027-এ ranked না (এই guide-এর read date পর্যন্ত তার topuniversities.com profile শুধু একটি QS WUR subject ranking দেখায়, marketing-এ #18)। এটা business, economics, আর social-science bachelor\'s আর master\'s programme দেয়, আর non-EU যোগ্যতা আগে থেকে চেক করার জন্য নিজের "appraisal" service চালায়।',
  ),
  tuition: txt('Master’s programmes: EUR 8,000 per semester (EUR 16,000 per year) / DKK 60,000 per semester (DKK 120,000 per year). Bachelor’s programmes: EUR 6,500 per semester (EUR 13,000 per year) / DKK 49,000 per semester (DKK 98,000 per year) — both per CBS’s own application-and-admission pages.', 'CBS-এর নিজের application-and-admission page অনুযায়ী, Master\'s programme: প্রতি semester-এ EUR 8,000 (বছরে EUR 16,000) / প্রতি semester-এ DKK 60,000 (বছরে DKK 120,000)। Bachelor\'s programme: প্রতি semester-এ EUR 6,500 (বছরে EUR 13,000) / প্রতি semester-এ DKK 49,000 (বছরে DKK 98,000)।', 'verified', [DK_CBS_MASTERS_ADMISSION, DK_CBS_BACHELOR_ADMISSION]),
  deadlines: txt('Bachelor’s: a fixed, nationwide 15 March, 12:00 CET deadline, with the application fee due by the same date — per CBS’s own page, missing it means you cannot apply until the following year. Master’s: the application fee must be paid by the application deadline each round; the first tuition-fee payment deadline is 17 December.', 'Bachelor\'s: একটি নির্দিষ্ট, দেশব্যাপী 15 March, 12:00 CET deadline, একই তারিখের মধ্যে application fee পরিশোধ সহ — CBS-এর নিজের page অনুযায়ী, এটা মিস করলে পরের বছর পর্যন্ত আবেদন করতে পারবেন না। Master\'s: application fee প্রতি round-এর application deadline-এর মধ্যে পরিশোধ করতে হয়; প্রথম tuition-fee payment deadline 17 December।', 'verified', [DK_CBS_BACHELOR_ADMISSION, DK_CBS_MASTERS_ADMISSION]),
  nextIntake: intake('confirmed', [DK_CBS_MASTERS_ADMISSION], b('Autumn (September) intake', 'Autumn (September) intake')),
  admission: txt('Non-EU/EEA/Swiss citizens (and anyone without a Danish upper-secondary exam) must pay an EUR 150 application fee per admission round; CBS’s own page notes the minimum processing time for a student residence permit is 8 weeks, with no guarantee it finishes before study start.', 'Non-EU/EEA/Swiss নাগরিক (আর যাদের Danish upper-secondary exam নেই) প্রতি admission round-এ একটি EUR 150 application fee পরিশোধ করতে হয়; CBS-এর নিজের page বলে একটি student residence permit-এর ন্যূনতম processing time 8 সপ্তাহ, এটা study start-এর আগে শেষ হওয়ার কোনো গ্যারান্টি ছাড়া।', 'verified', [DK_CBS_MASTERS_ADMISSION]),
  english: NOT_VERIFIED_FEE([DK_CBS_MASTERS_ADMISSION]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [DK_CBS_MASTERS_ADMISSION] },
  applicationFee: txt('EUR 150 (about DKK 1,125) per applicant, per admission round.', 'প্রতি আবেদনকারী, প্রতি admission round-এ EUR 150 (প্রায় DKK 1,125)।', 'verified', [DK_CBS_BACHELOR_ADMISSION]),
  scholarships: txt('No CBS-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide; CBS’s own master’s page points only to Study in Denmark’s broader Danish Government Scholarship, student loans and external scholarships.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য CBS-specific একটি full-degree scholarship পাওয়া যায়নি; CBS-এর নিজের master\'s page শুধু Study in Denmark-এর বিস্তৃত Danish Government Scholarship, student loan, আর বাহ্যিক scholarship-এর দিকে নির্দেশ করে।', 'not-verified', [DK_CBS_MASTERS_ADMISSION]),
  applicationRoute: txt('Online application via CBS’s own application portal; a non-EU educational background can first be checked through CBS’s own "appraisal" round.', 'CBS-এর নিজস্ব application portal-এর মাধ্যমে online application; একটি non-EU educational background CBS-এর নিজের "appraisal" round দিয়ে আগে চেক করা যায়।', 'verified', [DK_CBS_BACHELOR_ADMISSION]),
  steps: {
    items: [
      { title: b('Consider CBS’s "appraisal" round if your qualification is non-European', 'আপনার যোগ্যতা non-European হলে CBS-এর "appraisal" round বিবেচনা করুন'), body: b('CBS checks whether your documents meet the entry requirements for a specific programme before you formally apply.', 'CBS আপনার document একটি নির্দিষ্ট programme-এর জন্য entry requirement পূরণ করে কিনা তা আপনার formal আবেদনের আগেই চেক করে।') },
      { title: b('Pay the EUR 150 application fee and apply by 15 March (bachelor’s) or the round deadline (master’s)', 'EUR 150 application fee পরিশোধ করুন আর 15 March (bachelor\'s) বা round deadline (master\'s)-এর মধ্যে আবেদন করুন'), body: b('CBS will not process your application until the fee is confirmed paid.', 'Fee পরিশোধ নিশ্চিত না হওয়া পর্যন্ত CBS আপনার application প্রক্রিয়া করবে না।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [DK_CBS_BACHELOR_ADMISSION, DK_CBS_MASTERS_ADMISSION],
  },
  programs: [],
  lastVerified: READ,
};

const AALBORG: UniversityProfile = {
  id: 'dk-aalborg',
  countryCode: 'DK',
  name: 'Aalborg University (AAU)',
  city: 'Aalborg',
  ownership: 'public',
  officialUrl: 'https://www.en.aau.dk/',
  admissionsUrl: DK_AAU_MASTER_APPLY.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=329', sourceUrl: DK_AAU_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Known internationally for its problem-based learning (PBL) model, with campuses in Aalborg, Esbjerg and Copenhagen, offering a wide range of English-taught engineering, science, social-science and humanities master’s programmes.',
    'তার problem-based learning (PBL) model-এর জন্য আন্তর্জাতিকভাবে পরিচিত, Aalborg, Esbjerg, আর Copenhagen-এ campus সহ, English-taught engineering, science, social-science, আর humanities master\'s programme-এর একটি বিস্তৃত পরিসর দেয়।',
  ),
  tuition: txt('Non-EU/EEA students pay tuition per semester, by programme — AAU’s own 2026 rate table lists DKK 27,800/semester (about EUR 3,725) for programmes such as Economics and Business Administration and International Relations, DKK 39,550/semester (about EUR 5,295) for programmes such as Geography, and DKK 57,850/semester (about EUR 7,745) for most engineering, science, technology and medical programmes.', 'Non-EU/EEA student-রা প্রতি semester, প্রতি programme অনুযায়ী tuition পরিশোধ করেন — AAU-এর নিজের 2026 rate table Economics and Business Administration আর International Relations-এর মতো programme-এর জন্য DKK 27,800/semester (প্রায় EUR 3,725), Geography-র মতো programme-এর জন্য DKK 39,550/semester (প্রায় EUR 5,295), আর অধিকাংশ engineering, science, technology, আর medical programme-এর জন্য DKK 57,850/semester (প্রায় EUR 7,745) তালিকাভুক্ত করে।', 'verified', [DK_AAU_FINANCE_FEES]),
  deadlines: txt('September intake: 15 January, 23:59 CET for fee-paying (non-EU) applicants; 1 March for non-fee-paying (mostly EU/EEA) applicants. February intake (limited programmes): 15 October, 23:59 CET for all applicants — per Aalborg University’s own how-and-when-to-apply page.', 'Aalborg University-র নিজের how-and-when-to-apply page অনুযায়ী, September intake: fee-paying (non-EU) আবেদনকারীদের জন্য 15 January, 23:59 CET; non-fee-paying (মূলত EU/EEA) আবেদনকারীদের জন্য 1 March। February intake (সীমিত programme): সব আবেদনকারীর জন্য 15 October, 23:59 CET।', 'verified', [DK_AAU_MASTER_APPLY]),
  nextIntake: intake('confirmed', [DK_AAU_MASTER_APPLY], b('September intake, or a limited February intake for some programmes', 'September intake, বা কিছু programme-এর জন্য একটি সীমিত February intake')),
  admission: txt('Non-EU/EEA citizens must pay a non-refundable EUR 150 (DKK 1,150) application fee, covering up to three programme applications per intake; the fee payment deadline for fee-paying September-intake applicants is 20 April after admission, per AAU’s own finance-and-fees page.', 'Non-EU/EEA নাগরিকদের একটি non-refundable EUR 150 (DKK 1,150) application fee পরিশোধ করতে হয়, প্রতি intake-এ সর্বোচ্চ তিনটা programme application কভার করে; AAU-এর নিজের finance-and-fees page অনুযায়ী, fee-paying September-intake আবেদনকারীদের জন্য ভর্তির পর fee payment deadline 20 April।', 'verified', [DK_AAU_FINANCE_FEES]),
  english: NOT_VERIFIED_FEE([DK_AAU_MASTER_APPLY]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [DK_AAU_MASTER_APPLY] },
  applicationFee: txt('EUR 150 / DKK 1,150, covering up to three applications to Aalborg University for the specific intake (cannot be transferred to another intake).', 'EUR 150 / DKK 1,150, সেই নির্দিষ্ট intake-এর জন্য Aalborg University-তে সর্বোচ্চ তিনটা application কভার করে (অন্য intake-এ transfer করা যায় না)।', 'verified', [DK_AAU_FINANCE_FEES]),
  scholarships: txt('AAU’s own page states it grants a limited number of Danish-Government-financed scholarships (approximately 15 a year) to individually selected non-EU/EEA master’s applicants, based on strategic considerations and academic qualifications — automatic consideration, no separate application, a full tuition waiver plus a monthly stipend of DKK 11,225 (EUR 1,503) in 2026. No official page read for this guide names Bangladesh specifically as eligible.', 'AAU-এর নিজের page বলে তারা strategic consideration আর academic যোগ্যতার ভিত্তিতে individually selected non-EU/EEA master\'s আবেদনকারীদের একটি সীমিত সংখ্যক Danish-Government-financed scholarship দেয় (বছরে প্রায় 15টা) — স্বয়ংক্রিয় বিবেচনা, কোনো আলাদা application ছাড়া, একটি সম্পূর্ণ tuition waiver সঙ্গে 2026 সালে মাসিক stipend DKK 11,225 (EUR 1,503)। এই guide-এর জন্য পড়া কোনো official page Bangladesh-কে বিশেষভাবে যোগ্য বলে নাম দেয়নি।', 'verified', [DK_AAU_FINANCE_FEES]),
  applicationRoute: txt('Online application via Aalborg University’s own application portal (DANS/STADS), within the fee-paying 15 January (September intake) or 15 October (February intake) window.', 'Fee-paying 15 January (September intake) বা 15 October (February intake) window-এর মধ্যে Aalborg University-র নিজস্ব application portal (DANS/STADS)-এর মাধ্যমে online application।', 'verified', [DK_AAU_MASTER_APPLY]),
  steps: {
    items: [
      { title: b('Check the tuition-fee rate for your specific programme', 'আপনার নির্দিষ্ট programme-এর জন্য tuition-fee rate দেখুন'), body: b('Rates range from DKK 27,800 to DKK 57,850 per semester depending on the programme — there is no single flat figure.', 'Rate programme অনুযায়ী প্রতি semester-এ DKK 27,800 থেকে DKK 57,850 পর্যন্ত — কোনো একক flat সংখ্যা নেই।') },
      { title: b('Pay the EUR 150 application fee and apply by 15 January (fee-paying, September intake)', 'EUR 150 application fee পরিশোধ করুন আর 15 January (fee-paying, September intake)-এর মধ্যে আবেদন করুন'), body: b('All non-EU applicants to a master’s programme are automatically considered for the Danish Government Scholarship — no separate application.', 'Master\'s programme-এর সব non-EU আবেদনকারী স্বয়ংক্রিয়ভাবে Danish Government Scholarship-এর জন্য বিবেচিত হন — কোনো আলাদা application না।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [DK_AAU_MASTER_APPLY, DK_AAU_FINANCE_FEES],
  },
  programs: [],
  lastVerified: READ,
};

export const DK_UNI_LAYER: CountryUniversityLayer = {
  code: 'DK',
  universities: [AALBORG, AU, CBS, DTU, KU],
  visaStats: [],
  unverified: [
    {
      id: 'dk-bd-visa-approval-rate',
      label: b('Bangladesh-specific residence-permit approval or refusal rate', 'বাংলাদেশ-নির্দিষ্ট residence-permit অনুমোদন বা প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific approval-rate figure, or a verified country-wide international-student headcount broken down by nationality from an official Danish source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'dk-embassy-dhaka-residence-permit-role',
      label: b('Direct confirmation that the Royal Danish Embassy in Dhaka specifically processes student residence-permit applications (as opposed to short-stay Schengen visas)', 'Royal Danish Embassy in Dhaka বিশেষভাবে student residence-permit application প্রক্রিয়া করে তার সরাসরি নিশ্চিতকরণ (short-stay Schengen visa-র বিপরীতে)'),
      status: 'needs-review',
      note: 'The Ministry of Foreign Affairs’ own um.dk page confirms the Royal Danish Embassy in Dhaka handles Schengen visa applications for Denmark and Norway, and SIRI’s own page directs residence-permit applicants abroad to "a Danish diplomatic mission or application centre" in their country of residence (pointing to um.dk’s own mission list) — but this guide could not independently read a page that names the Dhaka mission specifically for student residence-permit submission or biometrics, so this is a strong inference, not a directly confirmed fact.',
    },
    {
      id: 'dk-post-1-oct-2026-rule-stability',
      label: b('Whether the 1 October 2026 job-seeking-permit and family-member rule change remains in force at any later read of this guide', '1 October 2026-এর job-seeking-permit আর family-member নিয়ম পরিবর্তন এই guide-এর পরের কোনো পাঠেও বহাল থাকে কিনা'),
      status: 'needs-review',
      note: 'This guide was read on 2026-10-18, just after the 1 October 2026 rule change took effect, from SIRI’s own notice. Because the change is very recent, it is flagged for an earlier-than-usual recheck in case of a reversal, legal challenge or further amendment.',
    },
  ],
  lastVerified: READ,
};

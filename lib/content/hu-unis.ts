import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, ProgramProfile, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import {
  HU_BME,
  HU_BME_ADMISSION,
  HU_BME_QS,
  HU_BME_TUITION,
  HU_DEBRECEN,
  HU_DEBRECEN_ADMISSION,
  HU_DEBRECEN_FEES,
  HU_DEBRECEN_QS,
  HU_ELTE,
  HU_ELTE_QS,
  HU_ELTE_SCIENCE_FEE,
  HU_OIF_STUDENT_PERMIT,
  HU_READ,
  HU_SEMMELWEIS,
  HU_SEMMELWEIS_FEES,
  HU_SEMMELWEIS_QS,
  HU_SH_CALL_BA_MA_OTM,
  HU_SH_PARTNERS,
} from './hu-sources';

/**
 * Hungary: university → program layer, built the same way as Switzerland's,
 * the Netherlands', Ireland's, France's, Czech Republic's, Slovenia's,
 * Lithuania's, Germany's and South Korea's (lib/content/ch-unis.ts,
 * nl-unis.ts, ie-unis.ts, fr-unis.ts, cz-unis.ts, si-unis.ts, lt-unis.ts,
 * de-unis.ts, kr-unis.ts). Rankings are QS World University Rankings 2027
 * as printed on each institution's topuniversities.com profile — Semmelweis
 * University is not in that overall ranking (it holds a QS WUR Ranking By
 * Subject position and "QS Contributor" status instead), so its overall
 * rank is left null rather than guessed. Tuition, deadlines and
 * requirements come from each institution's own official pages. Each of
 * the four universities admits both self-financed, fee-paying applicants
 * (through its own system) and Stipendium Hungaricum scholarship
 * applicants (through Tempus Public Foundation plus Bangladesh's own
 * Sending Partner nomination) — two separate routes, never interchangeable.
 * Anything that could not be verified on an official page is left marked
 * unverified — never guessed.
 */

const READ = HU_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the institution’s official admissions page.', 'যাচাই হয়নি — institution-এর official admissions page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Apply for the Hungarian residence permit for study purposes', 'পড়ার উদ্দেশ্যে Hungarian residence permit-এর আবেদন করুন'),
  body: b('Once admitted, apply before the Hungarian consulate covering Bangladesh (in practice, the Hungary Visa Application Centre run by VFS Global in Dhaka) for a residence permit for the purpose of studies — this single application comprises the visa application. OIF decides within about 60 days; once approved, a single-entry "D"-type visa lets you travel to Hungary and collect the actual residence-permit card. See the Hungary student-visa section on the country page.', 'ভর্তি হলে, Bangladesh-এর জন্য দায়িত্বে থাকা Hungarian consulate-এ (বাস্তবে, Dhaka-য় VFS Global-এর পরিচালিত Hungary Visa Application Centre) পড়ার উদ্দেশ্যে একটি residence permit-এর জন্য আবেদন করুন — এই একক application visa application-কে অন্তর্ভুক্ত করে। OIF প্রায় 60 দিনের মধ্যে সিদ্ধান্ত নেয়; অনুমোদিত হলে, একটি single-entry "D"-type visa আপনাকে Hungary-তে যাওয়ার আর আসল residence-permit card সংগ্রহ করার অনুমতি দেয়। Country page-এর Hungary student-visa অংশ দেখুন।'),
};

// ------------------------------------------------------------------ universities

const BME: UniversityProfile = {
  id: 'hu-bme',
  countryCode: 'HU',
  name: 'Budapest University of Technology and Economics (BME)',
  city: 'Budapest',
  ownership: 'public',
  officialUrl: 'https://www.bme.hu/en/application_and_admission',
  admissionsUrl: HU_BME_ADMISSION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '751-760', sourceUrl: HU_BME_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Hungary’s leading technical university, offering over 50 English-language Bachelor’s, Master’s and Doctoral programmes in engineering, natural sciences, economics and management, through ten faculties.',
    'Hungary-র শীর্ষ technical university, engineering, natural sciences, economics, আর management-এ 50-র বেশি ইংরেজি-ভাষার Bachelor\'s, Master\'s, আর Doctoral programme দেয়, দশটা faculty-র মাধ্যমে।',
  ),
  tuition: {
    ...txt(
      'BME sets a separate tuition fee per faculty and programme, stated in EUR for non-EU citizens (and generally in HUF, with an EUR equivalent shown, for EU citizens). Non-EU Bachelor’s/preparatory fees mostly range from EUR 3,200 to EUR 3,800 per semester; non-EU Master’s fees mostly range from EUR 1,650 (reduced-rate cases) to EUR 4,000 per semester, with a few programmes above that (e.g. Mechanical Engineering Science PhD or the single-cycle Vehicle Engineering OTM programme charge more). Fees for the 2026/27 academic year are fixed for the Fall Semester and may change without prior notice in future years.',
      'BME প্রতি faculty আর programme-এ একটি আলাদা tuition fee ঠিক করে, non-EU নাগরিকদের জন্য EUR-এ বলা (আর EU নাগরিকদের জন্য সাধারণত HUF-এ, একটি EUR সমতুল্য দেখানো সহ)। Non-EU Bachelor\'s/preparatory fee মূলত প্রতি সেমিস্টারে EUR 3,200 থেকে EUR 3,800-র মধ্যে; non-EU Master\'s fee মূলত প্রতি সেমিস্টারে EUR 1,650 (কম-rate ক্ষেত্রে) থেকে EUR 4,000-র মধ্যে, কিছু programme এর চেয়ে বেশি (যেমন Mechanical Engineering Science PhD বা single-cycle Vehicle Engineering OTM programme বেশি চার্জ করে)। 2026/27 academic year-এর fee Fall Semester-এর জন্য নির্ধারিত আর ভবিষ্যৎ বছরে আগাম নোটিস ছাড়াই বদলাতে পারে।',
      'verified',
      [HU_BME_TUITION],
    ),
    money: { amount: 1650, max: 4500, currency: 'EUR', period: 'semester' },
  },
  deadlines: txt('For fee-paying (self-financed) applicants, the next application period — for programmes starting February 2027 — runs 15 October to 15 November 2026. PhD programmes may have different deadlines set by the relevant faculty.', 'Fee-paying (self-financed) আবেদনকারীদের জন্য, পরবর্তী application period — February 2027-এ শুরু হওয়া programme-এর জন্য — 15 October থেকে 15 November 2026 পর্যন্ত চলে। PhD programme-এর সংশ্লিষ্ট faculty-র ঠিক করা আলাদা deadline থাকতে পারে।', 'verified', [HU_BME_ADMISSION]),
  nextIntake: intake('confirmed', [HU_BME_ADMISSION], b('February 2027 (fee-paying applicants); not every programme runs a spring intake', 'February 2027 (fee-paying আবেদনকারী); সব programme spring intake চালায় না')),
  admission: txt('Applicants complete an electronic e-admission exam or placement test; BSc applicants found to have inadequate skills in Mathematics, Physics/Chemistry or English are directed to a one-year Preparatory Course before the BSc programme. Individual faculties may set additional criteria such as oral examinations or higher minimum language scores.', 'আবেদনকারীরা একটি electronic e-admission exam বা placement test দেন; Mathematics, Physics/Chemistry, বা English-এ অপর্যাপ্ত দক্ষতা পাওয়া BSc আবেদনকারীদের BSc programme-এর আগে একটি one-year Preparatory Course-এ পাঠানো হয়। স্বতন্ত্র faculty অতিরিক্ত শর্ত ঠিক করতে পারে, যেমন oral examination বা বেশি ন্যূনতম ভাষার স্কোর।', 'verified', [HU_BME_ADMISSION]),
  english: txt('BSc/OTM/MSc: minimum B2 level, e.g. IELTS (& IELTS Online) 5.5, Cambridge B2 First 160, TOEFL iBT (& Home Edition) 72, or equivalent. Preparatory programmes: minimum B1 level, e.g. IELTS 4.5, TOEFL iBT 42. A Medium of Instruction Certificate or a successful internal BME English test can substitute for a standardized test.', 'BSc/OTM/MSc: ন্যূনতম B2 level, যেমন IELTS (& IELTS Online) 5.5, Cambridge B2 First 160, TOEFL iBT (& Home Edition) 72, বা সমতুল্য। Preparatory programme: ন্যূনতম B1 level, যেমন IELTS 4.5, TOEFL iBT 42। একটি Medium of Instruction Certificate বা একটি সফল internal BME English test একটি standardized test-এর বদলি হতে পারে।', 'verified', [HU_BME_ADMISSION]),
  documents: {
    required: [b('CV and motivational letter', 'CV আর motivational letter'), b('Copy of passport', 'Passport-এর কপি'), b('High-school certificate (BSc/OTM) or BSc certificate (MSc)', 'High-school সনদ (BSc/OTM) বা BSc সনদ (MSc)'), b('Proof of English-language proficiency', 'ইংরেজি-ভাষার দক্ষতার প্রমাণ'), b('Receipt of the EUR 150 application-fee transfer', 'EUR 150 application-fee transfer-এর receipt')],
    mayBeRequired: [b('Two recommendation letters (MSc)', 'দুটো recommendation letter (MSc)'), b('Transcripts and course descriptions (transfer applicants)', 'Transcript আর course description (transfer আবেদনকারী)')],
    status: 'verified',
    sources: [HU_BME],
  },
  applicationFee: txt('EUR 150, non-refundable, for preparatory, BSc/OTM, MSc and transfer applicants (PhD applicants should contact the relevant faculty).', 'EUR 150, non-refundable, preparatory, BSc/OTM, MSc, আর transfer আবেদনকারীদের জন্য (PhD আবেদনকারীদের সংশ্লিষ্ট faculty-র সাথে যোগাযোগ করা উচিত)।', 'verified', [HU_BME]),
  scholarships: txt('BME participates in the Stipendium Hungaricum Scholarship Programme (open to Bangladeshi applicants via the Tempus Public Foundation route plus Bangladesh’s own Sending Partner nomination); institution-specific scholarships beyond this were not itemized on the pages read for this guide.', 'BME Stipendium Hungaricum Scholarship Programme-এ অংশগ্রহণ করে (Tempus Public Foundation route প্লাস Bangladesh-এর নিজের Sending Partner nomination-এর মাধ্যমে Bangladeshi আবেদনকারীদের জন্য খোলা); এর বাইরে institution-specific scholarship এই guide-এর জন্য পড়া page-এ তালিকাভুক্ত ছিল না।', 'partly-verified', [HU_SH_PARTNERS]),
  applicationRoute: txt('Online application via BME’s own e-admission system (self-financed), or via Tempus Public Foundation’s online system plus a mandatory nomination from Bangladesh’s Sending Partner (Stipendium Hungaricum).', 'BME-র নিজস্ব e-admission system-এর মাধ্যমে online application (self-financed), বা Tempus Public Foundation-এর online system প্লাস Bangladesh-এর Sending Partner থেকে একটি বাধ্যতামূলক nomination-এর মাধ্যমে (Stipendium Hungaricum)।', 'verified', [HU_BME, HU_SH_CALL_BA_MA_OTM]),
  steps: {
    items: [
      { title: b('Check your programme’s admission requirements and language level', 'আপনার programme-এর ভর্তির শর্ত আর ভাষার level দেখুন'), body: b('Confirm the minimum English score and whether an e-admission exam or placement test applies.', 'ন্যূনতম English স্কোর আর একটি e-admission exam বা placement test প্রযোজ্য কিনা নিশ্চিত করুন।') },
      { title: b('Apply online by 15 November 2026 (February 2027 intake)', '15 November 2026-এর মধ্যে online আবেদন করুন (February 2027 intake)'), body: b('Pay the EUR 150 application fee and upload your documents.', 'EUR 150 application fee দিয়ে আপনার document upload করুন।') },
      VISA_STEP,
      { title: b('Pay tuition and enrol', 'Tuition দিয়ে enrol করুন'), body: b('Tuition is set per faculty and programme.', 'Tuition প্রতি faculty আর programme অনুযায়ী ঠিক হয়।') },
    ],
    status: 'verified',
    sources: [HU_BME_ADMISSION, HU_BME_TUITION],
  },
  programs: [],
  lastVerified: READ,
};

const DEBRECEN_MEDICINE: ProgramProfile = {
  id: 'hu-debrecen-medicine',
  title: 'Medicine (MD)',
  level: 'bachelors',
  faculty: 'Faculty of Medicine',
  languages: b('English', 'ইংরেজি'),
  englishOnly: true,
  duration: b('12 semesters', '12 সেমিস্টার'),
  tuition: {
    ...txt('USD 16,900 per year.', 'বছরে USD 16,900।', 'verified', [HU_DEBRECEN_FEES]),
    money: { amount: 16900, currency: 'USD', period: 'year' },
  },
  deadline: txt('1 November 2026 for the January/February 2027 intake; 15 May 2027 for the September 2027 intake (same as the university’s general deadlines).', 'January/February 2027 intake-এর জন্য 1 November 2026; September 2027 intake-এর জন্য 15 May 2027 (university-র সাধারণ deadline-এর মতোই)।', 'verified', [HU_DEBRECEN_ADMISSION]),
  nextIntake: intake('confirmed', [HU_DEBRECEN_ADMISSION], b('September or January/February', 'September বা January/February')),
  requirements: txt('Biology, Chemistry and Physics entrance exam (written test and oral exam); a secondary-school graduation certificate or equivalent; for applicants from Bangladesh (and Pakistan, Syria, Afghanistan, Myanmar, Yemen) the study gap must not exceed 2 years for foundation/undergraduate entry.', 'Biology, Chemistry, আর Physics entrance exam (written test আর oral exam); একটি secondary-school graduation সনদ বা সমতুল্য; Bangladesh (আর Pakistan, Syria, Afghanistan, Myanmar, Yemen)-র আবেদনকারীদের জন্য foundation/undergraduate ভর্তির জন্য study gap 2 বছরের বেশি হতে পারবে না।', 'verified', [HU_DEBRECEN_FEES]),
  english: txt('Upper-intermediate (B2) level language certificate from a proctored exam; exempt for native English speakers or those who completed secondary/higher education in English.', 'একটি proctored exam থেকে upper-intermediate (B2) level language সনদ; native English speaker বা ইংরেজিতে secondary/higher education সম্পন্নকারীদের জন্য exempt।', 'verified', [HU_DEBRECEN_ADMISSION]),
  applyVia: b('University of Debrecen’s own online application platform (self-financed)', 'University of Debrecen-এর নিজস্ব online application platform (self-financed)'),
  url: 'https://edu.unideb.hu/p/tuition-fee-application-entrance-fee',
  sources: [HU_DEBRECEN_FEES, HU_DEBRECEN_ADMISSION],
  lastVerified: READ,
};

const DEBRECEN: UniversityProfile = {
  id: 'hu-debrecen',
  countryCode: 'HU',
  name: 'University of Debrecen',
  city: 'Debrecen',
  ownership: 'public',
  officialUrl: 'https://edu.unideb.hu/',
  admissionsUrl: HU_DEBRECEN_ADMISSION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=600', sourceUrl: HU_DEBRECEN_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'One of Hungary’s largest universities, with faculties spanning medicine, dentistry, pharmacy, health sciences, engineering, natural sciences, agriculture, economics, law, arts and music, and a long-established base of international and Stipendium Hungaricum students.',
    'Hungary-র একটি সবচেয়ে বড় university, medicine, dentistry, pharmacy, health sciences, engineering, natural sciences, agriculture, economics, law, arts, আর music জুড়ে faculty সহ, আর international আর Stipendium Hungaricum student-দের একটি দীর্ঘ-প্রতিষ্ঠিত ভিত্তি।',
  ),
  tuition: {
    ...txt(
      'Tuition is set per programme and paid in USD. Non-medical Bachelor’s programmes mostly range from USD 6,000 to USD 10,000 per year; Master’s programmes mostly range from USD 5,500 to USD 12,500 per year; medical/health programmes cost far more — Medicine USD 16,900/year, Dentistry USD 17,500/year, Pharmacy USD 8,000/year. For Bangladeshi applicants specifically, where the tuition fee is under USD 10,000, the university requires the full yearly tuition fee plus a general deposit to be paid before issuing visa-supporting documents.',
      'Tuition প্রতি programme অনুযায়ী ঠিক হয় আর USD-এ পরিশোধিত হয়। Non-medical Bachelor\'s programme মূলত বছরে USD 6,000 থেকে USD 10,000-র মধ্যে; Master\'s programme মূলত বছরে USD 5,500 থেকে USD 12,500-র মধ্যে; medical/health programme অনেক বেশি — Medicine USD 16,900/year, Dentistry USD 17,500/year, Pharmacy USD 8,000/year। বিশেষভাবে Bangladeshi আবেদনকারীদের জন্য, tuition fee USD 10,000-র কম হলে, visa-সহায়ক document ইস্যু করার আগে university পূর্ণ বছরের tuition fee সঙ্গে একটি general deposit দাবি করে।',
      'verified',
      [HU_DEBRECEN_FEES],
    ),
    money: { amount: 5500, max: 17500, currency: 'USD', period: 'year' },
  },
  deadlines: txt('1 November 2026 for the January/February 2027 intake (all programmes); 15 May 2027 for the September 2027 intake (all programmes).', 'January/February 2027 intake-এর জন্য (সব programme) 1 November 2026; September 2027 intake-এর জন্য (সব programme) 15 May 2027।', 'verified', [HU_DEBRECEN_ADMISSION]),
  nextIntake: intake('confirmed', [HU_DEBRECEN_ADMISSION], b('September or January/February, depending on programme', 'September বা January/February, programme অনুযায়ী')),
  admission: txt('Non-medical foundation/undergraduate applicants: study gap not exceeding 4 years generally (2 years for applicants who are citizens of Bangladesh, Pakistan, Syria, Afghanistan, Myanmar or Yemen); graduate applicants: study gap not exceeding 6 years generally (4 years for the same list of citizenships); medical/one-tier graduate applicants: study gap not exceeding 6 years. Required documents include an application form, certificate of education or final-year transcripts, proof of citizenship, CV, medical certificate and the application-fee receipt.', 'Non-medical foundation/undergraduate আবেদনকারী: সাধারণত study gap 4 বছরের বেশি না (Bangladesh, Pakistan, Syria, Afghanistan, Myanmar, বা Yemen-এর নাগরিক আবেদনকারীদের জন্য 2 বছর); graduate আবেদনকারী: সাধারণত study gap 6 বছরের বেশি না (একই তালিকার নাগরিকদের জন্য 4 বছর); medical/one-tier graduate আবেদনকারী: study gap 6 বছরের বেশি না। প্রয়োজনীয় document-এর মধ্যে আছে একটি application form, শিক্ষার সনদ বা শেষ-বর্ষের transcript, নাগরিকত্বের প্রমাণ, CV, medical certificate, আর application-fee receipt।', 'verified', [HU_DEBRECEN_ADMISSION]),
  english: txt('Standardized upper-intermediate (B2) level language certificate from a proctored exam; exemptions for native English speakers or applicants who completed secondary/higher education in English, or on the basis of certain other educational certificates.', 'একটি proctored exam থেকে standardized upper-intermediate (B2) level language সনদ; native English speaker বা ইংরেজিতে secondary/higher education সম্পন্নকারী আবেদনকারীদের জন্য exemption, বা কিছু অন্য educational সনদের ভিত্তিতে।', 'verified', [HU_DEBRECEN_ADMISSION]),
  documents: {
    required: [b('Application form (online)', 'Application form (online)'), b('Certificate of education, or final-year transcripts + predicted grades', 'শিক্ষার সনদ, বা শেষ-বর্ষের transcript + প্রত্যাশিত grade'), b('Proof of citizenship (e.g. passport)', 'নাগরিকত্বের প্রমাণ (যেমন passport)'), b('CV', 'CV'), b('Medical certificate', 'Medical certificate'), b('Receipt of the USD 150 application-fee transfer', 'USD 150 application-fee transfer-এর receipt')],
    mayBeRequired: [b('Two recommendation letters (Master’s/PhD)', 'দুটো recommendation letter (Master\'s/PhD)'), b('Research-topic proposal (PhD)', 'Research-topic proposal (PhD)'), b('Credit Transfer Request Form (transfer students)', 'Credit Transfer Request Form (transfer student)')],
    status: 'verified',
    sources: [HU_DEBRECEN_ADMISSION],
  },
  applicationFee: txt('USD 150 application fee (non-refundable) plus a USD 350 entrance-exam fee (non-refundable, with an exception for exam cancellations made at least a week before the exam).', 'USD 150 application fee (non-refundable) সঙ্গে USD 350 entrance-exam fee (non-refundable, exam-এর অন্তত এক সপ্তাহ আগে বাতিল করলে ব্যতিক্রম সহ)।', 'verified', [HU_DEBRECEN_FEES]),
  scholarships: txt('University of Debrecen participates in Stipendium Hungaricum (and has a separate page for its SH/SCY/Diaspora scholarship students); applicants for Stipendium Hungaricum must apply through Tempus Public Foundation’s own online system, not the university’s self-financed application form.', 'University of Debrecen Stipendium Hungaricum-এ অংশগ্রহণ করে (আর তার SH/SCY/Diaspora scholarship student-দের জন্য একটি আলাদা page আছে); Stipendium Hungaricum-এর আবেদনকারীদের Tempus Public Foundation-এর নিজস্ব online system-এর মাধ্যমে আবেদন করতে হয়, university-র self-financed application form না।', 'verified', [HU_DEBRECEN_ADMISSION]),
  applicationRoute: txt('Online application via the university’s own Stuart SAS platform (self-financed), or Tempus Public Foundation’s online system plus a nomination from Bangladesh’s Sending Partner (Stipendium Hungaricum — applicants must not also submit the university’s own form).', 'University-র নিজস্ব Stuart SAS platform-এর মাধ্যমে online application (self-financed), বা Tempus Public Foundation-এর online system প্লাস Bangladesh-এর Sending Partner থেকে একটি nomination (Stipendium Hungaricum — আবেদনকারীদের university-র নিজস্ব form-ও জমা দেওয়া উচিত না)।', 'verified', [HU_DEBRECEN_ADMISSION]),
  steps: {
    items: [
      { title: b('Check your programme’s tuition, deadline and entrance-exam requirement', 'আপনার programme-এর tuition, deadline, আর entrance-exam শর্ত দেখুন'), body: b('Medical programmes require a Biology/Chemistry/Physics entrance exam.', 'Medical programme-এ একটি Biology/Chemistry/Physics entrance exam লাগে।') },
      { title: b('Apply online by the deadline and pay the fees', 'Deadline-এর মধ্যে online আবেদন করুন আর fee দিন'), body: b('USD 150 application fee plus USD 350 entrance-exam fee, by bank transfer.', 'Bank transfer-এর মাধ্যমে USD 150 application fee সঙ্গে USD 350 entrance-exam fee।') },
      VISA_STEP,
      { title: b('Pay tuition (and, for Bangladeshi applicants on lower-cost programmes, a general deposit) and enrol', 'Tuition দিয়ে (আর কম-খরচের programme-এ Bangladeshi আবেদনকারীদের জন্য, একটি general deposit) enrol করুন'), body: b('Required before visa-supporting documents are issued, for Bangladeshi applicants on programmes under USD 10,000/year.', 'USD 10,000/year-র কম programme-এ Bangladeshi আবেদনকারীদের জন্য, visa-সহায়ক document ইস্যু করার আগে প্রয়োজনীয়।') },
    ],
    status: 'verified',
    sources: [HU_DEBRECEN_ADMISSION, HU_DEBRECEN_FEES],
  },
  programs: [DEBRECEN_MEDICINE],
  lastVerified: READ,
};

const ELTE: UniversityProfile = {
  id: 'hu-elte',
  countryCode: 'HU',
  name: 'Eötvös Loránd University (ELTE)',
  city: 'Budapest',
  ownership: 'public',
  officialUrl: 'https://www.elte.hu/en/how-to-apply',
  admissionsUrl: HU_ELTE.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=595', sourceUrl: HU_ELTE_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Hungary’s oldest and one of its largest universities, with faculties spanning sciences, humanities, social sciences, law, informatics, education and special needs education, offering international degree programmes across all three cycles.',
    'Hungary-র সবচেয়ে পুরনো আর এর সবচেয়ে বড় university-গুলোর একটা, sciences, humanities, social sciences, law, informatics, education, আর special needs education জুড়ে faculty সহ, তিনটা cycle-এই international degree programme দেয়।',
  ),
  tuition: NOT_VERIFIED_FEE([HU_ELTE]),
  deadlines: txt('Application generally opens in November for the next academic year. For self-funded applicants, deadlines fall between the end of April and mid-July depending on the programme. For Hungarian-governmental-scholarship (Stipendium Hungaricum) applicants, the period is shorter and earlier: between November and mid-January, with the exact dates set by the official scholarship Call for Applications.', 'পরবর্তী academic year-এর জন্য application সাধারণত November-এ খোলে। Self-funded আবেদনকারীদের জন্য, programme অনুযায়ী deadline end of April থেকে mid-July-র মধ্যে পড়ে। Hungarian-governmental-scholarship (Stipendium Hungaricum) আবেদনকারীদের জন্য, সময়কাল কম আর আগে: November থেকে mid-January-র মধ্যে, সঠিক তারিখ official scholarship Call for Applications দ্বারা ঠিক হয়।', 'verified', [HU_ELTE]),
  nextIntake: intake('confirmed', [HU_ELTE], b('Opens in November; self-funded deadlines April–July, Stipendium Hungaricum deadlines November–mid-January', 'November-এ খোলে; self-funded deadline April–July, Stipendium Hungaricum deadline November–mid-January')),
  admission: NOT_VERIFIED_FEE([HU_ELTE]),
  english: NOT_VERIFIED_FEE([HU_ELTE]),
  documents: {
    required: [],
    mayBeRequired: [],
    status: 'not-verified',
    sources: [HU_ELTE],
  },
  applicationFee: txt('The Faculty of Science states a non-refundable EUR 160 application-and-registration fee; a single university-wide figure covering every faculty was not itemized on the pages read for this guide.', 'Faculty of Science একটি non-refundable EUR 160 application-and-registration fee বলে; প্রতিটা faculty-কে কভার করা একটি single university-wide সংখ্যা এই guide-এর জন্য পড়া page-এ তালিকাভুক্ত ছিল না।', 'partly-verified', [HU_ELTE_SCIENCE_FEE]),
  scholarships: txt('ELTE has a dedicated page for Stipendium Hungaricum scholarship applicants, separate from its self-funded applicant page, confirming it participates in the programme (open to Bangladeshi applicants via the Tempus Public Foundation route plus Bangladesh’s own Sending Partner nomination).', 'ELTE-র Stipendium Hungaricum scholarship আবেদনকারীদের জন্য একটি আলাদা page আছে, তার self-funded আবেদনকারী page থেকে আলাদা, যা নিশ্চিত করে এটা programme-এ অংশগ্রহণ করে (Tempus Public Foundation route প্লাস Bangladesh-এর নিজের Sending Partner nomination-এর মাধ্যমে Bangladeshi আবেদনকারীদের জন্য খোলা)।', 'partly-verified', [HU_ELTE, HU_SH_PARTNERS]),
  applicationRoute: txt('Online application via apply.elte.hu (self-funded applicants should also watch ELTE’s application tutorial); Stipendium Hungaricum applicants use Tempus Public Foundation’s own online system plus a nomination from Bangladesh’s Sending Partner, following ELTE’s separate scholarship-applicant page instead.', 'apply.elte.hu-এর মাধ্যমে online application (self-funded আবেদনকারীদের ELTE-র application tutorial-ও দেখা উচিত); Stipendium Hungaricum আবেদনকারীরা পরিবর্তে ELTE-র আলাদা scholarship-applicant page অনুসরণ করে Tempus Public Foundation-এর নিজস্ব online system প্লাস Bangladesh-এর Sending Partner থেকে একটি nomination ব্যবহার করেন।', 'verified', [HU_ELTE]),
  steps: {
    items: [
      { title: b('Choose your degree programme and route', 'আপনার degree programme আর route বাছুন'), body: b('Self-funded (apply.elte.hu) or Stipendium Hungaricum (Tempus Public Foundation + Bangladesh’s Sending Partner nomination) — the two routes have different deadlines.', 'Self-funded (apply.elte.hu) বা Stipendium Hungaricum (Tempus Public Foundation + Bangladesh-এর Sending Partner nomination) — দুই route-এর আলাদা deadline আছে।') },
      { title: b('Apply by your route’s own deadline', 'আপনার route-এর নিজের deadline-এর মধ্যে আবেদন করুন'), body: b('Self-funded: end of April to mid-July, depending on the programme. Stipendium Hungaricum: November to mid-January, per the official Call for Applications.', 'Self-funded: programme অনুযায়ী end of April থেকে mid-July। Stipendium Hungaricum: official Call for Applications অনুযায়ী November থেকে mid-January।') },
      VISA_STEP,
      { title: b('Pay tuition (if self-funded) and enrol', 'Tuition দিয়ে (self-funded হলে) enrol করুন'), body: b('A university-wide tuition figure was not itemized for this guide — check your own faculty.', 'একটি university-wide tuition সংখ্যা এই guide-এর জন্য তালিকাভুক্ত হয়নি — আপনার নিজের faculty দেখুন।') },
    ],
    status: 'partly-verified',
    sources: [HU_ELTE],
  },
  programs: [],
  lastVerified: READ,
};

const SEMMELWEIS: UniversityProfile = {
  id: 'hu-semmelweis',
  countryCode: 'HU',
  name: 'Semmelweis University',
  city: 'Budapest',
  ownership: 'public',
  officialUrl: 'https://semmelweis.hu/admission/programs/medicine/',
  admissionsUrl: HU_SEMMELWEIS.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: null, sourceUrl: HU_SEMMELWEIS_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Hungary’s leading medical and health-sciences university, more than 250 years old, with faculties of medicine, dentistry, pharmacy, health sciences and conductive education, popular with international students for programmes such as General Medicine. It is not listed in the QS World University Rankings 2027’s overall ranking (holding QS Contributor status and a QS WUR Ranking By Subject position instead, e.g. #101–200 for Anatomy and Physiology in the 2026 edition).',
    'Hungary-র শীর্ষ medical আর health-sciences university, 250 বছরের বেশি পুরনো, medicine, dentistry, pharmacy, health sciences, আর conductive education faculty সহ, General Medicine-র মতো programme-এর জন্য international student-দের মধ্যে জনপ্রিয়। এটা QS World University Rankings 2027-এর overall ranking-এ তালিকাভুক্ত নয় (তার পরিবর্তে QS Contributor status আর একটি QS WUR Ranking By Subject position রাখে, যেমন 2026 edition-এ Anatomy and Physiology-র জন্য #101–200)।',
  ),
  tuition: {
    ...txt('General Medicine: EUR 12,000 per semester, or EUR 22,000 per academic year; a 50% discount applies for Semmelweis University alumni or current students. Fee figures for other programmes (dentistry, pharmacy, health sciences) were not itemized on the page read for this guide.', 'General Medicine: সেমিস্টারে EUR 12,000, বা academic year-এ EUR 22,000; Semmelweis University alumni বা বর্তমান student-দের জন্য 50% ছাড় প্রযোজ্য। অন্য programme-এর (dentistry, pharmacy, health sciences) fee সংখ্যা এই guide-এর জন্য পড়া page-এ তালিকাভুক্ত ছিল না।', 'partly-verified', [HU_SEMMELWEIS_FEES]),
    money: { amount: 12000, max: 22000, currency: 'EUR', period: 'semester' },
  },
  deadlines: NOT_VERIFIED_FEE([HU_SEMMELWEIS]),
  nextIntake: intake('not-published', [HU_SEMMELWEIS]),
  admission: NOT_VERIFIED_FEE([HU_SEMMELWEIS]),
  english: NOT_VERIFIED_FEE([HU_SEMMELWEIS]),
  documents: {
    required: [],
    mayBeRequired: [],
    status: 'not-verified',
    sources: [HU_SEMMELWEIS],
  },
  applicationFee: txt('EUR 75 admission-procedure fee, paid by bank transfer with proof of payment uploaded to the application platform; a separate USD 230 enrollment fee is listed for General Medicine.', 'Application platform-এ payment-এর প্রমাণ upload করা, bank transfer দিয়ে পরিশোধিত EUR 75 admission-procedure fee; General Medicine-র জন্য একটি আলাদা USD 230 enrollment fee তালিকাভুক্ত।', 'verified', [HU_SEMMELWEIS_FEES]),
  scholarships: txt('Semmelweis University participates in Stipendium Hungaricum (open to Bangladeshi applicants via the Tempus Public Foundation route plus Bangladesh’s own Sending Partner nomination); the 50% tuition discount for Semmelweis alumni/students is separate from this.', 'Semmelweis University Stipendium Hungaricum-এ অংশগ্রহণ করে (Tempus Public Foundation route প্লাস Bangladesh-এর নিজের Sending Partner nomination-এর মাধ্যমে Bangladeshi আবেদনকারীদের জন্য খোলা); Semmelweis alumni/student-দের জন্য 50% tuition ছাড় এর থেকে আলাদা।', 'partly-verified', [HU_SEMMELWEIS_FEES, HU_SH_PARTNERS]),
  applicationRoute: txt('Online application via Semmelweis University’s own Centre for Translational Medicine (CTM) admission platform (self-financed); Stipendium Hungaricum applicants instead use Tempus Public Foundation’s own online system plus a nomination from Bangladesh’s Sending Partner.', 'Semmelweis University-র নিজস্ব Centre for Translational Medicine (CTM) admission platform-এর মাধ্যমে online application (self-financed); Stipendium Hungaricum আবেদনকারীরা পরিবর্তে Tempus Public Foundation-এর নিজস্ব online system প্লাস Bangladesh-এর Sending Partner থেকে একটি nomination ব্যবহার করেন।', 'partly-verified', [HU_SEMMELWEIS_FEES]),
  steps: {
    items: [
      { title: b('Check your programme’s requirements', 'আপনার programme-এর শর্ত দেখুন'), body: b('A full, itemized admission-requirements list was not found on the pages read for this guide — confirm directly with Semmelweis’s admissions office.', 'একটি সম্পূর্ণ, বিস্তারিত ভর্তির-শর্তের তালিকা এই guide-এর জন্য পড়া page-এ পাওয়া যায়নি — সরাসরি Semmelweis-এর admissions office-এর সাথে নিশ্চিত করুন।') },
      { title: b('Pay the EUR 75 admission-procedure fee and apply online', 'EUR 75 admission-procedure fee দিয়ে online আবেদন করুন'), body: b('Upload proof of the bank-transfer payment to the application platform.', 'Application platform-এ bank-transfer payment-এর প্রমাণ upload করুন।') },
      VISA_STEP,
      { title: b('Pay tuition and enrol', 'Tuition দিয়ে enrol করুন'), body: b('General Medicine: EUR 12,000/semester or EUR 22,000/year (50% discount for Semmelweis alumni/students); other programmes vary.', 'General Medicine: EUR 12,000/semester বা EUR 22,000/year (Semmelweis alumni/student-দের জন্য 50% ছাড়); অন্য programme আলাদা।') },
    ],
    status: 'partly-verified',
    sources: [HU_SEMMELWEIS_FEES],
  },
  programs: [],
  lastVerified: READ,
};

export const HU_UNI_LAYER: CountryUniversityLayer = {
  code: 'HU',
  universities: [BME, DEBRECEN, ELTE, SEMMELWEIS],
  visaStats: [],
  unverified: [
    {
      id: 'hu-bd-visa-approval-rate',
      label: b('Bangladesh-specific residence-permit approval or refusal rate', 'বাংলাদেশ-নির্দিষ্ট residence-permit অনুমোদন বা প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific approval-rate figure, or a verified country-wide international-student headcount broken down by nationality from an official Hungarian source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'hu-minimum-funds-amount',
      label: b('A single official nationwide minimum-funds figure for the student residence permit', 'Student residence permit-এর জন্য একটি একক official জাতীয় ন্যূনতম-funds সংখ্যা'),
      status: 'not-verified',
      note: 'OIF’s own factsheet asks for documented "sufficient resources" through several possible means rather than naming one fixed amount; no official figure was found on the pages read for this guide.',
    },
  ],
  lastVerified: READ,
};

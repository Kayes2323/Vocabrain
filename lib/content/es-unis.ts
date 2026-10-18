import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, ProgramProfile, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import {
  ES_EMBAJADA_DHAKA,
  ES_IEU_ADMISSION_PROCESS,
  ES_IEU_BIR_FEES,
  ES_IEU_ENTRY_REQUIREMENTS,
  ES_IEU_MIR_FEES,
  ES_IEU_QS,
  ES_READ,
  ES_UAB_ADMISSION,
  ES_UAB_PRICES,
  ES_UAB_QS,
  ES_UAM_PRECIOS,
  ES_UAM_QS,
  ES_UAM_STUDY_ABROAD,
  ES_UB_INTERNATIONAL,
  ES_UB_PREUS,
  ES_UB_QS,
  ES_UCM_APPLICATION,
  ES_UCM_FEES,
  ES_UCM_QS,
} from './es-sources';

/**
 * Spain: university → program layer, built the same way as Denmark's,
 * Austria's, Hungary's, Switzerland's, the Netherlands', Ireland's,
 * France's, Slovenia's, the Czech Republic's and Lithuania's
 * (lib/content/dk-unis.ts, at-unis.ts, hu-unis.ts, ch-unis.ts, nl-unis.ts,
 * ie-unis.ts, fr-unis.ts, si-unis.ts, cz-unis.ts, lt-unis.ts) and the
 * de-unis.ts/kr-unis.ts pattern. Rankings are QS World University
 * Rankings 2027 as printed on each institution's topuniversities.com
 * profile. Unlike a country with one national tuition figure, Spain's
 * public universities' fees are set per autonomous region (Madrid,
 * Catalonia) and charged per ECTS credit, so the exact current
 * euro-per-credit figures are left not-verified where this guide could
 * not independently confirm them from each university's own linked price
 * tables; IE University, a private institution, publishes its own
 * figures directly and those are shown as verified. Anything that could
 * not be verified on an official page is left marked unverified — never
 * guessed.
 */

const READ = ES_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the institution’s official admissions page.', 'যাচাই হয়নি — institution-এর official admissions page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Apply for Spain’s long-stay study authorisation', 'Spain-র long-stay study authorisation-এর আবেদন করুন'),
  body: b('Once admitted, apply in person before the Embassy of Spain in Dhaka (the Spanish mission with jurisdiction over Bangladesh) for the long-stay study authorisation, at least two months before studies begin. The Ministerio de Inclusión’s own page states a decision is due within one month (silence counts as refusal); an approved visa must be collected within two months. See the Spain student-visa section on the country page.', 'ভর্তি হলে, পড়াশোনা শুরুর অন্তত দুই মাস আগে, Dhaka-তে Spain-র Embassy (Bangladesh-এর উপর jurisdiction থাকা Spanish mission)-এ ব্যক্তিগতভাবে long-stay study authorisation-এর আবেদন করুন। Ministerio de Inclusión-এর নিজের page বলে সিদ্ধান্ত এক মাসের মধ্যে হওয়ার কথা (silence প্রত্যাখ্যান হিসেবে গণনা হয়); একটি অনুমোদিত visa দুই মাসের মধ্যে সংগ্রহ করতে হয়। Country page-এর Spain student-visa অংশ দেখুন।'),
};

// ------------------------------------------------------------------ universities

const UCM: UniversityProfile = {
  id: 'es-ucm',
  countryCode: 'ES',
  name: 'Universidad Complutense de Madrid (UCM)',
  city: 'Madrid',
  ownership: 'public',
  officialUrl: 'https://www.ucm.es/english/the-application',
  admissionsUrl: ES_UCM_APPLICATION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '199', sourceUrl: ES_UCM_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'One of Spain’s largest and oldest universities, based in Madrid, with a broad range of Bachelor’s (Grado), Master’s and Doctorado programmes.',
    'Spain-র সবচেয়ে বড় আর পুরনো university-গুলোর একটা, Madrid-এ, বিস্তৃত Bachelor\'s (Grado), Master\'s, আর Doctorado programme সহ।',
  ),
  tuition: {
    ...txt(
      'Set annually by the Comunidad de Madrid (Madrid’s regional government), charged per registered ECTS credit at a rate that depends on the "nivel de experimentalidad" (experimental level) of the degree. International students without permanent residence, or from a country without an exchange agreement with Spain, pay the higher "fourth registration" per-credit rate from their first year, per UCM’s own page — the exact current euro-per-credit figures sit in a linked price table that was not independently read for this guide, so no single euro figure is confirmed here.',
      'Comunidad de Madrid (Madrid-র regional government) প্রতি বছর এটা ঠিক করে, প্রতি registered ECTS credit-এ চার্জ করা হয় degree-র "nivel de experimentalidad" (experimental level)-এর উপর নির্ভর করা একটি rate-এ। Permanent residence না থাকা, বা Spain-র সাথে exchange agreement না থাকা দেশের international student-রা, UCM-এর নিজের page অনুযায়ী, প্রথম বছর থেকে উচ্চতর "fourth registration" per-credit rate দেন — সঠিক চলতি euro-per-credit সংখ্যা একটি সংযুক্ত price table-এ আছে যা এই guide-এর জন্য স্বাধীনভাবে পড়া হয়নি, তাই এখানে একটি euro সংখ্যা নিশ্চিত হয়নি।',
      'partly-verified',
      [ES_UCM_FEES],
    ),
  },
  deadlines: NOT_VERIFIED_FEE([ES_UCM_APPLICATION]),
  nextIntake: intake('not-published', [ES_UCM_APPLICATION]),
  admission: txt('UCM’s own "The Application" page for international students sets out its own admission route; exact programme-by-programme deadlines and entrance procedures were not itemized in full detail on the pages read for this guide.', 'International student-দের জন্য UCM-এর নিজের "The Application" page তার নিজস্ব admission route বর্ণনা করে; প্রতিটি programme-এর সঠিক deadline আর entrance procedure এই guide-এর জন্য পড়া page-এ সম্পূর্ণ বিস্তারিতভাবে তালিকাভুক্ত হয়নি।', 'partly-verified', [ES_UCM_APPLICATION]),
  english: NOT_VERIFIED_FEE([ES_UCM_APPLICATION]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [ES_UCM_APPLICATION] },
  applicationFee: NOT_VERIFIED_FEE([ES_UCM_FEES]),
  scholarships: txt('No UCM-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য UCM-specific একটি full-degree scholarship পাওয়া যায়নি।', 'not-verified', [ES_UCM_APPLICATION]),
  applicationRoute: txt('Online application via UCM’s own international-admissions process, described on its own page.', 'UCM-এর নিজের page-এ বর্ণিত নিজস্ব international-admissions process-এর মাধ্যমে online application।', 'partly-verified', [ES_UCM_APPLICATION]),
  steps: {
    items: [
      { title: b('Check the admission route and fee tier for your profile', 'আপনার profile-এর জন্য admission route আর fee tier দেখুন'), body: b('International students without permanent residence or an exchange agreement pay a higher per-credit tier from the first year, per UCM’s own page.', 'UCM-এর নিজের page অনুযায়ী, permanent residence বা exchange agreement না থাকা international student-রা প্রথম বছর থেকে একটি উচ্চতর per-credit tier দেন।') },
      { title: b('Apply via UCM’s own international-admissions process', 'UCM-এর নিজস্ব international-admissions process-এর মাধ্যমে আবেদন করুন'), body: b('Submit all required documents in full.', 'সব প্রয়োজনীয় document সম্পূর্ণভাবে জমা দিন।') },
      VISA_STEP,
    ],
    status: 'partly-verified',
    sources: [ES_UCM_APPLICATION],
  },
  programs: [],
  lastVerified: READ,
};

const UB: UniversityProfile = {
  id: 'es-ub',
  countryCode: 'ES',
  name: 'Universitat de Barcelona (UB)',
  city: 'Barcelona',
  ownership: 'public',
  officialUrl: 'https://web.ub.edu/en/web/estudiants/international-students',
  admissionsUrl: ES_UB_INTERNATIONAL.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '165', sourceUrl: ES_UB_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Spain’s highest-ranked university in the QS World University Rankings 2027, based in Barcelona, with Bachelor’s (Grau), Master’s and Doctorat programmes across sciences, humanities and social sciences.',
    'QS World University Rankings 2027-এ Spain-র সর্বোচ্চ rank পাওয়া university, Barcelona-তে, sciences, humanities, আর social sciences জুড়ে Bachelor\'s (Grau), Master\'s, আর Doctorat programme সহ।',
  ),
  tuition: {
    ...txt(
      'UB’s own "Preu de la matrícula" page states that for the 2026-2027 academic year, fees are fixed by DECRET 96/2026, de 16 de juny, pel qual es fixen els preus dels serveis acadèmics a les universitats públiques de Catalunya (the Catalan regional government’s own decree) — the exact current euro-per-credit figures were not independently read from UB’s own linked price tables for this guide, so no single euro figure is confirmed here.',
      'UB-এর নিজের "Preu de la matrícula" page বলে 2026-2027 academic year-এর জন্য, fee DECRET 96/2026, de 16 de juny, pel qual es fixen els preus dels serveis acadèmics a les universitats públiques de Catalunya (Catalan regional government-এর নিজের decree) দিয়ে ঠিক হয় — এই guide-এর জন্য UB-এর নিজের সংযুক্ত price table থেকে সঠিক চলতি euro-per-credit সংখ্যা স্বাধীনভাবে পড়া হয়নি, তাই এখানে একটি euro সংখ্যা নিশ্চিত হয়নি।',
      'partly-verified',
      [ES_UB_PREUS],
    ),
  },
  deadlines: NOT_VERIFIED_FEE([ES_UB_INTERNATIONAL]),
  nextIntake: intake('not-published', [ES_UB_INTERNATIONAL]),
  admission: txt('UB’s own international-students page is the entry point for its admission process; exact programme-by-programme deadlines and entrance procedures were not itemized in full detail on the pages read for this guide.', 'UB-এর নিজের international-students page তার admission process-এর entry point; প্রতিটি programme-এর সঠিক deadline আর entrance procedure এই guide-এর জন্য পড়া page-এ সম্পূর্ণ বিস্তারিতভাবে তালিকাভুক্ত হয়নি।', 'not-verified', [ES_UB_INTERNATIONAL]),
  english: NOT_VERIFIED_FEE([ES_UB_INTERNATIONAL]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [ES_UB_INTERNATIONAL] },
  applicationFee: NOT_VERIFIED_FEE([ES_UB_PREUS]),
  scholarships: txt('No UB-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য UB-specific একটি full-degree scholarship পাওয়া যায়নি।', 'not-verified', [ES_UB_INTERNATIONAL]),
  applicationRoute: txt('Via UB’s own international-students admission process.', 'UB-এর নিজস্ব international-students admission process-এর মাধ্যমে।', 'not-verified', [ES_UB_INTERNATIONAL]),
  steps: {
    items: [
      { title: b('Start from UB’s own international-students page', 'UB-এর নিজের international-students page থেকে শুরু করুন'), body: b('It is the entry point to UB’s own admission process and fee information.', 'এটা UB-এর নিজের admission process আর fee তথ্যের entry point।') },
      VISA_STEP,
    ],
    status: 'not-verified',
    sources: [ES_UB_INTERNATIONAL],
  },
  programs: [],
  lastVerified: READ,
};

const UAB: UniversityProfile = {
  id: 'es-uab',
  countryCode: 'ES',
  name: 'Universitat Autònoma de Barcelona (UAB)',
  city: 'Barcelona',
  ownership: 'public',
  officialUrl: 'https://www.uab.cat/sites/ContentServer/studies/graduate/master-s-degrees-and-graduate-diplomas-continuing-education-/admission-process-1345674013054.html',
  admissionsUrl: ES_UAB_ADMISSION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '211', sourceUrl: ES_UAB_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A public university on a single campus near Barcelona, offering Bachelor’s (Grau), Master’s and Doctorat programmes, with a dedicated admission process for applicants holding a degree from outside the European Union.',
    'Barcelona-র কাছে একটি একক campus-এ একটি public university, Bachelor\'s (Grau), Master\'s, আর Doctorat programme দেয়, European Union-এর বাইরে থেকে degree থাকা আবেদনকারীদের জন্য একটি নিবেদিত admission process সহ।',
  ),
  tuition: {
    ...txt(
      'UAB’s own "Prices" page for university master’s degrees states a general fee of EUR 19.37 per credit for most non-professional-oriented master’s degrees, plus a separate "equivalence study for foreign degrees to gain access to master from outside the European Union" fee specifically for non-EU applicants — the exact current euro amount of that equivalence-study fee was not itemized on the page read for this guide.',
      'UAB-এর নিজের university master\'s degree-র "Prices" page অধিকাংশ non-professional-oriented master\'s degree-র জন্য প্রতি credit-এ সাধারণ fee EUR 19.37 বলে, সঙ্গে European Union-এর বাইরের আবেদনকারীদের জন্য বিশেষভাবে একটি আলাদা "equivalence study for foreign degrees to gain access to master from outside the European Union" fee — এই guide-এর জন্য পড়া page-এ সেই equivalence-study fee-র সঠিক চলতি euro পরিমাণ তালিকাভুক্ত ছিল না।',
      'partly-verified',
      [ES_UAB_PRICES],
    ),
    money: { amount: 19.37, currency: 'EUR', period: 'semester' },
  },
  deadlines: NOT_VERIFIED_FEE([ES_UAB_ADMISSION]),
  nextIntake: intake('not-published', [ES_UAB_ADMISSION]),
  admission: txt('UAB’s own admission-process page for master’s degrees and graduate diplomas states an application fee of EUR 30.21, non-refundable regardless of the outcome, and a separate equivalence-study step for applicants with a degree from outside the EU.', 'Master\'s degree আর graduate diploma-র জন্য UAB-এর নিজের admission-process page একটি EUR 30.21 application fee বলে, outcome যা-ই হোক non-refundable, আর EU-র বাইরের degree থাকা আবেদনকারীদের জন্য একটি আলাদা equivalence-study পদক্ষেপ।', 'verified', [ES_UAB_ADMISSION]),
  english: NOT_VERIFIED_FEE([ES_UAB_ADMISSION]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [ES_UAB_ADMISSION] },
  applicationFee: txt('EUR 30.21, covering administrative processing, non-refundable regardless of the outcome of the admission process, per UAB’s own page.', 'UAB-এর নিজের page অনুযায়ী, administrative processing কভার করে, EUR 30.21, outcome যা-ই হোক non-refundable।', 'verified', [ES_UAB_ADMISSION]),
  scholarships: txt('No UAB-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য UAB-specific একটি full-degree scholarship পাওয়া যায়নি।', 'not-verified', [ES_UAB_ADMISSION]),
  applicationRoute: txt('Online application via UAB’s own admission process, with a separate equivalence-study step for degrees earned outside the EU.', 'EU-র বাইরে পাওয়া degree-র জন্য একটি আলাদা equivalence-study পদক্ষেপ সহ, UAB-এর নিজস্ব admission process-এর মাধ্যমে online application।', 'verified', [ES_UAB_ADMISSION]),
  steps: {
    items: [
      { title: b('Check whether your degree needs the equivalence study', 'আপনার degree-র equivalence study লাগে কিনা দেখুন'), body: b('Required specifically for degrees earned outside the European Union, per UAB’s own page.', 'UAB-এর নিজের page অনুযায়ী, European Union-এর বাইরে পাওয়া degree-র জন্য বিশেষভাবে প্রয়োজন।') },
      { title: b('Apply online and pay the EUR 30.21 application fee', 'অনলাইনে আবেদন করুন আর EUR 30.21 application fee পরিশোধ করুন'), body: b('Non-refundable regardless of the outcome.', 'Outcome যা-ই হোক non-refundable।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [ES_UAB_ADMISSION, ES_UAB_PRICES],
  },
  programs: [],
  lastVerified: READ,
};

const UAM: UniversityProfile = {
  id: 'es-uam',
  countryCode: 'ES',
  name: 'Universidad Autónoma de Madrid (UAM)',
  city: 'Madrid',
  ownership: 'public',
  officialUrl: 'https://www.uam.es/uam/en/studyabroad',
  admissionsUrl: ES_UAM_STUDY_ABROAD.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '226', sourceUrl: ES_UAM_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A public university on a single campus in Cantoblanco, Madrid, with Bachelor’s (Grado), Master’s and Doctorado programmes and its own "Precios públicos" page that lists a separate price document for foreign students.',
    'Madrid-র Cantoblanco-তে একটি একক campus-এ একটি public university, Bachelor\'s (Grado), Master\'s, আর Doctorado programme সহ, আর বিদেশি student-দের জন্য একটি আলাদা price document তালিকাভুক্ত করা নিজের "Precios públicos" page।',
  ),
  tuition: {
    ...txt(
      'UAM’s own "Precios públicos" page lists downloadable PDFs for the per-credit price of Bachelor’s (Grado) programmes and a separate PDF specifically titled "precios para estudiantes extranjeros" (prices for foreign students) — these are set by the Comunidad de Madrid, as at UCM, but the exact current euro figures in those PDFs were not independently read for this guide, so no single euro figure is confirmed here.',
      'UAM-এর নিজের "Precios públicos" page Bachelor\'s (Grado) programme-এর per-credit price-এর জন্য downloadable PDF তালিকাভুক্ত করে, সঙ্গে বিশেষভাবে "precios para estudiantes extranjeros" (foreign student-দের জন্য price) নামের একটি আলাদা PDF — এগুলো UCM-এর মতোই Comunidad de Madrid দিয়ে ঠিক হয়, কিন্তু এই guide-এর জন্য সেই PDF-এর সঠিক চলতি euro সংখ্যা স্বাধীনভাবে পড়া হয়নি, তাই এখানে একটি euro সংখ্যা নিশ্চিত হয়নি।',
      'partly-verified',
      [ES_UAM_PRECIOS],
    ),
  },
  deadlines: NOT_VERIFIED_FEE([ES_UAM_STUDY_ABROAD]),
  nextIntake: intake('not-published', [ES_UAM_STUDY_ABROAD]),
  admission: txt('UAM’s own "Study abroad at UAM" page is the entry point for international applicants; exact programme-by-programme deadlines and entrance procedures were not itemized in full detail on the pages read for this guide.', 'International আবেদনকারীদের জন্য UAM-এর নিজের "Study abroad at UAM" page entry point; প্রতিটি programme-এর সঠিক deadline আর entrance procedure এই guide-এর জন্য পড়া page-এ সম্পূর্ণ বিস্তারিতভাবে তালিকাভুক্ত হয়নি।', 'not-verified', [ES_UAM_STUDY_ABROAD]),
  english: NOT_VERIFIED_FEE([ES_UAM_STUDY_ABROAD]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [ES_UAM_STUDY_ABROAD] },
  applicationFee: NOT_VERIFIED_FEE([ES_UAM_PRECIOS]),
  scholarships: txt('No UAM-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য UAM-specific একটি full-degree scholarship পাওয়া যায়নি।', 'not-verified', [ES_UAM_STUDY_ABROAD]),
  applicationRoute: txt('Via UAM’s own international-admissions page.', 'UAM-এর নিজের international-admissions page-এর মাধ্যমে।', 'not-verified', [ES_UAM_STUDY_ABROAD]),
  steps: {
    items: [
      { title: b('Check UAM’s own foreign-student price document', 'UAM-এর নিজের foreign-student price document দেখুন'), body: b('A separate PDF, distinct from the EU-student price table, per UAM’s own page.', 'UAM-এর নিজের page অনুযায়ী, EU-student price table থেকে আলাদা একটি PDF।') },
      VISA_STEP,
    ],
    status: 'not-verified',
    sources: [ES_UAM_STUDY_ABROAD, ES_UAM_PRECIOS],
  },
  programs: [],
  lastVerified: READ,
};

const IEU_BIR: ProgramProfile = {
  id: 'es-ieu-bachelor-international-relations',
  title: 'Bachelor in International Relations',
  level: 'bachelors' as const,
  faculty: 'School of Politics, Economics and Global Affairs',
  languages: b('English', 'ইংরেজি'),
  englishOnly: true,
  duration: b('4 years', '4 বছর'),
  tuition: {
    ...txt('EUR 27,300 for the first year of the programme (tuition is reviewed and adjusted annually for the full duration of the degree), per IE University’s own page — well above public-university levels.', 'Programme-এর প্রথম বছরের জন্য EUR 27,300 (tuition প্রতি বছর পুনর্বিবেচিত আর পুরো degree-র জন্য সমন্বিত হয়), IE University-র নিজের page অনুযায়ী — public-university level-এর থেকে অনেক বেশি।', 'verified', [ES_IEU_BIR_FEES]),
    money: { amount: 27300, currency: 'EUR', period: 'year' },
  },
  deadline: NOT_VERIFIED_FEE([ES_IEU_ADMISSION_PROCESS]),
  nextIntake: intake('confirmed', [ES_IEU_ADMISSION_PROCESS], b('2027-2028 admissions cycle, run across several rounds', '2027-2028 admissions cycle, কয়েকটি round জুড়ে')),
  requirements: txt('A secondary-school qualification recognised as giving access to Spanish university study, assessed per the applicant’s own education system (IE University’s own entry-requirements page details specific rules for IB, A-Levels and other systems); an IEU admissions test measuring verbal, logical and numerical skills; and, for non-EU applicants, timely attention to the visa process once admitted.', 'আবেদনকারীর নিজের education system অনুযায়ী মূল্যায়ন করা, Spanish university study-এর access দেওয়ার মতো স্বীকৃত একটি secondary-school যোগ্যতা (IE University-র নিজের entry-requirements page IB, A-Levels, আর অন্য system-এর জন্য নির্দিষ্ট নিয়ম বর্ণনা করে); verbal, logical, আর numerical দক্ষতা মাপা একটি IEU admissions test; আর, non-EU আবেদনকারীদের জন্য, ভর্তি হলে visa process-এর প্রতি সময়মতো মনোযোগ।', 'verified', [ES_IEU_ENTRY_REQUIREMENTS, ES_IEU_ADMISSION_PROCESS]),
  english: txt('Minimum TOEFL 100 (105 recommended), minimum IELTS 7 (7.5 recommended), or minimum Duolingo English Test score of 130, per IE University’s own admission-process page.', 'IE University-র নিজের admission-process page অনুযায়ী, ন্যূনতম TOEFL 100 (105 সুপারিশ করা), ন্যূনতম IELTS 7 (7.5 সুপারিশ করা), বা ন্যূনতম Duolingo English Test স্কোর 130।', 'verified', [ES_IEU_ADMISSION_PROCESS]),
  applyVia: b('IE University’s own online application system', 'IE University-র নিজস্ব online application system'),
  url: 'https://www.ie.edu/university/studies/academic-programs/bachelor-international-relations/admissions-fees/',
  sources: [ES_IEU_BIR_FEES, ES_IEU_ADMISSION_PROCESS],
  lastVerified: READ,
};

const IEU: UniversityProfile = {
  id: 'es-ie-university',
  countryCode: 'ES',
  name: 'IE University',
  city: 'Madrid/Segovia',
  ownership: 'private',
  officialUrl: 'https://www.ie.edu/university/admission/admission-process/',
  admissionsUrl: ES_IEU_ADMISSION_PROCESS.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '446', sourceUrl: ES_IEU_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A private university founded in 1973 with campuses in Madrid and Segovia, teaching most programmes in English to a highly international student body (over 130 nationalities), grouped into five schools including IE Business School.',
    '1973 সালে প্রতিষ্ঠিত একটি private university, Madrid আর Segovia-তে campus সহ, একটি উচ্চ international student body-কে (130-র বেশি nationality) বেশিরভাগ programme English-এ পড়ায়, IE Business School সহ পাঁচটা school-এ বিভক্ত।',
  ),
  tuition: {
    ...txt(
      'Set entirely by IE University itself, far above public-university levels, and published directly on its own programme pages — e.g. EUR 27,300 for the first year of the Bachelor in International Relations and EUR 34,500 for the Master in International Relations (both reviewed annually), plus a one-time EUR 1,200 IE Foundation contribution and a EUR 150 admission fee.',
      'সম্পূর্ণভাবে IE University নিজেই ঠিক করে, public-university level-এর থেকে অনেক বেশি, আর সরাসরি নিজের programme page-এ প্রকাশ করে — যেমন Bachelor in International Relations-এর প্রথম বছরের জন্য EUR 27,300 আর Master in International Relations-এর জন্য EUR 34,500 (দুটোই প্রতি বছর পুনর্বিবেচিত), সঙ্গে একবারের EUR 1,200 IE Foundation contribution আর একটি EUR 150 admission fee।',
      'verified',
      [ES_IEU_BIR_FEES, ES_IEU_MIR_FEES],
    ),
    money: { amount: 27300, currency: 'EUR', period: 'year' },
  },
  deadlines: txt('IE University’s own admissions page states its admissions process runs across several rounds; applying earlier gives a sooner decision and greater capacity, which the university itself recommends for non-EU candidates needing time for the visa process.', 'IE University-র নিজের admissions page বলে তার admissions process কয়েকটি round জুড়ে চলে; আগে আবেদন করলে আগে সিদ্ধান্ত পাওয়া যায় আর বেশি capacity থাকে, যা university নিজেই visa process-এর জন্য সময় লাগা non-EU প্রার্থীদের সুপারিশ করে।', 'verified', [ES_IEU_ADMISSION_PROCESS]),
  nextIntake: intake('confirmed', [ES_IEU_ADMISSION_PROCESS], b('2027-2028 admissions cycle, run across several rounds', '2027-2028 admissions cycle, কয়েকটি round জুড়ে')),
  admission: txt('IE University’s own entry-requirements page states that, as a general rule, applicants must meet the university-entry requirements of their own country of residence to be officially enrolled in Spain, and that all students must also sit the IEU Admissions Test (verbal, logical and numerical reasoning).', 'IE University-র নিজের entry-requirements page বলে, একটি সাধারণ নিয়ম হিসেবে, Spain-এ officially enrolled হওয়ার জন্য আবেদনকারীদের নিজের বসবাসের দেশের university-entry শর্ত পূরণ করতে হয়, আর সব student-কে IEU Admissions Test (verbal, logical, আর numerical reasoning)-এও বসতে হয়।', 'verified', [ES_IEU_ENTRY_REQUIREMENTS]),
  english: txt('Minimum TOEFL 100 (105 recommended), minimum IELTS 7 (7.5 recommended), or minimum Duolingo English Test score of 130, per IE University’s own admission-process page.', 'IE University-র নিজের admission-process page অনুযায়ী, ন্যূনতম TOEFL 100 (105 সুপারিশ করা), ন্যূনতম IELTS 7 (7.5 সুপারিশ করা), বা ন্যূনতম Duolingo English Test স্কোর 130।', 'verified', [ES_IEU_ADMISSION_PROCESS]),
  documents: {
    required: [b('High-school academic transcripts (last two years, plus current grades)', 'High-school academic transcript (গত দুই বছর, সঙ্গে চলতি grade)'), b('Copy of passport, ID or residence permit', 'Passport, ID, বা residence permit-এর কপি'), b('A letter of recommendation', 'একটি letter of recommendation'), b('An English-proficiency score (TOEFL/IELTS/Duolingo) meeting IE’s own minimum', 'IE-র নিজের ন্যূনতম পূরণ করা একটি English-proficiency স্কোর (TOEFL/IELTS/Duolingo)')],
    mayBeRequired: [b('A portfolio of work or additional supporting documents', 'কাজের একটি portfolio বা অতিরিক্ত supporting documents')],
    status: 'verified',
    sources: [ES_IEU_ADMISSION_PROCESS],
  },
  applicationFee: txt('EUR 150 admission fee, plus a one-time EUR 1,200 IE Foundation contribution made during first-year enrolment, per IE University’s own fees page.', 'IE University-র নিজের fees page অনুযায়ী, EUR 150 admission fee, সঙ্গে প্রথম বছরের enrolment-এ একবারের EUR 1,200 IE Foundation contribution।', 'verified', [ES_IEU_BIR_FEES]),
  scholarships: txt('No IE-University-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide; IE’s own pages describe merit- and need-based aid in general terms without a Bangladesh-specific route.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য IE-University-specific একটি full-degree scholarship পাওয়া যায়নি; IE-র নিজের page merit- আর need-based aid সাধারণভাবে বর্ণনা করে, কোনো Bangladesh-specific route ছাড়া।', 'not-verified', [ES_IEU_ADMISSION_PROCESS]),
  applicationRoute: txt('Online application via IE University’s own application system (my.ie.edu), with the IEU Admissions Test as part of the process.', 'IE University-র নিজস্ব application system (my.ie.edu)-এর মাধ্যমে online application, process-এর অংশ হিসেবে IEU Admissions Test সহ।', 'verified', [ES_IEU_ADMISSION_PROCESS]),
  steps: {
    items: [
      { title: b('Confirm your country’s legal entry requirements and IE’s own academic requirements', 'আপনার দেশের legal entry শর্ত আর IE-র নিজের academic শর্ত নিশ্চিত করুন'), body: b('IE’s own page details specific rules per education system (IB, A-Levels, etc.).', 'IE-র নিজের page প্রতি education system (IB, A-Levels, ইত্যাদি) অনুযায়ী নির্দিষ্ট নিয়ম বর্ণনা করে।') },
      { title: b('Apply online and sit the IEU Admissions Test', 'অনলাইনে আবেদন করুন আর IEU Admissions Test দিন'), body: b('Applying in an earlier round gives a sooner decision and more capacity.', 'আগের round-এ আবেদন করলে আগে সিদ্ধান্ত পাওয়া যায় আর বেশি capacity থাকে।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [ES_IEU_ADMISSION_PROCESS, ES_IEU_ENTRY_REQUIREMENTS],
  },
  programs: [IEU_BIR],
  lastVerified: READ,
};

export const ES_UNI_LAYER: CountryUniversityLayer = {
  code: 'ES',
  universities: [IEU, UAB, UAM, UB, UCM],
  visaStats: [],
  unverified: [
    {
      id: 'es-bd-visa-approval-rate',
      label: b('Bangladesh-specific long-stay study authorisation approval or refusal rate', 'বাংলাদেশ-নির্দিষ্ট long-stay study authorisation অনুমোদন বা প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific approval-rate figure, or a verified country-wide international-student headcount broken down by nationality from an official Spanish source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'es-public-tuition-figures',
      label: b('Exact current per-credit public-university tuition figures for non-EU students', 'Non-EU student-দের জন্য public-university-র সঠিক চলতি per-credit tuition সংখ্যা'),
      status: 'not-verified',
      note: 'UCM’s and UAM’s own pages describe the mechanism (a regionally set per-ECTS-credit rate, with a higher "fourth registration" tier for international students without permanent residence or an exchange agreement), and UB’s and UAB’s own pages confirm the regional decree/price basis, but the exact current euro-per-credit figures sit in linked PDF price tables that were not independently read for this guide, so no single figure is confirmed here for any of the four public universities.',
    },
    {
      id: 'es-aecid-bangladesh-eligibility',
      label: b('Bangladesh’s eligibility for any AECID "Latin America, Africa and Asia" scholarship programme', 'AECID-র কোনো "Latin America, Africa and Asia" scholarship programme-এর জন্য Bangladesh-এর যোগ্যতা'),
      status: 'not-verified',
      note: 'AECID’s own convocatoria page names the broad group "Latin America, Africa and Asia", but the individual programme call texts read for this guide (the África-Med Máster programme) name specific eligible countries, mostly in Africa and the Middle East, without Bangladesh; the Escuela Diplomática programme’s country list was not independently read in full for this guide.',
    },
  ],
  lastVerified: READ,
};

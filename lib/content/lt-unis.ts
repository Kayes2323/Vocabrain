import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import { LT_KTU_BACHELORS, LT_READ, LT_VMU_DEGREE, LT_VMU_TUITION, LT_VU_BACHELORS, LT_VU_TUITION } from './lt-sources';

/**
 * Lithuania: university → program layer, built the same way as Germany's and
 * South Korea's (lib/content/de-unis.ts, lib/content/kr-unis.ts). Rankings are
 * QS World University Rankings 2027 as printed on each university's
 * topuniversities.com profile; tuition, deadlines and requirements come from
 * the university's own official pages. Anything that could not be verified
 * on an official page is left marked unverified — never guessed.
 */

const READ = LT_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const qs = (name: string, url: string): SourceRef => ({ name, url, sourceType: 'ranking-publisher' });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the university’s official application page.', 'যাচাই হয়নি — university-র official আবেদনের page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Apply for a Lithuanian Temporary Residence Permit (TRP)', 'Lithuania-র Temporary Residence Permit (TRP)-এর আবেদন'),
  body: b('After admission, once your university has submitted your EPIS mediation-letter number, apply for a TRP via MIGRIS. See the Lithuania residence-permit section on the country page.', 'ভর্তির পর, university আপনার EPIS mediation-letter number জমা দিলে, MIGRIS-এ TRP-এর আবেদন করুন। Country page-এর Lithuania residence-permit অংশ দেখুন।'),
};

// ------------------------------------------------------------------ sources

const QS_VU = qs('QS World University Rankings 2027 – Vilnius University (topuniversities.com)', 'https://www.topuniversities.com/universities/vilnius-university');
const QS_KTU = qs('QS World University Rankings 2027 – Kaunas University of Technology (topuniversities.com)', 'https://www.topuniversities.com/universities/kaunas-university-technology');
const QS_VMU = qs('QS World University Rankings 2027 – Vytautas Magnus University (topuniversities.com)', 'https://www.topuniversities.com/universities/vytautas-magnus-university');

// ------------------------------------------------------------------ universities

const VU: UniversityProfile = {
  id: 'lt-vu',
  countryCode: 'LT',
  name: 'Vilnius University',
  city: 'Vilnius',
  ownership: 'public',
  officialUrl: 'https://www.vu.lt/en',
  admissionsUrl: LT_VU_BACHELORS.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=465', sourceUrl: QS_VU.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Lithuania’s oldest and largest university, in Vilnius. International Admissions runs one intake per academic year, through its own online application system, with general, country-specific and programme-specific requirements.',
    'Vilnius-এ Lithuania-র সবচেয়ে পুরনো আর বড় university। International Admissions নিজস্ব online application system-এ একাদেমিক বছরে একটি intake চালায়, সাধারণ, country-specific আর programme-specific শর্ত সহ।',
  ),
  tuition: {
    ...txt(
      'The annual tuition fee is not itemized by programme on the official tuition-fee page read; it covers payment, instalment and refund procedures only. Check the fee for your chosen programme on the programme’s own page before applying.',
      'পড়া official tuition-fee page-এ programme অনুযায়ী বার্ষিক tuition fee তালিকাভুক্ত নেই; এখানে কেবল payment, instalment আর refund প্রক্রিয়া আছে। আবেদনের আগে আপনার programme-এর নিজস্ব page-এ fee দেখুন।',
      'not-verified',
      [LT_VU_TUITION],
    ),
  },
  deadlines: txt(
    'Autumn 2027 intake: 1 May 2027 for non-EU/EFTA applicants; 1 July 2027 for EU/EFTA citizens and for non-EU/EFTA applicants still within their 90-day visa-free stay.',
    'Autumn 2027 intake: non-EU/EFTA আবেদনকারীদের জন্য ১ May 2027; EU/EFTA নাগরিক আর ৯০ দিনের visa-free সময়ের মধ্যে থাকা non-EU/EFTA আবেদনকারীদের জন্য ১ July 2027।',
    'verified',
    [LT_VU_BACHELORS],
  ),
  nextIntake: intake('confirmed', [LT_VU_BACHELORS], b('Autumn 2027 (non-EU/EFTA deadline 1 May 2027)', 'Autumn 2027 (non-EU/EFTA deadline ১ May 2027)')),
  admission: txt(
    'Online application via apply.vu.lt, up to three programme choices per application (admission to only one). Assessed on grades, motivation letter, English test results and, where applicable, work experience or programme-specific requirements, within 30 working days of a complete application.',
    'apply.vu.lt-এ online আবেদন, প্রতি আবেদনে সর্বোচ্চ তিনটি programme (ভর্তি হয় একটিতে)। গ্রেড, motivation letter, English test score আর প্রযোজ্য হলে কাজের অভিজ্ঞতা বা programme-specific শর্তের ভিত্তিতে, পূর্ণ আবেদনের ৩০ কর্মদিনের মধ্যে মূল্যায়ন।',
    'verified',
    [LT_VU_BACHELORS],
  ),
  english: txt(
    'A language-proficiency certificate is required from the university’s own defined list of accepted methods; the exact tests and minimum scores were not itemized on the admissions page read (see the university’s separate language-skills page).',
    'University-র নিজস্ব তালিকা থেকে একটি language-proficiency certificate লাগে; পড়া admissions page-এ সঠিক test আর ন্যূনতম score তালিকাভুক্ত ছিল না (university-র আলাদা language-skills page দেখুন)।',
    'not-verified',
    [LT_VU_BACHELORS],
  ),
  documents: {
    required: [b('Secondary-education graduation documents (certificate and transcript)', 'Secondary-education-এর graduation document (সনদ আর transcript)'), b('Copy of passport or ID card', 'Passport বা ID card-এর copy'), b('Language proficiency certificate', 'Language proficiency certificate'), b('Motivation letter (1,200–4,000 characters)', 'Motivation letter (১,২০০–৪,০০০ character)')],
    mayBeRequired: [b('Country-specific documents (Vilnius University lists Bangladesh among the countries with extra requirements)', 'Country-specific document (Vilnius University, Bangladesh-কে অতিরিক্ত শর্তযুক্ত দেশের তালিকায় রাখে)'), b('Programme-specific documents', 'Programme-specific document')],
    status: 'verified',
    sources: [LT_VU_BACHELORS],
  },
  applicationFee: txt('EUR 100 per application, non-refundable, paid via the Flywire payment platform.', 'প্রতি আবেদনে EUR 100, non-refundable, Flywire payment platform-এর মাধ্যমে।', 'verified', [LT_VU_BACHELORS]),
  scholarships: txt(
    'State-funded places exist for EU/EFTA citizens, Lithuanian permanent residents and people of Lithuanian origin; other applicants pay tuition and may seek university or state financial support (loans, tuition-fee compensation for top results) described on the Finance page, with no amount itemized for international scholarships on the page read.',
    'EU/EFTA নাগরিক, Lithuania-র permanent resident আর Lithuanian বংশোদ্ভূতদের জন্য state-funded জায়গা আছে; অন্য আবেদনকারীরা tuition দেন আর Finance page-এ বর্ণিত university বা state সহায়তা (loan, ভালো result-এ tuition-fee compensation) খুঁজতে পারেন, পড়া page-এ international scholarship-এর কোনো পরিমাণ তালিকাভুক্ত ছিল না।',
    'partly-verified',
    [LT_VU_BACHELORS],
  ),
  applicationRoute: txt('Online via apply.vu.lt (the university’s own Dream Apply-based system).', 'apply.vu.lt-এ online (university-র নিজস্ব Dream Apply-ভিত্তিক system)।', 'verified', [LT_VU_BACHELORS]),
  steps: {
    items: [
      { title: b('Find your programme', 'আপনার programme খুঁজুন'), body: b('Choose up to three programmes in one application; you can be admitted to only one.', 'একটি আবেদনে সর্বোচ্চ তিনটি programme বাছুন; ভর্তি হবেন একটিতে।') },
      { title: b('Check eligibility and prepare documents', 'যোগ্যতা দেখে document প্রস্তুত করুন'), body: b('General, country-specific and programme-specific requirements all apply.', 'সাধারণ, country-specific আর programme-specific — সবকিছু প্রযোজ্য।') },
      { title: b('Pay the application fee and submit', 'Application fee দিয়ে জমা দিন'), body: b('EUR 100 via Flywire; the application is processed only after the fee and all documents are in.', 'Flywire-এ EUR 100; fee আর সব document জমা হলেই আবেদন প্রক্রিয়া হয়।') },
      { title: b('Confirm acceptance and pay tuition', 'ভর্তি নিশ্চিত করে tuition দিন'), body: b('Confirm within 7 working days; non-state-funded first-year students pay the annual tuition fee within 15 calendar days of the offer.', '৭ কর্মদিনের মধ্যে নিশ্চিত করুন; non-state-funded প্রথম বছরের student-রা offer-এর ১৫ ক্যালেন্ডার দিনের মধ্যে বার্ষিক tuition দেন।') },
      VISA_STEP,
      { title: b('Arrive and register', 'পৌঁছে registration করুন'), body: b('Studies begin 1 September; register in the Identity Management System (ID VU) in your first month.', 'পড়া শুরু ১ September-এ; প্রথম মাসে Identity Management System (ID VU)-এ registration করুন।') },
    ],
    status: 'verified',
    sources: [LT_VU_BACHELORS],
  },
  programs: [],
  lastVerified: READ,
};

const KTU: UniversityProfile = {
  id: 'lt-ktu',
  countryCode: 'LT',
  name: 'Kaunas University of Technology (KTU)',
  city: 'Kaunas',
  ownership: 'public',
  officialUrl: 'https://en.ktu.edu/',
  admissionsUrl: LT_KTU_BACHELORS.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=696', sourceUrl: QS_KTU.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A public technical university in Kaunas. Foreign citizens are admitted only to state non-funded places on full-time, English-taught programmes, through the university’s own online application.',
    'Kaunas-এর একটি সরকারি technical university। বিদেশি নাগরিকরা কেবল full-time, ইংরেজি-মাধ্যম programme-এর state non-funded জায়গায় ভর্তি হন, university-র নিজস্ব online আবেদনের মাধ্যমে।',
  ),
  tuition: {
    ...txt(
      'For students starting in the 2026–2027 academic year: EUR 3,250/year for Business and Public Administration, Economics, Political Sciences, Communication and Linguistics study fields; EUR 4,201/year for Engineering, Technology, Informatics, Physical Sciences, Mathematics, Education Sciences and Translations; EUR 5,676/year for the first part of the Architecture integrated programme (EUR 6,985/year for its second part, credits 241–300).',
      '2026–2027 শিক্ষাবর্ষে শুরু করা student-দের জন্য: Business and Public Administration, Economics, Political Sciences, Communication আর Linguistics study field-এ বছরে EUR 3,250; Engineering, Technology, Informatics, Physical Sciences, Mathematics, Education Sciences আর Translations-এ বছরে EUR 4,201; Architecture integrated programme-এর প্রথম অংশে বছরে EUR 5,676 (দ্বিতীয় অংশে, credit ২৪১–৩০০, বছরে EUR 6,985)।',
      'verified',
      [LT_KTU_BACHELORS],
    ),
    money: { amount: 3250, max: 6985, currency: 'EUR', period: 'year' },
  },
  deadlines: txt(
    '2026/2027 intake: application period 15 October 2025 – 1 June 2026; studies start 1 September 2026. KTU runs one intake a year (no spring intake).',
    '2026/2027 intake: আবেদনের সময় ১৫ October 2025 – ১ June 2026; পড়া শুরু ১ September 2026। KTU বছরে একটিই intake চালায় (spring intake নেই)।',
    'verified',
    [LT_KTU_BACHELORS],
  ),
  nextIntake: intake('confirmed', [LT_KTU_BACHELORS], b('2026/2027 academic year (applications 15 October 2025 – 1 June 2026)', '2026/2027 শিক্ষাবর্ষ (আবেদন ১৫ October 2025 – ১ June 2026)')),
  admission: txt(
    'Online application only, through apply.ktu.edu, with up to three programme preferences. Minimum requirements: secondary education, a minimum average grade (CGPA) above 60% in each entry subject, and at least one passed state or equivalent/entrance examination.',
    'apply.ktu.edu-এ শুধুমাত্র online আবেদন, সর্বোচ্চ তিনটি programme preference সহ। ন্যূনতম শর্ত: secondary education, প্রতিটি entry subject-এ CGPA 60%-এর বেশি, আর অন্তত একটি passed state বা সমমান/entrance পরীক্ষা।',
    'verified',
    [LT_KTU_BACHELORS],
  ),
  english: txt(
    'If English is not your native language: CEFR B2 or above, IELTS 5.5 or above with every component at least 5.5, TOEFL iBT 75 or above, IESOL B2, or an equivalent test taken within the last two years. Applicants with no certificate but whose previous studies were fully in English may be exempt, or can sit a free KTU online test.',
    'ইংরেজি native ভাষা না হলে: CEFR B2 বা তার বেশি, IELTS 5.5 বা তার বেশি (প্রতিটি অংশে অন্তত 5.5), TOEFL iBT 75 বা তার বেশি, IESOL B2, বা গত দুই বছরে নেওয়া সমমান test। আগের পড়া পুরোপুরি ইংরেজিতে হলে certificate ছাড়াও exempt হতে পারেন, বা KTU-র বিনামূল্যের online test দিতে পারেন।',
    'verified',
    [LT_KTU_BACHELORS],
  ),
  documents: {
    required: [b('Passport (or EU ID card)', 'Passport (বা EU ID card)'), b('Maturity certificate and its supplement (secondary-education documents)', 'Maturity certificate আর supplement (secondary-education document)'), b('Online application at apply.ktu.edu', 'apply.ktu.edu-এ online application')],
    mayBeRequired: [b('English-language certificate, if held', 'English-language certificate, থাকলে'), b('Other education documents, research/artistic activity or work-experience proof', 'অন্য education document, research/artistic activity বা কাজের অভিজ্ঞতার প্রমাণ'), b('Name or surname change document, if applicable', 'নাম বা surname পরিবর্তনের document, প্রযোজ্য হলে')],
    status: 'verified',
    sources: [LT_KTU_BACHELORS],
  },
  applicationFee: txt('EUR 100 (stated in KTU’s transfer-applicant FAQ); non-refundable once the application is registered for the competition.', 'EUR 100 (KTU-র transfer-applicant FAQ-তে বলা); প্রতিযোগিতার জন্য আবেদন registered হয়ে গেলে non-refundable।', 'partly-verified', [LT_KTU_BACHELORS]),
  scholarships: txt(
    'A partial tuition-fee waiver is open to all international applicants with a strong academic record and motivation; everyone who submits an application through apply.ktu.edu automatically becomes a candidate, with no separate form.',
    'শক্তিশালী academic record আর motivation-যুক্ত সব international আবেদনকারীর জন্য একটি আংশিক tuition-fee waiver খোলা; apply.ktu.edu-এর মাধ্যমে আবেদন করলেই আপনা-আপনি candidate হয়ে যান, আলাদা form লাগে না।',
    'verified',
    [LT_KTU_BACHELORS],
  ),
  applicationRoute: txt('Online via apply.ktu.edu.', 'apply.ktu.edu-এ online।', 'verified', [LT_KTU_BACHELORS]),
  steps: {
    items: [
      { title: b('Apply online within the application period', 'আবেদনের সময়ের মধ্যে online আবেদন'), body: b('Submit via apply.ktu.edu and pay the application fee; the application is reviewed once the fee is confirmed.', 'apply.ktu.edu-এ জমা দিয়ে application fee দিন; fee নিশ্চিত হলেই আবেদন পর্যালোচনা হয়।') },
      { title: b('Submit your documents', 'Document জমা দিন'), body: b('All required and optional supporting documents are uploaded as electronic copies in the same system.', 'সব প্রয়োজনীয় আর ঐচ্ছিক document একই system-এ electronic copy হিসেবে upload করুন।') },
      { title: b('Pay the advance tuition fee and sign the learning agreement', 'Advance tuition fee দিয়ে learning agreement সাক্ষর করুন'), body: b('Due before a mediation letter is issued for the TRP application; must be covered before arrival.', 'TRP আবেদনের জন্য mediation letter পাওয়ার আগে দিতে হয়; পৌঁছানোর আগে দিতে হয়।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [LT_KTU_BACHELORS],
  },
  programs: [
    {
      id: 'lt-ktu-sci-eng',
      title: 'Engineering, Technology, Informatics, Physical Sciences, Mathematics, Education Sciences and Translations (English-taught Bachelor’s / Integrated programmes)',
      level: 'bachelors',
      languages: b('English', 'ইংরেজি'),
      englishOnly: true,
      tuition: {
        ...txt('EUR 4,201/year for students starting in the 2026–2027 academic year.', '2026–2027 শিক্ষাবর্ষে শুরু করা student-দের জন্য বছরে EUR 4,201।', 'verified', [LT_KTU_BACHELORS]),
        money: { amount: 4201, currency: 'EUR', period: 'year' },
      },
      deadline: txt('Application period 15 October 2025 – 1 June 2026 for studies starting 1 September 2026.', '১ September 2026-এ পড়া শুরুর জন্য আবেদনের সময় ১৫ October 2025 – ১ June 2026।', 'verified', [LT_KTU_BACHELORS]),
      nextIntake: intake('confirmed', [LT_KTU_BACHELORS], b('2026/2027 academic year', '2026/2027 শিক্ষাবর্ষ')),
      requirements: txt('Secondary education, CGPA above 60% in each entry subject, at least one passed state/entrance examination; foreign citizens are admitted to state non-funded places only.', 'Secondary education, প্রতিটি entry subject-এ CGPA 60%-এর বেশি, অন্তত একটি passed state/entrance পরীক্ষা; বিদেশি নাগরিকরা কেবল state non-funded জায়গায় ভর্তি হন।', 'verified', [LT_KTU_BACHELORS]),
      english: txt('IELTS 5.5+ (every component at least 5.5), TOEFL iBT 75+, CEFR B2+, IESOL B2, or equivalent within the last two years.', 'IELTS 5.5+ (প্রতিটি অংশে অন্তত 5.5), TOEFL iBT 75+, CEFR B2+, IESOL B2, বা গত দুই বছরে সমমান।', 'verified', [LT_KTU_BACHELORS]),
      applyVia: b('apply.ktu.edu', 'apply.ktu.edu'),
      url: LT_KTU_BACHELORS.url!,
      sources: [LT_KTU_BACHELORS],
      lastVerified: READ,
    },
  ],
  lastVerified: READ,
};

const VMU: UniversityProfile = {
  id: 'lt-vmu',
  countryCode: 'LT',
  name: 'Vytautas Magnus University (VMU)',
  city: 'Kaunas',
  ownership: 'public',
  officialUrl: 'https://www.vdu.lt/en/',
  admissionsUrl: LT_VMU_DEGREE.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '751-760', sourceUrl: QS_VMU.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A public university in Kaunas with a fully online application process (documents sent by email are not evaluated); admission for the 2027–2028 academic year was still being finalised on the page read.',
    'Kaunas-এর একটি সরকারি university, পুরোপুরি online আবেদন প্রক্রিয়া (ইমেইলে পাঠানো document মূল্যায়ন হয় না); পড়া page-এ 2027–2028 শিক্ষাবর্ষের ভর্তি তখনও চূড়ান্ত হচ্ছিল।',
  ),
  tuition: {
    ...txt(
      'The bachelor’s tuition-fee table for the 2026–2027 academic year lists EUR 3,250 or EUR 4,201 a year depending on the programme (for example Business Administration and Economics and Finance at EUR 3,250; English Philology and Biology and Genetics at EUR 4,201); a second figure shown per programme (EUR 3,400–4,400) was not labelled clearly enough on the page read to state its meaning with certainty.',
      '2026–2027 শিক্ষাবর্ষের bachelor\'s tuition-fee table-এ programme অনুযায়ী বছরে EUR 3,250 বা EUR 4,201 দেখানো আছে (যেমন Business Administration আর Economics and Finance-এ EUR 3,250; English Philology আর Biology and Genetics-এ EUR 4,201); প্রতি programme-এ দেখানো দ্বিতীয় সংখ্যা (EUR 3,400–4,400) পড়া page-এ এত স্পষ্টভাবে লেবেল করা ছিল না যে নিশ্চিতভাবে এর মানে বলা যায়।',
      'partly-verified',
      [LT_VMU_TUITION],
    ),
    money: { amount: 3250, max: 4400, currency: 'EUR', period: 'year' },
  },
  deadlines: txt(
    'The university’s own page says detailed requirements and admission rules for the 2027 autumn intake (studies preliminarily starting 23 August 2027) will be updated closer to the application period.',
    'University-র নিজস্ব page বলে 2027 autumn intake-এর (পড়া প্রাথমিকভাবে ২৩ August 2027-এ শুরু) বিস্তারিত শর্ত আর ভর্তির নিয়ম আবেদনের সময় কাছাকাছি হালনাগাদ হবে।',
    'needs-review',
    [LT_VMU_DEGREE],
  ),
  nextIntake: intake('not-published', [LT_VMU_DEGREE]),
  admission: txt(
    'Application is completely online (documents sent by email are not evaluated); apply through the university’s own Dream Apply-based portal. After acceptance, applicants sign an online Agreement of Studies and pay the full first-year tuition fee in one instalment by the invoice deadline.',
    'আবেদন সম্পূর্ণ online (ইমেইলে পাঠানো document মূল্যায়ন হয় না); university-র নিজস্ব Dream Apply-ভিত্তিক portal-এ আবেদন। ভর্তি হলে, আবেদনকারীরা online Agreement of Studies সাক্ষর করে invoice-এর সময়ের মধ্যে প্রথম বছরের পূর্ণ tuition fee একবারে দেন।',
    'verified',
    [LT_VMU_DEGREE],
  ),
  english: txt('The university does not organise its own English-language testing; applicants must provide their own proof of English proficiency, though the exact accepted list was not itemized on the page read.', 'University নিজস্ব English-language testing চালায় না; আবেদনকারীদের নিজের English proficiency-র প্রমাণ দিতে হয়, যদিও পড়া page-এ সঠিক গ্রহণযোগ্য তালিকা ছিল না।', 'partly-verified', [LT_VMU_DEGREE]),
  documents: { required: [], mayBeRequired: [b('Signed online Agreement of Studies', 'সাক্ষরিত online Agreement of Studies'), b('Proof of first-year tuition-fee payment', 'প্রথম বছরের tuition-fee দেওয়ার প্রমাণ')], status: 'not-verified', sources: [LT_VMU_DEGREE] },
  applicationFee: txt('Not itemized for bachelor’s applicants on the page read; a separate, lower registration fee is charged for master’s applications instead.', 'Bachelor\'s আবেদনকারীদের জন্য পড়া page-এ তালিকাভুক্ত নেই; master\'s আবেদনে আলাদা, কম registration fee নেওয়া হয়।', 'not-verified', [LT_VMU_DEGREE]),
  scholarships: txt(
    'The university links to its own scholarships page for tuition-fee support; the exact waiver tiers and current deadlines were not read from that page here, so no figure is stated.',
    'University-র নিজস্ব scholarships page-এ tuition-fee সহায়তার লিঙ্ক আছে; সঠিক waiver স্তর আর বর্তমান শেষ তারিখ এখান থেকে পড়া হয়নি, তাই কোনো পরিমাণ বলা হয়নি।',
    'not-verified',
    [LT_VMU_DEGREE],
  ),
  applicationRoute: txt('Online only, via the university’s own Dream Apply-based portal (vytautasmagnus.dreamapply.com).', 'শুধুমাত্র online, university-র নিজস্ব Dream Apply-ভিত্তিক portal-এ (vytautasmagnus.dreamapply.com)।', 'verified', [LT_VMU_DEGREE]),
  steps: {
    items: [
      { title: b('Prepare the required documents', 'প্রয়োজনীয় document প্রস্তুত করুন'), body: b('The university does not test English itself, so arrange your own proof.', 'University নিজে English test নেয় না, তাই নিজের প্রমাণ ব্যবস্থা করুন।') },
      { title: b('Apply online', 'Online আবেদন করুন'), body: b('Application is completely online; documents emailed instead are not evaluated.', 'আবেদন সম্পূর্ণ online; ইমেইলে পাঠানো document মূল্যায়ন হয় না।') },
      { title: b('Sign the Agreement of Studies and pay tuition', 'Agreement of Studies সাক্ষর করে tuition দিন'), body: b('Pay the full first-year fee in one instalment by the invoice deadline, or the application is terminated.', 'Invoice-এর সময়ের মধ্যে প্রথম বছরের পূর্ণ fee একবারে দিন, না হলে আবেদন বাতিল হয়।') },
      VISA_STEP,
      { title: b('Arrange accommodation and arrive', 'থাকার ব্যবস্থা করে পৌঁছান'), body: b('University dormitory booking opens online, first come first served, once the Agreement of Studies is signed and tuition paid.', 'Agreement of Studies সাক্ষরিত আর tuition দেওয়া হলে university dormitory booking online খোলে, প্রথম আসলে প্রথম পাবে।') },
    ],
    status: 'verified',
    sources: [LT_VMU_DEGREE],
  },
  programs: [],
  lastVerified: READ,
};

export const LT_UNI_LAYER: CountryUniversityLayer = {
  code: 'LT',
  universities: [VU, KTU, VMU],
  visaStats: [],
  unverified: [
    {
      id: 'lt-bd-trp-approval-rate',
      label: b('Bangladesh-specific Temporary Residence Permit (study) approval/refusal rate', 'বাংলাদেশ-নির্দিষ্ট Temporary Residence Permit (study) অনুমোদন/প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific TRP approval-rate figure, or a verified country-wide international-student headcount from an official Lithuanian statistics source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'lt-insurance-minimum-sum',
      label: b('Minimum health-insurance sum for a Temporary Residence Permit', 'Temporary Residence Permit-এর জন্য ন্যূনতম health-insurance sum'),
      status: 'needs-review',
      note: 'The EU Immigration Portal states EUR 6,000 for a TRP while ISM University’s own migration guide states at least EUR 10,000; the two official/university sources disagree and neither is chosen here.',
    },
  ],
  lastVerified: READ,
};

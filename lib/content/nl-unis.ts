import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, ProgramProfile, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import {
  NL_EUR,
  NL_EUR_APPLICATION_FEE,
  NL_EUR_IBEB_APPLY,
  NL_EUR_QS,
  NL_EUR_TUITION,
  NL_LEIDEN,
  NL_LEIDEN_BACHELOR_APPLY,
  NL_LEIDEN_BACHELOR_DEADLINES,
  NL_LEIDEN_BACHELOR_TUITION,
  NL_LEIDEN_MASTER_DEADLINES,
  NL_LEIDEN_MASTER_TUITION,
  NL_LEIDEN_QS,
  NL_READ,
  NL_TUDELFT_BSC_INTL_ADMISSION,
  NL_TUDELFT_QS,
  NL_TUDELFT_TUITION,
  NL_UU_BACHELOR_APPLY_EXAMPLE,
  NL_UU_BACHELOR_TUITION,
  NL_UU_MASTER_TUITION,
  NL_UU_QS,
  NL_UVA_BACHELOR_APPLY,
  NL_UVA_QS,
  NL_UVA_TUITION,
} from './nl-sources';

/**
 * Netherlands: university → program layer, built the same way as Ireland's,
 * France's, Czech Republic's, Slovenia's, Lithuania's, Germany's and South
 * Korea's (lib/content/ie-unis.ts, fr-unis.ts, cz-unis.ts, si-unis.ts,
 * lt-unis.ts, de-unis.ts, kr-unis.ts). Rankings are QS World University
 * Rankings 2027 as printed on each institution's topuniversities.com
 * profile. Tuition, deadlines and requirements come from each institution's
 * own official pages. The Netherlands' two-tier fee system (a low statutory
 * fee for EU/EEA/Swiss/Surinamese students, a much higher institutional fee
 * for everyone else, set per faculty/programme) means tuition figures below
 * are the non-EU/EEA institutional rate unless stated otherwise. Anything
 * that could not be verified on an official page is left marked
 * unverified — never guessed.
 */

const READ = NL_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the institution’s official admissions page.', 'যাচাই হয়নি — institution-এর official admissions page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Apply for the MVV and residence permit for study', 'MVV আর পড়ার জন্য residence permit-এর আবেদন করুন'),
  body: b('Once admitted, your institution (an IND-recognised sponsor) usually submits the combined MVV-plus-residence-permit application to the IND for you (Bangladesh needs the MVV; the application route to Bangladesh is on Netherlands Worldwide’s own page). After arrival, keep valid health insurance — study-only students may not take out Dutch public insurance. See the Netherlands student-visa section on the country page.', 'ভর্তি হলে, আপনার institution (একটি IND-recognised sponsor) সাধারণত আপনার জন্য IND-তে combined MVV-plus-residence-permit application জমা দেয় (Bangladesh-এর MVV লাগে; Bangladesh-এর জন্য application route Netherlands Worldwide-এর নিজের page-এ আছে)। পৌঁছানোর পর, valid health insurance রাখুন — study-only student Dutch public insurance নিতে পারবে না। Country page-এর Netherlands student-visa অংশ দেখুন।'),
};

// ------------------------------------------------------------------ universities

const UVA: UniversityProfile = {
  id: 'nl-uva',
  countryCode: 'NL',
  name: 'University of Amsterdam',
  city: 'Amsterdam',
  ownership: 'public',
  officialUrl: 'https://www.uva.nl/',
  admissionsUrl: NL_UVA_BACHELOR_APPLY.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '60', sourceUrl: NL_UVA_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A large public research university in Amsterdam with seven faculties spanning humanities, social and behavioural sciences, economics and business, law, science, medicine and dentistry. UvA sets its own non-EU institutional fee per faculty and programme, which varies widely.',
    'Amsterdam-এ একটি বড় public research university, সাতটি faculty জুড়ে humanities, social and behavioural sciences, economics and business, law, science, medicine, আর dentistry। UvA প্রতি faculty আর programme নিজস্ব non-EU institutional fee ঠিক করে, যা অনেক আলাদা হয়।',
  ),
  tuition: {
    ...txt(
      'Set per faculty, not as one university-wide figure. UvA’s own 2027-2028 institutional-fee table (non-EU/EEA rate) lists bachelor’s programmes from EUR 14,300 (some Economics and Business programmes) and EUR 15,150–16,670 (Humanities/Social Sciences) up to EUR 31,400–34,500 (Medicine); one-year master’s programmes range from about EUR 20,300 to EUR 37,200 depending on the faculty.',
      'প্রতি faculty অনুযায়ী ঠিক হয়, university-wide একটি সংখ্যা না। UvA-র নিজের 2027-2028-এর institutional-fee table (non-EU/EEA rate) bachelor\'s programme EUR 14,300 (কিছু Economics and Business programme) আর EUR 15,150–16,670 (Humanities/Social Sciences) থেকে EUR 31,400–34,500 (Medicine) পর্যন্ত তালিকাভুক্ত করে; এক-বছরের master\'s programme প্রায় EUR 20,300 থেকে EUR 37,200 পর্যন্ত faculty অনুযায়ী আলাদা।',
      'verified',
      [NL_UVA_TUITION],
    ),
    money: { amount: 14300, max: 37200, currency: 'EUR', period: 'year' },
  },
  deadlines: txt('For non-EU/EEA bachelor’s applicants, UvA’s deadline for an English-proficiency test certificate is 1 April (EU/EEA applicants: 1 May); after registering in Studielink you receive an invitation to UvA’s own online application system, whose personal deadline may differ.', 'Non-EU/EEA bachelor\'s আবেদনকারীদের জন্য, একটি English-দক্ষতার test certificate-এর UvA-র deadline 1 April (EU/EEA আবেদনকারী: 1 May); Studielink-এ register করার পর UvA-র নিজস্ব online application system-এ একটি invitation পাবেন, যার ব্যক্তিগত deadline আলাদা হতে পারে।', 'verified', [NL_UVA_BACHELOR_APPLY]),
  nextIntake: intake('confirmed', [NL_UVA_BACHELOR_APPLY], b('September', 'September')),
  admission: txt('Non-EU/EEA bachelor’s applicants first register in Studielink, then complete UvA’s own online application system once invited (within about 48 hours), uploading the required documents and an English-proficiency certificate by the deadline.', 'Non-EU/EEA bachelor\'s আবেদনকারীরা প্রথমে Studielink-এ register করেন, তারপর invite পাওয়ার পর (প্রায় 48 ঘণ্টার মধ্যে) UvA-র নিজস্ব online application system সম্পূর্ণ করেন, deadline-এর মধ্যে প্রয়োজনীয় document আর একটি English-দক্ষতার certificate upload করে।', 'verified', [NL_UVA_BACHELOR_APPLY]),
  english: txt(
    'An approved English-proficiency test certificate (TOEFL, IELTS or another UvA-accepted test) taken less than two years before the 1 September start date; the PPLE programme and the Liberal Arts and Sciences programme set their own, separate English requirements.',
    'একটি approved English-দক্ষতার test certificate (TOEFL, IELTS, বা UvA-র গ্রহণযোগ্য আরেকটি test) 1 September শুরুর তারিখের 2 বছরের কম আগে নেওয়া; PPLE programme আর Liberal Arts and Sciences programme নিজস্ব, আলাদা English শর্ত ঠিক করে।',
    'verified',
    [NL_UVA_BACHELOR_APPLY],
  ),
  documents: {
    required: [b('Secondary-school diploma considered equivalent to the Dutch VWO diploma', 'Dutch VWO diploma-র সমতুল্য বিবেচিত secondary-school diploma'), b('An approved English-proficiency test certificate', 'একটি approved English-দক্ষতার test certificate'), b('Studielink enrolment request', 'Studielink enrolment request')],
    mayBeRequired: [b('Mathematics test certificate for some programmes, uploaded after conditional admission', 'কিছু programme-এর জন্য Mathematics test certificate, conditional admission-এর পর upload')],
    status: 'verified',
    sources: [NL_UVA_BACHELOR_APPLY],
  },
  applicationFee: NOT_VERIFIED_FEE([NL_UVA_BACHELOR_APPLY]),
  scholarships: NOT_VERIFIED_FEE([NL_UVA_TUITION]),
  applicationRoute: txt('Register first in Studielink (the national Dutch portal), then complete UvA’s own online application system once invited.', 'প্রথমে Studielink-এ (জাতীয় Dutch portal) register করুন, তারপর invite পাওয়ার পর UvA-র নিজস্ব online application system সম্পূর্ণ করুন।', 'verified', [NL_UVA_BACHELOR_APPLY]),
  steps: {
    items: [
      { title: b('Check your diploma’s equivalence to Dutch VWO', 'আপনার diploma-র Dutch VWO-র সাথে সমতুল্যতা দেখুন'), body: b('UvA’s diploma finder lists accepted and non-accepted qualifications by country.', 'UvA-র diploma finder দেশ অনুযায়ী গ্রহণযোগ্য আর অ-গ্রহণযোগ্য যোগ্যতা তালিকাভুক্ত করে।') },
      { title: b('Register in Studielink', 'Studielink-এ register করুন'), body: b('You then receive an invitation to UvA’s own application system within about 48 hours.', 'তারপর প্রায় 48 ঘণ্টার মধ্যে UvA-র নিজস্ব application system-এ একটি invitation পাবেন।') },
      { title: b('Submit your English-proficiency certificate by 1 April (non-EU/EEA)', 'Non-EU/EEA-র জন্য 1 April-এর মধ্যে আপনার English-দক্ষতার certificate জমা দিন'), body: b('Certificates must be less than 2 years old on the 1 September start date.', '1 September শুরুর তারিখে certificate 2 বছরের কম পুরনো হতে হবে।') },
      VISA_STEP,
      { title: b('Pay tuition and enrol', 'Tuition দিয়ে enrol করুন'), body: b('Non-EU institutional fees are set per faculty on UvA’s own fee table.', 'Non-EU institutional fee UvA-র নিজের fee table-এ প্রতি faculty ঠিক।') },
    ],
    status: 'verified',
    sources: [NL_UVA_BACHELOR_APPLY, NL_UVA_TUITION],
  },
  programs: [],
  lastVerified: READ,
};

const TUDELFT: UniversityProfile = {
  id: 'nl-tudelft',
  countryCode: 'NL',
  name: 'Delft University of Technology',
  city: 'Delft',
  ownership: 'public',
  officialUrl: 'https://www.tudelft.nl/en',
  admissionsUrl: NL_TUDELFT_BSC_INTL_ADMISSION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '48', sourceUrl: NL_TUDELFT_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'The Netherlands’ leading technical university, founded in 1842, with eight faculties. Only four bachelor’s programmes are taught fully in English (Aerospace Engineering, Computer Science and Engineering, Nanobiology, Applied Earth Sciences); almost every master’s programme is taught in English.',
    '1842-এ প্রতিষ্ঠিত Netherlands-এর শীর্ষ technical university, আটটি faculty সহ। শুধু চারটি bachelor\'s programme সম্পূর্ণ ইংরেজিতে পড়ানো হয় (Aerospace Engineering, Computer Science and Engineering, Nanobiology, Applied Earth Sciences); প্রায় প্রতিটি master\'s programme ইংরেজিতে পড়ানো হয়।',
  ),
  tuition: {
    ...txt(
      'TU Delft’s 2026/2027 institutional (non-EU/EEA) rate is EUR 19,906 for a Bachelor’s and EUR 25,633 for a Master’s, rising to EUR 20,563/EUR 26,479 for 2027/2028; a transitional lower institutional rate (EUR 18,175 Bachelor’s) applies to some students already enrolled before 2026/2027. Students with a non-Dutch educational qualification registering for the first time may face extra costs on top of tuition.',
      'TU Delft-এর 2026/2027-এর institutional (non-EU/EEA) rate Bachelor\'s-এর জন্য EUR 19,906 আর Master\'s-এর জন্য EUR 25,633, 2027/2028-এর জন্য EUR 20,563/EUR 26,479-এ বাড়ছে; 2026/2027-এর আগে ভর্তি হওয়া কিছু student-এর জন্য একটি কম transitional institutional rate (EUR 18,175 Bachelor\'s) প্রযোজ্য। Non-Dutch educational qualification থাকা student যারা প্রথমবার register করছেন তাদের tuition-এর উপর অতিরিক্ত খরচ হতে পারে।',
      'verified',
      [NL_TUDELFT_TUITION],
    ),
    money: { amount: 19906, max: 25633, currency: 'EUR', period: 'year' },
  },
  deadlines: txt('Numerus fixus (capped) English-taught bachelor’s programmes close 15 January for a September start — strictly enforced. Other international-diploma bachelor’s applications and master’s applications generally close around 1 April (non-EU) per programme; always confirm per programme.', 'Numerus fixus (capped) ইংরেজি-মাধ্যম bachelor\'s programme September শুরুর জন্য 15 January-এ বন্ধ হয় — কঠোরভাবে প্রযোজ্য। অন্য international-diploma bachelor\'s application আর master\'s application সাধারণত প্রতি programme প্রায় 1 April (non-EU)-তে বন্ধ হয়; সবসময় প্রতি programme নিশ্চিত করুন।', 'partly-verified', [NL_TUDELFT_BSC_INTL_ADMISSION]),
  nextIntake: intake('confirmed', [NL_TUDELFT_BSC_INTL_ADMISSION], b('September', 'September')),
  admission: txt('Non-Dutch applicants follow the "BSc International" route: a secondary-school diploma considered equivalent to the Dutch VWO diploma (TU Delft publishes a country-by-country list of accepted/non-accepted diplomas), required final-exam subjects (Mathematics for all programmes; Physics for most), a CV in English, and proof of identity.', 'Non-Dutch আবেদনকারীরা "BSc International" route অনুসরণ করেন: Dutch VWO diploma-র সমতুল্য বিবেচিত একটি secondary-school diploma (TU Delft একটি country-by-country গ্রহণযোগ্য/অ-গ্রহণযোগ্য diploma তালিকা প্রকাশ করে), প্রয়োজনীয় final-exam subject (সব programme-এর জন্য Mathematics; অধিকাংশের জন্য Physics), ইংরেজিতে একটি CV, আর পরিচয়ের প্রমাণ।', 'verified', [NL_TUDELFT_BSC_INTL_ADMISSION]),
  english: txt(
    'For the English-taught bachelor’s programmes: TOEFL iBT 90, or IELTS Academic 6.5 overall, or Cambridge CAE/CPE, with the certificate issued within 2 years of application. For the Dutch-taught bachelor’s programmes, only TOEFL iBT 70/IELTS 5.5 is required for the English parts of the application. Nationals of the USA, UK, Ireland, Australia, New Zealand and Canada are exempt.',
    'ইংরেজি-মাধ্যম bachelor\'s programme-এর জন্য: TOEFL iBT 90, বা IELTS Academic 6.5 overall, বা Cambridge CAE/CPE, application-এর 2 বছরের মধ্যে ইস্যু করা certificate। Dutch-মাধ্যম bachelor\'s programme-এর জন্য, application-এর ইংরেজি অংশের জন্য শুধু TOEFL iBT 70/IELTS 5.5 লাগে। USA, UK, Ireland, Australia, New Zealand, আর Canada-র নাগরিকরা exempt।',
    'verified',
    [NL_TUDELFT_BSC_INTL_ADMISSION],
  ),
  documents: {
    required: [b('Certified copy of secondary-school diploma and grade list (+ translation if needed)', 'Secondary-school diploma আর grade list-এর certified copy (+ প্রয়োজনে translation)'), b('Proof of English-language proficiency (where required)', 'English-ভাষার দক্ষতার প্রমাণ (প্রয়োজনে)'), b('A CV written in English', 'ইংরেজিতে লেখা একটি CV'), b('Proof of identity (passport pages)', 'পরিচয়ের প্রমাণ (passport পাতা)')],
    mayBeRequired: [b('Copy of residence permit, if already living in the Netherlands', 'Netherlands-এ ইতিমধ্যে থাকলে residence permit-এর copy'), b('Numerus clausus programme-specific selection documents', 'Numerus clausus programme-specific selection document')],
    status: 'verified',
    sources: [NL_TUDELFT_BSC_INTL_ADMISSION],
  },
  applicationFee: NOT_VERIFIED_FEE([NL_TUDELFT_TUITION]),
  scholarships: NOT_VERIFIED_FEE([NL_TUDELFT_TUITION]),
  applicationRoute: txt('Register in Studielink, the national Dutch application portal, then complete TU Delft’s own MyTUDelft application system with the required documents.', 'Studielink-এ, জাতীয় Dutch application portal-এ, register করুন, তারপর প্রয়োজনীয় document দিয়ে TU Delft-এর নিজস্ব MyTUDelft application system সম্পূর্ণ করুন।', 'verified', [NL_TUDELFT_BSC_INTL_ADMISSION]),
  steps: {
    items: [
      { title: b('Check your diploma against TU Delft’s country list', 'TU Delft-এর country list-এর সাথে আপনার diploma মিলিয়ে দেখুন'), body: b('Confirm your diploma, and the required final-exam subjects, are accepted.', 'আপনার diploma, আর প্রয়োজনীয় final-exam subject, গ্রহণযোগ্য কিনা নিশ্চিত করুন।') },
      { title: b('Register in Studielink by the deadline', 'Deadline-এর মধ্যে Studielink-এ register করুন'), body: b('15 January for numerus fixus programmes; later deadlines for others.', 'Numerus fixus programme-এর জন্য 15 January; অন্যদের জন্য পরের deadline।') },
      { title: b('Upload your documents in MyTUDelft', 'MyTUDelft-এ আপনার document upload করুন'), body: b('Diploma, grade list, CV, proof of identity and English certificate (if required).', 'Diploma, grade list, CV, পরিচয়ের প্রমাণ, আর English certificate (প্রয়োজনে)।') },
      VISA_STEP,
      { title: b('Pay tuition and enrol', 'Tuition দিয়ে enrol করুন'), body: b('Institutional rates are published on TU Delft’s own tuition-fee page.', 'Institutional rate TU Delft-এর নিজের tuition-fee page-এ প্রকাশিত।') },
    ],
    status: 'verified',
    sources: [NL_TUDELFT_BSC_INTL_ADMISSION, NL_TUDELFT_TUITION],
  },
  programs: [],
  lastVerified: READ,
};

const UU: UniversityProfile = {
  id: 'nl-uu',
  countryCode: 'NL',
  name: 'Utrecht University',
  city: 'Utrecht',
  ownership: 'public',
  officialUrl: 'https://www.uu.nl/en',
  admissionsUrl: NL_UU_BACHELOR_APPLY_EXAMPLE.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=113', sourceUrl: NL_UU_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'One of the Netherlands’ largest and oldest research universities (founded 1636), organised into seven faculties. As a non-EU/EEA student you pay the institutional fee, which is set per bachelor’s/master’s programme rather than as one university-wide figure.',
    '1636-এ প্রতিষ্ঠিত, Netherlands-এর একটি বড় আর পুরনো research university, সাতটি faculty-তে organized। একজন non-EU/EEA student হিসেবে institutional fee দিতে হয়, যা university-wide একটি সংখ্যার বদলে প্রতি bachelor\'s/master\'s programme ঠিক হয়।',
  ),
  tuition: {
    ...txt(
      'Set per programme; Utrecht publishes separate institutional-fee PDFs for bachelor’s and master’s programmes rather than one figure. One published example: the MA International Relations in Historical Perspective lists a non-EU/EEA institutional fee of EUR 21,342 for 2026-2027 (one source shows EUR 22,000 for the same programme in a different year’s page, a discrepancy this guide notes rather than resolves).',
      'প্রতি programme অনুযায়ী ঠিক হয়; Utrecht একটি সংখ্যার বদলে bachelor\'s আর master\'s programme-এর জন্য আলাদা institutional-fee PDF প্রকাশ করে। একটি প্রকাশিত উদাহরণ: MA International Relations in Historical Perspective 2026-2027-এর জন্য একটি non-EU/EEA institutional fee EUR 21,342 তালিকাভুক্ত করে (একটি source একই programme-এর জন্য একটি আলাদা বছরের page-এ EUR 22,000 দেখায়, একটি অসঙ্গতি যা এই guide সমাধান না করে উল্লেখ করে)।',
      'partly-verified',
      [NL_UU_MASTER_TUITION],
      { period: '2026-2027' },
    ),
    money: { amount: 21342, currency: 'EUR', period: 'year' },
  },
  deadlines: txt('For the Economics and Business Economics bachelor’s (an example programme), the latest date Utrecht can receive and process a non-EU application is 1 April; deadlines differ by programme, so check the individual programme page.', 'Economics and Business Economics bachelor\'s-এর জন্য (একটি উদাহরণ programme), Utrecht একটি non-EU application পাওয়া আর process করতে পারার শেষ তারিখ 1 April; deadline programme অনুযায়ী আলাদা, তাই পৃথক programme page দেখুন।', 'partly-verified', [NL_UU_BACHELOR_APPLY_EXAMPLE]),
  nextIntake: intake('confirmed', [NL_UU_BACHELOR_APPLY_EXAMPLE], b('September', 'September')),
  admission: txt('Non-EU/EEA applicants without a Dutch degree generally pay the institutional fee and apply through Studielink plus Utrecht’s own programme-specific application process; exact entry requirements are set per programme.', 'Dutch degree না থাকা non-EU/EEA আবেদনকারীরা সাধারণত institutional fee দেন আর Studielink সঙ্গে Utrecht-এর নিজস্ব programme-specific application process দিয়ে আবেদন করেন; সঠিক ভর্তির শর্ত প্রতি programme ঠিক।', 'partly-verified', [NL_UU_BACHELOR_TUITION]),
  english: NOT_VERIFIED_FEE([NL_UU_BACHELOR_APPLY_EXAMPLE]),
  documents: {
    required: [b('Prior academic certificates/transcripts', 'আগের academic সনদ/transcript'), b('Studielink registration', 'Studielink registration')],
    mayBeRequired: [b('Programme-specific documents (motivation letter, English test) listed on the individual programme page', 'পৃথক programme page-এ তালিকাভুক্ত programme-specific document (motivation letter, English test)')],
    status: 'not-verified',
    sources: [NL_UU_BACHELOR_APPLY_EXAMPLE],
  },
  applicationFee: NOT_VERIFIED_FEE([NL_UU_BACHELOR_TUITION]),
  scholarships: NOT_VERIFIED_FEE([NL_UU_MASTER_TUITION]),
  applicationRoute: txt('Register in Studielink, then follow the specific programme’s own application and admission process.', 'Studielink-এ register করুন, তারপর নির্দিষ্ট programme-এর নিজস্ব application আর admission process অনুসরণ করুন।', 'partly-verified', [NL_UU_BACHELOR_APPLY_EXAMPLE]),
  steps: {
    items: [
      { title: b('Choose a bachelor’s or master’s programme', 'একটি bachelor\'s বা master\'s programme বাছুন'), body: b('Check whether you are eligible for the statutory fee or must pay the institutional fee.', 'Statutory fee-র জন্য যোগ্য কিনা বা institutional fee দিতে হবে কিনা দেখুন।') },
      { title: b('Register in Studielink by the programme deadline', 'Programme deadline-এর মধ্যে Studielink-এ register করুন'), body: b('Many non-EU bachelor’s deadlines fall around 1 April; check your programme.', 'অনেক non-EU bachelor\'s deadline প্রায় 1 April-এ পড়ে; আপনার programme দেখুন।') },
      VISA_STEP,
      { title: b('Pay the institutional fee and enrol', 'Institutional fee দিয়ে enrol করুন'), body: b('Fees are published per programme on Utrecht’s own fee pages.', 'Fee Utrecht-এর নিজের fee page-এ প্রতি programme প্রকাশিত।') },
    ],
    status: 'partly-verified',
    sources: [NL_UU_BACHELOR_APPLY_EXAMPLE, NL_UU_MASTER_TUITION],
  },
  programs: [],
  lastVerified: READ,
};

const LEIDEN: UniversityProfile = {
  id: 'nl-leiden',
  countryCode: 'NL',
  name: 'Leiden University',
  city: 'Leiden',
  ownership: 'public',
  officialUrl: 'https://www.universiteitleiden.nl/en',
  admissionsUrl: NL_LEIDEN_BACHELOR_APPLY.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=119', sourceUrl: NL_LEIDEN_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'The Netherlands’ oldest university (founded 1575), with seven faculties including Archaeology, Humanities, Governance and Global Affairs, Law, Social Sciences, Science, and Medicine (LUMC).',
    '1575-এ প্রতিষ্ঠিত Netherlands-এর সবচেয়ে পুরনো university, সাতটি faculty সহ, যার মধ্যে Archaeology, Humanities, Governance and Global Affairs, Law, Social Sciences, Science, আর Medicine (LUMC)।',
  ),
  tuition: {
    ...txt(
      'Leiden’s 2027-2028 institutional (non-EU/EEA/Swiss/Surinamese) rate for most bachelor’s faculties is EUR 22,900 a year (Science: EUR 23,300); some published master’s institutional fees for 2027-2028 range from EUR 17,800–17,900 (most faculties) up to EUR 28,200 (Medicine/LUMC programmes). Several Advanced LL.M. programmes list a non-government-subsidised fee of EUR 22,900.',
      'Leiden-এর 2027-2028-এর institutional (non-EU/EEA/Swiss/Surinamese) rate অধিকাংশ bachelor\'s faculty-র জন্য বছরে EUR 22,900 (Science: EUR 23,300); 2027-2028-এর জন্য কিছু প্রকাশিত master\'s institutional fee EUR 17,800–17,900 (অধিকাংশ faculty) থেকে EUR 28,200 (Medicine/LUMC programme) পর্যন্ত। কয়েকটি Advanced LL.M. programme একটি non-government-subsidised fee EUR 22,900 তালিকাভুক্ত করে।',
      'verified',
      [NL_LEIDEN_BACHELOR_TUITION, NL_LEIDEN_MASTER_TUITION],
    ),
    money: { amount: 17800, max: 28200, currency: 'EUR', period: 'year' },
  },
  deadlines: txt('Bachelor’s: the general application deadline is 15 January (Leiden University College: 15 March, early bird 1 December). Master’s: 1 April if you need a student visa/residence permit for a September start (15 October for a February start); later dates apply if you do not need a visa.', 'Bachelor\'s: সাধারণ application deadline 15 January (Leiden University College: 15 March, early bird 1 December)। Master\'s: September শুরুর জন্য একটি student visa/residence permit লাগলে 1 April (February শুরুর জন্য 15 October); visa না লাগলে পরের তারিখ প্রযোজ্য।', 'verified', [NL_LEIDEN_BACHELOR_DEADLINES, NL_LEIDEN_MASTER_DEADLINES]),
  nextIntake: intake('confirmed', [NL_LEIDEN_MASTER_DEADLINES], b('September or February (varies by programme)', 'September বা February (programme অনুযায়ী আলাদা)')),
  admission: txt('Register first in Studielink; a day later you receive log-in details for Leiden’s own application system (uSis), where you complete and submit your application before the stated deadline.', 'প্রথমে Studielink-এ register করুন; একদিন পর Leiden-এর নিজস্ব application system (uSis)-এর log-in details পাবেন, যেখানে উল্লেখিত deadline-এর আগে আপনার application সম্পূর্ণ করে জমা দেন।', 'verified', [NL_LEIDEN_BACHELOR_APPLY]),
  english: NOT_VERIFIED_FEE([NL_LEIDEN_BACHELOR_APPLY]),
  documents: {
    required: [b('Studielink registration', 'Studielink registration'), b('uSis application (Leiden’s own portal)', 'uSis application (Leiden-এর নিজস্ব portal)')],
    mayBeRequired: [b('Programme-specific documents listed on the individual programme page', 'পৃথক programme page-এ তালিকাভুক্ত programme-specific document')],
    status: 'partly-verified',
    sources: [NL_LEIDEN_BACHELOR_APPLY],
  },
  applicationFee: txt('EUR 100, non-refundable, for degree programmes at Leiden University; some applicants are exempted based on their nationality or prior qualification.', 'Leiden University-র degree programme-এর জন্য EUR 100, non-refundable; জাতীয়তা বা আগের যোগ্যতার ভিত্তিতে কিছু আবেদনকারী exempt।', 'verified', [NL_LEIDEN_BACHELOR_APPLY]),
  scholarships: NOT_VERIFIED_FEE([NL_LEIDEN_MASTER_TUITION]),
  applicationRoute: txt('Register in Studielink, then complete and submit your application in Leiden’s own uSis system.', 'Studielink-এ register করুন, তারপর Leiden-এর নিজস্ব uSis system-এ আপনার application সম্পূর্ণ করে জমা দিন।', 'verified', [NL_LEIDEN_BACHELOR_APPLY]),
  steps: {
    items: [
      { title: b('Register in Studielink', 'Studielink-এ register করুন'), body: b('Studielink opens for bachelor’s applications from 1 October.', 'Bachelor\'s application-এর জন্য Studielink 1 October থেকে খোলে।') },
      { title: b('Activate and complete your uSis application', 'আপনার uSis application activate আর সম্পূর্ণ করুন'), body: b('Submit before the deadline — 15 January for most bachelor’s programmes.', 'Deadline-এর আগে জমা দিন — অধিকাংশ bachelor\'s programme-এর জন্য 15 January।') },
      { title: b('Pay the EUR 100 application fee (if applicable)', 'EUR 100 application fee দিন (প্রযোজ্য হলে)'), body: b('Some nationalities or prior qualifications are exempted.', 'কিছু জাতীয়তা বা আগের যোগ্যতা exempt।') },
      VISA_STEP,
      { title: b('Pay tuition and enrol', 'Tuition দিয়ে enrol করুন'), body: b('Institutional rates are set per faculty on Leiden’s own fee pages.', 'Institutional rate Leiden-এর নিজের fee page-এ প্রতি faculty ঠিক।') },
    ],
    status: 'verified',
    sources: [NL_LEIDEN_BACHELOR_APPLY, NL_LEIDEN_BACHELOR_DEADLINES],
  },
  programs: [],
  lastVerified: READ,
};

const IBEB: ProgramProfile = {
  id: 'nl-eur-ibeb',
  title: 'International Bachelor Economics and Business Economics',
  level: 'bachelors',
  faculty: 'Erasmus School of Economics',
  languages: b('Entirely in English', 'সম্পূর্ণ ইংরেজিতে'),
  englishOnly: true,
  tuition: NOT_VERIFIED_FEE([NL_EUR_IBEB_APPLY]),
  deadline: txt('Early application deadline: 15 January 2027, 23:59 CET. Registering in Studielink alone is not a valid application — the full application and the handling-fee payment must also be submitted in the EUR Admission Portal by that deadline.', 'Early application deadline: 15 January 2027, 23:59 CET। শুধু Studielink-এ register করা একটি valid application না — সেই deadline-এর মধ্যে সম্পূর্ণ application আর handling-fee payment EUR Admission Portal-এও জমা দিতে হবে।', 'verified', [NL_EUR_IBEB_APPLY]),
  nextIntake: intake('confirmed', [NL_EUR_IBEB_APPLY], b('September', 'September')),
  requirements: txt('Applicants must register in Studielink and separately submit a full application with the handling fee in the EUR Admission Portal before the early deadline.', 'আবেদনকারীদের Studielink-এ register করতে হয় আর আলাদাভাবে early deadline-এর আগে EUR Admission Portal-এ handling fee-সহ একটি সম্পূর্ণ application জমা দিতে হয়।', 'verified', [NL_EUR_IBEB_APPLY]),
  english: NOT_VERIFIED_FEE([NL_EUR_IBEB_APPLY]),
  applyVia: b('Studielink plus Erasmus University Rotterdam’s own Admission Portal', 'Studielink সঙ্গে Erasmus University Rotterdam-এর নিজস্ব Admission Portal'),
  url: 'https://www.eur.nl/en/bachelor/international-bachelor-economics-and-business-economics/application',
  sources: [NL_EUR_IBEB_APPLY],
  lastVerified: READ,
};

const EUR: UniversityProfile = {
  id: 'nl-eur',
  countryCode: 'NL',
  name: 'Erasmus University Rotterdam',
  city: 'Rotterdam',
  ownership: 'public',
  officialUrl: 'https://www.eur.nl/en',
  admissionsUrl: NL_EUR_IBEB_APPLY.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '148', sourceUrl: NL_EUR_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A public research university in Rotterdam known especially for Rotterdam School of Management (RSM), economics, law and the Erasmus Medical Center (Erasmus MC). Non-EEA tuition varies sharply by school — much higher at Erasmus MC than at most other faculties.',
    'Rotterdam-এ একটি public research university, বিশেষভাবে Rotterdam School of Management (RSM), economics, law, আর Erasmus Medical Center (Erasmus MC)-এর জন্য পরিচিত। Non-EEA tuition school অনুযায়ী অনেক আলাদা — অধিকাংশ অন্য faculty-র চেয়ে Erasmus MC-তে অনেক বেশি।',
  ),
  tuition: {
    ...txt(
      'Set per faculty. EUR’s own 2026-2027 fee page lists deviating non-EEA rates of EUR 14,000 (RSM, one rate) and EUR 25,800 (RSM, another rate) and EUR 32,200 (Erasmus Medical Center) rising to EUR 34,100 for a different Erasmus MC rate; the 2027-2028 page shows EUR 15,200/EUR 28,000 (RSM) and EUR 35,000/EUR 37,000 (Erasmus MC). The university’s fee pages label these as "deviating rates" without mapping each one plainly to a specific programme, so the exact programme behind each figure needs checking directly on EUR’s own pages.',
      'প্রতি faculty অনুযায়ী ঠিক হয়। EUR-এর নিজের 2026-2027 fee page deviating non-EEA rate EUR 14,000 (RSM, একটি rate) আর EUR 25,800 (RSM, আরেকটি rate) আর EUR 32,200 (Erasmus Medical Center) তালিকাভুক্ত করে যা একটি আলাদা Erasmus MC rate-এর জন্য EUR 34,100-এ বাড়ছে; 2027-2028 page EUR 15,200/EUR 28,000 (RSM) আর EUR 35,000/EUR 37,000 (Erasmus MC) দেখায়। University-র fee page এগুলোকে "deviating rates" বলে লেবেল করে স্পষ্টভাবে প্রতিটিকে একটি নির্দিষ্ট programme-এর সাথে না মিলিয়ে, তাই প্রতিটি সংখ্যার পেছনের ঠিক programme EUR-এর নিজের page-এ সরাসরি চেক করা দরকার।',
      'partly-verified',
      [NL_EUR_TUITION],
      { period: '2026-2027' },
    ),
    money: { amount: 14000, max: 34100, currency: 'EUR', period: 'year' },
  },
  deadlines: txt('The International Bachelor Economics and Business Economics programme’s own early deadline is 15 January 2027, 23:59 CET; other programmes set their own dates — always check the specific programme page.', 'International Bachelor Economics and Business Economics programme-এর নিজের early deadline 15 January 2027, 23:59 CET; অন্য programme নিজস্ব তারিখ ঠিক করে — সবসময় নির্দিষ্ট programme page দেখুন।', 'partly-verified', [NL_EUR_IBEB_APPLY]),
  nextIntake: intake('confirmed', [NL_EUR_IBEB_APPLY], b('September', 'September')),
  admission: txt('Registration in Studielink is only the first step; the full application and handling-fee payment must also be submitted in EUR’s own Admission Portal before the deadline.', 'Studielink-এ registration শুধু প্রথম পদক্ষেপ; deadline-এর আগে EUR-এর নিজস্ব Admission Portal-এও সম্পূর্ণ application আর handling-fee payment জমা দিতে হয়।', 'verified', [NL_EUR_IBEB_APPLY]),
  english: NOT_VERIFIED_FEE([NL_EUR_IBEB_APPLY]),
  documents: {
    required: [b('Studielink registration', 'Studielink registration'), b('Full application submitted in EUR’s Admission Portal', 'EUR-এর Admission Portal-এ জমা দেওয়া সম্পূর্ণ application'), b('Non-refundable application fee for non-Dutch-diploma applicants', 'Non-Dutch-diploma আবেদনকারীদের জন্য non-refundable application fee')],
    mayBeRequired: [b('Programme-specific documents listed on the individual programme page', 'পৃথক programme page-এ তালিকাভুক্ত programme-specific document')],
    status: 'verified',
    sources: [NL_EUR_IBEB_APPLY, NL_EUR_APPLICATION_FEE],
  },
  applicationFee: txt('EUR 100, non-refundable, required from all applicants to a bachelor’s programme with a non-Dutch diploma.', 'Non-Dutch diploma থাকা bachelor\'s programme-এর সব আবেদনকারীর জন্য EUR 100, non-refundable।', 'verified', [NL_EUR_APPLICATION_FEE]),
  scholarships: NOT_VERIFIED_FEE([NL_EUR_TUITION]),
  applicationRoute: txt('Studielink plus Erasmus University Rotterdam’s own Admission Portal (where the full application and handling fee are submitted).', 'Studielink সঙ্গে Erasmus University Rotterdam-এর নিজস্ব Admission Portal (যেখানে সম্পূর্ণ application আর handling fee জমা দেওয়া হয়)।', 'verified', [NL_EUR_IBEB_APPLY]),
  steps: {
    items: [
      { title: b('Register in Studielink', 'Studielink-এ register করুন'), body: b('This alone is not a complete application.', 'শুধু এটা একটি সম্পূর্ণ application না।') },
      { title: b('Submit the full application and handling fee in EUR’s Admission Portal', 'EUR-এর Admission Portal-এ সম্পূর্ণ application আর handling fee জমা দিন'), body: b('By the programme’s own deadline, e.g. 15 January for the International Bachelor Economics and Business Economics.', 'Programme-এর নিজের deadline-এর মধ্যে, যেমন International Bachelor Economics and Business Economics-এর জন্য 15 January।') },
      VISA_STEP,
      { title: b('Pay tuition and enrol', 'Tuition দিয়ে enrol করুন'), body: b('Non-EEA rates are set per faculty on EUR’s own fee pages.', 'Non-EEA rate EUR-এর নিজের fee page-এ প্রতি faculty ঠিক।') },
    ],
    status: 'verified',
    sources: [NL_EUR_IBEB_APPLY, NL_EUR_TUITION],
  },
  programs: [IBEB],
  lastVerified: READ,
};

export const NL_UNI_LAYER: CountryUniversityLayer = {
  code: 'NL',
  universities: [EUR, LEIDEN, TUDELFT, UU, UVA],
  visaStats: [],
  unverified: [
    {
      id: 'nl-bd-visa-approval-rate',
      label: b('Bangladesh-specific MVV/residence-permit approval or refusal rate', 'বাংলাদেশ-নির্দিষ্ট MVV/residence-permit অনুমোদন বা প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific approval-rate figure, or a verified country-wide international-student headcount broken down by nationality from an official Dutch source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'nl-phd-residence-route',
      label: b('Whether employed PhD candidates use the study residence-permit route or an employee/researcher route', 'কর্মসংস্থান-ভিত্তিক PhD candidate-রা study residence-permit route নাকি একটি employee/researcher route ব্যবহার করে'),
      status: 'not-verified',
      note: 'IND pages distinguish a residence permit for "researcher" (Directive (EU) 2016/801) from the student residence permit, but which route applies to a specific PhD position at a specific Dutch university was not confirmed on an official page read for this guide.',
    },
  ],
  lastVerified: READ,
};

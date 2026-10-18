import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, ProgramProfile, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import {
  PL_AGH_DOCS_BACHELOR,
  PL_AGH_FEES,
  PL_AGH_QS,
  PL_AMU_QA,
  PL_AMU_QS,
  PL_AMU_TUITION,
  PL_MFA_INDIA_D_VISA,
  PL_READ,
  PL_UJ_FEES,
  PL_UJ_ISAD_FEES,
  PL_UJ_QS,
  PL_UW_FEES,
  PL_UW_FEES_2026,
  PL_UW_QS,
  PL_WUT_ADMISSION_BSC,
  PL_WUT_BSC_OFFER,
  PL_WUT_ENGLISH,
  PL_WUT_HOW_TO_APPLY,
  PL_WUT_MSC_OFFER,
  PL_WUT_QS,
} from './pl-sources';

/**
 * Poland: university → program layer, built the same way as Malaysia's,
 * Spain's and the other European layers (lib/content/my-unis.ts,
 * es-unis.ts) and the KR/DE pattern. Rankings are QS World University
 * Rankings 2027 as printed on each institution's topuniversities.com
 * profile. Anything that could not be verified on an official page is left
 * marked not-verified — never guessed.
 */

const READ = PL_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the institution’s official admissions page.', 'যাচাই হয়নি — institution-এর official admissions page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Apply for Poland’s national ("D"-type) visa, then a temporary residence permit', 'Poland-এর national ("D"-type) visa-র জন্য আবেদন করুন, তারপর একটি temporary residence permit'),
  body: b('Before travelling, apply at the Embassy of the Republic of Poland in New Delhi (Poland’s mission of record for Bangladesh) through e-Konsulat and a separate VFS Global eform. After arrival, apply for a temporary residence permit at the local Voivodeship Office before your visa expires. See the Poland visa section on the country page.', 'যাওয়ার আগে, Embassy of the Republic of Poland in New Delhi-এ (Bangladesh-এর জন্য Poland-এর mission of record) e-Konsulat আর একটি আলাদা VFS Global eform-এর মাধ্যমে আবেদন করুন। পৌঁছানোর পর, visa-র মেয়াদ শেষ হওয়ার আগে স্থানীয় Voivodeship Office-এ temporary residence permit-এর জন্য আবেদন করুন। Country page-এর Poland visa section দেখুন।'),
};

// ------------------------------------------------------------------ universities

const UW: UniversityProfile = {
  id: 'pl-uw',
  countryCode: 'PL',
  name: 'University of Warsaw',
  city: 'Warsaw',
  ownership: 'public',
  officialUrl: 'https://www.uw.edu.pl/',
  admissionsUrl: PL_UW_FEES.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=289', sourceUrl: PL_UW_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Poland’s highest-ranked university in the QS World University Rankings 2027, based in Warsaw, offering a range of English-taught Bachelor’s and Master’s programmes recruited through its own Internet Recruitment of Candidates (IRK) system.',
    'QS World University Rankings 2027-এ Poland-এর সর্বোচ্চ rank পাওয়া university, Warsaw-তে, এর নিজস্ব Internet Recruitment of Candidates (IRK) system-এর মাধ্যমে recruit করা বিভিন্ন English-taught Bachelor\'s আর Master\'s programme প্রদান করে।',
  ),
  tuition: {
    ...txt(
      'UW’s own tuition-fees document for the 2026/2027 academic year sets fees per programme, not a single nationwide figure — e.g. Global Management at 2,500 EUR per semester, International Relations at 4,300 EUR per year, Finance, International Investment and Accounting at 4,200 EUR per year, and some programmes (e.g. certain Oriental Studies tracks) free of charge.',
      'UW-এর নিজের 2026/2027 শিক্ষাবর্ষের tuition-fees document প্রতি programme অনুযায়ী fee ঠিক করে, একক জাতীয় সংখ্যা না — যেমন Global Management প্রতি সেমিস্টারে 2,500 EUR, International Relations প্রতি বছরে 4,300 EUR, Finance, International Investment and Accounting প্রতি বছরে 4,200 EUR, আর কিছু programme (যেমন কিছু Oriental Studies track) বিনামূল্যে।',
      'verified',
      [PL_UW_FEES_2026],
    ),
    money: { amount: 2500, max: 4300, currency: 'EUR', period: 'year' },
  },
  deadlines: NOT_VERIFIED_FEE([PL_UW_FEES]),
  nextIntake: intake('not-published', [PL_UW_FEES]),
  admission: txt('UW’s own admissions office page describes an application fee of 85 PLN (100 PLN if an entrance exam, oral exam or qualification interview is required), paid through an individually generated bank account number inside the IRK recruitment system.', 'UW-এর নিজের admissions office page একটি application fee বর্ণনা করে 85 PLN (entrance exam, oral exam, বা qualification interview লাগলে 100 PLN), IRK recruitment system-এর ভিতরে individually generated bank account number দিয়ে পরিশোধযোগ্য।', 'verified', [PL_UW_FEES]),
  english: NOT_VERIFIED_FEE([PL_UW_FEES]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [PL_UW_FEES] },
  applicationFee: txt('85 PLN per field of study (100 PLN if the candidate must sit a written exam, oral exam or qualification interview), per UW’s own admissions page.', 'প্রতি field of study-র জন্য 85 PLN (candidate-কে written exam, oral exam, বা qualification interview দিতে হলে 100 PLN), UW-এর নিজের admissions page অনুযায়ী।', 'verified', [PL_UW_FEES]),
  scholarships: txt('No UW-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide; NAWA scholarship holders are separately exempted from certain fees where applicable.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য UW-specific একটি full-degree scholarship পাওয়া যায়নি; প্রযোজ্য ক্ষেত্রে NAWA scholarship holder-রা আলাদাভাবে কিছু fee থেকে exempt।', 'not-verified', [PL_UW_FEES]),
  applicationRoute: txt('Online via UW’s own Internet Recruitment of Candidates (IRK) system.', 'UW-এর নিজস্ব Internet Recruitment of Candidates (IRK) system-এর মাধ্যমে online।', 'verified', [PL_UW_FEES]),
  steps: {
    items: [
      { title: b('Register in the IRK system and choose your field of study', 'IRK system-এ register করুন আর আপনার field of study বাছুন'), body: b('Each candidate gets an individual bank account number for the application fee.', 'প্রতিটি candidate application fee-র জন্য একটি individual bank account number পায়।') },
      { title: b('Pay the 85–100 PLN application fee', '85–100 PLN application fee পরিশোধ করুন'), body: b('Payment must be credited to UW’s account by the deadline shown in your IRK account.', 'আপনার IRK account-এ দেখানো deadline-এর মধ্যে payment UW-এর account-এ credit হতে হবে।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [PL_UW_FEES],
  },
  programs: [],
  lastVerified: READ,
};

const UJ: UniversityProfile = {
  id: 'pl-uj',
  countryCode: 'PL',
  name: 'Jagiellonian University',
  city: 'Kraków',
  ownership: 'public',
  officialUrl: 'https://en.uj.edu.pl/',
  admissionsUrl: PL_UJ_FEES.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=329', sourceUrl: PL_UJ_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Poland’s second-highest-ranked university in the QS World University Rankings 2027, based in Kraków, offering foreign-language Bachelor’s, Master’s and long-cycle Master’s programmes for which tuition fees generally apply to non-Polish citizens.',
    'QS World University Rankings 2027-এ Poland-এর দ্বিতীয়-সর্বোচ্চ rank পাওয়া university, Kraków-তে, foreign-language Bachelor\'s, Master\'s, আর long-cycle Master\'s programme প্রদান করে যার জন্য সাধারণত non-Polish নাগরিকদের tuition fee দিতে হয়।',
  ),
  tuition: {
    ...txt(
      'UJ’s own fees page states foreigners undertaking first-cycle, second-cycle and long-cycle Master’s studies are required to pay tuition fees, with the amount set per programme in the Rector’s own ordinance; a specific example, the International Studies in Architecture and Design (ISAD) programme, charges 4,500 EUR per year (9,000 EUR for the full two-year programme).',
      'UJ-এর নিজের fees page বলে first-cycle, second-cycle আর long-cycle Master\'s studies করা বিদেশিদের tuition fee দিতে হয়, পরিমাণ Rector-এর নিজের ordinance-এ প্রতি programme অনুযায়ী ঠিক হয়; একটি নির্দিষ্ট উদাহরণ, International Studies in Architecture and Design (ISAD) programme, প্রতি বছরে 4,500 EUR নেয় (সম্পূর্ণ দুই-বছরের programme-এর জন্য 9,000 EUR)।',
      'verified',
      [PL_UJ_ISAD_FEES],
    ),
    money: { amount: 4500, currency: 'EUR', period: 'year' },
  },
  deadlines: NOT_VERIFIED_FEE([PL_UJ_FEES]),
  nextIntake: intake('not-published', [PL_UJ_FEES]),
  admission: txt('UJ’s own fees page lists exemptions from tuition for full-time Polish-language studies (EU/EEA/Swiss citizens, Pole’s Card holders, certain residence-permit categories, and NAWA scholarship holders); none of those exemptions apply to full-time studies taught in a foreign language, except for NAWA scholarship holders.', 'UJ-এর নিজের fees page full-time Polish-ভাষার studies-এর জন্য tuition থেকে exemption তালিকাভুক্ত করে (EU/EEA/Swiss নাগরিক, Pole\'s Card holder, নির্দিষ্ট residence-permit category, আর NAWA scholarship holder); NAWA scholarship holder ছাড়া এর কোনো exemption foreign-language-এ পড়ানো full-time studies-এ প্রযোজ্য না।', 'verified', [PL_UJ_FEES]),
  english: NOT_VERIFIED_FEE([PL_UJ_FEES]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [PL_UJ_FEES] },
  applicationFee: txt('100 PLN per application, paid by bank transfer or the Przelewy24 quick-payment system, per UJ’s own fees page.', 'UJ-এর নিজের fees page অনুযায়ী, bank transfer বা Przelewy24 quick-payment system দিয়ে প্রতি application-এর জন্য 100 PLN।', 'verified', [PL_UJ_FEES]),
  scholarships: txt('UJ’s own fees page confirms NAWA scholarship holders are exempted from tuition fees under the terms of the NAWA/Minister decision; no UJ-specific scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'UJ-এর নিজের fees page নিশ্চিত করে NAWA scholarship holder-রা NAWA/Minister decision-এর শর্তে tuition fee থেকে exempt; এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য UJ-specific কোনো scholarship পাওয়া যায়নি।', 'partly-verified', [PL_UJ_FEES]),
  applicationRoute: txt('Online via UJ’s own IRK (Internet Rekrutacja Kandydatów) system.', 'UJ-এর নিজস্ব IRK (Internet Rekrutacja Kandydatów) system-এর মাধ্যমে online।', 'verified', [PL_UJ_FEES]),
  steps: {
    items: [
      { title: b('Apply online via UJ’s own IRK system', 'UJ-এর নিজস্ব IRK system-এর মাধ্যমে অনলাইনে আবেদন করুন'), body: b('Pay the 100 PLN application fee before the deadline shown in your IRK account.', 'আপনার IRK account-এ দেখানো deadline-এর আগে 100 PLN application fee পরিশোধ করুন।') },
      { title: b('Sign the fee declaration at enrolment', 'ভর্তির সময় fee declaration সাইন করুন'), body: b('All candidates confirm they accept the terms for paying tuition and other fees.', 'সব candidate tuition আর অন্য fee পরিশোধের শর্ত মানার কথা নিশ্চিত করেন।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [PL_UJ_FEES],
  },
  programs: [],
  lastVerified: READ,
};

const WUT_CS_MSC: ProgramProfile = {
  id: 'pl-wut-msc-computer-science',
  title: 'Computer Science (M.Sc.)',
  level: 'masters' as const,
  faculty: 'Electronics and Information Technology',
  languages: b('English', 'ইংরেজি'),
  englishOnly: true,
  duration: b('4 semesters', '4 সেমিস্টার'),
  tuition: {
    ...txt('EUR 6,450 for non-EU students, per Warsaw University of Technology’s own M.Sc. offer page.', 'Warsaw University of Technology-র নিজের M.Sc. offer page অনুযায়ী, non-EU student-দের জন্য EUR 6,450।', 'verified', [PL_WUT_MSC_OFFER]),
    money: { amount: 6450, currency: 'EUR', period: 'program' },
  },
  deadline: NOT_VERIFIED_FEE([PL_WUT_MSC_OFFER]),
  nextIntake: intake('confirmed', [PL_WUT_MSC_OFFER], b('October and February intakes', 'October আর February intake')),
  requirements: txt('WUT’s own How to Apply page lists a Bachelor’s degree, transcript of records and proof of English proficiency among the required documents for M.Sc. admission.', 'WUT-এর নিজের How to Apply page M.Sc. ভর্তির জন্য প্রয়োজনীয় document-এর মধ্যে একটি Bachelor\'s degree, transcript of records, আর English proficiency-র proof তালিকাভুক্ত করে।', 'verified', [PL_WUT_HOW_TO_APPLY]),
  english: txt('WUT’s own English Proficiency glossary sets a B2 minimum, accepting IELTS Academic (minimum 6 points) among other certificates.', 'WUT-এর নিজের English Proficiency glossary একটি B2 ন্যূনতম ঠিক করে, অন্য certificate-এর মধ্যে IELTS Academic (ন্যূনতম 6 points) গ্রহণ করে।', 'verified', [PL_WUT_ENGLISH]),
  applyVia: b('Warsaw University of Technology’s own International Students Office application system', 'Warsaw University of Technology-র নিজস্ব International Students Office application system'),
  url: 'https://www.students.pw.edu.pl/Studies-Offer/M.Sc.-offer',
  sources: [PL_WUT_MSC_OFFER, PL_WUT_ENGLISH],
  lastVerified: READ,
};

const WUT: UniversityProfile = {
  id: 'pl-wut',
  countryCode: 'PL',
  name: 'Warsaw University of Technology',
  city: 'Warsaw',
  ownership: 'public',
  officialUrl: 'https://www.pw.edu.pl/',
  admissionsUrl: PL_WUT_HOW_TO_APPLY.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=504', sourceUrl: PL_WUT_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A public, engineering-focused university in Warsaw, with a dedicated International Students Office publishing its own non-EU tuition fees per programme for both Bachelor’s and Master’s study.',
    'Warsaw-তে একটি public, engineering-focused university, একটি নিবেদিত International Students Office যা Bachelor\'s আর Master\'s study দুটোর জন্যই প্রতি programme অনুযায়ী নিজস্ব non-EU tuition fee প্রকাশ করে।',
  ),
  tuition: {
    ...txt(
      'WUT’s own B.Sc. offer page lists non-EU tuition per programme, from EUR 2,340/year (Power Engineering) to EUR 6,830 for the whole 8-semester programme (Architecture); its own M.Sc. offer page lists non-EU tuition from EUR 1,800/year (e.g. Geodesy and Cartography) to EUR 7,090/year (Architecture).',
      'WUT-এর নিজের B.Sc. offer page প্রতি programme অনুযায়ী non-EU tuition তালিকাভুক্ত করে, বছরে EUR 2,340 (Power Engineering) থেকে পুরো 8-সেমিস্টার programme-এর জন্য EUR 6,830 (Architecture) পর্যন্ত; এর নিজের M.Sc. offer page non-EU tuition বছরে EUR 1,800 (যেমন Geodesy and Cartography) থেকে বছরে EUR 7,090 (Architecture) পর্যন্ত তালিকাভুক্ত করে।',
      'verified',
      [PL_WUT_BSC_OFFER, PL_WUT_MSC_OFFER],
    ),
    money: { amount: 1800, max: 7090, currency: 'EUR', period: 'year' },
  },
  deadlines: txt('WUT’s own How to Apply page states these application procedures apply only to international candidates who do not hold Polish citizenship, but a full programme-by-programme deadline table was not itemized on the pages read for this guide.', 'WUT-এর নিজের How to Apply page বলে এই application procedure শুধুমাত্র Polish নাগরিকত্ব না থাকা international candidate-দের জন্য প্রযোজ্য, কিন্তু এই guide-এর জন্য পড়া page-এ একটি সম্পূর্ণ programme-by-programme deadline table তালিকাভুক্ত হয়নি।', 'partly-verified', [PL_WUT_HOW_TO_APPLY]),
  nextIntake: intake('confirmed', [PL_WUT_BSC_OFFER], b('Mostly October, with some programmes also admitting in February', 'অধিকাংশ October, কিছু programme February-তেও ভর্তি করে')),
  admission: txt('WUT’s own Admission to B.Sc. page lists a high-school leaving certificate, transcript of records, proof of payment of the PLN 85 application fee, and a photograph as the required documents for Bachelor’s admission.', 'WUT-এর নিজের Admission to B.Sc. page Bachelor\'s ভর্তির জন্য প্রয়োজনীয় document হিসেবে একটি high-school leaving certificate, transcript of records, PLN 85 application fee পরিশোধের proof, আর একটি ছবি তালিকাভুক্ত করে।', 'verified', [PL_WUT_ADMISSION_BSC]),
  english: txt('WUT’s own English Proficiency glossary sets a general B2 minimum, accepting IELTS Academic (minimum 6 points), TOEFL and TOEIC among other certificates.', 'WUT-এর নিজের English Proficiency glossary একটি সাধারণ B2 ন্যূনতম ঠিক করে, অন্য certificate-এর মধ্যে IELTS Academic (ন্যূনতম 6 points), TOEFL, আর TOEIC গ্রহণ করে।', 'verified', [PL_WUT_ENGLISH]),
  documents: {
    required: [
      b('High school leaving certificate', 'High school leaving certificate'),
      b('Transcript of records', 'Transcript of records'),
      b('Proof of payment of the PLN 85 application fee', 'PLN 85 application fee পরিশোধের proof'),
      b('One photograph', 'একটি ছবি'),
    ],
    mayBeRequired: [b('Proof of English proficiency (IELTS, TOEFL, TOEIC or equivalent, if the programme requires it)', 'English proficiency-র proof (IELTS, TOEFL, TOEIC, বা সমতুল্য, programme প্রয়োজন করলে)')],
    status: 'verified',
    sources: [PL_WUT_ADMISSION_BSC],
  },
  applicationFee: txt('PLN 85, per WUT’s own Admission to B.Sc. page.', 'WUT-এর নিজের Admission to B.Sc. page অনুযায়ী, PLN 85।', 'verified', [PL_WUT_ADMISSION_BSC]),
  scholarships: txt('No WUT-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য WUT-specific একটি full-degree scholarship পাওয়া যায়নি।', 'not-verified', [PL_WUT_HOW_TO_APPLY]),
  applicationRoute: txt('Online via WUT’s own International Students Office application procedure, described step by step on its own How to Apply page.', 'WUT-এর নিজের International Students Office application procedure-এর মাধ্যমে online, এর নিজের How to Apply page-এ step by step বর্ণিত।', 'verified', [PL_WUT_HOW_TO_APPLY]),
  steps: {
    items: [
      { title: b('Check your programme’s own non-EU tuition fee', 'আপনার programme-এর নিজের non-EU tuition fee দেখুন'), body: b('WUT publishes these per programme on its own B.Sc. and M.Sc. offer pages.', 'WUT এগুলো নিজের B.Sc. আর M.Sc. offer page-এ প্রতি programme অনুযায়ী প্রকাশ করে।') },
      { title: b('Submit documents and pay the PLN 85 application fee', 'Documents জমা দিন আর PLN 85 application fee পরিশোধ করুন'), body: b('Only international candidates without Polish citizenship follow this procedure, per WUT’s own page.', 'WUT-এর নিজের page অনুযায়ী, শুধু Polish নাগরিকত্ব না থাকা international candidate-রা এই procedure অনুসরণ করেন।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [PL_WUT_ADMISSION_BSC, PL_WUT_HOW_TO_APPLY],
  },
  programs: [WUT_CS_MSC],
  lastVerified: READ,
};

const AGH: UniversityProfile = {
  id: 'pl-agh',
  countryCode: 'PL',
  name: 'AGH University of Krakow',
  city: 'Kraków',
  ownership: 'public',
  officialUrl: 'https://www.agh.edu.pl/',
  admissionsUrl: PL_AGH_FEES.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '761-770', sourceUrl: PL_AGH_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A public, science-and-technology-focused university in Kraków, admitting international students on a fee-paying basis with a dedicated Department for International Students.',
    'Kraków-তে একটি public, science-and-technology-focused university, একটি নিবেদিত Department for International Students সহ fee-paying ভিত্তিতে international student ভর্তি করে।',
  ),
  tuition: NOT_VERIFIED_FEE([PL_AGH_FEES]),
  deadlines: txt('AGH’s own fees page lists payment deadlines (15 October for an October start, 15 March for a February/March start) but a full, official, programme-by-programme non-EU tuition-fee schedule in English was not itemized on the pages read for this guide — AGH’s own fees page refers candidates to the Polish-language version for exact figures.', 'AGH-এর নিজের fees page payment deadline তালিকাভুক্ত করে (October শুরুর জন্য 15 October, February/March শুরুর জন্য 15 March) কিন্তু একটি সম্পূর্ণ, official, programme-by-programme non-EU tuition-fee schedule English-এ এই guide-এর জন্য পড়া page-এ তালিকাভুক্ত হয়নি — AGH-এর নিজের fees page সঠিক সংখ্যার জন্য candidate-দের Polish-ভাষার version-এ পাঠায়।', 'partly-verified', [PL_AGH_FEES]),
  nextIntake: intake('confirmed', [PL_AGH_FEES], b('October, with some programmes admitting in February/March', 'October, কিছু programme February/March-এ ভর্তি করে')),
  admission: txt('AGH’s own required-documents pages for Bachelor and Master admission list academic certificates, a language certificate for English-taught studies at a minimum B2 level (e.g. IELTS Academic at least 5.5 points, TOEFL iBT at least 72 points), and a passport-style photo meeting specific formatting rules.', 'AGH-এর নিজের Bachelor আর Master ভর্তির required-documents page academic certificate, English-taught studies-এর জন্য B2 level-এ একটি language certificate (যেমন IELTS Academic অন্তত 5.5 points, TOEFL iBT অন্তত 72 points), আর নির্দিষ্ট formatting নিয়ম মানা একটি passport-style photo তালিকাভুক্ত করে।', 'verified', [PL_AGH_DOCS_BACHELOR]),
  english: txt('AGH’s own required-documents pages accept IELTS Academic at a minimum of 5.5 points, TOEFL iBT at a minimum of 72 points, and several other certificates, all at a minimum B2 level.', 'AGH-এর নিজের required-documents page IELTS Academic ন্যূনতম 5.5 points, TOEFL iBT ন্যূনতম 72 points, আর আরো কয়েকটি certificate গ্রহণ করে, সবই ন্যূনতম B2 level-এ।', 'verified', [PL_AGH_DOCS_BACHELOR]),
  documents: {
    required: [
      b('Academic certificate/diploma (secondary-school or Bachelor’s, as applicable)', 'Academic certificate/diploma (secondary-school বা Bachelor\'s, প্রযোজ্য অনুযায়ী)'),
      b('Language certificate confirming at least B2 English (e.g. IELTS Academic 5.5+, TOEFL iBT 72+)', 'অন্তত B2 English নিশ্চিতকারী language certificate (যেমন IELTS Academic 5.5+, TOEFL iBT 72+)'),
      b('Passport-style photograph meeting AGH’s own formatting rules', 'AGH-এর নিজের formatting নিয়ম মানা passport-style photograph'),
    ],
    mayBeRequired: [b('Scholarship decision document (if applicable, e.g. a NAWA or Kalinowski Scholarship decision)', 'Scholarship decision document (প্রযোজ্য হলে, যেমন NAWA বা Kalinowski Scholarship decision)')],
    status: 'verified',
    sources: [PL_AGH_DOCS_BACHELOR],
  },
  applicationFee: txt('PLN 100 for each declared field of study with an entrance exam, for Master’s studies, per AGH’s own fees page; the Bachelor’s-level figure was not itemized on the pages read for this guide.', 'AGH-এর নিজের fees page অনুযায়ী, Master\'s studies-এর জন্য entrance exam সহ প্রতিটি declared field of study-র জন্য PLN 100; Bachelor\'s-level সংখ্যা এই guide-এর জন্য পড়া page-এ তালিকাভুক্ত হয়নি।', 'partly-verified', [PL_AGH_FEES]),
  scholarships: txt('AGH’s own fees page states a candidate holding a NAWA decision, a minister’s decision, or a NAWA letter has their financial conditions determined accordingly (e.g. exemption from tuition fees); no AGH-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'AGH-এর নিজের fees page বলে NAWA decision, minister-এর decision, বা একটি NAWA letter থাকা একজন candidate-এর আর্থিক শর্ত সেই অনুযায়ী ঠিক হয় (যেমন tuition fee থেকে exemption); এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য AGH-specific কোনো full-degree scholarship পাওয়া যায়নি।', 'partly-verified', [PL_AGH_FEES]),
  applicationRoute: txt('Online via AGH’s own e-Rekrutacja system.', 'AGH-এর নিজস্ব e-Rekrutacja system-এর মাধ্যমে online।', 'verified', [PL_AGH_FEES]),
  steps: {
    items: [
      { title: b('Prepare your academic and language certificates', 'আপনার academic আর language certificate তৈরি করুন'), body: b('A minimum B2-level English certificate is required for English-taught studies, per AGH’s own documents page.', 'AGH-এর নিজের documents page অনুযায়ী, English-taught studies-এর জন্য ন্যূনতম B2-level English certificate লাগে।') },
      { title: b('Register and pay through e-Rekrutacja', 'e-Rekrutacja-র মাধ্যমে register করুন আর পরিশোধ করুন'), body: b('Pay separately for each form and level of study you register for.', 'আপনি যে প্রতিটি form আর level of study-র জন্য register করেন তার জন্য আলাদাভাবে পরিশোধ করুন।') },
      VISA_STEP,
    ],
    status: 'verified',
    sources: [PL_AGH_FEES, PL_AGH_DOCS_BACHELOR],
  },
  programs: [],
  lastVerified: READ,
};

const AMU: UniversityProfile = {
  id: 'pl-amu',
  countryCode: 'PL',
  name: 'Adam Mickiewicz University, Poznań',
  city: 'Poznań',
  ownership: 'public',
  officialUrl: 'https://amu.edu.pl/en',
  admissionsUrl: PL_AMU_TUITION.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '731-740', sourceUrl: PL_AMU_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A public university in Poznań, which its own news page reports retained 4th place among Polish universities in the QS World University Rankings 2027, behind the University of Warsaw, Jagiellonian University and Warsaw University of Technology.',
    'Poznań-এ একটি public university, যার নিজের news page রিপোর্ট করে এটা QS World University Rankings 2027-এ Polish university-দের মধ্যে 4th স্থান বজায় রেখেছে, University of Warsaw, Jagiellonian University, আর Warsaw University of Technology-র পরে।',
  ),
  tuition: {
    ...txt(
      'AMU’s own tuition-fees page sets a semester fee per major for students starting full-time studies in a foreign language in 2026/2027, from PLN 1,900 (General Chemistry) up to PLN 4,000 (e.g. Communication and Media Studies, International Relations, Public Governance); its own Recruitment Q&A page states the overall 2026 range runs from 0 PLN to 4,000 PLN depending on the chosen major.',
      'AMU-এর নিজের tuition-fees page 2026/2027-এ foreign ভাষায় full-time studies শুরু করা student-দের জন্য প্রতি major অনুযায়ী একটি সেমিস্টার fee ঠিক করে, PLN 1,900 (General Chemistry) থেকে PLN 4,000 (যেমন Communication and Media Studies, International Relations, Public Governance) পর্যন্ত; এর নিজের Recruitment Q&A page বলে সার্বিক 2026 range বাছা major অনুযায়ী 0 PLN থেকে 4,000 PLN পর্যন্ত।',
      'verified',
      [PL_AMU_TUITION, PL_AMU_QA],
    ),
    money: { amount: 1900, max: 4000, currency: 'PLN', period: 'semester' },
  },
  deadlines: NOT_VERIFIED_FEE([PL_AMU_QA]),
  nextIntake: intake('not-published', [PL_AMU_QA]),
  admission: txt('AMU’s own Recruitment Q&A page confirms tuition varies by major and that some majors are free of charge, but a full admission-requirements breakdown per programme was not itemized in detail on the pages read for this guide.', 'AMU-এর নিজের Recruitment Q&A page নিশ্চিত করে tuition major অনুযায়ী আলাদা আর কিছু major বিনামূল্যে, কিন্তু প্রতি programme-এর জন্য একটি সম্পূর্ণ admission-requirements breakdown এই guide-এর জন্য পড়া page-এ বিস্তারিতভাবে তালিকাভুক্ত হয়নি।', 'partly-verified', [PL_AMU_QA]),
  english: NOT_VERIFIED_FEE([PL_AMU_QA]),
  documents: { required: [], mayBeRequired: [], status: 'not-verified', sources: [PL_AMU_QA] },
  applicationFee: NOT_VERIFIED_FEE([PL_AMU_QA]),
  scholarships: txt('No AMU-specific, full-degree scholarship for Bangladeshi applicants was found on the pages read for this guide.', 'এই guide-এর জন্য পড়া page-এ Bangladeshi আবেদনকারীদের জন্য AMU-specific একটি full-degree scholarship পাওয়া যায়নি।', 'not-verified', [PL_AMU_QA]),
  applicationRoute: NOT_VERIFIED_FEE([PL_AMU_QA]),
  steps: {
    items: [
      { title: b('Check your major’s own semester fee', 'আপনার major-এর নিজের সেমিস্টার fee দেখুন'), body: b('AMU’s own tuition-fees page lists these per major, from PLN 1,900 to 4,000 per semester.', 'AMU-এর নিজের tuition-fees page এগুলো প্রতি major অনুযায়ী তালিকাভুক্ত করে, সেমিস্টারে PLN 1,900 থেকে 4,000।') },
      VISA_STEP,
    ],
    status: 'partly-verified',
    sources: [PL_AMU_TUITION],
  },
  programs: [],
  lastVerified: READ,
};

export const PL_UNI_LAYER: CountryUniversityLayer = {
  code: 'PL',
  universities: [AGH, AMU, UJ, UW, WUT],
  visaStats: [],
  unverified: [
    {
      id: 'pl-bd-visa-approval-rate',
      label: b('Bangladesh-specific national-visa approval or refusal rate', 'বাংলাদেশ-নির্দিষ্ট national-visa অনুমোদন বা প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific visa approval-rate figure, or a verified country-wide international-student headcount broken down by nationality from an official Polish source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'pl-bd-return-trip-funds',
      label: b('Bangladesh-specific return-trip funds figure for the D-type visa', 'D-type visa-র জন্য Bangladesh-specific ফিরতি-যাত্রার funds সংখ্যা'),
      status: 'not-verified',
      note: 'Poland’s own nationwide regulation sets a region-varying minimum for return-trip funds, but mission pages quote figures specific to their own region (e.g. Poland in Armenia’s own page quotes 2,500 PLN for Armenia); the exact figure that applies when departing from Bangladesh was not found on an official page read for this guide, and should be confirmed with the Embassy of the Republic of Poland in New Delhi.',
    },
    {
      id: 'pl-agh-amu-tuition-detail',
      label: b('AGH’s and AMU’s own full, official English-taught non-EU tuition schedule', 'AGH আর AMU-র নিজস্ব সম্পূর্ণ, official English-taught non-EU tuition schedule'),
      status: 'needs-review',
      note: 'AGH’s and AMU’s QS World University Rankings profiles and general fee pages were read and verified, but a complete, official, programme-by-programme non-EU tuition figure in English was not itemized in full detail on the pages read for this guide — AGH’s own fees page in particular refers candidates to its Polish-language page for exact amounts.',
    },
  ],
  lastVerified: READ,
};

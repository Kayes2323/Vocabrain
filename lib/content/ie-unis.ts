import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryUniversityLayer, DataStatus, IntakeInfo, ProgramProfile, SourcedText, UniversityProfile } from '@/lib/abroad/university-layer';
import {
  IE_GALWAY_ENTRY,
  IE_GALWAY_HOWTOAPPLY,
  IE_GALWAY_PG_FEES,
  IE_GALWAY_QS,
  IE_GALWAY_UG_FEES,
  IE_ISD_VISA_HOWTO,
  IE_READ,
  IE_TCD_ENGLISH,
  IE_TCD_ENTRY,
  IE_TCD_INTL,
  IE_TCD_QS,
  IE_TCD_UG_ADMISSION,
  IE_TCD_UG_FEES,
  IE_UCC_APPLY,
  IE_UCC_ENGLISH,
  IE_UCC_QS,
  IE_UCC_UG_FEES,
  IE_UCD_ENGLISH,
  IE_UCD_FEES,
  IE_UCD_GOI_SCHOLARSHIP,
  IE_UCD_HOWTOAPPLY,
  IE_UCD_QS,
} from './ie-sources';

/**
 * Ireland: university → program layer, built the same way as the France's,
 * Czech Republic's, Slovenia's, Lithuania's, Germany's and South Korea's
 * (lib/content/fr-unis.ts, cz-unis.ts, si-unis.ts, lt-unis.ts, de-unis.ts,
 * kr-unis.ts). Rankings are QS World University Rankings 2027 as printed on
 * each institution's topuniversities.com profile. Tuition, deadlines and
 * requirements come from each institution's own official pages. Anything
 * that could not be verified on an official page is left marked
 * unverified — never guessed.
 */

const READ = IE_READ;
const b = (en: string, bn: string): Bilingual => ({ en, bn });
const txt = (en: string, bn: string, status: DataStatus, sources: SourceRef[], extra: Partial<SourcedText> = {}): SourcedText => ({ text: b(en, bn), status, sources, lastVerified: READ, ...extra });
const intake = (status: IntakeInfo['status'], sources: SourceRef[], value?: Bilingual): IntakeInfo => ({ status, sources, lastVerified: READ, ...(value ? { value } : {}) });

const NOT_VERIFIED_FEE = (sources: SourceRef[]) => txt('Not verified — check the institution’s official admissions page.', 'যাচাই হয়নি — institution-এর official admissions page দেখুন।', 'not-verified', sources);
const VISA_STEP = {
  title: b('Apply for the D study visa and register your permission', 'D study visa-র আবেদন করুন আর আপনার permission register করুন'),
  body: b('After admission, apply for a long-stay "D" study visa via AVATS up to 3 months before travel (Bangladesh is on Ireland’s visa-required nationalities list and applies through the Irish Embassy in New Delhi). Within 90 days of arrival, register with Immigration Service Delivery for an Irish Residence Permit (IRP) card. See the Ireland student-visa section on the country page.', 'ভর্তির পর, যাত্রার 3 মাস আগে পর্যন্ত AVATS-এর মাধ্যমে একটি long-stay "D" study visa-র আবেদন করুন (Bangladesh Ireland-এর visa-required জাতীয়তার তালিকায় আছে আর New Delhi-র Irish Embassy-র মাধ্যমে আবেদন করে)। পৌঁছানোর 90 দিনের মধ্যে, একটি Irish Residence Permit (IRP) card পাওয়ার জন্য Immigration Service Delivery-এ register করুন। Country page-এর Ireland student-visa অংশ দেখুন।'),
};

// ------------------------------------------------------------------ universities

const TCD: UniversityProfile = {
  id: 'ie-tcd',
  countryCode: 'IE',
  name: 'Trinity College Dublin',
  city: 'Dublin',
  ownership: 'public',
  officialUrl: 'https://www.tcd.ie/',
  admissionsUrl: IE_TCD_INTL.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '75', sourceUrl: IE_TCD_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Ireland’s oldest university (founded 1592), a research-intensive, campus university in central Dublin. Trinity sets its own undergraduate and postgraduate entrance requirements for international (non-EU) applicants, separate from the Irish Leaving-Certificate/CAO route, and its own non-EU fee per programme.',
    'Ireland-এর সবচেয়ে পুরনো university (1592-এ প্রতিষ্ঠিত), কেন্দ্রীয় Dublin-এ একটি research-intensive, campus university। Trinity international (non-EU) আবেদনকারীদের জন্য নিজস্ব undergraduate আর postgraduate ভর্তির শর্ত ঠিক করে, Irish Leaving-Certificate/CAO route থেকে আলাদা, আর প্রতি programme নিজস্ব non-EU fee।',
  ),
  tuition: {
    ...txt(
      'Set per programme, not as one national figure. As one example, Trinity’s 2026/27 non-EU Year 1 fee for its Ancient History and Archaeology joint-honours combinations is EUR 22,580, and its one-year international/visiting Arts programme is EUR 22,210; postgraduate fees are published separately per course on Trinity’s own fees pages.',
      'জাতীয় একক সংখ্যা না, প্রতি programme অনুযায়ী ঠিক হয়। একটা উদাহরণ হিসেবে, Trinity-র 2026/27-এর non-EU Year 1 fee Ancient History and Archaeology joint-honours combination-এ EUR 22,580, আর এর এক-বছরের international/visiting Arts programme-এ EUR 22,210; postgraduate fee Trinity-র নিজের fee page-এ প্রতি course আলাদাভাবে প্রকাশ করা হয়।',
      'partly-verified',
      [IE_TCD_UG_FEES],
    ),
    money: { amount: 22580, currency: 'EUR', period: 'year' },
  },
  deadlines: txt('Applications for international applicants open 1 November for September admission the following year.', 'আন্তর্জাতিক আবেদনকারীদের জন্য পরের বছরের September admission-এর জন্য application 1 November-এ খোলে।', 'partly-verified', [IE_TCD_INTL]),
  nextIntake: intake('confirmed', [IE_TCD_INTL], b('September', 'September')),
  admission: txt(
    'Undergraduate admission requires an international second-level qualification Trinity recognises for direct entry (International Baccalaureate, A-levels, and several other named national curricula; others should check Trinity’s country-specific pages), two academic references, final/predicted school exam results, a 500-word statement of purpose, and an English-proficiency qualification. Postgraduate admission generally requires at least a 2.1 honours degree (60%) or an equivalent result, two academic (or clinical) references, and an English-proficiency qualification. Applicants not meeting direct-entry requirements may be eligible for Trinity’s own International Foundation Programme.',
    'Undergraduate ভর্তিতে লাগে Trinity-র direct entry-র জন্য স্বীকৃত একটি international second-level যোগ্যতা (International Baccalaureate, A-levels, আর বেশ কিছু নামযুক্ত জাতীয় curriculum; অন্যদের Trinity-র country-specific page দেখা উচিত), দুইজন academic referee, final/predicted পরীক্ষার result, একটি 500-word statement of purpose, আর একটি English-দক্ষতার যোগ্যতা। Postgraduate ভর্তিতে সাধারণত লাগে অন্তত একটি 2.1 honours degree (60%) বা সমতুল্য result, দুইজন academic (বা clinical) referee, আর একটি English-দক্ষতার যোগ্যতা। Direct-entry শর্ত পূরণ না করা আবেদনকারীরা Trinity-র নিজের International Foundation Programme-এর যোগ্য হতে পারেন।',
    'verified',
    [IE_TCD_ENTRY],
  ),
  english: txt(
    'Trinity’s standard "Band B" requirement, which applies to the majority of its undergraduate and postgraduate courses, is IELTS Academic 6.5 overall with 6.0 in each component (or equivalent Duolingo/TOEFL iBT/Cambridge/PTE scores); a higher "Band C" requirement of IELTS 7.0/6.5 applies to some courses. Results must be issued within 2 years of the course start.',
    'Trinity-র standard "Band B" শর্ত, যা এর অধিকাংশ undergraduate আর postgraduate course-এ প্রযোজ্য, হলো IELTS Academic 6.5 overall, প্রতি component-এ 6.0 (বা সমতুল্য Duolingo/TOEFL iBT/Cambridge/PTE score); কিছু course-এ উচ্চতর "Band C" শর্ত IELTS 7.0/6.5 প্রযোজ্য। Result course শুরুর 2 বছরের মধ্যে ইস্যু করা থাকতে হয়।',
    'verified',
    [IE_TCD_ENGLISH],
  ),
  documents: {
    required: [b('Two academic references', 'দুইজন academic referee'), b('Final high-school exam results or predicted scores', 'Final high-school পরীক্ষার result বা predicted score'), b('A 500-word statement of purpose (undergraduate)', 'একটি 500-word statement of purpose (undergraduate)'), b('An English-proficiency qualification', 'একটি English-দক্ষতার যোগ্যতা')],
    mayBeRequired: [b('Course-specific requirements listed on the individual course page', 'পৃথক course page-এ তালিকাভুক্ত course-specific শর্ত')],
    status: 'verified',
    sources: [IE_TCD_ENTRY],
  },
  applicationFee: NOT_VERIFIED_FEE([IE_TCD_UG_ADMISSION]),
  scholarships: NOT_VERIFIED_FEE([IE_TCD_UG_FEES]),
  applicationRoute: txt('Online, directly to Trinity (not via the CAO, which is for the Irish Leaving Certificate route); Trinity’s own "How to Apply" guide sets out the exact portal per applicant type.', 'Online, সরাসরি Trinity-তে (CAO দিয়ে না, যা Irish Leaving Certificate route-এর জন্য); Trinity-র নিজের "How to Apply" guide প্রতি আবেদনকারীর ধরন অনুযায়ী ঠিক portal ঠিক করে।', 'verified', [IE_TCD_UG_ADMISSION]),
  steps: {
    items: [
      { title: b('Check your country-specific entry requirements', 'আপনার country-specific ভর্তির শর্ত দেখুন'), body: b('Trinity names several accepted national curricula for direct entry and a per-country page for others.', 'Trinity direct entry-র জন্য বেশ কিছু গ্রহণযোগ্য জাতীয় curriculum নাম দেয় আর অন্যদের জন্য একটি per-country page।') },
      { title: b('Apply online by the relevant deadline', 'প্রাসঙ্গিক শেষ তারিখের মধ্যে online আবেদন করুন'), body: b('International applications open 1 November for the following September.', 'আন্তর্জাতিক application পরের September-এর জন্য 1 November-এ খোলে।') },
      { title: b('Submit references, results and your English-proficiency qualification', 'Referee, result, আর আপনার English-দক্ষতার যোগ্যতা জমা দিন'), body: b('Two academic references and a 500-word statement of purpose for undergraduate applicants.', 'Undergraduate আবেদনকারীদের জন্য দুইজন academic referee আর একটি 500-word statement of purpose।') },
      VISA_STEP,
      { title: b('Pay tuition and enrol', 'Tuition দিয়ে enrol করুন'), body: b('Fees are set per programme on Trinity’s own fee schedule.', 'Fee Trinity-র নিজের fee schedule-এ প্রতি programme অনুযায়ী ঠিক।') },
    ],
    status: 'verified',
    sources: [IE_TCD_ENTRY, IE_TCD_UG_FEES],
  },
  programs: [],
  lastVerified: READ,
};

const UCD: UniversityProfile = {
  id: 'ie-ucd',
  countryCode: 'IE',
  name: 'University College Dublin',
  city: 'Dublin',
  ownership: 'public',
  officialUrl: 'https://www.ucd.ie/',
  admissionsUrl: IE_UCD_HOWTOAPPLY.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '=100', sourceUrl: IE_UCD_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Ireland’s largest university, a public research university on a single campus at Belfield in south Dublin, organised into six colleges spanning arts, business, engineering and architecture, health and agricultural sciences, science, and social sciences and law.',
    'Ireland-এর সবচেয়ে বড় university, south Dublin-এর Belfield-এ একটি single campus-এ একটি public research university, arts, business, engineering and architecture, health and agricultural sciences, science, আর social sciences and law জুড়ে ছয়টি college-এ organized।',
  ),
  tuition: NOT_VERIFIED_FEE([IE_UCD_FEES]),
  deadlines: txt('Undergraduate applications open 1 October for the following September; visa-required applicants (including Bangladeshi applicants) are recommended to apply before 1 July to allow time for the D study visa process.', 'Undergraduate application পরের September-এর জন্য 1 October-এ খোলে; visa-required আবেদনকারীদের (Bangladeshi আবেদনকারী-সহ) D study visa প্রক্রিয়ার জন্য সময় রাখতে 1 July-র আগে আবেদন করার পরামর্শ দেওয়া হয়।', 'verified', [IE_UCD_HOWTOAPPLY]),
  nextIntake: intake('confirmed', [IE_UCD_HOWTOAPPLY], b('September', 'September')),
  admission: txt('All non-EU applicants (undergraduate and graduate) apply through UCD’s own course catalogue application system; there is no separate CAO route for non-EU applicants.', 'সব non-EU আবেদনকারী (undergraduate আর graduate) UCD-র নিজস্ব course catalogue application system-এর মাধ্যমে আবেদন করেন; non-EU আবেদনকারীদের জন্য আলাদা কোনো CAO route নেই।', 'verified', [IE_UCD_HOWTOAPPLY]),
  english: txt(
    'UCD’s general minimum is IELTS Academic with an average score of 6.5 over all components and a minimum of 6.0 in each band (retake scores not accepted); some programmes, such as those at the Smurfit Graduate Business School, ask higher (e.g. 7.0 overall/6.5 each band for some postgraduate programmes).',
    'UCD-র সাধারণ ন্যূনতম হলো IELTS Academic, সব component-এ গড়ে 6.5 score আর প্রতি band-এ ন্যূনতম 6.0 (retake score গ্রহণযোগ্য না); কিছু programme, যেমন Smurfit Graduate Business School-এর, বেশি চায় (যেমন কিছু postgraduate programme-এ 7.0 overall/6.5 প্রতি band)।',
    'verified',
    [IE_UCD_ENGLISH],
  ),
  documents: {
    required: [b('Prior academic certificates/transcripts', 'আগের academic সনদ/transcript'), b('An English-proficiency qualification', 'একটি English-দক্ষতার যোগ্যতা'), b('Completed online application via UCD’s course catalogue', 'UCD-র course catalogue-এর মাধ্যমে সম্পূর্ণ করা online application')],
    mayBeRequired: [b('Programme-specific documents listed on the individual course page', 'পৃথক course page-এ তালিকাভুক্ত programme-specific document')],
    status: 'partly-verified',
    sources: [IE_UCD_HOWTOAPPLY, IE_UCD_ENGLISH],
  },
  applicationFee: NOT_VERIFIED_FEE([IE_UCD_FEES]),
  scholarships: txt(
    'UCD hosts the Government of Ireland International Education Scholarship (GOI-IES) for eligible master’s/PhD applicants, who must be on the non-EU fee rate, from a non-EU/non-EEA country, and hold an offer on one of UCD’s eligible programmes. See the country guide’s own scholarship answer; UCD’s page does not state a Bangladesh-specific exclusion.',
    'UCD যোগ্য master\'s/PhD আবেদনকারীদের জন্য Government of Ireland International Education Scholarship (GOI-IES) চালায়, যাদের non-EU fee rate-এ থাকতে হয়, একটি non-EU/non-EEA দেশ থেকে হতে হয়, আর UCD-র একটি যোগ্য programme-এ offer থাকতে হয়। Country guide-এর নিজের scholarship উত্তর দেখুন; UCD-র page কোনো Bangladesh-specific exclusion বলে না।',
    'partly-verified',
    [IE_UCD_GOI_SCHOLARSHIP],
  ),
  applicationRoute: txt('Online via UCD’s own course catalogue (ucd.ie/courses/apply); some US undergraduate applicants may alternatively use the Common App, with no preference between the two.', 'UCD-র নিজস্ব course catalogue-এর (ucd.ie/courses/apply) মাধ্যমে online; কিছু US undergraduate আবেদনকারী বিকল্পভাবে Common App ব্যবহার করতে পারেন, দুটোর মধ্যে কোনো পছন্দ নেই।', 'verified', [IE_UCD_HOWTOAPPLY]),
  steps: {
    items: [
      { title: b('Choose a programme on UCD’s course catalogue', 'UCD-র course catalogue-এ একটি programme বাছুন'), body: b('Each college sets its own English-taught offerings and requirements.', 'প্রতিটি college নিজস্ব ইংরেজি-মাধ্যম offering আর শর্ত ঠিক করে।') },
      { title: b('Apply online from 1 October for the following September', 'পরের September-এর জন্য 1 October থেকে online আবেদন করুন'), body: b('Apply before 1 July if you are visa-required, to leave time for the visa process.', 'Visa-required হলে visa প্রক্রিয়ার জন্য সময় রাখতে 1 July-র আগে আবেদন করুন।') },
      { title: b('Submit your English-proficiency qualification and certificates', 'আপনার English-দক্ষতার যোগ্যতা আর সনদ জমা দিন'), body: b('IELTS Academic 6.5 overall/6.0 each band is UCD’s general minimum.', 'IELTS Academic 6.5 overall/6.0 প্রতি band UCD-র সাধারণ ন্যূনতম।') },
      VISA_STEP,
      { title: b('Pay tuition and enrol', 'Tuition দিয়ে enrol করুন'), body: b('Non-EU fees are published per programme on UCD’s own fees pages.', 'Non-EU fee UCD-র নিজের fee page-এ প্রতি programme প্রকাশিত।') },
    ],
    status: 'verified',
    sources: [IE_UCD_HOWTOAPPLY],
  },
  programs: [],
  lastVerified: READ,
};

const CS: ProgramProfile = {
  id: 'ie-ucc-cs',
  title: 'Computer Science – BSc (Hons)',
  level: 'bachelors',
  faculty: 'College of Science, Engineering and Food Science',
  languages: b('Entirely in English', 'সম্পূর্ণ ইংরেজিতে'),
  englishOnly: true,
  duration: b('4 years', '4 বছর'),
  tuition: {
    ...txt('EUR 27,000 a year (Non-EU fee, full time), per UCC’s own 2026/27 international undergraduate fee schedule, plus a EUR 210 capitation fee.', 'UCC-র নিজের 2026/27-এর international undergraduate fee schedule অনুযায়ী বছরে EUR 27,000 (Non-EU fee, full time), সঙ্গে EUR 210 capitation fee।', 'verified', [IE_UCC_UG_FEES]),
    money: { amount: 27000, currency: 'EUR', period: 'year' },
  },
  deadline: NOT_VERIFIED_FEE([IE_UCC_APPLY]),
  nextIntake: intake('varies', [IE_UCC_APPLY]),
  requirements: txt('Admission is through UCC’s International Office for non-EU applicants (for programmes other than Medicine and Dentistry); up to two programmes may be applied for in one application.', 'Non-EU আবেদনকারীদের জন্য ভর্তি UCC-র International Office-এর মাধ্যমে হয় (Medicine আর Dentistry ছাড়া অন্য programme-এ); একটি application-এ দুটো পর্যন্ত programme-এ আবেদন করা যায়।', 'verified', [IE_UCC_APPLY]),
  english: txt('For undergraduate degree programmes in the College of Science, Engineering and Food Science, UCC’s minimum is IELTS 6.5 overall with 6.0 in each band (the IELTS Indicator test is also accepted).', 'College of Science, Engineering and Food Science-এর undergraduate degree programme-এর জন্য UCC-র ন্যূনতম IELTS 6.5 overall, প্রতি band-এ 6.0 (IELTS Indicator test-ও গ্রহণযোগ্য)।', 'verified', [IE_UCC_ENGLISH]),
  applyVia: b('UCC’s own online International Office application system', 'UCC-র নিজস্ব online International Office application system'),
  url: 'https://www.ucc.ie/en/financeoffice/fees/schedules/internationalundergraduatefees202627/',
  sources: [IE_UCC_UG_FEES, IE_UCC_ENGLISH],
  lastVerified: READ,
};

const UCC: UniversityProfile = {
  id: 'ie-ucc',
  countryCode: 'IE',
  name: 'University College Cork',
  city: 'Cork',
  ownership: 'public',
  officialUrl: 'https://www.ucc.ie/',
  admissionsUrl: IE_UCC_APPLY.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '220', sourceUrl: IE_UCC_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'Founded in 1849, a public research university in Cork organised into four colleges: Arts, Celtic Studies and Social Sciences; Business and Law; Medicine and Health; and Science, Engineering and Food Science.',
    '1849-এ প্রতিষ্ঠিত, Cork-এ একটি public research university, চারটি college-এ organized: Arts, Celtic Studies and Social Sciences; Business and Law; Medicine and Health; আর Science, Engineering and Food Science।',
  ),
  tuition: {
    ...txt(
      'Non-EU undergraduate fees for 2026/27 (full time, per UCC’s own fee schedule) range from EUR 16,300 (Business and Financial Economics, 2-year) to EUR 27,000 for most Science, Engineering and Food Science programmes, and up to EUR 52,100 for Dentistry or Medicine (direct entry) and EUR 56,100 for Medicine (Graduate Entry). A EUR 210 capitation fee applies on top of most programmes.',
      'UCC-র নিজের fee schedule অনুযায়ী 2026/27-এর non-EU undergraduate fee (full time) EUR 16,300 (Business and Financial Economics, 2-বছর) থেকে অধিকাংশ Science, Engineering and Food Science programme-এ EUR 27,000, আর Dentistry বা Medicine (direct entry)-এ EUR 52,100 আর Medicine (Graduate Entry)-এ EUR 56,100 পর্যন্ত। অধিকাংশ programme-এ উপরে EUR 210 capitation fee প্রযোজ্য।',
      'verified',
      [IE_UCC_UG_FEES],
    ),
    money: { amount: 16300, max: 56100, currency: 'EUR', period: 'year' },
  },
  deadlines: NOT_VERIFIED_FEE([IE_UCC_APPLY]),
  nextIntake: intake('varies', [IE_UCC_APPLY]),
  admission: txt('Non-EU applicants to undergraduate programmes other than Medicine and Dentistry apply directly to UCC’s International Office using its own online application system, for up to 2 programmes.', 'Medicine আর Dentistry ছাড়া undergraduate programme-এ non-EU আবেদনকারীরা সরাসরি UCC-র International Office-এর নিজস্ব online application system ব্যবহার করে আবেদন করেন, দুটো পর্যন্ত programme-এর জন্য।', 'verified', [IE_UCC_APPLY]),
  english: txt(
    'For most undergraduate degree programmes (Arts, Celtic Studies and Social Sciences; Business and Law; Science, Engineering and Food Science), UCC’s minimum is IELTS 6.5 overall with 6.0 in each band; College of Medicine and Health programmes generally require 6.5 overall with 6.5 in each band (Speech and Language Therapy: 7.0/6.5).',
    'অধিকাংশ undergraduate degree programme-এর (Arts, Celtic Studies and Social Sciences; Business and Law; Science, Engineering and Food Science) জন্য UCC-র ন্যূনতম IELTS 6.5 overall, প্রতি band-এ 6.0; College of Medicine and Health programme সাধারণত 6.5 overall, প্রতি band-এ 6.5 চায় (Speech and Language Therapy: 7.0/6.5)।',
    'verified',
    [IE_UCC_ENGLISH],
  ),
  documents: {
    required: [b('Prior academic certificates/transcripts', 'আগের academic সনদ/transcript'), b('An English-proficiency qualification', 'একটি English-দক্ষতার যোগ্যতা'), b('Completed application to UCC’s International Office (up to 2 programmes)', 'UCC-র International Office-এ সম্পূর্ণ করা application (দুটো পর্যন্ত programme)')],
    mayBeRequired: [b('Programme-specific documents listed on the individual course page', 'পৃথক course page-এ তালিকাভুক্ত programme-specific document')],
    status: 'partly-verified',
    sources: [IE_UCC_APPLY],
  },
  applicationFee: NOT_VERIFIED_FEE([IE_UCC_UG_FEES]),
  scholarships: txt(
    'UCC’s College of Arts, Celtic Studies and Social Sciences gives an automatic EUR 2,000 scholarship once a non-EU student is accepted onto any of its undergraduate programmes; its College of Medicine and Health offers a EUR 5,000/year academic scholarship for some privately funded international Pharmacy students. Neither is specific to Bangladeshi students.',
    'UCC-র College of Arts, Celtic Studies and Social Sciences একজন non-EU student এর কোনো undergraduate programme-এ accepted হওয়ার সাথে সাথে একটি automatic EUR 2,000 scholarship দেয়; এর College of Medicine and Health কিছু privately funded international Pharmacy student-এর জন্য বছরে EUR 5,000 academic scholarship দেয়। দুটোই Bangladeshi student-দের জন্য নির্দিষ্ট না।',
    'verified',
    [IE_UCC_UG_FEES],
  ),
  applicationRoute: txt('Online via UCC’s own International Office application system.', 'UCC-র নিজস্ব International Office application system-এ online।', 'verified', [IE_UCC_APPLY]),
  steps: {
    items: [
      { title: b('Choose up to 2 programmes', 'দুটো পর্যন্ত programme বাছুন'), body: b('Each college sets its own entry requirements and non-EU fee.', 'প্রতিটি college নিজস্ব ভর্তির শর্ত আর non-EU fee ঠিক করে।') },
      { title: b('Apply via UCC’s International Office online system', 'UCC-র International Office online system দিয়ে আবেদন করুন'), body: b('Submit academic certificates and your English-proficiency qualification.', 'Academic সনদ আর আপনার English-দক্ষতার যোগ্যতা জমা দিন।') },
      VISA_STEP,
      { title: b('Pay tuition and enrol', 'Tuition দিয়ে enrol করুন'), body: b('Non-EU fees and the capitation fee are published on UCC’s own fee schedule.', 'Non-EU fee আর capitation fee UCC-র নিজের fee schedule-এ প্রকাশিত।') },
    ],
    status: 'verified',
    sources: [IE_UCC_APPLY, IE_UCC_UG_FEES],
  },
  programs: [CS],
  lastVerified: READ,
};

const GALWAY: UniversityProfile = {
  id: 'ie-galway',
  countryCode: 'IE',
  name: 'University of Galway',
  city: 'Galway',
  ownership: 'public',
  officialUrl: 'https://www.universityofgalway.ie/',
  admissionsUrl: IE_GALWAY_HOWTOAPPLY.url,
  ranking: { provider: 'QS World University Rankings', year: 2027, rank: '275', sourceUrl: IE_GALWAY_QS.url!, lastVerified: READ, status: 'verified' },
  overview: b(
    'A public research university on the west coast of Ireland (formerly National University of Ireland, Galway/NUIG), with colleges spanning arts, social sciences and Celtic studies; business, public policy and law; medicine, nursing and health sciences; and science and engineering.',
    'Ireland-এর পশ্চিম উপকূলে একটি public research university (আগে National University of Ireland, Galway/NUIG), arts, social sciences and Celtic studies; business, public policy and law; medicine, nursing and health sciences; আর science and engineering জুড়ে college সহ।',
  ),
  tuition: {
    ...txt(
      'Set per programme, not as one national figure. Examples from the university’s own 2026/27 fee schedules: a non-EU undergraduate programme (Global Luxury and Experience Management) is EUR 16,150/year; non-EU postgraduate taught master’s fees range from about EUR 13,840 (MSc International Accounting and Analytics, Pathway B) to roughly EUR 21,640 (several MSc programmes in business); non-EU structured PhD fees are generally around EUR 14,500–14,640/year.',
      'জাতীয় একক সংখ্যা না, প্রতি programme অনুযায়ী ঠিক হয়। University-র নিজের 2026/27-এর fee schedule থেকে উদাহরণ: একটি non-EU undergraduate programme (Global Luxury and Experience Management) বছরে EUR 16,150; non-EU postgraduate taught master\'s fee প্রায় EUR 13,840 (MSc International Accounting and Analytics, Pathway B) থেকে প্রায় EUR 21,640 (business-এর কয়েকটি MSc programme) পর্যন্ত; non-EU structured PhD fee সাধারণত বছরে প্রায় EUR 14,500–14,640।',
      'verified',
      [IE_GALWAY_UG_FEES, IE_GALWAY_PG_FEES],
    ),
    money: { amount: 13840, max: 21640, currency: 'EUR', period: 'year' },
  },
  deadlines: NOT_VERIFIED_FEE([IE_GALWAY_HOWTOAPPLY]),
  nextIntake: intake('varies', [IE_GALWAY_HOWTOAPPLY]),
  admission: txt('International (non-EU) applicants outside Ireland or the EU are directed to the university’s International Office for admission procedures; postgraduate applicants whose first language is not English must provide an English-proficiency test result.', 'Ireland বা EU-র বাইরের international (non-EU) আবেদনকারীদের ভর্তির প্রক্রিয়ার জন্য university-র International Office-এর দিকে নির্দেশ দেওয়া হয়; যাদের প্রথম ভাষা English না এমন postgraduate আবেদনকারীদের একটি English-দক্ষতার test result দিতে হয়।', 'partly-verified', [IE_GALWAY_HOWTOAPPLY]),
  english: txt(
    'University of Galway’s general requirement is IELTS 6.5 overall with no section below 6.0 (Academic or IELTS Online); applicants can also meet the standard via a recognised secondary-level exam taken in English, or by completing the university’s own Pre-Sessional or Pre-Masters Programme with at least 70% overall and 65% in each module.',
    'University of Galway-র সাধারণ শর্ত হলো IELTS 6.5 overall, কোনো section 6.0-এর নিচে না (Academic বা IELTS Online); আবেদনকারীরা English-এ নেওয়া একটি স্বীকৃত secondary-level পরীক্ষা দিয়ে, বা university-র নিজের Pre-Sessional বা Pre-Masters Programme অন্তত 70% overall আর প্রতি module-এ 65% দিয়ে সম্পূর্ণ করে এই standard পূরণ করতে পারেন।',
    'verified',
    [IE_GALWAY_ENTRY],
  ),
  documents: {
    required: [b('Prior academic certificates/transcripts', 'আগের academic সনদ/transcript'), b('An English-proficiency qualification (if your first language is not English)', 'একটি English-দক্ষতার যোগ্যতা (প্রথম ভাষা English না হলে)')],
    mayBeRequired: [b('Programme-specific documents listed on the individual course page', 'পৃথক course page-এ তালিকাভুক্ত programme-specific document')],
    status: 'partly-verified',
    sources: [IE_GALWAY_HOWTOAPPLY],
  },
  applicationFee: NOT_VERIFIED_FEE([IE_GALWAY_UG_FEES]),
  scholarships: NOT_VERIFIED_FEE([IE_GALWAY_HOWTOAPPLY]),
  applicationRoute: txt('Online via University of Galway’s own application system; non-EU/non-EEA applicants outside Ireland are directed to the International Office for the exact admission procedure.', 'University of Galway-র নিজস্ব application system-এ online; Ireland-এর বাইরের non-EU/non-EEA আবেদনকারীদের ঠিক ভর্তির প্রক্রিয়ার জন্য International Office-এর দিকে নির্দেশ দেওয়া হয়।', 'partly-verified', [IE_GALWAY_HOWTOAPPLY]),
  steps: {
    items: [
      { title: b('Choose a programme', 'একটি programme বাছুন'), body: b('Check whether it is undergraduate, taught postgraduate or a structured PhD, and its non-EU fee.', 'এটা undergraduate, taught postgraduate, বা structured PhD কিনা, আর এর non-EU fee দেখুন।') },
      { title: b('Confirm your English-proficiency route', 'আপনার English-দক্ষতার route নিশ্চিত করুন'), body: b('IELTS 6.5 overall, no section below 6.0, or an equivalent route.', 'IELTS 6.5 overall, কোনো section 6.0-এর নিচে না, বা একটি সমতুল্য route।') },
      { title: b('Apply via the university’s own system', 'University-র নিজস্ব system দিয়ে আবেদন করুন'), body: b('Non-EU/EEA applicants outside Ireland should contact the International Office for the exact procedure.', 'Ireland-এর বাইরের Non-EU/EEA আবেদনকারীদের ঠিক প্রক্রিয়ার জন্য International Office-এর সাথে যোগাযোগ করা উচিত।') },
      VISA_STEP,
      { title: b('Pay tuition and enrol', 'Tuition দিয়ে enrol করুন'), body: b('Non-EU fees are set per programme on the university’s own fee schedules.', 'Non-EU fee university-র নিজের fee schedule-এ প্রতি programme অনুযায়ী ঠিক।') },
    ],
    status: 'verified',
    sources: [IE_GALWAY_HOWTOAPPLY],
  },
  programs: [],
  lastVerified: READ,
};

export const IE_UNI_LAYER: CountryUniversityLayer = {
  code: 'IE',
  universities: [GALWAY, TCD, UCC, UCD],
  visaStats: [],
  unverified: [
    {
      id: 'ie-bd-visa-approval-rate',
      label: b('Bangladesh-specific D study visa approval or refusal rate', 'বাংলাদেশ-নির্দিষ্ট D study visa অনুমোদন বা প্রত্যাখ্যানের হার'),
      status: 'not-verified',
      note: 'No official, Bangladesh-specific visa approval-rate figure, or a verified country-wide international-student headcount broken down by nationality from an official Irish source, was found on the pages read, so none is shown as a visa statistic.',
    },
    {
      id: 'ie-d-visa-fee-amount',
      label: b('The exact current D study visa application fee', 'ঠিক বর্তমান D study visa application fee'),
      status: 'not-verified',
      note: 'Immigration Service Delivery’s own visa-fees page was not itemized with a specific current amount for the long-stay study visa in this research.',
    },
  ],
  lastVerified: READ,
};

import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  LT_EU_PORTAL,
  LT_ISM_MIGRATION,
  LT_MIGRIS_FEES,
  LT_READ,
  LT_STUDYIN_FEES,
  LT_STUDYIN_SCHOLARSHIPS,
  LT_STUDYIN_VISAS,
  LT_VU_BACHELORS,
} from './lt-sources';

/**
 * Lithuania reading guide, researched on its own from Lithuanian official
 * sources (the Migration Department under the Ministry of the Interior /
 * Migris, the European Commission's EU Immigration Portal page for
 * Lithuania, Study in Lithuania, and university pages). Nothing is taken
 * from another country's guide. Amounts stay in euros (EUR) and are never
 * converted. It covers English-taught programmes for non-EU/EEA
 * (Bangladeshi) students.
 */

const b = (en: string, bn: string): Bilingual => ({ en, bn });

interface Opts {
  list?: Bilingual[];
  status?: GuideStatus;
  kind?: GuideKind;
  discrepancy?: Bilingual;
  allDegrees?: boolean;
}
function qa(id: string, q: Bilingual, a: Bilingual[], sources: SourceRef[], o: Opts = {}): GuideAnswer {
  return {
    id,
    q,
    a,
    sources,
    confidence: 'high',
    ...(o.list ? { list: o.list } : {}),
    ...(o.status ? { status: o.status } : {}),
    ...(o.kind ? { kind: o.kind } : {}),
    ...(o.discrepancy ? { discrepancy: o.discrepancy } : {}),
    ...(o.allDegrees ? { allDegrees: true } : {}),
  };
}

const CHECK_UNI = b(
  'Requirements are not the same at every Lithuanian institution: each university sets its own country-specific documents, English proof and programme-specific rules (entrance tests, interviews). Always check the programme on the university\'s own admissions page.',
  'সব Lithuania-র university-তে শর্ত এক নয়: প্রতিটি university নিজের country-specific document, English প্রমাণ আর programme-specific নিয়ম (entrance test, interview) ঠিক করে। প্রতিটি programme-এর জন্য university-র নিজের admissions page অবশ্যই দেখে নিন।',
);

// ------------------------------------------------------------------ shared answers

const permit = (id: string) =>
  qa(
    id,
    b('What do you need for a Lithuanian residence permit for studies?', 'Lithuania-এর পড়ার residence permit-এর জন্য কী কী লাগে?'),
    [
      b(
        'Full-time degree students from outside the EU/EEA/Switzerland normally apply for a Temporary Residence Permit (TRP), granted for 2 years or the length of the studies if shorter (renewable; extended 3 months beyond the studies in the final year). You need the EPIS mediation-letter number your institution submits for you, proof of sufficient funds, proof of accommodation, health insurance, and — for a first permit, if you lived abroad for 2+ years in the last 2 years — a certificate of no criminal record. The state fee for a TRP based on admission to a Lithuanian study or doctoral programme is EUR 80 (general order, up to 2 months) or EUR 320 (urgent, up to 1 month).',
        'EU/EEA/Switzerland-এর বাইরের full-time degree student-রা সাধারণত Temporary Residence Permit (TRP)-এর আবেদন করেন, যা ২ বছরের জন্য বা পড়া কম হলে সেই সময়ের জন্য দেওয়া হয় (renewable; শেষ বছরে পড়ার চেয়ে ৩ মাস বেশি সময় পাওয়া যায়)। লাগে আপনার প্রতিষ্ঠানের জমা দেওয়া EPIS mediation-letter number, পর্যাপ্ত টাকার প্রমাণ, থাকার জায়গার প্রমাণ, health insurance, আর — প্রথম permit-এ, গত ২ বছরে ২+ বছর বিদেশে থাকলে — অপরাধমুক্ত থাকার সনদ। Lithuania-র study বা doctoral programme-এ ভর্তির ভিত্তিতে TRP-এর state fee EUR 80 (general order, ২ মাস পর্যন্ত) বা EUR 320 (urgent, ১ মাস পর্যন্ত)।',
      ),
      b(
        'Short-term exchange students (for example Erasmus/EMMIE) instead get a National Visa (D), valid up to 1 year and not renewable; it needs the same EPIS mediation number plus proof of funds (0.5x the minimum monthly wage per month, plus 1x the minimum monthly wage for the return trip) and health insurance (insurance sum at least EUR 30,000, per the EU Immigration Portal). Citizens of visa-free countries may instead apply for a TRP after arriving, but must finish the whole process within the 90-day visa-free stay.',
        'Short-term exchange student-রা (যেমন Erasmus/EMMIE) এর বদলে National Visa (D) পান, যা ১ বছর পর্যন্ত বৈধ আর renew হয় না; এতে একই EPIS mediation number, টাকার প্রমাণ (মাসে minimum monthly wage-এর 0.5x, আর ফিরতি যাত্রার জন্য minimum monthly wage-এর 1x) আর health insurance লাগে (EU Immigration Portal অনুযায়ী insurance sum অন্তত EUR 30,000)। Visa-free দেশের নাগরিকরা Lithuania পৌঁছানোর পরও TRP-এর আবেদন করতে পারেন, কিন্তু পুরো প্রক্রিয়া ৯০ দিনের visa-free থাকার মধ্যে শেষ করতে হয়।',
      ),
    ],
    [LT_EU_PORTAL, LT_MIGRIS_FEES, LT_ISM_MIGRATION, LT_STUDYIN_VISAS],
    { allDegrees: true, status: 'partly-verified' },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('What insurance do you need?', 'কী insurance লাগে?'),
    [
      b(
        'Official sources disagree on the minimum sum for a Temporary Residence Permit: the EU Immigration Portal states EUR 6,000, while ISM University\'s own migration guide states at least EUR 10,000 and lists what it must cover (urgent medical care and return-transport costs). Either way, the policy must be valid for your whole stay and cover urgent care and a possible return home for health reasons; check the exact sum with your own institution before buying.',
        'Temporary Residence Permit-এর জন্য সর্বনিম্ন insurance sum নিয়ে official source-এ মতভেদ আছে: EU Immigration Portal বলে EUR 6,000, আর ISM University-র নিজের migration guide বলে অন্তত EUR 10,000, সাথে কী কভার করতে হবে তাও বলে (urgent চিকিৎসা আর দেশে ফেরার পরিবহন খরচ)। যেটাই হোক, policy পুরো থাকার সময় বৈধ হতে হবে আর urgent care আর স্বাস্থ্যগত কারণে দেশে ফেরার খরচ কভার করতে হবে; কেনার আগে আপনার প্রতিষ্ঠানের কাছে সঠিক sum যাচাই করুন।',
      ),
    ],
    [LT_EU_PORTAL, LT_ISM_MIGRATION],
    { allDegrees: true, discrepancy: b('EU Immigration Portal: EUR 6,000 for a TRP. ISM University: at least EUR 10,000.', 'EU Immigration Portal: TRP-এর জন্য EUR 6,000। ISM University: অন্তত EUR 10,000।') },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'The rule is linked to the Lithuanian minimum monthly wage (MMA), so the exact euro amount changes when the MMA changes (it rose to EUR 1,153 on 1 January 2026). ISM University\'s guide — using the 2025 MMA — asked for at least EUR 7,266 for a full year (EUR 519 x 12 months, plus EUR 1,038 for the return trip); check the current figure with your own institution before applying, since this amount was not re-verified on an official page after the 2026 rise.',
        'এই নিয়ম Lithuania-র minimum monthly wage (MMA)-র সাথে যুক্ত, তাই MMA বদলালে euro-র সঠিক পরিমাণও বদলায় (১ January 2026-এ এটা EUR 1,153-এ উঠেছে)। ISM University-র guide — 2025-এর MMA ব্যবহার করে — এক পূর্ণ বছরের জন্য অন্তত EUR 7,266 চেয়েছে (EUR 519 x ১২ মাস, আর ফিরতি যাত্রার জন্য EUR 1,038); 2026-এর বৃদ্ধির পরে কোনো official page-এ এই পরিমাণ পুনরায় যাচাই হয়নি, তাই আবেদনের আগে আপনার প্রতিষ্ঠানের কাছে বর্তমান পরিমাণ যাচাই করুন।',
      ),
    ],
    [LT_ISM_MIGRATION, LT_EU_PORTAL],
    { allDegrees: true, status: 'partly-verified' },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Lithuania?', 'Lithuania-এ পড়ার পাশাপাশি কাজ করা যায়?'),
    [
      b(
        'Yes: the EU Immigration Portal\'s page for Lithuania says students have the right to work up to 20 hours a week, except during the holiday period set by the educational institution — and this time limit does not apply to foreigners studying for a doctorate, who may work without that cap.',
        'হ্যাঁ: Lithuania-র জন্য EU Immigration Portal-এর page বলে student-দের সপ্তাহে ২০ ঘণ্টা পর্যন্ত কাজের অধিকার আছে, শুধু প্রতিষ্ঠানের নির্ধারিত ছুটির সময় বাদে — আর doctoral পড়া বিদেশিদের জন্য এই সীমা প্রযোজ্য নয়, তারা এই সীমা ছাড়াই কাজ করতে পারেন।',
      ),
    ],
    [LT_EU_PORTAL],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Lithuania after graduating?', 'পড়া শেষে Lithuania-এ থাকা যায়?'),
    [
      b(
        'Yes: after completing your studies you can apply for a temporary residence permit to look for work or start a business, valid for 12 months. The Migration Department charges no state fee for this one application — a graduate gets it free of charge once, at their choice. After five continuous years of legal residence in Lithuania you may also apply for permanent-resident status.',
        'হ্যাঁ: পড়া শেষ করার পর কাজ খোঁজা বা ব্যবসা শুরুর জন্য ১২ মাসের temporary residence permit-এর আবেদন করা যায়। Migration Department এই একটি আবেদনের জন্য কোনো state fee নেয় না — একজন graduate নিজের পছন্দে একবার এটা বিনা খরচে পান। Lithuania-য় ধারাবাহিক পাঁচ বছর বৈধভাবে থাকার পর permanent-resident status-এর জন্যও আবেদন করা যায়।',
      ),
    ],
    [LT_EU_PORTAL, LT_MIGRIS_FEES],
    { allDegrees: true },
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'Study in Lithuania lists the Lithuanian State Scholarship for full-time master\'s studies (run by the Education Exchanges Support Foundation): 70 grants in the 2026 call, a monthly scholarship of 8 Basic Social Amounts (EUR 592 in 2026) plus a grant covering the study cost up to the national standard. Its quota, however, names citizens of Armenia, Azerbaijan, China, Georgia, Indonesia, Israel, Japan, Kazakhstan, Moldova, New Zealand, the Philippines, South Korea, Ukraine, the USA, Uzbekistan and Vietnam (plus foreign citizens of Lithuanian origin) — Bangladesh is not on that list, so this specific state scholarship was not found to be open to Bangladeshi applicants. Separately, Study in Lithuania confirms that international students, including non-EU students, can apply for state-funded (tuition-free) PhD places, and that universities also award their own tuition-fee waivers (for example at Vytautas Magnus University and Kaunas University of Technology), open to all nationalities but set per university and intake.',
        'Study in Lithuania-তে master\'s-এর জন্য Lithuanian State Scholarship-এর তালিকা আছে (Education Exchanges Support Foundation চালায়): 2026 call-এ ৭০টি grant, মাসিক scholarship 8 Basic Social Amount (2026-এ EUR 592) আর national standard পর্যন্ত পড়ার খরচ কভার করা একটি grant। কিন্তু এর quota-তে নাম আছে Armenia, Azerbaijan, China, Georgia, Indonesia, Israel, Japan, Kazakhstan, Moldova, New Zealand, Philippines, South Korea, Ukraine, USA, Uzbekistan আর Vietnam-এর নাগরিক (সাথে Lithuanian বংশোদ্ভূত বিদেশিরা) — Bangladesh সেই তালিকায় নেই, তাই এই নির্দিষ্ট সরকারি scholarship Bangladesh-এর আবেদনকারীদের জন্য খোলা পাওয়া যায়নি। আলাদাভাবে, Study in Lithuania নিশ্চিত করে যে international student, non-EU student-সহ, state-funded (tuition-free) PhD জায়গার জন্য আবেদন করতে পারেন, আর university-গুলোও নিজেদের tuition-fee waiver দেয় (যেমন Vytautas Magnus University আর Kaunas University of Technology-তে), যা সব জাতীয়তার জন্য খোলা কিন্তু university আর intake অনুযায়ী আলাদা।',
      ),
    ],
    [LT_STUDYIN_SCHOLARSHIPS, LT_STUDYIN_FEES],
    { status: 'partly-verified' },
  );

const apply = (id: string) =>
  qa(
    id,
    b('When and how do you apply?', 'কখন আর কীভাবে আবেদন করবেন?'),
    [
      b(
        'There is no single national joint application: each Lithuanian university runs its own online application portal and its own deadline for the autumn intake, so the exact dates depend on the university and programme you choose. Once admitted and after paying tuition (or confirming a state-funded or scholarship place), your university issues the EPIS mediation-letter number you need for the residence-permit application.',
        'কোনো একক জাতীয় joint application নেই: প্রতিটি Lithuania-র university-র নিজস্ব online application portal আর autumn intake-এর নিজস্ব deadline আছে, তাই সঠিক তারিখ university আর programme অনুযায়ী আলাদা। ভর্তি হওয়ার পর আর tuition দেওয়ার (বা state-funded বা scholarship জায়গা নিশ্চিত হওয়ার) পরে, আপনার university residence-permit আবেদনের জন্য প্রয়োজনীয় EPIS mediation-letter number দেয়।',
      ),
    ],
    [LT_VU_BACHELORS, LT_STUDYIN_VISAS],
    { kind: 'guidance' },
  );

// ------------------------------------------------------------------ documents

const MIGRIS = b('The Migration Department under the Ministry of the Interior (Migris).', 'Ministry of the Interior-এর অধীনে Migration Department (Migris)।');

export const LT_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Needed for the university application and as your identity document for the residence permit or visa.', 'University-র আবেদনে আর residence permit বা visa-তে পরিচয়ের document হিসেবে লাগে।'),
    who: MIGRIS,
    when: b('From the application through the whole residence-permit process.', 'আবেদন থেকে পুরো residence-permit প্রক্রিয়া পর্যন্ত।'),
    where: b('Submitted via the MIGRIS online system and at your appointment (in person or at an external service provider/VFS).', 'MIGRIS online system-এ আর appointment-এ (সশরীরে বা external service provider/VFS-এ) জমা দিতে হয়।'),
    prepare: b('Keep it valid for at least 2 years where possible; a shorter validity shortens your permit.', 'যত সম্ভব অন্তত ২ বছর বৈধ রাখুন; কম হলে আপনার permit-এর মেয়াদও কমে যায়।'),
    groups: ['general', 'visa'],
    sources: [LT_EU_PORTAL],
  },
  {
    id: 'academic',
    name: b('Certificates and transcripts', 'সনদ আর transcript'),
    why: b('University document (before admission): shows your previous education qualifies you for the programme and is used for academic recognition.', 'University-র document (ভর্তির আগে): দেখায় আগের পড়া programme-এর যোগ্যতা দেয়, আর academic recognition-এ ব্যবহার হয়।'),
    who: b('The university you apply to.', 'যে university-তে আবেদন করছেন।'),
    when: b('With your application, by the university\'s deadline.', 'University-র শেষ তারিখের মধ্যে আবেদনের সঙ্গে।'),
    where: b('Uploaded to the university\'s own application portal.', 'University-র নিজস্ব application portal-এ upload।'),
    prepare: b('Documents not in English or Lithuanian need an official translation; foreign-issued documents may need legalisation or an Apostille.', 'ইংরেজি বা Lithuanian-এ না থাকলে official translation লাগে; বিদেশে ইস্যু করা document-এ legalisation বা Apostille লাগতে পারে।'),
    groups: ['general', 'program'],
    sources: [LT_VU_BACHELORS],
  },
  {
    id: 'english',
    name: b('English proficiency proof', 'ইংরেজি দক্ষতার প্রমাণ'),
    why: b('University document for English-taught programmes; accepted tests and minimum scores are set by each university (and sometimes its own English test).', 'ইংরেজি-মাধ্যম programme-এর university document; গ্রহণযোগ্য test আর ন্যূনতম score প্রতিটি university ঠিক করে (কখনো নিজস্ব English test-ও)।'),
    who: b('The university you apply to.', 'যে university-তে আবেদন করছেন।'),
    when: b('By the programme\'s deadline.', 'Programme-এর শেষ তারিখের মধ্যে।'),
    where: b('As instructed by the university\'s admissions page.', 'University-র admissions page-এর নির্দেশ অনুযায়ী।'),
    prepare: b('IELTS, TOEFL, Cambridge English and similar tests are commonly accepted; check the university\'s own defined list.', 'IELTS, TOEFL, Cambridge English আর এরকম test সাধারণত গ্রহণযোগ্য; university-র নিজস্ব তালিকা দেখুন।'),
    groups: ['program'],
    sources: [LT_VU_BACHELORS],
  },
  {
    id: 'country-specific',
    name: b('Country-specific documents (Bangladesh)', 'দেশ-নির্দিষ্ট document (Bangladesh)'),
    why: b('Some universities, including Vilnius University, list a separate set of country-specific admission requirements for Bangladeshi applicants; the exact extra documents were not read from that page here.', 'কিছু university, যেমন Vilnius University, Bangladesh-এর আবেদনকারীদের জন্য আলাদা country-specific ভর্তির শর্ত তালিকাভুক্ত করে; এখান থেকে সেই পাতার সঠিক অতিরিক্ত document পড়া হয়নি।'),
    who: b('The university\'s admissions office.', 'University-র admissions office।'),
    when: b('With your application.', 'আবেদনের সঙ্গে।'),
    where: b('The university\'s own country-specific requirements page.', 'University-র নিজস্ব country-specific requirements page।'),
    prepare: b('Check the exact list for Bangladesh on your chosen university\'s page before applying.', 'আবেদনের আগে আপনার university-র page-এ Bangladesh-এর জন্য সঠিক তালিকা দেখুন।'),
    groups: ['general', 'bangladesh'],
    status: 'not-verified',
    sources: [LT_VU_BACHELORS],
  },
  {
    id: 'research',
    name: b('Doctoral application documents (PhD)', 'Doctoral আবেদনের document (PhD)'),
    why: b('Doctoral admission (research proposal, supervisor agreement) is decided by each university\'s own doctoral programme.', 'Doctoral ভর্তি (research proposal, supervisor agreement) প্রতিটি university-র নিজস্ব doctoral programme ঠিক করে।'),
    who: b('The university\'s doctoral school.', 'University-র doctoral school।'),
    when: b('By the doctoral programme\'s own deadline.', 'Doctoral programme-এর নিজস্ব শেষ তারিখের মধ্যে।'),
    where: b('The university\'s doctoral admissions page.', 'University-র doctoral admissions page।'),
    prepare: b('Not verified here as a general rule — follow the programme.', 'সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি — programme অনুসরণ করুন।'),
    groups: ['program'],
    degrees: ['phd'],
    status: 'not-verified',
    sources: [LT_STUDYIN_FEES],
  },
  {
    id: 'epis',
    name: b('EPIS mediation-letter number', 'EPIS mediation-letter number (মধ্যস্থতা-চিঠির নম্বর)'),
    why: b('Residence-permit requirement: your institution submits this mediation letter electronically through EPIS, and you quote its number on your MIGRIS application.', 'Residence-permit-এর শর্ত: আপনার প্রতিষ্ঠান EPIS-এর মাধ্যমে electronically এই mediation letter জমা দেয়, আর আপনি MIGRIS আবেদনে এর number দেন।'),
    who: b('Your university, after admission (and after tuition is paid where required).', 'ভর্তির পর (আর প্রয়োজন হলে tuition দেওয়ার পর) আপনার university।'),
    when: b('Before you submit the residence-permit or visa application.', 'Residence-permit বা visa আবেদনের আগে।'),
    where: b('Submitted by the university through EPIS; you use the number in MIGRIS.', 'University EPIS-এর মাধ্যমে জমা দেয়; আপনি MIGRIS-এ number ব্যবহার করেন।'),
    prepare: b('Request it from your university\'s International Office as soon as you are admitted.', 'ভর্তি হওয়ার সাথে সাথেই university-র International Office-এর কাছে চান।'),
    groups: ['visa'],
    sources: [LT_EU_PORTAL, LT_ISM_MIGRATION],
  },
  {
    id: 'finance',
    name: b('Proof of funds', 'টাকার প্রমাণ'),
    why: b('Residence-permit or visa requirement: a bank statement (or proof of regular income, or a parent\'s financial-support letter) showing enough money for your stay, tied to the Lithuanian minimum monthly wage.', 'Residence-permit বা visa-র শর্ত: bank statement (বা নিয়মিত income-এর প্রমাণ, বা বাবা-মায়ের আর্থিক সহায়তার চিঠি) যা Lithuania-র minimum monthly wage-এর সাথে যুক্ত পর্যাপ্ত টাকা দেখায়।'),
    who: MIGRIS,
    when: b('When you submit the application.', 'আবেদন জমার সময়।'),
    where: b('Uploaded in MIGRIS.', 'MIGRIS-এ upload।'),
    prepare: b('The exact euro amount moves with the minimum monthly wage — confirm the current figure with your university or the Migration Department before applying.', 'সঠিক euro পরিমাণ minimum monthly wage-এর সাথে বদলায় — আবেদনের আগে university বা Migration Department-এর কাছে বর্তমান পরিমাণ যাচাই করুন।'),
    groups: ['visa', 'bangladesh'],
    sources: [LT_ISM_MIGRATION],
  },
  {
    id: 'insurance',
    name: b('Health insurance document', 'Health insurance-এর document'),
    why: b('Residence-permit or visa requirement: private insurance (or proof of compulsory insurance) covering urgent medical care and, in some readings, return transport.', 'Residence-permit বা visa-র শর্ত: urgent চিকিৎসা আর কিছু source অনুযায়ী ফিরতি পরিবহন কভার করা private insurance (বা compulsory insurance-এর প্রমাণ)।'),
    who: MIGRIS,
    when: b('With the application; valid for your whole stay.', 'আবেদনের সঙ্গে; পুরো থাকার সময় বৈধ।'),
    where: b('Uploaded in MIGRIS.', 'MIGRIS-এ upload।'),
    prepare: b('The minimum sum is disputed between sources (EUR 6,000 to EUR 10,000+ for a TRP) — check the exact figure with your own institution before buying a policy.', 'সর্বনিম্ন sum নিয়ে source-গুলোর মধ্যে মতভেদ আছে (TRP-এর জন্য EUR 6,000 থেকে EUR 10,000+) — policy কেনার আগে আপনার প্রতিষ্ঠানের কাছে সঠিক পরিমাণ যাচাই করুন।'),
    groups: ['visa', 'arrival'],
    sources: [LT_EU_PORTAL, LT_ISM_MIGRATION],
  },
  {
    id: 'residence-declaration',
    name: b('Declaration of your place of residence', 'থাকার জায়গার declaration'),
    why: b('After your TRP is issued, Lithuanian law requires you to declare the address where you live; a proof-of-accommodation document is also needed at the application stage.', 'আপনার TRP ইস্যু হওয়ার পর, Lithuania-র আইন অনুযায়ী আপনাকে থাকার ঠিকানা declare করতে হয়; আবেদনের সময়ও থাকার জায়গার প্রমাণ লাগে।'),
    who: MIGRIS,
    when: b('At application (accommodation proof) and again after arrival, once you have an address.', 'আবেদনের সময় (থাকার প্রমাণ) আর পৌঁছানোর পর, ঠিকানা পেলে, আবারও।'),
    where: b('Declared through MIGRIS or at the local Migration Department office.', 'MIGRIS-এর মাধ্যমে বা স্থানীয় Migration Department office-এ declare করতে হয়।'),
    prepare: b('You may indicate on the application that you will declare residence within one month of arrival.', 'আবেদনে বলা যায় যে পৌঁছানোর এক মাসের মধ্যে থাকার ঠিকানা declare করবেন।'),
    groups: ['visa', 'arrival'],
    sources: [LT_EU_PORTAL, LT_ISM_MIGRATION],
  },
];

// ------------------------------------------------------------------ costs (EUR, never converted)

const PERMIT_FEE: GuideCost = { id: 'visa-fee', label: b('Temporary Residence Permit for studies (general order)', 'পড়ার Temporary Residence Permit (general order)'), value: b('EUR 80 (EUR 320 urgent)', 'EUR 80 (urgent-এ EUR 320)'), amount: { value: 80, currency: 'EUR', period: 'one-time' }, source: LT_MIGRIS_FEES };
const FUNDS: GuideCost = { id: 'funds-living', label: b('Funds in your account (ISM University figure, year, 2025 minimum wage)', 'Account-এ টাকা (ISM University-র হিসাব, বছর, 2025-এর minimum wage)'), value: b('EUR 7,266 for a full year (not re-verified after the 2026 minimum-wage rise)', 'এক পূর্ণ বছরের জন্য EUR 7,266 (2026-এর minimum-wage বৃদ্ধির পরে পুনরায় যাচাই হয়নি)'), status: 'partly-verified', amount: { value: 7266, currency: 'EUR', period: 'year' }, source: LT_ISM_MIGRATION };
const APP_FEE: GuideCost = { id: 'application-fee', label: b('University application fee (example: Vilnius University, KTU)', 'University-র application fee (উদাহরণ: Vilnius University, KTU)'), value: b('EUR 100 per application', 'প্রতি আবেদনে EUR 100'), amount: { value: 100, currency: 'EUR', period: 'one-time' }, source: LT_VU_BACHELORS };
const TUITION_BACHELORS: GuideCost = { id: 'tuition', label: b("Tuition — Bachelor's (Study in Lithuania, national average)", "Tuition — Bachelor's (Study in Lithuania, জাতীয় গড়)"), value: b('From EUR 1,300 a year', 'বছরে EUR 1,300 থেকে'), status: 'partly-verified', amount: { value: 1300, currency: 'EUR', period: 'year' }, source: LT_STUDYIN_FEES };
const TUITION_MASTERS: GuideCost = { id: 'tuition', label: b("Tuition — Master's (Study in Lithuania, national average)", "Tuition — Master's (Study in Lithuania, জাতীয় গড়)"), value: b('From EUR 2,300 a year', 'বছরে EUR 2,300 থেকে'), status: 'partly-verified', amount: { value: 2300, currency: 'EUR', period: 'year' }, source: LT_STUDYIN_FEES };
const TUITION_PHD: GuideCost = { id: 'tuition', label: b('Tuition — PhD (Study in Lithuania, national average; state-funded places also exist for international students)', 'Tuition — PhD (Study in Lithuania, জাতীয় গড়; international student-দের জন্য state-funded জায়গাও আছে)'), value: b('From EUR 8,400 a year (or tuition-free if you win a state-funded place)', 'বছরে EUR 8,400 থেকে (বা state-funded জায়গা পেলে tuition-free)'), status: 'partly-verified', amount: { value: 8400, currency: 'EUR', period: 'year' }, source: LT_STUDYIN_FEES };
const UNVERIFIED: GuideCost[] = [
  { id: 'insurance', label: b('Health insurance (TRP)', 'Health insurance (TRP)'), value: b('Disputed between sources (EUR 6,000–10,000+ sum insured) — check with your institution', 'Source-গুলোর মধ্যে মতভেদ (EUR 6,000–10,000+ sum insured) — আপনার প্রতিষ্ঠানের কাছে যাচাই করুন'), status: 'needs-review', source: LT_EU_PORTAL },
  { id: 'rent', label: b('Accommodation', 'বাসাভাড়া'), value: b('Not verified — varies by city (Vilnius, Kaunas and smaller cities differ)', 'যাচাই হয়নি — শহর অনুযায়ী আলাদা (Vilnius, Kaunas আর ছোট শহরে আলাদা)'), status: 'not-verified', source: LT_STUDYIN_VISAS },
];

// ------------------------------------------------------------------ common sections

const commonTail = () => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [{ embed: 'costs' as const }, funds('funds')] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa('types', b('Which universities are there?', 'কোন কোন university আছে?'), [b('The examples below are Lithuanian universities, listed alphabetically, not ordered by quality. Tuition, entry requirements and scholarships differ at each, so check the official page.', 'নিচের উদাহরণগুলো Lithuania-র university, বর্ণানুক্রমে, মান অনুযায়ী নয়। Tuition, ভর্তির শর্ত আর scholarship প্রতিটিতে আলাদা, তাই official page দেখুন।')], [LT_STUDYIN_FEES]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work')] },
  { id: 'visa', title: b('Residence permit', 'Residence permit'), items: [permit('visa'), insurance('insurance')] },
  { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('No national joint application · TRP state fee EUR 80', 'কোনো জাতীয় joint application নেই · TRP state fee EUR 80'),
  intro: b(
    "For an English-taught bachelor's in Lithuania you need secondary education that qualifies you for higher education in your home country, plus the university's own and country-specific requirements (often an English test or the university's own test, a motivation letter, and for Bangladeshi applicants a separate country-specific document list at some universities). You apply directly to each university's own portal (no national joint application), pay the application and tuition fees, and apply for a Temporary Residence Permit once admitted.",
    "Lithuania-এ ইংরেজি-মাধ্যম bachelor's-এর জন্য লাগে এমন secondary education, যা আপনার দেশে উচ্চশিক্ষার যোগ্যতা দেয়, সঙ্গে university-র নিজস্ব আর country-specific শর্ত (প্রায়ই English test বা university-র নিজস্ব test, motivation letter, আর কিছু university-তে Bangladesh-এর আবেদনকারীদের জন্য আলাদা country-specific document তালিকা)। আবেদন করতে হয় সরাসরি প্রতিটি university-র নিজস্ব portal-এ (কোনো জাতীয় joint application নেই), application আর tuition fee দিয়ে, আর ভর্তি হওয়ার পর Temporary Residence Permit-এর আবেদন করে।",
  ),
  costs: { official: [PERMIT_FEE, FUNDS, APP_FEE], estimates: [TUITION_BACHELORS, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in Lithuania from Bangladesh?", "Bangladesh থেকে Lithuania-এ Bachelor's পড়তে কী কী লাগে?"),
          [b('Secondary education that qualifies you for higher education at home, the university\'s general and country-specific requirements (Vilnius University, for example, lists Bangladesh among the countries with their own extra requirements), an English-proficiency proof, a motivation letter, the university application fee (around EUR 100), tuition paid, proof of funds, insurance and a Temporary Residence Permit (state fee EUR 80).', 'দেশে উচ্চশিক্ষার যোগ্যতা দেয় এমন secondary education, university-র সাধারণ আর country-specific শর্ত (যেমন Vilnius University Bangladesh-কে নিজের আলাদা শর্তযুক্ত দেশের তালিকায় রাখে), English-proficiency-র প্রমাণ, motivation letter, university-র application fee (প্রায় EUR 100), tuition দেওয়া, টাকার প্রমাণ, insurance আর Temporary Residence Permit (state fee EUR 80)।'), CHECK_UNI],
          [LT_VU_BACHELORS, LT_MIGRIS_FEES, LT_ISM_MIGRATION],
        ),
        qa(
          'hsc',
          b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"),
          [b('Not verified yet for Bangladesh specifically: Vilnius University asks for secondary education that grants access to higher education in your home country, and separately asks that the gap between your last qualification and the application not exceed 5 years for non-EU/EFTA applicants — but how the Bangladesh HSC specifically is assessed, and whether other universities set the same 5-year rule, was not read on an official page.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে পুরোপুরি যাচাই হয়নি: Vilnius University দেশে উচ্চশিক্ষার যোগ্যতা দেয় এমন secondary education চায়, আর আলাদাভাবে non-EU/EFTA আবেদনকারীদের জন্য শেষ যোগ্যতা আর আবেদনের মধ্যে ৫ বছরের বেশি ফাঁক না থাকার শর্ত দেয় — কিন্তু Bangladesh-এর HSC ঠিক কীভাবে মূল্যায়ন হয়, আর অন্য university-তেও এই ৫-বছরের নিয়ম আছে কিনা, কোনো official page-এ পড়া হয়নি।')],
          [LT_VU_BACHELORS],
          { status: 'not-verified' },
        ),
      ],
    },
    { id: 'apply', title: b('Applying', 'আবেদন'), items: [apply('process')] },
    {
      id: 'language',
      title: b('English and Lithuanian', 'ইংরেজি আর Lithuanian'),
      items: [
        qa(
          'english',
          b("How much IELTS do you need for a Bachelor's in Lithuania?", "Lithuania-এ Bachelor's-এ IELTS কত লাগে?"),
          [b('Set by each university: Kaunas University of Technology, for example, accepts IELTS 5.5 or above (with every component at least 5.5), TOEFL iBT 75 or above, or CEFR B2 or above; other universities set their own list and may run their own free English test if you have none. This guide covers English-taught programmes only; Lithuanian-taught programmes have their own language requirement.', 'প্রতিটি university নিজে ঠিক করে: যেমন Kaunas University of Technology IELTS 5.5 বা তার বেশি (প্রতিটি অংশে অন্তত 5.5), TOEFL iBT 75 বা তার বেশি, বা CEFR B2 বা তার বেশি গ্রহণ করে; অন্য university নিজস্ব তালিকা ঠিক করে আর কোনো test না থাকলে নিজস্ব বিনামূল্যের English test নিতে পারে। এই guide শুধু ইংরেজি-মাধ্যম programme নিয়ে; Lithuanian-মাধ্যম programme-এর নিজস্ব ভাষার শর্ত আছে।'), CHECK_UNI],
          [LT_VU_BACHELORS],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'tuition',
      title: b('Tuition and scholarships', 'Tuition আর scholarship'),
      items: [
        qa(
          'tuition',
          b("How much is a Bachelor's in Lithuania?", "Lithuania-এ Bachelor's-এ খরচ কত?"),
          [b('Study in Lithuania states the national average starts from EUR 1,300 a year for bachelor\'s studies; the exact fee is set per university and programme (examples: Kaunas University of Technology charges EUR 3,250–5,676 a year by study field for 2026/27, and Vytautas Magnus University EUR 3,250–4,400 a year).', 'Study in Lithuania বলে bachelor\'s পড়ায় জাতীয় গড় শুরু হয় বছরে EUR 1,300 থেকে; সঠিক fee university আর programme অনুযায়ী ঠিক হয় (উদাহরণ: Kaunas University of Technology 2026/27-এ study field অনুযায়ী বছরে EUR 3,250–5,676 নেয়, আর Vytautas Magnus University বছরে EUR 3,250–4,400)।')],
          [LT_STUDYIN_FEES],
          { kind: 'estimate', status: 'partly-verified' },
        ),
        scholarships('scholarships'),
      ],
    },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b("Bachelor's needed · state scholarship quotas do not list Bangladesh", "Bachelor's লাগে · সরকারি scholarship quota-তে Bangladesh নেই"),
  intro: b(
    "A Lithuanian master's needs a bachelor's degree (or equivalent) plus the university's own and programme-specific requirements. Each university runs its own application and sets its own tuition (national average from EUR 2,300 a year, Study in Lithuania). The Lithuanian State Scholarship covers full-time master's studies with a monthly stipend, but its named quota does not currently include Bangladesh — check each university's own fee-waiver scholarships instead.",
    "Lithuania-র master's-এ লাগে bachelor's degree (বা সমমান) সঙ্গে university-র নিজস্ব আর programme-specific শর্ত। প্রতিটি university নিজস্ব আবেদন চালায় আর নিজস্ব tuition ঠিক করে (জাতীয় গড় বছরে EUR 2,300 থেকে, Study in Lithuania)। Lithuanian State Scholarship full-time master's পড়ায় মাসিক stipend সহ কভার করে, কিন্তু এর নামযুক্ত quota-তে এখন Bangladesh নেই — তার বদলে প্রতিটি university-র নিজস্ব fee-waiver scholarship দেখুন।",
  ),
  costs: { official: [PERMIT_FEE, FUNDS, APP_FEE], estimates: [TUITION_MASTERS, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in Lithuania?", "Lithuania-এ Master's-এ কী লাগে?"),
          [b("A bachelor's degree (or equivalent) recognised as giving access to the programme, plus the university's own requirements (English proof, motivation letter, sometimes an interview or portfolio). How Lithuanian universities assess a Bangladeshi bachelor's degree specifically was not verified here.", "Programme-এর যোগ্যতা দেয় বলে স্বীকৃত bachelor's degree (বা সমমান), সঙ্গে university-র নিজস্ব শর্ত (English প্রমাণ, motivation letter, কখনো interview বা portfolio)। Lithuania-র university Bangladesh-এর bachelor's degree ঠিক কীভাবে মূল্যায়ন করে, এখানে যাচাই হয়নি।"), CHECK_UNI],
          [LT_VU_BACHELORS],
          { status: 'partly-verified' },
        ),
      ],
    },
    { id: 'apply', title: b('Applying', 'আবেদন'), items: [apply('process')] },
    {
      id: 'language',
      title: b('English and IELTS', 'ইংরেজি আর IELTS'),
      items: [
        qa(
          'english',
          b("How much IELTS do you need for a Master's?", "Master's-এ IELTS কত লাগে?"),
          [b('Not verified yet: set by each university and programme, with no single national minimum for master\'s programmes.', 'এখনো যাচাই হয়নি: প্রতিটি university আর programme ঠিক করে; master\'s programme-এর জন্য একক জাতীয় ন্যূনতম নেই।'), CHECK_UNI],
          [LT_VU_BACHELORS],
          { status: 'not-verified' },
        ),
      ],
    },
    {
      id: 'tuition',
      title: b('Tuition and scholarships', 'Tuition আর scholarship'),
      items: [
        qa(
          'tuition',
          b("How much is a Master's in Lithuania?", "Lithuania-এ Master's-এ খরচ কত?"),
          [b("Study in Lithuania states the national average starts from EUR 2,300 a year; examples: Kaunas University of Technology charges EUR 3,250–5,676 a year by study field (2026/27), and Vytautas Magnus University EUR 3,250–4,400 a year for its bachelor's fields (its master's chart was not itemised on the page read).", "Study in Lithuania বলে জাতীয় গড় শুরু হয় বছরে EUR 2,300 থেকে; উদাহরণ: Kaunas University of Technology 2026/27-এ study field অনুযায়ী বছরে EUR 3,250–5,676 নেয়, আর Vytautas Magnus University-র bachelor's field-এ বছরে EUR 3,250–4,400 (এর master's chart পড়া page-এ তালিকাভুক্ত ছিল না)।")],
          [LT_STUDYIN_FEES],
          { kind: 'estimate', status: 'partly-verified' },
        ),
        scholarships('scholarships'),
      ],
    },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ PhD

const PHD: DegreeGuide = {
  level: 'phd',
  card: b('State-funded places open to non-EU students · no time limit on work', 'Non-EU student-দের জন্য state-funded জায়গা খোলা · কাজে সময়ের সীমা নেই'),
  intro: b(
    'Study in Lithuania confirms that international students, including non-EU students, can apply for state-funded (tuition-free) PhD places, alongside paid places (national average from EUR 8,400 a year). Doctoral students are also exempt from the 20-hour-a-week work limit that applies to other students. Admission, supervision and funding are arranged with each university\'s own doctoral school.',
    'Study in Lithuania নিশ্চিত করে যে international student, non-EU student-সহ, state-funded (tuition-free) PhD জায়গার জন্য আবেদন করতে পারেন, paid জায়গার পাশাপাশি (জাতীয় গড় বছরে EUR 8,400 থেকে)। অন্য student-দের জন্য প্রযোজ্য সপ্তাহে ২০ ঘণ্টার কাজের সীমা doctoral student-দের উপর প্রযোজ্য নয়। ভর্তি, supervision আর funding প্রতিটি university-র নিজস্ব doctoral school-এর সঙ্গে ঠিক হয়।',
  ),
  costs: { official: [PERMIT_FEE, FUNDS], estimates: [TUITION_PHD, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Lithuania?', 'Lithuania-এ কীভাবে PhD পাওয়া যায়?'),
          [
            b('International students, including non-EU students, are eligible for state-funded (tuition-free) doctoral places; paid places also exist (national average from EUR 8,400 a year). Entry requirements, application rounds, English scores and supervisor arrangements are set by each university\'s own doctoral school and were not verified here as general rules.', 'International student, non-EU student-সহ, state-funded (tuition-free) doctoral জায়গার জন্য যোগ্য; paid জায়গাও আছে (জাতীয় গড় বছরে EUR 8,400 থেকে)। ভর্তির শর্ত, আবেদনের সময়, English score আর supervisor-এর ব্যবস্থা প্রতিটি university-র নিজস্ব doctoral school ঠিক করে, সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি।'),
            CHECK_UNI,
          ],
          [LT_STUDYIN_FEES],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('English and IELTS', 'ইংরেজি আর IELTS'),
      items: [
        qa(
          'english',
          b('How much IELTS do you need for a PhD?', 'PhD-তে IELTS কত লাগে?'),
          [b('Not verified yet as a general rule: each university\'s doctoral school states its own English requirement.', 'সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: প্রতিটি university-র doctoral school নিজের ইংরেজি শর্ত দেয়।')],
          [LT_STUDYIN_FEES],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ the country

export const LT_GUIDE: CountryGuide = {
  code: 'LT',
  checkedAt: LT_READ,
  sourcesPerSection: true,
  intro: b(
    "Lithuania has no national joint application: you apply directly to each university's own portal, with its own tuition (national averages from EUR 1,300 a year for bachelor's, EUR 2,300 master's, EUR 8,400 PhD, per Study in Lithuania) and its own English or country-specific requirements — Vilnius University, for example, lists Bangladesh among the countries with extra requirements. Full-time degree students from outside the EU/EEA normally apply for a Temporary Residence Permit (state fee EUR 80), need funds tied to the minimum monthly wage and health insurance (whose minimum sum is disputed between official sources), and may work up to 20 hours a week (doctoral students are exempt from that cap and can also apply for tuition-free state-funded places). After graduating, you may apply once, free of charge, for a 12-month permit to look for work. This guide is built from the Migration Department (Migris), the EU Immigration Portal's Lithuania page, Study in Lithuania and university pages.",
    "Lithuania-তে কোনো জাতীয় joint application নেই: সরাসরি প্রতিটি university-র নিজস্ব portal-এ আবেদন করতে হয়, নিজস্ব tuition (জাতীয় গড় bachelor's-এ বছরে EUR 1,300, master's EUR 2,300, PhD EUR 8,400 থেকে, Study in Lithuania অনুযায়ী) আর নিজস্ব English বা country-specific শর্ত সহ — যেমন Vilnius University অতিরিক্ত শর্তযুক্ত দেশের তালিকায় Bangladesh-কে রাখে। EU/EEA-র বাইরের full-time degree student-রা সাধারণত Temporary Residence Permit-এর আবেদন করেন (state fee EUR 80), minimum monthly wage-এর সাথে যুক্ত টাকা আর health insurance লাগে (যার সর্বনিম্ন sum নিয়ে official source-এ মতভেদ আছে), আর সপ্তাহে ২০ ঘণ্টা পর্যন্ত কাজ করা যায় (doctoral student-রা এই সীমার বাইরে, আর tuition-free state-funded জায়গার জন্যও আবেদন করতে পারেন)। পড়া শেষে, একবার বিনা খরচে কাজ খোঁজার জন্য ১২ মাসের permit-এর আবেদন করা যায়। এই guide Migration Department (Migris), EU Immigration Portal-এর Lithuania page, Study in Lithuania আর university-র page থেকে তৈরি।",
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [LT_EU_PORTAL, LT_ISM_MIGRATION, LT_MIGRIS_FEES, LT_STUDYIN_SCHOLARSHIPS],
      {
        kind: 'guidance',
        list: [
          b('Assuming the Lithuanian State Scholarship (full-time master\'s) applies to you — its named quota of countries does not currently include Bangladesh.', 'ধরে নেওয়া যে Lithuanian State Scholarship (full-time master\'s) আপনার জন্য প্রযোজ্য — এর নামযুক্ত দেশের quota-তে এখন Bangladesh নেই।'),
          b('Buying health insurance before checking the exact minimum sum with your own institution — official sources disagree (EUR 6,000 vs. EUR 10,000+).', 'নিজের প্রতিষ্ঠানের কাছে সঠিক সর্বনিম্ন sum যাচাই করার আগে health insurance কিনে ফেলা — official source-গুলোর মধ্যে মতভেদ আছে (EUR 6,000 বনাম EUR 10,000+)।'),
          b('Assuming the fund amount is fixed — it is tied to the minimum monthly wage, which rose on 1 January 2026.', 'টাকার পরিমাণ স্থির ধরে নেওয়া — এটা minimum monthly wage-এর সাথে যুক্ত, যা ১ January 2026-এ বেড়েছে।'),
          b('Looking for one national application deadline — each Lithuanian university sets its own.', 'একটি জাতীয় আবেদনের শেষ তারিখ খোঁজা — প্রতিটি Lithuania-র university নিজের তারিখ ঠিক করে।'),
          b('Working more than 20 hours a week while on a student permit (unless you are a doctoral student).', 'Doctoral student না হয়ে student permit-এ সপ্তাহে ২০ ঘণ্টার বেশি কাজ করা।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in Lithuania from Bangladesh?", "Bangladesh থেকে Lithuania-এ Bachelor's পড়তে কী কী লাগে?"), [b('Secondary education that qualifies you for higher education at home, the university\'s general and country-specific requirements, English proficiency proof, the application fee (around EUR 100), tuition paid, proof of funds, insurance and a Temporary Residence Permit (state fee EUR 80).', 'দেশে উচ্চশিক্ষার যোগ্যতা দেয় এমন secondary education, university-র সাধারণ আর country-specific শর্ত, English proficiency-র প্রমাণ, application fee (প্রায় EUR 100), tuition দেওয়া, টাকার প্রমাণ, insurance আর Temporary Residence Permit (state fee EUR 80)।')], [LT_VU_BACHELORS, LT_MIGRIS_FEES]),
    qa('hsc', b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"), [b('Not verified yet for Bangladesh specifically: you need secondary education that grants access to higher education at home, and some universities (Vilnius University) add a 5-year gap rule for non-EU/EFTA applicants; how the HSC itself is assessed was not read on an official page.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে পুরোপুরি যাচাই হয়নি: দেশে উচ্চশিক্ষার যোগ্যতা দেয় এমন secondary education লাগে, আর কিছু university (Vilnius University) non-EU/EFTA আবেদনকারীদের জন্য ৫-বছরের gap নিয়ম যুক্ত করে; HSC ঠিক কীভাবে মূল্যায়ন হয়, কোনো official page-এ পড়া হয়নি।')], [LT_VU_BACHELORS], { status: 'not-verified' }),
    qa('cost', b('How much does it cost to study in Lithuania?', 'Lithuania-এ পড়াশোনার খরচ কত?'), [b("Study in Lithuania's national averages: from EUR 1,300 a year (bachelor's), EUR 2,300 (master's), EUR 8,400 (PhD, or tuition-free on a state-funded place). The TRP state fee is EUR 80; funds to show are tied to the minimum monthly wage (EUR 7,266/year on the 2025 figure).", "Study in Lithuania-র জাতীয় গড়: bachelor's-এ বছরে EUR 1,300 থেকে, master's EUR 2,300, PhD EUR 8,400 (বা state-funded জায়গায় tuition-free)। TRP state fee EUR 80; দেখানোর টাকা minimum monthly wage-এর সাথে যুক্ত (2025-এর হিসাবে বছরে EUR 7,266)।")], [LT_STUDYIN_FEES, LT_MIGRIS_FEES, LT_ISM_MIGRATION], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for Lithuania?', 'Lithuania-এ IELTS কত লাগে?'), [b('Set by each university; example: Kaunas University of Technology accepts IELTS 5.5+ with every component at least 5.5, or TOEFL iBT 75+, or CEFR B2+. No single national minimum applies to every university.', 'প্রতিটি university নিজে ঠিক করে; উদাহরণ: Kaunas University of Technology IELTS 5.5+ (প্রতিটি অংশে অন্তত 5.5), বা TOEFL iBT 75+, বা CEFR B2+ গ্রহণ করে। সব university-তে প্রযোজ্য একক জাতীয় ন্যূনতম নেই।')], [LT_VU_BACHELORS], { status: 'partly-verified' }),
    qa('visa', b('What do you need for the residence permit?', 'Residence permit-এর জন্য কী কী লাগে?'), [b('Admission and the EPIS mediation-letter number from your institution, proof of funds, proof of accommodation, health insurance, and the EUR 80 state fee (EUR 320 urgent) for a Temporary Residence Permit based on admission to study.', 'ভর্তি আর আপনার প্রতিষ্ঠানের EPIS mediation-letter number, টাকার প্রমাণ, থাকার জায়গার প্রমাণ, health insurance, আর পড়ায় ভর্তির ভিত্তিতে Temporary Residence Permit-এর জন্য EUR 80 state fee (urgent-এ EUR 320)।')], [LT_EU_PORTAL, LT_MIGRIS_FEES, LT_ISM_MIGRATION]),
    qa('work', b('Can you work while studying in Lithuania?', 'Lithuania-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b('Yes, up to 20 hours a week (outside the institution\'s holiday period); doctoral students are not limited by this cap.', 'হ্যাঁ, সপ্তাহে ২০ ঘণ্টা পর্যন্ত (প্রতিষ্ঠানের ছুটির সময় বাদে); doctoral student-দের উপর এই সীমা প্রযোজ্য নয়।')], [LT_EU_PORTAL]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('The Lithuanian State Scholarship for full-time master\'s studies does not currently name Bangladesh in its eligible-country quota. State-funded PhD places are open to non-EU students, and individual universities (for example Vytautas Magnus University and KTU) run their own tuition-fee waivers open to all nationalities.', 'Full-time master\'s-এর Lithuanian State Scholarship-এর যোগ্য দেশের quota-তে এখন Bangladesh নেই। State-funded PhD জায়গা non-EU student-দের জন্য খোলা, আর আলাদা university (যেমন Vytautas Magnus University আর KTU) সব জাতীয়তার জন্য খোলা নিজস্ব tuition-fee waiver দেয়।')], [LT_STUDYIN_SCHOLARSHIPS, LT_STUDYIN_FEES], { status: 'partly-verified' }),
    qa('after', b('Can you stay in Lithuania after graduating?', 'পড়া শেষে Lithuania-এ থাকা যায়?'), [b('Yes: a 12-month temporary residence permit to look for work or start a business, issued free of charge once at your choice. After five continuous years of legal residence you may apply for permanent-resident status.', 'হ্যাঁ: কাজ খোঁজা বা ব্যবসা শুরুর জন্য ১২ মাসের temporary residence permit, যা একবার নিজের পছন্দে বিনা খরচে ইস্যু হয়। ধারাবাহিক পাঁচ বছর বৈধভাবে থাকার পর permanent-resident status-এর জন্য আবেদন করা যায়।')], [LT_EU_PORTAL, LT_MIGRIS_FEES]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('Tied to the minimum monthly wage, so it changes over time; using the 2025 figure, ISM University\'s guide asked for EUR 7,266 for a full year of a TRP. Confirm the current amount with your institution before applying.', 'Minimum monthly wage-এর সাথে যুক্ত, তাই সময়ের সাথে বদলায়; 2025-এর হিসাব ব্যবহার করে ISM University-র guide TRP-এর এক পূর্ণ বছরের জন্য EUR 7,266 চেয়েছে। আবেদনের আগে আপনার প্রতিষ্ঠানের কাছে বর্তমান পরিমাণ যাচাই করুন।')], [LT_ISM_MIGRATION], { status: 'partly-verified' }),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before admission (university): passport, certificates and transcripts, an English proof, and for Bangladesh possibly extra country-specific documents at some universities. After admission (residence permit): the EPIS mediation-letter number, proof of funds, proof of accommodation, an insurance certificate, and — after arrival — a declaration of your residential address.', 'ভর্তির আগে (university): passport, সনদ আর transcript, English প্রমাণ, আর Bangladesh-এর জন্য কিছু university-তে সম্ভবত অতিরিক্ত country-specific document। ভর্তির পরে (residence permit): EPIS mediation-letter number, টাকার প্রমাণ, থাকার জায়গার প্রমাণ, insurance certificate, আর — পৌঁছানোর পরে — থাকার ঠিকানার declaration।')], [LT_VU_BACHELORS, LT_EU_PORTAL, LT_ISM_MIGRATION]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A bachelor's degree (or equivalent) and the university's own requirements; tuition from EUR 2,300 a year on the national average, but the named Lithuanian State Scholarship quota does not list Bangladesh.", "Bachelor's degree (বা সমমান) আর university-র নিজস্ব শর্ত; জাতীয় গড়ে tuition বছরে EUR 2,300 থেকে, কিন্তু নামযুক্ত Lithuanian State Scholarship quota-তে Bangladesh নেই।")], [LT_VU_BACHELORS, LT_STUDYIN_FEES, LT_STUDYIN_SCHOLARSHIPS]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Apply to a university\'s own doctoral school; international students, including non-EU, are eligible for state-funded (tuition-free) places alongside paid ones. Entry rules are set per university (not verified here as general rules).', 'University-র নিজস্ব doctoral school-এ আবেদন; international student, non-EU সহ, paid জায়গার পাশাপাশি state-funded (tuition-free) জায়গার জন্য যোগ্য। ভর্তির নিয়ম প্রতিটি university ঠিক করে (সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি)।')], [LT_STUDYIN_FEES], { status: 'partly-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — ISM University of Management and Economics, Kaunas University of Technology, Vilnius University and Vytautas Magnus University — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — ISM University of Management and Economics, Kaunas University of Technology, Vilnius University আর Vytautas Magnus University — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [LT_STUDYIN_FEES]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: Vilnius University lists Bangladesh among the countries with their own country-specific admission requirements (exact extra documents not read here), and the Lithuanian State Scholarship\'s named quota for full-time master\'s studies does not include Bangladesh. How individual universities otherwise treat Bangladeshi degrees, and whether Bangladesh needs a Schengen or other transit visa en route, were not verified.', 'Bangladesh-এর জন্য যাচাই করা: Vilnius University নিজের country-specific ভর্তির শর্তযুক্ত দেশের তালিকায় Bangladesh-কে রাখে (সঠিক অতিরিক্ত document এখানে পড়া হয়নি), আর full-time master\'s পড়ার Lithuanian State Scholarship-এর নামযুক্ত quota-তে Bangladesh নেই। Bangladesh-এর degree university-গুলো আর কীভাবে দেখে, আর যাওয়ার পথে Schengen বা অন্য transit visa লাগে কিনা, যাচাই হয়নি।'),
    ], [LT_VU_BACHELORS, LT_STUDYIN_SCHOLARSHIPS]),
  ],
  life: [
    qa('health-care', b('How does healthcare work?', 'চিকিৎসা ব্যবস্থা কেমন?'), [b('As a student you need private insurance (or proof of compulsory insurance) covering urgent medical care for your residence permit or visa; official sources disagree on the minimum sum (EUR 6,000 to EUR 10,000+ for a TRP), so check the exact figure with your own institution.', 'Student হিসেবে residence permit বা visa-র জন্য urgent চিকিৎসা কভার করা private insurance (বা compulsory insurance-এর প্রমাণ) লাগে; সর্বনিম্ন sum নিয়ে official source-এ মতভেদ আছে (TRP-এর জন্য EUR 6,000 থেকে EUR 10,000+), তাই আপনার প্রতিষ্ঠানের কাছে সঠিক পরিমাণ যাচাই করুন।')], [LT_EU_PORTAL, LT_ISM_MIGRATION]),
  ],
  documents: LT_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'estimate', status: 'partly-verified', value: { min: 1300, unit: 'EUR/year', text: b("From EUR 1,300 a year (bachelor's), EUR 2,300 (master's), EUR 8,400 (PhD, or tuition-free on a state-funded place).", "Bachelor's-এ বছরে EUR 1,300 থেকে, master's EUR 2,300, PhD EUR 8,400 (বা state-funded জায়গায় tuition-free)।") }, source: LT_STUDYIN_FEES },
    { id: 'funds-to-show', kind: 'fact', status: 'partly-verified', value: { min: 7266, unit: 'EUR/year', text: b('EUR 7,266 for a full year on the 2025 minimum-wage figure (tied to the minimum monthly wage, which rose 1 January 2026; not re-verified since).', '2025-এর minimum-wage হিসাবে এক পূর্ণ বছরের জন্য EUR 7,266 (minimum monthly wage-এর সাথে যুক্ত, যা ১ January 2026-এ বেড়েছে; তারপর পুনরায় যাচাই হয়নি)।') }, source: LT_ISM_MIGRATION },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { max: 20, unit: 'hours/week', text: b('Up to 20 hours a week (outside holiday periods); doctoral students are exempt.', 'সপ্তাহে ২০ ঘণ্টা পর্যন্ত (ছুটির সময় বাদে); doctoral student-রা এই সীমার বাইরে।') }, source: LT_EU_PORTAL },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { max: 12, unit: 'months', text: b('Permit to look for work or start a business for up to 12 months, issued free of charge once.', 'কাজ খোঁজা বা ব্যবসা শুরুর জন্য সর্বোচ্চ ১২ মাসের permit, একবার বিনা খরচে ইস্যু হয়।') }, source: LT_EU_PORTAL },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 80, unit: 'EUR', text: b('EUR 80 general order (EUR 320 urgent) for a Temporary Residence Permit based on admission to study.', 'পড়ায় ভর্তির ভিত্তিতে Temporary Residence Permit-এর জন্য EUR 80 general order (urgent-এ EUR 320)।') }, source: LT_MIGRIS_FEES },
  ],
};


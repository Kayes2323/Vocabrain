import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  CH_BAG_HEALTH_INSURANCE,
  CH_EDA_BD_EMBASSY,
  CH_EDA_BD_PROCESS,
  CH_EDA_BD_STUDENT_VISA_CHECKLIST,
  CH_EDA_BD_VISA_ENTRY,
  CH_EDA_NATIONAL_VISA_DOCS,
  CH_EPFL_BACHELOR_ADMISSION,
  CH_EPFL_MASTER_ADMISSION,
  CH_EPFL_MASTER_ONLINE_APPLY,
  CH_EPFL_TUITION,
  CH_ETHZ_BACHELOR_APPLY,
  CH_ETHZ_FEES_PDF,
  CH_ETHZ_JOBSEEKING,
  CH_ETHZ_TUITION,
  CH_READ,
  CH_SBFI_SGS,
  CH_SBFI_SGS_ASIA_LIST,
  CH_SBFI_SGS_GLANCE,
  CH_SEM_WORK_FAQ,
  CH_UNIGE_FEES,
  CH_UZH_FEES,
  CH_UZH_LANGUAGE_REQUIREMENTS,
  CH_UZH_MASTER_ADMISSION,
} from './ch-sources';

/**
 * Switzerland reading guide, researched on its own from Swiss official
 * sources (the State Secretariat for Migration — SEM, sem.admin.ch — the
 * federal authority for visas and residence permits, working alongside the
 * cantons, which actually issue the residence permit; the Embassy of
 * Switzerland in Bangladesh, the Federal Department of Foreign Affairs'
 * mission that handles visa applications from Bangladesh; the Federal
 * Office of Public Health, bag.admin.ch, for mandatory health insurance;
 * the SBFI/FCS/ESKAS for Swiss Government Excellence Scholarships; and
 * university pages). Nothing is taken from another country's guide.
 * Switzerland is NOT an EU/EEA member — it is only in the Schengen area for
 * short-stay travel — so its own national visa (type D) and residence-permit
 * regime for non-EU/EFTA nationals applies, and no EU-member rule (from
 * Germany's, France's or any other guide) is borrowed here. Amounts stay in
 * Swiss francs (CHF) exactly as each source states them and are never
 * converted. It covers Bachelor's, Master's and PhD study for Bangladeshi
 * (non-EU/EFTA) students.
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
  'ETH Zurich, EPFL, the University of Zurich and the University of Geneva are not identical: each sets its own fee structure, admission requirements and teaching language per programme. Always check the exact programme on the institution’s own admissions page.',
  'ETH Zurich, EPFL, University of Zurich, আর University of Geneva একরকম না: প্রতিটি নিজের fee structure, ভর্তির শর্ত, আর প্রতি programme পড়ানোর ভাষা ঠিক করে। প্রতিটি programme-এর জন্য প্রতিষ্ঠানের নিজের admissions page অবশ্যই দেখে নিন।',
);

const NOT_EU_NOTE = b(
  'Switzerland is not a member of the European Union or European Economic Area — it only participates in the Schengen area for short-stay (up to 90-day) travel. Bangladeshi applicants, like all non-EU/EFTA nationals, go through Switzerland’s own national visa (type D) and cantonal residence-permit process, not an EU-member-state process.',
  'Switzerland European Union বা European Economic Area-র সদস্য না — এটা শুধু short-stay (90 দিন পর্যন্ত) travel-এর জন্য Schengen area-র অংশ। Bangladeshi আবেদনকারীরা, সব non-EU/EFTA নাগরিকের মতো, Switzerland-এর নিজস্ব national visa (type D) আর cantonal residence-permit process-এর মধ্য দিয়ে যান, কোনো EU-সদস্য-দেশের process-এর মাধ্যমে না।',
);

// ------------------------------------------------------------------ shared answers

const visaRequired = (id: string) =>
  qa(
    id,
    b('Does a Bangladeshi student need a visa to study in Switzerland?', 'Bangladesh-এর student-দের Switzerland-এ পড়তে visa লাগে কি?'),
    [
      b(
        'Yes. Stays of more than 90 days require a national visa (type D) plus a residence permit for study ("Permit B", issued for study purposes). Switzerland’s process is partly cantonal: SEM sets the federal framework and the Embassy of Switzerland in Bangladesh (Dhaka) receives the application, but the canton where your university is located decides on and actually issues the residence permit, after which the Embassy issues the visa.',
        'হ্যাঁ। 90 দিনের বেশি থাকার জন্য একটি national visa (type D) সঙ্গে পড়ার জন্য একটি residence permit ("Permit B") লাগে। Switzerland-এর process আংশিকভাবে cantonal: SEM federal framework ঠিক করে আর Embassy of Switzerland in Bangladesh (Dhaka) application গ্রহণ করে, কিন্তু আপনার university যে canton-এ আছে সেই canton residence permit-এর সিদ্ধান্ত নেয় আর আসলে ইস্যু করে, তারপর Embassy visa ইস্যু করে।',
      ),
      NOT_EU_NOTE,
    ],
    [CH_EDA_BD_EMBASSY, CH_EDA_BD_STUDENT_VISA_CHECKLIST, CH_EDA_NATIONAL_VISA_DOCS],
    { allDegrees: true },
  );

const visaProcess = (id: string) =>
  qa(
    id,
    b('How does the application work, and what does it cost?', 'Application কীভাবে কাজ করে, আর খরচ কত?'),
    [
      b(
        'You apply in person at the Embassy of Switzerland in Bangladesh (Dhaka) by appointment (book by emailing dhaka.visa@eda.admin.ch), submitting the completed visa-D application form, two extra sets of photocopies of every supporting document, and your original passport. The Embassy forwards the file to the competent cantonal migration authority in Switzerland for a decision; the Dhaka Embassy’s own checklist states the whole process takes approximately three months, after which the Embassy issues the visa within about five days of the cantonal authorisation reaching it. The Embassy’s general FAQ for other countries states 8–12 weeks, so expect roughly 2–3 months and plan well ahead.',
        'Appointment নিয়ে (dhaka.visa@eda.admin.ch-এ ইমেইল করে বুক করুন) Embassy of Switzerland in Bangladesh (Dhaka)-এ সশরীরে আবেদন করতে হয়, পূর্ণ করা visa-D application form, প্রতিটি সহায়ক document-এর দুই সেট অতিরিক্ত ফটোকপি, আর আপনার original passport জমা দিয়ে। Embassy ফাইলটি Switzerland-এ সংশ্লিষ্ট cantonal migration authority-তে সিদ্ধান্তের জন্য পাঠায়; Dhaka Embassy-র নিজের checklist বলে সম্পূর্ণ process প্রায় তিন মাস লাগে, তারপর cantonal অনুমোদন পৌঁছানোর পর Embassy প্রায় পাঁচ দিনের মধ্যে visa ইস্যু করে। অন্য দেশের জন্য Embassy-র সাধারণ FAQ 8–12 সপ্তাহ বলে, তাই প্রায় 2–3 মাস ধরে নিয়ে ভালোভাবে আগে থেকে পরিকল্পনা করুন।',
      ),
      b(
        'The student-visa processing fee itself is free of charge at the Dhaka Embassy. After arriving in Switzerland, you must register with the local residents’ registration office within 14 days of entry.',
        'Dhaka Embassy-তে student-visa processing fee নিজেই বিনামূল্যে। Switzerland পৌঁছানোর পর, প্রবেশের 14 দিনের মধ্যে আপনাকে local residents’ registration office-এ register করতে হয়।',
      ),
    ],
    [CH_EDA_BD_STUDENT_VISA_CHECKLIST, CH_EDA_BD_PROCESS, CH_SEM_WORK_FAQ],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'Not verified yet as a single official nationwide figure: the Dhaka Embassy’s checklist asks for proof of financial resources — a sponsor’s written declaration (parent, scholarship, etc.) taking responsibility for all costs, bank-account statements showing six months of movements, a bank letter confirming the balance, proof of the relationship with the sponsor, and three years of tax-return receipts — without stating one fixed minimum amount, because the sum needed depends on the canton and the individual application. Figures such as CHF 21,000 a year appear on some private institutions’ own pages, but this is not an official SEM or cantonal figure confirmed on the pages read for this guide, so no single number is shown as official here.',
        'এখনো একটি একক official জাতীয় সংখ্যা হিসেবে যাচাই হয়নি: Dhaka Embassy-র checklist financial resources-এর প্রমাণ চায় — একজন sponsor-এর (parent, scholarship, ইত্যাদি) সব খরচের দায়িত্ব নেওয়ার একটি লিখিত ঘোষণা, ছয় মাসের movement দেখানো bank-account statement, balance নিশ্চিত করা একটি bank letter, sponsor-এর সাথে সম্পর্কের প্রমাণ, আর তিন বছরের tax-return receipt — একটি নির্দিষ্ট ন্যূনতম পরিমাণ না বলে, কারণ প্রয়োজনীয় টাকা canton আর individual application-এর উপর নির্ভর করে। CHF 21,000/বছরের মতো সংখ্যা কিছু private institution-এর নিজের page-এ দেখা যায়, কিন্তু এই guide-এর জন্য পড়া page-এ এটা কোনো official SEM বা cantonal সংখ্যা হিসেবে নিশ্চিত হয়নি, তাই এখানে কোনো একক সংখ্যা official হিসেবে দেখানো হয়নি।',
      ),
    ],
    [CH_EDA_BD_STUDENT_VISA_CHECKLIST],
    { allDegrees: true, status: 'not-verified' },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('Is health insurance compulsory?', 'Health insurance কি বাধ্যতামূলক?'),
    [
      b(
        'Yes. The Federal Office of Public Health’s own page states that everyone who takes up residence in Switzerland must take out health insurance within three months of becoming liable for compulsory insurance (i.e. from the date you take up residence). This is a general federal rule for residents and was not qualified on the official page read for this guide by any study-specific exemption, so plan to arrange compulsory Swiss health insurance within your first three months.',
        'হ্যাঁ। Federal Office of Public Health-এর নিজের page বলে Switzerland-এ থাকা শুরু করা সবাইকে compulsory insurance-এর জন্য দায়ী হওয়ার (মানে থাকা শুরুর তারিখ থেকে) তিন মাসের মধ্যে health insurance নিতে হবে। এটা residents-দের জন্য একটি সাধারণ federal নিয়ম আর এই guide-এর জন্য পড়া official page-এ পড়ার জন্য নির্দিষ্ট কোনো exemption দিয়ে qualify করা হয়নি, তাই প্রথম তিন মাসের মধ্যে compulsory Swiss health insurance ব্যবস্থা করার পরিকল্পনা করুন।',
      ),
    ],
    [CH_BAG_HEALTH_INSURANCE],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Switzerland, and how many hours?', 'Switzerland-এ পড়ার পাশাপাশি কাজ করা যায় কি, আর কত ঘণ্টা?'),
    [
      b(
        'Yes, but not immediately. SEM’s own FAQ states that non-EU/EFTA students may take up a supplementary activity, subject to cantonal approval, beginning no sooner than six months after the start of their course, for a maximum of 15 hours a week outside of the holidays. Your university must first confirm that the work is compatible with your studies and will not delay completion, and your employer (not you) must submit the work-permit application to the competent cantonal authority.',
        'হ্যাঁ, কিন্তু তাৎক্ষণিকভাবে না। SEM-র নিজের FAQ বলে non-EU/EFTA student-রা একটি supplementary activity নিতে পারেন, cantonal অনুমোদন সাপেক্ষে, কোর্স শুরুর অন্তত ছয় মাস পর থেকে, ছুটির বাইরে সপ্তাহে সর্বোচ্চ 15 ঘণ্টার জন্য। আপনার university-কে প্রথমে নিশ্চিত করতে হবে কাজটি আপনার পড়ার সাথে সামঞ্জস্যপূর্ণ আর পড়া শেষ হতে দেরি করাবে না, আর আপনার employer-কে (আপনাকে না) সংশ্লিষ্ট cantonal authority-তে work-permit application জমা দিতে হবে।',
      ),
    ],
    [CH_SEM_WORK_FAQ],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Switzerland to look for work after graduating?', 'পড়া শেষে কাজ খোঁজার জন্য Switzerland-এ থাকা যায়?'),
    [
      b(
        'Yes. SEM’s own FAQ confirms that third-country nationals who graduate from a Swiss higher-education institution have a six-month period from the end of their course or training to look for a job that matches their qualifications; in derogation of the usual precedence given to Swiss and EU/EFTA workers, they may be admitted if the work represents an overriding scientific or economic interest. ETH Zurich’s own page for its students describes this as extending your residence permit for up to 6 months for job-seeking purposes, counted from the date of graduation (not from your permit’s expiry date) — a university-specific figure (ETH asks for CHF 10,500 in your bank account as financial proof for its own 6-month extension), consistent with SEM’s general six-month rule.',
        'হ্যাঁ। SEM-র নিজের FAQ নিশ্চিত করে যে একটি Swiss higher-education institution থেকে graduate হওয়া third-country নাগরিকদের কোর্স বা training শেষ হওয়ার পর তাদের যোগ্যতার সাথে মেলে এমন একটি চাকরি খোঁজার জন্য ছয় মাসের একটি সময় থাকে; Swiss আর EU/EFTA কর্মীদের দেওয়া সাধারণ precedence থেকে ব্যতিক্রম করে, কাজটি একটি overriding scientific or economic interest হলে তাদের admit করা যেতে পারে। ETH Zurich-এর নিজের student page এটাকে job-seeking purpose-এর জন্য আপনার residence permit 6 মাস পর্যন্ত বাড়ানো হিসেবে বর্ণনা করে, graduation-এর তারিখ থেকে গণনা করা হয় (আপনার permit-এর মেয়াদ শেষের তারিখ থেকে না) — একটি university-specific সংখ্যা (ETH তার নিজের 6-মাসের extension-এর জন্য financial proof হিসেবে bank account-এ CHF 10,500 চায়), SEM-র সাধারণ ছয়-মাসের নিয়মের সাথে সামঞ্জস্যপূর্ণ।',
      ),
    ],
    [CH_SEM_WORK_FAQ, CH_ETHZ_JOBSEEKING],
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'The Swiss Government Excellence Scholarship (SGS, run by the Federal Commission for Scholarships for Foreign Students / FCS, also called ESKAS) is genuinely open to Bangladeshi applicants, administered through the Embassy of Switzerland in Bangladesh — but only its Research Fellowship and PhD scholarship types, for applicants who already hold a master’s degree; its Art scholarship is limited to a short list of countries that does not include Bangladesh. It pays CHF 2,450 a month for basic living expenses (not a salary) and, for non-EU/EFTA holders, covers compulsory health-insurance premiums, a one-time CHF 600 rental-deposit grant and a return-flight allowance, but it does not cover tuition or semester fees, and a Swiss academic supervisor’s letter of support is required before applying. It is not open to standalone Bachelor’s or Master’s applicants.',
        'Swiss Government Excellence Scholarship (SGS, Federal Commission for Scholarships for Foreign Students / FCS চালিত, ESKAS-ও বলা হয়) Bangladeshi আবেদনকারীদের জন্য আসলেই খোলা, Embassy of Switzerland in Bangladesh-এর মাধ্যমে পরিচালিত — কিন্তু শুধু এর Research Fellowship আর PhD scholarship ধরনের, যে আবেদনকারীদের ইতিমধ্যে একটি master\'s degree আছে তাদের জন্য; এর Art scholarship একটি ছোট দেশের তালিকায় সীমাবদ্ধ যাতে Bangladesh নেই। এটা মাসে CHF 2,450 মূল থাকা-খাওয়ার খরচের জন্য দেয় (salary না) আর, non-EU/EFTA holder-দের জন্য, compulsory health-insurance premium, একবারের CHF 600 rental-deposit grant, আর একটি return-flight allowance দেয়, কিন্তু tuition বা semester fee দেয় না, আর আবেদনের আগে একজন Swiss academic supervisor-এর একটি letter of support লাগে। এটা standalone Bachelor\'s বা Master\'s আবেদনকারীদের জন্য খোলা না।',
      ),
    ],
    [CH_SBFI_SGS, CH_SBFI_SGS_GLANCE, CH_SBFI_SGS_ASIA_LIST],
    { status: 'partly-verified', kind: 'guidance' },
  );

// ------------------------------------------------------------------ documents

const EMBASSY = b('The Embassy of Switzerland in Bangladesh (Dhaka), which forwards your application to the cantonal authority.', 'Embassy of Switzerland in Bangladesh (Dhaka), যারা আপনার application cantonal authority-তে পাঠায়।');

export const CH_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport (current + previous)', 'Passport (বর্তমান + আগের)'),
    why: b('Your identity document for the visa D application and throughout your stay; the Embassy checklist asks for the current passport (valid at least 3 months beyond departure, with 2 blank pages) plus any previous passports or a police report if one is lost.', 'Visa D application-এর জন্য আর থাকার পুরো সময় আপনার পরিচয়ের document; Embassy checklist বর্তমান passport (প্রস্থানের অন্তত 3 মাস পর পর্যন্ত valid, 2টা খালি পাতা সহ) সঙ্গে আগের passport বা হারিয়ে গেলে একটি police report চায়।'),
    who: EMBASSY,
    when: b('From the application through your residence in Switzerland.', 'Application থেকে Switzerland-এ থাকার পুরো সময়।'),
    where: b('Submitted in person at the Embassy of Switzerland in Bangladesh (Dhaka), by appointment.', 'Appointment নিয়ে Embassy of Switzerland in Bangladesh (Dhaka)-এ সশরীরে জমা দিতে হয়।'),
    prepare: b('Keep it valid well beyond your intended stay; the Embassy also asks for 2 extra photocopy sets of every document.', 'প্রত্যাশিত থাকার সময়ের চেয়ে বেশ বেশি valid রাখুন; Embassy প্রতিটি document-এর 2টা অতিরিক্ত ফটোকপি সেটও চায়।'),
    groups: ['general', 'visa'],
    sources: [CH_EDA_BD_STUDENT_VISA_CHECKLIST],
  },
  {
    id: 'acceptance',
    name: b('Acceptance/confirmation letter + proof of paid tuition', 'ভর্তির acceptance/confirmation letter + tuition-র পরিশোধের প্রমাণ'),
    why: b('Proves your purpose of stay and that your school or university in Switzerland has confirmed your tuition fees are paid, with a relevant bank statement.', 'আপনার থাকার উদ্দেশ্য আর Switzerland-এর school বা university নিশ্চিত করেছে যে tuition fee পরিশোধিত, সংশ্লিষ্ট bank statement সহ প্রমাণ করে।'),
    who: b('The Swiss institution you applied to.', 'যে Swiss institution-এ আবেদন করছেন।'),
    when: b('After admission, before the visa application.', 'ভর্তির পর, visa application-এর আগে।'),
    where: b('Submitted with your visa D application at the Embassy.', 'Embassy-তে আপনার visa D application-এর সঙ্গে জমা দিতে হয়।'),
    prepare: b('Each institution sets its own admission process and fee structure, so confirm with your chosen institution how it issues this letter.', 'প্রতিটি institution নিজস্ব ভর্তি process আর fee structure ঠিক করে, তাই এই letter কীভাবে ইস্যু করে তা আপনার বাছা institution-এর সাথে নিশ্চিত করুন।'),
    groups: ['general', 'visa'],
    sources: [CH_EDA_BD_STUDENT_VISA_CHECKLIST],
  },
  {
    id: 'academic',
    name: b('Academic certificates (apostilled) + CV', 'Academic সনদ (apostilled) + CV'),
    why: b('Shows your previous education; the Embassy checklist requires all academic diplomas/certificates to be apostilled, plus a CV and proof of any past or current professional employment.', 'আগের পড়া দেখায়; Embassy checklist সব academic diploma/সনদ apostilled হতে হয়, সঙ্গে একটি CV আর আগের বা বর্তমান পেশাগত কর্মসংস্থানের প্রমাণ চায়।'),
    who: b('Your own educational institutions in Bangladesh.', 'Bangladesh-এর আপনার নিজের educational institution।'),
    when: b('With your visa application.', 'আপনার visa application-এর সঙ্গে।'),
    where: b('Submitted at the Embassy of Switzerland in Bangladesh (Dhaka).', 'Embassy of Switzerland in Bangladesh (Dhaka)-এ জমা দিতে হয়।'),
    prepare: b('Documents in Bengali must be presented with an official translation into English, German, French or Italian; a Bangladeshi HSC-equivalence rule for university admission specifically was not found on an official university page read for this guide — ask your chosen institution’s admissions office directly.', 'বাংলায় document-এর সাথে ইংরেজি, জার্মান, ফ্রেঞ্চ, বা ইতালিয়ান-এ official translation দিতে হয়; ভর্তির জন্য একটি Bangladeshi HSC-সমতুল্যতার নিয়ম এই guide-এর জন্য পড়া কোনো official university page-এ পাওয়া যায়নি — সরাসরি আপনার বাছা institution-এর admissions office-কে জিজ্ঞাসা করুন।'),
    groups: ['general', 'program', 'bangladesh'],
    status: 'not-verified',
    sources: [CH_EDA_BD_STUDENT_VISA_CHECKLIST],
  },
  {
    id: 'language',
    name: b('Language proficiency proof (English, German, French or Italian)', 'ভাষার দক্ষতার প্রমাণ (ইংরেজি, জার্মান, ফ্রেঞ্চ, বা ইতালিয়ান)'),
    why: b('An English test (TOEFL or IELTS) is compulsory per the Embassy’s own checklist if the programme is English-taught; if teaching is in German, French or Italian, the matching language certificate (e.g. Goethe-Zertifikat, DELF) is required instead, confirmed by the institution.', 'Programme ইংরেজি-মাধ্যম হলে Embassy-র নিজের checklist অনুযায়ী একটি ইংরেজি test (TOEFL বা IELTS) বাধ্যতামূলক; জার্মান, ফ্রেঞ্চ, বা ইতালিয়ান-এ পড়ানো হলে, তার পরিবর্তে মিলে যাওয়া ভাষার সনদ (যেমন Goethe-Zertifikat, DELF) লাগে, institution নিশ্চিত করে।'),
    who: b('The institution/programme you apply to.', 'যে institution/programme-এ আবেদন করছেন।'),
    when: b('With the application; at ETH Zurich a German-language certificate must be submitted by the 31 March application deadline for Bachelor’s applicants.', 'Application-এর সঙ্গে; ETH Zurich-এ Bachelor\'s আবেদনকারীদের জন্য 31 March application deadline-এর মধ্যে একটি German-language সনদ জমা দিতে হয়।'),
    where: b('Uploaded to the institution’s own application system and shown to the Embassy.', 'Institution-এর নিজস্ব application system-এ upload করতে হয় আর Embassy-কে দেখাতে হয়।'),
    prepare: b('Students who have received a Swiss Federal Government scholarship (e.g. SGS) do not have to provide a language test, per the Dhaka Embassy checklist.', 'Dhaka Embassy checklist অনুযায়ী যারা Swiss Federal Government scholarship (যেমন SGS) পেয়েছেন তাদের ভাষার test দিতে হয় না।'),
    groups: ['program', 'visa'],
    sources: [CH_EDA_BD_STUDENT_VISA_CHECKLIST, CH_UZH_LANGUAGE_REQUIREMENTS],
  },
  {
    id: 'funds',
    name: b('Proof of financial resources', 'Financial resources-র প্রমাণ'),
    why: b('Embassy requirement: a sponsor’s written declaration (parent, scholarship, etc.) taking responsibility for all costs, six months of bank-account statements, a bank balance letter, proof of the relationship with the sponsor, and three years of tax-return acknowledgement receipts (for both applicant and sponsor).', 'Embassy-র শর্ত: একজন sponsor-এর (parent, scholarship, ইত্যাদি) সব খরচের দায়িত্ব নেওয়ার একটি লিখিত ঘোষণা, ছয় মাসের bank-account statement, একটি bank balance letter, sponsor-এর সাথে সম্পর্কের প্রমাণ, আর (আবেদনকারী ও sponsor দুজনের) তিন বছরের tax-return acknowledgement receipt।'),
    who: EMBASSY,
    when: b('With the visa application, and again whenever the permit is extended.', 'Visa application-এর সঙ্গে, আর permit বাড়ানোর সময় আবার।'),
    where: b('Submitted at the Embassy of Switzerland in Bangladesh (Dhaka).', 'Embassy of Switzerland in Bangladesh (Dhaka)-এ জমা দিতে হয়।'),
    prepare: b('No single official nationwide minimum amount was confirmed on the pages read for this guide — the sum needed is assessed per application and canton, so prepare clear, verifiable documentation rather than aiming for one fixed number.', 'এই guide-এর জন্য পড়া page-এ কোনো একক official জাতীয় ন্যূনতম পরিমাণ নিশ্চিত হয়নি — প্রয়োজনীয় টাকা প্রতি application আর canton অনুযায়ী মূল্যায়ন করা হয়, তাই একটি নির্দিষ্ট সংখ্যার লক্ষ্যে না গিয়ে স্পষ্ট, যাচাইযোগ্য document তৈরি করুন।'),
    groups: ['visa', 'bangladesh'],
    status: 'not-verified',
    sources: [CH_EDA_BD_STUDENT_VISA_CHECKLIST],
  },
  {
    id: 'police-clearance',
    name: b('Police clearance certificate', 'Police clearance certificate (পুলিশি ছাড়পত্র)'),
    why: b('Embassy requirement: a recent police clearance certificate, maximum six months old on the day of submission.', 'Embassy-র শর্ত: জমা দেওয়ার দিনে সর্বোচ্চ ছয় মাস পুরনো একটি recent police clearance certificate।'),
    who: b('Bangladeshi police authorities.', 'Bangladesh-এর police authority।'),
    when: b('With the visa application.', 'Visa application-এর সঙ্গে।'),
    where: b('Submitted at the Embassy of Switzerland in Bangladesh (Dhaka).', 'Embassy of Switzerland in Bangladesh (Dhaka)-এ জমা দিতে হয়।'),
    prepare: b('Apply for it early, since it must not be older than six months by the time you submit your visa application.', 'তাড়াতাড়ি আবেদন করুন, কারণ visa application জমা দেওয়ার সময় এটা ছয় মাসের বেশি পুরনো হতে পারবে না।'),
    groups: ['visa', 'bangladesh'],
    sources: [CH_EDA_BD_STUDENT_VISA_CHECKLIST],
  },
  {
    id: 'insurance',
    name: b('Health insurance registration', 'Health insurance-এর registration'),
    why: b('Compulsory by Swiss federal law (Federal Office of Public Health): you must take out health insurance within three months of taking up residence in Switzerland.', 'Swiss federal আইন (Federal Office of Public Health) অনুযায়ী বাধ্যতামূলক: Switzerland-এ থাকা শুরু করার তিন মাসের মধ্যে health insurance নিতে হবে।'),
    who: b('A Swiss health insurer (Krankenkasse) of your choice.', 'আপনার পছন্দের একটি Swiss health insurer (Krankenkasse)।'),
    when: b('Within three months of taking up residence in Switzerland.', 'Switzerland-এ থাকা শুরুর তিন মাসের মধ্যে।'),
    where: b('Registered directly with the chosen insurer after arrival; kept as proof for the commune/canton.', 'পৌঁছানোর পর সরাসরি বাছা insurer-এর সাথে register করতে হয়; commune/canton-এর জন্য প্রমাণ হিসেবে রাখতে হয়।'),
    prepare: b('No study-specific exemption from this general residents’ rule was confirmed on the official page read for this guide, so budget for it from month one.', 'এই সাধারণ residents-দের নিয়ম থেকে পড়ার জন্য নির্দিষ্ট কোনো exemption এই guide-এর জন্য পড়া official page-এ নিশ্চিত হয়নি, তাই প্রথম মাস থেকেই এর জন্য বাজেট রাখুন।'),
    groups: ['visa', 'arrival'],
    sources: [CH_BAG_HEALTH_INSURANCE],
  },
  {
    id: 'registration',
    name: b('Residents’ registration (commune)', 'Residents’ registration (commune, বসবাসের নিবন্ধন)'),
    why: b('The Dhaka Embassy checklist states you must register with the residents’ registration office no later than 14 days after your entry into Switzerland.', 'Dhaka Embassy checklist বলে Switzerland-এ প্রবেশের 14 দিনের মধ্যে residents’ registration office-এ register করতে হবে।'),
    who: b('Your local commune registration office in Switzerland.', 'Switzerland-এ আপনার স্থানীয় commune registration office।'),
    when: b('Within 14 days of arrival.', 'পৌঁছানোর 14 দিনের মধ্যে।'),
    where: b('At the commune office covering your Swiss address.', 'আপনার Swiss address-এর commune office-এ।'),
    prepare: b('Bring your passport, visa and acceptance letter; this registration is also usually needed before you can open a bank account or take out health insurance.', 'Passport, visa, আর acceptance letter সাথে নিয়ে যান; bank account খোলা বা health insurance নেওয়ার আগেও সাধারণত এই registration লাগে।'),
    groups: ['arrival'],
    sources: [CH_EDA_BD_STUDENT_VISA_CHECKLIST],
  },
];

// ------------------------------------------------------------------ costs (CHF, never converted)

const UZH_SURCHARGE_BACHELOR: GuideCost = { id: 'application-fee', label: b('University application fee (example: UZH, foreign qualification)', 'University application fee (উদাহরণ: UZH, বিদেশি যোগ্যতা)'), value: b('CHF 150 for Bachelor’s/Master’s applicants with a foreign qualification (from 1 January 2025), vs CHF 100 for others, at the University of Zurich', 'University of Zurich-এ বিদেশি যোগ্যতাসম্পন্ন Bachelor\'s/Master\'s আবেদনকারীদের জন্য CHF 150 (1 January 2025 থেকে), অন্যদের জন্য CHF 100'), amount: { value: 150, currency: 'CHF', period: 'one-time' }, source: CH_UZH_FEES };
const ETHZ_APPLICATION_FEE: GuideCost = { id: 'ethz-application-fee', label: b('University application fee (example: ETH Zurich, non-Swiss certificate)', 'University application fee (উদাহরণ: ETH Zurich, non-Swiss সনদ)'), value: b('CHF 150 for applicants with a non-Swiss matriculation certificate, vs CHF 50 for Swiss certificates, at ETH Zurich', 'ETH Zurich-এ non-Swiss matriculation সনদসম্পন্ন আবেদনকারীদের জন্য CHF 150, Swiss সনদের জন্য CHF 50'), amount: { value: 150, currency: 'CHF', period: 'one-time' }, source: CH_ETHZ_FEES_PDF };
const UNVERIFIED: GuideCost[] = [
  { id: 'funds-amount', label: b('Minimum funds to show', 'দেখানোর ন্যূনতম টাকা'), value: b('No single official nationwide figure was confirmed; the amount needed is assessed per application and canton. Some private institutions’ own pages cite figures such as CHF 21,000 a year, but this was not confirmed as an official SEM or cantonal minimum on the pages read for this guide.', 'কোনো একক official জাতীয় সংখ্যা নিশ্চিত হয়নি; প্রয়োজনীয় টাকা প্রতি application আর canton অনুযায়ী মূল্যায়ন করা হয়। কিছু private institution-এর নিজের page CHF 21,000/বছরের মতো সংখ্যা উল্লেখ করে, কিন্তু এই guide-এর জন্য পড়া page-এ এটা কোনো official SEM বা cantonal ন্যূনতম হিসেবে নিশ্চিত হয়নি।'), status: 'not-verified', source: CH_EDA_BD_STUDENT_VISA_CHECKLIST },
  { id: 'living', label: b('Living costs', 'থাকা-খাওয়ার খরচ'), value: b('Official per-city living-cost estimates for international students were not itemized on a federal or cantonal page read for this guide; several university and third-party sources describe Switzerland as one of the most expensive countries to live in despite its comparatively low public-university tuition, but no single official figure is shown here as a fact.', 'এই guide-এর জন্য পড়া কোনো federal বা cantonal page-এ international student-দের জন্য official per-city থাকা-খাওয়ার খরচের আনুমানিক হিসাব তালিকাভুক্ত ছিল না; কয়েকটি university আর third-party source Switzerland-কে তুলনামূলকভাবে কম public-university tuition থাকা সত্ত্বেও থাকার জন্য সবচেয়ে ব্যয়বহুল দেশগুলোর একটি বলে বর্ণনা করে, কিন্তু এখানে কোনো একক official সংখ্যা fact হিসেবে দেখানো হয়নি।'), status: 'not-verified', source: CH_EDA_BD_STUDENT_VISA_CHECKLIST },
];

// ------------------------------------------------------------------ common sections

const commonTail = () => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [{ embed: 'costs' as const }] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa(
        'types',
        b('Which universities are there?', 'কোন কোন university আছে?'),
        [b('The examples below — ETH Zurich, EPFL, the University of Zurich and the University of Geneva — are listed alphabetically, not ordered by quality. Switzerland’s two federal institutes of technology (ETH Zurich, EPFL) set a flat federal fee structure with a higher rate for most foreign students since autumn 2025, while cantonal universities like Zurich and Geneva set their own structures; teaching language, tuition, deadlines and requirements differ at each one, so check the official page.', 'নিচের উদাহরণ — ETH Zurich, EPFL, University of Zurich, আর University of Geneva — বর্ণানুক্রমে, মান অনুযায়ী নয়। Switzerland-এর দুটি federal institute of technology (ETH Zurich, EPFL) একটি flat federal fee structure ঠিক করে, 2025 autumn থেকে অধিকাংশ বিদেশি student-এর জন্য বেশি rate সহ, যখন Zurich আর Geneva-র মতো cantonal university নিজস্ব structure ঠিক করে; পড়ানোর ভাষা, tuition, deadline, আর শর্ত প্রতিটিতে আলাদা, তাই official page দেখুন।')], [CH_ETHZ_TUITION]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work'), insurance('insurance')] },
  { id: 'visa', title: b('Student visa and permit', 'Student visa আর permit'), items: [visaRequired('visa-required'), visaProcess('visa-process'), funds('funds')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Mostly German/French-taught · apply via the institution’s own system · visa D process ≈ 2–3 months', 'অধিকাংশ German/French-মাধ্যম · institution-এর নিজস্ব system-এ আবেদন · visa D process ≈ 2–3 মাস'),
  intro: b(
    "An English-taught Bachelor's is rare in Switzerland: ETH Zurich's Bachelor's programmes require German (certificate due by the 31 March application deadline), and EPFL's require French at CEFR level B2. Each institution sets its own country-specific equivalence for your HSC and secondary-school certificate; a dedicated Bangladesh-HSC rule was not found on an official page for this guide. As a Bangladeshi applicant you need a national visa D plus a cantonal residence permit for study, applied for at the Embassy of Switzerland in Bangladesh (Dhaka), which the Embassy's own checklist says takes about three months.",
    "Switzerland-এ ইংরেজি-মাধ্যম Bachelor's বিরল: ETH Zurich-এর Bachelor's programme জার্মান চায় (31 March application deadline-এর মধ্যে সনদ), আর EPFL-এর CEFR level B2 ফ্রেঞ্চ চায়। প্রতিটি institution আপনার HSC আর secondary-school সনদের জন্য নিজস্ব country-specific সমতুল্যতা ঠিক করে; এই guide-এর জন্য একটি আলাদা Bangladesh-HSC নিয়ম কোনো official page-এ পাওয়া যায়নি। Bangladeshi আবেদনকারী হিসেবে একটি national visa D সঙ্গে পড়ার জন্য একটি cantonal residence permit লাগে, Embassy of Switzerland in Bangladesh (Dhaka)-এ আবেদন করা হয়, যা Embassy-র নিজের checklist অনুযায়ী প্রায় তিন মাস লাগে।",
  ),
  costs: { official: [ETHZ_APPLICATION_FEE, UZH_SURCHARGE_BACHELOR], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in Switzerland from Bangladesh?", "Bangladesh থেকে Switzerland-এ Bachelor's পড়তে কী কী লাগে?"),
          [b('A secondary-school certificate your chosen institution assesses for country-specific equivalence, the language proficiency the programme is taught in (German for ETH Zurich, French at B2 for EPFL, or an institution’s own English requirement where offered), an application submitted through the institution’s own system by its deadline, and — because Bangladesh is not an EU/EFTA country — a national visa D and cantonal residence permit applied for at the Embassy of Switzerland in Bangladesh.', 'আপনার বাছা institution country-specific সমতুল্যতার জন্য মূল্যায়ন করে এমন একটি secondary-school সনদ, programme যে ভাষায় পড়ানো হয় তার দক্ষতা (ETH Zurich-এর জন্য জার্মান, EPFL-এর জন্য B2-তে ফ্রেঞ্চ, বা offer করা হলে institution-এর নিজস্ব ইংরেজি শর্ত), institution-এর নিজস্ব system-এর মাধ্যমে deadline-এর মধ্যে একটি application, আর — Bangladesh EU/EFTA দেশ না হওয়ায় — Embassy of Switzerland in Bangladesh-এ আবেদন করা একটি national visa D আর cantonal residence permit।'), CHECK_UNI],
          [CH_ETHZ_BACHELOR_APPLY, CH_EPFL_BACHELOR_ADMISSION, CH_EDA_BD_STUDENT_VISA_CHECKLIST],
          { status: 'partly-verified' },
        ),
        qa(
          'hsc',
          b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'),
          [b('Not verified yet for Bangladesh specifically as a single national rule: Swiss institutions assess upper-secondary certificates by country, and some non-Swiss applicants must pass a complementary examination (ECUS) set by the Swiss higher-education institutions before admission — but whether a Bangladeshi HSC certificate requires this, or is accepted directly, was not confirmed on an official page read for this guide. Ask your chosen institution’s admissions office directly.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে একটি একক জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: Swiss institution-গুলো দেশ অনুযায়ী upper-secondary সনদ মূল্যায়ন করে, আর কিছু non-Swiss আবেদনকারীকে ভর্তির আগে Swiss higher-education institution-গুলোর নির্ধারিত একটি complementary examination (ECUS) পাস করতে হয় — কিন্তু একটি Bangladeshi HSC সনদে এটা লাগে, নাকি সরাসরি গ্রহণযোগ্য, এই guide-এর জন্য পড়া কোনো official page-এ নিশ্চিত হয়নি। সরাসরি আপনার বাছা institution-এর admissions office-কে জিজ্ঞাসা করুন।')],
          [CH_UZH_LANGUAGE_REQUIREMENTS],
          { status: 'not-verified' },
        ),
      ],
    },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b('When and how do you apply?', 'কখন আর কীভাবে আবেদন করবেন?'),
          [b('ETH Zurich’s application period for applicants with a non-Swiss matriculation certificate runs 1 December to 31 March (23:59 CET) for an Autumn Semester start — Bachelor’s studies there start only in Autumn. EPFL’s Bachelor’s admission criteria are assessed on an ongoing basis per the admission page read for this guide, with B2-level French required unless you completed upper-secondary education in French. Each institution otherwise runs its own online application system and sets its own documents and timeline.', 'ETH Zurich-এ non-Swiss matriculation সনদসম্পন্ন আবেদনকারীদের জন্য application period 1 December থেকে 31 March (23:59 CET) পর্যন্ত চলে একটি Autumn Semester শুরুর জন্য — সেখানে Bachelor\'s পড়া শুধু Autumn-এ শুরু হয়। এই guide-এর জন্য পড়া admission page অনুযায়ী EPFL-এর Bachelor\'s ভর্তির শর্ত চলমান ভিত্তিতে মূল্যায়ন করা হয়, French-এ upper-secondary শিক্ষা না নিয়ে থাকলে B2-level ফ্রেঞ্চ লাগে। প্রতিটি institution অন্যথায় নিজস্ব online application system চালায় আর নিজস্ব document আর timeline ঠিক করে।')],
          [CH_ETHZ_BACHELOR_APPLY, CH_EPFL_BACHELOR_ADMISSION],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language requirements', 'ভাষার শর্ত'),
      items: [
        qa(
          'english',
          b('Is Swiss Bachelor’s study available in English?', 'Swiss Bachelor\'s পড়া ইংরেজিতে পাওয়া যায়?'),
          [b('Not verified yet as a general rule for Bangladesh-relevant programmes on the pages read: ETH Zurich requires a German-language certificate for Bachelor’s admission (due by the 31 March deadline), and EPFL requires CEFR B2 French for its Bachelor’s programmes — English-taught Bachelor’s study is rare. English-taught Bachelor’s options exist at some Swiss institutions (e.g. some private universities, or specific programmes at other public universities), but none was confirmed and itemized for this guide — check each institution’s own programme list.', 'এখনো যাচাই হয়নি Bangladesh-সম্পর্কিত programme-এর জন্য একটি সাধারণ নিয়ম হিসেবে পড়া page-এ: ETH Zurich Bachelor\'s ভর্তির জন্য একটি German-language সনদ চায় (31 March deadline-এর মধ্যে), আর EPFL তার Bachelor\'s programme-এর জন্য CEFR B2 ফ্রেঞ্চ চায় — ইংরেজি-মাধ্যম Bachelor\'s পড়া বিরল। কিছু Swiss institution-এ (যেমন কিছু private university, বা অন্য public university-র নির্দিষ্ট programme) ইংরেজি-মাধ্যম Bachelor\'s option আছে, কিন্তু এই guide-এর জন্য কোনোটা নিশ্চিত বা তালিকাভুক্ত হয়নি — প্রতিটি institution-এর নিজস্ব programme তালিকা দেখুন।')],
          [CH_ETHZ_BACHELOR_APPLY, CH_EPFL_BACHELOR_ADMISSION],
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
          b("How much is a Bachelor's in Switzerland?", "Switzerland-এ Bachelor's-এ খরচ কত?"),
          [b('Switzerland’s public-university tuition is comparatively low even for international students, but it varies by institution and changed recently for some. ETH Zurich and EPFL charge the same official rate to all students — CHF 730/semester for students who qualify for the simple-fee group, and CHF 2,190/semester for everyone else (including most foreign Bachelor’s students who did not hold Swiss residence before their studies), a rate that tripled from autumn 2025. The University of Zurich charges a CHF 720/semester base fee plus a CHF 500/semester surcharge for foreign Bachelor’s students (CHF 100/semester for Master’s/PhD). The University of Geneva’s own fee page states a flat CHF 500/semester for everyone, with no separate foreign-student surcharge confirmed on the page read for this guide.', 'Switzerland-এর public-university tuition international student-দের জন্যও তুলনামূলকভাবে কম, কিন্তু institution অনুযায়ী আলাদা আর কিছুর জন্য সম্প্রতি বদলেছে। ETH Zurich আর EPFL সব student-কে একই official rate চার্জ করে — simple-fee group-এর জন্য যোগ্য student-দের জন্য CHF 730/semester, আর বাকি সবার জন্য (পড়ার আগে Swiss residence না থাকা অধিকাংশ বিদেশি Bachelor\'s student-সহ) CHF 2,190/semester, একটি rate যা 2025 autumn থেকে তিনগুণ হয়েছে। University of Zurich একটি CHF 720/semester base fee সঙ্গে বিদেশি Bachelor\'s student-দের জন্য CHF 500/semester surcharge চার্জ করে (Master\'s/PhD-র জন্য CHF 100/semester)। University of Geneva-র নিজের fee page সবার জন্য একটি flat CHF 500/semester বলে, এই guide-এর জন্য পড়া page-এ আলাদা বিদেশি-student surcharge নিশ্চিত হয়নি।'), CHECK_UNI],
          [CH_ETHZ_TUITION, CH_UZH_FEES, CH_UNIGE_FEES],
          { status: 'verified' },
        ),
        scholarships('scholarships'),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b('A relevant Bachelor’s needed · several programmes taught in English · visa D process ≈ 2–3 months', 'সম্পর্কিত Bachelor\'s লাগে · কয়েকটি programme ইংরেজিতে পড়ানো হয় · visa D process ≈ 2–3 মাস'),
  intro: b(
    "Master's study is where Switzerland offers genuinely English-taught options for Bangladeshi applicants: EPFL's Master's programmes (e.g. Computer Science) are taught entirely in English, with English certificates welcomed but not required, and other institutions offer specific English-taught Master's programmes too. You need a Bachelor's degree (or equivalent) from a field related to the programme; EPFL allows only one Master's application per academic year, with deadlines of 15 December or 31 March. As a Bangladeshi applicant you need a national visa D and cantonal residence permit once admitted.",
    "Master's পড়া সেই স্তর যেখানে Switzerland Bangladeshi আবেদনকারীদের জন্য আসলেই ইংরেজি-মাধ্যম option দেয়: EPFL-এর Master's programme (যেমন Computer Science) সম্পূর্ণ ইংরেজিতে পড়ানো হয়, ইংরেজি সনদ স্বাগত কিন্তু আবশ্যক না, আর অন্য institution-এও নির্দিষ্ট ইংরেজি-মাধ্যম Master's programme আছে। Programme-এর সাথে সম্পর্কিত একটি field থেকে একটি Bachelor's degree (বা সমতুল্য) লাগে; EPFL প্রতি academic year-এ শুধু একটি Master's application অনুমতি দেয়, 15 December বা 31 March deadline সহ। Bangladeshi আবেদনকারী হিসেবে ভর্তি হলে একটি national visa D আর cantonal residence permit লাগে।",
  ),
  costs: { official: [ETHZ_APPLICATION_FEE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in Switzerland?", "Switzerland-এ Master's-এ কী লাগে?"),
          [b('A Bachelor’s degree (or equivalent) from a university, in a field related to the Master’s programme. EPFL explicitly allows anyone holding a Bachelor’s degree from a university to apply, but only for one programme per academic year; other institutions set their own faculty-level academic admission requirements (sometimes a minimum overall grade, a letter of motivation, or extra coursework up to 60 ECTS). How a Bangladeshi Bachelor’s degree’s grading scale is specifically assessed was not confirmed on an official page for this guide.', 'একটি university-র একটি Bachelor\'s degree (বা সমতুল্য), Master\'s programme-এর সাথে সম্পর্কিত একটি field-এ। EPFL স্পষ্টভাবে একটি university-র Bachelor\'s degree থাকা কাউকে আবেদন করার অনুমতি দেয়, কিন্তু প্রতি academic year-এ শুধু একটি programme-এর জন্য; অন্য institution নিজস্ব faculty-level academic ভর্তির শর্ত ঠিক করে (কখনো একটি ন্যূনতম overall grade, একটি motivation letter, বা 60 ECTS পর্যন্ত অতিরিক্ত coursework)। একটি Bangladeshi Bachelor\'s degree-র grading scale নির্দিষ্টভাবে কীভাবে মূল্যায়ন করা হয়, এই guide-এর জন্য কোনো official page-এ নিশ্চিত হয়নি।')],
          [CH_EPFL_MASTER_ADMISSION, CH_UZH_MASTER_ADMISSION],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b('When and how do you apply?', 'কখন আর কীভাবে আবেদন করবেন?'),
          [b('EPFL’s Master’s application is entirely online, in French or English, open from mid-November to 15 December or from 16 December to 31 March (you choose either window); decisions follow by late March or mid-June respectively. The application fee is CHF 150 for a foreign Bachelor’s degree holder. The University of Zurich generally takes up to three months to check a complete application dossier against academic admission requirements. Deadlines and portals differ by institution and programme — always confirm your own.', 'EPFL-এর Master\'s application সম্পূর্ণ অনলাইনে, ফ্রেঞ্চ বা ইংরেজিতে, mid-November থেকে 15 December বা 16 December থেকে 31 March পর্যন্ত খোলা (দুটোর একটি বাছতে পারেন); সিদ্ধান্ত আসে late March বা mid-June-এ। একটি বিদেশি Bachelor\'s degree holder-এর জন্য application fee CHF 150। University of Zurich সাধারণত একটি সম্পূর্ণ application dossier academic ভর্তির শর্তের বিপরীতে চেক করতে তিন মাস পর্যন্ত সময় নেয়। Deadline আর portal institution আর programme অনুযায়ী আলাদা — সবসময় আপনার নিজের নিশ্চিত করুন।')],
          [CH_EPFL_MASTER_ONLINE_APPLY, CH_UZH_MASTER_ADMISSION],
          { status: 'verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language requirements', 'ভাষার শর্ত'),
      items: [
        qa(
          'english',
          b('How much IELTS do you need for a Master’s?', 'Master\'s-এ IELTS কত লাগে?'),
          [b('Not a single national minimum — set per institution and programme. The University of Zurich’s own language-requirements page states IELTS Academic 7.0 overall (minimum 6.5 in Speaking and Writing) for English-taught study programmes, or TOEFL iBT 100 (for test dates before 21 January 2026; a new scale applies from that date), C1 Advanced grade B, or C2 Proficiency. EPFL’s Master’s in Computer Science states English certificates (TOEFL, IELTS) are welcomed but not required, since strong English skills are simply expected given the programme is taught entirely in English — always check your own programme.', 'একক জাতীয় ন্যূনতম না — institution আর programme অনুযায়ী ঠিক হয়। University of Zurich-এর নিজের language-requirements page ইংরেজি-মাধ্যম study programme-এর জন্য IELTS Academic 7.0 overall (Speaking আর Writing-এ ন্যূনতম 6.5) বলে, বা TOEFL iBT 100 (21 January 2026-এর আগে test date-এর জন্য; সেই তারিখ থেকে একটি নতুন scale প্রযোজ্য), C1 Advanced grade B, বা C2 Proficiency। EPFL-এর Master\'s in Computer Science বলে ইংরেজি সনদ (TOEFL, IELTS) স্বাগত কিন্তু আবশ্যক না, কারণ programme সম্পূর্ণ ইংরেজিতে পড়ানো হওয়ায় শক্তিশালী ইংরেজি দক্ষতা সাধারণভাবে প্রত্যাশিত — সবসময় আপনার নিজের programme দেখুন।')],
          [CH_UZH_LANGUAGE_REQUIREMENTS],
          { status: 'verified' },
        ),
      ],
    },
    {
      id: 'tuition',
      title: b('Tuition and scholarships', 'Tuition আর scholarship'),
      items: [
        qa(
          'tuition',
          b("How much is a Master's in Switzerland?", "Switzerland-এ Master's-এ খরচ কত?"),
          [b('The same federal/cantonal fee structures as Bachelor’s generally apply: ETH Zurich and EPFL charge CHF 2,190/semester for most foreign Master’s students (CHF 730 for those who qualify for the simple-fee group), the University of Zurich adds a CHF 100/semester surcharge for foreign Master’s students to its CHF 720 base fee, and the University of Geneva states a flat CHF 500/semester. None of this includes living costs, which several sources describe as high even where tuition is low — no single official living-cost figure was confirmed for this guide.', 'Bachelor\'s-এর মতো একই federal/cantonal fee structure সাধারণত প্রযোজ্য: ETH Zurich আর EPFL অধিকাংশ বিদেশি Master\'s student-এর জন্য CHF 2,190/semester চার্জ করে (simple-fee group-এর জন্য যোগ্য student-দের জন্য CHF 730), University of Zurich তার CHF 720 base fee-র উপর বিদেশি Master\'s student-দের জন্য CHF 100/semester surcharge যোগ করে, আর University of Geneva একটি flat CHF 500/semester বলে। এর মধ্যে থাকা-খাওয়ার খরচ ধরা নেই, যা কয়েকটি source tuition কম হওয়া সত্ত্বেও বেশি বলে বর্ণনা করে — এই guide-এর জন্য কোনো একক official থাকা-খাওয়ার খরচের সংখ্যা নিশ্চিত হয়নি।'), CHECK_UNI],
          [CH_ETHZ_TUITION, CH_UZH_FEES, CH_UNIGE_FEES],
          { status: 'verified' },
        ),
        scholarships('scholarships'),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ PhD

const PHD: DegreeGuide = {
  level: 'phd',
  card: b('A relevant Master’s needed · often a paid assistant position, not a fee-paying student · SGS scholarship route exists', 'সম্পর্কিত Master\'s লাগে · প্রায়ই একটি paid assistant position, fee-paying student না · SGS scholarship route আছে'),
  intro: b(
    "A Swiss PhD usually needs a Master's degree (or equivalent) and either a paid doctoral-assistant position with a supervisor, or a scholarship such as the Swiss Government Excellence Scholarship (SGS) — which for Bangladesh is open only at Research Fellowship/PhD level, requiring a letter of support from a Swiss academic supervisor before applying. Many Swiss PhD candidates are formally employed by their institution rather than fee-paying students, which can affect which residence-permit route applies; this distinction was not fully confirmed on an official SEM page for this guide, so check with your specific university and the relevant cantonal authority.",
    "একটি Swiss PhD-তে সাধারণত লাগে একটি Master's degree (বা সমতুল্য) আর হয় একজন supervisor-এর সাথে একটি paid doctoral-assistant position, বা Swiss Government Excellence Scholarship (SGS)-এর মতো একটি scholarship — যা Bangladesh-এর জন্য শুধু Research Fellowship/PhD level-এ খোলা, আবেদনের আগে একজন Swiss academic supervisor-এর একটি letter of support লাগে। অনেক Swiss PhD candidate আনুষ্ঠানিকভাবে তাদের institution-এ employed, fee-paying student না, যা কোন residence-permit route প্রযোজ্য তা প্রভাবিত করতে পারে; এই পার্থক্য এই guide-এর জন্য কোনো official SEM page-এ সম্পূর্ণ নিশ্চিত হয়নি, তাই আপনার নির্দিষ্ট university আর সংশ্লিষ্ট cantonal authority-র সাথে চেক করুন।",
  ),
  costs: { official: [], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Switzerland?', 'Switzerland-এ কীভাবে PhD পাওয়া যায়?'),
          [
            b('Typically either apply for an advertised doctoral-assistant vacancy or arrange a position with a supervisor (often paid, employed work rather than a fee-paying enrolment), or apply for the Swiss Government Excellence Scholarship (SGS) — which for Bangladesh covers Research Fellowship and PhD scholarship types, open to applicants who already hold a master’s degree, and requires finding and securing a letter of support from a Swiss academic supervisor before applying. Exact entry requirements beyond this general shape, and institution-specific doctoral-admissions processes, were not itemized nationally for this guide.', 'সাধারণত হয় একটি বিজ্ঞাপিত doctoral-assistant vacancy-র জন্য আবেদন করুন বা একজন supervisor-এর সাথে একটি position ঠিক করুন (প্রায়ই paid, employed কাজ, fee-paying ভর্তি না), বা Swiss Government Excellence Scholarship (SGS)-এর জন্য আবেদন করুন — যা Bangladesh-এর জন্য Research Fellowship আর PhD scholarship ধরন কভার করে, যে আবেদনকারীদের ইতিমধ্যে একটি master\'s degree আছে তাদের জন্য খোলা, আর আবেদনের আগে একজন Swiss academic supervisor-এর একটি letter of support খুঁজে নিশ্চিত করতে হয়। এই সাধারণ ধারার বাইরে সঠিক ভর্তির শর্ত, আর institution-specific doctoral-admissions process, এই guide-এর জন্য জাতীয়ভাবে তালিকাভুক্ত হয়নি।'),
            CHECK_UNI,
          ],
          [CH_SBFI_SGS, CH_SBFI_SGS_GLANCE],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language requirements', 'ভাষার শর্ত'),
      items: [
        qa(
          'english',
          b('How much IELTS do you need for a PhD?', 'PhD-তে IELTS কত লাগে?'),
          [b('Not verified yet as a single general rule: each institution’s doctoral school or supervisor states its own language expectations, where one is required at all for an employed doctoral-assistant position.', 'সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: প্রতিটি institution-এর doctoral school বা supervisor নিজের ভাষার প্রত্যাশা দেয়, যদি একজন employed doctoral-assistant position-এর জন্য আদৌ একটি লাগে।')],
          [CH_SBFI_SGS],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ the country

export const CH_GUIDE: CountryGuide = {
  code: 'CH',
  checkedAt: CH_READ,
  sourcesPerSection: true,
  intro: b(
    'Switzerland is not an EU/EEA member — it only joins the Schengen area for short-stay (≤90-day) travel — so a Bangladeshi applicant goes through Switzerland’s own national visa (type D) and partly-cantonal residence-permit process: the Embassy of Switzerland in Bangladesh (Dhaka) receives your application and the canton where your university is located decides on and issues the actual residence permit (Permit B). The Dhaka Embassy’s own checklist puts the whole process at about three months, and the student-visa fee itself is free of charge; register with your commune within 14 days of arrival. Health insurance is compulsory for every resident within three months of taking up residence (Federal Office of Public Health). No single official nationwide minimum-funds figure was confirmed — the Embassy’s checklist instead asks for a sponsor declaration, six months of bank statements and three years of tax returns, assessed per application and canton. During study, non-EU/EFTA students may work up to 15 hours a week outside holidays, but not before six months after their course starts, and only once the university confirms compatibility and the employer secures cantonal approval. After graduating, SEM confirms a six-month period to look for a job matching your qualifications (ETH Zurich frames this as a 6-month residence-permit extension from your graduation date). Switzerland’s public-university tuition is comparatively low even for non-EU students — ETH Zurich and EPFL now charge CHF 2,190/semester to most foreign students (CHF 730 for those who qualify for the lower rate, after this tripled from autumn 2025), the University of Zurich adds a CHF 500/semester (Bachelor’s) or CHF 100/semester (Master’s/PhD) surcharge to its CHF 720 base fee, and the University of Geneva charges a flat CHF 500/semester — though living costs in Switzerland are widely described as high. The Swiss Government Excellence Scholarship is genuinely open to Bangladeshi applicants for its Research Fellowship and PhD scholarship types only (not Bachelor’s/Master’s), through the Embassy of Switzerland in Bangladesh, and requires a Swiss academic supervisor’s letter of support before applying. This guide is built from SEM (sem.admin.ch), the Embassy of Switzerland in Bangladesh (schweiz-bangladesch.eda.admin.ch), the Federal Office of Public Health (bag.admin.ch), the SBFI/FCS/ESKAS (sbfi.admin.ch) and university pages.',
    'Switzerland EU/EEA-র সদস্য না — এটা শুধু short-stay (≤90-দিন) travel-এর জন্য Schengen area-তে যোগ দেয় — তাই একজন Bangladeshi আবেদনকারী Switzerland-এর নিজস্ব national visa (type D) আর আংশিকভাবে-cantonal residence-permit process-এর মধ্য দিয়ে যান: Embassy of Switzerland in Bangladesh (Dhaka) আপনার application গ্রহণ করে আর আপনার university যে canton-এ আছে সেই canton আসল residence permit (Permit B)-এর সিদ্ধান্ত নেয় আর ইস্যু করে। Dhaka Embassy-র নিজের checklist সম্পূর্ণ process প্রায় তিন মাস বলে, আর student-visa fee নিজেই বিনামূল্যে; পৌঁছানোর 14 দিনের মধ্যে আপনার commune-এ register করুন। থাকা শুরুর তিন মাসের মধ্যে প্রতিটি resident-এর জন্য health insurance বাধ্যতামূলক (Federal Office of Public Health)। কোনো একক official জাতীয় ন্যূনতম-funds সংখ্যা নিশ্চিত হয়নি — Embassy-র checklist পরিবর্তে একটি sponsor declaration, ছয় মাসের bank statement, আর তিন বছরের tax return চায়, প্রতি application আর canton অনুযায়ী মূল্যায়ন করা হয়। পড়ার সময়, non-EU/EFTA student-রা ছুটির বাইরে সপ্তাহে 15 ঘণ্টা পর্যন্ত কাজ করতে পারেন, কিন্তু কোর্স শুরুর ছয় মাস আগে না, আর university সামঞ্জস্যতা নিশ্চিত করলে আর employer cantonal অনুমোদন পেলেই। গ্র্যাজুয়েশনের পর, SEM আপনার যোগ্যতার সাথে মেলে এমন একটি চাকরি খোঁজার জন্য ছয় মাসের একটি সময় নিশ্চিত করে (ETH Zurich এটাকে আপনার graduation-এর তারিখ থেকে একটি 6-মাসের residence-permit extension হিসেবে বর্ণনা করে)। Switzerland-এর public-university tuition non-EU student-দের জন্যও তুলনামূলকভাবে কম — ETH Zurich আর EPFL এখন অধিকাংশ বিদেশি student-কে CHF 2,190/semester চার্জ করে (কম rate-এর জন্য যোগ্য student-দের জন্য CHF 730, 2025 autumn থেকে এটা তিনগুণ হওয়ার পর), University of Zurich তার CHF 720 base fee-তে CHF 500/semester (Bachelor\'s) বা CHF 100/semester (Master\'s/PhD) surcharge যোগ করে, আর University of Geneva একটি flat CHF 500/semester চার্জ করে — যদিও Switzerland-এ থাকার খরচ ব্যাপকভাবে বেশি বলে বর্ণিত। Swiss Government Excellence Scholarship Bangladeshi আবেদনকারীদের জন্য আসলেই খোলা শুধু এর Research Fellowship আর PhD scholarship ধরনের জন্য (Bachelor\'s/Master\'s না), Embassy of Switzerland in Bangladesh-এর মাধ্যমে, আর আবেদনের আগে একজন Swiss academic supervisor-এর একটি letter of support লাগে। এই guide SEM (sem.admin.ch), Embassy of Switzerland in Bangladesh (schweiz-bangladesch.eda.admin.ch), Federal Office of Public Health (bag.admin.ch), SBFI/FCS/ESKAS (sbfi.admin.ch), আর university page থেকে তৈরি।',
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [CH_SEM_WORK_FAQ, CH_EDA_BD_STUDENT_VISA_CHECKLIST, CH_BAG_HEALTH_INSURANCE],
      {
        kind: 'guidance',
        list: [
          b('Assuming Switzerland follows EU rules on study or work rights because it is in the Schengen area — it is not an EU/EEA member, and its own national (SEM) and cantonal rules apply, separately from the EU-member rules another country’s guide might describe.', 'ধরে নেওয়া যে Switzerland Schengen area-তে থাকায় পড়া বা কাজের অধিকারে EU নিয়ম অনুসরণ করে — এটা EU/EEA-র সদস্য না, আর এর নিজস্ব national (SEM) আর cantonal নিয়ম প্রযোজ্য, অন্য দেশের guide-এ বর্ণিত EU-সদস্য নিয়ম থেকে আলাদা।'),
          b('Assuming you can start a part-time job as soon as you arrive — non-EU/EFTA students may not work until six months after their course starts, and even then only up to 15 hours a week with university and cantonal approval.', 'ধরে নেওয়া যে পৌঁছানোর সাথে সাথে একটি part-time job শুরু করা যায় — non-EU/EFTA student-রা কোর্স শুরুর ছয় মাস পর্যন্ত কাজ করতে পারেন না, তারপরও university আর cantonal অনুমোদন সহ সপ্তাহে 15 ঘণ্টা পর্যন্ত।'),
          b('Assuming one official nationwide "minimum funds" figure exists — it does not on the pages read for this guide; the Embassy assesses a sponsor declaration and financial documents per application and canton instead.', 'ধরে নেওয়া যে একটি official জাতীয় "ন্যূনতম funds" সংখ্যা আছে — এই guide-এর জন্য পড়া page-এ এটা নেই; Embassy পরিবর্তে প্রতি application আর canton অনুযায়ী একটি sponsor declaration আর financial document মূল্যায়ন করে।'),
          b('Assuming low public tuition means low overall cost — Switzerland’s living costs are widely described as high even where tuition (e.g. CHF 500–2,190/semester) is comparatively low.', 'ধরে নেওয়া যে কম public tuition মানে কম সামগ্রিক খরচ — tuition (যেমন CHF 500–2,190/semester) তুলনামূলকভাবে কম হলেও Switzerland-এ থাকার খরচ ব্যাপকভাবে বেশি বলে বর্ণিত।'),
          b('Assuming the Swiss Government Excellence Scholarship covers Bachelor’s or Master’s study for Bangladeshi applicants — for Bangladesh it covers only the Research Fellowship and PhD scholarship types, for applicants who already hold a master’s degree.', 'ধরে নেওয়া যে Swiss Government Excellence Scholarship Bangladeshi আবেদনকারীদের জন্য Bachelor\'s বা Master\'s পড়া কভার করে — Bangladesh-এর জন্য এটা শুধু Research Fellowship আর PhD scholarship ধরন কভার করে, যাদের ইতিমধ্যে master\'s degree আছে তাদের জন্য।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in Switzerland from Bangladesh?", "Bangladesh থেকে Switzerland-এ Bachelor's পড়তে কী কী লাগে?"), [b('A secondary-school certificate your institution assesses for country-specific equivalence, the language proficiency the programme is taught in, an application through the institution’s own system, and — since Bangladesh is not EU/EFTA — a national visa D plus cantonal residence permit from the Embassy of Switzerland in Bangladesh.', 'আপনার institution country-specific সমতুল্যতার জন্য মূল্যায়ন করে এমন একটি secondary-school সনদ, programme যে ভাষায় পড়ানো হয় তার দক্ষতা, institution-এর নিজস্ব system-এর মাধ্যমে একটি application, আর — Bangladesh EU/EFTA না হওয়ায় — Embassy of Switzerland in Bangladesh থেকে একটি national visa D সঙ্গে cantonal residence permit।')], [CH_ETHZ_BACHELOR_APPLY, CH_EDA_BD_STUDENT_VISA_CHECKLIST], { status: 'partly-verified' }),
    qa('hsc', b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'), [b('Not verified yet for Bangladesh specifically: Swiss institutions assess upper-secondary certificates by country, and a Bangladesh-HSC-specific rule was not found on an official page for this guide.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: Swiss institution-গুলো দেশ অনুযায়ী upper-secondary সনদ মূল্যায়ন করে, আর একটি Bangladesh-HSC-specific নিয়ম এই guide-এর জন্য কোনো official page-এ পাওয়া যায়নি।')], [CH_UZH_LANGUAGE_REQUIREMENTS], { status: 'not-verified' }),
    qa('cost', b('How much does it cost to study in Switzerland?', 'Switzerland-এ পড়াশোনার খরচ কত?'), [b('There is no single national figure, but public-university tuition is comparatively low: ETH Zurich/EPFL charge CHF 730 or CHF 2,190 a semester depending on fee group, the University of Zurich CHF 720 plus a CHF 100–500 surcharge for foreign students, and the University of Geneva a flat CHF 500 a semester — plus living costs, which several sources describe as high, though no single official figure was confirmed.', 'কোনো একক জাতীয় সংখ্যা নেই, কিন্তু public-university tuition তুলনামূলকভাবে কম: ETH Zurich/EPFL fee group অনুযায়ী সেমিস্টারে CHF 730 বা CHF 2,190 চার্জ করে, University of Zurich CHF 720 সঙ্গে বিদেশি student-দের জন্য CHF 100–500 surcharge, আর University of Geneva সেমিস্টারে একটি flat CHF 500 — সঙ্গে থাকার খরচ, যা কয়েকটি source বেশি বলে বর্ণনা করে, যদিও কোনো একক official সংখ্যা নিশ্চিত হয়নি।')], [CH_ETHZ_TUITION, CH_UZH_FEES, CH_UNIGE_FEES], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for Switzerland?', 'Switzerland-এ IELTS কত লাগে?'), [b('Not a single national minimum; the University of Zurich asks IELTS 7.0 overall for its English-taught programmes, while EPFL’s English-taught Master’s says a certificate is welcomed but not required — always check your own institution and programme.', 'একক জাতীয় ন্যূনতম না; University of Zurich তার ইংরেজি-মাধ্যম programme-এর জন্য IELTS 7.0 overall চায়, আর EPFL-এর ইংরেজি-মাধ্যম Master\'s বলে একটি সনদ স্বাগত কিন্তু আবশ্যক না — সবসময় আপনার নিজের institution আর programme দেখুন।')], [CH_UZH_LANGUAGE_REQUIREMENTS], { status: 'partly-verified' }),
    qa('visa', b('What do you need for the student visa and residence permit?', 'Student visa আর residence permit-এর জন্য কী কী লাগে?'), [b('A national visa D application submitted in person at the Embassy of Switzerland in Bangladesh (Dhaka), with an acceptance letter, academic certificates, financial-resources proof, a language certificate, a police-clearance certificate and more — the Embassy forwards it to the cantonal authority, which decides and issues the actual residence permit, taking about three months in total.', 'Embassy of Switzerland in Bangladesh (Dhaka)-এ সশরীরে জমা দেওয়া একটি national visa D application, একটি acceptance letter, academic সনদ, financial-resources প্রমাণ, একটি language সনদ, একটি police-clearance certificate আর আরও অনেক কিছু সহ — Embassy এটা cantonal authority-তে পাঠায়, যারা সিদ্ধান্ত নেয় আর আসল residence permit ইস্যু করে, সামগ্রিকভাবে প্রায় তিন মাস লাগে।')], [CH_EDA_BD_STUDENT_VISA_CHECKLIST, CH_EDA_BD_PROCESS]),
    qa('work', b('Can you work while studying in Switzerland?', 'Switzerland-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b('Yes, up to 15 hours a week outside holidays, but only from six months after your course starts, and only with your university confirming it is compatible with your studies and your employer securing cantonal approval.', 'হ্যাঁ, ছুটির বাইরে সপ্তাহে 15 ঘণ্টা পর্যন্ত, কিন্তু কোর্স শুরুর ছয় মাস পর থেকেই, আর শুধু আপনার university সামঞ্জস্যতা নিশ্চিত করলে আর আপনার employer cantonal অনুমোদন পেলে।')], [CH_SEM_WORK_FAQ]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('The Swiss Government Excellence Scholarship (SGS) is genuinely open to Bangladeshi applicants by country listing, but for Research Fellowship/PhD scholarship types only — not Bachelor’s or standalone Master’s study — and it requires a Swiss academic supervisor’s letter of support before applying.', 'Swiss Government Excellence Scholarship (SGS) দেশের তালিকার দিক থেকে Bangladeshi আবেদনকারীদের জন্য আসলেই খোলা, কিন্তু শুধু Research Fellowship/PhD scholarship ধরনের জন্য — Bachelor\'s বা standalone Master\'s পড়ার জন্য না — আর আবেদনের আগে একজন Swiss academic supervisor-এর একটি letter of support লাগে।')], [CH_SBFI_SGS_ASIA_LIST], { status: 'partly-verified' }),
    qa('after', b('Can you stay in Switzerland after graduating?', 'পড়া শেষে Switzerland-এ থাকা যায়?'), [b('Yes, for up to six months from your graduation date to look for a job matching your qualifications, per SEM’s own rule, confirmed by ETH Zurich’s own residence-permit-extension page for its students.', 'হ্যাঁ, SEM-র নিজের নিয়ম অনুযায়ী, আপনার যোগ্যতার সাথে মেলে এমন একটি চাকরি খোঁজার জন্য graduation-এর তারিখ থেকে ছয় মাস পর্যন্ত, ETH Zurich-এর নিজের student-দের জন্য residence-permit-extension page দ্বারা নিশ্চিত।')], [CH_SEM_WORK_FAQ, CH_ETHZ_JOBSEEKING]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('Not verified yet as a single official nationwide figure; the Embassy of Switzerland in Bangladesh instead asks for a sponsor declaration, six months of bank statements and three years of tax returns, assessed per application and canton.', 'এখনো যাচাই হয়নি একটি একক official জাতীয় সংখ্যা হিসেবে; Embassy of Switzerland in Bangladesh পরিবর্তে একটি sponsor declaration, ছয় মাসের bank statement, আর তিন বছরের tax return চায়, প্রতি application আর canton অনুযায়ী মূল্যায়ন করা হয়।')], [CH_EDA_BD_STUDENT_VISA_CHECKLIST], { status: 'not-verified' }),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before the visa stage: admission/acceptance letter, apostilled academic certificates, a language certificate. At the visa stage: financial-resources proof, a police-clearance certificate, proof of family bonds. Throughout your stay: health-insurance registration within three months, and commune registration within 14 days of arrival.', 'Visa পর্যায়ের আগে: admission/acceptance letter, apostilled academic সনদ, একটি language সনদ। Visa পর্যায়ে: financial-resources প্রমাণ, একটি police-clearance certificate, family bond-এর প্রমাণ। থাকার পুরো সময়: তিন মাসের মধ্যে health-insurance registration, আর পৌঁছানোর 14 দিনের মধ্যে commune registration।')], [CH_EDA_BD_STUDENT_VISA_CHECKLIST, CH_BAG_HEALTH_INSURANCE]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b('A Bachelor’s degree (or equivalent) relevant to the programme; EPFL’s Master’s programmes (e.g. Computer Science) are taught entirely in English, with an application fee of CHF 150 for a foreign Bachelor’s-degree holder.', 'Programme-এর সাথে সম্পর্কিত একটি Bachelor\'s degree (বা সমতুল্য); EPFL-এর Master\'s programme (যেমন Computer Science) সম্পূর্ণ ইংরেজিতে পড়ানো হয়, একটি বিদেশি Bachelor\'s-degree holder-এর জন্য CHF 150 application fee সহ।')], [CH_EPFL_MASTER_ADMISSION]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Not verified yet as general national rules: usually a relevant master’s degree and either an advertised doctoral-assistant position (often paid/employed) or the Swiss Government Excellence Scholarship (PhD scholarship type for Bangladesh), which needs a Swiss academic supervisor’s letter of support before applying.', 'সাধারণ জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: সাধারণত একটি সম্পর্কিত master\'s degree আর হয় একটি বিজ্ঞাপিত doctoral-assistant position (প্রায়ই paid/employed) বা Swiss Government Excellence Scholarship (Bangladesh-এর জন্য PhD scholarship ধরন), যার আবেদনের আগে একজন Swiss academic supervisor-এর একটি letter of support লাগে।')], [CH_SBFI_SGS], { status: 'not-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — ETH Zurich, EPFL, the University of Zurich and the University of Geneva — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — ETH Zurich, EPFL, University of Zurich, আর University of Geneva — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [CH_ETHZ_TUITION]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: the Embassy of Switzerland in Bangladesh (Dhaka) is the mission that handles your visa D application and publishes its own student-visa checklist, and the SBFI’s official country list confirms the Swiss Government Excellence Scholarship (Research Fellowship/PhD types) is open to Bangladesh via that Embassy. No official page read for this guide gives a Bangladesh-specific HSC-equivalence rule, a single official minimum-funds figure, or a Bangladesh-specific visa approval-rate — these were not verified here.', 'Bangladesh-এর জন্য যাচাই করা: Embassy of Switzerland in Bangladesh (Dhaka) সেই mission যারা আপনার visa D application পরিচালনা করে আর নিজের student-visa checklist প্রকাশ করে, আর SBFI-র official country list নিশ্চিত করে Swiss Government Excellence Scholarship (Research Fellowship/PhD ধরন) সেই Embassy-র মাধ্যমে Bangladesh-এর জন্য খোলা। পড়া কোনো official page এই guide-এর জন্য একটি Bangladesh-specific HSC-সমতুল্যতার নিয়ম, একটি একক official ন্যূনতম-funds সংখ্যা, বা একটি Bangladesh-specific visa approval-rate দেয় না — এগুলো এখানে যাচাই হয়নি।'),
    ], [CH_EDA_BD_EMBASSY, CH_EDA_BD_STUDENT_VISA_CHECKLIST, CH_SBFI_SGS_ASIA_LIST], { status: 'partly-verified' }),
  ],
  life: [
    qa('arrival', b('What happens when you arrive?', 'পৌঁছানোর পর কী হয়?'), [b('Register with your local commune’s residents’ registration office within 14 days of entry, per the Dhaka Embassy’s own checklist; you must also take out compulsory Swiss health insurance within three months of taking up residence, per the Federal Office of Public Health.', 'Dhaka Embassy-র নিজের checklist অনুযায়ী প্রবেশের 14 দিনের মধ্যে আপনার স্থানীয় commune-এর residents’ registration office-এ register করুন; Federal Office of Public Health অনুযায়ী থাকা শুরুর তিন মাসের মধ্যে compulsory Swiss health insurance-ও নিতে হবে।')], [CH_EDA_BD_STUDENT_VISA_CHECKLIST, CH_BAG_HEALTH_INSURANCE]),
  ],
  documents: CH_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'fact', status: 'verified', value: { min: 500, max: 2190, unit: 'CHF/semester', text: b('CHF 500/semester flat at the University of Geneva, up to CHF 2,190/semester at ETH Zurich/EPFL for most foreign students (CHF 730 for those who qualify for the lower fee group).', 'University of Geneva-তে flat CHF 500/semester, ETH Zurich/EPFL-এ অধিকাংশ বিদেশি student-এর জন্য CHF 2,190/semester পর্যন্ত (কম fee group-এর জন্য যোগ্য student-দের জন্য CHF 730)।') }, source: CH_ETHZ_TUITION },
    { id: 'funds-to-show', kind: 'guidance', status: 'not-verified', source: CH_EDA_BD_STUDENT_VISA_CHECKLIST },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { min: 15, max: 15, unit: 'hours/week (from 6 months after course start)', text: b('Up to 15 hours a week outside holidays, only from six months after the course starts, with university and cantonal approval.', 'ছুটির বাইরে সপ্তাহে 15 ঘণ্টা পর্যন্ত, শুধু কোর্স শুরুর ছয় মাস পর থেকে, university আর cantonal অনুমোদন সহ।') }, source: CH_SEM_WORK_FAQ },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { min: 6, max: 6, unit: 'months', text: b('6 months from graduation to look for a job matching your qualifications.', 'Graduation থেকে আপনার যোগ্যতার সাথে মেলে এমন একটি চাকরি খোঁজার জন্য 6 মাস।') }, source: CH_SEM_WORK_FAQ },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 0, max: 0, unit: 'CHF', text: b('The Dhaka Embassy states the student-visa processing fee itself is free of charge.', 'Dhaka Embassy বলে student-visa processing fee নিজেই বিনামূল্যে।') }, source: CH_EDA_BD_STUDENT_VISA_CHECKLIST },
  ],
};

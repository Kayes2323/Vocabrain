import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  HU_BME_ADMISSION,
  HU_BME_TUITION,
  HU_DEBRECEN_ADMISSION,
  HU_DEBRECEN_FEES,
  HU_ELTE,
  HU_ELTE_SCIENCE_FEE,
  HU_OIF_D_VISA_PICKUP,
  HU_OIF_JOBSEEKING_PERMIT,
  HU_OIF_PROCEDURAL_FEES,
  HU_OIF_STUDENT_PERMIT,
  HU_READ,
  HU_SEMMELWEIS_FEES,
  HU_SH_APPLY,
  HU_SH_CALL_BA_MA_OTM,
  HU_SH_PARTNERS,
  HU_SIH_HEALTH,
  HU_SIH_TUITION,
  HU_SIH_VISA,
} from './hu-sources';

/**
 * Hungary reading guide, researched on its own from Hungarian official
 * sources (the National Directorate-General for Aliens Policing — OIF/
 * NDGAP, oif.gov.hu — the national immigration authority for the study
 * residence permit, the D-type visa and the post-study job-seeking permit;
 * the government-backed "Study in Hungary" portal, studyinhungary.hu, run
 * by Tempus Public Foundation; the Stipendium Hungaricum Scholarship
 * Programme’s own site, stipendiumhungaricum.hu, also run by Tempus Public
 * Foundation on behalf of the Ministry of Foreign Affairs and Trade; and
 * university pages). Nothing is taken from another country’s guide.
 * Hungary IS an EU/EEA and Schengen member, unlike Switzerland — but a
 * Bangladeshi applicant is still a third-country national under Hungary’s
 * own immigration law, so Hungary’s national rules (not an EU-wide rule
 * borrowed from another member state’s guide) apply throughout. Amounts
 * stay in the source’s own currency (HUF, EUR or USD, as each university or
 * authority states it) and are never converted. It covers Bachelor’s,
 * Master’s and PhD study for Bangladeshi (non-EU/EEA) students.
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
  'ELTE, BME, Semmelweis University and the University of Debrecen are not identical: each sets its own tuition, admission requirements and application deadlines per programme. Always check the exact programme on the institution’s own admissions page.',
  'ELTE, BME, Semmelweis University, আর University of Debrecen একরকম না: প্রতিটি নিজের tuition, ভর্তির শর্ত, আর প্রতি programme application deadline ঠিক করে। প্রতিটি programme-এর জন্য প্রতিষ্ঠানের নিজের admissions page অবশ্যই দেখে নিন।',
);

const EU_NOTE = b(
  'Hungary is an EU/EEA member and a full Schengen member — but Bangladesh is not an EU/EEA country, so a Bangladeshi applicant is still a "third-country national" under Hungarian immigration law and needs Hungary’s own residence permit for study purposes, not a simplified EU-citizen process.',
  'Hungary EU/EEA-র সদস্য আর একটি পূর্ণ Schengen সদস্য — কিন্তু Bangladesh EU/EEA দেশ না, তাই একজন Bangladeshi আবেদনকারী Hungarian immigration আইনের অধীনে এখনো একজন "third-country national", আর তার Hungary-র নিজের পড়ার জন্য residence permit লাগে, কোনো সহজ EU-নাগরিক process না।',
);

// ------------------------------------------------------------------ shared answers

const visaRequired = (id: string) =>
  qa(
    id,
    b('Does a Bangladeshi student need a visa to study in Hungary?', 'Bangladesh-এর student-দের Hungary-তে পড়তে visa লাগে কি?'),
    [
      b(
        'Yes. Bangladesh is under visa obligation for Hungary, and a stay of more than 90 days needs a residence permit for the purpose of studies, issued by the National Directorate-General for Aliens Policing (NDGAP, known by its Hungarian acronym OIF). The application for this residence permit is submitted outside Hungary, before a Hungarian diplomatic or consular mission in the applicant’s country of nationality or residence — and OIF’s own factsheet states that submitting a separate visa application is not required, because the residence-permit application itself comprises the visa application.',
        'হ্যাঁ। Hungary-র জন্য Bangladesh visa-বাধ্যতামূলক দেশ, আর 90 দিনের বেশি থাকার জন্য পড়ার উদ্দেশ্যে একটি residence permit লাগে, National Directorate-General for Aliens Policing (NDGAP, Hungarian acronym OIF) ইস্যু করে। এই residence permit-এর application Hungary-র বাইরে জমা দিতে হয়, আবেদনকারীর নাগরিকত্ব বা বসবাসের দেশে একটি Hungarian diplomatic বা consular mission-এ — আর OIF-এর নিজের factsheet বলে আলাদা একটি visa application জমা দেওয়ার প্রয়োজন নেই, কারণ residence-permit application নিজেই visa application-কে অন্তর্ভুক্ত করে।',
      ),
      EU_NOTE,
    ],
    [HU_OIF_STUDENT_PERMIT, HU_SIH_VISA],
    { allDegrees: true },
  );

const visaProcess = (id: string) =>
  qa(
    id,
    b('How does the application work, and how long does it take?', 'Application কীভাবে কাজ করে, আর কত সময় লাগে?'),
    [
      b(
        'You submit the residence-permit application before the Hungarian consulate covering Bangladesh (in practice, via the Hungary Visa Application Centre run by VFS Global in Dhaka, the official partner of the Dhaka Office of the Embassy of Hungary). OIF’s own factsheet states the standard time period for procedural administration is 15 days, and the authority adopts a decision as to merits within 60 days from submission — so plan for up to about two months. Once approved, you receive a single-entry "D"-type visa (authorising a stay of not more than 30 days, valid for 3 months) to travel to Hungary and collect your actual residence-permit card; if you do not enter Hungary within 3 months of approval, the approved residence permit becomes invalid.',
        'Bangladesh-এর জন্য দায়িত্বে থাকা Hungarian consulate-এ (বাস্তবে, Dhaka-য় VFS Global-এর পরিচালিত Hungary Visa Application Centre-এর মাধ্যমে, যা Embassy of Hungary-র Dhaka Office-এর official partner) আপনাকে residence-permit application জমা দিতে হয়। OIF-এর নিজের factsheet বলে procedural administration-এর স্ট্যান্ডার্ড সময়কাল 15 দিন, আর authority জমা দেওয়ার 60 দিনের মধ্যে merits-এর উপর একটি সিদ্ধান্ত নেয় — তাই প্রায় দুই মাস পর্যন্ত সময় রাখুন। অনুমোদিত হলে, Hungary-তে যাওয়ার আর আপনার আসল residence-permit card সংগ্রহ করার জন্য আপনি একটি single-entry "D"-type visa পাবেন (30 দিনের বেশি না থাকার অনুমতি, 3 মাসের জন্য valid); অনুমোদনের 3 মাসের মধ্যে Hungary-তে প্রবেশ না করলে, অনুমোদিত residence permit আর valid থাকে না।',
      ),
    ],
    [HU_OIF_STUDENT_PERMIT, HU_OIF_D_VISA_PICKUP],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'Not verified yet as a single official nationwide figure: OIF’s own factsheet asks applicants to prove "sufficient resources" to cover subsistence, accommodation, return/onward travel and healthcare, documented by one of several means — a bank-account statement in the applicant’s own name, a notarised family declaration of support (plus proof the supporter can actually provide it), a document on regular income, or "other credible means (e.g., a scholarship certificate)" — but it does not state one fixed minimum amount. Figures such as HUF 300,000 (about EUR 750–800) a month appear on some third-party guidance pages, but this was not confirmed as an official OIF minimum on the page read for this guide, so no single number is shown as official here.',
        'একটি একক official জাতীয় সংখ্যা হিসেবে এখনো যাচাই হয়নি: OIF-এর নিজের factsheet আবেদনকারীদের থাকা-খাওয়া, বাসস্থান, ফিরতি/চলমান travel, আর স্বাস্থ্যসেবার খরচ কভার করার "যথেষ্ট সম্পদ" প্রমাণ করতে বলে, কয়েকটি উপায়ে document করা যায় — আবেদনকারীর নিজের নামে bank-account statement, একটি notarised family declaration of support (সঙ্গে supporter আসলেই এটা দিতে পারেন এমন প্রমাণ), নিয়মিত income-এর একটি document, বা "other credible means (যেমন, একটি scholarship certificate)" — কিন্তু এটা একটি নির্দিষ্ট ন্যূনতম পরিমাণ বলে না। HUF 300,000-র (প্রায় EUR 750–800) মতো সংখ্যা মাসে কিছু third-party guidance page-এ দেখা যায়, কিন্তু এই guide-এর জন্য পড়া page-এ এটা কোনো official OIF ন্যূনতম হিসেবে নিশ্চিত হয়নি, তাই এখানে কোনো একক সংখ্যা official হিসেবে দেখানো হয়নি।',
      ),
    ],
    [HU_OIF_STUDENT_PERMIT],
    { allDegrees: true, status: 'not-verified' },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('Is health insurance compulsory?', 'Health insurance কি বাধ্যতামূলক?'),
    [
      b(
        'Yes, to get the residence permit at all. OIF’s own factsheet requires documentary evidence that the applicant has access to comprehensive health insurance covering all healthcare services, or can cover the costs of such services — met by qualifying for social-security health insurance, by an international agreement, or by proof of means of subsistence that can cover healthcare costs. Study in Hungary’s own page adds that non-Hungarian students who do not otherwise qualify may sign an Agreement with the National Health Insurance Fund of Hungary (NEAK); that page’s own cost reference (30% of the local minimum wage for independent cover) is on an older page not re-dated for this guide, so it is marked partly verified rather than current and official.',
        'হ্যাঁ, residence permit পাওয়ার জন্যই। OIF-এর নিজের factsheet documentary প্রমাণ চায় যে আবেদনকারীর সব healthcare service কভার করা comprehensive health insurance আছে, বা সেই service-এর খরচ কভার করতে পারেন — social-security health insurance-এর যোগ্য হয়ে, একটি international agreement দিয়ে, বা healthcare খরচ কভার করতে পারে এমন subsistence-এর প্রমাণ দিয়ে পূরণ করা যায়। Study in Hungary-র নিজের page যোগ করে যে অন্যথায় যোগ্য না হওয়া non-Hungarian student-রা National Health Insurance Fund of Hungary (NEAK)-এর সাথে একটি Agreement সাইন করতে পারেন; সেই page-এর নিজের খরচের তথ্য (স্বাধীন cover-এর জন্য local minimum wage-এর 30%) এই guide-এর জন্য পুনরায় তারিখ দেওয়া হয়নি এমন একটি পুরনো page-এ, তাই এটা বর্তমান আর official-এর পরিবর্তে partly verified হিসেবে চিহ্নিত।',
      ),
    ],
    [HU_OIF_STUDENT_PERMIT, HU_SIH_HEALTH],
    { allDegrees: true, status: 'partly-verified' },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Hungary, and how many hours?', 'Hungary-তে পড়ার পাশাপাশি কাজ করা যায় কি, আর কত ঘণ্টা?'),
    [
      b(
        'Yes. OIF’s own factsheet (last edited 2026.03.02) states that third-country nationals holding a residence permit for the purpose of studies may engage in employment during their study period for a maximum of thirty hours weekly, and outside their study period (i.e. holidays) full time for a maximum period of ninety days in a year. An older Study in Hungary page describes the holiday allowance slightly differently, as "sixty-six working days ... or during a period not exceeding ninety days" — both sources agree on 30 hours/week in term and roughly a 90-day outer limit outside term, so this guide follows OIF’s current wording as the more recently confirmed statement.',
        'হ্যাঁ। OIF-এর নিজের factsheet (সর্বশেষ সম্পাদনা 2026.03.02) বলে পড়ার উদ্দেশ্যে residence permit থাকা third-country national-রা তাদের পড়ার সময়কালে সর্বোচ্চ সপ্তাহে ত্রিশ ঘণ্টা employment নিতে পারেন, আর পড়ার সময়কালের বাইরে (মানে ছুটিতে) পুরো সময় বছরে সর্বোচ্চ নব্বই দিনের জন্য। Study in Hungary-র একটি পুরনো page ছুটির allowance টা একটু আলাদাভাবে বর্ণনা করে, "ষাট-ছয় কর্মদিবস ... বা নব্বই দিনের বেশি না এমন একটি সময়কালে" হিসেবে — দুই source-ই পড়ার সময়কালে সপ্তাহে 30 ঘণ্টা আর পড়ার বাইরে প্রায় 90-দিনের একটি সীমায় একমত, তাই এই guide OIF-এর বর্তমান বাক্যকে আরও সম্প্রতি নিশ্চিত করা বিবৃতি হিসেবে অনুসরণ করে।',
      ),
    ],
    [HU_OIF_STUDENT_PERMIT, HU_SIH_VISA],
    { allDegrees: true, discrepancy: b('OIF (current, 2026.03.02) says 90 days/year outside the study period; an older Study in Hungary page says "66 working days ... or ... 90 days" — both are cited and neither figure is chosen as the sole official one.', 'OIF (বর্তমান, 2026.03.02) বলে পড়ার সময়কালের বাইরে বছরে 90 দিন; Study in Hungary-র একটি পুরনো page বলে "66 কর্মদিবস ... বা ... 90 দিন" — দুটোই উল্লেখ করা হয়েছে আর কোনো একটা সংখ্যাকে একক official হিসেবে বাছা হয়নি।') },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Hungary to look for work after graduating?', 'পড়া শেষে কাজ খোঁজার জন্য Hungary-তে থাকা যায়?'),
    [
      b(
        'Yes, through a separate residence permit. OIF’s own factsheet confirms a holder of a valid residence permit for the purpose of studies who has successfully completed their studies, and whose intended job or business matches the level of their completed studies, may apply in Hungary (via the Enter Hungary platform) for a residence permit for the purpose of seeking a job or starting a business, submitted at least 15 days before the study permit expires. This permit’s validity is capped at 9 months and cannot be extended — OIF does not describe a longer, renewable post-study work route on the pages read for this guide.',
        'হ্যাঁ, একটি আলাদা residence permit-এর মাধ্যমে। OIF-এর নিজের factsheet নিশ্চিত করে যিনি পড়ার উদ্দেশ্যে একটি valid residence permit রাখেন, যিনি সফলভাবে তার পড়া শেষ করেছেন, আর যার উদ্দেশ্যমূলক চাকরি বা ব্যবসা তার শেষ করা পড়ার স্তরের সাথে মেলে, তিনি Hungary-তে (Enter Hungary platform-এর মাধ্যমে) চাকরি খোঁজার বা ব্যবসা শুরু করার উদ্দেশ্যে একটি residence permit-এর জন্য আবেদন করতে পারেন, study permit শেষ হওয়ার অন্তত 15 দিন আগে জমা দিতে হয়। এই permit-এর মেয়াদ সর্বোচ্চ 9 মাস আর বাড়ানো যায় না — এই guide-এর জন্য পড়া page-এ OIF একটি দীর্ঘতর, renewable post-study work route বর্ণনা করে না।',
      ),
    ],
    [HU_OIF_JOBSEEKING_PERMIT],
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'The Stipendium Hungaricum Scholarship Programme is genuinely open to Bangladeshi applicants: the 2026/2027 Call for Applications and the programme’s own Partners page both list the "People’s Republic of Bangladesh" as an eligible Sending Partner, with "Secondary and Higher Education Division, Ministry of Education" named as Bangladesh’s Sending Partner authority. It covers Bachelor’s, Master’s and one-tier Master’s study (PhD scholarships run on a separate call), waives tuition fees entirely, and pays a monthly stipend of HUF 43,700 (about EUR 110) plus a dormitory place or a HUF 40,000/month (about EUR 100) accommodation contribution and medical insurance — but applicants must also be nominated by Bangladesh’s Sending Partner; an application that is not nominated is not considered at all, regardless of how it was submitted to Tempus Public Foundation.',
        'Stipendium Hungaricum Scholarship Programme Bangladeshi আবেদনকারীদের জন্য আসলেই খোলা: 2026/2027 Call for Applications আর programme-এর নিজের Partners page দুটোই "People’s Republic of Bangladesh"-কে একটি যোগ্য Sending Partner হিসেবে তালিকাভুক্ত করে, Bangladesh-এর Sending Partner authority হিসেবে "Secondary and Higher Education Division, Ministry of Education"-কে নাম দিয়ে। এটা Bachelor\'s, Master\'s, আর one-tier Master\'s পড়া কভার করে (PhD scholarship আলাদা call-এ চলে), tuition fee সম্পূর্ণ মাফ করে, আর মাসে HUF 43,700 (প্রায় EUR 110) stipend সঙ্গে একটি dormitory জায়গা বা HUF 40,000/month (প্রায় EUR 100) accommodation contribution আর medical insurance দেয় — কিন্তু আবেদনকারীদের Bangladesh-এর Sending Partner দ্বারা নমিনেট হতেও হয়; নমিনেট না হওয়া একটি application Tempus Public Foundation-এ যেভাবেই জমা দেওয়া হোক, আদৌ বিবেচিত হয় না।',
      ),
    ],
    [HU_SH_CALL_BA_MA_OTM, HU_SH_PARTNERS, HU_SH_APPLY],
    { status: 'partly-verified', kind: 'guidance' },
  );

// ------------------------------------------------------------------ documents

const CONSULATE = b('The Hungarian consulate covering Bangladesh (in practice, the Hungary Visa Application Centre run by VFS Global in Dhaka, the official partner of the Dhaka Office of the Embassy of Hungary).', 'Bangladesh-এর জন্য দায়িত্বে থাকা Hungarian consulate (বাস্তবে, Dhaka-য় VFS Global-এর পরিচালিত Hungary Visa Application Centre, যা Embassy of Hungary-র Dhaka Office-এর official partner)।');

export const HU_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Valid passport', 'Valid passport (মেয়াদসম্পন্ন)'),
    why: b('Your identity document for the residence-permit (visa) application and throughout your stay; OIF’s own factsheet lists proof of meeting the "conditions of exit" (a valid passport, plus a valid return/onward ticket or the funds to cover it) among the mandatory attachments.', 'Residence-permit (visa) application-এর জন্য আর থাকার পুরো সময় আপনার পরিচয়ের document; OIF-এর নিজের factsheet mandatory attachment-এর মধ্যে "conditions of exit" পূরণের প্রমাণ (একটি valid passport, সঙ্গে একটি valid ফিরতি/চলমান টিকেট বা তা কভার করার টাকা) তালিকাভুক্ত করে।'),
    who: CONSULATE,
    when: b('From the application through your residence in Hungary.', 'Application থেকে Hungary-তে থাকার পুরো সময়।'),
    where: b('Submitted at the consulate covering Bangladesh, before entry.', 'প্রবেশের আগে, Bangladesh-এর জন্য দায়িত্বে থাকা consulate-এ জমা দিতে হয়।'),
    prepare: b('The validity period of your residence permit may not exceed the validity period of your passport, so keep it valid well beyond your intended stay.', 'আপনার residence permit-এর মেয়াদ আপনার passport-এর মেয়াদকে ছাড়াতে পারে না, তাই প্রত্যাশিত থাকার সময়ের চেয়ে বেশ বেশি valid রাখুন।'),
    groups: ['general', 'visa'],
    sources: [HU_OIF_STUDENT_PERMIT],
  },
  {
    id: 'admission',
    name: b('Certificate of admission / student-status document', 'ভর্তির certificate / student-status document'),
    why: b('OIF’s own factsheet accepts a certificate of admission from the relevant educational institution, a document verifying student status, or other credible means, as proof of the purpose of residence.', 'OIF-এর নিজের factsheet থাকার উদ্দেশ্যের প্রমাণ হিসেবে সংশ্লিষ্ট educational institution থেকে একটি certificate of admission, student status যাচাই করা একটি document, বা অন্য credible means গ্রহণ করে।'),
    who: b('The Hungarian institution you applied to.', 'যে Hungarian institution-এ আবেদন করছেন।'),
    when: b('After admission, before the residence-permit (visa) application.', 'ভর্তির পর, residence-permit (visa) application-এর আগে।'),
    where: b('Submitted with your application at the consulate covering Bangladesh.', 'Bangladesh-এর জন্য দায়িত্বে থাকা consulate-এ আপনার application-এর সঙ্গে জমা দিতে হয়।'),
    prepare: b('Each institution sets its own admission process and timeline, so confirm with your chosen institution how and when it issues this document.', 'প্রতিটি institution নিজস্ব ভর্তি process আর timeline ঠিক করে, তাই এই document কীভাবে আর কখন ইস্যু করে তা আপনার বাছা institution-এর সাথে নিশ্চিত করুন।'),
    groups: ['general', 'visa'],
    sources: [HU_OIF_STUDENT_PERMIT],
  },
  {
    id: 'language',
    name: b('Proof of the linguistic knowledge required for your studies', 'আপনার পড়ার জন্য প্রয়োজনীয় ভাষাগত দক্ষতার প্রমাণ'),
    why: b('OIF’s own factsheet states applicants must have the linguistic knowledge required for the pursuit of studies, verified by a language-proficiency certificate, an official diploma proving studies in a foreign language, or other credible means.', 'OIF-এর নিজের factsheet বলে আবেদনকারীদের পড়ার জন্য প্রয়োজনীয় ভাষাগত দক্ষতা থাকতে হয়, একটি language-proficiency সনদ, বিদেশি ভাষায় পড়া প্রমাণকারী একটি official diploma, বা অন্য credible means দিয়ে যাচাই করা হয়।'),
    who: b('The institution/programme you apply to (e.g. an IELTS/TOEFL certificate for an English-taught programme).', 'যে institution/programme-এ আবেদন করছেন (যেমন একটি ইংরেজি-মাধ্যম programme-এর জন্য IELTS/TOEFL সনদ)।'),
    when: b('With the application.', 'Application-এর সঙ্গে।'),
    where: b('Uploaded to the institution’s own application system and shown with your residence-permit (visa) application.', 'Institution-এর নিজস্ব application system-এ upload করতে হয় আর আপনার residence-permit (visa) application-এর সঙ্গে দেখাতে হয়।'),
    prepare: b('The exact minimum score (e.g. IELTS 5.5 or 6.0) is set per institution and programme, not by OIF nationally — check your own programme.', 'সঠিক ন্যূনতম স্কোর (যেমন IELTS 5.5 বা 6.0) প্রতি institution আর programme অনুযায়ী ঠিক হয়, জাতীয়ভাবে OIF দ্বারা না — আপনার নিজের programme দেখুন।'),
    groups: ['program', 'visa'],
    sources: [HU_OIF_STUDENT_PERMIT],
  },
  {
    id: 'funds',
    name: b('Proof of means of subsistence', 'Means of subsistence-র প্রমাণ'),
    why: b('OIF requirement: proof that you can cover subsistence, accommodation, return/onward travel and healthcare costs from legally acquired income and savings — a bank-account statement, a notarised family declaration of support with proof the supporter can provide it, a document on regular income, or other credible means such as a scholarship certificate.', 'OIF-এর শর্ত: আইনগতভাবে অর্জিত income আর savings থেকে subsistence, বাসস্থান, ফিরতি/চলমান travel, আর স্বাস্থ্যসেবার খরচ কভার করতে পারার প্রমাণ — একটি bank-account statement, একটি notarised family declaration of support (supporter দিতে পারেন এমন প্রমাণ সহ), নিয়মিত income-এর একটি document, বা একটি scholarship certificate-এর মতো অন্য credible means।'),
    who: CONSULATE,
    when: b('With the application, and again at any extension.', 'Application-এর সঙ্গে, আর যেকোনো extension-এর সময় আবার।'),
    where: b('Submitted at the consulate covering Bangladesh.', 'Bangladesh-এর জন্য দায়িত্বে থাকা consulate-এ জমা দিতে হয়।'),
    prepare: b('No single official nationwide minimum amount was confirmed on the pages read for this guide — prepare clear, verifiable documentation rather than aiming for one fixed number.', 'এই guide-এর জন্য পড়া page-এ কোনো একক official জাতীয় ন্যূনতম পরিমাণ নিশ্চিত হয়নি — একটি নির্দিষ্ট সংখ্যার লক্ষ্যে না গিয়ে স্পষ্ট, যাচাইযোগ্য document তৈরি করুন।'),
    groups: ['visa', 'bangladesh'],
    status: 'not-verified',
    sources: [HU_OIF_STUDENT_PERMIT],
  },
  {
    id: 'insurance',
    name: b('Proof of health insurance', 'Health insurance-র প্রমাণ'),
    why: b('OIF requirement for the residence permit itself: documentary evidence of access to comprehensive health insurance covering all healthcare services, or the ability to cover their cost.', 'Residence permit-এর জন্যই OIF-এর শর্ত: সব healthcare service কভার করা comprehensive health insurance-এ access-এর documentary প্রমাণ, বা তার খরচ কভার করার সক্ষমতা।'),
    who: b('A qualifying health-insurance arrangement, or the National Health Insurance Fund of Hungary (NEAK) by agreement.', 'একটি যোগ্য health-insurance ব্যবস্থা, বা agreement দিয়ে National Health Insurance Fund of Hungary (NEAK)।'),
    when: b('With the application, and maintained throughout your stay.', 'Application-এর সঙ্গে, আর থাকার পুরো সময় বজায় রাখা।'),
    where: b('Shown to the consulate with the application; arranged with NEAK or an insurer after admission.', 'Application-এর সঙ্গে consulate-কে দেখাতে হয়; ভর্তির পর NEAK বা একটি insurer-এর সাথে ব্যবস্থা করতে হয়।'),
    prepare: b('A Stipendium Hungaricum scholarship holder has this covered by the scholarship; a self-financed student should confirm the current arrangement and cost directly with their chosen institution’s international office, since the one cost figure found for this guide was on an older page.', 'একজন Stipendium Hungaricum scholarship holder-এর জন্য এটা scholarship দিয়ে কভার করা থাকে; একজন self-financed student-এর তার বাছা institution-এর international office-এর সাথে সরাসরি বর্তমান ব্যবস্থা আর খরচ নিশ্চিত করা উচিত, কারণ এই guide-এর জন্য পাওয়া একমাত্র খরচের সংখ্যাটা একটি পুরনো page-এ ছিল।'),
    groups: ['visa', 'arrival'],
    status: 'partly-verified',
    sources: [HU_OIF_STUDENT_PERMIT, HU_SIH_HEALTH],
  },
  {
    id: 'photo',
    name: b('Facial photograph (and fingerprints on arrival)', 'মুখের ছবি (আর পৌঁছানোর পর fingerprint)'),
    why: b('OIF requires one facial photograph attached to the application, and takes a facial photograph and fingerprints when the residence permit (comprising biometric data) is issued.', 'OIF application-এর সঙ্গে একটি মুখের ছবি সংযুক্ত করা চায়, আর residence permit (biometric data অন্তর্ভুক্ত) ইস্যু করার সময় একটি মুখের ছবি আর fingerprint নেয়।'),
    who: CONSULATE,
    when: b('With the application; fingerprints are taken as part of the issuance process.', 'Application-এর সঙ্গে; ইস্যু করার প্রক্রিয়ার অংশ হিসেবে fingerprint নেওয়া হয়।'),
    where: b('At the consulate covering Bangladesh.', 'Bangladesh-এর জন্য দায়িত্বে থাকা consulate-এ।'),
    prepare: b('Bring a recent, compliant photo; the application is only deemed received once the administrative fee is paid and the photo/fingerprint/signature are recorded.', 'একটি সাম্প্রতিক, উপযুক্ত ছবি সাথে নিয়ে যান; administrative fee পরিশোধ হলে আর ছবি/fingerprint/signature রেকর্ড হলেই application গ্রহণ করা হয়েছে বলে ধরা হয়।'),
    groups: ['general', 'visa'],
    sources: [HU_OIF_STUDENT_PERMIT],
  },
];

// ------------------------------------------------------------------ costs (source's own currency, never converted)

const BME_APPLICATION_FEE: GuideCost = { id: 'bme-application-fee', label: b('University application fee (example: BME)', 'University application fee (উদাহরণ: BME)'), value: b('EUR 150, a non-refundable application fee for Bachelor’s/Master’s/preparatory applicants at BME', 'BME-তে Bachelor\'s/Master\'s/preparatory আবেদনকারীদের জন্য EUR 150, একটি non-refundable application fee'), amount: { value: 150, currency: 'EUR', period: 'one-time' }, source: HU_BME_ADMISSION };
const DEBRECEN_FEES: GuideCost = { id: 'debrecen-application-fees', label: b('University application + entrance-exam fee (example: University of Debrecen)', 'University application + entrance-exam fee (উদাহরণ: University of Debrecen)'), value: b('USD 150 application fee plus USD 350 entrance-exam fee at the University of Debrecen, both non-refundable', 'University of Debrecen-এ USD 150 application fee সঙ্গে USD 350 entrance-exam fee, দুটোই non-refundable'), amount: { value: 150, max: 500, currency: 'USD', period: 'one-time' }, source: HU_DEBRECEN_FEES };
const SEMMELWEIS_ADMISSION_FEE: GuideCost = { id: 'semmelweis-admission-fee', label: b('Admission-procedure fee (example: Semmelweis University)', 'Admission-procedure fee (উদাহরণ: Semmelweis University)'), value: b('EUR 75 admission-procedure fee at Semmelweis University', 'Semmelweis University-তে EUR 75 admission-procedure fee'), amount: { value: 75, currency: 'EUR', period: 'one-time' }, source: HU_SEMMELWEIS_FEES };
const UNVERIFIED: GuideCost[] = [
  { id: 'funds-amount', label: b('Minimum funds to show', 'দেখানোর ন্যূনতম টাকা'), value: b('No single official nationwide figure was confirmed; OIF asks for documented "sufficient resources" rather than naming one fixed minimum amount.', 'কোনো একক official জাতীয় সংখ্যা নিশ্চিত হয়নি; OIF একটি নির্দিষ্ট ন্যূনতম পরিমাণের নাম না দিয়ে documented "sufficient resources" চায়।'), status: 'not-verified', source: HU_OIF_STUDENT_PERMIT },
  { id: 'living', label: b('Living costs', 'থাকা-খাওয়ার খরচ'), value: b('An official, itemized per-city living-cost estimate for international students was not found on an OIF or Study in Hungary page read for this guide; several university and third-party pages describe living costs as generally lower in Hungary than in Western Europe, but no single official figure is shown here as a fact.', 'এই guide-এর জন্য পড়া কোনো OIF বা Study in Hungary page-এ international student-দের জন্য official, বিস্তারিত per-city থাকা-খাওয়ার খরচের আনুমানিক হিসাব পাওয়া যায়নি; কয়েকটি university আর third-party page Hungary-তে থাকার খরচ সাধারণত Western Europe-র চেয়ে কম বলে বর্ণনা করে, কিন্তু এখানে কোনো একক official সংখ্যা fact হিসেবে দেখানো হয়নি।'), status: 'not-verified', source: HU_SIH_TUITION },
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
        [b('The examples below — BME, Semmelweis University, ELTE and the University of Debrecen — are listed alphabetically by their English initials, not ordered by quality. Hungarian public universities set their own tuition, admission requirements and application deadlines per programme, and all four accept self-financed, fee-paying applicants alongside Stipendium Hungaricum scholarship holders through two separate application routes, so check the exact programme on the institution’s own admissions page.', 'নিচের উদাহরণ — BME, Semmelweis University, ELTE, আর University of Debrecen — তাদের ইংরেজি আদ্যক্ষর অনুযায়ী বর্ণানুক্রমে, মান অনুযায়ী নয়। Hungarian public university-গুলো প্রতি programme-এ নিজস্ব tuition, ভর্তির শর্ত, আর application deadline ঠিক করে, আর চারটাই দুটো আলাদা application route-এর মধ্য দিয়ে Stipendium Hungaricum scholarship holder-দের পাশাপাশি self-financed, fee-paying আবেদনকারীদের গ্রহণ করে, তাই institution-এর নিজের admissions page-এ সঠিক programme দেখুন।')], [HU_BME_ADMISSION]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work'), insurance('insurance')] },
  { id: 'visa', title: b('Student visa and residence permit', 'Student visa আর residence permit'), items: [visaRequired('visa-required'), visaProcess('visa-process'), funds('funds')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Mostly English-taught at the universities below · apply via each institution’s own system (self-financed) or Tempus Public Foundation (Stipendium Hungaricum) · residence-permit process ≈ 1–2 months', 'নিচের university-গুলোতে অধিকাংশ ইংরেজি-মাধ্যম · প্রতিষ্ঠানের নিজস্ব system-এ আবেদন (self-financed) বা Tempus Public Foundation (Stipendium Hungaricum) · residence-permit process ≈ 1–2 মাস'),
  intro: b(
    'Hungarian public universities offer many English-taught Bachelor’s programmes for international students. A Bangladeshi applicant applies either as a self-financed, fee-paying student directly through the university’s own online application system, or for the Stipendium Hungaricum scholarship through Tempus Public Foundation’s online system plus a mandatory nomination from Bangladesh’s own Sending Partner (the Secondary and Higher Education Division, Ministry of Education) — the two routes have different deadlines and are not interchangeable. As a Bangladeshi applicant you also need a Hungarian residence permit for the purpose of studies, applied for before a Hungarian diplomatic or consular mission, which OIF’s own factsheet says takes up to about two months to decide.',
    "Hungarian public university-গুলো international student-দের জন্য অনেক ইংরেজি-মাধ্যম Bachelor's programme দেয়। একজন Bangladeshi আবেদনকারী হয় university-র নিজস্ব online application system-এর মাধ্যমে সরাসরি self-financed, fee-paying student হিসেবে আবেদন করেন, বা Tempus Public Foundation-এর online system-এর মাধ্যমে Stipendium Hungaricum scholarship-এর জন্য আবেদন করেন সঙ্গে Bangladesh-এর নিজের Sending Partner (Secondary and Higher Education Division, Ministry of Education)-এর একটি বাধ্যতামূলক nomination — দুই route-এর আলাদা deadline আছে আর একটা অন্যটার বদলি না। Bangladeshi আবেদনকারী হিসেবে আপনার Hungarian diplomatic বা consular mission-এ আবেদন করা পড়ার উদ্দেশ্যে একটি Hungarian residence permit-ও লাগে, যা OIF-এর নিজের factsheet বলে সিদ্ধান্ত নিতে প্রায় দুই মাস পর্যন্ত সময় নেয়।",
  ),
  costs: { official: [BME_APPLICATION_FEE, DEBRECEN_FEES], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in Hungary from Bangladesh?", "Bangladesh থেকে Hungary-তে Bachelor's পড়তে কী কী লাগে?"),
          [b('A secondary-school leaving certificate (your institution assesses it; the University of Debrecen states general study-gap limits of up to 2 years for foundation/undergraduate applicants from Bangladesh, Pakistan, Syria, Afghanistan, Myanmar and Yemen specifically, a narrower limit than its general 4-year rule), the English (or other) language proficiency the programme is taught in, an application through the institution’s own system by its deadline (or through Tempus Public Foundation plus Bangladesh’s own nomination, for Stipendium Hungaricum), and — since Bangladesh is not EU/EEA — a Hungarian residence permit for study purposes applied for at the consulate covering Bangladesh.', 'একটি secondary-school leaving সনদ (আপনার institution এটা মূল্যায়ন করে; University of Debrecen বিশেষভাবে Bangladesh, Pakistan, Syria, Afghanistan, Myanmar, আর Yemen থেকে foundation/undergraduate আবেদনকারীদের জন্য সর্বোচ্চ 2 বছরের সাধারণ study-gap সীমা বলে, যা তার সাধারণ 4-বছরের নিয়মের চেয়ে সংকীর্ণ), programme যে ভাষায় (ইংরেজি বা অন্য) পড়ানো হয় তার দক্ষতা, institution-এর নিজস্ব system-এর মাধ্যমে deadline-এর মধ্যে একটি application (বা Stipendium Hungaricum-এর জন্য Tempus Public Foundation প্লাস Bangladesh-এর নিজের nomination-এর মাধ্যমে), আর — Bangladesh EU/EEA না হওয়ায় — Bangladesh-এর জন্য দায়িত্বে থাকা consulate-এ আবেদন করা পড়ার উদ্দেশ্যে একটি Hungarian residence permit।'), CHECK_UNI],
          [HU_DEBRECEN_ADMISSION, HU_OIF_STUDENT_PERMIT],
          { status: 'partly-verified' },
        ),
        qa(
          'hsc',
          b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'),
          [b('Yes, in general — Hungarian institutions accept a secondary-school leaving certificate such as the Bangladeshi HSC for Bachelor’s admission, assessed per institution and programme, and several (e.g. the University of Debrecen) accept applications directly from students in their final year of secondary school. A dedicated, nationwide HSC-grade-conversion rule was not found on an official page for this guide — each institution converts or assesses grades its own way, so check with your chosen institution’s admissions office directly.', 'হ্যাঁ, সাধারণভাবে — Hungarian institution-গুলো Bachelor\'s ভর্তির জন্য Bangladeshi HSC-র মতো একটি secondary-school leaving সনদ গ্রহণ করে, প্রতি institution আর programme অনুযায়ী মূল্যায়িত, আর কয়েকটা (যেমন University of Debrecen) secondary school-এর শেষ বর্ষের student-দের থেকে সরাসরি application গ্রহণ করে। এই guide-এর জন্য একটি নির্দিষ্ট, জাতীয় HSC-grade-conversion নিয়ম কোনো official page-এ পাওয়া যায়নি — প্রতিটি institution নিজের উপায়ে grade convert বা মূল্যায়ন করে, তাই সরাসরি আপনার বাছা institution-এর admissions office-এর সাথে চেক করুন।')],
          [HU_DEBRECEN_ADMISSION],
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
          [b('For self-financed study at BME: applications for the February 2027 intake run 15 October – 15 November 2026, with a non-refundable EUR 150 application fee. At the University of Debrecen: 1 November 2026 for January/February 2027 intake, and 15 May 2027 for September 2027 intake, with a USD 150 application fee plus a USD 350 entrance-exam fee. At ELTE: applications generally open in November, with self-funded deadlines between the end of April and mid-July depending on the programme. For Stipendium Hungaricum instead, submit to Tempus Public Foundation by 15 January 2026, 2 p.m., and separately to Bangladesh’s Sending Partner by its own deadline — do not use the university’s own self-financed application form if you are applying for the scholarship.', 'BME-তে self-financed পড়ার জন্য: February 2027 intake-এর জন্য application 15 October – 15 November 2026 চলে, একটি non-refundable EUR 150 application fee সহ। University of Debrecen-এ: January/February 2027 intake-এর জন্য 1 November 2026, আর September 2027 intake-এর জন্য 15 May 2027, একটি USD 150 application fee সঙ্গে USD 350 entrance-exam fee সহ। ELTE-তে: application সাধারণত November-এ খোলে, programme অনুযায়ী self-funded deadline end of April থেকে mid-July-র মধ্যে। Stipendium Hungaricum-এর জন্য পরিবর্তে, 15 January 2026, 2 p.m.-এর মধ্যে Tempus Public Foundation-এ জমা দিন, আর আলাদাভাবে Bangladesh-এর Sending Partner-এর নিজের deadline-এর মধ্যে — scholarship-এর জন্য আবেদন করলে university-র নিজস্ব self-financed application form ব্যবহার করবেন না।')],
          [HU_BME_ADMISSION, HU_DEBRECEN_ADMISSION, HU_ELTE, HU_SH_CALL_BA_MA_OTM],
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
          b('How much IELTS do you need for a Bachelor’s?', 'Bachelor\'s-এ IELTS কত লাগে?'),
          [b('Not a single national minimum — set per institution and programme. BME’s general minimum for Bachelor’s/one-tier Master’s programmes is IELTS 5.5 overall (Cambridge B2 First 160, TOEFL iBT 72, or equivalent, at CEFR level B2), with a lower B1-level requirement (IELTS 4.5) for its preparatory programmes; the University of Debrecen requires an "upper-intermediate (B2)" level certificate obtained at a proctored exam, with exemptions for native speakers or those who completed secondary/higher education in English. Always confirm your own programme’s exact requirement.', 'একক জাতীয় ন্যূনতম না — প্রতি institution আর programme অনুযায়ী ঠিক হয়। BME-র Bachelor\'s/one-tier Master\'s programme-এর জন্য সাধারণ ন্যূনতম IELTS 5.5 overall (Cambridge B2 First 160, TOEFL iBT 72, বা সমতুল্য, CEFR level B2-তে), তার preparatory programme-এর জন্য একটি কম B1-level শর্ত (IELTS 4.5) সহ; University of Debrecen একটি proctored exam-এ পাওয়া "upper-intermediate (B2)" level সনদ চায়, native speaker বা ইংরেজিতে secondary/higher education সম্পন্নকারীদের জন্য exemption সহ। সবসময় আপনার নিজের programme-এর সঠিক শর্ত নিশ্চিত করুন।')],
          [HU_BME_ADMISSION, HU_DEBRECEN_ADMISSION],
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
          b("How much is a Bachelor's in Hungary?", "Hungary-তে Bachelor's-এ খরচ কত?"),
          [b('There is no single national figure: most non-EU Bachelor’s programmes at BME range from about EUR 3,200 to EUR 3,800 per semester (preparatory programmes are in the same range); the University of Debrecen’s non-medical Bachelor’s programmes range from about USD 6,000 to USD 10,000 a year (medicine and dentistry cost far more, at USD 16,900 and USD 17,500 a year respectively), and the University of Debrecen states a Bangladesh-specific rule that for programmes under USD 10,000, the full yearly tuition fee plus a general deposit must be paid before receiving visa-supporting documents. The Stipendium Hungaricum scholarship is the only route that waives tuition entirely.', 'কোনো একক জাতীয় সংখ্যা নেই: BME-তে অধিকাংশ non-EU Bachelor\'s programme প্রতি সেমিস্টারে প্রায় EUR 3,200 থেকে EUR 3,800-র মধ্যে (preparatory programme একই range-এ); University of Debrecen-এর non-medical Bachelor\'s programme বছরে প্রায় USD 6,000 থেকে USD 10,000-র মধ্যে (medicine আর dentistry অনেক বেশি, বছরে যথাক্রমে USD 16,900 আর USD 17,500), আর University of Debrecen একটি Bangladesh-specific নিয়ম বলে যে USD 10,000-র কম programme-এর জন্য, visa-সহায়ক document পাওয়ার আগে পূর্ণ বছরের tuition fee সঙ্গে একটি general deposit দিতে হবে। Stipendium Hungaricum scholarship একমাত্র route যা tuition সম্পূর্ণ মাফ করে।'), CHECK_UNI],
          [HU_BME_TUITION, HU_DEBRECEN_FEES],
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
  card: b('A relevant Bachelor’s needed · many programmes taught in English · same two application routes as Bachelor’s', 'সম্পর্কিত Bachelor\'s লাগে · অনেক programme ইংরেজিতে পড়ানো হয় · Bachelor\'s-এর মতোই একই দুটো application route'),
  intro: b(
    'Master’s study in Hungary follows the same two-route pattern as Bachelor’s: apply directly to the university as a self-financed applicant, or through Tempus Public Foundation plus Bangladesh’s own Sending Partner nomination for Stipendium Hungaricum. You need a Bachelor’s degree (or equivalent) relevant to the programme; the University of Debrecen allows a longer study gap for graduate applicants from Bangladesh (up to 4 years, versus its general 6-year rule). English-taught options are wide at BME, Semmelweis University (postgraduate programmes such as its MSc courses) and others. As a Bangladeshi applicant you still need the Hungarian residence permit for study purposes once admitted.',
    "Hungary-তে Master's পড়া Bachelor's-এর মতোই একই দুই-route ধারা অনুসরণ করে: university-তে সরাসরি self-financed আবেদনকারী হিসেবে আবেদন করুন, বা Stipendium Hungaricum-এর জন্য Tempus Public Foundation প্লাস Bangladesh-এর নিজের Sending Partner nomination-এর মাধ্যমে। Programme-এর সাথে সম্পর্কিত একটি Bachelor's degree (বা সমতুল্য) লাগে; University of Debrecen Bangladesh থেকে graduate আবেদনকারীদের জন্য একটি দীর্ঘতর study gap অনুমতি দেয় (সর্বোচ্চ 4 বছর, তার সাধারণ 6-বছরের নিয়মের তুলনায়)। BME, Semmelweis University (এর MSc course-এর মতো postgraduate programme), আর অন্যদের মধ্যে ইংরেজি-মাধ্যম option অনেক বিস্তৃত। Bangladeshi আবেদনকারী হিসেবে ভর্তি হলে আপনার এখনো পড়ার উদ্দেশ্যে Hungarian residence permit লাগে।",
  ),
  costs: { official: [BME_APPLICATION_FEE, DEBRECEN_FEES, SEMMELWEIS_ADMISSION_FEE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in Hungary?", "Hungary-তে Master's-এ কী লাগে?"),
          [b('A Bachelor’s degree (or equivalent) from a university, generally in a field related to the Master’s programme, plus two recommendation letters and a detailed CV for graduate applications at the University of Debrecen; other institutions set their own faculty-level academic requirements. The University of Debrecen specifically caps the acceptable study gap at 4 years for graduate applicants who are citizens of Bangladesh, Pakistan, Syria, Afghanistan, Myanmar or Yemen (its general rule for other applicants is up to 6 years).', 'একটি university-র একটি Bachelor\'s degree (বা সমতুল্য), সাধারণত Master\'s programme-এর সাথে সম্পর্কিত একটি field-এ, সঙ্গে University of Debrecen-এ graduate application-এর জন্য দুটো recommendation letter আর একটি বিস্তারিত CV; অন্য institution নিজস্ব faculty-level academic শর্ত ঠিক করে। University of Debrecen বিশেষভাবে Bangladesh, Pakistan, Syria, Afghanistan, Myanmar, বা Yemen-এর নাগরিক graduate আবেদনকারীদের জন্য গ্রহণযোগ্য study gap 4 বছরে সীমাবদ্ধ করে (অন্য আবেদনকারীদের জন্য তার সাধারণ নিয়ম সর্বোচ্চ 6 বছর)।')],
          [HU_DEBRECEN_ADMISSION],
          { status: 'verified' },
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
          [b('The same deadlines and two routes as Bachelor’s generally apply: self-financed applicants use each university’s own online system by its own deadline (BME: 15 October–15 November 2026 for the February 2027 intake; University of Debrecen: 1 November 2026 or 15 May 2027 depending on intake), while Stipendium Hungaricum applicants submit to Tempus Public Foundation by 15 January 2026, 2 p.m., plus a separate nomination from Bangladesh’s Sending Partner. Semmelweis University’s admission-procedure fee for its programmes is EUR 75, separate from any university application fee.', 'Bachelor\'s-এর মতোই একই deadline আর দুই route সাধারণত প্রযোজ্য: self-financed আবেদনকারীরা প্রতিটি university-র নিজস্ব online system তার নিজের deadline-এর মধ্যে ব্যবহার করেন (BME: February 2027 intake-এর জন্য 15 October–15 November 2026; University of Debrecen: intake অনুযায়ী 1 November 2026 বা 15 May 2027), যখন Stipendium Hungaricum আবেদনকারীরা 15 January 2026, 2 p.m.-এর মধ্যে Tempus Public Foundation-এ জমা দেন, সঙ্গে Bangladesh-এর Sending Partner থেকে একটি আলাদা nomination। Semmelweis University-র programme-এর জন্য admission-procedure fee EUR 75, যেকোনো university application fee থেকে আলাদা।')],
          [HU_BME_ADMISSION, HU_DEBRECEN_ADMISSION, HU_SEMMELWEIS_FEES, HU_SH_CALL_BA_MA_OTM],
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
          [b('Not a single national minimum — set per institution and programme. BME’s general minimum for Master’s programmes is IELTS 5.5 overall (CEFR B2), the same as its Bachelor’s-level requirement; the University of Debrecen requires the same upper-intermediate (B2) proctored-exam certificate, with the same native-speaker/medium-of-instruction exemptions. Always confirm your own programme.', 'একক জাতীয় ন্যূনতম না — প্রতি institution আর programme অনুযায়ী ঠিক হয়। BME-র Master\'s programme-এর জন্য সাধারণ ন্যূনতম IELTS 5.5 overall (CEFR B2), তার Bachelor\'s-level শর্তের মতোই; University of Debrecen একই upper-intermediate (B2) proctored-exam সনদ চায়, একই native-speaker/medium-of-instruction exemption সহ। সবসময় আপনার নিজের programme নিশ্চিত করুন।')],
          [HU_BME_ADMISSION, HU_DEBRECEN_ADMISSION],
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
          b("How much is a Master's in Hungary?", "Hungary-তে Master's-এ খরচ কত?"),
          [b('BME’s Master’s programmes for non-EU students mostly range from about EUR 2,200 to EUR 4,000 per semester depending on the faculty and programme; Semmelweis University’s General Medicine programme (an MD/one-tier Master’s-equivalent) costs EUR 12,000 a semester or EUR 22,000 an academic year, with a 50% discount for Semmelweis alumni/students; the University of Debrecen’s non-medical Master’s programmes range from about USD 5,500 to USD 12,500 a year. None of this includes living costs, for which no single official figure was confirmed for this guide.', 'BME-র Master\'s programme non-EU student-দের জন্য faculty আর programme অনুযায়ী মূলত প্রতি সেমিস্টারে প্রায় EUR 2,200 থেকে EUR 4,000-র মধ্যে; Semmelweis University-র General Medicine programme (একটি MD/one-tier Master\'s-সমতুল্য) সেমিস্টারে EUR 12,000 বা academic year-এ EUR 22,000, Semmelweis alumni/student-দের জন্য 50% ছাড় সহ; University of Debrecen-এর non-medical Master\'s programme বছরে প্রায় USD 5,500 থেকে USD 12,500-র মধ্যে। এর মধ্যে থাকা-খাওয়ার খরচ ধরা নেই, যার জন্য এই guide-এর জন্য কোনো একক official সংখ্যা নিশ্চিত হয়নি।'), CHECK_UNI],
          [HU_BME_TUITION, HU_SEMMELWEIS_FEES, HU_DEBRECEN_FEES],
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
  card: b('A relevant Master’s needed · Stipendium Hungaricum doctoral scholarships use a separate call · same residence-permit process as other degrees', 'সম্পর্কিত Master\'s লাগে · Stipendium Hungaricum doctoral scholarship আলাদা call ব্যবহার করে · অন্য degree-র মতোই একই residence-permit process'),
  intro: b(
    'A Hungarian PhD generally needs a Master’s degree (or equivalent), two recommendation letters from former professors, and a proposed research topic (either from the host doctoral school’s own list or a new topic with a detailed description), per the University of Debrecen’s own requirements. Stipendium Hungaricum doctoral scholarships are covered by a separate Call for Applications from the bachelor’s/master’s/non-degree call reviewed for this guide, so its exact deadlines and Bangladesh eligibility were not independently re-confirmed here — check the doctoral call directly on stipendiumhungaricum.hu. As with other degree levels, Bangladeshi applicants need the Hungarian residence permit for study purposes once admitted.',
    "একটি Hungarian PhD-তে সাধারণত লাগে একটি Master's degree (বা সমতুল্য), আগের professor-দের থেকে দুটো recommendation letter, আর একটি প্রস্তাবিত research topic (host doctoral school-এর নিজের তালিকা থেকে বা একটি বিস্তারিত বিবরণ সহ নতুন topic), University of Debrecen-এর নিজের শর্ত অনুযায়ী। Stipendium Hungaricum doctoral scholarship এই guide-এর জন্য পড়া bachelor's/master's/non-degree call থেকে একটি আলাদা Call for Applications-এ চলে, তাই এর সঠিক deadline আর Bangladesh-র যোগ্যতা এখানে আলাদাভাবে পুনরায় নিশ্চিত করা হয়নি — stipendiumhungaricum.hu-এ সরাসরি doctoral call দেখুন। অন্য degree level-এর মতোই, Bangladeshi আবেদনকারীদের ভর্তি হলে পড়ার উদ্দেশ্যে Hungarian residence permit লাগে।",
  ),
  costs: { official: [], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Hungary?', 'Hungary-তে কীভাবে PhD পাওয়া যায়?'),
          [
            b('Apply to a doctoral school’s own programme as a self-financed, fee-paying applicant (the University of Debrecen’s PhD programmes range from about USD 6,500 to USD 12,500 a year, needing a Master’s degree, detailed CV, academic transcript, two recommendation letters and a research-topic proposal), or apply for a Stipendium Hungaricum doctoral scholarship — covered by its own, separate Call for Applications not reviewed in detail for this guide. Exact institution-specific doctoral-admission processes beyond this general shape were not itemized nationally for this guide.', 'একটি doctoral school-এর নিজের programme-এ self-financed, fee-paying আবেদনকারী হিসেবে আবেদন করুন (University of Debrecen-এর PhD programme বছরে প্রায় USD 6,500 থেকে USD 12,500-র মধ্যে, একটি Master\'s degree, বিস্তারিত CV, academic transcript, দুটো recommendation letter, আর একটি research-topic proposal চায়), বা একটি Stipendium Hungaricum doctoral scholarship-এর জন্য আবেদন করুন — এই guide-এর জন্য বিস্তারিতভাবে পড়া হয়নি এমন তার নিজের, আলাদা Call for Applications-এ কভার করা। এই সাধারণ ধারার বাইরে সঠিক institution-specific doctoral-admission process এই guide-এর জন্য জাতীয়ভাবে তালিকাভুক্ত হয়নি।'),
            CHECK_UNI,
          ],
          [HU_DEBRECEN_FEES, HU_DEBRECEN_ADMISSION],
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
          [b('Not verified yet as a single general rule: each doctoral school or supervisor states its own language expectations, which were not itemized nationally on the pages read for this guide.', 'সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: প্রতিটি doctoral school বা supervisor নিজের ভাষার প্রত্যাশা দেয়, যা এই guide-এর জন্য পড়া page-এ জাতীয়ভাবে তালিকাভুক্ত হয়নি।')],
          [HU_DEBRECEN_ADMISSION],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ the country

export const HU_GUIDE: CountryGuide = {
  code: 'HU',
  checkedAt: HU_READ,
  sourcesPerSection: true,
  intro: b(
    'Hungary is an EU/EEA and full Schengen member — but Bangladesh is not, so a Bangladeshi applicant is a "third-country national" under Hungarian law and needs Hungary’s own residence permit for the purpose of studies, applied for before a Hungarian diplomatic or consular mission (in practice, the Hungary Visa Application Centre run by VFS Global in Dhaka, the official partner of the Dhaka Office of the Embassy of Hungary), since submitting a separate visa application is not required — the residence-permit application itself comprises it. OIF (the National Directorate-General for Aliens Policing) states a standard procedural period of 15 days and a decision within 60 days; once approved, a single-entry "D"-type visa (valid 30 days to enter, valid for 3 months) lets you travel to Hungary and collect the actual residence-permit card, valid 1–3 years and extendable. Comprehensive health insurance is required for the permit itself. No single official nationwide minimum-funds figure was confirmed — OIF instead asks for documented "sufficient resources" through a bank statement, family declaration or other credible means. During study, you may work up to 30 hours a week in term and full-time for up to 90 days a year outside term (OIF’s current wording; an older Study in Hungary page describes the holiday allowance slightly differently, as 66 working days). After graduating, a separate residence permit lets you stay up to 9 months (not extendable) to seek a job or start a business matching your studies. Tuition varies widely by institution and programme — non-EU Bachelor’s fees run roughly EUR 3,200–3,800/semester at BME or USD 6,000–10,000/year at the University of Debrecen, with medicine costing far more (Semmelweis University’s General Medicine: EUR 12,000/semester) — except through Stipendium Hungaricum, Hungary’s flagship scholarship, which is genuinely open to Bangladeshi applicants (named directly in its 2026/2027 Sending Partner list, with Bangladesh’s own Sending Partner authority — the Secondary and Higher Education Division, Ministry of Education — named on the programme’s own Partners page) and waives tuition entirely, but requires a mandatory nomination by that authority in addition to the online application to Tempus Public Foundation. This guide is built from OIF (oif.gov.hu), Study in Hungary (studyinhungary.hu), the Stipendium Hungaricum Scholarship Programme (stipendiumhungaricum.hu) and university pages.',
    'Hungary EU/EEA আর একটি পূর্ণ Schengen সদস্য — কিন্তু Bangladesh না, তাই একজন Bangladeshi আবেদনকারী Hungarian আইনের অধীনে একজন "third-country national", আর তার Hungary-র নিজের পড়ার উদ্দেশ্যে residence permit লাগে, একটি Hungarian diplomatic বা consular mission-এ আবেদন করা হয় (বাস্তবে, Dhaka-য় VFS Global-এর পরিচালিত Hungary Visa Application Centre, যা Embassy of Hungary-র Dhaka Office-এর official partner), কারণ আলাদা একটি visa application জমা দেওয়ার প্রয়োজন নেই — residence-permit application নিজেই এটা অন্তর্ভুক্ত করে। OIF (National Directorate-General for Aliens Policing) একটি স্ট্যান্ডার্ড procedural সময়কাল 15 দিন আর 60 দিনের মধ্যে একটি সিদ্ধান্ত বলে; অনুমোদিত হলে, একটি single-entry "D"-type visa (প্রবেশের জন্য 30 দিন valid, 3 মাসের জন্য valid) আপনাকে Hungary-তে যাওয়ার আর আসল residence-permit card সংগ্রহ করার অনুমতি দেয়, 1–3 বছর valid আর বাড়ানো যায়। Permit-এর জন্যই comprehensive health insurance লাগে। কোনো একক official জাতীয় ন্যূনতম-funds সংখ্যা নিশ্চিত হয়নি — OIF পরিবর্তে একটি bank statement, family declaration, বা অন্য credible means দিয়ে documented "sufficient resources" চায়। পড়ার সময়, আপনি পড়ার সময়কালে সপ্তাহে 30 ঘণ্টা পর্যন্ত আর পড়ার বাইরে বছরে 90 দিন পর্যন্ত পুরো সময় কাজ করতে পারেন (OIF-এর বর্তমান বাক্য; Study in Hungary-র একটি পুরনো page ছুটির allowance টা একটু আলাদাভাবে বর্ণনা করে, 66 কর্মদিবস হিসেবে)। গ্র্যাজুয়েশনের পর, একটি আলাদা residence permit আপনাকে আপনার পড়ার সাথে মেলে এমন একটি চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য 9 মাস পর্যন্ত (বাড়ানো যায় না) থাকার অনুমতি দেয়। Tuition institution আর programme অনুযায়ী ব্যাপকভাবে আলাদা — non-EU Bachelor\'s fee প্রায় BME-তে EUR 3,200–3,800/semester বা University of Debrecen-এ USD 6,000–10,000/year, medicine অনেক বেশি (Semmelweis University-র General Medicine: EUR 12,000/semester) — Stipendium Hungaricum ছাড়া, Hungary-র flagship scholarship, যা Bangladeshi আবেদনকারীদের জন্য আসলেই খোলা (এর 2026/2027 Sending Partner list-এ সরাসরি নাম দেওয়া, Bangladesh-এর নিজের Sending Partner authority — Secondary and Higher Education Division, Ministry of Education — programme-এর নিজের Partners page-এ নাম দেওয়া) আর tuition সম্পূর্ণ মাফ করে, কিন্তু Tempus Public Foundation-এ online application-এর পাশাপাশি সেই authority দ্বারা একটি বাধ্যতামূলক nomination লাগে। এই guide OIF (oif.gov.hu), Study in Hungary (studyinhungary.hu), Stipendium Hungaricum Scholarship Programme (stipendiumhungaricum.hu), আর university page থেকে তৈরি।',
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [HU_OIF_STUDENT_PERMIT, HU_SH_PARTNERS, HU_SIH_VISA],
      {
        kind: 'guidance',
        list: [
          b('Assuming Hungary’s EU/Schengen membership means a simplified visa process for Bangladeshi applicants — Bangladesh is not EU/EEA, so a Bangladeshi applicant is a third-country national and needs the full Hungarian residence-permit process.', 'ধরে নেওয়া যে Hungary-র EU/Schengen সদস্যতা Bangladeshi আবেদনকারীদের জন্য একটি সরলীকৃত visa process মানে — Bangladesh EU/EEA না, তাই একজন Bangladeshi আবেদনকারী একজন third-country national আর পূর্ণ Hungarian residence-permit process লাগে।'),
          b('Submitting a Stipendium Hungaricum application to Tempus Public Foundation without also getting nominated by Bangladesh’s own Sending Partner — an application that is not nominated is not considered at all, however complete it is.', 'Bangladesh-এর নিজের Sending Partner দ্বারা নমিনেট না হয়ে Tempus Public Foundation-এ একটি Stipendium Hungaricum application জমা দেওয়া — নমিনেট না হওয়া একটি application যতই সম্পূর্ণ হোক, আদৌ বিবেচিত হয় না।'),
          b('Using a university’s own self-financed application form when applying for Stipendium Hungaricum, or vice versa — the two routes are separate; the University of Debrecen’s own page explicitly asks scholarship applicants not to submit its self-financed form.', 'Stipendium Hungaricum-এর জন্য আবেদন করার সময় university-র নিজস্ব self-financed application form ব্যবহার করা, বা বিপরীতে — দুই route আলাদা; University of Debrecen-এর নিজের page স্পষ্টভাবে scholarship আবেদনকারীদের তার self-financed form জমা না দিতে বলে।'),
          b('Assuming one official nationwide "minimum funds" figure exists — it does not on the pages read for this guide; OIF instead assesses documented "sufficient resources" per application.', 'ধরে নেওয়া যে একটি official জাতীয় "ন্যূনতম funds" সংখ্যা আছে — এই guide-এর জন্য পড়া page-এ এটা নেই; OIF পরিবর্তে প্রতি application অনুযায়ী documented "sufficient resources" মূল্যায়ন করে।'),
          b('Assuming low tuition at some programmes means low cost everywhere — medicine and dentistry cost many times more than most non-medical Bachelor’s/Master’s programmes at the same universities.', 'ধরে নেওয়া যে কিছু programme-এ কম tuition মানে সব জায়গায় কম খরচ — একই university-তে medicine আর dentistry অধিকাংশ non-medical Bachelor\'s/Master\'s programme-এর চেয়ে অনেকগুণ বেশি খরচ।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in Hungary from Bangladesh?", "Bangladesh থেকে Hungary-তে Bachelor's পড়তে কী কী লাগে?"), [b('A secondary-school leaving certificate, the language proficiency the programme is taught in, an application through the institution’s own system (or via Tempus Public Foundation plus Bangladesh’s Sending Partner nomination for Stipendium Hungaricum), and a Hungarian residence permit for study purposes applied for at the consulate covering Bangladesh.', 'একটি secondary-school leaving সনদ, programme যে ভাষায় পড়ানো হয় তার দক্ষতা, institution-এর নিজস্ব system-এর মাধ্যমে একটি application (বা Stipendium Hungaricum-এর জন্য Tempus Public Foundation প্লাস Bangladesh-এর Sending Partner nomination-এর মাধ্যমে), আর Bangladesh-এর জন্য দায়িত্বে থাকা consulate-এ আবেদন করা পড়ার উদ্দেশ্যে একটি Hungarian residence permit।')], [HU_OIF_STUDENT_PERMIT, HU_DEBRECEN_ADMISSION], { status: 'partly-verified' }),
    qa('hsc', b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'), [b('Yes, generally — a secondary-school leaving certificate such as the HSC is accepted, assessed per institution; a dedicated nationwide HSC-grade-conversion rule was not found on an official page for this guide.', 'হ্যাঁ, সাধারণভাবে — HSC-র মতো একটি secondary-school leaving সনদ গ্রহণযোগ্য, প্রতি institution অনুযায়ী মূল্যায়িত; এই guide-এর জন্য একটি নির্দিষ্ট জাতীয় HSC-grade-conversion নিয়ম কোনো official page-এ পাওয়া যায়নি।')], [HU_DEBRECEN_ADMISSION], { status: 'partly-verified' }),
    qa('cost', b('How much does it cost to study in Hungary?', 'Hungary-তে পড়াশোনার খরচ কত?'), [b('There is no single national figure: non-EU Bachelor’s tuition runs roughly EUR 3,200–3,800/semester at BME or USD 6,000–10,000/year at the University of Debrecen, medicine costs far more (Semmelweis University’s General Medicine: EUR 12,000/semester), and Stipendium Hungaricum is the only route that waives tuition entirely — plus application/entrance fees of roughly EUR 75–150 or USD 150–500 depending on the institution.', 'কোনো একক জাতীয় সংখ্যা নেই: non-EU Bachelor\'s tuition প্রায় BME-তে EUR 3,200–3,800/semester বা University of Debrecen-এ USD 6,000–10,000/year, medicine অনেক বেশি (Semmelweis University-র General Medicine: EUR 12,000/semester), আর Stipendium Hungaricum একমাত্র route যা tuition সম্পূর্ণ মাফ করে — সঙ্গে institution অনুযায়ী প্রায় EUR 75–150 বা USD 150–500 application/entrance fee।')], [HU_BME_TUITION, HU_DEBRECEN_FEES, HU_SEMMELWEIS_FEES], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for Hungary?', 'Hungary-তে IELTS কত লাগে?'), [b('Not a single national minimum; BME generally asks IELTS 5.5 overall (CEFR B2) for Bachelor’s/Master’s programmes, while the University of Debrecen asks an "upper-intermediate (B2)" proctored certificate — always check your own institution and programme.', 'একক জাতীয় ন্যূনতম না; BME সাধারণত Bachelor\'s/Master\'s programme-এর জন্য IELTS 5.5 overall (CEFR B2) চায়, যখন University of Debrecen একটি "upper-intermediate (B2)" proctored সনদ চায় — সবসময় আপনার নিজের institution আর programme দেখুন।')], [HU_BME_ADMISSION, HU_DEBRECEN_ADMISSION], { status: 'partly-verified' }),
    qa('visa', b('What do you need for the student visa and residence permit?', 'Student visa আর residence permit-এর জন্য কী কী লাগে?'), [b('A residence-permit application submitted at the consulate covering Bangladesh, with a certificate of admission, proof of the required language proficiency, proof of means of subsistence, proof of health insurance and more — OIF decides within 60 days, after which a single-entry "D"-type visa lets you travel to Hungary to collect the actual residence-permit card.', 'Bangladesh-এর জন্য দায়িত্বে থাকা consulate-এ জমা দেওয়া একটি residence-permit application, একটি certificate of admission, প্রয়োজনীয় language proficiency-র প্রমাণ, means of subsistence-র প্রমাণ, health insurance-র প্রমাণ আর আরও অনেক কিছু সহ — OIF 60 দিনের মধ্যে সিদ্ধান্ত নেয়, তারপর একটি single-entry "D"-type visa আপনাকে আসল residence-permit card সংগ্রহ করতে Hungary-তে যাওয়ার অনুমতি দেয়।')], [HU_OIF_STUDENT_PERMIT, HU_OIF_D_VISA_PICKUP]),
    qa('work', b('Can you work while studying in Hungary?', 'Hungary-তে পড়ার পাশাপাশি কাজ করা যায়?'), [b('Yes, up to 30 hours a week during the study period, and full-time for up to 90 days a year outside it, per OIF’s current factsheet.', 'হ্যাঁ, OIF-এর বর্তমান factsheet অনুযায়ী পড়ার সময়কালে সপ্তাহে 30 ঘণ্টা পর্যন্ত, আর তার বাইরে বছরে 90 দিন পর্যন্ত পুরো সময়।')], [HU_OIF_STUDENT_PERMIT]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('Yes — the Stipendium Hungaricum Scholarship Programme genuinely lists Bangladesh as an eligible Sending Partner and waives tuition entirely for Bachelor’s, Master’s and one-tier Master’s (PhD scholarships use a separate call), but a mandatory nomination by Bangladesh’s own Sending Partner authority is required in addition to the online application.', 'হ্যাঁ — Stipendium Hungaricum Scholarship Programme Bangladesh-কে একটি যোগ্য Sending Partner হিসেবে আসলেই তালিকাভুক্ত করে আর Bachelor\'s, Master\'s, আর one-tier Master\'s-এর জন্য tuition সম্পূর্ণ মাফ করে (PhD scholarship আলাদা call ব্যবহার করে), কিন্তু online application-এর পাশাপাশি Bangladesh-এর নিজের Sending Partner authority দ্বারা একটি বাধ্যতামূলক nomination লাগে।')], [HU_SH_PARTNERS, HU_SH_CALL_BA_MA_OTM], { status: 'partly-verified' }),
    qa('after', b('Can you stay in Hungary after graduating?', 'পড়া শেষে Hungary-তে থাকা যায়?'), [b('Yes, for up to 9 months (not extendable) through a separate residence permit to seek a job or start a business matching the level of your completed studies, per OIF’s own factsheet.', 'হ্যাঁ, OIF-এর নিজের factsheet অনুযায়ী আপনার সম্পন্ন পড়ার স্তরের সাথে মেলে এমন একটি চাকরি খোঁজার বা ব্যবসা শুরু করার জন্য একটি আলাদা residence permit দিয়ে 9 মাস পর্যন্ত (বাড়ানো যায় না)।')], [HU_OIF_JOBSEEKING_PERMIT]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('Not verified yet as a single official nationwide figure; OIF instead asks for documented "sufficient resources" through a bank statement, family declaration or other credible means, assessed per application.', 'এখনো যাচাই হয়নি একটি একক official জাতীয় সংখ্যা হিসেবে; OIF পরিবর্তে একটি bank statement, family declaration, বা অন্য credible means দিয়ে documented "sufficient resources" চায়, প্রতি application অনুযায়ী মূল্যায়ন করা হয়।')], [HU_OIF_STUDENT_PERMIT], { status: 'not-verified' }),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before the residence-permit stage: certificate of admission, language-proficiency proof. At the residence-permit stage: proof of means of subsistence, proof of health insurance, a facial photograph, proof of exit conditions (passport and return ticket or funds). Throughout your stay: valid health insurance and your residence-permit card.', 'Residence-permit পর্যায়ের আগে: certificate of admission, language-proficiency প্রমাণ। Residence-permit পর্যায়ে: means of subsistence-র প্রমাণ, health insurance-র প্রমাণ, একটি মুখের ছবি, exit condition-র প্রমাণ (passport আর ফিরতি টিকেট বা টাকা)। থাকার পুরো সময়: valid health insurance আর আপনার residence-permit card।')], [HU_OIF_STUDENT_PERMIT]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b('A Bachelor’s degree (or equivalent) relevant to the programme; BME’s Master’s programmes mostly require IELTS 5.5 (CEFR B2), and the University of Debrecen caps the acceptable study gap at 4 years for Bangladeshi graduate applicants.', 'Programme-এর সাথে সম্পর্কিত একটি Bachelor\'s degree (বা সমতুল্য); BME-র Master\'s programme মূলত IELTS 5.5 (CEFR B2) চায়, আর University of Debrecen Bangladeshi graduate আবেদনকারীদের জন্য গ্রহণযোগ্য study gap 4 বছরে সীমাবদ্ধ করে।')], [HU_BME_ADMISSION, HU_DEBRECEN_ADMISSION]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Not verified yet as general national rules: usually a relevant Master’s degree, two recommendation letters and a research-topic proposal for a self-financed doctoral-school position; Stipendium Hungaricum doctoral scholarships use a separate call not reviewed in detail for this guide.', 'সাধারণ জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: সাধারণত একটি সম্পর্কিত Master\'s degree, দুটো recommendation letter, আর একটি self-financed doctoral-school position-এর জন্য research-topic proposal; Stipendium Hungaricum doctoral scholarship এই guide-এর জন্য বিস্তারিতভাবে পড়া হয়নি এমন একটি আলাদা call ব্যবহার করে।')], [HU_DEBRECEN_FEES], { status: 'not-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — BME, Semmelweis University, ELTE and the University of Debrecen — are listed alphabetically by English initials, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — BME, Semmelweis University, ELTE, আর University of Debrecen — ইংরেজি আদ্যক্ষর অনুযায়ী বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [HU_BME_ADMISSION]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: the Stipendium Hungaricum Scholarship Programme names the "People’s Republic of Bangladesh" directly in its 2026/2027 Sending Partner list and names Bangladesh’s own Sending Partner authority (Secondary and Higher Education Division, Ministry of Education) on its Partners page; the University of Debrecen states Bangladesh-specific study-gap limits and a Bangladesh-specific advance-tuition-payment rule. Hungary visa applications from Bangladesh go through the Hungary Visa Application Centre run by VFS Global in Dhaka, the official partner of the Dhaka Office of the Embassy of Hungary. No official page read for this guide gives a Bangladeshi-HSC-specific grade-conversion formula or a single official minimum-funds figure — these are not verified here.', 'Bangladesh-এর জন্য যাচাই করা: Stipendium Hungaricum Scholarship Programme তার 2026/2027 Sending Partner list-এ সরাসরি "People’s Republic of Bangladesh"-এর নাম দেয় আর তার Partners page-এ Bangladesh-এর নিজের Sending Partner authority (Secondary and Higher Education Division, Ministry of Education)-এর নাম দেয়; University of Debrecen Bangladesh-specific study-gap সীমা আর একটি Bangladesh-specific advance-tuition-payment নিয়ম বলে। Bangladesh থেকে Hungary visa application Dhaka-য় VFS Global-এর পরিচালিত Hungary Visa Application Centre-এর মাধ্যমে যায়, যা Embassy of Hungary-র Dhaka Office-এর official partner। পড়া কোনো official page এই guide-এর জন্য একটি Bangladeshi-HSC-specific grade-conversion formula বা একটি একক official ন্যূনতম-funds সংখ্যা দেয় না — এগুলো এখানে যাচাই হয়নি।'),
    ], [HU_SH_PARTNERS, HU_SH_CALL_BA_MA_OTM, HU_DEBRECEN_ADMISSION, HU_DEBRECEN_FEES], { status: 'partly-verified' }),
  ],
  life: [
    qa('arrival', b('What happens when you arrive?', 'পৌঁছানোর পর কী হয়?'), [b('You must enter Hungary within 3 months of your residence-permit approval, per OIF’s own factsheet, otherwise the approval becomes invalid; the actual residence-permit card for study purposes is then delivered by post to the address of your educational institution. Keep your comprehensive health insurance active throughout your stay, as it is a continuing condition of the permit.', 'OIF-এর নিজের factsheet অনুযায়ী আপনার residence-permit অনুমোদনের 3 মাসের মধ্যে Hungary-তে প্রবেশ করতে হয়, নাহলে অনুমোদন invalid হয়ে যায়; পড়ার উদ্দেশ্যে আসল residence-permit card তারপর আপনার educational institution-এর address-এ ডাকযোগে পাঠানো হয়। থাকার পুরো সময় আপনার comprehensive health insurance সক্রিয় রাখুন, কারণ এটা permit-এর একটি চলমান শর্ত।')], [HU_OIF_STUDENT_PERMIT]),
  ],
  documents: HU_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'fact', status: 'verified', value: { min: 3200, max: 12500, unit: 'EUR or USD/semester or /year (varies by institution and currency)', text: b('Roughly EUR 3,200–4,000/semester at BME, or USD 5,500–12,500/year at the University of Debrecen, depending on programme; medicine costs far more.', 'Programme অনুযায়ী প্রায় BME-তে EUR 3,200–4,000/semester, বা University of Debrecen-এ USD 5,500–12,500/year; medicine অনেক বেশি।') }, source: HU_BME_TUITION },
    { id: 'funds-to-show', kind: 'guidance', status: 'not-verified', source: HU_OIF_STUDENT_PERMIT },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { min: 30, max: 30, unit: 'hours/week (during study period)', text: b('Up to 30 hours a week during the study period, full-time for up to 90 days a year outside it.', 'পড়ার সময়কালে সপ্তাহে 30 ঘণ্টা পর্যন্ত, তার বাইরে বছরে 90 দিন পর্যন্ত পুরো সময়।') }, source: HU_OIF_STUDENT_PERMIT },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { min: 9, max: 9, unit: 'months (not extendable)', text: b('9 months (not extendable) to seek a job or start a business matching your completed studies.', 'আপনার সম্পন্ন পড়ার সাথে মেলে এমন একটি চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য 9 মাস (বাড়ানো যায় না)।') }, source: HU_OIF_JOBSEEKING_PERMIT },
    { id: 'visa-fee', kind: 'guidance', status: 'not-verified', source: HU_OIF_PROCEDURAL_FEES },
  ],
};

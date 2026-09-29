import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  US_CPT,
  US_DS_FR,
  US_DS_RULE,
  US_EDUSA_GRAD_FUNDS,
  US_EDUSA_UG_APPLY,
  US_EMBASSY_EDUSA,
  US_FEES,
  US_FULBRIGHT_BD,
  US_FUNDS,
  US_GATECH_GRAD,
  US_OPT,
  US_PSU_BD,
  US_READ,
  US_RECIPROCITY_BD,
  US_SEVIS_FEE,
  US_SYRACUSE_GRAD,
  US_TXST_BD,
  US_UCSD_INTL,
  US_UNR_GRAD,
  US_VISA,
  US_WORK,
} from './us-sources';

/**
 * United States reading guide, researched on its own from U.S. official
 * sources (Department of State, U.S. Embassy Dhaka / EducationUSA, DHS Study
 * in the States, ICE, USCIS, the Federal Register and university pages).
 * Nothing is taken from another country's guide. Amounts stay in U.S. dollars
 * and are never converted. Admission rules, deadlines and costs are set by
 * each university, so the guide keeps national (visa) rules apart from
 * university examples.
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
  'There is no single national admission system in the United States: each university sets its own requirements, test scores and deadlines. Always check the official page of the university and program you apply to.',
  'United States-এ কোনো একক জাতীয় ভর্তি ব্যবস্থা নেই: প্রতিটি university নিজের শর্ত, test score আর শেষ তারিখ ঠিক করে। যে university আর program-এ আবেদন করবেন, তার official page অবশ্যই দেখে নিন।',
);

const NEW_RULE = b(
  'Since 15 September 2026, F-1 students are admitted for a fixed period instead of "duration of status" (DHS final rule of 17 July 2026).',
  '১৫ September ২০২৬ থেকে F-1 student-দের "duration of status"-এর বদলে একটি নির্দিষ্ট সময়ের জন্য প্রবেশের অনুমতি দেওয়া হয় (DHS-এর ১৭ July ২০২৬-এর final rule)।',
);

// ------------------------------------------------------------------ shared answers

const visa = (id: string) =>
  qa(
    id,
    b('What do you need for the F-1 student visa?', 'F-1 student visa-র জন্য কী কী লাগে?'),
    [
      b(
        'First you need admission to a school certified by the Student and Exchange Visitor Program (SEVP). The school then issues your Form I-20 and registers you in SEVIS. You pay the I-901 SEVIS fee ($350) before the interview, complete the online DS-160 form with a photo, pay the $185 visa application fee, and attend a visa interview.',
        'প্রথমে Student and Exchange Visitor Program (SEVP)-স্বীকৃত একটি school-এ ভর্তি লাগবে। তারপর school আপনার Form I-20 দেয় আর SEVIS-এ আপনাকে নিবন্ধন করে। Interview-এর আগে I-901 SEVIS fee ($350) দিতে হয়, ছবিসহ online DS-160 form পূরণ করতে হয়, $185 visa application fee দিতে হয়, তারপর visa interview।',
      ),
      b(
        'Apply at the U.S. Embassy or Consulate in the country where you live — applying elsewhere may be more difficult. Interviews are generally required. Bring your passport (valid at least six months beyond your stay), the DS-160 confirmation, the fee receipt and your I-20; the officer may also ask for transcripts, test scores, proof of how you will pay all costs, and evidence that you intend to leave the United States after your studies.',
        'যে দেশে থাকেন, সেই দেশের U.S. Embassy বা Consulate-এ আবেদন করুন — অন্য দেশে আবেদন করা কঠিন হতে পারে। সাধারণত interview বাধ্যতামূলক। সঙ্গে নিন passport (থাকার সময়ের পরেও অন্তত ছয় মাস মেয়াদ), DS-160 confirmation, fee-র রসিদ আর I-20; officer transcript, test score, সব খরচ কীভাবে দেবেন তার প্রমাণ, আর পড়া শেষে United States ছেড়ে যাওয়ার ইচ্ছার প্রমাণও চাইতে পারেন।',
      ),
      b(
        'A new student\'s visa can be issued up to 365 days before the program start date, but you may enter the United States no more than 30 days before it. For Bangladeshi citizens the F-1 visa has no issuance fee and is multiple-entry, valid up to 60 months.',
        'নতুন student-এর visa program শুরুর ৩৬৫ দিন আগে পর্যন্ত দেওয়া যায়, কিন্তু United States-এ ঢোকা যায় শুরুর সর্বোচ্চ ৩০ দিন আগে। Bangladesh-এর নাগরিকদের F-1 visa-য় কোনো issuance fee নেই, আর এটা multiple-entry, সর্বোচ্চ ৬০ মাস মেয়াদি।',
      ),
    ],
    [US_VISA, US_SEVIS_FEE, US_FEES, US_RECIPROCITY_BD],
    { allDegrees: true },
  );

const stay = (id: string) =>
  qa(
    id,
    b('How long can you stay, and what changed in 2026?', 'কত দিন থাকা যায়, আর ২০২৬-এ কী বদলেছে?'),
    [
      NEW_RULE,
      b(
        'You are admitted for the length of the program on your I-20, up to four years, plus 30 days to arrive and 30 days to prepare for departure. If you need more time — a longer program, a new program, or post-completion OPT or STEM OPT — you apply for an extension of stay with USCIS (Form I-539, with a fee and biometrics) after your school official (DSO) updates your I-20, or you leave and are given a new admission period when you re-enter.',
        'আপনার I-20-তে লেখা program-এর সময়কাল, সর্বোচ্চ চার বছর, সঙ্গে পৌঁছানোর জন্য ৩০ দিন আর যাওয়ার প্রস্তুতির জন্য ৩০ দিনের অনুমতি পাবেন। বেশি সময় লাগলে — লম্বা program, নতুন program, বা post-completion OPT বা STEM OPT — school-এর কর্মকর্তা (DSO) I-20 হালনাগাদ করার পরে USCIS-এ extension of stay-র আবেদন করতে হয় (Form I-539, fee আর biometrics-সহ), নয়তো দেশ ছেড়ে আবার ঢোকার সময় নতুন সময় পাওয়া যায়।',
      ),
      b(
        'New limits: below graduate level you cannot change your major, change your education level or transfer to another school during your first year (unless SEVP approves an exception); at graduate level you cannot change major or level, or transfer, at any point in your program (transfer only with an SEVP exception). After finishing a program you cannot enrol in another program at the same or a lower level. The departure period after your program or OPT is now 30 days (it was 60).',
        'নতুন সীমা: graduate level-এর নিচে প্রথম বছরে major বদলানো, শিক্ষার level বদলানো বা অন্য school-এ transfer করা যায় না (SEVP ব্যতিক্রম অনুমোদন না করলে); graduate level-এ program চলাকালীন কখনোই major বা level বদলানো বা transfer করা যায় না (transfer শুধু SEVP-এর ব্যতিক্রমে)। একটি program শেষ করে একই বা নিচের level-এর আরেকটি program-এ ভর্তি হওয়া যায় না। Program বা OPT শেষে দেশ ছাড়ার সময় এখন ৩০ দিন (আগে ছিল ৬০)।',
      ),
    ],
    [US_DS_RULE, US_DS_FR],
    {
      allDegrees: true,
      discrepancy: b(
        'The State Department\'s student-visa page (read on 29 September 2026) still says F students must depart within 60 days after the program end date; the DHS final rule in force since 15 September 2026 sets 30 days for students admitted under it. DHS says its own pages are being updated. Confirm with your school\'s DSO.',
        'State Department-এর student visa page-এ (২৯ September ২০২৬-এ পড়া) এখনো লেখা আছে program শেষের ৬০ দিনের মধ্যে দেশ ছাড়তে হবে; অথচ ১৫ September ২০২৬ থেকে কার্যকর DHS-এর final rule-এ নতুন নিয়মে প্রবেশ করা student-দের জন্য ৩০ দিন। DHS জানিয়েছে তাদের page হালনাগাদ হচ্ছে। আপনার school-এর DSO-এর কাছে নিশ্চিত হয়ে নিন।',
      ),
    },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'There is no single national amount. You must show that you or a sponsor can cover tuition and living expenses for the period of study, and the school collects this evidence before issuing your I-20 — the amount is written on the I-20. Accepted evidence includes family bank statements, sponsor documents, financial aid or scholarship letters, and an employer letter showing annual salary.',
        'একক জাতীয় কোনো অঙ্ক নেই। দেখাতে হবে যে আপনি বা আপনার sponsor পড়াশোনার সময়ের tuition আর থাকার খরচ দিতে পারবেন; I-20 দেওয়ার আগে school এই প্রমাণ নেয় — অঙ্কটা I-20-তে লেখা থাকে। গ্রহণযোগ্য প্রমাণ: পরিবারের bank statement, sponsor-এর document, financial aid বা scholarship-এর চিঠি, আর বার্ষিক বেতনসহ নিয়োগকর্তার চিঠি।',
      ),
      b(
        'The U.S. Embassy in Dhaka advises that your sponsor should have enough funds for tuition and expenses for the first year, and a plan for the following years.',
        'ঢাকার U.S. Embassy পরামর্শ দেয়: প্রথম বছরের tuition আর খরচের জন্য sponsor-এর যথেষ্ট টাকা থাকা উচিত, আর পরের বছরগুলোর পরিকল্পনাও থাকা উচিত।',
      ),
    ],
    [US_FUNDS, US_EMBASSY_EDUSA],
    { allDegrees: true },
  );

const english = (id: string) =>
  qa(
    id,
    b('How much IELTS do you need for the United States?', 'United States-এ IELTS কত লাগে?'),
    [
      b(
        'The visa rules do not set a score: each university and program does. The U.S. Embassy in Dhaka says students from Bangladesh are usually required to take an English test — almost all universities ask for TOEFL, IELTS or PTE — and, depending on the program, an aptitude test such as the SAT, ACT, GRE or GMAT.',
        'Visa-র নিয়মে কোনো score ঠিক করা নেই: প্রতিটি university আর program ঠিক করে। ঢাকার U.S. Embassy বলে, Bangladesh-এর student-দের সাধারণত English test দিতে হয় — প্রায় সব university TOEFL, IELTS বা PTE চায় — আর program অনুযায়ী SAT, ACT, GRE বা GMAT-এর মতো aptitude test।',
      ),
      b(
        'Example: Texas State University says Bangladeshi applicants are not exempt from proving English. Scholarships may ask for a higher score than admission does.',
        'উদাহরণ: Texas State University বলে Bangladesh-এর আবেদনকারীরা ইংরেজির প্রমাণ দেওয়া থেকে ছাড় পান না। Scholarship ভর্তির চেয়ে বেশি score চাইতে পারে।',
      ),
      CHECK_UNI,
    ],
    [US_EMBASSY_EDUSA, US_TXST_BD],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in the United States?', 'United States-এ পড়ার পাশাপাশি কাজ করা যায়?'),
    [
      b(
        'Only in limited ways. On-campus work is allowed up to 20 hours a week while school is in session. Off-campus work is possible only after one full academic year, and only through authorised routes: Curricular Practical Training (CPT) that is part of your curriculum and authorised by your school, Optional Practical Training (OPT) approved by USCIS, or USCIS-approved work for severe economic hardship.',
        'শুধু সীমিতভাবে। Class চলাকালীন campus-এর ভেতরে সপ্তাহে ২০ ঘণ্টা পর্যন্ত কাজ করা যায়। Campus-এর বাইরে কাজ করা যায় শুধু এক পূর্ণ শিক্ষাবর্ষ পরে, আর শুধু অনুমোদিত পথে: আপনার পাঠক্রমের অংশ হিসেবে school-অনুমোদিত Curricular Practical Training (CPT), USCIS-অনুমোদিত Optional Practical Training (OPT), অথবা গুরুতর আর্থিক কষ্টের জন্য USCIS-অনুমোদিত কাজ।',
      ),
      b(
        'Working without permission is taken very seriously: your SEVIS record is terminated, you must leave the United States immediately and may not be allowed to return. You cannot start working while an OPT application (Form I-765) is pending. The U.S. Embassy in Dhaka warns that on-campus jobs are hard to get and do not cover tuition or living costs.',
        'অনুমতি ছাড়া কাজ করাকে খুব গুরুতরভাবে দেখা হয়: আপনার SEVIS record বাতিল হয়, সঙ্গে সঙ্গে United States ছাড়তে হয়, আর ফিরে আসার অনুমতি নাও পেতে পারেন। OPT-র আবেদন (Form I-765) অপেক্ষমাণ থাকা অবস্থায় কাজ শুরু করা যায় না। ঢাকার U.S. Embassy সতর্ক করে যে campus-এর চাকরি পাওয়া কঠিন, আর তাতে tuition বা থাকার খরচ ওঠে না।',
      ),
    ],
    [US_WORK, US_CPT, US_OPT, US_EMBASSY_EDUSA],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('What are the options to work in the United States after your studies?', 'পড়া শেষে United States-এ কাজের সুযোগ কী?'),
    [
      b(
        'Optional Practical Training (OPT): up to 12 months of work directly related to your major, before and/or after completing your studies (pre-completion OPT is deducted from post-completion OPT). With an eligible STEM degree you can apply for a 24-month STEM OPT extension, with an employer enrolled in E-Verify. Post-completion OPT is applied for with Form I-765 after your DSO recommends it; one year of full-time CPT removes OPT eligibility.',
        'Optional Practical Training (OPT): major-এর সঙ্গে সরাসরি সম্পর্কিত কাজে সর্বোচ্চ ১২ মাস, পড়া শেষের আগে আর/অথবা পরে (আগে নেওয়া OPT পরের OPT থেকে বাদ যায়)। যোগ্য STEM degree থাকলে E-Verify-তে নিবন্ধিত নিয়োগকর্তার কাছে ২৪ মাসের STEM OPT extension-এর আবেদন করা যায়। DSO সুপারিশ করার পরে Form I-765 দিয়ে post-completion OPT-র আবেদন; এক বছর full-time CPT করলে OPT-র যোগ্যতা থাকে না।',
      ),
      b(
        'OPT is temporary student work permission, not a residence route. Other work visas after OPT are separate applications with their own rules and are not covered here — nothing in this guide promises that you can stay.',
        'OPT হলো student-দের অস্থায়ী কাজের অনুমতি, স্থায়ী বসবাসের পথ নয়। OPT-র পরে অন্য work visa আলাদা আবেদন, নিজস্ব নিয়মসহ, এখানে আলোচনা করা হয়নি — এই guide-এর কোথাও থেকে যাওয়ার নিশ্চয়তা দেওয়া হয়নি।',
      ),
    ],
    [US_OPT, US_CPT],
    {
      allDegrees: true,
      discrepancy: b(
        'The USCIS OPT page (last updated November 2024) still gives filing windows written before the September 2026 rule. Under the new rule, students admitted for a fixed period may need an extension of stay for post-completion OPT or STEM OPT. Check the timing with your DSO.',
        'USCIS-এর OPT page (সর্বশেষ হালনাগাদ November ২০২৪)-এ এখনো September ২০২৬-এর নিয়মের আগের আবেদনের সময়সীমা লেখা। নতুন নিয়মে নির্দিষ্ট সময়ের জন্য প্রবেশ করা student-দের post-completion OPT বা STEM OPT-র জন্য extension of stay লাগতে পারে। সময়সীমা আপনার DSO-এর কাছে নিশ্চিত হয়ে নিন।',
      ),
    },
  );

const tuition = (id: string) =>
  qa(
    id,
    b('How much is tuition in the United States?', 'United States-এ tuition কত?'),
    [
      b(
        'It depends entirely on the university. The U.S. Embassy in Dhaka says yearly tuition can vary from about $15,000 to over $60,000. EducationUSA advises budgeting for tuition, fees and living costs, expecting tuition to rise about 6–10% a year, and checking each institution\'s own figures.',
        'পুরোটাই university-র উপর নির্ভর করে। ঢাকার U.S. Embassy বলে বছরে tuition প্রায় $15,000 থেকে $60,000-এর বেশি পর্যন্ত হতে পারে। EducationUSA-র পরামর্শ: tuition, fee আর থাকার খরচ ধরে বাজেট করুন, tuition বছরে প্রায় ৬–১০% বাড়তে পারে ধরে নিন, আর প্রতিটি প্রতিষ্ঠানের নিজের অঙ্ক দেখে নিন।',
      ),
    ],
    [US_EMBASSY_EDUSA, US_EDUSA_GRAD_FUNDS],
    { kind: 'estimate', status: 'partly-verified' },
  );

const living = (id: string) =>
  qa(
    id,
    b('How much are living costs?', 'থাকা-খাওয়ার খরচ কত?'),
    [
      b(
        'Not verified yet as a national figure: living costs differ widely by city and university. Your university\'s estimate of living expenses appears on your I-20, and that is the amount you must be able to show. EducationUSA notes that areas with a lower cost of living — such as the South, the Midwest or rural areas — can reduce costs.',
        'এখনো জাতীয় অঙ্ক হিসেবে যাচাই হয়নি: শহর আর university অনুযায়ী থাকার খরচ অনেক আলাদা। আপনার university-র থাকার খরচের হিসাব I-20-তে থাকে, আর সেই অঙ্কই দেখাতে পারতে হবে। EducationUSA বলে কম খরচের এলাকা — যেমন দক্ষিণ, মধ্য-পশ্চিম বা গ্রামীণ এলাকা — খরচ কমাতে পারে।',
      ),
    ],
    [US_FUNDS, US_EDUSA_GRAD_FUNDS],
    { status: 'not-verified', kind: 'estimate', allDegrees: true },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('Do you need health insurance?', 'Health insurance লাগে কি?'),
    [b('Not verified yet as a national visa rule: the official visa pages read for this guide do not set a health-insurance requirement for F-1 students. Many universities require their own student health plan — check your university\'s international student page.', 'এখনো জাতীয় visa নিয়ম হিসেবে যাচাই হয়নি: এই guide-এর জন্য পড়া official visa page-গুলোতে F-1 student-দের health insurance-এর শর্ত নেই। অনেক university নিজের student health plan বাধ্যতামূলক করে — আপনার university-র international student page দেখুন।')],
    [US_VISA],
    { status: 'not-verified', allDegrees: true },
  );

// ------------------------------------------------------------------ documents

const DOS = b('U.S. Department of State (the U.S. Embassy in Dhaka).', 'U.S. Department of State (ঢাকার U.S. Embassy)।');

export const US_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Needed for the application and the visa; it must be valid at least six months beyond your stay.', 'আবেদন আর visa-র জন্য লাগে; থাকার সময়ের পরেও অন্তত ছয় মাস মেয়াদ থাকতে হবে।'),
    who: DOS,
    when: b('From the university application to arrival.', 'University-র আবেদন থেকে পৌঁছানো পর্যন্ত।'),
    where: b('University application, DS-160 and the visa interview.', 'University-র আবেদন, DS-160 আর visa interview।'),
    prepare: b('Check the expiry date early.', 'মেয়াদ শেষের তারিখ আগেই দেখে নিন।'),
    groups: ['general', 'visa'],
    sources: [US_VISA],
  },
  {
    id: 'academic',
    name: b('Certificates, transcripts and translations', 'সনদ, transcript আর অনুবাদ'),
    why: b('University documents: your academic record for admission (before admission).', 'University-র document: ভর্তির জন্য আপনার শিক্ষাগত রেকর্ড (ভর্তির আগে)।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('With the application; official copies are often requested after admission.', 'আবেদনের সময়; official কপি প্রায়ই ভর্তির পরে চাওয়া হয়।'),
    where: b('The university\'s application system.', 'University-র application system-এ।'),
    prepare: b('Example (Penn State): first-year applicants self-report grades; after accepting the offer they send official transcripts for the last three years plus official SSC and HSC certificates with a separate line-by-line English translation.', 'উদাহরণ (Penn State): প্রথম বর্ষের আবেদনকারীরা নিজেরা grade লিখে জমা দেন; offer গ্রহণের পরে শেষ তিন বছরের official transcript আর SSC ও HSC-এর official কপি, আলাদা লাইন-বাই-লাইন ইংরেজি অনুবাদসহ পাঠান।'),
    groups: ['general', 'program', 'bangladesh'],
    sources: [US_PSU_BD, US_EDUSA_UG_APPLY],
  },
  {
    id: 'english',
    name: b('English test and admission test scores', 'English test আর ভর্তি পরীক্ষার score'),
    why: b('University document: TOEFL, IELTS or PTE, and SAT/ACT/GRE/GMAT where the program asks.', 'University-র document: TOEFL, IELTS বা PTE, আর program চাইলে SAT/ACT/GRE/GMAT।'),
    who: b('The university; the visa officer may also ask to see them.', 'University; visa officer-ও দেখতে চাইতে পারেন।'),
    when: b('Before the application deadline.', 'আবেদনের শেষ তারিখের আগে।'),
    where: b('Sent from the test provider to the university.', 'Test provider থেকে university-তে পাঠানো হয়।'),
    prepare: b('Book tests early — the required score is on each program page.', 'আগেভাগে test-এর তারিখ নিন — কত score লাগবে, তা প্রতিটি program page-এ থাকে।'),
    groups: ['program', 'visa'],
    sources: [US_EMBASSY_EDUSA, US_VISA],
  },
  {
    id: 'essays',
    name: b('Essay or personal statement and recommendation letters', 'Essay বা personal statement আর সুপারিশপত্র'),
    why: b('University documents: your goals and strengths, and what teachers or supervisors say about you.', 'University-র document: আপনার লক্ষ্য আর শক্তি, আর শিক্ষক বা supervisor আপনার সম্পর্কে কী বলেন।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('With the application.', 'আবেদনের সময়।'),
    where: b('The university\'s application system.', 'University-র application system-এ।'),
    prepare: b('Written in your own words; ask referees early.', 'নিজের ভাষায় লিখুন; referee-দের আগেভাগে অনুরোধ করুন।'),
    groups: ['program'],
    sources: [US_EDUSA_UG_APPLY],
  },
  {
    id: 'cv-research',
    name: b('CV and research interests (graduate programs)', 'CV আর গবেষণার আগ্রহ (graduate program)'),
    why: b('University documents for many master\'s and PhD programs; for funding, professors play an important role in choosing recipients.', 'অনেক master\'s আর PhD program-এর university document; funding-এর ক্ষেত্রে professor-রা প্রাপক বাছাইয়ে গুরুত্বপূর্ণ ভূমিকা রাখেন।'),
    who: b('The university department.', 'University-র department।'),
    when: b('With the application; contact professors early.', 'আবেদনের সময়; professor-দের সঙ্গে আগেভাগে যোগাযোগ করুন।'),
    where: b('The graduate application portal.', 'Graduate application portal-এ।'),
    prepare: b('Not verified as a general list: each program states exactly what it needs.', 'সাধারণ তালিকা হিসেবে যাচাই হয়নি: প্রতিটি program ঠিক কী চায়, তা জানায়।'),
    groups: ['program'],
    degrees: ['masters', 'phd'],
    status: 'partly-verified',
    sources: [US_EDUSA_GRAD_FUNDS],
  },
  {
    id: 'scholarship-docs',
    name: b('Scholarship documents (for example Fulbright)', 'Scholarship-এর document (যেমন Fulbright)'),
    why: b('Scholarship documents — separate from the university and visa documents.', 'Scholarship-এর document — university আর visa-র document থেকে আলাদা।'),
    who: b('The scholarship body (Fulbright: U.S. Department of State, through the Embassy and IIE).', 'Scholarship প্রতিষ্ঠান (Fulbright: U.S. Department of State, Embassy আর IIE-এর মাধ্যমে)।'),
    when: b('By the scholarship deadline (Fulbright 2027-2028: 11 July 2026).', 'Scholarship-এর শেষ তারিখের মধ্যে (Fulbright ২০২৭-২০২৮: ১১ July ২০২৬)।'),
    where: b('The scholarship\'s online application.', 'Scholarship-এর online আবেদনে।'),
    prepare: b('Fulbright Bangladesh: transcripts and certificates from each post-secondary institution, three recommendation letters, the academic records form, TOEFL or IELTS, and GRE or GMAT if available.', 'Fulbright Bangladesh: প্রতিটি উচ্চশিক্ষা প্রতিষ্ঠানের transcript আর সনদ, তিনটি সুপারিশপত্র, academic records form, TOEFL বা IELTS, আর থাকলে GRE বা GMAT।'),
    groups: ['program', 'bangladesh'],
    degrees: ['masters'],
    sources: [US_FULBRIGHT_BD],
  },
  {
    id: 'finance',
    name: b('Financial evidence', 'আর্থিক প্রমাণ'),
    why: b('For the I-20 and the visa: shows tuition and living expenses for your period of study can be paid.', 'I-20 আর visa-র জন্য: পড়ার সময়ের tuition আর থাকার খরচ দেওয়া যাবে, তা দেখায়।'),
    who: b('The university (before issuing the I-20) and the visa officer.', 'University (I-20 দেওয়ার আগে) আর visa officer।'),
    when: b('Before the I-20 is issued, and at the interview.', 'I-20 দেওয়ার আগে, আর interview-তে।'),
    where: b('Sent to the university; brought to the interview.', 'University-তে পাঠাতে হয়; interview-তে সঙ্গে নিতে হয়।'),
    prepare: b('Family bank statements, sponsor documents, financial aid or scholarship letters, or an employer letter showing annual salary.', 'পরিবারের bank statement, sponsor-এর document, financial aid বা scholarship-এর চিঠি, বা বার্ষিক বেতনসহ নিয়োগকর্তার চিঠি।'),
    groups: ['program', 'visa'],
    sources: [US_FUNDS, US_VISA],
  },
  {
    id: 'i20',
    name: b('Form I-20', 'Form I-20 (ভর্তির যোগ্যতার সনদ)'),
    why: b('Visa document: the school\'s certificate of eligibility for F-1 status; you cannot apply for the visa without it (after admission).', 'Visa-র document: F-1 status-এর জন্য school-এর যোগ্যতার সনদ; এটা ছাড়া visa-র আবেদন করা যায় না (ভর্তির পরে)।'),
    who: b('Issued by the school\'s Designated School Official (DSO).', 'School-এর Designated School Official (DSO) দেন।'),
    when: b('After admission and financial evidence.', 'ভর্তি আর আর্থিক প্রমাণের পরে।'),
    where: b('Sent by the school; bring it to the interview and when you enter.', 'School পাঠায়; interview-তে আর প্রবেশের সময় সঙ্গে রাখুন।'),
    prepare: b('Check the program dates and the cost figures on it.', 'এতে লেখা program-এর তারিখ আর খরচের অঙ্ক দেখে নিন।'),
    groups: ['visa'],
    sources: [US_VISA, US_FUNDS],
  },
  {
    id: 'sevis-fee',
    name: b('I-901 SEVIS fee receipt ($350)', 'I-901 SEVIS fee-র রসিদ ($350)'),
    why: b('Visa requirement: paid before the visa interview.', 'Visa-র শর্ত: visa interview-এর আগে দিতে হয়।'),
    who: b('U.S. Immigration and Customs Enforcement (SEVP).', 'U.S.-এর অভিবাসন সংস্থা Immigration and Customs Enforcement (SEVP)।'),
    when: b('After you receive the I-20, before the interview.', 'I-20 পাওয়ার পরে, interview-এর আগে।'),
    where: b('Online at fmjfee.com.', 'Online-এ fmjfee.com-এ।'),
    prepare: b('Use the SEVIS ID from your I-20; keep the receipt.', 'I-20-এর SEVIS ID ব্যবহার করুন; রসিদ রেখে দিন।'),
    groups: ['visa'],
    sources: [US_SEVIS_FEE],
  },
  {
    id: 'ds160',
    name: b('DS-160 confirmation, photo and visa fee receipt ($185)', 'DS-160 confirmation, ছবি আর visa fee-র রসিদ ($185)'),
    why: b('Visa documents: the online application and proof of the application fee.', 'Visa-র document: online আবেদন আর application fee-র প্রমাণ।'),
    who: DOS,
    when: b('Before booking the interview.', 'Interview-এর তারিখ নেওয়ার আগে।'),
    where: b('Online DS-160; bring the confirmation page to the interview.', 'Online DS-160; confirmation page interview-তে নিয়ে যান।'),
    prepare: b('The photo must meet the State Department photo requirements.', 'ছবি State Department-এর ছবির শর্ত মেনে হতে হবে।'),
    groups: ['visa'],
    sources: [US_VISA, US_FEES],
  },
  {
    id: 'interview',
    name: b('Visa interview at the U.S. Embassy in Dhaka', 'ঢাকার U.S. Embassy-তে visa interview'),
    why: b('Interviews are generally required; applicants in Bangladesh appear in person at the Embassy.', 'সাধারণত interview বাধ্যতামূলক; Bangladesh-এর আবেদনকারীরা Embassy-তে সশরীরে উপস্থিত হন।'),
    who: DOS,
    when: b('After the SEVIS fee and DS-160; a visa can be issued up to 365 days before the program starts.', 'SEVIS fee আর DS-160-এর পরে; program শুরুর ৩৬৫ দিন আগে পর্যন্ত visa দেওয়া যায়।'),
    where: b('U.S. Embassy, Dhaka.', 'U.S. Embassy, ঢাকা।'),
    prepare: b('Bring the I-20, financial evidence, academic records and test scores, and be ready to explain your study plan and your plans after graduation.', 'I-20, আর্থিক প্রমাণ, শিক্ষাগত রেকর্ড আর test score নিয়ে যান, আর পড়াশোনার পরিকল্পনা আর পড়া শেষের পরিকল্পনা ব্যাখ্যা করতে প্রস্তুত থাকুন।'),
    groups: ['visa', 'bangladesh'],
    sources: [US_VISA, US_EMBASSY_EDUSA],
  },
  {
    id: 'arrival',
    name: b('Entry: no earlier than 30 days before your program', 'প্রবেশ: program শুরুর ৩০ দিনের বেশি আগে নয়'),
    why: b('You are admitted for a fixed period based on your I-20 (since 15 September 2026).', 'আপনার I-20-এর ভিত্তিতে নির্দিষ্ট সময়ের জন্য প্রবেশের অনুমতি পান (১৫ September ২০২৬ থেকে)।'),
    who: b('U.S. Customs and Border Protection.', 'U.S.-এর সীমান্ত সংস্থা Customs and Border Protection।'),
    when: b('Up to 30 days before the program start date.', 'Program শুরুর সর্বোচ্চ ৩০ দিন আগে।'),
    where: b('The U.S. port of entry.', 'U.S.-এর প্রবেশ বন্দরে।'),
    prepare: b('Carry your passport, visa and I-20; check the admit-until date on your I-94 record.', 'Passport, visa আর I-20 সঙ্গে রাখুন; I-94 record-এ admit-until তারিখ দেখে নিন।'),
    groups: ['arrival'],
    sources: [US_VISA, US_DS_RULE],
  },
];

// ------------------------------------------------------------------ costs (USD, never converted)

const VISA_FEE: GuideCost = { id: 'visa-fee', label: b('F-1 visa application fee', 'F-1 visa application fee'), value: b('$185', '$185'), amount: { value: 185, currency: 'USD', period: 'one-time' }, note: b('No visa issuance fee for Bangladeshi citizens.', 'Bangladesh-এর নাগরিকদের কোনো visa issuance fee নেই।'), source: US_FEES };
const SEVIS: GuideCost = { id: 'sevis-fee', label: b('I-901 SEVIS fee', 'I-901 SEVIS fee'), value: b('$350', '$350'), amount: { value: 350, currency: 'USD', period: 'one-time' }, source: US_SEVIS_FEE };
const TUITION_RANGE: GuideCost = { id: 'tuition', label: b('Tuition (range given by the U.S. Embassy in Dhaka)', 'Tuition (ঢাকার U.S. Embassy-র দেওয়া সীমা)'), value: b('About $15,000 to over $60,000 a year — set by each university', 'বছরে প্রায় $15,000 থেকে $60,000-এর বেশি — প্রতিটি university ঠিক করে'), status: 'partly-verified', amount: { value: 15000, max: 60000, currency: 'USD', period: 'year' }, source: US_EMBASSY_EDUSA };
const UNVERIFIED: GuideCost[] = [
  { id: 'application-fee', label: b('University application fees', 'University-র আবেদন fee'), value: b('Not verified — set by each university', 'যাচাই হয়নি — প্রতিটি university ঠিক করে'), status: 'not-verified', source: US_EDUSA_UG_APPLY },
  { id: 'living', label: b('Living costs (on your I-20)', 'থাকার খরচ (I-20-তে লেখা)'), value: b('Not verified — differs by city and university', 'যাচাই হয়নি — শহর আর university অনুযায়ী আলাদা'), status: 'not-verified', source: US_FUNDS },
  { id: 'rent', label: b('Accommodation', 'বাসাভাড়া'), value: b('Not verified — on-campus or off-campus, by city', 'যাচাই হয়নি — campus-এর ভেতরে বা বাইরে, শহর অনুযায়ী'), status: 'not-verified', source: US_FUNDS },
  { id: 'insurance', label: b('Health insurance', 'Health insurance'), value: b('Not verified — many universities require their own plan', 'যাচাই হয়নি — অনেক university নিজের plan বাধ্যতামূলক করে'), status: 'not-verified', source: US_VISA },
  { id: 'travel-other', label: b('Travel, tests and other costs (for example extension of stay or OPT fees)', 'যাতায়াত, test আর অন্যান্য খরচ (যেমন extension of stay বা OPT-র fee)'), value: b('Not verified', 'যাচাই হয়নি'), status: 'not-verified', source: US_DS_RULE },
];

// ------------------------------------------------------------------ common sections

const commonTail = (level: 'bachelors' | 'masters' | 'phd') => [
  {
    id: 'costs',
    title: b('Costs', 'খরচ'),
    items: [...(level === 'phd' ? [] : [tuition('tuition')]), living('living'), { embed: 'costs' as const }, funds('funds'), insurance('insurance')],
  },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa('types', b('Which universities are there?', 'কোন কোন university আছে?'), [b('There are over 4,000 accredited colleges and universities, varying in quality, competitiveness, size and cost; check that a university is accredited and SEVP-certified before you apply. The examples below are universities whose Bangladesh or international admission pages were read for this guide, listed alphabetically, not ordered by quality.', '৪,০০০-এর বেশি স্বীকৃত (accredited) college আর university আছে, মান, প্রতিযোগিতা, আকার আর খরচে আলাদা; আবেদনের আগে university accredited আর SEVP-স্বীকৃত কিনা দেখে নিন। নিচের উদাহরণগুলো সেই university, যাদের Bangladesh বা international ভর্তির page এই guide-এর জন্য পড়া হয়েছে, বর্ণানুক্রমে, মান অনুযায়ী নয়।')], [US_EMBASSY_EDUSA, US_VISA]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work')] },
  { id: 'visa', title: b('F-1 student visa', 'F-1 student visa'), items: [visa('visa'), stay('stay')] },
  { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('About four years · after HSC', 'প্রায় চার বছর · HSC-র পরে'),
  intro: b(
    "A U.S. bachelor's degree takes about four years of full-time study. Many universities accept the Bangladesh HSC for first-year admission, but each sets its own grades, tests and deadlines — applications are commonly due between November and January for a September start. After admission you get an I-20 and apply for the F-1 visa.",
    "U.S.-এর bachelor's degree-তে প্রায় চার বছর full-time পড়তে হয়। অনেক university প্রথম বর্ষে ভর্তির জন্য Bangladesh-এর HSC গ্রহণ করে, তবে প্রতিটি নিজের grade, test আর শেষ তারিখ ঠিক করে — September-এ শুরুর জন্য সাধারণত November থেকে January-র মধ্যে আবেদন করতে হয়। ভর্তির পরে I-20 নিয়ে F-1 visa-র আবেদন।",
  ),
  costs: { official: [VISA_FEE, SEVIS], estimates: [TUITION_RANGE, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in the United States from Bangladesh?", "Bangladesh থেকে United States-এ Bachelor's পড়তে কী কী লাগে?"),
          [
            b(
              'Your SSC and HSC results and school transcripts, English test scores (and SAT or ACT where the university asks), an essay, recommendation letters and the application fee. Then, after admission, financial evidence for the I-20, the SEVIS fee and the F-1 visa.',
              'আপনার SSC আর HSC-র ফল আর school-এর transcript, English test score (আর university চাইলে SAT বা ACT), essay, সুপারিশপত্র আর application fee। তারপর ভর্তির পরে I-20-এর জন্য আর্থিক প্রমাণ, SEVIS fee আর F-1 visa।',
            ),
            CHECK_UNI,
          ],
          [US_EMBASSY_EDUSA, US_EDUSA_UG_APPLY, US_VISA],
        ),
        qa(
          'hsc',
          b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"),
          [
            b(
              "Yes, at many universities — U.S. bachelor's programs follow twelve years of school. UC San Diego lists the Higher Secondary Certificate for Bangladesh. Penn State asks for SSC and HSC results. Texas State University lists SSC and HSC and expects an average of B or better, at least a recalculated GPA of 2.74 on a 4-point scale over the last three years — this does not guarantee admission.",
              "হ্যাঁ, অনেক university-তে — U.S.-এর bachelor's program বারো বছরের স্কুলের পরে শুরু হয়। UC San Diego Bangladesh-এর জন্য Higher Secondary Certificate তালিকায় রেখেছে। Penn State SSC আর HSC-র ফল চায়। Texas State University SSC আর HSC চায়, আর গড়ে B বা তার বেশি আশা করে — শেষ তিন বছরে ৪-এর মধ্যে পুনর্গণিত GPA অন্তত 2.74 — এতে ভর্তির নিশ্চয়তা নেই।",
            ),
            CHECK_UNI,
          ],
          [US_UCSD_INTL, US_PSU_BD, US_TXST_BD],
        ),
      ],
    },
    {
      id: 'apply',
      title: b('Applying and deadlines', 'আবেদন আর শেষ তারিখ'),
      items: [
        qa(
          'deadlines',
          b('When do you apply, and when do courses start?', 'কখন আবেদন করবেন, আর course কখন শুরু হয়?'),
          [b('The academic year usually runs from September to May. EducationUSA says U.S. undergraduate applications are typically due between November and January for students starting the following September — but every university sets its own dates, so make a calendar of each deadline.', 'শিক্ষাবর্ষ সাধারণত September থেকে May পর্যন্ত। EducationUSA বলে, পরের September-এ শুরু করতে চাইলে U.S.-এর undergraduate আবেদন সাধারণত November থেকে January-র মধ্যে জমা দিতে হয় — তবে প্রতিটি university নিজের তারিখ ঠিক করে, তাই প্রতিটি শেষ তারিখের একটা calendar বানান।')],
          [US_EDUSA_UG_APPLY],
        ),
        qa(
          'process',
          b('What is the full process, step by step?', 'পুরো প্রক্রিয়া ধাপে ধাপে কেমন?'),
          [b('1) Shortlist accredited, SEVP-certified universities and check each one\'s Bangladesh requirements. 2) Take the English test (and SAT/ACT if required). 3) Apply with transcripts, essay and recommendations before each deadline. 4) After admission, send financial evidence and receive your I-20. 5) Pay the SEVIS fee, complete the DS-160 and pay the visa fee. 6) Attend the interview at the U.S. Embassy in Dhaka. 7) Enter the United States no earlier than 30 days before your program starts.', '১) Accredited আর SEVP-স্বীকৃত university বাছাই করে প্রতিটির Bangladesh-এর শর্ত দেখুন। ২) English test দিন (আর লাগলে SAT/ACT)। ৩) প্রতিটি শেষ তারিখের আগে transcript, essay আর সুপারিশপত্রসহ আবেদন করুন। ৪) ভর্তির পরে আর্থিক প্রমাণ পাঠিয়ে I-20 নিন। ৫) SEVIS fee দিন, DS-160 পূরণ করুন আর visa fee দিন। ৬) ঢাকার U.S. Embassy-তে interview দিন। ৭) Program শুরুর ৩০ দিনের বেশি আগে United States-এ ঢুকবেন না।')],
          [US_EMBASSY_EDUSA, US_EDUSA_UG_APPLY, US_VISA, US_SEVIS_FEE],
          { kind: 'guidance' },
        ),
      ],
    },
    { id: 'language', title: b('English and tests', 'ইংরেজি আর test'), items: [english('english')] },
    {
      id: 'scholarships',
      title: b('Scholarships and financial aid', 'Scholarship আর financial aid'),
      items: [
        qa(
          'scholarships',
          b("Are there scholarships for a Bachelor's?", "Bachelor's-এর জন্য scholarship আছে কি?"),
          [b('Some universities give aid to international undergraduates, but the U.S. Embassy in Dhaka says it is competitive — you need strong grades, test scores, essays, recommendations and activities — and aid seldom covers more than tuition, so living costs, books and fees must still be paid. Specific undergraduate scholarships are university-specific and not verified here.', 'কিছু university international undergraduate-দের aid দেয়, তবে ঢাকার U.S. Embassy বলে এটা প্রতিযোগিতামূলক — ভালো grade, test score, essay, সুপারিশপত্র আর extracurricular কাজ লাগে — আর aid খুব কমই tuition-এর বেশি দেয়, তাই থাকার খরচ, বই আর fee নিজেকেই দিতে হয়। নির্দিষ্ট undergraduate scholarship প্রতিটি university-র নিজস্ব, এখানে যাচাই হয়নি।')],
          [US_EMBASSY_EDUSA],
          { status: 'partly-verified' },
        ),
      ],
    },
    ...commonTail('bachelors'),
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b("Usually after a four-year bachelor's", "সাধারণত চার বছরের bachelor's-এর পরে"),
  intro: b(
    "U.S. master's programs are applied for directly to each university's graduate school. Many accept a four-year Bangladeshi bachelor's; three-year degrees are handled differently by each university. Graduate students have more funding options than undergraduates, often as assistantships, and Fulbright funds master's study for Bangladeshi professionals.",
    "U.S.-এর master's-এ প্রতিটি university-র graduate school-এ সরাসরি আবেদন করতে হয়। অনেক university Bangladesh-এর চার বছরের bachelor's গ্রহণ করে; তিন বছরের degree প্রতিটি university আলাদাভাবে বিবেচনা করে। Undergraduate-দের চেয়ে graduate student-দের funding-এর সুযোগ বেশি, প্রায়ই assistantship হিসেবে, আর Fulbright Bangladesh-এর পেশাজীবীদের master's-এর খরচ দেয়।",
  ),
  costs: { official: [VISA_FEE, SEVIS], estimates: [TUITION_RANGE, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in the United States?", "United States-এ Master's-এ কী লাগে?"),
          [
            b(
              "A bachelor's degree the university recognises as equivalent to a U.S. bachelor's, English test scores, and the program's documents (usually transcripts, a statement of purpose, recommendations, and GRE or GMAT where required).",
              "এমন bachelor's degree, যা university U.S.-এর bachelor's-এর সমমান মনে করে, English test score, আর program-এর document (সাধারণত transcript, statement of purpose, সুপারিশপত্র, আর লাগলে GRE বা GMAT)।",
            ),
            b(
              "Examples: Georgia Tech lists a Bangladeshi bachelor's of at least four years; Syracuse University recognises a four-year bachelor's from Bangladesh. The University of Nevada, Reno also accepts a two-year bachelor's plus two years of a master's, or a three-year bachelor's plus one year of a master's.",
              "উদাহরণ: Georgia Tech Bangladesh-এর অন্তত চার বছরের bachelor's চায়; Syracuse University Bangladesh-এর চার বছরের bachelor's স্বীকার করে। University of Nevada, Reno দুই বছরের bachelor's-এর সঙ্গে দুই বছরের master's, বা তিন বছরের bachelor's-এর সঙ্গে এক বছরের master's-ও গ্রহণ করে।",
            ),
            CHECK_UNI,
          ],
          [US_GATECH_GRAD, US_SYRACUSE_GRAD, US_UNR_GRAD],
          {
            discrepancy: b(
              'Universities differ on three-year and two-year Bangladeshi degrees: Georgia Tech and Syracuse describe a four-year bachelor\'s, while the University of Nevada, Reno also lists 2+2 and 3+1 combinations with a master\'s. Check your target university.',
              'Bangladesh-এর তিন আর দুই বছরের degree নিয়ে university-গুলোর মধ্যে পার্থক্য আছে: Georgia Tech আর Syracuse চার বছরের bachelor\'s-এর কথা বলে, আর University of Nevada, Reno master\'s-সহ ২+২ আর ৩+১-ও গ্রহণ করে। আপনার লক্ষ্যের university দেখে নিন।',
            ),
          },
        ),
        qa(
          'cgpa',
          b('What CGPA is needed?', 'কত CGPA লাগে?'),
          [b('Not verified yet: there is no national minimum; each graduate school and program sets its own. Check the program page.', 'এখনো যাচাই হয়নি: কোনো জাতীয় minimum নেই; প্রতিটি graduate school আর program নিজে ঠিক করে। Program page দেখুন।')],
          [US_GATECH_GRAD],
          { status: 'not-verified' },
        ),
      ],
    },
    { id: 'language', title: b('English and tests', 'ইংরেজি আর test'), items: [english('english')] },
    {
      id: 'funding',
      title: b('Funding and scholarships', 'Funding আর scholarship'),
      items: [
        qa(
          'assistantships',
          b("Can you get funding for a Master's?", "Master's-এর জন্য funding পাওয়া যায়?"),
          [b('Graduate students have more financial aid opportunities, often as research or teaching assistantships that may cover tuition and pay a monthly stipend (U.S. Embassy Dhaka). EducationUSA notes most awards cover only part of costs and may not be available to first-year international students; scholarship and grant deadlines can be as early as 18 months before your start date.', 'Graduate student-দের financial aid-এর সুযোগ বেশি, প্রায়ই research বা teaching assistantship হিসেবে, যা tuition দিতে আর মাসিক stipend দিতে পারে (U.S. Embassy ঢাকা)। EducationUSA বলে বেশিরভাগ award খরচের একাংশ দেয়, আর প্রথম বর্ষের international student-রা নাও পেতে পারেন; scholarship আর grant-এর শেষ তারিখ শুরুর ১৮ মাস আগেও হতে পারে।')],
          [US_EMBASSY_EDUSA, US_EDUSA_GRAD_FUNDS],
        ),
        qa(
          'fulbright',
          b('What is the Fulbright scholarship for Bangladesh?', 'Bangladesh-এর জন্য Fulbright scholarship কী?'),
          [
            b(
              "A U.S. government program for a master's degree in the United States. For the 2027-2028 round, Bangladeshi citizens living in Bangladesh needed a four-year bachelor's with an outstanding record, at least two years of relevant full-time work experience, and TOEFL 90 or IELTS 7; applications closed on 11 July 2026.",
              "United States-এ master's-এর জন্য U.S. সরকারের একটি program। ২০২৭-২০২৮ round-এ Bangladesh-এ বসবাসকারী Bangladesh-এর নাগরিকদের লাগত চমৎকার ফলসহ চার বছরের bachelor's, অন্তত দুই বছরের প্রাসঙ্গিক full-time কাজের অভিজ্ঞতা, আর TOEFL 90 বা IELTS 7; আবেদন ১১ July ২০২৬-এ বন্ধ হয়েছে।",
            ),
            b('Exactly what the grant pays is not stated in the announcement read for this guide — not verified here.', 'Grant ঠিক কী কী খরচ দেয়, তা এই guide-এর জন্য পড়া announcement-এ লেখা নেই — এখানে যাচাই হয়নি।'),
          ],
          [US_FULBRIGHT_BD],
          { status: 'partly-verified' },
        ),
        { embed: 'scholarships' },
      ],
    },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b("How do you apply for a Master's?", "Master's-এ কীভাবে আবেদন করবেন?"),
          [b("Apply to each university's graduate school by its deadline, and contact professors in your department early — they play an important role in choosing funding recipients. After admission: financial evidence, I-20, SEVIS fee, DS-160 and the visa interview.", 'প্রতিটি university-র graduate school-এ তার শেষ তারিখের মধ্যে আবেদন করুন, আর আপনার department-এর professor-দের সঙ্গে আগেভাগে যোগাযোগ করুন — funding-প্রাপক বাছাইয়ে তাঁদের গুরুত্বপূর্ণ ভূমিকা থাকে। ভর্তির পরে: আর্থিক প্রমাণ, I-20, SEVIS fee, DS-160 আর visa interview।')],
          [US_EDUSA_GRAD_FUNDS, US_VISA],
          { kind: 'guidance' },
        ),
      ],
    },
    ...commonTail('masters'),
  ],
};

// ------------------------------------------------------------------ PhD

const PHD: DegreeGuide = {
  level: 'phd',
  card: b("Research doctorate · after a bachelor's or master's", "গবেষণা doctorate · bachelor's বা master's-এর পরে"),
  intro: b(
    "A U.S. PhD is the highest academic degree, earned through graduate coursework, usually a qualifying examination, and a dissertation. Funding through teaching or research assistantships, with a tuition waiver and/or stipend, is very common at PhD level. Under the 2026 rule a PhD longer than four years needs an extension of stay.",
    "U.S.-এর PhD সর্বোচ্চ academic degree — graduate coursework, সাধারণত একটি qualifying examination, আর dissertation-এর মাধ্যমে অর্জিত হয়। PhD level-এ teaching বা research assistantship-এর মাধ্যমে tuition waiver আর/অথবা stipend খুবই প্রচলিত। ২০২৬-এর নিয়মে চার বছরের বেশি PhD-র জন্য extension of stay লাগে।",
  ),
  costs: { official: [VISA_FEE, SEVIS], estimates: UNVERIFIED },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'master',
          b('What do you need for a PhD in the United States?', 'United States-এ PhD-তে কী লাগে?'),
          [
            b(
              "A PhD follows graduate study beyond the bachelor's and/or master's degree, so a recognised bachelor's (and at some universities a master's) is the starting point. Admission, research fit and funding are decided by each department; professors play an important role in choosing funding recipients, so contact them early.",
              "PhD bachelor's আর/অথবা master's-এর পরের graduate পড়াশোনা, তাই স্বীকৃত bachelor's (কিছু university-তে master's) থেকে শুরু। ভর্তি, গবেষণার মিল আর funding প্রতিটি department ঠিক করে; funding-প্রাপক বাছাইয়ে professor-দের গুরুত্বপূর্ণ ভূমিকা থাকে, তাই আগেভাগে যোগাযোগ করুন।",
            ),
            b('Research proposal, interview and minimum GPA: not verified yet as general rules — each program states its own.', 'Research proposal, interview আর minimum GPA: সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি — প্রতিটি program নিজের শর্ত জানায়।'),
            CHECK_UNI,
          ],
          [US_EDUSA_GRAD_FUNDS, US_GATECH_GRAD],
          { status: 'partly-verified' },
        ),
      ],
    },
    { id: 'language', title: b('English and tests', 'ইংরেজি আর test'), items: [english('english')] },
    {
      id: 'funding',
      title: b('Funded or self-funded', 'Funded নাকি নিজের খরচে'),
      items: [
        qa(
          'funded',
          b('How are PhDs funded?', 'PhD-র খরচ কীভাবে চলে?'),
          [
            b(
              'The main types of university support are fellowships, teaching assistantships, research assistantships and administrative assistantships — working as a teaching or research assistant in exchange for a tuition waiver and/or a stipend is very common at PhD level. Understand the duties and the level of funding before accepting.',
              'University-র সহায়তার প্রধান ধরন: fellowship, teaching assistantship, research assistantship আর administrative assistantship — tuition waiver আর/অথবা stipend-এর বিনিময়ে teaching বা research assistant হিসেবে কাজ PhD level-এ খুবই প্রচলিত। গ্রহণের আগে দায়িত্ব আর funding-এর পরিমাণ বুঝে নিন।',
            ),
            b(
              'Self-funded: you must show funds for tuition and living expenses for your I-20. Stipend and tuition amounts are set by each university and are not verified here.',
              'নিজের খরচে: I-20-এর জন্য tuition আর থাকার খরচের টাকা দেখাতে হবে। Stipend আর tuition-এর অঙ্ক প্রতিটি university ঠিক করে, এখানে যাচাই হয়নি।',
            ),
          ],
          [US_EDUSA_GRAD_FUNDS, US_FUNDS],
          { status: 'partly-verified' },
        ),
        qa(
          'length',
          b('What if your PhD takes more than four years?', 'PhD চার বছরের বেশি লাগলে কী হবে?'),
          [b('Since 15 September 2026, F-1 admission is limited to the program length on your I-20, up to four years. If you need longer, your DSO updates your I-20 and you apply to USCIS for an extension of stay (Form I-539, fee and biometrics), or you leave and receive a new admission period on re-entry. Plan this with your DSO in advance.', '১৫ September ২০২৬ থেকে F-1-এর প্রবেশের অনুমতি I-20-এ লেখা program-এর সময়কাল পর্যন্ত, সর্বোচ্চ চার বছর। বেশি সময় লাগলে DSO আপনার I-20 হালনাগাদ করেন, আর USCIS-এ extension of stay-র আবেদন করতে হয় (Form I-539, fee আর biometrics), নয়তো দেশ ছেড়ে আবার ঢোকার সময় নতুন সময় পাওয়া যায়। আগেভাগে DSO-এর সঙ্গে পরিকল্পনা করুন।')],
          [US_DS_RULE, US_DS_FR],
        ),
      ],
    },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b('How do you apply for a PhD?', 'PhD-তে কীভাবে আবেদন করবেন?'),
          [b("Find programs and professors whose research fits yours, contact them early, and apply to each graduate school by its deadline — funding deadlines can be as early as 18 months before you start. After admission and a funding offer: I-20, SEVIS fee, DS-160 and the visa interview.", 'যে program আর professor-দের গবেষণা আপনার সঙ্গে মেলে, তাঁদের খুঁজে আগেভাগে যোগাযোগ করুন, আর প্রতিটি graduate school-এ তার শেষ তারিখের মধ্যে আবেদন করুন — funding-এর শেষ তারিখ শুরুর ১৮ মাস আগেও হতে পারে। ভর্তি আর funding-এর offer-এর পরে: I-20, SEVIS fee, DS-160 আর visa interview।')],
          [US_EDUSA_GRAD_FUNDS, US_VISA],
          { kind: 'guidance' },
        ),
      ],
    },
    ...commonTail('phd'),
  ],
};

// ------------------------------------------------------------------ the country

export const US_GUIDE: CountryGuide = {
  code: 'US',
  checkedAt: US_READ,
  sourcesPerSection: true,
  intro: b(
    "The United States has over 4,000 accredited colleges and universities offering bachelor's, master's and PhD degrees in English. Each university runs its own admission; after admission you receive a Form I-20 and apply for the F-1 student visa at the U.S. Embassy in Dhaka. Since 15 September 2026 F-1 students are admitted for a fixed period. This guide is built from the State Department, the U.S. Embassy in Dhaka, DHS, USCIS and university pages.",
    "United States-এ ৪,০০০-এর বেশি স্বীকৃত college আর university ইংরেজিতে bachelor's, master's আর PhD পড়ায়। প্রতিটি university নিজের ভর্তি চালায়; ভর্তির পরে Form I-20 পেয়ে ঢাকার U.S. Embassy-তে F-1 student visa-র আবেদন। ১৫ September ২০২৬ থেকে F-1 student-দের নির্দিষ্ট সময়ের জন্য প্রবেশের অনুমতি দেওয়া হয়। এই guide State Department, ঢাকার U.S. Embassy, DHS, USCIS আর university-র page থেকে তৈরি।",
  ),
  overview: [
    qa(
      'system',
      b('How does U.S. higher education work for international students?', 'International student-দের জন্য U.S.-এর উচ্চশিক্ষা কেমন?'),
      [
        b(
          "A bachelor's degree takes about four years; graduate programs (master's and doctoral) follow it. The academic year usually runs from September to May. There is no national application system: you apply to each university, which must be accredited and certified by SEVP to issue the I-20 you need for an F-1 visa.",
          "Bachelor's degree-তে প্রায় চার বছর লাগে; তারপর graduate program (master's আর doctoral)। শিক্ষাবর্ষ সাধারণত September থেকে May। কোনো জাতীয় আবেদন ব্যবস্থা নেই: প্রতিটি university-তে আবেদন করতে হয়, আর F-1 visa-র জন্য দরকারি I-20 দিতে university-কে accredited আর SEVP-স্বীকৃত হতে হয়।",
        ),
      ],
      [US_EDUSA_UG_APPLY, US_EMBASSY_EDUSA, US_VISA],
    ),
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [US_WORK, US_VISA, US_DS_RULE, US_EMBASSY_EDUSA, US_CPT],
      {
        kind: 'guidance',
        list: [
          b('Applying to an institution that is not accredited or not SEVP-certified.', 'Accredited নয় বা SEVP-স্বীকৃত নয় এমন প্রতিষ্ঠানে আবেদন।'),
          b('Working off campus without authorisation — your SEVIS record is terminated.', 'অনুমোদন ছাড়া campus-এর বাইরে কাজ — আপনার SEVIS record বাতিল হয়।'),
          b('Counting on on-campus jobs or aid to pay living costs.', 'থাকার খরচ চালাতে campus-এর চাকরি বা aid-এর উপর নির্ভর করা।'),
          b('Planning to change major or transfer in your first year (not allowed below graduate level; never at graduate level).', 'প্রথম বছরে major বদলানো বা transfer-এর পরিকল্পনা (graduate level-এর নিচে অনুমতি নেই; graduate level-এ কখনোই নয়)।'),
          b('Taking 12 months of full-time CPT, which removes OPT eligibility.', '১২ মাস full-time CPT নেওয়া, যাতে OPT-র যোগ্যতা থাকে না।'),
          b('Arriving more than 30 days before your program, or staying past your admit-until date.', 'Program শুরুর ৩০ দিনের বেশি আগে পৌঁছানো, বা admit-until তারিখের পরে থেকে যাওয়া।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in the United States from Bangladesh?", "Bangladesh থেকে United States-এ Bachelor's পড়তে কী কী লাগে?"), [b('SSC/HSC results and transcripts, English test scores (and SAT/ACT where required), essays and recommendations; then financial evidence, the I-20, the SEVIS fee and an F-1 visa. Each university sets its own requirements.', 'SSC/HSC-র ফল আর transcript, English test score (আর লাগলে SAT/ACT), essay আর সুপারিশপত্র; তারপর আর্থিক প্রমাণ, I-20, SEVIS fee আর F-1 visa। প্রতিটি university নিজের শর্ত ঠিক করে।')], [US_EMBASSY_EDUSA, US_EDUSA_UG_APPLY, US_VISA]),
    qa('hsc', b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"), [b('Yes, at many universities: for example UC San Diego lists the HSC for Bangladesh, Penn State asks for SSC and HSC results, and Texas State expects a B average (recalculated GPA of at least 2.74/4). Grades and tests are set by each university.', 'হ্যাঁ, অনেক university-তে: যেমন UC San Diego Bangladesh-এর জন্য HSC তালিকায় রেখেছে, Penn State SSC আর HSC-র ফল চায়, আর Texas State গড়ে B আশা করে (পুনর্গণিত GPA অন্তত 2.74/4)। Grade আর test প্রতিটি university ঠিক করে।')], [US_UCSD_INTL, US_PSU_BD, US_TXST_BD]),
    qa('cost', b('How much does it cost to study in the United States?', 'United States-এ পড়াশোনার খরচ কত?'), [b('There is no single figure. The U.S. Embassy in Dhaka gives yearly tuition of about $15,000 to over $60,000; living costs depend on the city and appear on your I-20. Official fees: F-1 visa application $185 and SEVIS fee $350 (no visa issuance fee for Bangladeshi citizens).', 'একক কোনো অঙ্ক নেই। ঢাকার U.S. Embassy-র হিসাবে বছরে tuition প্রায় $15,000 থেকে $60,000-এর বেশি; থাকার খরচ শহরের উপর নির্ভর করে আর I-20-তে লেখা থাকে। Official fee: F-1 visa application $185 আর SEVIS fee $350 (Bangladesh-এর নাগরিকদের visa issuance fee নেই)।')], [US_EMBASSY_EDUSA, US_FEES, US_SEVIS_FEE, US_RECIPROCITY_BD], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for the United States?', 'United States-এ IELTS কত লাগে?'), [b('The visa sets no score; each university and program does. Almost all universities ask Bangladeshi students for TOEFL, IELTS or PTE, and some programs also need the SAT, ACT, GRE or GMAT.', 'Visa-য় কোনো score ঠিক করা নেই; প্রতিটি university আর program ঠিক করে। প্রায় সব university Bangladesh-এর student-দের কাছে TOEFL, IELTS বা PTE চায়, আর কিছু program SAT, ACT, GRE বা GMAT-ও চায়।')], [US_EMBASSY_EDUSA]),
    qa('visa', b('What do you need for the F-1 student visa?', 'F-1 student visa-র জন্য কী কী লাগে?'), [b('Admission to an SEVP-certified school → Form I-20 → SEVIS fee ($350) → DS-160 and $185 fee → interview at the U.S. Embassy in Dhaka (generally required) → enter no more than 30 days before your program. The visa for Bangladeshi citizens is multiple-entry, valid up to 60 months, with no issuance fee.', 'SEVP-স্বীকৃত school-এ ভর্তি → Form I-20 → SEVIS fee ($350) → DS-160 আর $185 fee → ঢাকার U.S. Embassy-তে interview (সাধারণত বাধ্যতামূলক) → program শুরুর ৩০ দিনের বেশি আগে নয় এমন সময়ে প্রবেশ। Bangladesh-এর নাগরিকদের visa multiple-entry, সর্বোচ্চ ৬০ মাস মেয়াদি, issuance fee নেই।')], [US_VISA, US_SEVIS_FEE, US_FEES, US_RECIPROCITY_BD]),
    qa('work', b('Can you work while studying in the United States?', 'United States-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b('On campus up to 20 hours a week while school is in session. Off-campus work only after one full academic year and only with authorisation (CPT, OPT or economic hardship). Unauthorised work ends your status.', 'Class চলাকালীন campus-এর ভেতরে সপ্তাহে ২০ ঘণ্টা পর্যন্ত। Campus-এর বাইরে কাজ শুধু এক পূর্ণ শিক্ষাবর্ষ পরে আর শুধু অনুমোদন নিয়ে (CPT, OPT বা আর্থিক কষ্ট)। অননুমোদিত কাজে আপনার status শেষ হয়ে যায়।')], [US_WORK, US_CPT, US_OPT]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b("Yes, mostly at graduate level: assistantships (tuition waiver and/or stipend) are very common for PhDs, and Fulbright funds master's study for Bangladeshi professionals. Undergraduate aid is competitive and seldom covers more than tuition.", "হ্যাঁ, মূলত graduate level-এ: PhD-তে assistantship (tuition waiver আর/অথবা stipend) খুবই প্রচলিত, আর Fulbright Bangladesh-এর পেশাজীবীদের master's-এর খরচ দেয়। Undergraduate aid প্রতিযোগিতামূলক, আর খুব কমই tuition-এর বেশি দেয়।")], [US_EDUSA_GRAD_FUNDS, US_FULBRIGHT_BD, US_EMBASSY_EDUSA]),
    qa('after', b('What are the options to work in the United States after your studies?', 'পড়া শেষে United States-এ কাজের সুযোগ কী?'), [b('OPT: up to 12 months of work related to your major, plus a 24-month STEM OPT extension for eligible STEM degrees with an E-Verify employer. OPT is temporary; it does not promise permanent residence.', 'OPT: major-এর সঙ্গে সম্পর্কিত কাজে সর্বোচ্চ ১২ মাস, আর যোগ্য STEM degree-তে E-Verify নিয়োগকর্তার কাছে ২৪ মাসের STEM OPT extension। OPT অস্থায়ী; স্থায়ী বসবাসের নিশ্চয়তা দেয় না।')], [US_OPT]),
    qa('stay', b('What changed for F-1 students in 2026?', '২০২৬-এ F-1 student-দের জন্য কী বদলেছে?'), [b('Since 15 September 2026, students are admitted for the length of their I-20 program (up to four years) plus 30 days before and 30 days after; longer stays need an extension of stay. Changing major, level or school is restricted, especially in the first year and throughout graduate programs.', '১৫ September ২০২৬ থেকে student-রা I-20-এ লেখা program-এর সময়কাল (সর্বোচ্চ চার বছর) আর আগে-পরে ৩০ দিন করে থাকার অনুমতি পান; বেশি সময়ের জন্য extension of stay লাগে। Major, level বা school বদলানো সীমিত, বিশেষ করে প্রথম বছরে আর পুরো graduate program-এ।')], [US_DS_RULE, US_DS_FR]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('No national amount: enough for tuition and living expenses for your period of study, as calculated by your university — the amount is on your I-20. Bank statements, sponsor documents, aid or scholarship letters and employer salary letters are accepted.', 'জাতীয় কোনো অঙ্ক নেই: university-র হিসাব অনুযায়ী পড়ার সময়ের tuition আর থাকার খরচের মতো টাকা — অঙ্কটা I-20-তে লেখা থাকে। Bank statement, sponsor-এর document, aid বা scholarship-এর চিঠি আর নিয়োগকর্তার বেতনের চিঠি গ্রহণযোগ্য।')], [US_FUNDS]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before admission (university): passport, SSC/HSC or degree transcripts with translations, test scores, essays or statement of purpose, recommendations, and for graduate programs a CV. After admission (visa): financial evidence, I-20, SEVIS fee receipt, DS-160 confirmation, visa fee receipt and the interview. Scholarship documents are separate.', 'ভর্তির আগে (university): passport, SSC/HSC বা degree-র transcript অনুবাদসহ, test score, essay বা statement of purpose, সুপারিশপত্র, আর graduate program-এ CV। ভর্তির পরে (visa): আর্থিক প্রমাণ, I-20, SEVIS fee-র রসিদ, DS-160 confirmation, visa fee-র রসিদ আর interview। Scholarship-এর document আলাদা।')], [US_PSU_BD, US_VISA, US_FUNDS, US_FULBRIGHT_BD]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A bachelor's the university recognises (many describe a four-year Bangladeshi degree), English scores and the program's documents; funding is often through assistantships.", "University যে bachelor's স্বীকার করে (অনেকে Bangladesh-এর চার বছরের degree-র কথা বলে), English score আর program-এর document; funding প্রায়ই assistantship-এর মাধ্যমে।")], [US_GATECH_GRAD, US_SYRACUSE_GRAD, US_UNR_GRAD]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('A recognised degree, a research fit with a department, and usually funding through a fellowship or assistantship. A PhD longer than four years needs an extension of stay under the 2026 rule.', 'স্বীকৃত degree, department-এর সঙ্গে গবেষণার মিল, আর সাধারণত fellowship বা assistantship-এর funding। ২০২৬-এর নিয়মে চার বছরের বেশি PhD-র জন্য extension of stay লাগে।')], [US_EDUSA_GRAD_FUNDS, US_DS_RULE]),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Over 4,000 accredited institutions. Examples on each degree page — Georgia Institute of Technology, Pennsylvania State University, Syracuse University, Texas State University, University of California San Diego and University of Nevada, Reno — are listed alphabetically, not ordered by quality.', '৪,০০০-এর বেশি স্বীকৃত প্রতিষ্ঠান। প্রতিটি degree page-এ উদাহরণ — Georgia Institute of Technology, Pennsylvania State University, Syracuse University, Texas State University, University of California San Diego আর University of Nevada, Reno — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [US_EMBASSY_EDUSA]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: visa applicants appear in person for an interview at the U.S. Embassy in Dhaka; the F-1 visa for Bangladeshi citizens has no issuance fee and is multiple-entry for up to 60 months; free advising is available from EducationUSA at the American Center in Dhaka; Fulbright funds master\'s study for Bangladeshi citizens; universities such as Penn State ask for SSC and HSC with a line-by-line English translation. Other Bangladesh-specific requirements: not verified yet.', 'Bangladesh-এর জন্য যাচাই করা: visa-র আবেদনকারীরা ঢাকার U.S. Embassy-তে সশরীরে interview দেন; Bangladesh-এর নাগরিকদের F-1 visa-য় issuance fee নেই, আর এটা সর্বোচ্চ ৬০ মাসের multiple-entry; ঢাকার American Center-এ EducationUSA বিনামূল্যে পরামর্শ দেয়; Fulbright Bangladesh-এর নাগরিকদের master\'s-এর খরচ দেয়; Penn State-এর মতো university লাইন-বাই-লাইন ইংরেজি অনুবাদসহ SSC আর HSC চায়। অন্যান্য Bangladesh-নির্দিষ্ট শর্ত: এখনো যাচাই হয়নি।'),
    ], [US_EMBASSY_EDUSA, US_RECIPROCITY_BD, US_FULBRIGHT_BD, US_PSU_BD, US_VISA]),
  ],
  life: [
    qa('arrival', b('When can you arrive, and what happens then?', 'কখন পৌঁছাতে পারবেন, তারপর কী?'), [b('No more than 30 days before your program start date. You are admitted until a fixed date based on your I-20; keep your I-20 and passport valid and stay enrolled full time.', 'Program শুরুর ৩০ দিনের বেশি আগে নয়। আপনার I-20-এর ভিত্তিতে একটা নির্দিষ্ট তারিখ পর্যন্ত থাকার অনুমতি পাবেন; I-20 আর passport বৈধ রাখুন, আর full-time ভর্তি থাকুন।')], [US_VISA, US_DS_RULE]),
    qa('health', b('How does healthcare work?', 'চিকিৎসা ব্যবস্থা কেমন?'), [b('Not verified yet as a national rule for students: many universities require a student health plan. Check your university.', 'Student-দের জন্য জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: অনেক university student health plan বাধ্যতামূলক করে। আপনার university দেখুন।')], [US_VISA], { status: 'not-verified' }),
  ],
  documents: US_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'estimate', status: 'partly-verified', value: { min: 15000, max: 60000, unit: 'USD/year', text: b('About $15,000 to over $60,000 a year depending on the university (U.S. Embassy Dhaka); not split by public/private.', 'University অনুযায়ী বছরে প্রায় $15,000 থেকে $60,000-এর বেশি (U.S. Embassy ঢাকা); সরকারি/বেসরকারি আলাদা করা নয়।') }, source: US_EMBASSY_EDUSA },
    { id: 'funds-to-show', kind: 'fact', status: 'not-verified' },
    { id: 'living-cost', kind: 'estimate', status: 'not-verified' },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { max: 20, unit: 'hours/week', text: b('On campus up to 20 hours a week while school is in session; off campus only with authorisation after one academic year.', 'Class চলাকালীন campus-এ সপ্তাহে ২০ ঘণ্টা পর্যন্ত; campus-এর বাইরে শুধু এক শিক্ষাবর্ষ পরে অনুমোদন নিয়ে।') }, source: US_WORK },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { min: 12, max: 36, unit: 'months', text: b('OPT up to 12 months; plus a 24-month STEM OPT extension for eligible STEM degrees.', 'OPT সর্বোচ্চ ১২ মাস; যোগ্য STEM degree-তে আরও ২৪ মাসের STEM OPT extension।') }, source: US_OPT },
    { id: 'english-programs', kind: 'fact', status: 'verified', value: { unit: 'programs', text: b('Programs are taught in English; universities set the TOEFL/IELTS/PTE score.', 'Program ইংরেজিতে পড়ানো হয়; TOEFL/IELTS/PTE score university ঠিক করে।') }, source: US_EMBASSY_EDUSA },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 185, unit: 'USD', text: b('$185 visa application fee plus the $350 SEVIS fee; no issuance fee for Bangladeshi citizens.', '$185 visa application fee, সঙ্গে $350 SEVIS fee; Bangladesh-এর নাগরিকদের issuance fee নেই।') }, source: US_FEES },
  ],
};

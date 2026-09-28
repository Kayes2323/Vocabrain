import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  TR_EMB_DHAKA,
  TR_GOC_PERMITS,
  TR_MFA_VISA,
  TR_READ,
  TR_SIT_HEALTH,
  TR_SIT_HOUSING,
  TR_SIT_SYSTEM,
  TR_SIT_TRYOS,
  TR_SIT_TRYOS_FAQ,
  TR_SIT_VISA,
  TR_SIT_WORK,
  TR_TB_CRITERIA,
  TR_TB_FULLTIME,
} from './tr-sources';

/**
 * Turkey reading guide, researched on its own from Turkish official sources
 * (Council of Higher Education "Study in Türkiye", Türkiye Scholarships,
 * Ministry of Foreign Affairs, Presidency of Migration Management). Nothing
 * is taken from another country's guide. Tuition, living-cost and visa-fee
 * amounts could not be verified from an official page, so none is shown.
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
    confidence: sources.some((s) => /\.gov\.tr/.test(s.url ?? '') || s.sourceType === 'official-university') ? 'high' : 'medium',
    ...(o.list ? { list: o.list } : {}),
    ...(o.status ? { status: o.status } : {}),
    ...(o.kind ? { kind: o.kind } : {}),
    ...(o.discrepancy ? { discrepancy: o.discrepancy } : {}),
    ...(o.allDegrees ? { allDegrees: true } : {}),
  };
}

const CHECK_UNI = b(
  'Each Turkish university sets its own admission requirements; always check the official international admissions page of the university and program you apply to.',
  'প্রতিটি Turkish university নিজের ভর্তির শর্ত ঠিক করে; যে university আর program-এ আবেদন করবেন, তার official international admission page অবশ্যই দেখে নিন।',
);

// ------------------------------------------------------------------ shared answers

const visa = (id: string) =>
  qa(
    id,
    b('How do you get a student visa for Turkey?', 'Turkey-র student visa কীভাবে পাবেন?'),
    [
      b(
        'Step 1 — Admission: get the admission letter from the university. Study in Türkiye advises applying for the visa as soon as you receive it, because student visa procedures can take time.',
        'ধাপ ১ — ভর্তি: university থেকে admission letter নিন। Study in Türkiye পরামর্শ দেয়, letter পেলেই visa-র আবেদন করুন, কারণ student visa-র প্রক্রিয়ায় সময় লাগতে পারে।',
      ),
      b(
        'Step 2 — Education visa: study visas are not e-Visas; you obtain them from a Turkish mission. Make the pre-application and appointment through the Pre-Application System for Turkish Sticker Visa (visa.gov.tr); the Ministry recommends applying at least one month before travel.',
        'ধাপ ২ — Education visa: study visa e-Visa নয়; Turkey-র দূতাবাস থেকে নিতে হয়। Pre-Application System for Turkish Sticker Visa (visa.gov.tr)-এ pre-application আর appointment নিন; মন্ত্রণালয় ভ্রমণের অন্তত এক মাস আগে আবেদনের পরামর্শ দেয়।',
      ),
      b(
        'Step 3 — Residence permit: a visa allows at most 90 days of stay; to stay for your studies you apply for a student residence permit in Türkiye (see below).',
        'ধাপ ৩ — Residence permit: visa-তে সর্বোচ্চ ৯০ দিন থাকা যায়; পড়াশোনার জন্য থাকতে Turkey-তে গিয়ে student residence permit-এর আবেদন করতে হয় (নিচে দেখুন)।',
      ),
      b(
        'Rules that apply to every applicant: medical insurance valid for your stay; a passport valid at least 60 days beyond the visa’s duration of stay; visa fees are not refunded if the application is refused; under-18 applicants need written approval from both parents. A visa does not guarantee entry.',
        'সব আবেদনকারীর জন্য নিয়ম: থাকার পুরো সময়ের জন্য বৈধ medical insurance; visa-র থাকার মেয়াদের পরেও অন্তত ৬০ দিন বৈধ passport; আবেদন নাকচ হলে visa fee ফেরত হয় না; ১৮ বছরের কম হলে বাবা-মা দুজনের লিখিত অনুমতি লাগে। Visa থাকলেই প্রবেশ নিশ্চিত নয়।',
      ),
    ],
    [TR_SIT_VISA, TR_MFA_VISA],
    { allDegrees: true },
  );

const visaBd = (id: string) =>
  qa(
    id,
    b('What does the Embassy in Dhaka ask for, and how much is the fee?', 'ঢাকার Embassy কী চায়, fee কত?'),
    [
      b(
        'Not verified yet: we did not find an official Bangladesh-specific checklist, fee or processing time. Check the Embassy of the Republic of Türkiye in Dhaka and the visa pre-application system before you apply.',
        'এখনো যাচাই হয়নি: Bangladesh-এর জন্য আলাদা official checklist, fee বা processing time আমরা পাইনি। আবেদনের আগে ঢাকার Türkiye Embassy আর visa pre-application system দেখে নিন।',
      ),
    ],
    [TR_EMB_DHAKA, TR_MFA_VISA],
    { status: 'not-verified', allDegrees: true },
  );

const residence = (id: string) =>
  qa(
    id,
    b('How does the student residence permit work?', 'Student residence permit কীভাবে কাজ করে?'),
    [
      b(
        'Students of associate, bachelor’s, master’s and doctoral programs are issued a student residence permit. You apply online (e-ikamet) and — under a YÖK–Migration protocol in force since 29 November 2023 — submit the listed documents with the registration form to your university’s Student Affairs or International Student Office as soon as possible, without waiting for the appointment date.',
        'Associate, bachelor’s, master’s আর doctoral program-এর student-রা student residence permit পান। Online (e-ikamet) আবেদন করবেন, আর ২৯ November ২০২৩ থেকে চালু YÖK–Migration protocol অনুযায়ী তালিকার document আর registration form যত দ্রুত সম্ভব university-র Student Affairs বা International Student Office-এ জমা দেবেন — appointment-এর তারিখের অপেক্ষা না করে।',
      ),
      b(
        'Conditions: documents showing the purpose of your stay, your address in Türkiye, and not falling under the entry-ban grounds. The permit can be refused or cancelled if you stop studying or use it for another purpose. If you move to a university in another province, a new permit is issued.',
        'শর্ত: থাকার উদ্দেশ্যের document, Turkey-তে আপনার ঠিকানা, আর প্রবেশ-নিষেধের কোনো কারণে না পড়া। পড়া বন্ধ করলে বা অন্য কাজে ব্যবহার করলে permit বাতিল বা নাকচ হতে পারে। অন্য province-এর university-তে গেলে নতুন permit দেওয়া হয়।',
      ),
      b(
        'The Ministry of Foreign Affairs notes that a residence permit is cancelled if you stay outside Türkiye for more than 120 days in total in the last year.',
        'পররাষ্ট্র মন্ত্রণালয় জানায়, গত এক বছরে মোট ১২০ দিনের বেশি Turkey-র বাইরে থাকলে residence permit বাতিল হয়।',
      ),
    ],
    [TR_GOC_PERMITS, TR_SIT_VISA, TR_MFA_VISA],
    { allDegrees: true },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('Do you need health insurance?', 'স্বাস্থ্যবীমা লাগবে কি?'),
    [
      b(
        'Yes. International students must have health insurance during their official residence. Two options: a private policy for foreigners (limited cover, valid only at contracted hospitals), or the state General Health Insurance (GSS) of the Social Security Institution, which gives treatment in all state hospitals free of charge.',
        'হ্যাঁ। International student-দের পুরো বসবাসকালে স্বাস্থ্যবীমা থাকতে হবে। দুটি উপায়: বিদেশিদের জন্য private policy (সীমিত cover, শুধু চুক্তিবদ্ধ হাসপাতালে), অথবা Social Security Institution-এর সরকারি General Health Insurance (GSS), যাতে সব সরকারি হাসপাতালে বিনা খরচে চিকিৎসা হয়।',
      ),
      b(
        'For GSS you must apply within three months of university registration; if you miss that window you need private insurance for the residence permit. Insurance must be renewed every year.',
        'GSS-এর জন্য university-তে নিবন্ধনের তিন মাসের মধ্যে আবেদন করতে হবে; এই সময় পেরোলে residence permit-এর জন্য private insurance লাগবে। বীমা প্রতি বছর নবায়ন করতে হয়।',
      ),
    ],
    [TR_SIT_HEALTH, TR_GOC_PERMITS],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying?', 'পড়ার সময় কাজ করা যায় কি?'),
    [
      b(
        'Only with a work permit: the student residence permit does not include the right to work. Work permits are issued by the General Directorate of International Labour (Ministry of Labour and Social Security). For associate and bachelor’s students the right to work starts after the first year; master’s and PhD students may apply from the start.',
        'শুধু work permit নিয়ে: student residence permit-এ কাজের অধিকার নেই। Work permit দেয় General Directorate of International Labour (শ্রম ও সামাজিক নিরাপত্তা মন্ত্রণালয়)। Associate আর bachelor’s student-দের কাজের অধিকার শুরু হয় প্রথম বছরের পরে; master’s আর PhD student-রা শুরু থেকেই আবেদন করতে পারেন।',
      ),
      b(
        'A compulsory or elective internship that is part of your program does not need a work permit. A weekly hour limit is not verified here.',
        'Program-এর অংশ হিসেবে বাধ্যতামূলক বা ঐচ্ছিক internship-এ work permit লাগে না। সপ্তাহে কত ঘণ্টা কাজ করা যাবে, তা এখানে যাচাই হয়নি।',
      ),
    ],
    [TR_GOC_PERMITS, TR_SIT_WORK],
    { status: 'partly-verified', allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Turkey after graduating?', 'পড়া শেষে Turkey-তে থাকা যায় কি?'),
    [
      b(
        'Yes, for a limited time: if you apply within six months of graduating from a higher education program in Türkiye, you can get a short-term residence permit once, for at most one year. To work, you need a work permit.',
        'হ্যাঁ, সীমিত সময়ের জন্য: Turkey-র উচ্চশিক্ষা program শেষ করার ছয় মাসের মধ্যে আবেদন করলে একবার, সর্বোচ্চ এক বছরের short-term residence permit পাওয়া যায়। কাজ করতে work permit লাগবে।',
      ),
      b(
        'Half of the time spent on a student residence permit counts toward the eight years of continuous residence needed for a long-term residence permit.',
        'Long-term residence permit-এর জন্য দরকারি একটানা আট বছরের হিসাবে student residence permit-এর সময়ের অর্ধেক গণ্য হয়।',
      ),
    ],
    [TR_GOC_PERMITS],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'Not verified yet: the official pages we read do not state a fixed amount a student must show for the visa or the student residence permit. Ask the Embassy in Dhaka what financial proof it expects.',
        'এখনো যাচাই হয়নি: আমরা যে official page পড়েছি, তাতে visa বা student residence permit-এর জন্য নির্দিষ্ট কত টাকা দেখাতে হবে তা নেই। ঢাকার Embassy কী আর্থিক প্রমাণ চায়, জেনে নিন।',
      ),
    ],
    [TR_GOC_PERMITS, TR_MFA_VISA],
    { status: 'not-verified', allDegrees: true },
  );

const tuition = (id: string) =>
  qa(
    id,
    b('How much is tuition?', 'Tuition কত?'),
    [
      b(
        'Public universities: tuition fees are set and announced by Presidential Decree, according to the type and length of study. Non-profit foundation (private) universities: fees are set by each university’s Board of Trustees. Fees are paid every semester before course registration.',
        'Public university: tuition Presidential Decree দিয়ে ঠিক ও ঘোষণা করা হয়, পড়ার ধরন আর মেয়াদ অনুযায়ী। অলাভজনক foundation (private) university: fee ঠিক করে প্রতিটি university-র Board of Trustees। প্রতি semester-এ course registration-এর আগে fee দিতে হয়।',
      ),
      b(
        'A share of admitted students get full or partial tuition waivers or other scholarships at both kinds of university. We could not verify a current fee figure from an official page, so none is shown — check your university’s fee page.',
        'দুই ধরনের university-তেই ভর্তি হওয়া student-দের একটা অংশ পুরো বা আংশিক tuition মওকুফ বা অন্য scholarship পান। কোনো official page থেকে বর্তমান fee-র অঙ্ক যাচাই করতে পারিনি, তাই কোনো অঙ্ক দেখানো হয়নি — আপনার university-র fee page দেখুন।',
      ),
    ],
    [TR_SIT_SYSTEM],
    { status: 'partly-verified' },
  );

const living = (id: string) =>
  qa(
    id,
    b('How much are living costs and housing?', 'থাকা-খাওয়া আর বাসার খরচ কত?'),
    [
      b(
        'Not verified yet: we found no official average living cost. Housing options are university dormitories on campus, state dormitories run by KYK (Higher Education Credit and Hostels Institution), private dormitories, or a rented flat. Dormitory fees vary by university and room; private dormitories cost more.',
        'এখনো যাচাই হয়নি: গড় থাকা-খাওয়ার খরচের কোনো official হিসাব পাইনি। থাকার উপায়: campus-এর university dormitory, KYK (Higher Education Credit and Hostels Institution) পরিচালিত সরকারি dormitory, private dormitory, বা ভাড়া বাসা। Dormitory-র fee university আর room অনুযায়ী আলাদা; private dormitory-তে খরচ বেশি।',
      ),
      b(
        'Almost all state and university dormitories are separate for male and female students.',
        'প্রায় সব সরকারি ও university dormitory ছেলে আর মেয়েদের জন্য আলাদা।',
      ),
    ],
    [TR_SIT_HOUSING],
    { status: 'not-verified', kind: 'estimate', allDegrees: true },
  );

const tbScholarship = (id: string, level: 'bachelors' | 'masters' | 'phd') => {
  const stipend = { bachelors: ['undergraduate: TRY 6,500 a month', 'undergraduate: মাসে TRY 6,500'], masters: ["master's: TRY 9,500 a month", "master's: মাসে TRY 9,500"], phd: ['PhD: TRY 13,000 a month', 'PhD: মাসে TRY 13,000'] }[level];
  const age = { bachelors: ['under 21', '২১ বছরের কম'], masters: ['under 30', '৩০ বছরের কম'], phd: ['under 35', '৩৫ বছরের কম'] }[level];
  const grade = level === 'bachelors' ? ['70%', '৭০%'] : ['75%', '৭৫%'];
  return qa(
    id,
    b('What is the Türkiye Scholarship (Türkiye Bursları)?', 'Türkiye Scholarship (Türkiye Bursları) কী?'),
    [
      b(
        `The government scholarship open to citizens of all countries. It covers university and department placement, a monthly stipend (${stipend[0]}), tuition, a one-year Turkish language course, accommodation, health insurance and a flight ticket at the start and end of studies.`,
        `সব দেশের নাগরিকদের জন্য খোলা সরকারি scholarship। এতে university ও department-এ placement, মাসিক ভাতা (${stipend[1]}), tuition, এক বছরের Turkish ভাষা course, থাকার ব্যবস্থা, স্বাস্থ্যবীমা আর পড়ার শুরু ও শেষে বিমান টিকিট থাকে।`,
      ),
      b(
        `Criteria for this level: ${age[0]}, and at least ${grade[0]} academic achievement${level === 'bachelors' ? ' (90% for medicine, dentistry and pharmacy)' : '; no graduate scholarships in health sciences'}. Apply online through TBBS between 10 January and 20 February every year.`,
        `এই level-এর শর্ত: ${age[1]}, আর অন্তত ${grade[1]} academic ফল${level === 'bachelors' ? ' (medicine, dentistry ও pharmacy-তে ৯০%)' : '; health sciences-এ graduate scholarship নেই'}। প্রতি বছর ১০ January থেকে ২০ February-এর মধ্যে TBBS-এ online আবেদন।`,
      ),
    ],
    [TR_TB_FULLTIME, TR_TB_CRITERIA],
  );
};

// ------------------------------------------------------------------ documents

export const TR_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Your identity and travel document; the visa is placed in it.', 'আপনার পরিচয় ও ভ্রমণের document; visa এতেই লাগানো হয়।'),
    who: b('Turkish mission (visa) and the border.', 'Turkey-র দূতাবাস (visa) আর সীমান্ত কর্তৃপক্ষ।'),
    when: b('For the visa pre-application and at entry.', 'Visa pre-application-এ আর প্রবেশের সময়।'),
    where: b('Embassy of the Republic of Türkiye in Dhaka.', 'ঢাকার Türkiye Embassy।'),
    prepare: b('Valid at least 60 days beyond the duration of stay of your visa.', 'Visa-র থাকার মেয়াদের পরেও অন্তত ৬০ দিন বৈধ।'),
    groups: ['general', 'visa'],
    sources: [TR_MFA_VISA],
  },
  {
    id: 'academic',
    name: b('School / university certificates and transcripts', 'স্কুল / university-র সনদ আর transcript'),
    why: b("Shows you completed the education the program needs: secondary education equivalent to a Turkish high school for a bachelor's; a degree for graduate study.", "দেখায় যে program-এর দরকারি পড়াশোনা শেষ করেছেন: bachelor's-এর জন্য Turkey-র high school-এর সমমানের secondary education; graduate-এর জন্য degree।"),
    who: b('The university you apply to.', 'যে university-তে আবেদন করবেন।'),
    when: b('With the application.', 'আবেদনের সময়।'),
    where: b('The university’s international application system.', 'University-র international application system।'),
    prepare: b('Format and any attestation are set by the university.', 'Format আর কোনো সত্যায়ন লাগবে কিনা, university ঠিক করে।'),
    groups: ['general', 'program'],
    sources: [TR_SIT_SYSTEM],
  },
  {
    id: 'exam-score',
    name: b('Admission exam result (TR-YÖS, YÖS, SAT or another accepted exam)', 'ভর্তি পরীক্ষার ফল (TR-YÖS, YÖS, SAT বা অন্য গ্রহণযোগ্য পরীক্ষা)'),
    why: b("Many universities admit international bachelor's students on an exam result they choose.", "অনেক university নিজের বাছাই করা পরীক্ষার ফলের ভিত্তিতে international bachelor's student নেয়।"),
    who: b('The university, on its official website.', 'University, তার official website-এ।'),
    when: b('Before the university’s application deadline.', 'University-র আবেদনের শেষ তারিখের আগে।'),
    where: b('TR-YÖS: ÖSYM (twice a year, in Türkiye and abroad).', 'TR-YÖS: ÖSYM (বছরে দুবার, Turkey-তে আর বিদেশে)।'),
    prepare: b('Check which exams your university lists before you register for one.', 'কোনো পরীক্ষায় নিবন্ধনের আগে আপনার university কোন পরীক্ষা নেয় তা দেখুন।'),
    groups: ['program'],
    degrees: ['bachelors'],
    sources: [TR_SIT_TRYOS, TR_SIT_TRYOS_FAQ],
  },
  {
    id: 'language',
    name: b('Language certificate (English or Turkish)', 'ভাষার সনদ (English বা Turkish)'),
    why: b('Shows you can follow a program taught in English or Turkish.', 'দেখায় যে English বা Turkish-এ পড়ানো program বুঝতে পারবেন।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('With the application (or at registration).', 'আবেদনের সময় (বা নিবন্ধনের সময়)।'),
    where: b('As the university says.', 'University যেভাবে বলে।'),
    prepare: b('Not verified yet: accepted tests and scores are set by each university.', 'এখনো যাচাই হয়নি: কোন test আর কত score, তা প্রতিটি university ঠিক করে।'),
    groups: ['program'],
    status: 'not-verified',
    sources: [TR_SIT_SYSTEM],
  },
  {
    id: 'program-extras',
    name: b('Graduate application documents (CV, statement of purpose, references, research proposal)', 'Graduate আবেদনের document (CV, statement of purpose, reference, research proposal)'),
    why: b('Graduate programs set their own admission requirements.', 'Graduate program নিজের ভর্তির শর্ত ঠিক করে।'),
    who: b('The university’s graduate school.', 'University-র graduate school।'),
    when: b('With the application.', 'আবেদনের সময়।'),
    where: b('The university’s application system.', 'University-র application system।'),
    prepare: b('Not verified yet for any specific program: read the program’s call.', 'কোনো নির্দিষ্ট program-এর জন্য এখনো যাচাই হয়নি: program-এর ঘোষণা পড়ুন।'),
    groups: ['program'],
    degrees: ['masters', 'phd'],
    status: 'not-verified',
    sources: [TR_SIT_SYSTEM],
  },
  {
    id: 'admission-letter',
    name: b('Admission letter', 'Admission letter (ভর্তির চিঠি)'),
    why: b('Needed for the education visa; apply for the visa as soon as you receive it.', 'Education visa-র জন্য লাগে; পেলেই visa-র আবেদন করুন।'),
    who: b('Issued by the university; needed by the Turkish mission.', 'University দেয়; Turkey-র দূতাবাস চায়।'),
    when: b('After admission, before the visa.', 'ভর্তির পরে, visa-র আগে।'),
    where: b('The university.', 'University থেকে।'),
    prepare: b('Keep the original and copies.', 'মূল কপি আর ফটোকপি রাখুন।'),
    groups: ['general', 'visa'],
    sources: [TR_SIT_VISA],
  },
  {
    id: 'visa-application',
    name: b('Education visa pre-application and appointment', 'Education visa-র pre-application আর appointment'),
    why: b('Study visas are issued by Turkish missions, not as e-Visas.', 'Study visa দেয় Turkey-র দূতাবাস, e-Visa হিসেবে নয়।'),
    who: b('Ministry of Foreign Affairs / Embassy of Türkiye in Dhaka.', 'পররাষ্ট্র মন্ত্রণালয় / ঢাকার Türkiye Embassy।'),
    when: b('At least one month before travel (Ministry advice).', 'ভ্রমণের অন্তত এক মাস আগে (মন্ত্রণালয়ের পরামর্শ)।'),
    where: b('visa.gov.tr pre-application, then the Embassy.', 'visa.gov.tr-এ pre-application, তারপর Embassy।'),
    prepare: b('The Bangladesh-specific checklist and fee are not verified here — ask the Embassy.', 'Bangladesh-এর জন্য আলাদা checklist আর fee এখানে যাচাই হয়নি — Embassy-কে জিজ্ঞেস করুন।'),
    groups: ['visa', 'bangladesh'],
    status: 'partly-verified',
    sources: [TR_MFA_VISA, TR_EMB_DHAKA],
  },
  {
    id: 'parent-consent',
    name: b('Written approval of both parents (if under 18)', 'বাবা-মা দুজনের লিখিত অনুমতি (১৮ বছরের কম হলে)'),
    why: b('Required for any visa applicant under 18.', '১৮ বছরের কম যেকোনো visa আবেদনকারীর জন্য লাগে।'),
    who: b('Turkish mission.', 'Turkey-র দূতাবাস।'),
    when: b('At the visa application.', 'Visa আবেদনের সময়।'),
    where: b('Embassy of Türkiye in Dhaka.', 'ঢাকার Türkiye Embassy।'),
    prepare: b('If parents are divorced or one has died, documents proving custody or the death.', 'বাবা-মা বিবাহবিচ্ছিন্ন হলে বা একজন মারা গেলে, অভিভাবকত্ব বা মৃত্যুর প্রমাণ।'),
    groups: ['visa', 'bangladesh'],
    degrees: ['bachelors'],
    sources: [TR_MFA_VISA],
  },
  {
    id: 'insurance',
    name: b('Health insurance', 'স্বাস্থ্যবীমা'),
    why: b('Required for the visa and for the residence permit.', 'Visa আর residence permit — দুটোর জন্যই লাগে।'),
    who: b('Turkish mission (visa) and Migration Management (permit).', 'Turkey-র দূতাবাস (visa) আর Migration Management (permit)।'),
    when: b('Before travel; GSS within three months of university registration.', 'ভ্রমণের আগে; GSS-এর জন্য university-তে নিবন্ধনের তিন মাসের মধ্যে।'),
    where: b('A private insurer, or the Social Security Institution (GSS).', 'Private বীমা কোম্পানি, অথবা Social Security Institution (GSS)।'),
    prepare: b('Renew it every year.', 'প্রতি বছর নবায়ন করুন।'),
    groups: ['visa', 'arrival'],
    sources: [TR_MFA_VISA, TR_SIT_HEALTH, TR_GOC_PERMITS],
  },
  {
    id: 'residence-permit',
    name: b('Student residence permit (e-ikamet)', 'Student residence permit (e-ikamet, থাকার অনুমতি)'),
    why: b('A visa covers at most 90 days; the permit covers your studies.', 'Visa-তে সর্বোচ্চ ৯০ দিন; পড়ার পুরো সময়ের জন্য permit লাগে।'),
    who: b('Presidency of Migration Management.', 'Turkey-র অভিবাসন দপ্তর (Presidency of Migration Management)।'),
    when: b('After arrival — apply online, then hand the documents to your university’s office right away.', 'পৌঁছানোর পর — online আবেদন করে দ্রুত document university-র office-এ জমা দিন।'),
    where: b('e-ikamet online; documents to the Student Affairs or International Student Office.', 'e-ikamet online; document Student Affairs বা International Student Office-এ।'),
    prepare: b('Documents on the purpose of stay and your address in Türkiye, with the registration form.', 'থাকার উদ্দেশ্য আর Turkey-র ঠিকানার document, registration form-সহ।'),
    groups: ['arrival'],
    sources: [TR_GOC_PERMITS, TR_SIT_VISA],
  },
  {
    id: 'work-permit',
    name: b('Work permit (only if you will work)', 'Work permit (কাজ করলে তবেই)'),
    why: b('The student residence permit does not allow work on its own.', 'শুধু student residence permit দিয়ে কাজ করা যায় না।'),
    who: b('General Directorate of International Labour.', 'শ্রম মন্ত্রণালয়ের General Directorate of International Labour।'),
    when: b("Bachelor's students: after the first year.", "Bachelor's student: প্রথম বছরের পরে।"),
    where: b('Ministry of Labour and Social Security.', 'শ্রম ও সামাজিক নিরাপত্তা মন্ত্রণালয়।'),
    prepare: b('Program internships do not need one.', 'Program-এর internship-এ লাগে না।'),
    groups: ['arrival'],
    sources: [TR_GOC_PERMITS, TR_SIT_WORK],
  },
];

// ------------------------------------------------------------------ costs (never converted; unverified amounts not shown)

const COSTS: GuideCost[] = [
  { id: 'tuition', label: b('Tuition', 'Tuition'), value: b('Not verified — set by Presidential Decree (public) or the Board of Trustees (foundation)', 'যাচাই হয়নি — Presidential Decree (public) বা Board of Trustees (foundation) ঠিক করে'), status: 'not-verified', source: TR_SIT_SYSTEM },
  { id: 'living', label: b('Living cost and housing', 'থাকা-খাওয়া আর বাসা'), value: b('Not verified — varies by city and dormitory', 'যাচাই হয়নি — শহর আর dormitory অনুযায়ী আলাদা'), status: 'not-verified', source: TR_SIT_HOUSING },
  { id: 'insurance', label: b('Health insurance', 'স্বাস্থ্যবীমা'), value: b('Not verified — private policy or GSS', 'যাচাই হয়নি — private policy বা GSS'), status: 'not-verified', source: TR_SIT_HEALTH },
  { id: 'visa-fee', label: b('Visa and residence permit fees', 'Visa আর residence permit-এর fee'), value: b('Not verified (visa fees are not refunded if refused)', 'যাচাই হয়নি (নাকচ হলে visa fee ফেরত হয় না)'), status: 'not-verified', source: TR_MFA_VISA },
];
const costs = { official: [] as GuideCost[], estimates: COSTS };

const commonTail = (level: 'bachelors' | 'masters' | 'phd') => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [...(level === 'phd' ? [] : [tuition('tuition')]), living('living'), { embed: 'costs' as const }, funds('funds')] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  { id: 'universities', title: b('Universities', 'University'), items: [qa('types', b('Which universities are there?', 'কোন ধরনের university আছে?'), [b('Public universities and non-profit foundation universities, all under the Council of Higher Education (YÖK). The examples below are listed alphabetically, not ordered by quality; check each university’s own page for programs and requirements.', 'Public university আর অলাভজনক foundation university — সব Council of Higher Education (YÖK)-এর অধীনে। নিচের উদাহরণগুলো বর্ণানুক্রমে সাজানো, মান অনুযায়ী নয়; program আর শর্তের জন্য প্রতিটি university-র নিজের page দেখুন।')], [TR_SIT_SYSTEM]), { embed: 'universities' as const }] },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work')] },
  { id: 'visa', title: b('Visa, residence and insurance', 'Visa, residence আর বীমা'), items: [visa('visa'), visaBd('visa-bd'), residence('residence'), insurance('insurance')] },
  { id: 'after', title: b('After graduation', 'পড়া শেষে'), items: [after('after')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Usually 4 years · after secondary school (HSC)', 'সাধারণত ৪ বছর · secondary school (HSC)-এর পরে'),
  intro: b(
    "A Turkish bachelor's takes four years (240 ECTS); dentistry, veterinary medicine and pharmacy take five and medicine six. International students apply directly to the university, which makes the selection — often using an exam such as TR-YÖS or SAT — and then get an education visa and a student residence permit.",
    "Turkey-র bachelor's চার বছরের (240 ECTS); dentistry, veterinary medicine আর pharmacy পাঁচ বছর, medicine ছয় বছর। International student-রা সরাসরি university-তে আবেদন করেন, university-ই বাছাই করে — প্রায়ই TR-YÖS বা SAT-এর মতো পরীক্ষা দিয়ে — তারপর education visa আর student residence permit।",
  ),
  costs,
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'who',
          b("Who can study for a Bachelor's in Turkey?", "Turkey-তে কারা Bachelor's পড়তে পারেন?"),
          [
            b(
              'International students who completed secondary education at a high school or similar institution whose education is equivalent to a Turkish high school. You apply directly to the university of your choice, and the university makes the selection.',
              'যারা এমন high school বা সমমানের প্রতিষ্ঠানে secondary education শেষ করেছেন, যার পড়াশোনা Turkey-র high school-এর সমমান। পছন্দের university-তে সরাসরি আবেদন করবেন, আর university-ই বাছাই করে।',
            ),
          ],
          [TR_SIT_SYSTEM],
        ),
        qa(
          'hsc',
          b('Can you apply with HSC?', 'HSC দিয়ে কি আবেদন করা যায়?'),
          [
            b(
              'Generally yes, if the university accepts your HSC as equivalent to a Turkish high school diploma (Turkish compulsory schooling is 12 years, like SSC + HSC). The equivalence decision and any extra requirement are the university’s.',
              'সাধারণত হ্যাঁ, যদি university আপনার HSC-কে Turkey-র high school diploma-র সমমান ধরে (Turkey-তে বাধ্যতামূলক স্কুল ১২ বছর, SSC + HSC-র মতো)। সমমানের সিদ্ধান্ত আর বাড়তি শর্ত university-র।',
            ),
            CHECK_UNI,
          ],
          [TR_SIT_SYSTEM],
          { status: 'partly-verified' },
        ),
        qa(
          'gpa',
          b('What GPA is needed?', 'কত GPA লাগে?'),
          [
            b(
              'Not verified yet: there is no national minimum for admission in the sources we read; each university decides. (For the Türkiye Scholarship the minimum is 70%, or 90% for medicine, dentistry and pharmacy.)',
              'এখনো যাচাই হয়নি: আমরা যে source পড়েছি, তাতে ভর্তির জাতীয় কোনো minimum নেই; প্রতিটি university ঠিক করে। (Türkiye Scholarship-এর জন্য minimum ৭০%, medicine, dentistry ও pharmacy-তে ৯০%।)',
            ),
          ],
          [TR_SIT_SYSTEM, TR_TB_CRITERIA],
          { status: 'not-verified' },
        ),
      ],
    },
    {
      id: 'exams',
      title: b('Entrance exams', 'ভর্তি পরীক্ষা'),
      items: [
        qa(
          'exam',
          b('Is there an entrance exam? What is TR-YÖS?', 'ভর্তি পরীক্ষা আছে কি? TR-YÖS কী?'),
          [
            b(
              'TR-YÖS (International Student Admission Exam) is held twice a year by ÖSYM (the Measuring, Selection and Placement Center) in Turkish, German, Arabic, French, English and Russian, at centres in Türkiye and abroad. YÖS is a separate exam that some foundation universities run themselves.',
              'TR-YÖS (International Student Admission Exam) বছরে দুবার নেয় ÖSYM (Measuring, Selection and Placement Center) — Turkish, German, Arabic, French, English আর Russian ভাষায়, Turkey-তে আর বিদেশের কেন্দ্রে। YÖS আলাদা পরীক্ষা, যা কিছু foundation university নিজেরা নেয়।',
            ),
            b(
              'Which exam you need depends on the university: its official website lists the exams it accepts (for example TR-YÖS, YÖS, Abitur, SAT or IB).',
              'কোন পরীক্ষা লাগবে তা university-র উপর নির্ভর করে: তার official website-এ কোন পরীক্ষা নেয় তা লেখা থাকে (যেমন TR-YÖS, YÖS, Abitur, SAT বা IB)।',
            ),
          ],
          [TR_SIT_TRYOS, TR_SIT_TRYOS_FAQ],
          {
            discrepancy: b(
              'Study in Türkiye says in one place that "Turkish public and foundation universities require TR-YÖS scores", and in its FAQ that universities accept the exams they determine (TR-YÖS, YÖS, Abitur, SAT, IB). Follow your university’s own list.',
              'Study in Türkiye এক জায়গায় বলে "Turkey-র public ও foundation university TR-YÖS score চায়", আর তার FAQ-তে বলে university নিজের ঠিক করা পরীক্ষা নেয় (TR-YÖS, YÖS, Abitur, SAT, IB)। আপনার university-র নিজের তালিকা মেনে চলুন।',
            ),
          },
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language', 'ভাষা'),
      items: [
        qa(
          'english',
          b('Can you study in English? Do you need IELTS?', 'English-এ পড়া যায় কি? IELTS লাগবে?'),
          [
            b(
              'Programs are taught in Turkish or English depending on the university. Which English test and score are accepted — IELTS, TOEFL or the university’s own exam — is not verified here; each university sets its own requirements.',
              'University অনুযায়ী program Turkish বা English-এ পড়ানো হয়। কোন English test আর কত score নেওয়া হয় — IELTS, TOEFL বা university-র নিজের পরীক্ষা — তা এখানে যাচাই হয়নি; প্রতিটি university নিজের শর্ত ঠিক করে।',
            ),
            CHECK_UNI,
          ],
          [TR_SIT_SYSTEM],
          { status: 'partly-verified' },
        ),
        qa(
          'turkish',
          b('Do you need Turkish?', 'Turkish ভাষা লাগবে কি?'),
          [
            b(
              'For Turkish-taught programs, the university sets the required Turkish level; it is not verified here. Türkiye Scholarship holders get a one-year Turkish language course.',
              'Turkish-এ পড়ানো program-এ কোন level লাগবে তা university ঠিক করে; এখানে যাচাই হয়নি। Türkiye Scholarship পেলে এক বছরের Turkish ভাষা course দেওয়া হয়।',
            ),
          ],
          [TR_SIT_SYSTEM, TR_TB_FULLTIME],
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
          b('How does the application process work?', 'আবেদনের প্রক্রিয়া কেমন?'),
          [
            b(
              'Choose a university and program; check which exam and language proof it asks for; apply directly to the university; after admission, apply for the education visa at once; on arrival, register at the university, apply for the student residence permit and arrange health insurance.',
              'University আর program বাছুন; কোন পরীক্ষা আর ভাষার প্রমাণ চায় দেখুন; সরাসরি university-তে আবেদন করুন; ভর্তির পরই education visa-র আবেদন; পৌঁছে university-তে নিবন্ধন, student residence permit-এর আবেদন আর স্বাস্থ্যবীমা।',
            ),
          ],
          [TR_SIT_SYSTEM, TR_SIT_VISA],
        ),
        qa(
          'when',
          b('When are the deadlines?', 'শেষ তারিখ কখন?'),
          [
            b(
              'University deadlines are set by each university. The Türkiye Scholarship application period is 10 January – 20 February every year; TR-YÖS runs twice a year.',
              'University-র শেষ তারিখ প্রতিটি university ঠিক করে। Türkiye Scholarship-এর আবেদনের সময় প্রতি বছর ১০ January – ২০ February; TR-YÖS হয় বছরে দুবার।',
            ),
          ],
          [TR_SIT_SYSTEM, TR_TB_FULLTIME, TR_SIT_TRYOS],
          { status: 'partly-verified' },
        ),
      ],
    },
    { id: 'scholarships', title: b('Scholarships', 'Scholarship'), items: [tbScholarship('scholarships', 'bachelors'), { embed: 'scholarships' }] },
    ...commonTail('bachelors'),
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b("1–2 years · after a bachelor's", "১–২ বছর · bachelor's-এর পরে"),
  intro: b(
    "Turkish master's programs come in two kinds: with a thesis (two years, at least 120 ECTS) or without a thesis (one to one and a half years, at least 90 credits and a term project). You apply directly to the university, which sets its own admission requirements.",
    "Turkey-র master's দুই ধরনের: thesis-সহ (দুই বছর, অন্তত 120 ECTS) অথবা thesis ছাড়া (এক থেকে দেড় বছর, অন্তত 90 credit আর একটি term project)। সরাসরি university-তে আবেদন করবেন, university নিজের ভর্তির শর্ত ঠিক করে।",
  ),
  costs,
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("Who can study for a Master's in Turkey?", "Turkey-তে কারা Master's পড়তে পারেন?"),
          [
            b(
              "Holders of a bachelor's degree. International graduate applicants apply directly to the universities, which set their own admission requirements (background, grades, language, documents).",
              "Bachelor's degree আছে এমন যে কেউ। International graduate আবেদনকারীরা সরাসরি university-তে আবেদন করেন, আর university নিজের শর্ত (আগের পড়া, grade, ভাষা, document) ঠিক করে।",
            ),
            CHECK_UNI,
          ],
          [TR_SIT_SYSTEM],
        ),
        qa(
          'thesis',
          b('Thesis or non-thesis — what is the difference?', 'Thesis আর non-thesis-এর পার্থক্য কী?'),
          [
            b(
              'With thesis: two years, courses of at least 120 ECTS followed by a thesis. Without thesis: one to one and a half years, at least 90 credits of graduate courses and a term project.',
              'Thesis-সহ: দুই বছর, অন্তত 120 ECTS-এর course, তারপর thesis। Thesis ছাড়া: এক থেকে দেড় বছর, অন্তত 90 credit-এর graduate course আর একটি term project।',
            ),
          ],
          [TR_SIT_SYSTEM],
        ),
        qa(
          'cgpa',
          b('What CGPA is needed?', 'কত CGPA লাগে?'),
          [
            b(
              'Not verified yet: no national minimum in the sources we read; each university decides. (For the Türkiye Scholarship the minimum for graduate programs is 75%.)',
              'এখনো যাচাই হয়নি: আমরা যে source পড়েছি, তাতে জাতীয় কোনো minimum নেই; প্রতিটি university ঠিক করে। (Türkiye Scholarship-এ graduate program-এর minimum ৭৫%।)',
            ),
          ],
          [TR_SIT_SYSTEM, TR_TB_CRITERIA],
          { status: 'not-verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language', 'ভাষা'),
      items: [
        qa(
          'english',
          b('English, Turkish, IELTS — what do you need?', 'English, Turkish, IELTS — কী লাগবে?'),
          [
            b(
              'It depends on the language of the program and the university. Accepted tests and scores are not verified here. Türkiye Scholarship holders get a one-year Turkish course.',
              'Program-এর ভাষা আর university-র উপর নির্ভর করে। কোন test আর score নেওয়া হয়, তা এখানে যাচাই হয়নি। Türkiye Scholarship পেলে এক বছরের Turkish course দেওয়া হয়।',
            ),
            CHECK_UNI,
          ],
          [TR_SIT_SYSTEM, TR_TB_FULLTIME],
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
          b('How and when do you apply?', 'কীভাবে আর কখন আবেদন করবেন?'),
          [
            b(
              "Apply directly to the university by its own deadline, with the documents it lists. For the Türkiye Scholarship (under 30 for master's), apply on TBBS between 10 January and 20 February; you can choose only among the universities and departments the system offers you.",
              "University-র নিজের শেষ তারিখের মধ্যে তার তালিকার document নিয়ে সরাসরি আবেদন করুন। Türkiye Scholarship-এর জন্য (master's-এ ৩০ বছরের কম) ১০ January থেকে ২০ February-এর মধ্যে TBBS-এ আবেদন; system যে university ও department দেখায়, শুধু সেখান থেকেই বাছতে পারবেন।",
            ),
          ],
          [TR_SIT_SYSTEM, TR_TB_FULLTIME],
        ),
      ],
    },
    {
      id: 'scholarships',
      title: b('Scholarships and assistantships', 'Scholarship আর assistantship'),
      items: [
        tbScholarship('scholarships', 'masters'),
        qa(
          'assistantship',
          b('Can graduate students fund their studies by working?', 'Graduate student-রা কি কাজ করে পড়ার খরচ চালাতে পারেন?'),
          [b("Study in Türkiye says master's and PhD students can work as researchers in scientific projects related to their work, and some private universities admit graduate students on full scholarships with assistantships. Universities also offer full or partial tuition waivers to a share of students.", "Study in Türkiye জানায়, master's আর PhD student-রা নিজের কাজের সঙ্গে সম্পর্কিত বৈজ্ঞানিক project-এ গবেষক হিসেবে কাজ করতে পারেন, আর কিছু private university পুরো scholarship ও assistantship দিয়ে graduate student নেয়। University-গুলো কিছু student-কে পুরো বা আংশিক tuition মওকুফও দেয়।")],
          [TR_SIT_WORK, TR_SIT_SYSTEM],
        ),
        { embed: 'scholarships' },
      ],
    },
    ...commonTail('masters'),
  ],
};

// ------------------------------------------------------------------ PhD

const PHD: DegreeGuide = {
  level: 'phd',
  card: b("Usually 8 semesters · after a master's", "সাধারণত ৮ semester · master's-এর পরে"),
  intro: b(
    'A Turkish PhD is usually an eight-semester program of courses (180–240 ECTS), a proficiency exam, a dissertation proposal, and a dissertation defended orally before a committee. You apply directly to the university; Türkiye Scholarships funds PhDs for applicants under 35.',
    'Turkey-র PhD সাধারণত আট semester-এর: course (180–240 ECTS), একটি proficiency exam, dissertation proposal, আর committee-র সামনে মৌখিকভাবে dissertation defense। সরাসরি university-তে আবেদন করবেন; ৩৫ বছরের কম আবেদনকারীদের PhD-তে Türkiye Scholarships দেয়।',
  ),
  costs,
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'master',
          b('Who can do a PhD in Turkey?', 'Turkey-তে কারা PhD করতে পারেন?'),
          [
            b(
              "Graduate applicants apply directly to the university, which sets its own requirements. Whether a master's is required, or a bachelor's is enough for some programs, is not verified here for any specific program.",
              "Graduate আবেদনকারীরা সরাসরি university-তে আবেদন করেন, আর university নিজের শর্ত ঠিক করে। Master's লাগবে নাকি কিছু program-এ bachelor's-ই যথেষ্ট, তা কোনো নির্দিষ্ট program-এর জন্য এখানে যাচাই হয়নি।",
            ),
            CHECK_UNI,
          ],
          [TR_SIT_SYSTEM],
          { status: 'partly-verified' },
        ),
        qa(
          'structure',
          b('How is a Turkish PhD structured?', 'Turkey-র PhD কীভাবে সাজানো?'),
          [
            b(
              'Courses (180–240 ECTS), then a proficiency exam; after passing, a dissertation proposal, the dissertation and its oral defence before an examining committee. Usually eight semesters. (Proficiency in Art is the doctorate-level equivalent in the arts.)',
              'Course (180–240 ECTS), তারপর proficiency exam; পাস করলে dissertation proposal, dissertation আর examining committee-র সামনে মৌখিক defense। সাধারণত আট semester। (শিল্পকলায় doctorate-সমমানের degree হলো Proficiency in Art।)',
            ),
          ],
          [TR_SIT_SYSTEM],
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language', 'ভাষা'),
      items: [
        qa(
          'english',
          b('Which language requirements apply?', 'ভাষার কী শর্ত আছে?'),
          [b('Set by each university and program; not verified here. Türkiye Scholarship holders get a one-year Turkish course.', 'প্রতিটি university ও program ঠিক করে; এখানে যাচাই হয়নি। Türkiye Scholarship পেলে এক বছরের Turkish course দেওয়া হয়।')],
          [TR_SIT_SYSTEM, TR_TB_FULLTIME],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'funding',
      title: b('Funding', 'Funding'),
      items: [
        tbScholarship('scholarships', 'phd'),
        qa(
          'research',
          b('Are there research or assistant positions?', 'গবেষণা বা assistant-এর সুযোগ আছে কি?'),
          [b('Yes, according to Study in Türkiye: graduate students can work as researchers in scientific projects related to their studies, and some private universities offer assistantships with full scholarships. Amounts and conditions are set by each project or university and are not verified here.', 'হ্যাঁ, Study in Türkiye অনুযায়ী: graduate student-রা নিজের পড়ার সঙ্গে সম্পর্কিত বৈজ্ঞানিক project-এ গবেষক হিসেবে কাজ করতে পারেন, আর কিছু private university পুরো scholarship-সহ assistantship দেয়। অঙ্ক আর শর্ত প্রতিটি project বা university ঠিক করে, এখানে যাচাই হয়নি।')],
          [TR_SIT_WORK],
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
          b('How do you apply?', 'কীভাবে আবেদন করবেন?'),
          [b('Directly to the university’s graduate school by its deadline, with the documents it lists (which may include a research proposal). For the Türkiye Scholarship, apply on TBBS between 10 January and 20 February.', 'University-র graduate school-এ তার শেষ তারিখের মধ্যে, তালিকার document নিয়ে সরাসরি আবেদন (research proposal-ও লাগতে পারে)। Türkiye Scholarship-এর জন্য ১০ January থেকে ২০ February-এর মধ্যে TBBS-এ আবেদন।')],
          [TR_SIT_SYSTEM, TR_TB_FULLTIME],
        ),
      ],
    },
    ...commonTail('phd'),
  ],
};

// ------------------------------------------------------------------ the country

export const TR_GUIDE: CountryGuide = {
  code: 'TR',
  checkedAt: TR_READ,
  sourcesPerSection: true,
  intro: b(
    'In Turkey you apply directly to the university, which selects its own international students; Türkiye Scholarships offers a government scholarship at every level; and after an education visa you live on a student residence permit. This guide is built from Turkish official sources — tuition and living-cost figures could not be verified, so none is shown.',
    'Turkey-তে সরাসরি university-তে আবেদন করতে হয়, university নিজেই international student বাছাই করে; প্রতিটি level-এ Türkiye Scholarships-এর সরকারি scholarship আছে; আর education visa-র পরে student residence permit নিয়ে থাকতে হয়। এই guide Turkey-র official source থেকে তৈরি — tuition আর থাকা-খাওয়ার অঙ্ক যাচাই করা যায়নি, তাই কোনো অঙ্ক দেখানো হয়নি।',
  ),
  overview: [
    qa(
      'why',
      b('Why do international students consider Turkey?', 'International student-রা কেন Turkey বিবেচনা করেন?'),
      [b('Factually: universities admit international students directly, the government Türkiye Scholarship covers tuition, accommodation, insurance, a stipend and a Turkish course, programs are taught in Turkish or English, and graduates can get a short-term residence permit for up to a year.', 'তথ্য অনুযায়ী: university সরাসরি international student নেয়, সরকারি Türkiye Scholarship-এ tuition, থাকা, বীমা, ভাতা আর Turkish course থাকে, program Turkish বা English-এ পড়ানো হয়, আর degree শেষে এক বছর পর্যন্ত short-term residence permit পাওয়া যায়।')],
      [TR_SIT_SYSTEM, TR_TB_FULLTIME, TR_GOC_PERMITS],
    ),
    qa(
      'system',
      b('How does the higher education system work?', 'উচ্চশিক্ষা ব্যবস্থা কেমন?'),
      [b("All higher education institutions are under the Council of Higher Education (YÖK) and follow the Bologna three-cycle system: associate (2 years), bachelor's (4 years, 240 ECTS; 5–6 for dentistry, veterinary medicine, pharmacy and medicine), master's (thesis or non-thesis) and PhD. There are public universities and non-profit foundation universities.", "সব উচ্চশিক্ষা প্রতিষ্ঠান Council of Higher Education (YÖK)-এর অধীনে, Bologna three-cycle পদ্ধতিতে: associate (২ বছর), bachelor's (৪ বছর, 240 ECTS; dentistry, veterinary, pharmacy আর medicine-এ ৫–৬), master's (thesis বা non-thesis) আর PhD। Public university আর অলাভজনক foundation university আছে।")],
      [TR_SIT_SYSTEM],
    ),
    qa(
      'fields',
      b('Which fields can you study?', 'কোন বিষয়ে পড়া যায়?'),
      [b("Türkiye Scholarships lists bachelor's programs in engineering, social sciences, health sciences and basic sciences, and graduate programs in social sciences, humanities, natural sciences and engineering (not health sciences at graduate level). Universities offer more; which fields are most chosen by international students is not verified here.", "Türkiye Scholarships-এর তালিকায় bachelor's-এ engineering, social sciences, health sciences আর basic sciences, আর graduate-এ social sciences, humanities, natural sciences আর engineering (graduate level-এ health sciences নয়)। University-তে আরও বিষয় আছে; international student-রা কোন বিষয় সবচেয়ে বেশি বাছেন, তা এখানে যাচাই হয়নি।")],
      [TR_TB_FULLTIME],
      { status: 'partly-verified' },
    ),
    qa(
      'mistakes',
      b('Which mistakes do applicants often make?', 'আবেদনকারীরা কোন ভুলগুলো প্রায়ই করেন?'),
      [b('Points the official sources warn about:', 'Official source যেসব বিষয়ে সতর্ক করে:')],
      [TR_MFA_VISA, TR_GOC_PERMITS, TR_SIT_HEALTH, TR_SIT_WORK, TR_SIT_VISA],
      {
        kind: 'guidance',
        list: [
          b('Applying for the visa late — apply as soon as you have the admission letter, at least a month before travel.', 'দেরিতে visa-র আবেদন — admission letter পেলেই, ভ্রমণের অন্তত এক মাস আগে আবেদন করুন।'),
          b('Staying on the visa past 90 days instead of applying for the student residence permit.', 'Student residence permit-এর আবেদন না করে visa-তে ৯০ দিনের বেশি থাকা।'),
          b('Missing the three-month window to apply for GSS health insurance.', 'GSS স্বাস্থ্যবীমার আবেদনের তিন মাসের সময়সীমা পেরিয়ে যাওয়া।'),
          b('Working without a work permit — the student permit does not include work.', 'Work permit ছাড়া কাজ — student permit-এ কাজের অনুমতি নেই।'),
          b('Staying outside Türkiye for more than 120 days in a year, which cancels the residence permit.', 'এক বছরে ১২০ দিনের বেশি Turkey-র বাইরে থাকা, এতে residence permit বাতিল হয়।'),
          b('A passport that is not valid 60 days beyond the visa’s stay.', 'Visa-র মেয়াদের পরে ৬০ দিন বৈধ নয় এমন passport।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('hsc', b("Can you apply for a Bachelor's with HSC?", "HSC দিয়ে কি Bachelor's-এ আবেদন করা যায়?"), [b('Generally yes, if the university accepts it as equivalent to a Turkish high school diploma; you apply directly to the university, which selects its students.', 'সাধারণত হ্যাঁ, যদি university একে Turkey-র high school diploma-র সমমান ধরে; সরাসরি university-তে আবেদন করবেন, university-ই বাছাই করে।')], [TR_SIT_SYSTEM], { status: 'partly-verified' }),
    qa('exam', b('Do you need TR-YÖS or SAT?', 'TR-YÖS বা SAT লাগবে কি?'), [b("For many bachelor's programs you need an exam the university accepts — TR-YÖS (by ÖSYM, twice a year), YÖS, SAT, Abitur or IB. Official pages differ on whether TR-YÖS is always required, so follow your university's list.", "অনেক bachelor's program-এ university যে পরীক্ষা নেয় তার ফল লাগে — TR-YÖS (ÖSYM, বছরে দুবার), YÖS, SAT, Abitur বা IB। TR-YÖS সবসময় লাগবে কিনা, তা নিয়ে official page-গুলো আলাদা কথা বলে; তাই আপনার university-র তালিকা মেনে চলুন।")], [TR_SIT_TRYOS, TR_SIT_TRYOS_FAQ]),
    qa('ielts', b('Do you need IELTS?', 'IELTS লাগবে কি?'), [b('For English-taught programs you need proof of English that the university accepts; the accepted tests and scores are not verified here.', 'English-এ পড়ানো program-এ university যেটা মানে এমন English-এর প্রমাণ লাগে; কোন test আর score, তা এখানে যাচাই হয়নি।')], [TR_SIT_SYSTEM], { status: 'partly-verified' }),
    qa('cost', b('How much does it cost to study in Turkey?', 'Turkey-তে পড়ার খরচ কত?'), [b('Not verified yet: public-university tuition is set by Presidential Decree and foundation-university tuition by each Board of Trustees, but we could not verify current figures or an official living cost. Check your university’s fee page.', 'এখনো যাচাই হয়নি: public university-র tuition Presidential Decree আর foundation university-র tuition প্রতিটি Board of Trustees ঠিক করে, কিন্তু বর্তমান অঙ্ক বা official থাকা-খাওয়ার খরচ যাচাই করতে পারিনি। আপনার university-র fee page দেখুন।')], [TR_SIT_SYSTEM, TR_SIT_HOUSING], { status: 'not-verified' }),
    qa('scholarships', b('Which scholarships are there?', 'কী কী scholarship আছে?'), [b("Türkiye Scholarships (government, all levels): tuition, accommodation, health insurance, a one-year Turkish course, flights and a monthly stipend — TRY 6,500 (bachelor's), 9,500 (master's), 13,000 (PhD). Age limits 21 / 30 / 35; apply 10 January – 20 February. Universities also give full or partial tuition waivers.", "Türkiye Scholarships (সরকারি, সব level): tuition, থাকা, স্বাস্থ্যবীমা, এক বছরের Turkish course, বিমান টিকিট আর মাসিক ভাতা — TRY 6,500 (bachelor's), 9,500 (master's), 13,000 (PhD)। বয়সসীমা ২১ / ৩০ / ৩৫; আবেদন ১০ January – ২০ February। University-গুলোও পুরো বা আংশিক tuition মওকুফ দেয়।")], [TR_TB_FULLTIME, TR_TB_CRITERIA, TR_SIT_SYSTEM]),
    qa('visa', b('How do you get the student visa?', 'Student visa কীভাবে পাবেন?'), [b('After the admission letter, make a pre-application on visa.gov.tr and apply at the Embassy of Türkiye in Dhaka for an education visa, at least a month before travel. You need medical insurance and a passport valid 60 days beyond the visa’s stay. Bangladesh-specific documents and fee are not verified here.', 'Admission letter-এর পরে visa.gov.tr-এ pre-application করে ঢাকার Türkiye Embassy-তে education visa-র আবেদন, ভ্রমণের অন্তত এক মাস আগে। Medical insurance আর visa-র মেয়াদের পরে ৬০ দিন বৈধ passport লাগবে। Bangladesh-এর আলাদা document আর fee এখানে যাচাই হয়নি।')], [TR_SIT_VISA, TR_MFA_VISA], { status: 'partly-verified' }),
    qa('residence', b('What happens after you arrive?', 'পৌঁছানোর পর কী করতে হয়?'), [b('Apply for the student residence permit online (e-ikamet) and hand the documents to your university’s international or student affairs office right away; arrange health insurance (GSS within three months of registration, or private).', 'Online (e-ikamet)-এ student residence permit-এর আবেদন করে দ্রুত document university-র international বা student affairs office-এ দিন; স্বাস্থ্যবীমা নিন (নিবন্ধনের তিন মাসের মধ্যে GSS, নয়তো private)।')], [TR_SIT_VISA, TR_GOC_PERMITS, TR_SIT_HEALTH]),
    qa('work', b('Can you work part-time?', 'Part-time কাজ করা যায় কি?'), [b("Only with a work permit from the Ministry of Labour; bachelor's students can work only after their first year. Program internships need no permit.", "শুধু শ্রম মন্ত্রণালয়ের work permit নিয়ে; bachelor's student-রা প্রথম বছরের পরেই কেবল কাজ করতে পারেন। Program-এর internship-এ permit লাগে না।")], [TR_GOC_PERMITS, TR_SIT_WORK]),
    qa('after', b('Can you stay after graduating?', 'পড়া শেষে থাকা যায় কি?'), [b('Apply within six months of graduating and you can get a short-term residence permit once, for up to one year. Working needs a work permit.', 'Degree শেষের ছয় মাসের মধ্যে আবেদন করলে একবার, সর্বোচ্চ এক বছরের short-term residence permit পাওয়া যায়। কাজের জন্য work permit লাগে।')], [TR_GOC_PERMITS]),
    qa('funds', b('How much money must you show?', 'কত টাকা দেখাতে হয়?'), [b('Not verified yet: the official pages we read give no fixed amount for students. Ask the Embassy in Dhaka.', 'এখনো যাচাই হয়নি: আমরা যে official page পড়েছি, তাতে student-দের জন্য নির্দিষ্ট অঙ্ক নেই। ঢাকার Embassy-কে জিজ্ঞেস করুন।')], [TR_GOC_PERMITS, TR_MFA_VISA], { status: 'not-verified' }),
    qa('housing', b('Where do students live?', 'Student-রা কোথায় থাকেন?'), [b('University dormitories, KYK state dormitories, private dormitories or a rented flat; state and university dormitories are almost all single-sex. Fees vary and are not verified here.', 'University dormitory, KYK-র সরকারি dormitory, private dormitory বা ভাড়া বাসা; সরকারি ও university dormitory প্রায় সব ছেলে-মেয়ে আলাদা। Fee আলাদা আলাদা, এখানে যাচাই হয়নি।')], [TR_SIT_HOUSING], { status: 'partly-verified' }),
    qa('bachelors', b("What do you need for a Bachelor's?", "Bachelor's-এ কী লাগে?"), [b('Secondary education equivalent to a Turkish high school, the university’s admission (often an exam such as TR-YÖS or SAT), language proof, then an education visa and a residence permit.', 'Turkey-র high school-এর সমমানের secondary education, university-র ভর্তি (প্রায়ই TR-YÖS বা SAT-এর মতো পরীক্ষা), ভাষার প্রমাণ, তারপর education visa আর residence permit।')], [TR_SIT_SYSTEM, TR_SIT_TRYOS_FAQ]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A bachelor's degree and the university's own requirements; programs are with thesis (2 years) or without (1–1.5 years).", "Bachelor's degree আর university-র নিজের শর্ত; program thesis-সহ (২ বছর) বা thesis ছাড়া (১–১.৫ বছর)।")], [TR_SIT_SYSTEM]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('A successful application to the university’s graduate school; the PhD is usually eight semesters with courses, a proficiency exam, a proposal and a dissertation defence.', 'University-র graduate school-এ সফল আবেদন; PhD সাধারণত আট semester — course, proficiency exam, proposal আর dissertation defense।')], [TR_SIT_SYSTEM]),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Public and non-profit foundation universities under YÖK. Examples on each degree page (Ankara University, Boğaziçi University, Hacettepe University, Istanbul Technical University, Middle East Technical University) are listed alphabetically, not ordered by quality.', 'YÖK-এর অধীনে public আর অলাভজনক foundation university। প্রতিটি degree page-এ উদাহরণ (Ankara University, Boğaziçi University, Hacettepe University, Istanbul Technical University, Middle East Technical University) বর্ণানুক্রমে দেওয়া, মান অনুযায়ী সাজানো নয়।')], [TR_SIT_SYSTEM]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Türkiye Scholarships is open to citizens of all countries, including Bangladesh. The education visa is applied for through the Embassy of the Republic of Türkiye in Dhaka after the online pre-application. A Bangladesh-specific checklist, fee, processing time and financial requirement were not found on an official page, so they are marked not verified.', 'Türkiye Scholarships Bangladesh-সহ সব দেশের নাগরিকদের জন্য খোলা। Online pre-application-এর পরে ঢাকার Türkiye Embassy-র মাধ্যমে education visa-র আবেদন করতে হয়। Bangladesh-এর আলাদা checklist, fee, processing time আর আর্থিক শর্ত কোনো official page-এ পাওয়া যায়নি, তাই "যাচাই হয়নি" চিহ্নিত।'),
    ], [TR_TB_CRITERIA, TR_EMB_DHAKA, TR_MFA_VISA], { status: 'partly-verified' }),
  ],
  life: [
    qa('health', b('How does healthcare work?', 'চিকিৎসা ব্যবস্থা কেমন?'), [b('Every university has a health centre (often called MEDİKO) for basic checks. With GSS, treatment in state hospitals is free and prescriptions need a small contribution. The ambulance number is 112.', 'প্রতিটি university-র একটি health centre আছে (প্রায়ই MEDİKO নামে), সাধারণ পরীক্ষার জন্য। GSS থাকলে সরকারি হাসপাতালে চিকিৎসা বিনা খরচে, ওষুধে সামান্য অংশ দিতে হয়। Ambulance নম্বর ১১২।')], [TR_SIT_HEALTH]),
    qa('housing', b('What are the housing options?', 'থাকার কী কী উপায় আছে?'), [b('University dormitories, KYK state dormitories, private dormitories (higher fees) or a rented apartment, often shared with friends near campus. Dormitory fees vary by university and room.', 'University dormitory, KYK-র সরকারি dormitory, private dormitory (fee বেশি) বা ভাড়া apartment, প্রায়ই campus-এর কাছে বন্ধুদের সঙ্গে ভাগ করে। Dormitory-র fee university আর room অনুযায়ী আলাদা।')], [TR_SIT_HOUSING], { status: 'partly-verified' }),
  ],
  documents: TR_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'fact', status: 'not-verified' },
    { id: 'funds-to-show', kind: 'fact', status: 'not-verified' },
    { id: 'living-cost', kind: 'estimate', status: 'not-verified' },
    { id: 'work-during-study', kind: 'fact', status: 'partly-verified', value: { unit: 'permit', text: b("Only with a work permit; bachelor's students after the first year. Hour limit not verified.", "শুধু work permit নিয়ে; bachelor's student-রা প্রথম বছরের পরে। ঘণ্টার সীমা যাচাই হয়নি।") }, source: TR_GOC_PERMITS },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { max: 12, unit: 'months', text: b('A short-term residence permit once, up to one year, if you apply within six months of graduating.', 'Degree শেষের ছয় মাসের মধ্যে আবেদন করলে একবার, সর্বোচ্চ এক বছরের short-term residence permit।') }, source: TR_GOC_PERMITS },
    { id: 'english-programs', kind: 'fact', status: 'partly-verified', value: { unit: 'programs', text: b('Programs in Turkish or English depending on the university; count not verified.', 'University অনুযায়ী Turkish বা English-এ program; সংখ্যা যাচাই হয়নি।') }, source: TR_SIT_SYSTEM },
    { id: 'visa-fee', kind: 'fact', status: 'not-verified' },
  ],
};

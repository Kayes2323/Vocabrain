import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  CN_BJ_RP_WORK,
  CN_BJ_VISA,
  CN_CAMPUSCHINA,
  CN_EMB_CSC,
  CN_EMB_CSC_2023,
  CN_EMB_VISA,
  CN_READ,
  CN_TSINGHUA_ELIG,
  CN_ZJU_MA,
  CN_ZJU_PHD,
  CN_ZJU_UG,
} from './cn-sources';

/**
 * China reading guide, researched on its own from official Chinese sources
 * (the Chinese Embassy in Bangladesh, Beijing municipal government pages that
 * quote national exit-entry law, and university pages). Nothing is taken from
 * another country's guide. Amounts are shown in the currency the source uses
 * (CNY or USD) and never converted.
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
  'Requirements are not the same at every Chinese university: each university sets its own age limits, language rules, fees and deadlines. The examples here are from Zhejiang University and Tsinghua University — always check the official page of the university you apply to.',
  'China-র সব university-তে শর্ত এক নয়: প্রতিটি university নিজের বয়সসীমা, ভাষার নিয়ম, fee আর শেষ তারিখ ঠিক করে। এখানের উদাহরণ Zhejiang University আর Tsinghua University-র — যে university-তে আবেদন করবেন, তার official page অবশ্যই দেখে নিন।',
);

// ------------------------------------------------------------------ shared answers

const visa = (id: string) =>
  qa(
    id,
    b('What do you need for the Chinese student visa (X1)?', 'China-র student visa (X1)-র জন্য কী কী লাগে?'),
    [
      b(
        'For study longer than 180 days you need an X1 visa (X2 is for study of up to 180 days). For university students the Chinese Embassy in Bangladesh asks for the Confirmation Form for Study in China (Form JW201 or JW202) and the original admission letter. Scholarship holders give proof of the scholarship; self-funded applicants give a bank statement showing at least USD 2,500 for each year of study.',
        '১৮০ দিনের বেশি পড়ার জন্য X1 visa লাগে (X2 সর্বোচ্চ ১৮০ দিনের পড়ার জন্য)। University student-দের কাছে ঢাকার Chinese Embassy চায় Confirmation Form for Study in China (Form JW201 বা JW202) আর ভর্তির চিঠির মূল কপি। Scholarship থাকলে তার প্রমাণ; নিজের খরচে পড়লে প্রতি বছরের পড়ার জন্য অন্তত USD 2,500 দেখানো bank statement।',
      ),
      b(
        'In Bangladesh you fill in the application online at the Chinese Visa Application Service Center (visaforchina.cn) and upload documents. A preliminary review usually comes within one working day; you may be asked to attend an in-person interview at the Embassy. After approval you (or a representative) submit the passport at the Visa Center, give fingerprints if required and pay the fee — no appointment needed. Regular processing takes about 4 working days, express 3.',
        'Bangladesh-এ Chinese Visa Application Service Center-এর website-এ (visaforchina.cn) online আবেদন পূরণ করে document upload করতে হয়। প্রাথমিক পর্যালোচনার ফল সাধারণত এক কর্মদিবসে আসে; Embassy-তে সশরীরে interview-তে ডাকা হতে পারে। অনুমোদনের পরে আপনি (বা প্রতিনিধি) Visa Center-এ passport জমা দেন, লাগলে আঙুলের ছাপ দেন আর fee দেন — appointment লাগে না। সাধারণ process-এ প্রায় ৪ কর্মদিবস, express-এ ৩।',
      ),
      b(
        'The Embassy has not authorised any agency as an exclusive visa service provider, and warns applicants to ignore rumours about inflated fees. The visa fee amount is not verified here.',
        'Embassy কোনো agency-কে একমাত্র visa সেবাদাতা হিসেবে অনুমোদন দেয়নি, আর বাড়তি fee-র গুজব উপেক্ষা করতে বলে। Visa fee-র অঙ্ক এখানে যাচাই হয়নি।',
      ),
    ],
    [CN_EMB_VISA, CN_BJ_VISA],
    { allDegrees: true },
  );

const residence = (id: string) =>
  qa(
    id,
    b('What happens after you arrive — the residence permit and medical check?', 'পৌঁছানোর পরে কী — residence permit আর স্বাস্থ্য পরীক্ষা?'),
    [
      b(
        'An X1 visa holder must obtain a residence permit from the local Exit-Entry Administration within 30 days of arriving in China. Beijing\'s official guidance says anyone aged 18–70 applying for a residence permit valid for more than one year must submit the Verification Certificate of Medical Examination Records issued by a Chinese entry-exit health and quarantine authority.',
        'X1 visa থাকলে China-তে পৌঁছানোর ৩০ দিনের মধ্যে স্থানীয় Exit-Entry Administration থেকে residence permit নিতে হয়। Beijing-এর official নির্দেশনা অনুযায়ী ১৮–৭০ বছর বয়সী যে কেউ এক বছরের বেশি মেয়াদের residence permit চাইলে China-র entry-exit health and quarantine কর্তৃপক্ষের দেওয়া Verification Certificate of Medical Examination Records জমা দিতে হয়।',
      ),
      b(
        'Universities also require comprehensive medical insurance bought in mainland China for registration — Zhejiang University states this is a Ministry of Education regulation.',
        'Registration-এর জন্য university China-র মূল ভূখণ্ডে কেনা comprehensive medical insurance-ও চায় — Zhejiang University জানায় এটা Ministry of Education-এর নিয়ম।',
      ),
    ],
    [CN_BJ_VISA, CN_BJ_RP_WORK, CN_ZJU_MA],
    { allDegrees: true, status: 'partly-verified' },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in China?', 'China-তে পড়ার পাশাপাশি কাজ করা যায়?'),
    [
      b(
        'Only with permission. Under Article 22 of China\'s Regulations on Administration of the Entry and Exit of Foreigners, a student may do off-campus work-study or an internship only after the university approves it and the Exit-Entry Administration adds the location and duration to the residence permit. Without that annotation, off-campus work is not allowed.',
        'শুধু অনুমতি নিয়ে। China-র বিদেশিদের প্রবেশ-প্রস্থান প্রশাসন বিধিমালার ২২ নম্বর ধারা অনুযায়ী, university অনুমোদন দিলে আর Exit-Entry Administration residence permit-এ কাজের জায়গা আর সময়কাল যোগ করলে তবেই student campus-এর বাইরে work-study বা internship করতে পারেন। এই উল্লেখ ছাড়া campus-এর বাইরে কাজ করা যায় না।',
      ),
      b('Hour limits for such work are not verified here — check with your university\'s international student office.', 'এমন কাজের ঘণ্টার সীমা এখানে যাচাই হয়নি — university-র international student office-এর কাছে জেনে নিন।'),
    ],
    [CN_BJ_RP_WORK],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay and work in China after your studies?', 'পড়া শেষে China-তে থাকা বা কাজ করা যায় কি?'),
    [b('Not verified yet: a study residence permit does not itself give work rights, and the official rules for switching to a work permit after graduation were not read for this guide. Check with the Exit-Entry Administration and your university.', 'এখনো যাচাই হয়নি: পড়ার residence permit নিজে কাজের অধিকার দেয় না, আর পড়া শেষে work permit-এ যাওয়ার official নিয়ম এই guide-এর জন্য পড়া হয়নি। Exit-Entry Administration আর আপনার university-র কাছে জেনে নিন।')],
    [CN_BJ_RP_WORK],
    { status: 'not-verified', allDegrees: true },
  );

const costs = (id: string) =>
  qa(
    id,
    b('How much does it cost to study in China?', 'China-তে পড়াশোনার খরচ কত?'),
    [
      b(
        'Not verified yet as a national figure: tuition is set by each university and program and confirmed in the official admission notice (Zhejiang University refers applicants to its program catalogue). The visa requirement for self-funded students is a bank statement showing at least USD 2,500 a year — that is a visa minimum, not an estimate of real costs.',
        'এখনো জাতীয় অঙ্ক হিসেবে যাচাই হয়নি: tuition প্রতিটি university আর program ঠিক করে, আর official admission notice-এ নিশ্চিত করা হয় (Zhejiang University আবেদনকারীদের program catalogue দেখতে বলে)। নিজের খরচে পড়লে visa-র শর্ত হলো বছরে অন্তত USD 2,500 দেখানো bank statement — এটা visa-র minimum, আসল খরচের হিসাব নয়।',
      ),
    ],
    [CN_ZJU_UG, CN_EMB_VISA],
    { status: 'not-verified', kind: 'estimate', allDegrees: true },
  );

const csc = (id: string) =>
  qa(
    id,
    b('What is the Chinese Government Scholarship (CSC)?', 'Chinese Government Scholarship (CSC) কী?'),
    [
      b(
        'The Chinese Embassy in Bangladesh invites Bangladeshi students to apply for the Chinese Government Scholarship (CSC Type A) for a bachelor\'s, master\'s or doctoral degree or a one-year Chinese language program. It covers full tuition, on-campus accommodation, comprehensive medical insurance, a monthly living allowance of about CNY 2,500–3,500 depending on the level, and a round-trip international airfare.',
        'ঢাকার Chinese Embassy Bangladesh-এর student-দের bachelor\'s, master\'s বা doctoral degree অথবা এক বছরের Chinese ভাষা program-এর জন্য Chinese Government Scholarship (CSC Type A)-এ আবেদন করতে আমন্ত্রণ জানায়। এতে থাকে পূর্ণ tuition, campus-এ থাকা, comprehensive medical insurance, level অনুযায়ী মাসে প্রায় CNY 2,500–3,500 থাকার ভাতা, আর আসা-যাওয়ার আন্তর্জাতিক বিমানভাড়া।',
      ),
      b(
        'You apply online at campuschina.org. The round announced on 19 December 2025 closed on 10 January 2026. It is competitive: for 2023-2024, 55 Bangladeshi students received it (18 undergraduates, 23 master\'s, 14 doctoral). Provincial, municipal, university and Confucius Institute scholarships also exist but are not verified here.',
        'আবেদন online-এ campuschina.org-এ। ১৯ December ২০২৫-এ ঘোষিত round ১০ January ২০২৬-এ বন্ধ হয়েছে। এটা প্রতিযোগিতামূলক: ২০২৩-২০২৪-এ ৫৫ জন Bangladesh-এর student পেয়েছিলেন (১৮ জন undergraduate, ২৩ জন master\'s, ১৪ জন doctoral)। প্রাদেশিক, পৌর, university আর Confucius Institute scholarship-ও আছে, তবে এখানে যাচাই হয়নি।',
      ),
    ],
    [CN_EMB_CSC, CN_EMB_CSC_2023, CN_CAMPUSCHINA],
    { allDegrees: true },
  );

// ------------------------------------------------------------------ documents

const EMB = b('Embassy of China in Bangladesh.', 'ঢাকার Chinese Embassy (চীনা দূতাবাস)।');

export const CN_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Needed for the university application, the visa and the residence permit.', 'University-র আবেদন, visa আর residence permit — সবকিছুতে লাগে।'),
    who: EMB,
    when: b('From the application to the residence permit in China.', 'আবেদন থেকে China-তে residence permit পর্যন্ত।'),
    where: b('University online system, visaforchina.cn and the Visa Center.', 'University-র online system, visaforchina.cn আর Visa Center।'),
    prepare: b('Keep it valid; universities ask you to renew it in advance if it will expire.', 'বৈধ রাখুন; মেয়াদ শেষ হওয়ার আগে university নবায়ন করতে বলে।'),
    groups: ['general', 'visa'],
    sources: [CN_EMB_VISA, CN_ZJU_MA],
  },
  {
    id: 'academic',
    name: b('Diploma or degree certificates and transcripts', 'সনদ আর transcript'),
    why: b('University documents (before admission): your highest qualification and transcripts.', 'University-র document (ভর্তির আগে): আপনার সর্বোচ্চ qualification আর transcript।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('With the online application; originals or notarised copies by registration.', 'Online আবেদনের সঙ্গে; registration-এর মধ্যে মূল বা notarized কপি।'),
    where: b('The university\'s online application system.', 'University-র online application system-এ।'),
    prepare: b('Transcripts in Chinese or English; graduating students may first give a pre-graduation certificate.', 'Chinese বা ইংরেজিতে transcript; যাঁরা পাশ করছেন, আগে pre-graduation certificate দিতে পারেন।'),
    groups: ['general', 'program'],
    sources: [CN_ZJU_UG, CN_ZJU_MA, CN_TSINGHUA_ELIG],
  },
  {
    id: 'language',
    name: b('HSK or English test result', 'HSK বা English test-এর ফল'),
    why: b('University document: HSK for Chinese-taught programs, an English test for English-taught programs.', 'University-র document: Chinese-মাধ্যম program-এ HSK, ইংরেজি-মাধ্যম program-এ English test।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('With the application.', 'আবেদনের সময়।'),
    where: b('Uploaded to the university\'s system.', 'University-র system-এ upload।'),
    prepare: b('The required HSK level and English score differ by university and program.', 'HSK level আর English score university আর program অনুযায়ী আলাদা।'),
    groups: ['program'],
    sources: [CN_ZJU_UG, CN_ZJU_MA],
  },
  {
    id: 'supervisor',
    name: b('Study plan and supervisor\'s provisional acceptance (graduate)', 'Study plan আর supervisor-এর প্রাথমিক সম্মতি (graduate)'),
    why: b('University documents for master\'s and doctoral programs: Zhejiang University asks for a study or research plan of at least 1,500 words and encourages a supervisor\'s Form for Provisional Acceptance.', 'Master\'s আর doctoral program-এর university document: Zhejiang University অন্তত ১,৫০০ শব্দের study বা research plan চায়, আর supervisor-এর Form for Provisional Acceptance দিতে উৎসাহ দেয়।'),
    who: b('The university and your prospective supervisor.', 'University আর আপনার সম্ভাব্য supervisor।'),
    when: b('Before and with the application.', 'আবেদনের আগে আর সঙ্গে।'),
    where: b('Contact supervisors through the university\'s staff pages.', 'University-র শিক্ষক-page থেকে supervisor-দের সঙ্গে যোগাযোগ।'),
    prepare: b('Choose your research direction first, then contact supervisors.', 'আগে গবেষণার দিক ঠিক করুন, তারপর supervisor-দের সঙ্গে যোগাযোগ করুন।'),
    groups: ['program'],
    degrees: ['masters', 'phd'],
    sources: [CN_ZJU_MA, CN_ZJU_PHD],
  },
  {
    id: 'scholarship-docs',
    name: b('CSC scholarship application', 'CSC scholarship-এর আবেদন'),
    why: b('Scholarship documents — separate from the university and visa documents.', 'Scholarship-এর document — university আর visa-র document থেকে আলাদা।'),
    who: b('China Scholarship Council (through the Chinese Embassy in Bangladesh).', 'China Scholarship Council (ঢাকার Chinese Embassy-র মাধ্যমে)।'),
    when: b('By the round\'s deadline (the last round closed on 10 January 2026).', 'Round-এর শেষ তারিখের মধ্যে (শেষ round ১০ January ২০২৬-এ বন্ধ হয়েছে)।'),
    where: b('Online at campuschina.org.', 'Online-এ campuschina.org-এ।'),
    prepare: b('Follow the instructions and upload all required documents in time; the full list is not verified here.', 'নির্দেশনা মেনে সময়মতো সব দরকারি document upload করুন; পূর্ণ তালিকা এখানে যাচাই হয়নি।'),
    groups: ['program', 'bangladesh'],
    status: 'partly-verified',
    sources: [CN_EMB_CSC],
  },
  {
    id: 'admission-jw',
    name: b('Admission letter and JW201 / JW202 form', 'ভর্তির চিঠি আর JW201 / JW202 form'),
    why: b('Visa documents (after admission): the original admission letter and the Confirmation Form for Study in China.', 'Visa-র document (ভর্তির পরে): ভর্তির চিঠির মূল কপি আর Confirmation Form for Study in China।'),
    who: b('Issued by the university (the JW form through the Ministry of Education system).', 'University দেয় (JW form Ministry of Education-এর system-এর মাধ্যমে)।'),
    when: b('After admission, before the visa application.', 'ভর্তির পরে, visa আবেদনের আগে।'),
    where: b('Uploaded at visaforchina.cn; originals shown at the Visa Center.', 'visaforchina.cn-এ upload; মূল কপি Visa Center-এ দেখাতে হয়।'),
    prepare: b('Keep the originals — you need them again for the residence permit.', 'মূল কপি রেখে দিন — residence permit-এর জন্য আবার লাগবে।'),
    groups: ['visa'],
    sources: [CN_EMB_VISA, CN_BJ_VISA],
  },
  {
    id: 'finance',
    name: b('Scholarship proof or bank statement', 'Scholarship-এর প্রমাণ বা bank statement'),
    why: b('Visa document: self-funded applicants show at least USD 2,500 for each year of study.', 'Visa-র document: নিজের খরচে পড়লে পড়ার প্রতি বছরের জন্য অন্তত USD 2,500 দেখাতে হয়।'),
    who: EMB,
    when: b('With the visa application.', 'Visa আবেদনের সঙ্গে।'),
    where: b('Uploaded at visaforchina.cn.', 'visaforchina.cn-এ upload।'),
    prepare: b('Scholarship holders give the scholarship proof instead.', 'Scholarship থাকলে তার প্রমাণ দিন।'),
    groups: ['visa', 'bangladesh'],
    sources: [CN_EMB_VISA],
  },
  {
    id: 'visa-center',
    name: b('Passport submission and fingerprints at the Visa Center, Dhaka', 'ঢাকার Visa Center-এ passport জমা আর আঙুলের ছাপ'),
    why: b('Visa step after the online preliminary review is approved; an in-person interview at the Embassy may be required first.', 'Online প্রাথমিক পর্যালোচনা অনুমোদনের পরের visa ধাপ; আগে Embassy-তে সশরীরে interview লাগতে পারে।'),
    who: EMB,
    when: b('After "Online review completed"; no appointment needed.', '"Online review completed" দেখানোর পরে; appointment লাগে না।'),
    where: b('Chinese Visa Application Service Center.', 'ঢাকার Chinese Visa Application Service Center।'),
    prepare: b('Bring the originals of documents marked "original"; keep your visaforchina.cn login safe.', '"Original" চিহ্নিত document-এর মূল কপি নিন; visaforchina.cn-এর login নিরাপদে রাখুন।'),
    groups: ['visa', 'bangladesh'],
    sources: [CN_EMB_VISA],
  },
  {
    id: 'residence-permit',
    name: b('Residence permit and medical examination record', 'Residence permit আর স্বাস্থ্য পরীক্ষার রেকর্ড'),
    why: b('After arrival: X1 holders must get a residence permit within 30 days.', 'পৌঁছানোর পরে: X1 visa থাকলে ৩০ দিনের মধ্যে residence permit নিতে হয়।'),
    who: b('Local Exit-Entry Administration (public security bureau).', 'স্থানীয় Exit-Entry Administration (জননিরাপত্তা ব্যুরো)।'),
    when: b('Within 30 days of arriving.', 'পৌঁছানোর ৩০ দিনের মধ্যে।'),
    where: b('In person, usually with the university\'s help.', 'সশরীরে, সাধারণত university-র সহায়তায়।'),
    prepare: b('For permits over one year (age 18–70), the verified medical examination record from a Chinese health and quarantine authority (Beijing guidance).', 'এক বছরের বেশি মেয়াদি permit-এ (বয়স ১৮–৭০) China-র health and quarantine কর্তৃপক্ষের যাচাই করা স্বাস্থ্য পরীক্ষার রেকর্ড (Beijing-এর নির্দেশনা)।'),
    groups: ['arrival'],
    status: 'partly-verified',
    sources: [CN_BJ_VISA, CN_BJ_RP_WORK],
  },
  {
    id: 'insurance',
    name: b('Comprehensive medical insurance in China', 'China-তে comprehensive medical insurance'),
    why: b('Required for registration each semester (Ministry of Education regulation, as stated by Zhejiang University).', 'প্রতি semester-এ registration-এর জন্য লাগে (Zhejiang University জানায় এটা Ministry of Education-এর নিয়ম)।'),
    who: b('Your university.', 'আপনার university।'),
    when: b('At registration.', 'Registration-এর সময়।'),
    where: b('Bought in mainland China, usually arranged through the university.', 'China-র মূল ভূখণ্ডে কেনা, সাধারণত university-র মাধ্যমে।'),
    prepare: b('The price is not verified here.', 'দাম এখানে যাচাই হয়নি।'),
    groups: ['arrival'],
    status: 'partly-verified',
    sources: [CN_ZJU_MA],
  },
];

// ------------------------------------------------------------------ costs (source currency, never converted)

const BANK_MIN: GuideCost = { id: 'funds-bank', label: b('Bank statement for a self-funded X1 visa', 'নিজের খরচে X1 visa-র bank statement'), value: b('At least USD 2,500 for each year of study', 'পড়ার প্রতি বছরের জন্য অন্তত USD 2,500'), amount: { value: 2500, currency: 'USD', period: 'year' }, note: b('A visa minimum set by the Embassy, not a budget.', 'Embassy-র ঠিক করা visa-র minimum, বাজেট নয়।'), source: CN_EMB_VISA };
const ZJU_FEE: GuideCost = { id: 'application-fee', label: b('Application fee — Zhejiang University undergraduate (example)', 'আবেদন fee — Zhejiang University undergraduate (উদাহরণ)'), value: b('CNY 800, non-refundable', 'CNY 800, ফেরতযোগ্য নয়'), amount: { value: 800, currency: 'CNY', period: 'one-time' }, source: CN_ZJU_UG };
const CSC_STIPEND: GuideCost = { id: 'csc-stipend', label: b('CSC scholarship monthly allowance (if awarded)', 'CSC scholarship-এর মাসিক ভাতা (পেলে)'), value: b('About CNY 2,500–3,500 a month, by level', 'Level অনুযায়ী মাসে প্রায় CNY 2,500–3,500'), amount: { value: 2500, max: 3500, currency: 'CNY', period: 'month' }, source: CN_EMB_CSC };
const UNVERIFIED: GuideCost[] = [
  { id: 'tuition', label: b('Tuition', 'Tuition'), value: b('Not verified — set by each university and program; confirmed in the admission notice', 'যাচাই হয়নি — প্রতিটি university আর program ঠিক করে; admission notice-এ নিশ্চিত হয়'), status: 'not-verified', source: CN_ZJU_UG },
  { id: 'visa-fee', label: b('X1 visa fee', 'X1 visa fee'), value: b('Not verified — paid at the Visa Center', 'যাচাই হয়নি — Visa Center-এ দিতে হয়'), status: 'not-verified', source: CN_EMB_VISA },
  { id: 'rent', label: b('Accommodation', 'থাকার খরচ'), value: b('Not verified — set by each university', 'যাচাই হয়নি — প্রতিটি university ঠিক করে'), status: 'not-verified', source: CN_ZJU_UG },
  { id: 'living', label: b('Living costs', 'থাকা-খাওয়ার খরচ'), value: b('Not verified — depends on the city', 'যাচাই হয়নি — শহরের উপর নির্ভর করে'), status: 'not-verified', source: CN_EMB_VISA },
  { id: 'insurance', label: b('Medical insurance and residence permit', 'Medical insurance আর residence permit'), value: b('Not verified', 'যাচাই হয়নি'), status: 'not-verified', source: CN_ZJU_MA },
];

// ------------------------------------------------------------------ common sections

const commonTail = () => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [costs('cost-detail'), { embed: 'costs' as const }] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa('types', b('Which universities are there?', 'কোন কোন university আছে?'), [b('The examples below are Chinese universities, listed alphabetically, not ordered by quality. Entry rules, fees, languages of instruction and scholarships differ at each, so check the official page.', 'নিচের উদাহরণগুলো China-র university, বর্ণানুক্রমে, মান অনুযায়ী নয়। ভর্তির নিয়ম, fee, পড়ানোর ভাষা আর scholarship প্রতিটিতে আলাদা, তাই official page দেখুন।')], [CN_ZJU_UG]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work')] },
  { id: 'visa', title: b('Student visa and residence permit', 'Student visa আর residence permit'), items: [visa('visa'), residence('residence')] },
  { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('4–6 years · after high school (HSC)', '৪–৬ বছর · high school (HSC)-এর পরে'),
  intro: b(
    "Chinese universities admit international students to bachelor's programs taught mostly in Chinese, with some taught in English. You need a completed high school education, an HSK certificate for Chinese-taught programs or an English test for English-taught programs, and you usually apply through the university's online system. After admission you receive the admission letter and JW form and apply for an X1 visa.",
    "China-র university international student-দের bachelor's program-এ ভর্তি নেয়, বেশিরভাগ Chinese-মাধ্যমে, কিছু ইংরেজি-মাধ্যমে। High school শেষ করা লাগে, Chinese-মাধ্যম program-এ HSK সনদ বা ইংরেজি-মাধ্যম program-এ English test, আর সাধারণত university-র online system-এ আবেদন করতে হয়। ভর্তির পরে ভর্তির চিঠি আর JW form পেয়ে X1 visa-র আবেদন।",
  ),
  costs: { official: [BANK_MIN, CSC_STIPEND], estimates: [ZJU_FEE, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in China from Bangladesh?", "Bangladesh থেকে China-তে Bachelor's পড়তে কী কী লাগে?"),
          [b('A foreign (non-Chinese) passport, a completed high school education (HSC), HSK for Chinese-taught programs or an English test for English-taught programs, the university\'s online application and fee, and often an interview. Then the admission letter, the JW201/JW202 form and an X1 visa.', 'বিদেশি (চীনা নয়) passport, শেষ করা high school (HSC), Chinese-মাধ্যম program-এ HSK বা ইংরেজি-মাধ্যম program-এ English test, university-র online আবেদন আর fee, আর প্রায়ই interview। তারপর ভর্তির চিঠি, JW201/JW202 form আর X1 visa।'), CHECK_UNI],
          [CN_ZJU_UG, CN_EMB_VISA],
        ),
        qa(
          'hsc',
          b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"),
          [
            b(
              'Yes — Chinese universities ask for a completed high school education. Examples: Zhejiang University requires high school graduation and applicants under 25 (a pre-graduation certificate is accepted at application, with the diploma due by registration); Tsinghua University requires applicants to be at least 18 by 1 September of the entry year. Admission is competitive, based on school results, language ability and an interview.',
              'হ্যাঁ — China-র university শেষ করা high school চায়। উদাহরণ: Zhejiang University high school পাশ আর ২৫ বছরের কম বয়স চায় (আবেদনের সময় pre-graduation certificate চলে, registration-এর মধ্যে সনদ দিতে হয়); Tsinghua University চায় ভর্তির বছরের ১ September-এর মধ্যে অন্তত ১৮ বছর বয়স। ভর্তি প্রতিযোগিতামূলক — school-এর ফল, ভাষার দক্ষতা আর interview-এর ভিত্তিতে।',
            ),
            CHECK_UNI,
          ],
          [CN_ZJU_UG, CN_TSINGHUA_ELIG],
        ),
      ],
    },
    {
      id: 'language',
      title: b('HSK, English and IELTS', 'HSK, ইংরেজি আর IELTS'),
      items: [
        qa(
          'language',
          b('Do you need HSK or IELTS for China?', 'China-তে HSK লাগবে নাকি IELTS?'),
          [b('It depends on the teaching language. For Chinese-taught programs you need an HSK certificate (unless your schooling was in Chinese); for English-taught programs you need an English test score such as TOEFL or IELTS. The level required is set by each university and program — at Zhejiang University undergraduate programs are mostly Chinese-taught.', 'পড়ানোর ভাষার উপর নির্ভর করে। Chinese-মাধ্যম program-এ HSK সনদ লাগে (স্কুল Chinese-মাধ্যমে না হলে); ইংরেজি-মাধ্যম program-এ TOEFL বা IELTS-এর মতো English test score। কোন level লাগবে, প্রতিটি university আর program ঠিক করে — Zhejiang University-তে undergraduate program বেশিরভাগ Chinese-মাধ্যম।'), CHECK_UNI],
          [CN_ZJU_UG],
        ),
      ],
    },
    {
      id: 'apply',
      title: b('Applying and deadlines', 'আবেদন আর শেষ তারিখ'),
      items: [
        qa(
          'deadlines',
          b('When do you apply?', 'কখন আবেদন করবেন?'),
          [b('Each university sets its own window. Example: Zhejiang University accepted undergraduate applications for 2026 entry from 1 December 2025 to 28 February 2026 (31 May 2026 for certain majors), with a CNY 800 non-refundable application fee, a document review and video interviews by the academic schools.', 'প্রতিটি university নিজের সময় ঠিক করে। উদাহরণ: Zhejiang University ২০২৬ ভর্তির undergraduate আবেদন নিয়েছিল ১ December ২০২৫ থেকে ২৮ February ২০২৬ (কিছু major-এ ৩১ May ২০২৬), CNY 800 ফেরতযোগ্য নয় এমন আবেদন fee, document পর্যালোচনা আর academic school-এর video interview-সহ।')],
          [CN_ZJU_UG],
        ),
      ],
    },
    { id: 'scholarships', title: b('Scholarships', 'Scholarship'), items: [csc('csc'), { embed: 'scholarships' }] },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b("2–3 years · after a bachelor's", "২–৩ বছর · bachelor's-এর পরে"),
  intro: b(
    "Master's programs in China take 2–3 years and are generally taught in Chinese, with some English-taught programs. Universities ask for a bachelor's degree, a language certificate and a study plan, and encourage you to contact a supervisor first. The Chinese Government (CSC) Scholarship also covers master's study for Bangladeshi students.",
    "China-তে master's ২–৩ বছরের, সাধারণত Chinese-মাধ্যমে, কিছু ইংরেজি-মাধ্যম program-ও আছে। University bachelor's degree, ভাষার সনদ আর study plan চায়, আর আগে supervisor-এর সঙ্গে যোগাযোগ করতে উৎসাহ দেয়। Chinese Government (CSC) Scholarship Bangladesh-এর student-দের master's-এর খরচও দেয়।",
  ),
  costs: { official: [BANK_MIN, CSC_STIPEND], estimates: UNVERIFIED },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in China?", "China-তে Master's-এ কী লাগে?"),
          [b("Example (Zhejiang University): a bachelor's degree, age under 35 (flexible for healthy applicants with work experience and strong academic ability), the university's language requirement for graduate programs, bachelor's transcripts, a study plan of at least 1,500 words, and a supervisor's Form for Provisional Acceptance, which applicants are expected to include.", "উদাহরণ (Zhejiang University): bachelor's degree, বয়স ৩৫-এর কম (কাজের অভিজ্ঞতা আর ভালো academic দক্ষতা থাকলে শিথিল), graduate program-এর ভাষার শর্ত, bachelor's-এর transcript, অন্তত ১,৫০০ শব্দের study plan, আর supervisor-এর Form for Provisional Acceptance, যা আবেদনে দেওয়ার কথা।"), CHECK_UNI],
          [CN_ZJU_MA],
        ),
        qa(
          'cgpa',
          b('What CGPA is needed?', 'কত CGPA লাগে?'),
          [b('Not verified yet: no minimum CGPA for Bangladeshi degrees was found on the official pages read. Admission and scholarships are competitive; check the program page.', 'এখনো যাচাই হয়নি: পড়া official page-গুলোতে Bangladesh-এর degree-র জন্য কোনো minimum CGPA পাওয়া যায়নি। ভর্তি আর scholarship প্রতিযোগিতামূলক; program page দেখুন।')],
          [CN_ZJU_MA],
          { status: 'not-verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('HSK, English and IELTS', 'HSK, ইংরেজি আর IELTS'),
      items: [
        qa(
          'language',
          b("Do you need HSK or IELTS for a Master's?", "Master's-এ HSK লাগবে নাকি IELTS?"),
          [b('Chinese-taught programs need an HSK level, English-taught programs an English score; Zhejiang University publishes a separate language requirement list for graduate programs. The exact levels are not verified here.', 'Chinese-মাধ্যম program-এ HSK level, ইংরেজি-মাধ্যম program-এ English score লাগে; Zhejiang University graduate program-এর জন্য আলাদা ভাষার শর্তের তালিকা দেয়। সঠিক level এখানে যাচাই হয়নি।')],
          [CN_ZJU_MA],
          { status: 'partly-verified' },
        ),
      ],
    },
    { id: 'scholarships', title: b('Scholarships', 'Scholarship'), items: [csc('csc'), { embed: 'scholarships' }] },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ PhD

const PHD: DegreeGuide = {
  level: 'phd',
  card: b("3–4 years · after a master's", "৩–৪ বছর · master's-এর পরে"),
  intro: b(
    "Doctoral programs in China take 3–4 years and are generally taught in Chinese, with some in English. Universities such as Zhejiang University ask for a master's degree and a supervisor's provisional acceptance. The Chinese Government (CSC) Scholarship covers doctoral study for Bangladeshi students.",
    "China-তে doctoral program ৩–৪ বছরের, সাধারণত Chinese-মাধ্যমে, কিছু ইংরেজিতে। Zhejiang University-র মতো university master's degree আর supervisor-এর প্রাথমিক সম্মতি চায়। Chinese Government (CSC) Scholarship Bangladesh-এর student-দের doctoral পড়ার খরচ দেয়।",
  ),
  costs: { official: [BANK_MIN, CSC_STIPEND], estimates: UNVERIFIED },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'master',
          b('What do you need for a PhD in China?', 'China-তে PhD-তে কী লাগে?'),
          [
            b("Example (Zhejiang University): a master's degree, age under 40 (flexible for applicants with work experience and strong academic ability), master's and bachelor's transcripts, a research plan of at least 1,500 words, published papers if any, and a supervisor's Form for Provisional Acceptance.", "উদাহরণ (Zhejiang University): master's degree, বয়স ৪০-এর কম (কাজের অভিজ্ঞতা আর ভালো academic দক্ষতা থাকলে শিথিল), master's আর bachelor's-এর transcript, অন্তত ১,৫০০ শব্দের research plan, থাকলে প্রকাশিত গবেষণাপত্র, আর supervisor-এর Form for Provisional Acceptance।"),
            CHECK_UNI,
          ],
          [CN_ZJU_PHD],
        ),
      ],
    },
    {
      id: 'language',
      title: b('HSK, English and IELTS', 'HSK, ইংরেজি আর IELTS'),
      items: [
        qa(
          'language',
          b('Do you need HSK or IELTS for a PhD?', 'PhD-তে HSK লাগবে নাকি IELTS?'),
          [b('Chinese-taught programs need an HSK level, English-taught programs an English score, as published by each university. The exact levels are not verified here.', 'Chinese-মাধ্যম program-এ HSK level, ইংরেজি-মাধ্যম program-এ English score — প্রতিটি university প্রকাশ করে। সঠিক level এখানে যাচাই হয়নি।')],
          [CN_ZJU_PHD],
          { status: 'partly-verified' },
        ),
      ],
    },
    { id: 'funding', title: b('Scholarships and funding', 'Scholarship আর funding'), items: [csc('csc'), { embed: 'scholarships' }] },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ the country

export const CN_GUIDE: CountryGuide = {
  code: 'CN',
  checkedAt: CN_READ,
  sourcesPerSection: true,
  intro: b(
    "China offers bachelor's, master's and doctoral programs, mostly taught in Chinese with some taught in English. You apply to each university online, receive an admission letter and JW201/JW202 form, and apply for an X1 visa through the Chinese Visa Application Service Center in Dhaka; within 30 days of arriving you must get a residence permit. The Chinese Government (CSC) Scholarship is open to Bangladeshi students. This guide is built from the Chinese Embassy in Bangladesh, Chinese government pages and university pages.",
    "China-তে bachelor's, master's আর doctoral program আছে, বেশিরভাগ Chinese-মাধ্যমে, কিছু ইংরেজিতে। প্রতিটি university-তে online আবেদন করে ভর্তির চিঠি আর JW201/JW202 form পেয়ে ঢাকার Chinese Visa Application Service Center-এর মাধ্যমে X1 visa-র আবেদন; পৌঁছানোর ৩০ দিনের মধ্যে residence permit নিতে হয়। Chinese Government (CSC) Scholarship Bangladesh-এর student-দের জন্য খোলা। এই guide ঢাকার Chinese Embassy, China-র সরকারি page আর university-র page থেকে তৈরি।",
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [CN_EMB_VISA, CN_BJ_RP_WORK, CN_BJ_VISA, CN_ZJU_UG],
      {
        kind: 'guidance',
        list: [
          b('Paying an agency that claims to be the Embassy\'s exclusive visa service — the Embassy has authorised none.', 'Embassy-র একমাত্র visa সেবাদাতা দাবি করা agency-কে টাকা দেওয়া — Embassy কাউকে অনুমোদন দেয়নি।'),
          b('Losing the visaforchina.cn username or password — pending orders then block a new application with the same passport.', 'visaforchina.cn-এর username বা password হারানো — তখন একই passport দিয়ে নতুন আবেদন আটকে যায়।'),
          b('Working off campus without the university\'s approval and the residence-permit annotation.', 'University-র অনুমোদন আর residence permit-এ উল্লেখ ছাড়া campus-এর বাইরে কাজ করা।'),
          b('Missing the 30-day deadline for the residence permit after arrival.', 'পৌঁছানোর পরে residence permit-এর ৩০ দিনের শেষ সময় মিস করা।'),
          b('Choosing a Chinese-taught program without the required HSK level.', 'প্রয়োজনীয় HSK level ছাড়া Chinese-মাধ্যম program বেছে নেওয়া।'),
          b('Treating the USD 2,500 visa bank minimum as your real budget.', 'Visa-র USD 2,500 bank minimum-কে আসল বাজেট ধরে নেওয়া।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in China from Bangladesh?", "Bangladesh থেকে China-তে Bachelor's পড়তে কী কী লাগে?"), [b('A completed HSC, HSK (Chinese-taught) or an English test (English-taught), the university\'s online application, then the admission letter, JW201/JW202 form and an X1 visa.', 'শেষ করা HSC, HSK (Chinese-মাধ্যম) বা English test (ইংরেজি-মাধ্যম), university-র online আবেদন, তারপর ভর্তির চিঠি, JW201/JW202 form আর X1 visa।')], [CN_ZJU_UG, CN_EMB_VISA]),
    qa('hsc', b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"), [b('Yes, Chinese universities admit high school graduates. Examples: Zhejiang University (under 25) and Tsinghua University (at least 18). Admission is competitive and often includes an interview.', 'হ্যাঁ, China-র university high school পাশ করা student-দের ভর্তি নেয়। উদাহরণ: Zhejiang University (২৫-এর কম) আর Tsinghua University (অন্তত ১৮)। ভর্তি প্রতিযোগিতামূলক, প্রায়ই interview-সহ।')], [CN_ZJU_UG, CN_TSINGHUA_ELIG]),
    qa('cost', b('How much does it cost to study in China?', 'China-তে পড়াশোনার খরচ কত?'), [b('Not verified yet as a national figure: tuition and accommodation are set by each university. Self-funded X1 applicants must show at least USD 2,500 per year of study; the CSC scholarship, if awarded, covers tuition, accommodation, insurance and a CNY 2,500–3,500 monthly allowance.', 'এখনো জাতীয় অঙ্ক হিসেবে যাচাই হয়নি: tuition আর থাকার খরচ প্রতিটি university ঠিক করে। নিজের খরচে X1 আবেদনে পড়ার প্রতি বছরে অন্তত USD 2,500 দেখাতে হয়; CSC scholarship পেলে tuition, থাকা, insurance আর মাসে CNY 2,500–3,500 ভাতা পাওয়া যায়।')], [CN_EMB_VISA, CN_EMB_CSC], { status: 'not-verified' }),
    qa('ielts', b('Do you need HSK or IELTS for China?', 'China-তে HSK লাগবে নাকি IELTS?'), [b('HSK for Chinese-taught programs; an English test such as IELTS or TOEFL for English-taught programs. Levels are set by each university.', 'Chinese-মাধ্যম program-এ HSK; ইংরেজি-মাধ্যম program-এ IELTS বা TOEFL-এর মতো English test। Level প্রতিটি university ঠিক করে।')], [CN_ZJU_UG]),
    qa('visa', b('What do you need for the Chinese student visa?', 'China-র student visa-র জন্য কী কী লাগে?'), [b('An X1 visa (study over 180 days): the JW201 or JW202 form, the original admission letter, and scholarship proof or a bank statement of at least USD 2,500 a year. Apply online at visaforchina.cn, then submit the passport and fingerprints at the Visa Center in Dhaka; regular processing is about 4 working days.', 'X1 visa (১৮০ দিনের বেশি পড়া): JW201 বা JW202 form, ভর্তির চিঠির মূল কপি, আর scholarship-এর প্রমাণ বা বছরে অন্তত USD 2,500-এর bank statement। visaforchina.cn-এ online আবেদন, তারপর ঢাকার Visa Center-এ passport আর আঙুলের ছাপ; সাধারণ process-এ প্রায় ৪ কর্মদিবস।')], [CN_EMB_VISA]),
    qa('work', b('Can you work while studying in China?', 'China-তে পড়ার পাশাপাশি কাজ করা যায়?'), [b('Only off-campus work-study or internships approved by your university and annotated on your residence permit by the Exit-Entry Administration. Otherwise off-campus work is not allowed.', 'শুধু university-অনুমোদিত আর Exit-Entry Administration residence permit-এ উল্লেখ করেছে এমন campus-এর বাইরের work-study বা internship। অন্যথায় campus-এর বাইরে কাজ করা যায় না।')], [CN_BJ_RP_WORK]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b("Yes: the Chinese Government (CSC Type A) Scholarship is open to Bangladeshi students for bachelor's, master's and doctoral degrees. It is competitive — 55 Bangladeshi students received it for 2023-2024. The last round closed on 10 January 2026.", "হ্যাঁ: Chinese Government (CSC Type A) Scholarship Bangladesh-এর student-দের bachelor's, master's আর doctoral degree-র জন্য খোলা। এটা প্রতিযোগিতামূলক — ২০২৩-২০২৪-এ ৫৫ জন Bangladesh-এর student পেয়েছিলেন। শেষ round ১০ January ২০২৬-এ বন্ধ হয়েছে।")], [CN_EMB_CSC, CN_EMB_CSC_2023]),
    qa('after', b('Can you stay and work in China after your studies?', 'পড়া শেষে China-তে থাকা বা কাজ করা যায় কি?'), [b('Not verified yet: a study residence permit gives no work rights, and the rules for moving to a work permit after graduation were not verified for this guide.', 'এখনো যাচাই হয়নি: পড়ার residence permit কাজের অধিকার দেয় না, আর পড়া শেষে work permit-এ যাওয়ার নিয়ম এই guide-এর জন্য যাচাই হয়নি।')], [CN_BJ_RP_WORK], { status: 'not-verified' }),
    qa('residence', b('What must you do after arriving?', 'পৌঁছানোর পরে কী করতে হবে?'), [b('Get a residence permit from the local Exit-Entry Administration within 30 days; for a permit over one year you need a verified medical examination record, and universities require Chinese medical insurance at registration.', 'পৌঁছানোর ৩০ দিনের মধ্যে স্থানীয় Exit-Entry Administration থেকে residence permit নিন; এক বছরের বেশি মেয়াদের permit-এ যাচাই করা স্বাস্থ্য পরীক্ষার রেকর্ড লাগে, আর registration-এ university China-র medical insurance চায়।')], [CN_BJ_VISA, CN_BJ_RP_WORK, CN_ZJU_MA], { status: 'partly-verified' }),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before admission (university): passport, certificates and transcripts, HSK or English test, and for graduate programs a study or research plan and a supervisor\'s provisional acceptance. After admission (visa): admission letter, JW201/JW202 form, scholarship proof or bank statement, Visa Center submission. Then the residence permit and insurance in China. Scholarship documents are separate.', 'ভর্তির আগে (university): passport, সনদ আর transcript, HSK বা English test, আর graduate program-এ study বা research plan ও supervisor-এর প্রাথমিক সম্মতি। ভর্তির পরে (visa): ভর্তির চিঠি, JW201/JW202 form, scholarship-এর প্রমাণ বা bank statement, Visa Center-এ জমা। তারপর China-তে residence permit আর insurance। Scholarship-এর document আলাদা।')], [CN_ZJU_UG, CN_ZJU_MA, CN_EMB_VISA, CN_EMB_CSC]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("Example (Zhejiang University): a bachelor's degree, under 35 (flexible), a language certificate, a 1,500-word study plan and a supervisor's provisional acceptance; programs take 2–3 years.", "উদাহরণ (Zhejiang University): bachelor's degree, ৩৫-এর কম (শিথিলযোগ্য), ভাষার সনদ, ১,৫০০ শব্দের study plan আর supervisor-এর প্রাথমিক সম্মতি; program ২–৩ বছরের।")], [CN_ZJU_MA]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b("Example (Zhejiang University): a master's degree, under 40 (flexible), a 1,500-word research plan and a supervisor's provisional acceptance; programs take 3–4 years.", "উদাহরণ (Zhejiang University): master's degree, ৪০-এর কম (শিথিলযোগ্য), ১,৫০০ শব্দের research plan আর supervisor-এর প্রাথমিক সম্মতি; program ৩–৪ বছরের।")], [CN_ZJU_PHD]),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — Fudan University, Peking University, Shanghai Jiao Tong University, Tsinghua University and Zhejiang University — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — Fudan University, Peking University, Shanghai Jiao Tong University, Tsinghua University আর Zhejiang University — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [CN_ZJU_UG]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: visa applications go online through visaforchina.cn with a preliminary review, a possible in-person interview at the Embassy, and passport submission at the Visa Center; self-funded X1 applicants show at least USD 2,500 a year; the Embassy has authorised no exclusive agency; the CSC Type A scholarship is open to Bangladeshi students. Other Bangladesh-specific requirements: not verified yet.', 'Bangladesh-এর জন্য যাচাই করা: visa-র আবেদন online-এ visaforchina.cn-এ, প্রাথমিক পর্যালোচনা, Embassy-তে সম্ভাব্য সশরীরে interview আর Visa Center-এ passport জমাসহ; নিজের খরচে X1 আবেদনে বছরে অন্তত USD 2,500 দেখাতে হয়; Embassy কোনো একমাত্র agency অনুমোদন করেনি; CSC Type A scholarship Bangladesh-এর student-দের জন্য খোলা। অন্যান্য Bangladesh-নির্দিষ্ট শর্ত: এখনো যাচাই হয়নি।'),
    ], [CN_EMB_VISA, CN_EMB_CSC]),
  ],
  life: [
    qa('health', b('How does healthcare work?', 'চিকিৎসা ব্যবস্থা কেমন?'), [b('Through the comprehensive medical insurance your university requires at registration. What it covers and costs is not verified here.', 'Registration-এ university যে comprehensive medical insurance চায়, তার মাধ্যমে। কী কভার করে আর খরচ কত, এখানে যাচাই হয়নি।')], [CN_ZJU_MA], { status: 'partly-verified' }),
  ],
  documents: CN_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'fact', status: 'not-verified' },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 2500, unit: 'USD/year', text: b('Self-funded X1 applicants: a bank statement of at least USD 2,500 per year of study (Embassy in Bangladesh).', 'নিজের খরচে X1: পড়ার প্রতি বছরে অন্তত USD 2,500-এর bank statement (ঢাকার Embassy)।') }, source: CN_EMB_VISA },
    { id: 'living-cost', kind: 'estimate', status: 'not-verified' },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { unit: 'permission', text: b('Off-campus work-study or internships only with university approval and a residence-permit annotation; hours not verified.', 'Campus-এর বাইরে work-study বা internship শুধু university-র অনুমোদন আর residence permit-এ উল্লেখসহ; ঘণ্টা যাচাই হয়নি।') }, source: CN_BJ_RP_WORK },
    { id: 'post-study-stay', kind: 'fact', status: 'not-verified' },
    { id: 'english-programs', kind: 'fact', status: 'verified', value: { unit: 'programs', text: b('Mostly Chinese-taught (HSK needed); some English-taught programs.', 'বেশিরভাগ Chinese-মাধ্যম (HSK লাগে); কিছু ইংরেজি-মাধ্যম program।') }, source: CN_ZJU_UG },
    { id: 'visa-fee', kind: 'fact', status: 'not-verified' },
  ],
};

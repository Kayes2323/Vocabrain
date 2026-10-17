import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  SI_EC_STUDENT,
  SI_INFOTUJCI_JOBSEEKER,
  SI_INFOTUJCI_STUDY,
  SI_READ,
  SI_SRIPS_ADFUTURA,
  SI_STUDYIN_HEALTH,
  SI_STUDYIN_TUITION,
  SI_STUDYIN_VISA,
  SI_STUDYIN_WORK,
  SI_UM_ADMISSION,
  SI_UL_ENROLMENT,
  SI_UL_TUITION,
} from './si-sources';

/**
 * Slovenia reading guide, researched on its own from Slovenian official
 * sources (the Ministry of the Interior's Infotujci portal for
 * third-country nationals — infotujci.si, the European Commission's
 * Migration and Home Affairs "Student in Slovenia" summary of the same
 * Slovenian rules, the Public Scholarship, Development, Disability and
 * Maintenance Fund of the Republic of Slovenia — srips-rs.si, the
 * government-backed Study in Slovenia portal run by CMEPIUS, and university
 * pages). Nothing is taken from another country's guide. Amounts stay in
 * euros exactly as each source states them and are never converted. It
 * covers English-taught programmes for non-EU/EEA (Bangladeshi) students;
 * Slovenia is an EU/Schengen member, so EU/EEA/Switzerland citizens follow a
 * separate, much lighter route noted where relevant.
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
  'Slovenian public universities are not identical: each one, and often each faculty, sets its own English-taught programmes, tuition fee, deadline and entrance requirements. Always check the exact programme on the university\'s (or faculty\'s) own admissions page.',
  'Slovenia-এর public university-গুলো একরকম না: প্রতিটি university, আর প্রায়ই প্রতিটি faculty, নিজের ইংরেজি-মাধ্যম programme, tuition fee, deadline আর ভর্তির শর্ত ঠিক করে। প্রতিটি programme-এর জন্য university-র (বা faculty-র) নিজের admissions page অবশ্যই দেখে নিন।',
);

// ------------------------------------------------------------------ shared answers

const visa = (id: string) =>
  qa(
    id,
    b('What do you need for a Slovenian student residence permit?', 'Slovenian student residence permit-এর জন্য কী কী লাগে?'),
    [
      b(
        'Non-EU/EEA students coming to Slovenia for a full degree apply for a temporary residence permit for the purpose of studies, not a long-stay visa (Slovenia only issues its long-stay "visa D" to mobile/exchange students on programmes of up to two semesters). The general conditions (Article 33 of the Foreigners Act, ZTuj-2) are: a valid passport, adequate health insurance, sufficient means of subsistence, and no security-related grounds for refusal; the special condition for study purposes is a certificate of enrolment or admission to an educational institution in Slovenia. You must also submit a personal photo, your passport, a certificate from your home country\'s criminal record, and proof of acceptance issued by the educational institution.',
        'Slovenia-তে পূর্ণ degree-র জন্য EU/EEA-র বাইরের student-রা long-stay visa নেন না, বরং পড়ার জন্য একটি temporary residence permit-এর আবেদন করেন (Slovenia তার long-stay "visa D" শুধু দুই সেমিস্টার পর্যন্ত mobile/exchange student-দের দেয়)। সাধারণ শর্ত (Foreigners Act, ZTuj-2-র Article 33): valid passport, উপযুক্ত health insurance, থাকার জন্য পর্যাপ্ত টাকা, আর কোনো security-সম্পর্কিত কারণে প্রত্যাখ্যানের ভিত্তি না থাকা; পড়ার জন্য বিশেষ শর্ত হলো Slovenia-র একটি শিক্ষা প্রতিষ্ঠানে ভর্তি বা enrolment-এর সনদ। সাথে একটি personal photo, passport, নিজ দেশের অপরাধমুক্ত থাকার সনদ, আর শিক্ষা প্রতিষ্ঠানের ইস্যু করা ভর্তির প্রমাণও জমা দিতে হয়।',
      ),
      b(
        'You apply at a Slovenian diplomatic mission or consular post abroad before entering Slovenia; if you already legally reside in Slovenia (for example on a valid passport with another EU state\'s permit, a Schengen visa C, or a visa D for study purposes) and submit evidence of enrolment, you may instead apply at the competent administrative unit inside Slovenia, within the first 90 days of that stay or before your visa/permit expires. The administrative fee is EUR 102 if lodged abroad or EUR 50 if lodged at an administrative unit in Slovenia, plus EUR 12 for the permit card. You must register your place of residence at the nearest administrative unit within 3 days of entering Slovenia.',
        'Slovenia-তে ঢোকার আগে বিদেশে একটি Slovenian diplomatic mission বা consular post-এ আবেদন করতে হয়; যদি আপনি Slovenia-তে আগে থেকেই আইনিভাবে থাকেন (যেমন অন্য EU দেশের permit থাকা valid passport-এ, Schengen visa C-তে, বা পড়ার জন্য visa D-তে) আর enrolment-এর প্রমাণ জমা দেন, তাহলে এর বদলে Slovenia-র ভেতরে সংশ্লিষ্ট administrative unit-এ আবেদন করতে পারেন, সেই থাকার প্রথম ৯০ দিনের মধ্যে বা আপনার visa/permit শেষ হওয়ার আগে। বিদেশে আবেদন করলে administrative fee EUR 102, Slovenia-র administrative unit-এ করলে EUR 50, সাথে permit card-এর জন্য EUR 12। Slovenia-তে ঢোকার ৩ দিনের মধ্যে কাছের administrative unit-এ থাকার জায়গা register করতে হয়।',
      ),
    ],
    [SI_INFOTUJCI_STUDY],
    { allDegrees: true },
  );

const extension = (id: string) =>
  qa(
    id,
    b('What happens when your permit is about to expire?', 'Permit-এর মেয়াদ শেষ হওয়ার কাছাকাছি হলে কী হয়?'),
    [
      b(
        'A temporary residence permit for the purpose of studies is issued for the duration of the course but for a maximum of one year at a time; if your studies last longer than a year, you must apply for an extension annually, under the same conditions as the original permit, before it expires. If you interrupt, finish or withdraw from your studies, you must report this to the administrative unit immediately.',
        'পড়ার জন্য temporary residence permit পড়ার সময়ের জন্য ইস্যু হয়, কিন্তু একবারে সর্বোচ্চ এক বছরের জন্য; পড়া এক বছরের বেশি হলে, মেয়াদ শেষ হওয়ার আগে একই শর্তে প্রতি বছর extension-এর আবেদন করতে হয়। পড়া বন্ধ, শেষ বা ছেড়ে দিলে, এটা সঙ্গে সঙ্গে administrative unit-কে জানাতে হয়।',
      ),
    ],
    [SI_INFOTUJCI_STUDY],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'You must prove sufficient means of subsistence, or another guarantee that they will be provided, of at least the Slovenian basic minimum income every month of your stay. If your parents are legally obliged to support you under your home country\'s law, a certified and translated written statement from them promising to support you is accepted instead of bank statements. Study in Slovenia states the sufficient-means figure as at least EUR 494.09 a month for the academic year, which can also be shown through student-work earnings, employment or scholarship income, funds in a Slovenian or foreign bank account, or funds provided by the educational organisation (a grant).',
        'থাকার প্রতিটি মাসের জন্য অন্তত Slovenia-র basic minimum income-এর সমান পর্যাপ্ত টাকার প্রমাণ, বা তা দেওয়ার আরেকটি নিশ্চয়তা দিতে হয়। নিজ দেশের আইন অনুযায়ী পিতা-মাতার আইনিভাবে সহায়তার বাধ্যবাধকতা থাকলে, bank statement-এর বদলে certified আর translated লিখিত statement গ্রহণযোগ্য যেখানে তারা সহায়তার প্রতিশ্রুতি দেন। Study in Slovenia বলে শিক্ষাবর্ষের জন্য পর্যাপ্ত টাকার পরিমাণ অন্তত মাসে EUR 494.09, যা student-work-এর আয়, চাকরি বা scholarship-এর আয়, Slovenian বা বিদেশি bank account-এর টাকা, বা শিক্ষা প্রতিষ্ঠানের দেওয়া টাকা (grant)-এর মাধ্যমেও দেখানো যায়।',
      ),
    ],
    [SI_INFOTUJCI_STUDY, SI_STUDYIN_VISA],
    { allDegrees: true, status: 'partly-verified' },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('What insurance do you need?', 'কী insurance লাগে?'),
    [
      b(
        'For the residence permit itself you need proof of adequate health insurance covering at least emergency medical services in Slovenia, if you state you are not compulsorily insured in Slovenia. Once studying, students from countries without an EU/EEA/Switzerland/Australia card or a Slovenian bilateral social-insurance agreement (Bosnia and Herzegovina, North Macedonia, Serbia, Montenegro) may join Slovenia\'s compulsory health insurance if they hold a valid certificate of enrolment and are not otherwise insured. International exchange students outside those groups must arrange this insurance themselves at the regional office of the Health Insurance Institute of Slovenia (ZZZS); Study in Slovenia states the current monthly contribution at EUR 126.33 (8.2% of the average gross earnings in Slovenia for the preceding October), and recommends adding commercial insurance to cover the gap, since compulsory insurance covers only part of the cost of care. How this specific contribution figure applies to a Bangladeshi degree-seeking student (rather than a short-term exchange student) was not itemized separately on the pages read.',
        'Residence permit-এর জন্য নিজেই Slovenia-তে অন্তত emergency medical service কভার করা উপযুক্ত health insurance-এর প্রমাণ লাগে, যদি বলেন আপনি Slovenia-তে compulsory insured নন। পড়া শুরু হলে, EU/EEA/Switzerland/Australia card বা Slovenia-র bilateral social-insurance agreement (Bosnia and Herzegovina, North Macedonia, Serbia, Montenegro) ছাড়া অন্য দেশের student-রা valid enrolment সনদ থাকলে আর অন্যভাবে insured না থাকলে Slovenia-র compulsory health insurance-এ যুক্ত হতে পারেন। এই গ্রুপের বাইরের international exchange student-দের নিজেরাই Health Insurance Institute of Slovenia (ZZZS)-র regional office-এ এই insurance ঠিক করতে হয়; Study in Slovenia বর্তমান মাসিক contribution EUR 126.33 বলে (আগের October-এর গড় gross income-এর 8.2%), আর commercial insurance যুক্ত করার পরামর্শ দেয়, কারণ compulsory insurance চিকিৎসার খরচের একটা অংশই কভার করে। এই নির্দিষ্ট contribution সংখ্যা Bangladesh-এর degree-seeking student-এর জন্য (short-term exchange student-এর বদলে) ঠিক কীভাবে প্রযোজ্য, তা পড়া page-এ আলাদাভাবে তালিকাভুক্ত ছিল না।',
      ),
    ],
    [SI_INFOTUJCI_STUDY, SI_STUDYIN_HEALTH],
    { allDegrees: true, status: 'partly-verified' },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Slovenia?', 'Slovenia-তে পড়ার পাশাপাশি কাজ করা যায়?'),
    [
      b(
        'Yes: a third-country national holding a temporary residence permit for study purposes may take up employment or perform work in Slovenia during the permit\'s validity, under the Acts governing employment relationships and student work. In practice, students (Slovenian and international, including those on exchange or a residence permit) typically work through "Student Work": you enrol with a Student Service agency (needs an ID document, a Slovenian bank account, a Slovenian tax number, and your certificate of enrolment), and the agency issues referral forms ("napotnice") for available jobs that you give to employers. Since a February 2015 law, agencies deduct 15.5% of every payment for pension and disability insurance contributions, and all foreign students additionally have 22.5% of each payment deducted as a prepayment of income tax (refundable if your home country has a double-taxation treaty with Slovenia — check the Financial Administration\'s list for which countries qualify). No official page read gave a specific weekly or monthly hours cap for student work.',
        'হ্যাঁ: পড়ার জন্য temporary residence permit থাকা non-EU নাগরিক permit-এর মেয়াদকালে Slovenia-তে চাকরি বা কাজ করতে পারেন, employment relationships আর student work নিয়ন্ত্রণ করা আইন অনুযায়ী। বাস্তবে, student-রা (Slovenian আর international, exchange বা residence permit-এ থাকা সবাই) সাধারণত "Student Work"-এর মাধ্যমে কাজ করেন: একটি Student Service agency-তে enrol করতে হয় (লাগে ID document, Slovenian bank account, Slovenian tax number, আর enrolment সনদ), আর agency পাওয়া যায় এমন চাকরির জন্য referral form ("napotnice") দেয় যা employer-কে দিতে হয়। February 2015-এর একটি আইনের পর থেকে, agency প্রতি পেমেন্ট থেকে pension আর disability insurance contribution-এর জন্য 15.5% কাটে, আর সব foreign student-দের থেকে অতিরিক্ত আরও 22.5% income tax-এর prepayment হিসেবে কাটা হয় (নিজ দেশের সাথে Slovenia-র double-taxation treaty থাকলে ফেরত পাওয়া যায় — কোন দেশ যোগ্য তা Financial Administration-এর তালিকায় দেখুন)। পড়া কোনো official page-এ student work-এর জন্য নির্দিষ্ট সাপ্তাহিক বা মাসিক ঘণ্টার সীমা দেওয়া ছিল না।',
      ),
    ],
    [SI_INFOTUJCI_STUDY, SI_STUDYIN_WORK],
    { allDegrees: true, status: 'partly-verified' },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Slovenia after graduating?', 'পড়া শেষে Slovenia-তে থাকা যায়?'),
    [
      b(
        'Yes, two routes: if a future employer starts an application for your employment permit, you can apply in-country for a further residence permit on that basis. Alternatively, you can apply for a temporary residence permit for the purpose of seeking employment or self-employment: it is open to third-country nationals who completed studies in Slovenia within the last two years and obtained at least a tertiary qualification, is valid for up to 9 months, cannot be extended, and does not itself allow you to work — only to search for work or start a sole-trader business. You must apply in person at any administrative unit, before your current permit expires; after it expires without a new lawful basis, you must leave Slovenia. The procedure is not free, but the exact fee for this specific permit type was not itemized on the page read.',
        'হ্যাঁ, দুটি পথ আছে: কোনো ভবিষ্যৎ employer আপনার employment permit-এর আবেদন শুরু করলে, তার ভিত্তিতে Slovenia-র ভেতর থেকেই নতুন residence permit-এর আবেদন করা যায়। বিকল্পভাবে, চাকরি খোঁজা বা self-employment-এর জন্য temporary residence permit-এর আবেদন করা যায়: এটা শেষ দুই বছরে Slovenia-তে পড়া শেষ করে অন্তত একটি tertiary যোগ্যতা পাওয়া non-EU নাগরিকদের জন্য খোলা, সর্বোচ্চ ৯ মাস বৈধ, extend করা যায় না, আর নিজেই কাজের অনুমতি দেয় না — শুধু চাকরি খোঁজা বা একক ব্যবসা শুরুর অনুমতি দেয়। বর্তমান permit শেষ হওয়ার আগে কোনো administrative unit-এ সশরীরে আবেদন করতে হয়; নতুন কোনো আইনি ভিত্তি ছাড়া মেয়াদ শেষ হলে Slovenia ছাড়তে হয়। প্রক্রিয়াটি বিনামূল্যে নয়, কিন্তু এই নির্দিষ্ট permit-এর সঠিক fee পড়া page-এ তালিকাভুক্ত ছিল না।',
      ),
    ],
    [SI_INFOTUJCI_JOBSEEKER],
    { status: 'partly-verified' },
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'The main Slovenian government scholarship programme for foreign nationals, Ad Futura, run by the Public Scholarship, Development, Disability and Maintenance Fund of the Republic of Slovenia, is explicitly restricted to nationals of Western Balkan states (its official page names postgraduate — master\'s or doctoral — study at Slovenian educational institutions for that group specifically). Bangladesh is not a Western Balkan state and is not named as eligible for this scholarship. No other verified Slovenian government scholarship open to Bangladeshi students, covering tuition or living costs for a degree programme, was found on the official pages read; CMEPIUS bilateral and exchange scholarships are tied to countries with a signed bilateral or exchange agreement with Slovenia, and no such agreement with Bangladesh was found. Holding a CMEPIUS/Ad Futura scholarship (where eligible) does exempt a student from tuition fees at Slovenian public universities.',
        'বিদেশি নাগরিকদের জন্য Slovenia সরকারের মূল scholarship programme, Ad Futura, যা Public Scholarship, Development, Disability and Maintenance Fund of the Republic of Slovenia চালায়, স্পষ্টভাবে Western Balkan states-এর নাগরিকদের জন্য সীমিত (এর official page বিশেষভাবে এই গ্রুপের জন্য Slovenian শিক্ষা প্রতিষ্ঠানে postgraduate — master\'s বা doctoral — পড়ার কথা বলে)। Bangladesh একটি Western Balkan state না, আর এই scholarship-এর জন্য যোগ্য বলে নামও নেই। Bangladesh-এর student-দের জন্য খোলা, degree programme-এর tuition বা থাকা-খাওয়ার খরচ কভার করা অন্য কোনো যাচাই করা Slovenian সরকারের scholarship পড়া official page-এ পাওয়া যায়নি; CMEPIUS-এর bilateral আর exchange scholarship Slovenia-র সাথে bilateral বা exchange agreement থাকা দেশের সাথে যুক্ত, আর Bangladesh-এর সাথে এমন কোনো agreement পাওয়া যায়নি। যোগ্য হলে CMEPIUS/Ad Futura scholarship থাকা student Slovenian public university-তে tuition fee থেকে exempt হন।',
      ),
    ],
    [SI_SRIPS_ADFUTURA, SI_STUDYIN_TUITION],
  );

const apply = (id: string) =>
  qa(
    id,
    b('When and how do you apply?', 'কখন আর কীভাবে আবেদন করবেন?'),
    [
      b(
        'Applications for undergraduate, master\'s and doctoral degree programmes at Slovenian public universities are submitted electronically through the national eVŠ portal (portal.evs.gov.si), but each university — often each faculty — still sets its own study programmes, entrance requirements, selection criteria and deadlines within the national application periods. A typical first application period for non-EU citizens opens around mid-February and closes around mid-March, with a second and sometimes third/fourth period running through the summer for remaining places; exact dates are reset every year in that year\'s Call for Enrolment. A new rule under the Higher Education Act (ZVIS-1, in force from 2025) requires higher education institutions to hold a direct interview with an applicant who is a citizen of a country whose nationals need a Schengen visa to cross the EU\'s external border, to assess suitability for the programme; the University of Maribor\'s own admission page describes this interview requirement explicitly. Once admitted, you receive a decision on acceptance, which you use for your residence-permit application.',
        'Slovenian public university-তে undergraduate, master\'s আর doctoral degree programme-এর আবেদন জাতীয় eVŠ portal-এ (portal.evs.gov.si) electronically জমা দিতে হয়, কিন্তু প্রতিটি university — প্রায়ই প্রতিটি faculty — জাতীয় আবেদনের সময়ের মধ্যে নিজস্ব study programme, ভর্তির শর্ত, নির্বাচনের মানদণ্ড আর শেষ তারিখ ঠিক করে। Non-EU নাগরিকদের জন্য সাধারণ প্রথম আবেদনের সময় মাঝ-February-তে শুরু হয়ে মাঝ-March-এ শেষ হয়, আর বাকি জায়গার জন্য গ্রীষ্মকাল জুড়ে দ্বিতীয় আর কখনো তৃতীয়/চতুর্থ সময় থাকে; সঠিক তারিখ প্রতি বছরের Call for Enrolment-এ নতুন করে ঠিক হয়। Higher Education Act (ZVIS-1, 2025 থেকে কার্যকর)-এর একটি নতুন নিয়মে উচ্চশিক্ষা প্রতিষ্ঠানগুলোকে এমন আবেদনকারীর সাথে সরাসরি interview নিতে হয় যিনি EU-র বাইরের সীমানা পার হতে Schengen visa লাগে এমন দেশের নাগরিক, programme-এর জন্য উপযুক্ততা যাচাই করতে; University of Maribor-এর নিজস্ব ভর্তির page এই interview-র শর্ত স্পষ্টভাবে বর্ণনা করে। ভর্তি হলে, একটি decision on acceptance পাবেন, যা residence-permit আবেদনে ব্যবহার করবেন।',
      ),
    ],
    [SI_UL_ENROLMENT, SI_UM_ADMISSION],
    { kind: 'guidance', status: 'partly-verified' },
  );

// ------------------------------------------------------------------ documents

const MOI = b('The Ministry of the Interior / administrative units (infotujci.si).', 'Ministry of the Interior আর administrative unit (infotujci.si)।');

export const SI_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Needed for the university application and as your identity document for the residence-permit application.', 'University-র আবেদনে আর residence-permit আবেদনে পরিচয়ের document হিসেবে লাগে।'),
    who: MOI,
    when: b('From the application through the whole residence-permit process.', 'আবেদন থেকে পুরো residence-permit প্রক্রিয়া পর্যন্ত।'),
    where: b('Submitted at the diplomatic mission (if applying abroad) or the administrative unit (if applying in Slovenia).', 'বিদেশে আবেদন করলে diplomatic mission-এ, Slovenia-তে করলে administrative unit-এ জমা দিতে হয়।'),
    prepare: b('Keep it valid for at least three months beyond your intended stay.', 'প্রত্যাশিত থাকার সময়ের চেয়ে অন্তত তিন মাস বেশি valid রাখুন।'),
    groups: ['general', 'visa'],
    sources: [SI_EC_STUDENT],
  },
  {
    id: 'acceptance',
    name: b('Evidence of enrolment / acceptance to study', 'ভর্তি / পড়ার acceptance-এর প্রমাণ'),
    why: b('Proves your purpose of stay for the residence-permit application; issued once your university admits you.', 'Residence-permit আবেদনে আপনার থাকার উদ্দেশ্য প্রমাণ করে; university ভর্তি করার পর ইস্যু হয়।'),
    who: b('The university or faculty you apply to.', 'যে university বা faculty-তে আবেদন করছেন।'),
    when: b('After admission, before you submit the residence-permit application.', 'ভর্তির পর, residence-permit আবেদনের আগে।'),
    where: b('Submitted with the residence-permit application.', 'Residence-permit আবেদনের সঙ্গে জমা দিতে হয়।'),
    prepare: b('An original or certified copy is required; keep a copy for your own records.', 'একটি original বা certified copy লাগে; নিজের কাছে একটি copy রাখুন।'),
    groups: ['general', 'visa'],
    sources: [SI_INFOTUJCI_STUDY],
  },
  {
    id: 'academic',
    name: b('Secondary-school or prior-degree certificates (and recognition decision)', 'Secondary-school বা আগের degree-র সনদ (আর recognition decision)'),
    why: b('University document (before admission): shows your previous education; foreign-issued certificates go through a recognition procedure at the university you apply to.', 'University-র document (ভর্তির আগে): আগের পড়া দেখায়; বিদেশে ইস্যু করা সনদ যে university-তে আবেদন করছেন তার recognition procedure-এর মধ্য দিয়ে যায়।'),
    who: b('The university/faculty you apply to.', 'যে university/faculty-তে আবেদন করছেন।'),
    when: b('With your application, by the university\'s own deadline.', 'University-র নিজস্ব শেষ তারিখের মধ্যে আবেদনের সঙ্গে।'),
    where: b('Uploaded to the national eVŠ e-application portal.', 'জাতীয় eVŠ e-application portal-এ upload করতে হয়।'),
    prepare: b('Bangladesh is not a Hague Apostille Convention country, so (per the University of Maribor\'s own description) your certificates may need verification through Bangladesh\'s Ministry of Foreign Affairs and the Slovenian diplomatic/consular mission accredited for Bangladesh, rather than a simple apostille.', 'Bangladesh কোনো Hague Apostille Convention দেশ না, তাই (University of Maribor-এর নিজস্ব বর্ণনা অনুযায়ী) আপনার সনদের একটি সরল apostille-এর বদলে Bangladesh-এর Ministry of Foreign Affairs আর Bangladesh-এর জন্য accredited Slovenian diplomatic/consular mission-এর মাধ্যমে verification লাগতে পারে।'),
    groups: ['general', 'program', 'bangladesh'],
    status: 'partly-verified',
    sources: [SI_UM_ADMISSION],
  },
  {
    id: 'english',
    name: b('English proficiency proof', 'ইংরেজি দক্ষতার প্রমাণ'),
    why: b('University document for English-taught programmes; accepted tests and minimum scores are set by each university/faculty.', 'ইংরেজি-মাধ্যম programme-এর university document; গ্রহণযোগ্য test আর ন্যূনতম score প্রতিটি university/faculty ঠিক করে।'),
    who: b('The university/faculty you apply to.', 'যে university/faculty-তে আবেদন করছেন।'),
    when: b('By the programme\'s deadline.', 'Programme-এর শেষ তারিখের মধ্যে।'),
    where: b('As instructed by the faculty\'s own admissions page.', 'Faculty-র নিজস্ব admissions page-এর নির্দেশ অনুযায়ী।'),
    prepare: b('Not verified as a single national minimum — only a few faculty-specific examples were read; check your own programme.', 'একটি একক জাতীয় ন্যূনতম হিসেবে যাচাই হয়নি — কেবল কিছু faculty-specific উদাহরণ পড়া হয়েছে; আপনার নিজের programme দেখুন।'),
    groups: ['program'],
    status: 'not-verified',
    sources: [SI_UM_ADMISSION],
  },
  {
    id: 'funds',
    name: b('Proof of sufficient means', 'পর্যাপ্ত টাকার প্রমাণ'),
    why: b('Residence-permit requirement: a bank statement, a certified parental statement, or other guarantee showing at least the Slovenian basic minimum income every month of your stay (stated by Study in Slovenia as at least EUR 494.09/month).', 'Residence-permit-এর শর্ত: bank statement, certified parental statement, বা থাকার প্রতিটি মাসের জন্য অন্তত Slovenia-র basic minimum income (Study in Slovenia অনুযায়ী অন্তত EUR 494.09/মাস) দেখানো আরেকটি নিশ্চয়তা।'),
    who: MOI,
    when: b('When you submit the application.', 'আবেদন জমার সময়।'),
    where: b('Submitted with the residence-permit application.', 'Residence-permit আবেদনের সঙ্গে জমা দিতে হয়।'),
    prepare: b('A certified and translated written statement from a legally obliged parent is accepted in place of bank statements where your home country\'s law requires parental support.', 'নিজ দেশের আইন অনুযায়ী পিতা-মাতার আইনি সহায়তার বাধ্যবাধকতা থাকলে, bank statement-এর বদলে একটি certified আর translated লিখিত parental statement গ্রহণযোগ্য।'),
    groups: ['visa', 'bangladesh'],
    status: 'partly-verified',
    sources: [SI_INFOTUJCI_STUDY, SI_STUDYIN_VISA],
  },
  {
    id: 'insurance',
    name: b('Health insurance document', 'Health insurance-এর document'),
    why: b('Residence-permit requirement: proof of adequate health insurance covering at least emergency medical services in Slovenia, if you are not already compulsorily insured there.', 'Residence-permit-এর শর্ত: Slovenia-তে compulsory insured না থাকলে, অন্তত emergency medical service কভার করা উপযুক্ত health insurance-এর প্রমাণ।'),
    who: MOI,
    when: b('When you submit the application.', 'আবেদন জমার সময়।'),
    where: b('Submitted with the residence-permit application; exchange students outside bilateral-agreement countries later arrange compulsory insurance at a ZZZS regional office.', 'Residence-permit আবেদনের সঙ্গে জমা দিতে হয়; bilateral-agreement দেশের বাইরের exchange student-রা পরে একটি ZZZS regional office-এ compulsory insurance ঠিক করেন।'),
    prepare: b('Check whether your home cover (EHIC-equivalent or bilateral-agreement form) is accepted, or whether you must join Slovenia\'s compulsory scheme and add commercial insurance for the gap.', 'আপনার নিজ দেশের insurance (EHIC-সমতুল্য বা bilateral-agreement form) গ্রহণযোগ্য কিনা, বা Slovenia-র compulsory scheme-এ যুক্ত হয়ে বাকি অংশের জন্য commercial insurance যুক্ত করতে হবে কিনা দেখুন।'),
    groups: ['visa', 'arrival'],
    status: 'partly-verified',
    sources: [SI_INFOTUJCI_STUDY, SI_STUDYIN_HEALTH],
  },
  {
    id: 'criminal-record',
    name: b('Criminal record document', 'অপরাধমুক্ত থাকার document'),
    why: b('Residence-permit requirement: a certificate from the criminal record of your home country.', 'Residence-permit-এর শর্ত: নিজ দেশের criminal record থেকে একটি সনদ।'),
    who: b('An authority of your home country (Bangladesh).', 'নিজ দেশের (Bangladesh) একটি কর্তৃপক্ষ।'),
    when: b('With the residence-permit application.', 'Residence-permit আবেদনের সঙ্গে।'),
    where: b('Submitted at the diplomatic mission or administrative unit.', 'Diplomatic mission-এ বা administrative unit-এ জমা দিতে হয়।'),
    prepare: b('Exact formal requirements (recency, legalisation, translation) were not itemized for Bangladesh specifically on the page read — ask your chosen embassy or the administrative unit.', 'সঠিক formal শর্ত (সাম্প্রতিকতা, legalisation, translation) Bangladesh-এর জন্য নির্দিষ্টভাবে পড়া page-এ তালিকাভুক্ত ছিল না — আপনার embassy বা administrative unit-কে জিজ্ঞাসা করুন।'),
    groups: ['visa', 'bangladesh'],
    status: 'partly-verified',
    sources: [SI_INFOTUJCI_STUDY],
  },
  {
    id: 'interview',
    name: b('Admission interview (higher-migration-risk countries)', 'ভর্তির interview (higher-migration-risk দেশ)'),
    why: b('A new rule (Higher Education Act, ZVIS-1, from 2025) requires a direct interview with applicants who are citizens of a country whose nationals need a Schengen visa, to assess suitability for the programme; the University of Maribor\'s own page describes this explicitly for its applicants.', 'একটি নতুন নিয়ম (Higher Education Act, ZVIS-1, 2025 থেকে) এমন আবেদনকারীর সাথে সরাসরি interview চায় যিনি Schengen visa লাগে এমন দেশের নাগরিক, programme-এর উপযুক্ততা যাচাই করতে; University of Maribor-এর নিজস্ব page তার আবেদনকারীদের জন্য এটা স্পষ্টভাবে বলে।'),
    who: b('The university/faculty you apply to.', 'যে university/faculty-তে আবেদন করছেন।'),
    when: b('During the application and selection procedure, before a decision is issued.', 'আবেদন আর নির্বাচন প্রক্রিয়ার সময়, decision ইস্যুর আগে।'),
    where: b('At the university/faculty, as scheduled by the admissions office.', 'University/faculty-তে, admissions office-এর ঠিক করা সময়ে।'),
    prepare: b('Confirmed explicitly only for the University of Maribor on the page read — check whether your chosen university applies the same rule.', 'পড়া page-এ শুধু University of Maribor-এর জন্য স্পষ্টভাবে নিশ্চিত — আপনার বাছা university একই নিয়ম প্রয়োগ করে কিনা দেখুন।'),
    groups: ['program', 'bangladesh'],
    status: 'partly-verified',
    sources: [SI_UM_ADMISSION],
  },
  {
    id: 'residence-registration',
    name: b('Registration of place of residence', 'থাকার জায়গার registration'),
    why: b('A legal obligation after arrival: register your place of residence at the nearest administrative unit within 3 days of entering Slovenia.', 'পৌঁছানোর পরে একটি আইনি বাধ্যবাধকতা: Slovenia-তে ঢোকার ৩ দিনের মধ্যে কাছের administrative unit-এ থাকার জায়গা register করা।'),
    who: b('The nearest administrative unit.', 'কাছের administrative unit।'),
    when: b('Within 3 days of entering Slovenia.', 'Slovenia-তে ঢোকার ৩ দিনের মধ্যে।'),
    where: b('At the administrative unit for your place of residence.', 'আপনার থাকার জায়গার administrative unit-এ।'),
    prepare: b('Bring proof of your accommodation (rent contract, landlord\'s statement or proof of ownership).', 'থাকার জায়গার প্রমাণ (rent contract, landlord-এর statement, বা ownership-এর প্রমাণ) সাথে আনুন।'),
    groups: ['visa', 'arrival'],
    sources: [SI_EC_STUDENT],
  },
];

// ------------------------------------------------------------------ costs (EUR, never converted)

const APP_FEE: GuideCost = { id: 'application-fee', label: b('Residence-permit administrative fee (first permit)', 'Residence-permit-এর administrative fee (প্রথম permit)'), value: b('EUR 102 if lodged abroad, or EUR 50 if lodged at an administrative unit in Slovenia, plus EUR 12 for the permit card', 'বিদেশে জমা দিলে EUR 102, Slovenia-র administrative unit-এ জমা দিলে EUR 50, সাথে permit card-এর জন্য EUR 12'), amount: { value: 50, max: 102, currency: 'EUR', period: 'one-time' }, source: SI_EC_STUDENT };
const FUNDS: GuideCost = { id: 'funds-living', label: b('Funds to show (official figure, per month)', 'দেখানোর টাকা (official figure, প্রতি মাস)'), value: b('At least EUR 494.09 a month for the academic year, per Study in Slovenia', 'শিক্ষাবর্ষের জন্য Study in Slovenia অনুযায়ী অন্তত মাসে EUR 494.09'), status: 'partly-verified', amount: { value: 494.09, currency: 'EUR', period: 'month' }, source: SI_STUDYIN_VISA };
const TUITION_BACHELORS: GuideCost = { id: 'tuition', label: b("Tuition — Bachelor's (non-EU, English- or Slovene-taught)", "Tuition — Bachelor's (non-EU, ইংরেজি বা Slovene-মাধ্যম)"), value: b('Typically EUR 2,000–11,000 a year, depending on the programme and institution', 'সাধারণত programme আর institution অনুযায়ী বছরে EUR 2,000–11,000'), status: 'partly-verified', amount: { value: 2000, max: 11000, currency: 'EUR', period: 'year' }, source: SI_STUDYIN_TUITION };
const TUITION_MASTERS: GuideCost = { id: 'tuition', label: b("Tuition — Master's (non-EU, English- or Slovene-taught)", "Tuition — Master's (non-EU, ইংরেজি বা Slovene-মাধ্যম)"), value: b('Typically EUR 2,000–15,000 a year, depending on the programme and institution', 'সাধারণত programme আর institution অনুযায়ী বছরে EUR 2,000–15,000'), status: 'partly-verified', amount: { value: 2000, max: 15000, currency: 'EUR', period: 'year' }, source: SI_STUDYIN_TUITION };
const TUITION_PHD: GuideCost = { id: 'tuition', label: b('Tuition — PhD (non-EU)', 'Tuition — PhD (non-EU)'), value: b('Typically EUR 2,000–6,000 a year, depending on the programme and institution', 'সাধারণত programme আর institution অনুযায়ী বছরে EUR 2,000–6,000'), status: 'partly-verified', amount: { value: 2000, max: 6000, currency: 'EUR', period: 'year' }, source: SI_STUDYIN_TUITION };
const UNVERIFIED: GuideCost[] = [
  { id: 'living', label: b('Living costs', 'থাকা-খাওয়ার খরচ'), value: b('Not verified from an official page — varies by city (Ljubljana differs from Maribor, Koper or Nova Gorica)', 'Official page থেকে যাচাই হয়নি — শহর অনুযায়ী আলাদা (Ljubljana Maribor, Koper বা Nova Gorica থেকে আলাদা)'), status: 'not-verified', source: SI_STUDYIN_VISA },
  { id: 'rent', label: b('Accommodation', 'বাসাভাড়া'), value: b('Not verified — depends on the city and whether you choose a student dormitory or private housing', 'যাচাই হয়নি — শহর আর student dormitory বা private housing বাছা তার উপর নির্ভর করে'), status: 'not-verified', source: SI_STUDYIN_VISA },
];

// ------------------------------------------------------------------ common sections

const commonTail = () => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [{ embed: 'costs' as const }, funds('funds')] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa('types', b('Which universities are there?', 'কোন কোন university আছে?'), [b('The examples below are Slovenian universities, listed alphabetically, not ordered by quality. Tuition, entry requirements and scholarships differ at each one — and often at each faculty — so check the official page.', 'নিচের উদাহরণগুলো Slovenian university, বর্ণানুক্রমে, মান অনুযায়ী নয়। Tuition, ভর্তির শর্ত আর scholarship প্রতিটিতে — আর প্রায়ই প্রতিটি faculty-তে — আলাদা, তাই official page দেখুন।')], [SI_STUDYIN_TUITION]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work')] },
  { id: 'visa', title: b('Residence permit', 'Residence permit'), items: [visa('visa'), extension('extension'), insurance('insurance')] },
  { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Apply through the national eVŠ portal · tuition for non-EU students in most cases', 'জাতীয় eVŠ portal-এ আবেদন · বেশিরভাগ ক্ষেত্রে non-EU student-দের tuition লাগে'),
  intro: b(
    "For an English-taught bachelor's in Slovenia you need a secondary-school certificate that qualifies you for higher education (recognised through the university's own recognition procedure), plus the university's (often faculty's) own entrance requirements (an entrance test for some programmes, an English proof for English-taught ones, possibly an admission interview). You apply through the national eVŠ e-application portal within the national application periods, pay tuition (most non-EU students are not exempt), and then apply for a temporary residence permit for studies.",
    "Slovenia-তে ইংরেজি-মাধ্যম bachelor's-এর জন্য লাগে উচ্চশিক্ষার যোগ্যতা দেয় এমন secondary-school সনদ (university-র নিজস্ব recognition procedure-এর মাধ্যমে স্বীকৃত), সঙ্গে university-র (প্রায়ই faculty-র) নিজস্ব ভর্তির শর্ত (কিছু programme-এ entrance test, ইংরেজি-মাধ্যমে English প্রমাণ, সম্ভবত একটি ভর্তির interview)। জাতীয় আবেদনের সময়ের মধ্যে জাতীয় eVŠ e-application portal-এ আবেদন করতে হয়, tuition দিতে হয় (অধিকাংশ non-EU student exempt নন), আর তারপর পড়ার জন্য temporary residence permit-এর আবেদন করতে হয়।",
  ),
  costs: { official: [APP_FEE, FUNDS], estimates: [TUITION_BACHELORS, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in Slovenia from Bangladesh?", "Bangladesh থেকে Slovenia-তে Bachelor's পড়তে কী কী লাগে?"),
          [b('A secondary-school certificate that qualifies you for higher education, a recognition decision for that certificate from the university\'s recognition procedure, the university/faculty\'s own entrance requirements (possibly an entrance test or an admission interview, since Bangladesh is a country whose nationals need a Schengen visa), an English-proficiency proof for English-taught programmes, tuition paid once admitted, proof of sufficient funds, insurance, and a temporary residence permit for studies (administrative fee EUR 50–102 plus EUR 12 for the card).', 'উচ্চশিক্ষার যোগ্যতা দেয় এমন secondary-school সনদ, university-র recognition procedure থেকে সেই সনদের recognition decision, university/faculty-র নিজস্ব ভর্তির শর্ত (সম্ভবত একটি entrance test বা ভর্তির interview, কারণ Bangladesh Schengen visa লাগে এমন দেশ), ইংরেজি-মাধ্যম programme-এর জন্য English-proficiency-র প্রমাণ, ভর্তির পর tuition দেওয়া, পর্যাপ্ত টাকার প্রমাণ, insurance, আর পড়ার জন্য temporary residence permit (administrative fee EUR 50–102, সাথে card-এর জন্য EUR 12)।'), CHECK_UNI],
          [SI_UM_ADMISSION, SI_INFOTUJCI_STUDY],
          { status: 'partly-verified' },
        ),
        qa(
          'hsc',
          b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"),
          [b('Not verified yet for Bangladesh specifically: the University of Maribor asks for a recognised national exit exam (comparable to the Slovene matura) and a recognition decision for secondary-school certificates issued abroad, but how the Bangladeshi HSC specifically is assessed in that recognition procedure was not read on an official page.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: University of Maribor একটি স্বীকৃত জাতীয় exit exam (Slovene matura-র সমতুল্য) আর বিদেশে ইস্যু করা secondary-school সনদের recognition decision চায়, কিন্তু সেই recognition procedure-এ Bangladesh-এর HSC ঠিক কীভাবে মূল্যায়ন হয়, কোনো official page-এ পড়া হয়নি।')],
          [SI_UM_ADMISSION],
          { status: 'not-verified' },
        ),
      ],
    },
    { id: 'apply', title: b('Applying', 'আবেদন'), items: [apply('process')] },
    {
      id: 'language',
      title: b('English and Slovene', 'ইংরেজি আর Slovene'),
      items: [
        qa(
          'english',
          b("How much IELTS do you need for a Bachelor's in Slovenia?", "Slovenia-তে Bachelor's-এ IELTS কত লাগে?"),
          [b('Not verified yet as a single national minimum: set by each university/faculty — the University of Maribor\'s own list only confirms which faculties require a Slovene-language exam instead (several at B1/B2/C2 level) and names one English-language requirement (B2) for a specific logistics programme. This guide covers English-taught programmes only; Slovene-taught programmes have their own Slovene-language requirement.', 'একক জাতীয় ন্যূনতম হিসেবে এখনো যাচাই হয়নি: প্রতিটি university/faculty ঠিক করে — University of Maribor-এর নিজস্ব তালিকা শুধু কোন faculty-তে Slovene-ভাষার exam লাগে (কয়েকটিতে B1/B2/C2 level) তা নিশ্চিত করে, আর একটি নির্দিষ্ট logistics programme-এর জন্য একটি English-ভাষার শর্ত (B2) দেয়। এই guide শুধু ইংরেজি-মাধ্যম programme নিয়ে; Slovene-মাধ্যম programme-এর নিজস্ব Slovene-ভাষার শর্ত আছে।'), CHECK_UNI],
          [SI_UM_ADMISSION],
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
          b("How much is a Bachelor's in Slovenia?", "Slovenia-তে Bachelor's-এ খরচ কত?"),
          [b('Non-EU/EEA students without permanent residence in Slovenia pay tuition in most cases for full-time bachelor\'s programmes: Study in Slovenia states a typical range of EUR 2,000–11,000 a year depending on the programme and institution. Tuition is waived for EU/EEA/Switzerland/Norway/Iceland/Liechtenstein citizens, citizens of Bosnia and Herzegovina, North Macedonia, Montenegro, Kosovo and Serbia (bilateral agreement), permanent residents who are tax residents of Slovenia, people with international/temporary protection, CMEPIUS/Ad Futura scholarship holders, and exchange students — none of which applies to a Bangladeshi degree-seeking applicant on the facts read.', 'Slovenia-তে স্থায়ী বসবাস না থাকা non-EU/EEA student-রা বেশিরভাগ ক্ষেত্রে full-time bachelor\'s programme-এর tuition দেন: Study in Slovenia বলে programme আর institution অনুযায়ী সাধারণ range বছরে EUR 2,000–11,000। EU/EEA/Switzerland/Norway/Iceland/Liechtenstein নাগরিক, Bosnia and Herzegovina, North Macedonia, Montenegro, Kosovo আর Serbia-র নাগরিক (bilateral agreement), Slovenia-র tax resident permanent resident, international/temporary protection পাওয়া মানুষ, CMEPIUS/Ad Futura scholarship holder, আর exchange student-দের জন্য tuition মাফ — পড়া তথ্য অনুযায়ী এর কোনোটিই Bangladesh-এর degree-seeking আবেদনকারীর জন্য প্রযোজ্য নয়।')],
          [SI_STUDYIN_TUITION, SI_UL_TUITION],
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
  card: b("Bachelor's needed · the main foreign-nationals scholarship (Ad Futura) does not name Bangladesh", "Bachelor's লাগে · মূল বিদেশি-নাগরিক scholarship (Ad Futura)-তে Bangladesh নেই"),
  intro: b(
    "A Slovenian master's needs a recognised bachelor's degree plus the university/faculty's own requirements. Each university applies through the same national eVŠ portal but sets its own tuition for non-exempt students (typically EUR 2,000–15,000 a year by programme). The Ad Futura scholarship for foreign nationals, run by the Public Scholarship, Development, Disability and Maintenance Fund of the Republic of Slovenia, covers postgraduate study but is explicitly restricted to nationals of Western Balkan states — it does not name Bangladesh.",
    "Slovenia-র master's-এ লাগে স্বীকৃত bachelor's degree সঙ্গে university/faculty-র নিজস্ব শর্ত। প্রতিটি university একই জাতীয় eVŠ portal-এ আবেদন করায়, কিন্তু exempt না থাকা student-দের নিজস্ব tuition ঠিক করে (সাধারণত programme অনুযায়ী বছরে EUR 2,000–15,000)। বিদেশি নাগরিকদের জন্য Ad Futura scholarship, যা Public Scholarship, Development, Disability and Maintenance Fund of the Republic of Slovenia চালায়, postgraduate পড়া কভার করে কিন্তু স্পষ্টভাবে Western Balkan states-এর নাগরিকদের জন্য সীমিত — এতে Bangladesh নেই।",
  ),
  costs: { official: [APP_FEE, FUNDS], estimates: [TUITION_MASTERS, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in Slovenia?", "Slovenia-তে Master's-এ কী লাগে?"),
          [b("A bachelor's degree (or equivalent) recognised through the university's recognition procedure as giving access to the programme, plus the university/faculty's own requirements (English proof, sometimes an entrance test or interview). Not verified yet for Bangladesh specifically: how Slovenian universities assess a Bangladeshi bachelor's degree in that recognition procedure was not read on an official page.", "University-র recognition procedure-এর মাধ্যমে programme-এর যোগ্যতা দেয় বলে স্বীকৃত bachelor's degree (বা সমমান), সঙ্গে university/faculty-র নিজস্ব শর্ত (English প্রমাণ, কখনো entrance test বা interview)। Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: Slovenia-র university সেই recognition procedure-এ Bangladesh-এর bachelor's degree ঠিক কীভাবে মূল্যায়ন করে, কোনো official page-এ পড়া হয়নি।"), CHECK_UNI],
          [SI_UM_ADMISSION],
          { status: 'not-verified' },
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
          [b('Not verified yet as a single national minimum for English-taught master\'s programmes — set by each university/faculty.', 'ইংরেজি-মাধ্যম master\'s programme-এর জন্য একক জাতীয় ন্যূনতম হিসেবে এখনো যাচাই হয়নি — প্রতিটি university/faculty ঠিক করে।'), CHECK_UNI],
          [SI_UM_ADMISSION],
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
          b("How much is a Master's in Slovenia?", "Slovenia-তে Master's-এ খরচ কত?"),
          [b("Study in Slovenia states a typical master's tuition range of EUR 2,000–15,000 a year depending on the programme and institution, for non-exempt (including Bangladeshi) students. The same exemption list as bachelor's level applies, and none of it covers a Bangladeshi applicant on the facts read.", "Study in Slovenia বলে non-exempt (Bangladesh-সহ) student-দের জন্য master's tuition-এর সাধারণ range programme আর institution অনুযায়ী বছরে EUR 2,000–15,000। Bachelor's level-এর একই exemption তালিকা এখানেও প্রযোজ্য, আর পড়া তথ্য অনুযায়ী এর কোনোটিই Bangladesh-এর আবেদনকারীর জন্য কভার করে না।")],
          [SI_STUDYIN_TUITION, SI_UL_TUITION],
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
  card: b('A recognised master\'s needed · doctoral tuition typically EUR 2,000–6,000/year', 'স্বীকৃত master\'s লাগে · doctoral tuition সাধারণত বছরে EUR 2,000–6,000'),
  intro: b(
    "A Slovenian PhD needs a recognised master's degree. Doctoral tuition for non-exempt students typically runs EUR 2,000–6,000 a year, by programme and institution. The Ad Futura scholarship for foreign nationals can cover doctoral study, but only for nationals of Western Balkan states — not Bangladesh. Admission, supervision and funding are otherwise arranged with each university's own doctoral school.",
    "Slovenia-র PhD-তে লাগে স্বীকৃত master's degree। Non-exempt student-দের doctoral tuition সাধারণত programme আর institution অনুযায়ী বছরে EUR 2,000–6,000। বিদেশি নাগরিকদের জন্য Ad Futura scholarship doctoral পড়া কভার করতে পারে, কিন্তু শুধু Western Balkan states-এর নাগরিকদের জন্য — Bangladesh-এর জন্য নয়। ভর্তি, supervision আর funding অন্যথায় প্রতিটি university-র নিজস্ব doctoral school-এর সঙ্গে ঠিক হয়।",
  ),
  costs: { official: [APP_FEE, FUNDS], estimates: [TUITION_PHD, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Slovenia?', 'Slovenia-তে কীভাবে PhD পাওয়া যায়?'),
          [
            b('You need a recognised master\'s degree. Apply through the national eVŠ portal to a university\'s own doctoral school; entry requirements, application rounds and supervisor arrangements beyond the general admission rules are set by each university\'s own doctoral school and were not verified here as general rules. Bangladeshi applicants are not eligible for the Ad Futura foreign-nationals scholarship, which is limited to Western Balkan states.', 'লাগে স্বীকৃত master\'s degree। জাতীয় eVŠ portal-এর মাধ্যমে university-র নিজস্ব doctoral school-এ আবেদন করুন; সাধারণ ভর্তির নিয়মের বাইরে ভর্তির শর্ত, আবেদনের সময় আর supervisor-এর ব্যবস্থা প্রতিটি university-র নিজস্ব doctoral school ঠিক করে, সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি। Bangladesh-এর আবেদনকারীরা Ad Futura foreign-nationals scholarship-এর জন্য যোগ্য নন, যা Western Balkan states-এর জন্য সীমিত।'),
            CHECK_UNI,
          ],
          [SI_SRIPS_ADFUTURA, SI_UM_ADMISSION],
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
          [SI_UM_ADMISSION],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ the country

export const SI_GUIDE: CountryGuide = {
  code: 'SI',
  checkedAt: SI_READ,
  sourcesPerSection: true,
  intro: b(
    "Slovenia has a national electronic application system (the eVŠ portal) used by every public university, but each university — often each faculty — still sets its own study programmes, entrance requirements, selection criteria and deadlines within national application periods. Non-EU/EEA students apply for a temporary residence permit for the purpose of studies (administrative fee EUR 50 in Slovenia or EUR 102 abroad, plus EUR 12 for the card) rather than a long-stay visa, need funds of at least EUR 494.09 a month plus adequate health insurance, and may work through Slovenia's \"Student Work\" system administered by Student Service agencies, though no official page read gave a specific weekly-hours cap. Tuition is charged to most non-EU/EEA students (typically EUR 2,000–11,000/year for a bachelor's) because the exemption list covers EU/EEA/Western-Balkan/bilateral-agreement citizens and scholarship holders, not Bangladesh. The main Slovenian government scholarship for foreign nationals, Ad Futura, is explicitly limited to Western Balkan states and does not name Bangladesh as eligible; no other verified Slovenian government scholarship open to Bangladeshi students was found. After graduating, you may apply once for a 9-month permit to look for work or start a business (it does not itself allow you to work). This guide is built from the Ministry of the Interior's Infotujci portal, the European Commission's Migration and Home Affairs summary, the Public Scholarship, Development, Disability and Maintenance Fund of the Republic of Slovenia, the government-backed Study in Slovenia portal, and university pages.",
    "Slovenia-র সব public university একটি জাতীয় electronic application system (eVŠ portal) ব্যবহার করে, কিন্তু প্রতিটি university — প্রায়ই প্রতিটি faculty — জাতীয় আবেদনের সময়ের মধ্যে নিজস্ব study programme, ভর্তির শর্ত, নির্বাচনের মানদণ্ড আর শেষ তারিখ ঠিক করে। EU/EEA-র বাইরের student-রা long-stay visa-র বদলে পড়ার জন্য temporary residence permit-এর আবেদন করেন (Slovenia-তে administrative fee EUR 50 বা বিদেশে EUR 102, সাথে card-এর জন্য EUR 12), অন্তত মাসে EUR 494.09 টাকা আর উপযুক্ত health insurance লাগে, আর Student Service agency-চালিত Slovenia-র \"Student Work\" system-এর মাধ্যমে কাজ করতে পারেন, যদিও পড়া কোনো official page-এ নির্দিষ্ট সাপ্তাহিক ঘণ্টার সীমা দেওয়া ছিল না। অধিকাংশ non-EU/EEA student-দের tuition দিতে হয় (bachelor's-এর জন্য সাধারণত বছরে EUR 2,000–11,000) কারণ exemption তালিকা EU/EEA/Western-Balkan/bilateral-agreement নাগরিক আর scholarship holder-দের কভার করে, Bangladesh-কে নয়। বিদেশি নাগরিকদের জন্য Slovenia সরকারের মূল scholarship, Ad Futura, স্পষ্টভাবে Western Balkan states-এর জন্য সীমিত আর Bangladesh-কে যোগ্য বলে নামে না; Bangladesh-এর student-দের জন্য খোলা অন্য কোনো যাচাই করা Slovenian সরকারের scholarship পাওয়া যায়নি। পড়া শেষে, একবার কাজ খোঁজা বা ব্যবসা শুরুর জন্য ৯-মাসের permit-এর আবেদন করা যায় (এটা নিজে কাজের অনুমতি দেয় না)। এই guide Ministry of the Interior-এর Infotujci portal, European Commission-এর Migration and Home Affairs summary, Public Scholarship, Development, Disability and Maintenance Fund of the Republic of Slovenia, government-backed Study in Slovenia portal, আর university-র page থেকে তৈরি।",
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [SI_INFOTUJCI_STUDY, SI_STUDYIN_TUITION, SI_SRIPS_ADFUTURA, SI_STUDYIN_WORK],
      {
        kind: 'guidance',
        list: [
          b('Assuming Slovenia issues a long-stay "visa D" to degree-seeking students — it only issues that visa to mobile/exchange students on programmes up to two semesters; degree-seekers need the temporary residence permit for studies instead.', 'ধরে নেওয়া যে Slovenia degree-seeking student-দের long-stay "visa D" দেয় — এটা শুধু দুই সেমিস্টার পর্যন্ত mobile/exchange student-দের দেয়; degree-seeker-দের বদলে পড়ার জন্য temporary residence permit লাগে।'),
          b('Assuming tuition is free everywhere in Slovenia like it is for EU citizens — most non-EU/EEA students, Bangladesh included, pay tuition (typically EUR 2,000–11,000/year for a bachelor\'s).', 'ধরে নেওয়া যে EU নাগরিকদের মতো Slovenia-তে সবার জন্য tuition বিনামূল্যে — Bangladesh-সহ অধিকাংশ non-EU/EEA student tuition দেন (bachelor\'s-এর জন্য সাধারণত বছরে EUR 2,000–11,000)।'),
          b('Assuming the Ad Futura scholarship (Slovenia\'s main foreign-nationals scholarship) is open to any developing country — it is explicitly limited to Western Balkan states and does not name Bangladesh.', 'ধরে নেওয়া যে Ad Futura scholarship (Slovenia-র মূল বিদেশি-নাগরিক scholarship) কোনো developing country-র জন্য খোলা — এটা স্পষ্টভাবে Western Balkan states-এর জন্য সীমিত আর Bangladesh-কে নামে না।'),
          b('Forgetting that Bangladesh is a country whose nationals need a Schengen visa, which (at the University of Maribor, confirmed on its own page) triggers a mandatory admission interview under the 2025 Higher Education Act.', 'ভুলে যাওয়া যে Bangladesh এমন একটি দেশ যার নাগরিকদের Schengen visa লাগে, যা (University of Maribor-এ, এর নিজস্ব page-এ নিশ্চিত) 2025 Higher Education Act-এর অধীনে একটি বাধ্যতামূলক ভর্তির interview তৈরি করে।'),
          b('Missing the 3-day deadline to register your place of residence at the administrative unit after entering Slovenia.', 'Slovenia-তে ঢোকার পর administrative unit-এ থাকার জায়গা register করার ৩-দিনের শেষ তারিখ মিস করা।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in Slovenia from Bangladesh?", "Bangladesh থেকে Slovenia-তে Bachelor's পড়তে কী কী লাগে?"), [b('A secondary-school certificate that qualifies you for higher education and its recognition decision, the university/faculty\'s own entrance requirements (possibly an entrance test or an admission interview, since Bangladesh needs a Schengen visa), an English proof for English-taught programmes, tuition paid once admitted, proof of sufficient funds, insurance, and a temporary residence permit for studies (EUR 50–102 plus EUR 12 for the card).', 'উচ্চশিক্ষার যোগ্যতা দেয় এমন secondary-school সনদ আর তার recognition decision, university/faculty-র নিজস্ব ভর্তির শর্ত (সম্ভবত entrance test বা ভর্তির interview, কারণ Bangladesh-এর Schengen visa লাগে), ইংরেজি-মাধ্যম programme-এর জন্য English প্রমাণ, ভর্তির পর tuition দেওয়া, পর্যাপ্ত টাকার প্রমাণ, insurance, আর পড়ার জন্য temporary residence permit (EUR 50–102, সাথে card-এর জন্য EUR 12)।')], [SI_UM_ADMISSION, SI_INFOTUJCI_STUDY], { status: 'partly-verified' }),
    qa('hsc', b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"), [b('Not verified yet for Bangladesh specifically: a recognised national exit exam and a recognition decision for your secondary-school certificate are required, but how the Bangladeshi HSC is assessed in that procedure was not read on an official page.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: একটি স্বীকৃত জাতীয় exit exam আর আপনার secondary-school সনদের recognition decision লাগে, কিন্তু সেই প্রক্রিয়ায় Bangladesh-এর HSC ঠিক কীভাবে মূল্যায়ন হয়, কোনো official page-এ পড়া হয়নি।')], [SI_UM_ADMISSION], { status: 'not-verified' }),
    qa('cost', b('How much does it cost to study in Slovenia?', 'Slovenia-তে পড়াশোনার খরচ কত?'), [b('Non-EU students, Bangladesh included, typically pay EUR 2,000–11,000 a year for a bachelor\'s, EUR 2,000–15,000 for a master\'s and EUR 2,000–6,000 for a PhD, by programme and institution. You also need funds for your residence permit (at least EUR 494.09/month, per the official figure read) and the permit fee (EUR 50–102 plus EUR 12 for the card).', 'Bangladesh-সহ non-EU student-রা সাধারণত bachelor\'s-এর জন্য বছরে EUR 2,000–11,000, master\'s-এর জন্য EUR 2,000–15,000, আর PhD-র জন্য EUR 2,000–6,000 দেন, programme আর institution অনুযায়ী। Residence permit-এর জন্যও টাকা লাগে (পড়া official figure অনুযায়ী অন্তত মাসে EUR 494.09) আর permit fee (EUR 50–102, সাথে card-এর জন্য EUR 12)।')], [SI_STUDYIN_TUITION, SI_INFOTUJCI_STUDY], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for Slovenia?', 'Slovenia-তে IELTS কত লাগে?'), [b('Not verified yet as a single national minimum; set by each university/faculty. No single figure applies to every university.', 'একক জাতীয় ন্যূনতম হিসেবে এখনো যাচাই হয়নি; প্রতিটি university/faculty ঠিক করে। সব university-তে প্রযোজ্য একক কোনো সংখ্যা নেই।')], [SI_UM_ADMISSION], { status: 'not-verified' }),
    qa('visa', b('What do you need for the residence permit?', 'Residence permit-এর জন্য কী কী লাগে?'), [b('An acceptance letter from your university, proof of sufficient funds (at least EUR 494.09/month, per the official figure read), proof of adequate health insurance, a criminal-record document, and the EUR 50–102 administrative fee plus EUR 12 for the permit card.', 'University-র acceptance letter, পর্যাপ্ত টাকার প্রমাণ (পড়া official figure অনুযায়ী অন্তত মাসে EUR 494.09), উপযুক্ত health insurance-এর প্রমাণ, অপরাধমুক্ত থাকার document, আর EUR 50–102 administrative fee, সাথে permit card-এর জন্য EUR 12।')], [SI_INFOTUJCI_STUDY], { status: 'partly-verified' }),
    qa('work', b('Can you work while studying in Slovenia?', 'Slovenia-তে পড়ার পাশাপাশি কাজ করা যায়?'), [b('Yes: residence-permit holders may work under Slovenia\'s "Student Work" system via Student Service agencies, with 15.5% deducted for pension/disability contributions and a further 22.5% as an income-tax prepayment for foreign students (refundable only where a double-taxation treaty with your home country exists). No official page read gave a specific weekly-hours cap.', 'হ্যাঁ: residence permit থাকা student-রা Student Service agency-র মাধ্যমে Slovenia-র "Student Work" system-এ কাজ করতে পারেন, pension/disability contribution-এর জন্য 15.5% কাটা হয় আর foreign student-দের জন্য আরও 22.5% income-tax prepayment হিসেবে কাটা হয় (নিজ দেশের সাথে double-taxation treaty থাকলেই ফেরত পাওয়া যায়)। পড়া কোনো official page-এ নির্দিষ্ট সাপ্তাহিক ঘণ্টার সীমা দেওয়া ছিল না।')], [SI_STUDYIN_WORK], { status: 'partly-verified' }),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('Not from Ad Futura, Slovenia\'s main foreign-nationals scholarship: its own official page restricts it to nationals of Western Balkan states for postgraduate study, and Bangladesh is not named as eligible. No other verified Slovenian government scholarship open to Bangladeshi students was found on the official pages read.', 'Ad Futura, Slovenia-র মূল বিদেশি-নাগরিক scholarship থেকে না: এর নিজস্ব official page একে postgraduate পড়ার জন্য Western Balkan states-এর নাগরিকদের জন্য সীমিত করে, আর Bangladesh-কে যোগ্য বলে নামে না। Bangladesh-এর student-দের জন্য খোলা অন্য কোনো যাচাই করা Slovenian সরকারের scholarship পড়া official page-এ পাওয়া যায়নি।')], [SI_SRIPS_ADFUTURA]),
    qa('after', b('Can you stay in Slovenia after graduating?', 'পড়া শেষে Slovenia-তে থাকা যায়?'), [b('Yes: a 9-month residence permit (not extendable) to look for work or start a business, for those who completed Slovenian tertiary studies within the last two years; it does not itself allow you to work, and you must apply in person before your current permit expires.', 'হ্যাঁ: যারা শেষ দুই বছরে Slovenia-তে tertiary পড়া শেষ করেছেন তাদের জন্য কাজ খোঁজা বা ব্যবসা শুরুর জন্য ৯-মাসের residence permit (extend করা যায় না); এটা নিজে কাজের অনুমতি দেয় না, আর বর্তমান permit শেষ হওয়ার আগে সশরীরে আবেদন করতে হয়।')], [SI_INFOTUJCI_JOBSEEKER]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('At least EUR 494.09 a month for the academic year, per the figure Study in Slovenia states, shown by bank funds, a certified parental statement, student-work earnings, employment, a scholarship or a grant from the educational organisation.', 'Study in Slovenia-র বলা পরিসংখ্যান অনুযায়ী শিক্ষাবর্ষের জন্য অন্তত মাসে EUR 494.09, bank-এর টাকা, একটি certified parental statement, student-work-এর আয়, চাকরি, scholarship, বা শিক্ষা প্রতিষ্ঠানের grant দিয়ে দেখানো যায়।')], [SI_STUDYIN_VISA]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before admission (university): passport, secondary-school/prior-degree certificates and their recognition decision, an English proof. After admission (residence permit): evidence of enrolment, proof of funds, proof of accommodation, an insurance document, a criminal-record document, and — after arrival — registration of your place of residence.', 'ভর্তির আগে (university): passport, secondary-school/আগের degree-র সনদ আর তার recognition decision, English প্রমাণ। ভর্তির পরে (residence permit): enrolment-এর প্রমাণ, টাকার প্রমাণ, থাকার জায়গার প্রমাণ, insurance document, অপরাধমুক্ত থাকার document, আর — পৌঁছানোর পরে — থাকার জায়গার registration।')], [SI_INFOTUJCI_STUDY, SI_UM_ADMISSION]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A recognised bachelor's degree and the university/faculty's own requirements; tuition for non-exempt students typically runs EUR 2,000–15,000/year, and the Ad Futura scholarship does not cover Bangladeshi applicants.", "স্বীকৃত bachelor's degree আর university/faculty-র নিজস্ব শর্ত; non-exempt student-দের tuition সাধারণত বছরে EUR 2,000–15,000, আর Ad Futura scholarship Bangladesh-এর আবেদনকারীদের কভার করে না।")], [SI_UM_ADMISSION, SI_SRIPS_ADFUTURA]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('A recognised master\'s degree; apply to a university\'s own doctoral school through the eVŠ portal. Doctoral tuition for non-exempt students typically runs EUR 2,000–6,000/year; entry rules beyond general admission are set per university (not verified here as general rules).', 'স্বীকৃত master\'s degree; eVŠ portal-এর মাধ্যমে university-র নিজস্ব doctoral school-এ আবেদন করুন। Non-exempt student-দের doctoral tuition সাধারণত বছরে EUR 2,000–6,000; সাধারণ ভর্তির বাইরে ভর্তির নিয়ম প্রতিটি university ঠিক করে (সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি)।')], [SI_UM_ADMISSION, SI_STUDYIN_TUITION], { status: 'partly-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — University of Ljubljana, University of Maribor, University of Nova Gorica and University of Primorska — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — University of Ljubljana, University of Maribor, University of Nova Gorica আর University of Primorska — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [SI_STUDYIN_TUITION]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: Bangladesh is not named as eligible for the Ad Futura foreign-nationals scholarship (limited to Western Balkan states) or for any tuition-exemption category read, so a Bangladeshi applicant should expect to pay full tuition. Bangladesh is also a country whose nationals need a Schengen visa, which — confirmed specifically for the University of Maribor — triggers a mandatory admission interview under the 2025 Higher Education Act, and Bangladesh is not a Hague Apostille Convention country, so document verification may need to go through Bangladesh\'s Ministry of Foreign Affairs and the Slovenian mission accredited for Bangladesh. How individual universities otherwise treat Bangladeshi secondary or bachelor\'s qualifications in admissions, and any Bangladesh-specific visa document list, were not verified here.', 'Bangladesh-এর জন্য যাচাই করা: Bangladesh Ad Futura-র বিদেশি-নাগরিক scholarship-এর জন্য (Western Balkan states-এর জন্য সীমিত) বা পড়া কোনো tuition-exemption বিভাগের জন্য যোগ্য বলে নামযুক্ত নয়, তাই Bangladesh-এর আবেদনকারীর পূর্ণ tuition দেওয়ার প্রত্যাশা করা উচিত। Bangladesh এমনও একটি দেশ যার নাগরিকদের Schengen visa লাগে, যা — নির্দিষ্টভাবে University of Maribor-এর জন্য নিশ্চিত — 2025 Higher Education Act-এর অধীনে একটি বাধ্যতামূলক ভর্তির interview তৈরি করে, আর Bangladesh কোনো Hague Apostille Convention দেশ না, তাই document verification Bangladesh-এর Ministry of Foreign Affairs আর Bangladesh-এর জন্য accredited Slovenian mission-এর মাধ্যমে যেতে হতে পারে। University-গুলো ভর্তিতে Bangladesh-এর secondary বা bachelor\'s যোগ্যতা অন্যথায় কীভাবে দেখে, আর কোনো Bangladesh-নির্দিষ্ট visa document তালিকা, এখানে যাচাই হয়নি।'),
    ], [SI_SRIPS_ADFUTURA, SI_UM_ADMISSION], { status: 'partly-verified' }),
  ],
  life: [
    qa('health-care', b('How does healthcare work?', 'চিকিৎসা ব্যবস্থা কেমন?'), [b('For the residence permit you need proof of insurance covering at least emergency medical services. As a student outside the EU/EEA/Switzerland/Australia/bilateral-agreement groups, you may join Slovenia\'s compulsory health insurance with a valid certificate of enrolment, or — if you are specifically an international exchange student in that position — arrange it yourself at a ZZZS regional office (current contribution EUR 126.33/month, per Study in Slovenia); adding commercial insurance for the gap is recommended since compulsory cover does not pay the full cost of care.', 'Residence permit-এর জন্য অন্তত emergency medical service কভার করা insurance-এর প্রমাণ লাগে। EU/EEA/Switzerland/Australia/bilateral-agreement গ্রুপের বাইরের student হলে, valid enrolment সনদ দিয়ে Slovenia-র compulsory health insurance-এ যুক্ত হতে পারেন, বা — specifically এই অবস্থানে থাকা international exchange student হলে — নিজেই একটি ZZZS regional office-এ এটা ঠিক করতে পারেন (Study in Slovenia অনুযায়ী বর্তমান contribution মাসে EUR 126.33); কম্প্লসরি insurance চিকিৎসার পুরো খরচ দেয় না বলে বাকি অংশের জন্য commercial insurance যুক্ত করার পরামর্শ দেওয়া হয়।')], [SI_STUDYIN_HEALTH, SI_INFOTUJCI_STUDY]),
  ],
  documents: SI_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'estimate', status: 'partly-verified', value: { min: 2000, max: 11000, unit: 'EUR/year', text: b('Typically EUR 2,000–11,000/year for a bachelor\'s for non-exempt (including Bangladeshi) students; waived for EU/EEA/Western-Balkan/bilateral-agreement citizens and scholarship holders.', 'Non-exempt (Bangladesh-সহ) student-দের জন্য bachelor\'s-এ সাধারণত বছরে EUR 2,000–11,000; EU/EEA/Western-Balkan/bilateral-agreement নাগরিক আর scholarship holder-দের জন্য মাফ।') }, source: SI_STUDYIN_TUITION },
    { id: 'funds-to-show', kind: 'fact', status: 'partly-verified', value: { min: 494.09, unit: 'EUR/month', text: b('At least EUR 494.09 a month for the academic year, per the official figure Study in Slovenia states.', 'Study in Slovenia-র বলা official figure অনুযায়ী শিক্ষাবর্ষের জন্য অন্তত মাসে EUR 494.09।') }, source: SI_STUDYIN_VISA },
    { id: 'work-during-study', kind: 'fact', status: 'partly-verified', value: { unit: 'no official hours cap found', text: b('Residence-permit holders may work via Student Service agencies ("Student Work"); 15.5% pension/disability deduction plus 22.5% income-tax prepayment for foreign students; no specific weekly-hours cap found on an official page.', 'Residence permit থাকা student-রা Student Service agency-র মাধ্যমে ("Student Work") কাজ করতে পারেন; pension/disability-র জন্য 15.5% কাটা, সাথে foreign student-দের জন্য 22.5% income-tax prepayment; কোনো official page-এ নির্দিষ্ট সাপ্তাহিক ঘণ্টার সীমা পাওয়া যায়নি।') }, source: SI_STUDYIN_WORK },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { max: 9, unit: 'months', text: b('Permit to look for work or start a business for up to 9 months, not extendable, and not itself a work permit.', 'কাজ খোঁজা বা ব্যবসা শুরুর জন্য সর্বোচ্চ ৯ মাসের permit, extend করা যায় না, আর এটা নিজে কোনো work permit না।') }, source: SI_INFOTUJCI_JOBSEEKER },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 50, max: 102, unit: 'EUR', text: b('EUR 50 if lodged at an administrative unit in Slovenia or EUR 102 if lodged abroad, for a first temporary residence permit for studies, plus EUR 12 for the card.', 'পড়ার জন্য প্রথম temporary residence permit-এর জন্য Slovenia-র administrative unit-এ জমা দিলে EUR 50 বা বিদেশে জমা দিলে EUR 102, সাথে card-এর জন্য EUR 12।') }, source: SI_EC_STUDENT },
  ],
};

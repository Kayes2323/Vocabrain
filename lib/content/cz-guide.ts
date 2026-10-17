import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  CZ_BUT_JOIN,
  CZ_CTU_ENTRANCE,
  CZ_CTU_FEL_TUITION,
  CZ_CTU_FIT_BACHELOR,
  CZ_CUNI_APPLY,
  CZ_CUNI_TUITION,
  CZ_IPC_FUNDS,
  CZ_IPC_INSURANCE,
  CZ_IPC_JOBSEEK,
  CZ_IPC_LT_PERMIT,
  CZ_IPC_LT_VISA,
  CZ_MSMT_SCHOLARSHIPS,
  CZ_MUNI_APPLY,
  CZ_MUNI_TUITION,
  CZ_MZV_SCHOLARSHIP_BD,
  CZ_READ,
  CZ_STUDYIN_VISAS,
  CZ_STUDYIN_WORK,
} from './cz-sources';

/**
 * Czech Republic reading guide, researched on its own from Czech official
 * sources (the Ministry of the Interior's Information Portal for Foreigners
 * — ipc.gov.cz, the Ministry of Foreign Affairs — mzv.gov.cz, the Ministry
 * of Education, Youth and Sports — msmt.gov.cz, the government-backed Study
 * in Czechia portal — studyin.gov.cz, and university pages). Nothing is
 * taken from another country's guide. Amounts stay in Czech korunas (CZK)
 * or euros exactly as each source states them and are never converted. It
 * covers English-taught programmes for non-EU/EEA (Bangladeshi) students;
 * the Czech Republic is an EU/Schengen member, so EU/EEA/Switzerland
 * citizens follow a separate, much lighter route noted where relevant.
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
  'Czech public universities are not identical: each one, and often each faculty, sets its own English-taught programmes, tuition fee, deadline and entrance test. Always check the exact programme on the university\'s (or faculty\'s) own admissions page.',
  'Czech-এর public university-গুলো একরকম না: প্রতিটি university, আর প্রায়ই প্রতিটি faculty, নিজের ইংরেজি-মাধ্যম programme, tuition fee, deadline আর entrance test ঠিক করে। প্রতিটি programme-এর জন্য university-র (বা faculty-র) নিজের admissions page অবশ্যই দেখে নিন।',
);

// ------------------------------------------------------------------ shared answers

const visa = (id: string) =>
  qa(
    id,
    b('What do you need for a Czech student visa or residence permit?', 'Czech student visa বা residence permit-এর জন্য কী কী লাগে?'),
    [
      b(
        'Non-EU/EEA students coming for more than 90 days apply for a long-term visa for the purpose of studies (valid up to 1 year, consular fee CZK 2,500, decided within 60 days) at a Czech embassy or consulate, or apply directly for a long-term residence permit for the purpose of studies instead — it is entirely up to you which one you apply for. Either way you need: a completed application form, a valid passport, a passport photo, an acceptance letter or confirmation of studies/enrolment from your university, proof of accommodation, proof of funds for your stay, valid travel/comprehensive medical insurance, and (for citizens 15 or older) a document similar to a criminal record certificate issued by your home country.',
        'যারা ৯০ দিনের বেশি Czechia-তে আসবেন, তাদের জন্য EU/EEA-র বাইরের student-রা পড়ার জন্য একটি long-term visa-এর আবেদন করেন (সর্বোচ্চ ১ বছর বৈধ, consular fee CZK 2,500, ৬০ দিনের মধ্যে সিদ্ধান্ত) Czech embassy বা consulate-এ, বা তার বদলে সরাসরি পড়ার জন্য long-term residence permit-এর আবেদন করতে পারেন — কোনটা আবেদন করবেন সেটা সম্পূর্ণ আপনার সিদ্ধান্ত। যেটাই হোক লাগে: পূর্ণ করা application form, valid passport, passport photo, university-র acceptance letter বা confirmation of studies/enrolment, থাকার জায়গার প্রমাণ, থাকার সময়ের টাকার প্রমাণ, valid travel/comprehensive medical insurance, আর (১৫ বছর বা তার বেশি বয়সের নাগরিকদের জন্য) নিজ দেশের ইস্যু করা অপরাধমুক্ত থাকার সনদের মতো document।',
      ),
      b(
        'EU/EEA/Switzerland citizens do not need a visa at all: enter with a valid passport or national ID card, and if you plan to stay longer than 30 days, register your place of residence with the Foreign Police within 30 working days of arrival (your dormitory may do this for you). Non-EU students must register with the Foreign Police within 3 business days of arriving in the Czech Republic.',
        'EU/EEA/Switzerland-এর নাগরিকদের visa-র কোনো প্রয়োজনই নেই: valid passport বা national ID card দিয়ে ঢুকুন, আর ৩০ দিনের বেশি থাকার পরিকল্পনা হলে পৌঁছানোর ৩০ কর্মদিনের মধ্যে Foreign Police-এর কাছে থাকার জায়গা register করুন (আপনার dormitory এটা করে দিতে পারে)। Non-EU student-দের Czech Republic-এ পৌঁছানোর ৩ কর্মদিনের মধ্যে Foreign Police-এর কাছে register করতে হয়।',
      ),
    ],
    [CZ_IPC_LT_VISA, CZ_IPC_LT_PERMIT, CZ_STUDYIN_VISAS],
    { allDegrees: true },
  );

const extension = (id: string) =>
  qa(
    id,
    b('What happens when your visa or permit is about to expire?', 'Visa বা permit-এর মেয়াদ শেষ হওয়ার কাছাকাছি হলে কী হয়?'),
    [
      b(
        'A long-term visa (including extensions) can be valid for a maximum of 1 year in total. If you want to stay longer, you must apply for a long-term residence permit instead; once on a residence permit for studies, Study in Czechia states you can usually extend it repeatedly for up to 2 years at a time as long as you continue in an accredited university programme (a language or preparatory course permit can usually be extended only once). The exact extension rules depend on your specific permit, so always check the official portal before your current one expires.',
        'একটি long-term visa (extension সহ) সর্বোচ্চ মোট ১ বছর বৈধ হতে পারে। আরও বেশি দিন থাকতে চাইলে এর বদলে long-term residence permit-এর আবেদন করতে হয়; পড়ার জন্য residence permit হয়ে গেলে, Study in Czechia বলে সাধারণত accredited university programme-এ থাকলে একবারে ২ বছর পর্যন্ত বারবার extend করা যায় (language বা preparatory course-এর permit সাধারণত একবারই extend করা যায়)। সঠিক extension নিয়ম আপনার নির্দিষ্ট permit-এর উপর নির্ভর করে, তাই বর্তমান permit শেষ হওয়ার আগে অবশ্যই official portal দেখুন।',
      ),
    ],
    [CZ_IPC_LT_VISA, CZ_STUDYIN_VISAS],
    { allDegrees: true, status: 'partly-verified' },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'The formula is tied to the Czech subsistence minimum (CZK 3,130 a month since 1 January 2023): you must prove funds of 15 times the subsistence minimum, plus 2 times the subsistence minimum for every further whole month of your stay beyond the first. For a one-year stay (1 September–31 August) that works out to CZK 115,810 (15 × 3,130 + 11 × 2 × 3,130). If you are applying for a residence permit for studies specifically, you may instead submit a commitment from your university or a public authority covering the subsistence minimum for 1 month, topped up with your own funds for the difference (capped at 6 times the subsistence minimum), or proof that the receiving institution covers all costs of your stay.',
        'এই হিসাব Czech subsistence minimum (১ January 2023 থেকে মাসে CZK 3,130)-এর সাথে যুক্ত: প্রমাণ করতে হয় subsistence minimum-এর 15 গুণ টাকা, সাথে প্রথম মাসের পরে থাকার প্রতিটি পূর্ণ মাসের জন্য subsistence minimum-এর 2 গুণ। এক বছরের থাকার জন্য (১ September–৩১ August) এটা হয় CZK 115,810 (15 × 3,130 + 11 × 2 × 3,130)। নির্দিষ্টভাবে পড়ার residence permit-এর আবেদন করলে, এর বদলে university বা কোনো public authority-র ১ মাসের subsistence minimum কভার করার commitment দিতে পারেন, বাকি অংশ নিজের টাকা দিয়ে পূরণ করে (সর্বোচ্চ subsistence minimum-এর 6 গুণ পর্যন্ত), বা প্রমাণ দিতে পারেন যে গ্রহণকারী প্রতিষ্ঠান থাকার সব খরচ কভার করবে।',
      ),
    ],
    [CZ_IPC_FUNDS],
    { allDegrees: true },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('What insurance do you need?', 'কী insurance লাগে?'),
    [
      b(
        'Since 20 September 2023 you can arrange your comprehensive travel and medical insurance with any insurance company authorised to provide it in the Czech Republic. The agreed coverage limit per insured event must be at least EUR 400,000, with no cost sharing by you. If you apply at an embassy abroad, you must show either insurance covering urgent and necessary care for your first 90 days plus a separate agreement for comprehensive insurance for the rest of your stay, or one policy covering the whole stay, before you can collect your visa. You do not need to submit a separate certificate if you are already in the Czech public health insurance system or your care is covered under an international agreement (for example Erasmus+ or Fulbright).',
        '২০ September 2023 থেকে Czech Republic-এ insurance দেওয়ার অনুমোদিত যে কোনো insurance company-র কাছে আপনার comprehensive travel আর medical insurance ঠিক করা যায়। প্রতি insured event-এ সম্মত coverage limit অন্তত EUR 400,000 হতে হবে, আপনার কোনো cost sharing ছাড়া। বিদেশে embassy-তে আবেদন করলে, visa সংগ্রহের আগে আপনাকে দেখাতে হবে প্রথম ৯০ দিনের জন্য urgent আর necessary care কভার করা insurance সাথে বাকি সময়ের জন্য আলাদা comprehensive insurance agreement, বা পুরো থাকার সময় কভার করা একটি policy। আপনি যদি আগে থেকেই Czech public health insurance system-এ থাকেন বা কোনো international agreement (যেমন Erasmus+ বা Fulbright) এর অধীনে আপনার চিকিৎসা কভার হয়, তাহলে আলাদা certificate জমা দিতে হয় না।',
      ),
    ],
    [CZ_IPC_INSURANCE],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in the Czech Republic?', 'Czech Republic-এ পড়ার পাশাপাশি কাজ করা যায়?'),
    [
      b(
        'Yes, in most cases. EU/EEA/Switzerland citizens have the same access to the labour market as Czech citizens and need no work permit. A non-EU student on a full-time, university-accredited programme does not need a separate work authorisation for a specific job either (your employer must still report the employment); exchange or short-stay students instead fall under narrower exceptions (for example, under-26s working no more than 7 consecutive days or 30 days in total per calendar year without a permit). Students often work under an Agreement on Work Performance (DPP, up to 300 hours a year for one employer) or an Agreement on Work Activity (DPČ, up to an average of 20 hours a week) rather than a full employment contract; the national minimum wage was CZK 134.40 an hour / CZK 22,400 a month as of May 2026.',
        'হ্যাঁ, বেশিরভাগ ক্ষেত্রে। EU/EEA/Switzerland-এর নাগরিকদের Czech নাগরিকদের মতোই labour market-এ প্রবেশাধিকার আছে আর কোনো work permit লাগে না। Full-time, university-accredited programme-এর non-EU student-দেরও নির্দিষ্ট কাজের জন্য আলাদা work authorisation লাগে না (তবে employer-কে employment report করতে হয়); exchange বা short-stay student-দের জন্য আলাদা, আরও সংকীর্ণ ব্যতিক্রম আছে (যেমন ২৬ বছরের কম বয়সীরা permit ছাড়া একাধারে ৭ দিন বা বছরে মোট ৩০ দিন পর্যন্ত কাজ করতে পারেন)। Student-রা প্রায়ই পূর্ণ employment contract-এর বদলে Agreement on Work Performance (DPP, এক employer-এর জন্য বছরে ৩০০ ঘণ্টা পর্যন্ত) বা Agreement on Work Activity (DPČ, সপ্তাহে গড়ে ২০ ঘণ্টা পর্যন্ত) ব্যবহার করে কাজ করেন; May 2026-এর হিসাবে জাতীয় minimum wage ছিল ঘণ্টায় CZK 134.40 / মাসে CZK 22,400।',
      ),
    ],
    [CZ_STUDYIN_WORK],
    { allDegrees: true, status: 'partly-verified' },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in the Czech Republic after graduating?', 'পড়া শেষে Czech Republic-এ থাকা যায়?'),
    [
      b(
        'Yes: if you completed a university-accredited study programme on a residence permit for studies (or completed scientific research on a research permit), you can apply for a long-term residence permit for the purpose of seeking employment or starting a business. It is valid for up to 9 months with no possibility of extension, costs a CZK 2,500 administrative fee, is decided within 60 days, and must be applied for in person at a Ministry of the Interior office before your current permit expires. While you hold it you have free access to the labour market with no limitations.',
        'হ্যাঁ: পড়ার residence permit-এ university-accredited study programme শেষ করলে (বা research permit-এ scientific research শেষ করলে), চাকরি খোঁজা বা ব্যবসা শুরুর জন্য long-term residence permit-এর আবেদন করা যায়। এটা সর্বোচ্চ ৯ মাস বৈধ, extend করা যায় না, CZK 2,500 administrative fee লাগে, ৬০ দিনের মধ্যে সিদ্ধান্ত হয়, আর বর্তমান permit শেষ হওয়ার আগে Ministry of the Interior-এর office-এ সশরীরে আবেদন করতে হয়। এটা থাকা অবস্থায় labour market-এ কোনো সীমা ছাড়াই পূর্ণ প্রবেশাধিকার থাকে।',
      ),
    ],
    [CZ_IPC_JOBSEEK, CZ_STUDYIN_WORK],
    { allDegrees: true },
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'Yes: the Government of the Czech Republic\'s scholarship for developing countries, run by the Ministry of Education, Youth and Sports with the Ministry of Foreign Affairs, names Bangladesh among its eligible countries for the 2027/2028 academic year (alongside Bosnia and Herzegovina, Georgia, Ukraine, Belarus, Ethiopia, Gabon, Mauritania, Zambia, Cambodia, Palestine, Guatemala and Honduras). It covers the standard length of full-time study at selected English-taught follow-up master\'s (2-year) and doctoral (3–4-year) programmes at Czech public universities, open to applicants from all eligible countries; a master\'s applicant must already hold a bachelor\'s degree, a doctoral applicant a master\'s degree, and every applicant for an English-medium programme must sit an online English entrance test as part of the application. The Embassy of the Czech Republic in New Delhi confirmed the scholarship is open to Bangladeshi students for Master\'s and Doctoral study in the 2027/2028 academic year, with the online application period running until 30 September 2026. There is no legal entitlement to the award, and it is not open to Czech or EU citizens or anyone already holding Czech permanent residence.',
        'হ্যাঁ: Czech Republic সরকারের developing countries-এর জন্য scholarship, Ministry of Education, Youth and Sports আর Ministry of Foreign Affairs একসাথে চালায়, 2027/2028 শিক্ষাবর্ষের জন্য যোগ্য দেশের তালিকায় Bangladesh-কে রাখে (সাথে Bosnia and Herzegovina, Georgia, Ukraine, Belarus, Ethiopia, Gabon, Mauritania, Zambia, Cambodia, Palestine, Guatemala আর Honduras)। এটা Czech public university-তে নির্বাচিত ইংরেজি-মাধ্যম follow-up master\'s (২ বছর) আর doctoral (৩–৪ বছর) programme-এ full-time পড়ার পুরো স্বাভাবিক সময় কভার করে, সব যোগ্য দেশের আবেদনকারীদের জন্য খোলা; master\'s আবেদনকারীর বাধ্যতামূলক bachelor\'s degree থাকতে হবে, doctoral আবেদনকারীর master\'s degree, আর ইংরেজি-মাধ্যম programme-এর প্রতিটি আবেদনকারীকে আবেদনের অংশ হিসেবে একটি online English entrance test দিতে হয়। New Delhi-তে Czech Republic-এর Embassy নিশ্চিত করেছে যে এই scholarship 2027/2028 শিক্ষাবর্ষে Master\'s আর Doctoral পড়ার জন্য Bangladesh-এর student-দের জন্য খোলা, online আবেদনের সময় ৩০ September 2026 পর্যন্ত। এতে কোনো আইনি অধিকার নেই, আর এটা Czech বা EU নাগরিক বা Czech permanent residence থাকা কারো জন্য খোলা নয়।',
      ),
    ],
    [CZ_MSMT_SCHOLARSHIPS, CZ_MZV_SCHOLARSHIP_BD],
  );

const apply = (id: string) =>
  qa(
    id,
    b('When and how do you apply?', 'কখন আর কীভাবে আবেদন করবেন?'),
    [
      b(
        'There is no single national joint application: most Czech public universities (Charles University, for example, has 17 independent faculties and no central admission office) run their own online application, their own deadline, their own application fee and their own entrance requirements per faculty and programme. Once admitted, you receive a letter of acceptance (and, for the government scholarship route, a scholarship decision) that you use for your visa or residence-permit application. Some Czech universities nominate eligible non-EU students for the Student Facilitation Programme ("Režim Student"), which gets you a faster embassy appointment — you cannot apply for it yourself; your university nominates you.',
        'কোনো একক জাতীয় joint application নেই: Czech-এর অধিকাংশ public university (যেমন Charles University-র ১৭টি independent faculty আছে আর কোনো central admission office নেই) নিজস্ব online application, নিজস্ব deadline, নিজস্ব application fee আর প্রতিটি faculty আর programme অনুযায়ী নিজস্ব ভর্তির শর্ত চালায়। ভর্তি হলে, আপনি letter of acceptance পান (আর সরকারি scholarship route-এ, একটি scholarship decision) যা visa বা residence-permit আবেদনে ব্যবহার করবেন। কিছু Czech university যোগ্য non-EU student-দের Student Facilitation Programme ("Režim Student")-এর জন্য নমিনেট করে, যা embassy-তে দ্রুত appointment পাইয়ে দেয় — নিজে এর আবেদন করা যায় না; university আপনাকে নমিনেট করে।',
      ),
    ],
    [CZ_CUNI_APPLY, CZ_STUDYIN_VISAS],
    { kind: 'guidance' },
  );

// ------------------------------------------------------------------ documents

const MOI = b('The Ministry of the Interior (visa and residence-permit office; cizinci.cz / ipc.gov.cz).', 'Ministry of the Interior (visa আর residence-permit office; cizinci.cz / ipc.gov.cz)।');

export const CZ_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Needed for the university application and as your identity document for the visa or residence-permit application.', 'University-র আবেদনে আর visa বা residence-permit আবেদনে পরিচয়ের document হিসেবে লাগে।'),
    who: MOI,
    when: b('From the application through the whole visa or residence-permit process.', 'আবেদন থেকে পুরো visa বা residence-permit প্রক্রিয়া পর্যন্ত।'),
    where: b('Submitted at the diplomatic mission (if applying abroad) or the Ministry of the Interior office (if applying in Czechia).', 'Diplomatic mission-এ (বিদেশে আবেদন করলে) বা Ministry of the Interior office-এ (Czechia-তে আবেদন করলে) জমা দিতে হয়।'),
    prepare: b('Keep it valid for well beyond your expected stay.', 'প্রত্যাশিত থাকার সময়ের চেয়ে বেশি সময় ধরে valid রাখুন।'),
    groups: ['general', 'visa'],
    sources: [CZ_IPC_LT_VISA],
  },
  {
    id: 'acceptance',
    name: b('Confirmation of studies / acceptance letter', 'পড়ার confirmation / acceptance letter'),
    why: b('Proves your purpose of stay for the visa or residence-permit application; issued once your university admits you.', 'Visa বা residence-permit আবেদনে আপনার থাকার উদ্দেশ্য প্রমাণ করে; university ভর্তি করার পর ইস্যু হয়।'),
    who: b('The university you apply to.', 'যে university-তে আবেদন করছেন।'),
    when: b('After admission, before you submit the visa/permit application.', 'ভর্তির পর, visa/permit আবেদনের আগে।'),
    where: b('Submitted with the visa or residence-permit application.', 'Visa বা residence-permit আবেদনের সঙ্গে জমা দিতে হয়।'),
    prepare: b('An original is required; keep a copy for your own records.', 'একটি original লাগে; নিজের কাছে একটি copy রাখুন।'),
    groups: ['general', 'visa'],
    sources: [CZ_IPC_LT_VISA],
  },
  {
    id: 'academic',
    name: b('Certificates and transcripts', 'সনদ আর transcript'),
    why: b('University document (before admission): shows your previous education and is used for academic recognition at your chosen faculty.', 'University-র document (ভর্তির আগে): আগের পড়া দেখায় আর আপনার faculty-তে academic recognition-এ ব্যবহার হয়।'),
    who: b('The university/faculty you apply to.', 'যে university/faculty-তে আবেদন করছেন।'),
    when: b('With your application, by the faculty\'s own deadline.', 'Faculty-র নিজস্ব শেষ তারিখের মধ্যে আবেদনের সঙ্গে।'),
    where: b('Uploaded to the university\'s own online application system.', 'University-র নিজস্ব online application system-এ upload।'),
    prepare: b('Documents not in Czech or English usually need an official/certified translation; foreign-issued documents may need an assessment of previous education.', 'Czech বা ইংরেজিতে না থাকলে সাধারণত official/certified translation লাগে; বিদেশে ইস্যু করা document-এ আগের পড়ার assessment লাগতে পারে।'),
    groups: ['general', 'program'],
    sources: [CZ_CTU_ENTRANCE],
  },
  {
    id: 'english',
    name: b('English proficiency proof', 'ইংরেজি দক্ষতার প্রমাণ'),
    why: b('University document for English-taught programmes; accepted tests and minimum scores are set by each university/faculty (for example Masaryk\'s Faculty of Social Studies accepts IELTS Academic/General 5.5–6.5, TOEFL iBT 72, telc B2 or similar, at B2 level).', 'ইংরেজি-মাধ্যম programme-এর university document; গ্রহণযোগ্য test আর ন্যূনতম score প্রতিটি university/faculty ঠিক করে (যেমন Masaryk-এর Faculty of Social Studies IELTS Academic/General 5.5–6.5, TOEFL iBT 72, telc B2 বা সমমান B2 level গ্রহণ করে)।'),
    who: b('The university/faculty you apply to.', 'যে university/faculty-তে আবেদন করছেন।'),
    when: b('By the programme\'s deadline.', 'Programme-এর শেষ তারিখের মধ্যে।'),
    where: b('As instructed by the faculty\'s own admissions page.', 'Faculty-র নিজস্ব admissions page-এর নির্দেশ অনুযায়ী।'),
    prepare: b('IELTS, TOEFL and telc are commonly accepted, but the exact list and minimum score is set per university/faculty — check before applying.', 'IELTS, TOEFL আর telc সাধারণত গ্রহণযোগ্য, কিন্তু সঠিক তালিকা আর ন্যূনতম score প্রতিটি university/faculty ঠিক করে — আবেদনের আগে দেখে নিন।'),
    groups: ['program'],
    sources: [CZ_MUNI_APPLY],
  },
  {
    id: 'funds',
    name: b('Proof of funds', 'টাকার প্রমাণ'),
    why: b('Visa or residence-permit requirement: a bank statement, a university/public-authority commitment, or proof the receiving organisation covers your costs, showing enough money tied to the Czech subsistence minimum.', 'Visa বা residence-permit-এর শর্ত: bank statement, university/public-authority-র commitment, বা প্রমাণ যে গ্রহণকারী প্রতিষ্ঠান খরচ কভার করবে, যা Czech subsistence minimum-এর সাথে যুক্ত পর্যাপ্ত টাকা দেখায়।'),
    who: MOI,
    when: b('When you submit the application.', 'আবেদন জমার সময়।'),
    where: b('Submitted with the visa or residence-permit application.', 'Visa বা residence-permit আবেদনের সঙ্গে জমা দিতে হয়।'),
    prepare: b('The exact amount moves with the subsistence minimum and your stay\'s length — use the official calculation, not a flat figure, before applying.', 'সঠিক পরিমাণ subsistence minimum আর থাকার সময়ের সাথে বদলায় — আবেদনের আগে একটি স্থির সংখ্যার বদলে official হিসাব ব্যবহার করুন।'),
    groups: ['visa', 'bangladesh'],
    sources: [CZ_IPC_FUNDS],
  },
  {
    id: 'insurance',
    name: b('Health insurance document', 'Health insurance-এর document'),
    why: b('Visa or residence-permit requirement: travel/comprehensive medical insurance covering at least EUR 400,000 per insured event, with no cost sharing.', 'Visa বা residence-permit-এর শর্ত: প্রতি insured event-এ অন্তত EUR 400,000 কভার করা, কোনো cost sharing ছাড়া travel/comprehensive medical insurance।'),
    who: MOI,
    when: b('Before collecting a visa issued abroad, or with an application filed inside the Czech Republic.', 'বিদেশে ইস্যু করা visa সংগ্রহের আগে, বা Czech Republic-এর ভেতর থেকে জমা দেওয়া আবেদনের সঙ্গে।'),
    where: b('Shown at the diplomatic mission or the Ministry of the Interior office.', 'Diplomatic mission-এ বা Ministry of the Interior office-এ দেখাতে হয়।'),
    prepare: b('Arrange it with any insurer authorised to operate in the Czech Republic; check whether you need a separate first-90-days policy if applying from abroad.', 'Czech Republic-এ কাজ করার অনুমতিপ্রাপ্ত যে কোনো insurer-এর সাথে ঠিক করুন; বিদেশ থেকে আবেদন করলে প্রথম ৯০ দিনের জন্য আলাদা policy লাগে কিনা দেখুন।'),
    groups: ['visa', 'arrival'],
    sources: [CZ_IPC_INSURANCE],
  },
  {
    id: 'criminal-record',
    name: b('Criminal record document', 'অপরাধমুক্ত থাকার document'),
    why: b('Visa requirement for applicants 15 or older: a document similar to a criminal record certificate, issued by your own country.', '১৫ বছর বা তার বেশি বয়সী আবেদনকারীদের visa-র শর্ত: নিজ দেশের ইস্যু করা অপরাধমুক্ত থাকার সনদের মতো document।'),
    who: b('An authority of your home country (Bangladesh).', 'নিজ দেশের (Bangladesh) একটি কর্তৃপক্ষ।'),
    when: b('With the long-term visa application.', 'Long-term visa আবেদনের সঙ্গে।'),
    where: b('Submitted at the diplomatic mission.', 'Diplomatic mission-এ জমা দিতে হয়।'),
    prepare: b('Exact formal requirements (recency, legalisation, translation) were not itemized for Bangladesh specifically on the page read — ask your chosen embassy.', 'সঠিক formal শর্ত (সাম্প্রতিকতা, legalisation, translation) Bangladesh-এর জন্য নির্দিষ্টভাবে পড়া page-এ তালিকাভুক্ত ছিল না — আপনার embassy-কে জিজ্ঞাসা করুন।'),
    groups: ['visa', 'bangladesh'],
    status: 'partly-verified',
    sources: [CZ_IPC_LT_VISA],
  },
  {
    id: 'research',
    name: b('Doctoral application documents (PhD)', 'Doctoral আবেদনের document (PhD)'),
    why: b('Doctoral admission requirements (research proposal, supervisor agreement) are decided by each university\'s own doctoral programme.', 'Doctoral ভর্তির শর্ত (research proposal, supervisor agreement) প্রতিটি university-র নিজস্ব doctoral programme ঠিক করে।'),
    who: b('The university\'s doctoral programme.', 'University-র doctoral programme।'),
    when: b('By the doctoral programme\'s own deadline.', 'Doctoral programme-এর নিজস্ব শেষ তারিখের মধ্যে।'),
    where: b('The university\'s doctoral admissions page.', 'University-র doctoral admissions page।'),
    prepare: b('Not verified here as a general rule — follow the programme.', 'সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি — programme অনুসরণ করুন।'),
    groups: ['program'],
    degrees: ['phd'],
    status: 'not-verified',
    sources: [CZ_CTU_ENTRANCE],
  },
  {
    id: 'residence-registration',
    name: b('Registration with the Foreign Police', 'Foreign Police-এর কাছে registration'),
    why: b('A legal obligation after arrival: non-EU students register within 3 business days, EU/EEA/Switzerland students (staying over 30 days) within 30 working days.', 'পৌঁছানোর পরে একটি আইনি বাধ্যবাধকতা: non-EU student-রা ৩ কর্মদিনের মধ্যে, EU/EEA/Switzerland student-রা (৩০ দিনের বেশি থাকলে) ৩০ কর্মদিনের মধ্যে register করেন।'),
    who: b('The Foreign Police (often done for you by a dormitory).', 'Foreign Police (প্রায়ই dormitory আপনার জন্য করে দেয়)।'),
    when: b('Immediately after arrival.', 'পৌঁছানোর সঙ্গে সঙ্গেই।'),
    where: b('At a Foreign Police office, or automatically by your accommodation provider.', 'Foreign Police office-এ, বা আপনার accommodation provider স্বয়ংক্রিয়ভাবে।'),
    prepare: b('Check with your dormitory or landlord first — many register you automatically.', 'প্রথমে আপনার dormitory বা landlord-এর কাছে জিজ্ঞাসা করুন — অনেকেই স্বয়ংক্রিয়ভাবে register করে দেয়।'),
    groups: ['visa', 'arrival'],
    sources: [CZ_STUDYIN_VISAS],
  },
];

// ------------------------------------------------------------------ costs (CZK/EUR, never converted)

const APP_FEE: GuideCost = { id: 'application-fee', label: b('University application fee (example: CTU)', 'University-র application fee (উদাহরণ: CTU)'), value: b('CZK 950 per application', 'প্রতি আবেদনে CZK 950'), amount: { value: 950, currency: 'CZK', period: 'one-time' }, source: CZ_CTU_ENTRANCE };
const VISA_FEE: GuideCost = { id: 'visa-fee', label: b('Long-term visa for studies (consular fee)', 'পড়ার long-term visa (consular fee)'), value: b('CZK 2,500', 'CZK 2,500'), amount: { value: 2500, currency: 'CZK', period: 'one-time' }, source: CZ_IPC_LT_VISA };
const FUNDS: GuideCost = { id: 'funds-living', label: b('Funds to show (official formula, one academic year)', 'দেখানোর টাকা (official formula, এক শিক্ষাবর্ষ)'), value: b('CZK 115,810 for a one-year stay (15 + 11×2 times the CZK 3,130/month subsistence minimum)', 'এক বছরের থাকার জন্য CZK 115,810 (CZK 3,130/মাস subsistence minimum-এর 15 + 11×2 গুণ)'), amount: { value: 115810, currency: 'CZK', period: 'year' }, source: CZ_IPC_FUNDS };
const TUITION_CZECH: GuideCost = { id: 'tuition-czech', label: b('Tuition for Czech-taught programmes (all degree levels)', 'Czech-মাধ্যম programme-এর tuition (সব degree level)'), value: b('Free of charge for the standard length of study plus one year, at Czech public universities, for any nationality', 'Czech-এর public university-তে, যে কোনো জাতীয়তার জন্য, পড়ার স্বাভাবিক সময় + এক বছর পর্যন্ত বিনা খরচে'), amount: { value: 0, currency: 'CZK', period: 'year' }, source: CZ_CUNI_TUITION };
const TUITION_BACHELORS: GuideCost = { id: 'tuition', label: b("Tuition — Bachelor's, English-taught (examples)", "Tuition — Bachelor's, ইংরেজি-মাধ্যম (উদাহরণ)"), value: b('From around CZK 64,000 a semester (CTU, Faculty of Information Technology) to CZK 110,000 a year (CTU, Faculty of Electrical Engineering); Charles University states a EUR 40–30,620 a year range across all its English-taught programmes', 'প্রায় CZK 64,000/সেমিস্টার (CTU, Faculty of Information Technology) থেকে CZK 110,000/বছর (CTU, Faculty of Electrical Engineering) পর্যন্ত; Charles University তার সব ইংরেজি-মাধ্যম programme জুড়ে EUR 40–30,620/বছর একটি range বলে'), status: 'partly-verified', amount: { value: 64000, max: 110000, currency: 'CZK', period: 'year' }, source: CZ_CUNI_TUITION };
const TUITION_MASTERS: GuideCost = { id: 'tuition', label: b("Tuition — Master's, English-taught (examples)", "Tuition — Master's, ইংরেজি-মাধ্যম (উদাহরণ)"), value: b('From around CZK 132,000 a year (CTU, Faculty of Electrical Engineering) to EUR 3,000–14,000 a year at Masaryk University faculties, by programme', 'প্রায় CZK 132,000/বছর (CTU, Faculty of Electrical Engineering) থেকে Masaryk University-র faculty অনুযায়ী EUR 3,000–14,000/বছর পর্যন্ত, programme অনুযায়ী'), status: 'partly-verified', amount: { value: 132000, currency: 'CZK', period: 'year' }, source: CZ_MUNI_TUITION };
const TUITION_PHD: GuideCost = { id: 'tuition', label: b('Tuition — PhD, English-taught (example)', 'Tuition — PhD, ইংরেজি-মাধ্যম (উদাহরণ)'), value: b('CZK 1,000 a year at CTU\'s Faculty of Electrical Engineering; doctoral fees elsewhere were not itemized on the pages read, and the Czech government scholarship can cover doctoral tuition for Bangladeshi applicants', "CTU-র Faculty of Electrical Engineering-এ বছরে CZK 1,000; অন্য জায়গার doctoral fee পড়া page-এ তালিকাভুক্ত ছিল না, আর Czech সরকারের scholarship Bangladesh-এর আবেদনকারীদের জন্য doctoral tuition কভার করতে পারে"), status: 'partly-verified', amount: { value: 1000, currency: 'CZK', period: 'year' }, source: CZ_CTU_FIT_BACHELOR };
const UNVERIFIED: GuideCost[] = [
  { id: 'living', label: b('Living costs', 'থাকা-খাওয়ার খরচ'), value: b('Not verified from an official page — varies by city (Prague and Brno differ from smaller towns)', 'Official page থেকে যাচাই হয়নি — শহর অনুযায়ী আলাদা (Prague আর Brno ছোট শহর থেকে আলাদা)'), status: 'not-verified', source: CZ_STUDYIN_VISAS },
  { id: 'rent', label: b('Accommodation', 'বাসাভাড়া'), value: b('Not verified — depends on the city and whether you choose a university dormitory or private housing', 'যাচাই হয়নি — শহর আর university dormitory বা private housing বাছা তার উপর নির্ভর করে'), status: 'not-verified', source: CZ_STUDYIN_VISAS },
];

// ------------------------------------------------------------------ common sections

const commonTail = () => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [{ embed: 'costs' as const }, funds('funds')] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa('types', b('Which universities are there?', 'কোন কোন university আছে?'), [b('The examples below are Czech public universities, listed alphabetically, not ordered by quality. Tuition, entry requirements and scholarships differ at each one — and often at each faculty — so check the official page.', 'নিচের উদাহরণগুলো Czech-এর public university, বর্ণানুক্রমে, মান অনুযায়ী নয়। Tuition, ভর্তির শর্ত আর scholarship প্রতিটিতে — আর প্রায়ই প্রতিটি faculty-তে — আলাদা, তাই official page দেখুন।')], [CZ_CUNI_TUITION]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work')] },
  { id: 'visa', title: b('Visa and residence permit', 'Visa আর residence permit'), items: [visa('visa'), extension('extension'), insurance('insurance')] },
  { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('No national joint application · Czech-taught programmes are free', 'কোনো জাতীয় joint application নেই · Czech-মাধ্যম programme বিনা খরচে'),
  intro: b(
    "For an English-taught bachelor's in the Czech Republic you need a secondary-school certificate that qualifies you for higher education, plus the university's (often faculty's) own requirements (an entrance exam or exemption, an English proof, an application fee). You apply directly to each university/faculty's own online system (there is no national joint application), pay the application fee and tuition, and then apply for a long-term visa or residence permit for studies.",
    "Czech Republic-এ ইংরেজি-মাধ্যম bachelor's-এর জন্য লাগে উচ্চশিক্ষার যোগ্যতা দেয় এমন secondary-school সনদ, সঙ্গে university-র (প্রায়ই faculty-র) নিজস্ব শর্ত (entrance exam বা exemption, English প্রমাণ, application fee)। আবেদন করতে হয় সরাসরি প্রতিটি university/faculty-র নিজস্ব online system-এ (কোনো জাতীয় joint application নেই), application fee আর tuition দিয়ে, আর তারপর পড়ার জন্য long-term visa বা residence permit-এর আবেদন করে।",
  ),
  costs: { official: [VISA_FEE, FUNDS, APP_FEE], estimates: [TUITION_CZECH, TUITION_BACHELORS, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in the Czech Republic from Bangladesh?", "Bangladesh থেকে Czech Republic-এ Bachelor's পড়তে কী কী লাগে?"),
          [b('A secondary-school certificate that qualifies you for higher education, the university/faculty\'s own entrance requirements (an entrance exam or scored national test, or an exemption), an English-proficiency proof for English-taught programmes, the admission-procedure fee (around CZK 950 at CTU), tuition paid once admitted, proof of funds, insurance, and a long-term visa or residence permit for studies (consular/administrative fee CZK 2,500).', 'উচ্চশিক্ষার যোগ্যতা দেয় এমন secondary-school সনদ, university/faculty-র নিজস্ব ভর্তির শর্ত (entrance exam বা score করা জাতীয় test, বা exemption), ইংরেজি-মাধ্যম programme-এর জন্য English-proficiency-র প্রমাণ, admission-procedure fee (CTU-তে প্রায় CZK 950), ভর্তির পর tuition দেওয়া, টাকার প্রমাণ, insurance, আর পড়ার জন্য long-term visa বা residence permit (consular/administrative fee CZK 2,500)।'), CHECK_UNI],
          [CZ_CTU_ENTRANCE, CZ_CTU_FIT_BACHELOR, CZ_IPC_LT_VISA],
        ),
        qa(
          'hsc',
          b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"),
          [b('Not verified yet for Bangladesh specifically: CTU asks for "a certificate of successful graduation from a secondary school" and may require an assessment of previous foreign education, but how the Bangladeshi HSC specifically is assessed, and whether a national entrance test or scored exam is also required for a Bangladeshi applicant, was not read on an official page.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: CTU "secondary school থেকে সফল graduation-এর সনদ" চায় আর আগের বিদেশি পড়ার assessment লাগতে পারে, কিন্তু Bangladesh-এর HSC ঠিক কীভাবে মূল্যায়ন হয়, আর Bangladesh-এর আবেদনকারীর জন্য জাতীয় entrance test বা score করা পরীক্ষাও লাগে কিনা, কোনো official page-এ পড়া হয়নি।')],
          [CZ_CTU_ENTRANCE],
          { status: 'not-verified' },
        ),
      ],
    },
    { id: 'apply', title: b('Applying', 'আবেদন'), items: [apply('process')] },
    {
      id: 'language',
      title: b('English and Czech', 'ইংরেজি আর Czech'),
      items: [
        qa(
          'english',
          b("How much IELTS do you need for a Bachelor's in the Czech Republic?", "Czech Republic-এ Bachelor's-এ IELTS কত লাগে?"),
          [b("Set by each university/faculty: Masaryk University's Faculty of Social Studies, for example, accepts a B2-level IELTS Academic or General score of 5.5–6.5, TOEFL iBT 72, telc English B2 or equivalent, for its English-taught bachelor's programmes. Other faculties set their own list. This guide covers English-taught programmes only; Czech-taught programmes have their own Czech-language requirement (and are tuition-free).", "প্রতিটি university/faculty নিজে ঠিক করে: যেমন Masaryk University-র Faculty of Social Studies তার ইংরেজি-মাধ্যম bachelor's programme-এর জন্য B2-level IELTS Academic বা General score 5.5–6.5, TOEFL iBT 72, telc English B2 বা সমমান গ্রহণ করে। অন্য faculty নিজস্ব তালিকা ঠিক করে। এই guide শুধু ইংরেজি-মাধ্যম programme নিয়ে; Czech-মাধ্যম programme-এর নিজস্ব Czech-ভাষার শর্ত আছে (আর tuition-free)।"), CHECK_UNI],
          [CZ_MUNI_APPLY],
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
          b("How much is a Bachelor's in the Czech Republic?", "Czech Republic-এ Bachelor's-এ খরচ কত?"),
          [b('Czech-taught bachelor\'s programmes are free of charge at public universities, for any nationality, for the standard length of study plus one year. English-taught programmes charge fees set per university and faculty: examples read range from around CZK 64,000 a semester at CTU\'s Faculty of Information Technology to CZK 110,000 a year at its Faculty of Electrical Engineering, while Charles University states its English-taught programmes overall cost between EUR 40 and EUR 30,620 a year depending on the programme.', "Czech-মাধ্যম bachelor's programme public university-তে, যে কোনো জাতীয়তার জন্য, পড়ার স্বাভাবিক সময় + এক বছর পর্যন্ত বিনা খরচে। ইংরেজি-মাধ্যম programme-এর fee প্রতিটি university আর faculty ঠিক করে: পড়া উদাহরণ অনুযায়ী CTU-র Faculty of Information Technology-তে প্রায় CZK 64,000/সেমিস্টার থেকে এর Faculty of Electrical Engineering-এ বছরে CZK 110,000 পর্যন্ত, আর Charles University বলে এর ইংরেজি-মাধ্যম programme-গুলোর খরচ সামগ্রিকভাবে programme অনুযায়ী বছরে EUR 40 থেকে EUR 30,620-এর মধ্যে।")],
          [CZ_CUNI_TUITION, CZ_CTU_FIT_BACHELOR, CZ_CTU_FEL_TUITION],
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
  card: b("Bachelor's needed · the Czech government scholarship names Bangladesh", "Bachelor's লাগে · Czech সরকারের scholarship-তে Bangladesh আছে"),
  intro: b(
    "A Czech master's needs a recognised bachelor's degree plus the university/faculty's own requirements. Each university runs its own application and sets its own tuition for English-taught programmes (English-taught fees vary widely by faculty, from about EUR 1,000 to EUR 14,000 a year in the examples read); Czech-taught programmes stay tuition-free. The Czech Government's scholarship for developing countries names Bangladesh as an eligible country for selected English-taught master's programmes, covering the standard 2-year length of study.",
    "Czech-এর master's-এ লাগে স্বীকৃত bachelor's degree সঙ্গে university/faculty-র নিজস্ব শর্ত। প্রতিটি university নিজস্ব আবেদন চালায় আর ইংরেজি-মাধ্যম programme-এর নিজস্ব tuition ঠিক করে (পড়া উদাহরণে ইংরেজি-মাধ্যম fee faculty অনুযায়ী প্রায় EUR 1,000 থেকে EUR 14,000/বছর পর্যন্ত আলাদা); Czech-মাধ্যম programme tuition-free থাকে। Czech সরকারের developing countries-এর scholarship নির্বাচিত ইংরেজি-মাধ্যম master's programme-এর জন্য Bangladesh-কে যোগ্য দেশ হিসেবে নামে, যা পড়ার স্বাভাবিক ২-বছরের সময় কভার করে।",
  ),
  costs: { official: [VISA_FEE, FUNDS, APP_FEE], estimates: [TUITION_CZECH, TUITION_MASTERS, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in the Czech Republic?", "Czech Republic-এ Master's-এ কী লাগে?"),
          [b("A bachelor's degree (or equivalent) recognised as giving access to the programme, plus the university/faculty's own requirements (English proof, sometimes an entrance exam or interview). How Czech universities assess a Bangladeshi bachelor's degree specifically was not verified here.", "Programme-এর যোগ্যতা দেয় বলে স্বীকৃত bachelor's degree (বা সমমান), সঙ্গে university/faculty-র নিজস্ব শর্ত (English প্রমাণ, কখনো entrance exam বা interview)। Czech-এর university Bangladesh-এর bachelor's degree ঠিক কীভাবে মূল্যায়ন করে, এখানে যাচাই হয়নি।"), CHECK_UNI],
          [CZ_CTU_ENTRANCE],
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
          [b('Set by each university/faculty, with no single national minimum for master\'s programmes; applicants for the Czech government scholarship\'s English-medium master\'s route must instead pass the scholarship\'s own online English entrance test.', 'প্রতিটি university/faculty ঠিক করে; master\'s programme-এর জন্য একক জাতীয় ন্যূনতম নেই; Czech সরকারের scholarship-এর ইংরেজি-মাধ্যম master\'s route-এর আবেদনকারীদের বরং scholarship-এর নিজস্ব online English entrance test দিতে হয়।'), CHECK_UNI],
          [CZ_MSMT_SCHOLARSHIPS],
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
          b("How much is a Master's in the Czech Republic?", "Czech Republic-এ Master's-এ খরচ কত?"),
          [b("English-taught master's fees vary widely by university and faculty: examples read range from about CZK 132,000 a year at CTU's Faculty of Electrical Engineering to EUR 3,000–14,000 a year across Masaryk University's faculties, by programme. Czech-taught master's programmes remain tuition-free for any nationality.", "ইংরেজি-মাধ্যম master's fee university আর faculty অনুযায়ী ব্যাপকভাবে আলাদা: পড়া উদাহরণ CTU-র Faculty of Electrical Engineering-এ বছরে প্রায় CZK 132,000 থেকে Masaryk University-র faculty-তে programme অনুযায়ী বছরে EUR 3,000–14,000 পর্যন্ত। Czech-মাধ্যম master's programme যে কোনো জাতীয়তার জন্য tuition-free থাকে।")],
          [CZ_CTU_FEL_TUITION, CZ_MUNI_TUITION],
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
  card: b('The Czech government scholarship covers doctoral tuition for Bangladeshi applicants', 'Czech সরকারের scholarship Bangladesh-এর আবেদনকারীদের doctoral tuition কভার করে'),
  intro: b(
    "A Czech PhD needs a recognised master's degree. The Czech Government's scholarship for developing countries names Bangladesh as eligible for selected English-taught doctoral programmes (3–4 years), covering the standard length of study; outside that scholarship, paid doctoral places also exist, with fees as low as CZK 1,000 a year in the one example read (CTU's Faculty of Electrical Engineering). Admission, supervision and funding are otherwise arranged with each university's own doctoral programme.",
    "Czech-এর PhD-তে লাগে স্বীকৃত master's degree। Czech সরকারের developing countries-এর scholarship নির্বাচিত ইংরেজি-মাধ্যম doctoral programme-এর (৩–৪ বছর) জন্য Bangladesh-কে যোগ্য দেশ হিসেবে নামে, যা পড়ার স্বাভাবিক সময় কভার করে; এই scholarship-এর বাইরেও paid doctoral জায়গা আছে, পড়া একমাত্র উদাহরণে (CTU-র Faculty of Electrical Engineering) fee বছরে CZK 1,000-এর মতো কম। ভর্তি, supervision আর funding অন্যথায় প্রতিটি university-র নিজস্ব doctoral programme-এর সঙ্গে ঠিক হয়।",
  ),
  costs: { official: [VISA_FEE, FUNDS], estimates: [TUITION_CZECH, TUITION_PHD, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in the Czech Republic?', 'Czech Republic-এ কীভাবে PhD পাওয়া যায়?'),
          [
            b('You need a recognised master\'s degree. Bangladeshi applicants can apply for the Czech government scholarship\'s English-taught doctoral route (standard length covered, after passing its online English test), or apply directly to a university\'s own doctoral programme outside the scholarship. Entry requirements, application rounds and supervisor arrangements beyond that are set by each university\'s own doctoral school and were not verified here as general rules.', 'লাগে স্বীকৃত master\'s degree। Bangladesh-এর আবেদনকারীরা Czech সরকারের scholarship-এর ইংরেজি-মাধ্যম doctoral route-এ আবেদন করতে পারেন (এর online English test পাস করার পর স্বাভাবিক সময় কভার হয়), বা scholarship-এর বাইরে সরাসরি university-র নিজস্ব doctoral programme-এ আবেদন করতে পারেন। এর বাইরে ভর্তির শর্ত, আবেদনের সময় আর supervisor-এর ব্যবস্থা প্রতিটি university-র নিজস্ব doctoral school ঠিক করে, সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি।'),
            CHECK_UNI,
          ],
          [CZ_MSMT_SCHOLARSHIPS, CZ_CTU_ENTRANCE],
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
          [b('Not verified yet as a general rule: each university\'s doctoral school states its own English requirement, while the Czech government scholarship route instead requires its own online English entrance test.', 'সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: প্রতিটি university-র doctoral school নিজের ইংরেজি শর্ত দেয়, আর Czech সরকারের scholarship route-এ এর বদলে নিজস্ব online English entrance test লাগে।')],
          [CZ_MSMT_SCHOLARSHIPS],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ the country

export const CZ_GUIDE: CountryGuide = {
  code: 'CZ',
  checkedAt: CZ_READ,
  sourcesPerSection: true,
  intro: b(
    "The Czech Republic has no national joint application: you apply directly to each university — often each faculty — with its own entrance requirements, deadline and, for English-taught programmes, its own tuition fee; Czech-taught programmes stay tuition-free for any nationality (for the standard length of study plus one year). Non-EU/EEA students apply for a long-term visa for studies (consular fee CZK 2,500, decided within 60 days) or a long-term residence permit for studies, need funds tied to the Czech subsistence minimum (CZK 115,810 for a one-year stay) and comprehensive insurance of at least EUR 400,000, and can generally work on a full-time accredited programme without a separate work permit. Encouragingly, the Czech Government's scholarship for developing countries names Bangladesh as an eligible country for selected English-taught master's and doctoral programmes. After graduating, you may apply once for a 9-month permit to look for work or start a business. This guide is built from the Ministry of the Interior's Information Portal for Foreigners (ipc.gov.cz), the Ministry of Foreign Affairs, the Ministry of Education, Youth and Sports, the government-backed Study in Czechia portal, and university pages.",
    "Czech Republic-এ কোনো জাতীয় joint application নেই: সরাসরি প্রতিটি university-তে — প্রায়ই প্রতিটি faculty-তে — আবেদন করতে হয়, নিজস্ব ভর্তির শর্ত, deadline আর, ইংরেজি-মাধ্যম programme-এর জন্য, নিজস্ব tuition fee সহ; Czech-মাধ্যম programme যে কোনো জাতীয়তার জন্য tuition-free থাকে (পড়ার স্বাভাবিক সময় + এক বছর পর্যন্ত)। EU/EEA-র বাইরের student-রা পড়ার জন্য long-term visa-এর আবেদন করেন (consular fee CZK 2,500, ৬০ দিনের মধ্যে সিদ্ধান্ত) বা long-term residence permit, Czech subsistence minimum-এর সাথে যুক্ত টাকা লাগে (এক বছরের থাকার জন্য CZK 115,810) আর অন্তত EUR 400,000-এর comprehensive insurance, আর সাধারণত full-time accredited programme-এ আলাদা work permit ছাড়াই কাজ করা যায়। সুখবর হলো, Czech সরকারের developing countries-এর scholarship নির্বাচিত ইংরেজি-মাধ্যম master's আর doctoral programme-এর জন্য Bangladesh-কে যোগ্য দেশ হিসেবে নামে। পড়া শেষে, একবার কাজ খোঁজা বা ব্যবসা শুরুর জন্য ৯-মাসের permit-এর আবেদন করা যায়। এই guide Ministry of the Interior-এর Information Portal for Foreigners (ipc.gov.cz), Ministry of Foreign Affairs, Ministry of Education, Youth and Sports, government-backed Study in Czechia portal, আর university-র page থেকে তৈরি।",
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [CZ_IPC_LT_VISA, CZ_IPC_FUNDS, CZ_IPC_INSURANCE, CZ_MSMT_SCHOLARSHIPS, CZ_STUDYIN_WORK],
      {
        kind: 'guidance',
        list: [
          b('Assuming all public universities are tuition-free — only Czech-taught programmes are; English-taught programmes charge fees that vary widely by university and faculty.', 'ধরে নেওয়া যে সব public university tuition-free — শুধু Czech-মাধ্যম programme তাই; ইংরেজি-মাধ্যম programme-এর fee university আর faculty অনুযায়ী ব্যাপকভাবে আলাদা।'),
          b('Using a flat proof-of-funds figure instead of the official 15x + 2x-per-month subsistence-minimum formula for your exact stay length.', 'আপনার সঠিক থাকার সময়ের জন্য official 15x + 2x-per-month subsistence-minimum formula-র বদলে একটি স্থির proof-of-funds সংখ্যা ব্যবহার করা।'),
          b('Looking for one national application deadline — each Czech university (often each faculty) sets its own.', 'একটি জাতীয় আবেদনের শেষ তারিখ খোঁজা — প্রতিটি Czech university (প্রায়ই প্রতিটি faculty) নিজের তারিখ ঠিক করে।'),
          b('Missing the Czech government scholarship\'s annual window (21 August–30 September for the following academic year) because it is easy to assume Bangladesh is not on a European scholarship\'s country list — here it is.', 'Czech সরকারের scholarship-এর বছরের একমাত্র সময় (পরের শিক্ষাবর্ষের জন্য ২১ August–৩০ September) মিস করা, কারণ ধরে নেওয়া সহজ যে কোনো European scholarship-এর দেশের তালিকায় Bangladesh নেই — কিন্তু এখানে আছে।'),
          b('Forgetting to register with the Foreign Police within 3 business days of arrival (non-EU students) — check first whether your dormitory does this for you.', 'পৌঁছানোর ৩ কর্মদিনের মধ্যে Foreign Police-এর কাছে register করতে ভুলে যাওয়া (non-EU student) — প্রথমে দেখুন আপনার dormitory এটা করে দেয় কিনা।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in the Czech Republic from Bangladesh?", "Bangladesh থেকে Czech Republic-এ Bachelor's পড়তে কী কী লাগে?"), [b('A secondary-school certificate that qualifies you for higher education, the university/faculty\'s own entrance requirements and English proof, the admission-procedure fee (around CZK 950 at CTU), tuition paid once admitted (unless Czech-taught, which is free), proof of funds, insurance and a long-term visa or residence permit for studies (CZK 2,500).', 'উচ্চশিক্ষার যোগ্যতা দেয় এমন secondary-school সনদ, university/faculty-র নিজস্ব ভর্তির শর্ত আর English প্রমাণ, admission-procedure fee (CTU-তে প্রায় CZK 950), ভর্তির পর tuition দেওয়া (Czech-মাধ্যম না হলে, যা বিনা খরচে), টাকার প্রমাণ, insurance আর পড়ার জন্য long-term visa বা residence permit (CZK 2,500)।')], [CZ_CTU_ENTRANCE, CZ_IPC_LT_VISA]),
    qa('hsc', b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"), [b('Not verified yet for Bangladesh specifically: a secondary-school graduation certificate is required, but how the Bangladeshi HSC is assessed, and whether a university also needs a scored national entrance test, was not read on an official page.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: একটি secondary-school graduation সনদ লাগে, কিন্তু Bangladesh-এর HSC ঠিক কীভাবে মূল্যায়ন হয়, আর university-তে score করা জাতীয় entrance test-ও লাগে কিনা, কোনো official page-এ পড়া হয়নি।')], [CZ_CTU_ENTRANCE], { status: 'not-verified' }),
    qa('cost', b('How much does it cost to study in the Czech Republic?', 'Czech Republic-এ পড়াশোনার খরচ কত?'), [b('Czech-taught programmes are free at public universities for any nationality (for the standard length plus one year). English-taught programmes charge fees that vary widely: from about CZK 64,000 a semester (CTU, FIT) to EUR 40–30,620 a year depending on the Charles University programme. You also need funds for your visa (CZK 115,810 for a one-year stay, per the official formula) and the visa/permit fee (CZK 2,500).', 'Czech-মাধ্যম programme public university-তে যে কোনো জাতীয়তার জন্য বিনা খরচে (স্বাভাবিক সময় + এক বছর পর্যন্ত)। ইংরেজি-মাধ্যম programme-এর fee ব্যাপকভাবে আলাদা: CTU, FIT-এ প্রায় CZK 64,000/সেমিস্টার থেকে Charles University-র programme অনুযায়ী বছরে EUR 40–30,620 পর্যন্ত। Visa-র জন্যও টাকা লাগে (official formula অনুযায়ী এক বছরের থাকার জন্য CZK 115,810) আর visa/permit fee (CZK 2,500)।')], [CZ_CUNI_TUITION, CZ_CTU_FIT_BACHELOR, CZ_IPC_FUNDS, CZ_IPC_LT_VISA], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for the Czech Republic?', 'Czech Republic-এ IELTS কত লাগে?'), [b('Set by each university/faculty; example: Masaryk University\'s Faculty of Social Studies accepts a B2-level IELTS Academic/General score of 5.5–6.5. No single national minimum applies to every university.', 'প্রতিটি university/faculty নিজে ঠিক করে; উদাহরণ: Masaryk University-র Faculty of Social Studies B2-level IELTS Academic/General score 5.5–6.5 গ্রহণ করে। সব university-তে প্রযোজ্য একক জাতীয় ন্যূনতম নেই।')], [CZ_MUNI_APPLY], { status: 'partly-verified' }),
    qa('visa', b('What do you need for the visa or residence permit?', 'Visa বা residence permit-এর জন্য কী কী লাগে?'), [b('An acceptance letter from your university, proof of funds (the official subsistence-minimum formula), proof of accommodation, comprehensive insurance of at least EUR 400,000, a criminal-record document, and the CZK 2,500 fee for a long-term visa for studies (decided within 60 days).', 'University-র acceptance letter, টাকার প্রমাণ (official subsistence-minimum formula), থাকার জায়গার প্রমাণ, অন্তত EUR 400,000-এর comprehensive insurance, অপরাধমুক্ত থাকার document, আর পড়ার জন্য long-term visa-এর CZK 2,500 fee (৬০ দিনের মধ্যে সিদ্ধান্ত)।')], [CZ_IPC_LT_VISA, CZ_IPC_FUNDS, CZ_IPC_INSURANCE]),
    qa('work', b('Can you work while studying in the Czech Republic?', 'Czech Republic-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b('Yes: a non-EU student on a full-time accredited university programme does not need a separate work permit (the employer must report the job); most part-time student jobs run on a DPP (up to 300 hours/year per employer) or DPČ (up to an average of 20 hours/week) agreement.', 'হ্যাঁ: full-time accredited university programme-এর non-EU student-দের আলাদা work permit লাগে না (employer-কে কাজ report করতে হয়); অধিকাংশ part-time student job DPP (এক employer-এর জন্য বছরে ৩০০ ঘণ্টা পর্যন্ত) বা DPČ (সপ্তাহে গড়ে ২০ ঘণ্টা পর্যন্ত) agreement-এ চলে।')], [CZ_STUDYIN_WORK], { status: 'partly-verified' }),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('Yes: the Czech Government\'s scholarship for developing countries names Bangladesh as eligible for selected English-taught master\'s and doctoral programmes, covering the standard length of study. Applicants must already hold the previous degree and pass an online English test; the annual application window runs from late August to 30 September for the following academic year.', 'হ্যাঁ: Czech সরকারের developing countries-এর scholarship নির্বাচিত ইংরেজি-মাধ্যম master\'s আর doctoral programme-এর জন্য Bangladesh-কে যোগ্য দেশ হিসেবে নামে, যা পড়ার স্বাভাবিক সময় কভার করে। আবেদনকারীদের আগের degree থাকতে হবে আর online English test পাস করতে হবে; পরের শিক্ষাবর্ষের জন্য বছরের আবেদনের সময় August-এর শেষ থেকে ৩০ September পর্যন্ত।')], [CZ_MSMT_SCHOLARSHIPS, CZ_MZV_SCHOLARSHIP_BD]),
    qa('after', b('Can you stay in the Czech Republic after graduating?', 'পড়া শেষে Czech Republic-এ থাকা যায়?'), [b('Yes: a 9-month residence permit (not extendable) to look for work or start a business, costing CZK 2,500 and decided within 60 days, applied for in person before your study permit expires.', 'হ্যাঁ: কাজ খোঁজা বা ব্যবসা শুরুর জন্য ৯-মাসের residence permit (extend করা যায় না), CZK 2,500 খরচ, ৬০ দিনের মধ্যে সিদ্ধান্ত, আপনার study permit শেষ হওয়ার আগে সশরীরে আবেদন করতে হয়।')], [CZ_IPC_JOBSEEK]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('Tied to the Czech subsistence minimum (CZK 3,130/month since 2023): 15 times that amount, plus 2 times for every further month of your stay. For a one-year stay this is CZK 115,810.', 'Czech subsistence minimum-এর (2023 থেকে মাসে CZK 3,130) সাথে যুক্ত: তার 15 গুণ, সাথে থাকার প্রতিটি পরের মাসের জন্য 2 গুণ। এক বছরের থাকার জন্য এটা CZK 115,810।')], [CZ_IPC_FUNDS]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before admission (university): passport, certificates and transcripts, an English proof. After admission (visa/residence permit): acceptance letter, proof of funds, proof of accommodation, an insurance certificate, a criminal-record document, and — after arrival — registration with the Foreign Police.', 'ভর্তির আগে (university): passport, সনদ আর transcript, English প্রমাণ। ভর্তির পরে (visa/residence permit): acceptance letter, টাকার প্রমাণ, থাকার জায়গার প্রমাণ, insurance certificate, অপরাধমুক্ত থাকার document, আর — পৌঁছানোর পরে — Foreign Police-এর কাছে registration।')], [CZ_IPC_LT_VISA, CZ_IPC_FUNDS, CZ_IPC_INSURANCE]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A recognised bachelor's degree and the university/faculty's own requirements; English-taught tuition varies widely by faculty, but the Czech government scholarship names Bangladesh as eligible for selected English-medium master's programmes.", "স্বীকৃত bachelor's degree আর university/faculty-র নিজস্ব শর্ত; ইংরেজি-মাধ্যম tuition faculty অনুযায়ী ব্যাপকভাবে আলাদা, কিন্তু Czech সরকারের scholarship নির্বাচিত ইংরেজি-মাধ্যম master's programme-এর জন্য Bangladesh-কে যোগ্য দেশ হিসেবে নামে।")], [CZ_CTU_ENTRANCE, CZ_MSMT_SCHOLARSHIPS]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('A recognised master\'s degree; apply to a university\'s own doctoral programme, or through the Czech government scholarship\'s English-taught doctoral route, which names Bangladesh as eligible. Entry rules outside the scholarship are set per university (not verified here as general rules).', 'স্বীকৃত master\'s degree; university-র নিজস্ব doctoral programme-এ আবেদন করুন, বা Czech সরকারের scholarship-এর ইংরেজি-মাধ্যম doctoral route-এর মাধ্যমে, যা Bangladesh-কে যোগ্য দেশ হিসেবে নামে। Scholarship-এর বাইরে ভর্তির নিয়ম প্রতিটি university ঠিক করে (সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি)।')], [CZ_MSMT_SCHOLARSHIPS, CZ_CTU_ENTRANCE], { status: 'partly-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — Brno University of Technology, Charles University, Czech Technical University in Prague and Masaryk University — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — Brno University of Technology, Charles University, Czech Technical University in Prague আর Masaryk University — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [CZ_CUNI_TUITION]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: the Czech Government\'s scholarship for developing countries names Bangladesh as eligible for selected English-taught master\'s and doctoral programmes for the 2027/2028 academic year, confirmed separately by the Czech Embassy in New Delhi, with an online application period until 30 September 2026. How individual universities otherwise treat Bangladeshi secondary or bachelor\'s qualifications in admissions, and the exact extra visa documents some embassies may ask for, were not verified here.', 'Bangladesh-এর জন্য যাচাই করা: Czech সরকারের developing countries-এর scholarship 2027/2028 শিক্ষাবর্ষের জন্য নির্বাচিত ইংরেজি-মাধ্যম master\'s আর doctoral programme-এর জন্য Bangladesh-কে যোগ্য দেশ হিসেবে নামে, New Delhi-তে Czech Embassy আলাদাভাবে এটা নিশ্চিত করেছে, online আবেদনের সময় ৩০ September 2026 পর্যন্ত। University-গুলো ভর্তিতে Bangladesh-এর secondary বা bachelor\'s যোগ্যতা অন্যথায় কীভাবে দেখে, আর কিছু embassy ঠিক কোন অতিরিক্ত visa document চাইতে পারে, এখানে যাচাই হয়নি।'),
    ], [CZ_MSMT_SCHOLARSHIPS, CZ_MZV_SCHOLARSHIP_BD]),
  ],
  life: [
    qa('health-care', b('How does healthcare work?', 'চিকিৎসা ব্যবস্থা কেমন?'), [b('As a student you need travel/comprehensive medical insurance covering at least EUR 400,000 per insured event for your visa or residence permit, arranged with any insurer authorised in the Czech Republic since September 2023; you do not need a separate certificate once you are in the Czech public health insurance system.', 'Student হিসেবে visa বা residence permit-এর জন্য প্রতি insured event-এ অন্তত EUR 400,000 কভার করা travel/comprehensive medical insurance লাগে, September 2023 থেকে Czech Republic-এ অনুমোদিত যে কোনো insurer-এর সাথে ঠিক করা যায়; Czech public health insurance system-এ ঢুকে গেলে আলাদা certificate লাগে না।')], [CZ_IPC_INSURANCE]),
  ],
  documents: CZ_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'estimate', status: 'partly-verified', value: { min: 0, unit: 'CZK/year', text: b('Free for Czech-taught programmes (any nationality); English-taught programmes range widely, from about CZK 64,000/semester (CTU, FIT) to EUR 40–30,620/year (Charles University, across all its English programmes).', 'Czech-মাধ্যম programme-এ বিনা খরচে (যে কোনো জাতীয়তা); ইংরেজি-মাধ্যম programme ব্যাপকভাবে আলাদা, প্রায় CZK 64,000/সেমিস্টার (CTU, FIT) থেকে EUR 40–30,620/বছর (Charles University, এর সব ইংরেজি programme জুড়ে)।') }, source: CZ_CUNI_TUITION },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 115810, unit: 'CZK/year', text: b('CZK 115,810 for a one-year stay, by the official 15x + 2x-per-month subsistence-minimum formula (CZK 3,130/month since 2023).', 'এক বছরের থাকার জন্য CZK 115,810, official 15x + 2x-per-month subsistence-minimum formula অনুযায়ী (2023 থেকে মাসে CZK 3,130)।') }, source: CZ_IPC_FUNDS },
    { id: 'work-during-study', kind: 'fact', status: 'partly-verified', value: { max: 20, unit: 'hours/week', text: b('No separate work permit needed on a full-time accredited programme; most part-time jobs run on a DPP (300 hours/year/employer) or DPČ (avg. 20 hours/week) agreement.', 'Full-time accredited programme-এ আলাদা work permit লাগে না; অধিকাংশ part-time job DPP (বছরে ৩০০ ঘণ্টা/employer) বা DPČ (গড়ে সপ্তাহে ২০ ঘণ্টা) agreement-এ চলে।') }, source: CZ_STUDYIN_WORK },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { max: 9, unit: 'months', text: b('Permit to look for work or start a business for up to 9 months, not extendable.', 'কাজ খোঁজা বা ব্যবসা শুরুর জন্য সর্বোচ্চ ৯ মাসের permit, extend করা যায় না।') }, source: CZ_IPC_JOBSEEK },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 2500, unit: 'CZK', text: b('CZK 2,500 for a long-term visa for the purpose of studies, decided within 60 days.', 'পড়ার জন্য long-term visa-র জন্য CZK 2,500, ৬০ দিনের মধ্যে সিদ্ধান্ত।') }, source: CZ_IPC_LT_VISA },
  ],
};

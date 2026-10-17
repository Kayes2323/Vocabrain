import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  FR_APS_BILATERAL,
  FR_CF_BD_PROCEDURE,
  FR_CF_BD_VISA_DOCS,
  FR_CF_COST,
  FR_CF_EEF_COUNTRIES,
  FR_CF_VLSTS,
  FR_IPPARIS_QS,
  FR_POLYTECHNIQUE_BSC,
  FR_READ,
  FR_RECE_GENERAL,
  FR_SACLAY_FEES,
  FR_SACLAY_MASTERS,
  FR_SCIENCESPO_FEES,
  FR_SCIENCESPO_GRAD,
  FR_SCIENCESPO_UG,
  FR_SORBONNE_EXEMPTION,
  FR_SORBONNE_FEES,
  FR_SP_VISA,
  FR_SP_WORK,
  FR_VALIDATE_VLS,
  FR_VISAS_PORTAL,
} from './fr-sources';

/**
 * France reading guide, researched on its own from French official sources
 * (service-public.fr / the Ministry of the Interior for residence permits and
 * work rights, France's online immigration-procedure portals, France-Visas,
 * Campus France — the national agency for studying in France under the
 * Ministries for Europe and Foreign Affairs and for Higher Education — and
 * university pages). Nothing is taken from another country's guide. Amounts
 * stay in euros exactly as each source states them and are never converted.
 * It covers English-taught programmes for non-EU/EEA (Bangladeshi) students;
 * France is an EU/Schengen member, so EU/EEA/Switzerland citizens follow a
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
  "French universities, grandes écoles and Sciences Po are not identical: each one sets its own English-taught programmes, tuition fee, deadline, entrance requirements and — since 2026 — its own exemption policy for the non-EU \"droits différenciés\" tuition surcharge. Always check the exact programme on the institution's own admissions page.",
  'ফরাসি university, grande école আর Sciences Po একরকম না: প্রতিটি নিজের ইংরেজি-মাধ্যম programme, tuition fee, deadline, ভর্তির শর্ত, আর — 2026 থেকে — non-EU "droits différenciés" tuition surcharge-এর জন্য নিজের exemption policy ঠিক করে। প্রতিটি programme-এর জন্য প্রতিষ্ঠানের নিজের admissions page অবশ্যই দেখে নিন।',
);

// ------------------------------------------------------------------ shared answers

const eef = (id: string) =>
  qa(
    id,
    b('Do you need the "Études en France" procedure before applying for a visa?', '"Études en France" procedure visa-র আগে লাগে কি?'),
    [
      b(
        'Yes for Bangladesh: Campus France’s own official list names Bangladesh as one of 75 countries affected by the "Études en France" (Studies in France) procedure. If you need a visa and live in one of these countries, you must first apply to enrol in a French higher education institution through the Études en France platform; your visa application is then sent automatically to the French consular authorities in your home country through that same platform. Only after a French institution admits you can you move on to the visa/residence-permit stage.',
        'Bangladesh-এর জন্য হ্যাঁ: Campus France-র নিজের official তালিকা Bangladesh-কে "Études en France" (Studies in France) procedure দ্বারা প্রভাবিত 75টি দেশের একটি বলে। Visa লাগলে আর এমন একটি দেশে থাকলে, প্রথমে Études en France platform-এর মাধ্যমে একটি ফরাসি higher education institution-এ ভর্তির আবেদন করতে হয়; তারপর সেই একই platform-এর মাধ্যমে আপনার visa application স্বয়ংক্রিয়ভাবে নিজ দেশের ফরাসি consular authority-র কাছে পাঠানো হয়। একটি ফরাসি institution ভর্তি করার পরই visa/residence-permit পর্যায়ে এগোনো যায়।',
      ),
      b(
        'A discrepancy worth flagging: service-public.fr’s own student-visa page gives a worked example table of "72 countries" under this procedure and does not list Bangladesh among its printed Asia/Oceania examples (it falls to that table’s "other country" row, which points to the ordinary France-Visas route instead). Campus France’s dedicated FAQ page, however, explicitly names Bangladesh among 75 listed countries. Since every Campus France Bangladesh page (and the Bangladesh-specific flyer) directs applicants through this exact Études en France procedure, this guide follows Campus France’s explicit, Bangladesh-named list rather than service-public.fr’s shorter illustrative table.',
        'একটি উল্লেখযোগ্য অসঙ্গতি: service-public.fr-এর নিজের student-visa page একটি "72 দেশ"-এর উদাহরণ তালিকা দেয় যেখানে Bangladesh Asia/Oceania-র ছাপা উদাহরণে নেই (এটা সেই তালিকার "other country" সারিতে পড়ে, যা সাধারণ France-Visas route-এর দিকে নির্দেশ করে)। তবে Campus France-র নিজস্ব FAQ page স্পষ্টভাবে 75টি তালিকাভুক্ত দেশের মধ্যে Bangladesh-এর নাম দেয়। প্রতিটি Campus France Bangladesh page (আর Bangladesh-specific flyer) আবেদনকারীদের এই একই Études en France procedure-এর মধ্য দিয়ে নির্দেশ করে বলে, এই guide service-public.fr-এর ছোট উদাহরণ তালিকার বদলে Campus France-র স্পষ্ট, Bangladesh-নামযুক্ত তালিকা অনুসরণ করে।',
      ),
    ],
    [FR_CF_EEF_COUNTRIES, FR_CF_BD_PROCEDURE],
    { allDegrees: true, status: 'partly-verified', discrepancy: b('service-public.fr’s own example table (72 countries) does not print Bangladesh; Campus France’s dedicated FAQ (75 countries) explicitly does.', 'service-public.fr-এর নিজের উদাহরণ তালিকায় (72 দেশ) Bangladesh ছাপা নেই; Campus France-র নিজস্ব FAQ-তে (75 দেশ) স্পষ্টভাবে আছে।') },
  );

const visa = (id: string) =>
  qa(
    id,
    b('What is the VLS-TS student visa, and how do you validate it?', 'VLS-TS student visa কী, আর কীভাবে validate করবেন?'),
    [
      b(
        'A non-EU/EEA/Switzerland national coming to France for higher education studies applies for the long-stay visa valid as a residence permit, student type (VLS-TS "étudiant"), issued for 4 months to 1 year. Within 3 months of arriving in France, you must validate it online — entirely digitally, from home — at administration-etrangers-en-france.interieur.gouv.fr, paying a 100-euro tax at that point. Holding a valid VLS-TS lets you work up to 964 hours a year, use VISALE (France’s free student rental-deposit guarantee) and extend your stay beyond the permit’s own validity to continue your studies.',
        'উচ্চশিক্ষার জন্য France-এ আসা একজন non-EU/EEA/Switzerland নাগরিক long-stay visa valid as a residence permit, student type (VLS-TS "étudiant") আবেদন করেন, যা 4 মাস থেকে 1 বছরের জন্য ইস্যু হয়। France-এ পৌঁছানোর 3 মাসের মধ্যে, এটা অনলাইনে validate করতে হয় — সম্পূর্ণ digitally, বাসা থেকে — administration-etrangers-en-france.interieur.gouv.fr-এ, সেই সময় 100 euro tax দিতে হয়। Valid VLS-TS থাকলে বছরে 964 ঘণ্টা পর্যন্ত কাজ করা যায়, VISALE (France-এর free student rental-deposit guarantee) ব্যবহার করা যায়, আর পড়া চালিয়ে যাওয়ার জন্য permit-এর নিজস্ব validity-র বাইরেও থাকার সময় বাড়ানো যায়।',
      ),
      b(
        'To qualify at all, you must be enrolled or pre-enrolled in a public or private higher-education institution (or a higher-level vocational training body), and you must be able to show resources of at least 877.50 euros a month — the current figure stated on service-public.fr (verified 1 August 2026), raised under a 2026 decree from the long-standing 615-euro figure. Acceptable proof includes a French-government or EU-programme scholarship certificate, a home-country scholarship certificate, your last 3 payslips if you work, a sponsor’s bank statements showing regular transfers (or a sworn statement), or your own bank statement showing a sufficient balance.',
        'ভর্তির শর্ত পূরণ করতে, একটি public বা private higher-education institution-এ (বা উচ্চ-স্তরের vocational training body-তে) ভর্তি বা pre-enrolled থাকতে হয়, আর অন্তত মাসে 877.50 euro টাকা দেখাতে পারতে হয় — service-public.fr-এ বর্তমান এই সংখ্যা (1 August 2026-এ যাচাই করা), যা 2026-এর একটি decree-র অধীনে দীর্ঘদিনের 615-euro সংখ্যা থেকে বাড়ানো হয়েছে। গ্রহণযোগ্য প্রমাণের মধ্যে আছে ফরাসি সরকার বা EU-programme scholarship-এর সনদ, নিজ দেশের scholarship-এর সনদ, কাজ করলে শেষ 3টি payslip, একজন sponsor-এর নিয়মিত transfer দেখানো bank statement (বা একটি sworn statement), বা নিজের পর্যাপ্ত balance দেখানো bank statement।',
      ),
    ],
    [FR_CF_VLSTS, FR_SP_VISA, FR_VALIDATE_VLS],
    { allDegrees: true },
  );

const extension = (id: string) =>
  qa(
    id,
    b('What happens after your first year — the multi-annual residence permit?', 'প্রথম বছরের পরে কী হয় — multi-annual residence permit?'),
    [
      b(
        'After 1 year in France on a VLS-TS or a 1-year temporary student residence card, you can be issued a multi-annual student residence card (carte de séjour pluriannuelle "étudiant"), valid for the number of years remaining in the study programme you are enrolled in. For example, finishing your first licence (bachelor’s) year gets you a 2-year card; at a grande école, the renewed card covers you until your diploma. You must apply online only, 4 months to 2 months before your current document expires, show the same 877.50-euro/month resources, and show that your studies are "real and serious" (attendance, exam results, degrees obtained, and any explanation for a change of programme — repeating one year of a cycle does not, by itself, count against you). The renewal tax and stamp duty together total 150 euros.',
        'VLS-TS বা 1-বছরের temporary student residence card-এ France-এ 1 বছর থাকার পর, আপনি যে study programme-এ ভর্তি আছেন তার বাকি বছরের জন্য একটি multi-annual student residence card (carte de séjour pluriannuelle "étudiant") পাওয়া যায়। যেমন, licence (bachelor\'s)-এর প্রথম বছর শেষ করলে 2-বছরের card পাওয়া যায়; একটি grande école-তে, renewed card diploma পাওয়া পর্যন্ত কভার করে। আবেদন শুধু অনলাইনে করতে হয়, বর্তমান document শেষ হওয়ার 4 মাস থেকে 2 মাস আগে, একই মাসে 877.50-euro টাকা দেখাতে হয়, আর পড়া "real and serious" তা দেখাতে হয় (attendance, পরীক্ষার result, পাওয়া degree, আর programme পরিবর্তনের কোনো ব্যাখ্যা — একটি cycle-এ এক বছর আবার করা একাই এর বিরুদ্ধে যায় না)। Renewal-এর tax আর stamp duty মিলিয়ে মোট 150 euro।',
      ),
    ],
    [FR_SP_VISA],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in France, and how many hours?', 'France-তে পড়ার পাশাপাশি কাজ করা যায় কি, আর কত ঘণ্টা?'),
    [
      b(
        'Yes: holding a VLS-TS or a student residence card, you may work up to 964 hours a year (60% of the annual legal working time), per service-public.fr. That period is counted from the date your card was issued or your VLS-TS was validated — for example, a permit issued 20 September 2026 lets you work up to 964 hours until 19 September 2027. Within this cap, you need no separate work authorisation and your employer does not have to apply for one, but the employer must register with the prefecture of its registered office at least 2 working days before your hiring takes effect. Going over 964 hours risks the withdrawal or non-renewal of your residence permit, and for hours beyond the cap the employer must obtain a work permit first.',
        'হ্যাঁ: VLS-TS বা student residence card থাকলে, service-public.fr অনুযায়ী বছরে 964 ঘণ্টা (বার্ষিক legal working time-এর 60%) পর্যন্ত কাজ করা যায়। এই সময় আপনার card ইস্যু হওয়ার বা VLS-TS validate হওয়ার তারিখ থেকে গোনা হয় — যেমন, 20 September 2026-এ ইস্যু হওয়া permit-এ 19 September 2027 পর্যন্ত 964 ঘণ্টা কাজ করা যায়। এই সীমার মধ্যে আলাদা কোনো work authorisation লাগে না আর employer-কেও একটা চাইতে হয় না, কিন্তু employer-কে চাকরি শুরুর অন্তত 2 working day আগে তার নিবন্ধিত অফিসের prefecture-এ রেজিস্টার করতে হয়। 964 ঘণ্টার বেশি কাজ করলে residence permit withdraw বা non-renew হওয়ার ঝুঁকি আছে, আর সীমার বাইরের ঘণ্টার জন্য employer-কে আগে একটি work permit পেতে হয়।',
      ),
      b(
        'Internships required by your degree programme do not count toward the 964-hour cap, per Campus France. A different regime applies to Algerian nationals (not Bangladesh): up to 50% of the annual working time, always with a work permit the employer must obtain first.',
        'Degree programme-এর প্রয়োজনীয় internship 964-ঘণ্টার সীমার মধ্যে গোনা হয় না, Campus France অনুযায়ী। Algerian নাগরিকদের (Bangladesh না) জন্য আলাদা নিয়ম প্রযোজ্য: বার্ষিক working time-এর 50% পর্যন্ত, সবসময় employer-এর আগে পাওয়া একটি work permit সহ।',
      ),
    ],
    [FR_SP_WORK],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in France to work after graduating?', 'পড়া শেষে France-তে কাজের জন্য থাকা যায়?'),
    [
      b(
        'There are two different post-study permits, and Bangladesh falls under the general one, not the easier bilateral one. A bilateral-agreement "autorisation provisoire de séjour" (APS) for end-of-studies/job-seeking exists only for nationals of a specific, named list of countries (Benin, Bosnia and Herzegovina, Burkina Faso, Cape Verde, Republic of the Congo, Gabon, Georgia, India, North Macedonia, Mauritius, Montenegro, Serbia and Tunisia) — Bangladesh is not on that list, so this particular, capped-hours, free permit does not apply to a Bangladeshi graduate.',
        'পড়া শেষে থাকার দুটি আলাদা permit আছে, আর Bangladesh সহজ bilateral permit-টায় না, সাধারণ permit-এর আওতায় পড়ে। শেষে-পড়া/চাকরি-খোঁজার জন্য bilateral-agreement "autorisation provisoire de séjour" (APS) শুধু একটি নির্দিষ্ট, নামযুক্ত দেশের তালিকার নাগরিকদের জন্য আছে (Benin, Bosnia and Herzegovina, Burkina Faso, Cape Verde, Republic of the Congo, Gabon, Georgia, India, North Macedonia, Mauritius, Montenegro, Serbia আর Tunisia) — Bangladesh এই তালিকায় নেই, তাই এই নির্দিষ্ট, ঘণ্টা-সীমাবদ্ধ, বিনামূল্যের permit একজন Bangladeshi graduate-এর জন্য প্রযোজ্য না।',
      ),
      b(
        'Instead, a Bangladeshi graduate uses the general "carte de séjour recherche d’emploi ou création d’entreprise" (RECE — job-seeking or business-creation residence card). You generally need a diploma titled "licence professionnelle" or at least equivalent to a master’s degree (a Mastère Spécialisé or a Master of Science labelled by the Conférence des Grandes Écoles also qualifies) obtained on a student residence permit — an ordinary bachelor’s (licence) degree alone does not itself qualify you for this card. It is valid for 12 months, cannot be renewed, and — unlike the capped bilateral APS — lets you work without restriction for its whole validity while you look for a job or start a business connected to your studies or research.',
        'এর বদলে, একজন Bangladeshi graduate সাধারণ "carte de séjour recherche d’emploi ou création d’entreprise" (RECE — চাকরি-খোঁজা বা ব্যবসা-তৈরির residence card) ব্যবহার করেন। সাধারণত student residence permit-এ পাওয়া "licence professionnelle" নামের বা অন্তত master\'s degree-র সমতুল্য একটি diploma লাগে (Conférence des Grandes Écoles-এর labelled Mastère Spécialisé বা Master of Science-ও যোগ্য) — শুধু একটি সাধারণ bachelor\'s (licence) degree এই card-এর জন্য নিজেই যোগ্য করে না। এটা 12 মাসের জন্য valid, renew করা যায় না, আর — ঘণ্টা-সীমাবদ্ধ bilateral APS-এর মতো না — পুরো validity-তে পড়া বা গবেষণার সাথে সম্পর্কিত চাকরি খোঁজা বা ব্যবসা শুরুর জন্য নিষেধাজ্ঞাহীনভাবে কাজ করতে দেয়।',
      ),
    ],
    [FR_APS_BILATERAL, FR_RECE_GENERAL],
    { status: 'partly-verified' },
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'The main French government scholarship open to strong students worldwide is the Eiffel Excellence Scholarship Programme, run by the Ministry for Europe and Foreign Affairs for master’s and doctoral study; no official page read names or excludes Bangladesh specifically, so eligibility by nationality is not itself the barrier. However, you cannot apply to it directly: only a French higher-education institution that has already selected you can nominate your file, and the age limits (commonly cited around 25 for master’s applicants from developing countries and 30 for doctoral applicants) and the exact 2027 call dates were not confirmed from an official eiffel-scholarship-program.fr page itself in this research (the institutional pages fetched were third-party or university summaries). Treat the scholarship as real and worth asking your chosen institution about, not as something to apply for on your own.',
        'বিশ্বজুড়ে ভালো student-দের জন্য খোলা ফরাসি সরকারের মূল scholarship হলো Eiffel Excellence Scholarship Programme, যা Ministry for Europe and Foreign Affairs master\'s আর doctoral পড়ার জন্য চালায়; পড়া কোনো official page Bangladesh-কে নির্দিষ্টভাবে নাম বা বাদ দেয়নি, তাই জাতীয়তা দিয়ে যোগ্যতাই বাধা না। তবে এতে সরাসরি আবেদন করা যায় না: শুধু আগে থেকে আপনাকে select করা একটি ফরাসি higher-education institution আপনার file nominate করতে পারে, আর বয়সের সীমা (সাধারণত developing country-র master\'s আবেদনকারীদের জন্য প্রায় 25, doctoral আবেদনকারীদের জন্য 30 বলা হয়) আর ঠিক 2027-এর call-এর তারিখ এই গবেষণায় eiffel-scholarship-program.fr-এর নিজস্ব official page থেকে নিশ্চিত হয়নি (যে institutional page পড়া হয়েছে তা third-party বা university summary ছিল)। Scholarship-টিকে সত্য আর আপনার বাছা institution-কে জিজ্ঞাসা করার মতো ভাবুন, নিজে আবেদন করার মতো কিছু না।',
      ),
    ],
    [FR_CF_BD_PROCEDURE],
    { status: 'partly-verified', kind: 'guidance' },
  );

const apply = (id: string) =>
  qa(
    id,
    b('When and how do you apply?', 'কখন আর কীভাবে আবেদন করবেন?'),
    [
      b(
        'As a Bangladeshi applicant, you must go through the Études en France platform (run with Campus France) as your preinscription/application step, alongside whichever national or institutional admissions platform your chosen school uses — Parcoursup for French-Baccalaureate students (not your route), the Sciences Po admissions website or an institution’s own application portal for a foreign-secondary-school bachelor’s applicant, INCEPTION/Mon Master for university master’s programmes, or a grande école’s own portal. Once a French institution admits you, you complete your file on the Études en France portal under "I am accepted," and your visa application is routed automatically to the French consular authorities for Bangladesh.',
        'Bangladesh-এর আবেদনকারী হিসেবে, আপনাকে preinscription/application পদক্ষেপ হিসেবে Études en France platform (Campus France-এর সাথে চালানো) দিয়ে যেতে হয়, সাথে আপনার বাছা school যে জাতীয় বা institutional admissions platform ব্যবহার করে তা — French-Baccalaureate student-দের জন্য Parcoursup (আপনার route না), বিদেশি-secondary-school bachelor\'s আবেদনকারীর জন্য Sciences Po admissions website বা institution-এর নিজস্ব application portal, university master\'s programme-এর জন্য INCEPTION/Mon Master, বা একটি grande école-র নিজস্ব portal। একটি ফরাসি institution ভর্তি করার পর, Études en France portal-এ "I am accepted"-এর অধীনে আপনার file সম্পূর্ণ করুন, আর আপনার visa application স্বয়ংক্রিয়ভাবে Bangladesh-এর জন্য ফরাসি consular authority-র কাছে পাঠানো হয়।',
      ),
    ],
    [FR_SACLAY_MASTERS, FR_CF_BD_PROCEDURE],
    { kind: 'guidance', status: 'partly-verified' },
  );

// ------------------------------------------------------------------ documents

const PREF = b('A préfecture, or France’s online immigration-procedure portals (interieur.gouv.fr).', 'একটি préfecture, বা France-এর online immigration-procedure portal (interieur.gouv.fr)।');

export const FR_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Needed for the Études en France / visa application and as your identity document throughout.', 'Études en France / visa আবেদনে আর পুরো সময় পরিচয়ের document হিসেবে লাগে।'),
    who: PREF,
    when: b('From the Études en France application through visa validation and every renewal.', 'Études en France আবেদন থেকে visa validation আর প্রতি renewal পর্যন্ত।'),
    where: b('Submitted on the Études en France portal, at the visa stage, and uploaded for every online residence-permit step.', 'Études en France portal-এ, visa পর্যায়ে, আর প্রতিটি online residence-permit পদক্ষেপে upload করতে হয়।'),
    prepare: b('Keep it valid well beyond your intended stay.', 'প্রত্যাশিত থাকার সময়ের চেয়ে বেশ বেশি valid রাখুন।'),
    groups: ['general', 'visa'],
    sources: [FR_SP_VISA],
  },
  {
    id: 'acceptance',
    name: b('Admission / acceptance letter', 'ভর্তি / acceptance letter'),
    why: b('Proves your purpose of stay; needed to complete the "I am accepted" step on Études en France and for the visa application.', 'থাকার উদ্দেশ্য প্রমাণ করে; Études en France-এ "I am accepted" পদক্ষেপ আর visa আবেদনের জন্য লাগে।'),
    who: b('The French institution you applied to.', 'যে ফরাসি institution-এ আবেদন করছেন।'),
    when: b('After admission, before the Études en France "I am accepted" step and the visa application.', 'ভর্তির পর, Études en France-এর "I am accepted" পদক্ষেপ আর visa আবেদনের আগে।'),
    where: b('Uploaded on the Études en France portal.', 'Études en France portal-এ upload করতে হয়।'),
    prepare: b('An original PDF from the institution is usually expected; keep a copy.', 'সাধারণত institution-এর একটি original PDF দরকার; একটি copy রাখুন।'),
    groups: ['general', 'visa'],
    sources: [FR_CF_BD_PROCEDURE],
  },
  {
    id: 'academic',
    name: b('Secondary-school or prior-degree certificates', 'Secondary-school বা আগের degree-র সনদ'),
    why: b('University document (before admission): shows your previous education; each institution sets its own foreign-qualification assessment.', 'University-র document (ভর্তির আগে): আগের পড়া দেখায়; প্রতিটি institution নিজস্ব বিদেশি-যোগ্যতা মূল্যায়নের নিয়ম ঠিক করে।'),
    who: b('The institution/programme you apply to.', 'যে institution/programme-এ আবেদন করছেন।'),
    when: b('With your application, by the institution’s own deadline.', 'Institution-এর নিজস্ব শেষ তারিখের মধ্যে আবেদনের সঙ্গে।'),
    where: b('Uploaded to the institution’s own admissions platform (or INCEPTION / Mon Master for a public-university master’s).', 'Institution-এর নিজস্ব admissions platform-এ (বা public-university master\'s-এর জন্য INCEPTION / Mon Master) upload করতে হয়।'),
    prepare: b('Exact legalisation/translation requirements for Bangladeshi certificates were not itemized on an official page read for this guide — ask your chosen institution directly.', 'Bangladeshi সনদের সঠিক legalisation/translation শর্ত এই guide-এর জন্য পড়া কোনো official page-এ তালিকাভুক্ত ছিল না — সরাসরি আপনার বাছা institution-কে জিজ্ঞাসা করুন।'),
    groups: ['general', 'program', 'bangladesh'],
    status: 'not-verified',
    sources: [FR_SACLAY_MASTERS],
  },
  {
    id: 'english',
    name: b('English proficiency proof', 'ইংরেজি দক্ষতার প্রমাণ'),
    why: b('University document for English-taught programmes; accepted tests and minimum scores are set by each institution/programme (for example, École Polytechnique’s Bachelor of Science lists IELTS 6.5+ / TOEFL 90+ on its own admissions data).', 'ইংরেজি-মাধ্যম programme-এর university document; গ্রহণযোগ্য test আর ন্যূনতম score প্রতিটি institution/programme ঠিক করে (যেমন, École Polytechnique-এর Bachelor of Science নিজস্ব admissions data-এ IELTS 6.5+ / TOEFL 90+ তালিকাভুক্ত করে)।'),
    who: b('The institution/programme you apply to.', 'যে institution/programme-এ আবেদন করছেন।'),
    when: b('By the programme’s deadline.', 'Programme-এর শেষ তারিখের মধ্যে।'),
    where: b('As instructed by the institution’s own admissions page.', 'Institution-এর নিজস্ব admissions page-এর নির্দেশ অনুযায়ী।'),
    prepare: b('Not verified as a single national minimum — it varies program to program; check your own programme.', 'একটি একক জাতীয় ন্যূনতম হিসেবে যাচাই হয়নি — এটা programme অনুযায়ী আলাদা; আপনার নিজের programme দেখুন।'),
    groups: ['program'],
    status: 'not-verified',
    sources: [FR_POLYTECHNIQUE_BSC],
  },
  {
    id: 'funds',
    name: b('Proof of sufficient resources', 'পর্যাপ্ত টাকার প্রমাণ'),
    why: b('Residence-permit requirement: a bank statement, a sponsor’s bank statements, payslips, or a scholarship certificate showing at least 877.50 euros a month, the current official figure (raised from 615 euros by a 2026 decree, verified on service-public.fr as of 1 August 2026).', 'Residence-permit-এর শর্ত: bank statement, একজন sponsor-এর bank statement, payslip, বা অন্তত মাসে 877.50 euro দেখানো scholarship-এর সনদ, বর্তমান official figure (2026-এর একটি decree দ্বারা 615 euro থেকে বাড়ানো, service-public.fr-এ 1 August 2026 পর্যন্ত যাচাই করা)।'),
    who: PREF,
    when: b('With the visa application, and again at every residence-permit renewal.', 'Visa আবেদনের সাথে, আর প্রতি residence-permit renewal-এ আবার।'),
    where: b('Submitted with the online visa and residence-permit applications.', 'Online visa আর residence-permit আবেদনের সাথে জমা দিতে হয়।'),
    prepare: b('If you hold multiple kinds of resources, attach proof of each one; they are assessed together according to your particular situation.', 'একাধিক ধরনের টাকার উৎস থাকলে, প্রতিটির প্রমাণ যুক্ত করুন; আপনার নির্দিষ্ট পরিস্থিতি অনুযায়ী একসাথে মূল্যায়ন করা হয়।'),
    groups: ['visa', 'bangladesh'],
    sources: [FR_SP_VISA],
  },
  {
    id: 'insurance',
    name: b('Health-insurance registration', 'Health-insurance registration-এ নিবন্ধন'),
    why: b('France abolished its separate student social-security scheme under the 2018 "loi ORE"; international students enrolled at a French institution instead register, free of charge, for the general health-insurance scheme online, once enrolled.', 'France 2018-এর "loi ORE"-এর অধীনে এর আলাদা student social-security scheme বাতিল করেছে; ফরাসি institution-এ ভর্তি হওয়া international student-রা এর বদলে, ভর্তির পর, বিনামূল্যে অনলাইনে general health-insurance scheme-এ register করেন।'),
    who: b('France’s national health-insurance body (Assurance Maladie), via its dedicated international-student portal.', 'France-এর জাতীয় health-insurance body (Assurance Maladie), এর dedicated international-student portal-এর মাধ্যমে।'),
    when: b('After you are enrolled at your French institution.', 'আপনার ফরাসি institution-এ ভর্তি হওয়ার পর।'),
    where: b('Registered online; most supporting documents (visa, identity, civil status) can be prepared digitally before arrival, while the enrolment certificate and residence permit are added after arrival.', 'Online register করতে হয়; অধিকাংশ সহায়ক document (visa, পরিচয়, civil status) পৌঁছানোর আগে digitally তৈরি করা যায়, যদিও enrolment certificate আর residence permit পৌঁছানোর পরে যুক্ত করতে হয়।'),
    prepare: b('This process and its exact documentary requirements were confirmed from forum and university pages, not a fully read ameli.fr official procedure page, in this research — treat the general shape as correct but check ameli.fr/your CROUS for the exact current steps.', 'এই প্রক্রিয়া আর এর সঠিক document শর্ত এই গবেষণায় forum আর university page থেকে নিশ্চিত হয়েছে, একটি সম্পূর্ণ পড়া ameli.fr official procedure page থেকে না — সাধারণ ধারাটা ঠিক বলে ধরুন কিন্তু সঠিক বর্তমান পদক্ষেপের জন্য ameli.fr/আপনার CROUS দেখুন।'),
    groups: ['visa', 'arrival'],
    status: 'partly-verified',
    sources: [FR_SP_VISA],
  },
  {
    id: 'cvec',
    name: b('CVEC (Student and Campus Life Contribution) receipt', 'CVEC (Student and Campus Life Contribution)-এর receipt'),
    why: b('A compulsory annual contribution, paid to CROUS, that every student enrolling in an initial higher-education programme must pay before university enrolment.', 'একটি বাধ্যতামূলক বার্ষিক contribution, CROUS-কে দিতে হয়, যা initial higher-education programme-এ ভর্তি হওয়া প্রতিটি student-কে university enrolment-এর আগে দিতে হয়।'),
    who: b('CROUS (Centre régional des œuvres universitaires et scolaires).', 'CROUS (Centre régional des œuvres universitaires et scolaires) নামের সংস্থা।'),
    when: b('Before you enrol at your institution each academic year.', 'প্রতি শিক্ষাবর্ষে institution-এ ভর্তির আগে।'),
    where: b('Paid online via cvec.etudiant.gouv.fr; the receipt is uploaded at enrolment.', 'cvec.etudiant.gouv.fr-এ online দিতে হয়; receipt ভর্তির সময় upload করতে হয়।'),
    prepare: b('The exact 2026/2027 amount was not itemized on an official page read for this guide.', 'ঠিক 2026/2027-এর পরিমাণ এই guide-এর জন্য পড়া কোনো official page-এ তালিকাভুক্ত ছিল না।'),
    groups: ['general', 'arrival'],
    status: 'not-verified',
    sources: [FR_SORBONNE_FEES],
  },
];

// ------------------------------------------------------------------ costs (EUR, never converted)

const VISA_VALIDATION_FEE: GuideCost = { id: 'visa-validation', label: b('VLS-TS online validation tax (first year)', 'VLS-TS অনলাইন validation tax (প্রথম বছর)'), value: b('EUR 100, paid online when you validate your VLS-TS within 3 months of arrival', 'EUR 100, France-তে পৌঁছানোর 3 মাসের মধ্যে VLS-TS online validate করার সময় দিতে হয়'), amount: { value: 100, currency: 'EUR', period: 'one-time' }, source: FR_SP_VISA };
const RENEWAL_FEE: GuideCost = { id: 'renewal-fee', label: b('Residence-permit renewal (tax + stamp duty)', 'Residence-permit renewal (tax + stamp duty)'), value: b('EUR 150 total (EUR 100 tax + EUR 50 stamp duty) each renewal', 'প্রতি renewal-এ মোট EUR 150 (EUR 100 tax + EUR 50 stamp duty)'), amount: { value: 150, currency: 'EUR', period: 'one-time' }, source: FR_SP_VISA };
const FUNDS: GuideCost = { id: 'funds-living', label: b('Funds to show (official figure, per month)', 'দেখানোর টাকা (official figure, প্রতি মাস)'), value: b('At least EUR 877.50 a month, the current official figure on service-public.fr (raised from EUR 615 by a 2026 decree)', 'service-public.fr-এর বর্তমান official figure অনুযায়ী অন্তত মাসে EUR 877.50 (2026-এর একটি decree দ্বারা EUR 615 থেকে বাড়ানো)'), amount: { value: 877.5, currency: 'EUR', period: 'month' }, source: FR_SP_VISA };
const NATIONAL_FEE_BACHELORS: GuideCost = { id: 'national-fee', label: b('National registration fee — Bachelor’s (everyone, 2026/27)', 'জাতীয় registration fee — Bachelor\'s (সবার জন্য, 2026/27)'), value: b('EUR 178 a year (Sorbonne Université’s published 2026/2027 national rate)', 'বছরে EUR 178 (Sorbonne Université-র প্রকাশিত 2026/2027 জাতীয় rate)'), amount: { value: 178, currency: 'EUR', period: 'year' }, source: FR_SORBONNE_FEES };
const NATIONAL_FEE_MASTERS: GuideCost = { id: 'national-fee', label: b('National registration fee — Master’s (everyone, 2026/27)', 'জাতীয় registration fee — Master\'s (সবার জন্য, 2026/27)'), value: b('EUR 255 a year (Sorbonne Université’s published 2026/2027 national rate)', 'বছরে EUR 255 (Sorbonne Université-র প্রকাশিত 2026/2027 জাতীয় rate)'), amount: { value: 255, currency: 'EUR', period: 'year' }, source: FR_SORBONNE_FEES };
const NATIONAL_FEE_PHD: GuideCost = { id: 'national-fee', label: b('National registration fee — Doctorate (everyone, 2026/27)', 'জাতীয় registration fee — Doctorate (সবার জন্য, 2026/27)'), value: b('EUR 398 a year (Sorbonne Université’s published 2026/2027 national rate; doctoral students are not subject to the non-EU "droits différenciés" surcharge)', 'বছরে EUR 398 (Sorbonne Université-র প্রকাশিত 2026/2027 জাতীয় rate; doctoral student-রা non-EU "droits différenciés" surcharge-এর অধীন নন)'), amount: { value: 398, currency: 'EUR', period: 'year' }, source: FR_SORBONNE_FEES };
const DIFFERENTIATED_BACHELORS: GuideCost = { id: 'tuition', label: b('"Droits différenciés" tuition surcharge — Bachelor’s (public universities, most non-EU students, 2026/27)', '"Droits différenciés" tuition surcharge — Bachelor\'s (public university, অধিকাংশ non-EU student, 2026/27)'), value: b('Widely reported at around EUR 2,895–2,902 a year under the 19 May 2026 ministerial decree, on top of the national fee — this guide could not confirm the exact figure directly from an official ministry page, only from press/ICEF reporting and university pages', '19 May 2026-এর ministerial decree-এর অধীনে জাতীয় fee-র উপর বছরে প্রায় EUR 2,895–2,902 বলে ব্যাপকভাবে জানানো হয়েছে — এই guide সরাসরি কোনো official ministry page থেকে সঠিক সংখ্যা নিশ্চিত করতে পারেনি, শুধু press/ICEF-এর report আর university page থেকে'), status: 'partly-verified', amount: { value: 2895, max: 2902, currency: 'EUR', period: 'year' }, source: FR_SORBONNE_EXEMPTION };
const DIFFERENTIATED_MASTERS: GuideCost = { id: 'tuition', label: b('"Droits différenciés" tuition surcharge — Master’s (public universities, most non-EU students, 2026/27)', '"Droits différenciés" tuition surcharge — Master\'s (public university, অধিকাংশ non-EU student, 2026/27)'), value: b('Widely reported at around EUR 3,941–3,950 a year under the 19 May 2026 ministerial decree, on top of the national fee — not confirmed directly from an official ministry page in this research', '19 May 2026-এর ministerial decree-এর অধীনে জাতীয় fee-র উপর বছরে প্রায় EUR 3,941–3,950 বলে ব্যাপকভাবে জানানো হয়েছে — এই গবেষণায় সরাসরি কোনো official ministry page থেকে নিশ্চিত হয়নি'), status: 'partly-verified', amount: { value: 3941, max: 3950, currency: 'EUR', period: 'year' }, source: FR_SORBONNE_EXEMPTION };
const EXEMPTION_NOTE: GuideCost = { id: 'exemption', label: b('University exemption from the "droits différenciés" surcharge', '"droits différenciés" surcharge থেকে university exemption'), value: b('A university may exempt up to 30% of its non-EU students (falling to 25% in 2027/28, 20% from 2028) under the same 2026 decree; Sorbonne Université’s Governing Board decided to grant this exemption to every non-EU applicant who applies and meets its criteria, and Université Paris-Saclay runs a similar partial-exemption scheme bringing fees in line with domestic rates — always apply for it at your own university', 'একই 2026 decree-এর অধীনে একটি university তার non-EU student-দের সর্বোচ্চ 30% (2027/28-এ 25%, 2028 থেকে 20%-এ নামবে) exempt করতে পারে; Sorbonne Université-র Governing Board আবেদন করা আর এর criteria পূরণ করা প্রতিটি non-EU আবেদনকারীকে এই exemption দেওয়ার সিদ্ধান্ত নিয়েছে, আর Université Paris-Saclay দেশীয় rate-এর সমান করা একটি একই রকম partial-exemption scheme চালায় — আপনার নিজের university-তে এটার জন্য অবশ্যই আবেদন করুন'), status: 'verified', source: FR_SORBONNE_EXEMPTION };
const UNVERIFIED: GuideCost[] = [
  { id: 'living', label: b('Living costs', 'থাকা-খাওয়ার খরচ'), value: b('Campus France’s own FAQ gives EUR 600–800 a month for food, transport and housing outside Paris (around EUR 1,000–1,200 in Paris, per other Campus France country pages) — varies a lot by city', 'Campus France-র নিজের FAQ Paris-এর বাইরে খাবার, transport আর থাকার জন্য মাসে EUR 600–800 দেয় (অন্য Campus France country page অনুযায়ী Paris-এ প্রায় EUR 1,000–1,200) — শহর অনুযায়ী অনেক আলাদা'), status: 'partly-verified', source: FR_CF_COST },
  { id: 'cvec', label: b('CVEC (Student and Campus Life Contribution)', 'CVEC (Student and Campus Life Contribution)'), value: b('Not verified from an official page for 2026/2027 — paid once a year before enrolment', 'যাচাই হয়নি 2026/2027-এর জন্য কোনো official page থেকে — enrolment-এর আগে বছরে একবার দিতে হয়'), status: 'not-verified', source: FR_SORBONNE_FEES },
];

// ------------------------------------------------------------------ common sections

const commonTail = () => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [{ embed: 'costs' as const }, FUNDS ? qa('funds-note', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('At least EUR 877.50 a month, the current official figure on service-public.fr.', 'service-public.fr-এর বর্তমান official figure অনুযায়ী অন্তত মাসে EUR 877.50।')], [FR_SP_VISA]) : undefined].filter(Boolean) as GuideAnswer[] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa('types', b('Which universities and grandes écoles are there?', 'কোন কোন university আর grande école আছে?'), [b('The examples below — École Polytechnique, Sciences Po, Sorbonne Université and Université Paris-Saclay — are listed alphabetically, not ordered by quality. Tuition, exemption policies, entry requirements and scholarships differ at each one, so check the official page.', 'নিচের উদাহরণ — École Polytechnique, Sciences Po, Sorbonne Université আর Université Paris-Saclay — বর্ণানুক্রমে, মান অনুযায়ী নয়। Tuition, exemption policy, ভর্তির শর্ত আর scholarship প্রতিটিতে আলাদা, তাই official page দেখুন।')], [FR_SORBONNE_FEES]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work')] },
  { id: 'visa', title: b('Student visa and residence permit', 'Student visa আর residence permit'), items: [eef('eef'), visa('visa'), extension('extension')] },
  { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Apply via Études en France + your institution’s own platform · "droits différenciés" tuition for most non-EU students, but ask about university exemptions', 'Études en France + institution-এর নিজস্ব platform-এর মাধ্যমে আবেদন · অধিকাংশ non-EU student-দের "droits différenciés" tuition, কিন্তু university exemption জিজ্ঞাসা করুন'),
  intro: b(
    "For an English-taught bachelor's (licence) in France, you need a secondary-school certificate recognised as equivalent to the French Baccalaureate, plus the institution's own entrance requirements (an English proof for English-taught programmes; some grandes écoles, such as École Polytechnique, also set strong maths/science prerequisites and their own selection process). Because Bangladesh is one of the 75 countries under the \"Études en France\" procedure (per Campus France's own list), you apply through that platform alongside your institution's own admissions route, then move to the VLS-TS visa once admitted.",
    "France-তে ইংরেজি-মাধ্যম bachelor's (licence)-এর জন্য লাগে French Baccalaureate-এর সমতুল্য বলে স্বীকৃত একটি secondary-school সনদ, সঙ্গে institution-এর নিজস্ব ভর্তির শর্ত (ইংরেজি-মাধ্যম programme-এর জন্য English প্রমাণ; École Polytechnique-এর মতো কিছু grande école নিজস্ব strong maths/science prerequisite আর নিজস্ব selection process-ও ঠিক করে)। Bangladesh \"Études en France\" procedure-এর আওতায় থাকা 75টি দেশের একটি (Campus France-র নিজের তালিকা অনুযায়ী) হওয়ায়, institution-এর নিজস্ব admissions route-এর সাথে সেই platform দিয়ে আবেদন করতে হয়, তারপর ভর্তি হলে VLS-TS visa-র দিকে এগোতে হয়।",
  ),
  costs: { official: [VISA_VALIDATION_FEE, FUNDS, NATIONAL_FEE_BACHELORS], estimates: [DIFFERENTIATED_BACHELORS, EXEMPTION_NOTE, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in France from Bangladesh?", "Bangladesh থেকে France-তে Bachelor's পড়তে কী কী লাগে?"),
          [b('A secondary-school certificate the institution recognises as equivalent to the Baccalaureate, the institution’s own entrance requirements (English proof for English-taught programmes, and for some grandes écoles a competitive written/oral selection), registration through the Études en France platform (since Bangladesh is on its country list), proof of resources of at least EUR 877.50/month, and a VLS-TS student visa.', 'Institution-এর কাছে Baccalaureate-এর সমতুল্য বলে স্বীকৃত একটি secondary-school সনদ, institution-এর নিজস্ব ভর্তির শর্ত (ইংরেজি-মাধ্যম programme-এর জন্য English প্রমাণ, আর কিছু grande école-র জন্য একটি প্রতিযোগিতামূলক written/oral selection), Études en France platform-এর মাধ্যমে registration (Bangladesh এর country list-এ থাকায়), অন্তত মাসে EUR 877.50 টাকার প্রমাণ, আর একটি VLS-TS student visa।'), CHECK_UNI],
          [FR_CF_EEF_COUNTRIES, FR_SP_VISA],
          { status: 'partly-verified' },
        ),
        qa(
          'hsc',
          b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"),
          [b('Not verified yet for Bangladesh specifically: each institution assesses foreign secondary-school certificates for equivalence to the Baccalaureate itself, and how the Bangladeshi HSC is treated in that assessment was not read on an official page for this guide.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: প্রতিটি institution নিজেই Baccalaureate-এর সমতুল্যতার জন্য বিদেশি secondary-school সনদ মূল্যায়ন করে, আর সেই মূল্যায়নে Bangladesh-এর HSC ঠিক কীভাবে দেখা হয়, এই guide-এর জন্য কোনো official page-এ পড়া হয়নি।')],
          [FR_SACLAY_MASTERS],
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
          b("How much IELTS do you need for a Bachelor's in France?", "France-তে Bachelor's-এ IELTS কত লাগে?"),
          [b('Not verified yet as a single national minimum: set per institution and programme. École Polytechnique’s own Bachelor of Science admissions data lists IELTS 6.5+ or TOEFL 90+ as one example, but this guide treats that as one programme’s own figure, not a national rule.', 'একক জাতীয় ন্যূনতম হিসেবে এখনো যাচাই হয়নি: প্রতিটি institution আর programme ঠিক করে। École Polytechnique-এর নিজের Bachelor of Science admissions data IELTS 6.5+ বা TOEFL 90+ একটা উদাহরণ হিসেবে দেয়, কিন্তু এই guide এটাকে একটা programme-এর নিজস্ব সংখ্যা হিসেবে দেখে, জাতীয় নিয়ম না।'), CHECK_UNI],
          [FR_POLYTECHNIQUE_BSC],
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
          b("How much is a Bachelor's in France?", "France-তে Bachelor's-এ খরচ কত?"),
          [b('At any French public university you pay the national registration fee (EUR 178/year, 2026/27) plus, unless exempt, the "droits différenciés" surcharge introduced for most non-EU students in 2019 — widely reported around EUR 2,895–2,902/year for 2026/27, though this guide could not confirm that exact figure from an official ministry page directly. Crucially, each university runs its own exemption scheme: Sorbonne Université, for example, has decided to exempt every non-EU applicant who applies and meets its criteria, so a Bangladeshi applicant there may end up paying only the EUR 178 national fee if the exemption application succeeds. Grandes écoles and Sciences Po set their own separate fees outside this national-fee system — see each university’s profile.', 'যেকোনো ফরাসি public university-তে জাতীয় registration fee (বছরে EUR 178, 2026/27) দিতে হয়, সাথে, exempt না হলে, 2019-এ অধিকাংশ non-EU student-দের জন্য চালু করা "droits différenciés" surcharge — 2026/27-এর জন্য ব্যাপকভাবে বছরে প্রায় EUR 2,895–2,902 বলে জানানো হয়েছে, যদিও এই guide সরাসরি কোনো official ministry page থেকে সঠিক সংখ্যা নিশ্চিত করতে পারেনি। গুরুত্বপূর্ণভাবে, প্রতিটি university নিজস্ব exemption scheme চালায়: যেমন, Sorbonne Université আবেদন করা আর criteria পূরণ করা প্রতিটি non-EU আবেদনকারীকে exempt করার সিদ্ধান্ত নিয়েছে, তাই সেখানে একজন Bangladeshi আবেদনকারী exemption আবেদন সফল হলে শুধু EUR 178 জাতীয় fee দিতে পারেন। Grande école আর Sciences Po এই জাতীয়-fee system-এর বাইরে নিজস্ব আলাদা fee ঠিক করে — প্রতিটি university-র profile দেখুন।')],
          [FR_SORBONNE_FEES, FR_SORBONNE_EXEMPTION],
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
  card: b("Bachelor's needed · the post-study job-search card needs this level or above", "Bachelor's লাগে · পড়া-পরের চাকরি-খোঁজার card-এ এই level বা তার বেশি লাগে"),
  intro: b(
    "A French master's needs a recognised bachelor's degree plus the institution's own requirements. Depending on your prior education, you apply through INCEPTION/Mon Master (public-university masters), a grande école's own portal, or Sciences Po's international graduate-admissions procedure, alongside the mandatory Études en France platform. Tuition at public universities follows the same two-part system as bachelor's level (national fee + \"droits différenciés\" unless exempt); Sciences Po and the grandes écoles set their own separate fees.",
    "একটি ফরাসি master's-এ লাগে স্বীকৃত bachelor's degree সঙ্গে institution-এর নিজস্ব শর্ত। আগের পড়া অনুযায়ী, public-university master's-এর জন্য INCEPTION/Mon Master, একটি grande école-র নিজস্ব portal, বা Sciences Po-র international graduate-admissions procedure দিয়ে আবেদন করতে হয়, সাথে বাধ্যতামূলক Études en France platform। Public university-তে tuition bachelor's level-এর একই দুই-অংশের system অনুসরণ করে (জাতীয় fee + exempt না হলে \"droits différenciés\"); Sciences Po আর grande école নিজস্ব আলাদা fee ঠিক করে।",
  ),
  costs: { official: [VISA_VALIDATION_FEE, FUNDS, NATIONAL_FEE_MASTERS], estimates: [DIFFERENTIATED_MASTERS, EXEMPTION_NOTE, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in France?", "France-তে Master's-এ কী লাগে?"),
          [b("A bachelor's degree (or equivalent) the institution recognises as giving access to the programme, plus the institution's own requirements (English proof, sometimes an interview or a written test). Sciences Po, for example, routes applicants with a non-French undergraduate degree through its own \"international graduate admissions procedure,\" separate from its domestic one. Not verified yet for Bangladesh specifically: how institutions assess a Bangladeshi bachelor's degree was not read on an official page.", "Programme-এর যোগ্যতা দেয় বলে institution-এর কাছে স্বীকৃত bachelor's degree (বা সমমান), সঙ্গে institution-এর নিজস্ব শর্ত (English প্রমাণ, কখনো interview বা একটি written test)। যেমন, Sciences Po non-French undergraduate degree থাকা আবেদনকারীদের এর নিজস্ব \"international graduate admissions procedure\"-এর মধ্য দিয়ে নিয়ে যায়, যা এর দেশীয় procedure থেকে আলাদা। Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: institution-গুলো Bangladesh-এর bachelor's degree ঠিক কীভাবে মূল্যায়ন করে, কোনো official page-এ পড়া হয়নি।")],
          [FR_SCIENCESPO_GRAD],
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
          [b('Not verified yet as a single national minimum for English-taught master’s programmes — set by each institution and programme.', 'ইংরেজি-মাধ্যম master\'s programme-এর জন্য একক জাতীয় ন্যূনতম হিসেবে এখনো যাচাই হয়নি — প্রতিটি institution আর programme ঠিক করে।'), CHECK_UNI],
          [FR_SCIENCESPO_GRAD],
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
          b("How much is a Master's in France?", "France-তে Master's-এ খরচ কত?"),
          [b('At a public university: the EUR 255/year national fee (2026/27) plus, unless exempt, the "droits différenciés" surcharge (widely reported around EUR 3,941–3,950/year for 2026/27, not confirmed directly from an official ministry page) — again, ask your specific university about its own exemption policy, since Sorbonne Université and Université Paris-Saclay both run one. Sciences Po instead charges a flat EUR 20,640/year for non-European students at graduate level, confirmed on its own official tuition page, with no income-based reduction for non-EU applicants (unlike French/EEA students).', 'একটি public university-তে: 2026/27-এর বছরে EUR 255 জাতীয় fee, সাথে, exempt না হলে, "droits différenciés" surcharge (2026/27-এর জন্য ব্যাপকভাবে বছরে প্রায় EUR 3,941–3,950 বলে জানানো, সরাসরি কোনো official ministry page থেকে নিশ্চিত হয়নি) — আবার, আপনার নির্দিষ্ট university-কে এর নিজস্ব exemption policy জিজ্ঞাসা করুন, কারণ Sorbonne Université আর Université Paris-Saclay দুটোই একটা চালায়। Sciences Po এর বদলে graduate level-এ non-European student-দের জন্য একটি flat বছরে EUR 20,640 নেয়, এর নিজস্ব official tuition page-এ নিশ্চিত, non-EU আবেদনকারীদের জন্য কোনো income-based ছাড় নেই (French/EEA student-দের মতো না)।')],
          [FR_SORBONNE_EXEMPTION, FR_SCIENCESPO_FEES],
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
  card: b('A recognised master’s needed · doctoral students are not charged the "droits différenciés" surcharge', 'স্বীকৃত master\'s লাগে · doctoral student-দের "droits différenciés" surcharge দিতে হয় না'),
  intro: b(
    "A French PhD needs a recognised master's degree and, usually, a supervisor and a doctoral school willing to take you on. Doctoral students pay only the national registration fee (EUR 398/year at Sorbonne Université for 2026/27) — Sorbonne's own page explicitly says doctoral students, like EU students, are not subject to the non-EU \"droits différenciés\" surcharge. Admission, supervision and funding (a contrat doctoral, a co-supervised thesis, or your own funding) are arranged with each institution's own doctoral school.",
    "একটি ফরাসি PhD-তে লাগে স্বীকৃত master's degree আর, সাধারণত, একজন supervisor আর নিতে ইচ্ছুক একটি doctoral school। Doctoral student-রা শুধু জাতীয় registration fee দেন (Sorbonne Université-তে 2026/27-এর জন্য বছরে EUR 398) — Sorbonne-এর নিজের page স্পষ্টভাবে বলে doctoral student-রা, EU student-দের মতো, non-EU \"droits différenciés\" surcharge-এর অধীন নন। ভর্তি, supervision আর funding (একটি contrat doctoral, একটি co-supervised thesis, বা নিজের funding) প্রতিটি institution-এর নিজস্ব doctoral school-এর সঙ্গে ঠিক হয়।",
  ),
  costs: { official: [VISA_VALIDATION_FEE, FUNDS, NATIONAL_FEE_PHD], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in France?', 'France-তে কীভাবে PhD পাওয়া যায়?'),
          [
            b('You need a recognised master’s degree and, in most fields, a supervisor and a doctoral school willing to accept you (often tied to a funded position such as a contrat doctoral). Apply through the mandatory Études en France platform alongside the institution’s own doctoral-school process; exact entry requirements, funding routes and application rounds beyond this general shape are set by each institution’s own doctoral school and were not verified here as general national rules.', 'লাগে স্বীকৃত master\'s degree আর, অধিকাংশ ক্ষেত্রে, একজন supervisor আর গ্রহণ করতে ইচ্ছুক একটি doctoral school (প্রায়ই একটি funded position, যেমন contrat doctoral-এর সাথে যুক্ত)। Institution-এর নিজস্ব doctoral-school process-এর সাথে বাধ্যতামূলক Études en France platform দিয়ে আবেদন করুন; এই সাধারণ ধারার বাইরে সঠিক ভর্তির শর্ত, funding route আর আবেদনের সময় প্রতিটি institution-এর নিজস্ব doctoral school ঠিক করে, সাধারণ জাতীয় নিয়ম হিসেবে এখানে যাচাই হয়নি।'),
            CHECK_UNI,
          ],
          [FR_SORBONNE_FEES, FR_CF_EEF_COUNTRIES],
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
          [b('Not verified yet as a general rule: each institution’s doctoral school and supervisor state their own English/French requirement.', 'সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: প্রতিটি institution-এর doctoral school আর supervisor নিজের English/French শর্ত দেয়।')],
          [FR_SORBONNE_FEES],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ the country

export const FR_GUIDE: CountryGuide = {
  code: 'FR',
  checkedAt: FR_READ,
  sourcesPerSection: true,
  intro: b(
    'Bangladeshi applicants must go through the "Études en France" procedure (run with Campus France) before applying for a VLS-TS student visa — a long-stay visa valid as a residence permit, issued for 4 months to 1 year, which you validate online within 3 months of arrival for a EUR 100 tax. After a year you can move to a multi-annual student residence card lasting the rest of your study programme. You need to show at least EUR 877.50 a month (raised in 2026 from EUR 615) and may work up to 964 hours a year (60% of the annual legal working time) without a separate work permit. Tuition at public universities has two layers since 2019: a small national fee (EUR 178–398/year by level, 2026/27) and, for most non-EU students, a "droits différenciés" surcharge (reported around EUR 2,895–3,950/year, not confirmed directly from an official ministry page) — but universities may exempt up to 30% of non-EU applicants, and Sorbonne Université and Université Paris-Saclay both told this guide they intend to exempt every non-EU applicant who applies and qualifies. Grandes écoles and Sciences Po set their own separate fees outside this system. After graduating, Bangladesh is not on the list of nationalities eligible for the easier, bilateral-agreement post-study permit; instead, a master’s-or-above graduate uses the general 12-month "recherche d’emploi ou création d’entreprise" (RECE) card, which allows unrestricted work during its validity. France’s student social-security scheme was abolished in 2018; students instead join the general health-insurance scheme automatically once enrolled. The Eiffel Excellence Scholarship (run by the Ministry for Europe and Foreign Affairs) is open worldwide for master’s/PhD study but can only be applied for through a French host institution’s own nomination — no official page names or excludes Bangladesh. This guide is built from service-public.fr / the Ministry of the Interior, France’s online immigration-procedure portals, France-Visas, Campus France (including its Bangladesh office) and university pages.',
    'Bangladesh-এর আবেদনকারীদের VLS-TS student visa-র আবেদনের আগে "Études en France" procedure (Campus France-এর সাথে চালানো) দিয়ে যেতে হয় — একটি long-stay visa valid as a residence permit, যা 4 মাস থেকে 1 বছরের জন্য ইস্যু হয়, যা পৌঁছানোর 3 মাসের মধ্যে EUR 100 tax দিয়ে অনলাইনে validate করতে হয়। এক বছর পর আপনার পড়ার বাকি সময়ের জন্য একটি multi-annual student residence card-এ যাওয়া যায়। অন্তত মাসে EUR 877.50 (2026-এ EUR 615 থেকে বাড়ানো) দেখাতে হয় আর আলাদা কোনো work permit ছাড়া বছরে 964 ঘণ্টা (বার্ষিক legal working time-এর 60%) পর্যন্ত কাজ করা যায়। 2019 থেকে public university-তে tuition-এর দুটো স্তর আছে: একটা ছোট জাতীয় fee (level অনুযায়ী বছরে EUR 178–398, 2026/27), আর অধিকাংশ non-EU student-দের জন্য একটা "droits différenciés" surcharge (বছরে প্রায় EUR 2,895–3,950 বলে জানানো, সরাসরি কোনো official ministry page থেকে নিশ্চিত হয়নি) — কিন্তু university non-EU আবেদনকারীদের সর্বোচ্চ 30% exempt করতে পারে, আর Sorbonne Université আর Université Paris-Saclay দুটোই এই guide-কে বলেছে তারা আবেদন করা আর যোগ্য প্রতিটি non-EU আবেদনকারীকে exempt করতে চায়। Grande école আর Sciences Po এই system-এর বাইরে নিজস্ব আলাদা fee ঠিক করে। পড়া শেষে, সহজ, bilateral-agreement পড়া-পরের permit-এর জন্য যোগ্য জাতীয়তার তালিকায় Bangladesh নেই; এর বদলে, master\'s বা তার বেশি পাওয়া একজন graduate সাধারণ 12-মাসের "recherche d’emploi ou création d’entreprise" (RECE) card ব্যবহার করেন, যা এর validity-তে নিষেধাজ্ঞাহীন কাজের অনুমতি দেয়। France-এর student social-security scheme 2018-এ বাতিল হয়েছে; student-রা এর বদলে ভর্তির পর স্বয়ংক্রিয়ভাবে general health-insurance scheme-এ যুক্ত হন। Eiffel Excellence Scholarship (Ministry for Europe and Foreign Affairs চালায়) master\'s/PhD পড়ার জন্য বিশ্বজুড়ে খোলা কিন্তু শুধু একটি ফরাসি host institution-এর নিজস্ব nomination-এর মাধ্যমে আবেদন করা যায় — কোনো official page Bangladesh-কে নাম বা বাদ দেয় না। এই guide service-public.fr / Ministry of the Interior, France-এর online immigration-procedure portal, France-Visas, Campus France (তার Bangladesh office-সহ), আর university page থেকে তৈরি।',
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [FR_CF_EEF_COUNTRIES, FR_SP_WORK, FR_SP_VISA, FR_RECE_GENERAL],
      {
        kind: 'guidance',
        list: [
          b('Skipping the "Études en France" platform because you plan to apply on an institution’s own site too — Bangladesh is on Campus France’s list of 75 countries where it is required alongside, not instead of, the institution’s own admissions route.', '"Études en France" platform skip করা কারণ আপনি institution-এর নিজের site-এও আবেদন করার পরিকল্পনা করছেন — Bangladesh Campus France-র তালিকার 75টি দেশের একটি যেখানে এটা institution-এর নিজস্ব admissions route-এর বদলে না, সাথে লাগে।'),
          b('Assuming the 964-hour work cap also applies after graduation — the general post-study RECE card for Bangladeshi graduates (master’s and above) instead allows unrestricted work for its 12-month, non-renewable validity.', 'ধরে নেওয়া যে 964-ঘণ্টার কাজের সীমা পড়া শেষেও প্রযোজ্য — Bangladeshi graduate-দের (master\'s আর তার বেশি) জন্য সাধারণ পড়া-পরের RECE card এর বদলে এর 12-মাসের, renew-অযোগ্য validity-তে নিষেধাজ্ঞাহীন কাজের অনুমতি দেয়।'),
          b('Assuming you automatically qualify for the easier, bilateral-agreement end-of-studies permit — that one is limited to a specific, named list of nationalities (including India but not Bangladesh).', 'ধরে নেওয়া যে আপনি স্বয়ংক্রিয়ভাবে সহজ, bilateral-agreement পড়া-শেষের permit-এর জন্য যোগ্য — এটা একটি নির্দিষ্ট, নামযুক্ত জাতীয়তার তালিকার জন্য সীমিত (যার মধ্যে India আছে, Bangladesh নেই)।'),
          b('Assuming a bachelor’s degree alone qualifies you for the post-study job-search card — it generally requires a licence professionnelle or at least a master’s-equivalent diploma.', 'ধরে নেওয়া যে একা একটা bachelor\'s degree পড়া-পরের চাকরি-খোঁজার card-এর জন্য যোগ্য করে — সাধারণত একটি licence professionnelle বা অন্তত master\'s-সমতুল্য diploma লাগে।'),
          b('Using the 615-euro figure for proof of resources — the official figure on service-public.fr was raised to EUR 877.50 by a 2026 decree.', 'টাকার প্রমাণে 615-euro সংখ্যা ব্যবহার করা — service-public.fr-এর official figure 2026-এর একটি decree দ্বারা EUR 877.50-এ বাড়ানো হয়েছে।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in France from Bangladesh?", "Bangladesh থেকে France-তে Bachelor's পড়তে কী কী লাগে?"), [b('A secondary-school certificate recognised as equivalent to the Baccalaureate, the institution’s own entrance requirements, registration via the mandatory Études en France platform, proof of resources (EUR 877.50/month), and a VLS-TS student visa.', 'Baccalaureate-এর সমতুল্য বলে স্বীকৃত একটি secondary-school সনদ, institution-এর নিজস্ব ভর্তির শর্ত, বাধ্যতামূলক Études en France platform-এর মাধ্যমে registration, টাকার প্রমাণ (মাসে EUR 877.50), আর একটি VLS-TS student visa।')], [FR_CF_EEF_COUNTRIES, FR_SP_VISA], { status: 'partly-verified' }),
    qa('hsc', b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"), [b('Not verified yet for Bangladesh specifically: each institution assesses foreign secondary certificates for Baccalaureate-equivalence itself; how the Bangladeshi HSC is treated was not read on an official page.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: প্রতিটি institution নিজেই Baccalaureate-সমতুল্যতার জন্য বিদেশি secondary সনদ মূল্যায়ন করে; Bangladesh-এর HSC ঠিক কীভাবে দেখা হয়, কোনো official page-এ পড়া হয়নি।')], [FR_SACLAY_MASTERS], { status: 'not-verified' }),
    qa('cost', b('How much does it cost to study in France?', 'France-তে পড়াশোনার খরচ কত?'), [b('A small national fee (EUR 178–398/year by level, 2026/27) plus, unless exempted by your university, a "droits différenciés" surcharge for non-EU students at public universities (reported around EUR 2,895–3,950/year, not confirmed directly from an official ministry page). Grandes écoles and Sciences Po set their own separate fees (e.g. EUR 19,200/year non-EU for École Polytechnique’s Bachelor of Science; EUR 20,640/year non-EU for Sciences Po’s graduate level). Living costs run about EUR 600–800/month outside Paris, per Campus France.', 'একটা ছোট জাতীয় fee (level অনুযায়ী বছরে EUR 178–398, 2026/27), সাথে, আপনার university exempt না করলে, public university-তে non-EU student-দের জন্য একটা "droits différenciés" surcharge (বছরে প্রায় EUR 2,895–3,950 বলে জানানো, সরাসরি কোনো official ministry page থেকে নিশ্চিত হয়নি)। Grande école আর Sciences Po নিজস্ব আলাদা fee ঠিক করে (যেমন, École Polytechnique-এর Bachelor of Science-এ non-EU-এর জন্য বছরে EUR 19,200; Sciences Po-র graduate level-এ non-EU-এর জন্য বছরে EUR 20,640)। Campus France অনুযায়ী Paris-এর বাইরে থাকা-খাওয়ার খরচ মাসে প্রায় EUR 600–800।')], [FR_SORBONNE_EXEMPTION, FR_CF_COST], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for France?', 'France-তে IELTS কত লাগে?'), [b('Not verified yet as a single national minimum; set by each institution/programme. No single figure applies everywhere.', 'একক জাতীয় ন্যূনতম হিসেবে এখনো যাচাই হয়নি; প্রতিটি institution/programme ঠিক করে। সব জায়গায় প্রযোজ্য একক কোনো সংখ্যা নেই।')], [FR_POLYTECHNIQUE_BSC], { status: 'not-verified' }),
    qa('visa', b('What do you need for the VLS-TS visa?', 'VLS-TS visa-র জন্য কী কী লাগে?'), [b('Registration through Études en France (Bangladesh is on its country list), an institution’s acceptance letter, proof of resources (EUR 877.50/month), and the EUR 100 online-validation tax paid within 3 months of arrival.', 'Études en France-এর মাধ্যমে registration (Bangladesh এর country list-এ আছে), একটি institution-এর acceptance letter, টাকার প্রমাণ (মাসে EUR 877.50), আর পৌঁছানোর 3 মাসের মধ্যে দেওয়া EUR 100 online-validation tax।')], [FR_CF_EEF_COUNTRIES, FR_SP_VISA]),
    qa('work', b('Can you work while studying in France?', 'France-তে পড়ার পাশাপাশি কাজ করা যায়?'), [b('Yes: up to 964 hours a year (60% of the annual legal working time) without a separate work permit, counted from when your VLS-TS was validated or your card issued; your employer must register with the prefecture at least 2 working days before hiring you.', 'হ্যাঁ: আলাদা কোনো work permit ছাড়া বছরে 964 ঘণ্টা (বার্ষিক legal working time-এর 60%) পর্যন্ত, আপনার VLS-TS validate হওয়ার বা card ইস্যু হওয়ার সময় থেকে গোনা; কাজে নেওয়ার অন্তত 2 working day আগে আপনার employer-কে prefecture-এ register করতে হয়।')], [FR_SP_WORK]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('The Eiffel Excellence Scholarship (Ministry for Europe and Foreign Affairs, master’s/PhD) is open worldwide, but it can only be applied for through a French host institution’s own nomination of your file, not directly by you. No official page read names or excludes Bangladesh.', 'Eiffel Excellence Scholarship (Ministry for Europe and Foreign Affairs, master\'s/PhD) বিশ্বজুড়ে খোলা, কিন্তু শুধু একটি ফরাসি host institution-এর নিজস্ব file nomination-এর মাধ্যমে আবেদন করা যায়, সরাসরি আপনার নিজে না। পড়া কোনো official page Bangladesh-কে নাম বা বাদ দেয়নি।')], [FR_CF_BD_PROCEDURE], { status: 'partly-verified' }),
    qa('after', b('Can you stay in France after graduating?', 'পড়া শেষে France-তে থাকা যায়?'), [b('Yes, with a master’s-or-above diploma (a bachelor’s alone generally does not qualify): a 12-month, non-renewable "recherche d’emploi ou création d’entreprise" (RECE) card that lets you work without restriction while you look for a job or start a business. The easier, hours-capped bilateral APS is limited to a named list of other nationalities and does not include Bangladesh.', 'হ্যাঁ, master\'s বা তার বেশি diploma থাকলে (একা bachelor\'s সাধারণত যোগ্য করে না): একটি 12-মাসের, renew-অযোগ্য "recherche d’emploi ou création d’entreprise" (RECE) card যা চাকরি খোঁজা বা ব্যবসা শুরুর সময় নিষেধাজ্ঞাহীনভাবে কাজ করতে দেয়। সহজ, ঘণ্টা-সীমাবদ্ধ bilateral APS অন্য নামযুক্ত জাতীয়তার তালিকার জন্য সীমিত আর তাতে Bangladesh নেই।')], [FR_APS_BILATERAL, FR_RECE_GENERAL], { status: 'partly-verified' }),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('At least EUR 877.50 a month, the current figure on service-public.fr (raised in 2026 from EUR 615), shown by bank funds, a sponsor’s statements, payslips, or a scholarship certificate.', 'service-public.fr-এর বর্তমান figure অনুযায়ী অন্তত মাসে EUR 877.50 (2026-এ EUR 615 থেকে বাড়ানো), bank-এর টাকা, একজন sponsor-এর statement, payslip, বা scholarship-এর সনদ দিয়ে দেখানো যায়।')], [FR_SP_VISA]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before admission: passport, secondary-school/prior-degree certificates, an English proof. On the Études en France / visa stage: an acceptance letter, proof of resources, and the visa-validation tax. After arrival: health-insurance registration, the CVEC receipt, and your residence-permit paperwork for any later renewal.', 'ভর্তির আগে: passport, secondary-school/আগের degree-র সনদ, English প্রমাণ। Études en France / visa পর্যায়ে: একটি acceptance letter, টাকার প্রমাণ, আর visa-validation tax। পৌঁছানোর পরে: health-insurance registration, CVEC receipt, আর পরের যেকোনো renewal-এর জন্য residence-permit কাগজপত্র।')], [FR_SP_VISA, FR_CF_BD_VISA_DOCS]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A recognised bachelor's degree and the institution's own requirements; at a public university you pay the national fee plus, unless exempted, the \"droits différenciés\" surcharge, while Sciences Po charges a flat EUR 20,640/year for non-European graduate students.", "স্বীকৃত bachelor's degree আর institution-এর নিজস্ব শর্ত; একটি public university-তে জাতীয় fee দিতে হয়, সাথে, exempt না হলে, \"droits différenciés\" surcharge, যদিও Sciences Po non-European graduate student-দের জন্য একটি flat বছরে EUR 20,640 নেয়।")], [FR_SORBONNE_EXEMPTION, FR_SCIENCESPO_FEES]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('A recognised master’s degree and, usually, a supervisor and funded position arranged with an institution’s own doctoral school. Doctoral students are not charged the non-EU "droits différenciés" surcharge; entry rules beyond this are set per institution (not verified here as general national rules).', 'স্বীকৃত master\'s degree আর, সাধারণত, একটি institution-এর নিজস্ব doctoral school-এর সাথে ঠিক করা একজন supervisor আর funded position। Doctoral student-দের non-EU "droits différenciés" surcharge দিতে হয় না; এর বাইরে ভর্তির নিয়ম প্রতিটি institution ঠিক করে (সাধারণ জাতীয় নিয়ম হিসেবে এখানে যাচাই হয়নি)।')], [FR_SORBONNE_FEES], { status: 'partly-verified' }),
    qa('universities', b('Which universities and grandes écoles are there?', 'কোন কোন university আর grande école আছে?'), [b('Examples on each degree page — École Polytechnique, Sciences Po, Sorbonne Université and Université Paris-Saclay — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — École Polytechnique, Sciences Po, Sorbonne Université আর Université Paris-Saclay — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [FR_SORBONNE_FEES]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: Campus France’s own list names Bangladesh among the 75 countries that must use the "Études en France" procedure before applying for a visa (service-public.fr’s shorter illustrative table does not print Bangladesh, a discrepancy this guide flags and resolves in Campus France’s favour since every Bangladesh-facing Campus France page uses this procedure). Bangladesh is also not on the named-nationality list for the easier, hours-capped bilateral end-of-studies permit (unlike, for example, India), so a Bangladeshi master’s-or-above graduate instead uses the general, unrestricted-work RECE card. No official page read names a French-government scholarship specifically reserved for, or specifically closed to, Bangladeshi students. The exact way Bangladeshi secondary-school and bachelor’s qualifications are individually assessed for equivalence, and any Bangladesh-specific visa document checklist beyond the general one, were not verified here.', 'Bangladesh-এর জন্য যাচাই করা: Campus France-র নিজের তালিকা visa আবেদনের আগে "Études en France" procedure ব্যবহার করতে হবে এমন 75টি দেশের মধ্যে Bangladesh-এর নাম দেয় (service-public.fr-এর ছোট উদাহরণ তালিকায় Bangladesh ছাপা নেই, একটি অসঙ্গতি যা এই guide চিহ্নিত করে আর Campus France-র পক্ষে সমাধান করে কারণ প্রতিটি Bangladesh-facing Campus France page এই procedure ব্যবহার করে)। Bangladesh সহজ, ঘণ্টা-সীমাবদ্ধ bilateral পড়া-শেষের permit-এর নামযুক্ত জাতীয়তার তালিকায়ও নেই (India-র মতো না, উদাহরণস্বরূপ), তাই master\'s বা তার বেশি পাওয়া একজন Bangladeshi graduate এর বদলে সাধারণ, নিষেধাজ্ঞাহীন-কাজ RECE card ব্যবহার করেন। পড়া কোনো official page বিশেষভাবে Bangladesh-এর student-দের জন্য সংরক্ষিত, বা বিশেষভাবে বন্ধ, কোনো ফরাসি-সরকারের scholarship নাম দেয়নি। Bangladesh-এর secondary-school আর bachelor\'s যোগ্যতা সমতুল্যতার জন্য ঠিক কীভাবে আলাদাভাবে মূল্যায়ন হয়, আর সাধারণের বাইরে কোনো Bangladesh-নির্দিষ্ট visa document checklist, এখানে যাচাই হয়নি।'),
    ], [FR_CF_EEF_COUNTRIES, FR_APS_BILATERAL, FR_RECE_GENERAL], { status: 'partly-verified' }),
  ],
  life: [
    qa('health-care', b('How does healthcare work?', 'চিকিৎসা ব্যবস্থা কেমন?'), [b('France abolished its separate student social-security scheme in 2018 (the "loi ORE"); international students instead register, free of charge, for the general health-insurance (Assurance Maladie) scheme online once enrolled at their institution. Many students also take out a complementary private "mutuelle" for the costs the general scheme does not cover. This guide confirmed the general shape from forum and university pages, not a fully read official ameli.fr procedure page, so check ameli.fr or your institution’s international office for the exact current steps.', 'France 2018-এ ("loi ORE") এর আলাদা student social-security scheme বাতিল করেছে; international student-রা এর বদলে institution-এ ভর্তির পর বিনামূল্যে অনলাইনে general health-insurance (Assurance Maladie) scheme-এ register করেন। অনেক student general scheme কভার না করা খরচের জন্য একটি complementary private "mutuelle"-ও নেন। এই guide সাধারণ ধারাটা forum আর university page থেকে নিশ্চিত করেছে, একটি সম্পূর্ণ পড়া official ameli.fr procedure page থেকে না, তাই সঠিক বর্তমান পদক্ষেপের জন্য ameli.fr বা আপনার institution-এর international office দেখুন।')], [FR_SP_VISA]),
  ],
  documents: FR_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'estimate', status: 'partly-verified', value: { min: 2895, max: 3950, unit: 'EUR/year', text: b('National fee (EUR 178–398/year) plus a "droits différenciés" surcharge for most non-EU students at public universities (reported around EUR 2,895–3,950/year), unless the university grants an exemption.', 'জাতীয় fee (বছরে EUR 178–398), সাথে public university-তে অধিকাংশ non-EU student-দের জন্য একটি "droits différenciés" surcharge (বছরে প্রায় EUR 2,895–3,950 বলে জানানো), যদি না university exemption দেয়।') }, source: FR_SORBONNE_EXEMPTION },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 877.5, unit: 'EUR/month', text: b('At least EUR 877.50 a month, per the current official figure on service-public.fr (raised from EUR 615 by a 2026 decree).', 'service-public.fr-এর বর্তমান official figure অনুযায়ী অন্তত মাসে EUR 877.50 (2026-এর একটি decree দ্বারা EUR 615 থেকে বাড়ানো)।') }, source: FR_SP_VISA },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { max: 964, unit: 'hours/year', text: b('Up to 964 hours a year (60% of the annual legal working time), no separate work permit needed within the cap.', 'বছরে 964 ঘণ্টা পর্যন্ত (বার্ষিক legal working time-এর 60%), সীমার মধ্যে আলাদা কোনো work permit লাগে না।') }, source: FR_SP_WORK },
    { id: 'post-study-stay', kind: 'fact', status: 'partly-verified', value: { max: 12, unit: 'months', text: b('A 12-month, non-renewable RECE card for Bangladeshi graduates with a master’s-or-above diploma, allowing unrestricted work; a bachelor’s alone generally does not qualify.', 'Master\'s বা তার বেশি diploma থাকা Bangladeshi graduate-দের জন্য একটি 12-মাসের, renew-অযোগ্য RECE card, যা নিষেধাজ্ঞাহীন কাজের অনুমতি দেয়; একা bachelor\'s সাধারণত যোগ্য করে না।') }, source: FR_RECE_GENERAL },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 100, unit: 'EUR', text: b('EUR 100 to validate a first VLS-TS online; EUR 150 (tax + stamp duty) for each later residence-permit renewal.', 'প্রথম VLS-TS অনলাইনে validate করতে EUR 100; প্রতিটি পরের residence-permit renewal-এ EUR 150 (tax + stamp duty)।') }, source: FR_SP_VISA },
  ],
};

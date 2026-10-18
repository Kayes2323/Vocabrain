import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  ES_AECID_BECAS_LATAM_AFRICA_ASIA,
  ES_EMBAJADA_DHAKA,
  ES_IEU_ADMISSION_PROCESS,
  ES_MIGRACIONES_EMPLEO,
  ES_MIGRACIONES_ESTANCIA,
  ES_MIGRACIONES_IPREM,
  ES_MIGRACIONES_MODIFICACIONES,
  ES_READ,
  ES_UAB_PRICES,
  ES_UAM_PRECIOS,
  ES_UCM_FEES,
} from './es-sources';

/**
 * Spain reading guide, researched on its own from Spanish official
 * sources (the Ministerio de Inclusión, Seguridad Social y Migraciones'
 * own Migraciones portal, inclusion.gob.es, for the student long-stay
 * authorisation, work access and the post-study job-seeking
 * authorisation; the Ministerio de Asuntos Exteriores, Unión Europea y
 * Cooperación's own exteriores.gob.es for the consulate visa process and
 * the Embassy of Spain in Bangladesh; AECID's own aecid.es for
 * scholarships; and university pages). Nothing is taken from another
 * country's guide. Spain IS an EU/EEA and Schengen member, but a
 * Bangladeshi applicant is still a third-country national under Spanish
 * immigration law, so Spain's own national rules apply throughout.
 * Amounts stay in EUR, the source's own currency, and are never
 * converted. It covers Bachelor's (Grado), Master's and PhD (Doctorado)
 * study for Bangladeshi (non-EU/EEA) students. Spain's 2023 "Ley de
 * Startups" reforms and the new Reglamento de Extranjería (Real Decreto
 * 1155/2024, in force since the pages read for this guide) significantly
 * liberalised work rights (automatic work authorisation up to 30
 * hours/week, no separate permit needed, up from a lower, permit-based
 * limit before the reform) and post-study options (a 24-month
 * job-seeking/business authorisation) for international students — this
 * guide reads those CURRENT, post-reform rules, not older figures that
 * may still circulate on secondary sites.
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
  'IE University, the Universitat Autònoma de Barcelona, the Universidad Autónoma de Madrid, the Universitat de Barcelona and the Universidad Complutense de Madrid are not identical: public universities’ tuition is set by each autonomous region (Madrid or Catalonia), private universities such as IE set their own fees, and every institution sets its own admission requirements, application windows and language rules. Always check the exact programme on the institution’s own admissions page.',
  'IE University, Universitat Autònoma de Barcelona, Universidad Autónoma de Madrid, Universitat de Barcelona, আর Universidad Complutense de Madrid একরকম না: public university-র tuition প্রতিটি autonomous region (Madrid বা Catalonia) ঠিক করে, IE-র মতো private university নিজের fee ঠিক করে, আর প্রতিটি institution নিজের ভর্তির শর্ত, application window, আর ভাষার নিয়ম ঠিক করে। সবসময় প্রতিষ্ঠানের নিজের admissions page-এ সঠিক programme দেখে নিন।',
);

const EU_NOTE = b(
  'Spain is an EU/EEA member and a full Schengen member — but Bangladesh is not an EU/EEA country, so a Bangladeshi applicant is still a "third-country national" under Spanish immigration law and needs Spain’s own student long-stay authorisation ("autorización de estancia de larga duración por estudios"), not a simplified EU-citizen process.',
  'Spain EU/EEA-র সদস্য আর একটি পূর্ণ Schengen সদস্য — কিন্তু Bangladesh EU/EEA দেশ না, তাই একজন Bangladeshi আবেদনকারী Spanish immigration আইনের অধীনে এখনো একজন "third-country national", আর তার Spain-র নিজের student long-stay authorisation ("autorización de estancia de larga duración por estudios") লাগে, কোনো সহজ EU-নাগরিক process না।',
);

// ------------------------------------------------------------------ shared answers

const visaRequired = (id: string) =>
  qa(
    id,
    b('Does a Bangladeshi student need a visa/residence authorisation to study in Spain?', 'Bangladesh-এর student-দের Spain-এ পড়তে visa/residence authorisation লাগে কি?'),
    [
      b(
        'Yes. A third-country national studying in Spain for more than 90 days needs the long-stay authorisation for studies ("autorización de estancia de larga duración por estudios"), per the Ministerio de Inclusión’s own Migraciones page. Because Bangladesh is not visa-exempt, the application is submitted in person at the Spanish diplomatic mission or consular office with jurisdiction over the applicant’s place of residence — Spain’s own exteriores.gob.es confirms Spain has an Embassy in Dhaka, Bangladesh, which handles consular affairs including visas, so Bangladeshi applicants apply there rather than at a third country’s mission.',
        'হ্যাঁ। 90 দিনের বেশি Spain-এ পড়া একজন third-country national-এর জন্য studies-এর long-stay authorisation ("autorización de estancia de larga duración por estudios") লাগে, Ministerio de Inclusión-এর নিজের Migraciones page অনুযায়ী। Bangladesh visa-exempt না হওয়ায়, application আবেদনকারীর বসবাসের স্থানের উপর jurisdiction থাকা Spanish diplomatic mission বা consular office-এ ব্যক্তিগতভাবে জমা দিতে হয় — Spain-র নিজের exteriores.gob.es নিশ্চিত করে যে Bangladesh-এর Dhaka-তে Spain-এর একটি Embassy আছে, যা visa-সহ consular affairs পরিচালনা করে, তাই Bangladeshi আবেদনকারীরা অন্য কোনো দেশের mission-এ না গিয়ে এখানে আবেদন করেন।',
      ),
      EU_NOTE,
    ],
    [ES_MIGRACIONES_ESTANCIA, ES_EMBAJADA_DHAKA],
    { allDegrees: true },
  );

const visaProcess = (id: string) =>
  qa(
    id,
    b('How does the application work, and how long does it take?', 'Application কীভাবে কাজ করে, আর কত সময় লাগে?'),
    [
      b(
        'The Ministerio de Inclusión’s own page states the application must be submitted at least two months before studies begin, unless a fixed enrolment date or another exceptional reason makes that impossible. Once submitted at the consulate, the maximum period to notify a decision is one month from the day after filing; if nothing is notified within that month, the application is deemed refused by administrative silence. An approved visa must then be collected within two months of notification, or it is treated as abandoned. If the stay is longer than six months, the student must personally apply for the foreigner identity card (TIE) within one month of entering Spain.',
        'Ministerio de Inclusión-এর নিজের page বলে application পড়াশোনা শুরুর অন্তত দুই মাস আগে জমা দিতে হবে, যদি না একটি নির্দিষ্ট ভর্তির তারিখ বা অন্য ব্যতিক্রমী কারণ এটা অসম্ভব করে। Consulate-এ জমা দেওয়ার পর, সিদ্ধান্ত জানানোর সর্বোচ্চ সময়কাল জমা দেওয়ার পরের দিন থেকে এক মাস; সেই এক মাসের মধ্যে কিছু না জানানো হলে, administrative silence দ্বারা application প্রত্যাখ্যাত ধরা হয়। একটি অনুমোদিত visa তারপর notification-এর দুই মাসের মধ্যে সংগ্রহ করতে হয়, না হলে তা পরিত্যক্ত ধরা হয়। থাকার সময় ছয় মাসের বেশি হলে, student-কে Spain-এ প্রবেশের এক মাসের মধ্যে ব্যক্তিগতভাবে foreigner identity card (TIE)-এর আবেদন করতে হয়।',
      ),
    ],
    [ES_MIGRACIONES_ESTANCIA],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'A specific, officially tied figure: the Ministerio de Inclusión’s own page requires proof of sufficient means for the student’s own upkeep of 100% of the IPREM (Indicador Público de Renta de Efectos Múltiples, Spain’s official reference income index) per month, unless accommodation for the whole stay is already paid for and proven. For 2026, Spain’s official IPREM is EUR 600/month (EUR 7,200/year on a 12-payment basis, EUR 8,400/year on a 14-payment basis), per the figure Spanish consulates themselves publish — but the IPREM is reset annually by Spanish law, so this exact euro figure must be re-checked each academic year rather than assumed. For an accompanying family member, the same page requires 75% of the IPREM per month for the first family member and 50% for each additional one; amounts spent on the studies themselves are not counted towards this.',
        'একটি নির্দিষ্ট, officially যুক্ত সংখ্যা: Ministerio de Inclusión-এর নিজের page student-এর নিজের খরচের জন্য মাসে IPREM (Indicador Público de Renta de Efectos Múltiples, Spain-র official reference income index)-এর 100% প্রমাণ চায়, যদি না পুরো থাকার সময়ের জন্য আবাসন আগে থেকে পরিশোধিত আর প্রমাণিত থাকে। 2026 সালের জন্য, Spain-র official IPREM মাসে EUR 600 (12-payment ভিত্তিতে বছরে EUR 7,200, 14-payment ভিত্তিতে বছরে EUR 8,400), Spanish consulate-রা নিজেরাই প্রকাশ করা সংখ্যা অনুযায়ী — কিন্তু IPREM বছরে Spanish আইন দিয়ে পুনর্নির্ধারিত হয়, তাই এই সঠিক euro সংখ্যা ধরে নেওয়ার পরিবর্তে প্রতি academic year আবার চেক করা উচিত। একজন সঙ্গী পরিবারের সদস্যের জন্য, একই page মাসে প্রথম পরিবারের সদস্যের জন্য IPREM-এর 75% আর প্রতিটি অতিরিক্ত সদস্যের জন্য 50% চায়; পড়াশোনার নিজের খরচে ব্যয় করা টাকা এতে গণনা হয় না।',
      ),
    ],
    [ES_MIGRACIONES_ESTANCIA, ES_MIGRACIONES_IPREM],
    { allDegrees: true },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('Is health insurance compulsory?', 'Health insurance কি বাধ্যতামূলক?'),
    [
      b(
        'Yes. The Ministerio de Inclusión’s own page requires a health-insurance policy with an insurer authorised to operate in Spain, giving cover similar to that of Spain’s National Health System’s own common basic package of services, for the whole requested stay. This applies throughout the authorisation, including at any renewal/extension.',
        'হ্যাঁ। Ministerio de Inclusión-এর নিজের page অনুরোধ করা পুরো থাকার সময়ের জন্য Spain-এ কাজ করার অনুমোদিত একটি insurer-এর সাথে একটি health-insurance policy চায়, যা Spain-র National Health System-এর নিজের common basic package of services-এর মতো কভারেজ দেয়। এটা পুরো authorisation-এর সময়, সহ কোনো renewal/extension-এ প্রযোজ্য।',
      ),
    ],
    [ES_MIGRACIONES_ESTANCIA],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Spain, and how many hours?', 'Spain-এ পড়ার পাশাপাশি কাজ করা যায় কি, আর কত ঘণ্টা?'),
    [
      b(
        'Yes, and the rule is now significantly simpler than before Spain’s 2023 reform. The Ministerio de Inclusión’s own page (updated May 2025) states that the long-stay authorisation obtained for higher-education studies automatically authorises employed and self-employed work, with no additional procedure needed, as long as the activity is compatible with the studies. The activity must not exceed 30 hours a week (breaching this limit can end the stay authorisation), and work is geographically limited to one autonomous community, though neighbouring localities in an adjoining region are allowed. This is a clear liberalisation from the earlier, lower, separate-permit-based limit — always confirm the current figure directly on inclusion.gob.es before relying on an older secondary source.',
        'হ্যাঁ, আর নিয়ম এখন Spain-র 2023 reform-এর আগের তুলনায় যথেষ্ট সহজ। Ministerio de Inclusión-এর নিজের page (মে 2025-এ updated) বলে higher-education studies-এর জন্য পাওয়া long-stay authorisation স্বয়ংক্রিয়ভাবে employed আর self-employed কাজের অনুমোদন দেয়, কোনো অতিরিক্ত procedure লাগে না, যতক্ষণ activity পড়াশোনার সাথে compatible থাকে। Activity সপ্তাহে 30 ঘণ্টার বেশি হতে পারবে না (এই সীমা ভাঙলে stay authorisation শেষ হতে পারে), আর কাজ ভৌগোলিকভাবে একটি autonomous community-তে সীমিত, যদিও পাশের region-এ সীমান্তবর্তী এলাকায় কাজ করা যায়। এটা আগের, কম, আলাদা-permit-ভিত্তিক সীমা থেকে একটি স্পষ্ট liberalisation — পুরনো secondary source-এর উপর নির্ভর করার আগে সবসময় সরাসরি inclusion.gob.es-এ বর্তমান সংখ্যা নিশ্চিত করুন।',
      ),
    ],
    [ES_MIGRACIONES_EMPLEO],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Spain to look for work after graduating?', 'পড়া শেষে কাজ খোঁজার জন্য Spain-এ থাকা যায়?'),
    [
      b(
        'Yes. The Ministerio de Inclusión’s own page (Hoja 58) describes a residence authorisation to search for suitable employment or start a business ("autorización de residencia para búsqueda de empleo o para emprender proyecto empresarial"), under Ley 14/2013 (Spain’s entrepreneurs’ support law, the basis later strengthened by the Startups Law reforms). It is available to a holder of the study long-stay authorisation who has finished studies reaching at least Level 6 of the European Qualifications Framework (a university Bachelor’s degree, "grado"), for a maximum, non-extendable period of 24 months. The application window is the 60 days before the study authorisation expires, or the 90 days after it has expired. The Ministry’s own page states the decision period is 20 days, and silence within that period counts as approval (the opposite default from most other Spanish immigration procedures). Importantly, holding this job-seeking/business authorisation does NOT itself authorise working — once a job offer or business plan materialises, a separate work/residence authorisation (also described on the Ministry’s own Hoja 58 page) must be obtained.',
        'হ্যাঁ। Ministerio de Inclusión-এর নিজের page (Hoja 58) উপযুক্ত চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য একটি residence authorisation বর্ণনা করে ("autorización de residencia para búsqueda de empleo o para emprender proyecto empresarial"), Ley 14/2013 (Spain-র entrepreneurs’ support আইন, যার ভিত্তি পরে Startups Law reform দিয়ে আরো জোরদার হয়েছে) অনুযায়ী। এটা study long-stay authorisation-এর একজন হোল্ডার, যিনি European Qualifications Framework-এর অন্তত Level 6 (একটি university Bachelor\'s degree, "grado") পর্যন্ত পড়াশোনা শেষ করেছেন, তার জন্য সর্বোচ্চ, non-extendable 24 মাসের জন্য পাওয়া যায়। Application window হলো study authorisation শেষ হওয়ার আগের 60 দিন, বা শেষ হওয়ার পরের 90 দিন। Ministry-র নিজের page বলে সিদ্ধান্তের সময়কাল 20 দিন, আর সেই সময়ের মধ্যে silence approval হিসেবে গণনা হয় (অধিকাংশ অন্য Spanish immigration procedure-এর বিপরীত default)। গুরুত্বপূর্ণভাবে, এই job-seeking/business authorisation থাকা নিজেই কাজ করার অনুমোদন দেয় না — একটি চাকরির offer বা ব্যবসার plan বাস্তব হলে, একটি আলাদা work/residence authorisation (Ministry-র নিজের Hoja 58 page-এও বর্ণিত) নিতে হয়।',
      ),
    ],
    [ES_MIGRACIONES_MODIFICACIONES],
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'Not verified yet that Bangladesh is an eligible country for any AECID scholarship programme. AECID (Spain’s Agency for International Development Cooperation) runs an annual convocatoria of "Becas para ciudadanos de países de América Latina, África y Asia", bundling several named programmes (e.g. a Diplomatic School Master’s programme, an África-Med Máster programme). AECID’s own page names the convocatoria for these three continents broadly, but the individual programme call texts read for this guide name specific eligible countries, mostly in Africa and the Middle East for the África-Med programme — Bangladesh was not found named as an eligible country on the official pages read for this guide. No Bangladesh-specific, full-degree Spanish government scholarship was found on the official pages read, so this is stated plainly rather than guessed.',
        'AECID-র কোনো scholarship programme-এর জন্য Bangladesh একটি যোগ্য দেশ কিনা তা এখনো যাচাই হয়নি। AECID (Spain-র Agency for International Development Cooperation) প্রতি বছর "Becas para ciudadanos de países de América Latina, África y Asia"-র একটি convocatoria চালায়, যা কয়েকটি নামযুক্ত programme (যেমন একটি Diplomatic School Master\'s programme, একটি África-Med Máster programme) একসাথে করে। AECID-এর নিজের page এই তিন মহাদেশের জন্য convocatoria-র নাম বিস্তৃতভাবে দেয়, কিন্তু আলাদা programme call text, এই guide-এর জন্য পড়া, নির্দিষ্ট যোগ্য দেশের নাম দেয়, África-Med programme-এর জন্য বেশিরভাগ Africa আর Middle East-এ — এই guide-এর জন্য পড়া official page-এ Bangladesh একটি যোগ্য দেশ হিসেবে পাওয়া যায়নি। পড়া official page-এ কোনো Bangladesh-specific, full-degree Spanish government scholarship পাওয়া যায়নি, তাই এটা অনুমান না করে সরাসরি বলা হয়েছে।',
      ),
    ],
    [ES_AECID_BECAS_LATAM_AFRICA_ASIA],
    { status: 'not-verified', kind: 'guidance' },
  );

// ------------------------------------------------------------------ documents

const AUTHORITY = b('The Spanish diplomatic mission or consular office with jurisdiction over your place of residence (the Embassy of Spain in Dhaka, for Bangladesh).', 'আপনার বসবাসের স্থানের উপর jurisdiction থাকা Spanish diplomatic mission বা consular office (Bangladesh-এর জন্য, Dhaka-তে Spain-র Embassy)।');

export const ES_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Valid passport or travel document', 'Valid passport বা travel document'),
    why: b('The Ministerio de Inclusión’s own page requires a passport or travel document valid in Spain, with at least one year of validity remaining, among the documents for the long-stay study authorisation.', 'Ministerio de Inclusión-এর নিজের page long-stay study authorisation-এর জন্য প্রয়োজনীয় document-এর মধ্যে Spain-এ valid একটি passport বা travel document চায়, যার অন্তত এক বছরের validity বাকি আছে।'),
    who: AUTHORITY,
    when: b('From the application through your stay in Spain.', 'Application থেকে Spain-এ থাকার পুরো সময়।'),
    where: b('Submitted in person at the Spanish diplomatic mission or consular office before entry.', 'প্রবেশের আগে Spanish diplomatic mission বা consular office-এ ব্যক্তিগতভাবে জমা দিতে হয়।'),
    prepare: b('Keep it valid well beyond your intended stay.', 'প্রত্যাশিত থাকার সময়ের চেয়ে বেশ বেশি valid রাখুন।'),
    groups: ['general', 'visa'],
    sources: [ES_MIGRACIONES_ESTANCIA],
  },
  {
    id: 'admission',
    name: b('Proof of admission and paid enrolment/registration fees', 'ভর্তি আর পরিশোধিত enrolment/registration fee-র প্রমাণ'),
    why: b('The Ministerio de Inclusión’s own page requires documentation proving admission to a recognised higher-education institution for a full-time programme leading to a recognised qualification, and proof that enrolment/registration fees have been paid.', 'Ministerio de Inclusión-এর নিজের page একটি recognised higher-education institution-এ একটি full-time programme-এর জন্য ভর্তির documentation চায়, যা একটি recognised degree-এর দিকে নিয়ে যায়, আর enrolment/registration fee পরিশোধের প্রমাণ।'),
    who: b('The Spanish institution you applied to.', 'যে Spanish institution-এ আবেদন করছেন।'),
    when: b('After admission, before the visa application.', 'ভর্তির পর, visa application-এর আগে।'),
    where: b('Submitted with your application at the Spanish diplomatic mission or consular office.', 'Spanish diplomatic mission বা consular office-এ আপনার application-এর সঙ্গে জমা দিতে হয়।'),
    prepare: b('Each institution sets its own admission process and timeline, so confirm with your chosen institution how and when it issues this document.', 'প্রতিটি institution নিজস্ব ভর্তি process আর timeline ঠিক করে, তাই এই document কীভাবে আর কখন ইস্যু করে তা আপনার বাছা institution-এর সাথে নিশ্চিত করুন।'),
    groups: ['general', 'program', 'visa'],
    sources: [ES_MIGRACIONES_ESTANCIA],
  },
  {
    id: 'funds',
    name: b('Proof of sufficient financial means (100% of the IPREM/month)', 'যথেষ্ট আর্থিক সামর্থ্যের প্রমাণ (মাসে IPREM-এর 100%)'),
    why: b('The Ministerio de Inclusión’s own page requires documented proof of sufficient means — 100% of the IPREM per month for the student (EUR 600/month in 2026) — unless accommodation for the whole stay is already paid for.', 'Ministerio de Inclusión-এর নিজের page documented sufficient means-র প্রমাণ চায় — student-এর জন্য মাসে IPREM-এর 100% (2026 সালে মাসে EUR 600) — যদি না পুরো থাকার সময়ের জন্য আবাসন আগে থেকে পরিশোধিত থাকে।'),
    who: AUTHORITY,
    when: b('With the application, and again at any renewal.', 'Application-এর সঙ্গে, আর যেকোনো renewal-এর সময় আবার।'),
    where: b('Submitted at the Spanish diplomatic mission or consular office.', 'Spanish diplomatic mission বা consular office-এ জমা দিতে হয়।'),
    prepare: b('The IPREM is reset by Spanish law each year, so confirm the current figure before applying rather than relying on a previous year’s amount.', 'IPREM প্রতি বছর Spanish আইন দিয়ে পুনর্নির্ধারিত হয়, তাই আগের বছরের সংখ্যার উপর নির্ভর না করে আবেদনের আগে বর্তমান সংখ্যা নিশ্চিত করুন।'),
    groups: ['visa', 'bangladesh'],
    sources: [ES_MIGRACIONES_ESTANCIA, ES_MIGRACIONES_IPREM],
  },
  {
    id: 'insurance',
    name: b('Health insurance', 'Health insurance (স্বাস্থ্য বীমা)'),
    why: b('The Ministerio de Inclusión’s own page requires an insurance policy, from an insurer authorised to operate in Spain, giving cover similar to Spain’s National Health System’s own common basic package of services, for the whole stay.', 'Ministerio de Inclusión-এর নিজের page পুরো থাকার সময়ের জন্য Spain-এ কাজ করার অনুমোদিত একটি insurer-এর সাথে একটি insurance policy চায়, যা Spain-র National Health System-এর নিজের common basic package of services-এর মতো কভারেজ দেয়।'),
    who: b('An insurer authorised to operate in Spain.', 'Spain-এ কাজ করার অনুমোদিত একটি insurer।'),
    when: b('From the application through your stay.', 'Application থেকে আপনার থাকার পুরো সময়।'),
    where: b('Shown with the application; maintained throughout your stay.', 'Application-এর সঙ্গে দেখাতে হয়; থাকার পুরো সময় বজায় রাখতে হয়।'),
    prepare: b('Confirm the policy’s cover matches the Ministry’s own wording before buying it.', 'কেনার আগে নিশ্চিত করুন policy-র কভারেজ Ministry-র নিজের ভাষার সাথে মিলে।'),
    groups: ['visa', 'bangladesh', 'arrival'],
    sources: [ES_MIGRACIONES_ESTANCIA],
  },
  {
    id: 'criminal-record',
    name: b('Criminal record certificate (stays over six months)', 'Criminal record certificate (ছয় মাসের বেশি থাকার জন্য)'),
    why: b('The Ministerio de Inclusión’s own page requires a criminal record certificate, for stays over six months and applicants of criminal majority age, from the authorities of the country of origin or of any country of residence in the last five years, for offences recognised under Spanish law.', 'Ministerio de Inclusión-এর নিজের page ছয় মাসের বেশি থাকা আর criminal majority age-এর আবেদনকারীদের জন্য, origin দেশের বা গত পাঁচ বছরের বসবাসের যেকোনো দেশের authority থেকে, Spanish আইনে স্বীকৃত অপরাধের জন্য একটি criminal record certificate চায়।'),
    who: AUTHORITY,
    when: b('With the application, before travel.', 'Application-এর সঙ্গে, যাওয়ার আগে।'),
    where: b('Legalised/apostilled and, where needed, translated by a sworn translator, then submitted with the application.', 'Legalised/apostilled আর, প্রয়োজনে, একজন sworn translator দিয়ে translate করে, তারপর application-এর সঙ্গে জমা দিতে হয়।'),
    prepare: b('Legalisation and sworn translation of foreign documents can take time — start early.', 'বিদেশি document-এর legalisation আর sworn translation সময় নিতে পারে — আগে থেকে শুরু করুন।'),
    groups: ['visa', 'bangladesh'],
    sources: [ES_MIGRACIONES_ESTANCIA],
  },
  {
    id: 'medical-certificate',
    name: b('Medical certificate (not required when applying from inside Spain)', 'Medical certificate (Spain-র ভেতর থেকে আবেদনের সময় প্রয়োজন নেই)'),
    why: b('The Ministerio de Inclusión’s own page requires a medical certificate confirming the applicant does not have a disease with serious public-health implications under the 2005 International Health Regulations, for an application made from outside Spain.', 'Ministerio de Inclusión-এর নিজের page Spain-র বাইরে থেকে করা application-এর জন্য 2005 International Health Regulations-এর অধীনে গুরুতর public-health প্রভাব থাকা রোগ নেই তা নিশ্চিত করার একটি medical certificate চায়।'),
    who: AUTHORITY,
    when: b('With the application, before travel.', 'Application-এর সঙ্গে, যাওয়ার আগে।'),
    where: b('Submitted at the Spanish diplomatic mission or consular office.', 'Spanish diplomatic mission বা consular office-এ জমা দিতে হয়।'),
    prepare: b('Not required for an application made from inside Spain by someone already in a regular situation, per the same page.', 'একই page অনুযায়ী, Spain-র ভেতর থেকে, regular situation-এ থাকা কারো করা application-এর জন্য প্রয়োজন নেই।'),
    groups: ['visa'],
    sources: [ES_MIGRACIONES_ESTANCIA],
  },
];

// ------------------------------------------------------------------ costs (source's own currency, never converted)

const IPREM_FUNDS: GuideCost = { id: 'funds-amount', label: b('Minimum funds to show (100% of the IPREM, monthly)', 'দেখানোর ন্যূনতম টাকা (মাসে IPREM-এর 100%)'), value: b('100% of the IPREM per month, officially EUR 600/month for 2026 (EUR 7,200/year on 12 payments, EUR 8,400/year on 14 payments) — reset annually by Spanish law, so re-check the current year’s figure.', 'মাসে IPREM-এর 100%, 2026 সালের জন্য officially মাসে EUR 600 (12-payment-এ বছরে EUR 7,200, 14-payment-এ বছরে EUR 8,400) — Spanish আইন দিয়ে বছরে পুনর্নির্ধারিত হয়, তাই চলতি বছরের সংখ্যা আবার চেক করুন।'), amount: { value: 600, currency: 'EUR', period: 'one-time' }, source: ES_MIGRACIONES_IPREM };
const UNVERIFIED: GuideCost[] = [
  { id: 'public-tuition-range', label: b('Public-university tuition (varies by autonomous region and university)', 'Public-university tuition (autonomous region আর university অনুযায়ী আলাদা)'), value: b('Set per autonomous region, not nationally: UCM’s own page states Madrid’s regional government (Comunidad de Madrid) fixes academic fees annually, charged per registered ECTS credit, and that international students without permanent residence or from a country without an exchange agreement with Spain pay the "fourth registration" per-credit rate rather than the first-registration rate — but the exact current euro-per-credit figures were not independently read from the linked price table for this guide, so no single number is shown here as confirmed.', 'প্রতি autonomous region অনুযায়ী ঠিক হয়, জাতীয়ভাবে নয়: UCM-এর নিজের page বলে Madrid-র regional government (Comunidad de Madrid) প্রতি বছর academic fee ঠিক করে, প্রতি registered ECTS credit-এ চার্জ করা হয়, আর permanent residence না থাকা বা Spain-র সাথে exchange agreement না থাকা দেশের international student-রা প্রথম-registration rate-এর বদলে "fourth registration" per-credit rate দেন — কিন্তু এই guide-এর জন্য সংযুক্ত price table থেকে সঠিক চলতি euro-per-credit সংখ্যা স্বাধীনভাবে পড়া হয়নি, তাই এখানে একটি সংখ্যা নিশ্চিত হিসেবে দেখানো হয়নি।'), status: 'partly-verified', source: ES_UCM_FEES },
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
        [b('The examples below — IE University, the Universitat Autònoma de Barcelona, the Universidad Autónoma de Madrid, the Universitat de Barcelona and the Universidad Complutense de Madrid — are listed alphabetically by their English names, not ordered by quality. Public universities’ tuition is set by each autonomous region (Madrid’s Comunidad de Madrid, Catalonia’s Generalitat), not nationally, and IE University, a private institution, sets its own fees entirely separately. Each institution sets its own admission requirements, application windows and language requirements, so always check the exact programme on the institution’s own admissions page.', 'নিচের উদাহরণ — IE University, Universitat Autònoma de Barcelona, Universidad Autónoma de Madrid, Universitat de Barcelona, আর Universidad Complutense de Madrid — তাদের ইংরেজি নাম অনুযায়ী বর্ণানুক্রমে, মান অনুযায়ী নয়। Public university-র tuition প্রতিটি autonomous region (Madrid-র Comunidad de Madrid, Catalonia-র Generalitat) ঠিক করে, জাতীয়ভাবে নয়, আর IE University, একটি private institution, সম্পূর্ণ আলাদাভাবে নিজের fee ঠিক করে। প্রতিটি institution নিজস্ব ভর্তির শর্ত, application window, আর ভাষার শর্ত ঠিক করে, তাই সবসময় প্রতিষ্ঠানের নিজের admissions page-এ সঠিক programme দেখুন।')], [ES_UCM_FEES, ES_UAM_PRECIOS]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work'), insurance('insurance')] },
  { id: 'visa', title: b('Student visa and residence authorisation', 'Student visa আর residence authorisation'), items: [visaRequired('visa-required'), visaProcess('visa-process'), funds('funds')] },
];

// ------------------------------------------------------------------ Bachelor's (Grado)

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Admission requirements and deadlines set per university and autonomous region · work up to 30 hours/week, automatic, no extra permit · study authorisation process ≈ 1–2 months', 'ভর্তির শর্ত আর deadline প্রতি university আর autonomous region অনুযায়ী ঠিক · সপ্তাহে 30 ঘণ্টা পর্যন্ত কাজ, স্বয়ংক্রিয়, অতিরিক্ত permit লাগে না · study authorisation process ≈ 1–2 মাস'),
  intro: b(
    'Spanish universities admit Bachelor’s (Grado) applicants through each institution’s own application process, and public universities’ tuition is set by each autonomous region, not nationally — so the figure differs between, for example, Madrid and Catalonia. As a Bangladeshi applicant you also need Spain’s long-stay study authorisation, applied for in person at the Embassy of Spain in Dhaka at least two months before studies begin, with a decision due within one month (silence counts as refusal). Once admitted and authorised, you can work employed or self-employed automatically, without a separate permit, up to 30 hours a week, as long as it is compatible with your studies — a clear liberalisation from the pre-2023-reform rules. You must show proof of sufficient funds (100% of the IPREM per month, EUR 600/month in 2026) and valid health insurance.',
    'Spanish university-গুলো প্রতিটি institution-এর নিজস্ব application process-এর মাধ্যমে Bachelor\'s (Grado) আবেদনকারীদের ভর্তি করে, আর public university-র tuition প্রতিটি autonomous region ঠিক করে, জাতীয়ভাবে নয় — তাই এই সংখ্যা Madrid আর Catalonia-র মধ্যে আলাদা। Bangladeshi আবেদনকারী হিসেবে আপনার Spain-র long-stay study authorisation-ও লাগে, পড়াশোনা শুরুর অন্তত দুই মাস আগে Dhaka-তে Spain-র Embassy-এ ব্যক্তিগতভাবে আবেদন করতে হয়, এক মাসের মধ্যে সিদ্ধান্ত হওয়ার কথা (silence প্রত্যাখ্যান হিসেবে গণনা হয়)। ভর্তি আর authorised হলে, আপনি স্বয়ংক্রিয়ভাবে, কোনো আলাদা permit ছাড়াই, সপ্তাহে 30 ঘণ্টা পর্যন্ত employed বা self-employed কাজ করতে পারেন, যতক্ষণ আপনার পড়াশোনার সাথে compatible থাকে — 2023-পরবর্তী reform-এর আগের নিয়ম থেকে একটি স্পষ্ট liberalisation। আপনাকে যথেষ্ট funds-এর প্রমাণ (মাসে IPREM-এর 100%, 2026 সালে মাসে EUR 600) আর valid health insurance দেখাতে হয়।',
  ),
  costs: { official: [IPREM_FUNDS], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's (Grado) in Spain from Bangladesh?", "Bangladesh থেকে Spain-এ Bachelor's (Grado) পড়তে কী কী লাগে?"),
          [b('A secondary-school qualification that the institution recognises as giving access to Spanish university studies (each institution/the Spanish Ministry of Education assesses foreign qualifications for equivalence), proof of the Spanish or English proficiency the programme is taught in, an application through the institution’s own admissions process, and — since Bangladesh is not EU/EEA — Spain’s long-stay study authorisation applied for at the Embassy of Spain in Dhaka. IE University’s own entry-requirements page states that, as a general rule, "a student is required to meet the university entry requirements from their country of residence to be able to study officially in Spain", which each institution assesses case by case.', 'এমন একটি secondary-school যোগ্যতা যাকে institution Spanish university studies-এর access দেওয়ার মতো স্বীকৃতি দেয় (প্রতিটি institution/Spanish Ministry of Education বিদেশি যোগ্যতার সমতুল্যতা মূল্যায়ন করে), programme যে ভাষায় (Spanish বা English) পড়ানো হয় তার দক্ষতার প্রমাণ, institution-এর নিজস্ব admissions process-এর মাধ্যমে একটি application, আর — Bangladesh EU/EEA না হওয়ায় — Dhaka-তে Spain-র Embassy-এ আবেদন করা Spain-র long-stay study authorisation। IE University-র নিজের entry-requirements page বলে, একটি সাধারণ নিয়ম হিসেবে, "a student is required to meet the university entry requirements from their country of residence to be able to study officially in Spain", যা প্রতিটি institution case by case মূল্যায়ন করে।'), CHECK_UNI],
          [ES_MIGRACIONES_ESTANCIA],
          { status: 'partly-verified' },
        ),
        qa(
          'hsc',
          b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'),
          [b('Not verified yet as a single nationwide rule — Spanish institutions assess each foreign secondary-school qualification for equivalence to the Spanish Bachillerato/university-entrance requirement individually (IE University’s own page, for instance, lists specific requirements for the IB, A-Levels and other systems, but a dedicated, nationwide HSC-grade-conversion formula was not found on an official page read for this guide). Each applicant should check directly with their chosen institution and, where relevant, with Spain’s Ministry of Education credential-recognition process.', 'একক জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি — Spanish institution-গুলো প্রতিটি বিদেশি secondary-school যোগ্যতাকে Spanish Bachillerato/university-entrance শর্তের সমতুল্যতার জন্য আলাদাভাবে মূল্যায়ন করে (উদাহরণস্বরূপ, IE University-র নিজের page IB, A-Levels, আর অন্য system-এর জন্য নির্দিষ্ট শর্ত তালিকাভুক্ত করে, কিন্তু এই guide-এর জন্য পড়া official page-এ একটি নিবেদিত, জাতীয় HSC-grade-conversion formula পাওয়া যায়নি)। প্রতিটি আবেদনকারীর সরাসরি তার বাছা institution-এর সাথে, আর প্রযোজ্য ক্ষেত্রে, Spain-র Ministry of Education credential-recognition process-এর সাথে চেক করা উচিত।')],
          [ES_MIGRACIONES_ESTANCIA],
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
          [b('Deadlines are set per institution, not nationally. IE University’s own admissions page states its 2027-2028 Bachelor’s admissions process runs across several rounds (applying earlier gives more capacity and an earlier decision, useful for planning a visa); public universities such as UCM run their own admission calendars through their own international-admissions office. Each institution’s own admissions page should be checked directly for the exact window for your programme.', 'Deadline প্রতি institution অনুযায়ী ঠিক হয়, জাতীয়ভাবে নয়। IE University-র নিজের admissions page বলে তার 2027-2028 Bachelor\'s admissions process কয়েকটি round জুড়ে চলে (আগে আবেদন করলে বেশি capacity আর আগে সিদ্ধান্ত পাওয়া যায়, visa পরিকল্পনার জন্য যা কাজে লাগে); UCM-এর মতো public university তার নিজের international-admissions office-এর মাধ্যমে নিজস্ব admission calendar চালায়। আপনার programme-এর জন্য সঠিক window সরাসরি প্রতিটি institution-এর নিজের admissions page-এ চেক করা উচিত।')],
          [ES_UCM_FEES],
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
          b('How much English do you need for an English-taught Bachelor’s?', 'English-taught Bachelor\'s-এ কত English লাগে?'),
          [b('Not a single national minimum — set per institution and per programme, and most Bachelor’s programmes at Spanish public universities are taught in Spanish (or Catalan in Catalonia), not English. IE University, which teaches many programmes in English, states on its own admission-process page a minimum TOEFL of 100 (105 recommended), minimum IELTS of 7 (7.5 recommended), or a minimum Duolingo English Test score of 130 — but this is IE’s own requirement, not a nationwide figure, and other institutions set their own.', 'একক জাতীয় ন্যূনতম না — প্রতি institution আর প্রতি programme অনুযায়ী ঠিক হয়, আর Spanish public university-র অধিকাংশ Bachelor\'s programme Spanish-এ (বা Catalonia-তে Catalan-এ) পড়ানো হয়, English-এ না। IE University, যা অনেক programme English-এ পড়ায়, তার নিজের admission-process page-এ ন্যূনতম TOEFL 100 (105 সুপারিশ করা), ন্যূনতম IELTS 7 (7.5 সুপারিশ করা), বা ন্যূনতম Duolingo English Test স্কোর 130 বলে — কিন্তু এটা IE-র নিজের শর্ত, জাতীয় সংখ্যা না, আর অন্য institution নিজস্ব শর্ত ঠিক করে।')],
          [ES_IEU_ADMISSION_PROCESS],
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
          b("How much is a Bachelor's in Spain?", "Spain-এ Bachelor's-এ খরচ কত?"),
          [b('Set per autonomous region, not nationally, for public universities: UCM’s own page states tuition is charged per registered ECTS credit at a rate its regional government (Comunidad de Madrid) fixes each year, and that international students without permanent residence or from a country without an exchange agreement with Spain pay the higher "fourth registration" per-credit rate from their first year — this guide did not independently read the exact current euro-per-credit figures from UCM’s own linked price tables, so no single number is shown here as confirmed. Private institutions such as IE University set their own fees entirely separately and openly publish them: IE’s own page states its Bachelor in International Relations costs EUR 27,300 for the first year (reviewed annually), far above public-university levels.', 'Public university-র জন্য প্রতি autonomous region অনুযায়ী ঠিক হয়, জাতীয়ভাবে নয়: UCM-এর নিজের page বলে tuition প্রতি registered ECTS credit-এ চার্জ করা হয় একটি rate-এ যা তার regional government (Comunidad de Madrid) প্রতি বছর ঠিক করে, আর permanent residence না থাকা বা Spain-র সাথে exchange agreement না থাকা দেশের international student-রা প্রথম বছর থেকে উচ্চতর "fourth registration" per-credit rate দেন — এই guide UCM-এর নিজের সংযুক্ত price table থেকে সঠিক চলতি euro-per-credit সংখ্যা স্বাধীনভাবে পড়েনি, তাই এখানে একটি সংখ্যা নিশ্চিত হিসেবে দেখানো হয়নি। IE University-র মতো private institution সম্পূর্ণ আলাদাভাবে নিজের fee ঠিক করে আর প্রকাশ্যে প্রকাশ করে: IE-র নিজের page বলে তার Bachelor in International Relations প্রথম বছরে EUR 27,300 খরচ হয় (প্রতি বছর পুনর্বিবেচিত), public-university level-এর থেকে অনেক বেশি।'), CHECK_UNI],
          [ES_UCM_FEES],
          { status: 'partly-verified' },
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
  card: b('A relevant Bachelor’s needed · many Master’s programmes taught in English, more than Bachelor’s level · same long-stay study authorisation process as Bachelor’s', 'সম্পর্কিত Bachelor\'s লাগে · Bachelor\'s level-এর চেয়ে বেশি Master\'s programme ইংরেজিতে পড়ানো হয় · Bachelor\'s-এর মতোই একই long-stay study authorisation process'),
  intro: b(
    'Master’s admission in Spain follows the same institution-by-institution pattern as Bachelor’s: each university runs its own application process and fee scale. UAB’s own page, for example, states a EUR 30.21 application fee for its master’s degrees and an "equivalence study for foreign degrees to gain access to master from outside the European Union" step for non-EU applicants — a check most EU applicants skip. IE University’s own page shows its Master in International Relations costs EUR 34,500 (reviewed yearly), illustrating how far private-institution fees sit above public ones. As a Bangladeshi applicant you still need Spain’s long-stay study authorisation once admitted, applied for at the Embassy of Spain in Dhaka before travelling.',
    'Spain-এ Master\'s ভর্তি Bachelor\'s-এর মতোই একই institution-by-institution ধারা অনুসরণ করে: প্রতিটি university নিজস্ব application process আর fee scale চালায়। উদাহরণস্বরূপ, UAB-এর নিজের page তার master\'s degree-র জন্য EUR 30.21 application fee বলে আর non-EU আবেদনকারীদের জন্য একটি "equivalence study for foreign degrees to gain access to master from outside the European Union" পদক্ষেপ বলে — একটি চেক যা অধিকাংশ EU আবেদনকারী এড়িয়ে যান। IE University-র নিজের page তার Master in International Relations-এর খরচ EUR 34,500 (প্রতি বছর পুনর্বিবেচিত) দেখায়, যা দেখায় private-institution fee public university-র চেয়ে কতটা বেশি। Bangladeshi আবেদনকারী হিসেবে ভর্তি হলে আপনার এখনো Spain-র long-stay study authorisation লাগে, যাওয়ার আগে Dhaka-তে Spain-র Embassy-এ আবেদন করতে হয়।',
  ),
  costs: { official: [IPREM_FUNDS], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in Spain?", "Spain-এ Master's-এ কী লাগে?"),
          [b('A Bachelor’s degree (or equivalent) relevant to the Master’s programme, per each institution’s own admission page; for a degree earned outside the EU, UAB’s own page describes a separate "equivalence study for foreign degrees" step specifically for applicants from outside the European Union. English-taught programmes at institutions such as IE University ask for their own minimum English score (e.g. IELTS 7, TOEFL 100), while Spanish-taught programmes ask for Spanish proficiency instead.', 'প্রতিটি institution-এর নিজের admission page অনুযায়ী, Master\'s programme-এর সাথে সম্পর্কিত একটি Bachelor\'s degree (বা সমতুল্য); European Union-এর বাইরে পাওয়া একটি degree-র জন্য, UAB-এর নিজের page European Union-এর বাইরের আবেদনকারীদের জন্য বিশেষভাবে একটি আলাদা "equivalence study for foreign degrees" পদক্ষেপ বর্ণনা করে। IE University-র মতো institution-এ English-taught programme তাদের নিজস্ব ন্যূনতম English স্কোর চায় (যেমন IELTS 7, TOEFL 100), যখন Spanish-taught programme পরিবর্তে Spanish দক্ষতা চায়।')],
          [ES_UCM_FEES],
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
          [b('Deadlines and the application fee are set per institution. UAB’s own page states a EUR 30.21 application fee for its master’s degrees. Each institution’s own graduate-admissions office should be checked directly for the exact window and any programme-specific procedure for your intended Master’s.', 'Deadline আর application fee প্রতি institution অনুযায়ী ঠিক হয়। UAB-এর নিজের page তার master\'s degree-র জন্য EUR 30.21 application fee বলে। আপনার ইচ্ছিত Master\'s-এর জন্য সঠিক window আর কোনো programme-specific procedure সরাসরি প্রতিটি institution-এর নিজের graduate-admissions office-এ চেক করা উচিত।')],
          [ES_UAB_PRICES],
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
          b('How much IELTS do you need for a Master’s?', 'Master\'s-এ IELTS কত লাগে?'),
          [b('Not a single national minimum — institutions set their own. IE University’s own admission-process page states a minimum IELTS of 7 (7.5 recommended) or minimum TOEFL of 100 (105 recommended) for its English-taught programmes; other institutions and Spanish-taught programmes set their own, often Spanish-language, requirements instead. Always confirm your own programme directly.', 'একক জাতীয় ন্যূনতম না — institution-রা নিজস্ব শর্ত ঠিক করে। IE University-র নিজের admission-process page তার English-taught programme-এর জন্য ন্যূনতম IELTS 7 (7.5 সুপারিশ করা) বা ন্যূনতম TOEFL 100 (105 সুপারিশ করা) বলে; অন্য institution আর Spanish-taught programme পরিবর্তে নিজস্ব, প্রায়ই Spanish-ভাষার, শর্ত ঠিক করে। সবসময় সরাসরি আপনার নিজের programme নিশ্চিত করুন।')],
          [ES_IEU_ADMISSION_PROCESS],
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
          b("How much is a Master's in Spain?", "Spain-এ Master's-এ খরচ কত?"),
          [b('Like Bachelor’s level, public-university Master’s tuition is set per autonomous region and charged per ECTS credit, with international students without permanent residence or an exchange agreement paying a higher per-credit tier (the specific current euro figures were not independently confirmed for this guide from the universities’ own linked tables). Private institutions publish their own figures directly: IE University’s own page states its Master in International Relations costs EUR 34,500 (reviewed yearly, payable in up to five instalments) — a useful illustration of how far private-institution Master’s fees sit above public-university levels.', 'Bachelor\'s level-এর মতোই, public-university Master\'s tuition প্রতি autonomous region অনুযায়ী ঠিক হয় আর প্রতি ECTS credit-এ চার্জ করা হয়, permanent residence বা exchange agreement না থাকা international student-রা একটি উচ্চতর per-credit tier দেন (এই guide-এর জন্য university-গুলোর নিজের সংযুক্ত table থেকে সঠিক চলতি euro সংখ্যা স্বাধীনভাবে নিশ্চিত হয়নি)। Private institution সরাসরি নিজের সংখ্যা প্রকাশ করে: IE University-র নিজের page বলে তার Master in International Relations-এর খরচ EUR 34,500 (প্রতি বছর পুনর্বিবেচিত, পাঁচটি পর্যন্ত কিস্তিতে পরিশোধযোগ্য) — এটা private-institution Master\'s fee public-university level-এর চেয়ে কতটা বেশি তার একটি ভালো উদাহরণ।'), CHECK_UNI],
          [ES_UCM_FEES],
          { status: 'partly-verified' },
        ),
        scholarships('scholarships'),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ PhD (Doctorado)

const PHD: DegreeGuide = {
  level: 'phd',
  card: b('A relevant Master’s needed · no Spain-wide full-degree PhD scholarship for Bangladeshi students found on official pages · same long-stay study authorisation process as other degrees', 'সম্পর্কিত Master\'s লাগে · official page-এ Bangladeshi student-দের জন্য Spain-জুড়ে কোনো full-degree PhD scholarship পাওয়া যায়নি · অন্য degree-র মতোই একই long-stay study authorisation process'),
  intro: b(
    'A doctoral programme (Doctorado) at a Spanish university generally needs a relevant Master’s degree and acceptance by the specific doctoral school or supervisor, whose exact requirements (research proposal, interview, specific academic record) are set at university or faculty level rather than nationally, and were not itemized in detail on the official pages read for this guide. As with other degree levels, Bangladeshi applicants need Spain’s long-stay study authorisation once admitted, applied for at the Embassy of Spain in Dhaka before travelling, and can then work automatically up to 30 hours a week if compatible with their doctoral work.',
    'একটি Spanish university-তে doctoral programme (Doctorado)-এ সাধারণত একটি সম্পর্কিত Master\'s degree লাগে আর নির্দিষ্ট doctoral school বা supervisor দ্বারা গ্রহণ, যার সঠিক শর্ত (research proposal, interview, নির্দিষ্ট academic record) জাতীয়ভাবে না, university বা faculty level-এ ঠিক হয়, আর এই guide-এর জন্য পড়া official page-এ বিস্তারিতভাবে তালিকাভুক্ত হয়নি। অন্য degree level-এর মতোই, Bangladeshi আবেদনকারীদের ভর্তি হলে Spain-র long-stay study authorisation লাগে, যাওয়ার আগে Dhaka-তে Spain-র Embassy-এ আবেদন করতে হয়, আর তারপর doctoral কাজের সাথে compatible থাকলে স্বয়ংক্রিয়ভাবে সপ্তাহে 30 ঘণ্টা পর্যন্ত কাজ করতে পারেন।',
  ),
  costs: { official: [IPREM_FUNDS], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Spain?', 'Spain-এ কীভাবে PhD পাওয়া যায়?'),
          [
            b('Not verified yet as general national rules: apply directly to a doctoral school or supervisor at your chosen Spanish university, with a relevant Master’s degree — exact admission requirements (research proposal, interview, minimum grades) are set at university or faculty level, not nationally, and were not itemized in detail on the official pages read for this guide. The Ministerio de Inclusión’s own student-authorisation rules (long-stay authorisation, 30-hour automatic work rule, the 24-month post-study job-seeking authorisation) apply the same way to PhD students as to Bachelor’s and Master’s students, since they turn on the type of residence authorisation held, not the degree level.', 'সাধারণ জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: আপনার বাছা Spanish university-তে একটি সম্পর্কিত Master\'s degree নিয়ে সরাসরি একটি doctoral school বা supervisor-কে আবেদন করুন — সঠিক ভর্তির শর্ত (research proposal, interview, ন্যূনতম grade) জাতীয়ভাবে না, university বা faculty level-এ ঠিক হয়, আর এই guide-এর জন্য পড়া official page-এ বিস্তারিতভাবে তালিকাভুক্ত হয়নি। Ministerio de Inclusión-এর নিজের student-authorisation নিয়ম (long-stay authorisation, 30-ঘণ্টার স্বয়ংক্রিয় কাজের নিয়ম, 24-মাসের post-study job-seeking authorisation) PhD student-দের জন্যও Bachelor\'s আর Master\'s student-দের মতোই একইভাবে প্রযোজ্য, কারণ এটা residence authorisation-এর ধরনের উপর নির্ভর করে, degree level-এর উপর না।'),
            CHECK_UNI,
          ],
          [ES_MIGRACIONES_ESTANCIA],
          { status: 'not-verified' },
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
          [ES_MIGRACIONES_ESTANCIA],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ the country

export const ES_GUIDE: CountryGuide = {
  code: 'ES',
  checkedAt: ES_READ,
  sourcesPerSection: true,
  intro: b(
    'Spain is an EU/EEA and full Schengen member — but Bangladesh is not, so a Bangladeshi applicant is a "third-country national" under Spanish law and needs Spain’s own long-stay study authorisation ("autorización de estancia de larga duración por estudios"), applied for in person at the Embassy of Spain in Dhaka at least two months before studies begin. The consulate must decide within one month (silence counts as refusal); an approved visa must be collected within two months. You need proof of sufficient funds — 100% of the IPREM per month (EUR 600/month in 2026, reset annually by Spanish law) — and health insurance equivalent to Spain’s National Health System’s own basic cover. Once holding the study authorisation, you are automatically authorised to work employed or self-employed, with no separate work permit needed, up to 30 hours a week (geographically limited to one autonomous community), as long as the work is compatible with your studies — a major liberalisation under the post-2023 "Ley de Startups" reforms and the new Reglamento de Extranjería (Real Decreto 1155/2024). After finishing at least a Bachelor’s-level ("grado") qualification, graduates can apply for a 24-month, non-extendable authorisation to search for a suitable job or start a business (though that authorisation does not itself permit working — a separate work authorisation is needed once a job or business materialises). Tuition at public universities is set per autonomous region, not nationally, and charged per ECTS credit, with international students without permanent residence or an exchange agreement with Spain paying a higher per-credit tier; private institutions such as IE University set and publish their own, much higher, fees. AECID (Spain’s cooperation agency) runs an annual scholarship convocatoria for citizens of Latin America, Africa and Asia, but the individual programme calls read for this guide name specific eligible countries, mostly in Africa and the Middle East, and Bangladesh was not found named among them — so no Bangladesh-specific, full-degree Spanish government scholarship is claimed here. This guide is built from the Ministerio de Inclusión, Seguridad Social y Migraciones (inclusion.gob.es), the Ministerio de Asuntos Exteriores (exteriores.gob.es, including the Embassy of Spain in Dhaka), AECID (aecid.es) and university pages.',
    'Spain EU/EEA আর একটি পূর্ণ Schengen সদস্য — কিন্তু Bangladesh না, তাই একজন Bangladeshi আবেদনকারী Spanish আইনের অধীনে একজন "third-country national", আর তার Spain-র নিজের long-stay study authorisation ("autorización de estancia de larga duración por estudios") লাগে, পড়াশোনা শুরুর অন্তত দুই মাস আগে Dhaka-তে Spain-র Embassy-এ ব্যক্তিগতভাবে আবেদন করতে হয়। Consulate-কে এক মাসের মধ্যে সিদ্ধান্ত নিতে হয় (silence প্রত্যাখ্যান হিসেবে গণনা হয়); একটি অনুমোদিত visa দুই মাসের মধ্যে সংগ্রহ করতে হয়। আপনার যথেষ্ট funds-এর প্রমাণ লাগে — মাসে IPREM-এর 100% (2026 সালে মাসে EUR 600, Spanish আইন দিয়ে বছরে পুনর্নির্ধারিত) — আর Spain-র National Health System-এর নিজের basic cover-এর সমতুল্য health insurance। Study authorisation থাকলে, আপনি স্বয়ংক্রিয়ভাবে employed বা self-employed কাজ করার অনুমোদিত, কোনো আলাদা work permit লাগে না, সপ্তাহে 30 ঘণ্টা পর্যন্ত (ভৌগোলিকভাবে একটি autonomous community-তে সীমিত), যতক্ষণ কাজ আপনার পড়াশোনার সাথে compatible থাকে — 2023-পরবর্তী "Ley de Startups" reform আর নতুন Reglamento de Extranjería (Real Decreto 1155/2024)-এর অধীনে একটি বড় liberalisation। অন্তত একটি Bachelor\'s-level ("grado") যোগ্যতা শেষ করার পর, গ্র্যাজুয়েটরা উপযুক্ত চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য 24-মাসের, non-extendable একটি authorisation-এর আবেদন করতে পারেন (যদিও সেই authorisation নিজেই কাজ করার অনুমতি দেয় না — চাকরি বা ব্যবসা বাস্তব হলে একটি আলাদা work authorisation লাগে)। Public university-তে tuition প্রতি autonomous region অনুযায়ী ঠিক হয়, জাতীয়ভাবে নয়, আর প্রতি ECTS credit-এ চার্জ করা হয়, permanent residence বা Spain-র সাথে exchange agreement না থাকা international student-রা একটি উচ্চতর per-credit tier দেন; IE University-র মতো private institution সম্পূর্ণ আলাদাভাবে নিজের, অনেক বেশি, fee ঠিক করে আর প্রকাশ করে। AECID (Spain-র cooperation agency) América Latina, Africa, আর Asia-র নাগরিকদের জন্য প্রতি বছর একটি scholarship convocatoria চালায়, কিন্তু এই guide-এর জন্য পড়া আলাদা programme call নির্দিষ্ট যোগ্য দেশের নাম দেয়, বেশিরভাগ Africa আর Middle East-এ, আর তাদের মধ্যে Bangladesh পাওয়া যায়নি — তাই এখানে কোনো Bangladesh-specific, full-degree Spanish government scholarship দাবি করা হয়নি। এই guide Ministerio de Inclusión, Seguridad Social y Migraciones (inclusion.gob.es), Ministerio de Asuntos Exteriores (exteriores.gob.es, সহ Dhaka-তে Spain-র Embassy), AECID (aecid.es), আর university page থেকে তৈরি।',
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [ES_MIGRACIONES_ESTANCIA, ES_MIGRACIONES_EMPLEO, ES_MIGRACIONES_MODIFICACIONES],
      {
        kind: 'guidance',
        list: [
          b('Assuming Spain’s EU/Schengen membership means a simplified visa process for Bangladeshi applicants — Bangladesh is not EU/EEA, so a Bangladeshi applicant is a third-country national and needs the full Spanish long-stay study authorisation process.', 'ধরে নেওয়া যে Spain-র EU/Schengen সদস্যতা Bangladeshi আবেদনকারীদের জন্য একটি সরলীকৃত visa process মানে — Bangladesh EU/EEA না, তাই একজন Bangladeshi আবেদনকারী একজন third-country national আর পূর্ণ Spanish long-stay study authorisation process লাগে।'),
          b('Relying on a pre-2023 work-rights figure — Spain’s 2023 "Ley de Startups" reforms and Real Decreto 1155/2024 liberalised work access to an automatic authorisation up to 30 hours/week with no separate permit; always confirm the current rule directly on inclusion.gob.es rather than an older secondary summary.', 'একটি 2023-এর আগের work-rights সংখ্যার উপর নির্ভর করা — Spain-র 2023 "Ley de Startups" reform আর Real Decreto 1155/2024 কাজের access-কে সপ্তাহে 30 ঘণ্টা পর্যন্ত একটি স্বয়ংক্রিয় authorisation-এ liberalise করেছে, কোনো আলাদা permit ছাড়াই; সবসময় সরাসরি inclusion.gob.es-এ বর্তমান নিয়ম নিশ্চিত করুন, কোনো পুরনো secondary summary না।'),
          b('Assuming the post-study job-seeking authorisation itself lets you work — it does not; a separate work/residence authorisation must be obtained once a job offer or business plan materialises.', 'ধরে নেওয়া যে post-study job-seeking authorisation নিজেই কাজ করার সুযোগ দেয় — দেয় না; চাকরির offer বা ব্যবসার plan বাস্তব হলে একটি আলাদা work/residence authorisation নিতে হয়।'),
          b('Assuming AECID’s broad "Latin America, Africa and Asia" scholarship convocatoria automatically covers Bangladesh — the individual programme calls read for this guide name specific eligible countries, mostly in Africa and the Middle East, and Bangladesh was not found named among them.', 'ধরে নেওয়া যে AECID-এর বিস্তৃত "Latin America, Africa and Asia" scholarship convocatoria স্বয়ংক্রিয়ভাবে Bangladesh কভার করে — এই guide-এর জন্য পড়া আলাদা programme call নির্দিষ্ট যোগ্য দেশের নাম দেয়, বেশিরভাগ Africa আর Middle East-এ, আর তাদের মধ্যে Bangladesh পাওয়া যায়নি।'),
          b('Assuming public-university tuition is the same nationwide — it is set per autonomous region (Madrid, Catalonia, etc.), and private institutions such as IE University sit far above public-university levels.', 'ধরে নেওয়া যে public-university tuition দেশজুড়ে একই — এটা প্রতি autonomous region (Madrid, Catalonia, ইত্যাদি) ঠিক হয়, আর IE University-র মতো private institution public-university level-এর চেয়ে অনেক বেশি।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in Spain from Bangladesh?", "Bangladesh থেকে Spain-এ Bachelor's পড়তে কী কী লাগে?"), [b('A secondary-school qualification recognised as giving access to Spanish university studies, Spanish or English proficiency as the programme requires, an application through the institution’s own process, and — since Bangladesh is not EU/EEA — Spain’s long-stay study authorisation applied for at the Embassy of Spain in Dhaka.', 'Spanish university studies-এর access দেওয়ার মতো স্বীকৃত একটি secondary-school যোগ্যতা, programme যতটা চায় তত Spanish বা English দক্ষতা, institution-এর নিজস্ব process-এর মাধ্যমে একটি application, আর — Bangladesh EU/EEA না হওয়ায় — Dhaka-তে Spain-র Embassy-এ আবেদন করা Spain-র long-stay study authorisation।')], [ES_MIGRACIONES_ESTANCIA], { status: 'partly-verified' }),
    qa('hsc', b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'), [b('Not verified yet as a single rule — your certificate must be individually assessed for equivalence by your chosen institution/Spain’s Ministry of Education. A dedicated nationwide HSC-grade-conversion rule was not found on an official page for this guide.', 'একক নিয়ম হিসেবে এখনো যাচাই হয়নি — আপনার সনদ আপনার বাছা institution/Spain-র Ministry of Education দ্বারা আলাদাভাবে সমতুল্যতার জন্য মূল্যায়ন করতে হয়। এই guide-এর জন্য একটি নির্দিষ্ট জাতীয় HSC-grade-conversion নিয়ম কোনো official page-এ পাওয়া যায়নি।')], [ES_MIGRACIONES_ESTANCIA], { status: 'not-verified' }),
    qa('cost', b('How much does it cost to study in Spain?', 'Spain-এ পড়াশোনার খরচ কত?'), [b('Public-university tuition is set per autonomous region and charged per ECTS credit (not one national figure); private institutions such as IE University publish their own, much higher, fees (e.g. EUR 27,300 for its Bachelor in International Relations). You also need proof of funds (100% of the IPREM, EUR 600/month in 2026).', 'Public-university tuition প্রতি autonomous region অনুযায়ী ঠিক হয় আর প্রতি ECTS credit-এ চার্জ করা হয় (একটি জাতীয় সংখ্যা না); IE University-র মতো private institution নিজের, অনেক বেশি, fee প্রকাশ করে (যেমন তার Bachelor in International Relations-এর জন্য EUR 27,300)। আপনার funds-এর প্রমাণও লাগে (মাসে IPREM-এর 100%, 2026 সালে মাসে EUR 600)।')], [ES_UCM_FEES, ES_MIGRACIONES_IPREM], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for Spain?', 'Spain-এ IELTS কত লাগে?'), [b('Not a single national minimum; most Bachelor’s programmes are taught in Spanish, while IE University’s own English-taught programmes ask for a minimum IELTS of 7 (7.5 recommended) — always check your own institution and programme.', 'একক জাতীয় ন্যূনতম না; অধিকাংশ Bachelor\'s programme Spanish-এ পড়ানো হয়, যখন IE University-র নিজের English-taught programme ন্যূনতম IELTS 7 (7.5 সুপারিশ করা) চায় — সবসময় আপনার নিজের institution আর programme দেখুন।')], [ES_IEU_ADMISSION_PROCESS], { status: 'partly-verified' }),
    qa('visa', b('What do you need for the student visa and residence authorisation?', 'Student visa আর residence authorisation-এর জন্য কী কী লাগে?'), [b('A long-stay study authorisation application submitted in person at the Embassy of Spain in Dhaka, with a passport, proof of admission, proof of sufficient funds, health insurance and (for stays over six months) a criminal-record certificate — the Ministry’s own page says the decision is due within one month (silence counts as refusal).', 'Dhaka-তে Spain-র Embassy-এ ব্যক্তিগতভাবে জমা দেওয়া একটি long-stay study authorisation application, একটি passport, ভর্তির প্রমাণ, যথেষ্ট funds-এর প্রমাণ, health insurance, আর (ছয় মাসের বেশি থাকার জন্য) একটি criminal-record certificate সহ — Ministry-র নিজের page বলে সিদ্ধান্ত এক মাসের মধ্যে হওয়ার কথা (silence প্রত্যাখ্যান হিসেবে গণনা হয়)।')], [ES_MIGRACIONES_ESTANCIA]),
    qa('work', b('Can you work while studying in Spain?', 'Spain-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b('Yes, automatically and without a separate work permit, up to 30 hours a week, as long as it is compatible with your studies — a post-2023-reform rule, per the Ministerio de Inclusión’s own page.', 'হ্যাঁ, স্বয়ংক্রিয়ভাবে আর কোনো আলাদা work permit ছাড়া, সপ্তাহে 30 ঘণ্টা পর্যন্ত, যতক্ষণ আপনার পড়াশোনার সাথে compatible থাকে — একটি 2023-পরবর্তী reform নিয়ম, Ministerio de Inclusión-এর নিজের page অনুযায়ী।')], [ES_MIGRACIONES_EMPLEO]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('Not verified yet that Bangladesh is eligible for any AECID scholarship programme. No Bangladesh-specific, full-degree Spanish government scholarship was found — AECID’s broad "Latin America, Africa and Asia" convocatoria exists, but the specific programmes read for this guide name eligible countries mostly in Africa and the Middle East, and Bangladesh was not found among them.', 'AECID-র কোনো scholarship programme-এর জন্য Bangladesh যোগ্য কিনা তা এখনো যাচাই হয়নি। কোনো Bangladesh-specific, full-degree Spanish government scholarship পাওয়া যায়নি — AECID-এর বিস্তৃত "Latin America, Africa and Asia" convocatoria আছে, কিন্তু এই guide-এর জন্য পড়া নির্দিষ্ট programme বেশিরভাগ Africa আর Middle East-এর যোগ্য দেশের নাম দেয়, আর তাদের মধ্যে Bangladesh পাওয়া যায়নি।')], [ES_AECID_BECAS_LATAM_AFRICA_ASIA], { status: 'not-verified' }),
    qa('after', b('Can you stay in Spain after graduating?', 'পড়া শেষে Spain-এ থাকা যায়?'), [b('Yes, graduates with at least a Bachelor’s-level qualification can apply for a 24-month, non-extendable authorisation to search for a suitable job or start a business — though that authorisation does not itself permit working; a separate work authorisation is needed once a job or business materialises.', 'হ্যাঁ, অন্তত Bachelor\'s-level যোগ্যতা থাকা গ্র্যাজুয়েটরা উপযুক্ত চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য 24-মাসের, non-extendable একটি authorisation-এর আবেদন করতে পারেন — যদিও সেই authorisation নিজেই কাজ করার অনুমতি দেয় না; চাকরি বা ব্যবসা বাস্তব হলে একটি আলাদা work authorisation লাগে।')], [ES_MIGRACIONES_MODIFICACIONES]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('100% of the IPREM per month for the student — EUR 600/month in 2026 (EUR 7,200/year on 12 payments) — reset annually by Spanish law, so re-check the current figure before applying.', 'Student-এর জন্য মাসে IPREM-এর 100% — 2026 সালে মাসে EUR 600 (12-payment-এ বছরে EUR 7,200) — Spanish আইন দিয়ে বছরে পুনর্নির্ধারিত হয়, তাই আবেদনের আগে চলতি সংখ্যা আবার চেক করুন।')], [ES_MIGRACIONES_ESTANCIA, ES_MIGRACIONES_IPREM]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Passport, proof of admission and paid fees, proof of sufficient funds, health insurance, and (for stays over six months) a criminal-record certificate; a medical certificate is also required when applying from outside Spain.', 'Passport, ভর্তি আর পরিশোধিত fee-র প্রমাণ, যথেষ্ট funds-এর প্রমাণ, health insurance, আর (ছয় মাসের বেশি থাকার জন্য) একটি criminal-record certificate; Spain-র বাইরে থেকে আবেদনের সময় একটি medical certificate-ও লাগে।')], [ES_MIGRACIONES_ESTANCIA]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b('A relevant Bachelor’s degree; for a degree earned outside the EU, some institutions (e.g. UAB) run a separate equivalence-study step for non-EU applicants. English-taught programmes set their own English-score minimums.', 'একটি সম্পর্কিত Bachelor\'s degree; European Union-এর বাইরে পাওয়া একটি degree-র জন্য, কিছু institution (যেমন UAB) non-EU আবেদনকারীদের জন্য একটি আলাদা equivalence-study পদক্ষেপ চালায়। English-taught programme নিজস্ব English-স্কোর ন্যূনতম ঠিক করে।')], [ES_UCM_FEES]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Not verified yet as general national rules: usually a relevant Master’s degree and acceptance by a doctoral school or supervisor, whose exact requirements are set at university level, not nationally, and were not itemized in detail on the pages read for this guide.', 'সাধারণ জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: সাধারণত একটি সম্পর্কিত Master\'s degree আর একটি doctoral school বা supervisor দ্বারা গ্রহণ, যার সঠিক শর্ত জাতীয়ভাবে না, university level-এ ঠিক হয়, আর এই guide-এর জন্য পড়া page-এ বিস্তারিতভাবে তালিকাভুক্ত হয়নি।')], [ES_MIGRACIONES_ESTANCIA], { status: 'not-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — IE University, the Universitat Autònoma de Barcelona, the Universidad Autónoma de Madrid, the Universitat de Barcelona and the Universidad Complutense de Madrid — are listed alphabetically by English name, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — IE University, Universitat Autònoma de Barcelona, Universidad Autónoma de Madrid, Universitat de Barcelona, আর Universidad Complutense de Madrid — তাদের ইংরেজি নাম অনুযায়ী বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [ES_UCM_FEES]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: Spain has an Embassy in Dhaka that handles consular affairs, including student visas, so Bangladeshi applicants do not need to apply through a third country. No AECID programme read for this guide names Bangladesh as an eligible country, no official page gives a Bangladeshi-HSC-specific grade-conversion formula, and no Bangladesh-specific minimum-funds figure exists beyond the general IPREM-linked rule — these are stated plainly as not verified, rather than guessed.', 'Bangladesh-এর জন্য যাচাই করা: Spain-র Dhaka-তে একটি Embassy আছে যা consular affairs, সহ student visa, পরিচালনা করে, তাই Bangladeshi আবেদনকারীদের একটি তৃতীয় দেশের মাধ্যমে আবেদন করতে হয় না। এই guide-এর জন্য পড়া কোনো AECID programme Bangladesh-কে একটি যোগ্য দেশ হিসেবে নাম দেয় না, কোনো official page একটি Bangladeshi-HSC-specific grade-conversion formula দেয় না, আর সাধারণ IPREM-যুক্ত নিয়মের বাইরে কোনো Bangladesh-specific ন্যূনতম-funds সংখ্যা নেই — এগুলো অনুমান না করে সরাসরি যাচাই হয়নি বলে বলা হয়েছে।'),
    ], [ES_EMBAJADA_DHAKA, ES_AECID_BECAS_LATAM_AFRICA_ASIA], { status: 'partly-verified' }),
  ],
  life: [
    qa('arrival', b('What happens when you arrive?', 'পৌঁছানোর পর কী হয়?'), [b('If your stay is longer than six months, you must personally apply for the foreigner identity card (TIE) within one month of entering Spain, at the police station (Comisaría de Policía) with jurisdiction over your place of residence, per the Ministerio de Inclusión’s own page. Keep your health insurance active and, when your authorisation runs for more than a year, submit proof of continuing enrolment each year to keep it valid.', 'আপনার থাকার সময় ছয় মাসের বেশি হলে, Ministerio de Inclusión-এর নিজের page অনুযায়ী, Spain-এ প্রবেশের এক মাসের মধ্যে, আপনার বসবাসের স্থানের উপর jurisdiction থাকা police station (Comisaría de Policía)-এ ব্যক্তিগতভাবে foreigner identity card (TIE)-এর আবেদন করতে হয়। আপনার health insurance সক্রিয় রাখুন আর, আপনার authorisation এক বছরের বেশি হলে, এটা valid রাখার জন্য প্রতি বছর continuing enrolment-এর প্রমাণ জমা দিন।')], [ES_MIGRACIONES_ESTANCIA]),
  ],
  documents: ES_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 600, max: 600, unit: 'EUR/month (100% of the IPREM for 2026, reset annually)', text: b('EUR 600/month in 2026 (100% of the IPREM, reset annually by Spanish law).', '2026 সালে মাসে EUR 600 (IPREM-এর 100%, Spanish আইন দিয়ে বছরে পুনর্নির্ধারিত)।') }, source: ES_MIGRACIONES_IPREM },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { min: 30, max: 30, unit: 'hours/week (automatic authorisation, no separate work permit)', text: b('Up to 30 hours a week, automatically authorised with no separate work permit, if compatible with studies.', 'সপ্তাহে 30 ঘণ্টা পর্যন্ত, কোনো আলাদা work permit ছাড়া স্বয়ংক্রিয়ভাবে অনুমোদিত, পড়াশোনার সাথে compatible হলে।') }, source: ES_MIGRACIONES_EMPLEO },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { min: 24, max: 24, unit: 'months (non-extendable job-seeking/business authorisation, does not itself permit work)', text: b('24 months, non-extendable, to seek a job or start a business matching your studies (the authorisation itself does not permit working).', '24 মাস, non-extendable, আপনার পড়াশোনার সাথে মেলে এমন একটি চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য (authorisation নিজেই কাজ করার অনুমতি দেয় না)।') }, source: ES_MIGRACIONES_MODIFICACIONES },
    { id: 'public-tuition', kind: 'guidance', status: 'not-verified', source: ES_UCM_FEES },
  ],
};

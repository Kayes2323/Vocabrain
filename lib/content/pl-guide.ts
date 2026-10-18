import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  PL_AGH_FEES,
  PL_AMU_TUITION,
  PL_MFA_ARMENIA_FUNDS,
  PL_MFA_INDIA_D_VISA,
  PL_MFA_USA_D_VISA,
  PL_MOS_STUDY_PERMIT,
  PL_MOS_WORK_WITHOUT_PERMIT,
  PL_NAWA_BANACH,
  PL_READ,
  PL_STUDY_GOV_BANACH,
  PL_STUDY_GOV_VISA,
  PL_UDSC_GRADUATE_PERMIT,
  PL_UDSC_WORK_STUDENT,
  PL_UJ_FEES,
  PL_UW_FEES_2026,
  PL_WUT_BSC_OFFER,
  PL_WUT_ENGLISH,
} from './pl-sources';

/**
 * Poland reading guide, researched on its own from Poland's own official
 * sources (the Office for Foreigners / Urząd do Spraw Cudzoziemców (UDSC),
 * gov.pl/web/udsc-en, Poland's national residence-permit authority; the
 * Moduł Obsługi Spraw (MOS, mos.cudzoziemcy.gov.pl), the UDSC/Ministry of
 * Interior and Administration's own casework portal; the Embassy of the
 * Republic of Poland in New Delhi, gov.pl/web/india, Poland's own mission of
 * record for Bangladeshi visa applicants, since Bangladesh has no Polish
 * embassy; NAWA, the Polish National Agency for Academic Exchange,
 * nawa.gov.pl; the official study.gov.pl "Study in Poland" portal; and
 * university pages). Nothing is taken from another country's guide. Poland
 * IS an EU/Schengen country (unlike Malaysia, built earlier this session),
 * so Bangladeshi applicants need a Schengen "D"-type national visa, not a
 * Schengen-wide "C"-type one, and the post-arrival Voivodeship-Office
 * temporary-residence-permit step is read fresh from Poland's own UDSC
 * pages, structurally different from the EMGS→Immigration two-body system
 * built for Malaysia or the single-office systems built for the other
 * EU guides earlier this session. Amounts stay in Polish złoty (PLN) or
 * euro (EUR), the source's own currency, and are never converted. It
 * covers Bachelor's, Master's and PhD study for Bangladeshi students, who
 * need a national ("D"-type) visa.
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
  'AGH University of Krakow, Adam Mickiewicz University (Poznań), Jagiellonian University, the University of Warsaw and Warsaw University of Technology are not identical: each sets its own tuition fee per programme (in the Rector’s own ordinance), its own admission requirements, application windows and English-score rules. Always check the exact programme on the institution’s own admissions page.',
  'AGH University of Krakow, Adam Mickiewicz University (Poznań), Jagiellonian University, University of Warsaw, আর Warsaw University of Technology একরকম না: প্রতিটি নিজস্ব Rector-এর ordinance-এ প্রতি programme-এর tuition fee, নিজস্ব ভর্তির শর্ত, application window, আর English-score নিয়ম ঠিক করে। সবসময় প্রতিষ্ঠানের নিজের admissions page-এ সঠিক programme দেখে নিন।',
);

const EU_NOTE = b(
  'Poland is an EU/Schengen member. A Bangladeshi applicant first applies for a long-term national ("D"-type) visa at the Embassy of the Republic of Poland in New Delhi (the mission of record for Bangladesh, since Poland has no embassy in Dhaka), then, after arriving in Poland, applies for a temporary residence permit at the local Voivodeship (Provincial) Office before the visa expires.',
  'Poland EU/Schengen সদস্য। একজন Bangladeshi আবেদনকারী প্রথমে Embassy of the Republic of Poland in New Delhi-তে (Bangladesh-এর জন্য mission of record, কারণ Poland-এর Dhaka-তে কোনো embassy নেই) একটি দীর্ঘমেয়াদী national ("D"-type) visa-র জন্য আবেদন করেন, তারপর Poland-এ পৌঁছানোর পর, visa-র মেয়াদ শেষ হওয়ার আগে স্থানীয় Voivodeship (Provincial) Office-এ একটি temporary residence permit-এর জন্য আবেদন করেন।',
);

// ------------------------------------------------------------------ shared answers

const visaRequired = (id: string) =>
  qa(
    id,
    b('Does a Bangladeshi student need a visa to study in Poland?', 'Bangladesh-এর student-দের Poland-এ পড়তে visa লাগে কি?'),
    [
      b(
        'Yes. As a non-EU national, you need a long-term national ("D"-type) visa, issued for up to one year and also allowing travel elsewhere in the Schengen area for up to 90 days in any 180-day period, per the official study.gov.pl "Study in Poland" portal. The Embassy of the Republic of Poland in New Delhi accepts visa applications from citizens or residents of Bangladesh (along with Afghanistan, Bhutan, the Maldives, Nepal, Sri Lanka and several Indian states), per the Embassy’s own page; study-category applications are registered through Poland’s own e-Konsulat system, with an additional VFS Global application form, and submitted in person at a Visa Application Centre.',
        'হ্যাঁ। একজন non-EU নাগরিক হিসেবে, আপনার একটি দীর্ঘমেয়াদী national ("D"-type) visa লাগে, যা একবারে এক বছর পর্যন্ত ইস্যু হয় আর Schengen area-র অন্য জায়গায় যেকোনো 180-দিনের মধ্যে 90 দিন পর্যন্ত ভ্রমণের অনুমতিও দেয়, official study.gov.pl "Study in Poland" portal অনুযায়ী। Embassy of the Republic of Poland in New Delhi Bangladesh-এর নাগরিক বা বাসিন্দাদের (সঙ্গে Afghanistan, Bhutan, Maldives, Nepal, Sri Lanka, আর কিছু Indian state) থেকে visa application গ্রহণ করে, Embassy-র নিজের page অনুযায়ী; study-category application Poland-এর নিজস্ব e-Konsulat system-এর মাধ্যমে register করতে হয়, সঙ্গে একটি অতিরিক্ত VFS Global application form, আর সশরীরে একটি Visa Application Centre-এ জমা দিতে হয়।',
      ),
      EU_NOTE,
    ],
    [PL_MFA_INDIA_D_VISA, PL_STUDY_GOV_VISA],
    { allDegrees: true },
  );

const visaProcess = (id: string) =>
  qa(
    id,
    b('How does the visa application work, and how long does it take?', 'Visa application কীভাবে কাজ করে, আর কত সময় লাগে?'),
    [
      b(
        'The Embassy of the Republic of Poland in New Delhi’s own page states study-visa appointments are allocated by order of registration (three times a week, Monday–Wednesday at 10:00) and submitted in person at a Visa Application Centre, with a mandatory separate VFS Global application form alongside the e-Konsulat registration. Per the Embassy’s own page, a national visa is issued or refused within 15 days of submission (extendable to 30 days in justified cases, or longer if the Office for Foreigners must be consulted, which adds up to 5 more days). Once in Poland, study.gov.pl’s own page says you must apply for a temporary residence permit with the local Voivodeship (Provincial) Office before your visa expires; the first permit is issued for 15 months and can be renewed, up to 3 years at a time, for no longer than the remainder of your studies.',
        'Embassy of the Republic of Poland in New Delhi-এর নিজের page বলে study-visa appointment registration-এর ক্রম অনুযায়ী দেওয়া হয় (সপ্তাহে তিনবার, Monday–Wednesday সকাল 10:00-এ) আর সশরীরে একটি Visa Application Centre-এ জমা দিতে হয়, e-Konsulat registration-এর সঙ্গে একটি বাধ্যতামূলক আলাদা VFS Global application form। Embassy-র নিজের page অনুযায়ী, একটি national visa জমা দেওয়ার 15 দিনের মধ্যে ইস্যু বা প্রত্যাখ্যাত হয় (যুক্তিসঙ্গত কারণে 30 দিন পর্যন্ত বাড়ানো যায়, বা Office for Foreigners-কে consult করতে হলে আরও 5 দিন বেশি লাগতে পারে)। Poland-এ পৌঁছানোর পর, study.gov.pl-এর নিজের page বলে আপনার visa-র মেয়াদ শেষ হওয়ার আগে স্থানীয় Voivodeship (Provincial) Office-এ একটি temporary residence permit-এর জন্য আবেদন করতে হবে; প্রথম permit 15 মাসের জন্য ইস্যু হয় আর renew করা যায়, একবারে 3 বছর পর্যন্ত, আপনার পড়াশোনার বাকি সময়ের বেশি না।',
      ),
    ],
    [PL_MFA_INDIA_D_VISA, PL_STUDY_GOV_VISA],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'Partly verified: the Ministry of Internal Affairs’ own nationwide regulation (quoted on Poland’s mission pages, e.g. Poland in Armenia’s own page) sets the amount for a foreigner entering Poland to take up or continue studies at at least 1,086 PLN for the first 2 months of the planned stay (or a document confirming a scholarship award, accepted in place of this), plus separate, smaller amounts for the return trip that vary by the applicant’s country/region of departure. The exact return-trip figure that applies specifically when departing from Bangladesh was not itemized on an official page read for this guide (mission pages quote their own region’s figure, e.g. Armenia’s own page quotes 2,500 PLN for its own applicants, which does not necessarily apply to Bangladesh) — the Embassy of the Republic of Poland in New Delhi should be asked for the exact figure applicable to Bangladeshi applicants.',
        'আংশিকভাবে যাচাই করা: Ministry of Internal Affairs-এর নিজের জাতীয় regulation (Poland-এর mission page-এ উদ্ধৃত, যেমন Poland in Armenia-র নিজের page) Poland-এ পড়াশোনা শুরু বা চালিয়ে যাওয়ার জন্য আসা একজন বিদেশির জন্য পরিমাণ ঠিক করে পরিকল্পিত থাকার প্রথম 2 মাসের জন্য অন্তত 1,086 PLN (বা এর বদলে একটি scholarship award নিশ্চিত করা document গ্রহণযোগ্য), সঙ্গে ফিরতি যাত্রার জন্য আলাদা, ছোট পরিমাণ যা আবেদনকারীর দেশ/অঞ্চল অনুযায়ী আলাদা। Bangladesh থেকে যাওয়ার জন্য বিশেষভাবে প্রযোজ্য সঠিক ফিরতি-যাত্রার সংখ্যা এই guide-এর জন্য পড়া কোনো official page-এ তালিকাভুক্ত হয়নি (mission page নিজের অঞ্চলের সংখ্যা উদ্ধৃত করে, যেমন Armenia-র নিজের page তার নিজের আবেদনকারীদের জন্য 2,500 PLN উদ্ধৃত করে, যা Bangladesh-এর জন্য প্রযোজ্য না হতেও পারে) — Bangladeshi আবেদনকারীদের জন্য প্রযোজ্য সঠিক সংখ্যার জন্য Embassy of the Republic of Poland in New Delhi-কে জিজ্ঞাসা করা উচিত।',
      ),
    ],
    [PL_MFA_ARMENIA_FUNDS, PL_MFA_INDIA_D_VISA],
    { allDegrees: true, status: 'partly-verified' },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('Is health/travel insurance compulsory?', 'Health/travel insurance কি বাধ্যতামূলক?'),
    [
      b(
        'Yes, for the visa application itself. The Embassy of the Republic of Poland in New Delhi’s own page states a national-visa applicant must personally submit a document confirming Travel Medical Insurance (per Art. 25(1)(2)(a) of the Act on Foreigners) — or a document confirming Polish public-health insurance — with an insured sum of no less than EUR 30,000, valid for the whole intended stay and covering return travel for medical reasons, urgent medical assistance, emergency hospital treatment or death.',
        'হ্যাঁ, visa application-এর জন্য নিজেই। Embassy of the Republic of Poland in New Delhi-এর নিজের page বলে একজন national-visa আবেদনকারীকে ব্যক্তিগতভাবে Travel Medical Insurance নিশ্চিত করা একটি document জমা দিতে হয় (Act on Foreigners-এর Art. 25(1)(2)(a) অনুযায়ী) — বা Polish public-health insurance নিশ্চিত করা একটি document — যার insured পরিমাণ EUR 30,000-এর কম না, পুরো পরিকল্পিত থাকার জন্য valid, আর medical কারণে ফিরতি ভ্রমণ, জরুরি medical সহায়তা, জরুরি hospital treatment, বা death কভার করে।',
      ),
    ],
    [PL_MFA_INDIA_D_VISA],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Poland, and how many hours?', 'Poland-এ পড়ার পাশাপাশি কাজ করা যায় কি, আর কত ঘণ্টা?'),
    [
      b(
        'Partly verified, and the rule changed recently. The Office for Foreigners’ (UDSC) own page states that if you are staying in Poland on a visa for your studies (Art. 60(1)(9) of the Law on Foreign Nationals) or on a permit for temporary residence for studies (Art. 144(1)), you may work without a separate work permit — including while waiting for the residence permit, provided you applied for it correctly during your visa’s validity. But the Ministry of Family, Labour and Social Policy’s own current regulation (quoted on the MOS casework portal, legal basis the Act of 20 March 2025 and the Regulation of 20 November 2025) narrows this: the work-permit exemption now applies specifically to "a full-time student at a university that has been approved by the minister competent for internal affairs for the purpose of admitting foreigners or, if not subject to such obligation, has not had a decision on prohibition of admitting foreigners issued against it" — public universities like the ones on this guide’s university page are not subject to that approval requirement in the first place. No official nationwide weekly-hours cap for this work-permit exemption itself was found on the pages read for this guide (unlike, for example, Malaysia’s own 20-hour rule, built in an earlier guide this session) — if one exists, it was not stated on the UDSC or MOS pages read.',
        'আংশিকভাবে যাচাই করা, আর নিয়ম সম্প্রতি পরিবর্তিত হয়েছে। Office for Foreigners (UDSC)-এর নিজের page বলে আপনি যদি আপনার পড়াশোনার জন্য একটি visa-তে (Law on Foreign Nationals-এর Art. 60(1)(9)) বা পড়াশোনার জন্য একটি temporary residence permit-এ (Art. 144(1)) Poland-এ থাকেন, আলাদা work permit ছাড়াই কাজ করতে পারেন — residence permit-এর জন্য অপেক্ষা করার সময়ও, যদি আপনি আপনার visa-র validity-র সময় সঠিকভাবে এর জন্য আবেদন করে থাকেন। কিন্তু Ministry of Family, Labour and Social Policy-র নিজের বর্তমান regulation (MOS casework portal-এ উদ্ধৃত, legal basis Act of 20 March 2025 আর Regulation of 20 November 2025) এটা সংকুচিত করে: work-permit exemption এখন বিশেষভাবে প্রযোজ্য "a full-time student at a university that has been approved by the minister competent for internal affairs for the purpose of admitting foreigners or, if not subject to such obligation, has not had a decision on prohibition of admitting foreigners issued against it" — এই guide-এর university page-এর মতো public university সেই approval শর্তের অধীনেই পড়ে না। এই work-permit exemption-এর জন্য কোনো official জাতীয় সাপ্তাহিক-ঘণ্টা সীমা এই guide-এর জন্য পড়া page-এ পাওয়া যায়নি (উদাহরণস্বরূপ, এই session-এর একটি আগের guide-এ তৈরি Malaysia-র নিজের 20-ঘণ্টা নিয়মের মতো না) — যদি এমন কিছু থাকে, UDSC বা MOS page-এ তা বলা হয়নি।',
      ),
    ],
    [PL_UDSC_WORK_STUDENT, PL_MOS_WORK_WITHOUT_PERMIT],
    { allDegrees: true, status: 'partly-verified' },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Poland to work after graduating?', 'পড়া শেষে Poland-এ কাজের জন্য থাকা যায়?'),
    [
      b(
        'Yes, with limits. The Office for Foreigners’ (UDSC) own page states the work-permit requirement is waived entirely for graduates of full-time university studies at a Polish university (a "graduate" being a holder of a diploma from first-cycle, full-time second-cycle, postgraduate, or doctoral-school studies) — but a residence permit is still required. A third-country national who wants to settle to seek employment or start a business may apply for a temporary residence permit "for other reasons" (Art. 186(1)(6)), granted only once, for 9 months, filed in person with the Province (Voivodeship) Governor during your legal residence, directly after graduation. You will need to show medical insurance, a Polish residential address, and sufficient funds for your own subsistence and your return trip.',
        'হ্যাঁ, সীমার সাথে। Office for Foreigners (UDSC)-এর নিজের page বলে একটি Polish university-তে full-time university studies-এর গ্র্যাজুয়েটদের জন্য work-permit শর্ত সম্পূর্ণভাবে মাফ করা হয় (একজন "graduate" হলেন first-cycle, full-time second-cycle, postgraduate, বা doctoral-school studies-এর diploma holder) — কিন্তু একটি residence permit এখনও লাগে। একজন third-country national যিনি কাজ খুঁজতে বা ব্যবসা শুরু করতে থাকতে চান, তিনি "other reasons"-এর জন্য একটি temporary residence permit-এর (Art. 186(1)(6)) আবেদন করতে পারেন, যা একবারই, 9 মাসের জন্য দেওয়া হয়, গ্র্যাজুয়েশনের ঠিক পর, আপনার legal residence-এর সময় Province (Voivodeship) Governor-এর কাছে সশরীরে জমা দিতে হয়। আপনাকে medical insurance, একটি Polish ঠিকানা, আর নিজের ভরণপোষণ আর ফিরতি যাত্রার জন্য পর্যাপ্ত টাকা দেখাতে হবে।',
      ),
    ],
    [PL_UDSC_GRADUATE_PERMIT],
    { status: 'verified' },
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'Not verified yet that Bangladesh is an eligible country for NAWA’s own Banach NAWA Programme, Poland’s government scholarship for Master’s-level international students, funded as part of Polish development aid. Study.gov.pl’s own reproduction of the official call for proposals names the Programme’s 36 eligible "countries covered by Polish Aid" exhaustively, and Bangladesh was not found among them. NAWA also runs other programmes (e.g. the Poland My First Choice and General NAWA scholarships) whose own eligibility pages were not independently read in full for this guide, so a Bangladesh-specific, full-degree NAWA scholarship cannot be confirmed from the official pages read here.',
        'NAWA-র নিজের Banach NAWA Programme, Master\'s-level international student-দের জন্য Poland-এর government scholarship, যা Polish development aid-এর অংশ হিসেবে অর্থায়িত, এর জন্য Bangladesh একটি যোগ্য দেশ কিনা তা এখনো যাচাই হয়নি। Study.gov.pl-এর নিজের official call for proposals-এর reproduction Programme-এর 36 যোগ্য "countries covered by Polish Aid" সম্পূর্ণভাবে নাম দেয়, আর তাদের মধ্যে Bangladesh পাওয়া যায়নি। NAWA অন্য programme-ও চালায় (যেমন Poland My First Choice আর General NAWA scholarship) যাদের নিজস্ব eligibility page এই guide-এর জন্য সম্পূর্ণভাবে স্বাধীনভাবে পড়া হয়নি, তাই এখানে পড়া official page থেকে একটি Bangladesh-specific, full-degree NAWA scholarship নিশ্চিত করা যায় না।',
      ),
    ],
    [PL_NAWA_BANACH, PL_STUDY_GOV_BANACH],
    { status: 'not-verified', kind: 'guidance' },
  );

// ------------------------------------------------------------------ documents

const AUTHORITY = b('The Embassy of the Republic of Poland in New Delhi, via e-Konsulat and VFS Global.', 'Embassy of the Republic of Poland in New Delhi, e-Konsulat আর VFS Global-এর মাধ্যমে।');

export const PL_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Valid passport (travel document)', 'বৈধ passport (travel document)'),
    why: b('The Embassy of the Republic of Poland in New Delhi’s own checklist requires a valid travel document as the basic identity document for a national-visa application.', 'Embassy of the Republic of Poland in New Delhi-এর নিজের checklist একটি national-visa application-এর মূল identity document হিসেবে একটি valid travel document চায়।'),
    who: AUTHORITY,
    when: b('With the visa application, before travel.', 'Visa application-এর সঙ্গে, যাওয়ার আগে।'),
    where: b('Submitted in person at the Visa Application Centre (VAC).', 'সশরীরে Visa Application Centre (VAC)-এ জমা দিতে হয়।'),
    prepare: b('Make sure the passport has enough validity and blank pages, per the VAC’s own checklist for your category (study).', 'আপনার category (study)-র জন্য VAC-এর নিজের checklist অনুযায়ী passport-এর যথেষ্ট validity আর ফাঁকা page আছে তা নিশ্চিত করুন।'),
    groups: ['general', 'visa'],
    sources: [PL_MFA_INDIA_D_VISA],
  },
  {
    id: 'national-visa-application',
    name: b('National Visa Application Form (via e-Konsulat) + VFS eform', 'National Visa Application Form (e-Konsulat-এর মাধ্যমে) + VFS eform'),
    why: b('The Embassy of the Republic of Poland in New Delhi’s own page requires study-category applicants to register through e-Konsulat and to additionally fill out a separate, mandatory visa application form through VFS Global’s own eforms system before visiting the VAC.', 'Embassy of the Republic of Poland in New Delhi-এর নিজের page study-category আবেদনকারীদের e-Konsulat-এর মাধ্যমে register করতে আর VAC-তে যাওয়ার আগে VFS Global-এর নিজের eforms system-এর মাধ্যমে একটি আলাদা, বাধ্যতামূলক visa application form পূরণ করতে বলে।'),
    who: AUTHORITY,
    when: b('Before booking your VAC appointment.', 'আপনার VAC appointment বুক করার আগে।'),
    where: b('secure2.e-konsulat.gov.pl and eforms.vfsglobal.com.', 'secure2.e-konsulat.gov.pl আর eforms.vfsglobal.com।'),
    prepare: b('Complete both the e-Konsulat registration and the separate VFS eform — missing either can delay your appointment.', 'e-Konsulat registration আর আলাদা VFS eform দুটোই সম্পূর্ণ করুন — কোনো একটা মিস হলে আপনার appointment দেরি হতে পারে।'),
    groups: ['general', 'visa'],
    sources: [PL_MFA_INDIA_D_VISA],
  },
  {
    id: 'admission-certificate',
    name: b('Certificate of admission to studies', 'ভর্তির certificate'),
    why: b('Study.gov.pl’s own page lists a certificate from your school confirming the purpose of your stay as part of both the visa and, later, the temporary residence permit application.', 'Study.gov.pl-এর নিজের page visa আর পরে temporary residence permit application দুটোর জন্য আপনার school থেকে থাকার উদ্দেশ্য নিশ্চিত করা একটি certificate তালিকাভুক্ত করে।'),
    who: b('The Polish institution you were admitted to.', 'যে Polish institution-এ ভর্তি হয়েছেন।'),
    when: b('Issued after admission, needed for both the visa and residence-permit applications.', 'ভর্তির পর ইস্যু হয়, visa আর residence-permit application দুটোর জন্য লাগে।'),
    where: b('Submitted with the visa application, then again at the Voivodeship Office.', 'Visa application-এর সঙ্গে জমা দিতে হয়, তারপর আবার Voivodeship Office-এ।'),
    prepare: b('Keep extra certified copies — you will need this document more than once.', 'অতিরিক্ত certified copy রাখুন — এই document একাধিকবার লাগবে।'),
    groups: ['general', 'program', 'visa'],
    sources: [PL_STUDY_GOV_VISA],
  },
  {
    id: 'travel-medical-insurance',
    name: b('Travel medical insurance (minimum EUR 30,000)', 'Travel medical insurance (ন্যূনতম EUR 30,000)'),
    why: b('The Embassy of the Republic of Poland in New Delhi’s own page requires a document confirming Travel Medical Insurance (or Polish public-health insurance) with an insured sum of at least EUR 30,000, valid for the whole intended stay and covering emergency medical treatment, hospitalisation or death.', 'Embassy of the Republic of Poland in New Delhi-এর নিজের page Travel Medical Insurance (বা Polish public-health insurance) নিশ্চিত করা একটি document চায়, যার insured পরিমাণ অন্তত EUR 30,000, পুরো পরিকল্পিত থাকার জন্য valid, আর জরুরি medical treatment, hospitalisation, বা death কভার করে।'),
    who: b('An insurer that meets the Ministry of Foreign Affairs’ own listed conditions.', 'Ministry of Foreign Affairs-এর নিজের তালিকাভুক্ত শর্ত পূরণ করা একটি insurer।'),
    when: b('With the visa application; renew to cover your whole stay.', 'Visa application-এর সঙ্গে; পুরো থাকার সময় কভার করতে renew করুন।'),
    where: b('Submitted at the VAC with your application.', 'আপনার application-এর সঙ্গে VAC-তে জমা দিতে হয়।'),
    prepare: b('Confirm your insurer is on the Ministry of Foreign Affairs’ own accepted list before buying a policy.', 'Policy কেনার আগে আপনার insurer Ministry of Foreign Affairs-এর নিজের গৃহীত তালিকায় আছে তা নিশ্চিত করুন।'),
    groups: ['general', 'visa', 'arrival'],
    sources: [PL_MFA_INDIA_D_VISA],
  },
  {
    id: 'proof-of-funds',
    name: b('Proof of sufficient funds', 'পর্যাপ্ত funds-এর proof'),
    why: b('Poland’s own nationwide regulation (quoted on mission pages) requires proof of financial resources — at least 1,086 PLN for the first 2 months for study purposes, or a scholarship-award letter — plus a separate, smaller amount for the return trip.', 'Poland-এর নিজের জাতীয় regulation (mission page-এ উদ্ধৃত) আর্থিক সম্পদের proof চায় — পড়াশোনার জন্য প্রথম 2 মাসের জন্য অন্তত 1,086 PLN, বা একটি scholarship-award letter — সঙ্গে ফিরতি যাত্রার জন্য আলাদা, ছোট পরিমাণ।'),
    who: AUTHORITY,
    when: b('With the visa application.', 'Visa application-এর সঙ্গে।'),
    where: b('Submitted at the VAC.', 'VAC-তে জমা দিতে হয়।'),
    prepare: b('A bank statement, a credit-card-limit certificate, or a scholarship-award letter can each satisfy this, per the official regulation.', 'Official regulation অনুযায়ী, একটি bank statement, credit-card-limit certificate, বা scholarship-award letter এটা পূরণ করতে পারে।'),
    groups: ['general', 'visa', 'bangladesh'],
    sources: [PL_MFA_ARMENIA_FUNDS],
  },
  {
    id: 'temporary-residence-permit',
    name: b('Temporary residence permit application (after arrival)', 'Temporary residence permit application (পৌঁছানোর পর)'),
    why: b('Study.gov.pl’s own page states every non-EU student needs this permit, applied for with the local Voivodeship Office before the national visa expires; the procedure costs 390 PLN in total.', 'Study.gov.pl-এর নিজের page বলে প্রতিটি non-EU student-এর এই permit লাগে, national visa-র মেয়াদ শেষ হওয়ার আগে স্থানীয় Voivodeship Office-এ আবেদন করতে হয়; procedure-এর মোট খরচ 390 PLN।'),
    who: b('The local Voivodeship (Provincial) Office.', 'স্থানীয় Voivodeship (Provincial) Office।'),
    when: b('After arrival in Poland, while your visa is still valid.', 'Poland-এ পৌঁছানোর পর, আপনার visa এখনও valid থাকতে থাকতে।'),
    where: b('The Voivodeship Office nearest your Polish address.', 'আপনার Polish ঠিকানার কাছের Voivodeship Office।'),
    prepare: b('Apply as early as possible after arrival — you must apply while your visa is still legally valid.', 'পৌঁছানোর পর যত দ্রুত সম্ভব আবেদন করুন — আপনার visa এখনও আইনগতভাবে valid থাকতে থাকতে আবেদন করতে হবে।'),
    groups: ['visa', 'arrival'],
    sources: [PL_STUDY_GOV_VISA, PL_MOS_STUDY_PERMIT],
  },
];

// ------------------------------------------------------------------ costs (source's own currency, never converted)

const UW_TUITION_EXAMPLE: GuideCost = {
  id: 'uw-tuition-example',
  label: b('Tuition example: University of Warsaw, English-taught programmes', 'Tuition উদাহরণ: University of Warsaw, English-taught programme'),
  value: b('UW’s own tuition-fees document for 2026/2027 lists fees per programme, not a single nationwide figure — e.g. Global Management 2,500 EUR per semester, International Relations 4,300 EUR per year, Finance, International Investment and Accounting 4,200 EUR per year.', 'UW-এর নিজের 2026/2027 tuition-fees document প্রতি programme অনুযায়ী fee তালিকাভুক্ত করে, একক জাতীয় সংখ্যা না — যেমন Global Management প্রতি সেমিস্টারে 2,500 EUR, International Relations প্রতি বছরে 4,300 EUR, Finance, International Investment and Accounting প্রতি বছরে 4,200 EUR।'),
  status: 'verified',
  amount: { value: 2500, max: 4300, currency: 'EUR', period: 'year' },
  source: PL_UW_FEES_2026,
};
const WUT_TUITION_EXAMPLE: GuideCost = {
  id: 'wut-tuition-example',
  label: b('Tuition example: Warsaw University of Technology, non-EU Bachelor’s', 'Tuition উদাহরণ: Warsaw University of Technology, non-EU Bachelor\'s'),
  value: b('WUT’s own B.Sc. offer page lists non-EU tuition per programme, e.g. Power Engineering EUR 2,340/year, Environmental Engineering EUR 3,000/year, Civil Engineering EUR 5,100/year, Computer Science EUR 5,520/year, Architecture EUR 6,830 for the whole 8-semester programme.', 'WUT-এর নিজের B.Sc. offer page প্রতি programme অনুযায়ী non-EU tuition তালিকাভুক্ত করে, যেমন Power Engineering বছরে EUR 2,340, Environmental Engineering বছরে EUR 3,000, Civil Engineering বছরে EUR 5,100, Computer Science বছরে EUR 5,520, Architecture পুরো 8-সেমিস্টার programme-এর জন্য EUR 6,830।'),
  status: 'verified',
  amount: { value: 2340, max: 6830, currency: 'EUR', period: 'year' },
  source: PL_WUT_BSC_OFFER,
};
const UNVERIFIED: GuideCost[] = [
  {
    id: 'agh-amu-tuition-not-itemized',
    label: b('AGH University of Krakow and Adam Mickiewicz University fees (Polish-language studies)', 'AGH University of Krakow আর Adam Mickiewicz University-র fee (Polish-ভাষার studies)'),
    value: b('AGH’s own fees page and AMU’s own tuition-fees page publish fees for studies taught in Polish (AMU’s own page lists per-semester fees from PLN 1,900 to 4,000 depending on the major for foreign-language-track studies), but an English-taught, non-EU-specific figure for every programme was not itemized in full on the pages read for this guide — check the exact programme directly.', 'AGH-এর নিজের fees page আর AMU-র নিজের tuition-fees page Polish-এ পড়ানো studies-এর জন্য fee প্রকাশ করে (AMU-র নিজের page foreign-language-track studies-এর জন্য major অনুযায়ী প্রতি সেমিস্টারে PLN 1,900 থেকে 4,000 তালিকাভুক্ত করে), কিন্তু প্রতিটি programme-এর জন্য একটি English-taught, non-EU-specific সংখ্যা এই guide-এর জন্য পড়া page-এ সম্পূর্ণভাবে তালিকাভুক্ত হয়নি — সরাসরি সঠিক programme দেখুন।'),
    status: 'partly-verified',
    amount: { value: 1900, max: 4000, currency: 'PLN', period: 'semester' },
    source: PL_AMU_TUITION,
  },
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
        [
          b(
            'The examples below — AGH University of Krakow, Adam Mickiewicz University (Poznań), Jagiellonian University, the University of Warsaw and Warsaw University of Technology — are listed alphabetically, not ordered by quality. All five are public universities, but tuition for foreign-language (mostly English-taught) programmes is still charged per programme, set in each institution’s own Rector’s ordinance — there is no single nationwide fee. Always check the exact programme on the institution’s own admissions page.',
            'নিচের উদাহরণ — AGH University of Krakow, Adam Mickiewicz University (Poznań), Jagiellonian University, University of Warsaw, আর Warsaw University of Technology — বর্ণানুক্রমে, মান অনুযায়ী নয়। পাঁচটিই public university, কিন্তু foreign-language (অধিকাংশ English-taught) programme-এর tuition এখনও প্রতি programme অনুযায়ী নেওয়া হয়, প্রতিটি institution-এর নিজের Rector-এর ordinance-এ ঠিক হয় — কোনো একক জাতীয় fee নেই। সবসময় প্রতিষ্ঠানের নিজের admissions page-এ সঠিক programme দেখুন।',
          ),
        ],
        [PL_AMU_TUITION],
      ),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work'), insurance('insurance')] },
  { id: 'visa', title: b('Visa and residence permit', 'Visa আর residence permit'), items: [visaRequired('visa-required'), visaProcess('visa-process'), funds('funds')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Secondary-school leaving certificate recognised/nostrified · work-permit exemption for full-time students at approved universities, no stated hours cap · D-type visa + Voivodeship residence permit', 'স্বীকৃত/nostrified secondary-school leaving certificate · approved university-তে full-time student-দের জন্য work-permit exemption, কোনো বলা ঘণ্টা সীমা নেই · D-type visa + Voivodeship residence permit'),
  intro: b(
    'Poland is an EU/Schengen member, so a Bangladeshi Bachelor’s applicant needs a long-term national ("D"-type) visa from the Embassy of the Republic of Poland in New Delhi (Poland’s mission of record for Bangladesh), applied for through e-Konsulat and a separate VFS Global eform, with travel medical insurance of at least EUR 30,000 and proof of at least 1,086 PLN for the first 2 months. After arrival, every non-EU student must apply for a temporary residence permit at the local Voivodeship Office before the visa expires (first permit 15 months, renewable up to 3 years at a time, total procedure cost 390 PLN). Public universities such as AGH, Adam Mickiewicz University, Jagiellonian University, the University of Warsaw and Warsaw University of Technology each set their own tuition per programme — WUT’s own published non-EU Bachelor’s fees, for example, range roughly EUR 2,340–6,830 depending on the programme. Once holding a study visa or residence permit for studies, you may work without a separate work permit, but current Ministry of Family, Labour and Social Policy rules (effective from the Act of 20 March 2025 / Regulation of 20 November 2025) condition this on being a full-time student at a university the Ministry of Interior has approved for admitting foreigners, or — like the public universities in this guide — one not subject to that approval requirement in the first place; no nationwide weekly-hours cap for this exemption was found on the pages read.',
    'Poland EU/Schengen সদস্য, তাই একজন Bangladeshi Bachelor\'s আবেদনকারীর Embassy of the Republic of Poland in New Delhi (Bangladesh-এর জন্য Poland-এর mission of record) থেকে একটি দীর্ঘমেয়াদী national ("D"-type) visa লাগে, e-Konsulat আর একটি আলাদা VFS Global eform-এর মাধ্যমে আবেদন করতে হয়, সঙ্গে অন্তত EUR 30,000-এর travel medical insurance আর প্রথম 2 মাসের জন্য অন্তত 1,086 PLN-এর proof। পৌঁছানোর পর, প্রতিটি non-EU student-কে visa-র মেয়াদ শেষ হওয়ার আগে স্থানীয় Voivodeship Office-এ একটি temporary residence permit-এর জন্য আবেদন করতে হবে (প্রথম permit 15 মাস, একবারে 3 বছর পর্যন্ত renew করা যায়, মোট procedure খরচ 390 PLN)। AGH, Adam Mickiewicz University, Jagiellonian University, University of Warsaw, আর Warsaw University of Technology-র মতো public university প্রতিটি নিজস্ব tuition প্রতি programme অনুযায়ী ঠিক করে — উদাহরণস্বরূপ, WUT-এর নিজের প্রকাশিত non-EU Bachelor\'s fee programme অনুযায়ী প্রায় EUR 2,340–6,830। একটি study visa বা পড়াশোনার জন্য residence permit থাকলে, আলাদা work permit ছাড়াই কাজ করতে পারেন, কিন্তু Ministry of Family, Labour and Social Policy-র বর্তমান নিয়ম (Act of 20 March 2025 / Regulation of 20 November 2025 থেকে effective) এটা শর্ত করে যে আপনাকে Ministry of Interior-এর approved একটি university-তে full-time student হতে হবে, বা — এই guide-এর public university-গুলোর মতো — এমন একটি যা সেই approval শর্তের অধীনেই পড়ে না; এই exemption-এর জন্য কোনো জাতীয় সাপ্তাহিক-ঘণ্টা সীমা পড়া page-এ পাওয়া যায়নি।',
  ),
  costs: { official: [UW_TUITION_EXAMPLE, WUT_TUITION_EXAMPLE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b('What do you need to study a Bachelor’s in Poland from Bangladesh?', 'Bangladesh থেকে Poland-এ Bachelor\'s পড়তে কী কী লাগে?'),
          [
            b(
              'A secondary-school leaving certificate recognised as equivalent to the Polish "matura" (or nostrified by a Polish authority where required), an offer from a Polish institution, English proficiency where the programme is English-taught, and — since Bangladesh is not visa-exempt — the full national ("D"-type) visa process through the Embassy of the Republic of Poland in New Delhi, followed by a temporary residence permit after arrival.',
              'Polish "matura"-র সমতুল্য স্বীকৃত একটি secondary-school leaving certificate (বা প্রয়োজনে একটি Polish authority দ্বারা nostrified), একটি Polish institution-এর offer, programme English-taught হলে English proficiency, আর — Bangladesh visa-exempt না বলে — Embassy of the Republic of Poland in New Delhi-এর মাধ্যমে পূর্ণ national ("D"-type) visa process, তারপর পৌঁছানোর পর একটি temporary residence permit।',
            ),
            CHECK_UNI,
          ],
          [PL_STUDY_GOV_VISA],
          { status: 'partly-verified' },
        ),
        qa(
          'hsc',
          b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'),
          [
            b(
              'Not verified yet as a single nationwide grade-conversion rule — a dedicated, nationwide HSC-to-Polish-"matura" equivalence formula applicable at every Polish institution was not found on an official page read for this guide. Each university decides equivalence for its own applicants (some may require a one-year preparatory/foundation course first), so confirm directly with your chosen institution.',
              'একক জাতীয় grade-conversion নিয়ম হিসেবে এখনো যাচাই হয়নি — প্রতিটি Polish institution-এ প্রযোজ্য একটি নিবেদিত, জাতীয় HSC-থেকে-Polish-"matura" সমতুল্যতা formula এই guide-এর জন্য পড়া কোনো official page-এ পাওয়া যায়নি। প্রতিটি university তার নিজের আবেদনকারীদের জন্য সমতুল্যতা ঠিক করে (কিছু university প্রথমে এক-বছরের preparatory/foundation course চাইতে পারে), তাই সরাসরি আপনার বাছা institution-এর সাথে নিশ্চিত করুন।',
            ),
          ],
          [PL_STUDY_GOV_VISA],
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
          [
            b(
              'Deadlines and application fees are set per institution, not nationally. The University of Warsaw’s own application fee is 85 PLN (100 PLN if an entrance exam/interview is required); AGH University of Krakow’s own Master’s application fee is 100 PLN per declared field with an entrance exam. Each institution runs its own recruitment calendar and own online recruitment system — check your own target university directly.',
              'Deadline আর application fee প্রতি institution অনুযায়ী ঠিক হয়, জাতীয়ভাবে নয়। University of Warsaw-র নিজের application fee 85 PLN (entrance exam/interview লাগলে 100 PLN); AGH University of Krakow-র নিজের Master\'s application fee প্রতি declared field-এর জন্য 100 PLN, entrance exam সহ। প্রতিটি institution নিজস্ব recruitment calendar আর নিজস্ব online recruitment system চালায় — সরাসরি আপনার বাছা university চেক করুন।',
            ),
          ],
          [PL_UW_FEES_2026, PL_AGH_FEES],
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
          b('How much English do you need for an English-taught Bachelor’s?', 'English-taught Bachelor\'s-এ কত English লাগে?'),
          [
            b(
              'Not a single nationwide minimum — each institution sets its own figure. Warsaw University of Technology’s own English-proficiency glossary sets a general B2 minimum, with accepted certificates including IELTS Academic (minimum 6 points) and TOEFL iBT; AGH University of Krakow’s own required-documents pages accept, among others, IELTS Academic at a minimum of 5.5 points or TOEFL iBT at a minimum of 72 points, also at B2 level. Always confirm your own programme’s exact figure directly.',
              'একক জাতীয় ন্যূনতম না — প্রতিটি institution নিজস্ব সংখ্যা ঠিক করে। Warsaw University of Technology-র নিজের English-proficiency glossary একটি সাধারণ B2 ন্যূনতম ঠিক করে, গ্রহণযোগ্য certificate-এর মধ্যে IELTS Academic (ন্যূনতম 6 points) আর TOEFL iBT; AGH University of Krakow-র নিজের required-documents page অন্যদের মধ্যে IELTS Academic ন্যূনতম 5.5 points বা TOEFL iBT ন্যূনতম 72 points গ্রহণ করে, এটাও B2 level-এ। সবসময় সরাসরি আপনার নিজের programme-এর সঠিক সংখ্যা নিশ্চিত করুন।',
            ),
          ],
          [PL_WUT_ENGLISH, PL_AGH_FEES],
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
          b('How much is a Bachelor’s in Poland?', 'Poland-এ Bachelor\'s-এ খরচ কত?'),
          [
            b(
              'Set per institution and per programme, not nationally. Warsaw University of Technology’s own B.Sc. offer page lists non-EU tuition from EUR 2,340/year (Power Engineering) up to EUR 6,830 for the whole programme (Architecture); the University of Warsaw’s own 2026/2027 schedule lists some Bachelor’s-level programmes from 2,300–4,300 EUR/year. Study.eu’s unofficial survey (not an official source) suggests a broader national range of roughly EUR 1,500–5,000/year for Bachelor’s study, consistent in scale with these two institutions’ own published figures.',
              'Institution আর programme অনুযায়ী ঠিক হয়, জাতীয়ভাবে নয়। Warsaw University of Technology-র নিজের B.Sc. offer page non-EU tuition বছরে EUR 2,340 (Power Engineering) থেকে পুরো programme-এর জন্য EUR 6,830 (Architecture) পর্যন্ত তালিকাভুক্ত করে; University of Warsaw-র নিজের 2026/2027 schedule কিছু Bachelor\'s-level programme বছরে 2,300–4,300 EUR তালিকাভুক্ত করে। Study.eu-র unofficial survey (official source না) প্রস্তাব করে Bachelor\'s study-র জন্য একটি বিস্তৃত জাতীয় range প্রায় EUR 1,500–5,000/বছর, যা এই দুই institution-এর নিজস্ব প্রকাশিত সংখ্যার সাথে স্কেলে সামঞ্জস্যপূর্ণ।',
            ),
            CHECK_UNI,
          ],
          [PL_WUT_BSC_OFFER, PL_UW_FEES_2026],
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
  card: b('A relevant Bachelor’s needed · NAWA’s Banach Programme funds Master’s study, but Bangladesh not among its 36 named countries · same D-type visa + residence permit process', 'সম্পর্কিত Bachelor\'s লাগে · NAWA-র Banach Programme Master\'s পড়াশোনার fund দেয়, কিন্তু Bangladesh এর 36টি নামযুক্ত দেশের মধ্যে নেই · একই D-type visa + residence permit process'),
  intro: b(
    'Master’s admission in Poland follows the same institution-by-institution pattern as Bachelor’s, generally needing a relevant Bachelor’s degree (or equivalent) recognised by the institution. NAWA’s own Banach NAWA Programme funds Master’s-level study in Polish or English (monthly stipend, tuition exemption at public universities, a PLN 2,500 travel allowance) for citizens of 36 named "countries covered by Polish Aid" — study.gov.pl’s own reproduction of that list does not include Bangladesh, so Bangladeshi eligibility is not confirmed. As with Bachelor’s level, you must obtain the national ("D"-type) visa from the Embassy of the Republic of Poland in New Delhi before travelling, and a temporary residence permit from the local Voivodeship Office after arrival, before your visa expires.',
    'Poland-এ Master\'s ভর্তি Bachelor\'s-এর মতোই একই institution-by-institution ধারা অনুসরণ করে, সাধারণত institution-এর স্বীকৃত একটি সম্পর্কিত Bachelor\'s degree (বা সমতুল্য) লাগে। NAWA-র নিজের Banach NAWA Programme Polish বা English-এ Master\'s-level পড়াশোনার fund দেয় (মাসিক stipend, public university-তে tuition exemption, PLN 2,500 travel allowance) 36টি নামযুক্ত "countries covered by Polish Aid"-এর নাগরিকদের জন্য — study.gov.pl-এর নিজের সেই তালিকার reproduction-এ Bangladesh নেই, তাই Bangladeshi eligibility নিশ্চিত না। Bachelor\'s level-এর মতোই, যাওয়ার আগে Embassy of the Republic of Poland in New Delhi থেকে national ("D"-type) visa নিতে হবে, আর পৌঁছানোর পর, visa-র মেয়াদ শেষ হওয়ার আগে স্থানীয় Voivodeship Office থেকে একটি temporary residence permit।',
  ),
  costs: { official: [UW_TUITION_EXAMPLE, WUT_TUITION_EXAMPLE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b('What do you need for a Master’s in Poland?', 'Poland-এ Master\'s-এ কী লাগে?'),
          [
            b(
              'A relevant Bachelor’s degree (or equivalent) recognised by the institution, per each institution’s own admission process — Jagiellonian University’s own fees page states foreigners undertaking first-cycle, second-cycle, and long-cycle Master’s studies are required to pay tuition fees unless they qualify for a listed exemption (e.g. EU/EEA/Swiss citizenship, a Pole’s Card, certain residence-permit categories, or being a NAWA scholarship holder).',
              'Institution-এর স্বীকৃত একটি সম্পর্কিত Bachelor\'s degree (বা সমতুল্য), প্রতিটি institution-এর নিজের admission process অনুযায়ী — Jagiellonian University-র নিজের fees page বলে first-cycle, second-cycle, আর long-cycle Master\'s studies করা বিদেশিদের tuition fee দিতে হয়, যদি না তারা একটি তালিকাভুক্ত exemption-এর যোগ্য হন (যেমন EU/EEA/Swiss নাগরিকত্ব, একটি Pole\'s Card, নির্দিষ্ট residence-permit category, বা NAWA scholarship holder হওয়া)।',
            ),
          ],
          [PL_UJ_FEES],
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
          [
            b(
              'Deadlines and application fees are set per institution. The Jagiellonian University’s own page sets a 100 PLN application fee per application, paid by bank transfer or the Przelewy24 quick-payment system; the University of Warsaw’s own page sets 85–100 PLN. Each institution’s own graduate-admissions office should be checked directly for the exact window and procedure for your intended programme.',
              'Deadline আর application fee প্রতি institution অনুযায়ী ঠিক হয়। Jagiellonian University-র নিজের page প্রতি application-এর জন্য 100 PLN application fee ঠিক করে, bank transfer বা Przelewy24 quick-payment system দিয়ে পরিশোধযোগ্য; University of Warsaw-র নিজের page 85–100 PLN ঠিক করে। আপনার ইচ্ছিত programme-এর জন্য সঠিক window আর procedure সরাসরি প্রতিটি institution-এর নিজের graduate-admissions office-এ চেক করা উচিত।',
            ),
          ],
          [PL_UJ_FEES, PL_UW_FEES_2026],
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
          [
            b(
              'Not a single nationwide minimum — institutions set their own. Warsaw University of Technology’s own glossary (used for both Bachelor’s and Master’s admission) accepts IELTS Academic at a minimum of 6 points at B2 level; other institutions and programmes set their own, separate requirements. Always confirm your own programme directly.',
              'একক জাতীয় ন্যূনতম না — institution-রা নিজস্ব শর্ত ঠিক করে। Warsaw University of Technology-র নিজের glossary (Bachelor\'s আর Master\'s ভর্তি দুটোর জন্যই ব্যবহৃত) B2 level-এ IELTS Academic ন্যূনতম 6 points গ্রহণ করে; অন্য institution আর programme নিজস্ব, আলাদা শর্ত ঠিক করে। সবসময় সরাসরি আপনার নিজের programme নিশ্চিত করুন।',
            ),
          ],
          [PL_WUT_ENGLISH],
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
          b('How much is a Master’s in Poland?', 'Poland-এ Master\'s-এ খরচ কত?'),
          [
            b(
              'Set per institution and per programme. Warsaw University of Technology’s own M.Sc. offer page lists non-EU tuition from EUR 1,800/year (e.g. Geodesy and Cartography) to EUR 7,090/year (Architecture); the University of Warsaw’s own 2026/2027 schedule lists Master’s-level programmes such as International Economics at 4,900 EUR/year. NAWA’s Banach NAWA Programme can cover full tuition plus a monthly stipend for eligible scholars from its own 36 named countries, but Bangladesh is not confirmed as eligible.',
              'Institution আর programme অনুযায়ী ঠিক হয়। Warsaw University of Technology-র নিজের M.Sc. offer page non-EU tuition বছরে EUR 1,800 (যেমন Geodesy and Cartography) থেকে বছরে EUR 7,090 (Architecture) পর্যন্ত তালিকাভুক্ত করে; University of Warsaw-র নিজের 2026/2027 schedule International Economics-এর মতো Master\'s-level programme বছরে 4,900 EUR তালিকাভুক্ত করে। NAWA-র Banach NAWA Programme এর নিজের 36টি নামযুক্ত দেশের যোগ্য scholar-দের জন্য পূর্ণ tuition সঙ্গে মাসিক stipend কভার করতে পারে, কিন্তু Bangladesh যোগ্য হিসেবে নিশ্চিত না।',
            ),
            CHECK_UNI,
          ],
          [PL_UW_FEES_2026, PL_NAWA_BANACH],
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
  card: b('A relevant Master’s needed, admission to a doctoral school · same D-type visa + residence permit process as other degrees · doctoral students exempt from work permit', 'সম্পর্কিত Master\'s লাগে, একটি doctoral school-এ ভর্তি · অন্য degree-র মতোই একই D-type visa + residence permit process · doctoral student-রা work permit থেকে exempt'),
  intro: b(
    'A PhD in Poland is pursued through admission to a doctoral school at a Polish university, generally needing a relevant Master’s degree; exact admission requirements (interview, supervisor acceptance, specific grade thresholds) are set at university or doctoral-school level, not nationally, and were not itemized in detail on the official pages read for this guide. The Office for Foreigners’ (UDSC) own page confirms doctoral students at a doctoral school based in Poland are exempt from the work-permit requirement, the same exemption that applies to graduates of Polish full-time university studies. As with other degree levels, Bangladeshi applicants must obtain the national ("D"-type) visa from the Embassy of the Republic of Poland in New Delhi before travelling, then a temporary residence permit from the local Voivodeship Office after arrival.',
    'Poland-এ একটি PhD একটি Polish university-র doctoral school-এ ভর্তির মাধ্যমে করা হয়, সাধারণত একটি সম্পর্কিত Master\'s degree লাগে; সঠিক ভর্তির শর্ত (interview, supervisor-এর গ্রহণ, নির্দিষ্ট grade threshold) জাতীয়ভাবে না, university বা doctoral-school level-এ ঠিক হয়, আর এই guide-এর জন্য পড়া official page-এ বিস্তারিতভাবে তালিকাভুক্ত হয়নি। Office for Foreigners (UDSC)-এর নিজের page নিশ্চিত করে Poland-ভিত্তিক একটি doctoral school-এর doctoral student-রা work-permit শর্ত থেকে exempt, যা Polish full-time university studies-এর গ্র্যাজুয়েটদের জন্য প্রযোজ্য একই exemption। অন্য degree level-এর মতোই, Bangladeshi আবেদনকারীদের যাওয়ার আগে Embassy of the Republic of Poland in New Delhi থেকে national ("D"-type) visa নিতে হবে, তারপর পৌঁছানোর পর স্থানীয় Voivodeship Office থেকে একটি temporary residence permit।',
  ),
  costs: { official: [], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Poland?', 'Poland-এ কীভাবে PhD পাওয়া যায়?'),
          [
            b(
              'Not verified yet as general nationwide rules: apply directly to a doctoral school at your chosen Polish university, with a relevant Master’s degree. Exact requirements (interview, minimum grades, supervisor acceptance) are set at university or doctoral-school level, not nationally, and were not itemized in detail on the official pages read for this guide. The visa and residence-permit process (national visa, then Voivodeship-Office temporary residence permit) and the work-permit exemption for doctoral students apply the same way regardless of subject.',
              'সাধারণ জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: আপনার বাছা Polish university-র একটি doctoral school-এ সরাসরি আবেদন করুন, একটি সম্পর্কিত Master\'s degree সহ। সঠিক শর্ত (interview, ন্যূনতম grade, supervisor-এর গ্রহণ) জাতীয়ভাবে না, university বা doctoral-school level-এ ঠিক হয়, আর এই guide-এর জন্য পড়া official page-এ বিস্তারিতভাবে তালিকাভুক্ত হয়নি। Visa আর residence-permit process (national visa, তারপর Voivodeship-Office temporary residence permit) আর doctoral student-দের জন্য work-permit exemption subject নির্বিশেষে একইভাবে প্রযোজ্য।',
            ),
            CHECK_UNI,
          ],
          [PL_UDSC_WORK_STUDENT],
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
          [
            b(
              'Not verified yet as a single general rule: each doctoral school or supervisor sets its own language expectations, which were not itemized nationally on the pages read for this guide.',
              'সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: প্রতিটি doctoral school বা supervisor নিজের ভাষার প্রত্যাশা দেয়, যা এই guide-এর জন্য পড়া page-এ জাতীয়ভাবে তালিকাভুক্ত হয়নি।',
            ),
          ],
          [PL_WUT_ENGLISH],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ the country

export const PL_GUIDE: CountryGuide = {
  code: 'PL',
  checkedAt: PL_READ,
  sourcesPerSection: true,
  intro: b(
    'Poland is an EU/Schengen member, so a Bangladeshi applicant needs a long-term national ("D"-type) visa, issued for up to one year, applied for through the Embassy of the Republic of Poland in New Delhi — Poland’s mission of record for Bangladesh, since there is no Polish embassy in Dhaka — via e-Konsulat registration plus a separate VFS Global eform. The Embassy’s own page targets a 15-day decision (extendable to 30 days, or longer if the Office for Foreigners is consulted). Compulsory travel medical insurance of at least EUR 30,000 and proof of at least 1,086 PLN for the first 2 months (or a scholarship-award letter) are both required for the visa. After arriving, every non-EU student must apply for a temporary residence permit with the local Voivodeship Office before the visa expires (first permit 15 months, renewable up to 3 years at a time, 390 PLN total procedure cost). The Office for Foreigners’ own page confirms you may work without a separate work permit while on a study visa or residence permit, but a current Ministry of Family, Labour and Social Policy regulation (effective from the Act of 20 March 2025 / Regulation of 20 November 2025) conditions this on being a full-time student at a university either approved by the Ministry of Interior for admitting foreigners, or — like the public universities in this guide — not subject to that approval requirement; no nationwide weekly-hours cap for this exemption was found. Graduates of full-time Polish university studies are fully exempt from the work-permit requirement, and may apply once, for 9 months, for a temporary residence permit to seek employment or start a business. Tuition at public universities (AGH, Adam Mickiewicz University, Jagiellonian University, the University of Warsaw, Warsaw University of Technology) is set per programme, not nationally — Warsaw University of Technology’s own published non-EU figures range roughly EUR 2,340–7,090/year depending on the programme. NAWA’s own Banach NAWA Programme funds Master’s study for citizens of 36 exhaustively named "countries covered by Polish Aid" that does not include Bangladesh. This guide is built from the Office for Foreigners (gov.pl/web/udsc-en), the Moduł Obsługi Spraw casework portal (mos.cudzoziemcy.gov.pl), the Embassy of the Republic of Poland in New Delhi (gov.pl/web/india), Poland’s mission pages, the official study.gov.pl "Study in Poland" portal, NAWA (nawa.gov.pl), and university pages.',
    'Poland EU/Schengen সদস্য, তাই একজন Bangladeshi আবেদনকারীর একটি দীর্ঘমেয়াদী national ("D"-type) visa লাগে, যা একবারে এক বছর পর্যন্ত ইস্যু হয়, Embassy of the Republic of Poland in New Delhi-এর মাধ্যমে আবেদন করতে হয় — Bangladesh-এর জন্য Poland-এর mission of record, কারণ Dhaka-তে কোনো Polish embassy নেই — e-Konsulat registration আর একটি আলাদা VFS Global eform-এর মাধ্যমে। Embassy-র নিজের page 15-দিনের decision লক্ষ্য রাখে (30 দিন পর্যন্ত বাড়ানো যায়, বা Office for Foreigners-কে consult করতে হলে আরও বেশি)। Visa-র জন্য অন্তত EUR 30,000-এর বাধ্যতামূলক travel medical insurance আর প্রথম 2 মাসের জন্য অন্তত 1,086 PLN-এর proof (বা একটি scholarship-award letter) দুটোই লাগে। পৌঁছানোর পর, প্রতিটি non-EU student-কে visa-র মেয়াদ শেষ হওয়ার আগে স্থানীয় Voivodeship Office-এ একটি temporary residence permit-এর জন্য আবেদন করতে হবে (প্রথম permit 15 মাস, একবারে 3 বছর পর্যন্ত renew করা যায়, মোট procedure খরচ 390 PLN)। Office for Foreigners-এর নিজের page নিশ্চিত করে আপনি একটি study visa বা residence permit-এ থাকলে আলাদা work permit ছাড়াই কাজ করতে পারেন, কিন্তু Ministry of Family, Labour and Social Policy-র একটি বর্তমান regulation (Act of 20 March 2025 / Regulation of 20 November 2025 থেকে effective) এটা শর্ত করে যে আপনাকে Ministry of Interior-এর approved একটি university-তে, বা — এই guide-এর public university-গুলোর মতো — সেই approval শর্তের অধীনে না পড়া একটিতে, full-time student হতে হবে; এই exemption-এর জন্য কোনো জাতীয় সাপ্তাহিক-ঘণ্টা সীমা পাওয়া যায়নি। Polish full-time university studies-এর গ্র্যাজুয়েটরা work-permit শর্ত থেকে সম্পূর্ণভাবে exempt, আর একবার, 9 মাসের জন্য, কাজ খোঁজা বা ব্যবসা শুরু করার জন্য একটি temporary residence permit-এর আবেদন করতে পারেন। Public university-তে (AGH, Adam Mickiewicz University, Jagiellonian University, University of Warsaw, Warsaw University of Technology) tuition প্রতি programme অনুযায়ী ঠিক হয়, জাতীয়ভাবে না — Warsaw University of Technology-র নিজের প্রকাশিত non-EU সংখ্যা programme অনুযায়ী প্রায় EUR 2,340–7,090/বছর। NAWA-র নিজের Banach NAWA Programme 36টি সম্পূর্ণভাবে নামযুক্ত "countries covered by Polish Aid"-এর নাগরিকদের জন্য Master\'s পড়াশোনার fund দেয় যাতে Bangladesh নেই। এই guide Office for Foreigners (gov.pl/web/udsc-en), Moduł Obsługi Spraw casework portal (mos.cudzoziemcy.gov.pl), Embassy of the Republic of Poland in New Delhi (gov.pl/web/india), Poland-এর mission page, official study.gov.pl "Study in Poland" portal, NAWA (nawa.gov.pl), আর university page থেকে তৈরি।',
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [PL_UDSC_WORK_STUDENT, PL_MOS_WORK_WITHOUT_PERMIT, PL_NAWA_BANACH],
      {
        kind: 'guidance',
        list: [
          b('Assuming a short-stay Schengen "C"-type visa lets you study in Poland — you need the long-term national "D"-type visa instead.', 'ধরে নেওয়া যে একটি short-stay Schengen "C"-type visa Poland-এ পড়ার অনুমতি দেয় — এর বদলে আপনার দীর্ঘমেয়াদী national "D"-type visa লাগে।'),
          b('Assuming any full-time student can work without a work permit, with no conditions — current rules (from 2025–2026) condition this on your university being approved by, or not prohibited by, the Ministry of Interior for admitting foreigners.', 'ধরে নেওয়া যে কোনো শর্ত ছাড়া কোনো full-time student work permit ছাড়াই কাজ করতে পারে — বর্তমান নিয়ম (2025–2026 থেকে) এটা শর্ত করে যে আপনার university Ministry of Interior-এর approved, বা নিষিদ্ধ না হওয়া, হতে হবে।'),
          b('Assuming NAWA’s Banach NAWA Programme covers Bangladesh because it funds many developing countries broadly — the Programme names its 36 eligible countries exhaustively, and Bangladesh was not found among them.', 'ধরে নেওয়া যে NAWA-র Banach NAWA Programme Bangladesh কভার করে কারণ এটা বিস্তৃতভাবে অনেক developing country-র fund দেয় — Programme তার 36টি যোগ্য দেশ সম্পূর্ণভাবে নাম দেয়, আর তাদের মধ্যে Bangladesh পাওয়া যায়নি।'),
          b('Forgetting to apply for the temporary residence permit before your visa expires — it must be filed while you are still legally resident under the visa.', 'Visa-র মেয়াদ শেষ হওয়ার আগে temporary residence permit-এর আবেদন করতে ভুলে যাওয়া — visa-র অধীনে আইনগতভাবে থাকতে থাকতেই এটা জমা দিতে হবে।'),
          b('Assuming all Polish public universities charge the same tuition — each institution sets its own fee per programme in its own Rector’s ordinance.', 'ধরে নেওয়া যে সব Polish public university একই tuition নেয় — প্রতিটি institution নিজের Rector-এর ordinance-এ প্রতি programme অনুযায়ী নিজস্ব fee ঠিক করে।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b('What do you need to study a Bachelor’s in Poland from Bangladesh?', 'Bangladesh থেকে Poland-এ Bachelor\'s পড়তে কী কী লাগে?'), [b('A recognised secondary-school leaving certificate, an offer from a Polish institution, English proficiency where required, and the full national ("D"-type) visa plus temporary-residence-permit process.', 'একটি স্বীকৃত secondary-school leaving certificate, একটি Polish institution-এর offer, প্রয়োজনে English proficiency, আর পূর্ণ national ("D"-type) visa সঙ্গে temporary-residence-permit process।')], [PL_STUDY_GOV_VISA], { status: 'partly-verified' }),
    qa('hsc', b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'), [b('Not verified yet: a single, nationwide HSC-to-"matura" equivalence formula applicable at every Polish institution was not found on an official page for this guide — some institutions may require a preparatory year — confirm directly with your chosen institution.', 'এখনো যাচাই হয়নি: প্রতিটি Polish institution-এ প্রযোজ্য একটি একক, জাতীয় HSC-থেকে-"matura" সমতুল্যতা formula এই guide-এর জন্য কোনো official page-এ পাওয়া যায়নি — কিছু institution একটি preparatory year চাইতে পারে — সরাসরি আপনার বাছা institution-এর সাথে নিশ্চিত করুন।')], [PL_STUDY_GOV_VISA], { status: 'not-verified' }),
    qa('cost', b('How much does it cost to study in Poland?', 'Poland-এ পড়াশোনার খরচ কত?'), [b('Tuition is set per institution and per programme; Warsaw University of Technology’s own published non-EU fees range roughly EUR 2,340–7,090/year, and the University of Warsaw’s own 2026/2027 schedule lists programmes from about EUR 2,300–4,900/year.', 'Tuition প্রতি institution আর programme অনুযায়ী ঠিক হয়; Warsaw University of Technology-র নিজের প্রকাশিত non-EU fee প্রায় EUR 2,340–7,090/বছর, আর University of Warsaw-র নিজের 2026/2027 schedule প্রায় EUR 2,300–4,900/বছরের programme তালিকাভুক্ত করে।')], [PL_WUT_BSC_OFFER, PL_UW_FEES_2026], { status: 'verified' }),
    qa('ielts', b('How much IELTS do you need for Poland?', 'Poland-এ IELTS কত লাগে?'), [b('Not a single nationwide minimum; Warsaw University of Technology’s own glossary sets IELTS Academic 6.0 at B2 level, while AGH University of Krakow’s own documents page accepts IELTS Academic 5.5 — always check your own institution and programme.', 'একক জাতীয় ন্যূনতম না; Warsaw University of Technology-র নিজের glossary B2 level-এ IELTS Academic 6.0 ঠিক করে, যখন AGH University of Krakow-র নিজের documents page IELTS Academic 5.5 গ্রহণ করে — সবসময় আপনার নিজের institution আর programme চেক করুন।')], [PL_WUT_ENGLISH, PL_AGH_FEES], { status: 'partly-verified' }),
    qa('visa', b('What do you need for the visa and residence permit?', 'Visa আর residence permit-এর জন্য কী কী লাগে?'), [b('A national ("D"-type) visa from the Embassy of the Republic of Poland in New Delhi, with travel medical insurance of at least EUR 30,000, proof of at least 1,086 PLN for your first 2 months, and your admission certificate — then, after arrival, a temporary residence permit from the local Voivodeship Office before the visa expires.', 'Embassy of the Republic of Poland in New Delhi থেকে একটি national ("D"-type) visa, অন্তত EUR 30,000-এর travel medical insurance সহ, প্রথম 2 মাসের জন্য অন্তত 1,086 PLN-এর proof, আর আপনার admission certificate — তারপর, পৌঁছানোর পর, visa-র মেয়াদ শেষ হওয়ার আগে স্থানীয় Voivodeship Office থেকে একটি temporary residence permit।')], [PL_MFA_INDIA_D_VISA, PL_STUDY_GOV_VISA]),
    qa('work', b('Can you work while studying in Poland?', 'Poland-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b('You may work without a separate work permit while on a study visa or residence permit for studies, but current rules condition this on being a full-time student at a university approved by, or not prohibited by, the Ministry of Interior for admitting foreigners — public universities are not subject to that approval requirement. No nationwide weekly-hours cap for this exemption was found.', 'আপনি একটি study visa বা পড়াশোনার জন্য residence permit-এ থাকলে আলাদা work permit ছাড়াই কাজ করতে পারেন, কিন্তু বর্তমান নিয়ম এটা শর্ত করে যে আপনাকে Ministry of Interior-এর approved, বা নিষিদ্ধ না হওয়া, একটি university-তে full-time student হতে হবে — public university সেই approval শর্তের অধীনে পড়ে না। এই exemption-এর জন্য কোনো জাতীয় সাপ্তাহিক-ঘণ্টা সীমা পাওয়া যায়নি।')], [PL_UDSC_WORK_STUDENT, PL_MOS_WORK_WITHOUT_PERMIT], { status: 'partly-verified' }),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('Not verified yet that Bangladesh is eligible for NAWA’s own Banach NAWA Programme. The Programme names "countries covered by Polish Aid" exhaustively (36 countries), and Bangladesh was not found among them. No Bangladesh-specific, full-degree Polish government scholarship was found.', 'NAWA-র নিজের Banach NAWA Programme-এর জন্য Bangladesh যোগ্য কিনা তা এখনো যাচাই হয়নি। Programme "countries covered by Polish Aid" সম্পূর্ণভাবে নাম দেয় (36টি দেশ), আর তাদের মধ্যে Bangladesh পাওয়া যায়নি। কোনো Bangladesh-specific, full-degree Polish government scholarship পাওয়া যায়নি।')], [PL_NAWA_BANACH, PL_STUDY_GOV_BANACH], { status: 'not-verified' }),
    qa('after', b('Can you stay in Poland after graduating?', 'পড়া শেষে Poland-এ থাকা যায়?'), [b('Yes: graduates of full-time Polish university studies are exempt from the work-permit requirement, and may apply once, for 9 months, for a temporary residence permit to seek employment or start a business — but a residence permit is still required, applied for directly after graduation with the Voivodeship Governor.', 'হ্যাঁ: Polish full-time university studies-এর গ্র্যাজুয়েটরা work-permit শর্ত থেকে exempt, আর একবার, 9 মাসের জন্য, কাজ খোঁজা বা ব্যবসা শুরু করার জন্য একটি temporary residence permit-এর আবেদন করতে পারেন — কিন্তু একটি residence permit এখনও লাগে, গ্র্যাজুয়েশনের পরপরই Voivodeship Governor-এর কাছে আবেদন করতে হয়।')], [PL_UDSC_GRADUATE_PERMIT]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('At least 1,086 PLN for the first 2 months (or a scholarship-award letter), per Poland’s own nationwide regulation, plus a smaller return-trip amount that varies by region of departure — the exact Bangladesh-specific return-trip figure was not found and should be confirmed with the Embassy in New Delhi.', 'প্রথম 2 মাসের জন্য অন্তত 1,086 PLN (বা একটি scholarship-award letter), Poland-এর নিজের জাতীয় regulation অনুযায়ী, সঙ্গে ফিরতি-যাত্রার জন্য একটি ছোট পরিমাণ যা যাওয়ার অঞ্চল অনুযায়ী আলাদা — সঠিক Bangladesh-specific ফিরতি-যাত্রার সংখ্যা পাওয়া যায়নি আর New Delhi-র Embassy-র সাথে নিশ্চিত করা উচিত।')], [PL_MFA_ARMENIA_FUNDS], { status: 'partly-verified' }),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Passport, the e-Konsulat and VFS national-visa application forms, admission certificate, travel medical insurance (EUR 30,000+), proof of funds, and (after arrival) the temporary residence permit application at the Voivodeship Office.', 'Passport, e-Konsulat আর VFS national-visa application form, admission certificate, travel medical insurance (EUR 30,000+), funds-এর proof, আর (পৌঁছানোর পর) Voivodeship Office-এ temporary residence permit application।')], [PL_MFA_INDIA_D_VISA]),
    qa('masters', b('What do you need for a Master’s?', 'Master\'s-এ কী লাগে?'), [b('A relevant Bachelor’s degree, applied for directly through each institution’s own graduate-admissions process. NAWA’s Banach Programme funds Master’s study for citizens of its own 36 named countries, which do not include Bangladesh.', 'একটি সম্পর্কিত Bachelor\'s degree, প্রতিটি institution-এর নিজের graduate-admissions process-এর মাধ্যমে সরাসরি আবেদন করতে হয়। NAWA-র Banach Programme তার নিজের 36টি নামযুক্ত দেশের নাগরিকদের জন্য Master\'s পড়াশোনার fund দেয়, যাতে Bangladesh নেই।')], [PL_NAWA_BANACH]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Not verified yet as general nationwide rules: usually a relevant Master’s degree and admission to a doctoral school, whose exact requirements are set at university level, not nationally. Doctoral students are exempt from the work-permit requirement.', 'সাধারণ জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: সাধারণত একটি সম্পর্কিত Master\'s degree আর একটি doctoral school-এ ভর্তি, যার সঠিক শর্ত জাতীয়ভাবে না, university level-এ ঠিক হয়। Doctoral student-রা work-permit শর্ত থেকে exempt।')], [PL_UDSC_WORK_STUDENT], { status: 'not-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — AGH University of Krakow, Adam Mickiewicz University (Poznań), Jagiellonian University, the University of Warsaw and Warsaw University of Technology — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — AGH University of Krakow, Adam Mickiewicz University (Poznań), Jagiellonian University, University of Warsaw, আর Warsaw University of Technology — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [PL_AMU_TUITION]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: the Embassy of the Republic of Poland in New Delhi is Poland’s own mission of record for Bangladeshi visa applicants (there is no Polish embassy in Dhaka). Bangladesh is NOT on NAWA’s own Banach NAWA Programme eligible-country list, and the exact return-trip funds figure and the exact non-EU tuition fee for every Polish programme specific to Bangladesh were NOT found on the official pages read for this guide — these are stated plainly as officially excluded or not confirmed, rather than guessed.', 'Bangladesh-এর জন্য যাচাই করা: Embassy of the Republic of Poland in New Delhi Bangladeshi visa আবেদনকারীদের জন্য Poland-এর নিজের mission of record (Dhaka-তে কোনো Polish embassy নেই)। Bangladesh NAWA-র নিজের Banach NAWA Programme যোগ্য-দেশের তালিকায় নেই, আর Bangladesh-এর জন্য বিশেষভাবে প্রযোজ্য সঠিক ফিরতি-যাত্রার funds-এর সংখ্যা আর প্রতিটি Polish programme-এর সঠিক non-EU tuition fee এই guide-এর জন্য পড়া official page-এ পাওয়া যায়নি — এগুলো অনুমান না করে সরাসরি officially বাদ বা নিশ্চিত না বলা হয়েছে।'),
    ], [PL_MFA_INDIA_D_VISA, PL_STUDY_GOV_BANACH], { status: 'verified' }),
  ],
  life: [
    qa('arrival', b('What happens when you arrive?', 'পৌঁছানোর পর কী হয়?'), [b('Study.gov.pl’s own page says you must apply for a temporary residence permit at the local Voivodeship Office before your "D"-type visa expires, submitting an application form, photos, documents proving your identity, address and purpose of stay (your school’s own certificate), health insurance, and proof of sufficient funds; the total procedure costs 390 PLN. The Voivodeship Office issues a Temporary Residence Card, which together with your passport lets you cross the Polish border as many times as needed while it is valid.', 'Study.gov.pl-এর নিজের page বলে আপনার "D"-type visa-র মেয়াদ শেষ হওয়ার আগে স্থানীয় Voivodeship Office-এ একটি temporary residence permit-এর জন্য আবেদন করতে হবে, একটি application form, ছবি, পরিচয়, ঠিকানা, আর থাকার উদ্দেশ্য (আপনার school-এর নিজের certificate) প্রমাণকারী document, health insurance, আর পর্যাপ্ত funds-এর proof জমা দিয়ে; মোট procedure-এর খরচ 390 PLN। Voivodeship Office একটি Temporary Residence Card ইস্যু করে, যা আপনার passport-এর সঙ্গে, valid থাকা অবস্থায় যতবার প্রয়োজন Polish সীমান্ত পার হওয়ার অনুমতি দেয়।')], [PL_STUDY_GOV_VISA]),
  ],
  documents: PL_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'funds-to-show', kind: 'fact', status: 'partly-verified', value: { min: 1086, max: 1086, unit: 'PLN for the first 2 months (plus a smaller, region-varying return-trip amount)', text: b('At least 1,086 PLN for the first 2 months of the planned stay, or a scholarship-award letter.', 'পরিকল্পিত থাকার প্রথম 2 মাসের জন্য অন্তত 1,086 PLN, বা একটি scholarship-award letter।') }, source: PL_MFA_ARMENIA_FUNDS },
    { id: 'work-during-study', kind: 'fact', status: 'partly-verified', value: { min: 0, max: 0, unit: 'no official nationwide hours cap found; work-permit exemption conditioned on university approval status', text: b('Work without a separate work permit is allowed while on a study visa/residence permit, conditioned on your university being approved (or not prohibited) by the Ministry of Interior; no hours cap was found.', 'একটি study visa/residence permit-এ থাকা অবস্থায় আলাদা work permit ছাড়াই কাজ করা অনুমোদিত, এই শর্তে যে আপনার university Ministry of Interior-এর approved (বা নিষিদ্ধ না); কোনো ঘণ্টা সীমা পাওয়া যায়নি।') }, source: PL_MOS_WORK_WITHOUT_PERMIT },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { min: 9, max: 9, unit: 'months (temporary residence permit to seek employment/start a business, granted once)', text: b('A one-off, 9-month temporary residence permit to seek employment or start a business, open to graduates of full-time Polish university studies of any nationality.', 'একবারের, 9-মাসের temporary residence permit কাজ খোঁজা বা ব্যবসা শুরু করার জন্য, যেকোনো nationality-র Polish full-time university studies-এর গ্র্যাজুয়েটদের জন্য খোলা।') }, source: PL_UDSC_GRADUATE_PERMIT },
    { id: 'public-tuition', kind: 'estimate', status: 'verified', value: { min: 2340, max: 7090, unit: 'EUR/year (Warsaw University of Technology’s own published non-EU range; other public universities set their own)', text: b('Roughly EUR 2,340–7,090/year at Warsaw University of Technology, depending on the programme — an example, not a nationwide figure.', 'Warsaw University of Technology-তে প্রায় EUR 2,340–7,090/বছর, programme অনুযায়ী — একটি উদাহরণ, জাতীয় সংখ্যা না।') }, source: PL_WUT_BSC_OFFER },
  ],
};

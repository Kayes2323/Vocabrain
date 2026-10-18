import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  AT_BMFWF_TUITION,
  AT_JKU_DEADLINES,
  AT_MIGRATION_GRADUATES,
  AT_MIGRATION_PERMANENT,
  AT_MIGRATION_RWR_PLUS,
  AT_MIGRATION_STUDENT_GUIDE,
  AT_OEAD_ERNST_MACH,
  AT_OEAD_GRANTS_OVERVIEW,
  AT_OEAD_PROGRAMMES_A_TO_Z,
  AT_OEAD_RESIDENCE_STUDENT,
  AT_READ,
  AT_TUGRAZ_ADMISSION_PERIODS,
  AT_TUWIEN,
  AT_TUWIEN_MASTERS,
  AT_UIBK_THIRD_COUNTRIES,
  AT_UNIVIE,
} from './at-sources';

/**
 * Austria reading guide, researched on its own from Austrian official
 * sources (the Migration Platform of the Austrian Federal Government —
 * migration.gv.at, run jointly by BMI/BMEIA/BMASGPK — for the Residence
 * Permit – Student, work rights and post-study routes; the Federal
 * Ministry of Women, Science and Research's own tuition-fee page,
 * bmfwf.gv.at; OeAD-GmbH's own site, oead.at, Austria's Agency for
 * Education and Internationalisation, for the in-country residence-permit
 * checklist and scholarships; and university pages). Nothing is taken
 * from another country's guide. Austria IS an EU/EEA and Schengen member,
 * unlike Switzerland — but a Bangladeshi applicant is still a
 * third-country national under Austrian immigration law, so Austria's
 * national rules (not an EU-wide rule borrowed from another member
 * state's guide) apply throughout. Amounts stay in EUR, the source's own
 * currency, and are never converted. It covers Bachelor's, Master's and
 * PhD study for Bangladeshi (non-EU/EEA) students.
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
  'The University of Vienna, TU Wien, the University of Innsbruck, TU Graz and JKU Linz are not identical: each sets its own admission requirements, application windows and (for some programmes) entrance procedures. Tuition itself is set by national law for all Austrian public universities, but always check the exact programme on the institution’s own admissions page.',
  'University of Vienna, TU Wien, University of Innsbruck, TU Graz, আর JKU Linz একরকম না: প্রতিটি নিজের ভর্তির শর্ত, application window, আর (কিছু programme-এ) entrance procedure ঠিক করে। Tuition জাতীয় আইন দিয়ে সব Austrian public university-র জন্য একভাবে ঠিক হয়, কিন্তু সবসময় প্রতিষ্ঠানের নিজের admissions page-এ সঠিক programme দেখে নিন।',
);

const EU_NOTE = b(
  'Austria is an EU/EEA member and a full Schengen member — but Bangladesh is not an EU/EEA country, so a Bangladeshi applicant is still a "third-country national" under Austrian immigration law and needs Austria’s own Residence Permit – Student (Aufenthaltsbewilligung – Student), not a simplified EU-citizen process.',
  'Austria EU/EEA-র সদস্য আর একটি পূর্ণ Schengen সদস্য — কিন্তু Bangladesh EU/EEA দেশ না, তাই একজন Bangladeshi আবেদনকারী Austrian immigration আইনের অধীনে এখনো একজন "third-country national", আর তার Austria-র নিজের Residence Permit – Student (Aufenthaltsbewilligung – Student) লাগে, কোনো সহজ EU-নাগরিক process না।',
);

// ------------------------------------------------------------------ shared answers

const visaRequired = (id: string) =>
  qa(
    id,
    b('Does a Bangladeshi student need a visa/residence permit to study in Austria?', 'Bangladesh-এর student-দের Austria-তে পড়তে visa/residence permit লাগে কি?'),
    [
      b(
        'Yes. Third-country nationals need a residence permit for any stay over six months — for studies, this is the "Residence Permit – Student" (Aufenthaltsbewilligung – Student). Because Bangladesh is not on Austria’s visa-free list, Bangladeshi applicants who have not yet passed any required entrance examination must submit this application in person at the competent Austrian representative authority (embassy/consulate) in their country of residence, before travelling to Austria, per Migration.gv.at’s own guide for foreign students and OeAD’s own residence-permit checklist.',
        'হ্যাঁ। 6 মাসের বেশি থাকার জন্য third-country national-দের একটি residence permit লাগে — পড়ার জন্য, এটা "Residence Permit – Student" (Aufenthaltsbewilligung – Student)। Bangladesh Austria-র visa-free তালিকায় না থাকায়, যে Bangladeshi আবেদনকারীরা এখনো কোনো প্রয়োজনীয় entrance examination পাস করেননি তাদের Austria-তে যাওয়ার আগে, নিজের বসবাসের দেশে দায়িত্বে থাকা Austrian representative authority (embassy/consulate)-এ ব্যক্তিগতভাবে এই application জমা দিতে হয়, Migration.gv.at-এর নিজের foreign-student guide আর OeAD-এর নিজের residence-permit checklist অনুযায়ী।',
      ),
      EU_NOTE,
    ],
    [AT_MIGRATION_STUDENT_GUIDE, AT_OEAD_RESIDENCE_STUDENT],
    { allDegrees: true },
  );

const visaProcess = (id: string) =>
  qa(
    id,
    b('How does the application work, and how long does it take?', 'Application কীভাবে কাজ করে, আর কত সময় লাগে?'),
    [
      b(
        'OeAD’s own checklist states the decision period for the "Residence Permit – Student" is 90 days, extended by a further 90 days if additional documents need to be submitted — so plan for up to roughly six months in the slower case. Applications should be submitted in person, ideally at least three months before the planned entry, since appointment booking itself can take time. OeAD’s own page states an application fee of EUR 218 applies, paid in full on submission and not refunded even if the application is refused or withdrawn. If approved, documents are collected in person; most applicants then receive the "Residence Permit – Student" card itself after arrival, once registered and (where applicable) insured in Austria.',
        'OeAD-এর নিজের checklist বলে "Residence Permit – Student"-এর সিদ্ধান্তের সময়কাল 90 দিন, আরো documents জমা দিতে হলে আরো 90 দিন বাড়ে — তাই ধীর ক্ষেত্রে প্রায় ছয় মাস পর্যন্ত সময় রাখুন। Application ব্যক্তিগতভাবে জমা দেওয়া উচিত, আদর্শভাবে পরিকল্পিত প্রবেশের অন্তত তিন মাস আগে, কারণ appointment বুক করতেই সময় লাগতে পারে। OeAD-এর নিজের page বলে একটি EUR 218 application fee প্রযোজ্য, জমা দেওয়ার সময় সম্পূর্ণ পরিশোধ করতে হয় আর application প্রত্যাখ্যান বা প্রত্যাহার হলেও ফেরত দেওয়া হয় না। অনুমোদিত হলে, documents ব্যক্তিগতভাবে সংগ্রহ করতে হয়; অধিকাংশ আবেদনকারী তারপর Austria-তে পৌঁছানোর পর, registered আর (প্রযোজ্য ক্ষেত্রে) insured হয়ে, আসল "Residence Permit – Student" card পান।',
      ),
    ],
    [AT_OEAD_RESIDENCE_STUDENT],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'Not verified yet as a single, itemized figure. Migration.gv.at’s general requirements list "sufficient means of subsistence" among the conditions for a residence permit, but the pages read for this guide did not state one fixed minimum amount for students specifically — OeAD’s own checklist similarly points to proof of funds without naming a figure. Students should confirm the current minimum directly with the Austrian representative authority handling their application, since this figure is reviewed periodically and tied to Austria’s minimum-subsistence rate.',
        'একটি একক, বিস্তারিত সংখ্যা হিসেবে এখানে এখনো যাচাই হয়নি। Migration.gv.at-এর সাধারণ শর্তের তালিকায় residence permit-এর শর্তের মধ্যে "sufficient means of subsistence" আছে, কিন্তু এই guide-এর জন্য পড়া page-এ student-দের জন্য বিশেষভাবে একটি নির্দিষ্ট ন্যূনতম পরিমাণ বলা হয়নি — OeAD-এর নিজের checklist-ও একটি সংখ্যার নাম না দিয়ে funds-এর প্রমাণের দিকে নির্দেশ করে। Student-দের তাদের application পরিচালনাকারী Austrian representative authority-র সাথে সরাসরি বর্তমান ন্যূনতম নিশ্চিত করা উচিত, কারণ এই সংখ্যা পর্যায়ক্রমে পুনর্বিবেচনা হয় আর Austria-র ন্যূনতম-subsistence rate-এর সাথে যুক্ত।',
      ),
    ],
    [AT_MIGRATION_PERMANENT, AT_OEAD_RESIDENCE_STUDENT],
    { allDegrees: true, status: 'not-verified' },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('Is health insurance compulsory?', 'Health insurance কি বাধ্যতামূলক?'),
    [
      b(
        'Yes, in two stages. OeAD’s own page states a travel health insurance (valid in Austria, cover well over EUR 30,000 including a guarantee to cover possible repatriation) is required to enter Austria. After entry and enrolment, degree-programme students at Austrian universities and universities of applied sciences meet the "health insurance covering all risks" requirement by taking out student self-insurance ("Studierendenselbstversicherung") with the Österreichische Gesundheitskasse (ÖGK) — the monthly premium is EUR 78.84 as of 2026, per OeAD’s own page. Bangladesh is not among the countries with a social-insurance agreement with Austria that OeAD lists (Bosnia and Herzegovina, North Macedonia, Montenegro, Serbia and Türkiye), so Bangladeshi students do not have that particular shortcut and must arrange both the entry travel insurance and the post-entry ÖGK student self-insurance (or an equivalent policy meeting the same conditions).',
        'হ্যাঁ, দুই পর্যায়ে। OeAD-এর নিজের page বলে Austria-তে প্রবেশের জন্য একটি travel health insurance (Austria-তে valid, EUR 30,000-র বেশি কভার সহ, সম্ভাব্য repatriation কভার করার guarantee সহ) প্রয়োজন। প্রবেশ আর ভর্তির পর, Austrian university আর university of applied sciences-এর degree-programme student-রা Österreichische Gesundheitskasse (ÖGK)-এর সাথে student self-insurance ("Studierendenselbstversicherung") নিয়ে "health insurance covering all risks" শর্ত পূরণ করেন — OeAD-এর নিজের page অনুযায়ী 2026 সালে মাসিক প্রিমিয়াম EUR 78.84। OeAD-এর তালিকাভুক্ত Austria-র সাথে social-insurance agreement থাকা দেশের (Bosnia and Herzegovina, North Macedonia, Montenegro, Serbia, আর Türkiye) মধ্যে Bangladesh নেই, তাই Bangladeshi student-দের এই বিশেষ shortcut নেই আর তাদের entry travel insurance আর post-entry ÖGK student self-insurance (বা একই শর্ত পূরণ করা সমতুল্য policy) দুটোই ব্যবস্থা করতে হয়।',
      ),
    ],
    [AT_OEAD_RESIDENCE_STUDENT],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Austria, and how many hours?', 'Austria-তে পড়ার পাশাপাশি কাজ করা যায় কি, আর কত ঘণ্টা?'),
    [
      b(
        'Yes, with a work permit. OeAD’s own page states that holders of a "Residence Permit – Student" are able to get a work permit (Beschäftigungsbewilligung, applied for by the employer at the Public Employment Service/AMS) for working up to 20 hours a week — this includes small-scale ("geringfügige") employment, and this permit is granted without a labour-market check. Migration.gv.at’s own page confirms that third-country nationals holding a residence permit are, in principle, permitted gainful employment during their studies, subject to this work-permit process.',
        'হ্যাঁ, একটি work permit দিয়ে। OeAD-এর নিজের page বলে "Residence Permit – Student" হোল্ডাররা সপ্তাহে সর্বোচ্চ 20 ঘণ্টা কাজের জন্য একটি work permit (Beschäftigungsbewilligung, employer Public Employment Service/AMS-এ আবেদন করে) পেতে পারেন — এর মধ্যে small-scale ("geringfügige") employment-ও আছে, আর এই permit labour-market check ছাড়াই দেওয়া হয়। Migration.gv.at-এর নিজের page নিশ্চিত করে যে residence permit থাকা third-country national-রা, মূলত, তাদের পড়ার সময় gainful employment-এর অনুমতি পান, এই work-permit process-এর অধীনে।',
      ),
    ],
    [AT_OEAD_RESIDENCE_STUDENT, AT_MIGRATION_STUDENT_GUIDE],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Austria to look for work after graduating?', 'পড়া শেষে কাজ খোঁজার জন্য Austria-তে থাকা যায়?'),
    [
      b(
        'Yes, through a renewal of the same permit, followed by a route into a work-based card. Migration.gv.at’s own page states that a third-country national who has successfully completed their studies (or compulsory post-study training) may renew their "Residence Permit – Student" for twelve months for the purpose of searching for employment or starting a business, provided the general settlement-and-residence requirements (sufficient means of subsistence, health insurance, etc.) are met. If, within those twelve months, the graduate receives a job offer matching their qualification level at the locally customary gross minimum salary for comparable Austrian graduates, they can apply for a Red-White-Red Card without a labour-market test. After being employed under the eligibility criteria for at least 21 of the preceding 24 months, a holder can apply for a Red-White-Red Card plus with unlimited labour-market access.',
        'হ্যাঁ, একই permit-এর renewal-এর মাধ্যমে, তারপর একটি work-based card-এর route দিয়ে। Migration.gv.at-এর নিজের page বলে যে একজন third-country national যিনি সফলভাবে তার পড়া (বা বাধ্যতামূলক পড়া-পরবর্তী training) শেষ করেছেন তিনি চাকরি খোঁজার বা ব্যবসা শুরু করার উদ্দেশ্যে তার "Residence Permit – Student" বারো মাসের জন্য renew করতে পারেন, যদি সাধারণ settlement-and-residence শর্ত (যথেষ্ট subsistence, health insurance, ইত্যাদি) পূরণ হয়। সেই বারো মাসের মধ্যে, গ্র্যাজুয়েট তার যোগ্যতার স্তরের সাথে মেলে এমন একটি চাকরির offer পেলে, তুলনামূলক Austrian গ্র্যাজুয়েটদের জন্য স্থানীয়ভাবে প্রচলিত gross minimum salary-তে, তারা labour-market test ছাড়াই একটি Red-White-Red Card-এর জন্য আবেদন করতে পারেন। আগের 24 মাসের মধ্যে অন্তত 21 মাস যোগ্যতার শর্ত মেনে employed থাকার পর, একজন হোল্ডার unlimited labour-market access সহ একটি Red-White-Red Card plus-এর জন্য আবেদন করতে পারেন।',
      ),
    ],
    [AT_MIGRATION_GRADUATES, AT_MIGRATION_RWR_PLUS],
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'Austria does not run a flagship full-degree government scholarship for Bangladeshi students comparable to Hungary’s Stipendium Hungaricum. OeAD’s own "scholarships and funding programmes from A to Z" and "Overview: grants and scholarships" pages, read for this guide, show the Ernst Mach Grant family as Austria’s broad, worldwide/non-European offer: the Ernst Mach Grant worldwide funds a 1–9 month research project for young researchers "from all disciplines and countries (except Austria)", and the Ernst Mach Grant for Fachhochschule study funds a 4–10 month study period for undergraduates/graduates "from non-European universities" — both cover Bangladesh by their broad wording, but neither funds a complete Bachelor’s, Master’s or PhD degree, and neither page states its monthly stipend amount. No Bangladesh-specific, full-degree scholarship was found on the official pages read for this guide, so none is shown here as one.',
        'Hungary-র Stipendium Hungaricum-এর সমতুল্য Bangladeshi student-দের জন্য Austria কোনো flagship full-degree government scholarship চালায় না। OeAD-এর নিজের "scholarships and funding programmes from A to Z" আর "Overview: grants and scholarships" page, এই guide-এর জন্য পড়া, Ernst Mach Grant family-কে Austria-র বিস্তৃত, worldwide/non-European offer হিসেবে দেখায়: Ernst Mach Grant worldwide "সব discipline আর দেশ (Austria ছাড়া)"-র young researcher-দের জন্য 1–9 মাসের একটি research project funds করে, আর Fachhochschule study-র জন্য Ernst Mach Grant "non-European university"-র undergraduate/graduate-দের জন্য 4–10 মাসের একটি study period funds করে — দুটোই তাদের বিস্তৃত বাক্য দিয়ে Bangladesh-কে কভার করে, কিন্তু কোনোটাই একটি সম্পূর্ণ Bachelor\'s, Master\'s, বা PhD degree funds করে না, আর কোনো page-এ মাসিক stipend-এর পরিমাণ বলা নেই। এই guide-এর জন্য পড়া official page-এ কোনো Bangladesh-specific, full-degree scholarship পাওয়া যায়নি, তাই এখানে একটিও দেখানো হয়নি।',
      ),
    ],
    [AT_OEAD_PROGRAMMES_A_TO_Z, AT_OEAD_GRANTS_OVERVIEW, AT_OEAD_ERNST_MACH],
    { status: 'partly-verified', kind: 'guidance' },
  );

// ------------------------------------------------------------------ documents

const AUTHORITY = b('The competent Austrian representative authority (embassy or consulate with power to issue visas) in your country of residence.', 'আপনার বসবাসের দেশে দায়িত্বে থাকা Austrian representative authority (visa ইস্যু করার ক্ষমতা আছে এমন embassy বা consulate)।');

export const AT_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Valid travel document (passport)', 'Valid travel document (passport, মেয়াদসম্পন্ন)'),
    why: b('OeAD’s own checklist lists a valid travel document among the required documents for the Residence Permit – Student application and throughout your stay.', 'OeAD-এর নিজের checklist Residence Permit – Student application আর থাকার পুরো সময়ের জন্য প্রয়োজনীয় document-এর মধ্যে একটি valid travel document তালিকাভুক্ত করে।'),
    who: AUTHORITY,
    when: b('From the application through your residence in Austria.', 'Application থেকে Austria-তে থাকার পুরো সময়।'),
    where: b('Submitted in person at the Austrian representative authority before entry.', 'প্রবেশের আগে, Austrian representative authority-এ ব্যক্তিগতভাবে জমা দিতে হয়।'),
    prepare: b('Keep it valid well beyond your intended stay, since the residence permit’s validity cannot exceed your passport’s.', 'প্রত্যাশিত থাকার সময়ের চেয়ে বেশ বেশি valid রাখুন, কারণ residence permit-এর মেয়াদ আপনার passport-এর মেয়াদকে ছাড়াতে পারে না।'),
    groups: ['general', 'visa'],
    sources: [AT_OEAD_RESIDENCE_STUDENT],
  },
  {
    id: 'admission',
    name: b('Confirmation of enrolment or admission', 'ভর্তি বা enrolment-এর confirmation'),
    why: b('Proof of the purpose of residence: your admission letter or confirmation of enrolment from the Austrian university or university of applied sciences you are joining.', 'থাকার উদ্দেশ্যের প্রমাণ: যে Austrian university বা university of applied sciences-এ যোগ দিচ্ছেন তার থেকে আপনার admission letter বা enrolment confirmation।'),
    who: b('The Austrian institution you applied to.', 'যে Austrian institution-এ আবেদন করছেন।'),
    when: b('After admission, before the residence-permit application.', 'ভর্তির পর, residence-permit application-এর আগে।'),
    where: b('Submitted with your application at the Austrian representative authority.', 'Austrian representative authority-এ আপনার application-এর সঙ্গে জমা দিতে হয়।'),
    prepare: b('Each institution sets its own admission process and timeline, so confirm with your chosen institution how and when it issues this document.', 'প্রতিটি institution নিজস্ব ভর্তি process আর timeline ঠিক করে, তাই এই document কীভাবে আর কখন ইস্যু করে তা আপনার বাছা institution-এর সাথে নিশ্চিত করুন।'),
    groups: ['general', 'program', 'visa'],
    sources: [AT_OEAD_RESIDENCE_STUDENT],
  },
  {
    id: 'travel-insurance',
    name: b('Travel health insurance (for entry)', 'Travel health insurance (প্রবেশের জন্য)'),
    why: b('OeAD’s own page requires a travel health insurance, valid in Austria, with cover well over EUR 30,000 including a guarantee to cover possible repatriation, to enter Austria — this is only a bridge until a "health insurance covering all risks" can be taken out after entry.', 'OeAD-এর নিজের page Austria-তে প্রবেশের জন্য একটি travel health insurance চায়, Austria-তে valid, EUR 30,000-র বেশি কভার সহ, সম্ভাব্য repatriation কভার করার guarantee সহ — এটা প্রবেশের পর একটি "health insurance covering all risks" নেওয়ার আগ পর্যন্ত কেবল একটি সেতু।'),
    who: b('A travel/health insurer whose policy meets the stated conditions.', 'একটি travel/health insurer যার policy বলা শর্ত পূরণ করে।'),
    when: b('Valid from before entry until you arrange the ÖGK student self-insurance.', 'প্রবেশের আগে থেকে ÖGK student self-insurance ব্যবস্থা না করা পর্যন্ত valid।'),
    where: b('Shown with the application; arranged before travelling to Austria.', 'Application-এর সঙ্গে দেখাতে হয়; Austria-তে যাওয়ার আগে ব্যবস্থা করতে হয়।'),
    prepare: b('Bangladesh is not among the countries with a social-insurance agreement that OeAD lists, so this travel policy is not optional for Bangladeshi applicants.', 'OeAD-এর তালিকাভুক্ত social-insurance agreement থাকা দেশের মধ্যে Bangladesh নেই, তাই Bangladeshi আবেদনকারীদের জন্য এই travel policy ঐচ্ছিক না।'),
    groups: ['visa', 'bangladesh'],
    sources: [AT_OEAD_RESIDENCE_STUDENT],
  },
  {
    id: 'funds',
    name: b('Proof of sufficient means of subsistence', 'যথেষ্ট subsistence-র প্রমাণ'),
    why: b('A general requirement for Austrian residence permits, per Migration.gv.at, though no single itemized minimum figure for students was found on the pages read for this guide.', 'Migration.gv.at অনুযায়ী Austrian residence permit-এর একটি সাধারণ শর্ত, যদিও এই guide-এর জন্য পড়া page-এ student-দের জন্য একটি একক বিস্তারিত ন্যূনতম সংখ্যা পাওয়া যায়নি।'),
    who: AUTHORITY,
    when: b('With the application, and again at any renewal.', 'Application-এর সঙ্গে, আর যেকোনো renewal-এর সময় আবার।'),
    where: b('Submitted at the Austrian representative authority.', 'Austrian representative authority-এ জমা দিতে হয়।'),
    prepare: b('Confirm the current expected amount directly with the authority handling your application, since this figure is reviewed periodically.', 'আপনার application পরিচালনাকারী authority-র সাথে সরাসরি বর্তমান প্রত্যাশিত পরিমাণ নিশ্চিত করুন, কারণ এই সংখ্যা পর্যায়ক্রমে পুনর্বিবেচনা হয়।'),
    groups: ['visa', 'bangladesh'],
    status: 'not-verified',
    sources: [AT_MIGRATION_PERMANENT, AT_OEAD_RESIDENCE_STUDENT],
  },
  {
    id: 'student-insurance',
    name: b('Health insurance covering all risks (after entry)', 'সব risk কভার করা health insurance (প্রবেশের পর)'),
    why: b('A continuing condition of the residence permit; most degree-programme students meet it with the ÖGK’s student self-insurance ("Studierendenselbstversicherung"), EUR 78.84/month as of 2026 per OeAD’s own page.', 'Residence permit-এর একটি চলমান শর্ত; অধিকাংশ degree-programme student এটা ÖGK-এর student self-insurance ("Studierendenselbstversicherung") দিয়ে পূরণ করে, OeAD-এর নিজের page অনুযায়ী 2026 সালে মাসে EUR 78.84।'),
    who: b('Österreichische Gesundheitskasse (ÖGK), or an equivalent policy meeting the same conditions.', 'Österreichische Gesundheitskasse (ÖGK), বা একই শর্ত পূরণ করা সমতুল্য policy।'),
    when: b('After entry and enrolment, maintained throughout your stay.', 'প্রবেশ আর ভর্তির পর, থাকার পুরো সময় বজায় রাখা।'),
    where: b('Arranged in Austria after arrival; confirmation shown to the residence authority.', 'Austria-তে পৌঁছানোর পর ব্যবস্থা করতে হয়; residence authority-কে confirmation দেখাতে হয়।'),
    prepare: b('You must submit a valid confirmation of continuing university enrolment to the ÖGK by 31 December each year to keep this insurance valid.', 'এই insurance valid রাখার জন্য প্রতি বছর 31 December-এর মধ্যে ÖGK-কে একটি valid continuing university enrolment confirmation জমা দিতে হয়।'),
    groups: ['visa', 'arrival'],
    sources: [AT_OEAD_RESIDENCE_STUDENT],
  },
  {
    id: 'photo',
    name: b('Photograph', 'ছবি'),
    why: b('OeAD’s own checklist requires a recent photograph (passport-style) as part of the residence-permit application.', 'OeAD-এর নিজের checklist residence-permit application-এর অংশ হিসেবে একটি সাম্প্রতিক ছবি (passport-style) চায়।'),
    who: AUTHORITY,
    when: b('With the application.', 'Application-এর সঙ্গে।'),
    where: b('At the Austrian representative authority.', 'Austrian representative authority-এ।'),
    prepare: b('Bring a recent, compliant photo; applications are processed only once complete and the fee is paid.', 'একটি সাম্প্রতিক, উপযুক্ত ছবি সাথে নিয়ে যান; application সম্পূর্ণ হলে আর fee পরিশোধ হলেই তা প্রক্রিয়া করা হয়।'),
    groups: ['general', 'visa'],
    sources: [AT_OEAD_RESIDENCE_STUDENT],
  },
];

// ------------------------------------------------------------------ costs (source's own currency, never converted)

const RESIDENCE_PERMIT_FEE: GuideCost = { id: 'residence-permit-fee', label: b('Residence-permit application fee', 'Residence-permit application fee'), value: b('EUR 218, a non-refundable fee charged for the Residence Permit – Student application, per OeAD’s own checklist.', 'OeAD-এর নিজের checklist অনুযায়ী, Residence Permit – Student application-এর জন্য EUR 218, একটি non-refundable fee।'), amount: { value: 218, currency: 'EUR', period: 'one-time' }, source: AT_OEAD_RESIDENCE_STUDENT };
const TUITION_COST: GuideCost = { id: 'public-university-tuition', label: b('Public-university tuition (non-EU students with a Residence Permit – Student)', 'Public-university tuition (Residence Permit – Student থাকা non-EU student)'), value: b('EUR 726.72 per semester by national law (Universities Act 2002 §92 / Tuition Fee Regulation 2004), the same figure at every Austrian public university, plus the mandatory ÖH (Austrian Students’ Union) fee of EUR 24.70 per semester charged to all students.', 'জাতীয় আইন দিয়ে (Universities Act 2002 §92 / Tuition Fee Regulation 2004) প্রতি সেমিস্টারে EUR 726.72, প্রতিটি Austrian public university-তে একই সংখ্যা, সঙ্গে সব student-কে চার্জ করা বাধ্যতামূলক ÖH (Austrian Students\' Union) fee প্রতি সেমিস্টারে EUR 24.70।'), amount: { value: 751.42, currency: 'EUR', period: 'semester' }, source: AT_BMFWF_TUITION };
const UNVERIFIED: GuideCost[] = [
  { id: 'funds-amount', label: b('Minimum funds to show', 'দেখানোর ন্যূনতম টাকা'), value: b('No single official, itemized figure specific to students was confirmed on the pages read for this guide; Migration.gv.at lists "sufficient means of subsistence" as a general requirement without naming one fixed amount here.', 'এই guide-এর জন্য পড়া page-এ student-দের জন্য বিশেষভাবে একটি একক official, বিস্তারিত সংখ্যা নিশ্চিত হয়নি; Migration.gv.at একটি নির্দিষ্ট পরিমাণের নাম না দিয়ে সাধারণ শর্ত হিসেবে "sufficient means of subsistence" তালিকাভুক্ত করে।'), status: 'not-verified', source: AT_MIGRATION_PERMANENT },
  { id: 'ldc-tuition-waiver', label: b('Possible tuition waiver for Bangladeshi students', 'Bangladeshi student-দের জন্য সম্ভাব্য tuition waiver'), value: b('The Federal Ministry’s own tuition-fee page states tuition is waived for citizens of a country listed in Austria’s "Order on Tuition Fees", based on the Least Developed Countries (LDC) in the OECD DAC List of ODA Recipients. Bangladesh remains an officially designated LDC as of this guide’s read date, scheduled to graduate from LDC status on 24 November 2026 — but this guide did not independently read the Austrian ordinance’s own country list or the current OECD DAC list to directly confirm Bangladesh’s inclusion, so this is shown as a strong possibility, not a confirmed fact, and it will need rechecking once Bangladesh’s graduation date passes.', 'Federal Ministry-র নিজের tuition-fee page বলে Austria-র "Order on Tuition Fees"-এ তালিকাভুক্ত একটি দেশের নাগরিকদের জন্য tuition মাফ করা হয়, OECD DAC List of ODA Recipients-এর Least Developed Countries (LDC)-এর ভিত্তিতে। এই guide-এর read date পর্যন্ত Bangladesh এখনো officially designated LDC, 24 November 2026-এ LDC status থেকে graduate করার কথা — কিন্তু এই guide Austrian ordinance-এর নিজের দেশের তালিকা বা বর্তমান OECD DAC তালিকা সরাসরি নিশ্চিত করার জন্য আলাদাভাবে পড়েনি, তাই এটা একটি নিশ্চিত fact না, একটি জোরালো সম্ভাবনা হিসেবে দেখানো হয়েছে, আর Bangladesh-এর graduation date পার হলে এটা আবার যাচাই করা দরকার।'), status: 'partly-verified', source: AT_BMFWF_TUITION },
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
        [b('The examples below — the University of Vienna, TU Wien, the University of Innsbruck, TU Graz and JKU Linz — are listed alphabetically by their English names, not ordered by quality. Tuition for non-EU degree students is set the same way by national law at every Austrian public university (EUR 726.72/semester plus the EUR 24.70 ÖH fee), but each institution sets its own admission requirements, application windows, language requirements and (for some programmes) entrance procedures, so always check the exact programme on the institution’s own admissions page.', 'নিচের উদাহরণ — University of Vienna, TU Wien, University of Innsbruck, TU Graz, আর JKU Linz — তাদের ইংরেজি নাম অনুযায়ী বর্ণানুক্রমে, মান অনুযায়ী নয়। Non-EU degree student-দের জন্য tuition জাতীয় আইন দিয়ে প্রতিটি Austrian public university-তে একইভাবে ঠিক হয় (EUR 726.72/semester সঙ্গে EUR 24.70 ÖH fee), কিন্তু প্রতিটি institution নিজস্ব ভর্তির শর্ত, application window, ভাষার শর্ত, আর (কিছু programme-এ) entrance procedure ঠিক করে, তাই সবসময় প্রতিষ্ঠানের নিজের admissions page-এ সঠিক programme দেখুন।')], [AT_BMFWF_TUITION]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work'), insurance('insurance')] },
  { id: 'visa', title: b('Student visa and residence permit', 'Student visa আর residence permit'), items: [visaRequired('visa-required'), visaProcess('visa-process'), funds('funds')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Admission requirements and deadlines set per university, not nationally · tuition fixed by national law for all non-EU degree students · Residence Permit – Student process ≈ 3–6 months', 'ভর্তির শর্ত আর deadline প্রতি university অনুযায়ী ঠিক হয়, জাতীয়ভাবে নয় · সব non-EU degree student-এর জন্য tuition জাতীয় আইন দিয়ে ঠিক · Residence Permit – Student process ≈ 3–6 মাস'),
  intro: b(
    'Austrian public universities admit Bachelor’s applicants through each institution’s own online application system, within an application period that depends on your citizenship and on whether the degree programme runs an entrance exam or selection procedure (e.g. TU Wien’s non-EU/EEA application window and TU Graz’s separate admission periods for Bachelor’s/Master’s programmes). As a Bangladeshi applicant you also need Austria’s Residence Permit – Student, applied for in person at the Austrian representative authority before travelling, which OeAD’s own checklist says takes up to about three months to decide (longer if extra documents are needed). Tuition itself is fixed nationally for non-EU degree students at EUR 726.72 per semester plus the EUR 24.70 ÖH fee, the same at every public university — Austria may also waive this tuition for citizens of countries on its Least Developed Countries list, which currently includes Bangladesh, though this guide could not independently confirm Bangladesh’s name on the ordinance’s own text.',
    'Austrian public university-গুলো প্রতিটি institution-এর নিজস্ব online application system-এর মাধ্যমে Bachelor\'s আবেদনকারীদের ভর্তি করে, একটি application period-এর মধ্যে যা আপনার নাগরিকত্বের আর degree programme-এ entrance exam বা selection procedure আছে কিনা তার উপর নির্ভর করে (যেমন TU Wien-এর non-EU/EEA application window আর TU Graz-এর Bachelor\'s/Master\'s programme-এর জন্য আলাদা admission period)। Bangladeshi আবেদনকারী হিসেবে আপনার Austria-র Residence Permit – Student-ও লাগে, যাওয়ার আগে Austrian representative authority-এ ব্যক্তিগতভাবে আবেদন করতে হয়, OeAD-এর নিজের checklist বলে সিদ্ধান্ত নিতে প্রায় তিন মাস পর্যন্ত সময় নেয় (অতিরিক্ত document লাগলে বেশি)। Tuition নিজেই non-EU degree student-দের জন্য জাতীয়ভাবে ঠিক করা EUR 726.72 প্রতি সেমিস্টার সঙ্গে EUR 24.70 ÖH fee, প্রতিটি public university-তে একই — Austria তার Least Developed Countries তালিকায় থাকা দেশের নাগরিকদের জন্য এই tuition মাফও করতে পারে, যে তালিকায় বর্তমানে Bangladesh আছে, যদিও এই guide ordinance-এর নিজের লেখায় Bangladesh-এর নাম স্বাধীনভাবে নিশ্চিত করতে পারেনি।',
  ),
  costs: { official: [RESIDENCE_PERMIT_FEE, TUITION_COST], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in Austria from Bangladesh?", "Bangladesh থেকে Austria-তে Bachelor's পড়তে কী কী লাগে?"),
          [b('A secondary-school leaving certificate recognised as equivalent to the Austrian Matura (each university assesses this for third-country certificates), the German or English proficiency the programme is taught in, an application through the institution’s own online system within its application period, and — since Bangladesh is not EU/EEA — Austria’s Residence Permit – Student applied for at the Austrian representative authority. The University of Vienna states country-specific admission requirements for some countries (e.g. China, Türkiye) on its own page, but a Bangladesh-specific entry on that page was not found for this guide.', 'Austrian Matura-র সমতুল্য স্বীকৃত একটি secondary-school leaving সনদ (প্রতি university third-country সনদের জন্য এটা মূল্যায়ন করে), programme যে ভাষায় (German বা English) পড়ানো হয় তার দক্ষতা, institution-এর নিজস্ব online system-এর মাধ্যমে তার application period-এর মধ্যে একটি application, আর — Bangladesh EU/EEA না হওয়ায় — Austrian representative authority-এ আবেদন করা Austria-র Residence Permit – Student। University of Vienna তার নিজের page-এ কিছু দেশের (যেমন China, Türkiye) জন্য country-specific ভর্তির শর্ত বলে, কিন্তু এই guide-এর জন্য সেই page-এ একটি Bangladesh-specific entry পাওয়া যায়নি।'), CHECK_UNI],
          [AT_UNIVIE, AT_OEAD_RESIDENCE_STUDENT],
          { status: 'partly-verified' },
        ),
        qa(
          'hsc',
          b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'),
          [b('Not verified yet as a single rule — Austrian universities generally require a secondary-school certificate that grants direct university access in its country of issue and corresponds to the Austrian Matura; depending on the institution and programme, a certificate such as the Bangladeshi HSC may need a university entrance qualification examination (Studienberechtigungsprüfung) or recognised preparatory study before full admission. A dedicated, nationwide HSC-grade-conversion rule was not found on an official page for this guide — each institution’s admission office assesses this individually, so check with your chosen university directly.', 'একক নিয়ম হিসেবে এখনো যাচাই হয়নি — Austrian university-গুলো সাধারণত এমন একটি secondary-school সনদ চায় যা ইস্যু করা দেশে সরাসরি university access দেয় আর Austrian Matura-র সমতুল্য; institution আর programme অনুযায়ী, HSC-র মতো একটি সনদের জন্য পূর্ণ ভর্তির আগে একটি university entrance qualification examination (Studienberechtigungsprüfung) বা স্বীকৃত preparatory study লাগতে পারে। এই guide-এর জন্য একটি নির্দিষ্ট, জাতীয় HSC-grade-conversion নিয়ম কোনো official page-এ পাওয়া যায়নি — প্রতিটি institution-এর admission office এটা স্বতন্ত্রভাবে মূল্যায়ন করে, তাই সরাসরি আপনার বাছা university-র সাথে চেক করুন।')],
          [AT_UIBK_THIRD_COUNTRIES],
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
          [b('Deadlines are set per institution, not nationally. TU Graz runs a separate admission period for Bachelor’s programmes without an admission procedure (11 January–5 February 2027 for that intake, per TU Graz’s own page). JKU Linz’s general admission period for the winter semester runs 8 July–31 October 2026, and for the summer semester 7 January–5 February (extendable to 31 March in special cases), per JKU’s own dates-and-deadlines page. Each university’s admissions office should be checked directly for the exact window and any entrance exam or selection procedure for your specific programme.', 'Deadline প্রতি institution অনুযায়ী ঠিক হয়, জাতীয়ভাবে নয়। TU Graz-এর নিজের page অনুযায়ী, admission procedure ছাড়া Bachelor\'s programme-এর জন্য একটি আলাদা admission period চলে (সেই intake-এর জন্য 11 January–5 February 2027)। JKU Linz-এর নিজের dates-and-deadlines page অনুযায়ী, winter semester-এর জন্য সাধারণ admission period 8 July–31 October 2026, আর summer semester-এর জন্য 7 January–5 February (বিশেষ ক্ষেত্রে 31 March পর্যন্ত বাড়ানো যায়)। আপনার নির্দিষ্ট programme-এর জন্য সঠিক window আর কোনো entrance exam বা selection procedure সরাসরি প্রতিটি university-র admissions office-এর সাথে চেক করা উচিত।')],
          [AT_TUGRAZ_ADMISSION_PERIODS, AT_JKU_DEADLINES],
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
          b('How much German or English do you need for a Bachelor’s?', 'Bachelor\'s-এ কত German বা English লাগে?'),
          [b('Not verified yet as a single national minimum — set per institution and per programme, and most Bachelor’s programmes at Austrian public universities are taught in German, not English. A specific nationwide figure was not itemized on the official pages read for this guide; confirm the language of instruction and the exact proficiency level (German or English) required with your chosen programme directly.', 'একক জাতীয় ন্যূনতম হিসেবে এখনো যাচাই হয়নি — প্রতি institution আর প্রতি programme অনুযায়ী ঠিক হয়, আর Austrian public university-র অধিকাংশ Bachelor\'s programme English-এ না, German-এ পড়ানো হয়। এই guide-এর জন্য পড়া official page-এ একটি নির্দিষ্ট জাতীয় সংখ্যা তালিকাভুক্ত হয়নি; সরাসরি আপনার বাছা programme-এর সাথে পড়ানোর ভাষা আর সঠিক দক্ষতার স্তর (German বা English) নিশ্চিত করুন।')],
          [AT_UIBK_THIRD_COUNTRIES],
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
          b("How much is a Bachelor's in Austria?", "Austria-তে Bachelor's-এ খরচ কত?"),
          [b('By national law, non-EU degree students holding a Residence Permit – Student pay EUR 726.72 per semester in tuition, plus the mandatory EUR 24.70 ÖH (Austrian Students’ Union) fee charged to every student — the same figure at every Austrian public university, unlike Hungary or Switzerland where tuition varies by institution. Austria’s own "Order on Tuition Fees" waives this tuition for citizens of a country on the OECD DAC List of Least Developed Countries, and Bangladesh remains an officially designated LDC as of this guide’s read date — but this guide could not independently confirm Bangladesh’s name on the ordinance’s own text, so it is shown as a strong possibility rather than a confirmed fact.', 'জাতীয় আইন দিয়ে, Residence Permit – Student থাকা non-EU degree student-রা tuition-এ প্রতি সেমিস্টারে EUR 726.72 দেন, সঙ্গে প্রতিটি student-কে চার্জ করা বাধ্যতামূলক EUR 24.70 ÖH (Austrian Students\' Union) fee — প্রতিটি Austrian public university-তে একই সংখ্যা, Hungary বা Switzerland-এর মতো না যেখানে tuition institution অনুযায়ী আলাদা। Austria-র নিজের "Order on Tuition Fees" OECD DAC List of Least Developed Countries-এ থাকা একটি দেশের নাগরিকদের জন্য এই tuition মাফ করে, আর এই guide-এর read date পর্যন্ত Bangladesh এখনো officially designated LDC — কিন্তু এই guide ordinance-এর নিজের লেখায় Bangladesh-এর নাম স্বাধীনভাবে নিশ্চিত করতে পারেনি, তাই এটা একটি নিশ্চিত fact-এর পরিবর্তে একটি জোরালো সম্ভাবনা হিসেবে দেখানো হয়েছে।'), CHECK_UNI],
          [AT_BMFWF_TUITION],
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
  card: b('A relevant Bachelor’s needed · many Master’s programmes taught in English, more than Bachelor’s level · same Residence Permit – Student process as Bachelor’s', 'সম্পর্কিত Bachelor\'s লাগে · Bachelor\'s level-এর চেয়ে বেশি Master\'s programme ইংরেজিতে পড়ানো হয় · Bachelor\'s-এর মতোই একই Residence Permit – Student process'),
  intro: b(
    'Master’s admission in Austria follows the same institution-by-institution pattern as Bachelor’s: each university runs its own application window and requirements. TU Wien, for example, runs a special non-EU/EEA admission period for Master’s applicants (16 January–15 July 2026 for the Winter Semester 2026/27 intake, per TU Wien’s own page), and requires a Bachelor’s degree of at least 180 ECTS credits plus, for English-taught Master’s programmes, English at CEFR B2 (e.g. IELTS Academic 6.5 or TOEFL iBT 87). As a Bangladeshi applicant you still need Austria’s Residence Permit – Student once admitted, applied for at the Austrian representative authority before travelling.',
    'Austria-তে Master\'s ভর্তি Bachelor\'s-এর মতোই একই institution-by-institution ধারা অনুসরণ করে: প্রতিটি university নিজস্ব application window আর শর্ত চালায়। উদাহরণস্বরূপ, TU Wien Master\'s আবেদনকারীদের জন্য একটি বিশেষ non-EU/EEA admission period চালায় (TU Wien-এর নিজের page অনুযায়ী Winter Semester 2026/27 intake-এর জন্য 16 January–15 July 2026), আর অন্তত 180 ECTS credit-এর একটি Bachelor\'s degree চায় সঙ্গে, English-taught Master\'s programme-এর জন্য, CEFR B2-এ English (যেমন IELTS Academic 6.5 বা TOEFL iBT 87)। Bangladeshi আবেদনকারী হিসেবে ভর্তি হলে আপনার এখনো Austria-র Residence Permit – Student লাগে, যাওয়ার আগে Austrian representative authority-এ আবেদন করতে হয়।',
  ),
  costs: { official: [RESIDENCE_PERMIT_FEE, TUITION_COST], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in Austria?", "Austria-তে Master's-এ কী লাগে?"),
          [b('A Bachelor’s degree (or equivalent) of at least 180 ECTS credits, generally in a field related to the Master’s programme, per TU Wien’s own admission page — other institutions set their own faculty-level requirements. English-taught Master’s programmes at TU Wien ask for CEFR B2 (IELTS Academic 6.5 or TOEFL iBT 87); German-taught programmes ask for German proficiency instead. Non-EU applicants without a residence permit already in Austria must also show their valid residence permit (or evidence of applying for one) at pre-registration.', 'TU Wien-এর নিজের admission page অনুযায়ী, অন্তত 180 ECTS credit-এর একটি Bachelor\'s degree (বা সমতুল্য), সাধারণত Master\'s programme-এর সাথে সম্পর্কিত একটি field-এ — অন্য institution নিজস্ব faculty-level শর্ত ঠিক করে। TU Wien-এ English-taught Master\'s programme CEFR B2 চায় (IELTS Academic 6.5 বা TOEFL iBT 87); German-taught programme-এ পরিবর্তে German দক্ষতা চায়। Austria-তে এখনো residence permit না থাকা non-EU আবেদনকারীদের pre-registration-এ তাদের valid residence permit (বা তার জন্য আবেদনের প্রমাণ)-ও দেখাতে হয়।')],
          [AT_TUWIEN_MASTERS],
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
          [b('TU Wien’s non-EU/EEA Master’s application window for the Winter Semester 2026/27 intake runs 16 January–15 July 2026, and for the Summer Semester 2027 intake 16 July 2026–15 January 2027, per TU Wien’s own page. TU Graz runs a separate Master’s admission period (6 July–30 November 2026 for one intake, 11 January–30 April 2027 for the other, per TU Graz’s own page). Each institution’s own admissions office should be checked for its exact window and any programme-specific procedure.', 'TU Wien-এর নিজের page অনুযায়ী, Winter Semester 2026/27 intake-এর জন্য non-EU/EEA Master\'s application window 16 January–15 July 2026 চলে, আর Summer Semester 2027 intake-এর জন্য 16 July 2026–15 January 2027। TU Graz-এর নিজের page অনুযায়ী TU Graz একটি আলাদা Master\'s admission period চালায় (এক intake-এর জন্য 6 July–30 November 2026, আরেকটির জন্য 11 January–30 April 2027)। সঠিক window আর কোনো programme-specific procedure প্রতিটি institution-এর নিজস্ব admissions office-এর সাথে চেক করা উচিত।')],
          [AT_TUWIEN, AT_TUGRAZ_ADMISSION_PERIODS],
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
          [b('Not a single national minimum — TU Wien’s own page states English-taught Master’s programmes ask for CEFR B2, e.g. IELTS Academic 6.5 or TOEFL iBT 87 (or 4.5 under a new scale valid since 21 January 2026); other institutions and German-taught programmes set their own, often German-language, requirements instead. Always confirm your own programme directly.', 'একক জাতীয় ন্যূনতম না — TU Wien-এর নিজের page বলে English-taught Master\'s programme CEFR B2 চায়, যেমন IELTS Academic 6.5 বা TOEFL iBT 87 (বা 21 January 2026 থেকে valid একটি নতুন স্কেলে 4.5); অন্য institution আর German-taught programme পরিবর্তে নিজস্ব, প্রায়ই German-ভাষার, শর্ত ঠিক করে। সবসময় সরাসরি আপনার নিজের programme নিশ্চিত করুন।')],
          [AT_TUWIEN_MASTERS],
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
          b("How much is a Master's in Austria?", "Austria-তে Master's-এ খরচ কত?"),
          [b('The same national figure as Bachelor’s level applies to non-EU Master’s students holding a Residence Permit – Student: EUR 726.72 per semester in tuition plus the EUR 24.70 ÖH fee, fixed by national law and the same at every Austrian public university. The possible Least-Developed-Countries tuition waiver described for Bachelor’s level applies equally at Master’s level, on the same partly-verified basis.', 'Bachelor\'s level-এর মতোই একই জাতীয় সংখ্যা Residence Permit – Student থাকা non-EU Master\'s student-দের জন্য প্রযোজ্য: tuition-এ প্রতি সেমিস্টারে EUR 726.72 সঙ্গে EUR 24.70 ÖH fee, জাতীয় আইন দিয়ে ঠিক আর প্রতিটি Austrian public university-তে একই। Bachelor\'s level-এর জন্য বর্ণিত সম্ভাব্য Least-Developed-Countries tuition waiver Master\'s level-এও একইভাবে প্রযোজ্য, একই partly-verified ভিত্তিতে।'), CHECK_UNI],
          [AT_BMFWF_TUITION],
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
  card: b('A relevant Master’s needed · OeAD’s Ernst Mach Grant worldwide funds a short research stay, not a full PhD · same Residence Permit – Student process as other degrees', 'সম্পর্কিত Master\'s লাগে · OeAD-এর Ernst Mach Grant worldwide একটি সংক্ষিপ্ত research stay funds করে, পূর্ণ PhD না · অন্য degree-র মতোই একই Residence Permit – Student process'),
  intro: b(
    'A doctoral programme at an Austrian university generally needs a relevant Master’s degree and admission by the specific doctoral school or supervisor, whose exact requirements (research proposal, interview, specific GPA) are set at faculty or programme level rather than nationally, and were not itemized in detail on the pages read for this guide. OeAD’s Ernst Mach Grant worldwide can fund a 1–9 month research stay in Austria for a young researcher "from all disciplines and countries (except Austria)", but this is a short research-stay grant, not funding for a complete PhD. As with other degree levels, Bangladeshi applicants need Austria’s Residence Permit – Student once admitted.',
    'একটি Austrian university-তে doctoral programme-এ সাধারণত একটি সম্পর্কিত Master\'s degree লাগে আর নির্দিষ্ট doctoral school বা supervisor দ্বারা ভর্তি, যার সঠিক শর্ত (research proposal, interview, নির্দিষ্ট GPA) জাতীয়ভাবে না, faculty বা programme level-এ ঠিক হয়, আর এই guide-এর জন্য পড়া page-এ বিস্তারিতভাবে তালিকাভুক্ত হয়নি। OeAD-এর Ernst Mach Grant worldwide "সব discipline আর দেশ (Austria ছাড়া)"-র একজন young researcher-এর জন্য Austria-তে 1–9 মাসের একটি research stay funds করতে পারে, কিন্তু এটা একটি সংক্ষিপ্ত research-stay grant, একটি সম্পূর্ণ PhD funds করা না। অন্য degree level-এর মতোই, Bangladeshi আবেদনকারীদের ভর্তি হলে Austria-র Residence Permit – Student লাগে।',
  ),
  costs: { official: [RESIDENCE_PERMIT_FEE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Austria?', 'Austria-তে কীভাবে PhD পাওয়া যায়?'),
          [
            b('Not verified yet as general national rules: apply directly to a doctoral school or supervisor at your chosen Austrian university, with a relevant Master’s degree — exact admission requirements (research proposal, interview, minimum grades) are set at faculty or programme level, not nationally, and were not itemized in detail on the official pages read for this guide. A separate route is OeAD’s Ernst Mach Grant worldwide, a 1–9 month research-stay grant open to young researchers from all countries except Austria, but it funds a research stay, not a complete funded PhD position.', 'সাধারণ জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: আপনার বাছা Austrian university-তে একটি সম্পর্কিত Master\'s degree নিয়ে সরাসরি একটি doctoral school বা supervisor-কে আবেদন করুন — সঠিক ভর্তির শর্ত (research proposal, interview, ন্যূনতম grade) জাতীয়ভাবে না, faculty বা programme level-এ ঠিক হয়, আর এই guide-এর জন্য পড়া official page-এ বিস্তারিতভাবে তালিকাভুক্ত হয়নি। একটি আলাদা route হলো OeAD-এর Ernst Mach Grant worldwide, Austria ছাড়া সব দেশের young researcher-দের জন্য খোলা একটি 1–9 মাসের research-stay grant, কিন্তু এটা একটি research stay funds করে, একটি সম্পূর্ণ funded PhD position না।'),
            CHECK_UNI,
          ],
          [AT_OEAD_ERNST_MACH],
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
          [AT_OEAD_ERNST_MACH],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ the country

export const AT_GUIDE: CountryGuide = {
  code: 'AT',
  checkedAt: AT_READ,
  sourcesPerSection: true,
  intro: b(
    'Austria is an EU/EEA and full Schengen member — but Bangladesh is not, so a Bangladeshi applicant is a "third-country national" under Austrian law and needs Austria’s own "Residence Permit – Student" (Aufenthaltsbewilligung – Student), applied for in person before a competent Austrian representative authority (embassy or consulate) in the applicant’s country of residence. OeAD’s own checklist states a decision period of 90 days, extended by a further 90 days if additional documents are needed, and a non-refundable application fee of EUR 218. To enter, you need travel health insurance (cover well over EUR 30,000, including a repatriation guarantee); after entry and enrolment, most degree students switch to the Österreichische Gesundheitskasse’s student self-insurance (EUR 78.84/month as of 2026) — Bangladesh is not covered by any of the social-insurance agreements Austria lists, so this is not optional. During study, holders of the Residence Permit – Student can get a work permit for up to 20 hours a week, granted without a labour-market check, per OeAD’s own page. After graduating, the same permit can be renewed for 12 months to search for a job or start a business; a matching job offer at the going graduate salary then opens the door to a Red-White-Red Card without a labour-market test, and 21 months of qualifying employment within 24 months to a Red-White-Red Card plus with unlimited labour-market access. Tuition is fixed by national law, not by institution: EUR 726.72 per semester for non-EU degree students plus the EUR 24.70 ÖH fee, the same figure at every Austrian public university — though Austria’s own "Order on Tuition Fees" waives this for citizens of countries on the OECD DAC list of Least Developed Countries, a list Bangladesh remains on as of this guide’s read date (scheduled to graduate from LDC status on 24 November 2026), a possibility this guide could not independently confirm by directly reading the ordinance’s own country list. Unlike Hungary’s Stipendium Hungaricum, Austria’s OeAD does not run a comparable full-degree scholarship naming Bangladesh — its broadest offers (the Ernst Mach Grant family) are short study-period or research grants, not funded full degrees. This guide is built from Migration.gv.at, the Federal Ministry of Women, Science and Research (bmfwf.gv.at), OeAD (oead.at) and university pages.',
    'Austria EU/EEA আর একটি পূর্ণ Schengen সদস্য — কিন্তু Bangladesh না, তাই একজন Bangladeshi আবেদনকারী Austrian আইনের অধীনে একজন "third-country national", আর তার Austria-র নিজের "Residence Permit – Student" (Aufenthaltsbewilligung – Student) লাগে, আবেদনকারীর বসবাসের দেশে দায়িত্বে থাকা Austrian representative authority (embassy বা consulate)-এ ব্যক্তিগতভাবে আবেদন করতে হয়। OeAD-এর নিজের checklist বলে সিদ্ধান্তের সময়কাল 90 দিন, অতিরিক্ত document লাগলে আরো 90 দিন বাড়ে, আর একটি non-refundable application fee EUR 218। প্রবেশের জন্য, আপনার একটি travel health insurance লাগে (EUR 30,000-র বেশি কভার, repatriation guarantee সহ); প্রবেশ আর ভর্তির পর, অধিকাংশ degree student Österreichische Gesundheitskasse-র student self-insurance-এ পাল্টায় (2026 সালে মাসে EUR 78.84) — Austria-র তালিকাভুক্ত কোনো social-insurance agreement Bangladesh-কে কভার করে না, তাই এটা ঐচ্ছিক না। পড়ার সময়, Residence Permit – Student হোল্ডাররা সপ্তাহে সর্বোচ্চ 20 ঘণ্টার জন্য একটি work permit পেতে পারেন, OeAD-এর নিজের page অনুযায়ী labour-market check ছাড়াই দেওয়া হয়। গ্র্যাজুয়েশনের পর, একই permit চাকরি খোঁজার বা ব্যবসা শুরু করার জন্য 12 মাসের জন্য renew করা যায়; চলমান গ্র্যাজুয়েট salary-তে একটি মিলে যাওয়া চাকরির offer তারপর labour-market test ছাড়াই একটি Red-White-Red Card-এর দরজা খোলে, আর 24 মাসের মধ্যে 21 মাস যোগ্য employment unlimited labour-market access সহ একটি Red-White-Red Card plus-এর দরজা খোলে। Tuition জাতীয় আইন দিয়ে ঠিক, institution দিয়ে না: non-EU degree student-দের জন্য প্রতি সেমিস্টারে EUR 726.72 সঙ্গে EUR 24.70 ÖH fee, প্রতিটি Austrian public university-তে একই সংখ্যা — যদিও Austria-র নিজের "Order on Tuition Fees" OECD DAC list of Least Developed Countries-এ থাকা দেশের নাগরিকদের জন্য এটা মাফ করে, এই guide-এর read date পর্যন্ত Bangladesh যে তালিকায় আছে (24 November 2026-এ LDC status থেকে graduate করার কথা), একটি সম্ভাবনা যা এই guide ordinance-এর নিজের দেশের তালিকা সরাসরি পড়ে স্বাধীনভাবে নিশ্চিত করতে পারেনি। Hungary-র Stipendium Hungaricum-এর মতো না, Austria-র OeAD Bangladesh-কে নাম দেওয়া একটি সমতুল্য full-degree scholarship চালায় না — তার সবচেয়ে বিস্তৃত offer (Ernst Mach Grant family) সংক্ষিপ্ত study-period বা research grant, funded full degree না। এই guide Migration.gv.at, Federal Ministry of Women, Science and Research (bmfwf.gv.at), OeAD (oead.at), আর university page থেকে তৈরি।',
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [AT_MIGRATION_STUDENT_GUIDE, AT_OEAD_RESIDENCE_STUDENT, AT_OEAD_PROGRAMMES_A_TO_Z],
      {
        kind: 'guidance',
        list: [
          b('Assuming Austria’s EU/Schengen membership means a simplified visa process for Bangladeshi applicants — Bangladesh is not EU/EEA, so a Bangladeshi applicant is a third-country national and needs the full Austrian "Residence Permit – Student" process.', 'ধরে নেওয়া যে Austria-র EU/Schengen সদস্যতা Bangladeshi আবেদনকারীদের জন্য একটি সরলীকৃত visa process মানে — Bangladesh EU/EEA না, তাই একজন Bangladeshi আবেদনকারী একজন third-country national আর পূর্ণ Austrian "Residence Permit – Student" process লাগে।'),
          b('Assuming OeAD runs a Stipendium-Hungaricum-style full-degree scholarship naming Bangladesh — its broadest offers for non-European students (the Ernst Mach Grant family) are short study-period or research grants, not full-degree funding.', 'ধরে নেওয়া যে OeAD Bangladesh-কে নাম দেওয়া Stipendium-Hungaricum-ধরনের একটি full-degree scholarship চালায় — non-European student-দের জন্য তার সবচেয়ে বিস্তৃত offer (Ernst Mach Grant family) সংক্ষিপ্ত study-period বা research grant, full-degree funding না।'),
          b('Assuming tuition varies by university the way it does in Hungary or Switzerland — in Austria, the non-EU degree-student tuition figure (EUR 726.72/semester plus the EUR 24.70 ÖH fee) is fixed by national law and is the same at every public university.', 'ধরে নেওয়া যে Hungary বা Switzerland-এর মতো tuition university অনুযায়ী আলাদা হয় — Austria-তে, non-EU degree-student tuition সংখ্যা (EUR 726.72/semester সঙ্গে EUR 24.70 ÖH fee) জাতীয় আইন দিয়ে ঠিক আর প্রতিটি public university-তে একই।'),
          b('Assuming the possible Least-Developed-Countries tuition waiver is automatically confirmed for Bangladesh — this guide found Bangladesh on the LDC list as of its read date, but did not independently read the Austrian ordinance’s own country text, so it is shown as a strong possibility, not a confirmed fact, and will need rechecking after Bangladesh’s scheduled 24 November 2026 LDC graduation.', 'ধরে নেওয়া যে সম্ভাব্য Least-Developed-Countries tuition waiver Bangladesh-এর জন্য স্বয়ংক্রিয়ভাবে নিশ্চিত — এই guide তার read date পর্যন্ত Bangladesh-কে LDC তালিকায় পেয়েছে, কিন্তু Austrian ordinance-এর নিজের দেশের লেখা স্বাধীনভাবে পড়েনি, তাই এটা একটি নিশ্চিত fact-এর পরিবর্তে একটি জোরালো সম্ভাবনা হিসেবে দেখানো হয়েছে, আর Bangladesh-এর নির্ধারিত 24 November 2026 LDC graduation-এর পর আবার যাচাই করা দরকার।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in Austria from Bangladesh?", "Bangladesh থেকে Austria-তে Bachelor's পড়তে কী কী লাগে?"), [b('A secondary-school certificate recognised as equivalent to the Austrian Matura, the German or English proficiency the programme is taught in, an application through the institution’s own online system within its application window, and — since Bangladesh is not EU/EEA — Austria’s Residence Permit – Student applied for at the Austrian representative authority.', 'Austrian Matura-র সমতুল্য স্বীকৃত একটি secondary-school সনদ, programme যে ভাষায় (German বা English) পড়ানো হয় তার দক্ষতা, institution-এর নিজস্ব online system-এর মাধ্যমে তার application window-এর মধ্যে একটি application, আর — Bangladesh EU/EEA না হওয়ায় — Austrian representative authority-এ আবেদন করা Austria-র Residence Permit – Student।')], [AT_UNIVIE, AT_OEAD_RESIDENCE_STUDENT], { status: 'partly-verified' }),
    qa('hsc', b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'), [b('Not verified yet as a single rule — your certificate must be assessed as equivalent to the Austrian Matura by your chosen institution, and some applicants may need a university entrance qualification examination first. A dedicated nationwide HSC-grade-conversion rule was not found on an official page for this guide.', 'একক নিয়ম হিসেবে এখনো যাচাই হয়নি — আপনার সনদ আপনার বাছা institution দ্বারা Austrian Matura-র সমতুল্য হিসেবে মূল্যায়ন করতে হয়, আর কিছু আবেদনকারীর প্রথমে একটি university entrance qualification examination লাগতে পারে। এই guide-এর জন্য একটি নির্দিষ্ট জাতীয় HSC-grade-conversion নিয়ম কোনো official page-এ পাওয়া যায়নি।')], [AT_UIBK_THIRD_COUNTRIES], { status: 'not-verified' }),
    qa('cost', b('How much does it cost to study in Austria?', 'Austria-তে পড়াশোনার খরচ কত?'), [b('A single, national figure: non-EU degree students pay EUR 726.72 per semester in tuition plus the EUR 24.70 ÖH fee, the same at every Austrian public university — plus the EUR 218 residence-permit application fee. Bangladesh may qualify for a full tuition waiver as a Least Developed Country, though this guide could not independently confirm it on the ordinance’s own text.', 'একটি একক, জাতীয় সংখ্যা: non-EU degree student-রা tuition-এ প্রতি সেমিস্টারে EUR 726.72 দেন সঙ্গে EUR 24.70 ÖH fee, প্রতিটি Austrian public university-তে একই — সঙ্গে EUR 218 residence-permit application fee। Bangladesh একটি Least Developed Country হিসেবে সম্পূর্ণ tuition waiver-এর যোগ্য হতে পারে, যদিও এই guide ordinance-এর নিজের লেখায় এটা স্বাধীনভাবে নিশ্চিত করতে পারেনি।')], [AT_BMFWF_TUITION], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for Austria?', 'Austria-তে IELTS কত লাগে?'), [b('Not a single national minimum; most Bachelor’s programmes are taught in German, while TU Wien’s English-taught Master’s programmes ask for CEFR B2, e.g. IELTS Academic 6.5 — always check your own institution and programme.', 'একক জাতীয় ন্যূনতম না; অধিকাংশ Bachelor\'s programme German-এ পড়ানো হয়, যখন TU Wien-এর English-taught Master\'s programme CEFR B2 চায়, যেমন IELTS Academic 6.5 — সবসময় আপনার নিজের institution আর programme দেখুন।')], [AT_TUWIEN_MASTERS], { status: 'partly-verified' }),
    qa('visa', b('What do you need for the student visa and residence permit?', 'Student visa আর residence permit-এর জন্য কী কী লাগে?'), [b('A "Residence Permit – Student" application submitted in person at the Austrian representative authority, with a passport, confirmation of enrolment, travel health insurance, proof of sufficient funds and a photograph — OeAD’s own checklist says the decision takes up to about three months (longer if more documents are needed), plus a non-refundable EUR 218 fee.', 'Austrian representative authority-এ ব্যক্তিগতভাবে জমা দেওয়া একটি "Residence Permit – Student" application, একটি passport, enrolment confirmation, travel health insurance, যথেষ্ট funds-এর প্রমাণ, আর একটি ছবি সহ — OeAD-এর নিজের checklist বলে সিদ্ধান্তে প্রায় তিন মাস পর্যন্ত সময় লাগে (বেশি document লাগলে বেশি), সঙ্গে একটি non-refundable EUR 218 fee।')], [AT_OEAD_RESIDENCE_STUDENT]),
    qa('work', b('Can you work while studying in Austria?', 'Austria-তে পড়ার পাশাপাশি কাজ করা যায়?'), [b('Yes, up to 20 hours a week with a work permit (Beschäftigungsbewilligung) applied for by your employer at the AMS, granted without a labour-market check, per OeAD’s own page.', 'হ্যাঁ, OeAD-এর নিজের page অনুযায়ী employer-এর AMS-এ আবেদন করা একটি work permit (Beschäftigungsbewilligung) দিয়ে সপ্তাহে সর্বোচ্চ 20 ঘণ্টা, labour-market check ছাড়াই দেওয়া হয়।')], [AT_OEAD_RESIDENCE_STUDENT]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('No comparable full-degree government scholarship naming Bangladesh was found — OeAD’s broadest offers for Bangladeshi students (the Ernst Mach Grant family) are short study-period or research grants (1–10 months), not full-degree funding.', 'Bangladesh-কে নাম দেওয়া একটি সমতুল্য full-degree government scholarship পাওয়া যায়নি — Bangladeshi student-দের জন্য OeAD-এর সবচেয়ে বিস্তৃত offer (Ernst Mach Grant family) সংক্ষিপ্ত study-period বা research grant (1–10 মাস), full-degree funding না।')], [AT_OEAD_PROGRAMMES_A_TO_Z, AT_OEAD_ERNST_MACH], { status: 'partly-verified' }),
    qa('after', b('Can you stay in Austria after graduating?', 'পড়া শেষে Austria-তে থাকা যায়?'), [b('Yes, your Residence Permit – Student can be renewed for 12 months to search for a job or start a business matching your studies, per Migration.gv.at’s own page; a matching job offer at the going graduate salary then opens the door to a Red-White-Red Card.', 'হ্যাঁ, Migration.gv.at-এর নিজের page অনুযায়ী, আপনার Residence Permit – Student আপনার পড়ার সাথে মেলে এমন একটি চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য 12 মাসের জন্য renew করা যায়; চলমান গ্র্যাজুয়েট salary-তে একটি মিলে যাওয়া চাকরির offer তারপর একটি Red-White-Red Card-এর দরজা খোলে।')], [AT_MIGRATION_GRADUATES]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('Not verified yet as a single official figure; Migration.gv.at lists "sufficient means of subsistence" as a general requirement without naming one fixed amount for students on the pages read for this guide.', 'এখনো যাচাই হয়নি একটি একক official সংখ্যা হিসেবে; এই guide-এর জন্য পড়া page-এ Migration.gv.at student-দের জন্য একটি নির্দিষ্ট পরিমাণের নাম না দিয়ে সাধারণ শর্ত হিসেবে "sufficient means of subsistence" তালিকাভুক্ত করে।')], [AT_MIGRATION_PERMANENT], { status: 'not-verified' }),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before the residence-permit stage: confirmation of enrolment/admission, language proficiency. At the residence-permit stage: a passport, travel health insurance, proof of sufficient funds and a photograph. Throughout your stay: the ÖGK student self-insurance (or equivalent) and your residence-permit card.', 'Residence-permit পর্যায়ের আগে: enrolment/admission confirmation, ভাষার দক্ষতা। Residence-permit পর্যায়ে: একটি passport, travel health insurance, যথেষ্ট funds-এর প্রমাণ, আর একটি ছবি। থাকার পুরো সময়: ÖGK student self-insurance (বা সমতুল্য) আর আপনার residence-permit card।')], [AT_OEAD_RESIDENCE_STUDENT]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b('A Bachelor’s degree (or equivalent) of at least 180 ECTS credits relevant to the programme; TU Wien’s English-taught Master’s programmes ask for CEFR B2 English (IELTS Academic 6.5 or TOEFL iBT 87).', 'Programme-এর সাথে সম্পর্কিত অন্তত 180 ECTS credit-এর একটি Bachelor\'s degree (বা সমতুল্য); TU Wien-এর English-taught Master\'s programme CEFR B2 English চায় (IELTS Academic 6.5 বা TOEFL iBT 87)।')], [AT_TUWIEN_MASTERS]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Not verified yet as general national rules: usually a relevant Master’s degree and acceptance by a doctoral school or supervisor, whose exact requirements are set at faculty level, not nationally, and were not itemized in detail on the pages read for this guide.', 'সাধারণ জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: সাধারণত একটি সম্পর্কিত Master\'s degree আর একটি doctoral school বা supervisor দ্বারা গ্রহণ, যার সঠিক শর্ত জাতীয়ভাবে না, faculty level-এ ঠিক হয়, আর এই guide-এর জন্য পড়া page-এ বিস্তারিতভাবে তালিকাভুক্ত হয়নি।')], [AT_OEAD_ERNST_MACH], { status: 'not-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — the University of Vienna, TU Wien, the University of Innsbruck, TU Graz and JKU Linz — are listed alphabetically by English name, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — University of Vienna, TU Wien, University of Innsbruck, TU Graz, আর JKU Linz — তাদের ইংরেজি নাম অনুযায়ী বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [AT_UNIVIE]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: Bangladesh is not among the countries with a social-insurance agreement with Austria (Bosnia and Herzegovina, North Macedonia, Montenegro, Serbia, Türkiye), so Bangladeshi applicants need both the entry travel insurance and the post-entry ÖGK student self-insurance. Bangladesh remains an officially designated Least Developed Country as of this guide’s read date (scheduled to graduate on 24 November 2026), which may make Bangladeshi students eligible for Austria’s tuition waiver under the "Order on Tuition Fees" — but this guide could not independently confirm Bangladesh’s name on that ordinance’s own country text, so it is shown as a strong possibility, not a confirmed fact. No official page read for this guide gives a Bangladeshi-HSC-specific grade-conversion formula, a single official minimum-funds figure, or a Bangladesh-specific full-degree scholarship — these are not verified here.', 'Bangladesh-এর জন্য যাচাই করা: Austria-র সাথে social-insurance agreement থাকা দেশের (Bosnia and Herzegovina, North Macedonia, Montenegro, Serbia, Türkiye) মধ্যে Bangladesh নেই, তাই Bangladeshi আবেদনকারীদের entry travel insurance আর post-entry ÖGK student self-insurance দুটোই লাগে। এই guide-এর read date পর্যন্ত Bangladesh এখনো একটি officially designated Least Developed Country (24 November 2026-এ graduate করার কথা), যা Bangladeshi student-দের "Order on Tuition Fees"-এর অধীনে Austria-র tuition waiver-এর যোগ্য করতে পারে — কিন্তু এই guide সেই ordinance-এর নিজের দেশের লেখায় Bangladesh-এর নাম স্বাধীনভাবে নিশ্চিত করতে পারেনি, তাই এটা একটি নিশ্চিত fact-এর পরিবর্তে একটি জোরালো সম্ভাবনা হিসেবে দেখানো হয়েছে। পড়া কোনো official page এই guide-এর জন্য একটি Bangladeshi-HSC-specific grade-conversion formula, একটি একক official ন্যূনতম-funds সংখ্যা, বা একটি Bangladesh-specific full-degree scholarship দেয় না — এগুলো এখানে যাচাই হয়নি।'),
    ], [AT_BMFWF_TUITION, AT_OEAD_RESIDENCE_STUDENT, AT_OEAD_ERNST_MACH], { status: 'partly-verified' }),
  ],
  life: [
    qa('arrival', b('What happens when you arrive?', 'পৌঁছানোর পর কী হয়?'), [b('You collect the actual residence-permit card from the competent residence authority in Austria, and register your place of residence within three working days of arrival, per OeAD’s own page. Keep your required health insurance active throughout your stay, as it is a continuing condition of the permit, and remember to submit a confirmation of continuing university enrolment to the ÖGK by 31 December each year.', 'OeAD-এর নিজের page অনুযায়ী, Austria-তে দায়িত্বে থাকা residence authority থেকে আসল residence-permit card সংগ্রহ করুন, আর পৌঁছানোর তিন কর্মদিবসের মধ্যে আপনার বসবাসের স্থান register করুন। থাকার পুরো সময় আপনার প্রয়োজনীয় health insurance সক্রিয় রাখুন, কারণ এটা permit-এর একটি চলমান শর্ত, আর প্রতি বছর 31 December-এর মধ্যে ÖGK-কে একটি continuing university enrolment confirmation জমা দিতে ভুলবেন না।')], [AT_OEAD_RESIDENCE_STUDENT]),
  ],
  documents: AT_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'fact', status: 'verified', value: { min: 726.72, max: 726.72, unit: 'EUR/semester (plus the EUR 24.70 ÖH fee), fixed by national law at every public university', text: b('EUR 726.72/semester plus the EUR 24.70 ÖH fee, the same figure at every Austrian public university.', 'প্রতিটি Austrian public university-তে একই সংখ্যা, EUR 726.72/semester সঙ্গে EUR 24.70 ÖH fee।') }, source: AT_BMFWF_TUITION },
    { id: 'funds-to-show', kind: 'guidance', status: 'not-verified', source: AT_MIGRATION_PERMANENT },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { min: 20, max: 20, unit: 'hours/week (work permit granted without a labour-market check)', text: b('Up to 20 hours a week, with a work permit granted without a labour-market check.', 'সপ্তাহে সর্বোচ্চ 20 ঘণ্টা, labour-market check ছাড়াই দেওয়া একটি work permit দিয়ে।') }, source: AT_OEAD_RESIDENCE_STUDENT },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { min: 12, max: 12, unit: 'months (renewal of the Residence Permit – Student to search for work or start a business)', text: b('12 months (a renewal of the same residence permit) to seek a job or start a business matching your studies.', 'আপনার পড়ার সাথে মেলে এমন একটি চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য 12 মাস (একই residence permit-এর একটি renewal)।') }, source: AT_MIGRATION_GRADUATES },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 218, max: 218, unit: 'EUR (one-time, non-refundable)', text: b('EUR 218, a one-time, non-refundable residence-permit application fee.', 'EUR 218, একটি one-time, non-refundable residence-permit application fee।') }, source: AT_OEAD_RESIDENCE_STUDENT },
  ],
};

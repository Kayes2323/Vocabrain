import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  MY_EMGS_COST_OF_LIVING,
  MY_EMGS_FAQ,
  MY_EMGS_GRADUATE_PASS,
  MY_EMGS_INSURANCE,
  MY_EMGS_PART_TIME_WORK,
  MY_EMGS_REQUIRED_DOCS,
  MY_IMI_SEV_LIST,
  MY_IMI_STUDENT_PASS,
  MY_KLN_DHAKA,
  MY_MOHE_MIS_GUIDELINES,
  MY_READ,
  MY_UM_HOW_TO_APPLY,
  MY_UPM_FEES,
} from './my-sources';

/**
 * Malaysia reading guide, researched on its own from Malaysian official
 * sources (the Immigration Department of Malaysia's own imi.gov.my, which
 * alone issues the eVAL and endorses the Student Pass; Education Malaysia
 * Global Services' own educationmalaysia.gov.my / visa.educationmalaysia.gov.my
 * — EMGS, the Ministry of Higher Education's centralised gateway every
 * international student's application must pass through; the High
 * Commission of Malaysia in Dhaka, kln.gov.my; MOHE's own scholarship
 * portal; and university pages). Nothing is taken from another country's
 * guide. Malaysia is NOT an EU/Schengen country, and its own EMGS→Immigration
 * two-step process, 20-hour/semester-break-only work rule and Graduate Pass
 * eligible-nationality list are read fresh — they are structurally different
 * from the national-immigration-office model used in the Europe-focused
 * guides built earlier this session, and from the South Korea university
 * layer's visa categories. Amounts stay in Ringgit Malaysia (RM/MYR), the
 * source's own currency, and are never converted. It covers Bachelor's,
 * Master's and PhD study for Bangladeshi students, who are on EMGS's own
 * Single Entry Visa (SEV)-required list.
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
  'Monash University Malaysia, Universiti Kebangsaan Malaysia, Universiti Malaya, Universiti Putra Malaysia and Universiti Teknologi Malaysia are not identical: public universities (UKM, UM, UPM, UTM) are government-funded with tuition far below private, international-branch institutions such as Monash, and every institution sets its own admission requirements, application windows and English-score rules. Always check the exact programme on the institution’s own admissions page.',
  'Monash University Malaysia, Universiti Kebangsaan Malaysia, Universiti Malaya, Universiti Putra Malaysia, আর Universiti Teknologi Malaysia একরকম না: public university (UKM, UM, UPM, UTM) সরকার-funded আর এর tuition Monash-এর মতো private, international-branch institution-এর চেয়ে অনেক কম, আর প্রতিটি institution নিজস্ব ভর্তির শর্ত, application window, আর English-score নিয়ম ঠিক করে। সবসময় প্রতিষ্ঠানের নিজের admissions page-এ সঠিক programme দেখে নিন।',
);

const EMGS_NOTE = b(
  'Malaysia is not an EU/Schengen country, and its student-visa system is not run by a single national immigration office the way several European countries’ are. Every international student’s application is first screened by Education Malaysia Global Services (EMGS) — a company limited by guarantee under the Ministry of Higher Education, and the official, MANDATORY gateway for all international-student applications to Malaysian institutions. EMGS forwards eligible applications to the Immigration Department of Malaysia, which alone issues the electronic Visa Approval Letter (eVAL) and later endorses the Student Pass in the passport after arrival. This two-body EMGS→Immigration structure is Malaysia’s own system.',
  'Malaysia EU/Schengen দেশ না, আর এর student-visa system একটিমাত্র জাতীয় immigration office দিয়ে চলে না, যেমন কিছু European দেশে চলে। প্রতিটি international student-এর application প্রথমে Education Malaysia Global Services (EMGS) দ্বারা screen হয় — Ministry of Higher Education-এর অধীনে একটি company limited by guarantee, আর Malaysian institution-এ সব international-student application-এর official, বাধ্যতামূলক গেটওয়ে। EMGS যোগ্য application Immigration Department of Malaysia-এ পাঠায়, যা একাই electronic Visa Approval Letter (eVAL) ইস্যু করে আর পরে পৌঁছানোর পর passport-এ Student Pass endorse করে। এই দুই-ধাপের EMGS→Immigration structure Malaysia-র নিজস্ব system।',
);

// ------------------------------------------------------------------ shared answers

const visaRequired = (id: string) =>
  qa(
    id,
    b('Does a Bangladeshi student need a visa/Student Pass to study in Malaysia?', 'Bangladesh-এর student-দের Malaysia-এ পড়তে visa/Student Pass লাগে কি?'),
    [
      b(
        'Yes. Every applicant must apply online — through EMGS’s own portal, the EMGS Hub app, or their institution via the STARS system — while still outside Malaysia. EMGS conducts academic screening and, for eligible applicants, issues an "Approval to Study for International Student" letter, then forwards the application to the Student Pass Unit at Immigration Department of Malaysia Headquarters, which issues the electronic Visa Approval Letter (eVAL), per the Immigration Department’s own page. Bangladesh is on EMGS’s own list of countries that additionally require a Single Entry Visa (SEV), applied for through Malaysia’s eVISA portal only after the eVAL is issued.',
        'হ্যাঁ। প্রতিটি আবেদনকারীকে Malaysia-র বাইরে থাকা অবস্থায় অনলাইনে আবেদন করতে হয় — EMGS-এর নিজের portal, EMGS Hub app, বা STARS system-এর মাধ্যমে তার institution দিয়ে। EMGS academic screening করে আর যোগ্য আবেদনকারীদের একটি "Approval to Study for International Student" letter ইস্যু করে, তারপর application Immigration Department of Malaysia Headquarters-এর Student Pass Unit-এ পাঠায়, যা electronic Visa Approval Letter (eVAL) ইস্যু করে, Immigration Department-এর নিজের page অনুযায়ী। Bangladesh EMGS-এর নিজের সেই দেশের তালিকায় আছে যাদের অতিরিক্তভাবে Single Entry Visa (SEV) লাগে, যা eVAL ইস্যু হওয়ার পরই Malaysia-র eVISA portal-এর মাধ্যমে আবেদন করতে হয়।',
      ),
      EMGS_NOTE,
    ],
    [MY_IMI_STUDENT_PASS, MY_EMGS_FAQ, MY_IMI_SEV_LIST],
    { allDegrees: true },
  );

const visaProcess = (id: string) =>
  qa(
    id,
    b('How does the application work, and how long does it take?', 'Application কীভাবে কাজ করে, আর কত সময় লাগে?'),
    [
      b(
        'EMGS’s own FAQ page lists the main stages: (1) the institution issues an Offer Letter; (2) the applicant submits an online application to EMGS; (3) EMGS carries out academic screening and document verification; (4) the Immigration Department issues the electronic Visa Approval Letter (eVAL); (5) the student travels to Malaysia; (6) a post-arrival medical screening is carried out within 7 days of arrival; (7) the Student Pass is endorsed in the passport. EMGS’s own FAQ states its client charter is 14 working days for a complete application, though incomplete or incorrect submissions take longer. The eVAL is valid for 6 months from issuance, and a student may enter Malaysia only after receiving it — entering while it is still being processed is not permitted, per EMGS’s own page.',
        'EMGS-এর নিজের FAQ page মূল ধাপগুলো তালিকাভুক্ত করে: (1) institution একটি Offer Letter ইস্যু করে; (2) আবেদনকারী EMGS-কে একটি online application জমা দেয়; (3) EMGS academic screening আর document verification করে; (4) Immigration Department electronic Visa Approval Letter (eVAL) ইস্যু করে; (5) student Malaysia-এ যায়; (6) পৌঁছানোর 7 দিনের মধ্যে একটি post-arrival medical screening হয়; (7) passport-এ Student Pass endorse হয়। EMGS-এর নিজের FAQ বলে এর client charter একটি সম্পূর্ণ application-এর জন্য 14 working days, যদিও incomplete বা ভুল submission বেশি সময় নেয়। eVAL ইস্যু হওয়ার তারিখ থেকে 6 মাস valid, আর একজন student তা পাওয়ার পরই Malaysia-এ ঢুকতে পারে — প্রসেস হওয়ার সময় ঢোকা অনুমোদিত না, EMGS-এর নিজের page অনুযায়ী।',
      ),
    ],
    [MY_EMGS_FAQ],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'Not verified yet as a single official minimum-funds figure: EMGS’s own "Required Documents" page, which itemizes everything needed for a Student Pass application (photo, passport copy, offer letter, health declaration form, academic transcripts, the institution-managed personal bond, and an English-proficiency certificate), does not list a bank-statement or minimum-funds amount among those required documents. Each institution instead manages a refundable "personal bond" on the student’s behalf with the Immigration Department (the exact amount varies by country of origin, per EMGS’s own linked personal-bond-fee document, which was not independently read in full detail for this guide), and separately lodges a health-insurance requirement. No official, Bangladesh-specific minimum bank-balance figure was found on the pages read for this guide, so none is stated here as confirmed.',
        'একটি একক official ন্যূনতম-funds সংখ্যা হিসেবে এখনো যাচাই হয়নি: EMGS-এর নিজের "Required Documents" page, যা Student Pass application-এর জন্য সবকিছু তালিকাভুক্ত করে (photo, passport copy, offer letter, health declaration form, academic transcript, institution-পরিচালিত personal bond, আর English-proficiency certificate), সেই প্রয়োজনীয় document-এর মধ্যে কোনো bank-statement বা ন্যূনতম-funds সংখ্যা তালিকাভুক্ত করে না। এর বদলে প্রতিটি institution student-এর পক্ষে Immigration Department-এর সাথে একটি refundable "personal bond" পরিচালনা করে (সঠিক সংখ্যা দেশ অনুযায়ী আলাদা, EMGS-এর নিজের সংযুক্ত personal-bond-fee document অনুযায়ী, যা এই guide-এর জন্য বিস্তারিতভাবে স্বাধীনভাবে পড়া হয়নি), আর আলাদাভাবে একটি health-insurance শর্ত রাখে। এই guide-এর জন্য পড়া page-এ কোনো official, Bangladesh-specific ন্যূনতম bank-balance সংখ্যা পাওয়া যায়নি, তাই এখানে কোনোটা নিশ্চিত হিসেবে বলা হয়নি।',
      ),
    ],
    [MY_EMGS_REQUIRED_DOCS],
    { allDegrees: true, status: 'not-verified' },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('Is health insurance compulsory?', 'Health insurance কি বাধ্যতামূলক?'),
    [
      b(
        'Yes. EMGS’s own page states it is compulsory for every student entering Malaysia to have medical insurance, and all international students must be covered by a locally purchased medical health-insurance scheme for their whole period of study. Through their institution, students can choose a package from one of three EMGS-partnered insurers (Etiqa Family Takaful, Great Eastern Takaful, or The Pacific Insurance), each meeting the Ministry of Higher Education’s own minimum-coverage requirements; EMGS’s own 2026 page lists annual premiums from roughly RM 498 to RM 644 depending on the plan and insurer. Coverage must be renewed to run for the whole validity of the Student Pass, up to a maximum of 12 months at a time.',
        'হ্যাঁ। EMGS-এর নিজের page বলে Malaysia-এ ঢোকা প্রতিটি student-এর জন্য medical insurance বাধ্যতামূলক, আর সব international student-দের পুরো পড়াশোনার সময়ের জন্য স্থানীয়ভাবে কেনা একটি medical health-insurance scheme-এ কভার থাকতে হয়। Institution-এর মাধ্যমে, student-রা তিনটি EMGS-partnered insurer-এর (Etiqa Family Takaful, Great Eastern Takaful, বা The Pacific Insurance) একটি package বাছতে পারে, প্রতিটি Ministry of Higher Education-এর নিজের ন্যূনতম-কভারেজ শর্ত পূরণ করে; EMGS-এর নিজের 2026 page অনুযায়ী বার্ষিক premium প্ল্যান আর insurer অনুযায়ী প্রায় RM 498 থেকে RM 644 পর্যন্ত। Coverage Student Pass-এর পুরো validity-র জন্য renew করতে হয়, একবারে সর্বোচ্চ 12 মাস পর্যন্ত।',
      ),
    ],
    [MY_EMGS_INSURANCE],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Malaysia, and how many hours?', 'Malaysia-এ পড়ার পাশাপাশি কাজ করা যায় কি, আর কত ঘণ্টা?'),
    [
      b(
        'Only in a limited way. EMGS’s own FAQ and the Immigration Department’s own Student Pass page agree: this facility applies only to Student Pass holders at public universities or private higher-education institutions (NOT to those at language centres, training/skills centres or accredited centres), and work is capped at 20 hours a week, ONLY during semester breaks or holidays longer than 7 days, at approved workplaces — restaurants, petrol kiosks, mini markets, hotels and the institution’s own campus. Prior approval from the Department of Immigration is required, applied for jointly with the institution’s representative; the student needs to be present with that representative at the Immigration Department to submit the application. Students are barred from cashier roles, and in hotels from singer, masseur, musician or Guest Relation Officer (GRO) roles. Violating these conditions can lead to the Student Pass being revoked.',
        'শুধুমাত্র একটি সীমিত আকারে। EMGS-এর নিজের FAQ আর Immigration Department-এর নিজের Student Pass page একমত: এই সুযোগ শুধু public university বা private higher-education institution-এর Student Pass holder-দের জন্য (language centre, training/skills centre, বা accredited centre-দের জন্য না), আর কাজ সপ্তাহে 20 ঘণ্টায় সীমিত, শুধু semester break বা 7 দিনের বেশি holiday-তে, অনুমোদিত workplace-এ — restaurant, petrol kiosk, mini market, hotel, আর institution-এর নিজের campus। Department of Immigration-এর পূর্ব অনুমোদন লাগে, institution-এর representative-এর সাথে একসঙ্গে আবেদন করতে হয়; student-কে সেই representative-এর সাথে Immigration Department-এ উপস্থিত থেকে application জমা দিতে হয়। Student-রা cashier role-এ, আর hotel-এ singer, masseur, musician, বা Guest Relation Officer (GRO) role-এ কাজ করতে পারবেন না। এই শর্ত ভাঙলে Student Pass বাতিল হতে পারে।',
      ),
    ],
    [MY_EMGS_FAQ, MY_EMGS_PART_TIME_WORK, MY_IMI_STUDENT_PASS],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Malaysia to work after graduating?', 'পড়া শেষে Malaysia-এ কাজের জন্য থাকা যায়?'),
    [
      b(
        'Only for graduates of certain nationalities — and Bangladesh is not one of them. EMGS’s own Graduate Pass page describes a Social Visit Pass letting a graduate (Bachelor’s degree or higher) stay and work in Malaysia for up to 12 months after graduation, in permitted job sectors, without needing an employer sponsor, with dependents able to join. But the same official page names the eligible nationalities exhaustively — 31 countries including Australia, China, India, Japan, South Korea, Singapore, the UK and the USA — and Bangladesh does not appear on that list. The requirements also include a personal bond with a Malaysian citizen sponsor earning at least RM 1,500/month, continuing health insurance, a passport valid at least 18 months, and no legal convictions in Malaysia.',
        'শুধু নির্দিষ্ট কিছু nationality-র গ্র্যাজুয়েটদের জন্য — আর Bangladesh তাদের একটা না। EMGS-এর নিজের Graduate Pass page একটি Social Visit Pass বর্ণনা করে যা একজন গ্র্যাজুয়েটকে (Bachelor\'s degree বা তার বেশি) পড়া শেষে Malaysia-এ 12 মাস পর্যন্ত থাকা আর অনুমোদিত সেক্টরে কাজ করার সুযোগ দেয়, কোনো employer sponsor ছাড়া, dependent-দেরও যোগ দেওয়ার সুযোগ সহ। কিন্তু একই official page যোগ্য nationality-গুলো সম্পূর্ণভাবে নাম দিয়ে তালিকাভুক্ত করে — 31টি দেশ, Australia, China, India, Japan, South Korea, Singapore, UK, আর USA সহ — আর Bangladesh সেই তালিকায় নেই। শর্তের মধ্যে আরো আছে কমপক্ষে মাসে RM 1,500 আয়ের একজন Malaysian নাগরিক sponsor-এর সাথে personal bond, চলমান health insurance, অন্তত 18 মাস valid passport, আর Malaysia-তে কোনো legal conviction না থাকা।',
      ),
    ],
    [MY_EMGS_GRADUATE_PASS],
    { status: 'verified' },
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'Not verified yet that Bangladesh is an eligible country for the Malaysia International Scholarship (MIS), the Ministry of Higher Education’s own government scholarship for international postgraduates. MOHE’s own 2026 guidelines document names MIS "recipient countries" exhaustively — ASEAN member states, a named group of Commonwealth countries, and a long additional list including China, Japan, South Korea, Saudi Arabia, the UAE and several Central Asian and Middle Eastern states — and Bangladesh was not found named anywhere on that list. EMGS’s own FAQ page otherwise points applicants to check directly with their chosen institution for its own scholarships. No Bangladesh-specific, full-degree Malaysian government scholarship was found on the official pages read for this guide.',
        'Malaysia International Scholarship (MIS), Ministry of Higher Education-এর নিজের international postgraduate-দের জন্য government scholarship, এর জন্য Bangladesh একটি যোগ্য দেশ কিনা তা এখনো যাচাই হয়নি। MOHE-এর নিজের 2026 guidelines document MIS-এর "recipient countries" সম্পূর্ণভাবে নাম দিয়ে তালিকাভুক্ত করে — ASEAN সদস্য দেশ, নামযুক্ত একদল Commonwealth দেশ, আর China, Japan, South Korea, Saudi Arabia, UAE, আর কয়েকটি Central Asian আর Middle Eastern দেশ-সহ একটি দীর্ঘ অতিরিক্ত তালিকা — আর সেই তালিকায় কোথাও Bangladesh পাওয়া যায়নি। EMGS-এর নিজের FAQ page বরং আবেদনকারীদের তাদের বাছা institution-এর নিজস্ব scholarship-এর জন্য সরাসরি চেক করতে বলে। এই guide-এর জন্য পড়া official page-এ কোনো Bangladesh-specific, full-degree Malaysian government scholarship পাওয়া যায়নি।',
      ),
    ],
    [MY_MOHE_MIS_GUIDELINES, MY_EMGS_FAQ],
    { status: 'not-verified', kind: 'guidance' },
  );

// ------------------------------------------------------------------ documents

const AUTHORITY = b('EMGS (educationmalaysia.gov.my / visa.educationmalaysia.gov.my), through your chosen institution.', 'EMGS (educationmalaysia.gov.my / visa.educationmalaysia.gov.my), আপনার বাছা institution-এর মাধ্যমে।');

export const MY_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport copy (18+ months validity)', 'Passport copy (18+ মাস validity)'),
    why: b('EMGS’s own "Required Documents" page requires a copy of the passport’s data page and all pages with visa information, with passport validity of at least 18 months (12 months longer than the study duration is recommended for a one-off application).', 'EMGS-এর নিজের "Required Documents" page passport-এর data page আর visa তথ্য থাকা সব page-এর একটি copy চায়, passport-এর validity অন্তত 18 মাস থাকতে হবে (একটি one-off application-এর জন্য study duration-এর চেয়ে 12 মাস বেশি সুপারিশ করা হয়)।'),
    who: AUTHORITY,
    when: b('With the online application to EMGS, before travel.', 'EMGS-কে online application-এর সঙ্গে, যাওয়ার আগে।'),
    where: b('Uploaded on the EMGS portal, or submitted by your institution.', 'EMGS portal-এ আপলোড করতে হয়, বা আপনার institution জমা দেয়।'),
    prepare: b('Renew a soon-to-expire passport before applying, since a short-validity passport can delay or block the eVAL.', 'আবেদনের আগে শীঘ্রই মেয়াদ শেষ হওয়া passport renew করুন, কারণ কম-validity passport eVAL দেরি করতে বা আটকাতে পারে।'),
    groups: ['general', 'visa'],
    sources: [MY_EMGS_REQUIRED_DOCS],
  },
  {
    id: 'offer-letter',
    name: b('Offer Letter', 'Offer Letter (ভর্তির offer letter)'),
    why: b('EMGS’s own page requires the institution’s Offer Letter before an online Student Pass application can be submitted and filled out.', 'EMGS-এর নিজের page একটি online Student Pass application জমা আর পূরণ করার আগে institution-এর Offer Letter চায়।'),
    who: b('The Malaysian institution you applied to.', 'যে Malaysian institution-এ আবেদন করছেন।'),
    when: b('Issued after admission, before the EMGS application.', 'ভর্তির পর ইস্যু হয়, EMGS application-এর আগে।'),
    where: b('Uploaded with your EMGS application.', 'আপনার EMGS application-এর সঙ্গে আপলোড করতে হয়।'),
    prepare: b('Each institution runs its own admission timeline — confirm it directly with your chosen institution.', 'প্রতিটি institution নিজস্ব ভর্তির timeline চালায় — আপনার বাছা institution-এর সাথে সরাসরি নিশ্চিত করুন।'),
    groups: ['general', 'program', 'visa'],
    sources: [MY_EMGS_REQUIRED_DOCS],
  },
  {
    id: 'health-declaration',
    name: b('Health Declaration Form', 'Health Declaration Form (স্বাস্থ্য ঘোষণা ফর্ম)'),
    why: b('EMGS’s own page requires a filled-in Health Declaration Form, uploaded as a scanned copy for an online application.', 'EMGS-এর নিজের page একটি পূরণ করা Health Declaration Form চায়, online application-এর জন্য scanned copy হিসেবে আপলোড করতে হয়।'),
    who: AUTHORITY,
    when: b('With the EMGS application, before travel.', 'EMGS application-এর সঙ্গে, যাওয়ার আগে।'),
    where: b('Uploaded on the EMGS portal.', 'EMGS portal-এ আপলোড করতে হয়।'),
    prepare: b('Download the form directly from EMGS’s own site rather than a third-party copy.', 'তৃতীয় পক্ষের copy না নিয়ে সরাসরি EMGS-এর নিজের site থেকে form download করুন।'),
    groups: ['general', 'visa'],
    sources: [MY_EMGS_REQUIRED_DOCS],
  },
  {
    id: 'transcripts',
    name: b('Academic certificates and transcripts', 'Academic certificate আর transcript'),
    why: b('EMGS’s own page requires copies of all academic records, certificates or transcripts of previous studies, plus original documents on arrival at UM, per UM’s own arrival checklist.', 'EMGS-এর নিজের page আগের পড়াশোনার সব academic record, certificate, বা transcript-এর copy চায়, আর UM-এর নিজের arrival checklist অনুযায়ী পৌঁছানোর পর original document।'),
    who: AUTHORITY,
    when: b('With the application, and originals on arrival.', 'Application-এর সঙ্গে, আর পৌঁছানোর পর original।'),
    where: b('Uploaded to EMGS; originals carried to Malaysia.', 'EMGS-এ আপলোড করতে হয়; original Malaysia-এ সঙ্গে আনতে হয়।'),
    prepare: b('Keep both digital scans and the physical originals, since institutions may ask for either.', 'Digital scan আর physical original দুটোই রাখুন, কারণ institution যেকোনোটা চাইতে পারে।'),
    groups: ['general', 'program', 'visa'],
    sources: [MY_EMGS_REQUIRED_DOCS, MY_UM_HOW_TO_APPLY],
  },
  {
    id: 'english-certificate',
    name: b('English-proficiency certificate (if required by your programme)', 'English-proficiency certificate (programme প্রয়োজন করলে)'),
    why: b('EMGS’s own page says applicants must demonstrate an acceptable level of English with the eVAL application; it accepts MUET, IELTS, TOEFL iBT, TOEFL Essentials, PTE Academic, several Cambridge English exams, Linguaskill and OET. EMGS warns that not attaching it can delay processing and may limit the Student Pass to less than the full course duration.', 'EMGS-এর নিজের page বলে আবেদনকারীদের eVAL application-এর সঙ্গে গ্রহণযোগ্য মাত্রার English দেখাতে হয়; এটা MUET, IELTS, TOEFL iBT, TOEFL Essentials, PTE Academic, কয়েকটি Cambridge English exam, Linguaskill, আর OET গ্রহণ করে। EMGS সতর্ক করে যে এটা সংযুক্ত না করলে processing দেরি হতে পারে আর Student Pass পূর্ণ course duration-এর চেয়ে কম সময়ের জন্য সীমিত হতে পারে।'),
    who: AUTHORITY,
    when: b('With the eVAL application.', 'eVAL application-এর সঙ্গে।'),
    where: b('Uploaded on the EMGS portal.', 'EMGS portal-এ আপলোড করতে হয়।'),
    prepare: b('Confirm your specific programme’s minimum score directly with the institution — EMGS lists accepted test types, not a single nationwide minimum score.', 'আপনার নির্দিষ্ট programme-এর ন্যূনতম score সরাসরি institution-এর সাথে নিশ্চিত করুন — EMGS গ্রহণযোগ্য test type তালিকাভুক্ত করে, কোনো একক জাতীয় ন্যূনতম score না।'),
    groups: ['general', 'program'],
    sources: [MY_EMGS_REQUIRED_DOCS],
  },
  {
    id: 'personal-bond',
    name: b('Personal Bond (institution-managed)', 'Personal Bond (institution-পরিচালিত)'),
    why: b('EMGS’s own page says the Immigration Department requires every institution to sign a refundable personal bond for each candidate, binding the institution for a specified sum (returned on completion or withdrawal, provided no immigration-law violation occurred).', 'EMGS-এর নিজের page বলে Immigration Department প্রতিটি institution-কে প্রতিটি candidate-এর জন্য একটি refundable personal bond সাইন করতে বাধ্য করে, একটি নির্দিষ্ট পরিমাণে institution-কে বাঁধে (সম্পন্ন করার বা সরে যাওয়ার সময় ফেরত দেওয়া হয়, যদি কোনো immigration-law ভাঙা না হয়)।'),
    who: AUTHORITY,
    when: b('The institution lodges it on your behalf; the form can be submitted after arrival for Student Pass endorsement.', 'Institution আপনার পক্ষে এটা জমা দেয়; endorsement-এর জন্য পৌঁছানোর পর form জমা দেওয়া যায়।'),
    where: b('Managed by your institution with the Immigration Department.', 'আপনার institution Immigration Department-এর সাথে এটা পরিচালনা করে।'),
    prepare: b('The exact amount varies by country of origin, per EMGS’s own linked fee document — ask your institution for the figure that applies to you.', 'সঠিক পরিমাণ দেশ অনুযায়ী আলাদা, EMGS-এর নিজের সংযুক্ত fee document অনুযায়ী — আপনার প্রযোজ্য সংখ্যার জন্য institution-কে জিজ্ঞাসা করুন।'),
    groups: ['visa', 'bangladesh'],
    sources: [MY_EMGS_REQUIRED_DOCS],
  },
  {
    id: 'insurance',
    name: b('Health insurance (locally purchased, 12+ months)', 'Health insurance (স্থানীয়ভাবে কেনা, 12+ মাস)'),
    why: b('EMGS’s own page makes a locally purchased medical insurance scheme compulsory for the whole period of study, through one of three EMGS-partnered insurers or an institution-arranged equivalent meeting MOHE’s minimum coverage.', 'EMGS-এর নিজের page পুরো পড়াশোনার সময়ের জন্য একটি স্থানীয়ভাবে কেনা medical insurance scheme বাধ্যতামূলক করে, তিনটি EMGS-partnered insurer-এর একটি বা MOHE-র ন্যূনতম coverage পূরণ করা institution-arranged সমতুল্যের মাধ্যমে।'),
    who: b('An EMGS-partnered insurer (or institution-arranged equivalent) licensed in Malaysia.', 'Malaysia-তে লাইসেন্সপ্রাপ্ত একটি EMGS-partnered insurer (বা institution-arranged সমতুল্য)।'),
    when: b('From entry into Malaysia; renewed each year to match the Student Pass.', 'Malaysia-এ প্রবেশের পর থেকে; Student Pass-এর সাথে মিল রাখতে প্রতি বছর renew করতে হয়।'),
    where: b('Arranged through your institution.', 'আপনার institution-এর মাধ্যমে ব্যবস্থা হয়।'),
    prepare: b('Inform your institution of your entry date so coverage starts correctly.', 'Coverage ঠিকভাবে শুরু হওয়ার জন্য আপনার institution-কে প্রবেশের তারিখ জানান।'),
    groups: ['visa', 'bangladesh', 'arrival'],
    sources: [MY_EMGS_INSURANCE],
  },
  {
    id: 'sev',
    name: b('Single Entry Visa (SEV) — Bangladesh is on this list', 'Single Entry Visa (SEV) — Bangladesh এই তালিকায় আছে'),
    why: b('EMGS’s own page lists Bangladesh among the countries that require a Single Entry Visa (SEV) before entering Malaysia, obtained through Malaysia’s eVISA portal only after the eVAL is issued.', 'EMGS-এর নিজের page Malaysia-এ প্রবেশের আগে Single Entry Visa (SEV) প্রয়োজন এমন দেশের তালিকায় Bangladesh-কে অন্তর্ভুক্ত করে, যা eVAL ইস্যু হওয়ার পরই Malaysia-র eVISA portal-এর মাধ্যমে পাওয়া যায়।'),
    who: b('Malaysia’s eVISA system (malaysiavisa.imi.gov.my), after eVAL approval.', 'Malaysia-র eVISA system (malaysiavisa.imi.gov.my), eVAL approval-এর পর।'),
    when: b('After the eVAL is issued, before travel.', 'eVAL ইস্যু হওয়ার পর, যাওয়ার আগে।'),
    where: b('Applied for online worldwide (except from Malaysia, Israel and North Korea, per the Immigration Department’s own page).', 'অনলাইনে বিশ্বব্যাপী আবেদন করা যায় (Malaysia, Israel, আর North Korea থেকে ছাড়া, Immigration Department-এর নিজের page অনুযায়ী)।'),
    prepare: b('Apply only after your eVAL is issued — applying earlier is not accepted.', 'আপনার eVAL ইস্যু হওয়ার পরই আবেদন করুন — আগে আবেদন গ্রহণযোগ্য না।'),
    groups: ['visa', 'bangladesh'],
    sources: [MY_IMI_SEV_LIST, MY_IMI_STUDENT_PASS],
  },
];

// ------------------------------------------------------------------ costs (source's own currency, never converted)

const LIVING_ESTIMATE: GuideCost = {
  id: 'cost-of-living-estimate',
  label: b('Typical monthly cost of living (EMGS estimate)', 'সাধারণ মাসিক জীবনযাত্রার খরচ (EMGS estimate)'),
  value: b('EMGS’s own page cites LivingCost.org’s figure of roughly USD 582/month on average; on-campus accommodation USD 50–150/month, off-campus USD 100–300/month, food from about USD 3/day, and utilities (electricity, water, internet, mobile) USD 40–65/month.', 'EMGS-এর নিজের page LivingCost.org-এর সংখ্যা উদ্ধৃত করে, গড়ে প্রায় মাসে USD 582; on-campus accommodation মাসে USD 50–150, off-campus মাসে USD 100–300, খাবার দিনে প্রায় USD 3 থেকে, আর utility (বিদ্যুৎ, পানি, internet, mobile) মাসে USD 40–65।'),
  status: 'partly-verified',
  amount: { value: 582, currency: 'USD', period: 'month' },
  source: MY_EMGS_COST_OF_LIVING,
};
const UNVERIFIED: GuideCost[] = [
  {
    id: 'public-tuition-range',
    label: b('Public-university tuition (varies by university and programme)', 'Public-university tuition (university আর programme অনুযায়ী আলাদা)'),
    value: b('UPM’s own international-fees document lists per-semester Bachelor’s fees roughly RM 5,000–8,125 (about RM 10,000–16,250/year) depending on the programme — far below Europe-style figures — but these are UPM’s own published figures, not a single nationwide number, and other public universities set their own schedules.', 'UPM-এর নিজের international-fees document programme অনুযায়ী প্রতি সেমিস্টারে Bachelor\'s fee প্রায় RM 5,000–8,125 (বছরে প্রায় RM 10,000–16,250) তালিকাভুক্ত করে — Europe-style সংখ্যার চেয়ে অনেক কম — কিন্তু এগুলো UPM-এর নিজের প্রকাশিত সংখ্যা, একক জাতীয় সংখ্যা না, আর অন্য public university নিজস্ব schedule ঠিক করে।'),
    status: 'partly-verified',
    amount: { value: 10000, max: 16250, currency: 'RM', period: 'year' },
    source: MY_UPM_FEES,
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
            'The examples below — Monash University Malaysia, Universiti Kebangsaan Malaysia, Universiti Malaya, Universiti Putra Malaysia and Universiti Teknologi Malaysia — are listed alphabetically, not ordered by quality. UKM, UM, UPM and UTM are public universities with much lower tuition than Monash, a private international-branch campus whose published fees for international students sit well above public-university levels. Each institution sets its own admission requirements, application windows and English-score rules, so always check the exact programme on the institution’s own admissions page.',
            'নিচের উদাহরণ — Monash University Malaysia, Universiti Kebangsaan Malaysia, Universiti Malaya, Universiti Putra Malaysia, আর Universiti Teknologi Malaysia — বর্ণানুক্রমে, মান অনুযায়ী নয়। UKM, UM, UPM, আর UTM public university, Monash-এর চেয়ে অনেক কম tuition, যা একটি private international-branch campus যার international student-দের জন্য প্রকাশিত fee public-university level-এর চেয়ে অনেক বেশি। প্রতিটি institution নিজস্ব ভর্তির শর্ত, application window, আর English-score নিয়ম ঠিক করে, তাই সবসময় প্রতিষ্ঠানের নিজের admissions page-এ সঠিক programme দেখুন।',
          ),
        ],
        [MY_UPM_FEES],
      ),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work'), insurance('insurance')] },
  { id: 'visa', title: b('Student Pass and visa (EMGS)', 'Student Pass আর visa (EMGS)'), items: [visaRequired('visa-required'), visaProcess('visa-process'), funds('funds')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('At least 12 years of recognised schooling · work up to 20 hours/week, semester breaks only, with prior Immigration approval · EMGS→Immigration process ≈ 2 weeks to a few months', 'অন্তত 12 বছরের স্বীকৃত schooling · সপ্তাহে 20 ঘণ্টা পর্যন্ত কাজ, শুধু semester break-এ, Immigration-এর পূর্ব অনুমোদন সহ · EMGS→Immigration process ≈ 2 সপ্তাহ থেকে কয়েক মাস'),
  intro: b(
    'Malaysian universities admit Bachelor’s applicants through each institution’s own process; EMGS’s own FAQ says the main requirement is at least 12 years of education with a national/international examination recognised by the Ministry of Education. Public universities such as UPM, UM, UKM and UTM charge tuition far below Europe-style figures (UPM’s own fee document lists many Bachelor’s programmes around RM 10,000–16,250/year), while a private international-branch campus such as Monash charges much more. As a Bangladeshi applicant you must apply online to EMGS before travelling; EMGS screens and forwards your application to the Immigration Department for the eVAL, then you apply for a Single Entry Visa (SEV, required for Bangladesh) only after the eVAL is issued. Once holding a Student Pass at a public or private HEI, you can work up to 20 hours a week, only during semester breaks, with prior Immigration Department approval arranged through your institution. Note: under the Immigration Department’s own dependants rule, Bachelor’s-level Student Pass holders may bring dependants only if they hold the citizenship of a specific, named list of countries — Bangladesh is not on that list — while Master’s and PhD holders may bring dependants regardless of nationality.',
    'Malaysian university-গুলো প্রতিটি institution-এর নিজস্ব process-এর মাধ্যমে Bachelor\'s আবেদনকারীদের ভর্তি করে; EMGS-এর নিজের FAQ বলে মূল শর্ত অন্তত 12 বছরের education যার সাথে Ministry of Education-এর স্বীকৃত একটি national/international examination। UPM, UM, UKM, আর UTM-এর মতো public university Europe-style সংখ্যার চেয়ে অনেক কম tuition নেয় (UPM-এর নিজের fee document অনুযায়ী অনেক Bachelor\'s programme বছরে প্রায় RM 10,000–16,250), যখন Monash-এর মতো একটি private international-branch campus অনেক বেশি নেয়। Bangladeshi আবেদনকারী হিসেবে যাওয়ার আগে EMGS-এ online আবেদন করতে হবে; EMGS screen করে eVAL-এর জন্য Immigration Department-এ application পাঠায়, তারপর eVAL ইস্যু হওয়ার পরই Single Entry Visa (SEV, Bangladesh-এর জন্য প্রয়োজনীয়) আবেদন করতে হয়। একটি public বা private HEI-তে Student Pass পেলে, institution-এর মাধ্যমে Immigration Department-এর পূর্ব অনুমোদন নিয়ে, শুধু semester break-এ সপ্তাহে 20 ঘণ্টা পর্যন্ত কাজ করতে পারেন। মনে রাখুন: Immigration Department-এর নিজের dependant নিয়ম অনুযায়ী, Bachelor\'s-level Student Pass holder-রা dependant আনতে পারেন শুধু যদি তাদের নির্দিষ্ট, নামযুক্ত দেশের citizenship থাকে — Bangladesh সেই তালিকায় নেই — যখন Master\'s আর PhD holder-রা nationality নির্বিশেষে dependant আনতে পারেন।',
  ),
  costs: { official: [LIVING_ESTIMATE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b('What do you need to study a Bachelor’s in Malaysia from Bangladesh?', 'Bangladesh থেকে Malaysia-এ Bachelor\'s পড়তে কী কী লাগে?'),
          [
            b(
              'EMGS’s own FAQ states the main requirement is at least 12 years of education, with a national or international examination recognised by the Ministry of Education for admission to a diploma or degree programme, plus English proficiency since most courses are taught in English, an offer from a Malaysian institution, and — since Bangladesh is not visa-exempt and is on EMGS’s own SEV list — the full EMGS→Immigration Student Pass and Single Entry Visa process.',
              'EMGS-এর নিজের FAQ বলে মূল শর্ত অন্তত 12 বছরের education, diploma বা degree programme-এ ভর্তির জন্য Ministry of Education-এর স্বীকৃত একটি national বা international examination, সঙ্গে English proficiency কারণ অধিকাংশ course English-এ পড়ানো হয়, একটি Malaysian institution-এর offer, আর — Bangladesh visa-exempt না আর EMGS-এর নিজের SEV তালিকায় আছে বলে — পূর্ণ EMGS→Immigration Student Pass আর Single Entry Visa process।',
            ),
            CHECK_UNI,
          ],
          [MY_EMGS_FAQ],
          { status: 'verified' },
        ),
        qa(
          'hsc',
          b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'),
          [
            b(
              'Not verified yet as a single nationwide grade-conversion rule — Universiti Malaya’s own FAQ page lists its own accepted qualification categories (SPM/O-Level/IGCSE for pre-university entry; STPM/Matriculation/A-Level/IB/HSC/Grade 12 for direct Bachelor’s entry) and names HSC specifically as one accepted equivalent, which is encouraging, but a dedicated, nationwide HSC-grade-to-Malaysian-system conversion formula applicable at every institution was not found on an official page read for this guide. Each applicant should confirm directly with their chosen institution.',
              'একক জাতীয় grade-conversion নিয়ম হিসেবে এখনো যাচাই হয়নি — Universiti Malaya-র নিজের FAQ page তার নিজস্ব গ্রহণযোগ্য যোগ্যতার category তালিকাভুক্ত করে (pre-university ভর্তির জন্য SPM/O-Level/IGCSE; সরাসরি Bachelor\'s ভর্তির জন্য STPM/Matriculation/A-Level/IB/HSC/Grade 12) আর বিশেষভাবে HSC-কে একটি গ্রহণযোগ্য সমতুল্য হিসেবে নাম দেয়, যা উৎসাহজনক, কিন্তু প্রতিটি institution-এ প্রযোজ্য একটি নিবেদিত, জাতীয় HSC-grade-to-Malaysian-system conversion formula এই guide-এর জন্য পড়া official page-এ পাওয়া যায়নি। প্রতিটি আবেদনকারীর সরাসরি তার বাছা institution-এর সাথে নিশ্চিত করা উচিত।',
            ),
          ],
          [MY_UM_HOW_TO_APPLY],
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
          [
            b(
              'Deadlines are set per institution, not nationally. Universiti Malaya’s own "How To Apply" page, for example, lists an international undergraduate application window opening in February and closing in August–September for its October intake, and a separate window for its March intake — each institution runs its own calendar, so always check your own target university directly.',
              'Deadline প্রতি institution অনুযায়ী ঠিক হয়, জাতীয়ভাবে নয়। Universiti Malaya-র নিজের "How To Apply" page, উদাহরণস্বরূপ, এর October intake-এর জন্য February-তে খোলা আর August–September-এ বন্ধ হওয়া একটি international undergraduate application window তালিকাভুক্ত করে, আর March intake-এর জন্য আলাদা একটি window — প্রতিটি institution নিজস্ব calendar চালায়, তাই সবসময় সরাসরি আপনার বাছা university চেক করুন।',
            ),
          ],
          [MY_UM_HOW_TO_APPLY],
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
              'Not a single nationwide minimum — EMGS’s own page lists which English tests it accepts for the VAL application (MUET, IELTS, TOEFL iBT, TOEFL Essentials, PTE Academic, several Cambridge English exams, Linguaskill and OET) but not one universal passing score; each institution and programme sets its own minimum. Universiti Malaya’s own FAQ exempts applicants whose country’s national language is English, or who studied in English-medium education, from a separate test. Monash University Malaysia’s own English-requirements page sets a specific minimum (IELTS 7, with no band below 6.5) for its Arts, Business and Economics, Education and Law programmes specifically — illustrating how far figures vary by institution and course.',
              'একক জাতীয় ন্যূনতম না — EMGS-এর নিজের page VAL application-এর জন্য গ্রহণযোগ্য English test তালিকাভুক্ত করে (MUET, IELTS, TOEFL iBT, TOEFL Essentials, PTE Academic, কয়েকটি Cambridge English exam, Linguaskill, আর OET) কিন্তু একটি সার্বজনীন পাস স্কোর না; প্রতিটি institution আর programme নিজস্ব ন্যূনতম ঠিক করে। Universiti Malaya-র নিজের FAQ এমন আবেদনকারীদের একটি আলাদা test থেকে ছাড় দেয় যাদের দেশের জাতীয় ভাষা English, বা যারা English-medium education-এ পড়েছেন। Monash University Malaysia-র নিজের English-requirements page তার Arts, Business and Economics, Education, আর Law programme-এর জন্য বিশেষভাবে একটি নির্দিষ্ট ন্যূনতম (IELTS 7, কোনো band 6.5-এর নিচে না) ঠিক করে — দেখায় সংখ্যা institution আর course অনুযায়ী কতটা আলাদা হতে পারে।',
            ),
          ],
          [MY_EMGS_REQUIRED_DOCS, MY_UM_HOW_TO_APPLY],
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
          b('How much is a Bachelor’s in Malaysia?', 'Malaysia-এ Bachelor\'s-এ খরচ কত?'),
          [
            b(
              'Set per institution, not nationally, and generally far below Europe-style figures. UPM’s own international-fees document lists most Bachelor’s programmes around RM 5,000–8,125 per semester (roughly RM 10,000–16,250/year) depending on the programme. A private international-branch campus sits in a very different bracket: Monash University Malaysia’s own fees page lists international-student annual tuition from about RM 53,280 (Bachelor of Psychology) up to RM 148,320/year (Bachelor of Medical Science and Doctor of Medicine), several times the typical public-university figure.',
              'Institution অনুযায়ী ঠিক হয়, জাতীয়ভাবে নয়, আর সাধারণত Europe-style সংখ্যার চেয়ে অনেক কম। UPM-এর নিজের international-fees document অনুযায়ী অধিকাংশ Bachelor\'s programme প্রতি সেমিস্টারে প্রায় RM 5,000–8,125 (বছরে প্রায় RM 10,000–16,250), programme অনুযায়ী। একটি private international-branch campus একটি ভিন্ন bracket-এ: Monash University Malaysia-র নিজের fees page অনুযায়ী international-student বার্ষিক tuition প্রায় RM 53,280 (Bachelor of Psychology) থেকে RM 148,320/বছর (Bachelor of Medical Science and Doctor of Medicine) পর্যন্ত, সাধারণ public-university সংখ্যার চেয়ে কয়েক গুণ বেশি।',
            ),
            CHECK_UNI,
          ],
          [MY_UPM_FEES],
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
  card: b('A relevant Bachelor’s needed · Master’s/PhD Student Pass holders may bring dependants regardless of nationality · MIS scholarship exists but Bangladesh not named as a recipient country', 'সম্পর্কিত Bachelor\'s লাগে · Master\'s/PhD Student Pass holder-রা nationality নির্বিশেষে dependant আনতে পারেন · MIS scholarship আছে কিন্তু Bangladesh recipient country হিসেবে নাম দেওয়া হয়নি'),
  intro: b(
    'Master’s admission in Malaysia follows the same institution-by-institution pattern as Bachelor’s, needing a relevant Bachelor’s degree. Unlike Bachelor’s-level applicants, Master’s and PhD Student Pass holders may bring eligible dependants (spouse, children, parents and parents-in-law) to Malaysia regardless of nationality, per the Immigration Department’s own page — dependants are not themselves allowed to work. The Ministry of Higher Education’s own Malaysia International Scholarship (MIS) funds full tuition plus a RM 1,500/month living allowance for eligible postgraduates, but its own 2026 guidelines name "recipient countries" exhaustively and Bangladesh is not among them, so Bangladeshi eligibility is not confirmed. As with Bachelor’s level, you must apply through EMGS before travelling and obtain Malaysia’s Single Entry Visa (SEV, required for Bangladesh) only after the eVAL is issued.',
    'Malaysia-এ Master\'s ভর্তি Bachelor\'s-এর মতোই একই institution-by-institution ধারা অনুসরণ করে, একটি সম্পর্কিত Bachelor\'s degree লাগে। Bachelor\'s-level আবেদনকারীদের মতো না, Master\'s আর PhD Student Pass holder-রা nationality নির্বিশেষে যোগ্য dependant (spouse, children, parents, আর parents-in-law) Malaysia-এ আনতে পারেন, Immigration Department-এর নিজের page অনুযায়ী — dependant-রা নিজেরা কাজ করতে পারবেন না। Ministry of Higher Education-এর নিজের Malaysia International Scholarship (MIS) যোগ্য postgraduate-দের জন্য পূর্ণ tuition সঙ্গে মাসে RM 1,500 living allowance দেয়, কিন্তু এর নিজের 2026 guidelines "recipient countries" সম্পূর্ণভাবে নাম দেয় আর Bangladesh তাদের মধ্যে নেই, তাই Bangladeshi eligibility নিশ্চিত না। Bachelor\'s level-এর মতোই, যাওয়ার আগে EMGS-এর মাধ্যমে আবেদন করতে হবে আর eVAL ইস্যু হওয়ার পরই Malaysia-র Single Entry Visa (SEV, Bangladesh-এর জন্য প্রয়োজনীয়) পেতে হবে।',
  ),
  costs: { official: [LIVING_ESTIMATE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b('What do you need for a Master’s in Malaysia?', 'Malaysia-এ Master\'s-এ কী লাগে?'),
          [
            b(
              'A relevant Bachelor’s degree (or equivalent) recognised by the institution, per each institution’s own admission page; Universiti Malaya’s own FAQ states that for Master’s/PhD applications there is only one channel — direct application through its own MAYA Portal, for Malaysian and international applicants alike. The Malaysia International Scholarship’s own 2026 guidelines additionally require a CGPA of 3.00 (2nd Class Upper Honours) or higher at Bachelor’s level and an IELTS of 6.0+ (or TOEFL PBT 550+) for its own applicants, though MIS eligibility itself is not confirmed for Bangladesh.',
              'Institution-এর স্বীকৃত একটি সম্পর্কিত Bachelor\'s degree (বা সমতুল্য), প্রতিটি institution-এর নিজের admission page অনুযায়ী; Universiti Malaya-র নিজের FAQ বলে Master\'s/PhD application-এর জন্য একটাই channel আছে — তার নিজের MAYA Portal-এর মাধ্যমে সরাসরি application, Malaysian আর international আবেদনকারী দুটোর জন্যই। Malaysia International Scholarship-এর নিজের 2026 guidelines অতিরিক্তভাবে তার নিজের আবেদনকারীদের জন্য Bachelor\'s level-এ CGPA 3.00 (2nd Class Upper Honours) বা বেশি আর IELTS 6.0+ (বা TOEFL PBT 550+) চায়, যদিও MIS eligibility নিজেই Bangladesh-এর জন্য নিশ্চিত না।',
            ),
          ],
          [MY_UM_HOW_TO_APPLY, MY_MOHE_MIS_GUIDELINES],
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
              'Deadlines and application fees are set per institution. Universiti Malaya’s own fee schedule lists an international-student application fee of RM 500 for Foundation, Bachelor’s, Master’s and Doctoral full-time applications, while UPM’s own how-to-apply document lists a non-refundable USD 65/RM 280 application fee. Each institution’s own graduate-admissions office should be checked directly for the exact window and procedure for your intended programme.',
              'Deadline আর application fee প্রতি institution অনুযায়ী ঠিক হয়। Universiti Malaya-র নিজের fee schedule Foundation, Bachelor\'s, Master\'s, আর Doctoral full-time application-এর জন্য RM 500 international-student application fee তালিকাভুক্ত করে, যখন UPM-এর নিজের how-to-apply document একটি non-refundable USD 65/RM 280 application fee তালিকাভুক্ত করে। আপনার ইচ্ছিত programme-এর জন্য সঠিক window আর procedure সরাসরি প্রতিটি institution-এর নিজের graduate-admissions office-এ চেক করা উচিত।',
            ),
          ],
          [MY_UM_HOW_TO_APPLY],
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
              'Not a single nationwide minimum — institutions set their own. The Malaysia International Scholarship’s own 2026 guidelines require IELTS 6.0 or higher (or TOEFL PBT 550+) for its own scholars specifically; other institutions and programmes set their own, separate requirements. Always confirm your own programme directly.',
              'একক জাতীয় ন্যূনতম না — institution-রা নিজস্ব শর্ত ঠিক করে। Malaysia International Scholarship-এর নিজের 2026 guidelines তার নিজের scholar-দের জন্য বিশেষভাবে IELTS 6.0 বা বেশি (বা TOEFL PBT 550+) চায়; অন্য institution আর programme নিজস্ব, আলাদা শর্ত ঠিক করে। সবসময় সরাসরি আপনার নিজের programme নিশ্চিত করুন।',
            ),
          ],
          [MY_MOHE_MIS_GUIDELINES],
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
          b('How much is a Master’s in Malaysia?', 'Malaysia-এ Master\'s-এ খরচ কত?'),
          [
            b(
              'Like Bachelor’s level, public-university Master’s tuition is set per institution and is generally far lower than at a private international-branch campus. The Malaysia International Scholarship (MIS) can cover full tuition plus RM 1,500/month living costs for eligible scholars at a long list of named public and some private universities — but MIS eligibility for Bangladesh specifically is not confirmed from the official pages read for this guide.',
              'Bachelor\'s level-এর মতোই, public-university Master\'s tuition institution অনুযায়ী ঠিক হয় আর সাধারণত একটি private international-branch campus-এর চেয়ে অনেক কম। Malaysia International Scholarship (MIS) নামযুক্ত public আর কিছু private university-র একটি দীর্ঘ তালিকায় যোগ্য scholar-দের জন্য পূর্ণ tuition সঙ্গে মাসে RM 1,500 জীবনযাত্রার খরচ কভার করতে পারে — কিন্তু বিশেষভাবে Bangladesh-এর জন্য MIS eligibility এই guide-এর জন্য পড়া official page থেকে নিশ্চিত না।',
            ),
            CHECK_UNI,
          ],
          [MY_MOHE_MIS_GUIDELINES],
          { status: 'partly-verified' },
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
  card: b('A relevant Master’s needed · dependants allowed regardless of nationality · same EMGS→Immigration Student Pass process as other degrees', 'সম্পর্কিত Master\'s লাগে · nationality নির্বিশেষে dependant অনুমোদিত · অন্য degree-র মতোই একই EMGS→Immigration Student Pass process'),
  intro: b(
    'A PhD at a Malaysian university generally needs a relevant Master’s degree and a research proposal; exact admission requirements (interview, specific supervisor acceptance, minimum CGPA) are set at university or faculty level, not nationally, and were not itemized in detail on the official pages read for this guide, beyond Universiti Malaya’s own statement that Master’s/PhD applicants use a single, direct application channel (the MAYA Portal) and the Malaysia International Scholarship’s own PhD-specific age/CGPA/English rules for its own scholars. As with other degree levels, Bangladeshi applicants must apply through EMGS before travelling, obtain the eVAL from the Immigration Department, and then Malaysia’s Single Entry Visa (SEV), and can then work up to 20 hours a week during semester breaks only, with prior Immigration Department approval. PhD Student Pass holders may bring dependants regardless of nationality.',
    'Malaysian university-তে একটি PhD-এ সাধারণত একটি সম্পর্কিত Master\'s degree আর একটি research proposal লাগে; সঠিক ভর্তির শর্ত (interview, নির্দিষ্ট supervisor-এর গ্রহণ, ন্যূনতম CGPA) জাতীয়ভাবে না, university বা faculty level-এ ঠিক হয়, আর এই guide-এর জন্য পড়া official page-এ বিস্তারিতভাবে তালিকাভুক্ত হয়নি, Universiti Malaya-র নিজের বক্তব্য ছাড়া যে Master\'s/PhD আবেদনকারীরা একটি একক, সরাসরি application channel (MAYA Portal) ব্যবহার করেন আর Malaysia International Scholarship-এর নিজের তার scholar-দের জন্য PhD-specific বয়স/CGPA/English নিয়ম। অন্য degree level-এর মতোই, Bangladeshi আবেদনকারীদের যাওয়ার আগে EMGS-এর মাধ্যমে আবেদন করতে হবে, Immigration Department থেকে eVAL পেতে হবে, তারপর Malaysia-র Single Entry Visa (SEV), আর তারপর শুধু semester break-এ, Immigration Department-এর পূর্ব অনুমোদন নিয়ে সপ্তাহে 20 ঘণ্টা পর্যন্ত কাজ করতে পারেন। PhD Student Pass holder-রা nationality নির্বিশেষে dependant আনতে পারেন।',
  ),
  costs: { official: [LIVING_ESTIMATE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Malaysia?', 'Malaysia-এ কীভাবে PhD পাওয়া যায়?'),
          [
            b(
              'Not verified yet as general nationwide rules: apply directly through your chosen Malaysian university’s own single Master’s/PhD channel (Universiti Malaya’s own FAQ names this as the MAYA Portal), with a relevant Master’s degree and a research proposal. Exact requirements (interview, minimum grades, supervisor acceptance) are set at university or faculty level, not nationally. The Immigration Department’s own Student Pass rules (EMGS screening, eVAL, SEV, the 20-hour/semester-break work rule, and dependants allowed regardless of nationality) apply the same way to PhD students as to Bachelor’s and Master’s students, since they turn on the Student Pass category and level, not the degree subject.',
              'সাধারণ জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: আপনার বাছা Malaysian university-র নিজস্ব একক Master\'s/PhD channel-এর মাধ্যমে সরাসরি আবেদন করুন (Universiti Malaya-র নিজের FAQ এটাকে MAYA Portal বলে নাম দেয়), একটি সম্পর্কিত Master\'s degree আর একটি research proposal সহ। সঠিক শর্ত (interview, ন্যূনতম grade, supervisor-এর গ্রহণ) জাতীয়ভাবে না, university বা faculty level-এ ঠিক হয়। Immigration Department-এর নিজের Student Pass নিয়ম (EMGS screening, eVAL, SEV, 20-ঘণ্টা/semester-break কাজের নিয়ম, আর nationality নির্বিশেষে অনুমোদিত dependant) PhD student-দের জন্যও Bachelor\'s আর Master\'s student-দের মতোই একইভাবে প্রযোজ্য, কারণ এটা Student Pass category আর level-এর উপর নির্ভর করে, degree subject-এর উপর না।',
            ),
            CHECK_UNI,
          ],
          [MY_UM_HOW_TO_APPLY],
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
              'Not verified yet as a single general rule: each university or supervisor states its own language expectations, which were not itemized nationally on the pages read for this guide, beyond the Malaysia International Scholarship’s own requirement of IELTS 6.0+ (or TOEFL PBT 550+) for its own PhD scholars specifically.',
              'সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: প্রতিটি university বা supervisor নিজের ভাষার প্রত্যাশা দেয়, যা এই guide-এর জন্য পড়া page-এ জাতীয়ভাবে তালিকাভুক্ত হয়নি, Malaysia International Scholarship-এর নিজের PhD scholar-দের জন্য বিশেষভাবে IELTS 6.0+ (বা TOEFL PBT 550+) শর্ত ছাড়া।',
            ),
          ],
          [MY_MOHE_MIS_GUIDELINES],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ the country

export const MY_GUIDE: CountryGuide = {
  code: 'MY',
  checkedAt: MY_READ,
  sourcesPerSection: true,
  intro: b(
    'Malaysia is not an EU/Schengen country, and its international-student system runs through Education Malaysia Global Services (EMGS) — a Ministry of Higher Education company that is the official, mandatory gateway for every application — which screens applicants before forwarding them to the Immigration Department of Malaysia, which alone issues the electronic Visa Approval Letter (eVAL) and later endorses the Student Pass in your passport after arrival. Bangladesh is on EMGS’s own list of countries additionally needing a Single Entry Visa (SEV), applied for through Malaysia’s eVISA portal only after the eVAL is issued; EMGS’s own client charter targets 14 working days for a complete application, and the eVAL is valid for 6 months. Compulsory, locally purchased health insurance (roughly RM 498–644/year through EMGS-partnered insurers) and a post-arrival medical screening within 7 days are both required. Work during study is capped at 20 hours a week and allowed only during semester breaks or holidays longer than 7 days, at approved workplaces, with prior Immigration Department approval arranged through your institution — and only for Student Pass holders at public or private higher-education institutions, not language-centre students. No official, Bangladesh-specific minimum bank-balance figure was found; institutions instead manage a refundable personal bond with the Immigration Department. After graduating, Malaysia’s Graduate Pass lets eligible graduates stay and work for up to 12 months without an employer sponsor — but EMGS’s own page names the eligible nationalities exhaustively (31 countries), and Bangladesh is not among them, so this post-study pathway is not open to Bangladeshi graduates on the pages read for this guide. Tuition at public universities (UPM, UM, UKM, UTM) is generally far below Europe-style figures, while a private international-branch campus such as Monash University Malaysia charges several times more. The Ministry of Higher Education’s own Malaysia International Scholarship (MIS) funds postgraduate study for an exhaustively named list of "recipient countries" that does not include Bangladesh. This guide is built from the Immigration Department of Malaysia (imi.gov.my), EMGS (educationmalaysia.gov.my / visa.educationmalaysia.gov.my), the High Commission of Malaysia in Dhaka (kln.gov.my), MOHE’s own scholarship portal, and university pages.',
    'Malaysia EU/Schengen দেশ না, আর এর international-student system Education Malaysia Global Services (EMGS)-এর মাধ্যমে চলে — একটি Ministry of Higher Education company যা প্রতিটি application-এর official, বাধ্যতামূলক গেটওয়ে — যা আবেদনকারীদের screen করে তারপর Immigration Department of Malaysia-এ পাঠায়, যা একাই electronic Visa Approval Letter (eVAL) ইস্যু করে আর পরে পৌঁছানোর পর আপনার passport-এ Student Pass endorse করে। Bangladesh EMGS-এর নিজের সেই দেশের তালিকায় আছে যাদের অতিরিক্তভাবে Single Entry Visa (SEV) লাগে, যা eVAL ইস্যু হওয়ার পরই Malaysia-র eVISA portal-এর মাধ্যমে আবেদন করতে হয়; EMGS-এর নিজের client charter একটি সম্পূর্ণ application-এর জন্য 14 working days লক্ষ্য রাখে, আর eVAL 6 মাস valid। বাধ্যতামূলক, স্থানীয়ভাবে কেনা health insurance (EMGS-partnered insurer-দের মাধ্যমে বছরে প্রায় RM 498–644) আর পৌঁছানোর 7 দিনের মধ্যে একটি post-arrival medical screening দুটোই প্রয়োজন। পড়ার সময় কাজ সপ্তাহে 20 ঘণ্টায় সীমিত আর শুধু semester break বা 7 দিনের বেশি holiday-তে, অনুমোদিত workplace-এ, institution-এর মাধ্যমে Immigration Department-এর পূর্ব অনুমোদন নিয়ে অনুমোদিত — আর শুধু public বা private higher-education institution-এর Student Pass holder-দের জন্য, language-centre student-দের জন্য না। কোনো official, Bangladesh-specific ন্যূনতম bank-balance সংখ্যা পাওয়া যায়নি; এর বদলে institution-রা Immigration Department-এর সাথে একটি refundable personal bond পরিচালনা করে। পড়া শেষে, Malaysia-র Graduate Pass যোগ্য গ্র্যাজুয়েটদের কোনো employer sponsor ছাড়া 12 মাস পর্যন্ত থাকা আর কাজ করার সুযোগ দেয় — কিন্তু EMGS-এর নিজের page যোগ্য nationality-গুলো সম্পূর্ণভাবে নাম দিয়ে তালিকাভুক্ত করে (31টি দেশ), আর Bangladesh তাদের মধ্যে নেই, তাই এই guide-এর জন্য পড়া page অনুযায়ী এই post-study pathway Bangladeshi গ্র্যাজুয়েটদের জন্য খোলা না। Public university-তে (UPM, UM, UKM, UTM) tuition সাধারণত Europe-style সংখ্যার চেয়ে অনেক কম, যখন Monash University Malaysia-র মতো একটি private international-branch campus কয়েক গুণ বেশি নেয়। Ministry of Higher Education-এর নিজের Malaysia International Scholarship (MIS) "recipient countries"-এর একটি সম্পূর্ণভাবে নামযুক্ত তালিকার জন্য postgraduate পড়াশোনার fund দেয় যাতে Bangladesh নেই। এই guide Immigration Department of Malaysia (imi.gov.my), EMGS (educationmalaysia.gov.my / visa.educationmalaysia.gov.my), Dhaka-তে High Commission of Malaysia (kln.gov.my), MOHE-র নিজের scholarship portal, আর university page থেকে তৈরি।',
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [MY_IMI_STUDENT_PASS, MY_EMGS_FAQ, MY_EMGS_GRADUATE_PASS],
      {
        kind: 'guidance',
        list: [
          b('Assuming you can apply for the eVAL and then travel to Malaysia while it is being processed — EMGS’s own page says entering Malaysia before the eVAL is issued is not permitted.', 'ধরে নেওয়া যে eVAL-এর আবেদন করে প্রসেস হওয়ার সময়ই Malaysia-এ যাওয়া যায় — EMGS-এর নিজের page বলে eVAL ইস্যু হওয়ার আগে Malaysia-এ প্রবেশ অনুমোদিত না।'),
          b('Assuming the Graduate Pass (Malaysia’s post-study work option) is open to every nationality — EMGS’s own page names eligible nationalities exhaustively, and Bangladesh is not on that list.', 'ধরে নেওয়া যে Graduate Pass (Malaysia-র post-study কাজের সুযোগ) সব nationality-র জন্য খোলা — EMGS-এর নিজের page যোগ্য nationality সম্পূর্ণভাবে নাম দেয়, আর Bangladesh সেই তালিকায় নেই।'),
          b('Assuming the Malaysia International Scholarship (MIS) covers Bangladesh because it mentions "Asia" broadly or ASEAN/Commonwealth countries — MOHE’s own 2026 guidelines name recipient countries exhaustively, and Bangladesh was not found among them.', 'ধরে নেওয়া যে Malaysia International Scholarship (MIS) Bangladesh কভার করে কারণ এটা বিস্তৃতভাবে "Asia" বা ASEAN/Commonwealth দেশের কথা বলে — MOHE-র নিজের 2026 guidelines recipient country সম্পূর্ণভাবে নাম দেয়, আর তাদের মধ্যে Bangladesh পাওয়া যায়নি।'),
          b('Assuming part-time work is allowed any time during the semester — it is only allowed during semester breaks or holidays longer than 7 days, up to 20 hours a week, with prior Immigration Department approval.', 'ধরে নেওয়া যে semester চলাকালীন যেকোনো সময় part-time কাজ করা যায় — এটা শুধু semester break বা 7 দিনের বেশি holiday-তে, সপ্তাহে 20 ঘণ্টা পর্যন্ত, Immigration Department-এর পূর্ব অনুমোদন নিয়ে অনুমোদিত।'),
          b('Assuming Bachelor’s-level Student Pass holders can bring dependants the way Master’s/PhD holders can — the Immigration Department’s own page restricts Bachelor’s-level dependants to a specific, named list of nationalities that does not include Bangladesh.', 'ধরে নেওয়া যে Bachelor\'s-level Student Pass holder-রা Master\'s/PhD holder-দের মতো dependant আনতে পারেন — Immigration Department-এর নিজের page Bachelor\'s-level dependant-কে একটি নির্দিষ্ট, নামযুক্ত nationality-র তালিকায় সীমিত করে যাতে Bangladesh নেই।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b('What do you need to study a Bachelor’s in Malaysia from Bangladesh?', 'Bangladesh থেকে Malaysia-এ Bachelor\'s পড়তে কী কী লাগে?'), [b('At least 12 years of education with a recognised national/international examination, English proficiency as the programme requires, an offer from a Malaysian institution, and — since Bangladesh is on EMGS’s own SEV list — the full EMGS→Immigration Student Pass and Single Entry Visa process.', 'অন্তত 12 বছরের education সঙ্গে একটি স্বীকৃত national/international examination, programme যতটা চায় তত English proficiency, একটি Malaysian institution-এর offer, আর — Bangladesh EMGS-এর নিজের SEV তালিকায় আছে বলে — পূর্ণ EMGS→Immigration Student Pass আর Single Entry Visa process।')], [MY_EMGS_FAQ]),
    qa('hsc', b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'), [b('UM’s own FAQ names HSC as an accepted equivalent for direct Bachelor’s entry, but a single, nationwide HSC-grade-conversion formula applicable at every institution was not found on an official page for this guide — confirm directly with your chosen institution.', 'UM-এর নিজের FAQ সরাসরি Bachelor\'s ভর্তির জন্য HSC-কে একটি গ্রহণযোগ্য সমতুল্য হিসেবে নাম দেয়, কিন্তু প্রতিটি institution-এ প্রযোজ্য একটি একক, জাতীয় HSC-grade-conversion formula এই guide-এর জন্য কোনো official page-এ পাওয়া যায়নি — সরাসরি আপনার বাছা institution-এর সাথে নিশ্চিত করুন।')], [MY_UM_HOW_TO_APPLY], { status: 'partly-verified' }),
    qa('cost', b('How much does it cost to study in Malaysia?', 'Malaysia-এ পড়াশোনার খরচ কত?'), [b('Public-university tuition is set per institution and is generally far below Europe-style figures (UPM’s own fees run roughly RM 10,000–16,250/year for many Bachelor’s programmes); a private international-branch campus such as Monash charges several times more (RM 53,280–148,320/year). EMGS’s own cost-of-living page cites an average of about USD 582/month.', 'Public-university tuition institution অনুযায়ী ঠিক হয় আর সাধারণত Europe-style সংখ্যার চেয়ে অনেক কম (UPM-এর নিজের fee অনেক Bachelor\'s programme-এর জন্য বছরে প্রায় RM 10,000–16,250); Monash-এর মতো একটি private international-branch campus কয়েক গুণ বেশি নেয় (বছরে RM 53,280–148,320)। EMGS-এর নিজের cost-of-living page গড়ে প্রায় মাসে USD 582 উদ্ধৃত করে।')], [MY_UPM_FEES, MY_EMGS_COST_OF_LIVING], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for Malaysia?', 'Malaysia-এ IELTS কত লাগে?'), [b('Not a single nationwide minimum; EMGS lists accepted test types (MUET, IELTS, TOEFL and others), but each institution and programme sets its own score. Monash’s own Arts/Business/Education/Law programmes ask for IELTS 7 (no band below 6.5); MIS scholars need IELTS 6.0+ — always check your own institution and programme.', 'একক জাতীয় ন্যূনতম না; EMGS গ্রহণযোগ্য test type তালিকাভুক্ত করে (MUET, IELTS, TOEFL, আর অন্যান্য), কিন্তু প্রতিটি institution আর programme নিজস্ব score ঠিক করে। Monash-এর নিজের Arts/Business/Education/Law programme IELTS 7 চায় (কোনো band 6.5-এর নিচে না); MIS scholar-দের IELTS 6.0+ লাগে — সবসময় আপনার নিজের institution আর programme দেখুন।')], [MY_EMGS_REQUIRED_DOCS, MY_MOHE_MIS_GUIDELINES], { status: 'partly-verified' }),
    qa('visa', b('What do you need for the Student Pass and visa?', 'Student Pass আর visa-এর জন্য কী কী লাগে?'), [b('An online EMGS application screened and forwarded to the Immigration Department for the electronic Visa Approval Letter (eVAL); a passport, offer letter, health declaration form, academic transcripts, personal bond and health insurance; and, since Bangladesh is on EMGS’s own SEV list, a Single Entry Visa applied for only after the eVAL is issued.', 'একটি online EMGS application যা screen হয়ে electronic Visa Approval Letter (eVAL)-এর জন্য Immigration Department-এ পাঠানো হয়; একটি passport, offer letter, health declaration form, academic transcript, personal bond, আর health insurance; আর, Bangladesh EMGS-এর নিজের SEV তালিকায় আছে বলে, eVAL ইস্যু হওয়ার পরই আবেদন করা একটি Single Entry Visa।')], [MY_IMI_STUDENT_PASS, MY_EMGS_FAQ]),
    qa('work', b('Can you work while studying in Malaysia?', 'Malaysia-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b('Only up to 20 hours a week, only during semester breaks or holidays longer than 7 days, at approved workplaces, with prior Immigration Department approval arranged through your institution — and only for Student Pass holders at public or private higher-education institutions.', 'শুধু সপ্তাহে 20 ঘণ্টা পর্যন্ত, শুধু semester break বা 7 দিনের বেশি holiday-তে, অনুমোদিত workplace-এ, institution-এর মাধ্যমে Immigration Department-এর পূর্ব অনুমোদন নিয়ে — আর শুধু public বা private higher-education institution-এর Student Pass holder-দের জন্য।')], [MY_EMGS_FAQ, MY_EMGS_PART_TIME_WORK]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('Not verified yet that Bangladesh is eligible for the Malaysia International Scholarship (MIS). MOHE’s own 2026 guidelines name "recipient countries" exhaustively, and Bangladesh was not found among them. No Bangladesh-specific, full-degree Malaysian government scholarship was found.', 'Malaysia International Scholarship (MIS)-এর জন্য Bangladesh যোগ্য কিনা তা এখনো যাচাই হয়নি। MOHE-র নিজের 2026 guidelines "recipient countries" সম্পূর্ণভাবে নাম দেয়, আর তাদের মধ্যে Bangladesh পাওয়া যায়নি। কোনো Bangladesh-specific, full-degree Malaysian government scholarship পাওয়া যায়নি।')], [MY_MOHE_MIS_GUIDELINES], { status: 'not-verified' }),
    qa('after', b('Can you stay in Malaysia after graduating?', 'পড়া শেষে Malaysia-এ থাকা যায়?'), [b('Malaysia’s Graduate Pass lets eligible graduates stay and work for up to 12 months without an employer sponsor — but EMGS’s own page names the eligible nationalities exhaustively (31 countries) and Bangladesh is not among them, so this pathway is not open to Bangladeshi graduates on the pages read for this guide.', 'Malaysia-র Graduate Pass যোগ্য গ্র্যাজুয়েটদের কোনো employer sponsor ছাড়া 12 মাস পর্যন্ত থাকা আর কাজ করার সুযোগ দেয় — কিন্তু EMGS-এর নিজের page যোগ্য nationality সম্পূর্ণভাবে নাম দেয় (31টি দেশ) আর Bangladesh তাদের মধ্যে নেই, তাই এই guide-এর জন্য পড়া page অনুযায়ী এই pathway Bangladeshi গ্র্যাজুয়েটদের জন্য খোলা না।')], [MY_EMGS_GRADUATE_PASS]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('Not verified yet: no official, Bangladesh-specific minimum bank-balance figure was found on the pages read for this guide; institutions instead manage a refundable personal bond with the Immigration Department, whose exact amount varies by country of origin.', 'এখনো যাচাই হয়নি: এই guide-এর জন্য পড়া page-এ কোনো official, Bangladesh-specific ন্যূনতম bank-balance সংখ্যা পাওয়া যায়নি; এর বদলে institution-রা Immigration Department-এর সাথে একটি refundable personal bond পরিচালনা করে, যার সঠিক পরিমাণ দেশ অনুযায়ী আলাদা।')], [MY_EMGS_REQUIRED_DOCS], { status: 'not-verified' }),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Passport, offer letter, health declaration form, academic transcripts, an English-proficiency certificate, the institution-managed personal bond, compulsory locally purchased health insurance, and (for Bangladesh) the Single Entry Visa after the eVAL.', 'Passport, offer letter, health declaration form, academic transcript, একটি English-proficiency certificate, institution-পরিচালিত personal bond, বাধ্যতামূলক স্থানীয়ভাবে কেনা health insurance, আর (Bangladesh-এর জন্য) eVAL-এর পরে Single Entry Visa।')], [MY_EMGS_REQUIRED_DOCS]),
    qa('masters', b('What do you need for a Master’s?', 'Master\'s-এ কী লাগে?'), [b('A relevant Bachelor’s degree, applied for through a single direct Master’s/PhD application channel at most institutions. Master’s Student Pass holders may bring dependants regardless of nationality, unlike Bachelor’s-level holders.', 'একটি সম্পর্কিত Bachelor\'s degree, অধিকাংশ institution-এ একটি একক সরাসরি Master\'s/PhD application channel-এর মাধ্যমে আবেদন করতে হয়। Master\'s Student Pass holder-রা nationality নির্বিশেষে dependant আনতে পারেন, Bachelor\'s-level holder-দের মতো না।')], [MY_UM_HOW_TO_APPLY]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Not verified yet as general nationwide rules: usually a relevant Master’s degree, a research proposal and acceptance by a supervisor, whose exact requirements are set at university level, not nationally, and were not itemized in detail on the pages read for this guide.', 'সাধারণ জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: সাধারণত একটি সম্পর্কিত Master\'s degree, একটি research proposal, আর একজন supervisor দ্বারা গ্রহণ, যার সঠিক শর্ত জাতীয়ভাবে না, university level-এ ঠিক হয়, আর এই guide-এর জন্য পড়া page-এ বিস্তারিতভাবে তালিকাভুক্ত হয়নি।')], [MY_UM_HOW_TO_APPLY], { status: 'not-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — Monash University Malaysia, Universiti Kebangsaan Malaysia, Universiti Malaya, Universiti Putra Malaysia and Universiti Teknologi Malaysia — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — Monash University Malaysia, Universiti Kebangsaan Malaysia, Universiti Malaya, Universiti Putra Malaysia, আর Universiti Teknologi Malaysia — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [MY_UPM_FEES]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: Bangladesh is on EMGS’s own Single Entry Visa (SEV)-required list; Malaysia has a High Commission in Dhaka handling visa-related matters. Bangladesh is NOT on EMGS’s own Graduate Pass eligible-nationality list and was NOT found named on MOHE’s own Malaysia International Scholarship recipient-country list, or on the Immigration Department’s own list of nationalities whose Bachelor’s-level Student Pass holders may bring dependants — these are stated plainly as officially excluded or not confirmed, rather than guessed.', 'Bangladesh-এর জন্য যাচাই করা: Bangladesh EMGS-এর নিজের Single Entry Visa (SEV)-প্রয়োজনীয় তালিকায় আছে; Malaysia-র Dhaka-তে একটি High Commission আছে যা visa-সংক্রান্ত বিষয় পরিচালনা করে। Bangladesh EMGS-এর নিজের Graduate Pass যোগ্য-nationality তালিকায় নেই আর MOHE-র নিজের Malaysia International Scholarship recipient-country তালিকায়, বা Immigration Department-এর নিজের সেই nationality-র তালিকায় (যাদের Bachelor\'s-level Student Pass holder dependant আনতে পারেন) পাওয়া যায়নি — এগুলো অনুমান না করে সরাসরি officially বাদ বা নিশ্চিত না বলা হয়েছে।'),
    ], [MY_KLN_DHAKA, MY_IMI_SEV_LIST, MY_EMGS_GRADUATE_PASS, MY_MOHE_MIS_GUIDELINES], { status: 'verified' }),
  ],
  life: [
    qa('arrival', b('What happens when you arrive?', 'পৌঁছানোর পর কী হয়?'), [b('You must complete the Malaysia Digital Arrival Card (MDAC) online, as early as 3 days before arrival; present your printed eVAL, your Single Entry Visa (if applicable) and your institution’s offer letter at Immigration on arrival; and undergo a post-arrival medical screening within 7 days, at an EMGS panel clinic or your public university’s in-house clinic, per EMGS’s and UM’s own pages. After passing the medical check, your institution submits your Student Pass endorsement application at the Immigration office nearest its address; the Student Pass is usually issued for up to 1 year at a time and renewed as needed.', 'EMGS আর UM-এর নিজের page অনুযায়ী, আপনাকে পৌঁছানোর 3 দিন আগে থেকেই Malaysia Digital Arrival Card (MDAC) অনলাইনে পূরণ করতে হবে; পৌঁছানোর পর Immigration-এ আপনার printed eVAL, Single Entry Visa (প্রযোজ্য হলে), আর আপনার institution-এর offer letter দেখাতে হবে; আর পৌঁছানোর 7 দিনের মধ্যে একটি EMGS panel clinic বা আপনার public university-র in-house clinic-এ post-arrival medical screening করাতে হবে। Medical check pass করার পর, আপনার institution তার address-এর কাছের Immigration office-এ আপনার Student Pass endorsement application জমা দেয়; Student Pass সাধারণত একবারে 1 বছর পর্যন্ত ইস্যু হয় আর প্রয়োজনে renew হয়।')], [MY_EMGS_FAQ, MY_UM_HOW_TO_APPLY]),
  ],
  documents: MY_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'funds-to-show', kind: 'guidance', status: 'not-verified', source: MY_EMGS_REQUIRED_DOCS },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { min: 20, max: 20, unit: 'hours/week (semester breaks or holidays longer than 7 days only, with prior Immigration approval)', text: b('Up to 20 hours a week, only during semester breaks or holidays longer than 7 days, with prior Immigration Department approval.', 'সপ্তাহে 20 ঘণ্টা পর্যন্ত, শুধু semester break বা 7 দিনের বেশি holiday-তে, Immigration Department-এর পূর্ব অনুমোদন নিয়ে।') }, source: MY_EMGS_FAQ },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { min: 0, max: 0, unit: 'months (Graduate Pass; Bangladesh is not on the eligible-nationality list)', text: b('Malaysia’s Graduate Pass offers up to 12 months, but Bangladesh is not on EMGS’s own eligible-nationality list, so this pathway is not open to Bangladeshi graduates.', 'Malaysia-র Graduate Pass 12 মাস পর্যন্ত দেয়, কিন্তু Bangladesh EMGS-এর নিজের যোগ্য-nationality তালিকায় নেই, তাই এই pathway Bangladeshi গ্র্যাজুয়েটদের জন্য খোলা না।') }, source: MY_EMGS_GRADUATE_PASS },
    { id: 'public-tuition', kind: 'estimate', status: 'partly-verified', value: { min: 10000, max: 16250, unit: 'RM/year (UPM’s own published Bachelor’s-fee range; other public universities set their own)', text: b('Roughly RM 10,000–16,250/year at UPM for many Bachelor’s programmes — an example, not a nationwide figure.', 'UPM-এ অনেক Bachelor\'s programme-এর জন্য বছরে প্রায় RM 10,000–16,250 — একটি উদাহরণ, জাতীয় সংখ্যা না।') }, source: MY_UPM_FEES },
  ],
};

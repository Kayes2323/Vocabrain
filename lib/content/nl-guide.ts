import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  NL_IND_BACKGROUND,
  NL_IND_FEES,
  NL_IND_INCOME_STUDY,
  NL_IND_MVV,
  NL_IND_ORIENTATION_YEAR,
  NL_IND_REQUIRED_AMOUNTS,
  NL_IND_STUDY_PERMIT,
  NL_LABOUR_FOREIGN_STUDENTS,
  NL_READ,
  NL_STUDYINNL_HEALTHCARE,
  NL_STUDYINNL_SCHOLARSHIP,
  NL_STUDYINNL_TUITION,
  NL_STUDYINNL_VISA,
  NL_TUDELFT_BSC_INTL_ADMISSION,
  NL_TUDELFT_TUITION,
  NL_UU_BACHELOR_APPLY_EXAMPLE,
  NL_UU_BACHELOR_TUITION,
  NL_UU_MASTER_TUITION,
  NL_UVA_BACHELOR_APPLY,
  NL_UVA_TUITION,
  NL_WORLDWIDE_MVV_BD,
} from './nl-sources';

/**
 * Netherlands reading guide, researched on its own from Dutch official
 * sources (the Immigration and Naturalisation Service — IND, ind.nl — the
 * Ministry of Justice and Security's residence-permit and visa authority;
 * Netherlands Worldwide, the Ministry of Foreign Affairs' consular portal;
 * the Netherlands Labour Authority, the Ministry of Social Affairs and
 * Employment's work-permit authority; Study in NL / studyinnl.org, the
 * Dutch-government-backed, Nuffic-run study-abroad promotion site; and
 * university pages). Nothing is taken from another country's guide. Amounts
 * stay in euros exactly as each source states them and are never converted.
 * It covers English-taught programmes for non-EU/EEA (Bangladeshi) students.
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
  "The University of Amsterdam, Delft University of Technology, Utrecht University, Leiden University and Erasmus University Rotterdam are not identical: each sets its own institutional (non-EU) tuition fee per programme, deadline and entry requirements. Always check the exact programme on the institution's own admissions page.",
  'University of Amsterdam, Delft University of Technology, Utrecht University, Leiden University, আর Erasmus University Rotterdam একরকম না: প্রতিটি নিজের institutional (non-EU) tuition fee প্রতি programme, deadline, আর ভর্তির শর্ত ঠিক করে। প্রতিটি programme-এর জন্য প্রতিষ্ঠানের নিজের admissions page অবশ্যই দেখে নিন।',
);

// ------------------------------------------------------------------ shared answers

const visaRequired = (id: string) =>
  qa(
    id,
    b('Does a Bangladeshi student need a visa to study in the Netherlands?', 'Bangladesh-এর student-দের Netherlands-এ পড়তে visa লাগে কি?'),
    [
      b(
        'Yes. For a stay of more than 90 days, non-EU/EEA nationals generally need both an entry visa (the regular provisional residence permit, "machtiging tot voorlopig verblijf" or MVV) and a residence permit for study ("verblijfsvergunning voor studie"). Bangladesh is not an EU/EEA/Swiss country, so Bangladeshi applicants need the MVV. The MVV and the residence permit are applied for together in one procedure, and your host educational institution — a recognised sponsor of the IND — normally submits the application on your behalf.',
        'হ্যাঁ। 90 দিনের বেশি থাকার জন্য, non-EU/EEA নাগরিকদের সাধারণত একটি entry visa (regular provisional residence permit, "machtiging tot voorlopig verblijf" বা MVV) আর পড়ার জন্য একটি residence permit ("verblijfsvergunning voor studie") দুটোই লাগে। Bangladesh EU/EEA/Swiss দেশ না, তাই Bangladeshi আবেদনকারীদের MVV লাগে। MVV আর residence permit একসাথে একটি procedure-এ আবেদন করা হয়, আর আপনার host educational institution — IND-এর একটি recognised sponsor — সাধারণত আপনার পক্ষে আবেদন জমা দেয়।',
      ),
      b(
        'The Netherlands has an Embassy process for Bangladesh: once the IND approves the application, you collect your MVV visa sticker through Netherlands Worldwide’s own Bangladesh page for the Netherlands’ representation there.',
        'Bangladesh-এর জন্য Netherlands-এর একটি Embassy process আছে: IND application অনুমোদন করার পর, আপনি Netherlands Worldwide-এর নিজের Bangladesh page-এর মাধ্যমে আপনার MVV visa sticker সংগ্রহ করেন।',
      ),
    ],
    [NL_IND_MVV, NL_STUDYINNL_VISA, NL_WORLDWIDE_MVV_BD],
    { allDegrees: true },
  );

const visaProcess = (id: string) =>
  qa(
    id,
    b('How does the MVV and residence-permit application work, and what does it cost?', 'MVV আর residence-permit আবেদন কীভাবে কাজ করে, আর খরচ কত?'),
    [
      b(
        'Your educational institution (an IND-recognised sponsor, which must have signed the Code of Conduct for International Students in Higher Education) submits the combined MVV-plus-residence-permit application to the IND on your behalf, after first checking you meet the requirements, including that you have enough money to live on. The IND then usually decides within about 2 weeks. The official fee for a first application for study, or for a change of purpose of stay, is EUR 254 (valid 1 January to 31 December of the fee year; fees change every 1 January).',
        'আপনার educational institution (একটি IND-recognised sponsor, যারা Code of Conduct for International Students in Higher Education-এ সাইন করেছে) আপনার পক্ষে IND-এ combined MVV-plus-residence-permit application জমা দেয়, প্রথমে আপনি শর্ত পূরণ করেন কিনা, যেমন থাকা-খাওয়ার জন্য পর্যাপ্ত টাকা আছে কিনা, তা চেক করার পর। IND তারপর সাধারণত প্রায় 2 সপ্তাহের মধ্যে সিদ্ধান্ত নেয়। পড়ার জন্য প্রথম আবেদনের, বা purpose of stay পরিবর্তনের, official fee হলো EUR 254 (1 January থেকে 31 December fee year-এর জন্য valid; fee প্রতি 1 January বদলায়)।',
      ),
      b(
        'The IND organises several central award days each summer, around the start of the academic year, when thousands of students collect their residence documents at a central location; without this document, students cannot get healthcare insurance or open a bank account.',
        'IND প্রতি বছর গ্রীষ্মে শিক্ষাবর্ষের শুরুর কাছাকাছি কয়েকটি central award day চালায়, যখন হাজার হাজার student একটি central location-এ তাদের residence document সংগ্রহ করে; এই document ছাড়া, student-রা healthcare insurance পেতে বা bank account খুলতে পারে না।',
      ),
    ],
    [NL_IND_STUDY_PERMIT, NL_IND_BACKGROUND, NL_IND_FEES, NL_WORLDWIDE_MVV_BD],
    { allDegrees: true },
  );

const stayLimit = (id: string) =>
  qa(
    id,
    b('How long is the student residence permit valid?', 'Student residence permit কতদিন valid থাকে?'),
    [
      b(
        'The IND issues the student residence permit for the duration of your studies plus 3 months, with a maximum of 5 years, and only for as long as you keep meeting the requirements — for example, you must obtain at least 50% of your study credits each year.',
        'IND student residence permit আপনার পড়ার সময়কাল + 3 মাসের জন্য জারি করে, সর্বোচ্চ 5 বছর পর্যন্ত, আর যতদিন আপনি শর্ত পূরণ করে যান — যেমন, প্রতি বছর অন্তত 50% study credit পেতে হয়।',
      ),
    ],
    [NL_IND_BACKGROUND],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'You must show you have enough money to live and study in the Netherlands for 12 months. The required monthly amount is called the "study norm", set each 1 January; for 2026 it is EUR 1,130.77 a month for higher professional education (hbo) or university study, meaning about EUR 13,569 for 12 months. This figure does not include school or tuition fees. You can show it in several ways — on your own bank account, deposited with your educational institution, through a scholarship declaration, or through a financial-support statement from a company or a named person abroad or in the Netherlands — with documents no older than 3 months, each study year.',
        'আপনাকে দেখাতে হয় যে Netherlands-এ 12 মাস থাকা-খাওয়া আর পড়ার জন্য পর্যাপ্ত টাকা আছে। প্রয়োজনীয় মাসিক পরিমাণকে বলা হয় "study norm", প্রতি 1 January ঠিক হয়; 2026-এর জন্য এটা higher professional education (hbo) বা university পড়ার জন্য মাসে EUR 1,130.77, মানে 12 মাসের জন্য প্রায় EUR 13,569। এই সংখ্যায় school বা tuition fee ধরা নেই। এটা কয়েকভাবে দেখানো যায় — নিজের bank account-এ, educational institution-এর কাছে জমা দিয়ে, একটি scholarship declaration দিয়ে, বা বিদেশের বা Netherlands-এর একজন কোম্পানি বা নির্দিষ্ট ব্যক্তির financial-support statement দিয়ে — প্রতি study year-এ 3 মাসের বেশি পুরনো না এমন document দিয়ে।',
      ),
    ],
    [NL_IND_INCOME_STUDY, NL_IND_REQUIRED_AMOUNTS],
    { allDegrees: true },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('Is health insurance compulsory?', 'Health insurance কি বাধ্যতামূলক?'),
    [
      b(
        'Yes, by Dutch law you must have health insurance. If you are in the Netherlands for study purposes only, you are legally not allowed to take out Dutch public health insurance — instead you must have health insurance from your home country with enough coverage, or take out private health insurance. If you also take up paid work (not just an unpaid or study-linked placement), different rules apply and you may be required to take out Dutch public health insurance instead.',
        'হ্যাঁ, Dutch law অনুযায়ী আপনার health insurance থাকতে হবে। শুধু পড়ার উদ্দেশ্যে Netherlands-এ থাকলে, আপনি আইনত Dutch public health insurance নিতে পারবেন না — এর পরিবর্তে আপনার দেশের একটি health insurance থাকতে হবে পর্যাপ্ত coverage-সহ, বা একটি private health insurance নিতে হবে। আপনি যদি paid কাজও করেন (শুধু unpaid বা পড়া-সম্পর্কিত placement না), তাহলে আলাদা নিয়ম প্রযোজ্য হয় আর তার বদলে Dutch public health insurance নিতে হতে পারে।',
      ),
    ],
    [NL_STUDYINNL_HEALTHCARE],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in the Netherlands, and how many hours?', 'Netherlands-এ পড়ার পাশাপাশি কাজ করা যায় কি, আর কত ঘণ্টা?'),
    [
      b(
        'Yes, but with a choice between two limits, as stated by the IND and the Netherlands Labour Authority: either work a maximum of 16 hours a week during the academic year, or work full-time in June, July and August only. Your employer, not you, must apply to the Employee Insurance Agency (UWV) for a work permit (TWV) before you start, unless your residence document already states "no employment restrictions". The application must state how many hours you will work and which of the two options applies.',
        'হ্যাঁ, কিন্তু IND আর Netherlands Labour Authority অনুযায়ী দুইটি সীমার মধ্যে একটি বাছতে হয়: হয় শিক্ষাবর্ষে সপ্তাহে সর্বোচ্চ 16 ঘণ্টা কাজ, বা শুধু June, July আর August-এ full-time কাজ। আপনার employer-কে, আপনাকে না, শুরুর আগে Employee Insurance Agency (UWV)-এ একটি work permit (TWV)-এর আবেদন করতে হয়, যদি না আপনার residence document-এ ইতিমধ্যে "no employment restrictions" লেখা থাকে। Application-এ বলতে হয় আপনি কত ঘণ্টা কাজ করবেন আর দুটোর মধ্যে কোনটা প্রযোজ্য।',
      ),
    ],
    [NL_IND_BACKGROUND, NL_LABOUR_FOREIGN_STUDENTS],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in the Netherlands to work after graduating?', 'পড়া শেষে Netherlands-এ কাজের জন্য থাকা যায়?'),
    [
      b(
        'Yes, through the residence permit for orientation year ("zoekjaar"), intended for recent graduates, PhD holders and researchers to look for a job or start a business so that the knowledge they gained stays in the Netherlands. The IND background article describes it as letting former students "stay in the Netherlands for a year"; the fee for a first application is EUR 254. During the orientation year you have unrestricted access to the Dutch labour market (no separate TWV work permit is needed the way it is during study), but you cannot take out Dutch public health insurance until you actually start working.',
        'হ্যাঁ, residence permit for orientation year ("zoekjaar")-এর মাধ্যমে, সদ্য graduate, PhD holder, আর researcher-দের জন্য, চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য যাতে তাদের অর্জিত জ্ঞান Netherlands-এ থেকে যায়। IND-এর background article এটাকে বর্ণনা করে সাবেক student-দের "Netherlands-এ এক বছর" থাকতে দেওয়া হিসেবে; প্রথম আবেদনের fee EUR 254। Orientation year-এর সময় Dutch labour market-এ আপনার অনিয়ন্ত্রিত প্রবেশাধিকার থাকে (পড়ার সময়ের মতো আলাদা TWV work permit লাগে না), কিন্তু আসলে কাজ শুরু না করা পর্যন্ত Dutch public health insurance নিতে পারবেন না।',
      ),
    ],
    [NL_IND_ORIENTATION_YEAR, NL_IND_BACKGROUND, NL_IND_FEES, NL_STUDYINNL_HEALTHCARE],
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'The NL Scholarship (formerly the Holland Scholarship), financed by the Ministry of Education, Culture and Science together with participating institutions and run by Nuffic, is genuinely open to Bangladeshi applicants: its eligibility criteria name only "non-EEA nationality", without naming or excluding Bangladesh, and you apply through the participating institution you are admitted to rather than needing a separate nomination. It is a one-off EUR 5,000 payment in your first year — the page states clearly this is not a full-tuition scholarship — for full-time bachelor’s or master’s study at one of the participating institutions, which changes each year.',
        'NL Scholarship (আগে Holland Scholarship), Ministry of Education, Culture and Science আর participating institution-দের অর্থায়নে, Nuffic চালিত, Bangladeshi আবেদনকারীদের জন্য আসলেই খোলা: এর যোগ্যতার শর্ত শুধু "non-EEA nationality" বলে, Bangladesh-কে নাম বা বাদ না দিয়ে, আর আলাদা nomination না লাগিয়ে আপনি যে participating institution-এ ভর্তি হয়েছেন তার মাধ্যমে আবেদন করেন। এটা প্রথম বছরে একটি EUR 5,000 one-off payment — page স্পষ্টভাবে বলে এটা full-tuition scholarship না — participating institution-গুলোর একটিতে full-time bachelor\'s বা master\'s পড়ার জন্য, যা প্রতি বছর বদলায়।',
      ),
    ],
    [NL_STUDYINNL_SCHOLARSHIP],
    { status: 'partly-verified', kind: 'guidance' },
  );

// ------------------------------------------------------------------ documents

const IND = b('The IND, or your educational institution as its recognised sponsor.', 'IND, বা আপনার educational institution তার recognised sponsor হিসেবে।');

export const NL_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Needed for the MVV and residence-permit application and as your identity document throughout your stay.', 'MVV আর residence-permit আবেদনে আর থাকার পুরো সময় পরিচয়ের document হিসেবে লাগে।'),
    who: IND,
    when: b('From the application through collecting your residence document.', 'Application থেকে আপনার residence document সংগ্রহ পর্যন্ত।'),
    where: b('Submitted as part of your institution’s application to the IND, and shown when collecting your MVV in Bangladesh.', 'আপনার institution-এর IND-তে application-এর অংশ হিসেবে জমা দিতে হয়, আর Bangladesh-এ MVV সংগ্রহের সময় দেখাতে হয়।'),
    prepare: b('Keep it valid well beyond your intended stay.', 'প্রত্যাশিত থাকার সময়ের চেয়ে বেশ বেশি valid রাখুন।'),
    groups: ['general', 'visa'],
    sources: [NL_IND_MVV],
  },
  {
    id: 'acceptance',
    name: b('Letter of admission', 'ভর্তির admission letter'),
    why: b('Proves your purpose of stay; your educational institution must be an IND-recognised sponsor before it can apply for your permit at all.', 'থাকার উদ্দেশ্য প্রমাণ করে; আপনার educational institution-কে আপনার permit-এর জন্য আবেদনের আগে একটি IND-recognised sponsor হতে হবে।'),
    who: b('The Dutch institution you applied to.', 'যে Dutch institution-এ আবেদন করছেন।'),
    when: b('After admission, before the IND application.', 'ভর্তির পর, IND application-এর আগে।'),
    where: b('Held by the institution, which submits the combined application to the IND on your behalf.', 'Institution এটা রাখে, যারা আপনার পক্ষে IND-তে combined application জমা দেয়।'),
    prepare: b('Only institutions recognised by the IND, which have signed the Code of Conduct for International Students in Higher Education, may sponsor a student residence permit.', 'শুধু IND-recognised institution, যারা Code of Conduct for International Students in Higher Education-এ সাইন করেছে, একজন student residence permit-এর sponsor হতে পারে।'),
    groups: ['general', 'visa'],
    sources: [NL_IND_BACKGROUND],
  },
  {
    id: 'academic',
    name: b('Secondary-school or prior-degree certificates', 'Secondary-school বা আগের degree-র সনদ'),
    why: b('University document (before admission): shows your previous education; each institution sets its own foreign-qualification assessment, typically checked against the Dutch pre-university (VWO) level for bachelor’s entry.', 'University-র document (ভর্তির আগে): আগের পড়া দেখায়; প্রতিটি institution নিজস্ব বিদেশি-যোগ্যতা মূল্যায়নের নিয়ম ঠিক করে, bachelor\'s ভর্তির জন্য সাধারণত Dutch pre-university (VWO) level-এর বিপরীতে checked হয়।'),
    who: b('The institution/programme you apply to.', 'যে institution/programme-এ আবেদন করছেন।'),
    when: b('With your application, by the institution’s own deadline.', 'Institution-এর নিজস্ব শেষ তারিখের মধ্যে আবেদনের সঙ্গে।'),
    where: b('Submitted via Studielink (the national Dutch application portal) and the institution’s own admissions system.', 'Studielink (জাতীয় Dutch application portal) আর institution-এর নিজস্ব admissions system-এর মাধ্যমে জমা দিতে হয়।'),
    prepare: b('A Bangladeshi secondary-school (HSC) certificate was not itemized on an official country-by-country equivalence list read for this guide — ask your chosen institution’s admissions office directly.', 'একটি Bangladeshi secondary-school (HSC) সনদ এই guide-এর জন্য পড়া কোনো official country-by-country সমতুল্যতার তালিকায় তালিকাভুক্ত ছিল না — সরাসরি আপনার বাছা institution-এর admissions office-কে জিজ্ঞাসা করুন।'),
    groups: ['general', 'program', 'bangladesh'],
    status: 'not-verified',
    sources: [NL_TUDELFT_BSC_INTL_ADMISSION],
  },
  {
    id: 'english',
    name: b('English proficiency proof', 'ইংরেজি দক্ষতার প্রমাণ'),
    why: b('University document for English-taught programmes; accepted tests and minimum scores are set by each institution. TU Delft’s English-taught bachelor’s programmes ask TOEFL iBT 90 or IELTS Academic 6.5 overall (certificates issued within the last 2 years); other universities set their own scores per programme.', 'ইংরেজি-মাধ্যম programme-এর university document; গ্রহণযোগ্য test আর ন্যূনতম score প্রতিটি institution ঠিক করে। TU Delft-এর ইংরেজি-মাধ্যম bachelor\'s programme TOEFL iBT 90 বা IELTS Academic 6.5 overall চায় (শেষ 2 বছরের মধ্যে ইস্যু করা সনদ); অন্য university নিজস্ব score প্রতি programme ঠিক করে।'),
    who: b('The institution/programme you apply to.', 'যে institution/programme-এ আবেদন করছেন।'),
    when: b('By the programme’s deadline; TU Delft requires the certificate to be issued within 2 years of the application.', 'Programme-এর শেষ তারিখের মধ্যে; TU Delft application-এর 2 বছরের মধ্যে ইস্যু করা সনদ চায়।'),
    where: b('Uploaded to the institution’s own application system.', 'Institution-এর নিজস্ব application system-এ upload করতে হয়।'),
    prepare: b('Scores differ by institution and programme (e.g. TU Delft’s Dutch-taught bachelor’s programmes ask only TOEFL iBT 70/IELTS 5.5); always check your own programme.', 'Score institution আর programme অনুযায়ী আলাদা (যেমন, TU Delft-এর Dutch-মাধ্যম bachelor\'s programme শুধু TOEFL iBT 70/IELTS 5.5 চায়); সবসময় আপনার নিজের programme দেখুন।'),
    groups: ['program'],
    sources: [NL_TUDELFT_BSC_INTL_ADMISSION],
  },
  {
    id: 'funds',
    name: b('Proof of sufficient resources', 'পর্যাপ্ত টাকার প্রমাণ'),
    why: b('IND requirement: proof of the "study norm" (EUR 1,130.77/month for hbo/university in 2026) for 12 months, shown via a bank statement, a deposit with the institution, a scholarship declaration, or a financial-support statement from a company or a named financier.', 'IND-র শর্ত: "study norm"-এর (2026-এ hbo/university-র জন্য মাসে EUR 1,130.77) 12 মাসের প্রমাণ, একটি bank statement, institution-এ জমা, একটি scholarship declaration, বা একটি কোম্পানি বা নির্দিষ্ট financier-এর financial-support statement দিয়ে দেখাতে হয়।'),
    who: IND,
    when: b('With the application, and again each study year.', 'Application-এর সঙ্গে, আর প্রতি study year-এ আবার।'),
    where: b('Submitted with your institution’s IND application.', 'আপনার institution-এর IND application-এর সঙ্গে জমা দিতে হয়।'),
    prepare: b('Documents must not be older than 3 months and must show the date, your name, account number, balance and the bank’s contact details; a joint account needs an added statement that you may freely use the money.', 'Document 3 মাসের বেশি পুরনো হতে পারবে না আর তাতে date, আপনার নাম, account number, balance, আর bank-এর contact details দেখাতে হবে; joint account-এ টাকা মুক্তভাবে ব্যবহার করতে পারার একটি statement লাগে।'),
    groups: ['visa', 'bangladesh'],
    sources: [NL_IND_INCOME_STUDY, NL_IND_REQUIRED_AMOUNTS],
  },
  {
    id: 'insurance',
    name: b('Health insurance proof', 'Health insurance-এর প্রমাণ'),
    why: b('Compulsory by Dutch law; students here for study purposes only must show either sufficient home-country coverage or a private policy, since they are not legally allowed to take out Dutch public health insurance.', 'Dutch law অনুযায়ী বাধ্যতামূলক; শুধু পড়ার উদ্দেশ্যে থাকা student-দের পর্যাপ্ত home-country coverage বা একটি private policy দেখাতে হয়, কারণ তারা আইনত Dutch public health insurance নিতে পারেন না।'),
    who: b('A private insurer or your home-country insurer.', 'একটি private insurer বা আপনার দেশের insurer।'),
    when: b('Before and throughout your stay.', 'থাকার আগে আর পুরো সময়।'),
    where: b('Kept as personal proof; not submitted to the IND as a stated visa document on the pages read for this guide.', 'ব্যক্তিগত প্রমাণ হিসেবে রাখতে হয়; এই guide-এর জন্য পড়া page-এ IND-কে একটি নির্দিষ্ট visa document হিসেবে জমা দেওয়ার কথা বলা নেই।'),
    prepare: b('If you later take up paid work, different Wlz insurance rules apply — contact the Sociale Verzekeringsbank (SVB) for an assessment.', 'পরে paid কাজ শুরু করলে, আলাদা Wlz insurance নিয়ম প্রযোজ্য হয় — মূল্যায়নের জন্য Sociale Verzekeringsbank (SVB)-এর সাথে যোগাযোগ করুন।'),
    groups: ['visa', 'arrival'],
    sources: [NL_STUDYINNL_HEALTHCARE],
  },
];

// ------------------------------------------------------------------ costs (EUR, never converted)

const FUNDS_YEAR1: GuideCost = { id: 'funds-living', label: b('Funds to show (official study norm, 12 months)', 'দেখানোর টাকা (official study norm, 12 মাস)'), value: b('EUR 1,130.77/month for 12 months (about EUR 13,569) for higher professional education or university study, the 2026 study norm', 'Higher professional education বা university পড়ার জন্য মাসে EUR 1,130.77, 12 মাসের জন্য (প্রায় EUR 13,569), 2026-এর study norm'), amount: { value: 1130.77, currency: 'EUR', period: 'month' }, source: NL_IND_INCOME_STUDY };
const VISA_FEE: GuideCost = { id: 'visa-fee', label: b('MVV + residence permit (study), first application', 'MVV + residence permit (পড়া), প্রথম আবেদন'), value: b('EUR 254, the IND’s official fee for a first study application or change of purpose of stay', 'EUR 254, প্রথম study application বা purpose of stay পরিবর্তনের জন্য IND-র official fee'), amount: { value: 254, currency: 'EUR', period: 'one-time' }, source: NL_IND_FEES };
const UNVERIFIED: GuideCost[] = [
  { id: 'application-handling-fee', label: b('University application/handling fee', 'University application/handling fee'), value: b('At some Dutch institutions, non-EEA applicants or those without prior Dutch education pay an application or handling fee of EUR 75 to EUR 100; fees and refund conditions vary by institution and were not itemized nationally for this guide — check your chosen institution.', 'কিছু Dutch institution-এ, non-EEA আবেদনকারী বা আগের Dutch education না থাকা আবেদনকারীরা EUR 75 থেকে EUR 100 একটি application বা handling fee দেন; fee আর refund শর্ত institution অনুযায়ী আলাদা আর এই guide-এর জন্য জাতীয়ভাবে তালিকাভুক্ত হয়নি — আপনার বাছা institution দেখুন।'), status: 'not-verified', source: NL_STUDYINNL_TUITION },
  { id: 'living', label: b('Living costs beyond the official study-norm figure', 'Official study-norm সংখ্যার বাইরে থাকা-খাওয়ার খরচ'), value: b('The EU Study in Europe country profile and Study in NL both give a general estimate of about EUR 1,000–1,500 a month for living costs, separate from the IND’s own study-norm figure used for the visa requirement; this is an estimate, not an official per-city breakdown.', 'EU Study in Europe country profile আর Study in NL দুটোই থাকা-খাওয়ার খরচের জন্য মাসে প্রায় EUR 1,000–1,500-এর একটি সাধারণ আনুমানিক হিসাব দেয়, visa শর্তের জন্য ব্যবহৃত IND-র নিজের study-norm সংখ্যা থেকে আলাদা; এটা একটি estimate, official per-city ভাঙন না।'), status: 'not-verified', source: NL_STUDYINNL_TUITION },
];

// ------------------------------------------------------------------ common sections

const commonTail = () => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [{ embed: 'costs' as const }] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa('types', b('Which universities are there?', 'কোন কোন university আছে?'), [b('The examples below — the University of Amsterdam, Delft University of Technology, Utrecht University, Leiden University and Erasmus University Rotterdam — are listed alphabetically, not ordered by quality. Tuition, deadlines, entry requirements and scholarships differ at each one, so check the official page.', 'নিচের উদাহরণ — University of Amsterdam, Delft University of Technology, Utrecht University, Leiden University, আর Erasmus University Rotterdam — বর্ণানুক্রমে, মান অনুযায়ী নয়। Tuition, deadline, ভর্তির শর্ত আর scholarship প্রতিটিতে আলাদা, তাই official page দেখুন।')], [NL_UVA_TUITION]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work'), insurance('insurance')] },
  { id: 'visa', title: b('Student visa and permit', 'Student visa আর permit'), items: [visaRequired('visa-required'), visaProcess('visa-process'), stayLimit('stay-limit')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Apply via Studielink + the institution · MVV + EUR 1,130.77/month funds · Orientation year gives 12 months after graduating', 'Studielink + institution-এর মাধ্যমে আবেদন · MVV + মাসে EUR 1,130.77 টাকা · Orientation year গ্র্যাজুয়েশনের পর 12 মাস দেয়'),
  intro: b(
    "For an English-taught bachelor's in the Netherlands, you need a secondary-school certificate the institution considers equivalent to the Dutch pre-university (VWO) diploma, the institution's own English-proficiency score (TU Delft's English-taught bachelor's programmes, for example, ask TOEFL iBT 90 or IELTS 6.5), and — because the Netherlands has a numerus fixus (capped) system for some popular programmes — an application submitted through Studielink, the national Dutch application portal, by the relevant deadline (as early as 15 January for capped programmes). As a Bangladeshi applicant you need an MVV entry visa and a residence permit for study, applied for together, usually by the institution on your behalf once admitted.",
    "Netherlands-এ ইংরেজি-মাধ্যম bachelor's-এর জন্য লাগে institution-এর কাছে Dutch pre-university (VWO) diploma-র সমতুল্য বিবেচিত একটি secondary-school সনদ, institution-এর নিজস্ব English-দক্ষতার score (যেমন, TU Delft-এর ইংরেজি-মাধ্যম bachelor's programme TOEFL iBT 90 বা IELTS 6.5 চায়), আর — Netherlands-এ কিছু জনপ্রিয় programme-এর জন্য numerus fixus (capped) system থাকায় — Studielink, জাতীয় Dutch application portal-এর মাধ্যমে প্রাসঙ্গিক শেষ তারিখের মধ্যে (capped programme-এর জন্য 15 January পর্যন্ত আগে) একটি application। Bangladeshi আবেদনকারী হিসেবে একটি MVV entry visa আর পড়ার জন্য একটি residence permit লাগে, একসাথে আবেদন করা হয়, সাধারণত ভর্তি হলে institution আপনার পক্ষে করে।",
  ),
  costs: { official: [FUNDS_YEAR1, VISA_FEE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in the Netherlands from Bangladesh?", "Bangladesh থেকে Netherlands-এ Bachelor's পড়তে কী কী লাগে?"),
          [b('A secondary-school certificate the institution recognises as equivalent to the Dutch VWO diploma, the institution’s own English-proficiency score, an application submitted via Studielink by the institution’s deadline, proof of the study norm (EUR 1,130.77/month for 12 months in 2026) for the MVV/residence-permit application, and the MVV itself.', 'Institution-এর কাছে Dutch VWO diploma-র সমতুল্য স্বীকৃত একটি secondary-school সনদ, institution-এর নিজের English-দক্ষতার score, institution-এর শেষ তারিখের মধ্যে Studielink-এর মাধ্যমে জমা দেওয়া একটি application, MVV/residence-permit application-এর জন্য study norm-এর (2026-এ 12 মাসের জন্য মাসে EUR 1,130.77) প্রমাণ, আর MVV নিজে।'), CHECK_UNI],
          [NL_TUDELFT_BSC_INTL_ADMISSION, NL_IND_INCOME_STUDY],
          { status: 'partly-verified' },
        ),
        qa(
          'hsc',
          b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'),
          [b('Not verified yet for Bangladesh specifically as a single national rule: TU Delft’s own country-specific admission list names an accepted or non-accepted diploma for dozens of countries (and states some, such as the WAEC or NSC, are not considered equivalent to VWO), but a dedicated Bangladesh-HSC entry was not found on the page read for this guide — ask your chosen institution’s admissions office directly, as requirements can differ between institutions too.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে একটি একক জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: TU Delft-এর নিজের country-specific admission list কয়েক দশটি দেশের জন্য একটি গ্রহণযোগ্য বা অ-গ্রহণযোগ্য diploma নাম দেয় (আর বলে কিছু, যেমন WAEC বা NSC, VWO-র সমতুল্য বিবেচিত হয় না), কিন্তু এই guide-এর জন্য পড়া page-এ Bangladesh-HSC-র জন্য আলাদা কোনো entry পাওয়া যায়নি — সরাসরি আপনার বাছা institution-এর admissions office-কে জিজ্ঞাসা করুন, কারণ শর্ত institution-এর মধ্যেও আলাদা হতে পারে।')],
          [NL_TUDELFT_BSC_INTL_ADMISSION],
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
          [b('Register in Studielink, the national Dutch application portal, from around 1 October for the following September intake, then complete the institution’s own application system once invited. Deadlines differ by programme: TU Delft’s numerus fixus (capped) bachelor’s programmes close on 15 January; many non-capped bachelor’s programmes with a non-Dutch diploma close around 1 April or 1 May.', 'Studielink-এ, জাতীয় Dutch application portal-এ, পরের September intake-এর জন্য প্রায় 1 October থেকে register করুন, তারপর invite পাওয়ার পর institution-এর নিজস্ব application system সম্পূর্ণ করুন। Deadline programme অনুযায়ী আলাদা: TU Delft-এর numerus fixus (capped) bachelor\'s programme 15 January-এ বন্ধ হয়; non-Dutch diploma থাকা অনেক non-capped bachelor\'s programme প্রায় 1 April বা 1 May-এ বন্ধ হয়।')],
          [NL_TUDELFT_BSC_INTL_ADMISSION, NL_UVA_BACHELOR_APPLY],
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
          b("How much IELTS do you need for a Bachelor's in the Netherlands?", "Netherlands-এ Bachelor's-এ IELTS কত লাগে?"),
          [b('Not a single national minimum — set per institution and programme. TU Delft’s English-taught bachelor’s programmes (Aerospace Engineering, Computer Science and Engineering, Nanobiology, Applied Earth Sciences) ask TOEFL iBT 90 or IELTS Academic 6.5 overall (or Cambridge CAE/CPE); its Dutch-taught bachelor’s programmes ask only TOEFL iBT 70/IELTS 5.5 for the English parts of the application. Other universities set their own scores per programme, generally in the same range.', 'একক জাতীয় ন্যূনতম না — institution আর programme অনুযায়ী ঠিক হয়। TU Delft-এর ইংরেজি-মাধ্যম bachelor\'s programme (Aerospace Engineering, Computer Science and Engineering, Nanobiology, Applied Earth Sciences) TOEFL iBT 90 বা IELTS Academic 6.5 overall চায় (বা Cambridge CAE/CPE); এর Dutch-মাধ্যম bachelor\'s programme application-এর ইংরেজি অংশের জন্য শুধু TOEFL iBT 70/IELTS 5.5 চায়। অন্য university নিজস্ব score প্রতি programme ঠিক করে, সাধারণত একই range-এ।'), CHECK_UNI],
          [NL_TUDELFT_BSC_INTL_ADMISSION],
        ),
      ],
    },
    {
      id: 'tuition',
      title: b('Tuition and scholarships', 'Tuition আর scholarship'),
      items: [
        qa(
          'tuition',
          b("How much is a Bachelor's in the Netherlands?", "Netherlands-এ Bachelor's-এ খরচ কত?"),
          [b('The Netherlands has a two-tier fee system: the much lower statutory fee (EUR 2,694 for 2026-2027, rising to EUR 2,771 for 2027-2028) is only for EU/EEA, Swiss and Surinamese nationals; non-EU/EEA students like Bangladeshi applicants generally pay the institutional fee, which each university sets per programme. Study in NL’s own overview gives a general non-EU bachelor’s range of about EUR 9,000–20,000 a year; examples read for this guide include TU Delft’s BSc institutional rate of EUR 19,906 (2026/27), and much higher figures at some University of Amsterdam faculties (over EUR 30,000 for Medicine). See each university’s profile and its own fees page before relying on any single figure.', 'Netherlands-এ একটি two-tier fee system আছে: অনেক কম statutory fee (2026-2027-এর জন্য EUR 2,694, 2027-2028-এর জন্য EUR 2,771-এ বাড়ছে) শুধু EU/EEA, Swiss, আর Surinamese নাগরিকদের জন্য; Bangladeshi আবেদনকারীদের মতো non-EU/EEA student সাধারণত institutional fee দেন, যা প্রতিটি university প্রতি programme ঠিক করে। Study in NL-এর নিজের overview non-EU bachelor\'s-এর জন্য বছরে প্রায় EUR 9,000–20,000-এর একটি সাধারণ range দেয়; এই guide-এর জন্য পড়া উদাহরণে আছে TU Delft-এর BSc institutional rate বছরে EUR 19,906 (2026/27), আর University of Amsterdam-এর কিছু faculty-তে আরও বেশি সংখ্যা (Medicine-এ EUR 30,000-এর বেশি)। কোনো একটি সংখ্যার উপর নির্ভর করার আগে প্রতিটি university-র profile আর তার নিজের fee page দেখুন।')],
          [NL_STUDYINNL_TUITION, NL_TUDELFT_TUITION],
          { kind: 'estimate', status: 'partly-verified' },
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
  card: b('A recognised bachelor’s needed · Studielink + institution portal · Orientation year gives 12 months after graduating', 'স্বীকৃত bachelor\'s লাগে · Studielink + institution portal · Orientation year গ্র্যাজুয়েশনের পর 12 মাস দেয়'),
  intro: b(
    "A Dutch master's needs a recognised bachelor's degree plus the institution's own requirements (grade threshold, English score, sometimes a motivation letter or references). Almost every master's programme in the Netherlands is taught in English, giving the widest choice of any degree level. You register in Studielink and complete each university's own application system; deadlines commonly fall around 1 April for non-EU applicants needing a visa, though this differs by programme. As a Bangladeshi applicant you need an MVV and residence permit for study once admitted.",
    "একটি Dutch master's-এ লাগে স্বীকৃত bachelor's degree সঙ্গে institution-এর নিজস্ব শর্ত (grade threshold, English score, কখনো একটি motivation letter বা referee)। Netherlands-এর প্রায় প্রতিটি master's programme ইংরেজিতে পড়ানো হয়, যা কোনো degree level-এর সবচেয়ে বেশি পছন্দ দেয়। Studielink-এ register করুন আর প্রতিটি university-র নিজস্ব application system সম্পূর্ণ করুন; deadline সাধারণত visa লাগা non-EU আবেদনকারীদের জন্য 1 April-এর কাছাকাছি হয়, যদিও programme অনুযায়ী আলাদা। Bangladeshi আবেদনকারী হিসেবে ভর্তি হলে একটি MVV আর পড়ার জন্য residence permit লাগে।",
  ),
  costs: { official: [FUNDS_YEAR1, VISA_FEE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in the Netherlands?", "Netherlands-এ Master's-এ কী লাগে?"),
          [b('A recognised bachelor’s degree relevant to the programme, the institution’s own English-proficiency score, and usually a motivation letter, CV and/or references, set per programme. Not verified yet for Bangladesh specifically: how institutions assess a Bangladeshi bachelor’s degree grade was not read on an official page for this guide.', 'Programme-এর সাথে সম্পর্কিত একটি স্বীকৃত bachelor\'s degree, institution-এর নিজের English-দক্ষতার score, আর সাধারণত একটি motivation letter, CV আর/বা referee, প্রতি programme ঠিক। Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: institution-গুলো Bangladesh-এর bachelor\'s degree-র grade ঠিক কীভাবে মূল্যায়ন করে, এই guide-এর জন্য কোনো official page-এ পড়া হয়নি।')],
          [NL_UU_MASTER_TUITION],
          { status: 'partly-verified' },
        ),
      ],
    },
    { id: 'apply', title: b('Applying', 'আবেদন'), items: [qa('process', b('How do you apply?', 'কীভাবে আবেদন করবেন?'), [b('Register in Studielink, then complete each university’s own master’s application system; the exact portal, documents and deadline differ by institution and programme — some close as early as 1 April for applicants needing a visa.', 'Studielink-এ register করুন, তারপর প্রতিটি university-র নিজস্ব master\'s application system সম্পূর্ণ করুন; ঠিক portal, document, আর deadline institution আর programme অনুযায়ী আলাদা — কিছু visa লাগা আবেদনকারীদের জন্য 1 April-এর মতো আগে বন্ধ হয়।')], [NL_UU_BACHELOR_APPLY_EXAMPLE], { kind: 'guidance' })] },
    {
      id: 'language',
      title: b('English and IELTS', 'ইংরেজি আর IELTS'),
      items: [
        qa(
          'english',
          b("How much IELTS do you need for a Master's?", "Master's-এ IELTS কত লাগে?"),
          [b('Not a single national minimum — each programme sets its own score, generally in the IELTS 6.5–7.0 (or TOEFL iBT 90–100) range for competitive master’s programmes, per secondary reporting on Dutch admissions; always check your own programme’s official page, since TU Delft and others vary theirs by faculty.', 'একক জাতীয় ন্যূনতম না — প্রতিটি programme নিজস্ব score ঠিক করে, সাধারণত প্রতিযোগিতামূলক master\'s programme-এর জন্য IELTS 6.5–7.0 (বা TOEFL iBT 90–100) range-এ, Dutch admissions-এর উপর secondary report অনুযায়ী; সবসময় আপনার নিজের programme-এর official page দেখুন, কারণ TU Delft আর অন্যরা faculty অনুযায়ী এটা আলাদা করে।')],
          [NL_TUDELFT_BSC_INTL_ADMISSION],
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
          b("How much is a Master's in the Netherlands?", "Netherlands-এ Master's-এ খরচ কত?"),
          [b('Set per programme, not nationally. Study in NL’s own overview gives a general non-EU master’s range of about EUR 12,000–30,000 a year; examples read for this guide include TU Delft’s MSc institutional rate of EUR 25,633 (2026/27), Utrecht University’s International Relations master’s at EUR 21,342–22,000, and much higher figures at some faculties of the University of Amsterdam, Leiden University and Erasmus University Rotterdam (Erasmus Medical Center programmes exceed EUR 32,000). The EU/EEA statutory fee (EUR 2,694 for 2026-2027) does not apply to non-EU/EEA students.', 'প্রতি programme অনুযায়ী ঠিক হয়, জাতীয়ভাবে না। Study in NL-এর নিজের overview non-EU master\'s-এর জন্য বছরে প্রায় EUR 12,000–30,000-এর একটি সাধারণ range দেয়; এই guide-এর জন্য পড়া উদাহরণে আছে TU Delft-এর MSc institutional rate বছরে EUR 25,633 (2026/27), Utrecht University-র International Relations master\'s EUR 21,342–22,000, আর University of Amsterdam, Leiden University, আর Erasmus University Rotterdam-এর কিছু faculty-তে আরও বেশি সংখ্যা (Erasmus Medical Center programme EUR 32,000-এর বেশি)। EU/EEA statutory fee (2026-2027-এর জন্য EUR 2,694) non-EU/EEA student-দের জন্য প্রযোজ্য না।')],
          [NL_STUDYINNL_TUITION, NL_TUDELFT_TUITION, NL_UU_MASTER_TUITION],
          { kind: 'estimate', status: 'partly-verified' },
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
  card: b('A recognised master’s usually needed · often a paid position, not a fee-paying student · Orientation year after graduating', 'সাধারণত স্বীকৃত master\'s লাগে · প্রায়ই একটি paid position, fee-paying student না · গ্র্যাজুয়েশনের পর Orientation year'),
  intro: b(
    "A Dutch PhD usually needs a recognised master's degree and a position with a supervisor or doctoral programme; at many Dutch universities, PhD candidates are formally employed (not fee-paying students), which can change which residence-permit route applies (employee rather than, or alongside, the study route) — this distinction was not fully verified on an official IND page for this guide, so check with your specific university and the IND directly. Apply through the institution's own doctoral-admissions or vacancy process; exact entry requirements, funding and application rounds are set by each institution and were not verified here as general national rules.",
    "একটি Dutch PhD-তে সাধারণত লাগে স্বীকৃত master's degree আর একজন supervisor বা doctoral programme-এর সাথে একটি position; অনেক Dutch university-তে, PhD candidate-রা আনুষ্ঠানিকভাবে employed (fee-paying student না), যা কোন residence-permit route প্রযোজ্য তা বদলে দিতে পারে (employee route, study route-এর বদলে বা সাথে) — এই পার্থক্য এই guide-এর জন্য কোনো official IND page-এ সম্পূর্ণ যাচাই হয়নি, তাই আপনার নির্দিষ্ট university আর সরাসরি IND-এর সাথে চেক করুন। Institution-এর নিজস্ব doctoral-admissions বা vacancy process দিয়ে আবেদন করুন; সঠিক ভর্তির শর্ত, funding, আর আবেদনের সময় প্রতিটি institution ঠিক করে, সাধারণ জাতীয় নিয়ম হিসেবে এখানে যাচাই হয়নি।",
  ),
  costs: { official: [], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in the Netherlands?', 'Netherlands-এ কীভাবে PhD পাওয়া যায়?'),
          [
            b('Not verified yet as a single general rule: you typically need a recognised master’s degree and apply for an advertised PhD vacancy or arrange a position with a supervisor, often as a paid, employed position rather than a fee-paying enrolment, but exact entry requirements beyond this general shape were not confirmed on an official page for this guide — apply through the institution’s own doctoral-admissions or HR vacancy process.', 'সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: সাধারণত লাগে স্বীকৃত master\'s degree আর একটি বিজ্ঞাপিত PhD vacancy-র জন্য আবেদন করা বা একজন supervisor-এর সাথে একটি position ঠিক করা, প্রায়ই একটি fee-paying ভর্তির বদলে একটি paid, employed position হিসেবে, কিন্তু এই সাধারণ ধারার বাইরে সঠিক ভর্তির শর্ত এই guide-এর জন্য কোনো official page-এ নিশ্চিত হয়নি — Institution-এর নিজস্ব doctoral-admissions বা HR vacancy process দিয়ে আবেদন করুন।'),
            CHECK_UNI,
          ],
          [NL_UVA_TUITION],
          { status: 'not-verified' },
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
          [b('Not verified yet as a single general rule: each institution’s doctoral school/supervisor states its own English requirement, where one is required at all for an employed PhD position.', 'সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: প্রতিটি institution-এর doctoral school/supervisor নিজের English শর্ত দেয়, যদি একজন employed PhD position-এর জন্য আদৌ একটি লাগে।')],
          [NL_UVA_TUITION],
          { status: 'not-verified' },
        ),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ the country

export const NL_GUIDE: CountryGuide = {
  code: 'NL',
  checkedAt: NL_READ,
  sourcesPerSection: true,
  intro: b(
    'Bangladesh is not an EU/EEA/Swiss country, so a Bangladeshi applicant needs both an entry visa (the regular provisional residence permit, "MVV") and a residence permit for study, applied for together — usually by your host institution, which must be an IND-recognised sponsor. The official application fee for a first study application is EUR 254. You must show the "study norm" — EUR 1,130.77 a month in 2026 for higher professional education or university study — for 12 months, through a bank statement, institutional deposit, scholarship declaration, or financial-support statement. Health insurance is compulsory by law, but students here for study purposes only may not take out Dutch public health insurance — a home-country or private policy is required instead. During study you may work either up to 16 hours a week in term time, or full-time in June, July and August only, and your employer (not you) needs a work permit (TWV) unless your residence document already waives this. The Netherlands runs a two-tier tuition system: a much lower statutory fee (EUR 2,694 for 2026-2027) for EU/EEA, Swiss and Surinamese students, and a higher institutional fee for everyone else, set per university and programme — Study in NL’s own overview puts non-EU bachelor’s fees around EUR 9,000–20,000 and master’s around EUR 12,000–30,000 a year, though individual programmes (examples read for this guide range from about EUR 14,000 to over EUR 37,000) can fall well outside that range. After graduating, the residence permit for orientation year ("zoekjaar") lets you stay in the Netherlands for a year to look for work or start a business, with unrestricted labour-market access (fee EUR 254). The NL Scholarship (formerly the Holland Scholarship), run with Nuffic, is genuinely open to Bangladeshi applicants by nationality (a one-off EUR 5,000 payment, not full tuition) — unlike some other countries’ national scholarships, it needs no separate nomination, since you apply through your admitting institution. This guide is built from the IND (ind.nl), Netherlands Worldwide (netherlandsworldwide.nl), the Netherlands Labour Authority (nllabourauthority.nl), Study in NL (studyinnl.org) and university pages.',
    'Bangladesh EU/EEA/Swiss দেশ না, তাই একজন Bangladeshi আবেদনকারীর দুটোই লাগে একটি entry visa (regular provisional residence permit, "MVV") আর পড়ার জন্য একটি residence permit, একসাথে আবেদন করা হয় — সাধারণত আপনার host institution, যাকে একটি IND-recognised sponsor হতে হয়। প্রথম study application-এর official application fee EUR 254। আপনাকে "study norm" — 2026-এ higher professional education বা university পড়ার জন্য মাসে EUR 1,130.77 — 12 মাসের জন্য দেখাতে হয়, একটি bank statement, institutional জমা, scholarship declaration, বা financial-support statement দিয়ে। Health insurance আইনত বাধ্যতামূলক, কিন্তু শুধু পড়ার উদ্দেশ্যে থাকা student-রা Dutch public health insurance নিতে পারবে না — এর বদলে একটি home-country বা private policy লাগে। পড়ার সময় হয় শিক্ষাবর্ষে সপ্তাহে 16 ঘণ্টা পর্যন্ত, বা শুধু June, July, আর August-এ full-time কাজ করা যায়, আর আপনার employer-কে (আপনাকে না) একটি work permit (TWV) লাগে যদি না আপনার residence document ইতিমধ্যে এটা মাফ করে। Netherlands একটি two-tier tuition system চালায়: EU/EEA, Swiss, আর Surinamese student-দের জন্য অনেক কম statutory fee (2026-2027-এর জন্য EUR 2,694), আর বাকি সবার জন্য একটি বেশি institutional fee, প্রতি university আর programme ঠিক — Study in NL-এর নিজের overview non-EU bachelor\'s fee প্রায় EUR 9,000–20,000 আর master\'s প্রায় EUR 12,000–30,000 বছরে বলে, যদিও পৃথক programme (এই guide-এর জন্য পড়া উদাহরণ প্রায় EUR 14,000 থেকে EUR 37,000-এর বেশি পর্যন্ত) সেই range-এর বাইরেও যেতে পারে। গ্র্যাজুয়েশনের পর, residence permit for orientation year ("zoekjaar") আপনাকে চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য Netherlands-এ এক বছর থাকতে দেয়, অনিয়ন্ত্রিত labour-market প্রবেশাধিকার সহ (fee EUR 254)। Nuffic-এর সাথে চালানো NL Scholarship (আগে Holland Scholarship) জাতীয়তার দিক থেকে Bangladeshi আবেদনকারীদের জন্য আসলেই খোলা (এককালীন EUR 5,000 payment, full tuition না) — অন্য কিছু দেশের জাতীয় scholarship-এর মতো না, এতে আলাদা কোনো nomination লাগে না, কারণ আপনি আপনার ভর্তি হওয়া institution-এর মাধ্যমে আবেদন করেন। এই guide IND (ind.nl), Netherlands Worldwide (netherlandsworldwide.nl), Netherlands Labour Authority (nllabourauthority.nl), Study in NL (studyinnl.org), আর university page থেকে তৈরি।',
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [NL_IND_MVV, NL_IND_INCOME_STUDY, NL_LABOUR_FOREIGN_STUDENTS],
      {
        kind: 'guidance',
        list: [
          b('Assuming you apply for the visa yourself the way you might elsewhere — for most students, your Dutch educational institution (an IND-recognised sponsor) submits the combined MVV-and-residence-permit application on your behalf.', 'ধরে নেওয়া যে অন্য কোথাও যেমন হয় সেভাবে আপনি নিজে visa-র আবেদন করেন — অধিকাংশ student-এর জন্য, আপনার Dutch educational institution (একটি IND-recognised sponsor) আপনার পক্ষে combined MVV-and-residence-permit application জমা দেয়।'),
          b('Assuming you may work any hours you like with a part-time job — you must choose between 16 hours a week in term time OR full-time only in June/July/August, and your employer needs a work permit (TWV) first.', 'ধরে নেওয়া যে একটি part-time job-এ যত ঘণ্টা ইচ্ছা কাজ করা যায় — term time-এ সপ্তাহে 16 ঘণ্টা বা শুধু June/July/August-এ full-time, এর মধ্যে একটা বাছতে হয়, আর আপনার employer-এর আগে একটি work permit (TWV) লাগে।'),
          b('Assuming the EU/EEA statutory tuition fee (around EUR 2,694–2,771) applies to you — it applies only to EU/EEA, Swiss and Surinamese students; Bangladeshi students pay the higher, programme-set institutional fee.', 'ধরে নেওয়া যে EU/EEA statutory tuition fee (প্রায় EUR 2,694–2,771) আপনার জন্য প্রযোজ্য — এটা শুধু EU/EEA, Swiss, আর Surinamese student-দের জন্য প্রযোজ্য; Bangladeshi student-রা বেশি, programme-ঠিক করা institutional fee দেন।'),
          b('Assuming you can take out Dutch public health insurance as a study-only student — by law you may not; you need home-country or private cover instead, unless you also take up paid work.', 'ধরে নেওয়া যে একজন study-only student হিসেবে Dutch public health insurance নিতে পারবেন — আইন অনুযায়ী পারবেন না; এর বদলে home-country বা private cover লাগে, যদি না আপনি paid কাজও করেন।'),
          b('Underestimating the proof-of-funds requirement — it is the full study norm (EUR 1,130.77/month in 2026) for a full 12 months, not a smaller or one-time figure.', 'টাকার প্রমাণের শর্ত কম ধরা — এটা পুরো 12 মাসের জন্য পুরো study norm (2026-এ মাসে EUR 1,130.77), একটি ছোট বা একবারের সংখ্যা না।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in the Netherlands from Bangladesh?", "Bangladesh থেকে Netherlands-এ Bachelor's পড়তে কী কী লাগে?"), [b('A secondary-school certificate the institution recognises as equivalent to the Dutch VWO diploma, the institution’s own English-proficiency score, an application via Studielink by the deadline, proof of the study norm, and the MVV.', 'Institution-এর কাছে Dutch VWO diploma-র সমতুল্য স্বীকৃত একটি secondary-school সনদ, institution-এর নিজের English-দক্ষতার score, শেষ তারিখের মধ্যে Studielink-এর মাধ্যমে একটি application, study norm-এর প্রমাণ, আর MVV।')], [NL_TUDELFT_BSC_INTL_ADMISSION, NL_IND_INCOME_STUDY], { status: 'partly-verified' }),
    qa('hsc', b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'), [b('Not verified yet for Bangladesh specifically: each institution assesses foreign secondary certificates for VWO-equivalence itself; a dedicated Bangladesh-HSC page was not read for this guide.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: প্রতিটি institution নিজেই VWO-সমতুল্যতার জন্য বিদেশি secondary সনদ মূল্যায়ন করে; এই guide-এর জন্য Bangladesh-HSC-র জন্য আলাদা কোনো page পড়া হয়নি।')], [NL_TUDELFT_BSC_INTL_ADMISSION], { status: 'not-verified' }),
    qa('cost', b('How much does it cost to study in the Netherlands?', 'Netherlands-এ পড়াশোনার খরচ কত?'), [b('There is no single national non-EU fee; Study in NL’s own overview puts non-EU bachelor’s around EUR 9,000–20,000/year and master’s around EUR 12,000–30,000/year, with examples read for this guide (TU Delft, UvA, Utrecht, Leiden, Erasmus) ranging from about EUR 14,000 to over EUR 37,000 depending on faculty, plus the EUR 1,130.77/month study-norm funds requirement and EUR 254 visa fee.', 'একক জাতীয় non-EU fee নেই; Study in NL-এর নিজের overview non-EU bachelor\'s প্রায় EUR 9,000–20,000/বছর আর master\'s প্রায় EUR 12,000–30,000/বছর বলে, এই guide-এর জন্য পড়া উদাহরণে (TU Delft, UvA, Utrecht, Leiden, Erasmus) faculty অনুযায়ী প্রায় EUR 14,000 থেকে EUR 37,000-এর বেশি, সঙ্গে মাসে EUR 1,130.77 study-norm funds শর্ত আর EUR 254 visa fee।')], [NL_STUDYINNL_TUITION, NL_TUDELFT_TUITION], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for the Netherlands?', 'Netherlands-এ IELTS কত লাগে?'), [b('Not a single national minimum; TU Delft’s English-taught bachelor’s programmes ask IELTS 6.5/TOEFL iBT 90, but each institution and programme sets its own score.', 'একক জাতীয় ন্যূনতম না; TU Delft-এর ইংরেজি-মাধ্যম bachelor\'s programme IELTS 6.5/TOEFL iBT 90 চায়, কিন্তু প্রতিটি institution আর programme নিজস্ব score ঠিক করে।')], [NL_TUDELFT_BSC_INTL_ADMISSION], { status: 'partly-verified' }),
    qa('visa', b('What do you need for the MVV and residence permit?', 'MVV আর residence permit-এর জন্য কী কী লাগে?'), [b('A letter of admission from an IND-recognised institution, which usually submits the combined MVV-plus-residence-permit application to the IND for you, proof of the study norm, and the EUR 254 fee.', 'একটি IND-recognised institution-এর একটি admission letter, যারা সাধারণত আপনার জন্য IND-তে combined MVV-plus-residence-permit application জমা দেয়, study norm-এর প্রমাণ, আর EUR 254 fee।')], [NL_IND_STUDY_PERMIT, NL_IND_FEES]),
    qa('work', b('Can you work while studying in the Netherlands?', 'Netherlands-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b('Yes: either up to 16 hours a week during term time, or full-time only in June, July and August, and your employer needs a work permit (TWV) first.', 'হ্যাঁ: হয় শিক্ষাবর্ষে সপ্তাহে 16 ঘণ্টা পর্যন্ত, বা শুধু June, July, আর August-এ full-time, আর আপনার employer-এর আগে একটি work permit (TWV) লাগে।')], [NL_IND_BACKGROUND, NL_LABOUR_FOREIGN_STUDENTS]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('The NL Scholarship (formerly the Holland Scholarship, EUR 5,000 one-off, not full tuition) is genuinely open to Bangladeshi applicants by nationality, applied for through the admitting institution, though it changes which institutions participate each year.', 'NL Scholarship (আগে Holland Scholarship, এককালীন EUR 5,000, full tuition না) জাতীয়তার দিক থেকে Bangladeshi আবেদনকারীদের জন্য আসলেই খোলা, ভর্তি হওয়া institution-এর মাধ্যমে আবেদন করা যায়, যদিও কোন institution participate করে তা প্রতি বছর বদলায়।')], [NL_STUDYINNL_SCHOLARSHIP], { status: 'partly-verified' }),
    qa('after', b('Can you stay in the Netherlands after graduating?', 'পড়া শেষে Netherlands-এ থাকা যায়?'), [b('Yes, via the orientation-year residence permit ("zoekjaar"): a year to look for work or start a business, with unrestricted labour-market access, fee EUR 254.', 'হ্যাঁ, orientation-year residence permit-এর ("zoekjaar") মাধ্যমে: চাকরি খোঁজা বা ব্যবসা শুরু করার জন্য এক বছর, অনিয়ন্ত্রিত labour-market প্রবেশাধিকার সহ, fee EUR 254।')], [NL_IND_ORIENTATION_YEAR, NL_IND_BACKGROUND]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('The 2026 study norm, EUR 1,130.77 a month, for 12 months (about EUR 13,569), shown through a bank statement or an equivalent official document no older than 3 months.', '2026-এর study norm, মাসে EUR 1,130.77, 12 মাসের জন্য (প্রায় EUR 13,569), একটি bank statement বা 3 মাসের বেশি পুরনো না এমন একটি সমতুল্য official document দিয়ে দেখাতে হয়।')], [NL_IND_INCOME_STUDY, NL_IND_REQUIRED_AMOUNTS]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before admission: secondary-school/prior-degree certificates and English proof. At the visa stage: letter of admission, proof of the study norm. Throughout your stay: valid health insurance (home-country or private, not Dutch public insurance).', 'ভর্তির আগে: secondary-school/আগের degree-র সনদ আর English প্রমাণ। Visa পর্যায়ে: admission letter, study norm-এর প্রমাণ। থাকার পুরো সময়: valid health insurance (home-country বা private, Dutch public insurance না)।')], [NL_IND_STUDY_PERMIT, NL_STUDYINNL_HEALTHCARE]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b('A recognised bachelor’s degree relevant to the programme, plus the institution’s own English-proficiency score and usually a motivation letter/CV; apply via Studielink and the university’s own system.', 'Programme-এর সাথে সম্পর্কিত একটি স্বীকৃত bachelor\'s degree, সঙ্গে institution-এর নিজের English-দক্ষতার score আর সাধারণত একটি motivation letter/CV; Studielink আর university-র নিজস্ব system দিয়ে আবেদন করুন।')], [NL_UU_MASTER_TUITION]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Not verified yet as general national rules: usually a recognised master’s degree and an advertised PhD vacancy or a supervisor willing to take you on, often as a paid, employed position rather than a fee-paying enrolment, but exact rules are set per institution.', 'সাধারণ জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: সাধারণত একটি স্বীকৃত master\'s degree আর একটি বিজ্ঞাপিত PhD vacancy বা নিতে ইচ্ছুক একজন supervisor, প্রায়ই একটি fee-paying ভর্তির বদলে একটি paid, employed position হিসেবে, কিন্তু সঠিক নিয়ম প্রতিটি institution ঠিক করে।')], [NL_UVA_TUITION], { status: 'not-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — the University of Amsterdam, Delft University of Technology, Utrecht University, Leiden University and Erasmus University Rotterdam — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — University of Amsterdam, Delft University of Technology, Utrecht University, Leiden University, আর Erasmus University Rotterdam — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [NL_UVA_TUITION]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: Netherlands Worldwide’s own page confirms there is an MVV application route for Bangladesh, and the IND and Study in NL confirm non-EU/EEA nationals (which includes Bangladesh) need the MVV plus residence permit for study. The NL Scholarship does not name or exclude Bangladesh, so Bangladeshi bachelor’s/master’s applicants are genuinely eligible by nationality. No official page read gives a Bangladesh-specific HSC-equivalence rule, a Bangladesh-specific document checklist beyond the general one, or a Bangladesh-specific visa approval-rate figure — these were not verified here.', 'Bangladesh-এর জন্য যাচাই করা: Netherlands Worldwide-এর নিজের page নিশ্চিত করে Bangladesh-এর জন্য একটি MVV application route আছে, আর IND আর Study in NL নিশ্চিত করে non-EU/EEA নাগরিকদের (যার মধ্যে Bangladesh আছে) MVV সঙ্গে পড়ার জন্য residence permit লাগে। NL Scholarship Bangladesh-কে নাম বা বাদ দেয় না, তাই Bangladeshi bachelor\'s/master\'s আবেদনকারীরা জাতীয়তার দিক থেকে আসলেই যোগ্য। পড়া কোনো official page একটি Bangladesh-specific HSC-সমতুল্যতার নিয়ম, সাধারণের বাইরে একটি Bangladesh-specific document checklist, বা একটি Bangladesh-specific visa approval-rate সংখ্যা দেয় না — এগুলো এখানে যাচাই হয়নি।'),
    ], [NL_WORLDWIDE_MVV_BD, NL_IND_MVV, NL_STUDYINNL_SCHOLARSHIP], { status: 'partly-verified' }),
  ],
  life: [
    qa('arrival', b('What happens when you arrive?', 'পৌঁছানোর পর কী হয়?'), [b('Each summer the IND runs several central award days around the start of the academic year, when thousands of students collect their residence documents at a central location; without it, you cannot get health insurance or open a bank account. Keep your health insurance (home-country or private, since you may not take out Dutch public insurance as a study-only student) up to date for your whole stay.', 'প্রতি গ্রীষ্মে IND শিক্ষাবর্ষের শুরুর কাছাকাছি কয়েকটি central award day চালায়, যখন হাজার হাজার student একটি central location-এ তাদের residence document সংগ্রহ করে; এটা ছাড়া, আপনি health insurance পাবেন না বা bank account খুলতে পারবেন না। আপনার health insurance (home-country বা private, কারণ study-only student হিসেবে Dutch public insurance নিতে পারবেন না) থাকার পুরো সময় আপ-টু-ডেট রাখুন।')], [NL_IND_BACKGROUND, NL_STUDYINNL_HEALTHCARE]),
  ],
  documents: NL_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'estimate', status: 'partly-verified', value: { min: 9000, max: 30000, unit: 'EUR/year', text: b('No single national non-EU fee; Study in NL’s own overview puts non-EU bachelor’s around EUR 9,000–20,000/year and master’s around EUR 12,000–30,000/year, though individual programmes can fall outside that range.', 'একক জাতীয় non-EU fee নেই; Study in NL-এর নিজের overview non-EU bachelor\'s প্রায় EUR 9,000–20,000/বছর আর master\'s প্রায় EUR 12,000–30,000/বছর বলে, যদিও পৃথক programme সেই range-এর বাইরেও যেতে পারে।') }, source: NL_STUDYINNL_TUITION },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 13569, unit: 'EUR/year', text: b('About EUR 13,569 for 12 months (the 2026 study norm of EUR 1,130.77/month), per the official figure on ind.nl.', 'ind.nl-এর official figure অনুযায়ী 12 মাসের জন্য প্রায় EUR 13,569 (2026-এর study norm মাসে EUR 1,130.77)।') }, source: NL_IND_INCOME_STUDY },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { min: 16, max: 16, unit: 'hours/week (or full-time in Jun–Aug)', text: b('Up to 16 hours a week during term time, OR full-time only in June, July and August (not both).', 'শিক্ষাবর্ষে সপ্তাহে 16 ঘণ্টা পর্যন্ত, বা শুধু June, July, আর August-এ full-time (দুটো একসাথে না)।') }, source: NL_LABOUR_FOREIGN_STUDENTS },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { min: 12, max: 12, unit: 'months', text: b('12 months under the residence permit for orientation year ("zoekjaar"), not renewable.', 'Residence permit for orientation year-এর ("zoekjaar") অধীনে 12 মাস, renewable না।') }, source: NL_IND_ORIENTATION_YEAR },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 254, unit: 'EUR', text: b('EUR 254 for a first application for study or a change of purpose of stay, and EUR 254 again for the orientation-year permit.', 'পড়া বা purpose of stay পরিবর্তনের জন্য প্রথম আবেদনে EUR 254, আর orientation-year permit-এর জন্য আবার EUR 254।') }, source: NL_IND_FEES },
  ],
};

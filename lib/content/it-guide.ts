import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  IT_CISIA_TOLC,
  IT_CONSULATE_PROCEDURE,
  IT_EMB_CHECKLIST,
  IT_EMB_MAECI_GRANTS,
  IT_EMB_NOTICE,
  IT_ERGO_GRANT,
  IT_ERGO_INTL,
  IT_MIGRANTS_STUDY,
  IT_MUR_CIRCULAR,
  IT_MUR_POOR_COUNTRIES,
  IT_POLIMI_FOREIGN_INCOME,
  IT_READ,
  IT_STUDY_IN_ITALY,
  IT_UNIBO_FEES,
  IT_UNIPI_PHD,
  IT_UNIPV_PREENROL,
  IT_UNIVERSITALY_PROCEDURE,
  IT_UNIVERSITALY_STEPS,
} from './it-sources';

/**
 * Italy reading guide, researched on its own from Italian official sources
 * (Embassy of Italy in Dhaka, the MAECI consular network, MUR / Universitaly,
 * CISIA, regional DSU agencies, the universities). Nothing is taken from
 * another country's guide. Where two official sources differ, both are shown.
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
  const high = sources.some((s) => s.url?.includes('esteri.it') || s.url?.includes('universitaly') || s.url?.includes('mur.gov.it') || s.sourceType === 'official-university');
  return {
    id,
    q,
    a,
    sources,
    confidence: high ? 'high' : 'medium',
    ...(o.list ? { list: o.list } : {}),
    ...(o.status ? { status: o.status } : {}),
    ...(o.kind ? { kind: o.kind } : {}),
    ...(o.discrepancy ? { discrepancy: o.discrepancy } : {}),
    ...(o.allDegrees ? { allDegrees: true } : {}),
  };
}

const CHECK_UNI = b(
  'This can vary by university and program; always check the official call for applications (bando) or admission page of the program you apply to.',
  'এটা university/program অনুযায়ী পরিবর্তিত হতে পারে; যে program-এ আবেদন করবেন, তার official call (bando) বা admission page অবশ্যই দেখে নিন।',
);

// ------------------------------------------------------------------ shared answers

const universitaly = (id: string) =>
  qa(
    id,
    b('How does Universitaly pre-enrolment work?', 'Universitaly-তে pre-enrolment কীভাবে হয়?'),
    [
      b(
        'Universitaly is the free, official portal of the Ministry of University and Research (MUR). Non-EU students living abroad must submit the pre-enrolment application for a study visa only through it: create an account, choose your institution and program, and fill in the pre-enrolment application.',
        'Universitaly হলো Ministry of University and Research (MUR)-এর বিনামূল্যের official portal। বিদেশে থাকা non-EU student-দের study visa-র জন্য pre-enrolment আবেদন শুধু এখানেই করতে হয়: account খুলে institution আর program বেছে pre-enrolment আবেদন পূরণ করবেন।',
      ),
      b(
        'If the institution evaluates you positively, it can issue a "letter of eligibility for enrolment" and validates your application online with the details the Embassy needs. You then take a copy of the validated application to the Embassy with the other visa documents.',
        'Institution আপনাকে যোগ্য মনে করলে "letter of eligibility for enrolment" দিতে পারে এবং Embassy-র দরকারি তথ্যসহ আপনার আবেদন online-এ validate করে। তারপর validate করা আবেদনের কপি আর অন্য visa document নিয়ে Embassy-তে যাবেন।',
      ),
      b(
        'A validated pre-enrolment does not guarantee a visa appointment or a visa: the final decision belongs only to the Embassy, which also assesses whether the purpose of the journey is really to study (your family’s socio-economic situation, your previous studies and whether the chosen program fits them).',
        'Pre-enrolment validate হলেও visa appointment বা visa নিশ্চিত নয়: চূড়ান্ত সিদ্ধান্ত শুধু Embassy-র, যারা যাচাই করে যাত্রার উদ্দেশ্য সত্যিই পড়াশোনা কিনা (পরিবারের আর্থ-সামাজিক অবস্থা, আগের পড়াশোনা আর বেছে নেওয়া program তার সঙ্গে মেলে কিনা)।',
      ),
    ],
    [IT_UNIVERSITALY_STEPS, IT_UNIVERSITALY_PROCEDURE],
    { allDegrees: true },
  );

const visa = (id: string) =>
  qa(
    id,
    b('How do you get a student visa for Italy from Bangladesh?', 'Bangladesh থেকে Italy-র student visa কীভাবে পাবেন?'),
    [
      b('Step 1 — Admission: apply to the program and get its admission / eligibility letter.', 'ধাপ ১ — ভর্তি: program-এ আবেদন করে admission / eligibility letter নিন।'),
      b('Step 2 — Pre-enrolment on Universitaly: the institution validates it.', 'ধাপ ২ — Universitaly-তে pre-enrolment: institution তা validate করে।'),
      b(
        'Step 3 — Appointment: the Embassy of Italy in Dhaka says VFS Global contacts students registered on Universitaly by email to set the appointment, using the same email address you gave on Universitaly.',
        'ধাপ ৩ — Appointment: ঢাকার Italy Embassy জানায়, Universitaly-তে নিবন্ধিত student-দের VFS Global email-এ appointment-এর জন্য যোগাযোগ করে — Universitaly-তে যে email দিয়েছেন, সেই email-এই।',
      ),
      b(
        'Step 4 — Apply for the national (type "D") study visa with the checklist documents. For the 2026/2027 academic year the last day to submit is 30 November 2026 (for 2027/2028: 31 October 2027); your institution may set an earlier date for its program.',
        'ধাপ ৪ — Checklist-এর document নিয়ে national ("D" type) study visa-র আবেদন। ২০২৬/২০২৭ শিক্ষাবর্ষের জন্য শেষ দিন ৩০ November ২০২৬ (২০২৭/২০২৮-এর জন্য ৩১ October ২০২৭); আপনার institution তার program-এর জন্য আগের তারিখও দিতে পারে।',
      ),
      b(
        'Step 5 — After arrival: apply for the residence permit for study within 8 working days of entering Italy.',
        'ধাপ ৫ — পৌঁছানোর পর: Italy-তে ঢোকার ৮ কর্মদিবসের মধ্যে study residence permit-এর আবেদন করবেন।',
      ),
    ],
    [IT_EMB_NOTICE, IT_UNIVERSITALY_PROCEDURE, IT_EMB_CHECKLIST, IT_CONSULATE_PROCEDURE],
    {
      allDegrees: true,
      discrepancy: b(
        'The Embassy’s June 2026 notice gives the deadline as "Thursday, 30th November 2026" in English and as a Monday in its Bangla text; 30 November 2026 is a Monday. The date itself is the same in both, and matches the MUR procedure.',
        'Embassy-র June ২০২৬-এর notice-এর English অংশে শেষ দিন "Thursday, 30th November 2026", আর Bangla অংশে সোমবার লেখা; ৩০ November ২০২৬ আসলে সোমবার। তারিখ দুটোতেই এক, আর MUR procedure-এর সঙ্গেও মেলে।',
      ),
    },
  );

const visaTime = (id: string) =>
  qa(
    id,
    b('How long does the visa take? How much is the fee?', 'Visa-তে কত সময় লাগে? Fee কত?'),
    [
      b(
        'Not verified yet: the sources we read for Bangladesh do not state a processing time or visa fee. Check the Embassy of Italy in Dhaka / VFS Global Bangladesh before you apply.',
        'এখনো যাচাই হয়নি: Bangladesh-এর জন্য আমরা যে source পড়েছি, তাতে processing time বা visa fee নেই। আবেদনের আগে ঢাকার Italy Embassy / VFS Global Bangladesh-এ দেখে নিন।',
      ),
    ],
    [IT_EMB_CHECKLIST, IT_EMB_NOTICE],
    { status: 'not-verified', allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'The minimum set in the Italian procedure is EUR 10,179.85 per academic year, plus about EUR 500 for repatriation (or a return ticket). These are minimums.',
        'Italy-র procedure-এ নির্ধারিত minimum হলো প্রতি শিক্ষাবর্ষে EUR 10,179.85, সঙ্গে দেশে ফেরার জন্য প্রায় EUR 500 (অথবা ফেরার টিকিট)। এগুলো সর্বনিম্ন অঙ্ক।',
      ),
      b(
        'Embassy of Italy in Dhaka checklist: the sponsor’s personal bank statement from a bank operating in Bangladesh covering the last 12 months, with any other proof of solvency (for example credit card statements). The funds must be justified — for example by salary income, property or financial products that are not recent.',
        'ঢাকার Italy Embassy-র checklist: Bangladesh-এ কার্যরত কোনো ব্যাংকের, sponsor-এর শেষ ১২ মাসের personal bank statement, সঙ্গে আর্থিক সামর্থ্যের অন্য প্রমাণ (যেমন credit card statement)। টাকার উৎস ব্যাখ্যা করতে হবে — যেমন বেতন, সম্পত্তি বা পুরনো financial product।',
      ),
      b(
        'Who can be the sponsor: the Embassy’s June 2026 notice accepts economic guarantees of the applicant or of parents, grandparents, siblings, uncles and aunts, or cousins (who may also live legally in Italy or be Italian citizens). The general procedure does not accept cash or property as the means themselves.',
        'Sponsor কে হতে পারেন: Embassy-র June ২০২৬-এর notice অনুযায়ী আবেদনকারী নিজে, বা বাবা-মা, দাদা-দাদি/নানা-নানি, ভাই-বোন, চাচা-চাচি/মামা-মামি, কাজিন (যারা Italy-তে বৈধভাবে থাকতে বা Italy-র নাগরিকও হতে পারেন)। সাধারণ procedure নগদ টাকা বা সম্পত্তিকে সরাসরি অর্থের প্রমাণ হিসেবে নেয় না।',
      ),
    ],
    [IT_CONSULATE_PROCEDURE, IT_EMB_CHECKLIST, IT_EMB_NOTICE],
    {
      allDegrees: true,
      discrepancy: b(
        'Two official texts differ. Bank statements: the general MAECI procedure (Consulate PDF) says 6 months; the Embassy of Italy in Dhaka checklist says the last 12 months — follow the Dhaka checklist. Sponsors: the checklist names parents, people legally resident in Italy and institutions; the newer Dhaka notice (June 2026) also accepts grandparents, siblings, uncles, aunts and cousins.',
        'দুটি official লেখা আলাদা কথা বলে। Bank statement: সাধারণ MAECI procedure (Consulate PDF) বলে ৬ মাস; ঢাকার Italy Embassy-র checklist বলে শেষ ১২ মাস — ঢাকার checklist মেনে চলুন। Sponsor: checklist-এ বাবা-মা, Italy-তে বৈধভাবে থাকা ব্যক্তি আর প্রতিষ্ঠানের কথা; নতুন ঢাকা notice (June ২০২৬) দাদা-দাদি, ভাই-বোন, চাচা-মামা ও কাজিনকেও মানে।',
      ),
    },
  );

const qualification = (id: string) =>
  qa(
    id,
    b('What is the CIMEA statement or Declaration of Value, and do you need one?', 'CIMEA statement বা Declaration of Value কী, লাগবে কি?'),
    [
      b(
        'They prove the value and authenticity of your certificate: either the statements from CIMEA (the Italian ENIC-NARIC centre) or a Declaration of Value issued by the Italian diplomatic mission. The Embassy of Italy in Dhaka asks every visa applicant to submit one of them.',
        'এগুলো আপনার সনদের মান আর সত্যতা প্রমাণ করে: CIMEA (Italy-র ENIC-NARIC কেন্দ্র)-র statement, অথবা Italy-র দূতাবাসের দেওয়া Declaration of Value। ঢাকার Italy Embassy প্রত্যেক visa আবেদনকারীর কাছে এর যেকোনো একটি চায়।',
      ),
      b(
        'For admission itself, evaluating a foreign qualification is the university’s own decision; it may ask for the CIMEA statement or the Declaration of Value at its discretion. Certificates not in English, Spanish or French need an official Italian translation (University of Pavia).',
        'ভর্তির ক্ষেত্রে বিদেশি সনদ মূল্যায়নের সিদ্ধান্ত university-র নিজের; প্রয়োজনে সে CIMEA statement বা Declaration of Value চাইতে পারে। English, Spanish বা French ছাড়া অন্য ভাষার সনদের official Italian অনুবাদ লাগে (University of Pavia)।',
      ),
    ],
    [IT_EMB_NOTICE, IT_MUR_CIRCULAR, IT_UNIVERSITALY_PROCEDURE, IT_UNIPV_PREENROL],
    { allDegrees: true },
  );

const languageVisa = (id: string) =>
  qa(
    id,
    b('Which language certificate does the Embassy accept?', 'Embassy কোন ভাষার সনদ নেয়?'),
    [
      b(
        'The Embassy of Italy in Dhaka accepts only certificates issued by globally recognised institutes or by universities that clearly state your level in listening (oral comprehension), reading, speaking and writing.',
        'ঢাকার Italy Embassy শুধু বিশ্বব্যাপী স্বীকৃত প্রতিষ্ঠান বা university-র দেওয়া সনদ নেয়, যেখানে listening, reading, speaking আর writing — চারটি দক্ষতার level স্পষ্ট লেখা থাকে।',
      ),
      b(
        'The general procedure sets at least B2 (CEFR) for programs taught in a foreign language; for Italian-taught programs the university tests Italian at least at B2, and for the visa only certificates from Italian Cultural Institutes or CLIQ-member bodies at B2 or above are valid.',
        'সাধারণ procedure অনুযায়ী বিদেশি ভাষায় পড়ানো program-এর জন্য কমপক্ষে B2 (CEFR); Italian-এ পড়ানো program-এ university কমপক্ষে B2 Italian যাচাই করে, আর visa-র জন্য শুধু Italian Cultural Institute বা CLIQ-সদস্য প্রতিষ্ঠানের B2 বা তার বেশি সনদ গণ্য হয়।',
      ),
    ],
    [IT_EMB_NOTICE, IT_CONSULATE_PROCEDURE],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work part-time? How many hours?', 'Part-time কাজ করা যায় কি? কত ঘণ্টা?'),
    [
      b(
        'Yes. With a residence permit for study you may work as an employee for no more than 20 hours a week, and in any case no more than 1,040 hours a year.',
        'হ্যাঁ। Study residence permit থাকলে কর্মচারী হিসেবে সপ্তাহে সর্বোচ্চ ২০ ঘণ্টা কাজ করা যায়, আর বছরে কোনোভাবেই ১,০৪০ ঘণ্টার বেশি নয়।',
      ),
      b(
        'You can also convert the study permit into a work permit before it expires. Part-time income is not counted in the minimum funds for the visa.',
        'মেয়াদ শেষ হওয়ার আগে study permit-কে work permit-এ রূপান্তরও করা যায়। Visa-র minimum অর্থের হিসাবে part-time আয় ধরা হয় না।',
      ),
    ],
    [IT_MIGRANTS_STUDY, IT_CONSULATE_PROCEDURE],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you stay in Italy after graduating?', 'পড়া শেষে Italy-তে থাকা যায় কি?'),
    [
      b(
        'Yes, there is a route: someone who has obtained a post-secondary qualification in Italy can, when the study permit expires, get a residence permit to look for a job or start a business "consistent with the completed course" (Decree 71/2018). The study permit can also be converted into a work permit before it expires.',
        'হ্যাঁ, একটি পথ আছে: Italy-তে post-secondary degree পাওয়া কেউ study permit-এর মেয়াদ শেষে "শেষ করা পড়ার সঙ্গে সামঞ্জস্যপূর্ণ" চাকরি খুঁজতে বা ব্যবসা শুরু করতে residence permit পেতে পারেন (Decree 71/2018)। মেয়াদ শেষের আগে study permit-কে work permit-এ রূপান্তরও করা যায়।',
      ),
      b(
        'The length of that job-seeking permit is not verified here; check the government portal or your Questura.',
        'চাকরি খোঁজার এই permit-এর মেয়াদ এখানে যাচাই হয়নি; সরকারি portal বা আপনার Questura-তে দেখে নিন।',
      ),
    ],
    [IT_MIGRANTS_STUDY],
    { status: 'partly-verified', allDegrees: true },
  );

const dsu = (id: string) =>
  qa(
    id,
    b('What is the DSU (regional) scholarship?', 'DSU (আঞ্চলিক) scholarship কী?'),
    [
      b(
        'DSU ("diritto allo studio", right to study) benefits are run by a regional agency, not by the university — each region publishes its own call, so rules and amounts differ by region. Example: ER.GO in Emilia-Romagna (Bologna and other cities).',
        'DSU ("diritto allo studio", পড়ার অধিকার) সুবিধা দেয় আঞ্চলিক সংস্থা, university নয় — প্রতিটি region নিজের call দেয়, তাই নিয়ম আর অঙ্ক region অনুযায়ী আলাদা। উদাহরণ: Emilia-Romagna-র ER.GO (Bologna ও অন্যান্য শহর)।',
      ),
      b(
        'What it gives (ER.GO): a sum of money that depends on your family’s income band and on whether you live in the city, commute or live away from home; full exemption from university fees and a refund of the regional tax; part of it can be taken as meal credit. Housing in residences and meal services are separate benefits.',
        'কী দেয় (ER.GO): টাকা, যার অঙ্ক নির্ভর করে পরিবারের আয়ের স্তর আর আপনি শহরে থাকেন, যাতায়াত করেন নাকি বাড়ি থেকে দূরে থাকেন তার উপর; university fee থেকে পুরো ছাড় আর regional tax ফেরত; এর একটা অংশ খাবারের credit হিসেবে নেওয়া যায়। Residence-এ থাকা আর খাবারের সুবিধা আলাদা benefit।',
      ),
      b(
        'Who qualifies: students who meet the economic, merit (a minimum number of credits each year) and enrolment requirements of the call. There are no merit-only DSU grants. You must apply every academic year, and you can apply before enrolling; deadlines are final.',
        'কারা পান: যারা call-এর আর্থিক, merit (প্রতি বছর নির্দিষ্ট ন্যূনতম credit) আর ভর্তির শর্ত পূরণ করেন। শুধু merit-এর ভিত্তিতে DSU grant নেই। প্রতি শিক্ষাবর্ষে আবেদন করতে হয়, ভর্তির আগেই আবেদন করা যায়; শেষ তারিখ পরিবর্তন হয় না।',
      ),
      b(
        'Family income abroad: you get the documents from the competent authority in your home country, have them legalised (or apostilled where allowed) and translated, and you need an Italian tax code (codice fiscale). Bangladesh is on the MUR list of "particularly poor countries" for 2026/2027: for students from these countries the economic condition can be certified by the Italian Representation in the home country, stating that the student does not belong to a family known for high income and high social standing (Politecnico di Milano’s fee page).',
        'বিদেশে পরিবারের আয়: নিজ দেশের সংশ্লিষ্ট কর্তৃপক্ষ থেকে document নিয়ে legalise (যেখানে অনুমতি আছে সেখানে apostille) ও অনুবাদ করাতে হয়, আর Italy-র tax code (codice fiscale) লাগে। ২০২৬/২০২৭-এর জন্য MUR-এর "particularly poor countries" তালিকায় Bangladesh আছে: এসব দেশের student-দের আর্থিক অবস্থা নিজ দেশের Italian Representation প্রত্যয়ন করতে পারে — যে student উচ্চ আয় ও উচ্চ সামাজিক অবস্থানের পরিবার থেকে আসেননি (Politecnico di Milano-র fee page)।',
      ),
    ],
    [IT_ERGO_GRANT, IT_ERGO_INTL, IT_MUR_POOR_COUNTRIES, IT_POLIMI_FOREIGN_INCOME],
    { allDegrees: true },
  );

const tuition = (id: string) =>
  qa(
    id,
    b('How much is tuition at a public university?', 'Public university-তে tuition কত?'),
    [
      b(
        'There is no single national fee: each university sets its own, and the fee depends on the program and on your family’s income and assets. Example — University of Bologna 2026/27: a fixed instalment of EUR 157.04 plus a variable part; you pay from EUR 157.04 up to a maximum that differs by program. Without income documents you pay the full amount.',
        'জাতীয় একক কোনো fee নেই: প্রতিটি university নিজের fee ঠিক করে, আর তা program এবং পরিবারের আয়-সম্পদের উপর নির্ভর করে। উদাহরণ — University of Bologna ২০২৬/২৭: EUR 157.04-এর নির্দিষ্ট কিস্তি আর একটি পরিবর্তনশীল অংশ; সর্বনিম্ন EUR 157.04 থেকে program অনুযায়ী সর্বোচ্চ পর্যন্ত। আয়ের document না দিলে পুরো অঙ্ক দিতে হয়।',
      ),
      b(
        'For families with income only outside Italy, Bologna offers a reduced flat fee to citizens of particularly poor and developing countries or non-OECD countries (the amount is on its page; not verified here). A regional tax is added — at Politecnico di Milano (Lombardy) up to EUR 190 a year.',
        'যাদের পরিবারের আয় শুধু Italy-র বাইরে, তাদের জন্য Bologna particularly poor ও developing বা non-OECD দেশের নাগরিকদের একটি কম flat fee দেয় (অঙ্ক তাদের page-এ; এখানে যাচাই হয়নি)। এর সঙ্গে regional tax যোগ হয় — Politecnico di Milano (Lombardy)-তে বছরে সর্বোচ্চ EUR 190।',
      ),
      CHECK_UNI,
    ],
    [IT_UNIBO_FEES, IT_POLIMI_FOREIGN_INCOME],
    { status: 'partly-verified' },
  );

const living = (id: string) =>
  qa(
    id,
    b('How much is the living cost?', 'থাকা-খাওয়ার খরচ কত?'),
    [
      b(
        'Not verified yet: we did not find an official average living cost for students. The official minimum you must show for the visa is EUR 10,179.85 per academic year; real costs vary by city (housing is the largest part). Budget from your university’s or regional DSU agency’s own information.',
        'এখনো যাচাই হয়নি: student-দের গড় থাকা-খাওয়ার খরচের কোনো official হিসাব আমরা পাইনি। Visa-র জন্য official minimum প্রতি শিক্ষাবর্ষে EUR 10,179.85; আসল খরচ শহর অনুযায়ী আলাদা (সবচেয়ে বড় অংশ বাসাভাড়া)। নিজের university বা আঞ্চলিক DSU সংস্থার তথ্য দেখে বাজেট করুন।',
      ),
    ],
    [IT_CONSULATE_PROCEDURE],
    { status: 'not-verified', kind: 'estimate', allDegrees: true },
  );

// ------------------------------------------------------------------ documents

export const IT_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Your identity and travel document; the visa is placed in it.', 'আপনার পরিচয় ও ভ্রমণের document; visa এতেই লাগানো হয়।'),
    who: b('Embassy of Italy in Dhaka (via VFS Global).', 'ঢাকার Italy Embassy (VFS Global-এর মাধ্যমে)।'),
    when: b('For Universitaly and at the visa application.', 'Universitaly-তে আর visa আবেদনের সময়।'),
    where: b('VFS Global, Dhaka.', 'VFS Global, ঢাকা।'),
    prepare: b('A valid passport; check the validity rule on the Embassy checklist before you book the appointment.', 'বৈধ passport; appointment নেওয়ার আগে Embassy checklist-এ মেয়াদের নিয়ম দেখে নিন।'),
    groups: ['general', 'visa'],
    sources: [IT_EMB_CHECKLIST],
  },
  {
    id: 'visa-form',
    name: b('National ("D") visa application form', 'National ("D") visa-র আবেদন form'),
    why: b('The visa application itself.', 'এটাই visa-র আবেদন।'),
    who: b('Embassy of Italy in Dhaka.', 'ঢাকার Italy Embassy।'),
    when: b('At the visa appointment.', 'Visa appointment-এ।'),
    where: b('VFS Global, Dhaka.', 'VFS Global, ঢাকা।'),
    prepare: b('Fill it in English or Italian and sign it (for a minor, both parents or the legal guardian sign).', 'English বা Italian-এ পূরণ করে সই করুন (নাবালকের ক্ষেত্রে বাবা-মা দুজনে বা আইনগত অভিভাবক সই করবেন)।'),
    groups: ['visa'],
    sources: [IT_EMB_CHECKLIST],
  },
  {
    id: 'academic',
    name: b('Diploma / degree certificate and transcripts', 'Diploma / degree সনদ আর transcript'),
    why: b("Shows you have the qualification that gives access to the program: a secondary-school diploma after at least 12 years for a bachelor's, a university degree for a master's, a master's-level degree for a PhD.", "দেখায় যে program-এ ঢোকার যোগ্যতা আপনার আছে: bachelor's-এর জন্য কমপক্ষে ১২ বছরের secondary-school diploma, master's-এর জন্য university degree, PhD-র জন্য master's-level degree।"),
    who: b('The university (admission) and the Embassy (visa).', 'University (ভর্তি) আর Embassy (visa)।'),
    when: b('With the application, for pre-enrolment and at the visa appointment.', 'আবেদনের সময়, pre-enrolment-এ আর visa appointment-এ।'),
    where: b('Upload to the university and Universitaly; originals to VFS Global.', 'University আর Universitaly-তে upload; মূল কপি VFS Global-এ।'),
    prepare: b('Certificates issued in English, Spanish or French, or officially translated into Italian.', 'English, Spanish বা French-এ দেওয়া সনদ, নয়তো official Italian অনুবাদ।'),
    groups: ['general', 'program', 'visa'],
    sources: [IT_MUR_CIRCULAR, IT_UNIPV_PREENROL],
  },
  {
    id: 'cimea-dov',
    name: b('CIMEA statement or Declaration of Value', 'CIMEA statement বা Declaration of Value'),
    why: b('Proves the authenticity and value of your study certificate.', 'আপনার সনদের সত্যতা আর মান প্রমাণ করে।'),
    who: b('Required for the visa by the Embassy of Italy in Dhaka; a university may also ask for it.', 'Visa-র জন্য ঢাকার Italy Embassy চায়; university-ও চাইতে পারে।'),
    when: b('Before the visa appointment (start early).', 'Visa appointment-এর আগে (আগেভাগে শুরু করুন)।'),
    where: b('From CIMEA (online) or, for the Declaration of Value, the Italian Representation where you completed your studies.', 'CIMEA (online) থেকে, অথবা Declaration of Value-এর জন্য যেখানে পড়াশোনা শেষ করেছেন সেখানকার Italian Representation থেকে।'),
    prepare: b('One of the two is enough for the Embassy.', 'Embassy-র জন্য দুটির যেকোনো একটি যথেষ্ট।'),
    groups: ['visa', 'bangladesh'],
    sources: [IT_EMB_NOTICE, IT_UNIPV_PREENROL],
  },
  {
    id: 'language',
    name: b('Language certificate (English or Italian)', 'ভাষার সনদ (English বা Italian)'),
    why: b('Shows you can follow the program; the Embassy checks it too.', 'দেখায় যে আপনি program বুঝতে পারবেন; Embassy-ও যাচাই করে।'),
    who: b('The university sets the score; the Embassy sets which certificates it accepts.', 'Score ঠিক করে university; কোন সনদ নেবে তা ঠিক করে Embassy।'),
    when: b('With the application and at the visa appointment.', 'আবেদনের সময় আর visa appointment-এ।'),
    where: b('Test centre of a globally recognised institute, or a university.', 'বিশ্বব্যাপী স্বীকৃত প্রতিষ্ঠানের test centre, বা university।'),
    prepare: b('It must show your level in listening, reading, speaking and writing. The general procedure asks for at least B2.', 'এতে listening, reading, speaking আর writing — চারটির level থাকতে হবে। সাধারণ procedure কমপক্ষে B2 চায়।'),
    groups: ['program', 'visa', 'bangladesh'],
    sources: [IT_EMB_NOTICE, IT_CONSULATE_PROCEDURE],
  },
  {
    id: 'tolc',
    name: b('TOLC result (if the program asks for it)', 'TOLC ফল (program চাইলে)'),
    why: b('Some bachelor’s programs use a CISIA TOLC as the admission test.', 'কিছু bachelor’s program ভর্তি পরীক্ষা হিসেবে CISIA-র TOLC নেয়।'),
    who: b('The university, in the admission notice of the program.', 'University, program-এর admission notice-এ।'),
    when: b('Before the program’s admission deadline (TOLCs run February–November).', 'Program-এর admission deadline-এর আগে (TOLC হয় February–November)।'),
    where: b('CISIA student area; TOLC@UNI or TOLC@HOME.', 'CISIA student area; TOLC@UNI বা TOLC@HOME।'),
    prepare: b('Book the type named in the admission notice; the fee is EUR 35.', 'Admission notice-এ যে ধরন লেখা, সেটি book করুন; fee EUR 35।'),
    groups: ['program'],
    degrees: ['bachelors'],
    sources: [IT_CISIA_TOLC],
  },
  {
    id: 'program-extras',
    name: b('Program-specific documents (CV, motivation letter, references, portfolio, research proposal)', 'Program-এর নিজস্ব document (CV, motivation letter, reference, portfolio, research proposal)'),
    why: b('Many programs and PhD calls ask for more than certificates; each decides what.', 'অনেক program আর PhD call সনদের বাইরেও কিছু চায়; কী চাইবে তা প্রত্যেকে নিজে ঠিক করে।'),
    who: b('The university, in its call for applications (bando).', 'University, তার call (bando)-তে।'),
    when: b('With the application.', 'আবেদনের সময়।'),
    where: b('The university’s application portal.', 'University-র application portal।'),
    prepare: b('Not verified yet for any specific program: read the call of the program you choose.', 'কোনো নির্দিষ্ট program-এর জন্য এখনো যাচাই হয়নি: যে program বাছবেন, তার call পড়ুন।'),
    groups: ['program'],
    degrees: ['masters', 'phd'],
    status: 'not-verified',
    sources: [IT_MUR_CIRCULAR, IT_UNIPI_PHD],
  },
  {
    id: 'preenrolment',
    name: b('Validated Universitaly pre-enrolment and admission / eligibility letter', 'Validate করা Universitaly pre-enrolment আর admission / eligibility letter'),
    why: b('Shows an Italian institution has assessed you for the program.', 'দেখায় যে Italy-র একটি institution program-এর জন্য আপনাকে মূল্যায়ন করেছে।'),
    who: b('Issued by the institution; required by the Embassy.', 'Institution দেয়; Embassy চায়।'),
    when: b('After admission, before the visa appointment.', 'ভর্তির পরে, visa appointment-এর আগে।'),
    where: b('Universitaly portal.', 'Universitaly portal-এ।'),
    prepare: b('Use the same email address everywhere — VFS Global contacts you on the email you gave on Universitaly.', 'সব জায়গায় একই email ব্যবহার করুন — Universitaly-তে দেওয়া email-এই VFS Global যোগাযোগ করে।'),
    groups: ['visa'],
    sources: [IT_UNIVERSITALY_STEPS, IT_EMB_NOTICE],
  },
  {
    id: 'finance',
    name: b('Proof of financial means (sponsor’s bank statement)', 'আর্থিক সামর্থ্যের প্রমাণ (sponsor-এর bank statement)'),
    why: b('Shows you can pay for your stay (minimum EUR 10,179.85 per academic year).', 'দেখায় যে থাকার খরচ চালাতে পারবেন (প্রতি শিক্ষাবর্ষে minimum EUR 10,179.85)।'),
    who: b('Embassy of Italy in Dhaka.', 'ঢাকার Italy Embassy।'),
    when: b('At the visa appointment.', 'Visa appointment-এ।'),
    where: b('VFS Global, Dhaka.', 'VFS Global, ঢাকা।'),
    prepare: b('Personal bank statement of the sponsor from a bank operating in Bangladesh for the last 12 months, plus other proof of solvency; be ready to explain where the money comes from.', 'Bangladesh-এ কার্যরত ব্যাংকের sponsor-এর শেষ ১২ মাসের personal bank statement, সঙ্গে সামর্থ্যের অন্য প্রমাণ; টাকার উৎস ব্যাখ্যা করতে প্রস্তুত থাকুন।'),
    groups: ['visa', 'bangladesh'],
    sources: [IT_EMB_CHECKLIST, IT_EMB_NOTICE, IT_CONSULATE_PROCEDURE],
  },
  {
    id: 'accommodation',
    name: b('Proof of accommodation', 'থাকার জায়গার প্রমাণ'),
    why: b('Shows where you will live on arrival.', 'দেখায় পৌঁছে কোথায় থাকবেন।'),
    who: b('Embassy of Italy in Dhaka.', 'ঢাকার Italy Embassy।'),
    when: b('At the visa appointment.', 'Visa appointment-এ।'),
    where: b('VFS Global, Dhaka.', 'VFS Global, ঢাকা।'),
    prepare: b('One of: a temporary accommodation booking for at least 30 days; a purchase or rental contract; or a hospitality declaration signed by an Italian citizen or a legal resident, with a copy of their ID.', 'এর যেকোনো একটি: কমপক্ষে ৩০ দিনের অস্থায়ী থাকার booking; কেনা বা ভাড়ার চুক্তি; অথবা Italy-র নাগরিক বা বৈধ বাসিন্দার সই করা hospitality declaration, সঙ্গে তার ID-র কপি।'),
    groups: ['visa'],
    sources: [IT_EMB_CHECKLIST],
  },
  {
    id: 'ticket',
    name: b('Flight booking', 'বিমান টিকিটের booking'),
    why: b('Shows your travel plan.', 'আপনার ভ্রমণ পরিকল্পনা দেখায়।'),
    who: b('Embassy of Italy in Dhaka.', 'ঢাকার Italy Embassy।'),
    when: b('At the visa appointment.', 'Visa appointment-এ।'),
    where: b('VFS Global, Dhaka.', 'VFS Global, ঢাকা।'),
    prepare: b('A one-way airline booking with the reservation (PNR) number and itinerary.', 'Reservation (PNR) নম্বর আর itinerary-সহ one-way বিমান booking।'),
    groups: ['visa'],
    sources: [IT_EMB_CHECKLIST],
  },
  {
    id: 'family-income',
    name: b('Family income and assets documents (for fees and DSU)', 'পরিবারের আয় ও সম্পদের document (fee আর DSU-র জন্য)'),
    why: b('Lower fees and DSU scholarships depend on your family’s economic condition.', 'কম fee আর DSU scholarship পরিবারের আর্থিক অবস্থার উপর নির্ভর করে।'),
    who: b('Your university (fees) and the regional DSU agency (scholarship).', 'আপনার university (fee) আর আঞ্চলিক DSU সংস্থা (scholarship)।'),
    when: b('By the fee and DSU deadlines — you can apply before enrolling.', 'Fee আর DSU-র শেষ তারিখের মধ্যে — ভর্তির আগেই আবেদন করা যায়।'),
    where: b('Issued by the competent authority in Bangladesh; submitted as the university or agency says (for example through an authorised tax-assistance centre, CAF).', 'Bangladesh-এর সংশ্লিষ্ট কর্তৃপক্ষ দেয়; university বা সংস্থা যেভাবে বলে সেভাবে জমা (যেমন অনুমোদিত tax-assistance centre, CAF-এর মাধ্যমে)।'),
    prepare: b('Family composition, income, property and financial assets, legalised by the Italian Representation and translated into Italian. As Bangladesh is on the MUR list of particularly poor countries, a certificate from the Italian Representation can be used instead to assess your economic condition. You also need an Italian tax code (codice fiscale).', 'পরিবারের সদস্য, আয়, সম্পত্তি ও আর্থিক সম্পদের document, Italian Representation-এ legalise করে Italian-এ অনুবাদ। Bangladesh MUR-এর particularly poor countries তালিকায় থাকায় আর্থিক অবস্থা মূল্যায়নে Italian Representation-এর একটি সনদও ব্যবহার করা যায়। Italy-র tax code (codice fiscale)-ও লাগবে।'),
    groups: ['program', 'bangladesh'],
    sources: [IT_POLIMI_FOREIGN_INCOME, IT_ERGO_INTL, IT_MUR_POOR_COUNTRIES],
  },
  {
    id: 'insurance',
    name: b('Health insurance', 'স্বাস্থ্যবীমা'),
    why: b('Required for the residence permit.', 'Residence permit-এর জন্য লাগে।'),
    who: b('Italian authorities (Questura).', 'Italy-র কর্তৃপক্ষ (Questura)।'),
    when: b('When you apply for the residence permit after arrival.', 'পৌঁছে residence permit-এর আবেদনের সময়।'),
    where: b('Questura (via the post office application kit).', 'Questura (post office-এর application kit-এর মাধ্যমে)।'),
    prepare: b('Cover of at least EUR 30,000.', 'কমপক্ষে EUR 30,000-এর cover।'),
    groups: ['arrival'],
    sources: [IT_CONSULATE_PROCEDURE],
  },
  {
    id: 'residence-permit',
    name: b('Residence permit for study (permesso di soggiorno)', 'পড়াশোনার residence permit (permesso di soggiorno)'),
    why: b('Your permit to stay in Italy for the length of your course.', 'কোর্সের মেয়াদ পর্যন্ত Italy-তে থাকার অনুমতি।'),
    who: b('Ministry of the Interior (Questura).', 'Italy-র স্বরাষ্ট্র মন্ত্রণালয় (Questura)।'),
    when: b('Within 8 working days of entering Italy.', 'Italy-তে ঢোকার ৮ কর্মদিবসের মধ্যে।'),
    where: b('Questura of the city where you live.', 'যে শহরে থাকেন, সেখানকার Questura।'),
    prepare: b('It lasts for the length of your course, subject to an annual check of your study progress.', 'কোর্সের মেয়াদ পর্যন্ত বৈধ, তবে প্রতি বছর পড়াশোনার অগ্রগতি যাচাই হয়।'),
    groups: ['arrival'],
    sources: [IT_CONSULATE_PROCEDURE, IT_MIGRANTS_STUDY],
  },
];

// ------------------------------------------------------------------ costs (EUR, never converted)

const FUNDS: GuideCost = {
  id: 'funds-min',
  label: b('Minimum funds to show for the visa', 'Visa-র জন্য minimum অর্থ দেখাতে হয়'),
  value: b('EUR 10,179.85 per academic year', 'প্রতি শিক্ষাবর্ষে EUR 10,179.85'),
  amount: { value: 10179.85, currency: 'EUR', period: 'year' },
  note: b('Plus about EUR 500 for repatriation, or a return ticket. A minimum, not your real budget.', 'সঙ্গে দেশে ফেরার জন্য প্রায় EUR 500, বা ফেরার টিকিট। এটা minimum, আসল বাজেট নয়।'),
  source: IT_CONSULATE_PROCEDURE,
};
const REPATRIATION: GuideCost = {
  id: 'repatriation',
  label: b('Repatriation money', 'দেশে ফেরার অর্থ'),
  value: b('About EUR 500 (or a return ticket)', 'প্রায় EUR 500 (অথবা ফেরার টিকিট)'),
  amount: { value: 500, currency: 'EUR', period: 'one-time' },
  source: IT_CONSULATE_PROCEDURE,
};
const UNIBO_FIXED: GuideCost = {
  id: 'unibo-fixed',
  label: b('University fee — example: University of Bologna fixed instalment', 'University fee — উদাহরণ: University of Bologna-র নির্দিষ্ট কিস্তি'),
  value: b('EUR 157.04 per year, plus a variable part up to a maximum set per program', 'বছরে EUR 157.04, সঙ্গে program অনুযায়ী সর্বোচ্চ পর্যন্ত পরিবর্তনশীল অংশ'),
  amount: { value: 157.04, currency: 'EUR', period: 'year' },
  note: b('Varies by university, program and family income.', 'University, program আর পরিবারের আয় অনুযায়ী আলাদা।'),
  source: IT_UNIBO_FEES,
};
const REGIONAL_TAX: GuideCost = {
  id: 'regional-tax',
  label: b('Regional tax — example: Lombardy (Politecnico di Milano)', 'Regional tax — উদাহরণ: Lombardy (Politecnico di Milano)'),
  value: b('Up to EUR 190 per year', 'বছরে সর্বোচ্চ EUR 190'),
  amount: { value: 190, currency: 'EUR', period: 'year' },
  note: b('Set by each region; refunded to DSU scholarship holders in Emilia-Romagna.', 'প্রতিটি region ঠিক করে; Emilia-Romagna-তে DSU scholarship পেলে ফেরত দেওয়া হয়।'),
  source: IT_POLIMI_FOREIGN_INCOME,
};
const TOLC_FEE: GuideCost = {
  id: 'tolc-fee',
  label: b('TOLC admission test (if the program asks for it)', 'TOLC ভর্তি পরীক্ষা (program চাইলে)'),
  value: b('EUR 35 per test', 'প্রতি পরীক্ষায় EUR 35'),
  amount: { value: 35, currency: 'EUR', period: 'one-time' },
  source: IT_CISIA_TOLC,
};
const NOT_VERIFIED_COSTS: GuideCost[] = [
  { id: 'living', label: b('Living cost (housing, food, transport)', 'থাকা-খাওয়ার খরচ (বাসা, খাবার, যাতায়াত)'), value: b('Not verified — varies by city', 'যাচাই হয়নি — শহর অনুযায়ী আলাদা'), status: 'not-verified', source: IT_CONSULATE_PROCEDURE },
  { id: 'insurance', label: b('Health insurance', 'স্বাস্থ্যবীমা'), value: b('Price not verified; cover of at least EUR 30,000 required', 'দাম যাচাই হয়নি; কমপক্ষে EUR 30,000-এর cover লাগবে'), status: 'not-verified', source: IT_CONSULATE_PROCEDURE },
  { id: 'visa-fee', label: b('Visa fee and residence permit fees', 'Visa fee আর residence permit-এর খরচ'), value: b('Not verified', 'যাচাই হয়নি'), status: 'not-verified', source: IT_EMB_CHECKLIST },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Usually 3 years (laurea) · after 12 years of school (HSC)', 'সাধারণত ৩ বছর (laurea) · ১২ বছরের পড়াশোনা (HSC) শেষে'),
  intro: b(
    "An Italian bachelor's (laurea, first cycle) needs a secondary-school diploma obtained after at least 12 years of schooling, so the HSC meets the basic rule. The university evaluates your certificate and may set an admission test such as a CISIA TOLC; you then pre-enrol on Universitaly and apply for the visa in Dhaka.",
    "Italy-র bachelor's (laurea, first cycle)-এর জন্য কমপক্ষে ১২ বছরের পড়াশোনা শেষে পাওয়া secondary-school diploma লাগে, তাই HSC দিয়ে মূল শর্ত পূরণ হয়। University আপনার সনদ মূল্যায়ন করে, CISIA TOLC-এর মতো ভর্তি পরীক্ষাও নিতে পারে; তারপর Universitaly-তে pre-enrolment করে ঢাকায় visa-র আবেদন।",
  ),
  costs: { official: [UNIBO_FIXED, REGIONAL_TAX, TOLC_FEE, FUNDS, REPATRIATION], estimates: NOT_VERIFIED_COSTS },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'who',
          b("What are the basic requirements for a Bachelor's in Italy?", "Italy-তে Bachelor's-এর মূল শর্ত কী?"),
          [
            b(
              "A secondary-school final diploma obtained after at least 12 years of schooling; admission by the university (which may include a test); a language certificate for the language of instruction; then Universitaly pre-enrolment, the visa and, after arrival, the residence permit.",
              'কমপক্ষে ১২ বছরের পড়াশোনা শেষে পাওয়া secondary-school-এর চূড়ান্ত diploma; university-র ভর্তি (পরীক্ষাও থাকতে পারে); পড়ানোর ভাষার সনদ; তারপর Universitaly-তে pre-enrolment, visa, আর পৌঁছে residence permit।',
            ),
          ],
          [IT_MUR_CIRCULAR, IT_UNIVERSITALY_STEPS],
        ),
        qa(
          'hsc-direct',
          b('Can you apply directly after HSC?', 'HSC-র পরেই কি সরাসরি আবেদন করা যায়?'),
          [
            b(
              'Yes. The MUR rule for first-cycle degrees asks for a secondary-school final diploma obtained after at least 12 years of schooling; SSC + HSC in Bangladesh add up to 12 years. You apply to the university first, then pre-enrol on Universitaly.',
              'হ্যাঁ। First-cycle degree-র জন্য MUR-এর নিয়ম: কমপক্ষে ১২ বছরের পড়াশোনা শেষে পাওয়া secondary-school-এর চূড়ান্ত diploma; Bangladesh-এ SSC + HSC মিলে ১২ বছর। আগে university-তে আবেদন, তারপর Universitaly-তে pre-enrolment।',
            ),
          ],
          [IT_MUR_CIRCULAR],
        ),
        qa(
          'hsc-enough',
          b('Is HSC alone enough?', 'শুধু HSC কি যথেষ্ট?'),
          [
            b(
              'HSC meets the minimum schooling rule, but it is not everything: the university decides whether your qualification gives access to its program, and many programs add a test or other requirements. For the visa you also need a CIMEA statement or Declaration of Value, a language certificate and proof of funds.',
              'HSC দিয়ে ন্যূনতম পড়াশোনার শর্ত পূরণ হয়, কিন্তু সেটাই সব নয়: আপনার সনদ দিয়ে program-এ ঢোকা যাবে কিনা তা university ঠিক করে, আর অনেক program পরীক্ষা বা অন্য শর্ত যোগ করে। Visa-র জন্য CIMEA statement বা Declaration of Value, ভাষার সনদ আর অর্থের প্রমাণও লাগবে।',
            ),
            CHECK_UNI,
          ],
          [IT_MUR_CIRCULAR, IT_UNIVERSITALY_PROCEDURE, IT_EMB_NOTICE],
        ),
        qa(
          'twelve',
          b('Is 12 years of education required?', '১২ বছরের পড়াশোনা কি লাগবেই?'),
          [
            b(
              'Yes — at least 12 years of schooling for first-cycle degrees. If your diploma came after fewer than 12 years, the MUR circular refers to its Annex 1 for what else is needed (for example a foundation course); that annex is not summarised here.',
              'হ্যাঁ — first-cycle degree-র জন্য কমপক্ষে ১২ বছরের পড়াশোনা। ১২ বছরের কম হলে কী লাগবে (যেমন foundation course), তার জন্য MUR circular তার Annex 1 দেখতে বলে; সেই annex এখানে সংক্ষেপ করা হয়নি।',
            ),
          ],
          [IT_MUR_CIRCULAR],
        ),
        qa(
          'gpa',
          b('What GPA is needed?', 'কত GPA লাগে?'),
          [
            b(
              'Not verified yet: the official sources we read set no national minimum GPA; evaluating a foreign qualification is each university’s own decision.',
              'এখনো যাচাই হয়নি: আমরা যে official source পড়েছি, তাতে জাতীয় কোনো minimum GPA নেই; বিদেশি সনদ মূল্যায়ন প্রতিটি university নিজে করে।',
            ),
            CHECK_UNI,
          ],
          [IT_UNIVERSITALY_PROCEDURE],
          { status: 'not-verified' },
        ),
      ],
    },
    {
      id: 'tests',
      title: b('Entrance exams and TOLC', 'ভর্তি পরীক্ষা আর TOLC'),
      items: [
        qa(
          'exam',
          b('Is there an entrance exam?', 'ভর্তি পরীক্ষা আছে কি?'),
          [
            b(
              'It depends on the program. Programs with restricted access (a limited number of places) are regulated by a call for applications and usually include a selection; open-access programs may still ask for a test or document evaluation. The program’s admission notice says which.',
              'Program অনুযায়ী। সীমিত আসনের (restricted access) program একটি call দিয়ে চলে আর সাধারণত বাছাই থাকে; open-access program-ও পরীক্ষা বা document মূল্যায়ন চাইতে পারে। কোনটা লাগবে, program-এর admission notice-এ লেখা থাকে।',
            ),
            CHECK_UNI,
          ],
          [IT_UNIVERSITALY_PROCEDURE, IT_CISIA_TOLC, IT_UNIPV_PREENROL],
          { status: 'partly-verified' },
        ),
        qa(
          'tolc',
          b('What is the TOLC?', 'TOLC কী?'),
          [
            b(
              'The TOLC (Test Online CISIA) is an admission test created by CISIA and used by universities to check the knowledge needed for a degree. It is multiple-choice, with a time limit for each section. It can be taken in a university classroom (TOLC@UNI) or remotely (TOLC@HOME), at any university — the result is valid for every program that requires that TOLC type.',
              'TOLC (Test Online CISIA) হলো CISIA-র তৈরি ভর্তি পরীক্ষা, যা দিয়ে university degree-র জন্য দরকারি জ্ঞান যাচাই করে। MCQ, প্রতিটি অংশে সময় বাঁধা। University-র ক্লাসরুমে (TOLC@UNI) বা বাড়ি থেকে (TOLC@HOME) দেওয়া যায়, যেকোনো university-র আয়োজনে — ফল সেই ধরনের TOLC চাওয়া সব program-এ গণ্য।',
            ),
            b(
              'TOLCs run from February to November; you can repeat the same type once per calendar month; each costs EUR 35. Your score (total and per section) is shown at the end and the PDF result appears in your CISIA area.',
              'TOLC হয় February থেকে November; একই ধরন প্রতি ক্যালেন্ডার মাসে একবার দেওয়া যায়; প্রতিটির fee EUR 35। শেষে score (মোট আর অংশভিত্তিক) দেখায়, আর PDF ফল CISIA area-তে আসে।',
            ),
          ],
          [IT_CISIA_TOLC],
        ),
        qa(
          'subjects',
          b('Which subjects need which test?', 'কোন বিষয়ে কোন পরীক্ষা লাগে?'),
          [b('CISIA lists a TOLC type per field; each is "required by some universities", so check the program’s admission notice.', 'CISIA প্রতিটি ক্ষেত্রের জন্য আলাদা TOLC দেয়; প্রতিটি "কিছু university চায়", তাই program-এর admission notice দেখুন।')],
          [IT_CISIA_TOLC],
          {
            list: [
              b('TOLC-I — Engineering and other technical and scientific fields', 'TOLC-I — Engineering আর অন্যান্য প্রযুক্তি ও বিজ্ঞান'),
              b('TOLC-E — Economics, statistics and social sciences', 'TOLC-E — Economics, statistics আর সামাজিক বিজ্ঞান'),
              b('TOLC-S — Sciences', 'TOLC-S — বিজ্ঞান'),
              b('TOLC-B — Biology and related fields', 'TOLC-B — Biology ও সংশ্লিষ্ট বিষয়'),
              b('TOLC-F — Pharmaceutical sciences', 'TOLC-F — Pharmaceutical sciences'),
              b('TOLC-AV — Agriculture and veterinary sciences', 'TOLC-AV — কৃষি ও veterinary sciences'),
              b('TOLC-PSI — Psychology', 'TOLC-PSI — মনোবিজ্ঞান'),
              b('TOLC-SPS — Political and social sciences', 'TOLC-SPS — রাষ্ট্রবিজ্ঞান ও সমাজবিজ্ঞান'),
              b('TOLC-SU — Humanities', 'TOLC-SU — মানবিক'),
              b('TOLC-LP — Applied, career-focused degrees', 'TOLC-LP — ব্যবহারিক, পেশাভিত্তিক degree'),
            ],
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
          b('Can you study in English?', 'English-এ পড়া যায় কি?'),
          [
            b(
              'Yes, where a program is taught in a foreign language; the general procedure asks for at least B2 (CEFR) in that language, from an internationally recognised body or the university, covering all four skills. How many bachelor’s programs are taught in English is not verified here.',
              'হ্যাঁ, যেখানে program বিদেশি ভাষায় পড়ানো হয়; সাধারণ procedure সেই ভাষায় কমপক্ষে B2 (CEFR) চায়, আন্তর্জাতিকভাবে স্বীকৃত প্রতিষ্ঠান বা university থেকে, চারটি দক্ষতাসহ। English-এ কতগুলো bachelor’s program পড়ানো হয়, তা এখানে যাচাই হয়নি।',
            ),
          ],
          [IT_CONSULATE_PROCEDURE],
          { status: 'partly-verified' },
        ),
        qa(
          'ielts',
          b('Do you need IELTS?', 'IELTS লাগবে কি?'),
          [
            b(
              'Not necessarily IELTS by name: the Embassy of Italy in Dhaka accepts certificates from globally recognised institutes or universities that state your level in all four skills, and the procedure asks for at least B2. The exact test and score are set by each program.',
              'নাম ধরে IELTS-ই লাগবে এমন নয়: ঢাকার Italy Embassy বিশ্বব্যাপী স্বীকৃত প্রতিষ্ঠান বা university-র সনদ নেয়, যেখানে চারটি দক্ষতার level থাকে, আর procedure কমপক্ষে B2 চায়। ঠিক কোন test আর কত score, তা প্রতিটি program ঠিক করে।',
            ),
            CHECK_UNI,
          ],
          [IT_EMB_NOTICE, IT_CONSULATE_PROCEDURE],
        ),
        qa(
          'italian',
          b('Do you need Italian?', 'Italian ভাষা লাগবে কি?'),
          [
            b(
              'For Italian-taught programs, yes: the university tests Italian at least at B2 (B1 for foundation courses), and for the visa only certificates from Italian Cultural Institutes or CLIQ-member bodies at B2 or above count. For English-taught programs Italian is not an admission requirement in the sources we read.',
              'Italian-এ পড়ানো program-এ হ্যাঁ: university কমপক্ষে B2 (foundation course-এ B1) Italian যাচাই করে, আর visa-র জন্য শুধু Italian Cultural Institute বা CLIQ-সদস্য প্রতিষ্ঠানের B2 বা তার বেশি সনদ গণ্য। আমরা যে source পড়েছি, তাতে English program-এ Italian ভর্তির শর্ত নয়।',
            ),
          ],
          [IT_CONSULATE_PROCEDURE],
        ),
        languageVisa('language-visa'),
      ],
    },
    {
      id: 'costs',
      title: b('Costs', 'খরচ'),
      items: [tuition('tuition'), living('living'), { embed: 'costs' }, funds('funds')],
    },
    { id: 'documents', title: b('Documents', 'Documents'), items: [qualification('cimea'), { embed: 'documents' }] },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b('How does the application process work?', 'আবেদনের প্রক্রিয়া কেমন?'),
          [
            b(
              'Choose a program; read its admission notice; take any test it asks for (for example a TOLC); apply to the university; after a positive evaluation pre-enrol on Universitaly; wait for VFS Global’s email and apply for the visa; enrol and apply for the residence permit after arrival.',
              'Program বাছুন; তার admission notice পড়ুন; যে পরীক্ষা চায় তা দিন (যেমন TOLC); university-তে আবেদন করুন; ইতিবাচক মূল্যায়নের পর Universitaly-তে pre-enrolment; VFS Global-এর email-এর অপেক্ষা করে visa-র আবেদন; পৌঁছে ভর্তি সম্পন্ন করে residence permit-এর আবেদন।',
            ),
          ],
          [IT_UNIVERSITALY_STEPS, IT_EMB_NOTICE],
        ),
        universitaly('universitaly'),
        qa(
          'when',
          b('When are the deadlines?', 'শেষ তারিখ কখন?'),
          [
            b(
              'Admission deadlines are set by each university; some run several intakes. Example — University of Pavia 2026/27: pre-enrolment by 25 May 2026 for its first and third intakes, 20 July 2026 for the fourth, and 31 August 2026 for restricted-access programs. The last day to submit the visa application for 2026/2027 is 30 November 2026.',
              'ভর্তির শেষ তারিখ প্রতিটি university ঠিক করে; কেউ কেউ কয়েকটি intake চালায়। উদাহরণ — University of Pavia ২০২৬/২৭: প্রথম ও তৃতীয় intake-এর pre-enrolment ২৫ May ২০২৬-এর মধ্যে, চতুর্থটির ২০ July ২০২৬, আর restricted-access program-এর ৩১ August ২০২৬। ২০২৬/২০২৭-এর visa আবেদনের শেষ দিন ৩০ November ২০২৬।',
            ),
          ],
          [IT_UNIPV_PREENROL, IT_UNIVERSITALY_PROCEDURE],
        ),
      ],
    },
    {
      id: 'scholarships',
      title: b('Scholarships', 'Scholarship'),
      items: [
        dsu('dsu'),
        qa(
          'scholarships',
          b("Which scholarships are there for a Bachelor's?", "Bachelor's-এর জন্য কী scholarship আছে?"),
          [b("Mainly the regional DSU scholarship and fee reductions based on family income. The Italian Government (MAECI) grants announced by the Embassy in Dhaka for 2026-2027 are for master's, PhD and other advanced programs, not for bachelor's.", "মূলত আঞ্চলিক DSU scholarship আর পরিবারের আয়ভিত্তিক fee ছাড়। ঢাকার Embassy ঘোষিত ২০২৬-২০২৭-এর Italy সরকারের (MAECI) grant master's, PhD আর অন্যান্য উচ্চতর program-এর জন্য, bachelor's-এর জন্য নয়।")],
          [IT_EMB_MAECI_GRANTS, IT_ERGO_GRANT],
        ),
        { embed: 'scholarships' },
      ],
    },
    {
      id: 'universities',
      title: b('Universities', 'University'),
      items: [
        qa(
          'types',
          b('What kinds of institutions are there?', 'কী ধরনের প্রতিষ্ঠান আছে?'),
          [b('State universities and legally recognised non-state institutions, plus AFAM institutions for art, music and dance. The examples below are listed alphabetically, not ordered by quality; check each university’s own page.', 'রাষ্ট্রীয় university আর আইনত স্বীকৃত বেসরকারি প্রতিষ্ঠান, সঙ্গে শিল্প, সংগীত ও নৃত্যের AFAM প্রতিষ্ঠান। নিচের উদাহরণগুলো বর্ণানুক্রমে সাজানো, মান অনুযায়ী নয়; প্রতিটি university-র নিজের page দেখুন।')],
          [IT_EMB_MAECI_GRANTS, IT_UNIVERSITALY_PROCEDURE],
        ),
        { embed: 'universities' },
      ],
    },
    { id: 'work', title: b('Part-time work', 'Part-time কাজ'), items: [work('work')] },
    { id: 'visa', title: b('Visa', 'Visa'), items: [visa('visa'), visaTime('visa-time')] },
    { id: 'after', title: b('After graduation', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b("Usually 2 years (laurea magistrale) · after a bachelor's", "সাধারণত ২ বছর (laurea magistrale) · bachelor's-এর পরে"),
  intro: b(
    "An Italian master's (laurea magistrale, second cycle) needs a university degree, and each program checks that your background fits. Programs taught in English ask for a B2-level certificate; the Italian Government (MAECI) grants and regional DSU scholarships are both open to master's students.",
    "Italy-র master's (laurea magistrale, second cycle)-এর জন্য university degree লাগে, আর প্রতিটি program দেখে আপনার আগের পড়াশোনা মেলে কিনা। English-এ পড়ানো program B2 level-এর সনদ চায়; Italy সরকারের (MAECI) grant আর আঞ্চলিক DSU scholarship — দুটোই master's student-দের জন্য খোলা।",
  ),
  costs: { official: [UNIBO_FIXED, REGIONAL_TAX, FUNDS, REPATRIATION], estimates: NOT_VERIFIED_COSTS },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("Do you need a bachelor's degree?", "Bachelor's degree লাগবে কি?"),
          [
            b(
              "Yes. Pre-enrolment for a master's is made with your bachelor's degree certificate (in English, Spanish or French, or officially translated into Italian) and the admission or conditional offer letter.",
              "হ্যাঁ। Master's-এর pre-enrolment করতে হয় bachelor's degree-র সনদ (English, Spanish বা French-এ, নয়তো official Italian অনুবাদ) আর admission বা conditional offer letter দিয়ে।",
            ),
          ],
          [IT_UNIPV_PREENROL],
        ),
        qa(
          'background',
          b('Does your subject background matter? Are there credit requirements?', 'আগের বিষয় কি গুরুত্বপূর্ণ? Credit-এর শর্ত আছে কি?'),
          [
            b(
              'Yes, usually: evaluating a foreign degree for admission is the exclusive competence of the Italian institution, and programs decide what background they accept. Specific credit or subject requirements are not verified here for any program.',
              'হ্যাঁ, সাধারণত: ভর্তির জন্য বিদেশি degree মূল্যায়ন একমাত্র Italy-র institution-এর এখতিয়ার, আর কোন background নেবে তা program ঠিক করে। কোনো program-এর নির্দিষ্ট credit বা বিষয়ের শর্ত এখানে যাচাই হয়নি।',
            ),
            CHECK_UNI,
          ],
          [IT_UNIVERSITALY_PROCEDURE],
          { status: 'partly-verified' },
        ),
        qa(
          'cgpa',
          b('What CGPA is needed?', 'কত CGPA লাগে?'),
          [
            b(
              'Not verified yet: there is no national minimum CGPA in the official sources we read. Some programs set one in their call; the Embassy also looks at the quality of your previous studies when assessing the visa.',
              'এখনো যাচাই হয়নি: আমরা যে official source পড়েছি, তাতে জাতীয় কোনো minimum CGPA নেই। কিছু program তাদের call-এ ঠিক করে দেয়; visa মূল্যায়নে Embassy-ও আপনার আগের পড়াশোনার মান দেখে।',
            ),
            CHECK_UNI,
          ],
          [IT_UNIVERSITALY_PROCEDURE],
          { status: 'not-verified' },
        ),
        qa(
          'selection',
          b('Are there interviews, portfolios or other documents?', 'Interview, portfolio বা অন্য document লাগে কি?'),
          [
            b(
              'Programs often ask for a CV, motivation letter, recommendation letters or a portfolio, and some interview candidates — but each call decides, and none of these is verified here for a specific program.',
              'Program প্রায়ই CV, motivation letter, recommendation letter বা portfolio চায়, কেউ কেউ interview নেয় — তবে প্রতিটি call নিজে ঠিক করে, আর কোনো নির্দিষ্ট program-এর জন্য এগুলো এখানে যাচাই হয়নি।',
            ),
            CHECK_UNI,
          ],
          [IT_UNIVERSITALY_PROCEDURE],
          { kind: 'guidance' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language', 'ভাষা'),
      items: [
        qa(
          'english',
          b('English-taught or Italian-taught — what do you need?', 'English-এ না Italian-এ — কী লাগবে?'),
          [
            b(
              'English-taught: at least B2 (CEFR) from an internationally recognised body or the university, covering all four skills. Italian-taught: the university tests Italian at least at B2; for the visa only certificates from Italian Cultural Institutes or CLIQ-member bodies at B2 or above count.',
              'English-এ: আন্তর্জাতিকভাবে স্বীকৃত প্রতিষ্ঠান বা university থেকে কমপক্ষে B2 (CEFR), চারটি দক্ষতাসহ। Italian-এ: university কমপক্ষে B2 Italian যাচাই করে; visa-র জন্য শুধু Italian Cultural Institute বা CLIQ-সদস্য প্রতিষ্ঠানের B2 বা তার বেশি সনদ গণ্য।',
            ),
          ],
          [IT_CONSULATE_PROCEDURE],
        ),
        qa(
          'ielts',
          b('IELTS, TOEFL or alternatives?', 'IELTS, TOEFL নাকি বিকল্প?'),
          [
            b(
              'The Embassy of Italy in Dhaka accepts certificates from globally recognised institutes or universities that state your level in all four skills. Which tests and scores each program accepts (IELTS, TOEFL or a university’s own letter) is set by the program.',
              'ঢাকার Italy Embassy বিশ্বব্যাপী স্বীকৃত প্রতিষ্ঠান বা university-র সনদ নেয়, যেখানে চারটি দক্ষতার level থাকে। কোন program কোন test আর score নেবে (IELTS, TOEFL বা university-র নিজের চিঠি), তা program ঠিক করে।',
            ),
            CHECK_UNI,
          ],
          [IT_EMB_NOTICE],
        ),
        languageVisa('language-visa'),
      ],
    },
    {
      id: 'costs',
      title: b('Costs', 'খরচ'),
      items: [tuition('tuition'), living('living'), { embed: 'costs' }, funds('funds')],
    },
    { id: 'documents', title: b('Documents', 'Documents'), items: [qualification('cimea'), { embed: 'documents' }] },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'when',
          b('What is the timeline?', 'সময়সূচি কেমন?'),
          [
            b(
              'Apply to the program by its deadline (each university sets its own, often with several intakes), then pre-enrol on Universitaly and apply for the visa. The last day to submit a visa application for 2026/2027 is 30 November 2026; your university may ask for it earlier.',
              'Program-এর শেষ তারিখের মধ্যে আবেদন করুন (প্রতিটি university নিজে ঠিক করে, প্রায়ই কয়েকটি intake), তারপর Universitaly-তে pre-enrolment আর visa-র আবেদন। ২০২৬/২০২৭-এর visa আবেদনের শেষ দিন ৩০ November ২০২৬; university আরও আগে চাইতে পারে।',
            ),
          ],
          [IT_UNIVERSITALY_PROCEDURE, IT_UNIPV_PREENROL],
        ),
        universitaly('universitaly'),
      ],
    },
    {
      id: 'scholarships',
      title: b('Scholarships', 'Scholarship'),
      items: [
        qa(
          'maeci',
          b('What is the Italian Government (MAECI) scholarship?', 'Italy সরকারের (MAECI) scholarship কী?'),
          [
            b(
              "For 2026-2027 the Ministry of Foreign Affairs offered study grants of EUR 1,200 a month for master's (second cycle), AFAM, PhD, jointly supervised research and advanced Italian courses at state or legally recognised institutions. Applications were online on the Study in Italy portal by 26 March 2026; the next call is published there.",
              "২০২৬-২০২৭-এর জন্য Italy-র পররাষ্ট্র মন্ত্রণালয় মাসে EUR 1,200-এর study grant দিয়েছে — master's (second cycle), AFAM, PhD, যৌথ তত্ত্বাবধানের গবেষণা আর উচ্চতর Italian course-এর জন্য, রাষ্ট্রীয় বা আইনত স্বীকৃত প্রতিষ্ঠানে। আবেদন ছিল Study in Italy portal-এ online, ২৬ March ২০২৬-এর মধ্যে; পরের call সেখানেই প্রকাশ হয়।",
            ),
          ],
          [IT_EMB_MAECI_GRANTS, IT_STUDY_IN_ITALY],
        ),
        dsu('dsu'),
        { embed: 'scholarships' },
      ],
    },
    { id: 'universities', title: b('Universities', 'University'), items: [{ embed: 'universities' }] },
    { id: 'work', title: b('Part-time work', 'Part-time কাজ'), items: [work('work')] },
    { id: 'visa', title: b('Visa', 'Visa'), items: [visa('visa'), visaTime('visa-time')] },
    { id: 'after', title: b('After graduation', 'পড়া শেষে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ PhD

const PHD: DegreeGuide = {
  level: 'phd',
  card: b("Doctorate (dottorato) · after a master's-level degree", "Doctorate (dottorato) · master's-level degree-র পরে"),
  intro: b(
    "Italian PhD positions are filled through public calls (bando) that each university publishes, with a selection based on qualifications and usually an interview. Many positions come with a scholarship — for example EUR 16,243 gross a year in the University of Pisa's 2026/2027 calls — and the visa for a doctorate has no fixed national deadline, but must be requested before activities start.",
    "Italy-তে PhD-র আসন পূরণ হয় প্রতিটি university-র প্রকাশ করা public call (bando)-এর মাধ্যমে; যোগ্যতার ভিত্তিতে বাছাই, সাধারণত interview-সহ। অনেক আসনে scholarship থাকে — যেমন University of Pisa-র ২০২৬/২০২৭ call-এ বছরে gross EUR 16,243 — আর doctorate-এর visa-র কোনো নির্দিষ্ট জাতীয় শেষ তারিখ নেই, তবে কার্যক্রম শুরুর আগেই আবেদন করতে হবে।",
  ),
  costs: { official: [REGIONAL_TAX, FUNDS, REPATRIATION], estimates: NOT_VERIFIED_COSTS },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'master',
          b("Do you need a master's degree?", "Master's degree লাগবে কি?"),
          [
            b(
              "Generally a second-cycle (master's-level) degree or an equivalent foreign qualification; the call states exactly which qualifications are accepted and whether you can apply before graduating. Not verified here for a specific call.",
              "সাধারণত second-cycle (master's-level) degree বা সমমানের বিদেশি যোগ্যতা; কোন যোগ্যতা নেওয়া হবে আর degree শেষের আগে আবেদন করা যায় কিনা, তা call-এ লেখা থাকে। কোনো নির্দিষ্ট call-এর জন্য এখানে যাচাই হয়নি।",
            ),
            CHECK_UNI,
          ],
          [IT_UNIPI_PHD],
          { status: 'partly-verified' },
        ),
        qa(
          'calls',
          b('What is a PhD call (bando) and how does admission work?', 'PhD call (bando) কী, ভর্তি কীভাবে হয়?'),
          [
            b(
              'Each university publishes calls for its doctoral programs for the academic year (for example the University of Pisa’s 2026/2027 calls). The call lists the positions, the documents, the selection (qualifications, often a research proposal and an interview) and the deadlines. You apply to the university, not through a national system.',
              'প্রতিটি university শিক্ষাবর্ষের জন্য তার doctoral program-এর call প্রকাশ করে (যেমন University of Pisa-র ২০২৬/২০২৭ call)। Call-এ আসন, document, বাছাই (যোগ্যতা, প্রায়ই research proposal আর interview) আর শেষ তারিখ থাকে। আবেদন university-তে, কোনো জাতীয় ব্যবস্থায় নয়।',
            ),
          ],
          [IT_UNIPI_PHD],
          { status: 'partly-verified' },
        ),
        qa(
          'proposal',
          b('Do you need a research proposal or a supervisor first?', 'আগে research proposal বা supervisor লাগবে কি?'),
          [
            b(
              'It depends on the call: many ask for a research project and assess it in the selection; some programs assign supervisors after admission. Contacting a research group before applying is common guidance, not an official rule.',
              'Call অনুযায়ী: অনেক call research project চায় আর বাছাইয়ে তা মূল্যায়ন করে; কিছু program ভর্তির পরে supervisor ঠিক করে। আবেদনের আগে research group-এর সঙ্গে যোগাযোগ করা প্রচলিত পরামর্শ, official নিয়ম নয়।',
            ),
            CHECK_UNI,
          ],
          [IT_UNIPI_PHD],
          { kind: 'guidance' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('Language', 'ভাষা'),
      items: [
        qa(
          'english',
          b('Which language do you need?', 'কোন ভাষা লাগবে?'),
          [
            b(
              'The language requirement is set in each call. For the visa, the Embassy of Italy in Dhaka accepts language certificates from globally recognised institutes or universities that state your level in all four skills.',
              'ভাষার শর্ত প্রতিটি call-এ থাকে। Visa-র জন্য ঢাকার Italy Embassy বিশ্বব্যাপী স্বীকৃত প্রতিষ্ঠান বা university-র সনদ নেয়, যেখানে চারটি দক্ষতার level থাকে।',
            ),
            CHECK_UNI,
          ],
          [IT_EMB_NOTICE, IT_UNIPI_PHD],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'funding',
      title: b('Funding, stipend and tuition', 'Funding, stipend আর tuition'),
      items: [
        qa(
          'stipend',
          b('How much is a PhD scholarship?', 'PhD scholarship কত?'),
          [
            b(
              'Example: the University of Pisa’s 2026/2027 calls give EUR 16,243 a year gross, plus a research budget of at least 10% of the scholarship. Other calls can set different amounts — read the call.',
              'উদাহরণ: University of Pisa-র ২০২৬/২০২৭ call-এ বছরে gross EUR 16,243, সঙ্গে scholarship-এর কমপক্ষে ১০% গবেষণা বাজেট। অন্য call-এ অঙ্ক আলাদা হতে পারে — call পড়ুন।',
            ),
          ],
          [IT_UNIPI_PHD],
        ),
        qa(
          'funded',
          b('Funded vs unfunded positions — what is the difference?', 'Funded আর unfunded আসনের পার্থক্য কী?'),
          [
            b(
              'Not verified yet in general terms: each call lists its positions and which of them carry a scholarship; tuition and fees for doctoral students are also set in the call. With a scholarship you have income; without one you must show and fund your own living costs (the visa minimum is EUR 10,179.85 per year).',
              'এখনো সাধারণভাবে যাচাই হয়নি: প্রতিটি call-এ আসনের তালিকা আর কোনগুলোতে scholarship আছে তা থাকে; doctoral student-দের tuition ও fee-ও call-এ থাকে। Scholarship থাকলে আয় আছে; না থাকলে থাকার খরচ নিজেকে দেখাতে ও চালাতে হবে (visa-র minimum বছরে EUR 10,179.85)।',
            ),
          ],
          [IT_UNIPI_PHD, IT_CONSULATE_PROCEDURE],
          { status: 'not-verified' },
        ),
        qa(
          'maeci',
          b('Can the Italian Government (MAECI) scholarship fund a PhD?', 'Italy সরকারের (MAECI) scholarship কি PhD-তে পাওয়া যায়?'),
          [b('Yes — the 2026-2027 MAECI grants (EUR 1,200 a month) included PhD programs and jointly supervised research. Apply on the Study in Italy portal when the call opens.', 'হ্যাঁ — ২০২৬-২০২৭-এর MAECI grant (মাসে EUR 1,200)-এ PhD program আর যৌথ তত্ত্বাবধানের গবেষণা ছিল। Call খুললে Study in Italy portal-এ আবেদন করুন।')],
          [IT_EMB_MAECI_GRANTS, IT_STUDY_IN_ITALY],
        ),
        { embed: 'scholarships' },
        living('living'),
        { embed: 'costs' },
        funds('funds'),
      ],
    },
    { id: 'documents', title: b('Documents', 'Documents'), items: [qualification('cimea'), { embed: 'documents' }] },
    {
      id: 'apply',
      title: b('Applying and visa timing', 'আবেদন আর visa-র সময়'),
      items: [
        qa(
          'when',
          b('When do you apply for the visa for a PhD?', 'PhD-র জন্য visa-র আবেদন কখন?'),
          [
            b(
              'For doctorates there is no fixed national deadline for the visa application (unlike degree programs), but it cannot be later than the start of the teaching activities. You still pre-enrol on Universitaly.',
              'Doctorate-এর ক্ষেত্রে visa আবেদনের কোনো নির্দিষ্ট জাতীয় শেষ তারিখ নেই (degree program-এর মতো নয়), তবে কার্যক্রম শুরুর পরে হতে পারবে না। Universitaly-তে pre-enrolment তবুও করতে হবে।',
            ),
          ],
          [IT_UNIVERSITALY_PROCEDURE],
        ),
        qa(
          'duration',
          b('How long does a PhD take?', 'PhD কত বছরের?'),
          [b('Not verified yet: the duration is stated in each call; we did not verify a general rule here.', 'এখনো যাচাই হয়নি: মেয়াদ প্রতিটি call-এ লেখা থাকে; সাধারণ নিয়ম এখানে যাচাই করা হয়নি।')],
          [IT_UNIPI_PHD],
          { status: 'not-verified' },
        ),
        universitaly('universitaly'),
      ],
    },
    { id: 'universities', title: b('Universities', 'University'), items: [{ embed: 'universities' }] },
    { id: 'work', title: b('Part-time work', 'Part-time কাজ'), items: [work('work')] },
    { id: 'visa', title: b('Visa and residence', 'Visa আর residence'), items: [visa('visa'), visaTime('visa-time')] },
    { id: 'after', title: b('After the PhD', 'PhD-র পরে'), items: [after('after')] },
  ],
};

// ------------------------------------------------------------------ the country

export const IT_GUIDE: CountryGuide = {
  code: 'IT',
  checkedAt: IT_READ,
  sourcesPerSection: true,
  intro: b(
    'Italy admits students after 12 years of school, public university fees depend on the program and on family income, regional DSU scholarships can waive fees, and every non-EU student pre-enrols on the national Universitaly portal before the visa. This guide is built from Italian official sources, including the Embassy of Italy in Dhaka.',
    'Italy ১২ বছরের পড়াশোনা শেষে student নেয়; public university-র fee program আর পরিবারের আয়ের উপর নির্ভর করে; আঞ্চলিক DSU scholarship fee মাফ করতে পারে; আর প্রত্যেক non-EU student visa-র আগে জাতীয় Universitaly portal-এ pre-enrolment করেন। এই guide Italy-র official source থেকে তৈরি, ঢাকার Italy Embassy-সহ।',
  ),
  overview: [
    qa(
      'why',
      b('Why do international students choose Italy?', 'International student-রা কেন Italy বেছে নেন?'),
      [
        b(
          'Factually: public university fees are tied to family income (University of Bologna example: from EUR 157.04 a year), regional DSU scholarships can include full fee exemption, the Italian Government offers study grants for master’s and PhD, programs are also taught in English, and students may work up to 20 hours a week.',
          'তথ্য অনুযায়ী: public university-র fee পরিবারের আয়ের সঙ্গে যুক্ত (University of Bologna-র উদাহরণ: বছরে EUR 157.04 থেকে), আঞ্চলিক DSU scholarship-এ পুরো fee মাফ থাকতে পারে, Italy সরকার master’s ও PhD-র জন্য grant দেয়, English-এও program পড়ানো হয়, আর student-রা সপ্তাহে ২০ ঘণ্টা পর্যন্ত কাজ করতে পারেন।',
        ),
      ],
      [IT_UNIBO_FEES, IT_ERGO_GRANT, IT_EMB_MAECI_GRANTS, IT_MIGRANTS_STUDY],
    ),
    qa(
      'system',
      b('How does the higher education system work?', 'উচ্চশিক্ষা ব্যবস্থা কেমন?'),
      [
        b(
          "Degree courses are in cycles: the laurea (first cycle, bachelor's level), the laurea magistrale (second cycle, master's level, with some single-cycle programs) and the doctorate. Art, music and dance have their own AFAM diplomas of first and second level.",
          "Degree course-গুলো cycle-এ ভাগ: laurea (first cycle, bachelor's), laurea magistrale (second cycle, master's; কিছু single-cycle program-ও আছে) আর doctorate। শিল্প, সংগীত ও নৃত্যের জন্য প্রথম ও দ্বিতীয় level-এর আলাদা AFAM diploma আছে।",
        ),
      ],
      [IT_UNIVERSITALY_PROCEDURE, IT_MUR_CIRCULAR],
    ),
    qa(
      'public-private',
      b('Public or private?', 'Public নাকি private?'),
      [
        b(
          'There are state institutions and legally recognised non-state ones; the Italian Government grants cover both. Fees at non-state universities are not verified here.',
          'রাষ্ট্রীয় প্রতিষ্ঠান আর আইনত স্বীকৃত বেসরকারি প্রতিষ্ঠান আছে; Italy সরকারের grant দুটোতেই প্রযোজ্য। বেসরকারি university-র fee এখানে যাচাই হয়নি।',
        ),
      ],
      [IT_EMB_MAECI_GRANTS],
      { status: 'partly-verified' },
    ),
    qa(
      'cities',
      b('Which cities?', 'কোন কোন শহর?'),
      [
        b(
          'The example universities in this guide are in Bologna, Milan, Padua, Pisa and Rome. Costs and DSU rules depend on the region, so the city you choose changes both.',
          'এই guide-এর উদাহরণ university-গুলো Bologna, Milan, Padua, Pisa আর Rome-এ। খরচ আর DSU-র নিয়ম region অনুযায়ী আলাদা, তাই শহর বাছাই দুটোকেই বদলায়।',
        ),
      ],
      [IT_ERGO_GRANT],
      { kind: 'guidance' },
    ),
    qa(
      'languages',
      b('English-taught or Italian-taught?', 'English-এ না Italian-এ?'),
      [
        b(
          'Both exist. Foreign-language programs ask for at least B2 in that language; Italian-taught ones test Italian at least at B2 (B1 for foundation courses).',
          'দুটোই আছে। বিদেশি ভাষার program সেই ভাষায় কমপক্ষে B2 চায়; Italian program কমপক্ষে B2 Italian যাচাই করে (foundation course-এ B1)।',
        ),
      ],
      [IT_CONSULATE_PROCEDURE],
    ),
    qa(
      'admission',
      b('How does admission work?', 'ভর্তি কীভাবে হয়?'),
      [
        b(
          'Two steps that are easy to confuse: (1) admission by the university, which evaluates your qualification and may use a test; (2) pre-enrolment on Universitaly, which the university validates and the Embassy uses for the visa. Both are needed.',
          'দুটি ধাপ, যা গুলিয়ে ফেলা সহজ: (১) university-র ভর্তি, যেখানে আপনার যোগ্যতা মূল্যায়ন হয়, পরীক্ষাও থাকতে পারে; (২) Universitaly-তে pre-enrolment, যা university validate করে আর Embassy visa-র জন্য ব্যবহার করে। দুটোই লাগবে।',
        ),
      ],
      [IT_UNIVERSITALY_STEPS, IT_UNIVERSITALY_PROCEDURE],
    ),
    qa(
      'tuition-overview',
      b('How much is tuition?', 'Tuition কত?'),
      [
        b(
          'It depends on the university, the program and your family’s income and assets. Example — University of Bologna 2026/27: EUR 157.04 fixed plus a variable part up to a program maximum; plus a regional tax (up to EUR 190 in Lombardy, Politecnico di Milano).',
          'University, program আর পরিবারের আয়-সম্পদের উপর নির্ভর করে। উদাহরণ — University of Bologna ২০২৬/২৭: নির্দিষ্ট EUR 157.04, সঙ্গে program-এর সর্বোচ্চ পর্যন্ত পরিবর্তনশীল অংশ; আর regional tax (Lombardy-তে, Politecnico di Milano, সর্বোচ্চ EUR 190)।',
        ),
      ],
      [IT_UNIBO_FEES, IT_POLIMI_FOREIGN_INCOME],
      { status: 'partly-verified' },
    ),
    qa(
      'visa-overview',
      b('How does the student visa work?', 'Student visa কীভাবে কাজ করে?'),
      [
        b(
          'After admission and a validated Universitaly pre-enrolment, VFS Global emails you for an appointment and you apply for a national ("D") study visa at the Embassy of Italy in Dhaka — by 30 November 2026 for 2026/2027. The Embassy decides, and also assesses whether your purpose is really to study.',
          'ভর্তি আর validate করা Universitaly pre-enrolment-এর পরে VFS Global email-এ appointment দেয়, আর ঢাকার Italy Embassy-তে national ("D") study visa-র আবেদন করেন — ২০২৬/২০২৭-এর জন্য ৩০ November ২০২৬-এর মধ্যে। সিদ্ধান্ত Embassy-র, যারা যাচাই করে উদ্দেশ্য সত্যিই পড়াশোনা কিনা।',
        ),
      ],
      [IT_EMB_NOTICE, IT_UNIVERSITALY_PROCEDURE],
    ),
    qa(
      'timeline',
      b('What does the timeline look like?', 'সময়সূচি কেমন?'),
      [b('Typical order for 2026/2027, using official dates:', '২০২৬/২০২৭-এর সাধারণ ক্রম, official তারিখসহ:')],
      [IT_EMB_MAECI_GRANTS, IT_UNIPV_PREENROL, IT_UNIVERSITALY_PROCEDURE, IT_CISIA_TOLC],
      {
        kind: 'guidance',
        list: [
          b('February–November: TOLC sessions (if your program uses one).', 'February–November: TOLC (program চাইলে)।'),
          b("By late March: MAECI grant applications (26 March 2026 for 2026-2027; master's and PhD).", "March-এর শেষ দিকে: MAECI grant-এর আবেদন (২০২৬-২০২৭-এর জন্য ২৬ March ২০২৬; master's ও PhD)।"),
          b('Spring–summer: university deadlines and pre-enrolment (example: University of Pavia, 25 May / 20 July / 31 August 2026).', 'বসন্ত–গ্রীষ্ম: university-র শেষ তারিখ আর pre-enrolment (উদাহরণ: University of Pavia, ২৫ May / ২০ July / ৩১ August ২০২৬)।'),
          b('Summer–autumn: DSU call deadlines in your region.', 'গ্রীষ্ম–শরৎ: আপনার region-এর DSU call-এর শেষ তারিখ।'),
          b('By 30 November 2026: last day for the visa application.', '৩০ November ২০২৬-এর মধ্যে: visa আবেদনের শেষ দিন।'),
          b('Within 8 working days of arrival: residence permit application.', 'পৌঁছানোর ৮ কর্মদিবসের মধ্যে: residence permit-এর আবেদন।'),
        ],
        status: 'partly-verified',
      },
    ),
    qa(
      'mistakes',
      b('Which mistakes do applicants often make?', 'আবেদনকারীরা কোন ভুলগুলো প্রায়ই করেন?'),
      [b('Points the official sources warn about:', 'Official source যেসব বিষয়ে সতর্ক করে:')],
      [IT_EMB_NOTICE, IT_EMB_CHECKLIST, IT_UNIVERSITALY_PROCEDURE, IT_CONSULATE_PROCEDURE],
      {
        kind: 'guidance',
        list: [
          b('Thinking a validated pre-enrolment guarantees an appointment or a visa — it does not.', 'Validate করা pre-enrolment মানেই appointment বা visa — এমন ভাবা; তা নয়।'),
          b('Using a different email from the one on Universitaly — VFS Global writes to that address.', 'Universitaly-র email ছাড়া অন্য email ব্যবহার — VFS Global ওই ঠিকানাতেই লেখে।'),
          b('A language certificate that does not show all four skills.', 'চারটি দক্ষতা না দেখানো ভাষার সনদ।'),
          b('Missing the CIMEA statement or Declaration of Value.', 'CIMEA statement বা Declaration of Value না থাকা।'),
          b('A bank statement shorter than the 12 months the Dhaka checklist asks for, or funds whose source cannot be explained.', 'ঢাকার checklist-এর চাওয়া ১২ মাসের চেয়ে কম সময়ের bank statement, বা যে টাকার উৎস ব্যাখ্যা করা যায় না।'),
          b('Leaving the visa to the last day — universities can set earlier dates than 30 November.', 'Visa শেষ দিনের জন্য রেখে দেওয়া — university ৩০ November-এর আগের তারিখও দিতে পারে।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('hsc', b("Can you apply for a Bachelor's with HSC?", "HSC দিয়ে কি Bachelor's-এ আবেদন করা যায়?"), [b('Yes: first-cycle degrees need a secondary-school diploma after at least 12 years of schooling, and SSC + HSC make 12 years. The university still evaluates your certificate and may set a test.', 'হ্যাঁ: first-cycle degree-র জন্য কমপক্ষে ১২ বছরের পড়াশোনা শেষে secondary-school diploma লাগে, আর SSC + HSC মিলে ১২ বছর। তবু university আপনার সনদ মূল্যায়ন করে, পরীক্ষাও নিতে পারে।')], [IT_MUR_CIRCULAR]),
    qa('ielts', b('Do you need IELTS?', 'IELTS লাগবে কি?'), [b('You need a certificate of at least B2 in the language of the program, from a globally recognised institute or a university, showing all four skills; IELTS is one option. The exact test and score are set by the program.', 'Program-এর ভাষায় কমপক্ষে B2-এর সনদ লাগবে, বিশ্বব্যাপী স্বীকৃত প্রতিষ্ঠান বা university থেকে, চারটি দক্ষতাসহ; IELTS এর একটি বিকল্প। ঠিক কোন test আর score, তা program ঠিক করে।')], [IT_EMB_NOTICE, IT_CONSULATE_PROCEDURE]),
    qa('tolc', b('What is the TOLC?', 'TOLC কী?'), [b('An online admission test by CISIA, used by some universities, in types per field (TOLC-I for engineering, TOLC-E for economics, and others). It runs February–November, costs EUR 35 and can be taken at home (TOLC@HOME).', 'CISIA-র online ভর্তি পরীক্ষা, কিছু university ব্যবহার করে; বিষয় অনুযায়ী আলাদা ধরন (engineering-এ TOLC-I, economics-এ TOLC-E, ইত্যাদি)। February–November হয়, fee EUR 35, বাড়ি থেকেও দেওয়া যায় (TOLC@HOME)।')], [IT_CISIA_TOLC]),
    qa('cost', b('How much does it cost to study in Italy?', 'Italy-তে পড়ার খরচ কত?'), [b('Fees depend on the university, program and family income (Bologna: from EUR 157.04 a year plus a variable part). You must show at least EUR 10,179.85 per academic year for the visa. An official average living cost is not verified here.', 'Fee নির্ভর করে university, program আর পরিবারের আয়ের উপর (Bologna: বছরে EUR 157.04 থেকে, সঙ্গে পরিবর্তনশীল অংশ)। Visa-র জন্য প্রতি শিক্ষাবর্ষে কমপক্ষে EUR 10,179.85 দেখাতে হয়। গড় থাকা-খাওয়ার official হিসাব এখানে যাচাই হয়নি।')], [IT_UNIBO_FEES, IT_CONSULATE_PROCEDURE], { status: 'partly-verified' }),
    qa('funds', b('How much money must you show for the visa?', 'Visa-র জন্য কত টাকা দেখাতে হয়?'), [b('At least EUR 10,179.85 per academic year plus about EUR 500 for repatriation. The Dhaka checklist asks for the sponsor’s last 12 months of bank statements from a bank in Bangladesh, with the source of funds explained.', 'প্রতি শিক্ষাবর্ষে কমপক্ষে EUR 10,179.85, সঙ্গে দেশে ফেরার জন্য প্রায় EUR 500। ঢাকার checklist Bangladesh-এর ব্যাংকের sponsor-এর শেষ ১২ মাসের bank statement চায়, টাকার উৎসের ব্যাখ্যাসহ।')], [IT_CONSULATE_PROCEDURE, IT_EMB_CHECKLIST]),
    qa('dsu', b('What is the DSU scholarship and can Bangladeshi students get it?', 'DSU scholarship কী, Bangladesh-এর student-রা পান কি?'), [b('A regional right-to-study scholarship (money, full fee exemption, regional tax refund; housing and meals are separate benefits) based on economic, merit and enrolment requirements. International students can apply with their family’s income documents from abroad; Bangladesh is on the MUR list of particularly poor countries for 2026/2027, which changes how your economic condition is certified.', 'আঞ্চলিক right-to-study scholarship (টাকা, পুরো fee মাফ, regional tax ফেরত; থাকা আর খাবার আলাদা সুবিধা), আর্থিক, merit আর ভর্তির শর্তের ভিত্তিতে। International student-রা বিদেশে পরিবারের আয়ের document দিয়ে আবেদন করতে পারেন; ২০২৬/২০২৭-এর MUR-এর particularly poor countries তালিকায় Bangladesh আছে, যা আর্থিক অবস্থা প্রত্যয়নের পদ্ধতি বদলায়।')], [IT_ERGO_GRANT, IT_ERGO_INTL, IT_MUR_POOR_COUNTRIES, IT_POLIMI_FOREIGN_INCOME]),
    qa('scholarships', b('Which scholarships are there?', 'কী কী scholarship আছে?'), [b("Regional DSU scholarships (all regions run their own), university fee reductions, and the Italian Government (MAECI) grants of EUR 1,200 a month for master's, PhD and other advanced programs (not bachelor's).", "আঞ্চলিক DSU scholarship (প্রতিটি region নিজের), university-র fee ছাড়, আর Italy সরকারের (MAECI) মাসে EUR 1,200-এর grant — master's, PhD আর অন্যান্য উচ্চতর program-এর জন্য (bachelor's নয়)।")], [IT_ERGO_GRANT, IT_EMB_MAECI_GRANTS]),
    qa('visa', b('How do you get the student visa?', 'Student visa কীভাবে পাবেন?'), [b('Admission → Universitaly pre-enrolment validated by the university → VFS Global emails you an appointment → national "D" visa application at the Embassy of Italy in Dhaka (by 30 November 2026 for 2026/2027) → residence permit within 8 working days of arrival. Processing time and fee are not verified here.', 'ভর্তি → university validate করা Universitaly pre-enrolment → VFS Global email-এ appointment দেয় → ঢাকার Italy Embassy-তে national "D" visa-র আবেদন (২০২৬/২০২৭-এর জন্য ৩০ November ২০২৬-এর মধ্যে) → পৌঁছে ৮ কর্মদিবসের মধ্যে residence permit। Processing time আর fee এখানে যাচাই হয়নি।')], [IT_EMB_NOTICE, IT_UNIVERSITALY_PROCEDURE, IT_CONSULATE_PROCEDURE], { status: 'partly-verified' }),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('For admission: certificates and transcripts, a language certificate, and whatever the program adds (TOLC, CV, motivation letter, portfolio, research proposal). For the visa: the D-visa form, passport, validated pre-enrolment, CIMEA statement or Declaration of Value, the sponsor’s 12-month bank statement, accommodation proof and a flight booking. Each degree guide explains every document once.', 'ভর্তির জন্য: সনদ ও transcript, ভাষার সনদ, আর program যা যোগ করে (TOLC, CV, motivation letter, portfolio, research proposal)। Visa-র জন্য: D-visa form, passport, validate করা pre-enrolment, CIMEA statement বা Declaration of Value, sponsor-এর ১২ মাসের bank statement, থাকার প্রমাণ আর বিমান booking। প্রতিটি degree guide-এ প্রতিটি document একবার ব্যাখ্যা করা আছে।')], [IT_EMB_CHECKLIST, IT_EMB_NOTICE, IT_MUR_CIRCULAR]),
    qa('work', b('Can you work part-time?', 'Part-time কাজ করা যায় কি?'), [b('Yes: up to 20 hours a week and no more than 1,040 hours a year with a study residence permit.', 'হ্যাঁ: study residence permit-এ সপ্তাহে সর্বোচ্চ ২০ ঘণ্টা আর বছরে ১,০৪০ ঘণ্টার বেশি নয়।')], [IT_MIGRANTS_STUDY]),
    qa('after', b('Can you stay after graduating?', 'পড়া শেষে থাকা যায় কি?'), [b('Yes: graduates can get a residence permit to look for work or start a business consistent with their studies, or convert the study permit into a work permit before it expires. The length of the job-seeking permit is not verified here.', 'হ্যাঁ: degree শেষে পড়ার সঙ্গে মিল রেখে চাকরি খুঁজতে বা ব্যবসা শুরু করতে residence permit পাওয়া যায়, অথবা মেয়াদ শেষের আগে study permit-কে work permit-এ রূপান্তর করা যায়। চাকরি খোঁজার permit-এর মেয়াদ এখানে যাচাই হয়নি।')], [IT_MIGRANTS_STUDY], { status: 'partly-verified' }),
    qa('italian', b('Do you need to speak Italian?', 'Italian জানা লাগবে কি?'), [b('Only for Italian-taught programs (at least B2, tested by the university). For English-taught programs Italian is not an admission requirement in the sources we read, though it helps in daily life.', 'শুধু Italian-এ পড়ানো program-এ (কমপক্ষে B2, university যাচাই করে)। আমরা যে source পড়েছি, তাতে English program-এ Italian ভর্তির শর্ত নয়, যদিও দৈনন্দিন জীবনে কাজে লাগে।')], [IT_CONSULATE_PROCEDURE]),
    qa('bachelors', b("What do you need for a Bachelor's?", "Bachelor's-এ কী লাগে?"), [b('12 years of schooling (HSC), the university’s admission (sometimes a TOLC), a B2 language certificate, Universitaly pre-enrolment and the visa.', '১২ বছরের পড়াশোনা (HSC), university-র ভর্তি (কখনো TOLC), B2 ভাষার সনদ, Universitaly pre-enrolment আর visa।')], [IT_MUR_CIRCULAR, IT_CISIA_TOLC]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A bachelor's degree whose background the program accepts, a B2 language certificate for the language of instruction, and whatever the call adds; then pre-enrolment and the visa.", "এমন bachelor's degree যার background program মেনে নেয়, পড়ানোর ভাষায় B2 সনদ, আর call যা যোগ করে; তারপর pre-enrolment আর visa।")], [IT_UNIPV_PREENROL, IT_CONSULATE_PROCEDURE]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b("A master's-level degree and a successful application to a university's PhD call (bando), which sets the documents, selection and scholarship.", "Master's-level degree আর university-র PhD call (bando)-তে সফল আবেদন; document, বাছাই আর scholarship call-ই ঠিক করে।")], [IT_UNIPI_PHD], { status: 'partly-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('State universities, legally recognised non-state ones and AFAM institutions. Examples on each degree page (Politecnico di Milano, Sapienza University of Rome, University of Bologna, University of Padua, University of Pisa) are listed alphabetically, not ordered by quality.', 'রাষ্ট্রীয় university, আইনত স্বীকৃত বেসরকারি university আর AFAM প্রতিষ্ঠান। প্রতিটি degree page-এ উদাহরণ (Politecnico di Milano, Sapienza University of Rome, University of Bologna, University of Padua, University of Pisa) বর্ণানুক্রমে দেওয়া, মান অনুযায়ী সাজানো নয়।')], [IT_EMB_MAECI_GRANTS]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('From the Embassy of Italy in Dhaka: VFS Global contacts you by email for the appointment (same email as Universitaly); you need a CIMEA statement or Declaration of Value; language certificates must show all four skills; funds may come from you or close relatives (parents, grandparents, siblings, uncles, aunts, cousins); the last day for 2026/2027 visa applications is 30 November 2026.', 'ঢাকার Italy Embassy থেকে: VFS Global email-এ appointment-এর জন্য যোগাযোগ করে (Universitaly-র email-এই); CIMEA statement বা Declaration of Value লাগবে; ভাষার সনদে চারটি দক্ষতা থাকতে হবে; অর্থ আপনার বা নিকট আত্মীয়ের হতে পারে (বাবা-মা, দাদা-দাদি, ভাই-বোন, চাচা-মামা, কাজিন); ২০২৬/২০২৭-এর visa আবেদনের শেষ দিন ৩০ November ২০২৬।'),
      b('Bangladesh is on the MUR list of particularly poor countries for 2026/2027, which matters for fees and DSU scholarships.', '২০২৬/২০২৭-এর MUR-এর particularly poor countries তালিকায় Bangladesh আছে, যা fee আর DSU scholarship-এ গুরুত্বপূর্ণ।'),
    ], [IT_EMB_NOTICE, IT_EMB_CHECKLIST, IT_MUR_POOR_COUNTRIES]),
  ],
  life: [
    qa('housing', b('Where will you live?', 'কোথায় থাকবেন?'), [b('For the visa you show at least 30 days of booked accommodation, a rental contract or a hospitality declaration. Regional DSU agencies also offer places in university residences through their calls. Rents are not verified here.', 'Visa-র জন্য কমপক্ষে ৩০ দিনের থাকার booking, ভাড়ার চুক্তি বা hospitality declaration দেখাতে হয়। আঞ্চলিক DSU সংস্থা তাদের call-এর মাধ্যমে university residence-এও জায়গা দেয়। বাসাভাড়া এখানে যাচাই হয়নি।')], [IT_EMB_CHECKLIST, IT_ERGO_GRANT], { status: 'partly-verified' }),
    qa('health', b('What about health insurance?', 'স্বাস্থ্যবীমা কেমন?'), [b('You need cover of at least EUR 30,000, shown when you apply for the residence permit.', 'কমপক্ষে EUR 30,000-এর cover লাগবে, residence permit-এর আবেদনের সময় দেখাতে হয়।')], [IT_CONSULATE_PROCEDURE]),
    qa('arrival', b('What do you do after arriving?', 'পৌঁছানোর পর কী করবেন?'), [b('Apply for the residence permit for study within 8 working days, finish enrolment at your university, and get an Italian tax code (codice fiscale) if you have not yet — you need it for DSU benefits.', '৮ কর্মদিবসের মধ্যে study residence permit-এর আবেদন করুন, university-তে ভর্তি সম্পন্ন করুন, আর Italy-র tax code (codice fiscale) না থাকলে নিয়ে নিন — DSU সুবিধার জন্য লাগে।')], [IT_CONSULATE_PROCEDURE, IT_ERGO_INTL, IT_UNIVERSITALY_STEPS], { kind: 'guidance' }),
  ],
  documents: IT_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'fact', status: 'partly-verified', value: { min: 157.04, unit: 'EUR/year', text: b('Depends on university, program and family income; University of Bologna example from EUR 157.04 a year.', 'University, program আর পরিবারের আয়ের উপর নির্ভর করে; University of Bologna-র উদাহরণে বছরে EUR 157.04 থেকে।') }, source: IT_UNIBO_FEES },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 10179.85, unit: 'EUR/year', text: b('At least EUR 10,179.85 per academic year, plus about EUR 500 for repatriation.', 'প্রতি শিক্ষাবর্ষে কমপক্ষে EUR 10,179.85, সঙ্গে দেশে ফেরার জন্য প্রায় EUR 500।') }, source: IT_CONSULATE_PROCEDURE },
    { id: 'living-cost', kind: 'estimate', status: 'not-verified' },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { max: 20, unit: 'hours/week', text: b('Up to 20 hours a week, no more than 1,040 hours a year.', 'সপ্তাহে সর্বোচ্চ ২০ ঘণ্টা, বছরে ১,০৪০ ঘণ্টার বেশি নয়।') }, source: IT_MIGRANTS_STUDY },
    { id: 'post-study-stay', kind: 'fact', status: 'partly-verified', value: { unit: 'permit', text: b('A job-seeking / business permit after an Italian degree exists; its length is not verified.', 'Italy-র degree-র পরে চাকরি খোঁজা / ব্যবসার permit আছে; মেয়াদ যাচাই হয়নি।') }, source: IT_MIGRANTS_STUDY },
    { id: 'english-programs', kind: 'fact', status: 'partly-verified', value: { unit: 'programs', text: b('Foreign-language (including English) programs exist; count not verified.', 'বিদেশি ভাষার (English-সহ) program আছে; সংখ্যা যাচাই হয়নি।') }, source: IT_CONSULATE_PROCEDURE },
    { id: 'visa-fee', kind: 'fact', status: 'not-verified' },
  ],
};

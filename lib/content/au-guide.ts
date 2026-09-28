import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  AU_485,
  AU_485_PHE,
  AU_ACCOM,
  AU_AWARDS_BD,
  AU_AWARDS_HANDBOOK,
  AU_AWARDS_SITE,
  AU_COSTS,
  AU_HC_DHAKA,
  AU_HEALTH,
  AU_LOCATIONS,
  AU_MELB_UG,
  AU_MONASH_MIN,
  AU_READ,
  AU_RTP,
  AU_RTP_FAQ,
  AU_UNSW_TABLE,
  AU_UQ_UG,
  AU_VFS_BD,
  AU_VISA,
} from './au-sources';

/**
 * Australia reading guide, researched on its own from Australian official
 * sources (Department of Home Affairs, Department of Education and Study
 * Australia, DFAT / Australia Awards, the Australian High Commission in Dhaka
 * and university pages). Nothing is taken from another country's guide.
 * Amounts stay in Australian dollars (AUD) and are never converted. Tuition is
 * set by each provider and course, so no single tuition figure is shown.
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
  'Requirements are not the same at every Australian university: each university and course sets its own. Always check the official course page of the university you apply to.',
  'Australia-র সব university-তে শর্ত এক নয়: প্রতিটি university আর course নিজের শর্ত ঠিক করে। যে university-তে আবেদন করবেন, তার official course page অবশ্যই দেখে নিন।',
);

// ------------------------------------------------------------------ shared answers

const visa = (id: string) =>
  qa(
    id,
    b('What do you need for the Student visa (subclass 500)?', 'Student Visa-এর জন্য কী কী লাগে?'),
    [
      b(
        'A Confirmation of Enrolment (CoE) for a full-time course registered on CRICOS — an application without a CoE is invalid. You must also be a genuine student (you answer the Genuine Student questions in English, up to 150 words each), meet the English and financial capacity requirements, hold Overseas Student Health Cover (OSHC) from an approved provider from the day you arrive, and meet the health and character requirements. Applicants aged 18 or over sign the Australian Values Statement.',
        'CRICOS-এ নিবন্ধিত একটি full-time course-এর Confirmation of Enrolment (CoE) — CoE ছাড়া আবেদন বৈধ হয় না। এছাড়া আপনাকে genuine student হতে হবে (Genuine Student প্রশ্নগুলোর উত্তর ইংরেজিতে, প্রতিটি সর্বোচ্চ ১৫০ শব্দে), ইংরেজি আর আর্থিক সামর্থ্যের শর্ত পূরণ করতে হবে, Australia-তে পৌঁছানোর দিন থেকে approved provider-এর Overseas Student Health Cover (OSHC) থাকতে হবে, আর স্বাস্থ্য ও চরিত্রের শর্ত পূরণ করতে হবে। ১৮ বা তার বেশি বয়স হলে Australian Values Statement-এ সই করতে হয়।',
      ),
      b(
        'The visa costs from AUD 2,500 (other costs such as health checks, police certificates and biometrics may apply). You may be asked to give biometrics — in Bangladesh this is at the Australian Visa Application Centre in Dhaka (VFS Global); you get 14 days to provide them. Health examinations are booked with the HAP ID from your ImmiAccount.',
        'Visa-র খরচ AUD 2,500 থেকে শুরু (health check, police certificate আর biometrics-এর মতো অন্য খরচও লাগতে পারে)। Biometrics দিতে বলা হতে পারে — Bangladesh-এ এটা ঢাকার Australian Visa Application Centre-এ (VFS Global); দেওয়ার জন্য ১৪ দিন সময় পাবেন। ImmiAccount-এর HAP ID দিয়ে health examination-এর appointment নিতে হয়।',
      ),
      b(
        'Applications lodged outside Australia on or after 14 November 2025 are processed under Ministerial Direction 115. The visa is linked to your passport digitally — there is no visa label. Its length follows your enrolment.',
        '১৪ November ২০২৫ বা তার পরে Australia-র বাইরে থেকে জমা দেওয়া আবেদন Ministerial Direction 115 অনুযায়ী process হয়। Visa digitally আপনার passport-এর সঙ্গে যুক্ত থাকে — কোনো visa label থাকে না। এর মেয়াদ আপনার enrolment অনুযায়ী।',
      ),
    ],
    [AU_VISA, AU_HEALTH, AU_HC_DHAKA, AU_VFS_BD],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show for the Student visa?', 'Student visa-র জন্য কত টাকা দেখাতে হয়?'),
    [
      b(
        'Living costs of AUD 29,710 for 12 months (AUD 10,394 for a partner and AUD 4,449 for each child; shorter courses are calculated pro rata), plus the first 12 months of course fees (less anything already paid), plus travel of AUD 2,000 when you apply from outside Australia (outside Africa).',
        '১২ মাসের থাকার খরচ AUD 29,710 (partner-এর জন্য AUD 10,394, প্রতিটি সন্তানের জন্য AUD 4,449; ছোট course-এ আনুপাতিক হিসাব), সঙ্গে প্রথম ১২ মাসের course fee (যা আগে দিয়েছেন তা বাদে), সঙ্গে Australia-র বাইরে (Africa ছাড়া) থেকে আবেদন করলে যাতায়াতের জন্য AUD 2,000।',
      ),
      b(
        "The evidence can be money deposits, loans or scholarships. Alternatively, your parents' or partner's income of at least AUD 87,856 in the 12 months before applying (AUD 102,500 if family members come with you), shown with government tax documents — bank statements are not accepted for this option.",
        'প্রমাণ হতে পারে জমা টাকা, loan বা scholarship। বিকল্প হিসেবে, আবেদনের আগের ১২ মাসে বাবা-মা বা partner-এর আয় অন্তত AUD 87,856 (পরিবার সঙ্গে গেলে AUD 102,500), সরকারি tax document দিয়ে দেখাতে হয় — এই বিকল্পে bank statement গ্রহণ করা হয় না।',
      ),
      b(
        'Home Affairs says this is a minimum: your real living costs may be much higher, and you should not rely on working in Australia to pay for them.',
        'Home Affairs বলে, এটা শুধু minimum: আসল থাকার খরচ অনেক বেশি হতে পারে, আর খরচ চালাতে Australia-তে কাজের উপর নির্ভর করা উচিত নয়।',
      ),
    ],
    [AU_VISA],
    { allDegrees: true },
  );

const english = (id: string) =>
  qa(
    id,
    b('How much IELTS do you need for Australia?', 'Australia-তে IELTS কত লাগে?'),
    [
      b(
        'The visa minimum listed by Home Affairs: IELTS 6.0, TOEFL iBT 64, Cambridge C1 Advanced 169, PTE Academic 50, or OET B in each component. Lower scores are accepted if you also take an English course (ELICOS) or a foundation/pathway programme first — for example IELTS 5.5 with at least 10 weeks, or 5.0 with at least 20 weeks, of ELICOS.',
        'Home Affairs-এর তালিকায় visa-র minimum: IELTS 6.0, TOEFL iBT 64, Cambridge C1 Advanced 169, PTE Academic 50, বা প্রতিটি অংশে OET B। আগে English course (ELICOS) বা foundation/pathway programme করলে কম score চলে — যেমন অন্তত ১০ সপ্তাহ ELICOS-সহ IELTS 5.5, বা অন্তত ২০ সপ্তাহ ELICOS-সহ 5.0।',
      ),
      b(
        'The test must be taken within 2 years before you apply. At-home tests (for example IELTS Online or TOEFL iBT Home Edition) are not accepted. From 21 January 2026, TOEFL test takers must select "Taking TOEFL for Australia".',
        'আবেদনের আগের ২ বছরের মধ্যে test দিতে হবে। বাসা থেকে দেওয়া test (যেমন IELTS Online বা TOEFL iBT Home Edition) গ্রহণ করা হয় না। ২১ January ২০২৬ থেকে TOEFL দিতে হলে "Taking TOEFL for Australia" বেছে নিতে হয়।',
      ),
      b(
        'Your university sets its own score for the course, which is often higher than the visa minimum. Australia Awards, for example, asks for IELTS Academic 6.5 with no band below 6.0.',
        'University course-এর জন্য নিজের score ঠিক করে, যা প্রায়ই visa-র minimum-এর চেয়ে বেশি। যেমন Australia Awards চায় IELTS Academic 6.5, কোনো band 6.0-এর নিচে নয়।',
      ),
      CHECK_UNI,
    ],
    [AU_VISA, AU_AWARDS_BD],
    {
      allDegrees: true,
      discrepancy: b(
        'Home Affairs shows separate score tables depending on the test date (before, or on or after, 7 August 2025). Check the table for the date of your test.',
        'Test-এর তারিখ অনুযায়ী (৭ August ২০২৫-এর আগে, নাকি সেদিন বা পরে) Home Affairs আলাদা score table দেখায়। আপনার test-এর তারিখের table দেখে নিন।',
      ),
    },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Australia?', 'Australia-তে পড়ার পাশাপাশি কাজ করা যায়?'),
    [
      b(
        "Yes. Student visa holders can work up to 48 hours a fortnight while their course is in session. Students doing a master's by research or a doctoral degree, and their families, have no work limit.",
        "হ্যাঁ। Student visa থাকলে course চলাকালীন প্রতি দুই সপ্তাহে (fortnight) ৪৮ ঘণ্টা পর্যন্ত কাজ করা যায়। Master's by research বা doctoral degree-র student আর তাদের পরিবারের কাজের কোনো সীমা নেই।",
      ),
      b(
        'Do not plan to pay your living costs from work: Home Affairs says you should not rely on it. An RTP scholarship holder may need the university’s approval before working outside the research degree.',
        'কাজ করে থাকার খরচ চালানোর পরিকল্পনা করবেন না: Home Affairs বলে এর উপর নির্ভর করা উচিত নয়। RTP scholarship থাকলে research degree-র বাইরে কাজের আগে university-র অনুমতি লাগতে পারে।',
      ),
    ],
    [AU_VISA, AU_RTP_FAQ],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('What are the options to stay or work in Australia after your studies?', 'পড়াশোনা শেষে Australia-তে থাকা বা কাজ করার সুযোগ কী?'),
    [
      b(
        'The Temporary Graduate visa (subclass 485), Post-Higher Education Work stream: usually 2 to 3 years depending on your qualification, with full work rights. It costs from AUD 5,750. You must be 35 or under and apply within 6 months of completing your Australian qualification.',
        'Temporary Graduate visa (subclass 485)-এর Post-Higher Education Work stream: qualification অনুযায়ী সাধারণত ২ থেকে ৩ বছর, পুরো কাজের অধিকারসহ। খরচ AUD 5,750 থেকে শুরু। বয়স ৩৫ বা তার কম হতে হবে, আর Australia-র qualification শেষ করার ৬ মাসের মধ্যে আবেদন করতে হবে।',
      ),
      b(
        'A second post-higher education stream (1 to 2 years, from AUD 2,265) is available for some graduates who studied and lived in regional areas. This visa is temporary: it does not promise permanent residence.',
        'Regional এলাকায় পড়াশোনা আর বসবাস করা কিছু graduate-এর জন্য দ্বিতীয় একটি post-higher education stream আছে (১ থেকে ২ বছর, AUD 2,265 থেকে)। এই visa অস্থায়ী: এটা স্থায়ী বসবাস (PR)-এর কোনো নিশ্চয়তা দেয় না।',
      ),
    ],
    [AU_485, AU_485_PHE],
    { allDegrees: true },
  );

const oshc = (id: string) =>
  qa(
    id,
    b('What is OSHC?', 'OSHC কী?'),
    [
      b(
        'Overseas Student Health Cover — health insurance you must buy from an approved Australian provider for the whole visa, starting from the day you arrive. Family members on your visa need it too. Many universities arrange it with your enrolment.',
        'Overseas Student Health Cover — স্বাস্থ্য বীমা, যা approved Australian provider থেকে পুরো visa-র মেয়াদের জন্য কিনতে হয়, Australia-তে পৌঁছানোর দিন থেকে। আপনার visa-য় থাকা পরিবারের সদস্যদেরও লাগে। অনেক university enrolment-এর সঙ্গে এর ব্যবস্থা করে।',
      ),
      b('The price depends on the provider and the length of cover and is not verified here.', 'দাম provider আর মেয়াদের উপর নির্ভর করে, এখানে যাচাই করা হয়নি।'),
    ],
    [AU_VISA],
    { status: 'partly-verified', allDegrees: true },
  );

const living = (id: string) =>
  qa(
    id,
    b('How much are living costs?', 'থাকা-খাওয়ার খরচ কত?'),
    [
      b(
        'The only official figure is the visa minimum of AUD 29,710 for 12 months. Study Australia says costs depend on the city and your lifestyle, and smaller cities can be cheaper. Rent, food and transport amounts are not verified here.',
        'একমাত্র official অঙ্ক হলো visa-র minimum: ১২ মাসে AUD 29,710। Study Australia বলে খরচ শহর আর আপনার জীবনযাপনের উপর নির্ভর করে, আর ছোট শহরে খরচ কম হতে পারে। বাসাভাড়া, খাবার আর যাতায়াতের অঙ্ক এখানে যাচাই হয়নি।',
      ),
    ],
    [AU_VISA, AU_COSTS],
    {
      kind: 'estimate',
      status: 'partly-verified',
      allDegrees: true,
      discrepancy: b(
        'The visa figure is a legal minimum, not a budget: Home Affairs itself says real costs may be much higher. Study Australia’s cost-of-living calculator was last updated in November 2023, so its numbers may be out of date.',
        'Visa-র অঙ্ক একটি আইনি minimum, বাজেট নয়: Home Affairs নিজেই বলে আসল খরচ অনেক বেশি হতে পারে। Study Australia-র cost-of-living calculator সর্বশেষ November ২০২৩-এ হালনাগাদ হয়েছে, তাই এর অঙ্ক পুরোনো হতে পারে।',
      ),
    },
  );

const tuition = (id: string) =>
  qa(
    id,
    b('How much is tuition in Australia?', 'Australia-তে tuition কত?'),
    [
      b(
        'Not verified yet as a single figure: Study Australia says tuition depends on the provider, the level of study and the location. Your first 12 months of fees must be shown for the visa. Check the international fee on the course page.',
        'এখনো একক অঙ্ক হিসেবে যাচাই হয়নি: Study Australia বলে tuition নির্ভর করে provider, পড়াশোনার level আর জায়গার উপর। Visa-র জন্য প্রথম ১২ মাসের fee দেখাতে হয়। Course page-এ international fee দেখে নিন।',
      ),
    ],
    [AU_COSTS, AU_VISA],
    { status: 'not-verified' },
  );

const accommodation = (id: string) =>
  qa(
    id,
    b('Where can you live?', 'কোথায় থাকবেন?'),
    [
      b(
        'Study Australia lists short-term options (hotels and hostels), renting a house or apartment alone or with housemates, managed student accommodation, university accommodation, residential colleges and homestays. As a tenant you have legal rights and responsibilities (rent, bond/deposit, maintenance). Students under 18 need approved accommodation and welfare arrangements.',
        'Study Australia-র তালিকায় আছে: অল্প সময়ের থাকার জায়গা (hotel আর hostel), একা বা housemate-দের সঙ্গে বাসা/apartment ভাড়া, managed student accommodation, university-র accommodation, residential college আর homestay। ভাড়াটিয়া হিসেবে আপনার আইনি অধিকার আর দায়িত্ব আছে (ভাড়া, bond/জামানত, রক্ষণাবেক্ষণ)। ১৮ বছরের কম বয়সী student-দের অনুমোদিত থাকা আর দেখাশোনার (welfare) ব্যবস্থা লাগে।',
      ),
      b('Rent amounts are not verified here: they vary by city and type.', 'ভাড়ার অঙ্ক এখানে যাচাই হয়নি: শহর আর ধরন অনুযায়ী আলাদা।'),
    ],
    [AU_ACCOM],
    { status: 'partly-verified', allDegrees: true },
  );

const cities = (id: string) =>
  qa(
    id,
    b('Which cities do students choose?', 'Student-রা কোন শহরগুলো বেছে নেন?'),
    [
      b(
        'Study Australia introduces study locations in every state and territory, including Sydney (New South Wales), Melbourne (Victoria), Brisbane (Queensland), Perth (Western Australia), Adelaide (South Australia), Canberra (Australian Capital Territory), Hobart and Darwin. Costs differ by city; smaller cities can be cheaper. Precise city costs are not verified here.',
        'Study Australia প্রতিটি state আর territory-র পড়ার জায়গা পরিচয় করিয়ে দেয়, যেমন Sydney (New South Wales), Melbourne (Victoria), Brisbane (Queensland), Perth (Western Australia), Adelaide (South Australia), Canberra (Australian Capital Territory), Hobart আর Darwin। খরচ শহর অনুযায়ী আলাদা; ছোট শহরে কম হতে পারে। শহরভিত্তিক সঠিক খরচ এখানে যাচাই হয়নি।',
      ),
    ],
    [AU_LOCATIONS, AU_COSTS],
    { status: 'partly-verified', allDegrees: true },
  );

const family = (id: string) =>
  qa(
    id,
    b('Can you bring your spouse or children?', 'স্বামী/স্ত্রী বা সন্তান সঙ্গে নেওয়া যায় কি?'),
    [
      b(
        'Family members can be included, but you must show extra living costs for them (AUD 10,394 a year for a partner and AUD 4,449 for each child), or the higher parental/partner income of AUD 102,500. They also need OSHC and must meet the health and character requirements. Family members of research master’s and doctoral students have no work limit.',
        'পরিবারের সদস্যদের অন্তর্ভুক্ত করা যায়, তবে তাদের জন্য বাড়তি থাকার খরচ দেখাতে হয় (partner-এর জন্য বছরে AUD 10,394, প্রতিটি সন্তানের জন্য AUD 4,449), বা আয়ের বিকল্পে AUD 102,500। তাদেরও OSHC লাগে, আর স্বাস্থ্য ও চরিত্রের শর্ত পূরণ করতে হয়। Research master’s আর doctoral student-দের পরিবারের কাজের সীমা নেই।',
      ),
    ],
    [AU_VISA],
    { status: 'partly-verified', allDegrees: true },
  );

// ------------------------------------------------------------------ documents

const HA = b('Department of Home Affairs.', 'Australia-র Department of Home Affairs (অভিবাসন দপ্তর)।');

export const AU_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Required for the university application and the visa; the visa is linked to it digitally.', 'University-র আবেদন আর visa — দুটোতেই লাগে; visa digitally এর সঙ্গে যুক্ত হয়।'),
    who: HA,
    when: b('From the university application to arrival.', 'University-র আবেদন থেকে পৌঁছানো পর্যন্ত।'),
    where: b('University application and ImmiAccount (online visa application).', 'University-র আবেদন আর ImmiAccount (online visa আবেদন)।'),
    prepare: b('A valid passport — the one you will travel with.', 'বৈধ passport — যেটা নিয়ে ভ্রমণ করবেন।'),
    groups: ['general', 'visa'],
    sources: [AU_VISA],
  },
  {
    id: 'academic',
    name: b('Certificates and transcripts', 'সনদ আর transcript'),
    why: b("University documents: show you meet the course's academic entry requirements.", 'University-র document: দেখায় যে course-এর academic শর্ত পূরণ করছেন।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('With the application (before admission).', 'আবেদনের সময় (ভর্তির আগে)।'),
    where: b('The university’s international application.', 'University-র international আবেদন।'),
    prepare: b("SSC/HSC or degree certificates and full transcripts; for a bachelor's, UNSW for example needs university study or a foundation year for Bangladesh.", "SSC/HSC বা degree-র সনদ আর পূর্ণ transcript; bachelor's-এর জন্য যেমন UNSW Bangladesh-এর ক্ষেত্রে university-র পড়াশোনা বা foundation year চায়।"),
    groups: ['general', 'program'],
    sources: [AU_UNSW_TABLE],
  },
  {
    id: 'english',
    name: b('English language test result', 'ইংরেজি test-এর ফল'),
    why: b('Needed by the university (its own score) and by the visa (the Home Affairs minimum).', 'University (নিজের score) আর visa (Home Affairs-এর minimum) — দুটোর জন্যই লাগে।'),
    who: b('The university and the Department of Home Affairs.', 'University আর Department of Home Affairs।'),
    when: b('Before or with the application; taken within 2 years before the visa application.', 'আবেদনের আগে বা সঙ্গে; visa আবেদনের আগের ২ বছরের মধ্যে দেওয়া।'),
    where: b('An accepted test centre (not an at-home test).', 'গ্রহণযোগ্য test centre (বাসা থেকে দেওয়া test নয়)।'),
    prepare: b('Check the course page for the exact score.', 'ঠিক কত score, তা course page-এ দেখুন।'),
    groups: ['program', 'visa'],
    sources: [AU_VISA],
  },
  {
    id: 'cv-sop',
    name: b('CV, statement of purpose and references (if the course asks)', 'CV, statement of purpose আর reference (course চাইলে)'),
    why: b('University documents for many postgraduate courses and research degrees.', 'অনেক postgraduate course আর research degree-র university document।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('With the application.', 'আবেদনের সময়।'),
    where: b('The university’s application portal.', 'University-র application portal।'),
    prepare: b('Not verified as a general list: each course states what it needs. Universities selecting RTP scholars may consider work experience, publications and referee reports.', 'সাধারণ তালিকা হিসেবে যাচাই হয়নি: প্রতিটি course জানায় কী লাগবে। RTP scholar বাছাইয়ে university কাজের অভিজ্ঞতা, publication আর referee report বিবেচনা করতে পারে।'),
    groups: ['program'],
    degrees: ['masters', 'phd'],
    status: 'partly-verified',
    sources: [AU_RTP_FAQ],
  },
  {
    id: 'research-proposal',
    name: b('Research proposal and supervisor contact', 'Research proposal (গবেষণা প্রস্তাব) আর supervisor-এর সঙ্গে যোগাযোগ'),
    why: b('University document for research degrees.', 'Research degree-র university document।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('Before or with the application.', 'আবেদনের আগে বা সঙ্গে।'),
    where: b('The university’s research degree application.', 'University-র research degree আবেদন।'),
    prepare: b('Not verified as a general rule here: check the research degree page of the university.', 'এখানে সাধারণ নিয়ম হিসেবে যাচাই হয়নি: university-র research degree page দেখুন।'),
    groups: ['program'],
    degrees: ['phd'],
    status: 'not-verified',
    sources: [AU_RTP_FAQ],
  },
  {
    id: 'scholarship-docs',
    name: b('Scholarship documents (for example Australia Awards)', 'Scholarship-এর document (যেমন Australia Awards)'),
    why: b('Scholarship documents — separate from the university and visa documents.', 'Scholarship-এর document — university আর visa-র document থেকে আলাদা।'),
    who: b('The scholarship body (Australia Awards: DFAT).', 'Scholarship প্রতিষ্ঠান (Australia Awards: DFAT)।'),
    when: b('By the scholarship deadline (the 2027-intake round closed on 30 April 2026).', 'Scholarship-এর শেষ তারিখের মধ্যে (২০২৭ intake-এর round ৩০ April ২০২৬-এ বন্ধ হয়েছে)।'),
    where: b('OASIS (Australia Awards online system).', 'OASIS (Australia Awards-এর online system)।'),
    prepare: b('Australia Awards Bangladesh lists, among others, a notary-attested passport, degree certificates and an English test result.', 'Australia Awards Bangladesh-এর তালিকায় আছে, অন্যান্যের মধ্যে: notary-সত্যায়িত passport, degree-র সনদ আর English test-এর ফল।'),
    groups: ['program', 'bangladesh'],
    degrees: ['masters'],
    sources: [AU_AWARDS_BD],
  },
  {
    id: 'coe',
    name: b('Confirmation of Enrolment (CoE)', 'Confirmation of Enrolment (CoE, ভর্তির নিশ্চয়তা)'),
    why: b('Visa document: proof of enrolment in a full-time CRICOS-registered course; without it the visa application is invalid.', 'Visa-র document: CRICOS-নিবন্ধিত full-time course-এ ভর্তির প্রমাণ; এটা ছাড়া visa আবেদন বৈধ নয়।'),
    who: b('Issued by your education provider after you accept the offer (after admission).', 'Offer গ্রহণের পরে (ভর্তির পরে) আপনার education provider দেয়।'),
    when: b('Before you lodge the visa application.', 'Visa আবেদন জমার আগে।'),
    where: b('Entered in your online visa application.', 'Online visa আবেদনে দিতে হয়।'),
    prepare: b('Accept the offer and pay what the offer asks to receive it.', 'Offer গ্রহণ করে offer-এ যা দিতে বলা হয় তা দিলে পাবেন।'),
    groups: ['visa'],
    sources: [AU_VISA],
  },
  {
    id: 'finance',
    name: b('Financial capacity evidence', 'আর্থিক সামর্থ্যের প্রমাণ'),
    why: b('Visa document: living costs (AUD 29,710 for 12 months), the first 12 months of fees and travel (AUD 2,000).', 'Visa-র document: থাকার খরচ (১২ মাসে AUD 29,710), প্রথম ১২ মাসের fee আর যাতায়াত (AUD 2,000)।'),
    who: HA,
    when: b('With the visa application (after admission).', 'Visa আবেদনের সঙ্গে (ভর্তির পরে)।'),
    where: b('Uploaded in ImmiAccount.', 'ImmiAccount-এ upload।'),
    prepare: b("Deposits, loans or scholarships — or parents'/partner's income of at least AUD 87,856 shown with government tax documents (not bank statements).", 'জমা টাকা, loan বা scholarship — অথবা বাবা-মা/partner-এর অন্তত AUD 87,856 আয়, সরকারি tax document দিয়ে দেখানো (bank statement নয়)।'),
    groups: ['visa'],
    sources: [AU_VISA],
  },
  {
    id: 'genuine-student',
    name: b('Genuine Student answers', 'Genuine Student প্রশ্নের উত্তর'),
    why: b('Visa requirement: you explain your study plans and circumstances.', 'Visa-র শর্ত: আপনার পড়াশোনার পরিকল্পনা আর অবস্থা ব্যাখ্যা করেন।'),
    who: HA,
    when: b('In the visa application.', 'Visa আবেদনের মধ্যে।'),
    where: b('The online visa form, with supporting evidence.', 'Online visa form-এ, প্রমাণসহ।'),
    prepare: b('Answer in English, up to 150 words per question, in your own words.', 'ইংরেজিতে, প্রতিটি প্রশ্নে সর্বোচ্চ ১৫০ শব্দে, নিজের ভাষায় উত্তর দিন।'),
    groups: ['visa'],
    sources: [AU_VISA],
  },
  {
    id: 'oshc',
    name: b('Overseas Student Health Cover (OSHC)', 'Overseas Student Health Cover (OSHC, স্বাস্থ্য বীমা)'),
    why: b('Visa requirement: health insurance from an approved provider from the day you arrive.', 'Visa-র শর্ত: পৌঁছানোর দিন থেকে approved provider-এর স্বাস্থ্য বীমা।'),
    who: HA,
    when: b('Before the visa application.', 'Visa আবেদনের আগে।'),
    where: b('An approved OSHC provider (often arranged through the university).', 'Approved OSHC provider (প্রায়ই university-র মাধ্যমে)।'),
    prepare: b('Cover the whole visa period, including family members on the visa.', 'পুরো visa-র মেয়াদ কভার করুন, visa-য় থাকা পরিবারের সদস্যসহ।'),
    groups: ['visa'],
    sources: [AU_VISA],
  },
  {
    id: 'health-check',
    name: b('Health examinations', 'স্বাস্থ্য পরীক্ষা (health examination)'),
    why: b('Visa requirement: you must meet the health requirement.', 'Visa-র শর্ত: স্বাস্থ্যের শর্ত পূরণ করতে হবে।'),
    who: HA,
    when: b('When asked — you book with the HAP ID from your ImmiAccount.', 'বলা হলে — ImmiAccount-এর HAP ID দিয়ে appointment নিতে হয়।'),
    where: b('A clinic approved by Home Affairs (clinic list: not verified here).', 'Home Affairs-অনুমোদিত clinic (clinic-এর তালিকা এখানে যাচাই হয়নি)।'),
    prepare: b('Use the HAP ID given for your application.', 'আপনার আবেদনের HAP ID ব্যবহার করুন।'),
    groups: ['visa', 'bangladesh'],
    status: 'partly-verified',
    sources: [AU_HEALTH, AU_VISA],
  },
  {
    id: 'police',
    name: b('Police certificates (character)', 'Police certificate (চরিত্রের শর্ত)'),
    why: b('Visa requirement: applicants aged 16 or over must meet the character requirement.', 'Visa-র শর্ত: ১৬ বা তার বেশি বয়সী আবেদনকারীদের চরিত্রের শর্ত পূরণ করতে হয়।'),
    who: HA,
    when: b('When asked in the visa process.', 'Visa প্রক্রিয়ায় বলা হলে।'),
    where: b('The police authority of each country you lived in (Bangladesh process: not verified here).', 'যে দেশে থেকেছেন, সেই দেশের পুলিশ কর্তৃপক্ষ (Bangladesh-এর প্রক্রিয়া এখানে যাচাই হয়নি)।'),
    prepare: b('Apply early — it can take time.', 'আগেভাগে আবেদন করুন — সময় লাগতে পারে।'),
    groups: ['visa'],
    status: 'partly-verified',
    sources: [AU_VISA],
  },
  {
    id: 'biometrics',
    name: b('Biometrics at the Australian Visa Application Centre, Dhaka', 'ঢাকার Australian Visa Application Centre-এ biometrics'),
    why: b('Visa step: the Australian High Commission says all visa applicants in Bangladesh must give biometrics.', 'Visa-র ধাপ: Australian High Commission বলে Bangladesh-এর সব visa আবেদনকারীকে biometrics দিতে হবে।'),
    who: b('Department of Home Affairs, through VFS Global.', 'Department of Home Affairs, VFS Global-এর মাধ্যমে।'),
    when: b('After you are asked — within 14 days.', 'বলার পরে — ১৪ দিনের মধ্যে।'),
    where: b('Australian Visa Application Centre (AVAC), Delta Life Tower, Dhaka.', 'Australian Visa Application Centre (AVAC), Delta Life Tower, ঢাকা।'),
    prepare: b('Book the appointment through VFS Global.', 'VFS Global-এর মাধ্যমে appointment নিন।'),
    groups: ['visa', 'bangladesh'],
    sources: [AU_HC_DHAKA, AU_VFS_BD, AU_VISA],
  },
  {
    id: 'welfare',
    name: b('Accommodation and welfare arrangements (if you are under 18)', 'থাকা আর দেখাশোনার ব্যবস্থা (১৮ বছরের কম হলে)'),
    why: b('Students under 18 need approved accommodation and welfare arrangements.', '১৮ বছরের কম বয়সী student-দের অনুমোদিত থাকা আর দেখাশোনার ব্যবস্থা লাগে।'),
    who: b('Your education provider and Home Affairs.', 'আপনার education provider আর Home Affairs।'),
    when: b('Before the visa application.', 'Visa আবেদনের আগে।'),
    where: b('Arranged with your provider or a parent/relative (details not verified here).', 'Provider বা বাবা-মা/আত্মীয়ের মাধ্যমে ব্যবস্থা (বিস্তারিত এখানে যাচাই হয়নি)।'),
    prepare: b('Ask your university which arrangement it accepts.', 'University কোন ব্যবস্থা মানে, জিজ্ঞেস করুন।'),
    groups: ['visa'],
    degrees: ['bachelors'],
    status: 'partly-verified',
    sources: [AU_ACCOM],
  },
  {
    id: 'visa-grant',
    name: b('Visa grant notice (no visa label)', 'Visa grant notice (কোনো visa label নেই)'),
    why: b('Your visa is linked to your passport digitally.', 'আপনার visa digitally passport-এর সঙ্গে যুক্ত।'),
    who: HA,
    when: b('After approval, before travel.', 'অনুমোদনের পরে, ভ্রমণের আগে।'),
    where: b('ImmiAccount.', 'ImmiAccount-এ।'),
    prepare: b('Keep a copy and check your visa conditions.', 'একটি কপি রাখুন আর visa-র শর্ত দেখে নিন।'),
    groups: ['arrival'],
    sources: [AU_VISA],
  },
];

// ------------------------------------------------------------------ costs (AUD, never converted)

const VISA_FEE: GuideCost = { id: 'visa-fee', label: b('Student visa fee (subclass 500)', 'Student visa fee (subclass 500)'), value: b('From AUD 2,500', 'AUD 2,500 থেকে'), amount: { value: 2500, currency: 'AUD', period: 'one-time' }, note: b('Health checks, police certificates and biometrics may cost extra.', 'Health check, police certificate আর biometrics-এ বাড়তি খরচ লাগতে পারে।'), source: AU_VISA };
const LIVING: GuideCost = { id: 'funds-living', label: b('Living costs to show (visa minimum)', 'দেখাতে হবে থাকার খরচ (visa-র minimum)'), value: b('AUD 29,710 for 12 months', '১২ মাসে AUD 29,710'), amount: { value: 29710, currency: 'AUD', period: 'year' }, note: b('A minimum, not a budget: real costs may be much higher.', 'Minimum, বাজেট নয়: আসল খরচ অনেক বেশি হতে পারে।'), source: AU_VISA };
const TRAVEL: GuideCost = { id: 'funds-travel', label: b('Travel money to show (applying from outside Australia)', 'দেখাতে হবে যাতায়াতের টাকা (Australia-র বাইরে থেকে আবেদন)'), value: b('AUD 2,000', 'AUD 2,000'), amount: { value: 2000, currency: 'AUD', period: 'one-time' }, source: AU_VISA };
const UNVERIFIED: GuideCost[] = [
  { id: 'tuition', label: b('Tuition', 'Tuition'), value: b('Not verified — depends on the provider, level and location; the first 12 months must be shown for the visa', 'যাচাই হয়নি — provider, level আর জায়গার উপর নির্ভর করে; visa-র জন্য প্রথম ১২ মাসের fee দেখাতে হয়'), status: 'not-verified', source: AU_COSTS },
  { id: 'application-fee', label: b('University application fee', 'University-র আবেদন fee'), value: b('Not verified — set by each university', 'যাচাই হয়নি — প্রতিটি university ঠিক করে'), status: 'not-verified', source: AU_COSTS },
  { id: 'oshc', label: b('OSHC (health cover)', 'OSHC (স্বাস্থ্য বীমা)'), value: b('Not verified — depends on the provider and length of cover', 'যাচাই হয়নি — provider আর মেয়াদের উপর নির্ভর করে'), status: 'not-verified', source: AU_VISA },
  { id: 'rent', label: b('Accommodation', 'বাসাভাড়া'), value: b('Not verified — varies by city and type of housing', 'যাচাই হয়নি — শহর আর বাসার ধরন অনুযায়ী আলাদা'), status: 'not-verified', source: AU_ACCOM },
  { id: 'food-transport', label: b('Food and transport', 'খাবার আর যাতায়াত'), value: b('Not verified — depends on the city and lifestyle', 'যাচাই হয়নি — শহর আর জীবনযাপনের উপর নির্ভর করে'), status: 'not-verified', source: AU_COSTS },
  { id: 'setup', label: b('Set-up and other costs (health checks, police certificates, biometrics)', 'শুরুর আর অন্যান্য খরচ (health check, police certificate, biometrics)'), value: b('Not verified', 'যাচাই হয়নি'), status: 'not-verified', source: AU_VISA },
];

// ------------------------------------------------------------------ common sections

const commonTail = (level: 'bachelors' | 'masters' | 'phd') => [
  {
    id: 'costs',
    title: b('Costs', 'খরচ'),
    items: [...(level === 'phd' ? [] : [tuition('tuition')]), living('living'), oshc('oshc'), { embed: 'costs' as const }, funds('funds'), accommodation('accommodation')],
  },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities and cities', 'University আর শহর'),
    items: [
      qa('types', b('Which universities are there?', 'কোন কোন university আছে?'), [b('The examples below are Australian universities listed alphabetically, not ordered by quality. Entry rules, fees and scholarships differ at each, so check the official page.', 'নিচের উদাহরণগুলো Australia-র university, বর্ণানুক্রমে সাজানো, মান অনুযায়ী নয়। ভর্তির নিয়ম, fee আর scholarship প্রতিটিতে আলাদা, তাই official page দেখুন।')], [AU_LOCATIONS]),
      { embed: 'universities' as const },
      cities('cities'),
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work')] },
  { id: 'visa', title: b('Student visa', 'Student visa'), items: [visa('visa'), family('family')] },
  { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('After Year 12 or equivalent · often via a foundation program', 'Year 12 বা সমমানের পরে · প্রায়ই foundation program হয়ে'),
  intro: b(
    "You apply directly to each Australian university (there is no single national application system like UCAS). With the Bangladesh HSC, some universities ask for a foundation program or some university study first — UNSW says so in its 2027 entry table. After accepting an offer you get a CoE and apply for the Student visa (subclass 500).",
    "Australia-র প্রতিটি university-তে সরাসরি আবেদন করতে হয় (UCAS-এর মতো একক জাতীয় আবেদন system নেই)। Bangladesh-এর HSC দিয়ে কিছু university আগে foundation program বা কিছু university-পড়াশোনা চায় — UNSW তার ২০২৭ entry table-এ তাই বলে। Offer গ্রহণের পরে CoE নিয়ে Student visa (subclass 500)-এর আবেদন।",
  ),
  costs: { official: [VISA_FEE, LIVING, TRAVEL], estimates: UNVERIFIED },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in Australia from Bangladesh?", "Bangladesh থেকে Australia-তে Bachelor's পড়তে কী কী লাগে?"),
          [
            b(
              "Qualifications the university accepts (with HSC often a foundation program or some university study), the subjects and prerequisites the course lists, English at the course's level (and at least the visa minimum), then an offer, a CoE, OSHC, financial evidence and a Student visa.",
              "University যে qualification মানে (HSC থাকলে প্রায়ই foundation program বা কিছু university-পড়াশোনা), course-এর তালিকার বিষয় আর prerequisite, course-এর level-এর ইংরেজি (আর অন্তত visa-র minimum), তারপর offer, CoE, OSHC, আর্থিক প্রমাণ আর Student visa।",
            ),
            CHECK_UNI,
          ],
          [AU_UNSW_TABLE, AU_VISA],
        ),
        qa(
          'hsc',
          b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"),
          [
            b(
              "It depends on the university. UNSW's 2027 international entry table does not list the Bangladesh HSC alone for direct entry: it asks for completion of the first year of a four-year bachelor's at a recognised university, or a completed two- or three-year bachelor's. UNSW also accepts a foundation year from any Group of Eight university or NCUK.",
              "University-র উপর নির্ভর করে। UNSW-এর ২০২৭ international entry table-এ সরাসরি ভর্তির জন্য শুধু Bangladesh-এর HSC তালিকায় নেই: এটা চায় স্বীকৃত university-তে চার বছরের bachelor's-এর প্রথম বর্ষ শেষ করা, অথবা শেষ করা দুই বা তিন বছরের bachelor's। UNSW যেকোনো Group of Eight university বা NCUK-এর foundation year-ও নেয়।",
            ),
            b(
              'Other universities publish foundation pathways: Monash University Foundation Year, and Trinity College Foundation Studies for the University of Melbourne. The University of Queensland asks for Queensland Year 12 or an equivalent — whether it treats the HSC as equivalent is not verified here.',
              'অন্য university-ও foundation pathway দেয়: Monash University Foundation Year, আর University of Melbourne-এর জন্য Trinity College Foundation Studies। The University of Queensland চায় Queensland Year 12 বা সমমান — HSC-কে সমমান ধরে কিনা, এখানে যাচাই হয়নি।',
            ),
            CHECK_UNI,
          ],
          [AU_UNSW_TABLE, AU_MONASH_MIN, AU_MELB_UG, AU_UQ_UG],
          {
            status: 'partly-verified',
            discrepancy: b(
              'Universities differ: UNSW lists university study or a foundation year for Bangladesh, while others describe foundation pathways or "equivalent" qualifications without a Bangladesh-specific rule on the pages read.',
              'University-গুলোর মধ্যে পার্থক্য আছে: UNSW Bangladesh-এর জন্য university-পড়াশোনা বা foundation year চায়, আর অন্যরা পড়া page-এ Bangladesh-নির্দিষ্ট নিয়ম ছাড়া foundation pathway বা "সমমান" qualification-এর কথা বলে।',
            ),
          },
        ),
      ],
    },
    {
      id: 'apply',
      title: b('Applying and intakes', 'আবেদন আর intake'),
      items: [
        qa(
          'intakes',
          b('When do courses start?', 'Course কখন শুরু হয়?'),
          [b('Each university sets its own intakes and deadlines. Example: UNSW makes offers for Term 1, 2 and 3 (February, June and September intakes). A national intake calendar is not verified here.', 'প্রতিটি university নিজের intake আর শেষ তারিখ ঠিক করে। উদাহরণ: UNSW Term 1, 2 আর 3-এর (February, June আর September intake) জন্য offer দেয়। জাতীয় intake calendar এখানে যাচাই হয়নি।')],
          [AU_UNSW_TABLE],
          { status: 'partly-verified' },
        ),
        qa(
          'process',
          b('What is the full process, step by step?', 'পুরো প্রক্রিয়া ধাপে ধাপে কেমন?'),
          [b("1) Check each university's international entry page for Bangladesh and plan a foundation route if needed. 2) Take an English test the course accepts (not an at-home test). 3) Apply to the university. 4) Accept the offer and get your CoE. 5) Arrange OSHC and your financial evidence. 6) Apply for the Student visa in ImmiAccount and answer the Genuine Student questions. 7) Give biometrics at the AVAC in Dhaka and do health checks when asked.", '১) প্রতিটি university-র international entry page-এ Bangladesh-এর নিয়ম দেখে দরকার হলে foundation route ঠিক করুন। ২) Course যে English test নেয়, তা দিন (বাসা থেকে দেওয়া test নয়)। ৩) University-তে আবেদন। ৪) Offer গ্রহণ করে CoE নিন। ৫) OSHC আর আর্থিক প্রমাণ ঠিক করুন। ৬) ImmiAccount-এ Student visa-র আবেদন করে Genuine Student প্রশ্নের উত্তর দিন। ৭) ঢাকার AVAC-এ biometrics দিন আর বলা হলে health check করান।')],
          [AU_UNSW_TABLE, AU_VISA, AU_HC_DHAKA],
          { kind: 'guidance' },
        ),
      ],
    },
    { id: 'language', title: b('English and IELTS', 'ইংরেজি আর IELTS'), items: [english('english')] },
    {
      id: 'scholarships',
      title: b('Scholarships', 'Scholarship'),
      items: [
        qa(
          'scholarships',
          b("Are there scholarships for a Bachelor's?", "Bachelor's-এর জন্য scholarship আছে কি?"),
          [b("The Australian Government scholarships covered here are for postgraduate study (Australia Awards for master's; RTP for research degrees). Undergraduate scholarships are university-specific and are not verified here — check each university's scholarship page.", "এখানে যে Australian সরকারি scholarship-গুলো আছে, সেগুলো postgraduate-এর জন্য (master's-এর জন্য Australia Awards; research degree-র জন্য RTP)। Undergraduate scholarship প্রতিটি university-র নিজস্ব, এখানে যাচাই হয়নি — প্রতিটি university-র scholarship page দেখুন।")],
          [AU_AWARDS_BD, AU_RTP_FAQ],
          { status: 'partly-verified' },
        ),
        { embed: 'scholarships' },
      ],
    },
    ...commonTail('bachelors'),
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b("Coursework or research · after a bachelor's", "Coursework বা research · bachelor's-এর পরে"),
  intro: b(
    "Australian master's degrees are by coursework or by research, and you apply directly to each university. Australia Awards funds master's study for Bangladeshi applicants; research master's students can be considered for RTP scholarships. After the course the Temporary Graduate visa (subclass 485) may let you stay and work.",
    "Australia-র master's হয় coursework বা research-ভিত্তিক, আর প্রতিটি university-তে সরাসরি আবেদন করতে হয়। Australia Awards Bangladesh-এর আবেদনকারীদের master's-এর খরচ দেয়; research master's student-রা RTP scholarship-এর জন্য বিবেচিত হতে পারেন। Course শেষে Temporary Graduate visa (subclass 485) দিয়ে থেকে কাজ করার সুযোগ থাকতে পারে।",
  ),
  costs: { official: [VISA_FEE, LIVING, TRAVEL], estimates: UNVERIFIED },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in Australia?", "Australia-তে Master's-এ কী লাগে?"),
          [
            b(
              "A bachelor's degree the university accepts, usually in a related subject; English at the course's level; and the documents the course asks for (transcripts, and for some courses a CV, statement of purpose, references, work experience or a portfolio).",
              "University যে bachelor's degree মানে, সাধারণত সম্পর্কিত বিষয়ে; course-এর level-এর ইংরেজি; আর course যে document চায় (transcript, আর কিছু course-এ CV, statement of purpose, reference, কাজের অভিজ্ঞতা বা portfolio)।",
            ),
            CHECK_UNI,
          ],
          [AU_VISA],
          { status: 'partly-verified' },
        ),
        qa(
          'cgpa',
          b('What CGPA is needed?', 'কত CGPA লাগে?'),
          [b('Not verified yet: no official Australia-wide CGPA rule was found. Each university states its minimum for Bangladeshi degrees on its course or country page.', 'এখনো যাচাই হয়নি: Australia-জুড়ে একটি official CGPA নিয়ম পাওয়া যায়নি। প্রতিটি university তার course বা country page-এ Bangladesh-এর degree-র জন্য minimum জানায়।')],
          [AU_UNSW_TABLE],
          { status: 'not-verified' },
        ),
      ],
    },
    { id: 'language', title: b('English and IELTS', 'ইংরেজি আর IELTS'), items: [english('english')] },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b("How do you apply for a Master's?", "Master's-এ কীভাবে আবেদন করবেন?"),
          [b("Apply directly to each university by its deadline. If you apply for Australia Awards, follow its own round (the 2027-intake round ran from 1 February to 30 April 2026) — it closes long before course start dates. After an offer: CoE, OSHC, financial evidence and the Student visa.", "প্রতিটি university-তে তার শেষ তারিখের মধ্যে সরাসরি আবেদন করুন। Australia Awards-এর জন্য আবেদন করলে তার নিজের round মেনে চলুন (২০২৭ intake-এর round ছিল ১ February থেকে ৩০ April ২০২৬) — এটা course শুরুর অনেক আগে বন্ধ হয়। Offer-এর পরে: CoE, OSHC, আর্থিক প্রমাণ আর Student visa।")],
          [AU_AWARDS_BD, AU_VISA],
          { kind: 'guidance' },
        ),
      ],
    },
    {
      id: 'scholarships',
      title: b('Scholarships', 'Scholarship'),
      items: [
        qa(
          'australia-awards',
          b('What is Australia Awards?', 'Australia Awards কী?'),
          [
            b(
              "The Australian Government's scholarship (managed by DFAT) for a Master's by Coursework or by Research. For Bangladesh the listed benefits include full tuition fees, a return air ticket, an establishment allowance, a contribution to living expenses and OSHC. From 1 January 2026 the contribution to living expenses is A$99.26 a day.",
              "Coursework বা Research-ভিত্তিক Master's-এর জন্য Australian সরকারের scholarship (DFAT পরিচালিত)। Bangladesh-এর জন্য তালিকাভুক্ত সুবিধার মধ্যে আছে পূর্ণ tuition fee, আসা-যাওয়ার বিমানভাড়া, establishment allowance, থাকার খরচে অংশ আর OSHC। ১ January ২০২৬ থেকে থাকার খরচে অংশ দিনে A$99.26।",
            ),
            b(
              'You need IELTS Academic 6.5 with no band below 6.0 (or equivalent). Applications are made in OASIS; after shortlisting there is an interview. The 2027-intake round closed on 30 April 2026; the Australia Awards Bangladesh website says the next round reopens in early 2027.',
              'IELTS Academic 6.5 লাগে, কোনো band 6.0-এর নিচে নয় (বা সমমান)। আবেদন OASIS-এ; shortlist-এর পরে interview হয়। ২০২৭ intake-এর round ৩০ April ২০২৬-এ বন্ধ হয়েছে; Australia Awards Bangladesh-এর website বলে পরের round ২০২৭-এর শুরুতে খুলবে।',
            ),
          ],
          [AU_AWARDS_BD, AU_AWARDS_HANDBOOK, AU_AWARDS_SITE],
        ),
        { embed: 'scholarships' },
      ],
    },
    ...commonTail('masters'),
  ],
};

// ------------------------------------------------------------------ PhD

const PHD: DegreeGuide = {
  level: 'phd',
  card: b("Research degree · after a master's or strong bachelor's", "গবেষণা degree · master's বা ভালো bachelor's-এর পরে"),
  intro: b(
    'An Australian PhD (research doctorate) is a higher degree by research. Funding can come from a Research Training Program (RTP) scholarship awarded by the university, or you fund yourself. Doctoral students have no work-hour limit on the Student visa.',
    'Australia-র PhD (research doctorate) একটি higher degree by research। খরচ চলতে পারে university-র দেওয়া Research Training Program (RTP) scholarship দিয়ে, নয়তো নিজের টাকায়। Student visa-তে doctoral student-দের কাজের ঘণ্টার সীমা নেই।',
  ),
  costs: { official: [VISA_FEE, LIVING, TRAVEL], estimates: UNVERIFIED },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'master',
          b('What do you need for a PhD in Australia?', 'Australia-তে PhD-তে কী লাগে?'),
          [
            b(
              'Each university sets its own admission rules. When selecting RTP scholars, universities may consider previous study, research experience, publications, work experience and referee reports; first-class honours is not required by the RTP rules themselves.',
              'প্রতিটি university নিজের ভর্তির নিয়ম ঠিক করে। RTP scholar বাছাইয়ে university আগের পড়াশোনা, গবেষণার অভিজ্ঞতা, publication, কাজের অভিজ্ঞতা আর referee report বিবেচনা করতে পারে; RTP-র নিয়মে first-class honours বাধ্যতামূলক নয়।',
            ),
            b('Research proposal and supervisor contact: not verified here as a general rule — most universities describe their own process on their research degree pages.', 'Research proposal আর supervisor-এর সঙ্গে যোগাযোগ: সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি — বেশিরভাগ university তাদের research degree page-এ নিজের প্রক্রিয়া জানায়।'),
            CHECK_UNI,
          ],
          [AU_RTP_FAQ],
          { status: 'partly-verified' },
        ),
        qa(
          'interview',
          b('Is there an interview?', 'Interview হয় কি?'),
          [b('Not verified yet as a general rule: each university decides its selection process. Check the research degree page.', 'এখনো সাধারণ নিয়ম হিসেবে যাচাই হয়নি: প্রতিটি university নিজের বাছাই প্রক্রিয়া ঠিক করে। Research degree page দেখুন।')],
          [AU_RTP_FAQ],
          { status: 'not-verified' },
        ),
      ],
    },
    { id: 'language', title: b('English and IELTS', 'ইংরেজি আর IELTS'), items: [english('english')] },
    {
      id: 'funding',
      title: b('Funded or self-funded', 'Funded নাকি নিজের খরচে'),
      items: [
        qa(
          'rtp',
          b('What is the RTP scholarship?', 'RTP scholarship কী?'),
          [
            b(
              'The Research Training Program is Australian Government funding given to eligible universities, which award the scholarships. An RTP scholarship can include a fees offset (which fully offsets your research degree tuition fees), a stipend for living costs and allowances (for example relocation or OSHC).',
              'Research Training Program হলো যোগ্য university-গুলোকে দেওয়া Australian সরকারের অর্থ, আর university-ই scholarship দেয়। RTP scholarship-এ থাকতে পারে fees offset (research degree-র tuition fee পুরোটা পূরণ করে), থাকার খরচের জন্য stipend আর allowance (যেমন স্থানান্তর বা OSHC)।',
            ),
            b(
              'International students are eligible, but selection is competitive and universities may spend at most 10% of their RTP funding on international students. The stipend is at least the national base rate; the exact rate, the application and the deadline are set by each university. A full-time doctorate is supported for 3 to 4 years.',
              'International student-রা যোগ্য, তবে বাছাই প্রতিযোগিতামূলক, আর university তাদের RTP অর্থের সর্বোচ্চ ১০% international student-দের জন্য খরচ করতে পারে। Stipend অন্তত জাতীয় base rate; সঠিক rate, আবেদন আর শেষ তারিখ প্রতিটি university ঠিক করে। Full-time doctorate-এ ৩ থেকে ৪ বছর সহায়তা দেওয়া হয়।',
            ),
          ],
          [AU_RTP, AU_RTP_FAQ],
        ),
        qa(
          'funded',
          b('What is the difference between funded and self-funded PhDs?', 'Funded আর self-funded PhD-র পার্থক্য কী?'),
          [
            b(
              'Funded: a scholarship such as RTP (or a university scholarship) offsets fees and/or pays a stipend. Self-funded: you pay the international tuition fee and must show the first 12 months of fees plus living costs (AUD 29,710 for 12 months) for the visa. International PhD fees are set by each university and are not verified here.',
              'Funded: RTP-র মতো scholarship (বা university-র scholarship) fee পূরণ করে আর/অথবা stipend দেয়। Self-funded: international tuition fee নিজে দিতে হয়, আর visa-র জন্য প্রথম ১২ মাসের fee সঙ্গে থাকার খরচ (১২ মাসে AUD 29,710) দেখাতে হয়। International PhD fee প্রতিটি university ঠিক করে, এখানে যাচাই হয়নি।',
            ),
          ],
          [AU_RTP_FAQ, AU_VISA],
          { status: 'partly-verified' },
        ),
        { embed: 'scholarships' },
      ],
    },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b('How do you apply for a PhD?', 'PhD-তে কীভাবে আবেদন করবেন?'),
          [b("Find a research area and potential supervisor at an eligible university, apply for admission through the university's research degree application, and apply for RTP or other scholarships by the university's own deadline (check its RTP scholarship policy). After an offer: CoE, OSHC and the Student visa.", 'যোগ্য university-তে গবেষণার বিষয় আর সম্ভাব্য supervisor খুঁজুন, university-র research degree আবেদনে ভর্তির আবেদন করুন, আর university-র নিজের শেষ তারিখের মধ্যে RTP বা অন্য scholarship-এর আবেদন করুন (তার RTP scholarship policy দেখুন)। Offer-এর পরে: CoE, OSHC আর Student visa।')],
          [AU_RTP_FAQ, AU_VISA],
          { kind: 'guidance' },
        ),
      ],
    },
    ...commonTail('phd'),
  ],
};

// ------------------------------------------------------------------ the country

export const AU_GUIDE: CountryGuide = {
  code: 'AU',
  checkedAt: AU_READ,
  sourcesPerSection: true,
  intro: b(
    "Australia offers bachelor's, coursework and research master's, and research doctorates, taught in English. You apply directly to each university, get a Confirmation of Enrolment (CoE) and apply for the Student visa (subclass 500); after graduating, the Temporary Graduate visa (subclass 485) may let you stay and work. This guide is built from Home Affairs, the Department of Education and Study Australia, DFAT and university pages.",
    "Australia-তে ইংরেজিতে bachelor's, coursework আর research master's এবং research doctorate পড়া যায়। প্রতিটি university-তে সরাসরি আবেদন করে Confirmation of Enrolment (CoE) নিয়ে Student visa (subclass 500)-এর আবেদন; পড়া শেষে Temporary Graduate visa (subclass 485) দিয়ে থেকে কাজ করার সুযোগ থাকতে পারে। এই guide Home Affairs, Department of Education ও Study Australia, DFAT আর university-র page থেকে তৈরি।",
  ),
  overview: [
    qa(
      'system',
      b('How does Australian higher education work for international students?', 'International student-দের জন্য Australia-র উচ্চশিক্ষা কেমন?'),
      [
        b(
          "To study on a Student visa you must be enrolled full-time in a course registered on CRICOS. You apply directly to each university; tuition depends on the provider, level and location. Master's degrees are by coursework or research, and research master's and doctorates are higher degrees by research, which can be supported by RTP scholarships.",
          "Student visa-তে পড়তে CRICOS-নিবন্ধিত course-এ full-time ভর্তি থাকতে হয়। প্রতিটি university-তে সরাসরি আবেদন করতে হয়; tuition নির্ভর করে provider, level আর জায়গার উপর। Master's হয় coursework বা research-ভিত্তিক, আর research master's ও doctorate হলো higher degree by research, যেখানে RTP scholarship পাওয়া যেতে পারে।",
        ),
      ],
      [AU_VISA, AU_COSTS, AU_RTP_FAQ],
    ),
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [AU_VISA, AU_UNSW_TABLE, AU_AWARDS_BD],
      {
        kind: 'guidance',
        list: [
          b('Lodging the visa without a CoE — the application is invalid.', 'CoE ছাড়া visa আবেদন জমা — আবেদন বৈধ হবে না।'),
          b('Taking an at-home English test — Home Affairs does not accept them.', 'বাসা থেকে English test দেওয়া — Home Affairs তা গ্রহণ করে না।'),
          b('Treating the AUD 29,710 visa figure as your budget — real costs may be much higher.', 'Visa-র AUD 29,710-কে বাজেট ধরা — আসল খরচ অনেক বেশি হতে পারে।'),
          b('Planning to pay living costs from part-time work.', 'Part-time কাজ করে থাকার খরচ চালানোর পরিকল্পনা।'),
          b('Assuming HSC gives direct entry everywhere — some universities ask for a foundation year or university study first.', 'সব জায়গায় HSC দিয়ে সরাসরি ভর্তি ধরে নেওয়া — কিছু university আগে foundation year বা university-পড়াশোনা চায়।'),
          b('Missing the Australia Awards round, which closes long before courses start.', 'Australia Awards-এর round মিস করা, যা course শুরুর অনেক আগে বন্ধ হয়।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in Australia from Bangladesh?", "Bangladesh থেকে Australia-তে Bachelor's পড়তে কী কী লাগে?"), [b('Qualifications the university accepts (with HSC often a foundation program or some university study), English at the course level, then an offer, a CoE, OSHC, financial evidence and a Student visa (subclass 500).', 'University যে qualification মানে (HSC থাকলে প্রায়ই foundation program বা কিছু university-পড়াশোনা), course-এর level-এর ইংরেজি, তারপর offer, CoE, OSHC, আর্থিক প্রমাণ আর Student visa (subclass 500)।')], [AU_UNSW_TABLE, AU_VISA]),
    qa('hsc', b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"), [b("It depends on the university. UNSW's 2027 entry table asks Bangladeshi applicants for a year of university study (or a completed short bachelor's) or a foundation year; Monash and Melbourne publish foundation pathways. Check each university.", "University-র উপর নির্ভর করে। UNSW-এর ২০২৭ entry table Bangladesh-এর আবেদনকারীদের কাছে এক বছরের university-পড়াশোনা (বা শেষ করা ছোট bachelor's) বা foundation year চায়; Monash আর Melbourne foundation pathway দেয়। প্রতিটি university দেখে নিন।")], [AU_UNSW_TABLE, AU_MONASH_MIN, AU_MELB_UG], { status: 'partly-verified' }),
    qa('cost', b('How much does it cost to study in Australia?', 'Australia-তে পড়াশোনার খরচ কত?'), [b('There is no single figure: tuition depends on the university, level, course and location (not verified here), and living costs depend on the city and lifestyle. Official amounts: visa from AUD 2,500; for the visa you must show AUD 29,710 living costs for 12 months, the first year of fees and AUD 2,000 travel. OSHC, rent, food and transport are not verified here.', 'একক কোনো অঙ্ক নেই: tuition নির্ভর করে university, level, course আর জায়গার উপর (এখানে যাচাই হয়নি), আর থাকার খরচ শহর ও জীবনযাপনের উপর। Official অঙ্ক: visa AUD 2,500 থেকে; visa-র জন্য দেখাতে হয় ১২ মাসের থাকার খরচ AUD 29,710, প্রথম বছরের fee আর যাতায়াতের AUD 2,000। OSHC, বাসাভাড়া, খাবার আর যাতায়াত এখানে যাচাই হয়নি।')], [AU_VISA, AU_COSTS], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for Australia?', 'Australia-তে IELTS কত লাগে?'), [b('The visa minimum is IELTS 6.0 (TOEFL iBT 64, PTE 50, C1 Advanced 169), lower with an ELICOS or foundation course. Your university sets its own score, often higher. At-home tests are not accepted.', 'Visa-র minimum IELTS 6.0 (TOEFL iBT 64, PTE 50, C1 Advanced 169), ELICOS বা foundation course-সহ কম। University নিজের score ঠিক করে, প্রায়ই বেশি। বাসা থেকে দেওয়া test গ্রহণ করা হয় না।')], [AU_VISA]),
    qa('visa', b('What do you need for the Student visa?', 'Student Visa-এর জন্য কী কী লাগে?'), [b('A CoE, Genuine Student answers, English, financial capacity, OSHC, health and character checks, and the Australian Values Statement (18+). The fee is from AUD 2,500; in Bangladesh biometrics are given at the AVAC in Dhaka.', 'CoE, Genuine Student প্রশ্নের উত্তর, ইংরেজি, আর্থিক সামর্থ্য, OSHC, স্বাস্থ্য আর চরিত্রের যাচাই, আর Australian Values Statement (১৮+)। Fee AUD 2,500 থেকে; Bangladesh-এ ঢাকার AVAC-এ biometrics দিতে হয়।')], [AU_VISA, AU_HC_DHAKA]),
    qa('work', b('Can you work while studying in Australia?', 'Australia-তে পড়ার পাশাপাশি কাজ করা যায়?'), [b("Yes: up to 48 hours a fortnight while your course is in session. Research master's and doctoral students have no limit. Do not rely on work to pay living costs.", "হ্যাঁ: course চলাকালীন প্রতি দুই সপ্তাহে ৪৮ ঘণ্টা পর্যন্ত। Research master's আর doctoral student-দের সীমা নেই। থাকার খরচ চালাতে কাজের উপর নির্ভর করবেন না।")], [AU_VISA]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b("Yes, mainly for postgraduate study: Australia Awards (master's, Bangladesh eligible) and RTP scholarships for research degrees, awarded competitively by universities. Undergraduate scholarships are university-specific and not verified here.", "হ্যাঁ, মূলত postgraduate-এর জন্য: Australia Awards (master's, Bangladesh যোগ্য) আর research degree-র জন্য RTP scholarship, যা university প্রতিযোগিতার মাধ্যমে দেয়। Undergraduate scholarship প্রতিটি university-র নিজস্ব, এখানে যাচাই হয়নি।")], [AU_AWARDS_BD, AU_RTP_FAQ]),
    qa('after', b('What are the options to stay or work in Australia after your studies?', 'পড়াশোনা শেষে Australia-তে থাকা বা কাজ করার সুযোগ কী?'), [b('The Temporary Graduate visa (subclass 485), Post-Higher Education Work stream: usually 2 to 3 years with full work rights, from AUD 5,750; age 35 or under; apply within 6 months of completing. It is temporary and does not promise permanent residence.', 'Temporary Graduate visa (subclass 485)-এর Post-Higher Education Work stream: সাধারণত ২ থেকে ৩ বছর, পুরো কাজের অধিকারসহ, AUD 5,750 থেকে; বয়স ৩৫ বা কম; পড়া শেষের ৬ মাসের মধ্যে আবেদন। এটা অস্থায়ী, স্থায়ী বসবাসের নিশ্চয়তা দেয় না।')], [AU_485, AU_485_PHE]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('AUD 29,710 living costs for 12 months, the first 12 months of fees and AUD 2,000 travel — or parents’/partner’s income of at least AUD 87,856 shown with tax documents.', '১২ মাসের থাকার খরচ AUD 29,710, প্রথম ১২ মাসের fee আর যাতায়াতের AUD 2,000 — অথবা tax document দিয়ে দেখানো বাবা-মা/partner-এর অন্তত AUD 87,856 আয়।')], [AU_VISA]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before admission (university): passport, certificates and transcripts, English test, and for some courses a CV, statement of purpose, references or research proposal. After admission (visa): CoE, financial evidence, Genuine Student answers, OSHC, health examinations, police certificates, biometrics. Scholarship documents are separate. Each degree guide explains every document once.', 'ভর্তির আগে (university): passport, সনদ আর transcript, English test, আর কিছু course-এ CV, statement of purpose, reference বা research proposal। ভর্তির পরে (visa): CoE, আর্থিক প্রমাণ, Genuine Student উত্তর, OSHC, স্বাস্থ্য পরীক্ষা, police certificate, biometrics। Scholarship-এর document আলাদা। প্রতিটি degree guide-এ প্রতিটি document একবার ব্যাখ্যা করা আছে।')], [AU_VISA, AU_AWARDS_BD]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A bachelor's the university accepts, English at the course level and the course's documents; apply directly. No Australia-wide CGPA rule is verified — check each university.", "University যে bachelor's মানে, course-এর level-এর ইংরেজি আর course-এর document; সরাসরি আবেদন। Australia-জুড়ে কোনো CGPA নিয়ম যাচাই হয়নি — প্রতিটি university দেখুন।")], [AU_VISA], { status: 'partly-verified' }),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Admission set by each university, and funding from an RTP or university scholarship, or self-funding. Universities select RTP scholars competitively.', 'প্রতিটি university-র ঠিক করা ভর্তির শর্ত, আর RTP বা university scholarship থেকে অর্থ, নয়তো নিজের খরচ। University প্রতিযোগিতার মাধ্যমে RTP scholar বাছাই করে।')], [AU_RTP_FAQ]),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — Adelaide University, Australian National University, Monash University, UNSW Sydney, the University of Melbourne, The University of Queensland, the University of Sydney and the University of Western Australia — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — Adelaide University, Australian National University, Monash University, UNSW Sydney, University of Melbourne, The University of Queensland, University of Sydney আর University of Western Australia — বর্ণানুক্রমে দেওয়া, মান অনুযায়ী সাজানো নয়।')], [AU_LOCATIONS]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: all visa applicants in Bangladesh must give biometrics, at the Australian Visa Application Centre in Dhaka (VFS Global); Australia Awards Bangladesh funds master\'s study (the 2027-intake round has closed; the next is expected in early 2027); UNSW asks Bangladeshi applicants for university study or a foundation year before a bachelor\'s. Other Bangladesh-specific requirements: not verified yet.', 'Bangladesh-এর জন্য যাচাই করা: Bangladesh-এর সব visa আবেদনকারীকে ঢাকার Australian Visa Application Centre-এ (VFS Global) biometrics দিতে হয়; Australia Awards Bangladesh master\'s-এর খরচ দেয় (২০২৭ intake-এর round বন্ধ; পরেরটি ২০২৭-এর শুরুতে প্রত্যাশিত); UNSW bachelor\'s-এর আগে Bangladesh-এর আবেদনকারীদের কাছে university-পড়াশোনা বা foundation year চায়। অন্যান্য Bangladesh-নির্দিষ্ট শর্ত: এখনো যাচাই হয়নি।'),
    ], [AU_HC_DHAKA, AU_VFS_BD, AU_AWARDS_BD, AU_AWARDS_SITE, AU_UNSW_TABLE]),
  ],
  life: [
    qa('arrival', b('What happens when you arrive?', 'পৌঁছানোর পরে কী?'), [b('Your OSHC must start from the day you arrive, and your visa is linked to your passport digitally (no label). Students under 18 need approved accommodation and welfare arrangements.', 'পৌঁছানোর দিন থেকেই OSHC চালু থাকতে হবে, আর visa digitally passport-এর সঙ্গে যুক্ত (কোনো label নেই)। ১৮ বছরের কম বয়সী student-দের অনুমোদিত থাকা আর দেখাশোনার ব্যবস্থা লাগে।')], [AU_VISA, AU_ACCOM]),
    qa('health', b('How does healthcare work?', 'চিকিৎসা ব্যবস্থা কেমন?'), [b('Through your Overseas Student Health Cover (OSHC). What each policy covers depends on the provider and is not verified here.', 'আপনার Overseas Student Health Cover (OSHC)-এর মাধ্যমে। প্রতিটি policy কী কভার করে, তা provider-এর উপর নির্ভর করে, এখানে যাচাই হয়নি।')], [AU_VISA], { status: 'partly-verified' }),
  ],
  documents: AU_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'fact', status: 'not-verified' },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 29710, unit: 'AUD/year', text: b('AUD 29,710 living costs for 12 months, plus the first 12 months of fees and AUD 2,000 travel.', '১২ মাসের থাকার খরচ AUD 29,710, সঙ্গে প্রথম ১২ মাসের fee আর যাতায়াতের AUD 2,000।') }, source: AU_VISA },
    { id: 'living-cost', kind: 'estimate', status: 'partly-verified', value: { min: 29710, unit: 'AUD/year', text: b('Only the visa minimum is official; real costs vary by city and may be much higher.', 'শুধু visa-র minimum official; আসল খরচ শহর অনুযায়ী আলাদা আর অনেক বেশি হতে পারে।') }, source: AU_VISA },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { max: 24, unit: 'hours/week', text: b("Up to 48 hours a fortnight while the course is in session; no limit for research master's and doctoral students.", "Course চলাকালীন প্রতি দুই সপ্তাহে ৪৮ ঘণ্টা পর্যন্ত; research master's আর doctoral student-দের সীমা নেই।") }, source: AU_VISA },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { min: 24, max: 36, unit: 'months', text: b('Temporary Graduate visa (485), Post-Higher Education Work stream: usually 2 to 3 years depending on the qualification.', 'Temporary Graduate visa (485), Post-Higher Education Work stream: qualification অনুযায়ী সাধারণত ২ থেকে ৩ বছর।') }, source: AU_485 },
    { id: 'english-programs', kind: 'fact', status: 'verified', value: { unit: 'programs', text: b('Courses are taught in English; the visa minimum is IELTS 6.0 or equivalent.', 'Course ইংরেজিতে পড়ানো হয়; visa-র minimum IELTS 6.0 বা সমমান।') }, source: AU_VISA },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 2500, unit: 'AUD', text: b('From AUD 2,500.', 'AUD 2,500 থেকে।') }, source: AU_VISA },
  ],
};

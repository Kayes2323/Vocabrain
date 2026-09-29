import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  CA_APPLY,
  CA_CGRSD,
  CA_EDUCANADA_COST,
  CA_FEES,
  CA_FUNDS,
  CA_GUIDE_5269,
  CA_MEDICAL,
  CA_MEDICAL_LIST,
  CA_PAL,
  CA_PGWP_ABOUT,
  CA_PGWP_APPLY,
  CA_PGWP_ELIG,
  CA_QC_COSTS,
  CA_READ,
  CA_SICS,
  CA_SPOUSE,
  CA_STATCAN,
  CA_UALBERTA_BD,
  CA_UOFT_COUNTRY,
  CA_UOFT_ENGLISH,
  CA_UOFT_SGS_ENGLISH,
  CA_VAC,
  CA_VANIER,
  CA_WATERLOO_BD,
  CA_WORK,
} from './ca-sources';

/**
 * Canada reading guide, researched on its own from current Canadian official
 * sources (IRCC, the Government of Quebec, Statistics Canada, EduCanada, NSERC
 * and university pages). Nothing is taken from another country's guide or from
 * older rules. Amounts stay in Canadian dollars (CAD) and are never converted.
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
  'Requirements are not the same at every Canadian university: each university and program sets its own. Always check the official page of the university you apply to.',
  'Canada-র সব university-তে শর্ত এক নয়: প্রতিটি university আর program নিজের শর্ত ঠিক করে। যে university-তে আবেদন করবেন, তার official page অবশ্যই দেখে নিন।',
);

const FUNDS_CHANGE = b(
  'The amount changed on 1 September 2026: applications made between 1 January 2025 and 31 August 2026 needed CAD 22,895 for one person; from 1 September 2026 it is CAD 23,448. Websites and agents still quoting older amounts are out of date.',
  'অঙ্কটি ১ September 2026-এ বদলেছে: ১ January 2025 থেকে ৩১ August 2026-এর মধ্যে করা আবেদনে একজনের জন্য CAD 22,895 লাগত; ১ September 2026 থেকে CAD 23,448। যেসব website বা agent এখনো পুরোনো অঙ্ক বলে, সেগুলো হালনাগাদ নয়।',
);

// ------------------------------------------------------------------ shared answers

const permit = (id: string) =>
  qa(
    id,
    b('What do you need for a Canadian study permit?', 'Canada-র study permit-এর জন্য কী কী লাগে?'),
    [
      b(
        'A letter of acceptance from a designated learning institution (DLI), proof of financial support, proof of identity and, in most cases, a provincial or territorial attestation letter (PAL/TAL) — whether your program needs one is explained on each degree page. If you will study in Quebec, you need a Quebec Acceptance Certificate (CAQ) instead; it also serves as the PAL/TAL. You apply online (paper only in limited cases such as a disability that prevents online applying).',
        'Designated learning institution (DLI)-এর letter of acceptance, আর্থিক সামর্থ্যের প্রমাণ, পরিচয়ের প্রমাণ, আর বেশিরভাগ ক্ষেত্রে provincial বা territorial attestation letter (PAL/TAL) — আপনার program-এ এটা লাগবে কিনা, প্রতিটি degree page-এ বলা আছে। Quebec-এ পড়লে এর বদলে Quebec Acceptance Certificate (CAQ) লাগে; সেটাই PAL/TAL-এর কাজ করে। আবেদন online-এ করতে হয় (কাগজে শুধু সীমিত ক্ষেত্রে, যেমন এমন অক্ষমতা যার কারণে online আবেদন সম্ভব নয়)।',
      ),
      b(
        'The study permit fee is CAD 150. Applicants aged 14 to 79 usually give biometrics (fingerprints and a photo, CAD 85) at a visa application centre by appointment. A medical exam may be requested, and police certificates may be requested.',
        'Study permit-এর fee CAD 150। ১৪ থেকে ৭৯ বছর বয়সী আবেদনকারীরা সাধারণত appointment নিয়ে visa application centre-এ biometrics (আঙুলের ছাপ আর ছবি, CAD 85) দেন। Medical exam চাওয়া হতে পারে, police certificate-ও চাওয়া হতে পারে।',
      ),
    ],
    [CA_APPLY, CA_GUIDE_5269, CA_FEES, CA_VAC],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'Outside Quebec, if you apply on or after 1 September 2026: CAD 23,448 a year for one person, in addition to your tuition and travel costs (CAD 43,572 for a family of four). Proof can be bank statements, a Canadian Guaranteed Investment Certificate (GIC) or an education loan, among others.',
        'Quebec-এর বাইরে, ১ September 2026 বা তার পরে আবেদন করলে: একজনের জন্য বছরে CAD 23,448, tuition আর যাতায়াতের খরচের উপরে (চারজনের পরিবারের জন্য CAD 43,572)। প্রমাণ হতে পারে bank statement, Canada-র Guaranteed Investment Certificate (GIC) বা education loan, ইত্যাদি।',
      ),
      b(
        'For Quebec, the Government of Quebec sets the amount for the CAQ: CAD 24,617 a year for one person if you apply from 1 January 2026.',
        'Quebec-এর জন্য CAQ-এর অঙ্ক Quebec সরকার ঠিক করে: ১ January 2026 থেকে আবেদন করলে একজনের জন্য বছরে CAD 24,617।',
      ),
    ],
    [CA_FUNDS, CA_GUIDE_5269, CA_QC_COSTS],
    { allDegrees: true, discrepancy: FUNDS_CHANGE },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Canada?', 'Canada-য় পড়ার পাশাপাশি কাজ করা যায়?'),
    [
      b(
        'If your study permit allows off-campus work: up to 24 hours a week during regular school terms, and unlimited hours during scheduled breaks set by your school, such as summer and winter holidays or a reading week.',
        'আপনার study permit campus-এর বাইরে কাজের অনুমতি দিলে: নিয়মিত সেমিস্টারে সপ্তাহে সর্বোচ্চ ২৪ ঘণ্টা, আর আপনার প্রতিষ্ঠানের নির্ধারিত ছুটিতে (যেমন গ্রীষ্ম ও শীতের ছুটি বা reading week) ঘণ্টার কোনো সীমা নেই।',
      ),
      b('Check the conditions printed on your study permit before you start work.', 'কাজ শুরুর আগে study permit-এ লেখা শর্ত দেখে নিন।'),
    ],
    [CA_WORK],
    { allDegrees: true },
  );

const after = (id: string) =>
  qa(
    id,
    b('Can you work in Canada after graduating?', 'পড়া শেষে Canada-য় কাজ করা যায়?'),
    [
      b(
        "Through the post-graduation work permit (PGWP). Graduates of a bachelor's, master's or doctoral degree have no field-of-study requirement, but must show English at CLB 7 (or French at NCLC 7) in all four language areas. You have up to 180 days after you graduate to apply; the fee is CAD 255 (the work permit fee plus the open work permit holder fee).",
        "Post-graduation work permit (PGWP)-এর মাধ্যমে। Bachelor's, master's বা doctoral degree-র graduate-দের বিষয়ের (field of study) কোনো শর্ত নেই, তবে চারটি ভাষা-দক্ষতাতেই ইংরেজিতে CLB 7 (বা French-এ NCLC 7) দেখাতে হয়। Graduate হওয়ার পর আবেদনের জন্য ১৮০ দিন পর্যন্ত সময় পাবেন; fee CAD 255 (work permit fee আর open work permit holder fee মিলিয়ে)।",
      ),
      b(
        'How long the PGWP lasts depends on your program and is explained on each degree page; it can never run past your passport expiry. A PGWP is temporary and does not promise permanent residence.',
        'PGWP কতদিনের হবে তা program-এর উপর নির্ভর করে, প্রতিটি degree page-এ বলা আছে; passport-এর মেয়াদের বেশি কখনো হয় না। PGWP অস্থায়ী, স্থায়ী বসবাসের নিশ্চয়তা দেয় না।',
      ),
    ],
    [CA_PGWP_ELIG, CA_PGWP_APPLY, CA_PGWP_ABOUT],
    { allDegrees: true },
  );

const health = (id: string) =>
  qa(
    id,
    b('Do you need a medical exam?', 'Medical exam লাগবে কি?'),
    [
      b(
        'IRCC requires an immigration medical exam if you will stay more than 6 months and, in the year before you come, lived in or travelled to certain countries or territories for 6 months or more in a row. IRCC updated this country list from November 2025.',
        'IRCC-র নিয়মে immigration medical exam লাগে যদি আপনি ৬ মাসের বেশি থাকবেন এবং আসার আগের এক বছরে টানা ৬ মাস বা তার বেশি নির্দিষ্ট কিছু দেশ বা অঞ্চলে থেকেছেন বা ভ্রমণ করেছেন। IRCC এই দেশের তালিকা November 2025 থেকে হালনাগাদ করেছে।',
      ),
      b(
        'Whether Bangladesh is marked "yes" on the current list could not be confirmed from the page as read, so this needs review: check the IRCC list yourself before applying, and follow any medical instructions IRCC sends you.',
        'বর্তমান তালিকায় Bangladesh-এর পাশে "yes" আছে কিনা, পড়া page থেকে নিশ্চিত করা যায়নি, তাই এটা পুনর্যাচাই দরকার: আবেদনের আগে IRCC-র তালিকা নিজে দেখে নিন, আর IRCC যে medical নির্দেশনা পাঠায় তা মেনে চলুন।',
      ),
    ],
    [CA_MEDICAL, CA_MEDICAL_LIST],
    { status: 'needs-review', allDegrees: true },
  );

const processing = (id: string) =>
  qa(
    id,
    b('How long does the study permit take?', 'Study permit-এ কত সময় লাগে?'),
    [
      b(
        'Not verified yet: IRCC publishes processing times in an online tool that changes often, so no fixed figure is given here. Check the current time on IRCC\'s website for applications from Bangladesh, apply as early as your letter of acceptance allows, and book biometrics as soon as you are asked.',
        'এখনো যাচাই হয়নি: IRCC processing time একটি online tool-এ প্রকাশ করে, যা প্রায়ই বদলায়, তাই এখানে কোনো নির্দিষ্ট সময় দেওয়া হলো না। Bangladesh থেকে আবেদনের বর্তমান সময় IRCC-র website-এ দেখুন, letter of acceptance পাওয়ার পর যত দ্রুত সম্ভব আবেদন করুন, আর বলা মাত্র biometrics-এর appointment নিন।',
      ),
    ],
    [CA_APPLY],
    { status: 'not-verified', allDegrees: true },
  );

const living = (id: string) =>
  qa(
    id,
    b('How much are living costs?', 'থাকা-খাওয়ার খরচ কত?'),
    [
      b(
        'IRCC\'s minimum for living expenses is CAD 23,448 a year for one student outside Quebec (applications from 1 September 2026); Quebec sets CAD 24,617 for the CAQ. These are minimums you must show, not a full budget: rent and prices differ a lot between cities and are not verified here.',
        'IRCC-র হিসাবে Quebec-এর বাইরে একজন student-এর থাকার খরচের minimum বছরে CAD 23,448 (১ September 2026 থেকে আবেদনে); Quebec CAQ-এর জন্য CAD 24,617 ঠিক করেছে। এগুলো দেখানোর minimum, পুরো বাজেট নয়: বাসাভাড়া আর দাম শহরভেদে অনেক আলাদা, এখানে যাচাই হয়নি।',
      ),
    ],
    [CA_FUNDS, CA_QC_COSTS],
    { kind: 'estimate', status: 'partly-verified', allDegrees: true },
  );

const tuitionDiscrepancy = b(
  'EduCanada still quotes CAD 41,746 (undergraduate) and CAD 24,028 (graduate) — Statistics Canada\'s preliminary 2025/2026 figures from September 2025. Statistics Canada\'s table released on 16 September 2026 revised 2025/2026 to CAD 40,431 and CAD 23,838, and gives CAD 42,062 and CAD 24,693 for 2026/2027 (preliminary). This guide uses the newest Statistics Canada figures.',
  'EduCanada এখনো CAD 41,746 (undergraduate) আর CAD 24,028 (graduate) বলে — এগুলো September 2025-এ Statistics Canada-র 2025/2026-এর প্রাথমিক অঙ্ক। ১৬ September 2026-এ প্রকাশিত Statistics Canada-র table 2025/2026-কে সংশোধন করে CAD 40,431 আর CAD 23,838 করেছে, আর 2026/2027-এর জন্য CAD 42,062 আর CAD 24,693 দিয়েছে (প্রাথমিক)। এই guide Statistics Canada-র সর্বশেষ অঙ্ক ব্যবহার করেছে।',
);
const tuitionDiscrepancyFor = (level: 'bachelors' | 'graduate') =>
  level === 'bachelors'
    ? b(
        'EduCanada still quotes CAD 41,746 for international undergraduates — Statistics Canada\'s preliminary 2025/2026 figure from September 2025. Statistics Canada\'s table released on 16 September 2026 revised 2025/2026 to CAD 40,431 and gives CAD 42,062 for 2026/2027 (preliminary). This guide uses the newest figure.',
        'EduCanada এখনো international undergraduate-দের জন্য CAD 41,746 বলে — এটা September 2025-এ Statistics Canada-র 2025/2026-এর প্রাথমিক অঙ্ক। ১৬ September 2026-এ প্রকাশিত Statistics Canada-র table 2025/2026-কে সংশোধন করে CAD 40,431 করেছে, আর 2026/2027-এর জন্য CAD 42,062 দিয়েছে (প্রাথমিক)। এই guide সর্বশেষ অঙ্ক ব্যবহার করেছে।',
      )
    : b(
        'EduCanada still quotes CAD 24,028 for international graduate students — Statistics Canada\'s preliminary 2025/2026 figure from September 2025. Statistics Canada\'s table released on 16 September 2026 revised 2025/2026 to CAD 23,838 and gives CAD 24,693 for 2026/2027 (preliminary). This guide uses the newest figure.',
        'EduCanada এখনো international graduate student-দের জন্য CAD 24,028 বলে — এটা September 2025-এ Statistics Canada-র 2025/2026-এর প্রাথমিক অঙ্ক। ১৬ September 2026-এ প্রকাশিত Statistics Canada-র table 2025/2026-কে সংশোধন করে CAD 23,838 করেছে, আর 2026/2027-এর জন্য CAD 24,693 দিয়েছে (প্রাথমিক)। এই guide সর্বশেষ অঙ্ক ব্যবহার করেছে।',
      );

const tuition = (id: string, level: 'bachelors' | 'graduate') =>
  qa(
    id,
    b('How much is tuition in Canada?', 'Canada-য় tuition কত?'),
    [
      level === 'bachelors'
        ? b('Statistics Canada\'s average for international undergraduate students is CAD 42,062 a year in 2026/2027 (preliminary), and it varies widely by province — from CAD 18,911 in Newfoundland and Labrador to CAD 50,088 in Ontario. Your exact fee depends on the university and program.', 'Statistics Canada-র হিসাবে 2026/2027-এ international undergraduate student-দের গড় বছরে CAD 42,062 (প্রাথমিক), আর প্রদেশভেদে অনেক আলাদা — Newfoundland and Labrador-এ CAD 18,911 থেকে Ontario-তে CAD 50,088। সঠিক fee university আর program-এর উপর নির্ভর করে।')
        : b('Statistics Canada\'s average for international graduate students is CAD 24,693 a year in 2026/2027 (preliminary), varying by province — from CAD 6,996 in Newfoundland and Labrador to CAD 28,900 in Ontario. Your exact fee depends on the university and program.', 'Statistics Canada-র হিসাবে 2026/2027-এ international graduate student-দের গড় বছরে CAD 24,693 (প্রাথমিক), প্রদেশভেদে আলাদা — Newfoundland and Labrador-এ CAD 6,996 থেকে Ontario-তে CAD 28,900। সঠিক fee university আর program-এর উপর নির্ভর করে।'),
    ],
    [CA_STATCAN, CA_EDUCANADA_COST],
    { kind: 'estimate', status: 'partly-verified', discrepancy: tuitionDiscrepancyFor(level) },
  );

const scholarshipsGeneral = b(
  'The Study in Canada Scholarships of Global Affairs Canada list Bangladesh as an eligible country, but they are short exchanges (one term, or 5–6 months for graduate students) for students already enrolled at a university at home, and only Canadian institutions can apply — you cannot apply yourself, and they do not fund a full degree.',
  'Global Affairs Canada-র Study in Canada Scholarships-এ Bangladesh যোগ্য দেশের তালিকায় আছে, কিন্তু এগুলো স্বল্পমেয়াদি exchange (এক term, বা graduate student-দের জন্য ৫–৬ মাস), দেশের university-তে ইতিমধ্যে ভর্তি student-দের জন্য, আর শুধু Canada-র প্রতিষ্ঠান আবেদন করতে পারে — আপনি নিজে আবেদন করতে পারবেন না, আর এটা পুরো degree-র খরচ দেয় না।',
);

// ------------------------------------------------------------------ documents

const IRCC = b('IRCC (Immigration, Refugees and Citizenship Canada).', 'Canada-র অভিবাসন দপ্তর IRCC (Immigration, Refugees and Citizenship Canada)।');

export const CA_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Proof of identity for the university and the study permit; your PGWP can never last beyond its expiry.', 'University আর study permit-এর জন্য পরিচয়ের প্রমাণ; PGWP-ও কখনো এর মেয়াদের বেশি হয় না।'),
    who: IRCC,
    when: b('From the application to arrival — and again when you apply for a PGWP.', 'আবেদন থেকে পৌঁছানো পর্যন্ত — আর PGWP-র আবেদনের সময় আবার।'),
    where: b('University application and the online study permit application.', 'University-র আবেদন আর online study permit আবেদন।'),
    prepare: b('Keep it valid well beyond your planned study period.', 'পরিকল্পিত পড়ার সময়ের চেয়ে বেশ বেশি মেয়াদ রাখুন।'),
    groups: ['general', 'visa'],
    sources: [CA_GUIDE_5269, CA_PGWP_ABOUT],
  },
  {
    id: 'academic',
    name: b('Certificates and transcripts', 'সনদ আর transcript'),
    why: b('University documents (before admission): show that you meet the academic requirement of your program.', 'University-র document (ভর্তির আগে): দেখায় যে আপনার program-এর academic শর্ত পূরণ করছেন।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('With the application.', 'আবেদনের সময়।'),
    where: b('The university\'s international application.', 'University-র international আবেদনে।'),
    prepare: b('Official certificates and full transcripts; each university lists what it needs and in which form.', 'Official সনদ আর পূর্ণ transcript; কী আর কোন আকারে লাগবে, প্রতিটি university জানায়।'),
    groups: ['general', 'program'],
    sources: [CA_UALBERTA_BD, CA_UOFT_COUNTRY],
  },
  {
    id: 'english',
    name: b('English test result', 'ইংরেজি test-এর ফল'),
    why: b('University document: the study permit sets no English score, but universities do (and a PGWP later needs CLB 7).', 'University-র document: study permit-এ ইংরেজির কোনো score নেই, কিন্তু university-র আছে (আর পরে PGWP-তে CLB 7 লাগে)।'),
    who: b('The university.', 'যে university-তে আবেদন করছেন।'),
    when: b('Before or with the application.', 'আবেদনের আগে বা সঙ্গে।'),
    where: b('Sent to the university.', 'University-তে পাঠাতে হয়।'),
    prepare: b('The score must be achieved on a single test date at some universities, such as the University of Toronto.', 'University of Toronto-র মতো কিছু university-তে score একই দিনের test-এ পেতে হয়।'),
    groups: ['program'],
    sources: [CA_UOFT_ENGLISH, CA_PGWP_ELIG],
  },
  {
    id: 'research',
    name: b('Supervisor and research documents (PhD)', 'Supervisor আর গবেষণার document (PhD)'),
    why: b('University requirement for doctoral admission; what is asked (research statement, supervisor contact) is set by each program.', 'Doctoral ভর্তির জন্য university-র শর্ত; কী চাওয়া হয় (research statement, supervisor-এর সঙ্গে যোগাযোগ) প্রতিটি program ঠিক করে।'),
    who: b('The university and department.', 'University আর department।'),
    when: b('Before or with the application.', 'আবেদনের আগে বা সঙ্গে।'),
    where: b('The department\'s graduate admissions page.', 'Department-এর graduate admissions page।'),
    prepare: b('Not verified here as a general rule — check the program.', 'সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি — program দেখুন।'),
    groups: ['program'],
    degrees: ['phd'],
    status: 'not-verified',
    sources: [CA_UOFT_SGS_ENGLISH],
  },
  {
    id: 'loa',
    name: b('Letter of acceptance (LOA) from a DLI', 'DLI-এর letter of acceptance (LOA)'),
    why: b('Study permit document (after admission): only a designated learning institution can issue it.', 'Study permit-এর document (ভর্তির পরে): শুধু designated learning institution (DLI) এটা দিতে পারে।'),
    who: b('Your university (a DLI).', 'আপনার university (একটি DLI)।'),
    when: b('Before you apply for the study permit.', 'Study permit-এর আবেদনের আগে।'),
    where: b('Uploaded with the online study permit application.', 'Online study permit আবেদনের সঙ্গে upload।'),
    prepare: b('Check that the details (name, program, dates) are correct.', 'তথ্য (নাম, program, তারিখ) ঠিক আছে কিনা দেখে নিন।'),
    groups: ['visa'],
    sources: [CA_APPLY, CA_GUIDE_5269],
  },
  {
    id: 'pal',
    name: b('PAL/TAL, or CAQ for Quebec (if required)', 'PAL/TAL, বা Quebec-এর জন্য CAQ (লাগলে)'),
    why: b('Study permit document: a provincial or territorial attestation letter confirms your place in the province\'s allocation; Quebec issues a CAQ instead. Whether your program needs one is explained on your degree page.', 'Study permit-এর document: provincial বা territorial attestation letter প্রদেশের বরাদ্দে আপনার জায়গা নিশ্চিত করে; Quebec এর বদলে CAQ দেয়। আপনার program-এ লাগবে কিনা, degree page-এ বলা আছে।'),
    who: b('The province or territory (Quebec: the ministère de l\'Immigration, de la Francisation et de l\'Intégration).', 'প্রদেশ বা অঞ্চল (Quebec: ministère de l\'Immigration, de la Francisation et de l\'Intégration)।'),
    when: b('Before the study permit application.', 'Study permit আবেদনের আগে।'),
    where: b('Usually requested through your university; the CAQ through the Government of Quebec.', 'সাধারণত university-র মাধ্যমে চাওয়া হয়; CAQ Quebec সরকারের মাধ্যমে।'),
    prepare: b('If you are exempt, you must upload proof of the exemption instead.', 'ছাড় পেলে এর বদলে ছাড়ের প্রমাণ upload করতে হবে।'),
    groups: ['visa'],
    sources: [CA_PAL, CA_GUIDE_5269],
  },
  {
    id: 'finance',
    name: b('Proof of financial support', 'আর্থিক সামর্থ্যের প্রমাণ'),
    why: b('Study permit document: tuition plus CAD 23,448 a year for living outside Quebec (applications from 1 September 2026).', 'Study permit-এর document: tuition, সঙ্গে Quebec-এর বাইরে থাকার জন্য বছরে CAD 23,448 (১ September 2026 থেকে আবেদনে)।'),
    who: IRCC,
    when: b('With the study permit application.', 'Study permit আবেদনের সঙ্গে।'),
    where: b('Uploaded with the application.', 'আবেদনের সঙ্গে upload।'),
    prepare: b('Bank statements, a Canadian GIC or an education loan, among others.', 'Bank statement, Canada-র GIC বা education loan, ইত্যাদি।'),
    groups: ['visa', 'bangladesh'],
    sources: [CA_FUNDS, CA_GUIDE_5269],
  },
  {
    id: 'biometrics',
    name: b('Biometrics (fingerprints and photo)', 'Biometrics (আঙুলের ছাপ আর ছবি)'),
    why: b('Study permit step for most applicants aged 14 to 79; fee CAD 85.', '১৪ থেকে ৭৯ বছর বয়সী বেশিরভাগ আবেদনকারীর study permit-এর ধাপ; fee CAD 85।'),
    who: b('IRCC, collected at a visa application centre (VAC).', 'IRCC; visa application centre (VAC)-এ নেওয়া হয়।'),
    when: b('After you apply and receive the biometrics instruction letter.', 'আবেদনের পর biometrics instruction letter পেলে।'),
    where: b('A VAC, by appointment — use IRCC\'s VAC finder for the centre serving Bangladesh (not verified here).', 'Appointment নিয়ে একটি VAC-এ — Bangladesh-এর জন্য কোন centre, IRCC-র VAC finder দেখুন (এখানে যাচাই হয়নি)।'),
    prepare: b('Book the appointment as soon as you are asked.', 'বলা মাত্র appointment নিন।'),
    groups: ['visa', 'bangladesh'],
    status: 'partly-verified',
    sources: [CA_VAC, CA_APPLY, CA_FEES],
  },
  {
    id: 'medical',
    name: b('Immigration medical exam (if required)', 'Immigration medical exam (লাগলে)'),
    why: b('May be required for stays over 6 months depending on where you lived in the past year; whether Bangladesh is on IRCC\'s current list needs review.', 'গত এক বছর কোথায় ছিলেন তার উপর নির্ভর করে ৬ মাসের বেশি থাকলে লাগতে পারে; IRCC-র বর্তমান তালিকায় Bangladesh আছে কিনা পুনর্যাচাই দরকার।'),
    who: IRCC,
    when: b('Before or after applying, as IRCC instructs.', 'IRCC-র নির্দেশ অনুযায়ী আবেদনের আগে বা পরে।'),
    where: b('A physician approved by IRCC.', 'IRCC-অনুমোদিত চিকিৎসক।'),
    prepare: b('Check the IRCC country list yourself before applying.', 'আবেদনের আগে IRCC-র দেশের তালিকা নিজে দেখুন।'),
    groups: ['visa', 'bangladesh'],
    status: 'needs-review',
    sources: [CA_MEDICAL, CA_MEDICAL_LIST],
  },
  {
    id: 'police',
    name: b('Police certificate (if requested)', 'Police certificate (চাইলে)'),
    why: b('IRCC may request police certificates as part of the study permit application.', 'Study permit আবেদনের অংশ হিসেবে IRCC police certificate চাইতে পারে।'),
    who: IRCC,
    when: b('When IRCC asks for it.', 'IRCC চাইলে।'),
    where: b('Issued in the countries you have lived in.', 'যে দেশে থেকেছেন, সেখান থেকে।'),
    prepare: b('It can take time to obtain — apply as soon as it is requested.', 'পেতে সময় লাগতে পারে — চাওয়া মাত্র আবেদন করুন।'),
    groups: ['visa'],
    sources: [CA_GUIDE_5269],
  },
  {
    id: 'permit-arrival',
    name: b('Study permit (issued at the port of entry)', 'Study permit (প্রবেশের সময় দেওয়া হয়)'),
    why: b('After arrival: the permit carries your conditions, including whether you may work off campus.', 'পৌঁছানোর পরে: permit-এ আপনার শর্ত লেখা থাকে, campus-এর বাইরে কাজ করতে পারবেন কিনা সেটাও।'),
    who: IRCC,
    when: b('On arrival in Canada.', 'Canada-য় পৌঁছানোর সময়।'),
    where: b('At the port of entry.', 'প্রবেশ-বন্দরে।'),
    prepare: b('Check every condition on it before you leave the counter and before you start work.', 'Counter ছাড়ার আগে আর কাজ শুরুর আগে প্রতিটি শর্ত দেখে নিন।'),
    groups: ['arrival'],
    status: 'partly-verified',
    sources: [CA_WORK, CA_APPLY],
  },
];

// ------------------------------------------------------------------ costs (CAD, never converted)

const PERMIT_FEE: GuideCost = { id: 'visa-fee', label: b('Study permit fee', 'Study permit fee'), value: b('CAD 150', 'CAD 150'), amount: { value: 150, currency: 'CAD', period: 'one-time' }, source: CA_FEES };
const BIO_FEE: GuideCost = { id: 'biometrics', label: b('Biometrics fee', 'Biometrics fee'), value: b('CAD 85', 'CAD 85'), amount: { value: 85, currency: 'CAD', period: 'one-time' }, source: CA_FEES };
const FUNDS: GuideCost = { id: 'funds-living', label: b('Living funds to show (outside Quebec, from 1 September 2026)', 'দেখাতে হবে থাকার খরচ (Quebec-এর বাইরে, ১ September 2026 থেকে)'), value: b('CAD 23,448 a year, plus tuition and travel', 'বছরে CAD 23,448, সঙ্গে tuition আর যাতায়াত'), amount: { value: 23448, currency: 'CAD', period: 'year' }, source: CA_FUNDS };
const QC_FUNDS: GuideCost = { id: 'funds-quebec', label: b('Living funds for a CAQ (Quebec, from 1 January 2026)', 'CAQ-এর জন্য থাকার খরচ (Quebec, ১ January 2026 থেকে)'), value: b('CAD 24,617 a year for one person', 'একজনের জন্য বছরে CAD 24,617'), amount: { value: 24617, currency: 'CAD', period: 'year' }, source: CA_QC_COSTS };
const PGWP_FEE: GuideCost = { id: 'pgwp-fee', label: b('Post-graduation work permit (later)', 'Post-graduation work permit (পরে)'), value: b('CAD 255', 'CAD 255'), amount: { value: 255, currency: 'CAD', period: 'one-time' }, source: CA_PGWP_APPLY };
const TUITION_UG: GuideCost = { id: 'tuition', label: b('Tuition — undergraduate (Statistics Canada average, 2026/2027)', 'Tuition — undergraduate (Statistics Canada-র গড়, 2026/2027)'), value: b('About CAD 42,062 a year (average; varies by province)', 'বছরে প্রায় CAD 42,062 (গড়; প্রদেশভেদে আলাদা)'), status: 'partly-verified', amount: { value: 42062, currency: 'CAD', period: 'year' }, source: CA_STATCAN };
const TUITION_PG: GuideCost = { id: 'tuition', label: b('Tuition — graduate (Statistics Canada average, 2026/2027)', 'Tuition — graduate (Statistics Canada-র গড়, 2026/2027)'), value: b('About CAD 24,693 a year (average; varies by province)', 'বছরে প্রায় CAD 24,693 (গড়; প্রদেশভেদে আলাদা)'), status: 'partly-verified', amount: { value: 24693, currency: 'CAD', period: 'year' }, source: CA_STATCAN };
const UNVERIFIED: GuideCost[] = [
  { id: 'application-fee', label: b('University application fee', 'University-র আবেদন fee'), value: b('Not verified — set by each university', 'যাচাই হয়নি — প্রতিটি university ঠিক করে'), status: 'not-verified', source: CA_EDUCANADA_COST },
  { id: 'rent', label: b('Accommodation', 'বাসাভাড়া'), value: b('Not verified — varies by city', 'যাচাই হয়নি — শহর অনুযায়ী আলাদা'), status: 'not-verified', source: CA_FUNDS },
  { id: 'insurance', label: b('Health insurance', 'Health insurance'), value: b('Not verified — depends on the province and university', 'যাচাই হয়নি — প্রদেশ আর university-র উপর নির্ভর করে'), status: 'not-verified', source: CA_APPLY },
  { id: 'medical-exam', label: b('Medical exam (if required)', 'Medical exam (লাগলে)'), value: b('Not verified — paid to the physician', 'যাচাই হয়নি — চিকিৎসককে দিতে হয়'), status: 'not-verified', source: CA_MEDICAL },
];

// ------------------------------------------------------------------ common sections

const commonTail = () => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [living('living'), { embed: 'costs' as const }, funds('funds')] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa('types', b('Which universities are there?', 'কোন কোন university আছে?'), [b('The examples below are Canadian universities in different provinces, listed alphabetically, not ordered by quality. Entry rules, fees and scholarships differ at each, and McGill University is in Quebec, where the CAQ rules apply.', 'নিচের উদাহরণগুলো বিভিন্ন প্রদেশের Canada-র university, বর্ণানুক্রমে, মান অনুযায়ী নয়। ভর্তির নিয়ম, fee আর scholarship প্রতিটিতে আলাদা, আর McGill University Quebec-এ, যেখানে CAQ-এর নিয়ম প্রযোজ্য।')], [CA_STATCAN, CA_GUIDE_5269]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work')] },
  { id: 'visa', title: b('Study permit', 'Study permit'), items: [permit('visa'), processing('processing'), health('health')] },
  { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('After HSC · PAL/TAL needed outside Quebec', 'HSC-র পরে · Quebec-এর বাইরে PAL/TAL লাগে'),
  intro: b(
    "Canadian universities such as the University of Toronto and the University of Alberta accept the Bangladesh Higher Secondary Certificate for undergraduate admission. After you get a letter of acceptance, you need a provincial or territorial attestation letter (PAL/TAL) — or a CAQ in Quebec — before applying for the study permit. A bachelor's degree of two years or more can lead to a post-graduation work permit of up to 3 years.",
    "University of Toronto আর University of Alberta-র মতো Canada-র university undergraduate ভর্তিতে Bangladesh-এর Higher Secondary Certificate (HSC) গ্রহণ করে। Letter of acceptance পাওয়ার পর study permit-এর আগে provincial বা territorial attestation letter (PAL/TAL) লাগে — Quebec-এ CAQ। দুই বছর বা বেশি মেয়াদের bachelor's degree শেষে সর্বোচ্চ ৩ বছরের post-graduation work permit সম্ভব।",
  ),
  costs: { official: [PERMIT_FEE, BIO_FEE, FUNDS, QC_FUNDS, PGWP_FEE], estimates: [TUITION_UG, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in Canada from Bangladesh?", "Bangladesh থেকে Canada-য় Bachelor's পড়তে কী কী লাগে?"),
          [b('Your HSC results, an English test score and the university\'s application. After admission: a letter of acceptance, a PAL/TAL (or CAQ in Quebec), proof of funds (tuition plus CAD 23,448 a year outside Quebec), biometrics and the study permit.', 'আপনার HSC-র ফল, English test score আর university-র আবেদন। ভর্তির পরে: letter of acceptance, PAL/TAL (Quebec-এ CAQ), টাকার প্রমাণ (tuition আর Quebec-এর বাইরে বছরে CAD 23,448), biometrics আর study permit।'), CHECK_UNI],
          [CA_UOFT_COUNTRY, CA_PAL, CA_FUNDS, CA_APPLY],
        ),
        qa(
          'hsc',
          b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"),
          [
            b(
              'Yes at many universities: the University of Toronto lists the Higher Secondary Certificate as the minimum admission requirement for Bangladesh, the University of Alberta asks for an official copy of the HSC with final marks (or Grade 11 and 12 results for early admission), and the University of Waterloo\'s Bangladesh page for Computer Science lists the HSC. Competitive programs expect much more than the minimum; the exact grades are set per program.',
              'অনেক university-তে হ্যাঁ: University of Toronto Bangladesh-এর জন্য Higher Secondary Certificate-কে ন্যূনতম শর্ত হিসেবে দেখায়, University of Alberta চূড়ান্ত নম্বরসহ HSC-র official কপি চায় (early admission-এ Grade 11 আর 12-এর ফল), আর University of Waterloo-র Computer Science-এর Bangladesh page-এ HSC লেখা আছে। প্রতিযোগিতামূলক program ন্যূনতমের চেয়ে অনেক বেশি আশা করে; সঠিক নম্বর প্রতিটি program ঠিক করে।',
            ),
            CHECK_UNI,
          ],
          [CA_UOFT_COUNTRY, CA_UALBERTA_BD, CA_WATERLOO_BD],
        ),
        qa(
          'pal',
          b("Do bachelor's students need a PAL/TAL?", "Bachelor's student-দের কি PAL/TAL লাগে?"),
          [b("Yes, in most cases: undergraduate students outside Quebec need a provincial or territorial attestation letter with the study permit application; IRCC lists the few exceptions. In Quebec, the CAQ serves as the PAL/TAL. Your university usually explains how to request it.", "হ্যাঁ, বেশিরভাগ ক্ষেত্রে: Quebec-এর বাইরে undergraduate student-দের study permit আবেদনের সঙ্গে provincial বা territorial attestation letter লাগে; অল্প কিছু ছাড় IRCC-র তালিকায় আছে। Quebec-এ CAQ-ই PAL/TAL-এর কাজ করে। কীভাবে চাইতে হয়, সাধারণত university জানায়।")],
          [CA_PAL, CA_GUIDE_5269],
        ),
      ],
    },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b('What is the full process, step by step?', 'পুরো প্রক্রিয়া ধাপে ধাপে কেমন?'),
          [b("1) Check the university's Bangladesh requirement. 2) Take an English test. 3) Apply and get a letter of acceptance from the DLI. 4) Get your PAL/TAL (or, for Quebec, your CAQ). 5) Prepare proof of funds: tuition plus CAD 23,448 a year outside Quebec. 6) Apply online for the study permit (CAD 150) and give biometrics (CAD 85) when asked. Intake dates and application deadlines are set by each university and are not verified here.", "১) University-র Bangladesh-এর শর্ত দেখুন। ২) English test দিন। ৩) আবেদন করে DLI-এর letter of acceptance নিন। ৪) PAL/TAL নিন (Quebec-এ CAQ)। ৫) টাকার প্রমাণ তৈরি করুন: tuition আর Quebec-এর বাইরে বছরে CAD 23,448। ৬) Online-এ study permit-এর আবেদন করুন (CAD 150), আর বলা হলে biometrics দিন (CAD 85)। ভর্তির সময় আর শেষ তারিখ প্রতিটি university ঠিক করে, এখানে যাচাই হয়নি।")],
          [CA_APPLY, CA_PAL, CA_FUNDS, CA_FEES],
          { kind: 'guidance' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('English and IELTS', 'ইংরেজি আর IELTS'),
      items: [
        qa(
          'english',
          b('How much IELTS do you need for Canada?', 'Canada-য় IELTS কত লাগে?'),
          [b("Set by each university. Example (University of Toronto, undergraduate): IELTS Academic 6.5 overall with no band below 6.0, achieved on a single test date; the IELTS Indicator and One Skill Retake are not accepted. The study permit itself sets no score.", "প্রতিটি university ঠিক করে। উদাহরণ (University of Toronto, undergraduate): IELTS Academic overall 6.5, কোনো band 6.0-এর নিচে নয়, একই দিনের test-এ; IELTS Indicator আর One Skill Retake গ্রহণযোগ্য নয়। Study permit-এর নিজের কোনো score নেই।"), CHECK_UNI],
          [CA_UOFT_ENGLISH, CA_APPLY],
        ),
      ],
    },
    {
      id: 'scholarships',
      title: b('Scholarships', 'Scholarship'),
      items: [
        qa(
          'scholarships',
          b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
          [scholarshipsGeneral, b("No Government of Canada scholarship for a full bachelor's degree for Bangladeshi students was found in the official sources read. University entrance awards may exist but are not verified here — check each university.", "পড়া official source-গুলোতে Bangladesh-এর student-দের জন্য পুরো bachelor's degree-র কোনো Canada সরকারি scholarship পাওয়া যায়নি। University-র entrance award থাকতে পারে, কিন্তু এখানে যাচাই হয়নি — প্রতিটি university দেখুন।")],
          [CA_SICS],
          { status: 'partly-verified' },
        ),
      ],
    },
    { id: 'tuition', title: b('Tuition', 'Tuition'), items: [tuition('tuition', 'bachelors')] },
    {
      id: 'pgwp',
      title: b('Post-graduation work permit', 'Post-graduation work permit'),
      items: [
        qa(
          'pgwp-length',
          b("How long a PGWP can a bachelor's graduate get?", "Bachelor's graduate কতদিনের PGWP পেতে পারেন?"),
          [b('It follows the length of your program: if it lasted 2 years or more, IRCC may give a PGWP valid for 3 years; if it lasted at least 8 months but less than 2 years, up to the length of the program. It can never run past your passport expiry.', 'এটা program-এর দৈর্ঘ্যের উপর নির্ভর করে: program ২ বছর বা বেশি হলে IRCC ৩ বছরের PGWP দিতে পারে; অন্তত ৮ মাস কিন্তু ২ বছরের কম হলে program-এর দৈর্ঘ্য পর্যন্ত। Passport-এর মেয়াদের বেশি কখনো হয় না।')],
          [CA_PGWP_ABOUT],
        ),
        qa(
          'family',
          b('Can your spouse work in Canada while you study?', 'আপনি পড়ার সময় spouse কি Canada-য় কাজ করতে পারবেন?'),
          [b("Only for certain professional degree programs: since 21 January 2025 a bachelor's student's spouse or common-law partner can get an open work permit only if the program is on IRCC's list — for example Bachelor of Engineering, Bachelor of Science in Nursing, Bachelor of Education, Bachelor of Law, and Pharmacy. For other bachelor's programs, the spouse may need another type of work permit.", "শুধু কিছু professional degree program-এ: ২১ January 2025 থেকে bachelor's student-এর spouse বা common-law partner open work permit পাবেন কেবল program IRCC-র তালিকায় থাকলে — যেমন Bachelor of Engineering, Bachelor of Science in Nursing, Bachelor of Education, Bachelor of Law আর Pharmacy। অন্য bachelor's program-এ spouse-এর অন্য ধরনের work permit লাগতে পারে।")],
          [CA_SPOUSE],
        ),
      ],
    },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b('No PAL/TAL at public universities · 3-year PGWP', 'সরকারি university-তে PAL/TAL লাগে না · ৩ বছরের PGWP'),
  intro: b(
    "Since 1 January 2026, master's students at a public designated learning institution do not need a PAL/TAL (a CAQ is still needed in Quebec). Graduate English requirements are usually higher than undergraduate ones. After a master's program of at least 8 months you can apply for a 3-year post-graduation work permit, and if your program lasts 16 months or longer your spouse may get an open work permit.",
    "১ January 2026 থেকে সরকারি designated learning institution-এর master's student-দের PAL/TAL লাগে না (Quebec-এ CAQ তবুও লাগে)। Graduate পর্যায়ে ইংরেজির শর্ত সাধারণত undergraduate-এর চেয়ে বেশি। অন্তত ৮ মাসের master's program শেষে ৩ বছরের post-graduation work permit-এর আবেদন করা যায়, আর program ১৬ মাস বা বেশি হলে spouse open work permit পেতে পারেন।",
  ),
  costs: { official: [PERMIT_FEE, BIO_FEE, FUNDS, QC_FUNDS, PGWP_FEE], estimates: [TUITION_PG, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in Canada?", "Canada-য় Master's-এ কী লাগে?"),
          [b("A recognised bachelor's degree with the grades the program asks for, an English test score, and the documents each department lists (often references and a statement of purpose). How Canadian universities assess a Bangladeshi CGPA, and whether they accept a three-year degree, was not verified in the pages read — ask the graduate admissions office.", "Program যে নম্বর চায় সেই নম্বরসহ স্বীকৃত bachelor's degree, English test score, আর প্রতিটি department যে document চায় (প্রায়ই reference আর statement of purpose)। Canada-র university Bangladesh-এর CGPA কীভাবে মূল্যায়ন করে, আর তিন বছরের degree গ্রহণ করে কিনা, পড়া page-গুলোতে যাচাই হয়নি — graduate admissions office-কে জিজ্ঞেস করুন।"), CHECK_UNI],
          [CA_UOFT_SGS_ENGLISH],
          { status: 'partly-verified' },
        ),
        qa(
          'pal',
          b("Do master's students need a PAL/TAL?", "Master's student-দের কি PAL/TAL লাগে?"),
          [b("Not if you are in a graduate program at the master's level at a public designated learning institution, starting 1 January 2026: IRCC exempts you, and you upload proof of the exemption instead. Master's students at other institutions may still need one. In Quebec you still need a CAQ.", "১ January 2026 থেকে সরকারি designated learning institution-এর master's পর্যায়ের graduate program-এ থাকলে লাগে না: IRCC ছাড় দেয়, আর এর বদলে ছাড়ের প্রমাণ upload করতে হয়। অন্য প্রতিষ্ঠানের master's student-দের এখনো লাগতে পারে। Quebec-এ CAQ তবুও লাগে।")],
          [CA_PAL, CA_GUIDE_5269],
        ),
      ],
    },
    {
      id: 'language',
      title: b('English and IELTS', 'ইংরেজি আর IELTS'),
      items: [
        qa(
          'english',
          b("How much IELTS do you need for a Master's?", "Master's-এ IELTS কত লাগে?"),
          [b('Example (University of Toronto, School of Graduate Studies): IELTS Academic 7.0 with at least 6.5 in each component; some departments ask for more.', 'উদাহরণ (University of Toronto, School of Graduate Studies): IELTS Academic 7.0, প্রতিটি অংশে অন্তত 6.5; কিছু department আরও বেশি চায়।'), CHECK_UNI],
          [CA_UOFT_SGS_ENGLISH],
        ),
      ],
    },
    {
      id: 'scholarships',
      title: b('Scholarships', 'Scholarship'),
      items: [
        qa(
          'scholarships',
          b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
          [scholarshipsGeneral, b("No Government of Canada scholarship for a full master's degree for Bangladeshi students was found in the official sources read. University and department awards are not verified here — check the program.", "পড়া official source-গুলোতে Bangladesh-এর student-দের জন্য পুরো master's degree-র কোনো Canada সরকারি scholarship পাওয়া যায়নি। University আর department-এর award এখানে যাচাই হয়নি — program দেখুন।")],
          [CA_SICS],
          { status: 'partly-verified' },
        ),
      ],
    },
    { id: 'tuition', title: b('Tuition', 'Tuition'), items: [tuition('tuition', 'graduate')] },
    {
      id: 'pgwp',
      title: b('Post-graduation work permit and family', 'Post-graduation work permit আর পরিবার'),
      items: [
        qa(
          'pgwp-length',
          b("How long a PGWP can a master's graduate get?", "Master's graduate কতদিনের PGWP পেতে পারেন?"),
          [b("Since 15 February 2024, master's degree graduates can apply for a 3-year PGWP even if the program was shorter than 2 years, as long as it lasted at least 8 months (900 hours in Quebec) and all other requirements are met. This does not apply to certificate or diploma programs.", "১৫ February 2024 থেকে master's degree-র graduate-রা program ২ বছরের কম হলেও ৩ বছরের PGWP-র আবেদন করতে পারেন, যদি program অন্তত ৮ মাস (Quebec-এ ৯০০ ঘণ্টা) হয় আর অন্য সব শর্ত পূরণ হয়। Certificate বা diploma program-এ এটা প্রযোজ্য নয়।")],
          [CA_PGWP_ABOUT],
        ),
        qa(
          'family',
          b('Can your spouse work in Canada while you study?', 'আপনি পড়ার সময় spouse কি Canada-য় কাজ করতে পারবেন?'),
          [b("Yes if your master's program is 16 months or longer: since 21 January 2025, the spouse or common-law partner of a student with a valid study permit in such a program may be eligible for an open work permit. It cannot be extended beyond your study permit.", "আপনার master's program ১৬ মাস বা বেশি হলে হ্যাঁ: ২১ January 2025 থেকে এমন program-এ বৈধ study permit-ধারী student-এর spouse বা common-law partner open work permit-এর যোগ্য হতে পারেন। এটা আপনার study permit-এর মেয়াদের বেশি বাড়ানো যায় না।")],
          [CA_SPOUSE],
        ),
      ],
    },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ PhD

const PHD: DegreeGuide = {
  level: 'phd',
  card: b('Research doctorate · CGRS D open to enrolled international students', 'গবেষণা doctorate · ভর্তি international student-দের জন্য CGRS D'),
  intro: b(
    "A Canadian PhD is a research degree; admission and supervision are arranged with the department. Since 1 January 2026, doctoral students at a public designated learning institution do not need a PAL/TAL (a CAQ is still needed in Quebec). Once registered, international doctoral students can compete for the Canada Graduate Research Scholarship – Doctoral (CAD 40,000 a year), and a doctoral student's spouse may get an open work permit.",
    "Canada-র PhD একটি গবেষণা degree; ভর্তি আর supervision department-এর সঙ্গে ঠিক হয়। ১ January 2026 থেকে সরকারি designated learning institution-এর doctoral student-দের PAL/TAL লাগে না (Quebec-এ CAQ তবুও লাগে)। ভর্তি হওয়ার পর international doctoral student-রা Canada Graduate Research Scholarship – Doctoral (বছরে CAD 40,000)-এর প্রতিযোগিতায় অংশ নিতে পারেন, আর doctoral student-এর spouse open work permit পেতে পারেন।",
  ),
  costs: { official: [PERMIT_FEE, BIO_FEE, FUNDS, QC_FUNDS, PGWP_FEE], estimates: [TUITION_PG, ...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'master',
          b('What do you need for a PhD in Canada?', 'Canada-য় PhD-তে কী লাগে?'),
          [
            b('Not verified yet as a general rule: whether a master\'s degree is required, minimum grades, the research statement and supervisor contact are set by each department and university. Read the doctoral program\'s own admissions page and contact the department early.', 'সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: master\'s degree লাগবে কিনা, ন্যূনতম নম্বর, research statement আর supervisor-এর সঙ্গে যোগাযোগ — প্রতিটি department আর university ঠিক করে। Doctoral program-এর নিজের admissions page পড়ুন আর আগেভাগে department-এর সঙ্গে যোগাযোগ করুন।'),
            CHECK_UNI,
          ],
          [CA_UOFT_SGS_ENGLISH],
          { status: 'not-verified' },
        ),
        qa(
          'pal',
          b('Do doctoral students need a PAL/TAL?', 'Doctoral student-দের কি PAL/TAL লাগে?'),
          [b('Not if you are in a graduate program at the doctoral level at a public designated learning institution, starting 1 January 2026: IRCC exempts you, and you upload proof of the exemption instead. In Quebec you still need a CAQ.', '১ January 2026 থেকে সরকারি designated learning institution-এর doctoral পর্যায়ের graduate program-এ থাকলে লাগে না: IRCC ছাড় দেয়, আর এর বদলে ছাড়ের প্রমাণ upload করতে হয়। Quebec-এ CAQ তবুও লাগে।')],
          [CA_PAL],
        ),
      ],
    },
    {
      id: 'funding',
      title: b('Funding and family', 'Funding আর পরিবার'),
      items: [
        qa(
          'cgrsd',
          b('Which government scholarship can a PhD student get?', 'PhD student কোন সরকারি scholarship পেতে পারেন?'),
          [
            b('The Canada Graduate Research Scholarship – Doctoral (CGRS D) is worth CAD 40,000 a year. International applicants must already be registered in their doctoral program at an eligible Canadian institution by the application deadline, and up to 15% of the awards are available to international applicants — so it is not something you can win from Bangladesh before admission.', 'Canada Graduate Research Scholarship – Doctoral (CGRS D)-এর মূল্য বছরে CAD 40,000। International আবেদনকারীদের আবেদনের শেষ তারিখের মধ্যে Canada-র যোগ্য প্রতিষ্ঠানে doctoral program-এ registered থাকতে হবে, আর সর্বোচ্চ ১৫% award international আবেদনকারীদের জন্য — তাই ভর্তির আগে Bangladesh থেকে এটা পাওয়া যায় না।'),
            b('The Vanier Canada Graduate Scholarships no longer accept applications; the program has been replaced by the CGRS D. Posts advertising Vanier for 2026 or later are out of date.', 'Vanier Canada Graduate Scholarships আর আবেদন নেয় না; এর জায়গায় এসেছে CGRS D। 2026 বা পরের জন্য Vanier-এর বিজ্ঞাপন দেওয়া পোস্টগুলো পুরোনো।'),
            b('Department funding packages and teaching or research assistantships are set by each university and are not verified here.', 'Department-এর funding package আর teaching বা research assistantship প্রতিটি university ঠিক করে, এখানে যাচাই হয়নি।'),
          ],
          [CA_CGRSD, CA_VANIER],
          { status: 'partly-verified' },
        ),
        { embed: 'scholarships' as const },
        qa(
          'family',
          b('Can your spouse work in Canada while you study?', 'আপনি পড়ার সময় spouse কি Canada-য় কাজ করতে পারবেন?'),
          [b('Yes: since 21 January 2025, the spouse or common-law partner of a student with a valid study permit in a doctoral degree program may be eligible for an open work permit. It cannot be extended beyond your study permit.', 'হ্যাঁ: ২১ January 2025 থেকে doctoral degree program-এ বৈধ study permit-ধারী student-এর spouse বা common-law partner open work permit-এর যোগ্য হতে পারেন। এটা আপনার study permit-এর মেয়াদের বেশি বাড়ানো যায় না।')],
          [CA_SPOUSE],
        ),
        qa(
          'pgwp-length',
          b('How long a PGWP can a doctoral graduate get?', 'Doctoral graduate কতদিনের PGWP পেতে পারেন?'),
          [b('It follows the length of your program: if it lasted 2 years or more, IRCC may give a PGWP valid for 3 years; if it lasted at least 8 months but less than 2 years, up to the length of the program. It can never run past your passport expiry.', 'এটা program-এর দৈর্ঘ্যের উপর নির্ভর করে: program ২ বছর বা বেশি হলে IRCC ৩ বছরের PGWP দিতে পারে; অন্তত ৮ মাস কিন্তু ২ বছরের কম হলে program-এর দৈর্ঘ্য পর্যন্ত। Passport-এর মেয়াদের বেশি কখনো হয় না।')],
          [CA_PGWP_ABOUT],
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
          [b("Example (University of Toronto, School of Graduate Studies, which covers doctoral programs): IELTS Academic 7.0 with at least 6.5 in each component; some departments ask for more.", "উদাহরণ (University of Toronto-র School of Graduate Studies, যার আওতায় doctoral program-ও): IELTS Academic 7.0, প্রতিটি অংশে অন্তত 6.5; কিছু department আরও বেশি চায়।"), CHECK_UNI],
          [CA_UOFT_SGS_ENGLISH],
        ),
      ],
    },
    { id: 'tuition', title: b('Tuition', 'Tuition'), items: [tuition('tuition', 'graduate')] },
    ...commonTail(),
  ],
};

// ------------------------------------------------------------------ the country

export const CA_GUIDE: CountryGuide = {
  code: 'CA',
  checkedAt: CA_READ,
  sourcesPerSection: true,
  intro: b(
    "Canada offers bachelor's, master's and PhD degrees; the universities in this guide teach in English. You need a letter of acceptance from a designated learning institution, usually a PAL/TAL (or a CAQ in Quebec), proof of CAD 23,448 a year for living in addition to tuition, and a study permit. You can work up to 24 hours a week off campus during terms, and graduates can apply for a post-graduation work permit. This guide is built from current IRCC, Government of Quebec, Statistics Canada, EduCanada, NSERC and university pages.",
    "Canada-য় bachelor's, master's আর PhD পড়া যায়; এই guide-এর university-গুলোতে ইংরেজিতে পড়ানো হয়। Designated learning institution-এর letter of acceptance, সাধারণত PAL/TAL (Quebec-এ CAQ), tuition-এর উপরে থাকার জন্য বছরে CAD 23,448-এর প্রমাণ, আর study permit লাগে। সেমিস্টারে campus-এর বাইরে সপ্তাহে ২৪ ঘণ্টা পর্যন্ত কাজ করা যায়, আর graduate-রা post-graduation work permit-এর আবেদন করতে পারেন। এই guide IRCC, Quebec সরকার, Statistics Canada, EduCanada, NSERC আর university-র বর্তমান page থেকে তৈরি।",
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [CA_FUNDS, CA_PAL, CA_WORK, CA_VANIER, CA_PGWP_ELIG, CA_MEDICAL_LIST],
      {
        kind: 'guidance',
        list: [
          b('Showing an old funds figure — from 1 September 2026 it is CAD 23,448 a year outside Quebec.', 'পুরোনো অঙ্ক দেখানো — ১ September 2026 থেকে Quebec-এর বাইরে বছরে CAD 23,448।'),
          b('Applying without a PAL/TAL or CAQ when your program needs one.', 'Program-এ লাগলেও PAL/TAL বা CAQ ছাড়া আবেদন করা।'),
          b('Working more than 24 hours a week off campus during a term.', 'সেমিস্টারে campus-এর বাইরে সপ্তাহে ২৪ ঘণ্টার বেশি কাজ করা।'),
          b('Planning on Vanier scholarships — the program no longer accepts applications.', 'Vanier scholarship-এর উপর ভরসা করা — এটা আর আবেদন নেয় না।'),
          b('Ignoring the CLB 7 English requirement for the PGWP until after graduation.', 'Graduate হওয়ার পর পর্যন্ত PGWP-র CLB 7 ইংরেজি শর্ত উপেক্ষা করা।'),
          b('Assuming you need no medical exam without checking IRCC\'s current country list.', 'IRCC-র বর্তমান দেশের তালিকা না দেখে ধরে নেওয়া যে medical exam লাগবে না।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in Canada from Bangladesh?", "Bangladesh থেকে Canada-য় Bachelor's পড়তে কী কী লাগে?"), [b('HSC results, an English score, a letter of acceptance from a designated learning institution, a PAL/TAL (or CAQ in Quebec), proof of tuition plus CAD 23,448 a year for living, biometrics and a study permit.', 'HSC-র ফল, English score, designated learning institution-এর letter of acceptance, PAL/TAL (Quebec-এ CAQ), tuition আর থাকার জন্য বছরে CAD 23,448-এর প্রমাণ, biometrics আর study permit।')], [CA_UOFT_COUNTRY, CA_PAL, CA_FUNDS, CA_APPLY]),
    qa('hsc', b("Can you go straight into a Bachelor's after HSC?", "HSC শেষ করে কি সরাসরি Bachelor's-এ যাওয়া যায়?"), [b('Yes at many universities: the University of Toronto and the University of Alberta both accept the Bangladesh Higher Secondary Certificate for undergraduate admission. Each program sets the grades it expects.', 'অনেক university-তে হ্যাঁ: University of Toronto আর University of Alberta দুটোই undergraduate ভর্তিতে Bangladesh-এর Higher Secondary Certificate গ্রহণ করে। প্রতিটি program নিজের প্রত্যাশিত নম্বর ঠিক করে।')], [CA_UOFT_COUNTRY, CA_UALBERTA_BD]),
    qa('cost', b('How much does it cost to study in Canada?', 'Canada-য় পড়াশোনার খরচ কত?'), [b('Statistics Canada\'s 2026/2027 averages (preliminary) are CAD 42,062 a year for international undergraduates and CAD 24,693 for international graduate students, varying a lot by province. In addition to tuition you must show CAD 23,448 a year for living outside Quebec (CAD 24,617 in Quebec). Study permit CAD 150, biometrics CAD 85.', 'Statistics Canada-র 2026/2027-এর গড় (প্রাথমিক): international undergraduate-দের বছরে CAD 42,062, international graduate-দের CAD 24,693, প্রদেশভেদে অনেক আলাদা। Tuition-এর উপরে থাকার জন্য Quebec-এর বাইরে বছরে CAD 23,448 দেখাতে হয় (Quebec-এ CAD 24,617)। Study permit CAD 150, biometrics CAD 85।')], [CA_STATCAN, CA_FUNDS, CA_QC_COSTS, CA_FEES], { status: 'partly-verified', discrepancy: tuitionDiscrepancy }),
    qa('ielts', b('How much IELTS do you need for Canada?', 'Canada-য় IELTS কত লাগে?'), [b('Set by each university. Example (University of Toronto): IELTS Academic 6.5 with no band below 6.0 for undergraduate, and 7.0 with at least 6.5 in each component for graduate study. The study permit sets no score, but the PGWP later needs CLB 7.', 'প্রতিটি university ঠিক করে। উদাহরণ (University of Toronto): undergraduate-এ IELTS Academic 6.5, কোনো band 6.0-এর নিচে নয়; graduate পর্যায়ে 7.0, প্রতিটি অংশে অন্তত 6.5। Study permit-এর কোনো score নেই, তবে পরে PGWP-তে CLB 7 লাগে।')], [CA_UOFT_ENGLISH, CA_UOFT_SGS_ENGLISH, CA_PGWP_ELIG]),
    qa('visa', b('What do you need for the study permit?', 'Study permit-এর জন্য কী কী লাগে?'), [b('A letter of acceptance from a DLI, a PAL/TAL unless you are exempt (CAQ in Quebec), proof of funds, proof of identity, and biometrics. Apply online; the fee is CAD 150 plus CAD 85 for biometrics. A medical exam and police certificates may be requested.', 'DLI-এর letter of acceptance, ছাড় না পেলে PAL/TAL (Quebec-এ CAQ), টাকার প্রমাণ, পরিচয়ের প্রমাণ আর biometrics। Online-এ আবেদন; fee CAD 150, biometrics-এর জন্য আরও CAD 85। Medical exam আর police certificate চাওয়া হতে পারে।')], [CA_APPLY, CA_GUIDE_5269, CA_PAL, CA_FEES]),
    qa('work', b('Can you work while studying in Canada?', 'Canada-য় পড়ার পাশাপাশি কাজ করা যায়?'), [b('If your permit allows it: up to 24 hours a week off campus during regular terms, and unlimited hours during scheduled breaks such as summer and winter holidays.', 'Permit অনুমতি দিলে: নিয়মিত সেমিস্টারে campus-এর বাইরে সপ্তাহে ২৪ ঘণ্টা পর্যন্ত, আর গ্রীষ্ম ও শীতের ছুটির মতো নির্ধারিত ছুটিতে ঘণ্টার সীমা নেই।')], [CA_WORK]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('No Government of Canada scholarship for a full degree for Bangladeshi students before admission was found in the official sources read. The Study in Canada Scholarships (Bangladesh eligible) are short exchanges nominated by Canadian institutions. Doctoral students already registered in Canada can compete for the CGRS D (CAD 40,000 a year); Vanier no longer accepts applications.', 'পড়া official source-গুলোতে ভর্তির আগে Bangladesh-এর student-দের জন্য পুরো degree-র কোনো Canada সরকারি scholarship পাওয়া যায়নি। Study in Canada Scholarships (Bangladesh যোগ্য) হলো Canada-র প্রতিষ্ঠানের মনোনীত স্বল্পমেয়াদি exchange। Canada-য় ইতিমধ্যে registered doctoral student-রা CGRS D (বছরে CAD 40,000)-এর প্রতিযোগিতায় অংশ নিতে পারেন; Vanier আর আবেদন নেয় না।')], [CA_SICS, CA_CGRSD, CA_VANIER], { status: 'partly-verified' }),
    qa('after', b('Can you work in Canada after graduating?', 'পড়া শেষে Canada-য় কাজ করা যায়?'), [b("Through the post-graduation work permit: no field-of-study requirement for bachelor's, master's or doctoral graduates, English at CLB 7, apply within 180 days of graduating, fee CAD 255. Master's graduates can get 3 years after a program of at least 8 months; other programs of 2 years or more also give up to 3 years. It does not promise permanent residence.", "Post-graduation work permit-এর মাধ্যমে: bachelor's, master's বা doctoral graduate-দের বিষয়ের শর্ত নেই, ইংরেজিতে CLB 7, graduate হওয়ার ১৮০ দিনের মধ্যে আবেদন, fee CAD 255। অন্তত ৮ মাসের program শেষে master's graduate-রা ৩ বছর পেতে পারেন; ২ বছর বা বেশি মেয়াদের অন্য program-এও ৩ বছর পর্যন্ত। এটা স্থায়ী বসবাসের নিশ্চয়তা দেয় না।")], [CA_PGWP_ELIG, CA_PGWP_ABOUT, CA_PGWP_APPLY]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('Outside Quebec, for applications from 1 September 2026: CAD 23,448 a year for one person, in addition to tuition and travel (CAD 22,895 for applications between 1 January 2025 and 31 August 2026). Quebec (CAQ): CAD 24,617 a year for one person from 1 January 2026.', 'Quebec-এর বাইরে, ১ September 2026 থেকে আবেদনে: একজনের জন্য বছরে CAD 23,448, tuition আর যাতায়াতের উপরে (১ January 2025 থেকে ৩১ August 2026-এর আবেদনে CAD 22,895)। Quebec (CAQ): ১ January 2026 থেকে একজনের জন্য বছরে CAD 24,617।')], [CA_FUNDS, CA_QC_COSTS], { discrepancy: FUNDS_CHANGE }),
    qa('pal', b('What is a PAL/TAL, and do you need one?', 'PAL/TAL কী, আর আপনার কি লাগবে?'), [b("A provincial or territorial attestation letter confirms your place in a province's study permit allocation. Most undergraduate students need one. Since 1 January 2026, master's and doctoral students at a public designated learning institution are exempt. In Quebec the CAQ serves as the PAL/TAL.", "Provincial বা territorial attestation letter প্রদেশের study permit বরাদ্দে আপনার জায়গা নিশ্চিত করে। বেশিরভাগ undergraduate student-দের লাগে। ১ January 2026 থেকে সরকারি designated learning institution-এর master's আর doctoral student-রা ছাড় পান। Quebec-এ CAQ-ই PAL/TAL-এর কাজ করে।")], [CA_PAL, CA_GUIDE_5269]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before admission (university): passport, certificates and transcripts, an English test, and for a PhD the department\'s research documents. After admission (study permit): letter of acceptance, PAL/TAL or CAQ if required, proof of funds, biometrics, and a medical exam or police certificate if requested.', 'ভর্তির আগে (university): passport, সনদ আর transcript, English test, আর PhD-তে department-এর গবেষণার document। ভর্তির পরে (study permit): letter of acceptance, লাগলে PAL/TAL বা CAQ, টাকার প্রমাণ, biometrics, আর চাইলে medical exam বা police certificate।')], [CA_GUIDE_5269, CA_APPLY, CA_PAL]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b("A recognised bachelor's with the grades the program asks for and a higher English score (University of Toronto graduate studies: IELTS 7.0 with 6.5 in each component). No PAL/TAL at a public institution since 1 January 2026; a 3-year PGWP after a program of at least 8 months.", "Program-এর চাওয়া নম্বরসহ স্বীকৃত bachelor's আর বেশি English score (University of Toronto graduate studies: IELTS 7.0, প্রতিটি অংশে 6.5)। ১ January 2026 থেকে সরকারি প্রতিষ্ঠানে PAL/TAL লাগে না; অন্তত ৮ মাসের program শেষে ৩ বছরের PGWP।")], [CA_UOFT_SGS_ENGLISH, CA_PAL, CA_PGWP_ABOUT]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Admission rules are set by each department (not verified here as a general rule). No PAL/TAL at a public institution since 1 January 2026. Once registered, international doctoral students can compete for the CGRS D (CAD 40,000 a year), and a doctoral student\'s spouse may get an open work permit.', 'ভর্তির নিয়ম প্রতিটি department ঠিক করে (সাধারণ নিয়ম হিসেবে এখানে যাচাই হয়নি)। ১ January 2026 থেকে সরকারি প্রতিষ্ঠানে PAL/TAL লাগে না। Registered হওয়ার পর international doctoral student-রা CGRS D (বছরে CAD 40,000)-এর প্রতিযোগিতায় অংশ নিতে পারেন, আর doctoral student-এর spouse open work permit পেতে পারেন।')], [CA_PAL, CA_CGRSD, CA_SPOUSE], { status: 'partly-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — Dalhousie University, McGill University and the universities of Alberta, British Columbia, Toronto and Waterloo — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — Dalhousie University, McGill University, আর Alberta, British Columbia, Toronto ও Waterloo-র university — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [CA_STATCAN]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: the University of Toronto and the University of Alberta accept the HSC; Bangladesh is on the eligible list of the Study in Canada Scholarships (short exchanges nominated by Canadian institutions). Where Bangladeshi applicants give biometrics, whether Bangladesh needs a medical exam on IRCC\'s current list, and current processing times: not verified yet — check IRCC\'s VAC finder, medical exam list and processing-time tool.', 'Bangladesh-এর জন্য যাচাই করা: University of Toronto আর University of Alberta HSC গ্রহণ করে; Study in Canada Scholarships-এর (Canada-র প্রতিষ্ঠানের মনোনীত স্বল্পমেয়াদি exchange) যোগ্য তালিকায় Bangladesh আছে। Bangladesh-এর আবেদনকারীরা কোথায় biometrics দেন, IRCC-র বর্তমান তালিকায় Bangladesh-এর medical exam লাগে কিনা, আর বর্তমান processing time: এখনো যাচাই হয়নি — IRCC-র VAC finder, medical exam-এর তালিকা আর processing-time tool দেখুন।'),
    ], [CA_UOFT_COUNTRY, CA_UALBERTA_BD, CA_SICS, CA_VAC, CA_MEDICAL_LIST]),
  ],
  life: [
    qa('health-care', b('How does healthcare work?', 'চিকিৎসা ব্যবস্থা কেমন?'), [b('Not verified yet: health coverage for international students depends on the province and the university\'s plan, and was not verified in the official sources read. Check your university\'s international student health insurance page before you arrive.', 'এখনো যাচাই হয়নি: international student-দের স্বাস্থ্য সুরক্ষা প্রদেশ আর university-র plan-এর উপর নির্ভর করে, পড়া official source-গুলোতে যাচাই হয়নি। পৌঁছানোর আগে আপনার university-র international student health insurance page দেখুন।')], [CA_APPLY], { status: 'not-verified' }),
  ],
  documents: CA_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'estimate', status: 'partly-verified', value: { min: 24693, max: 42062, unit: 'CAD/year', text: b('Statistics Canada 2026/2027 averages (preliminary): about CAD 42,062 (international undergraduate) and CAD 24,693 (international graduate) a year; varies by province.', 'Statistics Canada-র 2026/2027-এর গড় (প্রাথমিক): বছরে প্রায় CAD 42,062 (international undergraduate) আর CAD 24,693 (international graduate); প্রদেশভেদে আলাদা।') }, source: CA_STATCAN },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 23448, unit: 'CAD/year', text: b('CAD 23,448 a year for one person outside Quebec (applications from 1 September 2026), plus tuition and travel; Quebec CAQ: CAD 24,617.', 'Quebec-এর বাইরে একজনের জন্য বছরে CAD 23,448 (১ September 2026 থেকে আবেদনে), সঙ্গে tuition আর যাতায়াত; Quebec CAQ: CAD 24,617।') }, source: CA_FUNDS },
    { id: 'living-cost', kind: 'estimate', status: 'partly-verified', value: { min: 23448, unit: 'CAD/year', text: b('The official minimum is CAD 23,448 a year outside Quebec; real costs depend on the city and are not verified.', 'Quebec-এর বাইরে official minimum বছরে CAD 23,448; আসল খরচ শহরের উপর নির্ভর করে, যাচাই হয়নি।') }, source: CA_FUNDS },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { max: 24, unit: 'hours/week', text: b('Up to 24 hours a week off campus during terms; unlimited during scheduled breaks.', 'সেমিস্টারে campus-এর বাইরে সপ্তাহে ২৪ ঘণ্টা পর্যন্ত; নির্ধারিত ছুটিতে সীমা নেই।') }, source: CA_WORK },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { max: 36, unit: 'months', text: b('Post-graduation work permit up to 3 years, depending on the program (3 years for master\'s programs of at least 8 months).', 'Program অনুযায়ী post-graduation work permit সর্বোচ্চ ৩ বছর (অন্তত ৮ মাসের master\'s program-এ ৩ বছর)।') }, source: CA_PGWP_ABOUT },
    { id: 'english-programs', kind: 'fact', status: 'verified', value: { unit: 'programs', text: b('The universities in this guide teach in English; each university sets its IELTS score.', 'এই guide-এর university-গুলোতে ইংরেজিতে পড়ানো হয়; প্রতিটি university নিজের IELTS score ঠিক করে।') }, source: CA_UOFT_ENGLISH },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 150, unit: 'CAD', text: b('Study permit CAD 150, plus biometrics CAD 85.', 'Study permit CAD 150, সঙ্গে biometrics CAD 85।') }, source: CA_FEES },
  ],
};

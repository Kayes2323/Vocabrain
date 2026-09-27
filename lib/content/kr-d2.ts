import type { DocumentKind, DocumentRequirement, SourceRef, VisaCategory, WorkRule } from '@/lib/models';
import { KR_EASYLAW_INSURANCE, KR_EASYLAW_VISA, KR_EASYLAW_WORK, KR_EMBASSY_BD_VISA, KR_KIS_NAVIGATOR, KR_SIK_VISA, KR_SIK_WORK, krFact } from './kr-sources';

/** A D-2 visa document: the official wording, submitted with the visa application. */
function doc(kind: DocumentKind, requirement: string, source: SourceRef): DocumentRequirement {
  return {
    kind,
    purpose: 'visa',
    requirement: krFact(requirement, source, 'medium'),
    submittedTo: { en: 'Korean embassy or consulate (visa application)', bn: 'Korean embassy বা consulate (visa application)' },
    appliesTo: { visaCategoryIds: ['kr-d2'] },
  };
}

/**
 * South Korea D-2 (Student), Phase C1.2: only what an official source states,
 * each fact with its source and dates. A part with no fact shows
 * "Not verified yet"; nothing here is inferred or converted.
 */
export const KR_D2: VisaCategory = {
  id: 'kr-d2',
  code: 'D-2',
  name: { en: 'D-2 visa', bn: 'D-2 visa' },
  // Official name as the Korea Immigration Service writes it.
  officialName: krFact('D-2 (Student)', KR_KIS_NAVIGATOR, 'high', { notes: 'Visa Navigator Ver 2023.05. Study in Korea words it slightly differently.' }),
  pathwayIds: ['degree'],
  links: [KR_SIK_VISA, KR_KIS_NAVIGATOR],
  parts: {
    // 01 · What D-2 is
    type: {
      facts: [
        { label: { en: 'Who it is for', bn: 'কার জন্য' }, fact: krFact('International students enrolling in degree programs.', KR_SIK_VISA, 'medium') },
        {
          label: { en: 'Official scope', bn: 'Official scope' },
          fact: krFact(
            "International students pursuing associate, bachelor's, master's or doctoral degrees, or enrolled in a research course; also exchange, work-learning and visiting students.",
            KR_KIS_NAVIGATOR,
            'high',
            { notes: 'Visa Navigator Ver 2023.05.' },
          ),
        },
      ],
      explanation: {
        en: 'D-2 is the student visa for a full degree at a Korean university. Your degree decides the D-2 type (for example D-2-3 for a master’s).',
        bn: 'D-2 হলো Korea-র university-তে পুরো degree পড়ার student visa। তোমার degree অনুযায়ী D-2-এর ধরন ঠিক হয় (যেমন master’s হলে D-2-3)।',
      },
      blocks: [
        {
          id: 'kr-d2-subtypes',
          title: { en: 'D-2 types for degree study', bn: 'Degree-র জন্য D-2-র ধরন' },
          facts: [
            {
              label: { en: "Bachelor's", bn: "Bachelor's" },
              fact: krFact("D-2-2 Bachelor's", KR_SIK_VISA, 'medium', { applicableDegree: 'bachelors', notes: 'Also listed by Easylaw (Ministry of Government Legislation).' }),
              appliesTo: { degreeLevels: ['bachelors'] },
            },
            {
              label: { en: "Master's", bn: "Master's" },
              fact: krFact("D-2-3 Master's", KR_SIK_VISA, 'medium', { applicableDegree: 'masters', notes: 'Also listed by Easylaw (Ministry of Government Legislation).' }),
              appliesTo: { degreeLevels: ['masters'] },
            },
            {
              label: { en: 'PhD', bn: 'PhD' },
              fact: krFact('D-2-4 Doctoral', KR_SIK_VISA, 'medium', { applicableDegree: 'phd', notes: 'Also listed by Easylaw (Ministry of Government Legislation).' }),
              appliesTo: { degreeLevels: ['phd'] },
            },
            {
              label: { en: 'Other D-2 types', bn: 'D-2-র অন্য ধরন' },
              fact: krFact('D-2-1 Associate degree, D-2-5 Research, D-2-6 Exchange student, D-2-7 Work-learning linked study, D-2-8 Visiting student', KR_EASYLAW_VISA, 'medium'),
            },
          ],
        },
      ],
    },
    // 02 · Who can apply
    eligibility: {
      facts: [
        {
          label: { en: 'Who qualifies (law)', bn: 'কে পারবে (আইন অনুযায়ী)' },
          fact: krFact(
            'A person who wants to receive regular education at a junior college or higher educational institution or an academic research institution, or to do specific research.',
            KR_EASYLAW_VISA,
            'medium',
            { notes: 'Immigration Act Enforcement Decree, Annex 1-2. Easylaw information as of 2026-08-15.' },
          ),
        },
      ],
      explanation: {
        en: 'In short: get admitted to a degree program first, then apply. The review checks your passport, your purpose and that you will go home when your stay ends.',
        bn: 'সহজ কথায়: আগে degree program-এ admission নাও, তারপর apply করো। Review-তে তোমার passport, আসার উদ্দেশ্য আর মেয়াদ শেষে দেশে ফেরার বিষয়টা দেখা হয়।',
      },
    },
    // 03 · Documents (general Korea requirement; Bangladesh-specific ones are kept apart, not verified yet)
    documents: {
      facts: [
        {
          label: { en: 'Required by law', bn: 'আইনে যা লাগে' },
          fact: krFact(
            'Passport and a copy of it; a standard admission letter issued by the university president or dean that includes the review of your academic ability and financial ability; and a tuberculosis certificate from a hospital designated by the Korean mission, only where the Minister of Justice requires it (e.g. nationals of high-risk tuberculosis countries staying more than 90 days).',
            KR_EASYLAW_VISA,
            'medium',
            { notes: 'Enforcement Rule of the Immigration Act, Article 76 and Annex 5. Easylaw information as of 2026-08-15.' },
          ),
        },
      ],
      explanation: {
        en: 'These are the documents Korea asks for in general. The Korean mission can ask for more depending on your program and your country, so check the Bangladesh-specific list before you apply.',
        bn: 'এগুলো Korea-র সাধারণ document list। Program আর দেশ অনুযায়ী Korean mission আরও কিছু চাইতে পারে, তাই apply-এর আগে Bangladesh-এর আলাদা list দেখে নাও।',
      },
      blocks: [
        {
          id: 'kr-d2-documents-list',
          title: { en: 'D-2 document list (Study in Korea)', bn: 'D-2 document list (Study in Korea)' },
          facts: [
            ['Passport', 'পাসপোর্ট', 'Copy of passport'],
            ['Photo', 'ছবি', 'One photo (passport-size, taken within the last 6 months)'],
            ["University's registration", 'University-র registration', 'Copy of the business registration certificate (or certificate of registration number) of the educational institution'],
            ['Admission letter', 'Admission letter', 'Standard admission letter (issued by the university president or dean)'],
            ['Tuberculosis test', 'Tuberculosis test', 'Tuberculosis test result (if applicable)'],
            ['Family relationship', 'পারিবারিক সম্পর্ক', "Documents proving family relationship (only if parents' bank statements are submitted)"],
            ['Education', 'শিক্ষাগত যোগ্যতা', 'Proof of highest education level'],
            ['Finances', 'আর্থিক সামর্থ্য', 'Proof of financial ability'],
          ].map(([en, bn, value]) => ({ label: { en, bn }, fact: krFact(value, KR_SIK_VISA, 'medium') })),
        },
      ],
    },
    // 04 · Money to show. No official amount was found, so none is shown (never estimated or converted).
    finances: {
      facts: [
        {
          label: { en: 'What is required', bn: 'যা লাগে' },
          fact: krFact('Proof of financial ability.', KR_SIK_VISA, 'medium'),
        },
        {
          label: { en: 'Who checks it', bn: 'কে যাচাই করে' },
          fact: krFact(
            "For regular degree courses, the standard admission letter issued by the university president or dean includes the review of the student's financial ability.",
            KR_EASYLAW_VISA,
            'medium',
            { notes: 'Enforcement Rule of the Immigration Act, Annex 5. Easylaw information as of 2026-08-15.' },
          ),
        },
        {
          label: { en: "Parents' bank statements", bn: 'বাবা-মায়ের bank statement' },
          fact: krFact("If your parents' bank statements are submitted, documents proving the family relationship are also needed.", KR_SIK_VISA, 'medium'),
        },
      ],
      explanation: {
        en: 'This is the official proof the visa asks for. It is not your full study budget, and the official amount is not verified yet: ask your university and the Korean embassy for the exact figure.',
        bn: 'এটা visa-র জন্য দরকারি official প্রমাণ। এটা তোমার পুরো পড়াশোনার budget নয়, আর official amount এখনো verified নয়। সঠিক অঙ্ক university আর Korean embassy থেকে জেনে নাও।',
      },
      blocks: [
        {
          id: 'kr-d2-funds-amount',
          title: { en: 'Official amount', bn: 'Official amount' },
          guidance: {
            en: 'Official amount not verified yet. No official source we checked states one amount for D-2; we never estimate or convert it.',
            bn: 'Official amount এখনো verified নয়। আমরা যে official source দেখেছি, তার কোনোটাতে D-2-এর জন্য একটা নির্দিষ্ট অঙ্ক নেই; আমরা নিজে থেকে অনুমান বা convert করি না।',
          },
          links: [KR_SIK_VISA, KR_EMBASSY_BD_VISA],
        },
      ],
    },
    // 13 · Health insurance
    insurance: {
      facts: [
        {
          label: { en: 'National Health Insurance', bn: 'National Health Insurance' },
          fact: krFact(
            'D-2 students become members of the National Health Insurance from the date of alien registration (on first entry), or from the date of re-entry if they re-enter after registering.',
            KR_EASYLAW_INSURANCE,
            'medium',
            { notes: 'National Health Insurance Act, Article 109. Some exceptions apply (see the source). Easylaw information as of 2026-08-15.' },
          ),
        },
      ],
    },
    // 16 · Length of stay & extension
    stay: {
      facts: [
        {
          label: { en: 'Stay per grant', bn: 'প্রতিবার কত দিন' },
          fact: krFact('Up to 2 years per grant of stay (extendable).', KR_KIS_NAVIGATOR, 'high', {
            notes: 'Visa Navigator Ver 2023.05 ("2 years (Extendable)"); Easylaw gives the same 2-year upper limit (Immigration Act Enforcement Rule, Article 18-3, Annex 1).',
          }),
        },
      ],
      blocks: [
        {
          id: 'kr-d2-stay-limits',
          title: { en: 'Total stay limit by degree (Study in Korea)', bn: 'Degree অনুযায়ী মোট থাকার সীমা (Study in Korea)' },
          facts: [
            {
              label: { en: "Bachelor's", bn: "Bachelor's" },
              fact: krFact('Up to 6 years after admission (up to 7 years for 5-year programs).', KR_SIK_VISA, 'medium', { status: 'partly-verified', applicableDegree: 'bachelors', notes: 'One official source only; not yet confirmed by the Korea Immigration Service.' }),
              appliesTo: { degreeLevels: ['bachelors'] },
            },
            {
              label: { en: "Master's", bn: "Master's" },
              fact: krFact('Up to 5 years after admission (up to 6 years for 3-year programs).', KR_SIK_VISA, 'medium', { status: 'partly-verified', applicableDegree: 'masters', notes: 'One official source only; not yet confirmed by the Korea Immigration Service.' }),
              appliesTo: { degreeLevels: ['masters'] },
            },
            {
              label: { en: 'PhD', bn: 'PhD' },
              fact: krFact('Up to 8 years after admission (the source also says "up to 7 years for 5-year programs").', KR_SIK_VISA, 'medium', {
                status: 'needs-review',
                applicableDegree: 'phd',
                notes: 'The source text looks inconsistent (a longer program gets a shorter limit); re-check with the Korea Immigration Service before relying on it.',
              }),
              appliesTo: { degreeLevels: ['phd'] },
            },
          ],
        },
      ],
    },
    // 14 · Work: the general conditions here; hours come from the conditional rules below.
    work: {
      facts: [
        {
          label: { en: 'Which D-2 students', bn: 'কোন D-2 student' },
          fact: krFact(
            'D-2-1 to D-2-4, D-2-6 and D-2-7 students can be permitted right away. Students given an exceptional stay after their course period ended (for example, missing credits) are excluded.',
            KR_EASYLAW_WORK,
            'medium',
          ),
        },
        {
          label: { en: 'Graduate students below TOPIK 4 at a certified university', bn: 'TOPIK 4-এর নিচে graduate student, certified university-তে' },
          fact: krFact(
            'The official sources differ: Easylaw (Ministry of Government Legislation, as of 2026-08-15) shows 15 hours a week; Study in Korea (NIIED) shows 10 hours a week on weekdays.',
            KR_EASYLAW_WORK,
            'medium',
            { status: 'needs-review', applicableDegree: 'masters, phd', notes: 'Source conflict, not resolved: ask the immigration office (1345) before relying on either value.' },
          ),
          appliesTo: { degreeLevels: ['masters', 'phd'] },
        },
      ],
      links: [KR_EASYLAW_WORK, KR_SIK_WORK],
      explanation: {
        en: 'Your weekly hours depend on your degree, your year and your Korean level. Answer the questions below to see the rule that fits you; you still need the permission before you start.',
        bn: 'সপ্তাহে কত ঘণ্টা কাজ করা যাবে, তা তোমার degree, বর্ষ আর Korean level-এর উপর নির্ভর করে। নিচের প্রশ্নগুলোর উত্তর দাও; কাজ শুরুর আগে permission লাগবেই।',
      },
    },
  },
  // One entry per document kind: the roadmap, the documents page and the visa page all read these.
  documents: [
    // Passport, photo, admission letter and proof of funds are shared with D-4 (country level, kr-shared.ts).
    doc('certificate', 'Proof of highest education level', KR_SIK_VISA),
  ],
};

// ---------------------------------------------------------------- D-2 part-time hours (conditional)
// Weekly hours by degree, year and Korean level (Ministry of Justice table, in force since July 2023), as
// published by Easylaw and Study in Korea. The profile's TOPIK answer feeds "korean"; the rule text
// names the equivalent Social Integration Program / King Sejong Institute levels the profile doesn't hold.
const TOPIK = (from: number) => [3, 4, 5, 6].filter((n) => n >= from).map((n) => `topik-${n}`);
const BELOW = (level: number) => ['none', 'beginner', ...[1, 2, 3].filter((n) => n < level).map((n) => `topik-${n}`)];
const hours = (value: string, opts: Parameters<typeof krFact>[3] = {}) =>
  krFact(value, KR_EASYLAW_WORK, 'medium', { notes: 'Study in Korea (NIIED) shows the same table.', ...opts });
const MET_UG = 'Weekdays: up to 25 hours a week. Weekends and vacations: no hour limit. Up to 30 weekday hours at a certified university or with excellent grades or Korean.';

export const KR_D2_WORK_RULES: WorkRule[] = [
  {
    id: 'kr-d2-ug12-met',
    conditions: { pathway: ['degree'], degreeLevel: ['bachelors'], yearOfStudy: ['1-2'], korean: TOPIK(3) },
    outcome: hours(MET_UG),
  },
  {
    id: 'kr-d2-ug12-below',
    conditions: { pathway: ['degree'], degreeLevel: ['bachelors'], yearOfStudy: ['1-2'], korean: BELOW(3) },
    outcome: hours('Up to 10 hours a week (without TOPIK 3 or the equivalent Social Integration Program level 3 / King Sejong Institute Intermediate 1).'),
  },
  {
    id: 'kr-d2-ug34-met',
    conditions: { pathway: ['degree'], degreeLevel: ['bachelors'], yearOfStudy: ['3-4'], korean: TOPIK(4) },
    outcome: hours(MET_UG),
  },
  {
    id: 'kr-d2-ug34-below',
    conditions: { pathway: ['degree'], degreeLevel: ['bachelors'], yearOfStudy: ['3-4'], korean: BELOW(4) },
    outcome: hours('Up to 10 hours a week (without TOPIK 4 or the equivalent Social Integration Program level 4 / King Sejong Institute Intermediate 2).'),
  },
  {
    id: 'kr-d2-grad-met',
    conditions: { pathway: ['degree'], degreeLevel: ['masters', 'phd'], korean: TOPIK(4) },
    outcome: hours('Weekdays: up to 30 hours a week. Weekends and vacations: no hour limit. Up to 35 weekday hours at a certified university or with excellent grades or Korean.'),
  },
  {
    id: 'kr-d2-grad-below',
    conditions: { pathway: ['degree'], degreeLevel: ['masters', 'phd'], korean: BELOW(4) },
    // C1.3 re-read of both tables (HTML cell spans): 15 hours covers weekdays AND weekends/vacations in both.
    outcome: hours('Up to 15 hours a week, on weekdays and on weekends and vacations alike (without TOPIK 4 or the equivalent Social Integration Program level 4 / King Sejong Institute Intermediate 2).', {
      notes: 'Easylaw (15 hours across all columns) and Study in Korea (15 hours across weekdays and weekends/vacations) agree. Only the certified-university column differs; see the work part.',
    }),
  },
];

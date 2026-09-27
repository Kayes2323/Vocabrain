import type { DocumentKind, DocumentRequirement, SourceRef, VisaCategory, WorkRule } from '@/lib/models';
import { KR_EASYLAW_GUIDE_PDF, KR_EASYLAW_INSURANCE, KR_EASYLAW_VISA, KR_EASYLAW_WORK, KR_KIS_NAVIGATOR, KR_NIIED_GUIDEBOOK, KR_SIK_VISA, KR_SIK_WORK, krFact } from './kr-sources';

// C2.2 · The undated NIIED guidebook (rules cited to Nov 2023) is older than the live Study in Korea page, which
// names no amount → anything only it states must be re-checked with the Embassy / Visa Application Center.
const GUIDEBOOK_ONLY = {
  status: 'needs-review' as const,
  notes: 'From the Study in Korea guidebook (undated; rules cited to Nov 2023), quoting the Korea Immigration Service. The current Study in Korea visa page (checked 2026-09-27) names no amount.',
};

/** A D-4 visa document: the official wording, submitted with the visa application. */
function doc(kind: DocumentKind, requirement: string, source: SourceRef): DocumentRequirement {
  return {
    kind,
    purpose: 'visa',
    requirement: krFact(requirement, source, 'medium'),
    submittedTo: { en: 'Korean embassy or consulate (visa application)', bn: 'Korean embassy বা consulate (visa application)' },
    appliesTo: { visaCategoryIds: ['kr-d4'] },
  };
}

/**
 * South Korea D-4 (General Trainee), Phase C1.3. The "language" pathway is
 * Korean language training (D-4-1); facts that name another D-4 type say so.
 * Parts shared with D-2 (application, VAC, fees, Bangladesh…) are country level.
 */
export const KR_D4: VisaCategory = {
  id: 'kr-d4',
  code: 'D-4',
  name: { en: 'D-4 visa', bn: 'D-4 visa' },
  // Official name as the Korea Immigration Service writes it.
  officialName: krFact('D-4 (General Trainee)', KR_KIS_NAVIGATOR, 'high', { notes: 'Visa Navigator Ver 2023.05. Study in Korea words it slightly differently.' }),
  pathwayIds: ['language'],
  links: [KR_SIK_VISA, KR_KIS_NAVIGATOR],
  parts: {
    // 01 · What D-4 is
    type: {
      facts: [
        { label: { en: 'Who it is for', bn: 'কার জন্য' }, fact: krFact('International students enrolling in non-degree programs (training).', KR_SIK_VISA, 'medium') },
        {
          label: { en: 'Official scope', bn: 'Official scope' },
          fact: krFact(
            'Persons receiving training at university-affiliated language institutes or private educational institutions; this includes Korean language trainees.',
            KR_KIS_NAVIGATOR,
            'high',
            { notes: 'Visa Navigator Ver 2023.05.' },
          ),
        },
      ],
      explanation: {
        en: 'D-4 is the visa for training that is not a degree. Korean language study at a university language institute is D-4-1.',
        bn: 'D-4 হলো degree ছাড়া training-এর visa। University-র language institute-এ Korean ভাষা শেখা হলো D-4-1।',
      },
      blocks: [
        {
          id: 'kr-d4-subtypes',
          title: { en: 'D-4 type for Korean language study', bn: 'Korean ভাষা শেখার জন্য D-4-র ধরন' },
          facts: [
            {
              label: { en: 'Korean language training', bn: 'Korean language training' },
              fact: krFact('D-4-1 Korean Language Training', KR_SIK_VISA, 'medium', { notes: 'Also listed by Easylaw (Ministry of Government Legislation).' }),
            },
            {
              label: { en: 'Other D-4 types', bn: 'D-4-র অন্য ধরন' },
              fact: krFact(
                'Easylaw lists D-4-2 general training, D-4-3 primary/middle/high school study, D-4-5 Korean cooking training, D-4-6 training at an excellent private institution and D-4-7 foreign language training.',
                KR_EASYLAW_VISA,
                'medium',
                { status: 'needs-review', notes: 'Source conflict: Study in Korea names D-4-2 "Foreign Language Training", Easylaw names D-4-2 "general training" and D-4-7 "foreign language training".' },
              ),
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
            'A person who wants to receive education or training, or do research, at an educational institution, company or organisation meeting the requirements set by the Minister of Justice — not someone paid more than living expenses by the training institution, or someone who qualifies for Study (D-2) or Technical Training (D-3) status.',
            KR_EASYLAW_VISA,
            'medium',
            { notes: 'Immigration Act Enforcement Decree, Annex 1-2. Study in Korea states the same exclusion for compensation above living expenses.' },
          ),
        },
      ],
    },
    // 03 · Documents (general Korea requirement; the Bangladesh list is country level)
    documents: {
      facts: [
        {
          label: { en: 'Required by law (D-4-1, D-4-7)', bn: 'আইনে যা লাগে (D-4-1, D-4-7)' },
          fact: krFact(
            'Passport and a copy of it; proof of admission or enrolment; documents proving your finances (or an inter-university academic exchange agreement); a letter of guarantee only if you cannot prove you can pay for tuition and your stay, or if the Minister of Justice requires it; and a tuberculosis certificate where the Minister of Justice requires it.',
            KR_EASYLAW_GUIDE_PDF,
            'medium',
            { notes: 'Enforcement Rule of the Immigration Act, Article 76 and Annex 5. Easylaw information as of 2026-08-15.' },
          ),
        },
      ],
      blocks: [
        {
          id: 'kr-d4-documents-list',
          title: { en: 'D-4 document list (Study in Korea)', bn: 'D-4 document list (Study in Korea)' },
          facts: [
            ['Passport', 'পাসপোর্ট', 'Copy of passport'],
            ['Photo', 'ছবি', 'One photo (passport-size, taken within the last 6 months)'],
            ["Institution's registration", 'Institution-এর registration', 'Copy of the business registration certificate (or certificate of registration number) of the educational institution'],
            ['Admission letter', 'Admission letter', 'Standard admission letter (issued by the university president or dean)'],
            ['Education', 'শিক্ষাগত যোগ্যতা', 'Certificate of enrollment or proof of highest education level'],
            ['Finances', 'আর্থিক সামর্থ্য', 'Proof of financial ability'],
            ['Training plan', 'Training plan', 'Training plan'],
          ].map(([en, bn, value]) => ({ label: { en, bn }, fact: krFact(value, KR_SIK_VISA, 'medium') })),
        },
      ],
    },
    // 04 · Money to show: no official amount found (never estimated or converted).
    finances: {
      facts: [
        { label: { en: 'What is required', bn: 'যা লাগে' }, fact: krFact('Proof of financial ability.', KR_SIK_VISA, 'medium') },
        {
          label: { en: 'Guarantee letter', bn: 'Guarantee letter' },
          fact: krFact(
            'For D-4-1 and D-4-7, a letter of guarantee is needed only if you cannot prove you can pay for tuition and your stay, or if the Minister of Justice requires it.',
            KR_EASYLAW_GUIDE_PDF,
            'medium',
          ),
        },
      ],
      explanation: {
        en: 'This is the official proof the visa asks for, not your full budget. The amount below comes from an older official guidebook: confirm the current amount with the Korean Embassy or the Visa Application Center before you get your bank certificate.',
        bn: 'এটা visa-র জন্য দরকারি official প্রমাণ, আপনার পুরো budget নয়। নিচের অঙ্কটি একটি পুরনো official guidebook থেকে নেওয়া: bank certificate নেওয়ার আগে Korean Embassy বা Visa Application Center থেকে বর্তমান অঙ্কটি নিশ্চিত করুন।',
      },
      blocks: [
        {
          id: 'kr-d4-funds-amount',
          title: { en: 'Amount and bank certificate (Korean language training, D-4-1)', bn: 'অঙ্ক ও bank certificate (Korean language training, D-4-1)' },
          facts: [
            {
              label: { en: 'Amount', bn: 'অঙ্ক' },
              fact: krFact('Financial proof equivalent to 10 million KRW: in principle, tuition plus living expenses for one year (for 6 months of language training).', KR_NIIED_GUIDEBOOK, 'medium', GUIDEBOOK_ONLY),
            },
            {
              label: { en: 'Which documents', bn: 'কোন document' },
              fact: krFact('A balance certificate, bankbook, scholarship certificate or transaction records, in principle as originals (or a copy stamped as identical to the original).', KR_NIIED_GUIDEBOOK, 'medium', GUIDEBOOK_ONLY),
            },
            {
              label: { en: 'Balance certificate date', bn: 'Balance certificate-এর তারিখ' },
              fact: krFact('A balance certificate counts only if it was issued within 30 days.', KR_NIIED_GUIDEBOOK, 'medium', GUIDEBOOK_ONLY),
            },
            {
              label: { en: "Parents' account", bn: 'বাবা-মায়ের account' },
              fact: krFact("If the balance certificate is in a parent's name, also submit a family relationship certificate.", KR_NIIED_GUIDEBOOK, 'medium', GUIDEBOOK_ONLY),
            },
          ],
          links: [KR_SIK_VISA],
        },
      ],
    },
    // 14 · Work: when D-4 students may apply; hours come from the conditional rules below.
    work: {
      facts: [
        {
          label: { en: 'After 6 months (D-4-1, D-4-7)', bn: '৬ মাস পরে (D-4-1, D-4-7)' },
          fact: krFact(
            'Korean language trainees (D-4-1) and foreign language trainees (D-4-7) can get part-time work permission only after 6 months from entry (or from the change of status).',
            KR_KIS_NAVIGATOR,
            'high',
            { notes: 'Visa Navigator Ver 2023.05 (language training D-4: at least 6 months since entry or change); Easylaw (as of 2026-08-15) says the same for D-4-1 and D-4-7.' },
          ),
        },
      ],
      links: [KR_SIK_WORK, KR_EASYLAW_WORK],
      explanation: {
        en: 'Your weekly hours depend on how long you have been in Korea and your Korean level. Answer the questions below; you still need the permission before you start.',
        bn: 'সপ্তাহে কত ঘণ্টা কাজ করা যাবে, তা Korea-তে কত দিন আছেন আর আপনার Korean level-এর উপর নির্ভর করে। নিচের প্রশ্নের উত্তর দিন; কাজ শুরুর আগে permission লাগবেই।',
      },
    },
    // 13 · Health insurance
    insurance: {
      facts: [
        {
          label: { en: 'National Health Insurance', bn: 'National Health Insurance' },
          fact: krFact('D-4 trainees (other than elementary, middle and high school students, D-4-3) join the National Health Insurance six months after the date of entry.', KR_EASYLAW_INSURANCE, 'medium', {
            notes: 'Easylaw information as of 2026-08-15. The Study in Korea guidebook says the same.',
          }),
        },
        {
          label: { en: 'Premium', bn: 'Premium' },
          fact: krFact('Students on D-2 or D-4 pay 50% of the monthly premium (from March 2023 onward).', KR_EASYLAW_INSURANCE, 'medium', {
            notes: 'Standards for health insurance of long-term residents, Article 6. Easylaw information as of 2026-08-15.',
          }),
        },
      ],
      explanation: {
        en: 'For your first six months in Korea you are not yet in the national scheme, so ask your language institute how you are covered during that time.',
        bn: 'Korea-তে প্রথম ছয় মাস আপনি জাতীয় insurance-এ থাকবেন না — এই সময়ে কীভাবে cover পাবেন, তা আপনার language institute-কে জিজ্ঞেস করুন।',
      },
    },
    // 16 · Length of stay
    stay: {
      facts: [
        {
          label: { en: 'Stay per grant', bn: 'প্রতিবার কত দিন' },
          fact: krFact('Up to 2 years per grant of stay (extendable).', KR_KIS_NAVIGATOR, 'high', {
            notes: 'Visa Navigator Ver 2023.05 ("2 years (Extendable)"); Easylaw gives the same 2-year upper limit.',
          }),
        },
        {
          label: { en: 'Moving on to a degree', bn: 'পরে degree পড়তে গেলে' },
          fact: krFact('After finishing a Korean language course, moving on to a higher educational institution in Korea requires changing your status of stay to D-2.', KR_EASYLAW_GUIDE_PDF, 'medium'),
        },
      ],
    },
  },
  // Passport, photo, admission letter and proof of funds are shared with D-2 (country level).
  documents: [
    doc('certificate', 'Certificate of enrollment or proof of highest education level', KR_SIK_VISA),
    doc('visa-specific', 'Training plan', KR_SIK_VISA),
  ],
};

// ---------------------------------------------------------------- D-4 part-time hours (conditional)
// Language-training row of the Ministry of Justice table as published by Study in Korea (Easylaw's
// table has no language-training row → one source only → partly verified). Separate from the D-2 rules.
const D4_MET = ['topik-2', 'topik-3', 'topik-4', 'topik-5', 'topik-6'];
const D4_BELOW = ['none', 'beginner', 'topik-1'];
const d4 = (value: string) =>
  krFact(value, KR_SIK_WORK, 'medium', { status: 'partly-verified', notes: 'Study in Korea table (language training row); not found in the Easylaw table. Re-check with the immigration office.' });

export const KR_D4_WORK_RULES: WorkRule[] = [
  {
    id: 'kr-d4-under-6-months',
    conditions: { pathway: ['language'], stayMonths: ['under-6'] },
    outcome: krFact('Not yet: D-4-1 language trainees can get part-time work permission only after 6 months in Korea (from entry or change of status).', KR_KIS_NAVIGATOR, 'high', {
      notes: 'Visa Navigator Ver 2023.05; Easylaw says the same.',
    }),
  },
  {
    id: 'kr-d4-met',
    conditions: { pathway: ['language'], stayMonths: ['6-plus'], korean: D4_MET },
    outcome: d4('Up to 20 hours a week, on weekdays and on weekends and vacations alike; up to 25 hours at a certified institution or with excellent grades or Korean.'),
  },
  {
    id: 'kr-d4-below',
    conditions: { pathway: ['language'], stayMonths: ['6-plus'], korean: D4_BELOW },
    outcome: d4('Up to 10 hours a week (without TOPIK 2 or the equivalent Social Integration Program level 2 / King Sejong Institute Intermediate 1).'),
  },
];

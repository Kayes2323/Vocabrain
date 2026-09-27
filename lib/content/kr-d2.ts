import type { DocumentKind, DocumentRequirement, SourceRef, VisaCategory, WorkRule } from '@/lib/models';
import { KR_EASYLAW_WORK, KR_SIK_WORK, KR_EASYLAW_INSURANCE, KR_EASYLAW_REGISTRATION, KR_EMBASSY_BD_UNIVERSITIES, KR_EMBASSY_BD_VAC, KR_EMBASSY_BD_VISA, KR_VISA_PORTAL, KR_EASYLAW_VISA, KR_KIS_NAVIGATOR, KR_SIK_VISA, krFact } from './kr-sources';

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
        {
          label: { en: 'Admission first', bn: 'আগে admission' },
          fact: krFact(
            'Students prepare the documents for entry after receiving an admission letter, then obtain the student visa through the Korean embassy or consulate in their home country.',
            KR_SIK_VISA,
            'medium',
          ),
        },
        {
          label: { en: 'What the visa review checks', bn: 'Visa review-তে যা দেখা হয়' },
          fact: krFact(
            'A valid passport; not being subject to an entry ban or refusal (Immigration Act, Article 11); eligibility for the visa status; an entry purpose that matches the status; that you will return home within the permitted stay; and any further criteria set by the Minister of Justice.',
            KR_EASYLAW_VISA,
            'medium',
            { notes: 'The same list appears on Study in Korea (NIIED).' },
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
    // 05 · How to apply (general Korea procedure; Bangladesh steps in their own block)
    process: {
      facts: [
        { label: { en: '1. Visit the Korean mission', bn: '১. Korean mission-এ যাওয়া' }, fact: krFact('A Korean visa is issued by a Korean diplomatic mission (embassy, representative office or consulate general) in each country.', KR_EASYLAW_VISA, 'medium') },
        { label: { en: '2. Apply', bn: '২. Apply' }, fact: krFact('Submit the visa application form with the documents required for the status of stay.', KR_EASYLAW_VISA, 'medium') },
        { label: { en: '3. Review', bn: '৩. Review' }, fact: krFact('The Minister of Justice, or the head of the mission on the Minister’s behalf, checks that you meet the requirements.', KR_EASYLAW_VISA, 'medium') },
        { label: { en: '4. Visa issued', bn: '৪. Visa issue' }, fact: krFact('If the review finds no problem, the visa is issued, showing your status of stay and period of stay.', KR_EASYLAW_VISA, 'medium') },
      ],
      explanation: {
        en: 'Order: admission letter → documents → apply at the Korean mission (in Bangladesh, through the Visa Application Center) → review → visa. Your roadmap tracks the same steps.',
        bn: 'ক্রম: admission letter → document → Korean mission-এ apply (Bangladesh-এ Visa Application Center দিয়ে) → review → visa। তোমার roadmap-এ একই ধাপগুলো ধরা আছে।',
      },
      blocks: [
        {
          id: 'kr-d2-bd-steps',
          title: { en: 'Applying from Bangladesh (Embassy, from 2 Sep 2026)', bn: 'Bangladesh থেকে apply (Embassy, ২ Sep 2026 থেকে)' },
          facts: [
            { label: { en: '1. Check the visa type', bn: '১. Visa type দেখা' }, fact: krFact('Check the visa type and application requirements for the purpose of your visit.', KR_EMBASSY_BD_VAC, 'high', { validFrom: '2026-09-02', reviewAt: '2026-12-27' }) },
            { label: { en: '2. Prepare', bn: '২. প্রস্তুতি' }, fact: krFact('Complete the visa application form and prepare all required supporting documents.', KR_EMBASSY_BD_VAC, 'high', { validFrom: '2026-09-02', reviewAt: '2026-12-27' }) },
            { label: { en: '3. Book', bn: '৩. Appointment' }, fact: krFact('Book an appointment on the Visa Application Center website; each applicant needs an individual appointment.', KR_EMBASSY_BD_VAC, 'high', { validFrom: '2026-09-02', reviewAt: '2026-12-27' }) },
            { label: { en: '4. Pay', bn: '৪. Fee' }, fact: krFact('Check and pay the visa fee and the Visa Application Center service fee.', KR_EMBASSY_BD_VAC, 'high', { validFrom: '2026-09-02', reviewAt: '2026-12-27' }) },
            { label: { en: '5. Submit', bn: '৫. জমা' }, fact: krFact('Visit the Visa Application Center at your appointment time and submit your application form and supporting documents.', KR_EMBASSY_BD_VAC, 'high', { validFrom: '2026-09-02', reviewAt: '2026-12-27' }) },
            { label: { en: '6. Track', bn: '৬. Track' }, fact: krFact('Check your application status with the tracking service on the Visa Application Center website.', KR_EMBASSY_BD_VAC, 'high', { validFrom: '2026-09-02', reviewAt: '2026-12-27' }) },
            { label: { en: '7. Collect', bn: '৭. Passport নেওয়া' }, fact: krFact('Collect your passport at the Visa Application Center after the visa assessment is completed.', KR_EMBASSY_BD_VAC, 'high', { validFrom: '2026-09-02', reviewAt: '2026-12-27' }) },
          ],
          links: [KR_EMBASSY_BD_VAC],
        },
      ],
    },
    // 06 · Where to apply
    portal: {
      facts: [
        {
          label: { en: 'Where', bn: 'কোথায়' },
          fact: krFact('Submit the visa application to the head of a Korean diplomatic mission abroad (embassy, consulate general or representative office).', KR_SIK_VISA, 'medium'),
        },
        {
          label: { en: 'In Bangladesh', bn: 'Bangladesh-এ' },
          fact: krFact(
            'Since 2 September 2026, general visa applications are submitted and passports collected only through the Korea Visa Application Center, Dhaka (2F B&T Nehaleeya Tower, Plot 80, Block B, Kemal Ataturk Avenue, Dhaka 1213; Sunday–Thursday, 09:00–16:00). The Embassy, not the Center, decides on the visa.',
            KR_EMBASSY_BD_VAC,
            'high',
            { validFrom: '2026-09-02', reviewAt: '2026-12-27', notes: 'Embassy notice of 2026-08-27. Appointments: https://www.visaforkorea-bd.com/schedule-an-appointment.html' },
          ),
        },
      ],
      links: [KR_EMBASSY_BD_VAC, KR_VISA_PORTAL],
    },
    // 07 · Fees. Amounts exactly as the sources state them; nothing is converted or picked for you.
    fees: {
      facts: [
        {
          label: { en: 'Visa fee (Embassy in Bangladesh)', bn: 'Visa fee (Bangladesh-এর Embassy)' },
          fact: krFact(
            'USD 40 / USD 60 / USD 70 / USD 90, depending on the visa type and period of stay, payable in the equivalent amount in local currency. Visa fees are non-refundable (e.g. if the visa is refused, the application is cancelled, or a single-entry visa is issued instead of a multiple-entry visa).',
            KR_EMBASSY_BD_VAC,
            'high',
            { validFrom: '2026-09-02', reviewAt: '2026-12-27' },
          ),
        },
        {
          label: { en: 'Visa Application Center service fee (Dhaka)', bn: 'Visa Application Center service fee (Dhaka)' },
          fact: krFact('BDT 2,150 per application (paid in cash at the Center for about the first two weeks after it opened; after that, paid online in advance).', KR_EMBASSY_BD_VAC, 'high', {
            validFrom: '2026-09-02',
            reviewAt: '2026-12-27',
          }),
        },
        {
          label: { en: 'Fee by visa kind (general)', bn: 'Visa-র ধরন অনুযায়ী fee (সাধারণ)' },
          fact: krFact(
            'Single entry: about USD 40 for stays of 90 days or less, about USD 60 for 91 days or more. Multiple entry: about USD 70 for up to 2 entries, about USD 90 with no entry limit.',
            KR_SIK_VISA,
            'medium',
          ),
        },
      ],
      explanation: {
        en: 'Which of these fees applies to your D-2 visa is not verified yet; the Visa Application Center confirms it when you apply. Keep the Center’s service fee separate from the visa fee.',
        bn: 'তোমার D-2 visa-য় এর মধ্যে কোন fee প্রযোজ্য, সেটা এখনো verified নয়; apply করার সময় Visa Application Center নিশ্চিত করবে। Center-এর service fee আর visa fee আলাদা।',
      },
    },
    // 08 · Biometrics: only the in-Korea step is sourced; biometrics at the visa application is not verified.
    biometrics: {
      facts: [
        {
          label: { en: 'At alien registration (in Korea)', bn: 'Alien registration-এর সময় (Korea-তে)' },
          fact: krFact(
            'When you register as a foreign resident in Korea you must provide biometric information (such as fingerprints and face). If you refuse, permissions such as an extension of stay may be refused.',
            KR_EASYLAW_REGISTRATION,
            'medium',
            { notes: 'Immigration Act, Article 38. Easylaw information as of 2026-08-15.' },
          ),
        },
      ],
      explanation: {
        en: 'This is about registering after you arrive. Whether biometrics are taken when you apply for the visa in Bangladesh is not verified yet.',
        bn: 'এটা Korea পৌঁছে registration-এর বিষয়। Bangladesh-এ visa apply-এর সময় biometrics নেওয়া হয় কি না, সেটা এখনো verified নয়।',
      },
    },
    // 09 · Interview and 10 · Processing time: no official source found yet → "Not verified yet".
    processing: { links: [KR_EMBASSY_BD_VAC] },
    // 11 · Important notes (Embassy guidance for Bangladeshi students)
    mistakes: {
      facts: [
        {
          label: { en: 'Check the university yourself (Embassy in Bangladesh)', bn: 'University নিজে যাচাই করো (Bangladesh-এর Embassy)' },
          fact: krFact(
            "Before applying, carefully verify the university's financial condition, operating status, eligibility to recruit international students, programmes and refund policy through the university's official website or office; do not rely solely on education consultants or recruitment agencies.",
            KR_EMBASSY_BD_UNIVERSITIES,
            'high',
          ),
        },
        {
          label: { en: 'Before you pay anything (Embassy in Bangladesh)', bn: 'টাকা দেওয়ার আগে (Bangladesh-এর Embassy)' },
          fact: krFact(
            'Confirm that an official Certificate of Admission has been issued in the university’s name, the exact fees and the correct bank account, and the refund conditions if enrolment is cancelled or the visa is refused. Keep contracts, receipts, emails and messages.',
            KR_EMBASSY_BD_UNIVERSITIES,
            'high',
          ),
        },
        {
          label: { en: 'The Embassy in Bangladesh does not arrange admission', bn: 'Bangladesh-এর Embassy admission ঠিক করে দেয় না' },
          fact: krFact('The Embassy does not recommend, guarantee, endorse or arrange admission to any university or education agency, and cannot mediate contract or refund disputes.', KR_EMBASSY_BD_UNIVERSITIES, 'high'),
        },
      ],
    },
    // 12 · Before you travel
    'pre-departure': {
      facts: [
        {
          label: { en: 'A visa is not entry', bn: 'Visa মানেই entry নয়' },
          fact: krFact('A visa is a prerequisite for entry but does not guarantee admission; final entry permission is granted at the immigration inspection on arrival.', KR_SIK_VISA, 'medium'),
        },
        {
          label: { en: 'Register within 90 days', bn: '৯০ দিনের মধ্যে registration' },
          fact: krFact(
            'If you stay in Korea for more than 90 days, you must register as a foreign resident (alien registration) at the immigration office for your area within 90 days of entry.',
            KR_EASYLAW_REGISTRATION,
            'medium',
            { notes: 'Immigration Act, Article 31. The Korea Immigration Service Visa Navigator and Study in Korea state the same 90 days.' },
          ),
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
    // 15 · Restrictions & conditions while in Korea
    restrictions: {
      facts: [
        {
          label: { en: 'Work needs permission', bn: 'কাজের জন্য permission লাগে' },
          fact: krFact(
            'Employment and profit-making activities by international students are prohibited in principle; they are allowed only with permission obtained in advance (for part-time work or activities outside your status).',
            KR_KIS_NAVIGATOR,
            'high',
            { notes: 'Visa Navigator Ver 2023.05.' },
          ),
        },
        {
          label: { en: 'Report changes in 15 days', bn: '১৫ দিনের মধ্যে পরিবর্তন জানাও' },
          fact: krFact(
            'After registering, report a change of name, nationality, passport, your institution, or whether you are enrolled within 15 days. Not reporting can mean a fine of up to KRW 1,000,000.',
            KR_EASYLAW_REGISTRATION,
            'medium',
            { notes: 'Immigration Act, Articles 35 and 100.' },
          ),
        },
        {
          label: { en: 'Report a new address in 15 days', bn: '১৫ দিনের মধ্যে নতুন ঠিকানা জানাও' },
          fact: krFact('If you move, report your new address within 15 days of moving in. Not reporting can be fined up to KRW 1,000,000.', KR_EASYLAW_REGISTRATION, 'medium', {
            notes: 'Immigration Act, Articles 36 and 98.',
          }),
        },
        {
          label: { en: 'When a visa can be cancelled', bn: 'কখন visa বাতিল হতে পারে' },
          fact: krFact(
            'If the guarantor withdraws or is no longer available; if it was obtained by fraud; if the conditions of approval are violated; if circumstances change so the status can no longer be kept; or for serious violations of the Immigration Act or other laws, or of lawful instructions of immigration officers.',
            KR_EASYLAW_VISA,
            'medium',
            { notes: 'Immigration Act, Article 89. Study in Korea lists the same reasons.' },
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
        {
          label: { en: 'When to apply for an extension', bn: 'কখন extension-এর জন্য apply' },
          fact: krFact(
            'Apply no earlier than four months before your status of stay expires, and by the expiry date at the latest (online: by the day before the expiry date).',
            KR_KIS_NAVIGATOR,
            'high',
            { notes: 'Visa Navigator Ver 2023.05.' },
          ),
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
          label: { en: 'Permission first', bn: 'আগে permission' },
          fact: krFact(
            'To work part-time you need permission for activities outside your status of stay. You apply yourself at the immigration office for your address; you must have a certain level of Korean, focus on your studies and be confirmed by your school’s international student officer.',
            KR_EASYLAW_WORK,
            'medium',
            { notes: 'Enforcement Decree of the Immigration Act, Article 25; Ministry of Justice integrated guide by status (2026-08-07), p. 37. Easylaw information as of 2026-08-15.' },
          ),
        },
        {
          label: { en: 'Which D-2 students', bn: 'কোন D-2 student' },
          fact: krFact(
            'D-2-1 to D-2-4, D-2-6 and D-2-7 students can be permitted right away. Students given an exceptional stay after their course period ended (for example, missing credits) are excluded.',
            KR_EASYLAW_WORK,
            'medium',
          ),
        },
        {
          label: { en: 'Not allowed', bn: 'যা করা যাবে না' },
          fact: krFact(
            'Professional (E-1 to E-7) work without separate permission; manufacturing (unless Korean level 4 or higher), construction and seafarer jobs; delivery riders, couriers, designated drivers, insurance planners and similar platform or commission work; dispatch or subcontracted work; remote work.',
            KR_EASYLAW_WORK,
            'medium',
          ),
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
    doc('passport', 'Copy of passport', KR_SIK_VISA),
    doc('photo', 'One photo (passport-size, taken within the last 6 months)', KR_SIK_VISA),
    doc('admission-letter', 'Standard admission letter issued by the university president or dean, including the review of academic ability and financial ability', KR_EASYLAW_VISA),
    doc('certificate', 'Proof of highest education level', KR_SIK_VISA),
    doc('financial', 'Proof of financial ability', KR_SIK_VISA),
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
    // The two official sources differ on weekends/vacations for this row → needs review.
    outcome: hours('Up to 15 hours a week (without TOPIK 4 or the equivalent Social Integration Program level 4 / King Sejong Institute Intermediate 2).', {
      status: 'needs-review',
      notes: 'Easylaw shows 15 hours for this row overall; Study in Korea shows 15 hours on weekdays and 10 hours on weekends and vacations. Re-check with the immigration office.',
    }),
  },
];

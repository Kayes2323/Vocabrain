import type { CountrySection, DocumentKind, DocumentRequirement, SourceRef, VisaPartId } from '@/lib/models';
import {
  KR_EASYLAW_GUIDE_PDF,
  KR_EASYLAW_REGISTRATION,
  KR_EASYLAW_VISA,
  KR_EASYLAW_WORK,
  KR_EMBASSY_BD,
  KR_EMBASSY_BD_STUDENT_DOCS,
  KR_EMBASSY_BD_TB,
  KR_EMBASSY_BD_UNIVERSITIES,
  KR_EMBASSY_BD_VAC,
  KR_EMBASSY_BD_VISA,
  KR_KIS_NAVIGATOR,
  KR_SIK_VISA,
  KR_SIK_WORK,
  KR_VISA_PORTAL,
  krFact,
} from './kr-sources';

/**
 * South Korea: what applies to BOTH student routes (D-2 and D-4), Phase C1.3.
 * Only facts whose source states them for students in general (or for all
 * general visas) live here; anything route-specific stays on its category.
 */

const VAC = { validFrom: '2026-09-02', reviewAt: '2026-12-27' } as const;
// The Embassy's student-visa page is older than the VAC notice → every fact from it needs review.
const OLD_BD = {
  status: 'needs-review' as const,
  reviewAt: '2026-12-27',
  // Short: the block's guidance explains once why these need review.
  notes: 'Embassy page first posted 2021-02-07 (edited after May 2025); older than the Visa Application Center notice.',
};

export const KR_SHARED_PARTS: Partial<Record<VisaPartId, CountrySection>> = {
  // 02 · Who can apply (general)
  eligibility: {
    facts: [
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
  },
  // 03 · Documents: the Bangladesh list is kept apart from the general Korea requirement.
  documents: {
    blocks: [
      {
        id: 'kr-bd-specific',
        title: { en: 'Bangladesh-specific requirements', bn: 'Bangladesh-এর জন্য আলাদা requirement' },
        facts: [
          {
            label: { en: 'Extra documents by country', bn: 'দেশভেদে বাড়তি document' },
            fact: krFact(
              'Additional documents may be required depending on the program and your country; check with the Korean diplomatic mission in your country before applying for a visa.',
              KR_SIK_VISA,
              'medium',
            ),
          },
          {
            label: { en: 'General (Embassy list)', bn: 'সাধারণ (Embassy-র list)' },
            fact: krFact('Visa application form with bar code (from the e-Form); one passport-size colour photo taken within 6 months; passport valid for at least 6 months and a photocopy; a cover or forwarding letter.', KR_EMBASSY_BD_STUDENT_DOCS, 'high', OLD_BD),
          },
          {
            label: { en: 'Admission (Embassy list)', bn: 'Admission (Embassy-র list)' },
            fact: krFact('Certificate of Admission (original or copy) issued by the university or education organisation, and the university payment certificate.', KR_EMBASSY_BD_STUDENT_DOCS, 'high', OLD_BD),
          },
          {
            label: { en: 'Family (Embassy list)', bn: 'পরিবার (Embassy-র list)' },
            fact: krFact(
              "Birth certificate (original and copy); family relationship certificate from the City Corporation or Union office (within 3 months); parents' no-objection letter (no notarisation needed); parents' NID and passport copies (if possible).",
              KR_EMBASSY_BD_STUDENT_DOCS,
              'high',
              OLD_BD,
            ),
          },
          {
            label: { en: 'Money (Embassy list)', bn: 'টাকা-পয়সা (Embassy-র list)' },
            fact: krFact(
              "Proof of the applicant's or guarantor's ability to pay study and living costs: bank solvency certificate, bank statement for the last 6 months, tax certificate, the last 2 years' tax returns and tax challan copy; the guarantor's job certificate or trade licence; registered deed (original and copy) for an asset valuation certificate or affidavit. No amount is stated.",
              KR_EMBASSY_BD_STUDENT_DOCS,
              'high',
              OLD_BD,
            ),
          },
          {
            label: { en: 'Police clearance (Embassy list)', bn: 'Police clearance (Embassy-র list)' },
            fact: krFact('Police clearance certificate issued by Bangladesh Police (within 3 months).', KR_EMBASSY_BD_STUDENT_DOCS, 'high', OLD_BD),
          },
          {
            label: { en: 'Education (Embassy list)', bn: 'শিক্ষা (Embassy-র list)' },
            fact: krFact(
              'All education certificates with transcripts, originals and photocopies, attested by the Ministry of Education and the Ministry of Foreign Affairs of Bangladesh (within 3 months); no notarisation and no Korean Embassy attestation needed. A provisional certificate may be accepted in some cases.',
              KR_EMBASSY_BD_STUDENT_DOCS,
              'high',
              OLD_BD,
            ),
          },
          {
            label: { en: 'English and travel (Embassy list)', bn: 'English আর ভ্রমণ (Embassy-র list)' },
            fact: krFact('An approved English score certificate (TOEFL / IELTS) within 2 years, and a valid air-ticket booking slip.', KR_EMBASSY_BD_STUDENT_DOCS, 'high', OLD_BD),
          },
        ],
        guidance: {
          en: "Bangladesh-specific requirement: Needs review. The Embassy's student document list is dated (first posted 2021-02-07) and still says to apply at the Embassy; since 2 Sep 2026 you apply through the Visa Application Center. Confirm the current list with the Center before you apply.",
          bn: 'Bangladesh-specific requirement: Needs review। Embassy-র student document list পুরনো (প্রথম post 2021-02-07) আর এখনো Embassy-তে জমা দিতে বলে; ২ Sep 2026 থেকে Visa Application Center দিয়ে apply করতে হয়। Apply-এর আগে Center থেকে বর্তমান list নিশ্চিত করো।',
        },
        links: [KR_EMBASSY_BD_STUDENT_DOCS, KR_EMBASSY_BD_VISA, KR_EMBASSY_BD],
      },
      {
        id: 'kr-bd-tb',
        title: { en: 'Tuberculosis test (Bangladesh)', bn: 'Tuberculosis test (Bangladesh)' },
        facts: [
          {
            label: { en: 'Who must submit it', bn: 'কাকে দিতে হবে' },
            fact: krFact(
              'Bangladesh is on the Embassy’s list of countries with a high risk of tuberculosis: applicants for a long-term visa (to stay more than 90 days) must submit a tuberculosis test result. Exempt: children aged 0–5, pregnant women, and A-1/A-2/A-3 visa applicants.',
              KR_EMBASSY_BD_TB,
              'high',
              { notes: 'Embassy notice of 2023-10-26. The Immigration Act rule (Easylaw, as of 2026-08-15) and the Embassy’s student list (result within 3 months) say the same.' },
            ),
          },
          {
            label: { en: 'Designated test center (2023 notice)', bn: 'নির্দিষ্ট test center (2023-এর notice)' },
            fact: krFact(
              'PRAAVA HEALTH, Plot 9, Road 17, Block C, Banani, Dhaka-1213. Test fee: BDT 1,500 (X-ray) or BDT 7,000 (X-ray + sputum test).',
              KR_EMBASSY_BD_TB,
              'high',
              { status: 'needs-review', reviewAt: '2026-12-27', notes: 'From the 2023-10-26 notice; the center and fees may have changed. Confirm with the Embassy or the Visa Application Center.' },
            ),
          },
        ],
        links: [KR_EMBASSY_BD_TB],
      },
    ],
  },
  // 05 · How to apply (general procedure for foreign students; Bangladesh steps in their own block)
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
        id: 'kr-bd-steps',
        title: { en: 'Applying from Bangladesh (Embassy, from 2 Sep 2026)', bn: 'Bangladesh থেকে apply (Embassy, ২ Sep 2026 থেকে)' },
        facts: [
          { label: { en: '1. Check the visa type', bn: '১. Visa type দেখা' }, fact: krFact('Check the visa type and application requirements for the purpose of your visit.', KR_EMBASSY_BD_VAC, 'high', VAC) },
          { label: { en: '2. Prepare', bn: '২. প্রস্তুতি' }, fact: krFact('Complete the visa application form and prepare all required supporting documents.', KR_EMBASSY_BD_VAC, 'high', VAC) },
          { label: { en: '3. Book', bn: '৩. Appointment' }, fact: krFact('Book an appointment on the Visa Application Center website; each applicant needs an individual appointment.', KR_EMBASSY_BD_VAC, 'high', VAC) },
          { label: { en: '4. Pay', bn: '৪. Fee' }, fact: krFact('Check and pay the visa fee and the Visa Application Center service fee.', KR_EMBASSY_BD_VAC, 'high', VAC) },
          { label: { en: '5. Submit', bn: '৫. জমা' }, fact: krFact('Visit the Visa Application Center at your appointment time and submit your application form and supporting documents.', KR_EMBASSY_BD_VAC, 'high', VAC) },
          { label: { en: '6. Track', bn: '৬. Track' }, fact: krFact('Check your application status with the tracking service on the Visa Application Center website.', KR_EMBASSY_BD_VAC, 'high', VAC) },
          { label: { en: '7. Collect', bn: '৭. Passport নেওয়া' }, fact: krFact('Collect your passport at the Visa Application Center after the visa assessment is completed.', KR_EMBASSY_BD_VAC, 'high', VAC) },
          {
            label: { en: 'When to apply (Embassy student page)', bn: 'কখন apply (Embassy-র student page)' },
            fact: krFact('Considering the student visa processing period, apply at least five (5) days before the start of the academic term.', KR_EMBASSY_BD_STUDENT_DOCS, 'high', OLD_BD),
          },
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
          { ...VAC, notes: 'Embassy notice of 2026-08-27. Appointments: https://www.visaforkorea-bd.com/schedule-an-appointment.html' },
        ),
      },
    ],
    links: [KR_EMBASSY_BD_VAC, KR_VISA_PORTAL],
  },
  // 07 · Fees: amounts exactly as the sources state them; nothing is converted or picked for you.
  fees: {
    facts: [
      {
        label: { en: 'Visa fee (Embassy in Bangladesh)', bn: 'Visa fee (Bangladesh-এর Embassy)' },
        fact: krFact(
          'USD 40 / USD 60 / USD 70 / USD 90, depending on the visa type and period of stay, payable in the equivalent amount in local currency. Visa fees are non-refundable (e.g. if the visa is refused, the application is cancelled, or a single-entry visa is issued instead of a multiple-entry visa).',
          KR_EMBASSY_BD_VAC,
          'high',
          VAC,
        ),
      },
      {
        label: { en: 'Visa Application Center service fee (Dhaka)', bn: 'Visa Application Center service fee (Dhaka)' },
        fact: krFact('BDT 2,150 per application (paid in cash at the Center for about the first two weeks after it opened; after that, paid online in advance).', KR_EMBASSY_BD_VAC, 'high', VAC),
      },
      {
        label: { en: 'Student visa fee (Embassy in Bangladesh, student page)', bn: 'Student visa fee (Bangladesh-এর Embassy, student page)' },
        fact: krFact('More than 90 days (single entry): USD 60.', KR_EMBASSY_BD_STUDENT_DOCS, 'high', OLD_BD),
      },
      {
        label: { en: 'Fee by visa kind (general)', bn: 'Visa-র ধরন অনুযায়ী fee (সাধারণ)' },
        fact: krFact('Single entry: about USD 40 for stays of 90 days or less, about USD 60 for 91 days or more. Multiple entry: about USD 70 for up to 2 entries, about USD 90 with no entry limit.', KR_SIK_VISA, 'medium'),
      },
    ],
    explanation: {
      en: 'The visa fee and the Center’s service fee are separate. The Embassy’s student page names USD 60, but that page is older than the Visa Application Center, so the fee that applies to you still needs to be confirmed when you apply.',
      bn: 'Visa fee আর Center-এর service fee আলাদা। Embassy-র student page-এ USD 60 লেখা, কিন্তু page-টা Visa Application Center চালুর আগের; তাই তোমার fee apply-এর সময় নিশ্চিত করতে হবে।',
    },
  },
  // 08 · Biometrics: in Korea (entry and registration); biometrics at the visa application is not verified.
  biometrics: {
    facts: [
      {
        label: { en: 'At entry (in Korea)', bn: 'Entry-র সময় (Korea-তে)' },
        fact: krFact(
          'Students aged 17 or older must give fingerprints (both index fingers) and a face image at the entry inspection; entry can be refused if they do not.',
          KR_EASYLAW_GUIDE_PDF,
          'medium',
          { notes: 'Immigration Act, Article 12-2. Easylaw information as of 2026-08-15.' },
        ),
      },
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
      en: 'Both steps happen in Korea. Whether biometrics are taken when you apply for the visa in Bangladesh is not verified yet.',
      bn: 'দুটো ধাপই Korea-তে। Bangladesh-এ visa apply-এর সময় biometrics নেওয়া হয় কি না, সেটা এখনো verified নয়।',
    },
  },
  // 10 · Processing time: no official fixed time exists in any source we read.
  processing: {
    blocks: [
      {
        id: 'kr-processing-time',
        title: { en: 'Official processing time', bn: 'Official processing time' },
        guidance: {
          en: 'Official fixed processing time not verified. No official source we read (Korea Immigration Service, HiKorea, Study in Korea, the Embassy in Bangladesh) states a fixed time for D-2 or D-4. You can track your application on the Visa Application Center website.',
          bn: 'Official নির্দিষ্ট processing time verified নয়। আমরা যে official source পড়েছি (Korea Immigration Service, HiKorea, Study in Korea, Bangladesh-এর Embassy), তার কোনোটাতেই D-2 বা D-4-এর নির্দিষ্ট সময় নেই। Visa Application Center-এর website-এ application track করতে পারবে।',
        },
        links: [KR_EMBASSY_BD_VAC],
      },
    ],
  },
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
  // 14 · Work (both routes): the permission and the fields that are never allowed.
  work: {
    facts: [
      {
        label: { en: 'Who this applies to', bn: 'কার জন্য প্রযোজ্য' },
        fact: krFact(
          'Students on a D-2 or D-4 visa who want part-time work must have a certain level of Korean proficiency and get permission from the local immigration office.',
          KR_SIK_WORK,
          'medium',
          { status: 'partly-verified', notes: 'Hours depend on the route; see each route’s rule.' },
        ),
      },
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
        label: { en: 'Not allowed', bn: 'যা করা যাবে না' },
        fact: krFact(
          'Professional (E-1 to E-7) work without separate permission; manufacturing (unless Korean level 4 or higher), construction and seafarer jobs; delivery riders, couriers, designated drivers, insurance planners and similar platform or commission work; dispatch or subcontracted work; remote work.',
          KR_EASYLAW_WORK,
          'medium',
        ),
      },
    ],
    links: [KR_EASYLAW_WORK, KR_SIK_WORK],
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
  // 16 · Extension timing is the same for every status of stay.
  stay: {
    facts: [
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
  },
};

/** A document both student routes ask for: the same official wording on each route's list. */
function shared(kind: DocumentKind, requirement: string, source: SourceRef): DocumentRequirement {
  return {
    kind,
    purpose: 'visa',
    requirement: krFact(requirement, source, 'medium', { notes: 'Listed for both D-2 and D-4 by Study in Korea (NIIED).' }),
    submittedTo: { en: 'Korean embassy or consulate (visa application)', bn: 'Korean embassy বা consulate (visa application)' },
    appliesTo: { visaCategoryIds: ['kr-d2', 'kr-d4'] },
  };
}

/** Country-level visa documents: shown once a route is chosen, one entry per document. */
export const KR_SHARED_DOCUMENTS: DocumentRequirement[] = [
  shared('passport', 'Copy of passport', KR_SIK_VISA),
  shared('photo', 'One photo (passport-size, taken within the last 6 months)', KR_SIK_VISA),
  shared('admission-letter', 'Standard admission letter (issued by the university president or dean)', KR_SIK_VISA),
  shared('financial', 'Proof of financial ability', KR_SIK_VISA),
];

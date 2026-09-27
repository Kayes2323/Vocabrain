import type { CostEstimate, CountrySection, CountrySectionId, SectionFact, SourceRef } from '@/lib/models';
import { KR_ACADEMYINFO, KR_EASYLAW_REGISTRATION, KR_EMBASSY_BD_GKS_U_2027, KR_HIKOREA, KR_NIIED_GUIDEBOOK, KR_SIK_SCHOLARSHIPS, KR_TOPIK, krFact } from './kr-sources';

/**
 * South Korea, C2.1: the country itself — education system, who may apply,
 * when and how to apply, and the Korean / English language picture. Every
 * fact is read from the Ministry of Education / NIIED guidebook (see
 * KR_NIIED_GUIDEBOOK for its edition). Anything a university sets for itself
 * says so, and the student is sent to that university's own guide.
 */

const G = KR_NIIED_GUIDEBOOK;
const f = (value: string, notes?: string) => krFact(value, G, 'medium', notes ? { notes } : {});
const degree = { pathways: ['degree'] };
const language = { pathways: ['language'] };
const UNI_GUIDE = 'General standard; each university sets its own rules in its admission guide.';

export const KR_SECTIONS: Partial<Record<CountrySectionId, CountrySection>> = {
  // 02 · Education system
  education: {
    facts: [
      { label: { en: 'School structure', bn: 'শিক্ষা কাঠামো' }, fact: f('6-3-3-4: elementary school (6 years), middle school (3), high school (3) and university (4).') },
      {
        label: { en: 'Higher education', bn: 'উচ্চশিক্ষা' },
        fact: f("Junior colleges (2–3 year programs), universities (4-year programs) and graduate schools. Master's and doctoral programs are commonly offered by 4-year universities."),
      },
      {
        label: { en: 'How long each degree takes', bn: 'কোন degree কত বছর' },
        fact: f("Associate degree: 2–3 years. Bachelor's: 4–6 years. Master's: 2 years or more. Doctoral: 3 years or more."),
      },
    ],
    blocks: [
      {
        id: 'kr-graduate',
        title: { en: "Master's and doctoral study", bn: "Master's ও PhD" },
        appliesTo: { pathways: ['degree'], degreeLevels: ['masters', 'phd'] },
        facts: [
          {
            label: { en: "Master's", bn: "Master's" },
            appliesTo: { degreeLevels: ['masters'] },
            fact: f('Two years or more. Usually 24 credits, then a thesis examined by a committee of at least three examiners.', UNI_GUIDE),
          },
          {
            label: { en: 'Doctoral', bn: 'PhD' },
            appliesTo: { degreeLevels: ['phd'] },
            fact: f('Three years or more. Usually 36 credits, then a dissertation examined by at least five examiners.', UNI_GUIDE),
          },
          {
            label: { en: 'Kinds of graduate school', bn: 'Graduate school-এর ধরন' },
            fact: f('Academically focused general graduate schools and professionally oriented specialised graduate schools.'),
          },
        ],
      },
      {
        id: 'kr-programs',
        title: { en: 'Kinds of programs universities run', bn: 'University-তে কী ধরনের program থাকে' },
        facts: [
          { label: { en: 'Regular semester program', bn: 'Regular semester program' }, fact: f('Degree courses taught in Korean and, in some courses, in foreign languages.') },
          {
            label: { en: 'English-taught courses', bn: 'English-এ পড়ানো course' },
            fact: f(
              'About 30% of all courses are taught in English, with a higher share in graduate schools. Some universities have international faculties where every course is in English.',
              'Whether your own department teaches in English is stated in its admission guide.',
            ),
          },
          { label: { en: 'Other programs', bn: 'অন্যান্য program' }, fact: f('Exchange programs and summer / winter programs.') },
          {
            label: { en: 'Korean language training', bn: 'Korean ভাষা training' },
            fact: f('Short-term programs (3–4 weeks) and regular programs (10–40 weeks), run by university-affiliated language institutes.'),
          },
        ],
      },
    ],
  },

  // 10 · Admission requirements
  admission: {
    facts: [
      {
        label: { en: "Associate / Bachelor's", bn: "Associate / Bachelor's" },
        appliesTo: { pathways: ['degree'], degreeLevels: ['bachelors'] },
        fact: f('You have completed the entire primary and secondary curriculum in your home country (a 12-year program).', UNI_GUIDE),
      },
      {
        label: { en: "Master's", bn: "Master's" },
        appliesTo: { pathways: ['degree'], degreeLevels: ['masters'] },
        fact: f("You hold a bachelor's degree.", UNI_GUIDE),
      },
      {
        label: { en: 'Doctoral', bn: 'PhD' },
        appliesTo: { pathways: ['degree'], degreeLevels: ['phd'] },
        fact: f("You hold a master's degree.", UNI_GUIDE),
      },
      {
        label: { en: 'Fewer than 12 years of schooling', bn: '১২ বছরের কম schooling' },
        appliesTo: { pathways: ['degree'], degreeLevels: ['bachelors'] },
        fact: f('Where the school system is shorter than 12 years, admission is possible if you completed the whole primary and secondary program in that country and the head of the university confirms it with evidence such as a graduation certificate.'),
      },
      {
        label: { en: 'How applicants are selected', bn: 'কীভাবে বাছাই হয়' },
        appliesTo: degree,
        fact: f('Mostly by document screening; some universities also hold interviews or exams. Online applications are now widely used. There are freshman and transfer admissions.', UNI_GUIDE),
      },
    ],
    explanation: {
      en: "These are the general standards. The university's own admission guide decides: read it for your department before you prepare anything.",
      bn: 'এগুলো সাধারণ মান। শেষ কথা বলে university-র নিজের admission guide — কিছু প্রস্তুত করার আগে আপনার department-এর guide পড়ে নিন।',
    },
    blocks: [
      {
        id: 'kr-language-institute',
        title: { en: 'Korean language institute admission', bn: 'Korean language institute-এ ভর্তি' },
        appliesTo: language,
        facts: [
          {
            label: { en: 'Steps', bn: 'ধাপ' },
            fact: f('Submit documents → document evaluation → pay tuition → admission letter issued → apply for the visa.'),
          },
          {
            label: { en: 'Documents institutes usually ask for', bn: 'Institute সাধারণত যা চায়' },
            fact: f(
              'Visa issuance recognition application form, passport, standard admission letter, final school transcript and graduation certificate, financial proof (the guidebook gives 10 million KRW as the usual amount) and a study plan.',
              'Requirements differ by school and country; check the institute’s own website. Documents are not returned.',
            ),
          },
          {
            label: { en: 'Regular program', bn: 'Regular program' },
            fact: f('Most regular programs run for about 10 weeks at an average of 20 hours a week.'),
          },
        ],
      },
    ],
  },

  // 11 · Language requirements (the TOPIK / English picture for degree students)
  english: {
    facts: [
      {
        label: { en: 'Korean-taught degree', bn: 'Korean-এ পড়ানো degree' },
        appliesTo: degree,
        fact: f('TOPIK level 3 or above is generally required for admission, and level 4 or above for graduation.', UNI_GUIDE),
      },
      {
        label: { en: 'English-taught department', bn: 'English-এ পড়ানো department' },
        appliesTo: degree,
        fact: f('If your department teaches in English, TOPIK is not mandatory: you can be admitted with a recognised English test such as TOEFL, and TOPIK 4 is not needed for graduation.', UNI_GUIDE),
      },
      {
        label: { en: 'Different rules', bn: 'আলাদা নিয়ম' },
        fact: f('Exchange students, GKS scholars, foreign-government scholars, language-institute students and entertainment / sports departments have different Korean requirements; ask the university.'),
      },
      {
        label: { en: 'TOPIK levels', bn: 'TOPIK level' },
        fact: f('TOPIK I covers levels 1–2 (beginner); TOPIK II covers levels 3–6 (intermediate to advanced). The level comes from the total score.'),
      },
    ],
    blocks: [
      {
        id: 'kr-which-test',
        title: { en: 'Which test to plan for', bn: 'কোন test-এর প্রস্তুতি নেবেন' },
        appliesTo: degree,
        guidance: {
          en: 'First find out the teaching language of your department. Korean-taught: plan for TOPIK. English-taught: plan for an English test; the score each university asks for is in its admission guide.',
          bn: 'আগে দেখে নিন আপনার department কোন ভাষায় পড়ায়। Korean-এ হলে TOPIK-এর প্রস্তুতি নিন; English-এ হলে English test-এর। কোন university কত score চায়, তা তার admission guide-এ লেখা থাকে।',
        },
      },
      {
        id: 'kr-topik-dates',
        title: { en: 'TOPIK dates', bn: 'TOPIK-এর তারিখ' },
        guidance: {
          en: 'The exam schedule for the year is announced on the official TOPIK website.',
          bn: 'বছরের পরীক্ষার তারিখ official TOPIK website-এ ঘোষণা করা হয়।',
        },
        links: [KR_TOPIK],
      },
      {
        id: 'kr-learn-korean',
        title: { en: 'Where to learn Korean', bn: 'Korean কোথায় শিখবেন' },
        facts: [
          {
            label: { en: 'Language institutes', bn: 'Language institute' },
            fact: f('University-affiliated Korean language training institutes teach speaking, listening, reading and writing; they are widely used by students aiming to enter a Korean university.'),
          },
          {
            label: { en: 'Free courses', bn: 'বিনামূল্যের course' },
            fact: f("Free online courses include Nuri-Sejong School, The Cyber University of Korea's Quick Korean and EBS Durian; local government centres (e.g. Seoul Global Center) also run classes."),
          },
        ],
      },
    ],
  },

  // 13 · Application process
  application: {
    facts: [
      {
        label: { en: 'Application periods', bn: 'আবেদনের সময়' },
        appliesTo: degree,
        fact: f(
          'Spring semester (starts in March): applications typically from September to November of the previous year. Fall semester (starts in September): typically April to June of the same year.',
          'Typical periods only; each university publishes its own dates.',
        ),
      },
      {
        label: { en: 'Before admission', bn: 'Admission-এর আগে' },
        appliesTo: degree,
        fact: f('Choose the university and department → get the application form and prepare the documents → submit → receive the admission letter.'),
      },
      {
        label: { en: 'Before entry', bn: 'Korea-তে ঢোকার আগে' },
        fact: f('Prepare the visa documents (through the Korean diplomatic mission or the immigration website) → apply for the visa → receive the visa.'),
      },
      {
        label: { en: 'Translations', bn: 'অনুবাদ' },
        fact: f('Depending on the document (usually the certificate of your highest education), a notarised translation or an apostille confirmation may be required.'),
      },
    ],
    explanation: {
      en: 'Admission comes first, the visa second: you apply for the visa only with the admission letter in hand.',
      bn: 'আগে admission, পরে visa: admission letter হাতে পাওয়ার পরই visa-র আবেদন করবেন।',
    },
  },

  // 06 · Tuition (C2.4): the guidebook's ranges are planning figures, not any university's fee.
  tuition: {
    facts: [
      {
        label: { en: 'Per semester, by degree', bn: 'প্রতি semester, degree অনুযায়ী' },
        appliesTo: degree,
        fact: f(
          "Associate: ₩3,000,000–4,000,000. Bachelor's: ₩5,000,000–7,000,000. Master's: ₩6,000,000–8,000,000. Doctoral: ₩7,000,000–9,000,000.",
          'Typical ranges from the guidebook; the exact fee is on each university’s website or Academyinfo.',
        ),
      },
      {
        label: { en: 'National vs private', bn: 'National বনাম private' },
        appliesTo: degree,
        fact: f('National universities, which receive government funding, generally charge lower tuition than private universities.'),
      },
      {
        label: { en: 'Korean language institute', bn: 'Korean language institute' },
        appliesTo: language,
        fact: f('About ₩1,200,000–1,800,000 for a regular program of about 10 weeks.', 'Typical range from the guidebook; each institute sets its own fee.'),
      },
    ],
    blocks: [
      {
        id: 'kr-exact-tuition',
        title: { en: 'Exact tuition', bn: 'সঠিক tuition' },
        guidance: {
          en: "Use your university's own fee page, or Academyinfo, for the real figure.",
          bn: 'আসল অঙ্কের জন্য আপনার university-র নিজের fee page বা Academyinfo দেখুন।',
        },
        links: [KR_ACADEMYINFO],
      },
    ],
  },

  // 07 · Living costs (C2.4)
  living: {
    facts: [
      { label: { en: 'Average per month', bn: 'মাসে গড়ে' }, fact: f('About ₩750,000–1,000,000 a month for international students.') },
      {
        label: { en: 'By item, per month', bn: 'খাত অনুযায়ী, মাসে' },
        fact: f(
          'Housing ₩500,000–700,000; meals ₩200,000–300,000 (one cafeteria meal ₩5,000–15,000); transport ₩50,000–100,000; other (phone, internet, insurance…) ₩100,000–200,000.',
          'These item ranges add up to more than the average above; both are the guidebook’s own figures.',
        ),
      },
    ],
  },

  // 09 · Scholarships (C2.4)
  scholarships: {
    facts: [
      {
        label: { en: 'Global Korea Scholarship (GKS)', bn: 'Global Korea Scholarship (GKS)' },
        fact: krFact(
          "The Korean government's scholarship: Korean language training (1 year) plus the degree. It covers airfare, Korean language training fees, tuition and monthly allowances.",
          KR_SIK_SCHOLARSHIPS,
          'medium',
        ),
      },
      {
        label: { en: 'GKS undergraduate (Bangladesh, 2027)', bn: 'GKS undergraduate (Bangladesh, 2027)' },
        appliesTo: { pathways: ['degree'], degreeLevels: ['bachelors'] },
        fact: krFact(
          'Embassy Track quota for Bangladesh: 3 (General 2 + R-GKS 1). Online applications: 15–30 September 2026.',
          KR_EMBASSY_BD_GKS_U_2027,
          'high',
          { reviewAt: '2026-12-31' },
        ),
      },
      {
        label: { en: "GKS graduate (Master's / PhD)", bn: "GKS graduate (Master's / PhD)" },
        appliesTo: { pathways: ['degree'], degreeLevels: ['masters', 'phd'] },
        fact: krFact('Applications are usually taken in February–March, through the Korean Embassy or directly by a GKS university; you must be under 40 with an average of at least 80%.', KR_SIK_SCHOLARSHIPS, 'medium'),
      },
      {
        label: { en: 'University scholarships', bn: 'University scholarship' },
        fact: krFact('Most universities give international students scholarships of 30–100% of tuition based on academic performance; the details are on each university’s website.', KR_SIK_SCHOLARSHIPS, 'medium'),
      },
    ],
  },

  // 17 · Accommodation (C2.8)
  accommodation: {
    facts: [
      { label: { en: 'Dormitories', bn: 'Dormitory' }, fact: f('Most universities run dormitories on or near campus, with single and shared rooms (2-person, 4-person…). Admission conditions and costs vary by school; ask your school’s dormitory office.') },
      { label: { en: 'Boarding', bn: 'Boarding' }, fact: f('A household provides a room and meals for a monthly payment; visiting and checking the place and cost before deciding is recommended.') },
      {
        label: { en: 'Renting: jeonse and wolse', bn: 'ভাড়া: jeonse ও wolse' },
        fact: f('Wolse: a deposit plus monthly rent, with the deposit returned at the end of the contract. Jeonse: a larger lump-sum deposit and no monthly rent for the agreed period. The deposit comes back if the house is undamaged and all rent is paid.'),
      },
    ],
  },

  // 25 · After you arrive (C2.8): what the law requires, kept apart from practical first steps.
  arrival: {
    blocks: [
      {
        id: 'kr-arrival-required',
        title: { en: 'Required by law', bn: 'আইনে যা বাধ্যতামূলক' },
        facts: [
          {
            label: { en: 'Alien registration (residence card)', bn: 'Alien registration (residence card)' },
            fact: krFact('If you will stay more than 90 days, register at the immigration office for your area within 90 days of entry. Your fingerprints and face (biometrics) are taken.', KR_EASYLAW_REGISTRATION, 'medium', { notes: 'Immigration Act, Articles 31 and 38. Easylaw information as of 2026-08-15.' }),
          },
          {
            label: { en: 'What to bring', bn: 'কী নিয়ে যাবেন' },
            fact: krFact('Passport, one passport photo (3.5 cm × 4.5 cm) and proof of where you live; D-2 students also bring a certificate of enrolment and a health examination certificate.', KR_EASYLAW_REGISTRATION, 'medium', { notes: 'Easylaw information as of 2026-08-15.' }),
          },
          {
            label: { en: 'Registration fee', bn: 'Registration fee' },
            fact: krFact('30,000 KRW, cash only.', KR_NIIED_GUIDEBOOK, 'medium', { status: 'needs-review', notes: 'Only the older guidebook states the fee; check it on HiKorea before you go.' }),
          },
          {
            label: { en: 'Report changes within 15 days', bn: '১৫ দিনের মধ্যে পরিবর্তন জানান' },
            fact: krFact('Changes to your name, nationality, passport details or school (including your enrolment status) must be reported within 15 days, with your residence card and passport.', KR_EASYLAW_REGISTRATION, 'medium', { notes: 'Immigration Act, Article 35. Easylaw information as of 2026-08-15.' }),
          },
          {
            label: { en: 'New address', bn: 'নতুন ঠিকানা' },
            fact: krFact('When you move, report your new address within 15 days (to the local community centre or the immigration office). Not reporting it can mean a fine of up to 1 million KRW.', KR_EASYLAW_REGISTRATION, 'medium', { notes: 'Immigration Act, Articles 36 and 98. The 15 days are from the Study in Korea guidebook; the fine from Easylaw (as of 2026-08-15).' }),
          },
        ],
        links: [KR_HIKOREA],
      },
      {
        id: 'kr-arrival-practical',
        title: { en: 'Practical first steps (not legal requirements)', bn: 'প্রথম কাজগুলো (আইনি বাধ্যবাধকতা নয়)' },
        facts: [
          { label: { en: 'Bank account', bn: 'Bank account' }, fact: f('Visit a bank with your ID (passport or residence card), a seal or signature, and a document showing why you need the account. Banks are generally open 9 AM to 4 PM.') },
          { label: { en: 'Mobile phone', bn: 'Mobile phone' }, fact: f('At a phone shop: a residence card is needed for a post-paid plan; a passport is enough for a prepaid plan. Bring your student ID and a card or cash. Requirements vary by company.') },
          { label: { en: 'Sending money home', bn: 'দেশে টাকা পাঠানো' }, fact: f('Transfers abroad are possible at a bank without documents up to USD 100,000 a year; above that, the bank asks for documents.') },
        ],
      },
    ],
  },

  // 21 · After graduation (C2.8)
  'post-study': {
    facts: [
      {
        label: { en: 'Job seeking (D-10-1)', bn: 'চাকরি খোঁজা (D-10-1)' },
        fact: f('After graduating you can change to the Job Seeker (D-10-1) visa to look for professional work (the fields of E-1 to E-7). It is extended 6 months at a time, up to 2 years; internships are allowed (up to 6 months per company), simple or physical labour is not.'),
      },
      {
        label: { en: 'Money for D-10', bn: 'D-10-এর জন্য টাকা' },
        fact: krFact('Proof of at least 900,000 KRW a month for 6 months (about 5.4 million KRW); students changing from D-2 to D-10 for the first time are exempt.', KR_NIIED_GUIDEBOOK, 'medium', { status: 'needs-review', notes: 'Older guidebook figure; check the current amount on HiKorea.' }),
      },
      {
        label: { en: 'Work visa (E-7)', bn: 'কাজের visa (E-7)' },
        fact: f("Graduates usually apply for the E-7 (Designated Activities) visa: a master's degree in a related field, or a related bachelor's plus at least 1 year of experience, or 5+ years of experience. Each of the 87 occupations has its own conditions."),
      },
      {
        label: { en: 'GKS graduates (D-2-7)', bn: 'GKS graduate (D-2-7)' },
        fact: f('Government-invited scholars (D-2-7) are exempt from the national employment ratio and company-size limits when changing to E-7, and may apply to similar occupations.'),
      },
    ],
    blocks: [
      {
        id: 'kr-post-study-check',
        title: { en: 'Before you plan', bn: 'Plan করার আগে' },
        guidance: {
          en: 'Visa rules after graduation change often. Check the current rules on HiKorea before you decide.',
          bn: 'Graduation-এর পরের visa নিয়ম প্রায়ই বদলায়। সিদ্ধান্ত নেওয়ার আগে HiKorea-তে বর্তমান নিয়ম দেখে নিন।',
        },
        links: [KR_HIKOREA],
      },
    ],
  },

  // 04 · Universities: where to check a university's real figures
  universities: {
    blocks: [
      {
        id: 'kr-official-lists',
        title: { en: "Checking a university's official figures", bn: 'University-র official তথ্য কোথায় দেখবেন' },
        guidance: {
          en: 'Exact tuition and public information on every Korean university are published on the Higher Education in Korea website (Academyinfo).',
          bn: 'প্রতিটি Korean university-র সঠিক tuition ও public তথ্য Higher Education in Korea (Academyinfo) website-এ প্রকাশ করা হয়।',
        },
        links: [KR_ACADEMYINFO],
      },
    ],
  },
};

/** Language requirements each pathway carries (shown first in the guide's language section). */
export const KR_LANGUAGE_LANGUAGE: SectionFact[] = [
  {
    label: { en: 'Levels taught', bn: 'কোন level পড়ানো হয়' },
    fact: f('Regular programs run in steps from an Introduction to Hangeul, through Beginner and Intermediate, to Advanced and an In-depth level that prepares for university study.'),
  },
];

/**
 * Planning estimates (C2.4), always labelled "Estimate". Low / high are the guidebook's own range;
 * "typical" is simply the middle of that range, and the basis says so.
 */
const EST = { estimatedAt: '2026-09-27', reviewAt: '2027-03-27', currency: 'KRW', sources: [G] };
const mid = (low: number, high: number) => ({ low, typical: (low + high) / 2, high });
const basis = (en: string, bn: string) => ({
  en: `${en} Range from the Ministry of Education / NIIED guidebook; the middle figure is simply the midpoint.`,
  bn: `${bn} Range-টি Ministry of Education / NIIED guidebook থেকে; মাঝের অঙ্কটি শুধু range-এর মাঝামাঝি।`,
});
export const KR_ESTIMATES: CostEstimate[] = [
  { id: 'kr-tuition-bachelors', category: 'tuition', period: 'semester', ...mid(5_000_000, 7_000_000), ...EST, appliesTo: { pathways: ['degree'], degreeLevels: ['bachelors'] }, basis: basis("Bachelor's tuition per semester.", "Bachelor's tuition, প্রতি semester।") },
  { id: 'kr-tuition-masters', category: 'tuition', period: 'semester', ...mid(6_000_000, 8_000_000), ...EST, appliesTo: { pathways: ['degree'], degreeLevels: ['masters'] }, basis: basis("Master's tuition per semester.", "Master's tuition, প্রতি semester।") },
  { id: 'kr-tuition-phd', category: 'tuition', period: 'semester', ...mid(7_000_000, 9_000_000), ...EST, appliesTo: { pathways: ['degree'], degreeLevels: ['phd'] }, basis: basis('Doctoral tuition per semester.', 'PhD tuition, প্রতি semester।') },
  { id: 'kr-living-month', category: 'living', period: 'month', ...mid(750_000, 1_000_000), ...EST, basis: basis('Average monthly living cost for international students.', 'International student-দের মাসিক গড় থাকা-খাওয়ার খরচ।') },
];

export const KR_C21_SOURCES: SourceRef[] = [G, KR_TOPIK, KR_ACADEMYINFO];

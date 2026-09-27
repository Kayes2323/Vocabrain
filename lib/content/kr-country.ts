import type { CountrySection, CountrySectionId, SectionFact, SourceRef } from '@/lib/models';
import { KR_ACADEMYINFO, KR_NIIED_GUIDEBOOK, KR_TOPIK, krFact } from './kr-sources';

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

export const KR_C21_SOURCES: SourceRef[] = [G, KR_TOPIK, KR_ACADEMYINFO];

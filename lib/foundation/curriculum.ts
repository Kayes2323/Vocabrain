// The Mino IELTS curriculum: one learning path from "What is IELTS?" to
// "Target Ready". It only ORDERS existing lessons and features — every lesson
// id below lives in its module (modules stay the reference library), nothing
// is duplicated. Continue Learning, the IELTS page, Home's journey card,
// Today's Learning and Mino all read this one path.
//
// Order: sentence → word classes (noun, pronoun, verb) → articles → basic
// tenses → agreement → describing words → prepositions → perfect tenses →
// linking → complex sentences → punctuation → common errors. This follows the
// usual A1 → B1 progression (present/past simple and articles early; present
// perfect, relative clauses and linking later) — a sound order, not the only one.
import { findLesson } from './content';
import type { L } from './model';

const l = (en: string, bn: string): L => ({ en, bn });

export const CURRICULUM_STAGE_IDS = ['start-here', 'english-foundation', 'ielts-basics', 'skill-building', 'practice', 'mock-tests', 'target-ready'] as const;
export type CurriculumStageId = (typeof CURRICULUM_STAGE_IDS)[number];

/** How a link step is checked off (from stored data only). */
export type StepCheck = 'foundation-check' | 'band-estimate' | 'grammar-practice' | 'vocabulary' | 'reading' | 'writing' | 'speaking' | 'mock' | 'target';

export interface CurriculumStep {
  id: string;
  title: L;
  /** One line: why this comes now. */
  why: L;
  /** Lessons in teaching order (ids from the modules). */
  lessons?: string[];
  /** A feature to use instead of lessons (practice, tests...). */
  href?: string;
  check?: StepCheck;
  /** Recommended but not needed to finish the stage. */
  optional?: boolean;
  /** Runs alongside the main path (Vocabulary Foundation). */
  parallel?: boolean;
}

export interface CurriculumStage {
  id: CurriculumStageId;
  /** Level 0–6. */
  level: number;
  title: L;
  goal: L;
  steps: CurriculumStep[];
}

const range = (prefix: string, from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => `${prefix}-${from + i}`);

export const CURRICULUM: CurriculumStage[] = [
  {
    id: 'start-here',
    level: 0,
    title: l('Start Here', 'এখান থেকে শুরু'),
    goal: l(
      'What IELTS is, why it matters, which version you need, how the test works and how Band Scores are given.',
      'IELTS কী, কেন দরকার, আপনার কোন version লাগবে, test কীভাবে হয় আর Band Score কীভাবে দেওয়া হয়।',
    ),
    steps: [
      { id: 'what-is-ielts', title: l('What IELTS is: Academic and General Training', 'IELTS কী: Academic আর General Training'), why: l('Know which test you are preparing for.', 'কোন test-এর জন্য প্রস্তুতি নিচ্ছেন, আগে সেটা জানুন।'), lessons: ['ib-1'] },
      { id: 'test-format', title: l('The four skills and the test format', 'চারটি skill আর test-এর format'), why: l('Listening, Reading, Writing, Speaking — timing and order.', 'Listening, Reading, Writing, Speaking — সময় আর ক্রম।'), lessons: ['ib-2', 'ib-3'] },
      { id: 'band-scores', title: l('How Band Scores work', 'Band Score কীভাবে কাজ করে'), why: l('So your target means something concrete.', 'যাতে আপনার target একটা স্পষ্ট লক্ষ্য হয়।'), lessons: ['ib-4'] },
      {
        id: 'english-check',
        title: l('Check your English level', 'আপনার English level যাচাই করুন'),
        why: l('A short check; lessons you already know are skipped.', 'ছোট একটা check; যা আগে থেকে জানেন, সেই lesson বাদ যাবে।'),
        href: '/ielts/foundation/diagnostic',
        check: 'foundation-check',
        optional: true,
      },
    ],
  },
  {
    id: 'english-foundation',
    level: 1,
    title: l('English Foundation', 'English Foundation'),
    goal: l('The grammar every IELTS answer is built on, from a simple sentence to error-free writing.', 'প্রতিটি IELTS উত্তরের ভিত্তি যে grammar — সহজ sentence থেকে ভুলহীন লেখা পর্যন্ত।'),
    steps: [
      { id: 'sentences', title: l('Sentences: subject, verb, object', 'Sentence: subject, verb, object'), why: l('Every other topic builds on a complete sentence.', 'বাকি সব topic একটি সম্পূর্ণ sentence-এর ওপর দাঁড়ায়।'), lessons: range('sb', 1, 5) },
      { id: 'parts-of-speech', title: l('Parts of speech: the big picture', 'Parts of speech: পুরো ছবি'), why: l('Name the job each word does.', 'প্রতিটি শব্দ কী কাজ করে, তার নাম জানুন।'), lessons: ['po-1'] },
      { id: 'nouns', title: l('Nouns', 'Noun'), why: l('Subjects and objects are nouns.', 'Subject আর object সাধারণত noun।'), lessons: range('pn', 1, 4) },
      { id: 'pronouns', title: l('Pronouns', 'Pronoun'), why: l('Replace nouns without repeating them.', 'একই noun বারবার না বলে তার জায়গায় বসান।'), lessons: range('ppr', 1, 3) },
      { id: 'verbs', title: l('Verbs, including helping verbs', 'Verb, helping verb সহ'), why: l('The verb carries time, questions and negatives.', 'সময়, প্রশ্ন আর negative — সব verb-এর মাধ্যমে আসে।'), lessons: range('pvb', 1, 5) },
      { id: 'sentence-patterns', title: l('Simple and compound sentences', 'Simple আর compound sentence'), why: l('Join two ideas correctly.', 'দুটি idea ঠিকভাবে যুক্ত করুন।'), lessons: ['sb-6', 'sb-7'] },
      { id: 'articles', title: l('Articles: a, an, the', 'Article: a, an, the'), why: l('One of the most frequent errors in IELTS writing.', 'IELTS writing-এ সবচেয়ে বেশি হওয়া ভুলগুলোর একটি।'), lessons: range('ar', 1, 9) },
      {
        id: 'tenses-core',
        title: l('Core tenses: present, past, future', 'মূল tense: present, past, future'),
        why: l('Talk about habits, now, the past and plans.', 'অভ্যাস, এখন, অতীত আর পরিকল্পনা নিয়ে বলুন।'),
        lessons: ['t-1', 't-2', 't-3', 't-4', 't-5', 't-8'],
      },
      { id: 'agreement', title: l('Subject–verb agreement', 'Subject–verb agreement'), why: l('He goes, they go — needed in every sentence.', 'He goes, they go — প্রতিটি sentence-এ লাগে।'), lessons: range('sva', 1, 9) },
      { id: 'adjectives', title: l('Adjectives', 'Adjective'), why: l('Describe things precisely.', 'কোনো কিছু নিখুঁতভাবে বর্ণনা করুন।'), lessons: range('pa', 1, 4) },
      { id: 'adverbs', title: l('Adverbs', 'Adverb'), why: l('Describe how, when and how much.', 'কীভাবে, কখন, কতটা — বর্ণনা করুন।'), lessons: range('pv', 1, 4) },
      { id: 'word-forms', title: l('Word forms', 'Word form'), why: l('Choose between develop, development and developing.', 'develop, development, developing — ঠিকটা বেছে নিন।'), lessons: range('pf', 1, 5) },
      { id: 'prepositions', title: l('Prepositions', 'Preposition'), why: l('Time, place and fixed partners like "depend on".', 'সময়, স্থান আর "depend on"-এর মতো নির্দিষ্ট জোড়া।'), lessons: [...range('ppp', 1, 3), ...range('pr', 1, 9)] },
      {
        id: 'tenses-more',
        title: l('More tenses: perfect forms and tenses in IELTS', 'আরও tense: perfect form আর IELTS-এ tense'),
        why: l('Link past and present, then use tenses in Writing and Speaking.', 'অতীত আর বর্তমান যুক্ত করুন, তারপর Writing ও Speaking-এ tense ব্যবহার করুন।'),
        lessons: ['t-6', 't-13', 't-7', 't-14', 't-9', 't-10', 't-11', 't-15', 't-12'],
      },
      { id: 'connectors', title: l('Connectors and conjunctions', 'Connector আর conjunction'), why: l('Link ideas — part of how Writing is marked.', 'Idea যুক্ত করুন — Writing-এর নম্বরের একটা অংশ।'), lessons: [...range('pcj', 1, 3), ...range('cn', 1, 9)] },
      { id: 'interjections', title: l('Interjections', 'Interjection'), why: l('The last word class, and when not to use it.', 'শেষ word class, আর কখন ব্যবহার করবেন না।'), lessons: ['pij-1'] },
      {
        id: 'complex-sentences',
        title: l('Complex sentences', 'Complex sentence'),
        why: l('Because, although, which, if — the range examiners look for.', 'because, although, which, if — examiner যে বৈচিত্র্য খোঁজেন।'),
        lessons: ['sb-8', ...range('cx', 1, 9), 'sb-9'],
      },
      { id: 'punctuation', title: l('Punctuation', 'Punctuation'), why: l('Clear sentences on paper and on screen.', 'কাগজে আর screen-এ পরিষ্কার sentence।'), lessons: range('pu', 1, 9) },
      { id: 'grammar-labs', title: l('Grammar mistake labs', 'Grammar mistake lab'), why: l('Find and fix mixed mistakes.', 'মিশ্র ভুল খুঁজে ঠিক করুন।'), lessons: range('pl', 1, 8) },
      { id: 'common-errors', title: l('Common errors and review', 'সাধারণ ভুল আর review'), why: l('The mistakes Bangla speakers make most — a final review.', 'বাংলাভাষীরা সবচেয়ে বেশি যে ভুল করেন — শেষ review।'), lessons: range('ce', 1, 9) },
      {
        id: 'vocabulary-foundation',
        title: l('Vocabulary Foundation', 'Vocabulary Foundation'),
        why: l('Runs alongside grammar: how to learn, remember and use words.', 'Grammar-এর পাশাপাশি চলে: শব্দ কীভাবে শিখবেন, মনে রাখবেন আর ব্যবহার করবেন।'),
        lessons: range('vc', 1, 9),
        parallel: true,
      },
    ],
  },
  {
    id: 'ielts-basics',
    level: 2,
    title: l('IELTS Basics', 'IELTS Basics'),
    goal: l('How each skill is tested and marked, the question types, and a realistic target.', 'প্রতিটি skill কীভাবে test আর মূল্যায়ন হয়, প্রশ্নের ধরন, আর বাস্তব target।'),
    steps: [
      { id: 'marking', title: l('How each skill is marked', 'প্রতিটি skill কীভাবে নম্বর পায়'), why: l('Know what examiners reward.', 'Examiner কীসে নম্বর দেন, জানুন।'), lessons: ['ib-5'] },
      {
        id: 'band-estimate',
        title: l('Estimate your band per skill', 'প্রতিটি skill-এ আপনার band আন্দাজ করুন'),
        why: l('A starting point for your plan (an estimate, not a score).', 'আপনার plan-এর শুরু (আন্দাজ, আসল score নয়)।'),
        href: '/ielts/diagnostic',
        check: 'band-estimate',
        optional: true,
      },
      { id: 'targets', title: l('Targets, myths and your plan', 'Target, ভুল ধারণা আর আপনার plan'), why: l('Set a target you can reach.', 'অর্জনযোগ্য target ঠিক করুন।'), lessons: ['ib-6', 'ib-7', 'ib-8', 'ib-9'] },
      { id: 'listening-basics', title: l('Listening basics', 'Listening basics'), why: l('How the Listening test works.', 'Listening test কীভাবে হয়।'), lessons: ['ls-1'] },
      { id: 'reading-basics', title: l('Reading basics', 'Reading basics'), why: l('Skimming, scanning and paraphrase.', 'Skimming, scanning আর paraphrase।'), lessons: ['rd-1', 'rd-2'] },
      { id: 'writing-basics', title: l('Writing basics', 'Writing basics'), why: l('Task 1, Task 2 and how they are marked.', 'Task 1, Task 2 আর কীভাবে নম্বর দেওয়া হয়।'), lessons: ['wr-1'] },
      { id: 'speaking-basics', title: l('Speaking basics', 'Speaking basics'), why: l('The three parts and how they are marked.', 'তিনটি part আর কীভাবে নম্বর দেওয়া হয়।'), lessons: ['sp-1'] },
    ],
  },
  {
    id: 'skill-building',
    level: 3,
    title: l('Skill Building', 'Skill Building'),
    goal: l('Each part and question type of the four skills, with strategies and traps.', 'চারটি skill-এর প্রতিটি part আর প্রশ্নের ধরন — strategy আর ফাঁদ সহ।'),
    steps: [
      { id: 'listening-skills', title: l('Listening skills', 'Listening skill'), why: l('Parts 1–4, question types, traps.', 'Part 1–4, প্রশ্নের ধরন, ফাঁদ।'), lessons: range('ls', 2, 9) },
      { id: 'reading-skills', title: l('Reading skills', 'Reading skill'), why: l('True/False/Not Given, headings, matching.', 'True/False/Not Given, heading, matching।'), lessons: range('rd', 3, 9) },
      { id: 'writing-skills', title: l('Writing skills', 'Writing skill'), why: l('Task 1 data, Task 2 essays, cohesion.', 'Task 1 data, Task 2 essay, cohesion।'), lessons: range('wr', 2, 9) },
      { id: 'speaking-skills', title: l('Speaking skills', 'Speaking skill'), why: l('Parts 1–3, fluency, pronunciation.', 'Part 1–3, fluency, pronunciation।'), lessons: range('sp', 2, 9) },
      { id: 'grammar-in-ielts', title: l('Grammar and word classes in IELTS', 'IELTS-এ grammar আর word class'), why: l('Use what you learnt in real tasks.', 'যা শিখেছেন, আসল task-এ ব্যবহার করুন।'), lessons: range('pie', 1, 9) },
    ],
  },
  {
    id: 'practice',
    level: 4,
    title: l('Practice', 'Practice'),
    goal: l('Regular practice in every skill. Five sessions of each finish this stage.', 'প্রতিটি skill-এ নিয়মিত practice। প্রতিটির পাঁচটি session হলে এই stage শেষ।'),
    steps: [
      { id: 'grammar-practice', title: l('Grammar practice', 'Grammar practice'), why: l('Reviews and quizzes on your own mistakes.', 'আপনার নিজের ভুল থেকে review আর quiz।'), href: '/ielts/foundation', check: 'grammar-practice' },
      { id: 'vocabulary-recall', title: l('Vocabulary recall', 'Vocabulary recall'), why: l('Recall saved words on schedule.', 'Save করা শব্দ নির্দিষ্ট সময়ে মনে করুন।'), href: '/review', check: 'vocabulary' },
      { id: 'reading-practice', title: l('Reading practice', 'Reading practice'), why: l('One passage with questions.', 'প্রশ্নসহ একটি passage।'), href: '/ielts/reading', check: 'reading' },
      { id: 'listening-practice', title: l('Listening practice', 'Listening practice'), why: l('Practice test sections.', 'Practice test-এর section।'), href: '/ielts/tests' },
      { id: 'writing-practice', title: l('Writing practice', 'Writing practice'), why: l('Short writing with feedback.', 'Feedback সহ ছোট লেখা।'), href: '/practice/writing', check: 'writing' },
      { id: 'speaking-practice', title: l('Speaking practice', 'Speaking practice'), why: l('Answer a prompt out loud.', 'একটি prompt-এর উত্তর জোরে বলুন।'), href: '/practice/speaking', check: 'speaking' },
    ],
  },
  {
    id: 'mock-tests',
    level: 5,
    title: l('Mock Tests', 'Mock Test'),
    goal: l('Full timed tests to check readiness and stamina.', 'প্রস্তুতি আর ধৈর্য যাচাইয়ে পূর্ণ সময়ের test।'),
    steps: [
      { id: 'practice-tests', title: l('Practice tests', 'Practice test'), why: l('Timed tests with explanations.', 'Explanation সহ সময় ধরা test।'), href: '/ielts/tests', check: 'mock' },
      { id: 'band-calculator', title: l('Band calculator', 'Band calculator'), why: l('Turn raw scores into a band.', 'Raw score থেকে band বের করুন।'), href: '/ielts/band-calculator', optional: true },
    ],
  },
  {
    id: 'target-ready',
    level: 6,
    title: l('Target Ready', 'Target Ready'),
    goal: l('Your current bands meet your target — based on your results, never a promise.', 'আপনার বর্তমান band আপনার target ছুঁয়েছে — ফলাফলের ভিত্তিতে, কোনো প্রতিশ্রুতি নয়।'),
    steps: [
      { id: 'target', title: l('Bands compared with your target', 'Target-এর সঙ্গে আপনার band'), why: l('See which skills still need work.', 'কোন skill-এ এখনো কাজ বাকি, দেখুন।'), href: '/ielts/plan', check: 'target' },
    ],
  },
];

export const getStage = (id: CurriculumStageId) => CURRICULUM.find((s) => s.id === id)!;

/** Lessons of a stage that count towards finishing it (main path only). */
export const stageLessons = (stage: CurriculumStage) => stage.steps.filter((s) => !s.parallel).flatMap((s) => s.lessons ?? []);

/** The main path in order: every lesson Continue Learning walks through. */
export const PATH_LESSONS: string[] = CURRICULUM.flatMap(stageLessons);
/** Lessons on the parallel track (offered after the main path, never blocking it). */
export const PARALLEL_LESSONS: string[] = CURRICULUM.flatMap((st) => st.steps.filter((s) => s.parallel).flatMap((s) => s.lessons ?? []));

/** Where a lesson sits in the curriculum. */
export function lessonPlace(lessonId: string): { stage: CurriculumStage; step: CurriculumStep } | undefined {
  for (const stage of CURRICULUM) {
    const step = stage.steps.find((s) => s.lessons?.includes(lessonId));
    if (step) return { stage, step };
  }
  return undefined;
}

/** Every curriculum lesson id must exist, appear once, and every module lesson must be placed. */
export function validateCurriculum(allLessonIds: string[]): string[] {
  const errors: string[] = [];
  const placed = [...PATH_LESSONS, ...PARALLEL_LESSONS];
  const seen = new Set<string>();
  for (const id of placed) {
    if (!findLesson(id)) errors.push(`curriculum: unknown lesson ${id}`);
    if (seen.has(id)) errors.push(`curriculum: lesson ${id} placed twice`);
    seen.add(id);
  }
  for (const id of allLessonIds) if (!seen.has(id)) errors.push(`curriculum: lesson ${id} is not placed`);
  return errors;
}

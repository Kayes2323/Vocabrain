// The Mino IELTS curriculum: one learning path from "What is IELTS?" to
// "Target Ready". It only ORDERS existing lessons and features — every lesson
// id below lives in its module (modules stay the reference library), nothing
// is duplicated. Continue Learning, the IELTS page, Home's journey card,
// Today's Learning and Mino all read this one path.
//
// Level 0 (Start Here) teaches the test before the English: what IELTS is,
// why you need it, IELTS Academic (Mino prepares students for Academic only),
// the four skills, the test structure, Band Scores and how to prepare.
//
// English Foundation is 24 topics in a usable-English order, checked against
// the CEFR-based British Council–EAQUALS Core Inventory: sentences → word
// classes → verbs and helping verbs → simple sentences → negatives and
// questions → articles → the A1 tenses (present simple, present continuous,
// past simple, future) → agreement → adjectives, adverbs, prepositions →
// connectors → compound and complex sentences → the A2/B1 tenses (past
// continuous, perfect forms) and tense review → punctuation → common errors →
// review. Grammar detail comes after students have met it in use.
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
    title: l('IELTS Basics: Start Here', 'IELTS Basics: এখান থেকে শুরু'),
    goal: l(
      'What IELTS is, why you need it, what IELTS Academic is, the four skills, how the test is built, how Band Scores work and how to prepare.',
      'IELTS কী, কেন লাগে, IELTS Academic কী, চারটি skill, test কীভাবে সাজানো, Band Score কীভাবে কাজ করে আর কীভাবে প্রস্তুতি নেবেন।',
    ),
    steps: [
      { id: 'what-is-ielts', title: l('What is IELTS?', 'IELTS কী?'), why: l('An English test of four skills, scored in bands.', 'চারটি skill-এর English test, band-এ নম্বর।'), lessons: ['ib-10'] },
      { id: 'why-ielts', title: l('Why do you need IELTS?', 'IELTS কেন লাগে?'), why: l('Proof of English for your university — and your target.', 'University-র জন্য English-এর প্রমাণ — আর আপনার target।'), lessons: ['ib-11'] },
      { id: 'academic-ielts', title: l('What is Academic IELTS?', 'Academic IELTS কী?'), why: l('The version for university study.', 'University-তে পড়ার version।'), lessons: ['ib-1'] },
      { id: 'four-skills', title: l('The four skills', 'IELTS-এর চারটি skill'), why: l('Listening, Reading, Writing, Speaking — parts and timing.', 'Listening, Reading, Writing, Speaking — part আর সময়।'), lessons: ['ib-2'] },
      { id: 'test-structure', title: l('IELTS test structure', 'IELTS test-এর গঠন'), why: l('Test day on computer or paper.', 'Computer বা paper-এ test-এর দিন।'), lessons: ['ib-3'] },
      { id: 'band-scores', title: l('How Band Scores work', 'Band Score কীভাবে কাজ করে'), why: l('Bands, the overall score and how each skill is marked.', 'Band, overall score আর প্রতিটি skill-এর নম্বর।'), lessons: ['ib-4', 'ib-5'] },
      { id: 'how-to-prepare', title: l('How to prepare for IELTS', 'IELTS-এর প্রস্তুতি কীভাবে নেবেন'), why: l('Targets, myths and your plan.', 'Target, ভুল ধারণা আর আপনার plan।'), lessons: ['ib-6', 'ib-7', 'ib-8', 'ib-9'] },
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
    goal: l(
      'Usable English, step by step: how sentences work → words and verbs → questions and negatives → the everyday tenses → describing and linking ideas → longer sentences → accuracy.',
      'ধাপে ধাপে ব্যবহারযোগ্য English: sentence কীভাবে কাজ করে → word আর verb → প্রশ্ন আর negative → প্রতিদিনের tense → বর্ণনা আর idea যুক্ত করা → লম্বা sentence → নির্ভুলতা।',
    ),
    steps: [
      { id: 'sentence-basics', title: l('How English Sentences Work', 'English Sentence কীভাবে কাজ করে'), why: l('Sentence, subject, verb, object — start here.', 'Sentence, subject, verb, object — এখান থেকে শুরু।'), lessons: range('sb', 1, 5) },
      { id: 'parts-of-speech', title: l('Parts of Speech', 'Parts of Speech'), why: l('The job each word does — a first look.', 'প্রতিটি শব্দ কী কাজ করে — প্রথম পরিচয়।'), lessons: ['po-1'] },
      { id: 'noun', title: l('Nouns', 'Noun'), why: l('Names of people, things, places and ideas.', 'মানুষ, বস্তু, জায়গা আর ধারণার নাম।'), lessons: range('pn', 1, 4) },
      { id: 'pronoun', title: l('Pronouns', 'Pronoun'), why: l('Replace a noun instead of repeating it.', 'Noun বারবার না বলে তার জায়গায় বসে।'), lessons: range('ppr', 1, 3) },
      { id: 'verbs', title: l('Verbs', 'Verb'), why: l('Action and state words, and their forms.', 'কাজ আর অবস্থার শব্দ, আর তাদের form।'), lessons: ['pvb-1', 'pvb-3'] },
      { id: 'helping-verbs', title: l('Helping Verbs', 'Helping Verb'), why: l('be, do, have and can — and verbs in IELTS.', 'be, do, have আর can — আর IELTS-এ verb।'), lessons: ['pvb-2', 'pvb-4', 'pvb-5'] },
      { id: 'subject-verb-object', title: l('Subject + Verb + Object', 'Subject + Verb + Object'), why: l('Build complete simple sentences.', 'পূর্ণ simple sentence তৈরি করুন।'), lessons: ['sb-6'] },
      { id: 'statements-negatives-questions', title: l('Statements, Negatives & Questions', 'Statement, Negative ও প্রশ্ন'), why: l('One sentence, three shapes.', 'একটা sentence, তিনটা রূপ।'), lessons: ['sb-10'] },
      { id: 'articles', title: l('Articles', 'Articles'), why: l('a, an, the — which one and when.', 'a, an, the — কখন কোনটা।'), lessons: range('ar', 1, 9) },
      { id: 'present-simple', title: l('Present Simple', 'Present Simple'), why: l('Time in English, then habits and facts.', 'English-এ সময়, তারপর অভ্যাস আর সত্য।'), lessons: ['t-1', 't-2'] },
      { id: 'present-continuous', title: l('Present Continuous', 'Present Continuous'), why: l('What is happening now.', 'এখন যা ঘটছে।'), lessons: ['t-3'] },
      { id: 'past-simple', title: l('Past Simple', 'Past Simple'), why: l('Finished actions in the past.', 'অতীতে শেষ হওয়া কাজ।'), lessons: ['t-4'] },
      { id: 'future-basics', title: l('Future Basics', 'Future Basics'), why: l('will, going to and plans.', 'will, going to আর পরিকল্পনা।'), lessons: ['t-8'] },
      { id: 'agreement', title: l('Subject–Verb Agreement', 'Subject–Verb Agreement'), why: l('He goes, they go — in every sentence.', 'He goes, they go — প্রতিটি sentence-এ।'), lessons: range('sva', 1, 9) },
      { id: 'adjectives', title: l('Adjectives', 'Adjective'), why: l('Describe and compare.', 'বর্ণনা আর তুলনা।'), lessons: range('pa', 1, 4) },
      { id: 'adverbs', title: l('Adverbs', 'Adverb'), why: l('How, when and how often — then word forms.', 'কীভাবে, কখন, কতবার — তারপর word form।'), lessons: [...range('pv', 1, 4), ...range('pf', 1, 5)] },
      { id: 'prepositions', title: l('Prepositions', 'Prepositions'), why: l('Time, place and partners like "depend on".', 'সময়, জায়গা আর "depend on"-এর মতো জোড়া।'), lessons: [...range('ppp', 1, 3), ...range('pr', 1, 9)] },
      { id: 'connectors', title: l('Connectors', 'Connectors'), why: l('Words that link ideas.', 'Idea যুক্ত করার শব্দ।'), lessons: [...range('pcj', 1, 3), ...range('cn', 1, 9), 'pij-1'] },
      { id: 'compound-sentences', title: l('Compound Sentences', 'Compound Sentence'), why: l('Join two ideas with and, but, so.', 'and, but, so দিয়ে দুটি idea যুক্ত করুন।'), lessons: ['sb-7'] },
      { id: 'complex-sentences', title: l('Complex Sentences', 'Complex Sentence'), why: l('because, although, which, if.', 'because, although, which, if।'), lessons: ['sb-8', ...range('cx', 1, 9), 'sb-9'] },
      {
        id: 'tenses',
        title: l('More Tenses & Tense Review', 'আরও Tense ও Tense Review'),
        why: l('Past continuous, the perfect tenses, then tenses in IELTS.', 'Past continuous, perfect tense, তারপর IELTS-এ tense।'),
        lessons: ['t-5', 't-6', 't-13', 't-7', 't-14', 't-9', 't-10', 't-11', 't-15', 't-12'],
      },
      { id: 'punctuation', title: l('Punctuation & Capitalisation', 'Punctuation ও Capitalisation'), why: l('Commas, full stops and capital letters.', 'Comma, full stop আর capital letter।'), lessons: range('pu', 1, 9) },
      { id: 'common-errors', title: l('Common Errors', 'Common Errors'), why: l('The mistakes Bangla speakers make most.', 'বাংলাভাষীদের সবচেয়ে সাধারণ ভুল।'), lessons: range('ce', 1, 9) },
      { id: 'foundation-review', title: l('Foundation Review', 'Foundation Review'), why: l('Find and fix mixed mistakes.', 'মিশ্র ভুল খুঁজে ঠিক করুন।'), lessons: range('pl', 1, 8) },
      {
        id: 'vocabulary-foundation',
        title: l('Vocabulary Foundation', 'Vocabulary Foundation'),
        why: l('Alongside grammar: learn, remember and use words.', 'Grammar-এর পাশাপাশি: শব্দ শেখা, মনে রাখা, ব্যবহার।'),
        lessons: range('vc', 1, 9),
        parallel: true,
      },
    ],
  },
  {
    id: 'ielts-basics',
    level: 2,
    title: l('IELTS Skills Explained', 'IELTS Skill পরিচিতি'),
    goal: l('How each skill is tested: the parts, the question types and a first band estimate.', 'প্রতিটি skill কীভাবে test হয়: part, প্রশ্নের ধরন আর প্রথম band আন্দাজ।'),
    steps: [
      {
        id: 'band-estimate',
        title: l('Estimate your band per skill', 'প্রতিটি skill-এ আপনার band আন্দাজ করুন'),
        why: l('A starting point for your plan (an estimate, not a score).', 'আপনার plan-এর শুরু (আন্দাজ, আসল score নয়)।'),
        href: '/ielts/diagnostic',
        check: 'band-estimate',
        optional: true,
      },
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

// ---------------------------------------------------------------- Foundation topics (routes)
// Each English Foundation step is a topic page: /ielts/foundation/<topic>,
// and each of its lessons has a page: /ielts/foundation/<topic>/<lesson-slug>.

/** Stages whose steps are topic pages: Start Here (Level 0) and English Foundation (Level 1). */
export const TOPIC_STAGES: CurriculumStageId[] = ['start-here', 'english-foundation'];
export const FOUNDATION_TOPICS: CurriculumStep[] = CURRICULUM.filter((s) => TOPIC_STAGES.includes(s.id)).flatMap((s) => s.steps.filter((st) => st.lessons?.length));

/** Old topic ids (before the Phase 5 order) → the topic their first lessons moved to. */
export const LEGACY_TOPICS: Record<string, string> = {
  'verb-helping-verbs': 'verbs',
  'simple-compound-sentences': 'subject-verb-object',
  'adjectives-adverbs': 'adjectives',
};

export const getTopic = (slug: string) => FOUNDATION_TOPICS.find((t) => t.id === slug);

/** The Start Here / English Foundation topic a lesson belongs to. */
export const topicOfLesson = (lessonId: string) => FOUNDATION_TOPICS.find((t) => t.lessons?.includes(lessonId));

/** A readable URL part from the lesson's English title ("The verb" → "verb"). */
export function lessonSlug(lessonId: string): string {
  const title = findLesson(lessonId)?.lesson.title.en ?? lessonId;
  const slug = title
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const trimmed = slug.replace(/^the-(?=.)/, '');
  return trimmed || lessonId;
}

export const lessonBySlug = (topic: CurriculumStep, slug: string) => topic.lessons?.find((id) => lessonSlug(id) === slug);

/** A lesson by its slug in any topic (for links saved before a lesson moved topic). */
export const lessonBySlugAnywhere = (slug: string) => FOUNDATION_TOPICS.flatMap((t) => t.lessons ?? []).find((id) => lessonSlug(id) === slug);

export const topicHref = (topic: CurriculumStep) => `/ielts/foundation/${topic.id}`;

/** A lesson's page inside its topic, or the plain lesson page for lessons outside English Foundation. */
export function lessonHref(lessonId: string): string {
  const topic = topicOfLesson(lessonId);
  return topic ? `${topicHref(topic)}/${lessonSlug(lessonId)}` : `/ielts/foundation/lesson/${lessonId}`;
}

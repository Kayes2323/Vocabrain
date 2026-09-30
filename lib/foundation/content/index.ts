// The IELTS Foundation course catalogue. Levels 1–2 are taught here; levels
// 3–5 hand over to features that already exist (practice, tests, mock tests).
// A module with only `planned` lessons shows as "Soon" (never as available).
import type { Concept, L, Lesson, Level, Module } from '../model';
import { sentenceBasicsLessons } from './sentence-basics';
import { TENSE_CONCEPTS, tensesLessons } from './tenses';
import { tensesLessons2 } from './tenses-2';
import { presentSimpleV2, understandingTime } from './tenses-v2';
import { futureFormsV2, pastContinuousV2, pastPerfectV2, pastSimpleV2, presentContinuousV2, presentPerfectV2 } from './tenses-core';
import { tenseMistakesV2, tensesSpeakingV2, tensesWritingV2 } from './tenses-apply';
import { presentPerfectContinuous, tenseComparisons, tensesMixedPractice } from './tenses-new';
import { POS_CONCEPTS, POS_LESSONS, POS_PLANNED, POS_UNITS } from './pos-units';
import { aAnMeaning, aOrAn, ARTICLE_CONCEPTS, theArticle, zeroArticle } from './articles';
import { articleChoice, articleMistakes, articlesInIelts, articlesMixed, articlesReview } from './articles-apply';
import { AGREEMENT_CONCEPTS, svaBasics, svaCompound, svaIndefinite, svaLongSubjects, svaQuantity } from './agreement';
import { svaInIelts, svaMistakes, svaMixed, svaReview } from './agreement-apply';
import { PREPOSITION_CONCEPTS, prepData, prepDuration, prepMovement, prepPartners, prepPlace, prepTime } from './prepositions';
import { prepInIelts, prepMistakes, prepReview } from './prepositions-apply';
import { CONNECTOR_CONCEPTS, connAdd, connCause, connCohesion, connContrast, connExample, connGrammar } from './connectors';
import { connInIelts, connMistakes, connReview } from './connectors-apply';
import { COMPLEX_CONCEPTS, cxClauses, cxNounClauses, cxReasonPurpose, cxRelative, cxRelativeComma, cxTimeIf } from './complex';
import { cxInIelts, cxMistakes, cxReview } from './complex-apply';
import { PUNCTUATION_CONCEPTS, pnApostrophes, pnCapitals, pnColonsParagraphs, pnCommaErrors, pnCommas, pnEndMarks } from './punctuation';
import { pnMistakes, pnProofread, pnReview } from './punctuation-apply';
import { ceCollocation, ceCountable, ceNatural, cePlural, ceTranslation, ceWordPairs, COMMON_ERROR_CONCEPTS } from './common-errors';
import { ceHabits, ceInIelts, ceReview } from './common-errors-apply';
import { VOCABULARY_CONCEPTS, vcContext, vcKnowWord, vcParaphrase, vcPrecise, vcRegister, vcUseWords } from './vocabulary';
import { vcHabits, vcInIelts, vcReview } from './vocabulary-apply';
import { IELTS_INTRO_CONCEPTS, ibBands, ibDelivery, ibFormat, ibMarking, ibPlan, ibVersions } from './ielts-intro';
import { ibMyths, ibReview, ibYourPlan } from './ielts-intro-apply';
import { IELTS_START_CONCEPTS, ibWhat, ibWhy } from './ielts-start';
import { SENTENCE_QUESTION_CONCEPTS, sbQuestions } from './sentence-questions';
import { LISTENING_CONCEPTS, lsFormat, lsPart1, lsPart2, lsPart3, lsPart4, lsRules } from './listening';
import { lsReview, lsStrategy, lsTraps } from './listening-apply';
import { READING_CONCEPTS, rdChoice, rdCompletion, rdHeadings, rdParaphrase, rdSkim, rdTfng } from './reading';
import { rdReview, rdStrategy, rdTraps } from './reading-apply';
import { WRITING_CONCEPTS, wrCohesion, wrData, wrFormat, wrOverview, wrParagraphs, wrQuestion } from './writing';
import { wrPlan, wrReview, wrTraps } from './writing-apply';
import { SPEAKING_CONCEPTS, spFluency, spFormat, spPart1, spPart2, spPart3, spPronunciation } from './speaking';
import { spPlan, spReview, spTraps } from './speaking-apply';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: { en: 'Foundation Grammar', bn: 'Foundation Grammar' },
    description: { en: 'The English you need before IELTS: sentences, tenses, grammar and vocabulary habits.', bn: 'IELTS শুরুর আগে যে English লাগে: sentence, tense, grammar আর vocabulary-র অভ্যাস।' },
  },
  {
    id: 2,
    title: { en: 'IELTS Basics', bn: 'IELTS Basics' },
    description: { en: 'How IELTS works: the test, Band Scores, and each skill explained.', bn: 'IELTS কীভাবে কাজ করে: test, Band Score আর প্রতিটা skill।' },
  },
  {
    id: 3,
    title: { en: 'IELTS Skill Builder', bn: 'IELTS Skill Builder' },
    description: { en: 'Guided practice for each skill, based on your plan.', bn: 'আপনার plan অনুযায়ী প্রতিটা skill-এর guided practice।' },
    href: '/ielts/plan',
  },
  {
    id: 4,
    title: { en: 'IELTS Practice', bn: 'IELTS Practice' },
    description: { en: 'Timed practice tests with explanations.', bn: 'সময় ধরে practice test, explanation সহ।' },
    href: '/ielts/tests',
  },
  {
    id: 5,
    title: { en: 'IELTS Mock', bn: 'IELTS Mock' },
    description: { en: 'Full-length mock tests under test conditions.', bn: 'আসল test-এর মতো পরিবেশে full-length mock test।' },
    href: '/ielts/tests',
  },
];

const t = (en: string, bn: string): L => ({ en, bn });

export const MODULES: Module[] = [
  {
    id: 'sentence-basics',
    level: 1,
    number: 1,
    title: t('Sentence Basics', 'Sentence Basics'),
    description: t('Subject, verb, object and the three sentence types.', 'Subject, verb, object আর তিন ধরনের sentence।'),
    ieltsLink: t('Every Writing and Speaking answer is built from sentences; Reading gets easier when you can find the main subject and verb.', 'Writing আর Speaking-এর প্রতিটা answer sentence দিয়েই তৈরি; main subject আর verb খুঁজতে পারলে Reading সহজ হয়।'),
    skill: 'grammar',
    tags: ['sentence-structure', 'subject', 'verb', 'object'],
    lessons: [...sentenceBasicsLessons, sbQuestions],
  },
  {
    id: 'tenses',
    level: 1,
    number: 2,
    title: t('Tenses for IELTS', 'IELTS-এর জন্য Tenses'),
    short: t('Tenses', 'Tenses'),
    description: t('Tenses through IELTS tasks, not memorised tables.', 'মুখস্থ table না, IELTS task দিয়ে Tenses।'),
    ieltsLink: t('Task 1 past data, Speaking about experiences, time changes in Listening and Reading.', 'Task 1-এর past data, Speaking-এ অভিজ্ঞতার কথা, Listening আর Reading-এ সময়ের পরিবর্তন।'),
    skill: 'grammar',
    tags: ['tense'],
    lessons: [
      understandingTime, presentSimpleV2, presentContinuousV2, pastSimpleV2, pastContinuousV2, presentPerfectV2, presentPerfectContinuous,
      pastPerfectV2, futureFormsV2, tenseComparisons, tenseMistakesV2, tensesWritingV2, tensesSpeakingV2, tensesMixedPractice,
      ...tensesLessons, ...tensesLessons2,
    ],
  },
  {
    id: 'parts-of-speech',
    level: 1,
    number: 3,
    title: t('Parts of Speech', 'Parts of Speech'),
    short: t('Parts of Speech', 'Parts of Speech'),
    description: t('Words have different jobs. Learn those jobs, and English becomes easier.', 'প্রতিটা word-এর আলাদা কাজ আছে। কাজগুলো শিখে নিন, English অনেক সহজ হয়ে যাবে।'),
    ieltsLink: t('significant → significantly → significance: word forms affect Lexical Resource and completion answers.', 'significant → significantly → significance: word form Lexical Resource আর completion answer-এ প্রভাব ফেলে।'),
    skill: 'grammar',
    tags: ['word-form', 'part-of-speech', 'countable', 'plural'],
    units: POS_UNITS,
    lessons: POS_LESSONS,
    planned: POS_PLANNED,
  },
  {
    id: 'articles',
    level: 1,
    number: 4,
    title: t('Articles', 'Articles'),
    description: t('a, an, the and no article.', 'a, an, the আর article ছাড়া।'),
    ieltsLink: t('One of the most frequent errors in IELTS Writing.', 'IELTS Writing-এর সবচেয়ে বেশি হওয়া ভুলগুলোর একটা।'),
    skill: 'grammar',
    tags: ['article'],
    lessons: [aOrAn, aAnMeaning, theArticle, zeroArticle, articleChoice, articleMistakes, articlesInIelts, articlesMixed, articlesReview],
  },
  {
    id: 'agreement',
    level: 1,
    number: 5,
    title: t('Subject–Verb Agreement', 'Subject–Verb Agreement'),
    description: t('Singular and plural, long subjects, tricky cases.', 'Singular আর plural, লম্বা subject, কঠিন case।'),
    ieltsLink: t('"The number of students has…" — agreement errors lower Grammatical Range & Accuracy.', '"The number of students has…" — agreement-এর ভুল Grammatical Range & Accuracy কমায়।'),
    skill: 'grammar',
    tags: ['agreement', 'plural'],
    lessons: [svaBasics, svaCompound, svaIndefinite, svaLongSubjects, svaQuantity, svaMistakes, svaInIelts, svaMixed, svaReview],
  },
  {
    id: 'prepositions',
    level: 1,
    number: 6,
    title: t('Prepositions', 'Prepositions'),
    description: t('in, on, at, by, for, during, between, among…', 'in, on, at, by, for, during, between, among…'),
    ieltsLink: t('Task 1 needs "by 20%", "from 2000 to 2010", "between 5 and 10".', 'Task 1-এ লাগে "by 20%", "from 2000 to 2010", "between 5 and 10"।'),
    skill: 'grammar',
    tags: ['preposition'],
    lessons: [prepTime, prepDuration, prepPlace, prepMovement, prepPartners, prepData, prepMistakes, prepInIelts, prepReview],
  },
  {
    id: 'connectors',
    level: 1,
    number: 7,
    title: t('Connectors', 'Connectors'),
    description: t('however, therefore, although, whereas — meaning, position and natural use.', 'however, therefore, although, whereas — অর্থ, জায়গা আর স্বাভাবিক ব্যবহার।'),
    ieltsLink: t('Coherence & Cohesion: use connectors accurately, not mechanically.', 'Coherence & Cohesion: connector সঠিকভাবে ব্যবহার করুন, যন্ত্রের মতো না।'),
    skill: 'grammar',
    tags: ['connector'],
    lessons: [connAdd, connContrast, connCause, connExample, connGrammar, connCohesion, connMistakes, connInIelts, connReview],
  },
  {
    id: 'complex-sentences',
    level: 1,
    number: 8,
    title: t('Complex Sentences', 'Complex Sentences'),
    description: t('because, although, while, which, who, that — accurately.', 'because, although, while, which, who, that — সঠিকভাবে।'),
    ieltsLink: t('Grammatical range in Writing — accuracy first.', 'Writing-এ grammatical range — আগে accuracy।'),
    skill: 'grammar',
    tags: ['complex-sentence'],
    lessons: [cxClauses, cxReasonPurpose, cxTimeIf, cxRelative, cxRelativeComma, cxNounClauses, cxMistakes, cxInIelts, cxReview],
  },
  {
    id: 'punctuation',
    level: 1,
    number: 9,
    title: t('Punctuation & Capitalisation', 'Punctuation ও Capitalisation'),
    description: t('Full stop, comma, colon, semicolon, apostrophe, capitals, paragraphs.', 'Full stop, comma, colon, semicolon, apostrophe, capital letter, paragraph।'),
    ieltsLink: t('Clear punctuation makes Writing easy to follow.', 'পরিষ্কার punctuation Writing সহজে বোঝা যায় এমন করে।'),
    skill: 'grammar',
    tags: ['punctuation'],
    lessons: [pnCapitals, pnEndMarks, pnCommas, pnCommaErrors, pnApostrophes, pnColonsParagraphs, pnMistakes, pnProofread, pnReview],
  },
  {
    id: 'common-errors',
    level: 1,
    number: 10,
    title: t('Common Errors to Fix', 'যে ভুলগুলো ঠিক করতে হবে'),
    description: t('Errors that come from translating directly from Bangla, fixed with practice.', 'বাংলা থেকে সরাসরি অনুবাদ করতে গিয়ে যে ভুল হয়, practice দিয়ে সেগুলো ঠিক করা।'),
    ieltsLink: t('Lexical Resource and Grammatical Accuracy: the errors examiners notice first.', 'Lexical Resource আর Grammatical Accuracy: যে ভুল examiner সবার আগে লক্ষ করেন।'),
    skill: 'grammar',
    tags: ['common-error', 'collocation', 'plural', 'countable'],
    lessons: [ceTranslation, ceCountable, cePlural, ceCollocation, ceWordPairs, ceNatural, ceHabits, ceInIelts, ceReview],
  },
  {
    id: 'vocabulary-foundation',
    level: 1,
    number: 11,
    title: t('Vocabulary Foundation', 'Vocabulary Foundation'),
    description: t('How to learn, understand and use words for IELTS, plus daily word missions with your Brain.', 'IELTS-এর জন্য word কীভাবে শিখবেন, বুঝবেন আর ব্যবহার করবেন, আর Brain-এ save করার প্রতিদিনের word mission।'),
    ieltsLink: t('Lexical Resource in Writing and Speaking; paraphrase spotting in Reading and Listening.', 'Writing আর Speaking-এ Lexical Resource; Reading আর Listening-এ paraphrase চেনা।'),
    skill: 'vocabulary',
    tags: ['vocabulary'],
    lessons: [vcKnowWord, vcContext, vcParaphrase, vcRegister, vcPrecise, vcUseWords, vcHabits, vcInIelts, vcReview],
    practice: {
      href: '/ielts/vocabulary/foundation',
      title: t('Daily word missions', 'প্রতিদিনের word mission'),
      description: t('Learn the course words and save them to your Brain for spaced review.', 'Course-এর word শিখুন আর spaced review-এর জন্য Brain-এ save করুন।'),
    },
  },

  // ---------------------------------------------------------------- Level 2
  {
    id: 'ielts-intro',
    level: 2,
    number: 1,
    title: t('What is IELTS?', 'IELTS কী?'),
    description: t('What IELTS is, why you need it, IELTS Academic, the four skills, test structure, Band Scores and how to prepare.', 'IELTS কী, কেন লাগে, IELTS Academic, চার skill, test-এর গঠন, Band Score আর কীভাবে প্রস্তুতি নেবেন।'),
    ieltsLink: t('Know the test before you train for it.', 'Training-এর আগে test-টা চিনে নিন।'),
    skill: 'reading',
    tags: ['ielts-basics'],
    lessons: [ibWhat, ibWhy, ibVersions, ibFormat, ibDelivery, ibBands, ibMarking, ibPlan, ibMyths, ibYourPlan, ibReview],
  },
  {
    id: 'listening-foundation',
    level: 2,
    number: 2,
    title: t('Understanding IELTS Listening', 'IELTS Listening বুঝি'),
    short: t('Listening', 'Listening'),
    description: t('Parts 1–4, question types, answer rules and traps.', 'Part 1–4, question type, answer-এর নিয়ম আর trap।'),
    ieltsLink: t('Know each Part, its question types and its traps before you take practice tests.', 'Practice test দেওয়ার আগে প্রতিটা Part, তার প্রশ্নের ধরন আর ফাঁদ চিনে নিন।'),
    skill: 'listening',
    tags: ['listening'],
    lessons: [lsFormat, lsPart1, lsPart2, lsPart3, lsPart4, lsRules, lsTraps, lsStrategy, lsReview],
  },
  {
    id: 'reading-foundation',
    level: 2,
    number: 3,
    title: t('Understanding IELTS Reading', 'IELTS Reading বুঝি'),
    short: t('Reading', 'Reading'),
    description: t('Skimming, scanning, paraphrasing, evidence and question types.', 'Skimming, scanning, paraphrasing, evidence আর question type।'),
    ieltsLink: t('Every Reading answer is backed by evidence in the passage.', 'Reading-এর প্রতিটা answer-এর প্রমাণ passage-এই থাকে।'),
    skill: 'reading',
    tags: ['reading'],
    lessons: [rdSkim, rdParaphrase, rdTfng, rdHeadings, rdChoice, rdCompletion, rdTraps, rdStrategy, rdReview],
  },
  {
    id: 'writing-foundation',
    level: 2,
    number: 4,
    title: t('Understanding IELTS Writing', 'IELTS Writing বুঝি'),
    short: t('Writing', 'Writing'),
    description: t('Criteria, Task 1 overviews and data, Task 2 questions, paragraphs and cohesion.', 'Criteria, Task 1-এর overview আর data, Task 2-এর প্রশ্ন, paragraph আর cohesion।'),
    ieltsLink: t('Understand the task instead of memorising templates.', 'Template মুখস্থ না করে task-টা বুঝুন।'),
    skill: 'writing',
    tags: ['writing'],
    lessons: [wrFormat, wrOverview, wrData, wrQuestion, wrParagraphs, wrCohesion, wrTraps, wrPlan, wrReview],
  },
  {
    id: 'speaking-foundation',
    level: 2,
    number: 5,
    title: t('Understanding IELTS Speaking', 'IELTS Speaking বুঝি'),
    short: t('Speaking', 'Speaking'),
    description: t('Parts 1–3, extending answers, fluency and clear pronunciation.', 'Part 1–3, উত্তর বাড়ানো, fluency আর পরিষ্কার pronunciation।'),
    ieltsLink: t('Natural, precise language — not memorised idioms.', 'স্বাভাবিক, নির্ভুল ভাষা — মুখস্থ idiom না।'),
    skill: 'speaking',
    tags: ['speaking'],
    lessons: [spFormat, spPart1, spPart2, spPart3, spFluency, spPronunciation, spTraps, spPlan, spReview],
  },
];

/** Reviewable concepts across the course. */
export const CONCEPTS: Concept[] = [...TENSE_CONCEPTS, ...POS_CONCEPTS, ...ARTICLE_CONCEPTS, ...AGREEMENT_CONCEPTS, ...PREPOSITION_CONCEPTS, ...CONNECTOR_CONCEPTS, ...COMPLEX_CONCEPTS, ...PUNCTUATION_CONCEPTS, ...COMMON_ERROR_CONCEPTS, ...VOCABULARY_CONCEPTS, ...IELTS_START_CONCEPTS, ...IELTS_INTRO_CONCEPTS, ...SENTENCE_QUESTION_CONCEPTS, ...LISTENING_CONCEPTS, ...READING_CONCEPTS, ...WRITING_CONCEPTS, ...SPEAKING_CONCEPTS];

export const getConcept = (id: string) => CONCEPTS.find((c) => c.id === id);

export function getModule(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}

export function findLesson(lessonId: string): { module: Module; lesson: Lesson; index: number } | undefined {
  for (const module of MODULES) {
    const index = module.lessons.findIndex((l) => l.id === lessonId);
    if (index >= 0) return { module, lesson: module.lessons[index], index };
  }
  return undefined;
}

export const modulesForLevel = (level: number) => MODULES.filter((m) => m.level === level);

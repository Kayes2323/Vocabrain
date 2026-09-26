// The IELTS Foundation course catalogue. Levels 1–2 are taught here; levels
// 3–5 hand over to features that already exist (practice, tests, mock tests).
// A module with only `planned` lessons shows as "coming soon".
import type { Concept, L, Lesson, Level, Module } from '../model';
import { sentenceBasicsLessons } from './sentence-basics';
import { TENSE_CONCEPTS, tensesLessons } from './tenses';
import { tensesLessons2 } from './tenses-2';
import { presentSimpleV2, understandingTime } from './tenses-v2';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: { en: 'IELTS Foundation', bn: 'IELTS Foundation' },
    description: { en: 'The English you need before IELTS: sentences, tenses, grammar and vocabulary habits.', bn: 'IELTS শুরুর আগে যে English লাগে: sentence, tense, grammar আর vocabulary-র অভ্যাস।' },
  },
  {
    id: 2,
    title: { en: 'IELTS Core', bn: 'IELTS Core' },
    description: { en: 'How IELTS works: the test, Band Scores, and each skill explained.', bn: 'IELTS কীভাবে কাজ করে: test, Band Score আর প্রতিটা skill।' },
  },
  {
    id: 3,
    title: { en: 'IELTS Skill Builder', bn: 'IELTS Skill Builder' },
    description: { en: 'Guided practice for each skill, based on your plan.', bn: 'তোমার plan অনুযায়ী প্রতিটা skill-এর guided practice।' },
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
    lessons: sentenceBasicsLessons,
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
    lessons: [understandingTime, presentSimpleV2, ...tensesLessons, ...tensesLessons2],
    // New stages from the curriculum map (docs/TENSES_CURRICULUM.md), not written yet.
    planned: [t('Present Perfect Continuous', 'Present Perfect Continuous'), t('Tense Comparisons', 'Tense Comparisons'), t('Mixed Practice', 'Mixed Practice')],
  },
  {
    id: 'parts-of-speech',
    level: 1,
    number: 3,
    title: t('Parts of Speech & Word Forms', 'Parts of Speech ও Word Forms'),
    short: t('Parts of Speech', 'Parts of Speech'),
    description: t('Noun, verb, adjective, adverb — and how words change form.', 'Noun, verb, adjective, adverb — আর শব্দের form কীভাবে বদলায়।'),
    ieltsLink: t('significant → significantly → significance: word forms affect Lexical Resource and completion answers.', 'significant → significantly → significance: word form Lexical Resource আর completion answer-এ প্রভাব ফেলে।'),
    skill: 'grammar',
    tags: ['word-form'],
    lessons: [],
    planned: [
      t('Nouns and verbs', 'Noun আর verb'),
      t('Adjectives and adverbs', 'Adjective আর adverb'),
      t('Pronouns and determiners', 'Pronoun আর determiner'),
      t('Prepositions and conjunctions', 'Preposition আর conjunction'),
      t('Word forms: noun → verb → adjective → adverb', 'Word forms: noun → verb → adjective → adverb'),
      t('Word forms in IELTS answers', 'IELTS answer-এ word forms'),
    ],
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
    lessons: [],
    planned: [t('a and an', 'a আর an'), t('the', 'the'), t('Zero article', 'Zero article'), t('Articles in Task 1 and Task 2', 'Task 1 আর Task 2-এ article')],
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
    lessons: [],
    planned: [t('Singular and plural', 'Singular আর plural'), t('Long and complex subjects', 'লম্বা আর complex subject'), t('Agreement in Writing and Speaking', 'Writing আর Speaking-এ agreement')],
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
    lessons: [],
    planned: [t('Time: in, on, at, during', 'সময়: in, on, at, during'), t('Place and movement', 'জায়গা আর চলাচল'), t('Prepositions for data (by, from, to, between)', 'Data-র preposition (by, from, to, between)'), t('Common IELTS preposition errors', 'IELTS-এর common preposition ভুল')],
  },
  {
    id: 'connectors',
    level: 1,
    number: 7,
    title: t('Connectors', 'Connectors'),
    description: t('however, therefore, although, whereas — meaning, position and natural use.', 'however, therefore, although, whereas — অর্থ, জায়গা আর স্বাভাবিক ব্যবহার।'),
    ieltsLink: t('Coherence & Cohesion: use connectors accurately, not mechanically.', 'Coherence & Cohesion: connector সঠিকভাবে ব্যবহার করো, যন্ত্রের মতো না।'),
    skill: 'grammar',
    tags: ['connector'],
    lessons: [],
    planned: [t('Adding and contrasting', 'যোগ আর বিপরীত'), t('Cause and result', 'কারণ আর ফলাফল'), t('Examples and conclusions', 'উদাহরণ আর উপসংহার'), t('Overuse and natural linking', 'অতিরিক্ত ব্যবহার আর স্বাভাবিক linking')],
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
    lessons: [],
    planned: [t('Reason and contrast clauses', 'কারণ আর বিপরীতের clause'), t('Time and condition clauses', 'সময় আর শর্তের clause'), t('Relative clauses: who, which, that', 'Relative clause: who, which, that'), t('Combining sentences accurately', 'সঠিকভাবে sentence জোড়া')],
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
    lessons: [],
    planned: [t('Full stops and capitals', 'Full stop আর capital letter'), t('Commas', 'Comma'), t('Apostrophes, colons and semicolons', 'Apostrophe, colon আর semicolon'), t('Paragraph basics', 'Paragraph-এর basics')],
  },
  {
    id: 'common-errors',
    level: 1,
    number: 10,
    title: t('Common Errors to Fix', 'যে ভুলগুলো ঠিক করতে হবে'),
    description: t('Errors that come from translating directly from Bangla, fixed with practice.', 'বাংলা থেকে সরাসরি অনুবাদ করতে গিয়ে যে ভুল হয়, practice দিয়ে সেগুলো ঠিক করা।'),
    ieltsLink: t('Personalised from your own practice data where available.', 'যেখানে সম্ভব, তোমার নিজের practice data থেকে personalised।'),
    skill: 'grammar',
    tags: ['collocation', 'plural', 'article', 'preposition'],
    lessons: [],
    planned: [t('Direct translation', 'সরাসরি অনুবাদ'), t('Singular/plural and countable nouns', 'Singular/plural আর countable noun'), t('Collocations', 'Collocations'), t('Repetition and natural phrasing', 'Repetition আর স্বাভাবিক phrasing')],
  },
  {
    id: 'vocabulary-foundation',
    level: 1,
    number: 11,
    title: t('Vocabulary Foundation', 'Vocabulary Foundation'),
    description: t('Encounter → understand → save → recall → use → review, with your Brain.', 'Encounter → understand → save → recall → use → review, তোমার Brain দিয়ে।'),
    ieltsLink: t('Lexical Resource in Writing and Speaking; paraphrase spotting in Reading and Listening.', 'Writing আর Speaking-এ Lexical Resource; Reading আর Listening-এ paraphrase চেনা।'),
    skill: 'vocabulary',
    tags: ['vocabulary', 'collocation'],
    lessons: [],
    href: '/ielts/vocabulary/foundation',
    planned: [t('How to learn a word for IELTS', 'IELTS-এর জন্য কীভাবে একটা শব্দ শিখবে'), t('Synonyms and paraphrasing', 'Synonym আর paraphrasing'), t('Collocations', 'Collocations'), t('Using new words in Writing and Speaking', 'Writing আর Speaking-এ নতুন শব্দ ব্যবহার')],
  },

  // ---------------------------------------------------------------- Level 2
  {
    id: 'ielts-intro',
    level: 2,
    number: 1,
    title: t('What is IELTS?', 'IELTS কী?'),
    description: t('Academic vs General Training, the four skills, timing, Band Scores.', 'Academic আর General Training, চার skill, সময়, Band Score।'),
    ieltsLink: t('Know the test before you train for it.', 'Training-এর আগে test-টা চেনো।'),
    skill: 'reading',
    tags: [],
    lessons: [],
    planned: [t('IELTS Academic and General Training', 'IELTS Academic আর General Training'), t('The four skills and test timing', 'চার skill আর test-এর সময়'), t('Computer-delivered and paper-based', 'Computer-delivered আর paper-based'), t('Band Scores explained', 'Band Score বুঝি')],
  },
  {
    id: 'listening-foundation',
    level: 2,
    number: 2,
    title: t('Understanding IELTS Listening', 'IELTS Listening বুঝি'),
    short: t('Listening', 'Listening'),
    description: t('Parts 1–4, question types, answer rules and traps.', 'Part 1–4, question type, answer-এর নিয়ম আর trap।'),
    ieltsLink: t('Mino finds which Part is weakest for you from your tests.', 'তোমার test থেকে Mino খুঁজে বের করে কোন Part তোমার জন্য সবচেয়ে দুর্বল।'),
    skill: 'listening',
    tags: ['listening'],
    lessons: [],
    planned: [t('How Listening works', 'Listening কীভাবে চলে'), t('Part 1', 'Part 1'), t('Part 2', 'Part 2'), t('Part 3', 'Part 3'), t('Part 4', 'Part 4'), t('Question types', 'Question types')],
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
    lessons: [],
    planned: [t('Skimming and scanning', 'Skimming আর scanning'), t('Keywords and paraphrasing', 'Keyword আর paraphrasing'), t('True / False / Not Given', 'True / False / Not Given'), t('Matching Headings', 'Matching Headings'), t('Time management', 'Time management')],
  },
  {
    id: 'writing-foundation',
    level: 2,
    number: 4,
    title: t('Understanding IELTS Writing', 'IELTS Writing বুঝি'),
    short: t('Writing', 'Writing'),
    description: t('Task 1 and Task 2: analysing, planning, paragraphs.', 'Task 1 আর Task 2: প্রশ্ন বোঝা, planning, paragraph।'),
    ieltsLink: t('Understand the task instead of memorising templates.', 'Template মুখস্থ না করে task-টা বোঝো।'),
    skill: 'writing',
    tags: [],
    lessons: [],
    planned: [t('How Writing is marked', 'Writing কীভাবে মার্ক হয়'), t('Task 1: trends, comparisons, overview', 'Task 1: trend, তুলনা, overview'), t('Task 2: question types and planning', 'Task 2: question type আর planning'), t('Paragraphs and Coherence & Cohesion', 'Paragraph আর Coherence & Cohesion')],
  },
  {
    id: 'speaking-foundation',
    level: 2,
    number: 5,
    title: t('Understanding IELTS Speaking', 'IELTS Speaking বুঝি'),
    short: t('Speaking', 'Speaking'),
    description: t('Parts 1–3, extending answers, natural vocabulary.', 'Part 1–3, answer বাড়ানো, স্বাভাবিক vocabulary।'),
    ieltsLink: t('Natural, precise language — not memorised idioms.', 'স্বাভাবিক, নির্ভুল ভাষা — মুখস্থ idiom না।'),
    skill: 'speaking',
    tags: [],
    lessons: [],
    planned: [t('How Speaking works', 'Speaking কীভাবে চলে'), t('Part 1: answer and extend', 'Part 1: answer আর বাড়ানো'), t('Part 2: the long turn', 'Part 2: long turn'), t('Part 3: opinions, comparing, speculating', 'Part 3: মতামত, তুলনা, অনুমান')],
  },
];

/** Reviewable concepts across the course. */
export const CONCEPTS: Concept[] = [...TENSE_CONCEPTS];

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

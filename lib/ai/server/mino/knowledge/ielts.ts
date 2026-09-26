// Layers 3 and 4: IELTS and vocabulary-learning knowledge, as small cards Mino
// fetches on demand (getIELTSGuide) instead of carrying them in every prompt.
// Every point is labelled so Mino can tell official rules from techniques.
import { REVIEW_INTERVAL_DAYS } from '@/lib/engine/brain';

/** official = IELTS format/scoring facts; technique = widely taught strategy; vocab-brain = how this app teaches. */
export type KnowledgeKind = 'official' | 'technique' | 'vocab-brain';

export interface KnowledgeCard {
  id: string;
  title: string;
  /** Extra words that should find this card. */
  keywords: string[];
  points: { kind: KnowledgeKind; text: string }[];
  /** Details that change or vary by test centre: tell students to check. */
  verify?: string;
}

const o = (text: string) => ({ kind: 'official' as const, text });
const t = (text: string) => ({ kind: 'technique' as const, text });
const v = (text: string) => ({ kind: 'vocab-brain' as const, text });

export const IELTS_CARDS: KnowledgeCard[] = [
  {
    id: 'format',
    title: 'IELTS test format',
    keywords: ['exam', 'structure', 'academic', 'general', 'computer', 'paper', 'duration', 'time'],
    points: [
      o('Four skills: Listening, Reading, Writing, Speaking. Academic and General Training share Listening and Speaking; Reading and Writing differ.'),
      o('Listening: 4 parts, 40 questions, about 30 minutes.'),
      o('Reading: 3 sections (Academic: 3 long passages), 40 questions, 60 minutes, no extra transfer time.'),
      o('Writing: Task 1 (at least 150 words, about 20 minutes) and Task 2 (at least 250 words, about 40 minutes); 60 minutes total. Task 2 counts for more than Task 1.'),
      o('Speaking: 11–14 minutes, face to face with an examiner, 3 parts.'),
      o('Computer-delivered IELTS has the same content and scoring; answers are typed on screen. Speaking stays face to face.'),
    ],
    verify: 'Result timing, fees, dates and whether One Skill Retake is offered depend on the test centre: check the official IELTS / test centre website.',
  },
  {
    id: 'scoring',
    title: 'Band Scores',
    keywords: ['band', 'score', 'overall', 'calculate', 'average', 'raw', 'rounding'],
    points: [
      o('Each skill gets a band from 0 to 9, in half bands. Overall = the average of the four, rounded to the nearest half band (an average ending in .25 rounds up to .5, .75 rounds up to the next whole band).'),
      o('Listening and Reading bands come from the raw score out of 40 using conversion tables that vary slightly between tests (roughly 30/40 ≈ 7.0 in Listening and Academic Reading).'),
      o('Writing and Speaking are marked by trained examiners on four criteria each, equally weighted.'),
      v('Scores in Vocab Brain are practice estimates or self-assessments, never official IELTS results.'),
    ],
  },
  {
    id: 'listening',
    title: 'Listening: parts and common problems',
    keywords: ['audio', 'part 1', 'part 2', 'part 3', 'part 4', 'distractor', 'spelling', 'prediction', 'map', 'form'],
    points: [
      o('Part 1: everyday conversation (often form/note completion). Part 2: everyday monologue (often maps/plans, multiple choice). Part 3: academic discussion between 2–4 speakers (multiple choice, matching). Part 4: academic lecture (usually note/summary completion).'),
      o('The recording is heard once. Answers follow the order of the recording within a group.'),
      t('Read ahead and predict the type of answer (number, name, noun, plural?) before the audio starts.'),
      t('Distractors: speakers often say one option, then correct or reject it ("I thought Tuesday… actually Thursday"). Wait for the final answer.'),
      t('Part 3 is hard because several speakers agree/disagree and paraphrase the options; listen for opinion and agreement, not matching words.'),
      t('Spelling, plurals and word limits count: a correct idea spelled wrong is marked wrong. Practise names, numbers, dates and letters spelled aloud.'),
    ],
  },
  {
    id: 'reading',
    title: 'Reading: general strategy',
    keywords: ['passage', 'skimming', 'scanning', 'time management', 'paraphrase', 'keywords'],
    points: [
      t('About 20 minutes per passage. Don’t get stuck: guess, flag, move on (there is no negative marking).'),
      t('Skim for the main idea of each paragraph; scan for names, numbers and dates.'),
      t('Questions paraphrase the text: match meaning, not identical words. Identical words in an option are often a trap.'),
      o('Answers must follow the word limit and be spelled correctly; in completion tasks the words come from the passage.'),
    ],
  },
  {
    id: 'matching-headings',
    title: 'Matching Headings',
    keywords: ['headings', 'main idea', 'paragraph'],
    points: [
      o('Choose the heading that fits each paragraph from a list; there are more headings than paragraphs.'),
      t('1) Read all headings first and note how they differ. 2) Read the paragraph for its central idea: first and last sentences help, but not always. 3) Ignore supporting details and examples. 4) Match the idea of the whole paragraph, not one sentence. 5) Check distractors: a heading that repeats a word from the paragraph but describes a detail is usually wrong.'),
      t('Common mistake: choosing a heading that matches one example or one repeated word instead of the whole paragraph.'),
    ],
  },
  {
    id: 'tfng',
    title: 'True / False / Not Given and Yes / No / Not Given',
    keywords: ['true', 'false', 'not given', 'yes', 'no', 'tfng', 'ynng', 'statement'],
    points: [
      o('TRUE/FALSE/NOT GIVEN checks facts in the passage; YES/NO/NOT GIVEN checks the writer’s views or claims.'),
      t('TRUE / YES: the passage says the same thing (usually paraphrased). FALSE / NO: the passage says the opposite. NOT GIVEN: the passage doesn’t say whether it is true.'),
      t('Common traps: using your own knowledge; qualifiers (all/some/only/always/never); comparisons and numbers. If only part of the statement is supported, it isn’t TRUE.'),
      t('Questions follow passage order, which helps you locate the next answer.'),
    ],
  },
  {
    id: 'multiple-choice',
    title: 'Multiple Choice',
    keywords: ['options', 'choose', 'letter', 'mcq', 'choose two'],
    points: [
      t('Read the stem carefully and find the part of the passage/recording it refers to before reading options.'),
      t('Eliminate options: often each wrong option is mentioned but contradicted, not relevant to the question, or only partly true.'),
      o('"Choose TWO letters" questions give one mark per correct letter, in any order.'),
    ],
  },
  {
    id: 'completion',
    title: 'Sentence / Summary / Note / Table / Flow-chart / Form Completion',
    keywords: ['completion', 'gap', 'fill', 'summary', 'note', 'table', 'flow-chart', 'form', 'sentence', 'word limit', 'short answer', 'diagram'],
    points: [
      o('Obey the word limit exactly ("NO MORE THAN TWO WORDS AND/OR A NUMBER"). Hyphenated words count as one word. Extra words make the answer wrong.'),
      t('Predict the missing word type from the grammar around the gap (noun, plural, adjective, number).'),
      t('Copy spelling from the passage; in Listening, spelling must be correct.'),
      t('Summaries paraphrase the passage: find the section first, then the exact word that fits.'),
    ],
  },
  {
    id: 'matching',
    title: 'Matching Information / Features / Sentence Endings',
    keywords: ['matching information', 'matching features', 'sentence endings', 'which paragraph', 'researcher'],
    points: [
      t('Matching Information: find the paragraph that contains a specific detail (example, reason, definition); some paragraphs may be used twice or not at all.'),
      t('Matching Features: find each name in the text first (they are easy to scan), then read what is said about it.'),
      t('Sentence Endings: the ending must fit both grammar and meaning; several endings may fit grammatically.'),
    ],
  },
  {
    id: 'writing',
    title: 'Writing: criteria and structure',
    keywords: ['task 1', 'task 2', 'essay', 'overview', 'introduction', 'paragraph', 'coherence', 'lexical', 'grammar', 'task response', 'task achievement'],
    points: [
      o('Four criteria, equally weighted: Task Achievement (Task 1) / Task Response (Task 2), Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy.'),
      o('Writing under the minimum word count, or off-topic, lowers the score.'),
      t('Task 1 (Academic): introduction paraphrasing the question, a clear overview of the main trends/features, then 2 body paragraphs with key data and comparisons. No opinion.'),
      t('Task 2: answer every part of the question, state a clear position where asked, one main idea per body paragraph with explanation and an example, and a conclusion.'),
      t('Cohesion is more than linking words: overused "Moreover/Furthermore" can hurt; referencing (this, these, such) and logical order matter.'),
      t('Lexical Resource rewards precise, natural word choice and collocation, not rare words. Forced "advanced" vocabulary with errors lowers the score.'),
    ],
  },
  {
    id: 'speaking',
    title: 'Speaking: parts and criteria',
    keywords: ['part 1', 'part 2', 'part 3', 'cue card', 'fluency', 'pronunciation', 'examiner', 'memorised'],
    points: [
      o('Part 1 (4–5 min): questions about familiar topics. Part 2: a cue card, 1 minute to prepare, then speak for 1–2 minutes. Part 3 (4–5 min): a deeper discussion linked to Part 2.'),
      o('Criteria: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation.'),
      t('Extend answers: answer, give a reason, add an example or detail. In Part 3, compare and speculate.'),
      t('Memorised scripts sound unnatural and examiners notice them; practise flexible ideas, not fixed paragraphs.'),
      t('Pronunciation is about being easy to understand (stress, intonation, clear sounds), not a native accent.'),
    ],
  },
  {
    id: 'vocabulary-method',
    title: 'How Vocab Brain teaches vocabulary',
    keywords: ['remember', 'forget', 'memorise', 'memorize', 'word list', 'active recall', 'spaced', 'review', 'mone thake', 'brain'],
    points: [
      v('No random word lists. The cycle is: meet a word in context → Save to Brain (with its sentence and source) → understand → recall it from memory → use it in Writing and Speaking → review on a schedule.'),
      v(`Active recall: Review asks you to produce the meaning, a synonym, the word for its original sentence, or complete the sentence, never multiple choice.`),
      v(`Spaced review: after each correct recall the next review moves further away (${REVIEW_INTERVAL_DAYS.join(' → ')} days); a miss brings the word back sooner.`),
      v('A word becomes yours when you can use it: status grows from new → learning → recalling → active (used) → strong → mastered.'),
    ],
  },
  {
    id: 'vocabulary-use',
    title: 'Using vocabulary naturally in Writing and Speaking',
    keywords: ['collocation', 'natural', 'academic word', 'synonym', 'use a word', 'sentence'],
    points: [
      t('A word can be correct but unnatural. Learn it with its common partners (collocations): "a substantial increase", "play a significant role".'),
      t('Choose precise and natural over rare and impressive. Wrong or forced vocabulary lowers Lexical Resource.'),
      t('Check register: academic words fit Writing; in Speaking, natural spoken phrasing is better than written style.'),
      t('Build flexible sentences with a word (different forms and contexts) rather than memorising one sentence.'),
    ],
  },
  {
    id: 'study-abroad-discovery',
    title: 'Choosing a study-abroad destination',
    keywords: ['country', 'abroad', 'destination', 'which country', 'budget', 'university', 'scholarship', 'intake'],
    points: [
      v('No country is "best" for everyone. Compare options on the student’s own criteria and explain why each may fit.'),
      v('Ask only what the app doesn’t already know, a few questions at a time: degree level, subject, academic background, yearly budget (tuition + living), career goal, scholarship need, preferred intake, lifestyle/safety preferences, target IELTS band.'),
      v('Save answers in Study Abroad (profile) so Mino and the planned Country Match can use them.'),
      t('Useful comparison factors: total yearly cost, IELTS/academic requirements, post-study work options, scholarship availability, language of daily life, distance from home and community.'),
    ],
    verify: 'Fees, living costs, visa rules, work rights, deadlines and scholarship terms change every year: always point to the official government, university or scholarship website.',
  },
  {
    id: 'application-documents',
    title: 'Application documents (SOP, CV, LOR)',
    keywords: ['sop', 'statement of purpose', 'personal statement', 'cv', 'resume', 'lor', 'recommendation', 'study plan', 'documents'],
    points: [
      t('SOP / Personal Statement: why this subject, why this university/country, your preparation (study, projects, work), and your goals. Specific and true, not generic praise.'),
      t('Academic CV: education, results, projects/research, work, skills, awards; clear and short.'),
      t('LOR: written by a teacher or employer who knows your work; give them facts to mention, but they write it.'),
      t('Common mistakes: copied templates, exaggeration, repeating the CV in the SOP, not answering the university’s specific prompt.'),
    ],
    verify: 'Each university sets its own document rules (length, format, prompts): check its official admissions page.',
  },
];

export function findKnowledge(topic: string): KnowledgeCard[] {
  const q = topic.toLowerCase();
  const words = q.split(/[^a-z0-9/-]+/).filter((w) => w.length > 2);
  return IELTS_CARDS.map((c) => {
    const hay = `${c.id} ${c.title} ${c.keywords.join(' ')}`.toLowerCase();
    const score = (hay.includes(q) ? 5 : 0) + c.keywords.filter((k) => q.includes(k)).length * 2 + words.filter((w) => hay.includes(w)).length;
    return { c, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((x) => x.c);
}

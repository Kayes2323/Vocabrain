// Layer 2: Vocab Brain product knowledge. The app map is generated from the
// same registries the UI renders (lib/navigation.ts, the test library), so
// Mino can never call a planned feature available. Guides describe real flows
// and are checked against real routes in scripts/test-mino-knowledge.ts.
import { en } from '@/lib/i18n/locales/en';
import { BOOKS, testSkills } from '@/lib/ielts/content';
import { ABROAD_SECTION_GROUPS, IELTS_SECTIONS, IELTS_TOOLS, PRIMARY_NAV, type SectionDef } from '@/lib/navigation';

export type FeatureStatus = 'AVAILABLE' | 'PLANNED';

const sectionCopy = en.sections as unknown as Record<string, { title: string; description: string }>;
const navCopy = en.nav as unknown as Record<string, string>;

function sectionLine(s: SectionDef): string {
  const copy = sectionCopy[s.id];
  const status: FeatureStatus = s.status === 'available' ? 'AVAILABLE' : 'PLANNED';
  return `  - ${copy?.title ?? s.id} [${status}]${s.status === 'available' ? ` ${s.href}` : ''}: ${copy?.description ?? ''}`;
}

/** Compact always-on map of the app (roughly 300 tokens). */
export function appMapLayer(): string {
  const tabs = PRIMARY_NAV.map((n) => navCopy[n.labelKey.replace('nav.', '')] ?? n.labelKey).join(' · ');
  const tests = BOOKS.flatMap((b) => b.tests.flatMap((t) => testSkills(t).map((s) => `${t.title} (${s})`))).join(', ');
  return `APP MAP (Vocab Brain, current build). Main tabs: ${tabs}.
Home [AVAILABLE] /: goal, IELTS journey stage, Today's Learning (daily plan: Vocabulary Review → Reading → use a word in Writing → Speaking; "I only have 15 minutes" switches to a 15-minute plan), Mino's note.
IELTS [AVAILABLE] /ielts: target/estimate/weeks left, "Find your starting point" diagnostic, journey, and sections:
${[...IELTS_SECTIONS, ...IELTS_TOOLS].map(sectionLine).join('\n')}
  - Practice test library now: ${tests || 'none'}. Band estimates only for full 40-question sections.
Mino [AVAILABLE] /mino: your next 3 actions, chat, "what Mino knows about you".
Study Abroad [AVAILABLE] /abroad: journey, study-abroad profile, and:
${ABROAD_SECTION_GROUPS.flatMap((g) => g.sections).map(sectionLine).join('\n')}
  - Verified official data (with source + date) so far: United Kingdom, Canada, Australia, Germany (living-cost money to show, work while studying, post-study work where confirmed). Other countries and tuition/scholarship/visa details: not verified yet.
Profile [AVAILABLE] /profile: language, IELTS goal, starting point, study-abroad goal, band calculator, sign in/out.
Not built yet (PLANNED): Foundation lessons beyond Module 1 Sentence Basics, full 4-skill mock test in one sitting, progress dashboard, mistake notebook, universities, costs, scholarships, applications, documents (SOP/CV/LOR), visa.`;
}

export interface AppGuide {
  id: string;
  status: FeatureStatus;
  title: string;
  /** Where the student goes, by tapping. */
  where: string;
  steps: string[];
  notes?: string[];
}

/** Real workflows in the current build. Every `where` route must exist. */
export const APP_GUIDES: AppGuide[] = [
  {
    id: 'save-to-brain',
    status: 'AVAILABLE',
    title: 'Save to Brain (save a word while reading)',
    where: 'IELTS → Reading (/ielts/reading)',
    steps: [
      'Open a passage and read.',
      'Tap any word you don’t know: a card shows its meaning (English and Bangla), synonyms and collocations.',
      'Tap "Save to Brain". The word is saved with the exact sentence where you met it and the passage as its source.',
      'Saved words appear in My Brain and come back in Review on a spaced schedule.',
    ],
  },
  {
    id: 'my-brain',
    status: 'AVAILABLE',
    title: 'My Brain (your vocabulary notebook)',
    where: 'IELTS → Vocabulary → Open My Brain (/ielts/vocabulary/notebook)',
    steps: [
      'Shows every saved word with its status: new → learning → recalling → active → strong → mastered.',
      'Open a word to see its sentence, meaning, recall history and Writing/Speaking use.',
    ],
  },
  {
    id: 'review',
    status: 'AVAILABLE',
    title: 'Review (active recall + spaced review)',
    where: 'Home → Today\'s Learning → Vocabulary Review, or "Start Today\'s Review" (/review)',
    steps: [
      'Words that are due come back as free-recall exercises (type the meaning, a synonym, the word for its original sentence, or complete the sentence), never multiple choice and not just word → meaning cards.',
      'Correct answers push the next review further away (1 → 3 → 7 → 14 → 30 → 60 days); misses bring the word back sooner.',
    ],
  },
  {
    id: 'use-words',
    status: 'AVAILABLE',
    title: 'Use a saved word in Writing or Speaking',
    where: 'Home → Today\'s Learning (/practice/writing, /practice/speaking)',
    steps: [
      'Writing: write one sentence using a saved word; the app checks the word is used and the sentence is complete.',
      'Speaking: say a sentence with the word (voice or typed), with a prompt to answer.',
      'This is word-usage practice, not full IELTS Writing/Speaking tasks or band feedback (those are planned).',
    ],
  },
  {
    id: 'practice-tests',
    status: 'AVAILABLE',
    title: 'Practice Tests (computer-based IELTS practice)',
    where: 'IELTS → Practice Tests (/ielts/tests)',
    steps: [
      'Choose a test and skill, then Start. Timer, question navigator, flag for review, Review screen, Submit.',
      'Desktop: passage left, questions right. Mobile: Passage / Questions tabs.',
      'Answers save automatically; after a refresh you continue where you were. The timer pauses when you leave the page.',
      'Results: score, per passage, per question type, where to focus, and every answer with an explanation and the evidence sentence.',
    ],
    notes: ['Currently one original Reading practice test (24 questions). Listening, Writing and Speaking tests are planned. Not an official IELTS test.'],
  },
  {
    id: 'ielts-foundation',
    status: 'AVAILABLE',
    title: 'IELTS Foundation course (for beginners)',
    where: 'IELTS → IELTS Foundation (/ielts/foundation); check at /ielts/foundation/diagnostic',
    steps: [
      'Start with the Foundation check: 20 short questions (grammar incl. 3 tense items, vocabulary, sentences, a short reading, a little listening). Result: Strong / Developing / Needs Foundation, strong and weak areas, and an adaptive start: lessons the check proved are skipped (still open for review).',
      'The course has two levels. LEVEL 1 — Foundation Grammar: Module 1 Sentence Basics (9 lessons), Module 2 Tenses for IELTS (15 lessons), Module 3 Parts of Speech (see the parts-of-speech guide); Vocabulary Foundation sits beside it. LEVEL 2 — IELTS Basics: its cards show "Soon" and have no lessons yet.',
      'Every lesson is open (no locks); the dashboard recommends one next step. An unfinished lesson resumes where the student left it, on any device.',
      'Tenses for IELTS (/ielts/foundation/tenses), 15 lessons in this order: Understanding Time, Present Simple, Present Continuous, Past Simple, Past Continuous, Present Perfect, Present Perfect Continuous, Past Perfect, Future Forms, Tense Comparisons (choosing by meaning), Common Tense Mistakes, Tenses in IELTS Writing, Tenses in IELTS Speaking, Mixed Practice (no tense hints), Review Test.',
      'Each tense lesson: a real situation first (hook) → discover the pattern → when to use it and when NOT to (with the reason Bangla speakers slip) → examples → IELTS use in Reading, Listening, Writing and Speaking → common mistakes → option practice → free recall with no options → error correction → mini challenge → a personal sentence Mino checks (with one follow-up question) → summary.',
      'Tenses Final Mastery Challenge at /ielts/foundation/challenge/tenses: 8 parts (identify the time, choose from context, correct the verb, free recall, explain, Reading & Listening, IELTS Writing, Speaking & building sentences), 24 adaptive questions (harder after correct answers, easier after misses). Report: overall %, by part, by tense, strongest and weakest tense, the student’s own mistakes, tenses to review, recommended practice, and "Ask Mino about my Tenses report". It is a Vocab Brain learning assessment, not an official IELTS score.',
      'Tense mistakes are tracked as named patterns (past-vs-perfect = Past Simple or Present Perfect, simple-vs-continuous, tense-time = the time word decides the tense, plus verb-form and sv-agreement). 3 in 14 days opens a 5-question fix at /ielts/foundation/fix/<pattern>.',
      'Spaced review: after a lesson the concept comes back the same day, then after 1, 3, 7, 14 and 30 days (a miss brings it back tomorrow). Mastery needs recognition, recall, application (a correct personal sentence) and 2 passed spaced reviews — not just finishing the lesson.',
      'Every wrong answer is stored. 3+ mistakes on one topic in 14 days → a 5-minute review (key points + 5 questions, a retest that includes missed questions) at /ielts/foundation/review/<topic>. Module quiz at /ielts/foundation/quiz/<module> after finishing lessons.',
      'The Foundation dashboard shows one next step, Mino’s reason, today’s goal (lessons + practice questions) and a short daily plan.',
    ],
    notes: [
      'Only the modules named above as having lessons are available. The other grammar cards (Articles, Subject–Verb Agreement, Prepositions, Connectors, Complex Sentences, Punctuation, Common Errors) and the LEVEL 2 — IELTS Basics cards show "Soon" and have no lessons: never say they are available, never give a date and never link to them. Vocabulary Foundation is available in its own section (see the vocabulary-foundation guide).',
      'For the student’s grammar performance use the snapshot or getFoundationProgress. Never invent scores, counts or mistakes.',
    ],
  },
  {
    id: 'parts-of-speech',
    status: 'AVAILABLE',
    title: 'Parts of Speech (Foundation module 3)',
    where: 'IELTS → IELTS Foundation → Parts of Speech (/ielts/foundation/parts-of-speech)',
    steps: [
      '12 units in a recommended order (all open): Noun, Verb, Adjective, Adverb, Word Forms & Families, Pronoun, Preposition, Conjunction, Interjection, Parts of Speech in IELTS, Common Mistakes Lab, Final Mastery Challenge.',
      'Written now (49 lessons): Noun (What is a noun?, Countable or uncountable?, Noun mistakes to stop making, Nouns in IELTS), Verb (What is a verb?, Main and helping verbs, Verb forms, Common verb mistakes, Verbs in IELTS), Adjective (What is an adjective?, Comparing things, -ed or -ing?, Adjectives in IELTS), Adverb (What is an adverb?, Adjective or adverb?, Where adverbs go, Adverbs in IELTS), Word Forms (The gap tells you the form, Endings that show the job, Word families, Opposites with prefixes, Word forms in IELTS), Pronoun (What pronouns do, Possessives and -self, What does "it" refer to?), Preposition (What prepositions do, Words that need a partner, Prepositions for data), Conjunction (Joining words; because, although, while, if; although, however, despite), Interjection (Oh, well, wow). Parts of Speech in IELTS (9: Reading: understand words you don’t know; Reading: predict the gap; Listening: predict the answer; Writing: the word that breaks the sentence; Building an academic sentence; Speaking: upgrade your answer; Word-form clues; Grammar + vocabulary: words that go together; IELTS application challenge), Common Mistakes Lab (8 repair stations: noun, verb, pronoun, adjective/adverb, preposition, conjunction, word form, subject–verb; each repair = tap the wrong word, type the fix, say why; plus "Your own mistakes first" with the student’s recent wrong questions at /ielts/foundation/parts-of-speech/lab/mine), Final Mastery Challenge (/ielts/foundation/parts-of-speech/final: 10 parts A–J, 30 adaptive questions, many without options; report by part and by word job; a practice result, never an IELTS band).',
      'Each unit with a finished lesson has a unit check: 8 questions from the finished lessons (recent mistakes first) at /ielts/foundation/parts-of-speech/<unit>/check; it counts as a spaced review of that unit.',
      'Each lesson: a real situation → tag the words (the student gives each word its job before any rule) → simple explanation → examples → IELTS use → common mistakes → guided practice → practice without options → mini challenge (incl. "why" and spot-and-fix) → own sentence checked by Mino → remember.',
      'Every wrong answer records the job that was needed and the job the student chose, and named patterns (subject–verb agreement, verb form after helping verbs, countable nouns, pronoun forms, preposition choice, linking-word logic). The same pattern 3 times in 14 days (or twice in a row) opens it: the dashboard offers a 2-minute, 5-question fix (link: ielts/foundation/fix/<expected>><chosen> or ielts/foundation/fix/<pattern>, e.g. adjective>adverb, sv-agreement); passing it (80%+) closes the pattern until the mistake returns. After the fix: what was confused, why it happens, how to recognise it, how to avoid it.',
      'Unit status comes from answers: New, Learning, Practising, Needs review, Mastered (recognition, recall, a correct own sentence and 2 passed spaced reviews).',
    ],
    notes: ['Use the snapshot lines "Parts of Speech" and "Open Parts of Speech pattern" for the student’s real status and mistakes. Quote their own wrong sentence when explaining; never invent counts.'],
  },
  {
    id: 'vocabulary-foundation',
    status: 'AVAILABLE',
    title: 'Vocabulary Foundation (daily word mission)',
    where: 'IELTS → Vocabulary → Vocabulary Foundation (/ielts/vocabulary/foundation); mission at /ielts/vocabulary/foundation/mission',
    steps: [
      'Today’s mission (about 15 minutes): 5 new words, 10 free-recall questions, 2 sentence challenges, plus up to 5 due review words.',
      'Each word: meet it in a sentence → guess the meaning from context → meaning, pronunciation, examples, collocations, synonyms (with traps), word family, IELTS use revealed step by step → Save to Brain.',
      'Then free recall without options (a clue after a first miss), a sentence with the word that Mino checks (a rule-based quick check if Mino is busy), and spaced reviews in /review.',
      'First set: significant, decline, benefit, impact, access, contribute, sustainable, crucial, consequence, afford.',
    ],
    notes: ['Saved words live in My Brain (/ielts/vocabulary/notebook). Use the snapshot / getVocabulary for the student’s real word data; never invent counts.'],
  },
  {
    id: 'starting-point',
    status: 'AVAILABLE',
    title: 'Find your starting point (diagnostic)',
    where: 'IELTS → Find your starting point (/ielts/diagnostic)',
    steps: [
      'About 5 minutes of "can you do this?" statements for each skill.',
      'Gives an estimated band per skill and your biggest opportunity. It is a self-assessment estimate, not a test score.',
    ],
  },
  {
    id: 'daily-plan',
    status: 'AVAILABLE',
    title: "Today's Learning (daily plan)",
    where: 'Home (/)',
    steps: [
      'Up to four tasks: Vocabulary Review, Reading, Writing (use a word), Speaking (use a word). Tasks tick themselves when you finish the activity.',
      '"I only have 15 minutes" switches to a 15-minute plan. After 3+ days away, a lighter catch-up plan appears.',
    ],
  },
  {
    id: 'study-plan',
    status: 'AVAILABLE',
    title: 'My IELTS Plan (7–90 days or until the test)',
    where: 'IELTS → My IELTS Plan (/ielts/plan)',
    steps: [
      'Pick 7, 14, 30, 60 or 90 days, or "Until test" when a test date is set.',
      'Shows minutes a day, where the time goes and why (gap to target, weak test areas, due words), phases, and each day’s tasks with links.',
      'Built from your data; it changes when your goal, study time or results change. Missing data is listed as assumptions.',
    ],
  },
  {
    id: 'goals',
    status: 'AVAILABLE',
    title: 'Change goal, target band, test date or study time',
    where: 'Profile → IELTS goal (/setup/ielts); Study abroad goal (/setup/abroad)',
    steps: ['Update any answer; the plan and Mino use it straight away.'],
  },
  {
    id: 'band-calculator',
    status: 'AVAILABLE',
    title: 'Band Score calculator',
    where: 'IELTS → Band Score calculator (/ielts/band-calculator)',
    steps: ['Enter four skill bands to see the overall band (average rounded to the nearest half band).'],
  },
  {
    id: 'countries',
    status: 'AVAILABLE',
    title: 'Country Explorer',
    where: 'Study Abroad → Country Explorer (/abroad/countries)',
    steps: ['Browse destinations and add preferred countries to your study-abroad profile.'],
    notes: ['No tuition, visa or requirement figures yet; they will only appear with an official source and a date.'],
  },
  {
    id: 'country-match',
    status: 'AVAILABLE',
    title: 'Country Match (find destinations that fit you)',
    where: 'Study Abroad → Country Match (/abroad/country-match)',
    steps: [
      'Choose up to 3 priorities (e.g. post-study work, affordability, career), optionally countries you like and a yearly living budget.',
      'See destinations compared on those priorities using only official, dated information, with a fit score, how much of your priorities could be checked, and links to the official pages.',
      'Your budget is compared only with official figures in the same currency; nothing is converted. Priorities without verified data are listed as not verified yet.',
    ],
  },
  {
    id: 'progress',
    status: 'PLANNED',
    title: 'Progress dashboard, test history and mistake notebook',
    where: 'Not in the app yet',
    steps: ['For now: your latest score per test shows in IELTS → Practice Tests, and word progress in My Brain.'],
  },
  {
    id: 'listening',
    status: 'PLANNED',
    title: 'Listening practice and tests',
    where: 'Not in the app yet',
    steps: ['Coming as part of the IELTS test engine.'],
  },
  {
    id: 'writing-test',
    status: 'AVAILABLE',
    title: 'Writing test with Mino feedback (Task 1 + Task 2)',
    where: 'IELTS → Practice Tests → Practice Test 1 · Writing (/ielts/tests)',
    steps: [
      'Task 1 (data table, 150+ words) and Task 2 (essay, 250+ words); switch tasks with the tabs.',
      'Live word count, a 60-minute timer that pauses when you leave, and automatic saving (a refresh continues where you were).',
      'After Submit, Mino gives practice feedback for each task on the four criteria with an estimated band, strengths, mistakes with fixes, better sentences, useful vocabulary and next steps. Task 2 counts double. It is an estimate, never an official score.',
    ],
  },
  {
    id: 'speaking-test',
    status: 'AVAILABLE',
    title: 'Speaking test with Mino feedback (Part 1–3)',
    where: 'IELTS → Practice Tests → Practice Test 1 · Speaking (/ielts/tests)',
    steps: [
      'Answer aloud: Part 1 questions, a Part 2 cue card with 1 minute to prepare and up to 2 minutes to talk, then Part 3 discussion questions.',
      'The browser records you (playback stays on your device, never uploaded) and turns speech into text; you can correct the transcript or type if speech-to-text isn’t available.',
      'Mino then estimates Fluency & Coherence, Lexical Resource and Grammatical Range & Accuracy from the transcript. Pronunciation is not scored because it can’t be judged from text.',
    ],
  },
  {
    id: 'study-abroad-tools',
    status: 'PLANNED',
    title: 'Universities, cost calculator, scholarships, deadlines, applications, documents, visa',
    where: 'Not in the app yet (shown as "Soon" in Study Abroad)',
    steps: ['Mino can explain general concepts (what an SOP is, how intakes work) but not current fees, deadlines or rules.'],
  },
];

export function findGuide(topic: string): AppGuide[] {
  const q = topic.toLowerCase();
  const words = q.split(/[^a-z0-9]+/).filter((w) => w.length > 2);
  const scored = APP_GUIDES.map((g) => {
    const hay = `${g.id} ${g.title} ${g.where} ${g.steps.join(' ')}`.toLowerCase();
    return { g, score: (hay.includes(q) ? 5 : 0) + words.filter((w) => hay.includes(w)).length };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, 2).map((x) => x.g);
}

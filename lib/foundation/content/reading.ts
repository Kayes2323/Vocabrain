import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Understanding IELTS Reading (Foundation LEVEL 2, module 3), six lessons in
 * the v2 format with short original passages. Facts and techniques match
 * lib/ai/server/mino/knowledge/ielts.ts (3 sections, 40 questions, 60 minutes,
 * no extra transfer time, about 20 minutes per passage, no negative marking,
 * word limits, TRUE/FALSE/NOT GIVEN vs YES/NO/NOT GIVEN, more headings than
 * paragraphs, Choose TWO marking). rd-1 skimming and scanning · rd-2 keywords
 * and paraphrasing · rd-3 True / False / Not Given · rd-4 Matching Headings ·
 * rd-5 multiple choice and matching · rd-6 completion and time management.
 * Original Mino content.
 */

export const READING_CONCEPTS: Concept[] = [
  { id: 'rd-skim', title: l('Skimming and scanning', 'Skimming আর scanning'), lessonId: 'rd-1', tag: 'reading' },
  { id: 'rd-paraphrase', title: l('Keywords and paraphrasing', 'Keyword আর paraphrasing'), lessonId: 'rd-2', tag: 'reading' },
  { id: 'rd-tfng', title: l('True / False / Not Given', 'True / False / Not Given'), lessonId: 'rd-3', tag: 'reading' },
  { id: 'rd-headings', title: l('Matching Headings', 'Matching Headings'), lessonId: 'rd-4', tag: 'reading' },
  { id: 'rd-choice', title: l('Multiple choice and matching', 'Multiple choice আর matching'), lessonId: 'rd-5', tag: 'reading' },
  { id: 'rd-completion', title: l('Completion tasks and time management', 'Completion task আর সময় ব্যবস্থাপনা'), lessonId: 'rd-6', tag: 'reading' },
];

const P = { tag: 'reading' as const };

const RIVER = 'The Jamuna is one of the three main rivers of Bangladesh. Every year its channels shift, and in some years the river moves more than a kilometre. Farmers on the chars — the sandy islands in the river — grow rice, jute and vegetables, but they may lose their land when the channel changes. Since 2015, several organisations have trained farmers to build raised homes on earth platforms.';

// ======================================================================= rd-1
export const rdSkim: Lesson = {
  id: 'rd-1',
  format: 'v2',
  concept: 'rd-skim',
  title: l('Skimming and scanning', 'Skimming আর scanning'),
  why: l('Reading gives about 20 minutes per passage. Reading every word slowly runs out of time. Skim for the main idea, then scan for the exact detail each question needs.', 'Reading-এ প্রতি passage-এ প্রায় ২০ মিনিট। প্রতিটা word ধীরে পড়লে সময় শেষ হয়ে যায়। মূল idea-র জন্য skim করুন, তারপর প্রতিটা প্রশ্নের নির্দিষ্ট তথ্যের জন্য scan করুন।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('Out of time', 'সময় শেষ'),
      situation: l('Ayan reads Passage 1 word by word and translates difficult words. After 35 minutes he starts Passage 2 — with 25 minutes left for two passages.', 'Ayan Passage 1 word ধরে পড়েন আর কঠিন word অনুবাদ করেন। ৩৫ মিনিট পরে Passage 2 শুরু করেন — দুটো passage-এর জন্য বাকি ২৫ মিনিট।'),
      question: l('What should he change?', 'তাঁর কী বদলানো উচিত?'),
      options: ['Skim each passage for its main ideas, then scan for the details each question asks for', 'Read even more carefully', 'Skip Passage 1'],
      answer: 'Skim each passage for its main ideas, then scan for the details each question asks for',
      diagnose: {
        'Skim each passage for its main ideas, then scan for the details each question asks for': l('Right. About 20 minutes per passage: a quick skim for the map of the text, then targeted scanning.', 'ঠিক। প্রতি passage-এ প্রায় ২০ মিনিট: text-এর নকশা বুঝতে দ্রুত skim, তারপর লক্ষ্য ধরে scan।'),
        'Read even more carefully': l('Careful reading of every word is too slow for 40 questions in 60 minutes.', '৬০ মিনিটে ৪০টা প্রশ্নের জন্য প্রতিটা word মন দিয়ে পড়া খুব ধীর।'),
        'Skip Passage 1': l('Every passage has marks. Plan about 20 minutes each.', 'প্রতিটা passage-এ নম্বর আছে। প্রতিটায় প্রায় ২০ মিনিট রাখুন।'),
      },
    },
    {
      kind: 'discover',
      title: l('Two kinds of fast reading', 'দুই রকম দ্রুত পড়া'),
      items: [
        { en: `Passage: "${RIVER}"`, note: l('a short Academic-style paragraph', 'একটা ছোট Academic ধরনের paragraph') },
        { en: 'Skim: What is the paragraph mainly about? → farming on shifting river islands', note: l('first and last sentences, key nouns', 'প্রথম আর শেষ sentence, মূল noun') },
        { en: 'Scan: When did the training start? → look for a year → 2015', note: l('names, numbers, dates, capital letters', 'নাম, সংখ্যা, তারিখ, capital letter') },
        { en: 'Scan: What crops are grown? → rice, jute and vegetables', note: l('a list after "grow"', '"grow"-এর পরের তালিকা') },
      ],
      question: l('What is the difference between skimming and scanning?', 'Skimming আর scanning-এর পার্থক্য কী?'),
      options: [
        l('Skimming finds the main idea; scanning finds a specific detail', 'Skimming মূল idea খোঁজে; scanning নির্দিষ্ট তথ্য খোঁজে'),
        l('They are the same', 'দুটো একই'),
        l('Scanning means reading every word', 'Scanning মানে প্রতিটা word পড়া'),
      ],
      answer: 0,
      pattern: l('Skim for the main idea of each paragraph (first and last sentences, key nouns). Scan for names, numbers, dates and key words from the question.', 'প্রতিটা paragraph-এর মূল idea-র জন্য skim করুন (প্রথম আর শেষ sentence, মূল noun)। প্রশ্নের নাম, সংখ্যা, তারিখ আর মূল word-এর জন্য scan করুন।'),
    },
    {
      kind: 'concept',
      title: l('Reading fast without missing marks', 'নম্বর না হারিয়ে দ্রুত পড়া'),
      body: l(
        'IELTS Reading has 3 sections, 40 questions and 60 minutes, with no extra time to transfer answers. Speed comes from reading with a purpose, not from reading everything.',
        'IELTS Reading-এ ৩টা section, ৪০টা প্রশ্ন আর ৬০ মিনিট, উত্তর তোলার আলাদা সময় নেই। গতি আসে উদ্দেশ্য নিয়ে পড়া থেকে, সব পড়া থেকে না।',
      ),
      points: [
        l('Skim first (1–2 minutes): the title, the first sentence of each paragraph, and key nouns — make a mental map of where each topic is.', 'আগে skim (১–২ মিনিট): শিরোনাম, প্রতিটা paragraph-এর প্রথম sentence আর মূল noun — কোন topic কোথায় তার একটা মানসিক নকশা।'),
        l('Scan for each question: choose the easiest key word to find (a name, a number, a date, a capitalised word) and look only for it.', 'প্রতিটা প্রশ্নের জন্য scan: খুঁজে পাওয়া সবচেয়ে সহজ মূল word বাছুন (নাম, সংখ্যা, তারিখ, capital-যুক্ত word) আর শুধু সেটাই খুঁজুন।'),
        l('Then read closely: when you find the place, read the sentence and the one after it carefully — the answer is there.', 'তারপর মন দিয়ে পড়ুন: জায়গাটা পেলে সেই sentence আর পরেরটা খুঁটিয়ে পড়ুন — উত্তর সেখানেই।'),
        l('About 20 minutes per passage. Do not get stuck: guess, flag and move on — there is no negative marking.', 'প্রতি passage-এ প্রায় ২০ মিনিট। আটকে থাকবেন না: আন্দাজ করুন, চিহ্ন দিন, এগিয়ে যান — ভুলে নম্বর কাটে না।'),
        l('Common mix-up: translating every unknown word. You rarely need every word — guess from context and keep going.', 'সাধারণ ভুল: প্রতিটা অজানা word অনুবাদ করা। সব word খুব কমই লাগে — context থেকে আন্দাজ করে এগিয়ে যান।'),
      ],
    },
    {
      kind: 'examples',
      title: l('What to scan for', 'কীসের জন্য scan করবেন'),
      items: [
        { en: 'Question: "In which year did…?" → scan for four-digit numbers', note: l('dates', 'তারিখ') },
        { en: 'Question: "What did Professor Khan argue?" → scan for "Khan"', note: l('names', 'নাম') },
        { en: 'Question: "How much land…?" → scan for numbers and units (hectares, %)', note: l('quantities', 'পরিমাণ') },
        { en: 'Question about "raised homes" → scan for "raised", "platforms", "homes"', note: l('key nouns', 'মূল noun') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'reading', example: '3 passages · 40 questions · 60 minutes', note: l('About 20 minutes per passage.', 'প্রতি passage-এ প্রায় ২০ মিনিট।') },
        { skill: 'listening', example: 'Reading questions quickly before each Listening part', note: l('The same fast reading.', 'একই দ্রুত পড়া।') },
        { skill: 'writing', example: 'Skim a Task 1 chart for its main trend before details', note: l('Overview first.', 'আগে সামগ্রিক চিত্র।') },
        { skill: 'speaking', example: 'Scan a Part 2 cue card for the four prompts', note: l('Find what you must cover.', 'কী বলতে হবে খুঁজুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Reading every word before looking at the questions', right: 'Skim, then scan for each question', why: l('Read with a purpose.', 'উদ্দেশ্য নিয়ে পড়ুন।') },
        { wrong: 'Spending 35 minutes on Passage 1', right: 'About 20 minutes per passage', why: l('Three passages, 60 minutes.', 'তিনটা passage, ৬০ মিনিট।') },
        { wrong: 'Leaving a hard question blank', right: 'Guess, flag, move on', why: l('No negative marking.', 'ভুলে নম্বর কাটে না।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('rd-1-p1', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Skim the Jamuna passage. What is it mainly about?', 'Jamuna passage-টা skim করুন। এটা মূলত কী নিয়ে?'), sentence: RIVER, options: ['Farming on river islands that keep changing', 'The history of jute exports', 'How to build a bridge'], answer: 'Farming on river islands that keep changing', explanation: l('The main idea covers the whole paragraph.', 'মূল idea পুরো paragraph জুড়ে।'), why: { 'The history of jute exports': l('Jute is only one crop in a list.', 'Jute তালিকার একটা ফসল মাত্র।'), 'How to build a bridge': l('Bridges are not mentioned.', 'Bridge-এর উল্লেখ নেই।') } }),
        choice('rd-1-p2', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Scan: when did the training begin?', 'Scan: training কবে শুরু হয়?'), sentence: RIVER, options: ['2015', 'Every year', 'Not stated'], answer: '2015', explanation: l('"Since 2015".', '"Since 2015"।'), why: { 'Every year': l('"Every year" is about the channels shifting.', '"Every year" channel সরে যাওয়া নিয়ে।'), 'Not stated': l('Scan for a year: 2015 is there.', 'একটা বছর scan করুন: 2015 আছে।') } }),
        choice('rd-1-p3', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Which is the best thing to scan for in "How far can the river move?"', '"How far can the river move?" প্রশ্নে কীসের জন্য scan করা সবচেয়ে ভালো?'), options: ['A distance, such as "kilometre"', 'The word "farmers"', 'The first word of the passage'], answer: 'A distance, such as "kilometre"', explanation: l('"How far" asks for a distance.', '"How far" দূরত্ব জিজ্ঞেস করে।'), why: { 'The word "farmers"': l('Farmers are not a distance.', 'Farmer দূরত্ব না।'), 'The first word of the passage': l('Scan for the type of answer the question needs.', 'প্রশ্ন যে ধরনের উত্তর চায় তার জন্য scan করুন।') } }),
        choice('rd-1-p4', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('How long should you spend on each passage?', 'প্রতিটা passage-এ কত সময় দেবেন?'), options: ['About 20 minutes', 'About 10 minutes', 'As long as it takes'], answer: 'About 20 minutes', explanation: l('60 minutes, 3 passages.', '৬০ মিনিট, ৩টা passage।'), why: { 'About 10 minutes': l('That rushes each passage and leaves time unplanned.', 'এতে প্রতিটা passage তাড়াহুড়োয় হয় আর সময় অপরিকল্পিত থাকে।'), 'As long as it takes': l('Then the last passage gets no time.', 'তাহলে শেষ passage সময় পায় না।') } }),
        choice('rd-1-p5', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('You are stuck on question 9 after 3 minutes. What now?', '৩ মিনিট ধরে প্রশ্ন ৯-এ আটকে আছেন। এখন কী?'), options: ['Guess, flag it and move on', 'Keep reading until you find it', 'Leave it blank'], answer: 'Guess, flag it and move on', explanation: l('No negative marking.', 'ভুলে নম্বর কাটে না।'), why: { 'Keep reading until you find it': l('One question can cost several others.', 'একটা প্রশ্ন আরও কয়েকটার নম্বর খেয়ে ফেলতে পারে।'), 'Leave it blank': l('A blank is always zero; a guess may be right.', 'ফাঁকা সবসময় শূন্য; আন্দাজ ঠিক হতে পারে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('rd-1-r1', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Scan the passage. Write ONE WORD.', 'Passage scan করুন। একটা word লিখুন।'), sentence: `${RIVER} → The sandy islands in the river are called ___.`, accepted: ['chars'], explanation: l('"the chars — the sandy islands".', '"the chars — the sandy islands"।') }),
        gap('rd-1-r2', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'IELTS Reading has ___ questions.', accepted: ['40', 'forty'], explanation: l('40.', '৪০।') }),
        spot('rd-1-r3', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('One word makes this false. Tap it and fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Scanning is reading for the main idea.', wrong: 'Scanning', accepted: ['Skimming'], explanation: l('Skimming = main idea; scanning = details.', 'Skimming = মূল idea; scanning = নির্দিষ্ট তথ্য।') }),
        correct('rd-1-r4', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Correct the false statement.', 'ভুল বাক্যটা ঠিক করুন।'), sentence: 'IELTS Reading gives 10 extra minutes to transfer answers.', accepted: ['IELTS Reading gives no extra time to transfer answers.', 'IELTS Reading has no extra time to transfer answers.', 'IELTS Reading gives no extra minutes to transfer answers.'], explanation: l('No extra transfer time.', 'উত্তর তোলার আলাদা সময় নেই।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('rd-1-c1', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Which is fastest to scan for?', 'কোনটা scan করা সবচেয়ে দ্রুত?'), options: ['A date like 2015', 'An idea like "difficulty"', 'A common word like "the"'], answer: 'A date like 2015', explanation: l('Numbers and names stand out.', 'সংখ্যা আর নাম চোখে পড়ে।') }),
        spot('rd-1-c2', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('One word makes this advice wrong. Tap it, then fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'In IELTS Reading, wrong answers lose marks.', wrong: 'lose', accepted: ['do not lose', "don't lose"], fixOptions: ['do not lose', 'lost', 'losing'], explanation: l('No negative marking.', 'ভুলে নম্বর কাটে না।') }),
        order('rd-1-c3', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Build the strategy.', 'কৌশলটা সাজান।'), answer: 'Skim for the main idea, then scan for details.', explanation: l('Skim → scan.', 'Skim → scan।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: plan 60 minutes', 'এবার আপনার পালা: ৬০ মিনিটের plan'),
      exercises: [
        write('rd-1-y1', 'rd-skim', {
          ...P,
          prompt: l('Write 3 sentences describing how you will use the 60 minutes of IELTS Reading, including skimming, scanning and what you do when stuck.', 'IELTS Reading-এর ৬০ মিনিট কীভাবে ব্যবহার করবেন — ৩টা sentence-এ লিখুন, skimming, scanning আর আটকে গেলে কী করবেন সহ।'),
          model: 'I will spend about 20 minutes on each passage. For each passage, I will skim the first sentence of every paragraph and then scan for names, numbers and key words from the questions. If I am stuck for more than a minute, I will guess, flag the question and move on.',
          checklist: [l('about 20 minutes per passage', 'প্রতি passage-এ প্রায় ২০ মিনিট'), l('skim then scan', 'আগে skim, তারপর scan'), l('guess, flag, move on', 'আন্দাজ, চিহ্ন, এগিয়ে যাওয়া')],
          explanation: l('Read with a purpose.', 'উদ্দেশ্য নিয়ে পড়ুন।'),
          task: 'The student describes how they will use the 60 minutes of IELTS Reading. Judge the facts and strategy first: 3 sections, 40 questions, 60 minutes, no extra transfer time; about 20 minutes per passage; skim for main ideas (first sentences, key nouns) and scan for names, numbers, dates and key words; do not get stuck — guess, flag and move on because there is no negative marking. Then correct grammar only where it blocks the meaning. Correct any wrong fact gently.',
          target: l('Skimming, scanning and timing', 'Skimming, scanning আর সময়'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('3 sections · 40 questions · 60 minutes · no transfer time · about 20 minutes per passage.', '৩ section · ৪০ প্রশ্ন · ৬০ মিনিট · উত্তর তোলার সময় নেই · প্রতি passage-এ প্রায় ২০ মিনিট।'),
        l('Skim for main ideas; scan for names, numbers, dates, key words.', 'মূল idea-র জন্য skim; নাম, সংখ্যা, তারিখ, মূল word-এর জন্য scan।'),
        l('Stuck? Guess, flag, move on — no negative marking.', 'আটকে গেলে? আন্দাজ, চিহ্ন, এগিয়ে যান — ভুলে নম্বর কাটে না।'),
      ],
    },
  ],
};

const MARKET = 'Mobile banking has changed daily life in rural Bangladesh. In 2012, few villagers had a bank account; by 2022, a large share of households used a mobile wallet to receive money from relatives working in cities. Researchers found that families saved travel time, although some older users still preferred cash because they did not trust the technology.';

// ======================================================================= rd-2
export const rdParaphrase: Lesson = {
  id: 'rd-2',
  format: 'v2',
  concept: 'rd-paraphrase',
  title: l('Keywords and paraphrasing', 'Keyword আর paraphrasing'),
  why: l('IELTS questions almost never copy the passage. They say the same thing in different words. Answers come from matching meaning; identical words in an option are often a trap.', 'IELTS প্রশ্ন প্রায় কখনো passage হুবহু তোলে না। একই কথা অন্য word-এ বলে। উত্তর আসে অর্থ মিলিয়ে; option-এ হুবহু word প্রায়ই ফাঁদ।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('Same meaning, different words', 'একই অর্থ, আলাদা word'),
      situation: l('Passage: "…families saved travel time…". Question: "Mobile banking meant people spent less time on journeys." Sana says: "The words are different, so it’s not in the passage."', 'Passage: "…families saved travel time…"। প্রশ্ন: "Mobile banking meant people spent less time on journeys।" Sana বলেন: "Word আলাদা, তাই passage-এ নেই।"'),
      question: l('Is Sana right?', 'Sana কি ঠিক?'),
      options: ['No — "saved travel time" = "spent less time on journeys"', 'Yes — the words must match', 'Only if "journeys" appears'],
      answer: 'No — "saved travel time" = "spent less time on journeys"',
      diagnose: {
        'No — "saved travel time" = "spent less time on journeys"': l('Right. IELTS paraphrases: saved → spent less; travel → journeys. Match the meaning.', 'ঠিক। IELTS paraphrase করে: saved → spent less; travel → journeys। অর্থ মেলান।'),
        'Yes — the words must match': l('Questions almost always use different words. Matching meaning is the skill.', 'প্রশ্নে প্রায় সবসময় আলাদা word থাকে। অর্থ মেলানোই দক্ষতা।'),
        'Only if "journeys" appears': l('"journeys" paraphrases "travel". The exact word does not need to appear.', '"journeys" হলো "travel"-এর paraphrase। হুবহু word থাকার দরকার নেই।'),
      },
    },
    {
      kind: 'discover',
      title: l('How questions paraphrase', 'প্রশ্ন কীভাবে paraphrase করে'),
      items: [
        { en: `Passage: "${MARKET}"`, note: l('a short passage', 'একটা ছোট passage') },
        { en: '"few villagers had a bank account" → "most rural people were unbanked"', note: l('synonyms + opposite form', 'synonym + উল্টো গঠন') },
        { en: '"did not trust the technology" → "were suspicious of the new system"', note: l('different words, same idea', 'আলাদা word, একই idea') },
        { en: '"a large share of households" → "many families"', note: l('general ↔ specific', 'সাধারণ ↔ নির্দিষ্ট') },
      ],
      question: l('Which question word is easiest to find in the passage?', 'কোন প্রশ্ন-word passage-এ খুঁজে পাওয়া সবচেয়ে সহজ?'),
      options: [
        l('A name or number (2012, 2022), which is usually not paraphrased', 'নাম বা সংখ্যা (2012, 2022), যা সাধারণত paraphrase হয় না'),
        l('An idea word like "suspicious"', '"suspicious"-এর মতো idea-word'),
        l('A small word like "the"', '"the"-এর মতো ছোট word'),
      ],
      answer: 0,
      pattern: l('Keywords: underline names, numbers and dates (usually unchanged) to find the place; then match the meaning of the idea words, which are usually paraphrased.', 'Keyword: জায়গা খুঁজতে নাম, সংখ্যা আর তারিখ দাগ দিন (সাধারণত বদলায় না); তারপর idea-word-এর অর্থ মেলান, যা সাধারণত paraphrase করা।'),
    },
    {
      kind: 'concept',
      title: l('Matching meaning, not words', 'Word না, অর্থ মেলানো'),
      body: l(
        'Every question has two kinds of word: locators that help you find the place, and idea words that are paraphrased.',
        'প্রতিটা প্রশ্নে দুই ধরনের word: জায়গা খুঁজতে সাহায্য করে এমন locator, আর paraphrase করা idea-word।',
      ),
      points: [
        l('Locators: names, numbers, dates, technical terms and capitalised words — scan for these first.', 'Locator: নাম, সংখ্যা, তারিখ, technical term আর capital-যুক্ত word — আগে এগুলোর জন্য scan করুন।'),
        l('Idea words are paraphrased: synonyms (rise → increase), word forms (decided → decision), opposites with "not" (few → most … not), general / specific (vegetables → carrots).', 'Idea-word paraphrase করা: synonym (rise → increase), word form (decided → decision), "not"-সহ উল্টো (few → most … not), সাধারণ / নির্দিষ্ট (vegetables → carrots)।'),
        l('Questions follow the passage order in most task types — use this to find the next answer.', 'বেশিরভাগ task-এ প্রশ্ন passage-এর ক্রম মেনে চলে — পরের উত্তর খুঁজতে এটা কাজে লাগান।'),
        l('Identical words in an option are often a trap: the passage uses the word, but says something different about it.', 'Option-এ হুবহু word প্রায়ই ফাঁদ: passage-এ word-টা আছে, কিন্তু সে সম্পর্কে অন্য কথা বলে।'),
        l('Common mix-up: looking for the exact question words and deciding "not there". Look for the same meaning instead.', 'সাধারণ ভুল: প্রশ্নের হুবহু word খুঁজে "নেই" ধরে নেওয়া। বরং একই অর্থ খুঁজুন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Paraphrases you will meet', 'যে paraphrase পাবেন'),
      items: [
        { en: 'increased sharply → rose dramatically', note: l('synonyms', 'synonym') },
        { en: 'the government decided → the decision by the state', note: l('word form', 'word form') },
        { en: 'not many people → only a minority', note: l('opposite form', 'উল্টো গঠন') },
        { en: 'children under 12 → young pupils', note: l('general / specific', 'সাধারণ / নির্দিষ্ট') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where paraphrase appears', 'Paraphrase কোথায় আসে'),
      uses: [
        { skill: 'reading', example: 'Every question type paraphrases the passage.', note: l('The core Reading skill.', 'Reading-এর মূল দক্ষতা।') },
        { skill: 'listening', example: 'Options paraphrase what speakers say.', note: l('The same skill by ear.', 'কানে একই দক্ষতা।') },
        { skill: 'writing', example: 'Paraphrase the Task 1 / Task 2 question in your first sentence.', note: l('Your own words.', 'নিজের word।') },
        { skill: 'speaking', example: 'Rephrase when you cannot find a word.', note: l('Keeps you fluent.', 'সাবলীল রাখে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Choosing an option because it copies passage words', right: 'Check that the meaning matches', why: l('Identical words are often traps.', 'হুবহু word প্রায়ই ফাঁদ।') },
        { wrong: 'Deciding "not in the passage" because the words differ', right: 'Look for the same meaning', why: l('Questions paraphrase.', 'প্রশ্ন paraphrase করে।') },
        { wrong: 'Scanning for an idea word', right: 'Scan for a locator (name, number, date)', why: l('Locators are unchanged.', 'Locator বদলায় না।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('rd-2-p1', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('Which phrase means the same as "saved travel time"?', '"saved travel time"-এর সমান অর্থ কোনটা?'), options: ['spent less time on journeys', 'travelled more often', 'saved money on tickets'], answer: 'spent less time on journeys', explanation: l('saved time = spent less time.', 'saved time = কম সময় খরচ।'), why: { 'travelled more often': l('Frequency is not mentioned.', 'কতবার — তা বলা হয়নি।'), 'saved money on tickets': l('The passage says time, not money.', 'Passage-এ সময়, টাকা না।') } }),
        choice('rd-2-p2', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('"few villagers had a bank account" means…', '"few villagers had a bank account" মানে…'), options: ['most villagers had no bank account', 'many villagers had bank accounts', 'villagers had two accounts'], answer: 'most villagers had no bank account', explanation: l('few had → most had not.', 'few had → most had not।'), why: { 'many villagers had bank accounts': l('The opposite of "few".', '"few"-এর উল্টো।'), 'villagers had two accounts': l('The number of accounts is not the point.', 'Account-এর সংখ্যা মূল কথা না।') } }),
        choice('rd-2-p3', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('Which is the best LOCATOR for "What changed between 2012 and 2022?"', '"What changed between 2012 and 2022?"-এর সবচেয়ে ভালো locator কোনটা?'), options: ['2012 / 2022', 'changed', 'what'], answer: '2012 / 2022', explanation: l('Dates are not paraphrased.', 'তারিখ paraphrase হয় না।'), why: { changed: l('"changed" may be paraphrased (rose, grew).', '"changed" paraphrase হতে পারে (rose, grew)।'), what: l('Question words are not in the passage.', 'প্রশ্ন-word passage-এ থাকে না।') } }),
        choice('rd-2-p4', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('"some older users … did not trust the technology". Which option matches?', '"some older users … did not trust the technology"। কোন option মেলে?'), options: ['Some elderly people were suspicious of mobile banking.', 'Older users trusted the technology.', 'All users preferred cash.'], answer: 'Some elderly people were suspicious of mobile banking.', explanation: l('older → elderly; did not trust → suspicious.', 'older → elderly; did not trust → suspicious।'), why: { 'Older users trusted the technology.': l('It copies the words but reverses the meaning.', 'Word হুবহু, কিন্তু অর্থ উল্টো।'), 'All users preferred cash.': l('"some older users", not "all users".', '"some older users", "all users" না।') } }),
        choice('rd-2-p5', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('Why is an option that repeats passage words often a trap?', 'Passage-এর word হুবহু থাকা option কেন প্রায়ই ফাঁদ?'), options: ['The passage uses the word but says something different about it', 'Repeated words are always correct', 'Examiners never repeat words'], answer: 'The passage uses the word but says something different about it', explanation: l('Match meaning, not words.', 'Word না, অর্থ মেলান।'), why: { 'Repeated words are always correct': l('Traps often copy words and change the meaning.', 'ফাঁদ প্রায়ই word তোলে আর অর্থ বদলায়।'), 'Examiners never repeat words': l('They sometimes do — as a trap or a locator.', 'কখনো করেন — ফাঁদ বা locator হিসেবে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('rd-2-r1', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('Write a one-word paraphrase of "rose".', '"rose"-এর এক-word paraphrase লিখুন।'), sentence: 'Prices rose. → Prices ___.', accepted: ['increased', 'grew', 'climbed', 'went'], explanation: l('increased / grew / climbed.', 'increased / grew / climbed।') }),
        gap('rd-2-r2', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('Write the noun form (one word).', 'Noun form লিখুন (একটা word)।'), sentence: 'The council decided to close the road. → The council’s ___ to close the road', accepted: ['decision'], explanation: l('decided → decision.', 'decided → decision।') }),
        spot('rd-2-r3', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('One word changes the meaning. Tap it and fix it.', 'একটা word অর্থ বদলে দেয়। Tap করে ঠিক করুন।'), sentence: 'Passage: "few villagers had accounts" = Question: many villagers had accounts.', wrong: 'many', accepted: ['few', 'not many'], explanation: l('few ≠ many.', 'few ≠ many।') }),
        correct('rd-2-r4', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('Correct the strategy.', 'কৌশলটা ঠিক করুন।'), sentence: 'Scan the passage for the exact idea words in the question.', accepted: ['Scan the passage for names, numbers and dates, then match the meaning.', 'Scan the passage for locators, then match the meaning.', 'Scan the passage for the same meaning, not the exact words.'], explanation: l('Locators first, then meaning.', 'আগে locator, তারপর অর্থ।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('rd-2-c1', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('Which is a paraphrase of "children under 12"?', '"children under 12"-এর paraphrase কোনটা?'), options: ['young pupils', 'teenagers', 'adults'], answer: 'young pupils', explanation: l('A general way to say the same group.', 'একই দলের সাধারণ রূপ।') }),
        spot('rd-2-c2', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('One word breaks the paraphrase. Tap it, then fix it.', 'একটা word paraphrase ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Passage: "sales fell sharply" = Question: sales rose dramatically.', wrong: 'rose', accepted: ['dropped', 'fell', 'declined', 'decreased'], fixOptions: ['dropped', 'raised', 'grew'], explanation: l('fell = dropped.', 'fell = dropped।') }),
        order('rd-2-c3', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('Build the strategy.', 'কৌশলটা সাজান।'), answer: 'Match the meaning, not the words.', explanation: l('Paraphrase.', 'Paraphrase।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: paraphrase a sentence', 'এবার আপনার পালা: একটা sentence paraphrase'),
      exercises: [
        write('rd-2-y1', 'rd-paraphrase', {
          ...P,
          prompt: l('Paraphrase two sentences from the mobile banking passage in your own words, keeping the same meaning. Then write one sentence explaining which words you changed.', 'Mobile banking passage-এর দুটো sentence নিজের word-এ paraphrase করুন, একই অর্থ রেখে। তারপর একটা sentence-এ লিখুন কোন word বদলেছেন।'),
          model: 'By 2022, many families used a phone wallet to get money from relatives in cities. Some elderly users were suspicious of the new system and still preferred cash. I changed "households" to "families", "receive" to "get" and "did not trust" to "were suspicious of".',
          checklist: [l('the same meaning', 'একই অর্থ'), l('synonyms or new word forms', 'synonym বা নতুন word form'), l('numbers and names unchanged', 'সংখ্যা আর নাম অপরিবর্তিত')],
          explanation: l('Paraphrase = same meaning, new words.', 'Paraphrase = একই অর্থ, নতুন word।'),
          task: `The student paraphrases two sentences from this passage and explains the changes: "${MARKET}". Judge the paraphrase first: the meaning must stay the same (no added or lost information, same strength: some ≠ all, few ≠ many), synonyms must fit, and names, numbers and dates should stay unchanged. Then correct grammar only where it blocks the meaning. Point out any change that alters the meaning.`,
          target: l('Paraphrasing', 'Paraphrasing'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Locators (names, numbers, dates) find the place; idea words are paraphrased.', 'Locator (নাম, সংখ্যা, তারিখ) জায়গা খুঁজে দেয়; idea-word paraphrase করা।'),
        l('Paraphrase = synonyms, word forms, opposites with "not", general / specific.', 'Paraphrase = synonym, word form, "not"-সহ উল্টো, সাধারণ / নির্দিষ্ট।'),
        l('Identical words in an option are often a trap.', 'Option-এ হুবহু word প্রায়ই ফাঁদ।'),
      ],
    },
  ],
};

const SCHOOL = 'In 2018, a school in Rajshahi introduced a daily 20-minute reading period. After two years, the school reported that pupils’ reading test scores had improved. The headteacher believes that the programme also made pupils more confident, although this has not been measured.';

// ======================================================================= rd-3
export const rdTfng: Lesson = {
  id: 'rd-3',
  format: 'v2',
  concept: 'rd-tfng',
  title: l('True / False / Not Given', 'True / False / Not Given'),
  why: l('TRUE / FALSE / NOT GIVEN costs more marks than any other task, because "Not Given" feels like "False". The difference: False = the passage says the opposite; Not Given = the passage does not say.', 'TRUE / FALSE / NOT GIVEN অন্য যেকোনো task-এর চেয়ে বেশি নম্বর কাটে, কারণ "Not Given" দেখতে "False"-এর মতো লাগে। পার্থক্য: False = passage উল্টো বলে; Not Given = passage বলে না।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('False or Not Given?', 'False না Not Given?'),
      situation: l(`Passage: "${SCHOOL}" Statement: "The reading period made pupils more confident."`, `Passage: "${SCHOOL}" Statement: "The reading period made pupils more confident।"`),
      question: l('TRUE, FALSE or NOT GIVEN?', 'TRUE, FALSE না NOT GIVEN?'),
      options: ['NOT GIVEN', 'TRUE', 'FALSE'],
      answer: 'NOT GIVEN',
      diagnose: {
        'NOT GIVEN': l('Right. The headteacher believes it, but "this has not been measured" — the passage does not say it is a fact.', 'ঠিক। Headteacher এটা বিশ্বাস করেন, কিন্তু "this has not been measured" — passage বলে না এটা তথ্য।'),
        TRUE: l('The passage only gives a belief that "has not been measured"; it does not confirm the fact.', 'Passage শুধু একটা বিশ্বাস দেয় যা "has not been measured"; তথ্য নিশ্চিত করে না।'),
        FALSE: l('The passage does not say pupils did NOT become more confident. It simply does not know.', 'Passage বলে না যে শিক্ষার্থীরা আত্মবিশ্বাসী হয়নি। এটা শুধু জানে না।'),
      },
    },
    {
      kind: 'discover',
      title: l('Three answers, three tests', 'তিনটা উত্তর, তিনটা যাচাই'),
      items: [
        { en: '"The reading period started in 2018." → TRUE', note: l('the passage says the same', 'passage একই কথা বলে') },
        { en: '"The reading period lasted one hour a day." → FALSE', note: l('the passage says 20 minutes: the opposite', 'passage বলে ২০ মিনিট: উল্টো') },
        { en: '"Other schools in Rajshahi copied the idea." → NOT GIVEN', note: l('other schools are not mentioned', 'অন্য school-এর উল্লেখ নেই') },
        { en: 'YES / NO / NOT GIVEN = the same logic for the writer’s views or claims', note: l('opinions, not facts', 'মত, তথ্য না') },
      ],
      question: l('When do you choose FALSE rather than NOT GIVEN?', 'কখন NOT GIVEN না বেছে FALSE বাছবেন?'),
      options: [
        l('When the passage says something that contradicts the statement', 'যখন passage এমন কিছু বলে যা বাক্যের বিপরীত'),
        l('When you cannot find the information', 'যখন তথ্য খুঁজে পান না'),
        l('When you think the statement is unlikely', 'যখন মনে হয় বাক্যটা অসম্ভাব্য'),
      ],
      answer: 0,
      pattern: l('TRUE = the passage says it. FALSE = the passage says the opposite. NOT GIVEN = the passage does not say. Use only the passage, never your own knowledge.', 'TRUE = passage বলে। FALSE = passage উল্টো বলে। NOT GIVEN = passage বলে না। শুধু passage ব্যবহার করুন, নিজের জ্ঞান কখনো না।'),
    },
    {
      kind: 'concept',
      title: l('Deciding TRUE, FALSE or NOT GIVEN', 'TRUE, FALSE না NOT GIVEN ঠিক করা'),
      body: l(
        'TRUE / FALSE / NOT GIVEN checks facts in the passage; YES / NO / NOT GIVEN checks the writer’s views or claims. The logic is the same.',
        'TRUE / FALSE / NOT GIVEN passage-এর তথ্য যাচাই করে; YES / NO / NOT GIVEN লেখকের মত বা দাবি যাচাই করে। যুক্তি একই।',
      ),
      points: [
        l('TRUE / YES: the passage says the same thing, usually paraphrased.', 'TRUE / YES: passage একই কথা বলে, সাধারণত paraphrase করে।'),
        l('FALSE / NO: the passage says the opposite — a different number, the reverse idea, or a contradiction.', 'FALSE / NO: passage উল্টো বলে — ভিন্ন সংখ্যা, বিপরীত idea বা বৈপরীত্য।'),
        l('NOT GIVEN: the passage does not say whether it is true. If only part of the statement is supported, it is not TRUE.', 'NOT GIVEN: passage বলে না সত্য কি না। বাক্যের শুধু অংশ সমর্থিত হলে তা TRUE না।'),
        l('Watch qualifiers (all, some, only, always, never), comparisons (more, most, first) and numbers — one word can change the answer. Questions follow the passage order.', 'Qualifier (all, some, only, always, never), তুলনা (more, most, first) আর সংখ্যায় খেয়াল রাখুন — একটা word উত্তর বদলে দিতে পারে। প্রশ্ন passage-এর ক্রমে।'),
        l('Common mix-up: using your own knowledge ("schools usually do this, so TRUE"). Only the passage counts.', 'সাধারণ ভুল: নিজের জ্ঞান ব্যবহার ("school সাধারণত এটা করে, তাই TRUE")। শুধু passage গোনা হয়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Qualifiers that change the answer', 'যে qualifier উত্তর বদলায়'),
      items: [
        { en: 'Passage: "only pupils in Class 6 took part" · Statement: "all pupils took part" → FALSE', note: l('only Class 6 contradicts all', 'only Class 6 আর all পরস্পরবিরোধী') },
        { en: 'Passage: "the first school in the city" · Statement: "one of several earlier schools" → FALSE', note: l('first vs earlier ones', 'first বনাম আগের') },
        { en: 'Passage: "scores improved" · Statement: "scores improved by 30%" → NOT GIVEN', note: l('the number is not given', 'সংখ্যা দেওয়া নেই') },
        { en: 'Passage: "after two years" · Statement: "within six months" → FALSE', note: l('a different time', 'ভিন্ন সময়') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this logic helps', 'এই যুক্তি কোথায় কাজে লাগে'),
      uses: [
        { skill: 'reading', example: 'TRUE / FALSE / NOT GIVEN and YES / NO / NOT GIVEN tasks', note: l('Facts vs views.', 'তথ্য বনাম মত।') },
        { skill: 'listening', example: 'Checking whether a speaker confirms or rejects an idea', note: l('The same careful logic.', 'একই সতর্ক যুক্তি।') },
        { skill: 'writing', example: 'Task 1: only report what the chart shows — no guesses', note: l('No information that is "not given".', '"Not given" তথ্য না।') },
        { skill: 'speaking', example: 'Part 3: separate facts from opinions ("Research shows…" vs "I believe…")', note: l('Clear claims.', 'পরিষ্কার দাবি।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Choosing FALSE when the information is missing', right: 'Missing → NOT GIVEN', why: l('FALSE needs a contradiction.', 'FALSE-এর জন্য বৈপরীত্য লাগে।') },
        { wrong: 'Using general knowledge', right: 'Use only the passage', why: l('The passage decides.', 'Passage ঠিক করে।') },
        { wrong: 'TRUE when only half the statement is supported', right: 'Every part must be supported', why: l('Partial support is not TRUE.', 'আংশিক সমর্থন TRUE না।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('rd-3-p1', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Statement: "The reading period was introduced in 2018."', 'বাক্য: "The reading period was introduced in 2018।"'), sentence: SCHOOL, options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: l('"In 2018, a school … introduced".', '"In 2018, a school … introduced"।'), why: { FALSE: l('The date matches.', 'তারিখ মেলে।'), 'NOT GIVEN': l('The passage states it directly.', 'Passage সরাসরি বলে।') } }),
        choice('rd-3-p2', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Statement: "Each reading session lasted 40 minutes."', 'বাক্য: "Each reading session lasted 40 minutes।"'), sentence: SCHOOL, options: ['FALSE', 'TRUE', 'NOT GIVEN'], answer: 'FALSE', explanation: l('The passage says 20 minutes.', 'Passage বলে ২০ মিনিট।'), why: { TRUE: l('20 ≠ 40.', '২০ ≠ ৪০।'), 'NOT GIVEN': l('The length is given — and it is different.', 'দৈর্ঘ্য দেওয়া আছে — আর তা ভিন্ন।') } }),
        choice('rd-3-p3', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Statement: "Parents supported the reading period."', 'বাক্য: "Parents supported the reading period।"'), sentence: SCHOOL, options: ['NOT GIVEN', 'TRUE', 'FALSE'], answer: 'NOT GIVEN', explanation: l('Parents are not mentioned.', 'Parent-দের উল্লেখ নেই।'), why: { TRUE: l('Nothing is said about parents.', 'Parent নিয়ে কিছু বলা হয়নি।'), FALSE: l('The passage does not say parents opposed it.', 'Passage বলে না parent-রা বিরোধিতা করেছিলেন।') } }),
        choice('rd-3-p4', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Statement: "Reading test scores improved within one year."', 'বাক্য: "Reading test scores improved within one year।"'), sentence: SCHOOL, options: ['FALSE', 'TRUE', 'NOT GIVEN'], answer: 'NOT GIVEN', explanation: l('The passage reports results "after two years"; it does not say what happened after one year.', 'Passage "after two years"-এর ফল জানায়; এক বছর পরে কী হয়েছিল বলে না।'), why: { TRUE: l('"after two years", not "within one year".', '"after two years", "within one year" না।'), FALSE: l('It does not say scores had NOT improved after one year — only when the school reported.', 'এক বছর পরে উন্নতি হয়নি এমন বলে না — শুধু কখন school জানিয়েছিল।') } }),
        choice('rd-3-p5', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('What does YES / NO / NOT GIVEN check?', 'YES / NO / NOT GIVEN কী যাচাই করে?'), options: ['The writer’s views or claims', 'Facts only', 'Numbers only'], answer: 'The writer’s views or claims', explanation: l('YNNG = views; TFNG = facts.', 'YNNG = মত; TFNG = তথ্য।'), why: { 'Facts only': l('That is TRUE / FALSE / NOT GIVEN.', 'ওটা TRUE / FALSE / NOT GIVEN।'), 'Numbers only': l('Both task types check any kind of statement.', 'দুই ধরনের task-ই যেকোনো বাক্য যাচাই করে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('rd-3-r1', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Write TRUE, FALSE or NOT GIVEN.', 'TRUE, FALSE বা NOT GIVEN লিখুন।'), sentence: `${SCHOOL} → "The school is in Rajshahi." ___`, accepted: ['TRUE'], explanation: l('"a school in Rajshahi".', '"a school in Rajshahi"।') }),
        gap('rd-3-r2', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Write TRUE, FALSE or NOT GIVEN.', 'TRUE, FALSE বা NOT GIVEN লিখুন।'), sentence: `${SCHOOL} → "The programme cost very little." ___`, accepted: ['NOT GIVEN'], explanation: l('Cost is not mentioned.', 'খরচের উল্লেখ নেই।') }),
        spot('rd-3-r3', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('One word makes this rule wrong. Tap it and fix it.', 'একটা word এই নিয়মকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'If the information is missing from the passage, the answer is FALSE.', wrong: 'FALSE', accepted: ['NOT GIVEN'], explanation: l('Missing → NOT GIVEN.', 'অনুপস্থিত → NOT GIVEN।') }),
        correct('rd-3-r4', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Correct the rule.', 'নিয়মটা ঠিক করুন।'), sentence: 'FALSE means the passage does not mention the statement.', accepted: ['FALSE means the passage says the opposite of the statement.', 'NOT GIVEN means the passage does not mention the statement.', 'FALSE means the passage contradicts the statement.'], explanation: l('FALSE = contradiction.', 'FALSE = বৈপরীত্য।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('rd-3-c1', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Passage: "Some farmers grow jute." Statement: "Only farmers grow jute." Answer?', 'Passage: "Some farmers grow jute।" বাক্য: "Only farmers grow jute।" উত্তর?'), options: ['NOT GIVEN', 'TRUE', 'FALSE'], answer: 'NOT GIVEN', explanation: l('The passage does not say whether others grow jute.', 'অন্যরা jute চাষ করে কি না passage বলে না।') }),
        correct('rd-3-c2', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'Answer TFNG questions using your own knowledge.', accepted: ['Answer TFNG questions using only the passage.', 'Answer TFNG questions using the passage only.', 'Answer TFNG questions using only the information in the passage.'], explanation: l('Only the passage counts.', 'শুধু passage গোনা হয়।') }),
        order('rd-3-c3', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'FALSE means the passage says the opposite.', explanation: l('Contradiction.', 'বৈপরীত্য।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: explain three answers', 'এবার আপনার পালা: তিনটা উত্তর ব্যাখ্যা'),
      exercises: [
        write('rd-3-y1', 'rd-tfng', {
          ...P,
          prompt: l('Using the Rajshahi school passage, write one TRUE, one FALSE and one NOT GIVEN statement, and explain each in a few words.', 'Rajshahi school passage ব্যবহার করে একটা TRUE, একটা FALSE আর একটা NOT GIVEN বাক্য লিখুন, আর প্রতিটা কয়েক word-এ ব্যাখ্যা করুন।'),
          model: 'TRUE: The reading period started in 2018 — the passage gives the same year. FALSE: The sessions lasted an hour — the passage says 20 minutes. NOT GIVEN: The school received government money — funding is not mentioned.',
          checklist: [l('TRUE: the passage says the same', 'TRUE: passage একই বলে'), l('FALSE: the passage says the opposite', 'FALSE: passage উল্টো বলে'), l('NOT GIVEN: the passage does not say', 'NOT GIVEN: passage বলে না')],
          explanation: l('Use only the passage.', 'শুধু passage ব্যবহার করুন।'),
          task: `The student writes one TRUE, one FALSE and one NOT GIVEN statement about this passage, with reasons: "${SCHOOL}". Check each label against the passage: TRUE only if the passage says the same (all parts supported); FALSE only if the passage says the opposite (e.g. a different number or time); NOT GIVEN if the passage does not say (e.g. costs, parents, other schools, or the headteacher’s unmeasured belief about confidence). Explain any label that is wrong. Then correct grammar only where it blocks the meaning.`,
          target: l('TRUE / FALSE / NOT GIVEN logic', 'TRUE / FALSE / NOT GIVEN যুক্তি'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('TRUE = says it · FALSE = says the opposite · NOT GIVEN = does not say.', 'TRUE = বলে · FALSE = উল্টো বলে · NOT GIVEN = বলে না।'),
        l('Watch qualifiers, comparisons and numbers; partial support is not TRUE.', 'Qualifier, তুলনা আর সংখ্যায় খেয়াল; আংশিক সমর্থন TRUE না।'),
        l('Only the passage counts — never your own knowledge.', 'শুধু passage গোনা হয় — নিজের জ্ঞান কখনো না।'),
      ],
    },
  ],
};

const PARA_B = 'Many coastal villages now rely on rainwater. Salt from rising sea levels has entered wells and ponds, so families collect rain from roofs in large tanks. One family in Khulna, for example, stores enough water in the monsoon to last until December.';

// ======================================================================= rd-4
export const rdHeadings: Lesson = {
  id: 'rd-4',
  format: 'v2',
  concept: 'rd-headings',
  title: l('Matching Headings', 'Matching Headings'),
  why: l('Matching Headings tests whether you can see the main idea of a whole paragraph — not one example, not one repeated word. There are always more headings than paragraphs.', 'Matching Headings যাচাই করে পুরো paragraph-এর মূল idea ধরতে পারেন কি না — একটা উদাহরণ না, একটা পুনরাবৃত্ত word না। Heading সবসময় paragraph-এর চেয়ে বেশি থাকে।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('The tempting heading', 'লোভনীয় heading'),
      situation: l(`Paragraph B: "${PARA_B}" Headings: i) A family in Khulna · ii) Turning to the sky for water · iii) Rising sea levels explained`, `Paragraph B: "${PARA_B}" Heading: i) A family in Khulna · ii) Turning to the sky for water · iii) Rising sea levels explained`),
      question: l('Which heading fits the WHOLE paragraph?', 'কোন heading পুরো paragraph-এর সাথে মেলে?'),
      options: ['ii) Turning to the sky for water', 'i) A family in Khulna', 'iii) Rising sea levels explained'],
      answer: 'ii) Turning to the sky for water',
      diagnose: {
        'ii) Turning to the sky for water': l('Right. The paragraph is about villages relying on rainwater; Khulna is only an example, and sea levels are only the reason.', 'ঠিক। Paragraph গ্রামগুলোর বৃষ্টির পানির ওপর নির্ভরতা নিয়ে; Khulna শুধু একটা উদাহরণ, আর সমুদ্রপৃষ্ঠ শুধু কারণ।'),
        'i) A family in Khulna': l('That is one example ("for example"), not the main idea.', 'ওটা একটা উদাহরণ ("for example"), মূল idea না।'),
        'iii) Rising sea levels explained': l('Sea levels are mentioned as a cause, but the paragraph does not explain them.', 'সমুদ্রপৃষ্ঠ কারণ হিসেবে উল্লেখ আছে, কিন্তু paragraph এর ব্যাখ্যা দেয় না।'),
      },
    },
    {
      kind: 'discover',
      title: l('Main idea vs details', 'মূল idea বনাম খুঁটিনাটি'),
      items: [
        { en: 'Main idea: "Many coastal villages now rely on rainwater."', note: l('often, but not always, the first sentence', 'প্রায়ই, কিন্তু সবসময় না, প্রথম sentence') },
        { en: 'Reason: "Salt … has entered wells and ponds"', note: l('supporting detail', 'সহায়ক তথ্য') },
        { en: 'Example: "One family in Khulna, for example…"', note: l('an example — not the heading', 'উদাহরণ — heading না') },
        { en: 'A heading that repeats one word (salt, Khulna) is often a distractor', note: l('word match ≠ idea match', 'word মেলা ≠ idea মেলা') },
      ],
      question: l('What should a heading summarise?', 'Heading কী সংক্ষেপ করবে?'),
      options: [
        l('The idea of the whole paragraph', 'পুরো paragraph-এর idea'),
        l('The most interesting example', 'সবচেয়ে আকর্ষণীয় উদাহরণ'),
        l('The first word of the paragraph', 'Paragraph-এর প্রথম word'),
      ],
      answer: 0,
      pattern: l('Read all headings first; then find each paragraph’s central idea (first and last sentences help), ignore examples and details, and match the whole paragraph.', 'আগে সব heading পড়ুন; তারপর প্রতিটা paragraph-এর কেন্দ্রীয় idea খুঁজুন (প্রথম আর শেষ sentence সাহায্য করে), উদাহরণ আর খুঁটিনাটি বাদ দিন, আর পুরো paragraph মেলান।'),
    },
    {
      kind: 'concept',
      title: l('A method for Matching Headings', 'Matching Headings-এর পদ্ধতি'),
      body: l(
        'You choose one heading for each paragraph from a list; there are more headings than paragraphs, so some are never used.',
        'প্রতিটা paragraph-এর জন্য একটা তালিকা থেকে একটা heading বাছেন; heading paragraph-এর চেয়ে বেশি, তাই কিছু কখনো ব্যবহার হয় না।',
      ),
      points: [
        l('1) Read all the headings first and notice how they differ (cause? solution? example? history?).', '১) আগে সব heading পড়ুন আর দেখুন কোনটা কোথায় আলাদা (কারণ? সমাধান? উদাহরণ? ইতিহাস?)।'),
        l('2) Read the paragraph for its central idea. First and last sentences help, but not always — the main idea can be in the middle.', '২) কেন্দ্রীয় idea-র জন্য paragraph পড়ুন। প্রথম আর শেষ sentence সাহায্য করে, কিন্তু সবসময় না — মূল idea মাঝেও থাকতে পারে।'),
        l('3) Ignore supporting details and examples ("for example", names, single numbers).', '৩) সহায়ক তথ্য আর উদাহরণ বাদ দিন ("for example", নাম, একক সংখ্যা)।'),
        l('4) Match the idea of the whole paragraph, and cross out headings you have used or rejected.', '৪) পুরো paragraph-এর idea মেলান, আর ব্যবহৃত বা বাতিল heading কেটে দিন।'),
        l('Common mix-up: choosing a heading because it repeats a word from the paragraph. Repeated words are a classic distractor.', 'সাধারণ ভুল: paragraph-এর একটা word আছে বলে heading বাছা। পুনরাবৃত্ত word একটা পুরোনো distractor।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Types of headings', 'Heading-এর ধরন'),
      items: [
        { en: '"An unexpected cause" → the paragraph explains why something happened', note: l('cause', 'কারণ') },
        { en: '"A possible solution" → the paragraph proposes an answer', note: l('solution', 'সমাধান') },
        { en: '"Early attempts" → the paragraph describes the history', note: l('history', 'ইতিহাস') },
        { en: '"Doubts about the evidence" → the paragraph questions a claim', note: l('criticism', 'সমালোচনা') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this skill helps', 'এই দক্ষতা কোথায় কাজে লাগে'),
      uses: [
        { skill: 'reading', example: 'Choose the correct heading for paragraphs A–F from the list i–ix.', note: l('More headings than paragraphs.', 'Heading বেশি।') },
        { skill: 'writing', example: 'Task 2: one main idea per paragraph, stated in the topic sentence.', note: l('Write what examiners look for.', 'Examiner যা খোঁজেন তা লিখুন।') },
        { skill: 'listening', example: 'Part 4: each lecture section has a main point and examples.', note: l('Main point vs example.', 'মূল point বনাম উদাহরণ।') },
        { skill: 'speaking', example: 'Part 2: organise your talk around clear main points.', note: l('Structured speaking.', 'গোছানো বলা।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Choosing "A family in Khulna" for paragraph B', right: '"Turning to the sky for water"', why: l('Khulna is an example.', 'Khulna উদাহরণ।') },
        { wrong: 'Reading only the first sentence', right: 'Check the whole paragraph', why: l('The main idea can be later.', 'মূল idea পরেও থাকতে পারে।') },
        { wrong: 'Choosing a heading because it repeats "salt"', right: 'Match the whole idea', why: l('Repeated words are traps.', 'পুনরাবৃত্ত word ফাঁদ।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('rd-4-p1', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('In paragraph B, what is "One family in Khulna"?', 'Paragraph B-তে "One family in Khulna" কী?'), sentence: PARA_B, options: ['An example', 'The main idea', 'A heading'], answer: 'An example', explanation: l('"for example".', '"for example"।'), why: { 'The main idea': l('The main idea is about many villages relying on rainwater.', 'মূল idea অনেক গ্রামের বৃষ্টির পানির ওপর নির্ভরতা।'), 'A heading': l('A heading summarises the whole paragraph.', 'Heading পুরো paragraph সংক্ষেপ করে।') } }),
        choice('rd-4-p2', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Are there more headings than paragraphs?', 'Heading কি paragraph-এর চেয়ে বেশি?'), options: ['Yes — some headings are not used', 'No — one heading per paragraph exactly', 'Only in Listening'], answer: 'Yes — some headings are not used', explanation: l('More headings than paragraphs.', 'Heading বেশি।'), why: { 'No — one heading per paragraph exactly': l('The list is longer than the number of paragraphs.', 'তালিকা paragraph-এর সংখ্যার চেয়ে লম্বা।'), 'Only in Listening': l('Matching Headings is a Reading task.', 'Matching Headings একটা Reading task।') } }),
        choice('rd-4-p3', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Paragraph: "Early bicycles were heavy and dangerous. The first models had no brakes, and riders often fell. Only in the 1880s did safer designs appear." Best heading?', 'Paragraph: "Early bicycles were heavy and dangerous. The first models had no brakes, and riders often fell. Only in the 1880s did safer designs appear।" সবচেয়ে ভালো heading?'), options: ['The problems of the first bicycles', 'Modern cycling safety', 'The year 1880'], answer: 'The problems of the first bicycles', explanation: l('The whole paragraph describes early problems.', 'পুরো paragraph শুরুর সমস্যা বর্ণনা করে।'), why: { 'Modern cycling safety': l('The paragraph is about early bicycles, not modern ones.', 'Paragraph শুরুর bicycle নিয়ে, আধুনিক না।'), 'The year 1880': l('A single date is a detail.', 'একটা তারিখ খুঁটিনাটি।') } }),
        choice('rd-4-p4', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Paragraph: "Some experts claim the method saves water. However, their studies used very small samples, and no independent test has confirmed the results." Best heading?', 'Paragraph: "Some experts claim the method saves water. However, their studies used very small samples, and no independent test has confirmed the results।" সবচেয়ে ভালো heading?'), options: ['Questions about the evidence', 'How the method saves water', 'A list of experts'], answer: 'Questions about the evidence', explanation: l('"However…" introduces the main idea: doubts.', '"However…" মূল idea শুরু করে: সন্দেহ।'), why: { 'How the method saves water': l('The paragraph questions the claim; it does not explain it.', 'Paragraph দাবিটা নিয়ে প্রশ্ন তোলে; ব্যাখ্যা দেয় না।'), 'A list of experts': l('No experts are listed.', 'কোনো expert-এর তালিকা নেই।') } }),
        choice('rd-4-p5', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('A heading repeats the word "salt" from paragraph B. What should you do?', 'একটা heading paragraph B-এর "salt" word হুবহু রাখে। কী করবেন?'), options: ['Check whether it matches the whole paragraph’s idea', 'Choose it — it matches a word', 'Ignore all headings with repeated words'], answer: 'Check whether it matches the whole paragraph’s idea', explanation: l('Word match is not enough.', 'শুধু word মেলা যথেষ্ট না।'), why: { 'Choose it — it matches a word': l('Repeated words are a common distractor.', 'পুনরাবৃত্ত word সাধারণ distractor।'), 'Ignore all headings with repeated words': l('Sometimes the right heading shares a word; check the idea.', 'কখনো ঠিক heading-এও একই word থাকে; idea যাচাই করুন।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('rd-4-r1', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Write the phrase that signals an example (two words).', 'উদাহরণের সংকেত দেয় এমন phrase লিখুন (দুটো word)।'), sentence: 'In paragraph B, the words "for ___" show that Khulna is only an example.', accepted: ['example'], explanation: l('for example.', 'for example।') }),
        gap('rd-4-r2', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'There are always ___ headings than paragraphs.', accepted: ['more'], explanation: l('more.', 'more।') }),
        correct('rd-4-r3', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'A heading should match the best example in the paragraph.', accepted: ['A heading should match the main idea of the paragraph.', 'A heading should match the main idea in the paragraph.', 'A heading should match the idea of the whole paragraph.'], explanation: l('It matches the main idea.', 'এটা মূল idea মেলায়।') }),
        correct('rd-4-r4', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'The main idea is always in the first sentence.', accepted: ['The main idea is often in the first sentence, but not always.', 'The main idea is not always in the first sentence.', 'The main idea is usually in the first sentence, but not always.'], explanation: l('Often, not always.', 'প্রায়ই, সবসময় না।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('rd-4-c1', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('What should you read FIRST in a Matching Headings task?', 'Matching Headings task-এ প্রথমে কী পড়বেন?'), options: ['All the headings', 'The last paragraph', 'The title only'], answer: 'All the headings', explanation: l('Know the options and how they differ.', 'Option আর তাদের পার্থক্য জানুন।') }),
        correct('rd-4-c2', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'Choose the heading that repeats the most words from the paragraph.', accepted: ['Choose the heading that summarises the whole paragraph.', 'Choose the heading that summarizes the whole paragraph.', 'Choose the heading that matches the main idea of the paragraph.'], explanation: l('Summarise the idea; do not match words.', 'Idea সংক্ষেপ করুন; word মেলাবেন না।') }),
        order('rd-4-c3', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Match the idea of the whole paragraph.', explanation: l('The whole paragraph.', 'পুরো paragraph।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: write a heading', 'এবার আপনার পালা: একটা heading লিখুন'),
      exercises: [
        write('rd-4-y1', 'rd-headings', {
          ...P,
          prompt: l('Write a short heading (3–7 words) for paragraph B and one distractor heading. Then explain in one sentence why the distractor is wrong.', 'Paragraph B-এর জন্য একটা ছোট heading (৩–৭ word) আর একটা distractor heading লিখুন। তারপর এক sentence-এ ব্যাখ্যা করুন distractor কেন ভুল।'),
          model: 'Heading: Coastal villages switch to rainwater. Distractor: How one Khulna family stores water. The distractor is wrong because the Khulna family is only an example, not the main idea of the paragraph.',
          checklist: [l('a heading for the whole paragraph', 'পুরো paragraph-এর heading'), l('a distractor based on an example or a repeated word', 'উদাহরণ বা পুনরাবৃত্ত word-ভিত্তিক distractor'), l('a clear reason', 'একটা পরিষ্কার কারণ')],
          explanation: l('Main idea, not details.', 'মূল idea, খুঁটিনাটি না।'),
          task: `The student writes a heading and a distractor heading for this paragraph and explains the distractor: "${PARA_B}". Judge whether the heading captures the whole paragraph’s main idea (coastal villages relying on rainwater because salt has entered wells and ponds), not an example (the Khulna family) or a detail (sea levels, December); and whether the distractor is plausible and the reason correct. Then correct grammar only where it blocks the meaning.`,
          target: l('Main ideas and headings', 'মূল idea আর heading'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Read all headings first; there are more headings than paragraphs.', 'আগে সব heading পড়ুন; heading paragraph-এর চেয়ে বেশি।'),
        l('Match the whole paragraph’s idea; ignore examples and details.', 'পুরো paragraph-এর idea মেলান; উদাহরণ আর খুঁটিনাটি বাদ দিন।'),
        l('A heading that repeats a word is often a distractor.', 'Word হুবহু থাকা heading প্রায়ই distractor।'),
      ],
    },
  ],
};

const STUDY = 'A study in three cities compared students who studied with background music and students who studied in silence. Dr Rahim found no difference in test scores. Dr Lee, however, found that music helped students who were already tired, while Dr Sen reported that it distracted younger pupils.';

// ======================================================================= rd-5
export const rdChoice: Lesson = {
  id: 'rd-5',
  format: 'v2',
  concept: 'rd-choice',
  title: l('Multiple choice and matching', 'Multiple choice আর matching'),
  why: l('In multiple choice, most wrong options are mentioned in the passage — but they are contradicted, irrelevant or only partly true. In matching tasks, find each name first, then read what is said about it.', 'Multiple choice-এ বেশিরভাগ ভুল option passage-এ উল্লেখ থাকে — কিন্তু সেগুলো বিপরীত, অপ্রাসঙ্গিক বা আংশিক সত্য। Matching task-এ আগে প্রতিটা নাম খুঁজুন, তারপর তার সম্পর্কে কী বলা হয়েছে পড়ুন।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('Who found what?', 'কে কী পেয়েছেন?'),
      situation: l(`Passage: "${STUDY}" Question: Which researcher found that music was helpful for tired students?`, `Passage: "${STUDY}" প্রশ্ন: কোন গবেষক পেয়েছেন যে ক্লান্ত শিক্ষার্থীদের জন্য music সহায়ক?`),
      question: l('Which researcher?', 'কোন গবেষক?'),
      options: ['Dr Lee', 'Dr Rahim', 'Dr Sen'],
      answer: 'Dr Lee',
      diagnose: {
        'Dr Lee': l('Right. Scan for each name, then read what follows: "Dr Lee … found that music helped students who were already tired".', 'ঠিক। প্রতিটা নাম scan করুন, তারপর পরের অংশ পড়ুন: "Dr Lee … found that music helped students who were already tired"।'),
        'Dr Rahim': l('Dr Rahim found no difference.', 'Dr Rahim কোনো পার্থক্য পাননি।'),
        'Dr Sen': l('Dr Sen found that music distracted younger pupils.', 'Dr Sen পেয়েছেন music ছোট শিক্ষার্থীদের মনোযোগ নষ্ট করে।'),
      },
    },
    {
      kind: 'discover',
      title: l('Why wrong options are wrong', 'ভুল option কেন ভুল'),
      items: [
        { en: 'Contradicted: "Dr Rahim found better scores with music" — he found no difference', note: l('the passage says the opposite', 'passage উল্টো বলে') },
        { en: 'Not relevant: "Music is popular among students" — true in life, not the question', note: l('does not answer the question', 'প্রশ্নের উত্তর দেয় না') },
        { en: 'Partly true: "Music distracted all students" — only younger pupils (Dr Sen)', note: l('one part is wrong', 'একটা অংশ ভুল') },
        { en: 'Matching Features: find each name (Rahim, Lee, Sen) first — names are easy to scan', note: l('names as locators', 'নাম হিসেবে locator') },
      ],
      question: l('What should you do BEFORE reading the options in multiple choice?', 'Multiple choice-এ option পড়ার আগে কী করবেন?'),
      options: [
        l('Read the question stem and find the part of the passage it refers to', 'প্রশ্নের মূল অংশ পড়ে passage-এর সংশ্লিষ্ট জায়গা খুঁজুন'),
        l('Choose the longest option', 'সবচেয়ে লম্বা option বাছুন'),
        l('Read the whole passage again', 'পুরো passage আবার পড়ুন'),
      ],
      answer: 0,
      pattern: l('Stem first → find the place → then eliminate options that are contradicted, irrelevant or only partly true.', 'আগে মূল প্রশ্ন → জায়গা খুঁজুন → তারপর বিপরীত, অপ্রাসঙ্গিক বা আংশিক সত্য option বাদ দিন।'),
    },
    {
      kind: 'concept',
      title: l('Multiple choice and matching tasks', 'Multiple choice আর matching task'),
      body: l(
        'Multiple choice and the matching tasks all test careful reading of a located section.',
        'Multiple choice আর matching task সবই খুঁজে পাওয়া অংশ মন দিয়ে পড়া যাচাই করে।',
      ),
      points: [
        l('Multiple choice: read the stem, find the section, then test each option. "Choose TWO letters" gives one mark per correct letter, in any order.', 'Multiple choice: মূল প্রশ্ন পড়ুন, অংশটা খুঁজুন, তারপর প্রতিটা option যাচাই করুন। "Choose TWO letters"-এ প্রতি সঠিক অক্ষরে এক নম্বর, যেকোনো ক্রমে।'),
        l('Eliminate: wrong options are often mentioned but contradicted, not relevant to the question, or only partly true.', 'বাদ দিন: ভুল option প্রায়ই উল্লেখ থাকে কিন্তু বিপরীত, প্রশ্নের সাথে অপ্রাসঙ্গিক বা আংশিক সত্য।'),
        l('Matching Information: find the paragraph that contains a specific detail (an example, a reason, a definition); some paragraphs may be used twice or not at all.', 'Matching Information: নির্দিষ্ট তথ্য (উদাহরণ, কারণ, সংজ্ঞা) কোন paragraph-এ আছে খুঁজুন; কিছু paragraph দুবার বা একবারও না ব্যবহার হতে পারে।'),
        l('Matching Features: find each name first, then read what is said about it. Sentence Endings: the ending must fit both the grammar and the meaning.', 'Matching Features: আগে প্রতিটা নাম খুঁজুন, তারপর তার সম্পর্কে কী বলা হয়েছে পড়ুন। Sentence Endings: শেষাংশকে grammar আর অর্থ দুটোতেই মানাতে হবে।'),
        l('Common mix-up: choosing the option that "sounds true" in real life. Only what the passage says counts.', 'সাধারণ ভুল: বাস্তবে "সত্য মনে হয়" এমন option বাছা। শুধু passage যা বলে তাই গোনা হয়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Sentence endings', 'Sentence endings'),
      items: [
        { en: 'Dr Sen reported that background music… → distracted younger pupils. ✓', note: l('grammar and meaning fit', 'grammar আর অর্থ মেলে') },
        { en: 'Dr Sen reported that background music… → younger pupils. ✗', note: l('no verb: grammar does not fit', 'verb নেই: grammar মেলে না') },
        { en: 'Dr Rahim found that the two groups… → scored about the same. ✓', note: l('"no difference" paraphrased', '"no difference"-এর paraphrase') },
        { en: 'Dr Rahim found that the two groups… → enjoyed studying more. ✗', note: l('not mentioned', 'উল্লেখ নেই') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where these skills help', 'এই দক্ষতা কোথায় কাজে লাগে'),
      uses: [
        { skill: 'reading', example: 'Match each finding with the correct researcher, A–C.', note: l('Matching Features.', 'Matching Features।') },
        { skill: 'listening', example: 'Part 3 multiple choice uses the same elimination.', note: l('Contradicted, irrelevant, partly true.', 'বিপরীত, অপ্রাসঙ্গিক, আংশিক সত্য।') },
        { skill: 'writing', example: 'Task 2: report research accurately ("Dr Lee found…")', note: l('Accurate reporting.', 'নির্ভুল উপস্থাপন।') },
        { skill: 'speaking', example: 'Part 3: "Some experts believe…, while others…"', note: l('Comparing views.', 'মত তুলনা।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: '"Music distracted all students"', right: 'Only younger pupils (Dr Sen)', why: l('Partly true = wrong.', 'আংশিক সত্য = ভুল।') },
        { wrong: 'Reading options before finding the section', right: 'Stem → section → options', why: l('Avoid tempting distractors.', 'লোভনীয় distractor এড়ান।') },
        { wrong: 'An ending that fits the meaning but not the grammar', right: 'It must fit both', why: l('Grammar check.', 'Grammar যাচাই।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('rd-5-p1', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('What did Dr Rahim find?', 'Dr Rahim কী পেয়েছেন?'), sentence: STUDY, options: ['Music made no difference to scores', 'Music improved scores', 'Music lowered scores'], answer: 'Music made no difference to scores', explanation: l('"no difference".', '"no difference"।'), why: { 'Music improved scores': l('Contradicted: he found no difference.', 'বিপরীত: তিনি কোনো পার্থক্য পাননি।'), 'Music lowered scores': l('Contradicted: no difference either way.', 'বিপরীত: কোনো দিকেই পার্থক্য নেই।') } }),
        choice('rd-5-p2', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('Why is "Music distracted all students" wrong?', '"Music distracted all students" কেন ভুল?'), sentence: STUDY, options: ['It is only partly true — Dr Sen said younger pupils', 'It is not mentioned at all', 'It is completely true'], answer: 'It is only partly true — Dr Sen said younger pupils', explanation: l('all ≠ younger pupils.', 'all ≠ younger pupils।'), why: { 'It is not mentioned at all': l('Distraction is mentioned, but only for younger pupils.', 'মনোযোগ নষ্টের কথা আছে, কিন্তু শুধু ছোটদের জন্য।'), 'It is completely true': l('"all" is not supported.', '"all" সমর্থিত না।') } }),
        choice('rd-5-p3', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('"Choose TWO letters." You pick B and D; the answers are D and E. How many marks?', '"Choose TWO letters।" আপনি B আর D বাছলেন; উত্তর D আর E। কত নম্বর?'), options: ['1', '0', '2'], answer: '1', explanation: l('One mark per correct letter.', 'প্রতি সঠিক অক্ষরে এক নম্বর।'), why: { '0': l('D is correct and earns a mark.', 'D ঠিক, এক নম্বর পায়।'), '2': l('B is wrong.', 'B ভুল।') } }),
        choice('rd-5-p4', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('Which ending fits "Dr Lee found that background music…"?', '"Dr Lee found that background music…"-এর সাথে কোন শেষাংশ মেলে?'), sentence: STUDY, options: ['helped students who were already tired.', 'students who were tired.', 'distracted younger pupils.'], answer: 'helped students who were already tired.', explanation: l('Grammar and meaning fit.', 'Grammar আর অর্থ মেলে।'), why: { 'students who were tired.': l('No verb — the grammar does not fit.', 'Verb নেই — grammar মেলে না।'), 'distracted younger pupils.': l('That was Dr Sen’s finding.', 'ওটা Dr Sen-এর ফল।') } }),
        choice('rd-5-p5', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('In Matching Information, can one paragraph be the answer twice?', 'Matching Information-এ একটা paragraph কি দুবার উত্তর হতে পারে?'), options: ['Yes — some paragraphs may be used twice or not at all', 'No — each paragraph once only', 'Only paragraph A'], answer: 'Yes — some paragraphs may be used twice or not at all', explanation: l('Read the instructions.', 'নির্দেশ পড়ুন।'), why: { 'No — each paragraph once only': l('In Matching Information, a paragraph can contain more than one answer.', 'Matching Information-এ একটা paragraph-এ একাধিক উত্তর থাকতে পারে।'), 'Only paragraph A': l('Any paragraph may be used more than once.', 'যেকোনো paragraph একাধিকবার ব্যবহার হতে পারে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('rd-5-r1', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('Write the researcher’s surname.', 'গবেষকের নামের শেষাংশ লিখুন।'), sentence: `${STUDY} → Music distracted younger pupils, according to Dr ___.`, accepted: ['Sen'], explanation: l('Dr Sen.', 'Dr Sen।') }),
        gap('rd-5-r2', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('Write the number of cities.', 'শহরের সংখ্যা লিখুন।'), sentence: `${STUDY} → The study took place in ___ cities.`, accepted: ['three', '3'], explanation: l('three cities.', 'three cities।') }),
        correct('rd-5-r3', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('Correct the summary.', 'সারাংশটা ঠিক করুন।'), sentence: 'Dr Rahim found a large difference in test scores.', accepted: ['Dr Rahim found no difference in test scores.'], explanation: l('He found no difference.', 'তিনি কোনো পার্থক্য পাননি।') }),
        correct('rd-5-r4', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('Correct the strategy.', 'কৌশলটা ঠিক করুন।'), sentence: 'Read all the options first, then look for the passage section.', accepted: ['Read the question stem first, then find the passage section, then read the options.', 'Find the passage section first, then read the options.', 'Read the stem and find the section before reading the options.'], explanation: l('Stem → section → options.', 'মূল প্রশ্ন → অংশ → option।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('rd-5-c1', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('Which is NOT a common reason an option is wrong?', 'Option ভুল হওয়ার সাধারণ কারণ কোনটা না?'), options: ['It is too short', 'It is contradicted', 'It is only partly true'], answer: 'It is too short', explanation: l('Length does not decide.', 'দৈর্ঘ্য ঠিক করে না।') }),
        spot('rd-5-c2', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('One word breaks the match. Tap it, then fix it.', 'একটা word মিল ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'According to Dr Lee, music helped energetic students.', wrong: 'energetic', accepted: ['tired', 'exhausted'], fixOptions: ['tired', 'younger', 'older'], explanation: l('Dr Lee: already tired students.', 'Dr Lee: ইতিমধ্যে ক্লান্ত শিক্ষার্থী।') }),
        order('rd-5-c3', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('Build the strategy.', 'কৌশলটা সাজান।'), answer: 'Find each name first, then read what follows.', explanation: l('Matching Features.', 'Matching Features।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: eliminate options', 'এবার আপনার পালা: option বাদ দিন'),
      exercises: [
        write('rd-5-y1', 'rd-choice', {
          ...P,
          prompt: l('Using the music study passage, write one correct option and two wrong options for the question "What did Dr Sen report?". Label why each wrong option is wrong (contradicted / not relevant / partly true).', 'Music study passage ব্যবহার করে "What did Dr Sen report?" প্রশ্নের জন্য একটা সঠিক option আর দুটো ভুল option লিখুন। প্রতিটা ভুল option কেন ভুল লিখুন (বিপরীত / অপ্রাসঙ্গিক / আংশিক সত্য)।'),
          model: 'Correct: Music distracted younger pupils. Wrong 1: Music distracted all students — partly true, it was only younger pupils. Wrong 2: Music helped tired students — this was Dr Lee’s finding, not Dr Sen’s.',
          checklist: [l('one option that matches the passage', 'passage-এর সাথে মেলে এমন একটা option'), l('two plausible wrong options', 'দুটো বিশ্বাসযোগ্য ভুল option'), l('a correct reason for each', 'প্রতিটার সঠিক কারণ')],
          explanation: l('Know why wrong options are wrong.', 'ভুল option কেন ভুল জানুন।'),
          task: `The student writes one correct and two wrong options for "What did Dr Sen report?" about this passage, with reasons: "${STUDY}". Check that the correct option matches Dr Sen’s finding (music distracted younger pupils), that each wrong option is plausible, and that each reason is accurate (contradicted, not relevant, partly true, or another researcher’s finding). Then correct grammar only where it blocks the meaning.`,
          target: l('Eliminating options', 'Option বাদ দেওয়া'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Stem → find the section → eliminate: contradicted, irrelevant, partly true.', 'মূল প্রশ্ন → অংশ খুঁজুন → বাদ দিন: বিপরীত, অপ্রাসঙ্গিক, আংশিক সত্য।'),
        l('Matching Features: scan for names first; Sentence Endings: grammar AND meaning.', 'Matching Features: আগে নাম scan; Sentence Endings: grammar আর অর্থ দুটোই।'),
        l('Choose TWO: one mark per correct letter, any order.', 'Choose TWO: প্রতি সঠিক অক্ষরে এক নম্বর, যেকোনো ক্রম।'),
      ],
    },
  ],
};

const BEES = 'Honeybees communicate the location of food through a movement called the waggle dance. The angle of the dance shows the direction of the flowers, while its length indicates the distance. Scientists first described this behaviour in detail in the 1940s.';

// ======================================================================= rd-6
export const rdCompletion: Lesson = {
  id: 'rd-6',
  format: 'v2',
  concept: 'rd-completion',
  title: l('Completion tasks and time management', 'Completion task আর সময় ব্যবস্থাপনা'),
  why: l('In completion tasks the words come from the passage, so marks are lost on word limits and copying, not on understanding. And good timing decides whether you reach the last passage at all.', 'Completion task-এ word passage থেকেই আসে, তাই নম্বর হারায় word-এর সীমা আর তোলায়, বোঝায় না। আর ভালো সময় ব্যবস্থাপনা ঠিক করে আপনি শেষ passage পর্যন্ত পৌঁছাবেন কি না।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('Right idea, wrong answer', 'ঠিক idea, ভুল উত্তর'),
      situation: l(`Passage: "${BEES}" Summary: "Bees share where food is through a ______." Instruction: ONE WORD ONLY. A student writes "waggle dance".`, `Passage: "${BEES}" Summary: "Bees share where food is through a ______।" নির্দেশ: ONE WORD ONLY। একজন শিক্ষার্থী লিখলেন "waggle dance"।`),
      question: l('Is it correct?', 'এটা কি ঠিক?'),
      options: ['No — two words; the answer is "dance"', 'Yes — it is the full name', 'Yes — "waggle" does not count'],
      answer: 'No — two words; the answer is "dance"',
      diagnose: {
        'No — two words; the answer is "dance"': l('Right. ONE WORD ONLY: "dance" fits "a ______". Extra words make the answer wrong.', 'ঠিক। ONE WORD ONLY: "a ______"-এ "dance" মানায়। বাড়তি word থাকলে উত্তর ভুল।'),
        'Yes — it is the full name': l('The word limit is part of the answer. Two words break "ONE WORD ONLY".', 'Word-এর সীমা উত্তরের অংশ। দুটো word "ONE WORD ONLY" ভাঙে।'),
        'Yes — "waggle" does not count': l('Every word counts.', 'প্রতিটা word গোনা হয়।'),
      },
    },
    {
      kind: 'discover',
      title: l('Completion step by step', 'ধাপে ধাপে completion'),
      items: [
        { en: '1 Read the instruction: ONE WORD ONLY / NO MORE THAN TWO WORDS AND/OR A NUMBER', note: l('the word limit', 'word-এর সীমা') },
        { en: '2 Predict the word type: "a ______" → a singular noun', note: l('grammar around the gap', 'ফাঁকের আশেপাশের grammar') },
        { en: '3 Find the section (summaries paraphrase the passage), then copy the exact word', note: l('spelling from the passage', 'passage থেকে বানান') },
        { en: '4 Read the completed sentence: does it make sense and fit the grammar?', note: l('final check', 'শেষ যাচাই') },
      ],
      question: l('"The ______ of the dance shows the direction." What type of word is missing?', '"The ______ of the dance shows the direction।" কী ধরনের word বাদ?'),
      options: [
        l('A noun (angle)', 'একটা noun (angle)'),
        l('A verb', 'একটা verb'),
        l('An adverb', 'একটা adverb'),
      ],
      answer: 0,
      pattern: l('Instruction → word type → find the section → copy exactly → reread the sentence. The words come from the passage.', 'নির্দেশ → word-এর ধরন → অংশ খুঁজুন → হুবহু তুলুন → sentence আবার পড়ুন। Word passage থেকেই আসে।'),
    },
    {
      kind: 'concept',
      title: l('Completion rules and timing', 'Completion-এর নিয়ম আর সময়'),
      body: l(
        'Sentence, summary, note, table and flow-chart completion all follow the same rules. Timing across the whole test follows one simple plan.',
        'Sentence, summary, note, table আর flow-chart completion একই নিয়ম মানে। পুরো test-এর সময় একটা সহজ plan মানে।',
      ),
      points: [
        l('Obey the word limit exactly ("NO MORE THAN TWO WORDS AND/OR A NUMBER"). Hyphenated words count as one word. Extra words make the answer wrong.', 'Word-এর সীমা হুবহু মানুন ("NO MORE THAN TWO WORDS AND/OR A NUMBER")। Hyphen-যুক্ত word একটা। বাড়তি word থাকলে উত্তর ভুল।'),
        l('In completion tasks the words come from the passage: copy the spelling exactly; do not change the word form unless the grammar needs it.', 'Completion task-এ word passage থেকেই আসে: বানান হুবহু তুলুন; grammar না চাইলে word form বদলাবেন না।'),
        l('Summaries paraphrase the passage: find the section first, then the exact word that fits the gap.', 'Summary passage-এর paraphrase: আগে অংশটা খুঁজুন, তারপর ফাঁকে মানানো হুবহু word।'),
        l('Timing: about 20 minutes per passage; keep time for the last passage. Guess, flag and move on — no negative marking — and write every answer within the 60 minutes.', 'সময়: প্রতি passage-এ প্রায় ২০ মিনিট; শেষ passage-এর জন্য সময় রাখুন। আন্দাজ, চিহ্ন, এগিয়ে যান — ভুলে নম্বর কাটে না — আর ৬০ মিনিটের মধ্যেই সব উত্তর লিখুন।'),
        l('Common mix-up: writing the answer in your own words. In completion tasks, use the passage’s words.', 'সাধারণ ভুল: নিজের word-এ উত্তর লেখা। Completion task-এ passage-এর word ব্যবহার করুন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Checking completion answers', 'Completion উত্তর যাচাই'),
      items: [
        { en: '"The length of the dance indicates the ______." → distance ✓', note: l('one noun from the passage', 'passage থেকে একটা noun') },
        { en: '"first described in the ______" (NUMBER) → 1940s ✓', note: l('a number', 'একটা সংখ্যা') },
        { en: '"The ______ shows direction." → "angle" ✓ · "the angle" ✗ (ONE WORD)', note: l('articles count', 'article গোনা হয়') },
        { en: '"flowers" copied as "flower" in "direction of the ______" → ✗ if the passage has "flowers"', note: l('copy the exact form', 'হুবহু form তুলুন') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where these rules apply', 'এই নিয়ম কোথায় খাটে'),
      uses: [
        { skill: 'reading', example: 'Complete the summary. Choose ONE WORD ONLY from the passage.', note: l('Words from the passage.', 'Passage থেকে word।') },
        { skill: 'listening', example: 'The same word limits in Listening completion.', note: l('Shared rules.', 'একই নিয়ম।') },
        { skill: 'writing', example: 'Plan your 60 minutes as carefully as Reading.', note: l('Time plans.', 'সময়ের plan।') },
        { skill: 'speaking', example: 'Part 2: 1 minute to prepare — use it fully.', note: l('Use every minute.', 'প্রতিটা মিনিট কাজে লাগান।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'ONE WORD ONLY → "waggle dance"', right: '"dance"', why: l('Two words.', 'দুটো word।') },
        { wrong: 'Writing "move" when the passage says "movement"', right: 'Copy the passage word if it fits the grammar', why: l('Words come from the passage.', 'Word passage থেকে আসে।') },
        { wrong: '30 minutes on Passage 1', right: 'About 20 minutes; keep time for Passage 3', why: l('Every passage needs time.', 'প্রতিটা passage-এর সময় লাগে।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('rd-6-p1', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('ONE WORD ONLY: "The ______ of the dance shows direction."', 'ONE WORD ONLY: "The ______ of the dance shows direction।"'), sentence: BEES, options: ['angle', 'the angle', 'dance angle'], answer: 'angle', explanation: l('One word from the passage.', 'Passage থেকে একটা word।'), why: { 'the angle': l('"the" is already in the sentence and makes two words.', '"the" আগেই sentence-এ আছে, আর দুটো word হয়।'), 'dance angle': l('Two words.', 'দুটো word।') } }),
        choice('rd-6-p2', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('What does the length of the dance show?', 'Dance-এর দৈর্ঘ্য কী দেখায়?'), sentence: BEES, options: ['the distance', 'the direction', 'the type of flower'], answer: 'the distance', explanation: l('"its length indicates the distance".', '"its length indicates the distance"।'), why: { 'the direction': l('The angle shows direction.', 'Angle দিক দেখায়।'), 'the type of flower': l('Not mentioned.', 'উল্লেখ নেই।') } }),
        choice('rd-6-p3', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('How many words is "well-known"?', '"well-known" কয়টা word?'), options: ['1', '2', '3'], answer: '1', explanation: l('Hyphenated = one word.', 'Hyphen-যুক্ত = একটা word।'), why: { '2': l('The hyphen joins it into one word.', 'Hyphen এটাকে একটা word করে।'), '3': l('It is one word.', 'এটা একটা word।') } }),
        choice('rd-6-p4', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('Where do completion answers come from?', 'Completion-এর উত্তর কোথা থেকে আসে?'), options: ['From the passage', 'From your own words', 'From the question options'], answer: 'From the passage', explanation: l('Copy the passage words.', 'Passage-এর word তুলুন।'), why: { 'From your own words': l('Use the passage’s words, spelled exactly.', 'Passage-এর word, হুবহু বানানে।'), 'From the question options': l('Completion has no options unless a word box is given.', 'Word box না দিলে completion-এ option নেই।') } }),
        choice('rd-6-p5', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('It is minute 45 and you are still on Passage 2. What should you do?', '৪৫তম মিনিট আর আপনি এখনো Passage 2-এ। কী করবেন?'), options: ['Guess the rest of Passage 2 and move to Passage 3', 'Finish Passage 2 carefully first', 'Stop and check Passage 1'], answer: 'Guess the rest of Passage 2 and move to Passage 3', explanation: l('Keep time for the last passage.', 'শেষ passage-এর জন্য সময় রাখুন।'), why: { 'Finish Passage 2 carefully first': l('Passage 3 would get almost no time.', 'Passage 3 প্রায় কোনো সময় পাবে না।'), 'Stop and check Passage 1': l('Checking can wait; unanswered questions cannot.', 'যাচাই অপেক্ষা করতে পারে; উত্তর-না-দেওয়া প্রশ্ন পারে না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('rd-6-r1', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('Write ONE WORD from the passage.', 'Passage থেকে একটা word লিখুন।'), sentence: `${BEES} → The length of the dance indicates the ___.`, accepted: ['distance'], explanation: l('distance.', 'distance।') }),
        gap('rd-6-r2', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('Write the time period (a number).', 'সময়কাল লিখুন (একটা সংখ্যা)।'), sentence: `${BEES} → The behaviour was first described in the ___.`, accepted: ['1940s'], explanation: l('the 1940s.', 'the 1940s।') }),
        spot('rd-6-r3', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('One answer breaks ONE WORD ONLY. Tap it and fix it.', 'একটা উত্তর ONE WORD ONLY ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Bees share where food is through a waggle-movement.', wrong: 'waggle-movement', accepted: ['dance'], explanation: l('The passage word is "dance" (waggle dance); "waggle-movement" is not in the passage.', 'Passage-এর word "dance" (waggle dance); "waggle-movement" passage-এ নেই।') }),
        correct('rd-6-r4', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('Shorten to fit NO MORE THAN TWO WORDS.', 'NO MORE THAN TWO WORDS-এ মানাতে ছোট করুন।'), sentence: 'the waggle dance', accepted: ['waggle dance'], explanation: l('Drop "the".', '"the" বাদ দিন।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('rd-6-c1', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('What happens to a wrong guess in IELTS Reading?', 'IELTS Reading-এ ভুল আন্দাজে কী হয়?'), options: ['Nothing — there is no negative marking', 'You lose one mark', 'You lose half a mark'], answer: 'Nothing — there is no negative marking', explanation: l('Always answer.', 'সবসময় উত্তর দিন।') }),
        spot('rd-6-c2', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('One word breaks the timing plan. Tap it, then fix it.', 'একটা word সময়ের plan ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Spend about 40 minutes on each passage.', wrong: '40', accepted: ['20', 'twenty'], fixOptions: ['20', '10', '30'], explanation: l('About 20 minutes per passage.', 'প্রতি passage-এ প্রায় ২০ মিনিট।') }),
        order('rd-6-c3', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Copy the exact word from the passage.', explanation: l('Words come from the passage.', 'Word passage থেকে আসে।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your Reading plan', 'এবার আপনার পালা: আপনার Reading plan'),
      exercises: [
        write('rd-6-y1', 'rd-completion', {
          ...P,
          prompt: l('Write 3–4 sentences describing your plan for the 60 minutes of Reading and the checks you will make on completion answers.', 'Reading-এর ৬০ মিনিটের plan আর completion উত্তরে কী যাচাই করবেন — ৩–৪ sentence-এ লিখুন।'),
          model: 'I will spend about 20 minutes on each passage and leave a little more time for Passage 3 if possible. For completion tasks, I will check the word limit first and predict the type of word. I will copy the word exactly from the passage and reread the sentence. If I am stuck, I will guess and move on because there is no negative marking.',
          checklist: [l('about 20 minutes per passage', 'প্রতি passage-এ প্রায় ২০ মিনিট'), l('word limit, word type, exact copying', 'word-এর সীমা, word-এর ধরন, হুবহু তোলা'), l('guess and move on', 'আন্দাজ করে এগিয়ে যাওয়া')],
          explanation: l('Rules + timing.', 'নিয়ম + সময়।'),
          task: 'The student describes their plan for the 60 minutes of IELTS Reading and their completion-answer checks. Judge the facts and strategy first: 3 sections, 40 questions, 60 minutes, no extra transfer time; about 20 minutes per passage, keeping time for the last passage; completion words come from the passage and must be copied exactly; obey the word limit (articles count, hyphenated words count as one); predict the word type from the grammar; no negative marking, so guess and move on. Then correct grammar only where it blocks the meaning.',
          target: l('Completion rules and timing', 'Completion-এর নিয়ম আর সময়'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Instruction → word type → find the section → copy exactly → reread.', 'নির্দেশ → word-এর ধরন → অংশ খোঁজা → হুবহু তোলা → আবার পড়া।'),
        l('Word limits: every word counts; hyphenated = one; extra words = wrong.', 'Word-এর সীমা: প্রতিটা word গোনা হয়; hyphen-যুক্ত = একটা; বাড়তি word = ভুল।'),
        l('About 20 minutes per passage; guess and move on — no negative marking.', 'প্রতি passage-এ প্রায় ২০ মিনিট; আন্দাজ করে এগিয়ে যান — ভুলে নম্বর কাটে না।'),
      ],
    },
  ],
};

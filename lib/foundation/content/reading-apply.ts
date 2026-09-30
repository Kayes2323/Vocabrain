import type { Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Understanding IELTS Reading, application lessons in the v2 format: rd-7
 * Reading traps (word matches, qualifiers, own knowledge, word limits), rd-8 a
 * whole-passage strategy with no hints, and rd-9 the module review test.
 * Short original passages. Original Mino content.
 */
const P = { tag: 'reading' as const };

const CITY = 'Dhaka’s first metro line opened in December 2022. Before it opened, a journey across the city could take more than two hours by road. Early passenger surveys suggest that most users now save at least an hour a day, although fares are higher than bus fares. Planners hope that more lines will reduce traffic, but some experts argue that new roads will simply fill with cars again.';

// ======================================================================= rd-7
export const rdTraps: Lesson = {
  id: 'rd-7',
  format: 'v2',
  title: l('Reading traps and how to avoid them', 'Reading-এর ফাঁদ আর কীভাবে এড়াবেন'),
  why: l('Most Reading marks are lost to a few traps: options that copy passage words, qualifiers like "all" or "only", answers from your own knowledge, and word limits. Learn to check every answer against them.', 'Reading-এর বেশিরভাগ নম্বর হারায় কয়েকটা ফাঁদে: passage-এর word তোলা option, "all" বা "only"-র মতো qualifier, নিজের জ্ঞান থেকে উত্তর, আর word-এর সীমা। প্রতিটা উত্তর এগুলোর সাথে যাচাই করতে শিখুন।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('Three confident mistakes', 'তিনটা আত্মবিশ্বাসী ভুল'),
      situation: l(`Passage: "${CITY}" A student marks: "All users save an hour a day" → TRUE; "The metro is cheaper than buses" → TRUE ("metros are usually cheap"); "Experts agree new lines will reduce traffic" → TRUE.`, `Passage: "${CITY}" একজন শিক্ষার্থী লিখলেন: "All users save an hour a day" → TRUE; "The metro is cheaper than buses" → TRUE ("metro সাধারণত সস্তা"); "Experts agree new lines will reduce traffic" → TRUE।`),
      question: l('How many are correct?', 'কয়টা ঠিক?'),
      options: ['0', '1', '3'],
      answer: '0',
      diagnose: {
        '0': l('Right. "most" ≠ "all"; fares are higher, and own knowledge does not count; some experts disagree.', 'ঠিক। "most" ≠ "all"; ভাড়া বেশি, আর নিজের জ্ঞান গোনা হয় না; কিছু expert দ্বিমত করেন।'),
        '1': l('None: a qualifier trap, an own-knowledge trap and a partly-true trap.', 'একটাও না: qualifier-এর ফাঁদ, নিজের জ্ঞানের ফাঁদ আর আংশিক সত্যের ফাঁদ।'),
        '3': l('All three fall into traps. Check qualifiers, use only the passage, and check every part of a statement.', 'তিনটাই ফাঁদে পড়েছে। Qualifier দেখুন, শুধু passage ব্যবহার করুন, আর বাক্যের প্রতিটা অংশ যাচাই করুন।'),
      },
    },
    {
      kind: 'discover',
      title: l('Five traps', 'পাঁচটা ফাঁদ'),
      items: [
        { en: 'Word match: an option copies passage words but changes the meaning', note: l('match meaning', 'অর্থ মেলান') },
        { en: 'Qualifiers: all / most / some / only / always / never', note: l('one word changes the answer', 'একটা word উত্তর বদলায়') },
        { en: 'Own knowledge: "metros are usually cheap"', note: l('only the passage counts', 'শুধু passage গোনা হয়') },
        { en: 'Partly true: "Planners and experts agree…"', note: l('every part must be supported', 'প্রতিটা অংশ সমর্থিত হতে হবে') },
        { en: 'Word limit: "the first metro line" under TWO WORDS', note: l('articles count', 'article গোনা হয়') },
      ],
      question: l('Which trap is "most users" → "all users"?', '"most users" → "all users" কোন ফাঁদ?'),
      options: [
        l('A qualifier trap', 'Qualifier-এর ফাঁদ'),
        l('A word-limit trap', 'Word-এর সীমার ফাঁদ'),
        l('A spelling trap', 'বানানের ফাঁদ'),
      ],
      answer: 0,
      pattern: l('Check every answer for: meaning (not word match), qualifiers, passage-only evidence, every part supported, and the word limit.', 'প্রতিটা উত্তর যাচাই করুন: অর্থ (word মেলা না), qualifier, শুধু passage-এর প্রমাণ, প্রতিটা অংশ সমর্থিত, আর word-এর সীমা।'),
    },
    {
      kind: 'concept',
      title: l('A five-point answer check', 'পাঁচ-বিন্দুর উত্তর যাচাই'),
      body: l(
        'Use these checks on any answer you are not sure about. Each matches a lesson in this module.',
        'যে উত্তরে নিশ্চিত না, তাতে এই যাচাইগুলো করুন। প্রতিটা এই module-এর একটা lesson-এর সাথে মেলে।',
      ),
      points: [
        l('1. Meaning: does the option say the same thing, or only use the same words? (lesson 2)', '১. অর্থ: option কি একই কথা বলে, নাকি শুধু একই word ব্যবহার করে? (lesson ২)'),
        l('2. Qualifiers and numbers: all / most / some / only / first — and every number and date. (lesson 3)', '২. Qualifier আর সংখ্যা: all / most / some / only / first — আর প্রতিটা সংখ্যা ও তারিখ। (lesson ৩)'),
        l('3. Passage only: never your own knowledge, however sensible it sounds. (lesson 3)', '৩. শুধু passage: নিজের জ্ঞান কখনো না, যত যুক্তিসঙ্গতই মনে হোক। (lesson ৩)'),
        l('4. Whole idea: the whole paragraph for headings; every part of a statement or option. (lessons 4–5)', '৪. পুরো idea: heading-এর জন্য পুরো paragraph; বাক্য বা option-এর প্রতিটা অংশ। (lesson ৪–৫)'),
        l('5. Form: word limit, exact copying and grammar fit for completion. (lesson 6)', '৫. Form: completion-এর জন্য word-এর সীমা, হুবহু তোলা আর grammar-এর মিল। (lesson ৬)'),
      ],
    },
    {
      kind: 'examples',
      title: l('Traps in the metro passage', 'Metro passage-এ ফাঁদ'),
      items: [
        { en: '"Fares are higher than bus fares" → "The metro costs more than the bus." ✓', note: l('paraphrase', 'paraphrase') },
        { en: '"Early passenger surveys suggest" → "Research proves" ✗', note: l('suggest ≠ prove', 'suggest ≠ prove') },
        { en: '"some experts argue" → "experts agree" ✗', note: l('some disagree', 'কিছু দ্বিমত করেন') },
        { en: '"opened in December 2022" → "opened in 2022" ✓ (TRUE)', note: l('less detail, still true', 'কম তথ্য, তবু সত্য') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters', 'কেন এটা গুরুত্বপূর্ণ'),
      uses: [
        { skill: 'reading', example: 'Every task type uses at least one of these traps.', note: l('Five checks.', 'পাঁচটা যাচাই।') },
        { skill: 'listening', example: 'Options in Listening use the same word-match and qualifier traps.', note: l('Shared traps.', 'একই ফাঁদ।') },
        { skill: 'writing', example: 'Task 2: "some people" vs "everyone" — choose qualifiers carefully.', note: l('Accurate claims.', 'নির্ভুল দাবি।') },
        { skill: 'speaking', example: 'Part 3: "most young people" is safer than "all young people".', note: l('Balanced answers.', 'ভারসাম্যপূর্ণ উত্তর।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: '"suggest" treated as "prove"', right: '"suggest" is weaker than "prove"', why: l('Strength of the claim.', 'দাবির জোর।') },
        { wrong: 'Using "metros are usually cheap"', right: 'The passage says fares are higher', why: l('Passage only.', 'শুধু passage।') },
        { wrong: '"experts agree" for "some experts argue…"', right: 'Some experts disagree', why: l('Partly true = wrong.', 'আংশিক সত্য = ভুল।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: spot the trap', 'Practice: ফাঁদ চিনুন'),
      exercises: [
        choice('rd-7-p1', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('"All metro users save an hour a day." TRUE, FALSE or NOT GIVEN?', '"All metro users save an hour a day।" TRUE, FALSE না NOT GIVEN?'), sentence: CITY, options: ['NOT GIVEN', 'TRUE', 'FALSE'], answer: 'NOT GIVEN', explanation: l('The passage says "most users"; it does not say what the other users save.', 'Passage বলে "most users"; বাকিরা কী বাঁচান তা বলে না।'), why: { TRUE: l('"most" does not support "all".', '"most" "all"-কে সমর্থন করে না।'), FALSE: l('The passage does not say that some users save less than an hour.', 'Passage বলে না কিছু user এক ঘণ্টার কম বাঁচান।') } }),
        choice('rd-7-p2', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('"Metro fares are lower than bus fares." TRUE, FALSE or NOT GIVEN?', '"Metro fares are lower than bus fares।" TRUE, FALSE না NOT GIVEN?'), sentence: CITY, options: ['FALSE', 'TRUE', 'NOT GIVEN'], answer: 'FALSE', explanation: l('The passage says fares are higher.', 'Passage বলে ভাড়া বেশি।'), why: { TRUE: l('Your own knowledge does not count; the passage says higher.', 'নিজের জ্ঞান গোনা হয় না; passage বলে বেশি।'), 'NOT GIVEN': l('Fares are compared directly — and the statement is the opposite.', 'ভাড়া সরাসরি তুলনা করা হয়েছে — আর বাক্যটা উল্টো।') } }),
        choice('rd-7-p3', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('Which option matches "Early passenger surveys suggest…"?', '"Early passenger surveys suggest…"-এর সাথে কোন option মেলে?'), sentence: CITY, options: ['Initial surveys indicate that most users save time.', 'Research has proved that all users save time.', 'Passengers were never surveyed.'], answer: 'Initial surveys indicate that most users save time.', explanation: l('early → initial; suggest → indicate; most → most.', 'early → initial; suggest → indicate; most → most।'), why: { 'Research has proved that all users save time.': l('"proved" and "all" are both too strong.', '"proved" আর "all" দুটোই বেশি জোরালো।'), 'Passengers were never surveyed.': l('Contradicted: there were surveys.', 'বিপরীত: survey হয়েছিল।') } }),
        choice('rd-7-p4', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('What do "some experts" think about new roads?', 'নতুন রাস্তা নিয়ে "some experts" কী মনে করেন?'), sentence: CITY, options: ['They will fill with cars again', 'They will reduce traffic', 'They are too expensive'], answer: 'They will fill with cars again', explanation: l('"new roads will simply fill with cars again".', '"new roads will simply fill with cars again"।'), why: { 'They will reduce traffic': l('That is what planners hope, not the experts’ view.', 'ওটা planner-দের আশা, expert-দের মত না।'), 'They are too expensive': l('Cost is not mentioned.', 'খরচের উল্লেখ নেই।') } }),
        choice('rd-7-p5', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('ONE WORD AND/OR A NUMBER: "The metro opened in ______."', 'ONE WORD AND/OR A NUMBER: "The metro opened in ______।"'), sentence: CITY, options: ['December 2022', 'December of 2022', 'the December 2022'], answer: 'December 2022', explanation: l('One word and a number, copied from the passage.', 'Passage থেকে তোলা একটা word আর একটা সংখ্যা।'), why: { 'December of 2022': l('Two words and a number — over the limit.', 'দুটো word আর একটা সংখ্যা — সীমার বেশি।'), 'the December 2022': l('"the" is an extra word — over the limit.', '"the" বাড়তি word — সীমার বেশি।') } }),
        choice('rd-7-p6', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Best heading for the whole metro passage?', 'পুরো metro passage-এর সবচেয়ে ভালো heading?'), sentence: CITY, options: ['A new metro: early results and open questions', 'Why bus fares are low', 'The history of Dhaka'], answer: 'A new metro: early results and open questions', explanation: l('It covers the opening, the time saved, fares and debate.', 'এটা উদ্বোধন, বাঁচানো সময়, ভাড়া আর বিতর্ক — সব ধরে।'), why: { 'Why bus fares are low': l('Bus fares are a small comparison.', 'Bus ভাড়া একটা ছোট তুলনা।'), 'The history of Dhaka': l('Too broad and not the topic.', 'খুব বিস্তৃত আর বিষয় না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('rd-7-r1', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Write TRUE, FALSE or NOT GIVEN.', 'TRUE, FALSE বা NOT GIVEN লিখুন।'), sentence: `${CITY} → "The metro has reduced air pollution." ___`, accepted: ['NOT GIVEN'], explanation: l('Pollution is not mentioned.', 'দূষণের উল্লেখ নেই।') }),
        gap('rd-7-r2', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('Write ONE WORD from the passage.', 'Passage থেকে একটা word লিখুন।'), sentence: `${CITY} → Before the metro, a trip across the city could take over two ___ by road.`, accepted: ['hours'], explanation: l('hours (plural).', 'hours (plural)।') }),
        spot('rd-7-r3', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('One word makes this summary too strong. Tap it and fix it.', 'একটা word এই সারাংশকে বেশি জোরালো করছে। Tap করে ঠিক করুন।'), sentence: 'Surveys prove that most users save time.', wrong: 'prove', accepted: ['suggest', 'indicate', 'show'], explanation: l('The passage says "suggest".', 'Passage বলে "suggest"।') }),
        correct('rd-7-r4', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('Correct the summary.', 'সারাংশটা ঠিক করুন।'), sentence: 'Everyone agrees that more metro lines will reduce traffic.', accepted: ['Planners hope that more metro lines will reduce traffic.', 'Some people hope that more metro lines will reduce traffic.', 'Not everyone agrees that more metro lines will reduce traffic.'], explanation: l('Planners hope; some experts disagree.', 'Planner-রা আশা করেন; কিছু expert দ্বিমত করেন।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('rd-7-c1', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Which word is a QUALIFIER?', 'কোন word একটা qualifier?'), options: ['only', 'metro', 'December'], answer: 'only', explanation: l('only / all / most / some / always / never.', 'only / all / most / some / always / never।') }),
        correct('rd-7-c2', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Correct the rule.', 'নিয়মটা ঠিক করুন।'), sentence: 'If a statement sounds true in real life, mark it TRUE.', accepted: ['If the passage says the same thing, mark it TRUE.', 'If a statement agrees with the passage, mark it TRUE.', 'Mark a statement TRUE only if the passage says it.'], explanation: l('Only the passage counts.', 'শুধু passage গোনা হয়।') }),
        order('rd-7-c3', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Check every qualifier and every number.', explanation: l('One word can change the answer.', 'একটা word উত্তর বদলাতে পারে।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: build a trap', 'এবার আপনার পালা: একটা ফাঁদ বানান'),
      exercises: [
        write('rd-7-y1', 'rd-tfng', {
          ...P,
          prompt: l('Using the metro passage, write two statements that look TRUE but are not (one qualifier trap, one own-knowledge trap). Give the correct answer and reason for each.', 'Metro passage ব্যবহার করে দুটো বাক্য লিখুন যা TRUE মনে হয় কিন্তু না (একটা qualifier-এর ফাঁদ, একটা নিজের জ্ঞানের ফাঁদ)। প্রতিটার সঠিক উত্তর আর কারণ দিন।'),
          model: 'Statement 1: "All passengers save an hour a day." Answer: NOT GIVEN — the passage says most users, not all. Statement 2: "The metro is cheaper than the bus." Answer: FALSE — the passage says fares are higher, even though metros are cheap in some cities.',
          checklist: [l('a qualifier trap', 'একটা qualifier-এর ফাঁদ'), l('an own-knowledge trap', 'একটা নিজের জ্ঞানের ফাঁদ'), l('the correct answer and reason from the passage', 'passage থেকে সঠিক উত্তর আর কারণ')],
          explanation: l('Traps you can build, you can spot.', 'যে ফাঁদ বানাতে পারেন, সেটা চিনতেও পারবেন।'),
          task: `The student writes two trap statements about this passage with the correct TRUE / FALSE / NOT GIVEN answer and a reason: "${CITY}". Check each label against the passage only: FALSE needs a contradiction (e.g. fares are higher), NOT GIVEN when the passage does not say (e.g. "all" users when it says "most", or pollution), TRUE only when every part is supported. Explain any wrong label or reason. Then correct grammar only where it blocks the meaning.`,
          target: l('Qualifier and knowledge traps', 'Qualifier আর নিজের জ্ঞানের ফাঁদ'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Match meaning, not words; watch suggest vs prove, some vs all.', 'Word না, অর্থ মেলান; suggest বনাম prove, some বনাম all খেয়াল করুন।'),
        l('Only the passage counts; every part must be supported.', 'শুধু passage গোনা হয়; প্রতিটা অংশ সমর্থিত হতে হবে।'),
        l('Completion: word limits and exact copying.', 'Completion: word-এর সীমা আর হুবহু তোলা।'),
      ],
    },
  ],
};

// ======================================================================= rd-8
export const rdStrategy: Lesson = {
  id: 'rd-8',
  format: 'v2',
  title: l('A strategy for a whole passage', 'পুরো passage-এর কৌশল'),
  why: l('Put the skills together into one routine for any passage: skim, read the questions, locate, read closely, check, and move on at about 20 minutes.', 'দক্ষতাগুলো যেকোনো passage-এর জন্য একটা নিয়মে জুড়ুন: skim, প্রশ্ন পড়া, জায়গা খোঁজা, মন দিয়ে পড়া, যাচাই, আর প্রায় ২০ মিনিটে এগিয়ে যাওয়া।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('Two ways to read a passage', 'Passage পড়ার দুই উপায়'),
      situation: l('Method A: read the whole passage slowly, then answer questions from memory. Method B: skim, read one question group, locate each answer with key words, read closely, check, move on.', 'পদ্ধতি A: পুরো passage ধীরে পড়ে, তারপর মনে রেখে উত্তর। পদ্ধতি B: skim, একটা প্রশ্ন-দল পড়া, key word দিয়ে প্রতিটা উত্তরের জায়গা খোঁজা, মন দিয়ে পড়া, যাচাই, এগিয়ে যাওয়া।'),
      question: l('Which method fits 60 minutes for 40 questions?', '৬০ মিনিটে ৪০টা প্রশ্নের সাথে কোন পদ্ধতি মানায়?'),
      options: ['Method B', 'Method A', 'Neither — skip the hard passage'],
      answer: 'Method B',
      diagnose: {
        'Method B': l('Right. Each answer is found in the passage, not from memory; the routine keeps you near 20 minutes per passage.', 'ঠিক। প্রতিটা উত্তর passage-এ খোঁজা হয়, মনে রেখে না; নিয়মটা প্রতি passage-এ প্রায় ২০ মিনিট রাখে।'),
        'Method A': l('Reading everything slowly and answering from memory is slow and leads to mistakes.', 'সব ধীরে পড়ে মনে রেখে উত্তর দেওয়া ধীর আর ভুলের দিকে নেয়।'),
        'Neither — skip the hard passage': l('Every passage has marks; guess what you cannot find, but do not skip a whole passage.', 'প্রতিটা passage-এ নম্বর আছে; যা পান না আন্দাজ করুন, কিন্তু পুরো passage বাদ দেবেন না।'),
      },
    },
    {
      kind: 'discover',
      title: l('The routine', 'নিয়মটা'),
      items: [
        { en: '1 Skim (1–2 min): title, first sentences, key nouns', note: l('a mental map', 'মানসিক নকশা') },
        { en: '2 Read one question group and its instruction (word limit, TFNG or YNNG?)', note: l('know the task', 'task জানুন') },
        { en: '3 Locate with key words (names, numbers), then read closely', note: l('answers follow the passage order in most tasks', 'বেশিরভাগ task-এ উত্তর passage-এর ক্রমে') },
        { en: '4 Check the five traps; guess and flag if stuck; move on near 20 minutes', note: l('no negative marking', 'ভুলে নম্বর কাটে না') },
      ],
      question: l('Why read one question group at a time?', 'একবারে একটা প্রশ্ন-দল কেন পড়বেন?'),
      options: [
        l('Each group has its own instruction and usually follows the passage order', 'প্রতিটা দলের নিজের নির্দেশ আছে আর সাধারণত passage-এর ক্রম মানে'),
        l('It is required by the rules', 'নিয়মে বাধ্যতামূলক'),
        l('Groups always have the same answers', 'দলের উত্তর সবসময় একই'),
      ],
      answer: 0,
      pattern: l('Skim → question group → locate → read closely → check → move on. About 20 minutes per passage.', 'Skim → প্রশ্ন-দল → জায়গা খোঁজা → মন দিয়ে পড়া → যাচাই → এগিয়ে যাওয়া। প্রতি passage-এ প্রায় ২০ মিনিট।'),
    },
    {
      kind: 'concept',
      title: l('One routine, every task', 'একটা নিয়ম, প্রতিটা task'),
      body: l(
        'The routine is the same for every task type; what changes is what you check.',
        'প্রতিটা task-এ নিয়ম একই; বদলায় শুধু কী যাচাই করবেন।',
      ),
      points: [
        l('TRUE / FALSE / NOT GIVEN: facts; YES / NO / NOT GIVEN: the writer’s views — answer from the passage only.', 'TRUE / FALSE / NOT GIVEN: তথ্য; YES / NO / NOT GIVEN: লেখকের মত — শুধু passage থেকে উত্তর।'),
        l('Headings: read all headings first; match the whole paragraph.', 'Heading: আগে সব heading পড়ুন; পুরো paragraph মেলান।'),
        l('Multiple choice and matching: stem → section → eliminate; find names first.', 'Multiple choice আর matching: মূল প্রশ্ন → অংশ → বাদ দেওয়া; আগে নাম খুঁজুন।'),
        l('Completion: word limit → word type → exact words from the passage.', 'Completion: word-এর সীমা → word-এর ধরন → passage থেকে হুবহু word।'),
        l('Common mix-up: answering from memory after one reading. Always go back to the passage to find evidence.', 'সাধারণ ভুল: একবার পড়ে মনে রেখে উত্তর। সবসময় প্রমাণ খুঁজতে passage-এ ফিরে যান।'),
      ],
    },
    {
      kind: 'examples',
      title: l('The routine on the metro passage', 'Metro passage-এ নিয়মটা'),
      items: [
        { en: 'Skim: a new metro line — time saved — fares — debate about traffic', note: l('the map', 'নকশা') },
        { en: 'Q: "When did the metro open?" → locate "December 2022"', note: l('a date locator', 'তারিখ locator') },
        { en: 'Q: "What do planners hope?" → locate "Planners hope" → "more lines will reduce traffic"', note: l('a name / group locator', 'দল locator') },
        { en: 'Check: "most", "suggest", "some experts" — qualifiers and claim strength', note: l('trap check', 'ফাঁদ যাচাই') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Test day', 'Test-এর দিন'),
      uses: [
        { skill: 'reading', example: 'Write answers directly on the answer sheet (paper) or screen (computer) — there is no transfer time.', note: l('60 minutes include writing answers.', '৬০ মিনিটের মধ্যেই উত্তর লেখা।') },
        { skill: 'listening', example: 'The same predict-locate-check habit works in Listening.', note: l('One method.', 'একটা পদ্ধতি।') },
        { skill: 'writing', example: 'Reading many passages builds vocabulary and ideas for Task 2.', note: l('Input for output.', 'লেখার জন্য পড়া।') },
        { skill: 'speaking', example: 'Reading helps you explain topics in Part 3.', note: l('More ideas to discuss.', 'আলোচনার বেশি idea।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Answering from memory', right: 'Find the evidence in the passage', why: l('Memory mixes details.', 'স্মৃতি খুঁটিনাটি গুলিয়ে ফেলে।') },
        { wrong: 'Waiting to transfer answers at the end', right: 'Write answers as you go', why: l('No transfer time in Reading.', 'Reading-এ উত্তর তোলার সময় নেই।') },
        { wrong: 'Leaving blanks', right: 'Guess and flag', why: l('No negative marking.', 'ভুলে নম্বর কাটে না।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: no hints', 'Practice: কোনো hint নেই'),
      exercises: [
        choice('rd-8-p1', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('What is the FIRST step with a new passage?', 'নতুন passage-এ প্রথম ধাপ কী?'), options: ['Skim the title, first sentences and key nouns', 'Read every word carefully', 'Answer the last question'], answer: 'Skim the title, first sentences and key nouns', explanation: l('Make a quick map.', 'দ্রুত নকশা।'), why: { 'Read every word carefully': l('Too slow — read closely only where answers are.', 'খুব ধীর — শুধু উত্তরের জায়গায় মন দিয়ে পড়ুন।'), 'Answer the last question': l('Most tasks follow the passage order; start at the first group.', 'বেশিরভাগ task passage-এর ক্রম মানে; প্রথম দল থেকে শুরু করুন।') } }),
        choice('rd-8-p2', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('A question group says YES / NO / NOT GIVEN. What does it check?', 'একটা প্রশ্ন-দলে YES / NO / NOT GIVEN। এটা কী যাচাই করে?'), options: ['The writer’s views or claims', 'Only numbers', 'Your opinion'], answer: 'The writer’s views or claims', explanation: l('Views, not facts.', 'মত, তথ্য না।'), why: { 'Only numbers': l('It checks views and claims of the writer.', 'এটা লেখকের মত আর দাবি যাচাই করে।'), 'Your opinion': l('Your opinion never counts.', 'আপনার মত কখনো গোনা হয় না।') } }),
        choice('rd-8-p3', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('When should you write your Reading answers on the answer sheet (paper test)?', 'Paper test-এ Reading-এর উত্তর answer sheet-এ কখন লিখবেন?'), options: ['During the 60 minutes, as you go', 'In 10 extra minutes at the end', 'After the test'], answer: 'During the 60 minutes, as you go', explanation: l('No transfer time.', 'উত্তর তোলার সময় নেই।'), why: { 'In 10 extra minutes at the end': l('That is Listening (paper); Reading has no transfer time.', 'ওটা Listening (paper); Reading-এ উত্তর তোলার সময় নেই।'), 'After the test': l('Answers must be written within 60 minutes.', 'উত্তর ৬০ মিনিটের মধ্যেই লিখতে হবে।') } }),
        choice('rd-8-p4', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('You have spent 22 minutes on Passage 1 with two questions left. Best choice?', 'Passage 1-এ ২২ মিনিট গেছে, দুটো প্রশ্ন বাকি। সবচেয়ে ভালো সিদ্ধান্ত?'), options: ['Guess the two, flag them, start Passage 2', 'Spend 10 more minutes on them', 'Leave them blank and start Passage 2'], answer: 'Guess the two, flag them, start Passage 2', explanation: l('Keep near 20 minutes; never leave blanks.', 'প্রায় ২০ মিনিটে থাকুন; কখনো ফাঁকা না।'), why: { 'Spend 10 more minutes on them': l('That takes time from later passages.', 'এতে পরের passage-এর সময় কমে।'), 'Leave them blank and start Passage 2': l('A guess may be right; a blank never is.', 'আন্দাজ ঠিক হতে পারে; ফাঁকা কখনো না।') } }),
        choice('rd-8-p5', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('In a headings task, which paragraph part is the LEAST useful for the heading?', 'Heading task-এ paragraph-এর কোন অংশ heading-এর জন্য সবচেয়ে কম কাজের?'), options: ['A single example with a name', 'The first sentence', 'The last sentence'], answer: 'A single example with a name', explanation: l('Examples are details.', 'উদাহরণ খুঁটিনাটি।'), why: { 'The first sentence': l('It often states the main idea.', 'এটা প্রায়ই মূল idea বলে।'), 'The last sentence': l('It often sums up the paragraph.', 'এটা প্রায়ই paragraph সংক্ষেপ করে।') } }),
        choice('rd-8-p6', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('Matching Features: names A–C and ten statements. Where do you start?', 'Matching Features: নাম A–C আর দশটা বাক্য। কোথা থেকে শুরু?'), options: ['Scan for each name, then read what follows', 'Read the statements in random order', 'Guess all ten'], answer: 'Scan for each name, then read what follows', explanation: l('Names are easy to find.', 'নাম খুঁজে পাওয়া সহজ।'), why: { 'Read the statements in random order': l('Start from the names — they are easy locators.', 'নাম থেকে শুরু করুন — এগুলো সহজ locator।'), 'Guess all ten': l('Guess only what you cannot find.', 'শুধু যা খুঁজে পান না তা আন্দাজ করুন।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('rd-8-r1', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Write the number of minutes.', 'মিনিটের সংখ্যা লিখুন।'), sentence: 'Aim for about ___ minutes per Reading passage.', accepted: ['20', 'twenty'], explanation: l('About 20.', 'প্রায় ২০।') }),
        gap('rd-8-r2', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'Answer from the ___ only, never from your own knowledge.', accepted: ['passage', 'text'], explanation: l('passage.', 'passage।') }),
        correct('rd-8-r3', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('Correct the rule.', 'নিয়মটা ঠিক করুন।'), sentence: 'Reading gives ten minutes at the end to transfer answers.', accepted: ['Reading gives no extra time at the end to transfer answers.', 'Reading gives no time at the end to transfer answers.', 'Listening gives ten minutes at the end to transfer answers.'], explanation: l('No transfer time in Reading.', 'Reading-এ উত্তর তোলার সময় নেই।') }),
        correct('rd-8-r4', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Correct the strategy.', 'কৌশলটা ঠিক করুন।'), sentence: 'Read the whole passage slowly, then answer from memory.', accepted: ['Skim the passage, then find each answer in the passage.', 'Skim the passage, then locate each answer and read closely.', 'Skim first, then find the evidence for each answer in the passage.'], explanation: l('Skim → locate → read closely.', 'Skim → জায়গা খোঁজা → মন দিয়ে পড়া।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        correct('rd-8-c1', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('Fix the answer for ONE WORD ONLY.', 'ONE WORD ONLY-র জন্য উত্তরটা ঠিক করুন।'), sentence: 'the fares', accepted: ['fares'], explanation: l('Drop "the".', '"the" বাদ দিন।') }),
        correct('rd-8-c2', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('Correct the routine.', 'নিয়মটা ঠিক করুন।'), sentence: 'Read the options first, then the stem.', accepted: ['Read the stem first, then the options.', 'Read the stem first, find the section, then read the options.'], explanation: l('Stem first, then options.', 'আগে মূল প্রশ্ন, তারপর option।') }),
        order('rd-8-c3', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Build the routine.', 'নিয়মটা সাজান।'), answer: 'Skim, locate, read closely, check and move on.', explanation: l('The Reading routine.', 'Reading-এর নিয়ম।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your passage routine', 'এবার আপনার পালা: passage-এর নিয়ম'),
      exercises: [
        write('rd-8-y1', 'rd-skim', {
          ...P,
          prompt: l('Write 3–4 sentences describing exactly how you will work through one Reading passage, from the first skim to moving on.', 'একটা Reading passage প্রথম skim থেকে এগিয়ে যাওয়া পর্যন্ত কীভাবে করবেন — ৩–৪ sentence-এ লিখুন।'),
          model: 'First, I will skim the title and the first sentence of each paragraph. Then I will read one question group, check the instruction and underline names, numbers and key words. I will locate each answer in the passage and read that part closely, checking for qualifiers. After about 20 minutes, I will guess any answers I have not found and move on.',
          checklist: [l('skim first', 'আগে skim'), l('question group, instruction, key words', 'প্রশ্ন-দল, নির্দেশ, key word'), l('locate, read closely, check traps, move on at ~20 min', 'জায়গা খোঁজা, মন দিয়ে পড়া, ফাঁদ যাচাই, ~২০ মিনিটে এগিয়ে যাওয়া')],
          explanation: l('One routine for every passage.', 'প্রতিটা passage-এর জন্য একটা নিয়ম।'),
          task: 'The student describes their routine for one IELTS Reading passage. Judge the facts and strategy first: skim first (title, first sentences, key nouns); read one question group and its instruction; locate answers with names, numbers and key words (most tasks follow passage order); read the located part closely; check traps (word matches, qualifiers, own knowledge, partial truth, word limits); about 20 minutes per passage; no transfer time in Reading; no negative marking, so guess and move on. Then correct grammar only where it blocks the meaning.',
          target: l('A Reading routine', 'Reading-এর নিয়ম'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Skim → question group → locate → read closely → check → move on.', 'Skim → প্রশ্ন-দল → জায়গা খোঁজা → মন দিয়ে পড়া → যাচাই → এগিয়ে যাওয়া।'),
        l('Evidence from the passage, never from memory or knowledge.', 'প্রমাণ passage থেকে, স্মৃতি বা নিজের জ্ঞান থেকে না।'),
        l('About 20 minutes per passage; write answers as you go; no blanks.', 'প্রতি passage-এ প্রায় ২০ মিনিট; সাথে সাথে উত্তর লিখুন; ফাঁকা না।'),
      ],
    },
  ],
};

// ======================================================================= rd-9
export const rdReview: Lesson = {
  id: 'rd-9',
  kind: 'test',
  title: l('Reading review test', 'Reading review test'),
  why: l('Check what you have learned. Your mistakes here decide what Mino suggests you review.', 'কী শিখলেন যাচাই করুন। এখানের ভুল দেখেই Mino ঠিক করবে কী review করা দরকার।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'reading',
  steps: [
    {
      kind: 'concept',
      title: l('How this test works', 'এই test কীভাবে চলবে'),
      body: l(
        '12 questions from every lesson in this module. Answers and explanations come at the end, not after each question. Score 80% or more to complete the module; if you score less, Mino will suggest short reviews for the marks you missed.',
        'এই module-এর সব lesson থেকে ১২টা প্রশ্ন। Answer আর ব্যাখ্যা প্রতিটা প্রশ্নের পরে না, শেষে দেখবেন। ৮০% বা বেশি পেলে module শেষ; কম পেলে যে নম্বরগুলো কেটেছে সেগুলোর জন্য Mino ছোট review সাজেস্ট করবে।',
      ),
    },
    {
      kind: 'practice',
      title: l('Part 1: choose', 'Part 1: বেছে নিন'),
      exercises: [
        choice('rd-9-e1', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Scanning is reading for…', 'Scanning মানে পড়া…'), options: ['specific details like names and numbers', 'the main idea', 'every word'], answer: 'specific details like names and numbers', explanation: l('Scan = details.', 'Scan = নির্দিষ্ট তথ্য।') }),
        choice('rd-9-e2', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('"costs rose sharply" is best paraphrased as…', '"costs rose sharply"-এর সবচেয়ে ভালো paraphrase…'), options: ['prices increased dramatically', 'costs fell slightly', 'costs rose'], answer: 'prices increased dramatically', explanation: l('rose → increased; sharply → dramatically.', 'rose → increased; sharply → dramatically।') }),
        choice('rd-9-e3', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('The passage does not mention the topic of the statement. Answer?', 'বাক্যের বিষয় passage-এ উল্লেখ নেই। উত্তর?'), options: ['NOT GIVEN', 'FALSE', 'TRUE'], answer: 'NOT GIVEN', explanation: l('Not mentioned → NOT GIVEN.', 'উল্লেখ নেই → NOT GIVEN।') }),
        choice('rd-9-e4', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('A heading should match…', 'Heading মেলাবে…'), options: ['the main idea of the whole paragraph', 'one interesting example', 'the longest sentence'], answer: 'the main idea of the whole paragraph', explanation: l('The whole paragraph.', 'পুরো paragraph।') }),
        choice('rd-9-e5', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('An option is mentioned in the passage but only partly true. Is it correct?', 'একটা option passage-এ আছে কিন্তু আংশিক সত্য। এটা কি ঠিক?'), options: ['No', 'Yes', 'Only in Choose TWO'], answer: 'No', explanation: l('Partly true = wrong.', 'আংশিক সত্য = ভুল।') }),
        choice('rd-9-e6', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('"ONE WORD ONLY." Which answer is allowed?', '"ONE WORD ONLY।" কোন উত্তর চলে?'), options: ['platforms', 'earth platforms', 'the platforms'], answer: 'platforms', explanation: l('One word.', 'একটা word।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Part 2: write and fix', 'Part 2: লিখুন আর ঠিক করুন'),
      exercises: [
        gap('rd-9-e7', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'IELTS Reading lasts ___ minutes.', accepted: ['60', 'sixty'], explanation: l('60.', '৬০।') }),
        gap('rd-9-e8', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('Write a one-word paraphrase of "rise".', '"rise"-এর এক-word paraphrase লিখুন।'), sentence: 'Prices may rise. → Prices may ___.', accepted: ['increase', 'grow', 'climb', 'go'], explanation: l('increase / grow.', 'increase / grow।') }),
        correct('rd-9-e9', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Correct the rule.', 'নিয়মটা ঠিক করুন।'), sentence: 'NOT GIVEN means the passage says the opposite.', accepted: ['FALSE means the passage says the opposite.', 'NOT GIVEN means the passage does not say.', 'NOT GIVEN means the passage does not say it.'], explanation: l('FALSE = the opposite; NOT GIVEN = not stated.', 'FALSE = উল্টো; NOT GIVEN = বলা নেই।') }),
        correct('rd-9-e10', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('Shorten to NO MORE THAN TWO WORDS.', 'NO MORE THAN TWO WORDS-এ ছোট করুন।'), sentence: 'the raised homes', accepted: ['raised homes'], explanation: l('Drop "the".', '"the" বাদ দিন।') }),
        gap('rd-9-e11', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('Write the number of marks.', 'নম্বরের সংখ্যা লিখুন।'), sentence: '"Choose TWO letters": you choose A and C; the answers are C and E. You get ___ mark(s).', accepted: ['1', 'one'], explanation: l('C is correct: 1 mark.', 'C ঠিক: ১ নম্বর।') }),
        correct('rd-9-e12', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'Choose the heading that repeats a word from the paragraph.', accepted: ['Choose the heading that matches the main idea of the paragraph.', 'Choose the heading that summarises the whole paragraph.', 'Choose the heading that summarizes the whole paragraph.'], explanation: l('Main idea, not a repeated word.', 'মূল idea, পুনরাবৃত্ত word না।') }),
      ],
    },
    {
      kind: 'ielts',
      title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
      uses: [
        { skill: 'reading', example: '3 passages · 40 questions · 60 minutes · no transfer time', note: l('The core facts.', 'মূল তথ্য।') },
        { skill: 'listening', example: 'Paraphrase and word limits apply in Listening too.', note: l('Shared skills.', 'একই দক্ষতা।') },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Skim for ideas, scan for details; about 20 minutes per passage.', 'Idea-র জন্য skim, তথ্যের জন্য scan; প্রতি passage-এ প্রায় ২০ মিনিট।'),
        l('Match meaning; TRUE / FALSE / NOT GIVEN from the passage only.', 'অর্থ মেলান; TRUE / FALSE / NOT GIVEN শুধু passage থেকে।'),
        l('Headings: whole paragraph; completion: word limits and exact words.', 'Heading: পুরো paragraph; completion: word-এর সীমা আর হুবহু word।'),
      ],
    },
  ],
};

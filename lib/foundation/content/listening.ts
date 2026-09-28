import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Understanding IELTS Listening (Foundation LEVEL 2, module 2), six lessons in
 * the v2 format. Facts match lib/ai/server/mino/knowledge/ielts.ts (format,
 * the four parts, heard once, answers in order, word limits, spelling). The
 * practice uses short written transcripts ("You hear: …") so every question
 * works without audio; timed audio practice lives in the Listening tests.
 * ls-1 how Listening works · ls-2 Part 1 forms, spelling and numbers ·
 * ls-3 Part 2 monologues, maps and plans · ls-4 Part 3 discussions ·
 * ls-5 Part 4 lectures · ls-6 question types and answer rules.
 * Original Mino content.
 */

export const LISTENING_CONCEPTS: Concept[] = [
  { id: 'ls-format', title: l('How IELTS Listening works', 'IELTS Listening কীভাবে চলে'), lessonId: 'ls-1', tag: 'listening' },
  { id: 'ls-part1', title: l('Part 1: forms, spelling and numbers', 'Part 1: form, বানান আর সংখ্যা'), lessonId: 'ls-2', tag: 'listening' },
  { id: 'ls-part2', title: l('Part 2: monologues, maps and plans', 'Part 2: একক বক্তৃতা, map আর plan'), lessonId: 'ls-3', tag: 'listening' },
  { id: 'ls-part3', title: l('Part 3: academic discussions', 'Part 3: academic আলোচনা'), lessonId: 'ls-4', tag: 'listening' },
  { id: 'ls-part4', title: l('Part 4: lectures and note completion', 'Part 4: lecture আর note completion'), lessonId: 'ls-5', tag: 'listening' },
  { id: 'ls-rules', title: l('Question types and answer rules', 'প্রশ্নের ধরন আর উত্তরের নিয়ম'), lessonId: 'ls-6', tag: 'listening' },
];

const P = { tag: 'listening' as const };

// ======================================================================= ls-1
export const lsFormat: Lesson = {
  id: 'ls-1',
  format: 'v2',
  concept: 'ls-format',
  title: l('How IELTS Listening works', 'IELTS Listening কীভাবে চলে'),
  why: l('Listening is heard once, in order, with 40 questions in about 30 minutes. Knowing this changes how you practise: no pausing, read ahead, and keep moving.', 'Listening একবারই শোনা যায়, ক্রম অনুযায়ী, প্রায় ৩০ মিনিটে ৪০টা প্রশ্ন। এটা জানলে practice বদলে যায়: pause না, আগে পড়ে নেওয়া, আর এগিয়ে চলা।'),
  minutes: 8,
  difficulty: 'easy',
  skill: 'listening',
  steps: [
    {
      kind: 'hook',
      title: l('A missed answer', 'একটা হারানো উত্তর'),
      situation: l('Tania misses question 4. She waits for the speaker to repeat it — and misses questions 5, 6 and 7 as well.', 'Tania প্রশ্ন ৪ মিস করলেন। তিনি speaker-এর আবার বলার অপেক্ষায় থাকলেন — আর প্রশ্ন ৫, ৬, ৭-ও মিস হলো।'),
      question: l('What should she have done?', 'তাঁর কী করা উচিত ছিল?'),
      options: ['Guess or leave 4, and move on to 5 — the recording is heard once', 'Wait — the answer is always repeated', 'Ask the invigilator to replay it'],
      answer: 'Guess or leave 4, and move on to 5 — the recording is heard once',
      diagnose: {
        'Guess or leave 4, and move on to 5 — the recording is heard once': l('Right. Each recording is heard once and answers come in order. Losing one answer is small; losing four is expensive.', 'ঠিক। প্রতিটা recording একবারই শোনা যায় আর উত্তর ক্রম অনুযায়ী আসে। একটা উত্তর হারানো ছোট ক্ষতি; চারটা হারানো বড়।'),
        'Wait — the answer is always repeated': l('Nothing is repeated for you. The recording moves on, and so must you.', 'আপনার জন্য কিছু আবার বলা হয় না। Recording এগিয়ে যায়, আপনাকেও এগোতে হবে।'),
        'Ask the invigilator to replay it': l('The recording cannot be replayed in the test.', 'Test-এ recording আবার বাজানো যায় না।'),
      },
    },
    {
      kind: 'discover',
      title: l('The four parts', 'চারটা part'),
      items: [
        { en: 'Part 1: an everyday conversation (often a form or notes)', note: l('two speakers, e.g. booking a course', 'দুজন speaker, যেমন course book করা') },
        { en: 'Part 2: an everyday monologue (often a map, plan or multiple choice)', note: l('one speaker, e.g. a tour guide', 'একজন speaker, যেমন tour guide') },
        { en: 'Part 3: an academic discussion between 2–4 speakers (multiple choice, matching)', note: l('students and a tutor', 'শিক্ষার্থী আর tutor') },
        { en: 'Part 4: an academic lecture (usually note or summary completion)', note: l('one speaker, no break', 'একজন speaker, বিরতি ছাড়া') },
      ],
      question: l('What changes from Part 1 to Part 4?', 'Part 1 থেকে Part 4-এ কী বদলায়?'),
      options: [
        l('The situations move from everyday to academic', 'পরিস্থিতি দৈনন্দিন থেকে academic-এ যায়'),
        l('Nothing changes', 'কিছুই বদলায় না'),
        l('Parts 3 and 4 are everyday conversations', 'Part 3 আর 4 দৈনন্দিন কথোপকথন'),
      ],
      answer: 0,
      pattern: l('Four parts, 40 questions, about 30 minutes: two everyday parts, then two academic parts. Each recording is heard once and answers follow the order of the recording.', 'চারটা part, ৪০টা প্রশ্ন, প্রায় ৩০ মিনিট: দুটো দৈনন্দিন part, তারপর দুটো academic। প্রতিটা recording একবার শোনা যায়, আর উত্তর recording-এর ক্রমে আসে।'),
    },
    {
      kind: 'concept',
      title: l('The rules of the Listening test', 'Listening test-এর নিয়ম'),
      body: l(
        'Listening rewards preparation before each recording and calm focus during it.',
        'Listening-এ নম্বর আসে প্রতিটা recording-এর আগের প্রস্তুতি আর চলার সময় শান্ত মনোযোগ থেকে।',
      ),
      points: [
        l('4 parts, 40 questions, about 30 minutes. Parts 1–2 are everyday situations; Parts 3–4 are academic.', '৪টা part, ৪০টা প্রশ্ন, প্রায় ৩০ মিনিট। Part 1–2 দৈনন্দিন; Part 3–4 academic।'),
        l('Heard once. Answers follow the order of the recording within a group of questions.', 'একবার শোনা। একটা প্রশ্ন-দলের মধ্যে উত্তর recording-এর ক্রমে আসে।'),
        l('Before each part you get time to read the questions: use it to predict the answer type (a name, a number, a plural noun?).', 'প্রতিটা part-এর আগে প্রশ্ন পড়ার সময় পাবেন: উত্তরের ধরন আন্দাজ করতে ব্যবহার করুন (নাম, সংখ্যা, plural noun?)।'),
        l('Spelling, plurals and word limits count: a correct idea spelled wrong is marked wrong.', 'বানান, plural আর word-এর সীমা গোনা হয়: ঠিক idea ভুল বানানে লিখলে ভুল ধরা হয়।'),
        l('Common mix-up: practising with pauses and replays. The test plays each recording once, so practise the same way.', 'সাধারণ ভুল: pause আর বারবার শুনে practice। Test-এ প্রতিটা recording একবারই বাজে, তাই সেভাবেই practice করুন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('What you might hear', 'কী শুনতে পারেন'),
      items: [
        { en: 'Part 1: "Can I have your surname, please?" "It’s Rahman — R-A-H-M-A-N."', note: l('a form, a spelled name', 'form, বানান করা নাম') },
        { en: 'Part 2: "The café is on your left, just past the main entrance."', note: l('a map', 'map') },
        { en: 'Part 3: "I’m not sure that survey is reliable." "Neither am I."', note: l('two students agreeing', 'দুই শিক্ষার্থীর একমত') },
        { en: 'Part 4: "Let’s now turn to the second cause, which is soil erosion."', note: l('a lecture signpost', 'lecture-এর দিকনির্দেশ') },
      ],
    },
    {
      kind: 'ielts',
      title: l('How this links to the other skills', 'অন্য skill-এর সাথে সম্পর্ক'),
      uses: [
        { skill: 'listening', example: '40 questions · 4 parts · heard once', note: l('The core facts.', 'মূল তথ্য।') },
        { skill: 'reading', example: 'Both Listening and Reading have 40 questions and use similar question types', note: l('Completion and matching skills transfer.', 'Completion আর matching-এর দক্ষতা কাজে লাগে।') },
        { skill: 'speaking', example: 'Part 1 conversations use the same everyday topics as Speaking Part 1', note: l('Everyday vocabulary helps both.', 'দৈনন্দিন vocabulary দুটোতেই কাজে লাগে।') },
        { skill: 'writing', example: 'Part 4 lectures model academic language for Task 2', note: l('Signposting and linking.', 'দিকনির্দেশ আর যোগসূত্র।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Waiting for a missed answer to be repeated', right: 'Move on to the next question', why: l('Heard once.', 'একবার শোনা।') },
        { wrong: 'Reading the questions only when the audio starts', right: 'Read and predict before each part', why: l('Use the preview time.', 'আগে পড়ার সময় কাজে লাগান।') },
        { wrong: '"Spelling doesn’t matter if the idea is right."', right: 'Misspelled answers are wrong', why: l('Spelling counts.', 'বানান গোনা হয়।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ls-1-p1', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('How many parts does IELTS Listening have?', 'IELTS Listening-এ কয়টা part?'), options: ['4', '3', '5'], answer: '4', explanation: l('4 parts, 40 questions.', '৪টা part, ৪০টা প্রশ্ন।'), why: { '3': l('Reading has 3 sections; Listening has 4 parts.', 'Reading-এ ৩টা section; Listening-এ ৪টা part।'), '5': l('There are 4 parts.', 'Part ৪টা।') } }),
        choice('ls-1-p2', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Which part is an academic lecture?', 'কোন part-এ academic lecture?'), options: ['Part 4', 'Part 1', 'Part 2'], answer: 'Part 4', explanation: l('Part 4: one speaker, academic.', 'Part 4: একজন speaker, academic।'), why: { 'Part 1': l('Part 1 is an everyday conversation.', 'Part 1 দৈনন্দিন কথোপকথন।'), 'Part 2': l('Part 2 is an everyday monologue.', 'Part 2 দৈনন্দিন একক বক্তৃতা।') } }),
        choice('ls-1-p3', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('In what order do the answers come?', 'উত্তর কোন ক্রমে আসে?'), options: ['In the order of the recording, within a question group', 'In random order', 'Always the last question first'], answer: 'In the order of the recording, within a question group', explanation: l('Answers follow the recording.', 'উত্তর recording-এর ক্রমে।'), why: { 'In random order': l('Within a group, answers follow the recording order — use this to keep your place.', 'একটা দলের মধ্যে উত্তর recording-এর ক্রমে আসে — জায়গা ধরে রাখতে এটা ব্যবহার করুন।'), 'Always the last question first': l('No: question 1 comes before question 2.', 'না: প্রশ্ন ১ আসে প্রশ্ন ২-এর আগে।') } }),
        choice('ls-1-p4', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('You missed question 12. What now?', 'প্রশ্ন ১২ মিস করেছেন। এখন কী?'), options: ['Move on to question 13 and guess 12 later', 'Wait until 12 is repeated', 'Stop and re-read question 12'], answer: 'Move on to question 13 and guess 12 later', explanation: l('Keep up with the recording.', 'Recording-এর সাথে থাকুন।'), why: { 'Wait until 12 is repeated': l('It will not be repeated.', 'এটা আবার বলা হবে না।'), 'Stop and re-read question 12': l('While you re-read, the answer to 13 passes.', 'আবার পড়ার সময় ১৩-এর উত্তর চলে যায়।') } }),
        choice('ls-1-p5', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('What is the best use of the time before each part?', 'প্রতিটা part-এর আগের সময়ের সবচেয়ে ভালো ব্যবহার কী?'), options: ['Read the questions and predict the answer type', 'Check answers from the previous test', 'Rest your eyes'], answer: 'Read the questions and predict the answer type', explanation: l('Prediction tells you what to listen for.', 'আন্দাজ বলে দেয় কী শুনতে হবে।'), why: { 'Check answers from the previous test': l('Use the time for the part that is coming.', 'যে part আসছে তার জন্য সময় ব্যবহার করুন।'), 'Rest your eyes': l('This time is valuable preparation.', 'এই সময় মূল্যবান প্রস্তুতি।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ls-1-r1', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'IELTS Listening has ___ questions.', accepted: ['40', 'forty'], explanation: l('40.', '৪০।') }),
        gap('ls-1-r2', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'Each Listening recording is heard ___.', accepted: ['once'], explanation: l('once.', 'once।') }),
        spot('ls-1-r3', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('One word makes this false. Tap it and fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Part 3 is an everyday conversation.', wrong: 'everyday', accepted: ['academic'], explanation: l('Part 3 is an academic discussion.', 'Part 3 academic আলোচনা।') }),
        correct('ls-1-r4', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Correct the false statement.', 'ভুল বাক্যটা ঠিক করুন।'), sentence: 'Part 2 has four speakers.', accepted: ['Part 2 has one speaker.', 'Part 3 has four speakers.', 'Part 2 has a single speaker.'], explanation: l('Part 2 is a monologue: one speaker.', 'Part 2 একক বক্তৃতা: একজন speaker।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ls-1-c1', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Which is the best way to practise?', 'Practice-এর সবচেয়ে ভালো উপায় কোনটা?'), options: ['Play each recording once, then check', 'Pause after every sentence', 'Read the transcript first'], answer: 'Play each recording once, then check', explanation: l('Practise like the test.', 'Test-এর মতো practice।') }),
        spot('ls-1-c2', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('One word makes this false. Tap it, then fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'In Listening, spelling mistakes are ignored.', wrong: 'ignored', accepted: ['counted', 'marked wrong', 'penalised', 'penalized'], fixOptions: ['counted', 'ignoring', 'ignore'], explanation: l('Spelling counts.', 'বানান গোনা হয়।') }),
        order('ls-1-c3', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Each recording is heard only once.', explanation: l('Heard once.', 'একবার শোনা।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your Listening routine', 'এবার আপনার পালা: আপনার Listening রুটিন'),
      exercises: [
        write('ls-1-y1', 'ls-format', {
          ...P,
          prompt: l('Write 3 sentences describing how you will practise Listening so that it matches the real test.', 'আসল test-এর সাথে মিলিয়ে কীভাবে Listening practice করবেন — ৩টা sentence-এ লিখুন।'),
          model: 'I will play each recording only once, without pausing. Before each part I will read the questions and predict the type of answer. If I miss an answer, I will move on to the next question.',
          checklist: [l('heard once, no pausing', 'একবার শোনা, pause না'), l('read and predict before each part', 'প্রতিটা part-এর আগে পড়া আর আন্দাজ'), l('move on after a missed answer', 'মিস হলে এগিয়ে যাওয়া')],
          explanation: l('Practise like the test.', 'Test-এর মতো practice।'),
          task: 'The student describes how they will practise IELTS Listening. Judge the IELTS Listening facts and strategy first, then grammar only where it blocks meaning. Facts: 4 parts, 40 questions, about 30 minutes; Parts 1–2 everyday, Parts 3–4 academic; each recording is heard once; answers follow the order of the recording within a question group; spelling, plurals and word limits count. Good strategy: read ahead and predict the answer type, move on after a missed answer, practise without pausing. Correct any wrong fact gently.',
          target: l('Test-like practice', 'Test-এর মতো practice'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('4 parts · 40 questions · about 30 minutes · heard once · answers in order.', '৪ part · ৪০ প্রশ্ন · প্রায় ৩০ মিনিট · একবার শোনা · ক্রম অনুযায়ী উত্তর।'),
        l('Read ahead and predict; move on after a missed answer.', 'আগে পড়ুন আর আন্দাজ করুন; মিস হলে এগিয়ে যান।'),
        l('Spelling, plurals and word limits count.', 'বানান, plural আর word-এর সীমা গোনা হয়।'),
      ],
    },
  ],
};

// ======================================================================= ls-2
export const lsPart1: Lesson = {
  id: 'ls-2',
  format: 'v2',
  concept: 'ls-part1',
  title: l('Part 1: forms, spelling and numbers', 'Part 1: form, বানান আর সংখ্যা'),
  why: l('Part 1 is the easiest place to get marks — if you catch spelled names, numbers and dates exactly, and wait for the speaker’s final answer.', 'Part 1-এ নম্বর পাওয়া সবচেয়ে সহজ — যদি বানান করা নাম, সংখ্যা আর তারিখ হুবহু ধরতে পারেন, আর speaker-এর শেষ উত্তরের অপেক্ষা করেন।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'listening',
  steps: [
    {
      kind: 'hook',
      title: l('Booking a room', 'Room book করা'),
      situation: l('You hear: "I’d like to arrive on the 14th… oh sorry, no — the 16th, because my flight changed." The form says: Arrival date: ______ June.', 'আপনি শুনলেন: "I’d like to arrive on the 14th… oh sorry, no — the 16th, because my flight changed." Form-এ লেখা: Arrival date: ______ June।'),
      question: l('What do you write?', 'কী লিখবেন?'),
      options: ['16', '14', '14 or 16'],
      answer: '16',
      diagnose: {
        '16': l('Right. The speaker corrects herself ("sorry, no — the 16th"). The final answer counts.', 'ঠিক। Speaker নিজেকে শুধরে নেন ("sorry, no — the 16th")। শেষ উত্তরটাই গোনা হয়।'),
        '14': l('14 is a distractor: she changes it to the 16th.', '14 একটা distractor: তিনি এটা বদলে 16th বলেন।'),
        '14 or 16': l('Only one answer is allowed — the corrected one, 16.', 'একটাই উত্তর চলে — শুধরে নেওয়াটা, 16।'),
      },
    },
    {
      kind: 'discover',
      title: l('What Part 1 tests', 'Part 1 কী যাচাই করে'),
      items: [
        { en: '"My surname is Chowdhury — C-H-O-W-D-H-U-R-Y."', note: l('names spelled letter by letter', 'অক্ষর ধরে বানান করা নাম') },
        { en: '"The number is 01712 — double 3 — 480."', note: l('"double 3" = 33', '"double 3" = 33') },
        { en: '"It’s £15 — no, sorry, £50 for the full course."', note: l('a correction: the final number counts', 'শোধরানো: শেষ সংখ্যা গোনা হয়') },
        { en: '"We meet on Thursdays, not Tuesdays."', note: l('a distractor rejected', 'distractor বাতিল') },
      ],
      question: l('What is the main trap in Part 1?', 'Part 1-এর প্রধান ফাঁদ কী?'),
      options: [
        l('The speaker says one answer, then corrects or rejects it', 'Speaker একটা উত্তর বলে, তারপর শুধরে নেয় বা বাতিল করে'),
        l('The speakers talk too fast to follow', 'Speaker-রা খুব দ্রুত বলে'),
        l('There are no numbers', 'কোনো সংখ্যা থাকে না'),
      ],
      answer: 0,
      pattern: l('Part 1: write exactly what you hear (spelling, numbers), and always wait for the final answer — speakers often correct themselves.', 'Part 1: যা শোনেন হুবহু লিখুন (বানান, সংখ্যা), আর সবসময় শেষ উত্তরের অপেক্ষা করুন — speaker-রা প্রায়ই নিজেকে শুধরে নেন।'),
    },
    {
      kind: 'concept',
      title: l('Names, numbers and corrections', 'নাম, সংখ্যা আর শোধরানো'),
      body: l(
        'Part 1 is an everyday conversation, usually with a form or notes to complete. Most answers are short: a name, a number, a date or one or two words.',
        'Part 1 একটা দৈনন্দিন কথোপকথন, সাধারণত একটা form বা note পূরণ করতে হয়। বেশিরভাগ উত্তর ছোট: নাম, সংখ্যা, তারিখ বা এক-দুটো word।',
      ),
      points: [
        l('Letters: know how English letters sound — especially A / E / I, G / J, and V / W; "double" means the letter twice (double L = LL).', 'অক্ষর: English অক্ষর কেমন শোনায় জানুন — বিশেষ করে A / E / I, G / J, আর V / W; "double" মানে অক্ষর দুবার (double L = LL)।'),
        l('Numbers: "oh" can mean 0; "double 3" = 33; listen for -teen vs -ty (fifteen / fifty) by the stress: fifTEEN, FIFty.', 'সংখ্যা: "oh" মানে 0 হতে পারে; "double 3" = 33; -teen আর -ty (fifteen / fifty) জোর দিয়ে চিনুন: fifTEEN, FIFty।'),
        l('Corrections and distractors: "sorry, I mean…", "actually…", "no, that’s wrong…" — the last answer counts.', 'শোধরানো আর distractor: "sorry, I mean…", "actually…", "no, that’s wrong…" — শেষ উত্তরটাই গোনা হয়।'),
        l('Write exactly: capital letters for names, correct spelling, and the word limit.', 'হুবহু লিখুন: নামে capital letter, সঠিক বানান, আর word-এর সীমা।'),
        l('Common mix-up: writing the first number you hear. In Part 1 the first number is often the distractor.', 'সাধারণ ভুল: প্রথম শোনা সংখ্যা লিখে ফেলা। Part 1-এ প্রথম সংখ্যা প্রায়ই distractor।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Form answers', 'Form-এর উত্তর'),
      items: [
        { en: '"It’s Hasan with one S." → Hasan', note: l('spelling note', 'বানানের নোট') },
        { en: '"Flat 4B, 27 Lake Road." → 27 Lake Road', note: l('address', 'ঠিকানা') },
        { en: '"The fee is fifty — five-oh — pounds." → 50', note: l('fifty, not fifteen', 'fifty, fifteen না') },
        { en: '"Monday’s full, so let’s say Wednesday." → Wednesday', note: l('the final choice', 'শেষ সিদ্ধান্ত') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where these skills help', 'এই দক্ষতা কোথায় কাজে লাগে'),
      uses: [
        { skill: 'listening', example: 'Name: ______ · Date: ______ · Phone: ______', note: l('Part 1 form completion.', 'Part 1 form completion।') },
        { skill: 'speaking', example: 'Spell your name clearly when an examiner asks.', note: l('Speaking check-in.', 'Speaking-এর শুরু।') },
        { skill: 'reading', example: 'Numbers and dates in Reading tables', note: l('Accurate copying.', 'নির্ভুলভাবে তোলা।') },
        { skill: 'writing', example: 'Task 1 numbers: fifteen vs fifty', note: l('Accurate figures.', 'নির্ভুল সংখ্যা।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Writing 15 when you hear "fifty"', right: '50 — the stress is on FIF-', why: l('-ty is stressed at the start.', '-ty-তে শুরুতে জোর।') },
        { wrong: 'Writing the first date mentioned', right: 'Write the corrected date', why: l('The final answer counts.', 'শেষ উত্তর গোনা হয়।') },
        { wrong: '"Rahman" written as "rahman"', right: 'Rahman', why: l('Names take capitals.', 'নামে capital।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ls-2-p1', 'ls-part1', { ...P, pattern: 'ls-distractor', prompt: l('You hear: "The class starts at 6 — no, sorry, 7 o’clock." What is the start time?', 'আপনি শুনলেন: "The class starts at 6 — no, sorry, 7 o’clock." শুরুর সময় কত?'), options: ['7 o’clock', '6 o’clock', '6.30'], answer: '7 o’clock', explanation: l('The corrected time.', 'শোধরানো সময়।'), why: { '6 o’clock': l('6 is corrected to 7.', '6 শুধরে 7 হয়।'), '6.30': l('6.30 is never mentioned.', '6.30 কখনো বলা হয়নি।') } }),
        choice('ls-2-p2', 'ls-part1', { ...P, pattern: 'ls-spelling-number', prompt: l('You hear: "My postcode is B-double-T 4." What do you write?', 'আপনি শুনলেন: "My postcode is B-double-T 4." কী লিখবেন?'), options: ['BTT4', 'BT4', 'BDT4'], answer: 'BTT4', explanation: l('double T = TT.', 'double T = TT।'), why: { BT4: l('"double T" means two Ts.', '"double T" মানে দুটো T।'), BDT4: l('"double" is not a letter D.', '"double" অক্ষর D না।') } }),
        choice('ls-2-p3', 'ls-part1', { ...P, pattern: 'ls-spelling-number', prompt: l('You hear "FIF-ty" with the stress at the start. Which number is it?', '"FIF-ty" শুনলেন, শুরুতে জোর। কোন সংখ্যা?'), options: ['50', '15', '55'], answer: '50', explanation: l('-ty: stress at the start.', '-ty: শুরুতে জোর।'), why: { '15': l('fifTEEN has the stress at the end.', 'fifTEEN-এ শেষে জোর।'), '55': l('55 would be fifty-five.', '55 হতো fifty-five।') } }),
        choice('ls-2-p4', 'ls-part1', { ...P, pattern: 'ls-distractor', prompt: l('You hear: "Tuesday is usually our day, but this month it’s moved to Thursday." Meeting day: ______', 'আপনি শুনলেন: "Tuesday is usually our day, but this month it’s moved to Thursday." Meeting day: ______'), options: ['Thursday', 'Tuesday', 'Tuesday and Thursday'], answer: 'Thursday', explanation: l('"but … moved to Thursday".', '"but … moved to Thursday"।'), why: { Tuesday: l('Tuesday is the usual day, but not this month.', 'Tuesday সাধারণ দিন, কিন্তু এই মাসে না।'), 'Tuesday and Thursday': l('Only one day is correct.', 'একটাই দিন ঠিক।') } }),
        choice('ls-2-p5', 'ls-part1', { ...P, pattern: 'ls-spelling-number', prompt: l('You hear: "It’s Mahmud — M-A-H-M-U-D." Which answer is correct?', 'আপনি শুনলেন: "It’s Mahmud — M-A-H-M-U-D." কোন উত্তরটা ঠিক?'), options: ['Mahmud', 'Mahmood', 'mahmud'], answer: 'Mahmud', explanation: l('Exact spelling with a capital.', 'হুবহু বানান, capital-সহ।'), why: { Mahmood: l('Write the spelling you hear, not a familiar one.', 'পরিচিত বানান না, যা শোনেন সেটা লিখুন।'), mahmud: l('Names need a capital letter.', 'নামে capital letter লাগে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ls-2-r1', 'ls-part1', { ...P, pattern: 'ls-distractor', prompt: l('Write the answer (a number).', 'উত্তর লিখুন (একটা সংখ্যা)।'), sentence: 'You hear: "Twelve people signed up — oh, wait, two more just joined, so fourteen." Group size: ___', accepted: ['14', 'fourteen'], explanation: l('The final number: 14.', 'শেষ সংখ্যা: 14।') }),
        gap('ls-2-r2', 'ls-part1', { ...P, pattern: 'ls-spelling-number', prompt: l('Write the name exactly.', 'নামটা হুবহু লিখুন।'), sentence: 'You hear: "The street is Elm — E-L-M." Street: ___ Street', accepted: ['Elm'], explanation: l('Elm.', 'Elm।') }),
        spot('ls-2-r3', 'ls-part1', { ...P, pattern: 'ls-spelling-number', prompt: l('One answer does not match what was spelled. Tap it and fix it.', 'একটা উত্তর বানানের সাথে মেলে না। Tap করে ঠিক করুন।'), sentence: 'You hear "S-A-L-L-Y" and write: Name: Saly', wrong: 'Saly', accepted: ['Sally'], explanation: l('Two Ls: Sally.', 'দুটো L: Sally।') }),
        gap('ls-2-r4', 'ls-part1', { ...P, pattern: 'ls-spelling-number', prompt: l('Write the phone number ending (digits only).', 'ফোন নম্বরের শেষাংশ লিখুন (শুধু অঙ্ক)।'), sentence: 'You hear: "…ending in double 7, 2." Ends in: ___', accepted: ['772'], explanation: l('double 7 = 77, then 2.', 'double 7 = 77, তারপর 2।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ls-2-c1', 'ls-part1', { ...P, pattern: 'ls-distractor', prompt: l('Which phrase warns you that an answer is changing?', 'কোন phrase সংকেত দেয় যে উত্তর বদলাচ্ছে?'), options: ['Actually, …', 'For example, …', 'In addition, …'], answer: 'Actually, …', explanation: l('"Actually" often introduces a correction.', '"Actually" প্রায়ই শোধরানো শুরু করে।') }),
        spot('ls-2-c2', 'ls-part1', { ...P, pattern: 'ls-distractor', prompt: l('The speaker said "thirty pounds — sorry, thirteen". One answer is the distractor. Tap it, then fix it.', 'Speaker বললেন "thirty pounds — sorry, thirteen"। একটা উত্তর distractor। Tap করে ঠিক করুন।'), sentence: 'Course price: £30', wrong: '£30', accepted: ['£13', '13'], fixOptions: ['£13', '£3', '£31'], explanation: l('The corrected price: £13.', 'শোধরানো দাম: £13।') }),
        order('ls-2-c3', 'ls-part1', { ...P, pattern: 'ls-distractor', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Always wait for the final answer.', explanation: l('Speakers correct themselves.', 'Speaker-রা নিজেকে শুধরে নেন।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a booking conversation', 'এবার আপনার পালা: একটা booking কথোপকথন'),
      exercises: [
        write('ls-2-y1', 'ls-part1', {
          ...P,
          prompt: l('Write 3 lines a caller might say when booking a course, including a spelled name, a phone number with "double", and one correction.', 'Course book করার সময় একজন caller যা বলতে পারেন — ৩টা লাইন লিখুন: একটা বানান করা নাম, "double"-সহ একটা ফোন নম্বর, আর একটা শোধরানো।'),
          model: 'My surname is Karim, K-A-R-I-M. My phone number is 01815 double 6 2 409. I’d like the Monday class — sorry, no, the Wednesday class, please.',
          checklist: [l('a name spelled letter by letter', 'অক্ষর ধরে বানান করা নাম'), l('a number with "double"', '"double"-সহ সংখ্যা'), l('a clear correction ("sorry, no…")', 'পরিষ্কার শোধরানো ("sorry, no…")')],
          explanation: l('Write what Part 1 sounds like.', 'Part 1 যেমন শোনায় তেমন লিখুন।'),
          task: 'The student writes 3 lines a caller might say in an IELTS Listening Part 1 booking: a spelled name, a phone number using "double", and a correction. Judge whether the lines model Part 1 features correctly (letters spelled one by one, "double 6" = 66, a clear correction with "sorry", "actually" or "no" where the final answer replaces the first), then grammar only where it blocks meaning. Explain which answer a listener should write for each line.',
          target: l('Part 1 features', 'Part 1-এর বৈশিষ্ট্য'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Write names, numbers and dates exactly; names take capitals.', 'নাম, সংখ্যা আর তারিখ হুবহু লিখুন; নামে capital।'),
        l('"double 3" = 33 · fifTEEN vs FIFty · "oh" can be 0.', '"double 3" = 33 · fifTEEN বনাম FIFty · "oh" মানে 0 হতে পারে।'),
        l('Wait for corrections: "sorry", "actually", "no" — the final answer counts.', 'শোধরানোর অপেক্ষা করুন: "sorry", "actually", "no" — শেষ উত্তর গোনা হয়।'),
      ],
    },
  ],
};

// ======================================================================= ls-3
export const lsPart2: Lesson = {
  id: 'ls-3',
  format: 'v2',
  concept: 'ls-part2',
  title: l('Part 2: monologues, maps and plans', 'Part 2: একক বক্তৃতা, map আর plan'),
  why: l('Part 2 is one speaker — often a guide describing a place. Map and plan questions need exact direction language: opposite, next to, at the end of, on your left.', 'Part 2-এ একজন speaker — প্রায়ই একজন guide কোনো জায়গার বর্ণনা দেন। Map আর plan-এর প্রশ্নে দিকের নির্দিষ্ট ভাষা লাগে: opposite, next to, at the end of, on your left।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'listening',
  steps: [
    {
      kind: 'hook',
      title: l('A museum map', 'একটা museum-এর map'),
      situation: l('You hear: "As you come in through the main entrance, the gift shop is immediately on your right, and the café is opposite it."', 'আপনি শুনলেন: "As you come in through the main entrance, the gift shop is immediately on your right, and the café is opposite it."'),
      question: l('Where is the café?', 'Café কোথায়?'),
      options: ['On your left as you enter', 'On your right as you enter', 'At the back of the building'],
      answer: 'On your left as you enter',
      diagnose: {
        'On your left as you enter': l('Right. The gift shop is on the right; "opposite it" puts the café on the left.', 'ঠিক। Gift shop ডানে; "opposite it" মানে café বাঁয়ে।'),
        'On your right as you enter': l('That is the gift shop. The café is opposite it — on the left.', 'ওটা gift shop। Café তার উল্টো দিকে — বাঁয়ে।'),
        'At the back of the building': l('Nothing is said about the back. "Opposite" means facing it across the space.', 'পেছনের কথা বলা হয়নি। "Opposite" মানে সামনাসামনি।'),
      },
    },
    {
      kind: 'discover',
      title: l('Direction language', 'দিকের ভাষা'),
      items: [
        { en: 'opposite · next to · beside · between X and Y · behind · in front of', note: l('position', 'অবস্থান') },
        { en: 'on your left / right · straight ahead · at the end of the corridor', note: l('from the speaker’s starting point', 'speaker-এর শুরুর জায়গা থেকে') },
        { en: 'go past · turn left at · take the second right · go through', note: l('movement', 'চলাচল') },
        { en: 'in the north-west corner · at the top of the map', note: l('compass and map position', 'দিক আর map-এর অবস্থান') },
      ],
      question: l('Why does the starting point matter?', 'শুরুর জায়গা কেন গুরুত্বপূর্ণ?'),
      options: [
        l('"Left" and "right" depend on where the speaker imagines you are standing', '"Left" আর "right" নির্ভর করে speaker আপনাকে কোথায় দাঁড়ানো ধরছেন তার ওপর'),
        l('It does not matter', 'এতে কিছু যায় আসে না'),
        l('Maps always face north', 'Map সবসময় উত্তরমুখী'),
      ],
      answer: 0,
      pattern: l('Find the starting point on the map first ("You are here", the entrance), then follow the speaker step by step. Answers come in order along the route.', 'প্রথমে map-এ শুরুর জায়গা খুঁজুন ("You are here", প্রবেশপথ), তারপর speaker-কে ধাপে ধাপে অনুসরণ করুন। উত্তর পথের ক্রমে আসে।'),
    },
    {
      kind: 'concept',
      title: l('Following a route', 'একটা পথ অনুসরণ'),
      body: l(
        'Part 2 is an everyday monologue: one speaker gives information about a place, event or service. Common tasks are map / plan labelling and multiple choice.',
        'Part 2 একটা দৈনন্দিন একক বক্তৃতা: একজন speaker কোনো জায়গা, অনুষ্ঠান বা সেবা নিয়ে তথ্য দেন। সাধারণ task: map / plan labelling আর multiple choice।',
      ),
      points: [
        l('Before the audio: find the starting point, notice the compass or the entrance, and read the labels already on the map.', 'Audio-র আগে: শুরুর জায়গা খুঁজুন, দিক-নির্দেশক বা প্রবেশপথ দেখুন, আর map-এ আগে থেকে থাকা নামগুলো পড়ুন।'),
        l('During the audio: move your finger along the route. Answers follow the order of the recording.', 'Audio চলার সময়: পথ ধরে আঙুল চালান। উত্তর recording-এর ক্রমে আসে।'),
        l('Key words: opposite, next to, between, behind, in front of, at the end of, on the corner of, go past, turn left / right.', 'মূল word: opposite, next to, between, behind, in front of, at the end of, on the corner of, go past, turn left / right।'),
        l('Multiple choice in Part 2: all options may be mentioned; choose the one the speaker actually confirms.', 'Part 2-এর multiple choice: সব option-ই উল্লেখ হতে পারে; speaker যেটা আসলে নিশ্চিত করেন সেটা বাছুন।'),
        l('Common mix-up: confusing "opposite" with "next to", or mixing up your left with the speaker’s left on the map.', 'সাধারণ ভুল: "opposite" আর "next to" গুলিয়ে ফেলা, বা map-এ নিজের বাঁ আর speaker-এর বাঁ গুলিয়ে ফেলা।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Route language in use', 'ব্যবহারে পথের ভাষা'),
      items: [
        { en: '"Go past the library and the toilets are on your left."', note: l('go past + on your left', 'go past + on your left') },
        { en: '"The office is between the lift and the stairs."', note: l('between X and Y', 'between X and Y') },
        { en: '"At the end of the corridor, turn right."', note: l('at the end of', 'at the end of') },
        { en: '"The car park is behind the main building."', note: l('behind', 'behind') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this language appears', 'এই ভাষা কোথায় আসে'),
      uses: [
        { skill: 'listening', example: 'Label the plan: A–H', note: l('Part 2 map tasks.', 'Part 2 map task।') },
        { skill: 'writing', example: 'Academic Task 1 maps: "A car park was built behind the school."', note: l('The same position language.', 'অবস্থানের একই ভাষা।') },
        { skill: 'speaking', example: 'Part 2: "My favourite café is opposite the park."', note: l('Describing places.', 'জায়গার বর্ণনা।') },
        { skill: 'reading', example: 'GT Reading: directions in notices and guides', note: l('Everyday texts.', 'দৈনন্দিন text।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Starting to listen before finding "You are here"', right: 'Find the starting point first', why: l('Directions depend on it.', 'দিক এর ওপর নির্ভর করে।') },
        { wrong: 'opposite = next to', right: 'opposite = facing across; next to = beside', why: l('Different positions.', 'আলাদা অবস্থান।') },
        { wrong: 'Choosing the first option mentioned', right: 'Choose the one the speaker confirms', why: l('Distractors are mentioned too.', 'Distractor-ও উল্লেখ হয়।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ls-3-p1', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('What does "opposite" mean?', '"opposite" মানে কী?'), options: ['Facing it, on the other side', 'Right beside it', 'Behind it'], answer: 'Facing it, on the other side', explanation: l('Across from it.', 'সামনাসামনি।'), why: { 'Right beside it': l('That is "next to" or "beside".', 'ওটা "next to" বা "beside"।'), 'Behind it': l('That is "behind".', 'ওটা "behind"।') } }),
        choice('ls-3-p2', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('You hear: "The office is between the lift and the stairs." Where is it?', 'আপনি শুনলেন: "The office is between the lift and the stairs." কোথায়?'), options: ['With the lift on one side and the stairs on the other', 'Behind the stairs', 'Above the lift'], answer: 'With the lift on one side and the stairs on the other', explanation: l('between X and Y.', 'between X and Y।'), why: { 'Behind the stairs': l('"Between" puts it in the middle of the two.', '"Between" মানে দুটোর মাঝখানে।'), 'Above the lift': l('Nothing is said about floors.', 'তলার কথা বলা হয়নি।') } }),
        choice('ls-3-p3', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('What should you find on the map before the audio starts?', 'Audio শুরুর আগে map-এ কী খুঁজবেন?'), options: ['The starting point (entrance or "You are here")', 'The largest building', 'The answer to the last question'], answer: 'The starting point (entrance or "You are here")', explanation: l('Directions start there.', 'দিক সেখান থেকে শুরু।'), why: { 'The largest building': l('Size does not matter; the route does.', 'আকার না, পথ গুরুত্বপূর্ণ।'), 'The answer to the last question': l('Answers come in order; start from the beginning.', 'উত্তর ক্রমে আসে; শুরু থেকে শুরু করুন।') } }),
        choice('ls-3-p4', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('You hear: "Go past the reception, and the lecture hall is at the end of the corridor." Where is the lecture hall?', 'আপনি শুনলেন: "Go past the reception, and the lecture hall is at the end of the corridor." Lecture hall কোথায়?'), options: ['Further on, at the far end of the corridor', 'Next to reception', 'Before reception'], answer: 'Further on, at the far end of the corridor', explanation: l('go past + at the end of.', 'go past + at the end of।'), why: { 'Next to reception': l('You go past reception — the hall is further on.', 'Reception পার হয়ে যান — hall আরও সামনে।'), 'Before reception': l('"Go past" means after it.', '"Go past" মানে এর পরে।') } }),
        choice('ls-3-p5', 'ls-part2', { ...P, pattern: 'ls-distractor', prompt: l('You hear: "Many people think the tour starts at the gate, but in fact we meet by the fountain." Where does the tour start?', 'আপনি শুনলেন: "Many people think the tour starts at the gate, but in fact we meet by the fountain." Tour কোথা থেকে শুরু?'), options: ['By the fountain', 'At the gate', 'At the café'], answer: 'By the fountain', explanation: l('"but in fact" gives the real answer.', '"but in fact" আসল উত্তর দেয়।'), why: { 'At the gate': l('The gate is what people wrongly think.', 'Gate হলো মানুষের ভুল ধারণা।'), 'At the café': l('The café is not mentioned.', 'Café-র উল্লেখ নেই।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ls-3-r1', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'The bank is ___ the post office — you just cross the road to it.', accepted: ['opposite'], explanation: l('Across the road = opposite.', 'রাস্তার ওপারে = opposite।') }),
        gap('ls-3-r2', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'The garden is ___ the house, so you cannot see it from the street.', accepted: ['behind'], explanation: l('Not visible from the front → behind.', 'সামনে থেকে দেখা যায় না → behind।') }),
        gap('ls-3-r3', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('Which place do you reach first? Write one word.', 'কোন জায়গায় আগে পৌঁছাবেন? একটা word লিখুন।'), sentence: 'You hear: "Go past the library, and the café is on your right." You reach the ___ first.', accepted: ['library'], explanation: l('go past the library → the library comes first.', 'go past the library → library আগে আসে।') }),
        correct('ls-3-r4', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('Correct the direction.', 'দিকটা ঠিক করুন।'), sentence: 'The toilets are opposite the stairs, right beside them.', accepted: ['The toilets are next to the stairs, right beside them.', 'The toilets are beside the stairs, right next to them.'], explanation: l('"right beside" = next to.', '"right beside" = next to।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ls-3-c1', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('Which phrase describes movement, not position?', 'কোন phrase অবস্থান না, চলাচল বোঝায়?'), options: ['go past', 'next to', 'opposite'], answer: 'go past', explanation: l('go past = move beyond.', 'go past = পার হয়ে যাওয়া।') }),
        spot('ls-3-c2', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('One word is wrong for the meaning. Tap it, then fix it.', 'অর্থের জন্য একটা word ভুল। Tap করে ঠিক করুন।'), sentence: 'The shop is in the between of the bank and the school.', wrong: 'between', accepted: ['middle'], fixOptions: ['middle', 'next', 'opposite'], explanation: l('in the middle of / between.', 'in the middle of / between।') }),
        order('ls-3-c3', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('Build the direction.', 'দিকটা সাজান।'), answer: 'The café is opposite the main entrance.', explanation: l('opposite = facing.', 'opposite = সামনাসামনি।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: guide a visitor', 'এবার আপনার পালা: একজন অতিথিকে পথ দেখান'),
      exercises: [
        write('ls-3-y1', 'ls-part2', {
          ...P,
          prompt: l('Write 3 sentences guiding a visitor from the entrance of your school, college or office to one room, using at least three direction phrases.', 'আপনার স্কুল, কলেজ বা অফিসের প্রবেশপথ থেকে একটা ঘরে একজন অতিথিকে পথ দেখিয়ে ৩টা sentence লিখুন — অন্তত তিনটা দিকের phrase ব্যবহার করে।'),
          model: 'As you come in through the main gate, the office is on your left. Go past the office and take the stairs at the end of the corridor. The library is on the first floor, opposite the computer room.',
          checklist: [l('a clear starting point', 'পরিষ্কার শুরুর জায়গা'), l('three direction phrases', 'তিনটা দিকের phrase'), l('the steps in order', 'ধাপগুলো ক্রমে')],
          explanation: l('Start → route → destination.', 'শুরু → পথ → গন্তব্য।'),
          task: 'The student guides a visitor from an entrance to a room in 3 sentences, like an IELTS Listening Part 2 speaker. Judge the direction language first: a clear starting point; accurate position and movement phrases (opposite, next to, between X and Y, behind, in front of, at the end of, on your left/right, go past, turn left/right, take the stairs); steps in a logical order. Then correct grammar only where it blocks the meaning. Point out any phrase whose meaning does not match the route.',
          target: l('Direction language', 'দিকের ভাষা'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Find the starting point first; follow the route with your finger.', 'আগে শুরুর জায়গা খুঁজুন; আঙুল দিয়ে পথ ধরুন।'),
        l('opposite (facing) · next to (beside) · between X and Y · behind · at the end of · go past.', 'opposite (সামনাসামনি) · next to (পাশে) · between X and Y · behind · at the end of · go past।'),
        l('"but in fact", "actually": the real answer comes after.', '"but in fact", "actually": আসল উত্তর পরে আসে।'),
      ],
    },
  ],
};

// ======================================================================= ls-4
export const lsPart3: Lesson = {
  id: 'ls-4',
  format: 'v2',
  concept: 'ls-part3',
  title: l('Part 3: academic discussions', 'Part 3: academic আলোচনা'),
  why: l('Part 3 is often the hardest part: two to four speakers discuss a study task, agree, disagree and change their minds. The options are paraphrased, so you must follow opinions, not matching words.', 'Part 3 প্রায়ই সবচেয়ে কঠিন: দুই থেকে চারজন speaker একটা পড়াশোনার কাজ নিয়ে আলোচনা করেন, একমত হন, দ্বিমত করেন, মত বদলান। Option-গুলো paraphrase করা, তাই মিল-word না, মতামত অনুসরণ করতে হয়।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'listening',
  steps: [
    {
      kind: 'hook',
      title: l('Two students plan a project', 'দুই শিক্ষার্থী একটা project plan করছেন'),
      situation: l('Sara: "Should we use a questionnaire?" Ben: "It’s quick, but people rarely answer honestly." Sara: "True. Interviews, then — even if they take longer." Question: What do they decide to use?', 'Sara: "Should we use a questionnaire?" Ben: "It’s quick, but people rarely answer honestly." Sara: "True. Interviews, then — even if they take longer." প্রশ্ন: তাঁরা কী ব্যবহার করার সিদ্ধান্ত নেন?'),
      question: l('What is the answer?', 'উত্তর কী?'),
      options: ['Interviews', 'A questionnaire', 'Both'],
      answer: 'Interviews',
      diagnose: {
        Interviews: l('Right. The questionnaire is mentioned first but rejected ("rarely answer honestly"); they agree on interviews.', 'ঠিক। Questionnaire প্রথমে উল্লেখ হয় কিন্তু বাতিল হয় ("rarely answer honestly"); তাঁরা interview-তে একমত হন।'),
        'A questionnaire': l('It is mentioned first, but Ben rejects it and Sara agrees: "True. Interviews, then."', 'এটা প্রথমে উল্লেখ হয়, কিন্তু Ben বাতিল করেন আর Sara একমত হন: "True. Interviews, then."'),
        Both: l('They choose one method: interviews.', 'তাঁরা একটা পদ্ধতি বাছেন: interview।'),
      },
    },
    {
      kind: 'discover',
      title: l('Signals of agreement and disagreement', 'একমত আর দ্বিমতের সংকেত'),
      items: [
        { en: 'Agreeing: "True." · "Exactly." · "That’s a good point." · "Neither am I."', note: l('the idea stays', 'idea থাকে') },
        { en: 'Disagreeing: "I’m not so sure." · "Maybe, but…" · "I don’t think that works."', note: l('the idea is rejected', 'idea বাতিল') },
        { en: 'Changing their mind: "Actually, on second thoughts…" · "You’ve convinced me."', note: l('the final view counts', 'শেষ মত গোনা হয়') },
        { en: 'Tutor’s advice: "I’d suggest you…" · "You might want to…"', note: l('often the answer', 'প্রায়ই উত্তর') },
      ],
      question: l('In Part 3, what decides the answer?', 'Part 3-এ উত্তর কী ঠিক করে?'),
      options: [
        l('What the speakers finally agree on or decide', 'Speaker-রা শেষে কীসে একমত হন বা কী সিদ্ধান্ত নেন'),
        l('The first idea mentioned', 'প্রথম উল্লেখ করা idea'),
        l('The idea mentioned most often', 'সবচেয়ে বেশি উল্লেখ করা idea'),
      ],
      answer: 0,
      pattern: l('Follow the conversation: who suggests, who agrees, who rejects, and what is finally decided. The options use different words from the speakers.', 'কথোপকথন অনুসরণ করুন: কে প্রস্তাব দেন, কে একমত, কে বাতিল করেন, আর শেষে কী ঠিক হয়। Option-এ speaker-দের থেকে আলাদা word থাকে।'),
    },
    {
      kind: 'concept',
      title: l('Following opinions', 'মতামত অনুসরণ'),
      body: l(
        'Part 3 is an academic discussion between two to four speakers, often students and a tutor. Tasks are usually multiple choice and matching.',
        'Part 3 দুই থেকে চারজন speaker-এর academic আলোচনা, প্রায়ই শিক্ষার্থী আর tutor। Task সাধারণত multiple choice আর matching।',
      ),
      points: [
        l('Before the audio: read the question stems and underline who and what is asked (e.g. "What does the tutor think about…").', 'Audio-র আগে: প্রশ্নের মূল অংশ পড়ুন আর কে ও কী জিজ্ঞেস করা হয়েছে দাগ দিন (যেমন "What does the tutor think about…")।'),
        l('Options are paraphrased: "rarely answer honestly" may appear as "unreliable responses". Listen for meaning, not matching words.', 'Option paraphrase করা: "rarely answer honestly" হতে পারে "unreliable responses"। মিল-word না, অর্থ শুনুন।'),
        l('Most options are mentioned: wrong ones are rejected, only partly true, or not about the question.', 'বেশিরভাগ option উল্লেখ হয়: ভুলগুলো বাতিল, আংশিক সত্য, বা প্রশ্নের বিষয় না।'),
        l('"Choose TWO letters": one mark per correct letter, in any order.', '"Choose TWO letters": প্রতি সঠিক অক্ষরে এক নম্বর, যেকোনো ক্রমে।'),
        l('Common mix-up: ticking an option as soon as its words are heard. Wait to hear whether the other speaker agrees.', 'সাধারণ ভুল: option-এর word শোনামাত্র টিক দেওয়া। অন্য speaker একমত কি না শোনার অপেক্ষা করুন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Paraphrased options', 'Paraphrase করা option'),
      items: [
        { en: 'Heard: "It took ages to collect the data." → Option: "The research was time-consuming."', note: l('took ages = time-consuming', 'took ages = time-consuming') },
        { en: 'Heard: "Nobody had heard of it." → Option: "It was unfamiliar to participants."', note: l('paraphrase', 'paraphrase') },
        { en: 'Heard: "I’m not convinced the sample was big enough." → Option: "The sample size was a concern."', note: l('doubt = concern', 'doubt = concern') },
        { en: 'Heard: "You’ve convinced me — let’s drop the survey." → Decision: no survey', note: l('changed mind', 'মত বদল') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where these skills help', 'এই দক্ষতা কোথায় কাজে লাগে'),
      uses: [
        { skill: 'listening', example: 'Which TWO problems do the students mention?', note: l('Part 3 multiple choice.', 'Part 3 multiple choice।') },
        { skill: 'reading', example: 'Paraphrased options in Reading multiple choice', note: l('The same meaning-matching skill.', 'অর্থ মেলানোর একই দক্ষতা।') },
        { skill: 'speaking', example: 'Part 3: "That’s a good point, but…"', note: l('Agreeing and disagreeing politely.', 'ভদ্রভাবে একমত আর দ্বিমত।') },
        { skill: 'writing', example: 'Task 2: "Some argue…, but others believe…"', note: l('Presenting two views.', 'দুটো মত উপস্থাপন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Choosing an option because you heard its exact words', right: 'Check whether it was accepted or rejected', why: l('Distractors use the same words.', 'Distractor-এ একই word থাকে।') },
        { wrong: 'Following only the first speaker', right: 'Listen for the reply and the final decision', why: l('The decision may change.', 'সিদ্ধান্ত বদলাতে পারে।') },
        { wrong: 'Choosing TWO in a fixed order', right: 'Any order is fine for TWO letters', why: l('One mark per letter.', 'প্রতি অক্ষরে এক নম্বর।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ls-4-p1', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Which phrase shows AGREEMENT?', 'কোন phrase একমত বোঝায়?'), options: ['Exactly.', 'I’m not so sure.', 'Maybe, but…'], answer: 'Exactly.', explanation: l('Exactly = I agree.', 'Exactly = আমি একমত।'), why: { 'I’m not so sure.': l('This shows doubt.', 'এটা সন্দেহ বোঝায়।'), 'Maybe, but…': l('This introduces disagreement.', 'এটা দ্বিমত শুরু করে।') } }),
        choice('ls-4-p2', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Heard: "The survey took ages." Which option matches?', 'শোনা: "The survey took ages." কোন option মেলে?'), options: ['The survey was time-consuming.', 'The survey was expensive.', 'The survey was too short.'], answer: 'The survey was time-consuming.', explanation: l('took ages = time-consuming.', 'took ages = time-consuming।'), why: { 'The survey was expensive.': l('Nothing is said about cost.', 'খরচের কথা বলা হয়নি।'), 'The survey was too short.': l('"took ages" means it was long.', '"took ages" মানে এটা লম্বা ছিল।') } }),
        choice('ls-4-p3', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Ben: "Let’s present on Monday." Amy: "I’d rather Friday — we need more time." Ben: "Fair enough." When will they present?', 'Ben: "Let’s present on Monday." Amy: "I’d rather Friday — we need more time." Ben: "Fair enough." তাঁরা কবে present করবেন?'), options: ['Friday', 'Monday', 'They don’t decide'], answer: 'Friday', explanation: l('"Fair enough" = Ben agrees to Friday.', '"Fair enough" = Ben Friday-তে রাজি।'), why: { Monday: l('Monday is suggested, then replaced.', 'Monday প্রস্তাব হয়, তারপর বদলায়।'), 'They don’t decide': l('"Fair enough" confirms the decision.', '"Fair enough" সিদ্ধান্ত নিশ্চিত করে।') } }),
        choice('ls-4-p4', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Tutor: "Your data is fine, but I’d suggest you shorten the introduction." What does the tutor want?', 'Tutor: "Your data is fine, but I’d suggest you shorten the introduction." Tutor কী চান?'), options: ['A shorter introduction', 'More data', 'A longer introduction'], answer: 'A shorter introduction', explanation: l('"I’d suggest you…" gives the advice.', '"I’d suggest you…" পরামর্শ দেয়।'), why: { 'More data': l('The data is "fine".', 'Data "fine"।'), 'A longer introduction': l('The opposite: shorten.', 'উল্টো: ছোট করা।') } }),
        choice('ls-4-p5', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('"Choose TWO letters." You choose C and A; the answers are A and C. How many marks?', '"Choose TWO letters." আপনি C আর A বাছলেন; উত্তর A আর C। কত নম্বর?'), options: ['2', '1', '0'], answer: '2', explanation: l('Any order: one mark per correct letter.', 'যেকোনো ক্রম: প্রতি সঠিক অক্ষরে এক নম্বর।'), why: { '1': l('Both letters are correct, in any order.', 'দুটো অক্ষরই ঠিক, যেকোনো ক্রমে।'), '0': l('Order does not matter here.', 'এখানে ক্রম গুরুত্বপূর্ণ না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ls-4-r1', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Write the method they choose (one word).', 'তাঁরা যে পদ্ধতি বাছেন সেটা লিখুন (একটা word)।'), sentence: 'A: "An online poll?" B: "Too few replies last time." A: "Right — focus groups, then." Method: ___ groups', accepted: ['focus'], explanation: l('The poll is rejected; focus groups are chosen.', 'Poll বাতিল; focus group বাছা হয়।') }),
        gap('ls-4-r2', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Write the number of speakers possible in Part 3 (the maximum).', 'Part 3-এ সর্বোচ্চ কতজন speaker থাকতে পারেন লিখুন।'), sentence: 'Part 3 can have up to ___ speakers.', accepted: ['4', 'four'], explanation: l('2–4 speakers.', '২–৪ জন speaker।') }),
        spot('ls-4-r3', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('One word shows the wrong meaning. Tap it and fix it.', 'একটা word ভুল অর্থ দেখায়। Tap করে ঠিক করুন।'), sentence: 'When a student says "I’m not so sure", she agrees.', wrong: 'agrees', accepted: ['disagrees', 'doubts'], explanation: l('"I’m not so sure" = doubt / disagreement.', '"I’m not so sure" = সন্দেহ / দ্বিমত।') }),
        correct('ls-4-r4', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Correct the strategy.', 'কৌশলটা ঠিক করুন।'), sentence: 'Choose an option as soon as you hear its words.', accepted: ['Choose an option only after you hear whether it is accepted.', 'Choose an option only when the speakers agree on it.', 'Wait for the final decision before you choose an option.'], explanation: l('Wait for agreement or rejection.', 'একমত বা বাতিলের অপেক্ষা করুন।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ls-4-c1', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Which phrase shows a speaker CHANGING their mind?', 'কোন phrase speaker-এর মত বদল বোঝায়?'), options: ['On second thoughts, …', 'For example, …', 'First of all, …'], answer: 'On second thoughts, …', explanation: l('A new decision follows.', 'এর পরে নতুন সিদ্ধান্ত আসে।') }),
        spot('ls-4-c2', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('One word breaks the paraphrase. Tap it, then fix it.', 'একটা word paraphrase ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Heard: "It was really cheap." Option: The equipment was expensive.', wrong: 'expensive', accepted: ['inexpensive', 'cheap', 'affordable', 'low-cost'], fixOptions: ['inexpensive', 'expensively', 'costly'], explanation: l('cheap = inexpensive.', 'cheap = inexpensive।') }),
        order('ls-4-c3', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Listen for what the speakers finally decide.', explanation: l('The final decision counts.', 'শেষ সিদ্ধান্ত গোনা হয়।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a short discussion', 'এবার আপনার পালা: একটা ছোট আলোচনা'),
      exercises: [
        write('ls-4-y1', 'ls-part3', {
          ...P,
          prompt: l('Write a 4-line discussion between two students choosing a project topic. One idea should be suggested and rejected, and they should agree on another.', 'Project-এর বিষয় বাছাই নিয়ে দুই শিক্ষার্থীর ৪ লাইনের আলোচনা লিখুন। একটা idea প্রস্তাব হয়ে বাতিল হবে, আর তাঁরা আরেকটায় একমত হবেন।'),
          model: 'Rina: How about researching traffic in Dhaka? Omar: I’m not so sure — there is already a lot of research on that. Rina: True. What about river pollution in our district, then? Omar: Good idea. We can collect our own photos and data.',
          checklist: [l('a suggestion and a rejection', 'একটা প্রস্তাব আর বাতিল'), l('agreement language (True, Good idea)', 'একমতের ভাষা (True, Good idea)'), l('a clear final decision', 'পরিষ্কার শেষ সিদ্ধান্ত')],
          explanation: l('Model a Part 3 conversation.', 'Part 3-এর মতো কথোপকথন।'),
          task: 'The student writes a 4-line discussion like IELTS Listening Part 3: one idea is suggested and rejected, and the speakers agree on another. Judge whether the discussion clearly shows suggestion, disagreement (e.g. "I’m not so sure", "Maybe, but…"), agreement (e.g. "True", "Exactly", "Good idea") and a final decision, then grammar only where it blocks the meaning. State what the final decision is, as a listener would.',
          target: l('Agreeing, disagreeing, deciding', 'একমত, দ্বিমত, সিদ্ধান্ত'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Part 3: 2–4 speakers, academic; follow suggestions, agreement and the final decision.', 'Part 3: ২–৪ জন speaker, academic; প্রস্তাব, একমত আর শেষ সিদ্ধান্ত অনুসরণ করুন।'),
        l('Options are paraphrased — listen for meaning, not matching words.', 'Option paraphrase করা — মিল-word না, অর্থ শুনুন।'),
        l('Choose TWO: one mark per correct letter, any order.', 'Choose TWO: প্রতি সঠিক অক্ষরে এক নম্বর, যেকোনো ক্রম।'),
      ],
    },
  ],
};

// ======================================================================= ls-5
export const lsPart4: Lesson = {
  id: 'ls-5',
  format: 'v2',
  concept: 'ls-part4',
  title: l('Part 4: lectures and note completion', 'Part 4: lecture আর note completion'),
  why: l('Part 4 is a lecture with no break. Signpost words ("firstly", "turning to", "finally") tell you where you are in the notes, and grammar around each gap tells you what kind of word to write.', 'Part 4 বিরতি ছাড়া একটা lecture। দিকনির্দেশক word ("firstly", "turning to", "finally") বলে দেয় note-এর কোথায় আছেন, আর প্রতিটা ফাঁকের আশেপাশের grammar বলে দেয় কী ধরনের word লিখতে হবে।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'listening',
  steps: [
    {
      kind: 'hook',
      title: l('Lost in a lecture', 'Lecture-এ হারিয়ে যাওয়া'),
      situation: l('Notes: "Causes of flooding: 1) heavy rain 2) ______ 3) poor drainage." The lecturer says: "…so much for rainfall. Turning now to our second factor, deforestation, which…"', 'Note: "Causes of flooding: 1) heavy rain 2) ______ 3) poor drainage।" Lecturer বলেন: "…so much for rainfall. Turning now to our second factor, deforestation, which…"'),
      question: l('What goes in the gap?', 'ফাঁকে কী বসবে?'),
      options: ['deforestation', 'rainfall', 'drainage'],
      answer: 'deforestation',
      diagnose: {
        deforestation: l('Right. "Turning now to our second factor" signals point 2: deforestation.', 'ঠিক। "Turning now to our second factor" point 2-এর সংকেত: deforestation।'),
        rainfall: l('"So much for rainfall" closes point 1. The next signpost introduces point 2.', '"So much for rainfall" point 1 শেষ করে। পরের সংকেত point 2 শুরু করে।'),
        drainage: l('Drainage is point 3 and is already printed in the notes.', 'Drainage point 3, আর note-এ আগেই ছাপা।'),
      },
    },
    {
      kind: 'discover',
      title: l('Signposts and word types', 'দিকনির্দেশক আর word-এর ধরন'),
      items: [
        { en: 'Starting: "Today I’d like to look at…" · "Firstly, …"', note: l('the topic and point 1', 'বিষয় আর point 1') },
        { en: 'Moving on: "Turning to…" · "My second point is…" · "Another factor is…"', note: l('the next point', 'পরের point') },
        { en: 'Example / result: "For instance, …" · "As a result, …"', note: l('support, not the main point', 'সহায়ক তথ্য, মূল point না') },
        { en: 'Ending: "To sum up, …" · "Finally, …"', note: l('the last point', 'শেষ point') },
      ],
      question: l('The note says "The main cause was the ______ of the soil." What type of word is missing?', 'Note-এ লেখা "The main cause was the ______ of the soil।" কী ধরনের word বাদ?'),
      options: [
        l('A noun (after "the", before "of")', 'একটা noun ("the"-এর পরে, "of"-এর আগে)'),
        l('A verb', 'একটা verb'),
        l('An adverb', 'একটা adverb'),
      ],
      answer: 0,
      pattern: l('Use signposts to follow the notes, and the grammar around each gap to predict the word type (noun, plural, adjective, number).', 'Note অনুসরণে দিকনির্দেশক ব্যবহার করুন, আর প্রতিটা ফাঁকের আশেপাশের grammar দিয়ে word-এর ধরন আন্দাজ করুন (noun, plural, adjective, সংখ্যা)।'),
    },
    {
      kind: 'concept',
      title: l('Following a lecture', 'একটা lecture অনুসরণ'),
      body: l(
        'Part 4 is an academic lecture by one speaker, usually with note or summary completion. There is no break in the middle, so read all the notes first.',
        'Part 4 একজন speaker-এর academic lecture, সাধারণত note বা summary completion। মাঝে কোনো বিরতি নেই, তাই আগে সব note পড়ে নিন।',
      ),
      points: [
        l('Before the audio: read every heading and gap, and predict each word type from the grammar (after "a" → singular noun; after "many" → plural; after "very" → adjective).', 'Audio-র আগে: প্রতিটা heading আর ফাঁক পড়ুন, আর grammar দেখে word-এর ধরন আন্দাজ করুন ("a"-এর পরে → singular noun; "many"-র পরে → plural; "very"-র পরে → adjective)।'),
        l('During the audio: use signposts ("turning to", "another", "finally") to know which heading the lecturer is on.', 'Audio চলার সময়: দিকনির্দেশক ("turning to", "another", "finally") দিয়ে বুঝুন lecturer কোন heading-এ আছেন।'),
        l('The words you write are usually the exact words you hear, but the notes around them are paraphrased.', 'যে word লেখেন তা সাধারণত হুবহু শোনা word, কিন্তু আশেপাশের note paraphrase করা।'),
        l('Check plurals and spelling: "many ______" needs a plural (farmers, not farmer).', 'Plural আর বানান যাচাই করুন: "many ______"-এ plural লাগে (farmer না, farmers)।'),
        l('Common mix-up: losing your place and giving up. If you miss one gap, jump to the next heading using the signposts.', 'সাধারণ ভুল: জায়গা হারিয়ে হাল ছেড়ে দেওয়া। একটা ফাঁক মিস হলে দিকনির্দেশক ধরে পরের heading-এ যান।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Gaps and predictions', 'ফাঁক আর আন্দাজ'),
      items: [
        { en: '"The project involved many ______." → a plural noun (volunteers)', note: l('many + plural', 'many + plural') },
        { en: '"Results were very ______." → an adjective (encouraging)', note: l('very + adjective', 'very + adjective') },
        { en: '"Costs fell by ______ per cent." → a number (15)', note: l('a number', 'সংখ্যা') },
        { en: '"The study began in ______." → a year or month (2019)', note: l('a date', 'তারিখ') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where these skills help', 'এই দক্ষতা কোথায় কাজে লাগে'),
      uses: [
        { skill: 'listening', example: 'Complete the notes. Write ONE WORD ONLY.', note: l('Part 4 note completion.', 'Part 4 note completion।') },
        { skill: 'reading', example: 'Summary completion uses the same prediction', note: l('Word type from grammar.', 'Grammar থেকে word-এর ধরন।') },
        { skill: 'writing', example: 'Task 2 signposts: "Turning to the second argument…"', note: l('Organising ideas.', 'Idea গোছানো।') },
        { skill: 'speaking', example: 'Part 2: "Firstly… Another reason… Finally…"', note: l('A structured long turn.', 'গোছানো লম্বা বলা।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: '"many farmer"', right: '"many farmers"', why: l('many + plural.', 'many + plural।') },
        { wrong: 'Writing the example instead of the main point', right: '"For instance" introduces support, not the heading', why: l('Follow the signposts.', 'দিকনির্দেশক অনুসরণ করুন।') },
        { wrong: 'Stopping after a missed gap', right: 'Jump to the next signposted heading', why: l('No break in Part 4.', 'Part 4-এ বিরতি নেই।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ls-5-p1', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('Which signpost introduces the NEXT point?', 'কোন দিকনির্দেশক পরের point শুরু করে?'), options: ['Turning to…', 'For instance…', 'In other words…'], answer: 'Turning to…', explanation: l('A new point.', 'নতুন point।'), why: { 'For instance…': l('This introduces an example.', 'এটা উদাহরণ শুরু করে।'), 'In other words…': l('This repeats the same point in different words.', 'এটা একই point অন্য word-এ বলে।') } }),
        choice('ls-5-p2', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('The note says "Many ______ lost their jobs." What type of word fits?', 'Note-এ লেখা "Many ______ lost their jobs।" কী ধরনের word বসবে?'), options: ['A plural noun', 'An adjective', 'A verb'], answer: 'A plural noun', explanation: l('many + plural noun.', 'many + plural noun।'), why: { 'An adjective': l('After "many", a noun is needed (the subject of "lost").', '"many"-র পরে noun লাগে ("lost"-এর subject)।'), 'A verb': l('"lost" is already the verb.', '"lost" নিজেই verb।') } }),
        choice('ls-5-p3', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('You hear: "…for instance, in Kenya." Is Kenya a main point?', 'আপনি শুনলেন: "…for instance, in Kenya।" Kenya কি মূল point?'), options: ['No — it is an example', 'Yes — it is the next heading', 'Yes — it is the conclusion'], answer: 'No — it is an example', explanation: l('"For instance" = an example.', '"For instance" = উদাহরণ।'), why: { 'Yes — it is the next heading': l('Headings are introduced by "turning to", "another factor", etc.', 'Heading শুরু হয় "turning to", "another factor" ইত্যাদি দিয়ে।'), 'Yes — it is the conclusion': l('Conclusions start with "to sum up" or "finally".', 'উপসংহার শুরু হয় "to sum up" বা "finally" দিয়ে।') } }),
        choice('ls-5-p4', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('Notes: "Results were very ______." You hear: "…and the results were very encouraging." What do you write?', 'Note: "Results were very ______।" আপনি শুনলেন: "…and the results were very encouraging।" কী লিখবেন?'), options: ['encouraging', 'encourage', 'encouragement'], answer: 'encouraging', explanation: l('very + adjective.', 'very + adjective।'), why: { encourage: l('A verb does not fit after "very".', '"very"-র পরে verb বসে না।'), encouragement: l('A noun does not fit after "very".', '"very"-র পরে noun বসে না।') } }),
        choice('ls-5-p5', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('You missed the answer under heading 2 and the lecturer says "Finally, …". What should you do?', 'Heading 2-এর উত্তর মিস করেছেন, আর lecturer বলছেন "Finally, …"। কী করবেন?'), options: ['Move to the last heading now', 'Keep listening for heading 2', 'Stop and re-read the notes'], answer: 'Move to the last heading now', explanation: l('"Finally" = the last point.', '"Finally" = শেষ point।'), why: { 'Keep listening for heading 2': l('Heading 2 has passed.', 'Heading 2 পার হয়ে গেছে।'), 'Stop and re-read the notes': l('You would miss the final answers.', 'শেষের উত্তরগুলো মিস হবে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ls-5-r1', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('Write ONE WORD from what you hear.', 'যা শোনেন তা থেকে একটা word লিখুন।'), sentence: 'You hear: "Another factor is the loss of wetlands." Notes: Factor 3 — loss of ___', accepted: ['wetlands'], explanation: l('wetlands (plural).', 'wetlands (plural)।') }),
        gap('ls-5-r2', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('Write ONE WORD from what you hear.', 'যা শোনেন তা থেকে একটা word লিখুন।'), sentence: 'You hear: "The scheme trained many volunteers." Notes: The scheme trained many ___.', accepted: ['volunteers'], explanation: l('many + plural.', 'many + plural।') }),
        spot('ls-5-r3', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('One answer breaks the grammar of the note. Tap it and fix it.', 'একটা উত্তর note-এর grammar ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Notes: Several village were flooded.', wrong: 'village', accepted: ['villages'], explanation: l('several + plural.', 'several + plural।') }),
        gap('ls-5-r4', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('Write the signpost word.', 'দিকনির্দেশক word লিখুন।'), sentence: 'A lecturer ends with: "___, I’d like to sum up the three main causes."', accepted: ['Finally', 'Lastly', 'So'], explanation: l('Finally / Lastly → the last point.', 'Finally / Lastly → শেষ point।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ls-5-c1', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('The gap is "a ______ increase". What type of word?', 'ফাঁক হলো "a ______ increase"। কী ধরনের word?'), options: ['An adjective', 'A plural noun', 'A verb'], answer: 'An adjective', explanation: l('a + adjective + noun.', 'a + adjective + noun।') }),
        spot('ls-5-c2', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('One word in the note is the wrong form. Tap it, then fix it.', 'Note-এর একটা word-এর form ভুল। Tap করে ঠিক করুন।'), sentence: 'Notes: The results were very encourage.', wrong: 'encourage', accepted: ['encouraging'], fixOptions: ['encouraging', 'encouraged', 'encourages'], explanation: l('very + adjective: encouraging.', 'very + adjective: encouraging।') }),
        order('ls-5-c3', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('Build the signposted sentence.', 'দিকনির্দেশক-সহ sentence-টা সাজান।'), answer: 'Turning now to the second cause of flooding.', explanation: l('Turning to = the next point.', 'Turning to = পরের point।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a mini lecture', 'এবার আপনার পালা: একটা ছোট lecture'),
      exercises: [
        write('ls-5-y1', 'ls-part4', {
          ...P,
          prompt: l('Write a 3–4 sentence mini lecture on "Why cities flood" with clear signposts for three points (firstly / turning to / finally).', '"Why cities flood" নিয়ে ৩–৪ sentence-এর ছোট lecture লিখুন, তিনটা point-এর জন্য পরিষ্কার দিকনির্দেশক (firstly / turning to / finally)।'),
          model: 'Today I’d like to look at why cities flood. Firstly, heavy rain can fall faster than drains can carry it away. Turning to the second cause, new buildings cover the ground, so water cannot soak into the soil. Finally, rubbish often blocks the drains.',
          checklist: [l('an opening line', 'একটা শুরুর লাইন'), l('three signposted points', 'তিনটা দিকনির্দেশক-সহ point'), l('an example or result with "for instance" or "so"', '"for instance" বা "so" দিয়ে উদাহরণ বা ফল')],
          explanation: l('Signposts make a lecture easy to follow.', 'দিকনির্দেশক lecture সহজে বোঝার মতো করে।'),
          task: 'The student writes a short lecture with three signposted points, like IELTS Listening Part 4. Judge the signposting first: an opening ("Today I’d like to look at…"), clear markers for each point (Firstly / Turning to / Another… / Finally / To sum up), and examples or results introduced with "for instance", "as a result" or "so", not confused with the main points. Then correct grammar only where it blocks the meaning. Say which three points a listener would write in their notes.',
          target: l('Signposting', 'দিকনির্দেশ'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Part 4: one lecturer, academic, no break — read all notes first.', 'Part 4: একজন lecturer, academic, বিরতি নেই — আগে সব note পড়ুন।'),
        l('Signposts: firstly · turning to · another · for instance (example) · finally.', 'দিকনির্দেশক: firstly · turning to · another · for instance (উদাহরণ) · finally।'),
        l('Predict the word type from the grammar; check plurals and spelling.', 'Grammar থেকে word-এর ধরন আন্দাজ করুন; plural আর বানান যাচাই করুন।'),
      ],
    },
  ],
};

// ======================================================================= ls-6
export const lsRules: Lesson = {
  id: 'ls-6',
  format: 'v2',
  concept: 'ls-rules',
  title: l('Question types and answer rules', 'প্রশ্নের ধরন আর উত্তরের নিয়ম'),
  why: l('A correct idea can still score zero: one extra word, a missing plural -s, or a spelling slip. Know the question types and follow the instructions exactly.', 'ঠিক idea-ও শূন্য পেতে পারে: একটা বাড়তি word, plural -s বাদ, বা একটা বানানের ভুল। প্রশ্নের ধরন জানুন আর নির্দেশ হুবহু মানুন।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'listening',
  steps: [
    {
      kind: 'hook',
      title: l('The right idea, the wrong answer', 'ঠিক idea, ভুল উত্তর'),
      situation: l('Instruction: "Write NO MORE THAN TWO WORDS." You hear: "…in the old library building." You write: "the old library".', 'নির্দেশ: "Write NO MORE THAN TWO WORDS।" আপনি শুনলেন: "…in the old library building।" আপনি লিখলেন: "the old library"।'),
      question: l('Is it correct?', 'এটা কি ঠিক?'),
      options: ['No — three words; "old library" would fit', 'Yes — the meaning is right', 'Yes — "the" does not count'],
      answer: 'No — three words; "old library" would fit',
      diagnose: {
        'No — three words; "old library" would fit': l('Right. Every word counts, including "the". Extra words make the answer wrong.', 'ঠিক। প্রতিটা word গোনা হয়, "the"-ও। বাড়তি word থাকলে উত্তর ভুল।'),
        'Yes — the meaning is right': l('The word limit is part of the answer: three words break "no more than two".', 'Word-এর সীমা উত্তরের অংশ: তিনটা word "no more than two" ভাঙে।'),
        'Yes — "the" does not count': l('"the" is a word and counts.', '"the" একটা word, গোনা হয়।'),
      },
    },
    {
      kind: 'discover',
      title: l('Question types and instructions', 'প্রশ্নের ধরন আর নির্দেশ'),
      items: [
        { en: 'Form, note, table, flow-chart, summary and sentence completion', note: l('write words from the recording', 'recording থেকে word লিখুন') },
        { en: 'Multiple choice · matching · map / plan / diagram labelling · short answers', note: l('choose letters or write short answers', 'অক্ষর বাছুন বা ছোট উত্তর লিখুন') },
        { en: '"ONE WORD ONLY" · "NO MORE THAN TWO WORDS AND/OR A NUMBER"', note: l('the word limit', 'word-এর সীমা') },
        { en: 'well-known = 1 word · 25 = a number · 25 June = a word and a number', note: l('hyphenated words count as one', 'hyphen-যুক্ত word একটা') },
      ],
      question: l('Under "NO MORE THAN TWO WORDS AND/OR A NUMBER", which answer is allowed?', '"NO MORE THAN TWO WORDS AND/OR A NUMBER"-এ কোন উত্তর চলে?'),
      options: [
        l('3 large rooms', '3 large rooms'),
        l('three very large rooms', 'three very large rooms'),
        l('the three large rooms', 'the three large rooms'),
      ],
      answer: 0,
      pattern: l('Read the instruction for every question group. Count every word (a, the, of); a number is allowed only when the instruction says "and/or a number"; hyphenated words count as one.', 'প্রতিটা প্রশ্ন-দলের নির্দেশ পড়ুন। প্রতিটা word গুনুন (a, the, of); "and/or a number" থাকলে তবেই সংখ্যা চলে; hyphen-যুক্ত word একটা।'),
    },
    {
      kind: 'concept',
      title: l('Answer rules that protect your marks', 'যে নিয়ম আপনার নম্বর বাঁচায়'),
      body: l(
        'Listening answers are marked exactly. These rules turn correct listening into correct marks.',
        'Listening-এর উত্তর হুবহু মেলানো হয়। এই নিয়মগুলো ঠিক শোনাকে ঠিক নম্বরে রূপ দেয়।',
      ),
      points: [
        l('Word limits: obey them exactly. Extra words make the answer wrong. Hyphenated words count as one word.', 'Word-এর সীমা: হুবহু মানুন। বাড়তি word থাকলে উত্তর ভুল। Hyphen-যুক্ত word একটা word হিসেবে গোনা হয়।'),
        l('Spelling and plurals: a correct idea spelled wrong, or missing a needed -s, is marked wrong.', 'বানান আর plural: ঠিক idea ভুল বানানে বা দরকারি -s ছাড়া লিখলে ভুল ধরা হয়।'),
        l('Grammar fit: the answer must fit the sentence or note ("a ______ garden" needs an adjective or noun that fits after "a").', 'Grammar-এর মিল: উত্তর sentence বা note-এ মানাতে হবে ("a ______ garden"-এ "a"-এর পরে মানায় এমন adjective বা noun)।'),
        l('Choose TWO / THREE: one mark per correct letter, in any order. Matching: an option may be used more than once only when the instructions say so.', 'Choose TWO / THREE: প্রতি সঠিক অক্ষরে এক নম্বর, যেকোনো ক্রমে। Matching: নির্দেশে বললে তবেই একটা option একাধিকবার ব্যবহার করা যায়।'),
        l('Common mix-up: thinking "a", "the" or numbers written as digits do not count as words. Articles count as words; digits count as a number.', 'সাধারণ ভুল: ভাবা যে "a", "the" বা অঙ্কে লেখা সংখ্যা word হিসেবে গোনা হয় না। Article word হিসেবে গোনা হয়; অঙ্ক সংখ্যা হিসেবে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Checking answers', 'উত্তর যাচাই'),
      items: [
        { en: 'ONE WORD ONLY: "rainfall" ✓ · "heavy rainfall" ✗', note: l('two words', 'দুটো word') },
        { en: 'TWO WORDS: "part-time job" ✓ (hyphen = one word)', note: l('2 words', '২টা word') },
        { en: '"many ______" → "volunteers" ✓ · "volunteer" ✗', note: l('plural needed', 'plural লাগবে') },
        { en: '"accommodation" ✓ · "accomodation" ✗', note: l('spelling counts', 'বানান গোনা হয়') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where these rules apply', 'এই নিয়ম কোথায় খাটে'),
      uses: [
        { skill: 'listening', example: 'Complete the table. Write ONE WORD AND/OR A NUMBER.', note: l('Completion tasks.', 'Completion task।') },
        { skill: 'reading', example: 'The same word limits apply in Reading completion tasks.', note: l('Reading too.', 'Reading-এও।') },
        { skill: 'writing', example: 'Accurate spelling of common words (accommodation, environment)', note: l('Spelling matters in Writing too.', 'Writing-এও বানান গুরুত্বপূর্ণ।') },
        { skill: 'speaking', example: 'Clear plural -s in speech (two brothers)', note: l('Plurals matter everywhere.', 'Plural সব জায়গায় গুরুত্বপূর্ণ।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'ONE WORD ONLY → "the museum"', right: '"museum"', why: l('"the" counts.', '"the" গোনা হয়।') },
        { wrong: '"enviroment"', right: '"environment"', why: l('Spelling counts.', 'বানান গোনা হয়।') },
        { wrong: '"several ______" → "student"', right: '"students"', why: l('several + plural.', 'several + plural।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ls-6-p1', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('"ONE WORD ONLY." Which answer is allowed?', '"ONE WORD ONLY।" কোন উত্তর চলে?'), options: ['traffic', 'the traffic', 'heavy traffic'], answer: 'traffic', explanation: l('One word.', 'একটা word।'), why: { 'the traffic': l('"the" is a second word.', '"the" দ্বিতীয় word।'), 'heavy traffic': l('Two words.', 'দুটো word।') } }),
        choice('ls-6-p2', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('How many words is "part-time"?', '"part-time" কয়টা word?'), options: ['1', '2', '3'], answer: '1', explanation: l('Hyphenated words count as one.', 'Hyphen-যুক্ত word একটা।'), why: { '2': l('The hyphen joins it into one word.', 'Hyphen এটাকে একটা word-এ জোড়ে।'), '3': l('It is one hyphenated word.', 'এটা একটা hyphen-যুক্ত word।') } }),
        choice('ls-6-p3', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('The note says "Several ______ were closed." You hear "…several bridges were closed". What do you write?', 'Note-এ লেখা "Several ______ were closed।" আপনি শুনলেন "…several bridges were closed"। কী লিখবেন?'), options: ['bridges', 'bridge', 'the bridges'], answer: 'bridges', explanation: l('several + plural.', 'several + plural।'), why: { bridge: l('The plural -s is needed.', 'Plural -s লাগবে।'), 'the bridges': l('"the" does not fit after "several".', '"several"-এর পরে "the" বসে না।') } }),
        choice('ls-6-p4', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('Which spelling is correct?', 'কোন বানান ঠিক?'), options: ['accommodation', 'accomodation', 'acommodation'], answer: 'accommodation', explanation: l('double c, double m.', 'দুটো c, দুটো m।'), why: { accomodation: l('It needs two Ms.', 'দুটো M লাগে।'), acommodation: l('It needs two Cs.', 'দুটো C লাগে।') } }),
        choice('ls-6-p5', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('"NO MORE THAN TWO WORDS AND/OR A NUMBER." You hear "on the 3rd of May". Which answer is best?', '"NO MORE THAN TWO WORDS AND/OR A NUMBER।" আপনি শুনলেন "on the 3rd of May"। কোন উত্তর সবচেয়ে ভালো?'), options: ['3 May', 'on the 3rd of May', 'the third of May'], answer: '3 May', explanation: l('A number + one word.', 'একটা সংখ্যা + একটা word।'), why: { 'on the 3rd of May': l('Too many words.', 'অনেক বেশি word।'), 'the third of May': l('Four words.', 'চারটা word।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ls-6-r1', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('Write the answer in ONE WORD ONLY.', 'ONE WORD ONLY-তে উত্তর লিখুন।'), sentence: 'You hear: "…the visitors must stay near the old harbour." Visitors stay near the ___.', accepted: ['harbour', 'harbor'], explanation: l('"old harbour" would be two words.', '"old harbour" দুটো word হতো।') }),
        gap('ls-6-r2', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('Spell the word correctly.', 'Word-টা সঠিক বানানে লিখুন।'), sentence: 'We need to protect the ___ (environment / enviroment).', accepted: ['environment'], explanation: l('environment — with an N before -ment.', 'environment — -ment-এর আগে N।') }),
        spot('ls-6-r3', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('One answer breaks the grammar of the note. Tap it and fix it.', 'একটা উত্তর note-এর grammar ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Notes: The club has many member.', wrong: 'member', accepted: ['members'], explanation: l('many + plural.', 'many + plural।') }),
        correct('ls-6-r4', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('Shorten the answer to fit "NO MORE THAN TWO WORDS".', '"NO MORE THAN TWO WORDS"-এ মানাতে উত্তর ছোট করুন।'), sentence: 'the city museum', accepted: ['city museum'], explanation: l('Drop "the".', '"the" বাদ দিন।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ls-6-c1', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('"Choose TWO letters." Which statement is true?', '"Choose TWO letters।" কোন বাক্যটা সত্য?'), options: ['Each correct letter gets one mark, in any order', 'Both must be right to get any mark', 'The order must match the recording'], answer: 'Each correct letter gets one mark, in any order', explanation: l('One mark per letter.', 'প্রতি অক্ষরে এক নম্বর।') }),
        spot('ls-6-c2', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('One word is misspelled. Tap it, then fix it.', 'একটা word-এর বানান ভুল। Tap করে ঠিক করুন।'), sentence: 'Answer: goverment grant', wrong: 'goverment', accepted: ['government'], fixOptions: ['government', 'governmant', 'govermentt'], explanation: l('government — with an N.', 'government — N-সহ।') }),
        order('ls-6-c3', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Extra words make the answer wrong.', explanation: l('Obey the word limit.', 'Word-এর সীমা মানুন।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your answer checklist', 'এবার আপনার পালা: আপনার উত্তর-যাচাইয়ের তালিকা'),
      exercises: [
        write('ls-6-y1', 'ls-rules', {
          ...P,
          prompt: l('Write 3 sentences: the checks you will make on every Listening answer before you move on or transfer it.', '৩টা sentence লিখুন: এগিয়ে যাওয়া বা উত্তর তোলার আগে প্রতিটা Listening উত্তরে কী কী যাচাই করবেন।'),
          model: 'First, I will count the words and make sure I follow the word limit, including words like "the". Then I will check that the answer fits the grammar of the note, for example a plural after "many". Finally, I will check the spelling of every word.',
          checklist: [l('word limit (articles count)', 'word-এর সীমা (article গোনা হয়)'), l('grammar fit and plurals', 'grammar-এর মিল আর plural'), l('spelling', 'বানান')],
          explanation: l('Protect your marks.', 'আপনার নম্বর বাঁচান।'),
          task: 'The student lists the checks they will make on each IELTS Listening answer. Judge the facts and strategy first: obey the word limit exactly (articles count; hyphenated words count as one; a number is allowed only with "and/or a number"); the answer must fit the grammar of the note (plurals after many/several); spelling must be correct; Choose TWO/THREE gives one mark per correct letter in any order. Then correct grammar only where it blocks the meaning. Correct any wrong rule gently.',
          target: l('Answer rules', 'উত্তরের নিয়ম'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Obey the word limit: every word counts; hyphenated words count as one.', 'Word-এর সীমা মানুন: প্রতিটা word গোনা হয়; hyphen-যুক্ত word একটা।'),
        l('Fit the grammar: plurals after many / several; spelling must be exact.', 'Grammar মেলান: many / several-এর পরে plural; বানান হুবহু।'),
        l('Choose TWO: one mark per letter, any order.', 'Choose TWO: প্রতি অক্ষরে এক নম্বর, যেকোনো ক্রম।'),
      ],
    },
  ],
};

import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Understanding IELTS Writing (Foundation LEVEL 2, module 4), six lessons in the
 * v2 format. Facts and techniques match lib/ai/server/mino/knowledge/ielts.ts
 * (Task 1 at least 150 words / about 20 minutes, Task 2 at least 250 words /
 * about 40 minutes, 60 minutes in total, Task 2 counts for more; four equally
 * weighted criteria; under length or off-topic lowers the score; Task 1
 * introduction + overview + key data, no opinion; Task 2 answers every part with
 * a clear position, one main idea per paragraph, and a conclusion; cohesion is
 * more than linking words; precise, natural words rather than rare ones).
 * wr-1 how Writing works and is marked · wr-2 Task 1 introduction and overview ·
 * wr-3 describing and comparing data · wr-4 understanding a Task 2 question ·
 * wr-5 Task 2 paragraphs · wr-6 coherence, cohesion and word choice.
 * The museum table uses invented numbers. Original Mino content.
 */

export const WRITING_CONCEPTS: Concept[] = [
  { id: 'wr-format', title: l('How Writing works and is marked', 'Writing কীভাবে চলে আর মার্ক হয়'), lessonId: 'wr-1', tag: 'writing' },
  { id: 'wr-task1', title: l('Task 1: introduction and overview', 'Task 1: introduction আর overview'), lessonId: 'wr-2', tag: 'writing' },
  { id: 'wr-data', title: l('Task 1: describing and comparing data', 'Task 1: data বর্ণনা আর তুলনা'), lessonId: 'wr-3', tag: 'writing' },
  { id: 'wr-task2', title: l('Task 2: understanding the question', 'Task 2: প্রশ্ন বোঝা'), lessonId: 'wr-4', tag: 'writing' },
  { id: 'wr-paragraph', title: l('Task 2: paragraphs that develop ideas', 'Task 2: idea গড়ে তোলা paragraph'), lessonId: 'wr-5', tag: 'writing' },
  { id: 'wr-cohesion', title: l('Coherence, cohesion and word choice', 'Coherence, cohesion আর word বাছাই'), lessonId: 'wr-6', tag: 'writing' },
];

const P = { tag: 'writing' as const };

/** An example Task 1 table (invented numbers). */
export const MUSEUMS = 'Example table (invented data), visitors to three city museums: Science Museum 120,000 (2000), 180,000 (2010), 260,000 (2020); Art Gallery 150,000, 140,000, 90,000; History Museum 80,000, 85,000, 82,000.';

/** An example Task 2 question. */
export const UNI_Q = 'Some people think universities should teach only subjects that help students get jobs. Others believe universities should offer a wide range of subjects. Discuss both views and give your own opinion.';

// ======================================================================= wr-1
export const wrFormat: Lesson = {
  id: 'wr-1',
  format: 'v2',
  concept: 'wr-format',
  title: l('How Writing works and is marked', 'Writing কীভাবে চলে আর মার্ক হয়'),
  why: l('IELTS Writing has two tasks in 60 minutes, and you manage the time yourself. Knowing the word minimums, the timing and the four marking criteria tells you where your effort should go.', 'IELTS Writing-এ ৬০ মিনিটে দুটো task, আর সময় আপনাকেই ভাগ করতে হয়। Word-এর ন্যূনতম সংখ্যা, সময় আর মার্কিং-এর চারটা criteria জানলে বুঝবেন পরিশ্রম কোথায় দেবেন।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('The wrong task got the time', 'ভুল task সময় পেল'),
      situation: l('Rafi spends 40 minutes on Task 1 and writes 320 words. With 20 minutes left, he writes 180 words for Task 2.', 'Rafi Task 1-এ ৪০ মিনিট খরচ করে ৩২০ word লেখেন। বাকি ২০ মিনিটে Task 2-এ ১৮০ word লেখেন।'),
      question: l('What went wrong?', 'কী ভুল হলো?'),
      options: ['Task 2 needs about 40 minutes and at least 250 words, and it counts for more', 'Nothing — a longer Task 1 gets a higher score', 'He should have finished Task 2 in 10 minutes'],
      answer: 'Task 2 needs about 40 minutes and at least 250 words, and it counts for more',
      diagnose: {
        'Task 2 needs about 40 minutes and at least 250 words, and it counts for more': l('Right. Task 1: at least 150 words in about 20 minutes. Task 2: at least 250 words in about 40 minutes — and Task 2 counts for more.', 'ঠিক। Task 1: প্রায় ২০ মিনিটে অন্তত ১৫০ word। Task 2: প্রায় ৪০ মিনিটে অন্তত ২৫০ word — আর Task 2-এর গুরুত্ব বেশি।'),
        'Nothing — a longer Task 1 gets a higher score': l('Extra Task 1 words took the time Task 2 needed, and Task 2 is now under 250 words, which lowers its score.', 'Task 1-এর বাড়তি word Task 2-এর সময় খেয়ে ফেলেছে, আর Task 2 এখন ২৫০ word-এর কম — এতে score কমে।'),
        'He should have finished Task 2 in 10 minutes': l('Task 2 is the longer, more important task: plan about 40 minutes for it.', 'Task 2 লম্বা আর বেশি গুরুত্বপূর্ণ: এর জন্য প্রায় ৪০ মিনিট রাখুন।'),
      },
    },
    {
      kind: 'discover',
      title: l('Two tasks, one hour', 'দুটো task, এক ঘণ্টা'),
      items: [
        { en: 'Task 1: at least 150 words · about 20 minutes', note: l('Academic: describe a chart, table, map or process', 'Academic: chart, table, map বা process বর্ণনা') },
        { en: 'Task 2: at least 250 words · about 40 minutes', note: l('an essay answering a question', 'একটা প্রশ্নের উত্তরে essay') },
        { en: '60 minutes in total — no one tells you when to move on', note: l('you manage the time', 'সময় আপনিই ভাগ করবেন') },
        { en: 'Task 2 counts for more than Task 1', note: l('protect its 40 minutes', 'এর ৪০ মিনিট রক্ষা করুন') },
      ],
      question: l('Which task deserves more time?', 'কোন task-এ বেশি সময় দেওয়া উচিত?'),
      options: [
        l('Task 2 — about 40 minutes', 'Task 2 — প্রায় ৪০ মিনিট'),
        l('Task 1 — it comes first', 'Task 1 — এটা আগে আসে'),
        l('Both exactly 30 minutes', 'দুটোই ঠিক ৩০ মিনিট'),
      ],
      answer: 0,
      pattern: l('Task 1: 150+ words in about 20 minutes. Task 2: 250+ words in about 40 minutes. 60 minutes in total; Task 2 counts for more.', 'Task 1: প্রায় ২০ মিনিটে ১৫০+ word। Task 2: প্রায় ৪০ মিনিটে ২৫০+ word। মোট ৬০ মিনিট; Task 2-এর গুরুত্ব বেশি।'),
    },
    {
      kind: 'concept',
      title: l('Four criteria, equally weighted', 'চারটা criteria, সমান গুরুত্ব'),
      body: l(
        'Trained examiners mark each task on four criteria. Each criterion counts equally, so grammar alone cannot carry an answer.',
        'প্রশিক্ষিত examiner প্রতিটা task চারটা criteria-য় মার্ক করেন। প্রতিটার গুরুত্ব সমান, তাই শুধু grammar দিয়ে উত্তর দাঁড়ায় না।',
      ),
      points: [
        l('Task Achievement (Task 1) / Task Response (Task 2): did you do everything the task asks?', 'Task Achievement (Task 1) / Task Response (Task 2): task যা চায় সব করেছেন কি?'),
        l('Coherence & Cohesion: are your ideas organised and easy to follow?', 'Coherence & Cohesion: idea গোছানো আর সহজে অনুসরণযোগ্য কি?'),
        l('Lexical Resource: are your words precise and natural?', 'Lexical Resource: word কি নির্ভুল আর স্বাভাবিক?'),
        l('Grammatical Range & Accuracy: do you use a range of structures, written accurately?', 'Grammatical Range & Accuracy: বিভিন্ন গঠন নির্ভুলভাবে ব্যবহার করেছেন কি?'),
        l('Writing under the minimum word count, or off-topic, lowers the score.', 'ন্যূনতম word-এর কম লিখলে, বা প্রশ্নের বাইরে লিখলে, score কমে।'),
        l('Common mix-up: "a longer Task 1 is always better". Meet the minimums, but extra Task 1 words take time from Task 2, which counts for more.', 'সাধারণ ভুল: "Task 1 যত লম্বা তত ভালো"। ন্যূনতম পূরণ করুন, কিন্তু Task 1-এর বাড়তি word Task 2-এর সময় নেয়, যার গুরুত্ব বেশি।'),
      ],
    },
    {
      kind: 'examples',
      title: l('The four criteria in action', 'চারটা criteria কাজে'),
      items: [
        { en: 'Task Achievement: an introduction, an overview and the key data from the table', note: l('everything the task asks', 'task যা চায় সব') },
        { en: 'Coherence & Cohesion: clear paragraphs; "this trend" points back to the last idea', note: l('easy to follow', 'সহজে অনুসরণযোগ্য') },
        { en: 'Lexical Resource: "a sharp rise" rather than "a very very big change"', note: l('precise and natural', 'নির্ভুল আর স্বাভাবিক') },
        { en: 'Grammatical Range & Accuracy: "Although visitors fell, the gallery stayed open." — written correctly', note: l('range + accuracy', 'বৈচিত্র্য + নির্ভুলতা') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'writing', example: 'Task 1: 150+ words, ~20 min · Task 2: 250+ words, ~40 min', note: l('Plan the hour before you start.', 'শুরুর আগে ঘণ্টাটা ভাগ করুন।') },
        { skill: 'speaking', example: 'Lexical Resource and Grammatical Range & Accuracy are Speaking criteria too.', note: l('Two shared criteria.', 'দুটো criteria একই।') },
        { skill: 'reading', example: 'Reading a Task 2 question closely uses the same keyword skills as Reading.', note: l('Find every part.', 'প্রতিটা অংশ খুঁজুন।') },
        { skill: 'listening', example: 'Signposts in Part 4 lectures ("firstly", "to sum up") organise ideas the way good essays do.', note: l('Organised ideas.', 'গোছানো idea।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Writing 320 words for Task 1 and 180 for Task 2', right: 'At least 150 and at least 250, in about 20 and 40 minutes', why: l('Under the minimum lowers the score.', 'ন্যূনতমের কম হলে score কমে।') },
        { wrong: 'Thinking grammar is the only thing marked', right: 'Four criteria, equally weighted', why: l('Task, organisation, words and grammar.', 'Task, গোছানো, word আর grammar।') },
        { wrong: 'Writing a memorised essay on a similar topic', right: 'Answer the exact question', why: l('Off-topic writing lowers the score.', 'প্রশ্নের বাইরে লিখলে score কমে।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('wr-1-p1', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('What is the minimum length for Task 2?', 'Task 2-এর ন্যূনতম দৈর্ঘ্য কত?'), options: ['250 words', '150 words', '400 words'], answer: '250 words', explanation: l('At least 250 words.', 'অন্তত ২৫০ word।'), why: { '150 words': l('150 is the minimum for Task 1.', '১৫০ হলো Task 1-এর ন্যূনতম।'), '400 words': l('There is no 400-word rule; the minimum is 250.', '৪০০ word-এর নিয়ম নেই; ন্যূনতম ২৫০।') } }),
        choice('wr-1-p2', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('How is each Writing task marked?', 'প্রতিটা Writing task কীভাবে মার্ক হয়?'), options: ['On four criteria, equally weighted', 'On grammar and spelling only', 'On one overall impression'], answer: 'On four criteria, equally weighted', explanation: l('Task, Coherence & Cohesion, Lexical Resource, Grammar.', 'Task, Coherence & Cohesion, Lexical Resource, Grammar।'), why: { 'On grammar and spelling only': l('Grammar is one of four criteria.', 'Grammar চারটা criteria-র একটা।'), 'On one overall impression': l('There are four named criteria.', 'নির্দিষ্ট চারটা criteria আছে।') } }),
        choice('wr-1-p3', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Which task counts for more?', 'কোন task-এর গুরুত্ব বেশি?'), options: ['Task 2', 'Task 1', 'They count the same'], answer: 'Task 2', explanation: l('Task 2 counts for more than Task 1.', 'Task 2-এর গুরুত্ব Task 1-এর চেয়ে বেশি।'), why: { 'Task 1': l('Task 1 is shorter and counts for less.', 'Task 1 ছোট আর গুরুত্ব কম।'), 'They count the same': l('Task 2 counts for more.', 'Task 2-এর গুরুত্ব বেশি।') } }),
        choice('wr-1-p4', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Which criterion checks that you answer every part of a Task 2 question?', 'Task 2 প্রশ্নের প্রতিটা অংশের উত্তর দিয়েছেন কি না — কোন criteria দেখে?'), options: ['Task Response', 'Lexical Resource', 'Grammatical Range & Accuracy'], answer: 'Task Response', explanation: l('Task Response = answering the question fully.', 'Task Response = প্রশ্নের পূর্ণ উত্তর।'), why: { 'Lexical Resource': l('Lexical Resource is about word choice.', 'Lexical Resource হলো word বাছাই।'), 'Grammatical Range & Accuracy': l('That criterion is about grammar.', 'ওই criteria grammar নিয়ে।') } }),
        choice('wr-1-p5', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('A student writes 140 words for Task 1. What happens?', 'একজন শিক্ষার্থী Task 1-এ ১৪০ word লিখলেন। কী হবে?'), options: ['Being under the minimum lowers the score', 'Nothing — only quality matters', 'Task 1 is skipped and Task 2 counts double'], answer: 'Being under the minimum lowers the score', explanation: l('Aim for at least 150 words.', 'অন্তত ১৫০ word-এর লক্ষ্য রাখুন।'), why: { 'Nothing — only quality matters': l('Length below the minimum does lower the score.', 'ন্যূনতমের কম দৈর্ঘ্য score কমায়।'), 'Task 1 is skipped and Task 2 counts double': l('There is no such rule.', 'এমন কোনো নিয়ম নেই।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('wr-1-r1', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'Writing Task 1 needs at least ___ words.', accepted: ['150'], explanation: l('150.', '১৫০।') }),
        gap('wr-1-r2', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'IELTS Writing lasts ___ minutes in total.', accepted: ['60', 'sixty'], explanation: l('60 minutes for both tasks.', 'দুটো task মিলিয়ে ৬০ মিনিট।') }),
        spot('wr-1-r3', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('One word makes this advice wrong. Tap it and fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Spend about 20 minutes on Task 2.', wrong: '20', accepted: ['40', 'forty'], explanation: l('Task 2: about 40 minutes.', 'Task 2: প্রায় ৪০ মিনিট।') }),
        correct('wr-1-r4', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Correct the false statement.', 'ভুল বাক্যটা ঠিক করুন।'), sentence: 'Examiners mark Writing on grammar only.', accepted: ['Examiners mark Writing on four criteria.', 'Examiners mark Writing on four equally weighted criteria.', 'Examiners mark Writing on four criteria, equally weighted.'], explanation: l('Four criteria, equally weighted.', 'চারটা criteria, সমান গুরুত্ব।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('wr-1-c1', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('25 minutes are left and you have not started Task 2. Best move?', '২৫ মিনিট বাকি, Task 2 এখনো শুরু করেননি। সবচেয়ে ভালো পদক্ষেপ?'), options: ['Start Task 2 now with a short plan', 'Keep improving Task 1', 'Write Task 2 as a list of notes'], answer: 'Start Task 2 now with a short plan', explanation: l('Task 2 counts for more; notes are not an essay.', 'Task 2-এর গুরুত্ব বেশি; note essay না।') }),
        spot('wr-1-c2', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('One number is wrong. Tap it, then fix it.', 'একটা সংখ্যা ভুল। Tap করে ঠিক করুন।'), sentence: 'Task 2 needs at least 150 words.', wrong: '150', accepted: ['250'], fixOptions: ['250', '100', '500'], explanation: l('Task 2: at least 250 words.', 'Task 2: অন্তত ২৫০ word।') }),
        order('wr-1-c3', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Build the fact.', 'তথ্যটা সাজান।'), answer: 'Task 2 counts for more than Task 1.', explanation: l('Protect Task 2’s time.', 'Task 2-এর সময় রক্ষা করুন।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: plan the hour', 'এবার আপনার পালা: ঘণ্টাটা ভাগ করুন'),
      exercises: [
        write('wr-1-y1', 'wr-format', {
          ...P,
          prompt: l('Write 3 sentences explaining how you will use the 60 minutes of IELTS Writing and what the examiner looks for.', 'IELTS Writing-এর ৬০ মিনিট কীভাবে ব্যবহার করবেন আর examiner কী দেখেন — ৩টা sentence-এ লিখুন।'),
          model: 'I will spend about 20 minutes on Task 1 and write at least 150 words. Then I will spend about 40 minutes on Task 2, which counts for more, and write at least 250 words. The examiner marks each task on four equal criteria, so I will answer the task fully, organise my ideas, choose precise words and check my grammar.',
          checklist: [l('the time and word minimum for each task', 'প্রতিটা task-এর সময় আর ন্যূনতম word'), l('Task 2 counts for more', 'Task 2-এর গুরুত্ব বেশি'), l('the four criteria', 'চারটা criteria')],
          explanation: l('Plan the hour before it starts.', 'শুরুর আগেই ঘণ্টাটা ভাগ করুন।'),
          task: 'The student explains how they will use the 60 minutes of IELTS Writing and what the examiner looks for. Judge the facts first: Task 1 at least 150 words in about 20 minutes; Task 2 at least 250 words in about 40 minutes; 60 minutes in total; Task 2 counts for more; four criteria, equally weighted (Task Achievement / Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy); under length or off-topic lowers the score. Then correct grammar only where it blocks the meaning. Correct any wrong fact gently.',
          target: l('How Writing works and is marked', 'Writing কীভাবে চলে আর মার্ক হয়'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Task 1: 150+ words, ~20 min · Task 2: 250+ words, ~40 min · 60 minutes in total.', 'Task 1: ১৫০+ word, ~২০ মিনিট · Task 2: ২৫০+ word, ~৪০ মিনিট · মোট ৬০ মিনিট।'),
        l('Task 2 counts for more — protect its time.', 'Task 2-এর গুরুত্ব বেশি — এর সময় রক্ষা করুন।'),
        l('Four equal criteria: task, coherence & cohesion, words, grammar.', 'চারটা সমান criteria: task, coherence & cohesion, word, grammar।'),
      ],
    },
  ],
};

// ======================================================================= wr-2
export const wrOverview: Lesson = {
  id: 'wr-2',
  format: 'v2',
  concept: 'wr-task1',
  title: l('Task 1: introduction and overview', 'Task 1: introduction আর overview'),
  why: l('In Academic Task 1 you report what a chart or table shows. The overview — the main trends in one or two sentences — is what separates a report from a list of numbers.', 'Academic Task 1-এ chart বা table যা দেখায় তা report করতে হয়। Overview — এক-দুই sentence-এ মূল trend — একটা report-কে সংখ্যার তালিকা থেকে আলাদা করে।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A list of numbers', 'সংখ্যার তালিকা'),
      situation: l(`${MUSEUMS} Mitu writes: "The table shows the number of visitors to three museums. In 2000 the Science Museum had 120,000 visitors, in 2010 it had 180,000, in 2020 it had 260,000, and the Art Gallery had 150,000…" and continues with every number.`, `${MUSEUMS} Mitu লেখেন: "The table shows the number of visitors to three museums. In 2000 the Science Museum had 120,000 visitors, in 2010 it had 180,000, in 2020 it had 260,000, and the Art Gallery had 150,000…" — আর প্রতিটা সংখ্যা লিখে যান।`),
      question: l('What is missing?', 'কী নেই?'),
      options: ['An overview of the main trends', 'More numbers', 'Her opinion about museums'],
      answer: 'An overview of the main trends',
      diagnose: {
        'An overview of the main trends': l('Right. She lists numbers but never says what they show overall: the Science Museum grew, the Art Gallery fell, the History Museum stayed about the same.', 'ঠিক। তিনি সংখ্যা লেখেন কিন্তু সামগ্রিকভাবে কী দেখায় তা বলেন না: Science Museum বেড়েছে, Art Gallery কমেছে, History Museum প্রায় একই থেকেছে।'),
        'More numbers': l('She already has every number. What is missing is the big picture.', 'প্রতিটা সংখ্যা তো আছেই। যা নেই তা হলো বড় ছবিটা।'),
        'Her opinion about museums': l('Task 1 has no opinion — you report only what the data shows.', 'Task 1-এ মতামত নেই — data যা দেখায় শুধু তা-ই report করুন।'),
      },
    },
    {
      kind: 'discover',
      title: l('The first two parts of a Task 1 answer', 'Task 1 উত্তরের প্রথম দুই অংশ'),
      items: [
        { en: MUSEUMS, note: l('the example table', 'উদাহরণের table') },
        { en: 'Introduction: "The table compares how many people visited three museums in a city in 2000, 2010 and 2020."', note: l('the question in your own words', 'প্রশ্নটা নিজের word-এ') },
        { en: 'Overview: "Overall, the Science Museum became much more popular, while visits to the Art Gallery fell and the History Museum stayed about the same."', note: l('the main trends, no detailed numbers', 'মূল trend, খুঁটিনাটি সংখ্যা নয়') },
        { en: 'Not: "I think museums are important for children."', note: l('no opinion in Task 1', 'Task 1-এ মতামত নয়') },
      ],
      question: l('What does an overview give?', 'Overview কী দেয়?'),
      options: [
        l('The main trends, without detailed numbers', 'মূল trend, খুঁটিনাটি সংখ্যা ছাড়া'),
        l('Every number in the table', 'Table-এর প্রতিটা সংখ্যা'),
        l('Your opinion about the topic', 'বিষয়টা নিয়ে আপনার মতামত'),
      ],
      answer: 0,
      pattern: l('Introduction = paraphrase what the chart shows. Overview = 1–2 sentences on the main trends, often starting "Overall,". No opinion.', 'Introduction = chart কী দেখায় নিজের word-এ। Overview = মূল trend নিয়ে ১–২ sentence, প্রায়ই "Overall," দিয়ে শুরু। মতামত নয়।'),
    },
    {
      kind: 'concept',
      title: l('Introduction, overview, then details', 'Introduction, overview, তারপর খুঁটিনাটি'),
      body: l(
        'An Academic Task 1 answer has an introduction that paraphrases the question, a clear overview of the main trends or features, and then two body paragraphs with key data and comparisons.',
        'Academic Task 1 উত্তরে থাকে প্রশ্নের paraphrase করা introduction, মূল trend বা বৈশিষ্ট্যের পরিষ্কার overview, তারপর মূল data আর তুলনা নিয়ে দুটো body paragraph।',
      ),
      points: [
        l('Introduction: say what the chart shows in your own words (shows → compares / illustrates; the number of visitors → how many people visited).', 'Introduction: chart কী দেখায় নিজের word-এ বলুন (shows → compares / illustrates; the number of visitors → how many people visited)।'),
        l('Overview: one or two sentences on the biggest changes or differences, usually starting "Overall,". Keep detailed numbers for the body paragraphs.', 'Overview: সবচেয়ে বড় পরিবর্তন বা পার্থক্য নিয়ে এক-দুই sentence, সাধারণত "Overall," দিয়ে শুরু। খুঁটিনাটি সংখ্যা body paragraph-এর জন্য রাখুন।'),
        l('Report only what the data shows: no opinion, no reasons that are not in the chart.', 'Data যা দেখায় শুধু তা-ই: মতামত নয়, chart-এ নেই এমন কারণ নয়।'),
        l('The body paragraphs then give the key numbers and comparisons (next lesson).', 'তারপর body paragraph-এ মূল সংখ্যা আর তুলনা (পরের lesson)।'),
        l('Common mix-up: copying the question word for word, or listing every number with no overview. The task asks for the main features, so without an overview they are not reported.', 'সাধারণ ভুল: প্রশ্ন হুবহু তুলে দেওয়া, বা overview ছাড়া প্রতিটা সংখ্যা লেখা। Task মূল বৈশিষ্ট্য চায়, তাই overview না থাকলে সেগুলো report হয় না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Good and weak openings', 'ভালো আর দুর্বল শুরু'),
      items: [
        { en: 'Question: "The table shows the number of visitors…" → "The table compares how many people visited…" ✓', note: l('paraphrase', 'paraphrase') },
        { en: '"Overall, the Science Museum saw by far the biggest rise." ✓', note: l('a main trend', 'একটা মূল trend') },
        { en: '"Overall, in 2020 the Science Museum had 260,000 visitors." ✗', note: l('a detail, not a trend', 'খুঁটিনাটি, trend নয়') },
        { en: '"I think the Art Gallery should advertise more." ✗', note: l('opinion — not in Task 1', 'মতামত — Task 1-এ নয়') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'writing', example: 'Task 1: introduction + overview + 2 body paragraphs', note: l('The overview is essential.', 'Overview অপরিহার্য।') },
        { skill: 'reading', example: 'Skimming for the main idea is the reading side of an overview.', note: l('Big picture first.', 'আগে বড় ছবি।') },
        { skill: 'listening', example: '"To sum up…" in a Part 4 lecture gives its overview.', note: l('Main points.', 'মূল কথা।') },
        { skill: 'speaking', example: 'Part 2: one opening sentence that sums up your answer helps the listener.', note: l('Say the main point first.', 'আগে মূল কথা।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Copying the question word for word', right: 'Paraphrase: "shows the number of" → "compares how many"', why: l('Use your own words.', 'নিজের word ব্যবহার করুন।') },
        { wrong: 'No overview, just numbers', right: '"Overall, … while …"', why: l('Report the main trends.', 'মূল trend report করুন।') },
        { wrong: '"I believe science is more useful than art."', right: 'Report only what the table shows', why: l('No opinion in Task 1.', 'Task 1-এ মতামত নয়।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('wr-2-p1', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Best paraphrase of "The table shows the number of visitors to three museums"?', '"The table shows the number of visitors to three museums"-এর সবচেয়ে ভালো paraphrase?'), options: ['The table compares how many people visited three museums.', 'The table shows the number of visitors to three museums.', 'I think three museums are interesting.'], answer: 'The table compares how many people visited three museums.', explanation: l('Same meaning, your own words.', 'একই অর্থ, নিজের word।'), why: { 'The table shows the number of visitors to three museums.': l('That copies the question word for word.', 'এটা প্রশ্ন হুবহু তুলে দেওয়া।'), 'I think three museums are interesting.': l('An opinion, and not what the table shows.', 'মতামত, আর table যা দেখায় তা নয়।') } }),
        choice('wr-2-p2', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Which sentence is an overview?', 'কোন sentence-টা overview?'), sentence: MUSEUMS, options: ['Overall, the Science Museum became far more popular, while the Art Gallery lost visitors.', 'In 2010, the Science Museum had 180,000 visitors.', 'Museums are important for education.'], answer: 'Overall, the Science Museum became far more popular, while the Art Gallery lost visitors.', explanation: l('Main trends, no detailed numbers.', 'মূল trend, খুঁটিনাটি সংখ্যা নয়।'), why: { 'In 2010, the Science Museum had 180,000 visitors.': l('One detail, not a trend.', 'একটা খুঁটিনাটি, trend নয়।'), 'Museums are important for education.': l('An opinion — not in Task 1.', 'মতামত — Task 1-এ নয়।') } }),
        choice('wr-2-p3', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Which should NOT be in a Task 1 answer?', 'Task 1 উত্তরে কোনটা থাকা উচিত নয়?'), options: ['Your opinion about why people like science', 'The main trends', 'Key numbers with comparisons'], answer: 'Your opinion about why people like science', explanation: l('No opinion, no invented reasons.', 'মতামত নয়, বানানো কারণ নয়।'), why: { 'The main trends': l('The overview gives the main trends — it is needed.', 'Overview মূল trend দেয় — এটা দরকার।'), 'Key numbers with comparisons': l('The body paragraphs need key data.', 'Body paragraph-এ মূল data দরকার।') } }),
        choice('wr-2-p4', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Which overview is about a trend, not a detail?', 'কোন overview trend নিয়ে, খুঁটিনাটি নয়?'), sentence: MUSEUMS, options: ['Overall, visits to the History Museum hardly changed.', 'Overall, the History Museum had 85,000 visitors in 2010.', 'Overall, the History Museum is very old.'], answer: 'Overall, visits to the History Museum hardly changed.', explanation: l('A trend across the period.', 'পুরো সময়ের একটা trend।'), why: { 'Overall, the History Museum had 85,000 visitors in 2010.': l('One number from one year — a detail.', 'এক বছরের একটা সংখ্যা — খুঁটিনাটি।'), 'Overall, the History Museum is very old.': l('The table says nothing about age.', 'Table বয়স নিয়ে কিছু বলে না।') } }),
        choice('wr-2-p5', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Where does the overview usually go?', 'Overview সাধারণত কোথায় থাকে?'), options: ['Near the start, after the introduction', 'Only in Task 2', 'Hidden among the numbers'], answer: 'Near the start, after the introduction', explanation: l('Make it easy to find.', 'সহজে চোখে পড়ার মতো রাখুন।'), why: { 'Only in Task 2': l('Task 1 needs an overview.', 'Task 1-এ overview দরকার।'), 'Hidden among the numbers': l('A hidden overview is easy to miss.', 'লুকানো overview সহজে চোখ এড়ায়।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('wr-2-r1', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'An overview often begins with the word "___,".', accepted: ['Overall'], explanation: l('"Overall, …"', '"Overall, …"') }),
        gap('wr-2-r2', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'A Task 1 answer should not include your ___.', accepted: ['opinion', 'opinions', 'view', 'views'], explanation: l('No opinion in Task 1.', 'Task 1-এ মতামত নয়।') }),
        spot('wr-2-r3', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('One word makes this rule wrong. Tap it and fix it.', 'একটা word এই নিয়মকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'An overview describes the minor trends.', wrong: 'minor', accepted: ['main', 'key', 'major'], explanation: l('The main trends.', 'মূল trend।') }),
        correct('wr-2-r4', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Correct the advice. Start: "In Task 1, do not…"', 'পরামর্শটা ঠিক করুন। শুরু: "In Task 1, do not…"'), sentence: 'In Task 1, give your opinion in the last sentence.', accepted: ['In Task 1, do not give your opinion.', 'In Task 1, do not give your opinion in the last sentence.', 'In Task 1, do not give an opinion.'], explanation: l('Report only the data.', 'শুধু data report করুন।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('wr-2-c1', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('The question says "The graph shows the number of cars sold". Best introduction?', 'প্রশ্নে আছে "The graph shows the number of cars sold"। সবচেয়ে ভালো introduction?'), options: ['The graph illustrates how many cars were sold.', 'The graph shows the number of cars sold.', 'Cars are very popular nowadays.'], answer: 'The graph illustrates how many cars were sold.', explanation: l('Paraphrased, same meaning.', 'Paraphrase, একই অর্থ।') }),
        spot('wr-2-c2', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l(`${MUSEUMS} One word in this overview is wrong. Tap it, then fix it.`, `${MUSEUMS} এই overview-এর একটা word ভুল। Tap করে ঠিক করুন।`), sentence: 'Overall, the Art Gallery became more popular.', wrong: 'more', accepted: ['less'], fixOptions: ['less', 'very', 'most'], explanation: l('150,000 → 90,000: it lost visitors.', '১৫০,০০০ → ৯০,০০০: দর্শক কমেছে।') }),
        order('wr-2-c3', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Build the overview.', 'Overview-টা সাজান।'), answer: 'Overall, visits to the Art Gallery fell.', explanation: l('A main trend.', 'একটা মূল trend।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: introduction and overview', 'এবার আপনার পালা: introduction আর overview'),
      exercises: [
        write('wr-2-y1', 'wr-task1', {
          ...P,
          prompt: l(`${MUSEUMS} Write an introduction (a paraphrase of what the table shows) and an overview (1–2 sentences on the main trends).`, `${MUSEUMS} একটা introduction (table কী দেখায় তার paraphrase) আর একটা overview (মূল trend নিয়ে ১–২ sentence) লিখুন।`),
          model: 'The table compares how many people visited three museums in a city in 2000, 2010 and 2020. Overall, the Science Museum became much more popular, while visits to the Art Gallery fell and the History Museum stayed about the same.',
          checklist: [l('a paraphrase, not a copy', 'Paraphrase, হুবহু নয়'), l('an overview of the main trends', 'মূল trend-এর overview'), l('no detailed numbers, no opinion', 'খুঁটিনাটি সংখ্যা নয়, মতামত নয়')],
          explanation: l('Big picture first.', 'আগে বড় ছবি।'),
          task: `The student writes a Task 1 introduction and overview for this table: "${MUSEUMS}". Judge the task first: the introduction paraphrases what the table shows (not copied); the overview gives the main trends (Science Museum rose strongly and became the most visited; Art Gallery fell; History Museum stayed about the same) without detailed numbers; no opinion or reasons not in the table; every claim matches the table. Then correct grammar and word choice only where it matters for the meaning or accuracy.`,
          target: l('Task 1 introduction and overview', 'Task 1 introduction আর overview'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Introduction: what the chart shows, in your own words.', 'Introduction: chart কী দেখায়, নিজের word-এ।'),
        l('Overview: "Overall, …" — the main trends, no detailed numbers.', 'Overview: "Overall, …" — মূল trend, খুঁটিনাটি সংখ্যা নয়।'),
        l('No opinion in Task 1.', 'Task 1-এ মতামত নয়।'),
      ],
    },
  ],
};

// ======================================================================= wr-3
export const wrData: Lesson = {
  id: 'wr-3',
  format: 'v2',
  concept: 'wr-data',
  title: l('Task 1: describing and comparing data', 'Task 1: data বর্ণনা আর তুলনা'),
  why: l('The body paragraphs of Task 1 give the key numbers and compare them. A few verbs, prepositions and comparison patterns, used accurately, do most of the work.', 'Task 1-এর body paragraph মূল সংখ্যা দেয় আর তুলনা করে। কয়েকটা verb, preposition আর তুলনার গঠন নির্ভুলভাবে ব্যবহার করলেই বেশিরভাগ কাজ হয়ে যায়।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('Two small errors, two lost points', 'দুটো ছোট ভুল'),
      situation: l(`${MUSEUMS} Jamal writes: "The Science Museum’s visitors were increased from 120,000 to 260,000. The Art Gallery rose to 90,000 in 2020."`, `${MUSEUMS} Jamal লেখেন: "The Science Museum’s visitors were increased from 120,000 to 260,000. The Art Gallery rose to 90,000 in 2020."`),
      question: l('What is wrong?', 'কী ভুল?'),
      options: ['"were increased" should be "increased", and the Art Gallery fell, not rose', 'Nothing', 'Numbers must be written in words'],
      answer: '"were increased" should be "increased", and the Art Gallery fell, not rose',
      diagnose: {
        '"were increased" should be "increased", and the Art Gallery fell, not rose': l('Right. Trend verbs like increase and rise take no passive here, and every trend must match the data: 150,000 → 90,000 is a fall.', 'ঠিক। এখানে increase, rise-এর মতো trend verb passive হয় না, আর প্রতিটা trend data-র সাথে মিলতে হবে: ১৫০,০০০ → ৯০,০০০ মানে কমা।'),
        'Nothing': l('Check the verb form and the direction: "were increased" is wrong, and the Art Gallery fell.', 'Verb form আর দিক দেখুন: "were increased" ভুল, আর Art Gallery কমেছে।'),
        'Numbers must be written in words': l('Figures are fine in Task 1. The problems are the verb form and the wrong trend.', 'Task 1-এ অঙ্কে সংখ্যা লেখা চলে। সমস্যা verb form আর ভুল trend।'),
      },
    },
    {
      kind: 'discover',
      title: l('The language of change', 'পরিবর্তনের ভাষা'),
      items: [
        { en: 'Up: rise / increase / grow → "rose sharply from 120,000 to 260,000"', note: l('rise – rose – risen', 'rise – rose – risen') },
        { en: 'Down: fall / decrease / decline → "fell from 150,000 to 90,000"', note: l('fall – fell – fallen', 'fall – fell – fallen') },
        { en: 'No change: remain stable / stay steady → "remained at around 80,000"', note: l('small ups and downs', 'সামান্য ওঠানামা') },
        { en: 'Compare: whereas · while · more than · the most · almost three times as many as', note: l('link two pieces of data', 'দুটো data জোড়া') },
      ],
      question: l('Which phrase describes the History Museum (80,000 → 85,000 → 82,000)?', 'History Museum (৮০,০০০ → ৮৫,০০০ → ৮২,০০০) কোন phrase-এ মেলে?'),
      options: [
        l('remained fairly stable', 'remained fairly stable'),
        l('rose dramatically', 'rose dramatically'),
        l('fell sharply', 'fell sharply'),
      ],
      answer: 0,
      pattern: l('Group the data, use trend verbs (rise, fall, remain stable) with from … to / by, compare with whereas / more than / the most, and check every number.', 'Data ভাগ করুন, trend verb (rise, fall, remain stable) from … to / by দিয়ে লিখুন, whereas / more than / the most দিয়ে তুলনা করুন, আর প্রতিটা সংখ্যা মিলিয়ে নিন।'),
    },
    {
      kind: 'concept',
      title: l('Accurate trends and comparisons', 'নির্ভুল trend আর তুলনা'),
      body: l(
        'Body paragraphs select the key data, group it, and compare. Accuracy matters: every number and every direction must match the chart.',
        'Body paragraph মূল data বাছে, ভাগ করে, আর তুলনা করে। নির্ভুলতা জরুরি: প্রতিটা সংখ্যা আর দিক chart-এর সাথে মিলতে হবে।',
      ),
      points: [
        l('Group the data (for example, the rising museum in one paragraph, the others in the next) instead of one sentence per number.', 'Data ভাগ করুন (যেমন, যেটা বেড়েছে এক paragraph-এ, বাকিগুলো পরেরটায়) — প্রতিটা সংখ্যার জন্য একটা করে sentence নয়।'),
        l('Trend verbs: rise / increase / grow; fall / decrease / decline; remain stable. Here they need no object and no passive: "Visitors increased", not "were increased".', 'Trend verb: rise / increase / grow; fall / decrease / decline; remain stable। এখানে object বা passive লাগে না: "Visitors increased", "were increased" নয়।'),
        l('Size of the change: rose sharply / slightly, or a sharp / slight rise.', 'পরিবর্তনের মাত্রা: rose sharply / slightly, বা a sharp / slight rise।'),
        l('Prepositions: from … to … (start and end level), by … (the size of the change), in 2020.', 'Preposition: from … to … (শুরু আর শেষের মাত্রা), by … (পরিবর্তনের পরিমাণ), in 2020।'),
        l('Past years → past tense: rose, fell, remained.', 'অতীতের বছর → past tense: rose, fell, remained।'),
        l('Common mix-up: "rose" and "raised". Raise needs an object (the city raised prices); for numbers going up, use rose.', 'সাধারণ ভুল: "rose" আর "raised"। Raise-এর object লাগে (the city raised prices); সংখ্যা বাড়লে rose।'),
      ],
    },
    {
      kind: 'examples',
      title: l('A body paragraph, sentence by sentence', 'একটা body paragraph, sentence ধরে'),
      items: [
        { en: 'Visitors to the Science Museum rose sharply, from 120,000 in 2000 to 260,000 in 2020.', note: l('trend + from … to', 'trend + from … to') },
        { en: 'By contrast, the Art Gallery’s visitors fell from 150,000 to 90,000.', note: l('contrast', 'বৈপরীত্য') },
        { en: 'The History Museum remained stable at around 80,000.', note: l('no real change', 'প্রকৃত পরিবর্তন নেই') },
        { en: 'In 2020, the Science Museum had almost three times as many visitors as the Art Gallery.', note: l('260,000 vs 90,000', '২৬০,০০০ বনাম ৯০,০০০') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'writing', example: 'Task 1 body paragraphs: key data + comparisons', note: l('Accurate numbers.', 'নির্ভুল সংখ্যা।') },
        { skill: 'speaking', example: 'Part 3: "More people shop online than before."', note: l('Comparing past and present.', 'অতীত আর বর্তমানের তুলনা।') },
        { skill: 'reading', example: 'Passages paraphrase trends: "rose" = "grew" = "went up".', note: l('Recognise the same trend.', 'একই trend চিনুন।') },
        { skill: 'listening', example: 'Part 4 lectures describe data with these verbs.', note: l('Hear the direction.', 'দিকটা শুনুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Visitors were increased', right: 'Visitors increased', why: l('No passive for this trend verb.', 'এই trend verb-এ passive নয়।') },
        { wrong: 'The number raised', right: 'The number rose', why: l('Raise needs an object.', 'Raise-এর object লাগে।') },
        { wrong: 'One sentence for every number, in date order', right: 'Group and compare the key data', why: l('Select, group, compare.', 'বাছুন, ভাগ করুন, তুলনা করুন।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('wr-3-p1', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('Choose the verb.', 'Verb বাছুন।'), sentence: 'Visitors to the Science Museum ___ between 2000 and 2020.', options: ['rose', 'raised', 'were risen'], answer: 'rose', explanation: l('rise – rose, no object.', 'rise – rose, object নেই।'), why: { raised: l('Raise needs an object: "raised prices".', 'Raise-এর object লাগে: "raised prices"।'), 'were risen': l('Rise is never passive.', 'Rise কখনো passive হয় না।') } }),
        choice('wr-3-p2', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('Which phrase describes 150,000 → 90,000?', '১৫০,০০০ → ৯০,০০০ কোন phrase-এ মেলে?'), options: ['a significant fall', 'a slight rise', 'no change'], answer: 'a significant fall', explanation: l('It lost 60,000 visitors.', '৬০,০০০ দর্শক কমেছে।'), why: { 'a slight rise': l('The number went down, not up.', 'সংখ্যা কমেছে, বাড়েনি।'), 'no change': l('A drop of 60,000 is a real change.', '৬০,০০০ কমা প্রকৃত পরিবর্তন।') } }),
        choice('wr-3-p3', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('Which preposition shows the size of the change?', 'কোন preposition পরিবর্তনের পরিমাণ দেখায়?'), sentence: 'Visitors to the Science Museum rose ___ 140,000 between 2000 and 2020.', options: ['by', 'to', 'at'], answer: 'by', explanation: l('by = the size of the change (120,000 → 260,000).', 'by = পরিবর্তনের পরিমাণ (১২০,০০০ → ২৬০,০০০)।'), why: { to: l('"to" gives the end level, which was 260,000.', '"to" শেষের মাত্রা দেয়, যা ছিল ২৬০,০০০।'), at: l('"at" gives a level, not a change.', '"at" একটা মাত্রা দেয়, পরিবর্তন নয়।') } }),
        choice('wr-3-p4', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('Which is the best comparison?', 'কোনটা সবচেয়ে ভালো তুলনা?'), sentence: MUSEUMS, options: ['In 2020, the Science Museum had almost three times as many visitors as the Art Gallery.', 'In 2020, the Science Museum had many visitors and the Art Gallery had visitors.', 'The Science Museum is better than the Art Gallery.'], answer: 'In 2020, the Science Museum had almost three times as many visitors as the Art Gallery.', explanation: l('260,000 vs 90,000: accurate and clear.', '২৬০,০০০ বনাম ৯০,০০০: নির্ভুল আর পরিষ্কার।'), why: { 'In 2020, the Science Museum had many visitors and the Art Gallery had visitors.': l('No real comparison and no data.', 'প্রকৃত তুলনা নেই, data নেই।'), 'The Science Museum is better than the Art Gallery.': l('An opinion — the table shows visitors, not quality.', 'মতামত — table দর্শক দেখায়, মান নয়।') } }),
        choice('wr-3-p5', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('How should you organise the two body paragraphs?', 'দুটো body paragraph কীভাবে সাজাবেন?'), options: ['Group the data, e.g. the museum that grew, then the other two', 'One sentence per number, in date order', 'Put every number in the overview'], answer: 'Group the data, e.g. the museum that grew, then the other two', explanation: l('Select, group, compare.', 'বাছুন, ভাগ করুন, তুলনা করুন।'), why: { 'One sentence per number, in date order': l('That is a list, with no comparison.', 'এটা তালিকা, তুলনা নেই।'), 'Put every number in the overview': l('The overview has no detailed numbers.', 'Overview-এ খুঁটিনাটি সংখ্যা থাকে না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('wr-3-r1', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'Visitors to the History Museum remained ___ at around 80,000.', accepted: ['stable', 'steady', 'constant'], explanation: l('remained stable / steady.', 'remained stable / steady।') }),
        gap('wr-3-r2', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('Write the past form of "fall".', '"fall"-এর past form লিখুন।'), sentence: 'The number of visitors ___ from 150,000 to 90,000.', accepted: ['fell', 'decreased', 'declined', 'dropped'], explanation: l('fall – fell.', 'fall – fell।') }),
        spot('wr-3-r3', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('One word is wrong. Tap it and fix it.', 'একটা word ভুল। Tap করে ঠিক করুন।'), sentence: 'The number of visitors raised sharply.', wrong: 'raised', accepted: ['rose', 'increased', 'grew'], explanation: l('rose (no object).', 'rose (object নেই)।') }),
        correct('wr-3-r4', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('Correct the preposition: 90,000 was the final level.', 'Preposition ঠিক করুন: ৯০,০০০ ছিল শেষ মাত্রা।'), sentence: 'The Art Gallery’s visitors fell by 90,000 in 2020.', accepted: ['The Art Gallery’s visitors fell to 90,000 in 2020.', "The Art Gallery's visitors fell to 90,000 in 2020."], explanation: l('to = the final level.', 'to = শেষ মাত্রা।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('wr-3-c1', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('In "rose from 120,000 to 260,000", what does "to" show?', '"rose from 120,000 to 260,000"-এ "to" কী দেখায়?'), options: ['The final level', 'The size of the change', 'The starting level'], answer: 'The final level', explanation: l('from = start, to = end, by = change.', 'from = শুরু, to = শেষ, by = পরিবর্তন।') }),
        spot('wr-3-c2', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l(`${MUSEUMS} One word is wrong. Tap it, then fix it.`, `${MUSEUMS} একটা word ভুল। Tap করে ঠিক করুন।`), sentence: 'The Science Museum had the fewest visitors in 2020.', wrong: 'fewest', accepted: ['most'], fixOptions: ['most', 'less', 'fewer'], explanation: l('260,000 was the highest.', '২৬০,০০০ ছিল সবচেয়ে বেশি।') }),
        order('wr-3-c3', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Visitors to the Art Gallery fell after 2010.', explanation: l('140,000 → 90,000.', '১৪০,০০০ → ৯০,০০০।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a body paragraph', 'এবার আপনার পালা: একটা body paragraph'),
      exercises: [
        write('wr-3-y1', 'wr-data', {
          ...P,
          prompt: l(`${MUSEUMS} Write a body paragraph (3–4 sentences) that describes and compares the key data.`, `${MUSEUMS} মূল data বর্ণনা আর তুলনা করে একটা body paragraph (৩–৪ sentence) লিখুন।`),
          model: 'Visitors to the Science Museum rose sharply, from 120,000 in 2000 to 260,000 in 2020. By contrast, the number of people visiting the Art Gallery fell from 150,000 to 90,000, with most of the fall after 2010. The History Museum remained stable at around 80,000 throughout the period. As a result, in 2020 the Science Museum had almost three times as many visitors as the Art Gallery.',
          checklist: [l('trend verbs used correctly (rose, fell, remained)', 'Trend verb সঠিকভাবে (rose, fell, remained)'), l('from … to / by used correctly', 'from … to / by সঠিকভাবে'), l('at least one comparison; every number matches', 'অন্তত একটা তুলনা; প্রতিটা সংখ্যা মেলে')],
          explanation: l('Select, group, compare — accurately.', 'বাছুন, ভাগ করুন, তুলনা করুন — নির্ভুলভাবে।'),
          task: `The student writes a Task 1 body paragraph for this table: "${MUSEUMS}". Judge accuracy first: every number and every direction must match the table (Science Museum 120,000 → 180,000 → 260,000; Art Gallery 150,000 → 140,000 → 90,000; History Museum about 80,000–85,000). Then check the data language: trend verbs with no passive ("increased", not "were increased"; "rose", not "raised"), from … to (levels) vs by (size of change), past tense for past years, and at least one clear comparison. No opinion. Correct other grammar only where it blocks the meaning.`,
          target: l('Describing and comparing data', 'Data বর্ণনা আর তুলনা'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('rise – rose, fall – fell, remain stable; no passive: "increased", not "were increased".', 'rise – rose, fall – fell, remain stable; passive নয়: "increased", "were increased" নয়।'),
        l('from … to = levels; by = the size of the change.', 'from … to = মাত্রা; by = পরিবর্তনের পরিমাণ।'),
        l('Group, compare, and check every number.', 'ভাগ করুন, তুলনা করুন, প্রতিটা সংখ্যা মিলিয়ে নিন।'),
      ],
    },
  ],
};

// ======================================================================= wr-4
export const wrQuestion: Lesson = {
  id: 'wr-4',
  format: 'v2',
  concept: 'wr-task2',
  title: l('Task 2: understanding the question', 'Task 2: প্রশ্ন বোঝা'),
  why: l('Task Response asks whether you answered this exact question — every part of it — with a clear position where one is asked for. Most Task 2 problems start before the first sentence is written.', 'Task Response দেখে আপনি ঠিক এই প্রশ্নের — প্রতিটা অংশের — উত্তর দিয়েছেন কি না, আর যেখানে চাওয়া হয়েছে সেখানে পরিষ্কার অবস্থান নিয়েছেন কি না। Task 2-এর বেশিরভাগ সমস্যা প্রথম sentence লেখার আগেই শুরু হয়।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A good essay on the wrong question', 'ভুল প্রশ্নের ভালো essay'),
      situation: l(`Question: "${UNI_Q}" Tania writes a strong, well-organised essay about why university fees are too high.`, `প্রশ্ন: "${UNI_Q}" Tania একটা শক্তিশালী, গোছানো essay লেখেন — university fee কেন বেশি, তা নিয়ে।`),
      question: l('What is the problem?', 'সমস্যা কী?'),
      options: ['It does not answer the question: both views and her own opinion are needed', 'It is too short', 'Nothing — the topic is universities'],
      answer: 'It does not answer the question: both views and her own opinion are needed',
      diagnose: {
        'It does not answer the question: both views and her own opinion are needed': l('Right. The question is about what universities should teach, and it has three parts: view 1, view 2 and her opinion. Fees are off-topic.', 'ঠিক। প্রশ্নটা university কী পড়াবে তা নিয়ে, আর এর তিনটা অংশ: view 1, view 2 আর তাঁর মতামত। Fee প্রশ্নের বাইরে।'),
        'It is too short': l('Length is not the problem here: the essay answers a different question.', 'এখানে দৈর্ঘ্য সমস্যা নয়: essay অন্য প্রশ্নের উত্তর দেয়।'),
        'Nothing — the topic is universities': l('Same general topic, different question. Off-topic writing lowers the score.', 'সাধারণ বিষয় এক, প্রশ্ন আলাদা। প্রশ্নের বাইরে লিখলে score কমে।'),
      },
    },
    {
      kind: 'discover',
      title: l('Take the question apart', 'প্রশ্নটা ভেঙে দেখুন'),
      items: [
        { en: 'Topic: what universities should teach', note: l('not fees, not housing', 'fee নয়, থাকার জায়গা নয়') },
        { en: 'View 1: only subjects that help students get jobs', note: l('part 1', 'অংশ ১') },
        { en: 'View 2: a wide range of subjects', note: l('part 2', 'অংশ ২') },
        { en: 'Instruction: "Discuss both views and give your own opinion"', note: l('part 3: your position', 'অংশ ৩: আপনার অবস্থান') },
      ],
      question: l('How many parts must this essay answer?', 'এই essay-কে কয়টা অংশের উত্তর দিতে হবে?'),
      options: [
        l('Three: view 1, view 2 and my opinion', 'তিনটা: view 1, view 2 আর আমার মতামত'),
        l('One: my opinion', 'একটা: আমার মতামত'),
        l('Two: advantages and disadvantages', 'দুটো: সুবিধা আর অসুবিধা'),
      ],
      answer: 0,
      pattern: l('Find the topic, the specific focus and the instruction words. Answer every part, and state a clear position where the question asks for one.', 'বিষয়, নির্দিষ্ট focus আর নির্দেশের word খুঁজুন। প্রতিটা অংশের উত্তর দিন, আর যেখানে চাওয়া হয়েছে সেখানে পরিষ্কার অবস্থান নিন।'),
    },
    {
      kind: 'concept',
      title: l('Every part, one clear position', 'প্রতিটা অংশ, একটা পরিষ্কার অবস্থান'),
      body: l(
        'Before writing, spend a few minutes on the question: what exactly is the topic, and what does the instruction ask you to do?',
        'লেখার আগে কয়েক মিনিট প্রশ্নটায় দিন: বিষয়টা ঠিক কী, আর নির্দেশ আপনাকে কী করতে বলছে?',
      ),
      points: [
        l('Common instructions: "To what extent do you agree or disagree?" (your position and how strongly); "Discuss both views and give your own opinion" (both sides + your position); "What are the advantages and disadvantages?" (both); "What are the causes … and what can be done?" (answer both questions).', 'সাধারণ নির্দেশ: "To what extent do you agree or disagree?" (আপনার অবস্থান আর কতটা জোরালো); "Discuss both views and give your own opinion" (দুই দিক + আপনার অবস্থান); "What are the advantages and disadvantages?" (দুটোই); "What are the causes … and what can be done?" (দুটো প্রশ্নেরই উত্তর)।'),
        l('Answer every part. A part you skip is a part of Task Response you lose.', 'প্রতিটা অংশের উত্তর দিন। যে অংশ বাদ দেবেন, Task Response-এর সেই অংশ হারাবেন।'),
        l('Where a position is asked for, state it clearly in the introduction and keep the same position to the conclusion.', 'যেখানে অবস্থান চাওয়া হয়েছে, introduction-এ পরিষ্কারভাবে বলুন আর conclusion পর্যন্ত একই অবস্থান রাখুন।'),
        l('Stay on the exact topic: the same general subject with a different focus is off-topic.', 'ঠিক বিষয়েই থাকুন: একই সাধারণ বিষয় কিন্তু আলাদা focus হলে তা প্রশ্নের বাইরে।'),
        l('Common mix-up: using a memorised essay "about universities" that answers a different question. Off-topic writing lowers the score.', 'সাধারণ ভুল: "university নিয়ে" মুখস্থ essay ব্যবহার করা, যা অন্য প্রশ্নের উত্তর দেয়। প্রশ্নের বাইরে লিখলে score কমে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Instructions and plans', 'নির্দেশ আর plan'),
      items: [
        { en: '"To what extent do you agree?" → "I largely agree, because…"', note: l('a clear position', 'পরিষ্কার অবস্থান') },
        { en: '"Discuss both views…" → body 1: view 1 · body 2: view 2 · opinion in the introduction and conclusion', note: l('every part', 'প্রতিটা অংশ') },
        { en: '"Causes … and solutions?" → body 1: causes · body 2: solutions', note: l('two questions', 'দুটো প্রশ্ন') },
        { en: '✗ "I agree" in the introduction, "I disagree" in the conclusion', note: l('position changes', 'অবস্থান বদলায়') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'writing', example: 'Task 2: Task Response starts with reading the question', note: l('Every part.', 'প্রতিটা অংশ।') },
        { skill: 'speaking', example: 'Part 3: answer the exact question the examiner asks.', note: l('Stay on the question.', 'প্রশ্নেই থাকুন।') },
        { skill: 'reading', example: 'Underlining keywords in a question is a Reading skill.', note: l('Same keyword habit.', 'একই keyword অভ্যাস।') },
        { skill: 'listening', example: 'Predicting what a question needs before the audio.', note: l('Know what to listen for.', 'কী শুনবেন জানুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Only your opinion for "Discuss both views"', right: 'Both views + your opinion', why: l('Every part.', 'প্রতিটা অংশ।') },
        { wrong: 'Changing your position in the conclusion', right: 'One clear position throughout', why: l('A consistent position.', 'একই অবস্থান।') },
        { wrong: 'Writing about university fees', right: 'Answer what universities should teach', why: l('Off-topic lowers the score.', 'প্রশ্নের বাইরে লিখলে score কমে।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('wr-4-p1', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('What does "To what extent do you agree or disagree?" ask for?', '"To what extent do you agree or disagree?" কী চায়?'), options: ['Your position and how strongly you hold it', 'Only the opposite view', 'A description of a chart'], answer: 'Your position and how strongly you hold it', explanation: l('A clear position.', 'পরিষ্কার অবস্থান।'), why: { 'Only the opposite view': l('It asks for your own position.', 'এটা আপনার নিজের অবস্থান চায়।'), 'A description of a chart': l('That is Task 1.', 'ওটা Task 1।') } }),
        choice('wr-4-p2', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('Which plan answers every part of this question?', 'কোন plan এই প্রশ্নের প্রতিটা অংশের উত্তর দেয়?'), sentence: UNI_Q, options: ['Body 1: job-related subjects · Body 2: a wide range · my opinion in the introduction and conclusion', 'Body 1 and 2: why I prefer a wide range', 'Body 1: university fees · Body 2: student housing'], answer: 'Body 1: job-related subjects · Body 2: a wide range · my opinion in the introduction and conclusion', explanation: l('Both views + opinion.', 'দুই view + মতামত।'), why: { 'Body 1 and 2: why I prefer a wide range': l('The first view is never discussed.', 'প্রথম view আলোচনাই হয়নি।'), 'Body 1: university fees · Body 2: student housing': l('Off-topic: the question is about what to teach.', 'প্রশ্নের বাইরে: প্রশ্নটা কী পড়াবে তা নিয়ে।') } }),
        choice('wr-4-p3', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('"What are the causes of traffic jams in cities, and what can be done about them?" How many questions?', '"What are the causes of traffic jams in cities, and what can be done about them?" কয়টা প্রশ্ন?'), options: ['Two: causes and solutions', 'One: causes', 'Three'], answer: 'Two: causes and solutions', explanation: l('Answer both.', 'দুটোরই উত্তর দিন।'), why: { 'One: causes': l('"what can be done" asks for solutions too.', '"what can be done" সমাধানও চায়।'), Three: l('There are two questions: causes and solutions.', 'দুটো প্রশ্ন: কারণ আর সমাধান।') } }),
        choice('wr-4-p4', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('Which introduction sentence states a clear position?', 'Introduction-এর কোন sentence পরিষ্কার অবস্থান জানায়?'), options: ['I believe universities should offer a wide range of subjects, although job skills also matter.', 'There are many opinions about this topic.', 'Universities are places where people study.'], answer: 'I believe universities should offer a wide range of subjects, although job skills also matter.', explanation: l('Clear, and it shows how strongly.', 'পরিষ্কার, আর কতটা জোরালো তা-ও দেখায়।'), why: { 'There are many opinions about this topic.': l('It gives no position.', 'কোনো অবস্থান দেয় না।'), 'Universities are places where people study.': l('A general fact, not a position.', 'সাধারণ তথ্য, অবস্থান নয়।') } }),
        choice('wr-4-p5', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('An essay says "I agree" in the introduction and "I disagree" in the conclusion. The problem?', 'একটা essay introduction-এ "I agree" আর conclusion-এ "I disagree" বলে। সমস্যা?'), options: ['The position is not clear and consistent', 'Nothing — it shows both sides', 'It is too formal'], answer: 'The position is not clear and consistent', explanation: l('Keep one position.', 'একটা অবস্থান রাখুন।'), why: { 'Nothing — it shows both sides': l('Discussing both sides is fine; changing your own position is not.', 'দুই দিক আলোচনা ঠিক আছে; নিজের অবস্থান বদলানো নয়।'), 'It is too formal': l('Formality is not the issue.', 'Formality সমস্যা নয়।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('wr-4-r1', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('Complete the instruction (one word).', 'নির্দেশটা পূরণ করুন (একটা word)।'), sentence: 'Discuss ___ views and give your own opinion.', accepted: ['both'], explanation: l('both views.', 'both views।') }),
        gap('wr-4-r2', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'Task 2 needs at least ___ words.', accepted: ['250'], explanation: l('250.', '২৫০।') }),
        spot('wr-4-r3', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('One word makes this false. Tap it and fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'An off-topic essay raises the score.', wrong: 'raises', accepted: ['lowers', 'reduces'], explanation: l('Off-topic lowers the score.', 'প্রশ্নের বাইরে লিখলে score কমে।') }),
        correct('wr-4-r4', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'When the question says discuss both views, write only about your own view.', accepted: ['When the question says discuss both views, write about both views and give your own opinion.', 'When the question says discuss both views, write about both views and give your opinion.', 'When the question says discuss both views, write about both views and your own opinion.'], explanation: l('Both views + your opinion.', 'দুই view + আপনার মতামত।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('wr-4-c1', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('What should you do in the first few minutes of Task 2?', 'Task 2-এর প্রথম কয়েক মিনিটে কী করবেন?'), options: ['Plan: position, a main idea for each paragraph, examples', 'Start writing immediately', 'Count the words in the question'], answer: 'Plan: position, a main idea for each paragraph, examples', explanation: l('A short plan protects Task Response.', 'ছোট একটা plan Task Response রক্ষা করে।') }),
        spot('wr-4-c2', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('One word makes this advice wrong. Tap it, then fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'State a clear position and change it in the conclusion.', wrong: 'change', accepted: ['keep'], fixOptions: ['keep', 'changing', 'hide'], explanation: l('Keep one position.', 'একটা অবস্থান রাখুন।') }),
        order('wr-4-c3', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Answer every part of the question.', explanation: l('Task Response.', 'Task Response।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: an introduction', 'এবার আপনার পালা: একটা introduction'),
      exercises: [
        write('wr-4-y1', 'wr-task2', {
          ...P,
          prompt: l(`Question: "${UNI_Q}" Write an introduction (2 sentences): paraphrase both views, then state your position.`, `প্রশ্ন: "${UNI_Q}" একটা introduction লিখুন (২টা sentence): দুই view paraphrase করুন, তারপর আপনার অবস্থান জানান।`),
          model: 'Some people argue that universities should focus only on subjects that lead to jobs, while others think a broad range of subjects is more valuable. In my opinion, universities should offer a wide range of subjects, although job-related skills should be part of every course.',
          checklist: [l('both views, paraphrased', 'দুই view, paraphrase করে'), l('a clear position', 'পরিষ্কার অবস্থান'), l('on the exact topic', 'ঠিক বিষয়ে')],
          explanation: l('Answer this question, not a similar one.', 'এই প্রশ্নেরই উত্তর দিন, একই রকম অন্যটার নয়।'),
          task: `The student writes a Task 2 introduction for this question: "${UNI_Q}". Judge Task Response first: both views are mentioned and paraphrased (not copied), a clear position is given, and the introduction stays on the exact topic (what universities should teach — not fees or other topics). Then correct grammar and word choice only where it blocks the meaning.`,
          target: l('Understanding a Task 2 question', 'Task 2 প্রশ্ন বোঝা'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Topic + focus + instruction: find all three.', 'বিষয় + focus + নির্দেশ: তিনটাই খুঁজুন।'),
        l('Answer every part; one clear position where asked.', 'প্রতিটা অংশের উত্তর; যেখানে চাওয়া হয়েছে সেখানে একটা পরিষ্কার অবস্থান।'),
        l('Same topic, different question = off-topic.', 'একই বিষয়, আলাদা প্রশ্ন = প্রশ্নের বাইরে।'),
      ],
    },
  ],
};

// ======================================================================= wr-5
export const wrParagraphs: Lesson = {
  id: 'wr-5',
  format: 'v2',
  concept: 'wr-paragraph',
  title: l('Task 2: paragraphs that develop ideas', 'Task 2: idea গড়ে তোলা paragraph'),
  why: l('A strong body paragraph has one main idea, explained and supported with an example. Many short, unexplained ideas look busy but answer the question less well.', 'শক্তিশালী body paragraph-এ একটা মূল idea থাকে, যার ব্যাখ্যা আর উদাহরণ আছে। অনেক ছোট, ব্যাখ্যাহীন idea ব্যস্ত দেখায়, কিন্তু প্রশ্নের উত্তর কম দেয়।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('Three ideas, no development', 'তিনটা idea, কোনো বিকাশ নেই'),
      situation: l('Body paragraph: "Job-related subjects are useful. Also, universities are expensive. Many students live in hostels."', 'Body paragraph: "Job-related subjects are useful. Also, universities are expensive. Many students live in hostels."'),
      question: l('What is the problem?', 'সমস্যা কী?'),
      options: ['Three unrelated ideas with no explanation or example', 'The sentences are too short to count', 'It uses no rare words'],
      answer: 'Three unrelated ideas with no explanation or example',
      diagnose: {
        'Three unrelated ideas with no explanation or example': l('Right. Keep one idea ("job-related subjects are useful"), explain why, and give an example.', 'ঠিক। একটা idea রাখুন ("job-related subjects are useful"), কেন তা ব্যাখ্যা করুন, আর একটা উদাহরণ দিন।'),
        'The sentences are too short to count': l('Every sentence counts. The problem is that nothing is developed.', 'প্রতিটা sentence গোনা হয়। সমস্যা হলো কিছুই বিকশিত হয়নি।'),
        'It uses no rare words': l('Rare words are not needed. One developed idea is.', 'বিরল word লাগে না। লাগে একটা বিকশিত idea।'),
      },
    },
    {
      kind: 'discover',
      title: l('Inside a body paragraph', 'Body paragraph-এর ভেতরে'),
      items: [
        { en: 'Topic sentence: "One reason to teach job-related subjects is that graduates need work quickly."', note: l('the one main idea', 'একটা মূল idea') },
        { en: 'Explanation: "Many families pay for university, so students are expected to earn soon after they finish."', note: l('why / how', 'কেন / কীভাবে') },
        { en: 'Example: "For instance, an accounting graduate can apply for jobs in banks immediately."', note: l('a specific case', 'একটা নির্দিষ্ট ঘটনা') },
        { en: 'Link back: "This is why some people want universities to focus on practical subjects."', note: l('back to the question', 'প্রশ্নে ফেরা') },
      ],
      question: l('How many main ideas should a body paragraph have?', 'একটা body paragraph-এ কয়টা মূল idea থাকা উচিত?'),
      options: [
        l('One, developed', 'একটা, বিকশিত'),
        l('Three or more', 'তিন বা বেশি'),
        l('None — just examples', 'একটাও না — শুধু উদাহরণ'),
      ],
      answer: 0,
      pattern: l('Topic sentence (one main idea) → explanation (why / how) → example → link back to the question.', 'Topic sentence (একটা মূল idea) → ব্যাখ্যা (কেন / কীভাবে) → উদাহরণ → প্রশ্নে ফেরা।'),
    },
    {
      kind: 'concept',
      title: l('One idea, fully developed', 'একটা idea, পুরোপুরি বিকশিত'),
      body: l(
        'A Task 2 essay usually has an introduction, two or three body paragraphs and a conclusion. Each body paragraph does one job.',
        'Task 2 essay-তে সাধারণত থাকে একটা introduction, দুই-তিনটা body paragraph আর একটা conclusion। প্রতিটা body paragraph একটা কাজ করে।',
      ),
      points: [
        l('One main idea per body paragraph, stated in a topic sentence.', 'প্রতিটা body paragraph-এ একটা মূল idea, topic sentence-এ বলা।'),
        l('Explain it: why is it true? how does it work? what is the result?', 'ব্যাখ্যা করুন: কেন সত্য? কীভাবে কাজ করে? ফল কী?'),
        l('Support it with a relevant example — general or personal. You do not need statistics.', 'প্রাসঙ্গিক উদাহরণ দিন — সাধারণ বা ব্যক্তিগত। পরিসংখ্যান লাগে না।'),
        l('Conclusion: sum up your position. No new arguments.', 'Conclusion: আপনার অবস্থান সংক্ষেপে বলুন। নতুন যুক্তি নয়।'),
        l('Common mix-up: listing many ideas with no explanation. Fewer ideas, well developed, answer the question better.', 'সাধারণ ভুল: ব্যাখ্যা ছাড়া অনেক idea তালিকা করা। কম idea, ভালোভাবে বিকশিত — প্রশ্নের উত্তর ভালো দেয়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Weak and developed', 'দুর্বল আর বিকশিত'),
      items: [
        { en: '✗ "A wide range of subjects is good. It is useful. Students like it."', note: l('repeats, never explains', 'পুনরাবৃত্তি, ব্যাখ্যা নেই') },
        { en: '✓ "Studying a range of subjects helps students think flexibly."', note: l('topic sentence', 'topic sentence') },
        { en: '✓ "This is because different subjects train different ways of solving problems."', note: l('explanation', 'ব্যাখ্যা') },
        { en: '✓ "For example, an engineering student who takes a philosophy course may learn to question assumptions."', note: l('example', 'উদাহরণ') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'writing', example: 'Task 2 body paragraphs: idea → explanation → example', note: l('Developed ideas.', 'বিকশিত idea।') },
        { skill: 'speaking', example: 'Part 3: answer, give a reason, add an example.', note: l('The same shape, spoken.', 'একই গঠন, মুখে।') },
        { skill: 'reading', example: 'Matching Headings: each paragraph has one main idea.', note: l('Main idea vs example.', 'মূল idea বনাম উদাহরণ।') },
        { skill: 'listening', example: 'Lectures: a main point, then "for example…"', note: l('Hear the structure.', 'গঠনটা শুনুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Three ideas in one paragraph', right: 'One main idea, developed', why: l('Depth, not a list.', 'গভীরতা, তালিকা নয়।') },
        { wrong: 'An idea with no explanation or example', right: 'Idea → explanation → example', why: l('Support every idea.', 'প্রতিটা idea-র সমর্থন দিন।') },
        { wrong: 'A new argument in the conclusion', right: 'Sum up your position', why: l('No new ideas at the end.', 'শেষে নতুন idea নয়।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('wr-5-p1', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('Best topic sentence for a paragraph about the value of a wide range of subjects?', 'বিভিন্ন বিষয়ের মূল্য নিয়ে paragraph-এর সবচেয়ে ভালো topic sentence?'), options: ['Studying a range of subjects helps students think more flexibly.', 'For example, my cousin studied history.', 'Universities are big.'], answer: 'Studying a range of subjects helps students think more flexibly.', explanation: l('One clear main idea.', 'একটা পরিষ্কার মূল idea।'), why: { 'For example, my cousin studied history.': l('That is an example, not the main idea.', 'ওটা উদাহরণ, মূল idea নয়।'), 'Universities are big.': l('Not linked to the question.', 'প্রশ্নের সাথে যুক্ত নয়।') } }),
        choice('wr-5-p2', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('Which sentence explains the idea "Studying a range of subjects helps students think flexibly"?', '"Studying a range of subjects helps students think flexibly" idea-টা কোন sentence ব্যাখ্যা করে?'), options: ['This is because different subjects train different ways of solving problems.', 'Universities have many buildings.', 'In conclusion, I agree.'], answer: 'This is because different subjects train different ways of solving problems.', explanation: l('It says why.', 'এটা কেন তা বলে।'), why: { 'Universities have many buildings.': l('Not related to the idea.', 'Idea-র সাথে সম্পর্কহীন।'), 'In conclusion, I agree.': l('A conclusion, not an explanation.', 'Conclusion, ব্যাখ্যা নয়।') } }),
        choice('wr-5-p3', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('Which is a relevant example for that idea?', 'ওই idea-র জন্য কোনটা প্রাসঙ্গিক উদাহরণ?'), options: ['For instance, an engineering student who takes a philosophy course may learn to question assumptions.', 'For instance, the weather in Dhaka is hot.', 'For instance, universities are important.'], answer: 'For instance, an engineering student who takes a philosophy course may learn to question assumptions.', explanation: l('A specific case of flexible thinking.', 'নমনীয় চিন্তার নির্দিষ্ট উদাহরণ।'), why: { 'For instance, the weather in Dhaka is hot.': l('Not related to the idea.', 'Idea-র সাথে সম্পর্কহীন।'), 'For instance, universities are important.': l('A general claim, not an example.', 'সাধারণ দাবি, উদাহরণ নয়।') } }),
        choice('wr-5-p4', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('What should a conclusion do?', 'Conclusion কী করবে?'), options: ['Sum up your position', 'Add a new main argument', 'Copy the question word for word'], answer: 'Sum up your position', explanation: l('No new ideas at the end.', 'শেষে নতুন idea নয়।'), why: { 'Add a new main argument': l('New arguments belong in the body.', 'নতুন যুক্তি body-তে থাকে।'), 'Copy the question word for word': l('Use your own words.', 'নিজের word ব্যবহার করুন।') } }),
        choice('wr-5-p5', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('A paragraph has four different ideas in four sentences. Best fix?', 'একটা paragraph-এ চারটা sentence-এ চারটা আলাদা idea। সবচেয়ে ভালো সমাধান?'), options: ['Keep one idea and develop it with an explanation and an example', 'Add a fifth idea', 'Replace the words with rarer ones'], answer: 'Keep one idea and develop it with an explanation and an example', explanation: l('Depth, not a list.', 'গভীরতা, তালিকা নয়।'), why: { 'Add a fifth idea': l('That makes the list longer, not better.', 'এতে তালিকা লম্বা হয়, ভালো হয় না।'), 'Replace the words with rarer ones': l('Word choice does not fix missing development.', 'Word বদলালে বিকাশের অভাব মেটে না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('wr-5-r1', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'A body paragraph: topic sentence → explanation → ___.', accepted: ['example', 'an example'], explanation: l('example.', 'example।') }),
        gap('wr-5-r2', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'The ___ sums up your position without new ideas.', accepted: ['conclusion'], explanation: l('conclusion.', 'conclusion।') }),
        spot('wr-5-r3', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('One word makes this rule wrong. Tap it and fix it.', 'একটা word এই নিয়মকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Each body paragraph should develop three main ideas.', wrong: 'three', accepted: ['one'], explanation: l('One main idea.', 'একটা মূল idea।') }),
        correct('wr-5-r4', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'The conclusion is the best place for a new argument.', accepted: ['The conclusion is not the place for a new argument.', 'The conclusion is no place for a new argument.', 'The body paragraphs are the best place for a new argument.'], explanation: l('Sum up; no new arguments.', 'সংক্ষেপ; নতুন যুক্তি নয়।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('wr-5-c1', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('Which order builds a strong body paragraph?', 'কোন ক্রমে শক্তিশালী body paragraph হয়?'), options: ['Topic sentence → explanation → example', 'Example → conclusion → topic sentence', 'Three topic sentences'], answer: 'Topic sentence → explanation → example', explanation: l('Idea, why, for example.', 'Idea, কেন, উদাহরণ।') }),
        spot('wr-5-c2', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('One word makes this advice wrong. Tap it, then fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Support each idea with an explanation and a random example.', wrong: 'random', accepted: ['relevant'], fixOptions: ['relevant', 'rare', 'long'], explanation: l('A relevant example.', 'প্রাসঙ্গিক উদাহরণ।') }),
        order('wr-5-c3', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Develop one main idea in each paragraph.', explanation: l('One idea, developed.', 'একটা idea, বিকশিত।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: one developed paragraph', 'এবার আপনার পালা: একটা বিকশিত paragraph'),
      exercises: [
        write('wr-5-y1', 'wr-paragraph', {
          ...P,
          prompt: l(`Question: "${UNI_Q}" Write one body paragraph (4–5 sentences) with a topic sentence, an explanation and an example.`, `প্রশ্ন: "${UNI_Q}" Topic sentence, ব্যাখ্যা আর উদাহরণ সহ একটা body paragraph (৪–৫ sentence) লিখুন।`),
          model: 'On the one hand, teaching job-related subjects helps graduates find work quickly. Many families spend a lot on university fees, so they expect their children to earn soon after graduating. For example, a student who studies accounting can apply for jobs in banks and companies as soon as the course ends. Therefore, it is understandable that some people want universities to focus on practical subjects.',
          checklist: [l('one main idea in a topic sentence', 'Topic sentence-এ একটা মূল idea'), l('an explanation (why / how)', 'একটা ব্যাখ্যা (কেন / কীভাবে)'), l('a relevant example', 'একটা প্রাসঙ্গিক উদাহরণ')],
          explanation: l('One idea, fully developed.', 'একটা idea, পুরোপুরি বিকশিত।'),
          task: `The student writes one Task 2 body paragraph for this question: "${UNI_Q}". Judge the paragraph first: one main idea in a clear topic sentence that answers the question; an explanation (why / how); a relevant example; no unrelated extra ideas; on-topic. Then correct grammar and word choice only where it blocks the meaning.`,
          target: l('Task 2 paragraphs', 'Task 2 paragraph'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('One main idea per body paragraph, in a topic sentence.', 'প্রতিটা body paragraph-এ একটা মূল idea, topic sentence-এ।'),
        l('Explain it, then give a relevant example.', 'ব্যাখ্যা করুন, তারপর প্রাসঙ্গিক উদাহরণ দিন।'),
        l('Conclusion: sum up, no new arguments.', 'Conclusion: সংক্ষেপ, নতুন যুক্তি নয়।'),
      ],
    },
  ],
};

// ======================================================================= wr-6
export const wrCohesion: Lesson = {
  id: 'wr-6',
  format: 'v2',
  concept: 'wr-cohesion',
  title: l('Coherence, cohesion and word choice', 'Coherence, cohesion আর word বাছাই'),
  why: l('Cohesion is more than linking words, and Lexical Resource rewards precise, natural words rather than rare ones. Overused "Moreover" and forced "advanced" words can lower both scores.', 'Cohesion মানে শুধু linking word নয়, আর Lexical Resource বিরল word নয়, নির্ভুল আর স্বাভাবিক word-কে পুরস্কৃত করে। অতিরিক্ত "Moreover" আর জোর করে বসানো "advanced" word দুটো score-ই কমাতে পারে।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('Trying too hard', 'অতিরিক্ত চেষ্টা'),
      situation: l('Paragraph: "Moreover, students utilise a plethora of apps. Furthermore, students utilise apps for studying. Moreover, students utilise apps at night. In addition, apps are utilised by students."', 'Paragraph: "Moreover, students utilise a plethora of apps. Furthermore, students utilise apps for studying. Moreover, students utilise apps at night. In addition, apps are utilised by students."'),
      question: l('What is wrong?', 'কী ভুল?'),
      options: ['Linkers are overused, "students" and "utilise" are repeated, and the rare words are forced', 'It needs more linking words', 'The sentences are too short'],
      answer: 'Linkers are overused, "students" and "utilise" are repeated, and the rare words are forced',
      diagnose: {
        'Linkers are overused, "students" and "utilise" are repeated, and the rare words are forced': l('Right. Use a linker only where the logic needs one, refer back with "they" or "this", and choose simple, precise words ("use many apps").', 'ঠিক। Logic-এ দরকার হলেই linker দিন, "they" বা "this" দিয়ে আগের কথায় ফিরুন, আর সহজ, নির্ভুল word বাছুন ("use many apps")।'),
        'It needs more linking words': l('It already has a linker in every sentence — that is the problem.', 'প্রতিটা sentence-এ ইতিমধ্যে linker আছে — সমস্যা সেটাই।'),
        'The sentences are too short': l('Length is not the issue; the repetition and forced words are.', 'দৈর্ঘ্য সমস্যা নয়; পুনরাবৃত্তি আর জোর করা word সমস্যা।'),
      },
    },
    {
      kind: 'discover',
      title: l('What makes writing flow', 'লেখা কীভাবে সাবলীল হয়'),
      items: [
        { en: 'Referencing: "this problem", "these students", "such courses", "they"', note: l('point back instead of repeating', 'পুনরাবৃত্তি না করে আগের কথায় ফেরা') },
        { en: 'A few clear linkers where the logic changes: however, for example, therefore', note: l('not in every sentence', 'প্রতিটা sentence-এ নয়') },
        { en: 'Logical order: idea → reason → example → result', note: l('coherence', 'coherence') },
        { en: 'Precise, natural words: "a sharp rise", "play an important role"', note: l('collocations, not rare words', 'collocation, বিরল word নয়') },
      ],
      question: l('Cohesion is…', 'Cohesion হলো…'),
      options: [
        l('linkers plus referencing and logical order', 'linker, সাথে referencing আর যৌক্তিক ক্রম'),
        l('only linking words — the more the better', 'শুধু linking word — যত বেশি তত ভালো'),
        l('using rare vocabulary', 'বিরল vocabulary ব্যবহার'),
      ],
      answer: 0,
      pattern: l('Order ideas logically, refer back with this / these / such / they, use linkers only where the logic changes, and choose precise, natural words.', 'Idea যৌক্তিক ক্রমে সাজান, this / these / such / they দিয়ে আগের কথায় ফিরুন, logic বদলালেই শুধু linker দিন, আর নির্ভুল, স্বাভাবিক word বাছুন।'),
    },
    {
      kind: 'concept',
      title: l('Flow and word choice', 'সাবলীলতা আর word বাছাই'),
      body: l(
        'Coherence & Cohesion and Lexical Resource are two of the four criteria. Both reward clear, natural writing more than decoration.',
        'Coherence & Cohesion আর Lexical Resource চারটা criteria-র দুটো। দুটোই সাজসজ্জার চেয়ে পরিষ্কার, স্বাভাবিক লেখাকে বেশি পুরস্কৃত করে।',
      ),
      points: [
        l('Coherence: ideas in a logical order; each paragraph has a clear purpose.', 'Coherence: idea যৌক্তিক ক্রমে; প্রতিটা paragraph-এর পরিষ্কার উদ্দেশ্য।'),
        l('Cohesion: linkers where they fit, plus referencing (this, these, such, it, they) to avoid repeating nouns.', 'Cohesion: মানানসই জায়গায় linker, আর noun-এর পুনরাবৃত্তি এড়াতে referencing (this, these, such, it, they)।'),
        l('Overusing "Moreover / Furthermore" at the start of every sentence can hurt the score.', 'প্রতিটা sentence-এর শুরুতে "Moreover / Furthermore" অতিরিক্ত ব্যবহার score কমাতে পারে।'),
        l('Lexical Resource rewards precise, natural word choice and collocation, not rare words. Forced "advanced" vocabulary with errors lowers the score.', 'Lexical Resource নির্ভুল, স্বাভাবিক word আর collocation-কে পুরস্কৃত করে, বিরল word নয়। ভুলসহ জোর করা "advanced" vocabulary score কমায়।'),
        l('Common mix-up: "more linking words and rarer words = a higher band". Clear logic and natural words matter more.', 'সাধারণ ভুল: "বেশি linking word আর বিরল word = বেশি band"। পরিষ্কার logic আর স্বাভাবিক word বেশি গুরুত্বপূর্ণ।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Before and after', 'আগে আর পরে'),
      items: [
        { en: '✗ "Students need jobs. Students need jobs because…" → ✓ "Students need jobs. This is because…"', note: l('referencing', 'referencing') },
        { en: '✗ "Moreover, … Furthermore, … Moreover, …" → ✓ a linker only where the logic changes', note: l('fewer linkers', 'কম linker') },
        { en: '✗ "make an important role" → ✓ "play an important role"', note: l('collocation', 'collocation') },
        { en: '✗ "utilise a plethora of methods" → ✓ "use many methods"', note: l('natural, not forced', 'স্বাভাবিক, জোর করা নয়') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'writing', example: 'Coherence & Cohesion + Lexical Resource: half of the four criteria', note: l('Flow and words.', 'সাবলীলতা আর word।') },
        { skill: 'speaking', example: 'Speaking also rewards natural phrasing over written-style words.', note: l('Natural, not forced.', 'স্বাভাবিক, জোর করা নয়।') },
        { skill: 'reading', example: '"this", "such" and "these" in passages point back to earlier ideas.', note: l('Follow the reference.', 'Reference অনুসরণ করুন।') },
        { skill: 'listening', example: 'Signposts help listeners follow a talk, as cohesion helps readers.', note: l('Easy to follow.', 'সহজে অনুসরণযোগ্য।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: '"Moreover" at the start of every sentence', right: 'A linker only where the logic changes', why: l('Mechanical linking hurts.', 'যান্ত্রিক linking ক্ষতি করে।') },
        { wrong: 'Repeating the same noun in every sentence', right: 'Refer back with this / these / they', why: l('Referencing is cohesion too.', 'Referencing-ও cohesion।') },
        { wrong: '"utilise a plethora of" used to sound advanced', right: '"use many"', why: l('Precise and natural beats rare.', 'বিরলের চেয়ে নির্ভুল আর স্বাভাবিক ভালো।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('wr-6-p1', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Which word refers back and avoids repetition?', 'কোন word আগের কথায় ফেরে আর পুনরাবৃত্তি এড়ায়?'), sentence: 'Many students work part-time. ___ helps them pay their fees.', options: ['This', 'Moreover', 'Students work part-time'], answer: 'This', explanation: l('"This" = working part-time.', '"This" = part-time কাজ।'), why: { Moreover: l('"Moreover" adds a point; the sentence needs a subject.', '"Moreover" নতুন কথা যোগ করে; sentence-এ subject দরকার।'), 'Students work part-time': l('That repeats the whole idea.', 'এতে পুরো idea-র পুনরাবৃত্তি হয়।') } }),
        choice('wr-6-p2', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Which is the natural collocation?', 'কোনটা স্বাভাবিক collocation?'), options: ['play an important role', 'make an important role', 'do an important role'], answer: 'play an important role', explanation: l('play a role.', 'play a role।'), why: { 'make an important role': l('"make" does not go with "role".', '"make" "role"-এর সাথে যায় না।'), 'do an important role': l('"do" does not go with "role".', '"do" "role"-এর সাথে যায় না।') } }),
        choice('wr-6-p3', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Best word choice for a formal essay?', 'Formal essay-র জন্য সবচেয়ে ভালো word?'), options: ['a large number of students', 'a plethora of students', 'loads of students'], answer: 'a large number of students', explanation: l('Precise, natural, formal.', 'নির্ভুল, স্বাভাবিক, formal।'), why: { 'a plethora of students': l('Forced here — it sounds unnatural.', 'এখানে জোর করা — অস্বাভাবিক শোনায়।'), 'loads of students': l('Too informal for an essay.', 'Essay-র জন্য বেশি informal।') } }),
        choice('wr-6-p4', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Every sentence in a paragraph starts with "Moreover". The effect?', 'একটা paragraph-এর প্রতিটা sentence "Moreover" দিয়ে শুরু। প্রভাব?'), options: ['It sounds mechanical and can hurt Coherence & Cohesion', 'It always raises the score', 'It has no effect'], answer: 'It sounds mechanical and can hurt Coherence & Cohesion', explanation: l('Linkers only where needed.', 'দরকার হলেই linker।'), why: { 'It always raises the score': l('Overused linkers can lower it.', 'অতিরিক্ত linker score কমাতে পারে।'), 'It has no effect': l('Examiners notice mechanical linking.', 'যান্ত্রিক linking examiner-এর চোখে পড়ে।') } }),
        choice('wr-6-p5', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Which linker fits?', 'কোন linker মানায়?'), sentence: 'Online courses are cheap. ___, some students find it hard to stay motivated.', options: ['However', 'Moreover', 'For example'], answer: 'However', explanation: l('A contrast.', 'বৈপরীত্য।'), why: { Moreover: l('"Moreover" adds a similar point, but this is a contrast.', '"Moreover" একই রকম কথা যোগ করে, কিন্তু এটা বৈপরীত্য।'), 'For example': l('The second sentence is not an example of cheapness.', 'দ্বিতীয় sentence সস্তার উদাহরণ নয়।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('wr-6-r1', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'Cohesion is more than linking words: it also includes ___ with this, these and such.', accepted: ['referencing', 'reference'], explanation: l('referencing.', 'referencing।') }),
        gap('wr-6-r2', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Complete the collocation.', 'Collocation-টা পূরণ করুন।'), sentence: 'Teachers play an important ___ in children’s lives.', accepted: ['role', 'part'], explanation: l('play a role / part.', 'play a role / part।') }),
        spot('wr-6-r3', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('One word makes this rule wrong. Tap it and fix it.', 'একটা word এই নিয়মকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Lexical Resource rewards rare words.', wrong: 'rare', accepted: ['precise', 'natural'], explanation: l('Precise, natural words.', 'নির্ভুল, স্বাভাবিক word।') }),
        correct('wr-6-r4', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Correct the linking. The second idea is a contrast.', 'Linking ঠিক করুন। দ্বিতীয় idea বৈপরীত্য।'), sentence: 'Moreover, prices rose. Moreover, wages fell.', accepted: ['Prices rose. However, wages fell.', 'Prices rose, but wages fell.', 'Prices rose, while wages fell.', 'Prices rose, whereas wages fell.', 'Prices rose. Meanwhile, wages fell.'], explanation: l('A contrast linker, used once.', 'বৈপরীত্যের linker, একবার।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('wr-6-c1', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Best choice?', 'সবচেয়ে ভালো বাছাই?'), sentence: 'Many people drive to work. ___ causes long traffic jams.', options: ['This', 'These', 'Moreover'], answer: 'This', explanation: l('"This" = driving to work (one idea).', '"This" = গাড়িতে কাজে যাওয়া (একটা idea)।') }),
        spot('wr-6-c2', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('One word is not the natural partner. Tap it, then fix it.', 'একটা word স্বাভাবিক সঙ্গী নয়। Tap করে ঠিক করুন।'), sentence: 'Students should do a real effort to read widely.', wrong: 'do', accepted: ['make'], fixOptions: ['make', 'take', 'give'], explanation: l('make an effort.', 'make an effort।') }),
        order('wr-6-c3', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Choose precise and natural words, not rare ones.', explanation: l('Lexical Resource.', 'Lexical Resource।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: make it flow', 'এবার আপনার পালা: লেখাটা সাবলীল করুন'),
      exercises: [
        write('wr-6-y1', 'wr-cohesion', {
          ...P,
          prompt: l('Rewrite this so it flows: "Many students work part-time. Moreover, students work part-time to pay fees. Moreover, students working part-time have less time to study. Moreover, students get tired."', 'এটা সাবলীল করে আবার লিখুন: "Many students work part-time. Moreover, students work part-time to pay fees. Moreover, students working part-time have less time to study. Moreover, students get tired."'),
          model: 'Many students work part-time to pay their fees. However, this leaves them less time to study, and they often feel tired in class.',
          checklist: [l('referencing (this, they) instead of repeating "students"', '"students" বারবার না লিখে referencing (this, they)'), l('linkers only where the logic changes', 'logic বদলালেই শুধু linker'), l('natural, precise words', 'স্বাভাবিক, নির্ভুল word')],
          explanation: l('Clear logic, fewer linkers.', 'পরিষ্কার logic, কম linker।'),
          task: 'The student rewrites a repetitive paragraph about students working part-time so that it flows. Judge cohesion and word choice first: repeated nouns replaced by referencing (this, they, their); linkers used only where the logic changes and matching it (e.g. "However" for a contrast, not "Moreover" everywhere); ideas in a logical order; natural, precise words (no forced rare vocabulary); the meaning of the original is kept. Then correct grammar only where it blocks the meaning.',
          target: l('Coherence, cohesion and word choice', 'Coherence, cohesion আর word বাছাই'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Cohesion = logical order + referencing + a few fitting linkers.', 'Cohesion = যৌক্তিক ক্রম + referencing + কয়েকটা মানানসই linker।'),
        l('Not "Moreover" in every sentence.', 'প্রতিটা sentence-এ "Moreover" নয়।'),
        l('Precise, natural words and collocations beat rare words.', 'বিরল word-এর চেয়ে নির্ভুল, স্বাভাবিক word আর collocation ভালো।'),
      ],
    },
  ],
};

import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * What is IELTS? (Foundation LEVEL 2, module 1), six lessons in the v2
 * (problem-first) format. Every fact matches the checked IELTS facts Mino
 * already uses (lib/ai/server/mino/knowledge/ielts.ts). Fees, dates, result
 * times and institution requirements change and differ by test centre, so the
 * lessons always send students to the official source for those.
 * ib-1 Academic or General Training · ib-2 the four skills and timing ·
 * ib-3 computer-delivered and paper-based · ib-4 the band scale and the overall
 * score · ib-5 how each skill is marked · ib-6 planning: targets and official
 * requirements. Original Mino content.
 */

export const IELTS_INTRO_CONCEPTS: Concept[] = [
  { id: 'ib-versions', title: l('IELTS Academic and General Training', 'IELTS Academic আর General Training'), lessonId: 'ib-1', tag: 'ielts-basics' },
  { id: 'ib-format', title: l('The four skills and test timing', 'চার skill আর test-এর সময়'), lessonId: 'ib-2', tag: 'ielts-basics' },
  { id: 'ib-delivery', title: l('Computer-delivered and paper-based', 'Computer-delivered আর paper-based'), lessonId: 'ib-3', tag: 'ielts-basics' },
  { id: 'ib-bands', title: l('Band Scores and the overall score', 'Band Score আর overall score'), lessonId: 'ib-4', tag: 'ielts-basics' },
  { id: 'ib-marking', title: l('How each skill is marked', 'প্রতিটা skill কীভাবে নম্বর পায়'), lessonId: 'ib-5', tag: 'ielts-basics' },
  { id: 'ib-plan', title: l('Targets and official requirements', 'Target আর official requirement'), lessonId: 'ib-6', tag: 'ielts-basics' },
];

const P = { tag: 'ielts-basics' as const };

// ======================================================================= ib-1
export const ibVersions: Lesson = {
  id: 'ib-1',
  format: 'v2',
  concept: 'ib-versions',
  title: l('IELTS Academic and General Training', 'IELTS Academic আর General Training'),
  why: l('There are two versions of IELTS. Booking the wrong one can mean taking the test again, so the first step is knowing which one your university, employer or visa asks for.', 'IELTS-এর দুটো version। ভুলটা book করলে আবার test দিতে হতে পারে, তাই প্রথম কাজ হলো জানা আপনার university, employer বা visa কোনটা চায়।'),
  minutes: 8,
  difficulty: 'easy',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('Booking the test', 'Test book করা'),
      situation: l('Nadia wants to study for a master’s degree in Australia. Her cousin says: "Just take General Training — it’s the same test."', 'Nadia Australia-য় master’s পড়তে চান। তাঁর cousin বললেন: "General Training দিয়ে দিন — একই test।"'),
      question: l('What should Nadia do?', 'Nadia-র কী করা উচিত?'),
      options: ['Check what the university asks for — usually Academic for university study', 'Take General Training, as her cousin says', 'Take either — universities accept both'],
      answer: 'Check what the university asks for — usually Academic for university study',
      diagnose: {
        'Check what the university asks for — usually Academic for university study': l('Right. University study usually needs IELTS Academic, but the official requirement of the university decides. The versions differ in Reading and Writing.', 'ঠিক। University-তে পড়তে সাধারণত IELTS Academic লাগে, কিন্তু সিদ্ধান্ত university-র official requirement-এর। দুই version-এর Reading আর Writing আলাদা।'),
        'Take General Training, as her cousin says': l('The two versions are not the same: Reading and Writing differ. Always follow the official requirement, not advice from friends.', 'দুটো version এক না: Reading আর Writing আলাদা। বন্ধুর পরামর্শ না, সবসময় official requirement মানুন।'),
        'Take either — universities accept both': l('Many universities accept only Academic for degree study. Check the university’s own website.', 'অনেক university degree-র জন্য শুধু Academic নেয়। University-র নিজের website দেখুন।'),
      },
    },
    {
      kind: 'discover',
      title: l('What is shared, what is different', 'কী একই, কী আলাদা'),
      items: [
        { en: 'Listening and Speaking: the same in both versions', note: l('same test, same marking', 'একই test, একই নম্বর দেওয়া') },
        { en: 'Reading and Writing: different in Academic and General Training', note: l('Academic uses long academic passages and a data or diagram task', 'Academic-এ লম্বা academic passage আর data বা diagram-এর task') },
        { en: 'Academic: usually for university study', note: l('check the course requirement', 'course-এর requirement দেখুন') },
        { en: 'General Training: often for work, training or migration', note: l('check the visa or employer requirement', 'visa বা employer-এর requirement দেখুন') },
      ],
      question: l('Which parts differ between the two versions?', 'দুই version-এ কোন অংশ আলাদা?'),
      options: [
        l('Reading and Writing', 'Reading আর Writing'),
        l('Listening and Speaking', 'Listening আর Speaking'),
        l('All four skills', 'চারটা skill-ই'),
      ],
      answer: 0,
      pattern: l('Same Listening and Speaking; different Reading and Writing. The organisation you apply to decides which version you need.', 'Listening আর Speaking একই; Reading আর Writing আলাদা। আপনি যেখানে apply করবেন তারাই ঠিক করে কোন version লাগবে।'),
    },
    {
      kind: 'concept',
      title: l('Choosing your version', 'আপনার version বাছাই'),
      body: l(
        'IELTS has two versions that share half of the test. Your purpose — and the official requirement of the organisation — decides which one you take.',
        'IELTS-এর দুটো version, যাদের অর্ধেক test একই। আপনার উদ্দেশ্য — আর প্রতিষ্ঠানের official requirement — ঠিক করে কোনটা দেবেন।',
      ),
      points: [
        l('Four skills in both: Listening, Reading, Writing, Speaking. Listening and Speaking are the same; Reading and Writing differ.', 'দুটোতেই চার skill: Listening, Reading, Writing, Speaking। Listening আর Speaking একই; Reading আর Writing আলাদা।'),
        l('IELTS Academic: usually for undergraduate or postgraduate study. Reading has long academic passages; Writing Task 1 describes visual information such as a graph, table or diagram.', 'IELTS Academic: সাধারণত undergraduate বা postgraduate পড়ার জন্য। Reading-এ লম্বা academic passage; Writing Task 1-এ graph, table বা diagram-এর মতো visual তথ্য বর্ণনা।'),
        l('IELTS General Training: often for work, training or migration. Reading uses everyday and workplace texts; Writing Task 1 is a letter.', 'IELTS General Training: প্রায়ই কাজ, training বা migration-এর জন্য। Reading-এ দৈনন্দিন আর কর্মক্ষেত্রের text; Writing Task 1 একটা letter।'),
        l('The organisation decides. Always read the official requirement of your university, employer or visa authority before booking — some visas also ask for a specific kind of test.', 'প্রতিষ্ঠানই ঠিক করে। Book করার আগে সবসময় আপনার university, employer বা visa কর্তৃপক্ষের official requirement পড়ুন — কিছু visa নির্দিষ্ট ধরনের test চায়।'),
        l('Common mix-up: students take advice from friends or agents ("GT is easier", "any IELTS is fine") instead of the official page. The official requirement is the only reliable answer.', 'সাধারণ ভুল: শিক্ষার্থীরা official page না দেখে বন্ধু বা agent-এর কথা শোনেন ("GT সহজ", "যেকোনো IELTS চলবে")। Official requirement-ই একমাত্র নির্ভরযোগ্য উত্তর।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Who takes which?', 'কে কোনটা দেন?'),
      items: [
        { en: 'A BSc graduate applying for an MSc in the UK → usually Academic', note: l('university study', 'university-তে পড়া') },
        { en: 'A nurse applying for work registration abroad → check the regulator: often Academic', note: l('professional bodies set their own rules', 'পেশাজীবী সংস্থা নিজেদের নিয়ম ঠিক করে') },
        { en: 'A family applying for migration → often General Training, per the visa rules', note: l('check the visa authority', 'visa কর্তৃপক্ষ দেখুন') },
        { en: 'A student going to a vocational course → check the course: it may accept General Training', note: l('course-specific', 'course অনুযায়ী') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this matters in IELTS', 'IELTS-এ কোথায় কাজে লাগে'),
      uses: [
        { skill: 'reading', example: 'Academic Reading: three long passages from books, journals and magazines.', note: l('Different texts in each version — practise the right one.', 'দুই version-এ text আলাদা — ঠিকটার practice করুন।') },
        { skill: 'writing', example: 'Academic Task 1: "The graph shows …" · General Training Task 1: "Dear Sir or Madam, …"', note: l('Task 1 is a report or a letter depending on the version.', 'Version অনুযায়ী Task 1 একটা report বা letter।') },
        { skill: 'listening', example: 'The same four Listening parts in both versions.', note: l('Listening practice works for everyone.', 'Listening practice সবার কাজে লাগে।') },
        { skill: 'speaking', example: 'The same three Speaking parts in both versions.', note: l('Speaking practice works for everyone.', 'Speaking practice সবার কাজে লাগে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: '"Academic and General Training are the same test."', right: 'Listening and Speaking are the same; Reading and Writing differ.', why: l('Half the test is different.', 'Test-এর অর্ধেক আলাদা।') },
        { wrong: '"My friend took GT for his visa, so I will take GT for university."', right: 'Check your own university’s requirement — usually Academic.', why: l('Your purpose decides, not your friend’s.', 'আপনার উদ্দেশ্য ঠিক করে, বন্ধুর না।') },
        { wrong: '"General Training Writing Task 1 is a graph."', right: 'General Training Task 1 is a letter; Academic Task 1 is a graph, table or diagram.', why: l('Task 1 differs by version.', 'Version অনুযায়ী Task 1 আলাদা।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ib-1-p1', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('Which skills are the same in both versions?', 'কোন skill দুই version-এ একই?'), options: ['Listening and Speaking', 'Reading and Writing', 'Writing and Speaking'], answer: 'Listening and Speaking', explanation: l('Listening and Speaking are shared.', 'Listening আর Speaking একই।'), why: { 'Reading and Writing': l('These are the two that differ.', 'এই দুটোই আলাদা।'), 'Writing and Speaking': l('Writing differs; only Speaking is shared here.', 'Writing আলাদা; এখানে শুধু Speaking একই।') } }),
        choice('ib-1-p2', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('Which version do most universities ask for?', 'বেশিরভাগ university কোন version চায়?'), options: ['Academic', 'General Training', 'Either, always'], answer: 'Academic', explanation: l('Degree study usually needs Academic — but check the official requirement.', 'Degree-র জন্য সাধারণত Academic — তবে official requirement দেখুন।'), why: { 'General Training': l('General Training is usually for work, training or migration.', 'General Training সাধারণত কাজ, training বা migration-এর জন্য।'), 'Either, always': l('Many universities accept only Academic for degrees.', 'অনেক university degree-র জন্য শুধু Academic নেয়।') } }),
        choice('ib-1-p3', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('What is General Training Writing Task 1?', 'General Training Writing Task 1 কী?'), options: ['A letter', 'A graph description', 'An essay'], answer: 'A letter', explanation: l('GT Task 1 = a letter.', 'GT Task 1 = letter।'), why: { 'A graph description': l('That is Academic Task 1.', 'এটা Academic Task 1।'), 'An essay': l('Task 2 is the essay in both versions.', 'দুই version-এই Task 2 হলো essay।') } }),
        choice('ib-1-p4', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('Who decides which version you need?', 'কোন version লাগবে কে ঠিক করে?'), options: ['The organisation you apply to', 'Your coaching centre', 'Whichever is cheaper'], answer: 'The organisation you apply to', explanation: l('Follow the official requirement.', 'Official requirement মানুন।'), why: { 'Your coaching centre': l('A coaching centre can advise, but only the organisation’s official requirement counts.', 'Coaching centre পরামর্শ দিতে পারে, কিন্তু গোনা হয় শুধু প্রতিষ্ঠানের official requirement।'), 'Whichever is cheaper': l('The wrong version may not be accepted at all.', 'ভুল version একদমই গ্রহণ না-ও হতে পারে।') } }),
        choice('ib-1-p5', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('Rafi will apply for a skilled-worker visa. What should he do first?', 'Rafi skilled-worker visa-র জন্য apply করবেন। প্রথমে কী করবেন?'), options: ['Read the visa authority’s official English-test requirement', 'Book Academic because it sounds harder', 'Ask a friend which version they took'], answer: 'Read the visa authority’s official English-test requirement', explanation: l('Visas can require a specific version or type of test.', 'Visa নির্দিষ্ট version বা ধরনের test চাইতে পারে।'), why: { 'Book Academic because it sounds harder': l('"Harder" is not the rule; the requirement is.', '"কঠিন" নিয়ম না; requirement-ই নিয়ম।'), 'Ask a friend which version they took': l('Their purpose may be different from yours.', 'তাঁদের উদ্দেশ্য আপনার থেকে আলাদা হতে পারে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ib-1-r1', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('Write the version (one word).', 'Version লিখুন (একটা word)।'), sentence: 'For a master’s degree, universities usually ask for IELTS ___.', accepted: ['Academic'], explanation: l('Academic.', 'Academic।') }),
        gap('ib-1-r2', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('Write the missing number (one word or digit).', 'বাদ পড়া সংখ্যা লিখুন (একটা word বা অঙ্ক)।'), sentence: 'IELTS tests ___ skills: Listening, Reading, Writing and Speaking.', accepted: ['four', '4'], explanation: l('Four skills.', 'চার skill।') }),
        correct('ib-1-r3', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('Correct the false statement.', 'ভুল বাক্যটা ঠিক করুন।'), sentence: 'Academic and General Training have different Listening tests.', accepted: ['Academic and General Training have the same Listening tests.', 'Academic and General Training have the same Listening test.', 'Academic and General Training have different Reading tests.', 'Academic and General Training have different Writing tests.'], explanation: l('Listening is the same; Reading and Writing differ.', 'Listening একই; Reading আর Writing আলাদা।') }),
        spot('ib-1-r4', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('One word makes this false. Tap it and fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'In General Training, Writing Task 1 is a graph.', wrong: 'graph', accepted: ['letter'], explanation: l('GT Task 1 is a letter.', 'GT Task 1 একটা letter।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ib-1-c1', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('Which is the most reliable source for your requirement?', 'আপনার requirement-এর সবচেয়ে নির্ভরযোগ্য source কোনটা?'), options: ['The university’s official admission page', 'A social media group', 'Last year’s notes from a friend'], answer: 'The university’s official admission page', explanation: l('Requirements change; use the official page.', 'Requirement বদলায়; official page দেখুন।') }),
        spot('ib-1-c2', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('One word makes this false. Tap it, then fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Both versions have the same Reading test.', wrong: 'Reading', accepted: ['Listening', 'Speaking'], fixOptions: ['Listening', 'Writing', 'Readings'], explanation: l('Listening and Speaking are shared.', 'Listening আর Speaking একই।') }),
        order('ib-1-c3', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Most universities ask for IELTS Academic.', explanation: l('Academic for university study.', 'University-র জন্য Academic।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your version', 'এবার আপনার পালা: আপনার version'),
      exercises: [
        write('ib-1-y1', 'ib-versions', {
          ...P,
          prompt: l('Write 3 sentences: why you are taking IELTS, which version you think you need, and where you will check the official requirement.', '৩টা sentence লিখুন: কেন IELTS দিচ্ছেন, কোন version লাগবে বলে মনে করেন, আর official requirement কোথায় দেখবেন।'),
          model: 'I am taking IELTS because I want to study for a master’s degree in Canada. I think I need IELTS Academic, because it is for university study. I will check the English requirement on the university’s official admission page.',
          checklist: [l('your purpose (study, work, migration)', 'আপনার উদ্দেশ্য (পড়া, কাজ, migration)'), l('the version and a reason', 'version আর একটা কারণ'), l('an official source to check', 'যাচাইয়ের জন্য একটা official source')],
          explanation: l('Purpose → version → official check.', 'উদ্দেশ্য → version → official যাচাই।'),
          task: 'The student explains in 3 sentences why they are taking IELTS, which version they need and where they will check. Judge the IELTS facts first, then grammar only where it blocks meaning. Facts: Academic is usually for university study; General Training is often for work, training or migration; the organisation’s official requirement decides; Listening and Speaking are the same in both versions and Reading and Writing differ; Academic Writing Task 1 describes visual information, General Training Task 1 is a letter. Correct any wrong fact gently, and praise checking an official source. Never state fees, dates or specific institution requirements.',
          target: l('Choosing the right version', 'ঠিক version বাছাই'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Two versions: Academic (usually university) and General Training (often work or migration).', 'দুটো version: Academic (সাধারণত university) আর General Training (প্রায়ই কাজ বা migration)।'),
        l('Listening and Speaking are the same; Reading and Writing differ.', 'Listening আর Speaking একই; Reading আর Writing আলাদা।'),
        l('The official requirement decides — check it before you book.', 'Official requirement ঠিক করে — book করার আগে দেখুন।'),
      ],
    },
  ],
};

// ======================================================================= ib-2
export const ibFormat: Lesson = {
  id: 'ib-2',
  format: 'v2',
  concept: 'ib-format',
  title: l('The four skills and test timing', 'চার skill আর test-এর সময়'),
  why: l('Knowing how long each part lasts and how many questions it has lets you practise at real exam speed — and removes surprises on the day.', 'প্রতিটা অংশ কতক্ষণ আর কয়টা প্রশ্ন জানলে আসল exam-এর গতিতে practice করা যায় — আর exam-এর দিন অবাক হতে হয় না।'),
  minutes: 9,
  difficulty: 'easy',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('Planning practice time', 'Practice-এর সময় ঠিক করা'),
      situation: l('Tanvir practises Reading for two hours without a break and says: "That’s how long the Reading test is."', 'Tanvir বিরতি ছাড়া দুই ঘণ্টা Reading practice করেন আর বলেন: "Reading test এত লম্বাই।"'),
      question: l('How long is IELTS Reading?', 'IELTS Reading কত সময়ের?'),
      options: ['60 minutes, 40 questions', '2 hours, 100 questions', '30 minutes, 20 questions'],
      answer: '60 minutes, 40 questions',
      diagnose: {
        '60 minutes, 40 questions': l('Right: 60 minutes for 40 questions, with no extra time to transfer answers. Practise at that speed.', 'ঠিক: ৪০টা প্রশ্নের জন্য ৬০ মিনিট, উত্তর তোলার আলাদা সময় নেই। এই গতিতে practice করুন।'),
        '2 hours, 100 questions': l('Reading is 60 minutes and 40 questions. Two-hour sessions do not train exam timing.', 'Reading ৬০ মিনিট আর ৪০টা প্রশ্ন। দুই ঘণ্টার session exam-এর সময় ধরে practice হয় না।'),
        '30 minutes, 20 questions': l('Listening is about 30 minutes; Reading is 60 minutes with 40 questions.', 'Listening প্রায় ৩০ মিনিট; Reading ৬০ মিনিট, ৪০টা প্রশ্ন।'),
      },
    },
    {
      kind: 'discover',
      title: l('The test at a glance', 'এক নজরে test'),
      items: [
        { en: 'Listening: 4 parts, 40 questions, about 30 minutes', note: l('you hear the recording once', 'recording একবারই শুনবেন') },
        { en: 'Reading: 3 sections, 40 questions, 60 minutes', note: l('no extra transfer time', 'উত্তর তোলার আলাদা সময় নেই') },
        { en: 'Writing: Task 1 (150+ words, about 20 min) + Task 2 (250+ words, about 40 min) = 60 minutes', note: l('Task 2 counts for more', 'Task 2-এর গুরুত্ব বেশি') },
        { en: 'Speaking: 11–14 minutes, 3 parts, face to face with an examiner', note: l('a real conversation', 'আসল কথোপকথন') },
      ],
      question: l('Which part is the shortest?', 'কোন অংশ সবচেয়ে ছোট?'),
      options: [
        l('Speaking (11–14 minutes)', 'Speaking (১১–১৪ মিনিট)'),
        l('Reading', 'Reading'),
        l('Writing', 'Writing'),
      ],
      answer: 0,
      pattern: l('Listening ≈ 30 min · Reading 60 min · Writing 60 min · Speaking 11–14 min. Listening and Reading have 40 questions each.', 'Listening ≈ ৩০ মিনিট · Reading ৬০ মিনিট · Writing ৬০ মিনিট · Speaking ১১–১৪ মিনিট। Listening আর Reading-এ ৪০টা করে প্রশ্ন।'),
    },
    {
      kind: 'concept',
      title: l('Parts, questions and time', 'অংশ, প্রশ্ন আর সময়'),
      body: l(
        'Each skill has a fixed structure. Your practice should copy it: the same number of questions in the same time.',
        'প্রতিটা skill-এর নির্দিষ্ট গঠন। আপনার practice-ও তেমন হওয়া উচিত: একই সময়ে একই সংখ্যক প্রশ্ন।',
      ),
      points: [
        l('Listening: 4 parts and 40 questions in about 30 minutes. Parts 1–2 are everyday situations; Parts 3–4 are academic. The recording is heard once.', 'Listening: প্রায় ৩০ মিনিটে ৪টা part আর ৪০টা প্রশ্ন। Part 1–2 দৈনন্দিন পরিস্থিতি; Part 3–4 academic। Recording একবারই শোনা যায়।'),
        l('Reading: 3 sections and 40 questions in 60 minutes — about 20 minutes per section, with no extra time to transfer answers.', 'Reading: ৬০ মিনিটে ৩টা section আর ৪০টা প্রশ্ন — প্রতি section-এ প্রায় ২০ মিনিট, উত্তর তোলার আলাদা সময় নেই।'),
        l('Writing: 60 minutes. Task 1 needs at least 150 words (about 20 minutes); Task 2 at least 250 words (about 40 minutes) and counts for more.', 'Writing: ৬০ মিনিট। Task 1-এ কমপক্ষে ১৫০ word (প্রায় ২০ মিনিট); Task 2-এ কমপক্ষে ২৫০ word (প্রায় ৪০ মিনিট), আর এর গুরুত্ব বেশি।'),
        l('Speaking: 11–14 minutes with an examiner. Part 1 familiar questions, Part 2 a cue card (1 minute to prepare, 1–2 minutes to speak), Part 3 a deeper discussion.', 'Speaking: examiner-এর সাথে ১১–১৪ মিনিট। Part 1 পরিচিত প্রশ্ন, Part 2 cue card (১ মিনিট প্রস্তুতি, ১–২ মিনিট বলা), Part 3 গভীর আলোচনা।'),
        l('Common mix-up: spending 30 minutes on Task 1 because it comes first. Task 2 is longer and counts for more — give it about 40 minutes.', 'সাধারণ ভুল: প্রথমে আসে বলে Task 1-এ ৩০ মিনিট খরচ। Task 2 লম্বা আর এর গুরুত্ব বেশি — এতে প্রায় ৪০ মিনিট দিন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('A timed practice plan', 'সময় ধরে practice-এর plan'),
      items: [
        { en: 'Reading: 3 sections × 20 minutes, one sitting', note: l('same as the real test', 'আসল test-এর মতো') },
        { en: 'Writing: Task 1 in 20 minutes, then Task 2 in 40 minutes', note: l('Task 2 gets more time', 'Task 2 বেশি সময় পায়') },
        { en: 'Listening: play each recording once — no pausing', note: l('the test plays it once', 'test-এ একবারই বাজে') },
        { en: 'Speaking: time Part 2 — 1 minute notes, then 2 minutes talking', note: l('practise the long turn', 'লম্বা বলার practice') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Skill by skill', 'Skill অনুযায়ী'),
      uses: [
        { skill: 'listening', example: '4 parts · 40 questions · about 30 minutes · heard once', note: l('Train with single plays.', 'একবার শুনে practice করুন।') },
        { skill: 'reading', example: '3 sections · 40 questions · 60 minutes', note: l('About 20 minutes per section.', 'প্রতি section-এ প্রায় ২০ মিনিট।') },
        { skill: 'writing', example: 'Task 1: 150+ words · Task 2: 250+ words · 60 minutes', note: l('Task 2 counts for more.', 'Task 2-এর গুরুত্ব বেশি।') },
        { skill: 'speaking', example: 'Part 1 · Part 2 (cue card) · Part 3 · 11–14 minutes', note: l('Face to face with an examiner.', 'Examiner-এর সাথে মুখোমুখি।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Writing Task 1: 250 words', right: 'Task 1: at least 150 words; Task 2: at least 250', why: l('The limits are 150 and 250.', 'সীমা ১৫০ আর ২৫০।') },
        { wrong: 'Pausing the recording during Listening practice', right: 'Play it once, like the test', why: l('The test plays it once.', 'Test-এ একবারই বাজে।') },
        { wrong: 'Reading gives 10 extra minutes to transfer answers', right: 'Reading has no extra transfer time', why: l('Write answers within the 60 minutes.', '৬০ মিনিটের মধ্যেই উত্তর লিখুন।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ib-2-p1', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('How many questions are in IELTS Listening?', 'IELTS Listening-এ কয়টা প্রশ্ন?'), options: ['40', '30', '50'], answer: '40', explanation: l('40 questions in 4 parts.', '৪টা part-এ ৪০টা প্রশ্ন।'), why: { '30': l('Listening lasts about 30 minutes, but has 40 questions.', 'Listening প্রায় ৩০ মিনিট, কিন্তু প্রশ্ন ৪০টা।'), '50': l('Both Listening and Reading have 40.', 'Listening আর Reading দুটোতেই ৪০টা।') } }),
        choice('ib-2-p2', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('What is the minimum for Writing Task 2?', 'Writing Task 2-এর সর্বনিম্ন কত?'), options: ['250 words', '150 words', '400 words'], answer: '250 words', explanation: l('Task 2: at least 250 words.', 'Task 2: কমপক্ষে ২৫০ word।'), why: { '150 words': l('150 is the Task 1 minimum.', '১৫০ হলো Task 1-এর সর্বনিম্ন।'), '400 words': l('There is no 400-word rule; 250 is the minimum.', '৪০০ word-এর নিয়ম নেই; সর্বনিম্ন ২৫০।') } }),
        choice('ib-2-p3', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('How many times do you hear each Listening recording?', 'প্রতিটা Listening recording কতবার শুনবেন?'), options: ['Once', 'Twice', 'As many times as you need'], answer: 'Once', explanation: l('Heard once.', 'একবার।'), why: { Twice: l('Each recording is played only once.', 'প্রতিটা recording একবারই বাজে।'), 'As many times as you need': l('You cannot replay it in the test.', 'Test-এ আবার বাজানো যায় না।') } }),
        choice('ib-2-p4', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('How should you divide the 60 Writing minutes?', '৬০ মিনিটের Writing কীভাবে ভাগ করবেন?'), options: ['About 20 for Task 1, 40 for Task 2', '30 and 30', '40 for Task 1, 20 for Task 2'], answer: 'About 20 for Task 1, 40 for Task 2', explanation: l('Task 2 is longer and counts for more.', 'Task 2 লম্বা আর এর গুরুত্ব বেশি।'), why: { '30 and 30': l('Task 2 needs more words and carries more weight.', 'Task 2-এ বেশি word লাগে আর গুরুত্ব বেশি।'), '40 for Task 1, 20 for Task 2': l('Reversed: Task 2 needs about 40 minutes.', 'উল্টো: Task 2-এ প্রায় ৪০ মিনিট লাগে।') } }),
        choice('ib-2-p5', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('What happens in Speaking Part 2?', 'Speaking Part 2-এ কী হয়?'), options: ['1 minute to prepare, then speak for 1–2 minutes on a cue card', 'A discussion of abstract questions', 'Short questions about your home and studies'], answer: '1 minute to prepare, then speak for 1–2 minutes on a cue card', explanation: l('Part 2 is the long turn.', 'Part 2 হলো লম্বা বলার অংশ।'), why: { 'A discussion of abstract questions': l('That is Part 3.', 'এটা Part 3।'), 'Short questions about your home and studies': l('That is Part 1.', 'এটা Part 1।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ib-2-r1', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('Write the number of minutes.', 'মিনিটের সংখ্যা লিখুন।'), sentence: 'The Reading test lasts ___ minutes.', accepted: ['60', 'sixty'], explanation: l('60 minutes.', '৬০ মিনিট।') }),
        gap('ib-2-r2', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('Write the minimum number of words.', 'সর্বনিম্ন word-এর সংখ্যা লিখুন।'), sentence: 'Writing Task 1 needs at least ___ words.', accepted: ['150'], explanation: l('150 words.', '১৫০ word।') }),
        spot('ib-2-r3', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('One number is wrong. Tap it and fix it.', 'একটা সংখ্যা ভুল। Tap করে ঠিক করুন।'), sentence: 'The Listening test has 3 parts.', wrong: '3', accepted: ['4', 'four'], explanation: l('4 parts.', '৪টা part।') }),
        correct('ib-2-r4', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('Correct the false statement.', 'ভুল বাক্যটা ঠিক করুন।'), sentence: 'Task 1 counts for more than Task 2.', accepted: ['Task 2 counts for more than Task 1.', 'Task 1 counts for less than Task 2.'], explanation: l('Task 2 counts for more.', 'Task 2-এর গুরুত্ব বেশি।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ib-2-c1', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('Which statement is true?', 'কোন বাক্যটা সত্য?'), options: ['Speaking is face to face with an examiner.', 'Speaking is recorded into a computer with no examiner.', 'Speaking lasts 30 minutes.'], answer: 'Speaking is face to face with an examiner.', explanation: l('Face to face, 11–14 minutes.', 'মুখোমুখি, ১১–১৪ মিনিট।') }),
        spot('ib-2-c2', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('One word makes this false. Tap it, then fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Reading gives extra time to transfer answers.', wrong: 'gives', accepted: ['gives no'], fixOptions: ['gives no', 'give', 'gave'], explanation: l('Reading has no extra transfer time.', 'Reading-এ উত্তর তোলার আলাদা সময় নেই।') }),
        order('ib-2-c3', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Listening and Reading each have 40 questions.', explanation: l('40 each.', 'প্রতিটায় ৪০টা।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a weekly practice plan', 'এবার আপনার পালা: সাপ্তাহিক practice plan'),
      exercises: [
        write('ib-2-y1', 'ib-format', {
          ...P,
          prompt: l('Write 3 sentences describing how you will practise one full Reading test and one Writing test at real exam timing.', 'একটা পূর্ণ Reading test আর একটা Writing test আসল exam-এর সময়ে কীভাবে practice করবেন — ৩টা sentence-এ লিখুন।'),
          model: 'On Saturday I will do a full Reading test in 60 minutes, spending about 20 minutes on each section. On Sunday I will write Task 1 in 20 minutes and Task 2 in 40 minutes. I will check that Task 1 has at least 150 words and Task 2 at least 250.',
          checklist: [l('Reading: 60 minutes, 3 sections, 40 questions', 'Reading: ৬০ মিনিট, ৩ section, ৪০ প্রশ্ন'), l('Writing: 20 + 40 minutes; 150 and 250 words', 'Writing: ২০ + ৪০ মিনিট; ১৫০ আর ২৫০ word'), l('practise at exam speed', 'exam-এর গতিতে practice')],
          explanation: l('Practise like the real test.', 'আসল test-এর মতো practice করুন।'),
          task: 'The student describes in 3 sentences how they will practise a Reading test and a Writing test at exam timing. Judge the IELTS facts first, then grammar only where it blocks meaning. Facts: Listening 4 parts, 40 questions, about 30 minutes, heard once; Reading 3 sections, 40 questions, 60 minutes, no extra transfer time; Writing 60 minutes, Task 1 at least 150 words (about 20 minutes), Task 2 at least 250 words (about 40 minutes) and Task 2 counts for more; Speaking 11–14 minutes, 3 parts, face to face. Correct any wrong number or timing gently, and praise a realistic timed plan.',
          target: l('Real exam timing', 'আসল exam-এর সময়'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Listening: 4 parts, 40 questions, ~30 min, heard once. Reading: 3 sections, 40 questions, 60 min.', 'Listening: ৪ part, ৪০ প্রশ্ন, ~৩০ মিনিট, একবার শোনা। Reading: ৩ section, ৪০ প্রশ্ন, ৬০ মিনিট।'),
        l('Writing: 60 min — Task 1 150+ words (~20 min), Task 2 250+ words (~40 min, counts more).', 'Writing: ৬০ মিনিট — Task 1 ১৫০+ word (~২০ মিনিট), Task 2 ২৫০+ word (~৪০ মিনিট, গুরুত্ব বেশি)।'),
        l('Speaking: 11–14 min, 3 parts, face to face.', 'Speaking: ১১–১৪ মিনিট, ৩ part, মুখোমুখি।'),
      ],
    },
  ],
};

// ======================================================================= ib-3
export const ibDelivery: Lesson = {
  id: 'ib-3',
  format: 'v2',
  concept: 'ib-delivery',
  title: l('Computer-delivered and paper-based', 'Computer-delivered আর paper-based'),
  why: l('You can take IELTS on paper or on a computer. The content and scoring are the same, but the way you answer is different — so practise the way you will be tested.', 'IELTS কাগজে বা computer-এ দেওয়া যায়। Content আর scoring একই, কিন্তু উত্তর দেওয়ার ধরন আলাদা — তাই যেভাবে test দেবেন সেভাবে practice করুন।'),
  minutes: 8,
  difficulty: 'easy',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('Choosing a format', 'Format বাছাই'),
      situation: l('Mim hears that "computer IELTS is easier and gives higher scores". She types slowly but books the computer test anyway.', 'Mim শুনেছেন "computer IELTS সহজ, নম্বরও বেশি দেয়"। তিনি ধীরে type করেন, তবু computer test book করলেন।'),
      question: l('Is computer IELTS easier?', 'Computer IELTS কি সহজ?'),
      options: ['No — same content and scoring; choose the format you work best in', 'Yes — it is marked more generously', 'Yes — Speaking is skipped'],
      answer: 'No — same content and scoring; choose the format you work best in',
      diagnose: {
        'No — same content and scoring; choose the format you work best in': l('Right. The questions, timing and scoring are the same. If you type slowly, practise typing essays before choosing the computer test.', 'ঠিক। প্রশ্ন, সময় আর scoring একই। ধীরে type করলে computer test বাছার আগে essay type করার practice করুন।'),
        'Yes — it is marked more generously': l('Both formats use the same scoring. Neither is easier.', 'দুই format-এ একই scoring। কোনোটাই সহজ না।'),
        'Yes — Speaking is skipped': l('Speaking is face to face with an examiner in both formats.', 'দুই format-এই Speaking examiner-এর সাথে মুখোমুখি।'),
      },
    },
    {
      kind: 'discover',
      title: l('What changes, what stays', 'কী বদলায়, কী থাকে'),
      items: [
        { en: 'Same: questions, timing, band scores, Speaking face to face', note: l('the test itself does not change', 'test নিজে বদলায় না') },
        { en: 'Computer: you type answers and essays; the word count is shown on screen', note: l('typing speed matters', 'type করার গতি গুরুত্বপূর্ণ') },
        { en: 'Paper: you write by hand on answer sheets', note: l('handwriting must be clear', 'হাতের লেখা পরিষ্কার হতে হবে') },
        { en: 'Paper Listening: 10 minutes to transfer answers · Computer Listening: 2 minutes to check', note: l('you type answers as you listen on computer', 'computer-এ শুনতে শুনতেই type করেন') },
      ],
      question: l('What is the biggest difference for Writing?', 'Writing-এ সবচেয়ে বড় পার্থক্য কী?'),
      options: [
        l('Typing vs handwriting', 'Type করা বনাম হাতে লেখা'),
        l('Different questions', 'আলাদা প্রশ্ন'),
        l('Different word limits', 'আলাদা word-এর সীমা'),
      ],
      answer: 0,
      pattern: l('Same test, different answering: type on a computer or write on paper. Choose the one you are faster and more accurate in — and practise in that format.', 'একই test, উত্তর দেওয়ার ধরন আলাদা: computer-এ type বা কাগজে লেখা। যেটায় দ্রুত আর নির্ভুল সেটা বাছুন — আর সেই format-এ practice করুন।'),
    },
    {
      kind: 'concept',
      title: l('Choosing between the formats', 'দুই format-এর মধ্যে বাছাই'),
      body: l(
        'Computer-delivered IELTS has the same content and scoring as the paper test. The difference is how you read, listen and answer.',
        'Computer-delivered IELTS-এর content আর scoring paper test-এর মতোই। পার্থক্য হলো কীভাবে পড়েন, শোনেন আর উত্তর দেন।',
      ),
      points: [
        l('Same in both: the questions, the timing, the marking and the band scores. Speaking is always face to face with an examiner.', 'দুটোতেই একই: প্রশ্ন, সময়, নম্বর দেওয়া আর band score। Speaking সবসময় examiner-এর সাথে মুখোমুখি।'),
        l('Computer: answers and essays are typed; the screen shows your word count; you can highlight text and make notes on screen.', 'Computer: উত্তর আর essay type করা হয়; screen-এ word count দেখা যায়; screen-এ text highlight আর note করা যায়।'),
        l('Paper: answers are written by hand; in Listening you get 10 minutes at the end to transfer answers to the answer sheet. On computer you type answers during the recording and get 2 minutes to check.', 'Paper: উত্তর হাতে লেখা; Listening-এর শেষে answer sheet-এ উত্তর তোলার জন্য ১০ মিনিট। Computer-এ recording চলার সময়ই type করেন, আর যাচাইয়ের জন্য ২ মিনিট পান।'),
        l('Result times, dates and availability differ by test centre — check the official IELTS or test centre website.', 'Result-এর সময়, তারিখ আর কোনটা পাওয়া যায় — test centre অনুযায়ী আলাদা। Official IELTS বা test centre-এর website দেখুন।'),
        l('Common mix-up: "the computer test is easier". It is not; it only suits people who type well and like reading on screen.', 'সাধারণ ভুল: "computer test সহজ"। তা না; শুধু যাঁরা ভালো type করেন আর screen-এ পড়তে স্বচ্ছন্দ, তাঁদের জন্য সুবিধাজনক।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Who suits which?', 'কার জন্য কোনটা?'),
      items: [
        { en: 'Types 40 words a minute, reads on screen every day → computer may suit', note: l('fast, accurate typing', 'দ্রুত, নির্ভুল type') },
        { en: 'Writes neatly and fast, finds screens tiring → paper may suit', note: l('clear handwriting', 'পরিষ্কার হাতের লেখা') },
        { en: 'Makes many spelling mistakes by hand → practise both, then decide', note: l('test yourself in both formats', 'দুই format-এ নিজেকে যাচাই করুন') },
        { en: 'Either way: the same band scores and the same Speaking test', note: l('no hidden advantage', 'লুকানো সুবিধা নেই') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Skill by skill', 'Skill অনুযায়ী'),
      uses: [
        { skill: 'listening', example: 'Paper: 10 minutes to transfer answers · Computer: 2 minutes to check', note: l('On computer, type answers as you listen.', 'Computer-এ শুনতে শুনতেই type করুন।') },
        { skill: 'reading', example: 'Computer: passage and questions side by side on screen', note: l('Practise scrolling and highlighting.', 'Scroll আর highlight করার practice করুন।') },
        { skill: 'writing', example: 'Computer: the word count is shown as you type', note: l('Paper: count your words yourself.', 'Paper: নিজেই word গুনুন।') },
        { skill: 'speaking', example: 'Face to face with an examiner in both formats', note: l('No difference.', 'কোনো পার্থক্য নেই।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: '"Computer IELTS gives higher scores."', right: 'Both formats use the same scoring.', why: l('Same marking.', 'একই নম্বর দেওয়া।') },
        { wrong: '"On computer, Speaking is with a machine."', right: 'Speaking is face to face in both formats.', why: l('Always an examiner.', 'সবসময় examiner।') },
        { wrong: 'Practising only by hand, then taking the computer test', right: 'Practise typing essays before the computer test', why: l('Typing speed affects Writing.', 'Type-এর গতি Writing-এ প্রভাব ফেলে।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ib-3-p1', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('Which is the same in both formats?', 'দুই format-এ কোনটা একই?'), options: ['The questions and the scoring', 'The way you write answers', 'The Listening transfer time'], answer: 'The questions and the scoring', explanation: l('Same content and scoring.', 'একই content আর scoring।'), why: { 'The way you write answers': l('Computer = typing; paper = handwriting.', 'Computer = type; paper = হাতে লেখা।'), 'The Listening transfer time': l('Paper gives 10 minutes to transfer; computer gives 2 minutes to check.', 'Paper-এ উত্তর তোলার ১০ মিনিট; computer-এ যাচাইয়ের ২ মিনিট।') } }),
        choice('ib-3-p2', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('How is Speaking done in computer-delivered IELTS?', 'Computer-delivered IELTS-এ Speaking কীভাবে হয়?'), options: ['Face to face with an examiner', 'Recorded by the computer', 'It is not included'], answer: 'Face to face with an examiner', explanation: l('Always face to face.', 'সবসময় মুখোমুখি।'), why: { 'Recorded by the computer': l('Speaking stays face to face with a trained examiner.', 'Speaking প্রশিক্ষিত examiner-এর সাথে মুখোমুখিই থাকে।'), 'It is not included': l('All four skills are tested in both formats.', 'দুই format-এই চার skill-এর test হয়।') } }),
        choice('ib-3-p3', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('In paper-based Listening, how long do you get to transfer answers?', 'Paper-based Listening-এ উত্তর তোলার জন্য কত সময়?'), options: ['10 minutes', '2 minutes', 'No time'], answer: '10 minutes', explanation: l('Paper: 10 minutes at the end.', 'Paper: শেষে ১০ মিনিট।'), why: { '2 minutes': l('2 minutes to check is the computer version.', 'যাচাইয়ের ২ মিনিট হলো computer version-এ।'), 'No time': l('That is Reading: no extra transfer time.', 'এটা Reading: উত্তর তোলার আলাদা সময় নেই।') } }),
        choice('ib-3-p4', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('Who is the computer test best for?', 'Computer test কার জন্য সবচেয়ে ভালো?'), options: ['Someone who types quickly and accurately', 'Anyone who wants an easier test', 'Someone who cannot type'], answer: 'Someone who types quickly and accurately', explanation: l('Typing speed matters for Writing.', 'Writing-এ type-এর গতি গুরুত্বপূর্ণ।'), why: { 'Anyone who wants an easier test': l('It is not easier — same content and scoring.', 'এটা সহজ না — একই content আর scoring।'), 'Someone who cannot type': l('Typing essays slowly wastes Writing time.', 'ধীরে essay type করলে Writing-এর সময় নষ্ট হয়।') } }),
        choice('ib-3-p5', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('Where should you check result times and test dates?', 'Result-এর সময় আর test-এর তারিখ কোথায় দেখবেন?'), options: ['The official IELTS or test centre website', 'A coaching centre poster', 'This lesson'], answer: 'The official IELTS or test centre website', explanation: l('These details change and differ by centre.', 'এসব তথ্য বদলায় আর centre অনুযায়ী আলাদা।'), why: { 'A coaching centre poster': l('Posters can be out of date.', 'Poster পুরোনো হতে পারে।'), 'This lesson': l('Mino does not give dates or result times — they change.', 'Mino তারিখ বা result-এর সময় দেয় না — এগুলো বদলায়।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ib-3-r1', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('Write the number of minutes.', 'মিনিটের সংখ্যা লিখুন।'), sentence: 'In computer-delivered Listening, you get ___ minutes to check your answers.', accepted: ['2', 'two'], explanation: l('2 minutes.', '২ মিনিট।') }),
        spot('ib-3-r2', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('One word makes this false. Tap it and fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Computer-delivered IELTS uses different scoring.', wrong: 'different', accepted: ['the same', 'same'], explanation: l('The same scoring.', 'একই scoring।') }),
        correct('ib-3-r3', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('Correct the false statement.', 'ভুল বাক্যটা ঠিক করুন।'), sentence: 'In the computer test, Speaking is done with a computer.', accepted: ['In the computer test, Speaking is done with an examiner.', 'In the computer test, Speaking is done with a person.'], explanation: l('Speaking is face to face.', 'Speaking মুখোমুখি।') }),
        gap('ib-3-r4', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('Write the missing word.', 'বাদ পড়া word লিখুন।'), sentence: 'On the computer test, the screen shows your word ___ as you type.', accepted: ['count'], explanation: l('word count.', 'word count।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ib-3-c1', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('Which statement is true?', 'কোন বাক্যটা সত্য?'), options: ['Neither format is easier.', 'Paper is always easier.', 'Computer is always easier.'], answer: 'Neither format is easier.', explanation: l('Same content and scoring.', 'একই content আর scoring।') }),
        spot('ib-3-c2', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('One word makes this false. Tap it, then fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'In paper-based Listening, you get 2 minutes to transfer answers.', wrong: '2', accepted: ['10', 'ten'], fixOptions: ['10', '20', '5'], explanation: l('Paper: 10 minutes.', 'Paper: ১০ মিনিট।') }),
        order('ib-3-c3', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Both formats have the same questions and scoring.', explanation: l('Same test.', 'একই test।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: which format for you?', 'এবার আপনার পালা: আপনার জন্য কোন format?'),
      exercises: [
        write('ib-3-y1', 'ib-delivery', {
          ...P,
          prompt: l('Write 3 sentences: which format you prefer, why (typing, handwriting, reading on screen), and how you will practise for it.', '৩টা sentence লিখুন: কোন format পছন্দ, কেন (type, হাতের লেখা, screen-এ পড়া), আর তার জন্য কীভাবে practice করবেন।'),
          model: 'I prefer the computer-delivered test because I type faster than I write. I also like seeing the word count while I write my essays. I will practise typing Task 2 essays in 40 minutes every week.',
          checklist: [l('a format and a real reason', 'একটা format আর আসল কারণ'), l('no "easier" myth', '"সহজ"-এর ভুল ধারণা না'), l('a practice plan in that format', 'সেই format-এ practice plan')],
          explanation: l('Choose by how you work best.', 'যেভাবে ভালো কাজ করেন সেভাবে বাছুন।'),
          task: 'The student explains in 3 sentences which IELTS format they prefer and how they will practise. Judge the IELTS facts first, then grammar only where it blocks meaning. Facts: computer-delivered and paper-based IELTS have the same questions, timing and scoring; Speaking is face to face with an examiner in both; on computer, answers and essays are typed and the word count is shown; on paper, answers are handwritten and Listening has 10 minutes at the end to transfer answers, while computer Listening gives 2 minutes to check. Correct the myth that either format is easier or scores higher. Never state result times, fees or dates.',
          target: l('Choosing a format', 'Format বাছাই'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Same questions, timing and scoring on computer and paper; Speaking is always face to face.', 'Computer আর paper-এ একই প্রশ্ন, সময় আর scoring; Speaking সবসময় মুখোমুখি।'),
        l('Computer: typing, word count on screen, 2 minutes to check Listening. Paper: handwriting, 10 minutes to transfer Listening answers.', 'Computer: type, screen-এ word count, Listening যাচাইয়ে ২ মিনিট। Paper: হাতে লেখা, Listening উত্তর তোলায় ১০ মিনিট।'),
        l('Choose the format you work best in; check dates and result times officially.', 'যে format-এ ভালো কাজ করেন সেটা বাছুন; তারিখ আর result-এর সময় official-ভাবে দেখুন।'),
      ],
    },
  ],
};

// ======================================================================= ib-4
export const ibBands: Lesson = {
  id: 'ib-4',
  format: 'v2',
  concept: 'ib-bands',
  title: l('Band Scores and the overall score', 'Band Score আর overall score'),
  why: l('"I need 6.5" means different things depending on how the overall score is worked out. Knowing the band scale and the rounding rule lets you set a realistic target for each skill.', '"আমার 6.5 লাগবে" — overall score কীভাবে হিসাব হয় তার ওপর এর মানে বদলায়। Band-এর মাপকাঠি আর rounding-এর নিয়ম জানলে প্রতিটা skill-এর জন্য বাস্তব target ঠিক করা যায়।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('Working out an overall score', 'Overall score হিসাব'),
      situation: l('Sadia’s bands: Listening 7.0, Reading 6.5, Writing 6.0, Speaking 6.5. She says: "My overall must be 6.0 because my lowest is 6.0."', 'Sadia-র band: Listening 7.0, Reading 6.5, Writing 6.0, Speaking 6.5। তিনি বললেন: "আমার সবচেয়ে কম 6.0, তাই overall 6.0।"'),
      question: l('What is her overall band?', 'তাঁর overall band কত?'),
      options: ['6.5', '6.0', '7.0'],
      answer: '6.5',
      diagnose: {
        '6.5': l('Right: (7.0 + 6.5 + 6.0 + 6.5) ÷ 4 = 6.5. The overall is the average of the four, not the lowest band.', 'ঠিক: (7.0 + 6.5 + 6.0 + 6.5) ÷ 4 = 6.5। Overall হলো চারটার গড়, সবচেয়ে কমটা না।'),
        '6.0': l('The overall is the average of all four bands, not the lowest one: 26 ÷ 4 = 6.5.', 'Overall চারটা band-এর গড়, সবচেয়ে কমটা না: 26 ÷ 4 = 6.5।'),
        '7.0': l('The highest band does not decide either. Add the four and divide by 4: 6.5.', 'সবচেয়ে বেশিটাও ঠিক করে না। চারটা যোগ করে 4 দিয়ে ভাগ করুন: 6.5।'),
      },
    },
    {
      kind: 'discover',
      title: l('Averages and rounding', 'গড় আর rounding'),
      items: [
        { en: '7.0 + 6.5 + 6.0 + 6.5 = 26 → 26 ÷ 4 = 6.5 → overall 6.5', note: l('an exact half band', 'ঠিক half band') },
        { en: '6.5 + 6.5 + 6.0 + 6.0 = 25 → 6.25 → overall 6.5', note: l('.25 rounds up to .5', '.25 বেড়ে .5') },
        { en: '7.0 + 7.0 + 6.5 + 6.5 = 27 → 6.75 → overall 7.0', note: l('.75 rounds up to the next whole band', '.75 বেড়ে পরের পূর্ণ band') },
        { en: '6.5 + 6.0 + 6.0 + 6.0 = 24.5 → 6.125 → overall 6.0', note: l('rounded to the nearest half band', 'কাছের half band-এ') },
      ],
      question: l('An average of 5.75 becomes which overall band?', '5.75 গড় কোন overall band হয়?'),
      options: [
        l('6.0', '6.0'),
        l('5.5', '5.5'),
        l('5.0', '5.0'),
      ],
      answer: 0,
      pattern: l('Overall = the average of the four bands, rounded to the nearest half band; an average ending in .25 goes up to .5, and .75 goes up to the next whole band.', 'Overall = চারটা band-এর গড়, কাছের half band-এ round করা; .25-এ শেষ হলে .5, আর .75-এ শেষ হলে পরের পূর্ণ band।'),
    },
    {
      kind: 'concept',
      title: l('The band scale', 'Band-এর মাপকাঠি'),
      body: l(
        'IELTS reports a band for each skill and an overall band. They use the same 0–9 scale.',
        'IELTS প্রতিটা skill-এর band আর একটা overall band দেয়। সবই একই 0–9 মাপকাঠিতে।',
      ),
      points: [
        l('Each skill gets a band from 0 to 9, in half bands (5.0, 5.5, 6.0 …).', 'প্রতিটা skill 0 থেকে 9-এর মধ্যে band পায়, half band-সহ (5.0, 5.5, 6.0 …)।'),
        l('Overall = the average of the four bands, rounded to the nearest half band. An average ending in .25 rounds up to .5; one ending in .75 rounds up to the next whole band.', 'Overall = চারটা band-এর গড়, কাছের half band-এ round করা। .25-এ শেষ হওয়া গড় বেড়ে .5; .75-এ শেষ হওয়া গড় বেড়ে পরের পূর্ণ band।'),
        l('Many requirements have two parts: an overall band AND a minimum for each skill (for example "6.5 overall, no band below 6.0"). Both must be met.', 'অনেক requirement-এর দুটো অংশ: একটা overall band আর প্রতিটা skill-এর একটা সর্বনিম্ন (যেমন "6.5 overall, কোনো band 6.0-এর নিচে না")। দুটোই পূরণ করতে হয়।'),
        l('Scores in Mino are practice estimates or self-assessments, never official IELTS results.', 'Mino-র score practice-এর অনুমান বা self-assessment, কখনো official IELTS result না।'),
        l('Common mix-up: thinking the overall is the lowest band, or that one weak skill can always be "covered" by others. The average can be high while one skill is still below the minimum.', 'সাধারণ ভুল: overall মানে সবচেয়ে কম band ভাবা, বা ভাবা যে একটা দুর্বল skill সবসময় অন্যগুলো দিয়ে "ঢাকা" যায়। গড় বেশি হলেও একটা skill সর্বনিম্নের নিচে থাকতে পারে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Worked examples', 'হিসাবের উদাহরণ'),
      items: [
        { en: 'L 6.0 · R 6.0 · W 5.5 · S 6.0 → 23.5 ÷ 4 = 5.875 → 6.0', note: l('rounded to the nearest half band', 'কাছের half band-এ') },
        { en: 'L 7.5 · R 7.0 · W 6.5 · S 7.0 → 28 ÷ 4 = 7.0', note: l('exact', 'ঠিক') },
        { en: 'Requirement: 6.5 overall, no band below 6.0 · Result: L 7.5, R 7.0, W 5.5, S 6.5 → overall 6.5 but Writing is below 6.0', note: l('the minimum is not met', 'সর্বনিম্ন পূরণ হয়নি') },
        { en: 'Target plan: L 7.0 · R 7.0 · W 6.0 · S 6.5 → 26.5 ÷ 4 = 6.625 → 6.5', note: l('a realistic mix for 6.5', '6.5-এর জন্য বাস্তব মিশ্রণ') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters for each skill', 'প্রতিটা skill-এ কেন দরকার'),
      uses: [
        { skill: 'listening', example: 'A strong Listening band can raise the average', note: l('Often the fastest skill to improve.', 'প্রায়ই সবচেয়ে দ্রুত উন্নতি হয়।') },
        { skill: 'reading', example: 'Reading counts exactly as much as Writing in the average', note: l('Every skill has equal weight in the overall.', 'Overall-এ প্রতিটা skill-এর সমান গুরুত্ব।') },
        { skill: 'writing', example: 'Many requirements set a minimum for Writing', note: l('Check the per-skill minimum.', 'প্রতি-skill-এর সর্বনিম্ন দেখুন।') },
        { skill: 'speaking', example: 'Speaking is one quarter of the overall', note: l('Equal weight to the others.', 'অন্যগুলোর সমান গুরুত্ব।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Overall = my lowest band', right: 'Overall = the average of the four, rounded', why: l('It is an average.', 'এটা গড়।') },
        { wrong: '6.25 → 6.0', right: '6.25 → 6.5', why: l('.25 rounds up to .5.', '.25 বেড়ে .5।') },
        { wrong: '"Overall 7.0, so I meet 7.0 with no band below 6.5."', right: 'Check every skill: one band may be below 6.5', why: l('Two conditions, both needed.', 'দুটো শর্ত, দুটোই লাগবে।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ib-4-p1', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('What is the band scale?', 'Band-এর মাপকাঠি কী?'), options: ['0 to 9, in half bands', '0 to 100', '1 to 10, whole numbers only'], answer: '0 to 9, in half bands', explanation: l('0–9 with half bands.', 'half band-সহ 0–9।'), why: { '0 to 100': l('Raw scores are out of 40; bands are 0–9.', 'Raw score ৪০-এর মধ্যে; band 0–9।'), '1 to 10, whole numbers only': l('The scale is 0–9 and includes half bands.', 'মাপকাঠি 0–9, half band-সহ।') } }),
        choice('ib-4-p2', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('L 6.0, R 6.5, W 6.0, S 6.5. What is the overall?', 'L 6.0, R 6.5, W 6.0, S 6.5। Overall কত?'), options: ['6.5', '6.0', '6.25'], answer: '6.5', explanation: l('25 ÷ 4 = 6.25 → rounds up to 6.5.', '25 ÷ 4 = 6.25 → বেড়ে 6.5।'), why: { '6.0': l('6.25 rounds up to 6.5, not down.', '6.25 বেড়ে 6.5 হয়, কমে না।'), '6.25': l('Bands are reported in half bands; 6.25 becomes 6.5.', 'Band half band-এ দেওয়া হয়; 6.25 হয় 6.5।') } }),
        choice('ib-4-p3', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('L 7.0, R 7.0, W 6.5, S 6.5. What is the overall?', 'L 7.0, R 7.0, W 6.5, S 6.5। Overall কত?'), options: ['7.0', '6.5', '6.75'], answer: '7.0', explanation: l('27 ÷ 4 = 6.75 → rounds up to 7.0.', '27 ÷ 4 = 6.75 → বেড়ে 7.0।'), why: { '6.5': l('.75 rounds up to the next whole band.', '.75 বেড়ে পরের পূর্ণ band।'), '6.75': l('6.75 is not a band; it becomes 7.0.', '6.75 কোনো band না; এটা 7.0 হয়।') } }),
        choice('ib-4-p4', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Requirement: 6.5 overall, no band below 6.0. Which result meets it?', 'Requirement: 6.5 overall, কোনো band 6.0-এর নিচে না। কোন result পূরণ করে?'), options: ['L 6.5 · R 6.5 · W 6.0 · S 7.0', 'L 8.0 · R 7.0 · W 5.5 · S 6.5', 'L 6.0 · R 6.0 · W 6.0 · S 6.5'], answer: 'L 6.5 · R 6.5 · W 6.0 · S 7.0', explanation: l('26 ÷ 4 = 6.5, and no band below 6.0.', '26 ÷ 4 = 6.5, আর কোনো band 6.0-এর নিচে না।'), why: { 'L 8.0 · R 7.0 · W 5.5 · S 6.5': l('Overall 7.0, but Writing 5.5 is below the minimum.', 'Overall 7.0, কিন্তু Writing 5.5 সর্বনিম্নের নিচে।'), 'L 6.0 · R 6.0 · W 6.0 · S 6.5': l('24.5 ÷ 4 = 6.125 → overall 6.0, below 6.5.', '24.5 ÷ 4 = 6.125 → overall 6.0, 6.5-এর নিচে।') } }),
        choice('ib-4-p5', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Mino shows "estimated Writing 6.0" after a practice task. What is it?', 'Practice task-এর পরে Mino দেখাল "estimated Writing 6.0"। এটা কী?'), options: ['A practice estimate, not an official result', 'An official IELTS band', 'A guaranteed exam score'], answer: 'A practice estimate, not an official result', explanation: l('Only the official test gives official bands.', 'শুধু official test-ই official band দেয়।'), why: { 'An official IELTS band': l('Official bands come only from the real test.', 'Official band আসে শুধু আসল test থেকে।'), 'A guaranteed exam score': l('No practice score can guarantee an exam result.', 'কোনো practice score exam-এর ফলের নিশ্চয়তা দিতে পারে না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ib-4-r1', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Write the overall band.', 'Overall band লিখুন।'), sentence: 'L 6.5 · R 6.5 · W 6.0 · S 6.0 → overall ___', accepted: ['6.5'], explanation: l('25 ÷ 4 = 6.25 → 6.5.', '25 ÷ 4 = 6.25 → 6.5।') }),
        gap('ib-4-r2', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Write the overall band.', 'Overall band লিখুন।'), sentence: 'L 6.5 · R 6.0 · W 6.0 · S 6.0 → overall ___', accepted: ['6', '6.0'], explanation: l('24.5 ÷ 4 = 6.125 → 6.0.', '24.5 ÷ 4 = 6.125 → 6.0।') }),
        spot('ib-4-r3', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('One word makes this false. Tap it and fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'The overall band is the lowest of the four bands.', wrong: 'lowest', accepted: ['average'], explanation: l('It is the average, rounded.', 'এটা গড়, round করা।') }),
        correct('ib-4-r4', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Correct the false statement (change one number).', 'ভুল বাক্যটা ঠিক করুন (একটা সংখ্যা বদলান)।'), sentence: 'An average of 6.75 becomes an overall band of 6.5.', accepted: ['An average of 6.75 becomes an overall band of 7.0.', 'An average of 6.75 becomes an overall band of 7.'], explanation: l('.75 rounds up to 7.0.', '.75 বেড়ে 7.0।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ib-4-c1', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Which average becomes 6.0?', 'কোন গড় 6.0 হয়?'), options: ['6.125', '6.25', '6.75'], answer: '6.125', explanation: l('6.125 is nearest to 6.0.', '6.125 সবচেয়ে কাছে 6.0-এর।') }),
        spot('ib-4-c2', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('One number is wrong. Tap it, then fix it.', 'একটা সংখ্যা ভুল। Tap করে ঠিক করুন।'), sentence: 'L 7.0, R 6.5, W 6.0 and S 6.5 give an overall of 6.0.', wrong: '6.0', accepted: ['6.5'], fixOptions: ['6.5', '7.0', '5.5'], explanation: l('26 ÷ 4 = 6.5.', '26 ÷ 4 = 6.5।') }),
        order('ib-4-c3', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'The overall band is the average of the four skills.', explanation: l('Average of four.', 'চারটার গড়।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your target mix', 'এবার আপনার পালা: আপনার target-এর মিশ্রণ'),
      exercises: [
        write('ib-4-y1', 'ib-bands', {
          ...P,
          prompt: l('Write 3 sentences: your overall target, a target band for each skill that reaches it, and how you checked the average.', '৩টা sentence লিখুন: আপনার overall target, প্রতিটা skill-এর এমন target যা সেখানে পৌঁছায়, আর গড় কীভাবে যাচাই করলেন।'),
          model: 'My target is 6.5 overall with no band below 6.0. I am aiming for Listening 7.0, Reading 6.5, Writing 6.0 and Speaking 6.5. These add up to 26, and 26 divided by 4 is 6.5.',
          checklist: [l('an overall target (and a minimum, if any)', 'একটা overall target (আর থাকলে সর্বনিম্ন)'), l('four skill targets', 'চারটা skill-এর target'), l('a correct average and rounding', 'সঠিক গড় আর rounding')],
          explanation: l('Average of four, rounded to the nearest half band.', 'চারটার গড়, কাছের half band-এ।'),
          task: 'The student sets an overall IELTS target and four skill targets and shows the average. Judge the IELTS facts first, then grammar only where it blocks meaning. Facts: bands are 0–9 in half bands; the overall band is the average of the four skill bands rounded to the nearest half band, with an average ending in .25 rounding up to .5 and one ending in .75 rounding up to the next whole band; many requirements also set a minimum band for each skill. Recalculate the student’s average and say whether their skill targets reach their overall target and minimum. Scores in Mino are practice estimates, never official results.',
          target: l('Band targets and averages', 'Band target আর গড়'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Bands 0–9 in half bands; overall = average of four, rounded to the nearest half band.', 'Band 0–9, half band-সহ; overall = চারটার গড়, কাছের half band-এ।'),
        l('.25 → up to .5 · .75 → up to the next whole band.', '.25 → বেড়ে .5 · .75 → বেড়ে পরের পূর্ণ band।'),
        l('Check the overall AND the minimum for each skill.', 'Overall আর প্রতি skill-এর সর্বনিম্ন — দুটোই দেখুন।'),
      ],
    },
  ],
};

// ======================================================================= ib-5
export const ibMarking: Lesson = {
  id: 'ib-5',
  format: 'v2',
  concept: 'ib-marking',
  title: l('How each skill is marked', 'প্রতিটা skill কীভাবে নম্বর পায়'),
  why: l('Listening and Reading are marked by correct answers; Writing and Speaking by examiners using four criteria. Knowing the criteria tells you exactly what to practise.', 'Listening আর Reading-এ নম্বর সঠিক উত্তর গুনে; Writing আর Speaking-এ examiner চারটা criteria দিয়ে নম্বর দেন। Criteria জানলে ঠিক কী practice করতে হবে বোঝা যায়।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('Where did the marks go?', 'নম্বর কোথায় গেল?'),
      situation: l('Rahat wrote a long Task 2 essay full of rare words, but his Writing band was 5.5. He says: "The examiner only counts difficult vocabulary."', 'Rahat কঠিন word ভরা একটা লম্বা Task 2 essay লিখেছিলেন, কিন্তু Writing band এল 5.5। তিনি বলেন: "Examiner শুধু কঠিন vocabulary গোনেন।"'),
      question: l('How is Writing actually marked?', 'Writing আসলে কীভাবে নম্বর পায়?'),
      options: ['Four equal criteria: task, organisation, vocabulary and grammar', 'Only vocabulary', 'Only the number of words'],
      answer: 'Four equal criteria: task, organisation, vocabulary and grammar',
      diagnose: {
        'Four equal criteria: task, organisation, vocabulary and grammar': l('Right: Task Achievement / Task Response, Coherence & Cohesion, Lexical Resource and Grammatical Range & Accuracy, equally weighted. Rare words used wrongly lower Lexical Resource.', 'ঠিক: Task Achievement / Task Response, Coherence & Cohesion, Lexical Resource আর Grammatical Range & Accuracy — সমান গুরুত্বে। ভুলভাবে বসানো কঠিন word Lexical Resource কমায়।'),
        'Only vocabulary': l('Vocabulary (Lexical Resource) is one of four equal criteria — and it rewards precise, natural words, not rare ones.', 'Vocabulary (Lexical Resource) চারটা সমান criteria-র একটা — আর এটা নির্দিষ্ট, স্বাভাবিক word-এ নম্বর দেয়, কঠিন word-এ না।'),
        'Only the number of words': l('Length is not a criterion, although writing under the minimum lowers the score.', 'দৈর্ঘ্য কোনো criteria না, তবে সর্বনিম্নের কম লিখলে score কমে।'),
      },
    },
    {
      kind: 'discover',
      title: l('Two ways of marking', 'নম্বর দেওয়ার দুই ধরন'),
      items: [
        { en: 'Listening and Reading: raw score out of 40 → converted to a band', note: l('roughly 30/40 ≈ 7.0 (tables vary slightly by test)', 'মোটামুটি 30/40 ≈ 7.0 (test অনুযায়ী table একটু বদলায়)') },
        { en: 'Writing: Task Achievement / Task Response · Coherence & Cohesion · Lexical Resource · Grammatical Range & Accuracy', note: l('four equal criteria; Task 2 counts for more than Task 1', 'চারটা সমান criteria; Task 2-এর গুরুত্ব Task 1-এর চেয়ে বেশি') },
        { en: 'Speaking: Fluency & Coherence · Lexical Resource · Grammatical Range & Accuracy · Pronunciation', note: l('four equal criteria', 'চারটা সমান criteria') },
        { en: 'Completion answers: spelling and the word limit count', note: l('a misspelled answer is wrong', 'ভুল বানানের উত্তর ভুল') },
      ],
      question: l('Which criterion appears in both Writing and Speaking?', 'কোন criteria Writing আর Speaking দুটোতেই আছে?'),
      options: [
        l('Lexical Resource (and Grammatical Range & Accuracy)', 'Lexical Resource (আর Grammatical Range & Accuracy)'),
        l('Pronunciation', 'Pronunciation'),
        l('Task Response', 'Task Response'),
      ],
      answer: 0,
      pattern: l('Listening and Reading: correct answers out of 40, converted to a band. Writing and Speaking: four equally weighted criteria marked by trained examiners.', 'Listening আর Reading: ৪০-এর মধ্যে সঠিক উত্তর, band-এ রূপান্তর। Writing আর Speaking: প্রশিক্ষিত examiner-এর দেওয়া চারটা সমান criteria।'),
    },
    {
      kind: 'concept',
      title: l('The marking criteria', 'নম্বর দেওয়ার criteria'),
      body: l(
        'Every part of IELTS rewards something specific. Practise what is marked.',
        'IELTS-এর প্রতিটা অংশ নির্দিষ্ট কিছুতে নম্বর দেয়। যা গোনা হয় তার practice করুন।',
      ),
      points: [
        l('Listening and Reading: one mark per correct answer, out of 40, converted to a band with tables that vary slightly between tests (roughly 30/40 ≈ 7.0 in Listening and Academic Reading).', 'Listening আর Reading: প্রতি সঠিক উত্তরে এক নম্বর, ৪০-এর মধ্যে, test অনুযায়ী একটু বদলানো table দিয়ে band-এ রূপান্তর (মোটামুটি 30/40 ≈ 7.0, Listening আর Academic Reading-এ)।'),
        l('Completion answers must follow the word limit and be spelled correctly; extra words make the answer wrong.', 'Completion-এর উত্তরে word-এর সীমা মানতে হয় আর বানান ঠিক হতে হয়; বাড়তি word থাকলে উত্তর ভুল।'),
        l('Writing: Task Achievement (Task 1) / Task Response (Task 2), Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy — equally weighted. Task 2 counts for more than Task 1. Under the minimum word count, or off topic, lowers the score.', 'Writing: Task Achievement (Task 1) / Task Response (Task 2), Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy — সমান গুরুত্ব। Task 2-এর গুরুত্ব Task 1-এর চেয়ে বেশি। সর্বনিম্ন word-এর কম বা বিষয়ের বাইরে লিখলে score কমে।'),
        l('Speaking: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation — equally weighted, marked by a trained examiner.', 'Speaking: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation — সমান গুরুত্ব, প্রশিক্ষিত examiner-এর দেওয়া।'),
        l('Common mix-up: "big words and long essays get high bands". Lexical Resource rewards precise, natural words; errors with forced vocabulary lower the score, and length alone earns nothing.', 'সাধারণ ভুল: "কঠিন word আর লম্বা essay-তে বেশি band"। Lexical Resource নির্দিষ্ট, স্বাভাবিক word-এ নম্বর দেয়; জোর করে বসানো vocabulary-র ভুল score কমায়, আর শুধু দৈর্ঘ্যে কিছু পাওয়া যায় না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('What each criterion looks at', 'প্রতিটা criteria কী দেখে'),
      items: [
        { en: 'Task Response: Did I answer every part of the question with a clear position?', note: l('Writing Task 2', 'Writing Task 2') },
        { en: 'Coherence & Cohesion: Are my paragraphs logical and my linking natural?', note: l('Writing and Speaking (as Fluency & Coherence)', 'Writing আর Speaking (Fluency & Coherence হিসেবে)') },
        { en: 'Lexical Resource: Are my words precise, natural and correctly used?', note: l('Writing and Speaking', 'Writing আর Speaking') },
        { en: 'Pronunciation: Can the examiner understand me easily?', note: l('Speaking only', 'শুধু Speaking') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Skill by skill', 'Skill অনুযায়ী'),
      uses: [
        { skill: 'listening', example: 'Answer "libary" instead of "library" → wrong', note: l('Spelling counts.', 'বানান গোনা হয়।') },
        { skill: 'reading', example: '"NO MORE THAN TWO WORDS" → a three-word answer is wrong', note: l('The word limit counts.', 'Word-এর সীমা গোনা হয়।') },
        { skill: 'writing', example: 'Task 2 counts for more than Task 1', note: l('Plan your time for it.', 'সেভাবে সময় ভাগ করুন।') },
        { skill: 'speaking', example: 'Pronunciation is a quarter of the Speaking band', note: l('Clear, not a perfect accent.', 'পরিষ্কার উচ্চারণ, নিখুঁত accent না।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: '"Rare words give Band 8."', right: 'Precise, correctly used words raise Lexical Resource', why: l('Accuracy counts.', 'Accuracy গোনা হয়।') },
        { wrong: '"Writing 400 words gives a higher band."', right: 'Length is not a criterion; meet the minimum and answer the task', why: l('Four criteria, no length score.', 'চারটা criteria, দৈর্ঘ্যের নম্বর নেই।') },
        { wrong: '"Spelling does not matter in Listening."', right: 'Misspelled answers are marked wrong', why: l('Spelling counts.', 'বানান গোনা হয়।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ib-5-p1', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('How many marking criteria does Speaking have?', 'Speaking-এ কয়টা criteria?'), options: ['4', '3', '1'], answer: '4', explanation: l('Four, equally weighted.', 'চারটা, সমান গুরুত্বে।'), why: { '3': l('There are four: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation.', 'চারটা: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation।'), '1': l('Speaking is not marked on one thing only.', 'Speaking শুধু একটা বিষয়ে নম্বর পায় না।') } }),
        choice('ib-5-p2', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('Which is a Speaking criterion but NOT a Writing one?', 'কোনটা Speaking-এর criteria কিন্তু Writing-এর না?'), options: ['Pronunciation', 'Lexical Resource', 'Grammatical Range & Accuracy'], answer: 'Pronunciation', explanation: l('Pronunciation is Speaking only.', 'Pronunciation শুধু Speaking-এ।'), why: { 'Lexical Resource': l('Lexical Resource is in both.', 'Lexical Resource দুটোতেই আছে।'), 'Grammatical Range & Accuracy': l('Grammar is in both.', 'Grammar দুটোতেই আছে।') } }),
        choice('ib-5-p3', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('How is a Listening band worked out?', 'Listening band কীভাবে হিসাব হয়?'), options: ['Correct answers out of 40, converted to a band', 'An examiner listens to your answers', 'The time you take'], answer: 'Correct answers out of 40, converted to a band', explanation: l('Raw score → band.', 'Raw score → band।'), why: { 'An examiner listens to your answers': l('That is Speaking; Listening is marked by correct answers.', 'এটা Speaking; Listening-এ সঠিক উত্তর গোনা হয়।'), 'The time you take': l('Time is fixed; only correct answers count.', 'সময় নির্দিষ্ট; শুধু সঠিক উত্তর গোনা হয়।') } }),
        choice('ib-5-p4', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('Which Writing task counts for more?', 'কোন Writing task-এর গুরুত্ব বেশি?'), options: ['Task 2', 'Task 1', 'They are equal'], answer: 'Task 2', explanation: l('Task 2 counts for more.', 'Task 2-এর গুরুত্ব বেশি।'), why: { 'Task 1': l('Task 1 is shorter and counts for less.', 'Task 1 ছোট আর গুরুত্ব কম।'), 'They are equal': l('Task 2 counts for more than Task 1.', 'Task 2-এর গুরুত্ব Task 1-এর চেয়ে বেশি।') } }),
        choice('ib-5-p5', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('The question says "NO MORE THAN TWO WORDS". You write "the old bridge". What happens?', 'প্রশ্নে "NO MORE THAN TWO WORDS"। আপনি লিখলেন "the old bridge"। কী হবে?'), options: ['It is marked wrong — three words', 'It is correct because the meaning is right', 'You get half a mark'], answer: 'It is marked wrong — three words', explanation: l('Extra words make the answer wrong.', 'বাড়তি word থাকলে উত্তর ভুল।'), why: { 'It is correct because the meaning is right': l('The word limit is part of the answer.', 'Word-এর সীমা উত্তরের অংশ।'), 'You get half a mark': l('There are no half marks in Listening and Reading.', 'Listening আর Reading-এ আধা নম্বর নেই।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ib-5-r1', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('Write the missing criterion (one word).', 'বাদ পড়া criteria লিখুন (একটা word)।'), sentence: 'Speaking criteria: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy and ___.', accepted: ['Pronunciation'], explanation: l('Pronunciation.', 'Pronunciation।') }),
        gap('ib-5-r2', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'Listening and Reading raw scores are out of ___.', accepted: ['40', 'forty'], explanation: l('Out of 40.', '৪০-এর মধ্যে।') }),
        spot('ib-5-r3', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('One word makes this false. Tap it and fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'The four Writing criteria have different weights.', wrong: 'different', accepted: ['equal', 'the same'], explanation: l('Equally weighted.', 'সমান গুরুত্ব।') }),
        correct('ib-5-r4', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('Correct the false statement.', 'ভুল বাক্যটা ঠিক করুন।'), sentence: 'Lexical Resource rewards rare words.', accepted: ['Lexical Resource rewards precise words.', 'Lexical Resource rewards natural words.', 'Lexical Resource rewards accurate words.'], explanation: l('Precise, natural, accurate.', 'নির্দিষ্ট, স্বাভাবিক, নির্ভুল।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ib-5-c1', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('Which is NOT a Writing criterion?', 'কোনটা Writing-এর criteria না?'), options: ['Word count', 'Coherence & Cohesion', 'Task Response'], answer: 'Word count', explanation: l('Length is not a criterion (but meet the minimum).', 'দৈর্ঘ্য criteria না (তবে সর্বনিম্ন পূরণ করুন)।') }),
        spot('ib-5-c2', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('One word makes this false. Tap it, then fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'In Listening, misspelled answers are accepted.', wrong: 'accepted', accepted: ['wrong', 'rejected'], fixOptions: ['wrong', 'accept', 'right'], explanation: l('Spelling counts.', 'বানান গোনা হয়।') }),
        order('ib-5-c3', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Task 2 counts for more than Task 1.', explanation: l('Task 2 has more weight.', 'Task 2-এর গুরুত্ব বেশি।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: what you will practise', 'এবার আপনার পালা: কী practice করবেন'),
      exercises: [
        write('ib-5-y1', 'ib-marking', {
          ...P,
          prompt: l('Write 3 sentences: which Writing or Speaking criterion is weakest for you, why, and one way you will practise it.', '৩টা sentence লিখুন: Writing বা Speaking-এর কোন criteria আপনার সবচেয়ে দুর্বল, কেন, আর কীভাবে practice করবেন।'),
          model: 'My weakest Writing criterion is Coherence & Cohesion, because my paragraphs often mix several ideas. I will plan each Task 2 essay with one main idea per paragraph. I will also check that I use linking words naturally, not in every sentence.',
          checklist: [l('a real criterion name', 'একটা আসল criteria-র নাম'), l('a reason from your own work', 'নিজের কাজ থেকে একটা কারণ'), l('a specific practice step', 'একটা নির্দিষ্ট practice পদক্ষেপ')],
          explanation: l('Practise what is marked.', 'যা গোনা হয় তার practice।'),
          task: 'The student names their weakest Writing or Speaking criterion, why, and a practice step. Judge the IELTS facts first, then grammar only where it blocks meaning. Facts: Writing criteria are Task Achievement (Task 1) / Task Response (Task 2), Coherence & Cohesion, Lexical Resource and Grammatical Range & Accuracy, equally weighted, with Task 2 counting for more; Speaking criteria are Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy and Pronunciation, equally weighted; Listening and Reading are raw scores out of 40 converted to bands; length is not a criterion, but writing under the minimum lowers the score; Lexical Resource rewards precise, natural words, not rare ones. Correct any wrong criterion name or myth gently.',
          target: l('The marking criteria', 'নম্বর দেওয়ার criteria'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Listening and Reading: correct answers out of 40 → band; spelling and word limits count.', 'Listening আর Reading: ৪০-এর মধ্যে সঠিক উত্তর → band; বানান আর word-এর সীমা গোনা হয়।'),
        l('Writing: TA/TR · CC · LR · GRA, equal; Task 2 counts more.', 'Writing: TA/TR · CC · LR · GRA, সমান; Task 2-এর গুরুত্ব বেশি।'),
        l('Speaking: FC · LR · GRA · Pronunciation, equal.', 'Speaking: FC · LR · GRA · Pronunciation, সমান।'),
      ],
    },
  ],
};

// ======================================================================= ib-6
export const ibPlan: Lesson = {
  id: 'ib-6',
  format: 'v2',
  concept: 'ib-plan',
  title: l('Targets and official requirements', 'Target আর official requirement'),
  why: l('Your target band comes from a real requirement, not a guess. Reading that requirement correctly — and checking it on the official page — is the start of a good study plan.', 'আপনার target band আসে আসল requirement থেকে, আন্দাজ থেকে না। সেই requirement ঠিকভাবে পড়া — আর official page-এ যাচাই করা — ভালো study plan-এর শুরু।'),
  minutes: 9,
  difficulty: 'medium',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('Reading a requirement', 'একটা requirement পড়া'),
      situation: l('A course page says: "IELTS Academic 6.5 overall, with no band below 6.0." Jamil’s result: L 7.5, R 7.0, W 5.5, S 6.5 (overall 6.5).', 'একটা course page-এ লেখা: "IELTS Academic 6.5 overall, with no band below 6.0।" Jamil-এর result: L 7.5, R 7.0, W 5.5, S 6.5 (overall 6.5)।'),
      question: l('Does Jamil meet the requirement?', 'Jamil কি requirement পূরণ করেছেন?'),
      options: ['No — Writing 5.5 is below 6.0', 'Yes — the overall is 6.5', 'Yes — three skills are above 6.0'],
      answer: 'No — Writing 5.5 is below 6.0',
      diagnose: {
        'No — Writing 5.5 is below 6.0': l('Right. Both conditions must be met: the overall AND the minimum for each skill.', 'ঠিক। দুটো শর্তই পূরণ করতে হবে: overall আর প্রতিটা skill-এর সর্বনিম্ন।'),
        'Yes — the overall is 6.5': l('The overall is fine, but "no band below 6.0" is not met: Writing is 5.5.', 'Overall ঠিক আছে, কিন্তু "no band below 6.0" পূরণ হয়নি: Writing 5.5।'),
        'Yes — three skills are above 6.0': l('"No band below" means every skill, including Writing.', '"No band below" মানে প্রতিটা skill, Writing-সহ।'),
      },
    },
    {
      kind: 'discover',
      title: l('Parts of a requirement', 'Requirement-এর অংশ'),
      items: [
        { en: 'The version: IELTS Academic (or General Training, or a specific kind of test for some visas)', note: l('book the right one', 'ঠিকটা book করুন') },
        { en: 'The overall band: e.g. 6.5 overall', note: l('the average of four', 'চারটার গড়') },
        { en: 'The minimum per skill: e.g. no band below 6.0, or Writing 6.5', note: l('every skill must meet it', 'প্রতিটা skill-কে পূরণ করতে হবে') },
        { en: 'How recent the result must be: many organisations accept results for about two years', note: l('check your organisation', 'আপনার প্রতিষ্ঠান দেখুন') },
      ],
      question: l('Where do you find the real requirement?', 'আসল requirement কোথায় পাবেন?'),
      options: [
        l('On the organisation’s official page, checked close to your application', 'প্রতিষ্ঠানের official page-এ, apply করার কাছাকাছি সময়ে যাচাই করে'),
        l('From a friend who applied two years ago', 'দুই বছর আগে apply করা বন্ধুর কাছে'),
        l('From Mino’s estimate', 'Mino-র অনুমান থেকে'),
      ],
      answer: 0,
      pattern: l('A requirement = version + overall band + minimum per skill + how recent. Read all four on the official page — requirements change.', 'Requirement = version + overall band + প্রতি skill-এর সর্বনিম্ন + কত পুরোনো চলবে। চারটাই official page-এ পড়ুন — requirement বদলায়।'),
    },
    {
      kind: 'concept',
      title: l('From requirement to study plan', 'Requirement থেকে study plan'),
      body: l(
        'Set your target from the official requirement, then plan the skills that are furthest from it.',
        'Official requirement থেকে target ঠিক করুন, তারপর যে skill সবচেয়ে দূরে সেগুলোর plan করুন।',
      ),
      points: [
        l('Read four things: the version, the overall band, the minimum for each skill, and how recent the result must be. Many organisations accept results for about two years — confirm yours.', 'চারটা জিনিস পড়ুন: version, overall band, প্রতি skill-এর সর্বনিম্ন, আর result কত পুরোনো চলবে। অনেক প্রতিষ্ঠান প্রায় দুই বছরের result নেয় — আপনারটা নিশ্চিত করুন।'),
        l('Aim slightly above the minimum in every skill, so one weak day does not break the requirement.', 'প্রতিটা skill-এ সর্বনিম্নের একটু ওপরে লক্ষ্য রাখুন, যাতে একটা খারাপ দিনে requirement ভেঙে না যায়।'),
        l('Fees, test dates, result times and retake options change and differ by test centre — always check the official IELTS or test centre website.', 'Fee, test-এর তারিখ, result-এর সময় আর retake-এর সুযোগ বদলায় আর test centre অনুযায়ী আলাদা — সবসময় official IELTS বা test centre-এর website দেখুন।'),
        l('Scores in Mino are practice estimates; use them to find your weakest skill, not as a prediction of your exam result.', 'Mino-র score practice-এর অনুমান; সবচেয়ে দুর্বল skill খুঁজতে ব্যবহার করুন, exam-এর ফলের ভবিষ্যদ্বাণী হিসেবে না।'),
        l('Common mix-up: planning only for the overall band. Many students reach the overall but miss one skill minimum — usually Writing.', 'সাধারণ ভুল: শুধু overall band-এর জন্য plan করা। অনেকে overall পৌঁছান কিন্তু একটা skill-এর সর্বনিম্ন — প্রায়ই Writing — মিস করেন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Requirements, read correctly', 'ঠিকভাবে পড়া requirement'),
      items: [
        { en: '"7.0 overall, minimum 6.5 in each component" → every skill 6.5+, average 7.0+', note: l('two conditions', 'দুটো শর্ত') },
        { en: '"6.0 overall, Writing and Speaking 6.0" → only those two have a minimum', note: l('read which skills', 'কোন skill দেখুন') },
        { en: '"IELTS Academic, taken within the last two years" → an older result may not count', note: l('check the test date', 'test-এর তারিখ দেখুন') },
        { en: 'Target plan: L 7.0 · R 7.0 · W 6.5 · S 6.5 for "6.5, no band below 6.0"', note: l('a safe margin in every skill', 'প্রতিটা skill-এ নিরাপদ ব্যবধান') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Planning each skill', 'প্রতিটা skill-এর plan'),
      uses: [
        { skill: 'writing', example: 'If the minimum is Writing 6.5, plan extra Task 2 practice', note: l('Writing is often the lowest band.', 'Writing প্রায়ই সবচেয়ে কম band।') },
        { skill: 'speaking', example: 'Practise Part 2 weekly if Speaking has a minimum', note: l('Timed long turns.', 'সময় ধরে লম্বা বলা।') },
        { skill: 'listening', example: 'A strong Listening band can lift the average', note: l('But it cannot fix a skill minimum.', 'কিন্তু skill-এর সর্বনিম্ন ঠিক করতে পারে না।') },
        { skill: 'reading', example: 'Read the official requirement page carefully — it is a Reading task too', note: l('Details matter.', 'খুঁটিনাটি গুরুত্বপূর্ণ।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Overall 6.5 means "6.5, no band below 6.0" is met', right: 'Check every skill against the minimum', why: l('Two conditions.', 'দুটো শর্ত।') },
        { wrong: 'Using a friend’s requirement from two years ago', right: 'Read the official page now', why: l('Requirements change.', 'Requirement বদলায়।') },
        { wrong: 'Treating a practice estimate as an official band', right: 'Only the real test gives official results', why: l('Estimates guide practice.', 'অনুমান practice-এর দিক দেখায়।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ib-6-p1', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('What does "no band below 6.0" mean?', '"no band below 6.0" মানে কী?'), options: ['Every skill must be 6.0 or higher', 'The overall must be 6.0', 'Only Writing must be 6.0'], answer: 'Every skill must be 6.0 or higher', explanation: l('Each of the four skills.', 'চারটা skill-এর প্রতিটা।'), why: { 'The overall must be 6.0': l('It is about each skill, not the overall.', 'এটা প্রতিটা skill নিয়ে, overall না।'), 'Only Writing must be 6.0': l('It applies to all four skills.', 'চারটা skill-এই প্রযোজ্য।') } }),
        choice('ib-6-p2', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Requirement: 7.0 overall, no band below 6.5. Which result meets it?', 'Requirement: 7.0 overall, কোনো band 6.5-এর নিচে না। কোন result পূরণ করে?'), options: ['L 7.5 · R 7.0 · W 6.5 · S 7.0', 'L 8.5 · R 8.0 · W 6.0 · S 7.0', 'L 7.0 · R 6.5 · W 6.5 · S 6.5'], answer: 'L 7.5 · R 7.0 · W 6.5 · S 7.0', explanation: l('28 ÷ 4 = 7.0, all 6.5+.', '28 ÷ 4 = 7.0, সব 6.5+।'), why: { 'L 8.5 · R 8.0 · W 6.0 · S 7.0': l('Overall 7.5, but Writing 6.0 is below 6.5.', 'Overall 7.5, কিন্তু Writing 6.0, 6.5-এর নিচে।'), 'L 7.0 · R 6.5 · W 6.5 · S 6.5': l('26.5 ÷ 4 = 6.625 → 6.5, below 7.0.', '26.5 ÷ 4 = 6.625 → 6.5, 7.0-এর নিচে।') } }),
        choice('ib-6-p3', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Where should you check the current test fee?', 'বর্তমান test fee কোথায় দেখবেন?'), options: ['The official IELTS or test centre website', 'A two-year-old Facebook post', 'Mino'], answer: 'The official IELTS or test centre website', explanation: l('Fees change and differ by centre.', 'Fee বদলায় আর centre অনুযায়ী আলাদা।'), why: { 'A two-year-old Facebook post': l('It may be out of date.', 'এটা পুরোনো হতে পারে।'), Mino: l('Mino does not give fees — check the official site.', 'Mino fee বলে না — official site দেখুন।') } }),
        choice('ib-6-p4', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Your practice estimates: L 7.0, R 7.0, W 5.5, S 6.5. The requirement is 6.5, no band below 6.0. What should you focus on?', 'আপনার practice অনুমান: L 7.0, R 7.0, W 5.5, S 6.5। Requirement 6.5, কোনো band 6.0-এর নিচে না। কীসে মনোযোগ দেবেন?'), options: ['Writing — it is below the 6.0 minimum', 'Listening — to raise the average', 'Nothing — the average is 6.5'], answer: 'Writing — it is below the 6.0 minimum', explanation: l('The skill minimum is the problem.', 'সমস্যা skill-এর সর্বনিম্ন।'), why: { 'Listening — to raise the average': l('A higher average cannot fix a skill below the minimum.', 'বেশি গড় সর্বনিম্নের নিচের skill ঠিক করতে পারে না।'), 'Nothing — the average is 6.5': l('Writing 5.5 breaks "no band below 6.0".', 'Writing 5.5 "no band below 6.0" ভাঙে।') } }),
        choice('ib-6-p5', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Why aim slightly above each minimum?', 'প্রতিটা সর্বনিম্নের একটু ওপরে লক্ষ্য কেন?'), options: ['So one weaker skill on the day does not break the requirement', 'Because the examiner deducts half a band', 'Because bands are always rounded down'], answer: 'So one weaker skill on the day does not break the requirement', explanation: l('A safety margin.', 'নিরাপত্তার ব্যবধান।'), why: { 'Because the examiner deducts half a band': l('There is no such deduction.', 'এমন কোনো কাটা নেই।'), 'Because bands are always rounded down': l('The overall is rounded to the nearest half band, not always down.', 'Overall কাছের half band-এ round হয়, সবসময় কমে না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ib-6-r1', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Write the missing word.', 'বাদ পড়া word লিখুন।'), sentence: 'Always check the requirement on the organisation’s ___ page.', accepted: ['official'], explanation: l('official.', 'official।') }),
        spot('ib-6-r2', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('One word makes this false. Tap it and fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'A practice estimate from Mino is an official IELTS result.', wrong: 'an', accepted: ['not an'], explanation: l('Estimates are not official results.', 'অনুমান official result না।') }),
        correct('ib-6-r3', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Correct the false statement.', 'ভুল বাক্যটা ঠিক করুন।'), sentence: 'If my overall band is high enough, the skill minimums do not matter.', accepted: ['If my overall band is high enough, the skill minimums still matter.', 'Even if my overall band is high enough, the skill minimums matter.', 'If my overall band is high enough, the skill minimums do matter.'], explanation: l('Both conditions matter.', 'দুটো শর্তই গুরুত্বপূর্ণ।') }),
        gap('ib-6-r4', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Write the overall band.', 'Overall band লিখুন।'), sentence: 'L 7.0 · R 7.0 · W 6.5 · S 6.5 → overall ___', accepted: ['7', '7.0'], explanation: l('27 ÷ 4 = 6.75 → 7.0.', '27 ÷ 4 = 6.75 → 7.0।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ib-6-c1', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Which is NOT part of a typical requirement?', 'সাধারণ requirement-এর অংশ কোনটা না?'), options: ['Your coaching centre’s name', 'The IELTS version', 'A minimum band per skill'], answer: 'Your coaching centre’s name', explanation: l('Version, overall, per-skill minimum, how recent.', 'Version, overall, প্রতি skill-এর সর্বনিম্ন, কত পুরোনো।') }),
        spot('ib-6-c2', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('One word makes this false. Tap it, then fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Test fees are the same at every centre forever.', wrong: 'same', accepted: ['different', 'not the same'], fixOptions: ['different', 'sames', 'similar'], explanation: l('Fees differ and change — check officially.', 'Fee আলাদা আর বদলায় — official-ভাবে দেখুন।') }),
        order('ib-6-c3', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Check the overall band and each skill minimum.', explanation: l('Two conditions.', 'দুটো শর্ত।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your requirement', 'এবার আপনার পালা: আপনার requirement'),
      exercises: [
        write('ib-6-y1', 'ib-plan', {
          ...P,
          prompt: l('Write 3 sentences: the requirement you are aiming for (or a typical one if you do not know yet), the skill that is furthest from it, and where you will confirm the requirement.', '৩টা sentence লিখুন: যে requirement-এর দিকে যাচ্ছেন (না জানলে একটা সাধারণ উদাহরণ), কোন skill সবচেয়ে দূরে, আর requirement কোথায় নিশ্চিত করবেন।'),
          model: 'I am aiming for IELTS Academic 6.5 overall with no band below 6.0. My Writing is furthest from this, because my practice estimate is 5.5. I will confirm the requirement on the university’s official admission page before I book the test.',
          checklist: [l('version, overall and skill minimum', 'version, overall আর skill-এর সর্বনিম্ন'), l('your weakest skill compared with the minimum', 'সর্বনিম্নের তুলনায় আপনার সবচেয়ে দুর্বল skill'), l('an official source', 'একটা official source')],
          explanation: l('Requirement → weakest skill → plan.', 'Requirement → সবচেয়ে দুর্বল skill → plan।'),
          task: 'The student states an IELTS requirement they are aiming for, the skill furthest from it and where they will confirm it. Judge the IELTS facts first, then grammar only where it blocks meaning. Facts: a requirement usually has a version, an overall band, a minimum per skill and how recent the result must be (many organisations accept results for about two years); the overall is the average of four bands rounded to the nearest half band; both the overall and every skill minimum must be met; fees, dates, result times and retakes must be checked on the official IELTS or test centre website; Mino scores are practice estimates, never official results. Check their arithmetic if they give bands. Never state fees, dates or a specific institution’s requirement.',
          target: l('Reading a requirement', 'Requirement পড়া'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Requirement = version + overall + minimum per skill + how recent.', 'Requirement = version + overall + প্রতি skill-এর সর্বনিম্ন + কত পুরোনো।'),
        l('Meet both the overall AND every minimum; aim slightly above each.', 'Overall আর প্রতিটা সর্বনিম্ন — দুটোই পূরণ করুন; প্রতিটার একটু ওপরে লক্ষ্য রাখুন।'),
        l('Fees, dates and result times: the official IELTS or test centre website only.', 'Fee, তারিখ আর result-এর সময়: শুধু official IELTS বা test centre-এর website।'),
      ],
    },
  ],
};

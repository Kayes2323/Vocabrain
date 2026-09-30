import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Start Here, lesson 1: What is IELTS? — what the test is, who it is for, what
 * the result looks like, and why Mino prepares students for IELTS Academic.
 * Only stable facts (the same ones Mino's IELTS knowledge uses); fees, dates
 * and requirements are always checked on official pages. Original Mino content.
 */

export const IELTS_START_CONCEPTS: Concept[] = [
  { id: 'ib-what', title: l('What IELTS is', 'IELTS কী'), lessonId: 'ib-10', tag: 'ielts-basics' },
  { id: 'ib-why', title: l('Why you need IELTS', 'IELTS কেন লাগে'), lessonId: 'ib-11', tag: 'ielts-basics' },
];

const C = 'ib-what';
const P = { tag: 'ielts-basics' as const };

export const ibWhat: Lesson = {
  id: 'ib-10',
  format: 'v2',
  concept: C,
  title: l('What is IELTS?', 'IELTS কী?'),
  why: l(
    'Before you prepare for a test, know what it is: what it measures, who uses the result and what the result looks like.',
    'কোনো test-এর প্রস্তুতির আগে test-টা চিনে নিন: এটা কী মাপে, result কারা ব্যবহার করে আর result দেখতে কেমন।',
  ),
  minutes: 6,
  difficulty: 'easy',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('A result slip', 'একটা result'),
      situation: l('Sabbir shows his cousin his IELTS result: Listening 7.0, Reading 6.5, Writing 6.0, Speaking 6.5, Overall 6.5. His cousin asks: "So did you pass?"', 'Sabbir তাঁর cousin-কে IELTS result দেখালেন: Listening 7.0, Reading 6.5, Writing 6.0, Speaking 6.5, Overall 6.5। Cousin জিজ্ঞেস করলেন: "তাহলে pass করেছেন?"'),
      question: l('What is the right answer?', 'সঠিক উত্তর কোনটা?'),
      options: ['IELTS has no pass or fail — it depends on the band my university asks for', 'Yes, anything above 5 is a pass', 'No, you need 9 to pass'],
      answer: 'IELTS has no pass or fail — it depends on the band my university asks for',
      diagnose: {
        'IELTS has no pass or fail — it depends on the band my university asks for': l('Right. IELTS gives bands; each organisation decides which band is enough.', 'ঠিক। IELTS band দেয়; কোন band যথেষ্ট তা প্রতিটা প্রতিষ্ঠান ঠিক করে।'),
        'Yes, anything above 5 is a pass': l('There is no pass mark in IELTS. Organisations set the band they need.', 'IELTS-এ কোনো pass mark নেই। প্রতিষ্ঠান নিজেদের দরকারি band ঠিক করে।'),
        'No, you need 9 to pass': l('9 is the top band, not a pass mark. IELTS has no pass or fail.', '9 হলো সর্বোচ্চ band, pass mark না। IELTS-এ pass বা fail নেই।'),
      },
    },
    {
      kind: 'concept',
      title: l('An English test for study abroad', 'বিদেশে পড়ার জন্য একটা English test'),
      body: l(
        'IELTS (International English Language Testing System) is an English language test. It shows how well you can use English to study, work and live where English is used.',
        'IELTS (International English Language Testing System) একটা English ভাষার test। English যেখানে ব্যবহার হয়, সেখানে পড়া, কাজ আর থাকার জন্য আপনি কতটা ভালো English ব্যবহার করতে পারেন, IELTS সেটা দেখায়।',
      ),
      points: [
        l('It tests four skills: Listening, Reading, Writing and Speaking.', 'এটা চারটা skill যাচাই করে: Listening, Reading, Writing আর Speaking।'),
        l('There is no pass or fail. You get a Band Score from 0 to 9 for each skill, and an overall band.', 'এখানে pass বা fail নেই। প্রতিটা skill-এ 0 থেকে 9-এর মধ্যে একটা Band Score পান, আর একটা overall band।'),
        l('Universities, employers and governments in many countries use IELTS results to decide if your English is strong enough.', 'অনেক দেশের university, employer আর সরকার IELTS result দেখে ঠিক করে আপনার English যথেষ্ট কিনা।'),
        l('IELTS is run by the British Council, IDP IELTS and Cambridge University Press & Assessment.', 'IELTS পরিচালনা করে British Council, IDP IELTS আর Cambridge University Press & Assessment।'),
        l('Mino prepares you for IELTS Academic — the version universities usually ask for.', 'Mino আপনাকে IELTS Academic-এর জন্য প্রস্তুত করে — university সাধারণত এই version-টাই চায়।'),
        l('Common mix-up: "I passed IELTS." There is no pass or fail — you get bands, and your university decides which band is enough.', 'সাধারণ ভুল: "আমি IELTS pass করেছি।" Pass বা fail নেই — আপনি band পান, আর কোন band যথেষ্ট তা আপনার university ঠিক করে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('IELTS in real life', 'বাস্তবে IELTS'),
      items: [
        { en: 'Sumaiya wants a master’s in the UK. Her university asks for IELTS Academic 6.5 overall.', note: l('a university requirement', 'university-র requirement') },
        { en: 'Rahim’s result: Listening 7.0, Reading 6.5, Writing 6.0, Speaking 6.5 → overall 6.5.', note: l('a band for each skill + an overall band', 'প্রতিটা skill-এ band + একটা overall band') },
        { en: 'A score of 5.5 is not a "fail". It is a band that may or may not meet a requirement.', note: l('no pass or fail', 'pass বা fail নেই') },
      ],
    },
    {
      kind: 'discover',
      title: l('Read the result', 'Result-টা পড়ুন'),
      items: [
        { en: 'Listening 7.0', note: l('band for one skill', 'একটা skill-এর band') },
        { en: 'Reading 6.5', note: l('band for one skill', 'একটা skill-এর band') },
        { en: 'Overall 6.5', note: l('the band for the whole test', 'পুরো test-এর band') },
      ],
      question: l('What does an IELTS result give you?', 'IELTS result আপনাকে কী দেয়?'),
      options: [
        l('A band for each skill and an overall band', 'প্রতিটা skill-এর band আর একটা overall band'),
        l('Pass or fail', 'Pass বা fail'),
        l('A percentage out of 100', '১০০-এর মধ্যে একটা শতাংশ'),
      ],
      answer: 0,
      pattern: l('IELTS = four skills → four bands (0–9) → one overall band. No pass or fail; the organisation you apply to sets the band it needs.', 'IELTS = চারটা skill → চারটা band (0–9) → একটা overall band। Pass বা fail নেই; আপনি যেখানে apply করবেন, তারা ঠিক করে কত band লাগবে।'),
    },
    {
      kind: 'ielts',
      title: l('Why this matters for your preparation', 'আপনার প্রস্তুতিতে এটা কেন দরকার'),
      uses: [
        { skill: 'listening', example: 'Listening is one of the four bands in your overall score.', note: l('Every skill counts.', 'প্রতিটা skill গোনা হয়।') },
        { skill: 'reading', example: 'Academic Reading uses long passages like those in books and journals.', note: l('Mino’s Reading practice is Academic.', 'Mino-র Reading practice Academic।') },
        { skill: 'writing', example: 'Academic Writing Task 1 describes a graph, table or diagram.', note: l('You will learn both Writing tasks later.', 'দুটো Writing task পরে শিখবেন।') },
        { skill: 'speaking', example: 'Speaking is a conversation with an examiner.', note: l('Your spoken English gets its own band.', 'আপনার বলা English-এর আলাদা band।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common misunderstandings', 'সাধারণ ভুল ধারণা'),
      items: [
        { wrong: '"I passed IELTS."', right: '"I got 6.5 in IELTS."', why: l('There is no pass or fail — only bands.', 'Pass বা fail নেই — শুধু band।') },
        { wrong: '"IELTS only tests grammar."', right: 'IELTS tests four skills: Listening, Reading, Writing and Speaking.', why: l('Grammar helps every skill, but the test is about using English.', 'Grammar প্রতিটা skill-এ কাজে লাগে, কিন্তু test হলো English ব্যবহার করা নিয়ে।') },
        { wrong: '"Every university needs the same band."', right: 'Each university or course sets its own requirement.', why: l('Always check the official requirement.', 'সবসময় official requirement দেখুন।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ib-10-p1', C, { ...P, prompt: l('How many skills does IELTS test?', 'IELTS কয়টা skill যাচাই করে?'), options: ['Four', 'Two', 'Six'], answer: 'Four', explanation: l('Listening, Reading, Writing, Speaking.', 'Listening, Reading, Writing, Speaking।') }),
        choice('ib-10-p2', C, { ...P, prompt: l('What is the highest band?', 'সবচেয়ে বেশি band কত?'), options: ['9', '10', '100'], answer: '9', explanation: l('Bands go from 0 to 9.', 'Band 0 থেকে 9 পর্যন্ত।') }),
        choice('ib-10-p3', C, { ...P, prompt: l('Nadia got 5.5. What is true?', 'Nadia 5.5 পেয়েছেন। কোনটা সত্য?'), options: ['It is a band, not a pass or fail', 'She failed IELTS', 'She must take the test again'], answer: 'It is a band, not a pass or fail', explanation: l('Whether 5.5 is enough depends on the requirement.', '5.5 যথেষ্ট কিনা তা requirement-এর ওপর নির্ভর করে।'), why: { 'She failed IELTS': l('There is no pass or fail in IELTS.', 'IELTS-এ pass বা fail নেই।'), 'She must take the test again': l('Only if her requirement is higher than 5.5.', 'শুধু যদি তাঁর requirement 5.5-এর বেশি হয়।') } }),
        choice('ib-10-p4', C, { ...P, prompt: l('Which version does Mino prepare you for?', 'Mino আপনাকে কোন version-এর জন্য প্রস্তুত করে?'), options: ['IELTS Academic', 'Every version equally', 'A school-level exam'], answer: 'IELTS Academic', explanation: l('The version universities usually ask for.', 'University সাধারণত যে version চায়।') }),
        choice('ib-10-p5', C, { ...P, prompt: l('Who decides the band you need?', 'কত band লাগবে কে ঠিক করে?'), options: ['The university or organisation you apply to', 'The IELTS examiner', 'Your friends'], answer: 'The university or organisation you apply to', explanation: l('Each organisation sets its own requirement.', 'প্রতিটা প্রতিষ্ঠান নিজের requirement ঠিক করে।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('ib-10-r1', C, { ...P, prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'IELTS tests ___ skills.', accepted: ['four', '4'], explanation: l('Four skills.', 'চারটা skill।') }),
        gap('ib-10-r2', C, { ...P, prompt: l('Write the missing word.', 'বাদ পড়া word লিখুন।'), sentence: 'In IELTS there is no pass or ___ — only bands.', accepted: ['fail'], explanation: l('No pass or fail.', 'Pass বা fail নেই।') }),
        spot('ib-10-r3', C, { ...P, prompt: l('One word makes this false. Tap it and fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'In IELTS, the highest band is 10.', wrong: '10', accepted: ['9', 'nine'], explanation: l('Bands go from 0 to 9.', 'Band 0 থেকে 9 পর্যন্ত।') }),
        correct('ib-10-r4', C, { ...P, prompt: l('Correct the false statement.', 'ভুল বাক্যটা ঠিক করুন।'), sentence: 'IELTS tests only grammar.', accepted: ['IELTS tests four skills.', 'IELTS tests Listening, Reading, Writing and Speaking.', 'IELTS tests four skills: Listening, Reading, Writing and Speaking.'], explanation: l('Four skills, not only grammar.', 'চারটা skill, শুধু grammar না।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        order('ib-10-c1', C, { ...P, prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'IELTS has no pass or fail.', explanation: l('Only bands.', 'শুধু band।') }),
        choice('ib-10-c2', C, { ...P, prompt: l('Which sentence describes an IELTS result correctly?', 'কোন sentence IELTS result ঠিকভাবে বর্ণনা করে?'), options: ['I got 7.0 overall and 6.5 in Writing.', 'I passed IELTS with 70%.', 'I got grade A in IELTS.'], answer: 'I got 7.0 overall and 6.5 in Writing.', explanation: l('Bands per skill and overall.', 'প্রতি skill-এ আর overall-এ band।') }),
        gap('ib-10-c3', C, { ...P, prompt: l('Write the version (one word).', 'Version লিখুন (একটা word)।'), sentence: 'Universities usually ask for IELTS ___.', accepted: ['Academic'], explanation: l('IELTS Academic.', 'IELTS Academic।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: why IELTS?', 'এবার আপনার পালা: কেন IELTS?'),
      exercises: [
        write('ib-10-y1', C, {
          ...P,
          prompt: l('Write 2–3 sentences: what IELTS is, and why you are taking it.', '২–৩টা sentence লিখুন: IELTS কী, আর আপনি কেন দিচ্ছেন।'),
          model: 'IELTS is an English test with four skills: Listening, Reading, Writing and Speaking. I am taking IELTS Academic because I want to study for a master’s degree in Canada. I will check the band my university asks for.',
          task: 'The student explains in 2–3 sentences what IELTS is and why they are taking it. Judge the IELTS facts first, then grammar only where it blocks meaning. Facts: IELTS is an English language test of four skills (Listening, Reading, Writing, Speaking); results are bands from 0 to 9 for each skill plus an overall band; there is no pass or fail; organisations set their own requirement; IELTS Academic is usually for university study. Correct wrong facts gently. Never state fees, dates or specific institution requirements.',
          target: l('What IELTS is', 'IELTS কী'),
          checklist: [l('What IELTS tests (four skills)', 'IELTS কী যাচাই করে (চারটা skill)'), l('Your reason for taking it', 'আপনার test দেওয়ার কারণ'), l('Band, not pass or fail', 'Band, pass বা fail না')],
          explanation: l('Four skills, bands 0–9, your purpose.', 'চারটা skill, band 0–9, আপনার উদ্দেশ্য।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('IELTS is an English test of four skills: Listening, Reading, Writing, Speaking.', 'IELTS চারটা skill-এর English test: Listening, Reading, Writing, Speaking।'),
        l('Results are bands from 0 to 9 — no pass or fail.', 'Result হলো 0 থেকে 9-এর band — pass বা fail নেই।'),
        l('Mino prepares you for IELTS Academic, the version for university study.', 'Mino আপনাকে IELTS Academic-এর জন্য প্রস্তুত করে — university-তে পড়ার version।'),
      ],
    },
  ],
};

const W = 'ib-why';

export const ibWhy: Lesson = {
  id: 'ib-11',
  format: 'v2',
  concept: W,
  title: l('Why do you need IELTS?', 'IELTS কেন লাগে?'),
  why: l(
    'Knowing exactly why you need IELTS — and which band your university asks for — turns "study English" into a clear goal with a date.',
    'ঠিক কেন IELTS লাগবে — আর আপনার university কত band চায় — জানলে "English পড়া" হয়ে যায় একটা নির্দিষ্ট তারিখসহ পরিষ্কার লক্ষ্য।',
  ),
  minutes: 6,
  difficulty: 'easy',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('Two students', 'দুজন শিক্ষার্থী'),
      situation: l('Tania says: "I will take IELTS first and choose universities later." Rafi says: "I will check what my universities ask for, then plan my test date."', 'Tania বললেন: "আগে IELTS দেব, পরে university বাছাই করব।" Rafi বললেন: "আগে দেখব আমার university কী চায়, তারপর test-এর তারিখ ঠিক করব।"'),
      question: l('Whose plan is better?', 'কার plan ভালো?'),
      options: ['Rafi’s — the requirement tells you the band and the deadline', 'Tania’s — any score will be fine', 'Both are the same'],
      answer: 'Rafi’s — the requirement tells you the band and the deadline',
      diagnose: {
        'Rafi’s — the requirement tells you the band and the deadline': l('Right. You take IELTS for a purpose; the requirement sets your target.', 'ঠিক। IELTS দেওয়া হয় একটা উদ্দেশ্যে; requirement আপনার target ঠিক করে।'),
        'Tania’s — any score will be fine': l('Universities ask for a specific band. Without knowing it, you cannot plan.', 'University নির্দিষ্ট band চায়। সেটা না জেনে পরিকল্পনা করা যায় না।'),
        'Both are the same': l('Rafi knows his target band and deadline before he starts; Tania does not.', 'Rafi শুরুর আগেই target band আর শেষ তারিখ জানেন; Tania জানেন না।'),
      },
    },
    {
      kind: 'concept',
      title: l('Proof that your English is ready', 'আপনার English তৈরি — তার প্রমাণ'),
      body: l(
        'Universities abroad teach in English, so they need proof that you can follow lectures, read academic texts and write assignments. An IELTS Academic result is that proof.',
        'বিদেশের university English-এ পড়ায়, তাই তারা প্রমাণ চায় যে আপনি lecture বুঝতে, academic text পড়তে আর assignment লিখতে পারবেন। IELTS Academic result হলো সেই প্রমাণ।',
      ),
      points: [
        l('Admission: many universities ask for an IELTS Academic band as part of the application.', 'Admission: অনেক university application-এর অংশ হিসেবে IELTS Academic band চায়।'),
        l('Visa and scholarships: some student visas and scholarships also ask for an English test result.', 'Visa আর scholarship: কিছু student visa আর scholarship-ও English test-এর result চায়।'),
        l('The requirement is a band: for example 6.5 overall. Each university and course sets its own.', 'Requirement হলো একটা band: যেমন 6.5 overall। প্রতিটা university আর course নিজেরটা ঠিক করে।'),
        l('Work backwards: application deadline → test date → your study plan.', 'পেছন থেকে হিসাব করুন: application-এর শেষ তারিখ → test-এর তারিখ → আপনার study plan।'),
        l('Common mix-up: taking IELTS first and choosing a university later. Check the requirement first — it tells you the band to aim for.', 'সাধারণ ভুল: আগে IELTS দিয়ে পরে university বাছাই করা। আগে requirement দেখুন — কত band-এর লক্ষ্য রাখবেন, সেটা ওখান থেকেই জানবেন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Reasons students take IELTS Academic', 'শিক্ষার্থীরা কেন IELTS Academic দেন'),
      items: [
        { en: 'Tanvir applies for a BSc in Canada. The university asks for IELTS Academic 6.5.', note: l('admission', 'admission') },
        { en: 'Mitu needs an English result for a scholarship application in the UK.', note: l('scholarship', 'scholarship') },
        { en: 'Arif’s application deadline is in March, so he plans to take IELTS in January.', note: l('work backwards from the deadline', 'শেষ তারিখ থেকে পেছনে হিসাব') },
      ],
    },
    {
      kind: 'discover',
      title: l('Find your goal', 'আপনার লক্ষ্য খুঁজুন'),
      items: [
        { en: 'Course page: "IELTS Academic 6.5 overall"', note: l('the band you need', 'যত band লাগবে') },
        { en: 'Deadline: 15 March', note: l('when you need the result', 'কখন result লাগবে') },
        { en: 'Plan: test in January, study from now', note: l('your timeline', 'আপনার সময়রেখা') },
      ],
      question: l('Where does your target band come from?', 'আপনার target band কোথা থেকে আসে?'),
      options: [
        l('The official requirement of the university you apply to', 'আপনি যে university-তে apply করবেন তার official requirement'),
        l('The band your friend got', 'আপনার বন্ধু যত band পেয়েছেন'),
        l('Always 9, to be safe', 'নিরাপদ থাকতে সবসময় 9'),
      ],
      answer: 0,
      pattern: l('Why IELTS = proof of English for your university. Goal = the band in the official requirement + the date you need it.', 'কেন IELTS = university-র জন্য English-এর প্রমাণ। লক্ষ্য = official requirement-এর band + যে তারিখে লাগবে।'),
    },
    {
      kind: 'ielts',
      title: l('How this shapes your preparation', 'এটা আপনার প্রস্তুতি কীভাবে ঠিক করে'),
      uses: [
        { skill: 'reading', example: 'A course page: "IELTS Academic 6.5, no band below 6.0".', note: l('Read requirements carefully — you will learn how in a later lesson.', 'Requirement মন দিয়ে পড়ুন — কীভাবে, পরের একটা lesson-এ শিখবেন।') },
        { skill: 'writing', example: 'University assignments need clear academic writing.', note: l('Academic Writing is practice for your degree too.', 'Academic Writing আপনার degree-র জন্যও practice।') },
        { skill: 'listening', example: 'Lectures and seminars are in English.', note: l('Listening practice helps you at university.', 'Listening practice university-তে কাজে লাগে।') },
        { skill: 'speaking', example: 'Seminars and group work need you to explain your ideas.', note: l('Speaking practice prepares you for class discussions.', 'Speaking practice class-এর আলোচনার জন্য তৈরি করে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'সাধারণ ভুল'),
      items: [
        { wrong: '"I will take IELTS first and choose a university later."', right: 'Check the requirement of your target universities first.', why: l('The requirement tells you the band to aim for.', 'Requirement বলে দেয় কত band-এর লক্ষ্য রাখবেন।') },
        { wrong: '"I will book the test the week before my deadline."', right: 'Leave time for the result and, if needed, a second attempt.', why: l('Plan backwards from the deadline.', 'শেষ তারিখ থেকে পেছনে পরিকল্পনা করুন।') },
        { wrong: '"Everyone needs band 7."', right: 'Each university and course sets its own band.', why: l('Your target comes from your requirement.', 'আপনার target আসে আপনার requirement থেকে।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ib-11-p1', W, { ...P, prompt: l('Why do universities abroad ask for IELTS Academic?', 'বিদেশের university কেন IELTS Academic চায়?'), options: ['As proof that your English is ready for study', 'To test your maths', 'To check your school grades'], answer: 'As proof that your English is ready for study', explanation: l('Proof of English for lectures, reading and writing.', 'Lecture, পড়া আর লেখার জন্য English-এর প্রমাণ।') }),
        choice('ib-11-p2', W, { ...P, prompt: l('Where do you find the band you need?', 'কত band লাগবে কোথায় পাবেন?'), options: ['On the university’s official requirement page', 'In a social media group', 'On the IELTS certificate of a friend'], answer: 'On the university’s official requirement page', explanation: l('The official page decides.', 'Official page-ই ঠিক করে।') }),
        choice('ib-11-p3', W, { ...P, prompt: l('Your deadline is in March. When should you plan to take IELTS?', 'আপনার শেষ তারিখ March-এ। কখন IELTS দেওয়ার পরিকল্পনা করবেন?'), options: ['A few months before, leaving time for the result', 'The day before the deadline', 'After the deadline'], answer: 'A few months before, leaving time for the result', explanation: l('Work backwards from the deadline.', 'শেষ তারিখ থেকে পেছনে হিসাব করুন।') }),
        choice('ib-11-p4', W, { ...P, prompt: l('Which is a real reason to take IELTS Academic?', 'IELTS Academic দেওয়ার আসল কারণ কোনটা?'), options: ['A university asks for it in the application', 'It replaces your HSC result', 'It is needed to open a bank account at home'], answer: 'A university asks for it in the application', explanation: l('Admission requirements are the main reason.', 'Admission requirement-ই মূল কারণ।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('ib-11-r1', W, { ...P, prompt: l('Write the missing word.', 'বাদ পড়া word লিখুন।'), sentence: 'An IELTS result is ___ that your English is ready.', accepted: ['proof', 'evidence'], explanation: l('Proof of English.', 'English-এর প্রমাণ।') }),
        gap('ib-11-r2', W, { ...P, prompt: l('Write the version (one word).', 'Version লিখুন (একটা word)।'), sentence: 'For a bachelor’s degree abroad, you usually need IELTS ___.', accepted: ['Academic'], explanation: l('IELTS Academic.', 'IELTS Academic।') }),
        correct('ib-11-r3', W, { ...P, prompt: l('Correct the plan.', 'Plan-টা ঠিক করুন।'), sentence: 'Every university needs the same band.', accepted: ['Every university sets its own band.', 'Each university sets its own band.', 'Each university needs a different band.', 'Every university needs a different band.'], explanation: l('Each university sets its own requirement.', 'প্রতিটা university নিজের requirement ঠিক করে।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        order('ib-11-c1', W, { ...P, prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Check the requirement before you book.', explanation: l('Requirement first, then booking.', 'আগে requirement, তারপর booking।') }),
        spot('ib-11-c2', W, { ...P, prompt: l('One word makes this advice wrong. Tap it and fix it.', 'একটা word পরামর্শটা ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Take IELTS after the application deadline.', wrong: 'after', accepted: ['before'], fixOptions: ['before', 'on', 'during'], explanation: l('Take it before the deadline, leaving time for the result.', 'Result-এর সময় রেখে শেষ তারিখের আগে দিন।') }),
        choice('ib-11-c3', W, { ...P, prompt: l('Which goal is the clearest?', 'কোন লক্ষ্যটা সবচেয়ে পরিষ্কার?'), options: ['IELTS Academic 6.5 by January for a BSc in Canada', 'Get good at English one day', 'Band 9 in every skill'], answer: 'IELTS Academic 6.5 by January for a BSc in Canada', explanation: l('A band, a date and a purpose.', 'একটা band, একটা তারিখ আর একটা উদ্দেশ্য।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your goal', 'এবার আপনার পালা: আপনার লক্ষ্য'),
      exercises: [
        write('ib-11-y1', W, {
          ...P,
          prompt: l('Write 2–3 sentences: why you need IELTS, what you want to study and when you need the result.', '২–৩টা sentence লিখুন: কেন IELTS লাগবে, কী পড়তে চান আর কখন result লাগবে।'),
          model: 'I need IELTS Academic because I want to study computer science in Australia. My target universities ask for 6.5 overall. I need my result before their deadline in October.',
          task: 'The student explains why they need IELTS, what they want to study and when they need the result. Judge the IELTS facts first, then grammar only where it blocks meaning. Facts: universities abroad usually ask for IELTS Academic as proof of English; each university and course sets its own band; students should check the official requirement and plan backwards from the application deadline. Praise a specific goal (band, date, purpose). Never state fees, dates or specific institution requirements as facts.',
          target: l('Why you need IELTS', 'IELTS কেন লাগে'),
          checklist: [l('Your purpose (what and where you want to study)', 'আপনার উদ্দেশ্য (কী আর কোথায় পড়তে চান)'), l('The band or requirement you will check', 'যে band বা requirement দেখবেন'), l('When you need the result', 'কখন result লাগবে')],
          explanation: l('Purpose, band, date.', 'উদ্দেশ্য, band, তারিখ।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Universities ask for IELTS Academic as proof that your English is ready.', 'University IELTS Academic চায় — আপনার English তৈরি, তার প্রমাণ হিসেবে।'),
        l('Your target band comes from the official requirement of your university.', 'আপনার target band আসে আপনার university-র official requirement থেকে।'),
        l('Plan backwards from the deadline: deadline → test date → study plan.', 'শেষ তারিখ থেকে পেছনে পরিকল্পনা: শেষ তারিখ → test-এর তারিখ → study plan।'),
      ],
    },
  ],
};

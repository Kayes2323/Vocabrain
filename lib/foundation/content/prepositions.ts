import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Prepositions (Foundation module 6), the six concept lessons in the v2
 * (problem-first) format, easy → hard:
 * pr-1 time: in / on / at (and no preposition with this / next / last / every)
 * pr-2 time spans: for, since, during, by, until, from … to, ago
 * pr-3 place: in / on / at
 * pr-4 movement: to, into, from, through, across, towards; arrive in / at; go home
 * pr-5 word partners: interested in, depend on, responsible for, discuss (none)…
 * pr-6 data: rise by / to, peak at, from … to, between … and, an increase in / of
 * Bangla shows time and place with one ending (ঢাকায়, সোমবারে, পাঁচটায়) where
 * English needs in, on or at, so every lesson names why Bangla speakers slip.
 * The Parts of Speech unit (ppp-1…ppp-3) is the short introduction; this
 * module goes deeper with new sentences. Original Mino content.
 */

export const PREPOSITION_CONCEPTS: Concept[] = [
  { id: 'prep-time', title: l('Time: in, on, at', 'সময়: in, on, at'), lessonId: 'pr-1', tag: 'preposition' },
  { id: 'prep-duration', title: l('Time spans: for, since, during, by, until', 'সময়কাল: for, since, during, by, until'), lessonId: 'pr-2', tag: 'preposition' },
  { id: 'prep-place', title: l('Place: in, on, at', 'জায়গা: in, on, at'), lessonId: 'pr-3', tag: 'preposition' },
  { id: 'prep-movement', title: l('Movement: to, into, through, across', 'চলাচল: to, into, through, across'), lessonId: 'pr-4', tag: 'preposition' },
  { id: 'prep-partner', title: l('Word partners: depend on, interested in', 'Word partner: depend on, interested in'), lessonId: 'pr-5', tag: 'preposition' },
  { id: 'prep-data', title: l('Prepositions for data: by, to, at, from … to', 'Data-র preposition: by, to, at, from … to'), lessonId: 'pr-6', tag: 'preposition' },
];

const P = { tag: 'preposition' as const };

// ======================================================================= pr-1
export const prepTime: Lesson = {
  id: 'pr-1',
  format: 'v2',
  concept: 'prep-time',
  title: l('Time: in, on or at?', 'সময়: in, on নাকি at?'),
  why: l('"On 2019", "in Monday", "at the morning" — small words, but they show up in every Speaking Part 1 answer and every Task 1 report.', '"On 2019", "in Monday", "at the morning" — ছোট word, কিন্তু প্রতিটা Speaking Part 1 উত্তর আর Task 1 report-এ আসে।'),
  minutes: 9,
  difficulty: 'easy',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Speaking Part 1: your birthday', 'Speaking Part 1: আপনার জন্মদিন'),
      situation: l('The examiner asks when your birthday is. You say: "I was born ___ 2004, ___ 12 March, ___ six in the morning."', 'Examiner জানতে চাইলেন আপনার জন্মদিন কবে। আপনি বললেন: "I was born ___ 2004, ___ 12 March, ___ six in the morning."'),
      question: l('Which set fills the gaps?', 'কোন set-টা gap-এ বসবে?'),
      options: ['in · on · at', 'on · in · at', 'in · in · in'],
      answer: 'in · on · at',
      diagnose: {
        'in · on · at': l('Right. A year → in 2004; a date → on 12 March; a clock time → at six.', 'ঠিক। বছর → in 2004; তারিখ → on 12 March; ঘড়ির সময় → at six।'),
        'on · in · at': l('"at six" is right. But years take in (in 2004), and dates take on (on 12 March).', '"at six" ঠিক। কিন্তু বছরে in (in 2004), আর তারিখে on (on 12 March)।'),
        'in · in · in': l('Very common for Bangla speakers: Bangla uses one ending (২০০৪-এ, ১২ মার্চে, ছয়টায়). English needs three: in 2004, on 12 March, at six.', 'বাংলাভাষীদের খুব পরিচিত ভুল: বাংলায় একটাই ending (২০০৪-এ, ১২ মার্চে, ছয়টায়)। English-এ তিনটা লাগে: in 2004, on 12 March, at six।'),
      },
    },
    {
      kind: 'discover',
      title: l('Big, medium, small', 'বড়, মাঝারি, ছোট'),
      items: [
        { en: 'in 2020 · in March · in summer · in the 1990s', note: l('long periods → in', 'লম্বা সময় → in') },
        { en: 'on Friday · on 21 February · on my birthday · on Eid day', note: l('one day → on', 'একটা দিন → on') },
        { en: 'at 7 pm · at noon · at night · at the moment', note: l('a point in time → at', 'সময়ের একটা বিন্দু → at') },
      ],
      question: l('What decides in, on or at?', 'in, on নাকি at — কী ঠিক করে?'),
      options: [
        l('How big the time is: long period → in, one day → on, exact point → at', 'সময়টা কত বড়: লম্বা সময় → in, একটা দিন → on, নির্দিষ্ট বিন্দু → at'),
        l('Whether the time is in the past or future', 'সময়টা অতীত নাকি ভবিষ্যৎ'),
        l('How formal the sentence is', 'Sentence কতটা formal'),
      ],
      answer: 0,
      pattern: l('Think of a triangle: in (the biggest: years, months, seasons) → on (days and dates) → at (the smallest: clock times, night, noon).', 'একটা ত্রিভুজ ভাবুন: in (সবচেয়ে বড়: বছর, মাস, ঋতু) → on (দিন আর তারিখ) → at (সবচেয়ে ছোট: ঘড়ির সময়, night, noon)।'),
    },
    {
      kind: 'concept',
      title: l('The rule and its exceptions', 'নিয়ম আর তার ব্যতিক্রম'),
      body: l(
        'Use in for longer periods (years, months, seasons, decades, parts of the day), on for single days and dates, and at for exact times and a few fixed phrases.',
        'লম্বা সময়ে (বছর, মাস, ঋতু, দশক, দিনের অংশ) in, একটা দিন বা তারিখে on, আর নির্দিষ্ট সময় ও কিছু fixed phrase-এ at।',
      ),
      points: [
        l('in: in 2010, in May, in winter, in the 21st century, in the morning / afternoon / evening.', 'in: in 2010, in May, in winter, in the 21st century, in the morning / afternoon / evening।'),
        l('on: on Sunday, on 16 December, on Independence Day, on Monday morning (a day + part of it → on).', 'on: on Sunday, on 16 December, on Independence Day, on Monday morning (দিন + তার অংশ → on)।'),
        l('at: at 8.30, at midnight, at noon, at night, at the weekend (British; American: on the weekend), at the same time, at the end of the month.', 'at: at 8.30, at midnight, at noon, at night, at the weekend (British; American: on the weekend), at the same time, at the end of the month।'),
        l('NOT with this / next / last / every / today / tomorrow / yesterday: "I went there last year" (not "in last year"), "See you next Friday" (not "on next Friday").', 'this / next / last / every / today / tomorrow / yesterday-এর সাথে preposition না: "I went there last year" ("in last year" না), "See you next Friday" ("on next Friday" না)।'),
        l('Why Bangla speakers slip: Bangla shows every time with the same ending — ২০২০-এ, সোমবারে, পাঁচটায় — so there is no habit of choosing. English makes you choose by the size of the time.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় সব সময় একই ending দিয়ে বোঝানো হয় — ২০২০-এ, সোমবারে, পাঁচটায় — তাই বেছে নেওয়ার অভ্যাস নেই। English-এ সময়ের আকার দেখে বেছে নিতে হয়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'Classes start at 9 am on weekdays.', note: l('clock time → at; days → on', 'ঘড়ির সময় → at; দিন → on') },
        { en: 'The monsoon usually begins in June.', note: l('a month → in', 'মাস → in') },
        { en: 'We visit our grandparents on Eid day.', note: l('a special day → on', 'বিশেষ দিন → on') },
        { en: 'I usually study at night, but last night I slept early.', note: l('at night · last night (no preposition)', 'at night · last night (preposition না)') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'I usually get up at six, but on Fridays I sleep until nine.', note: l('Part 1 routines: at + time, on + day.', 'Part 1 routine: at + সময়, on + দিন।') },
        { skill: 'writing', example: 'In 2015, the figure was 20%, but it doubled in the following decade.', note: l('Task 1: in + year / decade.', 'Task 1: in + বছর / দশক।') },
        { skill: 'listening', example: 'The appointment is on Tuesday the 14th at half past ten.', note: l('Form completion: on signals the date, at signals the time.', 'Form completion: on শুনলে তারিখ, at শুনলে সময়।') },
        { skill: 'reading', example: 'The bridge opened in the spring of 1998.', note: l('Reading: in + season / year helps you find dates fast.', 'Reading: in + ঋতু / বছর দেখে তারিখ দ্রুত খুঁজুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I was born on 2003.', right: 'I was born in 2003.', why: l('A year → in.', 'বছর → in।') },
        { wrong: 'The exam is in Sunday.', right: 'The exam is on Sunday.', why: l('A day → on.', 'দিন → on।') },
        { wrong: 'I will call you in next week.', right: 'I will call you next week.', why: l('No preposition before next / last / this / every.', 'next / last / this / every-এর আগে preposition না।') },
        { wrong: 'The shop closes in 10 pm.', right: 'The shop closes at 10 pm.', why: l('A clock time → at.', 'ঘড়ির সময় → at।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('pr-1-p1', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'Our flight leaves ___ 11.45 pm.', options: ['at', 'on', 'in'], answer: 'at', explanation: l('A clock time → at.', 'ঘড়ির সময় → at।'), why: { on: l('on is for days and dates, not clock times.', 'on দিন আর তারিখের জন্য, ঘড়ির সময়ের জন্য না।'), in: l('in is for longer periods (months, years).', 'in লম্বা সময়ের জন্য (মাস, বছর)।') } }),
        choice('pr-1-p2', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'Victory Day is celebrated ___ 16 December.', options: ['on', 'in', 'at'], answer: 'on', explanation: l('A date → on.', 'তারিখ → on।'), why: { in: l('"in December" alone takes in, but with the day number it becomes a date → on.', 'শুধু "in December"-এ in, কিন্তু দিনের সংখ্যা থাকলে সেটা তারিখ → on।'), at: l('at is for clock times.', 'at ঘড়ির সময়ের জন্য।') } }),
        choice('pr-1-p3', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'Mango season is ___ summer.', options: ['in', 'on', 'at'], answer: 'in', explanation: l('A season → in.', 'ঋতু → in।'), why: { on: l('Seasons are long periods, not single days.', 'ঋতু লম্বা সময়, একটা দিন না।'), at: l('at is for exact points in time.', 'at নির্দিষ্ট সময়-বিন্দুর জন্য।') } }),
        choice('pr-1-p4', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Choose the correct phrase.', 'সঠিক phrase বেছে নিন।'), sentence: 'I have a tutorial ___.', options: ['on Monday morning', 'in Monday morning', 'at Monday morning'], answer: 'on Monday morning', explanation: l('A day + part of the day → on.', 'দিন + দিনের অংশ → on।'), why: { 'in Monday morning': l('"in the morning" alone, but with a day name it becomes on.', 'শুধু "in the morning", কিন্তু দিনের নাম থাকলে on।'), 'at Monday morning': l('at is for clock times, not days.', 'at ঘড়ির সময়ের জন্য, দিনের জন্য না।') } }),
        choice('pr-1-p5', 'prep-time', { ...P, pattern: 'prep-extra', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['I moved to Dhaka last year.', 'I moved to Dhaka in last year.', 'I moved to Dhaka on last year.'], answer: 'I moved to Dhaka last year.', explanation: l('No preposition before last / next / this / every.', 'last / next / this / every-এর আগে preposition না।'), why: { 'I moved to Dhaka in last year.': l('"last year" already says when — no in.', '"last year" নিজেই সময় বলে — in না।'), 'I moved to Dhaka on last year.': l('No preposition before "last".', '"last"-এর আগে preposition না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('pr-1-r1', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Write in, on or at.', 'in, on বা at লিখুন।'), sentence: 'The results will be published ___ August.', accepted: ['in'], explanation: l('A month → in.', 'মাস → in।'), why: { on: l('on is for days and dates; a month alone takes in.', 'on দিন আর তারিখের জন্য; শুধু মাসে in।') } }),
        gap('pr-1-r2', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Write in, on or at.', 'in, on বা at লিখুন।'), sentence: 'I can’t sleep well ___ night when it is hot.', accepted: ['at'], explanation: l('A fixed phrase: at night (but in the morning).', 'Fixed phrase: at night (কিন্তু in the morning)।'), why: { in: l('We say "in the night" only for one particular night; the general phrase is "at night".', '"in the night" শুধু নির্দিষ্ট এক রাতের জন্য; সাধারণ phrase "at night"।') } }),
        correct('pr-1-r3', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Correct the sentence (one preposition).', 'Sentence-টা ঠিক করুন (একটা preposition)।'), sentence: 'My cousin’s wedding is in 5 January.', accepted: ['My cousin’s wedding is on 5 January.', "My cousin's wedding is on 5 January."], explanation: l('A date → on.', 'তারিখ → on।') }),
        spot('pr-1-r4', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('One preposition is wrong. Tap it and type the right one.', 'একটা preposition ভুল। সেটায় tap করে সঠিকটা লিখুন।'), sentence: 'The library is open until nine on the evening.', wrong: 'on', accepted: ['in'], explanation: l('A part of the day → in the evening.', 'দিনের অংশ → in the evening।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pr-1-c1', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Which sentence has NO preposition mistakes?', 'কোন sentence-এ preposition-এর কোনো ভুল নেই?'), options: ['I start work at eight in the morning, but on Fridays I start at ten.', 'I start work in eight at the morning, but in Fridays I start at ten.', 'I start work at eight on the morning, but at Fridays I start in ten.'], answer: 'I start work at eight in the morning, but on Fridays I start at ten.', explanation: l('at + clock time · in the morning · on + day.', 'at + ঘড়ির সময় · in the morning · on + দিন।') }),
        spot('pr-1-c2', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('One word breaks this Task 1 sentence. Tap it, then fix it.', 'একটা word Task 1 sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Sales reached a peak on 2018 and then fell.', wrong: 'on', accepted: ['in'], fixOptions: ['in', 'at', 'by'], explanation: l('A year → in 2018.', 'বছর → in 2018।') }),
        order('pr-1-c3', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'We usually go shopping on Friday evening.', explanation: l('A day + part of the day → on Friday evening.', 'দিন + দিনের অংশ → on Friday evening।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your weekly routine', 'এবার আপনার পালা: আপনার সাপ্তাহিক routine'),
      exercises: [
        write('pr-1-y1', 'prep-time', {
          ...P,
          prompt: l('Speaking Part 1: "What do you usually do at the weekend?" Write 3 sentences using in, on and at with times, days and parts of the day.', 'Speaking Part 1: "What do you usually do at the weekend?" সময়, দিন আর দিনের অংশ দিয়ে in, on আর at ব্যবহার করে ৩টা sentence লিখুন।'),
          model: 'On Fridays I get up late, at about ten. In the afternoon I play football with my friends. At night I usually watch a film with my family.',
          checklist: [l('at + clock time / night', 'at + ঘড়ির সময় / night'), l('on + day', 'on + দিন'), l('in the morning / afternoon / evening', 'in the morning / afternoon / evening')],
          explanation: l('Size of the time: in (long) → on (a day) → at (a point).', 'সময়ের আকার: in (লম্বা) → on (একটা দিন) → at (একটা বিন্দু)।'),
          task: 'The student writes 3 sentences about their weekend routine using time prepositions. Check prepositions of time only: in + years, months, seasons, decades and in the morning/afternoon/evening; on + days, dates and a day + part of the day (on Friday evening); at + clock times, night, noon, midnight, the weekend (British; "on the weekend" is American and also correct); no preposition before this/next/last/every/today/tomorrow. For each error, quote the phrase, say how big the time is, and give the fix.',
          target: l('in / on / at for time', 'সময়ের জন্য in / on / at'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('in = long periods (2020, May, summer, the morning).', 'in = লম্বা সময় (2020, May, summer, the morning)।'),
        l('on = one day (Friday, 16 December, my birthday, Monday morning).', 'on = একটা দিন (Friday, 16 December, my birthday, Monday morning)।'),
        l('at = a point (7 pm, noon, night). No preposition before this / next / last / every.', 'at = একটা বিন্দু (7 pm, noon, night)। this / next / last / every-এর আগে preposition না।'),
      ],
    },
  ],
};

// ======================================================================= pr-2
export const prepDuration: Lesson = {
  id: 'pr-2',
  format: 'v2',
  concept: 'prep-duration',
  title: l('Time spans: for, since, during, by, until', 'সময়কাল: for, since, during, by, until'),
  why: l('"I am studying English since three years" is one of the most common sentences examiners hear from Bangladeshi candidates.', '"I am studying English since three years" — বাংলাদেশি পরীক্ষার্থীদের কাছ থেকে examiner-রা সবচেয়ে বেশি এই sentence শোনেন।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Speaking Part 1: your studies', 'Speaking Part 1: আপনার পড়াশোনা'),
      situation: l('You say: "I have lived in Rajshahi ___ five years — ___ 2021. I will finish my degree ___ next June."', 'আপনি বললেন: "I have lived in Rajshahi ___ five years — ___ 2021. I will finish my degree ___ next June."'),
      question: l('Which set is correct?', 'কোন set-টা ঠিক?'),
      options: ['for · since · by', 'since · for · until', 'since · since · in'],
      answer: 'for · since · by',
      diagnose: {
        'for · since · by': l('Right. for + a length of time (five years) · since + the starting point (2021) · by + a deadline (no later than next June).', 'ঠিক। for + সময়ের দৈর্ঘ্য (five years) · since + শুরুর বিন্দু (2021) · by + শেষ সময়সীমা (next June-এর পরে না)।'),
        'since · for · until': l('These are reversed: "five years" is a length → for; "2021" is a starting point → since. And "by next June" means "no later than"; "until" would mean you keep finishing until then.', 'এগুলো উল্টো: "five years" দৈর্ঘ্য → for; "2021" শুরুর বিন্দু → since। আর "by next June" মানে "এর পরে না"; "until" মানে ততক্ষণ পর্যন্ত চলতে থাকা।'),
        'since · since · in': l('Bangla "থেকে" covers both, but English splits it: a length → for (five years), a starting point → since (2021). And "next June" takes no in: by next June.', 'বাংলা "থেকে" দুটোই বোঝায়, কিন্তু English আলাদা করে: দৈর্ঘ্য → for (five years), শুরুর বিন্দু → since (2021)। আর "next June"-এ in বসে না: by next June।'),
      },
    },
    {
      kind: 'discover',
      title: l('How long? From when? Until when?', 'কতক্ষণ? কবে থেকে? কবে পর্যন্ত?'),
      items: [
        { en: 'I have worked here for two years.', note: l('how long → for + length', 'কতক্ষণ → for + দৈর্ঘ্য') },
        { en: 'I have worked here since 2024.', note: l('from when → since + start point', 'কবে থেকে → since + শুরুর বিন্দু') },
        { en: 'The shop is open until 10 pm.', note: l('continues up to a time → until', 'একটা সময় পর্যন্ত চলে → until') },
        { en: 'Please send the form by Friday.', note: l('a deadline, no later than → by', 'শেষ সীমা, এর পরে না → by') },
        { en: 'I fell asleep during the film.', note: l('inside a period / event → during', 'একটা সময় / ঘটনার ভেতরে → during') },
      ],
      question: l('What is the difference between for and since?', 'for আর since-এর পার্থক্য কী?'),
      options: [
        l('for + a length of time; since + the point when it started', 'for + সময়ের দৈর্ঘ্য; since + যখন শুরু হয়েছিল সেই বিন্দু'),
        l('for is for the past, since is for the future', 'for অতীতের জন্য, since ভবিষ্যতের জন্য'),
        l('They mean the same', 'দুটোর মানে একই'),
      ],
      answer: 0,
      pattern: l('Ask the question the phrase answers: How long? → for. Since when? → since. Up to when? → until. No later than when? → by. When, inside which period? → during.', 'Phrase-টা কোন প্রশ্নের উত্তর দেয় জিজ্ঞেস করুন: কতক্ষণ? → for। কবে থেকে? → since। কবে পর্যন্ত? → until। কোন সময়ের মধ্যে (পরে না)? → by। কোন সময়ের ভেতরে? → during।'),
    },
    {
      kind: 'concept',
      title: l('Five words for time spans', 'সময়কালের পাঁচটা word'),
      body: l(
        'These prepositions describe a stretch of time, its start or its end. Choose by the question the phrase answers.',
        'এই preposition-গুলো একটা সময়কাল, তার শুরু বা শেষ বোঝায়। Phrase-টা কোন প্রশ্নের উত্তর দেয় তা দেখে বেছে নিন।',
      ),
      points: [
        l('for + length: for three years, for a week, for a long time. since + starting point: since 2019, since Monday, since I was a child. With since and for, use the present perfect for something still true: I have lived here since 2019.', 'for + দৈর্ঘ্য: for three years, for a week, for a long time। since + শুরুর বিন্দু: since 2019, since Monday, since I was a child। এখনো সত্য হলে since আর for-এর সাথে present perfect: I have lived here since 2019।'),
        l('during + a noun (an event or period): during the holidays, during the pandemic. NOT during + a length: "during three hours" ✗ → for three hours.', 'during + noun (ঘটনা বা সময়কাল): during the holidays, during the pandemic। দৈর্ঘ্যের সাথে না: "during three hours" ✗ → for three hours।'),
        l('until / till = continuing up to a time: I waited until six. by = no later than: Submit it by six. from … to / until: from 9 am to 5 pm; from 2010 to 2020.', 'until / till = একটা সময় পর্যন্ত চলতে থাকা: I waited until six। by = এর পরে না: Submit it by six। from … to / until: from 9 am to 5 pm; from 2010 to 2020।'),
        l('ago comes AFTER the length and needs the past simple: two years ago (not "before two years", not "since two years").', 'ago দৈর্ঘ্যের পরে বসে আর past simple লাগে: two years ago ("before two years" না, "since two years" না)।'),
        l('Why Bangla speakers slip: "থেকে" means both for and since ("তিন বছর থেকে", "২০১৯ থেকে"), and "আগে" comes before the number in Bangla thinking ("দুই বছর আগে" → "before two years"). English splits these jobs.', 'বাংলাভাষীরা কেন ভুল করে: "থেকে" for আর since দুটোই বোঝায় ("তিন বছর থেকে", "২০১৯ থেকে"), আর "আগে" অনুবাদ করতে গিয়ে "before two years" হয়ে যায়। English-এ এই কাজগুলো আলাদা।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'My father has been a teacher for twenty years.', note: l('length → for', 'দৈর্ঘ্য → for') },
        { en: 'The road has been closed since the flood.', note: l('starting event → since', 'শুরুর ঘটনা → since') },
        { en: 'Many shops close during Ramadan afternoons.', note: l('inside a period → during', 'একটা সময়ের ভেতরে → during') },
        { en: 'I finished school three years ago.', note: l('length + ago, past simple', 'দৈর্ঘ্য + ago, past simple') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'I have been learning English since I was eight — so for about twelve years.', note: l('Part 1: since + start, for + length.', 'Part 1: since + শুরু, for + দৈর্ঘ্য।') },
        { skill: 'writing', example: 'Car ownership rose steadily from 2000 to 2010 and remained stable during the next decade.', note: l('Task 1: from … to, during.', 'Task 1: from … to, during।') },
        { skill: 'listening', example: 'You need to pay the deposit by the end of the month.', note: l('Listening: by = a deadline — a typical answer detail.', 'Listening: by = শেষ সময়সীমা — একটা typical answer detail।') },
        { skill: 'reading', example: 'The factory has operated continuously since 1952.', note: l('Reading: since tells you when something started.', 'Reading: since বলে কবে শুরু হয়েছিল।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I have lived here since five years.', right: 'I have lived here for five years.', why: l('A length → for.', 'দৈর্ঘ্য → for।') },
        { wrong: 'I came to Dhaka before two years.', right: 'I came to Dhaka two years ago.', why: l('length + ago.', 'দৈর্ঘ্য + ago।') },
        { wrong: 'I slept during three hours.', right: 'I slept for three hours.', why: l('during + event; for + length.', 'during + ঘটনা; for + দৈর্ঘ্য।') },
        { wrong: 'You must submit the essay until Monday.', right: 'You must submit the essay by Monday.', why: l('A deadline → by.', 'শেষ সীমা → by।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('pr-2-p1', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'We have known each other ___ ten years.', options: ['for', 'since', 'during'], answer: 'for', explanation: l('A length of time → for.', 'সময়ের দৈর্ঘ্য → for।'), why: { since: l('since needs a starting point (since 2016), not a length.', 'since-এর সাথে শুরুর বিন্দু লাগে (since 2016), দৈর্ঘ্য না।'), during: l('during needs an event or period (during school), not a length.', 'during-এর সাথে ঘটনা বা সময়কাল লাগে (during school), দৈর্ঘ্য না।') } }),
        choice('pr-2-p2', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'She has been ill ___ last Thursday.', options: ['since', 'for', 'from'], answer: 'since', explanation: l('A starting point → since.', 'শুরুর বিন্দু → since।'), why: { for: l('"last Thursday" is a point, not a length.', '"last Thursday" একটা বিন্দু, দৈর্ঘ্য না।'), from: l('from needs an end (from … to); for "until now" use since.', 'from-এর সাথে শেষ লাগে (from … to); "এখন পর্যন্ত" বোঝাতে since।') } }),
        choice('pr-2-p3', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'The electricity went off ___ the storm.', options: ['during', 'for', 'since'], answer: 'during', explanation: l('Inside an event → during.', 'একটা ঘটনার ভেতরে → during।'), why: { for: l('for needs a length (for an hour).', 'for-এর সাথে দৈর্ঘ্য লাগে (for an hour)।'), since: l('since means "from then until now".', 'since মানে "তখন থেকে এখন পর্যন্ত"।') } }),
        choice('pr-2-p4', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'Applications must reach the office ___ 30 June.', options: ['by', 'until', 'since'], answer: 'by', explanation: l('A deadline (no later than) → by.', 'শেষ সীমা (এর পরে না) → by।'), why: { until: l('until = something continues up to a time; a deadline takes by.', 'until = একটা সময় পর্যন্ত চলতে থাকা; শেষ সীমায় by।'), since: l('since looks back to a start point.', 'since শুরুর বিন্দুর দিকে দেখে।') } }),
        choice('pr-2-p5', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['I visited Cox’s Bazar three years ago.', 'I visited Cox’s Bazar before three years.', 'I visited Cox’s Bazar since three years.'], answer: 'I visited Cox’s Bazar three years ago.', explanation: l('length + ago, with the past simple.', 'দৈর্ঘ্য + ago, past simple-এর সাথে।'), why: { 'I visited Cox’s Bazar before three years.': l('"before three years" is a translation of "তিন বছর আগে"; English says "three years ago".', '"before three years" হলো "তিন বছর আগে"-র অনুবাদ; English-এ "three years ago"।'), 'I visited Cox’s Bazar since three years.': l('since needs a starting point and the present perfect.', 'since-এর সাথে শুরুর বিন্দু আর present perfect লাগে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('pr-2-r1', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Write for or since.', 'for বা since লিখুন।'), sentence: 'I have been waiting here ___ 4 o’clock.', accepted: ['since'], explanation: l('4 o’clock is a starting point → since.', '4 o’clock শুরুর বিন্দু → since।'), why: { for: l('for needs a length (for an hour).', 'for-এর সাথে দৈর্ঘ্য লাগে (for an hour)।') } }),
        gap('pr-2-r2', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Write the missing preposition.', 'বাদ পড়া preposition লিখুন।'), sentence: 'The museum is open ___ 9 am to 5 pm.', accepted: ['from'], explanation: l('from … to.', 'from … to।') }),
        correct('pr-2-r3', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Correct the sentence (one preposition).', 'Sentence-টা ঠিক করুন (একটা preposition)।'), sentence: 'I have studied English since six years.', accepted: ['I have studied English for six years.'], explanation: l('A length → for.', 'দৈর্ঘ্য → for।') }),
        spot('pr-2-r4', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('One preposition is wrong. Tap it and type the right one.', 'একটা preposition ভুল। সেটায় tap করে সঠিকটা লিখুন।'), sentence: 'Nobody spoke during two hours.', wrong: 'during', accepted: ['for'], explanation: l('A length → for two hours.', 'দৈর্ঘ্য → for two hours।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pr-2-c1', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('"I will stay until Friday" vs "I will leave by Friday". Which is true?', '"I will stay until Friday" বনাম "I will leave by Friday"। কোনটা সত্যি?'), options: ['until = I stay up to Friday; by = I leave on or before Friday', 'They mean the same', 'by is only for places'], answer: 'until = I stay up to Friday; by = I leave on or before Friday', explanation: l('until = continuing; by = a deadline.', 'until = চলতে থাকা; by = শেষ সীমা।') }),
        spot('pr-2-c2', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Prices have not changed for 2022.', wrong: 'for', accepted: ['since'], fixOptions: ['since', 'during', 'by'], explanation: l('2022 is a starting point → since.', '2022 শুরুর বিন্দু → since।') }),
        order('pr-2-c3', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'I have lived in this flat since I was ten.', explanation: l('since + a starting point (a clause).', 'since + শুরুর বিন্দু (একটা clause)।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: how long?', 'এবার আপনার পালা: কতদিন ধরে?'),
      exercises: [
        write('pr-2-y1', 'prep-duration', {
          ...P,
          prompt: l('Speaking Part 1: "How long have you been learning English?" Write 3 sentences using for, since and ago (or during).', 'Speaking Part 1: "How long have you been learning English?" for, since আর ago (বা during) ব্যবহার করে ৩টা sentence লিখুন।'),
          model: 'I have been learning English since I was in class three, so for about ten years. I started IELTS classes six months ago. During the holidays I practise speaking with my cousin.',
          checklist: [l('for + a length', 'for + দৈর্ঘ্য'), l('since + a starting point', 'since + শুরুর বিন্দু'), l('length + ago (past simple)', 'দৈর্ঘ্য + ago (past simple)')],
          explanation: l('How long → for · since when → since · how long before now → ago.', 'কতক্ষণ → for · কবে থেকে → since · এখন থেকে কত আগে → ago।'),
          task: 'The student writes 3 sentences about how long they have been learning English. Check time-span prepositions only: for + a length (for ten years), since + a starting point (since 2019, since I was eight), during + an event or period (during the holidays, never + a length), until = continuing up to a time, by = a deadline, from … to, and length + ago with the past simple (never "before two years"). For each error, quote the phrase, say which question it answers (how long / since when / up to when / deadline) and give the fix. Do not correct tense unless it breaks the for/since meaning.',
          target: l('for, since, ago, during', 'for, since, ago, during'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('How long? → for · Since when? → since · Up to when? → until · Deadline? → by.', 'কতক্ষণ? → for · কবে থেকে? → since · কবে পর্যন্ত? → until · শেষ সীমা? → by।'),
        l('during + an event (during the exam), never + a length.', 'during + ঘটনা (during the exam), দৈর্ঘ্যের সাথে কখনো না।'),
        l('three years ago — never "before three years".', 'three years ago — কখনো "before three years" না।'),
      ],
    },
  ],
};

// ======================================================================= pr-3
export const prepPlace: Lesson = {
  id: 'pr-3',
  format: 'v2',
  concept: 'prep-place',
  title: l('Place: in, on or at?', 'জায়গা: in, on নাকি at?'),
  why: l('"I live at Dhaka", "on the bus" or "in the bus"? Place prepositions appear in every Part 1 answer about your home, work or studies.', '"I live at Dhaka", "on the bus" নাকি "in the bus"? বাড়ি, কাজ বা পড়াশোনা নিয়ে প্রতিটা Part 1 উত্তরে জায়গার preposition আসে।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Speaking Part 1: where you live', 'Speaking Part 1: আপনি কোথায় থাকেন'),
      situation: l('You say: "I live ___ Mirpur, ___ a flat ___ the fourth floor. My brother is ___ university today."', 'আপনি বললেন: "I live ___ Mirpur, ___ a flat ___ the fourth floor. My brother is ___ university today."'),
      question: l('Which set is correct?', 'কোন set-টা ঠিক?'),
      options: ['in · in · on · at', 'at · in · in · in', 'in · on · at · on'],
      answer: 'in · in · on · at',
      diagnose: {
        'in · in · on · at': l('Right. in an area / city · in a flat (inside) · on a floor (a level) · at university (a place where we do an activity).', 'ঠিক। in এলাকা / শহর · in a flat (ভেতরে) · on a floor (একটা স্তর) · at university (যেখানে একটা কাজ হয়)।'),
        'at · in · in · in': l('Areas and cities take in (in Mirpur), floors take on (on the fourth floor), and "at university" means he is there studying.', 'এলাকা আর শহরে in (in Mirpur), তলায় on (on the fourth floor), আর "at university" মানে সে সেখানে পড়াশোনা করছে।'),
        'in · on · at · on': l('"in Mirpur" is right. A flat is a space you are inside → in; a floor is a level → on; "at university" is the fixed phrase.', '"in Mirpur" ঠিক। Flat একটা জায়গা যার ভেতরে আছেন → in; floor একটা স্তর → on; "at university" fixed phrase।'),
      },
    },
    {
      kind: 'discover',
      title: l('Inside, on a surface, at a point', 'ভেতরে, উপরিতলে, একটা বিন্দুতে'),
      items: [
        { en: 'in the room · in Sylhet · in the box · in a car', note: l('inside a space or area → in', 'একটা জায়গা বা এলাকার ভেতরে → in') },
        { en: 'on the table · on the wall · on the second floor · on the bus', note: l('on a surface or level → on', 'উপরিতল বা স্তরে → on') },
        { en: 'at the door · at the bus stop · at home · at work', note: l('a point, or a place for an activity → at', 'একটা বিন্দু, বা কাজের জায়গা → at') },
      ],
      question: l('What decides in, on or at for places?', 'জায়গার জন্য in, on নাকি at — কী ঠিক করে?'),
      options: [
        l('How we see the place: a space around us → in, a surface → on, a point or activity place → at', 'জায়গাটা কীভাবে দেখছি: চারপাশে জায়গা → in, উপরিতল → on, বিন্দু বা কাজের জায়গা → at'),
        l('How big the place is in kilometres', 'জায়গাটা কত কিলোমিটার বড়'),
        l('Whether the place is in Bangladesh or abroad', 'জায়গাটা বাংলাদেশে নাকি বিদেশে'),
      ],
      answer: 0,
      pattern: l('in = inside (a room, a city, a country) · on = on a surface or level (a table, a floor, a page) · at = a point or where an activity happens (at the station, at school, at home).', 'in = ভেতরে (ঘর, শহর, দেশ) · on = উপরিতল বা স্তরে (টেবিল, তলা, পাতা) · at = একটা বিন্দু বা যেখানে কাজ হয় (at the station, at school, at home)।'),
    },
    {
      kind: 'concept',
      title: l('Place prepositions and fixed phrases', 'জায়গার preposition আর fixed phrase'),
      body: l(
        'Use in for enclosed spaces and areas (rooms, buildings seen from inside, cities, countries), on for surfaces, lines and levels, and at for points and places where an activity happens.',
        'বন্ধ জায়গা আর এলাকায় (ঘর, ভেতর থেকে দেখা building, শহর, দেশ) in, উপরিতল, রেখা আর স্তরে on, আর বিন্দু ও কাজের জায়গায় at।',
      ),
      points: [
        l('in: in Bangladesh, in Chattogram, in the kitchen, in a queue, in the picture, in the newspaper, in a car / taxi.', 'in: in Bangladesh, in Chattogram, in the kitchen, in a queue, in the picture, in the newspaper, in a car / taxi।'),
        l('on: on the floor, on the second floor, on the page, on the map, on the road, on a bus / train / plane (large transport you can walk in), on the left / right.', 'on: on the floor, on the second floor, on the page, on the map, on the road, on a bus / train / plane (বড় যানবাহন যার ভেতরে হাঁটা যায়), on the left / right।'),
        l('at: at home, at work, at school, at university, at the airport, at the meeting, at the top / bottom, at 25 Green Road (an exact address).', 'at: at home, at work, at school, at university, at the airport, at the meeting, at the top / bottom, at 25 Green Road (নির্দিষ্ট ঠিকানা)।'),
        l('NOT "at Dhaka" for where you live: cities and countries take in (I live in Dhaka). "at" a city only as a stop on a journey (The train stops at Tongi).', '"at Dhaka" না, থাকার জায়গা বোঝাতে: শহর আর দেশে in (I live in Dhaka)। যাত্রার একটা stop হলে শুধু তখন at (The train stops at Tongi)।'),
        l('Why Bangla speakers slip: one Bangla ending (-এ / -তে) covers all three — ঘরে, টেবিলে, স্টেশনে — so English in / on / at has to be chosen by the shape of the place.', 'বাংলাভাষীরা কেন ভুল করে: বাংলার একটা ending (-এ / -তে) তিনটাই বোঝায় — ঘরে, টেবিলে, স্টেশনে — তাই English-এ জায়গার ধরন দেখে in / on / at বেছে নিতে হয়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'My keys are on the table in the kitchen.', note: l('surface → on; room → in', 'উপরিতল → on; ঘর → in') },
        { en: 'I’ll meet you at the bus stop at five.', note: l('a point → at', 'একটা বিন্দু → at') },
        { en: 'She read about it on the university website.', note: l('websites, pages → on', 'website, পাতা → on') },
        { en: 'There were a lot of people on the train but few in my taxi.', note: l('train → on; taxi / car → in', 'train → on; taxi / car → in') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'I live in a small town in the north of Bangladesh, and I study at a local college.', note: l('Part 1: in + town / area, at + college.', 'Part 1: in + শহর / এলাকা, at + college।') },
        { skill: 'writing', example: 'The kitchen is on the left, and there is a garden at the back of the house.', note: l('Task 1 maps and plans: on the left, at the back, in the centre.', 'Task 1 map আর plan: on the left, at the back, in the centre।') },
        { skill: 'listening', example: 'The reception is on the ground floor, at the end of the corridor.', note: l('Listening maps: on + floor, at + end / corner.', 'Listening map: on + floor, at + end / corner।') },
        { skill: 'reading', example: 'The results were published in a scientific journal.', note: l('Reading: in a journal / book / report.', 'Reading: in a journal / book / report।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I live at Khulna.', right: 'I live in Khulna.', why: l('A city where you live → in.', 'যে শহরে থাকেন → in।') },
        { wrong: 'My office is in the fifth floor.', right: 'My office is on the fifth floor.', why: l('A floor is a level → on.', 'Floor একটা স্তর → on।') },
        { wrong: 'He is in home now.', right: 'He is at home now.', why: l('Fixed phrase: at home.', 'Fixed phrase: at home।') },
        { wrong: 'I saw your photo in Facebook.', right: 'I saw your photo on Facebook.', why: l('Websites, apps, pages → on.', 'Website, app, পাতা → on।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('pr-3-p1', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'My uncle lives ___ Canada.', options: ['in', 'at', 'on'], answer: 'in', explanation: l('A country → in.', 'দেশ → in।'), why: { at: l('at is for points and activity places, not countries.', 'at বিন্দু আর কাজের জায়গার জন্য, দেশের জন্য না।'), on: l('on is for surfaces and levels.', 'on উপরিতল আর স্তরের জন্য।') } }),
        choice('pr-3-p2', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'There is a clock ___ the wall.', options: ['on', 'in', 'at'], answer: 'on', explanation: l('A surface → on.', 'উপরিতল → on।'), why: { in: l('The clock is not inside the wall; it is on its surface.', 'Clock-টা দেয়ালের ভেতরে না; উপরিতলে।'), at: l('at is for a point (at the door), not a surface.', 'at একটা বিন্দুর জন্য (at the door), উপরিতলের জন্য না।') } }),
        choice('pr-3-p3', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'Please wait for me ___ the main gate.', options: ['at', 'in', 'on'], answer: 'at', explanation: l('A meeting point → at.', 'দেখা করার বিন্দু → at।'), why: { in: l('You are not inside the gate.', 'আপনি গেটের ভেতরে না।'), on: l('on the gate would mean on its surface.', 'on the gate মানে গেটের উপরিতলে।') } }),
        choice('pr-3-p4', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('Choose the correct pair.', 'সঠিক জোড়া বেছে নিন।'), sentence: 'I read the news ___ my phone while I was ___ the bus.', options: ['on · on', 'in · in', 'at · in'], answer: 'on · on', explanation: l('on a phone / screen · on a bus (large transport).', 'on a phone / screen · on a bus (বড় যানবাহন)।'), why: { 'in · in': l('Screens and buses both take on.', 'Screen আর bus দুটোতেই on।'), 'at · in': l('at is not used for a phone, and a bus takes on.', 'phone-এ at বসে না, আর bus-এ on।') } }),
        choice('pr-3-p5', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['She is at work, and her children are at school.', 'She is in work, and her children are in the school.', 'She is at the work, and her children are on school.'], answer: 'She is at work, and her children are at school.', explanation: l('Fixed phrases for activity places: at work, at school.', 'কাজের জায়গার fixed phrase: at work, at school।'), why: { 'She is in work, and her children are in the school.': l('The fixed phrases are "at work" and "at school" (they are there to work / study).', 'Fixed phrase হলো "at work" আর "at school" (সেখানে কাজ / পড়াশোনা করছে)।'), 'She is at the work, and her children are on school.': l('The fixed phrases have no "the" (at work), and school takes at, not on.', 'Fixed phrase-এ "the" নেই (at work), আর school-এ at, on না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('pr-3-r1', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('Write in, on or at.', 'in, on বা at লিখুন।'), sentence: 'My flat is ___ the third floor.', accepted: ['on'], explanation: l('A floor → on.', 'Floor → on।'), why: { in: l('A floor is a level, not a space around you → on.', 'Floor একটা স্তর, চারপাশের জায়গা না → on।') } }),
        gap('pr-3-r2', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('Write in, on or at.', 'in, on বা at লিখুন।'), sentence: 'I usually stay ___ home on Fridays.', accepted: ['at'], explanation: l('Fixed phrase: at home.', 'Fixed phrase: at home।'), why: { in: l('We say "at home" (and "in the house").', 'আমরা বলি "at home" (আর "in the house")।') } }),
        correct('pr-3-r3', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('Correct the sentence (one preposition).', 'Sentence-টা ঠিক করুন (একটা preposition)।'), sentence: 'My cousin studies at Australia.', accepted: ['My cousin studies in Australia.'], explanation: l('A country → in.', 'দেশ → in।') }),
        spot('pr-3-r4', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('One preposition is wrong. Tap it and type the right one.', 'একটা preposition ভুল। সেটায় tap করে সঠিকটা লিখুন।'), sentence: 'The answer is in page 42 of the book.', wrong: 'in', accepted: ['on'], explanation: l('A page → on page 42.', 'পাতা → on page 42।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pr-3-c1', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('"The train stops at Tongi" but "I live in Tongi". Why?', '"The train stops at Tongi" কিন্তু "I live in Tongi"। কেন?'), options: ['A stop on a journey is a point → at; where you live is an area → in', 'Tongi is a small town, so both are wrong', 'at is for trains only'], answer: 'A stop on a journey is a point → at; where you live is an area → in', explanation: l('The same place can be a point or an area.', 'একই জায়গা বিন্দু বা এলাকা হতে পারে।') }),
        spot('pr-3-c2', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('One word breaks this Task 1 sentence. Tap it, then fix it.', 'একটা word Task 1 sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'A new car park was built in the north side of the village.', wrong: 'in', accepted: ['on'], fixOptions: ['on', 'at', 'to'], explanation: l('on the north / south / east / west side of.', 'on the north / south / east / west side of।') }),
        order('pr-3-c3', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'The library is on the left at the end of the street.', explanation: l('on the left · at the end of.', 'on the left · at the end of।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your home', 'এবার আপনার পালা: আপনার বাসা'),
      exercises: [
        write('pr-3-y1', 'prep-place', {
          ...P,
          prompt: l('Speaking Part 1: "Describe the place where you live." Write 3 sentences using in, on and at (city / area, floor / street, a nearby point).', 'Speaking Part 1: "Describe the place where you live." in, on আর at ব্যবহার করে ৩টা sentence লিখুন (শহর / এলাকা, তলা / রাস্তা, কাছের একটা বিন্দু)।'),
          model: 'I live in a busy area of Chattogram. Our flat is on the sixth floor of a new building. There is a small tea stall at the corner of our road.',
          checklist: [l('in + city / area / building', 'in + শহর / এলাকা / building'), l('on + floor / road / side', 'on + তলা / রাস্তা / দিক'), l('at + corner / stop / home / work', 'at + corner / stop / home / work')],
          explanation: l('Inside → in · surface or level → on · point or activity place → at.', 'ভেতরে → in · উপরিতল বা স্তর → on · বিন্দু বা কাজের জায়গা → at।'),
          task: 'The student writes 3 sentences describing where they live. Check place prepositions only: in + countries, cities, areas, rooms, enclosed spaces, cars/taxis; on + surfaces, floors of a building, roads/streets (on Green Road), sides (on the left), pages, screens, buses/trains/planes; at + points (at the corner, at the bus stop), exact addresses (at 12 Lake Road), and activity places (at home, at work, at school, at university). "live at + city" is wrong. For each error, quote the phrase, say whether the place is a space, a surface/level or a point, and give the fix.',
          target: l('in / on / at for place', 'জায়গার জন্য in / on / at'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('in = inside a space or area (in Dhaka, in the room, in a car).', 'in = জায়গা বা এলাকার ভেতরে (in Dhaka, in the room, in a car)।'),
        l('on = surface or level (on the table, on the 3rd floor, on the bus, on page 5).', 'on = উপরিতল বা স্তর (on the table, on the 3rd floor, on the bus, on page 5)।'),
        l('at = point or activity place (at the gate, at home, at work). Never "live at Dhaka".', 'at = বিন্দু বা কাজের জায়গা (at the gate, at home, at work)। কখনো "live at Dhaka" না।'),
      ],
    },
  ],
};

// ======================================================================= pr-4
export const prepMovement: Lesson = {
  id: 'pr-4',
  format: 'v2',
  concept: 'prep-movement',
  title: l('Movement: to, into, through, across', 'চলাচল: to, into, through, across'),
  why: l('"I reached to Dhaka", "I went to home", "arrived to the airport" — movement verbs have their own partners, and Bangla habits push the wrong ones.', '"I reached to Dhaka", "I went to home", "arrived to the airport" — চলাচলের verb-এর নিজস্ব সাথী আছে, আর বাংলার অভ্যাস ভুলটার দিকে ঠেলে দেয়।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Speaking Part 2: a journey', 'Speaking Part 2: একটা যাত্রা'),
      situation: l('You say: "We left ___ Sylhet at six, drove ___ the tea gardens, and finally arrived ___ Srimangal at noon."', 'আপনি বললেন: "We left ___ Sylhet at six, drove ___ the tea gardens, and finally arrived ___ Srimangal at noon."'),
      question: l('Which set is correct?', 'কোন set-টা ঠিক?'),
      options: ['(no preposition) · through · in', 'from · across · to', 'to · into · at'],
      answer: '(no preposition) · through · in',
      diagnose: {
        '(no preposition) · through · in': l('Right. "leave + place" needs nothing (left Sylhet) · through = from one side of an area to the other, surrounded by it · arrive in + a town or city.', 'ঠিক। "leave + জায়গা"-এ কিছু লাগে না (left Sylhet) · through = চারপাশে ঘেরা একটা এলাকার এক পাশ থেকে অন্য পাশে · arrive in + শহর।'),
        'from · across · to': l('"left from" is not wrong in every case, but "left Sylhet" is natural. The big mistake is "arrived to" — English says arrive in (a city) or arrive at (a place / building), never arrive to.', '"left from" সবসময় ভুল না, কিন্তু "left Sylhet" স্বাভাবিক। বড় ভুলটা "arrived to" — English-এ arrive in (শহর) বা arrive at (জায়গা / building), কখনো arrive to না।'),
        'to · into · at': l('"left to Sylhet" would mean you went towards Sylhet. "into the tea gardens" means entering them, not passing through. And a town takes arrive in.', '"left to Sylhet" মানে Sylhet-এর দিকে গেলেন। "into the tea gardens" মানে ভেতরে ঢোকা, পার হওয়া না। আর শহরে arrive in।'),
      },
    },
    {
      kind: 'discover',
      title: l('Where is the movement going?', 'চলাচলটা কোন দিকে যাচ্ছে?'),
      items: [
        { en: 'She walked to the shop.', note: l('destination → to', 'গন্তব্য → to') },
        { en: 'She walked into the shop.', note: l('entering an inside space → into', 'ভেতরে ঢোকা → into') },
        { en: 'We drove through the forest.', note: l('from one side to the other, surrounded → through', 'ঘেরা জায়গার এক পাশ থেকে অন্য পাশ → through') },
        { en: 'They swam across the river.', note: l('from one side to the other of a surface / line → across', 'একটা উপরিতল / রেখার এক পাশ থেকে অন্য পাশ → across') },
        { en: 'He went home early.', note: l('home: no preposition after go / come / get', 'home: go / come / get-এর পরে preposition না') },
      ],
      question: l('Which rule fits all of them?', 'কোন নিয়ম সবগুলোর সাথে মেলে?'),
      options: [
        l('The preposition shows the path: destination (to), entering (into), through a space (through), over a surface (across)', 'Preposition পথটা দেখায়: গন্তব্য (to), ভেতরে ঢোকা (into), জায়গার ভেতর দিয়ে (through), উপরিতল পার হয়ে (across)'),
        l('All movement verbs take "to"', 'সব চলাচলের verb-এ "to" বসে'),
        l('The verb decides, never the place', 'Verb ঠিক করে, জায়গা কখনো না'),
      ],
      answer: 0,
      pattern: l('Picture the path: to = towards a destination · into = from outside to inside · through = inside something, end to end · across = over, side to side · along = following a line · towards = in the direction of.', 'পথটা কল্পনা করুন: to = গন্তব্যের দিকে · into = বাইরে থেকে ভেতরে · through = কোনো কিছুর ভেতর দিয়ে এক মাথা থেকে অন্য মাথা · across = উপর দিয়ে এক পাশ থেকে অন্য পাশ · along = একটা রেখা ধরে · towards = দিকের দিকে।'),
    },
    {
      kind: 'concept',
      title: l('Paths, and verbs with their own rules', 'পথ, আর নিজস্ব নিয়মের verb'),
      body: l(
        'Movement prepositions show the path. Some very common verbs have fixed patterns that do not follow Bangla word order.',
        'চলাচলের preposition পথ দেখায়। কিছু খুব common verb-এর নির্দিষ্ট pattern আছে যা বাংলার word order মানে না।',
      ),
      points: [
        l('go / come / move / travel / return + to: go to Dhaka, move to a new flat. get on / off a bus, get into / out of a car.', 'go / come / move / travel / return + to: go to Dhaka, move to a new flat। get on / off a bus, get into / out of a car।'),
        l('arrive in + city / country (arrive in Dhaka) · arrive at + building / point (arrive at the airport). NEVER "arrive to".', 'arrive in + শহর / দেশ (arrive in Dhaka) · arrive at + building / বিন্দু (arrive at the airport)। কখনো "arrive to" না।'),
        l('NO preposition: reach + place (reach Dhaka), enter + place (enter the room), leave + place (leave home), and go / come / get + home (go home).', 'Preposition না: reach + জায়গা (reach Dhaka), enter + জায়গা (enter the room), leave + জায়গা (leave home), আর go / come / get + home (go home)।'),
        l('through (surrounded: a tunnel, a forest, a city) · across (a surface or line: a road, a river, a bridge) · along (following a line: along the river) · towards (in the direction of) · past (going beside and beyond) · from … to.', 'through (ঘেরা: tunnel, forest, শহর) · across (উপরিতল বা রেখা: রাস্তা, নদী, সেতু) · along (রেখা ধরে: along the river) · towards (দিকের দিকে) · past (পাশ দিয়ে ছাড়িয়ে) · from … to।'),
        l('Why Bangla speakers slip: Bangla says "ঢাকায় পৌঁছালাম", "বাসায় গেলাম", so we add "to" everywhere (reached to Dhaka, went to home). English "reach", "enter" and "home" already contain the direction.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় বলি "ঢাকায় পৌঁছালাম", "বাসায় গেলাম", তাই সব জায়গায় "to" বসিয়ে ফেলি (reached to Dhaka, went to home)। English "reach", "enter" আর "home"-এ দিক আগেই আছে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'We reached Cox’s Bazar late at night.', note: l('reach + place, no to', 'reach + জায়গা, to না') },
        { en: 'Our bus arrived at the terminal two hours late.', note: l('arrive at + a building / point', 'arrive at + building / বিন্দু') },
        { en: 'The children ran across the field towards the school.', note: l('across a surface · towards a direction', 'উপরিতল পার হয়ে · দিকের দিকে') },
        { en: 'After the class, I went home by rickshaw.', note: l('go home (no to) · by + transport', 'go home (to না) · by + যানবাহন') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'When we arrived in Bandarban, we walked along a narrow path through the hills.', note: l('Part 2 journeys: arrive in, along, through.', 'Part 2 যাত্রা: arrive in, along, through।') },
        { skill: 'writing', example: 'A new road will run across the park, from the station to the hospital.', note: l('Task 1 maps: across, from … to.', 'Task 1 map: across, from … to।') },
        { skill: 'listening', example: 'Go past the library and turn left towards the car park.', note: l('Listening directions: past, towards, along.', 'Listening দিক-নির্দেশ: past, towards, along।') },
        { skill: 'reading', example: 'Millions of workers migrated from rural areas to cities.', note: l('Reading: from … to shows the direction of change.', 'Reading: from … to পরিবর্তনের দিক দেখায়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'We reached to Dhaka at night.', right: 'We reached Dhaka at night.', why: l('reach + place (no to).', 'reach + জায়গা (to না)।') },
        { wrong: 'I went to home after class.', right: 'I went home after class.', why: l('go home (no to).', 'go home (to না)।') },
        { wrong: 'The plane arrived to Singapore.', right: 'The plane arrived in Singapore.', why: l('arrive in + city / country.', 'arrive in + শহর / দেশ।') },
        { wrong: 'He entered into the room quietly.', right: 'He entered the room quietly.', why: l('enter + place (no into).', 'enter + জায়গা (into না)।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('pr-4-p1', 'prep-movement', { ...P, pattern: 'prep-place-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'We are moving ___ Khulna next month.', options: ['to', 'in', 'at'], answer: 'to', explanation: l('move + destination → to.', 'move + গন্তব্য → to।'), why: { in: l('in shows where something is, not where it goes.', 'in দেখায় কোথায় আছে, কোথায় যাচ্ছে না।'), at: l('at is a point, not a direction.', 'at একটা বিন্দু, দিক না।') } }),
        choice('pr-4-p2', 'prep-movement', { ...P, pattern: 'prep-place-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'Our train arrived ___ Kamalapur station on time.', options: ['at', 'to', 'in'], answer: 'at', explanation: l('arrive at + a building / station.', 'arrive at + building / station।'), why: { to: l('English never says "arrive to".', 'English-এ কখনো "arrive to" বলে না।'), in: l('arrive in is for cities and countries; a station takes at.', 'arrive in শহর আর দেশের জন্য; station-এ at।') } }),
        choice('pr-4-p3', 'prep-movement', { ...P, pattern: 'prep-place-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'The road goes ___ a long tunnel under the hill.', options: ['through', 'across', 'along'], answer: 'through', explanation: l('Inside something, end to end → through.', 'কোনো কিছুর ভেতর দিয়ে এক মাথা থেকে অন্য মাথা → through।'), why: { across: l('across is over a surface (across the road), not inside a tunnel.', 'across উপরিতলের উপর দিয়ে (across the road), tunnel-এর ভেতর দিয়ে না।'), along: l('along follows a line beside it; a tunnel surrounds you → through.', 'along একটা রেখার পাশ ধরে; tunnel চারপাশে ঘেরা → through।') } }),
        choice('pr-4-p4', 'prep-movement', { ...P, pattern: 'prep-extra', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['We reached the hotel after midnight.', 'We reached to the hotel after midnight.', 'We reached at the hotel after midnight.'], answer: 'We reached the hotel after midnight.', explanation: l('reach + place, no preposition.', 'reach + জায়গা, preposition না।'), why: { 'We reached to the hotel after midnight.': l('"reach" already means "arrive at" — no to.', '"reach" নিজেই "পৌঁছানো" বোঝায় — to না।'), 'We reached at the hotel after midnight.': l('arrive at, but reach + place with nothing between.', 'arrive at, কিন্তু reach + জায়গা, মাঝে কিছু না।') } }),
        choice('pr-4-p5', 'prep-movement', { ...P, pattern: 'prep-extra', prompt: l('Choose the correct phrase.', 'সঠিক phrase বেছে নিন।'), sentence: 'I was tired, so I ___ early.', options: ['went home', 'went to home', 'went at home'], answer: 'went home', explanation: l('go / come / get + home, no preposition.', 'go / come / get + home, preposition না।'), why: { 'went to home': l('"home" after go / come has no to.', 'go / come-এর পরে "home"-এ to না।'), 'went at home': l('"at home" is where you are, not where you go.', '"at home" মানে কোথায় আছেন, কোথায় যাচ্ছেন না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('pr-4-r1', 'prep-movement', { ...P, pattern: 'prep-place-words', prompt: l('Write the missing preposition.', 'বাদ পড়া preposition লিখুন।'), sentence: 'We walked ___ the bridge to the other side of the river.', accepted: ['across', 'over'], explanation: l('Side to side over a bridge / river → across (or over).', 'সেতু / নদীর উপর দিয়ে এক পাশ থেকে অন্য পাশ → across (বা over)।'), why: { through: l('through is for something that surrounds you (a tunnel, a forest).', 'through চারপাশে ঘেরা কিছুর জন্য (tunnel, forest)।') } }),
        gap('pr-4-r2', 'prep-movement', { ...P, pattern: 'prep-place-words', prompt: l('Write in or at.', 'in বা at লিখুন।'), sentence: 'My cousin arrived ___ London last night.', accepted: ['in'], explanation: l('arrive in + city.', 'arrive in + শহর।'), why: { at: l('A city is an area → arrive in.', 'শহর একটা এলাকা → arrive in।'), to: l('English never says "arrive to".', 'English-এ কখনো "arrive to" বলে না।') } }),
        correct('pr-4-r3', 'prep-movement', { ...P, pattern: 'prep-extra', prompt: l('Correct the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'The students entered into the exam hall at nine.', accepted: ['The students entered the exam hall at nine.'], explanation: l('enter + place, no into.', 'enter + জায়গা, into না।') }),
        spot('pr-4-r4', 'prep-movement', { ...P, pattern: 'prep-place-words', prompt: l('One preposition is wrong. Tap it and type the right one.', 'একটা preposition ভুল। সেটায় tap করে সঠিকটা লিখুন।'), sentence: 'She got in the bus near the market.', wrong: 'in', accepted: ['on', 'onto'], explanation: l('Buses and trains: get on / off.', 'Bus আর train: get on / off।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pr-4-c1', 'prep-movement', { ...P, pattern: 'prep-place-words', prompt: l('"She walked to the room" vs "She walked into the room". What is the difference?', '"She walked to the room" বনাম "She walked into the room"। পার্থক্য কী?'), options: ['to = up to the room (maybe the door); into = she went inside', 'They mean exactly the same', 'into is wrong with walk'], answer: 'to = up to the room (maybe the door); into = she went inside', explanation: l('into = entering.', 'into = ভেতরে ঢোকা।') }),
        spot('pr-4-c2', 'prep-movement', { ...P, pattern: 'prep-extra', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'We finally arrived to the airport at noon.', wrong: 'to', accepted: ['at'], fixOptions: ['at', 'in', 'on'], explanation: l('arrive at + a building / place.', 'arrive at + building / জায়গা।') }),
        order('pr-4-c3', 'prep-movement', { ...P, pattern: 'prep-place-words', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'We drove through the city and along the river.', explanation: l('through (surrounded) · along (following a line).', 'through (ঘেরা) · along (রেখা ধরে)।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a trip', 'এবার আপনার পালা: একটা ভ্রমণ'),
      exercises: [
        write('pr-4-y1', 'prep-movement', {
          ...P,
          prompt: l('Speaking Part 2: "Describe a journey you remember." Write 3 sentences: where you started, the path you took, and when you arrived.', 'Speaking Part 2: "Describe a journey you remember." ৩টা sentence লিখুন: কোথা থেকে শুরু করলেন, কোন পথে গেলেন, আর কখন পৌঁছালেন।'),
          model: 'We left Dhaka early in the morning. The bus went through Cumilla and along the highway to Chattogram. We reached the city at noon and went straight to our hotel.',
          checklist: [l('leave / reach / enter + place (no preposition)', 'leave / reach / enter + জায়গা (preposition না)'), l('arrive in (city) / at (building)', 'arrive in (শহর) / at (building)'), l('through / across / along for the path', 'পথের জন্য through / across / along')],
          explanation: l('Picture the path, and remember the verbs with no preposition.', 'পথটা কল্পনা করুন, আর preposition ছাড়া verb-গুলো মনে রাখুন।'),
          task: 'The student writes 3 sentences about a journey. Check movement prepositions only: go/come/move/travel/return + to; arrive in + city/country, arrive at + building/point, never "arrive to"; reach, enter and leave + place with NO preposition; go/come/get home with no "to"; get on/off buses and trains, get into/out of cars; through (surrounded), across (a surface or line), along (following a line), towards, past, from … to. For each error, quote the phrase, name the path or the verb rule, and give the fix.',
          target: l('Movement: to, arrive in / at, reach (no to)', 'চলাচল: to, arrive in / at, reach (to না)'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('go / move / travel to · arrive in (city) / at (building) — never arrive to.', 'go / move / travel to · arrive in (শহর) / at (building) — কখনো arrive to না।'),
        l('No preposition: reach Dhaka, enter the room, leave home, go home.', 'Preposition না: reach Dhaka, enter the room, leave home, go home।'),
        l('through = inside, end to end · across = over, side to side · along = following a line.', 'through = ভেতর দিয়ে · across = উপর দিয়ে এক পাশ থেকে অন্য পাশ · along = রেখা ধরে।'),
      ],
    },
  ],
};

// ======================================================================= pr-5
export const prepPartners: Lesson = {
  id: 'pr-5',
  format: 'v2',
  concept: 'prep-partner',
  title: l('Word partners: depend on, interested in', 'Word partner: depend on, interested in'),
  why: l('Many verbs, adjectives and nouns always take the same preposition. Task 2 essays are full of them: "the effect of … on", "responsible for", "lack of".', 'অনেক verb, adjective আর noun সবসময় একই preposition নেয়। Task 2 essay এগুলোয় ভরা: "the effect of … on", "responsible for", "lack of"।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 2 sentence', 'একটা Task 2 sentence'),
      situation: l('You write: "Many young people are addicted ___ social media, which has a negative effect ___ their studies. Parents are responsible ___ this problem."', 'আপনি লিখলেন: "Many young people are addicted ___ social media, which has a negative effect ___ their studies. Parents are responsible ___ this problem."'),
      question: l('Which set is correct?', 'কোন set-টা ঠিক?'),
      options: ['to · on · for', 'with · in · of', 'on · to · about'],
      answer: 'to · on · for',
      diagnose: {
        'to · on · for': l('Right. These are fixed partners: addicted to · an effect on · responsible for. There is no rule to work them out — you learn them as one unit.', 'ঠিক। এগুলো নির্দিষ্ট সাথী: addicted to · an effect on · responsible for। বের করার কোনো নিয়ম নেই — একসাথে একটা unit হিসেবে শিখতে হয়।'),
        'with · in · of': l('These come from translating Bangla ("আসক্ত", "প্রভাব ... তে", "দায়ী"). English fixes them: addicted to, an effect on, responsible for.', 'এগুলো বাংলা থেকে অনুবাদ ("আসক্ত", "প্রভাব ... তে", "দায়ী")। English-এ এগুলো নির্দিষ্ট: addicted to, an effect on, responsible for।'),
        'on · to · about': l('Each word has its own partner: addicted TO, an effect ON, responsible FOR.', 'প্রতিটা word-এর নিজস্ব সাথী: addicted TO, an effect ON, responsible FOR।'),
      },
    },
    {
      kind: 'discover',
      title: l('Words and their partners', 'Word আর তার সাথী'),
      items: [
        { en: 'I am interested in history. · She is good at maths.', note: l('adjective + preposition', 'adjective + preposition') },
        { en: 'It depends on the weather. · Focus on your weak areas.', note: l('verb + preposition', 'verb + preposition') },
        { en: 'There is a lack of jobs. · an increase in crime', note: l('noun + preposition', 'noun + preposition') },
        { en: 'We discussed the problem. · They emphasised the need for change.', note: l('some verbs take NO preposition', 'কিছু verb preposition নেয় না') },
      ],
      question: l('How do you get these right?', 'এগুলো কীভাবে ঠিক করবেন?'),
      options: [
        l('Learn the word and its partner together, as one chunk', 'Word আর তার সাথী একসাথে, একটা chunk হিসেবে শিখুন'),
        l('Translate the Bangla ending', 'বাংলা ending অনুবাদ করুন'),
        l('Always use "of" if unsure', 'নিশ্চিত না হলে সবসময় "of"'),
      ],
      answer: 0,
      pattern: l('Word partners are fixed: learn "interested in", "depend on", "responsible for" as single units, and notice the verbs that take none (discuss, emphasise, affect).', 'Word partner নির্দিষ্ট: "interested in", "depend on", "responsible for" এক-একটা unit হিসেবে শিখুন, আর যে verb কোনো preposition নেয় না সেগুলো খেয়াল করুন (discuss, emphasise, affect)।'),
    },
    {
      kind: 'concept',
      title: l('The partners IELTS needs most', 'IELTS-এ সবচেয়ে দরকারি সাথী'),
      body: l(
        'Some words always take the same preposition. There is no logic to learn — learn the chunk, and use it in your own sentences until it sounds natural.',
        'কিছু word সবসময় একই preposition নেয়। শেখার মতো কোনো যুক্তি নেই — chunk-টা শিখুন, আর নিজের sentence-এ ব্যবহার করুন যতক্ষণ না স্বাভাবিক শোনায়।',
      ),
      points: [
        l('Adjectives: interested in · good / bad at · afraid of · aware of · responsible for · famous for · different from · similar to · addicted to · proud of.', 'Adjective: interested in · good / bad at · afraid of · aware of · responsible for · famous for · different from · similar to · addicted to · proud of।'),
        l('Verbs: depend on · focus on · rely on · believe in · succeed in · suffer from · benefit from · contribute to · lead to · result in (cause) / result from (be caused by) · apply for (a job) / apply to (a university).', 'Verb: depend on · focus on · rely on · believe in · succeed in · suffer from · benefit from · contribute to · lead to · result in (কারণ) / result from (কারণে হওয়া) · apply for (চাকরি) / apply to (university)।'),
        l('Nouns: an effect on · an impact on · a reason for · a solution to · a cause of · a lack of · access to · an increase / decrease in (the thing) · an increase of (the amount).', 'Noun: an effect on · an impact on · a reason for · a solution to · a cause of · a lack of · access to · an increase / decrease in (জিনিসটা) · an increase of (পরিমাণ)।'),
        l('NO preposition after: discuss, emphasise, affect, influence, attend, answer, marry, contact, approach, lack (verb): "discuss the issue" (not "discuss about").', 'এগুলোর পরে preposition না: discuss, emphasise, affect, influence, attend, answer, marry, contact, approach, lack (verb): "discuss the issue" ("discuss about" না)।'),
        l('Why Bangla speakers slip: Bangla uses case endings ("বিষয়ে আলোচনা", "এর উপর নির্ভর করে") that we translate word by word — "discuss about", "depend of", "married with". English chunks must be learned as they are.', 'বাংলাভাষীরা কেন ভুল করে: বাংলার ending ("বিষয়ে আলোচনা", "এর উপর নির্ভর করে") আমরা শব্দে শব্দে অনুবাদ করি — "discuss about", "depend of", "married with"। English chunk যেমন আছে তেমনই শিখতে হয়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'Sylhet is famous for its tea gardens.', note: l('famous for', 'famous for') },
        { en: 'My brother is applying for a job at a bank.', note: l('apply for a job', 'apply for a job') },
        { en: 'We discussed the plan with our teacher.', note: l('discuss + object (no about)', 'discuss + object (about না)') },
        { en: 'Heavy rain resulted in serious floods.', note: l('result in = cause', 'result in = কারণ হওয়া') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Technology has had a huge impact on the way people communicate.', note: l('Task 2: an impact / effect on.', 'Task 2: an impact / effect on।') },
        { skill: 'speaking', example: 'I’m really interested in photography, and I’m quite good at editing.', note: l('Part 1 hobbies: interested in, good at.', 'Part 1 শখ: interested in, good at।') },
        { skill: 'reading', example: 'The decline in fish stocks resulted from overfishing.', note: l('Reading: result from (cause comes after) vs result in (effect comes after).', 'Reading: result from (কারণ পরে) বনাম result in (ফলাফল পরে)।') },
        { skill: 'listening', example: 'You can apply for the scholarship online.', note: l('Listening: apply for + the thing you want.', 'Listening: apply for + যেটা চান।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'We discussed about the problem.', right: 'We discussed the problem.', why: l('discuss + object, no about.', 'discuss + object, about না।') },
        { wrong: 'It depends of the situation.', right: 'It depends on the situation.', why: l('depend on.', 'depend on।') },
        { wrong: 'She is married with a doctor.', right: 'She is married to a doctor.', why: l('married to (or: She married a doctor).', 'married to (বা: She married a doctor)।') },
        { wrong: 'Pollution affects on our health.', right: 'Pollution affects our health.', why: l('affect + object (but: an effect on).', 'affect + object (কিন্তু: an effect on)।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('pr-5-p1', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'Many children are afraid ___ the dark.', options: ['of', 'from', 'with'], answer: 'of', explanation: l('afraid of.', 'afraid of।'), why: { from: l('Bangla "থেকে ভয়" suggests from, but English says afraid of.', 'বাংলা "থেকে ভয়" from মনে করায়, কিন্তু English-এ afraid of।'), with: l('afraid takes of.', 'afraid-এর সাথী of।') } }),
        choice('pr-5-p2', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'Our success will depend ___ how hard we work.', options: ['on', 'of', 'in'], answer: 'on', explanation: l('depend on.', 'depend on।'), why: { of: l('"এর উপর" → on, not of.', '"এর উপর" → on, of না।'), in: l('depend takes on (also: rely on).', 'depend-এর সাথী on (rely on-ও)।') } }),
        choice('pr-5-p3', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Task 2: choose the preposition.', 'Task 2: preposition বেছে নিন।'), sentence: 'There is no easy solution ___ traffic congestion.', options: ['to', 'for', 'of'], answer: 'to', explanation: l('a solution to (a problem).', 'a solution to (সমস্যার)।'), why: { for: l('We say "a reason for" but "a solution to".', 'আমরা বলি "a reason for" কিন্তু "a solution to"।'), of: l('solution takes to.', 'solution-এর সাথী to।') } }),
        choice('pr-5-p4', 'prep-partner', { ...P, pattern: 'prep-extra', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The report emphasises the need for better schools.', 'The report emphasises on the need of better schools.', 'The report emphasises about the need for better schools.'], answer: 'The report emphasises the need for better schools.', explanation: l('emphasise + object (no on) · the need for.', 'emphasise + object (on না) · the need for।'), why: { 'The report emphasises on the need of better schools.': l('No preposition after emphasise, and "need" takes for.', 'emphasise-এর পরে preposition না, আর "need"-এর সাথী for।'), 'The report emphasises about the need for better schools.': l('emphasise takes a direct object — no about.', 'emphasise সরাসরি object নেয় — about না।') } }),
        choice('pr-5-p5', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Choose the correct pair.', 'সঠিক জোড়া বেছে নিন।'), sentence: 'Smoking can result ___ lung disease, which often results ___ smoking.', options: ['in · from', 'from · in', 'in · in'], answer: 'in · from', explanation: l('result in + effect · result from + cause.', 'result in + ফলাফল · result from + কারণ।'), why: { 'from · in': l('Reversed: smoking causes disease → result in; disease is caused by smoking → result from.', 'উল্টো: ধূমপান রোগ ঘটায় → result in; রোগ ধূমপানের কারণে → result from।'), 'in · in': l('The second one is caused by smoking → result from.', 'দ্বিতীয়টা ধূমপানের কারণে → result from।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('pr-5-r1', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Write the preposition.', 'Preposition লিখুন।'), sentence: 'Bangladesh is famous ___ its rivers.', accepted: ['for'], explanation: l('famous for.', 'famous for।'), why: { of: l('famous takes for (like "known for").', 'famous-এর সাথী for ("known for"-এর মতো)।') } }),
        gap('pr-5-r2', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Write the preposition.', 'Preposition লিখুন।'), sentence: 'Air pollution has a serious effect ___ children’s health.', accepted: ['on'], explanation: l('an effect on.', 'an effect on।'), why: { in: l('effect / impact / influence take on.', 'effect / impact / influence-এর সাথী on।'), to: l('effect takes on.', 'effect-এর সাথী on।') } }),
        correct('pr-5-r3', 'prep-partner', { ...P, pattern: 'prep-extra', prompt: l('Correct the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'In this essay I will discuss about the advantages of online learning.', accepted: ['In this essay I will discuss the advantages of online learning.', 'In this essay, I will discuss the advantages of online learning.'], explanation: l('discuss + object, no about.', 'discuss + object, about না।') }),
        spot('pr-5-r4', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('One preposition is wrong. Tap it and type the right one.', 'একটা preposition ভুল। সেটায় tap করে সঠিকটা লিখুন।'), sentence: 'My sister is very good in drawing.', wrong: 'in', accepted: ['at'], explanation: l('good at.', 'good at।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pr-5-c1', 'prep-partner', { ...P, pattern: 'prep-extra', prompt: l('Which pair is correct?', 'কোন জোড়াটা ঠিক?'), options: ['Noise affects sleep. / Noise has an effect on sleep.', 'Noise affects on sleep. / Noise has an effect in sleep.', 'Noise affects to sleep. / Noise has an effect of sleep.'], answer: 'Noise affects sleep. / Noise has an effect on sleep.', explanation: l('affect (verb) + object · effect (noun) + on.', 'affect (verb) + object · effect (noun) + on।') }),
        spot('pr-5-c2', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('One word breaks this Task 2 sentence. Tap it, then fix it.', 'একটা word Task 2 sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Many rural families still lack access of clean water.', wrong: 'of', accepted: ['to'], fixOptions: ['to', 'for', 'in'], explanation: l('access to.', 'access to।') }),
        order('pr-5-c3', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Young people should focus on their studies.', explanation: l('focus on.', 'focus on।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 2 opinion', 'এবার আপনার পালা: একটা Task 2 মতামত'),
      exercises: [
        write('pr-5-y1', 'prep-partner', {
          ...P,
          prompt: l('Task 2: "Social media has more negative effects than positive ones." Write 3 sentences using at least three word partners (e.g. effect on, addicted to, depend on, responsible for, lead to).', 'Task 2: "Social media has more negative effects than positive ones." অন্তত তিনটা word partner ব্যবহার করে ৩টা sentence লিখুন (যেমন effect on, addicted to, depend on, responsible for, lead to)।'),
          model: 'Social media has a strong effect on young people’s sleep. Some teenagers become addicted to their phones, which can lead to poor results. Parents and schools are responsible for teaching safe use.',
          checklist: [l('noun partners: effect on, impact on, lack of', 'noun partner: effect on, impact on, lack of'), l('verb / adjective partners: lead to, addicted to, responsible for', 'verb / adjective partner: lead to, addicted to, responsible for'), l('no preposition after discuss / affect / emphasise', 'discuss / affect / emphasise-এর পরে preposition না')],
          explanation: l('Learn and use the chunk, not the single word.', 'একটা word না, পুরো chunk শিখে ব্যবহার করুন।'),
          task: 'The student writes 3 Task 2 sentences using dependent prepositions. Check word partners only: adjectives (interested in, good at, afraid of, aware of, responsible for, famous for, different from, similar to, addicted to), verbs (depend on, focus on, rely on, succeed in, suffer from, benefit from, contribute to, lead to, result in/from, apply for a job / to a university), nouns (an effect/impact on, a reason for, a solution to, a cause of, a lack of, access to, an increase in); and verbs with NO preposition (discuss, emphasise, affect, influence, attend, marry, contact). For each error quote the chunk, give the correct one and say that it is a fixed partner. Accept "different to/than" as regional variants.',
          target: l('Word partners (dependent prepositions)', 'Word partner (নির্ভরশীল preposition)'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Learn chunks: interested in, good at, depend on, responsible for, an effect on, a solution to.', 'Chunk শিখুন: interested in, good at, depend on, responsible for, an effect on, a solution to।'),
        l('No preposition: discuss, emphasise, affect, attend, marry.', 'Preposition না: discuss, emphasise, affect, attend, marry।'),
        l('result in = cause · result from = be caused by.', 'result in = কারণ হওয়া · result from = কারণে হওয়া।'),
      ],
    },
  ],
};

// ======================================================================= pr-6
export const prepData: Lesson = {
  id: 'pr-6',
  format: 'v2',
  concept: 'prep-data',
  title: l('Prepositions for data: by, to, at, from … to', 'Data-র preposition: by, to, at, from … to'),
  why: l('One preposition changes the number: "rose by 20%" and "rose to 20%" are different facts. Task 1 accuracy depends on it.', 'একটা preposition সংখ্যাটাই বদলে দেয়: "rose by 20%" আর "rose to 20%" আলাদা তথ্য। Task 1-এর accuracy এর উপর নির্ভর করে।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 1 line graph', 'একটা Task 1 line graph'),
      situation: l('Rice price: Tk 40 (2020) → Tk 50 (2022). You write: "The price rose ___ Tk 10, ___ Tk 40 ___ Tk 50."', 'চালের দাম: Tk 40 (2020) → Tk 50 (2022)। আপনি লিখলেন: "The price rose ___ Tk 10, ___ Tk 40 ___ Tk 50।"'),
      question: l('Which set is correct?', 'কোন set-টা ঠিক?'),
      options: ['by · from · to', 'to · from · by', 'with · between · and'],
      answer: 'by · from · to',
      diagnose: {
        'by · from · to': l('Right. by = the size of the change (Tk 10) · from … to = the start and end levels (Tk 40 → Tk 50).', 'ঠিক। by = পরিবর্তনের পরিমাণ (Tk 10) · from … to = শুরু আর শেষের মান (Tk 40 → Tk 50)।'),
        'to · from · by': l('"rose to Tk 10" would say the new price is Tk 10 — a different fact. The change takes by; the new level takes to.', '"rose to Tk 10" বললে নতুন দাম Tk 10 — অন্য তথ্য। পরিবর্তনে by; নতুন মানে to।'),
        'with · between · and': l('"rose with" is a translation of "১০ টাকা বেড়ে". English uses by for the amount of change. "between … and" is for a range of time or values, not a change.', '"rose with" হলো "১০ টাকা বেড়ে"-র অনুবাদ। English-এ পরিবর্তনের পরিমাণে by। "between … and" সময় বা মানের পরিসরের জন্য, পরিবর্তনের জন্য না।'),
      },
    },
    {
      kind: 'discover',
      title: l('Same graph, different prepositions', 'একই graph, আলাদা preposition'),
      items: [
        { en: 'Sales increased by 5,000.', note: l('the amount of change → by', 'পরিবর্তনের পরিমাণ → by') },
        { en: 'Sales increased to 25,000.', note: l('the new level → to', 'নতুন মান → to') },
        { en: 'Sales peaked at 30,000 in 2019.', note: l('a high / low point → at', 'সর্বোচ্চ / সর্বনিম্ন বিন্দু → at') },
        { en: 'There was an increase of 20% in sales.', note: l('noun: of + amount · in + the thing', 'noun: of + পরিমাণ · in + জিনিসটা') },
        { en: 'Between 2010 and 2015, sales stood at around 20,000.', note: l('period → between … and; a level → stand at', 'সময়কাল → between … and; একটা মান → stand at') },
      ],
      question: l('What does "by" show?', '"by" কী দেখায়?'),
      options: [
        l('How much the figure changed', 'সংখ্যাটা কতটা বদলেছে'),
        l('The final figure', 'শেষ সংখ্যা'),
        l('The year of the change', 'পরিবর্তনের বছর'),
      ],
      answer: 0,
      pattern: l('Verb + by = the size of the change · verb + to = the new level · peak / stand / level off + at = a level · from X to Y = start and end · a rise / fall OF + amount IN + thing.', 'Verb + by = পরিবর্তনের পরিমাণ · verb + to = নতুন মান · peak / stand / level off + at = একটা মান · from X to Y = শুরু আর শেষ · a rise / fall OF + পরিমাণ IN + জিনিস।'),
    },
    {
      kind: 'concept',
      title: l('The Task 1 preposition kit', 'Task 1-এর preposition kit'),
      body: l(
        'Task 1 reports are built on a few prepositions. Each one gives a different fact, so choosing the wrong one makes your description inaccurate.',
        'Task 1 report কয়েকটা preposition-এর উপর দাঁড়িয়ে। প্রতিটা আলাদা তথ্য দেয়, তাই ভুলটা বাছলে বর্ণনা ভুল হয়ে যায়।',
      ),
      points: [
        l('Verbs: rise / fall / increase / decrease + by (change) or to (new level): "fell by 5% to 30%". peak at, bottom out at, stand at, level off at, remain stable at.', 'Verb: rise / fall / increase / decrease + by (পরিবর্তন) বা to (নতুন মান): "fell by 5% to 30%"। peak at, bottom out at, stand at, level off at, remain stable at।'),
        l('Nouns: a rise / an increase / a fall / a drop OF + amount (a rise of 10%) IN + the thing (a rise in prices): "a 10% rise in prices" or "a rise of 10% in prices".', 'Noun: a rise / an increase / a fall / a drop OF + পরিমাণ (a rise of 10%) IN + জিনিস (a rise in prices): "a 10% rise in prices" বা "a rise of 10% in prices"।'),
        l('Time: from 2000 to 2010 · between 2000 and 2010 · in 2005 · over the period · by 2030 (a future point, "no later than").', 'সময়: from 2000 to 2010 · between 2000 and 2010 · in 2005 · over the period · by 2030 (ভবিষ্যতের একটা বিন্দু, "এর মধ্যে")।'),
        l('Comparing: X was higher than Y · the figure for X · the proportion of X · compared with / to · per person, per year.', 'তুলনা: X was higher than Y · the figure for X · the proportion of X · compared with / to · per person, per year।'),
        l('Why Bangla speakers slip: Bangla says "১০% বেড়ে ৫০% হয়েছে" with one pattern, so "rose with 10%", "increased in 10%" and "rose by 50%" (meaning to) appear in reports. Ask: is this number the change or the new level?', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় বলি "১০% বেড়ে ৫০% হয়েছে", একই pattern-এ, তাই report-এ "rose with 10%", "increased in 10%" আর "rose by 50%" (to বোঝাতে) চলে আসে। জিজ্ঞেস করুন: এই সংখ্যা পরিবর্তন নাকি নতুন মান?'),
      ],
    },
    {
      kind: 'examples',
      title: l('Model Task 1 sentences', 'Model Task 1 sentence'),
      items: [
        { en: 'The number of tourists rose by 40% to 2.1 million.', note: l('by = change · to = new level', 'by = পরিবর্তন · to = নতুন মান') },
        { en: 'Unemployment peaked at 9% in 2009.', note: l('peak at + level', 'peak at + মান') },
        { en: 'There was a sharp fall in exports between 2015 and 2017.', note: l('a fall in + thing · between … and', 'a fall in + জিনিস · between … and') },
        { en: 'Car ownership is expected to reach 60% by 2030.', note: l('reach (no preposition) + level · by + future year', 'reach (preposition না) + মান · by + ভবিষ্যৎ বছর') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Overall, spending on food fell by a third, while spending on travel doubled.', note: l('Task 1 overview: by + fraction.', 'Task 1 overview: by + ভগ্নাংশ।') },
        { skill: 'reading', example: 'Rainfall decreased by 12% over the century.', note: l('Reading: by tells you the change, not the total — a common True / False trap.', 'Reading: by পরিবর্তন বলে, মোট না — True / False-এর common ফাঁদ।') },
        { skill: 'listening', example: 'Membership went up to 450 this year, from 380 last year.', note: l('Listening: to = the number you write.', 'Listening: to = যে সংখ্যা লিখবেন।') },
        { skill: 'speaking', example: 'Prices in my town have gone up by about 20% in two years.', note: l('Part 3: by + a rough amount.', 'Part 3: by + আনুমানিক পরিমাণ।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The price increased with 15%.', right: 'The price increased by 15%.', why: l('Change → by.', 'পরিবর্তন → by।') },
        { wrong: 'There was an increase of prices.', right: 'There was an increase in prices.', why: l('an increase IN + thing (OF + amount).', 'an increase IN + জিনিস (OF + পরিমাণ)।') },
        { wrong: 'The figure peaked in 80% in 2015.', right: 'The figure peaked at 80% in 2015.', why: l('peak at + level.', 'peak at + মান।') },
        { wrong: 'Sales reached to 5,000.', right: 'Sales reached 5,000.', why: l('reach + number, no preposition.', 'reach + সংখ্যা, preposition না।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('pr-6-p1', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('20% → 35%. Choose the preposition for the new level.', '20% → 35%। নতুন মানের জন্য preposition বেছে নিন।'), sentence: 'The figure rose ___ 35%.', options: ['to', 'by', 'at'], answer: 'to', explanation: l('The new level → to.', 'নতুন মান → to।'), why: { by: l('by would mean the change was 35 points; it was 15.', 'by মানে পরিবর্তন ৩৫ point; আসলে ১৫।'), at: l('at is for a level where something stays or peaks (stood at, peaked at).', 'at সেই মানের জন্য যেখানে থামে বা সর্বোচ্চ হয় (stood at, peaked at)।') } }),
        choice('pr-6-p2', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('20% → 35%. Choose the preposition for the change.', '20% → 35%। পরিবর্তনের জন্য preposition বেছে নিন।'), sentence: 'The figure rose ___ 15 percentage points.', options: ['by', 'to', 'with'], answer: 'by', explanation: l('The size of the change → by.', 'পরিবর্তনের পরিমাণ → by।'), why: { to: l('to gives the new level (35%), not the change.', 'to নতুন মান দেয় (35%), পরিবর্তন না।'), with: l('"rose with" is a Bangla translation; English uses by.', '"rose with" বাংলা অনুবাদ; English-এ by।') } }),
        choice('pr-6-p3', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'Visitor numbers peaked ___ 12,000 in July.', options: ['at', 'to', 'in'], answer: 'at', explanation: l('peak at + level.', 'peak at + মান।'), why: { to: l('peak is a point, not a movement towards a level → at.', 'peak একটা বিন্দু, কোনো মানের দিকে চলা না → at।'), in: l('in is for the time (in July), not the level.', 'in সময়ের জন্য (in July), মানের জন্য না।') } }),
        choice('pr-6-p4', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Choose the correct phrase.', 'সঠিক phrase বেছে নিন।'), sentence: 'The chart shows a steady rise ___ the number of cars.', options: ['in', 'of', 'at'], answer: 'in', explanation: l('a rise in + the thing that rose.', 'a rise in + যে জিনিস বেড়েছে।'), why: { of: l('a rise OF + an amount (a rise of 10%); the thing takes in.', 'a rise OF + পরিমাণ (a rise of 10%); জিনিসে in।'), at: l('at is for levels (stood at 50).', 'at মানের জন্য (stood at 50)।') } }),
        choice('pr-6-p5', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Between 2010 and 2020, sales fell by half.', 'Between 2010 to 2020, sales fell with half.', 'From 2010 and 2020, sales fell to half by.'], answer: 'Between 2010 and 2020, sales fell by half.', explanation: l('between … and · by + the size of the change.', 'between … and · by + পরিবর্তনের পরিমাণ।'), why: { 'Between 2010 to 2020, sales fell with half.': l('between goes with and (from goes with to), and the change takes by.', 'between-এর সাথে and (from-এর সাথে to), আর পরিবর্তনে by।'), 'From 2010 and 2020, sales fell to half by.': l('from … to (not and), and the word order is broken.', 'from … to (and না), আর word order ভাঙা।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('pr-6-r1', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Write the preposition (the level where it stayed).', 'Preposition লিখুন (যে মানে স্থির ছিল)।'), sentence: 'Inflation remained stable ___ 6% for three years.', accepted: ['at'], explanation: l('stable / stand / level off + at.', 'stable / stand / level off + at।'), why: { in: l('A level takes at.', 'মানে at।'), on: l('A level takes at.', 'মানে at।') } }),
        gap('pr-6-r2', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Write the preposition.', 'Preposition লিখুন।'), sentence: 'There was a 25% drop ___ the number of smokers.', accepted: ['in'], explanation: l('a drop in + the thing.', 'a drop in + জিনিস।'), why: { of: l('of goes with the amount (a drop of 25%); the thing takes in.', 'of পরিমাণের সাথে (a drop of 25%); জিনিসে in।') } }),
        correct('pr-6-r3', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Correct the Task 1 sentence (one preposition).', 'Task 1 sentence-টা ঠিক করুন (একটা preposition)।'), sentence: 'The unemployment rate decreased with 3% in 2012.', accepted: ['The unemployment rate decreased by 3% in 2012.'], explanation: l('The change → by.', 'পরিবর্তন → by।') }),
        correct('pr-6-r4', 'prep-data', { ...P, pattern: 'prep-extra', prompt: l('Correct the Task 1 sentence (remove one word).', 'Task 1 sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'Car sales reached to a record high in 2021.', accepted: ['Car sales reached a record high in 2021.'], explanation: l('reach + level, no to: "reached a record high".', 'reach + মান, to না: "reached a record high"।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pr-6-c1', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('The price was Tk 100 and is now Tk 120. Which sentence is TRUE?', 'দাম ছিল Tk 100, এখন Tk 120। কোন sentence সত্যি?'), options: ['The price rose by 20% to Tk 120.', 'The price rose to 20% by Tk 120.', 'The price rose by Tk 120.'], answer: 'The price rose by 20% to Tk 120.', explanation: l('by 20% (change) · to Tk 120 (new level).', 'by 20% (পরিবর্তন) · to Tk 120 (নতুন মান)।') }),
        spot('pr-6-c2', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('One word breaks this Task 1 sentence. Tap it, then fix it.', 'একটা word Task 1 sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'There was a significant increase of the use of public transport.', wrong: 'of', accepted: ['in'], fixOptions: ['in', 'at', 'by'], explanation: l('an increase in + the thing.', 'an increase in + জিনিস।') }),
        order('pr-6-c3', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Build the Task 1 sentence.', 'Task 1 sentence-টা সাজান।'), answer: 'Exports fell by 10% to 40 million tonnes.', explanation: l('by = change · to = new level.', 'by = পরিবর্তন · to = নতুন মান।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: describe the data', 'এবার আপনার পালা: data বর্ণনা করুন'),
      exercises: [
        write('pr-6-y1', 'prep-data', {
          ...P,
          prompt: l('Task 1: "Internet users in a country: 20% (2010), 55% (2015), 70% (2020, the highest)." Write 3 sentences using by, to, at and from … to / between … and.', 'Task 1: "একটা দেশে internet user: 20% (2010), 55% (2015), 70% (2020, সর্বোচ্চ)।" by, to, at আর from … to / between … and ব্যবহার করে ৩টা sentence লিখুন।'),
          model: 'The proportion of internet users rose from 20% in 2010 to 55% in 2015. Between 2015 and 2020, it increased by a further 15 percentage points. It peaked at 70% in 2020.',
          checklist: [l('by = the change', 'by = পরিবর্তন'), l('to = the new level; at = a peak / level', 'to = নতুন মান; at = সর্বোচ্চ / স্থির মান'), l('from … to / between … and', 'from … to / between … and')],
          explanation: l('Ask each time: is this number the change or the level?', 'প্রতিবার জিজ্ঞেস করুন: সংখ্যাটা পরিবর্তন নাকি মান?'),
          task: 'The student writes 3 IELTS Task 1 sentences about internet users (20% in 2010, 55% in 2015, 70% in 2020). Check data prepositions only, and check that the preposition gives the TRUE fact: rise/fall/increase + by = the size of the change (by 35 percentage points, by 15 points), + to = the new level (to 55%); peak/stand/level off/remain stable + at = a level; from X to Y and between X and Y (never "between … to"); a rise/increase OF + amount, IN + the thing; reach + number with no preposition; in + year, by + a future year. Flag "rose by 55%" if the student means the level. For each error quote the phrase, say whether the number is a change or a level, and give the fix.',
          target: l('by / to / at / from … to for data', 'Data-র জন্য by / to / at / from … to'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('rose by 10% (change) · rose to 50% (new level) · peaked / stood at 60% (a level).', 'rose by 10% (পরিবর্তন) · rose to 50% (নতুন মান) · peaked / stood at 60% (একটা মান)।'),
        l('a rise of 10% (amount) in prices (thing).', 'a rise of 10% (পরিমাণ) in prices (জিনিস)।'),
        l('from … to · between … and · reach + number (no to).', 'from … to · between … and · reach + সংখ্যা (to না)।'),
      ],
    },
  ],
};

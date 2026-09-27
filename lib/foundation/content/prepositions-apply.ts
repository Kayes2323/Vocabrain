import type { Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Prepositions, application lessons in the v2 format: pr-7 the preposition
 * mistakes Bangla speakers make (extra, missing and translated prepositions),
 * pr-8 prepositions in IELTS Writing and Speaking with no hints, and pr-9 the
 * module review test. No lesson concept of their own: every question keeps
 * the concept it tests, so each answer feeds the right review. Original Mino
 * content.
 */
const P = { tag: 'preposition' as const };

// ======================================================================= pr-7
export const prepMistakes: Lesson = {
  id: 'pr-7',
  format: 'v2',
  title: l('Preposition mistakes Bangla speakers make', 'বাংলাভাষীরা preposition-এ যে ভুলগুলো করে'),
  why: l('Most preposition errors are not random: they come from translating Bangla word by word. Learn the six habits and you can catch them yourself.', 'বেশিরভাগ preposition-এর ভুল এলোমেলো না: বাংলা থেকে শব্দে শব্দে অনুবাদ থেকে আসে। ছয়টা অভ্যাস চিনলে নিজেই ধরতে পারবেন।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('A student’s Part 1 answer', 'একজন শিক্ষার্থীর Part 1 উত্তর'),
      situation: l('A student says: "I came to Dhaka before two years. Every day I reach to my office at nine, and in the evening we discuss about our work."', 'একজন শিক্ষার্থী বললেন: "I came to Dhaka before two years. Every day I reach to my office at nine, and in the evening we discuss about our work."'),
      question: l('How many preposition mistakes are there?', 'এখানে preposition-এর কয়টা ভুল আছে?'),
      options: ['3', '1', '2'],
      answer: '3',
      diagnose: {
        '3': l('Right: two years AGO · reach my office (no to) · discuss our work (no about). Each is a word-by-word translation from Bangla.', 'ঠিক: two years AGO · reach my office (to না) · discuss our work (about না)। প্রতিটাই বাংলা থেকে শব্দে শব্দে অনুবাদ।'),
        '1': l('Look again: "before two years" → two years ago; "reach to" → reach; "discuss about" → discuss.', 'আবার দেখুন: "before two years" → two years ago; "reach to" → reach; "discuss about" → discuss।'),
        '2': l('Close! The one most people miss is "discuss about" — discuss takes no preposition.', 'কাছাকাছি! বেশিরভাগ মানুষ "discuss about" মিস করে — discuss কোনো preposition নেয় না।'),
      },
    },
    {
      kind: 'discover',
      title: l('Where do these slips come from?', 'এই ভুলগুলো কোথা থেকে আসে?'),
      items: [
        { en: 'বিষয়টা নিয়ে আলোচনা করলাম → We discussed the issue.', note: l('"নিয়ে" becomes an extra "about"', '"নিয়ে" অতিরিক্ত "about" হয়ে যায়') },
        { en: 'দুই বছর আগে → two years ago', note: l('"আগে" becomes "before two years"', '"আগে" হয়ে যায় "before two years"') },
        { en: 'ঢাকায় থাকি → I live in Dhaka.', note: l('"-য়" becomes "at Dhaka"', '"-য়" হয়ে যায় "at Dhaka"') },
        { en: 'আমি ভালো অংকে → I am good at maths.', note: l('"-এ" becomes "good in"', '"-এ" হয়ে যায় "good in"') },
      ],
      question: l('What is the common cause?', 'সাধারণ কারণটা কী?'),
      options: [
        l('Translating Bangla endings and words one by one instead of using English chunks', 'English chunk ব্যবহার না করে বাংলার ending আর word একটা একটা করে অনুবাদ করা'),
        l('English prepositions have no rules at all', 'English preposition-এর কোনো নিয়মই নেই'),
        l('Speaking too fast', 'খুব দ্রুত কথা বলা'),
      ],
      answer: 0,
      pattern: l('Don’t translate the Bangla ending. Recall the English chunk: reach Dhaka, discuss the issue, two years ago, good at, live in.', 'বাংলা ending অনুবাদ করবেন না। English chunk মনে করুন: reach Dhaka, discuss the issue, two years ago, good at, live in।'),
    },
    {
      kind: 'concept',
      title: l('The six habits to watch', 'যে ছয়টা অভ্যাসে খেয়াল রাখবেন'),
      body: l(
        'Almost every preposition error by Bangla speakers belongs to one of six groups. Check your writing against this list.',
        'বাংলাভাষীদের প্রায় সব preposition ভুল ছয়টা দলের একটায় পড়ে। নিজের লেখা এই তালিকার সাথে মিলিয়ে দেখুন।',
      ),
      points: [
        l('1. Extra preposition: discuss about, reach to, enter into, emphasise on, go to home, affect on → discuss, reach, enter, emphasise, go home, affect.', '১. অতিরিক্ত preposition: discuss about, reach to, enter into, emphasise on, go to home, affect on → discuss, reach, enter, emphasise, go home, affect।'),
        l('2. Missing preposition: listen music, wait me, depend the weather → listen to music, wait for me, depend on the weather.', '২. বাদ পড়া preposition: listen music, wait me, depend the weather → listen to music, wait for me, depend on the weather।'),
        l('3. One ending, three words: at Dhaka, in Monday, on 2020 → in Dhaka, on Monday, in 2020.', '৩. একটা ending, তিনটা word: at Dhaka, in Monday, on 2020 → in Dhaka, on Monday, in 2020।'),
        l('4. "থেকে" and "আগে": since five years, before two years → for five years, two years ago.', '৪. "থেকে" আর "আগে": since five years, before two years → for five years, two years ago।'),
        l('5. Translated partners: married with, afraid from, good in, depend of → married to, afraid of, good at, depend on.', '৫. অনুবাদ করা সাথী: married with, afraid from, good in, depend of → married to, afraid of, good at, depend on।'),
        l('6. Data: increased with 5%, an increase of prices → increased by 5%, an increase in prices.', '৬. Data: increased with 5%, an increase of prices → increased by 5%, an increase in prices।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Before → after', 'আগে → পরে'),
      items: [
        { en: 'I am listening music. → I am listening to music.', note: l('habit 2: listen to', 'অভ্যাস ২: listen to') },
        { en: 'Please wait me outside. → Please wait for me outside.', note: l('habit 2: wait for', 'অভ্যাস ২: wait for') },
        { en: 'He entered into the building. → He entered the building.', note: l('habit 1: enter + place', 'অভ্যাস ১: enter + জায়গা') },
        { en: 'She is married with an engineer. → She is married to an engineer.', note: l('habit 5: married to', 'অভ্যাস ৫: married to') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'In my free time I listen to music and wait for my friends at the tea stall.', note: l('Part 1: listen to, wait for, at the stall.', 'Part 1: listen to, wait for, at the stall।') },
        { skill: 'writing', example: 'This essay will discuss the causes of the problem and suggest a solution to it.', note: l('Task 2: discuss (no about), a solution to.', 'Task 2: discuss (about না), a solution to।') },
        { skill: 'reading', example: 'The committee approved the plan after discussing it for months.', note: l('Reading: "discussing it" — no about in good English.', 'Reading: "discussing it" — ভালো English-এ about নেই।') },
        { skill: 'listening', example: 'Please arrive at the hall ten minutes early.', note: l('Listening: arrive at — never arrive to.', 'Listening: arrive at — কখনো arrive to না।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'We need to discuss about climate change.', right: 'We need to discuss climate change.', why: l('habit 1: discuss + object.', 'অভ্যাস ১: discuss + object।') },
        { wrong: 'I am waiting you at the gate.', right: 'I am waiting for you at the gate.', why: l('habit 2: wait for.', 'অভ্যাস ২: wait for।') },
        { wrong: 'I live at Barishal since 2019.', right: 'I have lived in Barishal since 2019.', why: l('habit 3: live in + city (and the present perfect with since).', 'অভ্যাস ৩: live in + শহর (আর since-এর সাথে present perfect)।') },
        { wrong: 'He is afraid from dogs.', right: 'He is afraid of dogs.', why: l('habit 5: afraid of.', 'অভ্যাস ৫: afraid of।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('pr-7-p1', 'prep-partner', { ...P, pattern: 'prep-extra', prompt: l('Choose the correct phrase.', 'সঠিক phrase বেছে নিন।'), sentence: 'I often ___ in the evening.', options: ['listen to music', 'listen music', 'listen at music'], answer: 'listen to music', explanation: l('listen to + something.', 'listen to + কিছু।'), why: { 'listen music': l('listen always needs to before its object.', 'listen-এর object-এর আগে সবসময় to লাগে।'), 'listen at music': l('The partner of listen is to.', 'listen-এর সাথী to।') } }),
        choice('pr-7-p2', 'prep-partner', { ...P, pattern: 'prep-extra', prompt: l('Choose the correct sentence.', 'সঠিক sentence বেছে নিন।'), options: ['The teacher discussed the results with us.', 'The teacher discussed about the results with us.', 'The teacher discussed on the results with us.'], answer: 'The teacher discussed the results with us.', explanation: l('discuss + object.', 'discuss + object।'), why: { 'The teacher discussed about the results with us.': l('"নিয়ে আলোচনা" → discuss the results, no about. (But: a discussion about.)', '"নিয়ে আলোচনা" → discuss the results, about না। (কিন্তু: a discussion about।)'), 'The teacher discussed on the results with us.': l('discuss takes no preposition.', 'discuss কোনো preposition নেয় না।') } }),
        choice('pr-7-p3', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'Please wait ___ me at the bus stop.', options: ['for', 'to', 'on'], answer: 'for', explanation: l('wait for + person / thing.', 'wait for + মানুষ / জিনিস।'), why: { to: l('wait takes for.', 'wait-এর সাথী for।'), on: l('"wait on" means to serve someone (a waiter); here → wait for.', '"wait on" মানে কাউকে পরিবেশন করা; এখানে → wait for।') } }),
        choice('pr-7-p4', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'My grandparents live ___ a village near Bogura.', options: ['in', 'at', 'on'], answer: 'in', explanation: l('A village, town or city where you live → in.', 'যে গ্রাম, শহরে থাকেন → in।'), why: { at: l('"-এ" is not always at: a place you live in is an area → in.', '"-এ" সবসময় at না: যেখানে থাকেন সেটা এলাকা → in।'), on: l('on is for surfaces and levels.', 'on উপরিতল আর স্তরের জন্য।') } }),
        choice('pr-7-p5', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['My brother went to Malaysia five years ago.', 'My brother went to Malaysia before five years.', 'My brother went to Malaysia since five years.'], answer: 'My brother went to Malaysia five years ago.', explanation: l('length + ago.', 'দৈর্ঘ্য + ago।'), why: { 'My brother went to Malaysia before five years.': l('"পাঁচ বছর আগে" → five years ago.', '"পাঁচ বছর আগে" → five years ago।'), 'My brother went to Malaysia since five years.': l('since + a starting point, never a length.', 'since + শুরুর বিন্দু, দৈর্ঘ্য কখনো না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('pr-7-r1', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Write the missing preposition.', 'বাদ পড়া preposition লিখুন।'), sentence: 'My cousin is married ___ a teacher from Rangpur.', accepted: ['to'], explanation: l('married to (or: married a teacher).', 'married to (বা: married a teacher)।'), why: { with: l('"সাথে বিয়ে" → married to, not with.', '"সাথে বিয়ে" → married to, with না।') } }),
        gap('pr-7-r2', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Write the missing preposition.', 'বাদ পড়া preposition লিখুন।'), sentence: 'Many students are afraid ___ speaking in public.', accepted: ['of'], explanation: l('afraid of.', 'afraid of।'), why: { from: l('"থেকে ভয়" → afraid of.', '"থেকে ভয়" → afraid of।') } }),
        correct('pr-7-r3', 'prep-movement', { ...P, pattern: 'prep-extra', prompt: l('Correct the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'We reached to Sylhet after a six-hour journey.', accepted: ['We reached Sylhet after a six-hour journey.'], explanation: l('reach + place, no to.', 'reach + জায়গা, to না।') }),
        spot('pr-7-r4', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('One preposition is wrong. Tap it and type the right one.', 'একটা preposition ভুল। সেটায় tap করে সঠিকটা লিখুন।'), sentence: 'Whether we go depends of the weather.', wrong: 'of', accepted: ['on'], explanation: l('depend on.', 'depend on।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pr-7-c1', 'prep-partner', { ...P, pattern: 'prep-extra', prompt: l('Which sentence has NO preposition mistakes?', 'কোন sentence-এ preposition-এর কোনো ভুল নেই?'), options: ['We discussed the plan and then went home.', 'We discussed about the plan and then went to home.', 'We discussed the plan and then went to home.'], answer: 'We discussed the plan and then went home.', explanation: l('discuss + object · go home.', 'discuss + object · go home।') }),
        spot('pr-7-c2', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'I have been living at Gazipur for three years.', wrong: 'at', accepted: ['in'], fixOptions: ['in', 'on', 'to'], explanation: l('live in + town / city.', 'live in + শহর।') }),
        order('pr-7-c3', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'I usually listen to the news on the radio.', explanation: l('listen to · on the radio.', 'listen to · on the radio।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your daily life', 'এবার আপনার পালা: আপনার দৈনন্দিন জীবন'),
      exercises: [
        write('pr-7-y1', 'prep-partner', {
          ...P,
          prompt: l('Speaking Part 1: "Tell me about your daily routine." Write 3 sentences using at least three of: listen to, wait for, reach, discuss, go home, depend on.', 'Speaking Part 1: "Tell me about your daily routine." এগুলোর অন্তত তিনটা ব্যবহার করে ৩টা sentence লিখুন: listen to, wait for, reach, discuss, go home, depend on।'),
          model: 'I usually reach my college at nine and wait for my friends in the canteen. In class we discuss the lessons with our teachers. I go home at four and listen to music on the bus.',
          checklist: [l('No extra preposition: reach, discuss, go home', 'অতিরিক্ত preposition না: reach, discuss, go home'), l('No missing preposition: listen to, wait for, depend on', 'বাদ পড়া preposition না: listen to, wait for, depend on'), l('in / on / at for time and place', 'সময় আর জায়গার জন্য in / on / at')],
          explanation: l('Check each preposition against the six habits.', 'প্রতিটা preposition ছয়টা অভ্যাসের সাথে মিলিয়ে দেখুন।'),
          task: 'The student writes 3 sentences about their daily routine. Check prepositions only, focusing on the typical Bangla-speaker habits: extra prepositions (discuss about, reach to, enter into, emphasise on, go to home, affect on), missing prepositions (listen music, wait me, depend the weather), in/on/at for time and place (live in + city, on + day, at + clock time), for vs since and "X ago" (never "before two years"), translated partners (married to, afraid of, good at, depend on). For each error name the habit, quote the phrase and give the fix.',
          target: l('Catch the six habits', 'ছয়টা অভ্যাস ধরুন'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Extra: discuss / reach / enter / emphasise / go home — no preposition.', 'অতিরিক্ত: discuss / reach / enter / emphasise / go home — preposition না।'),
        l('Missing: listen to, wait for, depend on.', 'বাদ পড়া: listen to, wait for, depend on।'),
        l('Don’t translate "-এ", "থেকে", "আগে": in / on / at · for / since · ago.', '"-এ", "থেকে", "আগে" অনুবাদ করবেন না: in / on / at · for / since · ago।'),
      ],
    },
  ],
};

// ======================================================================= pr-8
export const prepInIelts: Lesson = {
  id: 'pr-8',
  format: 'v2',
  title: l('Prepositions in IELTS Writing and Speaking', 'IELTS Writing আর Speaking-এ preposition'),
  why: l('In the exam no one tells you which rule you need. Practise choosing prepositions in real Task 1, Task 2 and Speaking sentences, with no hints.', 'পরীক্ষায় কেউ বলে দেবে না কোন নিয়ম লাগবে। আসল Task 1, Task 2 আর Speaking sentence-এ hint ছাড়া preposition বাছার অভ্যাস করুন।'),
  minutes: 12,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('Proofread a Task 1 paragraph', 'একটা Task 1 paragraph proofread করুন'),
      situation: l('"The graph shows the number of passengers at an airport in 2000 to 2020. It increased with 3 million in 2010 and peaked at 9 million in 2019."', '"The graph shows the number of passengers at an airport in 2000 to 2020. It increased with 3 million in 2010 and peaked at 9 million in 2019."'),
      question: l('Which two prepositions are wrong?', 'কোন দুটো preposition ভুল?'),
      options: ['in (2000 to 2020) · with', 'at (an airport) · at (9 million)', 'in (2010) · at (9 million)'],
      answer: 'in (2000 to 2020) · with',
      diagnose: {
        'in (2000 to 2020) · with': l('Right. A period needs from 2000 to 2020 (or between 2000 and 2020), and the change takes by: increased by 3 million.', 'ঠিক। সময়কালে from 2000 to 2020 (বা between 2000 and 2020), আর পরিবর্তনে by: increased by 3 million।'),
        'at (an airport) · at (9 million)': l('Both are correct: at an airport (a point) and peaked at 9 million (a level). Look at "in 2000 to 2020" and "increased with".', 'দুটোই ঠিক: at an airport (একটা বিন্দু) আর peaked at 9 million (একটা মান)। "in 2000 to 2020" আর "increased with" দেখুন।'),
        'in (2010) · at (9 million)': l('in + a year and peak at + a level are correct. The errors are "in 2000 to 2020" (from … to) and "increased with" (by).', 'in + বছর আর peak at + মান ঠিক। ভুল হলো "in 2000 to 2020" (from … to) আর "increased with" (by)।'),
      },
    },
    {
      kind: 'discover',
      title: l('Three tasks, three sets of prepositions', 'তিনটা task, তিন সেট preposition'),
      items: [
        { en: 'Task 1: from 2000 to 2020 · rose by 5% · peaked at · a rise in', note: l('time periods and numbers', 'সময়কাল আর সংখ্যা') },
        { en: 'Task 2: an effect on · a solution to · responsible for · access to', note: l('word partners for ideas', 'ধারণার জন্য word partner') },
        { en: 'Speaking: live in · at weekends · for three years · good at', note: l('time, place and yourself', 'সময়, জায়গা আর নিজের কথা') },
      ],
      question: l('What is the best way to prepare?', 'প্রস্তুতির সবচেয়ে ভালো উপায় কী?'),
      options: [
        l('Learn the typical frames for each task and proofread prepositions at the end', 'প্রতিটা task-এর typical frame শিখুন আর শেষে preposition proofread করুন'),
        l('Avoid prepositions in the exam', 'পরীক্ষায় preposition এড়িয়ে চলুন'),
        l('Use "in" whenever you are unsure', 'নিশ্চিত না হলে "in" দিন'),
      ],
      answer: 0,
      pattern: l('Each task has its own frames. Learn them as chunks, and in the last two minutes read only the prepositions.', 'প্রতিটা task-এর নিজস্ব frame আছে। Chunk হিসেবে শিখুন, আর শেষ দুই মিনিটে শুধু preposition-গুলো পড়ুন।'),
    },
    {
      kind: 'concept',
      title: l('All the rules on one card', 'সব নিয়ম একটা card-এ'),
      body: l(
        'Everything from this module, in the order to check it when you proofread.',
        'এই module-এর সবকিছু, proofread করার সময় যে ক্রমে যাচাই করবেন।',
      ),
      points: [
        l('1. Time: in (year, month, part of day) · on (day, date) · at (clock time, night). None before this / next / last / every.', '১. সময়: in (বছর, মাস, দিনের অংশ) · on (দিন, তারিখ) · at (ঘড়ির সময়, night)। this / next / last / every-এর আগে কিছু না।'),
        l('2. Spans: for + length · since + start · during + event · by = deadline · until = up to · X ago.', '২. সময়কাল: for + দৈর্ঘ্য · since + শুরু · during + ঘটনা · by = শেষ সীমা · until = পর্যন্ত · X ago।'),
        l('3. Place and movement: in (area, space) · on (surface, level, bus) · at (point, home, work) · go to · arrive in / at · reach, enter, go home (none).', '৩. জায়গা আর চলাচল: in (এলাকা) · on (উপরিতল, স্তর, bus) · at (বিন্দু, home, work) · go to · arrive in / at · reach, enter, go home (কিছু না)।'),
        l('4. Partners: interested in, depend on, responsible for, an effect on, a solution to, access to · none after discuss, emphasise, affect.', '৪. সাথী: interested in, depend on, responsible for, an effect on, a solution to, access to · discuss, emphasise, affect-এর পরে কিছু না।'),
        l('5. Data: by (change) · to (new level) · at (peak / level) · from … to · between … and · a rise of (amount) in (thing).', '৫. Data: by (পরিবর্তন) · to (নতুন মান) · at (সর্বোচ্চ / মান) · from … to · between … and · a rise of (পরিমাণ) in (জিনিস)।'),
        l('Why Bangla speakers slip: under exam pressure we fall back on translating Bangla endings. A fixed proofreading routine — prepositions only, one by one — catches most of these slips.', 'বাংলাভাষীরা কেন ভুল করে: পরীক্ষার চাপে আমরা বাংলা ending অনুবাদে ফিরে যাই। একটা নির্দিষ্ট proofreading নিয়ম — শুধু preposition, একটা একটা করে — বেশিরভাগ ভুল ধরে ফেলে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Model sentences', 'Model sentence'),
      items: [
        { en: 'The figure for Japan fell by a quarter between 1990 and 2010.', note: l('Task 1: by + change · between … and', 'Task 1: by + পরিবর্তন · between … and') },
        { en: 'Governments are responsible for providing access to clean water.', note: l('Task 2: responsible for · access to', 'Task 2: responsible for · access to') },
        { en: 'I have lived in Mymensingh since I was born.', note: l('Speaking: live in · since + start', 'Speaking: live in · since + শুরু') },
        { en: 'This problem has a direct effect on the economy.', note: l('Task 2: an effect on', 'Task 2: an effect on') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Task by task', 'Task অনুযায়ী'),
      uses: [
        { skill: 'writing', example: 'Over the period, spending on education rose from 3% to 5% of GDP.', note: l('Task 1: over the period · from … to.', 'Task 1: over the period · from … to।') },
        { skill: 'speaking', example: 'At weekends I usually go to the market with my father.', note: l('Part 1: at weekends · go to.', 'Part 1: at weekends · go to।') },
        { skill: 'reading', example: 'Access to the island is only possible by boat.', note: l('Reading: access to · by + transport.', 'Reading: access to · by + যানবাহন।') },
        { skill: 'listening', example: 'The course runs from Monday to Thursday, and you must register by Friday.', note: l('Listening: from … to · by = deadline.', 'Listening: from … to · by = শেষ সীমা।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The graph shows data in 1990 to 2010.', right: 'The graph shows data from 1990 to 2010.', why: l('A period → from … to.', 'সময়কাল → from … to।') },
        { wrong: 'Technology has a big impact in our lives.', right: 'Technology has a big impact on our lives.', why: l('an impact on.', 'an impact on।') },
        { wrong: 'Between 2000 to 2005, sales doubled.', right: 'Between 2000 and 2005, sales doubled.', why: l('between … and (from … to).', 'between … and (from … to)।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: no hints', 'Practice: কোনো hint নেই'),
      exercises: [
        choice('pr-8-p1', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Task 1: choose the correct phrase.', 'Task 1: সঠিক phrase বেছে নিন।'), sentence: 'The table gives information about rainfall ___.', options: ['from 2015 to 2020', 'in 2015 to 2020', 'between 2015 to 2020'], answer: 'from 2015 to 2020', explanation: l('A period → from … to (or between … and).', 'সময়কাল → from … to (বা between … and)।'), why: { 'in 2015 to 2020': l('in is for one year; a period needs from … to.', 'in একটা বছরের জন্য; সময়কালে from … to।'), 'between 2015 to 2020': l('between goes with and.', 'between-এর সাথে and।') } }),
        choice('pr-8-p2', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Task 2: choose the preposition.', 'Task 2: preposition বেছে নিন।'), sentence: 'One reason ___ this trend is the rising cost of housing.', options: ['for', 'of', 'to'], answer: 'for', explanation: l('a reason for.', 'a reason for।'), why: { of: l('We say "a cause of" but "a reason for".', 'আমরা বলি "a cause of" কিন্তু "a reason for"।'), to: l('"a solution to", but "a reason for".', '"a solution to", কিন্তু "a reason for"।') } }),
        choice('pr-8-p3', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Speaking: choose the preposition.', 'Speaking: preposition বেছে নিন।'), sentence: 'I prefer to study early ___ the morning.', options: ['in', 'on', 'at'], answer: 'in', explanation: l('in the morning / afternoon / evening.', 'in the morning / afternoon / evening।'), why: { on: l('on is for a day (on Monday morning), not "the morning" alone.', 'on দিনের জন্য (on Monday morning), শুধু "the morning"-এ না।'), at: l('at night, but in the morning.', 'at night, কিন্তু in the morning।') } }),
        choice('pr-8-p4', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Task 1: choose the preposition.', 'Task 1: preposition বেছে নিন।'), sentence: 'The price of petrol stood ___ Tk 110 per litre in 2023.', options: ['at', 'on', 'by'], answer: 'at', explanation: l('stand at + level.', 'stand at + মান।'), why: { on: l('Levels take at.', 'মানে at।'), by: l('by is for the size of a change, not a level.', 'by পরিবর্তনের পরিমাণের জন্য, মানের জন্য না।') } }),
        choice('pr-8-p5', 'prep-partner', { ...P, pattern: 'prep-extra', prompt: l('Task 2: which sentence is correct?', 'Task 2: কোন sentence-টা ঠিক?'), options: ['Advertising influences children’s choices.', 'Advertising influences on children’s choices.', 'Advertising influences to children’s choices.'], answer: 'Advertising influences children’s choices.', explanation: l('influence (verb) + object — but "an influence on" as a noun.', 'influence (verb) + object — কিন্তু noun হিসেবে "an influence on"।'), why: { 'Advertising influences on children’s choices.': l('The verb takes no preposition; only the noun takes on.', 'Verb-এ preposition না; শুধু noun-এ on।'), 'Advertising influences to children’s choices.': l('influence takes a direct object.', 'influence সরাসরি object নেয়।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('pr-8-r1', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Write the preposition.', 'Preposition লিখুন।'), sentence: 'Better public transport is one solution ___ air pollution.', accepted: ['to'], explanation: l('a solution to.', 'a solution to।'), why: { for: l('a reason for, but a solution to.', 'a reason for, কিন্তু a solution to।'), of: l('solution takes to.', 'solution-এর সাথী to।') } }),
        gap('pr-8-r2', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Write the preposition (the new level).', 'Preposition লিখুন (নতুন মান)।'), sentence: 'By 2020, the number had fallen ___ just 200.', accepted: ['to'], explanation: l('fall to + new level.', 'fall to + নতুন মান।'), why: { by: l('by would give the size of the fall, not the new number.', 'by কমার পরিমাণ দেয়, নতুন সংখ্যা না।') } }),
        correct('pr-8-r3', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Correct the Task 1 sentence (one word).', 'Task 1 sentence-টা ঠিক করুন (একটা word)।'), sentence: 'Between 2005 to 2010, exports doubled.', accepted: ['Between 2005 and 2010, exports doubled.', 'From 2005 to 2010, exports doubled.'], explanation: l('between … and (or from … to).', 'between … and (বা from … to)।') }),
        spot('pr-8-r4', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('One preposition is wrong. Tap it and type the right one.', 'একটা preposition ভুল। সেটায় tap করে সঠিকটা লিখুন।'), sentence: 'Social media has a huge influence in teenagers.', wrong: 'in', accepted: ['on'], explanation: l('an influence on.', 'an influence on।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pr-8-c1', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Which Task 1 sentence is correct?', 'কোন Task 1 sentence-টা ঠিক?'), options: ['In 2015, there was a sharp rise in the number of students, which peaked at 5,000.', 'On 2015, there was a sharp rise of the number of students, which peaked in 5,000.', 'In 2015, there was a sharp rise of the number of students, which peaked to 5,000.'], answer: 'In 2015, there was a sharp rise in the number of students, which peaked at 5,000.', explanation: l('in + year · a rise in + thing · peak at + level.', 'in + বছর · a rise in + জিনিস · peak at + মান।') }),
        spot('pr-8-c2', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('One word breaks this Speaking answer. Tap it, then fix it.', 'একটা word Speaking উত্তরটা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'I have been playing the guitar since four years.', wrong: 'since', accepted: ['for'], fixOptions: ['for', 'during', 'from'], explanation: l('A length → for.', 'দৈর্ঘ্য → for।') }),
        correct('pr-8-c3', 'prep-partner', { ...P, pattern: 'prep-extra', prompt: l('Fix the Task 2 sentence (two prepositions are wrong).', 'Task 2 sentence-টা ঠিক করুন (দুটো preposition ভুল)।'), sentence: 'This essay will discuss about the effects of tourism in local communities.', accepted: ['This essay will discuss the effects of tourism on local communities.'], explanation: l('discuss + object · the effects of X on Y.', 'discuss + object · the effects of X on Y।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 1 overview', 'এবার আপনার পালা: একটা Task 1 overview'),
      exercises: [
        write('pr-8-y1', 'prep-data', {
          ...P,
          prompt: l('Task 1: "Bicycle sales in a city: 2,000 (2010), 5,000 (2015, highest), 4,000 (2020)." Write 3 sentences with no hints: the period, the peak, and the change at the end.', 'Task 1: "একটা শহরে bicycle বিক্রি: 2,000 (2010), 5,000 (2015, সর্বোচ্চ), 4,000 (2020)।" Hint ছাড়া ৩টা sentence লিখুন: সময়কাল, সর্বোচ্চ বিন্দু, আর শেষের পরিবর্তন।'),
          model: 'The graph shows bicycle sales in a city from 2010 to 2020. Sales rose sharply and peaked at 5,000 in 2015. After that, they fell by 1,000 to 4,000 in 2020.',
          checklist: [l('from … to / between … and for the period', 'সময়কালে from … to / between … and'), l('peak at + level; in + year', 'peak at + মান; in + বছর'), l('by = change; to = new level', 'by = পরিবর্তন; to = নতুন মান')],
          explanation: l('Proofread only the prepositions at the end.', 'শেষে শুধু preposition-গুলো proofread করুন।'),
          task: 'The student writes 3 IELTS Task 1 sentences about bicycle sales (2,000 in 2010, a peak of 5,000 in 2015, 4,000 in 2020) with no hints. Check every preposition and that it states the TRUE fact: from … to / between … and (never "between … to", never "in 2010 to 2020"); in + year; peak/stand at + level; rise/fall by + size of change, to + new level; a rise/fall OF + amount IN + thing; reach + number with no preposition; over the period. For each error quote the phrase, say whether the number is a change or a level where relevant, and give the fix. Keep preposition errors separate from other errors.',
          target: l('Every preposition, no hints', 'প্রতিটা preposition, কোনো hint ছাড়া'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Task 1: from … to · between … and · by (change) · to (level) · at (peak).', 'Task 1: from … to · between … and · by (পরিবর্তন) · to (মান) · at (সর্বোচ্চ)।'),
        l('Task 2: an effect / impact / influence on · a reason for · a solution to · discuss (none).', 'Task 2: an effect / impact / influence on · a reason for · a solution to · discuss (কিছু না)।'),
        l('Speaking: live in · at weekends · for + length · since + start.', 'Speaking: live in · at weekends · for + দৈর্ঘ্য · since + শুরু।'),
      ],
    },
  ],
};

// ======================================================================= pr-9
export const prepReview: Lesson = {
  id: 'pr-9',
  kind: 'test',
  title: l('Prepositions review test', 'Prepositions review test'),
  why: l('Check what you have learned. Your mistakes here decide what Mino suggests you review.', 'কী শিখলেন যাচাই করুন। এখানের ভুল দেখেই Mino ঠিক করবে কী review করতে বলবে।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'concept',
      title: l('How this test works', 'এই test কীভাবে চলবে'),
      body: l(
        '12 questions from every lesson in this module. You see the answer after each question. Score 80% or more to complete the module; if you score less, Mino will suggest short reviews for the prepositions you missed.',
        'এই module-এর সব lesson থেকে ১২টা প্রশ্ন। প্রতিটা প্রশ্নের পরে answer দেখবেন। ৮০% বা বেশি পেলে module শেষ; কম পেলে যে preposition-গুলো ভুল হয়েছে, Mino সেগুলোর ছোট review suggest করবে।',
      ),
    },
    {
      kind: 'practice',
      title: l('Part 1: choose', 'Part 1: বেছে নিন'),
      exercises: [
        choice('pr-9-e1', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'The meeting starts ___ half past two.', options: ['at', 'on', 'in'], answer: 'at', explanation: l('Clock time → at.', 'ঘড়ির সময় → at।') }),
        choice('pr-9-e2', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'He has worked at the hospital ___ 2018.', options: ['since', 'for', 'during'], answer: 'since', explanation: l('Starting point → since.', 'শুরুর বিন্দু → since।') }),
        choice('pr-9-e3', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'The toilets are ___ the ground floor.', options: ['on', 'in', 'at'], answer: 'on', explanation: l('A floor → on.', 'Floor → on।') }),
        choice('pr-9-e4', 'prep-movement', { ...P, pattern: 'prep-place-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'What time does the flight arrive ___ Dubai?', options: ['in', 'to', 'at'], answer: 'in', explanation: l('arrive in + city.', 'arrive in + শহর।') }),
        choice('pr-9-e5', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'Many people are not aware ___ the risks.', options: ['of', 'about', 'from'], answer: 'of', explanation: l('aware of.', 'aware of।') }),
        choice('pr-9-e6', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('50 → 80. Choose the preposition for the change.', '50 → 80। পরিবর্তনের জন্য preposition বেছে নিন।'), sentence: 'The number of members increased ___ 30.', options: ['by', 'to', 'with'], answer: 'by', explanation: l('The change → by.', 'পরিবর্তন → by।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Part 2: write and fix', 'Part 2: লিখুন আর ঠিক করুন'),
      exercises: [
        gap('pr-9-e7', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Write in, on or at.', 'in, on বা at লিখুন।'), sentence: 'Schools reopen ___ January.', accepted: ['in'], explanation: l('A month → in.', 'মাস → in।') }),
        gap('pr-9-e8', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Write the preposition.', 'Preposition লিখুন।'), sentence: 'Unemployment peaked ___ 12% in 2009.', accepted: ['at'], explanation: l('peak at + level.', 'peak at + মান।') }),
        correct('pr-9-e9', 'prep-partner', { ...P, pattern: 'prep-extra', prompt: l('Correct the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'We discussed about the new timetable.', accepted: ['We discussed the new timetable.'], explanation: l('discuss + object.', 'discuss + object।') }),
        correct('pr-9-e10', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'I finished school before three years.', accepted: ['I finished school three years ago.'], explanation: l('length + ago.', 'দৈর্ঘ্য + ago।') }),
        spot('pr-9-e11', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('One preposition is wrong. Tap it and type the right one.', 'একটা preposition ভুল। সেটায় tap করে সঠিকটা লিখুন।'), sentence: 'My aunt lives at Rajshahi with her family.', wrong: 'at', accepted: ['in'], explanation: l('live in + city.', 'live in + শহর।') }),
        correct('pr-9-e12', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Fix the Task 1 sentence (two prepositions are wrong).', 'Task 1 sentence-টা ঠিক করুন (দুটো preposition ভুল)।'), sentence: 'There was an increase of car sales between 2010 to 2015.', accepted: ['There was an increase in car sales between 2010 and 2015.', 'There was an increase in car sales from 2010 to 2015.'], explanation: l('an increase in + thing · between … and.', 'an increase in + জিনিস · between … and।') }),
      ],
    },
    {
      kind: 'ielts',
      title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'Sales rose by 20% to 6,000 between 2015 and 2020.', note: l('Task 1: by, to, between … and.', 'Task 1: by, to, between … and।') },
        { skill: 'speaking', example: 'I have lived in Khulna for ten years, and I study at a college there.', note: l('Part 1: in, for, at.', 'Part 1: in, for, at।') },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Time: in / on / at by size · for + length, since + start, X ago.', 'সময়: আকার দেখে in / on / at · for + দৈর্ঘ্য, since + শুরু, X ago।'),
        l('Place: in (area) · on (surface, level) · at (point) · arrive in / at · reach (none).', 'জায়গা: in (এলাকা) · on (উপরিতল, স্তর) · at (বিন্দু) · arrive in / at · reach (কিছু না)।'),
        l('Partners as chunks · data: by = change, to = level, at = peak.', 'সাথী chunk হিসেবে · data: by = পরিবর্তন, to = মান, at = সর্বোচ্চ।'),
      ],
    },
  ],
};

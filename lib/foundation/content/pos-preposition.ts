import type { Lesson, Pos } from '../model';
import { choice, correct, gap, identify, l, spot, tagWords, write } from './pos-kit';

/** Parts of Speech · Preposition: 3 short lessons; details continue in the Prepositions module. Original Vocab Brain content. */
const C = 'pos-preposition';
const JOBS: Pos[] = ['noun', 'verb', 'preposition'];

// ======================================================================= 1
const pp1: Lesson = {
  id: 'ppp-1', unit: 'preposition', format: 'v2', concept: C, minutes: 5, difficulty: 'easy', skill: 'grammar',
  title: l('What prepositions do', 'Preposition কী করে'),
  why: l('in / on / at for time and place appear in every Speaking Part 1 answer.', 'সময় আর জায়গার in / on / at প্রতিটা Speaking Part 1 উত্তরে আসে।'),
  steps: [
    {
      kind: 'hook',
      title: l('When were you born?', 'কবে জন্ম?'),
      situation: l('Examiner: "When is your birthday?" Mitu: "It is in 12 March, at the spring."', 'Examiner: "When is your birthday?" Mitu: "It is in 12 March, at the spring."'),
      question: l('Which is correct?', 'কোনটা সঠিক?'),
      options: ['on 12 March, in spring', 'at 12 March, on spring', 'in 12 March, at spring'], answer: 'on 12 March, in spring',
      diagnose: {
        'on 12 March, in spring': l('Right. Dates → on; seasons, months, years → in.', 'ঠিক। তারিখ → on; ঋতু, মাস, বছর → in।'),
        'at 12 March, on spring': l('at is for clock times (at 7 pm). A date takes on; a season takes in.', 'at ঘড়ির সময়ের জন্য (at 7 pm)। তারিখে on; ঋতুতে in।'),
        'in 12 March, at spring': l('in is for months (in March), but a date with a day number takes on.', 'মাসের জন্য in (in March), কিন্তু দিনসহ তারিখে on।'),
      },
    },
    identify({
      sentence: 'I study/verb at/preposition night/noun in/preposition my room/noun on/preposition weekdays/noun.',
      choices: JOBS,
      pattern: l('at, in and on each link a noun (night, room, weekdays) to the action and show when or where. That is the job of a preposition.', 'at, in আর on প্রতিটা একটা noun (night, room, weekdays)-কে কাজের সাথে জোড়ে, আর কখন বা কোথায় বোঝায়। এটাই preposition-এর কাজ।'),
    }),
    {
      kind: 'concept',
      title: l('What is a preposition?', 'Preposition কী?'),
      body: l('A preposition links a noun (or pronoun) to the rest of the sentence and shows time, place or another relation: in the morning, on the table, with my friends. Time: at + clock time / night; on + day / date; in + month / year / season / part of the day. Place: at + a point (at the station), on + a surface (on the wall), in + inside (in the room, in Dhaka).', 'Preposition একটা noun (বা pronoun)-কে sentence-এর বাকি অংশের সাথে জোড়ে, আর সময়, জায়গা বা অন্য সম্পর্ক দেখায়: in the morning, on the table, with my friends। সময়: at + ঘড়ির সময় / night; on + দিন / তারিখ; in + মাস / বছর / ঋতু / দিনের অংশ। জায়গা: at + একটা বিন্দু (at the station), on + উপরিতল (on the wall), in + ভেতরে (in the room, in Dhaka)।'),
      points: [
        l('in the morning / in the evening, but at night.', 'in the morning / in the evening, কিন্তু at night।'),
        l('A preposition is followed by a noun, a pronoun or -ing: interested in reading.', 'Preposition-এর পরে noun, pronoun বা -ing বসে: interested in reading।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'The exam starts at 9 am on Saturday.', note: l('at + time, on + day', 'at + সময়, on + দিন') },
        { en: 'I was born in 2006, in winter.', note: l('in + year, season', 'in + বছর, ঋতু') },
        { en: 'My uncle lives in Chattogram, on the fifth floor.', note: l('in + city, on + floor', 'in + শহর, on + তলা') },
        { en: 'Let’s meet at the bus stop.', note: l('at + a point', 'at + একটা বিন্দু') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'speaking', example: 'I usually wake up at 6 and study in the morning.', note: l('Part 1 routine questions are full of time prepositions.', 'Part 1-এর রুটিন প্রশ্নে সময়ের preposition প্রচুর।') },
        { skill: 'listening', example: 'The meeting is on Tuesday at 3.30.', note: l('Form completion: dates and times follow these words.', 'Form completion: এই word গুলোর পরেই তারিখ আর সময় আসে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'I was born at 2005.', right: 'I was born in 2005.', why: l('year → in.', 'বছর → in।') },
        { wrong: 'See you in Monday.', right: 'See you on Monday.', why: l('day → on.', 'দিন → on।') },
        { wrong: 'I study in night.', right: 'I study at night.', why: l('at night (fixed phrase).', 'at night (নির্দিষ্ট phrase)।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('ppp-1-p1', C, { tag: 'preposition', prompt: l('Choose the preposition.', 'Preposition-টা বাছো।'), sentence: 'The shop opens ______ 10 am.', options: ['at', 'on', 'in'], answer: 'at', explanation: l('clock time → at.', 'ঘড়ির সময় → at।') }),
        choice('ppp-1-p2', C, { tag: 'preposition', prompt: l('Choose the preposition.', 'Preposition-টা বাছো।'), sentence: 'Pohela Boishakh is ______ 14 April.', options: ['on', 'in', 'at'], answer: 'on', explanation: l('date → on.', 'তারিখ → on।') }),
        choice('ppp-1-p3', C, { tag: 'preposition', prompt: l('Choose the preposition.', 'Preposition-টা বাছো।'), sentence: 'It rains a lot ______ July.', options: ['in', 'on', 'at'], answer: 'in', explanation: l('month → in.', 'মাস → in।') }),
        tagWords('ppp-1-p4', C, { tag: 'preposition', sentence: 'We met/verb at/preposition the station/noun on/preposition Friday/noun.', choices: JOBS, explanation: l('at and on are prepositions; they link station and Friday to "met".', 'at আর on preposition; এরা station আর Friday-কে "met"-এর সাথে জোড়ে।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('ppp-1-r1', C, { tag: 'preposition', prompt: l('Write the preposition.', 'Preposition লেখো।'), sentence: 'I usually go to bed ___ midnight.', accepted: ['at'], explanation: l('at midnight (a point in time).', 'at midnight (সময়ের একটা বিন্দু)।') }),
        gap('ppp-1-r2', C, { tag: 'preposition', prompt: l('Write the preposition.', 'Preposition লেখো।'), sentence: 'My sister was born ___ 2010.', accepted: ['in'], explanation: l('year → in.', 'বছর → in।') }),
        spot('ppp-1-r3', C, { tag: 'preposition', sentence: 'We have classes in Saturday morning.', wrong: 'in', accepted: ['on'], explanation: l('A named day (Saturday morning) → on.', 'নির্দিষ্ট দিন (Saturday morning) → on।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ppp-1-c1', C, { tag: 'preposition', prompt: l('Why "in the morning" but "on Monday morning"?', '"in the morning" কিন্তু "on Monday morning" কেন?'), options: ['A named day makes it "on"', 'Monday is a place', 'Both are wrong'], answer: 'A named day makes it "on"', explanation: l('in the morning; on + a day: on Monday morning.', 'in the morning; দিন থাকলে on: on Monday morning।') }),
        spot('ppp-1-c2', C, { tag: 'preposition', sentence: 'The train arrives on 5.30 pm.', wrong: 'on', accepted: ['at'], fixOptions: ['at', 'in', 'by'], explanation: l('clock time → at.', 'ঘড়ির সময় → at।') }),
        choice('ppp-1-c3', C, { tag: 'preposition', prompt: l('Choose the right phrase.', 'ঠিক phrase-টা বাছো।'), sentence: 'I work best ______.', options: ['at night', 'in night', 'on night'], answer: 'at night', explanation: l('at night.', 'at night।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('ppp-1-w1', C, {
          tag: 'preposition',
          prompt: l('Speaking Part 1: describe your study routine in two sentences with at / on / in.', 'Speaking Part 1: at / on / in দিয়ে তোমার পড়ার রুটিন দুই sentence-এ বলো।'),
          model: 'I usually study in the evening, from 7 to 10. On Fridays I take a break and visit my grandparents.',
          task: 'The student describes their study routine in two sentences using time prepositions (at, on, in). Check at + clock time/night, on + days/dates, in + months/years/parts of the day.',
          target: l('at / on / in for time', 'সময়ের জন্য at / on / in'),
          checklist: [l('at + clock time; on + day; in + month or part of the day', 'at + ঘড়ির সময়; on + দিন; in + মাস বা দিনের অংশ')],
          explanation: l('in the evening, on Fridays.', 'in the evening, on Fridays।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('at 7 pm, at night · on Monday, on 5 May · in May, in 2020, in winter, in the morning.', 'at 7 pm, at night · on Monday, on 5 May · in May, in 2020, in winter, in the morning।'),
        l('A preposition is followed by a noun, pronoun or -ing.', 'Preposition-এর পরে noun, pronoun বা -ing বসে।'),
      ],
    },
  ],
};

// ======================================================================= 2
const pp2: Lesson = {
  id: 'ppp-2', unit: 'preposition', format: 'v2', concept: C, minutes: 5, difficulty: 'medium', skill: 'grammar',
  title: l('Words that need a partner', 'যে word-এর সাথী লাগে'),
  why: l('"discuss about" and "depend of" are classic IELTS errors.', '"discuss about" আর "depend of" IELTS-এর চেনা ভুল।'),
  steps: [
    {
      kind: 'hook',
      title: l('A Task 2 introduction', 'একটা Task 2 introduction'),
      situation: l('Sajid writes: "This essay will discuss about the problems of city life."', 'Sajid লিখলো: "This essay will discuss about the problems of city life."'),
      question: l('What is wrong?', 'কী ভুল?'),
      options: ['"about" is not needed after discuss', '"discuss" needs "on"', 'Nothing'], answer: '"about" is not needed after discuss',
      diagnose: {
        '"about" is not needed after discuss': l('Right. discuss something (no preposition). But: talk about, a discussion about.', 'ঠিক। discuss something (preposition ছাড়া)। কিন্তু: talk about, a discussion about।'),
        '"discuss" needs "on"': l('discuss takes no preposition at all.', 'discuss-এর সাথে কোনো preposition বসে না।'),
        Nothing: l('"discuss about" is a very common error. discuss + object directly.', '"discuss about" খুব common ভুল। discuss-এর পরে সরাসরি object।'),
      },
    },
    identify({
      sentence: 'Success/noun depends/verb on/preposition practice/noun, not luck/noun.',
      choices: JOBS,
      pattern: l('"depends" always takes "on". Some verbs and adjectives come with a fixed preposition partner.', '"depends"-এর সাথে সবসময় "on"। কিছু verb আর adjective-এর নির্দিষ্ট preposition সাথী থাকে।'),
    }),
    {
      kind: 'concept',
      title: l('Fixed partners', 'নির্দিষ্ট সাথী'),
      body: l('Many verbs, adjectives and nouns always use the same preposition. Learn them as one unit: depend on, focus on, rely on, interested in, good at, afraid of, responsible for, different from, married to, the reason for, an increase in. Some verbs take NO preposition: discuss, enter, reach, marry, contact.', 'অনেক verb, adjective আর noun সবসময় একই preposition নেয়। একসাথে একটা unit হিসেবে শেখো: depend on, focus on, rely on, interested in, good at, afraid of, responsible for, different from, married to, the reason for, an increase in। কিছু verb-এর সাথে কোনো preposition লাগে না: discuss, enter, reach, marry, contact।'),
      points: [
        l('When you learn a new word, write it with its partner: "responsible for".', 'নতুন word শেখার সময় সাথী সহ লেখো: "responsible for"।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'Many families rely on remittances.', note: l('rely on', 'rely on') },
        { en: 'I am interested in computer science.', note: l('interested in', 'interested in') },
        { en: 'Parents are responsible for their children’s safety.', note: l('responsible for', 'responsible for') },
        { en: 'We discussed the plan. (no "about")', note: l('discuss + object', 'discuss + object') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'writing', example: 'Governments are responsible for public safety.', note: l('Task 2: correct partners show natural collocation (Lexical Resource).', 'Task 2: সঠিক সাথী natural collocation দেখায় (Lexical Resource)।') },
        { skill: 'speaking', example: 'I’m really interested in photography.', note: l('Part 1 hobbies: interested in, good at, fond of.', 'Part 1-এ শখ: interested in, good at, fond of।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'We discussed about the issue.', right: 'We discussed the issue.', why: l('discuss + object, no "about".', 'discuss + object, "about" ছাড়া।') },
        { wrong: 'It depends of the weather.', right: 'It depends on the weather.', why: l('depend on.', 'depend on।') },
        { wrong: 'She is good in maths.', right: 'She is good at maths.', why: l('good at.', 'good at।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('ppp-2-p1', C, { tag: 'preposition', prompt: l('Choose the preposition.', 'Preposition-টা বাছো।'), sentence: 'I am interested ______ learning French.', options: ['in', 'on', 'for'], answer: 'in', explanation: l('interested in.', 'interested in।') }),
        choice('ppp-2-p2', C, { tag: 'preposition', prompt: l('Choose the preposition.', 'Preposition-টা বাছো।'), sentence: 'Farmers depend ______ rain.', options: ['on', 'of', 'from'], answer: 'on', explanation: l('depend on.', 'depend on।') }),
        choice('ppp-2-p3', C, { tag: 'preposition', prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'), options: ['The teacher entered the classroom.', 'The teacher entered into the classroom.', 'The teacher entered in the classroom.'], answer: 'The teacher entered the classroom.', explanation: l('enter + place (no preposition).', 'enter + জায়গা (preposition ছাড়া)।') }),
        choice('ppp-2-p4', C, { tag: 'preposition', prompt: l('Choose the preposition.', 'Preposition-টা বাছো।'), sentence: 'Who is responsible ______ this project?', options: ['for', 'of', 'to'], answer: 'for', explanation: l('responsible for.', 'responsible for।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('ppp-2-r1', C, { tag: 'preposition', prompt: l('Write the preposition.', 'Preposition লেখো।'), sentence: 'My brother is very good ___ football.', accepted: ['at'], explanation: l('good at.', 'good at।'), why: { in: l('We say "good at" a skill.', 'দক্ষতার ক্ষেত্রে "good at"।') } }),
        gap('ppp-2-r2', C, { tag: 'preposition', prompt: l('Write the preposition.', 'Preposition লেখো।'), sentence: 'Students should focus ___ their weak areas.', accepted: ['on'], explanation: l('focus on.', 'focus on।') }),
        correct('ppp-2-r3', C, { tag: 'preposition', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে আবার লেখো।'), sentence: 'In this essay I will discuss about both views.', accepted: ['In this essay I will discuss both views.', 'In this essay, I will discuss both views.'], explanation: l('discuss + object.', 'discuss + object।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ppp-2-c1', C, { tag: 'preposition', prompt: l('Why is "discuss about" wrong but "talk about" right?', '"discuss about" ভুল কিন্তু "talk about" ঠিক কেন?'), options: ['discuss takes a direct object; talk needs "about"', 'discuss is only used in writing', 'Both are wrong'], answer: 'discuss takes a direct object; talk needs "about"', explanation: l('Each verb has its own pattern: learn them as units.', 'প্রতিটা verb-এর নিজের pattern আছে: একসাথে শেখো।') }),
        spot('ppp-2-c2', C, { tag: 'preposition', sentence: 'Her success depends of hard work.', wrong: 'of', accepted: ['on'], fixOptions: ['on', 'in', 'from'], explanation: l('depend on.', 'depend on।') }),
        choice('ppp-2-c3', C, { tag: 'preposition', prompt: l('Choose the right phrase.', 'ঠিক phrase-টা বাছো।'), sentence: 'City life is very different ______ village life.', options: ['from', 'than', 'with'], answer: 'from', explanation: l('different from.', 'different from।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('ppp-2-w1', C, {
          tag: 'preposition',
          prompt: l('Write two sentences about your interests with "interested in", "good at" or "depend on".', '"interested in", "good at" বা "depend on" দিয়ে তোমার আগ্রহ নিয়ে দুটো sentence লেখো।'),
          model: 'I am interested in graphic design, and I am quite good at drawing. My progress depends on regular practice.',
          task: 'The student writes two sentences using dependent prepositions such as interested in, good at, depend on, responsible for. Check each preposition partner and that no preposition follows discuss/enter/reach.',
          target: l('Two fixed partners', 'দুটো নির্দিষ্ট সাথী'),
          checklist: [l('interested in / good at / depend on used correctly', 'interested in / good at / depend on সঠিকভাবে'), l('Preposition followed by a noun or -ing', 'Preposition-এর পরে noun বা -ing')],
          explanation: l('interested in design, good at drawing.', 'interested in design, good at drawing।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('depend on, focus on, interested in, good at, responsible for, different from.', 'depend on, focus on, interested in, good at, responsible for, different from।'),
        l('No preposition: discuss, enter, reach, contact.', 'Preposition ছাড়া: discuss, enter, reach, contact।'),
      ],
    },
  ],
};

// ======================================================================= 3
const pp3: Lesson = {
  id: 'ppp-3', unit: 'preposition', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'grammar',
  title: l('Prepositions for data', 'Data-র preposition'),
  why: l('"rose by 20%" and "rose to 20%" mean different things in Task 1.', 'Task 1-এ "rose by 20%" আর "rose to 20%"-এর অর্থ ভিন্ন।'),
  steps: [
    {
      kind: 'hook',
      title: l('Read the chart carefully', 'Chart মন দিয়ে পড়ো'),
      situation: l('Unemployment was 5% in 2019 and 8% in 2020. Which sentence is correct?', 'বেকারত্ব ২০১৯-এ ৫% আর ২০২০-এ ৮% ছিল। কোন sentence সঠিক?'),
      question: l('Choose one.', 'একটা বাছো।'),
      options: ['It rose by 3% to 8%.', 'It rose to 3% by 8%.', 'It rose by 8%.'], answer: 'It rose by 3% to 8%.',
      diagnose: {
        'It rose by 3% to 8%.': l('Right. by = the size of the change (3 points); to = the new figure (8%).', 'ঠিক। by = পরিবর্তনের মাপ (৩ point); to = নতুন সংখ্যা (৮%)।'),
        'It rose to 3% by 8%.': l('Swapped: by = how much it changed; to = where it ended.', 'উল্টে গেছে: by = কতটা বদলালো; to = কোথায় শেষ হলো।'),
        'It rose by 8%.': l('It rose BY 3 points, TO 8%.', 'এটা ৩ point BY বেড়েছে, ৮% TO-তে।'),
      },
    },
    identify({
      sentence: 'Sales/noun rose/verb from/preposition 200 to/preposition 500 between/preposition 2015 and 2020.',
      choices: JOBS,
      pattern: l('from … to … gives the start and end; between … and … gives the period.', 'from … to … শুরু আর শেষ দেয়; between … and … সময়কাল দেয়।'),
    }),
    {
      kind: 'concept',
      title: l('Prepositions that carry numbers', 'যে preposition সংখ্যা বহন করে'),
      body: l('by = the size of a change (rose by 10%). to = the new level (rose to 50%). from … to … = start and end. at = a level at one moment (stood at 40%, peaked at 90). between … and … / from … to … = a period. in = a year (in 2010). of = with a noun: a rise of 10%.', 'by = পরিবর্তনের মাপ (rose by 10%)। to = নতুন স্তর (rose to 50%)। from … to … = শুরু আর শেষ। at = কোনো এক সময়ের স্তর (stood at 40%, peaked at 90)। between … and … / from … to … = সময়কাল। in = বছর (in 2010)। of = noun-এর সাথে: a rise of 10%।'),
      points: [
        l('a rise OF 10% (the amount) IN sales (the thing that rose).', 'a rise OF 10% (পরিমাণ) IN sales (যা বেড়েছে)।'),
        l('over the period = during the whole time shown.', 'over the period = দেখানো পুরো সময় জুড়ে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'The figure stood at 40% in 2010.', note: l('at = level', 'at = স্তর') },
        { en: 'It fell by 5% to 35% in 2015.', note: l('by = change, to = new level', 'by = পরিবর্তন, to = নতুন স্তর') },
        { en: 'There was an increase of 20% in car ownership.', note: l('of + amount, in + thing', 'of + পরিমাণ, in + জিনিস') },
        { en: 'Between 2010 and 2020, prices doubled.', note: l('period', 'সময়কাল') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where you will use this', 'কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'The number of visitors peaked at 90,000 in July.', note: l('Task 1: data prepositions make your numbers accurate.', 'Task 1: data-র preposition সংখ্যাকে নির্ভুল করে।') },
        { skill: 'reading', example: 'rose to / rose by: read carefully in summary questions.', note: l('A single preposition can change the answer.', 'একটা preposition উত্তর বদলে দিতে পারে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'Prices increased with 10%.', right: 'Prices increased by 10%.', why: l('Size of change → by.', 'পরিবর্তনের মাপ → by।') },
        { wrong: 'It peaked in 90,000.', right: 'It peaked at 90,000.', why: l('Level → at.', 'স্তর → at।') },
        { wrong: 'from 2010 until to 2020', right: 'from 2010 to 2020', why: l('from … to …', 'from … to …') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('ppp-3-p1', C, { tag: 'preposition', prompt: l('From 40 to 60: choose the preposition for the change.', '40 থেকে 60: পরিবর্তনের preposition বাছো।'), sentence: 'The number rose ______ 20.', options: ['by', 'to', 'at'], answer: 'by', explanation: l('The change was 20 → by.', 'পরিবর্তন ছিল 20 → by।') }),
        choice('ppp-3-p2', C, { tag: 'preposition', prompt: l('Choose the preposition.', 'Preposition-টা বাছো।'), sentence: 'Unemployment stood ______ 6% in 2018.', options: ['at', 'by', 'on'], answer: 'at', explanation: l('A level → at.', 'স্তর → at।') }),
        choice('ppp-3-p3', C, { tag: 'preposition', prompt: l('Choose the preposition.', 'Preposition-টা বাছো।'), sentence: 'There was a sharp increase ______ tourism.', options: ['in', 'of', 'at'], answer: 'in', explanation: l('increase in + the thing.', 'increase in + জিনিস।') }),
        choice('ppp-3-p4', C, { tag: 'preposition', prompt: l('Choose the pair.', 'জোড়াটা বাছো।'), sentence: 'Prices rose ______ Tk 40 ______ Tk 55.', options: ['from / to', 'by / at', 'at / by'], answer: 'from / to', explanation: l('start and end → from … to.', 'শুরু আর শেষ → from … to।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('ppp-3-r1', C, { tag: 'preposition', prompt: l('Write the preposition (the new level).', 'Preposition লেখো (নতুন স্তর)।'), sentence: 'Car ownership rose ___ 45% in 2020.', accepted: ['to'], explanation: l('New level → to.', 'নতুন স্তর → to।') }),
        gap('ppp-3-r2', C, { tag: 'preposition', prompt: l('Write the preposition (the highest point).', 'Preposition লেখো (সর্বোচ্চ বিন্দু)।'), sentence: 'Sales peaked ___ 800 units in March.', accepted: ['at'], explanation: l('peak at.', 'peak at।') }),
        spot('ppp-3-r3', C, { tag: 'preposition', sentence: 'The price of fuel increased with 15% last year.', wrong: 'with', accepted: ['by'], explanation: l('Size of change → by.', 'পরিবর্তনের মাপ → by।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ppp-3-c1', C, { tag: 'preposition', prompt: l('The share was 20% and ended at 50%. Which sentence is correct?', 'ভাগটা ছিল ২০%, শেষ হলো ৫০%-এ। কোন sentence সঠিক?'), options: ['It rose to 50%.', 'It rose by 50%.'], answer: 'It rose to 50%.', explanation: l('to = the new level (50%). "by" gives the size of the change (by 30 points).', 'to = নতুন স্তর (৫০%)। "by" দেয় পরিবর্তনের মাপ (by 30 points)।') }),
        spot('ppp-3-c2', C, { tag: 'preposition', sentence: 'The number of visitors peaked in 12,000 in 2019.', wrong: 'in', accepted: ['at'], fixOptions: ['at', 'by', 'on'], explanation: l('peak at + number.', 'peak at + সংখ্যা।') }),
        choice('ppp-3-c3', C, { tag: 'preposition', prompt: l('Choose the right phrase.', 'ঠিক phrase-টা বাছো।'), sentence: 'There was a rise ______ 10% ______ exports.', options: ['of / in', 'in / of', 'by / at'], answer: 'of / in', explanation: l('a rise of + amount + in + thing.', 'a rise of + পরিমাণ + in + জিনিস।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('ppp-3-w1', C, {
          tag: 'preposition',
          prompt: l('Task 1: describe this in one sentence: "Internet users: 30% (2015) → 70% (2020)".', 'Task 1: এক sentence-এ লেখো: "Internet users: 30% (2015) → 70% (2020)"।'),
          model: 'The proportion of internet users rose by 40 percentage points, from 30% in 2015 to 70% in 2020.',
          task: 'The student describes internet users rising from 30% in 2015 to 70% in 2020 in one sentence. Check data prepositions: by (size of change), from ... to ... (start and end), in (years), at (a level). Also check the trend verb and past tense.',
          target: l('by / from … to … / in', 'by / from … to … / in'),
          checklist: [l('by for the change, to for the new level', 'পরিবর্তনের জন্য by, নতুন স্তরের জন্য to'), l('in + year', 'in + বছর')],
          explanation: l('rose by 40 points, from 30% in 2015 to 70% in 2020.', 'rose by 40 points, from 30% in 2015 to 70% in 2020।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('by = the change; to = the new level; at = a level; from … to … = start and end.', 'by = পরিবর্তন; to = নতুন স্তর; at = স্তর; from … to … = শুরু আর শেষ।'),
        l('a rise OF 10% IN sales.', 'a rise OF 10% IN sales।'),
      ],
    },
  ],
};

export const posPrepositionLessons: Lesson[] = [pp1, pp2, pp3];

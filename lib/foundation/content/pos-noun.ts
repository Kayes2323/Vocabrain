import type { Lesson } from '../model';
import { choice, correct, gap, identify, JOBS3, JOBS4, l, spot, tagWords, write } from './pos-kit';

/** Parts of Speech · Noun: 4 lessons. Original Vocab Brain content. */
const C = 'pos-noun';

// ======================================================================= 1
const n1: Lesson = {
  id: 'pn-1', unit: 'noun', format: 'v2', concept: C, minutes: 5, difficulty: 'easy', skill: 'grammar',
  title: l('What is a noun?', 'Noun কী?'),
  why: l('Most Listening and Reading gaps after "the" need a noun.', 'Listening আর Reading-এ "the"-এর পরের বেশিরভাগ gap-এ noun লাগে।'),
  steps: [
    {
      kind: 'hook',
      title: l('A Listening answer', 'একটা Listening উত্তর'),
      situation: l('You hear: "The meeting is about the new library." Your answer sheet says: The meeting is about the new ______. (ONE WORD)', 'তুমি শুনলে: "The meeting is about the new library." Answer sheet-এ লেখা: The meeting is about the new ______. (ONE WORD)'),
      question: l('Which word goes in the gap?', 'Gap-এ কোন word বসবে?'),
      options: ['library', 'new', 'about'], answer: 'library',
      diagnose: {
        library: l('Right. The gap needs the thing itself, a noun.', 'ঠিক। Gap-এ জিনিসটার নামই লাগবে, মানে noun।'),
        new: l('"new" is already there, and it only describes. The gap needs the thing it describes.', '"new" আগেই আছে, আর এটা শুধু describe করে। Gap-এ লাগবে যেটাকে describe করছে সেই জিনিস।'),
        about: l('"about" is a linking word. After "the new …" we need the name of something.', '"about" একটা linking word। "the new …"-এর পরে কোনো কিছুর নাম লাগে।'),
      },
    },
    identify({
      sentence: 'The young/adjective student/noun carefully/adverb wrote/verb an important/adjective essay/noun.',
      choices: JOBS4,
      pattern: l('"student" and "essay" name a person and a thing: they are nouns. The other words work around them.', '"student" আর "essay" একজন মানুষ আর একটা জিনিসের নাম: এরা noun। বাকি word গুলো এদের ঘিরে কাজ করে।'),
    }),
    {
      kind: 'concept',
      title: l('What is a noun?', 'Noun কী?'),
      body: l('A noun is the name of something: a person (student), a place (Dhaka), a thing (laptop) or an idea (education). In a sentence, nouns are usually the subject or the object.', 'Noun হলো কোনো কিছুর নাম: মানুষ (student), জায়গা (Dhaka), জিনিস (laptop) অথবা idea (education)। Sentence-এ noun সাধারণত subject বা object হয়।'),
      points: [
        l('Quick test: can you put "the" or "a" in front of it? Then it is probably a noun: the city, an idea.', 'ছোট্ট test: সামনে "the" বা "a" বসানো যায়? তাহলে সম্ভবত noun: the city, an idea।'),
        l('Ideas and feelings are nouns too: freedom, success, stress, pollution.', 'Idea আর অনুভূতিও noun: freedom, success, stress, pollution।'),
        l('After "the … of" you almost always need a noun: the development of cities.', '"the … of"-এর মাঝে প্রায় সবসময় noun লাগে: the development of cities।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Nouns in real sentences', 'আসল sentence-এ noun'),
      items: [
        { en: 'Education changes lives.', note: l('education = an idea (subject)', 'education = একটা idea (subject)') },
        { en: 'The library opens at nine.', note: l('library = a place', 'library = একটা জায়গা') },
        { en: 'My brother works in Chattogram.', note: l('brother = a person, Chattogram = a place', 'brother = মানুষ, Chattogram = জায়গা') },
        { en: 'Pollution is a serious problem.', note: l('pollution, problem = ideas', 'pollution, problem = idea') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'listening', example: 'Name of the course: ______', note: l('Form completion asks for names of things: almost always nouns.', 'Form completion-এ জিনিসের নাম চায়: প্রায় সবসময় noun।') },
        { skill: 'reading', example: 'The study focused on the ______ of young people.', note: l('A gap between "the" and "of" needs a noun. Knowing this cuts your options fast.', '"the" আর "of"-এর মাঝের gap-এ noun লাগে। এটা জানলে option দ্রুত কমে যায়।') },
        { skill: 'writing', example: 'Technology has changed education.', note: l('Task 2 topics are nouns. Clear nouns make clear arguments.', 'Task 2-এর topic গুলো noun। পরিষ্কার noun মানে পরিষ্কার argument।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'The important is to practise every day.', right: 'The important thing is to practise every day.', why: l('"important" only describes. After "The" we need a noun: thing.', '"important" শুধু describe করে। "The"-এর পরে noun লাগে: thing।') },
        { wrong: 'The develop of the city was fast.', right: 'The development of the city was fast.', why: l('Between "the" and "of" we need a noun: development, not the verb develop.', '"the" আর "of"-এর মাঝে noun লাগে: development, verb develop না।') },
        { wrong: 'I want to improve my speak.', right: 'I want to improve my speaking.', why: l('After "my" we need a noun. "speaking" works as the noun here.', '"my"-এর পরে noun লাগে। এখানে "speaking" noun হিসেবে কাজ করছে।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pn-1-p1', C, {
          prompt: l('Which word is a noun here?', 'এখানে কোন word-টা noun?'),
          sentence: 'Students need more practice.', options: ['need', 'more', 'practice'], answer: 'practice',
          pos: 'noun', wrongPos: { need: 'verb', more: 'determiner' },
          explanation: l('"practice" is the thing students need: a noun.', '"practice" হলো যে জিনিসটা students-এর দরকার: noun।'),
          why: { need: l('"need" is the action here: a verb.', 'এখানে "need" কাজ: verb।') },
        }),
        tagWords('pn-1-p2', C, {
          sentence: 'Pollution/noun causes/verb serious/adjective problems/noun in cities/noun.', choices: JOBS3,
          explanation: l('Pollution, problems and cities are names of things and places. "causes" is the action; "serious" describes problems.', 'Pollution, problems আর cities জিনিস আর জায়গার নাম। "causes" কাজ; "serious" problems-কে describe করে।'),
        }),
        choice('pn-1-p3', C, {
          prompt: l('Listening: you hear "Please bring your passport." Complete the note.', 'Listening: তুমি শুনলে "Please bring your passport." Note-টা পূরণ করো।'),
          sentence: 'Bring your ______.', options: ['passport', 'please', 'bring'], answer: 'passport',
          pos: 'noun', wrongPos: { bring: 'verb' },
          explanation: l('"your" is followed by a thing: a noun.', '"your"-এর পরে একটা জিনিস আসে: noun।'),
        }),
        choice('pn-1-p4', C, {
          prompt: l('Choose the word that fits.', 'যে word-টা বসবে সেটা বাছো।'),
          sentence: 'The ______ of the new bridge took five years.', options: ['construct', 'construction', 'constructive'], answer: 'construction',
          pos: 'noun', wrongPos: { construct: 'verb', constructive: 'adjective' }, family: 'construct',
          explanation: l('"The … of" needs a noun: construction.', '"The … of"-এর মাঝে noun লাগে: construction।'),
          why: { construct: l('"construct" is a verb (to build).', '"construct" একটা verb (বানানো)।'), constructive: l('"constructive" is an adjective (helpful).', '"constructive" একটা adjective (সহায়ক)।') },
        }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pn-1-r1', C, {
          prompt: l('Write a noun (a person) that fits.', 'মানানসই একটা noun (মানুষ) লেখো।'),
          sentence: 'A ___ teaches students at a school.', accepted: ['teacher', 'tutor', 'instructor', 'headteacher', 'principal'], pos: 'noun',
          explanation: l('The gap needs a person who teaches: teacher.', 'Gap-এ যে পড়ায় সেই মানুষ লাগবে: teacher।'),
        }),
        gap('pn-1-r2', C, {
          prompt: l('Listening: you hear "The tour starts at the main gate." Write ONE WORD.', 'Listening: তুমি শুনলে "The tour starts at the main gate." ONE WORD লেখো।'),
          sentence: 'The tour starts at the main ___.', accepted: ['gate'], pos: 'noun',
          explanation: l('After "the main" we need a place: gate.', '"the main"-এর পরে একটা জায়গা লাগে: gate।'),
        }),
        spot('pn-1-r3', C, {
          sentence: 'The develop of online banking was very fast.', wrong: 'develop', accepted: ['development'], pos: 'noun', wrongPos: { developed: 'adjective', developing: 'adjective' }, family: 'develop',
          explanation: l('"The … of" needs a noun: development.', '"The … of"-এর মাঝে noun লাগে: development।'),
        }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pn-1-c1', C, {
          prompt: l('Why is "success" a noun in this sentence?', 'এই sentence-এ "success" noun কেন?'),
          sentence: 'Hard work leads to success.',
          options: ['It names an idea, the result of hard work', 'It describes "work"', 'It is the action in the sentence'], answer: 'It names an idea, the result of hard work',
          explanation: l('"success" is the name of an idea. The action is "leads".', '"success" একটা idea-র নাম। কাজটা হলো "leads"।'),
        }),
        spot('pn-1-c2', C, {
          sentence: 'Many young people want to improve their speak.', wrong: 'speak', accepted: ['speaking'], fixOptions: ['speaking', 'spoke', 'spoken'],
          pos: 'noun', wrongPos: { spoke: 'verb', spoken: 'adjective' },
          explanation: l('After "their" we need a noun: speaking (the skill).', '"their"-এর পরে noun লাগে: speaking (skill-টা)।'),
        }),
        tagWords('pn-1-c3', C, {
          sentence: 'Freedom/noun and education/noun matter/verb to young/adjective people/noun.', choices: JOBS3,
          explanation: l('Freedom, education and people are nouns. "matter" is the verb here (= are important).', 'Freedom, education আর people noun। এখানে "matter" verb (= গুরুত্বপূর্ণ)।'),
        }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pn-1-w1', C, {
          prompt: l('Write one sentence about your hometown with at least two nouns.', 'তোমার নিজের এলাকা নিয়ে একটা sentence লেখো, অন্তত দুটো noun দিয়ে।'),
          model: 'Sylhet is famous for its tea gardens and friendly people.',
          task: 'The student writes one sentence about their hometown with at least two nouns. Check the nouns (plural forms, a/an/the before them) and basic grammar.',
          target: l('One sentence, two or more nouns', 'একটা sentence, দুই বা তার বেশি noun'),
          checklist: [l('I used at least two nouns', 'অন্তত দুটো noun ব্যবহার করেছি'), l('Plural nouns end in -s where needed', 'যেখানে দরকার, plural noun-এর শেষে -s আছে')],
          explanation: l('Names of places, things and ideas are all nouns.', 'জায়গা, জিনিস আর idea-র নাম সবই noun।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('A noun names a person, place, thing or idea.', 'Noun হলো মানুষ, জায়গা, জিনিস বা idea-র নাম।'),
        l('After a / an / the, and between "the" and "of", you usually need a noun.', 'a / an / the-এর পরে, আর "the" ও "of"-এর মাঝে সাধারণত noun লাগে।'),
      ],
    },
  ],
};

// ======================================================================= 2
const n2: Lesson = {
  id: 'pn-2', unit: 'noun', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'grammar',
  title: l('Countable or uncountable?', 'Countable নাকি uncountable?'),
  why: l('"informations", "advices", "the amount of cars": examiners notice these at once.', '"informations", "advices", "the amount of cars": examiner এগুলো সাথে সাথে ধরে।'),
  steps: [
    {
      kind: 'hook',
      title: l('An email to a university', 'University-কে একটা email'),
      situation: l('Tania writes to a university: "Thank you for all the ______ you sent me."', 'Tania একটা university-কে লিখছে: "Thank you for all the ______ you sent me."'),
      question: l('Which is correct?', 'কোনটা সঠিক?'),
      options: ['information', 'informations', 'an information'], answer: 'information',
      diagnose: {
        information: l('Right. "information" never takes -s.', 'ঠিক। "information"-এর সাথে কখনো -s বসে না।'),
        informations: l('Very common, but "information" is uncountable: no -s, ever.', 'খুব common ভুল, কিন্তু "information" uncountable: কখনোই -s বসে না।'),
        'an information': l('Uncountable nouns do not take "a/an". You can say "a piece of information".', 'Uncountable noun-এর আগে "a/an" বসে না। বলতে পারো "a piece of information"।'),
      },
    },
    identify({
      sentence: 'The research/noun gives/verb useful/adjective advice/noun about healthy/adjective food/noun.',
      choices: JOBS3,
      pattern: l('research, advice and food are nouns, but you cannot say "two researches" or "an advice". Some nouns cannot be counted.', 'research, advice আর food noun, কিন্তু "two researches" বা "an advice" বলা যায় না। কিছু noun গোনা যায় না।'),
    }),
    {
      kind: 'concept',
      title: l('Countable and uncountable nouns', 'Countable আর uncountable noun'),
      body: l('Countable nouns can be counted: a book, two books. Uncountable nouns cannot: no "a/an", no -s, and they take a singular verb. To count them, use a unit: a piece of advice, an item of equipment.', 'Countable noun গোনা যায়: a book, two books। Uncountable noun গোনা যায় না: "a/an" বসে না, -s বসে না, আর verb singular হয়। গুনতে চাইলে একটা unit লাগে: a piece of advice, an item of equipment।'),
      points: [
        l('Always uncountable: information, advice, research, equipment, furniture, knowledge, evidence, traffic, luggage, homework, news.', 'সবসময় uncountable: information, advice, research, equipment, furniture, knowledge, evidence, traffic, luggage, homework, news।'),
        l('many / few / a number of + countable; much / little / an amount of + uncountable.', 'many / few / a number of + countable; much / little / an amount of + uncountable।'),
        l('"a lot of" and "some" work with both.', '"a lot of" আর "some" দুটোর সাথেই চলে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'Can you give me some advice?', note: l('not "an advice" / "advices"', '"an advice" / "advices" না') },
        { en: 'Two pieces of equipment were broken.', note: l('count it with "pieces of"', '"pieces of" দিয়ে গোনা') },
        { en: 'The news is good.', note: l('"news" looks plural but takes "is"', '"news" দেখতে plural, কিন্তু "is" নেয়') },
        { en: 'The number of students rose, but the amount of funding fell.', note: l('students can be counted; funding cannot', 'students গোনা যায়; funding যায় না') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'writing', example: 'The number of cars increased, while the amount of fuel used fell.', note: l('Task 1 uses these every time. "The amount of cars" is a clear error.', 'Task 1-এ প্রতিবার এগুলো লাগে। "The amount of cars" পরিষ্কার ভুল।') },
        { skill: 'reading', example: 'There is little evidence that…', note: l('Academic passages use research, evidence, knowledge: all uncountable.', 'Academic passage-এ research, evidence, knowledge থাকে: সব uncountable।') },
        { skill: 'speaking', example: "I don't have much free time.", note: l('much + time (uncountable); many + hobbies (countable).', 'much + time (uncountable); many + hobbies (countable)।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'She gave me a useful advice.', right: 'She gave me some useful advice.', why: l('advice is uncountable: no "a". Or say "a useful piece of advice".', 'advice uncountable: "a" বসে না। অথবা বলো "a useful piece of advice"।') },
        { wrong: 'The lab needs new equipments.', right: 'The lab needs new equipment.', why: l('equipment never takes -s.', 'equipment-এর সাথে কখনো -s বসে না।') },
        { wrong: 'The amount of cars has doubled.', right: 'The number of cars has doubled.', why: l('Cars can be counted, so "number".', 'Car গোনা যায়, তাই "number"।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pn-2-p1', C, {
          tag: 'countable', prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'),
          options: ['She gave me an advice.', 'She gave me some advice.', 'She gave me two advices.'], answer: 'She gave me some advice.',
          explanation: l('advice is uncountable: "some advice", "a piece of advice".', 'advice uncountable: "some advice", "a piece of advice"।'),
        }),
        choice('pn-2-p2', C, {
          tag: 'countable', prompt: l('Choose the verb.', 'Verb-টা বাছো।'),
          sentence: 'There ______ a lot of evidence for this idea.', options: ['is', 'are'], answer: 'is',
          explanation: l('evidence is uncountable, so it takes a singular verb.', 'evidence uncountable, তাই verb singular।'),
          why: { are: l('"a lot of" does not make evidence plural.', '"a lot of" evidence-কে plural বানায় না।') },
        }),
        choice('pn-2-p3', C, {
          tag: 'countable', prompt: l('Task 1: choose the right word.', 'Task 1: ঠিক word-টা বাছো।'),
          sentence: 'The ______ of people using buses rose sharply.', options: ['number', 'amount'], answer: 'number',
          explanation: l('people can be counted → number.', 'people গোনা যায় → number।'),
        }),
        choice('pn-2-p4', C, {
          tag: 'countable', prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'),
          sentence: 'How ______ luggage do you have?', options: ['much', 'many'], answer: 'much',
          explanation: l('luggage is uncountable → much.', 'luggage uncountable → much।'),
        }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        spot('pn-2-r1', C, {
          tag: 'countable', sentence: 'We need more equipments for the science lab.', wrong: 'equipments', accepted: ['equipment'],
          explanation: l('equipment is uncountable: no -s.', 'equipment uncountable: -s বসে না।'),
        }),
        gap('pn-2-r2', C, {
          tag: 'countable', prompt: l('Write "number" or "amount".', '"number" বা "amount" লেখো।'),
          sentence: 'The ___ of water in the tank fell.', accepted: ['amount'],
          explanation: l('water cannot be counted → amount.', 'water গোনা যায় না → amount।'),
          why: { number: l('"number" is for things you can count, like bottles.', '"number" গোনা যায় এমন জিনিসের জন্য, যেমন bottles।') },
        }),
        correct('pn-2-r3', C, {
          tag: 'countable', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে আবার লেখো।'),
          sentence: 'I did many researches on this topic.',
          accepted: ['I did a lot of research on this topic.', 'I did lots of research on this topic.', 'I did much research on this topic.', 'I did some research on this topic.', 'I did a great deal of research on this topic.'],
          explanation: l('research is uncountable: "a lot of research", never "researches".', 'research uncountable: "a lot of research", কখনো "researches" না।'),
        }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pn-2-c1', C, {
          tag: 'countable', prompt: l('Why is "informations" wrong?', '"informations" ভুল কেন?'),
          options: ['information is uncountable, so it never takes -s', 'It needs "an" in front', 'The plural is "informationes"'], answer: 'information is uncountable, so it never takes -s',
          explanation: l('Uncountable nouns have no plural form.', 'Uncountable noun-এর কোনো plural form নেই।'),
        }),
        spot('pn-2-c2', C, {
          tag: 'countable', sentence: 'The news are very good today.', wrong: 'are', accepted: ['is'], fixOptions: ['is', 'were', 'be'],
          explanation: l('"news" is uncountable, so it takes "is".', '"news" uncountable, তাই "is" নেয়।'),
        }),
        choice('pn-2-c3', C, {
          tag: 'countable', prompt: l('Complete the phrase.', 'Phrase-টা পূরণ করো।'),
          sentence: 'She gave me a useful ______ of advice.', options: ['piece', 'number', 'many'], answer: 'piece',
          explanation: l('To count advice: a piece of advice.', 'advice গুনতে: a piece of advice।'),
        }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pn-2-w1', C, {
          tag: 'countable',
          prompt: l('Write one sentence about what you need for your IELTS study. Use one uncountable noun (advice, information, time, equipment…).', 'তোমার IELTS প্রস্তুতির জন্য কী দরকার, তা নিয়ে একটা sentence লেখো। একটা uncountable noun ব্যবহার করো (advice, information, time, equipment…)।'),
          model: 'I need more time and some good advice to prepare for IELTS.',
          task: 'The student writes one sentence about their IELTS study using at least one uncountable noun (advice, information, time, equipment, research, knowledge...). Check that uncountable nouns have no -s and no a/an, and that the verb agrees.',
          target: l('One uncountable noun, used without -s or a/an', 'একটা uncountable noun, -s বা a/an ছাড়া'),
          checklist: [l('My uncountable noun has no -s', 'আমার uncountable noun-এ -s নেই'), l('I did not put a/an before it', 'এর আগে a/an বসাইনি')],
          explanation: l('Use some / much / a lot of with uncountable nouns.', 'Uncountable noun-এর সাথে some / much / a lot of ব্যবহার করো।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('information, advice, research, equipment, evidence, news: no -s, no a/an.', 'information, advice, research, equipment, evidence, news: -s নেই, a/an নেই।'),
        l('number / many for things you count; amount / much for things you do not.', 'যা গোনা যায় তার জন্য number / many; যা গোনা যায় না তার জন্য amount / much।'),
      ],
    },
  ],
};

// ======================================================================= 3
const n3: Lesson = {
  id: 'pn-3', unit: 'noun', format: 'v2', concept: C, minutes: 5, difficulty: 'medium', skill: 'grammar',
  title: l('Noun mistakes to stop making', 'যে noun ভুলগুলো বন্ধ করতে হবে'),
  why: l('In Listening, a missing plural -s makes the answer wrong.', 'Listening-এ plural -s বাদ গেলে উত্তর ভুল ধরা হয়।'),
  steps: [
    {
      kind: 'hook',
      title: l('A Speaking answer', 'একটা Speaking উত্তর'),
      situation: l('Nabil says in Speaking Part 2: "One of my best friend lives in Khulna."', 'Nabil Speaking Part 2-এ বলছে: "One of my best friend lives in Khulna."'),
      question: l('What needs to change?', 'কী বদলাতে হবে?'),
      options: ['friend → friends', 'lives → live', 'Nothing, it is correct'], answer: 'friend → friends',
      diagnose: {
        'friend → friends': l('Right. "one of my …" chooses one from a group, so the group is plural: friends.', 'ঠিক। "one of my …" একটা group থেকে একজনকে বাছে, তাই group-টা plural: friends।'),
        'lives → live': l('The subject is "one", so "lives" is right. The problem is "friend".', 'Subject হলো "one", তাই "lives" ঠিক। সমস্যা "friend"-এ।'),
        'Nothing, it is correct': l('Almost. "one of my best friends" needs a plural noun.', 'প্রায়। "one of my best friends"-এ plural noun লাগে।'),
      },
    },
    identify({
      sentence: 'Many students/noun find/verb online/adjective classes/noun useful/adjective.',
      choices: JOBS3,
      pattern: l('"Many" tells us how many, so the nouns after it are plural: students, classes.', '"Many" বলে কতগুলো, তাই এর পরের noun plural: students, classes।'),
    }),
    {
      kind: 'concept',
      title: l('Singular or plural?', 'Singular নাকি plural?'),
      body: l('Small words before a noun decide its form. many, several, a few, two, these + plural noun. each, every, one, this + singular noun. "one of the …" always needs a plural noun.', 'Noun-এর আগের ছোট word গুলোই ঠিক করে noun কেমন হবে। many, several, a few, two, these + plural noun। each, every, one, this + singular noun। "one of the …"-এর পরে সবসময় plural noun।'),
      points: [
        l('people, children, women, men are already plural: no -s.', 'people, children, women, men আগে থেকেই plural: -s লাগে না।'),
        l('every student, each country (singular), but all students, both countries (plural).', 'every student, each country (singular), কিন্তু all students, both countries (plural)।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'Several countries have banned plastic bags.', note: l('several + plural', 'several + plural') },
        { en: 'Every student needs a quiet place to study.', note: l('every + singular', 'every + singular') },
        { en: 'Dhaka is one of the most crowded cities in the world.', note: l('one of the + plural', 'one of the + plural') },
        { en: 'Children learn languages quickly.', note: l('children is already plural', 'children আগে থেকেই plural') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'listening', example: 'Bring two ______ (answer: photographs)', note: l('A missing -s can cost the mark. Check plurals when you transfer answers.', '-s বাদ গেলে নম্বর কাটা যেতে পারে। Answer transfer করার সময় plural দেখে নাও।') },
        { skill: 'speaking', example: 'One of my favourite places is…', note: l('Part 2 answers often start like this. Get the plural right.', 'Part 2-এর উত্তর প্রায়ই এভাবে শুরু হয়। Plural ঠিক রাখো।') },
        { skill: 'writing', example: 'Many governments invest in public transport.', note: l('Task 2 generalisations use plural nouns.', 'Task 2-এ সাধারণ কথা বলতে plural noun লাগে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'Many student find it difficult.', right: 'Many students find it difficult.', why: l('many + plural noun.', 'many + plural noun।') },
        { wrong: 'Every students must register.', right: 'Every student must register.', why: l('every + singular noun.', 'every + singular noun।') },
        { wrong: 'Many peoples use smartphones.', right: 'Many people use smartphones.', why: l('people is already plural.', 'people আগে থেকেই plural।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pn-3-p1', C, {
          tag: 'plural', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'Several ______ have joined the club.', options: ['student', 'students'], answer: 'students',
          explanation: l('several + plural noun.', 'several + plural noun।'),
        }),
        choice('pn-3-p2', C, {
          tag: 'plural', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'Each ______ has its own flag.', options: ['country', 'countries'], answer: 'country',
          explanation: l('each + singular noun.', 'each + singular noun।'),
        }),
        choice('pn-3-p3', C, {
          tag: 'plural', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'Cox’s Bazar is one of the longest ______ in the world.', options: ['beach', 'beaches'], answer: 'beaches',
          explanation: l('one of the + plural noun.', 'one of the + plural noun।'),
        }),
        choice('pn-3-p4', C, {
          tag: 'plural', prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'),
          options: ['The childrens are playing.', 'The children are playing.', 'The child are playing.'], answer: 'The children are playing.',
          explanation: l('children is the plural of child. No -s.', 'children হলো child-এর plural। -s লাগে না।'),
        }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pn-3-r1', C, { tag: 'plural', prompt: l('Write the right form of "city".', '"city"-এর ঠিক form লেখো।'), sentence: 'Many ___ have serious traffic problems.', accepted: ['cities'], explanation: l('many + plural: cities (y → ies).', 'many + plural: cities (y → ies)।'), why: { city: l('After "many" the noun must be plural.', '"many"-এর পরে noun plural হতে হবে।'), citys: l('The plural of city is cities (y → ies).', 'city-র plural cities (y → ies)।') } }),
        spot('pn-3-r2', C, { tag: 'plural', sentence: 'Every students must bring a pen.', wrong: 'students', accepted: ['student'], explanation: l('every + singular noun.', 'every + singular noun।') }),
        gap('pn-3-r3', C, { tag: 'plural', prompt: l('Listening: you hear "You will need two photographs." Write ONE WORD.', 'Listening: তুমি শুনলে "You will need two photographs." ONE WORD লেখো।'), sentence: 'Bring two ___.', accepted: ['photographs', 'photos'], explanation: l('two + plural: photographs. Without -s the answer is marked wrong.', 'two + plural: photographs। -s ছাড়া উত্তর ভুল ধরা হয়।'), why: { photograph: l('"two" needs the plural, and IELTS marks a missing -s wrong.', '"two"-এর সাথে plural লাগে, আর IELTS-এ -s বাদ গেলে ভুল ধরে।') } }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pn-3-c1', C, {
          tag: 'plural', prompt: l('Why is it "one of my best friends" and not "friend"?', '"friend" না হয়ে "one of my best friends" কেন?'),
          options: ['We choose one person from a group of friends', 'Because "one" is plural', 'Because the verb is "lives"'], answer: 'We choose one person from a group of friends',
          explanation: l('"one of …" picks one from many, so the group is plural.', '"one of …" অনেকের মধ্যে থেকে একজনকে বাছে, তাই group-টা plural।'),
        }),
        spot('pn-3-c2', C, { tag: 'plural', sentence: 'Many peoples in Bangladesh speak two languages.', wrong: 'peoples', accepted: ['people'], fixOptions: ['people', 'person', 'a people'], explanation: l('people is already plural.', 'people আগে থেকেই plural।') }),
        choice('pn-3-c3', C, { tag: 'plural', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'Both ______ agreed with the plan.', options: ['teacher', 'teachers'], answer: 'teachers', explanation: l('both + plural noun.', 'both + plural noun।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pn-3-w1', C, {
          tag: 'plural',
          prompt: l('Write one sentence about your city with "one of the …".', '"one of the …" দিয়ে তোমার শহর নিয়ে একটা sentence লেখো।'),
          model: 'Chattogram is one of the busiest ports in South Asia.',
          task: 'The student writes one sentence about their city using "one of the ..." followed by a plural noun. Check the plural noun after "one of the", the singular verb after "one", and other noun forms.',
          target: l('"one of the" + plural noun', '"one of the" + plural noun'),
          checklist: [l('The noun after "one of the" is plural', '"one of the"-এর পরের noun plural'), l('I used "is", not "are", after the subject', 'Subject-এর পরে "are" না, "is" ব্যবহার করেছি')],
          explanation: l('one of the + plural noun + singular verb: One of the cities is…', 'one of the + plural noun + singular verb: One of the cities is…'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('many / several / two / both + plural; each / every / one + singular.', 'many / several / two / both + plural; each / every / one + singular।'),
        l('one of the + plural noun. people and children never take -s.', 'one of the + plural noun। people আর children-এ কখনো -s বসে না।'),
      ],
    },
  ],
};

// ======================================================================= 4
const n4: Lesson = {
  id: 'pn-4', unit: 'noun', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'grammar',
  title: l('Nouns in IELTS', 'IELTS-এ noun'),
  why: l('Noun phrases like "a sharp rise in sales" are the language of Task 1.', '"a sharp rise in sales"-এর মতো noun phrase-ই Task 1-এর ভাষা।'),
  steps: [
    {
      kind: 'hook',
      title: l('A Reading summary', 'একটা Reading summary'),
      situation: l('Summary completion: "The report shows a sharp ______ in car ownership."', 'Summary completion: "The report shows a sharp ______ in car ownership."'),
      question: l('Which word fits?', 'কোন word-টা বসবে?'),
      options: ['rise', 'rising', 'rose'], answer: 'rise',
      diagnose: {
        rise: l('Right. After "a sharp" we need a noun: a rise.', 'ঠিক। "a sharp"-এর পরে noun লাগে: a rise।'),
        rising: l('"a sharp rising" is not natural. The noun is "rise".', '"a sharp rising" স্বাভাবিক না। Noun হলো "rise"।'),
        rose: l('"rose" is the past verb: "Car ownership rose sharply."', '"rose" হলো past verb: "Car ownership rose sharply."'),
      },
    },
    identify({
      sentence: 'There was a sharp/adjective rise/noun in the number/noun of tourists/noun.',
      choices: JOBS3,
      pattern: l('"rise" is a noun here, the same word that can be a verb ("Tourism rose"). The adjective "sharp" describes it.', 'এখানে "rise" noun, একই word verb-ও হতে পারে ("Tourism rose")। Adjective "sharp" এটাকে describe করছে।'),
    }),
    {
      kind: 'concept',
      title: l('Noun phrases', 'Noun phrase'),
      body: l('IELTS writing often turns actions into nouns: "Prices rose sharply" → "There was a sharp rise in prices." "The government decided" → "The government’s decision". Some words are the same as a noun and a verb (rise, fall, increase, decline, change); others change form (decide → decision, improve → improvement).', 'IELTS writing-এ প্রায়ই কাজকে noun বানানো হয়: "Prices rose sharply" → "There was a sharp rise in prices." "The government decided" → "The government’s decision"। কিছু word noun আর verb দুটোতেই এক (rise, fall, increase, decline, change); অন্যগুলোর form বদলায় (decide → decision, improve → improvement)।'),
      points: [
        l('Noun phrase pattern: a / an + adjective + noun + in + what changed: a slight fall in unemployment.', 'Noun phrase-এর pattern: a / an + adjective + noun + in + কী বদলালো: a slight fall in unemployment।'),
        l('Use both patterns in Task 1 so your sentences do not all look the same.', 'Task 1-এ দুটো pattern-ই ব্যবহার করো, যাতে সব sentence একরকম না লাগে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Two ways to say it', 'একই কথা দুইভাবে'),
      items: [
        { en: 'Unemployment fell slightly. → There was a slight fall in unemployment.', note: l('verb → noun phrase', 'verb → noun phrase') },
        { en: 'The city improved its roads. → The improvement of the roads helped traffic.', note: l('improve → improvement', 'improve → improvement') },
        { en: 'People pollute rivers. → River pollution is a serious problem.', note: l('pollute → pollution', 'pollute → pollution') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where you will use this', 'কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'There was a significant increase in the use of mobile banking.', note: l('Task 1: a noun phrase makes your language varied.', 'Task 1: noun phrase তোমার ভাষায় বৈচিত্র্য আনে।') },
        { skill: 'reading', example: 'The ______ of the new policy was delayed. (introduction)', note: l('After "The … of" the answer is a noun. Predict the form before you search.', '"The … of"-এর পরে উত্তর noun। খোঁজার আগে form আন্দাজ করো।') },
        { skill: 'writing', example: 'The government’s decision to raise taxes…', note: l('Task 2: noun phrases sound more academic than "The government decided…".', 'Task 2: "The government decided…"-এর চেয়ে noun phrase বেশি academic শোনায়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'There was a sharp increasing in sales.', right: 'There was a sharp increase in sales.', why: l('The noun is "increase", not "increasing".', 'Noun হলো "increase", "increasing" না।') },
        { wrong: 'The improve of public transport is needed.', right: 'The improvement of public transport is needed.', why: l('After "The … of": the noun improvement.', '"The … of"-এর মাঝে noun improvement।') },
        { wrong: 'There was a slight fall of unemployment.', right: 'There was a slight fall in unemployment.', why: l('a rise / fall / increase / decrease IN something.', 'a rise / fall / increase / decrease IN কিছু।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pn-4-p1', C, {
          prompt: l('Task 1: choose the noun.', 'Task 1: noun-টা বাছো।'), sentence: 'There was a steady ______ in the price of rice.', options: ['increase', 'increased', 'increasing'], answer: 'increase',
          pos: 'noun', wrongPos: { increased: 'verb', increasing: 'adjective' }, family: 'increase',
          explanation: l('a steady + noun: increase.', 'a steady + noun: increase।'),
        }),
        choice('pn-4-p2', C, {
          prompt: l('Choose the noun form.', 'Noun form-টা বাছো।'), sentence: 'The government’s ______ to build a metro rail was popular.', options: ['decide', 'decision', 'decisive'], answer: 'decision',
          pos: 'noun', wrongPos: { decide: 'verb', decisive: 'adjective' }, family: 'decide',
          explanation: l('After "The government’s" we need a noun: decision.', '"The government’s"-এর পরে noun লাগে: decision।'),
        }),
        choice('pn-4-p3', C, {
          prompt: l('Choose the preposition.', 'Preposition-টা বাছো।'), sentence: 'There was a sharp fall ______ the number of visitors.', options: ['in', 'of', 'at'], answer: 'in',
          explanation: l('a rise / fall / increase IN something.', 'a rise / fall / increase IN কিছু।'),
        }),
        tagWords('pn-4-p4', C, {
          sentence: 'The rapid/adjective growth/noun of cities/noun creates/verb problems/noun.', choices: JOBS3,
          explanation: l('"growth" is the noun form of "grow"; "rapid" describes it.', '"growth" হলো "grow"-এর noun form; "rapid" এটাকে describe করছে।'),
        }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pn-4-r1', C, { prompt: l('Write the noun form of the word in brackets.', 'Bracket-এর word-এর noun form লেখো।'), base: 'improve', sentence: 'There has been a big ___ in air quality.', accepted: ['improvement'], pos: 'noun', wrongPos: { improve: 'verb', improved: 'adjective', improving: 'adjective' }, family: 'improve', explanation: l('a big + noun: improvement.', 'a big + noun: improvement।') }),
        gap('pn-4-r2', C, { prompt: l('Write the noun form of the word in brackets.', 'Bracket-এর word-এর noun form লেখো।'), base: 'pollute', sentence: 'Air ___ is a serious problem in Dhaka.', accepted: ['pollution'], pos: 'noun', wrongPos: { pollute: 'verb', polluted: 'adjective' }, family: 'pollute', explanation: l('The subject needs a noun: pollution.', 'Subject-এর জায়গায় noun লাগে: pollution।') }),
        correct('pn-4-r3', C, {
          prompt: l('Rewrite with a noun phrase: "There was a … in …".', 'Noun phrase দিয়ে আবার লেখো: "There was a … in …"।'), sentence: 'Sales rose sharply.',
          accepted: ['There was a sharp rise in sales.', 'There was a sharp increase in sales.'],
          explanation: l('rose sharply → a sharp rise in.', 'rose sharply → a sharp rise in।'),
        }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pn-4-c1', C, {
          prompt: l('Why is it "a sharp rise" and not "a sharp rose"?', '"a sharp rose" না হয়ে "a sharp rise" কেন?'),
          options: ['After "a" + adjective we need a noun; "rose" is a past verb', '"rose" is only for flowers', 'Both are correct'], answer: 'After "a" + adjective we need a noun; "rose" is a past verb',
          explanation: l('"a sharp ___" is a noun phrase, so the gap is a noun.', '"a sharp ___" একটা noun phrase, তাই gap-এ noun।'),
        }),
        spot('pn-4-c2', C, {
          sentence: 'There was a significant increasing in online shopping.', wrong: 'increasing', accepted: ['increase'], fixOptions: ['increase', 'increased', 'increasingly'],
          pos: 'noun', wrongPos: { increased: 'verb', increasingly: 'adverb' }, family: 'increase',
          explanation: l('a significant + noun: increase.', 'a significant + noun: increase।'),
        }),
        choice('pn-4-c3', C, {
          prompt: l('Reading: predict the form of the missing word.', 'Reading: বাদ পড়া word-এর form আন্দাজ করো।'), sentence: 'The ______ of the new policy was delayed.', options: ['a noun', 'a verb', 'an adverb'], answer: 'a noun',
          explanation: l('"The … of" → noun (for example: introduction).', '"The … of" → noun (যেমন: introduction)।'),
        }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pn-4-w1', C, {
          prompt: l('Task 1 style: write one sentence with "There was a … in …" about any change you know (prices, students, traffic…).', 'Task 1 style: তুমি জানো এমন কোনো পরিবর্তন নিয়ে "There was a … in …" দিয়ে একটা sentence লেখো (দাম, student, traffic…)।'),
          model: 'There was a gradual increase in the number of university students between 2010 and 2020.',
          task: 'The student writes one IELTS Task 1 style sentence using the pattern "There was a/an + adjective + noun (rise/fall/increase/decrease/decline) + in + noun". Check the noun form, the adjective, the preposition "in" and articles.',
          target: l('There was a + adjective + noun + in …', 'There was a + adjective + noun + in …'),
          checklist: [l('I used a noun (rise, fall, increase…) after the adjective', 'Adjective-এর পরে noun (rise, fall, increase…) ব্যবহার করেছি'), l('I used "in" after the noun', 'Noun-এর পরে "in" ব্যবহার করেছি')],
          explanation: l('a + adjective + noun + in: a slight fall in unemployment.', 'a + adjective + noun + in: a slight fall in unemployment।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('rise, fall, increase, decline, change: the same word works as a noun and a verb.', 'rise, fall, increase, decline, change: একই word noun আর verb দুটোই।'),
        l('Noun phrase: a sharp rise IN sales. "The … of" needs a noun: the improvement of roads.', 'Noun phrase: a sharp rise IN sales। "The … of"-এ noun লাগে: the improvement of roads।'),
      ],
    },
  ],
};

export const posNounLessons: Lesson[] = [n1, n2, n3, n4];

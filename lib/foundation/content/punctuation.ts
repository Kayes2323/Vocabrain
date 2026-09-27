import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Punctuation & Capitalisation (Foundation module 9), the six concept lessons
 * in the v2 (problem-first) format, easy → hard:
 * pn-1 capital letters (I, names, days, months, languages, the first word)
 * pn-2 end marks: full stops, question marks (and indirect questions)
 * pn-3 commas that help: lists, after an opening phrase or clause, before and / but / so
 * pn-4 commas that break: comma splices, a comma between subject and verb
 * pn-5 apostrophes: possession (student’s / students’) and contractions (it’s / its)
 * pn-6 colons, semicolons and paragraphs for IELTS Writing
 * Bangla script has no capital letters and no apostrophe, uses the দাঁড়ি (।) and
 * places commas freely, so every lesson names why Bangla speakers slip.
 * Exercises marked `strict` are graded with capitals and final punctuation.
 * Original Mino content.
 */

export const PUNCTUATION_CONCEPTS: Concept[] = [
  { id: 'pn-capital', title: l('Capital letters', 'Capital letter'), lessonId: 'pu-1', tag: 'punctuation' },
  { id: 'pn-end', title: l('Full stops and question marks', 'Full stop আর question mark'), lessonId: 'pu-2', tag: 'punctuation' },
  { id: 'pn-comma', title: l('Commas that help: lists, openings, joining', 'কাজের comma: তালিকা, শুরু, জোড়া'), lessonId: 'pu-3', tag: 'punctuation' },
  { id: 'pn-comma-error', title: l('Commas that break: splices and misplaced commas', 'ভুল comma: splice আর ভুল জায়গায় comma'), lessonId: 'pu-4', tag: 'punctuation' },
  { id: 'pn-apostrophe', title: l('Apostrophes: possession and contractions', 'Apostrophe: মালিকানা আর contraction'), lessonId: 'pu-5', tag: 'punctuation' },
  { id: 'pn-colon', title: l('Colons, semicolons and paragraphs', 'Colon, semicolon আর paragraph'), lessonId: 'pu-6', tag: 'punctuation' },
];

const P = { tag: 'punctuation' as const };
const S = { ...P, strict: true };

// ======================================================================= pn-1
export const pnCapitals: Lesson = {
  id: 'pu-1',
  format: 'v2',
  concept: 'pn-capital',
  title: l('Capital letters', 'Capital letter'),
  why: l('"i live in dhaka" looks careless to an examiner. Capitals are the easiest accuracy marks in Task 1 and Task 2 — and Bangla has no capital letters at all.', '"i live in dhaka" examiner-এর কাছে অযত্নের লেখা মনে হয়। Capital letter Task 1 আর Task 2-এ accuracy-র সবচেয়ে সহজ নম্বর — আর বাংলায় capital letter একদমই নেই।'),
  minutes: 9,
  difficulty: 'easy',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('The first line of an email', 'একটা email-এর প্রথম লাইন'),
      situation: l('You write to a university: "my name is rahim and i am from bangladesh. i speak bangla and english."', 'আপনি একটা university-কে লিখলেন: "my name is rahim and i am from bangladesh. i speak bangla and english."'),
      question: l('How many words need a capital letter?', 'কয়টা word-এ capital letter লাগবে?'),
      options: ['7', '4', '2'],
      answer: '7',
      diagnose: {
        '7': l('Right: My · Rahim · I · Bangladesh · I · Bangla · English. The first word, every "I", names, countries and languages all take capitals.', 'ঠিক: My · Rahim · I · Bangladesh · I · Bangla · English — প্রথম word, প্রতিটা "I", নাম, দেশ আর ভাষা সবই capital নেয়।'),
        '4': l('Count again: the first word of each sentence (My, I), every "I", the name (Rahim), the country (Bangladesh) and both languages (Bangla, English).', 'আবার গুনুন: প্রতিটা sentence-এর প্রথম word (My, I), প্রতিটা "I", নাম (Rahim), দেশ (Bangladesh) আর দুটো ভাষা (Bangla, English)।'),
        '2': l('More than that: the first words, "I" every time, the name, the country and the languages all need capitals.', 'এর চেয়ে বেশি: প্রথম word, প্রতিবার "I", নাম, দেশ আর ভাষা — সবগুলোতে capital লাগে।'),
      },
    },
    {
      kind: 'discover',
      title: l('What gets a capital?', 'কীসে capital বসে?'),
      items: [
        { en: 'My brother and I visited Sylhet on Friday.', note: l('first word · I · place · day', 'প্রথম word · I · জায়গা · দিন') },
        { en: 'In March, many Bangladeshi students take IELTS.', note: l('month · nationality · the test name', 'মাস · জাতীয়তা · test-এর নাম') },
        { en: 'She studies English and economics at Dhaka University.', note: l('language: capital · school subject: small · a named university: capital', 'ভাষা: capital · বিষয়: ছোট · নামওয়ালা university: capital') },
        { en: 'We go to the beach in summer.', note: l('seasons: small letters', 'ঋতু: ছোট অক্ষর') },
      ],
      question: l('What do capitals mark in English?', 'English-এ capital কী চিহ্নিত করে?'),
      options: [
        l('The start of a sentence, the word I, and names of specific people, places, days, months, languages and nationalities', 'Sentence-এর শুরু, I word, আর নির্দিষ্ট মানুষ, জায়গা, দিন, মাস, ভাষা ও জাতীয়তার নাম'),
        l('Important words', 'গুরুত্বপূর্ণ word'),
        l('Every noun', 'প্রতিটা noun'),
      ],
      answer: 0,
      pattern: l('Capital = first word · I · names (people, places, organisations) · days and months · languages and nationalities. Small = seasons, school subjects (except languages), and ordinary nouns (city, university, government).', 'Capital = প্রথম word · I · নাম (মানুষ, জায়গা, প্রতিষ্ঠান) · দিন আর মাস · ভাষা আর জাতীয়তা। ছোট = ঋতু, বিষয় (ভাষা ছাড়া), আর সাধারণ noun (city, university, government)।'),
    },
    {
      kind: 'concept',
      title: l('The capital-letter checklist', 'Capital letter-এর তালিকা'),
      body: l(
        'English uses capital letters to mark sentence starts and proper names. Everything else is small, even if it feels important.',
        'English-এ capital letter sentence-এর শুরু আর নির্দিষ্ট নাম চিহ্নিত করে। বাকি সব ছোট, গুরুত্বপূর্ণ মনে হলেও।',
      ),
      points: [
        l('Always: the first word of a sentence, the pronoun I (also I’m, I’ve), names of people, cities, countries, rivers (the Padma), organisations (the United Nations).', 'সবসময়: sentence-এর প্রথম word, pronoun I (I’m, I’ve-ও), মানুষ, শহর, দেশ, নদী (the Padma), প্রতিষ্ঠানের (the United Nations) নাম।'),
        l('Days, months, festivals, languages, nationalities: Monday, June, Eid, English, Bangladeshi, Japanese.', 'দিন, মাস, উৎসব, ভাষা, জাতীয়তা: Monday, June, Eid, English, Bangladeshi, Japanese।'),
        l('A general noun is small; a specific name is capital: a university → Dhaka University; the government → the Government of Bangladesh (in a formal name).', 'সাধারণ noun ছোট; নির্দিষ্ট নাম capital: a university → Dhaka University; the government → the Government of Bangladesh (formal নামে)।'),
        l('NOT capitals: seasons (summer, winter), school subjects except languages (maths, biology), directions used as ordinary words (go north), and words in the middle of a sentence just for emphasis.', 'Capital না: ঋতু (summer, winter), ভাষা ছাড়া বিষয় (maths, biology), সাধারণ অর্থে দিক (go north), আর জোর দিতে sentence-এর মাঝের word।'),
        l('Why Bangla speakers slip: Bangla script has no capital letters, so there is no habit of marking names or sentence starts. Typing on a phone in lower case makes it worse — "i" and "dhaka" become automatic.', 'বাংলাভাষীরা কেন ভুল করে: বাংলা লিপিতে capital letter নেই, তাই নাম বা sentence-এর শুরু চিহ্নিত করার অভ্যাস নেই। Phone-এ ছোট হাতের অক্ষরে লেখা এটা আরও বাড়ায় — "i" আর "dhaka" অভ্যাস হয়ে যায়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'I was born in Rajshahi in December.', note: l('I · city · month', 'I · শহর · মাস') },
        { en: 'Many Japanese tourists visit Bangladesh in winter.', note: l('nationality, country — but winter is small', 'জাতীয়তা, দেশ — কিন্তু winter ছোট') },
        { en: 'My favourite subjects are maths and English.', note: l('maths small, English capital', 'maths ছোট, English capital') },
        { en: 'The river Jamuna floods almost every year.', note: l('river name capital, "river" small here', 'নদীর নাম capital, এখানে "river" ছোট') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'The chart compares the populations of Canada, Brazil and India in 2010.', note: l('Task 1: countries always capital.', 'Task 1: দেশ সবসময় capital।') },
        { skill: 'listening', example: 'Name: Sadia Karim · Date of arrival: 14 March · Nationality: Bangladeshi', note: l('Listening forms: names, months and nationalities must be capitalised to be correct.', 'Listening form: নাম, মাস আর জাতীয়তা capital না হলে ভুল ধরা হতে পারে।') },
        { skill: 'reading', example: 'The Industrial Revolution began in Britain.', note: l('Reading: capitals show a specific name or event — useful for scanning.', 'Reading: capital নির্দিষ্ট নাম বা ঘটনা দেখায় — scan করতে কাজে লাগে।') },
        { skill: 'speaking', example: 'I usually visit my grandparents during Eid.', note: l('Speaking notes: write I and festival names with capitals in your Part 2 notes too.', 'Speaking note: Part 2-এর note-এও I আর উৎসবের নাম capital-এ লিখুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'i think technology is useful.', right: 'I think technology is useful.', why: l('The pronoun I and the first word are always capital.', 'Pronoun I আর প্রথম word সবসময় capital।') },
        { wrong: 'I moved to chattogram in january.', right: 'I moved to Chattogram in January.', why: l('City and month → capitals.', 'শহর আর মাস → capital।') },
        { wrong: 'We have exams in Summer.', right: 'We have exams in summer.', why: l('Seasons are small.', 'ঋতু ছোট।') },
        { wrong: 'I study Biology and english.', right: 'I study biology and English.', why: l('Subjects small, languages capital.', 'বিষয় ছোট, ভাষা capital।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('pu-1-p1', 'pn-capital', { ...P, pattern: 'pn-capitals', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['My sister lives in Canada.', 'my sister lives in canada.', 'My Sister Lives In Canada.'], answer: 'My sister lives in Canada.', explanation: l('First word + country → capitals; ordinary words small.', 'প্রথম word + দেশ → capital; সাধারণ word ছোট।'), why: { 'my sister lives in canada.': l('The first word and the country name need capitals.', 'প্রথম word আর দেশের নামে capital লাগে।'), 'My Sister Lives In Canada.': l('Ordinary words (sister, lives, in) are small.', 'সাধারণ word (sister, lives, in) ছোট।') } }),
        choice('pu-1-p2', 'pn-capital', { ...P, pattern: 'pn-capitals', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The course starts on Monday, 3 June.', 'The course starts on monday, 3 june.', 'The Course starts on Monday, 3 june.'], answer: 'The course starts on Monday, 3 June.', explanation: l('Days and months → capitals.', 'দিন আর মাস → capital।'), why: { 'The course starts on monday, 3 june.': l('Days and months always start with a capital letter.', 'দিন আর মাস সবসময় capital letter দিয়ে শুরু।'), 'The Course starts on Monday, 3 june.': l('"course" is an ordinary word; June needs a capital.', '"course" সাধারণ word; June-এ capital লাগে।') } }),
        choice('pu-1-p3', 'pn-capital', { ...P, pattern: 'pn-capitals', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['I enjoy maths, but my best subject is English.', 'I enjoy Maths, but my best subject is english.', 'i enjoy maths, but my best subject is English.'], answer: 'I enjoy maths, but my best subject is English.', explanation: l('Subjects small; languages and I capital.', 'বিষয় ছোট; ভাষা আর I capital।'), why: { 'I enjoy Maths, but my best subject is english.': l('Reversed: maths is small, English (a language) is capital.', 'উল্টো: maths ছোট, English (ভাষা) capital।'), 'i enjoy maths, but my best subject is English.': l('The pronoun I is always capital.', 'Pronoun I সবসময় capital।') } }),
        choice('pu-1-p4', 'pn-capital', { ...P, pattern: 'pn-capitals', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Many students want to study at a university in Australia.', 'Many students want to study at a University in australia.', 'Many Students want to study at a university in Australia.'], answer: 'Many students want to study at a university in Australia.', explanation: l('"a university" is general → small; Australia → capital.', '"a university" সাধারণ → ছোট; Australia → capital।'), why: { 'Many students want to study at a University in australia.': l('A general noun is small; the country is capital.', 'সাধারণ noun ছোট; দেশ capital।'), 'Many Students want to study at a university in Australia.': l('"students" is an ordinary noun → small.', '"students" সাধারণ noun → ছোট।') } }),
        choice('pu-1-p5', 'pn-capital', { ...P, pattern: 'pn-capitals', prompt: l('Task 1: which sentence is correct?', 'Task 1: কোন sentence-টা ঠিক?'), options: ['In winter, fewer tourists visited Cox’s Bazar than in spring.', 'In Winter, fewer tourists visited cox’s bazar than in Spring.', 'In winter, fewer Tourists visited Cox’s Bazar than in Spring.'], answer: 'In winter, fewer tourists visited Cox’s Bazar than in spring.', explanation: l('Seasons small; place names capital.', 'ঋতু ছোট; জায়গার নাম capital।'), why: { 'In Winter, fewer tourists visited cox’s bazar than in Spring.': l('Seasons are small; Cox’s Bazar is a place name.', 'ঋতু ছোট; Cox’s Bazar জায়গার নাম।'), 'In winter, fewer Tourists visited Cox’s Bazar than in Spring.': l('"tourists" and "spring" are small.', '"tourists" আর "spring" ছোট।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('pu-1-r1', 'pn-capital', { ...S, pattern: 'pn-capitals', prompt: l('Write the month with the correct capital letter.', 'সঠিক capital letter দিয়ে মাসটা লিখুন।'), sentence: 'The monsoon usually starts in ___ (june).', base: 'june', accepted: ['June'], explanation: l('Months → capital: June.', 'মাস → capital: June।') }),
        gap('pu-1-r2', 'pn-capital', { ...S, pattern: 'pn-capitals', prompt: l('Write the language with the correct capital letter.', 'সঠিক capital letter দিয়ে ভাষাটা লিখুন।'), sentence: 'At home we speak ___ (bangla), but at work we use English.', base: 'bangla', accepted: ['Bangla', 'Bengali'], explanation: l('Languages → capital: Bangla.', 'ভাষা → capital: Bangla।') }),
        correct('pu-1-r3', 'pn-capital', { ...S, pattern: 'pn-capitals', prompt: l('Rewrite with correct capital letters (keep the full stop).', 'সঠিক capital letter দিয়ে আবার লিখুন (full stop রাখুন)।'), sentence: 'i visited sylhet last friday.', accepted: ['I visited Sylhet last Friday.'], explanation: l('I · Sylhet · Friday.', 'I · Sylhet · Friday।') }),
        spot('pu-1-r4', 'pn-capital', { ...S, pattern: 'pn-capitals', prompt: l('One word needs a capital letter. Tap it and type it correctly.', 'একটা word-এ capital letter লাগবে। সেটায় tap করে সঠিকভাবে লিখুন।'), sentence: 'My cousin works for a company in japan.', wrong: 'japan', accepted: ['Japan', 'Japan.'], explanation: l('Countries → capital: Japan.', 'দেশ → capital: Japan।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pu-1-c1', 'pn-capital', { ...P, pattern: 'pn-capitals', prompt: l('Which word should NOT have a capital letter?', 'কোন word-এ capital letter থাকা উচিত না?'), options: ['Autumn', 'Tuesday', 'Chinese'], answer: 'Autumn', explanation: l('Seasons are small (autumn); days and nationalities are capital.', 'ঋতু ছোট (autumn); দিন আর জাতীয়তা capital।') }),
        spot('pu-1-c2', 'pn-capital', { ...S, pattern: 'pn-capitals', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Last year i took the IELTS test in Dhaka.', wrong: 'i', accepted: ['I'], fixOptions: ['I', 'me', 'my'], explanation: l('The pronoun I is always capital.', 'Pronoun I সবসময় capital।') }),
        order('pu-1-c3', 'pn-capital', { ...P, pattern: 'pn-capitals', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'My father speaks Arabic and English.', explanation: l('First word and languages → capitals.', 'প্রথম word আর ভাষা → capital।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: introduce yourself', 'এবার আপনার পালা: নিজের পরিচয়'),
      exercises: [
        write('pu-1-y1', 'pn-capital', {
          ...P,
          prompt: l('Write 3 sentences introducing yourself for a university application: your name, where you are from, the languages you speak, and when you plan to start.', 'University application-এর জন্য নিজের পরিচয় দিয়ে ৩টা sentence লিখুন: নাম, কোথা থেকে, কোন ভাষা বলেন, আর কবে শুরু করতে চান।'),
          model: 'My name is Farhana Akter, and I am from Mymensingh in Bangladesh. I speak Bangla and English, and I am learning Korean. I hope to start my degree in September next year.',
          checklist: [l('first word and every I', 'প্রথম word আর প্রতিটা I'), l('names, places, languages, months', 'নাম, জায়গা, ভাষা, মাস'), l('seasons and subjects small', 'ঋতু আর বিষয় ছোট')],
          explanation: l('Capitals only where English needs them.', 'English-এ যেখানে লাগে শুধু সেখানে capital।'),
          task: 'The student writes 3 sentences introducing themselves for a university application. Check capital letters only: the first word of every sentence; the pronoun I (and I’m, I’ve); names of people, cities, countries, rivers and organisations; days, months and festivals; languages and nationalities (English, Bangladeshi); named institutions (Dhaka University) but small letters for general nouns (a university, the government), seasons (summer) and school subjects except languages (maths, biology). Also flag capitals used in the middle of a sentence for emphasis. For each issue quote the word and give the fix.',
          target: l('Capital letters', 'Capital letter'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Capital: first word · I · names · places · days · months · languages · nationalities.', 'Capital: প্রথম word · I · নাম · জায়গা · দিন · মাস · ভাষা · জাতীয়তা।'),
        l('Small: seasons · subjects (except languages) · general nouns (a university).', 'ছোট: ঋতু · বিষয় (ভাষা ছাড়া) · সাধারণ noun (a university)।'),
        l('Proofread for "i" and lower-case names — they cost easy marks.', '"i" আর ছোট হাতের নাম proofread করুন — এগুলোতে সহজ নম্বর কাটে।'),
      ],
    },
  ],
};

// ======================================================================= pn-2
export const pnEndMarks: Lesson = {
  id: 'pu-2',
  format: 'v2',
  concept: 'pn-end',
  title: l('Full stops and question marks', 'Full stop আর question mark'),
  why: l('A full stop tells the examiner where one idea ends. Missing full stops create run-on sentences; a question mark after "I wonder where he is" is a common error.', 'Full stop examiner-কে বলে একটা idea কোথায় শেষ। Full stop না দিলে run-on sentence হয়; "I wonder where he is"-এর পরে question mark একটা common ভুল।'),
  minutes: 9,
  difficulty: 'easy',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A message to a landlord', 'বাড়িওয়ালাকে একটা message'),
      situation: l('You write: "I saw your advert for a room I would like to see it is it still available"', 'আপনি লিখলেন: "I saw your advert for a room I would like to see it is it still available"'),
      question: l('What punctuation does this need?', 'এতে কী punctuation লাগবে?'),
      options: ['Two full stops and a question mark', 'Commas only', 'Nothing — the meaning is clear'],
      answer: 'Two full stops and a question mark',
      diagnose: {
        'Two full stops and a question mark': l('Right: "I saw your advert for a room. I would like to see it. Is it still available?" Three sentences, three end marks.', 'ঠিক: "I saw your advert for a room. I would like to see it. Is it still available?" তিনটা sentence, তিনটা শেষ চিহ্ন।'),
        'Commas only': l('Commas cannot end sentences. Each complete idea needs a full stop, and the direct question needs a question mark.', 'Comma sentence শেষ করতে পারে না। প্রতিটা সম্পূর্ণ idea-য় full stop, আর সরাসরি প্রশ্নে question mark লাগে।'),
        'Nothing — the meaning is clear': l('The reader has to guess where each sentence ends. In IELTS, this is marked as a punctuation error.', 'পাঠককে অনুমান করতে হয় কোথায় sentence শেষ। IELTS-এ এটা punctuation-এর ভুল হিসেবে ধরা হয়।'),
      },
    },
    {
      kind: 'discover',
      title: l('Statements, questions, and questions inside statements', 'Statement, প্রশ্ন, আর statement-এর ভেতরে প্রশ্ন'),
      items: [
        { en: 'The library opens at nine.', note: l('statement → full stop', 'statement → full stop') },
        { en: 'When does the library open?', note: l('direct question → question mark', 'সরাসরি প্রশ্ন → question mark') },
        { en: 'I wonder when the library opens.', note: l('indirect question inside a statement → full stop', 'statement-এর ভেতরে indirect question → full stop') },
        { en: 'Could you tell me when the library opens?', note: l('the whole sentence is a question (Could you…) → question mark', 'পুরো sentence প্রশ্ন (Could you…) → question mark') },
      ],
      question: l('Why does "I wonder when the library opens" end with a full stop?', '"I wonder when the library opens" কেন full stop দিয়ে শেষ?'),
      options: [
        l('The whole sentence is a statement about what I wonder, not a question', 'পুরো sentence-টা আমি কী ভাবছি সেই statement, প্রশ্ন না'),
        l('Questions with "when" never take a question mark', '"when"-সহ প্রশ্নে কখনো question mark বসে না'),
        l('It is too long for a question mark', 'Question mark-এর জন্য খুব লম্বা'),
      ],
      answer: 0,
      pattern: l('End mark = the type of the WHOLE sentence: statement → . · direct question → ? · "I wonder / I don’t know / I asked + question word" → . · "Can / Could you tell me …" → ?', 'শেষ চিহ্ন = পুরো sentence-এর ধরন: statement → . · সরাসরি প্রশ্ন → ? · "I wonder / I don’t know / I asked + question word" → . · "Can / Could you tell me …" → ?'),
    },
    {
      kind: 'concept',
      title: l('Ending sentences correctly', 'সঠিকভাবে sentence শেষ করা'),
      body: l(
        'Every sentence ends with a full stop, a question mark or (rarely in IELTS) an exclamation mark. The end mark depends on the whole sentence.',
        'প্রতিটা sentence full stop, question mark বা (IELTS-এ কম) exclamation mark দিয়ে শেষ হয়। শেষ চিহ্ন পুরো sentence-এর উপর নির্ভর করে।',
      ),
      points: [
        l('Full stop: after every statement, including short answers and indirect questions (I asked where the office was.).', 'Full stop: প্রতিটা statement-এর পরে, ছোট উত্তর আর indirect question-সহ (I asked where the office was.)।'),
        l('Question mark: only after a direct question (Where is the office?) or a polite request in question form (Could you send me the form?).', 'Question mark: শুধু সরাসরি প্রশ্নের পরে (Where is the office?) বা প্রশ্নের আকারে ভদ্র অনুরোধে (Could you send me the form?)।'),
        l('Exclamation mark: avoid it in IELTS Writing; one at most in an informal Task 1 letter.', 'Exclamation mark: IELTS Writing-এ এড়িয়ে চলুন; informal Task 1 letter-এ সর্বোচ্চ একটা।'),
        l('After a full stop, the next word starts with a capital letter. No space before . or ?, one space after.', 'Full stop-এর পরে পরের word capital letter দিয়ে শুরু। . বা ?-এর আগে space না, পরে একটা space।'),
        l('Why Bangla speakers slip: Bangla ends sentences with the দাঁড়ি (।) and often joins several ideas before one দাঁড়ি; when typing English, the full stop is forgotten or replaced by a comma. Indirect questions keep "?" because the Bangla sentence feels like a question.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় দাঁড়ি (।) দিয়ে sentence শেষ হয় আর প্রায়ই একটা দাঁড়ির আগে কয়েকটা idea জোড়া থাকে; English type করার সময় full stop বাদ পড়ে বা comma হয়ে যায়। বাংলা sentence প্রশ্নের মতো শোনায় বলে indirect question-এ "?" থেকে যায়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'The bus was late. We missed the start of the film.', note: l('two statements, two full stops', 'দুটো statement, দুটো full stop') },
        { en: 'Do you prefer tea or coffee?', note: l('direct question', 'সরাসরি প্রশ্ন') },
        { en: 'I don’t know why the shop is closed.', note: l('indirect question → full stop', 'indirect question → full stop') },
        { en: 'Could you tell me how much the ticket costs?', note: l('polite question → question mark', 'ভদ্র প্রশ্ন → question mark') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Many people are moving to cities. This has caused serious housing problems.', note: l('Task 2: clear full stops = clear ideas.', 'Task 2: পরিষ্কার full stop = পরিষ্কার idea।') },
        { skill: 'speaking', example: 'Could you repeat the question, please?', note: l('Speaking: asking the examiner politely is fine — and when you write this request, it ends with ?', 'Speaking: examiner-কে ভদ্রভাবে জিজ্ঞেস করা যায় — আর লিখলে এই অনুরোধ ? দিয়ে শেষ হয়।') },
        { skill: 'reading', example: 'Why do birds migrate? Scientists have several theories.', note: l('Reading: a question in a text often introduces the main topic.', 'Reading: text-এর প্রশ্ন প্রায়ই মূল topic আনে।') },
        { skill: 'listening', example: 'Sentence completion: "The museum closes at ________."', note: l('Listening: you write only the missing words, not an extra full stop.', 'Listening: শুধু বাদ পড়া word লিখবেন, বাড়তি full stop না।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I don’t know where he lives?', right: 'I don’t know where he lives.', why: l('Indirect question inside a statement → full stop.', 'Statement-এর ভেতরে indirect question → full stop।') },
        { wrong: 'The rent is high, the flat is small, I will not take it.', right: 'The rent is high, and the flat is small. I will not take it.', why: l('End each complete idea with a full stop.', 'প্রতিটা সম্পূর্ণ idea full stop দিয়ে শেষ করুন।') },
        { wrong: 'What time does the office open.', right: 'What time does the office open?', why: l('Direct question → question mark.', 'সরাসরি প্রশ্ন → question mark।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('pu-2-p1', 'pn-end', { ...P, pattern: 'pn-run-on', prompt: l('Which is correctly punctuated?', 'কোনটার punctuation ঠিক?'), options: ['I live in Khulna. My school is near the river.', 'I live in Khulna, my school is near the river.', 'I live in Khulna my school is near the river.'], answer: 'I live in Khulna. My school is near the river.', explanation: l('Two statements → two full stops.', 'দুটো statement → দুটো full stop।'), why: { 'I live in Khulna, my school is near the river.': l('A comma cannot join two sentences (comma splice).', 'Comma দুটো sentence জুড়তে পারে না (comma splice)।'), 'I live in Khulna my school is near the river.': l('No end mark between two sentences (run-on).', 'দুটো sentence-এর মাঝে শেষ চিহ্ন নেই (run-on)।') } }),
        choice('pu-2-p2', 'pn-end', { ...P, pattern: 'pn-end-mark', prompt: l('Choose the correct end mark.', 'সঠিক শেষ চিহ্ন বেছে নিন।'), options: ['I wonder why the train is late.', 'I wonder why the train is late?', 'I wonder why is the train late?'], answer: 'I wonder why the train is late.', explanation: l('A statement about what I wonder → full stop.', 'আমি কী ভাবছি সেই statement → full stop।'), why: { 'I wonder why the train is late?': l('The sentence is a statement ("I wonder…"), so it ends with a full stop.', 'Sentence-টা statement ("I wonder…"), তাই full stop দিয়ে শেষ।'), 'I wonder why is the train late?': l('Question word order and "?" — both wrong inside a statement.', 'প্রশ্নের word order আর "?" — statement-এর ভেতরে দুটোই ভুল।') } }),
        choice('pu-2-p3', 'pn-end', { ...P, pattern: 'pn-end-mark', prompt: l('Choose the correct sentence.', 'সঠিক sentence বেছে নিন।'), options: ['Could you send me the application form?', 'Could you send me the application form.', 'Could you send me the application form!'], answer: 'Could you send me the application form?', explanation: l('A polite request in question form → ?', 'প্রশ্নের আকারে ভদ্র অনুরোধ → ?'), why: { 'Could you send me the application form.': l('"Could you…" is a question → question mark.', '"Could you…" একটা প্রশ্ন → question mark।'), 'Could you send me the application form!': l('Exclamation marks sound rude or emotional in a formal letter.', 'Formal letter-এ exclamation mark অভদ্র বা আবেগপ্রবণ শোনায়।') } }),
        choice('pu-2-p4', 'pn-end', { ...P, pattern: 'pn-capitals', prompt: l('Which is correct after a full stop?', 'Full stop-এর পরে কোনটা ঠিক?'), options: ['We arrived late. The shop was closed.', 'We arrived late. the shop was closed.', 'We arrived late .The shop was closed.'], answer: 'We arrived late. The shop was closed.', explanation: l('No space before the full stop, one space after, capital letter next.', 'Full stop-এর আগে space না, পরে একটা space, পরের word capital।'), why: { 'We arrived late. the shop was closed.': l('A new sentence starts with a capital letter.', 'নতুন sentence capital letter দিয়ে শুরু।'), 'We arrived late .The shop was closed.': l('The space goes AFTER the full stop, not before it.', 'Space full stop-এর পরে, আগে না।') } }),
        choice('pu-2-p5', 'pn-end', { ...P, pattern: 'pn-run-on', prompt: l('Task 2: which is best punctuated?', 'Task 2: কোনটার punctuation সবচেয়ে ভালো?'), options: ['Technology has changed education. Students can now learn online. However, not everyone has internet access.', 'Technology has changed education, students can now learn online, however not everyone has internet access.', 'Technology has changed education students can now learn online however not everyone has internet access.'], answer: 'Technology has changed education. Students can now learn online. However, not everyone has internet access.', explanation: l('One idea per sentence; full stops between them.', 'প্রতি sentence-এ একটা idea; মাঝে full stop।'), why: { 'Technology has changed education, students can now learn online, however not everyone has internet access.': l('Three sentences joined by commas — a run-on with comma splices.', 'Comma দিয়ে জোড়া তিনটা sentence — comma splice-সহ run-on।'), 'Technology has changed education students can now learn online however not everyone has internet access.': l('No end marks at all.', 'কোনো শেষ চিহ্ন নেই।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        correct('pu-2-r1', 'pn-end', { ...S, pattern: 'pn-end-mark', prompt: l('Add the correct end mark.', 'সঠিক শেষ চিহ্ন দিন।'), sentence: 'Where did you buy that bag', accepted: ['Where did you buy that bag?'], explanation: l('Direct question → ?', 'সরাসরি প্রশ্ন → ?') }),
        correct('pu-2-r2', 'pn-end', { ...S, pattern: 'pn-end-mark', prompt: l('Fix the end mark.', 'শেষ চিহ্ন ঠিক করুন।'), sentence: 'I asked her what time the class started?', accepted: ['I asked her what time the class started.'], explanation: l('Indirect question in a statement → full stop.', 'Statement-এ indirect question → full stop।') }),
        correct('pu-2-r3', 'pn-end', { ...S, pattern: 'pn-run-on', prompt: l('Split into two sentences (full stop + capital letter).', 'দুটো sentence-এ ভাগ করুন (full stop + capital letter)।'), sentence: 'The café was full we went to the park.', accepted: ['The café was full. We went to the park.', 'The cafe was full. We went to the park.'], explanation: l('Two ideas → two sentences.', 'দুটো idea → দুটো sentence।') }),
        gap('pu-2-r4', 'pn-end', { ...S, pattern: 'pn-end-mark', prompt: l('Write the end mark: . or ?', 'শেষ চিহ্ন লিখুন: . বা ?'), sentence: 'Could you tell me where the station is ___', accepted: ['?'], explanation: l('"Could you…" is a question → ?', '"Could you…" প্রশ্ন → ?') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pu-2-c1', 'pn-end', { ...P, pattern: 'pn-end-mark', prompt: l('Which sentence should end with a question mark?', 'কোন sentence question mark দিয়ে শেষ হওয়া উচিত?'), options: ['Do you know if the bank is open', 'I don’t know if the bank is open', 'She asked if the bank was open'], answer: 'Do you know if the bank is open', explanation: l('Only "Do you know…" is a question.', 'শুধু "Do you know…" একটা প্রশ্ন।') }),
        spot('pu-2-c2', 'pn-end', { ...S, pattern: 'pn-end-mark', prompt: l('One word has the wrong end mark. Tap it and fix it.', 'একটা word-এ ভুল শেষ চিহ্ন। Tap করে ঠিক করুন।'), sentence: 'Nobody knows why the bridge collapsed?', wrong: 'collapsed', accepted: ['collapsed.'], fixOptions: ['collapsed.', 'collapsed?', 'collapsed,'], explanation: l('A statement → full stop.', 'Statement → full stop।') }),
        order('pu-2-c3', 'pn-end', { ...P, pattern: 'pn-end-mark', prompt: l('Build the question.', 'প্রশ্নটা সাজান।'), answer: 'How long does the course take?', explanation: l('Direct question → ?', 'সরাসরি প্রশ্ন → ?') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: an enquiry', 'এবার আপনার পালা: একটা জিজ্ঞাসা'),
      exercises: [
        write('pu-2-y1', 'pn-end', {
          ...P,
          prompt: l('Task 1 letter: write 3 sentences to a language school — one statement, one direct question, and one indirect question ("I would like to know …").', 'Task 1 letter: একটা language school-কে ৩টা sentence লিখুন — একটা statement, একটা সরাসরি প্রশ্ন, আর একটা indirect question ("I would like to know …")।'),
          model: 'I am interested in your evening English course. Is there a class for beginners? I would also like to know how much the course costs.',
          checklist: [l('statement → full stop', 'statement → full stop'), l('direct question → question mark', 'সরাসরি প্রশ্ন → question mark'), l('"I would like to know …" → full stop', '"I would like to know …" → full stop')],
          explanation: l('The whole sentence decides the end mark.', 'পুরো sentence শেষ চিহ্ন ঠিক করে।'),
          task: 'The student writes 3 sentences to a language school: a statement, a direct question and an indirect question. Check end marks and sentence boundaries only: every sentence ends with a full stop or question mark; direct questions and "Could you / Can you …" requests take "?"; indirect questions inside statements (I would like to know how much it costs; I wonder whether …) take a full stop and statement word order; no comma splices or run-ons between complete ideas; a capital letter after each full stop; no space before . or ?; avoid exclamation marks in formal letters. For each issue quote the words and give the fix.',
          target: l('Full stops and question marks', 'Full stop আর question mark'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('One complete idea → one sentence → one end mark.', 'একটা সম্পূর্ণ idea → একটা sentence → একটা শেষ চিহ্ন।'),
        l('Direct question / Could you …? → ? · I wonder / I asked / I don’t know … → .', 'সরাসরি প্রশ্ন / Could you …? → ? · I wonder / I asked / I don’t know … → .'),
        l('Capital after a full stop; no space before it.', 'Full stop-এর পরে capital; আগে space না।'),
      ],
    },
  ],
};

// ======================================================================= pn-3
export const pnCommas: Lesson = {
  id: 'pu-3',
  format: 'v2',
  concept: 'pn-comma',
  title: l('Commas that help: lists, openings, joining', 'কাজের comma: তালিকা, শুরু, জোড়া'),
  why: l('Three comma rules cover almost every comma you need in IELTS. Commas in the right place make long Task 2 sentences easy to read.', 'তিনটা comma-র নিয়মেই IELTS-এর প্রায় সব comma হয়ে যায়। ঠিক জায়গায় comma দিলে লম্বা Task 2 sentence সহজে পড়া যায়।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 2 sentence', 'একটা Task 2 sentence'),
      situation: l('You write: "In many countries young people want to study abroad but the cost of tuition rent and travel is very high."', 'আপনি লিখলেন: "In many countries young people want to study abroad but the cost of tuition rent and travel is very high."'),
      question: l('Where do commas help most?', 'কোথায় comma সবচেয়ে বেশি সাহায্য করে?'),
      options: ['After "In many countries", before "but", and between "tuition, rent"', 'After every noun', 'Nowhere — commas are optional'],
      answer: 'After "In many countries", before "but", and between "tuition, rent"',
      diagnose: {
        'After "In many countries", before "but", and between "tuition, rent"': l('Right: "In many countries, young people want to study abroad, but the cost of tuition, rent and travel is very high." An opening phrase, two joined clauses, a list.', 'ঠিক: "In many countries, young people want to study abroad, but the cost of tuition, rent and travel is very high." শুরুর phrase, দুটো জোড়া clause, একটা তালিকা।'),
        'After every noun': l('Too many commas break the sentence up. Commas go in three main places: lists, after an opening phrase or clause, and before and / but / so joining two clauses.', 'বেশি comma sentence-কে টুকরো করে দেয়। Comma মূলত তিন জায়গায়: তালিকা, শুরুর phrase বা clause-এর পরে, আর দুটো clause জোড়া and / but / so-এর আগে।'),
        'Nowhere — commas are optional': l('Without commas, the list "tuition rent and travel" is hard to read, and the two clauses run together.', 'Comma ছাড়া "tuition rent and travel" তালিকা পড়া কঠিন, আর দুটো clause একসাথে চলে যায়।'),
      },
    },
    {
      kind: 'discover',
      title: l('Three places for a comma', 'Comma-র তিনটা জায়গা'),
      items: [
        { en: 'We need rice, lentils, onions and oil.', note: l('1 lists (no comma needed before "and" in British English)', '১ তালিকা (British English-এ "and"-এর আগে comma লাগে না)') },
        { en: 'In 2020, the number of visitors fell sharply.', note: l('2 after an opening phrase', '২ শুরুর phrase-এর পরে') },
        { en: 'Although it was raining, the market was busy.', note: l('2 after an opening clause', '২ শুরুর clause-এর পরে') },
        { en: 'The rent is high, but the flat is spacious.', note: l('3 before and / but / so joining two full clauses', '৩ দুটো পূর্ণ clause জোড়া and / but / so-এর আগে') },
      ],
      question: l('Which sentence needs NO comma before "and"?', 'কোন sentence-এ "and"-এর আগে comma লাগে না?'),
      options: [
        l('I bought bread and milk.', 'I bought bread and milk.'),
        l('I bought bread, and my brother bought milk.', 'I bought bread, and my brother bought milk.'),
        l('Both need a comma', 'দুটোতেই comma লাগে'),
      ],
      answer: 0,
      pattern: l('Commas help in three places: between items in a list · after an opening phrase or clause · before and / but / so when each side is a full clause (subject + verb).', 'Comma তিন জায়গায় সাহায্য করে: তালিকার item-এর মাঝে · শুরুর phrase বা clause-এর পরে · and / but / so-এর আগে যখন দুই দিকেই পূর্ণ clause (subject + verb)।'),
    },
    {
      kind: 'concept',
      title: l('The three helpful comma rules', 'কাজের তিনটা comma-র নিয়ম'),
      body: l(
        'Most useful commas follow three rules. Learn these, and leave commas out elsewhere unless you are sure.',
        'বেশিরভাগ কাজের comma তিনটা নিয়ম মেনে চলে। এগুলো শিখুন, আর নিশ্চিত না হলে অন্য জায়গায় comma দেবেন না।',
      ),
      points: [
        l('Lists: A, B and C (British) or A, B, and C (American) — both are fine; be consistent. Numbers: 1,000 and 25,000 (not 1.000).', 'তালিকা: A, B and C (British) বা A, B, and C (American) — দুটোই চলে; একই রকম রাখুন। সংখ্যা: 1,000 আর 25,000 (1.000 না)।'),
        l('After an opening phrase or clause: In 2010, … · However, … · As a result, … · When I arrived, … · If it rains, …', 'শুরুর phrase বা clause-এর পরে: In 2010, … · However, … · As a result, … · When I arrived, … · If it rains, …'),
        l('Before and / but / so / or when both sides are full clauses: Prices rose, so people bought less. (No comma if the second part has no subject: Prices rose and fell.)', 'দুই দিকে পূর্ণ clause থাকলে and / but / so / or-এর আগে: Prices rose, so people bought less। (দ্বিতীয় অংশে subject না থাকলে comma না: Prices rose and fell।)'),
        l('Also: commas around extra information (Dhaka, the capital, is busy.) and after Yes / No / Well in dialogue.', 'এছাড়া: বাড়তি তথ্যের চারপাশে comma (Dhaka, the capital, is busy.) আর সংলাপে Yes / No / Well-এর পরে।'),
        l('Why Bangla speakers slip: Bangla uses commas as pauses wherever you would breathe, and "এবং" / "ও" lists often use no commas at all. English commas follow grammar, not breathing.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় যেখানে শ্বাস নেন সেখানেই comma বসে, আর "এবং" / "ও" দিয়ে তালিকায় প্রায়ই comma থাকে না। English-এ comma grammar মেনে বসে, শ্বাস মেনে না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'I visited Sylhet, Srimangal and Sunamganj.', note: l('list', 'তালিকা') },
        { en: 'After the exam, we went for lunch.', note: l('opening phrase', 'শুরুর phrase') },
        { en: 'The tickets were cheap, so we bought four.', note: l('two clauses + so', 'দুটো clause + so') },
        { en: 'The population grew and became more urban.', note: l('no comma: no new subject after "and"', 'comma না: "and"-এর পরে নতুন subject নেই') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Between 2000 and 2020, the use of coal, oil and gas increased steadily.', note: l('Task 1: opening phrase + list.', 'Task 1: শুরুর phrase + তালিকা।') },
        { skill: 'speaking', example: 'I like my job, but it’s tiring, so I relax at weekends.', note: l('Speaking: the small pauses before but and so are where the commas go in writing.', 'Speaking: but আর so-এর আগের ছোট বিরতিগুলোতেই লেখায় comma বসে।') },
        { skill: 'reading', example: 'The island, which is 20 km long, has three villages.', note: l('Reading: commas around extra information you can skip.', 'Reading: বাড়তি তথ্যের চারপাশে comma, যেটা বাদ দিয়ে পড়া যায়।') },
        { skill: 'listening', example: 'Bring a pen, a notebook and your ID card.', note: l('Listening: lists are often answers — listen for each item.', 'Listening: তালিকা প্রায়ই উত্তর — প্রতিটা item শুনুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'In 2015 the figure doubled.', right: 'In 2015, the figure doubled.', why: l('A comma after an opening phrase makes it clearer (strongly recommended in Task 1).', 'শুরুর phrase-এর পরে comma দিলে পরিষ্কার হয় (Task 1-এ দেওয়া ভালো)।') },
        { wrong: 'We need pens paper and books.', right: 'We need pens, paper and books.', why: l('Separate list items with commas.', 'তালিকার item comma দিয়ে আলাদা করুন।') },
        { wrong: 'The flat is small but, it is cheap.', right: 'The flat is small, but it is cheap.', why: l('The comma goes BEFORE but, not after it.', 'Comma but-এর আগে, পরে না।') },
        { wrong: 'The number was 12.500.', right: 'The number was 12,500.', why: l('English uses a comma for thousands and a point for decimals.', 'English-এ হাজারে comma, দশমিকে point।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('pu-3-p1', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Which list is correct?', 'কোন তালিকা ঠিক?'), options: ['I bought mangoes, lychees and bananas.', 'I bought mangoes lychees and bananas.', 'I bought, mangoes, lychees, and, bananas.'], answer: 'I bought mangoes, lychees and bananas.', explanation: l('Commas between list items.', 'তালিকার item-এর মাঝে comma।'), why: { 'I bought mangoes lychees and bananas.': l('List items need commas between them.', 'তালিকার item-এর মাঝে comma লাগে।'), 'I bought, mangoes, lychees, and, bananas.': l('No comma after the verb or after "and".', 'Verb-এর পরে আর "and"-এর পরে comma না।') } }),
        choice('pu-3-p2', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Where does the comma go?', 'Comma কোথায় বসবে?'), options: ['When the results came out, everyone was happy.', 'When, the results came out everyone was happy.', 'When the results came, out everyone was happy.'], answer: 'When the results came out, everyone was happy.', explanation: l('After the whole opening clause.', 'পুরো শুরুর clause-এর পরে।'), why: { 'When, the results came out everyone was happy.': l('Not after "When" — after the whole clause.', '"When"-এর পরে না — পুরো clause-এর পরে।'), 'When the results came, out everyone was happy.': l('"came out" belongs together; the comma goes after "out".', '"came out" একসাথে; comma "out"-এর পরে।') } }),
        choice('pu-3-p3', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['It was late, so we took a taxi.', 'It was late so, we took a taxi.', 'It was late, so, we took a taxi.'], answer: 'It was late, so we took a taxi.', explanation: l('Comma BEFORE so joining two clauses.', 'দুটো clause জোড়া so-এর আগে comma।'), why: { 'It was late so, we took a taxi.': l('The comma goes before so, not after it.', 'Comma so-এর আগে, পরে না।'), 'It was late, so, we took a taxi.': l('No comma after so.', 'so-এর পরে comma না।') } }),
        choice('pu-3-p4', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Which sentence does NOT need a comma before "and"?', 'কোন sentence-এ "and"-এর আগে comma লাগে না?'), options: ['Sales rose and then levelled off.', 'Sales rose, and profits fell.', 'Both need a comma.'], answer: 'Sales rose and then levelled off.', explanation: l('No new subject after "and" → no comma.', '"and"-এর পরে নতুন subject নেই → comma না।'), why: { 'Sales rose, and profits fell.': l('Here "profits fell" is a full clause with its own subject, so the comma is fine.', 'এখানে "profits fell" নিজস্ব subject-সহ পূর্ণ clause, তাই comma ঠিক আছে।'), 'Both need a comma.': l('"then levelled off" has no subject — it shares "Sales".', '"then levelled off"-এর subject নেই — "Sales" ভাগ করে।') } }),
        choice('pu-3-p5', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Task 1: choose the correctly punctuated sentence.', 'Task 1: সঠিক punctuation-এর sentence বেছে নিন।'), options: ['In 2019, exports reached 35,000 tonnes.', 'In 2019 exports reached 35.000 tonnes.', 'In, 2019 exports reached 35,000 tonnes.'], answer: 'In 2019, exports reached 35,000 tonnes.', explanation: l('Comma after the opening phrase; comma for thousands.', 'শুরুর phrase-এর পরে comma; হাজারে comma।'), why: { 'In 2019 exports reached 35.000 tonnes.': l('Thousands take a comma in English (35,000).', 'English-এ হাজারে comma (35,000)।'), 'In, 2019 exports reached 35,000 tonnes.': l('"In 2019" is one phrase; the comma goes after it.', '"In 2019" একটা phrase; comma তার পরে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        correct('pu-3-r1', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Add the commas to the list.', 'তালিকায় comma দিন।'), sentence: 'The course covers reading writing listening and speaking.', accepted: ['The course covers reading, writing, listening and speaking.', 'The course covers reading, writing, listening, and speaking.'], explanation: l('Commas between list items.', 'তালিকার item-এর মাঝে comma।') }),
        correct('pu-3-r2', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Add one comma after the opening phrase.', 'শুরুর phrase-এর পরে একটা comma দিন।'), sentence: 'Over the next decade the population doubled.', accepted: ['Over the next decade, the population doubled.'], explanation: l('Opening phrase → comma.', 'শুরুর phrase → comma।') }),
        correct('pu-3-r3', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Add one comma before the joining word.', 'জোড়ার word-এর আগে একটা comma দিন।'), sentence: 'The hotel was expensive but the service was excellent.', accepted: ['The hotel was expensive, but the service was excellent.'], explanation: l('Two full clauses + but → comma before but.', 'দুটো পূর্ণ clause + but → but-এর আগে comma।') }),
        gap('pu-3-r4', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Write the number with a comma for thousands.', 'হাজারের comma-সহ সংখ্যাটা লিখুন।'), sentence: 'About ___ (12500) people attended the concert.', base: '12500', accepted: ['12,500'], explanation: l('Thousands → comma: 12,500.', 'হাজার → comma: 12,500।'), why: { '12.500': l('English uses a point for decimals, not thousands.', 'English-এ point দশমিকের জন্য, হাজারের জন্য না।') } }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pu-3-c1', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Which sentence uses commas correctly?', 'কোন sentence-এ comma ঠিকভাবে ব্যবহার হয়েছে?'), options: ['However, the plan was expensive, so the council delayed it.', 'However the plan, was expensive so, the council delayed it.', 'However, the plan was expensive so the council, delayed it.'], answer: 'However, the plan was expensive, so the council delayed it.', explanation: l('After However · before so.', 'However-এর পরে · so-এর আগে।') }),
        spot('pu-3-c2', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('One word needs a comma after it. Tap it and fix it.', 'একটা word-এর পরে comma লাগবে। Tap করে ঠিক করুন।'), sentence: 'We need pens paper and notebooks for the course.', wrong: 'pens', accepted: ['pens,'], fixOptions: ['pens,', 'pens.', 'pens;'], explanation: l('A list: pens, paper and notebooks.', 'তালিকা: pens, paper and notebooks।') }),
        order('pu-3-c3', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'In 2020, prices rose sharply.', explanation: l('Opening phrase + comma.', 'শুরুর phrase + comma।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 1 sentence set', 'এবার আপনার পালা: Task 1-এর কয়েকটা sentence'),
      exercises: [
        write('pu-3-y1', 'pn-comma', {
          ...P,
          prompt: l('Task 1: "Visitors to a museum: 8,000 (2010), 12,500 (2015), 10,000 (2020); most came from Dhaka, Chattogram and Sylhet." Write 3 sentences using a list, an opening phrase and a joining word (but / so).', 'Task 1: "একটা museum-এর দর্শক: 8,000 (2010), 12,500 (2015), 10,000 (2020); বেশিরভাগ এসেছেন Dhaka, Chattogram আর Sylhet থেকে।" একটা তালিকা, একটা শুরুর phrase আর একটা জোড়ার word (but / so) ব্যবহার করে ৩টা sentence লিখুন।'),
          model: 'In 2010, the museum had 8,000 visitors. The number rose to 12,500 in 2015, but it fell to 10,000 in 2020. Most visitors came from Dhaka, Chattogram and Sylhet.',
          checklist: [l('comma after an opening phrase (In 2010,)', 'শুরুর phrase-এর পরে comma (In 2010,)'), l(', but / , so between two full clauses', 'দুটো পূর্ণ clause-এর মাঝে , but / , so'), l('commas in lists and in numbers (12,500)', 'তালিকায় আর সংখ্যায় comma (12,500)')],
          explanation: l('Lists, openings, joining — commas that help.', 'তালিকা, শুরু, জোড়া — কাজের comma।'),
          task: 'The student writes 3 IELTS Task 1 sentences about museum visitors using a list, an opening phrase and but / so. Check commas only: commas between list items (the comma before "and" is optional but should be consistent); a comma after an opening phrase or clause (In 2010, …; Between 2010 and 2015, …; However, …); a comma before and / but / so / or when both sides are full clauses (not after the conjunction, and not when the second part has no subject); commas in numbers for thousands (12,500, never 12.500). Flag missing and misplaced commas. For each issue quote the words and give the fix.',
          target: l('Commas that help', 'কাজের comma'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Lists: A, B and C · numbers: 12,500.', 'তালিকা: A, B and C · সংখ্যা: 12,500।'),
        l('Opening phrase / clause → comma: In 2010, … · When I arrived, …', 'শুরুর phrase / clause → comma: In 2010, … · When I arrived, …'),
        l('Two full clauses: comma BEFORE and / but / so.', 'দুটো পূর্ণ clause: and / but / so-এর আগে comma।'),
      ],
    },
  ],
};

// ======================================================================= pn-4
export const pnCommaErrors: Lesson = {
  id: 'pu-4',
  format: 'v2',
  concept: 'pn-comma-error',
  title: l('Commas that break: splices and misplaced commas', 'ভুল comma: splice আর ভুল জায়গায় comma'),
  why: l('The two commas examiners mark most often are the comma splice ("It was late, we went home") and a comma between the subject and its verb.', 'Examiner-রা সবচেয়ে বেশি যে দুটো comma-কে ভুল ধরেন: comma splice ("It was late, we went home") আর subject ও তার verb-এর মাঝে comma।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 2 body sentence', 'একটা Task 2 body sentence'),
      situation: l('You write: "Students who study abroad, often feel lonely, they miss their families."', 'আপনি লিখলেন: "Students who study abroad, often feel lonely, they miss their families."'),
      question: l('What is wrong with the commas?', 'Comma-গুলোতে কী ভুল?'),
      options: ['The first comma splits subject and verb; the second joins two sentences', 'Nothing is wrong', 'It needs more commas'],
      answer: 'The first comma splits subject and verb; the second joins two sentences',
      diagnose: {
        'The first comma splits subject and verb; the second joins two sentences': l('Right. "Students who study abroad often feel lonely" — no comma between subject and verb. Then ". They miss their families." (or ", because they miss…").', 'ঠিক। "Students who study abroad often feel lonely" — subject আর verb-এর মাঝে comma না। তারপর ". They miss their families." (বা ", because they miss…")।'),
        'Nothing is wrong': l('Both commas are errors: one separates the subject from its verb, the other is a comma splice.', 'দুটো comma-ই ভুল: একটা subject-কে তার verb থেকে আলাদা করে, অন্যটা comma splice।'),
        'It needs more commas': l('It needs fewer: remove the comma after "abroad" and replace the second with a full stop or a joining word.', 'কম লাগবে: "abroad"-এর পরের comma মুছুন আর দ্বিতীয়টার জায়গায় full stop বা জোড়ার word দিন।'),
      },
    },
    {
      kind: 'discover',
      title: l('Where commas must NOT go', 'যেখানে comma দেওয়া যাবে না'),
      items: [
        { en: '✗ It was raining, we stayed at home.', note: l('comma splice: two sentences, one comma', 'comma splice: দুটো sentence, একটা comma') },
        { en: '✗ The number of cars, increased sharply.', note: l('comma between subject and verb', 'subject আর verb-এর মাঝে comma') },
        { en: '✗ Many people believe, that exams are stressful.', note: l('comma before a that-clause', 'that-clause-এর আগে comma') },
        { en: '✗ The students, who failed the test must retake it.', note: l('only one comma around a clause', 'clause-এর চারপাশে শুধু একটা comma') },
      ],
      question: l('How do you fix "It was raining, we stayed at home."?', '"It was raining, we stayed at home." কীভাবে ঠিক করবেন?'),
      options: [
        l('Use a full stop, a semicolon, or add so / because', 'Full stop, semicolon দিন, বা so / because যোগ করুন'),
        l('Add another comma', 'আরেকটা comma দিন'),
        l('Remove the word "we"', '"we" word-টা মুছুন'),
      ],
      answer: 0,
      pattern: l('No comma between two full sentences (use . / ; / , so / because), between a subject and its verb, before a that-clause, or on only one side of extra information.', 'দুটো পূর্ণ sentence-এর মাঝে comma না (. / ; / , so / because দিন), subject আর তার verb-এর মাঝে না, that-clause-এর আগে না, বা বাড়তি তথ্যের শুধু এক পাশে না।'),
    },
    {
      kind: 'concept',
      title: l('Four comma errors to remove', 'যে চারটা comma-র ভুল সরাতে হবে'),
      body: l(
        'A wrong comma is worse than a missing one: it breaks the grammar of the sentence. These four are the most common in IELTS scripts.',
        'ভুল comma বাদ পড়া comma-র চেয়েও খারাপ: sentence-এর grammar ভেঙে দেয়। IELTS-এর খাতায় এই চারটাই সবচেয়ে বেশি।',
      ),
      points: [
        l('Comma splice: "Prices rose, people bought less." → Prices rose. People bought less. / Prices rose, so people bought less. / Prices rose; people bought less.', 'Comma splice: "Prices rose, people bought less." → Prices rose. People bought less। / Prices rose, so people bought less। / Prices rose; people bought less।'),
        l('Subject | verb: no comma, even if the subject is long: "The number of students who live in hostels has doubled."', 'Subject | verb: comma না, subject লম্বা হলেও: "The number of students who live in hostels has doubled."'),
        l('Before that / what / whether-clauses after say, think, believe, know: "Many people think that …" (no comma).', 'say, think, believe, know-এর পরে that / what / whether-clause-এর আগে: "Many people think that …" (comma না)।'),
        l('Extra information needs commas on BOTH sides: "Dhaka, the capital, is crowded." (not "Dhaka, the capital is crowded.")', 'বাড়তি তথ্যের দুই পাশেই comma: "Dhaka, the capital, is crowded." ("Dhaka, the capital is crowded." না)।'),
        l('Why Bangla speakers slip: in Bangla, a comma marks any pause, and long subjects are often followed by a pause ("যারা বিদেশে পড়ে, তারা …"). English grammar does not allow a comma where a Bangla speaker pauses.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় যেকোনো বিরতিতে comma বসে, আর লম্বা subject-এর পরে প্রায়ই বিরতি থাকে ("যারা বিদেশে পড়ে, তারা …")। English grammar বাংলার বিরতির জায়গায় comma মানে না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Before → after', 'আগে → পরে'),
      items: [
        { en: 'The shop was closed, we went home. → The shop was closed, so we went home.', note: l('splice fixed with so', 'so দিয়ে splice ঠিক') },
        { en: 'People who exercise daily, sleep better. → People who exercise daily sleep better.', note: l('no comma between subject and verb', 'subject আর verb-এর মাঝে comma না') },
        { en: 'I believe, that education is a right. → I believe that education is a right.', note: l('no comma before that', 'that-এর আগে comma না') },
        { en: 'My father, a teacher loves books. → My father, a teacher, loves books.', note: l('commas on both sides', 'দুই পাশে comma') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'The proportion of people who used public transport fell to 30%.', note: l('Task 1: long subject, no comma before the verb.', 'Task 1: লম্বা subject, verb-এর আগে comma না।') },
        { skill: 'listening', example: 'Note completion: "Reason for the delay: ________"', note: l('Listening: write only the missing words — no extra commas or full stops.', 'Listening: শুধু বাদ পড়া word লিখুন — বাড়তি comma বা full stop না।') },
        { skill: 'reading', example: 'The researchers found that the method, although slow, was reliable.', note: l('Reading: paired commas mark an interruption you can skip.', 'Reading: জোড়া comma একটা বাধা দেখায় যেটা বাদ দিয়ে পড়া যায়।') },
        { skill: 'speaking', example: 'Written notes: "Part 2 — my uncle — lives in Dubai — works as a chef"', note: l('Speaking notes: short notes are fine; commas matter in writing, not in speaking.', 'Speaking note: ছোট note চলে; comma লেখায় গুরুত্বপূর্ণ, কথায় না।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The graph shows three trends, the first is a sharp rise.', right: 'The graph shows three trends. The first is a sharp rise.', why: l('Comma splice → full stop.', 'Comma splice → full stop।') },
        { wrong: 'The main reason for this problem, is poverty.', right: 'The main reason for this problem is poverty.', why: l('No comma between subject and verb.', 'Subject আর verb-এর মাঝে comma না।') },
        { wrong: 'It is clear, that action is needed.', right: 'It is clear that action is needed.', why: l('No comma before a that-clause.', 'that-clause-এর আগে comma না।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('pu-4-p1', 'pn-comma-error', { ...P, pattern: 'pn-run-on', prompt: l('Which sentence has NO comma splice?', 'কোন sentence-এ comma splice নেই?'), options: ['The road was blocked, so we turned back.', 'The road was blocked, we turned back.', 'The road was blocked, we turned, back.'], answer: 'The road was blocked, so we turned back.', explanation: l('Two clauses joined with , so.', ', so দিয়ে দুটো clause জোড়া।'), why: { 'The road was blocked, we turned back.': l('Two sentences joined by a comma alone = comma splice.', 'শুধু comma দিয়ে জোড়া দুটো sentence = comma splice।'), 'The road was blocked, we turned, back.': l('Still a splice, plus an extra comma inside "turned back".', 'এখনো splice, আর "turned back"-এর ভেতরে বাড়তি comma।') } }),
        choice('pu-4-p2', 'pn-comma-error', { ...P, pattern: 'pn-comma-use', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The number of people living in cities has grown rapidly.', 'The number of people living in cities, has grown rapidly.', 'The number of people, living in cities has grown rapidly.'], answer: 'The number of people living in cities has grown rapidly.', explanation: l('No comma between the (long) subject and the verb.', '(লম্বা) subject আর verb-এর মাঝে comma না।'), why: { 'The number of people living in cities, has grown rapidly.': l('A comma between the subject and "has grown" breaks the sentence.', 'Subject আর "has grown"-এর মাঝে comma sentence ভেঙে দেয়।'), 'The number of people, living in cities has grown rapidly.': l('This comma cuts the subject in half.', 'এই comma subject-কে দুই ভাগ করে দেয়।') } }),
        choice('pu-4-p3', 'pn-comma-error', { ...P, pattern: 'pn-comma-use', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Many parents believe that homework is useful.', 'Many parents believe, that homework is useful.', 'Many parents, believe that homework is useful.'], answer: 'Many parents believe that homework is useful.', explanation: l('No comma before that, none between subject and verb.', 'that-এর আগে comma না, subject আর verb-এর মাঝে না।'), why: { 'Many parents believe, that homework is useful.': l('No comma before a that-clause after believe / think / say.', 'believe / think / say-এর পরে that-clause-এর আগে comma না।'), 'Many parents, believe that homework is useful.': l('No comma between the subject and the verb.', 'Subject আর verb-এর মাঝে comma না।') } }),
        choice('pu-4-p4', 'pn-comma-error', { ...P, pattern: 'pn-comma-use', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Rajshahi, a city in the north, is famous for mangoes.', 'Rajshahi, a city in the north is famous for mangoes.', 'Rajshahi a city in the north, is famous for mangoes.'], answer: 'Rajshahi, a city in the north, is famous for mangoes.', explanation: l('Extra information → commas on both sides.', 'বাড়তি তথ্য → দুই পাশে comma।'), why: { 'Rajshahi, a city in the north is famous for mangoes.': l('The closing comma is missing after "north".', '"north"-এর পরে শেষের comma নেই।'), 'Rajshahi a city in the north, is famous for mangoes.': l('The opening comma is missing after "Rajshahi".', '"Rajshahi"-এর পরে শুরুর comma নেই।') } }),
        choice('pu-4-p5', 'pn-comma-error', { ...P, pattern: 'pn-run-on', prompt: l('Task 2: choose the best fix for the splice.', 'Task 2: splice-এর সবচেয়ে ভালো সমাধান বেছে নিন।'), sentence: 'Fast food is cheap, it is often unhealthy.', options: ['Fast food is cheap, but it is often unhealthy.', 'Fast food is cheap, it, is often unhealthy.', 'Fast food, is cheap it is often unhealthy.'], answer: 'Fast food is cheap, but it is often unhealthy.', explanation: l('Contrast → , but.', 'বিপরীত → , but।'), why: { 'Fast food is cheap, it, is often unhealthy.': l('Adding a comma does not fix a splice; it adds another error.', 'Comma যোগ করলে splice ঠিক হয় না; আরেকটা ভুল যোগ হয়।'), 'Fast food, is cheap it is often unhealthy.': l('A comma between subject and verb, and a run-on.', 'Subject আর verb-এর মাঝে comma, আর একটা run-on।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        correct('pu-4-r1', 'pn-comma-error', { ...P, pattern: 'pn-run-on', prompt: l('Fix the comma splice.', 'Comma splice ঠিক করুন।'), sentence: 'The bus was full, we waited for the next one.', accepted: ['The bus was full, so we waited for the next one.', 'The bus was full. We waited for the next one.', 'The bus was full; we waited for the next one.', 'The bus was full, and we waited for the next one.', 'Because the bus was full, we waited for the next one.'], explanation: l(', so / . / ;', ', so / . / ;') }),
        correct('pu-4-r2', 'pn-comma-error', { ...P, pattern: 'pn-comma-use', prompt: l('Remove the wrong comma.', 'ভুল comma মুছুন।'), sentence: 'The price of rice in Bangladesh, rose in 2022.', accepted: ['The price of rice in Bangladesh rose in 2022.'], explanation: l('No comma between subject and verb.', 'Subject আর verb-এর মাঝে comma না।') }),
        correct('pu-4-r3', 'pn-comma-error', { ...P, pattern: 'pn-comma-use', prompt: l('Remove the wrong comma.', 'ভুল comma মুছুন।'), sentence: 'Experts say, that sleep improves memory.', accepted: ['Experts say that sleep improves memory.'], explanation: l('No comma before that.', 'that-এর আগে comma না।') }),
        correct('pu-4-r4', 'pn-comma-error', { ...P, pattern: 'pn-comma-use', prompt: l('Add the missing comma.', 'বাদ পড়া comma দিন।'), sentence: 'My brother, an engineer works in Singapore.', accepted: ['My brother, an engineer, works in Singapore.'], explanation: l('Extra information → commas on both sides.', 'বাড়তি তথ্য → দুই পাশে comma।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pu-4-c1', 'pn-comma-error', { ...P, pattern: 'pn-run-on', prompt: l('How many comma errors? "The students, who live on campus, often study late, they rarely sleep before midnight."', 'কয়টা comma-র ভুল? "The students, who live on campus, often study late, they rarely sleep before midnight."'), options: ['1 (the comma splice before "they")', '0', '3'], answer: '1 (the comma splice before "they")', explanation: l('The paired commas are fine (extra information); the last comma is a splice.', 'জোড়া comma ঠিক (বাড়তি তথ্য); শেষের comma একটা splice।') }),
        spot('pu-4-c2', 'pn-comma-error', { ...P, pattern: 'pn-run-on', prompt: l('This sentence is a comma splice. Tap the word where the second sentence starts and fix it.', 'এই sentence-টা comma splice। দ্বিতীয় sentence যেখানে শুরু সেই word-এ tap করে ঠিক করুন।'), sentence: 'The shop was closed, we went home early.', wrong: 'we', accepted: ['so we'], fixOptions: ['so we', 'we,', 'and, we'], explanation: l('Join the two sentences with , so.', ', so দিয়ে দুটো sentence জোড়ুন।') }),
        order('pu-4-c3', 'pn-comma-error', { ...P, pattern: 'pn-run-on', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'It was late, so we took a taxi home.', explanation: l('Splice avoided with , so.', ', so দিয়ে splice এড়ানো।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: fix a paragraph', 'এবার আপনার পালা: একটা paragraph ঠিক করুন'),
      exercises: [
        write('pu-4-y1', 'pn-comma-error', {
          ...P,
          prompt: l('Rewrite this paragraph in 3 correct sentences: "Many young people, move to cities, they want better jobs, most of them, find life there expensive."', 'এই paragraph-টা ৩টা সঠিক sentence-এ আবার লিখুন: "Many young people, move to cities, they want better jobs, most of them, find life there expensive."'),
          model: 'Many young people move to cities because they want better jobs. However, most of them find life there expensive. As a result, some return to their villages.',
          checklist: [l('no comma between subject and verb', 'subject আর verb-এর মাঝে comma না'), l('no comma splices (use . / because / so)', 'comma splice না (. / because / so দিন)'), l('commas only where they help', 'যেখানে দরকার শুধু সেখানে comma')],
          explanation: l('Remove the commas that break the grammar.', 'যে comma grammar ভাঙে সেগুলো সরান।'),
          task: 'The student rewrites a comma-heavy paragraph about young people moving to cities in 3 sentences. Check comma errors: no comma splices (two full clauses joined by a comma alone — fix with a full stop, a semicolon, or , and / , but / , so / because); no comma between a subject (even a long one) and its verb; no comma before that / what / whether-clauses after think / say / believe; extra information needs commas on both sides; commas after opening words like However, / As a result, are fine. For each issue quote the words and give the fix.',
          target: l('Remove comma splices and misplaced commas', 'Comma splice আর ভুল জায়গার comma সরান'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Two sentences are never joined by a comma alone.', 'দুটো sentence কখনো শুধু comma দিয়ে জোড়া হয় না।'),
        l('No comma between subject and verb — however long the subject.', 'Subject আর verb-এর মাঝে comma না — subject যত লম্বাই হোক।'),
        l('No comma before that · extra information → commas on both sides.', 'that-এর আগে comma না · বাড়তি তথ্য → দুই পাশে comma।'),
      ],
    },
  ],
};

// ======================================================================= pn-5
export const pnApostrophes: Lesson = {
  id: 'pu-5',
  format: 'v2',
  concept: 'pn-apostrophe',
  title: l('Apostrophes: possession and contractions', 'Apostrophe: মালিকানা আর contraction'),
  why: l('"Its / it’s", "students / student’s / students’" and "1990’s" are among the most visible errors in writing — and Bangla has no apostrophe at all.', '"Its / it’s", "students / student’s / students’" আর "1990’s" লেখার সবচেয়ে চোখে পড়া ভুলগুলোর একটা — আর বাংলায় apostrophe একদমই নেই।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A notice in a hostel', 'একটা hostel-এর notice'),
      situation: l('The notice says: "The hostel is proud of it’s garden. Student’s must keep their room’s clean."', 'Notice-এ লেখা: "The hostel is proud of it’s garden. Student’s must keep their room’s clean."'),
      question: l('How many apostrophe mistakes are there?', 'Apostrophe-এর কয়টা ভুল আছে?'),
      options: ['3', '1', '0'],
      answer: '3',
      diagnose: {
        '3': l('Right: its garden (possessive its has no apostrophe) · Students (a plural, no apostrophe) · rooms (a plural, no apostrophe).', 'ঠিক: its garden (possessive its-এ apostrophe নেই) · Students (plural, apostrophe না) · rooms (plural, apostrophe না)।'),
        '1': l('Look again: "it’s" should be "its", and the plurals "Student’s" and "room’s" need no apostrophe.', 'আবার দেখুন: "it’s" হবে "its", আর plural "Student’s" আর "room’s"-এ apostrophe লাগে না।'),
        '0': l('All three are wrong: it’s = it is; plurals never take an apostrophe.', 'তিনটাই ভুল: it’s = it is; plural-এ কখনো apostrophe বসে না।'),
      },
    },
    {
      kind: 'discover',
      title: l('Two jobs of the apostrophe', 'Apostrophe-এর দুটো কাজ'),
      items: [
        { en: 'my sister’s phone · the students’ results', note: l('possession: one sister → ’s; many students → s’', 'মালিকানা: একজন sister → ’s; অনেক student → s’') },
        { en: 'the children’s park · women’s rights', note: l('irregular plural (no s) → ’s', 's ছাড়া plural → ’s') },
        { en: 'it’s = it is · don’t = do not · I’m = I am', note: l('contraction: the apostrophe replaces missing letters', 'contraction: apostrophe বাদ পড়া অক্ষরের জায়গা নেয়') },
        { en: 'its colour · two students · in the 1990s', note: l('NO apostrophe: possessive its, ordinary plurals, decades', 'apostrophe না: possessive its, সাধারণ plural, দশক') },
      ],
      question: l('When is "it’s" correct?', '"it’s" কখন ঠিক?'),
      options: [
        l('Only when it means "it is" or "it has"', 'শুধু যখন "it is" বা "it has" বোঝায়'),
        l('Whenever something belongs to "it"', 'যখন কিছু "it"-এর'),
        l('Always — "its" is wrong', 'সবসময় — "its" ভুল'),
      ],
      answer: 0,
      pattern: l('Apostrophes do two jobs: possession (Rahim’s bag, the students’ hall) and contractions (it’s = it is). Plurals, decades and possessive pronouns (its, yours, theirs) never take one.', 'Apostrophe দুটো কাজ করে: মালিকানা (Rahim’s bag, the students’ hall) আর contraction (it’s = it is)। Plural, দশক আর possessive pronoun (its, yours, theirs)-এ কখনো বসে না।'),
    },
    {
      kind: 'concept',
      title: l('Possession and contractions', 'মালিকানা আর contraction'),
      body: l(
        'Put the apostrophe after the owner: one owner → owner + ’s; a plural owner ending in s → s’; a plural without s → ’s.',
        'মালিকের পরে apostrophe দিন: একজন মালিক → মালিক + ’s; s দিয়ে শেষ হওয়া plural মালিক → s’; s ছাড়া plural → ’s।',
      ),
      points: [
        l('One owner: the teacher’s desk, Bangladesh’s economy, a week’s holiday. Plural owners with s: the teachers’ room, the countries’ figures. Plurals without s: children’s, people’s, men’s.', 'একজন মালিক: the teacher’s desk, Bangladesh’s economy, a week’s holiday। s-সহ plural মালিক: the teachers’ room, the countries’ figures। s ছাড়া plural: children’s, people’s, men’s।'),
        l('Contractions: it’s (it is / has), they’re (they are), there’s, won’t, can’t, I’d. In formal Task 2 writing, full forms (it is, do not) are safer.', 'Contraction: it’s (it is / has), they’re (they are), there’s, won’t, can’t, I’d। Formal Task 2-এ পূর্ণ form (it is, do not) নিরাপদ।'),
        l('NO apostrophe: plurals (two students, many cars), decades (the 1990s), abbreviations in plural (CDs, PhDs), and possessive pronouns (its, yours, hers, ours, theirs, whose).', 'Apostrophe না: plural (two students, many cars), দশক (the 1990s), plural abbreviation (CDs, PhDs), আর possessive pronoun (its, yours, hers, ours, theirs, whose)।'),
        l('Confusable pairs: its / it’s · your / you’re · their / there / they’re · whose / who’s.', 'গুলিয়ে যায় এমন জোড়া: its / it’s · your / you’re · their / there / they’re · whose / who’s।'),
        l('Why Bangla speakers slip: Bangla shows possession with endings (রহিমের, ছাত্রদের) and has no apostrophe, so the English mark feels decorative — it gets added to every word ending in s, or dropped from real possessives.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় মালিকানা ending দিয়ে বোঝানো হয় (রহিমের, ছাত্রদের) আর apostrophe নেই, তাই English চিহ্নটা সাজসজ্জার মতো মনে হয় — s-এ শেষ হওয়া সব word-এ বসে যায়, বা আসল মালিকানা থেকে বাদ পড়ে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'My father’s shop is next to the bank.', note: l('one owner → ’s', 'একজন মালিক → ’s') },
        { en: 'The girls’ hostel is near the library.', note: l('plural owner → s’', 'plural মালিক → s’') },
        { en: 'The company changed its name in the 1990s.', note: l('its (possessive) · 1990s (no apostrophe)', 'its (possessive) · 1990s (apostrophe না)') },
        { en: 'It’s a good idea, but they’re not sure.', note: l('it is · they are', 'it is · they are') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Japan’s population fell, while India’s continued to grow.', note: l('Task 1: country + ’s for comparisons.', 'Task 1: তুলনায় দেশ + ’s।') },
        { skill: 'speaking', example: 'My parents’ house is near the river.', note: l('Speaking: you cannot hear an apostrophe, so know where it goes when you write your notes.', 'Speaking: apostrophe শোনা যায় না, তাই note লেখার সময় কোথায় বসবে জানতে হবে।') },
        { skill: 'reading', example: 'The committee published its report in 2019.', note: l('Reading: its = belonging to the committee.', 'Reading: its = committee-র।') },
        { skill: 'listening', example: 'Form: "Student’s ID number: 4471"', note: l('Listening forms: copy names and possessives exactly.', 'Listening form: নাম আর মালিকানা হুবহু লিখুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The company increased it’s profits.', right: 'The company increased its profits.', why: l('Possessive its has no apostrophe.', 'Possessive its-এ apostrophe নেই।') },
        { wrong: 'Many student’s work part-time.', right: 'Many students work part-time.', why: l('A plural takes no apostrophe.', 'Plural-এ apostrophe না।') },
        { wrong: 'The childrens’ playground was closed.', right: 'The children’s playground was closed.', why: l('children (no s) → children’s.', 'children (s নেই) → children’s।') },
        { wrong: 'In the 1980’s, few people had phones.', right: 'In the 1980s, few people had phones.', why: l('Decades take no apostrophe.', 'দশকে apostrophe না।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('pu-5-p1', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'The bird hurt ___ wing.', options: ['its', 'it’s', 'its’'], answer: 'its', explanation: l('Possessive its — no apostrophe.', 'Possessive its — apostrophe না।'), why: { 'it’s': l('it’s = it is; "it is wing" makes no sense.', 'it’s = it is; "it is wing" অর্থহীন।'), 'its’': l('"its’" does not exist.', '"its’" বলে কিছু নেই।') } }),
        choice('pu-5-p2', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'My ___ car is red.', options: ['brother’s', 'brothers', 'brothers’s'], answer: 'brother’s', explanation: l('One brother owns it → brother’s.', 'একজন brother-এর → brother’s।'), why: { brothers: l('This is a plural (two brothers), not possession.', 'এটা plural (দুই brother), মালিকানা না।'), 'brothers’s': l('Never add ’s after a plural ending in s.', 's-এ শেষ হওয়া plural-এর পরে কখনো ’s না।') } }),
        choice('pu-5-p3', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'All the ___ results were published online.', options: ['students’', 'student’s', 'students'], answer: 'students’', explanation: l('Many students own the results → students’.', 'অনেক student-এর result → students’।'), why: { 'student’s': l('student’s = one student; "all the" tells you it is many.', 'student’s = একজন student; "all the" বলে অনেকজন।'), students: l('The results belong to the students → you need an apostrophe.', 'Result student-দের → apostrophe লাগে।') } }),
        choice('pu-5-p4', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Mobile phones became popular in the 2000s.', 'Mobile phone’s became popular in the 2000’s.', 'Mobile phones became popular in the 2000’s.'], answer: 'Mobile phones became popular in the 2000s.', explanation: l('Plurals and decades — no apostrophe.', 'Plural আর দশক — apostrophe না।'), why: { 'Mobile phone’s became popular in the 2000’s.': l('Neither a plural nor a decade takes an apostrophe.', 'Plural বা দশক কোনোটাতেই apostrophe বসে না।'), 'Mobile phones became popular in the 2000’s.': l('Decades take no apostrophe: 2000s.', 'দশকে apostrophe না: 2000s।') } }),
        choice('pu-5-p5', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'The ___ ward is on the second floor.', options: ['children’s', 'childrens’', 'childrens'], answer: 'children’s', explanation: l('children has no s → children’s.', 'children-এ s নেই → children’s।'), why: { 'childrens’': l('"childrens" is not a word; add ’s to children.', '"childrens" কোনো word না; children-এর সাথে ’s দিন।'), childrens: l('"childrens" is not a word, and possession needs an apostrophe.', '"childrens" কোনো word না, আর মালিকানায় apostrophe লাগে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('pu-5-r1', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Write its or it’s.', 'its বা it’s লিখুন।'), sentence: '___ going to rain this afternoon.', accepted: ['it’s', "it's"], explanation: l('It is going to rain → It’s.', 'It is going to rain → It’s।'), why: { its: l('Here it means "it is" → it’s.', 'এখানে মানে "it is" → it’s।') } }),
        gap('pu-5-r2', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Write the possessive form of the word in brackets.', 'বন্ধনীর word-এর possessive form লিখুন।'), sentence: 'The ___ (women) team won the final.', base: 'women', accepted: ['women’s', "women's"], explanation: l('women (no s) → women’s.', 'women (s নেই) → women’s।'), why: { "womens'": l('"womens" is not a word; add ’s: women’s.', '"womens" কোনো word না; ’s দিন: women’s।'), women: l('Possession needs an apostrophe: women’s.', 'মালিকানায় apostrophe লাগে: women’s।') } }),
        correct('pu-5-r3', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Remove the wrong apostrophe.', 'ভুল apostrophe মুছুন।'), sentence: 'Many shop’s close early on Fridays.', accepted: ['Many shops close early on Fridays.'], explanation: l('A plural takes no apostrophe.', 'Plural-এ apostrophe না।') }),
        spot('pu-5-r4', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('One word needs an apostrophe. Tap it and type it correctly.', 'একটা word-এ apostrophe লাগবে। সেটায় tap করে সঠিকভাবে লিখুন।'), sentence: 'We stayed at my uncles house in Comilla.', wrong: 'uncles', accepted: ['uncle’s', "uncle's"], explanation: l('One uncle owns the house → uncle’s.', 'একজন uncle-এর বাড়ি → uncle’s।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pu-5-c1', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['They’re moving their office over there next month.', 'Their moving they’re office over their next month.', 'There moving their office over they’re next month.'], answer: 'They’re moving their office over there next month.', explanation: l('they’re = they are · their = belonging to them · there = place.', 'they’re = they are · their = তাদের · there = জায়গা।') }),
        spot('pu-5-c2', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('One word has a wrong apostrophe. Tap it, then fix it.', 'একটা word-এ ভুল apostrophe। Tap করে ঠিক করুন।'), sentence: 'The government raised it’s spending on schools.', wrong: 'it’s', accepted: ['its'], fixOptions: ['its', 'it', 'its’'], explanation: l('Possessive its — no apostrophe.', 'Possessive its — apostrophe না।') }),
        order('pu-5-c3', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'India’s population grew faster than China’s.', explanation: l('country + ’s.', 'দেশ + ’s।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your family', 'এবার আপনার পালা: আপনার পরিবার'),
      exercises: [
        write('pu-5-y1', 'pn-apostrophe', {
          ...P,
          prompt: l('Write 3 sentences about your family using possession (’s / s’), one plural with no apostrophe, and its or it’s correctly.', 'আপনার পরিবার নিয়ে ৩টা sentence লিখুন: মালিকানা (’s / s’), apostrophe ছাড়া একটা plural, আর সঠিকভাবে its বা it’s।'),
          model: 'My mother’s cooking is the best in our area. My two brothers share a room, and the boys’ room is always messy. Our house is old, but its garden is beautiful.',
          checklist: [l('one owner → ’s · plural owner → s’', 'একজন মালিক → ’s · plural মালিক → s’'), l('ordinary plurals: no apostrophe', 'সাধারণ plural: apostrophe না'), l('its (belonging) vs it’s (it is)', 'its (মালিকানা) বনাম it’s (it is)')],
          explanation: l('Apostrophes for possession and contractions only.', 'Apostrophe শুধু মালিকানা আর contraction-এর জন্য।'),
          task: 'The student writes 3 sentences about their family using possessive apostrophes, a plural and its / it’s. Check apostrophes only: one owner → ’s (my mother’s), plural owner ending in s → s’ (my brothers’ room), plural without s → ’s (children’s); no apostrophe in ordinary plurals, decades (1990s) or possessive pronouns (its, yours, theirs, whose); it’s only for "it is / it has"; their / there / they’re and your / you’re used correctly. Straight and curly apostrophes are both fine. For each issue quote the word and give the fix.',
          target: l('Apostrophes: ’s, s’, its / it’s', 'Apostrophe: ’s, s’, its / it’s'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('One owner ’s · plural owner s’ · children’s, women’s.', 'একজন মালিক ’s · plural মালিক s’ · children’s, women’s।'),
        l('No apostrophe in plurals, decades (1990s) or its / yours / theirs.', 'Plural, দশক (1990s) বা its / yours / theirs-এ apostrophe না।'),
        l('it’s = it is · they’re = they are · you’re = you are.', 'it’s = it is · they’re = they are · you’re = you are।'),
      ],
    },
  ],
};

// ======================================================================= pn-6
export const pnColonsParagraphs: Lesson = {
  id: 'pu-6',
  format: 'v2',
  concept: 'pn-colon',
  title: l('Colons, semicolons and paragraphs', 'Colon, semicolon আর paragraph'),
  why: l('A well-placed colon or semicolon shows control, and clear paragraphs are part of your Coherence and Cohesion score in both writing tasks.', 'ঠিক জায়গায় colon বা semicolon নিয়ন্ত্রণ দেখায়, আর পরিষ্কার paragraph দুটো writing task-এই Coherence and Cohesion score-এর অংশ।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 2 introduction', 'একটা Task 2 introduction'),
      situation: l('You write: "There are three main causes of traffic jams; poor planning, too many private cars and a lack of public transport."', 'আপনি লিখলেন: "There are three main causes of traffic jams; poor planning, too many private cars and a lack of public transport."'),
      question: l('Which mark should replace the semicolon?', 'Semicolon-এর জায়গায় কোন চিহ্ন বসবে?'),
      options: ['A colon (:) — it introduces a list', 'A comma', 'Nothing — the semicolon is correct'],
      answer: 'A colon (:) — it introduces a list',
      diagnose: {
        'A colon (:) — it introduces a list': l('Right. A colon comes after a complete sentence and introduces a list or explanation: "three main causes: poor planning, …".', 'ঠিক। Colon একটা পূর্ণ sentence-এর পরে বসে তালিকা বা ব্যাখ্যা আনে: "three main causes: poor planning, …"।'),
        'A comma': l('A comma here would make the list look like part of the sentence. A colon clearly announces "here are the three causes".', 'এখানে comma দিলে তালিকাটা sentence-এর অংশ মনে হবে। Colon পরিষ্কারভাবে বলে "এই হলো তিনটা কারণ"।'),
        'Nothing — the semicolon is correct': l('A semicolon joins two complete sentences. The part after it here is a list, not a sentence, so a colon is needed.', 'Semicolon দুটো পূর্ণ sentence জোড়ে। এখানে পরের অংশটা তালিকা, sentence না, তাই colon লাগবে।'),
      },
    },
    {
      kind: 'discover',
      title: l('Colon, semicolon, paragraph', 'Colon, semicolon, paragraph'),
      items: [
        { en: 'The course covers four skills: reading, writing, listening and speaking.', note: l('colon: complete sentence → list', 'colon: পূর্ণ sentence → তালিকা') },
        { en: 'The plan failed for one reason: nobody paid for it.', note: l('colon: complete sentence → explanation', 'colon: পূর্ণ sentence → ব্যাখ্যা') },
        { en: 'Car use rose sharply; bus use fell.', note: l('semicolon: two closely related sentences', 'semicolon: ঘনিষ্ঠ সম্পর্কের দুটো sentence') },
        { en: 'Prices rose; however, demand stayed high.', note: l('semicolon before however / therefore', 'however / therefore-এর আগে semicolon') },
      ],
      question: l('What must come BEFORE a colon?', 'Colon-এর আগে কী থাকতে হবে?'),
      options: [
        l('A complete sentence', 'একটা পূর্ণ sentence'),
        l('A verb such as "are" or "include"', '"are" বা "include"-এর মতো verb'),
        l('Nothing special', 'বিশেষ কিছু না'),
      ],
      answer: 0,
      pattern: l('Colon = complete sentence + list / explanation (not after "are", "include", "such as"). Semicolon = two complete, closely related sentences, or before however / therefore. Use them sparingly.', 'Colon = পূর্ণ sentence + তালিকা / ব্যাখ্যা ("are", "include", "such as"-এর পরে না)। Semicolon = ঘনিষ্ঠ সম্পর্কের দুটো পূর্ণ sentence, বা however / therefore-এর আগে। কম ব্যবহার করুন।'),
    },
    {
      kind: 'concept',
      title: l('Colons, semicolons and paragraph layout', 'Colon, semicolon আর paragraph সাজানো'),
      body: l(
        'Colons and semicolons are optional tools: one of each, used correctly, is enough in an essay. Paragraphs, however, are required.',
        'Colon আর semicolon ঐচ্ছিক উপকরণ: essay-তে প্রতিটার একটা, সঠিকভাবে, যথেষ্ট। কিন্তু paragraph বাধ্যতামূলক।',
      ),
      points: [
        l('Colon: after a complete sentence, before a list or an explanation. NOT after a verb or preposition: "The causes are: …" ✗ → "The causes are …" / "There are three causes: …".', 'Colon: পূর্ণ sentence-এর পরে, তালিকা বা ব্যাখ্যার আগে। verb বা preposition-এর পরে না: "The causes are: …" ✗ → "The causes are …" / "There are three causes: …"।'),
        l('Semicolon: joins two complete sentences that are closely linked (Car use rose; bus use fell.) and comes before a sentence connector (; however, ; therefore,). The word after it is small.', 'Semicolon: ঘনিষ্ঠ সম্পর্কের দুটো পূর্ণ sentence জোড়ে (Car use rose; bus use fell.) আর sentence connector-এর আগে বসে (; however, ; therefore,)। পরের word ছোট হাতের।'),
        l('Paragraphs: Task 2 = introduction, two or three body paragraphs (one main idea each), conclusion. Task 1 = introduction (paraphrase), overview, two body paragraphs. Leave a blank line (or indent) between paragraphs.', 'Paragraph: Task 2 = introduction, দুই বা তিনটা body paragraph (প্রতিটায় একটা মূল idea), conclusion। Task 1 = introduction (paraphrase), overview, দুটো body paragraph। Paragraph-এর মাঝে একটা ফাঁকা লাইন (বা indent) রাখুন।'),
        l('Formal style: in Task 2, full forms are safer than contractions (do not, it is); no bullet points; numbers under ten usually in words in running text.', 'Formal style: Task 2-এ contraction-এর চেয়ে পূর্ণ form নিরাপদ (do not, it is); bullet point না; লেখার মধ্যে দশের কম সংখ্যা সাধারণত word-এ।'),
        l('Why Bangla speakers slip: Bangla school essays often run as one long block or split every sentence into its own paragraph, and colons and semicolons are rarely taught. English expects one idea per paragraph.', 'বাংলাভাষীরা কেন ভুল করে: বাংলা স্কুলের রচনা প্রায়ই একটা লম্বা ব্লক হয় বা প্রতিটা sentence আলাদা paragraph হয়, আর colon ও semicolon কম শেখানো হয়। English-এ প্রতি paragraph-এ একটা idea আশা করা হয়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'You will need three documents: your passport, two photos and a bank statement.', note: l('colon + list', 'colon + তালিকা') },
        { en: 'My advice is simple: start early.', note: l('colon + explanation', 'colon + ব্যাখ্যা') },
        { en: 'The north is dry; the south is wet.', note: l('semicolon between related sentences', 'সম্পর্কিত sentence-এর মাঝে semicolon') },
        { en: 'The ticket was cheap; therefore, we booked two.', note: l('; therefore,', '; therefore,') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'The chart shows two clear trends: a rise in online sales and a fall in shop sales.', note: l('Task 1 overview: a colon introduces the trends.', 'Task 1 overview: colon trend-গুলো আনে।') },
        { skill: 'speaking', example: 'There are two reasons: cost and time.', note: l('Speaking: a short pause before a list works like a colon in writing.', 'Speaking: তালিকার আগে ছোট বিরতি লেখায় colon-এর মতো কাজ করে।') },
        { skill: 'reading', example: 'The findings were clear: sleep improves memory.', note: l('Reading: what follows a colon is often the key point.', 'Reading: colon-এর পরের অংশ প্রায়ই মূল point।') },
        { skill: 'listening', example: 'Note completion: "Items to bring: ______, ______ and ______"', note: l('Listening: a colon in notes signals a list of answers.', 'Listening: note-এ colon উত্তরের তালিকা বোঝায়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The main problems are: noise, traffic and pollution.', right: 'The main problems are noise, traffic and pollution.', why: l('No colon straight after a verb.', 'Verb-এর ঠিক পরে colon না।') },
        { wrong: 'Car use rose; and bus use fell.', right: 'Car use rose, and bus use fell. / Car use rose; bus use fell.', why: l('Semicolon OR , and — not both.', 'Semicolon অথবা , and — দুটো না।') },
        { wrong: 'Prices rose; However, demand stayed high.', right: 'Prices rose; however, demand stayed high.', why: l('After a semicolon, the next word is small.', 'Semicolon-এর পরে পরের word ছোট হাতের।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('pu-6-p1', 'pn-colon', { ...P, pattern: 'pn-colon-semi', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['I have visited three countries: India, Nepal and Thailand.', 'I have visited: India, Nepal and Thailand.', 'I have visited three countries; India, Nepal and Thailand.'], answer: 'I have visited three countries: India, Nepal and Thailand.', explanation: l('Complete sentence + colon + list.', 'পূর্ণ sentence + colon + তালিকা।'), why: { 'I have visited: India, Nepal and Thailand.': l('"I have visited" is not complete — no colon after a verb.', '"I have visited" সম্পূর্ণ না — verb-এর পরে colon না।'), 'I have visited three countries; India, Nepal and Thailand.': l('A semicolon needs a full sentence after it; this is a list → colon.', 'Semicolon-এর পরে পূর্ণ sentence লাগে; এটা তালিকা → colon।') } }),
        choice('pu-6-p2', 'pn-colon', { ...P, pattern: 'pn-colon-semi', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Summers are hot; winters are mild.', 'Summers are hot; and winters are mild.', 'Summers are hot: winters are mild.'], answer: 'Summers are hot; winters are mild.', explanation: l('Two related sentences → semicolon.', 'সম্পর্কিত দুটো sentence → semicolon।'), why: { 'Summers are hot; and winters are mild.': l('Use a semicolon OR ", and" — not both.', 'Semicolon অথবা ", and" — দুটো না।'), 'Summers are hot: winters are mild.': l('The second part is not a list or an explanation of the first → semicolon.', 'দ্বিতীয় অংশ প্রথমটার তালিকা বা ব্যাখ্যা না → semicolon।') } }),
        choice('pu-6-p3', 'pn-colon', { ...P, pattern: 'pn-colon-semi', prompt: l('Choose the correct punctuation.', 'সঠিক punctuation বেছে নিন।'), options: ['The plan was expensive; however, it worked.', 'The plan was expensive; However, it worked.', 'The plan was expensive: however it worked.'], answer: 'The plan was expensive; however, it worked.', explanation: l('; however, — small h, comma after.', '; however, — ছোট h, পরে comma।'), why: { 'The plan was expensive; However, it worked.': l('After a semicolon, however is small.', 'Semicolon-এর পরে however ছোট হাতের।'), 'The plan was expensive: however it worked.': l('Use a semicolon before however, and a comma after it.', 'however-এর আগে semicolon, পরে comma।') } }),
        choice('pu-6-p4', 'pn-colon', { ...P, prompt: l('How should a Task 2 essay be organised?', 'Task 2 essay কীভাবে সাজানো উচিত?'), options: ['Introduction, two or three body paragraphs (one main idea each), conclusion', 'One long paragraph with all the ideas', 'A new paragraph for every sentence'], answer: 'Introduction, two or three body paragraphs (one main idea each), conclusion', explanation: l('One main idea per paragraph.', 'প্রতি paragraph-এ একটা মূল idea।'), why: { 'One long paragraph with all the ideas': l('A single block lowers Coherence and Cohesion: the examiner cannot see your structure.', 'একটা ব্লক Coherence and Cohesion কমায়: examiner আপনার কাঠামো দেখতে পান না।'), 'A new paragraph for every sentence': l('One-sentence paragraphs cannot develop an idea.', 'এক sentence-এর paragraph কোনো idea বিস্তার করতে পারে না।') } }),
        choice('pu-6-p5', 'pn-colon', { ...P, pattern: 'pn-colon-semi', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The reasons include cost, distance and time.', 'The reasons include: cost, distance and time.', 'The reasons include; cost, distance and time.'], answer: 'The reasons include cost, distance and time.', explanation: l('No colon after "include" — the list completes the sentence.', '"include"-এর পরে colon না — তালিকা sentence সম্পূর্ণ করে।'), why: { 'The reasons include: cost, distance and time.': l('"include" needs its object — no colon between them.', '"include"-এর object লাগে — মাঝে colon না।'), 'The reasons include; cost, distance and time.': l('A semicolon cannot come between a verb and its object.', 'Verb আর তার object-এর মাঝে semicolon বসে না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('pu-6-r1', 'pn-colon', { ...P, pattern: 'pn-colon-semi', prompt: l('Write the punctuation mark: : or ;', 'Punctuation চিহ্ন লিখুন: : বা ;'), sentence: 'Bring two things ___ a pen and your passport.', accepted: [':'], explanation: l('Complete sentence + list → colon.', 'পূর্ণ sentence + তালিকা → colon।'), why: { ';': l('A list follows, not a sentence → colon.', 'পরে তালিকা, sentence না → colon।') } }),
        gap('pu-6-r2', 'pn-colon', { ...P, pattern: 'pn-colon-semi', prompt: l('Write the punctuation mark: : or ;', 'Punctuation চিহ্ন লিখুন: : বা ;'), sentence: 'The north gets heavy rain ___ the west is much drier.', accepted: [';'], explanation: l('Two related sentences → semicolon.', 'সম্পর্কিত দুটো sentence → semicolon।'), why: { ':': l('The second sentence does not explain or list the first → semicolon.', 'দ্বিতীয় sentence প্রথমটার ব্যাখ্যা বা তালিকা না → semicolon।') } }),
        correct('pu-6-r3', 'pn-colon', { ...P, pattern: 'pn-colon-semi', prompt: l('Remove the wrong colon.', 'ভুল colon মুছুন।'), sentence: 'My favourite subjects are: history and geography.', accepted: ['My favourite subjects are history and geography.'], explanation: l('No colon straight after a verb.', 'Verb-এর ঠিক পরে colon না।') }),
        correct('pu-6-r4', 'pn-colon', { ...S, pattern: 'pn-colon-semi', prompt: l('Fix the capital letter after the semicolon.', 'Semicolon-এর পরের capital letter ঠিক করুন।'), sentence: 'Sales rose; Therefore, profits improved.', accepted: ['Sales rose; therefore, profits improved.'], explanation: l('After a semicolon → small letter.', 'Semicolon-এর পরে → ছোট হাতের।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pu-6-c1', 'pn-colon', { ...P, prompt: l('Task 1: which is the best paragraph plan?', 'Task 1: সবচেয়ে ভালো paragraph plan কোনটা?'), options: ['Introduction · Overview · Body 1 (main features) · Body 2 (other details)', 'One paragraph with all the numbers', 'Introduction · Opinion · Conclusion'], answer: 'Introduction · Overview · Body 1 (main features) · Body 2 (other details)', explanation: l('Task 1 has no opinion; the overview is essential.', 'Task 1-এ মতামত নেই; overview অপরিহার্য।') }),
        spot('pu-6-c2', 'pn-colon', { ...P, pattern: 'pn-colon-semi', prompt: l('One word carries the wrong mark. Tap it, then fix it.', 'একটা word-এ ভুল চিহ্ন। Tap করে ঠিক করুন।'), sentence: 'You need three things; a ticket, a passport and a visa.', wrong: 'things', accepted: ['things:'], fixOptions: ['things:', 'things,', 'things.'], explanation: l('A list follows → colon.', 'পরে তালিকা → colon।') }),
        order('pu-6-c3', 'pn-colon', { ...P, pattern: 'pn-colon-semi', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'The answer is simple: save a little every month.', explanation: l('Complete sentence + colon + explanation.', 'পূর্ণ sentence + colon + ব্যাখ্যা।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 2 introduction', 'এবার আপনার পালা: একটা Task 2 introduction'),
      exercises: [
        write('pu-6-y1', 'pn-colon', {
          ...P,
          prompt: l('Task 2: "What are the main problems of living in a big city?" Write a 3-sentence introduction using one colon (for a list) and one semicolon.', 'Task 2: "What are the main problems of living in a big city?" একটা colon (তালিকার জন্য) আর একটা semicolon ব্যবহার করে ৩ sentence-এর introduction লিখুন।'),
          model: 'More and more people are moving to big cities in search of work. However, city life brings three serious problems: traffic, pollution and high rents. Some of these can be solved quickly; others need long-term planning.',
          checklist: [l('colon after a complete sentence, before a list', 'পূর্ণ sentence-এর পরে, তালিকার আগে colon'), l('semicolon between two related complete sentences', 'সম্পর্কিত দুটো পূর্ণ sentence-এর মাঝে semicolon'), l('no colon after are / include', 'are / include-এর পরে colon না')],
          explanation: l('One colon and one semicolon, used correctly, is plenty.', 'সঠিকভাবে একটা colon আর একটা semicolon যথেষ্ট।'),
          task: 'The student writes a 3-sentence Task 2 introduction about big-city problems, using one colon and one semicolon. Check colons, semicolons and paragraph style only: a colon must follow a complete sentence and introduce a list or explanation (never directly after are / include / such as or a preposition); a semicolon joins two complete, closely related sentences or comes before however / therefore (with a small letter after it), and is never combined with and / but; the introduction reads as one paragraph with no bullet points; full forms are preferred to contractions in Task 2. For each issue quote the words and give the fix.',
          target: l('Colons, semicolons and formal layout', 'Colon, semicolon আর formal layout'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Colon: complete sentence + list / explanation — never after are / include.', 'Colon: পূর্ণ sentence + তালিকা / ব্যাখ্যা — are / include-এর পরে কখনো না।'),
        l('Semicolon: two related sentences, or ; however, (small h).', 'Semicolon: সম্পর্কিত দুটো sentence, বা ; however, (ছোট h)।'),
        l('One main idea per paragraph; Task 2 = intro, 2–3 bodies, conclusion.', 'প্রতি paragraph-এ একটা মূল idea; Task 2 = intro, ২–৩টা body, conclusion।'),
      ],
    },
  ],
};

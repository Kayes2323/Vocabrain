// Vocabulary Foundation: the first 10 words. Chosen for IELTS relevance,
// academic usefulness, frequency and reuse across Writing, Speaking, Reading
// and Listening (B1–B2 level). Original Vocab Brain content.
import type { L } from '@/lib/foundation/model';

export type VocabCategory =
  | 'education' | 'environment' | 'technology' | 'health' | 'society' | 'work' | 'travel' | 'science' | 'culture' | 'study-abroad' | 'academic' | 'general';

export interface FoundationWord {
  id: string;
  word: string;
  /** IPA (British), shown next to a listen button. */
  ipa: string;
  partOfSpeech: string;
  category: VocabCategory;
  /** Why this word earns a place in the student's Brain. */
  why: L;
  /** The sentence where the student first meets the word (contains the word). */
  context: string;
  /** "What do you think it means?" — guessed from context before any explanation. */
  guess: { options: L[]; answer: number };
  meaning: L;
  explanation: L;
  examples: string[];
  collocations: string[];
  synonyms: string[];
  /** Synonyms are not always interchangeable. */
  synonymNote?: L;
  antonyms?: string[];
  /** Only where the family is genuinely useful. */
  family?: { word: string; pos: string; example: string }[];
  /** Only skills where the word is genuinely useful. */
  ielts: { skill: 'writing' | 'speaking' | 'reading' | 'listening'; example: string; note: L }[];
  /** A contextual clue after a first wrong free-recall attempt. */
  clue: L;
  /** The sentence challenge prompt. */
  useTask: L;
}

const l = (en: string, bn: string): L => ({ en, bn });

export const FOUNDATION_WORDS: FoundationWord[] = [
  {
    id: 'significant',
    word: 'significant',
    ipa: '/sɪɡˈnɪfɪkənt/',
    partOfSpeech: 'adjective',
    category: 'academic',
    why: l('One of the most useful words for describing data and change in IELTS Writing.', 'IELTS Writing-এ data আর পরিবর্তন বোঝাতে সবচেয়ে কাজের শব্দগুলোর একটা।'),
    context: 'The city saw a significant increase in population between 2000 and 2020.',
    guess: {
      options: [l('Very small', 'খুবই ছোট'), l('Large or important enough to notice', 'চোখে পড়ার মতো বড় বা গুরুত্বপূর্ণ'), l('Temporary', 'সাময়িক'), l('Unrelated', 'সম্পর্কহীন')],
      answer: 1,
    },
    meaning: l('large or important enough to be noticed', 'উল্লেখযোগ্য / চোখে পড়ার মতো বড় বা গুরুত্বপূর্ণ'),
    explanation: l(
      'Use it when a change, difference or effect is big enough to matter — not just "big".',
      'কোনো পরিবর্তন, পার্থক্য বা প্রভাব যখন গুরুত্ব পাওয়ার মতো বড় — শুধু "বড়" না, তখন এটা ব্যবহার করো।',
    ),
    examples: ['There is a significant difference between the two groups.', 'Social media has had a significant impact on how young people communicate.'],
    collocations: ['significant increase', 'significant change', 'significant difference', 'significant impact'],
    synonyms: ['considerable', 'substantial', 'major'],
    synonymNote: l(
      '"big increase" is fine in speaking, but "significant increase" sounds more academic in Writing. "huge" is stronger and more informal.',
      'Speaking-এ "big increase" ঠিক আছে, কিন্তু Writing-এ "significant increase" বেশি academic শোনায়। "huge" আরও জোরালো আর informal।',
    ),
    antonyms: ['insignificant', 'minor'],
    family: [
      { word: 'significance', pos: 'noun', example: 'The report explains the significance of the results.' },
      { word: 'significantly', pos: 'adverb', example: 'Prices rose significantly in 2022.' },
    ],
    ielts: [
      { skill: 'writing', example: 'There was a significant rise in the number of female students.', note: l('Task 1: describe an important change.', 'Task 1: গুরুত্বপূর্ণ পরিবর্তন বোঝাতে।') },
      { skill: 'reading', example: 'a considerable rise in … = a significant increase', note: l('Passages often paraphrase it as "considerable" or "substantial".', 'Passage-এ প্রায়ই "considerable" বা "substantial" দিয়ে paraphrase হয়।') },
      { skill: 'speaking', example: 'Moving to Dhaka was a significant change in my life.', note: l('Part 2: an important moment or change.', 'Part 2: জীবনের গুরুত্বপূর্ণ মুহূর্ত বা পরিবর্তন।') },
    ],
    clue: l('Think about the context: the population didn’t grow a little — it grew enough to notice.', 'Context-টা ভাবো: জনসংখ্যা অল্প না, চোখে পড়ার মতো বেড়েছে।'),
    useTask: l('Write one sentence about a change in your life, your city or your studies.', 'তোমার জীবন, শহর বা পড়াশোনার কোনো পরিবর্তন নিয়ে এক sentence লেখো।'),
  },
  {
    id: 'decline',
    word: 'decline',
    ipa: '/dɪˈklaɪn/',
    partOfSpeech: 'verb / noun',
    category: 'academic',
    why: l('A key trend word for Task 1 charts, and common in Reading passages.', 'Task 1 chart-এর জন্য জরুরি trend word, Reading passage-এও খুব common।'),
    context: 'The number of people who buy printed newspapers has declined sharply.',
    guess: {
      options: [l('Gone up', 'বেড়েছে'), l('Gone down', 'কমেছে'), l('Stayed the same', 'একই আছে'), l('Become popular', 'জনপ্রিয় হয়েছে')],
      answer: 1,
    },
    meaning: l('to become less, smaller or weaker; a fall', 'কমে যাওয়া / হ্রাস পাওয়া; হ্রাস'),
    explanation: l(
      'A formal way to say "go down". As a noun: "a decline in sales".',
      '"go down"-এর formal রূপ। Noun হিসেবে: "a decline in sales"।',
    ),
    examples: ['There was a steady decline in coal use after 2010.', 'Birth rates have declined in many countries.'],
    collocations: ['decline sharply', 'a steady decline', 'a decline in', 'decline gradually'],
    synonyms: ['decrease', 'fall', 'drop'],
    synonymNote: l(
      '"decline" often suggests a slow, gradual fall; "drop" can be sudden. Use "a decline IN something".',
      '"decline" প্রায়ই ধীরে ধীরে কমা বোঝায়; "drop" হঠাৎও হতে পারে। "a decline IN something" লেখো।',
    ),
    antonyms: ['increase', 'rise', 'grow'],
    ielts: [
      { skill: 'writing', example: 'Sales of desktop computers declined gradually over the period.', note: l('Task 1 trends: pair with sharply / gradually / steadily.', 'Task 1 trend: sharply / gradually / steadily-র সাথে।') },
      { skill: 'reading', example: 'the population of bees has fallen = has declined', note: l('Watch for "fall", "drop", "decrease" as paraphrases.', '"fall", "drop", "decrease" paraphrase হিসেবে খেয়াল করো।') },
      { skill: 'listening', example: '…and visitor numbers have declined since the new road opened.', note: l('Recognise it in lectures and talks.', 'Lecture আর talk-এ চিনতে পারা।') },
    ],
    clue: l('The newspapers sentence: fewer people buy them now than before.', 'Newspaper-এর sentence: আগের চেয়ে এখন কম মানুষ কেনে।'),
    useTask: l('Write one sentence about something that has declined in your country or town.', 'তোমার দেশ বা শহরে কমে গেছে এমন কিছু নিয়ে এক sentence লেখো।'),
  },
  {
    id: 'benefit',
    word: 'benefit',
    ipa: '/ˈbenɪfɪt/',
    partOfSpeech: 'noun / verb',
    category: 'education',
    why: l('Essential for Task 2 advantages/disadvantages essays and Speaking Part 3.', 'Task 2-এর advantage/disadvantage essay আর Speaking Part 3-এর জন্য জরুরি।'),
    context: 'One major benefit of online classes is that students can study from home.',
    guess: {
      options: [l('A problem', 'একটা সমস্যা'), l('A cost', 'একটা খরচ'), l('An advantage or helpful result', 'একটা সুবিধা বা উপকারী ফল'), l('A rule', 'একটা নিয়ম')],
      answer: 2,
    },
    meaning: l('an advantage or helpful effect; to be helped by something', 'সুবিধা / উপকার; উপকৃত হওয়া'),
    explanation: l(
      'Noun: "the benefits of exercise". Verb: "students benefit FROM small classes".',
      'Noun: "the benefits of exercise"। Verb: "students benefit FROM small classes"।',
    ),
    examples: ['Regular exercise has many health benefits.', 'Rural students would benefit from better internet access.'],
    collocations: ['a major benefit', 'benefit from', 'the benefits of', 'health benefits'],
    synonyms: ['advantage', 'gain'],
    synonymNote: l(
      '"benefit" is about a helpful result; "advantage" is often about being in a better position than others.',
      '"benefit" মানে উপকারী ফল; "advantage" প্রায়ই অন্যদের চেয়ে ভালো অবস্থানে থাকা।',
    ),
    antonyms: ['drawback', 'disadvantage'],
    family: [{ word: 'beneficial', pos: 'adjective', example: 'Reading every day is beneficial for your vocabulary.' }],
    ielts: [
      { skill: 'writing', example: 'The main benefit of public transport is that it reduces traffic.', note: l('Task 2: introduce an advantage clearly.', 'Task 2: সুবিধা পরিষ্কারভাবে বলতে।') },
      { skill: 'speaking', example: 'I think children benefit a lot from playing outside.', note: l('Part 3: "benefit from" sounds natural.', 'Part 3: "benefit from" স্বাভাবিক শোনায়।') },
    ],
    clue: l('Studying from home is a good thing about online classes.', 'বাসা থেকে পড়তে পারা online class-এর একটা ভালো দিক।'),
    useTask: l('Write one sentence about a benefit of something you use every day.', 'প্রতিদিন ব্যবহার করো এমন কিছুর একটা benefit নিয়ে এক sentence লেখো।'),
  },
  {
    id: 'impact',
    word: 'impact',
    ipa: '/ˈɪmpækt/',
    partOfSpeech: 'noun',
    category: 'environment',
    why: l('A core Task 2 word for causes and effects (technology, environment, society).', 'কারণ আর প্রভাব নিয়ে Task 2-এর মূল শব্দ (technology, environment, society)।'),
    context: 'Plastic waste has a serious impact on marine life.',
    guess: {
      options: [l('A strong effect', 'একটা জোরালো প্রভাব'), l('A small amount', 'অল্প পরিমাণ'), l('A kind of fish', 'এক ধরনের মাছ'), l('A solution', 'একটা সমাধান')],
      answer: 0,
    },
    meaning: l('a strong effect or influence on something', 'প্রভাব / জোরালো প্রভাব'),
    explanation: l(
      'Say "have an impact ON something". Add an adjective to show if it is good or bad: positive, negative, serious.',
      '"have an impact ON something" বলো। ভালো না খারাপ বোঝাতে adjective দাও: positive, negative, serious।',
    ),
    examples: ['Tourism has a positive impact on the local economy.', 'The new policy had little impact on unemployment.'],
    collocations: ['have an impact on', 'a positive impact', 'a negative impact', 'a significant impact'],
    synonyms: ['effect', 'influence'],
    synonymNote: l(
      '"impact" is stronger than "effect". Don’t use it for small things.',
      '"impact" "effect"-এর চেয়ে জোরালো। ছোট ব্যাপারে ব্যবহার কোরো না।',
    ),
    ielts: [
      { skill: 'writing', example: 'Social media has had a negative impact on teenagers’ sleep.', note: l('Task 2: effects of a trend.', 'Task 2: কোনো trend-এর প্রভাব।') },
      { skill: 'speaking', example: 'My teacher had a huge impact on my decision to study abroad.', note: l('Part 2: a person who influenced you.', 'Part 2: যে মানুষ তোমাকে প্রভাবিত করেছে।') },
      { skill: 'reading', example: 'the effect of … on … = the impact of … on …', note: l('Matching and TFNG often paraphrase "impact" as "effect".', 'Matching আর TFNG-তে "impact" প্রায়ই "effect" দিয়ে paraphrase হয়।') },
    ],
    clue: l('Plastic hurts sea animals: that is what it does TO marine life.', 'Plastic সমুদ্রের প্রাণীদের ক্ষতি করে: marine life-এর উপর এটাই করে।'),
    useTask: l('Write one sentence about the impact of technology on your life.', 'তোমার জীবনে technology-র impact নিয়ে এক sentence লেখো।'),
  },
  {
    id: 'access',
    word: 'access',
    ipa: '/ˈækses/',
    partOfSpeech: 'noun',
    category: 'technology',
    why: l('Needed for Task 2 topics like education, healthcare and technology.', 'Education, healthcare আর technology-র মতো Task 2 topic-এ লাগে।'),
    context: 'Many rural students still do not have access to fast internet.',
    guess: {
      options: [l('The chance or right to use something', 'কোনো কিছু ব্যবহারের সুযোগ বা অধিকার'), l('A fast speed', 'দ্রুত গতি'), l('A payment', 'একটা payment'), l('A lesson', 'একটা lesson')],
      answer: 0,
    },
    meaning: l('the opportunity or right to use or reach something', 'সুযোগ / প্রবেশাধিকার'),
    explanation: l(
      'Always "access TO something": access to education, access to clean water.',
      'সবসময় "access TO something": access to education, access to clean water।',
    ),
    examples: ['Everyone should have access to clean drinking water.', 'The library gives students free access to online journals.'],
    collocations: ['access to', 'have access to', 'easy access', 'limited access'],
    synonyms: ['entry', 'availability'],
    family: [{ word: 'accessible', pos: 'adjective', example: 'The metro makes the city centre more accessible.' }],
    ielts: [
      { skill: 'writing', example: 'Governments should ensure that all children have access to education.', note: l('Task 2: fairness and public services.', 'Task 2: ন্যায্যতা আর public service।') },
      { skill: 'speaking', example: 'In my village, people now have easier access to healthcare.', note: l('Part 1/3: changes in your area.', 'Part 1/3: তোমার এলাকার পরিবর্তন।') },
    ],
    clue: l('The rural students can’t USE fast internet — they don’t have the chance.', 'গ্রামের student-রা দ্রুত internet ব্যবহার করতে পারে না — সুযোগ নেই।'),
    useTask: l('Write one sentence about something people in your area have (or don’t have) access to.', 'তোমার এলাকার মানুষের কোন জিনিসের access আছে (বা নেই) তা নিয়ে এক sentence লেখো।'),
  },
  {
    id: 'contribute',
    word: 'contribute',
    ipa: '/kənˈtrɪbjuːt/',
    partOfSpeech: 'verb',
    category: 'society',
    why: l('Great for explaining causes in Task 2 ("X contributes to Y").', 'Task 2-এ কারণ ব্যাখ্যা করতে দারুণ ("X contributes to Y")।'),
    context: 'Money sent home by workers abroad contributes greatly to Bangladesh’s economy.',
    guess: {
      options: [l('To take away', 'সরিয়ে নেওয়া'), l('To help cause or add to something', 'কোনো কিছু ঘটাতে বা বাড়াতে সাহায্য করা'), l('To ignore', 'উপেক্ষা করা'), l('To borrow', 'ধার করা')],
      answer: 1,
    },
    meaning: l('to help to cause something, or to give something to help', 'অবদান রাখা / কারণ হিসেবে ভূমিকা রাখা'),
    explanation: l(
      '"contribute TO something". It can be positive (to growth) or negative (to pollution).',
      '"contribute TO something"। ভালো (growth-এ) বা খারাপ (pollution-এ) দুটোই হতে পারে।',
    ),
    examples: ['Traffic contributes to air pollution in big cities.', 'Everyone in the group contributed ideas to the project.'],
    collocations: ['contribute to', 'contribute greatly', 'a major contribution', 'contribute ideas'],
    synonyms: ['add to', 'lead to', 'play a part in'],
    family: [{ word: 'contribution', pos: 'noun', example: 'Teachers make a huge contribution to society.' }],
    ielts: [
      { skill: 'writing', example: 'Several factors contribute to rising obesity rates.', note: l('Task 2: causes without saying "cause" every time.', 'Task 2: বারবার "cause" না বলে কারণ বোঝাতে।') },
      { skill: 'speaking', example: 'I’d like to contribute to my community in the future.', note: l('Part 3: future plans and values.', 'Part 3: ভবিষ্যতের পরিকল্পনা আর মূল্যবোধ।') },
    ],
    clue: l('The money helps the economy grow — it ADDS to it.', 'এই টাকা economy বাড়াতে সাহায্য করে — যোগ করে।'),
    useTask: l('Write one sentence about something that contributes to a problem or to success.', 'কোনো সমস্যা বা সাফল্যে contribute করে এমন কিছু নিয়ে এক sentence লেখো।'),
  },
  {
    id: 'sustainable',
    word: 'sustainable',
    ipa: '/səˈsteɪnəbl/',
    partOfSpeech: 'adjective',
    category: 'environment',
    why: l('The key word for environment topics in all four skills.', 'চার skill-এ environment topic-এর মূল শব্দ।'),
    context: 'Cities need more sustainable forms of transport, such as metro rail and cycling.',
    guess: {
      options: [l('Very expensive', 'খুব দামি'), l('Able to continue without harming the environment', 'পরিবেশের ক্ষতি না করে চলতে পারে এমন'), l('Very fast', 'খুব দ্রুত'), l('Old-fashioned', 'পুরোনো ধাঁচের')],
      answer: 1,
    },
    meaning: l('able to continue for a long time without damaging the environment', 'টেকসই / পরিবেশের ক্ষতি না করে দীর্ঘদিন চলতে পারে এমন'),
    explanation: l(
      'Mostly about the environment and resources: sustainable energy, sustainable farming.',
      'মূলত পরিবেশ আর সম্পদ নিয়ে: sustainable energy, sustainable farming।',
    ),
    examples: ['Solar power is a sustainable source of energy.', 'Fishing at this level is not sustainable.'],
    collocations: ['sustainable development', 'sustainable energy', 'environmentally sustainable', 'sustainable growth'],
    synonyms: ['eco-friendly', 'renewable'],
    synonymNote: l(
      '"renewable" is about energy that doesn’t run out (sun, wind); "sustainable" is wider — any activity that can continue safely.',
      '"renewable" এমন energy যা ফুরায় না (সূর্য, বাতাস); "sustainable" আরও বড় অর্থে — যেকোনো কাজ যা নিরাপদে চালিয়ে যাওয়া যায়।',
    ),
    antonyms: ['unsustainable'],
    family: [{ word: 'sustainability', pos: 'noun', example: 'The university has a new sustainability plan.' }],
    ielts: [
      { skill: 'writing', example: 'Governments should invest in sustainable energy such as solar and wind power.', note: l('Task 2: environment solutions.', 'Task 2: পরিবেশের সমাধান।') },
      { skill: 'listening', example: '…the course focuses on sustainable farming methods.', note: l('Part 3/4: common in academic talks.', 'Part 3/4: academic talk-এ common।') },
    ],
    clue: l('Metro and cycling can go on for years without polluting much.', 'Metro আর cycling অনেক দূষণ ছাড়াই বছরের পর বছর চলতে পারে।'),
    useTask: l('Write one sentence about a sustainable habit people could have.', 'মানুষ গড়ে তুলতে পারে এমন একটা sustainable অভ্যাস নিয়ে এক sentence লেখো।'),
  },
  {
    id: 'crucial',
    word: 'crucial',
    ipa: '/ˈkruːʃl/',
    partOfSpeech: 'adjective',
    category: 'academic',
    why: l('A natural alternative to "very important" — avoids repetition in Writing and Speaking.', '"very important"-এর স্বাভাবিক বিকল্প — Writing আর Speaking-এ repetition এড়ায়।'),
    context: 'Getting enough sleep is crucial before an important exam.',
    guess: {
      options: [l('Extremely important', 'খুবই গুরুত্বপূর্ণ'), l('Dangerous', 'বিপজ্জনক'), l('Boring', 'বিরক্তিকর'), l('Optional', 'ঐচ্ছিক')],
      answer: 0,
    },
    meaning: l('extremely important, because other things depend on it', 'অত্যন্ত গুরুত্বপূর্ণ / নির্ণায়ক'),
    explanation: l(
      'Stronger than "important". Common patterns: "crucial for / to something", "It is crucial that…".',
      '"important"-এর চেয়ে জোরালো। Common pattern: "crucial for / to something", "It is crucial that…"।',
    ),
    examples: ['Early education is crucial for a child’s development.', 'It is crucial that students check their answers.'],
    collocations: ['crucial role', 'crucial for', 'absolutely crucial', 'a crucial moment'],
    synonyms: ['essential', 'vital', 'key'],
    synonymNote: l(
      'Don’t say "very crucial" — "crucial" already means very important. Say "absolutely crucial" if you need emphasis.',
      '"very crucial" বোলো না — "crucial" মানেই খুব গুরুত্বপূর্ণ। জোর দিতে চাইলে "absolutely crucial"।',
    ),
    family: [{ word: 'crucially', pos: 'adverb', example: 'Crucially, the plan was cheap.' }],
    ielts: [
      { skill: 'writing', example: 'Teachers play a crucial role in shaping young people’s values.', note: l('Task 2: "play a crucial role in".', 'Task 2: "play a crucial role in"।') },
      { skill: 'speaking', example: 'For me, good time management is crucial.', note: l('Part 1/3: give weight to your opinion.', 'Part 1/3: মতামতে জোর দিতে।') },
    ],
    clue: l('Before an exam, sleep isn’t just nice — your result depends on it.', 'Exam-এর আগে ঘুম শুধু ভালো না — result এর উপর নির্ভর করে।'),
    useTask: l('Write one sentence about something that is crucial for students.', 'Student-দের জন্য crucial এমন কিছু নিয়ে এক sentence লেখো।'),
  },
  {
    id: 'consequence',
    word: 'consequence',
    ipa: '/ˈkɒnsɪkwəns/',
    partOfSpeech: 'noun',
    category: 'health',
    why: l('Lets you talk about results clearly in Task 2 cause–effect essays.', 'Task 2-এর cause–effect essay-তে ফলাফল পরিষ্কারভাবে বলতে সাহায্য করে।'),
    context: 'One consequence of eating too much fast food is a higher risk of heart disease.',
    guess: {
      options: [l('A reason', 'একটা কারণ'), l('A result, often a bad one', 'একটা ফলাফল, প্রায়ই খারাপ'), l('A recipe', 'একটা রেসিপি'), l('A doctor', 'একজন ডাক্তার')],
      answer: 1,
    },
    meaning: l('a result of an action or situation, often a bad one', 'ফলাফল / পরিণতি'),
    explanation: l(
      'Usually about results we should think about: "serious consequences", "the consequences of…". The linking word "as a consequence" = as a result.',
      'সাধারণত এমন ফলাফল যা নিয়ে ভাবা দরকার: "serious consequences", "the consequences of…"। Linking word "as a consequence" = as a result।',
    ),
    examples: ['Climate change could have serious consequences for coastal areas.', 'Students should understand the consequences of plagiarism.'],
    collocations: ['serious consequences', 'the consequences of', 'as a consequence', 'face the consequences'],
    synonyms: ['result', 'effect', 'outcome'],
    synonymNote: l(
      '"outcome" is neutral (the outcome of an election); "consequence" usually suggests something to worry about.',
      '"outcome" নিরপেক্ষ (the outcome of an election); "consequence" সাধারণত চিন্তার বিষয় বোঝায়।',
    ),
    family: [{ word: 'consequently', pos: 'adverb', example: 'He missed the bus; consequently, he was late.' }],
    ielts: [
      { skill: 'writing', example: 'A major consequence of urbanisation is traffic congestion.', note: l('Task 2: link causes to results.', 'Task 2: কারণ আর ফলাফল জুড়তে।') },
      { skill: 'reading', example: 'as a result of … = as a consequence of …', note: l('Recognise it in cause–effect passages.', 'Cause–effect passage-এ চিনতে পারা।') },
    ],
    clue: l('Heart disease is what HAPPENS because of too much fast food.', 'বেশি fast food খাওয়ার কারণে যা ঘটে — heart disease।'),
    useTask: l('Write one sentence about a consequence of using a phone late at night.', 'রাতে দেরিতে phone ব্যবহারের একটা consequence নিয়ে এক sentence লেখো।'),
  },
  {
    id: 'afford',
    word: 'afford',
    ipa: '/əˈfɔːd/',
    partOfSpeech: 'verb',
    category: 'study-abroad',
    why: l('Everyday and IELTS topics on cost, housing and studying abroad.', 'খরচ, বাসস্থান আর বিদেশে পড়াশোনা নিয়ে দৈনন্দিন ও IELTS topic-এ লাগে।'),
    context: 'Many families cannot afford to send their children abroad to study.',
    guess: {
      options: [l('To want', 'চাওয়া'), l('To have enough money for', 'কোনো কিছুর জন্য যথেষ্ট টাকা থাকা'), l('To travel', 'ভ্রমণ করা'), l('To allow', 'অনুমতি দেওয়া')],
      answer: 1,
    },
    meaning: l('to have enough money or time to do or buy something', 'সামর্থ্য থাকা / খরচ বহন করতে পারা'),
    explanation: l(
      'Usually with can / can’t / be able to: "I can’t afford a new laptop", "afford TO do something".',
      'সাধারণত can / can’t / be able to-এর সাথে: "I can’t afford a new laptop", "afford TO do something"।',
    ),
    examples: ['Young people in big cities often can’t afford to buy a flat.', 'Not every student can afford private tuition.'],
    collocations: ['can’t afford', 'afford to do', 'afford the cost', 'easily afford'],
    synonyms: ['manage (to pay for)', 'pay for'],
    family: [{ word: 'affordable', pos: 'adjective', example: 'The government should build more affordable housing.' }],
    ielts: [
      { skill: 'writing', example: 'Many graduates cannot afford to live in the city centre.', note: l('Task 2: housing, cost of living, education.', 'Task 2: বাসস্থান, জীবনযাত্রার খরচ, শিক্ষা।') },
      { skill: 'speaking', example: 'I’d love to travel more, but I can’t afford it right now.', note: l('Part 1: a natural, honest answer.', 'Part 1: স্বাভাবিক, সৎ answer।') },
    ],
    clue: l('Studying abroad is expensive — many families don’t have enough money.', 'বিদেশে পড়া দামি — অনেক পরিবারের যথেষ্ট টাকা নেই।'),
    useTask: l('Write one sentence about something students can or can’t afford.', 'Student-রা afford করতে পারে বা পারে না এমন কিছু নিয়ে এক sentence লেখো।'),
  },
];

export const getFoundationWord = (id: string) => FOUNDATION_WORDS.find((w) => w.id === id);

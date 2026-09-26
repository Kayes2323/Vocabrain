import { choice, correct, gap, l, order, spot } from './pos-kit';
import type { FinalItem, FinalPart } from './pos-final';

/**
 * Tenses · Final Mastery Challenge. Eight parts, 4 items each at levels 1–3;
 * 3 are served per part adaptively (24 questions). Every item carries the
 * concept it tests, so the report can show tense-by-tense results. Many items
 * are free recall. New items, not copied from the lessons. Original Vocab Brain content.
 */
const at = <T extends FinalItem>(level: 1 | 2 | 3, e: Omit<T, 'level'>): T => ({ ...e, level }) as T;
const T = { tag: 'tense' as const };

export const TENSE_FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('Identify the time', 'সময় চিনে নাও'), intro: l('What time picture does the sentence show?', 'Sentence-টা কোন সময় দেখায়?'),
    items: [
      at(1, choice('tfin-a1', 'present-simple', { ...T, prompt: l('What does the verb show?', 'Verb-টা কী দেখায়?'), sentence: 'My uncle drives a taxi in Chattogram.', options: ['a permanent situation', 'something happening only right now', 'a finished past action'], answer: 'a permanent situation', explanation: l('Present simple: his job, a permanent situation.', 'Present simple: তার চাকরি, স্থায়ী অবস্থা।') })),
      at(2, choice('tfin-a2', 'present-perfect', { ...T, prompt: l('What does the verb show?', 'Verb-টা কী দেখায়?'), sentence: 'Air pollution in Dhaka has become worse since 2015.', options: ['a change from the past up to now', 'a change that finished in 2015', 'a future prediction'], answer: 'a change from the past up to now', explanation: l('has become + since → from 2015 up to now.', 'has become + since → 2015 থেকে এখন পর্যন্ত।') })),
      at(2, choice('tfin-a3', 'past-perfect', { ...T, prompt: l('Which happened first?', 'কোনটা আগে ঘটেছিল?'), sentence: 'The shop had closed when we got there.', options: ['The shop closed', 'We got there', 'Both at the same time'], answer: 'The shop closed', explanation: l('had closed = the earlier past.', 'had closed = আরও আগের অতীত।') })),
      at(3, choice('tfin-a4', 'present-perfect-continuous', { ...T, prompt: l('What does the verb tell you?', 'Verb-টা কী বলে?'), sentence: 'Engineers have been repairing the bridge since March.', options: ['The repairs are probably still going on', 'The repairs finished in March', 'The repairs will start in March'], answer: 'The repairs are probably still going on', explanation: l('have been + -ing + since → an activity continuing up to now.', 'have been + -ing + since → এখন পর্যন্ত চলা কাজ।') })),
    ],
  },
  {
    id: 'B', title: l('Choose from context', 'প্রসঙ্গ দেখে বাছো'), intro: l('No hints: the sentence decides.', 'কোনো hint নেই: sentence-ই ঠিক করে।'),
    items: [
      at(1, choice('tfin-b1', 'present-continuous', { ...T, pattern: 'simple-vs-continuous', prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'Shh! The baby ___.', options: ['sleeps', 'is sleeping', 'slept'], answer: 'is sleeping', explanation: l('"Shh!" = right now.', '"Shh!" = এই মুহূর্তে।') })),
      at(2, choice('tfin-b2', 'past-simple', { ...T, pattern: 'past-vs-perfect', prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'The government ___ the new metro line in December 2022.', options: ['has opened', 'opened', 'opens'], answer: 'opened', explanation: l('A finished date → past simple.', 'শেষ হওয়া তারিখ → past simple।') })),
      at(2, choice('tfin-b3', 'future', { ...T, prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'Look at those dark clouds — it ___ rain.', options: ['is going to', 'rains', 'rained'], answer: 'is going to', explanation: l('A prediction from what you can see now → going to.', 'এখন যা দেখছো তা থেকে ভবিষ্যদ্বাণী → going to।') })),
      at(3, choice('tfin-b4', 'past-continuous', { ...T, prompt: l('Choose the correct pair.', 'সঠিক জোড়া বাছো।'), sentence: 'I ___ my homework when the lights ___ off.', options: ['was doing · went', 'did · were going', 'have done · went'], answer: 'was doing · went', explanation: l('Background in progress + the interruption.', 'চলতে থাকা পটভূমি + বাধা।') })),
    ],
  },
  {
    id: 'C', title: l('Correct the verb', 'Verb ঠিক করো'), intro: l('Tap the verb that is wrong and type the fix.', 'ভুল verb-এ tap করে ঠিক form লেখো।'),
    items: [
      at(1, spot('tfin-c1', 'present-simple', { tag: 'agreement', pattern: 'sv-agreement', sentence: 'My sister live in Khulna with her husband.', wrong: 'live', accepted: ['lives'], explanation: l('she → lives.', 'she → lives।') })),
      at(2, spot('tfin-c2', 'past-simple', { ...T, pattern: 'verb-form', sentence: 'Did you enjoyed the concert last night?', wrong: 'enjoyed', accepted: ['enjoy'], explanation: l('Did + base verb.', 'Did + base verb।') })),
      at(2, spot('tfin-c3', 'present-perfect', { ...T, pattern: 'verb-form', sentence: 'The price of rice has rose every year.', wrong: 'rose', accepted: ['risen'], explanation: l('has + past participle: risen.', 'has + past participle: risen।') })),
      at(3, spot('tfin-c4', 'future', { ...T, pattern: 'verb-form', sentence: 'By 2030, the number of users is expected to doubles.', wrong: 'doubles', accepted: ['double'], explanation: l('is expected to + base verb: to double.', 'is expected to + base verb: to double।') })),
    ],
  },
  {
    id: 'D', title: l('Free recall', 'নিজে লেখো'), intro: l('Write the verb in the right form.', 'Verb-টা ঠিক form-এ লেখো।'),
    items: [
      at(1, gap('tfin-d1', 'past-simple', { ...T, pattern: 'tense-time', prompt: l('Write the correct form of "buy".', '"buy"-এর সঠিক form লেখো।'), sentence: 'I ___ a new phone last month.', accepted: ['bought'], explanation: l('last month → bought.', 'last month → bought।') })),
      at(2, gap('tfin-d2', 'present-perfect', { ...T, pattern: 'past-vs-perfect', prompt: l('Write the correct form of "know".', '"know"-এর সঠিক form লেখো।'), sentence: 'We ___ each other since primary school.', accepted: ['have known', "'ve known"], explanation: l('since + state verb → have known.', 'since + state verb → have known।') })),
      at(2, gap('tfin-d3', 'past-continuous', { ...T, prompt: l('Write the correct form of "cross".', '"cross"-এর সঠিক form লেখো।'), sentence: 'She fell while she ___ the road.', accepted: ['was crossing'], explanation: l('while + in progress → was crossing.', 'while + চলছিল → was crossing।') })),
      at(3, gap('tfin-d4', 'past-perfect', { ...T, pattern: 'verb-form', prompt: l('Write the correct form of "leave".', '"leave"-এর সঠিক form লেখো।'), sentence: 'When I called her office, she ___. (already / leave)', accepted: ['had already left', 'had left already', 'had left'], explanation: l('Earlier past: had already left.', 'আরও আগের অতীত: had already left।') })),
    ],
  },
  {
    id: 'E', title: l('Explain', 'ব্যাখ্যা করো'), intro: l('Choose the real reason.', 'আসল কারণটা বাছো।'),
    items: [
      at(1, choice('tfin-e1', 'present-simple', { ...T, pattern: 'simple-vs-continuous', prompt: l('Why is "I am liking this song" wrong?', '"I am liking this song" কেন ভুল?'), options: ['"like" is a state verb, so it stays simple', '"song" must be plural', 'The past tense is needed'], answer: '"like" is a state verb, so it stays simple', explanation: l('I like this song.', 'I like this song।') })),
      at(2, choice('tfin-e2', 'past-simple', { ...T, pattern: 'past-vs-perfect', prompt: l('Why is "I have met him in 2020" wrong?', '"I have met him in 2020" কেন ভুল?'), options: ['"in 2020" is a finished time, so it needs the past simple', '"met" should be "meet"', '"him" should be "he"'], answer: '"in 2020" is a finished time, so it needs the past simple', explanation: l('I met him in 2020.', 'I met him in 2020।') })),
      at(2, choice('tfin-e3', 'future', { ...T, pattern: 'tense-time', prompt: l('Why is "If it will rain, we will stay home" wrong?', '"If it will rain, we will stay home" কেন ভুল?'), options: ['After "if" about the future, English uses the present', '"stay" must be "stayed"', '"home" needs "the"'], answer: 'After "if" about the future, English uses the present', explanation: l('If it rains, we will stay home.', 'If it rains, we will stay home।') })),
      at(3, choice('tfin-e4', 'present-perfect-continuous', { ...T, prompt: l('Why is "I have been reading five books this month" strange?', '"I have been reading five books this month" কেন অদ্ভুত?'), options: ['A finished number (five books) needs "have read"', '"this month" needs the past simple', '"reading" should be "read" after "been"'], answer: 'A finished number (five books) needs "have read"', explanation: l('How many → have read; how long → have been reading.', 'কতগুলো → have read; কতক্ষণ → have been reading।') })),
    ],
  },
  {
    id: 'F', title: l('Reading & Listening', 'Reading ও Listening'), intro: l('The tense carries the meaning.', 'Tense-ই অর্থ বহন করে।'),
    items: [
      at(1, choice('tfin-f1', 'present-perfect', { ...T, prompt: l('Reading: "The museum has not reopened since the flood." Statement: "The museum is open again."', 'Reading: "The museum has not reopened since the flood." Statement: "The museum is open again."'), options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: l('"has not reopened since" = still closed now.', '"has not reopened since" = এখনো বন্ধ।') })),
      at(2, choice('tfin-f2', 'future', { ...T, prompt: l('Listening: "The meeting was going to be on Monday, but we’ve moved it to Wednesday." When is the meeting?', 'Listening: "The meeting was going to be on Monday, but we’ve moved it to Wednesday." Meeting কবে?'), options: ['Wednesday', 'Monday', 'Both days'], answer: 'Wednesday', explanation: l('"was going to" = the old plan; "have moved it to" = the current one.', '"was going to" = পুরনো পরিকল্পনা; "have moved it to" = এখনকারটা।') })),
      at(2, choice('tfin-f3', 'past-perfect', { ...T, prompt: l('Reading: "By the time the dam was built, most villagers had moved away." Statement: "Most villagers left after the dam was built."', 'Reading: "By the time the dam was built, most villagers had moved away." Statement: "Most villagers left after the dam was built."'), options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: l('"had moved away" = before the dam was built.', '"had moved away" = dam তৈরির আগে।') })),
      at(3, choice('tfin-f4', 'present-perfect-continuous', { ...T, prompt: l('Reading: "Scientists have been studying the coral since 2010." Statement: "The study of the coral began in 2010 and has now ended."', 'Reading: "Scientists have been studying the coral since 2010." Statement: "The study of the coral began in 2010 and has now ended."'), options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: l('"have been studying … since" = still continuing, not ended.', '"have been studying … since" = এখনো চলছে, শেষ হয়নি।') })),
    ],
  },
  {
    id: 'G', title: l('IELTS Writing', 'IELTS Writing'), intro: l('Task 1 and Task 2 sentences.', 'Task 1 আর Task 2-এর sentence।'),
    items: [
      at(1, choice('tfin-g1', 'present-simple', { ...T, prompt: l('Task 1 introduction (data 1995–2015):', 'Task 1 introduction (data 1995–2015):'), options: ['The bar chart shows the number of cinemas between 1995 and 2015.', 'The bar chart showed the number of cinemas between 1995 and 2015.', 'The bar chart has shown the number of cinemas between 1995 and 2015.'], answer: 'The bar chart shows the number of cinemas between 1995 and 2015.', explanation: l('The chart shows it now → shows.', 'Chart এখন দেখাচ্ছে → shows।') })),
      at(2, correct('tfin-g2', 'past-simple', { ...T, pattern: 'past-vs-perfect', prompt: l('Rewrite the Task 1 sentence correctly.', 'Task 1 sentence-টা ঠিক করে লেখো।'), sentence: 'The number of cinemas has fallen from 60 in 1995 to 25 in 2015.', accepted: ['The number of cinemas fell from 60 in 1995 to 25 in 2015.', 'The number of cinemas decreased from 60 in 1995 to 25 in 2015.'], explanation: l('Finished years → fell.', 'শেষ হওয়া বছর → fell।') })),
      at(2, gap('tfin-g3', 'future', { ...T, prompt: l('Complete the projection with "expect" + "rise".', '"expect" + "rise" দিয়ে projection-টা complete করো।'), sentence: 'Demand for electricity ___ by 40% by 2035.', accepted: ['is expected to rise', 'is projected to rise', 'will rise'], explanation: l('Future year → is expected to rise.', 'ভবিষ্যতের বছর → is expected to rise।') })),
      at(3, correct('tfin-g4', 'present-perfect', { ...T, pattern: 'past-vs-perfect', prompt: l('Rewrite the Task 2 sentence correctly.', 'Task 2 sentence-টা ঠিক করে লেখো।'), sentence: 'In recent years, many young people moved to cities to find work.', accepted: ['In recent years, many young people have moved to cities to find work.'], explanation: l('"In recent years" = up to now → have moved.', '"In recent years" = এখন পর্যন্ত → have moved।') })),
    ],
  },
  {
    id: 'H', title: l('Speaking & building sentences', 'Speaking ও sentence বানানো'), intro: l('Answer like in the test.', 'পরীক্ষার মতো উত্তর দাও।'),
    items: [
      at(1, order('tfin-h1', 'past-simple', { ...T, prompt: l('Build the Part 2 sentence.', 'Part 2-এর sentence-টা বানাও।'), answer: 'I visited my grandparents in Rangpur last winter.', explanation: l('Finished time → visited.', 'শেষ হওয়া সময় → visited।') })),
      at(2, correct('tfin-h2', 'present-perfect-continuous', { ...T, pattern: 'tense-time', prompt: l('Examiner: "How long have you been learning English?" Fix the answer.', 'Examiner: "How long have you been learning English?" উত্তরটা ঠিক করো।'), sentence: 'I am learning English for eight years.', accepted: ['I have been learning English for eight years.', "I've been learning English for eight years."], explanation: l('for + until now → have been learning.', 'for + এখন পর্যন্ত → have been learning।') })),
      at(2, order('tfin-h3', 'future', { ...T, prompt: l('Build the Part 1 answer about a plan.', 'পরিকল্পনা নিয়ে Part 1-এর উত্তর বানাও।'), answer: 'Next year I am going to study engineering.', explanation: l('A decided plan → going to.', 'ঠিক করা পরিকল্পনা → going to।') })),
      at(3, correct('tfin-h4', 'present-perfect', { ...T, pattern: 'past-vs-perfect', prompt: l('Examiner: "Have you ever been abroad?" Fix the answer (two verbs).', 'Examiner: "Have you ever been abroad?" উত্তরটা ঠিক করো (দুটো verb)।'), sentence: 'Yes, I have went to Nepal and I have stayed there in 2019.', accepted: ['Yes, I have been to Nepal and I stayed there in 2019.', 'Yes, I have been to Nepal, and I stayed there in 2019.'], explanation: l('Experience → have been to; the finished detail (in 2019) → stayed.', 'অভিজ্ঞতা → have been to; শেষ হওয়া বিস্তারিত (in 2019) → stayed।') })),
    ],
  },
];

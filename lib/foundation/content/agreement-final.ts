import type { FinalItem, FinalPart } from './pos-final';
import { choice, correct, gap, l, order, spot } from './pos-kit';

/**
 * Subject–Verb Agreement · Final Mastery Challenge. Six parts, 4 items each at
 * levels 1–3; 3 are served per part adaptively (18 questions). Every item
 * carries the agreement concept it tests, so the report can show results
 * topic by topic. New items, not copied from the lessons. Original Mino content.
 */
const at = <T extends FinalItem>(level: 1 | 2 | 3, e: Omit<T, 'level'>): T => ({ ...e, level }) as T;
const S = { tag: 'agreement' as const };

export const AGREEMENT_FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('One or more?', 'একটা নাকি একাধিক?'), intro: l('Find the subject, then choose the verb.', 'Subject খুঁজুন, তারপর verb বেছে নিন।'),
    items: [
      at(1, choice('sfin-a1', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'The shop ___ at ten o’clock.', options: ['opens', 'open'], answer: 'opens', explanation: l('The shop = it → opens.', 'The shop = it → opens।') })),
      at(2, choice('sfin-a2', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'My roommate ___ cook, so we usually eat out.', options: ['doesn’t', 'don’t'], answer: 'doesn’t', explanation: l('One roommate = he / she → doesn’t.', 'একজন roommate = he / she → doesn’t।') })),
      at(2, gap('sfin-a3', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'The river near our village ___ (flood) almost every monsoon.', base: 'flood', accepted: ['floods'], explanation: l('The river = it → floods.', 'The river = it → floods।') })),
      at(3, correct('sfin-a4', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Correct the sentence (two verbs are wrong).', 'Sentence-টা ঠিক করুন (দুটো verb ভুল)।'), sentence: 'Mathematics are hard for me, but my classmates finds it easy.', accepted: ['Mathematics is hard for me, but my classmates find it easy.'], explanation: l('mathematics (one subject) → is · my classmates → find.', 'mathematics (একটা বিষয়) → is · my classmates → find।') })),
    ],
  },
  {
    id: 'B', title: l('Two subjects', 'দুটো subject'), intro: l('and → plural; or / nor → the nearer subject.', 'and → plural; or / nor → কাছের subject।'),
    items: [
      at(1, choice('sfin-b1', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'My aunt and uncle ___ in Cumilla.', options: ['live', 'lives'], answer: 'live', explanation: l('A and B → plural → live.', 'A and B → plural → live।') })),
      at(2, choice('sfin-b2', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Either the bus or the trains ___ the best way to get there.', options: ['are', 'is'], answer: 'are', explanation: l('Nearer subject "the trains" → are.', 'কাছের subject "the trains" → are।') })),
      at(2, gap('sfin-b3', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Write is or are.', 'is বা are লিখুন।'), sentence: 'Neither my laptop nor my phone ___ working today.', accepted: ['is'], explanation: l('Nearer subject "my phone" → is.', 'কাছের subject "my phone" → is।') })),
      at(3, spot('sfin-b4', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Neither the manager nor his assistants was at the meeting.', wrong: 'was', accepted: ['were'], fixOptions: ['were', 'is', 'be'], explanation: l('Nearer subject "his assistants" → were.', 'কাছের subject "his assistants" → were।') })),
    ],
  },
  {
    id: 'C', title: l('everyone, each, groups', 'everyone, each, group'), intro: l('Words like everyone and each are singular.', 'everyone, each-এর মতো word singular।'),
    items: [
      at(1, choice('sfin-c1', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Everyone ___ tired after the long journey.', options: ['is', 'are'], answer: 'is', explanation: l('everyone → singular → is.', 'everyone → singular → is।') })),
      at(2, choice('sfin-c2', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Each of the questions ___ two marks.', options: ['carries', 'carry'], answer: 'carries', explanation: l('each (of) → singular → carries.', 'each (of) → singular → carries।') })),
      at(2, gap('sfin-c3', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Write has or have.', 'has বা have লিখুন।'), sentence: 'Nobody in my family ___ ever been to Europe.', accepted: ['has'], explanation: l('nobody → singular → has.', 'nobody → singular → has।') })),
      at(3, choice('sfin-c4', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The team is training hard, and the people in the town are proud of it.', 'The team are training hard, and the people in the town is proud of it.', 'The team is training hard, and the people in the town is proud of it.'], answer: 'The team is training hard, and the people in the town are proud of it.', explanation: l('The team (one group) → is · people (plural) → are.', 'The team (একটা দল) → is · people (plural) → are।') })),
    ],
  },
  {
    id: 'D', title: l('Long subjects', 'লম্বা subject'), intro: l('Skip "of…", "with…", "who…" and find the head word.', '"of…", "with…", "who…" বাদ দিয়ে মূল word খুঁজুন।'),
    items: [
      at(1, choice('sfin-d1', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'The keys to the car ___ on the table.', options: ['are', 'is'], answer: 'are', explanation: l('Head = the keys → are.', 'মূল word = the keys → are।') })),
      at(2, choice('sfin-d2', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Task 2: choose the correct verb.', 'Task 2: সঠিক verb বেছে নিন।'), sentence: 'The cost of living in big cities ___ rising every year.', options: ['is', 'are'], answer: 'is', explanation: l('Head = the cost → is.', 'মূল word = the cost → is।') })),
      at(2, spot('sfin-d3', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('One verb is wrong. Tap it and type the right form.', 'একটা verb ভুল। সেটায় tap করে সঠিক form লিখুন।'), sentence: 'A student who work hard usually does well.', wrong: 'work', accepted: ['works'], explanation: l('who = a student (one) → works.', 'who = a student (একজন) → works।') })),
      at(3, correct('sfin-d4', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Fix the Task 2 sentence (one verb).', 'Task 2 sentence-টা ঠিক করুন (একটা verb)।'), sentence: 'The rise in the prices of basic goods have hurt poor families.', accepted: ['The rise in the prices of basic goods has hurt poor families.'], explanation: l('Head = the rise → has.', 'মূল word = the rise → has।') })),
    ],
  },
  {
    id: 'E', title: l('Numbers and amounts', 'সংখ্যা আর পরিমাণ'), intro: l('the number of, a number of, percentages, money and time.', 'the number of, a number of, শতাংশ, টাকা আর সময়।'),
    items: [
      at(1, choice('sfin-e1', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: '___ some milk in the fridge.', options: ['There is', 'There are'], answer: 'There is', explanation: l('milk is uncountable → There is.', 'milk uncountable → There is।') })),
      at(2, choice('sfin-e2', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Task 1: choose the correct verb.', 'Task 1: সঠিক verb বেছে নিন।'), sentence: 'The number of car owners ___ doubled over the period.', options: ['has', 'have'], answer: 'has', explanation: l('the number → has.', 'the number → has।') })),
      at(2, gap('sfin-e3', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Write is or are.', 'is বা are লিখুন।'), sentence: 'Five kilometres ___ too far to walk in this heat.', accepted: ['is'], explanation: l('One distance → is.', 'দূরত্বের একটা পরিমাণ → is।') })),
      at(3, choice('sfin-e4', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Task 1: which sentence is correct?', 'Task 1: কোন sentence-টা ঠিক?'), options: ['In 2020, 60% of the energy was from coal, and 30% of households were using solar panels.', 'In 2020, 60% of the energy were from coal, and 30% of households was using solar panels.', 'In 2020, 60% of the energy was from coal, and 30% of households was using solar panels.'], answer: 'In 2020, 60% of the energy was from coal, and 30% of households were using solar panels.', explanation: l('% of energy (uncountable) → was · % of households (plural) → were.', '% of energy (uncountable) → was · % of households (plural) → were।') })),
    ],
  },
  {
    id: 'F', title: l('IELTS in action', 'IELTS-এ প্রয়োগ'), intro: l('Real Writing and Speaking sentences, no hints.', 'আসল Writing আর Speaking sentence, কোনো hint নেই।'),
    items: [
      at(1, choice('sfin-f1', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Task 1: choose the correct verb.', 'Task 1: সঠিক verb বেছে নিন।'), sentence: 'The diagram ___ how tea is produced.', options: ['illustrates', 'illustrate'], answer: 'illustrates', explanation: l('The diagram = it → illustrates.', 'The diagram = it → illustrates।') })),
      at(2, order('sfin-f2', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Build the Task 2 sentence.', 'Task 2 sentence-টা সাজান।'), answer: 'The growth of online shopping has changed the way people live.', explanation: l('Head = the growth → has.', 'মূল word = the growth → has।') })),
      at(2, gap('sfin-f3', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Speaking: write the correct form of the verb in brackets.', 'Speaking: বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'In my family, everybody ___ (enjoy) watching cricket together.', base: 'enjoy', accepted: ['enjoys'], explanation: l('everybody → enjoys.', 'everybody → enjoys।') })),
      at(3, correct('sfin-f4', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Fix the Task 2 sentence (two verbs are wrong).', 'Task 2 sentence-টা ঠিক করুন (দুটো verb ভুল)।'), sentence: 'There is a number of reasons why the number of divorces have increased.', accepted: ['There are a number of reasons why the number of divorces has increased.'], explanation: l('a number of reasons → There are · the number → has.', 'a number of reasons → There are · the number → has।') })),
    ],
  },
];

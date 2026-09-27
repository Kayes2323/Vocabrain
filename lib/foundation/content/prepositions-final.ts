import type { FinalItem, FinalPart } from './pos-final';
import { choice, correct, gap, l, order, spot } from './pos-kit';

/**
 * Prepositions · Final Mastery Challenge. Six parts, 4 items each at levels
 * 1–3; 3 are served per part adaptively (18 questions). Every item carries the
 * preposition concept it tests, so the report can show results topic by topic.
 * New items, not copied from the lessons. Original Mino content.
 */
const at = <T extends FinalItem>(level: 1 | 2 | 3, e: Omit<T, 'level'>): T => ({ ...e, level }) as T;
const P = { tag: 'preposition' as const };

export const PREPOSITION_FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('Time: in, on, at', 'সময়: in, on, at'), intro: l('How big is the time?', 'সময়টা কত বড়?'),
    items: [
      at(1, choice('prfin-a1', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'The festival is ___ April.', options: ['in', 'on', 'at'], answer: 'in', explanation: l('A month → in.', 'মাস → in।') })),
      at(2, choice('prfin-a2', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'We have an exam ___ Tuesday afternoon.', options: ['on', 'in', 'at'], answer: 'on', explanation: l('A day + part of the day → on.', 'দিন + দিনের অংশ → on।') })),
      at(2, gap('prfin-a3', 'prep-time', { ...P, pattern: 'prep-time-words', prompt: l('Write in, on or at.', 'in, on বা at লিখুন।'), sentence: 'The shops are busy ___ the end of the month.', accepted: ['at'], explanation: l('at the end of.', 'at the end of।') })),
      at(3, correct('prfin-a4', 'prep-time', { ...P, pattern: 'prep-extra', prompt: l('Correct the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'I will visit my grandmother on next Friday.', accepted: ['I will visit my grandmother next Friday.'], explanation: l('No preposition before next.', 'next-এর আগে preposition না।') })),
    ],
  },
  {
    id: 'B', title: l('How long? Since when?', 'কতক্ষণ? কবে থেকে?'), intro: l('for, since, during, by, until, ago.', 'for, since, during, by, until, ago।'),
    items: [
      at(1, choice('prfin-b1', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'I stayed in Cox’s Bazar ___ a week.', options: ['for', 'since', 'during'], answer: 'for', explanation: l('A length → for.', 'দৈর্ঘ্য → for।') })),
      at(2, choice('prfin-b2', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'Nobody used their phones ___ the lecture.', options: ['during', 'for', 'since'], answer: 'during', explanation: l('Inside an event → during.', 'ঘটনার ভেতরে → during।') })),
      at(2, gap('prfin-b3', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Write by or until.', 'by বা until লিখুন।'), sentence: 'Please return the library books ___ 15 May at the latest.', accepted: ['by'], explanation: l('A deadline → by.', 'শেষ সীমা → by।') })),
      at(3, spot('prfin-b4', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'We have been friends since ten years.', wrong: 'since', accepted: ['for'], fixOptions: ['for', 'during', 'ago'], explanation: l('A length → for.', 'দৈর্ঘ্য → for।') })),
    ],
  },
  {
    id: 'C', title: l('Place and movement', 'জায়গা আর চলাচল'), intro: l('Space, surface or point? Where is it going?', 'জায়গা, উপরিতল নাকি বিন্দু? কোথায় যাচ্ছে?'),
    items: [
      at(1, choice('prfin-c1', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'There is a map ___ the wall.', options: ['on', 'in', 'at'], answer: 'on', explanation: l('A surface → on.', 'উপরিতল → on।') })),
      at(2, choice('prfin-c2', 'prep-movement', { ...P, pattern: 'prep-extra', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The guests reached the venue at eight.', 'The guests reached to the venue at eight.', 'The guests reached at the venue at eight.'], answer: 'The guests reached the venue at eight.', explanation: l('reach + place, no preposition.', 'reach + জায়গা, preposition না।') })),
      at(2, gap('prfin-c3', 'prep-movement', { ...P, pattern: 'prep-place-words', prompt: l('Write in or at.', 'in বা at লিখুন।'), sentence: 'We arrived ___ the hotel after midnight.', accepted: ['at'], explanation: l('arrive at + a building.', 'arrive at + building।') })),
      at(3, spot('prfin-c4', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('One word breaks this Task 1 sentence. Tap it, then fix it.', 'একটা word Task 1 sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'The café is located in the corner of the two main roads.', wrong: 'in', accepted: ['at', 'on'], fixOptions: ['at', 'to', 'by'], explanation: l('at the corner of two roads (a point).', 'at the corner of two roads (একটা বিন্দু)।') })),
    ],
  },
  {
    id: 'D', title: l('Word partners', 'Word partner'), intro: l('The word before chooses the preposition.', 'আগের word preposition ঠিক করে।'),
    items: [
      at(1, choice('prfin-d1', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Choose the preposition.', 'Preposition বেছে নিন।'), sentence: 'My sister is interested ___ fashion design.', options: ['in', 'on', 'about'], answer: 'in', explanation: l('interested in.', 'interested in।') })),
      at(2, choice('prfin-d2', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Task 2: choose the preposition.', 'Task 2: preposition বেছে নিন।'), sentence: 'Parents should be responsible ___ their children’s safety online.', options: ['for', 'of', 'to'], answer: 'for', explanation: l('responsible for.', 'responsible for।') })),
      at(2, gap('prfin-d3', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Write the preposition.', 'Preposition লিখুন।'), sentence: 'Farmers in the north suffer ___ water shortages every summer.', accepted: ['from'], explanation: l('suffer from.', 'suffer from।') })),
      at(3, correct('prfin-d4', 'prep-partner', { ...P, pattern: 'prep-extra', prompt: l('Fix the Task 2 sentence (two prepositions are wrong).', 'Task 2 sentence-টা ঠিক করুন (দুটো preposition ভুল)।'), sentence: 'Many experts emphasise on the need of more green spaces.', accepted: ['Many experts emphasise the need for more green spaces.', 'Many experts emphasize the need for more green spaces.'], explanation: l('emphasise + object · the need for.', 'emphasise + object · the need for।') })),
    ],
  },
  {
    id: 'E', title: l('Prepositions for data', 'Data-র preposition'), intro: l('Is the number the change or the level?', 'সংখ্যাটা পরিবর্তন নাকি মান?'),
    items: [
      at(1, choice('prfin-e1', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('10% → 25%. Choose the preposition for the new level.', '10% → 25%। নতুন মানের জন্য preposition বেছে নিন।'), sentence: 'The rate climbed ___ 25%.', options: ['to', 'by', 'at'], answer: 'to', explanation: l('The new level → to.', 'নতুন মান → to।') })),
      at(2, choice('prfin-e2', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Choose the correct phrase.', 'সঠিক phrase বেছে নিন।'), sentence: 'There was a slight fall ___ the price of sugar.', options: ['in', 'of', 'to'], answer: 'in', explanation: l('a fall in + thing.', 'a fall in + জিনিস।') })),
      at(2, gap('prfin-e3', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Write the preposition.', 'Preposition লিখুন।'), sentence: 'The number of visitors remained steady ___ about 400 a day.', accepted: ['at'], explanation: l('remain steady at + level.', 'remain steady at + মান।') })),
      at(3, choice('prfin-e4', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Output went from 60 to 45 tonnes. Which sentence is TRUE?', 'Output 60 থেকে 45 টন হয়েছে। কোন sentence সত্যি?'), options: ['Output fell by 15 tonnes to 45 tonnes.', 'Output fell to 15 tonnes by 45 tonnes.', 'Output fell by 45 tonnes.'], answer: 'Output fell by 15 tonnes to 45 tonnes.', explanation: l('by 15 (change) · to 45 (new level).', 'by 15 (পরিবর্তন) · to 45 (নতুন মান)।') })),
    ],
  },
  {
    id: 'F', title: l('IELTS in action', 'IELTS-এ প্রয়োগ'), intro: l('Real Writing and Speaking sentences, no hints.', 'আসল Writing আর Speaking sentence, কোনো hint নেই।'),
    items: [
      at(1, choice('prfin-f1', 'prep-place', { ...P, pattern: 'prep-place-words', prompt: l('Speaking: choose the preposition.', 'Speaking: preposition বেছে নিন।'), sentence: 'I’m a student ___ Chittagong University.', options: ['at', 'in', 'on'], answer: 'at', explanation: l('a student at + a university / college.', 'a student at + university / college।') })),
      at(2, order('prfin-f2', 'prep-data', { ...P, pattern: 'prep-data-words', prompt: l('Build the Task 1 sentence.', 'Task 1 sentence-টা সাজান।'), answer: 'The figure doubled between 2000 and 2010.', explanation: l('between … and.', 'between … and।') })),
      at(2, gap('prfin-f3', 'prep-partner', { ...P, pattern: 'prep-word-partner', prompt: l('Task 2: write the preposition.', 'Task 2: preposition লিখুন।'), sentence: 'Tourism has a positive impact ___ local jobs.', accepted: ['on'], explanation: l('an impact on.', 'an impact on।') })),
      at(3, correct('prfin-f4', 'prep-duration', { ...P, pattern: 'prep-time-words', prompt: l('Fix the Speaking answer (two prepositions are wrong).', 'Speaking উত্তরটা ঠিক করুন (দুটো preposition ভুল)।'), sentence: 'I have lived at Sylhet since five years.', accepted: ['I have lived in Sylhet for five years.'], explanation: l('live in + city · for + length.', 'live in + শহর · for + দৈর্ঘ্য।') })),
    ],
  },
];

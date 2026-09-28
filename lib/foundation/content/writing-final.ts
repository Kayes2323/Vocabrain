import type { FinalItem, FinalPart } from './pos-final';
import { choice, correct, gap, l, order, spot } from './pos-kit';

/**
 * Understanding IELTS Writing · Final Mastery Challenge. Six parts, 4 items
 * each at levels 1–3; 3 are served per part adaptively (18 questions). New
 * items, not copied from the lessons; the rainfall table uses invented numbers.
 * Original Mino content.
 */
const at = <T extends FinalItem>(level: 1 | 2 | 3, e: Omit<T, 'level'>): T => ({ ...e, level }) as T;
const P = { tag: 'writing' as const };

const BIKES = 'Example table (invented data), bicycles sold in a town: 2005: 4,000; 2015: 7,000; 2025: 12,000. Cars sold: 2005: 9,000; 2015: 8,500; 2025: 6,000.';

export const WRITING_FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('How Writing works', 'Writing কীভাবে চলে'), intro: l('Timing, length and criteria.', 'সময়, দৈর্ঘ্য আর criteria।'),
    items: [
      at(1, choice('wrfin-a1', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('How long is IELTS Writing in total?', 'IELTS Writing মোট কত সময়?'), options: ['60 minutes', '30 minutes', '90 minutes'], answer: '60 minutes', explanation: l('Both tasks in 60 minutes.', 'দুটো task ৬০ মিনিটে।') })),
      at(2, choice('wrfin-a2', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Which is NOT one of the four Writing criteria?', 'কোনটা Writing-এর চারটা criteria-র একটা নয়?'), options: ['Handwriting style', 'Coherence & Cohesion', 'Lexical Resource'], answer: 'Handwriting style', explanation: l('Task, Coherence & Cohesion, Lexical Resource, Grammar.', 'Task, Coherence & Cohesion, Lexical Resource, Grammar।') })),
      at(2, gap('wrfin-a3', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'Task 2 needs at least ___ words.', accepted: ['250'], explanation: l('250.', '২৫০।') })),
      at(3, correct('wrfin-a4', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Correct the statement.', 'বাক্যটা ঠিক করুন।'), sentence: 'Task 1 and Task 2 count equally.', accepted: ['Task 2 counts for more than Task 1.', 'Task 2 counts more than Task 1.'], explanation: l('Task 2 counts for more.', 'Task 2-এর গুরুত্ব বেশি।') })),
    ],
  },
  {
    id: 'B', title: l('Task 1 overview', 'Task 1-এর overview'), intro: l('Introduction and main trends.', 'Introduction আর মূল trend।'),
    items: [
      at(1, choice('wrfin-b1', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Which word often starts an overview?', 'কোন word প্রায়ই overview শুরু করে?'), options: ['Overall', 'Firstly', 'Personally'], answer: 'Overall', explanation: l('"Overall, …"', '"Overall, …"') })),
      at(2, choice('wrfin-b2', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Best overview for this table?', 'এই table-এর সবচেয়ে ভালো overview?'), sentence: BIKES, options: ['Overall, bicycle sales rose steadily, while car sales fell.', 'Overall, 12,000 bicycles were sold in 2025.', 'Overall, bicycles are better for the environment.'], answer: 'Overall, bicycle sales rose steadily, while car sales fell.', explanation: l('Main trends, no details, no opinion.', 'মূল trend, খুঁটিনাটি নয়, মতামত নয়।') })),
      at(2, gap('wrfin-b3', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Write one word (a paraphrase of "shows").', 'একটা word লিখুন ("shows"-এর paraphrase)।'), sentence: 'The table ___ how many bicycles and cars were sold.', accepted: ['compares', 'illustrates', 'presents', 'gives'], explanation: l('compares / illustrates.', 'compares / illustrates।') })),
      at(3, spot('wrfin-b4', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l(`${BIKES} One word in this overview is wrong. Tap it and fix it.`, `${BIKES} এই overview-এর একটা word ভুল। Tap করে ঠিক করুন।`), sentence: 'Overall, car sales increased over the period.', wrong: 'increased', accepted: ['decreased', 'fell', 'declined'], fixOptions: ['decreased', 'doubled', 'peaked'], explanation: l('9,000 → 6,000: a fall.', '৯,০০০ → ৬,০০০: কমেছে।') })),
    ],
  },
  {
    id: 'C', title: l('Describing data', 'Data বর্ণনা'), intro: l('Trend verbs, prepositions, comparisons.', 'Trend verb, preposition, তুলনা।'),
    items: [
      at(1, choice('wrfin-c1', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('Choose the correct verb: "Car sales ___ between 2005 and 2025."', 'সঠিক verb বাছুন: "Car sales ___ between 2005 and 2025।"'), options: ['fell', 'were fallen', 'felled'], answer: 'fell', explanation: l('fall – fell.', 'fall – fell।') })),
      at(2, choice('wrfin-c2', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('"Bicycle sales rose ___ 8,000 between 2005 and 2025." Which preposition?', '"Bicycle sales rose ___ 8,000 between 2005 and 2025।" কোন preposition?'), options: ['by', 'to', 'at'], answer: 'by', explanation: l('4,000 → 12,000: a change of 8,000.', '৪,০০০ → ১২,০০০: ৮,০০০ পরিবর্তন।') })),
      at(2, gap('wrfin-c3', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'In 2025, twice as ___ bicycles as cars were sold.', accepted: ['many'], explanation: l('twice as many … as (12,000 vs 6,000).', 'twice as many … as (১২,০০০ বনাম ৬,০০০)।') })),
      at(3, correct('wrfin-c4', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('Correct the verb.', 'Verb-টা ঠিক করুন।'), sentence: 'Bicycle sales were raised from 4,000 to 12,000.', accepted: ['Bicycle sales rose from 4,000 to 12,000.', 'Bicycle sales increased from 4,000 to 12,000.', 'Bicycle sales grew from 4,000 to 12,000.'], explanation: l('rose / increased — no passive.', 'rose / increased — passive নয়।') })),
    ],
  },
  {
    id: 'D', title: l('Task 2 questions', 'Task 2-এর প্রশ্ন'), intro: l('Every part, one position.', 'প্রতিটা অংশ, একটা অবস্থান।'),
    items: [
      at(1, choice('wrfin-d1', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('"What are the advantages and disadvantages?" You should write about…', '"What are the advantages and disadvantages?" আপনি লিখবেন…'), options: ['both advantages and disadvantages', 'only advantages', 'only your favourite example'], answer: 'both advantages and disadvantages', explanation: l('Every part.', 'প্রতিটা অংশ।') })),
      at(2, choice('wrfin-d2', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('Question: "Should cities build more cycle lanes?" Which paragraph topic is off-topic?', 'প্রশ্ন: "Should cities build more cycle lanes?" কোন paragraph বিষয় প্রশ্নের বাইরে?'), options: ['The history of the bicycle', 'Cycle lanes make cycling safer', 'Cycle lanes take space from cars'], answer: 'The history of the bicycle', explanation: l('Related, but not the question.', 'সম্পর্কিত, কিন্তু প্রশ্ন নয়।') })),
      at(2, gap('wrfin-d3', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'To what ___ do you agree or disagree?', accepted: ['extent'], explanation: l('"To what extent…"', '"To what extent…"') })),
      at(3, correct('wrfin-d4', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'Keep your position hidden until the conclusion.', accepted: ['State your position clearly in the introduction.', 'State your position in the introduction and keep it to the conclusion.', 'State your position clearly in the introduction and keep it.'], explanation: l('Clear from the start.', 'শুরু থেকেই পরিষ্কার।') })),
    ],
  },
  {
    id: 'E', title: l('Paragraphs', 'Paragraph'), intro: l('One idea, explained, with an example.', 'একটা idea, ব্যাখ্যা, উদাহরণ।'),
    items: [
      at(1, choice('wrfin-e1', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('What does a topic sentence give?', 'Topic sentence কী দেয়?'), options: ['The main idea of the paragraph', 'An example', 'The conclusion'], answer: 'The main idea of the paragraph', explanation: l('One main idea.', 'একটা মূল idea।') })),
      at(2, choice('wrfin-e2', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('Topic sentence: "Cycle lanes make roads safer." Which sentence explains it?', 'Topic sentence: "Cycle lanes make roads safer।" কোন sentence এটা ব্যাখ্যা করে?'), options: ['This is because cyclists no longer share space with fast traffic.', 'Bicycles were invented long ago.', 'In conclusion, cities should act.'], answer: 'This is because cyclists no longer share space with fast traffic.', explanation: l('It says why.', 'এটা কেন তা বলে।') })),
      at(2, gap('wrfin-e3', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'For ___, many cities in Europe have separate cycle lanes.', accepted: ['example', 'instance'], explanation: l('For example / instance.', 'For example / instance।') })),
      at(3, spot('wrfin-e4', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('One word makes this rule wrong. Tap it and fix it.', 'একটা word এই নিয়মকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'The conclusion should introduce your strongest new argument.', wrong: 'introduce', accepted: ['avoid'], fixOptions: ['avoid', 'repeat', 'hide'], explanation: l('No new arguments in the conclusion.', 'Conclusion-এ নতুন যুক্তি নয়।') })),
    ],
  },
  {
    id: 'F', title: l('Cohesion and words', 'Cohesion আর word'), intro: l('Referencing, linkers, natural words.', 'Referencing, linker, স্বাভাবিক word।'),
    items: [
      at(1, choice('wrfin-f1', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('"Cycling is cheap. ___ makes it popular with students." Best choice?', '"Cycling is cheap. ___ makes it popular with students।" সবচেয়ে ভালো?'), options: ['This', 'Moreover', 'These'], answer: 'This', explanation: l('"This" = being cheap.', '"This" = সস্তা হওয়া।') })),
      at(2, choice('wrfin-f2', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Which is the natural collocation?', 'কোনটা স্বাভাবিক collocation?'), options: ['have a positive effect', 'make a positive effect', 'do a positive effect'], answer: 'have a positive effect', explanation: l('have an effect.', 'have an effect।') })),
      at(2, gap('wrfin-f3', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Write one linker for a contrast.', 'বৈপরীত্যের একটা linker লিখুন।'), sentence: 'Cycle lanes are safe. ___, they are expensive to build.', accepted: ['However', 'Nevertheless', 'Nonetheless', 'On the other hand'], explanation: l('A contrast.', 'বৈপরীত্য।') })),
      at(3, order('wrfin-f4', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Use linkers only where the logic changes.', explanation: l('Not in every sentence.', 'প্রতিটা sentence-এ নয়।') })),
    ],
  },
];

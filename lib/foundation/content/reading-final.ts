import type { FinalItem, FinalPart } from './pos-final';
import { choice, correct, gap, l, order, spot } from './pos-kit';

/**
 * Understanding IELTS Reading · Final Mastery Challenge. Six parts, 4 items
 * each at levels 1–3; 3 are served per part adaptively (18 questions). New
 * short passages and items, not copied from the lessons. Original Mino content.
 */
const at = <T extends FinalItem>(level: 1 | 2 | 3, e: Omit<T, 'level'>): T => ({ ...e, level }) as T;
const P = { tag: 'reading' as const };

const TEA = 'Tea has been grown in Sylhet since the 1850s. Today the region has more than 130 tea gardens, and most workers are women who pick the leaves by hand. Some garden owners are testing machines, but many workers worry that machines will replace their jobs.';

export const READING_FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('Skimming and scanning', 'Skimming আর scanning'), intro: l('Main ideas and details.', 'মূল idea আর তথ্য।'),
    items: [
      at(1, choice('rdfin-a1', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('What is the passage mainly about?', 'Passage মূলত কী নিয়ে?'), sentence: TEA, options: ['Tea growing in Sylhet and its workers', 'How to make tea', 'Machines in factories worldwide'], answer: 'Tea growing in Sylhet and its workers', explanation: l('The main idea covers the whole text.', 'মূল idea পুরো text জুড়ে।') })),
      at(2, choice('rdfin-a2', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Scan: since when has tea been grown in Sylhet?', 'Scan: Sylhet-এ কবে থেকে চা চাষ হয়?'), sentence: TEA, options: ['the 1850s', '130 years', 'today'], answer: 'the 1850s', explanation: l('"since the 1850s".', '"since the 1850s"।') })),
      at(2, gap('rdfin-a3', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Scan and write the number.', 'Scan করে সংখ্যাটা লিখুন।'), sentence: `${TEA} → The region has more than ___ tea gardens.`, accepted: ['130'], explanation: l('130.', '130।') })),
      at(3, correct('rdfin-a4', 'rd-skim', { ...P, pattern: 'rd-skim-scan', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'Spend as long as you need on the first passage.', accepted: ['Spend about 20 minutes on the first passage.', 'Spend about 20 minutes on each passage.'], explanation: l('About 20 minutes per passage.', 'প্রতি passage-এ প্রায় ২০ মিনিট।') })),
    ],
  },
  {
    id: 'B', title: l('Paraphrasing', 'Paraphrasing'), intro: l('Same meaning, different words.', 'একই অর্থ, আলাদা word।'),
    items: [
      at(1, choice('rdfin-b1', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('"pick the leaves by hand" means…', '"pick the leaves by hand" মানে…'), options: ['harvest the leaves manually', 'use machines to pick leaves', 'grow new leaves'], answer: 'harvest the leaves manually', explanation: l('by hand = manually.', 'by hand = manually।') })),
      at(2, choice('rdfin-b2', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('"many workers worry that machines will replace their jobs" matches…', '"many workers worry that machines will replace their jobs"-এর সাথে মেলে…'), sentence: TEA, options: ['Numerous pickers fear losing work to machines.', 'All workers want machines.', 'Workers like machines.'], answer: 'Numerous pickers fear losing work to machines.', explanation: l('many → numerous; worry → fear.', 'many → numerous; worry → fear।') })),
      at(2, gap('rdfin-b3', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('Write a one-word synonym of "test" (verb).', '"test" (verb)-এর এক-word synonym লিখুন।'), sentence: 'Owners are testing machines. → Owners are ___ machines.', accepted: ['trying', 'trialling', 'trialing', 'piloting', 'evaluating'], explanation: l('trying / trialling.', 'trying / trialling।') })),
      at(3, spot('rdfin-b4', 'rd-paraphrase', { ...P, pattern: 'rd-paraphrase-match', prompt: l('One word changes the meaning. Tap it and fix it.', 'একটা word অর্থ বদলে দেয়। Tap করে ঠিক করুন।'), sentence: 'Summary: A minority of the workers are women.', wrong: 'minority', accepted: ['majority'], fixOptions: ['majority', 'minor', 'few'], explanation: l('"most workers are women" = the majority.', '"most workers are women" = majority।') })),
    ],
  },
  {
    id: 'C', title: l('True / False / Not Given', 'True / False / Not Given'), intro: l('Says it, says the opposite, or does not say.', 'বলে, উল্টো বলে, বা বলে না।'),
    items: [
      at(1, choice('rdfin-c1', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('"Most tea workers in Sylhet are women."', '"Most tea workers in Sylhet are women।"'), sentence: TEA, options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: l('"most workers are women".', '"most workers are women"।') })),
      at(2, choice('rdfin-c2', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('"All tea gardens now use machines."', '"All tea gardens now use machines।"'), sentence: TEA, options: ['FALSE', 'TRUE', 'NOT GIVEN'], answer: 'FALSE', explanation: l('Only some owners are testing machines; leaves are picked by hand.', 'শুধু কিছু মালিক machine পরীক্ষা করছেন; পাতা হাতে তোলা হয়।') })),
      at(2, gap('rdfin-c3', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Write TRUE, FALSE or NOT GIVEN.', 'TRUE, FALSE বা NOT GIVEN লিখুন।'), sentence: `${TEA} → "Sylhet tea is exported to Europe." ___`, accepted: ['NOT GIVEN'], explanation: l('Exports are not mentioned.', 'রপ্তানির উল্লেখ নেই।') })),
      at(3, correct('rdfin-c4', 'rd-tfng', { ...P, pattern: 'rd-tfng-logic', prompt: l('Correct the rule.', 'নিয়মটা ঠিক করুন।'), sentence: 'TRUE means part of the statement is supported.', accepted: ['TRUE means every part of the statement is supported.', 'TRUE means the whole statement is supported.', 'TRUE means the passage says the same thing.'], explanation: l('Every part must be supported.', 'প্রতিটা অংশ সমর্থিত হতে হবে।') })),
    ],
  },
  {
    id: 'D', title: l('Matching Headings', 'Matching Headings'), intro: l('Whole paragraph, not examples.', 'পুরো paragraph, উদাহরণ না।'),
    items: [
      at(1, choice('rdfin-d1', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Best heading for the tea passage?', 'চা-র passage-এর সবচেয়ে ভালো heading?'), sentence: TEA, options: ['Sylhet’s tea gardens and a changing future', 'The year 1850', 'Women in history'], answer: 'Sylhet’s tea gardens and a changing future', explanation: l('It covers history, workers and machines.', 'এটা ইতিহাস, কর্মী আর machine ধরে।') })),
      at(2, choice('rdfin-d2', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Why is "The year 1850" a poor heading?', '"The year 1850" কেন দুর্বল heading?'), options: ['It is a single detail, not the main idea', 'It is too long', 'It is not in English'], answer: 'It is a single detail, not the main idea', explanation: l('Dates are details.', 'তারিখ খুঁটিনাটি।') })),
      at(2, gap('rdfin-d3', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'There are always more headings than ___.', accepted: ['paragraphs'], explanation: l('paragraphs.', 'paragraphs।') })),
      at(3, order('rdfin-d4', 'rd-headings', { ...P, pattern: 'rd-main-idea', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Ignore examples and match the main idea.', explanation: l('Main idea, not examples.', 'মূল idea, উদাহরণ না।') })),
    ],
  },
  {
    id: 'E', title: l('Multiple choice and matching', 'Multiple choice আর matching'), intro: l('Eliminate carefully.', 'সাবধানে বাদ দিন।'),
    items: [
      at(1, choice('rdfin-e1', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('What do many workers worry about?', 'অনেক কর্মী কী নিয়ে চিন্তিত?'), sentence: TEA, options: ['Losing their jobs to machines', 'Low tea prices', 'Bad weather'], answer: 'Losing their jobs to machines', explanation: l('"machines will replace their jobs".', '"machines will replace their jobs"।') })),
      at(2, choice('rdfin-e2', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('"Garden owners have replaced workers with machines." Why is this option wrong?', '"Garden owners have replaced workers with machines।" এই option কেন ভুল?'), sentence: TEA, options: ['Owners are only testing machines', 'Machines are not mentioned', 'It is completely true'], answer: 'Owners are only testing machines', explanation: l('Testing ≠ replaced.', 'Testing ≠ replaced।') })),
      at(2, gap('rdfin-e3', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('Write the number of marks.', 'নম্বরের সংখ্যা লিখুন।'), sentence: '"Choose TWO letters": both of your letters are correct, in a different order from the key. Marks: ___', accepted: ['2', 'two'], explanation: l('Any order: 2 marks.', 'যেকোনো ক্রম: ২ নম্বর।') })),
      at(3, spot('rdfin-e4', 'rd-choice', { ...P, pattern: 'rd-option-elimination', prompt: l('One word makes this summary partly false. Tap it and fix it.', 'একটা word এই সারাংশকে আংশিক ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Summary: All garden owners are testing machines.', wrong: 'All', accepted: ['Some'], fixOptions: ['Some', 'Every', 'No'], explanation: l('"Some garden owners".', '"Some garden owners"।') })),
    ],
  },
  {
    id: 'F', title: l('Completion and timing', 'Completion আর সময়'), intro: l('Word limits, exact words, 20 minutes.', 'Word-এর সীমা, হুবহু word, ২০ মিনিট।'),
    items: [
      at(1, choice('rdfin-f1', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('ONE WORD ONLY: "Workers pick the leaves by ______."', 'ONE WORD ONLY: "Workers pick the leaves by ______।"'), sentence: TEA, options: ['hand', 'their hands', 'the hand'], answer: 'hand', explanation: l('One word from the passage.', 'Passage থেকে একটা word।') })),
      at(2, choice('rdfin-f2', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('Is there extra time to transfer Reading answers?', 'Reading-এর উত্তর তোলার আলাদা সময় আছে?'), options: ['No', 'Yes, 10 minutes', 'Yes, 2 minutes'], answer: 'No', explanation: l('Write answers within 60 minutes.', '৬০ মিনিটের মধ্যেই উত্তর লিখুন।') })),
      at(2, gap('rdfin-f3', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('Write ONE WORD from the passage.', 'Passage থেকে একটা word লিখুন।'), sentence: `${TEA} → Some owners are testing ___.`, accepted: ['machines'], explanation: l('machines (plural, as in the passage).', 'machines (plural, passage-এর মতো)।') })),
      at(3, correct('rdfin-f4', 'rd-completion', { ...P, pattern: 'rd-word-limit', prompt: l('Shorten to NO MORE THAN TWO WORDS.', 'NO MORE THAN TWO WORDS-এ ছোট করুন।'), sentence: 'the tea gardens', accepted: ['tea gardens'], explanation: l('Drop "the".', '"the" বাদ দিন।') })),
    ],
  },
];

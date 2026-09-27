import type { FinalItem, FinalPart } from './pos-final';
import { choice, correct, gap, l, order, spot } from './pos-kit';

/**
 * Punctuation & Capitalisation · Final Mastery Challenge. Six parts, 4 items
 * each at levels 1–3; 3 are served per part adaptively (18 questions). Every
 * item carries the concept it tests. Items marked `strict` are graded with
 * capitals and final punctuation. New items, not copied from the lessons.
 * Original Mino content.
 */
const at = <T extends FinalItem>(level: 1 | 2 | 3, e: Omit<T, 'level'>): T => ({ ...e, level }) as T;
const P = { tag: 'punctuation' as const };
const S = { ...P, strict: true };

export const PUNCTUATION_FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('Capital letters', 'Capital letter'), intro: l('Names, days, months, languages, I.', 'নাম, দিন, মাস, ভাষা, I।'),
    items: [
      at(1, choice('pnfin-a1', 'pn-capital', { ...P, pattern: 'pn-capitals', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['We moved to Sylhet in September.', 'We moved to sylhet in september.', 'We Moved to Sylhet in September.'], answer: 'We moved to Sylhet in September.', explanation: l('City and month → capitals.', 'শহর আর মাস → capital।') })),
      at(2, choice('pnfin-a2', 'pn-capital', { ...P, pattern: 'pn-capitals', prompt: l('Which word should be small?', 'কোন word ছোট হাতের হওয়া উচিত?'), options: ['Biology', 'Korean', 'Wednesday'], answer: 'Biology', explanation: l('School subjects (except languages) are small.', 'বিষয় (ভাষা ছাড়া) ছোট।') })),
      at(2, gap('pnfin-a3', 'pn-capital', { ...S, pattern: 'pn-capitals', prompt: l('Write the nationality with the correct capital letter.', 'সঠিক capital letter দিয়ে জাতীয়তা লিখুন।'), sentence: 'Many ___ (bangladeshi) students study in Malaysia.', base: 'bangladeshi', accepted: ['Bangladeshi'], explanation: l('Nationalities → capital.', 'জাতীয়তা → capital।') })),
      at(3, correct('pnfin-a4', 'pn-capital', { ...S, pattern: 'pn-capitals', prompt: l('Fix the capitals (keep the full stop).', 'Capital ঠিক করুন (full stop রাখুন)।'), sentence: 'in Winter i often visit my aunt in rangpur.', accepted: ['In winter I often visit my aunt in Rangpur.', 'In winter, I often visit my aunt in Rangpur.'], explanation: l('In · winter (small) · I · Rangpur.', 'In · winter (ছোট) · I · Rangpur।') })),
    ],
  },
  {
    id: 'B', title: l('Ending sentences', 'Sentence শেষ করা'), intro: l('Full stops and question marks.', 'Full stop আর question mark।'),
    items: [
      at(1, choice('pnfin-b1', 'pn-end', { ...P, pattern: 'pn-end-mark', prompt: l('Which is correct?', 'কোনটা ঠিক?'), options: ['What time does the bus leave?', 'What time does the bus leave.', 'What time does the bus leave'], answer: 'What time does the bus leave?', explanation: l('Direct question → ?', 'সরাসরি প্রশ্ন → ?') })),
      at(2, choice('pnfin-b2', 'pn-end', { ...P, pattern: 'pn-end-mark', prompt: l('Which is correct?', 'কোনটা ঠিক?'), options: ['I wonder if the shop is open.', 'I wonder if the shop is open?', 'I wonder is the shop open?'], answer: 'I wonder if the shop is open.', explanation: l('Statement → full stop.', 'Statement → full stop।') })),
      at(2, correct('pnfin-b3', 'pn-end', { ...S, pattern: 'pn-run-on', prompt: l('Split into two sentences.', 'দুটো sentence-এ ভাগ করুন।'), sentence: 'The museum was closed we went to the park.', accepted: ['The museum was closed. We went to the park.'], explanation: l('Full stop + capital.', 'Full stop + capital।') })),
      at(3, spot('pnfin-b4', 'pn-end', { ...S, pattern: 'pn-end-mark', prompt: l('One word has the wrong end mark. Tap it and fix it.', 'একটা word-এ ভুল শেষ চিহ্ন। Tap করে ঠিক করুন।'), sentence: 'I asked the officer how long the visa would take?', wrong: 'take', accepted: ['take.'], fixOptions: ['take.', 'take?', 'take,'], explanation: l('Reported question → full stop.', 'Reported question → full stop।') })),
    ],
  },
  {
    id: 'C', title: l('Commas that help', 'কাজের comma'), intro: l('Lists, openings, , but / , so.', 'তালিকা, শুরু, , but / , so।'),
    items: [
      at(1, choice('pnfin-c1', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Which list is correct?', 'কোন তালিকা ঠিক?'), options: ['I need a pen, a ruler and a calculator.', 'I need a pen a ruler and a calculator.', 'I need, a pen, a ruler, and, a calculator.'], answer: 'I need a pen, a ruler and a calculator.', explanation: l('Commas between list items.', 'তালিকার item-এর মাঝে comma।') })),
      at(2, choice('pnfin-c2', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Which is correct?', 'কোনটা ঠিক?'), options: ['The hotel was full, so we stayed with friends.', 'The hotel was full so, we stayed with friends.', 'The hotel was full, so, we stayed with friends.'], answer: 'The hotel was full, so we stayed with friends.', explanation: l('Comma before so.', 'so-এর আগে comma।') })),
      at(2, gap('pnfin-c3', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Write the number with a comma for thousands.', 'হাজারের comma-সহ সংখ্যাটা লিখুন।'), sentence: 'The stadium holds ___ (45000) people.', base: '45000', accepted: ['45,000'], explanation: l('Thousands → comma.', 'হাজার → comma।') })),
      at(3, correct('pnfin-c4', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Add the two missing commas.', 'বাদ পড়া দুটো comma দিন।'), sentence: 'Between 2010 and 2020 exports rose but imports fell.', accepted: ['Between 2010 and 2020, exports rose, but imports fell.'], explanation: l('After the opening phrase; before but.', 'শুরুর phrase-এর পরে; but-এর আগে।') })),
    ],
  },
  {
    id: 'D', title: l('Commas that break', 'ভুল comma'), intro: l('Splices, and commas before verbs or that.', 'Splice, আর verb বা that-এর আগে comma।'),
    items: [
      at(1, choice('pnfin-d1', 'pn-comma-error', { ...P, pattern: 'pn-run-on', prompt: l('Which has NO comma splice?', 'কোনটায় comma splice নেই?'), options: ['It was cold, but we swam.', 'It was cold, we swam.', 'It was cold, we, swam.'], answer: 'It was cold, but we swam.', explanation: l(', but joins two clauses.', ', but দুটো clause জোড়ে।') })),
      at(2, choice('pnfin-d2', 'pn-comma-error', { ...P, pattern: 'pn-comma-use', prompt: l('Which is correct?', 'কোনটা ঠিক?'), options: ['Most people think that exams are stressful.', 'Most people think, that exams are stressful.', 'Most people, think that exams are stressful.'], answer: 'Most people think that exams are stressful.', explanation: l('No comma before that or before the verb.', 'that বা verb-এর আগে comma না।') })),
      at(2, correct('pnfin-d3', 'pn-comma-error', { ...P, pattern: 'pn-comma-use', prompt: l('Remove the wrong comma.', 'ভুল comma মুছুন।'), sentence: 'The cost of living in Dhaka, is rising.', accepted: ['The cost of living in Dhaka is rising.'], explanation: l('No comma between subject and verb.', 'Subject আর verb-এর মাঝে comma না।') })),
      at(3, correct('pnfin-d4', 'pn-comma-error', { ...P, pattern: 'pn-run-on', prompt: l('Fix the comma splice.', 'Comma splice ঠিক করুন।'), sentence: 'The graph shows two trends, the first is a steady rise.', accepted: ['The graph shows two trends. The first is a steady rise.', 'The graph shows two trends; the first is a steady rise.', 'The graph shows two trends: the first is a steady rise.'], explanation: l('. / ; / : between two sentences.', 'দুটো sentence-এর মাঝে . / ; / :।') })),
    ],
  },
  {
    id: 'E', title: l('Apostrophes', 'Apostrophe'), intro: l('Owners, contractions, and no apostrophe in plurals.', 'মালিক, contraction, আর plural-এ apostrophe না।'),
    items: [
      at(1, choice('pnfin-e1', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'My ___ bike was stolen.', options: ['friend’s', 'friends', 'friends’s'], answer: 'friend’s', explanation: l('One friend owns it → friend’s.', 'একজন friend-এর → friend’s।') })),
      at(2, choice('pnfin-e2', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Which is correct?', 'কোনটা ঠিক?'), options: ['The two teams’ coaches shook hands.', 'The two team’s coaches shook hands.', 'The two teams coaches’ shook hands.'], answer: 'The two teams’ coaches shook hands.', explanation: l('Plural owners → teams’.', 'Plural মালিক → teams’।') })),
      at(2, gap('pnfin-e3', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Write its or it’s.', 'its বা it’s লিখুন।'), sentence: 'The dog wagged ___ tail.', accepted: ['its'], explanation: l('Possessive its.', 'Possessive its।') })),
      at(3, correct('pnfin-e4', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Fix the two apostrophe mistakes.', 'Apostrophe-এর দুটো ভুল ঠিক করুন।'), sentence: 'In the 1980’s, my uncles shop sold radios.', accepted: ['In the 1980s, my uncle’s shop sold radios.', "In the 1980s, my uncle's shop sold radios."], explanation: l('1980s (no apostrophe) · uncle’s (owner).', '1980s (apostrophe না) · uncle’s (মালিক)।') })),
    ],
  },
  {
    id: 'F', title: l('Colons, semicolons and IELTS', 'Colon, semicolon আর IELTS'), intro: l('Proofread real IELTS sentences.', 'আসল IELTS sentence proofread করুন।'),
    items: [
      at(1, choice('pnfin-f1', 'pn-colon', { ...P, pattern: 'pn-colon-semi', prompt: l('Which is correct?', 'কোনটা ঠিক?'), options: ['The kit has three parts: a tent, a mat and a lamp.', 'The kit has: a tent, a mat and a lamp.', 'The kit has three parts; a tent, a mat and a lamp.'], answer: 'The kit has three parts: a tent, a mat and a lamp.', explanation: l('Complete sentence + colon + list.', 'পূর্ণ sentence + colon + তালিকা।') })),
      at(2, gap('pnfin-f2', 'pn-colon', { ...P, pattern: 'pn-colon-semi', prompt: l('Write : or ;', ': বা ; লিখুন।'), sentence: 'The east is flat ___ the west is hilly.', accepted: [';'], explanation: l('Two related sentences → semicolon.', 'সম্পর্কিত দুটো sentence → semicolon।') })),
      at(2, order('pnfin-f3', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'In conclusion, the benefits outweigh the costs.', explanation: l('Opening phrase + comma.', 'শুরুর phrase + comma।') })),
      at(3, correct('pnfin-f4', 'pn-capital', { ...S, pattern: 'pn-capitals', prompt: l('Proofread the Task 1 sentence (capitals, comma, full stop).', 'Task 1 sentence proofread করুন (capital, comma, full stop)।'), sentence: 'in 2015 visitors from china outnumbered those from india', accepted: ['In 2015, visitors from China outnumbered those from India.', 'In 2015 visitors from China outnumbered those from India.'], explanation: l('In · China · India · full stop (comma after 2015 recommended).', 'In · China · India · full stop (2015-এর পরে comma ভালো)।') })),
    ],
  },
];

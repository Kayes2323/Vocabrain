import type { FinalItem, FinalPart } from './pos-final';
import { choice, correct, gap, l, order, spot } from './pos-kit';

/**
 * What is IELTS? · Final Mastery Challenge. Six parts, 4 items each at levels
 * 1–3; 3 are served per part adaptively (18 questions). Facts match
 * lib/ai/server/mino/knowledge/ielts.ts. New items, not copied from the lessons.
 * Original Mino content.
 */
const at = <T extends FinalItem>(level: 1 | 2 | 3, e: Omit<T, 'level'>): T => ({ ...e, level }) as T;
const P = { tag: 'ielts-basics' as const };

export const IELTS_INTRO_FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('Academic or General Training', 'Academic না General Training'), intro: l('Which version, and who decides.', 'কোন version, আর কে ঠিক করে।'),
    items: [
      at(1, choice('ibfin-a1', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('Which part is the same in both versions?', 'দুই version-এ কোন অংশ একই?'), options: ['Listening', 'Reading', 'Writing'], answer: 'Listening', explanation: l('Listening and Speaking are shared.', 'Listening আর Speaking একই।') })),
      at(2, choice('ibfin-a2', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('What does Academic Writing Task 1 ask you to do?', 'Academic Writing Task 1-এ কী করতে হয়?'), options: ['Describe visual information such as a graph', 'Write a letter', 'Write an opinion essay'], answer: 'Describe visual information such as a graph', explanation: l('Graph, table, chart or diagram.', 'Graph, table, chart বা diagram।') })),
      at(2, gap('ibfin-a3', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('Write the version (two words).', 'Version লিখুন (দুটো word)।'), sentence: 'Writing Task 1 is a letter in IELTS ___.', accepted: ['General Training'], explanation: l('General Training.', 'General Training।') })),
      at(3, correct('ibfin-a4', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'Your friends decide which IELTS version you need.', accepted: ['Your university decides which IELTS version you need.', 'Your organisation decides which IELTS version you need.', 'Your organization decides which IELTS version you need.', 'Your employer decides which IELTS version you need.', 'Your requirement decides which IELTS version you need.'], explanation: l('The organisation’s official requirement decides.', 'প্রতিষ্ঠানের official requirement ঠিক করে।') })),
    ],
  },
  {
    id: 'B', title: l('Skills and timing', 'Skill আর সময়'), intro: l('Parts, questions and minutes.', 'Part, প্রশ্ন আর মিনিট।'),
    items: [
      at(1, choice('ibfin-b1', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('How long is IELTS Writing?', 'IELTS Writing কত সময়ের?'), options: ['60 minutes', '30 minutes', '90 minutes'], answer: '60 minutes', explanation: l('60 minutes for both tasks.', 'দুই task মিলিয়ে ৬০ মিনিট।') })),
      at(2, choice('ibfin-b2', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('In Speaking Part 2, how long do you prepare?', 'Speaking Part 2-এ কতক্ষণ প্রস্তুতি?'), options: ['1 minute', '5 minutes', 'No preparation'], answer: '1 minute', explanation: l('1 minute, then 1–2 minutes speaking.', '১ মিনিট, তারপর ১–২ মিনিট বলা।') })),
      at(2, gap('ibfin-b3', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('Write the number of sections.', 'Section-এর সংখ্যা লিখুন।'), sentence: 'IELTS Reading has ___ sections.', accepted: ['3', 'three'], explanation: l('3 sections.', '৩টা section।') })),
      at(3, spot('ibfin-b4', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('One number is wrong. Tap it and fix it.', 'একটা সংখ্যা ভুল। Tap করে ঠিক করুন।'), sentence: 'Writing Task 1 needs at least 250 words.', wrong: '250', accepted: ['150'], fixOptions: ['150', '100', '200'], explanation: l('Task 1: 150; Task 2: 250.', 'Task 1: ১৫০; Task 2: ২৫০।') })),
    ],
  },
  {
    id: 'C', title: l('Computer or paper', 'Computer না paper'), intro: l('Same test, different answering.', 'একই test, উত্তর দেওয়ার ধরন আলাদা।'),
    items: [
      at(1, choice('ibfin-c1', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('Is the computer test easier?', 'Computer test কি সহজ?'), options: ['No — same content and scoring', 'Yes — shorter questions', 'Yes — no Writing'], answer: 'No — same content and scoring', explanation: l('Neither is easier.', 'কোনোটাই সহজ না।') })),
      at(2, choice('ibfin-c2', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('What does the computer test show while you write?', 'Computer test-এ লেখার সময় কী দেখা যায়?'), options: ['Your word count', 'Your band score', 'Model answers'], answer: 'Your word count', explanation: l('The word count is on screen.', 'Screen-এ word count।') })),
      at(2, gap('ibfin-c3', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('Write the number of minutes.', 'মিনিটের সংখ্যা লিখুন।'), sentence: 'In paper-based Listening you get ___ minutes to transfer answers.', accepted: ['10', 'ten'], explanation: l('10 minutes.', '১০ মিনিট।') })),
      at(3, correct('ibfin-c4', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('Correct the false statement.', 'ভুল বাক্যটা ঠিক করুন।'), sentence: 'Computer and paper IELTS use different band scores.', accepted: ['Computer and paper IELTS use the same band scores.', 'Computer and paper IELTS use identical band scores.'], explanation: l('The same scoring.', 'একই scoring।') })),
    ],
  },
  {
    id: 'D', title: l('Band Scores', 'Band Score'), intro: l('The scale, the average and rounding.', 'মাপকাঠি, গড় আর rounding।'),
    items: [
      at(1, choice('ibfin-d1', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Which is a possible IELTS band?', 'কোনটা সম্ভাব্য IELTS band?'), options: ['6.5', '6.3', '65'], answer: '6.5', explanation: l('Bands are whole or half.', 'Band পূর্ণ বা half।') })),
      at(2, choice('ibfin-d2', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('L 8.0 · R 7.5 · W 6.5 · S 7.0 → overall?', 'L 8.0 · R 7.5 · W 6.5 · S 7.0 → overall?'), options: ['7.5', '7.0', '7.25'], answer: '7.5', explanation: l('29 ÷ 4 = 7.25 → 7.5.', '29 ÷ 4 = 7.25 → 7.5।') })),
      at(2, gap('ibfin-d3', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Write the overall band.', 'Overall band লিখুন।'), sentence: 'L 5.5 · R 6.0 · W 5.5 · S 6.0 → overall ___', accepted: ['6', '6.0'], explanation: l('23 ÷ 4 = 5.75 → 6.0.', '23 ÷ 4 = 5.75 → 6.0।') })),
      at(3, correct('ibfin-d4', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Correct the calculation (change one number).', 'হিসাবটা ঠিক করুন (একটা সংখ্যা বদলান)।'), sentence: 'L 6.5, R 6.0, W 6.0 and S 6.0 give an overall of 6.5.', accepted: ['L 6.5, R 6.0, W 6.0 and S 6.0 give an overall of 6.0.', 'L 6.5, R 6.0, W 6.0 and S 6.0 give an overall of 6.'], explanation: l('24.5 ÷ 4 = 6.125 → 6.0.', '24.5 ÷ 4 = 6.125 → 6.0।') })),
    ],
  },
  {
    id: 'E', title: l('How each skill is marked', 'প্রতিটা skill কীভাবে নম্বর পায়'), intro: l('Raw scores and criteria.', 'Raw score আর criteria।'),
    items: [
      at(1, choice('ibfin-e1', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('Which is a Speaking criterion?', 'কোনটা Speaking-এর criteria?'), options: ['Fluency & Coherence', 'Task Response', 'Word count'], answer: 'Fluency & Coherence', explanation: l('One of four Speaking criteria.', 'Speaking-এর চারটা criteria-র একটা।') })),
      at(2, choice('ibfin-e2', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('What does Lexical Resource reward?', 'Lexical Resource কীসে নম্বর দেয়?'), options: ['Precise, natural words used correctly', 'The rarest words possible', 'Long essays'], answer: 'Precise, natural words used correctly', explanation: l('Accuracy and precision.', 'Accuracy আর precision।') })),
      at(2, gap('ibfin-e3', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('Write the number of criteria.', 'Criteria-র সংখ্যা লিখুন।'), sentence: 'Writing is marked on ___ equally weighted criteria.', accepted: ['4', 'four'], explanation: l('Four.', 'চারটা।') })),
      at(3, spot('ibfin-e4', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('One word makes this false. Tap it and fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'In Reading, answers with extra words are accepted.', wrong: 'accepted', accepted: ['wrong', 'rejected'], fixOptions: ['wrong', 'accept', 'right'], explanation: l('Word limits count.', 'Word-এর সীমা গোনা হয়।') })),
    ],
  },
  {
    id: 'F', title: l('Requirements and planning', 'Requirement আর plan'), intro: l('Read the requirement, plan the gap.', 'Requirement পড়ুন, ফাঁকের plan করুন।'),
    items: [
      at(1, choice('ibfin-f1', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Where do you check the current test fee?', 'বর্তমান test fee কোথায় দেখবেন?'), options: ['The official IELTS or test centre website', 'A friend’s old message', 'A practice book'], answer: 'The official IELTS or test centre website', explanation: l('Fees change.', 'Fee বদলায়।') })),
      at(2, choice('ibfin-f2', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Requirement: 6.0 overall, Writing 6.0. Result: L 6.5, R 6.5, W 5.5, S 6.0 (overall 6.0). Met?', 'Requirement: 6.0 overall, Writing 6.0। Result: L 6.5, R 6.5, W 5.5, S 6.0 (overall 6.0)। পূরণ হয়েছে?'), options: ['No — Writing is 5.5', 'Yes — the overall is 6.0', 'Yes — only the overall counts'], answer: 'No — Writing is 5.5', explanation: l('The Writing minimum is not met.', 'Writing-এর সর্বনিম্ন পূরণ হয়নি।') })),
      at(2, order('ibfin-f3', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Focus most practice on your weakest skill.', explanation: l('Close the biggest gap.', 'সবচেয়ে বড় ফাঁক পূরণ করুন।') })),
      at(3, correct('ibfin-f4', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Correct the false statement.', 'ভুল বাক্যটা ঠিক করুন।'), sentence: 'A practice estimate from Mino is an official band.', accepted: ['A practice estimate from Mino is not an official band.', 'A practice estimate from Mino is an unofficial band.'], explanation: l('Estimates are not official.', 'অনুমান official না।') })),
    ],
  },
];

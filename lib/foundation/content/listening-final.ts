import type { FinalItem, FinalPart } from './pos-final';
import { choice, correct, gap, l, order, spot } from './pos-kit';

/**
 * Understanding IELTS Listening · Final Mastery Challenge. Six parts, 4 items
 * each at levels 1–3; 3 are served per part adaptively (18 questions).
 * Transcript-based; new items, not copied from the lessons. Original Mino content.
 */
const at = <T extends FinalItem>(level: 1 | 2 | 3, e: Omit<T, 'level'>): T => ({ ...e, level }) as T;
const P = { tag: 'listening' as const };

export const LISTENING_FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('How Listening works', 'Listening কীভাবে চলে'), intro: l('Parts, questions, heard once.', 'Part, প্রশ্ন, একবার শোনা।'),
    items: [
      at(1, choice('lsfin-a1', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Which part is an everyday monologue?', 'কোন part দৈনন্দিন একক বক্তৃতা?'), options: ['Part 2', 'Part 3', 'Part 4'], answer: 'Part 2', explanation: l('Part 2: one speaker, everyday.', 'Part 2: একজন speaker, দৈনন্দিন।') })),
      at(2, choice('lsfin-a2', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Within a question group, answers come…', 'একটা প্রশ্ন-দলে উত্তর আসে…'), options: ['in the order of the recording', 'in alphabetical order', 'in any order'], answer: 'in the order of the recording', explanation: l('Follow the order.', 'ক্রম অনুসরণ করুন।') })),
      at(2, gap('lsfin-a3', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'Parts 3 and 4 are ___ rather than everyday.', accepted: ['academic'], explanation: l('academic.', 'academic।') })),
      at(3, correct('lsfin-a4', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'Pause the recording when you miss an answer.', accepted: ['Move on when you miss an answer.', 'Move on to the next question when you miss an answer.', 'Keep going when you miss an answer.'], explanation: l('Heard once — move on.', 'একবার শোনা — এগিয়ে যান।') })),
    ],
  },
  {
    id: 'B', title: l('Part 1 details', 'Part 1-এর খুঁটিনাটি'), intro: l('Names, numbers, corrections.', 'নাম, সংখ্যা, শোধরানো।'),
    items: [
      at(1, choice('lsfin-b1', 'ls-part1', { ...P, pattern: 'ls-spelling-number', prompt: l('"double 8" means…', '"double 8" মানে…'), options: ['88', '16', '8'], answer: '88', explanation: l('The digit twice.', 'অঙ্কটা দুবার।') })),
      at(2, choice('lsfin-b2', 'ls-part1', { ...P, pattern: 'ls-distractor', prompt: l('"It’s £40 — actually, £14 for students." Student price?', '"It’s £40 — actually, £14 for students।" Student-দের দাম?'), options: ['£14', '£40', '£54'], answer: '£14', explanation: l('"actually" corrects it.', '"actually" শুধরে দেয়।') })),
      at(2, gap('lsfin-b3', 'ls-part1', { ...P, pattern: 'ls-spelling-number', prompt: l('Write the name exactly.', 'নামটা হুবহু লিখুন।'), sentence: 'You hear: "It’s Nahar — N-A-H-A-R." Surname: ___', accepted: ['Nahar'], explanation: l('Nahar.', 'Nahar।') })),
      at(3, spot('lsfin-b4', 'ls-part1', { ...P, pattern: 'ls-spelling-number', prompt: l('The speaker spelled "K-A-B-I-R". One answer is wrong. Tap it and fix it.', 'Speaker বানান করলেন "K-A-B-I-R"। একটা উত্তর ভুল। Tap করে ঠিক করুন।'), sentence: 'Surname: Kabeer', wrong: 'Kabeer', accepted: ['Kabir'], fixOptions: ['Kabir', 'Kobir', 'Kabbir'], explanation: l('Write what is spelled.', 'যা বানান করা হয় তা লিখুন।') })),
    ],
  },
  {
    id: 'C', title: l('Part 2 maps', 'Part 2-এর map'), intro: l('Position and route language.', 'অবস্থান আর পথের ভাষা।'),
    items: [
      at(1, choice('lsfin-c1', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('"next to" means…', '"next to" মানে…'), options: ['beside', 'facing', 'far from'], answer: 'beside', explanation: l('next to = beside.', 'next to = beside।') })),
      at(2, choice('lsfin-c2', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('"Walk past the pond; the garden is straight ahead." Which comes first?', '"Walk past the pond; the garden is straight ahead।" কোনটা আগে?'), options: ['The pond', 'The garden', 'Both at once'], answer: 'The pond', explanation: l('go past = pass it first.', 'go past = আগে পার হওয়া।') })),
      at(2, gap('lsfin-c3', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'The toilets are at the ___ of the corridor, so walk all the way down.', accepted: ['end'], explanation: l('at the end of.', 'at the end of।') })),
      at(3, correct('lsfin-c4', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('Correct the direction to match "facing it across the road".', '"রাস্তার ওপারে সামনাসামনি"-র সাথে মিলিয়ে দিকটা ঠিক করুন।'), sentence: 'The pharmacy is next to the hospital.', accepted: ['The pharmacy is opposite the hospital.'], explanation: l('facing across = opposite.', 'সামনাসামনি = opposite।') })),
    ],
  },
  {
    id: 'D', title: l('Part 3 opinions', 'Part 3-এর মতামত'), intro: l('Agreement and final decisions.', 'একমত আর শেষ সিদ্ধান্ত।'),
    items: [
      at(1, choice('lsfin-d1', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('"Fair enough." shows…', '"Fair enough." বোঝায়…'), options: ['agreement', 'disagreement', 'a question'], answer: 'agreement', explanation: l('Accepting the idea.', 'Idea মেনে নেওয়া।') })),
      at(2, choice('lsfin-d2', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Heard: "It cost next to nothing." Which option matches?', 'শোনা: "It cost next to nothing।" কোন option মেলে?'), options: ['It was very cheap.', 'It was free of problems.', 'It was expensive.'], answer: 'It was very cheap.', explanation: l('next to nothing = almost nothing.', 'next to nothing = প্রায় কিছুই না।') })),
      at(2, gap('lsfin-d3', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Write the final choice (one word).', 'শেষ পছন্দ লিখুন (একটা word)।'), sentence: 'A: "A blog?" B: "Nobody reads blogs." A: "A podcast, then?" B: "Perfect." Choice: a ___', accepted: ['podcast'], explanation: l('The blog is rejected.', 'Blog বাতিল।') })),
      at(3, correct('lsfin-d4', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Fix the summary using the tutor’s advice.', 'Tutor-এর পরামর্শ দিয়ে summary-টা ঠিক করুন।'), sentence: 'Tutor: "The data is fine, but I’d add more photos." Summary: The tutor wants more data.', accepted: ['The tutor wants more photos.'], explanation: l('"I’d add more photos" is the advice.', '"I’d add more photos" হলো পরামর্শ।') })),
    ],
  },
  {
    id: 'E', title: l('Part 4 lectures', 'Part 4-এর lecture'), intro: l('Signposts and word types.', 'দিকনির্দেশক আর word-এর ধরন।'),
    items: [
      at(1, choice('lsfin-e1', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('Which signpost ends a lecture?', 'কোন দিকনির্দেশক lecture শেষ করে?'), options: ['To sum up', 'For example', 'Turning to'], answer: 'To sum up', explanation: l('The conclusion.', 'উপসংহার।') })),
      at(2, choice('lsfin-e2', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('Notes: "a ______ decline". What type of word?', 'Note: "a ______ decline"। কী ধরনের word?'), options: ['An adjective', 'A plural noun', 'A verb'], answer: 'An adjective', explanation: l('a + adjective + noun.', 'a + adjective + noun।') })),
      at(2, gap('lsfin-e3', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('Write ONE WORD.', 'একটা word লিখুন।'), sentence: 'You hear: "Several islands, Bhola for example, lost land." Notes: Several ___ lost land.', accepted: ['islands'], explanation: l('The main point, plural.', 'মূল point, plural।') })),
      at(3, spot('lsfin-e4', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('One word in the notes is the wrong form. Tap it and fix it.', 'Note-এর একটা word-এর form ভুল। Tap করে ঠিক করুন।'), sentence: 'Notes: The results were surprise to the team.', wrong: 'surprise', accepted: ['surprising'], fixOptions: ['surprising', 'surprised', 'surprises'], explanation: l('were + adjective: surprising.', 'were + adjective: surprising।') })),
    ],
  },
  {
    id: 'F', title: l('Answer rules', 'উত্তরের নিয়ম'), intro: l('Limits, plurals and spelling.', 'সীমা, plural আর বানান।'),
    items: [
      at(1, choice('lsfin-f1', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('Does "the" count as a word?', '"the" কি word হিসেবে গোনা হয়?'), options: ['Yes', 'No', 'Only in Part 4'], answer: 'Yes', explanation: l('Every word counts.', 'প্রতিটা word গোনা হয়।') })),
      at(2, choice('lsfin-f2', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('"NO MORE THAN TWO WORDS." Which is allowed?', '"NO MORE THAN TWO WORDS।" কোনটা চলে?'), options: ['well-known author', 'a well-known author', 'very well-known author'], answer: 'well-known author', explanation: l('well-known = one word; 2 words.', 'well-known = একটা word; ২টা word।') })),
      at(2, gap('lsfin-f3', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('Spell the word correctly.', 'সঠিক বানানে লিখুন।'), sentence: 'The course fee includes all ___ (equipment / equipement).', accepted: ['equipment'], explanation: l('equipment.', 'equipment।') })),
      at(3, correct('lsfin-f4', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('Fix the answer for "ONE WORD ONLY" after "many".', '"many"-র পরে "ONE WORD ONLY"-র জন্য উত্তরটা ঠিক করুন।'), sentence: 'the student', accepted: ['students'], explanation: l('One word, plural.', 'একটা word, plural।') })),
    ],
  },
];

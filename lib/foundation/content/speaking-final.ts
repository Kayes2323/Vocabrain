import type { FinalItem, FinalPart } from './pos-final';
import { choice, correct, gap, l, order, spot } from './pos-kit';

/**
 * Understanding IELTS Speaking · Final Mastery Challenge. Six parts, 4 items
 * each at levels 1–3; 3 are served per part adaptively (18 questions). New
 * items, not copied from the lessons. Original Mino content.
 */
const at = <T extends FinalItem>(level: 1 | 2 | 3, e: Omit<T, 'level'>): T => ({ ...e, level }) as T;
const P = { tag: 'speaking' as const };

export const SPEAKING_FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('How Speaking works', 'Speaking কীভাবে চলে'), intro: l('Parts, timing and criteria.', 'অংশ, সময় আর criteria।'),
    items: [
      at(1, choice('spfin-a1', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('Who do you speak to in IELTS Speaking?', 'IELTS Speaking-এ কার সাথে কথা বলেন?'), options: ['An examiner, face to face', 'A computer', 'Other candidates'], answer: 'An examiner, face to face', explanation: l('Always face to face.', 'সবসময় সামনাসামনি।') })),
      at(2, choice('spfin-a2', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('Which is one of the four Speaking criteria?', 'কোনটা Speaking-এর চারটা criteria-র একটা?'), options: ['Fluency & Coherence', 'Handwriting', 'Speed'], answer: 'Fluency & Coherence', explanation: l('Plus Lexical Resource, Grammar, Pronunciation.', 'সাথে Lexical Resource, Grammar, Pronunciation।') })),
      at(2, gap('spfin-a3', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'Part 2 gives you ___ minute to prepare.', accepted: ['1', 'one'], explanation: l('1 minute.', '১ মিনিট।') })),
      at(3, correct('spfin-a4', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('Correct the statement.', 'বাক্যটা ঠিক করুন।'), sentence: 'In computer-delivered IELTS, you speak into a microphone with no examiner.', accepted: ['In computer-delivered IELTS, you speak face to face with an examiner.', 'In computer-delivered IELTS, Speaking is face to face with an examiner.'], explanation: l('Speaking stays face to face.', 'Speaking সামনাসামনিই থাকে।') })),
    ],
  },
  {
    id: 'B', title: l('Part 1 answers', 'Part 1-এর উত্তর'), intro: l('Answer, reason, detail.', 'উত্তর, কারণ, detail।'),
    items: [
      at(1, choice('spfin-b1', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('"Do you like tea?" Best answer?', '"Do you like tea?" সবচেয়ে ভালো উত্তর?'), options: ['Yes, I do — I have milk tea every morning, mainly because it wakes me up.', 'Yes.', 'Tea is a popular drink in many countries around the world.'], answer: 'Yes, I do — I have milk tea every morning, mainly because it wakes me up.', explanation: l('Answer + detail + reason.', 'উত্তর + detail + কারণ।') })),
      at(2, choice('spfin-b2', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('"Did you have a favourite teacher?" Which answer matches the tense?', '"Did you have a favourite teacher?" কোন উত্তর tense-এ মেলে?'), options: ['Yes, my maths teacher, because she made hard topics easy.', 'Yes, my maths teacher, because she makes hard topics easy every day now.', 'Yes, I will have one.'], answer: 'Yes, my maths teacher, because she made hard topics easy.', explanation: l('Did → past.', 'Did → past।') })),
      at(2, gap('spfin-b3', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'I usually walk to class, mainly ___ it’s cheaper than a rickshaw.', accepted: ['because'], explanation: l('because.', 'because।') })),
      at(3, spot('spfin-b4', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('One word breaks the tense. Tap it and fix it.', 'একটা word tense ভাঙছে। Tap করে ঠিক করুন।'), sentence: '"Did you travel last summer?" — "Yes, I go to Rangamati."', wrong: 'go', accepted: ['went'], fixOptions: ['went', 'going', 'gone'], explanation: l('Did → went.', 'Did → went।') })),
    ],
  },
  {
    id: 'C', title: l('Part 2 long turn', 'Part 2 long turn'), intro: l('Notes, prompts, full time.', 'Note, prompt, পুরো সময়।'),
    items: [
      at(1, choice('spfin-c1', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('How long do you speak in Part 2?', 'Part 2-এ কতক্ষণ বলেন?'), options: ['1–2 minutes', '10 minutes', '20 seconds'], answer: '1–2 minutes', explanation: l('After 1 minute to prepare.', '১ মিনিট প্রস্তুতির পরে।') })),
      at(2, choice('spfin-c2', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('Card: "Describe a gift you gave someone." Best notes for "why you chose it"?', 'Card: "Describe a gift you gave someone।" "why you chose it"-এর সবচেয়ে ভালো note?'), options: ['loves cooking · old pan broken', 'I chose it because my sister loves cooking and her old pan was broken last month.', 'reason'], answer: 'loves cooking · old pan broken', explanation: l('Key words, quick to write.', 'Key word, দ্রুত লেখা যায়।') })),
      at(2, gap('spfin-c3', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('Write the past form of "give".', '"give"-এর past form লিখুন।'), sentence: 'Last year I ___ my sister a new cooking pan.', accepted: ['gave'], explanation: l('give – gave.', 'give – gave।') })),
      at(3, correct('spfin-c4', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'Talk only about the first prompt on the card.', accepted: ['Talk about every prompt on the card.', 'Cover every prompt on the card.', 'Talk about all the prompts on the card.'], explanation: l('Cover every prompt.', 'প্রতিটা prompt ধরুন।') })),
    ],
  },
  {
    id: 'D', title: l('Part 3 discussion', 'Part 3 আলোচনা'), intro: l('General, compare, speculate.', 'সাধারণ, তুলনা, অনুমান।'),
    items: [
      at(1, choice('spfin-d1', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('Part 3 questions are mainly about…', 'Part 3-এর প্রশ্ন মূলত…'), options: ['people and society in general', 'your family members’ names', 'the Reading test'], answer: 'people and society in general', explanation: l('Wider questions.', 'বড় প্রশ্ন।') })),
      at(2, choice('spfin-d2', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('"Do people give more expensive gifts now than in the past?" Best start?', '"Do people give more expensive gifts now than in the past?" সবচেয়ে ভালো শুরু?'), options: ['I’d say yes — compared with the past, many families have more money to spend.', 'I gave a pan.', 'Gifts.'], answer: 'I’d say yes — compared with the past, many families have more money to spend.', explanation: l('Opinion + comparison + reason.', 'মতামত + তুলনা + কারণ।') })),
      at(2, gap('spfin-d3', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'People ___ give more digital gifts in the future.', accepted: ['might', 'may', 'could'], explanation: l('might / may — tentative.', 'might / may — অনিশ্চিত।') })),
      at(3, spot('spfin-d4', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('One word is too certain for a prediction. Tap it and fix it.', 'ভবিষ্যদ্বাণীর জন্য একটা word বেশি নিশ্চিত। Tap করে ঠিক করুন।'), sentence: 'Shops will certainly disappear in ten years.', wrong: 'certainly', accepted: ['probably'], fixOptions: ['probably', 'always', 'never'], explanation: l('Speculate: probably.', 'অনুমান: probably।') })),
    ],
  },
  {
    id: 'E', title: l('Fluency and natural language', 'Fluency আর স্বাভাবিক ভাষা'), intro: l('Keep going, sound spoken.', 'চালিয়ে যান, কথ্য শোনান।'),
    items: [
      at(1, choice('spfin-e1', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Which gives you thinking time naturally?', 'কোনটা স্বাভাবিকভাবে ভাবার সময় দেয়?'), options: ['Hmm, let me think…', '(ten seconds of silence)', 'Moreover…'], answer: 'Hmm, let me think…', explanation: l('A short thinking phrase.', 'ছোট ভাবার phrase।') })),
      at(2, choice('spfin-e2', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Most natural in conversation?', 'কথোপকথনে সবচেয়ে স্বাভাবিক?'), options: ['It’s quite a busy area, but I like it.', 'Furthermore, the area is characterised by busyness.', 'In conclusion, busy.'], answer: 'It’s quite a busy area, but I like it.', explanation: l('Simple spoken English.', 'সহজ কথ্য English।') })),
      at(2, gap('spfin-e3', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Write two words for a quick self-correction.', 'দ্রুত শোধরানোর জন্য দুটো word লিখুন।'), sentence: 'He work — ___, he works at a bank.', accepted: ['I mean', 'sorry I mean'], explanation: l('"I mean".', '"I mean"।') })),
      at(3, order('spfin-e4', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Fluent means natural, not fast.', explanation: l('A natural pace.', 'স্বাভাবিক গতি।') })),
    ],
  },
  {
    id: 'F', title: l('Pronunciation', 'Pronunciation'), intro: l('Stress, endings, clear sounds.', 'Stress, ending, পরিষ্কার ধ্বনি।'),
    items: [
      at(1, choice('spfin-f1', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('Good pronunciation in IELTS means…', 'IELTS-এ ভালো pronunciation মানে…'), options: ['being easy to understand', 'sounding British', 'speaking quickly'], answer: 'being easy to understand', explanation: l('Clarity.', 'স্পষ্টতা।') })),
      at(2, choice('spfin-f2', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('Which is stressed correctly?', 'কোনটায় stress সঠিক?'), options: ['e-CO-no-my', 'E-co-no-my', 'e-co-no-MY'], answer: 'e-CO-no-my', explanation: l('Second syllable.', 'দ্বিতীয় syllable।') })),
      at(2, gap('spfin-f3', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('Write the sound: t, d or id.', 'ধ্বনিটা লিখুন: t, d বা id।'), sentence: 'The -ed in "played" sounds like /___/.', accepted: ['d'], explanation: l('/d/.', '/d/।') })),
      at(3, spot('spfin-f4', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('One word has an extra vowel added. Tap it and fix it.', 'একটা word-এ বাড়তি vowel যোগ হয়েছে। Tap করে ঠিক করুন।'), sentence: 'I walk to the istation every morning.', wrong: 'istation', accepted: ['station'], fixOptions: ['station', 'estation', 'sitation'], explanation: l('No vowel before s + consonant.', 's + consonant-এর আগে vowel নয়।') })),
    ],
  },
];

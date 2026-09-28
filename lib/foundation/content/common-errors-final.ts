import type { FinalItem, FinalPart } from './pos-final';
import { choice, correct, gap, l, order, spot } from './pos-kit';

/**
 * Common Errors to Fix · Final Mastery Challenge. Six parts, 4 items each at
 * levels 1–3; 3 are served per part adaptively (18 questions). Every item
 * carries the concept it tests. New items, not copied from the lessons.
 * Original Mino content.
 */
const at = <T extends FinalItem>(level: 1 | 2 | 3, e: Omit<T, 'level'>): T => ({ ...e, level }) as T;
const P = { tag: 'common-error' as const };

export const COMMON_ERRORS_FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('Translated phrases', 'অনুবাদ করা phrase'), intro: l('agree, depend, take an exam, turn on.', 'agree, depend, take an exam, turn on।'),
    items: [
      at(1, choice('cefin-a1', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['We all agree on the plan.', 'We are all agree on the plan.', 'We all are agree on the plan.'], answer: 'We all agree on the plan.', explanation: l('agree is a verb.', 'agree verb।') })),
      at(2, choice('cefin-a2', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Choose the natural verb.', 'স্বাভাবিক verb বেছে নিন।'), sentence: 'My father has to ___ his blood pressure tablets every morning.', options: ['take', 'eat', 'drink'], answer: 'take', explanation: l('take medicine / tablets.', 'take medicine / tablets।') })),
      at(2, gap('cefin-a3', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Write the natural verb (one word).', 'স্বাভাবিক verb লিখুন (একটা word)।'), sentence: 'Thousands of students ___ the HSC exam every year.', accepted: ['take', 'sit'], explanation: l('take / sit an exam.', 'take / sit an exam।') })),
      at(3, correct('cefin-a4', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Fix the two translated phrases.', 'অনুবাদ করা দুটো phrase ঠিক করুন।'), sentence: 'My cousin brother is agree with me.', accepted: ['My cousin agrees with me.'], explanation: l('cousin; agrees (a verb, with -s for he / she).', 'cousin; agrees (verb, he / she-এর জন্য -s)।') })),
    ],
  },
  {
    id: 'B', title: l('Uncountable nouns', 'Uncountable noun'), intro: l('information, advice, research, equipment.', 'information, advice, research, equipment।'),
    items: [
      at(1, choice('cefin-b1', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'How much ___ can I take on the plane?', options: ['luggage', 'luggages', 'luggage’s'], answer: 'luggage', explanation: l('luggage: uncountable.', 'luggage: uncountable।') })),
      at(2, choice('cefin-b2', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The information on this website is out of date.', 'The informations on this website are out of date.', 'The information on this website are out of date.'], answer: 'The information on this website is out of date.', explanation: l('information + is.', 'information + is।') })),
      at(2, spot('cefin-b3', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('One word is wrong. Tap it and fix it.', 'একটা word ভুল। Tap করে ঠিক করুন।'), sentence: 'She has a lot of knowledges about local history.', wrong: 'knowledges', accepted: ['knowledge'], fixOptions: ['knowledge', 'knowledgeses', 'know'], explanation: l('knowledge: no -s.', 'knowledge: -s না।') })),
      at(3, correct('cefin-b4', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Fix the two errors.', 'দুটো ভুল ঠিক করুন।'), sentence: 'The news are that the lab has new equipments.', accepted: ['The news is that the lab has new equipment.'], explanation: l('news is; equipment without -s.', 'news is; -s ছাড়া equipment।') })),
    ],
  },
  {
    id: 'C', title: l('Singular and plural', 'Singular আর plural'), intro: l('Numbers, one of the …, every, describers.', 'সংখ্যা, one of the …, every, বর্ণনা।'),
    items: [
      at(1, choice('cefin-c1', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'I have two ___ and a sister.', options: ['brothers', 'brother', 'brother’s'], answer: 'brothers', explanation: l('two → plural.', 'two → plural।') })),
      at(2, choice('cefin-c2', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Every employee receives a bonus.', 'Every employees receive a bonus.', 'Every employees receives a bonus.'], answer: 'Every employee receives a bonus.', explanation: l('every + singular noun and verb.', 'every + singular noun আর verb।') })),
      at(2, gap('cefin-c3', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Write the plural of the word in brackets.', 'বন্ধনীর word-এর plural লিখুন।'), sentence: 'Several ___ (woman) spoke at the meeting.', base: 'woman', accepted: ['women'], explanation: l('woman → women.', 'woman → women।') })),
      at(3, correct('cefin-c4', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Task 1: fix the two errors.', 'Task 1: দুটো ভুল ঠিক করুন।'), sentence: 'Over the twenty years period, the number of factory fell.', accepted: ['Over the twenty-year period, the number of factories fell.'], explanation: l('twenty-year (describer); the number of factories.', 'twenty-year (বর্ণনা); the number of factories।') })),
    ],
  },
  {
    id: 'D', title: l('Collocations', 'Collocation'), intro: l('make, do, take, have; heavy, high.', 'make, do, take, have; heavy, high।'),
    items: [
      at(1, choice('cefin-d1', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Can I ___ a photo of your garden?', options: ['take', 'do', 'make'], answer: 'take', explanation: l('take a photo.', 'take a photo।') })),
      at(2, choice('cefin-d2', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Which sentence is natural?', 'কোন sentence-টা স্বাভাবিক?'), options: ['He made a lot of money from his business.', 'He did a lot of money from his business.', 'He took a lot of money from his business.'], answer: 'He made a lot of money from his business.', explanation: l('make money.', 'make money।') })),
      at(2, gap('cefin-d3', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Write the natural adjective.', 'স্বাভাবিক adjective লিখুন।'), sentence: 'The cost of living in London is very ___.', accepted: ['high'], explanation: l('a high cost.', 'a high cost।') })),
      at(3, correct('cefin-d4', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Fix the two collocations.', 'দুটো collocation ঠিক করুন।'), sentence: 'Students who do mistakes should make their homework again.', accepted: ['Students who make mistakes should do their homework again.'], explanation: l('make mistakes; do homework.', 'make mistakes; do homework।') })),
    ],
  },
  {
    id: 'E', title: l('Confusing word pairs', 'গুলিয়ে যাওয়া word-জোড়া'), intro: l('say / tell, lend / borrow, teach / learn, rise / raise.', 'say / tell, lend / borrow, teach / learn, rise / raise।'),
    items: [
      at(1, choice('cefin-e1', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Could you ___ me the time, please?', options: ['tell', 'say', 'speak'], answer: 'tell', explanation: l('tell + person.', 'tell + মানুষ।') })),
      at(2, choice('cefin-e2', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Task 1: choose the correct verb.', 'Task 1: সঠিক verb বেছে নিন।'), sentence: 'The unemployment rate ___ to 8% in 2021.', options: ['rose', 'raised', 'was raised'], answer: 'rose', explanation: l('No object → rose.', 'Object নেই → rose।') })),
      at(2, spot('cefin-e3', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('One verb is wrong. Tap it and fix it.', 'একটা verb ভুল। Tap করে ঠিক করুন।'), sentence: 'The bank borrowed us money to start the shop.', wrong: 'borrowed', accepted: ['lent', 'loaned'], fixOptions: ['lent', 'borrow', 'lend'], explanation: l('The giver lends → lent.', 'যে দেয় সে lend করে → lent।') })),
      at(3, correct('cefin-e4', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Fix the two verbs.', 'দুটো verb ঠিক করুন।'), sentence: 'My grandfather learned me chess and said me many stories.', accepted: ['My grandfather taught me chess and told me many stories.'], explanation: l('teach someone; tell someone a story.', 'teach someone; tell someone a story।') })),
    ],
  },
  {
    id: 'F', title: l('Repetition and natural phrasing', 'Repetition আর স্বাভাবিক phrasing'), intro: l('Say it once, in real IELTS sentences.', 'আসল IELTS sentence-এ একবার বলুন।'),
    items: [
      at(1, choice('cefin-f1', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Which sentence is natural?', 'কোন sentence-টা স্বাভাবিক?'), options: ['We reached Sylhet at midnight.', 'We reached to Sylhet at midnight.', 'We reached at Sylhet at midnight.'], answer: 'We reached Sylhet at midnight.', explanation: l('reach + place, no preposition.', 'reach + জায়গা, preposition না।') })),
      at(2, gap('cefin-f2', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Write the comparative of the word in brackets (one word).', 'বন্ধনীর word-এর comparative লিখুন (একটা word)।'), sentence: 'The second test was ___ (easy) than the first.', base: 'easy', accepted: ['easier'], explanation: l('easy → easier (not more easier).', 'easy → easier (more easier না)।') })),
      at(2, order('cefin-f3', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'The main reason is that rents are rising.', explanation: l('The reason is that …', 'The reason is that …') })),
      at(3, correct('cefin-f4', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Task 2: remove the two repetitions.', 'Task 2: দুটো repetition বাদ দিন।'), sentence: 'Many experts emphasise on the need to repeat lessons again.', accepted: ['Many experts emphasise the need to repeat lessons.', 'Many experts emphasize the need to repeat lessons.'], explanation: l('emphasise + object; repeat, no again.', 'emphasise + object; repeat, again না।') })),
    ],
  },
];

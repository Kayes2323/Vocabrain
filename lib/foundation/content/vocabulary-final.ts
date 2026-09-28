import type { FinalItem, FinalPart } from './pos-final';
import { choice, correct, gap, l, order, spot } from './pos-kit';

/**
 * Vocabulary Foundation · Final Mastery Challenge. Six parts, 4 items each at
 * levels 1–3; 3 are served per part adaptively (18 questions). Every item
 * carries the concept it tests. New items, not copied from the lessons.
 * Original Mino content.
 */
const at = <T extends FinalItem>(level: 1 | 2 | 3, e: Omit<T, 'level'>): T => ({ ...e, level }) as T;
const P = { tag: 'vocabulary' as const };

export const VOCABULARY_FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('Word patterns', 'Word pattern'), intro: l('afford to, access to, benefit from, impact on.', 'afford to, access to, benefit from, impact on।'),
    items: [
      at(1, choice('vcfin-a1', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Choose the word that follows.', 'পরের word-টা বেছে নিন।'), sentence: 'Children benefit ___ playing outside.', options: ['from', 'of', 'with'], answer: 'from', explanation: l('benefit from.', 'benefit from।') })),
      at(2, choice('vcfin-a2', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Few students can afford to live alone.', 'Few students can afford living alone.', 'Few students can afford for living alone.'], answer: 'Few students can afford to live alone.', explanation: l('afford to + verb.', 'afford to + verb।') })),
      at(2, gap('vcfin-a3', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Write the missing word.', 'বাদ পড়া word-টা লিখুন।'), sentence: 'The new law had a strong impact ___ small businesses.', accepted: ['on'], explanation: l('an impact on.', 'an impact on।') })),
      at(3, correct('vcfin-a4', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Fix the two patterns.', 'দুটো pattern ঠিক করুন।'), sentence: 'Remote villages lack access of doctors, and this contributes for poor health.', accepted: ['Remote villages lack access to doctors, and this contributes to poor health.'], explanation: l('access to; contribute to.', 'access to; contribute to।') })),
    ],
  },
  {
    id: 'B', title: l('Meaning from context', 'Context থেকে অর্থ'), intro: l('Clues and word parts.', 'সংকেত আর word-এর অংশ।'),
    items: [
      at(1, choice('vcfin-b1', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('What does "reuse" mean?', '"reuse" মানে কী?'), options: ['use again', 'use wrongly', 'never use'], answer: 'use again', explanation: l('re- = again.', 're- = আবার।') })),
      at(2, choice('vcfin-b2', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('What does "reluctant" probably mean?', '"reluctant"-এর সম্ভাব্য অর্থ কী?'), sentence: 'Unlike her sister, who loves travelling, Mita is reluctant to leave home.', options: ['not willing', 'very excited', 'able'], answer: 'not willing', explanation: l('Contrast with "loves travelling".', '"loves travelling"-এর বিপরীত।') })),
      at(2, gap('vcfin-b3', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('Add a suffix meaning "without" (one word).', '"ছাড়া" অর্থের suffix যোগ করুন (একটা word)।'), sentence: 'After the factory closed, many workers became ___ (job).', base: 'job', accepted: ['jobless'], explanation: l('-less = without.', '-less = ছাড়া।') })),
      at(3, spot('vcfin-b4', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('One prefix gives the wrong meaning. Tap it and fix it.', 'একটা prefix ভুল অর্থ দেয়। Tap করে ঠিক করুন।'), sentence: 'The trains are underused, so passengers often have to stand.', wrong: 'underused', accepted: ['overcrowded', 'overused', 'crowded'], fixOptions: ['overcrowded', 'unused', 'reused'], explanation: l('Passengers stand → too many people → overcrowded.', 'যাত্রীরা দাঁড়িয়ে → অতিরিক্ত মানুষ → overcrowded।') })),
    ],
  },
  {
    id: 'C', title: l('Synonyms and paraphrasing', 'Synonym আর paraphrasing'), intro: l('Same meaning, different words.', 'একই অর্থ, আলাদা word।'),
    items: [
      at(1, choice('vcfin-c1', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Which verb can replace "fell"?', '"fell"-এর জায়গায় কোন verb বসবে?'), sentence: 'Crime fell in 2022.', options: ['declined', 'reduced', 'lowered'], answer: 'declined', explanation: l('declined has no object.', 'declined-এর object নেই।') })),
      at(2, choice('vcfin-c2', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Which paraphrase keeps the same meaning?', 'কোন paraphrase একই অর্থ রাখে?'), sentence: 'Original: Some parents think homework is useful.', options: ['Certain parents believe that homework is beneficial.', 'All parents know that homework is essential.', 'Some parents think homework is useless.'], answer: 'Certain parents believe that homework is beneficial.', explanation: l('Same meaning and strength.', 'একই অর্থ আর জোর।') })),
      at(2, gap('vcfin-c3', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Write the noun form (one word).', 'Noun form লিখুন (একটা word)।'), sentence: 'Prices increased. → There was an ___ in prices.', accepted: ['increase'], explanation: l('increase (n) + in.', 'increase (n) + in।') })),
      at(3, order('vcfin-c4', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Build the paraphrase.', 'Paraphrase-টা সাজান।'), answer: 'It is widely believed that exercise improves mood.', explanation: l('It is widely believed that … = Many people think …', 'It is widely believed that … = Many people think …') })),
    ],
  },
  {
    id: 'D', title: l('Formal and informal', 'Formal আর informal'), intro: l('Register by task.', 'Task অনুযায়ী register।'),
    items: [
      at(1, choice('vcfin-d1', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Task 2: choose the formal word.', 'Task 2: formal word বেছে নিন।'), sentence: 'The number of cars ___ rapidly.', options: ['increased', 'went up', 'shot up'], answer: 'increased', explanation: l('Formal single verb.', 'Formal একক verb।') })),
      at(2, choice('vcfin-d2', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Speaking Part 1: which answer sounds natural?', 'Speaking Part 1: কোন উত্তর স্বাভাবিক শোনায়?'), sentence: 'Examiner: "Do you like cooking?"', options: ['Yes, I really enjoy it — I usually cook on Fridays.', 'Indeed, culinary pursuits constitute my paramount leisure activity.', 'Cooking good.'], answer: 'Yes, I really enjoy it — I usually cook on Fridays.', explanation: l('Natural and complete.', 'স্বাভাবিক আর সম্পূর্ণ।') })),
      at(2, gap('vcfin-d3', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Write a formal verb for "get" (one word).', '"get"-এর formal verb লিখুন (একটা word)।'), sentence: 'Applicants must ___ a medical certificate.', accepted: ['obtain', 'submit', 'provide', 'present'], explanation: l('get → obtain.', 'get → obtain।') })),
      at(3, correct('vcfin-d4', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Task 2: rewrite formally.', 'Task 2: formal-ভাবে আবার লিখুন।'), sentence: 'Loads of kids get stressed.', accepted: ['Many children experience stress.', 'Many children become stressed.', 'A large number of children experience stress.', 'A large number of children become stressed.', 'Many children suffer from stress.'], explanation: l('Many children experience stress.', 'Many children experience stress।') })),
    ],
  },
  {
    id: 'E', title: l('Precise words', 'নির্দিষ্ট word'), intro: l('Not good, bad, thing or very.', 'good, bad, thing বা very না।'),
    items: [
      at(1, choice('vcfin-e1', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Choose the precise word.', 'নির্দিষ্ট word বেছে নিন।'), sentence: 'Too much sugar is ___ to teeth.', options: ['damaging', 'bad', 'not nice'], answer: 'damaging', explanation: l('damaging / harmful to.', 'damaging / harmful to।') })),
      at(2, choice('vcfin-e2', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Which is correct?', 'কোনটা ঠিক?'), options: ['Good sleep is vital for learning.', 'Good sleep is very vital for learning.', 'Good sleep is a very vital thing for learning.'], answer: 'Good sleep is vital for learning.', explanation: l('vital stands alone.', 'vital একাই বসে।') })),
      at(2, gap('vcfin-e3', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Write a precise noun for "good thing" (one word).', '"good thing"-এর জন্য একটা নির্দিষ্ট noun লিখুন (একটা word)।'), sentence: 'One ___ of living near the sea is the fresh air.', accepted: ['advantage', 'benefit', 'plus'], explanation: l('advantage / benefit.', 'advantage / benefit।') })),
      at(3, correct('vcfin-e4', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Replace the two vague words.', 'দুটো অস্পষ্ট word বদলান।'), sentence: 'Traffic is a bad thing for city people.', accepted: ['Traffic is a serious problem for city residents.', 'Traffic is a major problem for city residents.', 'Traffic is a serious issue for city residents.', 'Traffic is a major issue for city residents.', 'Traffic is a serious problem for urban residents.', 'Traffic is a major problem for urban residents.'], explanation: l('bad thing → serious problem; people → residents.', 'bad thing → serious problem; people → residents।') })),
    ],
  },
  {
    id: 'F', title: l('Form, meaning and tone', 'Form, অর্থ আর সুর'), intro: l('Use new words accurately.', 'নতুন word নির্ভুলভাবে।'),
    items: [
      at(1, choice('vcfin-f1', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'The storm had a huge ___ on the harvest.', options: ['effect', 'affect', 'effective'], answer: 'effect', explanation: l('a noun → effect.', 'noun → effect।') })),
      at(2, choice('vcfin-f2', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Which word has the right tone?', 'কোন word-এর সুর ঠিক?'), sentence: 'Cox’s Bazar is ___ for its long beach.', options: ['famous', 'notorious', 'infamous'], answer: 'famous', explanation: l('A positive fact → famous.', 'ইতিবাচক তথ্য → famous।') })),
      at(2, spot('vcfin-f3', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('One word has the wrong form. Tap it and fix it.', 'একটা word-এর form ভুল। Tap করে ঠিক করুন।'), sentence: 'Taking the bus is more economic than taking a taxi.', wrong: 'economic', accepted: ['economical', 'cheaper'], fixOptions: ['economical', 'economy', 'economics'], explanation: l('saves money → economical.', 'সাশ্রয়ী → economical।') })),
      at(3, correct('vcfin-f4', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Fix the two words.', 'দুটো word ঠিক করুন।'), sentence: 'The new policy will effect the economy significant.', accepted: ['The new policy will affect the economy significantly.', 'The new policy will significantly affect the economy.'], explanation: l('affect (verb); significantly (adverb).', 'affect (verb); significantly (adverb)।') })),
    ],
  },
];

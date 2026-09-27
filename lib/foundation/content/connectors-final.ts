import type { FinalItem, FinalPart } from './pos-final';
import { choice, correct, gap, l, order, spot } from './pos-kit';

/**
 * Connectors · Final Mastery Challenge. Six parts, 4 items each at levels
 * 1–3; 3 are served per part adaptively (18 questions). Every item carries the
 * connector concept it tests, so the report can show results topic by topic.
 * New items, not copied from the lessons. Original Mino content.
 */
const at = <T extends FinalItem>(level: 1 | 2 | 3, e: Omit<T, 'level'>): T => ({ ...e, level }) as T;
const C = { tag: 'connector' as const };

export const CONNECTOR_FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('Adding ideas', 'Idea যোগ'), intro: l('also, too, either, in addition, as well as.', 'also, too, either, in addition, as well as।'),
    items: [
      at(1, choice('cnfin-a1', 'conn-add', { ...C, pattern: 'conn-form', prompt: l('Choose the correct sentence.', 'সঠিক sentence বেছে নিন।'), options: ['The course also includes a field trip.', 'The course includes also a field trip.', 'Also the course includes a field trip also.'], answer: 'The course also includes a field trip.', explanation: l('also before the main verb.', 'মূল verb-এর আগে also।') })),
      at(2, gap('cnfin-a2', 'conn-add', { ...C, pattern: 'conn-meaning', prompt: l('Write too or either.', 'too বা either লিখুন।'), sentence: 'My brother can’t drive, and my sister can’t ___.', accepted: ['either'], explanation: l('Negative → either.', 'Negative → either।') })),
      at(2, choice('cnfin-a3', 'conn-add', { ...C, pattern: 'conn-form', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'As well as ___ English, she teaches French.', options: ['teaching', 'she teaches', 'teach'], answer: 'teaching', explanation: l('as well as + -ing.', 'as well as + -ing।') })),
      at(3, correct('cnfin-a4', 'conn-add', { ...C, pattern: 'conn-form', prompt: l('Fix the Task 2 sentences (one connector is used wrongly).', 'Task 2 sentence-গুলো ঠিক করুন (একটা connector ভুলভাবে ব্যবহার হয়েছে)।'), sentence: 'Parks improve health. And, they bring people together.', accepted: ['Parks improve health. In addition, they bring people together.', 'Parks improve health. Moreover, they bring people together.', 'Parks improve health. Furthermore, they bring people together.', 'Parks improve health, and they bring people together.', 'Parks improve health and bring people together.'], explanation: l('Don’t start a formal sentence with "And,": use In addition, / Moreover, or join with and.', 'Formal sentence "And," দিয়ে শুরু করবেন না: In addition, / Moreover, দিন বা and দিয়ে জোড়ুন।') })),
    ],
  },
  {
    id: 'B', title: l('Contrast', 'বিপরীত'), intro: l('but, however, although, despite, whereas.', 'but, however, although, despite, whereas।'),
    items: [
      at(1, choice('cnfin-b1', 'conn-contrast', { ...C, pattern: 'conn-double', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Although the bus was full, we got on.', 'Although the bus was full, but we got on.', 'Although the bus was full, however we got on.'], answer: 'Although the bus was full, we got on.', explanation: l('One contrast word.', 'একটা contrast word।') })),
      at(2, choice('cnfin-b2', 'conn-contrast', { ...C, pattern: 'conn-form', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: '___ the noise, the baby slept well.', options: ['Despite', 'Although', 'However'], answer: 'Despite', explanation: l('+ noun → despite.', '+ noun → despite।') })),
      at(2, gap('cnfin-b3', 'conn-contrast', { ...C, pattern: 'conn-meaning', prompt: l('Task 1: write one word to compare.', 'Task 1: তুলনার জন্য একটা word লিখুন।'), sentence: 'Men spent more on transport, ___ women spent more on clothes.', accepted: ['whereas', 'while', 'but'], explanation: l('Comparing two facts → whereas / while.', 'দুটো তথ্যের তুলনা → whereas / while।') })),
      at(3, spot('cnfin-b4', 'conn-contrast', { ...C, pattern: 'conn-form', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Despite prices were rising, people kept buying.', wrong: 'Despite', accepted: ['Although', 'Though'], fixOptions: ['Although', 'However', 'But'], explanation: l('A clause follows → Although.', 'পরে clause → Although।') })),
    ],
  },
  {
    id: 'C', title: l('Cause and result', 'কারণ আর ফলাফল'), intro: l('because, because of, so, therefore, as a result.', 'because, because of, so, therefore, as a result।'),
    items: [
      at(1, choice('cnfin-c1', 'conn-cause', { ...C, pattern: 'conn-form', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: 'The ferry did not run ___ the fog.', options: ['because of', 'because', 'so'], answer: 'because of', explanation: l('+ noun → because of.', '+ noun → because of।') })),
      at(2, choice('cnfin-c2', 'conn-cause', { ...C, pattern: 'conn-fragment', prompt: l('Which is a complete sentence?', 'কোনটা পূর্ণ sentence?'), options: ['I chose nursing because I like helping people.', 'Because I like helping people.', 'I chose nursing. Because I like helping people.'], answer: 'I chose nursing because I like helping people.', explanation: l('because-clause + main clause.', 'because-clause + মূল clause।') })),
      at(2, gap('cnfin-c3', 'conn-cause', { ...C, pattern: 'conn-form', prompt: l('Write one conjunction.', 'একটা conjunction লিখুন।'), sentence: 'The printer was broken, ___ I sent the file by email.', accepted: ['so'], explanation: l('A result after a comma → so.', 'Comma-র পরে ফলাফল → so।') })),
      at(3, correct('cnfin-c4', 'conn-cause', { ...C, pattern: 'conn-double', prompt: l('Fix the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'Since the rain stopped, so we went for a walk.', accepted: ['Since the rain stopped, we went for a walk.', 'The rain stopped, so we went for a walk.'], explanation: l('One link word: since OR so.', 'একটা link word: since অথবা so।') })),
    ],
  },
  {
    id: 'D', title: l('Examples, order and endings', 'উদাহরণ, ক্রম আর শেষ'), intro: l('for example, such as, finally, overall, in conclusion.', 'for example, such as, finally, overall, in conclusion।'),
    items: [
      at(1, choice('cnfin-d1', 'conn-example', { ...C, pattern: 'conn-form', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: 'Some vegetables, ___ potatoes and carrots, grow in winter.', options: ['such as', 'for example,', 'at last'], answer: 'such as', explanation: l('+ nouns inside the sentence → such as.', 'Sentence-এর ভেতরে + noun → such as।') })),
      at(2, choice('cnfin-d2', 'conn-example', { ...C, pattern: 'conn-meaning', prompt: l('Task 1: choose the overview sentence.', 'Task 1: overview sentence বেছে নিন।'), options: ['Overall, the use of solar energy increased in every region.', 'In conclusion, solar energy is the best choice.', 'At last, solar energy increased.'], answer: 'Overall, the use of solar energy increased in every region.', explanation: l('Task 1: Overall, + main trend.', 'Task 1: Overall, + মূল trend।') })),
      at(2, gap('cnfin-d3', 'conn-example', { ...C, pattern: 'conn-meaning', prompt: l('Write one word for the last point.', 'শেষ point-এর জন্য একটা word লিখুন।'), sentence: 'Firstly, it is cheap. Secondly, it is quick. ___, it is good for the environment.', accepted: ['finally', 'lastly'], explanation: l('Last point → Finally / Lastly.', 'শেষ point → Finally / Lastly।') })),
      at(3, correct('cnfin-d4', 'conn-example', { ...C, pattern: 'conn-double', prompt: l('Fix the sentence (remove two words).', 'Sentence-টা ঠিক করুন (দুটো word বাদ দিন)।'), sentence: 'Many cities, for example such as Paris and Rome, attract tourists.', accepted: ['Many cities, such as Paris and Rome, attract tourists.'], explanation: l('One example word: such as.', 'একটা উদাহরণের word: such as।') })),
    ],
  },
  {
    id: 'E', title: l('Position and punctuation', 'জায়গা আর punctuation'), intro: l('No comma splices; the right form after each linker.', 'Comma splice না; প্রতিটা linker-এর পরে সঠিক form।'),
    items: [
      at(1, choice('cnfin-e1', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Which is correctly punctuated?', 'কোনটার punctuation ঠিক?'), options: ['The shop was open. However, it had no milk.', 'The shop was open, however it had no milk.', 'The shop was open however, it had no milk.'], answer: 'The shop was open. However, it had no milk.', explanation: l('. However, + new sentence.', '. However, + নতুন sentence।') })),
      at(2, choice('cnfin-e2', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Where does the comma go?', 'Comma কোথায় বসবে?'), options: ['If it rains tomorrow, the trip will be cancelled.', 'If, it rains tomorrow the trip will be cancelled.', 'If it rains, tomorrow the trip will, be cancelled.'], answer: 'If it rains tomorrow, the trip will be cancelled.', explanation: l('Subordinate clause first → comma after it.', 'শুরুতে subordinate clause → তার পরে comma।') })),
      at(2, gap('cnfin-e3', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Write one conjunction that can follow the comma.', 'Comma-র পরে বসতে পারে এমন একটা conjunction লিখুন।'), sentence: 'The phone is expensive, ___ its camera is excellent.', accepted: ['but', 'yet'], explanation: l('Contrast after a comma → but.', 'Comma-র পরে বিপরীত → but।') })),
      at(3, correct('cnfin-e4', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Fix the comma splice.', 'Comma splice ঠিক করুন।'), sentence: 'Fuel prices rose, therefore bus fares went up.', accepted: ['Fuel prices rose. Therefore, bus fares went up.', 'Fuel prices rose; therefore, bus fares went up.', 'Fuel prices rose, so bus fares went up.'], explanation: l('. Therefore, / ; therefore, / , so', '. Therefore, / ; therefore, / , so') })),
    ],
  },
  {
    id: 'F', title: l('Natural linking in IELTS', 'IELTS-এ স্বাভাবিক linking'), intro: l('this, which, fewer connectors, the right logic.', 'this, which, কম connector, সঠিক যুক্তি।'),
    items: [
      at(1, choice('cnfin-f1', 'conn-cohesion', { ...C, pattern: 'conn-form', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: 'The council planted 1,000 trees, ___ has improved the air.', options: ['which', 'who', 'what'], answer: 'which', explanation: l(', which refers to the previous idea.', ', which আগের idea-কে বোঝায়।') })),
      at(2, choice('cnfin-f2', 'conn-cohesion', { ...C, pattern: 'conn-meaning', prompt: l('Choose the connector that matches the logic.', 'যুক্তির সাথে মেলে এমন connector বেছে নিন।'), sentence: 'The flat is small. ___, it is in a great location.', options: ['However', 'Therefore', 'Moreover'], answer: 'However', explanation: l('small (bad) vs great location (good) → However.', 'ছোট (খারাপ) বনাম দারুণ জায়গা (ভালো) → However।') })),
      at(2, order('cnfin-f3', 'conn-cohesion', { ...C, pattern: 'conn-form', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'This problem is common in large cities.', explanation: l('This + noun refers back clearly.', 'This + noun পরিষ্কারভাবে আগের দিকে ইঙ্গিত করে।') })),
      at(3, spot('cnfin-f4', 'conn-cohesion', { ...C, pattern: 'conn-meaning', prompt: l('One word breaks the logic. Tap it, then fix it.', 'একটা word যুক্তি ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Online shopping is convenient. Moreover, it can lead to fraud.', wrong: 'Moreover', accepted: ['However'], fixOptions: ['However', 'Therefore', 'Similarly'], explanation: l('convenient (good) vs fraud (bad) → However.', 'সুবিধাজনক (ভালো) বনাম প্রতারণা (খারাপ) → However।') })),
    ],
  },
];

import type { FinalItem, FinalPart } from './pos-final';
import { choice, correct, gap, l, order, spot } from './pos-kit';

/**
 * Complex Sentences · Final Mastery Challenge. Six parts, 4 items each at
 * levels 1–3; 3 are served per part adaptively (18 questions). Every item
 * carries the clause concept it tests, so the report can show results topic
 * by topic. New items, not copied from the lessons. Original Mino content.
 */
const at = <T extends FinalItem>(level: 1 | 2 | 3, e: Omit<T, 'level'>): T => ({ ...e, level }) as T;
const X = { tag: 'complex-sentence' as const };

export const COMPLEX_FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('Complete sentences', 'পূর্ণ sentence'), intro: l('Main clauses, fragments and run-ons.', 'মূল clause, ভাঙা sentence আর run-on।'),
    items: [
      at(1, choice('cxfin-a1', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Which is a complete sentence?', 'কোনটা পূর্ণ sentence?'), options: ['We cancelled the trip because the weather was bad.', 'Because the weather was bad.', 'The weather was bad, we cancelled the trip.'], answer: 'We cancelled the trip because the weather was bad.', explanation: l('main + because-clause.', 'মূল + because-clause।') })),
      at(2, gap('cxfin-a2', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Write one joining word.', 'একটা জোড়ার word লিখুন।'), sentence: 'The library was closed, ___ we studied in a café.', accepted: ['so'], explanation: l('Two main clauses + , so.', 'দুটো মূল clause + , so।') })),
      at(2, choice('cxfin-a3', 'cx-clause', { ...X, pattern: 'cx-comma', prompt: l('Where does the comma go?', 'Comma কোথায় বসবে?'), options: ['Before the exam started, the teacher checked our IDs.', 'Before the exam, started the teacher checked our IDs.', 'Before, the exam started the teacher checked our IDs.'], answer: 'Before the exam started, the teacher checked our IDs.', explanation: l('Dependent clause first → comma after it.', 'নির্ভরশীল clause আগে → তার পরে comma।') })),
      at(3, correct('cxfin-a4', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Fix the run-on (add one word).', 'Run-on ঠিক করুন (একটা word যোগ করুন)।'), sentence: 'The city is growing fast, the roads are always busy.', accepted: ['The city is growing fast, so the roads are always busy.', 'The city is growing fast, and the roads are always busy.', 'Because the city is growing fast, the roads are always busy.', 'The city is growing fast. The roads are always busy.', 'The city is growing fast; the roads are always busy.'], explanation: l('Join with , so / , and — or split.', ', so / , and দিয়ে জোড়ুন — বা আলাদা করুন।') })),
    ],
  },
  {
    id: 'B', title: l('Reason, contrast and purpose', 'কারণ, বিপরীত আর উদ্দেশ্য'), intro: l('because, although, to, so that.', 'because, although, to, so that।'),
    items: [
      at(1, choice('cxfin-b1', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'I called the office ___ ask about the fees.', options: ['to', 'for', 'for to'], answer: 'to', explanation: l('Purpose + verb → to.', 'উদ্দেশ্য + verb → to।') })),
      at(2, choice('cxfin-b2', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['He studies at night so that he can work in the day.', 'He studies at night so that he can to work in the day.', 'He studies at night so that to work in the day.'], answer: 'He studies at night so that he can work in the day.', explanation: l('so that + subject + can + base verb.', 'so that + subject + can + base verb।') })),
      at(2, gap('cxfin-b3', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Write one word for contrast.', 'বিপরীতের জন্য একটা word লিখুন।'), sentence: '___ the flat is small, it has a lovely view.', accepted: ['although', 'though', 'even though'], explanation: l('Contrast + clause → Although.', 'বিপরীত + clause → Although।') })),
      at(3, correct('cxfin-b4', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Correct the sentence (one word).', 'Sentence-টা ঠিক করুন (একটা word)।'), sentence: 'Many families moved to the city for find work.', accepted: ['Many families moved to the city to find work.'], explanation: l('Purpose + verb → to find.', 'উদ্দেশ্য + verb → to find।') })),
    ],
  },
  {
    id: 'C', title: l('Time and condition', 'সময় আর শর্ত'), intro: l('No will after when / if; If + past, would.', 'when / if-এর পরে will না; If + past, would।'),
    items: [
      at(1, choice('cxfin-c1', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'I will send you the photos when I ___ home.', options: ['get', 'will get', 'would get'], answer: 'get', explanation: l('when + present.', 'when + present।') })),
      at(2, choice('cxfin-c2', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'If I ___ the answer, I would tell you.', options: ['knew', 'know', 'would know'], answer: 'knew', explanation: l('Imagined → If + past.', 'কল্পিত → If + past।') })),
      at(2, gap('cxfin-c3', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'As soon as the shop ___ (open), I will buy the tickets.', base: 'open', accepted: ['opens'], explanation: l('as soon as + present: opens.', 'as soon as + present: opens।') })),
      at(3, spot('cxfin-c4', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Unless it stopped raining soon, the match will be cancelled.', wrong: 'stopped', accepted: ['stops'], fixOptions: ['stops', 'will', 'would'], explanation: l('Real future: unless + present (stops).', 'বাস্তব ভবিষ্যৎ: unless + present (stops)।') })),
    ],
  },
  {
    id: 'D', title: l('Relative clauses', 'Relative clause'), intro: l('who, which, that, whose, where — no repeated pronoun.', 'who, which, that, whose, where — pronoun আবার না।'),
    items: [
      at(1, choice('cxfin-d1', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Choose the relative word.', 'Relative word বেছে নিন।'), sentence: 'The nurse ___ looked after me was very kind.', options: ['who', 'which', 'where'], answer: 'who', explanation: l('A person → who.', 'মানুষ → who।') })),
      at(2, choice('cxfin-d2', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The course I chose is very practical.', 'The course I chose it is very practical.', 'The course where I chose is very practical.'], answer: 'The course I chose is very practical.', explanation: l('Object relative: no it.', 'Object relative: it না।') })),
      at(2, gap('cxfin-d3', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Write who, which, whose or where.', 'who, which, whose বা where লিখুন।'), sentence: 'That’s the student ___ essay won the prize.', accepted: ['whose'], explanation: l('Possession → whose.', 'মালিকানা → whose।') })),
      at(3, correct('cxfin-d4', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Correct the sentence (remove the repeated subject).', 'Sentence-টা ঠিক করুন (আবার আসা subject বাদ দিন)।'), sentence: 'The driver who he caused the accident, he was arrested.', accepted: ['The driver who caused the accident was arrested.'], explanation: l('who = the subject; no he, no ", he".', 'who = subject; he না, ", he" না।') })),
    ],
  },
  {
    id: 'E', title: l('Commas and shortened clauses', 'Comma আর ছোট করা clause'), intro: l('Defining or extra? -ing or -ed?', 'Defining নাকি বাড়তি? -ing নাকি -ed?'),
    items: [
      at(1, choice('cxfin-e1', 'cx-relative-comma', { ...X, pattern: 'cx-comma', prompt: l('Which is correctly punctuated?', 'কোনটার punctuation ঠিক?'), options: ['Khulna, which is near the Sundarbans, is a big city.', 'Khulna which is near the Sundarbans is a big city.', 'Khulna, that is near the Sundarbans, is a big city.'], answer: 'Khulna, which is near the Sundarbans, is a big city.', explanation: l('A name + extra information → , which …,', 'নাম + বাড়তি তথ্য → , which …,') })),
      at(2, choice('cxfin-e2', 'cx-relative-comma', { ...X, pattern: 'cx-relative-form', prompt: l('Choose the shortened form.', 'ছোট করা form বেছে নিন।'), sentence: 'Tourists ___ the museum must buy a ticket.', options: ['visiting', 'who visiting', 'visited'], answer: 'visiting', explanation: l('who visit → visiting.', 'who visit → visiting।') })),
      at(2, gap('cxfin-e3', 'cx-relative-comma', { ...X, pattern: 'cx-comma', prompt: l('Write one relative word (after a comma).', 'একটা relative word লিখুন (comma-র পরে)।'), sentence: 'The factory closed, ___ left 500 people without work.', accepted: ['which'], explanation: l(', which = the whole previous event.', ', which = আগের পুরো ঘটনা।') })),
      at(3, spot('cxfin-e4', 'cx-relative-comma', { ...X, pattern: 'cx-relative-form', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'The report publishing last year shows a clear trend.', wrong: 'publishing', accepted: ['published'], fixOptions: ['published', 'publishes', 'publish'], explanation: l('which was published → published (passive).', 'which was published → published (passive)।') })),
    ],
  },
  {
    id: 'F', title: l('Noun clauses and IELTS', 'Noun clause আর IELTS'), intro: l('Statement order, whether, and real IELTS sentences.', 'Statement order, whether, আর আসল IELTS sentence।'),
    items: [
      at(1, choice('cxfin-f1', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Choose the correct ending.', 'সঠিক শেষটা বেছে নিন।'), sentence: 'Do you know where ___?', options: ['the bus stop is', 'is the bus stop', 'does the bus stop'], answer: 'the bus stop is', explanation: l('Statement order.', 'Statement order।') })),
      at(2, gap('cxfin-f2', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Write if / whether or that.', 'if / whether বা that লিখুন।'), sentence: 'I’m not sure ___ the museum is open today.', accepted: ['if', 'whether'], explanation: l('Yes / no → if / whether.', 'হ্যাঁ / না → if / whether।') })),
      at(2, order('cxfin-f3', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Nobody knows why the bridge collapsed.', explanation: l('why + subject + verb.', 'why + subject + verb।') })),
      at(3, correct('cxfin-f4', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Correct the Task 2 sentence (word order).', 'Task 2 sentence-টা ঠিক করুন (word order)।'), sentence: 'It is not clear how will the plan work.', accepted: ['It is not clear how the plan will work.'], explanation: l('how + subject + will + verb.', 'how + subject + will + verb।') })),
    ],
  },
];

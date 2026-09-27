import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Complex Sentences (Foundation module 8), the six concept lessons in the v2
 * (problem-first) format, easy → hard:
 * cx-1 clauses: complete sentences, fragments and run-ons
 * cx-2 reason, contrast and purpose clauses (because, although, so that, to)
 * cx-3 time and condition clauses (when, before, until, if, unless — no will)
 * cx-4 relative clauses: who, which, that, whose, where (no double subject)
 * cx-5 commas in relative clauses; shortened clauses (-ing / -ed)
 * cx-6 noun clauses and indirect questions (what, that, whether; word order)
 * Bangla puts the describing clause before the noun and repeats the subject
 * (যে লোকটা এসেছিল, সে …), keeps question order inside statements, and joins
 * long chains with commas, so every lesson names why Bangla speakers slip.
 * Accuracy first: a correct simple sentence scores better than a broken
 * complex one. Original Mino content.
 */

export const COMPLEX_CONCEPTS: Concept[] = [
  { id: 'cx-clause', title: l('Clauses: complete sentences, fragments and run-ons', 'Clause: পূর্ণ sentence, ভাঙা sentence আর run-on'), lessonId: 'cx-1', tag: 'complex-sentence' },
  { id: 'cx-adverbial', title: l('Reason, contrast and purpose clauses', 'কারণ, বিপরীত আর উদ্দেশ্যের clause'), lessonId: 'cx-2', tag: 'complex-sentence' },
  { id: 'cx-time-if', title: l('Time and condition clauses', 'সময় আর শর্তের clause'), lessonId: 'cx-3', tag: 'complex-sentence' },
  { id: 'cx-relative', title: l('Relative clauses: who, which, that', 'Relative clause: who, which, that'), lessonId: 'cx-4', tag: 'complex-sentence' },
  { id: 'cx-relative-comma', title: l('Relative clauses with and without commas', 'Comma-সহ আর comma-ছাড়া relative clause'), lessonId: 'cx-5', tag: 'complex-sentence' },
  { id: 'cx-noun-clause', title: l('Noun clauses and indirect questions', 'Noun clause আর indirect question'), lessonId: 'cx-6', tag: 'complex-sentence' },
];

const X = { tag: 'complex-sentence' as const };

// ======================================================================= cx-1
export const cxClauses: Lesson = {
  id: 'cx-1',
  format: 'v2',
  concept: 'cx-clause',
  title: l('Clauses: complete sentences, fragments and run-ons', 'Clause: পূর্ণ sentence, ভাঙা sentence আর run-on'),
  why: l('Complex sentences are built from clauses. If you can see where one clause ends and the next begins, you avoid the two errors that cost the most: fragments and run-ons.', 'Complex sentence clause দিয়ে তৈরি। একটা clause কোথায় শেষ আর পরেরটা কোথায় শুরু দেখতে পারলে সবচেয়ে ব্যয়বহুল দুটো ভুল এড়াবেন: ভাঙা sentence আর run-on।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Three lines from an essay', 'একটা essay-র তিনটা লাইন'),
      situation: l('A: "Many students work part-time." B: "Because fees are high." C: "Fees are high, students need money, they work at night."', 'A: "Many students work part-time." B: "Because fees are high." C: "Fees are high, students need money, they work at night."'),
      question: l('Which one is a complete, correct sentence?', 'কোনটা পূর্ণ, সঠিক sentence?'),
      options: ['A only', 'B only', 'A and C'],
      answer: 'A only',
      diagnose: {
        'A only': l('Right. A has a subject + verb and stands alone. B is a fragment (a because-clause with no main clause). C is a run-on: three sentences joined only by commas.', 'ঠিক। A-তে subject + verb আছে আর একা দাঁড়ায়। B একটা ভাঙা sentence (মূল clause ছাড়া because-clause)। C একটা run-on: তিনটা sentence শুধু comma দিয়ে জোড়া।'),
        'B only': l('B has a subject and verb (fees are), but "because" makes it depend on another clause. Alone, it is a fragment.', 'B-তে subject আর verb আছে (fees are), কিন্তু "because" এটাকে অন্য clause-এর উপর নির্ভরশীল করে। একা এটা ভাঙা sentence।'),
        'A and C': l('C looks full, but it is three sentences joined with commas (a run-on). Use a full stop, or join them with so / and / because.', 'C পূর্ণ মনে হয়, কিন্তু এটা comma দিয়ে জোড়া তিনটা sentence (run-on)। Full stop দিন, বা so / and / because দিয়ে জোড়ুন।'),
      },
    },
    {
      kind: 'discover',
      title: l('Main and dependent clauses', 'মূল আর নির্ভরশীল clause'),
      items: [
        { en: 'Students work part-time.', note: l('main clause: stands alone', 'মূল clause: একা দাঁড়ায়') },
        { en: 'because fees are high', note: l('dependent clause: needs a main clause', 'নির্ভরশীল clause: মূল clause লাগে') },
        { en: 'Students work part-time because fees are high.', note: l('complex sentence: main + dependent', 'complex sentence: মূল + নির্ভরশীল') },
        { en: 'Fees are high, so students work part-time.', note: l('compound sentence: main + , so + main', 'compound sentence: মূল + , so + মূল') },
      ],
      question: l('What makes a clause "dependent"?', 'একটা clause "নির্ভরশীল" হয় কীসে?'),
      options: [
        l('A word like because, although, when, if, who or which at its start', 'শুরুতে because, although, when, if, who বা which-এর মতো word'),
        l('Being short', 'ছোট হওয়া'),
        l('Having no verb', 'Verb না থাকা'),
      ],
      answer: 0,
      pattern: l('Every clause has a subject + verb. A clause that starts with because / although / when / if / who / which is dependent: it must be attached to a main clause.', 'প্রতিটা clause-এ subject + verb থাকে। because / although / when / if / who / which দিয়ে শুরু হওয়া clause নির্ভরশীল: মূল clause-এর সাথে জুড়ে থাকতে হয়।'),
    },
    {
      kind: 'concept',
      title: l('Complete sentences, fragments and run-ons', 'পূর্ণ sentence, ভাঙা sentence আর run-on'),
      body: l(
        'A sentence needs at least one main clause (subject + verb that can stand alone). Two main clauses need a full stop, a semicolon, or a joining word (and, but, so) — never just a comma.',
        'একটা sentence-এ অন্তত একটা মূল clause লাগে (একা দাঁড়াতে পারে এমন subject + verb)। দুটো মূল clause-এর মাঝে full stop, semicolon, বা জোড়ার word (and, but, so) লাগে — শুধু comma কখনো না।',
      ),
      points: [
        l('Fragment: a dependent clause alone ("Because it was late."), or words with no main verb ("A city with many parks."). Fix: attach it, or add a verb.', 'ভাঙা sentence: একা নির্ভরশীল clause ("Because it was late."), বা মূল verb ছাড়া word ("A city with many parks.")। ঠিক করুন: জুড়ে দিন, বা verb যোগ করুন।'),
        l('Run-on / comma splice: two main clauses joined by a comma ("It was late, we went home."). Fix: . / ; / , so / because.', 'Run-on / comma splice: comma দিয়ে জোড়া দুটো মূল clause ("It was late, we went home.")। ঠিক করুন: . / ; / , so / because।'),
        l('Complex sentence = main clause + dependent clause. If the dependent clause comes first, put a comma after it: "When it rains, the roads flood."', 'Complex sentence = মূল clause + নির্ভরশীল clause। নির্ভরশীল clause আগে এলে তার পরে comma: "When it rains, the roads flood."'),
        l('Accuracy first: two correct simple sentences are better than one broken complex sentence. Range comes from a few accurate complex sentences, not long chains.', 'আগে accuracy: একটা ভাঙা complex sentence-এর চেয়ে দুটো সঠিক simple sentence ভালো। Range আসে কয়েকটা সঠিক complex sentence থেকে, লম্বা শিকল থেকে না।'),
        l('Why Bangla speakers slip: written Bangla happily joins many clauses with commas (দাম বেশি, মানুষ কম কেনে, দোকান বন্ধ হয়), and "কারণ …" can stand alone as an answer. English needs a joining word or a full stop between main clauses.', 'বাংলাভাষীরা কেন ভুল করে: লিখিত বাংলায় অনেক clause comma দিয়ে জোড়া চলে (দাম বেশি, মানুষ কম কেনে, দোকান বন্ধ হয়), আর "কারণ …" একা উত্তর হতে পারে। English-এ মূল clause-এর মাঝে জোড়ার word বা full stop লাগে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'I live in Rajshahi, and my brother lives in Dhaka.', note: l('two main clauses + , and', 'দুটো মূল clause + , and') },
        { en: 'When I finish college, I want to study abroad.', note: l('dependent first → comma', 'নির্ভরশীল আগে → comma') },
        { en: 'The market was crowded. We left early.', note: l('two short sentences — correct and clear', 'দুটো ছোট sentence — সঠিক আর পরিষ্কার') },
        { en: 'The market was crowded, so we left early.', note: l('joined with , so', ', so দিয়ে জোড়া') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Although many people own cars, public transport remains important in large cities.', note: l('Task 2: one accurate complex sentence shows range.', 'Task 2: একটা সঠিক complex sentence range দেখায়।') },
        { skill: 'speaking', example: 'I usually cook when I get home, because it helps me relax.', note: l('Part 1: dependent clauses make answers longer and natural.', 'Part 1: নির্ভরশীল clause উত্তর লম্বা আর স্বাভাবিক করে।') },
        { skill: 'reading', example: 'Because the soil was poor, farmers moved to the delta, where land was more fertile.', note: l('Reading: find the main clause to get the main idea.', 'Reading: মূল idea পেতে মূল clause খুঁজুন।') },
        { skill: 'listening', example: 'If you can’t come on Monday, call the office before Friday.', note: l('Listening: the condition is in the if-clause; the instruction in the main clause.', 'Listening: শর্ত if-clause-এ; নির্দেশ মূল clause-এ।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Because the bus was late.', right: 'I missed the class because the bus was late.', why: l('A because-clause needs a main clause.', 'because-clause-এ মূল clause লাগে।') },
        { wrong: 'Dhaka is crowded, people still move there.', right: 'Dhaka is crowded, but people still move there.', why: l('Two main clauses need a joining word (or a full stop).', 'দুটো মূল clause-এ জোড়ার word (বা full stop) লাগে।') },
        { wrong: 'A beautiful city with many old buildings.', right: 'Sylhet is a beautiful city with many old buildings.', why: l('No subject + verb → add them.', 'Subject + verb নেই → যোগ করুন।') },
        { wrong: 'When I was a child I lived in Barishal.', right: 'When I was a child, I lived in Barishal.', why: l('Dependent clause first → comma after it.', 'নির্ভরশীল clause আগে → তার পরে comma।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('cx-1-p1', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Which is a complete sentence?', 'কোনটা পূর্ণ sentence?'), options: ['I stayed at home because it was raining.', 'Because it was raining.', 'Staying at home because of the rain.'], answer: 'I stayed at home because it was raining.', explanation: l('Main clause + dependent clause.', 'মূল clause + নির্ভরশীল clause।'), why: { 'Because it was raining.': l('A because-clause alone is a fragment.', 'একা because-clause একটা ভাঙা sentence।'), 'Staying at home because of the rain.': l('No subject and no main verb.', 'Subject নেই, মূল verb-ও নেই।') } }),
        choice('cx-1-p2', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Which sentence is correctly joined?', 'কোন sentence সঠিকভাবে জোড়া?'), options: ['The shop was closed, so we went to the market.', 'The shop was closed, we went to the market.', 'The shop was closed we went to the market.'], answer: 'The shop was closed, so we went to the market.', explanation: l('Two main clauses + , so.', 'দুটো মূল clause + , so।'), why: { 'The shop was closed, we went to the market.': l('A comma alone cannot join two main clauses (comma splice).', 'শুধু comma দুটো মূল clause জুড়তে পারে না (comma splice)।'), 'The shop was closed we went to the market.': l('Two sentences with nothing between them (run-on).', 'মাঝে কিছু ছাড়া দুটো sentence (run-on)।') } }),
        choice('cx-1-p3', 'cx-clause', { ...X, pattern: 'cx-comma', prompt: l('Where does the comma go?', 'Comma কোথায় বসবে?'), options: ['After I finished my exams, I visited my grandparents.', 'After I finished, my exams I visited my grandparents.', 'After, I finished my exams I visited my grandparents.'], answer: 'After I finished my exams, I visited my grandparents.', explanation: l('Dependent clause first → comma after the whole clause.', 'নির্ভরশীল clause আগে → পুরো clause-এর পরে comma।'), why: { 'After I finished, my exams I visited my grandparents.': l('"my exams" belongs to the first clause; the comma goes after it.', '"my exams" প্রথম clause-এর অংশ; comma তার পরে।'), 'After, I finished my exams I visited my grandparents.': l('No comma after "After": it starts the clause.', '"After"-এর পরে comma না: এটা clause শুরু করে।') } }),
        choice('cx-1-p4', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Which is a complete sentence?', 'কোনটা পূর্ণ sentence?'), options: ['Cox’s Bazar has one of the longest beaches in the world.', 'Cox’s Bazar, one of the longest beaches in the world.', 'One of the longest beaches in the world in Cox’s Bazar.'], answer: 'Cox’s Bazar has one of the longest beaches in the world.', explanation: l('Subject (Cox’s Bazar) + verb (has).', 'Subject (Cox’s Bazar) + verb (has)।'), why: { 'Cox’s Bazar, one of the longest beaches in the world.': l('No main verb — add "has" or "is home to".', 'মূল verb নেই — "has" বা "is home to" যোগ করুন।'), 'One of the longest beaches in the world in Cox’s Bazar.': l('No main verb: add "is": "… is in Cox’s Bazar".', 'মূল verb নেই: "is" যোগ করুন: "… is in Cox’s Bazar"।') } }),
        choice('cx-1-p5', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Task 2: which is the best way to fix the run-on?', 'Task 2: run-on ঠিক করার সবচেয়ে ভালো উপায় কোনটা?'), sentence: 'Housing is expensive, young people live with their parents, they cannot save money.', options: ['Because housing is expensive, many young people live with their parents, so they cannot save money.', 'Housing is expensive, young people live with their parents, and, they cannot save money.', 'Housing is expensive. Young people, live with their parents they cannot save money.'], answer: 'Because housing is expensive, many young people live with their parents, so they cannot save money.', explanation: l('A dependent clause + a main clause + , so + a main clause.', 'নির্ভরশীল clause + মূল clause + , so + মূল clause।'), why: { 'Housing is expensive, young people live with their parents, and, they cannot save money.': l('The first comma still joins two main clauses, and there is an extra comma after "and".', 'প্রথম comma এখনো দুটো মূল clause জোড়ে, আর "and"-এর পরে অতিরিক্ত comma।'), 'Housing is expensive. Young people, live with their parents they cannot save money.': l('A wrong comma between subject and verb, and a new run-on.', 'Subject আর verb-এর মাঝে ভুল comma, আর নতুন run-on।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cx-1-r1', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Write one joining word (a result).', 'একটা জোড়ার word লিখুন (ফলাফল)।'), sentence: 'The road was flooded, ___ the school closed early.', accepted: ['so', 'and'], explanation: l('Two main clauses + , so.', 'দুটো মূল clause + , so।'), why: { because: l('"the school closed" is the result, not the reason → so.', '"the school closed" ফলাফল, কারণ না → so।') } }),
        gap('cx-1-r2', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Write one word to make the first clause dependent.', 'প্রথম clause-কে নির্ভরশীল করতে একটা word লিখুন।'), sentence: '___ I was tired, I finished my homework.', accepted: ['although', 'though', 'even though'], explanation: l('Contrast → Although.', 'বিপরীত → Although।'), why: { because: l('Being tired is not the reason for finishing: it is a contrast.', 'ক্লান্ত থাকা শেষ করার কারণ না: এটা বিপরীত।') } }),
        correct('cx-1-r3', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Fix the comma splice (add one word).', 'Comma splice ঠিক করুন (একটা word যোগ করুন)।'), sentence: 'I love my hometown, it is very green.', accepted: ['I love my hometown because it is very green.', 'I love my hometown, and it is very green.', 'I love my hometown. It is very green.', 'I love my hometown; it is very green.', 'I love my hometown since it is very green.'], explanation: l('Join with because / and — or use a full stop.', 'because / and দিয়ে জোড়ুন — বা full stop দিন।') }),
        correct('cx-1-r4', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Join the fragment to the main clause.', 'ভাঙা অংশটা মূল clause-এর সাথে জুড়ুন।'), sentence: 'I enjoy my job. Although the hours are long.', accepted: ['I enjoy my job although the hours are long.', 'I enjoy my job, although the hours are long.', 'Although the hours are long, I enjoy my job.'], explanation: l('main clause + although-clause.', 'মূল clause + although-clause।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cx-1-c1', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('How many main clauses? "When I arrived, the shop was closed, so I went home."', 'কয়টা মূল clause? "When I arrived, the shop was closed, so I went home."'), options: ['2', '1', '3'], answer: '2', explanation: l('the shop was closed · I went home (When I arrived is dependent).', 'the shop was closed · I went home (When I arrived নির্ভরশীল)।') }),
        spot('cx-1-c2', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Prices went up, however people kept buying rice.', wrong: 'however', accepted: ['but'], fixOptions: ['but', 'because', 'which'], explanation: l('Two main clauses after a comma → , but.', 'Comma-র পরে দুটো মূল clause → , but।') }),
        order('cx-1-c3', 'cx-clause', { ...X, pattern: 'cx-comma', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'When the rain stopped, we went outside.', explanation: l('Dependent clause first, comma, main clause.', 'আগে নির্ভরশীল clause, comma, মূল clause।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your plans', 'এবার আপনার পালা: আপনার পরিকল্পনা'),
      exercises: [
        write('cx-1-y1', 'cx-clause', {
          ...X,
          prompt: l('Speaking Part 1: "What are your plans for the future?" Write 3 correct sentences: one simple, one with and / but / so, and one with when / because / although.', 'Speaking Part 1: "What are your plans for the future?" ৩টা সঠিক sentence লিখুন: একটা simple, একটা and / but / so দিয়ে, আর একটা when / because / although দিয়ে।'),
          model: 'I want to become a software engineer. I am learning to code, and I practise every evening. When I finish my degree, I hope to work for a big company.',
          checklist: [l('every sentence has a main clause', 'প্রতিটা sentence-এ মূল clause আছে'), l('no comma alone between two main clauses', 'দুটো মূল clause-এর মাঝে শুধু comma না'), l('dependent clause first → comma after it', 'নির্ভরশীল clause আগে → তার পরে comma')],
          explanation: l('Accurate clauses first; range comes from a few correct complex sentences.', 'আগে সঠিক clause; কয়েকটা সঠিক complex sentence থেকে range আসে।'),
          task: 'The student writes 3 sentences about future plans: one simple, one compound (and / but / so), one complex (when / because / although). Check clause structure only: every sentence has a main clause with a subject and a finite verb; no fragments (a stand-alone because- / although- / when-clause, or a noun phrase with no verb); no run-ons or comma splices (two main clauses joined by a comma alone); a comma after a dependent clause that comes first; no double linkers (although … but). For each issue quote the words, name it (fragment, run-on, comma), and give the fix. Praise accurate, simple sentences too.',
          target: l('Complete sentences: no fragments, no run-ons', 'পূর্ণ sentence: ভাঙা sentence না, run-on না'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Every sentence needs a main clause (subject + verb that stands alone).', 'প্রতিটা sentence-এ মূল clause লাগে (একা দাঁড়ায় এমন subject + verb)।'),
        l('Two main clauses: . / ; / , and / , but / , so — never a comma alone.', 'দুটো মূল clause: . / ; / , and / , but / , so — শুধু comma কখনো না।'),
        l('Dependent clause first → comma after it. Accuracy before length.', 'নির্ভরশীল clause আগে → তার পরে comma। দৈর্ঘ্যের আগে accuracy।'),
      ],
    },
  ],
};

// ======================================================================= cx-2
export const cxReasonPurpose: Lesson = {
  id: 'cx-2',
  format: 'v2',
  concept: 'cx-adverbial',
  title: l('Reason, contrast and purpose clauses', 'কারণ, বিপরীত আর উদ্দেশ্যের clause'),
  why: l('Task 2 answers explain why and what for. "For improve my English" and "so that I can to study" are two common purpose errors; reason and contrast clauses complete the set.', 'Task 2 উত্তরে কেন আর কী জন্য ব্যাখ্যা করতে হয়। "For improve my English" আর "so that I can to study" উদ্দেশ্যের দুটো common ভুল; কারণ আর বিপরীতের clause এই set সম্পূর্ণ করে।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('Speaking Part 1: why IELTS?', 'Speaking Part 1: কেন IELTS?'),
      situation: l('The examiner asks why you are taking IELTS. You say: "I am taking IELTS ___ study in Canada."', 'Examiner জানতে চাইলেন কেন IELTS দিচ্ছেন। আপনি বললেন: "I am taking IELTS ___ study in Canada."'),
      question: l('Which fills the gap?', 'Gap-এ কোনটা বসবে?'),
      options: ['to', 'for', 'for to'],
      answer: 'to',
      diagnose: {
        'to': l('Right. Purpose + a verb → to + base verb (to study), or in order to / so that I can.', 'ঠিক। উদ্দেশ্য + verb → to + base verb (to study), বা in order to / so that I can।'),
        'for': l('"for" + a noun (for my studies) — but before a verb, English uses "to": to study.', '"for" + noun (for my studies) — কিন্তু verb-এর আগে English-এ "to": to study।'),
        'for to': l('"for to" is never correct in modern English. Use "to study" or "in order to study".', 'আধুনিক English-এ "for to" কখনো ঠিক না। "to study" বা "in order to study" দিন।'),
      },
    },
    {
      kind: 'discover',
      title: l('Why? In spite of what? What for?', 'কেন? কী সত্ত্বেও? কী জন্য?'),
      items: [
        { en: 'I walk to college because it is close.', note: l('reason: because / since / as + clause', 'কারণ: because / since / as + clause') },
        { en: 'I walk to college although it is far.', note: l('contrast: although / even though + clause', 'বিপরীত: although / even though + clause') },
        { en: 'I walk to college to save money.', note: l('purpose: to / in order to + base verb', 'উদ্দেশ্য: to / in order to + base verb') },
        { en: 'I walk to college so that I can save money.', note: l('purpose: so that + subject + can / will / could', 'উদ্দেশ্য: so that + subject + can / will / could') },
      ],
      question: l('How do you show purpose before a verb?', 'Verb-এর আগে উদ্দেশ্য কীভাবে দেখাবেন?'),
      options: [
        l('to / in order to + base verb, or so that + subject + can', 'to / in order to + base verb, বা so that + subject + can'),
        l('for + base verb', 'for + base verb'),
        l('because + base verb', 'because + base verb'),
      ],
      answer: 0,
      pattern: l('Reason: because / since + clause. Contrast: although / even though + clause. Purpose: to / in order to + base verb, so that + subject + can / could.', 'কারণ: because / since + clause। বিপরীত: although / even though + clause। উদ্দেশ্য: to / in order to + base verb, so that + subject + can / could।'),
    },
    {
      kind: 'concept',
      title: l('Three kinds of adverbial clause', 'তিন ধরনের adverbial clause'),
      body: l(
        'These clauses answer why, in spite of what, and what for. Each has a fixed form after the linking word.',
        'এই clause-গুলো কেন, কী সত্ত্বেও আর কী জন্য — এর উত্তর দেয়। প্রতিটার linking word-এর পরে নির্দিষ্ট form আছে।',
      ),
      points: [
        l('Reason: because / since / as + subject + verb: Since the tickets were cheap, we bought four.', 'কারণ: because / since / as + subject + verb: Since the tickets were cheap, we bought four।'),
        l('Contrast: although / even though / while + subject + verb: Even though it was late, the shops were open. (One contrast word — no but.)', 'বিপরীত: although / even though / while + subject + verb: Even though it was late, the shops were open। (একটা contrast word — but না।)'),
        l('Purpose with a verb: to / in order to / so as to + base verb (to learn, in order to save). Negative: so as not to / in order not to be late.', 'Verb-সহ উদ্দেশ্য: to / in order to / so as to + base verb (to learn, in order to save)। Negative: so as not to / in order not to be late।'),
        l('Purpose with a clause: so that + subject + can / will / could + base verb: I left early so that I could catch the bus. NOT "so that I can to catch".', 'Clause-সহ উদ্দেশ্য: so that + subject + can / will / could + base verb: I left early so that I could catch the bus। "so that I can to catch" না।'),
        l('Why Bangla speakers slip: "পড়ার জন্য" becomes "for study" or "for to study", because "জন্য" feels like "for". Before a verb, English purpose is "to study".', 'বাংলাভাষীরা কেন ভুল করে: "পড়ার জন্য" হয়ে যায় "for study" বা "for to study", কারণ "জন্য" মানে "for" মনে হয়। Verb-এর আগে English-এ উদ্দেশ্য "to study"।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'I joined a gym to get fit.', note: l('to + base verb', 'to + base verb') },
        { en: 'She saves money every month so that she can travel.', note: l('so that + subject + can', 'so that + subject + can') },
        { en: 'As the roads were flooded, the exam was postponed.', note: l('as = because', 'as = because') },
        { en: 'Even though he is young, he runs his own business.', note: l('contrast, no but', 'বিপরীত, but না') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Governments should invest in public transport in order to reduce traffic.', note: l('Task 2: in order to + base verb for solutions.', 'Task 2: সমাধানের জন্য in order to + base verb।') },
        { skill: 'speaking', example: 'I’m learning English so that I can study abroad.', note: l('Part 1: so that + can.', 'Part 1: so that + can।') },
        { skill: 'reading', example: 'The dam was built to control flooding.', note: l('Reading: to + verb often answers "What was the purpose…?"', 'Reading: to + verb প্রায়ই "What was the purpose…?"-এর উত্তর।') },
        { skill: 'listening', example: 'Bring your passport so that we can check your identity.', note: l('Listening: the reason for bringing something follows so that.', 'Listening: কিছু আনার কারণ so that-এর পরে আসে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I came to Dhaka for study.', right: 'I came to Dhaka to study. / … for my studies.', why: l('Purpose + verb → to + base verb.', 'উদ্দেশ্য + verb → to + base verb।') },
        { wrong: 'I save money so that I can to buy a laptop.', right: 'I save money so that I can buy a laptop.', why: l('can + base verb (no to).', 'can + base verb (to না)।') },
        { wrong: 'I left early for not to be late.', right: 'I left early so as not to be late.', why: l('Negative purpose → so as not to / in order not to.', 'Negative উদ্দেশ্য → so as not to / in order not to।') },
        { wrong: 'Even though it was cold, but we swam.', right: 'Even though it was cold, we swam.', why: l('One contrast word.', 'একটা contrast word।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('cx-2-p1', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'Many students work part-time ___ pay their fees.', options: ['to', 'for', 'for to'], answer: 'to', explanation: l('Purpose + verb → to.', 'উদ্দেশ্য + verb → to।'), why: { for: l('for + noun (for their fees); before a verb → to.', 'for + noun (for their fees); verb-এর আগে → to।'), 'for to': l('"for to" is not used in modern English.', 'আধুনিক English-এ "for to" ব্যবহার হয় না।') } }),
        choice('cx-2-p2', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'I set two alarms so that I ___ oversleep.', options: ['wouldn’t', 'not to', 'don’t to'], answer: 'wouldn’t', explanation: l('so that + subject + would / could + base verb.', 'so that + subject + would / could + base verb।'), why: { 'not to': l('After so that + subject, use a modal: I wouldn’t / couldn’t.', 'so that + subject-এর পরে modal: I wouldn’t / couldn’t।'), 'don’t to': l('"don’t to" is never correct.', '"don’t to" কখনো ঠিক না।') } }),
        choice('cx-2-p3', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Choose the linking word.', 'Linking word বেছে নিন।'), sentence: '___ the ticket was expensive, the show was worth it.', options: ['Although', 'Because', 'So that'], answer: 'Although', explanation: l('Expensive but worth it → contrast → Although.', 'দামি কিন্তু মূল্যবান → বিপরীত → Although।'), why: { Because: l('The price is not the reason the show was worth it.', 'দামটা show মূল্যবান হওয়ার কারণ না।'), 'So that': l('so that shows purpose, not contrast.', 'so that উদ্দেশ্য দেখায়, বিপরীত না।') } }),
        choice('cx-2-p4', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['She studies at night so that she can work during the day.', 'She studies at night so that she can to work during the day.', 'She studies at night for work during the day.'], answer: 'She studies at night so that she can work during the day.', explanation: l('so that + subject + can + base verb.', 'so that + subject + can + base verb।'), why: { 'She studies at night so that she can to work during the day.': l('can + base verb, no to.', 'can + base verb, to না।'), 'She studies at night for work during the day.': l('Before a verb, purpose uses to / so that — "for work" changes the meaning.', 'Verb-এর আগে উদ্দেশ্যে to / so that — "for work" অর্থ বদলে দেয়।') } }),
        choice('cx-2-p5', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Task 2: choose the best sentence.', 'Task 2: সবচেয়ে ভালো sentence বেছে নিন।'), options: ['Cities should build more parks in order to improve people’s health.', 'Cities should build more parks for improving of people’s health.', 'Cities should build more parks in order improve people’s health.'], answer: 'Cities should build more parks in order to improve people’s health.', explanation: l('in order to + base verb.', 'in order to + base verb।'), why: { 'Cities should build more parks for improving of people’s health.': l('"for improving of" is not English; use in order to improve.', '"for improving of" English না; in order to improve দিন।'), 'Cities should build more parks in order improve people’s health.': l('in order TO + base verb.', 'in order TO + base verb।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cx-2-r1', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Write one word for purpose.', 'উদ্দেশ্যের জন্য একটা word লিখুন।'), sentence: 'I went to the bank ___ open an account.', accepted: ['to'], explanation: l('Purpose + verb → to.', 'উদ্দেশ্য + verb → to।'), why: { for: l('Before a verb (open), use to.', 'Verb-এর আগে (open) to দিন।') } }),
        gap('cx-2-r2', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Write two words: so ___.', 'দুটো word লিখুন: so ___।'), sentence: 'Speak slowly ___ everyone can understand you.', accepted: ['so that'], explanation: l('Purpose + a clause → so that.', 'উদ্দেশ্য + clause → so that।'), why: { 'in order to': l('A subject follows (everyone can …) → so that.', 'পরে subject আছে (everyone can …) → so that।') } }),
        correct('cx-2-r3', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'My cousin went to Malaysia for work in a hotel.', accepted: ['My cousin went to Malaysia to work in a hotel.', 'My cousin went to Malaysia in order to work in a hotel.'], explanation: l('Purpose + verb → to work.', 'উদ্দেশ্য + verb → to work।') }),
        correct('cx-2-r4', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Correct the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'I save money so that I can to travel.', accepted: ['I save money so that I can travel.'], explanation: l('can + base verb: "so that I can travel".', 'can + base verb: "so that I can travel"।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cx-2-c1', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('"I went to Sylhet for my cousin’s wedding" vs "I went to Sylhet to attend my cousin’s wedding". Which is true?', '"I went to Sylhet for my cousin’s wedding" বনাম "I went to Sylhet to attend my cousin’s wedding"। কোনটা সত্যি?'), options: ['Both are correct: for + noun, to + verb', 'Only the first is correct', 'Only the second is correct'], answer: 'Both are correct: for + noun, to + verb', explanation: l('for + a noun (the wedding) · to + a verb (attend).', 'for + noun (the wedding) · to + verb (attend)।') }),
        spot('cx-2-c2', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'He practises every day for improve his speaking.', wrong: 'for', accepted: ['to'], fixOptions: ['to', 'so', 'because'], explanation: l('Purpose + verb → to improve.', 'উদ্দেশ্য + verb → to improve।') }),
        order('cx-2-c3', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'I left early so that I could catch the train.', explanation: l('so that + subject + could + base verb.', 'so that + subject + could + base verb।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: why and what for', 'এবার আপনার পালা: কেন আর কী জন্য'),
      exercises: [
        write('cx-2-y1', 'cx-adverbial', {
          ...X,
          prompt: l('Speaking Part 1: "Why are you learning English?" Write 3 sentences: one with because, one with to / in order to, and one with so that … can.', 'Speaking Part 1: "Why are you learning English?" ৩টা sentence লিখুন: একটা because দিয়ে, একটা to / in order to দিয়ে, আর একটা so that … can দিয়ে।'),
          model: 'I am learning English because I want to study engineering abroad. I watch English videos every day to improve my listening. I also speak with my cousin in English so that I can become more confident.',
          checklist: [l('because + subject + verb', 'because + subject + verb'), l('to / in order to + base verb (not for + verb)', 'to / in order to + base verb (for + verb না)'), l('so that + subject + can + base verb (no to after can)', 'so that + subject + can + base verb (can-এর পরে to না)')],
          explanation: l('Why → because · what for → to / so that.', 'কেন → because · কী জন্য → to / so that।'),
          task: 'The student writes 3 sentences about why they are learning English, using because, to / in order to, and so that … can. Check reason, contrast and purpose clauses only: because / since / as + subject + verb; although / even though + clause with no "but"; purpose before a verb is to / in order to / so as to + base verb (never "for + verb", "for to" or "for doing"); negative purpose is "so as not to / in order not to"; so that + subject + can / could / will + base verb (never "can to"). For each issue quote the words, name the clause type and give the fix.',
          target: l('Reason and purpose clauses', 'কারণ আর উদ্দেশ্যের clause'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Reason: because / since + clause · Contrast: although + clause (no but).', 'কারণ: because / since + clause · বিপরীত: although + clause (but না)।'),
        l('Purpose + verb: to / in order to + base verb — never "for + verb".', 'উদ্দেশ্য + verb: to / in order to + base verb — কখনো "for + verb" না।'),
        l('so that + subject + can / could + base verb (no to).', 'so that + subject + can / could + base verb (to না)।'),
      ],
    },
  ],
};

// ======================================================================= cx-3
export const cxTimeIf: Lesson = {
  id: 'cx-3',
  format: 'v2',
  concept: 'cx-time-if',
  title: l('Time and condition clauses', 'সময় আর শর্তের clause'),
  why: l('"When I will finish my degree…" and "If it will rain…" are among the most frequent errors in Speaking Part 1 and Task 2. The fix is one simple rule.', '"When I will finish my degree…" আর "If it will rain…" Speaking Part 1 আর Task 2-এর সবচেয়ে বেশি হওয়া ভুলগুলোর একটা। সমাধান একটা সহজ নিয়ম।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Speaking Part 1: future plans', 'Speaking Part 1: ভবিষ্যতের পরিকল্পনা'),
      situation: l('You say: "When I ___ my degree, I ___ for a job abroad."', 'আপনি বললেন: "When I ___ my degree, I ___ for a job abroad."'),
      question: l('Which pair is correct?', 'কোন জোড়াটা ঠিক?'),
      options: ['finish · will apply', 'will finish · will apply', 'will finish · apply'],
      answer: 'finish · will apply',
      diagnose: {
        'finish · will apply': l('Right. In a time clause (when, after, before, until, as soon as) about the future, use the present simple: When I finish… The main clause takes will.', 'ঠিক। ভবিষ্যৎ নিয়ে time clause-এ (when, after, before, until, as soon as) present simple: When I finish… মূল clause-এ will।'),
        'will finish · will apply': l('Bangla says "যখন আমি শেষ করব" (future in both parts), but English uses the present simple after when: When I finish, I will apply.', 'বাংলায় বলি "যখন আমি শেষ করব" (দুই অংশেই ভবিষ্যৎ), কিন্তু English-এ when-এর পরে present simple: When I finish, I will apply।'),
        'will finish · apply': l('Reversed: the when-clause takes the present (finish), the main clause takes will (will apply).', 'উল্টো: when-clause-এ present (finish), মূল clause-এ will (will apply)।'),
      },
    },
    {
      kind: 'discover',
      title: l('The future inside when and if', 'when আর if-এর ভেতরে ভবিষ্যৎ'),
      items: [
        { en: 'I will call you when I arrive.', note: l('future meaning, present form after when', 'ভবিষ্যতের অর্থ, when-এর পরে present form') },
        { en: 'If it rains tomorrow, the match will be cancelled.', note: l('first conditional: If + present, will', 'first conditional: If + present, will') },
        { en: 'Unless you hurry, you will miss the bus.', note: l('unless = if … not', 'unless = if … not') },
        { en: 'Wait here until I come back.', note: l('until + present', 'until + present') },
      ],
      question: l('What is the rule?', 'নিয়মটা কী?'),
      options: [
        l('After when / if / until / before / after / as soon as, use the present for the future; will goes in the main clause', 'when / if / until / before / after / as soon as-এর পরে ভবিষ্যতের জন্য present; will মূল clause-এ'),
        l('Use will in both clauses', 'দুই clause-এই will দিন'),
        l('Use the past after if', 'if-এর পরে past দিন'),
      ],
      answer: 0,
      pattern: l('No will after time and condition words: When / If / Unless / Until / As soon as + present → main clause with will (or can, should, an imperative).', 'সময় আর শর্তের word-এর পরে will না: When / If / Unless / Until / As soon as + present → মূল clause-এ will (বা can, should, imperative)।'),
    },
    {
      kind: 'concept',
      title: l('Time and condition clauses', 'সময় আর শর্তের clause'),
      body: l(
        'Time clauses (when, while, before, after, until, as soon as) and condition clauses (if, unless, as long as) describe the future with a present tense. The main clause shows the future with will.',
        'Time clause (when, while, before, after, until, as soon as) আর condition clause (if, unless, as long as) present tense দিয়ে ভবিষ্যৎ বোঝায়। মূল clause will দিয়ে ভবিষ্যৎ দেখায়।',
      ),
      points: [
        l('Future: When / After / As soon as I finish, I will … · If it rains, we will … · Unless you study, you won’t pass (= if you don’t study).', 'ভবিষ্যৎ: When / After / As soon as I finish, I will … · If it rains, we will … · Unless you study, you won’t pass (= if you don’t study)।'),
        l('General truths: If / When you heat ice, it melts (present + present).', 'সাধারণ সত্য: If / When you heat ice, it melts (present + present)।'),
        l('Imagined present / future (second conditional): If I had more time, I would learn to swim. If + past, would + base verb. NOT "If I would have".', 'কল্পিত বর্তমান / ভবিষ্যৎ (second conditional): If I had more time, I would learn to swim। If + past, would + base verb। "If I would have" না।'),
        l('Comma: if / when-clause first → comma (If it rains, …). Main clause first → usually no comma (We will stay home if it rains).', 'Comma: if / when-clause আগে → comma (If it rains, …)। মূল clause আগে → সাধারণত comma না (We will stay home if it rains)।'),
        l('Why Bangla speakers slip: Bangla marks the future in both parts ("যখন সে আসবে, আমি যাব" → both future), and "যদি … হতো" is translated with would in both halves. English keeps will / would out of the when / if-clause.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় দুই অংশেই ভবিষ্যৎ থাকে ("যখন সে আসবে, আমি যাব"), আর "যদি … হতো" অনুবাদে দুই অংশেই would বসে। English-এ when / if-clause-এ will / would থাকে না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'As soon as the results come out, I will tell you.', note: l('as soon as + present', 'as soon as + present') },
        { en: 'If the price goes up, fewer people will buy it.', note: l('If + present, will', 'If + present, will') },
        { en: 'You can’t enter unless you have a ticket.', note: l('unless = if … not', 'unless = if … not') },
        { en: 'If I lived near the sea, I would swim every day.', note: l('If + past, would (imagined)', 'If + past, would (কল্পিত)') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'When I finish university, I’ll probably work in Dhaka for a few years.', note: l('Part 1 plans: When + present, will.', 'Part 1 পরিকল্পনা: When + present, will।') },
        { skill: 'writing', example: 'If governments do not act now, pollution will get worse.', note: l('Task 2 consequences: If + present, will.', 'Task 2 পরিণাম: If + present, will।') },
        { skill: 'reading', example: 'Unless the dam is repaired, the village will flood.', note: l('Reading: unless = if not — watch it in True / False.', 'Reading: unless = if not — True / False-এ খেয়াল করুন।') },
        { skill: 'listening', example: 'If you want a single room, it’s £20 extra.', note: l('Listening: the condition decides which price you write.', 'Listening: শর্ত ঠিক করে কোন দাম লিখবেন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'When I will get my results, I will call you.', right: 'When I get my results, I will call you.', why: l('No will after when.', 'when-এর পরে will না।') },
        { wrong: 'If it will rain, we will stay home.', right: 'If it rains, we will stay home.', why: l('No will after if.', 'if-এর পরে will না।') },
        { wrong: 'If I would have money, I would buy a car.', right: 'If I had money, I would buy a car.', why: l('Imagined: If + past, would.', 'কল্পিত: If + past, would।') },
        { wrong: 'Unless you don’t hurry, you will be late.', right: 'Unless you hurry, you will be late.', why: l('unless already means "if not".', 'unless নিজেই "if not" বোঝায়।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('cx-3-p1', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'I will phone you as soon as I ___ home.', options: ['get', 'will get', 'got'], answer: 'get', explanation: l('as soon as + present for the future.', 'ভবিষ্যতের জন্য as soon as + present।'), why: { 'will get': l('No will after as soon as / when / if.', 'as soon as / when / if-এর পরে will না।'), got: l('This is about the future → present, not past.', 'এটা ভবিষ্যৎ নিয়ে → present, past না।') } }),
        choice('cx-3-p2', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'If the bus ___ late, we will take a taxi.', options: ['is', 'will be', 'would be'], answer: 'is', explanation: l('If + present, will.', 'If + present, will।'), why: { 'will be': l('No will in the if-clause.', 'if-clause-এ will না।'), 'would be': l('would is for imagined situations with If + past.', 'would কল্পিত অবস্থার জন্য, If + past-এর সাথে।') } }),
        choice('cx-3-p3', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'If I ___ rich, I would build a school in my village.', options: ['were', 'am', 'would be'], answer: 'were', explanation: l('Imagined present → If + past (were), would.', 'কল্পিত বর্তমান → If + past (were), would।'), why: { am: l('would in the main clause needs If + past (If I were / was).', 'মূল clause-এ would থাকলে If + past লাগে (If I were / was)।'), 'would be': l('No would in the if-clause.', 'if-clause-এ would না।') } }),
        choice('cx-3-p4', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: 'You won’t pass the exam ___ you study harder.', options: ['unless', 'if', 'when'], answer: 'unless', explanation: l('unless = if … not: you won’t pass if you don’t study.', 'unless = if … not: পড়াশোনা না করলে পাস করবেন না।'), why: { if: l('"if you study harder, you won’t pass" gives the opposite meaning.', '"if you study harder, you won’t pass" উল্টো অর্থ দেয়।'), when: l('when suggests you will certainly study; the idea here is a condition.', 'when বোঝায় নিশ্চিতভাবে পড়বেন; এখানে একটা শর্ত।') } }),
        choice('cx-3-p5', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Before you leave, please switch off the lights.', 'Before you will leave, please switch off the lights.', 'Before you left, please switch off the lights.'], answer: 'Before you leave, please switch off the lights.', explanation: l('before + present for the future.', 'ভবিষ্যতের জন্য before + present।'), why: { 'Before you will leave, please switch off the lights.': l('No will after before.', 'before-এর পরে will না।'), 'Before you left, please switch off the lights.': l('The instruction is about the future → present.', 'নির্দেশটা ভবিষ্যৎ নিয়ে → present।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cx-3-r1', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'When the rain ___ (stop), we will go out.', base: 'stop', accepted: ['stops'], explanation: l('when + present: stops.', 'when + present: stops।'), why: { 'will stop': l('No will after when.', 'when-এর পরে will না।'), stop: l('the rain = it → stops.', 'the rain = it → stops।') } }),
        gap('cx-3-r2', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'If I ___ (have) a car, I would drive to work.', base: 'have', accepted: ['had'], explanation: l('Imagined → If + past: had.', 'কল্পিত → If + past: had।'), why: { 'would have': l('No would in the if-clause.', 'if-clause-এ would না।'), have: l('would in the main clause → If + past (had).', 'মূল clause-এ would → If + past (had)।') } }),
        correct('cx-3-r3', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Correct the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'I will wait here until you will come back.', accepted: ['I will wait here until you come back.'], explanation: l('until + present.', 'until + present।') }),
        spot('cx-3-r4', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('One word is wrong. Tap it and type the right one.', 'একটা word ভুল। সেটায় tap করে সঠিকটা লিখুন।'), sentence: 'If prices rose next year, fewer people will travel.', wrong: 'rose', accepted: ['rise'], explanation: l('A real future possibility: If + present (rise), will.', 'বাস্তব ভবিষ্যৎ সম্ভাবনা: If + present (rise), will।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cx-3-c1', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('"If I win, I will buy a house" vs "If I won, I would buy a house". What is the difference?', '"If I win, I will buy a house" বনাম "If I won, I would buy a house"। পার্থক্য কী?'), options: ['The first is a real possibility; the second is imagined or unlikely', 'The first is past; the second is present', 'There is no difference'], answer: 'The first is a real possibility; the second is imagined or unlikely', explanation: l('If + present, will = real · If + past, would = imagined.', 'If + present, will = বাস্তব · If + past, would = কল্পিত।') }),
        spot('cx-3-c2', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'When I finished my degree next year, I will work abroad.', wrong: 'finished', accepted: ['finish'], fixOptions: ['finish', 'would', 'had'], explanation: l('Future time clause → present: When I finish …', 'ভবিষ্যতের time clause → present: When I finish …') }),
        order('cx-3-c3', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'If it rains tomorrow, we will stay at home.', explanation: l('If + present, will.', 'If + present, will।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: after your exams', 'এবার আপনার পালা: পরীক্ষার পরে'),
      exercises: [
        write('cx-3-y1', 'cx-time-if', {
          ...X,
          prompt: l('Speaking Part 1: "What will you do after your exams?" Write 3 sentences using when (or as soon as), if, and one imagined sentence with If + past, would.', 'Speaking Part 1: "What will you do after your exams?" when (বা as soon as), if, আর If + past, would দিয়ে একটা কল্পিত sentence ব্যবহার করে ৩টা sentence লিখুন।'),
          model: 'When my exams finish, I will visit my grandparents in Rangpur. If I get good results, I will apply to a university abroad. If I had more money, I would travel around Asia first.',
          checklist: [l('when / as soon as + present (no will)', 'when / as soon as + present (will না)'), l('If + present, will (real)', 'If + present, will (বাস্তব)'), l('If + past, would (imagined) — no would after if', 'If + past, would (কল্পিত) — if-এর পরে would না')],
          explanation: l('No will or would inside the when / if-clause.', 'when / if-clause-এর ভেতরে will বা would না।'),
          task: 'The student writes 3 sentences about plans after exams using when / as soon as, if (real), and If + past, would (imagined). Check time and condition clauses only: no will after when / after / before / until / as soon as / if / unless when talking about the future (present simple instead); real conditions: If + present, will; imagined: If + past (If I were / had), would + base verb, never "if I would"; unless = if not (no double negative "unless … don’t"); a comma after the if / when-clause when it comes first. For each issue quote the words, name the rule and give the fix.',
          target: l('No will after when / if', 'when / if-এর পরে will না'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('When / After / Until / As soon as / If + present → main clause with will.', 'When / After / Until / As soon as / If + present → মূল clause-এ will।'),
        l('Imagined: If + past, would + base verb — never "If I would".', 'কল্পিত: If + past, would + base verb — কখনো "If I would" না।'),
        l('unless = if … not · if-clause first → comma.', 'unless = if … not · if-clause আগে → comma।'),
      ],
    },
  ],
};

// ======================================================================= cx-4
export const cxRelative: Lesson = {
  id: 'cx-4',
  format: 'v2',
  concept: 'cx-relative',
  title: l('Relative clauses: who, which, that, whose, where', 'Relative clause: who, which, that, whose, where'),
  why: l('Relative clauses let you describe people, things and places in one sentence — a key sign of grammatical range. "The man who he lives next door" is the classic Bangla-speaker error.', 'Relative clause দিয়ে একটা sentence-এ মানুষ, জিনিস আর জায়গা বর্ণনা করা যায় — grammatical range-এর মূল চিহ্ন। "The man who he lives next door" বাংলাভাষীদের পরিচিত ভুল।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Speaking Part 2: a person you admire', 'Speaking Part 2: যাকে শ্রদ্ধা করেন'),
      situation: l('You say: "I want to talk about my uncle, who he runs a small clinic in the village where I grew up."', 'আপনি বললেন: "I want to talk about my uncle, who he runs a small clinic in the village where I grew up."'),
      question: l('What is wrong?', 'কী ভুল?'),
      options: ['"who he runs" — who already is the subject, so "he" must go', '"where" should be "which"', 'Nothing is wrong'],
      answer: '"who he runs" — who already is the subject, so "he" must go',
      diagnose: {
        '"who he runs" — who already is the subject, so "he" must go': l('Right. In "who runs a clinic", who is the subject. Adding "he" gives the clause two subjects. "the village where I grew up" is correct.', 'ঠিক। "who runs a clinic"-এ who-ই subject। "he" যোগ করলে clause-এ দুটো subject হয়। "the village where I grew up" ঠিক আছে।'),
        '"where" should be "which"': l('"the village where I grew up" is correct: where = in which (a place). The problem is "who he runs".', '"the village where I grew up" ঠিক: where = in which (জায়গা)। সমস্যা হলো "who he runs"।'),
        'Nothing is wrong': l('Bangla says "যে লোকটা …, সে …" and repeats the subject. In English, who replaces he: "my uncle, who runs a clinic".', 'বাংলায় বলি "যে লোকটা …, সে …" আর subject আবার বলি। English-এ who, he-এর জায়গা নেয়: "my uncle, who runs a clinic"।'),
      },
    },
    {
      kind: 'discover',
      title: l('Choosing the relative word', 'Relative word বাছা'),
      items: [
        { en: 'The teacher who helped me lives in Khulna.', note: l('people → who (or that)', 'মানুষ → who (বা that)') },
        { en: 'The book which / that I bought is very useful.', note: l('things → which / that', 'জিনিস → which / that') },
        { en: 'The student whose phone was lost reported it.', note: l('possession → whose', 'মালিকানা → whose') },
        { en: 'This is the café where we first met.', note: l('place → where (= in which)', 'জায়গা → where (= in which)') },
        { en: 'The book (that) I bought is useful.', note: l('that / which can be dropped when it is the object', 'object হলে that / which বাদ দেওয়া যায়') },
      ],
      question: l('What does the relative word replace?', 'Relative word কাকে প্রতিস্থাপন করে?'),
      options: [
        l('A pronoun (he, it, his, there) in the second clause — so that pronoun must not appear again', 'দ্বিতীয় clause-এর একটা pronoun (he, it, his, there) — তাই সেই pronoun আবার আসবে না'),
        l('The verb of the second clause', 'দ্বিতীয় clause-এর verb'),
        l('Nothing — it is added to the clause', 'কিছুই না — এটা clause-এ যোগ হয়'),
      ],
      answer: 0,
      pattern: l('who / which / that replace he / she / it / they; whose replaces his / her / its; where replaces there. Don’t repeat the pronoun: "the man who lives" (not "who he lives"), "the book that I bought" (not "that I bought it").', 'who / which / that, he / she / it / they-এর জায়গা নেয়; whose, his / her / its-এর; where, there-এর। Pronoun আবার দেবেন না: "the man who lives" ("who he lives" না), "the book that I bought" ("that I bought it" না)।'),
    },
    {
      kind: 'concept',
      title: l('Relative clauses step by step', 'Relative clause ধাপে ধাপে'),
      body: l(
        'A relative clause comes right after the noun it describes. The relative word links the clause to that noun and takes the place of a pronoun inside the clause.',
        'Relative clause যে noun-কে বর্ণনা করে তার ঠিক পরে বসে। Relative word clause-টাকে সেই noun-এর সাথে জোড়ে আর clause-এর ভেতরে একটা pronoun-এর জায়গা নেয়।',
      ),
      points: [
        l('who (people), which (things, animals, ideas), that (people or things, in defining clauses), whose (possession: the girl whose father is a pilot), where (places: the town where I live), when (times: the year when I was born).', 'who (মানুষ), which (জিনিস, প্রাণী, ধারণা), that (মানুষ বা জিনিস, defining clause-এ), whose (মালিকানা: the girl whose father is a pilot), where (জায়গা: the town where I live), when (সময়: the year when I was born)।'),
        l('Subject relative: the man who lives next door (who = he). Object relative: the man (who / that) I met (who = him; can be dropped).', 'Subject relative: the man who lives next door (who = he)। Object relative: the man (who / that) I met (who = him; বাদ দেওয়া যায়)।'),
        l('The verb agrees with the noun before who / which: the students who live …, the student who lives …', 'Verb who / which-এর আগের noun-এর সাথে মেলে: the students who live …, the student who lives …'),
        l('NOT: a repeated pronoun (who he, that I bought it, where I live there), which for people, or where for things (the book where I read ✗ → the book in which I read / that I read).', 'না: আবার আসা pronoun (who he, that I bought it, where I live there), মানুষের জন্য which, বা জিনিসের জন্য where (the book where I read ✗ → the book that I read)।'),
        l('Why Bangla speakers slip: Bangla puts the describing clause BEFORE the noun and then repeats it: "যে লোকটা পাশে থাকে, সে ডাক্তার". Translated, this becomes "The man who he lives next door, he is a doctor". English puts the clause after the noun and never repeats the subject.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় বর্ণনার clause noun-এর আগে বসে তারপর আবার বলা হয়: "যে লোকটা পাশে থাকে, সে ডাক্তার"। অনুবাদে হয় "The man who he lives next door, he is a doctor"। English-এ clause noun-এর পরে বসে আর subject কখনো আবার আসে না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'My friend who studies medicine is very busy.', note: l('who = subject', 'who = subject') },
        { en: 'The phone I bought last year is already slow.', note: l('object relative, that dropped', 'object relative, that বাদ') },
        { en: 'Rajshahi is the city where I was born.', note: l('where = in which', 'where = in which') },
        { en: 'I met a woman whose son studies in Japan.', note: l('whose = her', 'whose = her') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'The person I admire most is my grandmother, who taught me to read.', note: l('Part 2: relative clauses add detail naturally.', 'Part 2: relative clause স্বাভাবিকভাবে detail যোগ করে।') },
        { skill: 'writing', example: 'People who live in cities often have less time for exercise.', note: l('Task 2: define the group you are talking about.', 'Task 2: যে দল নিয়ে বলছেন সেটা নির্দিষ্ট করুন।') },
        { skill: 'reading', example: 'Farmers whose land was flooded received compensation.', note: l('Reading: the relative clause tells you WHICH farmers.', 'Reading: relative clause বলে কোন farmer।') },
        { skill: 'listening', example: 'The room where the lecture takes place is on the second floor.', note: l('Listening maps: where identifies the place.', 'Listening map: where জায়গা চিহ্নিত করে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The man who he lives next door is a doctor.', right: 'The man who lives next door is a doctor.', why: l('who is the subject — no he.', 'who-ই subject — he না।') },
        { wrong: 'The laptop that I bought it is fast.', right: 'The laptop that I bought is fast.', why: l('that replaces it — no it.', 'that, it-এর জায়গা নেয় — it না।') },
        { wrong: 'My teacher which helped me is retired.', right: 'My teacher who helped me is retired.', why: l('People → who (or that).', 'মানুষ → who (বা that)।') },
        { wrong: 'This is the village where I was born there.', right: 'This is the village where I was born.', why: l('where replaces there.', 'where, there-এর জায়গা নেয়।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('cx-4-p1', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Choose the relative word.', 'Relative word বেছে নিন।'), sentence: 'The doctor ___ treated my father is very kind.', options: ['who', 'which', 'where'], answer: 'who', explanation: l('A person → who.', 'মানুষ → who।'), why: { which: l('which is for things, not people.', 'which জিনিসের জন্য, মানুষের জন্য না।'), where: l('where is for places.', 'where জায়গার জন্য।') } }),
        choice('cx-4-p2', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The students who passed the test got a certificate.', 'The students who they passed the test got a certificate.', 'The students which passed the test they got a certificate.'], answer: 'The students who passed the test got a certificate.', explanation: l('who = the subject; no repeated they.', 'who = subject; they আবার না।'), why: { 'The students who they passed the test got a certificate.': l('who already is the subject — remove they.', 'who-ই subject — they বাদ দিন।'), 'The students which passed the test they got a certificate.': l('People → who, and "they" repeats the subject.', 'মানুষ → who, আর "they" subject আবার বলে।') } }),
        choice('cx-4-p3', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Choose the relative word.', 'Relative word বেছে নিন।'), sentence: 'I know a boy ___ brother plays for the national team.', options: ['whose', 'who', 'who’s'], answer: 'whose', explanation: l('Possession (his brother) → whose.', 'মালিকানা (his brother) → whose।'), why: { who: l('who would need a verb next: "who plays"; here it is "his brother" → whose.', 'who-র পরে verb লাগে: "who plays"; এখানে "his brother" → whose।'), 'who’s': l('who’s = who is.', 'who’s = who is।') } }),
        choice('cx-4-p4', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Choose the relative word.', 'Relative word বেছে নিন।'), sentence: 'That is the hospital ___ my sister works.', options: ['where', 'which', 'who'], answer: 'where', explanation: l('A place + a full clause (my sister works) → where.', 'জায়গা + পূর্ণ clause (my sister works) → where।'), why: { which: l('"which my sister works" needs "in": "in which my sister works" — or use where.', '"which my sister works"-এ "in" লাগে: "in which my sister works" — বা where দিন।'), who: l('A hospital is a place, not a person.', 'Hospital জায়গা, মানুষ না।') } }),
        choice('cx-4-p5', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The bike I bought last month has already broken.', 'The bike I bought it last month has already broken.', 'The bike where I bought last month has already broken.'], answer: 'The bike I bought last month has already broken.', explanation: l('Object relative: (that) I bought — no it.', 'Object relative: (that) I bought — it না।'), why: { 'The bike I bought it last month has already broken.': l('"it" repeats the object — remove it.', '"it" object আবার বলে — বাদ দিন।'), 'The bike where I bought last month has already broken.': l('where is for places; a bike → that / which (or nothing).', 'where জায়গার জন্য; bike → that / which (বা কিছু না)।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cx-4-r1', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Write who, which, whose or where.', 'who, which, whose বা where লিখুন।'), sentence: 'The café ___ we meet on Fridays has closed.', accepted: ['where'], explanation: l('A place + clause → where.', 'জায়গা + clause → where।'), why: { which: l('"which we meet" is missing "at"; use where.', '"which we meet"-এ "at" নেই; where দিন।') } }),
        gap('cx-4-r2', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Write who, which, whose or where.', 'who, which, whose বা where লিখুন।'), sentence: 'I have a neighbour ___ dog barks all night.', accepted: ['whose'], explanation: l('Possession → whose.', 'মালিকানা → whose।'), why: { who: l('"his dog" → whose dog.', '"his dog" → whose dog।') } }),
        correct('cx-4-r3', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Correct the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'The woman who she teaches us maths is from Sylhet.', accepted: ['The woman who teaches us maths is from Sylhet.'], explanation: l('who is the subject — no she.', 'who-ই subject — she না।') }),
        spot('cx-4-r4', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('One word is wrong. Tap it and type the right one.', 'একটা word ভুল। সেটায় tap করে সঠিকটা লিখুন।'), sentence: 'My cousin which lives in Italy is a chef.', wrong: 'which', accepted: ['who', 'that'], explanation: l('A person → who.', 'মানুষ → who।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cx-4-c1', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Join: "I met a man. He works at the airport."', 'জোড়ুন: "I met a man. He works at the airport."'), options: ['I met a man who works at the airport.', 'I met a man who he works at the airport.', 'I met a man which works at the airport.'], answer: 'I met a man who works at the airport.', explanation: l('who replaces he.', 'who, he-এর জায়গা নেয়।') }),
        spot('cx-4-c2', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'People who lives near the river often fish.', wrong: 'lives', accepted: ['live'], fixOptions: ['live', 'living', 'lived in'], explanation: l('who = people (plural) → live.', 'who = people (plural) → live।') }),
        order('cx-4-c3', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'This is the school where my mother teaches.', explanation: l('place + where + clause.', 'জায়গা + where + clause।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a person you admire', 'এবার আপনার পালা: যাকে শ্রদ্ধা করেন'),
      exercises: [
        write('cx-4-y1', 'cx-relative', {
          ...X,
          prompt: l('Speaking Part 2: "Describe a person you admire." Write 3 sentences using at least three of: who, which / that, whose, where.', 'Speaking Part 2: "Describe a person you admire." এগুলোর অন্তত তিনটা ব্যবহার করে ৩টা sentence লিখুন: who, which / that, whose, where।'),
          model: 'The person I admire most is my aunt, who works as a nurse in Khulna. She works at a hospital where many poor families come for help. She is a woman whose kindness everyone remembers.',
          checklist: [l('who / that for people, which / that for things', 'মানুষে who / that, জিনিসে which / that'), l('no repeated pronoun (who he, that … it)', 'আবার আসা pronoun না (who he, that … it)'), l('whose for possession, where for places', 'মালিকানায় whose, জায়গায় where')],
          explanation: l('The relative word replaces the pronoun — don’t say it twice.', 'Relative word pronoun-এর জায়গা নেয় — দুইবার বলবেন না।'),
          task: 'The student writes 3 sentences describing a person they admire using relative clauses. Check relative clauses only: who / that for people, which / that for things, whose for possession, where for places (never where for things), when for times; the relative word replaces a pronoun, so no repeated subject or object (who he, that I bought it, where I live there); the verb in the clause agrees with the noun before who / which; the clause comes right after the noun it describes. For each issue quote the words, name the rule, and give the fix.',
          target: l('who, which, whose, where — no repeated pronoun', 'who, which, whose, where — pronoun আবার না'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('who = people · which = things · that = both · whose = possession · where = places.', 'who = মানুষ · which = জিনিস · that = দুটোই · whose = মালিকানা · where = জায়গা।'),
        l('The relative word replaces he / it / his / there — never repeat them.', 'Relative word he / it / his / there-এর জায়গা নেয় — এগুলো আবার দেবেন না।'),
        l('The clause goes right after its noun; the verb agrees with that noun.', 'Clause তার noun-এর ঠিক পরে বসে; verb সেই noun-এর সাথে মেলে।'),
      ],
    },
  ],
};

// ======================================================================= cx-5
export const cxRelativeComma: Lesson = {
  id: 'cx-5',
  format: 'v2',
  concept: 'cx-relative-comma',
  title: l('Relative clauses with and without commas', 'Comma-সহ আর comma-ছাড়া relative clause'),
  why: l('Commas change the meaning of a relative clause. Using them correctly — and shortening clauses with -ing / -ed — is what makes Task 2 sentences look Band 7.', 'Comma relative clause-এর অর্থ বদলে দেয়। এগুলো ঠিকমতো ব্যবহার — আর -ing / -ed দিয়ে clause ছোট করা — Task 2 sentence-কে Band 7-এর মতো করে।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('Two sentences, two meanings', 'দুটো sentence, দুটো অর্থ'),
      situation: l('A: "My brother who lives in Dubai is an engineer." B: "My brother, who lives in Dubai, is an engineer."', 'A: "My brother who lives in Dubai is an engineer." B: "My brother, who lives in Dubai, is an engineer."'),
      question: l('What is the difference?', 'পার্থক্য কী?'),
      options: ['A suggests you have more than one brother; B says you have one, and adds extra information', 'There is no difference', 'A is always wrong'],
      answer: 'A suggests you have more than one brother; B says you have one, and adds extra information',
      diagnose: {
        'A suggests you have more than one brother; B says you have one, and adds extra information': l('Right. No commas = defining (tells you WHICH brother). Commas = extra information about the only brother.', 'ঠিক। Comma নেই = defining (বলে কোন brother)। Comma আছে = একমাত্র brother সম্পর্কে বাড়তি তথ্য।'),
        'There is no difference': l('Commas change the meaning: without them, the clause identifies which brother; with them, it adds a fact about your only brother.', 'Comma অর্থ বদলায়: না থাকলে clause বলে কোন brother; থাকলে একমাত্র brother সম্পর্কে একটা তথ্য যোগ করে।'),
        'A is always wrong': l('A is correct if you have several brothers and mean the one in Dubai.', 'অনেক brother থাকলে আর Dubai-এরটা বোঝালে A ঠিক।'),
      },
    },
    {
      kind: 'discover',
      title: l('Defining or extra?', 'Defining নাকি বাড়তি?'),
      items: [
        { en: 'Students who work part-time have less time to study.', note: l('defining: which students? no commas', 'defining: কোন student? comma না') },
        { en: 'Dhaka, which is the capital, is very crowded.', note: l('extra: only one Dhaka → commas', 'বাড়তি: Dhaka একটাই → comma') },
        { en: 'Dhaka, which is the capital, … (NOT: Dhaka, that is the capital, …)', note: l('no "that" after a comma', 'comma-র পরে "that" না') },
        { en: 'Prices rose sharply, which surprised everyone.', note: l(', which = the whole previous idea', ', which = আগের পুরো idea') },
      ],
      question: l('When do you use commas?', 'কখন comma দেবেন?'),
      options: [
        l('When the clause adds extra information about a noun that is already clear (a name, the only one)', 'যখন clause এমন noun সম্পর্কে বাড়তি তথ্য দেয় যেটা আগেই পরিষ্কার (নাম, একমাত্রটা)'),
        l('Whenever the clause is long', 'যখনই clause লম্বা'),
        l('Only with who', 'শুধু who-এর সাথে'),
      ],
      answer: 0,
      pattern: l('Defining clause (which one?) → no commas, that is fine. Non-defining clause (extra fact) → commas on both sides, who / which only — never that.', 'Defining clause (কোনটা?) → comma না, that চলে। Non-defining clause (বাড়তি তথ্য) → দুই পাশে comma, শুধু who / which — কখনো that না।'),
    },
    {
      kind: 'concept',
      title: l('Commas, that, and shortened clauses', 'Comma, that আর ছোট করা clause'),
      body: l(
        'Relative clauses are either defining (they tell you which one) or non-defining (they add information). The difference is shown with commas.',
        'Relative clause হয় defining (বলে কোনটা) নয়তো non-defining (তথ্য যোগ করে)। পার্থক্য comma দিয়ে দেখানো হয়।',
      ),
      points: [
        l('Defining: no commas; who / which / that; the relative word can be dropped if it is the object: The course (that) I chose is hard.', 'Defining: comma না; who / which / that; object হলে relative word বাদ দেওয়া যায়: The course (that) I chose is hard।'),
        l('Non-defining: commas on both sides (or a comma + full stop at the end); who / which / whose / where; never that; never dropped: Sylhet, which is famous for tea, …', 'Non-defining: দুই পাশে comma (বা শেষে comma + full stop); who / which / whose / where; কখনো that না; কখনো বাদ না: Sylhet, which is famous for tea, …'),
        l(', which can refer to the whole previous clause: Many shops closed, which hurt local jobs.', ', which আগের পুরো clause-কে বোঝাতে পারে: Many shops closed, which hurt local jobs।'),
        l('Shortened clauses: who live → living (People living in cities…); which was built → built (a bridge built in 1998…). Only when the relative word is the subject.', 'ছোট করা clause: who live → living (People living in cities…); which was built → built (a bridge built in 1998…)। শুধু relative word subject হলে।'),
        l('Why Bangla speakers slip: Bangla uses commas freely and has no defining / non-defining split, so commas appear at random around who / which, and "that" follows a comma. Ask: does the clause tell me WHICH one?', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় comma স্বাধীনভাবে বসে আর defining / non-defining ভাগ নেই, তাই who / which-এর চারপাশে এলোমেলো comma আসে, আর comma-র পরে "that" বসে। জিজ্ঞেস করুন: clause কি বলে কোনটা?'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'The bus that goes to Gazipur leaves at six.', note: l('defining: which bus', 'defining: কোন bus') },
        { en: 'My mother, who is a teacher, loves reading.', note: l('non-defining: extra fact', 'non-defining: বাড়তি তথ্য') },
        { en: 'The Padma Bridge, which opened in 2022, cut travel time.', note: l('non-defining + which', 'non-defining + which') },
        { en: 'Children living in rural areas walk far to school.', note: l('shortened: who live → living', 'ছোট করা: who live → living') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Remote work, which became common during the pandemic, has changed city life.', note: l('Task 2: a non-defining clause adds background.', 'Task 2: non-defining clause পটভূমি যোগ করে।') },
        { skill: 'listening', example: 'The tour, which lasts two hours, starts at the main gate.', note: l('Listening: the extra detail between commas is often the answer (two hours).', 'Listening: comma-র মাঝের বাড়তি তথ্য প্রায়ই উত্তর (two hours)।') },
        { skill: 'reading', example: 'The Sundarbans, which is the largest mangrove forest, is home to the Bengal tiger.', note: l('Reading: the part between commas is extra — the main idea is outside it.', 'Reading: comma-র মাঝের অংশ বাড়তি — মূল idea বাইরে।') },
        { skill: 'speaking', example: 'I grew up in Bogura, which is famous for its yoghurt.', note: l('Part 1: , which adds an interesting detail.', 'Part 1: , which একটা মজার detail যোগ করে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Cox’s Bazar, that has a long beach, is popular.', right: 'Cox’s Bazar, which has a long beach, is popular.', why: l('No that after a comma → which.', 'comma-র পরে that না → which।') },
        { wrong: 'My father who is a farmer grows rice. (you have one father)', right: 'My father, who is a farmer, grows rice.', why: l('Only one father → extra information → commas.', 'বাবা একজনই → বাড়তি তথ্য → comma।') },
        { wrong: 'Students, who study hard, pass. (you mean only those students)', right: 'Students who study hard pass.', why: l('Defining (which students?) → no commas.', 'Defining (কোন student?) → comma না।') },
        { wrong: 'People who living in cities are busy.', right: 'People living in cities are busy. / People who live in cities are busy.', why: l('Either the full clause or the -ing form — not both.', 'হয় পূর্ণ clause নয়তো -ing form — দুটো একসাথে না।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('cx-5-p1', 'cx-relative-comma', { ...X, pattern: 'cx-comma', prompt: l('Choose the correctly punctuated sentence.', 'সঠিক punctuation-এর sentence বেছে নিন।'), options: ['Sylhet, which is in the north-east, is famous for tea.', 'Sylhet which is in the north-east is famous for tea.', 'Sylhet, that is in the north-east, is famous for tea.'], answer: 'Sylhet, which is in the north-east, is famous for tea.', explanation: l('A name → extra information → commas + which.', 'নাম → বাড়তি তথ্য → comma + which।'), why: { 'Sylhet which is in the north-east is famous for tea.': l('There is only one Sylhet — the clause adds extra information → commas.', 'Sylhet একটাই — clause বাড়তি তথ্য দেয় → comma।'), 'Sylhet, that is in the north-east, is famous for tea.': l('Never "that" after a comma.', 'Comma-র পরে কখনো "that" না।') } }),
        choice('cx-5-p2', 'cx-relative-comma', { ...X, pattern: 'cx-comma', prompt: l('Choose the correct sentence (you mean only some drivers).', 'সঠিক sentence বেছে নিন (শুধু কিছু driver বোঝাচ্ছেন)।'), options: ['Drivers who use their phones cause accidents.', 'Drivers, who use their phones, cause accidents.', 'Drivers, that use their phones cause accidents.'], answer: 'Drivers who use their phones cause accidents.', explanation: l('Defining (which drivers?) → no commas.', 'Defining (কোন driver?) → comma না।'), why: { 'Drivers, who use their phones, cause accidents.': l('With commas, it says ALL drivers use their phones.', 'Comma দিলে বোঝায় সব driver phone ব্যবহার করে।'), 'Drivers, that use their phones cause accidents.': l('No that after a comma, and the meaning needs no commas.', 'Comma-র পরে that না, আর অর্থের জন্য comma লাগে না।') } }),
        choice('cx-5-p3', 'cx-relative-comma', { ...X, pattern: 'cx-comma', prompt: l('Choose the relative word.', 'Relative word বেছে নিন।'), sentence: 'The bridge collapsed, ___ caused huge traffic jams.', options: ['which', 'that', 'what'], answer: 'which', explanation: l(', which = the whole previous event.', ', which = আগের পুরো ঘটনা।'), why: { that: l('No that after a comma.', 'Comma-র পরে that না।'), what: l('what is not a relative word after a noun or clause.', 'what noun বা clause-এর পরে relative word না।') } }),
        choice('cx-5-p4', 'cx-relative-comma', { ...X, pattern: 'cx-relative-form', prompt: l('Choose the shortened form.', 'ছোট করা form বেছে নিন।'), sentence: 'Families ___ near the river were moved to safety.', options: ['living', 'who living', 'lived'], answer: 'living', explanation: l('who live → living.', 'who live → living।'), why: { 'who living': l('Either "who live" or "living" — not both.', 'হয় "who live" নয়তো "living" — দুটো একসাথে না।'), lived: l('"lived" would be a passive meaning (were lived) — use living.', '"lived" passive অর্থ দেয় — living দিন।') } }),
        choice('cx-5-p5', 'cx-relative-comma', { ...X, pattern: 'cx-relative-form', prompt: l('Choose the shortened form.', 'ছোট করা form বেছে নিন।'), sentence: 'The mosque, ___ in the 15th century, attracts many visitors.', options: ['built', 'building', 'which built'], answer: 'built', explanation: l('which was built → built (passive → -ed).', 'which was built → built (passive → -ed)।'), why: { building: l('The mosque did not build anything; it was built → built.', 'Mosque কিছু বানায়নি; বানানো হয়েছে → built।'), 'which built': l('"which built" means the mosque built something; you need "which was built" or "built".', '"which built" মানে mosque কিছু বানিয়েছে; "which was built" বা "built" লাগে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cx-5-r1', 'cx-relative-comma', { ...X, pattern: 'cx-comma', prompt: l('Write who or which (after a comma).', 'who বা which লিখুন (comma-র পরে)।'), sentence: 'My grandfather, ___ is 85, still walks every day.', accepted: ['who'], explanation: l('A person, extra information → who.', 'মানুষ, বাড়তি তথ্য → who।'), why: { that: l('Never that after a comma.', 'Comma-র পরে কখনো that না।'), which: l('A person → who.', 'মানুষ → who।') } }),
        gap('cx-5-r2', 'cx-relative-comma', { ...X, pattern: 'cx-relative-form', prompt: l('Write the -ing form of the verb in brackets.', 'বন্ধনীর verb-এর -ing form লিখুন।'), sentence: 'Students ___ (want) to join must register by Friday.', base: 'want', accepted: ['wanting'], explanation: l('who want → wanting.', 'who want → wanting।'), why: { want: l('Without who, use the -ing form: wanting.', 'who ছাড়া -ing form: wanting।') } }),
        correct('cx-5-r3', 'cx-relative-comma', { ...X, pattern: 'cx-comma', prompt: l('Correct the relative word after the comma.', 'Comma-র পরের relative word ঠিক করুন।'), sentence: 'The metro, that opened last year, is always busy.', accepted: ['The metro, which opened last year, is always busy.'], explanation: l('No that after a comma → which.', 'Comma-র পরে that না → which।') }),
        spot('cx-5-r4', 'cx-relative-comma', { ...X, pattern: 'cx-relative-form', prompt: l('One word is wrong. Tap it and type the right one.', 'একটা word ভুল। সেটায় tap করে সঠিকটা লিখুন।'), sentence: 'Goods making in Bangladesh are sold worldwide.', wrong: 'making', accepted: ['made'], explanation: l('which are made → made (passive).', 'which are made → made (passive)।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cx-5-c1', 'cx-relative-comma', { ...X, pattern: 'cx-comma', prompt: l('"The students, who failed the test, took it again." What does it mean?', '"The students, who failed the test, took it again." এর মানে কী?'), options: ['All the students failed and took it again', 'Only some students failed and took it again', 'Nobody failed'], answer: 'All the students failed and took it again', explanation: l('Commas = extra information about ALL the students.', 'Comma = সব student সম্পর্কে বাড়তি তথ্য।') }),
        spot('cx-5-c2', 'cx-relative-comma', { ...X, pattern: 'cx-comma', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Rajshahi, that is famous for mangoes, is in the north-west.', wrong: 'that', accepted: ['which'], fixOptions: ['which', 'who', 'where'], explanation: l('No that after a comma → which.', 'Comma-র পরে that না → which।') }),
        order('cx-5-c3', 'cx-relative-comma', { ...X, pattern: 'cx-relative-form', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'People living in villages often grow their own food.', explanation: l('Shortened clause: who live → living.', 'ছোট করা clause: who live → living।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your city', 'এবার আপনার পালা: আপনার শহর'),
      exercises: [
        write('cx-5-y1', 'cx-relative-comma', {
          ...X,
          prompt: l('Write 3 sentences about your home town: one non-defining clause (with commas), one defining clause (no commas), and one shortened clause (-ing or -ed).', 'আপনার নিজের শহর নিয়ে ৩টা sentence লিখুন: একটা non-defining clause (comma-সহ), একটা defining clause (comma ছাড়া), আর একটা ছোট করা clause (-ing বা -ed)।'),
          model: 'Bogura, which is in the north of Bangladesh, is famous for its yoghurt. The shop that sells the best yoghurt is near the station. Tourists visiting the town usually buy some to take home.',
          checklist: [l('non-defining: commas + who / which (never that)', 'non-defining: comma + who / which (কখনো that না)'), l('defining: no commas', 'defining: comma না'), l('shortened: -ing (active) / -ed (passive), no who', 'ছোট করা: -ing (active) / -ed (passive), who না')],
          explanation: l('Commas = extra information; no commas = which one.', 'Comma = বাড়তি তথ্য; comma না = কোনটা।'),
          task: 'The student writes 3 sentences about their home town using a non-defining relative clause, a defining relative clause and a shortened (-ing / -ed) clause. Check relative clauses and their punctuation only: non-defining clauses (extra information about a name or a unique noun) need commas on both sides and use who / which / whose / where, never that; defining clauses (which one?) have no commas; ", which" may refer to a whole clause; shortened clauses use -ing for active meaning and -ed for passive meaning with no relative word (not "who living"); no repeated pronoun. For each issue quote the words, say whether the clause is defining or non-defining, and give the fix.',
          target: l('Commas in relative clauses; -ing / -ed', 'Relative clause-এ comma; -ing / -ed'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Which one? → no commas (that is fine). Extra fact → commas + who / which.', 'কোনটা? → comma না (that চলে)। বাড়তি তথ্য → comma + who / which।'),
        l('Never "that" after a comma · ", which" can mean the whole idea.', 'Comma-র পরে কখনো "that" না · ", which" পুরো idea বোঝাতে পারে।'),
        l('Shorten: who live → living · which was built → built.', 'ছোট করুন: who live → living · which was built → built।'),
      ],
    },
  ],
};

// ======================================================================= cx-6
export const cxNounClauses: Lesson = {
  id: 'cx-6',
  format: 'v2',
  concept: 'cx-noun-clause',
  title: l('Noun clauses and indirect questions', 'Noun clause আর indirect question'),
  why: l('"Can you tell me where is the library?" and "I don’t know what should I do" sound natural in Bangla-English — but the word order is wrong. Noun clauses fix this and add range.', '"Can you tell me where is the library?" আর "I don’t know what should I do" বাংলা-English-এ স্বাভাবিক শোনায় — কিন্তু word order ভুল। Noun clause এটা ঠিক করে আর range বাড়ায়।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'speaking',
  steps: [
    {
      kind: 'hook',
      title: l('Asking for directions', 'রাস্তা জিজ্ঞেস করা'),
      situation: l('At a university in London you ask: "Excuse me, could you tell me ___?"', 'London-এর একটা university-তে আপনি জিজ্ঞেস করলেন: "Excuse me, could you tell me ___?"'),
      question: l('Which ending is correct?', 'কোন শেষটা ঠিক?'),
      options: ['where the library is', 'where is the library', 'where does the library is'],
      answer: 'where the library is',
      diagnose: {
        'where the library is': l('Right. Inside another sentence, a question becomes a statement: question word + subject + verb (where the library is).', 'ঠিক। অন্য sentence-এর ভেতরে প্রশ্ন statement হয়ে যায়: question word + subject + verb (where the library is)।'),
        'where is the library': l('That is direct-question order. After "Could you tell me…", "I don’t know…", "I wonder…", use statement order: where the library is.', 'এটা সরাসরি প্রশ্নের order। "Could you tell me…", "I don’t know…", "I wonder…"-এর পরে statement order: where the library is।'),
        'where does the library is': l('No do / does in an indirect question, and "does … is" is never correct.', 'Indirect question-এ do / does না, আর "does … is" কখনো ঠিক না।'),
      },
    },
    {
      kind: 'discover',
      title: l('From question to clause', 'প্রশ্ন থেকে clause'),
      items: [
        { en: 'Where does she live? → I don’t know where she lives.', note: l('no does; subject + verb', 'does না; subject + verb') },
        { en: 'What should I do? → I’m not sure what I should do.', note: l('should after the subject', 'subject-এর পরে should') },
        { en: 'Is the shop open? → Do you know if / whether the shop is open?', note: l('yes / no question → if / whether', 'হ্যাঁ / না প্রশ্ন → if / whether') },
        { en: 'I think (that) online learning is useful.', note: l('that-clause as the object', 'object হিসেবে that-clause') },
      ],
      question: l('What happens to the word order?', 'Word order-এর কী হয়?'),
      options: [
        l('It becomes statement order: question word / if + subject + verb, with no do / does / did', 'Statement order হয়ে যায়: question word / if + subject + verb, do / does / did ছাড়া'),
        l('It stays the same as the question', 'প্রশ্নের মতোই থাকে'),
        l('The verb goes to the end of the sentence', 'Verb sentence-এর শেষে চলে যায়'),
      ],
      answer: 0,
      pattern: l('Indirect question = question word (or if / whether) + subject + verb. Remove do / does / did, and put be / modals after the subject: where the station is, what I should do, if it is open.', 'Indirect question = question word (বা if / whether) + subject + verb। do / does / did বাদ দিন, আর be / modal subject-এর পরে: where the station is, what I should do, if it is open।'),
    },
    {
      kind: 'concept',
      title: l('Noun clauses', 'Noun clause'),
      body: l(
        'A noun clause does the job of a noun: it can be the object (I know that …), the subject (What she said surprised me) or follow a preposition (I’m worried about what will happen).',
        'Noun clause noun-এর কাজ করে: object হতে পারে (I know that …), subject হতে পারে (What she said surprised me), বা preposition-এর পরে বসতে পারে (I’m worried about what will happen)।',
      ),
      points: [
        l('that-clauses after think, believe, say, agree, it is clear / true: I believe (that) education is a right. "that" can often be dropped.', 'think, believe, say, agree, it is clear / true-এর পরে that-clause: I believe (that) education is a right। "that" প্রায়ই বাদ দেওয়া যায়।'),
        l('wh-clauses: what / where / when / why / how + subject + verb: I don’t understand why prices keep rising.', 'wh-clause: what / where / when / why / how + subject + verb: I don’t understand why prices keep rising।'),
        l('if / whether for yes / no: I’m not sure whether the course is worth it. "whether … or not" is common in Task 2.', 'হ্যাঁ / না-র জন্য if / whether: I’m not sure whether the course is worth it। Task 2-এ "whether … or not" common।'),
        l('No question mark after an indirect statement: I wonder where he is. (But: Could you tell me where he is? — the question is "Could you…".)', 'Indirect statement-এর পরে প্রশ্নবোধক চিহ্ন না: I wonder where he is। (কিন্তু: Could you tell me where he is? — প্রশ্নটা "Could you…"।)'),
        l('Why Bangla speakers slip: Bangla keeps the same word order in "স্টেশন কোথায়?" and "জানি না স্টেশন কোথায়", so English learners keep question order ("where is the station") inside statements.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় "স্টেশন কোথায়?" আর "জানি না স্টেশন কোথায়"-এ একই word order থাকে, তাই English-এও statement-এর ভেতরে প্রশ্নের order থেকে যায় ("where is the station")।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'Do you know what time the bank opens?', note: l('what time + subject + verb (opens)', 'what time + subject + verb (opens)') },
        { en: 'I can’t remember where I parked the car.', note: l('where + I + parked', 'where + I + parked') },
        { en: 'The question is whether cities can grow without harming nature.', note: l('whether-clause after "is"', '"is"-এর পরে whether-clause') },
        { en: 'What surprised me was how friendly people were.', note: l('noun clauses as subject and complement', 'subject আর complement হিসেবে noun clause') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'I’m not sure what I’ll study yet, but I know that I want to work abroad.', note: l('Part 1 / 3: noun clauses express uncertainty and opinions naturally.', 'Part 1 / 3: noun clause অনিশ্চয়তা আর মতামত স্বাভাবিকভাবে প্রকাশ করে।') },
        { skill: 'writing', example: 'It is unclear whether banning cars would reduce pollution.', note: l('Task 2: It is + adjective + whether / that-clause.', 'Task 2: It is + adjective + whether / that-clause।') },
        { skill: 'reading', example: 'Researchers still do not know why the birds left the island.', note: l('Reading: the noun clause often holds the key information.', 'Reading: noun clause-এ প্রায়ই মূল তথ্য থাকে।') },
        { skill: 'listening', example: 'Can you tell me how much the course costs?', note: l('Listening: polite indirect questions in form-filling dialogues.', 'Listening: form পূরণের কথোপকথনে ভদ্র indirect question।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Can you tell me where is the post office?', right: 'Can you tell me where the post office is?', why: l('Statement order: subject + verb.', 'Statement order: subject + verb।') },
        { wrong: 'I don’t know what should I do.', right: 'I don’t know what I should do.', why: l('Modal after the subject.', 'Subject-এর পরে modal।') },
        { wrong: 'I wonder where does he live.', right: 'I wonder where he lives.', why: l('No does; he lives.', 'does না; he lives।') },
        { wrong: 'I asked him that if he was coming.', right: 'I asked him if he was coming.', why: l('Yes / no → if / whether (no that).', 'হ্যাঁ / না → if / whether (that না)।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('cx-6-p1', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Choose the correct ending.', 'সঠিক শেষটা বেছে নিন।'), sentence: 'Do you know when ___?', options: ['the train leaves', 'does the train leave', 'leaves the train'], answer: 'the train leaves', explanation: l('when + subject + verb (no does).', 'when + subject + verb (does না)।'), why: { 'does the train leave': l('Inside "Do you know…", use statement order with no does.', '"Do you know…"-এর ভেতরে statement order, does ছাড়া।'), 'leaves the train': l('The subject (the train) comes before the verb.', 'Subject (the train) verb-এর আগে বসে।') } }),
        choice('cx-6-p2', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['I’m not sure what I should wear to the interview.', 'I’m not sure what should I wear to the interview.', 'I’m not sure what do I wear to the interview.'], answer: 'I’m not sure what I should wear to the interview.', explanation: l('what + subject + modal + verb.', 'what + subject + modal + verb।'), why: { 'I’m not sure what should I wear to the interview.': l('Question order (should I) inside a statement → I should.', 'Statement-এর ভেতরে প্রশ্নের order (should I) → I should।'), 'I’m not sure what do I wear to the interview.': l('No do in an indirect question.', 'Indirect question-এ do না।') } }),
        choice('cx-6-p3', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: 'Could you tell me ___ the museum is open on Fridays?', options: ['whether', 'that', 'what'], answer: 'whether', explanation: l('A yes / no question → whether / if.', 'হ্যাঁ / না প্রশ্ন → whether / if।'), why: { that: l('that introduces a statement, not a yes / no question.', 'that statement আনে, হ্যাঁ / না প্রশ্ন না।'), what: l('"what the museum is open" makes no sense: it is a yes / no question.', '"what the museum is open" অর্থহীন: এটা হ্যাঁ / না প্রশ্ন।') } }),
        choice('cx-6-p4', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'I wonder ___ .', options: ['how much this phone costs', 'how much does this phone cost', 'how much costs this phone'], answer: 'how much this phone costs', explanation: l('how much + subject + verb (costs).', 'how much + subject + verb (costs)।'), why: { 'how much does this phone cost': l('Question order inside a statement — remove does, add -s.', 'Statement-এর ভেতরে প্রশ্নের order — does বাদ দিন, -s যোগ করুন।'), 'how much costs this phone': l('The subject (this phone) goes before the verb.', 'Subject (this phone) verb-এর আগে।') } }),
        choice('cx-6-p5', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Task 2: choose the best sentence.', 'Task 2: সবচেয়ে ভালো sentence বেছে নিন।'), options: ['It is not clear whether these measures will reduce crime.', 'It is not clear that whether these measures will reduce crime.', 'It is not clear will these measures reduce crime.'], answer: 'It is not clear whether these measures will reduce crime.', explanation: l('It is clear / not clear + whether-clause (statement order).', 'It is clear / not clear + whether-clause (statement order)।'), why: { 'It is not clear that whether these measures will reduce crime.': l('Use that OR whether, not both.', 'that অথবা whether, দুটো একসাথে না।'), 'It is not clear will these measures reduce crime.': l('A noun clause needs whether / if and statement order.', 'Noun clause-এ whether / if আর statement order লাগে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cx-6-r1', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Write if or that.', 'if বা that লিখুন।'), sentence: 'I asked the teacher ___ I could leave early.', accepted: ['if', 'whether'], explanation: l('A yes / no question → if / whether.', 'হ্যাঁ / না প্রশ্ন → if / whether।'), why: { that: l('"Could I leave early?" is a yes / no question → if.', '"Could I leave early?" হ্যাঁ / না প্রশ্ন → if।') } }),
        gap('cx-6-r2', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Write the missing verb (one word) in statement order.', 'Statement order-এ বাদ পড়া verb লিখুন (একটা word)।'), sentence: 'Can you tell me where the nearest pharmacy ___?', accepted: ['is'], explanation: l('where + subject + verb: where the pharmacy is.', 'where + subject + verb: where the pharmacy is।') }),
        correct('cx-6-r3', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Correct the word order.', 'Word order ঠিক করুন।'), sentence: 'I don’t know why is he angry.', accepted: ['I don’t know why he is angry.', "I don't know why he is angry.", 'I do not know why he is angry.'], explanation: l('why + subject + verb.', 'why + subject + verb।') }),
        correct('cx-6-r4', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Correct the sentence (remove one word, change one form).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন, একটা form বদলান)।'), sentence: 'Do you know where does she work?', accepted: ['Do you know where she works?'], explanation: l('No does; she works.', 'does না; she works।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cx-6-c1', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Change "Why did the shop close?" into: "Nobody knows …"', '"Why did the shop close?" থেকে লিখুন: "Nobody knows …"'), options: ['Nobody knows why the shop closed.', 'Nobody knows why did the shop close.', 'Nobody knows why the shop did close?'], answer: 'Nobody knows why the shop closed.', explanation: l('Remove did; put the verb in the past: closed.', 'did বাদ দিন; verb past-এ: closed।') }),
        spot('cx-6-c2', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'I am not sure that the exam is on Monday or Tuesday.', wrong: 'that', accepted: ['whether', 'if'], fixOptions: ['whether', 'what', 'which'], explanation: l('A choice (Monday or Tuesday) → whether.', 'একটা বাছাই (Monday or Tuesday) → whether।') }),
        order('cx-6-c3', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Could you tell me how long the journey takes?', explanation: l('how long + subject + verb.', 'how long + subject + verb।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: plans you are unsure about', 'এবার আপনার পালা: যে পরিকল্পনা নিয়ে নিশ্চিত না'),
      exercises: [
        write('cx-6-y1', 'cx-noun-clause', {
          ...X,
          prompt: l('Speaking Part 3: "Do you think you will live abroad one day?" Write 3 sentences using a that-clause, a wh-clause (what / where / why) and whether.', 'Speaking Part 3: "Do you think you will live abroad one day?" একটা that-clause, একটা wh-clause (what / where / why) আর whether ব্যবহার করে ৩টা sentence লিখুন।'),
          model: 'I think that I will study abroad for a few years. I don’t know yet where I will go, but Canada is my first choice. I am not sure whether I will stay there after my degree.',
          checklist: [l('that-clause after think / believe', 'think / believe-এর পরে that-clause'), l('wh-word + subject + verb (no do / does)', 'wh-word + subject + verb (do / does না)'), l('whether / if for yes / no', 'হ্যাঁ / না-র জন্য whether / if')],
          explanation: l('Inside a statement, questions take statement order.', 'Statement-এর ভেতরে প্রশ্ন statement order নেয়।'),
          task: 'The student writes 3 sentences about living abroad using a that-clause, a wh-clause and whether. Check noun clauses only: statement word order after the question word (where I will go, not "where will I go"; what she does, not "what does she do"); no do / does / did in indirect questions; if / whether for yes / no questions, never "that if"; that-clauses after think / believe / know / it is clear (that is optional); no question mark after an indirect statement (I wonder where …). For each issue quote the words, name the rule and give the fix.',
          target: l('Noun clauses: statement word order', 'Noun clause: statement word order'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Inside a sentence, questions become statements: where the station is.', 'Sentence-এর ভেতরে প্রশ্ন statement হয়: where the station is।'),
        l('No do / does / did · modal after the subject: what I should do.', 'do / does / did না · subject-এর পরে modal: what I should do।'),
        l('Yes / no → if / whether · opinions → that-clause.', 'হ্যাঁ / না → if / whether · মতামত → that-clause।'),
      ],
    },
  ],
};

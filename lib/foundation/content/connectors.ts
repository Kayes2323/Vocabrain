import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Connectors (Foundation module 7), the six concept lessons in the v2
 * (problem-first) format, easy → hard:
 * cn-1 adding: and, also, too, as well as, in addition, moreover
 * cn-2 contrast: but, however, although, whereas, despite, on the other hand
 * cn-3 cause and result: because, since, due to, so, therefore, as a result
 * cn-4 examples, order and conclusions: for example, such as, firstly, finally, in conclusion, overall
 * cn-5 grammar of connectors: conjunction vs sentence connector vs preposition; punctuation
 * cn-6 natural linking: this / these / which, avoiding mechanical overuse
 * Bangla joins ideas with pairs (যদিও … কিন্তু, যেহেতু … তাই) and starts
 * sentences with কারণ, so every lesson names why Bangla speakers slip.
 * The Parts of Speech unit (pcj-*) is the short introduction to and / but /
 * because; this module teaches meaning, position and natural use.
 * Original Mino content.
 */

export const CONNECTOR_CONCEPTS: Concept[] = [
  { id: 'conn-add', title: l('Adding ideas: also, in addition, moreover', 'Idea যোগ: also, in addition, moreover'), lessonId: 'cn-1', tag: 'connector' },
  { id: 'conn-contrast', title: l('Contrast: however, although, whereas, despite', 'বিপরীত: however, although, whereas, despite'), lessonId: 'cn-2', tag: 'connector' },
  { id: 'conn-cause', title: l('Cause and result: because, due to, therefore', 'কারণ আর ফলাফল: because, due to, therefore'), lessonId: 'cn-3', tag: 'connector' },
  { id: 'conn-example', title: l('Examples, order and conclusions', 'উদাহরণ, ক্রম আর উপসংহার'), lessonId: 'cn-4', tag: 'connector' },
  { id: 'conn-grammar', title: l('Position and punctuation of connectors', 'Connector-এর জায়গা আর punctuation'), lessonId: 'cn-5', tag: 'connector' },
  { id: 'conn-cohesion', title: l('Natural linking: this, which, fewer connectors', 'স্বাভাবিক linking: this, which, কম connector'), lessonId: 'cn-6', tag: 'connector' },
];

const C = { tag: 'connector' as const };

// ======================================================================= cn-1
export const connAdd: Lesson = {
  id: 'cn-1',
  format: 'v2',
  concept: 'conn-add',
  title: l('Adding ideas: also, in addition, moreover', 'Idea যোগ: also, in addition, moreover'),
  why: l('Task 2 body paragraphs add reasons and examples. Using only "and" sounds basic; using "Moreover" in every sentence sounds mechanical.', 'Task 2 body paragraph-এ কারণ আর উদাহরণ যোগ করতে হয়। শুধু "and" দিলে সাধারণ শোনায়; প্রতিটা sentence-এ "Moreover" দিলে যন্ত্রের মতো শোনায়।'),
  minutes: 9,
  difficulty: 'easy',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 2 body paragraph', 'একটা Task 2 body paragraph'),
      situation: l('You want to give a second advantage of living in a city. You write: "Cities have better hospitals. ___, they offer more jobs."', 'শহরে থাকার দ্বিতীয় সুবিধা দিতে চান। আপনি লিখলেন: "Cities have better hospitals. ___, they offer more jobs."'),
      question: l('Which word fits the gap best?', 'Gap-এ কোন word সবচেয়ে ভালো বসে?'),
      options: ['In addition', 'And', 'Also,'],
      answer: 'In addition',
      diagnose: {
        'In addition': l('Right. "In addition," starts a new sentence and adds a second point — formal and clear for Task 2.', 'ঠিক। "In addition," নতুন sentence শুরু করে দ্বিতীয় point যোগ করে — Task 2-এর জন্য formal আর পরিষ্কার।'),
        'And': l('"And" joins two parts inside ONE sentence. Starting a formal sentence with "And," is not good in Task 2: use "In addition," or join: "Cities have better hospitals and more jobs."', '"And" একটা sentence-এর ভেতরে দুটো অংশ জোড়ে। Task 2-এ formal sentence "And," দিয়ে শুরু করা ভালো না: "In addition," দিন বা জোড়া দিন: "Cities have better hospitals and more jobs."'),
        'Also,': l('"Also" usually goes inside the sentence, before the main verb: "They also offer more jobs." "Also," at the start is informal.', '"Also" সাধারণত sentence-এর ভেতরে, মূল verb-এর আগে বসে: "They also offer more jobs." শুরুতে "Also," informal।'),
      },
    },
    {
      kind: 'discover',
      title: l('Where do adding words go?', 'যোগ করার word কোথায় বসে?'),
      items: [
        { en: 'Cities are noisy and crowded.', note: l('and: inside one sentence', 'and: একটা sentence-এর ভেতরে') },
        { en: 'Cities are also more expensive.', note: l('also: before the main verb (after be)', 'also: মূল verb-এর আগে (be-এর পরে)') },
        { en: 'Villages are quiet. They are cheaper, too.', note: l('too / as well: at the end', 'too / as well: শেষে') },
        { en: 'In addition, / Moreover, / Furthermore, rent is lower.', note: l('sentence connectors: at the start + comma', 'sentence connector: শুরুতে + comma') },
        { en: 'As well as being cheap, villages are safe.', note: l('as well as + noun / -ing', 'as well as + noun / -ing') },
      ],
      question: l('What is true about these words?', 'এই word-গুলো নিয়ে কোনটা সত্যি?'),
      options: [
        l('They all add, but each has its own position in the sentence', 'সবগুলোই যোগ করে, কিন্তু sentence-এ প্রতিটার নিজস্ব জায়গা আছে'),
        l('They can all start a sentence with a comma', 'সবগুলো comma দিয়ে sentence শুরু করতে পারে'),
        l('Moreover is always better than also', 'Moreover সবসময় also-এর চেয়ে ভালো'),
      ],
      answer: 0,
      pattern: l('and joins inside a sentence · also goes before the main verb · too / as well go at the end · In addition, / Moreover, / Furthermore, start a new sentence with a comma.', 'and sentence-এর ভেতরে জোড়ে · also মূল verb-এর আগে · too / as well শেষে · In addition, / Moreover, / Furthermore, comma দিয়ে নতুন sentence শুরু করে।'),
    },
    {
      kind: 'concept',
      title: l('Adding words and their positions', 'যোগ করার word আর তাদের জায়গা'),
      body: l(
        'All these words add an idea, but they sit in different places and have different levels of formality. Choose the position first, then the word.',
        'এই সব word একটা idea যোগ করে, কিন্তু আলাদা জায়গায় বসে আর formality-ও আলাদা। আগে জায়গা, তারপর word বেছে নিন।',
      ),
      points: [
        l('Inside a sentence: and · as well as + noun / -ing (As well as teaching, she writes books).', 'Sentence-এর ভেতরে: and · as well as + noun / -ing (As well as teaching, she writes books)।'),
        l('also: before the main verb (They also offer…), after be (It is also cheaper), after the first helping verb (It has also become…).', 'also: মূল verb-এর আগে (They also offer…), be-এর পরে (It is also cheaper), প্রথম helping verb-এর পরে (It has also become…)।'),
        l('too / as well: at the end, mostly in speaking (I like it, too). Not in negative sentences: use "either" (I don’t like it either).', 'too / as well: শেষে, বেশিরভাগ speaking-এ (I like it, too)। Negative sentence-এ না: "either" দিন (I don’t like it either)।'),
        l('In addition, / Moreover, / Furthermore, + a new sentence: formal, for Task 2. Use one of them per paragraph, not in every sentence.', 'In addition, / Moreover, / Furthermore, + নতুন sentence: formal, Task 2-এর জন্য। প্রতি paragraph-এ একটা, প্রতিটা sentence-এ না।'),
        l('NOT: "Moreover" for a small detail, "Besides" in formal essays (it sounds like an argument in conversation), or "And" to begin a Task 2 sentence.', 'না: ছোট detail-এ "Moreover", formal essay-তে "Besides" (কথাবার্তার তর্কের মতো শোনায়), বা Task 2 sentence "And" দিয়ে শুরু।'),
        l('Why Bangla speakers slip: Bangla "এছাড়া" and "তাছাড়া" start sentences freely, so they become "Besides," or "Also," at the start of every sentence. English prefers "also" inside the sentence and one formal connector per paragraph.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় "এছাড়া", "তাছাড়া" স্বাধীনভাবে sentence শুরু করে, তাই প্রতিটা sentence-এর শুরুতে "Besides," বা "Also," বসে যায়। English-এ "also" sentence-এর ভেতরে, আর প্রতি paragraph-এ একটা formal connector।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'My college has a big library, and it also has a gym.', note: l('and · also before has', 'and · has-এর আগে also') },
        { en: 'Public transport reduces traffic. In addition, it cuts pollution.', note: l('a second point in a new sentence', 'নতুন sentence-এ দ্বিতীয় point') },
        { en: 'As well as saving money, cycling keeps you fit.', note: l('as well as + -ing', 'as well as + -ing') },
        { en: 'I don’t like crowded places, and my sister doesn’t either.', note: l('negative → either, not too', 'negative → either, too না') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Online courses are cheaper. Furthermore, students can study at their own pace.', note: l('Task 2: one formal adding connector per paragraph.', 'Task 2: প্রতি paragraph-এ একটা formal যোগ করার connector।') },
        { skill: 'speaking', example: 'I like my hometown because it’s green, and the people are friendly, too.', note: l('Part 1: and · too at the end.', 'Part 1: and · শেষে too।') },
        { skill: 'reading', example: 'The scheme saves energy. Moreover, it creates local jobs.', note: l('Reading: moreover signals another point in the same direction.', 'Reading: moreover একই দিকের আরেকটা point বোঝায়।') },
        { skill: 'listening', example: 'The price includes breakfast as well as airport transfers.', note: l('Listening: as well as adds one more item — a typical answer detail.', 'Listening: as well as আরও একটা item যোগ করে — typical answer detail।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Also, cities have more jobs.', right: 'Cities also have more jobs.', why: l('also goes before the main verb.', 'also মূল verb-এর আগে বসে।') },
        { wrong: 'I don’t like tea too.', right: 'I don’t like tea either.', why: l('Negative sentence → either.', 'Negative sentence → either।') },
        { wrong: 'Moreover, cars are fast. Moreover, they are comfortable. Moreover, …', right: 'Cars are fast and comfortable. Moreover, …', why: l('One formal connector per paragraph; join small points with and.', 'প্রতি paragraph-এ একটা formal connector; ছোট point and দিয়ে জোড়া দিন।') },
        { wrong: 'As well as it is cheap, it is fast.', right: 'As well as being cheap, it is fast.', why: l('as well as + noun / -ing, not a clause.', 'as well as + noun / -ing, clause না।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('cn-1-p1', 'conn-add', { ...C, pattern: 'conn-form', prompt: l('Choose the best word for the gap.', 'Gap-এর জন্য সবচেয়ে ভালো word বেছে নিন।'), sentence: 'Smartphones are useful for learning. ___, they help students stay in touch.', options: ['In addition', 'And', 'Too'], answer: 'In addition', explanation: l('A new sentence with a second point → In addition,', 'দ্বিতীয় point-সহ নতুন sentence → In addition,'), why: { And: l('"And" joins inside one sentence; don’t start a formal sentence with it.', '"And" একটা sentence-এর ভেতরে জোড়ে; formal sentence এটা দিয়ে শুরু করবেন না।'), Too: l('"too" goes at the end of a sentence, not the start.', '"too" sentence-এর শেষে বসে, শুরুতে না।') } }),
        choice('cn-1-p2', 'conn-add', { ...C, pattern: 'conn-form', prompt: l('Where does "also" go?', '"also" কোথায় বসে?'), options: ['The hotel also has a swimming pool.', 'The hotel has also a swimming pool.', 'Also the hotel has a swimming pool also.'], answer: 'The hotel also has a swimming pool.', explanation: l('also + main verb (has).', 'also + মূল verb (has)।'), why: { 'The hotel has also a swimming pool.': l('also goes BEFORE a main verb (only after be or a helping verb).', 'also মূল verb-এর আগে বসে (শুধু be বা helping verb-এর পরে)।'), 'Also the hotel has a swimming pool also.': l('Use also once, before the main verb.', 'also একবার, মূল verb-এর আগে।') } }),
        choice('cn-1-p3', 'conn-add', { ...C, pattern: 'conn-meaning', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: 'My brother doesn’t eat fish, and my father doesn’t ___.', options: ['either', 'too', 'also'], answer: 'either', explanation: l('Negative + adding → either.', 'Negative + যোগ → either।'), why: { too: l('too is for positive sentences (My father does, too).', 'too positive sentence-এর জন্য (My father does, too)।'), also: l('also cannot go at the end like this.', 'also এভাবে শেষে বসে না।') } }),
        choice('cn-1-p4', 'conn-add', { ...C, pattern: 'conn-form', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'As well as ___ tourists, the festival attracts local families.', options: ['attracting', 'it attracts', 'attract'], answer: 'attracting', explanation: l('as well as + -ing.', 'as well as + -ing।'), why: { 'it attracts': l('as well as is followed by a noun or -ing, not a full clause.', 'as well as-এর পরে noun বা -ing বসে, পূর্ণ clause না।'), attract: l('After as well as at the start, use the -ing form.', 'শুরুতে as well as-এর পরে -ing form।') } }),
        choice('cn-1-p5', 'conn-add', { ...C, pattern: 'conn-meaning', prompt: l('Task 2: which paragraph links ideas best?', 'Task 2: কোন paragraph সবচেয়ে ভালোভাবে idea জোড়ে?'), options: ['Buses are cheap and reliable. In addition, they reduce traffic.', 'Moreover, buses are cheap. Moreover, they are reliable. Moreover, they reduce traffic.', 'Buses are cheap. And reliable. And they reduce traffic.'], answer: 'Buses are cheap and reliable. In addition, they reduce traffic.', explanation: l('Join small points with and; one connector for the new point.', 'ছোট point and দিয়ে জোড়া; নতুন point-এর জন্য একটা connector।'), why: { 'Moreover, buses are cheap. Moreover, they are reliable. Moreover, they reduce traffic.': l('Repeating Moreover sounds mechanical and lowers Coherence and Cohesion.', 'বারবার Moreover যন্ত্রের মতো শোনায় আর Coherence and Cohesion কমায়।'), 'Buses are cheap. And reliable. And they reduce traffic.': l('"And reliable." is not a sentence, and "And" should not start formal sentences.', '"And reliable." কোনো sentence না, আর formal sentence "And" দিয়ে শুরু হয় না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cn-1-r1', 'conn-add', { ...C, pattern: 'conn-meaning', prompt: l('Write too or either.', 'too বা either লিখুন।'), sentence: 'I can’t swim, and my sister can’t ___.', accepted: ['either'], explanation: l('Negative → either.', 'Negative → either।'), why: { too: l('The sentence is negative (can’t) → either.', 'Sentence-টা negative (can’t) → either।') } }),
        gap('cn-1-r2', 'conn-add', { ...C, pattern: 'conn-form', prompt: l('Write one word (it goes before the verb).', 'একটা word লিখুন (verb-এর আগে বসে)।'), sentence: 'The new park is beautiful, and it ___ has a café.', accepted: ['also'], explanation: l('also before the main verb.', 'মূল verb-এর আগে also।') }),
        correct('cn-1-r3', 'conn-add', { ...C, pattern: 'conn-form', prompt: l('Correct the sentence (move one word).', 'Sentence-টা ঠিক করুন (একটা word সরান)।'), sentence: 'Solar power is clean and it reduces also bills.', accepted: ['Solar power is clean and it also reduces bills.', 'Solar power is clean, and it also reduces bills.'], explanation: l('also before the main verb: also reduces.', 'মূল verb-এর আগে also: also reduces।') }),
        correct('cn-1-r4', 'conn-add', { ...C, pattern: 'conn-form', prompt: l('Correct the sentence (as well as + -ing).', 'Sentence-টা ঠিক করুন (as well as + -ing)।'), sentence: 'As well as it saves money, cycling is healthy.', accepted: ['As well as saving money, cycling is healthy.'], explanation: l('as well as + -ing: "As well as saving money".', 'as well as + -ing: "As well as saving money"।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cn-1-c1', 'conn-add', { ...C, pattern: 'conn-meaning', prompt: l('Which connector is best for a formal Task 2 essay?', 'Formal Task 2 essay-র জন্য কোন connector সবচেয়ে ভালো?'), options: ['Furthermore,', 'Plus,', 'Besides that,'], answer: 'Furthermore,', explanation: l('Furthermore / Moreover / In addition are formal; plus and besides sound spoken.', 'Furthermore / Moreover / In addition formal; plus আর besides কথ্য শোনায়।') }),
        spot('cn-1-c2', 'conn-add', { ...C, pattern: 'conn-meaning', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'My parents don’t use social media, and I don’t use it too.', wrong: 'too', accepted: ['either'], fixOptions: ['either', 'also', 'as well'], explanation: l('Negative → either.', 'Negative → either।') }),
        order('cn-1-c3', 'conn-add', { ...C, pattern: 'conn-form', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Online classes also save travel time.', explanation: l('also before the main verb.', 'মূল verb-এর আগে also।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: two advantages', 'এবার আপনার পালা: দুটো সুবিধা'),
      exercises: [
        write('cn-1-y1', 'conn-add', {
          ...C,
          prompt: l('Task 2: "What are the advantages of learning English?" Write 3 sentences giving two advantages. Use also and ONE of In addition / Moreover / Furthermore.', 'Task 2: "What are the advantages of learning English?" দুটো সুবিধা দিয়ে ৩টা sentence লিখুন। also আর In addition / Moreover / Furthermore-এর একটা ব্যবহার করুন।'),
          model: 'English helps people find better jobs, and it also makes studying abroad possible. In addition, it opens up films, books and websites from around the world. For many young Bangladeshis, it is a key to the future.',
          checklist: [l('also before the main verb', 'মূল verb-এর আগে also'), l('one formal adding connector + comma, new sentence', 'একটা formal যোগ করার connector + comma, নতুন sentence'), l('no "And" / "Also," at the start', 'শুরুতে "And" / "Also," না')],
          explanation: l('Position first, then the word — and one formal connector is enough.', 'আগে জায়গা, তারপর word — আর একটা formal connector যথেষ্ট।'),
          task: 'The student writes 3 Task 2 sentences giving two advantages of learning English. Check adding connectors only: "and" joins inside a sentence; "also" goes before the main verb, after be or after the first helping verb (never "has also a"); "too / as well" at the end and never in negatives (use "either"); "In addition, / Moreover, / Furthermore," start a new sentence with a comma and should appear once, not in every sentence; "as well as" + noun / -ing, not a clause; avoid starting formal sentences with "And" or "Also,"; "Besides" and "Plus" are informal. For each issue quote the words, say what is wrong with the position or formality, and give the fix.',
          target: l('Adding ideas: also, In addition', 'Idea যোগ: also, In addition'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('and inside · also before the verb · too / as well at the end · either in negatives.', 'ভেতরে and · verb-এর আগে also · শেষে too / as well · negative-এ either।'),
        l('In addition, / Moreover, / Furthermore, + new sentence — once per paragraph.', 'In addition, / Moreover, / Furthermore, + নতুন sentence — প্রতি paragraph-এ একবার।'),
        l('as well as + noun / -ing.', 'as well as + noun / -ing।'),
      ],
    },
  ],
};

// ======================================================================= cn-2
export const connContrast: Lesson = {
  id: 'cn-2',
  format: 'v2',
  concept: 'conn-contrast',
  title: l('Contrast: however, although, whereas, despite', 'বিপরীত: however, although, whereas, despite'),
  why: l('Every Task 2 discussion and every Task 1 comparison needs contrast. "Although … but" is one of the most common errors examiners see from Bangladeshi candidates.', 'প্রতিটা Task 2 আলোচনা আর Task 1 তুলনায় বিপরীত দরকার। "Although … but" বাংলাদেশি পরীক্ষার্থীদের সবচেয়ে common ভুলগুলোর একটা।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 2 sentence', 'একটা Task 2 sentence'),
      situation: l('You write: "Although online shopping is convenient, but many people still prefer local markets."', 'আপনি লিখলেন: "Although online shopping is convenient, but many people still prefer local markets."'),
      question: l('What is the problem?', 'সমস্যাটা কী?'),
      options: ['Two contrast words: use although OR but, not both', 'Nothing — it is correct', '"Although" must go in the middle'],
      answer: 'Two contrast words: use although OR but, not both',
      diagnose: {
        'Two contrast words: use although OR but, not both': l('Right. "Although X, Y." or "X, but Y." — never both. Bangla says "যদিও … কিন্তু", English uses only one.', 'ঠিক। "Although X, Y." বা "X, but Y." — দুটো একসাথে কখনো না। বাংলায় "যদিও … কিন্তু" বলি, English-এ একটাই।'),
        'Nothing — it is correct': l('It feels right because Bangla pairs "যদিও" with "কিন্তু". In English, "although" already shows the contrast, so "but" must go.', 'বাংলায় "যদিও"-র সাথে "কিন্তু" আসে বলে ঠিক মনে হয়। English-এ "although" নিজেই বিপরীত দেখায়, তাই "but" বাদ দিতে হবে।'),
        '"Although" must go in the middle': l('Although can start the sentence or go in the middle. The real problem is using although AND but together.', 'Although শুরুতে বা মাঝে দুই জায়গাতেই বসতে পারে। আসল সমস্যা although আর but একসাথে ব্যবহার।'),
      },
    },
    {
      kind: 'discover',
      title: l('One idea, four ways', 'একটা idea, চারভাবে'),
      items: [
        { en: 'Online shopping is convenient, but it can be risky.', note: l('but: joins two clauses, after a comma', 'but: comma-র পরে দুটো clause জোড়ে') },
        { en: 'Online shopping is convenient. However, it can be risky.', note: l('However,: starts a new sentence', 'However,: নতুন sentence শুরু করে') },
        { en: 'Although online shopping is convenient, it can be risky.', note: l('although + clause, then the main clause (no but)', 'although + clause, তারপর মূল clause (but না)') },
        { en: 'Despite its convenience, online shopping can be risky.', note: l('despite + noun / -ing (no clause)', 'despite + noun / -ing (clause না)') },
      ],
      question: l('What changes between these sentences?', 'এই sentence-গুলোর মধ্যে কী বদলায়?'),
      options: [
        l('The grammar around the word: but joins, However starts a sentence, although takes a clause, despite takes a noun', 'Word-এর চারপাশের grammar: but জোড়ে, However sentence শুরু করে, although clause নেয়, despite noun নেয়'),
        l('The meaning: some show contrast and some do not', 'অর্থ: কিছু বিপরীত দেখায়, কিছু না'),
        l('Nothing: they are all used the same way', 'কিছুই না: সবগুলো একইভাবে ব্যবহার হয়'),
      ],
      answer: 0,
      pattern: l('Same contrast, different grammar: X, but Y · X. However, Y. · Although X, Y. · Despite + noun / -ing, Y. Use only ONE contrast word per contrast.', 'একই বিপরীত, আলাদা grammar: X, but Y · X. However, Y. · Although X, Y. · Despite + noun / -ing, Y। প্রতিটা বিপরীতে মাত্র একটা contrast word।'),
    },
    {
      kind: 'concept',
      title: l('Contrast words and their grammar', 'বিপরীতের word আর তাদের grammar'),
      body: l(
        'Contrast words show that the second idea is surprising or different. Each one has its own grammar: learn the frame, not just the word.',
        'Contrast word দেখায় দ্বিতীয় idea অপ্রত্যাশিত বা আলাদা। প্রতিটার নিজস্ব grammar আছে: শুধু word না, পুরো frame শিখুন।',
      ),
      points: [
        l('but / yet: join two clauses — X, but Y.', 'but / yet: দুটো clause জোড়ে — X, but Y।'),
        l('However, / Nevertheless, / On the other hand,: start a new sentence (or follow a semicolon) + comma. "On the other hand" compares two sides, often after "On the one hand".', 'However, / Nevertheless, / On the other hand,: নতুন sentence শুরু করে (বা semicolon-এর পরে) + comma। "On the other hand" দুই দিক তুলনা করে, প্রায়ই "On the one hand"-এর পরে।'),
        l('although / even though / though + a clause: Although it rained, we went out. whereas / while: compare two facts — Men earned more, whereas women worked longer hours (useful in Task 1).', 'although / even though / though + clause: Although it rained, we went out। whereas / while: দুটো তথ্য তুলনা — Men earned more, whereas women worked longer hours (Task 1-এ কাজের)।'),
        l('despite / in spite of + a noun or -ing: Despite the rain, … · In spite of having little money, … NOT "despite of", NOT despite + a clause (despite it rained ✗ → despite the fact that it rained).', 'despite / in spite of + noun বা -ing: Despite the rain, … · In spite of having little money, … "despite of" না, despite + clause না (despite it rained ✗ → despite the fact that it rained)।'),
        l('Why Bangla speakers slip: Bangla needs both halves — "যদিও … কিন্তু", "সত্ত্বেও … তবুও" — so English gets two contrast words. Also "অন্যদিকে" becomes "In other hand" (✗ → On the other hand).', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় দুটো অংশ লাগে — "যদিও … কিন্তু", "সত্ত্বেও … তবুও" — তাই English-এ দুটো contrast word বসে যায়। আর "অন্যদিকে" হয়ে যায় "In other hand" (✗ → On the other hand)।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'Although the rent is high, I love living in Dhaka.', note: l('although + clause, main clause (no but)', 'although + clause, মূল clause (but না)') },
        { en: 'The flat is small. However, it is very bright.', note: l('However, + new sentence', 'However, + নতুন sentence') },
        { en: 'Despite the traffic, we arrived on time.', note: l('despite + noun', 'despite + noun') },
        { en: 'Coffee is popular in cities, whereas tea is more common in villages.', note: l('whereas compares two facts', 'whereas দুটো তথ্য তুলনা করে') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Car ownership rose in Japan, whereas it fell in Germany.', note: l('Task 1: whereas / while compares two data sets.', 'Task 1: whereas / while দুটো data set তুলনা করে।') },
        { skill: 'speaking', example: 'Although I enjoy big cities, I’d rather live near my family.', note: l('Part 3: balanced opinions with although.', 'Part 3: although দিয়ে ভারসাম্যপূর্ণ মতামত।') },
        { skill: 'reading', example: 'The results were promising. Nevertheless, further research is needed.', note: l('Reading: however / nevertheless often mark the writer’s real view — a key to Yes / No / Not Given.', 'Reading: however / nevertheless প্রায়ই লেখকের আসল মত দেখায় — Yes / No / Not Given-এর চাবি।') },
        { skill: 'listening', example: 'The tour is usually on Saturdays; however, this week it’s on Sunday.', note: l('Listening: the answer often comes right after however.', 'Listening: উত্তর প্রায়ই however-এর ঠিক পরে আসে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Although it was late, but we continued working.', right: 'Although it was late, we continued working.', why: l('One contrast word: although OR but.', 'একটা contrast word: although অথবা but।') },
        { wrong: 'Despite of the rain, the match went ahead.', right: 'Despite the rain, the match went ahead.', why: l('despite (no of) — or in spite of.', 'despite (of না) — বা in spite of।') },
        { wrong: 'In other hand, cities are expensive.', right: 'On the other hand, cities are expensive.', why: l('The fixed phrase is "On the other hand".', 'Fixed phrase হলো "On the other hand"।') },
        { wrong: 'Despite it was expensive, I bought it.', right: 'Although it was expensive, I bought it.', why: l('A clause needs although; despite needs a noun (despite the price).', 'Clause-এ although; despite-এ noun লাগে (despite the price)।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('cn-2-p1', 'conn-contrast', { ...C, pattern: 'conn-double', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Although he was tired, he finished the report.', 'Although he was tired, but he finished the report.', 'Although he was tired, however he finished the report.'], answer: 'Although he was tired, he finished the report.', explanation: l('although + clause, main clause — one contrast word.', 'although + clause, মূল clause — একটা contrast word।'), why: { 'Although he was tired, but he finished the report.': l('"যদিও … কিন্তু" — English keeps only one: remove but.', '"যদিও … কিন্তু" — English-এ একটাই থাকে: but বাদ দিন।'), 'Although he was tired, however he finished the report.': l('although and however both show contrast; use one.', 'although আর however দুটোই বিপরীত দেখায়; একটা দিন।') } }),
        choice('cn-2-p2', 'conn-contrast', { ...C, pattern: 'conn-form', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: '___ the heavy rain, thousands of people joined the rally.', options: ['Despite', 'Although', 'However'], answer: 'Despite', explanation: l('+ a noun (the heavy rain) → despite.', '+ noun (the heavy rain) → despite।'), why: { Although: l('although needs a clause (although it rained heavily).', 'although-এর সাথে clause লাগে (although it rained heavily)।'), However: l('However starts a new sentence and is followed by a comma and a full clause.', 'However নতুন sentence শুরু করে, তারপর comma আর পূর্ণ clause।') } }),
        choice('cn-2-p3', 'conn-contrast', { ...C, pattern: 'conn-meaning', prompt: l('Task 1: choose the word.', 'Task 1: word বেছে নিন।'), sentence: 'Sales rose steadily in the north, ___ they fell in the south.', options: ['whereas', 'because', 'moreover'], answer: 'whereas', explanation: l('Comparing two opposite facts → whereas.', 'দুটো বিপরীত তথ্যের তুলনা → whereas।'), why: { because: l('The fall in the south is not the reason for the rise in the north.', 'দক্ষিণে কমা উত্তরে বাড়ার কারণ না।'), moreover: l('moreover adds a similar point, not a contrast.', 'moreover একই রকম point যোগ করে, বিপরীত না।') } }),
        choice('cn-2-p4', 'conn-contrast', { ...C, pattern: 'conn-form', prompt: l('Choose the correct punctuation.', 'সঠিক punctuation বেছে নিন।'), options: ['The course is expensive. However, it is excellent.', 'The course is expensive, however it is excellent.', 'The course is expensive however, it is excellent.'], answer: 'The course is expensive. However, it is excellent.', explanation: l('However starts a new sentence (or follows a semicolon) and takes a comma.', 'However নতুন sentence শুরু করে (বা semicolon-এর পরে) আর comma নেয়।'), why: { 'The course is expensive, however it is excellent.': l('A comma cannot join two sentences with however; use a full stop or a semicolon.', 'However দিয়ে দুটো sentence comma দিয়ে জোড়া যায় না; full stop বা semicolon দিন।'), 'The course is expensive however, it is excellent.': l('The comma goes after However, and a full stop before it.', 'Comma However-এর পরে, আর তার আগে full stop।') } }),
        choice('cn-2-p5', 'conn-contrast', { ...C, pattern: 'conn-form', prompt: l('Choose the correct phrase.', 'সঠিক phrase বেছে নিন।'), sentence: '___, some people argue that cities offer more opportunities.', options: ['On the other hand', 'In other hand', 'At the other hand'], answer: 'On the other hand', explanation: l('The fixed phrase is "On the other hand".', 'Fixed phrase "On the other hand"।'), why: { 'In other hand': l('"অন্যদিকে" → On the other hand (with on and the).', '"অন্যদিকে" → On the other hand (on আর the সহ)।'), 'At the other hand': l('The preposition is on.', 'Preposition হলো on।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cn-2-r1', 'conn-contrast', { ...C, pattern: 'conn-form', prompt: l('Write one word: although or despite.', 'একটা word লিখুন: although বা despite।'), sentence: '___ his injury, he played the whole match.', accepted: ['despite'], explanation: l('+ noun → despite.', '+ noun → despite।'), why: { although: l('"his injury" is a noun, not a clause → despite.', '"his injury" একটা noun, clause না → despite।') } }),
        gap('cn-2-r2', 'conn-contrast', { ...C, pattern: 'conn-form', prompt: l('Write one word: although or despite.', 'একটা word লিখুন: although বা despite।'), sentence: '___ the flat was small, it was comfortable.', accepted: ['although', 'though', 'even though'], explanation: l('+ clause → although.', '+ clause → although।'), why: { despite: l('"the flat was small" is a clause (it has a verb) → although.', '"the flat was small" একটা clause (verb আছে) → although।') } }),
        correct('cn-2-r3', 'conn-contrast', { ...C, pattern: 'conn-double', prompt: l('Correct the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'Although the test was difficult, but most students passed.', accepted: ['Although the test was difficult, most students passed.', 'The test was difficult, but most students passed.'], explanation: l('One contrast word per contrast.', 'প্রতিটা বিপরীতে একটা contrast word।') }),
        spot('cn-2-r4', 'conn-contrast', { ...C, pattern: 'conn-form', prompt: l('One word is wrong. Tap it and type the right one.', 'একটা word ভুল। সেটায় tap করে সঠিকটা লিখুন।'), sentence: 'In spite the cost, many families buy smartphones.', wrong: 'spite', accepted: ['spite of'], explanation: l('in spite OF (or despite).', 'in spite OF (বা despite)।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cn-2-c1', 'conn-contrast', { ...C, pattern: 'conn-meaning', prompt: l('Which sentence shows a real contrast?', 'কোন sentence আসল বিপরীত দেখায়?'), options: ['The phone is cheap. However, its battery lasts two days.', 'The phone is cheap. However, it is not expensive.', 'The phone is cheap. However, it costs very little.'], answer: 'The phone is cheap. However, its battery lasts two days.', explanation: l('However needs a surprising second idea, not the same idea again.', 'However-এর পরে অপ্রত্যাশিত দ্বিতীয় idea লাগে, একই idea আবার না।') }),
        spot('cn-2-c2', 'conn-contrast', { ...C, pattern: 'conn-form', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Despite it was raining, the market was busy.', wrong: 'Despite', accepted: ['Although'], fixOptions: ['Although', 'However', 'But'], explanation: l('A clause (it was raining) → although.', 'Clause (it was raining) → although।') }),
        order('cn-2-c3', 'conn-contrast', { ...C, pattern: 'conn-form', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Despite the cost, many students study abroad.', explanation: l('despite + noun.', 'despite + noun।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: two sides', 'এবার আপনার পালা: দুই দিক'),
      exercises: [
        write('cn-2-y1', 'conn-contrast', {
          ...C,
          prompt: l('Task 2: "Is it better to study in your own country or abroad?" Write 3 sentences showing both sides. Use although, however and despite (each once).', 'Task 2: "Is it better to study in your own country or abroad?" দুই দিক দেখিয়ে ৩টা sentence লিখুন। although, however আর despite (প্রতিটা একবার) ব্যবহার করুন।'),
          model: 'Although studying abroad is expensive, it gives students international experience. However, many students feel lonely far from their families. Despite these difficulties, I believe the benefits are greater.',
          checklist: [l('although + clause, with NO but', 'although + clause, but ছাড়া'), l('However, + new sentence', 'However, + নতুন sentence'), l('despite + noun / -ing', 'despite + noun / -ing')],
          explanation: l('One contrast word per contrast, each with its own grammar.', 'প্রতিটা বিপরীতে একটা contrast word, প্রত্যেকটার নিজস্ব grammar।'),
          task: 'The student writes 3 Task 2 sentences showing two sides of studying abroad, using although, however and despite. Check contrast connectors only: never two contrast words for one contrast (although … but, though … however); although / even though + clause; despite / in spite of + noun or -ing (never "despite of", never despite + a clause); However, / Nevertheless, / On the other hand, start a new sentence (or follow a semicolon) with a comma — a comma alone before however is a comma splice; "On the other hand" (not "In other hand"); whereas / while for comparing two facts. Also check that the second idea really contrasts with the first. For each issue quote the words, name the rule and give the fix.',
          target: l('Contrast: although, however, despite', 'বিপরীত: although, however, despite'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('One contrast word per contrast: never "Although … but".', 'প্রতিটা বিপরীতে একটা contrast word: কখনো "Although … but" না।'),
        l('although + clause · despite / in spite of + noun or -ing · X. However, Y.', 'although + clause · despite / in spite of + noun বা -ing · X. However, Y।'),
        l('whereas / while compare two facts · On the other hand (not "In other hand").', 'whereas / while দুটো তথ্য তুলনা করে · On the other hand ("In other hand" না)।'),
      ],
    },
  ],
};

// ======================================================================= cn-3
export const connCause: Lesson = {
  id: 'cn-3',
  format: 'v2',
  concept: 'conn-cause',
  title: l('Cause and result: because, due to, therefore', 'কারণ আর ফলাফল: because, due to, therefore'),
  why: l('Task 2 is built on reasons and results. "Because of it is cheap" and "Because it is cheap." (on its own) are two errors that cost accuracy marks.', 'Task 2 কারণ আর ফলাফলের উপর দাঁড়িয়ে। "Because of it is cheap" আর একা "Because it is cheap." — দুটো ভুলেই accuracy-র নম্বর কাটে।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 2 argument', 'একটা Task 2 যুক্তি'),
      situation: l('You write: "Many people move to Dhaka. Because there are more jobs." Then: "Traffic is getting worse ___ the number of cars."', 'আপনি লিখলেন: "Many people move to Dhaka. Because there are more jobs." তারপর: "Traffic is getting worse ___ the number of cars."'),
      question: l('Which is true?', 'কোনটা সত্যি?'),
      options: ['"Because there are more jobs." is not a full sentence; the gap needs "because of"', 'Both parts are correct; the gap needs "because"', 'The first part is correct; the gap needs "therefore"'],
      answer: '"Because there are more jobs." is not a full sentence; the gap needs "because of"',
      diagnose: {
        '"Because there are more jobs." is not a full sentence; the gap needs "because of"': l('Right. A because-clause needs a main clause: "Many people move to Dhaka because there are more jobs." And a noun (the number of cars) needs "because of" / "due to".', 'ঠিক। because-clause-এর সাথে মূল clause লাগে: "Many people move to Dhaka because there are more jobs." আর noun (the number of cars)-এর আগে "because of" / "due to"।'),
        'Both parts are correct; the gap needs "because"': l('Bangla often starts an answer with "কারণ …", but in writing "Because …." alone is a fragment. And "because" takes a clause; a noun needs "because of".', 'বাংলায় প্রায়ই উত্তর "কারণ …" দিয়ে শুরু হয়, কিন্তু লেখায় একা "Because …." একটা ভাঙা sentence। আর "because" clause নেয়; noun-এর আগে "because of"।'),
        'The first part is correct; the gap needs "therefore"': l('"Because there are more jobs." cannot stand alone. And "therefore" introduces a result, but here the number of cars is the cause → because of.', '"Because there are more jobs." একা দাঁড়াতে পারে না। আর "therefore" ফলাফল আনে, কিন্তু এখানে গাড়ির সংখ্যা কারণ → because of।'),
      },
    },
    {
      kind: 'discover',
      title: l('Cause first or result first?', 'আগে কারণ নাকি আগে ফলাফল?'),
      items: [
        { en: 'Prices rose because demand increased.', note: l('because + clause (the cause)', 'because + clause (কারণ)') },
        { en: 'Prices rose because of / due to higher demand.', note: l('because of / due to + noun', 'because of / due to + noun') },
        { en: 'Demand increased, so prices rose.', note: l('so + result (joins two clauses)', 'so + ফলাফল (দুটো clause জোড়ে)') },
        { en: 'Demand increased. Therefore, / As a result, prices rose.', note: l('Therefore, / As a result, + result in a new sentence', 'Therefore, / As a result, + নতুন sentence-এ ফলাফল') },
      ],
      question: l('What decides which word you use?', 'কোন word দেবেন তা কী ঠিক করে?'),
      options: [
        l('Whether the word introduces the cause or the result, and whether a clause or a noun follows', 'Word-টা কারণ নাকি ফলাফল আনে, আর পরে clause নাকি noun বসে'),
        l('Whether the sentence is about the past or the present', 'Sentence-টা অতীত নাকি বর্তমান নিয়ে'),
        l('How long the sentence is', 'Sentence কত লম্বা'),
      ],
      answer: 0,
      pattern: l('Cause words: because / since / as + clause · because of / due to + noun. Result words: so (joins) · Therefore, / As a result, / Consequently, (new sentence).', 'কারণের word: because / since / as + clause · because of / due to + noun। ফলাফলের word: so (জোড়ে) · Therefore, / As a result, / Consequently, (নতুন sentence)।'),
    },
    {
      kind: 'concept',
      title: l('Cause words and result words', 'কারণের word আর ফলাফলের word'),
      body: l(
        'First decide: does the word introduce the cause or the result? Then check what follows it: a clause or a noun.',
        'আগে ঠিক করুন: word-টা কারণ আনে নাকি ফলাফল? তারপর দেখুন পরে কী বসে: clause নাকি noun।',
      ),
      points: [
        l('Cause + clause: because, since, as (Since the roads were flooded, schools closed). A because-clause must be attached to a main clause.', 'কারণ + clause: because, since, as (Since the roads were flooded, schools closed)। because-clause-কে একটা মূল clause-এর সাথে জুড়ে থাকতে হয়।'),
        l('Cause + noun: because of, due to, owing to, as a result of (The match was cancelled due to rain). NOT "because of + clause" (because of it rained ✗).', 'কারণ + noun: because of, due to, owing to, as a result of (The match was cancelled due to rain)। "because of + clause" না (because of it rained ✗)।'),
        l('Result, same sentence: so (It was late, so we took a taxi). Result, new sentence: Therefore, / As a result, / Consequently, / Thus,.', 'ফলাফল, একই sentence: so (It was late, so we took a taxi)। ফলাফল, নতুন sentence: Therefore, / As a result, / Consequently, / Thus,।'),
        l('NOT two linked words for one link: "Because it was late, so we left" ✗ → Because it was late, we left. / It was late, so we left.', 'একটা যোগসূত্রে দুটো word না: "Because it was late, so we left" ✗ → Because it was late, we left। / It was late, so we left।'),
        l('Why Bangla speakers slip: Bangla pairs "যেহেতু … তাই" and answers "কেন?" with "কারণ …" alone. In English, one word is enough, and a because-clause needs a main clause in the same sentence.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় "যেহেতু … তাই" জোড়া আসে, আর "কেন?"-র উত্তর একা "কারণ …" দিয়ে দেওয়া হয়। English-এ একটা word যথেষ্ট, আর because-clause-এর সাথে একই sentence-এ মূল clause লাগে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'I take the metro because it is faster than the bus.', note: l('because + clause', 'because + clause') },
        { en: 'The flight was delayed due to fog.', note: l('due to + noun', 'due to + noun') },
        { en: 'It started raining, so we stayed inside.', note: l('so + result', 'so + ফলাফল') },
        { en: 'Fuel prices doubled. As a result, bus fares went up.', note: l('As a result, + new sentence', 'As a result, + নতুন sentence') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Many young people leave villages due to a lack of jobs. As a result, rural areas are ageing.', note: l('Task 2: due to + noun · As a result, + consequence.', 'Task 2: due to + noun · As a result, + পরিণাম।') },
        { skill: 'speaking', example: 'I prefer mornings because my mind is fresh, so I study before breakfast.', note: l('Part 1: because + reason, so + result.', 'Part 1: because + কারণ, so + ফলাফল।') },
        { skill: 'reading', example: 'Owing to rising temperatures, the glacier has shrunk.', note: l('Reading: owing to / due to show a cause — useful for matching headings.', 'Reading: owing to / due to কারণ দেখায় — heading মেলাতে কাজে লাগে।') },
        { skill: 'listening', example: 'The talk has moved to Room 5 because of the building work.', note: l('Listening: the reason follows because of.', 'Listening: because of-এর পরে কারণ আসে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'People like online shopping. Because it saves time.', right: 'People like online shopping because it saves time.', why: l('A because-clause needs a main clause.', 'because-clause-এর সাথে মূল clause লাগে।') },
        { wrong: 'The road was closed because of it was flooded.', right: 'The road was closed because it was flooded.', why: l('Clause → because (noun → because of).', 'Clause → because (noun → because of)।') },
        { wrong: 'Because the bus was late, so I missed the class.', right: 'Because the bus was late, I missed the class.', why: l('One link word: because OR so.', 'একটা link word: because অথবা so।') },
        { wrong: 'Prices rose, therefore people bought less.', right: 'Prices rose. Therefore, people bought less.', why: l('Therefore starts a new sentence (or follows a semicolon).', 'Therefore নতুন sentence শুরু করে (বা semicolon-এর পরে)।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('cn-3-p1', 'conn-cause', { ...C, pattern: 'conn-form', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: 'The school was closed ___ the flood.', options: ['because of', 'because', 'so'], answer: 'because of', explanation: l('+ noun (the flood) → because of.', '+ noun (the flood) → because of।'), why: { because: l('because needs a clause (because it flooded).', 'because-এর সাথে clause লাগে (because it flooded)।'), so: l('so introduces a result, but the flood is the cause.', 'so ফলাফল আনে, কিন্তু বন্যা কারণ।') } }),
        choice('cn-3-p2', 'conn-cause', { ...C, pattern: 'conn-meaning', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: 'The battery was empty, ___ my phone switched off.', options: ['so', 'because', 'although'], answer: 'so', explanation: l('The phone switching off is the result → so.', 'Phone বন্ধ হওয়া ফলাফল → so।'), why: { because: l('because would make the switching off the cause of the empty battery.', 'because দিলে phone বন্ধ হওয়াকে battery শেষ হওয়ার কারণ বানানো হয়।'), although: l('There is no contrast here: the second idea is the expected result.', 'এখানে কোনো বিপরীত নেই: দ্বিতীয় idea প্রত্যাশিত ফলাফল।') } }),
        choice('cn-3-p3', 'conn-cause', { ...C, pattern: 'conn-fragment', prompt: l('Which is a complete, correct answer?', 'কোনটা সম্পূর্ণ, সঠিক উত্তর?'), options: ['I chose this course because it is practical.', 'I chose this course. Because it is practical.', 'Because it is practical.'], answer: 'I chose this course because it is practical.', explanation: l('because + clause attached to the main clause.', 'because + clause, মূল clause-এর সাথে জোড়া।'), why: { 'I chose this course. Because it is practical.': l('The full stop cuts off the because-clause: it becomes a fragment.', 'Full stop because-clause-কে কেটে দেয়: একটা ভাঙা sentence হয়ে যায়।'), 'Because it is practical.': l('In writing, a because-clause alone is not a sentence (fine only as a quick spoken reply).', 'লেখায় একা because-clause sentence না (শুধু দ্রুত মৌখিক উত্তরে চলে)।') } }),
        choice('cn-3-p4', 'conn-cause', { ...C, pattern: 'conn-double', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Since the tickets were cheap, we bought four.', 'Since the tickets were cheap, so we bought four.', 'Since the tickets were cheap, therefore we bought four.'], answer: 'Since the tickets were cheap, we bought four.', explanation: l('One link word: since introduces the cause; nothing before the result.', 'একটা link word: since কারণ আনে; ফলাফলের আগে কিছু না।'), why: { 'Since the tickets were cheap, so we bought four.': l('"যেহেতু … তাই" → English keeps only since.', '"যেহেতু … তাই" → English-এ শুধু since থাকে।'), 'Since the tickets were cheap, therefore we bought four.': l('since and therefore both mark the link; use one.', 'since আর therefore দুটোই যোগসূত্র দেখায়; একটা দিন।') } }),
        choice('cn-3-p5', 'conn-cause', { ...C, pattern: 'conn-form', prompt: l('Task 2: choose the correct punctuation.', 'Task 2: সঠিক punctuation বেছে নিন।'), options: ['House prices have doubled. As a result, many young people rent.', 'House prices have doubled, as a result many young people rent.', 'House prices have doubled as a result, many young people rent.'], answer: 'House prices have doubled. As a result, many young people rent.', explanation: l('As a result, starts a new sentence with a comma.', 'As a result, comma দিয়ে নতুন sentence শুরু করে।'), why: { 'House prices have doubled, as a result many young people rent.': l('A comma cannot join two sentences here; use a full stop (or a semicolon).', 'এখানে comma দিয়ে দুটো sentence জোড়া যায় না; full stop (বা semicolon) দিন।'), 'House prices have doubled as a result, many young people rent.': l('This changes the meaning: "as a result" now belongs to the first idea.', 'এতে অর্থ বদলে যায়: "as a result" প্রথম idea-র অংশ হয়ে যায়।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cn-3-r1', 'conn-cause', { ...C, pattern: 'conn-form', prompt: l('Write two words: a cause word for a noun.', 'দুটো word লিখুন: noun-এর জন্য কারণের word।'), sentence: 'The flight was cancelled ___ bad weather.', accepted: ['due to', 'because of', 'owing to'], explanation: l('+ noun → due to / because of.', '+ noun → due to / because of।'), why: { because: l('bad weather is a noun → because of / due to.', 'bad weather একটা noun → because of / due to।') } }),
        gap('cn-3-r2', 'conn-cause', { ...C, pattern: 'conn-meaning', prompt: l('Write so or because.', 'so বা because লিখুন।'), sentence: 'I missed the bus, ___ I was late for the exam.', accepted: ['so'], explanation: l('Being late is the result → so.', 'দেরি হওয়া ফলাফল → so।'), why: { because: l('Being late did not cause missing the bus; it was the result.', 'দেরি হওয়ায় bus মিস হয়নি; এটা ছিল ফলাফল।') } }),
        correct('cn-3-r3', 'conn-cause', { ...C, pattern: 'conn-double', prompt: l('Correct the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'Because the shop was closed, so we went home.', accepted: ['Because the shop was closed, we went home.', 'The shop was closed, so we went home.'], explanation: l('One link word: because OR so.', 'একটা link word: because অথবা so।') }),
        correct('cn-3-r4', 'conn-cause', { ...C, pattern: 'conn-form', prompt: l('Correct the sentence (a clause follows).', 'Sentence-টা ঠিক করুন (পরে একটা clause আছে)।'), sentence: 'Many shops closed early due to it was a holiday.', accepted: ['Many shops closed early because it was a holiday.', 'Many shops closed early due to the holiday.', 'Many shops closed early since it was a holiday.', 'Many shops closed early as it was a holiday.'], explanation: l('A clause (it was a holiday) → because. (Or: due to the holiday.)', 'Clause (it was a holiday) → because। (বা: due to the holiday।)') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cn-3-c1', 'conn-cause', { ...C, pattern: 'conn-meaning', prompt: l('"Prices rose. Therefore, sales fell." What does "Therefore" say?', '"Prices rose. Therefore, sales fell." "Therefore" কী বলে?'), options: ['The fall in sales was a result of the price rise', 'The fall in sales happened before the price rise', 'Sales and prices are not connected'], answer: 'The fall in sales was a result of the price rise', explanation: l('Therefore introduces a result.', 'Therefore ফলাফল আনে।') }),
        spot('cn-3-c2', 'conn-cause', { ...C, pattern: 'conn-form', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'The match was stopped because the heavy rain.', wrong: 'because', accepted: ['because of'], fixOptions: ['because of', 'so', 'although'], explanation: l('+ noun (the heavy rain) → because of.', '+ noun (the heavy rain) → because of।') }),
        order('cn-3-c3', 'conn-cause', { ...C, pattern: 'conn-form', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'The roads were flooded, so the schools closed.', explanation: l('cause, so + result.', 'কারণ, so + ফলাফল।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a cause and its effect', 'এবার আপনার পালা: একটা কারণ আর তার প্রভাব'),
      exercises: [
        write('cn-3-y1', 'conn-cause', {
          ...C,
          prompt: l('Task 2: "Why do many people move from villages to cities, and what are the effects?" Write 3 sentences using because (or since), due to and As a result.', 'Task 2: "Why do many people move from villages to cities, and what are the effects?" because (বা since), due to আর As a result ব্যবহার করে ৩টা sentence লিখুন।'),
          model: 'Many young people move to cities because there are more jobs there. Some families also leave villages due to river erosion. As a result, cities like Dhaka are becoming overcrowded.',
          checklist: [l('because / since + clause, attached to a main clause', 'because / since + clause, মূল clause-এর সাথে জোড়া'), l('due to / because of + noun', 'due to / because of + noun'), l('As a result, / Therefore, + new sentence — no double link words', 'As a result, / Therefore, + নতুন sentence — দুটো link word না')],
          explanation: l('Cause or result? Clause or noun? One word per link.', 'কারণ নাকি ফলাফল? Clause নাকি noun? প্রতিটা যোগসূত্রে একটা word।'),
          task: 'The student writes 3 Task 2 sentences about why people move to cities and the effects. Check cause and result connectors only: because / since / as + clause, attached to a main clause in the same sentence (a stand-alone "Because …." is a fragment); because of / due to / owing to + noun, never + a clause; so joins a result inside a sentence; Therefore, / As a result, / Consequently, start a new sentence (or follow a semicolon) with a comma — a comma alone before them is a comma splice; never two link words for one link (because … so, since … therefore). Also check the logic: the cause word must introduce the cause, the result word the result. For each issue quote the words, name the rule and give the fix.',
          target: l('Cause and result: because, due to, As a result', 'কারণ আর ফলাফল: because, due to, As a result'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('because / since + clause · because of / due to + noun.', 'because / since + clause · because of / due to + noun।'),
        l('so (same sentence) · Therefore, / As a result, (new sentence) + result.', 'so (একই sentence) · Therefore, / As a result, (নতুন sentence) + ফলাফল।'),
        l('Never "Because …." alone in writing, never "because … so".', 'লেখায় কখনো একা "Because …." না, কখনো "because … so" না।'),
      ],
    },
  ],
};

// ======================================================================= cn-4
export const connExample: Lesson = {
  id: 'cn-4',
  format: 'v2',
  concept: 'conn-example',
  title: l('Examples, order and conclusions', 'উদাহরণ, ক্রম আর উপসংহার'),
  why: l('"For example" supports your ideas, "Firstly … Finally" organises them, and "Overall" / "In conclusion" wrap them up — the skeleton of every essay and report.', '"For example" idea-কে সমর্থন করে, "Firstly … Finally" সাজায়, আর "Overall" / "In conclusion" শেষ করে — প্রতিটা essay আর report-এর কাঠামো।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('The end of a Task 1 report', 'একটা Task 1 report-এর শেষ'),
      situation: l('You finish a Task 1 report with: "In conclusion, I think the chart is very interesting."', 'আপনি একটা Task 1 report শেষ করলেন: "In conclusion, I think the chart is very interesting."'),
      question: l('What is wrong?', 'কী ভুল?'),
      options: ['Task 1 needs an "Overall," summary of the main trends, not an opinion', 'Nothing, this is a good ending', '"In conclusion" must come at the start'],
      answer: 'Task 1 needs an "Overall," summary of the main trends, not an opinion',
      diagnose: {
        'Task 1 needs an "Overall," summary of the main trends, not an opinion': l('Right. Task 1 reports the data: "Overall, sales rose, while costs fell." "In conclusion" + an opinion belongs to Task 2.', 'ঠিক। Task 1 data জানায়: "Overall, sales rose, while costs fell." "In conclusion" + মতামত Task 2-এর।'),
        'Nothing, this is a good ending': l('Task 1 has no opinions. Examiners look for an overview of the main features, usually starting with "Overall,".', 'Task 1-এ মতামত নেই। Examiner মূল বৈশিষ্ট্যের overview খোঁজেন, সাধারণত "Overall," দিয়ে শুরু।'),
        '"In conclusion" must come at the start': l('"In conclusion" goes at the end of a Task 2 essay. For Task 1, write an overview with "Overall," (often after the introduction).', '"In conclusion" Task 2 essay-র শেষে বসে। Task 1-এ "Overall," দিয়ে overview লিখুন (প্রায়ই introduction-এর পরে)।'),
      },
    },
    {
      kind: 'discover',
      title: l('Giving examples', 'উদাহরণ দেওয়া'),
      items: [
        { en: 'Some jobs are dangerous. For example, miners work underground.', note: l('For example, + a full sentence', 'For example, + পূর্ণ sentence') },
        { en: 'Some jobs, such as mining and fishing, are dangerous.', note: l('such as + nouns (no comma after)', 'such as + noun (পরে comma না)') },
        { en: 'Firstly, … Secondly, … Finally, …', note: l('order of points', 'point-এর ক্রম') },
        { en: 'In conclusion, … (Task 2) · Overall, … (Task 1)', note: l('ending a Task 2 essay vs summarising Task 1 data', 'Task 2 essay শেষ বনাম Task 1 data-র সারাংশ') },
      ],
      question: l('What is the difference between "for example" and "such as"?', '"for example" আর "such as"-এর পার্থক্য কী?'),
      options: [
        l('For example, starts a new sentence; such as comes straight before a list of nouns', 'For example, নতুন sentence শুরু করে; such as noun-এর তালিকার ঠিক আগে বসে'),
        l('They are used in exactly the same way', 'দুটো হুবহু একইভাবে ব্যবহার হয়'),
        l('such as is only for spoken English', 'such as শুধু কথ্য English-এর জন্য'),
      ],
      answer: 0,
      pattern: l('For example, / For instance, + a sentence · such as + nouns inside the sentence · Firstly, Secondly, Finally, for order · Overall, (Task 1 summary) · In conclusion, (Task 2 ending).', 'For example, / For instance, + sentence · sentence-এর ভেতরে such as + noun · ক্রমের জন্য Firstly, Secondly, Finally, · Overall, (Task 1 সারাংশ) · In conclusion, (Task 2 শেষ)।'),
    },
    {
      kind: 'concept',
      title: l('Examples, order and endings', 'উদাহরণ, ক্রম আর শেষ'),
      body: l(
        'These connectors organise your answer. Used well, they help the examiner follow your ideas; used wrongly, they confuse the structure.',
        'এই connector-গুলো আপনার উত্তর সাজায়। ঠিকমতো ব্যবহারে examiner আপনার idea অনুসরণ করতে পারেন; ভুল ব্যবহারে কাঠামো গুলিয়ে যায়।',
      ),
      points: [
        l('Examples: For example, / For instance, + a full sentence · such as / like + nouns (Countries such as Nepal and Bhutan…) · e.g. only in notes, not in essays.', 'উদাহরণ: For example, / For instance, + পূর্ণ sentence · such as / like + noun (Countries such as Nepal and Bhutan…) · e.g. শুধু note-এ, essay-তে না।'),
        l('Order: Firstly, / First of all, · Secondly, · Finally, / Lastly, — "At last" means "after a long wait", not "the last point".', 'ক্রম: Firstly, / First of all, · Secondly, · Finally, / Lastly, — "At last" মানে "অনেক অপেক্ষার পরে", "শেষ point" না।'),
        l('Task 1 summary: Overall, / In general, + the main trends (no opinion). Task 2 ending: In conclusion, / To conclude, + your view repeated in new words.', 'Task 1 সারাংশ: Overall, / In general, + মূল trend (মতামত না)। Task 2 শেষ: In conclusion, / To conclude, + নতুন ভাষায় আপনার মত।'),
        l('NOT "For example, such as…" (two example words), NOT "such as" + a full sentence, NOT "In conclusion" in Task 1 or "At last" for the final point.', '"For example, such as…" না (দুটো উদাহরণের word), "such as" + পূর্ণ sentence না, Task 1-এ "In conclusion" না, শেষ point-এর জন্য "At last" না।'),
        l('Why Bangla speakers slip: "যেমন" covers both "for example" and "such as", so we write "For example, such as…" or "such as + sentence". And "অবশেষে" becomes "At last" for the final point.', 'বাংলাভাষীরা কেন ভুল করে: "যেমন" দিয়ে "for example" আর "such as" দুটোই বোঝায়, তাই "For example, such as…" বা "such as + sentence" লিখে ফেলি। আর শেষ point-এর জন্য "অবশেষে" হয়ে যায় "At last"।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'Many hobbies, such as gardening and painting, reduce stress.', note: l('such as + nouns inside the sentence', 'sentence-এর ভেতরে such as + noun') },
        { en: 'Technology helps farmers. For instance, apps give weather warnings.', note: l('For instance, + sentence', 'For instance, + sentence') },
        { en: 'Firstly, fill in the form. Secondly, pay the fee. Finally, book a date.', note: l('order of steps', 'ধাপের ক্রম') },
        { en: 'Overall, the number of visitors increased, while spending fell.', note: l('Task 1 overview', 'Task 1 overview') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'In conclusion, although online learning has drawbacks, its benefits are greater.', note: l('Task 2: In conclusion, + your position.', 'Task 2: In conclusion, + আপনার অবস্থান।') },
        { skill: 'speaking', example: 'I enjoy outdoor activities, like cycling and fishing.', note: l('Part 1: like / such as + a quick list.', 'Part 1: like / such as + দ্রুত তালিকা।') },
        { skill: 'reading', example: 'Several factors, such as soil quality and rainfall, affect crop yields.', note: l('Reading: such as introduces examples — often the answer to a list question.', 'Reading: such as উদাহরণ আনে — প্রায়ই তালিকা প্রশ্নের উত্তর।') },
        { skill: 'listening', example: 'First, you’ll get your ID card. After that, we’ll visit the library.', note: l('Listening: sequence words help you follow a process or tour.', 'Listening: ক্রমের word process বা tour অনুসরণ করতে সাহায্য করে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'For example, such as Nepal and Bhutan.', right: 'For example, Nepal and Bhutan have mountain economies.', why: l('One example word, and a full sentence after For example.', 'একটা উদাহরণের word, আর For example-এর পরে পূর্ণ sentence।') },
        { wrong: 'Some sports such as, football are expensive.', right: 'Some sports, such as football, are expensive.', why: l('No comma after "such as".', '"such as"-এর পরে comma না।') },
        { wrong: 'At last, the government should build more schools.', right: 'Finally, the government should build more schools.', why: l('Last point → Finally / Lastly.', 'শেষ point → Finally / Lastly।') },
        { wrong: 'In conclusion, the graph is useful. (Task 1)', right: 'Overall, car use rose while bus use fell.', why: l('Task 1 → an Overall summary of trends.', 'Task 1 → trend-এর Overall সারাংশ।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('cn-4-p1', 'conn-example', { ...C, pattern: 'conn-form', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: 'Fast food, ___ burgers and fried chicken, is popular with teenagers.', options: ['such as', 'for example,', 'for instance,'], answer: 'such as', explanation: l('Inside the sentence, before nouns → such as.', 'Sentence-এর ভেতরে, noun-এর আগে → such as।'), why: { 'for example,': l('For example, usually starts a new sentence.', 'For example, সাধারণত নতুন sentence শুরু করে।'), 'for instance,': l('For instance, works like For example, — a new sentence.', 'For instance, For example,-এর মতো — নতুন sentence।') } }),
        choice('cn-4-p2', 'conn-example', { ...C, pattern: 'conn-meaning', prompt: l('Task 1: choose the best start for the overview.', 'Task 1: overview-এর জন্য সবচেয়ে ভালো শুরু বেছে নিন।'), options: ['Overall, the number of tourists increased in all three countries.', 'In conclusion, I think tourism is good.', 'At last, the tourists increased.'], answer: 'Overall, the number of tourists increased in all three countries.', explanation: l('Task 1 overview: Overall, + the main trend.', 'Task 1 overview: Overall, + মূল trend।'), why: { 'In conclusion, I think tourism is good.': l('No opinions in Task 1.', 'Task 1-এ মতামত না।'), 'At last, the tourists increased.': l('"At last" means "after a long wait".', '"At last" মানে "অনেক অপেক্ষার পরে"।') } }),
        choice('cn-4-p3', 'conn-example', { ...C, pattern: 'conn-meaning', prompt: l('Choose the word for the last point.', 'শেষ point-এর জন্য word বেছে নিন।'), sentence: 'Firstly, parks improve health. Secondly, they bring people together. ___, they help the environment.', options: ['Finally', 'At last', 'In the end of'], answer: 'Finally', explanation: l('Last point in a list → Finally / Lastly.', 'তালিকার শেষ point → Finally / Lastly।'), why: { 'At last': l('"At last" = after waiting a long time (At last, the bus came!).', '"At last" = অনেক অপেক্ষার পরে (At last, the bus came!)।'), 'In the end of': l('"In the end of" is not a connector.', '"In the end of" কোনো connector না।') } }),
        choice('cn-4-p4', 'conn-example', { ...C, pattern: 'conn-double', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Some countries, such as Japan, have ageing populations.', 'Some countries, for example such as Japan, have ageing populations.', 'Some countries, such as, Japan have ageing populations.'], answer: 'Some countries, such as Japan, have ageing populations.', explanation: l('One example word; no comma after such as.', 'একটা উদাহরণের word; such as-এর পরে comma না।'), why: { 'Some countries, for example such as Japan, have ageing populations.': l('"যেমন" → use only one: such as.', '"যেমন" → একটাই দিন: such as।'), 'Some countries, such as, Japan have ageing populations.': l('No comma after such as; the commas go around the whole example.', 'such as-এর পরে comma না; comma পুরো উদাহরণের দুই পাশে।') } }),
        choice('cn-4-p5', 'conn-example', { ...C, pattern: 'conn-fragment', prompt: l('Choose the best continuation.', 'সবচেয়ে ভালো পরের অংশ বেছে নিন।'), sentence: 'Public transport can be improved. For example, ___', options: ['the city could add more metro lines.', 'more metro lines.', 'such as more metro lines.'], answer: 'the city could add more metro lines.', explanation: l('For example, + a full sentence.', 'For example, + পূর্ণ sentence।'), why: { 'more metro lines.': l('After For example, write a full sentence with a verb.', 'For example,-এর পরে verb-সহ পূর্ণ sentence লিখুন।'), 'such as more metro lines.': l('Two example words and no verb.', 'দুটো উদাহরণের word আর কোনো verb নেই।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cn-4-r1', 'conn-example', { ...C, pattern: 'conn-form', prompt: l('Write two words that introduce a list of nouns.', 'Noun-এর তালিকা আনে এমন দুটো word লিখুন।'), sentence: 'Renewable sources, ___ wind and solar power, are getting cheaper.', accepted: ['such as'], explanation: l('such as + nouns.', 'such as + noun।'), why: { 'for example': l('Inside the sentence before nouns, use such as.', 'Sentence-এর ভেতরে noun-এর আগে such as দিন।') } }),
        gap('cn-4-r2', 'conn-example', { ...C, pattern: 'conn-meaning', prompt: l('Write one word to start a Task 1 overview.', 'Task 1 overview শুরু করার একটা word লিখুন।'), sentence: '___, the use of mobile phones rose sharply over the period.', accepted: ['overall', 'in general'], explanation: l('Task 1 summary → Overall,', 'Task 1 সারাংশ → Overall,'), why: { 'in conclusion': l('In conclusion is for Task 2 essays.', 'In conclusion Task 2 essay-র জন্য।') } }),
        correct('cn-4-r3', 'conn-example', { ...C, pattern: 'conn-meaning', prompt: l('Correct the sentence (change two words).', 'Sentence-টা ঠিক করুন (দুটো word বদলান)।'), sentence: 'At last, I will explain the third reason.', accepted: ['Finally, I will explain the third reason.', 'Lastly, I will explain the third reason.'], explanation: l('Last point → Finally / Lastly.', 'শেষ point → Finally / Lastly।') }),
        correct('cn-4-r4', 'conn-example', { ...C, pattern: 'conn-double', prompt: l('Correct the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'Many fruits, like such as mangoes and lychees, grow in Rajshahi.', accepted: ['Many fruits, such as mangoes and lychees, grow in Rajshahi.', 'Many fruits, like mangoes and lychees, grow in Rajshahi.'], explanation: l('One example word: such as (or like).', 'একটা উদাহরণের word: such as (বা like)।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cn-4-c1', 'conn-example', { ...C, pattern: 'conn-meaning', prompt: l('Which ending suits a Task 2 opinion essay?', 'Task 2 opinion essay-র জন্য কোন শেষ মানানসই?'), options: ['In conclusion, I firmly believe that the advantages outweigh the disadvantages.', 'Overall, the chart shows three trends.', 'At last, I finish my essay.'], answer: 'In conclusion, I firmly believe that the advantages outweigh the disadvantages.', explanation: l('Task 2: In conclusion, + your position.', 'Task 2: In conclusion, + আপনার অবস্থান।') }),
        spot('cn-4-c2', 'conn-example', { ...C, pattern: 'conn-form', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Some fruits, as mangoes and lychees, grow well in Rajshahi.', wrong: 'as', accepted: ['like'], fixOptions: ['like', 'for', 'example'], explanation: l('like / such as + nouns: "like mangoes and lychees".', 'like / such as + noun: "like mangoes and lychees"।') }),
        order('cn-4-c3', 'conn-example', { ...C, pattern: 'conn-form', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Overall, prices rose in all five cities.', explanation: l('Overall, + the main trend.', 'Overall, + মূল trend।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: support an idea', 'এবার আপনার পালা: একটা idea সমর্থন করুন'),
      exercises: [
        write('cn-4-y1', 'conn-example', {
          ...C,
          prompt: l('Task 2: "Young people should learn practical skills at school." Write 3 sentences: your idea, an example with For example or such as, and a closing sentence with In conclusion.', 'Task 2: "Young people should learn practical skills at school." ৩টা sentence লিখুন: আপনার idea, For example বা such as দিয়ে একটা উদাহরণ, আর In conclusion দিয়ে শেষ sentence।'),
          model: 'Schools should teach practical skills as well as academic subjects. For example, students could learn how to manage money and cook simple meals. In conclusion, these skills would prepare young people for adult life.',
          checklist: [l('For example, + a full sentence (or such as + nouns)', 'For example, + পূর্ণ sentence (বা such as + noun)'), l('one example word, not two', 'একটা উদাহরণের word, দুটো না'), l('In conclusion, + your view in new words', 'In conclusion, + নতুন ভাষায় আপনার মত')],
          explanation: l('Examples support, sequence words organise, the ending restates.', 'উদাহরণ সমর্থন করে, ক্রমের word সাজায়, শেষ আবার বলে।'),
          task: 'The student writes 3 Task 2 sentences: an idea, an example, and a conclusion. Check example, sequence and conclusion connectors only: For example, / For instance, + a full sentence with a verb; such as / like + nouns inside a sentence with no comma after "such as"; never two example words together ("For example, such as"); Firstly / Secondly / Finally for order ("At last" is wrong for the final point); In conclusion / To conclude for a Task 2 ending that restates the view (not a new idea); "Overall," is for Task 1 summaries. For each issue quote the words, name the rule and give the fix.',
          target: l('Examples and conclusions', 'উদাহরণ আর উপসংহার'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('For example, + sentence · such as + nouns — never both together.', 'For example, + sentence · such as + noun — দুটো একসাথে কখনো না।'),
        l('Firstly, Secondly, Finally — not "At last".', 'Firstly, Secondly, Finally — "At last" না।'),
        l('Overall, (Task 1 trends) · In conclusion, (Task 2 view).', 'Overall, (Task 1 trend) · In conclusion, (Task 2 মত)।'),
      ],
    },
  ],
};

// ======================================================================= cn-5
export const connGrammar: Lesson = {
  id: 'cn-5',
  format: 'v2',
  concept: 'conn-grammar',
  title: l('Position and punctuation of connectors', 'Connector-এর জায়গা আর punctuation'),
  why: l('The same idea can be linked three ways — but each connector type has its own grammar. Comma splices ("…, however …") and "despite + clause" are marked as errors in every task.', 'একই idea তিনভাবে জোড়া যায় — কিন্তু প্রতিটা ধরনের connector-এর নিজস্ব grammar আছে। Comma splice ("…, however …") আর "despite + clause" প্রতিটা task-এ ভুল হিসেবে ধরা হয়।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Three ways, one idea', 'তিনভাবে, একটা idea'),
      situation: l('You want to say that the rent was high but you took the flat. Which version is correctly punctuated?', 'বলতে চান ভাড়া বেশি ছিল কিন্তু আপনি flat-টা নিলেন। কোন version-এর punctuation ঠিক?'),
      question: l('Choose the correct one.', 'সঠিকটা বেছে নিন।'),
      options: ['The rent was high. Nevertheless, I took the flat.', 'The rent was high, nevertheless I took the flat.', 'The rent was high nevertheless, I took the flat.'],
      answer: 'The rent was high. Nevertheless, I took the flat.',
      diagnose: {
        'The rent was high. Nevertheless, I took the flat.': l('Right. Nevertheless (like however, therefore) is a sentence connector: full stop (or semicolon) before it, comma after it.', 'ঠিক। Nevertheless (however, therefore-এর মতো) একটা sentence connector: আগে full stop (বা semicolon), পরে comma।'),
        'The rent was high, nevertheless I took the flat.': l('This is a comma splice: two full sentences joined only by a comma. Use a full stop or a semicolon before Nevertheless.', 'এটা comma splice: দুটো পূর্ণ sentence শুধু comma দিয়ে জোড়া। Nevertheless-এর আগে full stop বা semicolon দিন।'),
        'The rent was high nevertheless, I took the flat.': l('The punctuation is in the wrong places: a full stop before Nevertheless and a comma after it.', 'Punctuation ভুল জায়গায়: Nevertheless-এর আগে full stop আর পরে comma।'),
      },
    },
    {
      kind: 'discover',
      title: l('Three kinds of linkers', 'তিন ধরনের linker'),
      items: [
        { en: 'The rent was high, but I took the flat.', note: l('conjunction (and, but, so, or): comma + conjunction, same sentence', 'conjunction (and, but, so, or): comma + conjunction, একই sentence') },
        { en: 'Although the rent was high, I took the flat.', note: l('subordinator (although, because, while, if): + clause; comma if it comes first', 'subordinator (although, because, while, if): + clause; আগে বসলে comma') },
        { en: 'The rent was high. However, I took the flat.', note: l('sentence connector (however, therefore, moreover): new sentence + comma', 'sentence connector (however, therefore, moreover): নতুন sentence + comma') },
        { en: 'Despite the high rent, I took the flat.', note: l('preposition (despite, because of, due to): + noun / -ing', 'preposition (despite, because of, due to): + noun / -ing') },
      ],
      question: l('Why is "The rent was high, however I took the flat." wrong?', '"The rent was high, however I took the flat." কেন ভুল?'),
      options: [
        l('However is a sentence connector, not a conjunction — it cannot join two sentences with a comma', 'However একটা sentence connector, conjunction না — comma দিয়ে দুটো sentence জুড়তে পারে না'),
        l('However always goes at the end', 'However সবসময় শেষে বসে'),
        l('However means "because"', 'However মানে "because"'),
      ],
      answer: 0,
      pattern: l('Know the type: conjunctions join with a comma (, but), subordinators take a clause (Although …, …), sentence connectors start a new sentence (. However, …), prepositions take a noun (Despite the rent, …).', 'ধরনটা জানুন: conjunction comma দিয়ে জোড়ে (, but), subordinator clause নেয় (Although …, …), sentence connector নতুন sentence শুরু করে (. However, …), preposition noun নেয় (Despite the rent, …)।'),
    },
    {
      kind: 'concept',
      title: l('The four types and their punctuation', 'চার ধরন আর তাদের punctuation'),
      body: l(
        'Linking words fall into four grammar types. The type decides the punctuation and what follows the word.',
        'জোড়া দেওয়ার word চারটা grammar ধরনে পড়ে। ধরনটাই punctuation আর word-এর পরে কী বসে তা ঠিক করে।',
      ),
      points: [
        l('Conjunctions — and, but, or, so, yet: join two clauses in one sentence, usually with a comma before: It was late, so we left.', 'Conjunction — and, but, or, so, yet: একটা sentence-এ দুটো clause জোড়ে, সাধারণত আগে comma: It was late, so we left।'),
        l('Subordinators — although, because, since, while, whereas, if, when + a clause. First in the sentence → comma after the clause (Although it was late, we stayed). Second → usually no comma (We stayed although it was late).', 'Subordinator — although, because, since, while, whereas, if, when + clause। Sentence-এর শুরুতে → clause-এর পরে comma (Although it was late, we stayed)। পরে → সাধারণত comma না (We stayed although it was late)।'),
        l('Sentence connectors — however, therefore, moreover, in addition, as a result, nevertheless, for example: start a new sentence with a comma after, or follow a semicolon (; however,). A comma alone before them = comma splice ✗.', 'Sentence connector — however, therefore, moreover, in addition, as a result, nevertheless, for example: comma-সহ নতুন sentence শুরু করে, বা semicolon-এর পরে (; however,)। আগে শুধু comma = comma splice ✗।'),
        l('Prepositions — despite, in spite of, because of, due to, as well as, instead of + noun / -ing: Despite working hard, … NOT + a clause.', 'Preposition — despite, in spite of, because of, due to, as well as, instead of + noun / -ing: Despite working hard, … clause না।'),
        l('Why Bangla speakers slip: Bangla "তবে", "তাই", "কিন্তু" all join clauses with a comma (দাম বেশি, তবে ভালো), so "…, however …" and "…, therefore …" feel natural. English sentence connectors need a full stop or a semicolon.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় "তবে", "তাই", "কিন্তু" সবই comma দিয়ে clause জোড়ে (দাম বেশি, তবে ভালো), তাই "…, however …" আর "…, therefore …" স্বাভাবিক মনে হয়। English sentence connector-এ full stop বা semicolon লাগে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('One idea, four types', 'একটা idea, চার ধরন'),
      items: [
        { en: 'The bus was late, so I walked.', note: l('conjunction', 'conjunction') },
        { en: 'Because the bus was late, I walked.', note: l('subordinator first → comma', 'শুরুতে subordinator → comma') },
        { en: 'The bus was late; therefore, I walked.', note: l('sentence connector after a semicolon', 'semicolon-এর পরে sentence connector') },
        { en: 'Because of the late bus, I walked.', note: l('preposition + noun', 'preposition + noun') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Many people work from home. As a result, city centres are quieter.', note: l('Task 2: sentence connectors after a full stop — no comma splices.', 'Task 2: full stop-এর পরে sentence connector — comma splice না।') },
        { skill: 'listening', example: 'If you arrive late, please wait outside until the break.', note: l('Listening: the if-clause gives the condition; the answer is in the main clause.', 'Listening: if-clause শর্ত দেয়; উত্তর মূল clause-এ।') },
        { skill: 'speaking', example: 'I like my job, but the hours are long, so I’m looking for a new one.', note: l('Speaking: conjunctions keep spoken answers flowing.', 'Speaking: conjunction মৌখিক উত্তর প্রবাহমান রাখে।') },
        { skill: 'reading', example: 'Despite heavy investment, the scheme failed.', note: l('Reading: despite + noun signals an unexpected result.', 'Reading: despite + noun অপ্রত্যাশিত ফলাফল বোঝায়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The film was long, however it was exciting.', right: 'The film was long. However, it was exciting.', why: l('Sentence connector → full stop (or semicolon) before, comma after.', 'Sentence connector → আগে full stop (বা semicolon), পরে comma।') },
        { wrong: 'Despite he was ill, he went to work.', right: 'Although he was ill, he went to work.', why: l('Clause → although (despite + noun: despite his illness).', 'Clause → although (despite + noun: despite his illness)।') },
        { wrong: 'Although it rained we played.', right: 'Although it rained, we played.', why: l('Subordinate clause first → comma after it.', 'শুরুতে subordinate clause → তার পরে comma।') },
        { wrong: 'Prices rose therefore people complained.', right: 'Prices rose; therefore, people complained.', why: l('therefore needs a semicolon or full stop before and a comma after.', 'therefore-এর আগে semicolon বা full stop আর পরে comma লাগে।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('cn-5-p1', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Choose the correctly punctuated sentence.', 'সঠিক punctuation-এর sentence বেছে নিন।'), options: ['The hotel was cheap. However, it was very clean.', 'The hotel was cheap, however it was very clean.', 'The hotel was cheap however it was very clean.'], answer: 'The hotel was cheap. However, it was very clean.', explanation: l('However: full stop before, comma after.', 'However: আগে full stop, পরে comma।'), why: { 'The hotel was cheap, however it was very clean.': l('Comma splice: a comma cannot join two sentences with however.', 'Comma splice: however দিয়ে comma-য় দুটো sentence জোড়া যায় না।'), 'The hotel was cheap however it was very clean.': l('No punctuation at all: two sentences run together.', 'কোনো punctuation নেই: দুটো sentence একসাথে চলে গেছে।') } }),
        choice('cn-5-p2', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Choose the linker that fits the grammar.', 'Grammar-এর সাথে মানানসই linker বেছে নিন।'), sentence: '___ having a degree, he could not find a job.', options: ['Despite', 'Although', 'However,'], answer: 'Despite', explanation: l('+ -ing (having) → despite.', '+ -ing (having) → despite।'), why: { Although: l('although needs a clause: Although he had a degree, …', 'although-এর সাথে clause লাগে: Although he had a degree, …'), 'However,': l('However, is followed by a full sentence, not "having a degree".', 'However,-এর পরে পূর্ণ sentence বসে, "having a degree" না।') } }),
        choice('cn-5-p3', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Where does the comma go?', 'Comma কোথায় বসবে?'), options: ['When the rain stopped, we went out.', 'When, the rain stopped we went out.', 'When the rain stopped we, went out.'], answer: 'When the rain stopped, we went out.', explanation: l('Subordinate clause first → comma after the clause.', 'শুরুতে subordinate clause → clause-এর পরে comma।'), why: { 'When, the rain stopped we went out.': l('The comma goes after the whole clause, not after "When".', 'Comma পুরো clause-এর পরে, "When"-এর পরে না।'), 'When the rain stopped we, went out.': l('The comma separates the two clauses: after "stopped".', 'Comma দুটো clause আলাদা করে: "stopped"-এর পরে।') } }),
        choice('cn-5-p4', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The road was closed; therefore, we took the ferry.', 'The road was closed, therefore we took the ferry.', 'The road was closed therefore, we took the ferry.'], answer: 'The road was closed; therefore, we took the ferry.', explanation: l('; therefore, — semicolon before, comma after.', '; therefore, — আগে semicolon, পরে comma।'), why: { 'The road was closed, therefore we took the ferry.': l('Comma splice: therefore is not a conjunction.', 'Comma splice: therefore conjunction না।'), 'The road was closed therefore, we took the ferry.': l('Punctuation is needed BEFORE therefore (semicolon or full stop).', 'therefore-এর আগে punctuation লাগে (semicolon বা full stop)।') } }),
        choice('cn-5-p5', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Choose the word that can join these two clauses with only a comma.', 'শুধু comma দিয়ে এই দুটো clause জুড়তে পারে এমন word বেছে নিন।'), sentence: 'The course was difficult, ___ I learned a lot.', options: ['but', 'however', 'nevertheless'], answer: 'but', explanation: l('A conjunction (but) joins two clauses after a comma.', 'Conjunction (but) comma-র পরে দুটো clause জোড়ে।'), why: { however: l('however is a sentence connector: it needs a full stop or semicolon before it.', 'however একটা sentence connector: আগে full stop বা semicolon লাগে।'), nevertheless: l('nevertheless also needs a full stop or semicolon before it.', 'nevertheless-এর আগেও full stop বা semicolon লাগে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cn-5-r1', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Write one conjunction that can follow the comma.', 'Comma-র পরে বসতে পারে এমন একটা conjunction লিখুন।'), sentence: 'The shop was open, ___ it had no bread left.', accepted: ['but', 'yet'], explanation: l('A contrast conjunction after a comma → but.', 'Comma-র পরে বিপরীতের conjunction → but।'), why: { however: l('however cannot follow a comma to join two sentences.', 'however comma-র পরে বসে দুটো sentence জুড়তে পারে না।') } }),
        gap('cn-5-r2', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Write one word: although or despite.', 'একটা word লিখুন: although বা despite।'), sentence: '___ feeling nervous, she gave an excellent talk.', accepted: ['despite'], explanation: l('+ -ing → despite.', '+ -ing → despite।'), why: { although: l('"feeling nervous" has no subject and full verb → despite (or: Although she felt nervous, …).', '"feeling nervous"-এ subject আর পূর্ণ verb নেই → despite (বা: Although she felt nervous, …)।') } }),
        correct('cn-5-r3', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Fix the comma splice.', 'Comma splice ঠিক করুন।'), sentence: 'The test was easy, however many students failed.', accepted: ['The test was easy. However, many students failed.', 'The test was easy; however, many students failed.', 'The test was easy, but many students failed.'], explanation: l('. However, / ; however, / , but', '. However, / ; however, / , but') }),
        correct('cn-5-r4', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Correct the sentence (a clause follows).', 'Sentence-টা ঠিক করুন (পরে একটা clause আছে)।'), sentence: 'In spite of the tickets were expensive, the concert was full.', accepted: ['Although the tickets were expensive, the concert was full.', 'Even though the tickets were expensive, the concert was full.', 'Though the tickets were expensive, the concert was full.', 'In spite of the high prices, the concert was full.', 'Despite the high prices, the concert was full.'], explanation: l('A clause follows → Although … (or: In spite of the high prices).', 'পরে clause → Although … (বা: In spite of the high prices)।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cn-5-c1', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Which three sentences mean the same and are all correct?', 'কোন তিনটা sentence-এর মানে একই আর সবগুলো ঠিক?'), options: ['It was cold, so we stayed in. / Because it was cold, we stayed in. / It was cold. Therefore, we stayed in.', 'It was cold, therefore we stayed in. / Because of it was cold, we stayed in. / It was cold so, we stayed in.', 'It was cold, so we stayed in. / Due to it was cold, we stayed in. / It was cold, as a result we stayed in.'], answer: 'It was cold, so we stayed in. / Because it was cold, we stayed in. / It was cold. Therefore, we stayed in.', explanation: l('conjunction · subordinator · sentence connector — each with its own punctuation.', 'conjunction · subordinator · sentence connector — প্রত্যেকটার নিজস্ব punctuation।') }),
        spot('cn-5-c2', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('One word breaks this Task 2 sentence. Tap it, then fix it.', 'একটা word Task 2 sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Many people drive to work, however public transport is cheaper.', wrong: 'however', accepted: ['but', 'although', 'whereas'], fixOptions: ['but', 'therefore', 'moreover'], explanation: l('After a comma, join with a conjunction (but) — or write ". However,".', 'Comma-র পরে conjunction (but) দিয়ে জোড়া — বা ". However," লিখুন।') }),
        correct('cn-5-c3', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Rewrite with "Despite" (keep the meaning).', '"Despite" দিয়ে আবার লিখুন (অর্থ ঠিক রেখে)।'), sentence: 'Although it was raining, the market was busy.', accepted: ['Despite the rain, the market was busy.', 'Despite the rain the market was busy.', 'Despite it raining, the market was busy.'], explanation: l('Despite + noun (the rain).', 'Despite + noun (the rain)।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: one idea, three ways', 'এবার আপনার পালা: একটা idea, তিনভাবে'),
      exercises: [
        write('cn-5-y1', 'conn-grammar', {
          ...C,
          prompt: l('Write the same idea three ways: "Petrol is expensive, and many people still drive." Use (1) but, (2) Although, (3) However — each with the correct punctuation.', 'একই idea তিনভাবে লিখুন: "Petrol is expensive, and many people still drive." (১) but, (২) Although, (৩) However — প্রত্যেকটা সঠিক punctuation-সহ।'),
          model: 'Petrol is expensive, but many people still drive. Although petrol is expensive, many people still drive. Petrol is expensive. However, many people still drive.',
          checklist: [l(', but + clause', ', but + clause'), l('Although + clause, + main clause (no but)', 'Although + clause, + মূল clause (but না)'), l('. However, + new sentence (no comma splice)', '. However, + নতুন sentence (comma splice না)')],
          explanation: l('Same idea, three grammar types.', 'একই idea, তিনটা grammar ধরন।'),
          task: 'The student rewrites one idea three ways using but, Although and However. Check connector grammar and punctuation only: conjunctions (and, but, or, so, yet) join two clauses after a comma; subordinators (although, because, while, when, if) take a clause, with a comma after the clause when it comes first; sentence connectors (however, therefore, moreover, as a result, nevertheless) begin a new sentence or follow a semicolon, with a comma after them — a comma alone before them is a comma splice; prepositions (despite, in spite of, because of, due to) take a noun or -ing, never a clause; never two linkers for one link (although … but). For each issue quote the words, name the linker type and give the corrected punctuation.',
          target: l('Connector grammar and punctuation', 'Connector-এর grammar আর punctuation'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l(', but / , so / , and — conjunctions join with a comma.', ', but / , so / , and — conjunction comma দিয়ে জোড়ে।'),
        l('Although / Because + clause, main clause.', 'Although / Because + clause, মূল clause।'),
        l('. However, / ; therefore, — never a comma splice · Despite + noun / -ing.', '. However, / ; therefore, — কখনো comma splice না · Despite + noun / -ing।'),
      ],
    },
  ],
};

// ======================================================================= cn-6
export const connCohesion: Lesson = {
  id: 'cn-6',
  format: 'v2',
  concept: 'conn-cohesion',
  title: l('Natural linking: this, which, fewer connectors', 'স্বাভাবিক linking: this, which, কম connector'),
  why: l('Band descriptors warn against "mechanical" linking. Good writers link with this, these, which and such as much as with "Moreover".', 'Band descriptor-এ "mechanical" linking নিয়ে সতর্ক করা হয়। ভালো লেখক "Moreover"-এর মতোই this, these, which আর such দিয়ে জোড়েন।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('Two versions of a paragraph', 'একটা paragraph-এর দুটো version'),
      situation: l('A: "Firstly, cars cause pollution. Moreover, pollution harms health. Furthermore, pollution costs money." B: "Cars cause pollution, which harms health. This problem also costs governments money."', 'A: "Firstly, cars cause pollution. Moreover, pollution harms health. Furthermore, pollution costs money." B: "Cars cause pollution, which harms health. This problem also costs governments money."'),
      question: l('Which paragraph links ideas more naturally?', 'কোন paragraph বেশি স্বাভাবিকভাবে idea জোড়ে?'),
      options: ['B: it links with which and "This problem" instead of stacking connectors', 'A: more connectors always mean a higher score', 'Both are equally natural'],
      answer: 'B: it links with which and "This problem" instead of stacking connectors',
      diagnose: {
        'B: it links with which and "This problem" instead of stacking connectors': l('Right. B uses referencing (which, This problem) and avoids repeating "pollution". A stacks connectors at the start of every sentence — examiners call this mechanical.', 'ঠিক। B referencing (which, This problem) ব্যবহার করে আর "pollution" বারবার বলে না। A প্রতিটা sentence-এর শুরুতে connector সাজিয়ে রাখে — examiner-রা একে mechanical বলেন।'),
        'A: more connectors always mean a higher score': l('The band descriptors reward linking that is accurate and natural, not the number of connectors. Overuse lowers Coherence and Cohesion.', 'Band descriptor সঠিক আর স্বাভাবিক linking-কে পুরস্কৃত করে, connector-এর সংখ্যাকে না। অতিরিক্ত ব্যবহার Coherence and Cohesion কমায়।'),
        'Both are equally natural': l('A repeats "pollution" three times and starts every sentence with a connector. B links through meaning: which, This problem, also.', 'A "pollution" তিনবার বলে আর প্রতিটা sentence connector দিয়ে শুরু করে। B অর্থ দিয়ে জোড়ে: which, This problem, also।'),
      },
    },
    {
      kind: 'discover',
      title: l('Linking without a connector', 'Connector ছাড়া linking'),
      items: [
        { en: 'Many graduates cannot find jobs. This leads to frustration.', note: l('This = the whole previous idea', 'This = আগের পুরো idea') },
        { en: 'The government built new roads, which reduced travel time.', note: l(', which = the previous clause', ', which = আগের clause') },
        { en: 'Solar panels are cheap. These devices can power a small home.', note: l('These devices = synonym + reference', 'These devices = synonym + reference') },
        { en: 'Such problems are common in fast-growing cities.', note: l('Such + noun = problems of that kind', 'Such + noun = এমন ধরনের সমস্যা') },
      ],
      question: l('What do this, which, these and such do?', 'this, which, these আর such কী করে?'),
      options: [
        l('They point back to an idea, so you link sentences without repeating words or adding connectors', 'এরা আগের idea-র দিকে ইঙ্গিত করে, তাই word বারবার না বলে বা connector না বাড়িয়ে sentence জোড়া যায়'),
        l('They show contrast', 'এরা বিপরীত দেখায়'),
        l('They are only used in speaking', 'এরা শুধু speaking-এ ব্যবহার হয়'),
      ],
      answer: 0,
      pattern: l('Reference words (this, these, such, which, it, they) link sentences through meaning. Use a noun after this / these when the reference could be unclear: "This problem", "These changes".', 'Reference word (this, these, such, which, it, they) অর্থ দিয়ে sentence জোড়ে। Reference অস্পষ্ট হতে পারলে this / these-এর পরে noun দিন: "This problem", "These changes"।'),
    },
    {
      kind: 'concept',
      title: l('Cohesion that sounds natural', 'স্বাভাবিক শোনায় এমন cohesion'),
      body: l(
        'Cohesion is how your sentences hold together. Connectors are one tool; referencing, synonyms and sentence joining are the others. Band 7 writing uses all of them, and uses connectors only where the logic needs them.',
        'Cohesion হলো sentence-গুলো কীভাবে একসাথে থাকে। Connector একটা উপায়; referencing, synonym আর sentence জোড়া অন্য উপায়। Band 7-এর লেখা সবগুলো ব্যবহার করে, আর connector শুধু যেখানে যুক্তির দরকার সেখানে।',
      ),
      points: [
        l('Refer back: this / these + noun (This trend, These measures), such + noun (Such policies), it / they, and ", which" for the whole previous clause.', 'আগের দিকে ইঙ্গিত: this / these + noun (This trend, These measures), such + noun (Such policies), it / they, আর আগের পুরো clause-এর জন্য ", which"।'),
        l('Use synonyms instead of repeating: cars → vehicles; the government → the authorities; rose → increased / climbed.', 'বারবার না বলে synonym দিন: cars → vehicles; the government → the authorities; rose → increased / climbed।'),
        l('One or two sentence connectors per paragraph are enough. Put them where the logic changes (a contrast, a result), not at the start of every sentence.', 'প্রতি paragraph-এ এক-দুটো sentence connector যথেষ্ট। যুক্তি যেখানে বদলায় (বিপরীত, ফলাফল) সেখানে দিন, প্রতিটা sentence-এর শুরুতে না।'),
        l('NOT: a connector that does not match the logic ("Moreover" before a contrast), "which" for a person (who), or "this" when the reader cannot tell what it means.', 'না: যুক্তির সাথে না মেলা connector (বিপরীতের আগে "Moreover"), মানুষের জন্য "which" (who), বা পাঠক বুঝতে না পারলে "this"।'),
        l('Why Bangla speakers slip: in Bangla essays, "প্রথমত, দ্বিতীয়ত, তাছাড়া, অধিকন্তু" at the start of every sentence is taught as good style. In English, it reads as mechanical; referencing reads as fluent.', 'বাংলাভাষীরা কেন ভুল করে: বাংলা রচনায় প্রতিটা sentence-এর শুরুতে "প্রথমত, দ্বিতীয়ত, তাছাড়া, অধিকন্তু" ভালো style হিসেবে শেখানো হয়। English-এ এটা mechanical শোনায়; referencing সাবলীল শোনায়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Before → after', 'আগে → পরে'),
      items: [
        { en: 'Prices rose. Moreover, prices rose again. → Prices rose, and this trend continued the next year.', note: l('reference instead of repetition', 'বারবার না বলে reference') },
        { en: 'Many people use buses. Buses are cheap. → Many people use buses, which are cheap.', note: l(', which joins and removes repetition', ', which জোড়ে আর পুনরাবৃত্তি সরায়') },
        { en: 'Moreover, however, the plan failed. → However, the plan failed.', note: l('one connector that matches the logic', 'যুক্তির সাথে মেলে এমন একটা connector') },
        { en: 'The authorities banned plastic bags. Such measures reduce waste.', note: l('synonym + such', 'synonym + such') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'The number of cars doubled, which led to more congestion. This problem was worst in the capital.', note: l('Task 2 / Task 1: which + This problem link ideas naturally.', 'Task 2 / Task 1: which + This problem স্বাভাবিকভাবে idea জোড়ে।') },
        { skill: 'speaking', example: 'My town has a big river, which is why fishing is popular there.', note: l('Part 1: ", which is why" — a fluent spoken link.', 'Part 1: ", which is why" — সাবলীল মৌখিক link।') },
        { skill: 'reading', example: 'This approach, however, has been criticised.', note: l('Reading: "This approach" points back — find what it refers to for summary questions.', 'Reading: "This approach" আগের দিকে ইঙ্গিত করে — summary প্রশ্নের জন্য কোনটাকে বোঝাচ্ছে খুঁজুন।') },
        { skill: 'listening', example: 'We’ve changed the timetable. These changes start next week.', note: l('Listening: "These changes" tells you the topic is still the timetable.', 'Listening: "These changes" বলে topic এখনো timetable।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Firstly, … Moreover, … Furthermore, … In addition, … (every sentence)', right: 'Use one connector where the logic changes; link the rest with this / which.', why: l('Mechanical linking lowers Coherence and Cohesion.', 'Mechanical linking Coherence and Cohesion কমায়।') },
        { wrong: 'Traffic is bad. Moreover, the metro has reduced it.', right: 'Traffic is bad. However, the metro has reduced it.', why: l('The logic is contrast → However.', 'যুক্তিটা বিপরীত → However।') },
        { wrong: 'My uncle, which is a doctor, lives in Dubai.', right: 'My uncle, who is a doctor, lives in Dubai.', why: l('People → who; things / ideas → which.', 'মানুষ → who; জিনিস / idea → which।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('cn-6-p1', 'conn-cohesion', { ...C, pattern: 'conn-meaning', prompt: l('Choose the word that refers back to the whole idea.', 'আগের পুরো idea-র দিকে ইঙ্গিত করে এমন word বেছে নিন।'), sentence: 'Many young people spend hours on their phones. ___ can affect their sleep.', options: ['This', 'Moreover', 'Which'], answer: 'This', explanation: l('This = the whole previous idea (spending hours on phones).', 'This = আগের পুরো idea (phone-এ ঘণ্টার পর ঘণ্টা কাটানো)।'), why: { Moreover: l('Moreover adds a new point; it cannot be the subject of "can affect".', 'Moreover নতুন point যোগ করে; "can affect"-এর subject হতে পারে না।'), Which: l('Which cannot start a new sentence here; use ", which" inside the sentence.', 'Which এখানে নতুন sentence শুরু করতে পারে না; sentence-এর ভেতরে ", which" দিন।') } }),
        choice('cn-6-p2', 'conn-cohesion', { ...C, pattern: 'conn-meaning', prompt: l('Choose the connector that matches the logic.', 'যুক্তির সাথে মেলে এমন connector বেছে নিন।'), sentence: 'The new bridge was expensive. ___, it has cut travel time in half.', options: ['However', 'Moreover', 'Therefore'], answer: 'However', explanation: l('Expensive vs useful → contrast → However.', 'দামি বনাম কাজের → বিপরীত → However।'), why: { Moreover: l('Moreover adds a point in the same direction; here the second idea is a positive contrast.', 'Moreover একই দিকে point যোগ করে; এখানে দ্বিতীয় idea একটা ইতিবাচক বিপরীত।'), Therefore: l('Cutting travel time is not a result of the cost.', 'যাতায়াতের সময় কমা খরচের ফলাফল না।') } }),
        choice('cn-6-p3', 'conn-cohesion', { ...C, pattern: 'conn-form', prompt: l('Choose the best way to join the sentences.', 'Sentence দুটো জোড়ার সবচেয়ে ভালো উপায় বেছে নিন।'), sentence: 'The city opened a metro line. The metro line has reduced traffic.', options: ['The city opened a metro line, which has reduced traffic.', 'The city opened a metro line, who has reduced traffic.', 'The city opened a metro line. Moreover, the metro line has reduced traffic.'], answer: 'The city opened a metro line, which has reduced traffic.', explanation: l(', which joins and removes the repeated noun.', ', which জোড়ে আর বারবার আসা noun সরায়।'), why: { 'The city opened a metro line, who has reduced traffic.': l('who is for people; a metro line → which.', 'who মানুষের জন্য; metro line → which।'), 'The city opened a metro line. Moreover, the metro line has reduced traffic.': l('Moreover adds nothing here and "the metro line" is repeated.', 'এখানে Moreover কিছু যোগ করে না আর "the metro line" বারবার।') } }),
        choice('cn-6-p4', 'conn-cohesion', { ...C, pattern: 'conn-meaning', prompt: l('Which reference is clearest?', 'কোন reference সবচেয়ে পরিষ্কার?'), sentence: 'The government raised fuel taxes and cut bus fares. ___ encouraged people to leave their cars at home.', options: ['These changes', 'It', 'Which'], answer: 'These changes', explanation: l('Two actions → These changes (a noun makes the reference clear).', 'দুটো কাজ → These changes (noun থাকলে reference পরিষ্কার হয়)।'), why: { It: l('"It" is unclear: the tax, the fare cut, or the government?', '"It" অস্পষ্ট: tax, ভাড়া কমানো, নাকি government?'), Which: l('Which cannot start a sentence here.', 'Which এখানে sentence শুরু করতে পারে না।') } }),
        choice('cn-6-p5', 'conn-cohesion', { ...C, pattern: 'conn-meaning', prompt: l('Task 2: which paragraph is best linked?', 'Task 2: কোন paragraph সবচেয়ে ভালোভাবে জোড়া?'), options: ['Tourism creates jobs. However, it can damage the environment, which may harm the same communities in the long term.', 'Firstly, tourism creates jobs. Moreover, tourism damages the environment. Furthermore, tourism harms communities.', 'Tourism creates jobs. Moreover, however, it damages nature. Therefore moreover it harms communities.'], answer: 'Tourism creates jobs. However, it can damage the environment, which may harm the same communities in the long term.', explanation: l('One connector for the contrast; which and it link the rest.', 'বিপরীতের জন্য একটা connector; which আর it বাকিটা জোড়ে।'), why: { 'Firstly, tourism creates jobs. Moreover, tourism damages the environment. Furthermore, tourism harms communities.': l('The second idea is a contrast, not an addition, and "tourism" is repeated.', 'দ্বিতীয় idea বিপরীত, যোগ না, আর "tourism" বারবার।'), 'Tourism creates jobs. Moreover, however, it damages nature. Therefore moreover it harms communities.': l('Stacked connectors that contradict each other.', 'একে অপরের বিপরীত connector একসাথে স্তূপ করা।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cn-6-r1', 'conn-cohesion', { ...C, pattern: 'conn-form', prompt: l('Write who or which.', 'who বা which লিখুন।'), sentence: 'The village has a new clinic, ___ opens every day.', accepted: ['which'], explanation: l('A thing (clinic) → which.', 'জিনিস (clinic) → which।'), why: { who: l('who is only for people.', 'who শুধু মানুষের জন্য।') } }),
        gap('cn-6-r2', 'conn-cohesion', { ...C, pattern: 'conn-meaning', prompt: l('Write one reference word (plural).', 'একটা reference word লিখুন (plural)।'), sentence: 'The city planted trees and built cycle lanes. ___ measures have made the air cleaner.', accepted: ['these', 'such'], explanation: l('Plural measures → These (or Such) measures.', 'Plural measures → These (বা Such) measures।'), why: { this: l('"measures" is plural → These.', '"measures" plural → These।') } }),
        correct('cn-6-r3', 'conn-cohesion', { ...C, pattern: 'conn-meaning', prompt: l('Correct the connector so it matches the logic.', 'Connector ঠিক করুন যাতে যুক্তির সাথে মেলে।'), sentence: 'The phone is cheap. Moreover, the camera is poor.', accepted: ['The phone is cheap. However, the camera is poor.', 'The phone is cheap; however, the camera is poor.', 'The phone is cheap, but the camera is poor.'], explanation: l('Cheap (good) vs poor camera (bad) → contrast.', 'সস্তা (ভালো) বনাম খারাপ camera → বিপরীত।') }),
        spot('cn-6-r4', 'conn-cohesion', { ...C, pattern: 'conn-form', prompt: l('One word is wrong. Tap it and type the right one.', 'একটা word ভুল। সেটায় tap করে সঠিকটা লিখুন।'), sentence: 'I met a student which speaks five languages.', wrong: 'which', accepted: ['who', 'that'], explanation: l('A person → who.', 'মানুষ → who।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cn-6-c1', 'conn-cohesion', { ...C, pattern: 'conn-meaning', prompt: l('What does "This" refer to? "Online shopping has grown quickly. This has hurt small shops."', '"This" কাকে বোঝায়? "Online shopping has grown quickly. This has hurt small shops."'), options: ['The fast growth of online shopping', 'Small shops', 'Shopping in general'], answer: 'The fast growth of online shopping', explanation: l('This = the whole previous idea.', 'This = আগের পুরো idea।') }),
        spot('cn-6-c2', 'conn-cohesion', { ...C, pattern: 'conn-meaning', prompt: l('One word breaks the logic. Tap it, then fix it.', 'একটা word যুক্তি ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Many people want to work abroad. Therefore, others prefer to stay near their families.', wrong: 'Therefore', accepted: ['However'], fixOptions: ['However', 'Moreover', 'Because'], explanation: l('Two different choices → contrast → However.', 'দুটো আলাদা পছন্দ → বিপরীত → However।') }),
        order('cn-6-c3', 'conn-cohesion', { ...C, pattern: 'conn-form', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Prices rose sharply, which surprised many experts.', explanation: l(', which refers to the whole previous clause.', ', which আগের পুরো clause-কে বোঝায়।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: rewrite a mechanical paragraph', 'এবার আপনার পালা: একটা mechanical paragraph নতুন করে লিখুন'),
      exercises: [
        write('cn-6-y1', 'conn-cohesion', {
          ...C,
          prompt: l('Rewrite this paragraph in 3 sentences so it links naturally: "Firstly, plastic is cheap. Moreover, plastic is everywhere. Furthermore, plastic pollutes rivers. In addition, plastic harms fish." Use which and This / These + noun, and at most one connector.', 'এই paragraph-টা ৩টা sentence-এ নতুন করে লিখুন যাতে স্বাভাবিকভাবে জোড়া থাকে: "Firstly, plastic is cheap. Moreover, plastic is everywhere. Furthermore, plastic pollutes rivers. In addition, plastic harms fish." which আর This / These + noun ব্যবহার করুন, আর সর্বোচ্চ একটা connector।'),
          model: 'Plastic is cheap, which is why it is found everywhere. However, it often ends up in rivers. This pollution harms fish and the people who depend on them.',
          checklist: [l(', which to join and avoid repeating', 'জোড়া দিতে আর পুনরাবৃত্তি এড়াতে , which'), l('This / These + noun to refer back', 'আগের দিকে ইঙ্গিত করতে This / These + noun'), l('at most one connector, matching the logic', 'সর্বোচ্চ একটা connector, যুক্তির সাথে মিলিয়ে')],
          explanation: l('Link through meaning, not through a list of connectors.', 'Connector-এর তালিকা দিয়ে না, অর্থ দিয়ে জোড়ুন।'),
          task: 'The student rewrites a mechanical paragraph about plastic in 3 sentences. Check cohesion only: the paragraph should not start every sentence with a connector; it should use referencing (this / these + noun, such + noun, it / they, ", which" for the previous clause) and synonyms instead of repeating "plastic"; any connector used must match the logic (However for contrast, As a result for result, not Moreover everywhere); "which" for things, "who" for people; "this" must refer to something clear. Praise natural linking. For each issue quote the words, say what makes it mechanical or unclear, and give a better version.',
          target: l('Natural cohesion: which, This + noun', 'স্বাভাবিক cohesion: which, This + noun'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Link through meaning: This problem, These changes, Such policies, …, which …', 'অর্থ দিয়ে জোড়ুন: This problem, These changes, Such policies, …, which …'),
        l('One or two connectors per paragraph, where the logic changes.', 'প্রতি paragraph-এ এক-দুটো connector, যেখানে যুক্তি বদলায়।'),
        l('The connector must match the logic; which for things, who for people.', 'Connector যুক্তির সাথে মিলতে হবে; জিনিসে which, মানুষে who।'),
      ],
    },
  ],
};

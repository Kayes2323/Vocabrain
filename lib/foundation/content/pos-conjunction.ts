import type { Lesson, Pos } from '../model';
import { choice, correct, gap, identify, l, spot, tagWords, write } from './pos-kit';

/** Parts of Speech · Conjunction: 3 short lessons; continues in Connectors and Complex Sentences. Original Vocab Brain content. */
const C = 'pos-conjunction';
const JOBS: Pos[] = ['noun', 'verb', 'adjective', 'conjunction'];

// ======================================================================= 1
const c1: Lesson = {
  id: 'pcj-1', unit: 'conjunction', format: 'v2', concept: C, minutes: 5, difficulty: 'easy', skill: 'grammar',
  title: l('Joining words', 'জোড়া দেওয়ার word'),
  why: l('and, but, or, so let you build longer sentences, which Speaking and Writing reward.', 'and, but, or, so দিয়ে লম্বা sentence বানানো যায়, যা Speaking আর Writing-এ নম্বর আনে।'),
  steps: [
    {
      kind: 'hook',
      title: l('Short, choppy answers', 'ছোট ছোট ভাঙা উত্তর'),
      situation: l('Speaking Part 1: "I like my city. It is crowded. I still love it."', 'Speaking Part 1: "I like my city. It is crowded. I still love it."'),
      question: l('Which joining word best connects "It is crowded" and "I still love it"?', '"It is crowded" আর "I still love it" জোড়ার জন্য কোন word সবচেয়ে ভালো?'),
      options: ['but', 'and', 'so'], answer: 'but',
      diagnose: {
        but: l('Right. "but" joins two ideas that contrast: crowded, but I love it.', 'ঠিক। "but" দুটো বিপরীত ধারণা জোড়ে: crowded, but I love it।'),
        and: l('"and" adds a similar idea. Here the ideas contrast.', '"and" একই ধরনের ধারণা যোগ করে। এখানে ধারণা দুটো বিপরীত।'),
        so: l('"so" gives a result. Being crowded is not the reason you love it.', '"so" ফলাফল দেয়। Crowded হওয়া ভালোবাসার কারণ না।'),
      },
    },
    identify({
      sentence: 'The city/noun is/verb crowded/adjective, but/conjunction I love/verb it, so/conjunction I stay/verb.',
      choices: JOBS,
      pattern: l('"but" and "so" join two complete ideas. They are conjunctions: joining words.', '"but" আর "so" দুটো সম্পূর্ণ ধারণা জোড়ে। এরা conjunction: জোড়া দেওয়ার word।'),
    }),
    {
      kind: 'concept',
      title: l('and, but, or, so', 'and, but, or, so'),
      body: l('Conjunctions join words or ideas. and = add (tea and coffee); but = contrast (cheap but slow); or = choice (bus or train); so = result (it was raining, so I stayed home). When they join two full sentences, put a comma before but and so.', 'Conjunction word বা ধারণা জোড়ে। and = যোগ (tea and coffee); but = বিপরীত (cheap but slow); or = বিকল্প (bus or train); so = ফলাফল (it was raining, so I stayed home)। দুটো পূর্ণ sentence জুড়লে but আর so-এর আগে comma দাও।'),
      points: [
        l('so = result; because = reason. It was late, so I took a taxi. / I took a taxi because it was late.', 'so = ফলাফল; because = কারণ। It was late, so I took a taxi। / I took a taxi because it was late।'),
        l('Don’t start every sentence with "And" or "But" in formal writing.', 'Formal writing-এ প্রতিটা sentence "And" বা "But" দিয়ে শুরু করো না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'Buses are cheap, but they are often late.', note: l('contrast', 'বিপরীত') },
        { en: 'You can pay by cash or by card.', note: l('choice', 'বিকল্প') },
        { en: 'The roads were flooded, so schools closed.', note: l('result', 'ফলাফল') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'speaking', example: 'I like living in Dhaka, but the traffic is terrible, so I leave home early.', note: l('Fluency & Coherence: linked answers sound natural.', 'Fluency & Coherence: জোড়া উত্তর স্বাভাবিক শোনায়।') },
        { skill: 'writing', example: 'Online courses are flexible, but students need self-discipline.', note: l('Task 2: show both sides in one clear sentence.', 'Task 2: এক পরিষ্কার sentence-এ দুই দিক দেখাও।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'It was raining, because I took an umbrella.', right: 'It was raining, so I took an umbrella.', why: l('Result → so. (because gives the reason.)', 'ফলাফল → so। (because কারণ দেয়।)') },
        { wrong: 'I like tea but I like coffee.', right: 'I like tea and coffee.', why: l('No contrast → and.', 'বিপরীত নেই → and।') },
        { wrong: 'The flat is small, and it is cheap. (to show a contrast)', right: 'The flat is small, but it is cheap.', why: l('A contrast needs "but".', 'বিপরীত বোঝাতে "but"।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pcj-1-p1', C, { tag: 'connector', prompt: l('Choose the joining word.', 'জোড়া দেওয়ার word-টা বাছো।'), sentence: 'The test was difficult, ______ I passed.', options: ['but', 'so', 'or'], answer: 'but', explanation: l('difficult ↔ passed: contrast → but.', 'কঠিন ↔ পাস: বিপরীত → but।') }),
        choice('pcj-1-p2', C, { tag: 'connector', prompt: l('Choose the joining word.', 'জোড়া দেওয়ার word-টা বাছো।'), sentence: 'I missed the bus, ______ I was late for class.', options: ['so', 'but', 'or'], answer: 'so', explanation: l('Result → so.', 'ফলাফল → so।') }),
        choice('pcj-1-p3', C, { tag: 'connector', prompt: l('Choose the joining word.', 'জোড়া দেওয়ার word-টা বাছো।'), sentence: 'Would you like tea ______ coffee?', options: ['or', 'and', 'so'], answer: 'or', explanation: l('Choice → or.', 'বিকল্প → or।') }),
        tagWords('pcj-1-p4', C, { tag: 'connector', sentence: 'Rent/noun is/verb high/adjective, so/conjunction many students/noun share/verb flats/noun.', choices: JOBS, explanation: l('"so" joins the cause (high rent) and the result (sharing flats).', '"so" কারণ (বেশি ভাড়া) আর ফলাফল (flat ভাগ করা) জোড়ে।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pcj-1-r1', C, { tag: 'connector', prompt: l('Write and / but / or / so.', 'and / but / or / so লেখো।'), sentence: 'The hotel was expensive, ___ the rooms were small.', accepted: ['but', 'and'], explanation: l('A negative contrast (expensive but small) → but; "and" also works to add a second complaint.', 'বিপরীত (expensive but small) → but; আরেকটা অভিযোগ যোগ করতে "and"-ও চলে।') }),
        gap('pcj-1-r2', C, { tag: 'connector', prompt: l('Write and / but / or / so.', 'and / but / or / so লেখো।'), sentence: 'It was a public holiday, ___ the offices were closed.', accepted: ['so'], explanation: l('Result → so.', 'ফলাফল → so।') }),
        spot('pcj-1-r3', C, { tag: 'connector', sentence: 'I was very tired, because I went to bed early.', wrong: 'because', accepted: ['so'], explanation: l('Being tired → going to bed early is a result: so.', 'ক্লান্ত → তাড়াতাড়ি ঘুমানো, এটা ফলাফল: so।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pcj-1-c1', C, { tag: 'connector', prompt: l('What is the difference between "so" and "because"?', '"so" আর "because"-এর পার্থক্য কী?'), options: ['so introduces a result; because introduces a reason', 'They mean the same', 'so is only for Speaking'], answer: 'so introduces a result; because introduces a reason', explanation: l('It rained, so I stayed. / I stayed because it rained.', 'It rained, so I stayed। / I stayed because it rained।') }),
        spot('pcj-1-c2', C, { tag: 'connector', sentence: 'Metro trains are fast, so they are expensive for some people.', wrong: 'so', accepted: ['but'], fixOptions: ['but', 'or', 'because'], explanation: l('fast ↔ expensive is a contrast → but.', 'দ্রুত ↔ দামি, এটা বিপরীত → but।') }),
        choice('pcj-1-c3', C, { tag: 'connector', prompt: l('Choose the best sentence for Speaking.', 'Speaking-এর জন্য সবচেয়ে ভালো sentence বাছো।'), options: ['My village is quiet, and the air is fresh, so I visit it often.', 'My village is quiet. The air is fresh. I visit it often.'], answer: 'My village is quiet, and the air is fresh, so I visit it often.', explanation: l('Linked ideas sound fluent.', 'জোড়া ধারণা সাবলীল শোনায়।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pcj-1-w1', C, {
          tag: 'connector',
          prompt: l('Speaking Part 1: "Do you like your neighbourhood?" Answer in one sentence with "but" and "so".', 'Speaking Part 1: "Do you like your neighbourhood?" "but" আর "so" দিয়ে এক sentence-এ উত্তর দাও।'),
          model: 'Yes, it is a bit noisy, but my friends live nearby, so I really enjoy living there.',
          task: 'The student answers "Do you like your neighbourhood?" in one sentence using "but" (contrast) and "so" (result). Check the meaning of each conjunction, commas before but/so joining clauses, and grammar.',
          target: l('but (contrast) + so (result)', 'but (বিপরীত) + so (ফলাফল)'),
          checklist: [l('"but" joins two contrasting ideas', '"but" দুটো বিপরীত ধারণা জোড়ে'), l('"so" introduces a result', '"so" একটা ফলাফল আনে')],
          explanation: l('noisy, but my friends live nearby, so I enjoy it.', 'noisy, but my friends live nearby, so I enjoy it।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('and = add, but = contrast, or = choice, so = result.', 'and = যোগ, but = বিপরীত, or = বিকল্প, so = ফলাফল।'),
        l('Comma before but / so when they join two full sentences.', 'দুটো পূর্ণ sentence জুড়লে but / so-এর আগে comma।'),
      ],
    },
  ],
};

// ======================================================================= 2
const c2: Lesson = {
  id: 'pcj-2', unit: 'conjunction', format: 'v2', concept: C, minutes: 5, difficulty: 'medium', skill: 'grammar',
  title: l('because, although, while, if', 'because, although, while, if'),
  why: l('"Because it is cheap." on its own is an incomplete sentence: a common Task 2 error.', '"Because it is cheap." একা একটা অসম্পূর্ণ sentence: Task 2-এর common ভুল।'),
  steps: [
    {
      kind: 'hook',
      title: l('A Task 2 answer', 'একটা Task 2 উত্তর'),
      situation: l('Tamim writes: "Many people prefer buses. Because they are cheap."', 'Tamim লিখলো: "Many people prefer buses. Because they are cheap."'),
      question: l('What is the problem?', 'সমস্যা কী?'),
      options: ['"Because they are cheap." cannot stand alone', '"buses" should be "bus"', 'Nothing'], answer: '"Because they are cheap." cannot stand alone',
      diagnose: {
        '"Because they are cheap." cannot stand alone': l('Right. A because-clause needs a main clause: Many people prefer buses because they are cheap.', 'ঠিক। because-clause-এর সাথে একটা main clause লাগে: Many people prefer buses because they are cheap।'),
        '"buses" should be "bus"': l('"buses" is fine. Look at the second "sentence".', '"buses" ঠিক আছে। দ্বিতীয় "sentence"-টা দেখো।'),
        Nothing: l('In speech it is fine, but in writing a because-clause alone is a fragment.', 'কথায় চলে, কিন্তু লেখায় because-clause একা থাকলে সেটা ভাঙা sentence।'),
      },
    },
    identify({
      sentence: 'Although/conjunction the flat/noun is/verb small/adjective, we like/verb it because/conjunction it is/verb bright/adjective.',
      choices: JOBS,
      pattern: l('although and because start clauses that depend on the main clause "we like it". They cannot stand alone.', 'although আর because এমন clause শুরু করে যা main clause "we like it"-এর উপর নির্ভর করে। এরা একা দাঁড়াতে পারে না।'),
    }),
    {
      kind: 'concept',
      title: l('Clauses that need a partner', 'যে clause-এর সাথী লাগে'),
      body: l('because (reason), although / even though (contrast), while / whereas (comparison), if (condition), when (time) start a dependent clause. It must join a main clause: "Although it was raining, we went out." If the dependent clause comes first, put a comma after it.', 'because (কারণ), although / even though (বিপরীত), while / whereas (তুলনা), if (শর্ত), when (সময়) একটা নির্ভরশীল clause শুরু করে। এটাকে একটা main clause-এর সাথে জুড়তে হবে: "Although it was raining, we went out." নির্ভরশীল clause আগে এলে তার পরে comma দাও।'),
      points: [
        l('while / whereas compare two facts: Urban incomes rose, whereas rural incomes fell.', 'while / whereas দুটো তথ্য তুলনা করে: Urban incomes rose, whereas rural incomes fell।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'Many people prefer buses because they are cheap.', note: l('reason, joined to the main clause', 'কারণ, main clause-এর সাথে জোড়া') },
        { en: 'Although the course is expensive, it is worth it.', note: l('contrast; comma after the first clause', 'বিপরীত; প্রথম clause-এর পরে comma') },
        { en: 'If the government invests, traffic will improve.', note: l('condition', 'শর্ত') },
        { en: 'Car use rose in cities, while it fell in villages.', note: l('comparison (Task 1)', 'তুলনা (Task 1)') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'writing', example: 'Although technology saves time, it can isolate people.', note: l('Task 2: complex sentences show Grammatical Range.', 'Task 2: complex sentence Grammatical Range দেখায়।') },
        { skill: 'writing', example: 'Sales rose in Asia, whereas they fell in Europe.', note: l('Task 1: while / whereas compare two groups.', 'Task 1: while / whereas দুটো group তুলনা করে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'People move to cities. Because there are more jobs.', right: 'People move to cities because there are more jobs.', why: l('Join the because-clause to the main clause.', 'because-clause-কে main clause-এর সাথে জোড়ো।') },
        { wrong: 'Although it was late we continued.', right: 'Although it was late, we continued.', why: l('Comma after the first (dependent) clause.', 'প্রথম (নির্ভরশীল) clause-এর পরে comma।') },
        { wrong: 'If I will have time, I will help.', right: 'If I have time, I will help.', why: l('After "if" (future meaning) use the present.', '"if"-এর পরে (ভবিষ্যৎ অর্থে) present।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pcj-2-p1', C, { tag: 'connector', prompt: l('Choose the joining word.', 'জোড়া দেওয়ার word-টা বাছো।'), sentence: '______ it was expensive, she bought the laptop.', options: ['Although', 'Because', 'If'], answer: 'Although', explanation: l('expensive ↔ bought: contrast → Although.', 'দামি ↔ কিনলো: বিপরীত → Although।') }),
        choice('pcj-2-p2', C, { tag: 'connector', prompt: l('Choose the correct option.', 'সঠিকটা বাছো।'), options: ['I stayed home because I was ill.', 'I stayed home. Because I was ill.'], answer: 'I stayed home because I was ill.', explanation: l('The because-clause must join the main clause.', 'because-clause main clause-এর সাথে জুড়তে হবে।') }),
        choice('pcj-2-p3', C, { tag: 'connector', prompt: l('Task 1: choose the joining word.', 'Task 1: জোড়া দেওয়ার word-টা বাছো।'), sentence: 'Men spent more on transport, ______ women spent more on food.', options: ['whereas', 'because', 'so'], answer: 'whereas', explanation: l('Comparing two groups → whereas / while.', 'দুটো group তুলনা → whereas / while।') }),
        choice('pcj-2-p4', C, { tag: 'connector', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'If it ______ tomorrow, the match will be cancelled.', options: ['rains', 'will rain', 'rained'], answer: 'rains', explanation: l('if + present for a future condition.', 'ভবিষ্যৎ শর্তে if + present।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        correct('pcj-2-r1', C, { tag: 'connector', prompt: l('Join into one correct sentence.', 'এক সঠিক sentence-এ জোড়ো।'), sentence: 'Many students work part-time. Because fees are high.', accepted: ['Many students work part-time because fees are high.', 'Because fees are high, many students work part-time.'], explanation: l('Join the because-clause to the main clause.', 'because-clause-কে main clause-এর সাথে জোড়ো।') }),
        gap('pcj-2-r2', C, { tag: 'connector', prompt: l('Write a joining word for contrast.', 'বিপরীত বোঝাতে জোড়া দেওয়ার word লেখো।'), sentence: '___ the rain was heavy, the match continued.', accepted: ['although', 'though', 'even though'], explanation: l('Contrast → Although.', 'বিপরীত → Although।') }),
        correct('pcj-2-r3', C, { tag: 'connector', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে আবার লেখো।'), sentence: 'If I will pass IELTS, I will study in Canada.', accepted: ['If I pass IELTS, I will study in Canada.', 'If I pass IELTS, I’ll study in Canada.', "If I pass IELTS, I'll study in Canada."], explanation: l('if + present: If I pass…', 'if + present: If I pass…') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pcj-2-c1', C, { tag: 'connector', prompt: l('Why is "Because it is cheap." wrong in writing?', 'লেখায় "Because it is cheap." ভুল কেন?'), options: ['It is a dependent clause with no main clause', 'because must be at the end', '"cheap" needs an adverb'], answer: 'It is a dependent clause with no main clause', explanation: l('Join it: People choose buses because they are cheap.', 'জোড়ো: People choose buses because they are cheap।') }),
        spot('pcj-2-c2', C, { tag: 'connector', sentence: 'I stayed at home although I had a high fever.', wrong: 'although', accepted: ['because', 'as', 'since'], fixOptions: ['because', 'but', 'so'], explanation: l('The fever is the reason → because.', 'জ্বর হলো কারণ → because।') }),
        choice('pcj-2-c3', C, { tag: 'connector', prompt: l('Choose the correctly punctuated sentence.', 'সঠিক punctuation-এর sentence বাছো।'), options: ['When I finish school, I want to study abroad.', 'When I finish school I want, to study abroad.'], answer: 'When I finish school, I want to study abroad.', explanation: l('Comma after the first (dependent) clause.', 'প্রথম (নির্ভরশীল) clause-এর পরে comma।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pcj-2-w1', C, {
          tag: 'connector',
          prompt: l('Task 2: write one sentence starting with "Although" about living in a big city.', 'Task 2: বড় শহরে থাকা নিয়ে "Although" দিয়ে শুরু করে একটা sentence লেখো।'),
          model: 'Although big cities offer more jobs, the cost of living there is very high.',
          task: 'The student writes one Task 2 sentence starting with "Although" about living in a big city. Check that the although-clause is joined to a main clause, a comma separates them, and there is no "but" in the main clause.',
          target: l('Although …, main clause', 'Although …, main clause'),
          checklist: [l('A comma after the although-clause', 'although-clause-এর পরে comma'), l('No "but" in the second part', 'দ্বিতীয় অংশে "but" নেই')],
          explanation: l('Although big cities offer more jobs, the cost… is high.', 'Although big cities offer more jobs, the cost… is high।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('because / although / if / when / while clauses must join a main clause.', 'because / although / if / when / while clause-কে main clause-এর সাথে জুড়তে হবে।'),
        l('Dependent clause first → comma. if + present for the future.', 'নির্ভরশীল clause আগে → comma। ভবিষ্যতে if + present।'),
      ],
    },
  ],
};

// ======================================================================= 3
const c3: Lesson = {
  id: 'pcj-3', unit: 'conjunction', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'grammar',
  title: l('although, however, despite', 'although, however, despite'),
  why: l('"Although…, but…" is one of the most frequent errors in Bangladeshi students’ essays.', '"Although…, but…" বাংলাদেশি student-দের essay-তে সবচেয়ে বেশি দেখা ভুলগুলোর একটা।'),
  steps: [
    {
      kind: 'hook',
      title: l('A Task 2 sentence', 'একটা Task 2 sentence'),
      situation: l('Liza writes: "Although online classes are flexible, but many students feel lonely."', 'Liza লিখলো: "Although online classes are flexible, but many students feel lonely."'),
      question: l('What should she change?', 'তার কী বদলানো উচিত?'),
      options: ['Remove "but"', 'Remove the comma', 'Change "Although" to "Because"'], answer: 'Remove "but"',
      diagnose: {
        'Remove "but"': l('Right. In Bangla we say "যদিও…, কিন্তু…", but English uses only ONE: although OR but.', 'ঠিক। বাংলায় বলি "যদিও…, কিন্তু…", কিন্তু English-এ শুধু একটা: although অথবা but।'),
        'Remove the comma': l('The comma is correct. The problem is using two contrast words.', 'Comma ঠিক আছে। সমস্যা হলো দুটো বিপরীতবাচক word।'),
        'Change "Although" to "Because"': l('The ideas contrast, so "although" is right. Remove "but".', 'ধারণা দুটো বিপরীত, তাই "although" ঠিক। "but" বাদ দাও।'),
      },
    },
    identify({
      sentence: 'Although/conjunction prices/noun rose/verb, sales/noun increased/verb.',
      choices: JOBS,
      pattern: l('One contrast word is enough: although joins the two ideas. No "but" is needed.', 'একটা বিপরীতবাচক word-ই যথেষ্ট: although দুটো ধারণা জোড়ে। "but" লাগে না।'),
    }),
    {
      kind: 'concept',
      title: l('Three ways to show contrast', 'বিপরীত দেখানোর তিন উপায়'),
      body: l('although + clause, main clause (Although it rained, we played.) — never add "but". but joins two clauses in one sentence (It rained, but we played.). however starts a NEW sentence, with a comma after it (It rained. However, we played.). despite / in spite of + noun or -ing (Despite the rain, we played. Despite being tired, she studied.).', 'although + clause, main clause (Although it rained, we played.) — কখনো "but" যোগ করো না। but এক sentence-এ দুটো clause জোড়ে (It rained, but we played.)। however নতুন sentence শুরু করে, পরে comma (It rained. However, we played.)। despite / in spite of + noun বা -ing (Despite the rain, we played. Despite being tired, she studied.)।'),
      points: [
        l('despite + noun, never despite + clause: "Despite it rained" ✗ → "Although it rained" ✓.', 'despite + noun, কখনো despite + clause না: "Despite it rained" ✗ → "Although it rained" ✓।'),
        l('"despite of" does not exist: despite / in spite of.', '"despite of" বলে কিছু নেই: despite / in spite of।'),
      ],
    },
    {
      kind: 'examples',
      title: l('The same idea, three ways', 'একই ধারণা, তিন উপায়ে'),
      items: [
        { en: 'Although the rent is high, many students live in the city.', note: l('although + clause', 'although + clause') },
        { en: 'The rent is high. However, many students live in the city.', note: l('However, + new sentence', 'However, + নতুন sentence') },
        { en: 'Despite the high rent, many students live in the city.', note: l('despite + noun', 'despite + noun') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'writing', example: 'Despite its benefits, technology has some drawbacks.', note: l('Task 2: accurate contrast structures show Grammatical Range and Coherence.', 'Task 2: সঠিক বিপরীতবাচক গঠন Grammatical Range আর Coherence দেখায়।') },
        { skill: 'reading', example: 'However, recent studies suggest…', note: l('"However" often signals the writer’s real view: read carefully after it.', '"However" প্রায়ই লেখকের আসল মত দেখায়: এর পরে মন দিয়ে পড়ো।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'Although he is rich, but he is not happy.', right: 'Although he is rich, he is not happy.', why: l('One contrast word only.', 'একটাই বিপরীতবাচক word।') },
        { wrong: 'Despite it was raining, we went out.', right: 'Despite the rain, we went out.', why: l('despite + noun (or use "Although it was raining").', 'despite + noun (অথবা "Although it was raining")।') },
        { wrong: 'The plan is good, however it is expensive.', right: 'The plan is good. However, it is expensive.', why: l('however starts a new sentence (or use a semicolon).', 'however নতুন sentence শুরু করে (অথবা semicolon)।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pcj-3-p1', C, { tag: 'connector', prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'), options: ['Although the test was hard, I passed.', 'Although the test was hard, but I passed.'], answer: 'Although the test was hard, I passed.', explanation: l('No "but" after an although-clause.', 'although-clause-এর পরে "but" না।') }),
        choice('pcj-3-p2', C, { tag: 'connector', prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: '______ the traffic, we arrived on time.', options: ['Despite', 'Although', 'However'], answer: 'Despite', explanation: l('+ noun (the traffic) → Despite.', '+ noun (the traffic) → Despite।') }),
        choice('pcj-3-p3', C, { tag: 'connector', prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: 'Solar power is clean. ______, it is still expensive in some countries.', options: ['However', 'Although', 'Despite'], answer: 'However', explanation: l('New sentence + comma → However.', 'নতুন sentence + comma → However।') }),
        choice('pcj-3-p4', C, { tag: 'connector', prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: '______ it was late, the shops were open.', options: ['Although', 'Despite', 'In spite of'], answer: 'Although', explanation: l('+ clause (it was late) → Although.', '+ clause (it was late) → Although।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        correct('pcj-3-r1', C, { tag: 'connector', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে আবার লেখো।'), sentence: 'Although the city is noisy, but I like living there.', accepted: ['Although the city is noisy, I like living there.', 'The city is noisy, but I like living there.'], explanation: l('Use only one: although OR but.', 'শুধু একটা: although অথবা but।') }),
        gap('pcj-3-r2', C, { tag: 'connector', prompt: l('Write one word.', 'একটা word লেখো।'), sentence: '___ being very tired, she finished the essay.', accepted: ['despite'], explanation: l('+ -ing → Despite.', '+ -ing → Despite।'), why: { although: l('"Although" needs a full clause: Although she was very tired…', '"Although"-এর পরে পূর্ণ clause লাগে: Although she was very tired…') } }),
        correct('pcj-3-r3', C, { tag: 'connector', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে আবার লেখো।'), sentence: 'Despite of the cost, many families buy private cars.', accepted: ['Despite the cost, many families buy private cars.', 'In spite of the cost, many families buy private cars.'], explanation: l('"despite of" does not exist: Despite the cost… / In spite of the cost…', '"despite of" বলে কিছু নেই: Despite the cost… / In spite of the cost…') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pcj-3-c1', C, { tag: 'connector', prompt: l('Why can’t we say "Although…, but…" in English?', 'English-এ "Although…, but…" কেন বলা যায় না?'), options: ['Both show contrast; one is enough', 'but must come first', '"although" is only for Speaking'], answer: 'Both show contrast; one is enough', explanation: l('Bangla uses both (যদিও… কিন্তু); English uses one.', 'বাংলায় দুটোই (যদিও… কিন্তু); English-এ একটা।') }),
        choice('pcj-3-c2', C, { tag: 'connector', prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'), options: ['Although online shopping is convenient, it can be risky.', 'Although online shopping is convenient, but it can be risky.', 'Although online shopping is convenient, however it can be risky.'], answer: 'Although online shopping is convenient, it can be risky.', explanation: l('After an although-clause: no "but", no "however".', 'although-clause-এর পরে: "but" না, "however" না।') }),
        choice('pcj-3-c3', C, { tag: 'connector', prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'), options: ['Despite the high cost, the project was completed.', 'Despite the cost was high, the project was completed.'], answer: 'Despite the high cost, the project was completed.', explanation: l('despite + noun.', 'despite + noun।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pcj-3-w1', C, {
          tag: 'connector',
          prompt: l('Task 2: write two sentences about social media: one with "Although", one with "However".', 'Task 2: social media নিয়ে দুটো sentence লেখো: একটায় "Although", একটায় "However"।'),
          model: 'Although social media helps people stay in touch, it can spread false news. However, it is also a useful tool for learning.',
          task: 'The student writes two sentences about social media, one with "Although" and one with "However". Check: no "but" after an although-clause, "However," starts a new sentence with a comma, and despite (if used) is followed by a noun or -ing.',
          target: l('Although … , … / … . However, …', 'Although … , … / … . However, …'),
          checklist: [l('No "but" in my although-sentence', 'although-sentence-এ "but" নেই'), l('"However," starts a new sentence', '"However," নতুন sentence শুরু করে')],
          explanation: l('Although …, it … . However, …', 'Although …, it … . However, …'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('although + clause (never with "but"); However, + new sentence; despite + noun / -ing.', 'although + clause (কখনো "but" সহ না); However, + নতুন sentence; despite + noun / -ing।'),
        l('No "despite of".', '"despite of" নেই।'),
      ],
    },
  ],
};

export const posConjunctionLessons: Lesson[] = [c1, c2, c3];

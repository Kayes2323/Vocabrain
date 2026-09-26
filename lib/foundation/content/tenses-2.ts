import type { Exercise, L, Lesson } from '../model';

/** Tenses module, lessons 7–12 (see tenses.ts for 1–6). Original Vocab Brain content. */

const l = (en: string, bn: string): L => ({ en, bn });
const practice = (exercises: Exercise[], title = l('Practice', 'Practice')) => ({ kind: 'practice' as const, title, exercises });
const recall = (...points: L[]) => ({ kind: 'recall' as const, title: l('Remember', 'মনে রাখো'), points });
const ielts = (uses: Extract<Lesson['steps'][number], { kind: 'ielts' }>['uses']) => ({
  kind: 'ielts' as const,
  title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
  uses,
});

export const tensesLessons2: Lesson[] = [
  // ------------------------------------------------------------------ 7
  {
    id: 't-7',
    concept: 'past-perfect',
    title: l('Past Perfect', 'Past Perfect'),
    why: l('Shows which past event happened first — useful for Task 1 comparisons and Reading timelines.', 'অতীতের কোন ঘটনা আগে ঘটেছিল দেখায় — Task 1-এর তুলনা আর Reading-এর timeline-এ কাজের।'),
    minutes: 8,
    difficulty: 'medium',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: l('What is it and when do we use it?', 'এটা কী, কখন ব্যবহার করি?'),
        body: l(
          'Use had + past participle for an action that happened before another past action or before a past time ("by 2010"). It is the "earlier past".',
          'অতীতের আরেকটা কাজের আগে বা অতীতের কোনো সময়ের আগে ("by 2010") ঘটে যাওয়া কাজের জন্য had + past participle। এটা "আরও আগের অতীত"।',
        ),
        points: [
          l('had + past participle for every subject: I had finished, she had left.', 'সব subject-এর জন্য had + past participle: I had finished, she had left।'),
          l('Signals: before, after, by (1990), already, when.', 'Signal: before, after, by (1990), already, when।'),
          l('Use it only when the order matters; don’t overuse it.', 'শুধু যখন ক্রমটা গুরুত্বপূর্ণ তখনই; অতিরিক্ত ব্যবহার কোরো না।'),
        ],
      },
      {
        kind: 'examples',
        title: l('Examples', 'উদাহরণ'),
        items: [
          { en: 'When I arrived, the class had already started.', note: l('The class started first, then I arrived.', 'আগে class শুরু, তারপর আমি পৌঁছেছি।') },
          { en: 'By 2010, sales had doubled.', note: l('"By 2010" = before that point in the past.', '"By 2010" = অতীতের ওই বিন্দুর আগে।') },
        ],
      },
      ielts([
        { skill: 'writing', example: 'By 2000, the number of cinemas had fallen to just 20.', note: l('Task 1: "by + past year" → past perfect.', 'Task 1: "by + অতীতের বছর" → past perfect।') },
        { skill: 'reading', example: 'Before the railway was built, the town had depended on the river for trade.', note: l('Reading timelines: which came first?', 'Reading-এর timeline: কোনটা আগে?') },
        { skill: 'speaking', example: 'I had never seen snow before I went to Nepal.', note: l('Part 2 stories: an experience before another event.', 'Part 2-এর গল্প: আরেকটা ঘটনার আগের অভিজ্ঞতা।') },
      ]),
      practice([
        {
          id: 't-7-e1', type: 'choice', tag: 'tense', concept: 'past-perfect',
          prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
          sentence: 'When we reached the station, the train ___.',
          options: ['left', 'had left', 'has left'], answer: 'had left',
          explanation: l('The train left before we reached the station → past perfect.', 'আমরা পৌঁছানোর আগেই train চলে গিয়েছিল → past perfect।'),
          why: { left: l('"left" suggests it left when we arrived — the order is unclear.', '"left" বোঝায় আমরা পৌঁছানোর সময় গেছে — ক্রম পরিষ্কার না।'), 'has left': l('Present perfect connects to now, not to a past moment.', 'Present perfect এখনের সাথে যুক্ত, অতীতের মুহূর্তের সাথে না।') },
        },
        {
          id: 't-7-e2', type: 'gap', tag: 'tense', concept: 'past-perfect',
          prompt: l('Complete with the past perfect of "rise".', '"rise"-এর past perfect বসাও।'),
          sentence: 'By 2015, the price of petrol ___ to over 100 taka.',
          accepted: ['had risen'],
          explanation: l('"By 2015" → had + past participle (risen).', '"By 2015" → had + past participle (risen)।'),
          why: { 'had rose': l('"rose" is past simple; after "had" use the participle "risen".', '"rose" past simple; "had"-এর পরে participle "risen"।'), rose: l('With "by 2015" we need "had risen".', '"by 2015"-এর সাথে "had risen" লাগে।') },
        },
        {
          id: 't-7-e3', type: 'correct', tag: 'tense', concept: 'past-perfect',
          prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
          sentence: 'I had went to the market before it rained.',
          accepted: ['I had gone to the market before it rained.', 'I went to the market before it rained.'],
          explanation: l('had + past participle: gone (not went).', 'had + past participle: gone (went না)।'),
        },
        {
          id: 't-7-e4', type: 'choice', tag: 'tense', concept: 'past-perfect',
          prompt: l('Which happened first?', 'কোনটা আগে ঘটেছিল?'),
          sentence: 'When the manager arrived, the staff had finished the report.',
          options: ['The manager arrived.', 'The staff finished the report.'], answer: 'The staff finished the report.',
          explanation: l('"had finished" = the earlier action.', '"had finished" = আগের কাজ।'),
        },
        {
          id: 't-7-e5', type: 'write', tag: 'tense', concept: 'past-perfect',
          prompt: l('Task 1: cinemas fell from 80 (1990) to 20 (2000). Write one sentence with "By 2000".', 'Task 1: cinema 80 (1990) থেকে 20 (2000)-এ নেমেছে। "By 2000" দিয়ে এক sentence লেখো।'),
          model: 'By 2000, the number of cinemas had fallen to just 20.',
          checklist: [l('"By 2000" + had + past participle', '"By 2000" + had + past participle'), l('Correct participle (fallen, decreased)', 'সঠিক participle (fallen, decreased)')],
          explanation: l('A precise way to show change up to a past point.', 'অতীতের একটা বিন্দু পর্যন্ত পরিবর্তন দেখানোর নির্ভুল উপায়।'),
        },
      ]),
      recall(
        l('had + past participle = the earlier past.', 'had + past participle = আরও আগের অতীত।'),
        l('"By 2010, … had …" is useful in Task 1.', '"By 2010, … had …" Task 1-এ কাজের।'),
      ),
    ],
  },

  // ------------------------------------------------------------------ 8
  {
    id: 't-8',
    concept: 'future',
    title: l('Future forms', 'Future forms'),
    why: l('Predictions in Task 1 (projected data), plans in Speaking Part 1, and ideas about the future in Part 3.', 'Task 1-এ ভবিষ্যদ্বাণী (projected data), Speaking Part 1-এ পরিকল্পনা আর Part 3-এ ভবিষ্যৎ নিয়ে ভাবনা।'),
    minutes: 8,
    difficulty: 'medium',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: l('Will, going to, present continuous', 'Will, going to, present continuous'),
        body: l(
          'English has several future forms. "will" for predictions and quick decisions; "be going to" for plans and predictions from evidence; present continuous for fixed arrangements. For graphs with future years, use "is expected to / is predicted to / will".',
          'English-এ কয়েকটা future form আছে। ভবিষ্যদ্বাণী আর তাৎক্ষণিক সিদ্ধান্তে "will"; পরিকল্পনা আর প্রমাণ দেখে ভবিষ্যদ্বাণীতে "be going to"; ঠিক হয়ে যাওয়া arrangement-এ present continuous। ভবিষ্যতের বছরের graph-এ "is expected to / is predicted to / will"।',
        ),
        points: [
          l('will + base verb: Prices will rise.', 'will + base verb: Prices will rise।'),
          l('am/is/are going to + base verb: I’m going to apply next year.', 'am/is/are going to + base verb: I’m going to apply next year।'),
          l('Task 1: The figure is expected to reach 50% by 2030.', 'Task 1: The figure is expected to reach 50% by 2030।'),
          l('After "if / when" about the future, use the present: "When I finish, I will call you."', 'ভবিষ্যৎ নিয়ে "if / when"-এর পরে present: "When I finish, I will call you."'),
        ],
      },
      {
        kind: 'examples',
        title: l('Examples', 'উদাহরণ'),
        items: [
          { en: 'The population is projected to reach 200 million by 2050.', note: l('Projected data in Task 1.', 'Task 1-এর projected data।') },
          { en: 'I’m going to study in Canada after my bachelor’s.', note: l('A plan.', 'একটা পরিকল্পনা।') },
          { en: 'If the government invests more, the problem will improve.', note: l('"If" + present, then "will".', '"If" + present, তারপর "will"।') },
        ],
      },
      ielts([
        { skill: 'writing', example: 'Solar energy is expected to overtake coal by 2035.', note: l('Task 1 with future years: avoid "will be increased"; use "is expected to increase".', 'ভবিষ্যতের বছরের Task 1: "will be increased" না; "is expected to increase"।') },
        { skill: 'speaking', example: 'In the future, I think more people will work from home.', note: l('Part 3 predictions: "I think … will …".', 'Part 3-এর ভবিষ্যদ্বাণী: "I think … will …"।') },
        { skill: 'listening', example: 'The new library is going to open in March.', note: l('Plans and dates in Part 2 talks.', 'Part 2-এর আলোচনায় পরিকল্পনা আর তারিখ।') },
      ]),
      practice([
        {
          id: 't-8-e1', type: 'choice', tag: 'tense', concept: 'future',
          prompt: l('Choose the best form for a Task 1 projection.', 'Task 1 projection-এর জন্য সবচেয়ে ভালো form বাছো।'),
          sentence: 'The number of electric cars ___ to 30 million by 2030.',
          options: ['is expected to rise', 'will be rise', 'rises expected'], answer: 'is expected to rise',
          explanation: l('"is expected to + base verb" is the natural form for projected data.', 'Projected data-র জন্য স্বাভাবিক form "is expected to + base verb"।'),
          why: { 'will be rise': l('After "will be" we cannot use the base verb "rise". Use "will rise".', '"will be"-এর পরে base verb "rise" বসে না। "will rise" লেখো।'), 'rises expected': l('Word order is wrong.', 'Word order ভুল।') },
        },
        {
          id: 't-8-e2', type: 'correct', tag: 'tense', concept: 'future',
          prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
          sentence: 'When I will finish my degree, I will apply for a master’s.',
          accepted: ["When I finish my degree, I will apply for a master's."],
          explanation: l('After "when" talking about the future, use the present: "When I finish".', 'ভবিষ্যৎ নিয়ে "when"-এর পরে present: "When I finish"।'),
        },
        {
          id: 't-8-e3', type: 'choice', tag: 'tense', concept: 'future',
          prompt: l('Which is best for a plan you have already decided?', 'আগেই ঠিক করা পরিকল্পনার জন্য কোনটা সবচেয়ে ভালো?'),
          options: ['I will take IELTS in June — I just decided now!', 'I’m going to take IELTS in June.'], answer: 'I’m going to take IELTS in June.',
          explanation: l('Decided plan → "be going to".', 'আগে ঠিক করা পরিকল্পনা → "be going to"।'),
        },
        {
          id: 't-8-e4', type: 'gap', tag: 'tense', concept: 'future',
          prompt: l('Complete with "will" + verb.', '"will" + verb বসাও।'),
          sentence: 'I think robots ___ (do) many household jobs in the future.',
          accepted: ['will do'],
          explanation: l('Opinion about the future → "I think … will …".', 'ভবিষ্যৎ নিয়ে মতামত → "I think … will …"।'),
          why: { 'will doing': l('After "will" use the base verb: will do.', '"will"-এর পরে base verb: will do।'), 'will does': l('After "will" the verb never takes -s.', '"will"-এর পরে verb-এ কখনো -s হয় না।') },
        },
        {
          id: 't-8-e5', type: 'write', tag: 'tense', concept: 'future',
          prompt: l('Speaking Part 3: "How will transport change in the future?" Answer in one or two sentences.', 'Speaking Part 3: "How will transport change in the future?" এক-দুই sentence-এ answer দাও।'),
          model: 'I think more people will use electric buses, and cities are likely to build more metro lines.',
          checklist: [l('will / is likely to + base verb', 'will / is likely to + base verb'), l('An opinion phrase (I think, probably)', 'মতামতের phrase (I think, probably)')],
          explanation: l('Hedge predictions with "I think", "probably", "is likely to".', '"I think", "probably", "is likely to" দিয়ে ভবিষ্যদ্বাণী নরম করো।'),
        },
      ]),
      recall(
        l('will + base verb (never "will goes").', 'will + base verb ("will goes" কখনো না)।'),
        l('Task 1 projections: is expected / predicted / projected to + base verb.', 'Task 1 projection: is expected / predicted / projected to + base verb।'),
        l('when / if + present for the future.', 'ভবিষ্যৎ বোঝাতে when / if + present।'),
      ),
    ],
  },

  // ------------------------------------------------------------------ 9
  {
    id: 't-9',
    title: l('Common tense mistakes', 'Tense-এর common ভুল'),
    why: l('Fixing a few repeated mistakes improves accuracy faster than learning new grammar.', 'নতুন grammar শেখার চেয়ে কয়েকটা বারবার হওয়া ভুল ঠিক করলে accuracy তাড়াতাড়ি বাড়ে।'),
    minutes: 8,
    difficulty: 'medium',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: l('Five mistakes examiners see again and again', 'Examiner যে পাঁচটা ভুল বারবার দেখেন'),
        body: l(
          'Most tense errors come from a few habits. Learn to spot them in your own writing.',
          'বেশিরভাগ tense-এর ভুল আসে অল্প কয়েকটা অভ্যাস থেকে। নিজের লেখায় এগুলো ধরতে শেখো।',
        ),
        points: [
          l('1. Missing -s: "She work" → "She works".', '১. -s বাদ: "She work" → "She works"।'),
          l('2. Present perfect with a finished time: "has increased in 2010" → "increased in 2010".', '২. শেষ হওয়া সময়ের সাথে present perfect: "has increased in 2010" → "increased in 2010"।'),
          l('3. Wrong past form: "rised", "falled" → "rose", "fell".', '৩. ভুল past form: "rised", "falled" → "rose", "fell"।'),
          l('4. -ing without "be": "Prices rising" → "Prices are rising".', '৪. "be" ছাড়া -ing: "Prices rising" → "Prices are rising"।'),
          l('5. Mixing tenses in one description: keep the same time frame unless the time changes.', '৫. এক বর্ণনায় tense মেশানো: সময় না বদলালে একই time frame রাখো।'),
        ],
      },
      {
        kind: 'examples',
        title: l('Wrong → right', 'ভুল → ঠিক'),
        items: [
          { en: '✗ The sales has increased in 2012. ✓ Sales increased in 2012.', note: l('Finished year → past simple.', 'শেষ হওয়া বছর → past simple।') },
          { en: '✗ He go to work by bus. ✓ He goes to work by bus.', note: l('He → goes.', 'He → goes।') },
          { en: '✗ In 2000 the figure is 20%. ✓ In 2000, the figure was 20%.', note: l('Past year → past tense.', 'অতীতের বছর → past tense।') },
        ],
      },
      ielts([
        { skill: 'writing', example: 'In 2010, exports rose to $5 billion, and they have continued to grow since then.', note: l('Changing tense is fine when the time changes (2010 → since then).', 'সময় বদলালে tense বদলানো ঠিক আছে (2010 → since then)।') },
        { skill: 'speaking', example: 'When I was a child I lived in a village, but now I live in the city.', note: l('Keep past for the past and present for now.', 'অতীতের জন্য past আর এখনের জন্য present রাখো।') },
      ]),
      practice([
        {
          id: 't-9-e1', type: 'correct', tag: 'tense', concept: 'past-simple',
          prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
          sentence: 'The number of tourists has increased in 2012.',
          accepted: ['The number of tourists increased in 2012.'],
          explanation: l('"in 2012" is finished → past simple.', '"in 2012" শেষ → past simple।'),
        },
        {
          id: 't-9-e2', type: 'correct', tag: 'tense', concept: 'past-simple',
          prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
          sentence: 'Car sales rised sharply in 2018.',
          accepted: ['Car sales rose sharply in 2018.', 'Car sales increased sharply in 2018.'],
          explanation: l('rise → rose (irregular).', 'rise → rose (irregular)।'),
        },
        {
          id: 't-9-e3', type: 'correct', tag: 'agreement', concept: 'present-simple',
          prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
          sentence: 'The government spend a lot on education.',
          accepted: ['The government spends a lot on education.'],
          explanation: l('"The government" is singular → "spends".', '"The government" singular → "spends"।'),
        },
        {
          id: 't-9-e4', type: 'correct', tag: 'tense', concept: 'present-continuous',
          prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
          sentence: 'These days more people using mobile banking.',
          accepted: ['These days more people are using mobile banking.', 'These days, more people are using mobile banking.'],
          explanation: l('-ing needs "are": "are using".', '-ing-এর সাথে "are" লাগে: "are using"।'),
        },
        {
          id: 't-9-e5', type: 'choice', tag: 'tense', concept: 'past-simple',
          prompt: l('Choose the correct Task 1 sentence.', 'সঠিক Task 1 sentence বাছো।'),
          options: ['In 1990, the figure is 20%, and in 2000 it rises to 35%.', 'In 1990, the figure was 20%, and in 2000 it rose to 35%.', 'In 1990, the figure was 20%, and in 2000 it has risen to 35%.'],
          answer: 'In 1990, the figure was 20%, and in 2000 it rose to 35%.',
          explanation: l('Both years are finished → past simple in both parts.', 'দুই বছরই শেষ → দুই অংশেই past simple।'),
          why: { 'In 1990, the figure is 20%, and in 2000 it rises to 35%.': l('Past years need past tenses.', 'অতীতের বছরে past tense লাগে।'), 'In 1990, the figure was 20%, and in 2000 it has risen to 35%.': l('"in 2000" is finished → not present perfect.', '"in 2000" শেষ → present perfect না।') },
        },
        {
          id: 't-9-e6', type: 'correct', tag: 'tense', concept: 'present-perfect',
          prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
          sentence: 'I am living in Chattogram since 2020.',
          accepted: ['I have lived in Chattogram since 2020.', 'I have been living in Chattogram since 2020.'],
          explanation: l('"since 2020" → present perfect: "I have lived".', '"since 2020" → present perfect: "I have lived"।'),
        },
      ]),
      recall(
        l('Check every verb: time? subject? form?', 'প্রতিটা verb check করো: সময়? subject? form?'),
        l('Finished year → past simple. since/for → present perfect.', 'শেষ হওয়া বছর → past simple। since/for → present perfect।'),
      ),
    ],
  },

  // ------------------------------------------------------------------ 10
  {
    id: 't-10',
    title: l('Tenses in IELTS Writing', 'IELTS Writing-এ Tense'),
    why: l('Task 1 and Task 2 each have typical tense patterns. Knowing them removes most tense errors.', 'Task 1 আর Task 2-এর নিজস্ব tense pattern আছে। এগুলো জানলে বেশিরভাগ tense-এর ভুল চলে যায়।'),
    minutes: 9,
    difficulty: 'medium',
    skill: 'writing',
    steps: [
      {
        kind: 'concept',
        title: l('Choose the tense from the task', 'Task দেখে tense বাছো'),
        body: l(
          'Before writing, look at the time in the question. Task 1: past years → past simple; future years → "is expected to"; no time (a process, a map now) → present simple. Task 2: present simple for opinions and general truths, present perfect for recent changes, "will / may" for results.',
          'লেখার আগে প্রশ্নে সময়টা দেখো। Task 1: অতীতের বছর → past simple; ভবিষ্যতের বছর → "is expected to"; সময় নেই (process, এখনকার map) → present simple। Task 2: মতামত আর সাধারণ সত্যে present simple, সাম্প্রতিক পরিবর্তনে present perfect, ফলাফলে "will / may"।',
        ),
        points: [
          l('Introduction (Task 1): "The graph shows…" — always present.', 'Introduction (Task 1): "The graph shows…" — সবসময় present।'),
          l('Process diagrams: present simple passive ("The leaves are dried").', 'Process diagram: present simple passive ("The leaves are dried")।'),
          l('Mixed charts (past + future): change tense exactly where the time changes.', 'মিশ্র chart (অতীত + ভবিষ্যৎ): যেখানে সময় বদলায়, ঠিক সেখানেই tense বদলাও।'),
        ],
      },
      {
        kind: 'examples',
        title: l('Model sentences', 'Model sentence'),
        items: [
          { en: 'The chart shows how many people used public transport between 1990 and 2020.', note: l('Present "shows" + past period.', 'Present "shows" + অতীতের সময়।') },
          { en: 'Rail use peaked in 2005 and is expected to rise again after 2025.', note: l('Past for data, "is expected to" for projections.', 'Data-র জন্য past, projection-এর জন্য "is expected to"।') },
          { en: 'In recent years, many cities have introduced bike lanes, which I believe is a positive step.', note: l('Task 2: present perfect for a recent change, present simple for an opinion.', 'Task 2: সাম্প্রতিক পরিবর্তনে present perfect, মতামতে present simple।') },
        ],
      },
      ielts([
        { skill: 'writing', example: 'Overall, car use increased, while bus use declined over the period.', note: l('Task 1 overview: same tense for both trends.', 'Task 1 overview: দুই trend-এ একই tense।') },
        { skill: 'writing', example: 'If governments invest in public transport, traffic will decrease.', note: l('Task 2: real results with "if + present, will".', 'Task 2: "if + present, will" দিয়ে বাস্তব ফলাফল।') },
      ]),
      practice([
        {
          id: 't-10-e1', type: 'choice', tag: 'tense', concept: 'present-simple',
          prompt: l('The graph covers 2000–2020. Choose the correct introduction.', 'Graph-টা 2000–2020-এর। সঠিক introduction বাছো।'),
          options: ['The graph showed the number of visitors between 2000 and 2020.', 'The graph shows the number of visitors between 2000 and 2020.', 'The graph has shown the number of visitors between 2000 and 2020.'],
          answer: 'The graph shows the number of visitors between 2000 and 2020.',
          explanation: l('The graph shows it now → present "shows".', 'Graph-টা এখন দেখাচ্ছে → present "shows"।'),
          why: { 'The graph showed the number of visitors between 2000 and 2020.': l('The data is past, but the graph is in front of you now.', 'Data অতীতের, কিন্তু graph-টা এখন তোমার সামনে।') },
        },
        {
          id: 't-10-e2', type: 'choice', tag: 'tense', concept: 'past-simple',
          prompt: l('Choose the correct data sentence.', 'সঠিক data sentence বাছো।'),
          sentence: 'Data: 2005: 40% → 2015: 25%',
          options: ['The proportion fell from 40% in 2005 to 25% in 2015.', 'The proportion falls from 40% in 2005 to 25% in 2015.', 'The proportion has fallen from 40% in 2005 to 25% in 2015.'],
          answer: 'The proportion fell from 40% in 2005 to 25% in 2015.',
          explanation: l('Finished years → past simple.', 'শেষ হওয়া বছর → past simple।'),
        },
        {
          id: 't-10-e3', type: 'gap', tag: 'tense', concept: 'future',
          prompt: l('Complete the projection (expect, reach).', 'Projection-টা complete করো (expect, reach)।'),
          sentence: 'The figure ___ 60% by 2030.',
          accepted: ['is expected to reach', 'is projected to reach', 'is predicted to reach', 'will reach'],
          explanation: l('Future year → "is expected to reach" (or "will reach").', 'ভবিষ্যতের বছর → "is expected to reach" (বা "will reach")।'),
        },
        {
          id: 't-10-e4', type: 'choice', tag: 'tense', concept: 'present-simple',
          prompt: l('Process diagram. Choose the correct sentence.', 'Process diagram। সঠিক sentence বাছো।'),
          options: ['First, the tea leaves are picked by hand.', 'First, the tea leaves were picked by hand.', 'First, the tea leaves picked by hand.'],
          answer: 'First, the tea leaves are picked by hand.',
          explanation: l('Processes happen in general → present simple passive (are + past participle).', 'Process সাধারণভাবে ঘটে → present simple passive (are + past participle)।'),
          why: { 'First, the tea leaves were picked by hand.': l('A process is general, not a finished past event.', 'Process সাধারণ ব্যাপার, শেষ হওয়া অতীতের ঘটনা না।'), 'First, the tea leaves picked by hand.': l('Leaves do not pick; they are picked → "are picked".', 'Leaves নিজে pick করে না; তাদের pick করা হয় → "are picked"।') },
        },
        {
          id: 't-10-e5', type: 'write', tag: 'tense', concept: 'present-perfect',
          prompt: l('Task 2 introduction: write one sentence about a recent change in how people shop.', 'Task 2 introduction: মানুষের কেনাকাটার সাম্প্রতিক পরিবর্তন নিয়ে এক sentence লেখো।'),
          model: 'In recent years, online shopping has become a normal part of daily life for many people.',
          checklist: [l('"In recent years" + present perfect', '"In recent years" + present perfect'), l('No finished time (yesterday, in 2010)', 'শেষ হওয়া সময় নেই (yesterday, in 2010)')],
          explanation: l('A clear background sentence for Task 2.', 'Task 2-এর জন্য একটা পরিষ্কার background sentence।'),
        },
      ]),
      recall(
        l('"The graph shows…" · past years → past · future years → is expected to.', '"The graph shows…" · অতীতের বছর → past · ভবিষ্যতের বছর → is expected to।'),
        l('Process → present simple passive.', 'Process → present simple passive।'),
      ),
    ],
  },

  // ------------------------------------------------------------------ 11
  {
    id: 't-11',
    title: l('Tenses in IELTS Speaking', 'IELTS Speaking-এ Tense'),
    why: l('Each Speaking part leans on different tenses. Moving between them naturally raises Grammatical Range & Accuracy.', 'Speaking-এর প্রতিটা part আলাদা tense-এর উপর নির্ভর করে। স্বাভাবিকভাবে এক tense থেকে আরেকটায় যাওয়া Grammatical Range & Accuracy বাড়ায়।'),
    minutes: 8,
    difficulty: 'medium',
    skill: 'speaking',
    steps: [
      {
        kind: 'concept',
        title: l('Listen to the question’s tense', 'প্রশ্নের tense শোনো'),
        body: l(
          'The examiner’s question usually tells you the tense. "Do you…?" → present simple. "Did you…? / Describe a time when…" → past. "How long have you…?" → present perfect. "Will…? / How might… change?" → future.',
          'Examiner-এর প্রশ্নই সাধারণত tense বলে দেয়। "Do you…?" → present simple। "Did you…? / Describe a time when…" → past। "How long have you…?" → present perfect। "Will…? / How might… change?" → future।',
        ),
        points: [
          l('Part 1: present simple for habits, + a past or future detail to extend.', 'Part 1: অভ্যাসে present simple, answer বাড়াতে একটা past বা future detail।'),
          l('Part 2: mostly past simple and past continuous for stories.', 'Part 2: গল্পে মূলত past simple আর past continuous।'),
          l('Part 3: present for general ideas, will / might for the future, present perfect for changes.', 'Part 3: সাধারণ ধারণায় present, ভবিষ্যতে will / might, পরিবর্তনে present perfect।'),
        ],
      },
      {
        kind: 'examples',
        title: l('One answer, several tenses', 'এক answer, কয়েকটা tense'),
        items: [
          { en: 'I usually cook at the weekend. Last Friday I made biryani for my family, and next week I’m going to try a new recipe.', note: l('Present → past → future in a natural Part 1 answer.', 'স্বাভাবিক Part 1 answer-এ present → past → future।') },
          { en: 'Public transport has improved a lot, and I think it will get even better when the metro is finished.', note: l('Part 3: change (present perfect) + prediction (will).', 'Part 3: পরিবর্তন (present perfect) + ভবিষ্যদ্বাণী (will)।') },
        ],
      },
      ielts([
        { skill: 'speaking', example: 'Did you enjoy school? — Yes, I did. I especially liked science because we did lots of experiments.', note: l('Answer a past question in the past.', 'অতীতের প্রশ্নের answer অতীতে দাও।') },
        { skill: 'speaking', example: 'How has your city changed? — It has grown very fast; there are many more flyovers now.', note: l('"has changed" question → present perfect answer.', '"has changed" প্রশ্ন → present perfect answer।') },
      ]),
      practice([
        {
          id: 't-11-e1', type: 'choice', tag: 'tense', concept: 'past-simple',
          prompt: l('Examiner: "Did you like reading as a child?" Choose the best start.', 'Examiner: "Did you like reading as a child?" সবচেয়ে ভালো শুরু বাছো।'),
          options: ['Yes, I like reading very much.', 'Yes, I loved reading stories when I was young.', 'Yes, I have liked reading.'], answer: 'Yes, I loved reading stories when I was young.',
          explanation: l('"Did you…as a child" → past simple.', '"Did you…as a child" → past simple।'),
          why: { 'Yes, I like reading very much.': l('This answers "Do you like…?", not the past question.', 'এটা "Do you like…?"-এর answer, অতীতের প্রশ্নের না।'), 'Yes, I have liked reading.': l('Present perfect does not fit "as a child" (a finished time).', '"as a child" শেষ হওয়া সময়, present perfect মেলে না।') },
        },
        {
          id: 't-11-e2', type: 'choice', tag: 'tense', concept: 'present-perfect',
          prompt: l('Examiner: "How long have you been learning English?"', 'Examiner: "How long have you been learning English?"'),
          options: ['I learn English for ten years.', 'I have been learning English for about ten years.', 'I learned English since ten years.'], answer: 'I have been learning English for about ten years.',
          explanation: l('"How long have you…" → present perfect + for.', '"How long have you…" → present perfect + for।'),
          why: { 'I learn English for ten years.': l('Present simple cannot show a period up to now.', 'Present simple দিয়ে এখন পর্যন্ত সময়কাল দেখানো যায় না।'), 'I learned English since ten years.': l('Past simple + "since ten years" are both wrong; use "for ten years".', 'Past simple আর "since ten years" দুটোই ভুল; "for ten years"।') },
        },
        {
          id: 't-11-e3', type: 'correct', tag: 'tense', concept: 'past-simple',
          prompt: l('Part 2 story: correct the sentence.', 'Part 2-এর গল্প: sentence-টা ঠিক করো।'),
          sentence: 'Last winter I go to Srimangal and I see a lot of tea gardens.',
          accepted: ['Last winter I went to Srimangal and I saw a lot of tea gardens.', 'Last winter, I went to Srimangal and I saw a lot of tea gardens.', 'Last winter I went to Srimangal and saw a lot of tea gardens.'],
          explanation: l('A finished past story → went, saw.', 'শেষ হওয়া অতীতের গল্প → went, saw।'),
        },
        {
          id: 't-11-e4', type: 'choice', tag: 'tense', concept: 'future',
          prompt: l('Examiner (Part 3): "Will people still read printed books in the future?"', 'Examiner (Part 3): "Will people still read printed books in the future?"'),
          options: ['I think many people will still read them, but e-books will probably become more common.', 'I think many people still read them yesterday.', 'I think many people reading them.'],
          answer: 'I think many people will still read them, but e-books will probably become more common.',
          explanation: l('Future question → "will", softened with "I think / probably".', 'ভবিষ্যতের প্রশ্ন → "will", "I think / probably" দিয়ে নরম।'),
        },
        {
          id: 't-11-e5', type: 'write', tag: 'tense', concept: 'past-simple',
          prompt: l('Part 1: "Do you like travelling?" Answer with present + one past example.', 'Part 1: "Do you like travelling?" present + একটা অতীতের উদাহরণ দিয়ে answer দাও।'),
          model: 'Yes, I really enjoy travelling. Last year I went to Sajek with my cousins, and it was amazing.',
          checklist: [l('Present simple for the general answer', 'সাধারণ answer-এ present simple'), l('Past simple for the example', 'উদাহরণে past simple')],
          explanation: l('General answer + past example is a natural way to extend Part 1.', 'সাধারণ answer + অতীতের উদাহরণ — Part 1 বাড়ানোর স্বাভাবিক উপায়।'),
        },
      ]),
      recall(
        l('Answer in the tense of the question.', 'প্রশ্নের tense-এই answer দাও।'),
        l('Extend with another time: a past example or a future plan.', 'আরেকটা সময় দিয়ে বাড়াও: অতীতের উদাহরণ বা ভবিষ্যতের পরিকল্পনা।'),
      ),
    ],
  },

  // ------------------------------------------------------------------ 12
  {
    id: 't-12',
    kind: 'test',
    title: l('Tenses review test', 'Tenses review test'),
    why: l('Check what you have learned. Your mistakes here decide what Mino suggests you review.', 'কী শিখলে যাচাই করো। এখানের ভুল দেখেই Mino ঠিক করবে কী review করতে বলবে।'),
    minutes: 12,
    difficulty: 'medium',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: l('How this test works', 'এই test কীভাবে চলবে'),
        body: l(
          '12 questions from every lesson in this module. You see the answer after each question. Score 80% or more to complete the module; if you score less, Mino will suggest short reviews for the tenses you missed.',
          'এই module-এর সব lesson থেকে ১২টা প্রশ্ন। প্রতিটা প্রশ্নের পরে answer দেখবে। ৮০% বা বেশি পেলে module শেষ; কম পেলে যেগুলো ভুল হয়েছে, Mino সেই tense-গুলোর ছোট review suggest করবে।',
        ),
      },
      practice(
        [
          { id: 't-12-e1', type: 'choice', tag: 'agreement', concept: 'present-simple', prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'My father ___ the newspaper every morning.', options: ['read', 'reads', 'is read'], answer: 'reads', explanation: l('Habit + "my father" (he) → reads.', 'অভ্যাস + "my father" (he) → reads।') },
          { id: 't-12-e2', type: 'choice', tag: 'tense', concept: 'present-continuous', prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'Please be quiet — the baby ___.', options: ['sleeps', 'is sleeping', 'slept'], answer: 'is sleeping', explanation: l('Happening now → present continuous.', 'এখন হচ্ছে → present continuous।') },
          { id: 't-12-e3', type: 'gap', tag: 'tense', concept: 'past-simple', prompt: l('Past simple of "grow".', '"grow"-এর past simple।'), sentence: 'The city ___ rapidly in the 1990s.', accepted: ['grew'], explanation: l('grow → grew.', 'grow → grew।') },
          { id: 't-12-e4', type: 'choice', tag: 'tense', concept: 'past-continuous', prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'While she ___, her phone rang.', options: ['was driving', 'drove', 'drives'], answer: 'was driving', explanation: l('"While" + action in progress → was driving.', '"While" + চলমান কাজ → was driving।') },
          { id: 't-12-e5', type: 'choice', tag: 'tense', concept: 'present-perfect', prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'Internet use ___ dramatically since 2010.', options: ['increased', 'has increased', 'is increasing'], answer: 'has increased', explanation: l('"since 2010" → present perfect.', '"since 2010" → present perfect।') },
          { id: 't-12-e6', type: 'correct', tag: 'tense', concept: 'present-perfect', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'), sentence: 'She has finished her degree in 2021.', accepted: ['She finished her degree in 2021.'], explanation: l('"in 2021" is finished → past simple.', '"in 2021" শেষ → past simple।') },
          { id: 't-12-e7', type: 'gap', tag: 'tense', concept: 'past-perfect', prompt: l('Past perfect of "leave".', '"leave"-এর past perfect।'), sentence: 'By the time we arrived, the bus ___.', accepted: ['had left', 'had already left'], explanation: l('Before we arrived → had left.', 'আমরা পৌঁছানোর আগে → had left।') },
          { id: 't-12-e8', type: 'choice', tag: 'tense', concept: 'future', prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'The number of users ___ to double by 2030.', options: ['is expected', 'expects', 'expected'], answer: 'is expected', explanation: l('Projection → "is expected to".', 'Projection → "is expected to"।') },
          { id: 't-12-e9', type: 'correct', tag: 'tense', concept: 'future', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'), sentence: 'If it will rain tomorrow, we will stay at home.', accepted: ['If it rains tomorrow, we will stay at home.', "If it rains tomorrow, we'll stay at home."], explanation: l('"If" + present for the future: "If it rains".', 'ভবিষ্যৎ বোঝাতে "If" + present: "If it rains"।') },
          { id: 't-12-e10', type: 'choice', tag: 'tense', concept: 'past-simple', prompt: l('Choose the correct Task 1 sentence.', 'সঠিক Task 1 sentence বাছো।'), options: ['Exports reached a peak of 80 tonnes in 2016.', 'Exports reach a peak of 80 tonnes in 2016.', 'Exports have reached a peak of 80 tonnes in 2016.'], answer: 'Exports reached a peak of 80 tonnes in 2016.', explanation: l('Finished year → past simple.', 'শেষ হওয়া বছর → past simple।') },
          { id: 't-12-e11', type: 'correct', tag: 'agreement', concept: 'present-simple', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'), sentence: 'Everyone in my family enjoy cricket.', accepted: ['Everyone in my family enjoys cricket.'], explanation: l('"Everyone" is singular → enjoys.', '"Everyone" singular → enjoys।') },
          { id: 't-12-e12', type: 'choice', tag: 'tense', concept: 'present-perfect', prompt: l('Examiner: "Have you ever been abroad?"', 'Examiner: "Have you ever been abroad?"'), options: ['Yes, I have been to India twice.', 'Yes, I go to India twice.', 'Yes, I have gone to India last year.'], answer: 'Yes, I have been to India twice.', explanation: l('Experience (no finished time) → present perfect "have been".', 'অভিজ্ঞতা (শেষ হওয়া সময় নেই) → present perfect "have been"।') },
        ],
        l('Review test', 'Review test'),
      ),
      recall(
        l('Time words decide the tense.', 'সময়ের শব্দ tense ঠিক করে।'),
        l('Next: your mistakes become short reviews on your dashboard.', 'পরের ধাপ: তোমার ভুলগুলো dashboard-এ ছোট review হয়ে আসবে।'),
      ),
    ],
  },
];

import type { Exercise, L, Lesson } from '../model';

/**
 * Tenses, lessons 1–2 in the problem-first (v2) format:
 * Hook → Diagnose → Discover → Explain → Real life → IELTS → Mistake Lab →
 * Practice (easy → hard) → Active recall → Personal use (Mino) → Remember.
 * Original Vocab Brain content.
 */

const l = (en: string, bn: string): L => ({ en, bn });
const TIME = ['Finished past', 'Happening now', 'Habit or fact', 'Past until now', 'Future plan'];

// ======================================================================= 1
const timeExercises: Exercise[] = [
  {
    id: 't-1-p1', type: 'choice', tag: 'tense', concept: 'time',
    prompt: l('What is the time picture?', 'Time picture কোনটা?'),
    sentence: 'I watched a movie last night.',
    options: TIME, answer: 'Finished past',
    explanation: l('"last night" is over → finished past.', '"last night" শেষ হয়ে গেছে → finished past।'),
    why: { 'Past until now': l('Nothing connects it to now; last night is finished.', 'এখনের সাথে কিছু যুক্ত না; last night শেষ।') },
  },
  {
    id: 't-1-p2', type: 'choice', tag: 'tense', concept: 'time',
    prompt: l('What is the time picture?', 'Time picture কোনটা?'),
    sentence: 'She teaches maths at a school in Cumilla.',
    options: TIME, answer: 'Habit or fact',
    explanation: l('Her job — true in general, not just this moment.', 'তার কাজ — সাধারণভাবে সত্য, শুধু এই মুহূর্তের না।'),
    why: { 'Happening now': l('She may be at home now; the sentence is about her job in general.', 'সে এখন বাসায়ও থাকতে পারে; sentence-টা তার কাজ নিয়ে, সাধারণভাবে।') },
  },
  {
    id: 't-1-p3', type: 'choice', tag: 'tense', concept: 'time',
    prompt: l('What is the time picture?', 'Time picture কোনটা?'),
    sentence: 'I have worked here since January.',
    options: TIME, answer: 'Past until now',
    explanation: l('Started in January, still working here → past until now.', 'January-তে শুরু, এখনো এখানে কাজ করছি → past until now।'),
    why: { 'Finished past': l('"since January" means it is still going on.', '"since January" মানে এখনো চলছে।') },
  },
  {
    id: 't-1-p4', type: 'choice', tag: 'tense', concept: 'time',
    prompt: l('What is the time picture?', 'Time picture কোনটা?'),
    sentence: 'Please be quiet — the baby is sleeping.',
    options: TIME, answer: 'Happening now',
    explanation: l('Right at this moment → happening now.', 'ঠিক এই মুহূর্তে → happening now।'),
  },
  {
    id: 't-1-p5', type: 'choice', tag: 'tense', concept: 'time',
    prompt: l('Choose the best verb.', 'সবচেয়ে ভালো verb বাছো।'),
    sentence: 'I ___ English for two years, and I still enjoy it.',
    options: ['learned', 'am learning', 'have been learning'], answer: 'have been learning',
    explanation: l('Two years from the past until now, still continuing → have been learning.', 'অতীত থেকে এখন পর্যন্ত দুই বছর, এখনো চলছে → have been learning।'),
    why: {
      learned: l('"learned" says it finished — but you still enjoy it and are still learning.', '"learned" বোঝায় শেষ হয়ে গেছে — কিন্তু তুমি এখনো শিখছ।'),
      'am learning': l('"am learning" is only about now; it can’t carry "for two years".', '"am learning" শুধু এখনের কথা; "for two years" বহন করতে পারে না।'),
    },
  },
  {
    id: 't-1-p6', type: 'choice', tag: 'tense', concept: 'time',
    prompt: l('Task 1: choose the correct pair of verbs.', 'Task 1: সঠিক verb জোড়া বাছো।'),
    sentence: 'In 2015, sales ___ 200 units, but since then they ___ steadily.',
    options: ['were / have grown', 'are / grew', 'have been / grow'], answer: 'were / have grown',
    explanation: l('2015 is finished → were. "since then" = until now → have grown.', '2015 শেষ → were। "since then" = এখন পর্যন্ত → have grown।'),
    why: {
      'are / grew': l('The times are swapped: 2015 needs past, "since then" needs past-until-now.', 'সময় উল্টে গেছে: 2015-এ past, "since then"-এ past-until-now লাগে।'),
      'have been / grow': l('A finished year ("in 2015") never takes have/has.', 'শেষ হওয়া বছরের ("in 2015") সাথে have/has বসে না।'),
    },
  },
];

const timeRecall: Exercise[] = [
  {
    id: 't-1-r1', type: 'gap', tag: 'tense', concept: 'time',
    prompt: l('Write the verb (study). No options this time!', 'Verb লেখো (study)। এবার কোনো option নেই!'),
    sentence: 'I started university in 2023. I ___ there for three years now.',
    accepted: ['have studied', 'have been studying', "'ve studied", "'ve been studying"],
    explanation: l('From 2023 until now → have studied / have been studying.', '2023 থেকে এখন পর্যন্ত → have studied / have been studying।'),
    why: {
      'am studying': l('"am studying" doesn’t reach back to 2023. Use have (been) + verb.', '"am studying" 2023 পর্যন্ত পেছনে যায় না। have (been) + verb লাগে।'),
      study: l('"study" is a habit; here we need past → now.', '"study" অভ্যাস; এখানে অতীত → এখন লাগে।'),
      studied: l('"studied" means it is finished — but you are still there.', '"studied" মানে শেষ — কিন্তু তুমি এখনো সেখানে।'),
    },
  },
  {
    id: 't-1-r2', type: 'gap', tag: 'tense', concept: 'time',
    prompt: l('Write the verb (visit).', 'Verb লেখো (visit)।'),
    sentence: 'Last Friday, we ___ our grandparents in Bogura.',
    accepted: ['visited'],
    explanation: l('"Last Friday" is finished → visited.', '"Last Friday" শেষ → visited।'),
    why: { visit: l('"Last Friday" is over, so the verb goes into the past.', '"Last Friday" শেষ, তাই verb past-এ যাবে।'), 'have visited': l('No have/has with a finished time like "last Friday".', '"last Friday"-র মতো শেষ হওয়া সময়ের সাথে have/has না।') },
  },
  {
    id: 't-1-r3', type: 'correct', tag: 'tense', concept: 'time',
    prompt: l('Fix the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'I am living in Chattogram since 2021.',
    accepted: ['I have lived in Chattogram since 2021.', 'I have been living in Chattogram since 2021.'],
    explanation: l('"since 2021" = past until now → have lived / have been living.', '"since 2021" = অতীত থেকে এখন → have lived / have been living।'),
  },
  {
    id: 't-1-r4', type: 'gap', tag: 'tense', concept: 'time',
    prompt: l('Write the verb (take) for a plan.', 'পরিকল্পনা বোঝাতে verb লেখো (take)।'),
    sentence: 'Next month, I ___ the IELTS test.',
    accepted: ['am going to take', 'will take', 'am taking', "'m going to take", "'m taking", "'ll take"],
    explanation: l('A future plan → am going to take / will take / am taking.', 'ভবিষ্যতের পরিকল্পনা → am going to take / will take / am taking।'),
    why: { take: l('"take" alone is a habit; add "am going to" or "will".', 'শুধু "take" অভ্যাস বোঝায়; "am going to" বা "will" যোগ করো।'), took: l('"Next month" is in the future, not the past.', '"Next month" ভবিষ্যৎ, অতীত না।') },
  },
];

export const understandingTime: Lesson = {
  id: 't-1',
  format: 'v2',
  concept: 'time',
  title: l('Understanding Time', 'সময় বোঝা: Tense-এর আসল চাবি'),
  why: l(
    'Most tense mistakes come from choosing the verb by the Bangla word instead of by time. Fix the thinking, and every tense gets easier.',
    'বেশিরভাগ tense-এর ভুল হয় বাংলা শব্দ দেখে verb বাছার কারণে, সময় দেখে না। চিন্তার ধরনটা ঠিক করলে সব tense সহজ হয়ে যায়।',
  ),
  minutes: 12,
  difficulty: 'easy',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Let’s start with you', 'চলো আগে দেখি তুমি কীভাবে বলো'),
      situation: l(
        'You want to tell your IELTS teacher that you started learning English two years ago and you are still learning it.',
        'তুমি তোমার IELTS teacher-কে বলতে চাও: "আমি দুই বছর ধরে ইংরেজি শিখছি।"',
      ),
      question: l('Which one sounds correct? Try before we teach anything.', 'কোনটা ঠিক শোনায়? কিছু শেখার আগে নিজে একবার try করো।'),
      options: ['I am learning English since two years.', 'I learn English for two years.', 'I have been learning English for two years.'],
      answer: 'I have been learning English for two years.',
      diagnose: {
        'I am learning English since two years.': l(
          'Very common choice! "শিখছি" feels like -ing, so "am learning" seems right. But "am learning" only talks about NOW — it can’t carry the two years from the past until now. And "since" needs a starting point (since 2024), not a length (two years).',
          'খুব common উত্তর! "শিখছি" শুনে -ing মনে হয়, তাই "am learning" ঠিক লাগে। কিন্তু "am learning" শুধু এখনকার কথা বলে — অতীত থেকে এখন পর্যন্ত দুই বছরের কথা বহন করতে পারে না। আর "since"-এর পরে শুরুর সময় লাগে (since 2024), সময়ের দৈর্ঘ্য (two years) না।',
        ),
        'I learn English for two years.': l(
          'Good try. "I learn" is for habits and facts ("I learn five new words every day"). It doesn’t say that the learning started two years ago and is still going on.',
          'ভালো চেষ্টা। "I learn" অভ্যাস আর সাধারণ সত্যের জন্য ("I learn five new words every day")। এটা বলে না যে শেখা দুই বছর আগে শুরু হয়ে এখনো চলছে।',
        ),
        'I have been learning English for two years.': l(
          'Exactly! "have been learning" connects the past to now: it started two years ago and it is still happening. In this lesson you’ll see WHY — so you can do it every time.',
          'একদম ঠিক! "have been learning" অতীতকে এখনের সাথে জোড়ে: দুই বছর আগে শুরু, এখনো চলছে। এই lesson-এ দেখবে কেন — যাতে প্রতিবার ঠিক বাছতে পারো।',
        ),
      },
    },
    {
      kind: 'discover',
      title: l('Look at the time, not the Bangla word', 'বাংলা শব্দ না, সময়টা দেখো'),
      items: [
        { en: 'I went to Cox’s Bazar last year.', note: l('Finished: last year is over.', 'শেষ হয়ে গেছে: last year শেষ।') },
        { en: 'I go to the gym three times a week.', note: l('Repeated: a habit.', 'বারবার হয়: একটা অভ্যাস।') },
        { en: 'I’m talking to my cousin right now.', note: l('Happening now.', 'এখন হচ্ছে।') },
        { en: 'I have lived in Dhaka since 2019.', note: l('Started in the past, still true now.', 'অতীতে শুরু, এখনো সত্য।') },
        { en: 'I’m going to apply to Canadian universities next year.', note: l('A plan for the future.', 'ভবিষ্যতের পরিকল্পনা।') },
      ],
      question: l('What decided the verb form in each sentence?', 'প্রতিটা sentence-এ verb-এর form কী ঠিক করেছে?'),
      options: [
        l('The time: finished, now, repeated, past → now, or future', 'সময়: শেষ, এখন, বারবার, অতীত → এখন, নাকি ভবিষ্যৎ'),
        l('How formal the sentence is', 'Sentence কতটা formal'),
        l('Whether the Bangla sentence ends in "ছি"', 'বাংলা sentence "ছি" দিয়ে শেষ হয় কিনা'),
      ],
      answer: 0,
      pattern: l(
        'In English, the verb form follows the TIME PICTURE. First ask about time, then choose the form. The Bangla ending (-ছি, -লাম) can mislead you.',
        'English-এ verb-এর form চলে TIME PICTURE অনুযায়ী। আগে সময় নিয়ে প্রশ্ন করো, তারপর form বাছো। বাংলার শেষাংশ (-ছি, -লাম) অনেক সময় ভুল পথে নেয়।',
      ),
    },
    {
      kind: 'concept',
      title: l('Six questions that choose the tense', 'ছয়টা প্রশ্ন, যেগুলো tense বাছে'),
      body: l(
        'Before you write or say a verb, ask yourself about time. You don’t need the names of 12 tenses — you need these questions.',
        'কোনো verb লেখা বা বলার আগে নিজেকে সময় নিয়ে প্রশ্ন করো। ১২টা tense-এর নাম মুখস্থ লাগবে না — এই প্রশ্নগুলোই লাগবে।',
      ),
      points: [
        l('Is it finished? (yesterday, in 2010) → past', 'শেষ হয়ে গেছে? (yesterday, in 2010) → past'),
        l('Is it happening now? → am / is / are + -ing', 'এখন হচ্ছে? → am / is / are + -ing'),
        l('Is it repeated or always true? → present simple', 'বারবার হয় বা সবসময় সত্য? → present simple'),
        l('Did it start in the past and continue until now? → have / has (been)', 'অতীতে শুরু হয়ে এখনো চলছে? → have / has (been)'),
        l('Did it happen before another past event? → had + past participle', 'অতীতের আরেকটা ঘটনার আগে? → had + past participle'),
        l('Is it planned or predicted? → going to / will', 'পরিকল্পনা বা ভবিষ্যদ্বাণী? → going to / will'),
      ],
      timeline: [
        { sentence: 'I finished my HSC in 2022.', picture: 'finished', label: l('Finished past', 'শেষ হওয়া অতীত') },
        { sentence: 'I study every evening.', picture: 'habit', label: l('Habit or fact', 'অভ্যাস বা সত্য') },
        { sentence: 'I’m studying right now.', picture: 'now', label: l('Happening now', 'এখন হচ্ছে') },
        { sentence: 'I have lived in Dhaka since 2023.', picture: 'past-to-now', label: l('Past until now', 'অতীত থেকে এখন') },
        { sentence: 'When I arrived, the class had started.', picture: 'earlier-past', label: l('Earlier past', 'আরও আগের অতীত') },
        { sentence: 'I’m going to take IELTS in June.', picture: 'future', label: l('Future plan', 'ভবিষ্যতের পরিকল্পনা') },
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'My father retired in 2020.', note: l('Finished → past simple.', 'শেষ → past simple।') },
        { en: 'My sister works part-time at a café.', note: l('Her job in general → present simple.', 'সাধারণভাবে তার কাজ → present simple।') },
        { en: 'We’re preparing for Eid this week.', note: l('Temporary, around now → present continuous.', 'সাময়িক, এই সময়ে → present continuous।') },
        { en: 'I have never been abroad.', note: l('My whole life until now → present perfect.', 'এখন পর্যন্ত পুরো জীবনে → present perfect।') },
        { en: 'The bus leaves at 7:30 tomorrow.', note: l('Surprise: timetables use present simple, even for the future!', 'মজার ব্যাপার: timetable-এ ভবিষ্যতের জন্যও present simple!') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'In 2005, 20% of households owned a car; since then the figure has doubled.', note: l('Task 1: a finished year and "since then" need different verbs.', 'Task 1: শেষ হওয়া বছর আর "since then"-এ আলাদা verb লাগে।') },
        { skill: 'speaking', example: 'I’ve been living in Dhaka for four years, but I grew up in Barishal.', note: l('Part 1: moving between times naturally shows control.', 'Part 1: স্বাভাবিকভাবে এক সময় থেকে আরেক সময়ে যাওয়া নিয়ন্ত্রণ দেখায়।') },
        { skill: 'listening', example: 'It was on Tuesday, but now it’s on Thursday.', note: l('The time change tells you which one is the answer.', 'সময়ের পরিবর্তনই বলে দেয় কোনটা answer।') },
        { skill: 'reading', example: 'Scientists had believed this for decades until new evidence appeared.', note: l('Is it still true? TRUE / FALSE / NOT GIVEN often depends on time.', 'এখনো সত্য কিনা? TRUE / FALSE / NOT GIVEN প্রায়ই সময়ের উপর নির্ভর করে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I am studying English since two years.', right: 'I have been studying English for two years.', why: l('Past until now + a length of time → have been + -ing + for.', 'অতীত থেকে এখন + সময়ের দৈর্ঘ্য → have been + -ing + for।') },
        { wrong: 'Yesterday I go to the market.', right: 'Yesterday I went to the market.', why: l('"Yesterday" is finished → past.', '"Yesterday" শেষ → past।') },
        { wrong: 'I have seen him yesterday.', right: 'I saw him yesterday.', why: l('A finished time (yesterday) never takes have / has.', 'শেষ হওয়া সময়ের (yesterday) সাথে have / has বসে না।') },
        { wrong: 'In 2010, the population is 15 million.', right: 'In 2010, the population was 15 million.', why: l('A past year in Task 1 → past tense.', 'Task 1-এ অতীতের বছর → past tense।') },
      ],
    },
    { kind: 'practice', mode: 'practice', title: l('Practice: find the time picture', 'Practice: time picture খোঁজো'), exercises: timeExercises },
    { kind: 'practice', mode: 'recall', title: l('Active recall: no options', 'Active recall: কোনো option নেই'), exercises: timeRecall },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your English journey', 'এবার তোমার পালা: তোমার English journey'),
      exercises: [
        {
          id: 't-1-y1', type: 'write', tag: 'tense', concept: 'time',
          prompt: l('Write 2 sentences: when did you start learning English, and how long have you been learning it?', '২টা sentence লেখো: কবে English শেখা শুরু করেছিলে, আর কতদিন ধরে শিখছ?'),
          model: 'I started learning English in class one. I have been learning it for about twelve years, and now I am preparing for IELTS.',
          checklist: [l('Past Simple for when you started', 'কবে শুরু — Past Simple'), l('have been + -ing (or have + past participle) for how long', 'কতদিন ধরে — have been + -ing (বা have + past participle)'), l('for + a length / since + a starting point', 'for + দৈর্ঘ্য / since + শুরুর সময়')],
          explanation: l('Two time pictures in one answer — exactly what IELTS Speaking Part 1 needs.', 'এক answer-এ দুইটা time picture — IELTS Speaking Part 1-এ ঠিক এটাই লাগে।'),
          mino: {
            task: 'The student writes about their English-learning journey. Check the tense choice: a finished past time for when they started (past simple) and a duration until now (present perfect or present perfect continuous with for/since). Check for vs since.',
            target: l('Past Simple for when you started + have (been) … for / since for how long', 'কবে শুরু: Past Simple + কতদিন ধরে: have (been) … for / since'),
          },
        },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Choose the verb by TIME, not by the Bangla ending.', 'বাংলার শেষাংশ দেখে না, সময় দেখে verb বাছো।'),
        l('Finished → past. Now → -ing. Repeated → present simple. Past until now → have (been).', 'শেষ → past। এখন → -ing। বারবার → present simple। অতীত থেকে এখন → have (been)।'),
        l('since + starting point · for + length of time', 'since + শুরুর সময় · for + সময়ের দৈর্ঘ্য'),
      ],
    },
  ],
};

// ======================================================================= 2
const psPractice: Exercise[] = [
  {
    id: 't-2-p1', type: 'choice', tag: 'agreement', concept: 'present-simple',
    prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
    sentence: 'My brother ___ in a bank in Motijheel.',
    options: ['work', 'works', 'working'], answer: 'works',
    explanation: l('"My brother" = he → works.', '"My brother" = he → works।'),
    why: { work: l('"work" is for I / you / we / they.', '"work" I / you / we / they-এর জন্য।'), working: l('"working" alone is not a full verb.', 'শুধু "working" full verb না।') },
  },
  {
    id: 't-2-p2', type: 'choice', tag: 'agreement', concept: 'present-simple',
    prompt: l('Choose the correct question.', 'সঠিক প্রশ্ন বাছো।'),
    options: ['Does she speak Hindi?', 'Does she speaks Hindi?', 'Do she speak Hindi?'], answer: 'Does she speak Hindi?',
    explanation: l('"Does" already has the -s, so the verb stays "speak".', '"Does"-এই -s আছে, তাই verb "speak" থাকে।'),
    why: { 'Does she speaks Hindi?': l('Only one -s: it goes on "does", not on "speak".', '-s একবারই: "does"-এ বসে, "speak"-এ না।'), 'Do she speak Hindi?': l('"she" → "Does".', '"she" → "Does"।') },
  },
  {
    id: 't-2-p3', type: 'gap', tag: 'agreement', concept: 'present-simple',
    prompt: l('Write the correct form of "study".', '"study"-এর সঠিক form লেখো।'),
    sentence: 'Rina ___ for two hours every night.',
    accepted: ['studies'],
    explanation: l('Consonant + y → -ies: study → studies.', 'Consonant + y → -ies: study → studies।'),
    why: { studys: l('After a consonant, y changes to -ies: studies.', 'Consonant-এর পরে y বদলে -ies: studies।'), study: l('"Rina" = she → add -s: studies.', '"Rina" = she → -s: studies।') },
  },
  {
    id: 't-2-p4', type: 'choice', tag: 'verb', concept: 'present-simple',
    prompt: l('Speaking Part 3: which is correct?', 'Speaking Part 3: কোনটা ঠিক?'),
    options: ['I am agree with this idea.', 'I agree with this idea.', 'I am agreeing with this idea.'], answer: 'I agree with this idea.',
    explanation: l('"agree" is already a verb: I agree. No "am".', '"agree" নিজেই verb: I agree। "am" লাগবে না।'),
    why: { 'I am agree with this idea.': l('Bangla "আমি একমত" makes "am" feel natural, but "agree" is a verb, not an adjective.', 'বাংলা "আমি একমত" থেকে "am" স্বাভাবিক লাগে, কিন্তু "agree" verb, adjective না।'), 'I am agreeing with this idea.': l('Opinion verbs (agree, believe, think = opinion) stay in present simple.', 'মতামতের verb (agree, believe, think = মতামত) present simple-এ থাকে।') },
  },
  {
    id: 't-2-p5', type: 'gap', tag: 'tense', concept: 'present-simple',
    prompt: l('Task 1: write the correct form of "show".', 'Task 1: "show"-এর সঠিক form লেখো।'),
    sentence: 'The table ___ the number of international students in five countries in 2020.',
    accepted: ['shows'],
    explanation: l('The table shows it NOW (even though the data is from 2020) → shows.', 'Table-টা এখন দেখাচ্ছে (data 2020-এর হলেও) → shows।'),
    why: { showed: l('The data is past, but the table is in front of you now → shows.', 'Data অতীতের, কিন্তু table এখন তোমার সামনে → shows।'), show: l('"The table" is singular → shows.', '"The table" singular → shows।') },
  },
  {
    id: 't-2-p6', type: 'choice', tag: 'agreement', concept: 'present-simple',
    prompt: l('Harder: choose the correct form.', 'একটু কঠিন: সঠিক form বাছো।'),
    sentence: 'Everyone in my family ___ tea in the evening.',
    options: ['drink', 'drinks', 'are drinking'], answer: 'drinks',
    explanation: l('"Everyone" is singular → drinks.', '"Everyone" singular → drinks।'),
    why: { drink: l('"Everyone" feels plural, but grammatically it is singular (like "he").', '"Everyone" শুনতে plural লাগে, কিন্তু grammar-এ singular ("he"-এর মতো)।'), 'are drinking': l('A daily habit → present simple, not -ing.', 'রোজকার অভ্যাস → present simple, -ing না।') },
  },
];

const psRecall: Exercise[] = [
  {
    id: 't-2-r1', type: 'gap', tag: 'agreement', concept: 'present-simple',
    prompt: l('Write the verb (teach). No options!', 'Verb লেখো (teach)। কোনো option নেই!'),
    sentence: 'My sister ___ English at a college in Khulna.',
    accepted: ['teaches'],
    explanation: l('she + teach → teaches (-es after ch).', 'she + teach → teaches (ch-এর পরে -es)।'),
    why: { teachs: l('After ch, sh, s, x, o → -es: teaches.', 'ch, sh, s, x, o-এর পরে -es: teaches।'), teach: l('"My sister" = she → add -es.', '"My sister" = she → -es যোগ করো।') },
  },
  {
    id: 't-2-r2', type: 'correct', tag: 'agreement', concept: 'present-simple',
    prompt: l('Fix the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'He don’t live with his parents.',
    accepted: ["He doesn't live with his parents.", 'He does not live with his parents.'],
    explanation: l('he → doesn’t + base verb.', 'he → doesn’t + base verb।'),
  },
  {
    id: 't-2-r3', type: 'gap', tag: 'agreement', concept: 'present-simple',
    prompt: l('Write the missing word to make a question.', 'প্রশ্ন বানাতে বাদ পড়া শব্দটা লেখো।'),
    sentence: '___ your brother work on Fridays?',
    accepted: ['Does'],
    explanation: l('"your brother" = he → Does … work?', '"your brother" = he → Does … work?'),
    why: { do: l('"your brother" is he/she → "Does".', '"your brother" he/she → "Does"।') },
  },
  {
    id: 't-2-r4', type: 'correct', tag: 'verb', concept: 'present-simple',
    prompt: l('Fix the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'I am agree that university should be free.',
    accepted: ['I agree that university should be free.'],
    explanation: l('"agree" is the verb: I agree.', '"agree"-ই verb: I agree।'),
  },
];

export const presentSimpleV2: Lesson = {
  id: 't-2',
  format: 'v2',
  concept: 'present-simple',
  title: l('Present Simple', 'Present Simple'),
  why: l(
    'Routines, facts and opinions — the tense you use most in Speaking Part 1, Task 1 introductions and Task 2 opinions.',
    'রুটিন, সত্য আর মতামত — Speaking Part 1, Task 1-এর শুরু আর Task 2-এর মতামতে সবচেয়ে বেশি লাগে এই tense।',
  ),
  minutes: 14,
  difficulty: 'easy',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('A question you will hear', 'এই প্রশ্নটা তুমি শুনবেই'),
      situation: l(
        'The IELTS examiner asks: "What do you do?" You work in a bank — it’s your permanent job.',
        'IELTS examiner জিজ্ঞেস করলেন: "What do you do?" তুমি একটা ব্যাংকে চাকরি করো — এটা তোমার স্থায়ী কাজ।',
      ),
      question: l('What do you say?', 'তুমি কী বলবে?'),
      options: ['I am working in a bank.', 'I work in a bank.', 'I working in a bank.'],
      answer: 'I work in a bank.',
      diagnose: {
        'I am working in a bank.': l(
          'Many students say this, because "আমি ব্যাংকে কাজ করছি" sounds natural in Bangla. But in English, "I’m working in a bank" sounds temporary (just for now). For your permanent job, English uses the present simple.',
          'অনেকেই এটা বলে, কারণ বাংলায় "আমি ব্যাংকে কাজ করছি" স্বাভাবিক শোনায়। কিন্তু English-এ "I’m working in a bank" শুনলে মনে হয় সাময়িক (এখনকার জন্য)। স্থায়ী কাজের জন্য English-এ present simple।',
        ),
        'I working in a bank.': l('Almost! "-ing" can’t stand alone — it needs am/is/are. But here the best answer doesn’t need -ing at all.', 'প্রায় হয়ে গেছে! "-ing" একা দাঁড়াতে পারে না — am/is/are লাগে। তবে এখানে সবচেয়ে ভালো answer-এ -ing-ই লাগে না।'),
        'I work in a bank.': l('Right! A permanent job, a routine, a fact → present simple. Let’s see exactly when and how.', 'ঠিক! স্থায়ী কাজ, রুটিন, সত্য → present simple। চলো দেখি ঠিক কখন আর কীভাবে।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করো'),
      items: [
        { en: 'I take the bus to university.', note: l('I → take', 'I → take') },
        { en: 'My father reads the newspaper every morning.', note: l('he → reads (+s)', 'he → reads (+s)') },
        { en: 'The sun rises in the east.', note: l('it → rises (+s)', 'it → rises (+s)') },
        { en: 'We usually eat dinner at nine.', note: l('we → eat', 'we → eat') },
        { en: 'The graph shows the number of tourists.', note: l('it → shows (+s)', 'it → shows (+s)') },
      ],
      question: l('What do these sentences have in common?', 'এই sentence-গুলোর মিল কোথায়?'),
      options: [
        l('They are routines, facts or always true — not just this moment', 'এগুলো রুটিন, সত্য বা সবসময় সত্য — শুধু এই মুহূর্তের না'),
        l('They are all happening right now', 'সবগুলো এই মুহূর্তে হচ্ছে'),
        l('They are all finished', 'সবগুলো শেষ হয়ে গেছে'),
      ],
      answer: 0,
      pattern: l(
        'Present simple = routines, facts, permanent situations and opinions. And look again: with he / she / it (father, sun, graph) the verb gets -s.',
        'Present simple = রুটিন, সত্য, স্থায়ী অবস্থা আর মতামত। আবার দেখো: he / she / it (father, sun, graph)-এর সাথে verb-এ -s যোগ হয়েছে।',
      ),
    },
    {
      kind: 'concept',
      title: l('How it works', 'কীভাবে কাজ করে'),
      body: l(
        'Use the base verb for I / you / we / they, and verb + s for he / she / it (and any singular noun). For negatives and questions, "do / does" does the work and the main verb stays in its base form.',
        'I / you / we / they-এর সাথে base verb, আর he / she / it (আর যেকোনো singular noun)-এর সাথে verb + s। Negative আর প্রশ্নে "do / does" কাজটা করে, main verb base form-এ থাকে।',
      ),
      points: [
        l('I work · She works · They don’t work · He doesn’t work', 'I work · She works · They don’t work · He doesn’t work'),
        l('Do you work? · Does she work? (never "Does she works?")', 'Do you work? · Does she work? ("Does she works?" কখনো না)'),
        l('Spelling: go → goes, watch → watches, study → studies, play → plays', 'Spelling: go → goes, watch → watches, study → studies, play → plays'),
        l('Signal words: always, usually, often, sometimes, never, every day', 'Signal word: always, usually, often, sometimes, never, every day'),
        l('Opinion verbs stay simple: I agree, I believe, I think (= my opinion)', 'মতামতের verb simple থাকে: I agree, I believe, I think (= আমার মত)'),
      ],
      timeline: [
        { sentence: 'I study every evening.', picture: 'habit', label: l('Habit', 'অভ্যাস') },
        { sentence: 'Water boils at 100°C.', picture: 'habit', label: l('Fact', 'সত্য') },
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'My mother wakes up at six and makes tea for everyone.', note: l('A family routine.', 'পরিবারের রুটিন।') },
        { en: 'I don’t usually eat breakfast on weekdays.', note: l('Negative habit: don’t + base verb.', 'Negative অভ্যাস: don’t + base verb।') },
        { en: 'Does your university have a library app?', note: l('A question about a fact: Does + base verb.', 'সত্য নিয়ে প্রশ্ন: Does + base verb।') },
        { en: 'I think online classes save a lot of time.', note: l('An opinion.', 'একটা মতামত।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'I usually study in the evening because I work part-time in the morning.', note: l('Part 1: "Do you…?" questions about routines.', 'Part 1: রুটিন নিয়ে "Do you…?" প্রশ্ন।') },
        { skill: 'writing', example: 'The line graph shows how many people used public transport between 2000 and 2020.', note: l('Task 1 first sentence: "shows", not "showed". Task 2: "I believe…".', 'Task 1-এর প্রথম sentence: "shows", "showed" না। Task 2: "I believe…"।') },
        { skill: 'reading', example: 'Honeybees communicate by dancing.', note: l('Passages state facts in the present simple; questions paraphrase them.', 'Passage-এ সত্য present simple-এ থাকে; প্রশ্নে সেটা paraphrase হয়।') },
        { skill: 'listening', example: 'The library opens at nine and closes at six on weekdays.', note: l('Part 1–2: opening times and routines.', 'Part 1–2: খোলার সময় আর রুটিন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'She go to university by bus.', right: 'She goes to university by bus.', why: l('she → verb + s/es.', 'she → verb + s/es।') },
        { wrong: 'He doesn’t likes spicy food.', right: 'He doesn’t like spicy food.', why: l('After doesn’t, the verb has no -s (the -s is already in "does").', 'doesn’t-এর পরে verb-এ -s না (-s আগেই "does"-এ আছে)।') },
        { wrong: 'My brother study at Rajshahi University.', right: 'My brother studies at Rajshahi University.', why: l('study → studies (consonant + y → -ies).', 'study → studies (consonant + y → -ies)।') },
        { wrong: 'I am agree with you.', right: 'I agree with you.', why: l('"agree" is a verb — no "am". (Bangla "আমি একমত" misleads here.)', '"agree" নিজেই verb — "am" লাগে না। (বাংলা "আমি একমত" এখানে ভুল পথে নেয়।)') },
      ],
    },
    { kind: 'practice', mode: 'practice', title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'), exercises: psPractice },
    { kind: 'practice', mode: 'recall', title: l('Active recall: no options', 'Active recall: কোনো option নেই'), exercises: psRecall },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your daily routine', 'এবার তোমার পালা: তোমার দৈনন্দিন রুটিন'),
      exercises: [
        {
          id: 't-2-y1', type: 'write', tag: 'agreement', concept: 'present-simple',
          prompt: l('Speaking Part 1: "Tell me about your daily routine." Write 3 sentences: one with I, one about a family member (he / she), and one with a frequency word.', 'Speaking Part 1: "Tell me about your daily routine." ৩টা sentence লেখো: একটা I দিয়ে, একটা পরিবারের কাউকে নিয়ে (he / she), আর একটায় frequency word।'),
          model: 'I usually wake up at seven and go to university by bus. My mother works at a school, so she leaves home early. On Fridays, we always have lunch together.',
          checklist: [l('Base verb with I / we', 'I / we-এর সাথে base verb'), l('verb + s with he / she', 'he / she-এর সাথে verb + s'), l('A frequency word (usually, always, often…)', 'একটা frequency word (usually, always, often…)')],
          explanation: l('This is a natural Part 1 answer: routine + a family detail + frequency.', 'এটা একটা স্বাভাবিক Part 1 answer: রুটিন + পরিবারের detail + frequency।'),
          mino: {
            task: 'The student describes their daily routine. Check present simple usage: base verb with I/we/they, verb+s/es with he/she/it (including spelling like studies, goes, watches), do/does in negatives/questions, no "am + verb" (e.g. "am agree"), and no unnecessary -ing for routines.',
            target: l('Present Simple: I work · she works · a frequency word', 'Present Simple: I work · she works · একটা frequency word'),
          },
        },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Routines, facts, permanent jobs, opinions → present simple.', 'রুটিন, সত্য, স্থায়ী কাজ, মতামত → present simple।'),
        l('he / she / it → verb + s. does / doesn’t → base verb.', 'he / she / it → verb + s। does / doesn’t → base verb।'),
        l('I agree (not "I am agree"). The graph shows (not "showed").', 'I agree ("I am agree" না)। The graph shows ("showed" না)।'),
      ],
    },
  ],
};

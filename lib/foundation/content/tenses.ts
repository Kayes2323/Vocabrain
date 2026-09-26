import type { Concept, Exercise, L, Lesson } from '../model';

/**
 * Module 2 — Tenses for IELTS, lessons 3–6 (v1 format; 1–2 are in tenses-v2.ts). Original Vocab Brain lessons. Tenses are taught
 * through IELTS tasks (Task 1 data, Speaking about experience, time changes in
 * Listening and Reading), not memorised tables.
 */

const l = (en: string, bn: string): L => ({ en, bn });

export const TENSE_CONCEPTS: Concept[] = [
  { id: 'time', title: l('Understanding Time', 'সময় বোঝা'), lessonId: 't-1', tag: 'tense' },
  { id: 'present-simple', title: l('Present Simple', 'Present Simple'), lessonId: 't-2', tag: 'tense' },
  { id: 'present-continuous', title: l('Present Continuous', 'Present Continuous'), lessonId: 't-3', tag: 'tense' },
  { id: 'past-simple', title: l('Past Simple', 'Past Simple'), lessonId: 't-4', tag: 'tense' },
  { id: 'past-continuous', title: l('Past Continuous', 'Past Continuous'), lessonId: 't-5', tag: 'tense' },
  { id: 'present-perfect', title: l('Present Perfect', 'Present Perfect'), lessonId: 't-6', tag: 'tense' },
  { id: 'past-perfect', title: l('Past Perfect', 'Past Perfect'), lessonId: 't-7', tag: 'tense' },
  { id: 'future', title: l('Future forms', 'Future forms'), lessonId: 't-8', tag: 'tense' },
];

const practice = (exercises: Exercise[]) => ({ kind: 'practice' as const, title: l('Practice', 'Practice'), exercises });
const recall = (...points: L[]) => ({ kind: 'recall' as const, title: l('Remember', 'মনে রাখো'), points });
const ielts = (uses: Extract<Lesson['steps'][number], { kind: 'ielts' }>['uses']) => ({
  kind: 'ielts' as const,
  title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
  uses,
});

export const tensesLessons: Lesson[] = [
  // ------------------------------------------------------------------ 3
  {
    id: 't-3',
    concept: 'present-continuous',
    title: l('Present Continuous', 'Present Continuous'),
    why: l('Actions happening now and changing trends — useful in Speaking and for describing current changes.', 'এই মুহূর্তের কাজ আর চলমান পরিবর্তন — Speaking-এ আর এখনকার পরিবর্তন বোঝাতে কাজের।'),
    minutes: 7,
    difficulty: 'easy',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: l('What is it and when do we use it?', 'এটা কী, কখন ব্যবহার করি?'),
        body: l(
          'Use am / is / are + verb-ing for actions happening now or around now, temporary situations, and trends that are changing.',
          'এখন বা এই সময়ে চলছে এমন কাজ, সাময়িক অবস্থা আর বদলাতে থাকা trend-এর জন্য am / is / are + verb-ing।',
        ),
        points: [
          l('I am studying · She is working · They are living…', 'I am studying · She is working · They are living…'),
          l('Signal words: now, at the moment, currently, these days, this year.', 'Signal word: now, at the moment, currently, these days, this year।'),
          l('Not with state verbs: know, believe, want, own ("I know", not "I am knowing").', 'State verb-এর সাথে না: know, believe, want, own ("I know", "I am knowing" না)।'),
        ],
      },
      {
        kind: 'examples',
        title: l('Examples', 'উদাহরণ'),
        items: [
          { en: 'I am preparing for IELTS at the moment.', note: l('Around now, temporary.', 'এই সময়ে, সাময়িক।') },
          { en: 'More people are working from home these days.', note: l('A changing trend.', 'বদলাতে থাকা trend।') },
          { en: 'I know the answer.', note: l('"know" is a state verb → present simple, not continuous.', '"know" state verb → present simple, continuous না।') },
        ],
      },
      ielts([
        { skill: 'speaking', example: 'At the moment I’m studying accounting at a university in Dhaka.', note: l('Part 1 "Do you work or study?" — current situation.', 'Part 1 "Do you work or study?" — এখনকার অবস্থা।') },
        { skill: 'writing', example: 'Cities are becoming more crowded, and governments are struggling to provide housing.', note: l('Task 2 introductions often describe current trends.', 'Task 2-এর introduction প্রায়ই চলমান trend বর্ণনা করে।') },
        { skill: 'listening', example: 'We’re currently looking for volunteers for the weekend.', note: l('Part 2 announcements use "currently", "now".', 'Part 2-এর ঘোষণায় "currently", "now" থাকে।') },
      ]),
      practice([
        {
          id: 't-3-e1', type: 'choice', tag: 'tense', concept: 'present-continuous',
          prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
          sentence: 'Look! It ___ outside.',
          options: ['rains', 'is raining', 'rained'], answer: 'is raining',
          explanation: l('"Look!" = happening right now → present continuous.', '"Look!" = এই মুহূর্তে হচ্ছে → present continuous।'),
          why: { rains: l('Present simple is for habits ("It rains a lot in July").', 'Present simple অভ্যাসের জন্য ("It rains a lot in July")।'), rained: l('Past, but "Look!" means now.', 'Past, কিন্তু "Look!" মানে এখন।') },
        },
        {
          id: 't-3-e2', type: 'correct', tag: 'tense', concept: 'present-continuous',
          prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
          sentence: 'Nowadays more students studying online.',
          accepted: ['Nowadays more students are studying online.', 'Nowadays, more students are studying online.'],
          explanation: l('Add "are": subject + are + verb-ing.', '"are" যোগ করো: subject + are + verb-ing।'),
        },
        {
          id: 't-3-e3', type: 'choice', tag: 'tense', concept: 'present-continuous',
          prompt: l('Choose the correct sentence.', 'সঠিক sentence বাছো।'),
          options: ['I am knowing many people in Sylhet.', 'I know many people in Sylhet.'], answer: 'I know many people in Sylhet.',
          explanation: l('"know" is a state verb: no -ing.', '"know" state verb: -ing হয় না।'),
          why: { 'I am knowing many people in Sylhet.': l('State verbs (know, believe, own) are not used in the continuous.', 'State verb (know, believe, own) continuous-এ ব্যবহার হয় না।') },
        },
        {
          id: 't-3-e4', type: 'gap', tag: 'tense', concept: 'present-continuous',
          prompt: l('Complete with the present continuous of "increase".', '"increase"-এর present continuous বসাও।'),
          sentence: 'The cost of living ___ in many cities this year.',
          accepted: ['is increasing', "'s increasing"],
          explanation: l('A trend around now → "is increasing".', 'এখনকার trend → "is increasing"।'),
          why: { increasing: l('"-ing" needs "is" before it.', '"-ing"-এর আগে "is" লাগে।'), increases: l('Present simple is for general facts, not a trend "this year".', 'Present simple সাধারণ সত্যের জন্য, "this year"-এর trend-এর জন্য না।') },
        },
        {
          id: 't-3-e5', type: 'write', tag: 'tense', concept: 'present-continuous',
          prompt: l('Speaking Part 1: "Do you work or are you a student?" Answer with the present continuous.', 'Speaking Part 1: "Do you work or are you a student?" present continuous দিয়ে answer দাও।'),
          model: 'I’m a student. At the moment I’m studying English literature at Rajshahi University.',
          checklist: [l('am / is / are + verb-ing', 'am / is / are + verb-ing'), l('A time phrase (at the moment, currently)', 'একটা সময়ের phrase (at the moment, currently)')],
          explanation: l('Current, temporary situations → present continuous.', 'এখনকার সাময়িক অবস্থা → present continuous।'),
        },
      ]),
      recall(
        l('am / is / are + verb-ing = now / these days / changing trends.', 'am / is / are + verb-ing = এখন / আজকাল / বদলাতে থাকা trend।'),
        l('No -ing with know, believe, want, own.', 'know, believe, want, own-এ -ing না।'),
      ),
    ],
  },

  // ------------------------------------------------------------------ 4
  {
    id: 't-4',
    concept: 'past-simple',
    title: l('Past Simple', 'Past Simple'),
    why: l('Finished time: the tense of most Task 1 graphs and Part 2 stories.', 'শেষ হয়ে যাওয়া সময়: বেশিরভাগ Task 1 graph আর Part 2-এর গল্পের tense।'),
    minutes: 9,
    difficulty: 'easy',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: l('What is it and when do we use it?', 'এটা কী, কখন ব্যবহার করি?'),
        body: l(
          'Use the past simple for actions and situations that finished in the past, especially with a finished time (in 2010, last year, when I was a child). Regular verbs add -ed; many common verbs are irregular.',
          'অতীতে শেষ হয়ে যাওয়া কাজ বা অবস্থার জন্য past simple, বিশেষ করে শেষ হয়ে যাওয়া সময়ের সাথে (in 2010, last year, when I was a child)। Regular verb-এ -ed যোগ হয়; অনেক common verb irregular।',
        ),
        points: [
          l('Regular: increase → increased, decline → declined, stay → stayed.', 'Regular: increase → increased, decline → declined, stay → stayed।'),
          l('Irregular: rise → rose, fall → fell, grow → grew, go → went.', 'Irregular: rise → rose, fall → fell, grow → grew, go → went।'),
          l('Negative / question: did not + base verb; Did + subject + base verb?', 'Negative / question: did not + base verb; Did + subject + base verb?'),
        ],
      },
      {
        kind: 'examples',
        title: l('Examples', 'উদাহরণ'),
        items: [
          { en: 'Population increased significantly between 2000 and 2010.', note: l('Why "increased"? Because the time period (2000–2010) is finished.', 'কেন "increased"? কারণ সময়টা (2000–2010) শেষ হয়ে গেছে।') },
          { en: 'Sales fell to 200 units in 2015.', note: l('Irregular: fall → fell.', 'Irregular: fall → fell।') },
          { en: 'I didn’t enjoy school when I was younger.', note: l('did not + base verb (enjoy).', 'did not + base verb (enjoy)।') },
        ],
      },
      ielts([
        { skill: 'writing', example: 'The number of cars rose from 2 million in 1990 to 5 million in 2010.', note: l('Task 1 with past years: past simple for every trend.', 'Task 1-এ অতীতের বছর: প্রতিটা trend-এ past simple।') },
        { skill: 'speaking', example: 'I met my best friend when I was in class six.', note: l('Part 2 "Describe a time when…" is a past story.', 'Part 2 "Describe a time when…" একটা অতীতের গল্প।') },
        { skill: 'reading', example: 'The bridge was completed in 1932.', note: l('History passages: dates + past simple. Scan for the year.', 'ইতিহাসের passage: তারিখ + past simple। বছরটা scan করো।') },
        { skill: 'listening', example: 'I booked it last week, but I changed the date yesterday.', note: l('Past actions in Part 1 conversations.', 'Part 1-এর কথোপকথনে অতীতের কাজ।') },
      ]),
      practice([
        {
          id: 't-4-e1', type: 'choice', tag: 'tense', concept: 'past-simple',
          prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
          sentence: 'Unemployment ___ sharply in 2009.',
          options: ['rises', 'rose', 'has risen'], answer: 'rose',
          explanation: l('2009 is finished → past simple; "rise" is irregular → "rose".', '2009 শেষ → past simple; "rise" irregular → "rose"।'),
          why: { rises: l('Present simple, but 2009 is in the past.', 'Present simple, কিন্তু 2009 অতীতে।'), 'has risen': l('Present perfect cannot be used with a finished time like "in 2009".', '"in 2009"-এর মতো শেষ হওয়া সময়ের সাথে present perfect হয় না।') },
        },
        {
          id: 't-4-e2', type: 'gap', tag: 'tense', concept: 'past-simple',
          prompt: l('Write the past simple of "fall".', '"fall"-এর past simple লেখো।'),
          sentence: 'Coal consumption ___ to its lowest point in 2020.',
          accepted: ['fell'],
          explanation: l('fall → fell (irregular).', 'fall → fell (irregular)।'),
          why: { falled: l('"fall" is irregular: fell, not falled.', '"fall" irregular: fell, falled না।'), fallen: l('"fallen" is the past participle (has fallen).', '"fallen" past participle (has fallen)।') },
        },
        {
          id: 't-4-e3', type: 'correct', tag: 'tense', concept: 'past-simple',
          prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
          sentence: 'Last year I go to Cox’s Bazar with my family.',
          accepted: ["Last year I went to Cox's Bazar with my family.", "Last year, I went to Cox's Bazar with my family."],
          explanation: l('"Last year" → past simple: go → went.', '"Last year" → past simple: go → went।'),
        },
        {
          id: 't-4-e4', type: 'choice', tag: 'tense', concept: 'past-simple',
          prompt: l('Choose the correct sentence.', 'সঠিক sentence বাছো।'),
          options: ['I didn’t went to class yesterday.', 'I didn’t go to class yesterday.', 'I not went to class yesterday.'], answer: 'I didn’t go to class yesterday.',
          explanation: l('didn’t + base verb (go).', 'didn’t + base verb (go)।'),
          why: { 'I didn’t went to class yesterday.': l('"did" already shows the past; the verb stays "go".', '"did"-ই past দেখায়; verb "go" থাকে।'), 'I not went to class yesterday.': l('English needs "did not / didn’t" for past negatives.', 'Past negative-এ "did not / didn’t" লাগে।') },
        },
        {
          id: 't-4-e5', type: 'gap', tag: 'tense', concept: 'past-simple',
          prompt: l('Complete with the past simple of "remain".', '"remain"-এর past simple বসাও।'),
          sentence: 'Between 1995 and 2000, the figure ___ stable at around 40%.',
          accepted: ['remained'],
          explanation: l('Finished period → "remained".', 'শেষ হওয়া সময় → "remained"।'),
        },
        {
          id: 't-4-e6', type: 'write', tag: 'tense', concept: 'past-simple',
          prompt: l('Task 1 practice: In 2000, 30% of students used the library; in 2010 it was 50%. Write one sentence.', 'Task 1 practice: 2000-এ 30% student library ব্যবহার করত; 2010-এ 50%। এক sentence লেখো।'),
          model: 'The percentage of students who used the library rose from 30% in 2000 to 50% in 2010.',
          checklist: [l('Past simple trend verb (rose, increased)', 'Past simple trend verb (rose, increased)'), l('from … to … with the years', 'বছর সহ from … to …')],
          explanation: l('This is a complete Task 1 data sentence.', 'এটা একটা সম্পূর্ণ Task 1 data sentence।'),
        },
      ]),
      recall(
        l('Finished time (in 2009, last year, ago) → past simple.', 'শেষ হওয়া সময় (in 2009, last year, ago) → past simple।'),
        l('rise → rose · fall → fell · grow → grew', 'rise → rose · fall → fell · grow → grew'),
        l('didn’t + base verb.', 'didn’t + base verb।'),
      ),
    ],
  },

  // ------------------------------------------------------------------ 5
  {
    id: 't-5',
    concept: 'past-continuous',
    title: l('Past Continuous', 'Past Continuous'),
    why: l('Background actions in stories — makes Speaking Part 2 answers vivid and well organised.', 'গল্পের পটভূমির কাজ — Speaking Part 2-এর answer জীবন্ত আর গোছানো করে।'),
    minutes: 7,
    difficulty: 'medium',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: l('What is it and when do we use it?', 'এটা কী, কখন ব্যবহার করি?'),
        body: l(
          'Use was / were + verb-ing for an action that was in progress at a moment in the past, often interrupted by a shorter action in the past simple.',
          'অতীতের কোনো মুহূর্তে চলছিল এমন কাজের জন্য was / were + verb-ing, প্রায়ই past simple-এর একটা ছোট কাজ দিয়ে বাধা পায়।',
        ),
        points: [
          l('I / he / she / it was working · you / we / they were working', 'I / he / she / it was working · you / we / they were working'),
          l('Long action (past continuous) + "when" + short action (past simple).', 'লম্বা কাজ (past continuous) + "when" + ছোট কাজ (past simple)।'),
          l('"while" + long action: While I was studying, the power went out.', '"while" + লম্বা কাজ: While I was studying, the power went out।'),
        ],
      },
      {
        kind: 'examples',
        title: l('Examples', 'উদাহরণ'),
        items: [
          { en: 'I was walking home when it started to rain.', note: l('Walking = background; started = the interruption.', 'Walking = পটভূমি; started = বাধা।') },
          { en: 'While we were waiting for the bus, we met our old teacher.', note: l('"while" + past continuous.', '"while" + past continuous।') },
        ],
      },
      ielts([
        { skill: 'speaking', example: 'I was travelling to Sylhet by train when I first saw the tea gardens.', note: l('Part 2 stories: set the scene, then the event.', 'Part 2-এর গল্প: আগে দৃশ্য, তারপর ঘটনা।') },
        { skill: 'listening', example: 'I was waiting at the station when they announced the delay.', note: l('Part 3 and 4 speakers describe past situations this way.', 'Part 3 আর 4-এর বক্তারা এভাবে অতীতের অবস্থা বর্ণনা করেন।') },
        { skill: 'reading', example: 'While he was studying moulds, Fleming noticed something unusual.', note: l('Science history: what they were doing when they discovered something.', 'বিজ্ঞানের ইতিহাস: আবিষ্কারের সময় তাঁরা কী করছিলেন।') },
      ]),
      practice([
        {
          id: 't-5-e1', type: 'choice', tag: 'tense', concept: 'past-continuous',
          prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
          sentence: 'I ___ dinner when the phone rang.',
          options: ['cooked', 'was cooking', 'am cooking'], answer: 'was cooking',
          explanation: l('Cooking was in progress when the phone rang → past continuous.', 'Phone বাজার সময় রান্না চলছিল → past continuous।'),
          why: { cooked: l('Past simple suggests I cooked after the phone rang — a different meaning.', 'Past simple বোঝায় phone বাজার পরে রান্না করেছি — অর্থ বদলে যায়।'), 'am cooking': l('Present, but the phone rang in the past.', 'Present, কিন্তু phone বেজেছিল অতীতে।') },
        },
        {
          id: 't-5-e2', type: 'gap', tag: 'agreement', concept: 'past-continuous',
          prompt: l('Complete with was or were.', 'was বা were বসাও।'),
          sentence: 'My friends ___ playing cricket when the storm started.',
          accepted: ['were'],
          explanation: l('Plural subject → "were".', 'Plural subject → "were"।'),
          why: { was: l('"was" is for I / he / she / it; "my friends" is plural.', '"was" I / he / she / it-এর জন্য; "my friends" plural।') },
        },
        {
          id: 't-5-e3', type: 'correct', tag: 'tense', concept: 'past-continuous',
          prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
          sentence: 'While I studied, the lights went out.',
          accepted: ['While I was studying, the lights went out.'],
          explanation: l('"While" + an action in progress → "was studying".', '"While" + চলমান কাজ → "was studying"।'),
        },
        {
          id: 't-5-e4', type: 'choice', tag: 'tense', concept: 'past-continuous',
          prompt: l('"What were you doing at 9 p.m. yesterday?" Choose the answer.', '"What were you doing at 9 p.m. yesterday?" answer বাছো।'),
          sentence: 'At 9 p.m. yesterday, I ___ a documentary.',
          options: ['watched', 'was watching', 'am watching'], answer: 'was watching',
          explanation: l('An action in progress at a moment in the past → was + verb-ing.', 'অতীতের একটা মুহূর্তে চলছিল → was + verb-ing।'),
          why: { watched: l('Past simple is a complete action; "at 9 p.m." asks what was in progress.', 'Past simple সম্পূর্ণ কাজ; "at 9 p.m." জানতে চায় তখন কী চলছিল।'), 'am watching': l('Present, but the question is about yesterday.', 'Present, কিন্তু প্রশ্ন গতকাল নিয়ে।') },
        },
        {
          id: 't-5-e5', type: 'write', tag: 'tense', concept: 'past-continuous',
          prompt: l('Speaking Part 2: start a story with "I was … when …".', 'Speaking Part 2: "I was … when …" দিয়ে একটা গল্প শুরু করো।'),
          model: 'I was studying for my HSC exams when my uncle called with some great news.',
          checklist: [l('was/were + verb-ing for the background', 'পটভূমির জন্য was/were + verb-ing'), l('"when" + past simple for the event', 'ঘটনার জন্য "when" + past simple')],
          explanation: l('A strong way to open a Part 2 story.', 'Part 2-এর গল্প শুরু করার একটা ভালো উপায়।'),
        },
      ]),
      recall(
        l('was/were + verb-ing = in progress in the past.', 'was/were + verb-ing = অতীতে চলছিল।'),
        l('Long action (was doing) + when + short action (did).', 'লম্বা কাজ (was doing) + when + ছোট কাজ (did)।'),
      ),
    ],
  },

  // ------------------------------------------------------------------ 6
  {
    id: 't-6',
    concept: 'present-perfect',
    title: l('Present Perfect', 'Present Perfect'),
    why: l('Connects the past to now — essential for trends "since 2010" and for talking about experience.', 'অতীতকে এখনের সাথে যুক্ত করে — "since 2010" ধরনের trend আর অভিজ্ঞতার কথা বলতে অপরিহার্য।'),
    minutes: 10,
    difficulty: 'medium',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: l('What is it and when do we use it?', 'এটা কী, কখন ব্যবহার করি?'),
        body: l(
          'Use have / has + past participle for (1) situations from the past until now (with since / for), (2) experiences at an unknown time ("I have visited Sylhet"), and (3) recent changes that matter now. Do NOT use it with a finished time (yesterday, in 2010, last year).',
          'have / has + past participle ব্যবহার হয় (১) অতীত থেকে এখন পর্যন্ত চলা অবস্থায় (since / for সহ), (২) অজানা সময়ের অভিজ্ঞতায় ("I have visited Sylhet"), আর (৩) সাম্প্রতিক পরিবর্তন যা এখন গুরুত্বপূর্ণ। শেষ হয়ে যাওয়া সময়ের (yesterday, in 2010, last year) সাথে ব্যবহার করবে না।',
        ),
        points: [
          l('I / you / we / they have worked · he / she / it has worked', 'I / you / we / they have worked · he / she / it has worked'),
          l('since + a point in time (since 2015) · for + a period (for five years)', 'since + সময়ের একটা বিন্দু (since 2015) · for + সময়ের দৈর্ঘ্য (for five years)'),
          l('Irregular participles: risen, fallen, grown, been, done, seen.', 'Irregular participle: risen, fallen, grown, been, done, seen।'),
        ],
      },
      {
        kind: 'examples',
        title: l('Examples', 'উদাহরণ'),
        items: [
          { en: 'I have lived in Dhaka since 2019.', note: l('Started in 2019, still true now.', '2019-এ শুরু, এখনো সত্য।') },
          { en: 'Online shopping has become very popular in recent years.', note: l('Recent change that matters now.', 'সাম্প্রতিক পরিবর্তন, এখনো প্রাসঙ্গিক।') },
          { en: 'I visited Sylhet last year.', note: l('"last year" is finished → past simple, not present perfect.', '"last year" শেষ → past simple, present perfect না।') },
        ],
      },
      ielts([
        { skill: 'writing', example: 'In recent decades, the number of international students has grown rapidly.', note: l('Task 2 background sentences: "in recent years", "has grown".', 'Task 2-এর background sentence: "in recent years", "has grown"।') },
        { skill: 'speaking', example: 'I’ve been interested in photography since I was a teenager.', note: l('Part 1 and 3: connecting your past to now.', 'Part 1 আর 3: তোমার অতীতকে এখনের সাথে যুক্ত করা।') },
        { skill: 'reading', example: 'Researchers have not yet found a cure.', note: l('"have not yet" = still not true now → important for TRUE/FALSE/NOT GIVEN.', '"have not yet" = এখনো সত্য না → TRUE/FALSE/NOT GIVEN-এ গুরুত্বপূর্ণ।') },
        { skill: 'listening', example: 'I’ve already paid the deposit.', note: l('Part 1: "already", "just", "yet" tell you what is done.', 'Part 1: "already", "just", "yet" বলে দেয় কী হয়ে গেছে।') },
      ]),
      practice([
        {
          id: 't-6-e1', type: 'choice', tag: 'tense', concept: 'present-perfect',
          prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
          sentence: 'I ___ in Dhaka since 2019.',
          options: ['live', 'lived', 'have lived'], answer: 'have lived',
          explanation: l('"since 2019" = from 2019 until now → present perfect.', '"since 2019" = 2019 থেকে এখন পর্যন্ত → present perfect।'),
          why: { live: l('Present simple does not show the time from 2019 until now.', 'Present simple 2019 থেকে এখন পর্যন্ত সময়টা দেখায় না।'), lived: l('Past simple means it is finished — but you still live there.', 'Past simple মানে শেষ হয়ে গেছে — কিন্তু তুমি এখনো সেখানে থাকো।') },
        },
        {
          id: 't-6-e2', type: 'choice', tag: 'tense', concept: 'present-perfect',
          prompt: l('since or for?', 'since নাকি for?'),
          sentence: 'She has worked here ___ five years.',
          options: ['since', 'for'], answer: 'for',
          explanation: l('"five years" is a period → "for".', '"five years" একটা সময়ের দৈর্ঘ্য → "for"।'),
          why: { since: l('"since" needs a starting point (since 2020), not a length of time.', '"since"-এর সাথে শুরুর বিন্দু লাগে (since 2020), সময়ের দৈর্ঘ্য না।') },
        },
        {
          id: 't-6-e3', type: 'correct', tag: 'tense', concept: 'present-perfect',
          prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
          sentence: 'I have visited Cox’s Bazar last year.',
          accepted: ["I visited Cox's Bazar last year."],
          explanation: l('"last year" is a finished time → past simple "visited".', '"last year" শেষ হওয়া সময় → past simple "visited"।'),
        },
        {
          id: 't-6-e4', type: 'gap', tag: 'agreement', concept: 'present-perfect',
          prompt: l('Complete with have or has.', 'have বা has বসাও।'),
          sentence: 'The number of cars ___ doubled since 2000.',
          accepted: ['has'],
          explanation: l('"The number" is singular → "has".', '"The number" singular → "has"।'),
          why: { have: l('The head word is "number" (singular), not "cars".', 'মূল শব্দ "number" (singular), "cars" না।') },
        },
        {
          id: 't-6-e5', type: 'choice', tag: 'tense', concept: 'present-perfect',
          prompt: l('Choose the correct sentence for a Task 2 introduction.', 'Task 2 introduction-এর জন্য সঠিক sentence বাছো।'),
          options: ['In recent years, social media has changed the way people communicate.', 'In recent years, social media changed the way people communicate yesterday.', 'In recent years, social media has change the way people communicate.'],
          answer: 'In recent years, social media has changed the way people communicate.',
          explanation: l('"In recent years" + has + past participle (changed).', '"In recent years" + has + past participle (changed)।'),
          why: { 'In recent years, social media has change the way people communicate.': l('After has/have use the past participle: changed.', 'has/have-এর পরে past participle: changed।') },
        },
        {
          id: 't-6-e6', type: 'write', tag: 'tense', concept: 'present-perfect',
          prompt: l('Speaking Part 1: "How long have you lived in your hometown?"', 'Speaking Part 1: "How long have you lived in your hometown?"'),
          model: 'I’ve lived there since I was born, so about twenty years.',
          checklist: [l('have/has + past participle', 'have/has + past participle'), l('since or for used correctly', 'since বা for ঠিকভাবে')],
          explanation: l('Answer "How long…?" with the present perfect + since/for.', '"How long…?"-এর answer: present perfect + since/for।'),
        },
      ]),
      recall(
        l('have/has + past participle = past → now.', 'have/has + past participle = অতীত → এখন।'),
        l('since 2015 · for five years', 'since 2015 · for five years'),
        l('Never with yesterday, last year, in 2010.', 'yesterday, last year, in 2010-এর সাথে কখনো না।'),
      ),
    ],
  },
];


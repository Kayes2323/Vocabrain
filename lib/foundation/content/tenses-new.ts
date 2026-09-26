import type { Exercise, Lesson } from '../model';
import { l } from './pos-kit';

/**
 * Tenses for IELTS, the last three lessons (v2): t-13 Present Perfect Continuous,
 * t-14 Tense Comparisons (meaning, not formulas), t-15 Mixed Practice (the student
 * decides the tense from context; no question names the tense). Original Vocab Brain content.
 */

// ======================================================================= 13
const ppcPractice: Exercise[] = [
  {
    id: 't-13-p1', type: 'choice', tag: 'tense', concept: 'present-perfect-continuous', pattern: 'tense-time',
    prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
    sentence: 'I ___ English for five years, and I still take classes.',
    options: ['am studying', 'have been studying', 'studied'], answer: 'have been studying',
    explanation: l('An activity that started in the past and is still going on, with "for" → have been + -ing.', 'অতীতে শুরু হয়ে এখনো চলা কাজ, "for" সহ → have been + -ing।'),
    why: { 'am studying': l('Bangla "পাঁচ বছর ধরে পড়ছি" uses the present, but English needs "have been studying" to join the past to now.', 'বাংলায় "পাঁচ বছর ধরে পড়ছি"-তে present, কিন্তু English-এ অতীত আর এখন জোড়ার জন্য "have been studying" লাগে।'), studied: l('"studied" is finished, but you still take classes.', '"studied" শেষ, কিন্তু তুমি এখনো class করছো।') },
  },
  {
    id: 't-13-p2', type: 'choice', tag: 'tense', concept: 'present-perfect-continuous',
    prompt: l('You come in and the ground is wet. What do you say?', 'তুমি বাইরে থেকে এলে, মাটি ভেজা। কী বলবে?'),
    options: ['It has been raining.', 'It rains.', 'It is rain.'], answer: 'It has been raining.',
    explanation: l('A recent activity with a visible result now (wet ground) → has been + -ing.', 'সাম্প্রতিক কাজ যার ফল এখন দেখা যায় (ভেজা মাটি) → has been + -ing।'),
    why: { 'It rains.': l('Present simple is a general fact ("It rains a lot in July").', 'Present simple সাধারণ সত্য ("It rains a lot in July")।'), 'It is rain.': l('"is rain" is not a verb form.', '"is rain" কোনো verb form না।') },
  },
  {
    id: 't-13-p3', type: 'choice', tag: 'tense', concept: 'present-perfect-continuous', pattern: 'simple-vs-continuous',
    prompt: l('Choose the correct sentence.', 'সঠিক sentence বাছো।'),
    options: ['I have been knowing her since school.', 'I have known her since school.'], answer: 'I have known her since school.',
    explanation: l('"know" is a state verb: have known, not have been knowing.', '"know" state verb: have known, have been knowing না।'),
    why: { 'I have been knowing her since school.': l('State verbs (know, believe, own) do not take -ing, even here.', 'State verb (know, believe, own)-এ -ing হয় না, এখানেও না।') },
  },
  {
    id: 't-13-p4', type: 'choice', tag: 'tense', concept: 'present-perfect-continuous',
    prompt: l('Which one talks about a finished number?', 'কোনটা একটা শেষ হওয়া সংখ্যার কথা বলে?'),
    options: ['I have written three essays this week.', 'I have been writing three essays this week.'], answer: 'I have written three essays this week.',
    explanation: l('How many / how much you completed → present perfect simple. How long an activity has gone on → continuous.', 'কতগুলো শেষ করেছো → present perfect simple। কতক্ষণ ধরে কাজটা চলছে → continuous।'),
  },
];

const ppcRecall: Exercise[] = [
  {
    id: 't-13-r1', type: 'gap', tag: 'tense', concept: 'present-perfect-continuous',
    prompt: l('Write the verb (wait). No options!', 'Verb লেখো (wait)। কোনো option নেই!'),
    sentence: 'We ___ for the bus since eight o’clock, and it still hasn’t come.',
    accepted: ['have been waiting', "'ve been waiting"],
    explanation: l('since + still going on → have been waiting.', 'since + এখনো চলছে → have been waiting।'),
    why: { 'are waiting': l('"since eight" joins the past to now → have been waiting.', '"since eight" অতীত আর এখনকে জোড়ে → have been waiting।'), 'have waited': l('Possible, but the activity is still going on and we feel its length: have been waiting.', 'চলতে পারে, কিন্তু কাজটা এখনো চলছে আর সময়ের দৈর্ঘ্য বোঝানো হচ্ছে: have been waiting।') },
  },
  {
    id: 't-13-r2', type: 'correct', tag: 'tense', concept: 'present-perfect-continuous', pattern: 'tense-time',
    prompt: l('Fix the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'I am learning to drive for three months.',
    accepted: ['I have been learning to drive for three months.'],
    explanation: l('for + until now → have been learning.', 'for + এখন পর্যন্ত → have been learning।'),
  },
  {
    id: 't-13-r3', type: 'correct', tag: 'tense', concept: 'present-perfect-continuous', pattern: 'verb-form',
    prompt: l('Fix the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'She has been work at the hospital since 2021.',
    accepted: ['She has been working at the hospital since 2021.', 'She has worked at the hospital since 2021.'],
    explanation: l('has been + -ing: has been working.', 'has been + -ing: has been working।'),
  },
];

const ppcChallenge: Exercise[] = [
  {
    id: 't-13-c1', type: 'choice', tag: 'tense', concept: 'present-perfect-continuous',
    prompt: l('"I have painted the room." vs "I have been painting the room." Which one might not be finished?', '"I have painted the room." আর "I have been painting the room." কোনটা হয়তো শেষ হয়নি?'),
    options: ['"have been painting"', '"have painted"', 'Both are finished'], answer: '"have been painting"',
    explanation: l('The continuous focuses on the activity (maybe not finished); the simple focuses on the result (done).', 'Continuous কাজটার উপর জোর দেয় (হয়তো শেষ হয়নি); simple ফলাফলের উপর (শেষ)।'),
  },
  {
    id: 't-13-c2', type: 'spot', tag: 'tense', concept: 'present-perfect-continuous', pattern: 'verb-form',
    prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করো।'),
    words: ['Governments', 'have', 'been', 'invest', 'in', 'renewable', 'energy', 'for', 'years.'], wrong: 3,
    accepted: ['investing'], fixOptions: ['investing', 'invested', 'invests'],
    explanation: l('have been + -ing: have been investing.', 'have been + -ing: have been investing।'),
  },
  {
    id: 't-13-c3', type: 'choice', tag: 'tense', concept: 'present-perfect-continuous',
    prompt: l('Reading: "Researchers have been testing the drug since 2020." Statement: "The tests are complete."', 'Reading: "Researchers have been testing the drug since 2020." Statement: "The tests are complete."'),
    options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE',
    explanation: l('"have been testing … since 2020" = still going on → not complete.', '"have been testing … since 2020" = এখনো চলছে → শেষ হয়নি।'),
  },
];

export const presentPerfectContinuous: Lesson = {
  id: 't-13',
  format: 'v2',
  concept: 'present-perfect-continuous',
  title: l('Present Perfect Continuous', 'Present Perfect Continuous'),
  why: l('"How long have you been…?" is a classic Speaking Part 1 question, and Task 2 uses it for ongoing efforts and trends.', '"How long have you been…?" Speaking Part 1-এর চেনা প্রশ্ন, আর Task 2-এ চলমান চেষ্টা আর trend বোঝাতে এটা লাগে।'),
  minutes: 12,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('You look tired', 'তোমাকে ক্লান্ত দেখাচ্ছে'),
      situation: l('Your friend says: "You look tired!" You started studying at 8 this morning, and you are still at your desk at 4 p.m.', 'বন্ধু বললো: "You look tired!" তুমি সকাল ৮টায় পড়া শুরু করেছো, বিকেল ৪টাতেও টেবিলে বসে আছো।'),
      question: l('What do you say?', 'তুমি কী বলবে?'),
      options: ['I am studying since 8 a.m.', 'I studied since 8 a.m.', 'I have been studying since 8 a.m.'],
      answer: 'I have been studying since 8 a.m.',
      diagnose: {
        'I am studying since 8 a.m.': l('Very common for Bangla speakers: "সকাল ৮টা থেকে পড়ছি" uses the present. English needs a tense that joins 8 a.m. to now.', 'বাংলাভাষীদের খুব common ভুল: "সকাল ৮টা থেকে পড়ছি"-তে present। English-এ সকাল ৮টা আর এখনকে জোড়ার tense লাগে।'),
        'I studied since 8 a.m.': l('"studied" says it is over, but you are still studying.', '"studied" বলে শেষ হয়ে গেছে, কিন্তু তুমি এখনো পড়ছো।'),
        'I have been studying since 8 a.m.': l('Right. Started in the past, still going on, and you feel how long: have been + -ing.', 'ঠিক। অতীতে শুরু, এখনো চলছে, আর সময়ের দৈর্ঘ্যটা টের পাচ্ছো: have been + -ing।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করো'),
      items: [
        { en: 'I have been waiting for an hour.', note: l('still waiting', 'এখনো অপেক্ষা করছি') },
        { en: 'She has been working here since 2019.', note: l('still working here', 'এখনো এখানে কাজ করছে') },
        { en: 'It has been raining all morning — the roads are flooded.', note: l('recent activity, result now', 'সাম্প্রতিক কাজ, ফল এখন') },
        { en: 'Prices have been rising for months.', note: l('an ongoing trend', 'চলমান trend') },
      ],
      question: l('What do these sentences focus on?', 'এই sentence-গুলো কীসের উপর জোর দেয়?'),
      options: [
        l('An activity that started in the past and is still going on (or just stopped)', 'অতীতে শুরু হয়ে এখনো চলা (বা সবে থামা) কাজ'),
        l('A finished result with a number', 'সংখ্যা সহ শেষ হওয়া ফলাফল'),
        l('A future plan', 'ভবিষ্যতের পরিকল্পনা'),
      ],
      answer: 0,
      pattern: l(
        'have / has been + verb-ing = an activity from the past up to now. It answers "How long…?" and often has for / since / all day.',
        'have / has been + verb-ing = অতীত থেকে এখন পর্যন্ত চলা কাজ। এটা "How long…?"-এর উত্তর দেয়, প্রায়ই for / since / all day থাকে।',
      ),
    },
    {
      kind: 'concept',
      title: l('When to use it — and when not to', 'কখন ব্যবহার করবে — আর কখন না'),
      body: l(
        'Use have / has been + verb-ing for an activity that started in the past and is still continuing, or has just stopped with a result you can see. The focus is on the activity and how long it has lasted.',
        'অতীতে শুরু হয়ে এখনো চলছে, বা সবে থেমেছে আর ফল দেখা যাচ্ছে, এমন কাজের জন্য have / has been + verb-ing। জোর থাকে কাজটার উপর আর কতক্ষণ চলছে তার উপর।',
      ),
      points: [
        l('I / you / we / they have been working · he / she / it has been working', 'I / you / we / they have been working · he / she / it has been working'),
        l('How long have you been…? — for two years / since 2022 / all day', 'How long have you been…? — for two years / since 2022 / all day'),
        l('NOT with state verbs: have known, have wanted (not "have been knowing").', 'State verb-এর সাথে না: have known, have wanted ("have been knowing" না)।'),
        l('NOT for how many you finished: "I have written three essays" (not "have been writing three essays").', 'কতগুলো শেষ করেছো তা বোঝাতে না: "I have written three essays" ("have been writing three essays" না)।'),
        l('Why Bangla speakers slip: "ধরে" + present ("পাঁচ বছর ধরে পড়ছি") → "I am studying for five years". English: I have been studying for five years.', 'বাংলাভাষীরা কেন ভুল করে: "ধরে" + present ("পাঁচ বছর ধরে পড়ছি") → "I am studying for five years"। English-এ: I have been studying for five years।'),
      ],
      timeline: [
        { sentence: 'I have been studying since 8 a.m.', picture: 'past-to-now', label: l('Past → now, still going', 'অতীত → এখন, এখনো চলছে') },
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'I’ve been learning English since I was seven.', note: l('Part 1 answer: still learning.', 'Part 1 উত্তর: এখনো শিখছি।') },
        { en: 'My brother has been looking for a job for six months.', note: l('Still looking.', 'এখনো খুঁজছে।') },
        { en: 'Why are your hands dirty? — I’ve been fixing my bike.', note: l('Just stopped; the result is visible.', 'সবে থেমেছে; ফল দেখা যাচ্ছে।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'How long have you been studying English? — I’ve been studying it for about ten years.', note: l('Part 1: answer "How long have you been…?" in the same tense.', 'Part 1: "How long have you been…?"-এর উত্তর একই tense-এ।') },
        { skill: 'writing', example: 'Governments have been investing heavily in renewable energy over the past decade.', note: l('Task 2: an effort that is still continuing.', 'Task 2: এখনো চলতে থাকা একটা চেষ্টা।') },
        { skill: 'reading', example: 'Scientists have been monitoring the glacier since 1990.', note: l('Still monitoring: a statement saying the study ended would be FALSE.', 'এখনো monitor করছে: গবেষণা শেষ বললে statement FALSE।') },
        { skill: 'listening', example: 'I’ve been waiting since nine, and nobody has called my name.', note: l('Part 1: the speaker is still waiting.', 'Part 1: বক্তা এখনো অপেক্ষা করছেন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I am studying English for five years.', right: 'I have been studying English for five years.', why: l('for / since + until now → have been + -ing.', 'for / since + এখন পর্যন্ত → have been + -ing।') },
        { wrong: 'I have been knowing him since school.', right: 'I have known him since school.', why: l('State verbs stay simple.', 'State verb simple থাকে।') },
        { wrong: 'She has been work here since 2021.', right: 'She has been working here since 2021.', why: l('been + -ing.', 'been + -ing।') },
        { wrong: 'I have been writing three essays this week.', right: 'I have written three essays this week.', why: l('A finished number → present perfect simple.', 'শেষ হওয়া সংখ্যা → present perfect simple।') },
      ],
    },
    { kind: 'practice', mode: 'practice', title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'), exercises: ppcPractice },
    { kind: 'practice', mode: 'recall', title: l('Active recall: no options', 'Active recall: কোনো option নেই'), exercises: ppcRecall },
    { kind: 'practice', title: l('Mini challenge', 'Mini challenge'), exercises: ppcChallenge },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: how long have you been…?', 'এবার তোমার পালা: কতদিন ধরে…?'),
      exercises: [
        {
          id: 't-13-y1', type: 'write', tag: 'tense', concept: 'present-perfect-continuous',
          prompt: l('Speaking Part 1: "How long have you been learning English, and what have you been doing to improve?" Answer in 2 sentences.', 'Speaking Part 1: "How long have you been learning English, and what have you been doing to improve?" ২টা sentence-এ উত্তর দাও।'),
          model: 'I’ve been learning English since I was in class three, so about twelve years. Recently I’ve been watching English news every night to improve my listening.',
          checklist: [l('have/has been + verb-ing', 'have/has been + verb-ing'), l('for or since used correctly', 'for বা since ঠিকভাবে'), l('No -ing with know / want / like', 'know / want / like-এ -ing না')],
          explanation: l('Answer "How long have you been…?" with the same tense + for / since.', '"How long have you been…?"-এর উত্তর একই tense + for / since দিয়ে।'),
          mino: {
            task: 'The student answers "How long have you been learning English, and what have you been doing to improve?". Check the present perfect continuous: have/has been + verb-ing (not "am learning for", not "have been learn"), for + period vs since + point, no continuous with state verbs (know, want, like), and present perfect simple for finished numbers. If the student writes "I am learning English for 10 years", explain that "for 10 years" joins the past to now, so English needs "have been learning".',
            target: l('have / has been + verb-ing · for / since', 'have / has been + verb-ing · for / since'),
          },
        },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('have / has been + -ing = from the past up to now, still going.', 'have / has been + -ing = অতীত থেকে এখন পর্যন্ত, এখনো চলছে।'),
        l('"I am studying for five years" ✗ → "I have been studying for five years" ✓', '"I am studying for five years" ✗ → "I have been studying for five years" ✓'),
        l('State verbs and finished numbers → present perfect simple.', 'State verb আর শেষ হওয়া সংখ্যা → present perfect simple।'),
      ],
    },
  ],
};

// ======================================================================= 14
const cmpPractice: Exercise[] = [
  {
    id: 't-14-p1', type: 'choice', tag: 'tense', concept: 'present-simple', pattern: 'simple-vs-continuous',
    prompt: l('Choose the sentence that fits: this is her permanent job.', 'যেটা মেলে বাছো: এটা তার স্থায়ী চাকরি।'),
    options: ['My sister teaches at a school in Bogura.', 'My sister is teaching at a school in Bogura.'], answer: 'My sister teaches at a school in Bogura.',
    explanation: l('Permanent → present simple. "is teaching" would mean only for now.', 'স্থায়ী → present simple। "is teaching" মানে শুধু এখনকার জন্য।'),
    why: { 'My sister is teaching at a school in Bogura.': l('Correct English, but it means a temporary job ("this term").', 'English ঠিক, কিন্তু অর্থ সাময়িক চাকরি ("this term")।') },
  },
  {
    id: 't-14-p2', type: 'choice', tag: 'tense', concept: 'past-simple', pattern: 'past-vs-perfect',
    prompt: l('Choose the correct sentence.', 'সঠিক sentence বাছো।'),
    options: ['I have lost my phone last week.', 'I lost my phone last week.'], answer: 'I lost my phone last week.',
    explanation: l('"last week" = finished → past simple. (Without a time, "I have lost my phone" = I still don’t have it.)', '"last week" = শেষ → past simple। (সময় ছাড়া "I have lost my phone" = এখনো পাইনি।)'),
    why: { 'I have lost my phone last week.': l('A finished time cannot go with the present perfect.', 'শেষ হওয়া সময় present perfect-এর সাথে যায় না।') },
  },
  {
    id: 't-14-p3', type: 'choice', tag: 'tense', concept: 'past-continuous',
    prompt: l('Which sentence means the power cut interrupted your study?', 'কোন sentence মানে বিদ্যুৎ চলে যাওয়ায় পড়া বাধা পেল?'),
    options: ['I was studying when the power went off.', 'I studied when the power went off.'], answer: 'I was studying when the power went off.',
    explanation: l('was studying = already in progress; went off = the interruption.', 'was studying = আগে থেকে চলছিল; went off = বাধা।'),
    why: { 'I studied when the power went off.': l('This suggests you started studying after the power went off.', 'এতে মনে হয় বিদ্যুৎ যাওয়ার পরে পড়া শুরু করেছো।') },
  },
  {
    id: 't-14-p4', type: 'choice', tag: 'tense', concept: 'present-perfect-continuous',
    prompt: l('Which answers "How long?"', 'কোনটা "How long?"-এর উত্তর?'),
    options: ['I have been reading this book for two weeks.', 'I have read this book twice.'], answer: 'I have been reading this book for two weeks.',
    explanation: l('How long (activity) → have been + -ing. How many times (result) → have read.', 'কতক্ষণ (কাজ) → have been + -ing। কতবার (ফলাফল) → have read।'),
  },
  {
    id: 't-14-p5', type: 'choice', tag: 'tense', concept: 'past-perfect',
    prompt: l('Which sentence shows that the bus left first?', 'কোন sentence দেখায় যে bus আগে ছেড়েছিল?'),
    options: ['When I got to the stop, the bus had left.', 'When I got to the stop, the bus left.'], answer: 'When I got to the stop, the bus had left.',
    explanation: l('had left = before I got there.', 'had left = আমি পৌঁছানোর আগে।'),
  },
  {
    id: 't-14-p6', type: 'choice', tag: 'tense', concept: 'future',
    prompt: l('You bought the tickets last month. What do you say?', 'তুমি গত মাসে টিকিট কিনেছো। কী বলবে?'),
    options: ['I’m going to Kolkata next Friday.', 'I’ll go to Kolkata next Friday, I think.'], answer: 'I’m going to Kolkata next Friday.',
    explanation: l('A fixed arrangement (tickets bought) → present continuous. "I’ll … I think" sounds like a quick decision.', 'ঠিক হয়ে যাওয়া arrangement (টিকিট কেনা) → present continuous। "I’ll … I think" শুনলে হঠাৎ সিদ্ধান্ত মনে হয়।'),
  },
];

const cmpRecall: Exercise[] = [
  {
    id: 't-14-r1', type: 'gap', tag: 'tense', concept: 'present-perfect', pattern: 'past-vs-perfect',
    prompt: l('Write the correct form of "be". (You still live in Rajshahi.)', '"be"-এর সঠিক form লেখো। (তুমি এখনো Rajshahi-তে থাকো।)'),
    sentence: 'I ___ in Rajshahi for three years now.',
    accepted: ['have been', "'ve been"],
    explanation: l('Still true now, with "for … now" → have been.', 'এখনো সত্য, "for … now" সহ → have been।'),
    why: { was: l('"was" means it is over, but you still live there.', '"was" মানে শেষ, কিন্তু তুমি এখনো সেখানে থাকো।'), am: l('"am … for three years" misses the link from the past to now.', '"am … for three years"-এ অতীত থেকে এখনের যোগটা নেই।') },
  },
  {
    id: 't-14-r2', type: 'gap', tag: 'tense', concept: 'past-simple', pattern: 'past-vs-perfect',
    prompt: l('Write the correct form of "start".', '"start"-এর সঠিক form লেখো।'),
    sentence: 'I ___ university in 2022.',
    accepted: ['started'],
    explanation: l('"in 2022" = finished → started.', '"in 2022" = শেষ → started।'),
    why: { 'have started': l('A finished year → past simple.', 'শেষ হওয়া বছর → past simple।') },
  },
  {
    id: 't-14-r3', type: 'correct', tag: 'tense', concept: 'present-simple', pattern: 'simple-vs-continuous',
    prompt: l('Fix the sentence (it is a daily habit).', 'Sentence-টা ঠিক করো (এটা প্রতিদিনের অভ্যাস)।'),
    sentence: 'I am going to the gym every morning.',
    accepted: ['I go to the gym every morning.'],
    explanation: l('"every morning" = a habit → present simple.', '"every morning" = অভ্যাস → present simple।'),
  },
  {
    id: 't-14-r4', type: 'correct', tag: 'tense', concept: 'past-perfect',
    prompt: l('Fix the sentence (the film started first).', 'Sentence-টা ঠিক করো (film আগে শুরু হয়েছিল)।'),
    sentence: 'When we arrived, the film has already started.',
    accepted: ['When we arrived, the film had already started.'],
    explanation: l('Earlier past → had already started.', 'আরও আগের অতীত → had already started।'),
  },
];

const cmpChallenge: Exercise[] = [
  {
    id: 't-14-c1', type: 'choice', tag: 'tense', concept: 'present-perfect', pattern: 'past-vs-perfect',
    prompt: l('"She has been to Japan." vs "She has gone to Japan." Where is she now?', '"She has been to Japan." আর "She has gone to Japan." সে এখন কোথায়?'),
    options: ['"been": back home · "gone": still in Japan (or on the way)', 'Both: in Japan', 'Both: back home'],
    answer: '"been": back home · "gone": still in Japan (or on the way)',
    explanation: l('have been to = visited and came back; have gone to = is there now.', 'have been to = গিয়ে ফিরে এসেছে; have gone to = এখন সেখানে।'),
  },
  {
    id: 't-14-c2', type: 'choice', tag: 'tense', concept: 'past-simple',
    prompt: l('Task 1 (data 1990–2020). Which pair is correct?', 'Task 1 (data 1990–2020)। কোন জোড়াটা ঠিক?'),
    options: ['The chart shows… / Numbers rose between 1990 and 2020.', 'The chart showed… / Numbers have risen between 1990 and 2020.', 'The chart shows… / Numbers rise between 1990 and 2020.'],
    answer: 'The chart shows… / Numbers rose between 1990 and 2020.',
    explanation: l('Introduction in the present; finished period in the past simple.', 'Introduction present-এ; শেষ হওয়া সময় past simple-এ।'),
  },
  {
    id: 't-14-c3', type: 'spot', tag: 'tense', concept: 'present-simple', pattern: 'simple-vs-continuous',
    prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করো।'),
    words: ['Water', 'is', 'boiling', 'at', '100', 'degrees', 'Celsius.'], wrong: 2,
    accepted: ['boils'], fixOptions: ['boils', 'boiled', 'boil'],
    explanation: l('A scientific fact → present simple: Water boils…', 'বৈজ্ঞানিক সত্য → present simple: Water boils…'),
  },
];

export const tenseComparisons: Lesson = {
  id: 't-14',
  format: 'v2',
  title: l('Tense Comparisons', 'Tense-এর তুলনা'),
  why: l('Most tense mistakes are not about forms but about choosing between two close tenses. Here you choose by meaning.', 'বেশিরভাগ tense-এর ভুল form-এ না, কাছাকাছি দুটো tense-এর মধ্যে বাছাইয়ে। এখানে তুমি অর্থ দেখে বাছবে।'),
  minutes: 13,
  difficulty: 'hard',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Two true sentences', 'দুটো সত্যি sentence'),
      situation: l('Rafi says "I have lived in Khulna for five years." Nila says "I lived in Khulna for five years."', 'Rafi বলে "I have lived in Khulna for five years." Nila বলে "I lived in Khulna for five years."'),
      question: l('Who lives in Khulna now?', 'এখন কে Khulna-য় থাকে?'),
      options: ['Rafi', 'Nila', 'Both'],
      answer: 'Rafi',
      diagnose: {
        Rafi: l('Right. Present perfect = the five years continue until now. Nila’s past simple = the five years are over.', 'ঠিক। Present perfect = পাঁচ বছর এখন পর্যন্ত চলছে। Nila-র past simple = পাঁচ বছর শেষ।'),
        Nila: l('Nila’s past simple closes the time: she lived there before, not now.', 'Nila-র past simple সময়টা বন্ধ করে দেয়: আগে থাকতো, এখন না।'),
        Both: l('The two sentences mean different things. Only the present perfect reaches now.', 'দুটো sentence-এর অর্থ আলাদা। শুধু present perfect এখন পর্যন্ত পৌঁছায়।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করো'),
      items: [
        { en: 'I work in a bank. / I’m working in a bank this summer.', note: l('permanent / temporary', 'স্থায়ী / সাময়িক') },
        { en: 'I visited Sylhet in 2022. / I have visited Sylhet twice.', note: l('finished time / experience', 'শেষ হওয়া সময় / অভিজ্ঞতা') },
        { en: 'I was reading when she called. / I read the letter when she called.', note: l('in progress / next event', 'চলছিল / পরের ঘটনা') },
        { en: 'I have read the book. / I have been reading the book.', note: l('result / activity', 'ফলাফল / কাজ') },
      ],
      question: l('How do you choose between the two sentences in each pair?', 'প্রতিটা জোড়ায় দুটো sentence-এর মধ্যে কীভাবে বাছবে?'),
      options: [
        l('By meaning: is it finished, still going, temporary, first or later?', 'অর্থ দেখে: শেষ, এখনো চলছে, সাময়িক, আগে নাকি পরে?'),
        l('By which one sounds more formal', 'কোনটা বেশি formal শোনায় তা দেখে'),
        l('They always mean the same', 'সবসময় একই অর্থ'),
      ],
      answer: 0,
      pattern: l(
        'Both sentences in each pair are correct English, but they say different things. Ask about the meaning, and the tense follows.',
        'প্রতিটা জোড়ার দুটো sentence-ই ঠিক English, কিন্তু আলাদা কথা বলে। অর্থ নিয়ে প্রশ্ন করো, tense নিজেই চলে আসবে।',
      ),
    },
    {
      kind: 'concept',
      title: l('Five questions instead of formulas', 'Formula-র বদলে পাঁচটা প্রশ্ন'),
      body: l(
        'When two tenses seem possible, ask a meaning question. Always or right now? (present simple / continuous) Finished time or linked to now? (past simple / present perfect) Background or next event? (past continuous / past simple) Result or activity? (present perfect / present perfect continuous) Which came first? (past perfect / past simple). For the future: prediction, plan or fixed arrangement?',
        'দুটো tense সম্ভব মনে হলে অর্থের প্রশ্ন করো। সবসময় নাকি এখনই? (present simple / continuous) শেষ হওয়া সময় নাকি এখনের সাথে যুক্ত? (past simple / present perfect) পটভূমি নাকি পরের ঘটনা? (past continuous / past simple) ফলাফল নাকি কাজ? (present perfect / present perfect continuous) কোনটা আগে? (past perfect / past simple)। ভবিষ্যতের জন্য: ভবিষ্যদ্বাণী, পরিকল্পনা নাকি ঠিক হওয়া arrangement?',
      ),
      points: [
        l('Always / habit → I go · right now / temporary → I’m going', 'সবসময় / অভ্যাস → I go · এই মুহূর্তে / সাময়িক → I’m going'),
        l('Finished time → I went · up to now / experience → I have been', 'শেষ হওয়া সময় → I went · এখন পর্যন্ত / অভিজ্ঞতা → I have been'),
        l('How many (result) → I have written · how long (activity) → I have been writing', 'কতগুলো (ফল) → I have written · কতক্ষণ (কাজ) → I have been writing'),
        l('NOT every question needs a special tense: if nothing is out of order, the past simple is enough.', 'প্রতিটা প্রশ্নে বিশেষ tense লাগে না: কিছু ক্রমের বাইরে না হলে past simple-ই যথেষ্ট।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Pairs in real life', 'বাস্তব জীবনের জোড়া'),
      items: [
        { en: 'He lives with his parents. / He’s living with his parents until he finds a flat.', note: l('permanent / temporary', 'স্থায়ী / সাময়িক') },
        { en: 'I’ve lost my keys. (I still can’t find them) / I lost my keys yesterday.', note: l('result now / finished time', 'এখনকার ফল / শেষ হওয়া সময়') },
        { en: 'By 2010, sales had doubled. / In 2010, sales doubled.', note: l('before 2010 / during 2010', '2010-এর আগে / 2010-এর মধ্যে') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where the choice matters in IELTS', 'IELTS-এ কোথায় বাছাই গুরুত্বপূর্ণ'),
      uses: [
        { skill: 'writing', example: 'Car use rose sharply in the 1990s and has continued to grow since then.', note: l('Task 1/2: past simple for the finished decade, present perfect for since then.', 'Task 1/2: শেষ হওয়া দশকে past simple, since then-এ present perfect।') },
        { skill: 'speaking', example: 'I’ve been to Nepal once — I went there with my school in 2019.', note: l('Experience (present perfect) + detail (past simple).', 'অভিজ্ঞতা (present perfect) + বিস্তারিত (past simple)।') },
        { skill: 'reading', example: 'The town had depended on fishing until the factory opened.', note: l('had depended = before the factory; a key detail for T/F/NG.', 'had depended = factory-র আগে; T/F/NG-তে গুরুত্বপূর্ণ বিস্তারিত।') },
        { skill: 'listening', example: 'I was going to take the bus, but I’m driving instead.', note: l('The old plan (was going to) is not the answer; the new one is.', 'পুরনো পরিকল্পনা (was going to) উত্তর না; নতুনটা উত্তর।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I have lost my phone last week.', right: 'I lost my phone last week.', why: l('Finished time → past simple.', 'শেষ হওয়া সময় → past simple।') },
        { wrong: 'I am going to the gym every morning.', right: 'I go to the gym every morning.', why: l('Habit → present simple.', 'অভ্যাস → present simple।') },
        { wrong: 'When we arrived, the film has already started.', right: 'When we arrived, the film had already started.', why: l('Earlier past → had.', 'আরও আগের অতীত → had।') },
        { wrong: 'Water is boiling at 100 °C.', right: 'Water boils at 100 °C.', why: l('Fact → present simple.', 'সত্য → present simple।') },
      ],
    },
    { kind: 'practice', mode: 'practice', title: l('Practice: choose by meaning', 'Practice: অর্থ দেখে বাছো'), exercises: cmpPractice },
    { kind: 'practice', mode: 'recall', title: l('Active recall: no options', 'Active recall: কোনো option নেই'), exercises: cmpRecall },
    { kind: 'practice', title: l('Mini challenge', 'Mini challenge'), exercises: cmpChallenge },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: one pair about you', 'এবার তোমার পালা: তোমাকে নিয়ে একটা জোড়া'),
      exercises: [
        {
          id: 't-14-y1', type: 'write', tag: 'tense', concept: 'present-perfect',
          prompt: l('Write two true sentences about yourself that show the difference: one with the present perfect (experience or up to now) and one with the past simple (a finished time).', 'নিজেকে নিয়ে দুটো সত্যি sentence লেখো যা পার্থক্যটা দেখায়: একটা present perfect-এ (অভিজ্ঞতা বা এখন পর্যন্ত), একটা past simple-এ (শেষ হওয়া সময়)।'),
          model: 'I have been to Cox’s Bazar three times. I went there last with my friends in 2023.',
          checklist: [l('Present perfect with no finished time', 'শেষ হওয়া সময় ছাড়া present perfect'), l('Past simple with a finished time', 'শেষ হওয়া সময়ের সাথে past simple')],
          explanation: l('Experience (present perfect) + detail with a time (past simple): the most useful pair in Speaking.', 'অভিজ্ঞতা (present perfect) + সময়সহ বিস্তারিত (past simple): Speaking-এর সবচেয়ে কাজের জোড়া।'),
          mino: {
            task: 'The student writes two true sentences: one in the present perfect (experience or a situation up to now, no finished time) and one in the past simple (with a finished time). Check that each tense matches its meaning and time words, and the verb forms (have been / have visited, went / visited). If a finished time appears with the present perfect, explain with the student’s own time word why Past Simple is needed.',
            target: l('Present perfect (experience) + past simple (finished time)', 'Present perfect (অভিজ্ঞতা) + past simple (শেষ হওয়া সময়)'),
          },
        },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Choose by meaning: finished? still going? temporary? first?', 'অর্থ দেখে বাছো: শেষ? এখনো চলছে? সাময়িক? আগে?'),
        l('have been to (came back) · have gone to (still there)', 'have been to (ফিরে এসেছে) · have gone to (এখনো সেখানে)'),
        l('Result → have done · activity → have been doing', 'ফলাফল → have done · কাজ → have been doing'),
      ],
    },
  ],
};

// ======================================================================= 15
const mixPractice: Exercise[] = [
  {
    id: 't-15-p1', type: 'choice', tag: 'tense', concept: 'past-continuous',
    prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
    sentence: 'While my mother ___ dinner, the guests arrived.',
    options: ['cooked', 'was cooking', 'has cooked'], answer: 'was cooking',
    explanation: l('"While" + an action in progress when something else happened → was cooking.', '"While" + অন্য কিছু ঘটার সময় চলা কাজ → was cooking।'),
  },
  {
    id: 't-15-p2', type: 'choice', tag: 'tense', concept: 'present-perfect', pattern: 'past-vs-perfect',
    prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
    sentence: 'The number of cyclists in the city ___ since the new lanes opened.',
    options: ['doubled', 'has doubled', 'doubles'], answer: 'has doubled',
    explanation: l('"since …" joins the past to now → has doubled.', '"since …" অতীত আর এখনকে জোড়ে → has doubled।'),
  },
  {
    id: 't-15-p3', type: 'choice', tag: 'tense', concept: 'future',
    prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
    sentence: 'Experts say the population ___ 200 million by 2045.',
    options: ['reached', 'is expected to reach', 'has reached'], answer: 'is expected to reach',
    explanation: l('"by 2045" is in the future → a projection.', '"by 2045" ভবিষ্যতে → projection।'),
  },
  {
    id: 't-15-p4', type: 'choice', tag: 'tense', concept: 'present-simple', pattern: 'simple-vs-continuous',
    prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
    sentence: 'In my family, my father usually ___ the grocery shopping on Fridays.',
    options: ['does', 'is doing', 'did'], answer: 'does',
    explanation: l('"usually … on Fridays" = a habit → does.', '"usually … on Fridays" = অভ্যাস → does।'),
  },
  {
    id: 't-15-p5', type: 'choice', tag: 'tense', concept: 'past-perfect',
    prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
    sentence: 'By the time the ambulance arrived, the neighbours ___ the fire.',
    options: ['put out', 'had put out', 'have put out'], answer: 'had put out',
    explanation: l('Earlier than a past event ("by the time … arrived") → had put out.', 'অতীতের একটা ঘটনার আগে ("by the time … arrived") → had put out।'),
  },
  {
    id: 't-15-p6', type: 'choice', tag: 'tense', concept: 'present-continuous', pattern: 'simple-vs-continuous',
    prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
    sentence: 'Can you call back later? I ___ a class right now.',
    options: ['take', 'am taking', 'took'], answer: 'am taking',
    explanation: l('"right now" → am taking.', '"right now" → am taking।'),
  },
];

const mixRecall: Exercise[] = [
  {
    id: 't-15-r1', type: 'gap', tag: 'tense', concept: 'past-simple', pattern: 'tense-time',
    prompt: l('Write the correct form of "open".', '"open"-এর সঠিক form লেখো।'),
    sentence: 'The Padma Bridge ___ to traffic in 2022.',
    accepted: ['opened'],
    explanation: l('"in 2022" = finished → opened.', '"in 2022" = শেষ → opened।'),
    why: { 'has opened': l('"in 2022" is a finished time → past simple.', '"in 2022" শেষ হওয়া সময় → past simple।'), opens: l('"in 2022" is in the past.', '"in 2022" অতীতে।') },
  },
  {
    id: 't-15-r2', type: 'gap', tag: 'tense', concept: 'present-perfect-continuous', pattern: 'tense-time',
    prompt: l('Write the correct form of "learn".', '"learn"-এর সঠিক form লেখো।'),
    sentence: 'She ___ Japanese for two years and hopes to work in Tokyo.',
    accepted: ['has been learning', "'s been learning", 'has learned', 'has learnt'],
    explanation: l('"for two years" and still going on → has been learning.', '"for two years" আর এখনো চলছে → has been learning।'),
    why: { 'is learning': l('"for two years" joins the past to now → has been learning.', '"for two years" অতীত আর এখনকে জোড়ে → has been learning।'), learned: l('She still learns (she hopes to work there) → not finished.', 'সে এখনো শিখছে (সেখানে কাজ করতে চায়) → শেষ হয়নি।') },
  },
  {
    id: 't-15-r3', type: 'gap', tag: 'tense', concept: 'future', pattern: 'tense-time',
    prompt: l('Write the correct form of "finish".', '"finish"-এর সঠিক form লেখো।'),
    sentence: 'I will call you as soon as I ___ my exam.',
    accepted: ['finish'],
    explanation: l('After "as soon as / when / if" about the future → present: finish.', 'ভবিষ্যৎ নিয়ে "as soon as / when / if"-এর পরে → present: finish।'),
    why: { 'will finish': l('No "will" after "as soon as" for the future.', 'ভবিষ্যতের জন্য "as soon as"-এর পরে "will" না।') },
  },
  {
    id: 't-15-r4', type: 'correct', tag: 'tense', concept: 'past-simple', pattern: 'past-vs-perfect',
    prompt: l('Fix the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'Two years ago, the company has opened a new branch in Sylhet.',
    accepted: ['Two years ago, the company opened a new branch in Sylhet.'],
    explanation: l('"ago" = finished → opened.', '"ago" = শেষ → opened।'),
  },
  {
    id: 't-15-r5', type: 'correct', tag: 'tense', concept: 'present-continuous', pattern: 'simple-vs-continuous',
    prompt: l('Fix the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'Look! The children play in the rain.',
    accepted: ['Look! The children are playing in the rain.'],
    explanation: l('"Look!" = right now → are playing.', '"Look!" = এই মুহূর্তে → are playing।'),
  },
];

const mixChallenge: Exercise[] = [
  {
    id: 't-15-c1', type: 'spot', tag: 'tense', concept: 'past-simple', pattern: 'tense-time',
    prompt: l('Task 1: one verb breaks this sentence. Tap it, then fix it.', 'Task 1: একটা verb sentence-টা ভাঙছে। Tap করে ঠিক করো।'),
    words: ['In', '2015,', 'the', 'figure', 'drops', 'to', '12%.'], wrong: 4,
    accepted: ['dropped'], fixOptions: ['dropped', 'has dropped', 'drop'],
    explanation: l('"In 2015" = finished → dropped.', '"In 2015" = শেষ → dropped।'),
  },
  {
    id: 't-15-c2', type: 'correct', tag: 'tense', concept: 'past-continuous',
    prompt: l('Part 2 story: fix the two verbs.', 'Part 2-এর গল্প: দুটো verb ঠিক করো।'),
    sentence: 'I walk home when I see an old friend.',
    accepted: ['I was walking home when I saw an old friend.'],
    explanation: l('Background in progress (was walking) + the event (saw).', 'চলতে থাকা পটভূমি (was walking) + ঘটনা (saw)।'),
  },
  {
    id: 't-15-c3', type: 'choice', tag: 'tense', concept: 'present-perfect',
    prompt: l('Examiner: "Has your neighbourhood changed much?" Best answer?', 'Examiner: "Has your neighbourhood changed much?" সবচেয়ে ভালো উত্তর?'),
    options: ['Yes, it has changed a lot. They built a big shopping mall last year, and now it is always busy.', 'Yes, it changes a lot. They have built a big mall last year.', 'Yes, it is changing a lot last year.'],
    answer: 'Yes, it has changed a lot. They built a big shopping mall last year, and now it is always busy.',
    explanation: l('Change up to now (has changed) + finished detail (built last year) + now (is).', 'এখন পর্যন্ত পরিবর্তন (has changed) + শেষ হওয়া বিস্তারিত (built last year) + এখন (is)।'),
  },
];

export const tensesMixedPractice: Lesson = {
  id: 't-15',
  format: 'v2',
  title: l('Mixed Practice', 'Mixed Practice'),
  why: l('In the real test nobody tells you which tense to use. Here you decide from the context, like in IELTS.', 'আসল পরীক্ষায় কেউ বলে দেয় না কোন tense লাগবে। এখানে তুমি প্রসঙ্গ দেখে ঠিক করবে, IELTS-এর মতোই।'),
  minutes: 13,
  difficulty: 'hard',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Read for time first', 'আগে সময়টা পড়ো'),
      situation: l('A student’s answer: "I (live) in Barishal until 2018. Then my family (move) to Dhaka, and I (live) here since then."', 'একজন student-এর উত্তর: "I (live) in Barishal until 2018. Then my family (move) to Dhaka, and I (live) here since then."'),
      question: l('Which set of verbs is correct?', 'কোন verb-এর সেট ঠিক?'),
      options: ['lived · moved · have lived', 'have lived · moved · lived', 'live · move · live'],
      answer: 'lived · moved · have lived',
      diagnose: {
        'lived · moved · have lived': l('Right: "until 2018" (finished) → lived; "then" (finished event) → moved; "since then" (up to now) → have lived.', 'ঠিক: "until 2018" (শেষ) → lived; "then" (শেষ ঘটনা) → moved; "since then" (এখন পর্যন্ত) → have lived।'),
        'have lived · moved · lived': l('Swapped: "until 2018" is finished (lived) and "since then" reaches now (have lived).', 'উল্টে গেছে: "until 2018" শেষ (lived) আর "since then" এখন পর্যন্ত (have lived)।'),
        'live · move · live': l('The time words tell you the story is in the past and continues to now; the present simple ignores them.', 'Time word বলছে গল্পটা অতীতের আর এখন পর্যন্ত চলছে; present simple এগুলো উপেক্ষা করে।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করো'),
      items: [
        { en: 'until 2018 → lived', note: l('finished', 'শেষ') },
        { en: 'since then → have lived', note: l('up to now', 'এখন পর্যন্ত') },
        { en: 'right now → am taking', note: l('in progress now', 'এখন চলছে') },
        { en: 'by the time it arrived → had put out', note: l('earlier past', 'আরও আগের অতীত') },
      ],
      question: l('What should you find before choosing any verb?', 'যেকোনো verb বাছার আগে কী খুঁজবে?'),
      options: [
        l('The time words and the order of events', 'Time word আর ঘটনার ক্রম'),
        l('The longest word in the sentence', 'Sentence-এর সবচেয়ে লম্বা শব্দ'),
        l('Whether the subject is a person', 'Subject মানুষ কিনা'),
      ],
      answer: 0,
      pattern: l(
        'Read the whole sentence for time first: time words (since, ago, by, right now, usually) and the order of events. Then choose the tense, then the form.',
        'আগে পুরো sentence পড়ে সময়টা বোঝো: time word (since, ago, by, right now, usually) আর ঘটনার ক্রম। তারপর tense বাছো, তারপর form।',
      ),
    },
    {
      kind: 'concept',
      title: l('A three-step routine', 'তিন ধাপের রুটিন'),
      body: l(
        'For every gap: 1) Find the time (time words, the rest of the sentence, the story’s order). 2) Choose the tense by meaning (finished? now? habit? up to now? earlier? future?). 3) Build the form for the subject (he goes, has risen, were waiting, will reach).',
        'প্রতিটা gap-এর জন্য: ১) সময় খোঁজো (time word, বাকি sentence, গল্পের ক্রম)। ২) অর্থ দেখে tense বাছো (শেষ? এখন? অভ্যাস? এখন পর্যন্ত? আগে? ভবিষ্যৎ?)। ৩) Subject অনুযায়ী form বানাও (he goes, has risen, were waiting, will reach)।',
      ),
      points: [
        l('No time word? Look at the other verbs and the situation.', 'Time word নেই? অন্য verb আর পরিস্থিতি দেখো।'),
        l('In a text, keep the same time frame until the time changes.', 'লেখায় সময় না বদলানো পর্যন্ত একই time frame রাখো।'),
        l('NOT the tense that sounds "advanced": the one the time needs.', '"Advanced" শোনায় এমন tense না: সময় যেটা চায় সেটা।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Context decides', 'প্রসঙ্গ ঠিক করে'),
      items: [
        { en: 'The Padma Bridge opened in 2022, and travel times have fallen since then.', note: l('2022 → opened · since then → have fallen', '2022 → opened · since then → have fallen') },
        { en: 'I usually study in the library, but this week I’m studying at home.', note: l('habit → study · this week → am studying', 'অভ্যাস → study · this week → am studying') },
        { en: 'When I got home, my brother had already eaten, so I ate alone.', note: l('earlier → had eaten · then → ate', 'আগে → had eaten · তারপর → ate') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Sales fell in 2019, but they have recovered and are expected to double by 2030.', note: l('One Task 1 sentence, three times: past, up to now, future.', 'এক Task 1 sentence-এ তিন সময়: অতীত, এখন পর্যন্ত, ভবিষ্যৎ।') },
        { skill: 'speaking', example: 'I grew up in a village, I’ve lived in the city for five years, and next year I’m moving abroad.', note: l('Part 2/3: moving between times naturally shows range.', 'Part 2/3: স্বাভাবিকভাবে সময় বদলানো range দেখায়।') },
        { skill: 'reading', example: 'The lake had dried up by 1990, but it has been refilled since 2005.', note: l('Time words build the timeline you need for the questions.', 'Time word দিয়েই প্রশ্নের জন্য দরকারি timeline তৈরি হয়।') },
        { skill: 'listening', example: 'The talk was at 3, but it’s been moved to 4.', note: l('Catch the change: the present tense gives the current answer.', 'পরিবর্তনটা ধরো: present tense-ই এখনকার উত্তর।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Two years ago, the company has opened a branch.', right: 'Two years ago, the company opened a branch.', why: l('ago → past simple.', 'ago → past simple।') },
        { wrong: 'I will call you when I will finish.', right: 'I will call you when I finish.', why: l('when + present for the future.', 'ভবিষ্যৎ বোঝাতে when + present।') },
        { wrong: 'In 2015, the figure drops to 12%.', right: 'In 2015, the figure dropped to 12%.', why: l('Finished year → past.', 'শেষ হওয়া বছর → past।') },
      ],
    },
    { kind: 'practice', mode: 'practice', title: l('Practice: decide from context', 'Practice: প্রসঙ্গ দেখে ঠিক করো'), exercises: mixPractice },
    { kind: 'practice', mode: 'recall', title: l('Active recall: write the form', 'Active recall: form লেখো'), exercises: mixRecall },
    { kind: 'practice', title: l('Mini challenge', 'Mini challenge'), exercises: mixChallenge },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your story in three times', 'এবার তোমার পালা: তিন সময়ে তোমার গল্প'),
      exercises: [
        {
          id: 't-15-y1', type: 'write', tag: 'tense', concept: 'past-simple',
          prompt: l('Speaking Part 2 style: "Describe a place you have lived." Write 3–4 sentences: when you moved there, how long you have lived there, what you are doing there these days, and one plan.', 'Speaking Part 2 ধাঁচে: "Describe a place you have lived." ৩–৪টা sentence লেখো: কবে সেখানে গিয়েছো, কতদিন ধরে থাকছো, আজকাল সেখানে কী করছো, আর একটা পরিকল্পনা।'),
          model: 'My family moved to Mirpur in 2015. We have lived there for almost ten years. These days I am preparing for IELTS at a centre near my home. Next year, I am going to study in Malaysia.',
          checklist: [l('Past simple with a finished time', 'শেষ হওয়া সময়ের সাথে past simple'), l('Present perfect with for / since', 'for / since সহ present perfect'), l('Present continuous for these days', 'আজকালের জন্য present continuous'), l('A future form for the plan', 'পরিকল্পনার জন্য future form')],
          explanation: l('Four times, four tenses — each chosen by the time, not by habit.', 'চার সময়, চার tense — প্রতিটা সময় দেখে বাছা, অভ্যাস দেখে না।'),
          mino: {
            task: 'The student describes a place they have lived, in 3–4 sentences covering: when they moved (past simple), how long (present perfect / present perfect continuous with for/since), what they are doing these days (present continuous) and a plan (going to / will / present continuous). Check each verb’s tense against its time words and meaning, and its form (moved, have lived, am preparing, am going to study). For each tense error, name the time word or meaning in the student’s own sentence that decides the correct tense, and separate tense-choice errors from verb-form errors.',
            target: l('Past · up to now · these days · future', 'অতীত · এখন পর্যন্ত · আজকাল · ভবিষ্যৎ'),
          },
        },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Find the time → choose the tense → build the form.', 'সময় খোঁজো → tense বাছো → form বানাও।'),
        l('Keep one time frame until the time changes.', 'সময় না বদলানো পর্যন্ত এক time frame রাখো।'),
        l('when / if / as soon as + present for the future.', 'ভবিষ্যৎ বোঝাতে when / if / as soon as + present।'),
      ],
    },
  ],
};


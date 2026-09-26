import type { Exercise, Lesson } from '../model';
import { l } from './pos-kit';

/**
 * Tenses for IELTS, application lessons in the v2 format: t-9 Common tense
 * mistakes, t-10 Tenses in Writing, t-11 Tenses in Speaking. They teach no new
 * tense, so the lesson has no single concept: each question keeps the concept it
 * really practises (past-simple, present-perfect…), and the personal sentences
 * checked by Mino count as application for those concepts. Original Vocab Brain content.
 */

// ======================================================================= 9
const cmPractice: Exercise[] = [
  {
    id: 't-9-e5', type: 'choice', tag: 'tense', concept: 'past-simple', pattern: 'past-vs-perfect',
    prompt: l('Choose the correct Task 1 sentence.', 'সঠিক Task 1 sentence বাছো।'),
    options: ['In 1990, the figure is 20%, and in 2000 it rises to 35%.', 'In 1990, the figure was 20%, and in 2000 it rose to 35%.', 'In 1990, the figure was 20%, and in 2000 it has risen to 35%.'],
    answer: 'In 1990, the figure was 20%, and in 2000 it rose to 35%.',
    explanation: l('Both years are finished → past simple in both parts.', 'দুই বছরই শেষ → দুই অংশেই past simple।'),
    why: { 'In 1990, the figure is 20%, and in 2000 it rises to 35%.': l('Past years need past tenses.', 'অতীতের বছরে past tense লাগে।'), 'In 1990, the figure was 20%, and in 2000 it has risen to 35%.': l('"in 2000" is finished → not present perfect.', '"in 2000" শেষ → present perfect না।') },
  },
  {
    id: 't-9-p1', type: 'choice', tag: 'agreement', concept: 'present-simple', pattern: 'sv-agreement',
    prompt: l('Choose the correct sentence.', 'সঠিক sentence বাছো।'),
    options: ['My father work in a garment factory.', 'My father works in a garment factory.', 'My father working in a garment factory.'],
    answer: 'My father works in a garment factory.',
    explanation: l('"My father" = he → works.', '"My father" = he → works।'),
    why: { 'My father work in a garment factory.': l('he / she / it → verb + s.', 'he / she / it → verb + s।'), 'My father working in a garment factory.': l('-ing alone is not a verb; and a permanent job needs the present simple.', 'শুধু -ing verb না; আর স্থায়ী চাকরিতে present simple লাগে।') },
  },
  {
    id: 't-9-p2', type: 'choice', tag: 'tense', concept: 'past-simple', pattern: 'verb-form',
    prompt: l('Which past form is correct?', 'কোন past form ঠিক?'),
    sentence: 'Exports ___ sharply after the new trade deal.',
    options: ['growed', 'grew', 'grown'], answer: 'grew',
    explanation: l('grow → grew → grown. Past simple: grew.', 'grow → grew → grown। Past simple: grew।'),
    why: { growed: l('"grow" is irregular: grew.', '"grow" irregular: grew।'), grown: l('"grown" needs have/had before it.', '"grown"-এর আগে have/had লাগে।') },
  },
  {
    id: 't-9-p3', type: 'choice', tag: 'tense', concept: 'present-perfect', pattern: 'tense-time',
    prompt: l('Keep the time frame. Choose the correct second half.', 'Time frame ঠিক রাখো। সঠিক দ্বিতীয় অংশ বাছো।'),
    sentence: 'The city built its first metro line in 2022, and since then traffic ___.',
    options: ['has improved', 'improved', 'improves'], answer: 'has improved',
    explanation: l('The time changes: "in 2022" (past simple) → "since then" (present perfect).', 'সময় বদলেছে: "in 2022" (past simple) → "since then" (present perfect)।'),
    why: { improved: l('"since then" connects to now → has improved.', '"since then" এখনের সাথে যুক্ত → has improved।'), improves: l('Present simple loses the link from 2022 to now.', 'Present simple-এ 2022 থেকে এখনের যোগটা হারিয়ে যায়।') },
  },
];

const cmRecall: Exercise[] = [
  {
    id: 't-9-e1', type: 'correct', tag: 'tense', concept: 'past-simple', pattern: 'past-vs-perfect',
    prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'The number of tourists has increased in 2012.',
    accepted: ['The number of tourists increased in 2012.'],
    explanation: l('"in 2012" is finished → past simple.', '"in 2012" শেষ → past simple।'),
  },
  {
    id: 't-9-e2', type: 'correct', tag: 'tense', concept: 'past-simple', pattern: 'verb-form',
    prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'Car sales rised sharply in 2018.',
    accepted: ['Car sales rose sharply in 2018.', 'Car sales increased sharply in 2018.'],
    explanation: l('rise → rose (irregular).', 'rise → rose (irregular)।'),
  },
  {
    id: 't-9-e3', type: 'correct', tag: 'agreement', concept: 'present-simple', pattern: 'sv-agreement',
    prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'The government spend a lot on education.',
    accepted: ['The government spends a lot on education.'],
    explanation: l('"The government" is singular → "spends".', '"The government" singular → "spends"।'),
  },
  {
    id: 't-9-e4', type: 'correct', tag: 'tense', concept: 'present-continuous', pattern: 'verb-form',
    prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'These days more people using mobile banking.',
    accepted: ['These days more people are using mobile banking.', 'These days, more people are using mobile banking.'],
    explanation: l('-ing needs "are": "are using".', '-ing-এর সাথে "are" লাগে: "are using"।'),
  },
  {
    id: 't-9-e6', type: 'correct', tag: 'tense', concept: 'present-perfect', pattern: 'past-vs-perfect',
    prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'I am living in Chattogram since 2020.',
    accepted: ['I have lived in Chattogram since 2020.', 'I have been living in Chattogram since 2020.'],
    explanation: l('"since 2020" → present perfect: "I have lived".', '"since 2020" → present perfect: "I have lived"।'),
  },
];

const cmChallenge: Exercise[] = [
  {
    id: 't-9-c1', type: 'choice', tag: 'tense', concept: 'past-simple',
    prompt: l('Which three questions catch most tense mistakes?', 'কোন তিনটা প্রশ্ন বেশিরভাগ tense-এর ভুল ধরে?'),
    options: ['Time? Subject? Form?', 'Length? Spelling? Font?', 'Topic? Opinion? Example?'], answer: 'Time? Subject? Form?',
    explanation: l('Time (which tense?), subject (-s? was/were? has/have?), form (went/gone, -ing with be).', 'Time (কোন tense?), subject (-s? was/were? has/have?), form (went/gone, be সহ -ing)।'),
  },
  {
    id: 't-9-c2', type: 'spot', tag: 'tense', concept: 'past-simple', pattern: 'tense-time',
    prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করো।'),
    words: ['In', '2005,', 'only', '10%', 'of', 'homes', 'have', 'internet', 'access.'], wrong: 6,
    accepted: ['had'], fixOptions: ['had', 'has', 'having'],
    explanation: l('"In 2005" is finished → past simple of have: had.', '"In 2005" শেষ → have-এর past simple: had।'),
  },
  {
    id: 't-9-c3', type: 'choice', tag: 'tense', concept: 'present-perfect', pattern: 'past-vs-perfect',
    prompt: l('A student wrote: "I have finished school in 2021." What is the best fix?', 'একজন student লিখেছে: "I have finished school in 2021." সবচেয়ে ভালো fix কী?'),
    options: ['I finished school in 2021.', 'I have finish school in 2021.', 'I am finishing school in 2021.'], answer: 'I finished school in 2021.',
    explanation: l('"in 2021" is a finished time → past simple.', '"in 2021" শেষ হওয়া সময় → past simple।'),
  },
];

export const tenseMistakesV2: Lesson = {
  id: 't-9',
  format: 'v2',
  title: l('Common tense mistakes', 'Tense-এর common ভুল'),
  why: l('Fixing a few repeated mistakes improves accuracy faster than learning new grammar.', 'নতুন grammar শেখার চেয়ে কয়েকটা বারবার হওয়া ভুল ঠিক করলে accuracy তাড়াতাড়ি বাড়ে।'),
  minutes: 12,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Be the examiner', 'তুমিই examiner'),
      situation: l('A student’s Task 1: "In 2010 the number of students is 500. Since then it has rised every year, and in 2020 it has reached 900."', 'একজন student-এর Task 1: "In 2010 the number of students is 500. Since then it has rised every year, and in 2020 it has reached 900."'),
      question: l('How many tense mistakes are there?', 'কয়টা tense-এর ভুল আছে?'),
      options: ['None', 'One', 'Three'],
      answer: 'Three',
      diagnose: {
        None: l('Look again at each verb and its time word: "In 2010 … is", "has rised", "in 2020 … has reached".', 'প্রতিটা verb আর তার time word আবার দেখো: "In 2010 … is", "has rised", "in 2020 … has reached"।'),
        One: l('There are more. Check each verb against its time word and its form.', 'আরও আছে। প্রতিটা verb-কে তার time word আর form-এর সাথে মিলিয়ে দেখো।'),
        Three: l('Right: "In 2010 … was", "has risen" (not rised), and "in 2020 it reached" (finished year).', 'ঠিক: "In 2010 … was", "has risen" (rised না), আর "in 2020 it reached" (শেষ হওয়া বছর)।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করো'),
      items: [
        { en: '✗ In 2010 the figure is 500. → ✓ In 2010 the figure was 500.', note: l('time', 'সময়') },
        { en: '✗ My father work in a bank. → ✓ My father works in a bank.', note: l('subject', 'subject') },
        { en: '✗ It has rised every year. → ✓ It has risen every year.', note: l('form', 'form') },
        { en: '✗ Prices rising. → ✓ Prices are rising.', note: l('form', 'form') },
      ],
      question: l('What do the corrections check?', 'সংশোধনগুলো কী পরীক্ষা করে?'),
      options: [
        l('The time, the subject and the verb form', 'সময়, subject আর verb form'),
        l('Only the spelling', 'শুধু বানান'),
        l('Only the vocabulary', 'শুধু vocabulary'),
      ],
      answer: 0,
      pattern: l(
        'Almost every tense mistake is one of three: the wrong TIME (tense), a SUBJECT that doesn’t match (-s, was/were, has/have), or a wrong FORM (rised, have went, -ing without be).',
        'প্রায় সব tense-এর ভুল তিন ধরনের একটা: ভুল TIME (tense), না মেলা SUBJECT (-s, was/were, has/have), বা ভুল FORM (rised, have went, be ছাড়া -ing)।',
      ),
    },
    {
      kind: 'concept',
      title: l('Three checks for every verb', 'প্রতিটা verb-এর জন্য তিনটা check'),
      body: l(
        'Most tense errors come from a few habits. Before you finish a Writing task, read each verb with three questions: TIME — does the tense match the time words? SUBJECT — does the verb match its subject? FORM — is the form correct after have / had / be / did / will?',
        'বেশিরভাগ tense-এর ভুল আসে অল্প কয়েকটা অভ্যাস থেকে। Writing শেষ করার আগে প্রতিটা verb তিনটা প্রশ্ন দিয়ে পড়ো: TIME — tense কি time word-এর সাথে মেলে? SUBJECT — verb কি subject-এর সাথে মেলে? FORM — have / had / be / did / will-এর পরে form কি ঠিক?',
      ),
      points: [
        l('1. Missing -s: "She work" → "She works".', '১. -s বাদ: "She work" → "She works"।'),
        l('2. Present perfect with a finished time: "has increased in 2010" → "increased in 2010".', '২. শেষ হওয়া সময়ের সাথে present perfect: "has increased in 2010" → "increased in 2010"।'),
        l('3. Wrong past form: "rised", "falled" → "rose", "fell".', '৩. ভুল past form: "rised", "falled" → "rose", "fell"।'),
        l('4. -ing without "be": "Prices rising" → "Prices are rising".', '৪. "be" ছাড়া -ing: "Prices rising" → "Prices are rising"।'),
        l('5. NOT every change of tense is a mistake: change it when the time changes ("in 2010 … since then").', '৫. Tense বদলানো সবসময় ভুল না: সময় বদলালে বদলাও ("in 2010 … since then")।'),
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
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'In 2010, exports rose to $5 billion, and they have continued to grow since then.', note: l('Changing tense is fine when the time changes (2010 → since then).', 'সময় বদলালে tense বদলানো ঠিক আছে (2010 → since then)।') },
        { skill: 'speaking', example: 'When I was a child I lived in a village, but now I live in the city.', note: l('Keep past for the past and present for now.', 'অতীতের জন্য past আর এখনের জন্য present রাখো।') },
        { skill: 'reading', example: 'The factory closed in 1998; since then, the area has become a park.', note: l('The tense tells you what is still true: it is a park now.', 'Tense বলে দেয় কী এখনো সত্য: এখন এটা একটা park।') },
        { skill: 'listening', example: 'We moved the meeting — it was on Tuesday, but now it’s on Thursday.', note: l('was (old) vs is (now): write the present one.', 'was (পুরনো) বনাম is (এখন): এখনকারটা লেখো।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The sales has increased in 2012.', right: 'Sales increased in 2012.', why: l('Finished year → past simple.', 'শেষ হওয়া বছর → past simple।') },
        { wrong: 'I am living here since 2020.', right: 'I have lived here since 2020.', why: l('since → present perfect.', 'since → present perfect।') },
        { wrong: 'It has rised every year.', right: 'It has risen every year.', why: l('rise → rose → risen.', 'rise → rose → risen।') },
        { wrong: 'These days more people using mobile banking.', right: 'These days more people are using mobile banking.', why: l('-ing needs are.', '-ing-এর সাথে are লাগে।') },
      ],
    },
    { kind: 'practice', mode: 'practice', title: l('Practice: spot the right one', 'Practice: ঠিকটা খোঁজো'), exercises: cmPractice },
    { kind: 'practice', mode: 'recall', title: l('Active recall: fix it yourself', 'Active recall: নিজে ঠিক করো'), exercises: cmRecall },
    { kind: 'practice', title: l('Mini challenge', 'Mini challenge'), exercises: cmChallenge },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: three times in one answer', 'এবার তোমার পালা: এক answer-এ তিন সময়'),
      exercises: [
        {
          id: 't-9-y1', type: 'write', tag: 'tense', concept: 'present-perfect',
          prompt: l('Write 3 sentences about learning English: when you started (past), how long you have been learning (since / for), and what you are doing to improve these days.', 'English শেখা নিয়ে ৩টা sentence লেখো: কবে শুরু করেছিলে (past), কতদিন ধরে শিখছো (since / for), আর আজকাল উন্নতির জন্য কী করছো।'),
          model: 'I started learning English when I was six. I have studied it for about fifteen years. These days I am practising speaking with a friend every evening.',
          checklist: [l('Past simple with a finished time', 'শেষ হওয়া সময়ের সাথে past simple'), l('have/has + participle with since / for', 'since / for সহ have/has + participle'), l('am/is/are + -ing for these days', 'আজকালের জন্য am/is/are + -ing')],
          explanation: l('Three time frames, three tenses: exactly what the three checks protect.', 'তিন সময়, তিন tense: তিনটা check ঠিক এটাই রক্ষা করে।'),
          mino: {
            task: 'The student writes three sentences about learning English: a past start (past simple with a finished time), a duration up to now (present perfect or present perfect continuous with since/for), and a current activity (present continuous). Check each verb with TIME (tense matches the time words), SUBJECT (agreement) and FORM (correct participles, be + -ing, no "have went"). When a tense is wrong, quote the time word in the student’s sentence that decides it.',
            target: l('Past start · have … since/for · am/is/are + -ing', 'অতীতে শুরু · have … since/for · am/is/are + -ing'),
          },
        },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Check every verb: time? subject? form?', 'প্রতিটা verb check করো: সময়? subject? form?'),
        l('Finished year → past simple. since/for → present perfect.', 'শেষ হওয়া বছর → past simple। since/for → present perfect।'),
        l('Change tense only when the time changes.', 'সময় বদলালেই শুধু tense বদলাও।'),
      ],
    },
  ],
};

// ======================================================================= 10
const wrPractice: Exercise[] = [
  {
    id: 't-10-e1', type: 'choice', tag: 'tense', concept: 'present-simple',
    prompt: l('The graph covers 2000–2020. Choose the correct introduction.', 'Graph-টা 2000–2020-এর। সঠিক introduction বাছো।'),
    options: ['The graph showed the number of visitors between 2000 and 2020.', 'The graph shows the number of visitors between 2000 and 2020.', 'The graph has shown the number of visitors between 2000 and 2020.'],
    answer: 'The graph shows the number of visitors between 2000 and 2020.',
    explanation: l('The graph shows it now → present "shows".', 'Graph-টা এখন দেখাচ্ছে → present "shows"।'),
    why: { 'The graph showed the number of visitors between 2000 and 2020.': l('The data is past, but the graph is in front of you now.', 'Data অতীতের, কিন্তু graph-টা এখন তোমার সামনে।'), 'The graph has shown the number of visitors between 2000 and 2020.': l('Just describe what it shows now: shows.', 'এখন কী দেখায় সেটাই বলো: shows।') },
  },
  {
    id: 't-10-e2', type: 'choice', tag: 'tense', concept: 'past-simple', pattern: 'past-vs-perfect',
    prompt: l('Choose the correct data sentence.', 'সঠিক data sentence বাছো।'),
    sentence: 'Data: 2005: 40% → 2015: 25%',
    options: ['The proportion fell from 40% in 2005 to 25% in 2015.', 'The proportion falls from 40% in 2005 to 25% in 2015.', 'The proportion has fallen from 40% in 2005 to 25% in 2015.'],
    answer: 'The proportion fell from 40% in 2005 to 25% in 2015.',
    explanation: l('Finished years → past simple.', 'শেষ হওয়া বছর → past simple।'),
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
    id: 't-10-p1', type: 'choice', tag: 'tense', concept: 'present-perfect',
    prompt: l('Task 2 introduction: choose the best background sentence.', 'Task 2 introduction: সবচেয়ে ভালো background sentence বাছো।'),
    options: ['In recent years, the use of smartphones among children has increased dramatically.', 'In recent years, the use of smartphones among children increased dramatically in 2015.', 'In recent years, the use of smartphones among children is increase dramatically.'],
    answer: 'In recent years, the use of smartphones among children has increased dramatically.',
    explanation: l('"In recent years" = up to now → present perfect.', '"In recent years" = এখন পর্যন্ত → present perfect।'),
    why: { 'In recent years, the use of smartphones among children increased dramatically in 2015.': l('"in recent years" and "in 2015" clash.', '"in recent years" আর "in 2015" একসাথে মেলে না।'), 'In recent years, the use of smartphones among children is increase dramatically.': l('"is increase" is not a verb form.', '"is increase" কোনো verb form না।') },
  },
];

const wrRecall: Exercise[] = [
  {
    id: 't-10-e3', type: 'gap', tag: 'tense', concept: 'future',
    prompt: l('Complete the projection (expect, reach).', 'Projection-টা complete করো (expect, reach)।'),
    sentence: 'The figure ___ 60% by 2030.',
    accepted: ['is expected to reach', 'is projected to reach', 'is predicted to reach', 'will reach'],
    explanation: l('Future year → "is expected to reach" (or "will reach").', 'ভবিষ্যতের বছর → "is expected to reach" (বা "will reach")।'),
  },
  {
    id: 't-10-r1', type: 'gap', tag: 'tense', concept: 'past-simple', pattern: 'verb-form',
    prompt: l('Write the past simple of "peak".', '"peak"-এর past simple লেখো।'),
    sentence: 'Coffee sales ___ at 800 cups in July and then declined.',
    accepted: ['peaked'],
    explanation: l('A finished month in the data → peaked.', 'Data-র শেষ হওয়া মাস → peaked।'),
  },
  {
    id: 't-10-r2', type: 'correct', tag: 'tense', concept: 'present-simple',
    prompt: l('Fix the process sentence.', 'Process sentence-টা ঠিক করো।'),
    sentence: 'Next, the bricks heated in a kiln.',
    accepted: ['Next, the bricks are heated in a kiln.'],
    explanation: l('Process → present simple passive: are heated.', 'Process → present simple passive: are heated।'),
  },
];

const wrChallenge: Exercise[] = [
  {
    id: 't-10-c1', type: 'choice', tag: 'tense', concept: 'past-simple',
    prompt: l('A Task 1 map shows a village in 1990 and today. Which pair of tenses fits?', 'একটা Task 1 map-এ 1990 আর আজকের একটা গ্রাম। কোন tense-এর জোড়া মেলে?'),
    options: ['1990: past simple; today: present simple / present perfect', 'Both: present simple', 'Both: future'],
    answer: '1990: past simple; today: present simple / present perfect',
    explanation: l('"In 1990 there was a farm… Now there is a school / A school has been built."', '"In 1990 there was a farm… Now there is a school / A school has been built."'),
  },
  {
    id: 't-10-c2', type: 'spot', tag: 'tense', concept: 'past-simple', pattern: 'tense-time',
    prompt: l('One word breaks this Task 1 sentence. Tap it, then fix it.', 'একটা word Task 1 sentence-টা ভাঙছে। Tap করে ঠিক করো।'),
    words: ['In', '2005,', 'rail', 'use', 'peak', 'at', '40%.'], wrong: 4,
    accepted: ['peaked'], fixOptions: ['peaked', 'has peaked', 'peaks'],
    explanation: l('"In 2005" is finished → past simple: peaked (not "has peaked").', '"In 2005" শেষ → past simple: peaked ("has peaked" না)।'),
  },
  {
    id: 't-10-c3', type: 'choice', tag: 'tense', concept: 'future',
    prompt: l('Which sentence is best for a Task 2 result?', 'Task 2-এর ফলাফলের জন্য কোন sentence সবচেয়ে ভালো?'),
    options: ['If governments invest in public transport, traffic will decrease.', 'If governments will invest in public transport, traffic decreases.', 'If governments invested in public transport, traffic will decreased.'],
    answer: 'If governments invest in public transport, traffic will decrease.',
    explanation: l('if + present, will + base verb.', 'if + present, will + base verb।'),
  },
];

export const tensesWritingV2: Lesson = {
  id: 't-10',
  format: 'v2',
  title: l('Tenses in IELTS Writing', 'IELTS Writing-এ Tense'),
  why: l('Task 1 and Task 2 each have typical tense patterns. Knowing them removes most tense errors.', 'Task 1 আর Task 2-এর নিজস্ব tense pattern আছে। এগুলো জানলে বেশিরভাগ tense-এর ভুল চলে যায়।'),
  minutes: 13,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('The first sentence of Task 1', 'Task 1-এর প্রথম sentence'),
      situation: l('Your Task 1 graph shows bus users from 2000 to 2020. You begin your answer.', 'তোমার Task 1 graph-এ 2000 থেকে 2020 পর্যন্ত bus যাত্রী। তুমি answer শুরু করছো।'),
      question: l('Which introduction is correct?', 'কোন introduction ঠিক?'),
      options: ['The graph showed the number of bus users from 2000 to 2020.', 'The graph shows the number of bus users from 2000 to 2020.', 'The graph has shown the number of bus users from 2000 to 2020.'],
      answer: 'The graph shows the number of bus users from 2000 to 2020.',
      diagnose: {
        'The graph showed the number of bus users from 2000 to 2020.': l('The data is in the past, but the graph shows it now, in front of you. So: shows. Past tenses come in the body, for the data.', 'Data অতীতের, কিন্তু graph-টা এখন তোমার সামনে দেখাচ্ছে। তাই: shows। Past tense আসবে body-তে, data-র জন্য।'),
        'The graph shows the number of bus users from 2000 to 2020.': l('Right. Introduction: present. Data in past years: past simple.', 'ঠিক। Introduction: present। অতীতের বছরের data: past simple।'),
        'The graph has shown the number of bus users from 2000 to 2020.': l('Not wrong grammar, but unnatural here. Keep the introduction simple: shows.', 'Grammar ভুল না, কিন্তু এখানে অস্বাভাবিক। Introduction সহজ রাখো: shows।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করো'),
      items: [
        { en: 'The chart shows how many people used buses between 1990 and 2020.', note: l('intro: present · data: past', 'intro: present · data: past') },
        { en: 'The figure is expected to reach 60% by 2030.', note: l('future years → is expected to', 'ভবিষ্যতের বছর → is expected to') },
        { en: 'First, the leaves are picked and then they are dried.', note: l('process → present passive', 'process → present passive') },
        { en: 'In recent years, many cities have introduced bike lanes.', note: l('Task 2 change → present perfect', 'Task 2 পরিবর্তন → present perfect') },
      ],
      question: l('How do you choose the tense in Writing?', 'Writing-এ tense কীভাবে বাছবে?'),
      options: [
        l('From the time in the task: past years, future years, no time, or up to now', 'Task-এর সময় দেখে: অতীতের বছর, ভবিষ্যতের বছর, সময় নেই, নাকি এখন পর্যন্ত'),
        l('Always use the past simple to be safe', 'নিরাপদ থাকতে সবসময় past simple'),
        l('Use as many tenses as possible for a higher score', 'বেশি score-এর জন্য যত বেশি tense সম্ভব'),
      ],
      answer: 0,
      pattern: l(
        'The task’s time decides the tense: past years → past simple; future years → is expected to; no time (process, general truth) → present simple; up to now → present perfect.',
        'Task-এর সময়ই tense ঠিক করে: অতীতের বছর → past simple; ভবিষ্যতের বছর → is expected to; সময় নেই (process, সাধারণ সত্য) → present simple; এখন পর্যন্ত → present perfect।',
      ),
    },
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
        l('NOT tense variety for its own sake: the right tense for each time beats "more tenses".', 'শুধু বৈচিত্র্যের জন্য tense না: প্রতিটা সময়ে ঠিক tense, "বেশি tense"-এর চেয়ে ভালো।'),
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
    {
      kind: 'ielts',
      title: l('Across the test', 'পুরো test জুড়ে'),
      uses: [
        { skill: 'writing', example: 'Overall, car use increased, while bus use declined over the period.', note: l('Task 1 overview: same tense for both trends.', 'Task 1 overview: দুই trend-এ একই tense।') },
        { skill: 'speaking', example: 'If the city builds more metro lines, I think traffic will get better.', note: l('Part 3: real results with "if + present, will" — not "if … will build".', 'Part 3: "if + present, will" দিয়ে বাস্তব ফলাফল — "if … will build" না।') },
        { skill: 'reading', example: 'Rail use peaked in 2005 and has declined ever since.', note: l('Graph-like passages: the tense shows whether a trend is still going.', 'Graph-এর মতো passage: tense বলে trend এখনো চলছে কিনা।') },
        { skill: 'listening', example: 'Numbers fell last year, but they’re expected to recover.', note: l('Part 4 lectures mix past data and predictions.', 'Part 4-এর lecture-এ অতীতের data আর ভবিষ্যদ্বাণী মেশানো থাকে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The graph showed the number of visitors.', right: 'The graph shows the number of visitors.', why: l('Introduction → present.', 'Introduction → present।') },
        { wrong: 'Sales have increased in 2015.', right: 'Sales increased in 2015.', why: l('Finished year → past simple.', 'শেষ হওয়া বছর → past simple।') },
        { wrong: 'The figure will be increase by 2030.', right: 'The figure is expected to increase by 2030.', why: l('Projection → is expected to + base verb.', 'Projection → is expected to + base verb।') },
        { wrong: 'Next, the bricks heated.', right: 'Next, the bricks are heated.', why: l('Process → present passive.', 'Process → present passive।') },
      ],
    },
    { kind: 'practice', mode: 'practice', title: l('Practice: choose for the task', 'Practice: task দেখে বাছো'), exercises: wrPractice },
    { kind: 'practice', mode: 'recall', title: l('Active recall: no options', 'Active recall: কোনো option নেই'), exercises: wrRecall },
    { kind: 'practice', title: l('Mini challenge', 'Mini challenge'), exercises: wrChallenge },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: Task 1 and Task 2', 'এবার তোমার পালা: Task 1 আর Task 2'),
      exercises: [
        {
          id: 't-10-y1', type: 'write', tag: 'tense', concept: 'past-simple',
          prompt: l('Task 1: rail passengers were 20 million in 2000, 35 million in 2010, and are expected to reach 50 million in 2030. Write 2 sentences: one about the past data, one about the projection.', 'Task 1: rail যাত্রী 2000-এ 20 million, 2010-এ 35 million, আর 2030-এ 50 million হবে বলে আশা করা হচ্ছে। ২টা sentence লেখো: একটা অতীতের data নিয়ে, একটা projection নিয়ে।'),
          model: 'The number of rail passengers rose from 20 million in 2000 to 35 million in 2010. This figure is expected to reach 50 million by 2030.',
          checklist: [l('Past simple for 2000–2010', '2000–2010-এর জন্য past simple'), l('is expected to / will for 2030', '2030-এর জন্য is expected to / will')],
          explanation: l('Change the tense exactly where the data becomes a projection.', 'Data যেখানে projection হয়, ঠিক সেখানেই tense বদলাও।'),
          mino: {
            task: 'The student writes two IELTS Task 1 sentences: past data (2000–2010) and a projection for 2030. Check past simple for the finished years (never "has increased in 2010"), correct irregular forms (rose, grew), and a correct future form for the projection (is expected/predicted to + base verb, or will + base verb; not "will be increase"). Explain any tense error by pointing to the year in the student’s sentence.',
            target: l('Past data → past simple · projection → is expected to', 'অতীতের data → past simple · projection → is expected to'),
          },
        },
        {
          id: 't-10-e5', type: 'write', tag: 'tense', concept: 'present-perfect',
          prompt: l('Task 2 introduction: write one sentence about a recent change in how people shop.', 'Task 2 introduction: মানুষের কেনাকাটার সাম্প্রতিক পরিবর্তন নিয়ে এক sentence লেখো।'),
          model: 'In recent years, online shopping has become a normal part of daily life for many people.',
          checklist: [l('"In recent years" + present perfect', '"In recent years" + present perfect'), l('No finished time (yesterday, in 2010)', 'শেষ হওয়া সময় নেই (yesterday, in 2010)')],
          explanation: l('A clear background sentence for Task 2.', 'Task 2-এর জন্য একটা পরিষ্কার background sentence।'),
          mino: {
            task: 'The student writes one Task 2 introduction sentence about a recent change in shopping. Check the present perfect with "in recent years / nowadays": have/has + past participle, has with singular subjects, and no finished time words. Keep feedback about tense and verb form.',
            target: l('In recent years + have / has + past participle', 'In recent years + have / has + past participle'),
          },
        },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('"The graph shows…" · past years → past · future years → is expected to.', '"The graph shows…" · অতীতের বছর → past · ভবিষ্যতের বছর → is expected to।'),
        l('Process → present simple passive.', 'Process → present simple passive।'),
        l('Task 2: opinions present, recent changes present perfect, results will.', 'Task 2: মতামত present, সাম্প্রতিক পরিবর্তন present perfect, ফলাফল will।'),
      ],
    },
  ],
};

// ======================================================================= 11
const spPractice: Exercise[] = [
  {
    id: 't-11-e1', type: 'choice', tag: 'tense', concept: 'past-simple', pattern: 'tense-time',
    prompt: l('Examiner: "Did you like reading as a child?" Choose the best start.', 'Examiner: "Did you like reading as a child?" সবচেয়ে ভালো শুরু বাছো।'),
    options: ['Yes, I like reading very much.', 'Yes, I loved reading stories when I was young.', 'Yes, I have liked reading.'], answer: 'Yes, I loved reading stories when I was young.',
    explanation: l('"Did you…as a child" → past simple.', '"Did you…as a child" → past simple।'),
    why: { 'Yes, I like reading very much.': l('This answers "Do you like…?", not the past question.', 'এটা "Do you like…?"-এর answer, অতীতের প্রশ্নের না।'), 'Yes, I have liked reading.': l('Present perfect does not fit "as a child" (a finished time).', '"as a child" শেষ হওয়া সময়, present perfect মেলে না।') },
  },
  {
    id: 't-11-e2', type: 'choice', tag: 'tense', concept: 'present-perfect', pattern: 'past-vs-perfect',
    prompt: l('Examiner: "How long have you been learning English?"', 'Examiner: "How long have you been learning English?"'),
    options: ['I learn English for ten years.', 'I have been learning English for about ten years.', 'I learned English since ten years.'], answer: 'I have been learning English for about ten years.',
    explanation: l('"How long have you…" → present perfect + for.', '"How long have you…" → present perfect + for।'),
    why: { 'I learn English for ten years.': l('Present simple cannot show a period up to now.', 'Present simple দিয়ে এখন পর্যন্ত সময়কাল দেখানো যায় না।'), 'I learned English since ten years.': l('Past simple + "since ten years" are both wrong; use "for ten years".', 'Past simple আর "since ten years" দুটোই ভুল; "for ten years"।') },
  },
  {
    id: 't-11-e4', type: 'choice', tag: 'tense', concept: 'future',
    prompt: l('Examiner (Part 3): "Will people still read printed books in the future?"', 'Examiner (Part 3): "Will people still read printed books in the future?"'),
    options: ['I think many people will still read them, but e-books will probably become more common.', 'I think many people still read them yesterday.', 'I think many people reading them.'],
    answer: 'I think many people will still read them, but e-books will probably become more common.',
    explanation: l('Future question → "will", softened with "I think / probably".', 'ভবিষ্যতের প্রশ্ন → "will", "I think / probably" দিয়ে নরম।'),
  },
  {
    id: 't-11-p1', type: 'choice', tag: 'tense', concept: 'present-continuous', pattern: 'simple-vs-continuous',
    prompt: l('Examiner: "Do you work or are you a student?" You are in your final year at university.', 'Examiner: "Do you work or are you a student?" তুমি university-র শেষ বর্ষে আছো।'),
    options: ['I’m a student. I’m doing a degree in economics at the moment.', 'I’m a student. I do a degree in economics at the moment.', 'I’m a student. I am study economics.'],
    answer: 'I’m a student. I’m doing a degree in economics at the moment.',
    explanation: l('A temporary current situation with "at the moment" → present continuous.', '"at the moment" সহ এখনকার সাময়িক অবস্থা → present continuous।'),
    why: { 'I’m a student. I do a degree in economics at the moment.': l('"at the moment" needs the continuous: I’m doing.', '"at the moment"-এ continuous লাগে: I’m doing।'), 'I’m a student. I am study economics.': l('am + base verb is not a tense: I study / I’m studying.', 'am + base verb কোনো tense না: I study / I’m studying।') },
  },
];

const spRecall: Exercise[] = [
  {
    id: 't-11-e3', type: 'correct', tag: 'tense', concept: 'past-simple', pattern: 'tense-time',
    prompt: l('Part 2 story: correct the sentence.', 'Part 2-এর গল্প: sentence-টা ঠিক করো।'),
    sentence: 'Last winter I go to Srimangal and I see a lot of tea gardens.',
    accepted: ['Last winter I went to Srimangal and I saw a lot of tea gardens.', 'Last winter, I went to Srimangal and I saw a lot of tea gardens.', 'Last winter I went to Srimangal and saw a lot of tea gardens.'],
    explanation: l('A finished past story → went, saw.', 'শেষ হওয়া অতীতের গল্প → went, saw।'),
  },
  {
    id: 't-11-r1', type: 'gap', tag: 'tense', concept: 'present-perfect',
    prompt: l('Examiner: "How has your city changed?" Complete with "become".', 'Examiner: "How has your city changed?" "become" দিয়ে complete করো।'),
    sentence: 'It ___ much busier over the last few years.',
    accepted: ['has become', "'s become"],
    explanation: l('"over the last few years" = up to now → has become.', '"over the last few years" = এখন পর্যন্ত → has become।'),
    why: { became: l('"over the last few years" continues to now → has become.', '"over the last few years" এখন পর্যন্ত চলে → has become।'), 'has became': l('After has, use the participle: become.', 'has-এর পরে participle: become।') },
  },
  {
    id: 't-11-r2', type: 'correct', tag: 'tense', concept: 'future', pattern: 'verb-form',
    prompt: l('Part 3: fix the answer.', 'Part 3: উত্তরটা ঠিক করো।'),
    sentence: 'I think people will uses more solar power in the future.',
    accepted: ['I think people will use more solar power in the future.'],
    explanation: l('will + base verb: will use.', 'will + base verb: will use।'),
  },
];

const spChallenge: Exercise[] = [
  {
    id: 't-11-c1', type: 'choice', tag: 'tense', concept: 'present-simple',
    prompt: l('How can you extend a Part 1 answer naturally?', 'Part 1-এর answer স্বাভাবিকভাবে কীভাবে বাড়াবে?'),
    options: ['Answer in the question’s tense, then add a past example or a future plan', 'Repeat the question in the same tense', 'Use only the present simple so you make no mistakes'],
    answer: 'Answer in the question’s tense, then add a past example or a future plan',
    explanation: l('"I usually…" + "Last week I…" + "Next month I’m going to…" shows range naturally.', '"I usually…" + "Last week I…" + "Next month I’m going to…" স্বাভাবিকভাবে range দেখায়।'),
  },
  {
    id: 't-11-c2', type: 'spot', tag: 'tense', concept: 'past-continuous',
    prompt: l('One word breaks this Part 2 sentence. Tap it, then fix it.', 'একটা word Part 2 sentence-টা ভাঙছে। Tap করে ঠিক করো।'),
    words: ['I', 'was', 'walk', 'to', 'the', 'market', 'when', 'I', 'met', 'her.'], wrong: 2,
    accepted: ['walking'], fixOptions: ['walking', 'walked', 'walks'],
    explanation: l('was + verb-ing for the background: was walking.', 'পটভূমির জন্য was + verb-ing: was walking।'),
  },
  {
    id: 't-11-c3', type: 'choice', tag: 'tense', concept: 'present-perfect',
    prompt: l('Examiner: "Have you ever taken part in a competition?" Best answer?', 'Examiner: "Have you ever taken part in a competition?" সবচেয়ে ভালো উত্তর?'),
    options: ['Yes, I have. I took part in a debate competition in class nine.', 'Yes, I have took part in class nine.', 'Yes, I take part in a debate in class nine.'],
    answer: 'Yes, I have. I took part in a debate competition in class nine.',
    explanation: l('Experience → "I have", then the finished detail → past simple.', 'অভিজ্ঞতা → "I have", তারপর শেষ হওয়া বিস্তারিত → past simple।'),
  },
];

export const tensesSpeakingV2: Lesson = {
  id: 't-11',
  format: 'v2',
  title: l('Tenses in IELTS Speaking', 'IELTS Speaking-এ Tense'),
  why: l('Each Speaking part leans on different tenses. Moving between them naturally raises Grammatical Range & Accuracy.', 'Speaking-এর প্রতিটা part আলাদা tense-এর উপর নির্ভর করে। স্বাভাবিকভাবে এক tense থেকে আরেকটায় যাওয়া Grammatical Range & Accuracy বাড়ায়।'),
  minutes: 12,
  difficulty: 'medium',
  skill: 'speaking',
  steps: [
    {
      kind: 'hook',
      title: l('Listen to the question', 'প্রশ্নটা শোনো'),
      situation: l('Examiner: "Have you ever been to a wedding in another city?"', 'Examiner: "Have you ever been to a wedding in another city?"'),
      question: l('Which answer sounds natural and accurate?', 'কোন উত্তর স্বাভাবিক আর নির্ভুল?'),
      options: ['Yes, I have. I went to my cousin’s wedding in Sylhet last year.', 'Yes, I have gone to my cousin’s wedding in Sylhet last year.', 'Yes, I go to my cousin’s wedding in Sylhet last year.'],
      answer: 'Yes, I have. I went to my cousin’s wedding in Sylhet last year.',
      diagnose: {
        'Yes, I have. I went to my cousin’s wedding in Sylhet last year.': l('Right. Answer the "Have you ever…?" with "I have", then give the detail with a finished time in the past simple.', 'ঠিক। "Have you ever…?"-এর উত্তর "I have", তারপর শেষ হওয়া সময়ের বিস্তারিত past simple-এ।'),
        'Yes, I have gone to my cousin’s wedding in Sylhet last year.': l('The question uses the present perfect, but once you add "last year", the detail must be past simple: I went.', 'প্রশ্নে present perfect, কিন্তু "last year" যোগ করলে বিস্তারিত past simple-এ: I went।'),
        'Yes, I go to my cousin’s wedding in Sylhet last year.': l('"last year" is past: I went.', '"last year" অতীত: I went।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করো'),
      items: [
        { en: 'Do you like cooking? — Yes, I love it. I usually cook on Fridays.', note: l('Do you…? → present simple', 'Do you…? → present simple') },
        { en: 'Did you enjoy school? — Yes, I did. I especially liked science.', note: l('Did you…? → past simple', 'Did you…? → past simple') },
        { en: 'How long have you lived here? — I’ve lived here for six years.', note: l('How long have you…? → present perfect', 'How long have you…? → present perfect') },
        { en: 'Will cities change? — I think they’ll become greener.', note: l('Will…? → will', 'Will…? → will') },
      ],
      question: l('Where does the tense of your answer come from?', 'তোমার উত্তরের tense কোথা থেকে আসে?'),
      options: [
        l('From the examiner’s question', 'Examiner-এর প্রশ্ন থেকে'),
        l('It is always present simple in Speaking', 'Speaking-এ সবসময় present simple'),
        l('From how long the answer is', 'উত্তর কত লম্বা তা থেকে'),
      ],
      answer: 0,
      pattern: l(
        'The question gives you the tense. Answer in that tense, then extend with a different time (a past example, a future plan).',
        'প্রশ্নই tense দিয়ে দেয়। সেই tense-এ উত্তর দাও, তারপর অন্য সময় দিয়ে বাড়াও (অতীতের উদাহরণ, ভবিষ্যতের পরিকল্পনা)।',
      ),
    },
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
        l('NOT memorised long sentences: natural, accurate answers score better than "advanced" ones with errors.', 'মুখস্থ লম্বা sentence না: ভুলসহ "advanced" উত্তরের চেয়ে স্বাভাবিক, নির্ভুল উত্তর বেশি score পায়।'),
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
    {
      kind: 'ielts',
      title: l('Across the test', 'পুরো test জুড়ে'),
      uses: [
        { skill: 'speaking', example: 'Did you enjoy school? — Yes, I did. I especially liked science because we did lots of experiments.', note: l('Answer a past question in the past.', 'অতীতের প্রশ্নের answer অতীতে দাও।') },
        { skill: 'speaking', example: 'How has your city changed? — It has grown very fast; there are many more flyovers now.', note: l('"has changed" question → present perfect answer.', '"has changed" প্রশ্ন → present perfect answer।') },
        { skill: 'writing', example: 'Many young people have moved to cities in recent years, and this trend is likely to continue.', note: l('Task 2 uses the same time logic as speaking: recent years → present perfect.', 'Task 2-তেও speaking-এর মতো সময়ের logic: recent years → present perfect।') },
        { skill: 'listening', example: 'I used to live in Khulna, but I’ve moved to Dhaka now.', note: l('Part 1 forms: the present address is the answer, not the old one.', 'Part 1 form: বর্তমান ঠিকানাই উত্তর, পুরনোটা না।') },
        { skill: 'reading', example: 'The writer grew up in a village and now works as a journalist.', note: l('Matching information: past = childhood, present = now.', 'Matching information: past = ছোটবেলা, present = এখন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Last winter I go to Srimangal.', right: 'Last winter I went to Srimangal.', why: l('Past story → past simple.', 'অতীতের গল্প → past simple।') },
        { wrong: 'I learn English since ten years.', right: 'I have been learning English for ten years.', why: l('How long → present perfect + for.', 'How long → present perfect + for।') },
        { wrong: 'I think people will uses more solar power.', right: 'I think people will use more solar power.', why: l('will + base verb.', 'will + base verb।') },
      ],
    },
    { kind: 'practice', mode: 'practice', title: l('Practice: match the question', 'Practice: প্রশ্নের সাথে মেলাও'), exercises: spPractice },
    { kind: 'practice', mode: 'recall', title: l('Active recall: no options', 'Active recall: কোনো option নেই'), exercises: spRecall },
    { kind: 'practice', title: l('Mini challenge', 'Mini challenge'), exercises: spChallenge },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Part 1 answer with range', 'এবার তোমার পালা: range সহ Part 1 answer'),
      exercises: [
        {
          id: 't-11-e5', type: 'write', tag: 'tense', concept: 'past-simple',
          prompt: l('Part 1: "Do you like travelling?" Answer in 3 sentences: a general answer (present), one past example, and one future plan.', 'Part 1: "Do you like travelling?" ৩টা sentence-এ উত্তর দাও: সাধারণ উত্তর (present), একটা অতীতের উদাহরণ, আর একটা ভবিষ্যতের পরিকল্পনা।'),
          model: 'Yes, I really enjoy travelling. Last year I went to Sajek with my cousins, and it was amazing. Next winter I’m going to visit Sundarbans.',
          checklist: [l('Present simple for the general answer', 'সাধারণ answer-এ present simple'), l('Past simple for the example', 'উদাহরণে past simple'), l('going to / will for the plan', 'পরিকল্পনায় going to / will')],
          explanation: l('General answer + past example + future plan: a natural way to extend Part 1.', 'সাধারণ answer + অতীতের উদাহরণ + ভবিষ্যতের পরিকল্পনা — Part 1 বাড়ানোর স্বাভাবিক উপায়।'),
          mino: {
            task: 'The student answers Speaking Part 1 "Do you like travelling?" with a general present answer, a past example and a future plan. This is SPEAKING: contractions and natural phrases are fine. Check tense choice by time (present simple for general likes, past simple with finished times like "last year", going to/will for the plan) and verb forms (went not goed, will + base verb). Explain any tense error by the time word in the student’s own sentence.',
            target: l('Present answer · past example · future plan', 'Present answer · অতীতের উদাহরণ · ভবিষ্যতের পরিকল্পনা'),
          },
        },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Answer in the tense of the question.', 'প্রশ্নের tense-এই answer দাও।'),
        l('Extend with another time: a past example or a future plan.', 'আরেকটা সময় দিয়ে বাড়াও: অতীতের উদাহরণ বা ভবিষ্যতের পরিকল্পনা।'),
        l('"Have you ever…?" → I have. + past detail with a finished time.', '"Have you ever…?" → I have। + শেষ হওয়া সময়ের বিস্তারিত past-এ।'),
      ],
    },
  ],
};


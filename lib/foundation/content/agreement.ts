import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, spot, write } from './pos-kit';

/**
 * Subject–Verb Agreement (Foundation module 5), the five concept lessons in
 * the v2 (problem-first) format, easy → hard:
 * sva-1 one or more? (he/she/it + -s; is/are, has/have, does/do)
 * sva-2 two subjects (and · or / nor · either…or / neither…nor)
 * sva-3 everyone, each, every, none… and group nouns
 * sva-4 long subjects (phrases, "one of", who/which clauses)
 * sva-5 amounts and numbers (the number of / a number of, percentages, there is/are, money and time)
 * Bangla verbs change with the person (করি / করে / করেন) but not with
 * one-or-many the English way, so every lesson names why Bangla speakers slip.
 * Original Mino content.
 */

export const AGREEMENT_CONCEPTS: Concept[] = [
  { id: 'sva-basic', title: l('One or more? verb + s', 'এক নাকি একাধিক? verb + s'), lessonId: 'sva-1', tag: 'agreement' },
  { id: 'sva-compound', title: l('Two subjects: and, or, nor', 'দুটো subject: and, or, nor'), lessonId: 'sva-2', tag: 'agreement' },
  { id: 'sva-indefinite', title: l('everyone, each, every and group nouns', 'everyone, each, every আর group noun'), lessonId: 'sva-3', tag: 'agreement' },
  { id: 'sva-long', title: l('Long subjects: find the real subject', 'লম্বা subject: আসল subject খুঁজুন'), lessonId: 'sva-4', tag: 'agreement' },
  { id: 'sva-quantity', title: l('Amounts and numbers', 'পরিমাণ আর সংখ্যা'), lessonId: 'sva-5', tag: 'agreement' },
];

const S = { tag: 'agreement' as const };

// ======================================================================= sva-1
export const svaBasics: Lesson = {
  id: 'sva-1',
  format: 'v2',
  concept: 'sva-basic',
  title: l('One or more? The -s on the verb', 'এক নাকি একাধিক? Verb-এর -s'),
  why: l('"He go", "She don’t", "The price are" — the most frequent grammar slips in Speaking Part 1 and Task 1.', '"He go", "She don’t", "The price are" — Speaking Part 1 আর Task 1-এ সবচেয়ে বেশি হওয়া grammar ভুল।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Speaking Part 1: your family', 'Speaking Part 1: আপনার পরিবার'),
      situation: l('The examiner asks about your family. You say: "My father ___ in a bank, and my two brothers ___ at university."', 'Examiner আপনার পরিবার নিয়ে জিজ্ঞেস করলেন। আপনি বললেন: "My father ___ in a bank, and my two brothers ___ at university."'),
      question: l('Which pair fills the gaps?', 'কোন জোড়াটা gap-এ বসবে?'),
      options: ['work · study', 'works · study', 'works · studies'],
      answer: 'works · study',
      diagnose: {
        'work · study': l('Very common! "My father" is ONE person — like "he". In the present simple, one person (he / she / it) takes verb + s: "My father works".', 'খুব common! "My father" একজন মানুষ — "he"-এর মতো। Present simple-এ একজন (he / she / it) হলে verb + s: "My father works"।'),
        'works · study': l('Right. One father = he → works. Two brothers = they → study (no -s).', 'ঠিক। একজন father = he → works। দুই brothers = they → study (-s না)।'),
        'works · studies': l('"works" is right, but "my two brothers" = they. With plural subjects the verb has NO -s: "my brothers study".', '"works" ঠিক, কিন্তু "my two brothers" = they। Plural subject-এ verb-এ -s থাকে না: "my brothers study"।'),
      },
    },
    {
      kind: 'discover',
      title: l('Compare the pairs', 'জোড়াগুলো তুলনা করুন'),
      items: [
        { en: 'My sister lives in Khulna. · My sisters live in Khulna.', note: l('one → lives; more than one → live', 'একজন → lives; একাধিক → live') },
        { en: 'The student has a laptop. · The students have laptops.', note: l('one → has; more → have', 'একজন → has; একাধিক → have') },
        { en: 'This bus is late. · These buses are late.', note: l('one → is; more → are', 'একটা → is; একাধিক → are') },
        { en: 'He doesn’t eat meat. · They don’t eat meat.', note: l('one → doesn’t; more → don’t', 'একজন → doesn’t; একাধিক → don’t') },
      ],
      question: l('What decides the verb form?', 'Verb-এর form কী ঠিক করে?'),
      options: [
        l('Whether the subject is one (he / she / it) or more than one (they)', 'Subject একজন/একটা (he / she / it) নাকি একাধিক (they)'),
        l('Whether the sentence is long or short', 'Sentence লম্বা নাকি ছোট'),
        l('Whether the verb comes first or last', 'Verb আগে আসে নাকি পরে'),
      ],
      answer: 0,
      pattern: l('Ask "one or more?" about the subject. One (he / she / it) → verb + s, has, is, does. More than one (they), and I / you / we → no -s, have, are, do.', 'Subject নিয়ে জিজ্ঞেস করুন "একটা নাকি একাধিক?"। একটা (he / she / it) → verb + s, has, is, does। একাধিক (they), আর I / you / we → -s না, have, are, do।'),
    },
    {
      kind: 'concept',
      title: l('The rule in the present', 'Present-এ নিয়মটা'),
      body: l(
        'The verb must agree with its subject. In the present simple, a singular subject (he, she, it, one person, one thing, an uncountable noun) takes verb + s. Plural subjects and I / you / we / they take the base verb.',
        'Verb-কে তার subject-এর সাথে মিলতে হয়। Present simple-এ singular subject (he, she, it, একজন মানুষ, একটা জিনিস, uncountable noun) হলে verb + s। Plural subject আর I / you / we / they হলে base verb।',
      ),
      points: [
        l('he / she / it / my father / the city / water → works, goes (go → goes), watches, studies (y → ies), has, is, does, doesn’t.', 'he / she / it / my father / the city / water → works, goes (go → goes), watches, studies (y → ies), has, is, does, doesn’t।'),
        l('I / you / we / they / my parents / cities → work, go, study, have, do, don’t. be: I am · you / we / they are.', 'I / you / we / they / my parents / cities → work, go, study, have, do, don’t। be: I am · you / we / they are।'),
        l('After does / doesn’t / can / will / should the verb has NO -s: He doesn’t live here (not "doesn’t lives"). Does she work? (not "Does she works?").', 'does / doesn’t / can / will / should-এর পরে verb-এ -s থাকে না: He doesn’t live here ("doesn’t lives" না)। Does she work? ("Does she works?" না)।'),
        l('Past simple is the same for everyone (he went, they went) — except be: I / he / she / it was · we / you / they were.', 'Past simple সবার জন্য এক (he went, they went) — শুধু be ছাড়া: I / he / she / it was · we / you / they were।'),
        l('The "one -s" tip: the -s goes EITHER on the noun (plural: students study) OR on the verb (singular: a student studies) — almost never on both.', '"একটা -s" কৌশল: -s হয় noun-এ বসে (plural: students study), নয়তো verb-এ (singular: a student studies) — প্রায় কখনো দুটোতে একসাথে না।'),
        l('Why Bangla speakers slip: Bangla changes the verb for the person (আমি করি, সে করে, তিনি করেন) but "সে যায়" and "তারা যায়" can sound alike, and Bangla never adds an English-style -s. So "he go" feels complete. Check the subject every time.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় ব্যক্তি অনুযায়ী verb বদলায় (আমি করি, সে করে, তিনি করেন), কিন্তু English-এর মতো -s যোগ হয় না, তাই "he go" সম্পূর্ণ মনে হয়। প্রতিবার subject দেখে নিন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'My mother teaches at a primary school.', note: l('one person → teaches (teach + es).', 'একজন → teaches (teach + es)।') },
        { en: 'Most of my friends live near the campus.', note: l('friends = they → live.', 'friends = they → live।') },
        { en: 'Rice is the main food in Bangladesh.', note: l('rice is uncountable → singular → is.', 'rice uncountable → singular → is।') },
        { en: 'My brother doesn’t like cricket, but he loves football.', note: l('doesn’t + like (no -s), then loves.', 'doesn’t + like (-s না), তারপর loves।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'My hometown is quite small, but it has a beautiful river.', note: l('Part 1: "my hometown" = it → is, has.', 'Part 1: "my hometown" = it → is, has।') },
        { skill: 'writing', example: 'The chart shows how much electricity each country uses.', note: l('Task 1 openings: "The chart shows…", "The table compares…" — always -s.', 'Task 1-এর শুরু: "The chart shows…", "The table compares…" — সবসময় -s।') },
        { skill: 'reading', example: 'The author argues that technology helps students.', note: l('Reading: the -s tells you the subject is singular — useful when matching statements.', 'Reading: -s দেখে বোঝা যায় subject singular — statement মেলাতে কাজে লাগে।') },
        { skill: 'listening', example: 'The museum opens at nine and closes at five.', note: l('Listening: the -s is short and quiet — listen for it in form completion.', 'Listening: -s ছোট আর আস্তে শোনা যায় — form completion-এ খেয়াল করে শুনুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'My brother work in Dubai.', right: 'My brother works in Dubai.', why: l('One brother = he → works.', 'একজন brother = he → works।') },
        { wrong: 'She don’t like spicy food.', right: 'She doesn’t like spicy food.', why: l('he / she / it → doesn’t.', 'he / she / it → doesn’t।') },
        { wrong: 'He doesn’t lives here.', right: 'He doesn’t live here.', why: l('After doesn’t, the verb has no -s.', 'doesn’t-এর পরে verb-এ -s না।') },
        { wrong: 'The students was late.', right: 'The students were late.', why: l('Plural subject → were.', 'Plural subject → were।') },
        { wrong: 'My parents lives in Rajshahi.', right: 'My parents live in Rajshahi.', why: l('The -s is already on "parents" (plural) → no -s on the verb.', '-s আগেই "parents"-এ আছে (plural) → verb-এ -s না।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('sva-1-p1', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'My uncle ___ a small shop in Sylhet.', options: ['has', 'have'], answer: 'has', explanation: l('One uncle = he → has.', 'একজন uncle = he → has।'), why: { have: l('"My uncle" is one person, like "he".', '"My uncle" একজন, "he"-এর মতো।') } }),
        choice('sva-1-p2', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'These apartments ___ very expensive.', options: ['are', 'is'], answer: 'are', explanation: l('These apartments = they → are.', 'These apartments = they → are।'), why: { is: l('"apartments" is plural.', '"apartments" plural।') } }),
        choice('sva-1-p3', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Task 1: choose the correct verb.', 'Task 1: সঠিক verb বেছে নিন।'), sentence: 'The line graph ___ the price of rice from 2010 to 2020.', options: ['shows', 'show', 'showing'], answer: 'shows', explanation: l('The line graph = it → shows.', 'The line graph = it → shows।'), why: { show: l('One graph → it → shows.', 'একটা graph → it → shows।'), showing: l('A sentence needs a full verb: "shows".', 'Sentence-এ পূর্ণ verb লাগে: "shows"।') } }),
        choice('sva-1-p4', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'My sister ___ like horror films.', options: ['doesn’t', 'don’t'], answer: 'doesn’t', explanation: l('she → doesn’t.', 'she → doesn’t।'), why: { 'don’t': l('"don’t" is for I / you / we / they.', '"don’t" I / you / we / they-এর জন্য।') } }),
        choice('sva-1-p5', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Does your father ___ in Dhaka?', options: ['work', 'works'], answer: 'work', explanation: l('After "does", the verb has no -s.', '"does"-এর পরে verb-এ -s না।'), why: { works: l('The -s is already in "does".', '-s আগেই "does"-এ আছে।') } }),
        choice('sva-1-p6', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Pollution ___ a serious problem in big cities.', options: ['is', 'are'], answer: 'is', explanation: l('pollution is uncountable → singular → is.', 'pollution uncountable → singular → is।'), why: { are: l('Uncountable nouns (pollution, water, information) take a singular verb.', 'Uncountable noun (pollution, water, information) singular verb নেয়।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sva-1-r1', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'My cousin ___ (study) engineering in Chattogram.', base: 'study', accepted: ['studies'], explanation: l('One cousin = he / she → studies (y → ies).', 'একজন cousin = he / she → studies (y → ies)।'), why: { study: l('One cousin → verb + s: studies.', 'একজন cousin → verb + s: studies।'), studys: l('Consonant + y → ies: studies.', 'Consonant + y → ies: studies।') } }),
        gap('sva-1-r2', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'My parents ___ (not / eat) beef.', base: 'not eat', accepted: ["don't eat", 'do not eat'], explanation: l('My parents = they → don’t eat.', 'My parents = they → don’t eat।'), why: { "doesn't eat": l('"parents" is plural → don’t.', '"parents" plural → don’t।') } }),
        correct('sva-1-r3', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'She go to the gym every morning.', accepted: ['She goes to the gym every morning.'], explanation: l('she → goes (go + es).', 'she → goes (go + es)।') }),
        spot('sva-1-r4', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('One verb is wrong. Tap it and type the right form.', 'একটা verb ভুল। সেটায় tap করে সঠিক form লিখুন।'), sentence: 'My best friend live in Canada and works as a nurse.', wrong: 'live', accepted: ['lives'], explanation: l('My best friend = he / she → lives.', 'My best friend = he / she → lives।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sva-1-c1', 'sva-basic', { ...S, prompt: l('Why "students study" but "a student studies"?', 'কেন "students study" কিন্তু "a student studies"?'), options: ['The -s goes on the noun for plural and on the verb for singular', 'Short verbs never take -s', '"study" is irregular'], answer: 'The -s goes on the noun for plural and on the verb for singular', explanation: l('One -s: on the noun (plural) OR on the verb (singular).', 'একটা -s: noun-এ (plural) অথবা verb-এ (singular)।') }),
        spot('sva-1-c2', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('One word breaks this Task 1 sentence. Tap it, then fix it.', 'একটা word Task 1 sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'The table compare the number of tourists in four countries.', wrong: 'compare', accepted: ['compares'], fixOptions: ['compares', 'comparing', 'compared'], explanation: l('The table = it → compares.', 'The table = it → compares।') }),
        choice('sva-1-c3', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Everything in my town is cheaper than in Dhaka, and the people are friendly.', 'Everything in my town are cheaper than in Dhaka, and the people is friendly.', 'Everything in my town is cheaper than in Dhaka, and the people is friendly.'], answer: 'Everything in my town is cheaper than in Dhaka, and the people are friendly.', explanation: l('"everything" is singular → is; "people" is plural → are.', '"everything" singular → is; "people" plural → are।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your family', 'এবার আপনার পালা: আপনার পরিবার'),
      exercises: [
        write('sva-1-y1', 'sva-basic', {
          ...S,
          prompt: l('Speaking Part 1: "Tell me about your family." Write 3 sentences in the present simple: one about ONE person and one about TWO or more people.', 'Speaking Part 1: "Tell me about your family." Present simple-এ ৩টা sentence লিখুন: একটা একজন মানুষ নিয়ে, আর একটা দুই বা তার বেশি মানুষ নিয়ে।'),
          model: 'My father works for a bank and he doesn’t travel much. My two sisters study at a college in Khulna. We live together in a small flat.',
          checklist: [l('one person (he / she / my father) → verb + s, has, doesn’t', 'একজন (he / she / my father) → verb + s, has, doesn’t'), l('two or more (they / my sisters) → no -s, have, don’t', 'দুই বা বেশি (they / my sisters) → -s না, have, don’t')],
          explanation: l('Find each subject, ask "one or more?", then check the verb.', 'প্রতিটা subject খুঁজুন, জিজ্ঞেস করুন "একটা নাকি একাধিক?", তারপর verb যাচাই করুন।'),
          task: 'The student writes 3 present-simple sentences about their family, with at least one singular subject and one plural subject. Check subject–verb agreement only: singular subjects (he, she, my father, my family as a unit) take verb + s / has / is / doesn’t; plural subjects and I/you/we/they take the base verb / have / are / don’t; after does/doesn’t/can the verb has no -s. For each error, name the subject and say whether it is one or more.',
          target: l('verb + s with one subject', 'একটা subject হলে verb + s'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Ask "one or more?" about the subject before you write the verb.', 'Verb লেখার আগে subject নিয়ে জিজ্ঞেস করুন "একটা নাকি একাধিক?"।'),
        l('One (he / she / it / uncountable): works, has, is, does, doesn’t · More (they / I / you / we): work, have, are, do, don’t.', 'একটা (he / she / it / uncountable): works, has, is, does, doesn’t · একাধিক (they / I / you / we): work, have, are, do, don’t।'),
        l('After does / doesn’t / can / will → base verb, no -s.', 'does / doesn’t / can / will-এর পরে → base verb, -s না।'),
      ],
    },
  ],
};

// ======================================================================= sva-2
export const svaCompound: Lesson = {
  id: 'sva-2',
  format: 'v2',
  concept: 'sva-compound',
  title: l('Two subjects: and, or, nor', 'দুটো subject: and, or, nor'),
  why: l('"My brother and I is…" and "Neither the teacher nor the students was…" appear in Speaking and Task 2 more often than you think.', '"My brother and I is…" আর "Neither the teacher nor the students was…" Speaking আর Task 2-এ ভাবার চেয়েও বেশি আসে।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Speaking Part 1: your free time', 'Speaking Part 1: অবসর সময়'),
      situation: l('You say: "My brother and I ___ cricket every Friday, but either my mother or my aunts ___ lunch for us."', 'আপনি বললেন: "My brother and I ___ cricket every Friday, but either my mother or my aunts ___ lunch for us."'),
      question: l('Which pair is correct?', 'কোন জোড়াটা ঠিক?'),
      options: ['play · cook', 'plays · cooks', 'play · cooks'],
      answer: 'play · cook',
      diagnose: {
        'play · cook': l('Right. "My brother and I" = we → play. With "either … or", the verb agrees with the NEAREST subject: "my aunts" → cook.', 'ঠিক। "My brother and I" = we → play। "either … or"-এ verb সবচেয়ে কাছের subject-এর সাথে মেলে: "my aunts" → cook।'),
        'plays · cooks': l('Two people joined by "and" are plural (= we / they) → play. And with "either … or", look at the subject nearest the verb: "my aunts" → cook.', '"and" দিয়ে জোড়া দুজন মানুষ plural (= we / they) → play। আর "either … or"-এ verb-এর সবচেয়ে কাছের subject দেখুন: "my aunts" → cook।'),
        'play · cooks': l('"play" is right. But "cooks" follows "my mother" — the verb should agree with the nearer subject, "my aunts" → cook.', '"play" ঠিক। কিন্তু "cooks" "my mother"-কে মেনেছে — verb-কে কাছের subject "my aunts"-এর সাথে মিলতে হবে → cook।'),
      },
    },
    {
      kind: 'discover',
      title: l('Look at what joins the subjects', 'Subject-গুলো কী দিয়ে জোড়া দেখুন'),
      items: [
        { en: 'Rahim and Karim live in Gazipur.', note: l('and → two people → plural', 'and → দুজন → plural') },
        { en: 'Rahim or Karim lives in Gazipur.', note: l('or → one of them → singular', 'or → দুজনের একজন → singular') },
        { en: 'Either the manager or the workers are responsible.', note: l('nearest subject: workers → are', 'কাছের subject: workers → are') },
        { en: 'Neither the workers nor the manager is responsible.', note: l('nearest subject: manager → is', 'কাছের subject: manager → is') },
      ],
      question: l('With "or / nor", which subject does the verb follow?', '"or / nor"-এ verb কোন subject-কে মানে?'),
      options: [
        l('The subject nearest to the verb', 'Verb-এর সবচেয়ে কাছের subject'),
        l('Always the first subject', 'সবসময় প্রথম subject'),
        l('Always plural, because there are two', 'সবসময় plural, কারণ দুটো আছে'),
      ],
      answer: 0,
      pattern: l('A and B → plural (like they). A or B / either A or B / neither A nor B → the verb agrees with B, the subject nearest to it.', 'A and B → plural (they-এর মতো)। A or B / either A or B / neither A nor B → verb B-এর সাথে মেলে, যেটা verb-এর সবচেয়ে কাছে।'),
    },
    {
      kind: 'concept',
      title: l('and adds; or chooses', 'and যোগ করে; or বেছে নেয়'),
      body: l(
        '"and" joins two subjects into a plural subject, so the verb is plural. "or" and "nor" choose one of them, so the verb agrees with the subject closest to it.',
        '"and" দুটো subject-কে জোড়া দিয়ে plural subject বানায়, তাই verb plural। "or" আর "nor" দুটোর একটা বেছে নেয়, তাই verb তার সবচেয়ে কাছের subject-এর সাথে মেলে।',
      ),
      points: [
        l('A and B → plural: My mother and my sister are teachers. Reading and writing take time.', 'A and B → plural: My mother and my sister are teachers। Reading and writing take time।'),
        l('One idea with two names stays singular: Rice and dal is my favourite meal. (one dish)', 'দুই নামে একটা জিনিস হলে singular: Rice and dal is my favourite meal। (একটা খাবার)'),
        l('A or B, either A or B, neither A nor B → look at B: Either my father or my brothers are coming. Neither my brothers nor my father is coming.', 'A or B, either A or B, neither A nor B → B দেখুন: Either my father or my brothers are coming। Neither my brothers nor my father is coming।'),
        l('Tip: put the plural subject last — "Neither the teacher nor the students were…" sounds most natural.', 'কৌশল: plural subject শেষে রাখুন — "Neither the teacher nor the students were…" সবচেয়ে স্বাভাবিক শোনায়।'),
        l('"as well as", "along with", "together with" do NOT add: The minister, as well as his advisers, is at the meeting. (subject = the minister)', '"as well as", "along with", "together with" যোগ করে না: The minister, as well as his advisers, is at the meeting। (subject = the minister)'),
        l('Why Bangla speakers slip: in Bangla the verb often stays the same with "আর" and "অথবা" ("রহিম আর করিম যায়", "রহিম অথবা করিম যায়"), so the singular/plural difference is not heard.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় "আর" আর "অথবা" দুটোতেই verb প্রায় একই থাকে ("রহিম আর করিম যায়", "রহিম অথবা করিম যায়"), তাই singular/plural-এর পার্থক্য কানে ধরা পড়ে না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'My mother and I usually cook together on Fridays.', note: l('two people with "and" → cook.', '"and"-এ দুজন → cook।') },
        { en: 'Tea or coffee is served after dinner.', note: l('one of them (coffee, singular) → is.', 'দুটোর একটা (coffee, singular) → is।') },
        { en: 'Neither my phone nor my laptops work without the charger.', note: l('nearest: laptops → work.', 'কাছের: laptops → work।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Both the government and individuals have a role to play.', note: l('Task 2: "both A and B" → plural.', 'Task 2: "both A and B" → plural।') },
        { skill: 'listening', example: 'Either the tutor or the students choose the topic each week.', note: l('Listening: "either … or" — the verb tells you who decides (the students).', 'Listening: "either … or" — verb শুনে বুঝবেন কে ঠিক করে (the students)।') },
        { skill: 'speaking', example: 'My friends and I often go to the river at weekends.', note: l('Part 1: "my friends and I" → go.', 'Part 1: "my friends and I" → go।') },
        { skill: 'reading', example: 'Neither the farmers nor the government was prepared for the flood.', note: l('Reading: the singular "was" tells you the last subject is the one it agrees with.', 'Reading: singular "was" বোঝায় verb শেষ subject-এর সাথে মিলেছে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'My brother and I is students.', right: 'My brother and I are students.', why: l('"My brother and I" = we → are.', '"My brother and I" = we → are।') },
        { wrong: 'Either my sisters or my mother help me.', right: 'Either my sisters or my mother helps me.', why: l('Nearest subject "my mother" (she) → helps.', 'কাছের subject "my mother" (she) → helps।') },
        { wrong: 'Health and education is important.', right: 'Health and education are important.', why: l('Two different things with "and" → are.', '"and"-এ দুটো আলাদা জিনিস → are।') },
        { wrong: 'The teacher, as well as the students, are here.', right: 'The teacher, as well as the students, is here.', why: l('"as well as" does not add: subject = the teacher → is.', '"as well as" যোগ করে না: subject = the teacher → is।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('sva-2-p1', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Dhaka and Chattogram ___ the two largest cities in Bangladesh.', options: ['are', 'is'], answer: 'are', explanation: l('Two cities with "and" → are.', '"and"-এ দুটো শহর → are।'), why: { is: l('"and" makes the subject plural.', '"and" subject-কে plural করে।') } }),
        choice('sva-2-p2', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Either my father or my uncle ___ me to the airport.', options: ['drives', 'drive'], answer: 'drives', explanation: l('Nearest subject "my uncle" (he) → drives.', 'কাছের subject "my uncle" (he) → drives।'), why: { drive: l('With "or", only one of them drives: agree with "my uncle".', '"or"-এ একজনই চালায়: "my uncle"-এর সাথে মেলান।') } }),
        choice('sva-2-p3', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Neither the teacher nor the students ___ the answer.', options: ['know', 'knows'], answer: 'know', explanation: l('Nearest subject "the students" → know.', 'কাছের subject "the students" → know।'), why: { knows: l('Look at the subject next to the verb: "students" (plural).', 'Verb-এর পাশের subject দেখুন: "students" (plural)।') } }),
        choice('sva-2-p4', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'The principal, along with two teachers, ___ the students every morning.', options: ['greets', 'greet'], answer: 'greets', explanation: l('"along with" does not add: the principal → greets.', '"along with" যোগ করে না: the principal → greets।'), why: { greet: l('The real subject is "the principal" (one person).', 'আসল subject "the principal" (একজন)।') } }),
        choice('sva-2-p5', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Task 2: choose the correct verb.', 'Task 2: সঠিক verb বেছে নিন।'), sentence: 'Both parents and schools ___ responsible for children’s behaviour.', options: ['are', 'is'], answer: 'are', explanation: l('"both A and B" → plural → are.', '"both A and B" → plural → are।'), why: { is: l('"parents and schools" = two groups joined by "and" → plural.', '"parents and schools" = "and" দিয়ে জোড়া দুটো দল → plural।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sva-2-r1', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Write is or are.', 'is বা are লিখুন।'), sentence: 'My laptop and my phone ___ both very old.', accepted: ['are'], explanation: l('Two things with "and" → are.', '"and"-এ দুটো জিনিস → are।'), why: { is: l('"and" joins two things → plural.', '"and" দুটো জিনিস জোড়া দেয় → plural।') } }),
        gap('sva-2-r2', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'Neither my brothers nor my sister ___ (speak) French.', base: 'speak', accepted: ['speaks'], explanation: l('Nearest subject "my sister" (she) → speaks.', 'কাছের subject "my sister" (she) → speaks।'), why: { speak: l('The subject next to the verb is "my sister" — one person.', 'Verb-এর পাশের subject "my sister" — একজন।') } }),
        correct('sva-2-r3', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'My friend and I plays football on Fridays.', accepted: ['My friend and I play football on Fridays.'], explanation: l('"My friend and I" = we → play.', '"My friend and I" = we → play।') }),
        spot('sva-2-r4', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('One verb is wrong. Tap it and type the right form.', 'একটা verb ভুল। সেটায় tap করে সঠিক form লিখুন।'), sentence: 'The mayor, together with her team, are visiting the flooded area.', wrong: 'are', accepted: ['is'], explanation: l('"together with" does not add: the mayor → is.', '"together with" যোগ করে না: the mayor → is।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sva-2-c1', 'sva-compound', { ...S, prompt: l('Why "Rice and dal is my favourite meal"?', 'কেন "Rice and dal is my favourite meal"?'), options: ['Rice and dal is one dish here', 'Food is always singular', '"and" never makes a plural'], answer: 'Rice and dal is one dish here', explanation: l('Two names for ONE thing → singular.', 'একটা জিনিসের দুই নাম → singular।') }),
        choice('sva-2-c2', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Neither the bus nor the trains run on time.', 'Neither the bus nor the trains runs on time.', 'Neither the bus nor the trains is running on time.'], answer: 'Neither the bus nor the trains run on time.', explanation: l('Nearest subject "the trains" → run.', 'কাছের subject "the trains" → run।') }),
        spot('sva-2-c3', 'sva-compound', { ...S, pattern: 'sva-compound', sentence: 'Unemployment and crime is rising in many cities.', wrong: 'is', accepted: ['are'], fixOptions: ['are', 'was', 'be'], explanation: l('Two problems with "and" → are rising.', '"and"-এ দুটো সমস্যা → are rising।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: people you spend time with', 'এবার আপনার পালা: যাদের সাথে সময় কাটান'),
      exercises: [
        write('sva-2-y1', 'sva-compound', {
          ...S,
          prompt: l('Speaking Part 1: "Who do you spend your free time with?" Write 2–3 sentences. Use one subject with "and" and one with "either … or" or "neither … nor".', 'Speaking Part 1: "Who do you spend your free time with?" ২–৩টা sentence লিখুন। একটা subject "and" দিয়ে, আর একটা "either … or" বা "neither … nor" দিয়ে।'),
          model: 'My cousin and I watch football together every weekend. Either my uncle or my friends take us to the stadium. Neither my parents nor my sister likes football.',
          checklist: [l('A and B → plural verb (watch, are, have)', 'A and B → plural verb (watch, are, have)'), l('either / neither … or / nor → agree with the nearer subject', 'either / neither … or / nor → কাছের subject-এর সাথে মেলান')],
          explanation: l('For "or / nor", read only the second subject and the verb together.', '"or / nor"-এ শুধু দ্বিতীয় subject আর verb একসাথে পড়ুন।'),
          task: 'The student writes 2–3 sentences about who they spend free time with, using a compound subject with "and" and one with "either … or" / "neither … nor". Check subject–verb agreement only: A and B → plural; A or B / either…or / neither…nor → agree with the nearer subject; "as well as / along with / together with" do not change the subject. For each error, name the subject the verb must agree with.',
          target: l('agreement with two subjects', 'দুটো subject-এর সাথে agreement'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('A and B → plural (My brother and I are…).', 'A and B → plural (My brother and I are…)।'),
        l('or / either … or / neither … nor → agree with the nearer subject (Neither my parents nor my sister likes…).', 'or / either … or / neither … nor → কাছের subject-এর সাথে মেলান (Neither my parents nor my sister likes…)।'),
        l('as well as / along with / together with → the first subject decides.', 'as well as / along with / together with → প্রথম subject ঠিক করে।'),
      ],
    },
  ],
};

// ======================================================================= sva-3
export const svaIndefinite: Lesson = {
  id: 'sva-3',
  format: 'v2',
  concept: 'sva-indefinite',
  title: l('everyone, each, every and group nouns', 'everyone, each, every আর group noun'),
  why: l('"Everyone have a phone" and "Each of the students have…" — Task 2 generalisations often break here.', '"Everyone have a phone" আর "Each of the students have…" — Task 2-এর সাধারণ বক্তব্য প্রায়ই এখানেই ভাঙে।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Task 2: a general statement', 'Task 2: একটা সাধারণ বক্তব্য'),
      situation: l('You write: "Nowadays, everyone ___ a smartphone, and each of my classmates ___ at least two social media accounts."', 'আপনি লিখলেন: "Nowadays, everyone ___ a smartphone, and each of my classmates ___ at least two social media accounts."'),
      question: l('Which pair is correct?', 'কোন জোড়াটা ঠিক?'),
      options: ['have · have', 'has · has', 'has · have'],
      answer: 'has · has',
      diagnose: {
        'have · have': l('Very common! "everyone" MEANS all people, but grammatically it is singular — like "every one person". So: everyone has. And "each of my classmates" = each one → has.', 'খুব common! "everyone" অর্থে সবাই, কিন্তু grammar-এ singular — যেন "প্রতিটা একজন মানুষ"। তাই: everyone has। আর "each of my classmates" = প্রত্যেকে একজন করে → has।'),
        'has · has': l('Right. everyone → singular → has. each of + plural noun → still "each" (one) → has.', 'ঠিক। everyone → singular → has। each of + plural noun → তবুও "each" (একজন) → has।'),
        'has · have': l('"everyone has" is right. But the subject of the second part is "each", not "classmates": each (one) → has.', '"everyone has" ঠিক। কিন্তু দ্বিতীয় অংশের subject "each", "classmates" না: each (একজন) → has।'),
      },
    },
    {
      kind: 'discover',
      title: l('Singular words that feel plural', 'যে singular word-গুলো plural মনে হয়'),
      items: [
        { en: 'Everybody wants a good job.', note: l('every- / any- / some- / no- + body / one / thing → singular', 'every- / any- / some- / no- + body / one / thing → singular') },
        { en: 'Each student gets a certificate. · Each of the students gets a certificate.', note: l('each (+ of) → singular', 'each (+ of) → singular') },
        { en: 'Every city has its own problems.', note: l('every + singular noun → singular', 'every + singular noun → singular') },
        { en: 'Neither of the answers is correct.', note: l('either / neither (of) → singular in formal writing', 'either / neither (of) → formal লেখায় singular') },
      ],
      question: l('What do these subjects have in common?', 'এই subject-গুলোর মিল কোথায়?'),
      options: [
        l('They look at people one by one, so the verb is singular', 'এগুলো মানুষকে একজন একজন করে দেখে, তাই verb singular'),
        l('They all mean many people, so the verb is plural', 'এগুলোর সবগুলোর মানে অনেক মানুষ, তাই verb plural'),
        l('They never take a verb', 'এগুলো কখনো verb নেয় না'),
      ],
      answer: 0,
      pattern: l('everyone / everybody / everything / someone / nobody / each / every / either / neither → singular verb: has, is, wants.', 'everyone / everybody / everything / someone / nobody / each / every / either / neither → singular verb: has, is, wants।'),
    },
    {
      kind: 'concept',
      title: l('One by one → singular', 'একজন একজন করে → singular'),
      body: l(
        'Words that look at people or things one at a time are grammatically singular, even when they mean "all". Group nouns (family, government, team) usually take a singular verb when we mean the group as one unit.',
        'যে word-গুলো মানুষ বা জিনিসকে একটা একটা করে দেখে, সেগুলো grammar-এ singular — অর্থ "সবাই" হলেও। Group noun (family, government, team) সাধারণত singular verb নেয়, যখন দলটাকে একটা একক হিসেবে বোঝাই।',
      ),
      points: [
        l('everyone, everybody, everything, someone, somebody, something, anyone, nobody, nothing → singular: Everyone knows… Nothing is…', 'everyone, everybody, everything, someone, somebody, something, anyone, nobody, nothing → singular: Everyone knows… Nothing is…'),
        l('each / every + noun → singular: Each child needs… Every student has…  each of + plural → still singular: Each of the children needs…', 'each / every + noun → singular: Each child needs… Every student has…  each of + plural → তবুও singular: Each of the children needs…'),
        l('either / neither (of) → singular in IELTS writing: Neither of the options is perfect.', 'either / neither (of) → IELTS লেখায় singular: Neither of the options is perfect।'),
        l('Group nouns as one unit → singular: The government has introduced a new law. My family lives in Bogura. (British English sometimes uses plural — singular is always safe.)', 'Group noun একটা একক হিসেবে → singular: The government has introduced a new law। My family lives in Bogura। (British English-এ কখনো plural চলে — singular সবসময় নিরাপদ।)'),
        l('But: "people", "police", "children" are always plural: People are… The police are…', 'কিন্তু: "people", "police", "children" সবসময় plural: People are… The police are…'),
        l('Why Bangla speakers slip: "সবাই" and "সবার" feel plural, so "everyone" gets a plural verb. Think "every ONE".', 'বাংলাভাষীরা কেন ভুল করে: "সবাই" আর "সবার" plural মনে হয়, তাই "everyone"-এর সাথে plural verb বসে যায়। ভাবুন "every ONE"।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'Everyone in my village knows my grandfather.', note: l('everyone → knows.', 'everyone → knows।') },
        { en: 'Each of these phones costs more than 50,000 taka.', note: l('each of + plural → costs.', 'each of + plural → costs।') },
        { en: 'The police are looking for the driver.', note: l('police is always plural → are.', 'police সবসময় plural → are।') },
        { en: 'Nobody likes waiting in traffic.', note: l('nobody → likes.', 'nobody → likes।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'listening', example: 'Everyone on the tour needs a ticket, and each group has a guide.', note: l('Listening: "needs" and "has" — short -s sounds after everyone / each.', 'Listening: "needs" আর "has" — everyone / each-এর পরে ছোট -s sound।') },
        { skill: 'writing', example: 'The government needs to invest more in public transport.', note: l('Task 2: government as one unit → needs.', 'Task 2: একক হিসেবে government → needs।') },
        { skill: 'speaking', example: 'Everybody in my family loves fish curry.', note: l('Part 1: "everybody" → loves.', 'Part 1: "everybody" → loves।') },
        { skill: 'reading', example: 'Neither of the proposals was accepted.', note: l('Reading: "neither … was" means both were rejected — a common True/False detail.', 'Reading: "neither … was" মানে দুটোই বাতিল — True/False-এর common detail।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Everyone have their own opinion.', right: 'Everyone has their own opinion.', why: l('everyone → singular → has. ("their" is fine.)', 'everyone → singular → has। ("their" ঠিক আছে।)') },
        { wrong: 'Each of the students have a locker.', right: 'Each of the students has a locker.', why: l('The subject is "each" → has.', 'Subject "each" → has।') },
        { wrong: 'Every people want peace.', right: 'Everyone wants peace. / All people want peace.', why: l('every + singular noun only: every person / everyone.', 'every-এর পরে শুধু singular noun: every person / everyone।') },
        { wrong: 'The police is investigating the case.', right: 'The police are investigating the case.', why: l('police is always plural.', 'police সবসময় plural।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('sva-3-p1', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Everybody in my class ___ to pass the IELTS test.', options: ['wants', 'want'], answer: 'wants', explanation: l('everybody → singular → wants.', 'everybody → singular → wants।'), why: { want: l('"everybody" means all, but it is grammatically singular.', '"everybody" অর্থে সবাই, কিন্তু grammar-এ singular।') } }),
        choice('sva-3-p2', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Each of the rooms ___ a balcony.', options: ['has', 'have'], answer: 'has', explanation: l('each of + plural → singular → has.', 'each of + plural → singular → has।'), why: { have: l('The subject is "each", not "rooms".', 'Subject "each", "rooms" না।') } }),
        choice('sva-3-p3', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'The police ___ the road after the accident.', options: ['closed', 'closes', 'has closed'], answer: 'closed', explanation: l('police is plural; the past simple "closed" works for any subject.', 'police plural; past simple "closed" যেকোনো subject-এ চলে।'), why: { closes: l('"police" is plural, so no -s.', '"police" plural, তাই -s না।'), 'has closed': l('"police" is plural → have closed.', '"police" plural → have closed।') } }),
        choice('sva-3-p4', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Task 2: choose the correct verb.', 'Task 2: সঠিক verb বেছে নিন।'), sentence: 'Nobody in my building ___ a car.', options: ['owns', 'own'], answer: 'owns', explanation: l('nobody → singular → owns.', 'nobody → singular → owns।'), why: { own: l('nobody / somebody / everybody are singular, like "he".', 'nobody / somebody / everybody singular, "he"-এর মতো।') } }),
        choice('sva-3-p5', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Choose the correct sentence.', 'সঠিক sentence বেছে নিন।'), options: ['Every student has to wear a uniform.', 'Every students have to wear a uniform.', 'Every student have to wear a uniform.'], answer: 'Every student has to wear a uniform.', explanation: l('every + singular noun + singular verb.', 'every + singular noun + singular verb।'), why: { 'Every students have to wear a uniform.': l('"every" is followed by a singular noun: every student.', '"every"-এর পরে singular noun বসে: every student।'), 'Every student have to wear a uniform.': l('"every student" is singular → has.', '"every student" singular → has।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sva-3-r1', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Write is or are.', 'is বা are লিখুন।'), sentence: 'Nothing ___ more important than your health.', accepted: ['is'], explanation: l('nothing → singular → is.', 'nothing → singular → is।'), why: { are: l('"nothing" is singular.', '"nothing" singular।') } }),
        gap('sva-3-r2', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'Neither of my brothers ___ (drive).', base: 'drive', accepted: ['drives'], explanation: l('neither of + plural → singular → drives.', 'neither of + plural → singular → drives।'), why: { drive: l('The subject is "neither" (not one of them) → singular.', 'Subject "neither" (দুজনের কেউই না) → singular।') } }),
        correct('sva-3-r3', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'Everyone in my family love mangoes.', accepted: ['Everyone in my family loves mangoes.'], explanation: l('everyone → loves.', 'everyone → loves।') }),
        spot('sva-3-r4', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('One verb is wrong. Tap it and type the right form.', 'একটা verb ভুল। সেটায় tap করে সঠিক form লিখুন।'), sentence: 'Each of the new buses carry about fifty passengers.', wrong: 'carry', accepted: ['carries'], explanation: l('each of + plural → singular → carries.', 'each of + plural → singular → carries।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sva-3-c1', 'sva-indefinite', { ...S, prompt: l('Why "Everyone has their own opinion" and not "Everyone have"?', 'কেন "Everyone has their own opinion", "Everyone have" না?'), options: ['"everyone" is grammatically singular; "their" can refer back to it', '"their" makes the verb singular', '"opinion" is singular'], answer: '"everyone" is grammatically singular; "their" can refer back to it', explanation: l('Singular verb, but "their" is the natural pronoun for everyone.', 'Singular verb, কিন্তু everyone-এর জন্য "their" স্বাভাবিক pronoun।') }),
        choice('sva-3-c2', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['People are more careful about health, and every hospital has a waiting list.', 'People is more careful about health, and every hospital have a waiting list.', 'People are more careful about health, and every hospitals has a waiting list.'], answer: 'People are more careful about health, and every hospital has a waiting list.', explanation: l('people → are; every hospital → has.', 'people → are; every hospital → has।') }),
        spot('sva-3-c3', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', sentence: 'Somebody have left a bag on the bus.', wrong: 'have', accepted: ['has'], fixOptions: ['has', 'had been', 'are'], explanation: l('somebody → singular → has left.', 'somebody → singular → has left।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: people in your country', 'এবার আপনার পালা: আপনার দেশের মানুষ'),
      exercises: [
        write('sva-3-y1', 'sva-indefinite', {
          ...S,
          prompt: l('Task 2 style: write 2–3 sentences about technology in daily life. Use at least two of: everyone, each, every, nobody, the government.', 'Task 2-এর ধাঁচে: দৈনন্দিন জীবনে technology নিয়ে ২–৩টা sentence লিখুন। অন্তত দুটো ব্যবহার করুন: everyone, each, every, nobody, the government।'),
          model: 'Nowadays almost everyone owns a smartphone, and every student uses the internet for homework. The government has started to teach basic coding in schools.',
          checklist: [l('everyone / nobody / each / every → singular verb (owns, uses, has)', 'everyone / nobody / each / every → singular verb (owns, uses, has)'), l('the government / my family as one unit → singular', 'একক হিসেবে the government / my family → singular')],
          explanation: l('Think "every ONE", "each ONE".', 'ভাবুন "every ONE", "each ONE"।'),
          task: 'The student writes 2–3 Task-2-style sentences about technology, using words like everyone, each, every, nobody or the government. Check agreement only: everyone/everybody/everything/someone/nobody/nothing/each/every/either/neither → singular verb; each of + plural → singular; group nouns as a unit (government, family, team) → singular is correct; people/police/children → plural. For each error, name the subject word and why it is singular or plural.',
          target: l('singular with everyone / each / every', 'everyone / each / every-এর সাথে singular'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('everyone / nobody / something / each / every / either / neither → singular (has, is, needs).', 'everyone / nobody / something / each / every / either / neither → singular (has, is, needs)।'),
        l('each of + plural noun → still singular: Each of the students has…', 'each of + plural noun → তবুও singular: Each of the students has…'),
        l('the government / my family → singular; people / police / children → plural.', 'the government / my family → singular; people / police / children → plural।'),
      ],
    },
  ],
};

// ======================================================================= sva-4
export const svaLongSubjects: Lesson = {
  id: 'sva-4',
  format: 'v2',
  concept: 'sva-long',
  title: l('Long subjects: find the real subject', 'লম্বা subject: আসল subject খুঁজুন'),
  why: l('Band 6+ sentences have long subjects — and the verb often follows the wrong noun: "The quality of the roads are poor."', 'Band 6+-এর sentence-এ লম্বা subject থাকে — আর verb প্রায়ই ভুল noun-কে মানে: "The quality of the roads are poor."'),
  minutes: 12,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Task 2: a longer sentence', 'Task 2: একটা লম্বা sentence'),
      situation: l('You write: "The quality of the roads in most villages ___ very poor, and students who live far from school ___ a long way every day."', 'আপনি লিখলেন: "The quality of the roads in most villages ___ very poor, and students who live far from school ___ a long way every day."'),
      question: l('Which pair is correct?', 'কোন জোড়াটা ঠিক?'),
      options: ['are · walks', 'is · walk', 'is · walks'],
      answer: 'is · walk',
      diagnose: {
        'are · walks': l('The verb followed the nearest nouns ("villages", "school"). But the real subjects are "the quality" (it → is) and "students" (they → walk).', 'Verb কাছের noun-কে ("villages", "school") মেনেছে। কিন্তু আসল subject "the quality" (it → is) আর "students" (they → walk)।'),
        'is · walk': l('Right. Remove the extra words: "The quality … is" and "Students … walk".', 'ঠিক। বাড়তি word সরিয়ে দিন: "The quality … is" আর "Students … walk"।'),
        'is · walks': l('"is" is right. In the second part, "who live far from school" describes "students", and students → walk (no -s).', '"is" ঠিক। দ্বিতীয় অংশে "who live far from school" "students"-কে বর্ণনা করছে, আর students → walk (-s না)।'),
      },
    },
    {
      kind: 'discover',
      title: l('Cover the middle', 'মাঝের অংশ ঢেকে দিন'),
      items: [
        { en: 'The price of vegetables has risen.', note: l('The price [of vegetables] has risen.', 'The price [of vegetables] has risen।') },
        { en: 'One of my friends lives in London.', note: l('One [of my friends] lives.', 'One [of my friends] lives।') },
        { en: 'The students in the back row are talking.', note: l('The students [in the back row] are.', 'The students [in the back row] are।') },
        { en: 'The man who owns these shops is my uncle.', note: l('The man [who owns these shops] is.', 'The man [who owns these shops] is।') },
      ],
      question: l('How do you find the verb’s real subject?', 'Verb-এর আসল subject কীভাবে খুঁজবেন?'),
      options: [
        l('Remove the phrase after the main noun (of…, in…, who…) and check the main noun', 'Main noun-এর পরের phrase (of…, in…, who…) সরিয়ে main noun দেখুন'),
        l('Use the noun just before the verb', 'Verb-এর ঠিক আগের noun ব্যবহার করুন'),
        l('Use the first word of the sentence, always', 'সবসময় sentence-এর প্রথম word ব্যবহার করুন'),
      ],
      answer: 0,
      pattern: l('Bracket everything between the main noun and the verb (of…, in…, with…, who / which / that…). The verb agrees with the main noun, not with the noun beside it.', 'Main noun আর verb-এর মাঝের সবকিছু bracket করুন (of…, in…, with…, who / which / that…)। Verb main noun-এর সাথে মেলে, পাশের noun-এর সাথে না।'),
    },
    {
      kind: 'concept',
      title: l('The main noun decides', 'Main noun-ই ঠিক করে'),
      body: l(
        'A long subject has one main noun plus extra words that describe it. Those extra words never change the verb. Find the main noun, then ask "one or more?".',
        'লম্বা subject-এ একটা main noun থাকে, আর তাকে বর্ণনা করা কিছু বাড়তি word। বাড়তি word কখনো verb বদলায় না। Main noun খুঁজুন, তারপর জিজ্ঞেস করুন "একটা নাকি একাধিক?"।',
      ),
      points: [
        l('Noun + of-phrase: The cost of houses is… The causes of the problem are…', 'Noun + of-phrase: The cost of houses is… The causes of the problem are…'),
        l('Noun + place / with-phrase: The shops on this road close early. A box with ten books is heavy.', 'Noun + জায়গা / with-phrase: The shops on this road close early। A box with ten books is heavy।'),
        l('One of + plural noun → singular: One of the main reasons is cost. (not "are")', 'One of + plural noun → singular: One of the main reasons is cost। ("are" না)'),
        l('who / which / that clauses: the verb INSIDE the clause agrees with the noun before "who / which": students who live… · a student who lives… Then the main verb agrees with the main noun.', 'who / which / that clause: clause-এর ভিতরের verb "who / which"-এর আগের noun-এর সাথে মেলে: students who live… · a student who lives… তারপর main verb main noun-এর সাথে মেলে।'),
        l('-ing subjects are singular: Learning languages is useful. Using public transport saves money.', '-ing subject singular: Learning languages is useful। Using public transport saves money।'),
        l('Why Bangla speakers slip: in Bangla the verb comes at the very end, and the nearest word feels like the subject. In long English subjects, the nearest noun is often NOT the subject.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় verb একদম শেষে আসে, আর পাশের word-টাকেই subject মনে হয়। লম্বা English subject-এ পাশের noun প্রায়ই subject না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'The number of cars on our roads is growing every year.', note: l('main noun: number → is.', 'main noun: number → is।') },
        { en: 'One of my teachers speaks four languages.', note: l('one of … → speaks.', 'one of … → speaks।') },
        { en: 'People who exercise regularly sleep better.', note: l('people (who exercise) → sleep.', 'people (who exercise) → sleep।') },
        { en: 'Reading English newspapers improves your vocabulary.', note: l('-ing subject → improves.', '-ing subject → improves।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'The consumption of fast food in Western countries has doubled.', note: l('Task 1: "the consumption … has".', 'Task 1: "the consumption … has"।') },
        { skill: 'listening', example: 'The room with the two computers is on the second floor.', note: l('Listening (maps): the room (not computers) → is.', 'Listening (map): the room (computers না) → is।') },
        { skill: 'speaking', example: 'The people who live in my building are very friendly.', note: l('Part 2 description: people (who live…) are.', 'Part 2 বর্ণনা: people (who live…) are।') },
        { skill: 'reading', example: 'The impact of these policies on farmers remains unclear.', note: l('Reading: find the main noun ("impact") to understand what "remains unclear".', 'Reading: main noun ("impact") খুঁজলে বোঝা যায় কী "remains unclear"।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The price of flats in Dhaka are very high.', right: 'The price of flats in Dhaka is very high.', why: l('main noun: price → is.', 'main noun: price → is।') },
        { wrong: 'One of the biggest problems are traffic.', right: 'One of the biggest problems is traffic.', why: l('One of … → is.', 'One of … → is।') },
        { wrong: 'A student who study hard pass easily.', right: 'A student who studies hard passes easily.', why: l('a student (one) → studies, passes.', 'a student (একজন) → studies, passes।') },
        { wrong: 'Using mobile phones in class are not allowed.', right: 'Using mobile phones in class is not allowed.', why: l('-ing subject → is.', '-ing subject → is।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('sva-4-p1', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'The colour of the walls ___ too dark.', options: ['is', 'are'], answer: 'is', explanation: l('main noun: colour → is.', 'main noun: colour → is।'), why: { are: l('"walls" is inside "of the walls" — the main noun is "colour".', '"walls" "of the walls"-এর ভিতরে — main noun "colour"।') } }),
        choice('sva-4-p2', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'One of my classmates ___ a scholarship to Japan.', options: ['has won', 'have won'], answer: 'has won', explanation: l('One of … → has.', 'One of … → has।'), why: { 'have won': l('The subject is "one" (one classmate).', 'Subject "one" (একজন classmate)।') } }),
        choice('sva-4-p3', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'The books on the top shelf ___ to my brother.', options: ['belong', 'belongs'], answer: 'belong', explanation: l('main noun: books → belong.', 'main noun: books → belong।'), why: { belongs: l('"shelf" is in the place phrase; "books" is the subject.', '"shelf" জায়গার phrase-এ; subject "books"।') } }),
        choice('sva-4-p4', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Choose the correct verb for the "who" clause.', '"who" clause-এর জন্য সঠিক verb বেছে নিন।'), sentence: 'I have a friend who ___ in a hospital.', options: ['works', 'work'], answer: 'works', explanation: l('a friend (one) who → works.', 'a friend (একজন) who → works।'), why: { work: l('"who" refers to "a friend" — one person.', '"who" মানে "a friend" — একজন।') } }),
        choice('sva-4-p5', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Task 2: choose the correct verb.', 'Task 2: সঠিক verb বেছে নিন।'), sentence: 'Living in big cities ___ many advantages.', options: ['has', 'have'], answer: 'has', explanation: l('-ing subject → singular → has.', '-ing subject → singular → has।'), why: { have: l('The subject is the activity "living" (one idea), not "cities".', 'Subject হলো "living" কাজটা (একটা ধারণা), "cities" না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sva-4-r1', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Write is or are.', 'is বা are লিখুন।'), sentence: 'The main cause of these accidents ___ careless driving.', accepted: ['is'], explanation: l('main noun: cause → is.', 'main noun: cause → is।'), why: { are: l('"accidents" is inside "of these accidents".', '"accidents" "of these accidents"-এর ভিতরে।') } }),
        gap('sva-4-r2', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'Students who ___ (live) in dormitories save money on transport.', base: 'live', accepted: ['live'], explanation: l('students (they) who → live.', 'students (they) who → live।'), why: { lives: l('"who" refers to "students" — plural.', '"who" মানে "students" — plural।') } }),
        correct('sva-4-r3', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'One of the reasons are the high cost of fuel.', accepted: ['One of the reasons is the high cost of fuel.'], explanation: l('One of … → is.', 'One of … → is।') }),
        spot('sva-4-r4', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('One verb is wrong. Tap it and type the right form.', 'একটা verb ভুল। সেটায় tap করে সঠিক form লিখুন।'), sentence: 'The quality of the hospitals in rural areas need to improve.', wrong: 'need', accepted: ['needs'], explanation: l('main noun: quality → needs.', 'main noun: quality → needs।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sva-4-c1', 'sva-long', { ...S, prompt: l('In "The effects of social media on teenagers are worrying", what is the subject?', '"The effects of social media on teenagers are worrying"-এ subject কোনটা?'), options: ['The effects', 'social media', 'teenagers'], answer: 'The effects', explanation: l('The effects [of social media on teenagers] are.', 'The effects [of social media on teenagers] are।') }),
        spot('sva-4-c2', 'sva-long', { ...S, pattern: 'sva-long-subject', sentence: 'The amount of plastic in the oceans are increasing rapidly.', wrong: 'are', accepted: ['is'], fixOptions: ['is', 'were', 'be'], explanation: l('main noun: amount → is increasing.', 'main noun: amount → is increasing।') }),
        choice('sva-4-c3', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The teacher who teaches us maths lives next door.', 'The teacher who teach us maths live next door.', 'The teacher who teaches us maths live next door.'], answer: 'The teacher who teaches us maths lives next door.', explanation: l('teacher (one) → who teaches → lives.', 'teacher (একজন) → who teaches → lives।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: problems in your city', 'এবার আপনার পালা: আপনার শহরের সমস্যা'),
      exercises: [
        write('sva-4-y1', 'sva-long', {
          ...S,
          prompt: l('Task 2: write 2–3 sentences about a problem in your city. Use one "of" phrase (the cost of…, the number of…), one "One of the…" and one "who / which" clause.', 'Task 2: আপনার শহরের একটা সমস্যা নিয়ে ২–৩টা sentence লিখুন। একটা "of" phrase (the cost of…, the number of…), একটা "One of the…" আর একটা "who / which" clause ব্যবহার করুন।'),
          model: 'One of the biggest problems in Dhaka is traffic. The number of private cars on the roads is growing, and people who travel to work spend hours in jams.',
          checklist: [l('bracket the phrase and find the main noun', 'phrase bracket করে main noun খুঁজুন'), l('One of the … → is / has', 'One of the … → is / has'), l('who / which → agrees with the noun before it', 'who / which → আগের noun-এর সাথে মেলে')],
          explanation: l('Cover the words between the main noun and the verb, then read them together.', 'Main noun আর verb-এর মাঝের word ঢেকে দিয়ে দুটো একসাথে পড়ুন।'),
          task: 'The student writes 2–3 Task 2 sentences about a problem in their city with an of-phrase subject, a "One of the …" subject and a who/which clause. Check agreement only: the main verb agrees with the head noun of a long subject (not the nearest noun); "One of the + plural" → singular verb; the verb inside a who/which/that clause agrees with the noun before it; -ing subjects are singular. For each error, name the head noun and show the bracketed phrase.',
          target: l('agreement with long subjects', 'লম্বা subject-এর সাথে agreement'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Bracket the middle: The price [of flats in Dhaka] is…', 'মাঝের অংশ bracket করুন: The price [of flats in Dhaka] is…'),
        l('One of the + plural → singular verb.', 'One of the + plural → singular verb।'),
        l('who / which → agrees with the noun before it; -ing subjects → singular.', 'who / which → আগের noun-এর সাথে মেলে; -ing subject → singular।'),
      ],
    },
  ],
};

// ======================================================================= sva-5
export const svaQuantity: Lesson = {
  id: 'sva-5',
  format: 'v2',
  concept: 'sva-quantity',
  title: l('Amounts and numbers', 'পরিমাণ আর সংখ্যা'),
  why: l('Task 1 is full of "the number of…", "a number of…", "40% of…" and "there is / are" — each has its own agreement rule.', 'Task 1-এ "the number of…", "a number of…", "40% of…" আর "there is / are" ভরা — প্রতিটার আলাদা agreement নিয়ম।'),
  minutes: 12,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('Task 1: describing a chart', 'Task 1: একটা chart বর্ণনা'),
      situation: l('You write: "The number of international students ___ in 2015, and a number of universities ___ new courses."', 'আপনি লিখলেন: "The number of international students ___ in 2015, and a number of universities ___ new courses."'),
      question: l('Which pair is correct?', 'কোন জোড়াটা ঠিক?'),
      options: ['was rising · has opened', 'rose · have opened', 'were rising · has opened'],
      answer: 'rose · have opened',
      diagnose: {
        'was rising · has opened': l('"a number of universities" means "several universities" → plural → have opened.', '"a number of universities" মানে "কয়েকটা university" → plural → have opened।'),
        'rose · have opened': l('Right. "The number of…" is one figure (singular), and the past simple "rose" fits. "A number of…" = several → plural → have opened.', 'ঠিক। "The number of…" একটা সংখ্যা (singular), আর past simple "rose" মানায়। "A number of…" = কয়েকটা → plural → have opened।'),
        'were rising · has opened': l('Reversed! "The number of…" is ONE figure → singular (it rose). "A number of…" = several → plural (they have opened).', 'উল্টো হয়ে গেছে! "The number of…" একটা সংখ্যা → singular (it rose)। "A number of…" = কয়েকটা → plural (they have opened)।'),
      },
    },
    {
      kind: 'discover',
      title: l('Look at what follows "of"', '"of"-এর পরে কী আছে দেখুন'),
      items: [
        { en: 'The number of cars has doubled. · A number of cars were damaged.', note: l('the number = one figure; a number = several', 'the number = একটা সংখ্যা; a number = কয়েকটা') },
        { en: '40% of the students live on campus. · 40% of the land is farmland.', note: l('students (plural) → live; land (uncountable) → is', 'students (plural) → live; land (uncountable) → is') },
        { en: 'There is a park. · There are two parks. · There is some traffic.', note: l('the noun after is / are decides', 'is / are-এর পরের noun ঠিক করে') },
        { en: 'Five hundred taka is enough. · Two years is a long time.', note: l('one amount of money / time → singular', 'টাকা / সময়ের একটা পরিমাণ → singular') },
      ],
      question: l('With "40% of…", "most of…", "half of…", what decides the verb?', '"40% of…", "most of…", "half of…"-এ verb কী ঠিক করে?'),
      options: [
        l('The noun after "of": plural noun → plural verb; uncountable / singular noun → singular verb', '"of"-এর পরের noun: plural noun → plural verb; uncountable / singular noun → singular verb'),
        l('Percentages are always singular', 'Percentage সবসময় singular'),
        l('Percentages are always plural', 'Percentage সবসময় plural'),
      ],
      answer: 0,
      pattern: l('the number of → singular; a number of → plural. %, half, most, some, all, a lot of + noun → follow that noun. there is / are → follow the noun after it. One amount of money, time or distance → singular.', 'the number of → singular; a number of → plural। %, half, most, some, all, a lot of + noun → সেই noun-কে মানে। there is / are → পরের noun-কে মানে। টাকা, সময় বা দূরত্বের একটা পরিমাণ → singular।'),
    },
    {
      kind: 'concept',
      title: l('Rules for amounts', 'পরিমাণের নিয়ম'),
      body: l(
        'With amounts, first ask: is the subject ONE figure or amount, or is it the things themselves? "The number of" and sums of money are one figure; "a number of", "percent of", "most of" point to the things after "of".',
        'পরিমাণের ক্ষেত্রে আগে জিজ্ঞেস করুন: subject কি একটা সংখ্যা বা পরিমাণ, নাকি জিনিসগুলোই? "The number of" আর টাকার অঙ্ক একটা সংখ্যা; "a number of", "percent of", "most of" "of"-এর পরের জিনিসগুলোকে বোঝায়।',
      ),
      points: [
        l('The number of + plural → singular verb: The number of tourists has increased.', 'The number of + plural → singular verb: The number of tourists has increased।'),
        l('A number of + plural → plural verb (= several): A number of problems remain.', 'A number of + plural → plural verb (= কয়েকটা): A number of problems remain।'),
        l('Percent / half / most / some / all / a lot of / the majority of + noun: 60% of people own a car. 60% of the money was spent. Most of the water is polluted.', 'Percent / half / most / some / all / a lot of / the majority of + noun: 60% of people own a car। 60% of the money was spent। Most of the water is polluted।'),
        l('there is + singular / uncountable; there are + plural: There is a lot of pollution. There are many reasons.', 'there is + singular / uncountable; there are + plural: There is a lot of pollution। There are many reasons।'),
        l('One amount of money, time, distance → singular: Ten thousand taka is not much. Five kilometres is too far to walk.', 'টাকা, সময়, দূরত্বের একটা পরিমাণ → singular: Ten thousand taka is not much। Five kilometres is too far to walk।'),
        l('Why Bangla speakers slip: "অনেক", "বেশিরভাগ", "৪০%" don’t change the Bangla verb, and "সংখ্যা" feels plural when it is followed by many things. Decide: one figure, or the things?', 'বাংলাভাষীরা কেন ভুল করে: "অনেক", "বেশিরভাগ", "৪০%"-এ বাংলা verb বদলায় না, আর অনেক জিনিসের "সংখ্যা" plural মনে হয়। ঠিক করুন: একটা সংখ্যা, নাকি জিনিসগুলো?'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'The number of people using mobile banking has grown quickly.', note: l('one figure → has grown.', 'একটা সংখ্যা → has grown।') },
        { en: 'A number of students have complained about the new timetable.', note: l('several students → have complained.', 'কয়েকজন student → have complained।') },
        { en: 'Almost 70% of the population lives in rural areas.', note: l('population (one group, singular) → lives.', 'population (একটা দল, singular) → lives।') },
        { en: 'There are three universities in my city, but there is only one hospital.', note: l('three universities → are; one hospital → is.', 'three universities → are; one hospital → is।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'The proportion of women in the workforce rose from 20% to 35%.', note: l('Task 1: the proportion / percentage / amount of → singular.', 'Task 1: the proportion / percentage / amount of → singular।') },
        { skill: 'reading', example: 'A number of studies have shown that the amount of sleep teenagers get is falling.', note: l('Reading: "a number of" = several (have) · "the amount" = one quantity (is).', 'Reading: "a number of" = কয়েকটা (have) · "the amount" = একটা পরিমাণ (is)।') },
        { skill: 'speaking', example: 'There are a lot of things to do in my city.', note: l('Part 1: there are + plural.', 'Part 1: there are + plural।') },
        { skill: 'listening', example: 'The fee is 250 pounds, which is paid in advance.', note: l('Listening: amounts of money take "is".', 'Listening: টাকার পরিমাণে "is"।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The number of cars are increasing.', right: 'The number of cars is increasing.', why: l('the number (one figure) → is.', 'the number (একটা সংখ্যা) → is।') },
        { wrong: 'There is many reasons for this.', right: 'There are many reasons for this.', why: l('many reasons → are.', 'many reasons → are।') },
        { wrong: '30% of the people was unemployed.', right: '30% of the people were unemployed.', why: l('% of + plural noun → were.', '% of + plural noun → were।') },
        { wrong: 'Most of the information are wrong.', right: 'Most of the information is wrong.', why: l('information is uncountable → is.', 'information uncountable → is।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('sva-5-p1', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Task 1: choose the correct verb.', 'Task 1: সঠিক verb বেছে নিন।'), sentence: 'The number of visitors ___ from 2,000 to 5,000.', options: ['rose', 'were rising', 'have risen'], answer: 'rose', explanation: l('the number → singular; past simple "rose" fits the dates.', 'the number → singular; তারিখের সাথে past simple "rose" মানায়।'), why: { 'were rising': l('"the number" is one figure → singular.', '"the number" একটা সংখ্যা → singular।'), 'have risen': l('"the number" is singular → has risen (and past dates need the past simple).', '"the number" singular → has risen (আর অতীতের তারিখে past simple লাগে)।') } }),
        choice('sva-5-p2', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'A number of shops ___ closed because of the strike.', options: ['have', 'has'], answer: 'have', explanation: l('a number of = several → plural → have.', 'a number of = কয়েকটা → plural → have।'), why: { has: l('"a number of" means "several", so the verb is plural.', '"a number of" মানে "কয়েকটা", তাই verb plural।') } }),
        choice('sva-5-p3', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'There ___ a lot of noise outside the exam hall.', options: ['was', 'were'], answer: 'was', explanation: l('noise is uncountable → was.', 'noise uncountable → was।'), why: { were: l('"a lot of noise" — noise cannot be counted → singular.', '"a lot of noise" — noise গোনা যায় না → singular।') } }),
        choice('sva-5-p4', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Task 1: choose the correct verb.', 'Task 1: সঠিক verb বেছে নিন।'), sentence: 'In 2010, 25% of teenagers ___ a smartphone.', options: ['owned', 'owns'], answer: 'owned', explanation: l('% of + plural noun (teenagers) → plural; past time → owned.', '% of + plural noun (teenagers) → plural; অতীত → owned।'), why: { owns: l('"teenagers" is plural (no -s on the verb), and 2010 is past → owned.', '"teenagers" plural (verb-এ -s না), আর 2010 অতীত → owned।') } }),
        choice('sva-5-p5', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Three hours ___ enough to finish the reading test.', options: ['is', 'are'], answer: 'is', explanation: l('one amount of time → is.', 'সময়ের একটা পরিমাণ → is।'), why: { are: l('"three hours" is one period of time here.', '"three hours" এখানে একটা সময়কাল।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sva-5-r1', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Write is or are.', 'is বা are লিখুন।'), sentence: 'There ___ several ways to solve this problem.', accepted: ['are'], explanation: l('several ways → are.', 'several ways → are।'), why: { is: l('The noun after "there" is "ways" — plural.', '"there"-এর পরের noun "ways" — plural।') } }),
        gap('sva-5-r2', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Write the correct form of the verb in brackets (present simple).', 'বন্ধনীর verb-এর সঠিক form লিখুন (present simple)।'), sentence: 'The percentage of women in parliament ___ (remain) low.', base: 'remain', accepted: ['remains'], explanation: l('the percentage → singular → remains.', 'the percentage → singular → remains।'), why: { remain: l('"the percentage" is one figure.', '"the percentage" একটা সংখ্যা।') } }),
        correct('sva-5-r3', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Correct the Task 1 sentence.', 'Task 1 sentence-টা ঠিক করুন।'), sentence: 'The number of students who walk to school have fallen.', accepted: ['The number of students who walk to school has fallen.'], explanation: l('the number → has fallen. ("who walk" is right: students walk.)', 'the number → has fallen। ("who walk" ঠিক: students walk।)') }),
        spot('sva-5-r4', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('One verb is wrong. Tap it and type the right form.', 'একটা verb ভুল। সেটায় tap করে সঠিক form লিখুন।'), sentence: 'Half of the rice produced in the region are exported.', wrong: 'are', accepted: ['is'], explanation: l('half of + rice (uncountable) → is.', 'half of + rice (uncountable) → is।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sva-5-c1', 'sva-quantity', { ...S, prompt: l('What is the difference?', 'পার্থক্য কী?'), sentence: 'The number of complaints was small. · A number of complaints were received.', options: ['"the number" = the figure; "a number" = several complaints', 'They mean exactly the same', '"a number" is only used in Speaking'], answer: '"the number" = the figure; "a number" = several complaints', explanation: l('The figure → singular; several things → plural.', 'সংখ্যাটা → singular; কয়েকটা জিনিস → plural।') }),
        spot('sva-5-c2', 'sva-quantity', { ...S, pattern: 'sva-quantity', sentence: 'There is fewer jobs in the countryside than in cities.', wrong: 'is', accepted: ['are'], fixOptions: ['are', 'was', 'be'], explanation: l('fewer jobs (plural) → there are.', 'fewer jobs (plural) → there are।') }),
        choice('sva-5-c3', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Task 1: which sentence has NO agreement mistakes?', 'Task 1: কোন sentence-এ কোনো agreement-এর ভুল নেই?'), options: ['The majority of the land is used for farming, and 20% of the farms are organic.', 'The majority of the land are used for farming, and 20% of the farms is organic.', 'The majority of the land is used for farming, and 20% of the farms is organic.'], answer: 'The majority of the land is used for farming, and 20% of the farms are organic.', explanation: l('land (uncountable) → is; farms (plural) → are.', 'land (uncountable) → is; farms (plural) → are।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: describe a chart', 'এবার আপনার পালা: একটা chart বর্ণনা'),
      exercises: [
        write('sva-5-y1', 'sva-quantity', {
          ...S,
          prompt: l('Task 1: a chart shows internet use in Bangladesh, 2010–2020. Write 2–3 sentences using "the number of", a percentage and "there was / were".', 'Task 1: একটা chart ২০১০–২০২০ সালে বাংলাদেশে internet ব্যবহার দেখাচ্ছে। "the number of", একটা percentage আর "there was / were" দিয়ে ২–৩টা sentence লিখুন।'),
          model: 'The number of internet users in Bangladesh rose sharply between 2010 and 2020. By 2020, about 60% of young people were online every day, and there was a big increase in mobile banking.',
          checklist: [l('the number / percentage / proportion of → singular', 'the number / percentage / proportion of → singular'), l('% of + plural noun → plural; % of + uncountable → singular', '% of + plural noun → plural; % of + uncountable → singular'), l('there was + singular; there were + plural', 'there was + singular; there were + plural')],
          explanation: l('For each amount ask: one figure, or the things themselves?', 'প্রতিটা পরিমাণের জন্য জিজ্ঞেস করুন: একটা সংখ্যা, নাকি জিনিসগুলো?'),
          task: 'The student writes 2–3 Task 1 sentences about internet use in Bangladesh (2010–2020) using "the number of", a percentage and "there was/were". Check agreement only: the number/percentage/proportion/amount of → singular; a number of → plural; % / half / most / the majority of + noun → agree with that noun (plural noun → plural, uncountable/singular → singular); there is/are/was/were → agree with the noun after it; an amount of money/time → singular. For each error, name the word that decides the verb.',
          target: l('agreement with amounts', 'পরিমাণের সাথে agreement'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('The number of … → singular · A number of … → plural.', 'The number of … → singular · A number of … → plural।'),
        l('% / half / most / the majority of + noun → follow that noun (people → are; land → is).', '% / half / most / the majority of + noun → সেই noun-কে মানে (people → are; land → is)।'),
        l('there is / are → look at the noun after it. One sum of money or time → singular.', 'there is / are → পরের noun দেখুন। টাকা বা সময়ের একটা পরিমাণ → singular।'),
      ],
    },
  ],
};

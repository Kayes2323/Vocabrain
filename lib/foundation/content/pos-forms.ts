import type { Lesson } from '../model';
import { choice, correct, gap, identify, JOBS4, l, spot, tagWords, write } from './pos-kit';

/** Parts of Speech · Word Forms & Families: lessons 1–2. Original Vocab Brain content. */
const C = 'pos-forms';

// ======================================================================= 1
const f1: Lesson = {
  id: 'pf-1', unit: 'forms', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'grammar',
  title: l('The gap tells you the form', 'Gap দেখেই form বোঝা যায়'),
  why: l('In Reading and Listening completion, the right word in the wrong form is marked wrong.', 'Reading আর Listening completion-এ সঠিক word ভুল form-এ লিখলে ভুল ধরা হয়।'),
  steps: [
    {
      kind: 'hook',
      title: l('Same word, different forms', 'একই word, ভিন্ন form'),
      situation: l('Reading summary: "The ______ of new towns has put pressure on water supplies." The passage uses the word "develop".', 'Reading summary: "The ______ of new towns has put pressure on water supplies." Passage-এ word-টা আছে "develop" হিসেবে।'),
      question: l('What do you write?', 'তুমি কী লিখবে?'),
      options: ['development', 'develop', 'developed'], answer: 'development',
      diagnose: {
        development: l('Right. "The … of" needs a noun: development.', 'ঠিক। "The … of"-এর মাঝে noun লাগে: development।'),
        develop: l('Right word, wrong form. After "The" we need the noun.', 'Word ঠিক, form ভুল। "The"-এর পরে noun লাগে।'),
        developed: l('"developed" describes (a developed country). The gap needs a thing: the noun.', '"developed" describe করে (a developed country)। Gap-এ একটা জিনিস লাগে: noun।'),
      },
    },
    identify({
      sentence: 'Successful/adjective people/noun succeed/verb because they work/verb consistently/adverb.',
      choices: JOBS4,
      pattern: l('"Successful" and "succeed" are the same family with different jobs. The words around a gap tell you which job is needed.', '"Successful" আর "succeed" একই পরিবারের, কিন্তু কাজ ভিন্ন। Gap-এর আশেপাশের word গুলোই বলে দেয় কোন কাজ দরকার।'),
    }),
    {
      kind: 'concept',
      title: l('Read the neighbours', 'পাশের word গুলো পড়ো'),
      body: l('Before you choose a word, decide the JOB the gap needs, then choose the form. After a / an / the / my / this, or between "the" and "of" → noun. Before a noun, or after be / seem / become → adjective. After to / can / will / should → verb (base form). Describing a verb, or before an adjective → adverb.', 'Word বাছার আগে ঠিক করো gap-এর কোন কাজ দরকার, তারপর form বাছো। a / an / the / my / this-এর পরে, অথবা "the" আর "of"-এর মাঝে → noun। Noun-এর আগে, অথবা be / seem / become-এর পরে → adjective। to / can / will / should-এর পরে → verb (base form)। Verb-কে describe করলে বা adjective-এর আগে → adverb।'),
      points: [
        l('Family: success (noun) · succeed (verb) · successful (adjective) · successfully (adverb).', 'Family: success (noun) · succeed (verb) · successful (adjective) · successfully (adverb)।'),
        l('Family: economy (noun) · economic (adjective, about the economy) · economical (adjective, saving money) · economically (adverb).', 'Family: economy (noun) · economic (adjective, অর্থনীতি সংক্রান্ত) · economical (adjective, সাশ্রয়ী) · economically (adverb)।'),
      ],
    },
    {
      kind: 'examples',
      title: l('One family, four jobs', 'এক পরিবার, চার কাজ'),
      items: [
        { en: 'Hard work leads to success.', note: l('after "to" (preposition) → noun', '"to" (preposition)-এর পরে → noun') },
        { en: 'You can succeed if you practise.', note: l('after "can" → verb', '"can"-এর পরে → verb') },
        { en: 'She is a successful doctor.', note: l('before a noun → adjective', 'noun-এর আগে → adjective') },
        { en: 'He successfully completed the course.', note: l('describes the verb → adverb', 'verb-কে describe করে → adverb') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'reading', example: 'The ______ of the new policy was delayed. → introduction', note: l('Decide "noun" first, then find the word in the passage.', 'আগে ঠিক করো "noun", তারপর passage-এ word খোঁজো।') },
        { skill: 'listening', example: 'The course is very ______. (you hear "It really helps") → useful', note: l('After "very" + be → adjective.', 'be + "very"-এর পরে → adjective।') },
        { skill: 'writing', example: 'economic growth / economical cars', note: l('Lexical Resource: the right family member shows accuracy.', 'Lexical Resource: পরিবারের সঠিক সদস্য বাছলে accuracy দেখা যায়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'Education is the key to success people.', right: 'Education is the key to successful people.', why: l('Before a noun (people) → adjective.', 'Noun (people)-এর আগে → adjective।') },
        { wrong: 'Many countries want economical growth.', right: 'Many countries want economic growth.', why: l('economic = about the economy; economical = cheap to use.', 'economic = অর্থনীতি সংক্রান্ত; economical = কম খরচের।') },
        { wrong: 'We should protection the environment.', right: 'We should protect the environment.', why: l('After "should" → verb.', '"should"-এর পরে → verb।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pf-1-p1', C, { tag: 'word-form', prompt: l('What job does the gap need?', 'Gap-এ কোন কাজের word লাগবে?'), sentence: 'Governments should ______ public health.', options: ['a verb', 'a noun', 'an adjective'], answer: 'a verb', explanation: l('After "should" → a verb (for example: improve, protect).', '"should"-এর পরে → verb (যেমন: improve, protect)।') }),
        choice('pf-1-p2', C, { tag: 'word-form', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'She gave a very ______ presentation.', options: ['success', 'succeed', 'successful', 'successfully'], answer: 'successful', pos: 'adjective', wrongPos: { success: 'noun', succeed: 'verb', successfully: 'adverb' }, family: 'success', explanation: l('Before the noun "presentation" → adjective successful.', 'Noun "presentation"-এর আগে → adjective successful।') }),
        choice('pf-1-p3', C, { tag: 'word-form', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'The country’s ______ grew by 5% last year.', options: ['economy', 'economic', 'economically'], answer: 'economy', pos: 'noun', wrongPos: { economic: 'adjective', economically: 'adverb' }, family: 'economy', explanation: l('After "The country’s" → noun: economy.', '"The country’s"-এর পরে → noun: economy।') }),
        choice('pf-1-p4', C, { tag: 'word-form', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'We must ______ the environment for future generations.', options: ['protect', 'protection', 'protective'], answer: 'protect', pos: 'verb', wrongPos: { protection: 'noun', protective: 'adjective' }, family: 'protect', explanation: l('After "must" → verb: protect.', '"must"-এর পরে → verb: protect।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pf-1-r1', C, { tag: 'word-form', prompt: l('Write the right form of the word in brackets.', 'Bracket-এর word-এর ঠিক form লেখো।'), base: 'develop', sentence: 'The ___ of new towns has put pressure on water supplies.', accepted: ['development'], pos: 'noun', wrongPos: { develop: 'verb', developed: 'adjective', developing: 'adjective' }, family: 'develop', explanation: l('"The … of" → noun: development.', '"The … of" → noun: development।') }),
        gap('pf-1-r2', C, { tag: 'word-form', prompt: l('Write the right form of the word in brackets.', 'Bracket-এর word-এর ঠিক form লেখো।'), base: 'success', sentence: 'She ___ passed the exam on her first attempt.', accepted: ['successfully'], pos: 'adverb', wrongPos: { successful: 'adjective', success: 'noun', succeed: 'verb' }, family: 'success', explanation: l('Describes the verb "passed" → adverb successfully.', 'Verb "passed"-কে describe করে → adverb successfully।') }),
        gap('pf-1-r3', C, { tag: 'word-form', prompt: l('Write the right form of the word in brackets.', 'Bracket-এর word-এর ঠিক form লেখো।'), base: 'economy', sentence: 'Tourism brings many ___ benefits to the region.', accepted: ['economic'], pos: 'adjective', wrongPos: { economy: 'noun', economically: 'adverb' }, family: 'economy', explanation: l('Before the noun "benefits", about the economy → economic.', 'Noun "benefits"-এর আগে, অর্থনীতি সংক্রান্ত → economic।'), why: { economical: l('economical = cheap to run (an economical car). Here we mean "about the economy": economic.', 'economical = কম খরচে চলে (an economical car)। এখানে "অর্থনীতি সংক্রান্ত": economic।') } }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pf-1-c1', C, { tag: 'word-form', prompt: l('Why "development" and not "develop"?', '"develop" না হয়ে "development" কেন?'), sentence: 'The development of the city was fast.', options: ['After "The" and before "of" we need a noun', '"develop" is too short', '"development" is the past form'], answer: 'After "The" and before "of" we need a noun', explanation: l('The job of the gap decides the form.', 'Gap-এর কাজই form ঠিক করে।') }),
        spot('pf-1-c2', C, { tag: 'word-form', sentence: 'We should protection our forests.', wrong: 'protection', accepted: ['protect'], fixOptions: ['protect', 'protective', 'protectively'], pos: 'verb', wrongPos: { protective: 'adjective', protectively: 'adverb' }, family: 'protect', explanation: l('After "should" → verb: protect.', '"should"-এর পরে → verb: protect।') }),
        tagWords('pf-1-c3', C, { tag: 'word-form', sentence: 'Economic/adjective growth/noun helps/verb the economy/noun grow/verb steadily/adverb.', choices: JOBS4, explanation: l('economic (adjective) + growth (noun); the economy (noun); grow steadily (verb + adverb).', 'economic (adjective) + growth (noun); the economy (noun); grow steadily (verb + adverb)।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pf-1-w1', C, {
          tag: 'word-form',
          prompt: l('Write two sentences using two forms of "success" (success, succeed, successful, successfully).', '"success" পরিবারের দুটো form দিয়ে দুটো sentence লেখো (success, succeed, successful, successfully)।'),
          model: 'My cousin is a successful engineer. He says success comes from practice every day.',
          task: 'The student writes two sentences using two different forms of the word family success/succeed/successful/successfully. Check that each form does the right job (noun, verb, adjective, adverb) in its sentence.',
          target: l('Two forms of the same family', 'একই পরিবারের দুটো form'),
          checklist: [l('Each form does the right job', 'প্রতিটা form ঠিক কাজ করছে'), l('Adjective before a noun, adverb with a verb', 'Noun-এর আগে adjective, verb-এর সাথে adverb')],
          explanation: l('a successful engineer (adjective), success comes (noun).', 'a successful engineer (adjective), success comes (noun)।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Job first, form second. Read the words around the gap.', 'আগে কাজ, তারপর form। Gap-এর আশেপাশের word পড়ো।'),
        l('the / a / my + noun · should / can + verb · before noun = adjective · with verb = adverb.', 'the / a / my + noun · should / can + verb · noun-এর আগে = adjective · verb-এর সাথে = adverb।'),
      ],
    },
  ],
};

// ======================================================================= 2
const f2: Lesson = {
  id: 'pf-2', unit: 'forms', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'grammar',
  title: l('Endings that show the job', 'যে ending কাজ বলে দেয়'),
  why: l('Endings let you guess the job of a new word you meet in Reading.', 'Reading-এ নতুন word পেলে ending দেখেই তার কাজ আন্দাজ করা যায়।'),
  steps: [
    {
      kind: 'hook',
      title: l('A word you have never seen', 'কখনো না দেখা একটা word'),
      situation: l('In a Reading passage you meet: "The urbanisation of Asia happened very quickly." You don’t know "urbanisation".', 'Reading passage-এ পেলে: "The urbanisation of Asia happened very quickly." তুমি "urbanisation" জানো না।'),
      question: l('What job does "urbanisation" do?', '"urbanisation" কী কাজ করছে?'),
      options: ['noun', 'verb', 'adjective'], answer: 'noun',
      diagnose: {
        noun: l('Right. The -tion / -sion ending (and "The … of") show a noun.', 'ঠিক। -tion / -sion ending (আর "The … of") দেখে বোঝা যায় noun।'),
        verb: l('The verb is "happened". "-isation" is a noun ending.', 'Verb হলো "happened"। "-isation" noun-এর ending।'),
        adjective: l('It does not describe anything; it is the thing that happened. -tion = noun.', 'এটা কিছু describe করছে না; এটাই যা ঘটেছে। -tion = noun।'),
      },
    },
    identify({
      sentence: 'The government/noun made/verb a careful/adjective decision/noun to modernise/verb the railway/noun.',
      choices: JOBS4,
      pattern: l('decision (-sion) is a noun, careful (-ful) an adjective, modernise (-ise) a verb. Endings are clues.', 'decision (-sion) noun, careful (-ful) adjective, modernise (-ise) verb। Ending গুলো সূত্র।'),
    }),
    {
      kind: 'concept',
      title: l('Endings are clues', 'Ending হলো সূত্র'),
      body: l('Many endings show the job of a word. Noun: -tion/-sion, -ment, -ness, -ity, -ance/-ence, -er/-or (a person). Adjective: -ful, -less, -ous, -ive, -al, -able/-ible, -ic. Verb: -ise/-ize, -en, -ify, -ate. Adverb: usually -ly.', 'অনেক ending word-এর কাজ বলে দেয়। Noun: -tion/-sion, -ment, -ness, -ity, -ance/-ence, -er/-or (মানুষ)। Adjective: -ful, -less, -ous, -ive, -al, -able/-ible, -ic। Verb: -ise/-ize, -en, -ify, -ate। Adverb: সাধারণত -ly।'),
      points: [
        l('Clues, not rules: "friendly" and "lovely" end in -ly but are adjectives.', 'এগুলো সূত্র, নিয়ম না: "friendly" আর "lovely"-র শেষে -ly, কিন্তু এরা adjective।'),
        l('Always check the job in the sentence too.', 'Sentence-এ word-টার কাজও সবসময় মিলিয়ে দেখো।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'employ → employment → employer → employee', note: l('-ment: noun (the thing); -er / -ee: people', '-ment: noun (জিনিস); -er / -ee: মানুষ') },
        { en: 'modern → modernise → modernisation', note: l('-ise: verb; -isation: noun', '-ise: verb; -isation: noun') },
        { en: 'danger → dangerous → dangerously', note: l('-ous: adjective; -ly: adverb', '-ous: adjective; -ly: adverb') },
        { en: 'wide → widen → width', note: l('-en: verb (make wider)', '-en: verb (বেশি চওড়া করা)') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'reading', example: 'globalisation, sustainability, affordable', note: l('Academic texts are full of long words. The ending tells you the job even if you don’t know the meaning.', 'Academic text-এ লম্বা word ভরা। অর্থ না জানলেও ending বলে দেয় কাজ কী।') },
        { skill: 'writing', example: 'unemployment, environmental, effectively', note: l('Accurate endings show control of word forms (Lexical Resource).', 'সঠিক ending word form-এর উপর দখল দেখায় (Lexical Resource)।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'Unemployee is a big problem.', right: 'Unemployment is a big problem.', why: l('The situation = -ment. An employee is a person.', 'অবস্থাটা = -ment। employee হলো একজন মানুষ।') },
        { wrong: 'This is an environment problem.', right: 'This is an environmental problem.', why: l('Before a noun → adjective: environmental (-al).', 'Noun-এর আগে → adjective: environmental (-al)।') },
        { wrong: 'We need to wide the road.', right: 'We need to widen the road.', why: l('After "to" → verb: widen (-en = make).', '"to"-এর পরে → verb: widen (-en = করা)।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pf-2-p1', C, { tag: 'word-form', prompt: l('Which ending makes a noun from "happy"?', '"happy" থেকে noun বানাতে কোন ending?'), options: ['happiness', 'happily', 'happiful'], answer: 'happiness', pos: 'noun', wrongPos: { happily: 'adverb' }, explanation: l('-ness makes nouns: happiness, kindness.', '-ness দিয়ে noun হয়: happiness, kindness।') }),
        choice('pf-2-p2', C, { tag: 'word-form', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'Plastic causes serious ______ damage.', options: ['environment', 'environmental', 'environmentally'], answer: 'environmental', pos: 'adjective', wrongPos: { environment: 'noun', environmentally: 'adverb' }, family: 'environment', explanation: l('Before the noun "damage" → adjective environmental.', 'Noun "damage"-এর আগে → adjective environmental।') }),
        choice('pf-2-p3', C, { tag: 'word-form', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: '______ is high among young graduates.', options: ['Unemployment', 'Unemployed', 'Unemploy'], answer: 'Unemployment', pos: 'noun', wrongPos: { Unemployed: 'adjective' }, family: 'employ', explanation: l('The subject needs a noun: unemployment (-ment).', 'Subject-এ noun লাগে: unemployment (-ment)।') }),
        tagWords('pf-2-p4', C, { tag: 'word-form', sentence: 'Globalisation/noun has made/verb international/adjective travel/noun affordable/adjective.', choices: JOBS4, explanation: l('-isation (noun), -al (adjective), -able (adjective).', '-isation (noun), -al (adjective), -able (adjective)।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pf-2-r1', C, { tag: 'word-form', prompt: l('Write the noun form (use -ment).', 'Noun form লেখো (-ment দিয়ে)।'), base: 'govern', sentence: 'The ___ announced a new tax.', accepted: ['government'], pos: 'noun', wrongPos: { govern: 'verb' }, family: 'govern', explanation: l('After "The" → noun: government.', '"The"-এর পরে → noun: government।') }),
        gap('pf-2-r2', C, { tag: 'word-form', prompt: l('Write the verb form (use -en).', 'Verb form লেখো (-en দিয়ে)।'), base: 'strong', sentence: 'Regular exercise helps to ___ your heart.', accepted: ['strengthen'], pos: 'verb', wrongPos: { strong: 'adjective', strength: 'noun' }, family: 'strong', explanation: l('After "to" → verb: strengthen (make stronger).', '"to"-এর পরে → verb: strengthen (আরো শক্ত করা)।') }),
        spot('pf-2-r3', C, { tag: 'word-form', sentence: 'Air pollution is a serious environment problem.', wrong: 'environment', accepted: ['environmental'], pos: 'adjective', wrongPos: { environmentally: 'adverb' }, family: 'environment', explanation: l('Before the noun "problem" → environmental.', 'Noun "problem"-এর আগে → environmental।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pf-2-c1', C, { tag: 'word-form', prompt: l('"friendly" ends in -ly. What is it?', '"friendly"-র শেষে -ly। এটা কী?'), sentence: 'Our neighbours are very friendly.', options: ['an adjective: it describes the neighbours', 'an adverb: it ends in -ly', 'a noun: it names a person'], answer: 'an adjective: it describes the neighbours', explanation: l('Endings are clues; the job in the sentence decides.', 'Ending শুধু সূত্র; sentence-এ কাজই ঠিক করে।') }),
        spot('pf-2-c2', C, { tag: 'word-form', sentence: 'The city plans to wide the main road.', wrong: 'wide', accepted: ['widen'], fixOptions: ['widen', 'width', 'widely'], pos: 'verb', wrongPos: { width: 'noun', widely: 'adverb' }, family: 'wide', explanation: l('After "to" → verb: widen.', '"to"-এর পরে → verb: widen।') }),
        choice('pf-2-c3', C, { tag: 'word-form', prompt: l('Reading: what job does "sustainability" do?', 'Reading: "sustainability" কী কাজ করছে?'), sentence: 'Sustainability is now a key goal for many cities.', options: ['noun', 'adjective', 'verb'], answer: 'noun', pos: 'noun', wrongPos: { adjective: 'adjective', verb: 'verb' }, explanation: l('-ity ending, and it is the subject → noun.', '-ity ending, আর এটা subject → noun।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pf-2-w1', C, {
          tag: 'word-form',
          prompt: l('Write one Task 2 style sentence with a noun ending in -tion or -ment and an adjective ending in -al.', 'এমন একটা Task 2 style sentence লেখো যেখানে -tion বা -ment ending-এর noun আর -al ending-এর adjective আছে।'),
          model: 'Environmental pollution is one of the biggest problems facing the government today.',
          task: 'The student writes one Task 2 style sentence that includes a noun ending in -tion or -ment and an adjective ending in -al. Check that each word form does the right job (noun as subject/object, adjective before a noun) and overall grammar.',
          target: l('-tion / -ment noun + -al adjective', '-tion / -ment noun + -al adjective'),
          checklist: [l('I used a noun ending in -tion or -ment', '-tion বা -ment ending-এর noun ব্যবহার করেছি'), l('My -al adjective is before a noun', 'আমার -al adjective একটা noun-এর আগে')],
          explanation: l('Environmental (adjective) pollution (noun)…', 'Environmental (adjective) pollution (noun)…'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Noun: -tion, -ment, -ness, -ity. Adjective: -ful, -ous, -ive, -al, -able. Verb: -ise, -en, -ify. Adverb: -ly.', 'Noun: -tion, -ment, -ness, -ity। Adjective: -ful, -ous, -ive, -al, -able। Verb: -ise, -en, -ify। Adverb: -ly।'),
        l('Endings are clues; the job in the sentence decides.', 'Ending সূত্র; sentence-এ কাজই শেষ কথা।'),
      ],
    },
  ],
};

// ======================================================================= 3
const f3: Lesson = {
  id: 'pf-3', unit: 'forms', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'grammar',
  title: l('Word families', 'Word family'),
  why: l('Learning a word with its family gives you four words for the price of one.', 'একটা word তার পরিবার সহ শিখলে একের দামে চারটা word পাওয়া যায়।'),
  steps: [
    {
      kind: 'hook',
      title: l('Say it another way', 'অন্যভাবে বলো'),
      situation: l('Task 2: you already wrote "competition" twice. Now you want to say that companies try hard to win customers.', 'Task 2: "competition" দুবার লিখে ফেলেছো। এখন বলতে চাও company-গুলো customer পেতে জোর চেষ্টা করে।'),
      question: l('Which sentence uses another member of the family correctly?', 'কোন sentence পরিবারের অন্য সদস্যকে সঠিকভাবে ব্যবহার করেছে?'),
      options: ['Companies compete for customers.', 'Companies competition for customers.', 'Companies competitive for customers.'], answer: 'Companies compete for customers.',
      diagnose: {
        'Companies compete for customers.': l('Right. compete (verb) → competition (noun) → competitive (adjective).', 'ঠিক। compete (verb) → competition (noun) → competitive (adjective)।'),
        'Companies competition for customers.': l('After the subject we need a verb: compete.', 'Subject-এর পরে verb লাগে: compete।'),
        'Companies competitive for customers.': l('"competitive" is an adjective: Companies are competitive.', '"competitive" adjective: Companies are competitive।'),
      },
    },
    identify({
      sentence: 'Competitive/adjective companies/noun compete/verb fiercely,/adverb so competition/noun is/verb high./adjective',
      choices: JOBS4,
      pattern: l('One family, four jobs: competitive (adjective), compete (verb), competition (noun), and "fiercely" shows how.', 'এক পরিবার, চার কাজ: competitive (adjective), compete (verb), competition (noun), আর "fiercely" বলে কীভাবে।'),
    }),
    {
      kind: 'concept',
      title: l('Learn the whole family', 'পুরো পরিবার শেখো'),
      body: l('When you learn a useful word, learn its family too, and note any gaps or traps. Examples: benefit (noun/verb) · beneficial (adj) · beneficially (adv). compete (verb) · competition (noun) · competitive (adj) · competitively (adv). economy (noun) · economic / economical (adj) · economically (adv). significant (adj) · significance (noun) · significantly (adv).', 'দরকারি একটা word শেখার সময় তার পরিবারও শেখো, আর কোনো ফাঁক বা ফাঁদ থাকলে লিখে রাখো। উদাহরণ: benefit (noun/verb) · beneficial (adj) · beneficially (adv)। compete (verb) · competition (noun) · competitive (adj) · competitively (adv)। economy (noun) · economic / economical (adj) · economically (adv)। significant (adj) · significance (noun) · significantly (adv)।'),
      points: [
        l('Not every family has all four forms; don’t invent words ("significate" is not a word).', 'প্রতিটা পরিবারের চারটা form থাকে না; word বানিয়ো না ("significate" কোনো word না)।'),
        l('Keep a family table for your most useful IELTS words.', 'তোমার সবচেয়ে দরকারি IELTS word গুলোর জন্য family table রাখো।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Families in use', 'পরিবার ব্যবহারে'),
      items: [
        { en: 'Exercise benefits everyone. It is beneficial for health.', note: l('benefit (verb), beneficial (adjective)', 'benefit (verb), beneficial (adjective)') },
        { en: 'The significance of this finding is clear.', note: l('significance (noun)', 'significance (noun)') },
        { en: 'The market is very competitive.', note: l('competitive (adjective)', 'competitive (adjective)') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'writing', example: 'This policy benefits families. / It is beneficial to families.', note: l('Paraphrasing with word families avoids repetition (Lexical Resource).', 'Word family দিয়ে paraphrase করলে পুনরাবৃত্তি এড়ানো যায় (Lexical Resource)।') },
        { skill: 'reading', example: 'Question: "a competitive market"; passage: "companies compete intensely".', note: l('Reading paraphrases often switch between family members.', 'Reading-এ paraphrase প্রায়ই পরিবারের এক সদস্য থেকে আরেকজনে যায়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'Exercise is very benefit for health.', right: 'Exercise is very beneficial for health.', why: l('After "very" + is → adjective: beneficial.', 'is + "very"-এর পরে → adjective: beneficial।') },
        { wrong: 'The market is very competition.', right: 'The market is very competitive.', why: l('Describing the market → adjective.', 'Market-কে describe করছি → adjective।') },
        { wrong: 'This is significance change.', right: 'This is a significant change.', why: l('Before a noun → adjective (and add "a").', 'Noun-এর আগে → adjective (আর "a" যোগ করো)।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pf-3-p1', C, { tag: 'word-form', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'Regular exercise is ______ for your heart.', options: ['beneficial', 'benefit', 'beneficially'], answer: 'beneficial', pos: 'adjective', wrongPos: { benefit: 'noun', beneficially: 'adverb' }, family: 'benefit', explanation: l('After "is" → adjective: beneficial.', '"is"-এর পরে → adjective: beneficial।') }),
        choice('pf-3-p2', C, { tag: 'word-form', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'Many shops ______ with online stores.', options: ['compete', 'competition', 'competitive'], answer: 'compete', pos: 'verb', wrongPos: { competition: 'noun', competitive: 'adjective' }, family: 'compete', explanation: l('After the subject → verb: compete.', 'Subject-এর পরে → verb: compete।') }),
        choice('pf-3-p3', C, { tag: 'word-form', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'Nobody understood the ______ of the discovery at first.', options: ['significance', 'significant', 'significantly'], answer: 'significance', pos: 'noun', wrongPos: { significant: 'adjective', significantly: 'adverb' }, family: 'significant', explanation: l('"the … of" → noun: significance.', '"the … of" → noun: significance।') }),
        choice('pf-3-p4', C, { tag: 'word-form', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'Hybrid cars are more ______ than old diesel cars.', options: ['economical', 'economic', 'economy'], answer: 'economical', pos: 'adjective', wrongPos: { economy: 'noun' }, family: 'economy', explanation: l('Cheap to run → economical.', 'কম খরচে চলে → economical।'), why: { economic: l('economic = about the economy (economic growth).', 'economic = অর্থনীতি সংক্রান্ত (economic growth)।') } }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pf-3-r1', C, { tag: 'word-form', prompt: l('Write the right form of the word in brackets.', 'Bracket-এর word-এর ঠিক form লেখো।'), base: 'compete', sentence: 'The job market is very ___ these days.', accepted: ['competitive'], pos: 'adjective', wrongPos: { competition: 'noun', compete: 'verb', competitively: 'adverb' }, family: 'compete', explanation: l('After "very" + is → adjective: competitive.', 'is + "very"-এর পরে → adjective: competitive।') }),
        gap('pf-3-r2', C, { tag: 'word-form', prompt: l('Write the right form of the word in brackets.', 'Bracket-এর word-এর ঠিক form লেখো।'), base: 'benefit', sentence: 'Tourism ___ local businesses. (present, it)', accepted: ['benefits'], pos: 'verb', wrongPos: { beneficial: 'adjective' }, family: 'benefit', explanation: l('After the subject → verb: benefits.', 'Subject-এর পরে → verb: benefits।') }),
        spot('pf-3-r3', C, { tag: 'word-form', sentence: 'There has been a significance change in the climate.', wrong: 'significance', accepted: ['significant'], pos: 'adjective', wrongPos: { significantly: 'adverb' }, family: 'significant', explanation: l('Before the noun "change" → significant.', 'Noun "change"-এর আগে → significant।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pf-3-c1', C, { tag: 'word-form', prompt: l('Why "economic growth" but "an economical car"?', '"economic growth" কিন্তু "an economical car" কেন?'), options: ['economic = about the economy; economical = saving money', 'They mean the same', 'economical is only for cars'], answer: 'economic = about the economy; economical = saving money', explanation: l('Two adjectives in one family, two meanings.', 'এক পরিবারে দুটো adjective, দুটো অর্থ।') }),
        spot('pf-3-c2', C, { tag: 'word-form', sentence: 'The market for smartphones is very competition.', wrong: 'competition', accepted: ['competitive'], fixOptions: ['competitive', 'compete', 'competitively'], pos: 'adjective', wrongPos: { compete: 'verb', competitively: 'adverb' }, family: 'compete', explanation: l('Describing the market → competitive.', 'Market-কে describe → competitive।') }),
        tagWords('pf-3-c3', C, { tag: 'word-form', sentence: 'The benefits/noun of exercise/noun are/verb significant/adjective.', choices: JOBS4, explanation: l('benefits (noun), exercise (noun), are (verb), significant (adjective).', 'benefits (noun), exercise (noun), are (verb), significant (adjective)।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pf-3-w1', C, {
          tag: 'word-form',
          prompt: l('Write two sentences with two members of the "benefit" family (benefit, beneficial).', '"benefit" পরিবারের দুই সদস্য (benefit, beneficial) দিয়ে দুটো sentence লেখো।'),
          model: 'Learning a second language has many benefits. It is especially beneficial for students who want to work abroad.',
          task: 'The student writes two sentences using two forms of the benefit family (benefit as noun or verb, beneficial). Check each form does the right job and collocations (beneficial for/to, benefits of).',
          target: l('Two family members, right jobs', 'পরিবারের দুই সদস্য, ঠিক কাজে'),
          checklist: [l('benefit as a noun or a verb', 'benefit noun বা verb হিসেবে'), l('beneficial after be / before a noun', 'be-এর পরে / noun-এর আগে beneficial')],
          explanation: l('many benefits (noun), beneficial for (adjective).', 'many benefits (noun), beneficial for (adjective)।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Learn words in families: compete · competition · competitive · competitively.', 'Word পরিবার ধরে শেখো: compete · competition · competitive · competitively।'),
        l('economic (about the economy) ≠ economical (saves money).', 'economic (অর্থনীতি সংক্রান্ত) ≠ economical (টাকা বাঁচায়)।'),
      ],
    },
  ],
};

// ======================================================================= 4
const f4: Lesson = {
  id: 'pf-4', unit: 'forms', format: 'v2', concept: C, minutes: 5, difficulty: 'medium', skill: 'grammar',
  title: l('Opposites with prefixes', 'Prefix দিয়ে বিপরীত'),
  why: l('"unpossible" and "unlegal" are easy to avoid once you know the pattern.', 'Pattern জানলে "unpossible" আর "unlegal" সহজেই এড়ানো যায়।'),
  steps: [
    {
      kind: 'hook',
      title: l('Which opposite?', 'কোন বিপরীত?'),
      situation: l('Task 2: "It is ______ to stop people using mobile phones completely." (the opposite of "possible")', 'Task 2: "It is ______ to stop people using mobile phones completely." ("possible"-এর বিপরীত)'),
      question: l('Which is correct?', 'কোনটা সঠিক?'),
      options: ['impossible', 'unpossible', 'dispossible'], answer: 'impossible',
      diagnose: {
        impossible: l('Right. Before p and m, "in-" becomes "im-": impossible, immature.', 'ঠিক। p আর m-এর আগে "in-" হয়ে যায় "im-": impossible, immature।'),
        unpossible: l('A common guess, but the opposite of possible is impossible.', 'Common আন্দাজ, কিন্তু possible-এর বিপরীত impossible।'),
        dispossible: l('"dis-" is used with verbs like agree → disagree. Here: impossible.', '"dis-" বসে agree → disagree-এর মতো verb-এ। এখানে: impossible।'),
      },
    },
    identify({
      sentence: 'Unemployment/noun is/verb an important/adjective but unpopular/adjective topic./noun',
      choices: JOBS4,
      pattern: l('"un-" makes the opposite, and the job stays the same: employment → unemployment (noun), popular → unpopular (adjective).', '"un-" বিপরীত বানায়, কিন্তু কাজ একই থাকে: employment → unemployment (noun), popular → unpopular (adjective)।'),
    }),
    {
      kind: 'concept',
      title: l('Negative prefixes', 'না-বোধক prefix'),
      body: l('A prefix goes at the start and changes the meaning, not the job. un- is the most common (unhappy, unemployment). in- (inaccurate), im- before p/m (impossible, immoral), il- before l (illegal), ir- before r (irregular, irresponsible). dis- (disagree, dishonest). You still need to learn which one each word takes.', 'Prefix শুরুতে বসে, অর্থ বদলায়, কাজ না। un- সবচেয়ে common (unhappy, unemployment)। in- (inaccurate), p/m-এর আগে im- (impossible, immoral), l-এর আগে il- (illegal), r-এর আগে ir- (irregular, irresponsible)। dis- (disagree, dishonest)। তবু কোন word কোনটা নেয় সেটা শিখতে হয়।'),
      points: [
        l('The spelling doubles when the prefix ends like the word starts: il + legal = illegal, un + necessary = unnecessary.', 'Prefix-এর শেষ আর word-এর শুরু একই অক্ষর হলে দুবার লেখা হয়: il + legal = illegal, un + necessary = unnecessary।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'It is illegal to drive without a licence.', note: l('il- + legal', 'il- + legal') },
        { en: 'Some drivers are irresponsible.', note: l('ir- + responsible', 'ir- + responsible') },
        { en: 'Many people disagree with this law.', note: l('dis- + agree', 'dis- + agree') },
        { en: 'The data are inaccurate.', note: l('in- + accurate', 'in- + accurate') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'writing', example: 'Youth unemployment is a serious problem.', note: l('Task 2: prefix words are common topic nouns.', 'Task 2: prefix-যুক্ত word প্রায়ই topic-এর noun।') },
        { skill: 'reading', example: '"not legal" in the question = "illegal" in the passage', note: l('Paraphrase: "not + word" often becomes a prefix word.', 'Paraphrase: "not + word" প্রায়ই prefix-যুক্ত word হয়ে যায়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'It is unlegal to smoke here.', right: 'It is illegal to smoke here.', why: l('Before l → il-.', 'l-এর আগে → il-।') },
        { wrong: 'I am disagree.', right: 'I disagree.', why: l('disagree is a verb: no "am".', 'disagree নিজেই verb: "am" লাগে না।') },
        { wrong: 'The results were unaccurate.', right: 'The results were inaccurate.', why: l('accurate → inaccurate.', 'accurate → inaccurate।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pf-4-p1', C, { tag: 'word-form', prompt: l('Choose the opposite.', 'বিপরীতটা বাছো।'), sentence: 'regular →', options: ['irregular', 'unregular', 'disregular'], answer: 'irregular', explanation: l('Before r → ir-.', 'r-এর আগে → ir-।') }),
        choice('pf-4-p2', C, { tag: 'word-form', prompt: l('Choose the opposite.', 'বিপরীতটা বাছো।'), sentence: 'honest →', options: ['dishonest', 'unhonest', 'inhonest'], answer: 'dishonest', explanation: l('honest → dishonest.', 'honest → dishonest।') }),
        choice('pf-4-p3', C, { tag: 'word-form', prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: 'Rising ______ is a problem for young graduates.', options: ['unemployment', 'disemployment', 'inemployment'], answer: 'unemployment', explanation: l('employment → unemployment.', 'employment → unemployment।') }),
        choice('pf-4-p4', C, { tag: 'word-form', prompt: l('Choose the opposite.', 'বিপরীতটা বাছো।'), sentence: 'mature →', options: ['immature', 'unmature', 'dismature'], answer: 'immature', explanation: l('Before m → im-.', 'm-এর আগে → im-।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pf-4-r1', C, { tag: 'word-form', prompt: l('Write the opposite of the word in brackets.', 'Bracket-এর word-এর বিপরীত লেখো।'), base: 'legal', sentence: 'Selling fake medicine is ___.', accepted: ['illegal'], explanation: l('Before l → il-: illegal.', 'l-এর আগে → il-: illegal।'), why: { unlegal: l('legal → illegal (il- before l).', 'legal → illegal (l-এর আগে il-)।') } }),
        gap('pf-4-r2', C, { tag: 'word-form', prompt: l('Write the opposite of the word in brackets.', 'Bracket-এর word-এর বিপরীত লেখো।'), base: 'possible', sentence: 'It is ___ to learn a language in one week.', accepted: ['impossible'], explanation: l('Before p → im-: impossible.', 'p-এর আগে → im-: impossible।') }),
        correct('pf-4-r3', C, { tag: 'word-form', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে আবার লেখো।'), sentence: 'I am disagree with this idea.', accepted: ['I disagree with this idea.'], explanation: l('disagree is a verb.', 'disagree নিজেই verb।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pf-4-c1', C, { tag: 'word-form', prompt: l('Why "illegal" with double l?', '"illegal"-এ দুটো l কেন?'), options: ['il- + legal: both letters stay', 'It is a spelling mistake', 'Because it is a noun'], answer: 'il- + legal: both letters stay', explanation: l('Same with un + necessary = unnecessary.', 'un + necessary = unnecessary-তেও একই।') }),
        spot('pf-4-c2', C, { tag: 'word-form', sentence: 'Throwing rubbish in rivers is irresponsible and unlegal.', wrong: 'unlegal', accepted: ['illegal'], fixOptions: ['illegal', 'inlegal', 'dislegal'], explanation: l('legal → illegal (il- before l). Compare: responsible → irresponsible (ir- before r).', 'legal → illegal (l-এর আগে il-)। তুলনা করো: responsible → irresponsible (r-এর আগে ir-)।') }),
        choice('pf-4-c3', C, { tag: 'word-form', prompt: l('Reading: which word means "not correct"?', 'Reading: কোন word-এর অর্থ "not correct"?'), options: ['inaccurate', 'accurately', 'accuracy'], answer: 'inaccurate', explanation: l('in- + accurate.', 'in- + accurate।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pf-4-w1', C, {
          tag: 'word-form',
          prompt: l('Write one Task 2 sentence using two prefix words (e.g. illegal, irresponsible, unemployment, impossible).', 'দুটো prefix-যুক্ত word দিয়ে (যেমন illegal, irresponsible, unemployment, impossible) একটা Task 2 sentence লেখো।'),
          model: 'It is irresponsible and illegal to dump factory waste into rivers.',
          task: 'The student writes one Task 2 sentence with two words that have negative prefixes (un-, in-, im-, il-, ir-, dis-). Check the prefix choice and spelling, and that the word does the right job in the sentence.',
          target: l('Two negative-prefix words', 'দুটো না-বোধক prefix-যুক্ত word'),
          checklist: [l('Right prefix (il- before l, ir- before r, im- before p/m)', 'ঠিক prefix (l-এর আগে il-, r-এর আগে ir-, p/m-এর আগে im-)'), l('Spelling checked (double letters)', 'বানান মিলিয়েছি (দুই অক্ষর)')],
          explanation: l('irresponsible, illegal.', 'irresponsible, illegal।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('un- (unhappy), in- (inaccurate), im- before p/m (impossible), il- before l (illegal), ir- before r (irregular), dis- (disagree).', 'un- (unhappy), in- (inaccurate), p/m-এর আগে im- (impossible), l-এর আগে il- (illegal), r-এর আগে ir- (irregular), dis- (disagree)।'),
        l('A prefix changes the meaning, not the job.', 'Prefix অর্থ বদলায়, কাজ না।'),
      ],
    },
  ],
};

// ======================================================================= 5
const f5: Lesson = {
  id: 'pf-5', unit: 'forms', format: 'v2', concept: C, minutes: 6, difficulty: 'hard', skill: 'grammar',
  title: l('Word forms in IELTS', 'IELTS-এ word form'),
  why: l('In completion tasks the answer must fit the sentence grammatically, in the right form and within the word limit.', 'Completion task-এ উত্তরকে sentence-এর grammar-এ, ঠিক form-এ আর word limit-এর মধ্যে বসতে হয়।'),
  steps: [
    {
      kind: 'hook',
      title: l('A summary completion', 'একটা summary completion'),
      situation: l('Passage: "Cities that invest in parks see residents become healthier." Summary: "Investment in parks improves the ______ of residents." (ONE WORD)', 'Passage: "Cities that invest in parks see residents become healthier." Summary: "Investment in parks improves the ______ of residents." (ONE WORD)'),
      question: l('What do you write?', 'কী লিখবে?'),
      options: ['health', 'healthier', 'healthy'], answer: 'health',
      diagnose: {
        health: l('Right. "the … of" needs a noun: health. The passage used an adjective, so you change the form.', 'ঠিক। "the … of"-এর মাঝে noun লাগে: health। Passage-এ adjective ছিল, তাই form বদলাতে হবে।'),
        healthier: l('That is the word in the passage, but the gap needs a noun.', 'Passage-এর word এটাই, কিন্তু gap-এ noun লাগে।'),
        healthy: l('An adjective describes; after "the" we need the noun.', 'Adjective describe করে; "the"-এর পরে noun লাগে।'),
      },
    },
    identify({
      sentence: 'Investment/noun in parks/noun improves/verb the health/noun of residents/noun.',
      choices: JOBS4,
      pattern: l('The summary uses different jobs from the passage (invest → investment, healthier → health). Match the job, then the meaning.', 'Summary passage থেকে ভিন্ন কাজ ব্যবহার করে (invest → investment, healthier → health)। আগে কাজ মেলাও, তারপর অর্থ।'),
    }),
    {
      kind: 'concept',
      title: l('Three checks for every completion answer', 'প্রতিটা completion উত্তরের তিনটা যাচাই'),
      body: l('1) Job: what does the gap need (noun, verb, adjective, adverb)? 2) Form: singular or plural? which tense? 3) Limit: ONE WORD / NO MORE THAN TWO WORDS. In Reading you usually copy words from the passage, so if the passage form doesn’t fit, look for another place in the passage. In Writing, choose the right family member yourself.', '১) কাজ: gap-এ কী লাগবে (noun, verb, adjective, adverb)? ২) Form: singular নাকি plural? কোন tense? ৩) Limit: ONE WORD / NO MORE THAN TWO WORDS। Reading-এ সাধারণত passage থেকে word নিতে হয়, তাই passage-এর form না মিললে passage-এর অন্য জায়গায় খোঁজো। Writing-এ পরিবারের ঠিক সদস্যটা নিজে বাছো।'),
      points: [
        l('Listening: plural -s and spelling count. "two photographs", not "two photograph".', 'Listening: plural -s আর বানান গোনা হয়। "two photographs", "two photograph" না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'The course focuses on the ______ of new skills. → development', note: l('the … of → noun', 'the … of → noun') },
        { en: 'Visitors can ______ the gardens for free. → explore', note: l('can → verb', 'can → verb') },
        { en: 'The museum is ______ popular with children. → extremely', note: l('before an adjective → adverb', 'adjective-এর আগে → adverb') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where you will use this', 'কোথায় লাগবে'),
      uses: [
        { skill: 'reading', example: 'Summary, note, table and sentence completion.', note: l('Predict the job of each gap before you read the passage.', 'Passage পড়ার আগে প্রতিটা gap-এর কাজ আন্দাজ করো।') },
        { skill: 'listening', example: 'Form completion: "Reason for visit: ______"', note: l('Usually a noun; check number and spelling.', 'সাধারণত noun; সংখ্যা আর বানান দেখো।') },
        { skill: 'writing', example: 'Economic growth has improved living standards significantly.', note: l('Task 2: each family member in its right place shows accuracy.', 'Task 2: পরিবারের প্রতিটা সদস্য ঠিক জায়গায় থাকলে accuracy দেখা যায়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'Summary: "improves the healthy of residents"', right: '"improves the health of residents"', why: l('the … of → noun.', 'the … of → noun।') },
        { wrong: 'Listening: "Bring two photograph"', right: '"Bring two photographs"', why: l('Plural after "two".', '"two"-এর পরে plural।') },
        { wrong: 'Answer: "the new sports centre" (ONE WORD)', right: '"centre"', why: l('Respect the word limit.', 'Word limit মানো।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pf-5-p1', C, { tag: 'word-form', prompt: l('Predict the job of the gap.', 'Gap-এর কাজ আন্দাজ করো।'), sentence: 'Visitors can ______ the gardens for free.', options: ['a verb', 'a noun', 'an adjective'], answer: 'a verb', explanation: l('After "can" → verb.', '"can"-এর পরে → verb।') }),
        choice('pf-5-p2', C, { tag: 'word-form', prompt: l('Passage: "The town grew rapidly." Summary: "The town experienced ______ growth." (ONE WORD)', 'Passage: "The town grew rapidly." Summary: "The town experienced ______ growth." (ONE WORD)'), options: ['rapid', 'rapidly', 'rapidity'], answer: 'rapid', pos: 'adjective', wrongPos: { rapidly: 'adverb', rapidity: 'noun' }, family: 'rapid', explanation: l('Before the noun "growth" → adjective: rapid.', 'Noun "growth"-এর আগে → adjective: rapid।') }),
        choice('pf-5-p3', C, { tag: 'word-form', prompt: l('Listening: you hear "We offer lessons in painting and drawing." Complete: "Classes: ______ and drawing".', 'Listening: তুমি শুনলে "We offer lessons in painting and drawing." পূরণ করো: "Classes: ______ and drawing"।'), options: ['painting', 'paint', 'painted'], answer: 'painting', pos: 'noun', wrongPos: { paint: 'verb', painted: 'adjective' }, explanation: l('Parallel with "drawing" → painting.', '"drawing"-এর সাথে মিলিয়ে → painting।') }),
        choice('pf-5-p4', C, { tag: 'word-form', prompt: l('Which answer fits "NO MORE THAN TWO WORDS"?', 'কোন উত্তর "NO MORE THAN TWO WORDS"-এ বসে?'), sentence: 'The meeting will be held in the ______.', options: ['main hall', 'big main hall', 'hall of the main building'], answer: 'main hall', explanation: l('Two words maximum.', 'সর্বোচ্চ দুই word।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pf-5-r1', C, { tag: 'word-form', prompt: l('Passage: "Cities that invest in parks…" Write ONE WORD (a noun from "invest").', 'Passage: "Cities that invest in parks…" ONE WORD লেখো ("invest" থেকে noun)।'), base: 'invest', sentence: '___ in parks improves public health.', accepted: ['investment', 'investing'], pos: 'noun', wrongPos: { invest: 'verb', invested: 'adjective' }, family: 'invest', explanation: l('The subject needs a noun: Investment.', 'Subject-এ noun লাগে: Investment।') }),
        gap('pf-5-r2', C, { tag: 'word-form', prompt: l('Write the right form of the word in brackets.', 'Bracket-এর word-এর ঠিক form লেখো।'), base: 'extreme', sentence: 'The museum is ___ popular with children.', accepted: ['extremely'], pos: 'adverb', wrongPos: { extreme: 'adjective' }, family: 'extreme', explanation: l('Before the adjective "popular" → adverb.', 'Adjective "popular"-এর আগে → adverb।') }),
        spot('pf-5-r3', C, { tag: 'word-form', sentence: 'Parks improve the healthy of local residents.', wrong: 'healthy', accepted: ['health'], pos: 'noun', wrongPos: { healthier: 'adjective', healthily: 'adverb' }, family: 'health', explanation: l('the … of → noun: health.', 'the … of → noun: health।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pf-5-c1', C, { tag: 'word-form', prompt: l('The passage says "healthier" but the gap needs a noun. What do you do?', 'Passage-এ "healthier", কিন্তু gap-এ noun লাগবে। কী করবে?'), options: ['Look for the noun form elsewhere in the passage', 'Write "healthier" anyway', 'Leave it blank'], answer: 'Look for the noun form elsewhere in the passage', explanation: l('Copied answers must fit the grammar of the gap.', 'যে উত্তর নেবে তাকে gap-এর grammar-এ বসতে হবে।') }),
        spot('pf-5-c2', C, { tag: 'word-form', sentence: 'The town experienced rapidly growth after 2010.', wrong: 'rapidly', accepted: ['rapid'], fixOptions: ['rapid', 'rapidity', 'rapids'], pos: 'adjective', wrongPos: { rapidity: 'noun' }, family: 'rapid', explanation: l('Before the noun "growth" → rapid.', 'Noun "growth"-এর আগে → rapid।') }),
        tagWords('pf-5-c3', C, { tag: 'word-form', sentence: 'Rapid/adjective development/noun changed/verb the city/noun dramatically/adverb.', choices: JOBS4, explanation: l('adjective + noun, verb + adverb: every word in its job.', 'adjective + noun, verb + adverb: প্রতিটা word নিজের কাজে।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pf-5-w1', C, {
          tag: 'word-form',
          prompt: l('Task 2: write one sentence about technology with a noun, an adjective and an adverb from different families (e.g. development, significant, rapidly).', 'Task 2: technology নিয়ে একটা sentence লেখো, ভিন্ন পরিবারের একটা noun, একটা adjective আর একটা adverb দিয়ে (যেমন development, significant, rapidly)।'),
          model: 'The rapid development of technology has significantly changed the way people communicate.',
          task: 'The student writes one Task 2 sentence about technology that includes a noun, an adjective and an adverb formed from word families (e.g. development, significant, rapidly). Check each word form does its correct job and the sentence is grammatical.',
          target: l('A noun, an adjective and an adverb, each in its job', 'একটা noun, একটা adjective আর একটা adverb, প্রতিটা নিজের কাজে'),
          checklist: [l('Adjective before a noun', 'Noun-এর আগে adjective'), l('Adverb with the verb', 'Verb-এর সাথে adverb')],
          explanation: l('rapid development (adj + noun), significantly changed (adv + verb).', 'rapid development (adj + noun), significantly changed (adv + verb)।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Completion: job → form → word limit.', 'Completion: কাজ → form → word limit।'),
        l('If the passage form doesn’t fit, the answer is somewhere else in the passage.', 'Passage-এর form না মিললে উত্তর passage-এর অন্য কোথাও।'),
      ],
    },
  ],
};

export const posFormsLessons: Lesson[] = [f1, f2, f3, f4, f5];

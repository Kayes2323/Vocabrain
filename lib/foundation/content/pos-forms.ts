import type { Lesson } from '../model';
import { choice, gap, identify, JOBS4, l, spot, tagWords, write } from './pos-kit';

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

export const posFormsLessons: Lesson[] = [f1, f2];

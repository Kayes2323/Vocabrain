import type { Lesson, Pos } from '../model';
import { choice, correct, gap, identify, l, order, spot, tagWords, write } from './pos-kit';

/** Parts of Speech in IELTS (2/2): Speaking, word forms, grammar + vocabulary, application challenge. Original Vocab Brain content. */
const C = 'pos-ielts';
const JOBS: Pos[] = ['noun', 'verb', 'adjective', 'adverb'];

const sp: Lesson = {
  id: 'pie-6', unit: 'ielts', format: 'v2', concept: C, minutes: 7, difficulty: 'medium', skill: 'speaking',
  title: l('Speaking: upgrade your answer', 'Speaking: উত্তরকে আরো ভালো করা'),
  why: l('Lexical Resource in Speaking rewards precise words in the right job: a vivid adjective, a clear verb, a natural adverb.', 'Speaking-এর Lexical Resource সঠিক কাজে নির্দিষ্ট word-কে পুরস্কৃত করে: জীবন্ত adjective, পরিষ্কার verb, স্বাভাবিক adverb।'),
  steps: [
    {
      kind: 'hook',
      title: l('Part 2: a skill you want to learn', 'Part 2: যে skill শিখতে চাও'),
      situation: l('Student: "I want to learn guitar. It is very good. I will do it good in the future."', 'Student: "I want to learn guitar. It is very good. I will do it good in the future."'),
      question: l('Which change helps this answer most?', 'কোন পরিবর্তন এই উত্তরকে সবচেয়ে বেশি সাহায্য করবে?'),
      options: ['"very good" → a precise adjective (relaxing); "do it good" → "play it well"', 'Add more "very" to every sentence', 'Use only formal written English'],
      answer: '"very good" → a precise adjective (relaxing); "do it good" → "play it well"',
      diagnose: {
        '"very good" → a precise adjective (relaxing); "do it good" → "play it well"': l('Yes. A precise adjective shows range, and "well" (adverb) describes how you play.', 'হ্যাঁ। নির্দিষ্ট adjective range দেখায়, আর "well" (adverb) বোঝায় তুমি কীভাবে বাজাও।'),
        'Add more "very" to every sentence': l('"very good, very nice" repeats one idea. Precise words work better than more "very".', '"very good, very nice" একই কথা বারবার বলে। বেশি "very"-র চেয়ে নির্দিষ্ট word ভালো কাজ করে।'),
        'Use only formal written English': l('Speaking should sound natural. "I’d love to", "kind of" are fine; the goal is accurate and natural.', 'Speaking স্বাভাবিক শোনানো উচিত। "I’d love to", "kind of" চলবে; লক্ষ্য হলো সঠিক আর স্বাভাবিক।'),
      },
    },
    identify({
      sentence: 'I’d/pronoun really/adverb love/verb to learn/verb the guitar/noun because/conjunction it’s/pronoun so/adverb relaxing./adjective',
      choices: ['noun', 'pronoun', 'verb', 'adjective', 'adverb', 'conjunction'],
      pattern: l('Natural speech still has clear jobs: really (adverb) + love (verb), relaxing (adjective) after "it’s so".', 'স্বাভাবিক কথাতেও কাজ পরিষ্কার: really (adverb) + love (verb), "it’s so"-এর পরে relaxing (adjective)।'),
    }),
    {
      kind: 'concept',
      title: l('Accurate and natural', 'সঠিক আর স্বাভাবিক'),
      body: l('In Speaking, the examiner listens for precise words used correctly, not for written-style English. Upgrade the weak spots: very good/bad → a precise adjective (relaxing, stressful, rewarding); do/make/get → a precise verb (master, improve, pick up); good (for actions) → well or another adverb (fluently, quickly). Contractions (I’d, it’s) and natural phrases (kind of, to be honest) are fine in Speaking.', 'Speaking-এ examiner শোনে নির্দিষ্ট word সঠিকভাবে ব্যবহার হচ্ছে কিনা, লিখিত ধাঁচের English না। দুর্বল জায়গাগুলো উন্নত করো: very good/bad → নির্দিষ্ট adjective (relaxing, stressful, rewarding); do/make/get → নির্দিষ্ট verb (master, improve, pick up); কাজের জন্য good → well বা অন্য adverb (fluently, quickly)। Contraction (I’d, it’s) আর স্বাভাবিক phrase (kind of, to be honest) Speaking-এ চলবে।'),
      points: [
        l('good = adjective (a good player); well = adverb (plays well).', 'good = adjective (a good player); well = adverb (plays well)।'),
        l('Don’t memorise long "advanced" sentences: examiners notice. Upgrade your own words.', 'লম্বা "advanced" sentence মুখস্থ করো না: examiner বুঝে ফেলে। নিজের word-গুলোই উন্নত করো।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Before → after', 'আগে → পরে'),
      items: [
        { en: 'It is very good. → It’s really rewarding.', note: l('precise adjective', 'নির্দিষ্ট adjective') },
        { en: 'I want to do it good. → I want to play it well.', note: l('precise verb + adverb (well)', 'নির্দিষ্ট verb + adverb (well)') },
        { en: 'I learned it fast. → I picked it up quite quickly.', note: l('natural phrasal verb + adverb', 'স্বাভাবিক phrasal verb + adverb') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where it matters', 'কোথায় দরকার'),
      uses: [
        { skill: 'speaking', example: 'Part 1: "Do you like cooking?" "Yes, I find it really relaxing after a long day."', note: l('find it + adjective: a natural, accurate pattern.', 'find it + adjective: স্বাভাবিক, সঠিক pattern।') },
        { skill: 'speaking', example: 'Part 2: "I’d love to learn to swim properly, because…"', note: l('adverb "properly" makes the goal precise.', 'adverb "properly" লক্ষ্যটা নির্দিষ্ট করে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Speaking mistakes', 'Speaking-এর common ভুল'),
      items: [
        { wrong: 'I speak English very good.', right: 'I speak English very well.', why: l('It describes how you speak → adverb "well".', 'তুমি কীভাবে বলো তা বোঝায় → adverb "well"।') },
        { wrong: 'It was very interested.', right: 'It was very interesting.', why: l('The thing is interesting; you are interested.', 'জিনিসটা interesting; তুমি interested।') },
        { wrong: 'I am agree that…', right: 'I agree that…', why: l('agree is already a verb: no "am".', 'agree নিজেই verb: "am" লাগে না।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pie-6-p1', C, { prompt: l('Choose the best upgrade for "very good".', '"very good"-এর সবচেয়ে ভালো upgrade বাছো।'), sentence: 'Volunteering at the shelter was very good.', options: ['rewarding', 'rewardingly', 'reward'], answer: 'rewarding', pos: 'adjective', wrongPos: { rewardingly: 'adverb', reward: 'noun' }, explanation: l('was + adjective: rewarding.', 'was + adjective: rewarding।') }),
        choice('pie-6-p2', C, { prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'My brother cooks really ______.', options: ['well', 'good', 'goodly'], answer: 'well', pos: 'adverb', wrongPos: { good: 'adjective' }, why: { good: l('good is an adjective; for how he cooks, use "well".', 'good adjective; সে কীভাবে রান্না করে তা বোঝাতে "well"।'), goodly: l('"goodly" is not used for this; the adverb is "well".', 'এর জন্য "goodly" ব্যবহার হয় না; adverb হলো "well"।') }, explanation: l('cooks + adverb: well.', 'cooks + adverb: well।') }),
        choice('pie-6-p3', C, { prompt: l('Which answer is accurate AND natural for Speaking?', 'Speaking-এর জন্য কোন উত্তর সঠিক আর স্বাভাবিক?'), options: ['To be honest, I’d love to learn to draw.', 'To be honest, I would loving learn draw.', 'It is my desire to acquire the skill of drawing, as follows.'], answer: 'To be honest, I’d love to learn to draw.', explanation: l('Natural phrase + correct verb pattern (love to learn).', 'স্বাভাবিক phrase + সঠিক verb pattern (love to learn)।') }),
        choice('pie-6-p4', C, { prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'I was really ______ by the view from the top.', options: ['amazed', 'amazing', 'amaze'], answer: 'amazed', pos: 'adjective', explanation: l('The person feels → -ed: amazed.', 'মানুষ অনুভব করে → -ed: amazed।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        spot('pie-6-r1', C, { sentence: 'I can play the piano quite good now.', wrong: 'good', accepted: ['well'], pos: 'adverb', wrongPos: { good: 'adjective' }, explanation: l('How you play → adverb "well".', 'কীভাবে বাজাও → adverb "well"।') }),
        correct('pie-6-r2', C, { prompt: l('Fix the verb.', 'Verb-টা ঠিক করো।'), sentence: 'I am agree that everyone should learn to swim.', accepted: ['I agree that everyone should learn to swim.'], pattern: 'verb-form', explanation: l('agree is the verb: I agree.', 'agree-ই verb: I agree।') }),
        gap('pie-6-r3', C, { prompt: l('Upgrade "very good" with one precise adjective.', 'একটা নির্দিষ্ট adjective দিয়ে "very good" উন্নত করো।'), sentence: 'Learning a language is very good. → Learning a language is ______.', accepted: ['rewarding', 'useful', 'valuable', 'beneficial', 'enjoyable', 'fascinating', 'worthwhile', 'exciting', 'interesting', 'helpful', 'important'], pos: 'adjective', explanation: l('is + adjective: rewarding, useful, valuable…', 'is + adjective: rewarding, useful, valuable…') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pie-6-c1', C, { prompt: l('Is "kind of" wrong in Speaking?', 'Speaking-এ "kind of" কি ভুল?'), options: ['No, it is natural spoken English', 'Yes, it lowers the score', 'Yes, it is a grammar mistake'], answer: 'No, it is natural spoken English', explanation: l('Natural informal phrases are fine; accuracy matters.', 'স্বাভাবিক informal phrase চলবে; গুরুত্ব সঠিকতায়।') }),
        choice('pie-6-c2', C, { prompt: l('"I want to do it good." What is the best fix for a skill like swimming?', '"I want to do it good." সাঁতারের মতো skill-এর জন্য সবচেয়ে ভালো fix কী?'), options: ['I want to swim well.', 'I want to do it goodly.', 'I want to do well it.'], answer: 'I want to swim well.', explanation: l('A precise verb (swim) + adverb (well).', 'নির্দিষ্ট verb (swim) + adverb (well)।') }),
        gap('pie-6-c3', C, { prompt: l('Write one adverb to say how you learned it.', 'কীভাবে শিখেছো তা বলতে একটা adverb লেখো।'), sentence: 'I picked up the basics quite ______.', accepted: ['quickly', 'easily', 'fast', 'slowly', 'gradually', 'naturally'], pos: 'adverb', wrongPos: { quick: 'adjective', easy: 'adjective' }, explanation: l('picked up + adverb: quickly, easily…', 'picked up + adverb: quickly, easily…') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pie-6-w1', C, {
          prompt: l('Part 2: "Describe a skill you would like to learn." Say it in 3–4 sentences (write what you would say). Use one precise adjective and one adverb.', 'Part 2: "Describe a skill you would like to learn." ৩–৪টা sentence-এ বলো (যা বলবে তা লেখো)। একটা নির্দিষ্ট adjective আর একটা adverb ব্যবহার করো।'),
          model: 'To be honest, I’d love to learn photography. I think it’s a really creative hobby, and I’d like to take pictures of my city. I hope I can learn it quite quickly, maybe from online videos.',
          task: 'The student answers IELTS Speaking Part 2 "Describe a skill you would like to learn" in 3–4 spoken-style sentences. This is SPEAKING: contractions (I’d, it’s) and natural informal phrases (to be honest, kind of, I guess) are correct and must NOT be marked as errors. Check parts of speech: adjective vs adverb (good/well, quick/quickly), -ed/-ing adjectives, verb patterns (would like to + verb, enjoy + -ing), nouns and pronouns, prepositions. Quote each real error from the student’s own words and explain the job the word needs.',
          target: l('One precise adjective + one adverb, natural speech', 'একটা নির্দিষ্ট adjective + একটা adverb, স্বাভাবিক কথা'),
          checklist: [l('A precise adjective (not only "very good")', 'একটা নির্দিষ্ট adjective (শুধু "very good" না)'), l('An adverb for how (well, quickly)', 'কীভাবে বোঝাতে adverb (well, quickly)')],
          explanation: l('Natural + accurate beats formal + memorised.', 'স্বাভাবিক + সঠিক, formal + মুখস্থের চেয়ে ভালো।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('very good → a precise adjective; do it good → verb + well.', 'very good → নির্দিষ্ট adjective; do it good → verb + well।'),
        l('Natural spoken phrases are fine. Accuracy is the goal, not formality.', 'স্বাভাবিক কথ্য phrase চলবে। লক্ষ্য সঠিকতা, formality না।'),
      ],
    },
  ],
};

const wf: Lesson = {
  id: 'pie-7', unit: 'ielts', format: 'v2', concept: C, minutes: 7, difficulty: 'hard', skill: 'vocabulary',
  title: l('Word-form clues: one word, four jobs', 'Word-form সূত্র: এক word, চার কাজ'),
  why: l('IELTS rewards the right form of a word you already know: economy, economic, economical, economically are four different tools.', 'IELTS পুরস্কার দেয় চেনা word-এর সঠিক form-কে: economy, economic, economical, economically চারটা আলাদা হাতিয়ার।'),
  steps: [
    {
      kind: 'hook',
      title: l('Same root, different jobs', 'একই মূল, আলাদা কাজ'),
      situation: l('Task 2 sentence: "Tourism brings many ______ benefits to poor regions."', 'Task 2 sentence: "Tourism brings many ______ benefits to poor regions."'),
      question: l('Which form fits?', 'কোন form বসবে?'),
      options: ['economic', 'economy', 'economically'],
      answer: 'economic',
      diagnose: {
        economic: l('Yes. ___ benefits → adjective. "economic" = about money and trade.', 'হ্যাঁ। ___ benefits → adjective। "economic" = টাকা আর বাণিজ্য বিষয়ক।'),
        economy: l('"economy" is a noun (the country’s economy). Before "benefits" you need a describing word.', '"economy" noun (দেশের economy)। "benefits"-এর আগে describing word লাগে।'),
        economically: l('-ly describes a verb or adjective, not a noun like "benefits".', '-ly verb বা adjective-কে describe করে, "benefits"-এর মতো noun-কে না।'),
      },
    },
    identify({
      sentence: 'The economy/noun grew/verb economically/adverb weak/adjective regions./noun',
      choices: JOBS,
      pattern: l('One family, different jobs: economy (noun), economically (adverb, describing "weak"). Endings are strong clues.', 'একই family, আলাদা কাজ: economy (noun), economically (adverb, "weak"-কে describe করছে)। Ending শক্তিশালী সূত্র।'),
    }),
    {
      kind: 'concept',
      title: l('Clue → job → form', 'সূত্র → কাজ → form'),
      body: l('Step 1: read the clue around the gap (a/the → noun; ___ + noun → adjective; should/to → verb; describing a verb/adjective → adverb). Step 2: choose the family member with that job. Step 3: check number and tense (plural -s, past -ed). Watch families with two adjectives: economic (about the economy) vs economical (saving money); historic (important in history) vs historical (about the past).', 'ধাপ ১: gap-এর আশেপাশের সূত্র পড়ো (a/the → noun; ___ + noun → adjective; should/to → verb; verb/adjective-কে describe করলে → adverb)। ধাপ ২: family থেকে ওই কাজের member বাছো। ধাপ ৩: সংখ্যা আর tense দেখো (plural -s, past -ed)। দুই adjective-এর family খেয়াল করো: economic (economy বিষয়ক) বনাম economical (টাকা বাঁচায়); historic (ইতিহাসে গুরুত্বপূর্ণ) বনাম historical (অতীত বিষয়ক)।'),
      points: [
        l('succeed (v) · success (n) · successful (adj) · successfully (adv)', 'succeed (v) · success (n) · successful (adj) · successfully (adv)'),
        l('create (v) · creation / creativity (n) · creative (adj) · creatively (adv)', 'create (v) · creation / creativity (n) · creative (adj) · creatively (adv)'),
      ],
    },
    {
      kind: 'examples',
      title: l('One family in four jobs', 'এক family চার কাজে'),
      items: [
        { en: 'Many young people want to succeed in business.', note: l('to + verb', 'to + verb') },
        { en: 'Success often depends on hard work.', note: l('noun, subject', 'noun, subject') },
        { en: 'She runs a successful online shop.', note: l('adjective + noun', 'adjective + noun') },
        { en: 'The project was completed successfully.', note: l('verb + adverb', 'verb + adverb') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where it matters', 'কোথায় দরকার'),
      uses: [
        { skill: 'writing', example: 'Task 2: "Creative subjects help children think creatively."', note: l('Two forms of one word show range without new vocabulary.', 'একই word-এর দুই form নতুন vocabulary ছাড়াই range দেখায়।') },
        { skill: 'listening', example: 'Note: "Main aim: to improve ______ (creative)."', note: l('to improve ___ → noun: creativity. Spelling counts.', 'to improve ___ → noun: creativity। বানান গোনা হয়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'The economical growth of Asia', right: 'The economic growth of Asia', why: l('economic = about the economy; economical = cheap to run.', 'economic = economy বিষয়ক; economical = কম খরচে চলে।') },
        { wrong: 'She was very success.', right: 'She was very successful.', why: l('very + adjective.', 'very + adjective।') },
        { wrong: 'Children need creative.', right: 'Children need creativity.', why: l('need + noun (a thing).', 'need + noun (একটা জিনিস)।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pie-7-p1', C, { prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'Hybrid cars are more ______ than petrol cars.', options: ['economical', 'economic', 'economy'], answer: 'economical', pos: 'adjective', wrongPos: { economy: 'noun' }, family: 'economy', explanation: l('Cheap to run → economical.', 'কম খরচে চলে → economical।') }),
        choice('pie-7-p2', C, { prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'Art lessons develop children’s ______.', options: ['creativity', 'creative', 'creatively'], answer: 'creativity', pos: 'noun', wrongPos: { creative: 'adjective', creatively: 'adverb' }, family: 'create', explanation: l('develop + noun.', 'develop + noun।') }),
        choice('pie-7-p3', C, { prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'The new policy was ______ introduced in 2020.', options: ['successfully', 'successful', 'success'], answer: 'successfully', pos: 'adverb', wrongPos: { successful: 'adjective', success: 'noun' }, family: 'succeed', explanation: l('was ___ introduced → adverb.', 'was ___ introduced → adverb।') }),
        choice('pie-7-p4', C, { prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'The old fort is a ______ site that attracts tourists.', options: ['historic', 'history', 'historically'], answer: 'historic', pos: 'adjective', wrongPos: { history: 'noun', historically: 'adverb' }, family: 'history', explanation: l('a ___ site → adjective; historic = important in history.', 'a ___ site → adjective; historic = ইতিহাসে গুরুত্বপূর্ণ।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pie-7-r1', C, { prompt: l('Write the correct form of "compete".', '"compete"-এর সঠিক form লেখো।'), sentence: 'The job market is extremely ______.', base: 'compete', accepted: ['competitive'], pos: 'adjective', wrongPos: { compete: 'verb', competition: 'noun' }, family: 'compete', explanation: l('extremely + adjective: competitive.', 'extremely + adjective: competitive।') }),
        gap('pie-7-r2', C, { prompt: l('Write the correct form of "responsible".', '"responsible"-এর সঠিক form লেখো।'), sentence: 'Parents have a ______ to protect their children.', base: 'responsible', accepted: ['responsibility'], pos: 'noun', wrongPos: { responsible: 'adjective', responsibly: 'adverb' }, family: 'responsible', explanation: l('a ___ to → noun.', 'a ___ to → noun।') }),
        gap('pie-7-r3', C, { prompt: l('Write the correct form of "efficient".', '"efficient"-এর সঠিক form লেখো।'), sentence: 'Modern machines use energy more ______.', base: 'efficient', accepted: ['efficiently'], pos: 'adverb', wrongPos: { efficient: 'adjective', efficiency: 'noun' }, family: 'efficient', explanation: l('use + more + adverb.', 'use + more + adverb।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        spot('pie-7-c1', C, { sentence: 'Tourism brings economy benefits to small towns.', wrong: 'economy', accepted: ['economic'], pos: 'adjective', wrongPos: { economy: 'noun' }, family: 'economy', explanation: l('___ benefits → adjective: economic.', '___ benefits → adjective: economic।') }),
        choice('pie-7-c2', C, { prompt: l('Which clue tells you the gap needs a noun?', 'কোন সূত্র বলে gap-এ noun লাগবে?'), sentence: 'There is a lack of ______ in rural schools.', options: ['"a lack of" before it', 'the word "rural"', 'the full stop'], answer: '"a lack of" before it', explanation: l('of + ___ → noun (equipment, funding).', 'of + ___ → noun (equipment, funding)।') }),
        gap('pie-7-c3', C, { prompt: l('Write the correct form of "history".', '"history"-এর সঠিক form লেখো।'), sentence: 'The museum keeps ______ records of the city from 1800 to 1900.', base: 'history', accepted: ['historical'], pos: 'adjective', wrongPos: { history: 'noun' }, family: 'history', explanation: l('Records about the past → historical.', 'অতীত বিষয়ক record → historical।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pie-7-w1', C, {
          prompt: l('Write two sentences about education using two forms of the same word (e.g. creative + creativity, success + successfully).', 'Education নিয়ে দুটো sentence লেখো, একই word-এর দুই form ব্যবহার করে (যেমন creative + creativity, success + successfully)।'),
          model: 'Schools should encourage creativity. Creative students often solve problems in new ways.',
          task: 'The student writes two sentences on education using two different forms of the same word family. Check that each form matches its job (noun after verb/article, adjective before noun, adverb for how), that both are really from one family, and that the grammar is correct.',
          target: l('Two forms of one word family', 'এক word family-র দুই form'),
          checklist: [l('Two forms of one family', 'এক family-র দুই form'), l('Each form in the right job', 'প্রতিটা form ঠিক কাজে')],
          explanation: l('creativity (noun) · creative (adjective).', 'creativity (noun) · creative (adjective)।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Clue → job → form → number/tense.', 'সূত্র → কাজ → form → সংখ্যা/tense।'),
        l('economic ≠ economical; historic ≠ historical.', 'economic ≠ economical; historic ≠ historical।'),
      ],
    },
  ],
};

const gv: Lesson = {
  id: 'pie-8', unit: 'ielts', format: 'v2', concept: C, minutes: 7, difficulty: 'hard', skill: 'vocabulary',
  title: l('Grammar + vocabulary: words that go together', 'Grammar + vocabulary: যে word একসাথে চলে'),
  why: l('Collocations are built from jobs: verb + noun (make a decision), adjective + noun (heavy traffic), adverb + adjective (highly effective). The right partner sounds natural to the examiner.', 'Collocation কাজ দিয়েই গড়া: verb + noun (make a decision), adjective + noun (heavy traffic), adverb + adjective (highly effective)। ঠিক সঙ্গী examiner-এর কাছে স্বাভাবিক শোনায়।'),
  steps: [
    {
      kind: 'hook',
      title: l('Which partner?', 'কোন সঙ্গী?'),
      situation: l('Task 2: "Young people should ______ a decision about their career carefully."', 'Task 2: "Young people should ______ a decision about their career carefully."'),
      question: l('Which verb goes with "decision"?', '"decision"-এর সাথে কোন verb যায়?'),
      options: ['make', 'do', 'say'],
      answer: 'make',
      diagnose: {
        make: l('Yes: make a decision. The grammar needs a verb; the vocabulary chooses which one.', 'হ্যাঁ: make a decision। Grammar বলে verb লাগবে; vocabulary ঠিক করে কোনটা।'),
        do: l('"do" is a verb, so the grammar is fine, but English says "make a decision". That is collocation.', '"do" verb, তাই grammar ঠিক, কিন্তু English-এ বলে "make a decision"। এটাই collocation।'),
        say: l('We "say" words, not decisions. The partner of "decision" is "make".', 'আমরা word "say" করি, decision না। "decision"-এর সঙ্গী "make"।'),
      },
    },
    identify({
      sentence: 'Heavy/adjective traffic/noun causes/verb serious/adjective problems/noun in/preposition large/adjective cities./noun',
      choices: ['noun', 'verb', 'adjective', 'preposition'],
      pattern: l('Each noun has a natural adjective partner: heavy traffic, serious problems, large cities. Grammar says "adjective"; vocabulary says which one.', 'প্রতিটা noun-এর একটা স্বাভাবিক adjective সঙ্গী আছে: heavy traffic, serious problems, large cities। Grammar বলে "adjective"; vocabulary বলে কোনটা।'),
    }),
    {
      kind: 'concept',
      title: l('Job first, then the natural partner', 'আগে কাজ, তারপর স্বাভাবিক সঙ্গী'),
      body: l('Grammar tells you the job of the missing word; vocabulary tells you which word English speakers actually use there. Learn common IELTS partners as chunks: verb + noun (make a decision, have an effect, pose a threat, raise awareness), adjective + noun (heavy traffic, strong evidence, a major cause), adverb + adjective (highly effective, widely used, deeply concerned).', 'Grammar বলে বাদ পড়া word-এর কাজ; vocabulary বলে English ভাষীরা সেখানে আসলে কোন word ব্যবহার করে। IELTS-এর common সঙ্গীগুলো chunk হিসেবে শেখো: verb + noun (make a decision, have an effect, pose a threat, raise awareness), adjective + noun (heavy traffic, strong evidence, a major cause), adverb + adjective (highly effective, widely used, deeply concerned)।'),
      points: [
        l('have an effect ON something; play a role IN something.', 'have an effect ON something; play a role IN something।'),
        l('Wrong partner, right job: "do a mistake" ✗ → "make a mistake".', 'কাজ ঠিক, সঙ্গী ভুল: "do a mistake" ✗ → "make a mistake"।'),
      ],
    },
    {
      kind: 'examples',
      title: l('IELTS partners', 'IELTS-এর সঙ্গী'),
      items: [
        { en: 'Social media can raise awareness of health issues.', note: l('verb + noun: raise awareness', 'verb + noun: raise awareness') },
        { en: 'There is strong evidence that exercise reduces stress.', note: l('adjective + noun: strong evidence', 'adjective + noun: strong evidence') },
        { en: 'Vaccines are highly effective against many diseases.', note: l('adverb + adjective: highly effective', 'adverb + adjective: highly effective') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where it matters', 'কোথায় দরকার'),
      uses: [
        { skill: 'writing', example: 'Task 2: "Plastic waste poses a serious threat to marine life."', note: l('Natural collocations raise Lexical Resource.', 'স্বাভাবিক collocation Lexical Resource বাড়ায়।') },
        { skill: 'speaking', example: 'Part 3: "Parents play an important role in a child’s education."', note: l('play a role in: a chunk to use again and again.', 'play a role in: বারবার ব্যবহারের chunk।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'do a decision', right: 'make a decision', why: l('decision partners with make.', 'decision-এর সঙ্গী make।') },
        { wrong: 'strong traffic', right: 'heavy traffic', why: l('traffic partners with heavy.', 'traffic-এর সঙ্গী heavy।') },
        { wrong: 'This has a big affect on children.', right: 'This has a big effect on children.', why: l('have + noun: effect (noun). affect is the verb.', 'have + noun: effect (noun)। affect হলো verb।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pie-8-p1', C, { prompt: l('Choose the natural partner.', 'স্বাভাবিক সঙ্গী বাছো।'), sentence: 'Campaigns can ______ awareness of climate change.', options: ['raise', 'rise', 'grow'], answer: 'raise', tag: 'collocation', explanation: l('raise awareness (raise + object).', 'raise awareness (raise + object)।') }),
        choice('pie-8-p2', C, { prompt: l('Choose the natural partner.', 'স্বাভাবিক সঙ্গী বাছো।'), sentence: 'There is ______ evidence that sleep improves memory.', options: ['strong', 'heavy', 'tall'], answer: 'strong', tag: 'collocation', explanation: l('strong evidence.', 'strong evidence।') }),
        choice('pie-8-p3', C, { prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'Pollution has a serious ______ on health.', options: ['effect', 'affect', 'effective'], answer: 'effect', pos: 'noun', wrongPos: { affect: 'verb', effective: 'adjective' }, explanation: l('a serious ___ on → noun: effect.', 'a serious ___ on → noun: effect।') }),
        choice('pie-8-p4', C, { prompt: l('Choose the natural partner.', 'স্বাভাবিক সঙ্গী বাছো।'), sentence: 'English is ______ used in international business.', options: ['widely', 'wide', 'widen'], answer: 'widely', pos: 'adverb', wrongPos: { wide: 'adjective', widen: 'verb' }, explanation: l('is ___ used → adverb: widely used.', 'is ___ used → adverb: widely used।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pie-8-r1', C, { prompt: l('Write the verb that goes with "a mistake".', '"a mistake"-এর সাথে যে verb যায় তা লেখো।'), sentence: 'Everyone can ______ a mistake.', accepted: ['make'], tag: 'collocation', explanation: l('make a mistake.', 'make a mistake।') }),
        gap('pie-8-r2', C, { prompt: l('Write the adjective that goes with "traffic".', '"traffic"-এর সাথে যে adjective যায় তা লেখো।'), sentence: 'Dhaka is famous for its ______ traffic.', accepted: ['heavy', 'terrible', 'bad', 'awful'], tag: 'collocation', pos: 'adjective', explanation: l('heavy traffic.', 'heavy traffic।') }),
        spot('pie-8-r3', C, { sentence: 'Teachers play an important role on children’s development.', wrong: 'on', accepted: ['in'], pattern: 'prep-choice', tag: 'preposition', explanation: l('play a role IN something.', 'play a role IN something।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pie-8-c1', C, { prompt: l('In "make a decision", what does grammar decide and what does vocabulary decide?', '"make a decision"-এ grammar কী ঠিক করে আর vocabulary কী ঠিক করে?'), options: ['Grammar: a verb is needed; vocabulary: it is "make"', 'Grammar decides everything', 'Vocabulary decides the job'], answer: 'Grammar: a verb is needed; vocabulary: it is "make"', explanation: l('Job + natural partner.', 'কাজ + স্বাভাবিক সঙ্গী।') }),
        spot('pie-8-c2', C, { sentence: 'Smoking poses a serious threat for public health.', wrong: 'for', accepted: ['to'], fixOptions: ['to', 'on', 'at'], pattern: 'prep-choice', tag: 'preposition', explanation: l('pose a threat TO something.', 'pose a threat TO something।') }),
        gap('pie-8-c3', C, { prompt: l('Write the adverb that goes with "effective".', '"effective"-এর সাথে যে adverb যায় তা লেখো।'), sentence: 'The new vaccine is ______ effective.', accepted: ['highly', 'very', 'extremely'], tag: 'collocation', pos: 'adverb', explanation: l('highly effective.', 'highly effective।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pie-8-w1', C, {
          prompt: l('Write two sentences on health using two collocations from this lesson (e.g. have an effect on, raise awareness, strong evidence, highly effective).', 'এই lesson-এর দুটো collocation ব্যবহার করে health নিয়ে দুটো sentence লেখো (যেমন have an effect on, raise awareness, strong evidence, highly effective)।'),
          model: 'Regular exercise has a positive effect on mental health. Schools should raise awareness of healthy eating.',
          task: 'The student writes two sentences on health using collocations such as have an effect on, raise awareness, strong evidence, highly effective, play a role in. Check the collocation partners (verb + noun, adjective + noun, adverb + adjective), the prepositions (effect on, role in, threat to), effect vs affect, and general grammar.',
          target: l('Two natural collocations', 'দুটো স্বাভাবিক collocation'),
          checklist: [l('Right partner words', 'ঠিক সঙ্গী word'), l('Right preposition (effect on, role in)', 'ঠিক preposition (effect on, role in)')],
          explanation: l('Job first, then the natural partner.', 'আগে কাজ, তারপর স্বাভাবিক সঙ্গী।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Grammar gives the job; vocabulary gives the partner.', 'Grammar কাজ দেয়; vocabulary সঙ্গী দেয়।'),
        l('Learn chunks: make a decision, have an effect on, play a role in, heavy traffic.', 'Chunk শেখো: make a decision, have an effect on, play a role in, heavy traffic।'),
      ],
    },
  ],
};

const ch: Lesson = {
  id: 'pie-9', unit: 'ielts', format: 'v2', concept: C, minutes: 9, difficulty: 'hard', skill: 'grammar',
  title: l('IELTS application challenge', 'IELTS application challenge'),
  why: l('One short run through all four skills: read, listen, write and speak with the right word in the right job.', 'চার skill জুড়ে একটা ছোট দৌড়: সঠিক কাজে সঠিক word দিয়ে পড়া, শোনা, লেখা আর বলা।'),
  steps: [
    {
      kind: 'hook',
      title: l('A Task 1 sentence', 'একটা Task 1 sentence'),
      situation: l('A student’s Task 1: "The number of cars rose dramatic between 2000 and 2010."', 'একজন student-এর Task 1: "The number of cars rose dramatic between 2000 and 2010."'),
      question: l('Which word has the wrong job?', 'কোন word-এর কাজ ভুল?'),
      options: ['dramatic', 'number', 'between'],
      answer: 'dramatic',
      diagnose: {
        dramatic: l('Yes: it describes how the number rose → adverb "dramatically".', 'হ্যাঁ: সংখ্যাটা কীভাবে বাড়লো তা বোঝায় → adverb "dramatically"।'),
        number: l('"The number of" is correct (a noun). Look at the word that describes "rose".', '"The number of" ঠিক (noun)। "rose"-কে describe করা word-টা দেখো।'),
        between: l('"between 2000 and 2010" is correct. The problem is the word after "rose".', '"between 2000 and 2010" ঠিক। সমস্যা "rose"-এর পরের word-এ।'),
      },
    },
    identify({
      sentence: 'The number/noun of cars/noun rose/verb dramatically/adverb between/preposition 2000 and 2010.',
      choices: ['noun', 'verb', 'adverb', 'preposition'],
      pattern: l('Task 1 in one line: noun (what) + verb (trend) + adverb (how) + preposition (when).', 'এক line-এ Task 1: noun (কী) + verb (trend) + adverb (কীভাবে) + preposition (কখন)।'),
    }),
    {
      kind: 'concept',
      title: l('One checklist for all four skills', 'চার skill-এর জন্য একটা checklist'),
      body: l('Reading: unknown word → job from its position, meaning from its neighbours. Listening: predict the type (N, #, D, Adj) before the recording. Writing: should/to + verb; adjective + noun; verb + adverb; a/the/of + noun. Speaking: precise adjectives, "well" for how, natural phrases are fine.', 'Reading: অচেনা word → জায়গা থেকে কাজ, আশেপাশ থেকে অর্থ। Listening: recording-এর আগে ধরন আন্দাজ (N, #, D, Adj)। Writing: should/to + verb; adjective + noun; verb + adverb; a/the/of + noun। Speaking: নির্দিষ্ট adjective, কীভাবে বোঝাতে "well", স্বাভাবিক phrase চলবে।'),
    },
    {
      kind: 'examples',
      title: l('The checklist in action', 'কাজে checklist'),
      items: [
        { en: 'Reading: "the gradual erosion of the coast" → erosion = noun (something slowly happening to the coast).', note: l('job + neighbours', 'কাজ + আশেপাশ') },
        { en: 'Writing: "Governments should invest heavily in renewable energy."', note: l('should + verb + adverb; adjective + noun', 'should + verb + adverb; adjective + noun') },
        { en: 'Speaking: "I’d say it’s incredibly useful."', note: l('adverb + adjective, natural contraction', 'adverb + adjective, স্বাভাবিক contraction') },
      ],
    },
    {
      kind: 'ielts',
      title: l('All four skills', 'চার skill'),
      uses: [
        { skill: 'reading', example: '"a marked decline in…" = "fell noticeably"', note: l('Paraphrase by changing jobs.', 'কাজ বদলে paraphrase।') },
        { skill: 'listening', example: '"Deposit: £______" → a number', note: l('Predict before you hear.', 'শোনার আগে আন্দাজ।') },
        { skill: 'writing', example: '"rose dramatically" / "a dramatic rise"', note: l('Both forms, both correct.', 'দুই form, দুটোই ঠিক।') },
        { skill: 'speaking', example: '"I play it quite well."', note: l('adverb for how.', 'কীভাবে বোঝাতে adverb।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Mixed mistakes', 'মিশ্র ভুল'),
      items: [
        { wrong: 'The number of students are increasing.', right: 'The number of students is increasing.', why: l('The subject is "the number" (singular).', 'Subject হলো "the number" (singular)।') },
        { wrong: 'It has a positively effect.', right: 'It has a positive effect.', why: l('adjective + noun.', 'adjective + noun।') },
        { wrong: 'Sales increased by 20% in March to May.', right: 'Sales increased by 20% from March to May.', why: l('Time range: from … to.', 'সময়ের পরিসর: from … to।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pie-9-p1', C, { prompt: l('Reading: what job is "erosion" doing?', 'Reading: "erosion" কী কাজ করছে?'), sentence: 'The gradual erosion of the coastline worries local residents.', options: ['noun', 'verb', 'adjective'], answer: 'noun', pos: 'noun', wrongPos: { verb: 'verb', adjective: 'adjective' }, explanation: l('the gradual ___ of → noun; the verb is "worries".', 'the gradual ___ of → noun; verb হলো "worries"।') }),
        choice('pie-9-p2', C, { prompt: l('Listening: predict the answer type.', 'Listening: উত্তরের ধরন আন্দাজ করো।'), sentence: 'Please arrive at least ______ minutes early.', options: ['a number', 'an adjective', 'a place'], answer: 'a number', explanation: l('___ minutes → a number.', '___ minutes → সংখ্যা।') }),
        choice('pie-9-p3', C, { prompt: l('Writing: choose the correct word.', 'Writing: সঠিক word বাছো।'), sentence: 'The number of visitors ______ steadily after 2015.', options: ['grew', 'growth', 'growing'], answer: 'grew', pos: 'verb', wrongPos: { growth: 'noun' }, explanation: l('The sentence needs its main verb: grew.', 'Sentence-এর main verb লাগবে: grew।') }),
        choice('pie-9-p4', C, { prompt: l('Speaking: choose the accurate, natural answer.', 'Speaking: সঠিক, স্বাভাবিক উত্তর বাছো।'), options: ['I think cooking is really relaxing.', 'I think cooking is really relax.', 'I think cooking is real relaxingly.'], answer: 'I think cooking is really relaxing.', explanation: l('really (adverb) + relaxing (adjective).', 'really (adverb) + relaxing (adjective)।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        spot('pie-9-r1', C, { sentence: 'The number of cars rose dramatic between 2000 and 2010.', wrong: 'dramatic', accepted: ['dramatically'], pos: 'adverb', wrongPos: { dramatic: 'adjective' }, explanation: l('rose + adverb: dramatically.', 'rose + adverb: dramatically।') }),
        correct('pie-9-r2', C, { prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে লেখো।'), sentence: 'The number of students are increasing every year.', accepted: ['The number of students is increasing every year.'], pattern: 'sv-agreement', tag: 'agreement', explanation: l('"The number" is singular → is.', '"The number" singular → is।') }),
        gap('pie-9-r3', C, { prompt: l('Write the noun form of "grow" to paraphrase.', 'Paraphrase-এর জন্য "grow"-এর noun form লেখো।'), sentence: 'Car ownership grew rapidly. → There was a rapid ______ in car ownership.', base: 'grow', accepted: ['growth'], pos: 'noun', wrongPos: { grow: 'verb', grew: 'verb', growing: 'verb' }, family: 'grow', explanation: l('a rapid ___ in → noun: growth.', 'a rapid ___ in → noun: growth।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        tagWords('pie-9-c1', C, { sentence: 'Governments/noun should/verb invest/verb heavily/adverb in renewable/adjective energy./noun', choices: JOBS, explanation: l('WHO + should + verb + adverb (how) + adjective + noun.', 'কে + should + verb + adverb (কীভাবে) + adjective + noun।') }),
        order('pie-9-c2', C, { prompt: l('Build the Task 1 sentence.', 'Task 1 sentence-টা বানাও।'), answer: 'Coffee sales rose sharply in the second quarter.', explanation: l('noun + verb + adverb + time.', 'noun + verb + adverb + সময়।') }),
        spot('pie-9-c3', C, { sentence: 'Visitor numbers peaked in 5,000 in July.', wrong: 'in', accepted: ['at'], pattern: 'prep-choice', tag: 'preposition', explanation: l('peaked at + the highest number.', 'peaked at + সর্বোচ্চ সংখ্যা।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pie-9-w1', C, {
          prompt: l('Task 1: describe one trend in two ways: verb + adverb ("rose sharply") and adjective + noun ("a sharp rise").', 'Task 1: একটা trend দুইভাবে বর্ণনা করো: verb + adverb ("rose sharply") আর adjective + noun ("a sharp rise")।'),
          model: 'Internet use rose sharply between 2010 and 2020. There was a sharp rise in internet use between 2010 and 2020.',
          task: 'The student describes one Task 1 trend twice: once with verb + adverb, once with adjective + noun. Check the adverb after the verb, the adjective before the noun, correct prepositions (in, between … and, from … to, by, to), subject-verb agreement and past tense.',
          target: l('verb + adverb · adjective + noun', 'verb + adverb · adjective + noun'),
          checklist: [l('verb + adverb', 'verb + adverb'), l('adjective + noun', 'adjective + noun')],
          explanation: l('rose sharply = a sharp rise.', 'rose sharply = a sharp rise।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Read: job → meaning. Listen: predict the type. Write: check every job. Speak: precise and natural.', 'পড়া: কাজ → অর্থ। শোনা: ধরন আন্দাজ। লেখা: প্রতিটা কাজ পরীক্ষা। বলা: নির্দিষ্ট আর স্বাভাবিক।'),
      ],
    },
  ],
};

export const posIeltsLessonsB: Lesson[] = [sp, wf, gv, ch];

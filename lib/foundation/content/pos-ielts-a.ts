import type { Lesson, Pos } from '../model';
import { choice, correct, gap, identify, l, order, spot, tagWords, write } from './pos-kit';

/**
 * Parts of Speech in IELTS (1/2): Reading, Listening, Writing accuracy, sentence building.
 * No new theory: the jobs from earlier units, used on IELTS-style sentences. Original Vocab Brain content.
 */
const C = 'pos-ielts';
const JOBS: Pos[] = ['noun', 'verb', 'adjective', 'adverb'];
const JOBS5: Pos[] = ['noun', 'verb', 'adjective', 'adverb', 'preposition'];

const r1: Lesson = {
  id: 'pie-1', unit: 'ielts', format: 'v2', concept: C, minutes: 7, difficulty: 'medium', skill: 'reading',
  title: l('Reading: understand words you don’t know', 'Reading: অচেনা word বোঝা'),
  why: l('Every Reading passage has words you have never seen. Their job and their neighbours still tell you a lot.', 'প্রতিটা Reading passage-এ এমন word থাকে যা তুমি আগে দেখোনি। তাদের কাজ আর আশেপাশের word তবুও অনেক কিছু বলে দেয়।'),
  steps: [
    {
      kind: 'hook',
      title: l('An unknown word', 'একটা অচেনা word'),
      situation: l('Reading passage: "The rapid expansion of urban areas has reduced the amount of farmland." You don’t know "expansion".', 'Reading passage: "The rapid expansion of urban areas has reduced the amount of farmland." তুমি "expansion" চেনো না।'),
      question: l('What can you still say about "expansion"?', '"expansion" সম্পর্কে তবুও কী বলা যায়?'),
      options: ['It is a thing (noun) that happened quickly to cities', 'Nothing: I must skip the whole sentence', 'It is a verb, the action of the sentence'],
      answer: 'It is a thing (noun) that happened quickly to cities',
      diagnose: {
        'It is a thing (noun) that happened quickly to cities': l('Exactly. "the rapid ___ of" can only hold a noun, and "rapid" + "urban areas" tell you it is something growing fast in cities.', 'ঠিক। "the rapid ___ of"-এ শুধু noun বসে, আর "rapid" + "urban areas" বলে দেয় এটা শহরে দ্রুত বাড়তে থাকা কিছু।'),
        'Nothing: I must skip the whole sentence': l('You know more than you think. The job of the word and its neighbours give you the general meaning.', 'তুমি যতটা ভাবছো তার চেয়ে বেশি জানো। Word-এর কাজ আর আশেপাশের word সাধারণ অর্থটা দিয়ে দেয়।'),
        'It is a verb, the action of the sentence': l('The action is "has reduced". "expansion" comes after "the rapid", so it is a thing: a noun.', 'কাজটা হলো "has reduced"। "expansion" আছে "the rapid"-এর পরে, তাই এটা একটা জিনিস: noun।'),
      },
    },
    identify({
      sentence: 'The rapid/adjective expansion/noun of urban/adjective areas/noun has reduced/verb farmland./noun',
      choices: JOBS,
      pattern: l('Even with one unknown word, the jobs show the skeleton: WHAT (expansion of urban areas) did WHAT (reduced) to WHAT (farmland).', 'একটা word অচেনা হলেও কাজগুলো কাঠামোটা দেখায়: কী (expansion of urban areas) কী করলো (reduced) কীসের উপর (farmland)।'),
    }),
    {
      kind: 'concept',
      title: l('Job first, meaning second', 'আগে কাজ, তারপর অর্থ'),
      body: l('When a word is new, first find its job from its position: after the/a/rapid → noun; after to/can/has → verb; before a noun → adjective; next to a verb, often with -ly → adverb. Then use the neighbours to guess the general meaning. This does not give you the dictionary meaning, but it is often enough to follow the sentence and match it to a question.', 'নতুন word পেলে আগে জায়গা দেখে তার কাজ বের করো: the/a/rapid-এর পরে → noun; to/can/has-এর পরে → verb; noun-এর আগে → adjective; verb-এর পাশে, প্রায়ই -ly সহ → adverb। তারপর আশেপাশের word দিয়ে সাধারণ অর্থ আন্দাজ করো। এতে dictionary-র অর্থ পাবে না, কিন্তু sentence বুঝতে আর প্রশ্নের সাথে মেলাতে প্রায়ই এটুকুই যথেষ্ট।'),
      points: [
        l('Endings help: -tion/-ment/-ity = noun; -ous/-ive/-al = adjective; -ly = usually adverb; -ise/-ify = verb.', 'Ending সাহায্য করে: -tion/-ment/-ity = noun; -ous/-ive/-al = adjective; -ly = সাধারণত adverb; -ise/-ify = verb।'),
        l('Job + context narrows the meaning. It does not answer the question for you: always check the passage.', 'কাজ + প্রসঙ্গ অর্থটা সংকুচিত করে। প্রশ্নের উত্তর নিজে দেয় না: সবসময় passage দেখো।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Guess the job, then the meaning', 'কাজ আন্দাজ করো, তারপর অর্থ'),
      items: [
        { en: 'Farmers faced an arduous journey to the market.', note: l('an ___ journey → adjective describing the journey: probably "difficult, tiring".', 'an ___ journey → journey-কে describe করা adjective: সম্ভবত "কঠিন, ক্লান্তিকর"।') },
        { en: 'The new law aims to mitigate the effects of flooding.', note: l('to ___ the effects → verb; with "flooding", probably "reduce".', 'to ___ the effects → verb; "flooding"-এর সাথে, সম্ভবত "কমানো"।') },
        { en: 'Prices rose precipitously after the drought.', note: l('rose ___ → adverb of how prices rose: "very suddenly".', 'rose ___ → দাম কীভাবে বাড়লো তার adverb: "খুব হঠাৎ"।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps in Reading', 'Reading-এ কোথায় কাজে লাগে'),
      uses: [
        { skill: 'reading', example: 'Question: "Cities have grown quickly." Passage: "the rapid expansion of urban areas".', note: l('Paraphrase often changes the job: grown quickly (verb + adverb) = rapid expansion (adjective + noun).', 'Paraphrase-এ প্রায়ই কাজ বদলায়: grown quickly (verb + adverb) = rapid expansion (adjective + noun)।') },
        { skill: 'reading', example: 'True / False / Not Given: find the verb of the passage sentence first.', note: l('The verb carries the claim (has reduced, may reduce, did not reduce). Misreading it changes the answer.', 'Verb-ই দাবিটা বহন করে (has reduced, may reduce, did not reduce)। এটা ভুল পড়লে উত্তর বদলে যায়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Reading traps', 'Reading-এর common ফাঁদ'),
      items: [
        { wrong: 'Stopping at every unknown word', right: 'Find its job, guess the general meaning, keep reading', why: l('You lose time. Most questions don’t need the exact meaning of every word.', 'সময় নষ্ট হয়। বেশিরভাগ প্রশ্নে প্রতিটা word-এর সঠিক অর্থ লাগে না।') },
        { wrong: 'Matching the same word only ("expand" in the question, "expand" in the passage)', right: 'Also look for its family: expansion, expanding, expanded', why: l('IELTS paraphrases by changing the word form.', 'IELTS word form বদলে paraphrase করে।') },
        { wrong: 'Guessing the meaning from the job alone', right: 'Job + neighbours + the rest of the paragraph', why: l('The job narrows the meaning; the context confirms it.', 'কাজ অর্থকে সংকুচিত করে; প্রসঙ্গ নিশ্চিত করে।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pie-1-p1', C, { prompt: l('What job is "proliferation" doing?', '"proliferation" কী কাজ করছে?'), sentence: 'The proliferation of mobile phones has changed how people communicate.', options: ['noun', 'verb', 'adjective'], answer: 'noun', pos: 'noun', wrongPos: { verb: 'verb', adjective: 'adjective' }, explanation: l('"The ___ of" → noun. The verb is "has changed".', '"The ___ of" → noun। Verb হলো "has changed"।') }),
        choice('pie-1-p2', C, { prompt: l('"Arduous" describes the journey. What does it most likely mean?', '"Arduous" journey-কে describe করছে। সম্ভাব্য অর্থ কী?'), sentence: 'After an arduous twelve-hour climb, the team finally reached the summit.', options: ['very difficult and tiring', 'short and easy', 'dangerous for animals'], answer: 'very difficult and tiring', explanation: l('Adjective of a twelve-hour climb that ends with "finally": difficult, tiring.', 'বারো ঘণ্টার climb, শেষে "finally": কঠিন, ক্লান্তিকর।') }),
        choice('pie-1-p3', C, { prompt: l('Which passage phrase paraphrases "Tourism has grown dramatically"?', '"Tourism has grown dramatically"-এর paraphrase কোনটা?'), options: ['a dramatic growth in tourism', 'tourism is dramatic', 'a growing tourist'], answer: 'a dramatic growth in tourism', explanation: l('grown (verb) → growth (noun); dramatically (adverb) → dramatic (adjective).', 'grown (verb) → growth (noun); dramatically (adverb) → dramatic (adjective)।') }),
        tagWords('pie-1-p4', C, { sentence: 'Scientists/noun gradually/adverb identified/verb the hidden/adjective causes./noun', choices: JOBS, explanation: l('Scientists (who) · gradually (how) · identified (action) · hidden (describes causes) · causes (what).', 'Scientists (কে) · gradually (কীভাবে) · identified (কাজ) · hidden (causes-কে describe করে) · causes (কী)।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pie-1-r1', C, { prompt: l('Write the job of "mitigate" (noun, verb, adjective or adverb).', '"mitigate"-এর কাজ লেখো (noun, verb, adjective বা adverb)।'), sentence: 'Governments must mitigate the risks of flooding. → mitigate = ___', accepted: ['verb'], pos: 'verb', wrongPos: { noun: 'noun', adjective: 'adjective', adverb: 'adverb' }, explanation: l('must + base verb.', 'must + base verb।') }),
        gap('pie-1-r2', C, { prompt: l('Write the job of "scarcity".', '"scarcity"-এর কাজ লেখো।'), sentence: 'The scarcity of clean water affects millions. → scarcity = ___', accepted: ['noun'], pos: 'noun', wrongPos: { verb: 'verb', adjective: 'adjective', adverb: 'adverb' }, explanation: l('"The ___ of" and -ity → noun.', '"The ___ of" আর -ity → noun।') }),
        gap('pie-1-r3', C, { prompt: l('Paraphrase with a noun: "Crime increased" → "an ___ in crime".', 'Noun দিয়ে paraphrase: "Crime increased" → "an ___ in crime"।'), sentence: 'an ___ in crime', accepted: ['increase', 'rise'], family: 'increase', explanation: l('increased (verb) → an increase (noun).', 'increased (verb) → an increase (noun)।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pie-1-c1', C, { prompt: l('Why does knowing the job help with an unknown word?', 'অচেনা word-এর কাজ জানলে কেন সাহায্য হয়?'), options: ['It shows the sentence skeleton and narrows the meaning', 'It gives the exact dictionary meaning', 'It tells you the answer to the question'], answer: 'It shows the sentence skeleton and narrows the meaning', explanation: l('It narrows; the passage confirms.', 'এটা সংকুচিত করে; passage নিশ্চিত করে।') }),
        choice('pie-1-c2', C, { prompt: l('"The results were inconclusive." What job is "inconclusive" doing?', '"The results were inconclusive."-এ "inconclusive" কী কাজ করছে?'), options: ['adjective', 'adverb', 'noun'], answer: 'adjective', pos: 'adjective', wrongPos: { adverb: 'adverb', noun: 'noun' }, explanation: l('After "were", describing the results → adjective.', '"were"-এর পরে, results-কে describe করছে → adjective।') }),
        spot('pie-1-c3', C, { sentence: 'The passage describes a rapidly expansion of the city.', wrong: 'rapidly', accepted: ['rapid'], pos: 'adjective', wrongPos: { rapidly: 'adverb' }, explanation: l('a ___ expansion (noun) → adjective.', 'a ___ expansion (noun) → adjective।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pie-1-w1', C, {
          prompt: l('Paraphrase this passage sentence by changing at least one word form: "Online shopping has grown rapidly."', 'অন্তত একটা word form বদলে এই sentence-টা paraphrase করো: "Online shopping has grown rapidly."'),
          model: 'There has been a rapid growth in online shopping.',
          task: 'The student paraphrases "Online shopping has grown rapidly." by changing at least one word form (e.g. grown → growth, rapidly → rapid). Check that the meaning stays the same, that each changed word has the correct form for its job, and that the sentence is grammatical.',
          target: l('Change the job of a word: grown → growth, rapidly → rapid', 'একটা word-এর কাজ বদলাও: grown → growth, rapidly → rapid'),
          checklist: [l('Same meaning', 'অর্থ একই'), l('At least one word in a new form', 'অন্তত একটা word নতুন form-এ')],
          explanation: l('grew rapidly → a rapid growth.', 'grew rapidly → a rapid growth।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Unknown word? Job first (from its position), meaning second (from its neighbours).', 'অচেনা word? আগে কাজ (জায়গা থেকে), তারপর অর্থ (আশেপাশের word থেকে)।'),
        l('Paraphrases often change the job: grow quickly = rapid growth.', 'Paraphrase-এ প্রায়ই কাজ বদলায়: grow quickly = rapid growth।'),
      ],
    },
  ],
};

const r2: Lesson = {
  id: 'pie-2', unit: 'ielts', format: 'v2', concept: C, minutes: 7, difficulty: 'medium', skill: 'reading',
  title: l('Reading: predict the gap', 'Reading: gap আন্দাজ করা'),
  why: l('In summary and sentence completion, the words around the gap tell you the job of the answer before you search.', 'Summary আর sentence completion-এ gap-এর আশেপাশের word খোঁজার আগেই উত্তরের কাজ বলে দেয়।'),
  steps: [
    {
      kind: 'hook',
      title: l('Before you search', 'খোঁজার আগে'),
      situation: l('Summary completion: "The study found that the ______ of plastic bags fell after the tax was introduced."', 'Summary completion: "The study found that the ______ of plastic bags fell after the tax was introduced."'),
      question: l('What kind of word are you looking for in the passage?', 'Passage-এ কী ধরনের word খুঁজবে?'),
      options: ['A noun (a thing that can fall), e.g. use', 'A verb, e.g. use', 'An adverb, e.g. rarely'],
      answer: 'A noun (a thing that can fall), e.g. use',
      diagnose: {
        'A noun (a thing that can fall), e.g. use': l('Yes. "the ___ of" is a noun position, and the noun must be something that can "fall": use, number, sale.', 'হ্যাঁ। "the ___ of" হলো noun-এর জায়গা, আর noun-টা এমন কিছু যা "fall" করতে পারে: use, number, sale।'),
        'A verb, e.g. use': l('The verb of the clause is "fell". "the ___ of" needs a noun (here "use" is a noun).', 'Clause-এর verb হলো "fell"। "the ___ of"-এ noun লাগে (এখানে "use" noun)।'),
        'An adverb, e.g. rarely': l('An adverb cannot follow "the". Look at the neighbours: the ___ of → noun.', 'Adverb "the"-এর পরে বসে না। আশেপাশে দেখো: the ___ of → noun।'),
      },
    },
    identify({
      sentence: 'The tax/noun led/verb to a sharp/adjective fall/noun in plastic/adjective waste./noun',
      choices: JOBS,
      pattern: l('"fall" is a noun here (a sharp fall). The same word can do different jobs: the neighbours decide.', 'এখানে "fall" noun (a sharp fall)। একই word ভিন্ন কাজ করতে পারে: আশেপাশের word ঠিক করে দেয়।'),
    }),
    {
      kind: 'concept',
      title: l('Read the gap before the passage', 'Passage-এর আগে gap পড়ো'),
      body: l('For every gap, spend five seconds on its neighbours. the/a/an/of + ___ → noun; ___ + noun → adjective; to/will/should + ___ → verb; after a verb, telling how → adverb. Then check grammar: singular or plural noun? Past or present verb? Your answer must fit the sentence exactly, and the word limit (e.g. ONE WORD ONLY).', 'প্রতিটা gap-এর আশেপাশে পাঁচ সেকেন্ড দাও। the/a/an/of + ___ → noun; ___ + noun → adjective; to/will/should + ___ → verb; verb-এর পরে, কীভাবে বলছে → adverb। তারপর grammar দেখো: noun singular না plural? Verb past না present? উত্তর sentence-এ ঠিকঠাক বসতে হবে, আর word limit (যেমন ONE WORD ONLY) মানতে হবে।'),
      points: [
        l('a/an + ___ → a singular noun (or adjective + noun).', 'a/an + ___ → singular noun (বা adjective + noun)।'),
        l('The word you copy must be exactly as in the passage: don’t change its form.', 'Passage থেকে যে word নেবে তা হুবহু: form বদলাবে না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Predict first', 'আগে আন্দাজ'),
      items: [
        { en: 'Bees are ______ for the pollination of many crops.', note: l('are + ___ + for → adjective (essential, important).', 'are + ___ + for → adjective (essential, important)।') },
        { en: 'Researchers hope to ______ the spread of the disease.', note: l('to + ___ + the spread → verb (limit, slow).', 'to + ___ + the spread → verb (limit, slow)।') },
        { en: 'The population increased ______ during the 1990s.', note: l('increased + ___ → adverb (steadily, rapidly).', 'increased + ___ → adverb (steadily, rapidly)।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('IELTS question types', 'IELTS প্রশ্নের ধরন'),
      uses: [
        { skill: 'reading', example: 'Summary completion: "…caused a ______ in fish numbers." (ONE WORD)', note: l('a + ___ + in → a singular noun: decline, reduction, drop.', 'a + ___ + in → singular noun: decline, reduction, drop।') },
        { skill: 'reading', example: 'Sentence completion: "Early settlers found the land extremely ______."', note: l('extremely + ___ at the end → adjective: fertile, dry.', 'extremely + ___ শেষে → adjective: fertile, dry।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'a ______ in sales → "declined"', right: 'a decline in sales', why: l('After "a" you need a noun, not a verb form.', '"a"-এর পরে noun লাগে, verb form না।') },
        { wrong: 'the ______ of forests → "destroy"', right: 'the destruction of forests', why: l('the ___ of → noun. If the passage says "destruction", copy that exact word.', 'the ___ of → noun। Passage-এ "destruction" থাকলে হুবহু সেটাই লেখো।') },
        { wrong: 'many ______ were built → "house"', right: 'many houses were built', why: l('many + plural noun; "were" confirms plural.', 'many + plural noun; "were" plural নিশ্চিত করে।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pie-2-p1', C, { prompt: l('Which word fits the gap?', 'Gap-এ কোন word বসবে?'), sentence: 'The report describes a steady ______ in air quality.', options: ['improvement', 'improve', 'improved'], answer: 'improvement', pos: 'noun', wrongPos: { improve: 'verb', improved: 'verb' }, family: 'improve', explanation: l('a steady ___ in → noun.', 'a steady ___ in → noun।') }),
        choice('pie-2-p2', C, { prompt: l('Which word fits the gap?', 'Gap-এ কোন word বসবে?'), sentence: 'Solar panels have become far more ______ in recent years.', options: ['affordable', 'afford', 'affordably'], answer: 'affordable', pos: 'adjective', wrongPos: { afford: 'verb', affordably: 'adverb' }, family: 'afford', explanation: l('become more ___ → adjective.', 'become more ___ → adjective।') }),
        choice('pie-2-p3', C, { prompt: l('What job does the gap need?', 'Gap-এ কোন কাজের word লাগবে?'), sentence: 'Farmers were forced to ______ their land.', options: ['verb', 'noun', 'adverb'], answer: 'verb', pos: 'verb', wrongPos: { noun: 'noun', adverb: 'adverb' }, explanation: l('to + ___ + their land → verb (abandon, sell).', 'to + ___ + their land → verb (abandon, sell)।') }),
        choice('pie-2-p4', C, { prompt: l('ONE WORD ONLY. Which answer fits?', 'ONE WORD ONLY। কোন উত্তর বসবে?'), sentence: 'Many ______ moved to the coast.', options: ['families', 'family', 'familiar'], answer: 'families', pos: 'noun', wrongPos: { familiar: 'adjective' }, pattern: 'noun-count', explanation: l('Many + plural noun.', 'Many + plural noun।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pie-2-r1', C, { prompt: l('Write the job the gap needs.', 'Gap-এ কোন কাজের word লাগবে লেখো।'), sentence: 'The museum attracts a large ______ of visitors. → ___', accepted: ['noun'], pos: 'noun', wrongPos: { verb: 'verb', adjective: 'adjective', adverb: 'adverb' }, explanation: l('a large ___ of → noun (number).', 'a large ___ of → noun (number)।') }),
        gap('pie-2-r2', C, { prompt: l('Write the job the gap needs.', 'Gap-এ কোন কাজের word লাগবে লেখো।'), sentence: 'Sea levels are rising ______. → ___', accepted: ['adverb'], pos: 'adverb', wrongPos: { noun: 'noun', verb: 'verb', adjective: 'adjective' }, explanation: l('rising + ___ → how → adverb.', 'rising + ___ → কীভাবে → adverb।') }),
        gap('pie-2-r3', C, { prompt: l('Complete with the right form of "produce".', '"produce"-এর ঠিক form লেখো।'), sentence: 'There was a fall in rice ______ last year.', base: 'produce', accepted: ['production'], pos: 'noun', wrongPos: { produce: 'verb', productive: 'adjective' }, family: 'produce', explanation: l('a fall in rice ___ → noun: production.', 'a fall in rice ___ → noun: production।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pie-2-c1', C, { prompt: l('The passage says "a significant decline". Your gap is "a significant ______ in exports". What do you write?', 'Passage-এ আছে "a significant decline"। তোমার gap "a significant ______ in exports"। কী লিখবে?'), options: ['decline', 'declined', 'declining'], answer: 'decline', explanation: l('Noun position, and copy the exact word from the passage.', 'Noun-এর জায়গা, আর passage-এর word হুবহু লেখো।') }),
        choice('pie-2-c2', C, { prompt: l('Why read the gap sentence before the passage?', 'Passage-এর আগে gap-এর sentence কেন পড়বে?'), options: ['To know what kind of word to look for', 'To guess the answer without reading', 'To count the words in the passage'], answer: 'To know what kind of word to look for', explanation: l('You search faster and reject wrong forms.', 'দ্রুত খুঁজতে পারো আর ভুল form বাদ দিতে পারো।') }),
        spot('pie-2-c3', C, { sentence: 'Summary: the museum saw a sharp increased in visitors.', wrong: 'increased', accepted: ['increase', 'rise'], pos: 'noun', wrongPos: { increased: 'verb' }, family: 'increase', explanation: l('a sharp ___ in → noun.', 'a sharp ___ in → noun।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pie-2-w1', C, {
          prompt: l('Write one gap sentence of your own for a partner, like "The city saw a ______ in traffic." Then write the answer and its job.', 'একজন সঙ্গীর জন্য নিজের একটা gap sentence লেখো, যেমন "The city saw a ______ in traffic."। তারপর উত্তর আর তার কাজ লেখো।'),
          model: 'Many people complained about the ______ of the new bridge. Answer: cost (noun).',
          task: 'The student writes a gap-fill sentence (with ______) and gives an answer and its part of speech. Check that the given answer fits the gap grammatically, that the stated part of speech is correct, and that the sentence is grammatical.',
          target: l('A gap sentence + answer + its job', 'Gap sentence + উত্তর + তার কাজ'),
          checklist: [l('The answer fits the gap', 'উত্তর gap-এ বসে'), l('The job is right', 'কাজটা ঠিক')],
          explanation: l('Making gaps yourself trains you to see them in the test.', 'নিজে gap বানালে পরীক্ষায় gap দেখতে অভ্যাস হয়।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Five seconds on the gap first: its neighbours tell you the job and the form.', 'আগে gap-এ পাঁচ সেকেন্ড: আশেপাশের word কাজ আর form বলে দেয়।'),
        l('Copy the passage word exactly; don’t change its form.', 'Passage-এর word হুবহু লেখো; form বদলাবে না।'),
      ],
    },
  ],
};

const li: Lesson = {
  id: 'pie-3', unit: 'ielts', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'listening',
  title: l('Listening: predict the answer', 'Listening: উত্তর আন্দাজ করা'),
  why: l('You get time to read the questions before each Listening section. Predicting the answer type there tells you what to listen for.', 'Listening-এর প্রতিটা section-এর আগে প্রশ্ন পড়ার সময় পাও। তখন উত্তরের ধরন আন্দাজ করলে বুঝবে কী শুনতে হবে।'),
  steps: [
    {
      kind: 'hook',
      title: l('Reading time', 'প্রশ্ন পড়ার সময়'),
      situation: l('Form completion, before the recording: "The course will begin on ______."', 'Form completion, recording-এর আগে: "The course will begin on ______."'),
      question: l('What will you listen for?', 'কী শোনার জন্য অপেক্ষা করবে?'),
      options: ['A day or a date', 'A place', 'An adjective'],
      answer: 'A day or a date',
      diagnose: {
        'A day or a date': l('Yes. "begin on ___" → on + day/date (on Monday, on 3 May).', 'হ্যাঁ। "begin on ___" → on + দিন/তারিখ (on Monday, on 3 May)।'),
        'A place': l('For a place you would expect "in" or "at" (in the main hall). "on" + a course start → day or date.', 'জায়গার জন্য "in" বা "at" আশা করতাম (in the main hall)। course শুরু + "on" → দিন বা তারিখ।'),
        'An adjective': l('"on ___" needs a noun (a day or date), not a describing word.', '"on ___"-এ noun (দিন বা তারিখ) লাগে, describing word না।'),
      },
    },
    identify({
      sentence: 'Students/noun must/verb bring/verb a black/adjective pen/noun to/preposition the exam./noun',
      choices: JOBS5,
      pattern: l('In a form, each gap sits in a line like this. The jobs around it (a ___ pen, bring ___) show what is missing.', 'Form-এ প্রতিটা gap এমন line-এ থাকে। আশেপাশের কাজ (a ___ pen, bring ___) দেখায় কী বাদ গেছে।'),
    }),
    {
      kind: 'concept',
      title: l('Predict the type, then listen', 'আগে ধরন আন্দাজ, তারপর শোনা'),
      body: l('For each gap, write a tiny note: N (noun), # (number), £ (price), D (date/day), P (place), Adj (adjective), V (verb), Name (spelled out). Use grammar (a/an, many, on/in/at, to + verb) and meaning (Cost: £___ → number). Then listen for that type. Speakers often correct themselves ("Tuesday… no, sorry, Wednesday"), so keep listening after the first answer.', 'প্রতিটা gap-এ ছোট একটা note লেখো: N (noun), # (সংখ্যা), £ (দাম), D (তারিখ/দিন), P (জায়গা), Adj (adjective), V (verb), Name (বানান করে বলা)। Grammar (a/an, many, on/in/at, to + verb) আর অর্থ (Cost: £___ → সংখ্যা) ব্যবহার করো। তারপর সেই ধরনের word শোনো। বক্তা প্রায়ই নিজেকে শুধরে নেয় ("Tuesday… no, sorry, Wednesday"), তাই প্রথম উত্তরের পরেও শুনতে থাকো।'),
      points: [
        l('a/an ___ + noun → adjective (a quiet room); a/an ___ alone → singular noun.', 'a/an ___ + noun → adjective (a quiet room); a/an ___ একা → singular noun।'),
        l('Plural signals: many, several, two, "are".', 'Plural-এর সংকেত: many, several, two, "are"।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Predict these', 'এগুলো আন্দাজ করো'),
      items: [
        { en: 'Parking is available at the ______.', note: l('at the ___ → place noun (station, back entrance).', 'at the ___ → জায়গার noun (station, back entrance)।') },
        { en: 'Please bring a ______ jacket.', note: l('a ___ jacket → adjective (warm, waterproof).', 'a ___ jacket → adjective (warm, waterproof)।') },
        { en: 'Members must ______ their cards at reception.', note: l('must ___ their cards → verb (show, collect).', 'must ___ their cards → verb (show, collect)।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Listening question types', 'Listening প্রশ্নের ধরন'),
      uses: [
        { skill: 'listening', example: 'Note completion: "Tour starts from the ______ (ONE WORD)"', note: l('the ___ → a place noun; ONE WORD limits it (harbour, not "the old harbour").', 'the ___ → জায়গার noun; ONE WORD সীমা দেয় (harbour, "the old harbour" না)।') },
        { skill: 'listening', example: 'Sentence completion: "Visitors are advised to wear ______ shoes."', note: l('___ shoes → adjective (comfortable, flat).', '___ shoes → adjective (comfortable, flat)।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Listening mistakes', 'Listening-এর common ভুল'),
      items: [
        { wrong: 'Writing the first day you hear', right: 'Wait: speakers often change or correct it', why: l('IELTS includes distractors on purpose.', 'IELTS ইচ্ছা করে বিভ্রান্তিকর তথ্য রাখে।') },
        { wrong: 'several ______ → "book"', right: 'several books', why: l('several + plural: a missing -s is marked wrong.', 'several + plural: -s বাদ পড়লে ভুল ধরা হয়।') },
        { wrong: 'a ______ room (hears "quietly")', right: 'a quiet room', why: l('A ___ room needs an adjective; check the form you write.', 'a ___ room-এ adjective লাগে; লেখা form পরীক্ষা করো।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pie-3-p1', C, { prompt: l('Predict the answer type.', 'উত্তরের ধরন আন্দাজ করো।'), sentence: 'Cost per night: £______', options: ['a number', 'a place', 'a verb'], answer: 'a number', explanation: l('£ + ___ → a price, a number.', '£ + ___ → দাম, সংখ্যা।') }),
        choice('pie-3-p2', C, { prompt: l('Predict the answer type.', 'উত্তরের ধরন আন্দাজ করো।'), sentence: 'The library closes early on ______.', options: ['a day', 'an adjective', 'a verb'], answer: 'a day', explanation: l('on + ___ at the end → a day (Fridays).', 'শেষে on + ___ → দিন (Fridays)।') }),
        choice('pie-3-p3', C, { prompt: l('Which job does the gap need?', 'Gap-এ কোন কাজের word লাগবে?'), sentence: 'The guide recommends a ______ hat in summer.', options: ['adjective', 'noun', 'verb'], answer: 'adjective', pos: 'adjective', wrongPos: { noun: 'noun', verb: 'verb' }, explanation: l('a ___ hat → adjective (wide, light).', 'a ___ hat → adjective (wide, light)।') }),
        choice('pie-3-p4', C, { prompt: l('You hear: "The talk is on Tuesday… oh no, it has moved to Thursday." Talk day: ______', 'তুমি শুনলে: "The talk is on Tuesday… oh no, it has moved to Thursday." Talk day: ______'), options: ['Thursday', 'Tuesday'], answer: 'Thursday', explanation: l('The speaker corrected the first day.', 'বক্তা প্রথম দিনটা শুধরে নিয়েছে।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pie-3-r1', C, { prompt: l('Write the job the gap needs.', 'Gap-এ কোন কাজের word লাগবে লেখো।'), sentence: 'Please ______ your name on the list. → ___', accepted: ['verb'], pos: 'verb', wrongPos: { noun: 'noun', adjective: 'adjective', adverb: 'adverb' }, explanation: l('Please + ___ + your name → verb (write, sign).', 'Please + ___ + your name → verb (write, sign)।') }),
        gap('pie-3-r2', C, { prompt: l('You hear: "You’ll need two photographs." Complete: "Bring two ______."', 'তুমি শুনলে: "You’ll need two photographs." লেখো: "Bring two ______."'), sentence: 'Bring two ______.', accepted: ['photographs', 'photos'], pattern: 'noun-count', explanation: l('two + plural noun: photographs.', 'two + plural noun: photographs।') }),
        gap('pie-3-r3', C, { prompt: l('You hear: "The room is very noisy, so we need somewhere quieter." Complete: "They want a ______ room."', 'তুমি শুনলে: "The room is very noisy, so we need somewhere quieter." লেখো: "They want a ______ room."'), sentence: 'They want a ______ room.', accepted: ['quieter', 'quiet'], pos: 'adjective', wrongPos: { quietly: 'adverb', quietness: 'noun' }, explanation: l('a ___ room → adjective.', 'a ___ room → adjective।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pie-3-c1', C, { prompt: l('"Meet at the ______ entrance." What will you listen for?', '"Meet at the ______ entrance." কী শোনার জন্য অপেক্ষা করবে?'), options: ['a describing word (north, main)', 'a time', 'a verb'], answer: 'a describing word (north, main)', explanation: l('the ___ entrance → a word describing the entrance.', 'the ___ entrance → entrance-কে describe করা word।') }),
        choice('pie-3-c2', C, { prompt: l('Why write "N" or "#" next to the gaps?', 'Gap-এর পাশে "N" বা "#" কেন লিখবে?'), options: ['So you know what type of answer to catch', 'Because the examiner reads it', 'To save the answers'], answer: 'So you know what type of answer to catch', explanation: l('Prediction focuses your listening.', 'আন্দাজ শোনাকে কেন্দ্রীভূত করে।') }),
        gap('pie-3-c3', C, { prompt: l('You hear: "The meeting point is the car park behind the library." Complete: "Meet at the ______ (TWO WORDS)."', 'তুমি শুনলে: "The meeting point is the car park behind the library." লেখো: "Meet at the ______ (TWO WORDS)।"'), sentence: 'Meet at the ______.', accepted: ['car park'], explanation: l('at the ___ → a place noun; two words: car park.', 'at the ___ → জায়গার noun; দুই word: car park।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pie-3-w1', C, {
          prompt: l('Write a short form line with a gap (like "Membership fee: £______ per month") and say what type of answer it needs and why.', 'Gap সহ একটা ছোট form line লেখো (যেমন "Membership fee: £______ per month") আর বলো কোন ধরনের উত্তর লাগবে ও কেন।'),
          model: 'Collect your key from the ______ (a place noun, because "from the" comes before it).',
          task: 'The student writes one IELTS-Listening-style form line with a gap, then states the expected answer type and why. Check that the stated type really fits the grammar around the gap and that the English is correct.',
          target: l('A gap + the answer type + the clue', 'Gap + উত্তরের ধরন + সূত্র'),
          checklist: [l('The type fits the gap', 'ধরন gap-এর সাথে মেলে'), l('The clue is in the words around it', 'সূত্রটা আশেপাশের word-এ')],
          explanation: l('Clue words: a/an, the, on/in/at, many, to.', 'সূত্রের word: a/an, the, on/in/at, many, to।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Before the recording, mark each gap: N, #, D, P, Adj, V.', 'Recording-এর আগে প্রতিটা gap চিহ্নিত করো: N, #, D, P, Adj, V।'),
        l('Check the form you write: plural -s, adjective not adverb.', 'লেখা form পরীক্ষা করো: plural -s, adverb না adjective।'),
      ],
    },
  ],
};

const w1: Lesson = {
  id: 'pie-4', unit: 'ielts', format: 'v2', concept: C, minutes: 7, difficulty: 'medium', skill: 'writing',
  title: l('Writing: the word that breaks the sentence', 'Writing: যে word sentence ভাঙে'),
  why: l('One wrong job (noun for verb, -ly for adjective) makes a good idea hard to read, and Grammatical Range and Accuracy is a quarter of your Writing score.', 'একটা ভুল কাজ (verb-এর জায়গায় noun, adjective-এর জায়গায় -ly) ভালো idea-কেও পড়তে কঠিন করে, আর Grammatical Range and Accuracy Writing score-এর এক-চতুর্থাংশ।'),
  steps: [
    {
      kind: 'hook',
      title: l('Three student sentences', 'তিনটা student sentence'),
      situation: l('A student wrote: "The government should improvement public transport."', 'একজন student লিখেছে: "The government should improvement public transport."'),
      question: l('What is wrong?', 'ভুলটা কী?'),
      options: ['"should" needs a verb, but "improvement" is a noun', 'The sentence is correct', '"public" should be "publicly"'],
      answer: '"should" needs a verb, but "improvement" is a noun',
      diagnose: {
        '"should" needs a verb, but "improvement" is a noun': l('Right. should + base verb: "should improve".', 'ঠিক। should + base verb: "should improve"।'),
        'The sentence is correct': l('The idea is fine, but after "should" there must be an action (a verb). "improvement" is a thing.', 'Idea ঠিক, কিন্তু "should"-এর পরে একটা কাজ (verb) লাগবে। "improvement" হলো জিনিস।'),
        '"public" should be "publicly"': l('"public" describes "transport" (a noun), so the adjective is right. The problem is "improvement".', '"public" "transport" (noun)-কে describe করছে, তাই adjective ঠিক। সমস্যা "improvement"-এ।'),
      },
    },
    identify({
      sentence: 'This/pronoun has/verb a significant/adjective effect/noun on/preposition young/adjective people./noun',
      choices: ['noun', 'pronoun', 'verb', 'adjective', 'preposition'],
      pattern: l('"a significant effect": article + adjective + noun. A second describing word before "effect" (effectly ✗) has no job to do.', '"a significant effect": article + adjective + noun। "effect"-এর আগে আরেকটা describing word (effectly ✗)-এর কোনো কাজ নেই।'),
    }),
    {
      kind: 'concept',
      title: l('Check the job, not only the word', 'শুধু word না, কাজটাও দেখো'),
      body: l('Most IELTS word-form errors come from three questions you can check: 1) after should/can/to → verb? (should improve, not should improvement). 2) describing a noun → adjective; describing a verb → adverb (a significant effect; increased significantly). 3) after a/the/of → noun (the development of). Also watch -ing: "People are increasingly using technology" (adverb + verb), not "People are increasing use of technology".', 'IELTS-এর বেশিরভাগ word-form ভুল তিনটা প্রশ্নে ধরা যায়: ১) should/can/to-এর পরে → verb? (should improve, should improvement না)। ২) noun-কে describe করলে → adjective; verb-কে describe করলে → adverb (a significant effect; increased significantly)। ৩) a/the/of-এর পরে → noun (the development of)। -ing-ও খেয়াল করো: "People are increasingly using technology" (adverb + verb), "People are increasing use of technology" না।'),
      points: [
        l('"This has a significant effectly impact" ✗ → "a significant effect" or "a significant impact" ✓ (one noun, one adjective).', '"This has a significant effectly impact" ✗ → "a significant effect" বা "a significant impact" ✓ (একটা noun, একটা adjective)।'),
        l('Re-read each sentence once only for jobs: verb after should? adjective before the noun?', 'প্রতিটা sentence একবার শুধু কাজের জন্য পড়ো: should-এর পরে verb? noun-এর আগে adjective?'),
      ],
    },
    {
      kind: 'examples',
      title: l('Before → after', 'আগে → পরে'),
      items: [
        { en: 'The government should improve public transport.', note: l('should + verb.', 'should + verb।') },
        { en: 'This has a significant effect on young people.', note: l('a + adjective + noun.', 'a + adjective + noun।') },
        { en: 'People are increasingly using technology at work.', note: l('increasingly (adverb) describes "are using".', 'increasingly (adverb) "are using"-কে describe করছে।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where it matters', 'কোথায় দরকার'),
      uses: [
        { skill: 'writing', example: 'Task 2: "Governments should invest more in education."', note: l('Recommendations always use should/must + verb: a very common place for noun/verb mix-ups.', 'Recommendation-এ সবসময় should/must + verb: noun/verb গুলিয়ে ফেলার খুব common জায়গা।') },
        { skill: 'writing', example: 'Task 1: "Sales rose significantly, a significant rise."', note: l('The same idea as verb + adverb or adjective + noun: use both for range, each in the right form.', 'একই idea verb + adverb বা adjective + noun হিসেবে: range-এর জন্য দুটোই ব্যবহার করো, প্রতিটা ঠিক form-এ।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Writing mistakes', 'Writing-এর common ভুল'),
      items: [
        { wrong: 'This has a significant effectly impact.', right: 'This has a significant effect.', why: l('"effectly" is not a word, and you need only one noun after the adjective.', '"effectly" কোনো word না, আর adjective-এর পরে একটাই noun লাগে।') },
        { wrong: 'The government should improvement public transport.', right: 'The government should improve public transport.', why: l('should + base verb.', 'should + base verb।') },
        { wrong: 'People are increasing use of technology.', right: 'People are increasingly using technology.', why: l('The idea is "more and more" (adverb: increasingly) + the action (are using).', 'Idea-টা হলো "দিন দিন বেশি" (adverb: increasingly) + কাজ (are using)।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pie-4-p1', C, { prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'Schools must ______ students for the modern workplace.', options: ['prepare', 'preparation', 'prepared'], answer: 'prepare', pos: 'verb', wrongPos: { preparation: 'noun' }, family: 'prepare', why: { preparation: l('must + base verb, not a noun.', 'must + base verb, noun না।'), prepared: l('must + base form: must prepare.', 'must + base form: must prepare।') }, explanation: l('must + base verb.', 'must + base verb।') }),
        choice('pie-4-p2', C, { prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'Fast food has a ______ impact on children’s health.', options: ['negative', 'negatively', 'negativity'], answer: 'negative', pos: 'adjective', wrongPos: { negatively: 'adverb', negativity: 'noun' }, explanation: l('a ___ impact → adjective.', 'a ___ impact → adjective।') }),
        choice('pie-4-p3', C, { prompt: l('Choose the correct sentence.', 'সঠিক sentence বাছো।'), options: ['More people are increasingly working from home.', 'More people are increasing working from home.', 'More people are increase work from home.'], answer: 'More people are increasingly working from home.', explanation: l('adverb (increasingly) + are working.', 'adverb (increasingly) + are working।') }),
        choice('pie-4-p4', C, { prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'The ______ of new roads has reduced traffic.', options: ['construction', 'construct', 'constructive'], answer: 'construction', pos: 'noun', wrongPos: { construct: 'verb', constructive: 'adjective' }, family: 'construct', explanation: l('The ___ of → noun.', 'The ___ of → noun।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        spot('pie-4-r1', C, { sentence: 'Parents should encouragement their children to read.', wrong: 'encouragement', accepted: ['encourage'], pos: 'verb', wrongPos: { encouragement: 'noun' }, family: 'encourage', explanation: l('should + base verb: should encourage.', 'should + base verb: should encourage।') }),
        spot('pie-4-r2', C, { sentence: 'Technology has changed education dramatic.', wrong: 'dramatic', accepted: ['dramatically'], pos: 'adverb', wrongPos: { dramatic: 'adjective' }, explanation: l('It describes how education changed → adverb.', 'Education কীভাবে বদলালো তা বলছে → adverb।') }),
        correct('pie-4-r3', C, { prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে লেখো।'), sentence: 'This policy had a significantly effect on crime.', accepted: ['This policy had a significant effect on crime.'], pos: 'adjective', wrongPos: {}, explanation: l('a + adjective + noun: a significant effect.', 'a + adjective + noun: a significant effect।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pie-4-c1', C, { prompt: l('Why is "The government should improvement public transport" wrong?', '"The government should improvement public transport" কেন ভুল?'), options: ['"should" must be followed by a verb', '"government" must be plural', '"transport" must be a verb'], answer: '"should" must be followed by a verb', explanation: l('should + base verb.', 'should + base verb।') }),
        spot('pie-4-c2', C, { sentence: 'Many cities have seen a sharply rise in rents.', wrong: 'sharply', accepted: ['sharp'], fixOptions: ['sharp', 'sharpen', 'sharpness'], pos: 'adjective', wrongPos: { sharpen: 'verb', sharpness: 'noun' }, explanation: l('a ___ rise → adjective.', 'a ___ rise → adjective।') }),
        gap('pie-4-c3', C, { prompt: l('Write the correct form of "effect".', '"effect"-এর সঠিক form লেখো।'), sentence: 'Exercise is an ______ way to reduce stress.', base: 'effect', accepted: ['effective'], pos: 'adjective', wrongPos: { effect: 'noun', effectively: 'adverb' }, family: 'effect', explanation: l('an ___ way → adjective.', 'an ___ way → adjective।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pie-4-w1', C, {
          prompt: l('Task 2 style: write two sentences about traffic in your city. Use "should + verb" once and "a/an + adjective + noun" once.', 'Task 2 ধাঁচে: তোমার শহরের traffic নিয়ে দুটো sentence লেখো। একবার "should + verb" আর একবার "a/an + adjective + noun" ব্যবহার করো।'),
          model: 'Traffic in Dhaka has a serious effect on daily life. The government should build more metro lines.',
          task: 'The student writes two sentences about traffic: one with should + base verb, one with a/an + adjective + noun. Check every word form: is there a verb after should, an adjective before the noun, no -ly word before a noun, no noun where a verb is needed? Quote any wrong word and explain its job.',
          target: l('should + verb · a/an + adjective + noun', 'should + verb · a/an + adjective + noun'),
          checklist: [l('A verb after "should"', '"should"-এর পরে verb'), l('An adjective before the noun', 'Noun-এর আগে adjective')],
          explanation: l('should build · a serious effect.', 'should build · a serious effect।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('should/can/must/to + verb; a/the/of + noun; noun ← adjective; verb ← adverb.', 'should/can/must/to + verb; a/the/of + noun; noun ← adjective; verb ← adverb।'),
        l('Re-read once only for jobs before you submit.', 'জমা দেওয়ার আগে একবার শুধু কাজের জন্য পড়ো।'),
      ],
    },
  ],
};

const w2: Lesson = {
  id: 'pie-5', unit: 'ielts', format: 'v2', concept: C, minutes: 7, difficulty: 'medium', skill: 'writing',
  title: l('Building an academic sentence', 'Academic sentence বানানো'),
  why: l('Band 6+ sentences pack ideas into noun phrases (immediate action, a sharp rise in prices). Knowing each word’s job lets you build them without errors.', 'Band 6+ sentence idea-গুলো noun phrase-এ গুছিয়ে রাখে (immediate action, a sharp rise in prices)। প্রতিটা word-এর কাজ জানলে ভুল ছাড়া এগুলো বানানো যায়।'),
  steps: [
    {
      kind: 'hook',
      title: l('Two versions', 'দুটো version'),
      situation: l('A: "The government must do something now to make pollution less." B: "The government should take immediate action to reduce pollution."', 'A: "The government must do something now to make pollution less." B: "The government should take immediate action to reduce pollution."'),
      question: l('Why does B sound more academic?', 'B কেন বেশি academic শোনায়?'),
      options: ['It uses precise nouns, adjectives and verbs (immediate action, reduce)', 'It is longer', 'It uses more difficult grammar tenses'],
      answer: 'It uses precise nouns, adjectives and verbs (immediate action, reduce)',
      diagnose: {
        'It uses precise nouns, adjectives and verbs (immediate action, reduce)': l('Yes. "do something now" → "take immediate action"; "make less" → "reduce". Same idea, precise words in the right jobs.', 'হ্যাঁ। "do something now" → "take immediate action"; "make less" → "reduce"। একই idea, সঠিক কাজে নির্দিষ্ট word।'),
        'It is longer': l('Both are about the same length. The difference is the precise word in each job.', 'দুটোর দৈর্ঘ্য প্রায় একই। পার্থক্য হলো প্রতিটা কাজে নির্দিষ্ট word।'),
        'It uses more difficult grammar tenses': l('Both use simple structures. B chooses better nouns, adjectives and verbs.', 'দুটোতেই সহজ গঠন। B ভালো noun, adjective আর verb বেছেছে।'),
      },
    },
    identify({
      sentence: 'The government/noun should/verb take/verb immediate/adjective action/noun to reduce/verb pollution./noun',
      choices: JOBS,
      pattern: l('government (noun, who) · should (helping/modal verb) · take (main verb) · immediate (adjective) · action (noun) · to reduce (verb, purpose) · pollution (noun).', 'government (noun, কে) · should (helping/modal verb) · take (main verb) · immediate (adjective) · action (noun) · to reduce (verb, উদ্দেশ্য) · pollution (noun)।'),
    }),
    {
      kind: 'concept',
      title: l('Subject + verb + noun phrase (+ purpose)', 'Subject + verb + noun phrase (+ উদ্দেশ্য)'),
      body: l('A strong academic sentence often follows this frame: WHO (a noun phrase) + WHAT THEY DO (a verb, often after should/must/can) + WHAT (a noun phrase: adjective + noun) + WHY (to + verb). Build the noun phrase with an adjective before the noun (immediate action, public transport, a sharp rise). Every piece has one job; if a word has no job in the frame, it is probably wrong.', 'শক্তিশালী academic sentence প্রায়ই এই কাঠামো মানে: কে (noun phrase) + কী করে (verb, প্রায়ই should/must/can-এর পরে) + কী (noun phrase: adjective + noun) + কেন (to + verb)। Noun phrase বানাও noun-এর আগে adjective দিয়ে (immediate action, public transport, a sharp rise)। প্রতিটা অংশের একটা কাজ; কোনো word-এর কাঠামোতে কাজ না থাকলে সেটা সম্ভবত ভুল।'),
      points: [
        l('Helping/modal verbs (should, can, will) are followed by a main verb (take, reduce).', 'Helping/modal verb (should, can, will)-এর পরে main verb (take, reduce) বসে।'),
        l('to + verb explains the purpose: to reduce, to protect, to improve.', 'to + verb উদ্দেশ্য বোঝায়: to reduce, to protect, to improve।'),
      ],
    },
    {
      kind: 'examples',
      title: l('The frame in use', 'কাঠামোটা ব্যবহারে'),
      items: [
        { en: 'Local councils should provide affordable housing to support young families.', note: l('WHO · should + verb · adjective + noun · to + verb', 'কে · should + verb · adjective + noun · to + verb') },
        { en: 'Employers can offer flexible hours to improve productivity.', note: l('can + verb · adjective + noun · to + verb', 'can + verb · adjective + noun · to + verb') },
        { en: 'Strict regulations are needed to protect endangered species.', note: l('adjective + noun · are needed · to + verb', 'adjective + noun · are needed · to + verb') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where it matters', 'কোথায় দরকার'),
      uses: [
        { skill: 'writing', example: 'Task 2 solution paragraph: "Governments should introduce strict limits to cut emissions."', note: l('One frame, one clear solution per sentence.', 'এক কাঠামো, প্রতি sentence-এ একটা পরিষ্কার সমাধান।') },
        { skill: 'speaking', example: 'Part 3: "I think schools should teach practical skills to prepare students for work."', note: l('The same frame sounds clear and mature in Speaking.', 'একই কাঠামো Speaking-এও পরিষ্কার আর পরিণত শোনায়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'The government should takes immediate action.', right: 'The government should take immediate action.', why: l('After should, the base verb: no -s.', 'should-এর পরে base verb: -s না।'), },
        { wrong: 'to reduction pollution', right: 'to reduce pollution', why: l('to + verb for purpose, not a noun.', 'উদ্দেশ্য বোঝাতে to + verb, noun না।') },
        { wrong: 'an immediately action', right: 'an immediate action / immediate action', why: l('Before a noun → adjective.', 'Noun-এর আগে → adjective।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        order('pie-5-p1', C, { prompt: l('Build the sentence.', 'Sentence-টা বানাও।'), answer: 'Governments should invest more money in public transport.', explanation: l('WHO + should + verb + WHAT + where.', 'কে + should + verb + কী + কোথায়।') }),
        choice('pie-5-p2', C, { prompt: l('Choose the word for the purpose part.', 'উদ্দেশ্যের অংশের জন্য word বাছো।'), sentence: 'Cities need more parks to ______ air quality.', options: ['improve', 'improvement', 'improving'], answer: 'improve', pos: 'verb', wrongPos: { improvement: 'noun' }, family: 'improve', explanation: l('to + base verb.', 'to + base verb।') }),
        choice('pie-5-p3', C, { prompt: l('Choose the best noun phrase.', 'সবচেয়ে ভালো noun phrase বাছো।'), sentence: 'Companies should offer ______ to their staff.', options: ['regular training', 'regularly training', 'regular train'], answer: 'regular training', explanation: l('adjective + noun.', 'adjective + noun।') }),
        tagWords('pie-5-p4', C, { sentence: 'Strict/adjective laws/noun can/verb protect/verb endangered/adjective species./noun', choices: JOBS, explanation: l('Strict laws (WHO) · can protect (verb) · endangered species (WHAT).', 'Strict laws (কে) · can protect (verb) · endangered species (কী)।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pie-5-r1', C, { prompt: l('Write the adjective form of "immediately".', '"immediately"-এর adjective form লেখো।'), sentence: 'The government should take ______ action.', base: 'immediately', accepted: ['immediate'], pos: 'adjective', wrongPos: { immediately: 'adverb' }, explanation: l('___ action → adjective.', '___ action → adjective।') }),
        gap('pie-5-r2', C, { prompt: l('Write the verb form of "reduction".', '"reduction"-এর verb form লেখো।'), sentence: 'We must act now to ______ waste.', base: 'reduction', accepted: ['reduce'], pos: 'verb', wrongPos: { reduction: 'noun' }, family: 'reduce', explanation: l('to + base verb.', 'to + base verb।') }),
        correct('pie-5-r3', C, { prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে লেখো।'), sentence: 'The government should provides free healthcare to protect poor families.', accepted: ['The government should provide free healthcare to protect poor families.'], pattern: 'verb-form', explanation: l('should + base verb: provide.', 'should + base verb: provide।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        order('pie-5-c1', C, { prompt: l('Build the sentence.', 'Sentence-টা বানাও।'), answer: 'Schools should teach basic cooking skills to improve health.', explanation: l('WHO + should + verb + adjective + noun + to + verb.', 'কে + should + verb + adjective + noun + to + verb।') }),
        choice('pie-5-c2', C, { prompt: l('In "The government should take immediate action", what job does "should" do?', '"The government should take immediate action"-এ "should" কী কাজ করে?'), options: ['a helping (modal) verb', 'the main verb', 'an adverb'], answer: 'a helping (modal) verb', explanation: l('should helps the main verb "take".', 'should main verb "take"-কে সাহায্য করে।') }),
        spot('pie-5-c3', C, { sentence: 'Local councils should build safety cycle lanes.', wrong: 'safety', accepted: ['safe'], pos: 'adjective', wrongPos: { safety: 'noun' }, family: 'safe', explanation: l('___ cycle lanes → adjective: safe.', '___ cycle lanes → adjective: safe।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pie-5-w1', C, {
          prompt: l('Write one solution sentence for a problem in your area, using the frame: WHO + should + verb + adjective + noun + to + verb.', 'তোমার এলাকার একটা সমস্যার সমাধান নিয়ে একটা sentence লেখো, এই কাঠামোতে: কে + should + verb + adjective + noun + to + verb।'),
          model: 'The city council should build safe cycle lanes to reduce traffic jams.',
          task: 'The student writes one solution sentence following WHO + should + base verb + (adjective + noun) + to + verb. Check each part: a base verb after should, an adjective (not an adverb) before the noun, to + base verb for purpose, subject-verb logic. Quote any word in the wrong form and name the job it needs.',
          target: l('WHO + should + verb + adjective + noun + to + verb', 'কে + should + verb + adjective + noun + to + verb'),
          checklist: [l('Base verb after should', 'should-এর পরে base verb'), l('Adjective + noun', 'Adjective + noun'), l('to + verb for purpose', 'উদ্দেশ্যের জন্য to + verb')],
          explanation: l('One sentence, one clear solution.', 'এক sentence, একটা পরিষ্কার সমাধান।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('WHO + should + verb + adjective + noun + to + verb.', 'কে + should + verb + adjective + noun + to + verb।'),
        l('Every word needs a job in the frame.', 'কাঠামোতে প্রতিটা word-এর একটা কাজ থাকা চাই।'),
      ],
    },
  ],
};

export const posIeltsLessonsA: Lesson[] = [r1, r2, li, w1, w2];

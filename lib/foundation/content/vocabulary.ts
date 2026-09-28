import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Vocabulary Foundation (Foundation module 11), the six skill lessons in the v2
 * (problem-first) format, easy → hard. The words themselves are learned in the
 * daily word missions (lib/vocab-foundation, saved to the Brain); these lessons
 * teach HOW to learn and use words, with the mission words as examples:
 * vc-1 what it means to know a word (meaning, form, pattern: afford to, access to)
 * vc-2 guessing meaning from context and word parts (un-, re-, -less, -able)
 * vc-3 synonyms and paraphrasing (which synonym fits, changing the form)
 * vc-4 formal and informal words (kids → children, get → obtain)
 * vc-5 precise words instead of general ones (good, bad, thing, very)
 * vc-6 using new words accurately (form, meaning, tone: consequence, affect / effect)
 * Collocations are taught in Common Errors (ce-4); this module links to it.
 * Original Mino content.
 */

export const VOCABULARY_CONCEPTS: Concept[] = [
  { id: 'voc-learn', title: l('Knowing a word: meaning, form and pattern', 'একটা word জানা: অর্থ, form আর pattern'), lessonId: 'vc-1', tag: 'vocabulary' },
  { id: 'voc-context', title: l('Guessing meaning from context', 'Context থেকে অর্থ আন্দাজ'), lessonId: 'vc-2', tag: 'vocabulary' },
  { id: 'voc-paraphrase', title: l('Synonyms and paraphrasing', 'Synonym আর paraphrasing'), lessonId: 'vc-3', tag: 'vocabulary' },
  { id: 'voc-register', title: l('Formal and informal words', 'Formal আর informal word'), lessonId: 'vc-4', tag: 'vocabulary' },
  { id: 'voc-precise', title: l('Precise words instead of general ones', 'সাধারণ word-এর বদলে নির্দিষ্ট word'), lessonId: 'vc-5', tag: 'vocabulary' },
  { id: 'voc-use', title: l('Using new words accurately', 'নতুন word নির্ভুলভাবে ব্যবহার'), lessonId: 'vc-6', tag: 'vocabulary' },
];

const P = { tag: 'vocabulary' as const };

// ======================================================================= vc-1
export const vcKnowWord: Lesson = {
  id: 'vc-1',
  format: 'v2',
  concept: 'voc-learn',
  title: l('Knowing a word: meaning, form and pattern', 'একটা word জানা: অর্থ, form আর pattern'),
  why: l('Knowing "afford = সামর্থ্য থাকা" is not enough to write "I can’t afford to pay". To use a word in IELTS you need its meaning, its form, and the words that follow it.', '"afford = সামর্থ্য থাকা" জানলেই "I can’t afford to pay" লেখা যায় না। IELTS-এ একটা word ব্যবহার করতে তার অর্থ, form, আর পরে কোন word বসে — সবই জানতে হয়।'),
  minutes: 9,
  difficulty: 'easy',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A word from your list', 'আপনার তালিকার একটা word'),
      situation: l('Your list says: "access = সুযোগ". You write: "Village students do not have access of the internet."', 'আপনার তালিকায় আছে: "access = সুযোগ"। আপনি লিখলেন: "Village students do not have access of the internet."'),
      question: l('What was missing from your list?', 'তালিকায় কী বাদ ছিল?'),
      options: ['The word after access: access to', 'The Bangla meaning', 'Nothing — the sentence is correct'],
      answer: 'The word after access: access to',
      diagnose: {
        'The word after access: access to': l('Right. The meaning was fine, but the pattern was missing: have access TO something. A word list needs meaning + pattern + an example.', 'ঠিক। অর্থ ঠিক ছিল, কিন্তু pattern বাদ ছিল: have access TO something। Word-এর তালিকায় অর্থ + pattern + একটা উদাহরণ লাগে।'),
        'The Bangla meaning': l('The meaning was there (সুযোগ). What was missing is the pattern: access to.', 'অর্থ ছিল (সুযোগ)। বাদ ছিল pattern: access to।'),
        'Nothing — the sentence is correct': l('"access of" is wrong: the pattern is access to the internet.', '"access of" ভুল: pattern হলো access to the internet।'),
      },
    },
    {
      kind: 'discover',
      title: l('Five things to know about a word', 'একটা word সম্পর্কে পাঁচটা জিনিস'),
      items: [
        { en: 'afford — verb — /əˈfɔːd/ — afford to + verb — Many families cannot afford to pay rent.', note: l('meaning · form · sound · pattern · example', 'অর্থ · form · উচ্চারণ · pattern · উদাহরণ') },
        { en: 'contribute — verb — conTRIbute — contribute to + noun — Cars contribute to air pollution.', note: l('stress on the second syllable', 'দ্বিতীয় syllable-এ জোর') },
        { en: 'benefit — noun and verb — benefit from — Students benefit from small classes.', note: l('one word, two forms', 'একটা word, দুটো form') },
        { en: 'consequence — noun — the consequences of — often negative', note: l('meaning includes a tone', 'অর্থের মধ্যে একটা সুরও থাকে') },
      ],
      question: l('Which record helps you USE the word in a sentence?', 'কোন রেকর্ড দেখে word-টা sentence-এ ব্যবহার করা যায়?'),
      options: [
        l('Meaning + form + pattern + an example sentence', 'অর্থ + form + pattern + একটা উদাহরণ sentence'),
        l('Only the Bangla meaning', 'শুধু বাংলা অর্থ'),
        l('Only the spelling', 'শুধু বানান'),
      ],
      answer: 0,
      pattern: l('Record every new word with: meaning, part of speech, pronunciation (stress), the words that follow it, and one example — then review it in your Brain.', 'প্রতিটা নতুন word রাখুন: অর্থ, part of speech, উচ্চারণ (জোর), পরে কোন word বসে, আর একটা উদাহরণ — তারপর Brain-এ review করুন।'),
    },
    {
      kind: 'concept',
      title: l('What "knowing a word" means', '"একটা word জানা" মানে কী'),
      body: l(
        'You know a word for IELTS when you can recognise it, understand it in context, and use it correctly in your own sentence.',
        'IELTS-এর জন্য একটা word জানা মানে: চিনতে পারা, context-এ বুঝতে পারা, আর নিজের sentence-এ ঠিকভাবে ব্যবহার করতে পারা।',
      ),
      points: [
        l('Meaning in context: "decline" can mean fall (sales declined) or refuse (she declined the offer).', 'Context-এ অর্থ: "decline" মানে কমে যাওয়া (sales declined) বা প্রত্যাখ্যান (she declined the offer) দুটোই হতে পারে।'),
        l('Form: is it a noun, verb or adjective? benefit (n / v), beneficial (adj); impact (n), affect (v).', 'Form: noun, verb না adjective? benefit (n / v), beneficial (adj); impact (n), affect (v)।'),
        l('Pattern — the words that come after it: afford to do, access to, contribute to, benefit from, the impact of X on Y, the consequences of.', 'Pattern — পরে যে word বসে: afford to do, access to, contribute to, benefit from, the impact of X on Y, the consequences of।'),
        l('Sound: the stressed syllable (conTRIbute, sigNIficant) — needed in Speaking and for recognising words in Listening.', 'উচ্চারণ: কোন syllable-এ জোর (conTRIbute, sigNIficant) — Speaking-এ আর Listening-এ word চিনতে দরকার।'),
        l('Why Bangla speakers slip: word lists often give one Bangla meaning (access = সুযোগ) and nothing else, so the English pattern is guessed from Bangla ("সুযোগ-এর" → access of). Learning words in full sentences avoids this.', 'বাংলাভাষীরা কেন ভুল করে: word-এর তালিকায় প্রায়ই শুধু একটা বাংলা অর্থ থাকে (access = সুযোগ), তাই English pattern বাংলা থেকে আন্দাজ করা হয় ("সুযোগ-এর" → access of)। পুরো sentence-এ word শিখলে এটা এড়ানো যায়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'Many students cannot afford to study abroad.', note: l('afford to + verb', 'afford to + verb') },
        { en: 'Rural areas need better access to healthcare.', note: l('access to + noun', 'access to + noun') },
        { en: 'Tourism contributes to the local economy.', note: l('contribute to', 'contribute to') },
        { en: 'Children benefit from reading every day.', note: l('benefit from', 'benefit from') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Low-income families cannot afford to buy healthy food.', note: l('Task 2: word patterns are part of Lexical Resource and grammar.', 'Task 2: word pattern Lexical Resource আর grammar দুটোরই অংশ।') },
        { skill: 'speaking', example: 'I think everyone benefits from learning a second language.', note: l('Speaking: correct stress and pattern make new words sound natural.', 'Speaking: ঠিক জোর আর pattern নতুন word-কে স্বাভাবিক শোনায়।') },
        { skill: 'reading', example: 'Sales declined sharply after 2015.', note: l('Reading: the meaning depends on context (decline = fall here).', 'Reading: অর্থ context-এর ওপর নির্ভর করে (এখানে decline = কমে যাওয়া)।') },
        { skill: 'listening', example: 'The main contribution came from local businesses.', note: l('Listening: knowing the stressed sound helps you catch the word.', 'Listening: কোথায় জোর জানা থাকলে word-টা ধরতে সুবিধা হয়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I cannot afford buying a car.', right: 'I cannot afford to buy a car.', why: l('afford to + verb.', 'afford to + verb।') },
        { wrong: 'Students need access of books.', right: 'Students need access to books.', why: l('access to.', 'access to।') },
        { wrong: 'Traffic contributes for pollution.', right: 'Traffic contributes to pollution.', why: l('contribute to.', 'contribute to।') },
        { wrong: 'Everyone can benefit of exercise.', right: 'Everyone can benefit from exercise.', why: l('benefit from.', 'benefit from।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('vc-1-p1', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Choose the word that follows.', 'পরের word-টা বেছে নিন।'), sentence: 'Everyone should have access ___ clean water.', options: ['to', 'of', 'for'], answer: 'to', explanation: l('access to.', 'access to।'), why: { of: l('"পানির সুযোগ" → access to water, not of.', '"পানির সুযোগ" → access to water, of না।'), for: l('access is followed by to, not for.', 'access-এর পরে to বসে, for না।') } }),
        choice('vc-1-p2', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Many families cannot afford to rent a flat.', 'Many families cannot afford renting a flat.', 'Many families cannot afford for rent a flat.'], answer: 'Many families cannot afford to rent a flat.', explanation: l('afford to + verb.', 'afford to + verb।'), why: { 'Many families cannot afford renting a flat.': l('afford is followed by to + verb.', 'afford-এর পরে to + verb।'), 'Many families cannot afford for rent a flat.': l('No for: afford to rent.', 'for না: afford to rent।') } }),
        choice('vc-1-p3', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Choose the word that follows.', 'পরের word-টা বেছে নিন।'), sentence: 'Small classes can benefit ___ extra attention.', options: ['from', 'of', 'by'], answer: 'from', explanation: l('benefit from.', 'benefit from।'), why: { of: l('"এর সুবিধা" → the benefit of (noun), but the verb is benefit from.', '"এর সুবিধা" → the benefit of (noun), কিন্তু verb-এ benefit from।'), by: l('The verb benefit takes from.', 'benefit verb-এর পরে from।') } }),
        choice('vc-1-p4', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Which form fits?', 'কোন form বসবে?'), sentence: 'Regular exercise is ___ for mental health.', options: ['beneficial', 'benefit', 'benefits'], answer: 'beneficial', explanation: l('After is + for → an adjective: beneficial.', 'is-এর পরে আর for-এর আগে → adjective: beneficial।'), why: { benefit: l('benefit is a noun or verb; the gap needs an adjective.', 'benefit noun বা verb; এখানে adjective লাগবে।'), benefits: l('A verb or plural noun does not fit after is.', 'is-এর পরে verb বা plural noun বসে না।') } }),
        choice('vc-1-p5', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Task 2: which sentence is correct?', 'Task 2: কোন sentence-টা ঠিক?'), options: ['Social media has a significant impact on teenagers.', 'Social media has a significant impact to teenagers.', 'Social media impacts on teenagers significantly.'], answer: 'Social media has a significant impact on teenagers.', explanation: l('an impact on.', 'an impact on।'), why: { 'Social media has a significant impact to teenagers.': l('The noun impact takes on.', 'impact noun-এর পরে on।'), 'Social media impacts on teenagers significantly.': l('The verb impact takes an object directly (impacts teenagers); on is for the noun.', 'impact verb সরাসরি object নেয় (impacts teenagers); on noun-এর জন্য।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('vc-1-r1', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Write the missing word.', 'বাদ পড়া word-টা লিখুন।'), sentence: 'Air travel contributes ___ climate change.', accepted: ['to'], explanation: l('contribute to.', 'contribute to।') }),
        gap('vc-1-r2', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Write the missing word.', 'বাদ পড়া word-টা লিখুন।'), sentence: 'We could not afford ___ stay in a hotel.', accepted: ['to'], explanation: l('afford to + verb.', 'afford to + verb।') }),
        spot('vc-1-r3', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('One word is wrong. Tap it and fix it.', 'একটা word ভুল। Tap করে ঠিক করুন।'), sentence: 'Poor roads limit access of markets.', wrong: 'of', accepted: ['to'], explanation: l('access to.', 'access to।') }),
        correct('vc-1-r4', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে লিখুন।'), sentence: 'Every student can benefit of good teachers.', accepted: ['Every student can benefit from good teachers.'], explanation: l('benefit from.', 'benefit from।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('vc-1-c1', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Which note is the most useful record of a new word?', 'নতুন word-এর সবচেয়ে কাজের রেকর্ড কোনটা?'), options: ['consequence (n) — result, often bad — the consequences of — "Pollution has serious consequences."', 'consequence = ফলাফল', 'consequence — 11 letters'], answer: 'consequence (n) — result, often bad — the consequences of — "Pollution has serious consequences."', explanation: l('Meaning + form + pattern + example.', 'অর্থ + form + pattern + উদাহরণ।') }),
        spot('vc-1-c2', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Many graduates cannot afford buying a flat in Dhaka.', wrong: 'buying', accepted: ['to buy'], fixOptions: ['to buy', 'buy', 'bought'], explanation: l('afford to + verb.', 'afford to + verb।') }),
        order('vc-1-c3', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Online classes give students access to experts.', explanation: l('access to.', 'access to।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: three new words', 'এবার আপনার পালা: তিনটা নতুন word'),
      exercises: [
        write('vc-1-y1', 'voc-learn', {
          ...P,
          prompt: l('Write 3 sentences about your town, each using one of: afford, access, contribute, benefit. Use the correct word after it.', 'আপনার এলাকা নিয়ে ৩টা sentence লিখুন, প্রতিটায় একটা করে: afford, access, contribute, benefit। পরে ঠিক word বসান।'),
          model: 'Many young people in my town cannot afford to go to university. Most villages now have access to mobile internet. Small garment factories contribute to the local economy.',
          checklist: [l('afford to + verb', 'afford to + verb'), l('access to, contribute to, benefit from', 'access to, contribute to, benefit from'), l('the right form (noun / verb / adjective)', 'ঠিক form (noun / verb / adjective)')],
          explanation: l('Meaning + pattern + a real example.', 'অর্থ + pattern + একটা বাস্তব উদাহরণ।'),
          task: 'The student writes 3 sentences about their town using afford, access, contribute or benefit. Check only word knowledge: the correct pattern after each word (afford to + verb; access to; contribute to; benefit from / the benefit of; the impact of X on Y; the consequences of), the correct part of speech (benefit vs beneficial, impact noun vs affect verb), and whether the meaning fits the context. For each issue quote the words and give the fix.',
          target: l('Word patterns', 'Word pattern'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Knowing a word = meaning + form + pattern + sound + an example.', 'একটা word জানা = অর্থ + form + pattern + উচ্চারণ + একটা উদাহরণ।'),
        l('afford to do · access to · contribute to · benefit from · an impact on.', 'afford to do · access to · contribute to · benefit from · an impact on।'),
        l('Save words to your Brain with a full sentence, not just a Bangla meaning.', 'শুধু বাংলা অর্থ না, পুরো sentence-সহ word Brain-এ save করুন।'),
      ],
    },
  ],
};

// ======================================================================= vc-2
export const vcContext: Lesson = {
  id: 'vc-2',
  format: 'v2',
  concept: 'voc-context',
  title: l('Guessing meaning from context', 'Context থেকে অর্থ আন্দাজ'),
  why: l('Every IELTS Reading passage has words you do not know, and there is no dictionary. Context clues and word parts let you understand enough to answer — without stopping.', 'প্রতিটা IELTS Reading passage-এ অজানা word থাকে, আর dictionary নেই। Context-এর সংকেত আর word-এর অংশ দেখে উত্তর দেওয়ার মতো বোঝা যায় — না থেমেই।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('An unknown word in Reading', 'Reading-এ একটা অজানা word'),
      situation: l('"The drought was so severe that crops withered and many farmers lost their entire harvest."', '"The drought was so severe that crops withered and many farmers lost their entire harvest."'),
      question: l('What does "withered" probably mean?', '"withered"-এর সম্ভাব্য অর্থ কী?'),
      options: ['dried up and died', 'grew very quickly', 'were sold at a high price'],
      answer: 'dried up and died',
      diagnose: {
        'dried up and died': l('Right. The clues are "drought" (no rain), "so severe that" (a bad result) and "lost their entire harvest". You did not need a dictionary.', 'ঠিক। সংকেত: "drought" (বৃষ্টি নেই), "so severe that" (খারাপ ফল), আর "lost their entire harvest"। Dictionary লাগেনি।'),
        'grew very quickly': l('A drought is a long time without rain, and farmers lost their harvest — so the crops did not grow well.', 'Drought মানে দীর্ঘদিন বৃষ্টি নেই, আর কৃষকরা ফসল হারিয়েছেন — তাই ফসল ভালো হয়নি।'),
        'were sold at a high price': l('The result is that farmers "lost" their harvest, so this is something bad happening to the plants.', 'ফলাফল হলো কৃষকরা ফসল "হারিয়েছেন", তাই এটা গাছের খারাপ কিছু।'),
      },
    },
    {
      kind: 'discover',
      title: l('Four kinds of clue', 'চার রকম সংকেত'),
      items: [
        { en: 'Definition: Obesity, or being very overweight, is rising.', note: l('the meaning is given after , or / that is / which means', ', or / that is / which means-এর পরে অর্থ দেওয়া থাকে') },
        { en: 'Example: Renewable sources, such as wind and solar power, are growing.', note: l('such as / for example shows the meaning', 'such as / for example অর্থ দেখায়') },
        { en: 'Contrast: Unlike his outgoing sister, Sami is quite reserved.', note: l('unlike / but / however → the opposite', 'unlike / but / however → উল্টো অর্থ') },
        { en: 'Word parts: un-affordable, re-build, care-less, predict-able', note: l('prefix and suffix change the meaning', 'prefix আর suffix অর্থ বদলায়') },
      ],
      question: l('In the contrast example, what does "reserved" mean?', 'Contrast উদাহরণে "reserved" মানে কী?'),
      options: [
        l('Quiet, not outgoing — the opposite of his sister', 'চুপচাপ, মিশুক না — বোনের উল্টো'),
        l('Booked in advance', 'আগে থেকে বুক করা'),
        l('Very friendly', 'খুব মিশুক'),
      ],
      answer: 0,
      pattern: l('Look around the word: a definition (, or …), an example (such as …), a contrast (unlike, but) or a result (so … that). Then check the word parts.', 'Word-এর আশেপাশে দেখুন: সংজ্ঞা (, or …), উদাহরণ (such as …), বিপরীত (unlike, but) বা ফল (so … that)। তারপর word-এর অংশ দেখুন।'),
    },
    {
      kind: 'concept',
      title: l('Clues and word parts', 'সংকেত আর word-এর অংশ'),
      body: l(
        'You rarely need the exact meaning to answer a question. Aim for the general meaning: positive or negative, more or less, a person, a thing or an action.',
        'প্রশ্নের উত্তর দিতে সাধারণত হুবহু অর্থ লাগে না। সাধারণ অর্থ ধরুন: ভালো না খারাপ, বেশি না কম, মানুষ, জিনিস না কাজ।',
      ),
      points: [
        l('Context clues: definition (, or / that is / which means), example (such as, including), contrast (unlike, but, however, whereas), cause and result (because, so … that).', 'Context-এর সংকেত: সংজ্ঞা (, or / that is / which means), উদাহরণ (such as, including), বিপরীত (unlike, but, however, whereas), কারণ আর ফল (because, so … that)।'),
        l('Prefixes: un- / in- / im- / dis- = not (unaffordable, impossible); re- = again (rebuild); over- = too much (overcrowded); under- = too little (underfunded); mis- = wrongly (misunderstand).', 'Prefix: un- / in- / im- / dis- = না (unaffordable, impossible); re- = আবার (rebuild); over- = অতিরিক্ত (overcrowded); under- = অপর্যাপ্ত (underfunded); mis- = ভুলভাবে (misunderstand)।'),
        l('Suffixes: -less = without (careless); -ful = with (useful); -able = can be (predictable); -tion / -ment = a noun (pollution, development); -ly = an adverb (rapidly).', 'Suffix: -less = ছাড়া (careless); -ful = সহ (useful); -able = করা যায় (predictable); -tion / -ment = noun (pollution, development); -ly = adverb (rapidly)।'),
        l('The job in the sentence (after "the" → a noun; after "is" → often an adjective) also tells you what kind of word it is.', 'Sentence-এ word-টার কাজ ("the"-এর পরে → noun; "is"-এর পরে → প্রায়ই adjective) থেকেও বোঝা যায় কী ধরনের word।'),
        l('Why Bangla speakers slip: many students were taught to translate every word into Bangla, so one unknown word stops their reading. In IELTS, stopping costs time — guess, mark it, and keep reading.', 'বাংলাভাষীরা কেন ভুল করে: অনেককে প্রতিটা word বাংলায় অনুবাদ করতে শেখানো হয়েছে, তাই একটা অজানা word-এ পড়া থেমে যায়। IELTS-এ থামা মানে সময় নষ্ট — আন্দাজ করুন, চিহ্ন দিন, পড়তে থাকুন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'The city is overcrowded: too many people live in too little space.', note: l('over- = too much; definition after the colon', 'over- = অতিরিক্ত; colon-এর পরে সংজ্ঞা') },
        { en: 'Housing has become unaffordable for young workers.', note: l('un- + afford + -able = cannot be paid for', 'un- + afford + -able = খরচ বহন করা যায় না') },
        { en: 'The rural school is underfunded, so it has few books.', note: l('under- = not enough; result: few books', 'under- = যথেষ্ট না; ফল: কম বই') },
        { en: 'Unlike cars, bicycles are eco-friendly.', note: l('contrast: bicycles are the opposite of cars here', 'বিপরীত: এখানে bicycle car-এর উল্টো') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'reading', example: 'The species is now endangered, meaning it may soon disappear.', note: l('Reading: definition clues often follow a comma or "meaning".', 'Reading: সংজ্ঞার সংকেত প্রায়ই comma বা "meaning"-এর পরে থাকে।') },
        { skill: 'listening', example: 'The old building will be renovated — that is, repaired and modernised.', note: l('Listening: speakers explain difficult words with "that is" or "in other words".', 'Listening: speaker কঠিন word "that is" বা "in other words" দিয়ে ব্যাখ্যা করেন।') },
        { skill: 'writing', example: 'Many hospitals in rural areas are underfunded.', note: l('Writing: word parts help you build precise words (under-, over-, un-).', 'Writing: word-এর অংশ দিয়ে নির্দিষ্ট word বানানো যায় (under-, over-, un-)।') },
        { skill: 'speaking', example: 'Sorry, what do you mean by "sustainable"?', note: l('Speaking Part 3: you may ask the examiner to explain a word.', 'Speaking Part 3: examiner-কে একটা word ব্যাখ্যা করতে বলা যায়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Stopping for two minutes on one unknown word', right: 'Guess from context, mark it, keep reading', why: l('Time matters more than one word.', 'একটা word-এর চেয়ে সময় বেশি গুরুত্বপূর্ণ।') },
        { wrong: 'unaffordable = can afford', right: 'unaffordable = cannot afford', why: l('un- = not.', 'un- = না।') },
        { wrong: '"reserved" always means booked', right: 'In "a reserved person", it means quiet', why: l('The context decides the meaning.', 'Context অর্থ ঠিক করে।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('vc-2-p1', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('What does "unaffordable" mean?', '"unaffordable" মানে কী?'), sentence: 'For many families, private schools are unaffordable.', options: ['too expensive to pay for', 'very cheap', 'easy to find'], answer: 'too expensive to pay for', explanation: l('un- (not) + afford + -able (can be).', 'un- (না) + afford + -able (করা যায়)।'), why: { 'very cheap': l('un- means not: it cannot be afforded — the opposite of cheap.', 'un- মানে না: খরচ বহন করা যায় না — cheap-এর উল্টো।'), 'easy to find': l('The root is afford (pay for), not find.', 'মূল word afford (খরচ বহন করা), find না।') } }),
        choice('vc-2-p2', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('What does "rebuild" mean?', '"rebuild" মানে কী?'), sentence: 'After the flood, the villagers had to rebuild their homes.', options: ['build again', 'build badly', 'stop building'], answer: 'build again', explanation: l('re- = again.', 're- = আবার।'), why: { 'build badly': l('Badly would be mis- (misbuild is not common); re- means again.', 'খারাপভাবে হলে mis-; re- মানে আবার।'), 'stop building': l('re- means again, not stop.', 're- মানে আবার, থামা না।') } }),
        choice('vc-2-p3', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('Use the example clue. What are "pulses"?', 'উদাহরণের সংকেত ব্যবহার করুন। "pulses" কী?'), sentence: 'Pulses, such as lentils, chickpeas and beans, are cheap sources of protein.', options: ['seeds like lentils and beans', 'heartbeats', 'types of meat'], answer: 'seeds like lentils and beans', explanation: l('The examples after "such as" show the meaning.', '"such as"-এর পরের উদাহরণ অর্থ দেখায়।'), why: { heartbeats: l('That is another meaning of pulse; the context (lentils, beans, protein) shows food.', 'এটা pulse-এর আরেকটা অর্থ; context (lentils, beans, protein) খাবার দেখায়।'), 'types of meat': l('Lentils and beans are not meat.', 'Lentils আর beans মাংস না।') } }),
        choice('vc-2-p4', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('Use the contrast clue. What does "frugal" mean?', 'বিপরীতের সংকেত ব্যবহার করুন। "frugal" মানে কী?'), sentence: 'Unlike her brother, who spends money on everything, Rina is very frugal.', options: ['careful with money', 'rich', 'generous with money'], answer: 'careful with money', explanation: l('Unlike → the opposite of spending on everything.', 'Unlike → সবকিছুতে খরচ করার উল্টো।'), why: { rich: l('The contrast is about spending, not about having money.', 'বিপরীতটা খরচ নিয়ে, টাকা থাকা নিয়ে না।'), 'generous with money': l('Generous is close to spending a lot — the same as her brother, not the opposite.', 'Generous বেশি খরচের কাছাকাছি — ভাইয়ের মতো, উল্টো না।') } }),
        choice('vc-2-p5', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('Reading: what does "mitigate" probably mean?', 'Reading: "mitigate"-এর সম্ভাব্য অর্থ কী?'), sentence: 'Planting trees along rivers can mitigate the effects of flooding, so less land is damaged.', options: ['reduce', 'cause', 'measure'], answer: 'reduce', explanation: l('Result clue: "so less land is damaged".', 'ফলের সংকেত: "so less land is damaged"।'), why: { cause: l('If trees caused flood effects, more land would be damaged, not less.', 'গাছ যদি বন্যার প্রভাব ঘটাত, জমি বেশি নষ্ট হতো, কম না।'), measure: l('Measuring would not make less land damaged.', 'মাপলে জমি কম নষ্ট হয় না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('vc-2-r1', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('Add a prefix to make the opposite (one word).', 'উল্টো অর্থ বানাতে prefix যোগ করুন (একটা word)।'), sentence: 'Walking alone at night in that area is ___ (safe).', base: 'safe', accepted: ['unsafe'], explanation: l('un- + safe = unsafe.', 'un- + safe = unsafe।') }),
        gap('vc-2-r2', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('Add a prefix: "too many people" (one word).', 'Prefix যোগ করুন: "অতিরিক্ত মানুষ" (একটা word)।'), sentence: 'The buses are ___ (crowded) during rush hour.', base: 'crowded', accepted: ['overcrowded'], explanation: l('over- = too much.', 'over- = অতিরিক্ত।') }),
        gap('vc-2-r3', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('Add a suffix meaning "without" (one word).', '"ছাড়া" অর্থের suffix যোগ করুন (একটা word)।'), sentence: 'The old phone is now completely ___ (use).', base: 'use', accepted: ['useless'], explanation: l('-less = without.', '-less = ছাড়া।') }),
        spot('vc-2-r4', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('One word has the wrong prefix for the meaning. Tap it and fix it.', 'একটা word-এ অর্থের জন্য ভুল prefix। Tap করে ঠিক করুন।'), sentence: 'Rural clinics are overfunded, so they lack doctors and medicine.', wrong: 'overfunded', accepted: ['underfunded'], explanation: l('Lacking doctors → too little money → under-.', 'ডাক্তারের অভাব → অপর্যাপ্ত টাকা → under-।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('vc-2-c1', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('Which phrase introduces a definition?', 'কোন phrase সংজ্ঞা শুরু করে?'), options: ['that is,', 'however,', 'as a result,'], answer: 'that is,', explanation: l('that is / in other words / which means → a definition.', 'that is / in other words / which means → সংজ্ঞা।') }),
        spot('vc-2-c2', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('One word breaks the meaning. Tap it, then fix it.', 'একটা word অর্থ ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'The weather is so predictable here that we never know when it will rain.', wrong: 'predictable', accepted: ['unpredictable'], fixOptions: ['unpredictable', 'predicted', 'prediction'], explanation: l('never know → unpredictable.', 'never know → unpredictable।') }),
        order('vc-2-c3', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Many rural schools are underfunded and overcrowded.', explanation: l('under- = too little, over- = too much.', 'under- = অপর্যাপ্ত, over- = অতিরিক্ত।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: explain a word', 'এবার আপনার পালা: একটা word ব্যাখ্যা করুন'),
      exercises: [
        write('vc-2-y1', 'voc-context', {
          ...P,
          prompt: l('Write 3 sentences about a problem in your area. Use two words with a prefix or suffix (un-, over-, under-, re-, -less, -able) and explain one of them with "that is," or "such as".', 'আপনার এলাকার একটা সমস্যা নিয়ে ৩টা sentence লিখুন। prefix বা suffix-সহ দুটো word ব্যবহার করুন (un-, over-, under-, re-, -less, -able), আর একটাকে "that is," বা "such as" দিয়ে ব্যাখ্যা করুন।'),
          model: 'The main hospital in my town is overcrowded, that is, it has far more patients than beds. Many patients find private clinics unaffordable. The government plans to rebuild the old wing next year.',
          checklist: [l('prefixes and suffixes with the right meaning', 'ঠিক অর্থে prefix আর suffix'), l('a clue: that is, / such as', 'একটা সংকেত: that is, / such as'), l('the meaning fits the sentence', 'অর্থ sentence-এর সাথে মেলে')],
          explanation: l('Word parts carry meaning.', 'Word-এর অংশ অর্থ বহন করে।'),
          task: 'The student writes 3 sentences about a local problem using two words with a prefix or suffix and one explanation with "that is," or "such as". Check only vocabulary: that each prefix or suffix gives the intended meaning (un-/in-/im-/dis- not, re- again, over- too much, under- too little, mis- wrongly, -less without, -ful with, -able can be), that the word exists in English, and that the explanation after "that is" or "such as" really explains the word. For each issue quote the words and give the fix.',
          target: l('Word parts and clues', 'Word-এর অংশ আর সংকেত'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Clues: , or / that is (definition) · such as (example) · unlike / but (contrast) · so … that (result).', 'সংকেত: , or / that is (সংজ্ঞা) · such as (উদাহরণ) · unlike / but (বিপরীত) · so … that (ফল)।'),
        l('un- / dis- = not · re- = again · over- / under- = too much / too little · -less = without · -able = can be.', 'un- / dis- = না · re- = আবার · over- / under- = অতিরিক্ত / অপর্যাপ্ত · -less = ছাড়া · -able = করা যায়।'),
        l('In Reading: guess, mark, keep going.', 'Reading-এ: আন্দাজ করুন, চিহ্ন দিন, এগিয়ে যান।'),
      ],
    },
  ],
};

// ======================================================================= vc-3
export const vcParaphrase: Lesson = {
  id: 'vc-3',
  format: 'v2',
  concept: 'voc-paraphrase',
  title: l('Synonyms and paraphrasing', 'Synonym আর paraphrasing'),
  why: l('IELTS rewards paraphrasing: the Reading and Listening questions use different words from the text, and Writing Task 1 and 2 must not copy the question. But not every synonym fits every sentence.', 'IELTS paraphrasing-এ নম্বর দেয়: Reading আর Listening-এর প্রশ্নে text-এর থেকে আলাদা word থাকে, আর Writing Task 1 ও 2-এ প্রশ্ন হুবহু লেখা যায় না। কিন্তু সব synonym সব sentence-এ বসে না।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('Rewriting the question', 'প্রশ্নটা নিজের ভাষায় লেখা'),
      situation: l('The Task 2 question: "Many people believe that children should learn a foreign language at primary school." You write: "Many persons think that kids must study a strange language at primary school."', 'Task 2 প্রশ্ন: "Many people believe that children should learn a foreign language at primary school." আপনি লিখলেন: "Many persons think that kids must study a strange language at primary school."'),
      question: l('What is wrong with this paraphrase?', 'এই paraphrase-এ সমস্যা কী?'),
      options: ['Some synonyms change the meaning or tone (strange, kids, must)', 'Nothing — every word is different', 'It should copy the question exactly'],
      answer: 'Some synonyms change the meaning or tone (strange, kids, must)',
      diagnose: {
        'Some synonyms change the meaning or tone (strange, kids, must)': l('Right. "strange" means odd, not foreign; "kids" is informal; "must" is stronger than "should". A better version: "It is often argued that young learners ought to start a second language in primary school."', 'ঠিক। "strange" মানে অদ্ভুত, foreign না; "kids" informal; "must" "should"-এর চেয়ে জোরালো। ভালো রূপ: "It is often argued that young learners ought to start a second language in primary school."'),
        'Nothing — every word is different': l('Different is not enough — the meaning must stay the same. "strange language" and "must" change it.', 'আলাদা হলেই হয় না — অর্থ একই থাকতে হবে। "strange language" আর "must" অর্থ বদলে দেয়।'),
        'It should copy the question exactly': l('Copying the question is not credited. Paraphrase — but keep the meaning.', 'প্রশ্ন হুবহু লিখলে নম্বর হয় না। Paraphrase করুন — কিন্তু অর্থ রেখে।'),
      },
    },
    {
      kind: 'discover',
      title: l('Three ways to paraphrase', 'Paraphrase-এর তিনটা উপায়'),
      items: [
        { en: 'Synonym: The number of students increased. → The number of students rose.', note: l('same meaning, same grammar', 'একই অর্থ, একই grammar') },
        { en: 'Word form: The number of students increased. → There was an increase in the number of students.', note: l('verb → noun', 'verb → noun') },
        { en: 'Structure: Cars cause pollution. → Pollution is caused by cars.', note: l('active → passive', 'active → passive') },
        { en: 'Not a synonym: important ≠ famous · foreign ≠ strange · big ≠ tall', note: l('dictionary neighbours with a different meaning', 'dictionary-তে পাশাপাশি, কিন্তু অর্থ আলাদা') },
      ],
      question: l('What must a paraphrase keep?', 'Paraphrase-এ কী রাখতেই হবে?'),
      options: [
        l('The exact meaning and the same strength', 'হুবহু অর্থ আর একই জোর'),
        l('The same words in a different order', 'একই word, অন্য ক্রমে'),
        l('As many rare words as possible', 'যত বেশি সম্ভব কঠিন word'),
      ],
      answer: 0,
      pattern: l('Paraphrase = same meaning, different words. Use a true synonym, change the word form, or change the structure — and check that the new word fits the context and the tone.', 'Paraphrase = একই অর্থ, আলাদা word। সঠিক synonym, word form বদল, বা গঠন বদল — আর যাচাই করুন নতুন word context আর সুরের সাথে মেলে কি না।'),
    },
    {
      kind: 'concept',
      title: l('Choosing a synonym that fits', 'মানানসই synonym বাছাই'),
      body: l(
        'Very few words are perfect synonyms. Check the meaning, the grammar pattern and the tone before you swap.',
        'খুব কম word পুরোপুরি synonym। বদলানোর আগে অর্থ, grammar pattern আর সুর যাচাই করুন।',
      ),
      points: [
        l('Useful groups: increase / rise / grow / go up · decrease / fall / decline / drop · important / significant / crucial / essential · show / illustrate / indicate · people / individuals / the public.', 'কাজের দল: increase / rise / grow / go up · decrease / fall / decline / drop · important / significant / crucial / essential · show / illustrate / indicate · people / individuals / the public।'),
        l('Grammar changes with the synonym: prices rose (no object) but the government raised prices; affect (verb) → have an effect on (noun).', 'Synonym বদলালে grammar বদলায়: prices rose (object নেই) কিন্তু the government raised prices; affect (verb) → have an effect on (noun)।'),
        l('Strength and tone: should ≠ must; some ≠ most; famous ≠ important; kids (informal) ≠ children.', 'জোর আর সুর: should ≠ must; some ≠ most; famous ≠ important; kids (informal) ≠ children।'),
        l('Keep key technical words: "primary school", "carbon emissions" and names often have no good synonym — change the words around them instead.', 'মূল technical word রাখুন: "primary school", "carbon emissions" বা নামের প্রায়ই ভালো synonym নেই — আশেপাশের word বদলান।'),
        l('Why Bangla speakers slip: a Bangla–English dictionary lists many English words for one Bangla word (বিদেশি → foreign, strange, alien), so any of them seems correct. Only one fits the context.', 'বাংলাভাষীরা কেন ভুল করে: বাংলা–English dictionary-তে একটা বাংলা word-এর অনেক English word থাকে (বিদেশি → foreign, strange, alien), তাই যেকোনোটা ঠিক মনে হয়। Context-এ মেলে একটাই।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'The graph shows → The graph illustrates', note: l('Task 1 opening', 'Task 1-এর শুরু') },
        { en: 'Unemployment increased sharply. → There was a sharp increase in unemployment.', note: l('verb + adverb → adjective + noun', 'verb + adverb → adjective + noun') },
        { en: 'Many people believe … → It is widely believed that …', note: l('Task 2 structure change', 'Task 2-এ গঠন বদল') },
        { en: 'a crucial factor = a very important factor', note: l('crucial replaces very important', 'crucial = very important') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'reading', example: 'Question: "Costs went up." Text: "Expenses rose significantly."', note: l('Reading: the answer is usually a paraphrase, not the same words.', 'Reading: উত্তর সাধারণত paraphrase, একই word না।') },
        { skill: 'listening', example: 'Question: "cheapest option" — you hear "the least expensive choice".', note: l('Listening: listen for the meaning, not the exact word.', 'Listening: হুবহু word না, অর্থ শুনুন।') },
        { skill: 'writing', example: 'The chart illustrates how many tourists visited three countries.', note: l('Task 1: paraphrase the question in your first sentence.', 'Task 1: প্রথম sentence-এ প্রশ্নটা paraphrase করুন।') },
        { skill: 'speaking', example: 'Examiner: "Do you enjoy cooking?" You: "Yes, I really like making food for my family."', note: l('Speaking: using your own words shows range.', 'Speaking: নিজের word ব্যবহার range দেখায়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'children should learn a strange language', right: 'children should learn a foreign language', why: l('strange = odd, not from another country.', 'strange = অদ্ভুত, অন্য দেশের না।') },
        { wrong: 'The price raised in 2020.', right: 'The price rose in 2020.', why: l('rise has no object.', 'rise-এর object নেই।') },
        { wrong: 'Taj Mahal is an important building in India.', right: 'The Taj Mahal is a famous building in India.', why: l('famous (well known) and important are different.', 'famous (সবার চেনা) আর important আলাদা।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('vc-3-p1', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Which word can replace "increased"?', '"increased"-এর জায়গায় কোন word বসবে?'), sentence: 'The number of cars increased between 2010 and 2020.', options: ['rose', 'raised', 'grew up'], answer: 'rose', explanation: l('rose = increased (no object).', 'rose = increased (object নেই)।'), why: { raised: l('raise needs an object (raised prices).', 'raise-এর object লাগে (raised prices)।'), 'grew up': l('grow up is for children becoming adults.', 'grow up মানে শিশু থেকে বড় হওয়া।') } }),
        choice('vc-3-p2', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Which word keeps the meaning of "foreign"?', 'কোন word "foreign"-এর অর্থ রাখে?'), sentence: 'More schools now teach a ___ language from Class 1.', options: ['second', 'strange', 'alien'], answer: 'second', explanation: l('a second language = a foreign language here.', 'এখানে a second language = a foreign language।'), why: { strange: l('strange means odd or unusual.', 'strange মানে অদ্ভুত বা অস্বাভাবিক।'), alien: l('alien sounds like something from space or completely unfamiliar.', 'alien মহাকাশের বা একদম অচেনা কিছু বোঝায়।') } }),
        choice('vc-3-p3', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Which paraphrase keeps the same meaning?', 'কোন paraphrase একই অর্থ রাখে?'), sentence: 'Original: Some people think cities are unsafe.', options: ['Certain individuals believe that urban areas are dangerous.', 'Most people know that cities are dangerous.', 'Some people think cities are very dangerous places to be avoided.'], answer: 'Certain individuals believe that urban areas are dangerous.', explanation: l('some → certain, people → individuals, think → believe, cities → urban areas.', 'some → certain, people → individuals, think → believe, cities → urban areas।'), why: { 'Most people know that cities are dangerous.': l('"most" and "know" are stronger than "some" and "think".', '"most" আর "know" "some" আর "think"-এর চেয়ে জোরালো।'), 'Some people think cities are very dangerous places to be avoided.': l('It adds ideas ("very", "to be avoided") that were not there.', 'এতে নতুন idea যোগ হয়েছে ("very", "to be avoided")।') } }),
        choice('vc-3-p4', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Change the word form. Which sentence is correct?', 'Word form বদলান। কোন sentence-টা ঠিক?'), sentence: 'Original: Prices increased dramatically.', options: ['There was a dramatic increase in prices.', 'There was a dramatically increase in prices.', 'There was a dramatic increased of prices.'], answer: 'There was a dramatic increase in prices.', explanation: l('verb + adverb → adjective + noun + in.', 'verb + adverb → adjective + noun + in।'), why: { 'There was a dramatically increase in prices.': l('Before a noun, use the adjective: dramatic.', 'Noun-এর আগে adjective: dramatic।'), 'There was a dramatic increased of prices.': l('The noun is increase, and it takes in.', 'Noun হলো increase, আর এর পরে in।') } }),
        choice('vc-3-p5', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Task 2: which is the best paraphrase of the question?', 'Task 2: প্রশ্নের সবচেয়ে ভালো paraphrase কোনটা?'), sentence: 'Question: Governments should spend more money on public transport.', options: ['It is often argued that the state ought to invest more in buses and trains.', 'Governments should spend more money on public transport.', 'The government must give all its money to buses.'], answer: 'It is often argued that the state ought to invest more in buses and trains.', explanation: l('Same meaning and strength, new words and structure.', 'একই অর্থ আর জোর, নতুন word আর গঠন।'), why: { 'Governments should spend more money on public transport.': l('This copies the question; it earns no credit.', 'এটা প্রশ্ন হুবহু লেখা; নম্বর হয় না।'), 'The government must give all its money to buses.': l('"must" and "all its money" change the meaning.', '"must" আর "all its money" অর্থ বদলে দেয়।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('vc-3-r1', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Write a synonym of "fell" (one word).', '"fell"-এর একটা synonym লিখুন (একটা word)।'), sentence: 'Sales fell in 2019. → Sales ___ in 2019.', accepted: ['decreased', 'declined', 'dropped'], explanation: l('decreased / declined / dropped.', 'decreased / declined / dropped।') }),
        gap('vc-3-r2', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Write the noun form (one word).', 'Noun form লিখুন (একটা word)।'), sentence: 'Crime declined. → There was a ___ in crime.', accepted: ['decline', 'decrease', 'fall', 'drop', 'reduction'], explanation: l('decline (n) + in.', 'decline (n) + in।') }),
        correct('vc-3-r3', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Fix the wrong synonym.', 'ভুল synonym ঠিক করুন।'), sentence: 'The graph shows the amount of water raised every year.', accepted: ['The graph shows the amount of water rose every year.', 'The graph shows the amount of water increased every year.', 'The graph shows that the amount of water rose every year.', 'The graph shows that the amount of water increased every year.'], explanation: l('No object → rose / increased.', 'Object নেই → rose / increased।') }),
        spot('vc-3-r4', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('One synonym changes the meaning. Tap it and fix it.', 'একটা synonym অর্থ বদলে দেয়। Tap করে ঠিক করুন।'), sentence: 'Learning a strange language opens many job opportunities.', wrong: 'strange', accepted: ['foreign', 'second', 'new'], explanation: l('foreign / second language.', 'foreign / second language।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('vc-3-c1', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Which is NOT a good synonym of "important" in "an important factor"?', '"an important factor"-এ "important"-এর ভালো synonym কোনটা না?'), options: ['famous', 'crucial', 'significant'], answer: 'famous', explanation: l('famous = well known; it does not mean important.', 'famous = সবার চেনা; important বোঝায় না।') }),
        spot('vc-3-c2', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('One word breaks this Task 1 sentence. Tap it, then fix it.', 'একটা word এই Task 1 sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'The chart describes that exports doubled.', wrong: 'describes', accepted: ['shows', 'indicates', 'reveals'], fixOptions: ['shows', 'describe', 'tells'], explanation: l('describe takes an object, not a that-clause: shows that …', 'describe-এর পরে that-clause বসে না: shows that …') }),
        order('vc-3-c3', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Build the paraphrase.', 'Paraphrase-টা সাজান।'), answer: 'There was a significant rise in house prices.', explanation: l('adjective + noun + in.', 'adjective + noun + in।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: paraphrase a question', 'এবার আপনার পালা: একটা প্রশ্ন paraphrase করুন'),
      exercises: [
        write('vc-3-y1', 'voc-paraphrase', {
          ...P,
          prompt: l('Paraphrase this Task 2 question in 1–2 sentences, then add one sentence with your opinion: "Many young people today spend too much time on social media."', 'এই Task 2 প্রশ্নটা ১–২ sentence-এ paraphrase করুন, তারপর একটা sentence-এ আপনার মত দিন: "Many young people today spend too much time on social media."'),
          model: 'It is often said that teenagers now devote an excessive amount of time to online platforms. In my view, this is partly true, but social media can also help young people learn.',
          checklist: [l('same meaning and strength', 'একই অর্থ আর জোর'), l('true synonyms, changed word forms or structure', 'সঠিক synonym, বদলানো word form বা গঠন'), l('no copied phrases from the question', 'প্রশ্নের phrase হুবহু না')],
          explanation: l('New words, same meaning.', 'নতুন word, একই অর্থ।'),
          task: 'The student paraphrases "Many young people today spend too much time on social media." and adds an opinion. Check only paraphrasing and word choice: synonyms must keep the meaning and strength (too much ≠ some; many ≠ all; young people → teenagers / the younger generation is fine), must fit grammatically (spend time on → devote time to), must not change tone (kids is informal), and long phrases should not be copied from the question. Flag dictionary synonyms that do not fit the context. For each issue quote the words and give a better choice.',
          target: l('Paraphrasing', 'Paraphrasing'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Paraphrase = same meaning, different words: synonym, word form or structure.', 'Paraphrase = একই অর্থ, আলাদা word: synonym, word form বা গঠন।'),
        l('Check meaning, grammar and strength: rose not raised; should not must; foreign not strange.', 'অর্থ, grammar আর জোর যাচাই: raised না rose; must না should; strange না foreign।'),
        l('Keep technical words; change the words around them.', 'Technical word রাখুন; আশেপাশের word বদলান।'),
      ],
    },
  ],
};

// ======================================================================= vc-4
export const vcRegister: Lesson = {
  id: 'vc-4',
  format: 'v2',
  concept: 'voc-register',
  title: l('Formal and informal words', 'Formal আর informal word'),
  why: l('"Kids", "stuff" and "a lot of" are fine when you speak, but they make an academic essay sound like a text message. Task 2 and Academic Task 1 need a formal register; Speaking and GT informal letters do not.', '"Kids", "stuff" আর "a lot of" কথা বলায় ঠিক, কিন্তু academic essay-কে text message-এর মতো শোনায়। Task 2 আর Academic Task 1-এ formal register লাগে; Speaking আর GT informal letter-এ লাগে না।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 2 sentence', 'একটা Task 2 sentence'),
      situation: l('"Nowadays, lots of kids get really stressed because they have tons of stuff to study."', '"Nowadays, lots of kids get really stressed because they have tons of stuff to study."'),
      question: l('What is the problem?', 'সমস্যাটা কী?'),
      options: ['Informal words in a formal essay', 'Grammar errors', 'Nothing — it is clear'],
      answer: 'Informal words in a formal essay',
      diagnose: {
        'Informal words in a formal essay': l('Right. A formal version: "Nowadays, many children experience considerable stress because they have a heavy workload."', 'ঠিক। Formal রূপ: "Nowadays, many children experience considerable stress because they have a heavy workload."'),
        'Grammar errors': l('The grammar is fine. The words (lots of, kids, really, tons of stuff) are too informal for Task 2.', 'Grammar ঠিক আছে। Word-গুলো (lots of, kids, really, tons of stuff) Task 2-এর জন্য খুব informal।'),
        'Nothing — it is clear': l('Clear, but informal. Examiners expect an academic tone in Task 2.', 'পরিষ্কার, কিন্তু informal। Task 2-এ examiner academic সুর আশা করেন।'),
      },
    },
    {
      kind: 'discover',
      title: l('Informal → formal', 'Informal → formal'),
      items: [
        { en: 'kids → children · guys → people · stuff / things → items, issues, aspects', note: l('nouns', 'noun') },
        { en: 'get → obtain, receive, become · go up → increase · look into → investigate', note: l('phrasal verbs → single verbs', 'phrasal verb → একক verb') },
        { en: 'a lot of / lots of → many, much, a large number of, a great deal of', note: l('quantities', 'পরিমাণ') },
        { en: 'really / so → extremely, highly · big → large, major · pretty good → fairly good', note: l('intensifiers and adjectives', 'জোর দেওয়ার word আর adjective') },
      ],
      question: l('Where should you use the informal words?', 'Informal word কোথায় ব্যবহার করবেন?'),
      options: [
        l('In Speaking and in informal GT letters to friends', 'Speaking-এ আর বন্ধুকে লেখা informal GT letter-এ'),
        l('In Task 2 essays', 'Task 2 essay-তে'),
        l('Nowhere in IELTS', 'IELTS-এ কোথাও না'),
      ],
      answer: 0,
      pattern: l('Match the register to the task: formal for Task 2, Academic Task 1 and formal letters; neutral-to-informal for Speaking and letters to friends.', 'Task অনুযায়ী register: Task 2, Academic Task 1 আর formal letter-এ formal; Speaking আর বন্ধুকে লেখা letter-এ neutral থেকে informal।'),
    },
    {
      kind: 'concept',
      title: l('Register by task', 'Task অনুযায়ী register'),
      body: l(
        'Formal does not mean long or rare words. It means neutral, precise words without slang, contractions or chatty intensifiers.',
        'Formal মানে লম্বা বা কঠিন word না। মানে slang, contraction বা আড্ডার জোর-দেওয়া word ছাড়া নিরপেক্ষ, নির্দিষ্ট word।',
      ),
      points: [
        l('Formal (Task 2, Academic Task 1, formal letters): children, many / a large number of, obtain / receive, increase, extremely, significant, It is, do not.', 'Formal (Task 2, Academic Task 1, formal letter): children, many / a large number of, obtain / receive, increase, extremely, significant, It is, do not।'),
        l('Informal (Speaking, letters to friends): kids, a lot of, get, go up, really, pretty, it’s, don’t — natural and fine here.', 'Informal (Speaking, বন্ধুকে letter): kids, a lot of, get, go up, really, pretty, it’s, don’t — এখানে স্বাভাবিক আর ঠিক।'),
        l('Avoid everywhere in writing: slang (gonna, wanna, cool, awesome), text language (u, bcz), and "etc." at the end of a list in essays.', 'লেখায় কোথাও না: slang (gonna, wanna, cool, awesome), text-এর ভাষা (u, bcz), আর essay-তে তালিকার শেষে "etc."।'),
        l('Too formal in Speaking sounds memorised: "Furthermore, it is my firm conviction that …" — use "Also, I really think …".', 'Speaking-এ অতিরিক্ত formal মুখস্থ শোনায়: "Furthermore, it is my firm conviction that …" — বলুন "Also, I really think …"।'),
        l('Why Bangla speakers slip: English learned from films, social media and chatting is informal, while essay English is learned from memorised phrases — so writing mixes both, and speaking sounds like an essay.', 'বাংলাভাষীরা কেন ভুল করে: সিনেমা, social media আর chat থেকে শেখা English informal, আর essay-র English মুখস্থ phrase থেকে — তাই লেখায় দুটো মিশে যায়, আর কথা essay-র মতো শোনায়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'Many children spend several hours a day online.', note: l('Task 2: formal', 'Task 2: formal') },
        { en: 'The number of visitors increased significantly.', note: l('Task 1: formal (not "went up a lot")', 'Task 1: formal ("went up a lot" না)') },
        { en: 'Yeah, I spend a lot of time on my phone, to be honest.', note: l('Speaking: natural informal', 'Speaking: স্বাভাবিক informal') },
        { en: 'Hi Rafi, it’s great to hear from you!', note: l('GT informal letter', 'GT informal letter') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'A large number of students obtain part-time jobs.', note: l('Task 2: formal quantities and verbs.', 'Task 2: formal পরিমাণ আর verb।') },
        { skill: 'speaking', example: 'I usually hang out with my friends at the weekend.', note: l('Speaking: informal phrasal verbs sound natural.', 'Speaking: informal phrasal verb স্বাভাবিক শোনায়।') },
        { skill: 'reading', example: 'Academic texts use "obtain", "reside" and "commence" for get, live and start.', note: l('Reading: formal words are paraphrases of everyday words in the questions.', 'Reading: formal word প্রশ্নের সাধারণ word-এর paraphrase।') },
        { skill: 'listening', example: 'Part 1: "Yeah, that’s fine" · Part 4 lecture: "This is a significant finding."', note: l('Listening: Parts 1–2 are informal, Part 4 is academic.', 'Listening: Part 1–2 informal, Part 4 academic।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Kids should do sports.', right: 'Children should do sport.', why: l('Task 2: children.', 'Task 2: children।') },
        { wrong: 'The price went up a lot.', right: 'The price increased considerably.', why: l('Task 1: formal verb and adverb.', 'Task 1: formal verb আর adverb।') },
        { wrong: 'Governments gotta act now.', right: 'Governments must act now.', why: l('No slang in writing.', 'লেখায় slang না।') },
        { wrong: 'Speaking: "Moreover, I would argue that my hometown is picturesque."', right: '"Also, my hometown is really pretty."', why: l('Speaking should sound natural.', 'Speaking স্বাভাবিক শোনানো উচিত।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('vc-4-p1', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Task 2: choose the formal word.', 'Task 2: formal word বেছে নিন।'), sentence: 'Many ___ spend too much time watching videos.', options: ['children', 'kids', 'guys'], answer: 'children', explanation: l('Task 2 → children.', 'Task 2 → children।'), why: { kids: l('kids is informal — fine in Speaking, not in an essay.', 'kids informal — Speaking-এ ঠিক, essay-তে না।'), guys: l('guys is informal and usually means men or friends.', 'guys informal, আর সাধারণত পুরুষ বা বন্ধু বোঝায়।') } }),
        choice('vc-4-p2', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Task 1: choose the formal verb.', 'Task 1: formal verb বেছে নিন।'), sentence: 'The number of cyclists ___ between 2000 and 2020.', options: ['increased', 'went up a lot', 'shot up like crazy'], answer: 'increased', explanation: l('Task 1 → increased (+ an adverb if needed).', 'Task 1 → increased (দরকারে + adverb)।'), why: { 'went up a lot': l('Phrasal verb + a lot is informal; use increased considerably.', 'Phrasal verb + a lot informal; increased considerably লিখুন।'), 'shot up like crazy': l('Slang has no place in Task 1.', 'Task 1-এ slang চলে না।') } }),
        choice('vc-4-p3', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Task 2: which quantity is formal?', 'Task 2: কোন পরিমাণ formal?'), sentence: '___ people now work from home.', options: ['A large number of', 'Loads of', 'Tons of'], answer: 'A large number of', explanation: l('a large number of + plural.', 'a large number of + plural।'), why: { 'Loads of': l('loads of is very informal.', 'loads of খুব informal।'), 'Tons of': l('tons of is informal exaggeration.', 'tons of informal বাড়াবাড়ি।') } }),
        choice('vc-4-p4', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Speaking Part 1: which answer sounds natural?', 'Speaking Part 1: কোন উত্তর স্বাভাবিক শোনায়?'), sentence: 'Examiner: "Do you like your neighbourhood?"', options: ['Yeah, I really like it — it’s quiet and there’s a big park nearby.', 'Furthermore, I would contend that my locality is exceedingly tranquil.', 'Neighbourhood is good.'], answer: 'Yeah, I really like it — it’s quiet and there’s a big park nearby.', explanation: l('Speaking: natural, with a reason.', 'Speaking: স্বাভাবিক, কারণসহ।'), why: { 'Furthermore, I would contend that my locality is exceedingly tranquil.': l('Too formal for a friendly question; it sounds memorised.', 'বন্ধুসুলভ প্রশ্নে অতিরিক্ত formal; মুখস্থ শোনায়।'), 'Neighbourhood is good.': l('Too short, no article and no reason.', 'খুব ছোট, article নেই, কারণ নেই।') } }),
        choice('vc-4-p5', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Task 2: which sentence has a consistent formal register?', 'Task 2: কোন sentence-এ পুরোটা formal?'), options: ['Governments should invest in public transport to reduce traffic congestion.', 'Governments should put loads of money into buses to sort out traffic.', 'The government gotta spend more on buses and trains and stuff.'], answer: 'Governments should invest in public transport to reduce traffic congestion.', explanation: l('invest in, reduce, traffic congestion — neutral and precise.', 'invest in, reduce, traffic congestion — নিরপেক্ষ আর নির্দিষ্ট।'), why: { 'Governments should put loads of money into buses to sort out traffic.': l('loads of, put money into and sort out are informal.', 'loads of, put money into আর sort out informal।'), 'The government gotta spend more on buses and trains and stuff.': l('gotta and "and stuff" are slang.', 'gotta আর "and stuff" slang।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('vc-4-r1', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Write a formal word for "get" (one word).', '"get"-এর formal word লিখুন (একটা word)।'), sentence: 'Students can ___ a visa within four weeks.', accepted: ['obtain', 'receive'], explanation: l('get → obtain / receive.', 'get → obtain / receive।') }),
        gap('vc-4-r2', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Write a formal word for "really" (one word).', '"really"-এর formal word লিখুন (একটা word)।'), sentence: 'Clean water is ___ important for public health.', accepted: ['extremely', 'highly', 'vitally', 'very', 'particularly', 'especially'], explanation: l('really → extremely / highly.', 'really → extremely / highly।') }),
        spot('vc-4-r3', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('One word is too informal for Task 2. Tap it and fix it.', 'একটা word Task 2-এর জন্য খুব informal। Tap করে ঠিক করুন।'), sentence: 'Many kids today have mobile phones.', wrong: 'kids', accepted: ['children', 'young people', 'teenagers'], explanation: l('Task 2 → children.', 'Task 2 → children।') }),
        correct('vc-4-r4', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Task 1: rewrite in a formal register.', 'Task 1: formal register-এ আবার লিখুন।'), sentence: 'Sales went up a lot in 2021.', accepted: ['Sales increased considerably in 2021.', 'Sales increased significantly in 2021.', 'Sales rose significantly in 2021.', 'Sales rose considerably in 2021.', 'Sales increased substantially in 2021.', 'Sales rose substantially in 2021.', 'Sales increased sharply in 2021.', 'Sales rose sharply in 2021.', 'Sales increased dramatically in 2021.', 'Sales rose dramatically in 2021.'], explanation: l('went up a lot → increased considerably.', 'went up a lot → increased considerably।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('vc-4-c1', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Which word is fine in Speaking but NOT in a Task 2 essay?', 'কোন word Speaking-এ ঠিক, কিন্তু Task 2 essay-তে না?'), options: ['stuff', 'issue', 'aspect'], answer: 'stuff', explanation: l('stuff is informal; issue / aspect are neutral.', 'stuff informal; issue / aspect নিরপেক্ষ।') }),
        spot('vc-4-c2', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('One word breaks the formal tone. Tap it, then fix it.', 'একটা word formal সুর ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Pollution is a massive problem in big cities.', wrong: 'massive', accepted: ['major', 'serious', 'significant', 'huge'], fixOptions: ['major', 'massively', 'mega'], explanation: l('a major / serious problem.', 'a major / serious problem।') }),
        order('vc-4-c3', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Build the formal sentence.', 'Formal sentence-টা সাজান।'), answer: 'A large number of students obtain part-time jobs.', explanation: l('a large number of · obtain.', 'a large number of · obtain।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: two registers', 'এবার আপনার পালা: দুই register'),
      exercises: [
        write('vc-4-y1', 'voc-register', {
          ...P,
          prompt: l('Write 2 formal sentences for Task 2 about why young people move to cities, then 1 informal sentence you might say in Speaking about the same idea.', 'তরুণরা কেন শহরে যায় — এ নিয়ে Task 2-এর জন্য ২টা formal sentence লিখুন, তারপর একই idea নিয়ে Speaking-এ বলার মতো ১টা informal sentence।'),
          model: 'A large number of young people move to cities in order to obtain better-paid jobs. Urban areas also offer access to higher education. (Speaking:) Yeah, most of my friends moved to Dhaka because there are just more jobs there.',
          checklist: [l('formal: children, many, obtain, increase, extremely', 'formal: children, many, obtain, increase, extremely'), l('no slang, no "stuff", no "a lot" in the essay', 'essay-তে slang, "stuff", "a lot" না'), l('the Speaking sentence sounds natural, not memorised', 'Speaking sentence স্বাভাবিক, মুখস্থ না')],
          explanation: l('Match the words to the task.', 'Task অনুযায়ী word।'),
          task: 'The student writes 2 formal Task 2 sentences about why young people move to cities and 1 informal Speaking sentence. Check only register: in the formal sentences flag informal words (kids, guys, stuff, things, a lot of / lots of / loads of, get, go up, really, so, pretty, big, gonna, gotta, etc.) and suggest formal equivalents (children, many / a large number of, obtain, increase, extremely, major); in the Speaking sentence flag overly formal, memorised-sounding phrases. Do not correct grammar unless it blocks the meaning. For each issue quote the words and give the fix.',
          target: l('Formal and informal register', 'Formal আর informal register'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Task 2 / Academic Task 1: children, many, obtain, increase, extremely, significant.', 'Task 2 / Academic Task 1: children, many, obtain, increase, extremely, significant।'),
        l('Speaking: natural words (a lot of, really, get) are fine; avoid memorised formal phrases.', 'Speaking: স্বাভাবিক word (a lot of, really, get) ঠিক; মুখস্থ formal phrase এড়ান।'),
        l('Never in writing: gonna, gotta, stuff, u, bcz.', 'লেখায় কখনো না: gonna, gotta, stuff, u, bcz।'),
      ],
    },
  ],
};

// ======================================================================= vc-5
export const vcPrecise: Lesson = {
  id: 'vc-5',
  format: 'v2',
  concept: 'voc-precise',
  title: l('Precise words instead of general ones', 'সাধারণ word-এর বদলে নির্দিষ্ট word'),
  why: l('"Good", "bad", "thing" and "very" say little. Examiners look for "less common vocabulary used with precision": beneficial, harmful, factor, crucial. One precise word often replaces two general ones.', '"Good", "bad", "thing" আর "very" কম কথা বলে। Examiner খোঁজেন "less common vocabulary used with precision": beneficial, harmful, factor, crucial। একটা নির্দিষ্ট word প্রায়ই দুটো সাধারণ word-এর কাজ করে।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 2 body sentence', 'একটা Task 2 body sentence'),
      situation: l('"Technology is a very good thing for education, but it also has some bad things for children."', '"Technology is a very good thing for education, but it also has some bad things for children."'),
      question: l('Which words should be more precise?', 'কোন word-গুলো আরও নির্দিষ্ট হওয়া উচিত?'),
      options: ['very good thing, bad things', 'Technology and education', 'None'],
      answer: 'very good thing, bad things',
      diagnose: {
        'very good thing, bad things': l('Right: "Technology is highly beneficial for education, but it also has several drawbacks for children."', 'ঠিক: "Technology is highly beneficial for education, but it also has several drawbacks for children."'),
        'Technology and education': l('Those are already precise topic words. The vague ones are "very good thing" and "bad things".', 'ওগুলো আগেই নির্দিষ্ট topic word। অস্পষ্ট হলো "very good thing" আর "bad things"।'),
        None: l('"good thing" and "bad things" could mean almost anything. Say what kind of good or bad: beneficial, drawbacks.', '"good thing" আর "bad things" প্রায় যেকোনো কিছু বোঝাতে পারে। কী রকম ভালো বা খারাপ বলুন: beneficial, drawbacks।'),
      },
    },
    {
      kind: 'discover',
      title: l('General → precise', 'সাধারণ → নির্দিষ্ট'),
      items: [
        { en: 'good → beneficial, effective, valuable, positive', note: l('what kind of good?', 'কী রকম ভালো?') },
        { en: 'bad → harmful, damaging, negative, a drawback', note: l('what kind of bad?', 'কী রকম খারাপ?') },
        { en: 'thing → factor, issue, aspect, advantage, problem, device', note: l('which thing?', 'কোন জিনিস?') },
        { en: 'very important → crucial · very big → enormous · very bad → severe', note: l('one strong word instead of very + weak word', 'very + দুর্বল word-এর বদলে একটা জোরালো word') },
      ],
      question: l('Why is "crucial" better than "very important" in an essay?', 'Essay-তে "very important"-এর চেয়ে "crucial" কেন ভালো?'),
      options: [
        l('It is one precise word that shows range', 'এটা একটা নির্দিষ্ট word, যা range দেখায়'),
        l('It is longer', 'এটা লম্বা'),
        l('"very important" is a grammar error', '"very important" grammar-এর ভুল'),
      ],
      answer: 0,
      pattern: l('Ask "what kind?" or "which?" about every general word, then choose the precise word. Replace very + weak adjective with one strong adjective.', 'প্রতিটা সাধারণ word নিয়ে জিজ্ঞেস করুন "কী রকম?" বা "কোনটা?", তারপর নির্দিষ্ট word বাছুন। very + দুর্বল adjective-এর বদলে একটা জোরালো adjective।'),
    },
    {
      kind: 'concept',
      title: l('Precise vocabulary for IELTS', 'IELTS-এর জন্য নির্দিষ্ট vocabulary'),
      body: l(
        'Precise does not mean rare. It means the word that says exactly what you mean — and that you can use correctly.',
        'নির্দিষ্ট মানে কঠিন না। মানে যে word ঠিক আপনার কথাটা বলে — আর যেটা আপনি ঠিকভাবে ব্যবহার করতে পারেন।',
      ),
      points: [
        l('Replace general adjectives: good → beneficial / effective; bad → harmful / severe; big → significant / substantial; nice → pleasant.', 'সাধারণ adjective বদলান: good → beneficial / effective; bad → harmful / severe; big → significant / substantial; nice → pleasant।'),
        l('Replace general nouns: thing → factor, aspect, issue, feature, benefit, drawback; people → residents, employees, consumers, citizens (who exactly?).', 'সাধারণ noun বদলান: thing → factor, aspect, issue, feature, benefit, drawback; people → residents, employees, consumers, citizens (ঠিক কারা?)।'),
        l('Strong adjectives do not take very: crucial, essential, enormous, severe, vital (not "very crucial"). Use absolutely or simply leave them alone.', 'জোরালো adjective-এর সাথে very বসে না: crucial, essential, enormous, severe, vital ("very crucial" না)। absolutely ব্যবহার করুন, বা একাই রাখুন।'),
        l('Topic words: education (curriculum, tuition), environment (emissions, renewable), health (obesity, diet), work (employee, salary), technology (device, online platform).', 'Topic word: education (curriculum, tuition), environment (emissions, renewable), health (obesity, diet), work (employee, salary), technology (device, online platform)।'),
        l('Why Bangla speakers slip: ভালো, খারাপ and জিনিস cover a huge range in Bangla, so good / bad / thing feel complete. English expects you to name the exact quality or item.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় ভালো, খারাপ আর জিনিস অনেক কিছু বোঝায়, তাই good / bad / thing সম্পূর্ণ মনে হয়। English-এ নির্দিষ্ট গুণ বা জিনিসের নাম আশা করা হয়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'Regular exercise is beneficial for mental health.', note: l('good → beneficial', 'good → beneficial') },
        { en: 'Cost is a crucial factor for most students.', note: l('very important thing → crucial factor', 'very important thing → crucial factor') },
        { en: 'The flood caused severe damage.', note: l('very bad → severe', 'very bad → severe') },
        { en: 'Local residents complained about the noise.', note: l('people → residents', 'people → residents') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Online learning has several drawbacks, such as limited interaction.', note: l('Task 2: "drawbacks" instead of "bad things".', 'Task 2: "bad things"-এর বদলে "drawbacks"।') },
        { skill: 'speaking', example: 'The best feature of my phone is the camera.', note: l('Speaking Part 2: "feature" instead of "thing".', 'Speaking Part 2: "thing"-এর বদলে "feature"।') },
        { skill: 'reading', example: 'Question: "a harmful effect" — text: "a damaging impact".', note: l('Reading: precise words are paraphrased with other precise words.', 'Reading: নির্দিষ্ট word অন্য নির্দিষ্ট word দিয়ে paraphrase হয়।') },
        { skill: 'listening', example: 'The main factor was the cost of fuel.', note: l('Listening: "factor", "aspect" and "feature" signal the key information.', 'Listening: "factor", "aspect" আর "feature" মূল তথ্যের সংকেত দেয়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Smoking is very bad for health.', right: 'Smoking is extremely harmful to health.', why: l('bad → harmful (to).', 'bad → harmful (to)।') },
        { wrong: 'This is a very crucial issue.', right: 'This is a crucial issue.', why: l('No very with strong adjectives.', 'জোরালো adjective-এর সাথে very না।') },
        { wrong: 'There are many things that cause stress.', right: 'Several factors cause stress.', why: l('things → factors.', 'things → factors।') },
        { wrong: 'Public transport is a good thing for the city.', right: 'Public transport benefits the city.', why: l('good thing → benefits.', 'good thing → benefits।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('vc-5-p1', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Choose the precise word for "bad".', '"bad"-এর জন্য নির্দিষ্ট word বেছে নিন।'), sentence: 'Air pollution is ___ to children’s lungs.', options: ['harmful', 'bad', 'not nice'], answer: 'harmful', explanation: l('harmful to.', 'harmful to।'), why: { bad: l('bad is general; say what kind of bad: harmful.', 'bad সাধারণ; কী রকম খারাপ বলুন: harmful।'), 'not nice': l('not nice is informal and vague.', 'not nice informal আর অস্পষ্ট।') } }),
        choice('vc-5-p2', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Replace "thing" with a precise noun.', '"thing"-এর বদলে নির্দিষ্ট noun দিন।'), sentence: 'Cost is the most important ___ when students choose a university.', options: ['factor', 'thing', 'stuff'], answer: 'factor', explanation: l('a factor = one thing that influences a decision.', 'factor = সিদ্ধান্তে প্রভাব রাখে এমন একটা বিষয়।'), why: { thing: l('thing is general; factor says it influences the choice.', 'thing সাধারণ; factor বলে এটা পছন্দে প্রভাব রাখে।'), stuff: l('stuff is informal and uncountable.', 'stuff informal আর uncountable।') } }),
        choice('vc-5-p3', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Which is correct?', 'কোনটা ঠিক?'), options: ['Clean water is essential for health.', 'Clean water is very essential for health.', 'Clean water is very much essential thing for health.'], answer: 'Clean water is essential for health.', explanation: l('Strong adjectives stand alone.', 'জোরালো adjective একাই বসে।'), why: { 'Clean water is very essential for health.': l('essential already means absolutely necessary; no very.', 'essential মানেই একেবারে দরকারি; very না।'), 'Clean water is very much essential thing for health.': l('No very much, and "thing" adds nothing.', 'very much না, আর "thing" কিছু যোগ করে না।') } }),
        choice('vc-5-p4', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Replace "people" with the precise group.', '"people"-এর বদলে নির্দিষ্ট দল দিন।'), sentence: 'The new factory will create 500 jobs for local ___.', options: ['residents', 'people', 'persons'], answer: 'residents', explanation: l('people who live in an area = residents.', 'এলাকায় যাঁরা থাকেন = residents।'), why: { people: l('people is fine but general; residents says who.', 'people ঠিক কিন্তু সাধারণ; residents বলে ঠিক কারা।'), persons: l('persons is used in legal notices, not in essays.', 'persons আইনি notice-এ ব্যবহার হয়, essay-তে না।') } }),
        choice('vc-5-p5', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Task 2: which sentence is the most precise?', 'Task 2: কোন sentence সবচেয়ে নির্দিষ্ট?'), options: ['Working from home reduces commuting time but can lead to isolation.', 'Working from home is a good thing but also a bad thing.', 'Working from home has many good and bad things for people.'], answer: 'Working from home reduces commuting time but can lead to isolation.', explanation: l('It names the exact benefit and drawback.', 'এটা ঠিক সুবিধা আর অসুবিধার নাম দেয়।'), why: { 'Working from home is a good thing but also a bad thing.': l('Say which good and which bad: commuting time, isolation.', 'কোন ভালো আর কোন খারাপ বলুন: commuting time, isolation।'), 'Working from home has many good and bad things for people.': l('"good and bad things" says nothing specific.', '"good and bad things" নির্দিষ্ট কিছু বলে না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('vc-5-r1', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Write one strong adjective for "very important".', '"very important"-এর জন্য একটা জোরালো adjective লিখুন।'), sentence: 'Sleep is ___ for students before an exam.', accepted: ['crucial', 'essential', 'vital'], explanation: l('crucial / essential / vital.', 'crucial / essential / vital।') }),
        gap('vc-5-r2', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Write a precise noun for "bad thing" (one word).', '"bad thing"-এর জন্য একটা নির্দিষ্ট noun লিখুন (একটা word)।'), sentence: 'The main ___ of city life is the noise.', accepted: ['drawback', 'disadvantage', 'problem', 'downside'], explanation: l('drawback / disadvantage.', 'drawback / disadvantage।') }),
        spot('vc-5-r3', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('One word is too general. Tap it and fix it.', 'একটা word খুব সাধারণ। Tap করে ঠিক করুন।'), sentence: 'The storm caused bad damage to crops.', wrong: 'bad', accepted: ['severe', 'serious', 'extensive', 'significant', 'heavy'], explanation: l('severe / serious damage.', 'severe / serious damage।') }),
        correct('vc-5-r4', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Remove the unnecessary word.', 'অপ্রয়োজনীয় word-টা মুছুন।'), sentence: 'Education is a very vital part of development.', accepted: ['Education is a vital part of development.'], explanation: l('vital already means very important.', 'vital মানেই খুব গুরুত্বপূর্ণ।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('vc-5-c1', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Which adjective should NOT follow "very"?', 'কোন adjective-এর আগে "very" বসা উচিত না?'), options: ['enormous', 'large', 'useful'], answer: 'enormous', explanation: l('enormous already means very large.', 'enormous মানেই খুব বড়।') }),
        spot('vc-5-c2', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('One word is vague. Tap it, then fix it.', 'একটা word অস্পষ্ট। Tap করে ঠিক করুন।'), sentence: 'Solar panels are a good way to reduce electricity bills.', wrong: 'good', accepted: ['effective', 'efficient', 'practical', 'useful'], fixOptions: ['effective', 'goodly', 'well'], explanation: l('an effective way.', 'an effective way।') }),
        order('vc-5-c3', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Cost is a crucial factor for most families.', explanation: l('crucial factor = very important thing.', 'crucial factor = very important thing।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: say exactly what you mean', 'এবার আপনার পালা: ঠিক কথাটা বলুন'),
      exercises: [
        write('vc-5-y1', 'voc-precise', {
          ...P,
          prompt: l('Write 3 sentences about one advantage and one disadvantage of living in a big city. Do not use good, bad, thing or very.', 'বড় শহরে থাকার একটা সুবিধা আর একটা অসুবিধা নিয়ে ৩টা sentence লিখুন। good, bad, thing বা very ব্যবহার করবেন না।'),
          model: 'Living in a large city gives residents access to better healthcare and education. However, traffic congestion is a serious drawback. Long commutes can be exhausting for employees.',
          checklist: [l('precise adjectives: beneficial, harmful, serious, crucial', 'নির্দিষ্ট adjective: beneficial, harmful, serious, crucial'), l('precise nouns: factor, drawback, residents', 'নির্দিষ্ট noun: factor, drawback, residents'), l('no very before strong adjectives', 'জোরালো adjective-এর আগে very না')],
          explanation: l('Name the exact quality or item.', 'ঠিক গুণ বা জিনিসের নাম দিন।'),
          task: 'The student writes 3 sentences about an advantage and a disadvantage of city life without good, bad, thing or very. Check only lexical precision: flag vague words (good, bad, nice, thing, stuff, big, people when a precise group is meant) and suggest precise ones (beneficial, harmful, serious, factor, drawback, significant, residents, commuters); flag very/really before strong adjectives (very crucial, very essential, very enormous); and flag precise words used with the wrong meaning. For each issue quote the words and give the fix.',
          target: l('Precise vocabulary', 'নির্দিষ্ট vocabulary'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('good → beneficial, effective · bad → harmful, severe · thing → factor, aspect, drawback.', 'good → beneficial, effective · bad → harmful, severe · thing → factor, aspect, drawback।'),
        l('very important → crucial · very big → enormous — and no very before strong adjectives.', 'very important → crucial · very big → enormous — আর জোরালো adjective-এর আগে very না।'),
        l('Say who exactly: residents, employees, consumers.', 'ঠিক কারা বলুন: residents, employees, consumers।'),
      ],
    },
  ],
};

// ======================================================================= vc-6
export const vcUseWords: Lesson = {
  id: 'vc-6',
  format: 'v2',
  concept: 'voc-use',
  title: l('Using new words accurately', 'নতুন word নির্ভুলভাবে ব্যবহার'),
  why: l('A rare word used wrongly costs more than a simple word used well. Before you use a new word in the exam, check its form, its exact meaning and its tone.', 'ভুলভাবে ব্যবহার করা কঠিন word, ঠিকভাবে ব্যবহার করা সহজ word-এর চেয়ে বেশি নম্বর কাটে। Exam-এ নতুন word ব্যবহারের আগে তার form, হুবহু অর্থ আর সুর যাচাই করুন।'),
  minutes: 12,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('Trying a new word', 'নতুন word চেষ্টা'),
      situation: l('You learned "consequence" and write: "A positive consequence of the new park is that children can play safely."', 'আপনি "consequence" শিখে লিখলেন: "A positive consequence of the new park is that children can play safely."'),
      question: l('Is "consequence" the best word here?', 'এখানে "consequence" কি সবচেয়ে ভালো word?'),
      options: ['Not really — it usually suggests a bad result; "benefit" fits better', 'Yes — it is a rare word, so it scores higher', 'No — consequence is a verb'],
      answer: 'Not really — it usually suggests a bad result; "benefit" fits better',
      diagnose: {
        'Not really — it usually suggests a bad result; "benefit" fits better': l('Right. "consequence" is often negative (serious consequences). For a good result: "A major benefit of the new park is …".', 'ঠিক। "consequence" প্রায়ই নেতিবাচক (serious consequences)। ভালো ফলের জন্য: "A major benefit of the new park is …"।'),
        'Yes — it is a rare word, so it scores higher': l('Rare words only help when the meaning and tone fit. Here the tone clashes with "positive".', 'অর্থ আর সুর মিললে তবেই কঠিন word নম্বর বাড়ায়। এখানে সুর "positive"-এর সাথে মেলে না।'),
        'No — consequence is a verb': l('consequence is a noun. The issue is its usual negative tone.', 'consequence noun। সমস্যা হলো এর সাধারণ নেতিবাচক সুর।'),
      },
    },
    {
      kind: 'discover',
      title: l('Three checks before using a word', 'Word ব্যবহারের আগে তিনটা যাচাই'),
      items: [
        { en: 'Form: The economy is growing. · economic growth · an economical car', note: l('noun, adjective, and a different adjective', 'noun, adjective, আর আলাদা একটা adjective') },
        { en: 'Meaning: affect (verb) the result · the effect (noun) on the result', note: l('two similar words, two jobs', 'দুটো কাছাকাছি word, দুটো কাজ') },
        { en: 'Tone: consequences (often bad) · benefits (good) · notorious (famous for bad things)', note: l('the feeling a word carries', 'word-এর মধ্যে থাকা অনুভূতি') },
        { en: 'Example check: search for the word in a sentence from a reliable source before using it', note: l('see it used before you use it', 'ব্যবহারের আগে ব্যবহার দেখুন') },
      ],
      question: l('Which question checks the TONE of a word?', 'কোন প্রশ্ন word-এর সুর যাচাই করে?'),
      options: [
        l('Is it positive, negative or neutral?', 'এটা ইতিবাচক, নেতিবাচক না নিরপেক্ষ?'),
        l('How many letters does it have?', 'কয়টা অক্ষর?'),
        l('Is it a noun?', 'এটা কি noun?'),
      ],
      answer: 0,
      pattern: l('Before using a new word: 1) Is the form right for this position? 2) Does the meaning fit exactly? 3) Does the tone match what I mean?', 'নতুন word ব্যবহারের আগে: ১) এই জায়গায় form ঠিক? ২) অর্থ হুবহু মেলে? ৩) সুর আমার কথার সাথে মেলে?'),
    },
    {
      kind: 'concept',
      title: l('Form, meaning and tone', 'Form, অর্থ আর সুর'),
      body: l(
        'Most errors with new words are not spelling errors. They are the wrong form, a near-miss in meaning, or the wrong feeling.',
        'নতুন word-এর বেশিরভাগ ভুল বানানের না। ভুল form, প্রায়-কাছাকাছি অর্থ, বা ভুল অনুভূতি।',
      ),
      points: [
        l('Form families: economy (n) / economic (adj, about the economy) / economical (adj, saving money); benefit (n / v) / beneficial (adj); significance (n) / significant (adj) / significantly (adv).', 'Form-এর পরিবার: economy (n) / economic (adj, অর্থনীতি-সংক্রান্ত) / economical (adj, সাশ্রয়ী); benefit (n / v) / beneficial (adj); significance (n) / significant (adj) / significantly (adv)।'),
        l('Near-miss pairs: affect (v) / effect (n); lose / loose; advice (n) / advise (v); economic / economical; sensible (wise) / sensitive (easily hurt).', 'প্রায়-কাছাকাছি জোড়া: affect (v) / effect (n); lose / loose; advice (n) / advise (v); economic / economical; sensible (বুদ্ধিমান) / sensitive (সহজে আঘাত পায়)।'),
        l('Tone: consequence, notorious and cause (problems) lean negative; benefit and renowned are positive; lead to can be either; neutral: result, effect, well known.', 'সুর: consequence, notorious, cause (problems) নেতিবাচকের দিকে; benefit, renowned ইতিবাচক; lead to দুটোই হতে পারে; নিরপেক্ষ: result, effect, well known।'),
        l('When unsure in the exam, use the word you know well. Lexical Resource rewards accuracy as much as range.', 'Exam-এ নিশ্চিত না হলে ভালো করে জানা word ব্যবহার করুন। Lexical Resource range-এর মতোই accuracy-তে নম্বর দেয়।'),
        l('Why Bangla speakers slip: a Bangla meaning (অর্থনৈতিক) matches both economic and economical, and ফলাফল matches result, effect and consequence — so the Bangla meaning hides the difference in form and tone.', 'বাংলাভাষীরা কেন ভুল করে: একটা বাংলা অর্থ (অর্থনৈতিক) economic আর economical দুটোর সাথেই মেলে, আর ফলাফল মেলে result, effect আর consequence-এর সাথে — তাই বাংলা অর্থ form আর সুরের পার্থক্য লুকিয়ে ফেলে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'The country’s economic growth slowed in 2020.', note: l('economic = about the economy', 'economic = অর্থনীতি-সংক্রান্ত') },
        { en: 'A bicycle is an economical way to travel.', note: l('economical = saves money', 'economical = সাশ্রয়ী') },
        { en: 'Stress can affect sleep. Stress has an effect on sleep.', note: l('affect (v) · effect (n)', 'affect (v) · effect (n)') },
        { en: 'Deforestation has serious consequences for wildlife.', note: l('consequences: negative tone fits', 'consequences: নেতিবাচক সুর মেলে') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Remote work can affect productivity in several ways.', note: l('Task 2: affect / effect is one of the most common word errors.', 'Task 2: affect / effect সবচেয়ে সাধারণ word-এর ভুলগুলোর একটা।') },
        { skill: 'speaking', example: 'My father gave me some sensible advice.', note: l('Speaking: sensible vs sensitive changes the meaning.', 'Speaking: sensible বনাম sensitive অর্থ বদলে দেয়।') },
        { skill: 'reading', example: 'The region is notorious for flooding.', note: l('Reading: tone words show the writer’s attitude.', 'Reading: সুরের word লেখকের মনোভাব দেখায়।') },
        { skill: 'listening', example: 'The effect on local businesses was significant.', note: l('Listening gap: write the noun effect after "the".', 'Listening gap: "the"-এর পরে noun effect লিখুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Pollution effects our health.', right: 'Pollution affects our health.', why: l('verb → affect.', 'verb → affect।') },
        { wrong: 'Bangladesh has strong economical growth.', right: 'Bangladesh has strong economic growth.', why: l('about the economy → economic.', 'অর্থনীতি-সংক্রান্ত → economic।') },
        { wrong: 'The festival had many good consequences.', right: 'The festival had many benefits.', why: l('consequences sounds negative.', 'consequences নেতিবাচক শোনায়।') },
        { wrong: 'She is a very sensitive student; she always plans ahead.', right: 'She is a very sensible student; she always plans ahead.', why: l('sensible = wise.', 'sensible = বুদ্ধিমান।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('vc-6-p1', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'Lack of sleep can ___ your concentration.', options: ['affect', 'effect', 'effective'], answer: 'affect', explanation: l('A verb is needed → affect.', 'Verb লাগবে → affect।'), why: { effect: l('effect is usually a noun: an effect on.', 'effect সাধারণত noun: an effect on।'), effective: l('effective is an adjective; after can you need a verb.', 'effective adjective; can-এর পরে verb লাগে।') } }),
        choice('vc-6-p2', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'The government announced new ___ policies to reduce inflation.', options: ['economic', 'economical', 'economy'], answer: 'economic', explanation: l('about the economy → economic.', 'অর্থনীতি-সংক্রান্ত → economic।'), why: { economical: l('economical means saving money (an economical car).', 'economical মানে সাশ্রয়ী (an economical car)।'), economy: l('Before a noun you need the adjective.', 'Noun-এর আগে adjective লাগে।') } }),
        choice('vc-6-p3', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Which word has the right tone?', 'কোন word-এর সুর ঠিক?'), sentence: 'One major ___ of the new metro is shorter journey times.', options: ['benefit', 'consequence', 'damage'], answer: 'benefit', explanation: l('A good result → benefit.', 'ভালো ফল → benefit।'), why: { consequence: l('consequence usually suggests a bad result.', 'consequence সাধারণত খারাপ ফল বোঝায়।'), damage: l('damage is negative; shorter journeys are positive.', 'damage নেতিবাচক; ছোট যাত্রা ইতিবাচক।') } }),
        choice('vc-6-p4', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'The number of tourists rose ___ after 2015.', options: ['significantly', 'significant', 'significance'], answer: 'significantly', explanation: l('After a verb → adverb.', 'Verb-এর পরে → adverb।'), why: { significant: l('An adjective describes a noun; rose needs an adverb.', 'Adjective noun বর্ণনা করে; rose-এর পরে adverb লাগে।'), significance: l('significance is a noun.', 'significance noun।') } }),
        choice('vc-6-p5', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Task 2: which sentence uses every word accurately?', 'Task 2: কোন sentence-এ সব word নির্ভুল?'), options: ['Social media can have a negative effect on teenagers’ sleep.', 'Social media can have a negative affect on teenagers’ sleep.', 'Social media can effect teenagers’ sleep negativity.'], answer: 'Social media can have a negative effect on teenagers’ sleep.', explanation: l('have an effect on (noun).', 'have an effect on (noun)।'), why: { 'Social media can have a negative affect on teenagers’ sleep.': l('After "a negative" you need the noun effect.', '"a negative"-এর পরে noun effect লাগে।'), 'Social media can effect teenagers’ sleep negativity.': l('The verb is affect, and negativity is a noun (use negatively).', 'Verb হলো affect, আর negativity noun (negatively লিখুন)।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('vc-6-r1', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Write affect or effect.', 'affect বা effect লিখুন।'), sentence: 'Noise has a strong ___ on concentration.', accepted: ['effect'], explanation: l('a strong effect on (noun).', 'a strong effect on (noun)।') }),
        gap('vc-6-r2', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Write the adjective of "benefit" (one word).', '"benefit"-এর adjective লিখুন (একটা word)।'), sentence: 'Walking to school is ___ for children’s health.', base: 'benefit', accepted: ['beneficial'], explanation: l('benefit → beneficial.', 'benefit → beneficial।') }),
        spot('vc-6-r3', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('One word has the wrong form. Tap it and fix it.', 'একটা word-এর form ভুল। Tap করে ঠিক করুন।'), sentence: 'Rising prices will effect poor families the most.', wrong: 'effect', accepted: ['affect', 'hurt', 'hit'], explanation: l('verb → affect.', 'verb → affect।') }),
        correct('vc-6-r4', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Fix the word with the wrong meaning.', 'ভুল অর্থের word-টা ঠিক করুন।'), sentence: 'A small car is more economic than a large one.', accepted: ['A small car is more economical than a large one.'], explanation: l('saving money → economical.', 'সাশ্রয়ী → economical।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('vc-6-c1', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Which word is usually NEGATIVE?', 'কোন word সাধারণত নেতিবাচক?'), options: ['notorious', 'renowned', 'well known'], answer: 'notorious', explanation: l('notorious = famous for something bad.', 'notorious = খারাপ কিছুর জন্য বিখ্যাত।') }),
        spot('vc-6-c2', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('One word has the wrong meaning. Tap it, then fix it.', 'একটা word-এর অর্থ ভুল। Tap করে ঠিক করুন।'), sentence: 'It was sensitive of you to save money for the course.', wrong: 'sensitive', accepted: ['sensible', 'wise', 'smart'], fixOptions: ['sensible', 'sensibility', 'sense'], explanation: l('sensible = wise.', 'sensible = বুদ্ধিমান।') }),
        order('vc-6-c3', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Deforestation has serious consequences for wildlife.', explanation: l('consequences: a negative result.', 'consequences: নেতিবাচক ফল।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: two new words', 'এবার আপনার পালা: দুটো নতুন word'),
      exercises: [
        write('vc-6-y1', 'voc-use', {
          ...P,
          prompt: l('Task 2: write 3 sentences about the effects of tourism on a place you know. Use effect or affect, and one of: benefit, consequence, economic, significant.', 'Task 2: আপনার চেনা একটা জায়গায় tourism-এর প্রভাব নিয়ে ৩টা sentence লিখুন। effect বা affect, আর এগুলোর একটা ব্যবহার করুন: benefit, consequence, economic, significant।'),
          model: 'Tourism has had a significant effect on Cox’s Bazar. The main benefit is economic: hotels and restaurants employ thousands of local people. However, rapid construction has had serious consequences for the beach.',
          checklist: [l('the right form (effect n / affect v; economic / economical)', 'ঠিক form (effect n / affect v; economic / economical)'), l('the exact meaning', 'হুবহু অর্থ'), l('the right tone (consequences for bad results)', 'ঠিক সুর (খারাপ ফলে consequences)')],
          explanation: l('Form, meaning, tone.', 'Form, অর্থ, সুর।'),
          task: 'The student writes 3 sentences about the effects of tourism using effect/affect and one of benefit, consequence, economic, significant. Check only accurate word use: form (affect verb / effect noun; economic vs economical; benefit vs beneficial; significant vs significantly), near-miss meanings (sensible/sensitive, lose/loose, advice/advise), and tone (consequence and notorious for negative results, benefit for positive ones). Praise ambitious words that are used correctly. For each issue quote the words and give the fix.',
          target: l('Accurate word use', 'নির্ভুল word ব্যবহার'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('affect (verb) · effect (noun) · economic (about the economy) · economical (saves money).', 'affect (verb) · effect (noun) · economic (অর্থনীতি-সংক্রান্ত) · economical (সাশ্রয়ী)।'),
        l('Tone: consequences and notorious lean negative; benefit and renowned are positive.', 'সুর: consequences আর notorious নেতিবাচক; benefit আর renowned ইতিবাচক।'),
        l('Unsure? Use the word you know well — accuracy counts.', 'নিশ্চিত না? ভালো করে জানা word ব্যবহার করুন — accuracy গোনা হয়।'),
      ],
    },
  ],
};

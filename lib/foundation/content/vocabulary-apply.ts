import type { Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Vocabulary Foundation, application lessons in the v2 format: vc-7 the
 * vocabulary habits Bangla speakers bring (all six skills mixed), vc-8 using
 * vocabulary in IELTS Writing and Speaking with no hints, and vc-9 the module
 * review test. No lesson concept of their own: every question keeps the
 * concept it tests. Original Mino content.
 */
const P = { tag: 'vocabulary' as const };

// ======================================================================= vc-7
export const vcHabits: Lesson = {
  id: 'vc-7',
  format: 'v2',
  title: l('Vocabulary habits Bangla speakers bring', 'বাংলাভাষীরা vocabulary-র যে অভ্যাসগুলো নিয়ে আসেন'),
  why: l('Word lists with one Bangla meaning, dictionary synonyms and memorised "big words" cause most vocabulary errors. Mixed practice trains you to check every new word the same way.', 'একটা বাংলা অর্থওয়ালা word-এর তালিকা, dictionary-র synonym আর মুখস্থ "কঠিন word" — বেশিরভাগ vocabulary ভুল এগুলো থেকেই। মিশ্র practice প্রতিটা নতুন word একইভাবে যাচাই করতে শেখায়।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A student’s paragraph', 'একজন শিক্ষার্থীর paragraph'),
      situation: l('"Nowadays kids are very addicted to phones. This thing effects their study badly and has many bad consequences."', '"Nowadays kids are very addicted to phones. This thing effects their study badly and has many bad consequences."'),
      question: l('Which vocabulary problems do you see?', 'কী কী vocabulary সমস্যা দেখছেন?'),
      options: ['Informal kids, vague thing, effects → affects, and a repeated negative idea', 'Only a spelling mistake', 'None — the words are advanced'],
      answer: 'Informal kids, vague thing, effects → affects, and a repeated negative idea',
      diagnose: {
        'Informal kids, vague thing, effects → affects, and a repeated negative idea': l('Right: "Many children are now heavily dependent on their phones. This habit affects their studies and has serious consequences."', 'ঠিক: "Many children are now heavily dependent on their phones. This habit affects their studies and has serious consequences."'),
        'Only a spelling mistake': l('"effects" is a form error (affects), and kids, thing and "bad consequences" are register and precision problems.', '"effects" form-এর ভুল (affects), আর kids, thing, "bad consequences" register আর precision-এর সমস্যা।'),
        'None — the words are advanced': l('Advanced words still need the right form, tone and register.', 'কঠিন word-এরও ঠিক form, সুর আর register লাগে।'),
      },
    },
    {
      kind: 'discover',
      title: l('Name the habit', 'অভ্যাসটার নাম দিন'),
      items: [
        { en: 'access of → access to', note: l('pattern not learned (vc-1)', 'pattern শেখা হয়নি (vc-1)') },
        { en: 'stopping at every unknown word', note: l('no context guessing (vc-2)', 'context থেকে আন্দাজ নেই (vc-2)') },
        { en: 'a strange language → a foreign language', note: l('wrong dictionary synonym (vc-3)', 'ভুল dictionary synonym (vc-3)') },
        { en: 'kids, stuff, a lot → children, issues, many', note: l('wrong register (vc-4)', 'ভুল register (vc-4)') },
        { en: 'a good thing → a benefit', note: l('vague word (vc-5)', 'অস্পষ্ট word (vc-5)') },
        { en: 'effects our health → affects', note: l('wrong form or tone (vc-6)', 'ভুল form বা সুর (vc-6)') },
      ],
      question: l('What do most of these habits have in common?', 'এই অভ্যাসগুলোর বেশিরভাগের মিল কোথায়?'),
      options: [
        l('The word was learned as a Bangla meaning only, not as English in use', 'Word শুধু বাংলা অর্থ হিসেবে শেখা হয়েছে, ব্যবহারের English হিসেবে না'),
        l('The words are too easy', 'Word-গুলো খুব সহজ'),
        l('English spelling is irregular', 'English বানান অনিয়মিত'),
      ],
      answer: 0,
      pattern: l('Learn and check words as English in use: pattern, synonym fit, register, precision, form and tone.', 'Word শিখুন আর যাচাই করুন ব্যবহারের English হিসেবে: pattern, synonym-এর মিল, register, precision, form আর সুর।'),
    },
    {
      kind: 'concept',
      title: l('Six checks for every new word', 'প্রতিটা নতুন word-এর জন্য ছয়টা যাচাই'),
      body: l(
        'Use these checks when you save a word to your Brain and when you proofread.',
        'Brain-এ word save করার সময় আর proofread করার সময় এই যাচাইগুলো করুন।',
      ),
      points: [
        l('1. Pattern: which word follows it? afford to, access to, benefit from, impact on.', '১. Pattern: পরে কোন word? afford to, access to, benefit from, impact on।'),
        l('2. Context: can I guess it from a definition, example, contrast or word parts?', '২. Context: সংজ্ঞা, উদাহরণ, বিপরীত বা word-এর অংশ থেকে আন্দাজ করা যায়?'),
        l('3. Synonym fit: same meaning, same strength, same grammar?', '৩. Synonym-এর মিল: একই অর্থ, একই জোর, একই grammar?'),
        l('4. Register: formal enough for Task 2, natural enough for Speaking?', '৪. Register: Task 2-এর জন্য যথেষ্ট formal, Speaking-এর জন্য যথেষ্ট স্বাভাবিক?'),
        l('5. Precision: does it say exactly what I mean (not good / bad / thing)?', '৫. Precision: ঠিক আমার কথাটা বলে (good / bad / thing না)?'),
        l('6. Form and tone: noun, verb or adjective? positive, negative or neutral?', '৬. Form আর সুর: noun, verb না adjective? ইতিবাচক, নেতিবাচক না নিরপেক্ষ?'),
      ],
    },
    {
      kind: 'examples',
      title: l('Before → after', 'আগে → পরে'),
      items: [
        { en: 'Villages have less access of doctors. → Villages have less access to doctors.', note: l('check 1', 'যাচাই ১') },
        { en: 'The chart describes that sales doubled. → The chart shows that sales doubled.', note: l('check 3', 'যাচাই ৩') },
        { en: 'Lots of guys work abroad. → Many people work abroad.', note: l('check 4', 'যাচাই ৪') },
        { en: 'Tourism is a very good thing. → Tourism is highly beneficial.', note: l('checks 5 and 6', 'যাচাই ৫ আর ৬') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Remote learning affects students’ motivation in several ways.', note: l('Task 2: form (affects) and precision (motivation).', 'Task 2: form (affects) আর precision (motivation)।') },
        { skill: 'speaking', example: 'Honestly, I spend way too much time on my phone.', note: l('Speaking: natural, informal words are right here.', 'Speaking: এখানে স্বাভাবিক, informal word-ই ঠিক।') },
        { skill: 'reading', example: 'Question: "a harmful habit" — text: "a damaging practice".', note: l('Reading: paraphrase and precise words together.', 'Reading: paraphrase আর নির্দিষ্ট word একসাথে।') },
        { skill: 'listening', example: 'The speaker says the plan is "economical" — it saves money.', note: l('Listening: form and meaning decide the answer.', 'Listening: form আর অর্থ উত্তর ঠিক করে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Kids can get benefit of sports.', right: 'Children can benefit from sport.', why: l('checks 4 and 1: children; benefit from.', 'যাচাই ৪ আর ১: children; benefit from।') },
        { wrong: 'This thing has a big affect on society.', right: 'This trend has a significant effect on society.', why: l('checks 5 and 6: trend; effect (noun).', 'যাচাই ৫ আর ৬: trend; effect (noun)।') },
        { wrong: 'People in the city are very much crowded.', right: 'The city is overcrowded.', why: l('checks 2 and 5: over- = too much.', 'যাচাই ২ আর ৫: over- = অতিরিক্ত।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: mixed habits', 'Practice: মিশ্র অভ্যাস'),
      exercises: [
        choice('vc-7-p1', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Choose the word that follows.', 'পরের word-টা বেছে নিন।'), sentence: 'The new bridge will have a positive impact ___ trade.', options: ['on', 'to', 'at'], answer: 'on', explanation: l('an impact on.', 'an impact on।'), why: { to: l('impact takes on, not to.', 'impact-এর পরে on, to না।'), at: l('at does not follow impact.', 'impact-এর পরে at বসে না।') } }),
        choice('vc-7-p2', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('What does "scarce" probably mean?', '"scarce"-এর সম্ভাব্য অর্থ কী?'), sentence: 'In summer, water becomes scarce, so families have to buy it from trucks.', options: ['hard to find', 'very cheap', 'very dirty'], answer: 'hard to find', explanation: l('Result clue: families have to buy it from trucks.', 'ফলের সংকেত: পরিবারকে truck থেকে কিনতে হয়।'), why: { 'very cheap': l('If water were cheap and easy, families would not need trucks.', 'পানি সস্তা আর সহজ হলে truck লাগত না।'), 'very dirty': l('Possible, but the clue is about not having enough.', 'হতে পারে, কিন্তু সংকেত যথেষ্ট না থাকা নিয়ে।') } }),
        choice('vc-7-p3', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Which verb can replace "decreased"?', '"decreased"-এর জায়গায় কোন verb বসবে?'), sentence: 'The price of rice decreased in 2022.', options: ['fell', 'reduced', 'lowered'], answer: 'fell', explanation: l('fell has no object, like decreased.', 'decreased-এর মতো fell-এর object নেই।'), why: { reduced: l('reduce needs an object (the government reduced prices).', 'reduce-এর object লাগে (the government reduced prices)।'), lowered: l('lower also needs an object.', 'lower-এরও object লাগে।') } }),
        choice('vc-7-p4', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Task 2: choose the formal phrase.', 'Task 2: formal phrase বেছে নিন।'), sentence: 'Governments should ___ the problem of unemployment.', options: ['address', 'sort out', 'fix up'], answer: 'address', explanation: l('address a problem = deal with it (formal).', 'address a problem = সমাধানে কাজ করা (formal)।'), why: { 'sort out': l('sort out is informal.', 'sort out informal।'), 'fix up': l('fix up means repair or arrange — informal.', 'fix up মানে মেরামত বা ব্যবস্থা — informal।') } }),
        choice('vc-7-p5', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Replace "things" with a precise noun.', '"things"-এর বদলে নির্দিষ্ট noun দিন।'), sentence: 'There are several ___ that cause traffic congestion.', options: ['factors', 'things', 'stuffs'], answer: 'factors', explanation: l('factors = causes that influence a result.', 'factors = ফলে প্রভাব রাখে এমন কারণ।'), why: { things: l('things is vague; factors names what they are.', 'things অস্পষ্ট; factors বলে এগুলো কী।'), stuffs: l('stuff is informal and has no plural.', 'stuff informal, আর এর plural নেই।') } }),
        choice('vc-7-p6', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'My teacher gave me some useful ___ about the interview.', options: ['advice', 'advise', 'advices'], answer: 'advice', explanation: l('advice (noun, uncountable) · advise (verb).', 'advice (noun, uncountable) · advise (verb)।'), why: { advise: l('advise is the verb; after "some useful" you need the noun.', 'advise verb; "some useful"-এর পরে noun লাগে।'), advices: l('advice has no plural.', 'advice-এর plural নেই।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('vc-7-r1', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Write the missing word.', 'বাদ পড়া word-টা লিখুন।'), sentence: 'Young people often cannot afford ___ buy a home.', accepted: ['to'], explanation: l('afford to + verb.', 'afford to + verb।') }),
        correct('vc-7-r2', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Task 2: rewrite formally.', 'Task 2: formal-ভাবে আবার লিখুন।'), sentence: 'Lots of people now shop online.', accepted: ['Many people now shop online.', 'A large number of people now shop online.', 'A great number of people now shop online.'], explanation: l('Lots of → Many / A large number of.', 'Lots of → Many / A large number of।') }),
        gap('vc-7-r3', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Write the adverb of "significant" (one word).', '"significant"-এর adverb লিখুন (একটা word)।'), sentence: 'Crime fell ___ after the new lights were installed.', base: 'significant', accepted: ['significantly'], explanation: l('After a verb → adverb.', 'Verb-এর পরে → adverb।') }),
        correct('vc-7-r4', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Replace the vague words with precise ones.', 'অস্পষ্ট word-গুলোর বদলে নির্দিষ্ট word দিন।'), sentence: 'Fast food is a bad thing for health.', accepted: ['Fast food is harmful to health.', 'Fast food is damaging to health.', 'Fast food is unhealthy.', 'Fast food is bad for health.'], explanation: l('bad thing → harmful to.', 'bad thing → harmful to।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        correct('vc-7-c1', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Fix the two form errors.', 'Form-এর দুটো ভুল ঠিক করুন।'), sentence: 'Exercise has a beneficial affect on economical growth.', accepted: ['Exercise has a beneficial effect on economic growth.'], explanation: l('effect (noun); economic (about the economy).', 'effect (noun); economic (অর্থনীতি-সংক্রান্ত)।') }),
        spot('vc-7-c2', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('One synonym does not fit. Tap it, then fix it.', 'একটা synonym মেলে না। Tap করে ঠিক করুন।'), sentence: 'The Padma is a famous factor in the economy of the region.', wrong: 'famous', accepted: ['major', 'key', 'crucial', 'significant', 'important'], fixOptions: ['major', 'fame', 'famously'], explanation: l('famous = well known; a major / key factor.', 'famous = সবার চেনা; a major / key factor।') }),
        order('vc-7-c3', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Many rural clinics are understaffed and underfunded.', explanation: l('under- = not enough.', 'under- = যথেষ্ট না।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: rewrite with better words', 'এবার আপনার পালা: ভালো word দিয়ে আবার লিখুন'),
      exercises: [
        write('vc-7-y1', 'voc-precise', {
          ...P,
          prompt: l('Rewrite this Task 2 sentence in 2–3 sentences with better vocabulary: "Nowadays kids use phones a lot and this thing is very bad for them."', 'এই Task 2 sentence-টা ভালো vocabulary দিয়ে ২–৩ sentence-এ আবার লিখুন: "Nowadays kids use phones a lot and this thing is very bad for them."'),
          model: 'Nowadays, many children spend several hours a day on their phones. This habit can be harmful to their sleep and concentration. It may also affect their social skills.',
          checklist: [l('formal register: children, many', 'formal register: children, many'), l('precise words: habit, harmful, concentration', 'নির্দিষ্ট word: habit, harmful, concentration'), l('correct form and pattern: harmful to, affect', 'ঠিক form আর pattern: harmful to, affect')],
          explanation: l('Run the six checks.', 'ছয়টা যাচাই চালান।'),
          task: 'The student rewrites "Nowadays kids use phones a lot and this thing is very bad for them." in 2–3 sentences. Check only vocabulary with the six checks: word patterns (harmful to, impact on, benefit from, access to), synonym fit, register (no kids, a lot, stuff, really in Task 2), precision (no good, bad, thing; no very before strong adjectives), form (affect/effect, economic/economical, advice/advise) and tone (consequences negative, benefits positive). For each issue quote the words, name the check and give the fix.',
          target: l('The six vocabulary checks', 'Vocabulary-র ছয়টা যাচাই'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Six checks: pattern · context · synonym fit · register · precision · form and tone.', 'ছয়টা যাচাই: pattern · context · synonym-এর মিল · register · precision · form আর সুর।'),
        l('Learn each word as English in use: save a full example to your Brain.', 'প্রতিটা word ব্যবহারের English হিসেবে শিখুন: Brain-এ পুরো উদাহরণ save করুন।'),
        l('A simple word used well beats a rare word used wrongly.', 'ভুলভাবে ব্যবহার করা কঠিন word-এর চেয়ে ঠিকভাবে ব্যবহার করা সহজ word ভালো।'),
      ],
    },
  ],
};

// ======================================================================= vc-8
export const vcInIelts: Lesson = {
  id: 'vc-8',
  format: 'v2',
  title: l('Vocabulary in IELTS Writing and Speaking', 'IELTS Writing আর Speaking-এ vocabulary'),
  why: l('Lexical Resource is a quarter of your Writing and Speaking score. Practise choosing and checking words in real Task 1, Task 2 and Speaking answers, with no hints.', 'Lexical Resource আপনার Writing আর Speaking score-এর এক-চতুর্থাংশ। আসল Task 1, Task 2 আর Speaking উত্তরে hint ছাড়া word বাছাই আর যাচাইয়ের practice করুন।'),
  minutes: 12,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 1 overview', 'একটা Task 1 overview'),
      situation: l('"Overall, the graph describes that the number of tourists went up a lot, while hotel prices raised a little."', '"Overall, the graph describes that the number of tourists went up a lot, while hotel prices raised a little."'),
      question: l('How many vocabulary changes are needed?', 'কয়টা vocabulary পরিবর্তন লাগবে?'),
      options: ['3', '1', '0'],
      answer: '3',
      diagnose: {
        '3': l('Right: shows (not describes that) · increased significantly (not went up a lot) · rose slightly (not raised a little).', 'ঠিক: shows (describes that না) · increased significantly (went up a lot না) · rose slightly (raised a little না)।'),
        '1': l('Look again: describes that → shows that; went up a lot → increased significantly; raised → rose slightly.', 'আবার দেখুন: describes that → shows that; went up a lot → increased significantly; raised → rose slightly।'),
        '0': l('Three words weaken this overview: describes, went up a lot and raised.', 'তিনটা word এই overview দুর্বল করে: describes, went up a lot আর raised।'),
      },
    },
    {
      kind: 'discover',
      title: l('What each part of IELTS needs', 'IELTS-এর কোন অংশে কী লাগে'),
      items: [
        { en: 'Task 1: show / illustrate · increase / rise / decline · significantly / slightly · the proportion of', note: l('data verbs and adverbs, formal', 'data-র verb আর adverb, formal') },
        { en: 'Task 2: factor, drawback, benefit, address, have an impact on, crucial', note: l('precise, formal, topic words', 'নির্দিষ্ট, formal, topic word') },
        { en: 'Speaking: natural words, idiomatic but not memorised: to be honest, I’m really into …', note: l('natural register', 'স্বাভাবিক register') },
        { en: 'All tasks: paraphrase the question; do not copy it', note: l('your own words', 'নিজের word') },
      ],
      question: l('Which word suits a Task 1 report?', 'Task 1 report-এ কোন word মানায়?'),
      options: [
        l('illustrates', 'illustrates'),
        l('shot up', 'shot up'),
        l('I think', 'I think'),
      ],
      answer: 0,
      pattern: l('Task 1 → formal data words, no opinions. Task 2 → precise, formal topic words. Speaking → natural, accurate words.', 'Task 1 → formal data word, মতামত না। Task 2 → নির্দিষ্ট, formal topic word। Speaking → স্বাভাবিক, নির্ভুল word।'),
    },
    {
      kind: 'concept',
      title: l('A vocabulary check for each task', 'প্রতিটা task-এর vocabulary যাচাই'),
      body: l(
        'Before you finish each task, spend one minute on these vocabulary checks.',
        'প্রতিটা task শেষ করার আগে এক মিনিট এই vocabulary যাচাইয়ে দিন।',
      ),
      points: [
        l('Task 1: did I paraphrase the question? Are my trend verbs right (rise / fall with no object) and formal (increase, not go up a lot)? Do my adverbs match the size (slightly, significantly, dramatically)?', 'Task 1: প্রশ্ন paraphrase করেছি? trend verb ঠিক (object ছাড়া rise / fall) আর formal (go up a lot না, increase)? adverb আকারের সাথে মেলে (slightly, significantly, dramatically)?'),
        l('Task 2: did I replace good / bad / thing with precise words? Is every word formal? Did I use each new word with its pattern (impact on, benefit from)?', 'Task 2: good / bad / thing বদলে নির্দিষ্ট word দিয়েছি? প্রতিটা word formal? প্রতিটা নতুন word pattern-সহ (impact on, benefit from)?'),
        l('Speaking: explain unknown words around them ("it’s a kind of …"); do not force memorised rare words; use a range of natural phrases.', 'Speaking: অজানা word ঘুরিয়ে ব্যাখ্যা করুন ("it’s a kind of …"); মুখস্থ কঠিন word জোর করে বসাবেন না; নানা রকম স্বাভাবিক phrase ব্যবহার করুন।'),
        l('Accuracy before range: if a new word might be wrong, use the one you know.', 'Range-এর আগে accuracy: নতুন word ভুল হতে পারলে জানা word ব্যবহার করুন।'),
        l('Why Bangla speakers slip: many students memorise "Band 9 word lists" and insert the words anywhere. Examiners mark words used in the wrong context as errors, not as range.', 'বাংলাভাষীরা কেন ভুল করে: অনেকে "Band 9 word list" মুখস্থ করে যেখানে-সেখানে বসান। ভুল context-এ ব্যবহার করা word examiner ভুল হিসেবে ধরেন, range হিসেবে না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Model sentences', 'Model sentence'),
      items: [
        { en: 'The graph illustrates the proportion of students who studied abroad.', note: l('Task 1: paraphrased opening', 'Task 1: paraphrase করা শুরু') },
        { en: 'Hotel prices rose slightly, while tourist numbers increased significantly.', note: l('Task 1: trend verbs + adverbs', 'Task 1: trend verb + adverb') },
        { en: 'A crucial factor is the cost of tuition.', note: l('Task 2: precise and formal', 'Task 2: নির্দিষ্ট আর formal') },
        { en: 'To be honest, I’m not really into sports, but I love cycling.', note: l('Speaking: natural', 'Speaking: স্বাভাবিক') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Task by task', 'Task অনুযায়ী'),
      uses: [
        { skill: 'writing', example: 'Overall, the proportion of renewable energy rose significantly.', note: l('Task 1: formal data vocabulary.', 'Task 1: formal data vocabulary।') },
        { skill: 'speaking', example: 'It’s a kind of street food made from rice flour — we call it pitha.', note: l('Speaking: explain a word you do not know in English.', 'Speaking: English-এ জানা নেই এমন word ব্যাখ্যা করুন।') },
        { skill: 'reading', example: 'Text: "a substantial rise" = Question: "a large increase".', note: l('Reading: formal words paraphrase everyday ones.', 'Reading: formal word সাধারণ word-এর paraphrase।') },
        { skill: 'listening', example: 'You hear "roughly a third" — the answer is "about 33%".', note: l('Listening: approximation words (roughly, just over, nearly).', 'Listening: আনুমানিকতার word (roughly, just over, nearly)।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The chart describes that exports doubled.', right: 'The chart shows that exports doubled.', why: l('show that; describe + object.', 'show that; describe + object।') },
        { wrong: 'Tourism is a double-edged sword that has pros and cons of both sides.', right: 'Tourism has both advantages and disadvantages.', why: l('Memorised phrases misused sound unnatural.', 'ভুলভাবে বসানো মুখস্থ phrase অস্বাভাবিক শোনায়।') },
        { wrong: 'Speaking: "My hometown is a paramount metropolis."', right: '"My hometown is a big, busy city."', why: l('Natural words for Speaking; paramount is misused.', 'Speaking-এ স্বাভাবিক word; paramount ভুলভাবে বসানো।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: no hints', 'Practice: কোনো hint নেই'),
      exercises: [
        choice('vc-8-p1', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Task 1: which opening paraphrases the question best?', 'Task 1: কোন শুরু প্রশ্নটা সবচেয়ে ভালো paraphrase করে?'), sentence: 'Question: The chart shows the number of people who used public transport in four cities.', options: ['The chart illustrates how many residents of four cities travelled by bus or train.', 'The chart shows the number of people who used public transport in four cities.', 'The chart tells about transport stuff in cities.'], answer: 'The chart illustrates how many residents of four cities travelled by bus or train.', explanation: l('New words and structure, same meaning.', 'নতুন word আর গঠন, একই অর্থ।'), why: { 'The chart shows the number of people who used public transport in four cities.': l('This copies the question.', 'এটা প্রশ্ন হুবহু লেখা।'), 'The chart tells about transport stuff in cities.': l('tells about and stuff are vague and informal.', 'tells about আর stuff অস্পষ্ট আর informal।') } }),
        choice('vc-8-p2', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Task 1: choose the adverb that matches a small change.', 'Task 1: ছোট পরিবর্তনের সাথে মেলে এমন adverb বেছে নিন।'), sentence: 'Prices rose ___ from 100 to 102 taka.', options: ['slightly', 'dramatically', 'significant'], answer: 'slightly', explanation: l('2% → slightly.', '২% → slightly।'), why: { dramatically: l('dramatically is for a very large change.', 'dramatically খুব বড় পরিবর্তনের জন্য।'), significant: l('significant is an adjective, and the change is small.', 'significant adjective, আর পরিবর্তন ছোট।') } }),
        choice('vc-8-p3', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Task 2: which sentence is the most precise?', 'Task 2: কোন sentence সবচেয়ে নির্দিষ্ট?'), options: ['A major drawback of online learning is the lack of face-to-face interaction.', 'A bad thing about online learning is that it is not good.', 'Online learning has some very bad things.'], answer: 'A major drawback of online learning is the lack of face-to-face interaction.', explanation: l('It names the exact drawback.', 'এটা ঠিক অসুবিধার নাম দেয়।'), why: { 'A bad thing about online learning is that it is not good.': l('It says nothing specific.', 'এটা নির্দিষ্ট কিছু বলে না।'), 'Online learning has some very bad things.': l('very bad things is vague.', 'very bad things অস্পষ্ট।') } }),
        choice('vc-8-p4', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Speaking Part 2: which sentence sounds natural?', 'Speaking Part 2: কোন sentence স্বাভাবিক শোনায়?'), options: ['I’d like to talk about a trip I took to Sylhet with my cousins last winter.', 'I would like to elucidate a paramount excursion to Sylhet.', 'Trip Sylhet cousins winter good.'], answer: 'I’d like to talk about a trip I took to Sylhet with my cousins last winter.', explanation: l('Natural, clear and accurate.', 'স্বাভাবিক, পরিষ্কার আর নির্ভুল।'), why: { 'I would like to elucidate a paramount excursion to Sylhet.': l('Memorised rare words used wrongly sound unnatural.', 'ভুলভাবে বসানো মুখস্থ কঠিন word অস্বাভাবিক শোনায়।'), 'Trip Sylhet cousins winter good.': l('Notes, not a sentence.', 'Note, sentence না।') } }),
        choice('vc-8-p5', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Task 2: which sentence is correct?', 'Task 2: কোন sentence-টা ঠিক?'), options: ['Poor families often lack access to clean water.', 'Poor families often lack of access to clean water.', 'Poor families often lack access of clean water.'], answer: 'Poor families often lack access to clean water.', explanation: l('lack (verb) + object; access to.', 'lack (verb) + object; access to।'), why: { 'Poor families often lack of access to clean water.': l('The verb lack takes no of (a lack of is the noun).', 'lack verb-এর পরে of বসে না (a lack of হলো noun)।'), 'Poor families often lack access of clean water.': l('access to.', 'access to।') } }),
        choice('vc-8-p6', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('Listening: you hear "just under half". Which answer fits?', 'Listening: আপনি শুনলেন "just under half"। কোন উত্তর মেলে?'), options: ['48%', '52%', '25%'], answer: '48%', explanation: l('just under = a little less than.', 'just under = একটু কম।'), why: { '52%': l('52% is just over half.', '52% হলো just over half।'), '25%': l('25% is a quarter.', '25% হলো a quarter।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('vc-8-r1', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Task 1: write a formal verb for "shows" (one word).', 'Task 1: "shows"-এর formal verb লিখুন (একটা word)।'), sentence: 'The line graph ___ changes in rice production.', accepted: ['illustrates', 'shows', 'depicts', 'presents', 'compares'], explanation: l('illustrates / depicts.', 'illustrates / depicts।') }),
        correct('vc-8-r2', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Task 1: rewrite formally.', 'Task 1: formal-ভাবে আবার লিখুন।'), sentence: 'Car sales went down a lot in 2020.', accepted: ['Car sales decreased significantly in 2020.', 'Car sales fell significantly in 2020.', 'Car sales declined significantly in 2020.', 'Car sales decreased considerably in 2020.', 'Car sales fell considerably in 2020.', 'Car sales declined considerably in 2020.', 'Car sales fell sharply in 2020.', 'Car sales decreased sharply in 2020.', 'Car sales declined sharply in 2020.', 'Car sales fell dramatically in 2020.', 'Car sales decreased dramatically in 2020.', 'Car sales declined dramatically in 2020.'], explanation: l('went down a lot → fell significantly.', 'went down a lot → fell significantly।') }),
        spot('vc-8-r3', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Task 2: one word is vague. Tap it and fix it.', 'Task 2: একটা word অস্পষ্ট। Tap করে ঠিক করুন।'), sentence: 'Unemployment is a big thing in many developing countries.', wrong: 'thing', accepted: ['issue', 'problem', 'concern', 'challenge'], explanation: l('a big issue / problem.', 'a big issue / problem।') }),
        gap('vc-8-r4', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Task 2: write the missing word.', 'Task 2: বাদ পড়া word-টা লিখুন।'), sentence: 'Local businesses benefit ___ tourism.', accepted: ['from'], explanation: l('benefit from.', 'benefit from।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        correct('vc-8-c1', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Task 1: fix the two words.', 'Task 1: দুটো word ঠিক করুন।'), sentence: 'Overall, the graph describes that prices raised.', accepted: ['Overall, the graph shows that prices rose.', 'Overall, the graph shows that prices increased.', 'Overall, the graph illustrates that prices rose.', 'Overall, the graph indicates that prices rose.'], explanation: l('shows that; rose (no object).', 'shows that; rose (object নেই)।') }),
        correct('vc-8-c2', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Task 2: replace the informal phrasal verb.', 'Task 2: informal phrasal verb-টা বদলান।'), sentence: 'Governments should sort out the housing crisis quickly.', accepted: ['Governments should tackle the housing crisis quickly.', 'Governments should address the housing crisis quickly.', 'Governments should resolve the housing crisis quickly.', 'Governments should solve the housing crisis quickly.', 'Governments should deal with the housing crisis quickly.'], explanation: l('sort out → tackle / address / resolve.', 'sort out → tackle / address / resolve।') }),
        order('vc-8-c3', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Build the Task 2 sentence.', 'Task 2 sentence-টা সাজান।'), answer: 'Cost is a crucial factor for international students.', explanation: l('crucial factor.', 'crucial factor।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 2 paragraph', 'এবার আপনার পালা: একটা Task 2 paragraph'),
      exercises: [
        write('vc-8-y1', 'voc-use', {
          ...P,
          prompt: l('Task 2: write 3 sentences on "Is tourism good for local communities?" Use at least three words from your Vocabulary Foundation missions (benefit, impact, contribute, significant, consequence, access, sustainable, crucial, decline, afford).', 'Task 2: "Is tourism good for local communities?" নিয়ে ৩টা sentence লিখুন। Vocabulary Foundation mission-এর অন্তত তিনটা word ব্যবহার করুন (benefit, impact, contribute, significant, consequence, access, sustainable, crucial, decline, afford)।'),
          model: 'Tourism can contribute significantly to local economies by creating jobs. However, it may also have serious consequences for the environment if it is not sustainable. A crucial step is to give local people a real share of the income.',
          checklist: [l('patterns: contribute to, impact on, benefit from, access to', 'pattern: contribute to, impact on, benefit from, access to'), l('form and tone: significant / significantly; consequences (negative)', 'form আর সুর: significant / significantly; consequences (নেতিবাচক)'), l('formal and precise, no copied question', 'formal আর নির্দিষ্ট, প্রশ্ন হুবহু না')],
          explanation: l('Range with accuracy.', 'Accuracy-সহ range।'),
          task: 'The student writes 3 Task 2 sentences on "Is tourism good for local communities?" using at least three of: benefit, impact, contribute, significant, consequence, access, sustainable, crucial, decline, afford. Check only Lexical Resource: correct patterns (contribute to, impact on, benefit from, access to, afford to), correct form (significant/significantly, benefit/beneficial, affect/effect, economic/economical), tone (consequences negative), formal register, precision (no good/bad/thing), and that the question is paraphrased rather than copied. Praise words used accurately. For each issue quote the words and give the fix.',
          target: l('Lexical Resource in Task 2', 'Task 2-এ Lexical Resource'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Task 1: illustrates · rose / fell · slightly / significantly · paraphrase the question.', 'Task 1: illustrates · rose / fell · slightly / significantly · প্রশ্ন paraphrase।'),
        l('Task 2: precise, formal words with the right pattern.', 'Task 2: ঠিক pattern-সহ নির্দিষ্ট, formal word।'),
        l('Speaking: natural words; explain what you cannot name.', 'Speaking: স্বাভাবিক word; যার নাম জানেন না তা ব্যাখ্যা করুন।'),
      ],
    },
  ],
};

// ======================================================================= vc-9
export const vcReview: Lesson = {
  id: 'vc-9',
  kind: 'test',
  title: l('Vocabulary review test', 'Vocabulary review test'),
  why: l('Check what you have learned. Your mistakes here decide what Mino suggests you review.', 'কী শিখলেন যাচাই করুন। এখানের ভুল দেখেই Mino ঠিক করবে কী review করা দরকার।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'concept',
      title: l('How this test works', 'এই test কীভাবে চলবে'),
      body: l(
        '12 questions from every lesson in this module. Answers and explanations come at the end, not after each question. Score 80% or more to complete the module; if you score less, Mino will suggest short reviews for the marks you missed.',
        'এই module-এর সব lesson থেকে ১২টা প্রশ্ন। Answer আর ব্যাখ্যা প্রতিটা প্রশ্নের পরে না, শেষে দেখবেন। ৮০% বা বেশি পেলে module শেষ; কম পেলে যে নম্বরগুলো কেটেছে সেগুলোর জন্য Mino ছোট review সাজেস্ট করবে।',
      ),
    },
    {
      kind: 'practice',
      title: l('Part 1: choose', 'Part 1: বেছে নিন'),
      exercises: [
        choice('vc-9-e1', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Choose the word that follows.', 'পরের word-টা বেছে নিন।'), sentence: 'Factories contribute ___ air pollution.', options: ['to', 'for', 'in'], answer: 'to', explanation: l('contribute to.', 'contribute to।') }),
        choice('vc-9-e2', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('What does "misunderstand" mean?', '"misunderstand" মানে কী?'), options: ['understand wrongly', 'understand again', 'not want to understand'], answer: 'understand wrongly', explanation: l('mis- = wrongly.', 'mis- = ভুলভাবে।') }),
        choice('vc-9-e3', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('Which word can replace "rose"?', '"rose"-এর জায়গায় কোন word বসবে?'), sentence: 'Unemployment rose in 2021.', options: ['increased', 'raised', 'lifted'], answer: 'increased', explanation: l('increased (no object).', 'increased (object নেই)।') }),
        choice('vc-9-e4', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Task 2: choose the formal word.', 'Task 2: formal word বেছে নিন।'), sentence: 'Many ___ now study online.', options: ['students', 'guys', 'kids'], answer: 'students', explanation: l('students — neutral and precise.', 'students — নিরপেক্ষ আর নির্দিষ্ট।') }),
        choice('vc-9-e5', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Choose the precise word.', 'নির্দিষ্ট word বেছে নিন।'), sentence: 'Smoking is ___ to health.', options: ['harmful', 'bad', 'not good'], answer: 'harmful', explanation: l('harmful to.', 'harmful to।') }),
        choice('vc-9-e6', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'Climate change will ___ farmers in coastal areas.', options: ['affect', 'effect', 'affection'], answer: 'affect', explanation: l('verb → affect.', 'verb → affect।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Part 2: write and fix', 'Part 2: লিখুন আর ঠিক করুন'),
      exercises: [
        gap('vc-9-e7', 'voc-learn', { ...P, pattern: 'voc-word-pattern', prompt: l('Write the missing word.', 'বাদ পড়া word-টা লিখুন।'), sentence: 'Every child should have access ___ education.', accepted: ['to'], explanation: l('access to.', 'access to।') }),
        gap('vc-9-e8', 'voc-context', { ...P, pattern: 'voc-context-clue', prompt: l('Add a prefix meaning "not" (one word).', '"না" অর্থের prefix যোগ করুন (একটা word)।'), sentence: 'The results were ___ (expected), so the scientists repeated the test.', base: 'expected', accepted: ['unexpected'], explanation: l('un- + expected.', 'un- + expected।') }),
        spot('vc-9-e9', 'voc-paraphrase', { ...P, pattern: 'voc-synonym-fit', prompt: l('One synonym changes the meaning. Tap it and fix it.', 'একটা synonym অর্থ বদলে দেয়। Tap করে ঠিক করুন।'), sentence: 'Students must learn a strange language at school.', wrong: 'strange', accepted: ['foreign', 'second', 'new'], fixOptions: ['foreign', 'stranger', 'strangely'], explanation: l('a foreign / second language.', 'a foreign / second language।') }),
        correct('vc-9-e10', 'voc-register', { ...P, pattern: 'voc-register-mix', prompt: l('Task 2: rewrite formally.', 'Task 2: formal-ভাবে আবার লিখুন।'), sentence: 'Lots of kids play video games.', accepted: ['Many children play video games.', 'A large number of children play video games.', 'Many young people play video games.'], explanation: l('Lots of kids → Many children.', 'Lots of kids → Many children।') }),
        correct('vc-9-e11', 'voc-precise', { ...P, pattern: 'voc-vague-word', prompt: l('Remove the unnecessary word.', 'অপ্রয়োজনীয় word-টা মুছুন।'), sentence: 'Water is very essential for life.', accepted: ['Water is essential for life.'], explanation: l('essential needs no very.', 'essential-এর সাথে very লাগে না।') }),
        spot('vc-9-e12', 'voc-use', { ...P, pattern: 'voc-form-tone', prompt: l('One word has the wrong form. Tap it and fix it.', 'একটা word-এর form ভুল। Tap করে ঠিক করুন।'), sentence: 'The country’s economical growth slowed last year.', wrong: 'economical', accepted: ['economic'], fixOptions: ['economic', 'economy', 'economically'], explanation: l('about the economy → economic.', 'অর্থনীতি-সংক্রান্ত → economic।') }),
      ],
    },
    {
      kind: 'ielts',
      title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'Tourism contributes significantly to the local economy.', note: l('Task 2: pattern, form and precision.', 'Task 2: pattern, form আর precision।') },
        { skill: 'reading', example: 'Text: "a substantial rise" — Question: "a large increase".', note: l('Reading: paraphrase.', 'Reading: paraphrase।') },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Learn words with their pattern and an example; guess unknown words from context.', 'Word pattern আর উদাহরণ-সহ শিখুন; অজানা word context থেকে আন্দাজ করুন।'),
        l('Paraphrase with synonyms that fit; match the register to the task.', 'মানানসই synonym দিয়ে paraphrase; task অনুযায়ী register।'),
        l('Be precise, and check form and tone before using a new word.', 'নির্দিষ্ট হোন, আর নতুন word ব্যবহারের আগে form আর সুর যাচাই করুন।'),
      ],
    },
  ],
};

import type { Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';
import { CUE_PLACE } from './speaking';

/**
 * Understanding IELTS Speaking, application lessons in the v2 format: sp-7
 * Speaking traps (one-word answers, memorised scripts, off-topic or personal-only
 * answers, essay language, long silence), sp-8 a plan for the whole test, and
 * sp-9 the module review test. Original Mino content.
 */
const P = { tag: 'speaking' as const };

// ======================================================================= sp-7
export const spTraps: Lesson = {
  id: 'sp-7',
  format: 'v2',
  title: l('Speaking traps and how to avoid them', 'Speaking-এর ফাঁদ আর কীভাবে এড়াবেন'),
  why: l('A few habits cost most Speaking marks: one-word answers, memorised scripts, answering a different question, essay language, and long silences. Learn to hear them in your own practice.', 'কয়েকটা অভ্যাসেই Speaking-এর বেশিরভাগ নম্বর যায়: এক word-এর উত্তর, মুখস্থ script, অন্য প্রশ্নের উত্তর, essay-র ভাষা, আর লম্বা নীরবতা। নিজের practice-এ এগুলো শুনতে শিখুন।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'speaking',
  steps: [
    {
      kind: 'hook',
      title: l('Three answers, three traps', 'তিনটা উত্তর, তিনটা ফাঁদ'),
      situation: l('Part 1: "Do you like music?" → "Yes." Part 2 (a place): a memorised talk about "my favourite person". Part 3: "Why do people visit museums?" → "Firstly, museums are advantageous. Moreover…"', 'Part 1: "Do you like music?" → "Yes।" Part 2 (একটা জায়গা): "my favourite person" নিয়ে মুখস্থ কথা। Part 3: "Why do people visit museums?" → "Firstly, museums are advantageous. Moreover…"'),
      question: l('Which traps are these?', 'এগুলো কোন ফাঁদ?'),
      options: ['Too short · off-topic memorised talk · essay language', 'All three are fine', 'Only the first is a problem'],
      answer: 'Too short · off-topic memorised talk · essay language',
      diagnose: {
        'Too short · off-topic memorised talk · essay language': l('Right. Extend Part 1, answer the card you are given, and speak naturally in Part 3.', 'ঠিক। Part 1 বাড়ান, যে card পেয়েছেন তার উত্তর দিন, আর Part 3-এ স্বাভাবিকভাবে বলুন।'),
        'All three are fine': l('Each one lowers a different criterion.', 'প্রতিটা আলাদা একটা criteria কমায়।'),
        'Only the first is a problem': l('The memorised talk misses the card, and essay language sounds unnatural.', 'মুখস্থ কথা card ধরে না, আর essay-র ভাষা অস্বাভাবিক শোনায়।'),
      },
    },
    {
      kind: 'discover',
      title: l('Five traps', 'পাঁচটা ফাঁদ'),
      items: [
        { en: 'One-word or very short answers → little to mark', note: l('answer + reason + detail', 'উত্তর + কারণ + detail') },
        { en: 'Memorised scripts → unnatural, often off-topic', note: l('flexible ideas', 'নমনীয় idea') },
        { en: 'Personal-only answers in Part 3 → the question is general', note: l('people in general', 'সাধারণ মানুষ') },
        { en: 'Essay language (Moreover, In conclusion) → sounds written', note: l('spoken links', 'কথ্য link') },
        { en: 'Long silence → breaks fluency', note: l('thinking phrases', 'ভাবার phrase') },
      ],
      question: l('Which trap is a talk about "my favourite person" for a card about a place?', 'জায়গার card-এ "my favourite person" নিয়ে কথা কোন ফাঁদ?'),
      options: [
        l('A memorised, off-topic script', 'মুখস্থ, প্রশ্নের বাইরের script'),
        l('A one-word answer', 'এক word-এর উত্তর'),
        l('A pronunciation problem', 'Pronunciation-এর সমস্যা'),
      ],
      answer: 0,
      pattern: l('Check every answer: long enough, on the exact question, general in Part 3, spoken (not essay) language, no long silences.', 'প্রতিটা উত্তর যাচাই করুন: যথেষ্ট লম্বা, ঠিক প্রশ্নে, Part 3-এ সাধারণ, কথ্য (essay নয়) ভাষা, লম্বা নীরবতা নয়।'),
    },
    {
      kind: 'concept',
      title: l('A five-point practice check', 'পাঁচ-বিন্দুর practice যাচাই'),
      body: l(
        'Record yourself in practice and listen back with these checks. Each point matches a lesson in this module.',
        'Practice-এ নিজেকে record করুন আর এই যাচাইগুলো দিয়ে শুনুন। প্রতিটা বিন্দু এই module-এর একটা lesson-এর সাথে মেলে।',
      ),
      points: [
        l('1. Length: Part 1 about 2–3 sentences; Part 2 1–2 minutes; Part 3 developed answers. (lessons 2–4)', '১. দৈর্ঘ্য: Part 1 প্রায় ২–৩ sentence; Part 2 ১–২ মিনিট; Part 3 বিকশিত উত্তর। (lesson ২–৪)'),
        l('2. Relevance: did you answer this exact question or card? (lessons 2–4)', '২. প্রাসঙ্গিকতা: ঠিক এই প্রশ্ন বা card-এর উত্তর দিয়েছেন? (lesson ২–৪)'),
        l('3. Part 3: people in general, with reasons, comparisons and speculation. (lesson 4)', '৩. Part 3: সাধারণ মানুষ, কারণ, তুলনা আর অনুমানসহ। (lesson ৪)'),
        l('4. Language: spoken links, natural phrases, quick self-correction. (lesson 5)', '৪. ভাষা: কথ্য link, স্বাভাবিক phrase, দ্রুত নিজেকে শুধরানো। (lesson ৫)'),
        l('5. Clarity: word stress, -ed / -s endings, clear sounds. (lesson 6)', '৫. স্পষ্টতা: word stress, -ed / -s ending, পরিষ্কার ধ্বনি। (lesson ৬)'),
      ],
    },
    {
      kind: 'examples',
      title: l('Traps and fixes', 'ফাঁদ আর সমাধান'),
      items: [
        { en: '✗ "Yes." → ✓ "Yes, I do — mostly old Bangla songs, because my father played them."', note: l('extend', 'বাড়ান') },
        { en: '✗ A memorised talk about a person → ✓ Notes for the card you actually get', note: l('flexible ideas', 'নমনীয় idea') },
        { en: '✗ "I went to a museum once." → ✓ "I think people visit museums mainly to learn about their history."', note: l('general in Part 3', 'Part 3-এ সাধারণ') },
        { en: '✗ "Firstly… Moreover…" → ✓ "Well, I’d say… and also…"', note: l('spoken', 'কথ্য') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters', 'কেন এটা গুরুত্বপূর্ণ'),
      uses: [
        { skill: 'speaking', example: 'Each trap lowers one of the four criteria.', note: l('Five checks.', 'পাঁচটা যাচাই।') },
        { skill: 'writing', example: 'Memorised essays fail in Writing for the same reason.', note: l('Answer the exact question.', 'ঠিক প্রশ্নের উত্তর।') },
        { skill: 'listening', example: 'Listening closely to the examiner’s question prevents off-topic answers.', note: l('Hear the question.', 'প্রশ্নটা শুনুন।') },
        { skill: 'reading', example: 'Reading the cue card carefully, like a Reading question.', note: l('Every prompt.', 'প্রতিটা prompt।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Changing the cue card topic to a prepared one', right: 'Speak about the card you get', why: l('Off-topic answers lose marks.', 'প্রশ্নের বাইরের উত্তরে নম্বর কমে।') },
        { wrong: 'Personal stories only in Part 3', right: 'General answer, then a personal example', why: l('Part 3 is wider.', 'Part 3 বড় পরিসরের।') },
        { wrong: 'Silence while searching for a perfect word', right: 'Use a simpler word and keep going', why: l('Fluency matters.', 'Fluency গুরুত্বপূর্ণ।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: spot the trap', 'Practice: ফাঁদ চিনুন'),
      exercises: [
        choice('sp-7-p1', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('"Do you like music?" Which answer avoids the trap?', '"Do you like music?" কোন উত্তর ফাঁদ এড়ায়?'), options: ['Yes, I do — mostly old Bangla songs, because my father used to play them.', 'Yes.', 'Music is a universal language that connects all humanity.'], answer: 'Yes, I do — mostly old Bangla songs, because my father used to play them.', explanation: l('Extended and personal.', 'বিস্তৃত আর ব্যক্তিগত।'), why: { 'Yes.': l('Too short.', 'খুব ছোট।'), 'Music is a universal language that connects all humanity.': l('Sounds memorised and does not answer "do you".', 'মুখস্থ শোনায়, আর "do you"-এর উত্তর দেয় না।') } }),
        choice('sp-7-p2', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l(`Cue card: "${CUE_PLACE}" You prepared a talk about a person. What should you do?`, `Cue card: "${CUE_PLACE}" আপনি একজন মানুষ নিয়ে কথা প্রস্তুত করেছিলেন। কী করবেন?`), options: ['Make new notes for a place and speak about it', 'Give the prepared talk anyway', 'Ask for a different card'], answer: 'Make new notes for a place and speak about it', explanation: l('Answer the card you get.', 'যে card পেয়েছেন তার উত্তর দিন।'), why: { 'Give the prepared talk anyway': l('That is off-topic.', 'এটা প্রশ্নের বাইরে।'), 'Ask for a different card': l('You speak about the card you are given.', 'যে card দেওয়া হয় তা নিয়েই বলেন।') } }),
        choice('sp-7-p3', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('"Why do people visit museums?" Which answer avoids the trap?', '"Why do people visit museums?" কোন উত্তর ফাঁদ এড়ায়?'), options: ['I think most people visit museums to learn about history, although some just go for a day out.', 'I went to a museum once with my class.', 'Firstly, museums are advantageous. Moreover, they are beneficial.'], answer: 'I think most people visit museums to learn about history, although some just go for a day out.', explanation: l('General, with a reason and balance.', 'সাধারণ, কারণ আর ভারসাম্যসহ।'), why: { 'I went to a museum once with my class.': l('Personal only.', 'শুধু ব্যক্তিগত।'), 'Firstly, museums are advantageous. Moreover, they are beneficial.': l('Essay language and no real reason.', 'Essay-র ভাষা, প্রকৃত কারণ নেই।') } }),
        choice('sp-7-p4', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('You cannot remember the word "exhibition". Best?', '"exhibition" word মনে পড়ছে না। সবচেয়ে ভালো?'), options: ['Use a simpler phrase: "a show of paintings" and keep going', 'Stop and wait until you remember', 'Say the word in Bangla and stop'], answer: 'Use a simpler phrase: "a show of paintings" and keep going', explanation: l('Paraphrase and continue.', 'Paraphrase করে চালিয়ে যান।'), why: { 'Stop and wait until you remember': l('Long silence breaks fluency.', 'লম্বা নীরবতা fluency ভাঙে।'), 'Say the word in Bangla and stop': l('The examiner needs English; explain it another way.', 'Examiner-এর English লাগে; অন্যভাবে বোঝান।') } }),
        choice('sp-7-p5', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('Listening to your recording, you hear "Last week I visit my aunt". Which area needs work?', 'Recording শুনে শুনলেন "Last week I visit my aunt"। কোন দিকে কাজ দরকার?'), options: ['The -ed ending (visited)', 'Your accent', 'Speaking louder'], answer: 'The -ed ending (visited)', explanation: l('visited /ɪd/.', 'visited /ɪd/।'), why: { 'Your accent': l('Accent is not the issue; the missing ending is.', 'Accent সমস্যা নয়; ending না থাকা সমস্যা।'), 'Speaking louder': l('Volume does not add the ending.', 'জোরে বললে ending আসে না।') } }),
        choice('sp-7-p6', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('What is the best way to prepare for Speaking?', 'Speaking-এর জন্য প্রস্তুতির সবচেয়ে ভালো উপায় কী?'), options: ['Practise flexible ideas on many topics and record yourself', 'Memorise ten perfect answers', 'Only study grammar rules'], answer: 'Practise flexible ideas on many topics and record yourself', explanation: l('Natural and flexible.', 'স্বাভাবিক আর নমনীয়।'), why: { 'Memorise ten perfect answers': l('Scripts sound unnatural and rarely fit the question.', 'Script অস্বাভাবিক শোনায় আর খুব কমই প্রশ্নে মেলে।'), 'Only study grammar rules': l('Grammar is one of four criteria.', 'Grammar চারটা criteria-র একটা।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sp-7-r1', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'A Part 1 answer: answer, reason, then a ___.', accepted: ['detail', 'example'], explanation: l('a detail / example.', 'detail / উদাহরণ।') }),
        gap('sp-7-r2', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'In Part 3, talk about people in ___, not only yourself.', accepted: ['general'], explanation: l('in general.', 'in general।') }),
        spot('sp-7-r3', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('One word makes this advice wrong. Tap it and fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'In Part 2, change the topic to one you prepared.', wrong: 'change', accepted: ['keep'], explanation: l('Keep to the card’s topic.', 'Card-এর বিষয়েই থাকুন।') }),
        correct('sp-7-r4', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'If you forget a word, stay silent until you remember it.', accepted: ['If you forget a word, use a simpler word and keep going.', 'If you forget a word, explain it in other words and keep going.', 'If you forget a word, paraphrase it and keep going.'], explanation: l('Paraphrase and continue.', 'Paraphrase করে চালিয়ে যান।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sp-7-c1', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('Why do memorised Part 2 talks often fail?', 'মুখস্থ Part 2 কথা প্রায়ই কেন ব্যর্থ হয়?'), options: ['They rarely fit the exact card and sound unnatural', 'They are too short', 'Examiners do not allow notes'], answer: 'They rarely fit the exact card and sound unnatural', explanation: l('Flexible ideas instead.', 'বদলে নমনীয় idea।') }),
        spot('sp-7-c2', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('One word makes this advice wrong. Tap it, then fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Use essay linkers like moreover in Speaking.', wrong: 'essay', accepted: ['spoken'], fixOptions: ['spoken', 'rare', 'long'], explanation: l('Spoken links — and "moreover" is not one of them.', 'কথ্য link — আর "moreover" তার একটা নয়।') }),
        order('sp-7-c3', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Speak about the card you are given.', explanation: l('No prepared swaps.', 'প্রস্তুত বিষয়ে বদল নয়।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: fix a weak answer', 'এবার আপনার পালা: দুর্বল উত্তর ঠিক করুন'),
      exercises: [
        write('sp-7-y1', 'sp-part3', {
          ...P,
          prompt: l('Part 3 question: "Why do people visit museums?" Rewrite this weak answer so it avoids the traps: "I went to a museum once. Moreover, it was advantageous. In conclusion, yes."', 'Part 3 প্রশ্ন: "Why do people visit museums?" এই দুর্বল উত্তরটা ফাঁদ এড়িয়ে আবার লিখুন: "I went to a museum once. Moreover, it was advantageous. In conclusion, yes."'),
          model: 'I think most people visit museums to learn about their country’s history, especially when they travel. Some parents also take their children there, because it’s more interesting than reading a textbook. Having said that, I’d imagine fewer young people go now, since so much is online.',
          checklist: [l('a general answer with a reason', 'কারণসহ সাধারণ উত্তর'), l('spoken language, no "Moreover / In conclusion"', 'কথ্য ভাষা, "Moreover / In conclusion" নয়'), l('a comparison or speculation', 'একটা তুলনা বা অনুমান')],
          explanation: l('General, developed, spoken.', 'সাধারণ, বিকশিত, কথ্য।'),
          task: 'The student rewrites a weak IELTS Speaking Part 3 answer to "Why do people visit museums?". Judge the Speaking skills first: the answer is about people in general (a personal example is fine as support), gives reasons, adds a comparison or a speculation with tentative language, uses spoken links instead of essay words (Moreover, In conclusion), and sounds natural rather than memorised. Any reasonable opinion is fine. Then correct grammar only where it matters. Never give a band score.',
          target: l('Avoiding Speaking traps', 'Speaking-এর ফাঁদ এড়ানো'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Extend; answer the exact question or card.', 'বাড়ান; ঠিক প্রশ্ন বা card-এর উত্তর দিন।'),
        l('Part 3: general, reasons, comparisons.', 'Part 3: সাধারণ, কারণ, তুলনা।'),
        l('Spoken language; paraphrase instead of silence.', 'কথ্য ভাষা; নীরবতার বদলে paraphrase।'),
      ],
    },
  ],
};

// ======================================================================= sp-8
export const spPlan: Lesson = {
  id: 'sp-8',
  format: 'v2',
  title: l('A plan for the whole test', 'পুরো test-এর plan'),
  why: l('Put the skills together into one routine: how to practise before the test, and what to do in each part on the day.', 'দক্ষতাগুলো একটা নিয়মে জুড়ুন: test-এর আগে কীভাবে practice করবেন, আর দিনে প্রতিটা অংশে কী করবেন।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'speaking',
  steps: [
    {
      kind: 'hook',
      title: l('Practice that does not transfer', 'যে practice কাজে লাগে না'),
      situation: l('Tania has practised by reading model answers silently for two months. In her first mock test she freezes after 20 seconds of Part 2.', 'Tania দুই মাস ধরে চুপচাপ model answer পড়ে practice করেছেন। প্রথম mock test-এ Part 2-এর ২০ সেকেন্ড পরেই আটকে যান।'),
      question: l('What would have prepared her better?', 'কী তাঁকে ভালো প্রস্তুত করত?'),
      options: ['Speaking aloud on many topics, timed, and recording herself', 'Reading more model answers', 'Memorising longer answers'],
      answer: 'Speaking aloud on many topics, timed, and recording herself',
      diagnose: {
        'Speaking aloud on many topics, timed, and recording herself': l('Right. Speaking is a skill you build by speaking: with a timer for Part 2, and recordings to check yourself.', 'ঠিক। Speaking বলে বলেই গড়ে ওঠে: Part 2-এর জন্য timer সহ, আর নিজেকে যাচাই করতে recording।'),
        'Reading more model answers': l('Reading helps ideas, but not speaking under time.', 'পড়া idea-য় সাহায্য করে, কিন্তু সময় ধরে বলায় নয়।'),
        'Memorising longer answers': l('Scripts rarely fit the card and sound unnatural.', 'Script খুব কমই card-এ মেলে আর অস্বাভাবিক শোনায়।'),
      },
    },
    {
      kind: 'discover',
      title: l('Before and during the test', 'Test-এর আগে আর সময়ে'),
      items: [
        { en: 'Before: speak aloud daily on common topics (home, studies, hobbies, places, people, technology)', note: l('flexible ideas', 'নমনীয় idea') },
        { en: 'Before: time Part 2 (1 minute notes + 2 minutes speaking) and record it', note: l('then use the five-point check', 'তারপর পাঁচ-বিন্দুর যাচাই') },
        { en: 'Part 1: answer + reason + detail · Part 2: notes, prompts in order · Part 3: general, compare, speculate', note: l('one routine', 'একটা নিয়ম') },
        { en: 'Throughout: natural pace, thinking phrases, quick self-correction', note: l('keep going', 'চালিয়ে যান') },
      ],
      question: l('What is the best daily practice?', 'সবচেয়ে ভালো দৈনিক practice কী?'),
      options: [
        l('Speaking aloud and recording yourself', 'জোরে বলা আর নিজেকে record করা'),
        l('Reading model answers silently', 'চুপচাপ model answer পড়া'),
        l('Learning lists of idioms', 'Idiom-এর তালিকা শেখা'),
      ],
      answer: 0,
      pattern: l('Practise by speaking: common topics, timed Part 2, recordings checked with the five points. On the day: the routine for each part.', 'বলে practice করুন: সাধারণ বিষয়, সময় ধরে Part 2, পাঁচ বিন্দু দিয়ে recording যাচাই। দিনে: প্রতিটা অংশের নিয়ম।'),
    },
    {
      kind: 'concept',
      title: l('A routine for 11–14 minutes', '১১–১৪ মিনিটের নিয়ম'),
      body: l(
        'A fixed routine lets you think about ideas, not about what to do next.',
        'নির্দিষ্ট নিয়ম থাকলে পরে কী করবেন তা না ভেবে idea নিয়ে ভাবতে পারেন।',
      ),
      points: [
        l('Part 1 (4–5 min): answer directly, add a reason and a detail, match the tense, then stop.', 'Part 1 (৪–৫ মিনিট): সরাসরি উত্তর, কারণ আর detail যোগ, tense মেলানো, তারপর থামা।'),
        l('Part 2: 1 minute for key-word notes on every prompt; speak through them in order for 1–2 minutes; keep going until stopped.', 'Part 2: ১ মিনিটে প্রতিটা prompt-এর key-word note; ক্রমে ১–২ মিনিট বলা; থামানো পর্যন্ত চালিয়ে যাওয়া।'),
        l('Part 3 (4–5 min): opinion + reason, compare, speculate; general, balanced answers.', 'Part 3 (৪–৫ মিনিট): মতামত + কারণ, তুলনা, অনুমান; সাধারণ, ভারসাম্যপূর্ণ উত্তর।'),
        l('Throughout: a natural pace, thinking phrases instead of silence, paraphrase a word you cannot find.', 'পুরো সময়: স্বাভাবিক গতি, নীরবতার বদলে ভাবার phrase, না পাওয়া word paraphrase।'),
        l('Practise with the Speaking practice test in Mino to hear your answers under time.', 'সময় ধরে নিজের উত্তর শুনতে Mino-র Speaking practice test দিয়ে practice করুন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('One topic, three parts', 'এক বিষয়, তিন অংশ'),
      items: [
        { en: 'Part 1: "Do you like travelling?" → "Yes, especially by train, because I can read on the way."', note: l('short, extended', 'ছোট, বিস্তৃত') },
        { en: `Part 2: "${CUE_PLACE}" → notes → 2 minutes`, note: l('notes + prompts', 'note + prompt') },
        { en: 'Part 3: "Will people travel more in the future?" → "It’s likely, because… Having said that…"', note: l('speculate + balance', 'অনুমান + ভারসাম্য') },
        { en: 'Self-check afterwards: length · relevance · general · spoken · clear', note: l('five points', 'পাঁচ বিন্দু') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'speaking', example: 'One routine for Parts 1–3', note: l('No surprises.', 'অপ্রত্যাশিত কিছু নেই।') },
        { skill: 'writing', example: 'Planning in Part 2 is like planning a Task 2 essay.', note: l('Quick plans.', 'দ্রুত plan।') },
        { skill: 'listening', example: 'Recording and listening to yourself trains your ear.', note: l('Hear yourself.', 'নিজেকে শুনুন।') },
        { skill: 'reading', example: 'Reading widely gives you ideas for Part 3 topics.', note: l('Ideas bank.', 'Idea-র ভান্ডার।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Practising only by reading', right: 'Practise by speaking aloud', why: l('Speaking is built by speaking.', 'বলে বলেই Speaking গড়ে ওঠে।') },
        { wrong: 'Never timing Part 2', right: '1 minute notes + 2 minutes, with a timer', why: l('Feel the real length.', 'প্রকৃত দৈর্ঘ্য অনুভব করুন।') },
        { wrong: 'Never listening back', right: 'Record and check the five points', why: l('You hear what to fix.', 'কী ঠিক করতে হবে শুনতে পান।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: the routine', 'Practice: নিয়ম'),
      exercises: [
        choice('sp-8-p1', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('How long do Parts 1 and 3 each last?', 'Part 1 আর 3 প্রতিটা কত সময়ের?'), options: ['4–5 minutes', '1 minute', '15 minutes'], answer: '4–5 minutes', explanation: l('4–5 minutes each.', 'প্রতিটা ৪–৫ মিনিট।'), why: { '1 minute': l('That is the Part 2 preparation time.', 'ওটা Part 2-এর প্রস্তুতির সময়।'), '15 minutes': l('The whole test is 11–14 minutes.', 'পুরো test ১১–১৪ মিনিট।') } }),
        choice('sp-8-p2', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('How should you practise Part 2?', 'Part 2 কীভাবে practice করবেন?'), options: ['1 minute notes, then 2 minutes speaking with a timer', 'Write the talk and read it', 'Speak for 30 seconds'], answer: '1 minute notes, then 2 minutes speaking with a timer', explanation: l('Like the real test.', 'প্রকৃত test-এর মত।'), why: { 'Write the talk and read it': l('That builds reading, not speaking.', 'এতে পড়া গড়ে, বলা নয়।'), 'Speak for 30 seconds': l('Too short for Part 2.', 'Part 2-এর জন্য খুব ছোট।') } }),
        choice('sp-8-p3', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('"Will people read fewer books in the future?" Best start?', '"Will people read fewer books in the future?" সবচেয়ে ভালো শুরু?'), options: ['It’s likely, mainly because so many people read on their phones now.', 'Yes.', 'I read a book yesterday.'], answer: 'It’s likely, mainly because so many people read on their phones now.', explanation: l('Speculation + reason.', 'অনুমান + কারণ।'), why: { 'Yes.': l('Too short for Part 3.', 'Part 3-এর জন্য খুব ছোট।'), 'I read a book yesterday.': l('Personal, not general.', 'ব্যক্তিগত, সাধারণ নয়।') } }),
        choice('sp-8-p4', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Why record yourself?', 'নিজেকে কেন record করবেন?'), options: ['To hear length, relevance, language and clarity problems', 'To memorise the recording', 'To send it to the examiner'], answer: 'To hear length, relevance, language and clarity problems', explanation: l('The five-point check.', 'পাঁচ-বিন্দুর যাচাই।'), why: { 'To memorise the recording': l('Memorising makes answers sound scripted.', 'মুখস্থ করলে উত্তর script-এর মত শোনায়।'), 'To send it to the examiner': l('Recordings are for your own practice.', 'Recording আপনার নিজের practice-এর জন্য।') } }),
        choice('sp-8-p5', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('Which topics should you practise for Part 1?', 'Part 1-এর জন্য কোন বিষয় practice করবেন?'), options: ['Familiar topics like home, studies, hobbies and daily routine', 'Only academic topics', 'Only one topic in great detail'], answer: 'Familiar topics like home, studies, hobbies and daily routine', explanation: l('Part 1 is familiar topics.', 'Part 1 পরিচিত বিষয়।'), why: { 'Only academic topics': l('Part 1 is about your everyday life.', 'Part 1 আপনার দৈনন্দিন জীবন নিয়ে।'), 'Only one topic in great detail': l('Questions can be about many topics.', 'প্রশ্ন নানা বিষয়ে হতে পারে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sp-8-r1', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('Write the numbers (e.g. 11–14).', 'সংখ্যাগুলো লিখুন (যেমন 11–14)।'), sentence: 'The Speaking test lasts ___ minutes.', accepted: ['11–14', '11-14', '11 to 14'], explanation: l('11–14 minutes.', '১১–১৪ মিনিট।') }),
        gap('sp-8-r2', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'Practise by speaking aloud and ___ yourself.', accepted: ['recording'], explanation: l('recording.', 'recording।') }),
        spot('sp-8-r3', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('One word makes this advice wrong. Tap it and fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Practise Part 2 without a timer.', wrong: 'without', accepted: ['with'], explanation: l('With a timer.', 'Timer সহ।') }),
        correct('sp-8-r4', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('Correct the plan.', 'Plan-টা ঠিক করুন।'), sentence: 'In Part 1, speak for two minutes on every question.', accepted: ['In Part 1, give two or three sentences for every question.', 'In Part 1, give 2–3 sentences for every question.', 'In Part 1, give short answers with a reason and a detail.'], explanation: l('Part 1 answers are short.', 'Part 1-এর উত্তর ছোট।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sp-8-c1', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('Which part needs comparing and speculating most?', 'কোন অংশে তুলনা আর অনুমান সবচেয়ে বেশি লাগে?'), options: ['Part 3', 'Part 1', 'Part 2 notes'], answer: 'Part 3', explanation: l('A deeper discussion.', 'গভীর আলোচনা।') }),
        spot('sp-8-c2', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('One word makes this advice wrong. Tap it, then fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Build Speaking by practising silently.', wrong: 'silently', accepted: ['aloud'], fixOptions: ['aloud', 'quickly', 'rarely'], explanation: l('Speaking is built by speaking aloud.', 'জোরে বলে বলেই Speaking গড়ে ওঠে।') }),
        order('sp-8-c3', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Record yourself and listen back.', explanation: l('Hear what to fix.', 'কী ঠিক করতে হবে শুনুন।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a practice plan', 'এবার আপনার পালা: একটা practice plan'),
      exercises: [
        write('sp-8-y1', 'sp-format', {
          ...P,
          prompt: l('Write a 4–5 sentence plan for how you will practise Speaking over the next two weeks and what you will do in each part on the test day.', 'আগামী দুই সপ্তাহ কীভাবে Speaking practice করবেন আর test-এর দিনে প্রতিটা অংশে কী করবেন — ৪–৫ sentence-এর একটা plan লিখুন।'),
          model: 'Every day I will speak aloud for ten minutes on a common topic and record myself. Three times a week I will do a timed Part 2: one minute of notes and two minutes of speaking. On the test day, I will give two or three sentences in Part 1 with a reason and a detail. In Part 2 I will use key words for every prompt, and in Part 3 I will talk about people in general and compare the past with the present.',
          checklist: [l('speaking aloud and recording', 'জোরে বলা আর record করা'), l('timed Part 2 practice', 'সময় ধরে Part 2 practice'), l('a routine for each part', 'প্রতিটা অংশের নিয়ম')],
          explanation: l('Practise the way you will be tested.', 'যেভাবে test হবে সেভাবে practice করুন।'),
          task: 'The student writes a plan for practising IELTS Speaking and for the test day. Judge the plan first against the facts: 11–14 minutes, face to face; Part 1 (4–5 minutes) short extended answers on familiar topics; Part 2 1 minute to prepare and 1–2 minutes to speak; Part 3 (4–5 minutes) general discussion with opinions, comparisons and speculation. Good practice means speaking aloud, timing Part 2 and recording and listening back; memorising scripts is not good practice. Then correct grammar only where it blocks the meaning. Never give a band score.',
          target: l('Planning Speaking practice', 'Speaking practice-এর plan'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Practise by speaking: common topics, timed Part 2, recordings.', 'বলে practice করুন: সাধারণ বিষয়, সময় ধরে Part 2, recording।'),
        l('Part 1 short + extended · Part 2 notes + prompts · Part 3 general + compare.', 'Part 1 ছোট + বিস্তৃত · Part 2 note + prompt · Part 3 সাধারণ + তুলনা।'),
        l('Natural pace; paraphrase instead of silence.', 'স্বাভাবিক গতি; নীরবতার বদলে paraphrase।'),
      ],
    },
  ],
};

// ======================================================================= sp-9
export const spReview: Lesson = {
  id: 'sp-9',
  kind: 'test',
  title: l('Speaking review test', 'Speaking review test'),
  why: l('Check what you have learned. Your mistakes here decide what Mino suggests you review.', 'কী শিখলেন যাচাই করুন। এখানের ভুল দেখেই Mino ঠিক করবে কী review করা দরকার।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'speaking',
  steps: [
    {
      kind: 'concept',
      title: l('How this test works', 'এই test কীভাবে চলবে'),
      body: l(
        '12 questions from every lesson in this module. You see the answer after each question. Score 80% or more to complete the module; if you score less, Mino will suggest short reviews for the marks you missed.',
        'এই module-এর সব lesson থেকে ১২টা প্রশ্ন। প্রতিটা প্রশ্নের পরে answer দেখবেন। ৮০% বা বেশি পেলে module শেষ; কম পেলে যে নম্বরগুলো কেটেছে তার জন্য Mino ছোট review-এর পরামর্শ দেবে।',
      ),
    },
    {
      kind: 'practice',
      title: l('Part 1: choose', 'Part 1: বেছে নিন'),
      exercises: [
        choice('sp-9-e1', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('IELTS Speaking is…', 'IELTS Speaking হলো…'), options: ['face to face with an examiner, 11–14 minutes', 'recorded on a computer, 30 minutes', 'a written test'], answer: 'face to face with an examiner, 11–14 minutes', explanation: l('3 parts, face to face.', '৩ অংশ, সামনাসামনি।') }),
        choice('sp-9-e2', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('A good Part 1 answer is…', 'ভালো Part 1 উত্তর হলো…'), options: ['an answer + a reason + a detail', 'one word', 'a two-minute speech'], answer: 'an answer + a reason + a detail', explanation: l('About 2–3 sentences.', 'প্রায় ২–৩ sentence।') }),
        choice('sp-9-e3', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('In the Part 2 preparation minute, write…', 'Part 2-এর প্রস্তুতির মিনিটে লিখুন…'), options: ['key words for every prompt', 'a full script', 'nothing'], answer: 'key words for every prompt', explanation: l('Notes, not a script.', 'Note, script নয়।') }),
        choice('sp-9-e4', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('Part 3 answers should be…', 'Part 3-এর উত্তর হবে…'), options: ['general, with reasons, comparisons and speculation', 'about yourself only', 'yes or no'], answer: 'general, with reasons, comparisons and speculation', explanation: l('Wider and deeper.', 'বড় আর গভীর।') }),
        choice('sp-9-e5', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Fluency means…', 'Fluency মানে…'), options: ['a natural pace with connected ideas', 'speaking as fast as possible', 'using many idioms'], answer: 'a natural pace with connected ideas', explanation: l('Not speed.', 'গতি নয়।') }),
        choice('sp-9-e6', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('Pronunciation is marked on…', 'Pronunciation মার্ক হয়…'), options: ['being easy to understand', 'having a native accent', 'speaking loudly'], answer: 'being easy to understand', explanation: l('Clarity, not accent.', 'স্পষ্টতা, accent নয়।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Part 2: write and fix', 'Part 2: লিখুন আর ঠিক করুন'),
      exercises: [
        gap('sp-9-e7', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'IELTS Speaking has ___ parts.', accepted: ['3', 'three'], explanation: l('3.', '৩।') }),
        gap('sp-9-e8', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'It’s ___ that more people will work from home in the future.', accepted: ['likely', 'possible', 'probable'], explanation: l('It’s likely that…', 'It’s likely that…') }),
        correct('sp-9-e9', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('Correct the tense.', 'Tense ঠিক করুন।'), sentence: 'Did you enjoy school? Yes, I enjoy it a lot.', accepted: ['Did you enjoy school? Yes, I enjoyed it a lot.'], explanation: l('Did → enjoyed.', 'Did → enjoyed।') }),
        correct('sp-9-e10', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'If you finish Part 2 early, stop and wait.', accepted: ['If you finish Part 2 early, add another reason or a memory.', 'If you finish Part 2 early, keep talking.', 'If you finish Part 2 early, add a reason, a memory or a comparison.'], explanation: l('Keep going until stopped.', 'থামানো পর্যন্ত চালিয়ে যান।') }),
        gap('sp-9-e11', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('Write the sound: t, d or id.', 'ধ্বনিটা লিখুন: t, d বা id।'), sentence: 'The -ed in "wanted" sounds like /___/.', accepted: ['id', 'ɪd'], explanation: l('/ɪd/ after t or d.', 't বা d-এর পরে /ɪd/।') }),
        correct('sp-9-e12', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Make it natural spoken English.', 'স্বাভাবিক কথ্য English করুন।'), sentence: 'Moreover, my hometown is advantageous.', accepted: ['And my hometown is really convenient.', 'My hometown is really convenient, too.', 'And my hometown is great.', 'My hometown is great, too.', 'Also, my hometown is really convenient.'], explanation: l('Spoken links and natural words.', 'কথ্য link আর স্বাভাবিক word।') }),
      ],
    },
    {
      kind: 'ielts',
      title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
      uses: [
        { skill: 'speaking', example: '3 parts · 11–14 minutes · four equal criteria', note: l('The core facts.', 'মূল তথ্য।') },
        { skill: 'writing', example: 'Opinion + reason + example works in Task 2 too.', note: l('Shared skills.', 'একই দক্ষতা।') },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('3 parts, 11–14 minutes, face to face; four equal criteria.', '৩ অংশ, ১১–১৪ মিনিট, সামনাসামনি; চারটা সমান criteria।'),
        l('Part 1 extend · Part 2 notes + prompts · Part 3 general + compare + speculate.', 'Part 1 বিস্তার · Part 2 note + prompt · Part 3 সাধারণ + তুলনা + অনুমান।'),
        l('Natural, spoken, clear — not memorised, not native.', 'স্বাভাবিক, কথ্য, পরিষ্কার — মুখস্থ নয়, native নয়।'),
      ],
    },
  ],
};

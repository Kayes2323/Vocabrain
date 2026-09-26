import type { Lesson } from '../model';
import { choice, correct, gap, identify, JOBS4, l, spot, tagWords, write } from './pos-kit';

/** Parts of Speech · Adverb: 4 lessons. Original Vocab Brain content. */
const C = 'pos-adverb';

// ======================================================================= 1
const v1: Lesson = {
  id: 'pv-1', unit: 'adverb', format: 'v2', concept: C, minutes: 5, difficulty: 'easy', skill: 'grammar',
  title: l('What is an adverb?', 'Adverb কী?'),
  why: l('Adverbs describe how things change: "rose sharply", "fell slightly".', 'Adverb বলে পরিবর্তনটা কেমন: "rose sharply", "fell slightly"।'),
  steps: [
    {
      kind: 'hook',
      title: l('How did it change?', 'কীভাবে বদলালো?'),
      situation: l('A chart shows bus fares going up a lot in one year. Two students write: A) "Fares rose quick." B) "Fares rose quickly."', 'একটা chart-এ দেখা যাচ্ছে এক বছরে bus ভাড়া অনেক বেড়েছে। দুজন student লিখলো: A) "Fares rose quick." B) "Fares rose quickly."'),
      question: l('Which sentence is correct?', 'কোন sentence-টা সঠিক?'),
      options: ['B: rose quickly', 'A: rose quick', 'Both are fine'], answer: 'B: rose quickly',
      diagnose: {
        'B: rose quickly': l('Right. "quickly" tells us HOW they rose: an adverb.', 'ঠিক। "quickly" বলে কীভাবে বেড়েছে: adverb।'),
        'A: rose quick': l('"quick" is an adjective (a quick rise). To describe the verb "rose" we need the adverb quickly.', '"quick" adjective (a quick rise)। Verb "rose"-কে describe করতে adverb quickly লাগে।'),
        'Both are fine': l('In formal writing only "rose quickly" is correct.', 'Formal writing-এ শুধু "rose quickly" সঠিক।'),
      },
    },
    identify({
      sentence: 'The student/noun answered/verb the difficult/adjective question/noun calmly/adverb.',
      choices: JOBS4,
      pattern: l('"calmly" tells us HOW the student answered: it describes the verb. That is an adverb.', '"calmly" বলে student কীভাবে উত্তর দিলো: এটা verb-কে describe করে। এটাই adverb।'),
    }),
    {
      kind: 'concept',
      title: l('What is an adverb?', 'Adverb কী?'),
      body: l('An adverb tells us more about a verb (how, when, how often), an adjective (how much) or a whole sentence. Many adverbs are adjective + -ly: quick → quickly, careful → carefully.', 'Adverb verb সম্পর্কে (কীভাবে, কখন, কতবার), adjective সম্পর্কে (কতটা) অথবা পুরো sentence সম্পর্কে বাড়তি তথ্য দেয়। অনেক adverb হলো adjective + -ly: quick → quickly, careful → carefully।'),
      points: [
        l('How: slowly, carefully. When: yesterday, soon. How often: always, usually. How much: very, extremely.', 'কীভাবে: slowly, carefully। কখন: yesterday, soon। কতবার: always, usually। কতটা: very, extremely।'),
        l('Some adverbs have no -ly: fast, hard, well, late, soon.', 'কিছু adverb-এ -ly নেই: fast, hard, well, late, soon।'),
        l('good is an adjective; well is its adverb: She sings well.', 'good adjective; তার adverb হলো well: She sings well।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'Prices rose sharply in 2022.', note: l('sharply → how prices rose', 'sharply → দাম কীভাবে বেড়েছে') },
        { en: 'She speaks English fluently.', note: l('fluently → how she speaks', 'fluently → সে কীভাবে বলে') },
        { en: 'The exam was extremely difficult.', note: l('extremely → how difficult', 'extremely → কতটা কঠিন') },
        { en: 'He works hard and plays well.', note: l('hard, well: adverbs without -ly', 'hard, well: -ly ছাড়া adverb') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'writing', example: 'The number of users increased dramatically.', note: l('Task 1: verb + adverb is one of the two main ways to describe a trend.', 'Task 1: trend বোঝানোর দুটো প্রধান উপায়ের একটা হলো verb + adverb।') },
        { skill: 'speaking', example: 'I usually study in the evening.', note: l('Frequency adverbs answer "How often…?" questions.', 'Frequency adverb "How often…?" প্রশ্নের উত্তর দেয়।') },
        { skill: 'listening', example: 'The shop opens daily except Friday.', note: l('Adverbs of time and frequency often hold the answer.', 'সময় আর frequency-র adverb-এ প্রায়ই উত্তর থাকে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'Fares rose quick.', right: 'Fares rose quickly.', why: l('"rose" is a verb → adverb.', '"rose" verb → adverb।') },
        { wrong: 'She speaks English very good.', right: 'She speaks English very well.', why: l('good describes nouns; well describes verbs.', 'good noun-কে describe করে; well verb-কে।') },
        { wrong: 'He drives very carefull.', right: 'He drives very carefully.', why: l('How he drives → carefully (adverb).', 'সে কীভাবে চালায় → carefully (adverb)।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pv-1-p1', C, { prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: 'The number of visitors increased ______.', options: ['rapid', 'rapidly'], answer: 'rapidly', pos: 'adverb', wrongPos: { rapid: 'adjective' }, family: 'rapid', explanation: l('How did it increase? → the adverb rapidly.', 'কীভাবে বাড়লো? → adverb rapidly।'), why: { rapid: l('"rapid" describes a noun: a rapid increase.', '"rapid" noun-কে describe করে: a rapid increase।') } }),
        choice('pv-1-p2', C, { prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: 'She plays the guitar very ______.', options: ['good', 'well'], answer: 'well', pos: 'adverb', wrongPos: { good: 'adjective' }, explanation: l('How she plays → well.', 'সে কীভাবে বাজায় → well।') }),
        tagWords('pv-1-p3', C, { sentence: 'Young/adjective people/noun adapt/verb quickly/adverb to new/adjective technology/noun.', choices: JOBS4, explanation: l('"quickly" describes the verb adapt → adverb.', '"quickly" verb adapt-কে describe করে → adverb।') }),
        choice('pv-1-p4', C, { prompt: l('Which word is the adverb?', 'কোন word-টা adverb?'), sentence: 'He finished the report late.', options: ['finished', 'report', 'late'], answer: 'late', pos: 'adverb', wrongPos: { finished: 'verb', report: 'noun' }, explanation: l('"late" tells us when he finished: an adverb without -ly.', '"late" বলে সে কখন শেষ করলো: -ly ছাড়া adverb।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pv-1-r1', C, { prompt: l('Write the adverb form.', 'Adverb form লেখো।'), base: 'careful', sentence: 'Read the question ___ before you answer.', accepted: ['carefully'], pos: 'adverb', wrongPos: { careful: 'adjective' }, family: 'careful', explanation: l('How to read → carefully.', 'কীভাবে পড়বে → carefully।') }),
        gap('pv-1-r2', C, { prompt: l('Write the adverb form.', 'Adverb form লেখো।'), base: 'good', sentence: 'He speaks English very ___.', accepted: ['well'], pos: 'adverb', wrongPos: { good: 'adjective' }, explanation: l('The adverb of good is well.', 'good-এর adverb হলো well।'), why: { goodly: l('The adverb of "good" is "well".', '"good"-এর adverb "well"।') } }),
        spot('pv-1-r3', C, { sentence: 'Prices fell slight in the second half of the year.', wrong: 'slight', accepted: ['slightly'], pos: 'adverb', wrongPos: { slight: 'adjective' }, family: 'slight', explanation: l('How did prices fall? → slightly.', 'দাম কীভাবে কমলো? → slightly।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pv-1-c1', C, { prompt: l('Why is "fluently" an adverb here?', 'এখানে "fluently" adverb কেন?'), sentence: 'She speaks English fluently.', options: ['It tells us how she speaks', 'It describes the noun English', 'It is the name of a skill'], answer: 'It tells us how she speaks', explanation: l('It describes the verb "speaks".', 'এটা verb "speaks"-কে describe করে।') }),
        spot('pv-1-c2', C, { sentence: 'The population of the city grew steady after 2000.', wrong: 'steady', accepted: ['steadily'], fixOptions: ['steadily', 'steadiness', 'steadier'], pos: 'adverb', wrongPos: { steadiness: 'noun', steadier: 'adjective' }, family: 'steady', explanation: l('How did it grow? → steadily.', 'কীভাবে বাড়লো? → steadily।') }),
        choice('pv-1-c3', C, { prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: 'I didn’t do ______ in my first mock test.', options: ['good', 'well'], answer: 'well', pos: 'adverb', wrongPos: { good: 'adjective' }, explanation: l('do + well (how you did).', 'do + well (তুমি কেমন করলে)।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pv-1-w1', C, {
          prompt: l('Write one sentence about how you study English, with one adverb (how or how often).', 'তুমি কীভাবে English পড়ো, তা নিয়ে একটা sentence লেখো, একটা adverb দিয়ে (কীভাবে বা কতবার)।'),
          model: 'I usually practise speaking with my friends, and I listen carefully to English podcasts.',
          task: 'The student writes one sentence about how they study English using at least one adverb of manner or frequency. Check that adverbs (not adjectives) describe verbs and are placed naturally.',
          target: l('One adverb that describes a verb', 'Verb-কে describe করে এমন একটা adverb'),
          checklist: [l('My adverb describes a verb (how / how often)', 'আমার adverb একটা verb-কে describe করছে (কীভাবে / কতবার)'), l('I used well, not good, after a verb', 'Verb-এর পরে good না, well ব্যবহার করেছি')],
          explanation: l('study regularly, listen carefully, speak fluently.', 'study regularly, listen carefully, speak fluently।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('An adverb describes a verb (how, when, how often), an adjective or a sentence.', 'Adverb verb (কীভাবে, কখন, কতবার), adjective বা পুরো sentence-কে describe করে।'),
        l('Most are adjective + -ly. good → well; fast, hard, late stay the same.', 'বেশিরভাগ adjective + -ly। good → well; fast, hard, late একই থাকে।'),
      ],
    },
  ],
};

// ======================================================================= 2
const v2: Lesson = {
  id: 'pv-2', unit: 'adverb', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'grammar',
  title: l('Adjective or adverb?', 'Adjective নাকি adverb?'),
  why: l('This is the most common Parts of Speech error in IELTS Writing.', 'IELTS Writing-এ Parts of Speech-এর সবচেয়ে common ভুল এটাই।'),
  steps: [
    {
      kind: 'hook',
      title: l('The teacher circled one word', 'Teacher একটা word-এ দাগ দিলেন'),
      situation: l('Nadia’s Task 2 essay says: "The government should take effectively measures to reduce traffic." Her teacher circled one word.', 'Nadia-র Task 2 essay-তে লেখা: "The government should take effectively measures to reduce traffic." Teacher একটা word-এ দাগ দিলেন।'),
      question: l('Which word did the teacher circle?', 'Teacher কোন word-এ দাগ দিলেন?'),
      options: ['effectively', 'measures', 'reduce'], answer: 'effectively',
      diagnose: {
        effectively: l('Right. "measures" is a noun, so it needs an adjective: effective measures.', 'ঠিক। "measures" noun, তাই এর আগে adjective লাগে: effective measures।'),
        measures: l('"measures" (= actions) is correct. Look at the word that describes it.', '"measures" (= পদক্ষেপ) ঠিক আছে। যে word এটাকে describe করছে সেটা দেখো।'),
        reduce: l('"to reduce" is correct. The problem is before "measures".', '"to reduce" ঠিক আছে। সমস্যা "measures"-এর আগে।'),
      },
    },
    identify({
      sentence: 'The government/noun took/verb effective/adjective measures/noun, and traffic/noun fell/verb sharply/adverb.',
      choices: JOBS4,
      pattern: l('"effective" sits next to a noun (measures) → adjective. "sharply" describes a verb (fell) → adverb. Look at the neighbour!', '"effective" একটা noun (measures)-এর পাশে → adjective। "sharply" একটা verb (fell)-কে describe করে → adverb। পাশের word-টা দেখো!'),
    }),
    {
      kind: 'concept',
      title: l('Look at what it describes', 'দেখো কাকে describe করছে'),
      body: l('Ask one question: what does the word describe? A noun → adjective (effective measures, a sharp rise). A verb → adverb (work effectively, rose sharply). An adjective → adverb (extremely important).', 'একটাই প্রশ্ন করো: word-টা কাকে describe করছে? Noun হলে → adjective (effective measures, a sharp rise)। Verb হলে → adverb (work effectively, rose sharply)। Adjective হলে → adverb (extremely important)।'),
      points: [
        l('After be, seem, look, feel, become, sound, smell, taste → adjective: I feel bad. The food smells good.', 'be, seem, look, feel, become, sound, smell, taste-এর পরে → adjective: I feel bad। The food smells good।'),
        l('hard = with effort (work hard). hardly = almost not (I hardly slept).', 'hard = পরিশ্রম করে (work hard)। hardly = প্রায় না (I hardly slept)।'),
        l('late = not on time. lately = recently.', 'late = দেরিতে। lately = ইদানীং।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Pairs to compare', 'জোড়া দিয়ে তুলনা'),
      items: [
        { en: 'a careful plan / plan carefully', note: l('noun → adjective; verb → adverb', 'noun → adjective; verb → adverb') },
        { en: 'a sharp rise / rose sharply', note: l('Task 1: both are correct, in different patterns', 'Task 1: দুটোই ঠিক, আলাদা pattern-এ') },
        { en: 'an extremely important decision', note: l('extremely describes the adjective important', 'extremely adjective important-কে describe করে') },
        { en: 'I feel bad about it.', note: l('after "feel" → adjective (not "badly")', '"feel"-এর পরে → adjective ("badly" না)') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'writing', example: 'Governments should invest heavily in effective public transport.', note: l('Task 2: one sentence often needs both. heavily → invest; effective → transport.', 'Task 2: একটা sentence-এ প্রায়ই দুটোই লাগে। heavily → invest; effective → transport।') },
        { skill: 'writing', example: 'a dramatic increase / increased dramatically', note: l('Task 1: switch between the two patterns without mixing them.', 'Task 1: দুটো pattern বদলে বদলে ব্যবহার করো, কিন্তু মিশিয়ো না।') },
        { skill: 'speaking', example: 'I feel nervous before exams.', note: l('feel + adjective, not "I feel nervously".', 'feel + adjective, "I feel nervously" না।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'The government should take effectively measures.', right: 'The government should take effective measures.', why: l('"measures" is a noun → adjective.', '"measures" noun → adjective।') },
        { wrong: 'The price of rice increased significant.', right: 'The price of rice increased significantly.', why: l('"increased" is a verb → adverb.', '"increased" verb → adverb।') },
        { wrong: 'The results were surprisingly.', right: 'The results were surprising.', why: l('After "were" we describe the results → adjective.', '"were"-এর পরে results-কে describe করছি → adjective।') },
        { wrong: 'I studied hardly for the test.', right: 'I studied hard for the test.', why: l('hardly means "almost not"! With effort = hard.', 'hardly মানে "প্রায় না"! পরিশ্রম করে = hard।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pv-2-p1', C, { prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: 'Schools need ______ teachers.', options: ['qualified', 'qualifiedly'], answer: 'qualified', pos: 'adjective', wrongPos: { qualifiedly: 'adverb' }, explanation: l('Before the noun "teachers" → adjective.', 'Noun "teachers"-এর আগে → adjective।') }),
        choice('pv-2-p2', C, { prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: 'The city grew ______ after the new bridge opened.', options: ['rapid', 'rapidly'], answer: 'rapidly', pos: 'adverb', wrongPos: { rapid: 'adjective' }, family: 'rapid', explanation: l('"grew" is a verb → adverb.', '"grew" verb → adverb।') }),
        choice('pv-2-p3', C, { prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: 'The government should find ______ solutions to pollution.', options: ['effective', 'effectively'], answer: 'effective', pos: 'adjective', wrongPos: { effectively: 'adverb' }, family: 'effect', explanation: l('Before the noun "solutions" → adjective.', 'Noun "solutions"-এর আগে → adjective।') }),
        choice('pv-2-p4', C, { prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: 'I felt ______ after I missed the bus.', options: ['bad', 'badly'], answer: 'bad', pos: 'adjective', wrongPos: { badly: 'adverb' }, explanation: l('feel + adjective (how you are), not an adverb.', 'feel + adjective (তুমি কেমন আছো), adverb না।') }),
        tagWords('pv-2-p5', C, { sentence: 'Prices/noun rose/verb dramatically/adverb, which was/verb a serious/adjective problem/noun.', choices: JOBS4, explanation: l('dramatically → verb rose (adverb); serious → noun problem (adjective).', 'dramatically → verb rose (adverb); serious → noun problem (adjective)।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pv-2-r1', C, { prompt: l('Write the right form of "significant".', '"significant"-এর ঠিক form লেখো।'), base: 'significant', sentence: 'The number of cars increased ___ between 2010 and 2020.', accepted: ['significantly'], pos: 'adverb', wrongPos: { significant: 'adjective' }, family: 'significant', explanation: l('"increased" is a verb → significantly.', '"increased" verb → significantly।') }),
        gap('pv-2-r2', C, { prompt: l('Write the right form of "efficient".', '"efficient"-এর ঠিক form লেখো।'), base: 'efficient', sentence: 'We need a more ___ system of waste collection.', accepted: ['efficient'], pos: 'adjective', wrongPos: { efficiently: 'adverb', efficiency: 'noun' }, family: 'efficient', explanation: l('"system" is a noun → adjective efficient.', '"system" noun → adjective efficient।') }),
        spot('pv-2-r3', C, { sentence: 'The government should take effectively measures to reduce traffic.', wrong: 'effectively', accepted: ['effective'], pos: 'adjective', wrongPos: { effectively: 'adverb' }, family: 'effect', explanation: l('Before the noun "measures" → effective.', 'Noun "measures"-এর আগে → effective।') }),
        spot('pv-2-r4', C, { sentence: 'The price of fuel rose dramatic last year.', wrong: 'dramatic', accepted: ['dramatically'], pos: 'adverb', wrongPos: { dramatic: 'adjective' }, family: 'dramatic', explanation: l('"rose" is a verb → dramatically.', '"rose" verb → dramatically।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pv-2-c1', C, { prompt: l('Why is it "effective measures" and not "effectively measures"?', '"effectively measures" না হয়ে "effective measures" কেন?'), options: ['"measures" is a noun, and adjectives describe nouns', 'Adverbs cannot go before any word', '"effectively" is too long for writing'], answer: '"measures" is a noun, and adjectives describe nouns', explanation: l('Noun → adjective; verb → adverb.', 'Noun → adjective; verb → adverb।') }),
        spot('pv-2-c2', C, { sentence: 'The results of the survey were very surprisingly.', wrong: 'surprisingly', accepted: ['surprising'], fixOptions: ['surprising', 'surprise', 'surprised'], pos: 'adjective', wrongPos: { surprise: 'noun' }, family: 'surprise', explanation: l('After "were" we describe the results → adjective surprising.', '"were"-এর পরে results-কে describe করছি → adjective surprising।') }),
        spot('pv-2-c3', C, { sentence: 'Many students work hardly before the exam.', wrong: 'hardly', accepted: ['hard'], fixOptions: ['hard', 'harder', 'hardness'], pos: 'adverb', wrongPos: { hardness: 'noun' }, explanation: l('work hard = with effort. hardly = almost not.', 'work hard = পরিশ্রম করে। hardly = প্রায় না।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pv-2-w1', C, {
          prompt: l('Task 2 style: write one sentence about a problem in your city. Use one adjective before a noun and one adverb after a verb.', 'Task 2 style: তোমার শহরের একটা সমস্যা নিয়ে একটা sentence লেখো। একটা adjective noun-এর আগে আর একটা adverb verb-এর পরে ব্যবহার করো।'),
          model: 'The city authorities should act quickly to find effective solutions to heavy traffic.',
          task: 'The student writes one Task 2 style sentence with at least one adjective describing a noun and one adverb describing a verb. Check adjective vs adverb choice carefully (e.g. effective measures, act quickly) and grammar.',
          target: l('One adjective + noun, one verb + adverb', 'একটা adjective + noun, একটা verb + adverb'),
          checklist: [l('The adjective is next to a noun', 'Adjective একটা noun-এর পাশে'), l('The adverb describes a verb', 'Adverb একটা verb-কে describe করছে')],
          explanation: l('act quickly (verb + adverb), effective solutions (adjective + noun).', 'act quickly (verb + adverb), effective solutions (adjective + noun)।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Describes a noun → adjective. Describes a verb or an adjective → adverb.', 'Noun-কে describe করলে → adjective। Verb বা adjective-কে describe করলে → adverb।'),
        l('After be / feel / seem / look → adjective. hard ≠ hardly.', 'be / feel / seem / look-এর পরে → adjective। hard ≠ hardly।'),
      ],
    },
  ],
};

// ======================================================================= 3
const v3: Lesson = {
  id: 'pv-3', unit: 'adverb', format: 'v2', concept: C, minutes: 5, difficulty: 'medium', skill: 'grammar',
  title: l('Where adverbs go', 'Adverb কোথায় বসে'),
  why: l('"I like very much cricket" is understood, but it sounds wrong to an examiner.', '"I like very much cricket" বোঝা যায়, কিন্তু examiner-এর কানে ভুল শোনায়।'),
  steps: [
    {
      kind: 'hook',
      title: l('A Speaking answer', 'একটা Speaking উত্তর'),
      situation: l('Examiner: "Do you like sports?" Imran: "Yes, I like very much cricket."', 'Examiner: "Do you like sports?" Imran: "Yes, I like very much cricket."'),
      question: l('Where should "very much" go?', '"very much" কোথায় বসবে?'),
      options: ['I like cricket very much.', 'I very much like cricket very.', 'It is correct as it is.'], answer: 'I like cricket very much.',
      diagnose: {
        'I like cricket very much.': l('Right. Verb + object first, then "very much".', 'ঠিক। আগে verb + object, তারপর "very much"।'),
        'I very much like cricket very.': l('"very" cannot stand alone at the end.', '"very" শেষে একা বসতে পারে না।'),
        'It is correct as it is.': l('English does not put "very much" between the verb and its object.', 'English-এ verb আর তার object-এর মাঝে "very much" বসে না।'),
      },
    },
    identify({
      sentence: 'I usually/adverb study/verb English/noun in the evening/noun.',
      choices: JOBS4,
      pattern: l('"usually" (how often) sits just before the main verb "study".', '"usually" (কতবার) ঠিক main verb "study"-এর আগে বসে।'),
    }),
    {
      kind: 'concept',
      title: l('Where adverbs go', 'Adverb কোথায় বসে'),
      body: l('How-often adverbs (always, usually, often, sometimes, never) go before the main verb but after "be": I usually walk. I am usually late. Adverbs of manner (carefully, quickly) usually go after the verb + object: She checked the answers carefully. Never put an adverb between a verb and its object.', 'কতবার বোঝানো adverb (always, usually, often, sometimes, never) main verb-এর আগে বসে, কিন্তু "be"-এর পরে: I usually walk। I am usually late। কীভাবে বোঝানো adverb (carefully, quickly) সাধারণত verb + object-এর পরে বসে: She checked the answers carefully। Verb আর তার object-এর মাঝে কখনো adverb বসিয়ো না।'),
      points: [
        l('Sentence adverbs go first, with a comma: Unfortunately, …  Generally, …', 'পুরো sentence-এর adverb শুরুতে, comma দিয়ে: Unfortunately, …  Generally, …'),
        l('With helping verbs: I have never been abroad. (after have / can / will)', 'Helping verb থাকলে: I have never been abroad। (have / can / will-এর পরে)'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'I always drink tea in the morning.', note: l('before the main verb', 'main verb-এর আগে') },
        { en: 'She is never late.', note: l('after "be"', '"be"-এর পরে') },
        { en: 'He explained the problem clearly.', note: l('after verb + object', 'verb + object-এর পরে') },
        { en: 'Unfortunately, the bus was cancelled.', note: l('sentence adverb + comma', 'sentence adverb + comma') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'speaking', example: 'I usually go to the gym three times a week.', note: l('"How often…?" questions in Part 1 need frequency adverbs in the right place.', 'Part 1-এর "How often…?" প্রশ্নে frequency adverb ঠিক জায়গায় লাগে।') },
        { skill: 'writing', example: 'Generally, older people prefer printed newspapers.', note: l('Task 2: sentence adverbs make your claims careful.', 'Task 2: sentence adverb তোমার দাবিকে সতর্ক করে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'I like very much cricket.', right: 'I like cricket very much.', why: l('Not between the verb and its object.', 'Verb আর object-এর মাঝে না।') },
        { wrong: 'Always I go to school by bus.', right: 'I always go to school by bus.', why: l('Frequency adverbs go before the main verb.', 'Frequency adverb main verb-এর আগে বসে।') },
        { wrong: 'She speaks well English.', right: 'She speaks English well.', why: l('Verb + object, then the adverb.', 'আগে verb + object, তারপর adverb।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pv-3-p1', C, { prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'), options: ['I often watch English films.', 'I watch often English films.', 'Often I watch English films often.'], answer: 'I often watch English films.', explanation: l('often → before the main verb watch.', 'often → main verb watch-এর আগে।') }),
        choice('pv-3-p2', C, { prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'), options: ['She is always on time.', 'She always is on time.'], answer: 'She is always on time.', explanation: l('After "be": is always.', '"be"-এর পরে: is always।') }),
        choice('pv-3-p3', C, { prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'), options: ['He speaks English fluently.', 'He speaks fluently English.'], answer: 'He speaks English fluently.', explanation: l('verb + object + adverb.', 'verb + object + adverb।') }),
        choice('pv-3-p4', C, { prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'), options: ['I have never been to Sylhet.', 'I have been never to Sylhet.', 'Never I have been to Sylhet.'], answer: 'I have never been to Sylhet.', explanation: l('After the helping verb "have".', 'Helping verb "have"-এর পরে।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        correct('pv-3-r1', C, { prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে আবার লেখো।'), sentence: 'I like very much football.', accepted: ['I like football very much.', 'I really like football.', 'I like football a lot.'], explanation: l('I like football very much.', 'I like football very much।') }),
        correct('pv-3-r2', C, { prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে আবার লেখো।'), sentence: 'Usually I go to bed late.', accepted: ['I usually go to bed late.', 'Usually, I go to bed late.'], explanation: l('I usually go… (Usually at the start with a comma is also possible.)', 'I usually go… (শুরুতে comma দিয়ে Usually-ও চলে।)') }),
        correct('pv-3-r3', C, { prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে আবার লেখো।'), sentence: 'She checked carefully her answers.', accepted: ['She checked her answers carefully.', 'She carefully checked her answers.'], explanation: l('Not between the verb and its object.', 'Verb আর object-এর মাঝে না।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pv-3-c1', C, { prompt: l('Why is "I watch often films" wrong?', '"I watch often films" ভুল কেন?'), options: ['"often" is between the verb and its object', '"often" must go at the end of every sentence', '"films" should be singular'], answer: '"often" is between the verb and its object', explanation: l('Say "I often watch films."', 'বলো "I often watch films."') }),
        choice('pv-3-c2', C, { prompt: l('Task 2: choose the best start.', 'Task 2: সবচেয়ে ভালো শুরুটা বাছো।'), options: ['Generally, young people adapt quickly to new technology.', 'Young people generally adapt to new quickly technology.', 'Young people adapt generally quickly to new technology generally.'], answer: 'Generally, young people adapt quickly to new technology.', explanation: l('Sentence adverb first with a comma; quickly after the verb.', 'Sentence adverb শুরুতে comma দিয়ে; quickly verb-এর পরে।') }),
        spot('pv-3-c3', C, { sentence: 'I go always to the library on Fridays.', wrong: 'go', accepted: ['always go'], fixOptions: ['always go', 'going always', 'went always'], explanation: l('"always" goes before the main verb: I always go.', '"always" main verb-এর আগে: I always go।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pv-3-w1', C, {
          prompt: l('Speaking Part 1: "How often do you read?" Answer in one or two sentences with a frequency adverb.', 'Speaking Part 1: "How often do you read?" একটা frequency adverb দিয়ে এক-দুই sentence-এ উত্তর দাও।'),
          model: 'I usually read the news on my phone every morning, but I rarely read printed books these days.',
          task: 'The student answers "How often do you read?" using frequency adverbs (always, usually, often, sometimes, rarely, never). Check adverb position: before the main verb, after be and after helping verbs, never between the verb and its object.',
          target: l('A frequency adverb in the right place', 'ঠিক জায়গায় একটা frequency adverb'),
          checklist: [l('The adverb is before the main verb (or after "be")', 'Adverb main verb-এর আগে (অথবা "be"-এর পরে)'), l('No adverb between the verb and its object', 'Verb আর object-এর মাঝে কোনো adverb নেই')],
          explanation: l('I usually read… / I am rarely bored…', 'I usually read… / I am rarely bored…'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('always / usually / never: before the main verb, after be and helping verbs.', 'always / usually / never: main verb-এর আগে, be আর helping verb-এর পরে।'),
        l('Never between a verb and its object: I like cricket very much.', 'Verb আর object-এর মাঝে কখনো না: I like cricket very much।'),
      ],
    },
  ],
};

// ======================================================================= 4
const v4: Lesson = {
  id: 'pv-4', unit: 'adverb', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'grammar',
  title: l('Adverbs in IELTS', 'IELTS-এ adverb'),
  why: l('Task 1 trends and careful Task 2 claims both depend on adverbs.', 'Task 1-এর trend আর Task 2-এর সতর্ক দাবি, দুটোই adverb-এর উপর নির্ভর করে।'),
  steps: [
    {
      kind: 'hook',
      title: l('Two ways to describe a trend', 'Trend বলার দুটো উপায়'),
      situation: l('A chart: the number of tourists went up a little each year. Which pair is correct?', 'একটা chart: পর্যটকের সংখ্যা প্রতি বছর একটু একটু করে বেড়েছে। কোন জোড়াটা সঠিক?'),
      question: l('Choose the correct pair.', 'সঠিক জোড়াটা বাছো।'),
      options: ['rose gradually / a gradual rise', 'rose gradual / a gradually rise', 'rose gradually / a gradually rise'], answer: 'rose gradually / a gradual rise',
      diagnose: {
        'rose gradually / a gradual rise': l('Right. verb + adverb, or adjective + noun.', 'ঠিক। verb + adverb, অথবা adjective + noun।'),
        'rose gradual / a gradually rise': l('Both are swapped. The verb takes the adverb; the noun takes the adjective.', 'দুটোই উল্টে গেছে। Verb-এর সাথে adverb; noun-এর সাথে adjective।'),
        'rose gradually / a gradually rise': l('The first is right. "rise" here is a noun, so "a gradual rise".', 'প্রথমটা ঠিক। এখানে "rise" noun, তাই "a gradual rise"।'),
      },
    },
    identify({
      sentence: 'Car ownership/noun increased/verb steadily/adverb, while bus use/noun declined/verb slightly/adverb.',
      choices: JOBS4,
      pattern: l('Task 1 pattern: noun (what) + verb (the change) + adverb (how much / how fast).', 'Task 1 pattern: noun (কী) + verb (পরিবর্তন) + adverb (কতটা / কত দ্রুত)।'),
    }),
    {
      kind: 'concept',
      title: l('Two jobs for adverbs in IELTS', 'IELTS-এ adverb-এর দুটো কাজ'),
      body: l('1) Task 1 trends: verb + adverb shows the size and speed of a change: rose sharply, fell slightly, increased steadily, fluctuated wildly. 2) Task 2 and Speaking: adverbs make claims careful and fair: generally, often, arguably, probably, in most cases.', '১) Task 1-এর trend: verb + adverb পরিবর্তনের মাপ আর গতি দেখায়: rose sharply, fell slightly, increased steadily, fluctuated wildly। ২) Task 2 আর Speaking: adverb দাবিকে সতর্ক আর ন্যায্য করে: generally, often, arguably, probably, in most cases।'),
      points: [
        l('Size: slightly < moderately < significantly < sharply / dramatically.', 'মাপ: slightly < moderately < significantly < sharply / dramatically।'),
        l('Speed: gradually, steadily, rapidly, suddenly.', 'গতি: gradually, steadily, rapidly, suddenly।'),
        l('"All young people are addicted to phones" is easy to attack. "Many young people often use phones too much" is fairer.', '"All young people are addicted to phones" দুর্বল দাবি। "Many young people often use phones too much" বেশি ন্যায্য।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'Unemployment fell slightly in 2019 and then rose sharply.', note: l('size of each change', 'প্রতিটা পরিবর্তনের মাপ') },
        { en: 'The number of students increased steadily over the decade.', note: l('speed: steadily', 'গতি: steadily') },
        { en: 'Online learning is arguably more flexible than classroom learning.', note: l('Task 2: a careful claim', 'Task 2: সতর্ক দাবি') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where you will use this', 'কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'Sales rose dramatically between 2015 and 2020.', note: l('Task 1: pick the adverb that matches the chart.', 'Task 1: chart-এর সাথে মেলে এমন adverb বাছো।') },
        { skill: 'writing', example: 'Technology has generally improved communication.', note: l('Task 2: careful language is part of a strong argument.', 'Task 2: সতর্ক ভাষা শক্ত argument-এর অংশ।') },
        { skill: 'speaking', example: 'I probably spend too much time on my phone.', note: l('Part 3: sound thoughtful, not absolute.', 'Part 3: চিন্তাশীল শোনাও, একরোখা না।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'The price increased significant.', right: 'The price increased significantly.', why: l('verb + adverb.', 'verb + adverb।') },
        { wrong: 'There was a sharply decrease.', right: 'There was a sharp decrease.', why: l('noun + adjective.', 'noun + adjective।') },
        { wrong: 'Everyone always uses social media.', right: 'Most young people use social media regularly.', why: l('Absolute claims are easy to attack. Be careful and precise.', 'একরোখা দাবি সহজে ভুল প্রমাণ হয়। সতর্ক আর নির্দিষ্ট হও।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pv-4-p1', C, { prompt: l('The line drops a little. Choose the best adverb.', 'Line-টা একটু নিচে নেমেছে। সবচেয়ে ভালো adverb বাছো।'), sentence: 'Profits fell ______ in March.', options: ['slightly', 'dramatically', 'sharply'], answer: 'slightly', explanation: l('A small change → slightly.', 'ছোট পরিবর্তন → slightly।') }),
        choice('pv-4-p2', C, { prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'The population increased ______ over the century.', options: ['steady', 'steadily'], answer: 'steadily', pos: 'adverb', wrongPos: { steady: 'adjective' }, family: 'steady', explanation: l('"increased" is a verb → steadily.', '"increased" verb → steadily।') }),
        choice('pv-4-p3', C, { prompt: l('Choose the more careful claim for Task 2.', 'Task 2-এর জন্য বেশি সতর্ক দাবিটা বাছো।'), options: ['Social media is often harmful to teenagers.', 'Social media always destroys teenagers.'], answer: 'Social media is often harmful to teenagers.', explanation: l('"often" makes the claim fair and easy to support.', '"often" দাবিটাকে ন্যায্য আর সমর্থনযোগ্য করে।') }),
        choice('pv-4-p4', C, { prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'There was a ______ drop in rainfall.', options: ['dramatic', 'dramatically'], answer: 'dramatic', pos: 'adjective', wrongPos: { dramatically: 'adverb' }, family: 'dramatic', explanation: l('"drop" is a noun here → adjective.', 'এখানে "drop" noun → adjective।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pv-4-r1', C, { prompt: l('Write the adverb form of the word in brackets.', 'Bracket-এর word-এর adverb form লেখো।'), base: 'gradual', sentence: 'The number of cyclists rose ___ between 2010 and 2020.', accepted: ['gradually'], pos: 'adverb', wrongPos: { gradual: 'adjective' }, family: 'gradual', explanation: l('verb "rose" + adverb gradually.', 'verb "rose" + adverb gradually।') }),
        correct('pv-4-r2', C, { prompt: l('Rewrite with verb + adverb.', 'verb + adverb দিয়ে আবার লেখো।'), sentence: 'There was a sharp fall in sales.', accepted: ['Sales fell sharply.', 'Sales dropped sharply.', 'Sales decreased sharply.', 'Sales declined sharply.'], explanation: l('a sharp fall → fell sharply.', 'a sharp fall → fell sharply।') }),
        spot('pv-4-r3', C, { sentence: 'The number of visitors decreased significant in winter.', wrong: 'significant', accepted: ['significantly'], pos: 'adverb', wrongPos: { significant: 'adjective' }, family: 'significant', explanation: l('verb "decreased" + adverb significantly.', 'verb "decreased" + adverb significantly।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pv-4-c1', C, { prompt: l('Why "increased steadily" but "a steady increase"?', '"increased steadily" কিন্তু "a steady increase" কেন?'), options: ['In the first "increased" is a verb; in the second "increase" is a noun', 'Both mean different things', '"steadily" is only used in Speaking'], answer: 'In the first "increased" is a verb; in the second "increase" is a noun', explanation: l('Verb → adverb; noun → adjective.', 'Verb → adverb; noun → adjective।') }),
        spot('pv-4-c2', C, { sentence: 'Exports fluctuated wild throughout the year.', wrong: 'wild', accepted: ['wildly'], fixOptions: ['wildly', 'wilder', 'wildness'], pos: 'adverb', wrongPos: { wilder: 'adjective', wildness: 'noun' }, explanation: l('verb "fluctuated" + adverb wildly.', 'verb "fluctuated" + adverb wildly।') }),
        choice('pv-4-c3', C, { prompt: l('Reading: which sentence has the same meaning as "Sales rose dramatically"?', 'Reading: "Sales rose dramatically"-এর সমান অর্থ কোনটা?'), options: ['There was a sharp increase in sales.', 'Sales increased slightly.', 'Sales stayed the same.'], answer: 'There was a sharp increase in sales.', explanation: l('rose dramatically ≈ a sharp increase.', 'rose dramatically ≈ a sharp increase।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pv-4-w1', C, {
          prompt: l('Task 1: describe this trend in one sentence with verb + adverb: "Mobile banking users: 2 million (2015) → 10 million (2020)".', 'Task 1: verb + adverb দিয়ে এই trend-টা এক sentence-এ লেখো: "Mobile banking users: 2 million (2015) → 10 million (2020)"।'),
          model: 'The number of mobile banking users rose dramatically from 2 million in 2015 to 10 million in 2020.',
          task: 'The student describes the trend "mobile banking users rose from 2 million in 2015 to 10 million in 2020" in one sentence using a verb + adverb (e.g. rose dramatically). Check adverb form and choice, the verb tense (past), and the use of from/to/in with the figures.',
          target: l('verb + adverb (rose dramatically)', 'verb + adverb (rose dramatically)'),
          checklist: [l('I used a verb and an adverb for the change', 'পরিবর্তনের জন্য verb আর adverb ব্যবহার করেছি'), l('I gave the figures with from … to …', 'from … to … দিয়ে সংখ্যাগুলো দিয়েছি')],
          explanation: l('rose dramatically from … to …', 'rose dramatically from … to …'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Task 1: verb + adverb (rose sharply) or adjective + noun (a sharp rise). Never mix them.', 'Task 1: verb + adverb (rose sharply) অথবা adjective + noun (a sharp rise)। কখনো মিশিয়ো না।'),
        l('Task 2: often, generally, arguably make your claims fair.', 'Task 2: often, generally, arguably তোমার দাবিকে ন্যায্য করে।'),
      ],
    },
  ],
};

export const posAdverbLessons: Lesson[] = [v1, v2, v3, v4];

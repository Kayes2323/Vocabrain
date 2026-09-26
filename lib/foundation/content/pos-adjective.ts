import type { Lesson } from '../model';
import { choice, correct, gap, identify, JOBS3, JOBS4, l, spot, tagWords, write } from './pos-kit';

/** Parts of Speech · Adjective: 4 lessons. Original Vocab Brain content. */
const C = 'pos-adjective';

// ======================================================================= 1
const a1: Lesson = {
  id: 'pa-1', unit: 'adjective', format: 'v2', concept: C, minutes: 5, difficulty: 'easy', skill: 'grammar',
  title: l('What is an adjective?', 'Adjective কী?'),
  why: l('Adjectives make your Writing and Speaking precise: "a serious problem", not just "a problem".', 'Adjective Writing আর Speaking-কে নির্দিষ্ট করে: শুধু "a problem" না, "a serious problem"।'),
  steps: [
    {
      kind: 'hook',
      title: l('Describing your home', 'নিজের বাসা নিয়ে বলা'),
      situation: l('Speaking Part 1: "Describe your home." Rumi says: "My home is very beauty."', 'Speaking Part 1: "Describe your home." Rumi বললো: "My home is very beauty."'),
      question: l('What should Rumi say?', 'Rumi-র কী বলা উচিত?'),
      options: ['very beautiful', 'very beauty', 'very beautifully'], answer: 'very beautiful',
      diagnose: {
        'very beautiful': l('Right. After "is" we describe the home: an adjective, beautiful.', 'ঠিক। "is"-এর পরে বাসাটাকে describe করছি: adjective, beautiful।'),
        'very beauty': l('"beauty" is a noun (the idea). To describe the home we need the adjective: beautiful.', '"beauty" হলো noun (idea-টা)। বাসাটাকে describe করতে adjective লাগে: beautiful।'),
        'very beautifully': l('"beautifully" describes an action (she sings beautifully). Here we describe a thing.', '"beautifully" কাজকে describe করে (she sings beautifully)। এখানে একটা জিনিসকে describe করছি।'),
      },
    },
    identify({
      sentence: 'Dhaka/noun is/verb a busy/adjective city/noun with delicious/adjective food/noun.',
      choices: JOBS3,
      pattern: l('"busy" and "delicious" tell us more about the nouns city and food. That is the job of an adjective.', '"busy" আর "delicious" noun city আর food সম্পর্কে বাড়তি তথ্য দেয়। এটাই adjective-এর কাজ।'),
    }),
    {
      kind: 'concept',
      title: l('What is an adjective?', 'Adjective কী?'),
      body: l('An adjective gives more information about a noun: a busy city, an important decision, a difficult problem. It usually goes before the noun, or after verbs like be, seem, look, feel, become.', 'Adjective হলো এমন word যা noun সম্পর্কে অতিরিক্ত তথ্য দেয়: a busy city, an important decision, a difficult problem। সাধারণত noun-এর আগে বসে, অথবা be, seem, look, feel, become-এর মতো verb-এর পরে।'),
      points: [
        l('Before a noun: a cheap ticket. After be/seem/become: The ticket is cheap.', 'Noun-এর আগে: a cheap ticket। be/seem/become-এর পরে: The ticket is cheap।'),
        l('Adjectives never take -s: "different countries", not "differents countries".', 'Adjective-এ কখনো -s বসে না: "different countries", "differents countries" না।'),
        l('Common endings: -ful, -ous, -ive, -al, -able, -ic (useful, famous, expensive, natural, reliable, economic).', 'Common ending: -ful, -ous, -ive, -al, -able, -ic (useful, famous, expensive, natural, reliable, economic)।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'It was an important decision.', note: l('before the noun', 'noun-এর আগে') },
        { en: 'The exam seemed difficult.', note: l('after "seem"', '"seem"-এর পরে') },
        { en: 'Public transport is cheap and reliable.', note: l('after "is"', '"is"-এর পরে') },
        { en: 'There are different opinions.', note: l('no -s on "different"', '"different"-এ -s নেই') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'speaking', example: 'My hometown is small but lively.', note: l('Part 1 answers get better with one or two precise adjectives.', 'Part 1-এর উত্তর এক-দুটো নির্দিষ্ট adjective দিলে ভালো হয়।') },
        { skill: 'writing', example: 'This is a serious problem in many developing countries.', note: l('Task 2: adjectives show how strong your point is.', 'Task 2: adjective দেখায় তোমার point কতটা জোরালো।') },
        { skill: 'reading', example: 'The results were surprising.', note: l('Adjectives often carry the writer’s opinion, which True/False/Not Given questions test.', 'Adjective প্রায়ই লেখকের মতামত বহন করে, যা True/False/Not Given-এ পরীক্ষা করা হয়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'My home is very beauty.', right: 'My home is very beautiful.', why: l('beauty is the noun; beautiful describes.', 'beauty noun; beautiful describe করে।') },
        { wrong: 'There are many differents ideas.', right: 'There are many different ideas.', why: l('Adjectives never take -s.', 'Adjective-এ কখনো -s বসে না।') },
        { wrong: 'It is a problem serious.', right: 'It is a serious problem.', why: l('In English the adjective comes before the noun.', 'English-এ adjective noun-এর আগে বসে।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pa-1-p1', C, {
          prompt: l('Choose the adjective.', 'Adjective-টা বাছো।'), sentence: 'Sylhet is a ______ place to visit.', options: ['beauty', 'beautiful', 'beautifully'], answer: 'beautiful',
          pos: 'adjective', wrongPos: { beauty: 'noun', beautifully: 'adverb' }, family: 'beauty',
          explanation: l('Before the noun "place" we need an adjective: beautiful.', 'Noun "place"-এর আগে adjective লাগে: beautiful।'),
        }),
        tagWords('pa-1-p2', C, {
          sentence: 'Online/adjective courses/noun are/verb cheap/adjective and flexible/adjective.', choices: JOBS3,
          explanation: l('cheap and flexible come after "are" and describe the courses: adjectives.', 'cheap আর flexible "are"-এর পরে বসে courses-কে describe করছে: adjective।'),
        }),
        choice('pa-1-p3', C, {
          prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'),
          options: ['There are many differents opinions.', 'There are many different opinions.', 'There are many opinions differents.'], answer: 'There are many different opinions.',
          explanation: l('Adjectives never take -s, and they go before the noun.', 'Adjective-এ -s বসে না, আর এটা noun-এর আগে বসে।'),
        }),
        choice('pa-1-p4', C, {
          prompt: l('Choose the word that fits.', 'যে word-টা বসবে সেটা বাছো।'), sentence: 'The test looked ______.', options: ['easy', 'easily'], answer: 'easy',
          pos: 'adjective', wrongPos: { easily: 'adverb' },
          explanation: l('"look" here means "seem", so it is followed by an adjective: easy.', 'এখানে "look" মানে "seem", তাই এর পরে adjective: easy।'),
          why: { easily: l('"easily" describes how someone does something. Here we describe the test.', '"easily" বোঝায় কেউ কীভাবে কিছু করে। এখানে test-টাকে describe করছি।') },
        }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pa-1-r1', C, { prompt: l('Write the adjective form.', 'Adjective form লেখো।'), base: 'danger', sentence: 'Driving fast in the rain is ___.', accepted: ['dangerous'], pos: 'adjective', wrongPos: { danger: 'noun', dangerously: 'adverb' }, family: 'danger', explanation: l('After "is" we describe: dangerous.', '"is"-এর পরে describe করছি: dangerous।') }),
        gap('pa-1-r2', C, { prompt: l('Write the adjective form.', 'Adjective form লেখো।'), base: 'use', sentence: 'This app is very ___ for learning words.', accepted: ['useful'], pos: 'adjective', wrongPos: { use: 'noun', usefully: 'adverb', usefulness: 'noun' }, family: 'use', explanation: l('After "very" + "is": the adjective useful.', '"is" + "very"-এর পরে adjective useful।') }),
        spot('pa-1-r3', C, { sentence: 'My village is very beauty in winter.', wrong: 'beauty', accepted: ['beautiful'], pos: 'adjective', wrongPos: { beautifully: 'adverb' }, family: 'beauty', explanation: l('To describe the village: beautiful.', 'গ্রামটাকে describe করতে: beautiful।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pa-1-c1', C, {
          prompt: l('Why is "cheap" an adjective here?', 'এখানে "cheap" adjective কেন?'), sentence: 'Bus tickets are cheap.',
          options: ['It describes the noun "tickets"', 'It describes the verb "are"', 'It is the name of a thing'], answer: 'It describes the noun "tickets"',
          explanation: l('After "are", "cheap" tells us about the tickets.', '"are"-এর পরে "cheap" tickets সম্পর্কে বলছে।'),
        }),
        spot('pa-1-c2', C, { sentence: 'It is a very success business.', wrong: 'success', accepted: ['successful'], fixOptions: ['successful', 'successfully', 'succeed'], pos: 'adjective', wrongPos: { successfully: 'adverb', succeed: 'verb' }, family: 'success', explanation: l('Before the noun "business": the adjective successful.', 'Noun "business"-এর আগে adjective successful।') }),
        tagWords('pa-1-c3', C, { sentence: 'The new/adjective library/noun looks/verb modern/adjective.', choices: JOBS3, explanation: l('new (before library) and modern (after looks) are adjectives.', 'new (library-র আগে) আর modern (looks-এর পরে) adjective।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pa-1-w1', C, {
          prompt: l('Speaking Part 1: describe your home or your street in one sentence, with two adjectives.', 'Speaking Part 1: তোমার বাসা বা রাস্তাটা এক sentence-এ describe করো, দুটো adjective দিয়ে।'),
          model: 'My home is small but comfortable, and my street is quiet at night.',
          task: 'The student describes their home or street in one sentence using at least two adjectives. Check that adjectives (not nouns or adverbs) are used, placed before nouns or after be/seem/look, and have no -s.',
          target: l('Two adjectives', 'দুটো adjective'),
          checklist: [l('I used two adjectives', 'দুটো adjective ব্যবহার করেছি'), l('No adverb (-ly) where I describe a thing', 'জিনিসকে describe করতে -ly adverb ব্যবহার করিনি')],
          explanation: l('Adjectives describe nouns: a quiet street, the street is quiet.', 'Adjective noun-কে describe করে: a quiet street, the street is quiet।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('An adjective describes a noun: before it (a busy city) or after be / seem / look (the city is busy).', 'Adjective noun-কে describe করে: noun-এর আগে (a busy city) অথবা be / seem / look-এর পরে (the city is busy)।'),
        l('Adjectives never take -s.', 'Adjective-এ কখনো -s বসে না।'),
      ],
    },
  ],
};

// ======================================================================= 2
const a2: Lesson = {
  id: 'pa-2', unit: 'adjective', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'grammar',
  title: l('Comparing things', 'তুলনা করা'),
  why: l('Task 1 is all about comparing: higher than, the most popular, twice as high as.', 'Task 1-এর পুরোটাই তুলনা: higher than, the most popular, twice as high as।'),
  steps: [
    {
      kind: 'hook',
      title: l('A Task 1 sentence', 'একটা Task 1 sentence'),
      situation: l('A chart shows that trains carried 40% of commuters and buses 25%. Mahi writes: "Trains were more popular than buses."', 'একটা chart-এ দেখা যাচ্ছে train ৪০% আর bus ২৫% যাত্রী বহন করেছে। Mahi লিখলো: "Trains were more popular than buses."'),
      question: l('Is Mahi’s comparison correct?', 'Mahi-র তুলনাটা কি ঠিক?'),
      options: ['Yes, it is correct', 'No, it should be "popularer"', 'No, it should be "more popularer"'], answer: 'Yes, it is correct',
      diagnose: {
        'Yes, it is correct': l('Right. Long adjectives use "more … than".', 'ঠিক। লম্বা adjective-এ "more … than" হয়।'),
        'No, it should be "popularer"': l('-er is for short adjectives (cheap → cheaper). popular is long, so "more popular".', '-er ছোট adjective-এর জন্য (cheap → cheaper)। popular লম্বা, তাই "more popular"।'),
        'No, it should be "more popularer"': l('Never use "more" and -er together.', '"more" আর -er কখনো একসাথে না।'),
      },
    },
    identify({
      sentence: 'Trains/noun are/verb faster/adjective than buses/noun, but buses/noun are/verb cheaper/adjective.',
      choices: JOBS3,
      pattern: l('"faster" and "cheaper" are still adjectives. The -er ending compares two things.', '"faster" আর "cheaper" এখনো adjective। -er ending দুটো জিনিসের তুলনা করে।'),
    }),
    {
      kind: 'concept',
      title: l('Comparative and superlative', 'Comparative আর superlative'),
      body: l('To compare two things: short adjective + -er + than (cheaper than), long adjective: more + adjective + than (more expensive than). To pick one from a group: the + -est (the cheapest) or the most + adjective (the most expensive).', 'দুটো জিনিস তুলনা করতে: ছোট adjective + -er + than (cheaper than), লম্বা adjective: more + adjective + than (more expensive than)। একটা group থেকে একটাকে বাছতে: the + -est (the cheapest) অথবা the most + adjective (the most expensive)।'),
      points: [
        l('Irregular: good → better → the best; bad → worse → the worst; far → further → the furthest.', 'Irregular: good → better → the best; bad → worse → the worst; far → further → the furthest।'),
        l('Equal: as + adjective + as (as high as). Less: less popular than.', 'সমান: as + adjective + as (as high as)। কম: less popular than।'),
        l('Never "more better" or "most cheapest".', 'কখনো "more better" বা "most cheapest" না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'Flats in Gulshan are more expensive than flats in Mirpur.', note: l('long adjective: more … than', 'লম্বা adjective: more … than') },
        { en: 'Football is the most popular sport in the survey.', note: l('superlative: the most', 'superlative: the most') },
        { en: 'The figure for 2020 was twice as high as in 2010.', note: l('as … as', 'as … as') },
        { en: 'Online classes are better for some students.', note: l('good → better', 'good → better') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'writing', example: 'Rice was the most widely eaten food, while bread was the least popular.', note: l('Task 1 overviews compare the highest and lowest.', 'Task 1-এর overview-তে সবচেয়ে বেশি আর কম তুলনা করা হয়।') },
        { skill: 'speaking', example: 'I think living in a village is healthier than living in a city.', note: l('Part 3 asks you to compare.', 'Part 3-এ তুলনা করতে বলা হয়।') },
        { skill: 'listening', example: 'The larger room is cheaper.', note: l('Comparisons often decide which option is the answer.', 'তুলনা থেকেই প্রায়ই বোঝা যায় কোন option উত্তর।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'This method is more better.', right: 'This method is better.', why: l('better already means "more good".', 'better মানেই "more good"।') },
        { wrong: 'It is the most cheapest option.', right: 'It is the cheapest option.', why: l('Use -est or most, never both.', '-est অথবা most, দুটো একসাথে না।') },
        { wrong: 'Buses are cheaper then trains.', right: 'Buses are cheaper than trains.', why: l('Compare with "than", not "then" (time).', 'তুলনায় "than", "then" (সময়) না।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pa-2-p1', C, { prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'A laptop is ______ than a phone.', options: ['more expensive', 'expensiver', 'most expensive'], answer: 'more expensive', explanation: l('Long adjective + than → more expensive than.', 'লম্বা adjective + than → more expensive than।') }),
        choice('pa-2-p2', C, { prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'Winter is the ______ season in Bangladesh.', options: ['coolest', 'most cool', 'cooler'], answer: 'coolest', explanation: l('Short adjective, one from a group → the coolest.', 'ছোট adjective, group থেকে একটা → the coolest।') }),
        choice('pa-2-p3', C, { prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'My English is ______ now than last year.', options: ['better', 'more better', 'gooder'], answer: 'better', explanation: l('good → better (irregular).', 'good → better (irregular)।') }),
        choice('pa-2-p4', C, { prompt: l('Task 1: choose the correct sentence.', 'Task 1: সঠিক sentence-টা বাছো।'), options: ['Sales in 2020 were twice as high as in 2010.', 'Sales in 2020 were twice as higher as in 2010.', 'Sales in 2020 were twice higher than as 2010.'], answer: 'Sales in 2020 were twice as high as in 2010.', explanation: l('as + base adjective + as.', 'as + মূল adjective + as।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pa-2-r1', C, { prompt: l('Write the right form of "cheap".', '"cheap"-এর ঠিক form লেখো।'), base: 'cheap', sentence: 'The bus is ___ than the train.', accepted: ['cheaper'], explanation: l('short adjective + -er + than.', 'ছোট adjective + -er + than।'), why: { 'more cheap': l('Short adjectives take -er: cheaper.', 'ছোট adjective-এ -er বসে: cheaper।') } }),
        gap('pa-2-r2', C, { prompt: l('Write the right form of "popular".', '"popular"-এর ঠিক form লেখো।'), base: 'popular', sentence: 'Cricket is the ___ sport in the country.', accepted: ['most popular'], explanation: l('the most + long adjective.', 'the most + লম্বা adjective।'), why: { popularest: l('Long adjectives use "most": the most popular.', 'লম্বা adjective-এ "most" লাগে: the most popular।') } }),
        spot('pa-2-r3', C, { sentence: 'Flights are expensiver than train tickets.', wrong: 'expensiver', accepted: ['more expensive'], explanation: l('expensive is a long adjective: more expensive than.', 'expensive লম্বা adjective: more expensive than।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pa-2-c1', C, { prompt: l('Why is it "more expensive" but "cheaper"?', '"more expensive" কিন্তু "cheaper" কেন?'), options: ['Long adjectives use more; short ones use -er', 'Expensive things always use more', 'Both can use either form'], answer: 'Long adjectives use more; short ones use -er', explanation: l('ex-pen-sive has three syllables; cheap has one.', 'ex-pen-sive-এ তিনটা syllable; cheap-এ একটা।') }),
        spot('pa-2-c2', C, { sentence: 'Traffic is more worse in the evening.', wrong: 'more', accepted: ['much', 'even', 'far'], fixOptions: ['much', 'most', 'very'], explanation: l('"worse" is already a comparative. "much worse" or "even worse" is fine; "more worse" is not.', '"worse" নিজেই comparative। "much worse" বা "even worse" ঠিক; "more worse" না।') }),
        choice('pa-2-c3', C, { prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: 'Buses are cheaper ______ trains.', options: ['than', 'then', 'as'], answer: 'than', explanation: l('Comparisons use "than".', 'তুলনায় "than" লাগে।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pa-2-w1', C, {
          prompt: l('Speaking Part 3: compare life in a village and in a city in one or two sentences.', 'Speaking Part 3: গ্রাম আর শহরের জীবন এক-দুই sentence-এ তুলনা করো।'),
          model: 'Life in a village is quieter and healthier, but the city is more convenient for work.',
          task: 'The student compares village and city life using comparative adjectives. Check comparative forms (-er vs more), no double comparatives (more better), and "than".',
          target: l('Two comparatives', 'দুটো comparative'),
          checklist: [l('I used -er for short adjectives and more for long ones', 'ছোট adjective-এ -er, লম্বাগুলোতে more ব্যবহার করেছি'), l('I wrote "than", not "then"', '"then" না, "than" লিখেছি')],
          explanation: l('quieter than, more convenient than.', 'quieter than, more convenient than।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Short: cheaper / the cheapest. Long: more expensive / the most expensive.', 'ছোট: cheaper / the cheapest। লম্বা: more expensive / the most expensive।'),
        l('good → better → best; bad → worse → worst. Never "more better".', 'good → better → best; bad → worse → worst। কখনো "more better" না।'),
      ],
    },
  ],
};

// ======================================================================= 3
const a3: Lesson = {
  id: 'pa-3', unit: 'adjective', format: 'v2', concept: C, minutes: 5, difficulty: 'medium', skill: 'grammar',
  title: l('-ed or -ing?', '-ed নাকি -ing?'),
  why: l('"I was boring in class" says something very different from what you mean.', '"I was boring in class" বললে তুমি যা বোঝাতে চাও তার একদম উল্টো শোনায়।'),
  steps: [
    {
      kind: 'hook',
      title: l('A Speaking answer', 'একটা Speaking উত্তর'),
      situation: l('Examiner: "Did you enjoy school?" Sadia: "Not really. I was very boring in maths class."', 'Examiner: "Did you enjoy school?" Sadia: "Not really. I was very boring in maths class."'),
      question: l('What does Sadia want to say?', 'Sadia কী বলতে চায়?'),
      options: ['I was bored', 'I was boring', 'Both mean the same'], answer: 'I was bored',
      diagnose: {
        'I was bored': l('Right. "bored" is how she felt.', 'ঠিক। "bored" হলো তার অনুভূতি।'),
        'I was boring': l('"I was boring" means other people found HER dull. Not what she means!', '"I was boring" মানে অন্যরা তাকেই বিরক্তিকর মনে করতো। সে এটা বোঝাতে চায়নি!'),
        'Both mean the same': l('They are opposite: -ed is how you feel, -ing is what causes it.', 'দুটো উল্টো: -ed হলো তোমার অনুভূতি, -ing হলো যা সেই অনুভূতি তৈরি করে।'),
      },
    },
    identify({
      sentence: 'The lecture/noun was/verb boring/adjective, so the students/noun felt/verb bored/adjective.',
      choices: JOBS3,
      pattern: l('Both "boring" and "bored" are adjectives. "boring" describes the lecture (the cause); "bored" describes the students (the feeling).', '"boring" আর "bored" দুটোই adjective। "boring" lecture-কে describe করে (কারণ); "bored" students-কে describe করে (অনুভূতি)।'),
    }),
    {
      kind: 'concept',
      title: l('Feeling or cause?', 'অনুভূতি নাকি কারণ?'),
      body: l('-ed adjectives describe how a person feels: bored, interested, tired, confused, excited. -ing adjectives describe the thing that causes the feeling: boring, interesting, tiring, confusing, exciting.', '-ed adjective বোঝায় একজন মানুষ কেমন অনুভব করছে: bored, interested, tired, confused, excited। -ing adjective বোঝায় যে জিনিস সেই অনুভূতি তৈরি করছে: boring, interesting, tiring, confusing, exciting।'),
      points: [
        l('Ask: is it a feeling inside a person (-ed) or the thing/person that makes others feel it (-ing)?', 'জিজ্ঞেস করো: এটা কি মানুষের ভেতরের অনুভূতি (-ed), নাকি যে জিনিস/মানুষ অন্যদের সেই অনুভূতি দেয় (-ing)?'),
        l('I am interested in science. Science is interesting.', 'I am interested in science। Science is interesting।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'The long journey was tiring. I was tired.', note: l('journey = cause; I = feeling', 'journey = কারণ; I = অনুভূতি') },
        { en: 'The instructions were confusing, so many students were confused.', note: l('confusing → confused', 'confusing → confused') },
        { en: 'I am interested in history because it is interesting.', note: l('interested in + topic', 'interested in + topic') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'speaking', example: 'I get really excited before a cricket match.', note: l('Feelings come up in almost every Part 1 and Part 2 answer.', 'প্রায় সব Part 1 আর Part 2-এর উত্তরে অনুভূতির কথা আসে।') },
        { skill: 'writing', example: 'The results were surprising.', note: l('Task 1 and Task 2: -ing adjectives describe data and ideas.', 'Task 1 আর Task 2: -ing adjective data আর idea-কে describe করে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'I was very boring in the class.', right: 'I was very bored in the class.', why: l('Your feeling → -ed.', 'তোমার অনুভূতি → -ed।') },
        { wrong: 'I am interesting in science.', right: 'I am interested in science.', why: l('"interested in" is your feeling.', '"interested in" তোমার অনুভূতি।') },
        { wrong: 'The film was very excited.', right: 'The film was very exciting.', why: l('The film causes the feeling → -ing.', 'Film-টা অনুভূতি তৈরি করে → -ing।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pa-3-p1', C, { prompt: l('Choose the right adjective.', 'ঠিক adjective-টা বাছো।'), sentence: 'I am ______ in learning new languages.', options: ['interested', 'interesting'], answer: 'interested', explanation: l('Your feeling → interested (in).', 'তোমার অনুভূতি → interested (in)।') }),
        choice('pa-3-p2', C, { prompt: l('Choose the right adjective.', 'ঠিক adjective-টা বাছো।'), sentence: 'The rules of the game were ______.', options: ['confused', 'confusing'], answer: 'confusing', explanation: l('The rules cause the feeling → confusing.', 'নিয়মগুলো অনুভূতি তৈরি করে → confusing।') }),
        choice('pa-3-p3', C, { prompt: l('Choose the right adjective.', 'ঠিক adjective-টা বাছো।'), sentence: 'After the long exam, we were all ______.', options: ['tired', 'tiring'], answer: 'tired', explanation: l('How we felt → tired.', 'আমরা কেমন অনুভব করছিলাম → tired।') }),
        choice('pa-3-p4', C, { prompt: l('Task 1: choose the right adjective.', 'Task 1: ঠিক adjective-টা বাছো।'), sentence: 'The rise in prices was ______.', options: ['surprised', 'surprising'], answer: 'surprising', explanation: l('The rise causes surprise → surprising.', 'বৃদ্ধিটা অবাক করে → surprising।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pa-3-r1', C, { prompt: l('Write the right form of "excite".', '"excite"-এর ঠিক form লেখো।'), base: 'excite', sentence: 'The children were ___ about the trip.', accepted: ['excited'], explanation: l('Their feeling → excited.', 'তাদের অনুভূতি → excited।'), why: { exciting: l('The trip is exciting; the children feel excited.', 'Trip-টা exciting; children excited অনুভব করে।') } }),
        gap('pa-3-r2', C, { prompt: l('Write the right form of "bore".', '"bore"-এর ঠিক form লেখো।'), base: 'bore', sentence: 'The speech was so ___ that people left early.', accepted: ['boring'], explanation: l('The speech causes the feeling → boring.', 'Speech-টা অনুভূতি তৈরি করে → boring।'), why: { bored: l('People feel bored; the speech is boring.', 'মানুষ bored অনুভব করে; speech-টা boring।') } }),
        spot('pa-3-r3', C, { sentence: 'I am very interesting in computer science.', wrong: 'interesting', accepted: ['interested'], explanation: l('Your feeling → interested in.', 'তোমার অনুভূতি → interested in।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pa-3-c1', C, { prompt: l('Why "tiring" in "The journey was tiring"?', '"The journey was tiring"-এ "tiring" কেন?'), options: ['The journey causes tiredness', 'The journey feels tired', 'Because it is in the past'], answer: 'The journey causes tiredness', explanation: l('-ing = the cause.', '-ing = কারণ।') }),
        spot('pa-3-c2', C, { sentence: 'The ending of the film was very shocked.', wrong: 'shocked', accepted: ['shocking'], fixOptions: ['shocking', 'shock', 'shockingly'], explanation: l('The ending causes shock → shocking.', 'শেষটা shock দেয় → shocking।') }),
        choice('pa-3-c3', C, { prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'), options: ['I felt embarrassing when I forgot her name.', 'I felt embarrassed when I forgot her name.'], answer: 'I felt embarrassed when I forgot her name.', explanation: l('Your feeling → embarrassed.', 'তোমার অনুভূতি → embarrassed।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pa-3-w1', C, {
          prompt: l('Write two sentences: something you find interesting, and how it makes you feel.', 'দুটো sentence লেখো: কোন জিনিস তোমার কাছে interesting, আর সেটা তোমাকে কেমন অনুভব করায়।'),
          model: 'Space science is fascinating. I get really excited when I read about new planets.',
          task: 'The student writes two sentences using -ed and -ing adjectives (e.g. interesting/interested, exciting/excited). Check that -ed describes a feeling and -ing describes the cause.',
          target: l('One -ing and one -ed adjective', 'একটা -ing আর একটা -ed adjective'),
          checklist: [l('-ed for my feeling', 'আমার অনুভূতির জন্য -ed'), l('-ing for the thing that causes it', 'কারণের জন্য -ing')],
          explanation: l('Science is interesting; I am interested in science.', 'Science is interesting; I am interested in science।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('-ed = how a person feels (bored, interested). -ing = what causes it (boring, interesting).', '-ed = মানুষ কেমন অনুভব করে (bored, interested)। -ing = যা সেটা তৈরি করে (boring, interesting)।'),
        l('I am interested IN something.', 'I am interested IN কোনো কিছু।'),
      ],
    },
  ],
};

// ======================================================================= 4
const a4: Lesson = {
  id: 'pa-4', unit: 'adjective', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'grammar',
  title: l('Adjectives in IELTS', 'IELTS-এ adjective'),
  why: l('Precise adjectives raise your Lexical Resource score.', 'নির্দিষ্ট adjective তোমার Lexical Resource score বাড়ায়।'),
  steps: [
    {
      kind: 'hook',
      title: l('Upgrade the answer', 'উত্তরটা আরো ভালো করো'),
      situation: l('Speaking Part 1: "What is your hometown like?" Answer: "It is a good place. The people are good and the food is good."', 'Speaking Part 1: "What is your hometown like?" উত্তর: "It is a good place. The people are good and the food is good."'),
      question: l('What is the problem?', 'সমস্যা কী?'),
      options: ['"good" is repeated and says very little', 'It has a grammar mistake', 'It is too long'], answer: '"good" is repeated and says very little',
      diagnose: {
        '"good" is repeated and says very little': l('Right. Try: a peaceful place, friendly people, delicious food.', 'ঠিক। চেষ্টা করো: a peaceful place, friendly people, delicious food।'),
        'It has a grammar mistake': l('The grammar is fine. The words are too general.', 'Grammar ঠিক আছে। Word গুলো খুব সাধারণ।'),
        'It is too long': l('Length is fine. Precise adjectives would make it much better.', 'দৈর্ঘ্য ঠিক আছে। নির্দিষ্ট adjective দিলে অনেক ভালো হতো।'),
      },
    },
    identify({
      sentence: 'There was/verb a slight/adjective increase/noun in unemployment/noun.',
      choices: JOBS3,
      pattern: l('In Task 1, adjectives like "slight", "sharp" and "steady" show HOW BIG a change was.', 'Task 1-এ "slight", "sharp", "steady"-এর মতো adjective দেখায় পরিবর্তন কতটা বড়।'),
    }),
    {
      kind: 'concept',
      title: l('Say exactly what you mean', 'ঠিক যা বোঝাতে চাও তাই বলো'),
      body: l('IELTS rewards precise words. Replace "good / bad / big / nice" with an adjective that says exactly what you mean. In Task 1, adjectives describe the size of a change: slight, gradual, steady, significant, sharp, dramatic.', 'IELTS নির্দিষ্ট word-এর জন্য নম্বর দেয়। "good / bad / big / nice"-এর বদলে এমন adjective দাও যা ঠিক তোমার কথাটা বলে। Task 1-এ adjective পরিবর্তনের মাপ বোঝায়: slight, gradual, steady, significant, sharp, dramatic।'),
      points: [
        l('good → friendly (people), delicious (food), peaceful (place), reliable (service), useful (advice).', 'good → friendly (people), delicious (food), peaceful (place), reliable (service), useful (advice)।'),
        l('bad → serious (problem), heavy (traffic), polluted (air), harmful (effects).', 'bad → serious (problem), heavy (traffic), polluted (air), harmful (effects)।'),
        l('Choose words you can use correctly. A simple correct adjective beats a rare wrong one.', 'যে word ঠিকভাবে ব্যবহার করতে পারো সেটাই বাছো। ভুল করে rare word-এর চেয়ে সহজ কিন্তু সঠিক adjective ভালো।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'There was a sharp rise in house prices.', note: l('sharp = big and fast', 'sharp = বড় আর দ্রুত') },
        { en: 'The number of visitors saw a gradual decline.', note: l('gradual = slow', 'gradual = ধীরে') },
        { en: 'Heavy traffic is a serious problem in Dhaka.', note: l('instead of "bad traffic", "big problem"', '"bad traffic", "big problem"-এর বদলে') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where you will use this', 'কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'a slight / steady / significant / sharp increase', note: l('Task 1: match the adjective to the size of the change on the chart.', 'Task 1: chart-এ পরিবর্তন যত বড়, সেই মাপের adjective দাও।') },
        { skill: 'speaking', example: 'My neighbourhood is quiet and green.', note: l('Part 1 and 2: two precise adjectives beat five "good"s.', 'Part 1 আর 2: পাঁচটা "good"-এর চেয়ে দুটো নির্দিষ্ট adjective ভালো।') },
        { skill: 'reading', example: '"a dramatic increase" = "a sharp rise"', note: l('Reading paraphrases adjectives with synonyms. Knowing them helps you match.', 'Reading-এ adjective-কে synonym দিয়ে বলা হয়। এগুলো জানলে মেলাতে সুবিধা হয়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'There was a big increase of prices.', right: 'There was a significant increase in prices.', why: l('"significant" is more precise; use "in" after increase.', '"significant" বেশি নির্দিষ্ট; increase-এর পরে "in"।') },
        { wrong: 'Traffic in Dhaka is very bad.', right: 'Traffic in Dhaka is very heavy.', why: l('Traffic is "heavy" in natural English.', 'স্বাভাবিক English-এ traffic "heavy" হয়।') },
        { wrong: 'It was a sharply rise.', right: 'It was a sharp rise.', why: l('Before a noun (rise): the adjective sharp.', 'Noun (rise)-এর আগে adjective sharp।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pa-4-p1', C, { prompt: l('The line goes up a lot in two years. Choose the best adjective.', 'দুই বছরে line অনেকটা উপরে উঠেছে। সবচেয়ে ভালো adjective বাছো।'), sentence: 'There was a ______ increase in sales.', options: ['sharp', 'slight', 'steady'], answer: 'sharp', explanation: l('A big, fast change → sharp.', 'বড় আর দ্রুত পরিবর্তন → sharp।') }),
        choice('pa-4-p2', C, { prompt: l('Choose the adjective (not the adverb).', 'Adjective-টা বাছো (adverb না)।'), sentence: 'There was a ______ fall in the birth rate.', options: ['gradual', 'gradually'], answer: 'gradual', pos: 'adjective', wrongPos: { gradually: 'adverb' }, explanation: l('Before the noun "fall": the adjective gradual.', 'Noun "fall"-এর আগে adjective gradual।') }),
        choice('pa-4-p3', C, { prompt: l('Choose the most precise word.', 'সবচেয়ে নির্দিষ্ট word-টা বাছো।'), sentence: 'The food at the festival was ______.', options: ['good', 'delicious', 'very good'], answer: 'delicious', explanation: l('"delicious" says exactly how the food was.', '"delicious" ঠিক বলে দেয় খাবারটা কেমন ছিল।') }),
        choice('pa-4-p4', C, { prompt: l('Choose the natural phrase.', 'স্বাভাবিক phrase-টা বাছো।'), sentence: 'In the evening there is ______ traffic.', options: ['heavy', 'big', 'strong'], answer: 'heavy', explanation: l('English says "heavy traffic".', 'English-এ "heavy traffic" বলে।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pa-4-r1', C, { prompt: l('Write the adjective form of the word in brackets.', 'Bracket-এর word-এর adjective form লেখো।'), base: 'significant', sentence: 'There was a ___ rise in the use of mobile phones.', accepted: ['significant'], pos: 'adjective', wrongPos: { significantly: 'adverb', significance: 'noun' }, family: 'significant', explanation: l('Before the noun "rise": the adjective significant.', 'Noun "rise"-এর আগে adjective significant।') }),
        spot('pa-4-r2', C, { sentence: 'There was a dramatically increase in prices.', wrong: 'dramatically', accepted: ['dramatic'], pos: 'adjective', wrongPos: { dramatically: 'adverb' }, family: 'dramatic', explanation: l('Before the noun "increase": the adjective dramatic.', 'Noun "increase"-এর আগে adjective dramatic।') }),
        gap('pa-4-r3', C, { prompt: l('Write one precise adjective instead of "good".', '"good"-এর বদলে একটা নির্দিষ্ট adjective লেখো।'), sentence: 'My neighbours are very ___: they always help us.', accepted: ['friendly', 'helpful', 'kind', 'generous', 'supportive', 'caring'], explanation: l('friendly or helpful says exactly what "good" means here.', 'friendly বা helpful ঠিক বোঝায় এখানে "good" মানে কী।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pa-4-c1', C, { prompt: l('Why "a sharp rise" and not "a sharply rise"?', '"a sharply rise" না হয়ে "a sharp rise" কেন?'), options: ['"rise" is a noun, so it needs an adjective', 'Adverbs cannot end in -ly', '"sharply" is only for Speaking'], answer: '"rise" is a noun, so it needs an adjective', explanation: l('Noun → adjective. Verb → adverb: "prices rose sharply".', 'Noun → adjective। Verb → adverb: "prices rose sharply"।') }),
        spot('pa-4-c2', C, { sentence: 'There was a steadily growth in tourism.', wrong: 'steadily', accepted: ['steady'], fixOptions: ['steady', 'steadiness', 'steadier'], pos: 'adjective', wrongPos: { steadiness: 'noun' }, family: 'steady', explanation: l('Before the noun "growth": steady.', 'Noun "growth"-এর আগে steady।') }),
        choice('pa-4-c3', C, { prompt: l('Reading: which phrase has the same meaning as "a dramatic increase"?', 'Reading: "a dramatic increase"-এর সমান অর্থ কোনটা?'), options: ['a sharp rise', 'a slight rise', 'a gradual fall'], answer: 'a sharp rise', explanation: l('dramatic ≈ sharp; increase ≈ rise.', 'dramatic ≈ sharp; increase ≈ rise।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pa-4-w1', C, {
          prompt: l('Speaking Part 1: "What is your hometown like?" Answer in two sentences without the word "good".', 'Speaking Part 1: "What is your hometown like?" "good" word ছাড়া দুই sentence-এ উত্তর দাও।'),
          model: 'My hometown, Rajshahi, is a peaceful and green city. The people are friendly and the mangoes are delicious.',
          task: 'The student answers "What is your hometown like?" in two sentences using precise adjectives and without the word "good". Check adjective choice (natural collocations), position before nouns / after be, and grammar.',
          target: l('Precise adjectives, no "good"', 'নির্দিষ্ট adjective, "good" নেই'),
          checklist: [l('I did not use "good", "bad" or "nice"', '"good", "bad" বা "nice" ব্যবহার করিনি'), l('Each adjective fits its noun naturally', 'প্রতিটা adjective তার noun-এর সাথে স্বাভাবিকভাবে মেলে')],
          explanation: l('peaceful city, friendly people, delicious food.', 'peaceful city, friendly people, delicious food।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Task 1 size: slight → gradual / steady → significant → sharp / dramatic.', 'Task 1-এ মাপ: slight → gradual / steady → significant → sharp / dramatic।'),
        l('Replace good / bad / big with the word that says exactly what you mean.', 'good / bad / big-এর বদলে এমন word দাও যা ঠিক তোমার কথাটা বলে।'),
      ],
    },
  ],
};

export const posAdjectiveLessons: Lesson[] = [a1, a2, a3, a4];

import type { Lesson } from '../model';
import { choice, correct, gap, identify, JOBS4, l, spot, tagWords, write } from './pos-kit';

/** Parts of Speech · Verb: 5 lessons. Tenses are taught in the Tenses module. Original Vocab Brain content. */
const C = 'pos-verb';

// ======================================================================= 1
const v1: Lesson = {
  id: 'pvb-1', unit: 'verb', format: 'v2', concept: C, minutes: 5, difficulty: 'easy', skill: 'grammar',
  title: l('What is a verb?', 'Verb কী?'),
  why: l('An English sentence without a verb is not a sentence, and examiners notice at once.', 'Verb ছাড়া English sentence আসলে sentence-ই না, আর examiner সাথে সাথে ধরে।'),
  steps: [
    {
      kind: 'hook',
      title: l('Introducing your family', 'পরিবারের পরিচয়'),
      situation: l('Speaking Part 1: "Tell me about your family." Arif says: "My brother a doctor. He very busy."', 'Speaking Part 1: "Tell me about your family." Arif বললো: "My brother a doctor. He very busy."'),
      question: l('What is missing in both sentences?', 'দুটো sentence-এই কী বাদ পড়েছে?'),
      options: ['the verb "is"', 'the word "the"', 'nothing'], answer: 'the verb "is"',
      diagnose: {
        'the verb "is"': l('Right. In Bangla we can say "আমার ভাই ডাক্তার" without a verb, but English needs one: My brother is a doctor.', 'ঠিক। বাংলায় "আমার ভাই ডাক্তার" verb ছাড়াই বলা যায়, কিন্তু English-এ verb লাগে: My brother is a doctor।'),
        'the word "the"': l('"a doctor" is fine. The sentence has no verb.', '"a doctor" ঠিক আছে। Sentence-টায় কোনো verb নেই।'),
        nothing: l('It is understood, but it is not correct English: every sentence needs a verb.', 'বোঝা যায়, কিন্তু সঠিক English না: প্রতিটা sentence-এ verb লাগে।'),
      },
    },
    identify({
      sentence: 'My sister/noun is/verb a nurse/noun and she works/verb at a busy/adjective hospital/noun.',
      choices: JOBS4.slice(0, 3),
      pattern: l('"is" and "works" are verbs. "works" is an action; "is" shows a state. Each part of the sentence has its own verb.', '"is" আর "works" verb। "works" একটা কাজ; "is" একটা অবস্থা বোঝায়। Sentence-এর প্রতিটা অংশে নিজের verb আছে।'),
    }),
    {
      kind: 'concept',
      title: l('What is a verb?', 'Verb কী?'),
      body: l('A verb shows an action (write, travel, study) or a state (be, have, seem, know, like). Every English sentence needs at least one verb. The verb changes with time and with the subject: she works, they worked.', 'Verb একটা কাজ (write, travel, study) অথবা একটা অবস্থা (be, have, seem, know, like) বোঝায়। প্রতিটা English sentence-এ অন্তত একটা verb লাগে। সময় আর subject অনুযায়ী verb বদলায়: she works, they worked।'),
      points: [
        l('"be" is a verb: am, is, are, was, were. Bangla often has no verb here, English always does.', '"be" একটা verb: am, is, are, was, were। বাংলায় এখানে প্রায়ই verb থাকে না, English-এ সবসময় থাকে।'),
        l('Quick test: can you change it to the past? (works → worked, is → was) Then it is a verb.', 'ছোট্ট test: past-এ বদলানো যায়? (works → worked, is → was) তাহলে এটা verb।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'My hometown is famous for its river.', note: l('is = state', 'is = অবস্থা') },
        { en: 'I usually study in the library.', note: l('study = action', 'study = কাজ') },
        { en: 'The chart shows the number of tourists.', note: l('shows = the main verb of a Task 1 sentence', 'shows = Task 1 sentence-এর main verb') },
        { en: 'Many people believe that exams are stressful.', note: l('two verbs: believe, are', 'দুটো verb: believe, are') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'speaking', example: 'My father is a teacher. He is very patient.', note: l('Part 1: dropping "is" is one of the most common errors for Bangla speakers.', 'Part 1: বাংলাভাষীদের সবচেয়ে common ভুলগুলোর একটা হলো "is" বাদ দেওয়া।') },
        { skill: 'writing', example: 'The graph shows how car ownership changed.', note: l('Task 1 opening sentences are built around one clear verb.', 'Task 1-এর প্রথম sentence একটা পরিষ্কার verb ঘিরে তৈরি হয়।') },
        { skill: 'reading', example: 'Find the verb to find what the sentence claims.', note: l('In long sentences, the main verb tells you the writer’s point.', 'লম্বা sentence-এ main verb-ই বলে দেয় লেখক কী বলছেন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'My brother a doctor.', right: 'My brother is a doctor.', why: l('English needs the verb "is".', 'English-এ verb "is" লাগে।') },
        { wrong: 'The weather very hot today.', right: 'The weather is very hot today.', why: l('Before an adjective we still need "is".', 'Adjective-এর আগেও "is" লাগে।') },
        { wrong: 'Many students worried about the exam.', right: 'Many students are worried about the exam.', why: l('"worried" describes the students: we need "are" before it.', '"worried" students-কে describe করছে: এর আগে "are" লাগে।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pvb-1-p1', C, { tag: 'verb', prompt: l('Which sentence is complete?', 'কোন sentence-টা সম্পূর্ণ?'), options: ['Dhaka a very big city.', 'Dhaka is a very big city.', 'Dhaka very big city.'], answer: 'Dhaka is a very big city.', explanation: l('A sentence needs a verb: is.', 'Sentence-এ verb লাগে: is।') }),
        choice('pvb-1-p2', C, { tag: 'verb', prompt: l('Which word is the verb?', 'কোন word-টা verb?'), sentence: 'The chart shows the population of three cities.', options: ['chart', 'shows', 'population'], answer: 'shows', pos: 'verb', wrongPos: { chart: 'noun', population: 'noun' }, explanation: l('"shows" is what the chart does.', '"shows" হলো chart যা করে।') }),
        tagWords('pvb-1-p3', C, { tag: 'verb', sentence: 'Young/adjective people/noun spend/verb hours/noun online/adverb and feel/verb tired/adjective.', choices: JOBS4, explanation: l('spend and feel are verbs; tired describes the people; online tells where.', 'spend আর feel verb; tired মানুষকে describe করে; online বলে কোথায়।') }),
        choice('pvb-1-p4', C, { tag: 'verb', prompt: l('Choose the missing word.', 'বাদ পড়া word-টা বাছো।'), sentence: 'My parents ______ very proud of me.', options: ['are', 'is', 'be'], answer: 'are', explanation: l('parents (plural) + are.', 'parents (plural) + are।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pvb-1-r1', C, { tag: 'verb', prompt: l('Write the missing verb.', 'বাদ পড়া verb-টা লেখো।'), sentence: 'My hometown ___ famous for its sweets.', accepted: ['is'], explanation: l('One hometown → is.', 'একটা hometown → is।') }),
        gap('pvb-1-r2', C, { tag: 'verb', prompt: l('Write the missing verb.', 'বাদ পড়া verb-টা লেখো।'), sentence: 'The students ___ nervous before the test yesterday.', accepted: ['were', 'felt', 'looked', 'seemed', 'got'], explanation: l('Past + plural: were (or felt).', 'Past + plural: were (বা felt)।') }),
        correct('pvb-1-r3', C, { tag: 'verb', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে আবার লেখো।'), sentence: 'My father a bank officer.', accepted: ['My father is a bank officer.', 'My father was a bank officer.'], explanation: l('Add the verb: is.', 'Verb যোগ করো: is।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pvb-1-c1', C, { tag: 'verb', prompt: l('Why is "The weather very hot." wrong?', '"The weather very hot." ভুল কেন?'), options: ['It has no verb', '"hot" should be "hotly"', '"weather" needs -s'], answer: 'It has no verb', explanation: l('The weather is very hot.', 'The weather is very hot।') }),
        spot('pvb-1-c2', C, { tag: 'verb', sentence: 'The city very crowded during Eid.', wrong: 'very', accepted: ['is very', 'gets very', 'becomes very'], fixOptions: ['is very', 'being very', 'to very'], explanation: l('Add the verb before "very": is very crowded.', '"very"-এর আগে verb দাও: is very crowded।') }),
        choice('pvb-1-c3', C, { tag: 'verb', prompt: l('How many verbs are in this sentence?', 'এই sentence-এ কয়টা verb?'), sentence: 'I think that online classes save time.', options: ['two: think, save', 'one: think', 'three: think, online, save'], answer: 'two: think, save', explanation: l('think and save are verbs; online describes classes.', 'think আর save verb; online classes-কে describe করে।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pvb-1-w1', C, {
          tag: 'verb',
          prompt: l('Speaking Part 1: introduce one family member in two sentences.', 'Speaking Part 1: পরিবারের একজনের পরিচয় দুই sentence-এ দাও।'),
          model: 'My mother is a school teacher. She loves reading and she cooks delicious food.',
          task: 'The student introduces a family member in two sentences. Check that every sentence has a verb (especially "is/are" before nouns and adjectives), subject–verb agreement and pronoun gender (he/she).',
          target: l('Every sentence has a verb', 'প্রতিটা sentence-এ verb আছে'),
          checklist: [l('Each sentence has a verb', 'প্রতিটা sentence-এ verb আছে'), l('I used "is" before a noun or adjective', 'Noun বা adjective-এর আগে "is" ব্যবহার করেছি')],
          explanation: l('My mother is… She loves…', 'My mother is… She loves…'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Every English sentence needs a verb.', 'প্রতিটা English sentence-এ verb লাগে।'),
        l('Where Bangla has no verb, English uses be: My brother is a doctor.', 'বাংলায় যেখানে verb নেই, English-এ be বসে: My brother is a doctor।'),
      ],
    },
  ],
};

// ======================================================================= 2
const v2: Lesson = {
  id: 'pvb-2', unit: 'verb', format: 'v2', concept: C, minutes: 5, difficulty: 'medium', skill: 'grammar',
  title: l('Main and helping verbs', 'Main আর helping verb'),
  why: l('"He don’t like" and "She can speaks" lower your grammar score.', '"He don’t like" আর "She can speaks" তোমার grammar score কমায়।'),
  steps: [
    {
      kind: 'hook',
      title: l('A Speaking answer', 'একটা Speaking উত্তর'),
      situation: l('Examiner: "Does your friend like sports?" Tahmid: "No, he don’t like sports, but he can plays chess."', 'Examiner: "Does your friend like sports?" Tahmid: "No, he don’t like sports, but he can plays chess."'),
      question: l('How many mistakes are there?', 'কয়টা ভুল আছে?'),
      options: ['two', 'one', 'none'], answer: 'two',
      diagnose: {
        two: l('Right: he doesn’t like, and he can play.', 'ঠিক: he doesn’t like, আর he can play।'),
        one: l('There are two: "don’t" should be "doesn’t", and after "can" the verb has no -s.', 'দুটো আছে: "don’t"-এর জায়গায় "doesn’t", আর "can"-এর পরে verb-এ -s বসে না।'),
        none: l('Look at "he don’t" and "can plays".', '"he don’t" আর "can plays" দেখো।'),
      },
    },
    identify({
      sentence: 'She does/verb not/adverb like/verb crowds,/noun but she can/verb speak/verb well./adverb',
      choices: JOBS4,
      pattern: l('"does" and "can" help the main verbs "like" and "speak". After a helping verb, the main verb is in its base form.', '"does" আর "can" main verb "like" আর "speak"-কে সাহায্য করে। Helping verb-এর পরে main verb মূল form-এ থাকে।'),
    }),
    {
      kind: 'concept',
      title: l('Main and helping verbs', 'Main আর helping verb'),
      body: l('The main verb carries the meaning (like, speak, travel). Helping verbs add time, questions, negatives or ability: be (is working), have (has finished), do (does not like), and modals: can, could, will, would, should, must, may, might.', 'Main verb অর্থ বহন করে (like, speak, travel)। Helping verb সময়, প্রশ্ন, না-বোধক বা সামর্থ্য যোগ করে: be (is working), have (has finished), do (does not like), আর modal: can, could, will, would, should, must, may, might।'),
      points: [
        l('Modal + base verb: can play, should study, must go. Never "can plays" or "must to go".', 'Modal + মূল verb: can play, should study, must go। কখনো "can plays" বা "must to go" না।'),
        l('he / she / it: does / doesn’t + base verb: She doesn’t like. Does he work?', 'he / she / it: does / doesn’t + মূল verb: She doesn’t like। Does he work?'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'Governments should invest in public transport.', note: l('should + base verb', 'should + মূল verb') },
        { en: 'My friend doesn’t eat meat.', note: l('doesn’t + base verb (not "eats")', 'doesn’t + মূল verb ("eats" না)') },
        { en: 'Does your city have a metro?', note: l('Does + subject + base verb', 'Does + subject + মূল verb') },
        { en: 'I have finished my assignment.', note: l('have + past participle', 'have + past participle') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'writing', example: 'Governments should provide free vaccines.', note: l('Task 2 recommendations use modals: should, must, could.', 'Task 2-এর পরামর্শে modal লাগে: should, must, could।') },
        { skill: 'speaking', example: 'My sister doesn’t like cooking, but she can bake very well.', note: l('Part 1 answers are full of does/doesn’t and can.', 'Part 1-এর উত্তরে does/doesn’t আর can প্রচুর থাকে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'He don’t like football.', right: 'He doesn’t like football.', why: l('he / she / it → doesn’t.', 'he / she / it → doesn’t।') },
        { wrong: 'She can speaks three languages.', right: 'She can speak three languages.', why: l('Modal + base verb (no -s).', 'Modal + মূল verb (-s ছাড়া)।') },
        { wrong: 'Students must to wear uniforms.', right: 'Students must wear uniforms.', why: l('No "to" after must, can, should.', 'must, can, should-এর পরে "to" বসে না।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pvb-2-p1', C, { tag: 'verb', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'My brother ______ like spicy food.', options: ['doesn’t', 'don’t', 'isn’t'], answer: 'doesn’t', explanation: l('he → doesn’t + base verb.', 'he → doesn’t + মূল verb।') }),
        choice('pvb-2-p2', C, { tag: 'verb', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'Children should ______ more vegetables.', options: ['eat', 'eats', 'to eat'], answer: 'eat', explanation: l('should + base verb.', 'should + মূল verb।') }),
        choice('pvb-2-p3', C, { tag: 'verb', prompt: l('Choose the correct question.', 'সঠিক প্রশ্নটা বাছো।'), options: ['Does she works here?', 'Does she work here?', 'Do she work here?'], answer: 'Does she work here?', explanation: l('Does + she + base verb.', 'Does + she + মূল verb।') }),
        choice('pvb-2-p4', C, { tag: 'verb', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'You must ______ your passport at the airport.', options: ['show', 'to show', 'showing'], answer: 'show', explanation: l('must + base verb, no "to".', 'must + মূল verb, "to" ছাড়া।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pvb-2-r1', C, { tag: 'verb', prompt: l('Write the right form of "play".', '"play"-এর ঠিক form লেখো।'), base: 'play', sentence: 'My sister can ___ the harmonium.', accepted: ['play'], explanation: l('can + base verb.', 'can + মূল verb।'), why: { plays: l('After "can" the verb never takes -s.', '"can"-এর পরে verb-এ কখনো -s বসে না।') } }),
        gap('pvb-2-r2', C, { tag: 'verb', prompt: l('Write the missing helping verb (negative).', 'বাদ পড়া helping verb লেখো (না-বোধক)।'), sentence: 'My father ___ drink tea after dinner.', accepted: ['doesn’t', "doesn't", 'does not'], explanation: l('he → doesn’t.', 'he → doesn’t।'), why: { "don't": l('With he / she / it we use doesn’t.', 'he / she / it-এর সাথে doesn’t।') } }),
        spot('pvb-2-r3', C, { tag: 'verb', sentence: 'Students must submits their essays by Friday.', wrong: 'submits', accepted: ['submit'], explanation: l('must + base verb: must submit.', 'must + মূল verb: must submit।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pvb-2-c1', C, { tag: 'verb', prompt: l('Why is it "She can swim" and not "She can swims"?', '"She can swims" না হয়ে "She can swim" কেন?'), options: ['After a modal the main verb is in its base form', 'Because she is a girl', 'Because swim is irregular'], answer: 'After a modal the main verb is in its base form', explanation: l('can, should, must + base verb.', 'can, should, must + মূল verb।') }),
        spot('pvb-2-c2', C, { tag: 'verb', sentence: 'Does your city has a good bus service?', wrong: 'has', accepted: ['have'], fixOptions: ['have', 'had', 'having'], explanation: l('Does + base verb: have.', 'Does + মূল verb: have।') }),
        choice('pvb-2-c3', C, { tag: 'verb', prompt: l('Task 2: choose the best recommendation.', 'Task 2: সবচেয়ে ভালো পরামর্শটা বাছো।'), options: ['Governments should build more cycle lanes.', 'Governments should builds more cycle lanes.', 'Governments should to build more cycle lanes.'], answer: 'Governments should build more cycle lanes.', explanation: l('should + base verb.', 'should + মূল verb।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pvb-2-w1', C, {
          tag: 'verb',
          prompt: l('Write two sentences about a friend: one thing they can do and one thing they don’t like.', 'একজন বন্ধুকে নিয়ে দুটো sentence লেখো: সে কী পারে, আর কী পছন্দ করে না।'),
          model: 'My friend Sami can cook really well, but he doesn’t like washing the dishes.',
          task: 'The student writes two sentences about a friend using "can" and "doesn\'t". Check modal + base verb (no -s, no "to"), does/doesn\'t with he/she, and the base verb after doesn\'t.',
          target: l('can + base verb; doesn’t + base verb', 'can + মূল verb; doesn’t + মূল verb'),
          checklist: [l('No -s after can', 'can-এর পরে -s নেই'), l('doesn’t (not don’t) with he / she', 'he / she-এর সাথে doesn’t (don’t না)')],
          explanation: l('He can cook… he doesn’t like…', 'He can cook… he doesn’t like…'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Modal (can, should, must…) + base verb. No -s, no "to".', 'Modal (can, should, must…) + মূল verb। -s নেই, "to" নেই।'),
        l('he / she / it: does / doesn’t + base verb.', 'he / she / it: does / doesn’t + মূল verb।'),
      ],
    },
  ],
};

// ======================================================================= 3
const v3: Lesson = {
  id: 'pvb-3', unit: 'verb', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'grammar',
  title: l('Verb forms', 'Verb form'),
  why: l('Irregular verbs and "to do / doing" patterns appear in every Writing and Speaking answer.', 'Irregular verb আর "to do / doing" pattern প্রতিটা Writing আর Speaking উত্তরে আসে।'),
  steps: [
    {
      kind: 'hook',
      title: l('A holiday story', 'ছুটির গল্প'),
      situation: l('Speaking Part 2: "Last year we goed to Cox’s Bazar and I enjoyed to swim in the sea."', 'Speaking Part 2: "Last year we goed to Cox’s Bazar and I enjoyed to swim in the sea."'),
      question: l('Which pair of fixes is right?', 'কোন জোড়া সংশোধন ঠিক?'),
      options: ['went / enjoyed swimming', 'go / enjoyed swim', 'goed / enjoyed swimming'], answer: 'went / enjoyed swimming',
      diagnose: {
        'went / enjoyed swimming': l('Right. go → went (irregular), and enjoy + -ing.', 'ঠিক। go → went (irregular), আর enjoy + -ing।'),
        'go / enjoyed swim': l('"Last year" needs the past: went. After enjoy we use -ing: swimming.', '"Last year"-এ past লাগে: went। enjoy-এর পরে -ing: swimming।'),
        'goed / enjoyed swimming': l('The second fix is right, but go is irregular: went.', 'দ্বিতীয়টা ঠিক, কিন্তু go irregular: went।'),
      },
    },
    identify({
      sentence: 'We went/verb to the beach/noun because we wanted/verb to relax/verb after exams./noun',
      choices: JOBS4.slice(0, 3),
      pattern: l('went, wanted and relax are all verbs, in different forms: past (went, wanted) and base after "to" (to relax).', 'went, wanted আর relax সবই verb, ভিন্ন form-এ: past (went, wanted) আর "to"-এর পরে মূল form (to relax)।'),
    }),
    {
      kind: 'concept',
      title: l('Five forms of a verb', 'Verb-এর পাঁচটা form'),
      body: l('Most verbs have five forms: base (go), -s (goes), past (went), past participle (gone), -ing (going). Regular verbs add -ed (worked); irregular verbs must be learned (go-went-gone, take-took-taken). Some verbs are followed by "to + verb", others by "-ing".', 'বেশিরভাগ verb-এর পাঁচটা form: মূল (go), -s (goes), past (went), past participle (gone), -ing (going)। Regular verb-এ -ed বসে (worked); irregular verb মুখস্থ করতে হয় (go-went-gone, take-took-taken)। কিছু verb-এর পরে "to + verb", কিছুর পরে "-ing" বসে।'),
      points: [
        l('+ to: want, decide, plan, hope, need, agree, refuse, afford (I decided to study abroad).', '+ to: want, decide, plan, hope, need, agree, refuse, afford (I decided to study abroad)।'),
        l('+ -ing: enjoy, avoid, finish, suggest, mind, consider, keep (I enjoy reading).', '+ -ing: enjoy, avoid, finish, suggest, mind, consider, keep (I enjoy reading)।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'The number of visitors grew in 2019 and fell in 2020.', note: l('grow → grew, fall → fell', 'grow → grew, fall → fell') },
        { en: 'I have never taken a plane.', note: l('take → taken (past participle)', 'take → taken (past participle)') },
        { en: 'Many students avoid speaking in class.', note: l('avoid + -ing', 'avoid + -ing') },
        { en: 'I plan to study engineering.', note: l('plan + to', 'plan + to') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'writing', example: 'Sales rose in May, then fell sharply.', note: l('Task 1 in the past uses irregular verbs: rose, fell, grew.', 'Past-এর Task 1-এ irregular verb লাগে: rose, fell, grew।') },
        { skill: 'speaking', example: 'I really enjoy travelling, and I hope to visit Nepal.', note: l('Part 1 and 2: enjoy + -ing, hope + to.', 'Part 1 আর 2: enjoy + -ing, hope + to।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'Prices raised in 2021.', right: 'Prices rose in 2021.', why: l('rise-rose-risen (go up by itself). raise needs an object: The government raised taxes.', 'rise-rose-risen (নিজে উপরে ওঠা)। raise-এর object লাগে: The government raised taxes।') },
        { wrong: 'I enjoy to watch cricket.', right: 'I enjoy watching cricket.', why: l('enjoy + -ing.', 'enjoy + -ing।') },
        { wrong: 'I have wrote the essay.', right: 'I have written the essay.', why: l('have + past participle: written.', 'have + past participle: written।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pvb-3-p1', C, { tag: 'verb', prompt: l('Task 1: choose the right past form.', 'Task 1: ঠিক past form-টা বাছো।'), sentence: 'Unemployment ______ to 8% in 2020.', options: ['rose', 'raised', 'rised'], answer: 'rose', explanation: l('rise → rose (no object).', 'rise → rose (object ছাড়া)।') }),
        choice('pvb-3-p2', C, { tag: 'verb', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'Many people avoid ______ in the rainy season.', options: ['travelling', 'to travel', 'travel'], answer: 'travelling', explanation: l('avoid + -ing.', 'avoid + -ing।') }),
        choice('pvb-3-p3', C, { tag: 'verb', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'I decided ______ IELTS this year.', options: ['to take', 'taking', 'take'], answer: 'to take', explanation: l('decide + to.', 'decide + to।') }),
        choice('pvb-3-p4', C, { tag: 'verb', prompt: l('Choose the right form.', 'ঠিক form-টা বাছো।'), sentence: 'She has ______ three books this month.', options: ['read', 'readed', 'reading'], answer: 'read', explanation: l('read-read-read (pronounced "red" in the past).', 'read-read-read (past-এ উচ্চারণ "red")।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pvb-3-r1', C, { tag: 'verb', prompt: l('Write the past form of "fall".', '"fall"-এর past form লেখো।'), base: 'fall', sentence: 'The number of tourists ___ sharply in 2020.', accepted: ['fell'], explanation: l('fall-fell-fallen.', 'fall-fell-fallen।'), why: { falled: l('fall is irregular: fell.', 'fall irregular: fell।') } }),
        gap('pvb-3-r2', C, { tag: 'verb', prompt: l('Write the right form of "read".', '"read"-এর ঠিক form লেখো।'), base: 'read', sentence: 'I really enjoy ___ detective stories.', accepted: ['reading'], explanation: l('enjoy + -ing.', 'enjoy + -ing।') }),
        spot('pvb-3-r3', C, { tag: 'verb', sentence: 'I have wrote two practice essays this week.', wrong: 'wrote', accepted: ['written'], explanation: l('have + past participle: written.', 'have + past participle: written।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pvb-3-c1', C, { tag: 'verb', prompt: l('Why "Taxes rose" but "The government raised taxes"?', '"Taxes rose" কিন্তু "The government raised taxes" কেন?'), options: ['rise has no object; raise needs an object', 'Both mean the same', 'raise is only for money'], answer: 'rise has no object; raise needs an object', explanation: l('Something rises by itself; someone raises something.', 'কিছু নিজে rise করে; কেউ কিছু raise করে।') }),
        spot('pvb-3-c2', C, { tag: 'verb', sentence: 'Many students avoid study late at night.', wrong: 'study', accepted: ['studying'], fixOptions: ['studying', 'to study', 'studied'], explanation: l('avoid + -ing: avoid studying.', 'avoid + -ing: avoid studying।') }),
        choice('pvb-3-c3', C, { tag: 'verb', prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'), options: ['I can’t afford to buy a laptop.', 'I can’t afford buying a laptop.', 'I can’t afford buy a laptop.'], answer: 'I can’t afford to buy a laptop.', explanation: l('afford + to.', 'afford + to।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pvb-3-w1', C, {
          tag: 'verb',
          prompt: l('Write two sentences about last holiday: what you did (past) and what you enjoyed (+ -ing).', 'শেষ ছুটি নিয়ে দুটো sentence লেখো: কী করেছিলে (past) আর কী ভালো লেগেছিল (+ -ing)।'),
          model: 'Last winter we went to Sylhet and stayed near a tea garden. I really enjoyed walking in the hills.',
          task: 'The student writes two sentences about a past holiday. Check past forms (especially irregular verbs like went, took, saw), and verb patterns (enjoy + -ing, want/decide + to).',
          target: l('Past forms + enjoy -ing', 'Past form + enjoy -ing'),
          checklist: [l('Irregular pasts are correct (went, saw, took)', 'Irregular past ঠিক আছে (went, saw, took)'), l('enjoy + -ing', 'enjoy + -ing')],
          explanation: l('went, stayed, enjoyed walking.', 'went, stayed, enjoyed walking।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('go-went-gone, take-took-taken, rise-rose-risen, fall-fell-fallen, write-wrote-written.', 'go-went-gone, take-took-taken, rise-rose-risen, fall-fell-fallen, write-wrote-written।'),
        l('want / decide / plan + to; enjoy / avoid / suggest + -ing.', 'want / decide / plan + to; enjoy / avoid / suggest + -ing।'),
      ],
    },
  ],
};

// ======================================================================= 4
const v4: Lesson = {
  id: 'pvb-4', unit: 'verb', format: 'v2', concept: C, minutes: 5, difficulty: 'medium', skill: 'grammar',
  title: l('Common verb mistakes', 'Common verb ভুল'),
  why: l('These four mistakes appear again and again in Task 1 and Task 2.', 'এই চারটা ভুল Task 1 আর Task 2-এ বারবার আসে।'),
  steps: [
    {
      kind: 'hook',
      title: l('A Task 1 sentence', 'একটা Task 1 sentence'),
      situation: l('Rumana writes: "The number of cars increasing every year."', 'Rumana লিখলো: "The number of cars increasing every year."'),
      question: l('What is the problem?', 'সমস্যা কী?'),
      options: ['"increasing" is not a full verb here', '"cars" should be "car"', 'Nothing'], answer: '"increasing" is not a full verb here',
      diagnose: {
        '"increasing" is not a full verb here': l('Right. -ing alone is not a finished verb: "is increasing" or "increases".', 'ঠিক। শুধু -ing দিয়ে verb সম্পূর্ণ হয় না: "is increasing" বা "increases"।'),
        '"cars" should be "car"': l('"the number of cars" is correct. The verb is the problem.', '"the number of cars" ঠিক। সমস্যা verb-এ।'),
        Nothing: l('An -ing word needs "is/are" before it to be the verb.', '-ing word-কে verb হতে হলে আগে "is/are" লাগে।'),
      },
    },
    identify({
      sentence: 'The number/noun of cars/noun is/verb increasing/verb rapidly./adverb',
      choices: JOBS4,
      pattern: l('"is increasing" is one verb made of two parts. Without "is", the sentence has no complete verb.', '"is increasing" দুই অংশে একটা verb। "is" না থাকলে sentence-এ সম্পূর্ণ verb নেই।'),
    }),
    {
      kind: 'concept',
      title: l('Four mistakes to stop', 'চারটা ভুল যা বন্ধ করতে হবে'),
      body: l('1) -ing alone: "The number increasing" → is increasing / increases. 2) be + base verb: "is increase" → is increasing / increases. 3) Missing -s: "He go" → He goes. 4) "I am agree" → I agree (agree is already a verb).', '১) শুধু -ing: "The number increasing" → is increasing / increases। ২) be + মূল verb: "is increase" → is increasing / increases। ৩) -s বাদ: "He go" → He goes। ৪) "I am agree" → I agree (agree নিজেই verb)।'),
      points: [
        l('"the number of + plural noun" takes a singular verb: The number of cars IS rising.', '"the number of + plural noun"-এর verb singular: The number of cars IS rising।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'The number of students is increasing.', note: l('is + -ing', 'is + -ing') },
        { en: 'The population increases every year.', note: l('present simple + -s', 'present simple + -s') },
        { en: 'I agree with this opinion.', note: l('not "I am agree"', '"I am agree" না') },
        { en: 'My father works in a bank.', note: l('he → works', 'he → works') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'writing', example: 'I completely agree that…', note: l('Task 2 opinions: "I am agree" is one of the most common errors.', 'Task 2-এ মতামত: "I am agree" সবচেয়ে common ভুলগুলোর একটা।') },
        { skill: 'writing', example: 'The number of users is rising steadily.', note: l('Task 1: a complete verb in every sentence.', 'Task 1: প্রতিটা sentence-এ সম্পূর্ণ verb।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'I am agree with you.', right: 'I agree with you.', why: l('agree is a verb; no "am".', 'agree নিজেই verb; "am" লাগে না।') },
        { wrong: 'The price is increase every year.', right: 'The price increases every year.', why: l('is + base verb is never correct.', 'is + মূল verb কখনো ঠিক না।') },
        { wrong: 'She go to college by bus.', right: 'She goes to college by bus.', why: l('she → goes.', 'she → goes।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pvb-4-p1', C, { tag: 'verb', prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'), options: ['I agree with this view.', 'I am agree with this view.', 'I am agreeing with this view.'], answer: 'I agree with this view.', explanation: l('agree is a verb; no "am".', 'agree নিজেই verb; "am" লাগে না।') }),
        choice('pvb-4-p2', C, { tag: 'verb', prompt: l('Choose the right verb.', 'ঠিক verb-টা বাছো।'), sentence: 'The number of cars ______ every year.', options: ['increases', 'increasing', 'is increase'], answer: 'increases', explanation: l('the number (singular) + increases.', 'the number (singular) + increases।') }),
        choice('pvb-4-p3', C, { tag: 'verb', prompt: l('Choose the right verb.', 'ঠিক verb-টা বাছো।'), sentence: 'My uncle ______ in Dubai.', options: ['works', 'work', 'working'], answer: 'works', explanation: l('he → works.', 'he → works।') }),
        choice('pvb-4-p4', C, { tag: 'verb', prompt: l('Choose the right verb.', 'ঠিক verb-টা বাছো।'), sentence: 'The price of rice ______ at the moment.', options: ['is rising', 'rising', 'is rise'], answer: 'is rising', explanation: l('at the moment → is + -ing.', 'at the moment → is + -ing।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        correct('pvb-4-r1', C, { tag: 'verb', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে আবার লেখো।'), sentence: 'I am agree with the writer.', accepted: ['I agree with the writer.'], explanation: l('I agree…', 'I agree…') }),
        spot('pvb-4-r2', C, { tag: 'verb', sentence: 'The population of Dhaka growing very fast.', wrong: 'growing', accepted: ['is growing', 'grows', 'has been growing'], explanation: l('Add "is": is growing (or grows).', '"is" যোগ করো: is growing (অথবা grows)।') }),
        gap('pvb-4-r3', C, { tag: 'verb', prompt: l('Write the right form of "go".', '"go"-এর ঠিক form লেখো।'), base: 'go', sentence: 'My sister ___ to the gym every morning.', accepted: ['goes'], explanation: l('she → goes.', 'she → goes।'), why: { go: l('With she, add -es: goes.', 'she-এর সাথে -es: goes।') } }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pvb-4-c1', C, { tag: 'verb', prompt: l('Why is "The price is increase" wrong?', '"The price is increase" ভুল কেন?'), options: ['"is" cannot be followed by a base verb', '"price" needs -s', '"increase" is a noun only'], answer: '"is" cannot be followed by a base verb', explanation: l('is increasing, or increases.', 'is increasing, অথবা increases।') }),
        spot('pvb-4-c2', C, { tag: 'verb', sentence: 'The number of students are increasing each year.', wrong: 'are', accepted: ['is'], fixOptions: ['is', 'be', 'were'], explanation: l('"The number" is singular → is.', '"The number" singular → is।') }),
        spot('pvb-4-c3', C, { tag: 'verb', sentence: 'Most people is agree that exercise is important.', wrong: 'is', accepted: ['would', 'generally', 'all', 'strongly', 'certainly', 'probably'], fixOptions: ['would', 'are', 'does'], explanation: l('"is agree" is wrong. "Most people would agree" (or just "Most people agree") is correct.', '"is agree" ভুল। "Most people would agree" (বা শুধু "Most people agree") ঠিক।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pvb-4-w1', C, {
          tag: 'verb',
          prompt: l('Task 2: give your opinion in one sentence on "Students should wear uniforms." Start with "I agree" or "I disagree".', 'Task 2: "Students should wear uniforms."-এর উপর এক sentence-এ মতামত দাও। "I agree" বা "I disagree" দিয়ে শুরু করো।'),
          model: 'I agree that students should wear uniforms because they reduce pressure to buy expensive clothes.',
          task: 'The student gives an opinion in one sentence starting with "I agree" or "I disagree". Check: no "I am agree", complete verbs in every clause, modal + base verb, subject–verb agreement.',
          target: l('I agree / I disagree + complete verbs', 'I agree / I disagree + সম্পূর্ণ verb'),
          checklist: [l('I wrote "I agree", not "I am agree"', '"I am agree" না, "I agree" লিখেছি'), l('Every clause has a complete verb', 'প্রতিটা অংশে সম্পূর্ণ verb আছে')],
          explanation: l('I agree that… because they reduce…', 'I agree that… because they reduce…'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('-ing alone is not a verb: is increasing. "is + base verb" is never correct.', 'শুধু -ing দিয়ে verb হয় না: is increasing। "is + মূল verb" কখনো ঠিক না।'),
        l('I agree (never "I am agree"). he / she → -s: goes, works.', 'I agree (কখনো "I am agree" না)। he / she → -s: goes, works।'),
      ],
    },
  ],
};

// ======================================================================= 5
const v5: Lesson = {
  id: 'pvb-5', unit: 'verb', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'grammar',
  title: l('Verbs in IELTS', 'IELTS-এ verb'),
  why: l('Trend verbs describe every Task 1 chart; reporting verbs present ideas in Task 2.', 'Trend verb প্রতিটা Task 1 chart describe করে; reporting verb Task 2-এ ধারণা উপস্থাপন করে।'),
  steps: [
    {
      kind: 'hook',
      title: l('Describe the line', 'Line-টা describe করো'),
      situation: l('A line goes up and down many times between 2010 and 2015, with no clear direction.', 'একটা line ২০১০ থেকে ২০১৫-এর মধ্যে অনেকবার ওঠানামা করেছে, কোনো নির্দিষ্ট দিক নেই।'),
      question: l('Which verb fits best?', 'কোন verb সবচেয়ে ভালো মানায়?'),
      options: ['fluctuated', 'increased', 'remained stable'], answer: 'fluctuated',
      diagnose: {
        fluctuated: l('Right. fluctuate = go up and down.', 'ঠিক। fluctuate = ওঠানামা করা।'),
        increased: l('It went up AND down, with no clear rise.', 'এটা উঠেছে আবার নেমেছে, স্পষ্ট বৃদ্ধি নেই।'),
        'remained stable': l('Stable means no change. This line changed a lot.', 'Stable মানে পরিবর্তন নেই। এই line অনেক বদলেছে।'),
      },
    },
    identify({
      sentence: 'Exports/noun peaked/verb in 2018/noun and then declined/verb gradually./adverb',
      choices: JOBS4,
      pattern: l('peaked and declined are trend verbs; "gradually" (adverb) says how the decline happened.', 'peaked আর declined হলো trend verb; "gradually" (adverb) বলে কমাটা কীভাবে হয়েছে।'),
    }),
    {
      kind: 'concept',
      title: l('Trend verbs and reporting verbs', 'Trend verb আর reporting verb'),
      body: l('Task 1 trend verbs: up: rise, increase, grow, climb; down: fall, decrease, decline, drop; no change: remain stable, stay the same, level off; up and down: fluctuate; highest point: peak. Task 2 reporting verbs: argue, claim, believe, suggest, point out: "Some people argue that…"', 'Task 1-এর trend verb: উপরে: rise, increase, grow, climb; নিচে: fall, decrease, decline, drop; পরিবর্তন নেই: remain stable, stay the same, level off; ওঠানামা: fluctuate; সর্বোচ্চ বিন্দু: peak। Task 2-এর reporting verb: argue, claim, believe, suggest, point out: "Some people argue that…"'),
      points: [
        l('Use a variety: do not write "increased" five times.', 'বৈচিত্র্য রাখো: পাঁচবার "increased" লিখো না।'),
        l('rise / fall have no object; increase / reduce can take one: The city reduced traffic.', 'rise / fall-এর object নেই; increase / reduce-এর object থাকতে পারে: The city reduced traffic।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'Car sales peaked at 2 million in 2015.', note: l('peak at + number', 'peak at + সংখ্যা') },
        { en: 'Unemployment levelled off after 2019.', note: l('stopped changing', 'পরিবর্তন থেমে গেল') },
        { en: 'Some people argue that homework is unnecessary.', note: l('Task 2: presenting a view', 'Task 2: একটা মত উপস্থাপন') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where you will use this', 'কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'The figure dropped slightly, then remained stable.', note: l('Task 1: choose the verb that matches the shape of the line.', 'Task 1: line-এর আকারের সাথে মেলে এমন verb বাছো।') },
        { skill: 'writing', example: 'Supporters of this idea claim that…', note: l('Task 2: reporting verbs present other views fairly.', 'Task 2: reporting verb অন্যদের মত ন্যায্যভাবে তুলে ধরে।') },
        { skill: 'listening', example: '"prices went up" = "prices rose"', note: l('Listening and Reading paraphrase trend verbs.', 'Listening আর Reading-এ trend verb অন্যভাবে বলা হয়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'The number raised to 50%.', right: 'The number rose to 50%.', why: l('Without an object: rose.', 'Object ছাড়া: rose।') },
        { wrong: 'Sales were fluctuated.', right: 'Sales fluctuated.', why: l('fluctuate is an active verb here; no "were".', 'এখানে fluctuate active verb; "were" লাগে না।') },
        { wrong: 'Some people argue about that homework is useless.', right: 'Some people argue that homework is useless.', why: l('argue that + clause.', 'argue that + clause।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pvb-5-p1', C, { tag: 'verb', prompt: l('The line stays flat. Choose the verb.', 'Line সমান থাকে। Verb বাছো।'), sentence: 'The price ______ at $50 from 2016 to 2018.', options: ['remained stable', 'fluctuated', 'peaked'], answer: 'remained stable', explanation: l('No change → remained stable.', 'পরিবর্তন নেই → remained stable।') }),
        choice('pvb-5-p2', C, { tag: 'verb', prompt: l('The highest point. Choose the verb.', 'সর্বোচ্চ বিন্দু। Verb বাছো।'), sentence: 'Visitor numbers ______ at 90,000 in July.', options: ['peaked', 'declined', 'levelled off'], answer: 'peaked', explanation: l('The highest point → peaked.', 'সর্বোচ্চ বিন্দু → peaked।') }),
        choice('pvb-5-p3', C, { tag: 'verb', prompt: l('Choose the right verb.', 'ঠিক verb-টা বাছো।'), sentence: 'The government ______ fuel prices last year.', options: ['raised', 'rose', 'risen'], answer: 'raised', explanation: l('With an object (fuel prices): raised.', 'Object (fuel prices) থাকলে: raised।') }),
        choice('pvb-5-p4', C, { tag: 'verb', prompt: l('Task 2: choose the best phrase.', 'Task 2: সবচেয়ে ভালো phrase-টা বাছো।'), sentence: 'Some people ______ that technology makes us lonely.', options: ['argue', 'argue about', 'are argue'], answer: 'argue', explanation: l('argue that + clause.', 'argue that + clause।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pvb-5-r1', C, { tag: 'verb', prompt: l('Write a verb meaning "went up and down".', '"ওঠানামা করেছে" অর্থের verb লেখো।'), sentence: 'Oil prices ___ throughout the decade.', accepted: ['fluctuated', 'varied'], explanation: l('fluctuated = went up and down.', 'fluctuated = ওঠানামা করেছে।') }),
        gap('pvb-5-r2', C, { tag: 'verb', prompt: l('Write the past of "rise".', '"rise"-এর past লেখো।'), base: 'rise', sentence: 'The number of cyclists ___ to 12,000 in 2021.', accepted: ['rose'], explanation: l('rise-rose-risen.', 'rise-rose-risen।'), why: { raised: l('"raised" needs an object. Numbers rise by themselves: rose.', '"raised"-এর object লাগে। সংখ্যা নিজে বাড়ে: rose।') } }),
        correct('pvb-5-r3', C, { tag: 'verb', prompt: l('Rewrite with a different verb that means "increased".', '"increased"-এর মতো অর্থের অন্য verb দিয়ে আবার লেখো।'), sentence: 'Sales increased in 2020.', accepted: ['Sales rose in 2020.', 'Sales grew in 2020.', 'Sales climbed in 2020.', 'Sales went up in 2020.'], explanation: l('rose / grew / climbed.', 'rose / grew / climbed।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pvb-5-c1', C, { tag: 'verb', prompt: l('Reading: which sentence means "Sales went down a little"?', 'Reading: কোন sentence-এর অর্থ "Sales went down a little"?'), options: ['Sales declined slightly.', 'Sales peaked.', 'Sales fluctuated wildly.'], answer: 'Sales declined slightly.', explanation: l('went down = declined; a little = slightly.', 'went down = declined; a little = slightly।') }),
        spot('pvb-5-c2', C, { tag: 'verb', sentence: 'The unemployment rate raised sharply in 2009.', wrong: 'raised', accepted: ['rose'], fixOptions: ['rose', 'risen', 'raising'], explanation: l('No object → rose.', 'Object নেই → rose।') }),
        spot('pvb-5-c3', C, { tag: 'verb', sentence: 'Between 2015 and 2020, visitor numbers fluctuate a lot.', wrong: 'fluctuate', accepted: ['fluctuated'], fixOptions: ['fluctuated', 'fluctuating', 'fluctuation'], explanation: l('A finished period (2015–2020) → past: fluctuated.', 'শেষ হওয়া সময় (2015–2020) → past: fluctuated।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pvb-5-w1', C, {
          tag: 'verb',
          prompt: l('Task 1: describe this trend in one sentence: "Rice price: 2019 Tk 50 → 2020 Tk 65 → 2021 Tk 65 → 2022 Tk 65."', 'Task 1: এই trend-টা এক sentence-এ লেখো: "Rice price: 2019 Tk 50 → 2020 Tk 65 → 2021 Tk 65 → 2022 Tk 65."'),
          model: 'The price of rice rose from Tk 50 to Tk 65 in 2020 and then remained stable until 2022.',
          task: 'The student describes a trend: rice price rose from Tk 50 (2019) to Tk 65 (2020) and then stayed at Tk 65 until 2022. Check the trend verbs (rose / increased, remained stable / levelled off), past tense, and from/to/until with the figures.',
          target: l('Two trend verbs: up, then no change', 'দুটো trend verb: উপরে, তারপর অপরিবর্তিত'),
          checklist: [l('I used a verb for the rise and one for no change', 'বৃদ্ধির জন্য একটা আর অপরিবর্তনের জন্য একটা verb ব্যবহার করেছি'), l('Past tense throughout', 'পুরোটাই past tense')],
          explanation: l('rose … then remained stable.', 'rose … then remained stable।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('up: rise, increase, grow · down: fall, decline, drop · flat: remain stable, level off · up and down: fluctuate · top: peak.', 'উপরে: rise, increase, grow · নিচে: fall, decline, drop · সমান: remain stable, level off · ওঠানামা: fluctuate · চূড়া: peak।'),
        l('rise (no object) vs raise (with an object).', 'rise (object ছাড়া) বনাম raise (object সহ)।'),
      ],
    },
  ],
};

export const posVerbLessons: Lesson[] = [v1, v2, v3, v4, v5];

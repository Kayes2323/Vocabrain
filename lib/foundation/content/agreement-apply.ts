import type { Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Subject–Verb Agreement, application lessons in the v2 format: sva-6 the
 * mistakes Bangla speakers make, sva-7 agreement in IELTS Writing and
 * Speaking, sva-8 mixed error correction (no hints), and sva-9 the module
 * review test. They have no lesson concept of their own: every question keeps
 * the concept it tests (sva-basic … sva-quantity), so each answer feeds the
 * right review. Original Mino content.
 */
const S = { tag: 'agreement' as const };

// ======================================================================= sva-6
export const svaMistakes: Lesson = {
  id: 'sva-6',
  format: 'v2',
  title: l('Agreement mistakes Bangla speakers make', 'বাংলাভাষীরা agreement-এ যে ভুলগুলো করে'),
  why: l('A few repeated slips — "he go", "people is", "one of my friend are" — cost marks in every Speaking and Writing task. Learn to catch your own.', 'কয়েকটা ভুল বারবার হয় — "he go", "people is", "one of my friend are" — আর প্রতিটা Speaking ও Writing task-এ নম্বর কাটে। নিজের ভুল নিজে ধরতে শিখুন।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('A student’s Part 1 answer', 'একজন শিক্ষার্থীর Part 1 উত্তর'),
      situation: l('A student says: "My hometown have many markets. The people is very friendly, and one of my friends run a tea stall there."', 'একজন শিক্ষার্থী বললেন: "My hometown have many markets. The people is very friendly, and one of my friends run a tea stall there."'),
      question: l('How many agreement mistakes are there?', 'এখানে agreement-এর কয়টা ভুল আছে?'),
      options: ['3', '1', '2'],
      answer: '3',
      diagnose: {
        '3': l('Right: My hometown HAS · The people ARE · one of my friends RUNS. Each one is a classic Bangla-speaker slip.', 'ঠিক: My hometown HAS · The people ARE · one of my friends RUNS। প্রতিটাই বাংলাভাষীদের খুব পরিচিত ভুল।'),
        '1': l('Look again at each subject: "my hometown" = it → has; "the people" = they → are; "one of my friends" = one → runs.', 'প্রতিটা subject আবার দেখুন: "my hometown" = it → has; "the people" = they → are; "one of my friends" = একজন → runs।'),
        '2': l('Close! Most people miss the last one: the subject is "one" (of my friends), so the verb is "runs".', 'কাছাকাছি! বেশিরভাগ মানুষ শেষেরটা মিস করে: subject হলো "one" (of my friends), তাই verb "runs"।'),
      },
    },
    {
      kind: 'discover',
      title: l('Where do these slips come from?', 'এই ভুলগুলো কোথা থেকে আসে?'),
      items: [
        { en: 'সে অফিসে যায় → He goes to the office.', note: l('Bangla: no -s ending → English needs goes', 'বাংলা: -s ending নেই → English-এ goes লাগে') },
        { en: 'লোকজন খুব ভালো → People are very kind.', note: l('লোকজন feels like one group → but "people" is plural', 'লোকজন একটা দল মনে হয় → কিন্তু "people" plural') },
        { en: 'খবরটা ভালো → The news is good.', note: l('"news" ends in -s → but it is uncountable, singular', '"news"-এর শেষে -s → কিন্তু এটা uncountable, singular') },
        { en: 'আমার এক বন্ধু ডাক্তার → One of my friends is a doctor.', note: l('the subject is "one" → is', 'subject হলো "one" → is') },
      ],
      question: l('What is the common cause?', 'সাধারণ কারণটা কী?'),
      options: [
        l('Bangla doesn’t mark one-or-many on the verb, so we don’t check it in English either', 'বাংলায় verb-এ এক-নাকি-অনেক বোঝানো হয় না, তাই English-এও আমরা যাচাই করি না'),
        l('English verbs are random and must be memorised one by one', 'English verb এলোমেলো, একটা একটা করে মুখস্থ করতে হয়'),
        l('Speaking fast always causes these mistakes', 'দ্রুত কথা বললেই সবসময় এই ভুল হয়'),
      ],
      answer: 0,
      pattern: l('Bangla habits hide the question "one or more?". Name the real subject, decide one or more, then choose the verb — every time.', 'বাংলার অভ্যাস "একটা নাকি একাধিক?" প্রশ্নটা লুকিয়ে রাখে। আসল subject চিহ্নিত করুন, একটা নাকি একাধিক ঠিক করুন, তারপর verb বেছে নিন — প্রতিবার।'),
    },
    {
      kind: 'concept',
      title: l('The seven slips to watch', 'যে সাতটা ভুলে খেয়াল রাখবেন'),
      body: l(
        'Most agreement mistakes by Bangla speakers fall into a few groups. If you know them, you can check your own writing in seconds.',
        'বাংলাভাষীদের বেশিরভাগ agreement ভুল কয়েকটা দলে পড়ে। এগুলো চিনলে কয়েক সেকেন্ডে নিজের লেখা যাচাই করতে পারবেন।',
      ),
      points: [
        l('1. Missing -s: "He go / She have / It make" → He goes / She has / It makes.', '১. -s বাদ: "He go / She have / It make" → He goes / She has / It makes।'),
        l('2. Double -s: "My parents lives" · "He doesn’t lives" → My parents live · He doesn’t live.', '২. দুইবার -s: "My parents lives" · "He doesn’t lives" → My parents live · He doesn’t live।'),
        l('3. Plural words that look singular: people, police, children → are. Singular words that look plural: news, mathematics, economics → is.', '৩. দেখতে singular কিন্তু plural: people, police, children → are। দেখতে plural কিন্তু singular: news, mathematics, economics → is।'),
        l('4. Uncountable nouns: information, advice, traffic, pollution → is (never "informations are").', '৪. Uncountable noun: information, advice, traffic, pollution → is (কখনো "informations are" না)।'),
        l('5. "one of" + plural noun + singular verb: One of my friends is…', '৫. "one of" + plural noun + singular verb: One of my friends is…'),
        l('6. everyone / everybody / each → singular: Everyone has…', '৬. everyone / everybody / each → singular: Everyone has…'),
        l('7. The verb before a plural subject: There are many problems (not "There is many problems").', '৭. Plural subject-এর আগে verb: There are many problems ("There is many problems" না)।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Before → after', 'আগে → পরে'),
      items: [
        { en: 'My uncle have a farm. → My uncle has a farm.', note: l('slip 1: one uncle → has', 'ভুল ১: একজন uncle → has') },
        { en: 'The police is here. → The police are here.', note: l('slip 3: police is always plural', 'ভুল ৩: police সবসময় plural') },
        { en: 'Mathematics are difficult. → Mathematics is difficult.', note: l('slip 3: a subject name ending in -s is singular', 'ভুল ৩: -s দিয়ে শেষ হওয়া বিষয়ের নাম singular') },
        { en: 'There is a lot of students. → There are a lot of students.', note: l('slip 7: the real subject is "students"', 'ভুল ৭: আসল subject হলো "students"') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'People in my area are very friendly, and everyone knows each other.', note: l('Part 1: people → are; everyone → knows.', 'Part 1: people → are; everyone → knows।') },
        { skill: 'writing', example: 'The information in the table shows that economics is the most popular subject.', note: l('Task 1: information (uncountable) → shows; economics → is.', 'Task 1: information (uncountable) → shows; economics → is।') },
        { skill: 'reading', example: 'There are several reasons why children spend less time outdoors.', note: l('Reading: "There are" warns you that a list of reasons follows.', 'Reading: "There are" দেখলে বুঝবেন এরপর কারণের তালিকা আসছে।') },
        { skill: 'listening', example: 'The news is on at nine, and the children are asleep by then.', note: l('Listening: is / are are short — the noun tells you which to expect.', 'Listening: is / are ছোট শব্দ — noun দেখে বুঝবেন কোনটা আসবে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'People is worried about prices.', right: 'People are worried about prices.', why: l('"people" is plural → are.', '"people" plural → are।') },
        { wrong: 'The informations are useful.', right: 'The information is useful.', why: l('information is uncountable: no -s, singular verb.', 'information uncountable: -s না, singular verb।') },
        { wrong: 'One of my cousin are a pilot.', right: 'One of my cousins is a pilot.', why: l('one of + plural noun (cousins) + singular verb (is).', 'one of + plural noun (cousins) + singular verb (is)।') },
        { wrong: 'Everyone in my class have a smartphone.', right: 'Everyone in my class has a smartphone.', why: l('everyone → singular → has.', 'everyone → singular → has।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('sva-6-p1', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'The children ___ playing in the field.', options: ['are', 'is'], answer: 'are', explanation: l('children = plural of child → are.', 'children = child-এর plural → are।'), why: { is: l('"children" has no -s, but it is plural (one child, two children).', '"children"-এ -s নেই, কিন্তু এটা plural (one child, two children)।') } }),
        choice('sva-6-p2', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Economics ___ my favourite subject at college.', options: ['is', 'are'], answer: 'is', explanation: l('economics is one subject → is.', 'economics একটা বিষয় → is।'), why: { are: l('Subject names like economics and mathematics end in -s but are singular.', 'economics, mathematics-এর মতো বিষয়ের নাম -s দিয়ে শেষ হলেও singular।') } }),
        choice('sva-6-p3', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'One of my neighbours ___ a doctor at the local hospital.', options: ['is', 'are'], answer: 'is', explanation: l('The subject is "one" → is.', 'Subject হলো "one" → is।'), why: { are: l('"neighbours" is only part of the phrase "of my neighbours"; the subject is "one".', '"neighbours" শুধু "of my neighbours" phrase-এর অংশ; subject হলো "one"।') } }),
        choice('sva-6-p4', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Everybody in my family ___ rice at least twice a day.', options: ['eats', 'eat'], answer: 'eats', explanation: l('everybody → singular → eats.', 'everybody → singular → eats।'), why: { eat: l('"everybody" means many people, but grammatically it is singular, like "he".', '"everybody" মানে অনেক মানুষ, কিন্তু grammar-এ এটা singular, "he"-এর মতো।') } }),
        choice('sva-6-p5', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: '___ a lot of traffic jams in Dhaka every evening.', options: ['There are', 'There is'], answer: 'There are', explanation: l('The real subject comes after: "traffic jams" (plural) → There are.', 'আসল subject পরে আসে: "traffic jams" (plural) → There are।'), why: { 'There is': l('Look after the verb: "a lot of traffic jams" is plural.', 'Verb-এর পরে দেখুন: "a lot of traffic jams" plural।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sva-6-r1', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Write is or are.', 'is বা are লিখুন।'), sentence: 'The police ___ looking for the driver.', accepted: ['are'], explanation: l('police is always plural → are.', 'police সবসময় plural → are।'), why: { is: l('"police" means the police officers → plural.', '"police" মানে police কর্মকর্তারা → plural।') } }),
        gap('sva-6-r2', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'The news from the village ___ (be) not good.', base: 'be', accepted: ['is'], explanation: l('news is uncountable → is.', 'news uncountable → is।'), why: { are: l('"news" ends in -s but is singular.', '"news"-এর শেষে -s থাকলেও এটা singular।') } }),
        correct('sva-6-r3', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Correct the sentence (one verb).', 'Sentence-টা ঠিক করুন (একটা verb)।'), sentence: 'My grandmother doesn’t walks without a stick.', accepted: ['My grandmother doesn’t walk without a stick.', 'My grandmother does not walk without a stick.'], explanation: l('After doesn’t → base verb: walk.', 'doesn’t-এর পরে → base verb: walk।') }),
        spot('sva-6-r4', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('One verb is wrong. Tap it and type the right form.', 'একটা verb ভুল। সেটায় tap করে সঠিক form লিখুন।'), sentence: 'One of the buses break down almost every week.', wrong: 'break', accepted: ['breaks'], explanation: l('Subject = one (of the buses) → breaks.', 'Subject = one (of the buses) → breaks।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sva-6-c1', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Which sentence has NO agreement mistakes?', 'কোন sentence-এ agreement-এর কোনো ভুল নেই?'), options: ['The advice my teachers give is always practical.', 'The advices my teachers gives are always practical.', 'The advice my teachers gives are always practical.'], answer: 'The advice my teachers give is always practical.', explanation: l('advice (uncountable) → is · my teachers → give.', 'advice (uncountable) → is · my teachers → give।') }),
        spot('sva-6-c2', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Each of the students have a locker in the library.', wrong: 'have', accepted: ['has'], fixOptions: ['has', 'having', 'are'], explanation: l('each (of) → singular → has.', 'each (of) → singular → has।') }),
        order('sva-6-c3', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'The people in my village are very hard-working.', explanation: l('The people (plural) … are.', 'The people (plural) … are।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your neighbourhood', 'এবার আপনার পালা: আপনার এলাকা'),
      exercises: [
        write('sva-6-y1', 'sva-basic', {
          ...S,
          prompt: l('Speaking Part 1: "Describe the area where you live." Write 3 sentences using at least two of: people, everyone, one of, there is / there are.', 'Speaking Part 1: "Describe the area where you live." ৩টা sentence লিখুন, এর মধ্যে অন্তত দুটো ব্যবহার করুন: people, everyone, one of, there is / there are।'),
          model: 'There are two schools and a big market near my house. The people are friendly, and everyone knows each other. One of my neighbours runs a small pharmacy.',
          checklist: [l('people → are', 'people → are'), l('everyone / one of … → singular verb', 'everyone / one of … → singular verb'), l('there is / are → look at the noun after it', 'there is / are → পরের noun দেখুন')],
          explanation: l('These are the slips Bangla speakers make most — check each subject.', 'বাংলাভাষীরা এগুলোতেই সবচেয়ে বেশি ভুল করে — প্রতিটা subject যাচাই করুন।'),
          task: 'The student writes 3 sentences about where they live, using people / everyone / one of / there is–are. Check subject–verb agreement only, focusing on the typical Bangla-speaker slips: missing -s with a singular subject (he go), a double -s (my parents lives, doesn’t lives), "people" and "police" are plural, "news", "information", "advice" and subject names like "economics" are singular, "one of + plural noun" takes a singular verb, everyone/everybody/each take a singular verb, and "there is/are" agrees with the noun after it. For each error name the real subject, say one or more, and give the fix.',
          target: l('Catch the typical slips', 'পরিচিত ভুলগুলো ধরুন'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('One -s: on the noun (plural) OR on the verb (singular).', 'একটা -s: noun-এ (plural) অথবা verb-এ (singular)।'),
        l('people / police / children → are · news / information / economics → is.', 'people / police / children → are · news / information / economics → is।'),
        l('one of + plural noun → singular verb · there is / are → look at the noun after.', 'one of + plural noun → singular verb · there is / are → পরের noun দেখুন।'),
      ],
    },
  ],
};

// ======================================================================= sva-7
export const svaInIelts: Lesson = {
  id: 'sva-7',
  format: 'v2',
  title: l('Agreement in IELTS Writing and Speaking', 'IELTS Writing আর Speaking-এ agreement'),
  why: l('Grammatical Range and Accuracy is a quarter of your Writing and Speaking score. Agreement errors are the easiest to remove.', 'Grammatical Range and Accuracy আপনার Writing আর Speaking score-এর এক-চতুর্থাংশ। Agreement-এর ভুলই সবচেয়ে সহজে দূর করা যায়।'),
  minutes: 12,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 1 opening', 'একটা Task 1-এর শুরু'),
      situation: l('You write: "The bar chart ___ the number of students who ___ abroad each year. The figures for India ___ the highest."', 'আপনি লিখলেন: "The bar chart ___ the number of students who ___ abroad each year. The figures for India ___ the highest."'),
      question: l('Which set is correct?', 'কোন set-টা ঠিক?'),
      options: ['shows · study · are', 'show · studies · is', 'shows · studies · is'],
      answer: 'shows · study · are',
      diagnose: {
        'shows · study · are': l('Right. The bar chart → shows · who refers to "students" → study · The figures → are.', 'ঠিক। The bar chart → shows · who মানে "students" → study · The figures → are।'),
        'show · studies · is': l('All three are reversed: one chart → shows; "who" = students (plural) → study; "the figures" (plural) → are.', 'তিনটাই উল্টো: একটা chart → shows; "who" = students (plural) → study; "the figures" (plural) → are।'),
        'shows · studies · is': l('"shows" is right. But "who" refers to "students" → study, and the subject of the last sentence is "the figures" (not India) → are.', '"shows" ঠিক। কিন্তু "who" মানে "students" → study, আর শেষ sentence-এর subject "the figures" (India না) → are।'),
      },
    },
    {
      kind: 'discover',
      title: l('IELTS sentences you will write again and again', 'যে IELTS sentence বারবার লিখবেন'),
      items: [
        { en: 'The number of visitors has increased significantly.', note: l('Task 1: the number → has', 'Task 1: the number → has') },
        { en: 'A number of factors are responsible for this.', note: l('Task 2: a number of = several → are', 'Task 2: a number of = কয়েকটা → are') },
        { en: 'Many people believe that technology makes life easier.', note: l('Task 2: people → believe · technology → makes', 'Task 2: people → believe · technology → makes') },
        { en: 'My favourite place is the rooftop of our building.', note: l('Speaking: the subject is "place", not the rooftop', 'Speaking: subject হলো "place", rooftop না') },
      ],
      question: l('What do all these have in common?', 'এগুলোর মধ্যে মিল কী?'),
      options: [
        l('The verb agrees with the head of the subject, which is often not the word just before the verb', 'Verb subject-এর মূল word-এর সাথে মেলে, যেটা প্রায়ই verb-এর ঠিক আগের word না'),
        l('IELTS sentences always use plural verbs', 'IELTS sentence-এ সবসময় plural verb লাগে'),
        l('Formal writing doesn’t need agreement', 'Formal লেখায় agreement লাগে না'),
      ],
      answer: 0,
      pattern: l('IELTS sentences have long subjects. Find the head word (number, factors, people, place), then choose the verb.', 'IELTS sentence-এ subject লম্বা হয়। মূল word (number, factors, people, place) খুঁজুন, তারপর verb বেছে নিন।'),
    },
    {
      kind: 'concept',
      title: l('Agreement across the four tasks', 'চারটা task-এ agreement'),
      body: l(
        'Each part of the test has its own agreement traps. Learn the typical sentences for each and check them first when you proofread.',
        'Test-এর প্রতিটা অংশে নিজস্ব agreement-এর ফাঁদ আছে। প্রতিটার typical sentence শিখুন আর proofread করার সময় আগে সেগুলো যাচাই করুন।',
      ),
      points: [
        l('Task 1: The chart shows… · The number of X has / was… · The figures for X are / were… · X% of the population is / are (follow the noun after "of").', 'Task 1: The chart shows… · The number of X has / was… · The figures for X are / were… · X% of the population is / are ("of"-এর পরের noun অনুযায়ী)।'),
        l('Task 2: Many people believe… · Technology has… · The government / Governments should… (the modal "should" needs no agreement, but "has / have" does) · There are several reasons…', 'Task 2: Many people believe… · Technology has… · The government / Governments should… ("should"-এ agreement লাগে না, কিন্তু "has / have"-এ লাগে) · There are several reasons…'),
        l('Speaking: My hometown is… · My parents work… · There are a lot of… · Everyone in my family likes… · Neither my brother nor I am…', 'Speaking: My hometown is… · My parents work… · There are a lot of… · Everyone in my family likes… · Neither my brother nor I am…'),
        l('Present perfect and past: has / have and was / were change too — "prices have risen", "the figure was".', 'Present perfect আর past: has / have আর was / were-ও বদলায় — "prices have risen", "the figure was"।'),
        l('Proofreading routine: underline each verb, point to its subject, ask "one or more?". It takes 60 seconds for a Task 2 essay.', 'Proofread করার নিয়ম: প্রতিটা verb-এর নিচে দাগ দিন, তার subject দেখান, জিজ্ঞেস করুন "একটা নাকি একাধিক?"। Task 2 essay-তে ৬০ সেকেন্ড লাগে।'),
        l('Why Bangla speakers slip: under exam pressure we translate from Bangla, where the verb comes last and never takes -s — so in long IELTS subjects the verb follows the nearest noun. The proofreading routine catches this.', 'বাংলাভাষীরা কেন ভুল করে: পরীক্ষার চাপে আমরা বাংলা থেকে অনুবাদ করি, যেখানে verb শেষে আসে আর কখনো -s নেয় না — তাই লম্বা IELTS subject-এ verb কাছের noun-কে মেনে ফেলে। Proofread-এর নিয়মটা এই ভুল ধরে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Model sentences', 'Model sentence'),
      items: [
        { en: 'The proportion of households with internet access has doubled since 2010.', note: l('Task 1: proportion → has', 'Task 1: proportion → has') },
        { en: 'Social media, which many teenagers use daily, has both benefits and drawbacks.', note: l('Task 2: social media … has', 'Task 2: social media … has') },
        { en: 'The main reason people move to cities is the lack of jobs in rural areas.', note: l('Task 2: reason → is', 'Task 2: reason → is') },
        { en: 'Neither of my parents speaks English at home.', note: l('Speaking: neither of → singular (formal)', 'Speaking: neither of → singular (formal)') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Task by task', 'Task অনুযায়ী'),
      uses: [
        { skill: 'writing', example: 'The figures for China were higher than those for Japan.', note: l('Task 1: figures → were.', 'Task 1: figures → were।') },
        { skill: 'listening', example: 'The fee for the two courses is 300 pounds.', note: l('Listening (form completion): the fee (one amount) → is.', 'Listening (form completion): the fee (একটা পরিমাণ) → is।') },
        { skill: 'speaking', example: 'Everyone in my family loves fish, but neither my sister nor I cook it.', note: l('Part 1: everyone → loves; nearest subject "I" → cook.', 'Part 1: everyone → loves; কাছের subject "I" → cook।') },
        { skill: 'reading', example: 'The effects of the policy were not immediately clear.', note: l('Reading: use agreement to find what "were" refers to.', 'Reading: "were" কাকে বোঝাচ্ছে agreement দেখে খুঁজুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The number of cars have increased.', right: 'The number of cars has increased.', why: l('the number (one figure) → has.', 'the number (একটা সংখ্যা) → has।') },
        { wrong: 'The figures for Canada was lower.', right: 'The figures for Canada were lower.', why: l('Subject = figures (plural) → were.', 'Subject = figures (plural) → were।') },
        { wrong: 'Technology have changed education.', right: 'Technology has changed education.', why: l('technology is uncountable → has.', 'technology uncountable → has।') },
        { wrong: 'The main reason are the high cost.', right: 'The main reason is the high cost.', why: l('Subject = reason (one) → is.', 'Subject = reason (একটা) → is।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('sva-7-p1', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Task 1: choose the correct verb.', 'Task 1: সঠিক verb বেছে নিন।'), sentence: 'The pie charts ___ how people in two cities travel to work.', options: ['compare', 'compares'], answer: 'compare', explanation: l('The pie charts (plural) → compare.', 'The pie charts (plural) → compare।'), why: { compares: l('There are two charts → plural → compare.', 'Chart দুটো → plural → compare।') } }),
        choice('sva-7-p2', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Task 1: choose the correct verb.', 'Task 1: সঠিক verb বেছে নিন।'), sentence: 'The number of international students ___ risen steadily since 2015.', options: ['has', 'have'], answer: 'has', explanation: l('the number → has.', 'the number → has।'), why: { have: l('The subject is "the number" (one figure), not "students".', 'Subject হলো "the number" (একটা সংখ্যা), "students" না।') } }),
        choice('sva-7-p3', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Task 2: choose the correct verb.', 'Task 2: সঠিক verb বেছে নিন।'), sentence: 'The quality of public schools in rural areas ___ improved in recent years.', options: ['has', 'have'], answer: 'has', explanation: l('Subject = the quality → has.', 'Subject = the quality → has।'), why: { have: l('"schools" and "areas" are inside phrases; the head is "quality".', '"schools" আর "areas" phrase-এর ভেতরে; মূল word হলো "quality"।') } }),
        choice('sva-7-p4', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Speaking: choose the correct verb.', 'Speaking: সঠিক verb বেছে নিন।'), sentence: 'Neither my brother nor my parents ___ interested in politics.', options: ['are', 'is'], answer: 'are', explanation: l('neither … nor → nearest subject "my parents" → are.', 'neither … nor → কাছের subject "my parents" → are।'), why: { is: l('The verb follows the nearer subject: "my parents" (plural).', 'Verb কাছের subject মানে: "my parents" (plural)।') } }),
        choice('sva-7-p5', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Task 1: choose the correct verb.', 'Task 1: সঠিক verb বেছে নিন।'), sentence: 'In 2020, 45% of the students ___ female.', options: ['were', 'was'], answer: 'were', explanation: l('45% of the students (plural) → were.', '45% of the students (plural) → were।'), why: { was: l('With percentages, look at the noun after "of": "students" → were.', 'শতাংশের ক্ষেত্রে "of"-এর পরের noun দেখুন: "students" → were।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sva-7-r1', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Write is or are.', 'is বা are লিখুন।'), sentence: 'The main cause of these problems ___ poor planning.', accepted: ['is'], explanation: l('Subject = the main cause → is.', 'Subject = the main cause → is।'), why: { are: l('"problems" is inside "of these problems"; the subject is "cause".', '"problems" "of these problems"-এর ভেতরে; subject হলো "cause"।') } }),
        gap('sva-7-r2', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Write has or have.', 'has বা have লিখুন।'), sentence: 'A number of countries ___ banned plastic bags.', accepted: ['have'], explanation: l('a number of = several → plural → have.', 'a number of = কয়েকটা → plural → have।'), why: { has: l('"A number of" means "several", so the verb is plural.', '"A number of" মানে "কয়েকটা", তাই verb plural।') } }),
        correct('sva-7-r3', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Correct the Task 2 sentence (one verb).', 'Task 2 sentence-টা ঠিক করুন (একটা verb)।'), sentence: 'Technology have made communication much faster.', accepted: ['Technology has made communication much faster.'], explanation: l('technology (uncountable) → has.', 'technology (uncountable) → has।') }),
        spot('sva-7-r4', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('One verb is wrong. Tap it and type the right form.', 'একটা verb ভুল। সেটায় tap করে সঠিক form লিখুন।'), sentence: 'The figures for Germany was slightly lower than those for France.', wrong: 'was', accepted: ['were'], explanation: l('Subject = the figures (plural) → were.', 'Subject = the figures (plural) → were।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sva-7-c1', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Which Task 2 sentence is correct?', 'কোন Task 2 sentence-টা ঠিক?'), options: ['Students who work part-time have less time to study.', 'Students who works part-time has less time to study.', 'Students who work part-time has less time to study.'], answer: 'Students who work part-time have less time to study.', explanation: l('who = students → work; main verb: students → have.', 'who = students → work; main verb: students → have।') }),
        spot('sva-7-c2', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('One word breaks this Task 1 sentence. Tap it, then fix it.', 'একটা word Task 1 sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'The percentage of adults who smoke have fallen to 20%.', wrong: 'have', accepted: ['has'], fixOptions: ['has', 'are', 'having'], explanation: l('the percentage → has.', 'the percentage → has।') }),
        order('sva-7-c3', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Build the Task 1 opening.', 'Task 1-এর শুরুটা সাজান।'), answer: 'The table shows the average monthly rent in four cities.', explanation: l('The table → shows.', 'The table → shows।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 1 overview', 'এবার আপনার পালা: একটা Task 1 overview'),
      exercises: [
        write('sva-7-y1', 'sva-quantity', {
          ...S,
          prompt: l('Task 1: A chart shows the number of students at a university from 2000 to 2020 and the percentage who were international. Write 3 sentences: what the chart shows, what happened to the number, and one sentence with a percentage.', 'Task 1: একটা chart ২০০০ থেকে ২০২০ পর্যন্ত একটা university-র শিক্ষার্থী সংখ্যা আর কত শতাংশ international ছিল তা দেখাচ্ছে। ৩টা sentence লিখুন: chart কী দেখায়, সংখ্যাটার কী হলো, আর শতাংশ দিয়ে একটা sentence।'),
          model: 'The chart shows the number of students at a university between 2000 and 2020. The number of students rose from 8,000 to 15,000. In 2020, 12% of the students were international.',
          checklist: [l('The chart shows… (-s)', 'The chart shows… (-s)'), l('The number of … rose / has risen (singular)', 'The number of … rose / has risen (singular)'), l('X% of the students were (follow "students")', 'X% of the students were ("students" অনুযায়ী)')],
          explanation: l('The three agreement traps of every Task 1 overview.', 'প্রতিটা Task 1 overview-এর তিনটা agreement ফাঁদ।'),
          task: 'The student writes 3 IELTS Task 1 sentences about student numbers and a percentage. Check subject–verb agreement only: "the chart/graph shows" (singular), "the charts show" (plural); "the number of + plural noun" takes a singular verb (has risen / was / rises), "a number of" takes a plural verb; with percentages and fractions the verb follows the noun after "of" (12% of the students were, 12% of the population was); "the figures for X were". Past simple verbs other than be have no agreement issue. For each error name the head of the subject and give the fix.',
          target: l('Task 1 agreement: number, figures, percentages', 'Task 1 agreement: number, figures, percentage'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Task 1: The chart shows · The number of … has · The figures for … were · X% of + noun decides.', 'Task 1: The chart shows · The number of … has · The figures for … were · X% of + noun ঠিক করে।'),
        l('Task 2: find the head word (quality of…, access to…, the reason…) before the verb.', 'Task 2: verb-এর আগে মূল word খুঁজুন (quality of…, access to…, the reason…)।'),
        l('Proofread: every verb → its subject → one or more?', 'Proofread: প্রতিটা verb → তার subject → একটা নাকি একাধিক?'),
      ],
    },
  ],
};

// ======================================================================= sva-8
export const svaMixed: Lesson = {
  id: 'sva-8',
  format: 'v2',
  title: l('Mixed practice: find and fix', 'Mixed practice: খুঁজুন আর ঠিক করুন'),
  why: l('In the exam nobody tells you which rule to use. Practise spotting agreement errors in mixed sentences, with no hints.', 'পরীক্ষায় কেউ বলে দেবে না কোন নিয়ম লাগবে। Hint ছাড়া মিশ্র sentence-এ agreement-এর ভুল ধরার অভ্যাস করুন।'),
  minutes: 12,
  difficulty: 'hard',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Proofread a paragraph', 'একটা paragraph proofread করুন'),
      situation: l('Task 2 paragraph: "Nowadays, everyone owns a mobile phone. The use of phones in classrooms have become a problem, and neither teachers nor parents knows how to control it."', 'Task 2 paragraph: "Nowadays, everyone owns a mobile phone. The use of phones in classrooms have become a problem, and neither teachers nor parents knows how to control it."'),
      question: l('Which verbs are wrong?', 'কোন verb-গুলো ভুল?'),
      options: ['have · knows', 'owns · have', 'owns · knows'],
      answer: 'have · knows',
      diagnose: {
        'have · knows': l('Right. The use (of phones…) → has · neither … nor parents → know. "everyone owns" is correct.', 'ঠিক। The use (of phones…) → has · neither … nor parents → know। "everyone owns" ঠিক আছে।'),
        'owns · have': l('"everyone owns" is correct — everyone is singular. The other error is "knows": the nearer subject is "parents" → know.', '"everyone owns" ঠিক — everyone singular। অন্য ভুলটা "knows": কাছের subject "parents" → know।'),
        'owns · knows': l('"everyone owns" is correct. The other error is "have": the subject is "the use" → has.', '"everyone owns" ঠিক। অন্য ভুলটা "have": subject হলো "the use" → has।'),
      },
    },
    {
      kind: 'discover',
      title: l('One routine for every sentence', 'প্রতিটা sentence-এর জন্য একটা নিয়ম'),
      items: [
        { en: 'The price of vegetables has gone up.', note: l('1 find the verb: has · 2 its subject: the price · 3 one → has ✓', '১ verb খুঁজুন: has · ২ তার subject: the price · ৩ একটা → has ✓') },
        { en: 'Rahim and his wife run a bakery.', note: l('subject: Rahim and his wife = they → run ✓', 'subject: Rahim and his wife = they → run ✓') },
        { en: 'There are three reasons for this.', note: l('subject after the verb: reasons → are ✓', 'verb-এর পরে subject: reasons → are ✓') },
      ],
      question: l('What is the routine?', 'নিয়মটা কী?'),
      options: [
        l('Find the verb → find its real subject → decide one or more → check the verb', 'Verb খুঁজুন → তার আসল subject খুঁজুন → একটা নাকি একাধিক ঠিক করুন → verb যাচাই করুন'),
        l('Look at the word just before the verb', 'Verb-এর ঠিক আগের word দেখুন'),
        l('Use a plural verb when the sentence is long', 'Sentence লম্বা হলে plural verb দিন'),
      ],
      answer: 0,
      pattern: l('Verb → real subject → one or more → verb form. The word just before the verb is often a trap.', 'Verb → আসল subject → একটা নাকি একাধিক → verb form। Verb-এর ঠিক আগের word প্রায়ই ফাঁদ।'),
    },
    {
      kind: 'concept',
      title: l('All the rules on one card', 'সব নিয়ম একটা card-এ'),
      body: l(
        'Everything from this module, in the order to check it. When you are unsure, go down the list.',
        'এই module-এর সবকিছু, যাচাই করার ক্রমে। নিশ্চিত না হলে তালিকা ধরে নিচে যান।',
      ),
      points: [
        l('1. One or more? he / she / it / uncountable → verb + s, has, is, was, doesn’t.', '১. একটা নাকি একাধিক? he / she / it / uncountable → verb + s, has, is, was, doesn’t।'),
        l('2. A and B → plural. A or / nor B, either / neither … or / nor → the nearer subject.', '২. A and B → plural। A or / nor B, either / neither … or / nor → কাছের subject।'),
        l('3. everyone, somebody, nothing, each, every → singular. Group nouns (family, team) → usually singular.', '৩. everyone, somebody, nothing, each, every → singular। Group noun (family, team) → সাধারণত singular।'),
        l('4. Long subjects: skip "of…", "with…", "who / which…" and find the head word.', '৪. লম্বা subject: "of…", "with…", "who / which…" বাদ দিয়ে মূল word খুঁজুন।'),
        l('5. the number of → singular · a number of → plural · X% of + noun decides · amounts of money / time → singular · there is / are → the noun after.', '৫. the number of → singular · a number of → plural · X% of + noun ঠিক করে · টাকা / সময়ের পরিমাণ → singular · there is / are → পরের noun।'),
        l('Why Bangla speakers slip: Bangla never asks "one or more?" at the verb, so without a routine the check is skipped. Go down this list for every verb until it becomes automatic.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় verb-এ কখনো "একটা নাকি একাধিক?" প্রশ্ন আসে না, তাই নিয়ম না থাকলে যাচাইটা বাদ পড়ে। অভ্যাস না হওয়া পর্যন্ত প্রতিটা verb-এর জন্য এই তালিকা ধরে যান।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Mixed examples', 'মিশ্র উদাহরণ'),
      items: [
        { en: 'Ten thousand taka is enough for a month in my town.', note: l('rule 5: one amount of money → is', 'নিয়ম ৫: টাকার একটা পরিমাণ → is') },
        { en: 'Every student and teacher has to wear an ID card.', note: l('rule 3: every … → singular, even with "and"', 'নিয়ম ৩: every … → singular, "and" থাকলেও') },
        { en: 'The books on the top shelf belong to my father.', note: l('rule 4: books (not shelf) → belong', 'নিয়ম ৪: books (shelf না) → belong') },
        { en: 'Either the manager or his assistants answer the phone.', note: l('rule 2: nearer subject assistants → answer', 'নিয়ম ২: কাছের subject assistants → answer') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Every city and town needs better public transport.', note: l('Task 2: every … → needs.', 'Task 2: every … → needs।') },
        { skill: 'listening', example: 'Each of the rooms has a key, and the keys are at reception.', note: l('Listening: each of → has; the keys → are.', 'Listening: each of → has; the keys → are।') },
        { skill: 'speaking', example: 'Two hours is too long to wait for a bus.', note: l('Part 3: one period of time → is.', 'Part 3: সময়ের একটা পরিমাণ → is।') },
        { skill: 'reading', example: 'Neither of the theories explains the results.', note: l('Reading: neither of → singular.', 'Reading: neither of → singular।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The price of books are rising.', right: 'The price of books is rising.', why: l('rule 4: head = price → is.', 'নিয়ম ৪: মূল word = price → is।') },
        { wrong: 'Each of the rooms have a balcony.', right: 'Each of the rooms has a balcony.', why: l('rule 3: each (of) → singular → has.', 'নিয়ম ৩: each (of) → singular → has।') },
        { wrong: 'Fifty dollars are too much for a textbook.', right: 'Fifty dollars is too much for a textbook.', why: l('rule 5: one amount → is.', 'নিয়ম ৫: একটা পরিমাণ → is।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: no hints', 'Practice: কোনো hint নেই'),
      exercises: [
        choice('sva-8-p1', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Salt and pepper ___ on the table.', options: ['are', 'is'], answer: 'are', explanation: l('A and B → plural → are.', 'A and B → plural → are।'), why: { is: l('Two things joined by "and" → plural.', '"and" দিয়ে জোড়া দুটো জিনিস → plural।') } }),
        choice('sva-8-p2', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Nothing ___ more important to me than my family.', options: ['is', 'are'], answer: 'is', explanation: l('nothing → singular → is.', 'nothing → singular → is।'), why: { are: l('nothing / something / everything → singular.', 'nothing / something / everything → singular।') } }),
        choice('sva-8-p3', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'The man who lives next to my parents ___ a taxi.', options: ['drives', 'drive'], answer: 'drives', explanation: l('Subject = the man → drives.', 'Subject = the man → drives।'), why: { drive: l('"my parents" is inside the who-clause; the subject is "the man".', '"my parents" who-clause-এর ভেতরে; subject হলো "the man"।') } }),
        choice('sva-8-p4', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Three years ___ a long time to live away from home.', options: ['is', 'are'], answer: 'is', explanation: l('One period of time → is.', 'সময়ের একটা পরিমাণ → is।'), why: { are: l('"Three years" here is one amount of time, so the verb is singular.', 'এখানে "Three years" সময়ের একটা পরিমাণ, তাই verb singular।') } }),
        choice('sva-8-p5', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Last year, the exam results ___ better than expected.', options: ['were', 'was'], answer: 'were', explanation: l('results (plural) → were.', 'results (plural) → were।'), why: { was: l('"the exam results" is plural; "exam" only describes them.', '"the exam results" plural; "exam" শুধু বর্ণনা করে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sva-8-r1', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'Every room in the hostel ___ (have) a fan.', base: 'have', accepted: ['has'], explanation: l('every + singular noun → has.', 'every + singular noun → has।'), why: { have: l('"every room" = each single room → singular.', '"every room" = প্রতিটা আলাদা room → singular।') } }),
        gap('sva-8-r2', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Write is or are.', 'is বা are লিখুন।'), sentence: 'Either my sisters or my mother ___ at home now.', accepted: ['is'], explanation: l('Nearer subject "my mother" → is.', 'কাছের subject "my mother" → is।'), why: { are: l('With either … or, the nearer subject decides: "my mother" → is.', 'either … or-এ কাছের subject ঠিক করে: "my mother" → is।') } }),
        correct('sva-8-r3', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Correct the sentence (one verb).', 'Sentence-টা ঠিক করুন (একটা verb)।'), sentence: 'There is many reasons to learn English.', accepted: ['There are many reasons to learn English.'], explanation: l('The noun after is "many reasons" → There are.', 'পরের noun "many reasons" → There are।') }),
        spot('sva-8-r4', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('One verb is wrong. Tap it and type the right form.', 'একটা verb ভুল। সেটায় tap করে সঠিক form লিখুন।'), sentence: 'The list of documents are on the embassy website.', wrong: 'are', accepted: ['is'], explanation: l('Subject = the list → is.', 'Subject = the list → is।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sva-8-c1', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Most of the money was spent on food, and most of the students were happy.', 'Most of the money were spent on food, and most of the students was happy.', 'Most of the money was spent on food, and most of the students was happy.'], answer: 'Most of the money was spent on food, and most of the students were happy.', explanation: l('most of + uncountable (money) → was · most of + plural (students) → were.', 'most of + uncountable (money) → was · most of + plural (students) → were।') }),
        spot('sva-8-c2', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'My cousin and her husband works in the same hospital.', wrong: 'works', accepted: ['work'], fixOptions: ['work', 'working', 'is'], explanation: l('A and B → plural → work.', 'A and B → plural → work।') }),
        correct('sva-8-c3', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Fix the Task 2 sentence (two verbs are wrong).', 'Task 2 sentence-টা ঠিক করুন (দুটো verb ভুল)।'), sentence: 'Young people who spends hours online is at risk of poor sleep.', accepted: ['Young people who spend hours online are at risk of poor sleep.'], explanation: l('who = young people → spend · main verb: young people → are.', 'who = young people → spend · main verb: young people → are।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 2 paragraph', 'এবার আপনার পালা: একটা Task 2 paragraph'),
      exercises: [
        write('sva-8-y1', 'sva-long', {
          ...S,
          prompt: l('Task 2: "Some people think students should not use phones at school." Write 3 sentences giving your opinion. Use at least one long subject (… of …, … who …) and one of: everyone, the number of, there are.', 'Task 2: "Some people think students should not use phones at school." মতামত দিয়ে ৩টা sentence লিখুন। অন্তত একটা লম্বা subject (… of …, … who …) আর এগুলোর একটা ব্যবহার করুন: everyone, the number of, there are।'),
          model: 'In my view, the use of phones in class distracts students. Students who check social media during lessons remember less. However, there are situations, such as emergencies, when a phone is useful.',
          checklist: [l('Long subject: the head word decides', 'লম্বা subject: মূল word ঠিক করে'), l('who-clause verb follows the noun before "who"', 'who-clause-এর verb "who"-এর আগের noun অনুযায়ী'), l('there is / are, everyone, the number of', 'there is / are, everyone, the number of')],
          explanation: l('Use the routine: verb → real subject → one or more.', 'নিয়মটা ব্যবহার করুন: verb → আসল subject → একটা নাকি একাধিক।'),
          task: 'The student writes 3 opinion sentences for IELTS Task 2 about phones at school, with at least one long subject. Check every subject–verb pair with no hints: singular subjects take verb + s / has / is / was; "A and B" is plural; with or/nor the nearer subject decides; everyone/each/every/nothing are singular; in long subjects the head word before "of / with / who / which" decides; the verb inside a who/which clause agrees with the noun before "who/which"; the number of → singular, a number of → plural; there is/are agrees with the noun after it. For each error name the real subject and give the fix. Keep agreement errors separate from other errors.',
          target: l('Every verb, no hints', 'প্রতিটা verb, কোনো hint ছাড়া'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Routine: verb → real subject → one or more → form.', 'নিয়ম: verb → আসল subject → একটা নাকি একাধিক → form।'),
        l('The word just before the verb is often a trap (of…, who…, or…).', 'Verb-এর ঠিক আগের word প্রায়ই ফাঁদ (of…, who…, or…)।'),
        l('Proofread every essay for agreement: it is quick and it raises accuracy.', 'প্রতিটা essay agreement-এর জন্য proofread করুন: দ্রুত হয় আর accuracy বাড়ায়।'),
      ],
    },
  ],
};

// ======================================================================= sva-9
export const svaReview: Lesson = {
  id: 'sva-9',
  kind: 'test',
  title: l('Subject–verb agreement review test', 'Subject–verb agreement review test'),
  why: l('Check what you have learned. Your mistakes here decide what Mino suggests you review.', 'কী শিখলেন যাচাই করুন। এখানের ভুল দেখেই Mino ঠিক করবে কী review করতে বলবে।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'concept',
      title: l('How this test works', 'এই test কীভাবে চলবে'),
      body: l(
        '12 questions from every lesson in this module. You see the answer after each question. Score 80% or more to complete the module; if you score less, Mino will suggest short reviews for the rules you missed.',
        'এই module-এর সব lesson থেকে ১২টা প্রশ্ন। প্রতিটা প্রশ্নের পরে answer দেখবেন। ৮০% বা বেশি পেলে module শেষ; কম পেলে যে নিয়মগুলো ভুল হয়েছে, Mino সেগুলোর ছোট review suggest করবে।',
      ),
    },
    {
      kind: 'practice',
      title: l('Part 1: choose', 'Part 1: বেছে নিন'),
      exercises: [
        choice('sva-9-e1', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'My brother ___ to work by bus.', options: ['goes', 'go'], answer: 'goes', explanation: l('One brother = he → goes.', 'একজন brother = he → goes।') }),
        choice('sva-9-e2', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Dhaka and Chattogram ___ the two largest cities in Bangladesh.', options: ['are', 'is'], answer: 'are', explanation: l('A and B → plural → are.', 'A and B → plural → are।') }),
        choice('sva-9-e3', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Somebody ___ left an umbrella in the classroom.', options: ['has', 'have'], answer: 'has', explanation: l('somebody → singular → has.', 'somebody → singular → has।') }),
        choice('sva-9-e4', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'The box of old photographs ___ under my bed.', options: ['is', 'are'], answer: 'is', explanation: l('Head = the box → is.', 'মূল word = the box → is।') }),
        choice('sva-9-e5', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Task 1: choose the correct verb.', 'Task 1: সঠিক verb বেছে নিন।'), sentence: 'The number of cyclists ___ fallen since 2015.', options: ['has', 'have'], answer: 'has', explanation: l('the number → has.', 'the number → has।') }),
        choice('sva-9-e6', 'sva-compound', { ...S, pattern: 'sva-compound', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Neither the students nor the teacher ___ happy with the new timetable.', options: ['is', 'are'], answer: 'is', explanation: l('Nearer subject "the teacher" → is.', 'কাছের subject "the teacher" → is।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Part 2: write and fix', 'Part 2: লিখুন আর ঠিক করুন'),
      exercises: [
        gap('sva-9-e7', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'My sister ___ (not / like) cold weather.', base: 'not like', accepted: ["doesn't like", 'does not like'], explanation: l('she → doesn’t like.', 'she → doesn’t like।') }),
        gap('sva-9-e8', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('Write is or are.', 'is বা are লিখুন।'), sentence: 'There ___ a lot of new buildings in my area.', accepted: ['are'], explanation: l('The noun after: buildings (plural) → are.', 'পরের noun: buildings (plural) → are।') }),
        correct('sva-9-e9', 'sva-indefinite', { ...S, pattern: 'sva-indefinite', prompt: l('Correct the sentence (one verb).', 'Sentence-টা ঠিক করুন (একটা verb)।'), sentence: 'Everyone in the office have a laptop.', accepted: ['Everyone in the office has a laptop.'], explanation: l('everyone → has.', 'everyone → has।') }),
        correct('sva-9-e10', 'sva-long', { ...S, pattern: 'sva-long-subject', prompt: l('Correct the sentence (one verb).', 'Sentence-টা ঠিক করুন (একটা verb)।'), sentence: 'One of my classmates speak three languages.', accepted: ['One of my classmates speaks three languages.'], explanation: l('Subject = one → speaks.', 'Subject = one → speaks।') }),
        spot('sva-9-e11', 'sva-quantity', { ...S, pattern: 'sva-quantity', prompt: l('One verb is wrong. Tap it and type the right form.', 'একটা verb ভুল। সেটায় tap করে সঠিক form লিখুন।'), sentence: 'Forty percent of the land are used for farming.', wrong: 'are', accepted: ['is'], explanation: l('X% of + uncountable noun (the land) → is.', 'X% of + uncountable noun (the land) → is।') }),
        correct('sva-9-e12', 'sva-basic', { ...S, pattern: 'sv-agreement', prompt: l('Fix the Task 1 sentence (two verbs are wrong).', 'Task 1 sentence-টা ঠিক করুন (দুটো verb ভুল)।'), sentence: 'The graph show that prices has risen.', accepted: ['The graph shows that prices have risen.'], explanation: l('The graph → shows · prices → have.', 'The graph → shows · prices → have।') }),
      ],
    },
    {
      kind: 'ielts',
      title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'The number of students has risen, and the figures for 2020 were the highest.', note: l('Task 1: number → has; figures → were.', 'Task 1: number → has; figures → were।') },
        { skill: 'speaking', example: 'My family lives in Rajshahi, and everyone there loves mangoes.', note: l('Part 1: family → lives; everyone → loves.', 'Part 1: family → lives; everyone → loves।') },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('One → verb + s / has / is · more → no -s / have / are.', 'একটা → verb + s / has / is · একাধিক → -s না / have / are।'),
        l('and → plural · or / nor → nearer · everyone / each → singular.', 'and → plural · or / nor → কাছেরটা · everyone / each → singular।'),
        l('Find the head of long subjects · the number of → singular · X% of + noun decides.', 'লম্বা subject-এর মূল word খুঁজুন · the number of → singular · X% of + noun ঠিক করে।'),
      ],
    },
  ],
};

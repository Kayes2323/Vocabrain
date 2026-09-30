import type { Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';
import { MUSEUMS, UNI_Q } from './writing';

/**
 * Understanding IELTS Writing, application lessons in the v2 format: wr-7
 * Writing traps (memorised or off-topic answers, under length, opinion in
 * Task 1, no overview, overused linkers and forced words), wr-8 a plan for the
 * whole hour, and wr-9 the module review test. Original Mino content.
 */
const P = { tag: 'writing' as const };

const PHONES_Q = 'Many schools ban mobile phones in class. To what extent do you agree or disagree with this policy?';

// ======================================================================= wr-7
export const wrTraps: Lesson = {
  id: 'wr-7',
  format: 'v2',
  title: l('Writing traps and how to avoid them', 'Writing-এর ফাঁদ আর কীভাবে এড়াবেন'),
  why: l('Most Writing marks are lost to a handful of traps: a memorised answer to a different question, too few words, an opinion in Task 1, no overview, and "decorated" language. Learn to check every answer against them.', 'Writing-এর বেশিরভাগ নম্বর হারায় কয়েকটা ফাঁদে: অন্য প্রশ্নের মুখস্থ উত্তর, কম word, Task 1-এ মতামত, overview না থাকা, আর "সাজানো" ভাষা। প্রতিটা উত্তর এগুলোর বিপরীতে যাচাই করতে শিখুন।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A confident but risky plan', 'আত্মবিশ্বাসী কিন্তু ঝুঁকিপূর্ণ plan'),
      situation: l(`Question: "${PHONES_Q}" Arif plans: use his memorised essay about technology in education, start every sentence with "Moreover", and add words like "plethora" to sound advanced.`, `প্রশ্ন: "${PHONES_Q}" Arif-এর plan: শিক্ষায় প্রযুক্তি নিয়ে মুখস্থ essay ব্যবহার, প্রতিটা sentence "Moreover" দিয়ে শুরু, আর "advanced" শোনাতে "plethora"-র মত word যোগ।`),
      question: l('How many parts of this plan are safe?', 'এই plan-এর কয়টা অংশ নিরাপদ?'),
      options: ['None', 'One', 'All three'],
      answer: 'None',
      diagnose: {
        None: l('Right. A memorised essay on a wider topic misses the exact question, mechanical "Moreover" hurts cohesion, and forced rare words hurt Lexical Resource.', 'ঠিক। বড় বিষয়ের মুখস্থ essay ঠিক প্রশ্নটা ধরে না, যান্ত্রিক "Moreover" cohesion-এর ক্ষতি করে, আর জোর করা বিরল word Lexical Resource-এর ক্ষতি করে।'),
        One: l('None of them: each one targets a different criterion.', 'একটাও না: প্রতিটা আলাদা একটা criteria-র ক্ষতি করে।'),
        'All three': l('All three are traps. Answer the exact question, link only where needed, and choose natural words.', 'তিনটাই ফাঁদ। ঠিক প্রশ্নের উত্তর দিন, দরকার হলেই linker দিন, আর স্বাভাবিক word বাছুন।'),
      },
    },
    {
      kind: 'discover',
      title: l('Six traps, one per habit', 'ছয়টা ফাঁদ'),
      items: [
        { en: 'Memorised or off-topic answer → Task Response', note: l('answer this question', 'এই প্রশ্নেরই উত্তর') },
        { en: 'Under 150 / 250 words → the score is lowered', note: l('meet the minimum', 'ন্যূনতম পূরণ করুন') },
        { en: 'Opinion or reasons in Task 1 → not in the data', note: l('report only', 'শুধু report') },
        { en: 'No overview in Task 1 → main features not reported', note: l('"Overall, …"', '"Overall, …"') },
        { en: '"Moreover" everywhere, forced rare words → cohesion and vocabulary', note: l('natural beats decorated', 'সাজানোর চেয়ে স্বাভাবিক ভালো') },
      ],
      question: l('Which trap is "I think science museums are more useful" in Task 1?', 'Task 1-এ "I think science museums are more useful" কোন ফাঁদ?'),
      options: [
        l('An opinion in Task 1', 'Task 1-এ মতামত'),
        l('Under length', 'কম দৈর্ঘ্য'),
        l('A missing linker', 'Linker নেই'),
      ],
      answer: 0,
      pattern: l('Check every answer for: the exact question, the word minimum, no opinion in Task 1, an overview in Task 1, and natural linking and words.', 'প্রতিটা উত্তর যাচাই করুন: ঠিক প্রশ্ন, ন্যূনতম word, Task 1-এ মতামত নয়, Task 1-এ overview, আর স্বাভাবিক linking ও word।'),
    },
    {
      kind: 'concept',
      title: l('A five-point final check', 'পাঁচ-বিন্দুর শেষ যাচাই'),
      body: l(
        'Keep a few minutes at the end of each task for this check. Each point matches a lesson in this module.',
        'প্রতিটা task-এর শেষে এই যাচাইয়ের জন্য কয়েক মিনিট রাখুন। প্রতিটা বিন্দু এই module-এর একটা lesson-এর সাথে মেলে।',
      ),
      points: [
        l('1. Task: does every paragraph answer this exact question — every part? (lesson 4)', '১. Task: প্রতিটা paragraph কি ঠিক এই প্রশ্নের — প্রতিটা অংশের — উত্তর দেয়? (lesson ৪)'),
        l('2. Length: at least 150 (Task 1) and 250 (Task 2) words. (lesson 1)', '২. দৈর্ঘ্য: অন্তত ১৫০ (Task 1) আর ২৫০ (Task 2) word। (lesson ১)'),
        l('3. Task 1: an overview, accurate data, no opinion. (lessons 2–3)', '৩. Task 1: overview, নির্ভুল data, মতামত নয়। (lesson ২–৩)'),
        l('4. Task 2: one clear position, one developed idea per paragraph. (lessons 4–5)', '৪. Task 2: একটা পরিষ্কার অবস্থান, প্রতি paragraph-এ একটা বিকশিত idea। (lesson ৪–৫)'),
        l('5. Language: linkers only where needed, referencing, natural words; fix small grammar slips. (lesson 6)', '৫. ভাষা: দরকার হলেই linker, referencing, স্বাভাবিক word; ছোট grammar ভুল ঠিক করুন। (lesson ৬)'),
      ],
    },
    {
      kind: 'examples',
      title: l('Traps and fixes', 'ফাঁদ আর সমাধান'),
      items: [
        { en: '✗ Memorised "technology in education" essay → ✓ Paragraphs about banning phones in class', note: l('exact topic', 'ঠিক বিষয়') },
        { en: '✗ Task 1: "This shows people prefer science." → ✓ "Visitors to the Science Museum rose sharply."', note: l('report, do not explain', 'report করুন, ব্যাখ্যা নয়') },
        { en: '✗ "Moreover, … Moreover, …" → ✓ "However, this rule…"', note: l('linker matches logic', 'logic অনুযায়ী linker') },
        { en: '✗ "a plethora of distractions" → ✓ "many distractions"', note: l('natural word', 'স্বাভাবিক word') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters', 'কেন এটা গুরুত্বপূর্ণ'),
      uses: [
        { skill: 'writing', example: 'Each trap lowers one of the four criteria.', note: l('Five checks.', 'পাঁচটা যাচাই।') },
        { skill: 'speaking', example: 'Memorised answers sound unnatural in Speaking too.', note: l('Flexible ideas, not scripts.', 'মুখস্থ নয়, নমনীয় idea।') },
        { skill: 'reading', example: 'Reading closely for the exact question is a Reading skill.', note: l('Every word counts.', 'প্রতিটা word গুরুত্বপূর্ণ।') },
        { skill: 'listening', example: 'Listening also punishes answers to the wrong question.', note: l('Know what is asked.', 'কী চাওয়া হয়েছে জানুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'A memorised essay on a similar topic', right: 'Plan for this exact question', why: l('Off-topic lowers the score.', 'প্রশ্নের বাইরে লিখলে score কমে।') },
        { wrong: 'Task 1: "This is because people like science."', right: 'Report only what the data shows', why: l('No reasons that are not in the chart.', 'Chart-এ নেই এমন কারণ নয়।') },
        { wrong: 'Stopping Task 2 at 200 words to finish on time', right: 'Plan the time so Task 2 reaches 250', why: l('Under length lowers the score.', 'কম দৈর্ঘ্য score কমায়।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: spot the trap', 'Practice: ফাঁদ চিনুন'),
      exercises: [
        choice('wr-7-p1', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l(`Question: "${PHONES_Q}" Which body paragraph topic is on-topic?`, `প্রশ্ন: "${PHONES_Q}" কোন body paragraph বিষয় প্রশ্নের মধ্যে?`), options: ['Phones in class distract students from lessons', 'The history of mobile phones', 'Why online learning is popular'], answer: 'Phones in class distract students from lessons', explanation: l('It is about the ban in class.', 'এটা ক্লাসে নিষেধ নিয়ে।'), why: { 'The history of mobile phones': l('Related topic, different question.', 'সম্পর্কিত বিষয়, আলাদা প্রশ্ন।'), 'Why online learning is popular': l('Off-topic: the question is about banning phones in class.', 'প্রশ্নের বাইরে: প্রশ্নটা ক্লাসে phone নিষেধ নিয়ে।') } }),
        choice('wr-7-p2', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Which sentence does NOT belong in a Task 1 answer?', 'কোন sentence Task 1 উত্তরে থাকা উচিত নয়?'), sentence: MUSEUMS, options: ['This is because young people prefer science to art.', 'Overall, the Science Museum became the most visited.', 'The History Museum remained stable at around 80,000.'], answer: 'This is because young people prefer science to art.', explanation: l('A reason that is not in the table.', 'Table-এ নেই এমন কারণ।'), why: { 'Overall, the Science Museum became the most visited.': l('A correct overview.', 'সঠিক overview।'), 'The History Museum remained stable at around 80,000.': l('Accurate data description.', 'নির্ভুল data বর্ণনা।') } }),
        choice('wr-7-p3', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Your Task 2 has 210 words and 3 minutes are left. Best move?', 'আপনার Task 2-এ ২১০ word, ৩ মিনিট বাকি। সবচেয়ে ভালো পদক্ষেপ?'), options: ['Add a relevant sentence or two to reach 250 and finish the conclusion', 'Stop — quality matters more than length', 'Copy the question again to add words'], answer: 'Add a relevant sentence or two to reach 250 and finish the conclusion', explanation: l('Under 250 lowers the score.', '২৫০-এর কম হলে score কমে।'), why: { 'Stop — quality matters more than length': l('Being under the minimum lowers the score.', 'ন্যূনতমের কম হলে score কমে।'), 'Copy the question again to add words': l('Copied words do not answer the question.', 'তোলা word প্রশ্নের উত্তর দেয় না।') } }),
        choice('wr-7-p4', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Which revision is best?', 'কোন সংশোধন সবচেয়ে ভালো?'), sentence: 'Moreover, phones are distracting. Moreover, phones are used for cheating.', options: ['Phones are distracting, and they can also be used for cheating.', 'Moreover, phones are distracting. Furthermore, phones are used for cheating.', 'Phones are a plethora of distraction and cheating.'], answer: 'Phones are distracting, and they can also be used for cheating.', explanation: l('Referencing (they) and one natural link.', 'Referencing (they) আর একটা স্বাভাবিক link।'), why: { 'Moreover, phones are distracting. Furthermore, phones are used for cheating.': l('Still mechanical, still repeats "phones".', 'এখনো যান্ত্রিক, এখনো "phones"-এর পুনরাবৃত্তি।'), 'Phones are a plethora of distraction and cheating.': l('Forced and wrong: "plethora" does not fit here.', 'জোর করা আর ভুল: "plethora" এখানে মানায় না।') } }),
        choice('wr-7-p5', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('Which sentence matches the table?', 'কোন sentence table-এর সাথে মেলে?'), sentence: MUSEUMS, options: ['The Art Gallery’s visitors fell from 150,000 to 90,000.', 'The Art Gallery’s visitors rose to 150,000.', 'The Art Gallery was the most visited museum in 2020.'], answer: 'The Art Gallery’s visitors fell from 150,000 to 90,000.', explanation: l('Accurate direction and numbers.', 'নির্ভুল দিক আর সংখ্যা।'), why: { 'The Art Gallery’s visitors rose to 150,000.': l('It started at 150,000 and fell.', '১৫০,০০০ থেকে শুরু হয়ে কমেছে।'), 'The Art Gallery was the most visited museum in 2020.': l('In 2020 the Science Museum had the most.', '২০২০-এ Science Museum-এ সবচেয়ে বেশি।') } }),
        choice('wr-7-p6', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('A conclusion says: "Also, phones are expensive for parents." The problem?', 'Conclusion বলে: "Also, phones are expensive for parents।" সমস্যা?'), options: ['A new argument in the conclusion', 'It is too short', 'It uses "Also"'], answer: 'A new argument in the conclusion', explanation: l('Sum up; no new arguments.', 'সংক্ষেপ; নতুন যুক্তি নয়।'), why: { 'It is too short': l('Length is not the issue.', 'দৈর্ঘ্য সমস্যা নয়।'), 'It uses "Also"': l('The problem is the new idea, not the word.', 'সমস্যা নতুন idea, word নয়।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('wr-7-r1', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'Task 1 needs at least ___ words, Task 2 at least 250.', accepted: ['150'], explanation: l('150 and 250.', '১৫০ আর ২৫০।') }),
        gap('wr-7-r2', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'In Task 1, report the data and give no ___.', accepted: ['opinion', 'opinions', 'reasons', 'views'], explanation: l('No opinion.', 'মতামত নয়।') }),
        spot('wr-7-r3', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('One word makes this advice wrong. Tap it and fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'A memorised essay on a similar topic is always safe.', wrong: 'safe', accepted: ['risky', 'dangerous'], explanation: l('It may not answer the exact question.', 'এটা ঠিক প্রশ্নের উত্তর নাও দিতে পারে।') }),
        correct('wr-7-r4', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Replace the forced word with a natural one.', 'জোর করা word-টা স্বাভাবিক word দিয়ে বদলান।'), sentence: 'Phones cause a plethora of distractions.', accepted: ['Phones cause many distractions.', 'Phones cause a lot of distractions.', 'Phones cause a number of distractions.'], explanation: l('Natural beats decorated.', 'সাজানোর চেয়ে স্বাভাবিক ভালো।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('wr-7-c1', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('Which trap does a memorised essay most often fall into?', 'মুখস্থ essay সবচেয়ে বেশি কোন ফাঁদে পড়ে?'), options: ['Not answering the exact question', 'Too many paragraphs', 'Too few examples of rare words'], answer: 'Not answering the exact question', explanation: l('Task Response.', 'Task Response।') }),
        spot('wr-7-c2', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('One word makes this advice wrong. Tap it, then fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'In Task 1, explain why the numbers changed.', wrong: 'explain', accepted: ['describe'], fixOptions: ['describe', 'guess', 'imagine'], explanation: l('Describe what the data shows; do not explain.', 'Data যা দেখায় বর্ণনা করুন; ব্যাখ্যা নয়।') }),
        order('wr-7-c3', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Answer this question, not a similar one.', explanation: l('Exact question.', 'ঠিক প্রশ্ন।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: fix the traps', 'এবার আপনার পালা: ফাঁদগুলো ঠিক করুন'),
      exercises: [
        write('wr-7-y1', 'wr-task2', {
          ...P,
          prompt: l(`Question: "${PHONES_Q}" Rewrite this introduction so it answers the question and states a clear position: "Moreover, technology has a plethora of advantages in education and it is very important nowadays."`, `প্রশ্ন: "${PHONES_Q}" এই introduction-টা এমনভাবে আবার লিখুন যাতে এটা প্রশ্নের উত্তর দেয় আর পরিষ্কার অবস্থান জানায়: "Moreover, technology has a plethora of advantages in education and it is very important nowadays."`),
          model: 'Many schools do not allow students to use mobile phones during lessons. I largely agree with this policy, because phones distract students, although teachers could allow them for specific learning activities.',
          checklist: [l('about banning phones in class, not technology in general', 'ক্লাসে phone নিষেধ নিয়ে, সাধারণ প্রযুক্তি নয়'), l('a clear position (agree / disagree / partly)', 'পরিষ্কার অবস্থান (একমত / দ্বিমত / আংশিক)'), l('no forced words, no "Moreover" at the start', 'জোর করা word নয়, শুরুতে "Moreover" নয়')],
          explanation: l('Exact topic, clear position, natural words.', 'ঠিক বিষয়, পরিষ্কার অবস্থান, স্বাভাবিক word।'),
          task: `The student rewrites a weak Task 2 introduction for this question: "${PHONES_Q}". Judge Task Response first: the introduction is about schools banning phones in class (not technology in general), paraphrases the question, and states a clear position on the policy. Then check cohesion and word choice: no opening "Moreover", no forced words such as "plethora", natural and precise vocabulary. Correct grammar only where it blocks the meaning.`,
          target: l('Avoiding Writing traps', 'Writing-এর ফাঁদ এড়ানো'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Answer this exact question; memorised essays are risky.', 'ঠিক এই প্রশ্নের উত্তর দিন; মুখস্থ essay ঝুঁকিপূর্ণ।'),
        l('Meet 150 / 250; Task 1: overview, no opinion.', '১৫০ / ২৫০ পূরণ করুন; Task 1: overview, মতামত নয়।'),
        l('Natural links and words beat decoration.', 'সাজানোর চেয়ে স্বাভাবিক link আর word ভালো।'),
      ],
    },
  ],
};

// ======================================================================= wr-8
export const wrPlan: Lesson = {
  id: 'wr-8',
  format: 'v2',
  title: l('A plan for the whole hour', 'পুরো ঘণ্টার plan'),
  why: l('Put the skills together into one routine for the 60 minutes: plan, write and check each task, and protect the time Task 2 needs.', 'দক্ষতাগুলো ৬০ মিনিটের একটা নিয়মে জুড়ুন: প্রতিটা task-এর plan, লেখা আর যাচাই, আর Task 2-এর দরকারি সময় রক্ষা।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('No plan, no conclusion', 'Plan নেই, conclusion নেই'),
      situation: l('Nila starts writing Task 2 immediately. After 35 minutes she realises her second paragraph repeats the first, rewrites it, and runs out of time before the conclusion.', 'Nila সাথে সাথে Task 2 লেখা শুরু করেন। ৩৫ মিনিট পরে বোঝেন দ্বিতীয় paragraph প্রথমটার পুনরাবৃত্তি, আবার লেখেন, আর conclusion-এর আগেই সময় শেষ।'),
      question: l('What would have helped most?', 'সবচেয়ে বেশি কী সাহায্য করত?'),
      options: ['A few minutes of planning: position, one idea per paragraph, examples', 'Writing faster from the start', 'Skipping the introduction'],
      answer: 'A few minutes of planning: position, one idea per paragraph, examples',
      diagnose: {
        'A few minutes of planning: position, one idea per paragraph, examples': l('Right. A short plan prevents repeated paragraphs and leaves time for the conclusion and a final check.', 'ঠিক। ছোট একটা plan পুনরাবৃত্ত paragraph আটকায় আর conclusion ও শেষ যাচাইয়ের সময় রাখে।'),
        'Writing faster from the start': l('Speed without a plan led to the rewrite in the first place.', 'Plan ছাড়া গতিই আবার লেখার কারণ হয়েছিল।'),
        'Skipping the introduction': l('The introduction states the position — it is needed.', 'Introduction অবস্থান জানায় — এটা দরকার।'),
      },
    },
    {
      kind: 'discover',
      title: l('Plan → write → check', 'Plan → লেখা → যাচাই'),
      items: [
        { en: 'Task 1 (~20 min): read the chart → find 2–3 main features → overview → group the data → check numbers', note: l('150+ words', '১৫০+ word') },
        { en: 'Task 2 (~40 min): read the question → position → one idea per paragraph + example → write → check', note: l('250+ words', '২৫০+ word') },
        { en: 'You may do the tasks in either order — but keep about 40 minutes for Task 2', note: l('Task 2 counts for more', 'Task 2-এর গুরুত্ব বেশি') },
        { en: 'Last minutes: the five-point check', note: l('lesson 7', 'lesson ৭') },
      ],
      question: l('What is the first step for Task 2?', 'Task 2-এর প্রথম ধাপ কী?'),
      options: [
        l('Read the question and find every part', 'প্রশ্ন পড়ে প্রতিটা অংশ খুঁজুন'),
        l('Write the conclusion', 'Conclusion লিখুন'),
        l('Choose rare words to use', 'ব্যবহারের জন্য বিরল word বাছুন'),
      ],
      answer: 0,
      pattern: l('Each task: understand → plan → write → check. About 20 minutes for Task 1, about 40 for Task 2.', 'প্রতিটা task: বোঝা → plan → লেখা → যাচাই। Task 1-এ প্রায় ২০ মিনিট, Task 2-এ প্রায় ৪০।'),
    },
    {
      kind: 'concept',
      title: l('A routine for 60 minutes', '৬০ মিনিটের নিয়ম'),
      body: l(
        'A fixed routine removes decisions under pressure. Adjust the minutes to your speed, but keep the steps.',
        'নির্দিষ্ট নিয়ম চাপের মধ্যে সিদ্ধান্ত কমায়। মিনিট নিজের গতিমতো বদলান, কিন্তু ধাপগুলো রাখুন।',
      ),
      points: [
        l('Task 1: 2–3 minutes to find the main features and group the data; write the introduction, overview and two body paragraphs; check every number.', 'Task 1: মূল বৈশিষ্ট্য খুঁজতে আর data ভাগ করতে ২–৩ মিনিট; introduction, overview আর দুটো body paragraph লিখুন; প্রতিটা সংখ্যা মিলিয়ে নিন।'),
        l('Task 2: 3–5 minutes to plan (position, a main idea and an example for each body paragraph); write; keep a few minutes for the conclusion and the check.', 'Task 2: plan-এ ৩–৫ মিনিট (অবস্থান, প্রতিটা body paragraph-এর মূল idea আর উদাহরণ); লিখুন; conclusion আর যাচাইয়ের জন্য কয়েক মিনিট রাখুন।'),
        l('Task 2 counts for more: never let Task 1 eat its 40 minutes.', 'Task 2-এর গুরুত্ব বেশি: Task 1-কে কখনো এর ৪০ মিনিট খেতে দেবেন না।'),
        l('Know roughly how many words you write per line, so you can estimate length without counting every word.', 'প্রতি লাইনে মোটামুটি কত word লেখেন জেনে রাখুন, যাতে প্রতিটা word না গুনেই দৈর্ঘ্য আন্দাজ করতে পারেন।'),
        l('Practise under time: a routine only works if you have used it before the test.', 'সময় ধরে practice করুন: নিয়ম তখনই কাজ করে যখন test-এর আগে ব্যবহার করেছেন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('A Task 2 plan in 4 minutes', '৪ মিনিটে একটা Task 2 plan'),
      items: [
        { en: `Question: "${PHONES_Q}"`, note: l('topic + instruction', 'বিষয় + নির্দেশ') },
        { en: 'Position: largely agree', note: l('clear', 'পরিষ্কার') },
        { en: 'Body 1: phones distract → example: checking messages in class', note: l('idea + example', 'idea + উদাহরণ') },
        { en: 'Body 2: some learning uses → example: a dictionary app, with the teacher’s permission', note: l('the limit of my position', 'অবস্থানের সীমা') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'writing', example: '60 minutes, two tasks, one routine', note: l('Plan → write → check.', 'Plan → লেখা → যাচাই।') },
        { skill: 'speaking', example: 'Part 2: use the 1 minute to plan, like a mini essay plan.', note: l('Plan before speaking.', 'বলার আগে plan।') },
        { skill: 'reading', example: 'Reading: about 20 minutes per passage — the same time discipline.', note: l('Protect the time.', 'সময় রক্ষা করুন।') },
        { skill: 'listening', example: 'Listening: read ahead and predict — plan before the audio.', note: l('Prepare first.', 'আগে প্রস্তুতি।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Starting Task 2 with no plan', right: '3–5 minutes: position, ideas, examples', why: l('Prevents repetition and rewriting.', 'পুনরাবৃত্তি আর আবার লেখা আটকায়।') },
        { wrong: 'Letting Task 1 run to 35 minutes', right: 'About 20 minutes, then move on', why: l('Task 2 counts for more.', 'Task 2-এর গুরুত্ব বেশি।') },
        { wrong: 'No time left to check', right: 'Keep the last few minutes for the five-point check', why: l('Small slips cost marks.', 'ছোট ভুলে নম্বর যায়।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: the routine', 'Practice: নিয়ম'),
      exercises: [
        choice('wr-8-p1', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('About how long for Task 1?', 'Task 1-এ মোটামুটি কত সময়?'), options: ['About 20 minutes', 'About 40 minutes', 'As long as it takes'], answer: 'About 20 minutes', explanation: l('20 + 40 = 60.', '২০ + ৪০ = ৬০।'), why: { 'About 40 minutes': l('That is Task 2’s time.', 'ওটা Task 2-এর সময়।'), 'As long as it takes': l('Then Task 2 loses time.', 'তাহলে Task 2 সময় হারায়।') } }),
        choice('wr-8-p2', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('What goes into a Task 2 plan?', 'Task 2 plan-এ কী থাকে?'), options: ['Position, a main idea and an example for each body paragraph', 'A list of rare words', 'The full essay written twice'], answer: 'Position, a main idea and an example for each body paragraph', explanation: l('Short and useful.', 'ছোট আর কাজের।'), why: { 'A list of rare words': l('Words do not plan the argument.', 'Word যুক্তির plan করে না।'), 'The full essay written twice': l('There is no time for a full draft.', 'পুরো খসড়ার সময় নেই।') } }),
        choice('wr-8-p3', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('First step in Task 1?', 'Task 1-এর প্রথম ধাপ?'), options: ['Find the 2–3 main features of the chart', 'Write every number down', 'Decide your opinion'], answer: 'Find the 2–3 main features of the chart', explanation: l('They become the overview.', 'এগুলোই overview হয়।'), why: { 'Write every number down': l('Select, do not list.', 'বাছুন, তালিকা নয়।'), 'Decide your opinion': l('No opinion in Task 1.', 'Task 1-এ মতামত নয়।') } }),
        choice('wr-8-p4', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Can you do Task 2 before Task 1?', 'Task 1-এর আগে কি Task 2 করা যায়?'), options: ['Yes — either order, but manage the time', 'No — Task 1 must come first', 'Only on computer'], answer: 'Yes — either order, but manage the time', explanation: l('You manage the 60 minutes.', '৬০ মিনিট আপনিই ভাগ করেন।'), why: { 'No — Task 1 must come first': l('You may choose the order.', 'ক্রম আপনি বাছতে পারেন।'), 'Only on computer': l('This is not limited to the computer test.', 'এটা শুধু computer test-এ সীমিত নয়।') } }),
        choice('wr-8-p5', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('Your plan has the same idea for Body 1 and Body 2. Fix?', 'আপনার plan-এ Body 1 আর Body 2-এ একই idea। সমাধান?'), options: ['Change Body 2 to a different main idea', 'Keep both — repetition adds words', 'Merge everything into one long paragraph'], answer: 'Change Body 2 to a different main idea', explanation: l('One different idea per paragraph.', 'প্রতি paragraph-এ আলাদা idea।'), why: { 'Keep both — repetition adds words': l('Repetition does not develop the answer.', 'পুনরাবৃত্তি উত্তর বিকশিত করে না।'), 'Merge everything into one long paragraph': l('Clear paragraphs help Coherence & Cohesion.', 'পরিষ্কার paragraph Coherence & Cohesion-এ সাহায্য করে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('wr-8-r1', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'Keep about ___ minutes for Task 2.', accepted: ['40', 'forty'], explanation: l('About 40 minutes.', 'প্রায় ৪০ মিনিট।') }),
        gap('wr-8-r2', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'Before writing Task 2, spend a few minutes making a ___.', accepted: ['plan'], explanation: l('plan.', 'plan।') }),
        spot('wr-8-r3', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('One word makes this advice wrong. Tap it and fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'In Task 1, find the smallest features before you write.', wrong: 'smallest', accepted: ['main', 'key'], explanation: l('The main features.', 'মূল বৈশিষ্ট্য।') }),
        correct('wr-8-r4', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Correct the plan.', 'Plan-টা ঠিক করুন।'), sentence: 'Spend 40 minutes on Task 1 and 20 minutes on Task 2.', accepted: ['Spend 20 minutes on Task 1 and 40 minutes on Task 2.', 'Spend about 20 minutes on Task 1 and about 40 minutes on Task 2.'], explanation: l('20 + 40.', '২০ + ৪০।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('wr-8-c1', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('What should the last few minutes of each task be for?', 'প্রতিটা task-এর শেষ কয়েক মিনিট কীসের জন্য?'), options: ['Checking task, length, data and language', 'Starting a new paragraph', 'Rewriting the introduction'], answer: 'Checking task, length, data and language', explanation: l('The five-point check.', 'পাঁচ-বিন্দুর যাচাই।') }),
        spot('wr-8-c2', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('One word makes this advice wrong. Tap it, then fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Plan Task 2 after you finish writing it.', wrong: 'after', accepted: ['before'], fixOptions: ['before', 'while', 'without'], explanation: l('Plan first.', 'আগে plan।') }),
        order('wr-8-c3', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('Build the routine.', 'নিয়মটা সাজান।'), answer: 'Read the question, plan, write, then check.', explanation: l('Plan → write → check.', 'Plan → লেখা → যাচাই।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 2 plan', 'এবার আপনার পালা: একটা Task 2 plan'),
      exercises: [
        write('wr-8-y1', 'wr-task2', {
          ...P,
          prompt: l(`Question: "${UNI_Q}" Write a short plan: your position, the main idea and an example for each body paragraph, and one sentence on how you will use your 40 minutes.`, `প্রশ্ন: "${UNI_Q}" একটা ছোট plan লিখুন: আপনার অবস্থান, প্রতিটা body paragraph-এর মূল idea আর উদাহরণ, আর ৪০ মিনিট কীভাবে ব্যবহার করবেন তা নিয়ে এক sentence।`),
          model: 'Position: universities should offer a wide range of subjects, but include job skills. Body 1: job-related subjects help graduates find work quickly — example: accounting graduates can apply to banks straight away. Body 2: a wide range of subjects builds flexible thinking — example: an engineering student who studies philosophy learns to question assumptions. I will plan for 4 minutes, write for about 32 minutes and check for the last 4 minutes.',
          checklist: [l('a clear position', 'পরিষ্কার অবস্থান'), l('both views covered, one idea + example each', 'দুই view, প্রতিটায় একটা idea + উদাহরণ'), l('time for planning and checking inside 40 minutes', '৪০ মিনিটের মধ্যে plan আর যাচাইয়ের সময়')],
          explanation: l('Plan the answer and the time.', 'উত্তর আর সময় দুটোরই plan।'),
          task: `The student writes a Task 2 plan for this question: "${UNI_Q}". Judge the plan first: a clear position; body paragraphs that cover both views (job-related subjects and a wide range) with one main idea and a relevant example each; a realistic time plan within about 40 minutes that includes planning and checking; everything on the exact topic. Then correct grammar only where it blocks the meaning.`,
          target: l('Planning the hour', 'ঘণ্টার plan'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Understand → plan → write → check, for both tasks.', 'দুই task-এই: বোঝা → plan → লেখা → যাচাই।'),
        l('About 20 minutes for Task 1, about 40 for Task 2.', 'Task 1-এ প্রায় ২০, Task 2-এ প্রায় ৪০ মিনিট।'),
        l('Practise the routine under time before the test.', 'Test-এর আগে সময় ধরে নিয়মটা practice করুন।'),
      ],
    },
  ],
};

// ======================================================================= wr-9
export const wrReview: Lesson = {
  id: 'wr-9',
  kind: 'test',
  title: l('Writing review test', 'Writing review test'),
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
        'এই module-এর সব lesson থেকে ১২টা প্রশ্ন। Answer আর ব্যাখ্যা প্রতিটা প্রশ্নের পরে না, শেষে দেখবেন। ৮০% বা বেশি পেলে module শেষ; কম পেলে যে নম্বরগুলো কেটেছে তার জন্য Mino ছোট review-এর পরামর্শ দেবে।',
      ),
    },
    {
      kind: 'practice',
      title: l('Part 1: choose', 'Part 1: বেছে নিন'),
      exercises: [
        choice('wr-9-e1', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Minimum length for Task 1?', 'Task 1-এর ন্যূনতম দৈর্ঘ্য?'), options: ['150 words', '250 words', '100 words'], answer: '150 words', explanation: l('150; Task 2: 250.', '১৫০; Task 2: ২৫০।') }),
        choice('wr-9-e2', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('An overview gives…', 'Overview দেয়…'), options: ['the main trends, without detailed numbers', 'every number', 'your opinion'], answer: 'the main trends, without detailed numbers', explanation: l('Big picture.', 'বড় ছবি।') }),
        choice('wr-9-e3', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('Choose the correct sentence.', 'সঠিক sentence বাছুন।'), options: ['Visitors increased sharply.', 'Visitors were increased sharply.', 'Visitors raised sharply.'], answer: 'Visitors increased sharply.', explanation: l('No passive; rise/increase, not raise.', 'Passive নয়; rise/increase, raise নয়।') }),
        choice('wr-9-e4', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('"Discuss both views and give your own opinion" needs…', '"Discuss both views and give your own opinion"-এ লাগে…'), options: ['both views and your position', 'only your opinion', 'only the view you disagree with'], answer: 'both views and your position', explanation: l('Every part.', 'প্রতিটা অংশ।') }),
        choice('wr-9-e5', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('A body paragraph should have…', 'একটা body paragraph-এ থাকা উচিত…'), options: ['one main idea, explained, with an example', 'as many ideas as possible', 'only examples'], answer: 'one main idea, explained, with an example', explanation: l('Developed, not listed.', 'বিকশিত, তালিকা নয়।') }),
        choice('wr-9-e6', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Lexical Resource rewards…', 'Lexical Resource পুরস্কৃত করে…'), options: ['precise, natural words and collocations', 'rare words wherever possible', 'long words'], answer: 'precise, natural words and collocations', explanation: l('Not rare words.', 'বিরল word নয়।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Part 2: write and fix', 'Part 2: লিখুন আর ঠিক করুন'),
      exercises: [
        gap('wr-9-e7', 'wr-format', { ...P, pattern: 'wr-format-fact', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'IELTS Writing lasts ___ minutes in total.', accepted: ['60', 'sixty'], explanation: l('60.', '৬০।') }),
        gap('wr-9-e8', 'wr-data', { ...P, pattern: 'wr-data-language', prompt: l('Write one preposition.', 'একটা preposition লিখুন।'), sentence: 'Visitors rose from 120,000 ___ 260,000.', accepted: ['to'], explanation: l('from … to.', 'from … to।') }),
        correct('wr-9-e9', 'wr-task1', { ...P, pattern: 'wr-overview', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'In Task 1, give your opinion about the data.', accepted: ['In Task 1, do not give your opinion about the data.', 'In Task 1, describe the data without giving your opinion.', 'In Task 1, report the data without giving your opinion.'], explanation: l('No opinion.', 'মতামত নয়।') }),
        correct('wr-9-e10', 'wr-paragraph', { ...P, pattern: 'wr-paragraph-unit', prompt: l('Correct the rule.', 'নিয়মটা ঠিক করুন।'), sentence: 'A conclusion should add a new main argument.', accepted: ['A conclusion should sum up your position.', 'A conclusion should not add a new main argument.', 'A conclusion should summarise your position.', 'A conclusion should summarize your position.'], explanation: l('Sum up.', 'সংক্ষেপ।') }),
        gap('wr-9-e11', 'wr-cohesion', { ...P, pattern: 'wr-cohesion-word', prompt: l('Complete the collocation.', 'Collocation-টা পূরণ করুন।'), sentence: 'Parents ___ an important role in education.', accepted: ['play', 'have'], explanation: l('play a role.', 'play a role।') }),
        correct('wr-9-e12', 'wr-task2', { ...P, pattern: 'wr-task-response', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'Use a memorised essay if the topic is similar.', accepted: ['Answer the exact question, not a similar one.', 'Do not use a memorised essay if the topic is similar.', 'Answer the exact question instead of using a memorised essay.'], explanation: l('Answer the exact question.', 'ঠিক প্রশ্নের উত্তর দিন।') }),
      ],
    },
    {
      kind: 'ielts',
      title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'Task 1: 150+ words, ~20 min · Task 2: 250+ words, ~40 min · four equal criteria', note: l('The core facts.', 'মূল তথ্য।') },
        { skill: 'speaking', example: 'Idea → reason → example works in Speaking Part 3 too.', note: l('Shared skills.', 'একই দক্ষতা।') },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Timing and minimums; Task 2 counts for more; four equal criteria.', 'সময় আর ন্যূনতম; Task 2-এর গুরুত্ব বেশি; চারটা সমান criteria।'),
        l('Task 1: overview, accurate data, no opinion.', 'Task 1: overview, নির্ভুল data, মতামত নয়।'),
        l('Task 2: every part, clear position, developed paragraphs, natural language.', 'Task 2: প্রতিটা অংশ, পরিষ্কার অবস্থান, বিকশিত paragraph, স্বাভাবিক ভাষা।'),
      ],
    },
  ],
};

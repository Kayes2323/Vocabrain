import type { Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Understanding IELTS Listening, application lessons in the v2 format: ls-7
 * Listening traps (distractors, corrections, paraphrase, plurals), ls-8 a
 * whole-test strategy with no hints, and ls-9 the module review test.
 * Transcript-based, so every question works without audio. Original Mino content.
 */
const P = { tag: 'listening' as const };

// ======================================================================= ls-7
export const lsTraps: Lesson = {
  id: 'ls-7',
  format: 'v2',
  title: l('Listening traps and how to avoid them', 'Listening-এর ফাঁদ আর কীভাবে এড়াবেন'),
  why: l('Most lost Listening marks come from a few traps: the first answer that is later corrected, options that repeat the speaker’s words, missing plurals and extra words. Learn to spot them in any part.', 'Listening-এর বেশিরভাগ হারানো নম্বর আসে কয়েকটা ফাঁদ থেকে: পরে শোধরানো প্রথম উত্তর, speaker-এর word হুবহু থাকা option, plural বাদ আর বাড়তি word। যেকোনো part-এ এগুলো চিনতে শিখুন।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'listening',
  steps: [
    {
      kind: 'hook',
      title: l('Four answers, four traps', 'চারটা উত্তর, চারটা ফাঁদ'),
      situation: l('A student’s answers: "Tuesday" (the speaker later said Thursday) · "the new library" (limit: TWO WORDS) · "volunteer" (note: "many ___") · Option B (it repeated the speaker’s words, but she rejected it).', 'একজন শিক্ষার্থীর উত্তর: "Tuesday" (speaker পরে Thursday বলেছিলেন) · "the new library" (সীমা: TWO WORDS) · "volunteer" (note: "many ___") · Option B (speaker-এর word হুবহু ছিল, কিন্তু তিনি বাতিল করেছিলেন)।'),
      question: l('How many of these answers are correct?', 'এই উত্তরগুলোর কয়টা ঠিক?'),
      options: ['0', '2', '4'],
      answer: '0',
      diagnose: {
        '0': l('Right: a corrected answer, an extra word, a missing plural and a rejected option — four traps, zero marks.', 'ঠিক: শোধরানো উত্তর, বাড়তি word, plural বাদ আর বাতিল option — চারটা ফাঁদ, শূন্য নম্বর।'),
        '2': l('All four fall into a trap: correction, word limit, plural and a rejected option.', 'চারটাই ফাঁদে পড়েছে: শোধরানো, word-এর সীমা, plural আর বাতিল option।'),
        '4': l('None are correct. Each shows one common trap.', 'একটাও ঠিক না। প্রতিটা একটা সাধারণ ফাঁদ দেখায়।'),
      },
    },
    {
      kind: 'discover',
      title: l('The four traps', 'চারটা ফাঁদ'),
      items: [
        { en: 'Correction: "Tuesday — sorry, Thursday."', note: l('the final answer counts', 'শেষ উত্তর গোনা হয়') },
        { en: 'Word match: an option repeats the speaker’s words but is rejected', note: l('check agreement', 'একমত কি না দেখুন') },
        { en: 'Word limit: "the new library" under TWO WORDS', note: l('articles count', 'article গোনা হয়') },
        { en: 'Grammar: "many volunteer"', note: l('plural needed', 'plural লাগবে') },
      ],
      question: l('Which trap is about MEANING rather than form?', 'কোন ফাঁদ form না, অর্থ নিয়ে?'),
      options: [
        l('An option that repeats the speaker’s words but is rejected', 'যে option speaker-এর word হুবহু রাখে কিন্তু বাতিল হয়'),
        l('A missing plural', 'Plural বাদ'),
        l('An extra article', 'বাড়তি article'),
      ],
      answer: 0,
      pattern: l('Check every answer twice: meaning (final answer? accepted or rejected?) and form (word limit, plural, spelling).', 'প্রতিটা উত্তর দুবার যাচাই করুন: অর্থ (শেষ উত্তর? গৃহীত না বাতিল?) আর form (word-এর সীমা, plural, বানান)।'),
    },
    {
      kind: 'concept',
      title: l('Two checks for every answer', 'প্রতিটা উত্তরের জন্য দুটো যাচাই'),
      body: l(
        'Traps are designed to catch listeners who react to single words. Two quick checks catch almost all of them.',
        'ফাঁদগুলো এমনভাবে বানানো যে একটা word শুনে প্রতিক্রিয়া দেখানো শ্রোতা ধরা পড়ে। দুটো দ্রুত যাচাই প্রায় সবগুলো ধরে ফেলে।',
      ),
      points: [
        l('Meaning check: was this the final answer (after "sorry", "actually", "no")? Was the option accepted, or mentioned and rejected?', 'অর্থ যাচাই: এটা কি শেষ উত্তর ("sorry", "actually", "no"-এর পরে)? Option-টা গৃহীত, নাকি উল্লেখ হয়ে বাতিল?'),
        l('Form check: within the word limit (articles count)? The right grammar (plural, adjective)? Spelled correctly?', 'Form যাচাই: word-এর সীমার মধ্যে (article গোনা হয়)? ঠিক grammar (plural, adjective)? বানান ঠিক?'),
        l('Paraphrase: the question and the recording rarely use the same words. Matching words are often the trap; matching meaning is the answer.', 'Paraphrase: প্রশ্ন আর recording-এ খুব কমই একই word থাকে। মিল-word প্রায়ই ফাঁদ; মিল-অর্থই উত্তর।'),
        l('Numbers: -teen vs -ty, "double", and corrections are the most common number traps.', 'সংখ্যা: -teen বনাম -ty, "double", আর শোধরানো — সংখ্যার সবচেয়ে সাধারণ ফাঁদ।'),
        l('Common mix-up: believing traps only appear in Part 1. Corrections and rejected options appear in every part.', 'সাধারণ ভুল: ভাবা যে ফাঁদ শুধু Part 1-এ থাকে। শোধরানো আর বাতিল option সব part-এই আসে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Traps in each part', 'প্রতিটা part-এ ফাঁদ'),
      items: [
        { en: 'Part 1: "It’s £25 a night — oh, £20 on weekdays." (Weekday price: £20)', note: l('correction', 'শোধরানো') },
        { en: 'Part 2: "Some visitors expect a guided tour, but the visit is self-guided."', note: l('rejected idea', 'বাতিল idea') },
        { en: 'Part 3: "Maybe interviews?" "Too slow." "Then a survey." (Method: survey)', note: l('the final decision', 'শেষ সিদ্ধান্ত') },
        { en: 'Part 4: "Many species, such as frogs, declined." (Notes: many ___ declined → species)', note: l('the main point, not the example', 'মূল point, উদাহরণ না') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters', 'কেন এটা গুরুত্বপূর্ণ'),
      uses: [
        { skill: 'listening', example: 'Every part includes at least one kind of trap.', note: l('Two checks per answer.', 'প্রতি উত্তরে দুটো যাচাই।') },
        { skill: 'reading', example: 'Reading options also repeat passage words as distractors.', note: l('The same meaning check.', 'অর্থের একই যাচাই।') },
        { skill: 'writing', example: 'Plurals and spelling count in Writing too.', note: l('The same form check.', 'Form-এর একই যাচাই।') },
        { skill: 'speaking', example: 'Correcting yourself naturally: "…sorry, I mean…"', note: l('A real speaking skill.', 'একটা আসল speaking দক্ষতা।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Writing £25 when the speaker corrects to £20', right: '£20', why: l('Final answer.', 'শেষ উত্তর।') },
        { wrong: 'Writing "frogs" for "many ___ declined"', right: '"species" — frogs is only an example', why: l('Main point vs example.', 'মূল point বনাম উদাহরণ।') },
        { wrong: 'Choosing "guided tour" because you heard it', right: 'The visit is self-guided', why: l('Rejected idea.', 'বাতিল idea।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: spot the trap', 'Practice: ফাঁদ চিনুন'),
      exercises: [
        choice('ls-7-p1', 'ls-part1', { ...P, pattern: 'ls-distractor', prompt: l('You hear: "The tour is £12 — oh, I tell a lie, it went up to £15 this year." Price: ______', 'আপনি শুনলেন: "The tour is £12 — oh, I tell a lie, it went up to £15 this year।" Price: ______'), options: ['£15', '£12', '£27'], answer: '£15', explanation: l('"I tell a lie" = a correction.', '"I tell a lie" = শোধরানো।'), why: { '£12': l('£12 is corrected to £15.', '£12 শুধরে £15 হয়।'), '£27': l('Do not add the numbers.', 'সংখ্যা যোগ করবেন না।') } }),
        choice('ls-7-p2', 'ls-part2', { ...P, pattern: 'ls-distractor', prompt: l('You hear: "People often think parking is free here, but it costs £2 an hour." Parking is:', 'আপনি শুনলেন: "People often think parking is free here, but it costs £2 an hour।" Parking:'), options: ['£2 an hour', 'free', '£2 a day'], answer: '£2 an hour', explanation: l('"but" gives the real answer.', '"but" আসল উত্তর দেয়।'), why: { free: l('"free" is what people wrongly think.', '"free" মানুষের ভুল ধারণা।'), '£2 a day': l('It is per hour.', 'এটা প্রতি ঘণ্টায়।') } }),
        choice('ls-7-p3', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('A: "Should we include graphs?" B: "They’d take too long to make." A: "True — tables are quicker." What will they include?', 'A: "Should we include graphs?" B: "They’d take too long to make." A: "True — tables are quicker।" তাঁরা কী রাখবেন?'), options: ['Tables', 'Graphs', 'Graphs and tables'], answer: 'Tables', explanation: l('Graphs are rejected; tables are chosen.', 'Graph বাতিল; table বাছা হয়।'), why: { Graphs: l('Graphs are rejected ("take too long").', 'Graph বাতিল ("take too long")।'), 'Graphs and tables': l('Only tables are chosen.', 'শুধু table বাছা হয়।') } }),
        choice('ls-7-p4', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('You hear: "Many crops, for instance rice, were damaged." Notes: "Many ______ were damaged." What do you write?', 'আপনি শুনলেন: "Many crops, for instance rice, were damaged।" Note: "Many ______ were damaged।" কী লিখবেন?'), options: ['crops', 'rice', 'crop'], answer: 'crops', explanation: l('The main point; rice is an example.', 'মূল point; rice উদাহরণ।'), why: { rice: l('"for instance" introduces an example.', '"for instance" উদাহরণ শুরু করে।'), crop: l('many + plural: crops.', 'many + plural: crops।') } }),
        choice('ls-7-p5', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('"NO MORE THAN TWO WORDS." You hear: "…at the main train station." Which answer is correct?', '"NO MORE THAN TWO WORDS।" আপনি শুনলেন: "…at the main train station।" কোন উত্তর ঠিক?'), options: ['train station', 'the train station', 'main train station'], answer: 'train station', explanation: l('Two words.', 'দুটো word।'), why: { 'the train station': l('Three words — "the" counts.', 'তিনটা word — "the" গোনা হয়।'), 'main train station': l('Three words.', 'তিনটা word।') } }),
        choice('ls-7-p6', 'ls-part1', { ...P, pattern: 'ls-spelling-number', prompt: l('You hear "thirTEEN" with the stress at the end. Which number?', '"thirTEEN" শুনলেন, শেষে জোর। কোন সংখ্যা?'), options: ['13', '30', '33'], answer: '13', explanation: l('-teen: stress at the end.', '-teen: শেষে জোর।'), why: { '30': l('THIRty has the stress at the start.', 'THIRty-তে শুরুতে জোর।'), '33': l('That would be thirty-three.', 'ওটা হতো thirty-three।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ls-7-r1', 'ls-part1', { ...P, pattern: 'ls-distractor', prompt: l('Write the day.', 'দিনটা লিখুন।'), sentence: 'You hear: "Friday’s fully booked, so Saturday then?" "Yes, Saturday’s fine." Day: ___', accepted: ['Saturday'], explanation: l('Friday is full; Saturday is agreed.', 'Friday ভর্তি; Saturday ঠিক হয়।') }),
        gap('ls-7-r2', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('Write ONE WORD.', 'একটা word লিখুন।'), sentence: 'You hear: "Several rivers, the Padma for example, have changed course." Notes: Several ___ have changed course.', accepted: ['rivers'], explanation: l('The main point (plural); the Padma is an example.', 'মূল point (plural); Padma উদাহরণ।') }),
        spot('ls-7-r3', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('One answer breaks the note’s grammar. Tap it and fix it.', 'একটা উত্তর note-এর grammar ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Notes: Both factory closed in 2020.', wrong: 'factory', accepted: ['factories'], explanation: l('both + plural.', 'both + plural।') }),
        correct('ls-7-r4', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('Shorten to ONE WORD ONLY.', 'ONE WORD ONLY-তে ছোট করুন।'), sentence: 'the harbour', accepted: ['harbour', 'harbor'], explanation: l('Drop "the".', '"the" বাদ দিন।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        correct('ls-7-c1', 'ls-part1', { ...P, pattern: 'ls-distractor', prompt: l('Fix the note using the final answer.', 'শেষ উত্তর দিয়ে note-টা ঠিক করুন।'), sentence: 'Heard: "Room 14 — no, sorry, 40." Note: Room 14', accepted: ['Room 40'], explanation: l('The corrected number.', 'শোধরানো সংখ্যা।') }),
        spot('ls-7-c2', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('The students said "A lecture? Too formal. Let’s do a workshop." One word in the summary is wrong. Tap it, then fix it.', 'শিক্ষার্থীরা বললেন "A lecture? Too formal. Let’s do a workshop।" Summary-র একটা word ভুল। Tap করে ঠিক করুন।'), sentence: 'Summary: They chose a lecture.', wrong: 'lecture', accepted: ['workshop'], fixOptions: ['workshop', 'lectures', 'survey'], explanation: l('The lecture is rejected.', 'Lecture বাতিল।') }),
        order('ls-7-c3', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Matching words are often the trap.', explanation: l('Listen for meaning.', 'অর্থ শুনুন।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: write a trap', 'এবার আপনার পালা: একটা ফাঁদ লিখুন'),
      exercises: [
        write('ls-7-y1', 'ls-part1', {
          ...P,
          prompt: l('Write 2–3 lines of a Listening script that contain one trap (a correction or a rejected idea), then write the correct answer a listener should give.', 'Listening script-এর ২–৩ লাইন লিখুন যাতে একটা ফাঁদ থাকে (শোধরানো বা বাতিল idea), তারপর শ্রোতার সঠিক উত্তর লিখুন।'),
          model: 'Receptionist: The swimming pool opens at 6 a.m. — oh, sorry, that’s in summer. In winter it opens at 7. Question: Opening time in winter? Answer: 7 a.m.',
          checklist: [l('a clear trap (correction or rejected idea)', 'পরিষ্কার ফাঁদ (শোধরানো বা বাতিল idea)'), l('a question', 'একটা প্রশ্ন'), l('the correct final answer', 'সঠিক শেষ উত্তর')],
          explanation: l('Knowing how traps are built helps you avoid them.', 'ফাঁদ কীভাবে বানানো হয় জানলে এড়ানো সহজ।'),
          task: 'The student writes a short Listening script with one trap and the correct answer. Judge whether the trap works like a real IELTS distractor (a first answer that is corrected with "sorry", "actually", "no" or "but", or an idea that is mentioned and rejected) and whether the stated answer is the final, correct one; then correct grammar only where it blocks the meaning. If the stated answer falls into the trap, explain why.',
          target: l('How traps work', 'ফাঁদ কীভাবে কাজ করে'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Meaning check: the final answer; accepted, not rejected.', 'অর্থ যাচাই: শেষ উত্তর; গৃহীত, বাতিল না।'),
        l('Form check: word limit, plural, spelling.', 'Form যাচাই: word-এর সীমা, plural, বানান।'),
        l('Examples ("for instance") are not the main point.', 'উদাহরণ ("for instance") মূল point না।'),
      ],
    },
  ],
};

// ======================================================================= ls-8
export const lsStrategy: Lesson = {
  id: 'ls-8',
  format: 'v2',
  title: l('A strategy for the whole Listening test', 'পুরো Listening test-এর কৌশল'),
  why: l('Put everything together into one routine you can use in every practice test: read and predict, follow, check, move on.', 'সবকিছু একটা নিয়মে জুড়ুন যা প্রতিটা practice test-এ ব্যবহার করবেন: পড়া আর আন্দাজ, অনুসরণ, যাচাই, এগিয়ে যাওয়া।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'listening',
  steps: [
    {
      kind: 'hook',
      title: l('Two practice tests', 'দুটো practice test'),
      situation: l('Test 1: Rafi listens without reading ahead and scores 22/40. Test 2: he reads and predicts before each part, follows the order, and moves on after misses — 29/40.', 'Test 1: Rafi আগে না পড়ে শোনেন, পান 22/40। Test 2: প্রতিটা part-এর আগে পড়ে আন্দাজ করেন, ক্রম অনুসরণ করেন, মিস হলে এগিয়ে যান — 29/40।'),
      question: l('What made the biggest difference?', 'সবচেয়ে বড় পার্থক্য কীসে?'),
      options: ['A routine: predict, follow, check, move on', 'Luck', 'A louder recording'],
      answer: 'A routine: predict, follow, check, move on',
      diagnose: {
        'A routine: predict, follow, check, move on': l('Right. The same English, a better routine. (Scores in Mino practice are estimates, not official bands.)', 'ঠিক। একই English, ভালো নিয়ম। (Mino practice-এর score অনুমান, official band না।)'),
        Luck: l('A clear routine makes results more consistent than luck.', 'পরিষ্কার নিয়ম ভাগ্যের চেয়ে ফল বেশি স্থির করে।'),
        'A louder recording': l('Volume is the same; the difference is how he prepared and followed.', 'শব্দ একই; পার্থক্য প্রস্তুতি আর অনুসরণে।'),
      },
    },
    {
      kind: 'discover',
      title: l('The routine', 'নিয়মটা'),
      items: [
        { en: '1 Before: read the instruction, underline key words, predict the answer type', note: l('word limit · noun / number / plural', 'word-এর সীমা · noun / সংখ্যা / plural') },
        { en: '2 During: follow the order; use signposts; wait for final answers', note: l('corrections and decisions', 'শোধরানো আর সিদ্ধান্ত') },
        { en: '3 After each part: check the form (limit, plural, spelling)', note: l('a quick check', 'দ্রুত যাচাই') },
        { en: '4 Always: if you miss one, move on — and guess at the end', note: l('never leave a blank', 'কখনো ফাঁকা রাখবেন না') },
      ],
      question: l('Why guess at the end instead of leaving a blank?', 'ফাঁকা না রেখে শেষে আন্দাজ কেন?'),
      options: [
        l('A blank always scores zero; a sensible guess might be right', 'ফাঁকা সবসময় শূন্য; যুক্তিসঙ্গত আন্দাজ ঠিক হতে পারে'),
        l('Guesses get half marks', 'আন্দাজে আধা নম্বর'),
        l('The examiner prefers long answers', 'Examiner লম্বা উত্তর পছন্দ করেন'),
      ],
      answer: 0,
      pattern: l('Predict → follow → check → move on. Leave no blanks; there are no half marks.', 'আন্দাজ → অনুসরণ → যাচাই → এগিয়ে যাওয়া। কোনো ফাঁকা রাখবেন না; আধা নম্বর নেই।'),
    },
    {
      kind: 'concept',
      title: l('One routine, four parts', 'একটা নিয়ম, চারটা part'),
      body: l(
        'The routine is the same in every part; what changes is what you listen for.',
        'প্রতিটা part-এ নিয়ম একই; বদলায় শুধু কী শুনতে হবে।',
      ),
      points: [
        l('Part 1: spelled names, numbers, dates; corrections.', 'Part 1: বানান করা নাম, সংখ্যা, তারিখ; শোধরানো।'),
        l('Part 2: the starting point and route; the option the speaker confirms.', 'Part 2: শুরুর জায়গা আর পথ; speaker যে option নিশ্চিত করেন।'),
        l('Part 3: agreement, disagreement and the final decision; paraphrased options.', 'Part 3: একমত, দ্বিমত আর শেষ সিদ্ধান্ত; paraphrase করা option।'),
        l('Part 4: signposts to follow the notes; word types from grammar; no break.', 'Part 4: note অনুসরণে দিকনির্দেশক; grammar থেকে word-এর ধরন; বিরতি নেই।'),
        l('Common mix-up: practising only Part 1 because it feels easiest. Parts 3 and 4 decide higher bands — practise them every week.', 'সাধারণ ভুল: সহজ লাগে বলে শুধু Part 1 practice। বেশি band ঠিক করে Part 3 আর 4 — প্রতি সপ্তাহে এগুলো practice করুন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('The routine in action', 'কাজে নিয়মটা'),
      items: [
        { en: 'Q21–25 "Choose the correct letter": underline who is asked about (the tutor? the students?)', note: l('Part 3 preparation', 'Part 3 প্রস্তুতি') },
        { en: 'Q31–40 notes: circle each heading and predict each gap', note: l('Part 4 preparation', 'Part 4 প্রস্তুতি') },
        { en: 'Missed Q14 → go to Q15, guess Q14 at the end', note: l('move on', 'এগিয়ে যান') },
        { en: 'End of test: check limits, plurals and spelling', note: l('form check', 'form যাচাই') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Test day', 'Test-এর দিন'),
      uses: [
        { skill: 'listening', example: 'Paper: use the 10 minutes at the end to transfer and check; computer: use the 2 minutes to check.', note: l('Format-specific checking time.', 'Format অনুযায়ী যাচাইয়ের সময়।') },
        { skill: 'reading', example: 'The same predict-and-check routine works for completion tasks in Reading.', note: l('One routine for both.', 'দুটোর জন্য একটা নিয়ম।') },
        { skill: 'writing', example: 'Checking spelling at the end of Writing, too.', note: l('A habit that transfers.', 'একটা অভ্যাস যা কাজে লাগে।') },
        { skill: 'speaking', example: 'Part 3 agreement phrases you hear can be used when you speak.', note: l('Listening feeds Speaking.', 'Listening Speaking-কে সাহায্য করে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Leaving blanks', right: 'Guess sensibly at the end', why: l('A blank is always zero.', 'ফাঁকা সবসময় শূন্য।') },
        { wrong: 'Using the preview time to check the previous part', right: 'Use it to read the next part', why: l('Prepare what is coming.', 'যা আসছে তার প্রস্তুতি।') },
        { wrong: 'Practising Part 1 only', right: 'Practise all four parts, especially 3 and 4', why: l('Higher bands depend on them.', 'বেশি band এগুলোর ওপর নির্ভর করে।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: no hints', 'Practice: কোনো hint নেই'),
      exercises: [
        choice('ls-8-p1', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('The recording for Part 3 is about to start. What should you already have done?', 'Part 3-এর recording শুরু হতে যাচ্ছে। আপনার আগেই কী করা উচিত ছিল?'), options: ['Read the questions and underlined who is being asked about', 'Checked your Part 1 spelling', 'Nothing — just listen'], answer: 'Read the questions and underlined who is being asked about', explanation: l('Prepare before each part.', 'প্রতিটা part-এর আগে প্রস্তুতি।'), why: { 'Checked your Part 1 spelling': l('Check at the end; use this time for Part 3.', 'শেষে যাচাই করুন; এই সময় Part 3-এর জন্য।'), 'Nothing — just listen': l('Without preparation, paraphrased options are hard to follow.', 'প্রস্তুতি ছাড়া paraphrase করা option বোঝা কঠিন।') } }),
        choice('ls-8-p2', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('You have no idea about Q27. What should you do at the end?', 'Q27 নিয়ে কোনো ধারণা নেই। শেষে কী করবেন?'), options: ['Make a sensible guess', 'Leave it blank', 'Write two options'], answer: 'Make a sensible guess', explanation: l('A blank is always zero.', 'ফাঁকা সবসময় শূন্য।'), why: { 'Leave it blank': l('A guess might be right; a blank never is.', 'আন্দাজ ঠিক হতে পারে; ফাঁকা কখনো না।'), 'Write two options': l('Two answers are marked wrong.', 'দুটো উত্তর ভুল ধরা হয়।') } }),
        choice('ls-8-p3', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('In Part 4 you lose your place. What helps you find it again?', 'Part 4-এ জায়গা হারিয়ে ফেলেছেন। কীসে আবার খুঁজে পাবেন?'), options: ['Signposts such as "turning to" or "finally"', 'The first word of the lecture', 'The speaker’s accent'], answer: 'Signposts such as "turning to" or "finally"', explanation: l('Signposts mark the headings.', 'দিকনির্দেশক heading চিহ্নিত করে।'), why: { 'The first word of the lecture': l('That has passed; follow the signposts.', 'ওটা পার হয়ে গেছে; দিকনির্দেশক অনুসরণ করুন।'), 'The speaker’s accent': l('Accent does not show where you are in the notes.', 'Accent note-এর কোথায় আছেন তা দেখায় না।') } }),
        choice('ls-8-p4', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Part 3: "What does the TUTOR suggest?" Two students give ideas, then the tutor says "I’d focus on the costs." Answer?', 'Part 3: "What does the TUTOR suggest?" দুই শিক্ষার্থী idea দেন, তারপর tutor বলেন "I’d focus on the costs।" উত্তর?'), options: ['Focusing on the costs', 'The first student’s idea', 'The second student’s idea'], answer: 'Focusing on the costs', explanation: l('The question asks about the tutor.', 'প্রশ্ন tutor নিয়ে।'), why: { 'The first student’s idea': l('The question is about the tutor, not the students.', 'প্রশ্ন tutor নিয়ে, শিক্ষার্থী নিয়ে না।'), 'The second student’s idea': l('Underline WHO the question is about.', 'প্রশ্ন কাকে নিয়ে দাগ দিন।') } }),
        choice('ls-8-p5', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Paper-based test: how long do you have at the end to transfer answers?', 'Paper-based test: শেষে উত্তর তোলার জন্য কত সময়?'), options: ['10 minutes', '2 minutes', 'No time'], answer: '10 minutes', explanation: l('Paper: 10 minutes; computer: 2 minutes to check.', 'Paper: ১০ মিনিট; computer: যাচাইয়ের ২ মিনিট।'), why: { '2 minutes': l('That is the computer-delivered check time.', 'ওটা computer-delivered-এর যাচাইয়ের সময়।'), 'No time': l('That is Reading, not Listening.', 'ওটা Reading, Listening না।') } }),
        choice('ls-8-p6', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('Part 2 map: the audio starts. What do you follow?', 'Part 2 map: audio শুরু। কী অনুসরণ করবেন?'), options: ['The route from the starting point, step by step', 'The largest label on the map', 'The last label'], answer: 'The route from the starting point, step by step', explanation: l('Answers follow the route.', 'উত্তর পথের ক্রমে।'), why: { 'The largest label on the map': l('Size does not matter.', 'আকার গুরুত্বপূর্ণ না।'), 'The last label': l('Answers come in order from the start.', 'উত্তর শুরু থেকে ক্রমে আসে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ls-8-r1', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'If you miss an answer, ___ on to the next question.', accepted: ['move', 'go'], explanation: l('move on.', 'move on।') }),
        gap('ls-8-r2', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Write the number of minutes.', 'মিনিটের সংখ্যা লিখুন।'), sentence: 'In computer-delivered Listening you get ___ minutes to check at the end.', accepted: ['2', 'two'], explanation: l('2 minutes.', '২ মিনিট।') }),
        correct('ls-8-r3', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'Leave difficult answers blank at the end.', accepted: ['Guess difficult answers at the end.', 'Make a sensible guess for difficult answers at the end.', 'Do not leave difficult answers blank at the end.', 'Never leave difficult answers blank at the end.'], explanation: l('Guess — a blank is always zero.', 'আন্দাজ করুন — ফাঁকা সবসময় শূন্য।') }),
        correct('ls-8-r4', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Correct the strategy.', 'কৌশলটা ঠিক করুন।'), sentence: 'Practise only Part 1 because it is the easiest.', accepted: ['Practise all four parts, especially Parts 3 and 4.', 'Practise all four parts.', 'Practise all parts, not only Part 1.'], explanation: l('All four parts.', 'চারটা part-ই।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        correct('ls-8-c1', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('Fix the answer: ONE WORD ONLY, and the note says "many ___".', 'উত্তরটা ঠিক করুন: ONE WORD ONLY, আর note-এ "many ___"।'), sentence: 'the visitor', accepted: ['visitors'], explanation: l('One word, plural.', 'একটা word, plural।') }),
        spot('ls-8-c2', 'ls-part1', { ...P, pattern: 'ls-distractor', prompt: l('The speaker said "Gate 5 — no, they’ve moved it to Gate 9". One answer is the distractor. Tap it, then fix it.', 'Speaker বললেন "Gate 5 — no, they’ve moved it to Gate 9"। একটা উত্তর distractor। Tap করে ঠিক করুন।'), sentence: 'Departure gate: 5', wrong: '5', accepted: ['9', 'nine'], fixOptions: ['9', '14', '59'], explanation: l('The final gate: 9.', 'শেষ gate: 9।') }),
        order('ls-8-c3', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Build the routine.', 'নিয়মটা সাজান।'), answer: 'Predict, follow, check and move on.', explanation: l('The Listening routine.', 'Listening-এর নিয়ম।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your test-day routine', 'এবার আপনার পালা: test-এর দিনের নিয়ম'),
      exercises: [
        write('ls-8-y1', 'ls-format', {
          ...P,
          prompt: l('Write 3–4 sentences describing exactly what you will do before, during and after each Listening part on test day.', 'Test-এর দিন প্রতিটা Listening part-এর আগে, চলার সময় আর পরে ঠিক কী করবেন — ৩–৪ sentence-এ লিখুন।'),
          model: 'Before each part, I will read the instructions and predict the type of answer for each gap. During the recording, I will follow the order and wait for final answers after corrections. If I miss an answer, I will move on and guess it at the end. After the test, I will check word limits, plurals and spelling.',
          checklist: [l('before: read and predict', 'আগে: পড়া আর আন্দাজ'), l('during: follow the order, final answers, move on', 'চলার সময়: ক্রম, শেষ উত্তর, এগিয়ে যাওয়া'), l('after: check form; no blanks', 'পরে: form যাচাই; ফাঁকা না')],
          explanation: l('One routine for every part.', 'প্রতিটা part-এর জন্য একটা নিয়ম।'),
          task: 'The student describes their test-day routine for IELTS Listening. Judge the strategy and facts first: read and predict before each part; follow the order of the recording; wait for final answers after corrections and decisions; move on after a missed answer and guess at the end (a blank always scores zero); check word limits, plurals and spelling; paper-based Listening gives 10 minutes to transfer answers and computer-delivered gives 2 minutes to check; each recording is heard once. Then correct grammar only where it blocks the meaning.',
          target: l('A Listening routine', 'Listening-এর নিয়ম'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Predict → follow → check → move on.', 'আন্দাজ → অনুসরণ → যাচাই → এগিয়ে যাওয়া।'),
        l('No blanks: guess sensibly at the end.', 'ফাঁকা না: শেষে যুক্তিসঙ্গত আন্দাজ।'),
        l('Practise all four parts; Parts 3 and 4 decide higher bands.', 'চারটা part-ই practice করুন; বেশি band ঠিক করে Part 3 আর 4।'),
      ],
    },
  ],
};

// ======================================================================= ls-9
export const lsReview: Lesson = {
  id: 'ls-9',
  kind: 'test',
  title: l('Listening review test', 'Listening review test'),
  why: l('Check what you have learned. Your mistakes here decide what Mino suggests you review.', 'কী শিখলেন যাচাই করুন। এখানের ভুল দেখেই Mino ঠিক করবে কী review করা দরকার।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'listening',
  steps: [
    {
      kind: 'concept',
      title: l('How this test works', 'এই test কীভাবে চলবে'),
      body: l(
        '12 questions from every lesson in this module. You see the answer after each question. Score 80% or more to complete the module; if you score less, Mino will suggest short reviews for the marks you missed.',
        'এই module-এর সব lesson থেকে ১২টা প্রশ্ন। প্রতিটা প্রশ্নের পরে answer দেখবেন। ৮০% বা বেশি পেলে module শেষ; কম পেলে যে নম্বরগুলো কেটেছে সেগুলোর জন্য Mino ছোট review সাজেস্ট করবে।',
      ),
    },
    {
      kind: 'practice',
      title: l('Part 1: choose', 'Part 1: বেছে নিন'),
      exercises: [
        choice('ls-9-e1', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('How many times is each recording played?', 'প্রতিটা recording কতবার বাজে?'), options: ['Once', 'Twice', 'Three times'], answer: 'Once', explanation: l('Once.', 'একবার।') }),
        choice('ls-9-e2', 'ls-part1', { ...P, pattern: 'ls-distractor', prompt: l('"Wednesday — sorry, I mean Friday." Day?', '"Wednesday — sorry, I mean Friday।" দিন?'), options: ['Friday', 'Wednesday', 'Either'], answer: 'Friday', explanation: l('The corrected answer.', 'শোধরানো উত্তর।') }),
        choice('ls-9-e3', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('"The shop is between the bank and the café." Where is it?', '"The shop is between the bank and the café।" কোথায়?'), options: ['In the middle of the two', 'Behind the bank', 'Opposite the café'], answer: 'In the middle of the two', explanation: l('between X and Y.', 'between X and Y।') }),
        choice('ls-9-e4', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Which phrase shows DISAGREEMENT?', 'কোন phrase দ্বিমত বোঝায়?'), options: ['I’m not so sure about that.', 'Exactly.', 'Good point.'], answer: 'I’m not so sure about that.', explanation: l('Doubt / disagreement.', 'সন্দেহ / দ্বিমত।') }),
        choice('ls-9-e5', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('Which signpost introduces an EXAMPLE?', 'কোন দিকনির্দেশক উদাহরণ শুরু করে?'), options: ['For instance', 'Turning to', 'Finally'], answer: 'For instance', explanation: l('An example, not a new point.', 'উদাহরণ, নতুন point না।') }),
        choice('ls-9-e6', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('"ONE WORD ONLY." Which answer is allowed?', '"ONE WORD ONLY।" কোন উত্তর চলে?'), options: ['station', 'the station', 'bus station'], answer: 'station', explanation: l('One word.', 'একটা word।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Part 2: write and fix', 'Part 2: লিখুন আর ঠিক করুন'),
      exercises: [
        gap('ls-9-e7', 'ls-format', { ...P, pattern: 'ls-format-fact', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'IELTS Listening has ___ parts.', accepted: ['4', 'four'], explanation: l('4.', '৪।') }),
        gap('ls-9-e8', 'ls-part1', { ...P, pattern: 'ls-spelling-number', prompt: l('Write the number (digits).', 'সংখ্যাটা লিখুন (অঙ্কে)।'), sentence: 'You hear: "double 4, 7". You write: ___', accepted: ['447'], explanation: l('double 4 = 44.', 'double 4 = 44।') }),
        spot('ls-9-e9', 'ls-part2', { ...P, pattern: 'ls-map-language', prompt: l('One word does not match "right beside". Tap it and fix it.', 'একটা word "right beside"-এর সাথে মেলে না। Tap করে ঠিক করুন।'), sentence: 'The lift is right beside the stairs, so it is opposite them.', wrong: 'opposite', accepted: ['next to', 'beside'], fixOptions: ['next to', 'behind', 'opposites'], explanation: l('right beside = next to.', 'right beside = next to।') }),
        correct('ls-9-e10', 'ls-part3', { ...P, pattern: 'ls-opinion', prompt: l('Fix the summary using the final decision.', 'শেষ সিদ্ধান্ত দিয়ে summary-টা ঠিক করুন।'), sentence: 'Heard: "A poster? No — a short video is better." Summary: They will make a poster.', accepted: ['They will make a short video.', 'They will make a video.'], explanation: l('The poster is rejected.', 'Poster বাতিল।') }),
        gap('ls-9-e11', 'ls-part4', { ...P, pattern: 'ls-signpost', prompt: l('Write ONE WORD.', 'একটা word লিখুন।'), sentence: 'You hear: "Many families, such as fishing families, moved inland." Notes: Many ___ moved inland.', accepted: ['families'], explanation: l('The main point, plural.', 'মূল point, plural।') }),
        spot('ls-9-e12', 'ls-rules', { ...P, pattern: 'ls-answer-rules', prompt: l('One word is misspelled. Tap it and fix it.', 'একটা word-এর বানান ভুল। Tap করে ঠিক করুন।'), sentence: 'Answer: shared accomodation', wrong: 'accomodation', accepted: ['accommodation'], fixOptions: ['accommodation', 'acommodation', 'accomodations'], explanation: l('accommodation: cc, mm.', 'accommodation: cc, mm।') }),
      ],
    },
    {
      kind: 'ielts',
      title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
      uses: [
        { skill: 'listening', example: '4 parts · 40 questions · heard once', note: l('The core facts.', 'মূল তথ্য।') },
        { skill: 'reading', example: 'Word limits and paraphrase apply in Reading too.', note: l('Shared skills.', 'একই দক্ষতা।') },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Heard once, in order: predict, follow, check, move on.', 'একবার শোনা, ক্রমে: আন্দাজ, অনুসরণ, যাচাই, এগিয়ে যাওয়া।'),
        l('Final answers after corrections and decisions; examples are not the main point.', 'শোধরানো আর সিদ্ধান্তের পরের শেষ উত্তর; উদাহরণ মূল point না।'),
        l('Word limits, plurals and spelling decide the mark.', 'Word-এর সীমা, plural আর বানান নম্বর ঠিক করে।'),
      ],
    },
  ],
};

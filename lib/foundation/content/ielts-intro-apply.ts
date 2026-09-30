import type { Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * What is IELTS?, application lessons in the v2 format: ib-7 IELTS myths and
 * facts (mixed), ib-8 putting it together into a personal IELTS plan, and ib-9
 * the module review test. Facts match lib/ai/server/mino/knowledge/ielts.ts;
 * fees, dates and result times always go to the official source.
 * Original Mino content.
 */
const P = { tag: 'ielts-basics' as const };

// ======================================================================= ib-7
export const ibMyths: Lesson = {
  id: 'ib-7',
  format: 'v2',
  title: l('IELTS myths and facts', 'IELTS: ভুল ধারণা আর সত্য'),
  why: l('Many IELTS decisions are based on things "everyone says". Checking each claim against the facts saves money, time and a wasted test.', 'IELTS-এর অনেক সিদ্ধান্ত নেওয়া হয় "সবাই বলে" এমন কথার ওপর। প্রতিটা দাবি তথ্যের সাথে মিলিয়ে দেখলে টাকা, সময় আর একটা test বাঁচে।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('Advice in a group chat', 'Group chat-এর পরামর্শ'),
      situation: l('"Computer IELTS is easier. Write 400 words for Task 2 for a higher band. And your overall is just your lowest skill."', '"Computer IELTS সহজ। বেশি band-এর জন্য Task 2-এ ৪০০ word লিখুন। আর overall মানে আপনার সবচেয়ে কম skill।"'),
      question: l('How many of these claims are true?', 'এই দাবিগুলোর কয়টা সত্য?'),
      options: ['None', 'One', 'All three'],
      answer: 'None',
      diagnose: {
        None: l('Right. Same content and scoring on computer and paper; length is not a criterion; the overall is the average of four, rounded.', 'ঠিক। Computer আর paper-এ একই content আর scoring; দৈর্ঘ্য criteria না; overall হলো চারটার গড়, round করা।'),
        One: l('None are true: computer is not easier, length is not scored, and the overall is an average.', 'একটাও সত্য না: computer সহজ না, দৈর্ঘ্যের নম্বর নেই, আর overall একটা গড়।'),
        'All three': l('All three are myths. Check claims against the facts in this module.', 'তিনটাই ভুল ধারণা। দাবিগুলো এই module-এর তথ্যের সাথে মিলিয়ে দেখুন।'),
      },
    },
    {
      kind: 'discover',
      title: l('Myth → fact', 'ভুল ধারণা → সত্য'),
      items: [
        { en: '"Any IELTS test is fine for university." → Universities usually ask for IELTS Academic.', note: l('lesson 3', 'lesson ৩') },
        { en: '"Task 1 and Task 2 count equally." → Task 2 counts for more.', note: l('lessons 2 and 5', 'lesson ২ আর ৫') },
        { en: '"Computer IELTS is easier." → Same content and scoring.', note: l('lesson 3', 'lesson ৩') },
        { en: '"Overall = lowest band." → Average of four, rounded to the nearest half band.', note: l('lesson 4', 'lesson ৪') },
        { en: '"Rare words get Band 8." → Precise, correct words raise Lexical Resource.', note: l('lesson 5', 'lesson ৫') },
        { en: '"My friend’s requirement is mine." → Check your own official requirement.', note: l('lesson 6', 'lesson ৬') },
      ],
      question: l('What is the safest way to test a claim?', 'একটা দাবি যাচাইয়ের সবচেয়ে নিরাপদ উপায় কী?'),
      options: [
        l('Compare it with the official facts and the official requirement page', 'Official তথ্য আর official requirement page-এর সাথে মেলানো'),
        l('Count how many people repeat it', 'কতজন বলছে তা গোনা'),
        l('Try it in the real test', 'আসল test-এ চেষ্টা করা'),
      ],
      answer: 0,
      pattern: l('Test every claim against the official facts: version, format, delivery, bands, marking and your own requirement.', 'প্রতিটা দাবি official তথ্যের সাথে মেলান: version, format, delivery, band, marking আর আপনার নিজের requirement।'),
    },
    {
      kind: 'concept',
      title: l('Six facts that beat the myths', 'ছয়টা তথ্য যা ভুল ধারণা দূর করে'),
      body: l(
        'Keep these six facts in mind whenever you hear IELTS advice.',
        'IELTS নিয়ে কোনো পরামর্শ শুনলে এই ছয়টা তথ্য মনে রাখুন।',
      ),
      points: [
        l('1. Versions: Listening and Speaking are shared; Reading and Writing differ. The organisation decides which you need.', '১. Version: Listening আর Speaking একই; Reading আর Writing আলাদা। কোনটা লাগবে প্রতিষ্ঠান ঠিক করে।'),
        l('2. Format: Listening ~30 min / 40 q · Reading 60 min / 40 q · Writing 60 min (150 + 250 words) · Speaking 11–14 min.', '২. Format: Listening ~৩০ মিনিট / ৪০ প্রশ্ন · Reading ৬০ মিনিট / ৪০ প্রশ্ন · Writing ৬০ মিনিট (১৫০ + ২৫০ word) · Speaking ১১–১৪ মিনিট।'),
        l('3. Delivery: computer and paper have the same content and scoring; Speaking is face to face in both.', '৩. Delivery: computer আর paper-এ একই content আর scoring; দুটোতেই Speaking মুখোমুখি।'),
        l('4. Bands: 0–9 in half bands; overall = average of four, rounded to the nearest half band.', '৪. Band: 0–9, half band-সহ; overall = চারটার গড়, কাছের half band-এ।'),
        l('5. Marking: Writing and Speaking use four equal criteria; Task 2 counts for more; length and rare words are not criteria.', '৫. Marking: Writing আর Speaking-এ চারটা সমান criteria; Task 2-এর গুরুত্ব বেশি; দৈর্ঘ্য আর কঠিন word criteria না।'),
        l('6. Requirements: overall + each skill minimum, from the official page; fees and dates from the official IELTS or test centre website.', '৬. Requirement: overall + প্রতি skill-এর সর্বনিম্ন, official page থেকে; fee আর তারিখ official IELTS বা test centre-এর website থেকে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Claims, checked', 'যাচাই করা দাবি'),
      items: [
        { en: '"Speaking on computer is with a robot." → False: face to face with an examiner.', note: l('fact 3', 'তথ্য ৩') },
        { en: '"6.25 is reported as 6.0." → False: it rounds up to 6.5.', note: l('fact 4', 'তথ্য ৪') },
        { en: '"Spelling doesn’t matter in Listening." → False: misspelled answers are wrong.', note: l('fact 5', 'তথ্য ৫') },
        { en: '"Reading has 10 minutes of transfer time." → False: no extra transfer time.', note: l('fact 2', 'তথ্য ২') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where myths cost marks', 'ভুল ধারণায় কোথায় নম্বর কাটে'),
      uses: [
        { skill: 'writing', example: 'Spending 30 minutes on Task 1 "because it comes first"', note: l('Task 2 needs about 40 minutes.', 'Task 2-এ প্রায় ৪০ মিনিট লাগে।') },
        { skill: 'reading', example: 'Waiting for transfer time that does not exist', note: l('Write answers within 60 minutes.', '৬০ মিনিটের মধ্যেই উত্তর লিখুন।') },
        { skill: 'listening', example: 'Ignoring spelling "because the meaning is right"', note: l('Spelling counts.', 'বানান গোনা হয়।') },
        { skill: 'speaking', example: 'Memorising rare words "for Band 8"', note: l('Natural and accurate is better.', 'স্বাভাবিক আর নির্ভুল ভালো।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Booking any IELTS test for a master’s degree because a friend did', right: 'Check the university: usually IELTS Academic', why: l('fact 1', 'তথ্য ১') },
        { wrong: 'Writing 180 words for Task 2', right: 'At least 250 words', why: l('fact 2', 'তথ্য ২') },
        { wrong: '"Overall 7.0, so I meet 7.0 with no band below 6.5."', right: 'Check each skill too', why: l('fact 6', 'তথ্য ৬') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: myth or fact?', 'Practice: ভুল ধারণা না সত্য?'),
      exercises: [
        choice('ib-7-p1', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('"IELTS Academic Writing Task 1 asks you to describe a graph, table or diagram." Myth or fact?', '"IELTS Academic Writing Task 1-এ graph, table বা diagram বর্ণনা করতে হয়।" ভুল ধারণা না সত্য?'), options: ['Fact', 'Myth'], answer: 'Fact', explanation: l('Academic Task 1 is a data report.', 'Academic Task 1 হলো data-র report।'), why: { Myth: l('It is a fact: Academic Task 1 describes visual information.', 'এটা সত্য: Academic Task 1-এ visual তথ্য বর্ণনা করতে হয়।') } }),
        choice('ib-7-p2', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('"Reading has 40 questions in 60 minutes." Myth or fact?', '"Reading-এ ৬০ মিনিটে ৪০টা প্রশ্ন।" ভুল ধারণা না সত্য?'), options: ['Fact', 'Myth'], answer: 'Fact', explanation: l('40 questions, 60 minutes.', '৪০ প্রশ্ন, ৬০ মিনিট।'), why: { Myth: l('This is exactly the Reading format.', 'এটাই Reading-এর format।') } }),
        choice('ib-7-p3', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('"The computer test is marked more generously." Myth or fact?', '"Computer test-এ বেশি উদারভাবে নম্বর দেওয়া হয়।" ভুল ধারণা না সত্য?'), options: ['Myth', 'Fact'], answer: 'Myth', explanation: l('Same scoring.', 'একই scoring।'), why: { Fact: l('Both formats use the same scoring.', 'দুই format-এ একই scoring।') } }),
        choice('ib-7-p4', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('"An average of 6.25 is reported as 6.5." Myth or fact?', '"6.25 গড় 6.5 হিসেবে দেওয়া হয়।" ভুল ধারণা না সত্য?'), options: ['Fact', 'Myth'], answer: 'Fact', explanation: l('.25 rounds up to .5.', '.25 বেড়ে .5।'), why: { Myth: l('An average ending in .25 rounds up to the half band.', '.25-এ শেষ হওয়া গড় বেড়ে half band হয়।') } }),
        choice('ib-7-p5', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('"A 400-word Task 2 always scores higher than a 280-word one." Myth or fact?', '"৪০০ word-এর Task 2 সবসময় ২৮০ word-এর চেয়ে বেশি নম্বর পায়।" ভুল ধারণা না সত্য?'), options: ['Myth', 'Fact'], answer: 'Myth', explanation: l('Length is not a criterion.', 'দৈর্ঘ্য criteria না।'), why: { Fact: l('Marks come from four criteria, not length; long essays often have more errors.', 'নম্বর আসে চারটা criteria থেকে, দৈর্ঘ্য থেকে না; লম্বা essay-তে প্রায়ই ভুল বেশি।') } }),
        choice('ib-7-p6', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('"If my overall is high enough, skill minimums don’t matter." Myth or fact?', '"Overall যথেষ্ট বেশি হলে skill-এর সর্বনিম্ন লাগে না।" ভুল ধারণা না সত্য?'), options: ['Myth', 'Fact'], answer: 'Myth', explanation: l('Both conditions must be met.', 'দুটো শর্তই পূরণ করতে হবে।'), why: { Fact: l('A skill below the minimum fails the requirement.', 'সর্বনিম্নের নিচের একটা skill requirement ভাঙে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ib-7-r1', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('Write the minimum number of words.', 'সর্বনিম্ন word-এর সংখ্যা লিখুন।'), sentence: 'Writing Task 2 needs at least ___ words.', accepted: ['250'], explanation: l('250.', '২৫০।') }),
        spot('ib-7-r2', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('One word makes this false. Tap it and fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'In computer IELTS, Speaking is recorded by a machine.', wrong: 'machine', accepted: ['examiner'], explanation: l('Face to face with an examiner.', 'Examiner-এর সাথে মুখোমুখি।') }),
        gap('ib-7-r3', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Write the overall band.', 'Overall band লিখুন।'), sentence: 'L 6.0 · R 6.0 · W 5.5 · S 6.0 → overall ___', accepted: ['6', '6.0'], explanation: l('23.5 ÷ 4 = 5.875 → 6.0.', '23.5 ÷ 4 = 5.875 → 6.0।') }),
        correct('ib-7-r4', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('Correct the false statement.', 'ভুল বাক্যটা ঠিক করুন।'), sentence: 'Spelling does not count in Listening answers.', accepted: ['Spelling does count in Listening answers.', 'Spelling counts in Listening answers.', 'Spelling does not count in Speaking answers.'], explanation: l('Spelling counts.', 'বানান গোনা হয়।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ib-7-c1', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('Which claim is TRUE?', 'কোন দাবিটা সত্য?'), options: ['The organisation you apply to decides which version you need.', 'Every university needs the same band.', 'Academic has no Speaking test.'], answer: 'The organisation you apply to decides which version you need.', explanation: l('Check the official requirement.', 'Official requirement দেখুন।') }),
        spot('ib-7-c2', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('One number is wrong. Tap it, then fix it.', 'একটা সংখ্যা ভুল। Tap করে ঠিক করুন।'), sentence: 'IELTS Reading has 3 sections and 50 questions.', wrong: '50', accepted: ['40', 'forty'], fixOptions: ['40', '30', '60'], explanation: l('40 questions.', '৪০টা প্রশ্ন।') }),
        order('ib-7-c3', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Neither format is easier than the other.', explanation: l('Same content and scoring.', 'একই content আর scoring।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: answer a friend', 'এবার আপনার পালা: বন্ধুকে উত্তর দিন'),
      exercises: [
        write('ib-7-y1', 'ib-marking', {
          ...P,
          prompt: l('A friend says: "Just write long essays with big words — that’s how you get Band 7." Write 3 sentences replying with the real facts.', 'এক বন্ধু বললেন: "শুধু কঠিন word দিয়ে লম্বা essay লিখুন — এভাবেই Band 7 আসে।" আসল তথ্য দিয়ে ৩টা sentence-এ উত্তর দিন।'),
          model: 'Actually, Writing is marked on four equal criteria, and length is not one of them. Lexical Resource rewards precise and natural words, so difficult words used wrongly can lower your band. It is better to answer the question fully, organise your ideas and write accurately.',
          checklist: [l('the four criteria, equally weighted', 'চারটা সমান criteria'), l('length and rare words are not criteria', 'দৈর্ঘ্য আর কঠিন word criteria না'), l('a better strategy', 'একটা ভালো কৌশল')],
          explanation: l('Replace myths with facts.', 'ভুল ধারণার বদলে তথ্য।'),
          task: 'The student replies to a friend who says long essays with big words get Band 7. Judge the IELTS facts first, then grammar only where it blocks meaning. Facts: Writing is marked on Task Achievement/Task Response, Coherence & Cohesion, Lexical Resource and Grammatical Range & Accuracy, equally weighted; Task 2 counts for more than Task 1; length is not a criterion but writing under the minimum (150 / 250 words) lowers the score; Lexical Resource rewards precise, natural words and forced vocabulary with errors lowers the score. Praise a clear, correct explanation and correct any remaining myth.',
          target: l('Facts, not myths', 'ভুল ধারণা না, তথ্য'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Check every IELTS claim against the facts — not against how many people repeat it.', 'প্রতিটা IELTS দাবি তথ্যের সাথে মেলান — কতজন বলছে তার সাথে না।'),
        l('Computer is not easier; length and rare words are not criteria; overall is an average.', 'Computer সহজ না; দৈর্ঘ্য আর কঠিন word criteria না; overall একটা গড়।'),
        l('Your own official requirement is the only one that counts.', 'শুধু আপনার নিজের official requirement-ই গোনা হয়।'),
      ],
    },
  ],
};

// ======================================================================= ib-8
export const ibYourPlan: Lesson = {
  id: 'ib-8',
  format: 'v2',
  title: l('Your IELTS plan', 'আপনার IELTS plan'),
  why: l('Put everything together: the right version and format, a target from your requirement, and practice at real exam timing — the plan you will follow in the next levels.', 'সবকিছু একসাথে: ঠিক version আর format, requirement থেকে target, আর আসল exam-এর সময়ে practice — পরের level-গুলোতে এই plan-ই মেনে চলবেন।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'reading',
  steps: [
    {
      kind: 'hook',
      title: l('Two students, two plans', 'দুই শিক্ষার্থী, দুই plan'),
      situation: l('Plan A: "Practise everything equally, book any IELTS, hope for 7." Plan B: "Academic, computer (I type fast), target 6.5 with no band below 6.0, extra Writing because my estimate is 5.5."', 'Plan A: "সব সমানভাবে practice, যেকোনো IELTS book, 7-এর আশা।" Plan B: "Academic, computer (আমি দ্রুত type করি), target 6.5 আর কোনো band 6.0-এর নিচে না, Writing বেশি কারণ আমার অনুমান 5.5।"'),
      question: l('Which plan is better, and why?', 'কোন plan ভালো, আর কেন?'),
      options: ['Plan B — it is based on the requirement, the format and the weakest skill', 'Plan A — it keeps options open', 'Both are the same'],
      answer: 'Plan B — it is based on the requirement, the format and the weakest skill',
      diagnose: {
        'Plan B — it is based on the requirement, the format and the weakest skill': l('Right. A good plan names the version, the format, the target (overall + minimums) and the skill that needs most work.', 'ঠিক। ভালো plan-এ version, format, target (overall + সর্বনিম্ন) আর যে skill-এ সবচেয়ে বেশি কাজ লাগবে তা থাকে।'),
        'Plan A — it keeps options open': l('"Any IELTS" may be the wrong version, and equal practice ignores the weakest skill.', '"যেকোনো IELTS" ভুল version হতে পারে, আর সমান practice সবচেয়ে দুর্বল skill-কে উপেক্ষা করে।'),
        'Both are the same': l('Plan B uses the facts from this module; Plan A uses hope.', 'Plan B এই module-এর তথ্য ব্যবহার করে; Plan A ভরসা করে আশার ওপর।'),
      },
    },
    {
      kind: 'discover',
      title: l('A plan in five lines', 'পাঁচ লাইনে একটা plan'),
      items: [
        { en: '1. Version: IELTS Academic for university study (confirm it in the official requirement)', note: l('lesson 3', 'lesson ৩') },
        { en: '2. Format: computer or paper (how you work best)', note: l('lesson 3', 'lesson ৩') },
        { en: '3. Target: overall + each skill minimum', note: l('lessons 4 and 6', 'lesson ৪ আর ৬') },
        { en: '4. Focus: the skill furthest below its target, by its criteria', note: l('lesson 5', 'lesson ৫') },
        { en: '5. Practice: full sections at real timing (60 min Reading, 20 + 40 min Writing)', note: l('lesson 2', 'lesson ২') },
      ],
      question: l('Which line decides how you spend most practice time?', 'কোন লাইন ঠিক করে বেশিরভাগ practice-এর সময় কোথায় যাবে?'),
      options: [
        l('4. Focus: the weakest skill against its target', '৪. Focus: target-এর তুলনায় সবচেয়ে দুর্বল skill'),
        l('2. Format', '২. Format'),
        l('1. Version', '১. Version'),
      ],
      answer: 0,
      pattern: l('Version → format → target → focus → timed practice. Update the focus as your practice estimates change.', 'Version → format → target → focus → সময় ধরে practice। Practice-এর অনুমান বদলালে focus আপডেট করুন।'),
    },
    {
      kind: 'concept',
      title: l('Building your plan', 'আপনার plan তৈরি'),
      body: l(
        'Your plan turns this module into action. Keep it short and review it every few weeks.',
        'আপনার plan এই module-কে কাজে রূপ দেয়। ছোট রাখুন আর কয়েক সপ্তাহ পরপর দেখে নিন।',
      ),
      points: [
        l('Version and format first: from the official requirement and from how you work best (typing or handwriting).', 'আগে version আর format: official requirement থেকে আর আপনি কীভাবে ভালো কাজ করেন (type না হাতে লেখা) তা থেকে।'),
        l('Targets second: the overall band and every skill minimum, with a small safety margin.', 'তারপর target: overall band আর প্রতিটা skill-এর সর্বনিম্ন, একটু নিরাপত্তার ব্যবধানসহ।'),
        l('Focus third: the skill furthest below its target — and within it, the weakest criterion (for example Coherence & Cohesion in Writing).', 'তৃতীয় focus: target-এর তুলনায় সবচেয়ে পিছিয়ে থাকা skill — আর তার ভেতরে সবচেয়ে দুর্বল criteria (যেমন Writing-এ Coherence & Cohesion)।'),
        l('Practise at real timing, and treat Mino’s scores as practice estimates, not official results.', 'আসল সময়ে practice করুন, আর Mino-র score-কে practice-এর অনুমান হিসেবে দেখুন, official result না।'),
        l('Common mix-up: booking the test first and planning later. Check the requirement and your weakest skill before choosing a test date on the official website.', 'সাধারণ ভুল: আগে test book করে পরে plan। Official website-এ তারিখ বাছার আগে requirement আর সবচেয়ে দুর্বল skill দেখে নিন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Example plans', 'Plan-এর উদাহরণ'),
      items: [
        { en: 'Master’s in the UK: Academic · paper · 6.5 (no band below 6.0) · focus Writing Task 2', note: l('university route', 'university-র পথ') },
        { en: 'Work abroad: check the regulator’s version · computer · target from the official page · focus Speaking', note: l('professional route', 'পেশাজীবী পথ') },
        { en: 'Migration: the version the visa rules require · paper · focus Reading timing', note: l('visa route', 'visa-র পথ') },
        { en: 'Undecided: take the Foundation diagnostic, then set the plan', note: l('start from your data', 'আপনার data থেকে শুরু') },
      ],
    },
    {
      kind: 'ielts',
      title: l('The plan, skill by skill', 'Skill অনুযায়ী plan'),
      uses: [
        { skill: 'listening', example: 'One full test a week, heard once, 40 questions', note: l('Real conditions.', 'আসল অবস্থা।') },
        { skill: 'reading', example: 'Three sections in 60 minutes, no transfer time', note: l('About 20 minutes each.', 'প্রতিটায় প্রায় ২০ মিনিট।') },
        { skill: 'writing', example: 'Task 1 in 20 minutes, Task 2 in 40 minutes', note: l('Task 2 counts for more.', 'Task 2-এর গুরুত্ব বেশি।') },
        { skill: 'speaking', example: 'Part 2: 1 minute notes, 2 minutes speaking', note: l('Record and review.', 'Record করে দেখুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Equal practice for all four skills', right: 'Most time on the skill furthest from its target', why: l('Focus where the gap is.', 'যেখানে ফাঁক সেখানে মনোযোগ।') },
        { wrong: 'Target: "as high as possible"', right: 'Target: the requirement plus a small margin', why: l('A clear, reachable goal.', 'পরিষ্কার, অর্জনযোগ্য লক্ষ্য।') },
        { wrong: 'Untimed practice only', right: 'Full sections at real timing', why: l('Timing is part of the test.', 'সময় test-এর অংশ।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: no hints', 'Practice: কোনো hint নেই'),
      exercises: [
        choice('ib-8-p1', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('What should come first in your plan?', 'আপনার plan-এ প্রথমে কী আসবে?'), options: ['The official requirement (version, overall, minimums)', 'Booking the earliest test date', 'Buying many practice books'], answer: 'The official requirement (version, overall, minimums)', explanation: l('The requirement sets everything else.', 'Requirement বাকি সব ঠিক করে।'), why: { 'Booking the earliest test date': l('Book after you know the version and target.', 'Version আর target জানার পরে book করুন।'), 'Buying many practice books': l('Materials come after the target and focus.', 'Target আর focus-এর পরে উপকরণ।') } }),
        choice('ib-8-p2', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Targets L 7.0, R 6.5, W 6.0, S 6.5. What overall do they give?', 'Target L 7.0, R 6.5, W 6.0, S 6.5। Overall কত হয়?'), options: ['6.5', '6.0', '7.0'], answer: '6.5', explanation: l('26 ÷ 4 = 6.5.', '26 ÷ 4 = 6.5।'), why: { '6.0': l('The overall is the average, not the lowest.', 'Overall গড়, সবচেয়ে কমটা না।'), '7.0': l('26 ÷ 4 = 6.5, not 7.0.', '26 ÷ 4 = 6.5, 7.0 না।') } }),
        choice('ib-8-p3', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('Which is a realistic Writing practice?', 'কোনটা বাস্তব Writing practice?'), options: ['Task 1 in 20 minutes, then Task 2 in 40 minutes', 'Task 2 in 20 minutes', 'Task 1 with no time limit'], answer: 'Task 1 in 20 minutes, then Task 2 in 40 minutes', explanation: l('The real timing.', 'আসল সময়।'), why: { 'Task 2 in 20 minutes': l('Task 2 needs about 40 minutes.', 'Task 2-এ প্রায় ৪০ মিনিট লাগে।'), 'Task 1 with no time limit': l('Untimed practice does not train exam speed.', 'সময় ছাড়া practice exam-এর গতি শেখায় না।') } }),
        choice('ib-8-p4', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('Your Writing feedback says your paragraphs are hard to follow. Which criterion should you focus on?', 'আপনার Writing feedback বলছে paragraph বোঝা কঠিন। কোন criteria-য় মনোযোগ দেবেন?'), options: ['Coherence & Cohesion', 'Pronunciation', 'Lexical Resource only'], answer: 'Coherence & Cohesion', explanation: l('Organisation and linking.', 'গোছানো আর যোগসূত্র।'), why: { Pronunciation: l('Pronunciation is a Speaking criterion.', 'Pronunciation Speaking-এর criteria।'), 'Lexical Resource only': l('Hard-to-follow paragraphs are about organisation, not vocabulary.', 'বোঝা কঠিন paragraph গোছানোর সমস্যা, vocabulary-র না।') } }),
        choice('ib-8-p5', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('You write faster by hand and find screens tiring. Which format suits you?', 'আপনি হাতে দ্রুত লেখেন আর screen-এ ক্লান্ত হন। কোন format মানায়?'), options: ['Paper-based', 'Computer-delivered', 'It does not matter at all'], answer: 'Paper-based', explanation: l('Choose how you work best.', 'যেভাবে ভালো কাজ করেন।'), why: { 'Computer-delivered': l('Typing slowly and reading on screen would slow you down.', 'ধীরে type আর screen-এ পড়া আপনাকে ধীর করবে।'), 'It does not matter at all': l('Content is the same, but the answering method affects your speed.', 'Content একই, কিন্তু উত্তর দেওয়ার ধরন আপনার গতিতে প্রভাব ফেলে।') } }),
        choice('ib-8-p6', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('You have not chosen your university yet. What is the sensible step?', 'এখনো university ঠিক করেননি। যুক্তিসঙ্গত পদক্ষেপ কী?'), options: ['Shortlist universities, then check their official requirement before booking', 'Book two tests to be safe', 'Book a date first and check later'], answer: 'Shortlist universities, then check their official requirement before booking', explanation: l('Purpose → requirement → booking.', 'উদ্দেশ্য → requirement → booking।'), why: { 'Book two tests to be safe': l('That costs twice; check the requirement first.', 'এতে দ্বিগুণ খরচ; আগে requirement দেখুন।'), 'Book a date first and check later': l('The requirement may need a higher band or a specific date; check first.', 'Requirement-এ বেশি band বা নির্দিষ্ট সময় লাগতে পারে; আগে দেখুন।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ib-8-r1', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('Write the number of minutes.', 'মিনিটের সংখ্যা লিখুন।'), sentence: 'In a timed plan, give Writing Task 2 about ___ minutes.', accepted: ['40', 'forty'], explanation: l('About 40 minutes.', 'প্রায় ৪০ মিনিট।') }),
        gap('ib-8-r2', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Write the overall band.', 'Overall band লিখুন।'), sentence: 'Targets L 7.5 · R 7.0 · W 6.5 · S 7.0 → overall ___', accepted: ['7', '7.0'], explanation: l('28 ÷ 4 = 7.0.', '28 ÷ 4 = 7.0।') }),
        spot('ib-8-r3', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('One word makes this advice wrong. Tap it and fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Spend most practice time on your strongest skill.', wrong: 'strongest', accepted: ['weakest'], explanation: l('Focus on the biggest gap.', 'সবচেয়ে বড় ফাঁকে মনোযোগ।') }),
        correct('ib-8-r4', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'Book the test first and check the requirement later.', accepted: ['Check the requirement first and book the test later.', 'Book the test later and check the requirement first.', 'Book the test after you check the requirement.'], explanation: l('Requirement first.', 'আগে requirement।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        correct('ib-8-c1', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Fix the wrong overall (change one number).', 'ভুল overall ঠিক করুন (একটা সংখ্যা বদলান)।'), sentence: 'Targets L 6.5, R 6.5, W 6.0 and S 6.0 give an overall of 6.0.', accepted: ['Targets L 6.5, R 6.5, W 6.0 and S 6.0 give an overall of 6.5.'], explanation: l('25 ÷ 4 = 6.25 → 6.5.', '25 ÷ 4 = 6.25 → 6.5।') }),
        spot('ib-8-c2', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('One word makes this false. Tap it, then fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Choose the computer test because it is easier.', wrong: 'easier', accepted: ['faster for you', 'better for you'], fixOptions: ['faster for you', 'easy', 'easiest'], explanation: l('Neither is easier; choose what suits you.', 'কোনোটাই সহজ না; যেটা মানায় সেটা বাছুন।') }),
        order('ib-8-c3', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Check the requirement before you book the test.', explanation: l('Requirement first.', 'আগে requirement।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your five-line plan', 'এবার আপনার পালা: পাঁচ লাইনের plan'),
      exercises: [
        write('ib-8-y1', 'ib-plan', {
          ...P,
          prompt: l('Write your IELTS plan in 3–5 sentences: version, format, target (overall and minimums), the skill you will focus on, and how you will practise it at real timing.', '৩–৫টা sentence-এ আপনার IELTS plan লিখুন: version, format, target (overall আর সর্বনিম্ন), কোন skill-এ মনোযোগ দেবেন, আর আসল সময়ে কীভাবে practice করবেন।'),
          model: 'I will take IELTS Academic because I want to study for a master’s degree. I will choose the paper-based test because I write quickly by hand. My target is 6.5 overall with no band below 6.0. I will focus on Writing, because my practice estimate is 5.5, and I will write one Task 2 essay in 40 minutes three times a week.',
          checklist: [l('version and format with reasons', 'কারণসহ version আর format'), l('overall target and skill minimums', 'overall target আর skill-এর সর্বনিম্ন'), l('focus skill and timed practice', 'focus skill আর সময় ধরে practice')],
          explanation: l('Version → format → target → focus → timed practice.', 'Version → format → target → focus → সময় ধরে practice।'),
          task: 'The student writes a 3–5 sentence IELTS plan: version, format, target, focus skill and timed practice. Judge the IELTS facts first, then grammar only where it blocks meaning. Facts: IELTS Academic is the version universities usually ask for, and the official requirement decides; computer and paper have the same content and scoring and Speaking is face to face in both; bands are 0–9 in half bands and the overall is the average of four rounded to the nearest half band; requirements often set a minimum per skill; Listening ~30 min/40 questions, Reading 60 min/40 questions, Writing 60 min (Task 1 150+ words ~20 min, Task 2 250+ words ~40 min, Task 2 counts more), Speaking 11–14 min; Mino scores are practice estimates. Praise a specific, realistic plan; correct wrong facts; never state fees, dates or a specific institution’s requirement.',
          target: l('A complete IELTS plan', 'সম্পূর্ণ IELTS plan'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Plan: version → format → target → focus → timed practice.', 'Plan: version → format → target → focus → সময় ধরে practice।'),
        l('Focus on the skill furthest from its target, criterion by criterion.', 'Target থেকে সবচেয়ে দূরের skill-এ মনোযোগ, criteria ধরে ধরে।'),
        l('Check the official requirement before booking; dates and fees on the official website.', 'Book-এর আগে official requirement দেখুন; তারিখ আর fee official website-এ।'),
      ],
    },
  ],
};

// ======================================================================= ib-9
export const ibReview: Lesson = {
  id: 'ib-9',
  kind: 'test',
  title: l('What is IELTS? review test', 'IELTS কী? review test'),
  why: l('Check what you have learned. Your mistakes here decide what Mino suggests you review.', 'কী শিখলেন যাচাই করুন। এখানের ভুল দেখেই Mino ঠিক করবে কী review করা দরকার।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'reading',
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
        choice('ib-9-e1', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('What makes IELTS Academic "academic"?', 'কী কারণে IELTS Academic "academic"?'), options: ['Academic Reading passages and a data-description Writing Task 1', 'It has no Speaking test', 'It is only on paper'], answer: 'Academic Reading passages and a data-description Writing Task 1', explanation: l('Academic Reading and Writing Task 1 on visual data.', 'Academic Reading আর visual data নিয়ে Writing Task 1।') }),
        choice('ib-9-e2', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('How long is the Speaking test?', 'Speaking test কত সময়ের?'), options: ['11–14 minutes', '30 minutes', '60 minutes'], answer: '11–14 minutes', explanation: l('11–14 minutes.', '১১–১৪ মিনিট।') }),
        choice('ib-9-e3', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('Which is true about computer-delivered IELTS?', 'Computer-delivered IELTS নিয়ে কোনটা সত্য?'), options: ['Same content and scoring as paper', 'Easier questions', 'No Speaking test'], answer: 'Same content and scoring as paper', explanation: l('Same test.', 'একই test।') }),
        choice('ib-9-e4', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('L 7.0 · R 7.0 · W 6.0 · S 6.5 → overall?', 'L 7.0 · R 7.0 · W 6.0 · S 6.5 → overall?'), options: ['6.5', '6.0', '7.0'], answer: '6.5', explanation: l('26.5 ÷ 4 = 6.625 → 6.5.', '26.5 ÷ 4 = 6.625 → 6.5।') }),
        choice('ib-9-e5', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('Which is a Writing criterion?', 'কোনটা Writing-এর criteria?'), options: ['Coherence & Cohesion', 'Pronunciation', 'Word count'], answer: 'Coherence & Cohesion', explanation: l('One of four.', 'চারটার একটা।') }),
        choice('ib-9-e6', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Requirement: 6.5, no band below 6.0. Result: L 8.0, R 7.5, W 5.5, S 6.5. Met?', 'Requirement: 6.5, কোনো band 6.0-এর নিচে না। Result: L 8.0, R 7.5, W 5.5, S 6.5। পূরণ হয়েছে?'), options: ['No — Writing is below 6.0', 'Yes — overall is 7.0', 'Yes — most skills are high'], answer: 'No — Writing is below 6.0', explanation: l('Every minimum must be met.', 'প্রতিটা সর্বনিম্ন পূরণ করতে হবে।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Part 2: write and fix', 'Part 2: লিখুন আর ঠিক করুন'),
      exercises: [
        gap('ib-9-e7', 'ib-format', { ...P, pattern: 'ib-format-fact', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'Listening has 4 parts and ___ questions.', accepted: ['40', 'forty'], explanation: l('40.', '৪০।') }),
        gap('ib-9-e8', 'ib-bands', { ...P, pattern: 'ib-band-calc', prompt: l('Write the overall band.', 'Overall band লিখুন।'), sentence: 'An average of 5.75 becomes an overall band of ___.', accepted: ['6', '6.0'], explanation: l('.75 rounds up to 6.0.', '.75 বেড়ে 6.0।') }),
        spot('ib-9-e9', 'ib-versions', { ...P, pattern: 'ib-version-fact', prompt: l('One word makes this false. Tap it and fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'In Academic IELTS, Writing Task 1 is a letter.', wrong: 'letter', accepted: ['graph', 'report', 'chart', 'diagram', 'table'], fixOptions: ['graph', 'essay', 'letters'], explanation: l('Academic Task 1 describes visual information.', 'Academic Task 1-এ visual তথ্যের বর্ণনা।') }),
        correct('ib-9-e10', 'ib-delivery', { ...P, pattern: 'ib-delivery-fact', prompt: l('Correct the false statement (change one number).', 'ভুল বাক্যটা ঠিক করুন (একটা সংখ্যা বদলান)।'), sentence: 'Paper-based Listening gives 2 minutes to transfer answers.', accepted: ['Paper-based Listening gives 10 minutes to transfer answers.'], explanation: l('Paper: 10 minutes.', 'Paper: ১০ মিনিট।') }),
        spot('ib-9-e11', 'ib-marking', { ...P, pattern: 'ib-marking-fact', prompt: l('One word makes this false. Tap it and fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Task 1 counts for more than Task 2.', wrong: 'more', accepted: ['less'], fixOptions: ['less', 'most', 'least'], explanation: l('Task 2 counts for more.', 'Task 2-এর গুরুত্ব বেশি।') }),
        correct('ib-9-e12', 'ib-plan', { ...P, pattern: 'ib-requirement', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'Check test fees on a coaching centre poster.', accepted: ['Check test fees on the official website.', 'Check test fees on an official website.'], explanation: l('Official website only.', 'শুধু official website।') }),
      ],
    },
    {
      kind: 'ielts',
      title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'Task 1: 150+ words (~20 min) · Task 2: 250+ words (~40 min)', note: l('Plan your 60 minutes.', 'আপনার ৬০ মিনিট ভাগ করুন।') },
        { skill: 'listening', example: '4 parts · 40 questions · heard once', note: l('Practise in real conditions.', 'আসল অবস্থায় practice।') },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('IELTS Academic is for university study; the official requirement decides the version and band.', 'IELTS Academic university-তে পড়ার জন্য; official requirement ঠিক করে version আর band।'),
        l('Bands 0–9 in half bands; overall = average of four, rounded; check every skill minimum.', 'Band 0–9, half band-সহ; overall = চারটার গড়, round করা; প্রতিটা skill-এর সর্বনিম্ন দেখুন।'),
        l('Writing and Speaking: four equal criteria; practise at real timing.', 'Writing আর Speaking: চারটা সমান criteria; আসল সময়ে practice।'),
      ],
    },
  ],
};

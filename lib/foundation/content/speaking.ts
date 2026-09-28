import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Understanding IELTS Speaking (Foundation LEVEL 2, module 5), six lessons in the
 * v2 format. Facts and techniques match lib/ai/server/mino/knowledge/ielts.ts
 * (11–14 minutes, face to face with an examiner, 3 parts; Part 1 4–5 minutes on
 * familiar topics; Part 2 a cue card with 1 minute to prepare and 1–2 minutes of
 * speaking; Part 3 4–5 minutes of deeper discussion linked to Part 2; four
 * equally weighted criteria: Fluency & Coherence, Lexical Resource, Grammatical
 * Range & Accuracy, Pronunciation; extend answers with a reason and an example;
 * memorised scripts sound unnatural; pronunciation means being easy to
 * understand, not a native accent; natural spoken phrasing over written style).
 * Answers are practised in writing here ("write what you would say"); spoken
 * practice with feedback is the Speaking practice test. sp-1 how Speaking works ·
 * sp-2 Part 1 · sp-3 Part 2 · sp-4 Part 3 · sp-5 fluency and natural language ·
 * sp-6 pronunciation. Original Mino content.
 */

export const SPEAKING_CONCEPTS: Concept[] = [
  { id: 'sp-format', title: l('How Speaking works and is marked', 'Speaking কীভাবে চলে আর মার্ক হয়'), lessonId: 'sp-1', tag: 'speaking' },
  { id: 'sp-part1', title: l('Part 1: answer and extend', 'Part 1: উত্তর আর বিস্তার'), lessonId: 'sp-2', tag: 'speaking' },
  { id: 'sp-part2', title: l('Part 2: the long turn', 'Part 2: long turn'), lessonId: 'sp-3', tag: 'speaking' },
  { id: 'sp-part3', title: l('Part 3: opinions, comparing, speculating', 'Part 3: মতামত, তুলনা, অনুমান'), lessonId: 'sp-4', tag: 'speaking' },
  { id: 'sp-fluency', title: l('Fluency and natural spoken language', 'Fluency আর স্বাভাবিক কথ্য ভাষা'), lessonId: 'sp-5', tag: 'speaking' },
  { id: 'sp-pron', title: l('Pronunciation: being easy to understand', 'Pronunciation: সহজে বোঝা যাওয়া'), lessonId: 'sp-6', tag: 'speaking' },
];

const P = { tag: 'speaking' as const };

/** An example Part 2 cue card. */
export const CUE_PLACE = 'Describe a place you like to visit. You should say: where it is, how often you go there, what you do there, and explain why you like it.';

// ======================================================================= sp-1
export const spFormat: Lesson = {
  id: 'sp-1',
  format: 'v2',
  concept: 'sp-format',
  title: l('How Speaking works and is marked', 'Speaking কীভাবে চলে আর মার্ক হয়'),
  why: l('IELTS Speaking is a short, face-to-face conversation with an examiner in three parts. Knowing what each part asks and how you are marked removes most of the surprise.', 'IELTS Speaking হলো examiner-এর সাথে সামনাসামনি, তিন অংশের ছোট একটা কথোপকথন। প্রতিটা অংশ কী চায় আর কীভাবে মার্ক হয় জানলে বেশিরভাগ অনিশ্চয়তা দূর হয়।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'speaking',
  steps: [
    {
      kind: 'hook',
      title: l('Ready for the wrong test', 'ভুল test-এর প্রস্তুতি'),
      situation: l('Sabbir memorises three long answers and plans to speak into a computer microphone. He thinks the test lasts 30 minutes and that a British accent is needed for a high score.', 'Sabbir তিনটা লম্বা উত্তর মুখস্থ করেন আর ভাবেন computer-এর microphone-এ কথা বলবেন। তিনি মনে করেন test ৩০ মিনিটের, আর বেশি score-এর জন্য British accent লাগে।'),
      question: l('How many of his ideas are right?', 'তাঁর কয়টা ধারণা ঠিক?'),
      options: ['None', 'One', 'All of them'],
      answer: 'None',
      diagnose: {
        None: l('Right. Speaking is 11–14 minutes, face to face with an examiner (even in computer-delivered IELTS), memorised scripts sound unnatural, and pronunciation is about being easy to understand, not a native accent.', 'ঠিক। Speaking ১১–১৪ মিনিটের, examiner-এর সাথে সামনাসামনি (computer-delivered IELTS-এও), মুখস্থ উত্তর অস্বাভাবিক শোনায়, আর pronunciation মানে সহজে বোঝা যাওয়া, native accent নয়।'),
        One: l('None of them: check the timing, the format, memorising and accent again.', 'একটাও না: সময়, format, মুখস্থ করা আর accent আবার দেখুন।'),
        'All of them': l('All four are myths. The test is 11–14 minutes, face to face, and rewards natural, clear speech.', 'চারটাই ভুল ধারণা। Test ১১–১৪ মিনিটের, সামনাসামনি, আর স্বাভাবিক, পরিষ্কার কথাকে পুরস্কৃত করে।'),
      },
    },
    {
      kind: 'discover',
      title: l('Three parts, one conversation', 'তিন অংশ, একটা কথোপকথন'),
      items: [
        { en: 'Part 1 (4–5 minutes): questions about familiar topics — home, studies, hobbies', note: l('short, natural answers', 'ছোট, স্বাভাবিক উত্তর') },
        { en: 'Part 2: a cue card · 1 minute to prepare · speak for 1–2 minutes', note: l('the long turn', 'long turn') },
        { en: 'Part 3 (4–5 minutes): a deeper discussion linked to Part 2', note: l('opinions, comparing, speculating', 'মতামত, তুলনা, অনুমান') },
        { en: '11–14 minutes in total, face to face with an examiner', note: l('also in computer-delivered IELTS', 'computer-delivered IELTS-এও') },
      ],
      question: l('Which part gives you a cue card and 1 minute to prepare?', 'কোন অংশে cue card আর প্রস্তুতির জন্য ১ মিনিট পান?'),
      options: [
        l('Part 2', 'Part 2'),
        l('Part 1', 'Part 1'),
        l('Part 3', 'Part 3'),
      ],
      answer: 0,
      pattern: l('Part 1: familiar topics (4–5 min). Part 2: cue card, 1 minute to prepare, 1–2 minutes speaking. Part 3: deeper discussion (4–5 min). 11–14 minutes, face to face.', 'Part 1: পরিচিত বিষয় (৪–৫ মিনিট)। Part 2: cue card, ১ মিনিট প্রস্তুতি, ১–২ মিনিট বলা। Part 3: গভীর আলোচনা (৪–৫ মিনিট)। ১১–১৪ মিনিট, সামনাসামনি।'),
    },
    {
      kind: 'concept',
      title: l('Four criteria, equally weighted', 'চারটা criteria, সমান গুরুত্ব'),
      body: l(
        'A trained examiner marks your speaking on four criteria, each counting equally.',
        'একজন প্রশিক্ষিত examiner চারটা criteria-য় আপনার কথা মার্ক করেন, প্রতিটার গুরুত্ব সমান।',
      ),
      points: [
        l('Fluency & Coherence: can you keep talking at a natural pace, with ideas that connect?', 'Fluency & Coherence: স্বাভাবিক গতিতে কথা চালিয়ে যেতে পারেন কি, idea যুক্ত রেখে?'),
        l('Lexical Resource: do you choose precise, natural words for the topic?', 'Lexical Resource: বিষয়ের জন্য নির্ভুল, স্বাভাবিক word বাছেন কি?'),
        l('Grammatical Range & Accuracy: a range of structures, used accurately.', 'Grammatical Range & Accuracy: বিভিন্ন গঠন, নির্ভুলভাবে।'),
        l('Pronunciation: are you easy to understand (stress, intonation, clear sounds)? A native accent is not needed.', 'Pronunciation: আপনাকে কি সহজে বোঝা যায় (stress, intonation, পরিষ্কার ধ্বনি)? Native accent লাগে না।'),
        l('Common mix-up: "memorised answers are safe". Memorised scripts sound unnatural and examiners notice them; practise flexible ideas instead.', 'সাধারণ ভুল: "মুখস্থ উত্তর নিরাপদ"। মুখস্থ উত্তর অস্বাভাবিক শোনায় আর examiner তা বোঝেন; তার বদলে নমনীয় idea practice করুন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('The four criteria in action', 'চারটা criteria কাজে'),
      items: [
        { en: 'Fluency & Coherence: "I usually cook at weekends, mainly because I have more time then."', note: l('keeps going, connected', 'থামে না, যুক্ত') },
        { en: 'Lexical Resource: "a quiet neighbourhood" rather than "a very very not noisy place"', note: l('precise', 'নির্ভুল') },
        { en: 'Grammatical Range & Accuracy: "If I had more time, I’d learn to swim."', note: l('a range, accurate', 'বৈচিত্র্য, নির্ভুল') },
        { en: 'Pronunciation: clear word stress — en-VI-ron-ment', note: l('easy to understand', 'সহজে বোঝা যায়') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'speaking', example: '3 parts · 11–14 minutes · face to face', note: l('Know each part’s job.', 'প্রতিটা অংশের কাজ জানুন।') },
        { skill: 'writing', example: 'Lexical Resource and Grammatical Range & Accuracy are Writing criteria too.', note: l('Two shared criteria.', 'দুটো criteria একই।') },
        { skill: 'listening', example: 'Listening to the examiner’s exact question keeps your answer relevant.', note: l('Answer what is asked.', 'যা জিজ্ঞেস করা হয় তার উত্তর।') },
        { skill: 'reading', example: 'Reading the cue card’s prompts quickly in Part 2.', note: l('Scan the prompts.', 'Prompt scan করুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Memorising long answers word for word', right: 'Practise flexible ideas', why: l('Scripts sound unnatural.', 'মুখস্থ উত্তর অস্বাভাবিক শোনায়।') },
        { wrong: 'Trying to copy a native accent', right: 'Aim to be clear and easy to understand', why: l('Accent is not the criterion.', 'Accent criteria নয়।') },
        { wrong: 'Thinking computer IELTS has computer Speaking', right: 'Speaking is face to face with an examiner', why: l('Same in both formats.', 'দুই format-এ একই।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('sp-1-p1', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('How long is the Speaking test?', 'Speaking test কত সময়ের?'), options: ['11–14 minutes', '30 minutes', '60 minutes'], answer: '11–14 minutes', explanation: l('Short and face to face.', 'ছোট আর সামনাসামনি।'), why: { '30 minutes': l('That is about the length of Listening.', 'ওটা মোটামুটি Listening-এর সময়।'), '60 minutes': l('That is Reading or Writing.', 'ওটা Reading বা Writing।') } }),
        choice('sp-1-p2', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('In computer-delivered IELTS, Speaking is…', 'Computer-delivered IELTS-এ Speaking…'), options: ['face to face with an examiner', 'recorded into a computer', 'a written test'], answer: 'face to face with an examiner', explanation: l('Speaking stays face to face.', 'Speaking সামনাসামনিই থাকে।'), why: { 'recorded into a computer': l('Speaking is always with an examiner.', 'Speaking সবসময় examiner-এর সাথে।'), 'a written test': l('It is a spoken conversation.', 'এটা মুখে কথোপকথন।') } }),
        choice('sp-1-p3', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('How long do you speak in Part 2?', 'Part 2-এ কতক্ষণ বলেন?'), options: ['1–2 minutes', '10 seconds', '5–6 minutes'], answer: '1–2 minutes', explanation: l('After 1 minute to prepare.', '১ মিনিট প্রস্তুতির পরে।'), why: { '10 seconds': l('Part 2 is the long turn.', 'Part 2 হলো long turn।'), '5–6 minutes': l('Parts 1 and 3 are 4–5 minutes; Part 2 speaking is 1–2.', 'Part 1 আর 3 ৪–৫ মিনিট; Part 2-এ বলা ১–২।') } }),
        choice('sp-1-p4', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('Which is NOT a Speaking criterion?', 'কোনটা Speaking-এর criteria নয়?'), options: ['A native-speaker accent', 'Pronunciation', 'Fluency & Coherence'], answer: 'A native-speaker accent', explanation: l('Pronunciation = easy to understand.', 'Pronunciation = সহজে বোঝা যাওয়া।'), why: { Pronunciation: l('Pronunciation is one of the four criteria.', 'Pronunciation চারটা criteria-র একটা।'), 'Fluency & Coherence': l('Fluency & Coherence is a criterion.', 'Fluency & Coherence একটা criteria।') } }),
        choice('sp-1-p5', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('What is Part 3 linked to?', 'Part 3 কীসের সাথে যুক্ত?'), options: ['The topic of Part 2', 'Your Reading score', 'A new random topic'], answer: 'The topic of Part 2', explanation: l('A deeper discussion of the Part 2 topic.', 'Part 2-এর বিষয়ের গভীর আলোচনা।'), why: { 'Your Reading score': l('Speaking is separate from Reading.', 'Speaking Reading থেকে আলাদা।'), 'A new random topic': l('Part 3 develops the Part 2 topic.', 'Part 3 Part 2-এর বিষয়কেই বাড়ায়।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sp-1-r1', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'IELTS Speaking has ___ parts.', accepted: ['3', 'three'], explanation: l('3 parts.', '৩টা অংশ।') }),
        gap('sp-1-r2', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('Write the number.', 'সংখ্যাটা লিখুন।'), sentence: 'In Part 2 you get ___ minute to prepare.', accepted: ['1', 'one'], explanation: l('1 minute.', '১ মিনিট।') }),
        spot('sp-1-r3', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('One word makes this false. Tap it and fix it.', 'একটা word এটাকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Speaking lasts about 30 minutes.', wrong: '30', accepted: ['11–14', '11-14'], explanation: l('11–14 minutes.', '১১–১৪ মিনিট।') }),
        correct('sp-1-r4', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'Memorise full answers for every topic.', accepted: ['Practise flexible ideas for every topic.', 'Do not memorise full answers for every topic.', 'Practise flexible ideas, not memorised answers.'], explanation: l('Flexible ideas, not scripts.', 'মুখস্থ নয়, নমনীয় idea।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sp-1-c1', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('Which part has questions about your home, studies or hobbies?', 'কোন অংশে আপনার বাড়ি, পড়াশোনা বা শখ নিয়ে প্রশ্ন?'), options: ['Part 1', 'Part 2', 'Part 3'], answer: 'Part 1', explanation: l('Familiar topics.', 'পরিচিত বিষয়।') }),
        spot('sp-1-c2', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('One word is wrong. Tap it, then fix it.', 'একটা word ভুল। Tap করে ঠিক করুন।'), sentence: 'Speaking is marked on four criteria of different weight.', wrong: 'different', accepted: ['equal'], fixOptions: ['equal', 'secret', 'changing'], explanation: l('Equally weighted.', 'সমান গুরুত্ব।') }),
        order('sp-1-c3', 'sp-format', { ...P, pattern: 'sp-format-fact', prompt: l('Build the fact.', 'তথ্যটা সাজান।'), answer: 'Speaking is face to face with an examiner.', explanation: l('Always.', 'সবসময়।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: describe the test', 'এবার আপনার পালা: test-টা বর্ণনা করুন'),
      exercises: [
        write('sp-1-y1', 'sp-format', {
          ...P,
          prompt: l('Write 3 sentences explaining the three parts of IELTS Speaking and what the examiner listens for.', 'IELTS Speaking-এর তিনটা অংশ আর examiner কী শোনেন — ৩টা sentence-এ লিখুন।'),
          model: 'In Part 1, the examiner asks short questions about familiar topics such as my studies and hobbies. In Part 2, I get a cue card and one minute to prepare, and then I speak for one to two minutes; Part 3 is a deeper discussion linked to that topic. The examiner listens for fluency and coherence, vocabulary, grammar and clear pronunciation, not a native accent.',
          checklist: [l('what each part asks', 'প্রতিটা অংশ কী চায়'), l('Part 2 timing', 'Part 2-এর সময়'), l('the four criteria (not accent)', 'চারটা criteria (accent নয়)')],
          explanation: l('Know the test before you practise it.', 'Practice-এর আগে test-টা জানুন।'),
          task: 'The student explains the three parts of IELTS Speaking and what the examiner listens for. Judge the facts first: 11–14 minutes, face to face with an examiner (also in computer-delivered IELTS); Part 1 (4–5 minutes) familiar topics; Part 2 a cue card, 1 minute to prepare, 1–2 minutes of speaking; Part 3 (4–5 minutes) a deeper discussion linked to Part 2; four equally weighted criteria: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation (being easy to understand, not a native accent). Then correct grammar only where it blocks the meaning. Correct any wrong fact gently.',
          target: l('How Speaking works and is marked', 'Speaking কীভাবে চলে আর মার্ক হয়'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('3 parts · 11–14 minutes · face to face with an examiner.', '৩ অংশ · ১১–১৪ মিনিট · examiner-এর সাথে সামনাসামনি।'),
        l('Part 2: 1 minute to prepare, 1–2 minutes to speak.', 'Part 2: ১ মিনিট প্রস্তুতি, ১–২ মিনিট বলা।'),
        l('Four equal criteria; clear, not native-sounding.', 'চারটা সমান criteria; পরিষ্কার, native-এর মত নয়।'),
      ],
    },
  ],
};

// ======================================================================= sp-2
export const spPart1: Lesson = {
  id: 'sp-2',
  format: 'v2',
  concept: 'sp-part1',
  title: l('Part 1: answer and extend', 'Part 1: উত্তর আর বিস্তার'),
  why: l('Part 1 questions are simple, but a one-word answer gives the examiner almost nothing to mark. Answer, give a reason, and add a detail or example — in two or three natural sentences.', 'Part 1-এর প্রশ্ন সহজ, কিন্তু এক word-এর উত্তরে examiner মার্ক করার মত প্রায় কিছুই পান না। উত্তর দিন, কারণ বলুন, আর একটা detail বা উদাহরণ যোগ করুন — দুই-তিনটা স্বাভাবিক sentence-এ।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'speaking',
  steps: [
    {
      kind: 'hook',
      title: l('"Yes."', '"Yes."'),
      situation: l('Examiner: "Do you like cooking?" Rumi: "Yes." Examiner: "Why?" Rumi: "Because it is good."', 'Examiner: "Do you like cooking?" Rumi: "Yes." Examiner: "Why?" Rumi: "Because it is good."'),
      question: l('What would a stronger answer do?', 'শক্তিশালী উত্তর কী করত?'),
      options: ['Answer, give a real reason and add a detail', 'Give a memorised paragraph about food', 'Say "Yes" more confidently'],
      answer: 'Answer, give a real reason and add a detail',
      diagnose: {
        'Answer, give a real reason and add a detail': l('Right. "Yes, I do — mainly because it helps me relax after classes. I usually make simple things like dal and rice at the weekend."', 'ঠিক। "Yes, I do — mainly because it helps me relax after classes. I usually make simple things like dal and rice at the weekend."'),
        'Give a memorised paragraph about food': l('Memorised answers sound unnatural and often miss the exact question.', 'মুখস্থ উত্তর অস্বাভাবিক শোনায় আর প্রায়ই ঠিক প্রশ্ন ধরে না।'),
        'Say "Yes" more confidently': l('Confidence helps, but one word shows very little.', 'আত্মবিশ্বাস সাহায্য করে, কিন্তু এক word খুব কম দেখায়।'),
      },
    },
    {
      kind: 'discover',
      title: l('Answer + reason + detail', 'উত্তর + কারণ + detail'),
      items: [
        { en: 'Answer: "Yes, I do." / "Not really."', note: l('a direct answer first', 'আগে সরাসরি উত্তর') },
        { en: 'Reason: "…mainly because it helps me relax."', note: l('why', 'কেন') },
        { en: 'Detail or example: "I usually make dal and rice at the weekend."', note: l('when / what / who', 'কখন / কী / কে') },
        { en: 'Length: about 2–3 sentences, then stop', note: l('Part 1 is not a speech', 'Part 1 বক্তৃতা নয়') },
      ],
      question: l('How long should a Part 1 answer usually be?', 'Part 1-এর উত্তর সাধারণত কত লম্বা হবে?'),
      options: [
        l('About 2–3 natural sentences', 'প্রায় ২–৩টা স্বাভাবিক sentence'),
        l('One word', 'এক word'),
        l('Two minutes', 'দুই মিনিট'),
      ],
      answer: 0,
      pattern: l('Answer directly → give a reason → add a detail or example. About 2–3 sentences.', 'সরাসরি উত্তর → কারণ → detail বা উদাহরণ। প্রায় ২–৩ sentence।'),
    },
    {
      kind: 'concept',
      title: l('Short, natural, extended', 'ছোট, স্বাভাবিক, বিস্তৃত'),
      body: l(
        'Part 1 lasts 4–5 minutes and covers familiar topics. The examiner wants to hear you talk naturally about your own life.',
        'Part 1 ৪–৫ মিনিটের, পরিচিত বিষয় নিয়ে। Examiner আপনাকে নিজের জীবন নিয়ে স্বাভাবিকভাবে কথা বলতে শুনতে চান।',
      ),
      points: [
        l('Answer the exact question first — "Do you…?" needs yes / no / not really, then more.', 'আগে ঠিক প্রশ্নের উত্তর দিন — "Do you…?"-এর জন্য yes / no / not really, তারপর আরও।'),
        l('Extend with a reason (because, mainly because, the main reason is…) and a detail (usually, for example, last week…).', 'কারণ দিয়ে বাড়ান (because, mainly because, the main reason is…) আর একটা detail দিন (usually, for example, last week…)।'),
        l('Match the tense to the question: "Did you…?" → past; "Do you…?" → present; "Will you…?" → future.', 'প্রশ্নের সাথে tense মেলান: "Did you…?" → past; "Do you…?" → present; "Will you…?" → future।'),
        l('Keep it natural: contractions (I’m, I’d, don’t) are normal in speech.', 'স্বাভাবিক রাখুন: কথায় contraction (I’m, I’d, don’t) স্বাভাবিক।'),
        l('Common mix-up: thinking longer is always better. Two or three good sentences, then stop and let the examiner ask the next question.', 'সাধারণ ভুল: যত লম্বা তত ভালো ভাবা। দুই-তিনটা ভালো sentence, তারপর থামুন, examiner পরের প্রশ্ন করবেন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('One-word vs extended', 'এক word বনাম বিস্তৃত'),
      items: [
        { en: '"Do you work or are you a student?" → "I’m a student. I’m in my second year of a business degree in Chattogram."', note: l('answer + detail', 'উত্তর + detail') },
        { en: '"Do you like rain?" → "Not really, to be honest, because the roads flood near my home."', note: l('answer + reason', 'উত্তর + কারণ') },
        { en: '"Did you play sports as a child?" → "Yes, I played cricket with my cousins almost every evening."', note: l('past question → past answer', 'past প্রশ্ন → past উত্তর') },
        { en: '✗ "Yes." / ✗ a 2-minute speech', note: l('too little / too much', 'খুব কম / খুব বেশি') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'speaking', example: 'Part 1: answer + reason + detail', note: l('The basic shape.', 'মূল গঠন।') },
        { skill: 'writing', example: 'Task 2 paragraphs use the same idea → reason → example shape.', note: l('Same thinking.', 'একই চিন্তা।') },
        { skill: 'listening', example: 'Listening for the question word (do / did / will) tells you the tense.', note: l('Hear the tense.', 'Tense শুনুন।') },
        { skill: 'reading', example: 'Reading short questions quickly — the same skill as understanding the examiner.', note: l('Understand the question.', 'প্রশ্ন বুঝুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: '"Yes." (and silence)', right: '"Yes, I do — mainly because…"', why: l('Extend with a reason.', 'কারণ দিয়ে বাড়ান।') },
        { wrong: '"Did you…?" → "Yes, I play…"', right: '"Yes, I played…"', why: l('Match the tense to the question.', 'প্রশ্নের সাথে tense মেলান।') },
        { wrong: 'A memorised paragraph about the topic', right: 'Two or three natural sentences', why: l('Answer the question asked.', 'যা জিজ্ঞেস করা হয় তার উত্তর।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('sp-2-p1', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('"Do you like reading?" Best answer?', '"Do you like reading?" সবচেয়ে ভালো উত্তর?'), options: ['Yes, I do, especially detective stories, because they keep me guessing.', 'Yes.', 'Reading is an important skill for all students in the modern world.'], answer: 'Yes, I do, especially detective stories, because they keep me guessing.', explanation: l('Answer + detail + reason.', 'উত্তর + detail + কারণ।'), why: { 'Yes.': l('Too short to show anything.', 'কিছু দেখানোর জন্য খুব ছোট।'), 'Reading is an important skill for all students in the modern world.': l('It sounds memorised and does not say whether you like it.', 'মুখস্থ শোনায়, আর আপনি পছন্দ করেন কি না বলে না।') } }),
        choice('sp-2-p2', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('Which phrase adds a reason?', 'কোন phrase কারণ যোগ করে?'), options: ['mainly because', 'for example', 'last week'], answer: 'mainly because', explanation: l('A reason.', 'কারণ।'), why: { 'for example': l('That adds an example.', 'ওটা উদাহরণ যোগ করে।'), 'last week': l('That adds a time detail.', 'ওটা সময়ের detail যোগ করে।') } }),
        choice('sp-2-p3', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('"Did you enjoy school?" Which answer matches the tense?', '"Did you enjoy school?" কোন উত্তর tense-এর সাথে মেলে?'), options: ['Yes, I enjoyed it, mostly because of my friends.', 'Yes, I enjoy it, mostly because of my friends.', 'Yes, I will enjoy it.'], answer: 'Yes, I enjoyed it, mostly because of my friends.', explanation: l('Did → past.', 'Did → past।'), why: { 'Yes, I enjoy it, mostly because of my friends.': l('The question is about the past.', 'প্রশ্নটা অতীত নিয়ে।'), 'Yes, I will enjoy it.': l('Future does not fit a past question.', 'Future অতীতের প্রশ্নে মানায় না।') } }),
        choice('sp-2-p4', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('"Do you live in a house or a flat?" Best answer?', '"Do you live in a house or a flat?" সবচেয়ে ভালো উত্তর?'), options: ['I live in a flat on the fourth floor, which is quite noisy but close to my university.', 'Flat.', 'Houses and flats both have advantages and disadvantages in society.'], answer: 'I live in a flat on the fourth floor, which is quite noisy but close to my university.', explanation: l('Direct answer + details.', 'সরাসরি উত্তর + detail।'), why: { 'Flat.': l('One word shows very little.', 'এক word খুব কম দেখায়।'), 'Houses and flats both have advantages and disadvantages in society.': l('It avoids the personal question.', 'ব্যক্তিগত প্রশ্ন এড়িয়ে যায়।') } }),
        choice('sp-2-p5', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('After a good 3-sentence Part 1 answer, what should you do?', '৩ sentence-এর ভালো Part 1 উত্তরের পরে কী করবেন?'), options: ['Stop and let the examiner ask the next question', 'Keep talking for two more minutes', 'Ask the examiner a question about the topic'], answer: 'Stop and let the examiner ask the next question', explanation: l('Part 1 is short answers.', 'Part 1 ছোট উত্তরের।'), why: { 'Keep talking for two more minutes': l('That is Part 2 length, not Part 1.', 'ওটা Part 2-এর দৈর্ঘ্য, Part 1-এর নয়।'), 'Ask the examiner a question about the topic': l('The examiner asks; you answer.', 'Examiner জিজ্ঞেস করেন; আপনি উত্তর দেন।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sp-2-r1', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'I like cooking, mainly ___ it helps me relax.', accepted: ['because'], explanation: l('because.', 'because।') }),
        gap('sp-2-r2', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('Write the past form of "go".', '"go"-এর past form লিখুন।'), sentence: '"Did you travel last year?" — "Yes, I ___ to Sylhet with my family."', accepted: ['went'], explanation: l('Did → past: went.', 'Did → past: went।') }),
        spot('sp-2-r3', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('One word breaks the tense. Tap it and fix it.', 'একটা word tense ভাঙছে। Tap করে ঠিক করুন।'), sentence: '"Did you like school?" — "Yes, I like it a lot."', wrong: 'like', accepted: ['liked'], explanation: l('Did → liked.', 'Did → liked।') }),
        correct('sp-2-r4', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('Extend the answer with a reason (start with "Yes, I do, because…").', 'কারণ দিয়ে উত্তরটা বাড়ান ("Yes, I do, because…" দিয়ে শুরু)।'), sentence: 'Yes.', accepted: ['Yes, I do, because it helps me relax.', 'Yes, I do, because it is relaxing.', "Yes, I do, because it's relaxing.", 'Yes, I do, because I enjoy it.'], explanation: l('Answer + reason.', 'উত্তর + কারণ।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sp-2-c1', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('Which extends an answer with an example?', 'কোনটা উদাহরণ দিয়ে উত্তর বাড়ায়?'), options: ['For example, last Friday I made biryani.', 'Because it is nice.', 'Yes.'], answer: 'For example, last Friday I made biryani.', explanation: l('A specific example.', 'নির্দিষ্ট উদাহরণ।') }),
        spot('sp-2-c2', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('One word is wrong for Part 1. Tap it, then fix it.', 'Part 1-এর জন্য একটা word ভুল। Tap করে ঠিক করুন।'), sentence: 'In Part 1, give memorised answers.', wrong: 'memorised', accepted: ['natural'], fixOptions: ['natural', 'written', 'silent'], explanation: l('Natural answers.', 'স্বাভাবিক উত্তর।') }),
        order('sp-2-c3', 'sp-part1', { ...P, pattern: 'sp-extend', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Answer, give a reason, then add a detail.', explanation: l('The Part 1 shape.', 'Part 1-এর গঠন।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: three Part 1 answers', 'এবার আপনার পালা: তিনটা Part 1 উত্তর'),
      exercises: [
        write('sp-2-y1', 'sp-part1', {
          ...P,
          prompt: l('Write what you would say (2–3 sentences each): "Do you work or are you a student?" · "What do you like doing at weekends?" · "Did you enjoy your childhood?"', 'আপনি যা বলবেন তা লিখুন (প্রতিটায় ২–৩ sentence): "Do you work or are you a student?" · "What do you like doing at weekends?" · "Did you enjoy your childhood?"'),
          model: 'I’m a student. I’m in my final year of a computer science degree in Dhaka. At weekends I usually play football with my friends, mainly because I sit at a desk all week. Yes, I really enjoyed my childhood — I grew up in a village, so I spent most of my time outdoors.',
          checklist: [l('a direct answer to each question', 'প্রতিটা প্রশ্নের সরাসরি উত্তর'), l('a reason or detail for each', 'প্রতিটায় কারণ বা detail'), l('the right tense for each question', 'প্রতিটা প্রশ্নের সঠিক tense')],
          explanation: l('Answer, extend, stop.', 'উত্তর, বিস্তার, থামা।'),
          task: 'The student writes what they would say to three IELTS Speaking Part 1 questions: "Do you work or are you a student?", "What do you like doing at weekends?" and "Did you enjoy your childhood?". Judge the answers as spoken answers first: each answers the question directly, is extended with a reason or detail (about 2–3 sentences, not one word and not a speech), sounds natural rather than memorised, and uses the tense of the question (present for "Do you…", past for "Did you…"). Then correct grammar only where it matters. Never give a band score.',
          target: l('Part 1: answer and extend', 'Part 1: উত্তর আর বিস্তার'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Answer → reason → detail; about 2–3 sentences.', 'উত্তর → কারণ → detail; প্রায় ২–৩ sentence।'),
        l('Match the tense of the question.', 'প্রশ্নের tense মেলান।'),
        l('Natural, not memorised; then stop.', 'স্বাভাবিক, মুখস্থ নয়; তারপর থামুন।'),
      ],
    },
  ],
};

// ======================================================================= sp-3
export const spPart2: Lesson = {
  id: 'sp-3',
  format: 'v2',
  concept: 'sp-part2',
  title: l('Part 2: the long turn', 'Part 2: long turn'),
  why: l('In Part 2 you speak alone for 1–2 minutes about a cue card, after 1 minute to prepare. Good notes and a simple order through the prompts keep you talking without a script.', 'Part 2-এ ১ মিনিট প্রস্তুতির পরে cue card নিয়ে একা ১–২ মিনিট বলেন। ভালো note আর prompt ধরে সহজ একটা ক্রম script ছাড়াই কথা চালিয়ে রাখে।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'speaking',
  steps: [
    {
      kind: 'hook',
      title: l('Forty seconds of silence', 'চল্লিশ সেকেন্ডের নীরবতা'),
      situation: l(`Cue card: "${CUE_PLACE}" Tahmina spends her minute writing full sentences about where the place is. She reads them out, then stops after 40 seconds with nothing left to say.`, `Cue card: "${CUE_PLACE}" Tahmina পুরো মিনিট জায়গাটা কোথায় তা নিয়ে পুরো sentence লেখেন। সেগুলো পড়ে শোনান, তারপর ৪০ সেকেন্ডে থেমে যান — বলার আর কিছু নেই।`),
      question: l('What should she do with the minute?', 'মিনিটটা দিয়ে তাঁর কী করা উচিত?'),
      options: ['Write short key words for every prompt, then speak through them in order', 'Write one perfect sentence', 'Use the minute to relax and write nothing'],
      answer: 'Write short key words for every prompt, then speak through them in order',
      diagnose: {
        'Write short key words for every prompt, then speak through them in order': l('Right. Key words for where, how often, what and why give her a route for the full 1–2 minutes.', 'ঠিক। কোথায়, কতবার, কী আর কেন — প্রতিটার key word পুরো ১–২ মিনিটের একটা পথ দেয়।'),
        'Write one perfect sentence': l('One sentence covers one prompt. She needs notes for all of them.', 'এক sentence একটা prompt ধরে। সবগুলোর জন্য note দরকার।'),
        'Use the minute to relax and write nothing': l('The minute is for planning; without notes it is easy to run out of ideas.', 'মিনিটটা plan-এর জন্য; note ছাড়া idea ফুরিয়ে যাওয়া সহজ।'),
      },
    },
    {
      kind: 'discover',
      title: l('From cue card to talk', 'Cue card থেকে কথা'),
      items: [
        { en: `Cue card: "${CUE_PLACE}"`, note: l('four prompts', 'চারটা prompt') },
        { en: 'Notes: Cox’s Bazar · twice a year · walk on beach, fresh fish · peaceful, family', note: l('key words, not sentences', 'key word, sentence নয়') },
        { en: 'Start: "I’d like to talk about Cox’s Bazar, which is…"', note: l('a clear opening', 'পরিষ্কার শুরু') },
        { en: 'The last prompt ("explain why") is the longest part', note: l('reasons and feelings', 'কারণ আর অনুভূতি') },
      ],
      question: l('What should your 1-minute notes look like?', 'আপনার ১ মিনিটের note কেমন হবে?'),
      options: [
        l('Key words for every prompt', 'প্রতিটা prompt-এর key word'),
        l('Full sentences for the first prompt', 'প্রথম prompt-এর পুরো sentence'),
        l('A list of difficult words', 'কঠিন word-এর তালিকা'),
      ],
      answer: 0,
      pattern: l('1 minute: key words for every prompt. Then speak through the prompts in order, spending most time on "explain why". Keep going until the examiner stops you.', '১ মিনিট: প্রতিটা prompt-এর key word। তারপর prompt ধরে ক্রমে বলুন, "explain why"-তে সবচেয়ে বেশি সময় দিন। Examiner না থামানো পর্যন্ত চালিয়ে যান।'),
    },
    {
      kind: 'concept',
      title: l('Plan, cover, extend', 'Plan, cover, বিস্তার'),
      body: l(
        'You get a cue card, 1 minute to prepare and then speak for 1–2 minutes.',
        'আপনি একটা cue card পাবেন, প্রস্তুতির জন্য ১ মিনিট তারপর ১–২ মিনিট বলবেন।',
      ),
      points: [
        l('Notes: two or three key words per prompt — never full sentences.', 'Note: প্রতিটা prompt-এ দুই-তিনটা key word — কখনো পুরো sentence নয়।'),
        l('Cover every prompt, in order, so the talk has a clear shape.', 'প্রতিটা prompt ক্রমে ধরুন, যাতে কথার পরিষ্কার একটা গঠন থাকে।'),
        l('Tense follows the card: "Describe a trip you took" → past; "a place you like to visit" → present habits.', 'Tense card অনুসারে: "Describe a trip you took" → past; "a place you like to visit" → বর্তমানের অভ্যাস।'),
        l('Keep talking until the examiner stops you; if you finish early, add another reason, a memory or a comparison.', 'Examiner না থামানো পর্যন্ত বলুন; আগে শেষ হলে আরেকটা কারণ, স্মৃতি বা তুলনা যোগ করুন।'),
        l('Common mix-up: using the minute to write a script. A script is too short, and reading it sounds unnatural.', 'সাধারণ ভুল: মিনিটটা দিয়ে script লেখা। Script খুব ছোট হয়, আর পড়লে অস্বাভাবিক শোনায়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Useful ways through a cue card', 'Cue card পার হওয়ার উপায়'),
      items: [
        { en: 'Opening: "I’d like to talk about…"', note: l('start clearly', 'পরিষ্কার শুরু') },
        { en: 'Moving on: "As for how often I go there, …"', note: l('link to the next prompt', 'পরের prompt-এ যাওয়া') },
        { en: 'The why: "The main reason I love it is… Another thing is…"', note: l('extend the reasons', 'কারণ বাড়ানো') },
        { en: 'If time is left: "I remember one visit when…"', note: l('a short story', 'ছোট একটা ঘটনা') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'speaking', example: 'Part 2: 1 minute to prepare, 1–2 minutes to speak', note: l('Notes + prompts.', 'Note + prompt।') },
        { skill: 'writing', example: 'Task 2 planning: key words per paragraph, not full sentences.', note: l('The same quick plan.', 'একই দ্রুত plan।') },
        { skill: 'reading', example: 'Scanning the cue card prompts is like scanning questions.', note: l('Find what you must cover.', 'কী ধরতে হবে খুঁজুন।') },
        { skill: 'listening', example: 'Part 2 of Listening is also a monologue — notice how speakers move between points.', note: l('Signposting.', 'দিকনির্দেশক।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Writing full sentences in the minute', right: 'Key words for every prompt', why: l('Notes, not a script.', 'Note, script নয়।') },
        { wrong: 'Stopping after 40 seconds', right: 'Add a reason, a memory or a comparison', why: l('Speak for 1–2 minutes.', '১–২ মিনিট বলুন।') },
        { wrong: '"Describe a trip you took" in the present tense', right: 'Past tense for a past event', why: l('Follow the card.', 'Card অনুসরণ করুন।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('sp-3-p1', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('How long do you prepare in Part 2?', 'Part 2-এ কতক্ষণ প্রস্তুতি নেন?'), options: ['1 minute', '5 minutes', 'No time'], answer: '1 minute', explanation: l('1 minute, then 1–2 minutes speaking.', '১ মিনিট, তারপর ১–২ মিনিট বলা।'), why: { '5 minutes': l('Only 1 minute is given.', 'শুধু ১ মিনিট দেওয়া হয়।'), 'No time': l('You get 1 minute to prepare.', 'প্রস্তুতির জন্য ১ মিনিট পান।') } }),
        choice('sp-3-p2', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('Best notes for "how often you go there"?', '"how often you go there"-এর সবচেয়ে ভালো note?'), options: ['twice a year · Eid holidays', 'I go there two times every year during the Eid holidays with my whole family.', 'frequency'], answer: 'twice a year · Eid holidays', explanation: l('Key words you can speak from.', 'যে key word থেকে বলা যায়।'), why: { 'I go there two times every year during the Eid holidays with my whole family.': l('A full sentence takes too long to write.', 'পুরো sentence লিখতে বেশি সময় লাগে।'), frequency: l('Too vague to help you speak.', 'বলতে সাহায্য করার মত নির্দিষ্ট নয়।') } }),
        choice('sp-3-p3', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('"Describe a trip you took recently." Which tense for most of the talk?', '"Describe a trip you took recently।" বেশিরভাগ কথায় কোন tense?'), options: ['Past simple', 'Future', 'Present continuous'], answer: 'Past simple', explanation: l('A finished past event.', 'শেষ হওয়া অতীতের ঘটনা।'), why: { Future: l('The trip already happened.', 'Trip ইতিমধ্যে হয়ে গেছে।'), 'Present continuous': l('The trip is not happening now.', 'Trip এখন হচ্ছে না।') } }),
        choice('sp-3-p4', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('You have covered every prompt after 1 minute. What now?', '১ মিনিটেই সব prompt বলা শেষ। এখন কী?'), options: ['Add another reason, a memory or a comparison', 'Stop and wait in silence', 'Start again from the first prompt word for word'], answer: 'Add another reason, a memory or a comparison', explanation: l('Keep going until stopped.', 'থামানো পর্যন্ত চালিয়ে যান।'), why: { 'Stop and wait in silence': l('You can speak for up to 2 minutes.', '২ মিনিট পর্যন্ত বলতে পারেন।'), 'Start again from the first prompt word for word': l('Repetition adds nothing new.', 'পুনরাবৃত্তি নতুন কিছু যোগ করে না।') } }),
        choice('sp-3-p5', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('Which prompt usually needs the most time?', 'কোন prompt-এ সাধারণত সবচেয়ে বেশি সময় লাগে?'), options: ['"and explain why…"', '"where it is"', '"when it was"'], answer: '"and explain why…"', explanation: l('Reasons and feelings can be extended.', 'কারণ আর অনুভূতি বাড়ানো যায়।'), why: { '"where it is"': l('A place needs only a sentence or two.', 'জায়গা এক-দুই sentence-এই হয়।'), '"when it was"': l('A time is short to say.', 'সময় বলা সংক্ষিপ্ত।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sp-3-r1', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('Write the numbers (e.g. 1–2).', 'সংখ্যাগুলো লিখুন (যেমন 1–2)।'), sentence: 'In Part 2 you speak for ___ minutes.', accepted: ['1–2', '1-2', 'one to two', '1 to 2', 'one or two'], explanation: l('1–2 minutes.', '১–২ মিনিট।') }),
        gap('sp-3-r2', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('Write two words.', 'দুটো word লিখুন।'), sentence: 'In the preparation minute, write ___ for every prompt.', accepted: ['key words', 'keywords', 'short notes', 'notes'], explanation: l('Key words.', 'Key word।') }),
        spot('sp-3-r3', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('One word breaks the tense. Tap it and fix it.', 'একটা word tense ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Last year I visit Sylhet with my cousins.', wrong: 'visit', accepted: ['visited'], explanation: l('Last year → past.', 'Last year → past।') }),
        correct('sp-3-r4', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('Correct the advice.', 'পরামর্শটা ঠিক করুন।'), sentence: 'Use the minute to write a full script and read it aloud.', accepted: ['Use the minute to write key words and speak from them.', 'Use the minute to write key words for every prompt.', 'Use the minute to write short notes and speak from them.'], explanation: l('Notes, not a script.', 'Note, script নয়।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sp-3-c1', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('Best opening for the place cue card?', 'জায়গার cue card-এর সবচেয়ে ভালো শুরু?'), options: ['I’d like to talk about Cox’s Bazar, which is on the south-east coast.', 'Place.', 'Tourism is an important industry in many countries.'], answer: 'I’d like to talk about Cox’s Bazar, which is on the south-east coast.', explanation: l('Clear and on the card.', 'পরিষ্কার আর card অনুযায়ী।') }),
        spot('sp-3-c2', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('One word makes this advice wrong. Tap it, then fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Skip the prompts you do not like.', wrong: 'Skip', accepted: ['Cover'], fixOptions: ['Cover', 'Read', 'Memorise'], explanation: l('Cover every prompt.', 'প্রতিটা prompt ধরুন।') }),
        order('sp-3-c3', 'sp-part2', { ...P, pattern: 'sp-long-turn', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Keep talking until the examiner stops you.', explanation: l('Use the full time.', 'পুরো সময় ব্যবহার করুন।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: notes and a start', 'এবার আপনার পালা: note আর শুরু'),
      exercises: [
        write('sp-3-y1', 'sp-part2', {
          ...P,
          prompt: l(`Cue card: "${CUE_PLACE}" Write your 1-minute notes (key words for every prompt), then the first 4–5 sentences you would say.`, `Cue card: "${CUE_PLACE}" আপনার ১ মিনিটের note লিখুন (প্রতিটা prompt-এর key word), তারপর প্রথম ৪–৫টা sentence যা বলবেন।`),
          model: 'Notes: Cox’s Bazar · twice a year · beach walks, fresh fish · peaceful, family time. I’d like to talk about Cox’s Bazar, which is on the south-east coast of Bangladesh. I usually go there twice a year, mostly during the Eid holidays. When I’m there, I walk along the beach early in the morning and eat fresh fish in the evening. The main reason I love it is that it’s so peaceful compared with Dhaka.',
          checklist: [l('key words for all four prompts', 'চারটা prompt-এর key word'), l('a clear opening', 'পরিষ্কার শুরু'), l('natural spoken sentences in the right tense', 'সঠিক tense-এ স্বাভাবিক কথ্য sentence')],
          explanation: l('Notes give you a route.', 'Note একটা পথ দেয়।'),
          task: `The student writes Part 2 preparation notes and the first sentences of a talk for this cue card: "${CUE_PLACE}". Judge the Part 2 skills first: short key-word notes (not full sentences) covering every prompt (where, how often, what, why); a clear opening; the talk moves through the prompts in order; natural spoken language (contractions are fine, no memorised-sounding phrases); present tense for habits. Then correct grammar only where it matters. Never give a band score.`,
          target: l('Part 2: the long turn', 'Part 2: long turn'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('1 minute: key words for every prompt.', '১ মিনিট: প্রতিটা prompt-এর key word।'),
        l('Speak through the prompts in order for 1–2 minutes.', 'Prompt ধরে ক্রমে ১–২ মিনিট বলুন।'),
        l('Finished early? A reason, a memory or a comparison.', 'আগে শেষ? একটা কারণ, স্মৃতি বা তুলনা।'),
      ],
    },
  ],
};

// ======================================================================= sp-4
export const spPart3: Lesson = {
  id: 'sp-4',
  format: 'v2',
  concept: 'sp-part3',
  title: l('Part 3: opinions, comparing, speculating', 'Part 3: মতামত, তুলনা, অনুমান'),
  why: l('Part 3 moves from your life to wider questions about society. The examiner wants opinions with reasons, comparisons and ideas about the future — not personal stories only.', 'Part 3 আপনার জীবন থেকে সমাজ নিয়ে বড় প্রশ্নে যায়। Examiner কারণসহ মতামত, তুলনা আর ভবিষ্যৎ নিয়ে ধারণা চান — শুধু ব্যক্তিগত গল্প নয়।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'speaking',
  steps: [
    {
      kind: 'hook',
      title: l('A personal answer to a general question', 'সাধারণ প্রশ্নে ব্যক্তিগত উত্তর'),
      situation: l('Examiner: "Why do many young people move from villages to cities?" Nabil: "I like my village. My grandmother lives there."', 'Examiner: "Why do many young people move from villages to cities?" Nabil: "I like my village. My grandmother lives there."'),
      question: l('What is the problem?', 'সমস্যা কী?'),
      options: ['He answers about himself, not about young people in general', 'His grammar is wrong', 'He should have said more about his grandmother'],
      answer: 'He answers about himself, not about young people in general',
      diagnose: {
        'He answers about himself, not about young people in general': l('Right. Part 3 asks about people and society: "I think the main reason is jobs — most well-paid work is in cities…"', 'ঠিক। Part 3 মানুষ আর সমাজ নিয়ে জিজ্ঞেস করে: "I think the main reason is jobs — most well-paid work is in cities…"'),
        'His grammar is wrong': l('The grammar is fine; the answer does not address the question.', 'Grammar ঠিক আছে; উত্তর প্রশ্নটা ধরে না।'),
        'He should have said more about his grandmother': l('More personal detail moves further from the general question.', 'আরও ব্যক্তিগত detail সাধারণ প্রশ্ন থেকে আরও দূরে নেয়।'),
      },
    },
    {
      kind: 'discover',
      title: l('Three Part 3 moves', 'Part 3-এর তিনটা কৌশল'),
      items: [
        { en: 'Opinion + reason: "I think the main reason is jobs, because most well-paid work is in cities."', note: l('a position with a why', 'কারণসহ অবস্থান') },
        { en: 'Comparing: "Compared with the past, far more young people study in cities now."', note: l('then vs now, here vs there', 'তখন বনাম এখন, এখানে বনাম ওখানে') },
        { en: 'Speculating: "In the future, it’s likely that more people will work from home."', note: l('likely / might / I’d imagine', 'likely / might / I’d imagine') },
        { en: 'Balance: "Having said that, some people return because life is cheaper."', note: l('another side', 'অন্য দিক') },
      ],
      question: l('Which phrase speculates about the future?', 'কোন phrase ভবিষ্যৎ নিয়ে অনুমান করে?'),
      options: [
        l('It’s likely that…', 'It’s likely that…'),
        l('When I was a child…', 'When I was a child…'),
        l('My favourite is…', 'My favourite is…'),
      ],
      answer: 0,
      pattern: l('Part 3: give an opinion with a reason, compare (past / present, places, groups), and speculate (likely, might, I’d imagine). Talk about people in general.', 'Part 3: কারণসহ মতামত দিন, তুলনা করুন (অতীত / বর্তমান, জায়গা, দল), আর অনুমান করুন (likely, might, I’d imagine)। সাধারণভাবে মানুষ নিয়ে বলুন।'),
    },
    {
      kind: 'concept',
      title: l('Wider, deeper, balanced', 'বড়, গভীর, ভারসাম্যপূর্ণ'),
      body: l(
        'Part 3 lasts 4–5 minutes and is linked to the Part 2 topic. Answers are longer than in Part 1 and more general.',
        'Part 3 ৪–৫ মিনিটের, Part 2-এর বিষয়ের সাথে যুক্ত। উত্তর Part 1-এর চেয়ে লম্বা আর বেশি সাধারণ।',
      ),
      points: [
        l('Answer about people and society (young people, many families, in Bangladesh), not only yourself.', 'মানুষ আর সমাজ নিয়ে বলুন (young people, many families, in Bangladesh), শুধু নিজেকে নিয়ে নয়।'),
        l('Opinion + reason + example: "I’d say…, mainly because…, for instance…"', 'মতামত + কারণ + উদাহরণ: "I’d say…, mainly because…, for instance…"'),
        l('Compare: "compared with…", "far more / less … than…", "whereas…".', 'তুলনা: "compared with…", "far more / less … than…", "whereas…"।'),
        l('Speculate: "it’s likely that…", "people might…", "I’d imagine that…".', 'অনুমান: "it’s likely that…", "people might…", "I’d imagine that…"।'),
        l('Common mix-up: thinking there is a "right" opinion. Any reasonable view is fine — the examiner marks how you express it, not what you believe.', 'সাধারণ ভুল: একটা "সঠিক" মত আছে ভাবা। যেকোনো যুক্তিসঙ্গত মত চলে — examiner মার্ক করেন আপনি কীভাবে বলছেন, কী বিশ্বাস করেন তা নয়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Building a Part 3 answer', 'Part 3 উত্তর গড়া'),
      items: [
        { en: 'Question: "Is it better to live in a city or the countryside?"', note: l('a general question', 'সাধারণ প্রশ্ন') },
        { en: '"I’d say it depends on your age. For young people, cities offer far more jobs and courses…"', note: l('opinion + reason', 'মতামত + কারণ') },
        { en: '"…whereas older people often prefer the countryside because it’s quieter and cheaper."', note: l('comparison', 'তুলনা') },
        { en: '"In the future, I’d imagine more people will live in villages and work online."', note: l('speculation', 'অনুমান') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'speaking', example: 'Part 3: opinion + reason, comparing, speculating', note: l('Deeper answers.', 'গভীর উত্তর।') },
        { skill: 'writing', example: 'Task 2 uses the same opinions, reasons and balance in writing.', note: l('Shared thinking.', 'একই চিন্তা।') },
        { skill: 'listening', example: 'Listening Part 3 speakers agree, disagree and compare in the same way.', note: l('Recognise the moves.', 'কৌশলগুলো চিনুন।') },
        { skill: 'reading', example: 'Yes / No / Not Given checks writers’ opinions — like the ones you give here.', note: l('Opinion language.', 'মতামতের ভাষা।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Answering a general question with only your own life', right: 'Talk about people in general, then add your experience', why: l('Part 3 is wider.', 'Part 3 বড় পরিসরের।') },
        { wrong: '"Yes, I agree." (and stop)', right: 'Opinion + reason + example', why: l('Develop the idea.', 'Idea বাড়ান।') },
        { wrong: '"In the future, people will surely…" for everything', right: '"It’s likely…", "people might…"', why: l('Speculation is uncertain.', 'অনুমান অনিশ্চিত।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('sp-4-p1', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('"Why do people enjoy travelling?" Best start?', '"Why do people enjoy travelling?" সবচেয়ে ভালো শুরু?'), options: ['I think the main reason is that people want a break from their daily routine.', 'I went to Sylhet last year.', 'Yes.'], answer: 'I think the main reason is that people want a break from their daily routine.', explanation: l('A general opinion with a reason.', 'কারণসহ সাধারণ মতামত।'), why: { 'I went to Sylhet last year.': l('A personal story, not about people in general.', 'ব্যক্তিগত গল্প, সাধারণ মানুষ নিয়ে নয়।'), 'Yes.': l('The question is "why", not yes / no.', 'প্রশ্ন "why", yes / no নয়।') } }),
        choice('sp-4-p2', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('Which sentence compares?', 'কোন sentence তুলনা করে?'), options: ['Compared with my parents’ generation, young people travel far more now.', 'Travelling is fun.', 'I might travel next year.'], answer: 'Compared with my parents’ generation, young people travel far more now.', explanation: l('Then vs now.', 'তখন বনাম এখন।'), why: { 'Travelling is fun.': l('An opinion, but no comparison.', 'মতামত, কিন্তু তুলনা নেই।'), 'I might travel next year.': l('A personal plan, not a comparison.', 'ব্যক্তিগত plan, তুলনা নয়।') } }),
        choice('sp-4-p3', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('Which sentence speculates?', 'কোন sentence অনুমান করে?'), options: ['It’s likely that more people will travel by train in the future.', 'Trains were slow in the past.', 'I like trains.'], answer: 'It’s likely that more people will travel by train in the future.', explanation: l('"It’s likely that…" + future.', '"It’s likely that…" + future।'), why: { 'Trains were slow in the past.': l('A statement about the past.', 'অতীত নিয়ে বক্তব্য।'), 'I like trains.': l('A personal preference.', 'ব্যক্তিগত পছন্দ।') } }),
        choice('sp-4-p4', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('Is there a "correct" opinion in Part 3?', 'Part 3-এ কি একটা "সঠিক" মত আছে?'), options: ['No — any reasonable view, explained well', 'Yes — agree with the examiner', 'Yes — always disagree to show confidence'], answer: 'No — any reasonable view, explained well', explanation: l('How you say it is marked.', 'কীভাবে বলছেন তা মার্ক হয়।'), why: { 'Yes — agree with the examiner': l('The examiner does not give views to agree with.', 'Examiner একমত হওয়ার মত মত দেন না।'), 'Yes — always disagree to show confidence': l('Disagreeing is not marked higher.', 'দ্বিমত করলে বেশি নম্বর নয়।') } }),
        choice('sp-4-p5', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('Which phrase adds a balancing point?', 'কোন phrase ভারসাম্যের কথা যোগ করে?'), options: ['Having said that,', 'For example,', 'In my village,'], answer: 'Having said that,', explanation: l('Introduces the other side.', 'অন্য দিকটা আনে।'), why: { 'For example,': l('That adds an example.', 'ওটা উদাহরণ যোগ করে।'), 'In my village,': l('That makes it personal.', 'ওটা ব্যক্তিগত করে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sp-4-r1', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: '___ with the past, more people work in offices now.', accepted: ['Compared'], explanation: l('Compared with…', 'Compared with…') }),
        gap('sp-4-r2', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'It’s ___ that more people will shop online in the future.', accepted: ['likely', 'possible', 'probable'], explanation: l('It’s likely that…', 'It’s likely that…') }),
        spot('sp-4-r3', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('One word is too certain for a guess about the future. Tap it and fix it.', 'ভবিষ্যৎ অনুমানের জন্য একটা word বেশি নিশ্চিত। Tap করে ঠিক করুন।'), sentence: 'In twenty years, people definitely will stop using cash.', wrong: 'definitely', accepted: ['probably', 'possibly'], explanation: l('Speculation: probably / might.', 'অনুমান: probably / might।') }),
        correct('sp-4-r4', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('Make it general (start with "Many young people…").', 'সাধারণ করুন ("Many young people…" দিয়ে শুরু)।'), sentence: 'I moved to Dhaka because I wanted a job.', accepted: ['Many young people move to Dhaka because they want jobs.', 'Many young people move to Dhaka because they want a job.', 'Many young people move to cities because they want jobs.'], explanation: l('About people in general.', 'সাধারণ মানুষ নিয়ে।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sp-4-c1', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('What is Part 3 linked to?', 'Part 3 কীসের সাথে যুক্ত?'), options: ['The Part 2 topic', 'Part 1 questions', 'The Writing test'], answer: 'The Part 2 topic', explanation: l('A deeper discussion of it.', 'এর গভীর আলোচনা।') }),
        spot('sp-4-c2', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('One word makes this advice wrong. Tap it, then fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'In Part 3, avoid giving reasons for your opinions.', wrong: 'avoid', accepted: ['try'], fixOptions: ['try', 'stop', 'forget'], explanation: l('Opinion + reason: "try giving reasons".', 'মতামত + কারণ।') }),
        order('sp-4-c3', 'sp-part3', { ...P, pattern: 'sp-discussion', prompt: l('Build the answer start.', 'উত্তরের শুরুটা সাজান।'), answer: 'I think the main reason is money.', explanation: l('Opinion + reason.', 'মতামত + কারণ।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Part 3 answer', 'এবার আপনার পালা: একটা Part 3 উত্তর'),
      exercises: [
        write('sp-4-y1', 'sp-part3', {
          ...P,
          prompt: l('Write what you would say (4–5 sentences): "Why do many young people move from villages to cities, and do you think this will change in the future?"', 'আপনি যা বলবেন তা লিখুন (৪–৫ sentence): "Why do many young people move from villages to cities, and do you think this will change in the future?"'),
          model: 'I think the main reason is jobs, because most well-paid work is in cities like Dhaka and Chattogram. Compared with the past, far more young people also go to university, and most universities are in cities. Having said that, city life is expensive, so some people return home. In the future, I’d imagine this might change a little, because more people can work online from their villages.',
          checklist: [l('an opinion about people in general, with a reason', 'সাধারণ মানুষ নিয়ে কারণসহ মতামত'), l('a comparison', 'একটা তুলনা'), l('a speculation about the future', 'ভবিষ্যৎ নিয়ে একটা অনুমান')],
          explanation: l('Wider, deeper, balanced.', 'বড়, গভীর, ভারসাম্যপূর্ণ।'),
          task: 'The student writes what they would say to a two-part IELTS Speaking Part 3 question: "Why do many young people move from villages to cities, and do you think this will change in the future?". Judge the Part 3 skills first: both parts of the question are answered; the answer is about people in general, not only the student; an opinion with a reason; at least one comparison; a speculation about the future using tentative language (likely, might, I’d imagine) rather than certainty; natural spoken style. Any reasonable opinion is fine. Then correct grammar only where it matters. Never give a band score.',
          target: l('Part 3: opinions, comparing, speculating', 'Part 3: মতামত, তুলনা, অনুমান'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('People in general, not only you.', 'শুধু আপনি নন, সাধারণ মানুষ।'),
        l('Opinion + reason; compare; speculate with likely / might.', 'মতামত + কারণ; তুলনা; likely / might দিয়ে অনুমান।'),
        l('No "right" opinion — explain yours well.', '"সঠিক" মত নেই — নিজেরটা ভালোভাবে বোঝান।'),
      ],
    },
  ],
};

// ======================================================================= sp-5
export const spFluency: Lesson = {
  id: 'sp-5',
  format: 'v2',
  concept: 'sp-fluency',
  title: l('Fluency and natural spoken language', 'Fluency আর স্বাভাবিক কথ্য ভাষা'),
  why: l('Fluency is keeping going at a natural pace, not speaking fast or never pausing. Natural spoken phrases, a few ways to gain thinking time and quick self-correction matter more than rare idioms or written-style linkers.', 'Fluency মানে স্বাভাবিক গতিতে চালিয়ে যাওয়া, দ্রুত বলা বা কখনো না থামা নয়। স্বাভাবিক কথ্য phrase, ভাবার সময় নেওয়ার কয়েকটা উপায় আর দ্রুত নিজেকে শুধরে নেওয়া — বিরল idiom বা লেখার ধরনের linker-এর চেয়ে বেশি গুরুত্বপূর্ণ।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'speaking',
  steps: [
    {
      kind: 'hook',
      title: l('Sounding like an essay', 'Essay-র মত শোনানো'),
      situation: l('Examiner: "Do you like your neighbourhood?" Farhan: "Firstly, my neighbourhood is advantageous. Moreover, it is raining cats and dogs there. Furthermore, in conclusion, I like it."', 'Examiner: "Do you like your neighbourhood?" Farhan: "Firstly, my neighbourhood is advantageous. Moreover, it is raining cats and dogs there. Furthermore, in conclusion, I like it."'),
      question: l('What is wrong?', 'কী ভুল?'),
      options: ['Written-style linkers and a forced idiom that does not fit', 'He needs more linkers', 'He should speak faster'],
      answer: 'Written-style linkers and a forced idiom that does not fit',
      diagnose: {
        'Written-style linkers and a forced idiom that does not fit': l('Right. "Yeah, I do — it’s quiet and there’s a big park nearby" is natural. "Raining cats and dogs" is about heavy rain, not a neighbourhood.', 'ঠিক। "Yeah, I do — it’s quiet and there’s a big park nearby" স্বাভাবিক। "Raining cats and dogs" মানে প্রবল বৃষ্টি, পাড়া নয়।'),
        'He needs more linkers': l('He already sounds like an essay; speech needs fewer, simpler links.', 'তিনি ইতিমধ্যে essay-র মত শোনান; কথায় কম, সহজ link লাগে।'),
        'He should speak faster': l('Speed is not fluency. The language is the problem.', 'গতি fluency নয়। সমস্যা ভাষায়।'),
      },
    },
    {
      kind: 'discover',
      title: l('Natural speech tools', 'স্বাভাবিক কথার উপকরণ'),
      items: [
        { en: 'Thinking time: "That’s an interesting question…", "Let me think…", "Well, …"', note: l('instead of silence', 'নীরবতার বদলে') },
        { en: 'Spoken links: "and", "but", "so", "because", "actually", "I mean"', note: l('not "Moreover / Furthermore"', '"Moreover / Furthermore" নয়') },
        { en: 'Self-correction: "I go — I mean, I went there last year."', note: l('quick and natural', 'দ্রুত আর স্বাভাবিক') },
        { en: 'Natural phrases: "to be honest", "it depends", "a bit", "quite"', note: l('not forced idioms', 'জোর করা idiom নয়') },
      ],
      question: l('What is a good way to gain a few seconds?', 'কয়েক সেকেন্ড সময় পাওয়ার ভালো উপায় কী?'),
      options: [
        l('"That’s an interesting question — let me think."', '"That’s an interesting question — let me think।"'),
        l('Silence for ten seconds', 'দশ সেকেন্ড নীরবতা'),
        l('Repeating "Moreover" several times', 'কয়েকবার "Moreover" বলা'),
      ],
      answer: 0,
      pattern: l('Keep going at a natural pace: short thinking phrases instead of long silence, spoken links (and, but, so, because), quick self-correction, and natural phrases rather than forced idioms.', 'স্বাভাবিক গতিতে চালিয়ে যান: লম্বা নীরবতার বদলে ছোট ভাবার phrase, কথ্য link (and, but, so, because), দ্রুত নিজেকে শুধরানো, আর জোর করা idiom-এর বদলে স্বাভাবিক phrase।'),
    },
    {
      kind: 'concept',
      title: l('Fluent is not fast', 'Fluent মানে দ্রুত নয়'),
      body: l(
        'Fluency & Coherence rewards speech that keeps going and connects, at a pace the listener can follow. Short natural pauses are normal.',
        'Fluency & Coherence এমন কথাকে পুরস্কৃত করে যা চালিয়ে যায় আর যুক্ত থাকে, শ্রোতা অনুসরণ করতে পারেন এমন গতিতে। ছোট স্বাভাবিক বিরতি স্বাভাবিক।',
      ),
      points: [
        l('Long silences and many restarts break fluency; short pauses and thinking phrases do not.', 'লম্বা নীরবতা আর বারবার নতুন করে শুরু fluency ভাঙে; ছোট বিরতি আর ভাবার phrase নয়।'),
        l('Link ideas with simple spoken connectors: and, but, so, because, actually, I mean.', 'সহজ কথ্য connector দিয়ে idea জুড়ুন: and, but, so, because, actually, I mean।'),
        l('Correct yourself quickly and move on: "…he go — he goes…". Do not stop to apologise.', 'দ্রুত নিজেকে শুধরে এগিয়ে যান: "…he go — he goes…"। ক্ষমা চাইতে থামবেন না।'),
        l('In Speaking, natural spoken phrasing is better than written style; idioms only when they fit exactly.', 'Speaking-এ লেখার ধরনের চেয়ে স্বাভাবিক কথ্য ভঙ্গি ভালো; idiom শুধু একদম মানালে।'),
        l('Common mix-up: "fluent means fast, with no pauses". Speaking very fast often makes you harder to understand.', 'সাধারণ ভুল: "fluent মানে দ্রুত, বিরতি ছাড়া"। খুব দ্রুত বললে প্রায়ই বোঝা কঠিন হয়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Written vs spoken', 'লেখ্য বনাম কথ্য'),
      items: [
        { en: '✗ "Moreover, it is advantageous." → ✓ "And it’s really convenient, too."', note: l('spoken register', 'কথ্য ভঙ্গি') },
        { en: '✗ (10 seconds of silence) → ✓ "Hmm, that’s a tricky one. I suppose…"', note: l('thinking time', 'ভাবার সময়') },
        { en: '✗ "Sorry, sorry, my English is bad…" → ✓ "I mean…" and continue', note: l('self-correction', 'নিজেকে শুধরানো') },
        { en: '✗ "It’s raining cats and dogs in my neighbourhood" (meaning it is busy) → ✓ "It’s really busy"', note: l('no forced idioms', 'জোর করা idiom নয়') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'speaking', example: 'Fluency & Coherence in all three parts', note: l('Keep going, connect.', 'চালিয়ে যান, জুড়ুন।') },
        { skill: 'writing', example: 'Writing is the opposite: more formal links fit an essay.', note: l('Register differs.', 'ভঙ্গি আলাদা।') },
        { skill: 'listening', example: 'Listening recordings use the same spoken phrases ("I mean", "actually").', note: l('Hear natural speech.', 'স্বাভাবিক কথা শুনুন।') },
        { skill: 'reading', example: 'Reading helps you notice which phrases are formal and which are spoken.', note: l('Notice register.', 'ভঙ্গি খেয়াল করুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: '"Firstly… Moreover… In conclusion…" in Part 1', right: '"and", "but", "so", "because"', why: l('Speech, not an essay.', 'কথা, essay নয়।') },
        { wrong: 'Long silence while thinking', right: '"Let me think…", "Well, I suppose…"', why: l('Keep the talk going.', 'কথা চালিয়ে রাখুন।') },
        { wrong: 'A memorised idiom that does not fit', right: 'A simple, precise phrase', why: l('Natural beats decorated.', 'সাজানোর চেয়ে স্বাভাবিক ভালো।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('sp-5-p1', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Most natural in Part 1?', 'Part 1-এ সবচেয়ে স্বাভাবিক?'), options: ['Yeah, I do, because it’s really quiet.', 'Moreover, it is advantageous.', 'In conclusion, yes.'], answer: 'Yeah, I do, because it’s really quiet.', explanation: l('Spoken, simple, natural.', 'কথ্য, সহজ, স্বাভাবিক।'), why: { 'Moreover, it is advantageous.': l('Essay language in a conversation.', 'কথোপকথনে essay-র ভাষা।'), 'In conclusion, yes.': l('"In conclusion" belongs in writing.', '"In conclusion" লেখার জন্য।') } }),
        choice('sp-5-p2', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('You need a moment to think. Best?', 'ভাবার জন্য একটু সময় দরকার। সবচেয়ে ভালো?'), options: ['That’s a good question — let me think.', '(stay silent for ten seconds)', 'I don’t know.'], answer: 'That’s a good question — let me think.', explanation: l('Natural thinking time.', 'স্বাভাবিক ভাবার সময়।'), why: { '(stay silent for ten seconds)': l('Long silence breaks fluency.', 'লম্বা নীরবতা fluency ভাঙে।'), 'I don’t know.': l('It ends the answer without trying.', 'চেষ্টা ছাড়াই উত্তর শেষ করে।') } }),
        choice('sp-5-p3', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('You say "Yesterday I go…". Best self-correction?', 'আপনি বললেন "Yesterday I go…"। সবচেয়ে ভালো শোধরানো?'), options: ['Yesterday I go — I mean, I went to the market.', 'Sorry, sorry, my grammar is very bad.', 'Stop and start the whole answer again.'], answer: 'Yesterday I go — I mean, I went to the market.', explanation: l('Quick, then continue.', 'দ্রুত, তারপর চালিয়ে যাওয়া।'), why: { 'Sorry, sorry, my grammar is very bad.': l('Apologising breaks the flow.', 'ক্ষমা চাওয়া প্রবাহ ভাঙে।'), 'Stop and start the whole answer again.': l('Restarts hurt fluency.', 'নতুন করে শুরু fluency-র ক্ষতি করে।') } }),
        choice('sp-5-p4', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('What does fluency mean in IELTS?', 'IELTS-এ fluency মানে কী?'), options: ['Keeping going at a natural pace, with connected ideas', 'Speaking as fast as possible', 'Never pausing at all'], answer: 'Keeping going at a natural pace, with connected ideas', explanation: l('Natural pace, connected.', 'স্বাভাবিক গতি, যুক্ত।'), why: { 'Speaking as fast as possible': l('Very fast speech is often harder to understand.', 'খুব দ্রুত কথা প্রায়ই বোঝা কঠিন।'), 'Never pausing at all': l('Short pauses are natural.', 'ছোট বিরতি স্বাভাবিক।') } }),
        choice('sp-5-p5', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('When should you use an idiom?', 'কখন idiom ব্যবহার করবেন?'), options: ['Only when it fits the meaning exactly and sounds natural', 'In every answer, to impress', 'Never — idioms are banned'], answer: 'Only when it fits the meaning exactly and sounds natural', explanation: l('Natural, precise language.', 'স্বাভাবিক, নির্ভুল ভাষা।'), why: { 'In every answer, to impress': l('Forced idioms sound memorised.', 'জোর করা idiom মুখস্থ শোনায়।'), 'Never — idioms are banned': l('They are fine when natural.', 'স্বাভাবিক হলে ঠিক আছে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sp-5-r1', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Write one word.', 'একটা word লিখুন।'), sentence: 'That’s an interesting question — let me ___.', accepted: ['think', 'see'], explanation: l('let me think / see.', 'let me think / see।') }),
        gap('sp-5-r2', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Write two words for a quick self-correction.', 'দ্রুত শোধরানোর জন্য দুটো word লিখুন।'), sentence: 'She live — ___, she lives in Khulna.', accepted: ['I mean', 'sorry I mean'], explanation: l('"I mean".', '"I mean"।') }),
        spot('sp-5-r3', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('One word sounds like an essay. Tap it and fix it.', 'একটা word essay-র মত শোনায়। Tap করে ঠিক করুন।'), sentence: 'I love my town, and furthermore the food is great.', wrong: 'furthermore', accepted: ['also'], explanation: l('Spoken: "and also…".', 'কথ্য: "and also…"।') }),
        correct('sp-5-r4', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Make it natural spoken English.', 'স্বাভাবিক কথ্য English করুন।'), sentence: 'In conclusion, I am fond of cricket due to the fact that it is exciting.', accepted: ['I really like cricket because it’s exciting.', "I really like cricket because it's exciting.", 'I love cricket because it’s exciting.', "I love cricket because it's exciting.", 'I like cricket because it’s exciting.', "I like cricket because it's exciting."], explanation: l('Simple and spoken.', 'সহজ আর কথ্য।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sp-5-c1', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Which is a spoken linker?', 'কোনটা কথ্য linker?'), options: ['actually', 'furthermore', 'hence'], answer: 'actually', explanation: l('Common in speech.', 'কথায় প্রচলিত।') }),
        spot('sp-5-c2', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('One word makes this advice wrong. Tap it, then fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'Fluent speakers talk as fast as possible.', wrong: 'fast', accepted: ['naturally'], fixOptions: ['naturally', 'loudly', 'formally'], explanation: l('A natural pace.', 'স্বাভাবিক গতি।') }),
        order('sp-5-c3', 'sp-fluency', { ...P, pattern: 'sp-natural', prompt: l('Build the phrase.', 'Phrase-টা সাজান।'), answer: 'That is a good question, let me think.', explanation: l('Thinking time.', 'ভাবার সময়।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: make it sound spoken', 'এবার আপনার পালা: কথ্য করে তুলুন'),
      exercises: [
        write('sp-5-y1', 'sp-fluency', {
          ...P,
          prompt: l('Rewrite this Part 1 answer so it sounds natural and spoken: "Firstly, my hometown is advantageous. Moreover, it is a piece of cake to find food. Furthermore, in conclusion, I am fond of it."', 'এই Part 1 উত্তরটা স্বাভাবিক কথ্য করে আবার লিখুন: "Firstly, my hometown is advantageous. Moreover, it is a piece of cake to find food. Furthermore, in conclusion, I am fond of it."'),
          model: 'Yeah, I really like my hometown. It’s quite small, but there’s great street food everywhere, so you never go hungry. And my family and old friends still live there, which makes it feel like home.',
          checklist: [l('simple spoken links (and, but, so)', 'সহজ কথ্য link (and, but, so)'), l('no forced idioms or essay words', 'জোর করা idiom বা essay-র word নয়'), l('a reason and a detail', 'কারণ আর detail')],
          explanation: l('Speak, do not recite.', 'বলুন, আবৃত্তি নয়।'),
          task: 'The student rewrites an essay-style IELTS Speaking Part 1 answer about their hometown so that it sounds natural and spoken. Judge the spoken style first: essay linkers (Firstly, Moreover, Furthermore, In conclusion) replaced with simple spoken links (and, but, so, because); forced or wrongly used idioms ("a piece of cake", "advantageous") replaced with natural, precise phrases; contractions are fine; the answer still answers the question with a reason and a detail. Then correct grammar only where it matters. Never give a band score.',
          target: l('Fluency and natural spoken language', 'Fluency আর স্বাভাবিক কথ্য ভাষা'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Fluent = natural pace and connected, not fast.', 'Fluent = স্বাভাবিক গতি আর যুক্ত, দ্রুত নয়।'),
        l('Thinking phrases instead of silence; "I mean" to self-correct.', 'নীরবতার বদলে ভাবার phrase; শুধরাতে "I mean"।'),
        l('Spoken links and natural phrases, not essay words or forced idioms.', 'Essay-র word বা জোর করা idiom নয়, কথ্য link আর স্বাভাবিক phrase।'),
      ],
    },
  ],
};

// ======================================================================= sp-6
export const spPronunciation: Lesson = {
  id: 'sp-6',
  format: 'v2',
  concept: 'sp-pron',
  title: l('Pronunciation: being easy to understand', 'Pronunciation: সহজে বোঝা যাওয়া'),
  why: l('Pronunciation is marked on how easy you are to understand — word stress, sentence stress, intonation and clear sounds — not on sounding British or American. A few habits make a big difference.', 'Pronunciation মার্ক হয় আপনাকে কত সহজে বোঝা যায় তা দেখে — word stress, sentence stress, intonation আর পরিষ্কার ধ্বনি — British বা American শোনানো নয়। কয়েকটা অভ্যাস বড় পার্থক্য আনে।'),
  minutes: 11,
  difficulty: 'hard',
  skill: 'speaking',
  steps: [
    {
      kind: 'hook',
      title: l('Clear words, confusing stress', 'পরিষ্কার word, বিভ্রান্তিকর stress'),
      situation: l('Mehedi says "PHO-to-gra-phy is my hobby" and "I ischool every day". The examiner has to guess what he means twice.', 'Mehedi বলেন "PHO-to-gra-phy is my hobby" আর "I ischool every day"। Examiner-কে দুবার আন্দাজ করতে হয় তিনি কী বলছেন।'),
      question: l('What would make him easier to understand?', 'কী করলে তাঁকে সহজে বোঝা যেত?'),
      options: ['Correct word stress (pho-TO-gra-phy) and no extra vowel before "school"', 'A British accent', 'Speaking louder'],
      answer: 'Correct word stress (pho-TO-gra-phy) and no extra vowel before "school"',
      diagnose: {
        'Correct word stress (pho-TO-gra-phy) and no extra vowel before "school"': l('Right. Stress in the right place and clear consonant groups make words easy to recognise.', 'ঠিক। সঠিক জায়গায় stress আর পরিষ্কার consonant-গুচ্ছ word চিনতে সহজ করে।'),
        'A British accent': l('Accent is not marked. Clarity is.', 'Accent মার্ক হয় না। স্পষ্টতা হয়।'),
        'Speaking louder': l('Volume does not fix the wrong stress or an extra sound.', 'জোরে বললে ভুল stress বা বাড়তি ধ্বনি ঠিক হয় না।'),
      },
    },
    {
      kind: 'discover',
      title: l('What makes speech clear', 'কথা কী করে পরিষ্কার হয়'),
      items: [
        { en: 'Word stress: PHO-to-graph · pho-TO-gra-phy · en-VI-ron-ment · e-CO-no-my', note: l('the stress can move', 'stress সরে যেতে পারে') },
        { en: 'Sentence stress: "I LOVE my JOB, but the HOURS are LONG."', note: l('stress the key words', 'মূল word-এ জোর') },
        { en: 'Clear endings: walked /t/ · played /d/ · wanted /ɪd/ · books /s/', note: l('-ed and -s carry meaning', '-ed আর -s অর্থ বহন করে') },
        { en: 'Consonant groups: "school", "street", "speak" — no extra vowel before s', note: l('not "ischool"', '"ischool" নয়') },
      ],
      question: l('Which is stressed correctly?', 'কোনটায় stress সঠিক?'),
      options: [
        l('pho-TO-gra-phy', 'pho-TO-gra-phy'),
        l('PHO-to-gra-phy', 'PHO-to-gra-phy'),
        l('pho-to-gra-PHY', 'pho-to-gra-PHY'),
      ],
      answer: 0,
      pattern: l('Clear, not native: correct word stress, stress on the key words in a sentence, clear -ed and -s endings, and consonant groups without an added vowel.', 'পরিষ্কার, native নয়: সঠিক word stress, sentence-এর মূল word-এ জোর, পরিষ্কার -ed আর -s ending, আর বাড়তি vowel ছাড়া consonant-গুচ্ছ।'),
    },
    {
      kind: 'concept',
      title: l('Being easy to understand', 'সহজে বোঝা যাওয়া'),
      body: l(
        'Pronunciation is one of the four equally weighted criteria. It covers individual sounds, word and sentence stress, and intonation.',
        'Pronunciation চারটা সমান criteria-র একটা। এতে থাকে আলাদা ধ্বনি, word আর sentence stress, আর intonation।',
      ),
      points: [
        l('Word stress: learn it with every new word (dictionaries mark it). In some word families it moves: PHO-to-graph → pho-TO-gra-phy.', 'Word stress: প্রতিটা নতুন word-এর সাথে শিখুন (dictionary-তে চিহ্ন থাকে)। কিছু word family-তে সরে যায়: PHO-to-graph → pho-TO-gra-phy।'),
        l('Sentence stress: stress the words that carry meaning (nouns, main verbs, adjectives); small words (a, the, of) are weak.', 'Sentence stress: অর্থ বহনকারী word-এ জোর দিন (noun, main verb, adjective); ছোট word (a, the, of) দুর্বল।'),
        l('Endings: -ed is /t/, /d/ or /ɪd/ (walked, played, wanted); -s is /s/, /z/ or /ɪz/ (books, bags, buses). Dropping them changes the meaning.', 'Ending: -ed হয় /t/, /d/ বা /ɪd/ (walked, played, wanted); -s হয় /s/, /z/ বা /ɪz/ (books, bags, buses)। বাদ দিলে অর্থ বদলায়।'),
        l('Why Bangla speakers slip: Bangla words rarely start with "s + consonant", so some speakers add a vowel ("ischool", "istation"); and v / bh, z / j can sound alike. Practise these pairs slowly.', 'বাংলাভাষীরা কেন ভুল করেন: বাংলায় "s + consonant" দিয়ে শুরু word কম, তাই কেউ কেউ vowel যোগ করেন ("ischool", "istation"); আর v / bh, z / j একই রকম শোনাতে পারে। এই জোড়াগুলো ধীরে practice করুন।'),
        l('Common mix-up: "I need a native accent". You need to be clear; a Bangladeshi accent is fine if words and stress are clear.', 'সাধারণ ভুল: "আমার native accent লাগবে"। লাগবে স্পষ্টতা; word আর stress পরিষ্কার হলে বাংলাদেশি accent ঠিক আছে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Stress and endings', 'Stress আর ending'),
      items: [
        { en: 'e-CO-no-my · e-co-NO-mic · e-CO-no-mist', note: l('stress moves in a word family', 'word family-তে stress সরে') },
        { en: '"I WORKED in a BANK for two YEARS."', note: l('key words stressed; worked = /t/', 'মূল word-এ জোর; worked = /t/') },
        { en: 'wanted /ɪd/ · needed /ɪd/ · decided /ɪd/', note: l('after t or d: an extra syllable', 't বা d-এর পরে: বাড়তি syllable') },
        { en: '"school" /skuːl/ — not /ɪskuːl/', note: l('no added vowel', 'বাড়তি vowel নয়') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this helps', 'কোথায় কাজে লাগে'),
      uses: [
        { skill: 'speaking', example: 'Pronunciation: one of four equal criteria', note: l('Clarity counts.', 'স্পষ্টতা গুরুত্বপূর্ণ।') },
        { skill: 'listening', example: 'Knowing stress and endings helps you hear words in Listening.', note: l('Hear what you can say.', 'যা বলতে পারেন তা শুনতে পান।') },
        { skill: 'writing', example: 'Hearing -ed and -s endings helps you write them in Writing.', note: l('Endings in grammar.', 'Grammar-এ ending।') },
        { skill: 'reading', example: 'Reading aloud is a simple way to practise stress.', note: l('Practise daily.', 'প্রতিদিন practice।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: '"ischool", "istation"', right: '"school", "station"', why: l('No vowel before s + consonant.', 's + consonant-এর আগে vowel নয়।') },
        { wrong: '"Yesterday I walk" (no -ed)', right: '"Yesterday I walked" /t/', why: l('The ending carries the past.', 'Ending অতীত বোঝায়।') },
        { wrong: 'PHO-to-gra-phy', right: 'pho-TO-gra-phy', why: l('Stress moves in the word family.', 'Word family-তে stress সরে।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('sp-6-p1', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('Which syllable is stressed in "environment"?', '"environment"-এ কোন syllable-এ stress?'), options: ['en-VI-ron-ment', 'EN-vi-ron-ment', 'en-vi-ron-MENT'], answer: 'en-VI-ron-ment', explanation: l('The second syllable.', 'দ্বিতীয় syllable।'), why: { 'EN-vi-ron-ment': l('The first syllable is weak.', 'প্রথম syllable দুর্বল।'), 'en-vi-ron-MENT': l('"-ment" is never stressed here.', 'এখানে "-ment"-এ কখনো stress নয়।') } }),
        choice('sp-6-p2', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('How is the -ed in "wanted" pronounced?', '"wanted"-এর -ed কীভাবে উচ্চারণ হয়?'), options: ['/ɪd/ — an extra syllable', '/t/', 'silent'], answer: '/ɪd/ — an extra syllable', explanation: l('After t or d: /ɪd/.', 't বা d-এর পরে: /ɪd/।'), why: { '/t/': l('/t/ is for words like "walked".', '/t/ হয় "walked"-এর মত word-এ।'), silent: l('The ending is always heard.', 'Ending সবসময় শোনা যায়।') } }),
        choice('sp-6-p3', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('Which word gets the most stress? "I really enjoyed the concert."', 'কোন word-এ সবচেয়ে বেশি জোর? "I really enjoyed the concert।"'), options: ['concert / enjoyed (key words)', 'the', 'I'], answer: 'concert / enjoyed (key words)', explanation: l('Meaning words are stressed.', 'অর্থবহ word-এ জোর।'), why: { the: l('Small grammar words are weak.', 'ছোট grammar word দুর্বল।'), I: l('The pronoun is usually weak.', 'Pronoun সাধারণত দুর্বল।') } }),
        choice('sp-6-p4', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('Which pronunciation of "school" is clear?', '"school"-এর কোন উচ্চারণ পরিষ্কার?'), options: ['/skuːl/', '/ɪskuːl/', '/sɪkuːl/'], answer: '/skuːl/', explanation: l('No added vowel.', 'বাড়তি vowel নয়।'), why: { '/ɪskuːl/': l('An extra vowel at the start.', 'শুরুতে বাড়তি vowel।'), '/sɪkuːl/': l('An extra vowel inside the group.', 'গুচ্ছের ভেতরে বাড়তি vowel।') } }),
        choice('sp-6-p5', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('What does the Pronunciation criterion reward?', 'Pronunciation criteria কী পুরস্কৃত করে?'), options: ['Being easy to understand', 'A British or American accent', 'Speaking very loudly'], answer: 'Being easy to understand', explanation: l('Clarity, not accent.', 'স্পষ্টতা, accent নয়।'), why: { 'A British or American accent': l('No particular accent is required.', 'নির্দিষ্ট accent লাগে না।'), 'Speaking very loudly': l('Volume is not the criterion.', 'জোর criteria নয়।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('sp-6-r1', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('Write the stressed syllable in capitals (e.g. TO).', 'Stress-যুক্ত syllable capital-এ লিখুন (যেমন TO)।'), sentence: 'e-___-no-my (economy)', accepted: ['CO', 'co'], explanation: l('e-CO-no-my.', 'e-CO-no-my।') }),
        gap('sp-6-r2', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('Write the sound: t, d or id.', 'ধ্বনিটা লিখুন: t, d বা id।'), sentence: 'The -ed in "walked" sounds like /___/.', accepted: ['t'], explanation: l('/t/.', '/t/।') }),
        spot('sp-6-r3', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('One word is missing its ending. Tap it and fix it.', 'একটা word-এর ending নেই। Tap করে ঠিক করুন।'), sentence: 'Yesterday I play football for two hours.', wrong: 'play', accepted: ['played'], explanation: l('played /d/.', 'played /d/।') }),
        correct('sp-6-r4', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('Correct the belief.', 'ধারণাটা ঠিক করুন।'), sentence: 'I need a native accent for a good Pronunciation score.', accepted: ['I need to be easy to understand for a good Pronunciation score.', 'I need to be clear for a good Pronunciation score.', 'I do not need a native accent for a good Pronunciation score.'], explanation: l('Clarity, not accent.', 'স্পষ্টতা, accent নয়।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('sp-6-c1', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('Which pair shows stress moving in a word family?', 'কোন জোড়ায় word family-তে stress সরে যায়?'), options: ['PHO-to-graph / pho-TO-gra-phy', 'BOOK / BOOKS', 'play / played'], answer: 'PHO-to-graph / pho-TO-gra-phy', explanation: l('The stress moves.', 'Stress সরে।') }),
        spot('sp-6-c2', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('One word makes this advice wrong. Tap it, then fix it.', 'একটা word এই পরামর্শকে ভুল করছে। Tap করে ঠিক করুন।'), sentence: 'In a sentence, stress small words like the and of.', wrong: 'stress', accepted: ['weaken'], fixOptions: ['weaken', 'repeat', 'shout'], explanation: l('Small grammar words are weak; key words are stressed.', 'ছোট grammar word দুর্বল; মূল word-এ জোর।') }),
        order('sp-6-c3', 'sp-pron', { ...P, pattern: 'sp-pronunciation', prompt: l('Build the rule.', 'নিয়মটা সাজান।'), answer: 'Be clear, not native.', explanation: l('Clarity is marked.', 'স্পষ্টতা মার্ক হয়।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: mark the stress', 'এবার আপনার পালা: stress চিহ্নিত করুন'),
      exercises: [
        write('sp-6-y1', 'sp-pron', {
          ...P,
          prompt: l('Write 2–3 sentences about your studies or work that you would say in Part 1. Put the stressed key words in CAPITALS, and list any words from your answer with -ed or -s endings.', 'Part 1-এ পড়াশোনা বা কাজ নিয়ে যা বলবেন এমন ২–৩টা sentence লিখুন। জোর দেওয়া মূল word CAPITAL-এ লিখুন, আর উত্তরের -ed বা -s ending-যুক্ত word-এর তালিকা দিন।'),
          model: 'I’m STUDYING ECONOMICS at a university in DHAKA. I CHOSE it because I’ve always been INTERESTED in how MARKETS work. Endings: studying, interested (/ɪd/), markets (/s/).',
          checklist: [l('stress on meaning words, not a / the', 'অর্থবহ word-এ জোর, a / the-এ নয়'), l('-ed and -s endings noticed', '-ed আর -s ending খেয়াল করা'), l('natural spoken sentences', 'স্বাভাবিক কথ্য sentence')],
          explanation: l('Notice stress and endings in your own words.', 'নিজের word-এ stress আর ending খেয়াল করুন।'),
          task: 'The student writes 2–3 IELTS Speaking Part 1 sentences about their studies or work, marks the stressed key words in capitals and lists words with -ed or -s endings. Judge the pronunciation awareness first: stress is marked on meaning words (nouns, main verbs, adjectives, adverbs), not on small grammar words (a, the, of, to); any -ed ending is labelled correctly as /t/, /d/ or /ɪd/ if the student labels it; -s endings are noticed; the sentences sound natural and spoken. Remember pronunciation is about being easy to understand, not a native accent. Then correct grammar only where it matters. Never give a band score.',
          target: l('Pronunciation: stress and endings', 'Pronunciation: stress আর ending'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Clear, not native: stress, endings, clear sounds.', 'পরিষ্কার, native নয়: stress, ending, পরিষ্কার ধ্বনি।'),
        l('Learn word stress with every word; it can move in a family.', 'প্রতিটা word-এর সাথে stress শিখুন; family-তে সরে যেতে পারে।'),
        l('-ed: /t/ /d/ /ɪd/; no extra vowel before "s + consonant".', '-ed: /t/ /d/ /ɪd/; "s + consonant"-এর আগে বাড়তি vowel নয়।'),
      ],
    },
  ],
};

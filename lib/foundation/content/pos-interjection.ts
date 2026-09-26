import type { Lesson, Pos } from '../model';
import { choice, correct, gap, identify, l, spot, write } from './pos-kit';

/** Parts of Speech · Interjection: 1 lesson. Original Vocab Brain content. */
const C = 'pos-interjection';
const JOBS: Pos[] = ['noun', 'verb', 'adjective', 'interjection'];

const i1: Lesson = {
  id: 'pij-1', unit: 'interjection', format: 'v2', concept: C, minutes: 5, difficulty: 'easy', skill: 'grammar',
  title: l('Oh, well, wow', 'Oh, well, wow'),
  why: l('A natural "Well, …" helps in Speaking; the same word in a Task 2 essay sounds too informal.', 'Speaking-এ স্বাভাবিক "Well, …" সাহায্য করে; Task 2 essay-তে একই word খুব informal শোনায়।'),
  steps: [
    {
      kind: 'hook',
      title: l('A difficult question', 'একটা কঠিন প্রশ্ন'),
      situation: l('Examiner (Part 3): "Why do some people dislike modern architecture?" You need a second to think.', 'Examiner (Part 3): "Why do some people dislike modern architecture?" ভাবার জন্য এক সেকেন্ড দরকার।'),
      question: l('What is the most natural way to start?', 'সবচেয়ে স্বাভাবিকভাবে কীভাবে শুরু করবে?'),
      options: ['"Well, that’s an interesting question…"', 'Stay silent for 10 seconds', '"Wow!!! Architecture!!!"'], answer: '"Well, that’s an interesting question…"',
      diagnose: {
        '"Well, that’s an interesting question…"': l('Right. "Well" gives you a moment to think and sounds natural.', 'ঠিক। "Well" ভাবার সময় দেয় আর স্বাভাবিক শোনায়।'),
        'Stay silent for 10 seconds': l('Long silence can hurt Fluency. A short "Well, …" keeps you speaking.', 'লম্বা নীরবতা Fluency কমাতে পারে। ছোট একটা "Well, …" কথা চালু রাখে।'),
        '"Wow!!! Architecture!!!"': l('Too dramatic for the topic. Keep interjections small and natural.', 'Topic-এর জন্য খুব নাটকীয়। Interjection ছোট আর স্বাভাবিক রাখো।'),
      },
    },
    identify({
      sentence: 'Oh/interjection, I forgot/verb my keys/noun again!',
      choices: JOBS,
      pattern: l('"Oh" shows a quick feeling (surprise, disappointment). It is not part of the sentence grammar: that is an interjection.', '"Oh" হঠাৎ একটা অনুভূতি দেখায় (বিস্ময়, হতাশা)। এটা sentence-এর grammar-এর অংশ না: এটাই interjection।'),
    }),
    {
      kind: 'concept',
      title: l('What is an interjection?', 'Interjection কী?'),
      body: l('An interjection is a short word that shows a feeling or reaction: oh, wow, oops, well, ah, hmm. It stands outside the sentence grammar and is usually followed by a comma or an exclamation mark. Use them in speaking and informal messages, not in academic writing.', 'Interjection হলো ছোট word যা অনুভূতি বা প্রতিক্রিয়া দেখায়: oh, wow, oops, well, ah, hmm। এটা sentence-এর grammar-এর বাইরে থাকে, আর সাধারণত পরে comma বা exclamation mark বসে। Speaking আর informal message-এ ব্যবহার করো, academic writing-এ না।'),
      points: [
        l('Well, … = "let me think" or a gentle start in Speaking.', 'Well, … = "একটু ভাবি" বা Speaking-এ নরম শুরু।'),
        l('Never in Task 1 or Task 2: no "Wow", "Oh", "Hmm" in essays.', 'Task 1 বা Task 2-এ কখনো না: essay-তে "Wow", "Oh", "Hmm" না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'Well, I think it depends on the person.', note: l('Speaking: a natural start', 'Speaking: স্বাভাবিক শুরু') },
        { en: 'Oh, I haven’t thought about that before.', note: l('Speaking: reacting honestly', 'Speaking: সত্যি প্রতিক্রিয়া') },
        { en: 'Oops, I sent the wrong file!', note: l('informal message', 'informal message') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'speaking', example: 'Well, to be honest, I’ve never been abroad.', note: l('Part 1–3: a short "Well" helps Fluency, but don’t start every answer with it.', 'Part 1–3: ছোট "Well" Fluency-তে সাহায্য করে, কিন্তু প্রতিটা উত্তর এভাবে শুরু করো না।') },
        { skill: 'writing', example: 'Task 2: no interjections. Use "Admittedly," or "Interestingly," instead.', note: l('Academic tone: formal adverbs replace interjections.', 'Academic ধরন: interjection-এর জায়গায় formal adverb।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'Wow, technology has changed education a lot. (Task 2)', right: 'Technology has changed education significantly.', why: l('No interjections in academic writing.', 'Academic writing-এ interjection না।') },
        { wrong: 'Well, well, well, ummm, I think… (every answer)', right: 'Well, I think…', why: l('One short "Well" is natural; too many fillers hurt Fluency.', 'একটা ছোট "Well" স্বাভাবিক; বেশি filler Fluency কমায়।') },
        { wrong: 'Oh I see', right: 'Oh, I see.', why: l('A comma after the interjection.', 'Interjection-এর পরে comma।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('pij-1-p1', C, { prompt: l('Which word is the interjection?', 'কোন word-টা interjection?'), sentence: 'Wow, the view from the hill is amazing!', options: ['Wow', 'view', 'amazing'], answer: 'Wow', pos: 'interjection', wrongPos: { view: 'noun', amazing: 'adjective' }, explanation: l('"Wow" shows a quick feeling.', '"Wow" হঠাৎ অনুভূতি দেখায়।') }),
        choice('pij-1-p2', C, { prompt: l('Where is an interjection acceptable?', 'কোথায় interjection চলে?'), options: ['Speaking Part 1', 'Task 2 essay', 'Task 1 report'], answer: 'Speaking Part 1', explanation: l('Speaking is conversation; essays are academic.', 'Speaking হলো কথোপকথন; essay academic।') }),
        choice('pij-1-p3', C, { prompt: l('Choose the best start for a Part 3 answer.', 'Part 3 উত্তরের সবচেয়ে ভালো শুরু বাছো।'), options: ['Well, I think there are two reasons.', 'Hmm hmm hmm… reasons…', 'Wow! Good question!'], answer: 'Well, I think there are two reasons.', explanation: l('A short "Well" + a clear start.', 'ছোট "Well" + পরিষ্কার শুরু।') }),
        choice('pij-1-p4', C, { prompt: l('Choose the correctly punctuated sentence.', 'সঠিক punctuation-এর sentence বাছো।'), options: ['Oops, I dropped my phone.', 'Oops I dropped, my phone.'], answer: 'Oops, I dropped my phone.', explanation: l('Comma after the interjection.', 'Interjection-এর পরে comma।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('pij-1-r1', C, { prompt: l('Write a short interjection to start a thoughtful answer.', 'চিন্তাশীল উত্তর শুরু করতে একটা ছোট interjection লেখো।'), sentence: '___, I think it depends on the situation.', accepted: ['well', 'hmm', 'oh'], explanation: l('"Well" is the most natural choice.', '"Well" সবচেয়ে স্বাভাবিক।') }),
        correct('pij-1-r2', C, { prompt: l('Rewrite for a Task 2 essay (remove the interjection).', 'Task 2 essay-এর জন্য আবার লেখো (interjection বাদ দাও)।'), sentence: 'Wow, many young people use social media every day.', accepted: ['Many young people use social media every day.'], explanation: l('No interjections in essays.', 'Essay-তে interjection না।') }),
        spot('pij-1-r3', C, { prompt: l('Task 1 report: find the wrong word and write a formal replacement.', 'Task 1 report: ভুল word খুঁজে একটা formal word লেখো।'), sentence: 'Hmm, the graph shows a sharp rise in sales.', wrong: 'Hmm', accepted: ['Overall', 'Clearly', 'Firstly', 'Initially'], explanation: l('Task 1 is formal: start with the information, e.g. "Overall, the graph shows…".', 'Task 1 formal: তথ্য দিয়ে শুরু করো, যেমন "Overall, the graph shows…"।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pij-1-c1', C, { prompt: l('Why don’t essays use interjections?', 'Essay-তে interjection কেন ব্যবহার হয় না?'), options: ['They are informal and emotional', 'They are grammatically wrong', 'They are too long'], answer: 'They are informal and emotional', explanation: l('Academic writing is formal.', 'Academic writing formal।') }),
        choice('pij-1-c2', C, { prompt: l('Which interjection shows surprise?', 'কোন interjection বিস্ময় দেখায়?'), options: ['Wow', 'Oops', 'Well'], answer: 'Wow', explanation: l('Wow = surprise; Oops = a small mistake; Well = thinking.', 'Wow = বিস্ময়; Oops = ছোট ভুল; Well = ভাবা।') }),
        choice('pij-1-c3', C, { prompt: l('What is the job of "Oh" in "Oh, I see"?', '"Oh, I see"-এ "Oh"-এর কাজ কী?'), options: ['interjection', 'noun', 'verb'], answer: 'interjection', pos: 'interjection', wrongPos: { noun: 'noun', verb: 'verb' }, explanation: l('It shows a reaction, outside the sentence grammar.', 'এটা একটা প্রতিক্রিয়া দেখায়, sentence-এর grammar-এর বাইরে।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('pij-1-w1', C, {
          prompt: l('Speaking Part 3: "Should children learn to cook at school?" Start naturally with "Well," and give one reason.', 'Speaking Part 3: "Should children learn to cook at school?" "Well," দিয়ে স্বাভাবিকভাবে শুরু করো আর একটা কারণ দাও।'),
          model: 'Well, I think it’s a good idea, because cooking is a life skill that every adult needs.',
          task: 'The student answers a Part 3 question starting with "Well," and gives one reason. Check that the interjection is used once and naturally (with a comma), and that the rest of the answer is grammatical and gives a clear reason.',
          target: l('"Well," + a clear answer', '"Well," + পরিষ্কার উত্তর'),
          checklist: [l('One "Well," with a comma', 'comma সহ একটা "Well,"'), l('A clear reason after it', 'পরে একটা পরিষ্কার কারণ')],
          explanation: l('Well, I think…, because…', 'Well, I think…, because…'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('oh, wow, oops, well: short words for feelings, followed by a comma.', 'oh, wow, oops, well: অনুভূতির ছোট word, পরে comma।'),
        l('Speaking: a natural "Well, …" is fine. Essays: never.', 'Speaking: স্বাভাবিক "Well, …" চলে। Essay: কখনো না।'),
      ],
    },
  ],
};

export const posInterjectionLessons: Lesson[] = [i1];

import type { Lesson, Pos } from '../model';
import { choice, correct, gap, identify, l, spot, tagWords, write } from './pos-kit';

/** Parts of Speech · Pronoun: 3 lessons. Original Vocab Brain content. */
const C = 'pos-pronoun';
const JOBS: Pos[] = ['noun', 'pronoun', 'verb', 'adjective'];

// ======================================================================= 1
const p1: Lesson = {
  id: 'ppr-1', unit: 'pronoun', format: 'v2', concept: C, minutes: 5, difficulty: 'easy', skill: 'grammar',
  title: l('What pronouns do', 'Pronoun কী করে'),
  why: l('"Me and my friend went…" and "My mother… he" are heard in many Speaking tests.', '"Me and my friend went…" আর "My mother… he" অনেক Speaking test-এ শোনা যায়।'),
  steps: [
    {
      kind: 'hook',
      title: l('Talking about your mother', 'মা-কে নিয়ে বলা'),
      situation: l('Speaking Part 2: "My mother is a teacher. He teaches maths and he loves his students."', 'Speaking Part 2: "My mother is a teacher. He teaches maths and he loves his students."'),
      question: l('What should change?', 'কী বদলাতে হবে?'),
      options: ['he → she, his → her', 'Nothing', 'teacher → teachers'], answer: 'he → she, his → her',
      diagnose: {
        'he → she, his → her': l('Right. Bangla "সে" is for everyone, but English uses she / her for a woman and he / his for a man.', 'ঠিক। বাংলায় "সে" সবার জন্য, কিন্তু English-এ মহিলার জন্য she / her আর পুরুষের জন্য he / his।'),
        Nothing: l('The examiner will notice: a mother is "she".', 'Examiner ধরবে: মা হলো "she"।'),
        'teacher → teachers': l('One mother, one teacher. The pronoun is the problem.', 'একজন মা, একজন teacher। সমস্যা pronoun-এ।'),
      },
    },
    identify({
      sentence: 'Rina/noun called/verb me/pronoun and we/pronoun talked/verb about her/pronoun new/adjective job./noun',
      choices: JOBS,
      pattern: l('me, we and her stand in for people, so we don’t repeat names. They are pronouns.', 'me, we আর her মানুষের জায়গায় বসে, যাতে নাম বারবার বলতে না হয়। এরা pronoun।'),
    }),
    {
      kind: 'concept',
      title: l('Pronouns stand in for nouns', 'Pronoun noun-এর জায়গায় বসে'),
      body: l('A pronoun replaces a noun so we don’t repeat it. Subject pronouns do the action: I, you, he, she, it, we, they. Object pronouns receive it: me, you, him, her, it, us, them. In English, he / him is for a man or boy, she / her for a woman or girl, it for things and animals.', 'Pronoun noun-এর জায়গায় বসে, যাতে বারবার একই noun না বলতে হয়। Subject pronoun কাজটা করে: I, you, he, she, it, we, they। Object pronoun কাজটা গ্রহণ করে: me, you, him, her, it, us, them। English-এ he / him পুরুষ বা ছেলের জন্য, she / her মহিলা বা মেয়ের জন্য, it জিনিস আর প্রাণীর জন্য।'),
      points: [
        l('Before the verb → subject: She called. After the verb or a preposition → object: I called her. with them.', 'Verb-এর আগে → subject: She called। Verb বা preposition-এর পরে → object: I called her। with them।'),
        l('Put yourself last and use "I" as a subject: My friend and I went (not "Me and my friend went").', 'নিজেকে শেষে রাখো আর subject-এ "I": My friend and I went ("Me and my friend went" না)।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'My grandmother lives with us. She is 80.', note: l('grandmother → she', 'grandmother → she') },
        { en: 'My friend and I study together.', note: l('subject: I (last)', 'subject: I (শেষে)') },
        { en: 'The teacher gave them extra homework.', note: l('after the verb: them', 'verb-এর পরে: them') },
        { en: 'Dhaka is crowded, but it is exciting.', note: l('a city → it', 'শহর → it') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'speaking', example: 'My best friend is Tania. She is very kind, and I trust her.', note: l('Part 2 is about people: he / she mistakes are very noticeable.', 'Part 2 মানুষ নিয়ে: he / she ভুল খুব চোখে পড়ে।') },
        { skill: 'writing', example: 'Students need support. They often feel stressed.', note: l('Task 2: pronouns link sentences without repetition (Coherence & Cohesion).', 'Task 2: pronoun পুনরাবৃত্তি ছাড়াই sentence জোড়ে (Coherence & Cohesion)।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'My sister is a doctor. He works in a hospital.', right: 'My sister is a doctor. She works in a hospital.', why: l('sister → she.', 'sister → she।') },
        { wrong: 'Me and my friend went to the cinema.', right: 'My friend and I went to the cinema.', why: l('Subject → I, and put yourself last.', 'Subject → I, আর নিজেকে শেষে রাখো।') },
        { wrong: 'The teacher helped we.', right: 'The teacher helped us.', why: l('After the verb → object: us.', 'Verb-এর পরে → object: us।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('ppr-1-p1', C, { prompt: l('Choose the pronoun.', 'Pronoun-টা বাছো।'), sentence: 'My aunt lives in London. ______ works as a nurse.', options: ['She', 'He', 'It'], answer: 'She', explanation: l('aunt → she.', 'aunt → she।') }),
        choice('ppr-1-p2', C, { prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'), options: ['My brother and I play cricket.', 'Me and my brother play cricket.', 'I and my brother play cricket.'], answer: 'My brother and I play cricket.', explanation: l('Subject → I, yourself last.', 'Subject → I, নিজে শেষে।') }),
        choice('ppr-1-p3', C, { prompt: l('Choose the pronoun.', 'Pronoun-টা বাছো।'), sentence: 'Our neighbours are friendly. We often visit ______.', options: ['them', 'they', 'their'], answer: 'them', explanation: l('After the verb → object: them.', 'Verb-এর পরে → object: them।') }),
        tagWords('ppr-1-p4', C, { sentence: 'They/pronoun invited/verb us/pronoun to their/pronoun wedding./noun', choices: JOBS, explanation: l('They, us and their are pronouns (their shows who it belongs to).', 'They, us আর their pronoun (their বলে কার)।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('ppr-1-r1', C, { prompt: l('Write the pronoun.', 'Pronoun লেখো।'), sentence: 'My father is a farmer. ___ grows rice and vegetables.', accepted: ['he'], explanation: l('father → he.', 'father → he।'), why: { she: l('A father is "he".', 'বাবা হলো "he"।') } }),
        gap('ppr-1-r2', C, { prompt: l('Write the pronoun.', 'Pronoun লেখো।'), sentence: 'Can you help ___ with this question? (I)', accepted: ['me'], explanation: l('After the verb → me.', 'Verb-এর পরে → me।'), why: { i: l('After a verb we use the object form: me.', 'Verb-এর পরে object form: me।') } }),
        correct('ppr-1-r3', C, { prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে আবার লেখো।'), sentence: 'Me and my cousin went to Sylhet.', accepted: ['My cousin and I went to Sylhet.'], explanation: l('My cousin and I…', 'My cousin and I…') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ppr-1-c1', C, { prompt: l('Why "I" in "My friend and I went"?', '"My friend and I went"-এ "I" কেন?'), options: ['It is the subject (before the verb)', '"I" sounds more polite', '"me" is only for questions'], answer: 'It is the subject (before the verb)', explanation: l('Subject → I; object → me.', 'Subject → I; object → me।') }),
        spot('ppr-1-c2', C, { sentence: 'My grandmother is 75 and he still walks every day.', wrong: 'he', accepted: ['she'], fixOptions: ['she', 'her', 'it'], explanation: l('grandmother → she.', 'grandmother → she।') }),
        spot('ppr-1-c3', C, { sentence: 'The coach gave we a new timetable.', wrong: 'we', accepted: ['us'], fixOptions: ['us', 'our', 'ours'], explanation: l('After the verb → object: us.', 'Verb-এর পরে → object: us।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('ppr-1-w1', C, {
          prompt: l('Speaking Part 2: describe a woman you admire in two sentences, using she / her.', 'Speaking Part 2: তুমি শ্রদ্ধা করো এমন একজন মহিলাকে দুই sentence-এ describe করো, she / her দিয়ে।'),
          model: 'I really admire my aunt. She started her own business and she always helps other women in our village.',
          task: 'The student describes a woman they admire in two sentences. Check pronoun gender (she/her, not he/his), subject vs object forms, and possessives.',
          target: l('she / her used correctly', 'she / her সঠিকভাবে'),
          checklist: [l('I used she / her (not he / his) for a woman', 'মহিলার জন্য she / her (he / his না) ব্যবহার করেছি'), l('Subject before the verb, object after', 'Verb-এর আগে subject, পরে object')],
          explanation: l('She started her business…', 'She started her business…'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('he / him / his for a man; she / her for a woman; it for things.', 'পুরুষের জন্য he / him / his; মহিলার জন্য she / her; জিনিসের জন্য it।'),
        l('Subject: I, we, they. Object: me, us, them. My friend and I…', 'Subject: I, we, they। Object: me, us, them। My friend and I…'),
      ],
    },
  ],
};

// ======================================================================= 2
const p2: Lesson = {
  id: 'ppr-2', unit: 'pronoun', format: 'v2', concept: C, minutes: 5, difficulty: 'medium', skill: 'grammar',
  title: l('Possessives and -self', 'Possessive আর -self'),
  why: l('its / it’s and their / there are among the most common spelling errors in Writing.', 'its / it’s আর their / there Writing-এর সবচেয়ে common বানান ভুলগুলোর মধ্যে।'),
  steps: [
    {
      kind: 'hook',
      title: l('A Task 2 sentence', 'একটা Task 2 sentence'),
      situation: l('Nusrat writes: "Every city has it’s own problems, and there leaders must solve them."', 'Nusrat লিখলো: "Every city has it’s own problems, and there leaders must solve them."'),
      question: l('Which fixes are right?', 'কোন সংশোধনগুলো ঠিক?'),
      options: ['its own, their leaders', 'it is own, they’re leaders', 'Nothing is wrong'], answer: 'its own, their leaders',
      diagnose: {
        'its own, their leaders': l('Right. its = belonging to it; their = belonging to them.', 'ঠিক। its = এর নিজের; their = তাদের।'),
        'it is own, they’re leaders': l('it’s = it is, they’re = they are. Here we need "belonging to": its, their.', 'it’s = it is, they’re = they are। এখানে "কার" বোঝাতে: its, their।'),
        'Nothing is wrong': l('Two words sound right but are spelled wrong: it’s → its, there → their.', 'দুটো word শুনতে ঠিক, কিন্তু বানান ভুল: it’s → its, there → their।'),
      },
    },
    identify({
      sentence: 'The company/noun changed/verb its/pronoun logo,/noun and customers/noun liked/verb it/pronoun.',
      choices: JOBS,
      pattern: l('"its" shows the logo belongs to the company; "it" replaces "the logo". Both are pronouns, with different jobs.', '"its" দেখায় logo-টা company-র; "it" "the logo"-র জায়গায় বসেছে। দুটোই pronoun, কাজ ভিন্ন।'),
    }),
    {
      kind: 'concept',
      title: l('Whose is it?', 'এটা কার?'),
      body: l('Possessives show who something belongs to: my, your, his, her, its, our, their (+ noun) and mine, yours, his, hers, ours, theirs (alone). Watch the look-alikes: its (belonging to it) vs it’s (it is); their (belonging to them) vs there (place) vs they’re (they are). -self pronouns point back to the subject: I taught myself.', 'Possessive দেখায় কিছু কার: my, your, his, her, its, our, their (+ noun) আর mine, yours, his, hers, ours, theirs (একা)। দেখতে একরকম word-এ সাবধান: its (এর নিজের) বনাম it’s (it is); their (তাদের) বনাম there (জায়গা) বনাম they’re (they are)। -self pronoun subject-এর দিকে ফিরে যায়: I taught myself।'),
      points: [
        l('Test: can you say "it is" / "they are"? Then write it’s / they’re. If not: its / their.', 'Test: "it is" / "they are" বলা যায়? তাহলে it’s / they’re। না হলে its / their।'),
        l('No apostrophe in possessive pronouns: yours, hers, its, ours, theirs.', 'Possessive pronoun-এ apostrophe নেই: yours, hers, its, ours, theirs।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'The river is famous for its fish.', note: l('its = belonging to the river', 'its = নদীর') },
        { en: 'It’s a beautiful place.', note: l('it’s = it is', 'it’s = it is') },
        { en: 'Parents should listen to their children.', note: l('their = belonging to parents', 'their = বাবা-মায়ের') },
        { en: 'I taught myself to cook.', note: l('myself points back to I', 'myself I-এর দিকে ফেরে') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'writing', example: 'Each country should protect its environment.', note: l('its / their errors cost accuracy points in every Task 2.', 'its / their ভুল প্রতিটা Task 2-এ accuracy কমায়।') },
        { skill: 'listening', example: '"Write their surname" — check the spelling of what you hear.', note: l('Listening answers must be spelled correctly.', 'Listening-এর উত্তর সঠিক বানানে লিখতে হয়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'The city is proud of it’s history.', right: 'The city is proud of its history.', why: l('belonging to it → its.', 'এর নিজের → its।') },
        { wrong: 'Students should manage there time.', right: 'Students should manage their time.', why: l('belonging to students → their.', 'students-এর → their।') },
        { wrong: 'This book is your’s.', right: 'This book is yours.', why: l('No apostrophe in yours.', 'yours-এ apostrophe নেই।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('ppr-2-p1', C, { prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: 'The school improved ______ library.', options: ['its', 'it’s', 'it'], answer: 'its', explanation: l('belonging to the school → its.', 'school-এর → its।') }),
        choice('ppr-2-p2', C, { prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: 'Many people leave ______ villages for the city.', options: ['their', 'there', 'they’re'], answer: 'their', explanation: l('belonging to people → their.', 'মানুষের → their।') }),
        choice('ppr-2-p3', C, { prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: '______ a good idea to start early.', options: ['It’s', 'Its'], answer: 'It’s', explanation: l('It is a good idea → It’s.', 'It is a good idea → It’s।') }),
        choice('ppr-2-p4', C, { prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: 'I prepared for IELTS by ______.', options: ['myself', 'me', 'mine'], answer: 'myself', explanation: l('by myself = alone, without help.', 'by myself = একা, সাহায্য ছাড়া।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        spot('ppr-2-r1', C, { sentence: 'Every country has it’s own culture.', wrong: 'it’s', accepted: ['its'], explanation: l('belonging to it → its.', 'এর নিজের → its।') }),
        spot('ppr-2-r2', C, { sentence: 'Young people spend a lot of there money online.', wrong: 'there', accepted: ['their'], explanation: l('belonging to young people → their.', 'তরুণদের → their।') }),
        gap('ppr-2-r3', C, { prompt: l('Write the possessive pronoun.', 'Possessive pronoun লেখো।'), sentence: 'This bag is not mine; it is ___. (she)', accepted: ['hers'], explanation: l('she → hers (no apostrophe).', 'she → hers (apostrophe ছাড়া)।'), why: { "her's": l('No apostrophe: hers.', 'Apostrophe নেই: hers।'), her: l('Alone, without a noun: hers.', 'Noun ছাড়া একা: hers।') } }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ppr-2-c1', C, { prompt: l('How do you know it is "its" and not "it’s"?', 'কীভাবে বুঝবে "it’s" না, "its"?'), sentence: 'The company lost its best worker.', options: ['"it is best worker" makes no sense', '"its" is always correct', 'Because company is a noun'], answer: '"it is best worker" makes no sense', explanation: l('Try "it is". If it doesn’t fit, write its.', '"it is" বসিয়ে দেখো। না মিললে its।') }),
        spot('ppr-2-c2', C, { sentence: 'Parents should check they’re children’s homework.', wrong: 'they’re', accepted: ['their'], fixOptions: ['their', 'there', 'them'], explanation: l('belonging to parents → their.', 'বাবা-মায়ের → their।') }),
        choice('ppr-2-c3', C, { prompt: l('Choose the correct sentence.', 'সঠিক sentence-টা বাছো।'), options: ['The decision is ours.', 'The decision is our’s.', 'The decision is ours’.'], answer: 'The decision is ours.', explanation: l('No apostrophe in ours.', 'ours-এ apostrophe নেই।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('ppr-2-w1', C, {
          prompt: l('Write one Task 2 sentence about what parents or governments should do, using their or its.', 'বাবা-মা বা সরকারের কী করা উচিত, তা নিয়ে their বা its দিয়ে একটা Task 2 sentence লেখো।'),
          model: 'Every government should invest more of its budget in education, and parents should limit their children’s screen time.',
          task: 'The student writes one Task 2 sentence using possessive pronouns (its/their). Check its vs it\'s, their vs there/they\'re, and agreement between the pronoun and its noun (government → its, parents → their).',
          target: l('its / their used correctly', 'its / their সঠিকভাবে'),
          checklist: [l('its (no apostrophe) for "belonging to it"', '"এর নিজের" বোঝাতে its (apostrophe ছাড়া)'), l('their for "belonging to them"', '"তাদের" বোঝাতে their')],
          explanation: l('its budget, their children.', 'its budget, their children।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('its = belonging to it; it’s = it is. their = belonging to them; there = place; they’re = they are.', 'its = এর নিজের; it’s = it is। their = তাদের; there = জায়গা; they’re = they are।'),
        l('yours, hers, ours, theirs: never an apostrophe.', 'yours, hers, ours, theirs: কখনো apostrophe না।'),
      ],
    },
  ],
};

// ======================================================================= 3
const p3: Lesson = {
  id: 'ppr-3', unit: 'pronoun', format: 'v2', concept: C, minutes: 6, difficulty: 'medium', skill: 'grammar',
  title: l('What does "it" refer to?', '"it" কাকে বোঝায়?'),
  why: l('Reading questions test what "it", "this" and "they" refer to; clear reference improves Writing coherence.', 'Reading-এ প্রশ্ন আসে "it", "this", "they" কাকে বোঝায়; পরিষ্কার reference Writing-এর coherence বাড়ায়।'),
  steps: [
    {
      kind: 'hook',
      title: l('A Reading question', 'একটা Reading প্রশ্ন'),
      situation: l('Passage: "Bamboo grows extremely fast. This makes it a popular building material in Asia."', 'Passage: "Bamboo grows extremely fast. This makes it a popular building material in Asia."'),
      question: l('What does "This" refer to?', '"This" কাকে বোঝায়?'),
      options: ['the fact that bamboo grows fast', 'Asia', 'building material'], answer: 'the fact that bamboo grows fast',
      diagnose: {
        'the fact that bamboo grows fast': l('Right. "This" points back to the whole idea in the previous sentence.', 'ঠিক। "This" আগের sentence-এর পুরো ধারণার দিকে ফিরে যায়।'),
        Asia: l('Asia comes later. "This" points back.', 'Asia পরে এসেছে। "This" পেছনে ফিরে যায়।'),
        'building material': l('"it" = bamboo; "This" = the idea that it grows fast.', '"it" = bamboo; "This" = দ্রুত বাড়ার ধারণাটা।'),
      },
    },
    identify({
      sentence: 'Solar/adjective panels/noun are/verb cheap,/adjective and they/pronoun last/verb for years./noun',
      choices: JOBS,
      pattern: l('"they" points back to "solar panels". Pronouns connect sentences: always know what they point to.', '"they" পেছনে "solar panels"-কে বোঝায়। Pronoun sentence জোড়ে: সবসময় জানো এটা কাকে বোঝাচ্ছে।'),
    }),
    {
      kind: 'concept',
      title: l('Pointing back', 'পেছনে ইঙ্গিত করা'),
      body: l('Pronouns like it, they, this, these, that, which usually point back to something already mentioned. In Reading, find it by looking back to the nearest noun or idea that fits in number (singular/plural) and meaning. In Writing, make sure every pronoun has one clear noun to point to.', 'it, they, this, these, that, which-এর মতো pronoun সাধারণত আগে বলা কিছুর দিকে ফিরে যায়। Reading-এ পেছনে সবচেয়ে কাছের সেই noun বা ধারণাটা খোঁজো যা সংখ্যায় (singular/plural) আর অর্থে মেলে। Writing-এ নিশ্চিত হও প্রতিটা pronoun-এর একটা পরিষ্কার noun আছে।'),
      points: [
        l('it / this = singular; they / these = plural. This / That can refer to a whole idea.', 'it / this = singular; they / these = plural। This / That পুরো একটা ধারণাকেও বোঝাতে পারে।'),
        l('Unclear: "Students and teachers disagree because they are busy." (who?) Clear: "…because teachers are busy."', 'অস্পষ্ট: "Students and teachers disagree because they are busy." (কারা?) পরিষ্কার: "…because teachers are busy."'),
      ],
    },
    {
      kind: 'examples',
      title: l('Examples', 'উদাহরণ'),
      items: [
        { en: 'Many cities have metro systems. These reduce traffic.', note: l('These → metro systems (plural)', 'These → metro systems (plural)') },
        { en: 'Prices rose by 20%. This worried many families.', note: l('This → the rise in prices', 'This → দাম বাড়া') },
        { en: 'The river, which flows through Rajshahi, is wide.', note: l('which → the river', 'which → নদীটা') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Why this matters in IELTS', 'এটা IELTS-এ কেন দরকার?'),
      uses: [
        { skill: 'reading', example: 'Tracking "it" and "they" helps you follow the argument and answer True / False / Not Given correctly.', note: l('Wrong reference = wrong answer.', 'ভুল reference = ভুল উত্তর।') },
        { skill: 'writing', example: 'Online learning is flexible. However, it requires discipline.', note: l('Coherence & Cohesion: clear pronouns link ideas.', 'Coherence & Cohesion: পরিষ্কার pronoun ধারণা জোড়ে।') },
        { skill: 'writing', example: 'The chart shows car sales. They rose in every region.', note: l('Task 1: "They" → sales; avoid repeating the noun every time.', 'Task 1: "They" → sales; প্রতিবার noun বলার দরকার নেই।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'Smartphones are useful, but it can be addictive.', right: 'Smartphones are useful, but they can be addictive.', why: l('smartphones (plural) → they.', 'smartphones (plural) → they।') },
        { wrong: 'This problems need attention.', right: 'These problems need attention.', why: l('plural → these.', 'plural → these।') },
        { wrong: 'My father told my brother that he was wrong.', right: 'My father told my brother, "You are wrong."', why: l('"he" could be either person. Make it clear.', '"he" দুজনের যে কেউ হতে পারে। পরিষ্কার করো।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Guided practice', 'Guided practice'),
      exercises: [
        choice('ppr-3-p1', C, { prompt: l('What does "they" refer to?', '"they" কাকে বোঝায়?'), sentence: 'Electric buses are quiet, and they produce no smoke.', options: ['electric buses', 'the smoke', 'the passengers'], answer: 'electric buses', explanation: l('Plural, and buses produce smoke (or not).', 'Plural, আর bus-ই smoke তৈরি করে (বা করে না)।') }),
        choice('ppr-3-p2', C, { prompt: l('Choose the pronoun.', 'Pronoun-টা বাছো।'), sentence: 'Air pollution is serious. ______ causes breathing problems.', options: ['It', 'They', 'These'], answer: 'It', explanation: l('air pollution (singular) → it.', 'air pollution (singular) → it।') }),
        choice('ppr-3-p3', C, { prompt: l('What does "This" refer to?', '"This" কাকে বোঝায়?'), sentence: 'Many graduates cannot find jobs. This leads to frustration.', options: ['graduates not finding jobs', 'the graduates', 'frustration'], answer: 'graduates not finding jobs', explanation: l('"This" = the whole situation.', '"This" = পুরো পরিস্থিতি।') }),
        choice('ppr-3-p4', C, { prompt: l('Choose the right word.', 'ঠিক word-টা বাছো।'), sentence: '______ changes will take time.', options: ['These', 'This'], answer: 'These', explanation: l('changes (plural) → These.', 'changes (plural) → These।') }),
      ],
    },
    {
      kind: 'practice', mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('ppr-3-r1', C, { prompt: l('Write the pronoun.', 'Pronoun লেখো।'), sentence: 'Bicycles are cheap, and ___ do not pollute the air.', accepted: ['they'], explanation: l('bicycles (plural) → they.', 'bicycles (plural) → they।'), why: { it: l('Bicycles are plural: they.', 'Bicycles plural: they।') } }),
        spot('ppr-3-r2', C, { sentence: 'Social media apps are popular, but it can waste time.', wrong: 'it', accepted: ['they'], explanation: l('apps (plural) → they.', 'apps (plural) → they।') }),
        gap('ppr-3-r3', C, { prompt: l('Write "this" or "these".', '"this" বা "these" লেখো।'), sentence: '___ solutions are expensive but effective.', accepted: ['these'], explanation: l('solutions (plural) → these.', 'solutions (plural) → these।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ppr-3-c1', C, { prompt: l('Reading: what does "it" refer to?', 'Reading: "it" কাকে বোঝায়?'), sentence: 'The museum reopened in 2022 after it was repaired.', options: ['the museum', '2022', 'the repair'], answer: 'the museum', explanation: l('The museum was repaired.', 'Museum-টা মেরামত হয়েছিল।') }),
        spot('ppr-3-c2', C, { sentence: 'This problems affect millions of people.', wrong: 'This', accepted: ['These'], fixOptions: ['These', 'That', 'It'], explanation: l('problems (plural) → These.', 'problems (plural) → These।') }),
        correct('ppr-3-c3', C, { prompt: l('Make the reference clear: replace "they" with the right noun.', 'Reference পরিষ্কার করো: "they"-এর জায়গায় ঠিক noun দাও।'), sentence: 'Students and teachers disagree because they have too much work.', accepted: ['Students and teachers disagree because teachers have too much work.', 'Students and teachers disagree because students have too much work.'], explanation: l('Replace "they" with the group you mean.', 'যাদের বোঝাচ্ছো, "they"-এর জায়গায় সেই group-এর নাম দাও।') }),
      ],
    },
    {
      kind: 'practice', mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করো'),
      exercises: [
        write('ppr-3-w1', C, {
          prompt: l('Write two linked Task 2 sentences about mobile phones. Use "they" or "this" in the second sentence to point back.', 'Mobile phone নিয়ে দুটো জোড়া Task 2 sentence লেখো। দ্বিতীয় sentence-এ পেছনে ফিরতে "they" বা "this" ব্যবহার করো।'),
          model: 'Many teenagers spend hours on their phones every day. This can affect their sleep and their studies.',
          task: 'The student writes two linked Task 2 sentences about mobile phones, using "they", "it", "this" or "these" in the second sentence to refer back. Check that each pronoun agrees in number and has one clear referent.',
          target: l('A pronoun that clearly points back', 'পরিষ্কারভাবে পেছনে ইঙ্গিত করা pronoun'),
          checklist: [l('My pronoun has one clear noun or idea to point to', 'আমার pronoun-এর একটা পরিষ্কার noun বা ধারণা আছে'), l('Singular/plural match (it / they, this / these)', 'Singular/plural মেলে (it / they, this / these)')],
          explanation: l('This → spending hours on phones.', 'This → phone-এ ঘণ্টা কাটানো।'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Look back for the nearest noun or idea that fits in number and meaning.', 'পেছনে সবচেয়ে কাছের সেই noun বা ধারণা খোঁজো যা সংখ্যা আর অর্থে মেলে।'),
        l('it / this = singular; they / these = plural. Every pronoun needs one clear target.', 'it / this = singular; they / these = plural। প্রতিটা pronoun-এর একটা পরিষ্কার লক্ষ্য লাগে।'),
      ],
    },
  ],
};

export const posPronounLessons: Lesson[] = [p1, p2, p3];

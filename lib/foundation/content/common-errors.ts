import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Common Errors to Fix (Foundation module 10), the six concept lessons in the
 * v2 (problem-first) format, easy → hard:
 * ce-1 direct translation from Bangla (I am agree, open the light, give an exam)
 * ce-2 uncountable nouns (information, advice, furniture, research, much / many)
 * ce-3 singular and plural after numbers and quantifiers (two years, one of the …s)
 * ce-4 collocations: make / do / take / have, heavy rain, high price
 * ce-5 confusing word pairs: say / tell, lend / borrow, learn / teach, rise / raise
 * ce-6 repetition and natural phrasing (return back, discuss about, more better)
 * Each lesson names the Bangla word or habit behind the error. Original Mino content.
 */

export const COMMON_ERROR_CONCEPTS: Concept[] = [
  { id: 'ce-translation', title: l('Direct translation from Bangla', 'বাংলা থেকে সরাসরি অনুবাদ'), lessonId: 'ce-1', tag: 'common-error' },
  { id: 'ce-countable', title: l('Uncountable nouns', 'Uncountable noun'), lessonId: 'ce-2', tag: 'common-error' },
  { id: 'ce-plural', title: l('Singular and plural after numbers and quantifiers', 'সংখ্যা আর quantifier-এর পরে singular/plural'), lessonId: 'ce-3', tag: 'common-error' },
  { id: 'ce-collocation', title: l('Collocations: make, do, take, have', 'Collocation: make, do, take, have'), lessonId: 'ce-4', tag: 'common-error' },
  { id: 'ce-word-pair', title: l('Confusing word pairs', 'যে word জোড়াগুলো গুলিয়ে যায়'), lessonId: 'ce-5', tag: 'common-error' },
  { id: 'ce-natural', title: l('Repetition and natural phrasing', 'Repetition আর স্বাভাবিক phrasing'), lessonId: 'ce-6', tag: 'common-error' },
];

const P = { tag: 'common-error' as const };

// ======================================================================= ce-1
export const ceTranslation: Lesson = {
  id: 'ce-1',
  format: 'v2',
  concept: 'ce-translation',
  title: l('Direct translation from Bangla', 'বাংলা থেকে সরাসরি অনুবাদ'),
  why: l('"I am agree" and "I gave IELTS" come from thinking in Bangla and translating word by word. Examiners notice these at once — and they are easy to fix once you know them.', '"I am agree" আর "I gave IELTS" আসে বাংলায় ভেবে word ধরে ধরে অনুবাদ করা থেকে। Examiner এগুলো সাথে সাথে ধরেন — কিন্তু একবার চিনলে ঠিক করা সহজ।'),
  minutes: 9,
  difficulty: 'easy',
  skill: 'speaking',
  steps: [
    {
      kind: 'hook',
      title: l('Speaking Part 1', 'Speaking Part 1'),
      situation: l('The examiner asks: "Do you like studying in the evening?" You answer: "Yes, I am agree. Last year I gave my exams at night."', 'Examiner জিজ্ঞেস করলেন: "Do you like studying in the evening?" আপনি বললেন: "Yes, I am agree. Last year I gave my exams at night."'),
      question: l('Which words sound translated from Bangla?', 'কোন word-গুলো বাংলা থেকে অনুবাদ করা মনে হয়?'),
      options: ['"am agree" and "gave my exams"', 'Only "at night"', 'Nothing — it is correct'],
      answer: '"am agree" and "gave my exams"',
      diagnose: {
        '"am agree" and "gave my exams"': l('Right. "আমি একমত" → I agree (agree is already a verb). "পরীক্ষা দিয়েছি" → I took my exams. (And the question asked if you like something, so "Yes, I do" fits better than "I agree".)', 'ঠিক। "আমি একমত" → I agree (agree নিজেই verb)। "পরীক্ষা দিয়েছি" → I took my exams। (আর প্রশ্নটা পছন্দ নিয়ে, তাই "I agree"-এর চেয়ে "Yes, I do" বেশি মানায়।)'),
        'Only "at night"': l('"at night" is fine. The problems are "am agree" (agree is a verb, no am) and "gave my exams" (in English you take or sit an exam).', '"at night" ঠিক আছে। সমস্যা হলো "am agree" (agree verb, am লাগে না) আর "gave my exams" (English-এ exam take বা sit করা হয়)।'),
        'Nothing — it is correct': l('Two phrases are Bangla word order in English words: "am agree" → agree; "gave my exams" → took my exams.', 'দুটো phrase English word-এ বাংলা গঠন: "am agree" → agree; "gave my exams" → took my exams।'),
      },
    },
    {
      kind: 'discover',
      title: l('Bangla thought → English words', 'বাংলা ভাবনা → English word'),
      items: [
        { en: 'আমি একমত → I agree. (not I am agree)', note: l('agree is a verb: no am / is / are', 'agree verb: am / is / are লাগে না') },
        { en: 'লাইট জ্বালানো → Please turn on the light. (not open the light)', note: l('lights, fans and TVs: turn on / turn off', 'light, fan, TV: turn on / turn off') },
        { en: 'পরীক্ষা দেওয়া → take / sit an exam (not give an exam)', note: l('the teacher gives an exam; the student takes it', 'শিক্ষক exam দেন; শিক্ষার্থী take করেন') },
        { en: 'ওষুধ খাওয়া → take medicine (not eat medicine)', note: l('medicine is taken, not eaten', 'ওষুধ take করা হয়, eat না') },
      ],
      question: l('What causes these errors?', 'এই ভুলগুলো কেন হয়?'),
      options: [
        l('Each Bangla word is replaced with an English word, but English uses a different verb or pattern', 'প্রতিটা বাংলা word-এর জায়গায় একটা English word বসানো হয়, কিন্তু English-এ আলাদা verb বা গঠন লাগে'),
        l('The English words are spelled wrong', 'English word-এর বানান ভুল'),
        l('English has no words for these ideas', 'English-এ এই idea-র কোনো word নেই'),
      ],
      answer: 0,
      pattern: l('Learn the English phrase as one unit (turn on the light, take an exam, take medicine) instead of translating each Bangla word.', 'প্রতিটা বাংলা word অনুবাদ না করে English phrase-টা একসাথে শিখুন (turn on the light, take an exam, take medicine)।'),
    },
    {
      kind: 'concept',
      title: l('The most common translated phrases', 'সবচেয়ে বেশি অনুবাদ-করা phrase'),
      body: l(
        'Some Bangla phrases do not translate word by word. Learn the English version as a fixed phrase.',
        'কিছু বাংলা phrase word ধরে অনুবাদ হয় না। English রূপটা একটা নির্দিষ্ট phrase হিসেবে শিখুন।',
      ),
      points: [
        l('agree, disagree, depend: they are verbs. I agree · It depends on the weather. Not "I am agree" or "It is depend".', 'agree, disagree, depend: এগুলো verb। I agree · It depends on the weather। "I am agree" বা "It is depend" না।'),
        l('Exams: take / sit an exam, pass / fail an exam. Medicine: take medicine. Photos: take a photo.', 'Exam: take / sit an exam, pass / fail an exam। ওষুধ: take medicine। ছবি: take a photo।'),
        l('Machines: turn on / turn off (the light, the fan, the computer). Doors and windows: open / close.', 'যন্ত্র: turn on / turn off (light, fan, computer)। দরজা-জানালা: open / close।'),
        l('Family: cousin (not cousin brother / cousin sister). Name: What is your name? (not your good name). Origin: I am from Khulna / I come from Khulna (not I am coming from Khulna).', 'পরিবার: cousin (cousin brother / cousin sister না)। নাম: What is your name? (your good name না)। কোথা থেকে: I am from Khulna / I come from Khulna (I am coming from Khulna না)।'),
        l('Why Bangla speakers slip: Bangla uses "আমি একমত" (I + agreed), "দেওয়া" for exams and "খাওয়া" for medicine, and adds ভাই / বোন after cousin. When you think in Bangla first, these words come straight across into English.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় "আমি একমত", পরীক্ষা "দেওয়া", ওষুধ "খাওয়া" বলা হয়, আর cousin-এর পরে ভাই / বোন যোগ হয়। আগে বাংলায় ভাবলে এই word-গুলো সোজা English-এ চলে আসে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'I agree that public transport should be cheaper.', note: l('agree = verb', 'agree = verb') },
        { en: 'My cousin is taking the IELTS test in May.', note: l('cousin · take a test', 'cousin · take a test') },
        { en: 'Could you turn off the fan, please?', note: l('machines: turn off', 'যন্ত্র: turn off') },
        { en: 'You should take this medicine twice a day.', note: l('take medicine', 'take medicine') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'I completely agree — it depends on the person.', note: l('Speaking Part 3: agree and depend are the most common translated slips.', 'Speaking Part 3: agree আর depend-এ অনুবাদের ভুল সবচেয়ে বেশি।') },
        { skill: 'writing', example: 'I partly agree with this statement.', note: l('Task 2 opinion: "I am agree" costs Grammatical Range and Accuracy marks.', 'Task 2 opinion: "I am agree" Grammatical Range and Accuracy-র নম্বর কাটে।') },
        { skill: 'listening', example: 'Students must take the test before the end of June.', note: l('Listening: you hear the natural phrase — "take the test", not "give".', 'Listening: আপনি স্বাভাবিক phrase শুনবেন — "take the test", "give" না।') },
        { skill: 'reading', example: 'Patients who took the medicine recovered faster.', note: l('Reading: knowing the natural verb helps you match paraphrases.', 'Reading: স্বাভাবিক verb জানা থাকলে paraphrase মেলাতে সুবিধা হয়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I am agree with this idea.', right: 'I agree with this idea.', why: l('agree is a verb; no am.', 'agree verb; am লাগে না।') },
        { wrong: 'She gave the IELTS test last month.', right: 'She took the IELTS test last month.', why: l('Students take (or sit) a test.', 'শিক্ষার্থী test take (বা sit) করেন।') },
        { wrong: 'Please open the light.', right: 'Please turn on the light.', why: l('Lights are turned on, not opened.', 'Light turn on করা হয়, open না।') },
        { wrong: 'My cousin brother lives in Italy.', right: 'My cousin lives in Italy.', why: l('cousin already means a male or female cousin.', 'cousin মানেই ছেলে বা মেয়ে cousin।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ce-1-p1', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['I agree with you.', 'I am agree with you.', 'I am agreed with you.'], answer: 'I agree with you.', explanation: l('agree is a verb: I agree.', 'agree verb: I agree।'), why: { 'I am agree with you.': l('"আমি একমত" translated word by word; agree needs no am.', '"আমি একমত" word ধরে অনুবাদ; agree-এর সাথে am লাগে না।'), 'I am agreed with you.': l('We do not say "I am agreed"; use the verb: I agree.', '"I am agreed" বলা হয় না; verb ব্যবহার করুন: I agree।') } }),
        choice('ce-1-p2', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Choose the natural verb.', 'স্বাভাবিক verb বেছে নিন।'), sentence: 'Many students ___ the IELTS test twice.', options: ['take', 'give', 'eat'], answer: 'take', explanation: l('take (or sit) a test.', 'take (বা sit) a test।'), why: { give: l('"পরীক্ষা দেওয়া" in English is take a test; the examiner gives it.', '"পরীক্ষা দেওয়া" English-এ take a test; examiner test দেন।'), eat: l('eat is only for food.', 'eat শুধু খাবারের জন্য।') } }),
        choice('ce-1-p3', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Choose the natural phrase.', 'স্বাভাবিক phrase বেছে নিন।'), sentence: 'It is hot. Could you ___ the fan?', options: ['turn on', 'open', 'start'], answer: 'turn on', explanation: l('Machines: turn on / turn off.', 'যন্ত্র: turn on / turn off।'), why: { open: l('"fan খোলা" translated; fans and lights are turned on.', '"fan খোলা" অনুবাদ; fan আর light turn on করা হয়।'), start: l('We start a car or a meeting, not a fan.', 'Car বা meeting start হয়, fan না।') } }),
        choice('ce-1-p4', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The price depends on the season.', 'The price is depend on the season.', 'The price is depending to the season.'], answer: 'The price depends on the season.', explanation: l('depend is a verb: depends on.', 'depend verb: depends on।'), why: { 'The price is depend on the season.': l('No "is" before the verb depend; use depends.', 'depend verb-এর আগে is লাগে না; depends লিখুন।'), 'The price is depending to the season.': l('depend takes on, and a fact uses the present simple: depends on.', 'depend-এর পরে on বসে, আর সাধারণ সত্যে present simple: depends on।') } }),
        choice('ce-1-p5', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Speaking Part 1: which answer is natural?', 'Speaking Part 1: কোন উত্তরটা স্বাভাবিক?'), options: ['I am from Rangpur, in the north of Bangladesh.', 'I am coming from Rangpur, in the north of Bangladesh.', 'My good home is Rangpur, in the north of Bangladesh.'], answer: 'I am from Rangpur, in the north of Bangladesh.', explanation: l('Origin: I am from / I come from.', 'কোথা থেকে: I am from / I come from।'), why: { 'I am coming from Rangpur, in the north of Bangladesh.': l('"am coming from" means you are travelling from there right now.', '"am coming from" মানে আপনি এখন সেখান থেকে আসছেন।'), 'My good home is Rangpur, in the north of Bangladesh.': l('"good" before home or name is translated politeness; English does not use it.', 'home বা name-এর আগে "good" অনুবাদ করা ভদ্রতা; English-এ এভাবে বলে না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ce-1-r1', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Write the natural verb.', 'স্বাভাবিক verb লিখুন।'), sentence: 'The doctor told me to ___ this medicine after meals.', accepted: ['take'], explanation: l('take medicine.', 'take medicine।') }),
        correct('ce-1-r2', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে লিখুন।'), sentence: 'I am agree with the writer.', accepted: ['I agree with the writer.'], explanation: l('agree is a verb: I agree.', 'agree verb: I agree।') }),
        spot('ce-1-r3', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('One word is translated from Bangla. Tap it and fix it.', 'একটা word বাংলা থেকে অনুবাদ করা। Tap করে ঠিক করুন।'), sentence: 'My brother gave his driving test yesterday.', wrong: 'gave', accepted: ['took'], explanation: l('Students take a test.', 'শিক্ষার্থী test take করেন।') }),
        correct('ce-1-r4', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Remove the translated word.', 'অনুবাদ করা word-টা মুছুন।'), sentence: 'My cousin sister is a nurse.', accepted: ['My cousin is a nurse.'], explanation: l('cousin, without brother / sister.', 'cousin, brother / sister ছাড়া।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ce-1-c1', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Which phrase is NOT natural English?', 'কোন phrase-টা স্বাভাবিক English না?'), options: ['eat medicine', 'take a photo', 'pass an exam'], answer: 'eat medicine', explanation: l('take medicine; eat is for food.', 'take medicine; eat খাবারের জন্য।') }),
        spot('ce-1-c2', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Please close the computer before you leave.', wrong: 'close', accepted: ['turn off', 'switch off', 'shut down'], fixOptions: ['turn off', 'open', 'break'], explanation: l('Machines: turn off (or shut down a computer).', 'যন্ত্র: turn off (computer-এর জন্য shut down-ও হয়)।') }),
        order('ce-1-c3', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'I completely agree with this view.', explanation: l('agree is the verb — no am.', 'agree-ই verb — am লাগে না।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: Speaking Part 1', 'এবার আপনার পালা: Speaking Part 1'),
      exercises: [
        write('ce-1-y1', 'ce-translation', {
          ...P,
          prompt: l('Answer in 3 sentences: "Where are you from, and what exams have you taken recently?" Use agree or depend once.', '৩টা sentence-এ উত্তর দিন: "Where are you from, and what exams have you taken recently?" একবার agree বা depend ব্যবহার করুন।'),
          model: 'I am from Bogura, a city in the north of Bangladesh. I took my HSC exams last year and I am preparing for IELTS now. My plans depend on my IELTS score.',
          checklist: [l('I am from / I come from', 'I am from / I come from'), l('take / sit an exam', 'take / sit an exam'), l('agree / depend as verbs (no am / is)', 'agree / depend verb হিসেবে (am / is ছাড়া)')],
          explanation: l('Natural phrases, not word-by-word Bangla.', 'স্বাভাবিক phrase, word ধরে বাংলা না।'),
          task: 'The student answers "Where are you from, and what exams have you taken recently?" in 3 sentences. Check only for phrases translated word by word from Bangla: "am/is agree", "is depend", "give/gave an exam" (take/sit), "eat medicine" (take), "open/close the light/fan/computer" (turn on/off), "cousin brother/sister" (cousin), "good name", "I am coming from" for origin (I am from / I come from). For each issue quote the words and give the natural English phrase.',
          target: l('Natural phrases, not translation', 'অনুবাদ না, স্বাভাবিক phrase'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('I agree · It depends on — no am / is.', 'I agree · It depends on — am / is ছাড়া।'),
        l('take an exam · take medicine · turn on the light.', 'take an exam · take medicine · turn on the light।'),
        l('cousin (no brother / sister) · I am from Khulna.', 'cousin (brother / sister ছাড়া) · I am from Khulna।'),
      ],
    },
  ],
};

// ======================================================================= ce-2
export const ceCountable: Lesson = {
  id: 'ce-2',
  format: 'v2',
  concept: 'ce-countable',
  title: l('Uncountable nouns', 'Uncountable noun'),
  why: l('"informations", "advices" and "researches" appear in almost every IELTS essay by Bangla speakers. Knowing about 15 uncountable nouns removes a whole group of errors.', '"informations", "advices" আর "researches" বাংলাভাষীদের প্রায় প্রতিটা IELTS essay-তে দেখা যায়। প্রায় ১৫টা uncountable noun জানলে পুরো এক দল ভুল চলে যায়।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('An email to a university', 'University-কে একটা email'),
      situation: l('You write: "Could you send me some informations about the course? I also need an advice about accommodation."', 'আপনি লিখলেন: "Could you send me some informations about the course? I also need an advice about accommodation."'),
      question: l('What is wrong?', 'কী ভুল?'),
      options: ['"informations" and "an advice"', 'Only "course"', 'Nothing'],
      answer: '"informations" and "an advice"',
      diagnose: {
        '"informations" and "an advice"': l('Right: information and advice are uncountable — no -s and no a / an. "some information … some advice".', 'ঠিক: information আর advice uncountable — -s নেই, a / an নেই। "some information … some advice"।'),
        'Only "course"': l('"the course" is fine. information and advice are uncountable: no -s, no an.', '"the course" ঠিক। information আর advice uncountable: -s না, an না।'),
        Nothing: l('Two errors: informations → information; an advice → some advice (or a piece of advice).', 'দুটো ভুল: informations → information; an advice → some advice (বা a piece of advice)।'),
      },
    },
    {
      kind: 'discover',
      title: l('Count or not?', 'গোনা যায় কি?'),
      items: [
        { en: 'two suggestions · some advice', note: l('suggestion counts; advice does not', 'suggestion গোনা যায়; advice না') },
        { en: 'three chairs · some furniture', note: l('chair counts; furniture is the whole group', 'chair গোনা যায়; furniture পুরো দল') },
        { en: 'two studies · much research', note: l('study counts; research is uncountable', 'study গোনা যায়; research uncountable') },
        { en: 'many cars · heavy traffic', note: l('cars count; traffic does not', 'car গোনা যায়; traffic না') },
      ],
      question: l('What do uncountable nouns never take?', 'Uncountable noun কখনো কী নেয় না?'),
      options: [
        l('A plural -s, a / an, or a number directly before them', 'Plural -s, a / an, বা সরাসরি আগে সংখ্যা'),
        l('The word "the"', '"the" word'),
        l('An adjective', 'কোনো adjective'),
      ],
      answer: 0,
      pattern: l('Uncountable: no -s, no a / an, no number. Use some / much / a lot of / a piece of: some information, a piece of advice, much research.', 'Uncountable: -s না, a / an না, সংখ্যা না। some / much / a lot of / a piece of ব্যবহার করুন: some information, a piece of advice, much research।'),
    },
    {
      kind: 'concept',
      title: l('The uncountable list', 'Uncountable-এর তালিকা'),
      body: l(
        'These nouns are uncountable in English, even when the idea feels countable. They take a singular verb.',
        'এই noun-গুলো English-এ uncountable, idea-টা গোনা যায় মনে হলেও। এগুলোর সাথে singular verb বসে।',
      ),
      points: [
        l('Learn this list: information, advice, knowledge, research, evidence, feedback, equipment, furniture, luggage (baggage), homework, news, traffic, progress, money, accommodation.', 'এই তালিকা শিখুন: information, advice, knowledge, research, evidence, feedback, equipment, furniture, luggage (baggage), homework, news, traffic, progress, money, accommodation।'),
        l('Singular verb: The news is good. · The information was useful. · Research shows that …', 'Singular verb: The news is good। · The information was useful। · Research shows that …'),
        l('Amounts: much / little / less / a lot of / some + uncountable; many / few / fewer + plural countable: much traffic, fewer cars.', 'পরিমাণ: much / little / less / a lot of / some + uncountable; many / few / fewer + plural countable: much traffic, fewer cars।'),
        l('To count them, add a unit: a piece of advice, two pieces of furniture, an item of news, a research study.', 'গুনতে হলে একটা unit যোগ করুন: a piece of advice, two pieces of furniture, an item of news, a research study।'),
        l('Why Bangla speakers slip: Bangla adds গুলো / সমূহ to almost any noun (তথ্যগুলো, উপদেশগুলো), so "informations" and "advices" feel natural. English decides countability by the word, not the idea.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় প্রায় যেকোনো noun-এ গুলো / সমূহ বসে (তথ্যগুলো, উপদেশগুলো), তাই "informations" আর "advices" স্বাভাবিক লাগে। English-এ গোনা যাবে কি না ঠিক করে word, idea না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'My teacher gave me some useful advice.', note: l('some + uncountable', 'some + uncountable') },
        { en: 'We bought new furniture for the flat.', note: l('no -s, no a', '-s না, a না') },
        { en: 'There is less traffic on Fridays.', note: l('less + uncountable, is', 'less + uncountable, is') },
        { en: 'Recent research shows that sleep improves memory.', note: l('research + shows (singular)', 'research + shows (singular)') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Research suggests that online learning can be effective.', note: l('Task 2: research, evidence, knowledge — never with -s.', 'Task 2: research, evidence, knowledge — কখনো -s না।') },
        { skill: 'listening', example: 'Students can leave their luggage at reception.', note: l('Listening: the answer word "luggage" never has -s.', 'Listening: উত্তরের word "luggage"-এ কখনো -s থাকে না।') },
        { skill: 'reading', example: 'The team collected evidence from 40 schools.', note: l('Reading: uncountable nouns take singular verbs — useful for checking grammar in gap-fill answers.', 'Reading: uncountable noun-এর সাথে singular verb — gap-fill উত্তর যাচাইয়ে কাজে লাগে।') },
        { skill: 'speaking', example: 'My parents always give me good advice.', note: l('Speaking Part 2: "a good advice" is a very common slip.', 'Speaking Part 2: "a good advice" খুব সাধারণ ভুল।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I need some informations.', right: 'I need some information.', why: l('information is uncountable.', 'information uncountable।') },
        { wrong: 'She gave me a good advice.', right: 'She gave me some good advice.', why: l('No a / an with advice.', 'advice-এর সাথে a / an না।') },
        { wrong: 'Many researches show this.', right: 'A lot of research shows this.', why: l('research: no -s; a lot of / much, not many; singular verb.', 'research: -s না; many না, a lot of / much; singular verb।') },
        { wrong: 'The news are bad today.', right: 'The news is bad today.', why: l('news looks plural but takes is.', 'news দেখতে plural, কিন্তু is নেয়।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ce-2-p1', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'The website has a lot of useful ___.', options: ['information', 'informations', 'an information'], answer: 'information', explanation: l('information: no -s, no an.', 'information: -s না, an না।'), why: { informations: l('information is uncountable — it never takes -s.', 'information uncountable — কখনো -s নেয় না।'), 'an information': l('No a / an with an uncountable noun.', 'Uncountable noun-এর সাথে a / an না।') } }),
        choice('ce-2-p2', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['We need some new furniture.', 'We need some new furnitures.', 'We need a new furniture.'], answer: 'We need some new furniture.', explanation: l('furniture: no -s, no a.', 'furniture: -s না, a না।'), why: { 'We need some new furnitures.': l('furniture is the whole group: no -s.', 'furniture পুরো দল: -s না।'), 'We need a new furniture.': l('Use a piece of furniture, or name the thing: a new table.', 'a piece of furniture বলুন, বা জিনিসটার নাম: a new table।') } }),
        choice('ce-2-p3', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'There is too ___ traffic in the city centre.', options: ['much', 'many', 'few'], answer: 'much', explanation: l('much + uncountable.', 'much + uncountable।'), why: { many: l('many is for plural countable nouns (many cars).', 'many plural countable noun-এর জন্য (many cars)।'), few: l('few is for plural countable nouns; with traffic use little.', 'few plural countable noun-এর জন্য; traffic-এর সাথে little।') } }),
        choice('ce-2-p4', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'The news about the exam dates ___ good.', options: ['is', 'are', 'were'], answer: 'is', explanation: l('news is uncountable → is.', 'news uncountable → is।'), why: { are: l('news ends in -s but is uncountable: singular verb.', 'news -s-এ শেষ, কিন্তু uncountable: singular verb।'), were: l('Plural verb again; and this is a present fact: is.', 'আবার plural verb; আর এটা বর্তমানের তথ্য: is।') } }),
        choice('ce-2-p5', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Task 2: which sentence is correct?', 'Task 2: কোন sentence-টা ঠিক?'), options: ['Scientific research has shown that exercise reduces stress.', 'Scientific researches have shown that exercise reduces stress.', 'A scientific research have shown that exercise reduces stress.'], answer: 'Scientific research has shown that exercise reduces stress.', explanation: l('research: uncountable + singular verb.', 'research: uncountable + singular verb।'), why: { 'Scientific researches have shown that exercise reduces stress.': l('research has no plural in academic English; use research has, or studies have.', 'Academic English-এ research-এর plural নেই; research has, বা studies have লিখুন।'), 'A scientific research have shown that exercise reduces stress.': l('No a with research, and the verb must be singular (a study has shown).', 'research-এর সাথে a না, আর verb singular (a study has shown)।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ce-2-r1', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Write the correct form of the word in brackets.', 'বন্ধনীর word-এর সঠিক form লিখুন।'), sentence: 'How much ___ (luggage) are you carrying?', base: 'luggage', accepted: ['luggage'], explanation: l('luggage: no -s.', 'luggage: -s না।') }),
        correct('ce-2-r2', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে লিখুন।'), sentence: 'My teacher gave me many useful advices.', accepted: ['My teacher gave me a lot of useful advice.', 'My teacher gave me lots of useful advice.', 'My teacher gave me much useful advice.', 'My teacher gave me some useful advice.', 'My teacher gave me useful advice.'], explanation: l('advice: no -s; a lot of / some, not many.', 'advice: -s না; many না, a lot of / some।') }),
        spot('ce-2-r3', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('One word is wrong. Tap it and fix it.', 'একটা word ভুল। Tap করে ঠিক করুন।'), sentence: 'The lab bought new equipments last year.', wrong: 'equipments', accepted: ['equipment'], explanation: l('equipment: no -s.', 'equipment: -s না।') }),
        gap('ce-2-r4', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Write much or many.', 'much বা many লিখুন।'), sentence: 'How ___ homework do you get every day?', accepted: ['much'], explanation: l('homework is uncountable → much.', 'homework uncountable → much।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ce-2-c1', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Which noun is countable?', 'কোন noun-টা countable?'), options: ['suggestion', 'knowledge', 'evidence'], answer: 'suggestion', explanation: l('a suggestion, two suggestions; knowledge and evidence are uncountable.', 'a suggestion, two suggestions; knowledge আর evidence uncountable।') }),
        spot('ce-2-c2', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Teachers should give students regular feedbacks on their writing.', wrong: 'feedbacks', accepted: ['feedback'], fixOptions: ['feedback', 'feedbackes', 'feeds'], explanation: l('feedback: no -s.', 'feedback: -s না।') }),
        order('ce-2-c3', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'She gave me a useful piece of advice.', explanation: l('a piece of + uncountable.', 'a piece of + uncountable।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: ask for help', 'এবার আপনার পালা: সাহায্য চান'),
      exercises: [
        write('ce-2-y1', 'ce-countable', {
          ...P,
          prompt: l('Write 3 sentences to a university asking for help before you arrive. Use at least two of: information, advice, accommodation, luggage, equipment.', 'পৌঁছানোর আগে সাহায্য চেয়ে একটা university-কে ৩টা sentence লিখুন। অন্তত দুটো ব্যবহার করুন: information, advice, accommodation, luggage, equipment।'),
          model: 'Could you send me some information about student accommodation? I would also like some advice about how much luggage I can bring. Is any lab equipment provided for first-year students?',
          checklist: [l('no -s on uncountable nouns', 'uncountable noun-এ -s না'), l('no a / an before them', 'এগুলোর আগে a / an না'), l('much / some / a lot of, and a singular verb', 'much / some / a lot of, আর singular verb')],
          explanation: l('Uncountable nouns stay singular.', 'Uncountable noun singular থাকে।'),
          task: 'The student writes 3 sentences asking a university for help before arrival. Check only countable/uncountable noun use: information, advice, knowledge, research, evidence, feedback, equipment, furniture, luggage, homework, news, traffic, progress, accommodation must have no plural -s and no a/an (a piece of advice is fine); they take much/little/less/some/a lot of (not many/few/fewer) and a singular verb. For each issue quote the words and give the fix.',
          target: l('Uncountable nouns', 'Uncountable noun'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('No -s, no a / an: information, advice, research, furniture, equipment, luggage, homework, news, feedback.', '-s না, a / an না: information, advice, research, furniture, equipment, luggage, homework, news, feedback।'),
        l('much / less / a lot of + uncountable; singular verb (research shows).', 'much / less / a lot of + uncountable; singular verb (research shows)।'),
        l('To count: a piece of advice, a research study.', 'গুনতে: a piece of advice, a research study।'),
      ],
    },
  ],
};

// ======================================================================= ce-3
export const cePlural: Lesson = {
  id: 'ce-3',
  format: 'v2',
  concept: 'ce-plural',
  title: l('Singular and plural after numbers and quantifiers', 'সংখ্যা আর quantifier-এর পরে singular/plural'),
  why: l('"two year", "many student" and "one of the best university" are some of the most frequent errors in Task 1 and Task 2. English marks the plural every time; Bangla often does not.', '"two year", "many student" আর "one of the best university" Task 1 আর Task 2-এর সবচেয়ে বেশি হওয়া ভুলগুলোর মধ্যে। English প্রতিবার plural চিহ্নিত করে; বাংলা প্রায়ই করে না।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 1 sentence', 'একটা Task 1 sentence'),
      situation: l('"Over the ten year period, the number of student in many country increased."', '"Over the ten year period, the number of student in many country increased."'),
      question: l('Which words need a plural -s?', 'কোন word-গুলোতে plural -s লাগবে?'),
      options: ['student and country', 'year, student and country', 'None'],
      answer: 'student and country',
      diagnose: {
        'student and country': l('Right: the number of students, in many countries. "a ten-year period" stays singular because "ten-year" describes the period (like an adjective).', 'ঠিক: the number of students, in many countries। "a ten-year period" singular থাকে, কারণ "ten-year" period-কে বর্ণনা করে (adjective-এর মতো)।'),
        'year, student and country': l('Almost: "ten-year period" is a describing phrase, so year has no -s there. But you are right about students and countries.', 'প্রায়: "ten-year period" বর্ণনার phrase, তাই সেখানে year-এ -s নেই। কিন্তু students আর countries ঠিক ধরেছেন।'),
        None: l('"the number of" and "many" need a plural noun: students, countries.', '"the number of" আর "many"-এর পরে plural noun: students, countries।'),
      },
    },
    {
      kind: 'discover',
      title: l('Which word decides?', 'কোন word ঠিক করে?'),
      items: [
        { en: 'two years · many students · several reasons', note: l('number / many / several → plural noun', 'সংখ্যা / many / several → plural noun') },
        { en: 'one of the best universities', note: l('one of the … → plural noun', 'one of the … → plural noun') },
        { en: 'every student · each country', note: l('every / each → singular noun', 'every / each → singular noun') },
        { en: 'a five-year plan · a 20-minute walk', note: l('number-noun before another noun → no -s', 'সংখ্যা-noun আরেকটা noun-এর আগে → -s না') },
      ],
      question: l('After "one of the …", which form do you use?', '"one of the …"-এর পরে কোন form?'),
      options: [
        l('Plural — you choose one from a group', 'Plural — একটা দল থেকে একটা বেছে নিচ্ছেন'),
        l('Singular — because of "one"', 'Singular — "one"-এর জন্য'),
        l('Either', 'যেকোনোটা'),
      ],
      answer: 0,
      pattern: l('Plural after numbers above one, many, several, a few, both, these / those, and one of the …; singular after a / an, one, every, each, another.', 'এক-এর বেশি সংখ্যা, many, several, a few, both, these / those, আর one of the …-এর পরে plural; a / an, one, every, each, another-এর পরে singular।'),
    },
    {
      kind: 'concept',
      title: l('Singular or plural: the signal words', 'Singular না plural: সংকেতের word'),
      body: l(
        'Look at the word before the noun. It tells you the form.',
        'Noun-এর আগের word দেখুন। সেটাই form বলে দেয়।',
      ),
      points: [
        l('Plural noun after: two / three …, many, several, a few, few, a number of, the number of, both, these, those, a lot of (countable), one of the … .', 'Plural noun যেগুলোর পরে: two / three …, many, several, a few, few, a number of, the number of, both, these, those, a lot of (countable), one of the … ।'),
        l('Singular noun after: a / an, one, each, every, another, this, that. Every student has … (singular verb too).', 'Singular noun যেগুলোর পরে: a / an, one, each, every, another, this, that। Every student has … (verb-ও singular)।'),
        l('Irregular plurals: people (not peoples for "persons"), children, men, women, criteria (one criterion), phenomena. A person, two people.', 'Irregular plural: people ("persons" অর্থে peoples না), children, men, women, criteria (one criterion), phenomena। A person, two people।'),
        l('Compound describers stay singular: a two-week course, a ten-year-old boy, a 5-kilometre road.', 'যৌগিক বর্ণনা singular থাকে: a two-week course, a ten-year-old boy, a 5-kilometre road।'),
        l('Why Bangla speakers slip: Bangla drops the plural after numbers and quantifiers — "দুই বছর", "অনেক ছাত্র" — the number already shows it. English still needs -s: two years, many students.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় সংখ্যা আর quantifier-এর পরে plural চিহ্ন বাদ যায় — "দুই বছর", "অনেক ছাত্র" — সংখ্যাই বুঝিয়ে দেয়। English-এ তবু -s লাগে: two years, many students।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'I have lived in Dhaka for six years.', note: l('six → years', 'six → years') },
        { en: 'Dhaka is one of the most crowded cities in the world.', note: l('one of the → cities', 'one of the → cities') },
        { en: 'Every child needs a safe place to play.', note: l('every → singular', 'every → singular') },
        { en: 'It is a two-hour journey by bus.', note: l('describer: two-hour, no -s', 'বর্ণনা: two-hour, -s না') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'The number of visitors rose over the five-year period.', note: l('Task 1: the number of + plural; five-year as a describer.', 'Task 1: the number of + plural; five-year বর্ণনা হিসেবে।') },
        { skill: 'listening', example: 'The course lasts twelve weeks.', note: l('Listening: a missing -s makes a form answer wrong ("12 week").', 'Listening: -s বাদ পড়লে form-এর উত্তর ভুল হয় ("12 week")।') },
        { skill: 'reading', example: 'One of the main reasons was the cost of land.', note: l('Reading: "one of the … reasons" — the subject is "one", so the verb is was.', 'Reading: "one of the … reasons" — subject "one", তাই verb was।') },
        { skill: 'speaking', example: 'I have two brothers and one sister.', note: l('Speaking Part 1: family and numbers — say the -s clearly.', 'Speaking Part 1: পরিবার আর সংখ্যা — -s স্পষ্ট করে বলুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I studied English for three year.', right: 'I studied English for three years.', why: l('three → plural.', 'three → plural।') },
        { wrong: 'It is one of the best university in Asia.', right: 'It is one of the best universities in Asia.', why: l('one of the → plural.', 'one of the → plural।') },
        { wrong: 'Every students must bring an ID card.', right: 'Every student must bring an ID card.', why: l('every → singular.', 'every → singular।') },
        { wrong: 'Many peoples use public transport.', right: 'Many people use public transport.', why: l('people is already plural.', 'people নিজেই plural।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ce-3-p1', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'My sister has lived in London for five ___.', options: ['years', 'year', 'year’s'], answer: 'years', explanation: l('five → plural: years.', 'five → plural: years।'), why: { year: l('"পাঁচ বছর" has no plural marker, but English needs -s after five.', '"পাঁচ বছর"-এ plural চিহ্ন নেই, কিন্তু English-এ five-এর পরে -s লাগে।'), 'year’s': l('An apostrophe shows possession, not a plural.', 'Apostrophe মালিকানা দেখায়, plural না।') } }),
        choice('ce-3-p2', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'Each ___ gets a certificate at the end.', options: ['student', 'students', 'studentes'], answer: 'student', explanation: l('each → singular.', 'each → singular।'), why: { students: l('each and every take a singular noun.', 'each আর every-এর পরে singular noun।'), studentes: l('Not an English plural; and each needs the singular.', 'এটা English plural না; আর each-এর পরে singular লাগে।') } }),
        choice('ce-3-p3', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Sylhet is one of the greenest regions in Bangladesh.', 'Sylhet is one of the greenest region in Bangladesh.', 'Sylhet is one of the greenest regions’ in Bangladesh.'], answer: 'Sylhet is one of the greenest regions in Bangladesh.', explanation: l('one of the … → plural.', 'one of the … → plural।'), why: { 'Sylhet is one of the greenest region in Bangladesh.': l('You choose one from a group of regions: plural.', 'অনেকগুলো region-এর দল থেকে একটা: plural।'), 'Sylhet is one of the greenest regions’ in Bangladesh.': l('No apostrophe: nothing is owned here.', 'Apostrophe না: এখানে কিছুর মালিকানা নেই।') } }),
        choice('ce-3-p4', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Choose the correct phrase.', 'সঠিক phrase বেছে নিন।'), sentence: 'The university offers a ___ English course before the degree starts.', options: ['six-week', 'six-weeks', 'six weeks'], answer: 'six-week', explanation: l('A number + noun describing another noun stays singular: a six-week course.', 'সংখ্যা + noun যখন আরেকটা noun-কে বর্ণনা করে, singular থাকে: a six-week course।'), why: { 'six-weeks': l('A describer before a noun never takes -s.', 'Noun-এর আগের বর্ণনায় কখনো -s বসে না।'), 'six weeks': l('After "a" and before "course" you need the describer: a six-week course. (The course lasts six weeks is also correct.)', '"a"-এর পরে আর "course"-এর আগে বর্ণনা লাগে: a six-week course। (The course lasts six weeks-ও ঠিক।)') } }),
        choice('ce-3-p5', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Task 1: which sentence is correct?', 'Task 1: কোন sentence-টা ঠিক?'), options: ['Both countries saw an increase in the number of tourists.', 'Both country saw an increase in the number of tourist.', 'Both countries saw an increase in the number of tourist.'], answer: 'Both countries saw an increase in the number of tourists.', explanation: l('both → plural; the number of → plural.', 'both → plural; the number of → plural।'), why: { 'Both country saw an increase in the number of tourist.': l('both and the number of both need plural nouns.', 'both আর the number of দুটোর পরেই plural noun।'), 'Both countries saw an increase in the number of tourist.': l('the number of + plural: tourists.', 'the number of + plural: tourists।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ce-3-r1', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Write the correct form of the word in brackets.', 'বন্ধনীর word-এর সঠিক form লিখুন।'), sentence: 'There are several ___ (reason) for this trend.', base: 'reason', accepted: ['reasons'], explanation: l('several → plural.', 'several → plural।') }),
        gap('ce-3-r2', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Write the plural of the word in brackets.', 'বন্ধনীর word-এর plural লিখুন।'), sentence: 'Two ___ (child) were playing in the park.', base: 'child', accepted: ['children'], explanation: l('child → children (irregular).', 'child → children (irregular)।') }),
        spot('ce-3-r3', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('One word is wrong. Tap it and fix it.', 'একটা word ভুল। Tap করে ঠিক করুন।'), sentence: 'Many country have introduced free healthcare.', wrong: 'country', accepted: ['countries'], explanation: l('many → plural: countries.', 'many → plural: countries।') }),
        correct('ce-3-r4', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে লিখুন।'), sentence: 'Every students in my class has a laptop.', accepted: ['Every student in my class has a laptop.', 'All students in my class have a laptop.', 'All the students in my class have a laptop.', 'All students in my class have laptops.'], explanation: l('every → singular noun and verb.', 'every → singular noun আর verb।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ce-3-c1', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Which phrase is correct?', 'কোন phrase-টা ঠিক?'), options: ['a ten-year-old boy', 'a ten-years-old boy', 'a ten years old boy'], answer: 'a ten-year-old boy', explanation: l('Describer before a noun: singular and hyphenated.', 'Noun-এর আগে বর্ণনা: singular, hyphen-সহ।') }),
        spot('ce-3-c2', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'The number of car on the roads has doubled.', wrong: 'car', accepted: ['cars'], fixOptions: ['cars', 'car’s', 'cares'], explanation: l('the number of + plural.', 'the number of + plural।') }),
        order('ce-3-c3', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'It is one of the oldest buildings in Dhaka.', explanation: l('one of the … + plural.', 'one of the … + plural।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: describe your city', 'এবার আপনার পালা: আপনার শহরের বর্ণনা'),
      exercises: [
        write('ce-3-y1', 'ce-plural', {
          ...P,
          prompt: l('Write 3 sentences about your city or town. Use a number, "one of the …", and every or each.', 'আপনার শহর বা এলাকা নিয়ে ৩টা sentence লিখুন। একটা সংখ্যা, "one of the …", আর every বা each ব্যবহার করুন।'),
          model: 'I have lived in Cumilla for fifteen years. It is one of the oldest cities in Bangladesh. Every neighbourhood has its own market.',
          checklist: [l('plural after numbers and many / several', 'সংখ্যা আর many / several-এর পরে plural'), l('one of the … + plural', 'one of the … + plural'), l('every / each + singular', 'every / each + singular')],
          explanation: l('The signal word decides the form.', 'সংকেতের word form ঠিক করে।'),
          task: 'The student writes 3 sentences about their city using a number, "one of the …" and every/each. Check only singular/plural noun forms: plural after numbers above one, many, several, a few, both, these/those, a number of, the number of and "one of the …"; singular after a/an, one, each, every, another; irregular plurals (people, children, women, criteria); compound describers stay singular (a two-week course, a ten-year-old). Also check that every/each takes a singular verb. For each issue quote the words and give the fix.',
          target: l('Singular and plural', 'Singular আর plural'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Numbers, many, several, both, one of the … → plural noun.', 'সংখ্যা, many, several, both, one of the … → plural noun।'),
        l('a / one / each / every / another → singular noun.', 'a / one / each / every / another → singular noun।'),
        l('a two-week course: describers never take -s; people, children are already plural.', 'a two-week course: বর্ণনায় কখনো -s না; people, children নিজেই plural।'),
      ],
    },
  ],
};

// ======================================================================= ce-4
export const ceCollocation: Lesson = {
  id: 'ce-4',
  format: 'v2',
  concept: 'ce-collocation',
  title: l('Collocations: make, do, take, have', 'Collocation: make, do, take, have'),
  why: l('"do a mistake", "make homework" and "strong rain" are understandable but sound wrong. Natural word partners (collocations) are a key part of the Lexical Resource score.', '"do a mistake", "make homework" আর "strong rain" বোঝা যায়, কিন্তু ভুল শোনায়। স্বাভাবিক word-জোড়া (collocation) Lexical Resource score-এর একটা মূল অংশ।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'speaking',
  steps: [
    {
      kind: 'hook',
      title: l('Talking about your day', 'আপনার দিনের কথা'),
      situation: l('You say: "In the evening I make my homework, and sometimes I do mistakes because I am tired."', 'আপনি বললেন: "In the evening I make my homework, and sometimes I do mistakes because I am tired."'),
      question: l('Which verbs should change?', 'কোন verb-গুলো বদলাতে হবে?'),
      options: ['make → do, do → make', 'Only make → do', 'Neither'],
      answer: 'make → do, do → make',
      diagnose: {
        'make → do, do → make': l('Right: do homework, make mistakes. Bangla uses করা for both, so the English partner has to be learned.', 'ঠিক: do homework, make mistakes। বাংলায় দুটোতেই "করা", তাই English জোড়াটা শিখে নিতে হয়।'),
        'Only make → do': l('Also: make mistakes (not do mistakes).', 'এছাড়া: make mistakes (do mistakes না)।'),
        Neither: l('Both are swapped: do homework, make mistakes.', 'দুটোই উল্টো: do homework, make mistakes।'),
      },
    },
    {
      kind: 'discover',
      title: l('One Bangla verb, four English verbs', 'একটা বাংলা verb, চারটা English verb'),
      items: [
        { en: 'make a mistake · make a decision · make money · make progress', note: l('make: create or produce something', 'make: কিছু তৈরি বা সৃষ্টি করা') },
        { en: 'do homework · do research · do exercise · do a course', note: l('do: activities, work and tasks', 'do: কাজ, কার্যকলাপ আর দায়িত্ব') },
        { en: 'take a photo · take a break · take notes · take part in', note: l('take: fixed phrases to learn', 'take: শিখে নেওয়ার মতো নির্দিষ্ট phrase') },
        { en: 'have breakfast · have a shower · have a problem · have fun', note: l('have: meals, experiences', 'have: খাবার, অভিজ্ঞতা') },
      ],
      question: l('How should you learn these?', 'এগুলো কীভাবে শিখবেন?'),
      options: [
        l('As word partners: learn the verb and noun together', 'Word-জোড়া হিসেবে: verb আর noun একসাথে শিখুন'),
        l('Translate করা each time', 'প্রতিবার "করা" অনুবাদ করুন'),
        l('Always use do', 'সবসময় do ব্যবহার করুন'),
      ],
      answer: 0,
      pattern: l('Learn collocations as chunks: make a decision, do research, take a break, have a problem. There is a tendency (make = create, do = tasks) but many must simply be learned.', 'Collocation একসাথে শিখুন: make a decision, do research, take a break, have a problem। একটা ঝোঁক আছে (make = তৈরি, do = কাজ), কিন্তু অনেকগুলো শুধু শিখে নিতে হয়।'),
    },
    {
      kind: 'concept',
      title: l('Verb and adjective partners', 'Verb আর adjective-এর জোড়া'),
      body: l(
        'A collocation is a pair of words that native speakers use together. The "wrong" partner is usually understood, but it marks the writing as unnatural.',
        'Collocation হলো দুটো word যা native speaker-রা একসাথে ব্যবহার করেন। "ভুল" জোড়াও সাধারণত বোঝা যায়, কিন্তু লেখাকে অস্বাভাবিক করে।',
      ),
      points: [
        l('make: a mistake, a decision, an effort, progress, money, a plan, a complaint, a difference.', 'make: a mistake, a decision, an effort, progress, money, a plan, a complaint, a difference।'),
        l('do: homework, research, exercise, business, damage, a job, your best, the shopping.', 'do: homework, research, exercise, business, damage, a job, your best, the shopping।'),
        l('take / pay / have: take a break, take part in, take care of · pay attention · have an effect on, have an impact on.', 'take / pay / have: take a break, take part in, take care of · pay attention · have an effect on, have an impact on।'),
        l('Adjectives: heavy rain / traffic (not strong), high price / high cost (not expensive price), strong wind, a serious problem, a big / significant increase, gain knowledge.', 'Adjective: heavy rain / traffic (strong না), high price / high cost (expensive price না), strong wind, a serious problem, a big / significant increase, gain knowledge।'),
        l('Why Bangla speakers slip: Bangla uses করা for make, do and take (ভুল করা, হোমওয়ার্ক করা, সিদ্ধান্ত নেওয়া), and "বেশি" for heavy, high and strong. One Bangla word has several English partners.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় make, do আর take সবকিছুতে "করা" (ভুল করা, হোমওয়ার্ক করা), আর heavy, high, strong সবকিছুতে "বেশি"। একটা বাংলা word-এর কয়েকটা English জোড়া।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'I made a decision to study abroad.', note: l('make a decision', 'make a decision') },
        { en: 'She does research on climate change.', note: l('do research', 'do research') },
        { en: 'Heavy rain caused long delays.', note: l('heavy rain', 'heavy rain') },
        { en: 'Social media has a strong effect on teenagers.', note: l('have an effect on', 'have an effect on') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Governments should take action to reduce air pollution.', note: l('Task 2: take action, make progress, have an impact on.', 'Task 2: take action, make progress, have an impact on।') },
        { skill: 'speaking', example: 'I usually take a short break every hour.', note: l('Speaking: natural collocations raise Lexical Resource.', 'Speaking: স্বাভাবিক collocation Lexical Resource বাড়ায়।') },
        { skill: 'listening', example: 'Students have to do a short course in first aid.', note: l('Listening: collocations help you predict the word after the verb.', 'Listening: collocation জানলে verb-এর পরের word আন্দাজ করা যায়।') },
        { skill: 'reading', example: 'The new policy made a significant difference to crime rates.', note: l('Reading: collocations are often paraphrased — made a difference = had an effect.', 'Reading: collocation প্রায়ই paraphrase হয় — made a difference = had an effect।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I did a big mistake.', right: 'I made a big mistake.', why: l('make a mistake.', 'make a mistake।') },
        { wrong: 'Students must make their homework.', right: 'Students must do their homework.', why: l('do homework.', 'do homework।') },
        { wrong: 'There was strong rain yesterday.', right: 'There was heavy rain yesterday.', why: l('heavy rain (strong wind).', 'heavy rain (strong wind)।') },
        { wrong: 'The price of rice is very expensive.', right: 'The price of rice is very high.', why: l('A price is high; a thing is expensive.', 'Price high হয়; জিনিস expensive।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ce-4-p1', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Everyone ___ mistakes when learning a language.', options: ['makes', 'does', 'takes'], answer: 'makes', explanation: l('make a mistake.', 'make a mistake।'), why: { does: l('"ভুল করা" → make a mistake, not do.', '"ভুল করা" → make a mistake, do না।'), takes: l('take does not go with mistakes.', 'take mistake-এর সাথে যায় না।') } }),
        choice('ce-4-p2', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'I ___ exercise three times a week.', options: ['do', 'make', 'play'], answer: 'do', explanation: l('do exercise.', 'do exercise।'), why: { make: l('Activities take do: do exercise, do homework.', 'কার্যকলাপে do: do exercise, do homework।'), play: l('play is for games and sports with a ball (play football).', 'play খেলা আর বল-খেলার জন্য (play football)।') } }),
        choice('ce-4-p3', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Choose the natural adjective.', 'স্বাভাবিক adjective বেছে নিন।'), sentence: 'We were late because of ___ traffic.', options: ['heavy', 'strong', 'big'], answer: 'heavy', explanation: l('heavy traffic.', 'heavy traffic।'), why: { strong: l('strong goes with wind, coffee, opinion — not traffic.', 'strong যায় wind, coffee, opinion-এর সাথে — traffic না।'), big: l('"big traffic" is not used; say heavy traffic.', '"big traffic" বলা হয় না; heavy traffic বলুন।') } }),
        choice('ce-4-p4', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Which sentence is natural?', 'কোন sentence-টা স্বাভাবিক?'), options: ['The cost of housing is very high in Dhaka.', 'The cost of housing is very expensive in Dhaka.', 'The cost of housing is very costly in Dhaka.'], answer: 'The cost of housing is very high in Dhaka.', explanation: l('A cost or price is high; a house is expensive.', 'Cost বা price high হয়; বাড়ি expensive।'), why: { 'The cost of housing is very expensive in Dhaka.': l('The cost itself is not expensive; it is high. Or: Housing is very expensive.', 'Cost নিজে expensive না; high। অথবা: Housing is very expensive।'), 'The cost of housing is very costly in Dhaka.': l('costly means expensive — the same problem, and it repeats the idea of cost.', 'costly মানে expensive — একই সমস্যা, আর cost-এর idea দুবার।') } }),
        choice('ce-4-p5', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Task 2: which sentence is natural?', 'Task 2: কোন sentence-টা স্বাভাবিক?'), options: ['Technology has a huge impact on the way we work.', 'Technology does a huge impact on the way we work.', 'Technology makes a huge impact to the way we work.'], answer: 'Technology has a huge impact on the way we work.', explanation: l('have an impact on.', 'have an impact on।'), why: { 'Technology does a huge impact on the way we work.': l('impact takes have (or make): have an impact on.', 'impact-এর সাথে have (বা make): have an impact on।'), 'Technology makes a huge impact to the way we work.': l('The preposition is on: an impact on something.', 'Preposition on: an impact on something।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ce-4-r1', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Write make or do in the correct form.', 'সঠিক form-এ make বা do লিখুন।'), sentence: 'She has ___ a lot of progress this term.', accepted: ['made'], explanation: l('make progress → has made.', 'make progress → has made।') }),
        gap('ce-4-r2', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Write the missing verb.', 'বাদ পড়া verb-টা লিখুন।'), sentence: 'Please ___ attention to the instructions.', accepted: ['pay'], explanation: l('pay attention.', 'pay attention।') }),
        spot('ce-4-r3', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('One word is the wrong partner. Tap it and fix it.', 'একটা word ভুল জোড়া। Tap করে ঠিক করুন।'), sentence: 'We need to do a decision by Friday.', wrong: 'do', accepted: ['make'], explanation: l('make a decision (take a decision is also used in British English).', 'make a decision (British English-এ take a decision-ও চলে)।') }),
        correct('ce-4-r4', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Rewrite with the natural adjective.', 'স্বাভাবিক adjective দিয়ে আবার লিখুন।'), sentence: 'Strong rain flooded the streets.', accepted: ['Heavy rain flooded the streets.'], explanation: l('heavy rain.', 'heavy rain।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ce-4-c1', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Which collocation is wrong?', 'কোন collocation-টা ভুল?'), options: ['do a photo', 'take a break', 'do research'], answer: 'do a photo', explanation: l('take a photo.', 'take a photo।') }),
        spot('ce-4-c2', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Many students make part-time jobs to pay their fees.', wrong: 'make', accepted: ['do', 'have'], fixOptions: ['do', 'take', 'give'], explanation: l('do (or have) a job.', 'do (বা have) a job।') }),
        order('ce-4-c3', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Young people should take part in community work.', explanation: l('take part in.', 'take part in।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your study routine', 'এবার আপনার পালা: আপনার পড়ার রুটিন'),
      exercises: [
        write('ce-4-y1', 'ce-collocation', {
          ...P,
          prompt: l('Write 3 sentences about how you study English. Use at least three collocations: make / do / take / have / pay + a noun.', 'আপনি কীভাবে English পড়েন তা নিয়ে ৩টা sentence লিখুন। অন্তত তিনটা collocation ব্যবহার করুন: make / do / take / have / pay + noun।'),
          model: 'I do a practice test every Saturday and take notes on my mistakes. I have made a lot of progress in Listening this year. When I feel tired, I take a short break.',
          checklist: [l('make: mistakes, decisions, progress', 'make: mistake, decision, progress'), l('do: homework, research, exercise, a test', 'do: homework, research, exercise, a test'), l('take / have / pay: a break, notes, attention', 'take / have / pay: a break, notes, attention')],
          explanation: l('Learn the verb and noun as one chunk.', 'Verb আর noun একসাথে একটা chunk হিসেবে শিখুন।'),
          task: 'The student writes 3 sentences about how they study English using collocations. Check only collocations: make (a mistake, a decision, progress, an effort, money, a plan), do (homework, research, exercise, a course, a job, a test), take (a break, notes, a photo, part in, action), have (an effect/impact on, a problem, breakfast), pay attention; adjective partners (heavy rain/traffic, high price/cost, strong wind, a serious problem). Flag translated partners from Bangla করা/নেওয়া/বেশি. For each issue quote the words and give the natural collocation.',
          target: l('Natural collocations', 'স্বাভাবিক collocation'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('make a mistake / decision / progress · do homework / research / exercise.', 'make a mistake / decision / progress · do homework / research / exercise।'),
        l('take a break / notes / part in · pay attention · have an effect on.', 'take a break / notes / part in · pay attention · have an effect on।'),
        l('heavy rain / traffic · high price / cost · strong wind.', 'heavy rain / traffic · high price / cost · strong wind।'),
      ],
    },
  ],
};

// ======================================================================= ce-5
export const ceWordPairs: Lesson = {
  id: 'ce-5',
  format: 'v2',
  concept: 'ce-word-pair',
  title: l('Confusing word pairs', 'যে word জোড়াগুলো গুলিয়ে যায়'),
  why: l('One Bangla verb often covers two English verbs: বলা (say / tell), ধার (lend / borrow), শেখা (learn / teach), শোনা (hear / listen). Choosing the wrong one changes the meaning.', 'একটা বাংলা verb প্রায়ই দুটো English verb বোঝায়: বলা (say / tell), ধার (lend / borrow), শেখা (learn / teach), শোনা (hear / listen)। ভুলটা বাছলে অর্থ বদলে যায়।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A message to a friend', 'বন্ধুকে একটা message'),
      situation: l('You write: "Can you borrow me your notes? My teacher said me that the test is on Monday."', 'আপনি লিখলেন: "Can you borrow me your notes? My teacher said me that the test is on Monday."'),
      question: l('Which verbs should change?', 'কোন verb-গুলো বদলাতে হবে?'),
      options: ['borrow → lend, said → told', 'Only said → told', 'Only borrow → lend'],
      answer: 'borrow → lend, said → told',
      diagnose: {
        'borrow → lend, said → told': l('Right: "Can you lend me your notes? My teacher told me that …". You borrow FROM someone; they lend TO you. tell + person, say + words.', 'ঠিক: "Can you lend me your notes? My teacher told me that …"। আপনি কারো কাছ থেকে borrow করেন; সে আপনাকে lend করে। tell + মানুষ, say + কথা।'),
        'Only said → told': l('Also: your friend lends; you borrow. "Can you lend me …?"', 'এছাড়া: বন্ধু lend করে; আপনি borrow করেন। "Can you lend me …?"'),
        'Only borrow → lend': l('Also: said me → told me. say does not take a person directly.', 'এছাড়া: said me → told me। say-এর পরে সরাসরি মানুষ বসে না।'),
      },
    },
    {
      kind: 'discover',
      title: l('Who does what?', 'কে কী করে?'),
      items: [
        { en: 'I borrowed a pen from Sami. · Sami lent me a pen.', note: l('borrow = take for a while; lend = give for a while', 'borrow = কিছু সময়ের জন্য নেওয়া; lend = কিছু সময়ের জন্য দেওয়া') },
        { en: 'She told me the answer. · She said that it was easy.', note: l('tell + person; say + words', 'tell + মানুষ; say + কথা') },
        { en: 'I learned French. · My aunt taught me French.', note: l('learn = get knowledge; teach = give it', 'learn = জ্ঞান নেওয়া; teach = জ্ঞান দেওয়া') },
        { en: 'I heard a noise. · I listened to the radio.', note: l('hear = it reaches you; listen to = you pay attention', 'hear = কানে আসে; listen to = মন দিয়ে শোনা') },
      ],
      question: l('What is the difference inside most of these pairs?', 'বেশিরভাগ জোড়ার ভেতরে পার্থক্যটা কী?'),
      options: [
        l('The direction: giving or receiving, deliberate or not', 'দিক: দেওয়া না নেওয়া, ইচ্ছাকৃত কি না'),
        l('One is formal and one is informal', 'একটা formal, একটা informal'),
        l('There is no difference', 'কোনো পার্থক্য নেই'),
      ],
      answer: 0,
      pattern: l('Ask: who gives and who receives? lend / teach / tell = give; borrow / learn = receive. Deliberate: listen, look at, watch; not deliberate: hear, see.', 'জিজ্ঞেস করুন: কে দেয়, কে নেয়? lend / teach / tell = দেওয়া; borrow / learn = নেওয়া। ইচ্ছাকৃত: listen, look at, watch; অনিচ্ছাকৃত: hear, see।'),
    },
    {
      kind: 'concept',
      title: l('The six pairs to know', 'যে ছয়টা জোড়া জানতে হবে'),
      body: l(
        'Each pair has a simple test. Use it every time you are unsure.',
        'প্রতিটা জোড়ার একটা সহজ পরীক্ষা আছে। নিশ্চিত না হলে প্রতিবার ব্যবহার করুন।',
      ),
      points: [
        l('say / tell: tell + person (tell me, told the students); say + words or say to + person (She said that …; He said hello to me).', 'say / tell: tell + মানুষ (tell me, told the students); say + কথা বা say to + মানুষ (She said that …; He said hello to me)।'),
        l('lend / borrow: lend something TO someone; borrow something FROM someone. "Can you lend me …?" / "Can I borrow …?"', 'lend / borrow: কাউকে কিছু lend করা; কারো কাছ থেকে borrow করা। "Can you lend me …?" / "Can I borrow …?"'),
        l('learn / teach: you learn (from someone); someone teaches you. Not "He learned me English".', 'learn / teach: আপনি learn করেন (কারো কাছ থেকে); কেউ আপনাকে teach করেন। "He learned me English" না।'),
        l('rise / raise: rise has no object (Prices rose); raise needs one (The government raised taxes). Essential for Task 1.', 'rise / raise: rise-এর object নেই (Prices rose); raise-এর object লাগে (The government raised taxes)। Task 1-এ খুব দরকারি।'),
        l('hear / listen to, see / watch / look at, lose / miss: lose an object or a game; miss a bus, a class or a person.', 'hear / listen to, see / watch / look at, lose / miss: জিনিস বা খেলা lose; bus, class বা মানুষ miss।'),
        l('Why Bangla speakers slip: Bangla has one verb for each pair — বলা, ধার, শেখা, শোনা, দেখা, হারানো — and shows the direction with other words (দেওয়া / নেওয়া). English puts the direction inside the verb.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় প্রতিটা জোড়ার জন্য একটা verb — বলা, ধার, শেখা, শোনা, দেখা, হারানো — আর দিক বোঝায় অন্য word দিয়ে (দেওয়া / নেওয়া)। English-এ দিকটা verb-এর ভেতরেই থাকে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'Could you tell me the way to the library?', note: l('tell + me', 'tell + me') },
        { en: 'My uncle taught me how to swim.', note: l('teach someone', 'teach someone') },
        { en: 'Unemployment rose by 3% in 2020.', note: l('rise: no object', 'rise: object নেই') },
        { en: 'I missed the bus, so I was late.', note: l('miss a bus', 'miss a bus') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'The price of petrol rose sharply, so the government raised fares.', note: l('Task 1 and 2: rise (no object) vs raise (object).', 'Task 1 আর 2: rise (object নেই) বনাম raise (object)।') },
        { skill: 'speaking', example: 'My grandmother taught me to cook.', note: l('Speaking Part 2: learn / teach is the most common slip.', 'Speaking Part 2: learn / teach সবচেয়ে সাধারণ ভুল।') },
        { skill: 'listening', example: 'Students can borrow up to five books from the library.', note: l('Listening: borrow from the library — the speaker tells you who gives.', 'Listening: library থেকে borrow — speaker বলে দেন কে দেয়।') },
        { skill: 'reading', example: 'Farmers were told to raise the price of milk.', note: l('Reading: the direction in the verb decides True or False.', 'Reading: verb-এর দিকই True না False ঠিক করে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'He said me to wait.', right: 'He told me to wait.', why: l('tell + person.', 'tell + মানুষ।') },
        { wrong: 'Can you borrow me 100 taka?', right: 'Can you lend me 100 taka?', why: l('The giver lends.', 'যে দেয় সে lend করে।') },
        { wrong: 'My mother learned me to read.', right: 'My mother taught me to read.', why: l('The giver teaches.', 'যে শেখান তিনি teach করেন।') },
        { wrong: 'The number of users raised in 2019.', right: 'The number of users rose in 2019.', why: l('No object → rise / rose.', 'Object নেই → rise / rose।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ce-5-p1', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Could you ___ me your dictionary for a minute?', options: ['lend', 'borrow', 'give back'], answer: 'lend', explanation: l('The friend gives for a while → lend.', 'বন্ধু কিছু সময়ের জন্য দেয় → lend।'), why: { borrow: l('You borrow; the other person lends. "Can I borrow your dictionary?"', 'আপনি borrow করেন; অন্যজন lend করে। "Can I borrow your dictionary?"'), 'give back': l('give back means return something you already have.', 'give back মানে যা আপনার কাছে আছে তা ফেরত দেওয়া।') } }),
        choice('ce-5-p2', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'The receptionist ___ us that the room was ready.', options: ['told', 'said', 'spoke'], answer: 'told', explanation: l('tell + person (us).', 'tell + মানুষ (us)।'), why: { said: l('say is not followed directly by a person; "said that the room was ready" or "told us".', 'say-এর পরে সরাসরি মানুষ বসে না; "said that …" বা "told us"।'), spoke: l('speak does not introduce what someone said.', 'speak কারো বলা কথা উদ্ধৃত করে না।') } }),
        choice('ce-5-p3', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'Mr Rahman ___ us maths in Class 9.', options: ['taught', 'learned', 'studied'], answer: 'taught', explanation: l('The teacher gives knowledge → taught.', 'শিক্ষক জ্ঞান দেন → taught।'), why: { learned: l('We learned from him; he taught us.', 'আমরা তাঁর কাছ থেকে learn করেছি; তিনি আমাদের teach করেছেন।'), studied: l('studied has no person object; "We studied maths with him."', 'studied-এর পরে মানুষ object বসে না; "We studied maths with him."') } }),
        choice('ce-5-p4', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Task 1: choose the correct verb.', 'Task 1: সঠিক verb বেছে নিন।'), sentence: 'The average temperature ___ by two degrees between 1990 and 2020.', options: ['rose', 'raised', 'was risen'], answer: 'rose', explanation: l('No object → rise / rose.', 'Object নেই → rise / rose।'), why: { raised: l('raise needs an object (raised prices); a temperature rises by itself.', 'raise-এর object লাগে (raised prices); temperature নিজে থেকে rise করে।'), 'was risen': l('rise has no passive; use rose.', 'rise-এর passive নেই; rose লিখুন।') } }),
        choice('ce-5-p5', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['I missed my class because the bus was late.', 'I lost my class because the bus was late.', 'I missed my phone on the bus.'], answer: 'I missed my class because the bus was late.', explanation: l('miss a class; lose a phone.', 'class miss; phone lose।'), why: { 'I lost my class because the bus was late.': l('You miss an event you do not attend; lose is for objects or games.', 'যে ঘটনায় উপস্থিত হননি তা miss; lose জিনিস বা খেলার জন্য।'), 'I missed my phone on the bus.': l('A phone you cannot find is lost: I lost my phone.', 'খুঁজে না পাওয়া phone lost: I lost my phone।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ce-5-r1', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Write say or tell in the correct form.', 'সঠিক form-এ say বা tell লিখুন।'), sentence: 'She ___ goodbye and left.', accepted: ['said'], explanation: l('say + words: said goodbye.', 'say + কথা: said goodbye।') }),
        gap('ce-5-r2', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Write the past form of rise or raise.', 'rise বা raise-এর past form লিখুন।'), sentence: 'The company ___ salaries by 5% last year.', accepted: ['raised'], explanation: l('Object (salaries) → raise / raised.', 'Object (salaries) → raise / raised।') }),
        spot('ce-5-r3', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('One verb is the wrong one of the pair. Tap it and fix it.', 'একটা verb জোড়ার ভুলটা। Tap করে ঠিক করুন।'), sentence: 'My cousin learned me how to drive.', wrong: 'learned', accepted: ['taught'], explanation: l('The giver teaches → taught.', 'যিনি শেখান তিনি teach করেন → taught।') }),
        correct('ce-5-r4', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে লিখুন।'), sentence: 'Can you borrow me your charger?', accepted: ['Can you lend me your charger?', 'Could you lend me your charger?', 'Can I borrow your charger?'], explanation: l('lend me … / Can I borrow …?', 'lend me … / Can I borrow …?') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ce-5-c1', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['I heard a strange noise last night.', 'I listened a strange noise last night.', 'I listened to a strange noise suddenly.'], answer: 'I heard a strange noise last night.', explanation: l('A sound reaches you without trying → hear.', 'চেষ্টা ছাড়াই শব্দ কানে আসে → hear।') }),
        spot('ce-5-c2', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'The number of students raised steadily after 2015.', wrong: 'raised', accepted: ['rose', 'increased', 'grew'], fixOptions: ['rose', 'risen', 'raise'], explanation: l('No object → rose.', 'Object নেই → rose।') }),
        order('ce-5-c3', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'My teacher told me to practise every day.', explanation: l('tell + person + to + verb.', 'tell + মানুষ + to + verb।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: someone who taught you', 'এবার আপনার পালা: যিনি আপনাকে শিখিয়েছেন'),
      exercises: [
        write('ce-5-y1', 'ce-word-pair', {
          ...P,
          prompt: l('Speaking Part 2 notes: write 3 sentences about a person who taught you something useful. Use teach / learn and say / tell.', 'Speaking Part 2 note: এমন একজনকে নিয়ে ৩টা sentence লিখুন যিনি আপনাকে কাজের কিছু শিখিয়েছেন। teach / learn আর say / tell ব্যবহার করুন।'),
          model: 'My older cousin taught me how to use a computer when I was twelve. I learned very quickly because she was patient. She always told me not to be afraid of making mistakes.',
          checklist: [l('teach = give, learn = receive', 'teach = দেওয়া, learn = নেওয়া'), l('tell + person, say + words', 'tell + মানুষ, say + কথা'), l('lend / borrow, rise / raise if you use them', 'ব্যবহার করলে lend / borrow, rise / raise')],
          explanation: l('Put the direction inside the verb.', 'দিকটা verb-এর ভেতরে রাখুন।'),
          task: 'The student writes 3 sentences about a person who taught them something, using teach/learn and say/tell. Check only confusing verb pairs: teach (give knowledge, "taught me") vs learn (receive, "learned from"); tell + person vs say + words / say to + person; lend (give) vs borrow (take from); rise (no object) vs raise (object); hear vs listen to; see vs watch / look at; lose (objects) vs miss (events, transport, people). Also flag "teached" (taught). For each issue quote the words and give the fix.',
          target: l('Confusing word pairs', 'গুলিয়ে যাওয়া word-জোড়া'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('tell + person · say + words · lend TO · borrow FROM.', 'tell + মানুষ · say + কথা · lend TO · borrow FROM।'),
        l('teach someone · learn from someone.', 'teach someone · learn from someone।'),
        l('rise (no object) · raise something · lose a thing · miss a bus / class.', 'rise (object নেই) · raise something · জিনিস lose · bus / class miss।'),
      ],
    },
  ],
};

// ======================================================================= ce-6
export const ceNatural: Lesson = {
  id: 'ce-6',
  format: 'v2',
  concept: 'ce-natural',
  title: l('Repetition and natural phrasing', 'Repetition আর স্বাভাবিক phrasing'),
  why: l('"return back", "discuss about" and "more better" say the same thing twice. Removing extra words makes your English cleaner and more natural — and saves words in the exam.', '"return back", "discuss about" আর "more better" একই কথা দুবার বলে। বাড়তি word বাদ দিলে English পরিষ্কার আর স্বাভাবিক হয় — আর exam-এ word বাঁচে।'),
  minutes: 12,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 2 introduction', 'একটা Task 2 introduction'),
      situation: l('"In this essay I will discuss about why many students return back home after studying abroad. The main reason is because salaries are more better at home."', '"In this essay I will discuss about why many students return back home after studying abroad. The main reason is because salaries are more better at home."'),
      question: l('How many words should be removed?', 'কয়টা word বাদ দিতে হবে?'),
      options: ['4 (about, back, because → that, more)', '1', 'None — it is formal'],
      answer: '4 (about, back, because → that, more)',
      diagnose: {
        '4 (about, back, because → that, more)': l('Right: discuss why · return home · The main reason is that · better. Each extra word repeats an idea already in the sentence.', 'ঠিক: discuss why · return home · The main reason is that · better। প্রতিটা বাড়তি word sentence-এ আগেই থাকা idea আবার বলে।'),
        '1': l('More: discuss already includes "about", return already means go back, reason already means because, and better is already a comparative.', 'আরও: discuss-এর ভেতরেই "about", return মানেই ফিরে যাওয়া, reason মানেই because, আর better নিজেই comparative।'),
        'None — it is formal': l('Formal does not mean more words. Examiners see these as errors: discuss about, return back, the reason is because, more better.', 'Formal মানে বেশি word না। Examiner এগুলো ভুল হিসেবে দেখেন: discuss about, return back, the reason is because, more better।'),
      },
    },
    {
      kind: 'discover',
      title: l('Saying it once', 'একবার বলা'),
      items: [
        { en: 'return back → return · repeat again → repeat', note: l('re- already means back / again', 're- মানেই back / again') },
        { en: 'discuss about → discuss · emphasise on → emphasise', note: l('these verbs take an object directly', 'এই verb-গুলো সরাসরি object নেয়') },
        { en: 'more better → better · most biggest → biggest', note: l('one comparative marker only', 'comparative চিহ্ন একটাই') },
        { en: 'Smartphones are useful. Smartphones are cheap. → Smartphones are useful, and they are cheap.', note: l('repeated noun → it / they / this', 'একই noun বারবার → it / they / this') },
      ],
      question: l('What do all these corrections do?', 'এই সব সংশোধন কী করে?'),
      options: [
        l('Remove words that repeat an idea already in the sentence', 'Sentence-এ আগেই থাকা idea আবার বলা word বাদ দেয়'),
        l('Make the sentences more formal by adding words', 'Word যোগ করে sentence বেশি formal করে'),
        l('Change the meaning', 'অর্থ বদলে দেয়'),
      ],
      answer: 0,
      pattern: l('Say it once: re- verbs without back / again, discuss / emphasise / mention without about / on, one comparative, and pronouns instead of repeated nouns.', 'একবার বলুন: re- verb-এর সাথে back / again না, discuss / emphasise / mention-এর সাথে about / on না, comparative একটা, আর বারবার noun-এর বদলে pronoun।'),
    },
    {
      kind: 'concept',
      title: l('Four kinds of repetition', 'চার রকম repetition'),
      body: l(
        'Natural English avoids saying the same idea twice in one phrase, and avoids repeating the same noun in every sentence.',
        'স্বাভাবিক English একই phrase-এ একই idea দুবার বলে না, আর প্রতিটা sentence-এ একই noun বারবার ব্যবহার করে না।',
      ),
      points: [
        l('Double meaning: return back, repeat again, revert back, reply back, the reason is because (→ the reason is that / … because …), each and every, free of cost (→ free).', 'দুবার অর্থ: return back, repeat again, revert back, reply back, the reason is because (→ the reason is that / … because …), each and every, free of cost (→ free)।'),
        l('Extra prepositions: discuss about, emphasise on, mention about, enter into a room, reach to a place, attend to a class → discuss it, emphasise it, mention it, enter the room, reach Dhaka, attend a class.', 'বাড়তি preposition: discuss about, emphasise on, mention about, enter into a room, reach to a place, attend to a class → discuss it, emphasise it, mention it, enter the room, reach Dhaka, attend a class।'),
        l('Double comparatives: more better, more easier, most biggest → better, easier, biggest.', 'দ্বিগুণ comparative: more better, more easier, most biggest → better, easier, biggest।'),
        l('Repeated nouns: after the first mention, use it / they / this / these + a new noun, or a synonym: Online courses … They … This flexibility …', 'বারবার noun: প্রথমবারের পরে it / they / this / these + নতুন noun, বা synonym ব্যবহার করুন: Online courses … They … This flexibility …'),
        l('Why Bangla speakers slip: Bangla naturally doubles for emphasis (ফিরে আসা = come back, আবার বলা), uses নিয়ে / সম্পর্কে after আলোচনা (discuss about), and বেশি ভালো (more good → more better). The Bangla pattern feels complete, so the English repetition goes unnoticed.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় জোর দিতে দ্বিগুণ বলা স্বাভাবিক (ফিরে আসা, আবার বলা), আলোচনা-র পরে নিয়ে / সম্পর্কে বসে (discuss about), আর "বেশি ভালো" (more better)। বাংলা গঠন সম্পূর্ণ লাগে, তাই English-এ repetition চোখে পড়ে না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'We discussed the problem in class.', note: l('discuss + object', 'discuss + object') },
        { en: 'She returned to Bangladesh in 2022.', note: l('return, no back', 'return, back না') },
        { en: 'Online study is cheaper, and it is more flexible.', note: l('one comparative each; it instead of the noun', 'প্রতিটায় একটা comparative; noun-এর বদলে it') },
        { en: 'The main reason is that housing is expensive.', note: l('reason … that', 'reason … that') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'This essay will discuss both views. These views …', note: l('Task 2: discuss without about; this / these to avoid repeating nouns.', 'Task 2: about ছাড়া discuss; noun বারবার না বলতে this / these।') },
        { skill: 'speaking', example: 'Could you repeat the question, please?', note: l('Speaking: "repeat again" is a very common slip when asking the examiner.', 'Speaking: examiner-কে বলার সময় "repeat again" খুব সাধারণ ভুল।') },
        { skill: 'listening', example: 'The tour returns to the main gate at four.', note: l('Listening: speakers use single verbs (returns), so predict them.', 'Listening: speaker-রা একক verb বলেন (returns), তাই আগে থেকে আন্দাজ করুন।') },
        { skill: 'reading', example: 'Researchers studied 200 families. They found that …', note: l('Reading: they / this refer back — find what they replace to answer questions.', 'Reading: they / this আগের কিছুকে বোঝায় — উত্তর দিতে খুঁজুন কাকে বোঝাচ্ছে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'We discussed about the plan.', right: 'We discussed the plan.', why: l('discuss + object, no about.', 'discuss + object, about না।') },
        { wrong: 'He returned back to Dhaka.', right: 'He returned to Dhaka.', why: l('return already means go back.', 'return মানেই ফিরে যাওয়া।') },
        { wrong: 'Trains are more faster than buses.', right: 'Trains are faster than buses.', why: l('faster is already comparative.', 'faster নিজেই comparative।') },
        { wrong: 'The reason is because it is cheap.', right: 'The reason is that it is cheap.', why: l('reason already means because.', 'reason মানেই because।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ce-6-p1', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Which sentence is natural?', 'কোন sentence-টা স্বাভাবিক?'), options: ['Could you repeat that, please?', 'Could you repeat that again, please?', 'Could you repeat back that, please?'], answer: 'Could you repeat that, please?', explanation: l('repeat already means say again.', 'repeat মানেই আবার বলা।'), why: { 'Could you repeat that again, please?': l('"আবার বলুন" → repeat; again doubles the idea.', '"আবার বলুন" → repeat; again idea-টা দুবার বলে।'), 'Could you repeat back that, please?': l('No back after repeat.', 'repeat-এর পরে back না।') } }),
        choice('ce-6-p2', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Choose the correct option.', 'সঠিক option বেছে নিন।'), sentence: 'In this essay, I will ___ the advantages of city life.', options: ['discuss', 'discuss about', 'discuss on'], answer: 'discuss', explanation: l('discuss + object directly.', 'discuss + সরাসরি object।'), why: { 'discuss about': l('"নিয়ে আলোচনা" → discuss; no about.', '"নিয়ে আলোচনা" → discuss; about না।'), 'discuss on': l('discuss takes no preposition.', 'discuss-এর পরে preposition বসে না।') } }),
        choice('ce-6-p3', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'Living in a village is ___ than living in Dhaka.', options: ['quieter', 'more quieter', 'most quieter'], answer: 'quieter', explanation: l('One comparative: quieter.', 'Comparative একটা: quieter।'), why: { 'more quieter': l('quieter already has -er; do not add more.', 'quieter-এ আগেই -er; more যোগ করবেন না।'), 'most quieter': l('most is for superlatives; one marker only.', 'most superlative-এর জন্য; চিহ্ন একটাই।') } }),
        choice('ce-6-p4', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The reason is that public transport is unreliable.', 'The reason is because public transport is unreliable.', 'The reason why is because public transport is unreliable.'], answer: 'The reason is that public transport is unreliable.', explanation: l('reason … that.', 'reason … that।'), why: { 'The reason is because public transport is unreliable.': l('reason and because say the same thing; use that.', 'reason আর because একই কথা বলে; that লিখুন।'), 'The reason why is because public transport is unreliable.': l('Three reason-words; say it once: The reason is that …', 'তিনটা কারণ-word; একবার বলুন: The reason is that …') } }),
        choice('ce-6-p5', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Task 2: which version sounds most natural?', 'Task 2: কোনটা সবচেয়ে স্বাভাবিক?'), options: ['Online courses are cheap. They are also flexible.', 'Online courses are cheap. Online courses are also flexible.', 'Online courses are cheap. Online courses they are also flexible.'], answer: 'Online courses are cheap. They are also flexible.', explanation: l('After the first mention, use they.', 'প্রথমবারের পরে they।'), why: { 'Online courses are cheap. Online courses are also flexible.': l('Repeating the same noun sounds mechanical; use they.', 'একই noun বারবার বললে যান্ত্রিক শোনায়; they লিখুন।'), 'Online courses are cheap. Online courses they are also flexible.': l('A noun and a pronoun for the same subject: keep one.', 'একই subject-এর জন্য noun আর pronoun দুটোই: একটা রাখুন।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        correct('ce-6-r1', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Remove the extra word.', 'বাড়তি word-টা মুছুন।'), sentence: 'My brother returned back from Malaysia last week.', accepted: ['My brother returned from Malaysia last week.', 'My brother came back from Malaysia last week.'], explanation: l('return, no back.', 'return, back না।') }),
        correct('ce-6-r2', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Remove the extra word.', 'বাড়তি word-টা মুছুন।'), sentence: 'The teacher emphasised on the importance of planning.', accepted: ['The teacher emphasised the importance of planning.', 'The teacher emphasized the importance of planning.', 'The teacher put emphasis on the importance of planning.'], explanation: l('emphasise + object.', 'emphasise + object।') }),
        spot('ce-6-r3', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('One word breaks this sentence. Tap it and fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'The main reason is because rents are high.', wrong: 'because', accepted: ['that'], explanation: l('The reason is that …', 'The reason is that …') }),
        gap('ce-6-r4', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Write the correct comparative of the word in brackets (one word).', 'বন্ধনীর word-এর সঠিক comparative লিখুন (একটা word)।'), sentence: 'Cycling is ___ (good) for the environment than driving.', base: 'good', accepted: ['better'], explanation: l('good → better (not more better).', 'good → better (more better না)।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ce-6-c1', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Which phrase is natural?', 'কোন phrase-টা স্বাভাবিক?'), options: ['enter the room', 'enter into the room', 'enter in the room'], answer: 'enter the room', explanation: l('enter + place, no preposition.', 'enter + জায়গা, preposition না।') }),
        correct('ce-6-c2', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Remove the repetition.', 'Repetition বাদ দিন।'), sentence: 'The museum is free of cost for students.', accepted: ['The museum is free for students.'], explanation: l('free already means no cost.', 'free মানেই খরচ নেই।') }),
        order('ce-6-c3', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'This essay will discuss both views.', explanation: l('discuss + object, no about.', 'discuss + object, about না।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 2 introduction', 'এবার আপনার পালা: একটা Task 2 introduction'),
      exercises: [
        write('ce-6-y1', 'ce-natural', {
          ...P,
          prompt: l('Write a 3-sentence introduction for: "Some students return home after studying abroad. Why?" Use discuss, return and a comparative, and avoid repeating the same noun.', 'এই প্রশ্নের ৩-sentence introduction লিখুন: "Some students return home after studying abroad. Why?" discuss, return আর একটা comparative ব্যবহার করুন, আর একই noun বারবার বলবেন না।'),
          model: 'Many graduates return to their home countries after studying abroad. This essay will discuss the main reasons for this trend. In my view, the most important one is that family life at home is often easier.',
          checklist: [l('discuss / emphasise / mention without about or on', 'about বা on ছাড়া discuss / emphasise / mention'), l('return / repeat without back / again', 'back / again ছাড়া return / repeat'), l('one comparative; this / they instead of repeated nouns', 'একটা comparative; বারবার noun-এর বদলে this / they')],
          explanation: l('Say each idea once.', 'প্রতিটা idea একবার বলুন।'),
          task: 'The student writes a 3-sentence Task 2 introduction about why some students return home after studying abroad. Check only repetition and natural phrasing: redundant pairs (return back, repeat again, revert back, reply back, the reason is because / the reason why is because, each and every, free of cost), extra prepositions (discuss about, emphasise on, mention about, enter into, reach to, attend to a class), double comparatives (more better, more easier, most biggest), a noun and pronoun for the same subject ("students they"), and the same noun repeated in every sentence where it / they / this + noun would be natural. For each issue quote the words and give the fix.',
          target: l('Say it once', 'একবার বলুন'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('return · repeat · discuss · emphasise · enter — no back / again / about / on / into.', 'return · repeat · discuss · emphasise · enter — back / again / about / on / into না।'),
        l('better, easier, biggest — one comparative marker only.', 'better, easier, biggest — comparative চিহ্ন একটাই।'),
        l('The reason is that … · after the first mention, use it / they / this.', 'The reason is that … · প্রথমবারের পরে it / they / this।'),
      ],
    },
  ],
};

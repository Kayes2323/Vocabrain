import type { Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Common Errors to Fix, application lessons in the v2 format: ce-7 the
 * translation habits Bangla speakers bring (all six groups mixed), ce-8 fixing
 * these errors in real IELTS Writing and Speaking with no hints, and ce-9 the
 * module review test. No lesson concept of their own: every question keeps the
 * concept it tests. Original Mino content.
 */
const P = { tag: 'common-error' as const };

// ======================================================================= ce-7
export const ceHabits: Lesson = {
  id: 'ce-7',
  format: 'v2',
  title: l('Translation habits Bangla speakers bring', 'বাংলাভাষীরা অনুবাদের যে অভ্যাসগুলো নিয়ে আসেন'),
  why: l('The six error groups in this module all come from one habit: thinking a sentence in Bangla and translating it. Mixed practice trains you to notice the habit in any sentence.', 'এই module-এর ছয়টা ভুলের দল একটা অভ্যাস থেকেই আসে: বাংলায় sentence ভেবে তারপর অনুবাদ করা। মিশ্র practice যেকোনো sentence-এ অভ্যাসটা ধরতে শেখায়।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A student’s email', 'একজন শিক্ষার্থীর email'),
      situation: l('"I am agree that I need more practice. My teacher gave me many advices and said me to do less mistakes."', '"I am agree that I need more practice. My teacher gave me many advices and said me to do less mistakes."'),
      question: l('How many errors are there?', 'কয়টা ভুল আছে?'),
      options: ['5', '2', '0'],
      answer: '5',
      diagnose: {
        '5': l('Right: I agree · a lot of advice · told me · make · fewer mistakes. Translation, uncountable, word pair, collocation, and fewer with a plural noun.', 'ঠিক: I agree · a lot of advice · told me · make · fewer mistakes। অনুবাদ, uncountable, word-জোড়া, collocation, আর plural noun-এর সাথে fewer।'),
        '2': l('More: am agree, many advices, said me, do mistakes, and less mistakes (countable → fewer).', 'আরও: am agree, many advices, said me, do mistakes, আর less mistakes (countable → fewer)।'),
        '0': l('Five translated habits: I agree, a lot of advice, told me, make mistakes, fewer mistakes.', 'পাঁচটা অনুবাদের অভ্যাস: I agree, a lot of advice, told me, make mistakes, fewer mistakes।'),
      },
    },
    {
      kind: 'discover',
      title: l('Name the habit', 'অভ্যাসটার নাম দিন'),
      items: [
        { en: 'I am agree → I agree', note: l('word-for-word translation', 'word ধরে অনুবাদ') },
        { en: 'many advices → a lot of advice', note: l('uncountable noun', 'uncountable noun') },
        { en: 'two year → two years', note: l('plural after a number', 'সংখ্যার পরে plural') },
        { en: 'do a mistake → make a mistake', note: l('collocation', 'collocation') },
        { en: 'said me → told me', note: l('confusing word pair', 'গুলিয়ে যাওয়া word-জোড়া') },
        { en: 'return back → return', note: l('repetition', 'repetition') },
      ],
      question: l('Why name the habit instead of just fixing the word?', 'শুধু word ঠিক না করে অভ্যাসের নাম কেন দেবেন?'),
      options: [
        l('A named habit can be checked in every sentence you write', 'নাম দেওয়া অভ্যাস প্রতিটা লেখা sentence-এ যাচাই করা যায়'),
        l('Examiners ask for the name of the error', 'Examiner ভুলের নাম জিজ্ঞেস করেন'),
        l('It makes the sentence longer', 'এতে sentence লম্বা হয়'),
      ],
      answer: 0,
      pattern: l('Six checks: translated phrase? uncountable noun? plural after a number? right collocation? right verb of the pair? repeated idea?', 'ছয়টা যাচাই: অনুবাদ করা phrase? uncountable noun? সংখ্যার পরে plural? ঠিক collocation? জোড়ার ঠিক verb? idea দুবার?'),
    },
    {
      kind: 'concept',
      title: l('The six checks', 'ছয়টা যাচাই'),
      body: l(
        'Use these six questions when you proofread. Each one matches a lesson in this module.',
        'Proofread করার সময় এই ছয়টা প্রশ্ন করুন। প্রতিটা এই module-এর একটা lesson-এর সাথে মেলে।',
      ),
      points: [
        l('1. Translation: agree / depend without am / is; take an exam / medicine; turn on the light; cousin.', '১. অনুবাদ: am / is ছাড়া agree / depend; take an exam / medicine; turn on the light; cousin।'),
        l('2. Uncountable: information, advice, research, equipment, furniture, luggage, homework, news — no -s, no a / an, much / less.', '২. Uncountable: information, advice, research, equipment, furniture, luggage, homework, news — -s না, a / an না, much / less।'),
        l('3. Plural: numbers, many, several, both, one of the … → -s; every / each → singular; people and children are already plural.', '৩. Plural: সংখ্যা, many, several, both, one of the … → -s; every / each → singular; people আর children নিজেই plural।'),
        l('4. Collocation: make a mistake / decision, do homework / research, take a break, heavy rain, high price.', '৪. Collocation: make a mistake / decision, do homework / research, take a break, heavy rain, high price।'),
        l('5. Word pairs: tell + person, say + words; lend / borrow; teach / learn; rise / raise; lose / miss.', '৫. Word-জোড়া: tell + মানুষ, say + কথা; lend / borrow; teach / learn; rise / raise; lose / miss।'),
        l('6. Repetition: return, repeat, discuss, emphasise alone; one comparative; the reason is that; pronouns for repeated nouns.', '৬. Repetition: return, repeat, discuss, emphasise একা; comparative একটা; the reason is that; বারবার noun-এর বদলে pronoun।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Before → after', 'আগে → পরে'),
      items: [
        { en: 'I gave IELTS two time. → I took IELTS twice.', note: l('checks 1 and 3', 'যাচাই ১ আর ৩') },
        { en: 'We need more informations about the equipments. → We need more information about the equipment.', note: l('check 2', 'যাচাই ২') },
        { en: 'He learned me to do a decision. → He taught me to make a decision.', note: l('checks 5 and 4', 'যাচাই ৫ আর ৪') },
        { en: 'We discussed about it again and again. → We discussed it many times.', note: l('check 6', 'যাচাই ৬') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'I agree that research into renewable energy should receive more funding.', note: l('Task 2: agree, research (uncountable) and receive funding in one sentence.', 'Task 2: এক sentence-এ agree, research (uncountable) আর receive funding।') },
        { skill: 'speaking', example: 'My cousin taught me to take short breaks when I study.', note: l('Speaking: cousin, teach and take a break — three common slips avoided.', 'Speaking: cousin, teach আর take a break — তিনটা সাধারণ ভুল এড়ানো।') },
        { skill: 'listening', example: 'You can borrow equipment from the sports centre.', note: l('Listening: equipment without -s is the correct spelling of the answer.', 'Listening: -s ছাড়া equipment-ই উত্তরের সঠিক বানান।') },
        { skill: 'reading', example: 'Prices rose because demand was high.', note: l('Reading: rise / high are paraphrased as increase / strong — know the partners.', 'Reading: rise / high paraphrase হয় increase / strong হিসেবে — জোড়াগুলো জানুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'My cousin brother gave three exams this year.', right: 'My cousin took three exams this year.', why: l('check 1: cousin, take an exam.', 'যাচাই ১: cousin, take an exam।') },
        { wrong: 'The news are that fees will raise.', right: 'The news is that fees will rise.', why: l('checks 2 and 5: news is; fees rise (no object).', 'যাচাই ২ আর ৫: news is; fees rise (object নেই)।') },
        { wrong: 'One of my friend did a big mistake.', right: 'One of my friends made a big mistake.', why: l('checks 3 and 4: one of my friends; make a mistake.', 'যাচাই ৩ আর ৪: one of my friends; make a mistake।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: mixed habits', 'Practice: মিশ্র অভ্যাস'),
      exercises: [
        choice('ce-7-p1', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['I took my SSC exams in 2021.', 'I gave my SSC exams in 2021.', 'I sat on my SSC exams in 2021.'], answer: 'I took my SSC exams in 2021.', explanation: l('take (or sit) an exam.', 'take (বা sit) an exam।'), why: { 'I gave my SSC exams in 2021.': l('"পরীক্ষা দেওয়া" → take an exam.', '"পরীক্ষা দেওয়া" → take an exam।'), 'I sat on my SSC exams in 2021.': l('sit an exam has no on (sit on = sit on a chair).', 'sit an exam-এ on নেই (sit on মানে চেয়ারে বসা)।') } }),
        choice('ce-7-p2', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Choose the correct phrase.', 'সঠিক phrase বেছে নিন।'), sentence: 'I have too ___ this week.', options: ['much homework', 'many homeworks', 'many homework'], answer: 'much homework', explanation: l('homework: uncountable → much.', 'homework: uncountable → much।'), why: { 'many homeworks': l('homework has no plural; use much.', 'homework-এর plural নেই; much লিখুন।'), 'many homework': l('many is for countable plurals; homework takes much.', 'many countable plural-এর জন্য; homework-এর সাথে much।') } }),
        choice('ce-7-p3', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Choose the correct phrase.', 'সঠিক phrase বেছে নিন।'), sentence: 'Chattogram is one of the busiest ___ in South Asia.', options: ['ports', 'port', 'port’s'], answer: 'ports', explanation: l('one of the … → plural.', 'one of the … → plural।'), why: { port: l('You choose one from a group of ports: plural.', 'অনেক port-এর দল থেকে একটা: plural।'), 'port’s': l('An apostrophe shows possession, not a plural.', 'Apostrophe মালিকানা দেখায়, plural না।') } }),
        choice('ce-7-p4', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Choose the natural verb.', 'স্বাভাবিক verb বেছে নিন।'), sentence: 'After two hours of study, I always ___ a short break.', options: ['take', 'do', 'make'], answer: 'take', explanation: l('take a break.', 'take a break।'), why: { do: l('"বিরতি নেওয়া" → take a break; do is for tasks.', '"বিরতি নেওয়া" → take a break; do কাজের জন্য।'), make: l('make does not go with break here.', 'এখানে make break-এর সাথে যায় না।') } }),
        choice('ce-7-p5', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Can I borrow your umbrella?', 'Can you borrow me your umbrella?', 'Can I lend your umbrella?'], answer: 'Can I borrow your umbrella?', explanation: l('I borrow; you lend.', 'আমি borrow করি; আপনি lend করেন।'), why: { 'Can you borrow me your umbrella?': l('The giver lends: Can you lend me …?', 'যে দেয় সে lend করে: Can you lend me …?'), 'Can I lend your umbrella?': l('The receiver borrows: Can I borrow …?', 'যে নেয় সে borrow করে: Can I borrow …?') } }),
        choice('ce-7-p6', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Which sentence is natural?', 'কোন sentence-টা স্বাভাবিক?'), options: ['Please reply to this email by Friday.', 'Please reply back to this email by Friday.', 'Please reply back this email by Friday.'], answer: 'Please reply to this email by Friday.', explanation: l('reply to, no back.', 'reply to, back না।'), why: { 'Please reply back to this email by Friday.': l('reply already means answer back; drop back.', 'reply মানেই উত্তর দেওয়া; back বাদ দিন।'), 'Please reply back this email by Friday.': l('reply takes to, and back repeats the idea.', 'reply-এর পরে to বসে, আর back idea-টা দুবার বলে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        correct('ce-7-r1', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে লিখুন।'), sentence: 'Our plans are depend on the weather.', accepted: ['Our plans depend on the weather.'], explanation: l('depend is a verb.', 'depend verb।') }),
        spot('ce-7-r2', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('One word is wrong. Tap it and fix it.', 'একটা word ভুল। Tap করে ঠিক করুন।'), sentence: 'The report gives several evidences for this claim.', wrong: 'evidences', accepted: ['pieces of evidence'], explanation: l('evidence is uncountable: several pieces of evidence.', 'evidence uncountable: several pieces of evidence।') }),
        gap('ce-7-r3', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Write the correct form of the word in brackets.', 'বন্ধনীর word-এর সঠিক form লিখুন।'), sentence: 'A few ___ (person) complained about the noise.', base: 'person', accepted: ['people'], explanation: l('person → people.', 'person → people।') }),
        gap('ce-7-r4', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Write say or tell in the correct form.', 'সঠিক form-এ say বা tell লিখুন।'), sentence: 'Could you ___ me your email address?', accepted: ['tell', 'give'], explanation: l('tell + person.', 'tell + মানুষ।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        correct('ce-7-c1', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Fix the two collocations.', 'দুটো collocation ঠিক করুন।'), sentence: 'I make my homework in the evening and do my decisions quickly.', accepted: ['I do my homework in the evening and make my decisions quickly.', 'I do my homework in the evening and make decisions quickly.'], explanation: l('do homework; make decisions.', 'do homework; make decisions।') }),
        spot('ce-7-c2', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Living in a hostel is more cheaper than renting a flat.', wrong: 'more', accepted: ['much', 'far', 'a lot', 'a little'], fixOptions: ['much', 'most', 'very'], explanation: l('cheaper is already comparative; much / far can strengthen it.', 'cheaper নিজেই comparative; much / far দিয়ে জোর দেওয়া যায়।') }),
        order('ce-7-c3', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'My aunt taught me how to cook rice.', explanation: l('teach someone how to …', 'teach someone how to …') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a message to your teacher', 'এবার আপনার পালা: শিক্ষককে একটা message'),
      exercises: [
        write('ce-7-y1', 'ce-translation', {
          ...P,
          prompt: l('Write 3 sentences to a teacher about your IELTS preparation: an exam you took, advice you need, and a mistake you often make.', 'শিক্ষককে আপনার IELTS প্রস্তুতি নিয়ে ৩টা sentence লিখুন: যে exam দিয়েছেন, যে advice দরকার, আর যে ভুল প্রায়ই করেন।'),
          model: 'I took a practice test last week and scored 5.5 in Writing. Could you give me some advice about Task 2? I often make mistakes with plurals, so I would like more practice.',
          checklist: [l('take an exam; agree / depend as verbs', 'take an exam; verb হিসেবে agree / depend'), l('advice, information: no -s', 'advice, information: -s না'), l('make a mistake; tell / say; no repeated ideas', 'make a mistake; tell / say; idea দুবার না')],
          explanation: l('Run the six checks.', 'ছয়টা যাচাই চালান।'),
          task: 'The student writes 3 sentences to a teacher about IELTS preparation. Check only the six Bangla-translation habits: word-for-word phrases (am agree, is depend, give an exam, eat medicine, open the light, cousin brother); uncountable nouns with -s or a/an (informations, an advice, researches, equipments); missing plurals after numbers/many/one of the, or plurals after every/each; wrong collocations (do a mistake, make homework, strong rain, expensive price); confused pairs (say/tell, lend/borrow, learn/teach, rise/raise, lose/miss); repetition (return back, repeat again, discuss about, more better, the reason is because). For each issue quote the words, name the habit and give the fix.',
          target: l('The six translation habits', 'অনুবাদের ছয়টা অভ্যাস'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Six checks: translation · uncountable · plural · collocation · word pair · repetition.', 'ছয়টা যাচাই: অনুবাদ · uncountable · plural · collocation · word-জোড়া · repetition।'),
        l('Think of the English phrase as a chunk, not a Bangla word list.', 'English phrase-কে একটা chunk হিসেবে ভাবুন, বাংলা word-এর তালিকা হিসেবে না।'),
        l('When unsure, choose the shorter, simpler version.', 'নিশ্চিত না হলে ছোট আর সহজ রূপটা বেছে নিন।'),
      ],
    },
  ],
};

// ======================================================================= ce-8
export const ceInIelts: Lesson = {
  id: 'ce-8',
  format: 'v2',
  title: l('Fixing common errors in IELTS Writing and Speaking', 'IELTS Writing আর Speaking-এ common error ঠিক করা'),
  why: l('In the exam nobody tells you which habit to check. Practise finding and fixing these errors in real Task 1, Task 2 and Speaking answers, with no hints.', 'Exam-এ কেউ বলে দেবে না কোন অভ্যাস যাচাই করতে হবে। আসল Task 1, Task 2 আর Speaking উত্তরে hint ছাড়া এই ভুলগুলো খুঁজে ঠিক করার practice করুন।'),
  minutes: 12,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 1 sentence', 'একটা Task 1 sentence'),
      situation: l('"The number of international student raised sharply over the five years period."', '"The number of international student raised sharply over the five years period."'),
      question: l('How many corrections are needed?', 'কয়টা সংশোধন লাগবে?'),
      options: ['3', '1', '5'],
      answer: '3',
      diagnose: {
        '3': l('Right: students (the number of + plural) · rose (no object) · five-year period (describer, no -s).', 'ঠিক: students (the number of + plural) · rose (object নেই) · five-year period (বর্ণনা, -s না)।'),
        '1': l('Look again: student → students, raised → rose, five years period → five-year period.', 'আবার দেখুন: student → students, raised → rose, five years period → five-year period।'),
        '5': l('Fewer: "sharply" and "over" are correct.', 'কম: "sharply" আর "over" ঠিক আছে।'),
      },
    },
    {
      kind: 'discover',
      title: l('Where each error hides', 'কোন ভুল কোথায় লুকায়'),
      items: [
        { en: 'Task 1: rose / raised · the number of students · a ten-year period', note: l('word pairs and plurals', 'word-জোড়া আর plural') },
        { en: 'Task 2: I agree · research shows · have an impact on · discuss (no about)', note: l('translation, uncountable, collocation, repetition', 'অনুবাদ, uncountable, collocation, repetition') },
        { en: 'Task 1 letter (GT): Could you lend me … · some information', note: l('word pairs and uncountable nouns', 'word-জোড়া আর uncountable noun') },
        { en: 'Speaking: I took the exam · my cousin · Could you repeat the question?', note: l('translation and repetition', 'অনুবাদ আর repetition') },
      ],
      question: l('Which error type is most common in Task 1 reports?', 'Task 1 report-এ কোন ভুল সবচেয়ে বেশি?'),
      options: [
        l('Plurals after numbers and rise / raise', 'সংখ্যার পরে plural আর rise / raise'),
        l('cousin brother', 'cousin brother'),
        l('eat medicine', 'eat medicine'),
      ],
      answer: 0,
      pattern: l('Task 1 → check plurals and rise / raise. Task 2 → check agree, uncountable nouns, collocations and repetition. Speaking → check translated phrases.', 'Task 1 → plural আর rise / raise যাচাই করুন। Task 2 → agree, uncountable noun, collocation আর repetition। Speaking → অনুবাদ করা phrase।'),
    },
    {
      kind: 'concept',
      title: l('A proofreading routine for common errors', 'Common error-এর proofreading নিয়ম'),
      body: l(
        'Spend two minutes at the end of each Writing task on these checks, in this order.',
        'প্রতিটা Writing task-এর শেষে দুই মিনিট এই যাচাইগুলোতে দিন, এই ক্রমে।',
      ),
      points: [
        l('1. Every number and quantifier: is the noun after it plural (or singular after every / each)?', '১. প্রতিটা সংখ্যা আর quantifier: পরের noun plural তো (every / each-এর পরে singular)?'),
        l('2. Every trend verb: rose / fell (no object) or raised / reduced (with an object)?', '২. প্রতিটা trend verb: rose / fell (object নেই) নাকি raised / reduced (object-সহ)?'),
        l('3. Nouns from the uncountable list: no -s, singular verb (research shows, information is).', '৩. Uncountable তালিকার noun: -s না, singular verb (research shows, information is)।'),
        l('4. Verb + noun partners and repeated words: make / do / take / have; no discuss about, return back, more better.', '৪. Verb + noun জোড়া আর বারবার word: make / do / take / have; discuss about, return back, more better না।'),
        l('Why Bangla speakers slip: under exam pressure, you think faster in Bangla than in English, so translated phrases return in the last paragraphs. A fixed routine catches them.', 'বাংলাভাষীরা কেন ভুল করে: exam-এর চাপে English-এর চেয়ে বাংলায় দ্রুত ভাবা হয়, তাই শেষের paragraph-গুলোতে অনুবাদ করা phrase ফিরে আসে। একটা নির্দিষ্ট নিয়ম এগুলো ধরে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Model sentences', 'Model sentence'),
      items: [
        { en: 'The number of cars rose by 20% over the ten-year period.', note: l('Task 1: plural, rose, describer', 'Task 1: plural, rose, বর্ণনা') },
        { en: 'I agree that governments should invest more in research.', note: l('Task 2: agree, research', 'Task 2: agree, research') },
        { en: 'Could you send me some information about the course fees?', note: l('GT letter: uncountable', 'GT letter: uncountable') },
        { en: 'My cousin taught me to swim when I was ten.', note: l('Speaking: cousin, teach', 'Speaking: cousin, teach') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Task by task', 'Task অনুযায়ী'),
      uses: [
        { skill: 'writing', example: 'Both countries saw a significant rise in the number of tourists.', note: l('Task 1: both + plural, a rise in, the number of + plural.', 'Task 1: both + plural, a rise in, the number of + plural।') },
        { skill: 'speaking', example: 'Sorry, could you repeat the question?', note: l('Speaking: repeat, not repeat again.', 'Speaking: repeat, repeat again না।') },
        { skill: 'listening', example: 'The club offers advice on equipment and training.', note: l('Listening: spell advice and equipment without -s.', 'Listening: advice আর equipment -s ছাড়া লিখুন।') },
        { skill: 'reading', example: 'Unemployment rose while wages were raised only slightly.', note: l('Reading: rise vs raise shows who caused the change.', 'Reading: rise বনাম raise দেখায় পরিবর্তন কে ঘটিয়েছে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Many researches has proved this.', right: 'A lot of research has proved this.', why: l('research: uncountable, a lot of.', 'research: uncountable, a lot of।') },
        { wrong: 'Car prices raised in 2019.', right: 'Car prices rose in 2019.', why: l('no object → rose.', 'object নেই → rose।') },
        { wrong: 'This essay will discuss about both views.', right: 'This essay will discuss both views.', why: l('discuss + object.', 'discuss + object।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: no hints', 'Practice: কোনো hint নেই'),
      exercises: [
        choice('ce-8-p1', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Task 1: which sentence is correct?', 'Task 1: কোন sentence-টা ঠিক?'), options: ['Sales fell over the three-month period.', 'Sales fell over the three-months period.', 'Sales fell over the three month’s period.'], answer: 'Sales fell over the three-month period.', explanation: l('Describer: three-month.', 'বর্ণনা: three-month।'), why: { 'Sales fell over the three-months period.': l('A number + noun before another noun stays singular.', 'আরেকটা noun-এর আগে সংখ্যা + noun singular থাকে।'), 'Sales fell over the three month’s period.': l('No apostrophe; use a hyphen: three-month.', 'Apostrophe না; hyphen দিন: three-month।') } }),
        choice('ce-8-p2', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Task 1: choose the correct verb.', 'Task 1: সঠিক verb বেছে নিন।'), sentence: 'The government ___ the minimum wage in 2022.', options: ['raised', 'rose', 'risen'], answer: 'raised', explanation: l('Object (the minimum wage) → raised.', 'Object (the minimum wage) → raised।'), why: { rose: l('rise has no object; here the government changes something → raised.', 'rise-এর object নেই; এখানে government কিছু বদলায় → raised।'), risen: l('risen is a past participle and still has no object.', 'risen past participle, আর এরও object নেই।') } }),
        choice('ce-8-p3', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Task 2: which sentence is correct?', 'Task 2: কোন sentence-টা ঠিক?'), options: ['Students today have access to more information than ever.', 'Students today have access to more informations than ever.', 'Students today have access to many information than ever.'], answer: 'Students today have access to more information than ever.', explanation: l('information: uncountable.', 'information: uncountable।'), why: { 'Students today have access to more informations than ever.': l('information never takes -s.', 'information কখনো -s নেয় না।'), 'Students today have access to many information than ever.': l('many is for countable plurals; with than use more.', 'many countable plural-এর জন্য; than-এর সাথে more।') } }),
        choice('ce-8-p4', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Task 2: choose the natural phrase.', 'Task 2: স্বাভাবিক phrase বেছে নিন।'), sentence: 'Governments must ___ to reduce plastic waste.', options: ['take action', 'do action', 'make action'], answer: 'take action', explanation: l('take action.', 'take action।'), why: { 'do action': l('"পদক্ষেপ নেওয়া" → take action.', '"পদক্ষেপ নেওয়া" → take action।'), 'make action': l('action takes take, not make.', 'action-এর সাথে take, make না।') } }),
        choice('ce-8-p5', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Speaking Part 3: which answer is natural?', 'Speaking Part 3: কোন উত্তরটা স্বাভাবিক?'), options: ['I think online classes are easier for most people.', 'I think online classes are more easier for most people.', 'I think online classes are most easier for most people.'], answer: 'I think online classes are easier for most people.', explanation: l('One comparative: easier.', 'Comparative একটা: easier।'), why: { 'I think online classes are more easier for most people.': l('easier already has -er.', 'easier-এ আগেই -er।'), 'I think online classes are most easier for most people.': l('most is for superlatives; one marker only.', 'most superlative-এর জন্য; চিহ্ন একটাই।') } }),
        choice('ce-8-p6', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Speaking Part 3: which answer is natural?', 'Speaking Part 3: কোন উত্তরটা স্বাভাবিক?'), options: ['I partly agree, but it depends on the family.', 'I am partly agree, but it is depend on the family.', 'I partly agree, but it is depending to the family.'], answer: 'I partly agree, but it depends on the family.', explanation: l('agree and depend are verbs.', 'agree আর depend verb।'), why: { 'I am partly agree, but it is depend on the family.': l('No am / is before agree and depend.', 'agree আর depend-এর আগে am / is না।'), 'I partly agree, but it is depending to the family.': l('it depends on — present simple and on.', 'it depends on — present simple আর on।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        correct('ce-8-r1', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Task 1: fix the two errors.', 'Task 1: দুটো ভুল ঠিক করুন।'), sentence: 'The number of visitor rose in both city.', accepted: ['The number of visitors rose in both cities.'], explanation: l('the number of + plural; both + plural.', 'the number of + plural; both + plural।') }),
        correct('ce-8-r2', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Task 2: fix the sentence.', 'Task 2: sentence-টা ঠিক করুন।'), sentence: 'Many researches show that exercise improves memory.', accepted: ['A lot of research shows that exercise improves memory.', 'Research shows that exercise improves memory.', 'Much research shows that exercise improves memory.', 'Many studies show that exercise improves memory.'], explanation: l('research: uncountable + shows; or many studies show.', 'research: uncountable + shows; বা many studies show।') }),
        spot('ce-8-r3', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Task 1: one verb is wrong. Tap it and fix it.', 'Task 1: একটা verb ভুল। Tap করে ঠিক করুন।'), sentence: 'Petrol prices raised steadily between 2015 and 2020.', wrong: 'raised', accepted: ['rose', 'increased', 'grew', 'climbed'], explanation: l('No object → rose.', 'Object নেই → rose।') }),
        gap('ce-8-r4', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Task 2: write the missing verb.', 'Task 2: বাদ পড়া verb-টা লিখুন।'), sentence: 'Social media can ___ a negative effect on sleep.', accepted: ['have'], explanation: l('have an effect on.', 'have an effect on।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        correct('ce-8-c1', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Task 2: remove the two repetitions.', 'Task 2: দুটো repetition বাদ দিন।'), sentence: 'This essay will discuss about why graduates return back home.', accepted: ['This essay will discuss why graduates return home.'], explanation: l('discuss + object; return, no back.', 'discuss + object; return, back না।') }),
        spot('ce-8-c2', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'In Dhaka, the price of land is extremely expensive.', wrong: 'expensive', accepted: ['high'], fixOptions: ['high', 'costly', 'big'], explanation: l('A price is high.', 'Price high হয়।') }),
        order('ce-8-c3', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Build the Task 1 sentence.', 'Task 1 sentence-টা সাজান।'), answer: 'The number of students doubled over the ten-year period.', explanation: l('the number of + plural; ten-year as a describer.', 'the number of + plural; বর্ণনায় ten-year।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 2 body paragraph', 'এবার আপনার পালা: একটা Task 2 body paragraph'),
      exercises: [
        write('ce-8-y1', 'ce-natural', {
          ...P,
          prompt: l('Task 2: write 3 sentences on "Should university education be free?" Give your opinion, a reason with evidence or research, and one result.', 'Task 2: "Should university education be free?" নিয়ে ৩টা sentence লিখুন। আপনার মত, research বা evidence-সহ একটা কারণ, আর একটা ফলাফল দিন।'),
          model: 'I partly agree that university education should be free. Research shows that many talented students from poor families never apply because of the high cost. Free tuition would make a real difference to their lives.',
          checklist: [l('agree / depend as verbs; research, evidence without -s', 'verb হিসেবে agree / depend; -s ছাড়া research, evidence'), l('plurals after many / numbers; high cost; make a difference', 'many / সংখ্যার পরে plural; high cost; make a difference'), l('no discuss about, more better, the reason is because', 'discuss about, more better, the reason is because না')],
          explanation: l('Two-minute routine: plurals, trend verbs, uncountable nouns, partners and repetition.', 'দুই মিনিটের নিয়ম: plural, trend verb, uncountable noun, জোড়া আর repetition।'),
          task: 'The student writes 3 sentences for the Task 2 question "Should university education be free?". Check only the common Bangla-speaker errors from this module: word-for-word translation (am agree, is depend, give an exam), uncountable nouns (researches, evidences, informations, advices, a knowledge), singular/plural after numbers, many, several, both, one of the, every/each, and irregular plurals (peoples), collocations (make a difference, have an effect/impact on, take action, high cost/price, do research), confused pairs (rise/raise, say/tell, learn/teach, lend/borrow), and repetition (discuss about, return back, more better, the reason is because). For each issue quote the words, name the error type and give the fix.',
          target: l('Common errors in Task 2', 'Task 2-এ common error'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Task 1: plurals after numbers, rise vs raise, a ten-year period.', 'Task 1: সংখ্যার পরে plural, rise বনাম raise, a ten-year period।'),
        l('Task 2: I agree, research shows, have an impact on, discuss (no about).', 'Task 2: I agree, research shows, have an impact on, discuss (about না)।'),
        l('Speaking: take an exam, my cousin, repeat (no again).', 'Speaking: take an exam, my cousin, repeat (again না)।'),
      ],
    },
  ],
};

// ======================================================================= ce-9
export const ceReview: Lesson = {
  id: 'ce-9',
  kind: 'test',
  title: l('Common errors review test', 'Common errors review test'),
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
        'এই module-এর সব lesson থেকে ১২টা প্রশ্ন। Answer আর ব্যাখ্যা প্রতিটা প্রশ্নের পরে না, শেষে দেখবেন। ৮০% বা বেশি পেলে module শেষ; কম পেলে যে নম্বরগুলো কেটেছে সেগুলোর জন্য Mino ছোট review সাজেস্ট করবে।',
      ),
    },
    {
      kind: 'practice',
      title: l('Part 1: choose', 'Part 1: বেছে নিন'),
      exercises: [
        choice('ce-9-e1', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['I agree with the new rule.', 'I am agree with the new rule.', 'I am agreeing the new rule.'], answer: 'I agree with the new rule.', explanation: l('agree is a verb.', 'agree verb।') }),
        choice('ce-9-e2', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'We need to buy some new ___ for the office.', options: ['furniture', 'furnitures', 'a furniture'], answer: 'furniture', explanation: l('furniture: uncountable.', 'furniture: uncountable।') }),
        choice('ce-9-e3', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'She is one of the best ___ in our school.', options: ['teachers', 'teacher', 'teacher’s'], answer: 'teachers', explanation: l('one of the … → plural.', 'one of the … → plural।') }),
        choice('ce-9-e4', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'It is important to ___ research before you choose a university.', options: ['do', 'make', 'take'], answer: 'do', explanation: l('do research.', 'do research।') }),
        choice('ce-9-e5', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('Choose the correct verb.', 'সঠিক verb বেছে নিন।'), sentence: 'I ___ my keys somewhere on the way home.', options: ['lost', 'missed', 'forgot'], answer: 'lost', explanation: l('lose an object.', 'জিনিস lose।') }),
        choice('ce-9-e6', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Which sentence is natural?', 'কোন sentence-টা স্বাভাবিক?'), options: ['The meeting will discuss the budget.', 'The meeting will discuss about the budget.', 'The meeting will discuss on the budget.'], answer: 'The meeting will discuss the budget.', explanation: l('discuss + object.', 'discuss + object।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Part 2: write and fix', 'Part 2: লিখুন আর ঠিক করুন'),
      exercises: [
        gap('ce-9-e7', 'ce-translation', { ...P, pattern: 'ce-translation', prompt: l('Write the natural verb.', 'স্বাভাবিক verb লিখুন।'), sentence: 'Please ___ off the lights when you leave.', accepted: ['turn', 'switch'], explanation: l('turn off the lights.', 'turn off the lights।') }),
        gap('ce-9-e8', 'ce-plural', { ...P, pattern: 'ce-plural-form', prompt: l('Write the correct form of the word in brackets.', 'বন্ধনীর word-এর সঠিক form লিখুন।'), sentence: 'The course lasts four ___ (month).', base: 'month', accepted: ['months'], explanation: l('four → plural.', 'four → plural।') }),
        correct('ce-9-e9', 'ce-countable', { ...P, pattern: 'ce-uncountable', prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে লিখুন।'), sentence: 'Could you give me an advice?', accepted: ['Could you give me some advice?', 'Could you give me a piece of advice?', 'Could you give me advice?'], explanation: l('advice: no an → some advice / a piece of advice.', 'advice: an না → some advice / a piece of advice।') }),
        spot('ce-9-e10', 'ce-word-pair', { ...P, pattern: 'ce-confused-pair', prompt: l('One word is wrong. Tap it and fix it.', 'একটা word ভুল। Tap করে ঠিক করুন।'), sentence: 'My manager said me to finish the report today.', wrong: 'said', accepted: ['told', 'asked'], fixOptions: ['told', 'spoke', 'talked'], explanation: l('tell + person.', 'tell + মানুষ।') }),
        spot('ce-9-e11', 'ce-collocation', { ...P, pattern: 'ce-collocation-pair', prompt: l('One word is the wrong partner. Tap it and fix it.', 'একটা word ভুল জোড়া। Tap করে ঠিক করুন।'), sentence: 'Strong rain caused flooding in the city.', wrong: 'Strong', accepted: ['Heavy'], fixOptions: ['Heavy', 'Big', 'High'], explanation: l('heavy rain.', 'heavy rain।') }),
        correct('ce-9-e12', 'ce-natural', { ...P, pattern: 'ce-redundant', prompt: l('Remove the extra word.', 'বাড়তি word-টা মুছুন।'), sentence: 'Buses are more slower than trains.', accepted: ['Buses are slower than trains.'], explanation: l('slower is already comparative.', 'slower নিজেই comparative।') }),
      ],
    },
    {
      kind: 'ielts',
      title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'The number of students rose over the ten-year period.', note: l('Task 1: plurals, rise, describers.', 'Task 1: plural, rise, বর্ণনা।') },
        { skill: 'speaking', example: 'I agree — it depends on the person.', note: l('Speaking: agree and depend as verbs.', 'Speaking: verb হিসেবে agree আর depend।') },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('I agree · take an exam · turn on the light · information / advice without -s.', 'I agree · take an exam · turn on the light · -s ছাড়া information / advice।'),
        l('Plural after numbers and one of the …; make a mistake, do research, heavy rain.', 'সংখ্যা আর one of the …-এর পরে plural; make a mistake, do research, heavy rain।'),
        l('tell + person, lend / borrow, rise / raise; say each idea once.', 'tell + মানুষ, lend / borrow, rise / raise; প্রতিটা idea একবার বলুন।'),
      ],
    },
  ],
};

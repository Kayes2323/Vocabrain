import type { Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Punctuation & Capitalisation, application lessons in the v2 format: pn-7 the
 * punctuation mistakes Bangla speakers make, pn-8 proofreading IELTS writing
 * with no hints, and pn-9 the module review test. No lesson concept of their
 * own: every question keeps the concept it tests. Exercises marked `strict`
 * are graded with capitals and final punctuation. Original Mino content.
 */
const P = { tag: 'punctuation' as const };
const S = { ...P, strict: true };

// ======================================================================= pn-7
export const pnMistakes: Lesson = {
  id: 'pu-7',
  format: 'v2',
  title: l('Punctuation mistakes Bangla speakers make', 'বাংলাভাষীরা punctuation-এ যে ভুলগুলো করে'),
  why: l('Most punctuation errors come from writing English with Bangla habits: no capitals, commas for pauses, no apostrophes. Name the habits and you can remove them in a two-minute proofread.', 'বেশিরভাগ punctuation ভুল আসে বাংলার অভ্যাসে English লেখা থেকে: capital নেই, বিরতিতে comma, apostrophe নেই। অভ্যাসগুলো চিনলে দুই মিনিটের proofread-এ সরাতে পারবেন।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A student’s Task 1 letter', 'একজন শিক্ষার্থীর Task 1 letter'),
      situation: l('"dear sir, i am writing about my sons school fees, we paid in january but we did not get a receipt"', '"dear sir, i am writing about my sons school fees, we paid in january but we did not get a receipt"'),
      question: l('Which problems does this sentence have?', 'এই sentence-এ কী কী সমস্যা?'),
      options: ['Missing capitals, a missing apostrophe, a comma splice and no full stop', 'Only missing capitals', 'It is correct for an informal letter'],
      answer: 'Missing capitals, a missing apostrophe, a comma splice and no full stop',
      diagnose: {
        'Missing capitals, a missing apostrophe, a comma splice and no full stop': l('Right: "Dear Sir, I am writing about my son’s school fees. We paid in January, but we did not get a receipt."', 'ঠিক: "Dear Sir, I am writing about my son’s school fees. We paid in January, but we did not get a receipt."'),
        'Only missing capitals': l('Also: son’s (possession), a full stop before "We" (comma splice), and a full stop at the end.', 'এছাড়া: son’s (মালিকানা), "We"-এর আগে full stop (comma splice), আর শেষে full stop।'),
        'It is correct for an informal letter': l('Even informal letters need capitals, apostrophes and full stops — and this one is a formal complaint.', 'Informal letter-এও capital, apostrophe আর full stop লাগে — আর এটা একটা formal অভিযোগ।'),
      },
    },
    {
      kind: 'discover',
      title: l('Where do these slips come from?', 'এই ভুলগুলো কোথা থেকে আসে?'),
      items: [
        { en: 'বাংলায় capital letter নেই → i, dhaka, monday', note: l('no capitals in Bangla script', 'বাংলা লিপিতে capital নেই') },
        { en: 'রহিমের বই → Rahim’s book (not Rahims book)', note: l('possession ending → apostrophe', 'মালিকানার ending → apostrophe') },
        { en: 'দাম বেশি, মানুষ কম কেনে → Prices are high, so people buy less.', note: l('comma as a pause → comma splice', 'বিরতিতে comma → comma splice') },
        { en: 'দাঁড়ি (।) → full stop (.)', note: l('the full stop is forgotten when typing', 'type করার সময় full stop বাদ পড়ে') },
      ],
      question: l('What is the common cause?', 'সাধারণ কারণটা কী?'),
      options: [
        l('Bangla writing habits (no capitals, pause commas, no apostrophes) carried into English', 'বাংলা লেখার অভ্যাস (capital নেই, বিরতির comma, apostrophe নেই) English-এ চলে আসা'),
        l('English punctuation is random', 'English punctuation এলোমেলো'),
        l('Keyboards make punctuation difficult', 'Keyboard-এ punctuation কঠিন'),
      ],
      answer: 0,
      pattern: l('Proofread for four Bangla habits: missing capitals, missing apostrophes, pause commas (splices), and missing full stops.', 'চারটা বাংলা অভ্যাসের জন্য proofread করুন: বাদ পড়া capital, বাদ পড়া apostrophe, বিরতির comma (splice), আর বাদ পড়া full stop।'),
    },
    {
      kind: 'concept',
      title: l('The six habits to watch', 'যে ছয়টা অভ্যাসে খেয়াল রাখবেন'),
      body: l(
        'Almost every punctuation error by Bangla speakers belongs to one of these groups.',
        'বাংলাভাষীদের প্রায় সব punctuation ভুল এই দলগুলোর একটায় পড়ে।',
      ),
      points: [
        l('1. Missing capitals: i, dhaka, monday, english → I, Dhaka, Monday, English.', '১. বাদ পড়া capital: i, dhaka, monday, english → I, Dhaka, Monday, English।'),
        l('2. Extra capitals: Summer, Maths, University (general) → summer, maths, university.', '২. অতিরিক্ত capital: Summer, Maths, University (সাধারণ) → summer, maths, university।'),
        l('3. Comma splices and pause commas: "It was late, we left." / "The price of rice, rose." → full stop, joining word, or no comma.', '৩. Comma splice আর বিরতির comma: "It was late, we left." / "The price of rice, rose." → full stop, জোড়ার word, বা comma না।'),
        l('4. Apostrophes: missing (my sons school) or extra (two student’s, it’s tail, 1990’s).', '৪. Apostrophe: বাদ পড়া (my sons school) বা অতিরিক্ত (two student’s, it’s tail, 1990’s)।'),
        l('5. End marks: no full stop at the end; "?" after an indirect question.', '৫. শেষ চিহ্ন: শেষে full stop নেই; indirect question-এর পরে "?"।'),
        l('6. Numbers and spacing: 12.500 for twelve thousand five hundred, spaces before punctuation (word , word).', '৬. সংখ্যা আর space: বারো হাজার পাঁচশোর জন্য 12.500, punctuation-এর আগে space (word , word)।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Before → after', 'আগে → পরে'),
      items: [
        { en: 'i visited cox’s bazar in december. → I visited Cox’s Bazar in December.', note: l('habit 1', 'অভ্যাস ১') },
        { en: 'My fathers shop is small. → My father’s shop is small.', note: l('habit 4', 'অভ্যাস ৪') },
        { en: 'The bus was late, i missed the exam. → The bus was late, so I missed the exam.', note: l('habits 1 and 3', 'অভ্যাস ১ আর ৩') },
        { en: 'I don’t know where she lives? → I don’t know where she lives.', note: l('habit 5', 'অভ্যাস ৫') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Dear Mr Khan, I am writing to complain about my son’s school fees.', note: l('Task 1 letter: capitals, apostrophe, full stop.', 'Task 1 letter: capital, apostrophe, full stop।') },
        { skill: 'listening', example: 'Name: Tanvir Hasan · Nationality: Bangladeshi · Day: Tuesday', note: l('Listening forms: wrong capitals can cost the mark.', 'Listening form: ভুল capital-এ নম্বর কাটতে পারে।') },
        { skill: 'reading', example: 'The committee’s report was published in May.', note: l('Reading: ’s shows who owns what — useful for matching information.', 'Reading: ’s দেখায় কার জিনিস — তথ্য মেলাতে কাজে লাগে।') },
        { skill: 'speaking', example: 'Part 2 notes: "Eid in Sylhet — my uncle’s house — December"', note: l('Speaking notes: quick notes, but correct names help you remember.', 'Speaking note: দ্রুত note, কিন্তু সঠিক নাম মনে রাখতে সাহায্য করে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'i think Online learning is useful.', right: 'I think online learning is useful.', why: l('habits 1 and 2: I capital, ordinary nouns small.', 'অভ্যাস ১ আর ২: I capital, সাধারণ noun ছোট।') },
        { wrong: 'My sisters wedding is in march.', right: 'My sister’s wedding is in March.', why: l('habits 4 and 1.', 'অভ্যাস ৪ আর ১।') },
        { wrong: 'The graph shows two trends, both are upward.', right: 'The graph shows two trends. Both are upward.', why: l('habit 3: comma splice.', 'অভ্যাস ৩: comma splice।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('pu-7-p1', 'pn-capital', { ...P, pattern: 'pn-capitals', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['I study English on Tuesdays.', 'i study english on tuesdays.', 'I study english on Tuesdays.'], answer: 'I study English on Tuesdays.', explanation: l('I, languages and days → capitals.', 'I, ভাষা আর দিন → capital।'), why: { 'i study english on tuesdays.': l('Bangla has no capitals, but English needs them here: I, English, Tuesdays.', 'বাংলায় capital নেই, কিন্তু এখানে English-এ লাগে: I, English, Tuesdays।'), 'I study english on Tuesdays.': l('Languages are capital: English.', 'ভাষা capital: English।') } }),
        choice('pu-7-p2', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'We went to my ___ house for dinner.', options: ['cousin’s', 'cousins', 'cousins’s'], answer: 'cousin’s', explanation: l('One cousin owns the house → cousin’s.', 'একজন cousin-এর বাড়ি → cousin’s।'), why: { cousins: l('"কাজিনের বাড়ি" → possession needs an apostrophe: cousin’s.', '"কাজিনের বাড়ি" → মালিকানায় apostrophe লাগে: cousin’s।'), 'cousins’s': l('Never ’s after a plural ending in s.', 's-এ শেষ হওয়া plural-এর পরে কখনো ’s না।') } }),
        choice('pu-7-p3', 'pn-comma-error', { ...P, pattern: 'pn-run-on', prompt: l('Which is correctly punctuated?', 'কোনটার punctuation ঠিক?'), options: ['The fees are high. Many students work part-time.', 'The fees are high, many students work part-time.', 'The fees are high many students work part-time.'], answer: 'The fees are high. Many students work part-time.', explanation: l('Two sentences → full stop between them.', 'দুটো sentence → মাঝে full stop।'), why: { 'The fees are high, many students work part-time.': l('A pause comma between two sentences = comma splice.', 'দুটো sentence-এর মাঝে বিরতির comma = comma splice।'), 'The fees are high many students work part-time.': l('No end mark between two sentences.', 'দুটো sentence-এর মাঝে শেষ চিহ্ন নেই।') } }),
        choice('pu-7-p4', 'pn-comma-error', { ...P, pattern: 'pn-comma-use', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The number of tourists who visit Sylhet has grown.', 'The number of tourists who visit Sylhet, has grown.', 'The number of tourists, who visit Sylhet has grown.'], answer: 'The number of tourists who visit Sylhet has grown.', explanation: l('No comma between the subject and "has grown".', 'Subject আর "has grown"-এর মাঝে comma না।'), why: { 'The number of tourists who visit Sylhet, has grown.': l('The pause after a long subject is not a comma in English.', 'লম্বা subject-এর পরের বিরতি English-এ comma না।'), 'The number of tourists, who visit Sylhet has grown.': l('This comma cuts the subject in half.', 'এই comma subject-কে দুই ভাগ করে।') } }),
        choice('pu-7-p5', 'pn-end', { ...P, pattern: 'pn-end-mark', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['I would like to know when the course starts.', 'I would like to know when the course starts?', 'I would like to know when does the course start?'], answer: 'I would like to know when the course starts.', explanation: l('Indirect question inside a statement → full stop.', 'Statement-এর ভেতরে indirect question → full stop।'), why: { 'I would like to know when the course starts?': l('The whole sentence is a statement → full stop.', 'পুরো sentence statement → full stop।'), 'I would like to know when does the course start?': l('Question order and "?" are both wrong inside a statement.', 'Statement-এর ভেতরে প্রশ্নের order আর "?" দুটোই ভুল।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        correct('pu-7-r1', 'pn-capital', { ...S, pattern: 'pn-capitals', prompt: l('Rewrite with correct capital letters (keep the full stop).', 'সঠিক capital letter দিয়ে আবার লিখুন (full stop রাখুন)।'), sentence: 'my brother works in dubai.', accepted: ['My brother works in Dubai.'], explanation: l('First word and city → capitals.', 'প্রথম word আর শহর → capital।') }),
        gap('pu-7-r2', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Write the possessive form of the word in brackets.', 'বন্ধনীর word-এর possessive form লিখুন।'), sentence: 'My ___ (mother) cooking is the best.', base: 'mother', accepted: ['mother’s', "mother's"], explanation: l('One mother → mother’s.', 'একজন mother → mother’s।'), why: { mothers: l('Possession needs an apostrophe: mother’s.', 'মালিকানায় apostrophe লাগে: mother’s।') } }),
        correct('pu-7-r3', 'pn-comma-error', { ...P, pattern: 'pn-run-on', prompt: l('Fix the comma splice.', 'Comma splice ঠিক করুন।'), sentence: 'It started raining, the match was stopped.', accepted: ['It started raining, so the match was stopped.', 'It started raining. The match was stopped.', 'It started raining; the match was stopped.', 'It started raining, and the match was stopped.'], explanation: l(', so / . / ;', ', so / . / ;') }),
        correct('pu-7-r4', 'pn-end', { ...S, pattern: 'pn-end-mark', prompt: l('Fix the end mark.', 'শেষ চিহ্ন ঠিক করুন।'), sentence: 'Nobody knows where the key is?', accepted: ['Nobody knows where the key is.'], explanation: l('A statement → full stop.', 'Statement → full stop।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pu-7-c1', 'pn-capital', { ...P, pattern: 'pn-capitals', prompt: l('Which sentence has NO punctuation or capital mistakes?', 'কোন sentence-এ punctuation বা capital-এর কোনো ভুল নেই?'), options: ['In March, my father’s shop in Rajshahi was closed for a week.', 'In march, my fathers shop in Rajshahi was closed for a week.', 'In March my father’s Shop in rajshahi, was closed for a week.'], answer: 'In March, my father’s shop in Rajshahi was closed for a week.', explanation: l('March · father’s · Rajshahi · comma after the opening phrase.', 'March · father’s · Rajshahi · শুরুর phrase-এর পরে comma।') }),
        spot('pu-7-c2', 'pn-capital', { ...S, pattern: 'pn-capitals', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'We usually visit our grandparents in Summer.', wrong: 'Summer', accepted: ['summer'], fixOptions: ['summer', 'SUMMER', 'Summers'], explanation: l('Seasons are small.', 'ঋতু ছোট।') }),
        order('pu-7-c3', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'My sister’s school is near the river.', explanation: l('one owner → ’s.', 'একজন মালিক → ’s।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a short formal email', 'এবার আপনার পালা: একটা ছোট formal email'),
      exercises: [
        write('pu-7-y1', 'pn-comma-error', {
          ...P,
          prompt: l('Task 1 letter: write 3 sentences to a college office about a problem with a fee payment. Include a name, a month, a possessive (’s) and one sentence joined with but or so.', 'Task 1 letter: fee payment-এর একটা সমস্যা নিয়ে college office-কে ৩টা sentence লিখুন। একটা নাম, একটা মাস, একটা possessive (’s) আর but বা so দিয়ে জোড়া একটা sentence রাখুন।'),
          model: 'Dear Ms Rahman, I am writing about my daughter’s tuition fees for March. We paid the full amount on 5 March, but we have not received a receipt. Could you please send one by email?',
          checklist: [l('capitals: names, months, the first word, I', 'capital: নাম, মাস, প্রথম word, I'), l('apostrophe for possession', 'মালিকানায় apostrophe'), l('no comma splices; end every sentence', 'comma splice না; প্রতিটা sentence শেষ করুন')],
          explanation: l('Proofread for the six Bangla-speaker habits.', 'বাংলাভাষীদের ছয়টা অভ্যাসের জন্য proofread করুন।'),
          task: 'The student writes a 3-sentence formal email about a fee payment. Check punctuation and capitals only, focusing on the typical Bangla-speaker habits: missing capitals (I, names, months, days, languages, the first word) and unnecessary capitals (seasons, subjects, general nouns); missing or wrong apostrophes (daughter’s, not daughters; no apostrophe in plurals; its vs it’s); comma splices and pause commas (a comma between two sentences, or between a subject and its verb); missing full stops and wrong question marks after indirect questions; spacing before punctuation. For each issue name the habit, quote the words and give the fix.',
          target: l('Catch the six punctuation habits', 'Punctuation-এর ছয়টা অভ্যাস ধরুন'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Capitals for I, names, days, months, languages — small for seasons and subjects.', 'I, নাম, দিন, মাস, ভাষায় capital — ঋতু আর বিষয়ে ছোট।'),
        l('Apostrophes for possession (father’s), never for plurals.', 'মালিকানায় apostrophe (father’s), plural-এ কখনো না।'),
        l('No pause commas: full stops between sentences, no comma before the verb.', 'বিরতির comma না: sentence-এর মাঝে full stop, verb-এর আগে comma না।'),
      ],
    },
  ],
};

// ======================================================================= pn-8
export const pnProofread: Lesson = {
  id: 'pu-8',
  format: 'v2',
  title: l('Proofreading your IELTS writing', 'আপনার IELTS লেখা proofread করা'),
  why: l('Two minutes of proofreading at the end of each task can remove most punctuation errors. Practise finding them in real Task 1 and Task 2 sentences, with no hints.', 'প্রতিটা task-এর শেষে দুই মিনিট proofread করলে বেশিরভাগ punctuation ভুল সরানো যায়। আসল Task 1 আর Task 2 sentence-এ hint ছাড়া খুঁজে বের করার অভ্যাস করুন।'),
  minutes: 12,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 1 overview', 'একটা Task 1 overview'),
      situation: l('"overall, the number of tourists visiting japan rose, while visits to Thailands beaches fell."', '"overall, the number of tourists visiting japan rose, while visits to Thailands beaches fell."'),
      question: l('How many corrections are needed?', 'কয়টা সংশোধন লাগবে?'),
      options: ['3', '1', '5'],
      answer: '3',
      diagnose: {
        '3': l('Right: Overall (first word) · Japan (country) · Thailand’s (possession). The comma before "while" is correct.', 'ঠিক: Overall (প্রথম word) · Japan (দেশ) · Thailand’s (মালিকানা)। "while"-এর আগের comma ঠিক আছে।'),
        '1': l('Look again: the first word, the country "japan", and "Thailands" (whose beaches?) all need fixing.', 'আবার দেখুন: প্রথম word, দেশ "japan", আর "Thailands" (কার beach?) — তিনটাই ঠিক করতে হবে।'),
        '5': l('Fewer: the comma before "while" and the full stop are already correct.', 'কম: "while"-এর আগের comma আর full stop আগে থেকেই ঠিক।'),
      },
    },
    {
      kind: 'discover',
      title: l('A proofreading routine', 'একটা proofreading নিয়ম'),
      items: [
        { en: '1 Capitals: first words, I, names, countries, months', note: l('scan the start of each sentence and every name', 'প্রতিটা sentence-এর শুরু আর প্রতিটা নাম দেখুন') },
        { en: '2 End marks: a full stop after every statement', note: l('look at the last character of each sentence', 'প্রতিটা sentence-এর শেষ অক্ষর দেখুন') },
        { en: '3 Commas: no comma between two sentences or before a verb', note: l('read each comma: is it a list, an opening, or before and / but / so?', 'প্রতিটা comma পড়ুন: তালিকা, শুরু, নাকি and / but / so-এর আগে?') },
        { en: '4 Apostrophes: ’s for owners, none for plurals', note: l('check every word ending in s', 's-এ শেষ হওয়া প্রতিটা word দেখুন') },
      ],
      question: l('Why check one thing at a time?', 'একবারে একটা জিনিস কেন দেখবেন?'),
      options: [
        l('Your eyes catch more errors when they look for one type at a time', 'একবারে এক ধরনের ভুল খুঁজলে চোখ বেশি ভুল ধরে'),
        l('It is faster to read everything once', 'একবার সব পড়া দ্রুত'),
        l('Examiners only check one type', 'Examiner শুধু এক ধরন দেখেন'),
      ],
      answer: 0,
      pattern: l('Proofread in passes: capitals → end marks → commas → apostrophes. Each pass takes about 30 seconds for a Task 1 answer.', 'কয়েক ধাপে proofread করুন: capital → শেষ চিহ্ন → comma → apostrophe। Task 1 উত্তরে প্রতিটা ধাপে প্রায় ৩০ সেকেন্ড লাগে।'),
    },
    {
      kind: 'concept',
      title: l('All the rules on one card', 'সব নিয়ম একটা card-এ'),
      body: l(
        'Everything from this module, in proofreading order.',
        'এই module-এর সবকিছু, proofread করার ক্রমে।',
      ),
      points: [
        l('1. Capitals: first word, I, names, places, days, months, languages, nationalities — not seasons, subjects or general nouns.', '১. Capital: প্রথম word, I, নাম, জায়গা, দিন, মাস, ভাষা, জাতীয়তা — ঋতু, বিষয় বা সাধারণ noun না।'),
        l('2. End marks: . after statements and indirect questions; ? after direct questions and Could you …', '২. শেষ চিহ্ন: statement আর indirect question-এর পরে .; সরাসরি প্রশ্ন আর Could you …-এর পরে ?'),
        l('3. Commas: lists, after openings, before and / but / so joining clauses, around extra information — never between two sentences, before a verb, or before that.', '৩. Comma: তালিকা, শুরুর পরে, clause জোড়া and / but / so-এর আগে, বাড়তি তথ্যের চারপাশে — দুটো sentence-এর মাঝে, verb-এর আগে বা that-এর আগে কখনো না।'),
        l('4. Apostrophes: ’s / s’ for owners, contractions only in informal writing, never for plurals or decades; its vs it’s.', '৪. Apostrophe: মালিকের জন্য ’s / s’, contraction শুধু informal লেখায়, plural বা দশকে কখনো না; its বনাম it’s।'),
        l('Why Bangla speakers slip: when you write fast in an exam, Bangla habits return — so a fixed routine at the end is the most reliable fix.', 'বাংলাভাষীরা কেন ভুল করে: পরীক্ষায় দ্রুত লেখার সময় বাংলার অভ্যাস ফিরে আসে — তাই শেষে একটা নির্দিষ্ট নিয়ম সবচেয়ে নির্ভরযোগ্য সমাধান।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Model sentences', 'Model sentence'),
      items: [
        { en: 'Overall, Japan’s exports rose, while Germany’s fell.', note: l('Task 1: capitals, apostrophes, comma before while', 'Task 1: capital, apostrophe, while-এর আগে comma') },
        { en: 'In my opinion, governments should invest in public transport.', note: l('Task 2: opening phrase + comma', 'Task 2: শুরুর phrase + comma') },
        { en: 'The graph shows three trends: a rise, a fall and a plateau.', note: l('colon + list', 'colon + তালিকা') },
        { en: 'Could you tell me when the results will be published?', note: l('polite question → ?', 'ভদ্র প্রশ্ন → ?') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Task by task', 'Task অনুযায়ী'),
      uses: [
        { skill: 'writing', example: 'In 2010, India’s population was 1.2 billion.', note: l('Task 1: opening phrase comma, possessive, decimal point.', 'Task 1: শুরুর phrase-এর comma, possessive, দশমিক point।') },
        { skill: 'speaking', example: 'Part 2 notes: "my uncle’s shop — Rajshahi — every Friday"', note: l('Speaking notes: correct capitals and apostrophes help you read your own notes fast.', 'Speaking note: সঠিক capital আর apostrophe নিজের note দ্রুত পড়তে সাহায্য করে।') },
        { skill: 'listening', example: 'Address: 14 Lake Road, Chattogram', note: l('Listening: capitals for names and places in your answers.', 'Listening: উত্তরে নাম আর জায়গায় capital।') },
        { skill: 'reading', example: 'The team’s findings, published in 2021, were widely criticised.', note: l('Reading: commas mark extra information; the main clause carries the answer.', 'Reading: comma বাড়তি তথ্য চিহ্নিত করে; মূল clause-এ উত্তর।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'in 2015 the Figure for china was 40%', right: 'In 2015, the figure for China was 40%.', why: l('capital first word, comma after opening, small "figure", capital China, full stop.', 'প্রথম word capital, শুরুর পরে comma, ছোট "figure", capital China, full stop।') },
        { wrong: 'Its clear, that the government must act.', right: 'It is clear that the government must act.', why: l('It is (formal) · no comma before that.', 'It is (formal) · that-এর আগে comma না।') },
        { wrong: 'The two countrie’s figures were similar.', right: 'The two countries’ figures were similar.', why: l('plural owners → countries’.', 'plural মালিক → countries’।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: no hints', 'Practice: কোনো hint নেই'),
      exercises: [
        choice('pu-8-p1', 'pn-capital', { ...P, pattern: 'pn-capitals', prompt: l('Task 1: which sentence is correct?', 'Task 1: কোন sentence-টা ঠিক?'), options: ['The chart compares Canada, Brazil and India.', 'The chart compares canada, brazil and india.', 'The Chart compares Canada, Brazil and India.'], answer: 'The chart compares Canada, Brazil and India.', explanation: l('Countries capital; "chart" small.', 'দেশ capital; "chart" ছোট।'), why: { 'The chart compares canada, brazil and india.': l('Country names need capitals.', 'দেশের নামে capital লাগে।'), 'The Chart compares Canada, Brazil and India.': l('"chart" is an ordinary noun.', '"chart" সাধারণ noun।') } }),
        choice('pu-8-p2', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Task 1: choose the correct form.', 'Task 1: সঠিক form বেছে নিন।'), sentence: 'In 2020, ___ population was larger than Japan’s.', options: ['Germany’s', 'Germanys', 'Germanys’'], answer: 'Germany’s', explanation: l('One country owns the population → Germany’s.', 'একটা দেশের জনসংখ্যা → Germany’s।'), why: { Germanys: l('Possession needs ’s.', 'মালিকানায় ’s লাগে।'), 'Germanys’': l('Germany is one country → Germany’s.', 'Germany একটা দেশ → Germany’s।') } }),
        choice('pu-8-p3', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Task 2: which sentence is correctly punctuated?', 'Task 2: কোন sentence-এর punctuation ঠিক?'), options: ['In my view, schools should teach cooking, budgeting and first aid.', 'In my view schools, should teach cooking budgeting and first aid.', 'In my view, schools should teach, cooking, budgeting, and, first aid.'], answer: 'In my view, schools should teach cooking, budgeting and first aid.', explanation: l('Opening phrase + comma; commas in the list.', 'শুরুর phrase + comma; তালিকায় comma।'), why: { 'In my view schools, should teach cooking budgeting and first aid.': l('The comma belongs after "In my view", and the list needs commas.', 'Comma "In my view"-এর পরে, আর তালিকায় comma লাগে।'), 'In my view, schools should teach, cooking, budgeting, and, first aid.': l('No comma after the verb or after "and".', 'Verb-এর পরে বা "and"-এর পরে comma না।') } }),
        choice('pu-8-p4', 'pn-comma-error', { ...P, pattern: 'pn-run-on', prompt: l('Task 2: which is correctly punctuated?', 'Task 2: কোনটার punctuation ঠিক?'), options: ['Tourism creates jobs. However, it can damage the environment.', 'Tourism creates jobs, however it can damage the environment.', 'Tourism creates jobs however, it can damage the environment.'], answer: 'Tourism creates jobs. However, it can damage the environment.', explanation: l('. However, — no comma splice.', '. However, — comma splice না।'), why: { 'Tourism creates jobs, however it can damage the environment.': l('Comma splice: use a full stop or semicolon before however.', 'Comma splice: however-এর আগে full stop বা semicolon দিন।'), 'Tourism creates jobs however, it can damage the environment.': l('Punctuation is needed BEFORE however.', 'however-এর আগে punctuation লাগে।') } }),
        choice('pu-8-p5', 'pn-colon', { ...P, pattern: 'pn-colon-semi', prompt: l('Task 1: which is correct?', 'Task 1: কোনটা ঠিক?'), options: ['There are two clear trends: a rise in rail travel and a fall in air travel.', 'The clear trends are: a rise in rail travel and a fall in air travel.', 'There are two clear trends; a rise in rail travel and a fall in air travel.'], answer: 'There are two clear trends: a rise in rail travel and a fall in air travel.', explanation: l('Complete sentence + colon + list.', 'পূর্ণ sentence + colon + তালিকা।'), why: { 'The clear trends are: a rise in rail travel and a fall in air travel.': l('No colon straight after "are".', '"are"-এর ঠিক পরে colon না।'), 'There are two clear trends; a rise in rail travel and a fall in air travel.': l('A list follows → colon, not semicolon.', 'পরে তালিকা → colon, semicolon না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        correct('pu-8-r1', 'pn-capital', { ...S, pattern: 'pn-capitals', prompt: l('Proofread: fix the capitals and add the full stop.', 'Proofread: capital ঠিক করুন আর full stop দিন।'), sentence: 'in 2019 most visitors came from india', accepted: ['In 2019 most visitors came from India.', 'In 2019, most visitors came from India.'], explanation: l('In · India · full stop.', 'In · India · full stop।') }),
        correct('pu-8-r2', 'pn-comma-error', { ...P, pattern: 'pn-comma-use', prompt: l('Proofread: remove the wrong comma.', 'Proofread: ভুল comma মুছুন।'), sentence: 'Many experts agree, that sleep is important for learning.', accepted: ['Many experts agree that sleep is important for learning.'], explanation: l('No comma before that.', 'that-এর আগে comma না।') }),
        gap('pu-8-r3', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Write the possessive form of the word in brackets.', 'বন্ধনীর word-এর possessive form লিখুন।'), sentence: 'The two ___ (countries) figures were almost the same.', base: 'countries', accepted: ['countries’', "countries'"], explanation: l('Plural owners ending in s → countries’.', 's-এ শেষ হওয়া plural মালিক → countries’।'), why: { "country's": l('Two countries → plural owner → countries’.', 'দুটো দেশ → plural মালিক → countries’।'), countries: l('Possession needs an apostrophe.', 'মালিকানায় apostrophe লাগে।') } }),
        correct('pu-8-r4', 'pn-comma-error', { ...P, pattern: 'pn-run-on', prompt: l('Proofread: fix the comma splice.', 'Proofread: comma splice ঠিক করুন।'), sentence: 'Prices rose sharply, sales fell.', accepted: ['Prices rose sharply, so sales fell.', 'Prices rose sharply. Sales fell.', 'Prices rose sharply; sales fell.', 'Prices rose sharply, and sales fell.', 'Prices rose sharply, while sales fell.'], explanation: l(', so / . / ;', ', so / . / ;') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('pu-8-c1', 'pn-capital', { ...P, pattern: 'pn-capitals', prompt: l('Which Task 2 sentence is perfectly punctuated?', 'কোন Task 2 sentence-এর punctuation একদম ঠিক?'), options: ['In conclusion, I believe that learning English opens doors for young Bangladeshis.', 'In conclusion I believe, that learning english opens doors for young bangladeshis.', 'in conclusion, I believe that learning English opens doors for Young Bangladeshis'], answer: 'In conclusion, I believe that learning English opens doors for young Bangladeshis.', explanation: l('Opening comma · no comma before that · English, Bangladeshis capital · full stop.', 'শুরুর comma · that-এর আগে comma না · English, Bangladeshis capital · full stop।') }),
        spot('pu-8-c2', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('One word has a wrong apostrophe. Tap it, then fix it.', 'একটা word-এ ভুল apostrophe। Tap করে ঠিক করুন।'), sentence: 'In the 1990’s, few families owned a computer.', wrong: '1990’s', accepted: ['1990s,'], fixOptions: ['1990s,', '1990’s', '1990s’,'], explanation: l('Decades take no apostrophe: 1990s.', 'দশকে apostrophe না: 1990s।') }),
        order('pu-8-c3', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Build the Task 1 sentence.', 'Task 1 sentence-টা সাজান।'), answer: 'Overall, car use rose while bus use fell.', explanation: l('Overall, + main trends.', 'Overall, + মূল trend।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: proofread your own paragraph', 'এবার আপনার পালা: নিজের paragraph proofread করুন'),
      exercises: [
        write('pu-8-y1', 'pn-comma', {
          ...P,
          prompt: l('Task 2: "Should the government pay for university education?" Write 3 sentences, then proofread them in passes: capitals → end marks → commas → apostrophes.', 'Task 2: "Should the government pay for university education?" ৩টা sentence লিখুন, তারপর ধাপে ধাপে proofread করুন: capital → শেষ চিহ্ন → comma → apostrophe।'),
          model: 'In many countries, university education is expensive. If the government paid the fees, students from poor families could study medicine, law or engineering. However, taxpayers’ money is limited, so free education must be planned carefully.',
          checklist: [l('capitals and full stops in every sentence', 'প্রতিটা sentence-এ capital আর full stop'), l('commas: opening, list, before so / but — no splices', 'Comma: শুরু, তালিকা, so / but-এর আগে — splice না'), l('apostrophes only for owners', 'Apostrophe শুধু মালিকের জন্য')],
          explanation: l('Proofread one type at a time.', 'একবারে এক ধরন proofread করুন।'),
          task: 'The student writes 3 Task 2 sentences about free university education and proofreads them. Check all punctuation and capitals with no hints: capitals (first word, I, names, countries, languages, months; small seasons, subjects and general nouns); end marks (full stop after statements and indirect questions, question mark only for direct questions); commas (lists, after opening words and clauses, before and / but / so joining clauses, around extra information; no comma splices, no comma between subject and verb, none before that); apostrophes (’s / s’ for owners, none for plurals or decades, its vs it’s; full forms preferred in Task 2); colons only after complete sentences. For each issue quote the words and give the fix; praise a clean paragraph.',
          target: l('Every mark, no hints', 'প্রতিটা চিহ্ন, কোনো hint ছাড়া'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Proofread in passes: capitals → end marks → commas → apostrophes.', 'ধাপে ধাপে proofread: capital → শেষ চিহ্ন → comma → apostrophe।'),
        l('Every sentence: capital at the start, full stop at the end.', 'প্রতিটা sentence: শুরুতে capital, শেষে full stop।'),
        l('Commas help (lists, openings, , but / , so) — never join two sentences.', 'Comma সাহায্য করে (তালিকা, শুরু, , but / , so) — দুটো sentence কখনো জোড়ে না।'),
      ],
    },
  ],
};

// ======================================================================= pn-9
export const pnReview: Lesson = {
  id: 'pu-9',
  kind: 'test',
  title: l('Punctuation review test', 'Punctuation review test'),
  why: l('Check what you have learned. Your mistakes here decide what Mino suggests you review.', 'কী শিখলেন যাচাই করুন। এখানের ভুল দেখেই Mino ঠিক করবে কী review করতে বলবে।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'concept',
      title: l('How this test works', 'এই test কীভাবে চলবে'),
      body: l(
        '12 questions from every lesson in this module. Answers and explanations come at the end, not after each question. Score 80% or more to complete the module; if you score less, Mino will suggest short reviews for the marks you missed.',
        'এই module-এর সব lesson থেকে ১২টা প্রশ্ন। Answer আর ব্যাখ্যা প্রতিটা প্রশ্নের পরে না, শেষে দেখবেন। ৮০% বা বেশি পেলে module শেষ; কম পেলে যে চিহ্নগুলো ভুল হয়েছে, Mino সেগুলোর ছোট review suggest করবে।',
      ),
    },
    {
      kind: 'practice',
      title: l('Part 1: choose', 'Part 1: বেছে নিন'),
      exercises: [
        choice('pu-9-e1', 'pn-capital', { ...P, pattern: 'pn-capitals', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['I was born in Barishal in April.', 'i was born in barishal in april.', 'I was born in Barishal in april.'], answer: 'I was born in Barishal in April.', explanation: l('I · city · month.', 'I · শহর · মাস।') }),
        choice('pu-9-e2', 'pn-end', { ...P, pattern: 'pn-end-mark', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['She asked me where I lived.', 'She asked me where I lived?', 'She asked me where did I live?'], answer: 'She asked me where I lived.', explanation: l('Reported question → full stop.', 'Reported question → full stop।') }),
        choice('pu-9-e3', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Where does the comma go?', 'Comma কোথায় বসবে?'), options: ['If you arrive late, please wait outside.', 'If you arrive, late please wait outside.', 'If, you arrive late please wait outside.'], answer: 'If you arrive late, please wait outside.', explanation: l('After the opening clause.', 'শুরুর clause-এর পরে।') }),
        choice('pu-9-e4', 'pn-comma-error', { ...P, pattern: 'pn-run-on', prompt: l('Which has NO comma splice?', 'কোনটায় comma splice নেই?'), options: ['The road was flooded, so the bus was late.', 'The road was flooded, the bus was late.', 'The road was flooded, the bus, was late.'], answer: 'The road was flooded, so the bus was late.', explanation: l(', so joins two clauses.', ', so দুটো clause জোড়ে।') }),
        choice('pu-9-e5', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'The company changed ___ logo last year.', options: ['its', 'it’s', 'its’'], answer: 'its', explanation: l('Possessive its.', 'Possessive its।') }),
        choice('pu-9-e6', 'pn-colon', { ...P, pattern: 'pn-colon-semi', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['You need two documents: a passport and a photo.', 'You need: a passport and a photo.', 'You need two documents; a passport and a photo.'], answer: 'You need two documents: a passport and a photo.', explanation: l('Complete sentence + colon + list.', 'পূর্ণ sentence + colon + তালিকা।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Part 2: write and fix', 'Part 2: লিখুন আর ঠিক করুন'),
      exercises: [
        gap('pu-9-e7', 'pn-capital', { ...S, pattern: 'pn-capitals', prompt: l('Write the day with the correct capital letter.', 'সঠিক capital letter দিয়ে দিনটা লিখুন।'), sentence: 'The office is closed on ___ (friday).', base: 'friday', accepted: ['Friday', 'Fridays'], explanation: l('Days → capital.', 'দিন → capital।') }),
        gap('pu-9-e8', 'pn-apostrophe', { ...P, pattern: 'pn-apostrophes', prompt: l('Write the possessive form of the word in brackets.', 'বন্ধনীর word-এর possessive form লিখুন।'), sentence: 'The ___ (children) library opens at ten.', base: 'children', accepted: ['children’s', "children's"], explanation: l('children → children’s.', 'children → children’s।') }),
        correct('pu-9-e9', 'pn-comma-error', { ...P, pattern: 'pn-comma-use', prompt: l('Remove the wrong comma.', 'ভুল comma মুছুন।'), sentence: 'The main reason for the delay, was bad weather.', accepted: ['The main reason for the delay was bad weather.'], explanation: l('No comma between subject and verb.', 'Subject আর verb-এর মাঝে comma না।') }),
        correct('pu-9-e10', 'pn-comma', { ...P, pattern: 'pn-comma-use', prompt: l('Add the commas to the list.', 'তালিকায় comma দিন।'), sentence: 'The shop sells rice lentils oil and sugar.', accepted: ['The shop sells rice, lentils, oil and sugar.', 'The shop sells rice, lentils, oil, and sugar.'], explanation: l('Commas between list items.', 'তালিকার item-এর মাঝে comma।') }),
        correct('pu-9-e11', 'pn-capital', { ...S, pattern: 'pn-capitals', prompt: l('Fix the capitals and add the full stop.', 'Capital ঠিক করুন আর full stop দিন।'), sentence: 'my friend speaks french and arabic', accepted: ['My friend speaks French and Arabic.'], explanation: l('First word and languages → capitals.', 'প্রথম word আর ভাষা → capital।') }),
        correct('pu-9-e12', 'pn-colon', { ...S, pattern: 'pn-colon-semi', prompt: l('Fix the word after the semicolon.', 'Semicolon-এর পরের word ঠিক করুন।'), sentence: 'Rent is high; However, many students live in the city.', accepted: ['Rent is high; however, many students live in the city.'], explanation: l('; however, — small h.', '; however, — ছোট h।') }),
      ],
    },
    {
      kind: 'ielts',
      title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'In 2020, Japan’s exports fell, but China’s rose.', note: l('Task 1: comma, apostrophes, capitals.', 'Task 1: comma, apostrophe, capital।') },
        { skill: 'listening', example: 'Surname: Chowdhury · Month: August', note: l('Listening: capitals in names and months.', 'Listening: নাম আর মাসে capital।') },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Capitals for names, days, months, languages, I; full stop at the end.', 'নাম, দিন, মাস, ভাষা, I-এ capital; শেষে full stop।'),
        l('Commas for lists, openings and , but / , so — never between two sentences.', 'তালিকা, শুরু আর , but / , so-তে comma — দুটো sentence-এর মাঝে কখনো না।'),
        l('Apostrophes for owners (’s / s’) and its vs it’s; colon after a complete sentence.', 'মালিকের জন্য apostrophe (’s / s’) আর its বনাম it’s; পূর্ণ sentence-এর পরে colon।'),
      ],
    },
  ],
};

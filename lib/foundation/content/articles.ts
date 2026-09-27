import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, spot, write } from './pos-kit';

/**
 * Articles (Foundation module 4), the four concept lessons in the v2
 * (problem-first) format: ar-1 a or an (the sound), ar-2 a/an (one of many),
 * ar-3 the (we both know which one), ar-4 no article (talking in general).
 * Bangla has no articles, so every lesson names why Bangla speakers slip.
 * Original Mino content.
 */

export const ARTICLE_CONCEPTS: Concept[] = [
  { id: 'article-a-an', title: l('a or an', 'a নাকি an'), lessonId: 'ar-1', tag: 'article' },
  { id: 'article-a', title: l('a / an: one of many', 'a / an: অনেকের মধ্যে একটা'), lessonId: 'ar-2', tag: 'article' },
  { id: 'article-the', title: l('the: the one we both know', 'the: যেটা দুজনেই চিনি'), lessonId: 'ar-3', tag: 'article' },
  { id: 'article-zero', title: l('No article: talking in general', 'Article ছাড়া: সাধারণভাবে বলা'), lessonId: 'ar-4', tag: 'article' },
];

/** The option students pick when no article is needed. */
export const NO_ARTICLE = '(no article)';
/** Typed answers that mean "no article" in a gap. */
export const NO_ARTICLE_TYPED = ['-', '–', '—', 'x', 'no article', 'nothing', '0'];

const A = { tag: 'article' as const };

// ======================================================================= ar-1
export const aOrAn: Lesson = {
  id: 'ar-1',
  format: 'v2',
  concept: 'article-a-an',
  title: l('a or an? Listen to the sound', 'a নাকি an? শব্দটা শুনুন'),
  why: l('"an university" and "a hour" are small slips an examiner notices at once.', '"an university" আর "a hour" ছোট ভুল, কিন্তু examiner সাথে সাথে খেয়াল করে।'),
  minutes: 8,
  difficulty: 'easy',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('A university application', 'একটা university application'),
      situation: l('You are writing your study plan: "I want to study at ___ university in Canada and become ___ engineer."', 'আপনি আপনার study plan লিখছেন: "I want to study at ___ university in Canada and become ___ engineer."'),
      question: l('Which pair fills the gaps?', 'কোন জোড়াটা gap-এ বসবে?'),
      options: ['an · an', 'a · an', 'a · a'],
      answer: 'a · an',
      diagnose: {
        'an · an': l('Very common! "university" starts with the letter u — and in Bangla we write it with a vowel (ইউনিভার্সিটি). But it starts with a "yoo" sound, like "you". A consonant sound → "a university".', 'খুব common! "university" u অক্ষর দিয়ে শুরু — আর বাংলায়ও আমরা স্বরবর্ণ দিয়ে লিখি (ইউনিভার্সিটি)। কিন্তু উচ্চারণ শুরু হয় "ইউ" (you-এর মতো) দিয়ে। Consonant sound → "a university"।'),
        'a · an': l('Right. "university" starts with a "yoo" sound → a. "engineer" starts with a vowel sound → an.', 'ঠিক। "university" শুরু "ইউ" sound দিয়ে → a। "engineer" শুরু vowel sound দিয়ে → an।'),
        'a · a': l('"a university" is right, but "engineer" begins with a vowel sound ("en-"), so it needs "an".', '"a university" ঠিক, কিন্তু "engineer" vowel sound ("এন-") দিয়ে শুরু, তাই "an" লাগবে।'),
      },
    },
    {
      kind: 'discover',
      title: l('Say them out loud', 'জোরে বলে দেখুন'),
      items: [
        { en: 'a university · a European city · a one-year course', note: l('"yoo-", "yoo-", "wun-": consonant sounds', '"ইউ-", "ইউ-", "ওয়ান-": consonant sound') },
        { en: 'an hour · an honest answer', note: l('the h is silent: "our", "onest"', 'h উচ্চারণ হয় না: "আওয়ার", "অনেস্ট"') },
        { en: 'an MBA · an 8% rise · an IELTS test', note: l('"em-", "eight", "eye-": vowel sounds', '"এম-", "এইট", "আই-": vowel sound') },
        { en: 'an increase · a big increase', note: l('the next word decides, not the noun', 'পরের word-টাই ঠিক করে, noun না') },
      ],
      question: l('What decides a or an?', 'a নাকি an — কী ঠিক করে?'),
      options: [
        l('The first sound of the next word', 'পরের word-এর প্রথম sound'),
        l('The first letter of the next word', 'পরের word-এর প্রথম অক্ষর'),
        l('Whether the noun is important', 'Noun-টা গুরুত্বপূর্ণ কিনা'),
      ],
      answer: 0,
      pattern: l('Listen, don’t look: a vowel SOUND → an; a consonant SOUND → a. The word right after the article decides.', 'দেখুন না, শুনুন: vowel SOUND → an; consonant SOUND → a। Article-এর ঠিক পরের word-টাই ঠিক করে।'),
    },
    {
      kind: 'concept',
      title: l('When to use an — and when not to', 'কখন an — আর কখন না'),
      body: l(
        'a and an mean the same thing. Use "an" before a vowel sound and "a" before a consonant sound. The sound of the next word decides, even if it is an adjective or a number.',
        'a আর an-এর মানে একই। Vowel sound-এর আগে "an", consonant sound-এর আগে "a"। পরের word-এর sound ঠিক করে, সেটা adjective বা সংখ্যা হলেও।',
      ),
      points: [
        l('an + vowel sound: an apple, an hour, an MBA, an 18-year-old, an honest person, an IELTS score.', 'an + vowel sound: an apple, an hour, an MBA, an 18-year-old, an honest person, an IELTS score।'),
        l('a + consonant sound: a university, a useful tip, a European country, a one-way ticket, a UK visa.', 'a + consonant sound: a university, a useful tip, a European country, a one-way ticket, a UK visa।'),
        l('The next word decides: an increase → a sharp increase; a rise → an 8% rise.', 'পরের word ঠিক করে: an increase → a sharp increase; a rise → an 8% rise।'),
        l('NOT by the letter: "u" can sound like "yoo" (a university), "h" can be silent (an hour).', 'অক্ষর দেখে না: "u" "ইউ"-এর মতো শোনাতে পারে (a university), "h" নীরব থাকতে পারে (an hour)।'),
        l('Why Bangla speakers slip: we write "university" in Bangla with a vowel (ইউ), and Bangla spelling follows sounds letter by letter, so English spelling misleads us. Say the word first, then choose.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় "ইউনিভার্সিটি" স্বরবর্ণ দিয়ে লিখি, আর বাংলা বানান সাধারণত উচ্চারণ মেনে চলে, তাই English বানান আমাদের বিভ্রান্ত করে। আগে word-টা বলুন, তারপর বেছে নিন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'It takes an hour to get to campus.', note: l('"hour" starts with a vowel sound (silent h).', '"hour"-এর h নীরব, vowel sound দিয়ে শুরু।') },
        { en: 'She got a scholarship to a university in Germany.', note: l('"university" = "yoo-niversity".', '"university" = "ইউ-নিভার্সিটি"।') },
        { en: 'There was an 11% fall in rice prices.', note: l('"eleven" starts with a vowel sound.', '"eleven" vowel sound দিয়ে শুরু।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'There was an 8% increase in exports, followed by a steady decline.', note: l('Task 1 numbers: say the number ("eight") to choose a or an.', 'Task 1-এর সংখ্যা: সংখ্যাটা বলে ("eight") a বা an বেছে নিন।') },
        { skill: 'speaking', example: 'I’m hoping to do an MBA at a university in Australia.', note: l('Part 1 plans: "an MBA", "a university" — both sound natural when you get them right.', 'Part 1-এর plan: "an MBA", "a university" — ঠিক বললে দুটোই স্বাভাবিক শোনায়।') },
        { skill: 'listening', example: 'The tour lasts an hour and a half.', note: l('Listen for "an" before numbers and times: it tells you the next word starts with a vowel sound.', 'সংখ্যা আর সময়ের আগে "an" শুনুন: বোঝায় পরের word vowel sound দিয়ে শুরু।') },
        { skill: 'reading', example: 'A unique feature of the building is its roof.', note: l('Reading shows the rule in action: "a unique", "an honour". Notice it and copy it.', 'Reading-এ নিয়মটা কাজে দেখা যায়: "a unique", "an honour"। খেয়াল করুন আর নিজেও ব্যবহার করুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I study at an university.', right: 'I study at a university.', why: l('"university" starts with a "yoo" sound.', '"university" "ইউ" sound দিয়ে শুরু।') },
        { wrong: 'I waited for a hour.', right: 'I waited for an hour.', why: l('The h is silent: "our".', 'h নীরব: "আওয়ার"।') },
        { wrong: 'There was a 11% rise.', right: 'There was an 11% rise.', why: l('"eleven" starts with a vowel sound.', '"eleven" vowel sound দিয়ে শুরু।') },
        { wrong: 'It was an useful lesson.', right: 'It was a useful lesson.', why: l('"useful" = "yoos-ful": a consonant sound.', '"useful" = "ইউজফুল": consonant sound।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ar-1-p1', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Choose a or an.', 'a নাকি an বেছে নিন।'), sentence: 'The bus was ___ hour late.', options: ['a', 'an'], answer: 'an', explanation: l('Silent h: "an hour".', 'h নীরব: "an hour"।'), why: { a: l('Look past the letter h: it is silent, so the word starts with a vowel sound.', 'h অক্ষরটা নীরব, তাই word-টা vowel sound দিয়ে শুরু।') } }),
        choice('ar-1-p2', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Choose a or an.', 'a নাকি an বেছে নিন।'), sentence: 'My cousin studies at ___ university in Malaysia.', options: ['a', 'an'], answer: 'a', explanation: l('"yoo-niversity": consonant sound → a.', '"ইউ-নিভার্সিটি": consonant sound → a।'), why: { an: l('The letter is u, but the sound is "yoo" — a consonant sound.', 'অক্ষর u, কিন্তু sound "ইউ" — consonant sound।') } }),
        choice('ar-1-p3', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Task 1: choose a or an.', 'Task 1: a নাকি an বেছে নিন।'), sentence: 'There was ___ 8% rise in exports in 2021.', options: ['a', 'an'], answer: 'an', explanation: l('Say it: "an eight percent rise".', 'বলে দেখুন: "an eight percent rise"।'), why: { a: l('Read the number as a word: "eight" starts with a vowel sound.', 'সংখ্যাটা word হিসেবে পড়ুন: "eight" vowel sound দিয়ে শুরু।') } }),
        choice('ar-1-p4', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Choose a or an.', 'a নাকি an বেছে নিন।'), sentence: 'I am preparing for ___ IELTS test in March.', options: ['a', 'an'], answer: 'an', explanation: l('IELTS = "eye-elts": vowel sound → an.', 'IELTS = "আই-এল্টস": vowel sound → an।') }),
        choice('ar-1-p5', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Choose a or an.', 'a নাকি an বেছে নিন।'), sentence: 'She joined ___ one-year English course.', options: ['a', 'an'], answer: 'a', explanation: l('"one" = "wun": consonant sound → a.', '"one" = "ওয়ান": consonant sound → a।'), why: { an: l('"one" starts with the letter o, but the sound is "w".', '"one" o দিয়ে শুরু, কিন্তু sound "ওয়"।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ar-1-r1', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Write a or an.', 'a বা an লিখুন।'), sentence: 'It was ___ honest mistake.', accepted: ['an'], explanation: l('"honest" = "onest": silent h → an.', '"honest" = "অনেস্ট": h নীরব → an।'), why: { a: l('The h in "honest" is silent.', '"honest"-এর h নীরব।') } }),
        gap('ar-1-r2', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Write a or an.', 'a বা an লিখুন।'), sentence: 'Paris is ___ European city with many universities.', accepted: ['a'], explanation: l('"European" = "yoo-ropean": consonant sound → a.', '"European" = "ইউ-রোপিয়ান": consonant sound → a।'), why: { an: l('"European" starts with a "yoo" sound.', '"European" "ইউ" sound দিয়ে শুরু।') } }),
        spot('ar-1-r3', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('One article is wrong. Tap it and type the right one.', 'একটা article ভুল। সেটায় tap করে ঠিকটা লিখুন।'), sentence: 'The flight took an hour, which is a unusual delay.', wrong: 'a', accepted: ['an'], explanation: l('"unusual" = "un-": vowel sound → an.', '"unusual" = "আন-": vowel sound → an।') }),
        correct('ar-1-r4', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Correct both articles.', 'দুটো article-ই ঠিক করুন।'), sentence: 'I bought a umbrella and an useful map.', accepted: ['I bought an umbrella and a useful map.'], explanation: l('"umbrella" = "um-" (vowel sound); "useful" = "yoos-" (consonant sound).', '"umbrella" = "আম-" (vowel sound); "useful" = "ইউজ-" (consonant sound)।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ar-1-c1', 'article-a-an', { ...A, prompt: l('Why "a university" but "an umbrella"?', 'কেন "a university" কিন্তু "an umbrella"?'), options: ['"university" starts with a "yoo" sound; "umbrella" starts with a vowel sound', '"university" is a longer word', '"umbrella" is a countable noun'], answer: '"university" starts with a "yoo" sound; "umbrella" starts with a vowel sound', explanation: l('Same letter, different sounds. The sound decides.', 'একই অক্ষর, আলাদা sound। Sound-ই ঠিক করে।') }),
        spot('ar-1-c2', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('One word breaks this Task 1 sentence. Tap it, then fix it.', 'একটা word Task 1 sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'The chart shows a 11% fall in car sales.', wrong: 'a', accepted: ['an'], fixOptions: ['an', 'the', 'one'], explanation: l('"eleven" starts with a vowel sound → an 11% fall.', '"eleven" vowel sound দিয়ে শুরু → an 11% fall।') }),
        choice('ar-1-c3', 'article-a-an', { ...A, prompt: l('Choose the correct pair.', 'সঠিক জোড়া বেছে নিন।'), sentence: 'There was ___ big increase in 2019 and ___ enormous increase in 2020.', options: ['a · an', 'an · a', 'an · an'], answer: 'a · an', explanation: l('The word right after the article decides: "big" (consonant) → a; "enormous" (vowel) → an.', 'Article-এর ঠিক পরের word ঠিক করে: "big" (consonant) → a; "enormous" (vowel) → an।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: your study plan', 'এবার আপনার পালা: আপনার study plan'),
      exercises: [
        write('ar-1-y1', 'article-a-an', {
          ...A,
          prompt: l('Speaking Part 1: "What are your plans for the future?" Answer in 2 sentences. Use at least two of: university, hour, MBA, IELTS, one-year, honest.', 'Speaking Part 1: "What are your plans for the future?" ২টা sentence-এ উত্তর দিন। অন্তত দুটো ব্যবহার করুন: university, hour, MBA, IELTS, one-year, honest।'),
          model: 'I want to do an MBA at a university in Canada. First, I need to get a good IELTS score, so I study for an hour every evening.',
          checklist: [l('a before a consonant SOUND (a university, a one-year)', 'consonant SOUND-এর আগে a (a university, a one-year)'), l('an before a vowel SOUND (an hour, an MBA, an IELTS)', 'vowel SOUND-এর আগে an (an hour, an MBA, an IELTS)')],
          explanation: l('Say each word before you write the article.', 'Article লেখার আগে প্রতিটা word বলে দেখুন।'),
          task: 'The student answers "What are your plans for the future?" in 2 sentences using words like university, hour, MBA, IELTS, one-year, honest. Check a vs an: "an" before a vowel SOUND (an hour, an MBA, an IELTS score, an 8% rise), "a" before a consonant SOUND (a university, a useful, a European, a one-year). If the student chose by the letter, name the word and say how it sounds ("university" = "yoo-niversity" → a). Keep article errors separate from other grammar errors.',
          target: l('a / an by the first sound', 'প্রথম sound দেখে a / an'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Say it, then choose: vowel SOUND → an, consonant SOUND → a.', 'বলে দেখুন, তারপর বেছে নিন: vowel SOUND → an, consonant SOUND → a।'),
        l('a university · a European · a one-year · an hour · an honest · an MBA · an 8%', 'a university · a European · a one-year · an hour · an honest · an MBA · an 8%'),
        l('The word right after the article decides (a big increase, an enormous increase).', 'Article-এর ঠিক পরের word ঠিক করে (a big increase, an enormous increase)।'),
      ],
    },
  ],
};

// ======================================================================= ar-2
export const aAnMeaning: Lesson = {
  id: 'ar-2',
  format: 'v2',
  concept: 'article-a',
  title: l('a / an: one of many', 'a / an: অনেকের মধ্যে একটা'),
  why: l('"I am student" is the first sentence many candidates say in Speaking Part 1.', '"I am student" — Speaking Part 1-এ অনেক candidate-এর প্রথম sentence-ই এটা।'),
  minutes: 10,
  difficulty: 'easy',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Speaking Part 1, first question', 'Speaking Part 1-এর প্রথম প্রশ্ন'),
      situation: l('The examiner asks: "Do you work or are you a student?"', 'Examiner জিজ্ঞেস করলেন: "Do you work or are you a student?"'),
      question: l('What do you say?', 'আপনি কী বলবেন?'),
      options: ['I am student.', 'I am a student.', 'I am the student.'],
      answer: 'I am a student.',
      diagnose: {
        'I am student.': l('The most common slip! Bangla says "আমি ছাত্র" with nothing before the noun. But in English, one countable thing (a student, a doctor) always needs a word before it: a, the, my…', 'সবচেয়ে common ভুল! বাংলায় "আমি ছাত্র" — noun-এর আগে কিছু লাগে না। কিন্তু English-এ গোনা যায় এমন একটা জিনিসের (a student, a doctor) আগে সবসময় কিছু লাগে: a, the, my…'),
        'I am a student.': l('Right. You are one student among many → a student.', 'ঠিক। আপনি অনেক student-এর মধ্যে একজন → a student।'),
        'I am the student.': l('"the student" means one particular student the examiner already knows about ("the student who called yesterday"). Here you are just saying what you are.', '"the student" মানে এমন একজন নির্দিষ্ট student যাকে examiner আগে থেকেই চেনেন ("the student who called yesterday")। এখানে আপনি শুধু বলছেন আপনি কী।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করুন'),
      items: [
        { en: 'My father is a teacher.', note: l('a job', 'একটা পেশা') },
        { en: 'I bought a phone yesterday.', note: l('first mention: the listener doesn’t know which phone', 'প্রথমবার বলা: শ্রোতা জানে না কোন phone') },
        { en: 'Dhaka is a busy city.', note: l('one of many busy cities', 'অনেক ব্যস্ত শহরের একটা') },
        { en: 'Pollution is a serious problem.', note: l('one example of a kind', 'এক ধরনের একটা উদাহরণ') },
      ],
      question: l('What is true in all four?', 'চারটাতেই কোনটা সত্যি?'),
      options: [
        l('One countable thing, not a particular one the listener knows', 'গোনা যায় এমন একটা জিনিস, শ্রোতার চেনা নির্দিষ্ট কোনোটা না'),
        l('Plural nouns', 'Plural noun'),
        l('Nouns you can’t count (water, information)', 'যে noun গোনা যায় না (water, information)'),
      ],
      answer: 0,
      pattern: l('a / an = one countable thing, one of many, not a particular one: a job, a first mention, "X is a Y".', 'a / an = গোনা যায় এমন একটা জিনিস, অনেকের মধ্যে একটা, নির্দিষ্ট না: পেশা, প্রথমবার বলা, "X is a Y"।'),
    },
    {
      kind: 'concept',
      title: l('When to use a / an — and when not to', 'কখন a / an — আর কখন না'),
      body: l(
        'Use a / an with ONE countable thing when it is not a particular one: jobs (a nurse), first mention (I saw a dog), one of many (a good idea, a big city), and "X is a Y" descriptions.',
        'গোনা যায় এমন একটা জিনিস যখন নির্দিষ্ট না, তখন a / an: পেশা (a nurse), প্রথমবার বলা (I saw a dog), অনেকের একটা (a good idea, a big city), আর "X is a Y" ধরনের বর্ণনা।',
      ),
      points: [
        l('A single countable noun can never stand alone: a student, the student, my student — never just "student".', 'গোনা যায় এমন একবচন noun একা দাঁড়াতে পারে না: a student, the student, my student — শুধু "student" কখনো না।'),
        l('NOT with plurals: "a students" ✗ → students / some students.', 'Plural-এর সাথে না: "a students" ✗ → students / some students।'),
        l('NOT with uncountable nouns: an advice ✗, a information ✗, a good news ✗ → some advice, a piece of information, good news.', 'Uncountable noun-এর সাথে না: an advice ✗, a information ✗, a good news ✗ → some advice, a piece of information, good news।'),
        l('NOT when the listener already knows which one: use "the" (next lesson).', 'শ্রোতা আগেই জানলে কোনটা, তখন না: তখন "the" (পরের lesson)।'),
        l('Why Bangla speakers slip: Bangla needs nothing before a noun ("আমি ছাত্র", "সে ডাক্তার"), and "একটা" sounds too strong, so the article disappears. In English, one countable thing always needs its little word.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় noun-এর আগে কিছু লাগে না ("আমি ছাত্র", "সে ডাক্তার"), আর "একটা" বললে বেশি জোর দেওয়া মনে হয়, তাই article হারিয়ে যায়। English-এ গোনা যায় এমন একটা জিনিসের আগে ছোট word-টা লাগবেই।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'My sister is a nurse at a hospital in Rajshahi.', note: l('a job; one of many hospitals.', 'পেশা; অনেক hospital-এর একটা।') },
        { en: 'Can I give you some advice?', note: l('advice is uncountable: some advice, not "an advice".', 'advice uncountable: some advice, "an advice" না।') },
        { en: 'That’s a great question.', note: l('one of many possible questions.', 'অনেক প্রশ্নের একটা।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'I’m a student, and I live in a small flat near my college.', note: l('Part 1: jobs and places need a / an.', 'Part 1: পেশা আর জায়গায় a / an লাগে।') },
        { skill: 'writing', example: 'Unemployment is a serious problem in many developing countries.', note: l('Task 2: "X is a Y" statements.', 'Task 2: "X is a Y" ধরনের বক্তব্য।') },
        { skill: 'reading', example: 'A new study suggests that sleep improves memory.', note: l('"A" introduces something new; later the text will say "the study".', '"A" নতুন কিছু আনে; পরে text-এ বলবে "the study"।') },
        { skill: 'listening', example: 'I’d like to book a single room for two nights.', note: l('Form completion: "a single room" — write the noun, not the article.', 'Form completion: "a single room" — article না, noun লিখুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I am student.', right: 'I am a student.', why: l('One countable thing needs a / an.', 'গোনা যায় এমন একটা জিনিসে a / an লাগে।') },
        { wrong: 'She gave me an advice.', right: 'She gave me some advice.', why: l('advice is uncountable.', 'advice uncountable।') },
        { wrong: 'It is a good news.', right: 'It is good news.', why: l('news is uncountable.', 'news uncountable।') },
        { wrong: 'They are a good teachers.', right: 'They are good teachers.', why: l('No a / an with plurals.', 'Plural-এর সাথে a / an না।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ar-2-p1', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['My mother is a doctor.', 'My mother is doctor.', 'My mother is the doctor.'], answer: 'My mother is a doctor.', explanation: l('A job, one of many doctors → a doctor.', 'পেশা, অনেক ডাক্তারের একজন → a doctor।'), why: { 'My mother is doctor.': l('"doctor" is one countable thing: it needs a / an.', '"doctor" গোনা যায় এমন একটা জিনিস: a / an লাগবে।'), 'My mother is the doctor.': l('"the doctor" is a particular doctor both people already know.', '"the doctor" মানে দুজনেরই চেনা নির্দিষ্ট ডাক্তার।') } }),
        choice('ar-2-p2', 'article-a', { ...A, pattern: 'noun-count', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'Can you give me ___ advice about the IELTS exam?', options: ['an', 'some', 'a'], answer: 'some', explanation: l('advice is uncountable: some advice / a piece of advice.', 'advice uncountable: some advice / a piece of advice।'), why: { an: l('You can’t count advice, so no a / an.', 'advice গোনা যায় না, তাই a / an না।'), a: l('You can’t count advice, so no a / an.', 'advice গোনা যায় না, তাই a / an না।') } }),
        choice('ar-2-p3', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'I live in ___ small flat near the station.', options: ['a', NO_ARTICLE, 'the'], answer: 'a', explanation: l('First mention of one flat → a.', 'একটা flat-এর প্রথম উল্লেখ → a।'), why: { [NO_ARTICLE]: l('"flat" is one countable thing: it can’t stand alone.', '"flat" গোনা যায় এমন একটা জিনিস: একা দাঁড়াতে পারে না।'), the: l('The listener doesn’t know your flat yet: this is the first mention.', 'শ্রোতা এখনো আপনার flat চেনে না: এটা প্রথম উল্লেখ।') } }),
        choice('ar-2-p4', 'article-a', { ...A, pattern: 'noun-count', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['I have some good news for you.', 'I have a good news for you.', 'I have a good newses for you.'], answer: 'I have some good news for you.', explanation: l('news is uncountable (even with -s).', 'news uncountable (-s থাকলেও)।') }),
        choice('ar-2-p5', 'article-a', { ...A, prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'Many students work part-time. They are ___ hard-working people.', options: [NO_ARTICLE, 'a', 'an'], answer: NO_ARTICLE, explanation: l('"people" is plural → no a / an.', '"people" plural → a / an না।'), why: { a: l('a / an means one; "people" is many.', 'a / an মানে একটা; "people" অনেক।'), an: l('a / an means one; "people" is many.', 'a / an মানে একটা; "people" অনেক।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        spot('ar-2-r1', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Something is missing before one word. Tap that word and write it with what is missing.', 'একটা word-এর আগে কিছু বাদ পড়েছে। সেই word-এ tap করে যা বাদ পড়েছে সেটা সহ লিখুন।'), sentence: 'My uncle is engineer in Chattogram.', wrong: 'engineer', accepted: ['an engineer'], explanation: l('A job → an engineer (vowel sound).', 'পেশা → an engineer (vowel sound)।') }),
        correct('ar-2-r2', 'article-a', { ...A, pattern: 'noun-count', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'The website gave me an useful information.', accepted: ['The website gave me some useful information.', 'The website gave me useful information.', 'The website gave me a piece of useful information.', 'The website gave me a useful piece of information.'], explanation: l('information is uncountable: some useful information.', 'information uncountable: some useful information।') }),
        gap('ar-2-r3', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Write the missing word.', 'বাদ পড়া word-টা লিখুন।'), sentence: 'Dhaka is ___ very crowded city.', accepted: ['a'], explanation: l('One of many crowded cities → a ("very" starts with a consonant sound).', 'অনেক ভিড়ের শহরের একটা → a ("very" consonant sound দিয়ে শুরু)।') }),
        correct('ar-2-r4', 'article-a', { ...A, prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'They are a good students.', accepted: ['They are good students.'], explanation: l('Plural → no a / an.', 'Plural → a / an না।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ar-2-c1', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Why is "I am student" wrong?', '"I am student" কেন ভুল?'), options: ['"student" is one countable thing, so it needs a / an', '"student" is uncountable', 'The verb should be "is"'], answer: '"student" is one countable thing, so it needs a / an', explanation: l('A single countable noun needs a word before it.', 'গোনা যায় এমন একবচন noun-এর আগে একটা word লাগে।') }),
        choice('ar-2-c2', 'article-a', { ...A, prompt: l('Speaking Part 1: "Where do you live?" Pick the best answer.', 'Speaking Part 1: "Where do you live?" সবচেয়ে ভালো উত্তর বেছে নিন।'), options: ['I live in a quiet area near a big lake.', 'I live in quiet area near big lake.', 'I live in the quiet area near the big lake.'], answer: 'I live in a quiet area near a big lake.', explanation: l('First mention of places the examiner doesn’t know → a.', 'Examiner-এর অচেনা জায়গার প্রথম উল্লেখ → a।') }),
        choice('ar-2-c3', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Task 2: choose the correct word.', 'Task 2: সঠিক word বেছে নিন।'), sentence: 'Traffic congestion is ___ major problem in Dhaka.', options: ['a', NO_ARTICLE, 'the'], answer: 'a', explanation: l('"X is a Y": congestion is one of many major problems.', '"X is a Y": যানজট অনেক বড় সমস্যার একটা।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: introduce yourself', 'এবার আপনার পালা: নিজের পরিচয় দিন'),
      exercises: [
        write('ar-2-y1', 'article-a', {
          ...A,
          prompt: l('Speaking Part 1: "Do you work or study? Tell me about where you live." Answer in 2 sentences.', 'Speaking Part 1: "Do you work or study? Tell me about where you live." ২টা sentence-এ উত্তর দিন।'),
          model: 'I’m a student at a college in Sylhet. I live in a small flat with my family near a busy market.',
          checklist: [l('a / an before a job and first-mention places', 'পেশা আর প্রথমবার বলা জায়গার আগে a / an'), l('No a / an with plurals or uncountables (advice, information)', 'Plural বা uncountable-এ (advice, information) a / an না')],
          explanation: l('One countable thing, first time → a / an.', 'গোনা যায় এমন একটা জিনিস, প্রথমবার → a / an।'),
          task: 'The student answers "Do you work or study? Tell me about where you live." in 2 sentences. Check a/an: a single countable noun (student, teacher, flat, city) needs a/an when it is a job, a first mention or one of many ("I am a student", "a small flat"); no a/an with plurals ("a friends") or uncountable nouns ("an advice", "a information", "a good news"). If the student writes "I am student", explain that Bangla needs no word before the noun, but English needs "a" before one countable thing. Keep article errors separate from other errors.',
          target: l('a / an with one countable thing', 'গোনা যায় এমন একটা জিনিসে a / an'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('One countable thing never stands alone: a / the / my student.', 'গোনা যায় এমন একটা জিনিস একা দাঁড়ায় না: a / the / my student।'),
        l('a / an: jobs, first mention, one of many, "X is a Y".', 'a / an: পেশা, প্রথম উল্লেখ, অনেকের একটা, "X is a Y"।'),
        l('Never a / an with plurals or uncountables: some advice, good news.', 'Plural বা uncountable-এ কখনো a / an না: some advice, good news।'),
      ],
    },
  ],
};

// ======================================================================= ar-3
export const theArticle: Lesson = {
  id: 'ar-3',
  format: 'v2',
  concept: 'article-the',
  title: l('the: the one we both know', 'the: যেটা দুজনেই চিনি'),
  why: l('Every Task 1 answer starts with "The graph shows the number of…".', 'প্রতিটা Task 1 answer শুরু হয় "The graph shows the number of…" দিয়ে।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('The first line of Task 1', 'Task 1-এর প্রথম লাইন'),
      situation: l('You start your Task 1 answer: "___ graph shows ___ number of tourists who visited Cox’s Bazar between 2015 and 2020."', 'আপনি Task 1 answer শুরু করছেন: "___ graph shows ___ number of tourists who visited Cox’s Bazar between 2015 and 2020."'),
      question: l('Which pair fills the gaps?', 'কোন জোড়াটা gap-এ বসবে?'),
      options: ['The · the', 'A · a', '(no article) · (no article)'],
      answer: 'The · the',
      diagnose: {
        'The · the': l('Right. There is one graph in front of you both, and "the number of tourists" is the exact figure it shows.', 'ঠিক। আপনাদের দুজনের সামনে একটাই graph, আর "the number of tourists" হলো graph-এর দেখানো নির্দিষ্ট সংখ্যা।'),
        'A · a': l('"A graph" would be any graph. The examiner knows exactly which graph: the one in the task. And "a number of" means "several", not the exact figure.', '"A graph" মানে যেকোনো graph। Examiner ঠিক জানেন কোন graph: task-এরটা। আর "a number of" মানে "কয়েকটা", নির্দিষ্ট সংখ্যা না।'),
        '(no article) · (no article)': l('Common for Bangla speakers ("গ্রাফটি দেখায়…"): Bangla puts -টি after the noun, English puts "the" before it. "graph" is one countable thing, so it can’t stand alone.', 'বাংলাভাষীদের জন্য common ("গ্রাফটি দেখায়…"): বাংলা noun-এর পরে -টি বসায়, English বসায় আগে "the"। "graph" গোনা যায় এমন একটা জিনিস, একা দাঁড়াতে পারে না।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করুন'),
      items: [
        { en: 'I bought a phone and a bag. The phone was cheap.', note: l('second mention', 'দ্বিতীয়বার বলা') },
        { en: 'The sun rises in the east.', note: l('there is only one', 'একটাই আছে') },
        { en: 'This was the highest figure in the chart.', note: l('superlative: only one can be highest', 'superlative: সবচেয়ে বেশি একটাই হতে পারে') },
        { en: 'The price of rice rose in 2022.', note: l('"of rice" tells you exactly which price', '"of rice" বলে দেয় ঠিক কোন দাম') },
      ],
      question: l('When do we use "the"?', '"the" কখন বসে?'),
      options: [
        l('When the writer and the reader both know exactly which one', 'যখন লেখক আর পাঠক দুজনেই ঠিক জানে কোনটা'),
        l('Before every important noun', 'প্রতিটা গুরুত্বপূর্ণ noun-এর আগে'),
        l('Only before plural nouns', 'শুধু plural noun-এর আগে'),
      ],
      answer: 0,
      pattern: l('the = "you know which one": said before, only one, the highest/first, or made exact by "of…" / "that…".', 'the = "আপনি জানেন কোনটা": আগে বলা, একটাই আছে, the highest/first, বা "of…" / "that…" দিয়ে নির্দিষ্ট।'),
    },
    {
      kind: 'concept',
      title: l('When to use the — and when not to', 'কখন the — আর কখন না'),
      body: l(
        'Use "the" when the reader can tell exactly which thing you mean: you mentioned it before, there is only one, it is the highest / first / best, or a phrase after it (of…, that…, in the chart) makes it exact.',
        'পাঠক ঠিক বুঝতে পারলে কোন জিনিসটা, তখন "the": আগে বলেছেন, একটাই আছে, সবচেয়ে বেশি / প্রথম / সেরা, অথবা পরের phrase (of…, that…, in the chart) সেটাকে নির্দিষ্ট করেছে।',
      ),
      points: [
        l('Second mention: a phone → the phone.', 'দ্বিতীয়বার: a phone → the phone।'),
        l('Only one: the sun, the internet, the government, the environment.', 'একটাই: the sun, the internet, the government, the environment।'),
        l('Superlatives and order: the highest, the most popular, the first, the last.', 'Superlative আর ক্রম: the highest, the most popular, the first, the last।'),
        l('Made exact by "of": the number of, the percentage of, the price of, the capital of.', '"of" দিয়ে নির্দিষ্ট: the number of, the percentage of, the price of, the capital of।'),
        l('NOT for things in general ("Education is important", not "The education") and NOT with most names of people, cities and countries (Dhaka, Bangladesh — but the UK, the USA).', 'সাধারণভাবে বলা জিনিসে না ("Education is important", "The education" না), আর বেশিরভাগ মানুষ, শহর, দেশের নামে না (Dhaka, Bangladesh — কিন্তু the UK, the USA)।'),
        l('Why Bangla speakers slip: Bangla marks "the" after the noun (বইটা, গ্রাফটি), so English "the" before the noun is easy to forget — or to add everywhere to sound formal.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় "the"-এর কাজ noun-এর পরে হয় (বইটা, গ্রাফটি), তাই English-এ noun-এর আগে "the" ভুলে যাওয়া সহজ — অথবা formal শোনাতে সব জায়গায় বসিয়ে ফেলা।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'I ordered a burger and a juice. The juice was too sweet.', note: l('Second mention → the.', 'দ্বিতীয়বার → the।') },
        { en: 'Sylhet has the highest rainfall in the country.', note: l('Superlative → the highest.', 'Superlative → the highest।') },
        { en: 'The percentage of women in the workforce increased.', note: l('"of women" makes it exact.', '"of women" নির্দিষ্ট করে।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'The bar chart shows the percentage of households with internet access.', note: l('Task 1: "The chart" and "the + of" in almost every sentence.', 'Task 1: প্রায় প্রতিটা sentence-এ "The chart" আর "the + of"।') },
        { skill: 'speaking', example: 'The best place in my city is the old river bank.', note: l('Part 2: superlatives need the.', 'Part 2: superlative-এ the লাগে।') },
        { skill: 'reading', example: 'A new bridge opened in 2019. The bridge cut travel time by half.', note: l('"The bridge" points back to something already mentioned: find it.', '"The bridge" আগে বলা কিছুর দিকে ইঙ্গিত করে: সেটা খুঁজে বের করুন।') },
        { skill: 'listening', example: 'The library is on the second floor, next to the café.', note: l('Maps: "the" names places both speakers can see.', 'Map: "the" দিয়ে এমন জায়গা বোঝায় যা দুজনেই দেখছে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Number of students increased in 2020.', right: 'The number of students increased in 2020.', why: l('"of students" makes it exact → The number.', '"of students" নির্দিষ্ট করে → The number।') },
        { wrong: 'He is best player in our team.', right: 'He is the best player in our team.', why: l('Superlative → the best.', 'Superlative → the best।') },
        { wrong: 'I watched a film. A film was about war.', right: 'I watched a film. The film was about war.', why: l('Second mention → the.', 'দ্বিতীয়বার → the।') },
        { wrong: 'Sun sets in west.', right: 'The sun sets in the west.', why: l('Only one sun, only one west.', 'সূর্য একটাই, পশ্চিমও একটাই।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ar-3-p1', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Task 1: choose the correct word.', 'Task 1: সঠিক word বেছে নিন।'), sentence: '___ number of students in private universities rose in 2020.', options: ['The', 'A', NO_ARTICLE], answer: 'The', explanation: l('The exact figure the chart shows → The number of.', 'Chart-এর দেখানো নির্দিষ্ট সংখ্যা → The number of।'), why: { A: l('"A number of" means "several", not the exact figure.', '"A number of" মানে "কয়েকটা", নির্দিষ্ট সংখ্যা না।'), [NO_ARTICLE]: l('"number" is one countable thing: it can’t stand alone.', '"number" গোনা যায় এমন একটা জিনিস: একা দাঁড়াতে পারে না।') } }),
        choice('ar-3-p2', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'The Padma is one of ___ longest rivers in Bangladesh.', options: ['the', 'a', NO_ARTICLE], answer: 'the', explanation: l('Superlative → the longest.', 'Superlative → the longest।') }),
        choice('ar-3-p3', 'article-the', { ...A, prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'I ordered a pizza and a salad. ___ pizza was cold.', options: ['The', 'A', NO_ARTICLE], answer: 'The', explanation: l('Second mention: we know which pizza → The.', 'দ্বিতীয়বার: আমরা জানি কোন pizza → The।'), why: { A: l('"A pizza" would be a new, different pizza.', '"A pizza" মানে নতুন, অন্য একটা pizza।') } }),
        choice('ar-3-p4', 'article-the', { ...A, prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: '___ internet has changed the way students learn.', options: ['The', 'An', NO_ARTICLE], answer: 'The', explanation: l('There is only one internet → the internet.', 'Internet একটাই → the internet।') }),
        choice('ar-3-p5', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The price of rice rose sharply in 2022.', 'Price of rice rose sharply in 2022.', 'A price of rice rose sharply in 2022.'], answer: 'The price of rice rose sharply in 2022.', explanation: l('"of rice" makes the price exact → The price.', '"of rice" দামটাকে নির্দিষ্ট করে → The price।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ar-3-r1', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Write the missing word.', 'বাদ পড়া word-টা লিখুন।'), sentence: 'Canada was ___ most popular destination for students in 2019.', accepted: ['the'], explanation: l('Superlative → the most popular.', 'Superlative → the most popular।') }),
        spot('ar-3-r2', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Something is missing before one word. Tap that word and write it with what is missing.', 'একটা word-এর আগে কিছু বাদ পড়েছে। সেই word-এ tap করে যা বাদ পড়েছে সেটা সহ লিখুন।'), sentence: 'In 2010, number of visitors fell to 5,000.', wrong: 'number', accepted: ['the number'], explanation: l('The exact figure → the number of visitors.', 'নির্দিষ্ট সংখ্যা → the number of visitors।') }),
        correct('ar-3-r3', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'Sun sets in west.', accepted: ['The sun sets in the west.'], explanation: l('Only one sun, only one west → the, the.', 'সূর্য একটাই, পশ্চিম একটাই → the, the।') }),
        gap('ar-3-r4', 'article-the', { ...A, prompt: l('Write the missing word.', 'বাদ পড়া word-টা লিখুন।'), sentence: 'I bought a laptop and a mouse, but ___ mouse stopped working.', accepted: ['the'], explanation: l('Second mention → the mouse.', 'দ্বিতীয়বার → the mouse।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ar-3-c1', 'article-the', { ...A, prompt: l('In Task 1, why "the number of students", not "a number of students"?', 'Task 1-এ কেন "the number of students", "a number of students" না?'), options: ['"the number of" is the exact figure in the chart; "a number of" means "several"', 'Both mean the same', '"a" can never come before "number"'], answer: '"the number of" is the exact figure in the chart; "a number of" means "several"', explanation: l('A small word, a big change in meaning.', 'ছোট word, অর্থে বড় পরিবর্তন।') }),
        spot('ar-3-c2', 'article-the', { ...A, prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'It was a best day of my life.', wrong: 'a', accepted: ['the'], fixOptions: ['the', 'an', 'one'], explanation: l('Superlative → the best day.', 'Superlative → the best day।') }),
        choice('ar-3-c3', 'article-the', { ...A, prompt: l('Reading: "A new metro line opened in 2022. The line carries 60,000 people a day." What does "The line" refer to?', 'Reading: "A new metro line opened in 2022. The line carries 60,000 people a day." "The line" কী বোঝায়?'), options: ['the new metro line that opened in 2022', 'any metro line', 'the oldest line in the city'], answer: 'the new metro line that opened in 2022', explanation: l('"The" points back to the thing already mentioned.', '"The" আগে বলা জিনিসের দিকে ইঙ্গিত করে।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: the best place you know', 'এবার আপনার পালা: আপনার চেনা সেরা জায়গা'),
      exercises: [
        write('ar-3-y1', 'article-the', {
          ...A,
          prompt: l('Speaking Part 2: "Describe the most interesting place in your city." Write 2 sentences. Use "the" at least twice (the most…, the + of…, a second mention).', 'Speaking Part 2: "Describe the most interesting place in your city." ২টা sentence লিখুন। অন্তত দুবার "the" ব্যবহার করুন (the most…, the + of…, দ্বিতীয়বার বলা)।'),
          model: 'The most interesting place in my city is a small museum near the river. The museum shows the history of the Liberation War.',
          checklist: [l('the with a superlative (the most…, the best…)', 'Superlative-এ the (the most…, the best…)'), l('a for the first mention, the for the second', 'প্রথমবার a, দ্বিতীয়বার the'), l('No "the" before the city or country name', 'শহর বা দেশের নামের আগে "the" না')],
          explanation: l('the = the reader knows which one.', 'the = পাঠক জানে কোনটা।'),
          task: 'The student describes the most interesting place in their city in 2 sentences, using "the" at least twice. Check "the": superlatives (the most interesting, the best), second mention (a museum → the museum), things made exact by "of" (the history of…), only-one things (the river if it is the one in the city). Also check: no "the" with city/country names (Dhaka, Bangladesh) or general ideas (history in general). If "the" is missing, name the noun and explain why the reader knows which one; if "the" is extra, explain the general meaning. Keep article errors separate from other errors.',
          target: l('the: the one we both know', 'the: যেটা দুজনেই চিনি'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('the = the reader knows which one.', 'the = পাঠক জানে কোনটা।'),
        l('Second mention · only one · the highest / first · the + of…', 'দ্বিতীয়বার · একটাই · the highest / first · the + of…'),
        l('Task 1: The chart shows the number / percentage / proportion of…', 'Task 1: The chart shows the number / percentage / proportion of…'),
      ],
    },
  ],
};

// ======================================================================= ar-4
export const zeroArticle: Lesson = {
  id: 'ar-4',
  format: 'v2',
  concept: 'article-zero',
  title: l('No article: talking in general', 'Article ছাড়া: সাধারণভাবে বলা'),
  why: l('Task 2 is full of general statements: "The education is…" is a top Band 6 mistake.', 'Task 2 সাধারণ বক্তব্যে ভরা: "The education is…" Band 6-এর খুব common ভুল।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('The first line of Task 2', 'Task 2-এর প্রথম লাইন'),
      situation: l('Task 2: "Some people think education is the key to a country’s development." You start your introduction.', 'Task 2: "Some people think education is the key to a country’s development." আপনি introduction শুরু করছেন।'),
      question: l('Which sentence would you write?', 'কোন sentence-টা লিখবে?'),
      options: ['The education plays a vital role in development.', 'Education plays a vital role in development.', 'An education plays the vital role in the development.'],
      answer: 'Education plays a vital role in development.',
      diagnose: {
        'The education plays a vital role in development.': l('Very common! "The" feels formal, like "শিক্ষাব্যবস্থা". But you mean education in general, not one particular education → no article.', 'খুব common! "The" formal মনে হয়, যেন "শিক্ষাব্যবস্থা"। কিন্তু আপনি সাধারণভাবে শিক্ষার কথা বলছেন, নির্দিষ্ট কোনো শিক্ষা না → article লাগবে না।'),
        'Education plays a vital role in development.': l('Right. Education and development in general: uncountable nouns with a general meaning take no article.', 'ঠিক। সাধারণভাবে শিক্ষা আর উন্নয়ন: সাধারণ অর্থের uncountable noun-এ article লাগে না।'),
        'An education plays the vital role in the development.': l('"education" here is uncountable and general: no a/an, no the. "a vital role" is fine — role is one countable thing.', 'এখানে "education" uncountable আর সাধারণ অর্থে: a/an না, the-ও না। "a vital role" ঠিক — role গোনা যায় এমন একটা জিনিস।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করুন'),
      items: [
        { en: 'Children need exercise.', note: l('all children, exercise in general', 'সব শিশু, সাধারণভাবে ব্যায়াম') },
        { en: 'Technology makes life easier.', note: l('technology and life in general', 'সাধারণভাবে প্রযুক্তি আর জীবন') },
        { en: 'Cars cause air pollution.', note: l('cars in general', 'সাধারণভাবে গাড়ি') },
        { en: 'The children in my building play football every evening.', note: l('a particular group → the', 'নির্দিষ্ট একটা দল → the') },
      ],
      question: l('When is there no article?', 'কখন article থাকে না?'),
      options: [
        l('Plural or uncountable nouns used in a general sense', 'সাধারণ অর্থে ব্যবহৃত plural বা uncountable noun'),
        l('Every noun in a formal essay', 'Formal essay-র প্রতিটা noun'),
        l('Single countable nouns', 'গোনা যায় এমন একবচন noun'),
      ],
      answer: 0,
      pattern: l('Plural or uncountable + general meaning → no article (Children, Technology, Cars). A particular group → the (The children in my building).', 'Plural বা uncountable + সাধারণ অর্থ → article না (Children, Technology, Cars)। নির্দিষ্ট দল → the (The children in my building)।'),
    },
    {
      kind: 'concept',
      title: l('When to use no article — and when not to', 'কখন article লাগে না — আর কখন লাগে'),
      body: l(
        'Plural and uncountable nouns take no article when you talk about them in general: Students need support. Pollution is harmful. Money can’t buy happiness. Add "the" only when you mean a particular group or thing.',
        'Plural আর uncountable noun নিয়ে সাধারণভাবে বললে article লাগে না: Students need support. Pollution is harmful. Money can’t buy happiness। নির্দিষ্ট দল বা জিনিস বোঝালে তবেই "the"।',
      ),
      points: [
        l('General: Students, Education, Technology, Pollution, Money, People.', 'সাধারণ: Students, Education, Technology, Pollution, Money, People।'),
        l('Particular: the students in my class, the pollution in Dhaka, the money I saved.', 'নির্দিষ্ট: the students in my class, the pollution in Dhaka, the money I saved।'),
        l('Also no article: most names (Dhaka, Bangladesh, Mr Rahman), meals (have lunch), and go to school / university / work / bed, by bus / car / train.', 'এগুলোতেও article না: বেশিরভাগ নাম (Dhaka, Bangladesh, Mr Rahman), খাবারের বেলা (have lunch), আর go to school / university / work / bed, by bus / car / train।'),
        l('NOT with one countable thing: "Car is useful" ✗ → A car is useful / Cars are useful.', 'গোনা যায় এমন একটা জিনিসে না: "Car is useful" ✗ → A car is useful / Cars are useful।'),
        l('Why Bangla speakers slip: we add "the" to sound academic, the way "শিক্ষা" becomes "শিক্ষাব্যবস্থা". In English, the most academic general statements have no article: "Education is…".', 'বাংলাভাষীরা কেন ভুল করে: academic শোনাতে "the" বসাই, যেমন "শিক্ষা" হয়ে যায় "শিক্ষাব্যবস্থা"। English-এ সবচেয়ে academic সাধারণ বক্তব্যেই article থাকে না: "Education is…"।'),
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'I love music, but I don’t like the music in this café.', note: l('general → no article; this café’s music → the.', 'সাধারণ → article না; এই café-এর music → the।') },
        { en: 'Most people in Dhaka go to work by bus.', note: l('go to work, by bus: fixed phrases with no article.', 'go to work, by bus: article ছাড়া fixed phrase।') },
        { en: 'Governments should invest more in public transport.', note: l('governments in general.', 'সাধারণভাবে সরকারগুলো।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Technology has changed the way people communicate.', note: l('Task 2: general topics start with no article.', 'Task 2: সাধারণ topic article ছাড়া শুরু হয়।') },
        { skill: 'speaking', example: 'I really enjoy cooking, especially Bangladeshi food.', note: l('Part 1 likes and dislikes are general.', 'Part 1-এর পছন্দ-অপছন্দ সাধারণ।') },
        { skill: 'reading', example: 'Tourists spend more in coastal towns. The tourists interviewed spent less.', note: l('True/False/Not Given: "tourists" (all) vs "the tourists interviewed" (one group) can change the answer.', 'True/False/Not Given: "tourists" (সবাই) বনাম "the tourists interviewed" (একটা দল) উত্তর বদলে দিতে পারে।') },
        { skill: 'listening', example: 'Most students come to campus by bus.', note: l('"by bus" has no article — don’t write "by the bus".', '"by bus"-এ article নেই — "by the bus" লিখুন না।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The pollution is a big problem today.', right: 'Pollution is a big problem today.', why: l('Pollution in general → no article.', 'সাধারণভাবে দূষণ → article না।') },
        { wrong: 'I go to the school by the bus.', right: 'I go to school by bus.', why: l('go to school, by bus: fixed phrases.', 'go to school, by bus: fixed phrase।') },
        { wrong: 'The money cannot buy the happiness.', right: 'Money cannot buy happiness.', why: l('General ideas → no article.', 'সাধারণ ধারণা → article না।') },
        { wrong: 'Car is useful in a big city.', right: 'A car is useful in a big city.', why: l('One countable thing can’t stand alone (or say "Cars are useful").', 'গোনা যায় এমন একটা জিনিস একা দাঁড়ায় না (অথবা বলুন "Cars are useful")।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ar-4-p1', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Task 2: choose the correct word.', 'Task 2: সঠিক word বেছে নিন।'), sentence: '___ technology has changed the way people work.', options: [NO_ARTICLE, 'The', 'A'], answer: NO_ARTICLE, explanation: l('Technology in general → no article.', 'সাধারণভাবে প্রযুক্তি → article না।'), why: { The: l('"The technology" would be one particular technology you already mentioned.', '"The technology" মানে আগে বলা নির্দিষ্ট কোনো প্রযুক্তি।'), A: l('"technology" here is uncountable.', 'এখানে "technology" uncountable।') } }),
        choice('ar-4-p2', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'I usually go to ___ bed at eleven.', options: [NO_ARTICLE, 'the', 'a'], answer: NO_ARTICLE, explanation: l('go to bed (to sleep): fixed phrase, no article.', 'go to bed (ঘুমাতে): fixed phrase, article না।') }),
        choice('ar-4-p3', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Which is best for a Task 2 introduction?', 'Task 2 introduction-এর জন্য কোনটা সবচেয়ে ভালো?'), options: ['Unemployment is a serious issue in many countries.', 'The unemployment is a serious issue in the many countries.', 'An unemployment is serious issue in many countries.'], answer: 'Unemployment is a serious issue in many countries.', explanation: l('General idea → no article; "a serious issue" (one of many).', 'সাধারণ ধারণা → article না; "a serious issue" (অনেকের একটা)।') }),
        choice('ar-4-p4', 'article-zero', { ...A, prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: '___ students in my class are very friendly.', options: ['The', NO_ARTICLE, 'A'], answer: 'The', explanation: l('A particular group ("in my class") → The students.', 'নির্দিষ্ট দল ("in my class") → The students।'), why: { [NO_ARTICLE]: l('"in my class" makes it a particular group, not students in general.', '"in my class" এটাকে নির্দিষ্ট দল বানায়, সাধারণ students না।') } }),
        choice('ar-4-p5', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'Bangladesh exports ___ clothes to many countries.', options: [NO_ARTICLE, 'the', 'a'], answer: NO_ARTICLE, explanation: l('Clothes in general → no article.', 'সাধারণভাবে কাপড় → article না।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        correct('ar-4-r1', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Remove the articles that don’t belong.', 'যে article-গুলো থাকার কথা না, সেগুলো সরান।'), sentence: 'The pollution is a serious problem in the Dhaka.', accepted: ['Pollution is a serious problem in Dhaka.'], explanation: l('General idea → no article; city names → no article.', 'সাধারণ ধারণা → article না; শহরের নাম → article না।') }),
        correct('ar-4-r2', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'The money cannot buy the happiness.', accepted: ['Money cannot buy happiness.', "Money can't buy happiness."], explanation: l('General ideas → no article.', 'সাধারণ ধারণা → article না।') }),
        correct('ar-4-r3', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'Most people go to the work by the bus.', accepted: ['Most people go to work by bus.'], explanation: l('go to work, by bus: fixed phrases with no article.', 'go to work, by bus: article ছাড়া fixed phrase।') }),
        gap('ar-4-r4', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Write the article — or type - if no article is needed.', 'Article লিখুন — article না লাগলে - লিখুন।'), sentence: 'I think ___ exercise is important for everyone.', accepted: NO_ARTICLE_TYPED, explanation: l('Exercise in general → no article.', 'সাধারণভাবে ব্যায়াম → article না।'), why: { the: l('You mean exercise in general, not a particular exercise.', 'আপনি সাধারণভাবে ব্যায়ামের কথা বলছেন, নির্দিষ্ট কোনোটা না।') } }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ar-4-c1', 'article-zero', { ...A, prompt: l('"Children need love" vs "The children need love". What is the difference?', '"Children need love" বনাম "The children need love"। পার্থক্য কী?'), options: ['"Children" = all children; "The children" = a particular group we know', 'No difference', '"The children" is more formal, so it is better in Task 2'], answer: '"Children" = all children; "The children" = a particular group we know', explanation: l('General → no article; particular → the.', 'সাধারণ → article না; নির্দিষ্ট → the।') }),
        choice('ar-4-c2', 'article-zero', { ...A, prompt: l('Pick the pair with correct articles.', 'সঠিক article-সহ জোড়াটা বেছে নিন।'), options: ['Task 1: "The number of cars rose." · Task 2: "Cars cause pollution."', 'Task 1: "Number of cars rose." · Task 2: "The cars cause pollution."', 'Task 1: "A number of cars rose." · Task 2: "The cars cause the pollution."'], answer: 'Task 1: "The number of cars rose." · Task 2: "Cars cause pollution."', explanation: l('Task 1 is about the exact figures (the); Task 2 is about things in general (no article).', 'Task 1 নির্দিষ্ট সংখ্যা নিয়ে (the); Task 2 সাধারণভাবে জিনিস নিয়ে (article না)।') }),
        correct('ar-4-c3', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Rewrite as a general statement.', 'সাধারণ বক্তব্য হিসেবে আবার লিখুন।'), sentence: 'The smartphones are useful for the students.', accepted: ['Smartphones are useful for students.'], explanation: l('All smartphones, all students → no article.', 'সব smartphone, সব student → article না।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 2 opinion', 'এবার আপনার পালা: Task 2-এর মতামত'),
      exercises: [
        write('ar-4-y1', 'article-zero', {
          ...A,
          prompt: l('Task 2: "Some people think technology makes children lazy." Write 2 sentences with your opinion about technology and children in general.', 'Task 2: "Some people think technology makes children lazy." সাধারণভাবে প্রযুক্তি আর শিশুদের নিয়ে আপনার মতামত ২টা sentence-এ লিখুন।'),
          model: 'I believe technology does not make children lazy. Children who use computers can learn new skills, and online games can improve problem-solving.',
          checklist: [l('General nouns with no article (technology, children, computers)', 'সাধারণ noun-এ article না (technology, children, computers)'), l('"the" only for a particular thing', 'শুধু নির্দিষ্ট জিনিসে "the"'), l('One countable thing still needs a / an', 'গোনা যায় এমন একটা জিনিসে এখনো a / an লাগবে')],
          explanation: l('General statements: no article with plurals and uncountables.', 'সাধারণ বক্তব্য: plural আর uncountable-এ article না।'),
          task: 'The student writes 2 sentences giving an opinion about technology and children in general (IELTS Task 2). Check articles: plural or uncountable nouns used in a general sense take NO article ("Technology is…", "Children need…", not "The technology", "The children" unless a particular group); "the" only when the reader knows which one ("the internet", "the children in my family"); a single countable noun still needs a/an ("a child", "a problem"). If the student adds "the" to a general noun, explain that general statements in English have no article even when they sound formal. Keep article errors separate from other errors.',
          target: l('No article for things in general', 'সাধারণভাবে বলা জিনিসে article না'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('General + plural or uncountable → no article: Education is…, Cars cause…', 'সাধারণ + plural বা uncountable → article না: Education is…, Cars cause…'),
        l('A particular group → the: the students in my class.', 'নির্দিষ্ট দল → the: the students in my class।'),
        l('go to school / work / bed · by bus · have lunch · Dhaka, Bangladesh', 'go to school / work / bed · by bus · have lunch · Dhaka, Bangladesh'),
      ],
    },
  ],
};

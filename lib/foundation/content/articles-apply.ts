import type { Lesson } from '../model';
import { NO_ARTICLE, NO_ARTICLE_TYPED } from './articles';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Articles, application lessons in the v2 format: ar-5 choosing by meaning,
 * ar-6 the mistakes Bangla speakers make, ar-7 articles in IELTS Writing and
 * Speaking, ar-8 mixed practice (no hints), and ar-9 the module review test.
 * They have no lesson concept of their own: every question keeps the concept
 * it tests (a-an, a, the, zero), so each answer feeds the right review.
 * Original Mino content.
 */
const A = { tag: 'article' as const };

// ======================================================================= ar-5
export const articleChoice: Lesson = {
  id: 'ar-5',
  format: 'v2',
  title: l('a, the or nothing? Choose by meaning', 'a, the নাকি কিছুই না? অর্থ দেখে বাছো'),
  why: l('Knowing three rules is easy; choosing between them in your own sentence is the real skill.', 'তিনটা নিয়ম জানা সহজ; নিজের sentence-এ তার মধ্যে বেছে নেওয়াটাই আসল দক্ষতা।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('A Part 2 story', 'একটা Part 2-এর গল্প'),
      situation: l('Speaking Part 2: "Describe a book you enjoyed." You begin: "Last year I read ___ book about ___ history. ___ book was written by a teacher from Sylhet."', 'Speaking Part 2: "Describe a book you enjoyed." তুমি শুরু করলে: "Last year I read ___ book about ___ history. ___ book was written by a teacher from Sylhet."'),
      question: l('Which set fills the gaps?', 'কোন set-টা gap-এ বসবে?'),
      options: ['a · (no article) · The', 'the · the · A', 'a · the · A'],
      answer: 'a · (no article) · The',
      diagnose: {
        'a · (no article) · The': l('Right: a book (first mention) · history (in general) · The book (now we know which one).', 'ঠিক: a book (প্রথম উল্লেখ) · history (সাধারণভাবে) · The book (এখন আমরা জানি কোনটা)।'),
        'the · the · A': l('The examiner doesn’t know your book yet, so the first mention is "a book". And after that, it becomes "the book", not "a book".', 'Examiner এখনো তোমার বইটা চেনেন না, তাই প্রথমবার "a book"। তারপর সেটা হয় "the book", "a book" না।'),
        'a · the · A': l('"a book" is right. But "history" here means history in general → no article. And the second mention needs "The book".', '"a book" ঠিক। কিন্তু এখানে "history" মানে সাধারণভাবে ইতিহাস → article না। আর দ্বিতীয়বার "The book" লাগবে।'),
      },
    },
    {
      kind: 'discover',
      title: l('Same noun, three meanings', 'একই noun, তিনটা অর্থ'),
      items: [
        { en: 'I want to find a job in Dhaka.', note: l('any job, one of many → a', 'যেকোনো চাকরি, অনেকের একটা → a') },
        { en: 'I love the job I have now.', note: l('my particular job → the', 'আমার নির্দিষ্ট চাকরি → the') },
        { en: 'Jobs are hard to find these days.', note: l('jobs in general → no article', 'সাধারণভাবে চাকরি → article না') },
      ],
      question: l('What decides the article?', 'Article কী ঠিক করে?'),
      options: [
        l('What you mean: one of many, a particular one, or things in general', 'তুমি কী বোঝাচ্ছো: অনেকের একটা, নির্দিষ্ট একটা, নাকি সাধারণভাবে'),
        l('The noun itself: each noun has its own article', 'Noun নিজেই: প্রতিটা noun-এর নিজস্ব article'),
        l('How formal the sentence is', 'Sentence কতটা formal'),
      ],
      answer: 0,
      pattern: l('The noun doesn’t decide — your meaning does: one of many → a / an; the reader knows which → the; plural or uncountable in general → no article.', 'Noun ঠিক করে না — তোমার অর্থ ঠিক করে: অনেকের একটা → a / an; পাঠক জানে কোনটা → the; সাধারণভাবে plural বা uncountable → article না।'),
    },
    {
      kind: 'concept',
      title: l('Three questions, in order', 'ক্রমানুযায়ী তিনটা প্রশ্ন'),
      body: l(
        'Before a noun, ask: 1) Does the reader know exactly which one? → the. 2) If not, is it one countable thing? → a / an. 3) If it is plural or uncountable and general → no article.',
        'Noun-এর আগে জিজ্ঞেস করো: ১) পাঠক কি ঠিক জানে কোনটা? → the। ২) না জানলে, এটা কি গোনা যায় এমন একটা জিনিস? → a / an। ৩) Plural বা uncountable আর সাধারণ অর্থে হলে → article না।',
      ),
      points: [
        l('Knows which one? the report, the highest, the number of…', 'জানে কোনটা? the report, the highest, the number of…'),
        l('One countable thing, not known? a report, an idea, a big city.', 'গোনা যায় এমন একটা, অচেনা? a report, an idea, a big city।'),
        l('Plural / uncountable, general? Reports, Ideas, Information, Traffic.', 'Plural / uncountable, সাধারণ? Reports, Ideas, Information, Traffic।'),
        l('NOT: "the" just to sound formal, or no article with one countable thing ("Government should…" ✗ → The government should… / Governments should…).', 'না: formal শোনাতে "the", বা গোনা যায় এমন একটা জিনিসে article ছাড়া ("Government should…" ✗ → The government should… / Governments should…)।'),
        l('Why Bangla speakers slip: Bangla shows these meanings with word endings (একটা বই / বইটা / বই) or not at all, so English needs a conscious check before each noun.', 'বাংলাভাষীরা কেন ভুল করে: বাংলায় এই অর্থগুলো word-এর শেষে (একটা বই / বইটা / বই) বোঝানো হয় বা একদমই না, তাই English-এ প্রতিটা noun-এর আগে সচেতনভাবে যাচাই করতে হয়।'),
      ],
    },
    {
      kind: 'examples',
      title: l('One story, all three', 'একটা গল্পে তিনটাই'),
      items: [
        { en: 'I saw an accident on the way to work.', note: l('an accident (new) · the way (you know which) · work (fixed phrase)', 'an accident (নতুন) · the way (জানো কোনটা) · work (fixed phrase)') },
        { en: 'The accident happened because of heavy traffic.', note: l('The accident (second mention) · traffic (general, uncountable)', 'The accident (দ্বিতীয়বার) · traffic (সাধারণ, uncountable)') },
        { en: 'Accidents like this are common in big cities.', note: l('accidents and cities in general', 'সাধারণভাবে দুর্ঘটনা আর শহর') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'I bought a camera last year. The camera was expensive, but photography is my passion.', note: l('Part 2: a → the as the story goes on; general hobbies with no article.', 'Part 2: গল্প এগোলে a → the; সাধারণ শখে article না।') },
        { skill: 'writing', example: 'A recent survey found that the majority of students prefer online classes.', note: l('Task 2 evidence: a survey (one of many), the majority (known part), students (general).', 'Task 2-এর প্রমাণ: a survey (অনেকের একটা), the majority (চেনা অংশ), students (সাধারণ)।') },
        { skill: 'reading', example: 'Researchers tested a new drug. The drug reduced symptoms in most patients.', note: l('Follow the articles to track what the text refers to.', 'Text কোন জিনিসের কথা বলছে বুঝতে article অনুসরণ করো।') },
        { skill: 'listening', example: 'There’s a café on the ground floor. The café closes at six.', note: l('a → the: the second sentence gives the detail you need.', 'a → the: দ্বিতীয় sentence-এ দরকারি তথ্য থাকে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I read the interesting book last week.', right: 'I read an interesting book last week.', why: l('First mention: the listener doesn’t know which book.', 'প্রথম উল্লেখ: শ্রোতা জানে না কোন বই।') },
        { wrong: 'Government should build more schools.', right: 'The government should build more schools.', why: l('One countable thing: the government (of this country) — or "Governments" in general.', 'গোনা যায় এমন একটা: the government (এই দেশের) — বা সাধারণভাবে "Governments"।') },
        { wrong: 'The traffic is a problem in all big cities.', right: 'Traffic is a problem in all big cities.', why: l('Traffic in general → no article.', 'সাধারণভাবে traffic → article না।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ar-5-p1', 'article-a', { ...A, prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'I want to find ___ part-time job near my university.', options: ['a', 'the', NO_ARTICLE], answer: 'a', explanation: l('Any job, one of many → a.', 'যেকোনো চাকরি, অনেকের একটা → a।'), why: { the: l('You don’t have a particular job in mind yet.', 'তোমার মাথায় এখনো নির্দিষ্ট কোনো চাকরি নেই।') } }),
        choice('ar-5-p2', 'article-the', { ...A, prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'I really like ___ job I have now.', options: ['the', 'a', NO_ARTICLE], answer: 'the', explanation: l('"I have now" tells you which job → the.', '"I have now" বলে দেয় কোন চাকরি → the।') }),
        choice('ar-5-p3', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: '___ jobs in the IT sector are well paid.', options: [NO_ARTICLE, 'The', 'A'], answer: NO_ARTICLE, explanation: l('Jobs in a whole sector, in general → no article.', 'পুরো sector-এর চাকরি, সাধারণভাবে → article না।') }),
        choice('ar-5-p4', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The government should improve public transport.', 'Government should improve the public transport.', 'A government should improve the public transport.'], answer: 'The government should improve public transport.', explanation: l('the government (of the country, we know which) · public transport (general).', 'the government (দেশের, আমরা জানি কোনটা) · public transport (সাধারণ)।') }),
        choice('ar-5-p5', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'It was ___ unforgettable trip.', options: ['an', 'a', 'the'], answer: 'an', explanation: l('First mention + vowel sound ("un-") → an.', 'প্রথম উল্লেখ + vowel sound ("আন-") → an।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('ar-5-r1', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Write a, an or the.', 'a, an বা the লেখো।'), sentence: 'Yesterday I saw ___ accident on the highway.', accepted: ['an'], explanation: l('First mention, vowel sound → an accident.', 'প্রথম উল্লেখ, vowel sound → an accident।') }),
        gap('ar-5-r2', 'article-the', { ...A, prompt: l('Write a, an or the.', 'a, an বা the লেখো।'), sentence: 'I saw an accident yesterday. ___ accident happened near my house.', accepted: ['the'], explanation: l('Second mention → The accident.', 'দ্বিতীয়বার → The accident।') }),
        gap('ar-5-r3', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Write a, an or the — or type - if no article is needed.', 'a, an বা the লেখো — article না লাগলে - লেখো।'), sentence: 'I think ___ road safety should be taught in schools.', accepted: NO_ARTICLE_TYPED, explanation: l('Road safety in general (uncountable) → no article.', 'সাধারণভাবে road safety (uncountable) → article না।'), why: { the: l('You mean road safety in general, not a particular one.', 'তুমি সাধারণভাবে road safety বোঝাচ্ছো, নির্দিষ্ট কোনোটা না।') } }),
        correct('ar-5-r4', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Correct the Part 2 answer.', 'Part 2-এর উত্তরটা ঠিক করো।'), sentence: 'I bought the camera last year. A camera was expensive.', accepted: ['I bought a camera last year. The camera was expensive.'], explanation: l('First mention a camera → second mention the camera.', 'প্রথমবার a camera → দ্বিতীয়বার the camera।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('ar-5-c1', 'article-zero', { ...A, prompt: l('"I like dogs" vs "I like the dogs". Which is true?', '"I like dogs" বনাম "I like the dogs"। কোনটা সত্যি?'), options: ['"dogs" = all dogs; "the dogs" = particular dogs (e.g. the ones next door)', 'They mean the same', '"the dogs" is always wrong'], answer: '"dogs" = all dogs; "the dogs" = particular dogs (e.g. the ones next door)', explanation: l('The article changes the meaning.', 'Article অর্থ বদলে দেয়।') }),
        spot('ar-5-c2', 'article-the', { ...A, prompt: l('One word breaks this Task 2 sentence. Tap it, then fix it.', 'একটা word Task 2 sentence-টা ভাঙছে। Tap করে ঠিক করো।'), sentence: 'A internet has changed how young people study.', wrong: 'A', accepted: ['The'], fixOptions: ['The', 'An', 'One'], explanation: l('There is only one internet → The internet.', 'Internet একটাই → The internet।') }),
        order('ar-5-c3', 'article-a', { ...A, prompt: l('Build the sentence.', 'Sentence-টা সাজাও।'), answer: 'I read a book about history last year.', explanation: l('a book (first mention) · history (general).', 'a book (প্রথম উল্লেখ) · history (সাধারণ)।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a gift you remember', 'এবার তোমার পালা: মনে রাখার মতো একটা উপহার'),
      exercises: [
        write('ar-5-y1', 'article-the', {
          ...A,
          prompt: l('Speaking Part 2: "Describe a gift you received." Write 3 sentences: introduce the gift (a / an), talk about it again (the), and add one general sentence about gifts (no article).', 'Speaking Part 2: "Describe a gift you received." ৩টা sentence লেখো: উপহারটার পরিচয় (a / an), আবার সেটার কথা (the), আর উপহার নিয়ে একটা সাধারণ sentence (article না)।'),
          model: 'Last Eid, my uncle gave me a watch. The watch was silver and very light. I think gifts are special when they are useful.',
          checklist: [l('a / an for the first mention', 'প্রথম উল্লেখে a / an'), l('the for the second mention', 'দ্বিতীয়বার the'), l('No article for gifts in general', 'সাধারণভাবে gifts-এ article না')],
          explanation: l('One story, all three choices.', 'একটা গল্পে তিনটা বাছাই-ই।'),
          task: 'The student writes 3 sentences for Speaking Part 2 "Describe a gift you received": first mention with a/an, second mention with the, and a general statement with no article. Check all three: first mention of a single countable thing needs a/an (a watch, an umbrella — by the first sound), later mentions need "the" (the watch), plural or uncountable nouns in general take no article (gifts, money, time). For each article error, name the noun and say which question decides it: does the listener know which one? is it one countable thing? is it general? Keep article errors separate from other errors.',
          target: l('a → the → no article, by meaning', 'অর্থ অনুযায়ী a → the → article না'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('1) Reader knows which one? → the.', '১) পাঠক জানে কোনটা? → the।'),
        l('2) One countable thing? → a / an.', '২) গোনা যায় এমন একটা? → a / an।'),
        l('3) Plural or uncountable, general? → no article.', '৩) সাধারণভাবে plural বা uncountable? → article না।'),
      ],
    },
  ],
};

// ======================================================================= ar-6
export const articleMistakes: Lesson = {
  id: 'ar-6',
  format: 'v2',
  title: l('Article mistakes Bangla speakers make', 'বাংলাভাষীদের article-এর ভুল'),
  why: l('Five mistakes cause most article errors in Bangladeshi IELTS answers. Fix these and most slips disappear.', 'বাংলাদেশি IELTS answer-এর বেশিরভাগ article ভুল আসে পাঁচটা ভুল থেকে। এগুলো ঠিক করলে বেশিরভাগ ভুলই চলে যায়।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('Check a friend’s paragraph', 'বন্ধুর paragraph যাচাই করো'),
      situation: l('Your friend wrote: "My brother is engineer. He gave me an advice: the English is important for the career."', 'তোমার বন্ধু লিখেছে: "My brother is engineer. He gave me an advice: the English is important for the career."'),
      question: l('How many article mistakes are there?', 'কয়টা article-এর ভুল আছে?'),
      options: ['One', 'Two', 'Four'],
      answer: 'Four',
      diagnose: {
        One: l('Look again: "engineer", "an advice", "the English" and "the career" all have article problems.', 'আবার দেখো: "engineer", "an advice", "the English" আর "the career" — চারটাতেই article-এর সমস্যা।'),
        Two: l('Close. "engineer" needs "an", and "an advice" is wrong — but "the English" and "the career" are general ideas too.', 'কাছাকাছি। "engineer"-এ "an" লাগবে, আর "an advice" ভুল — কিন্তু "the English" আর "the career"-ও সাধারণ ধারণা।'),
        Four: l('Right: an engineer · some advice · English (a language, general) · a career / your career.', 'ঠিক: an engineer · some advice · English (ভাষা, সাধারণ) · a career / your career।'),
      },
    },
    {
      kind: 'discover',
      title: l('Where each mistake comes from', 'প্রতিটা ভুল কোথা থেকে আসে'),
      items: [
        { en: 'He is doctor. → He is a doctor.', note: l('Bangla: "সে ডাক্তার" — nothing before the noun', 'বাংলা: "সে ডাক্তার" — noun-এর আগে কিছু নেই') },
        { en: 'The pollution is serious. → Pollution is serious.', note: l('"the" added to sound formal', 'formal শোনাতে "the" যোগ') },
        { en: 'an advice → some advice', note: l('advice / information / news can’t be counted in English', 'English-এ advice / information / news গোনা যায় না') },
        { en: 'an university → a university', note: l('chosen by the letter, not the sound', 'অক্ষর দেখে বাছা, sound না') },
      ],
      question: l('What do these mistakes have in common?', 'এই ভুলগুলোর মধ্যে মিল কী?'),
      options: [
        l('They copy a Bangla habit into English', 'বাংলার একটা অভ্যাস English-এ নিয়ে আসা'),
        l('They are random', 'এগুলো এলোমেলো'),
        l('They only happen in speaking', 'শুধু speaking-এ হয়'),
      ],
      answer: 0,
      pattern: l('Most article mistakes are Bangla habits: no word before the noun, "the" to sound formal, counting uncountable nouns, and choosing a/an by the letter.', 'বেশিরভাগ article ভুল বাংলার অভ্যাস: noun-এর আগে কিছু না, formal শোনাতে "the", uncountable noun গোনা, আর অক্ষর দেখে a/an বাছা।'),
    },
    {
      kind: 'concept',
      title: l('The five fixes', 'পাঁচটা সমাধান'),
      body: l(
        'Check every noun in your answer with five questions. They catch almost every article mistake a Bangla speaker makes.',
        'তোমার answer-এর প্রতিটা noun পাঁচটা প্রশ্ন দিয়ে যাচাই করো। বাংলাভাষীদের প্রায় সব article ভুল এতে ধরা পড়ে।',
      ),
      points: [
        l('1. One countable thing with nothing before it? Add a / an / the / my (a doctor).', '১. গোনা যায় এমন একটা জিনিসের আগে কিছু নেই? a / an / the / my বসাও (a doctor)।'),
        l('2. "the" before a general idea (the pollution, the education)? Remove it.', '২. সাধারণ ধারণার আগে "the" (the pollution, the education)? সরাও।'),
        l('3. a / an before advice, information, news, furniture, equipment, research, traffic? Use some / a piece of / nothing.', '৩. advice, information, news, furniture, equipment, research, traffic-এর আগে a / an? some / a piece of / কিছুই না ব্যবহার করো।'),
        l('4. a or an? Say the next word: a university, an hour.', '৪. a নাকি an? পরের word-টা বলো: a university, an hour।'),
        l('5. Task 1: The chart, the number of, the highest — never drop "the" here.', '৫. Task 1: The chart, the number of, the highest — এখানে "the" কখনো বাদ দিও না।'),
        l('NOT: don’t add "the" to names of people, most cities and countries (Dhaka, Bangladesh) or languages (English, Bangla).', 'না: মানুষ, বেশিরভাগ শহর ও দেশের নাম (Dhaka, Bangladesh) বা ভাষার নামে (English, Bangla) "the" দিও না।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Before → after', 'আগে → পরে'),
      items: [
        { en: 'My brother is an engineer. He gave me some advice: English is important for a career.', note: l('The hook paragraph, fixed.', 'Hook-এর paragraph, ঠিক করা।') },
        { en: 'I got some useful information from the website.', note: l('information: uncountable · the website: we know which.', 'information: uncountable · the website: জানি কোনটা।') },
        { en: 'I speak Bangla at home and English at university.', note: l('Languages have no article.', 'ভাষার নামে article নেই।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Research shows that traffic causes stress.', note: l('Task 2: research and traffic are uncountable — no "a research", no "the traffic" in general.', 'Task 2: research আর traffic uncountable — "a research" না, সাধারণভাবে "the traffic" না।') },
        { skill: 'speaking', example: 'I’m a student, and I speak English and Bangla.', note: l('Part 1: a student; languages with no article.', 'Part 1: a student; ভাষায় article না।') },
        { skill: 'reading', example: 'The equipment was expensive. It was sent from Japan.', note: l('"The equipment … It" — uncountable nouns take singular "it", which helps in reference questions.', '"The equipment … It" — uncountable noun-এর সাথে singular "it", reference প্রশ্নে কাজে লাগে।') },
        { skill: 'listening', example: 'Can I get some information about the course?', note: l('"some information" — spell and hear it without a / an.', '"some information" — a / an ছাড়া শোনো আর লেখো।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'She is teacher at my school.', right: 'She is a teacher at my school.', why: l('Fix 1: one countable thing needs a / an.', 'সমাধান ১: গোনা যায় এমন একটায় a / an লাগে।') },
        { wrong: 'The English is an international language.', right: 'English is an international language.', why: l('Languages have no article.', 'ভাষার নামে article নেই।') },
        { wrong: 'We need a new furniture.', right: 'We need new furniture.', why: l('Fix 3: furniture is uncountable.', 'সমাধান ৩: furniture uncountable।') },
        { wrong: 'He did a research on climate.', right: 'He did research on climate.', why: l('research is uncountable in English.', 'English-এ research uncountable।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ar-6-p1', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['She is a teacher at my school.', 'She is teacher at my school.', 'She is the teacher at my school.'], answer: 'She is a teacher at my school.', explanation: l('A job → a teacher.', 'পেশা → a teacher।'), why: { 'She is teacher at my school.': l('One countable thing can’t stand alone.', 'গোনা যায় এমন একটা জিনিস একা দাঁড়ায় না।'), 'She is the teacher at my school.': l('"the teacher" = the only teacher, or one we both know. Here you are just saying her job.', '"the teacher" = একমাত্র শিক্ষক, বা দুজনের চেনা কেউ। এখানে শুধু তার পেশা বলছো।') } }),
        choice('ar-6-p2', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: '___ English is spoken in many countries.', options: [NO_ARTICLE, 'The', 'An'], answer: NO_ARTICLE, explanation: l('Languages have no article.', 'ভাষার নামে article নেই।') }),
        choice('ar-6-p3', 'article-a', { ...A, pattern: 'noun-count', prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'We need ___ new furniture for the office.', options: [NO_ARTICLE, 'a', 'an'], answer: NO_ARTICLE, explanation: l('furniture is uncountable → no a / an.', 'furniture uncountable → a / an না।'), why: { a: l('You can’t count furniture in English: say "a chair" or "some furniture".', 'English-এ furniture গোনা যায় না: বলো "a chair" বা "some furniture"।') } }),
        choice('ar-6-p4', 'article-a', { ...A, pattern: 'noun-count', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Scientists have done a lot of research on this.', 'Scientists have done a research on this.', 'Scientists have done researches on this.'], answer: 'Scientists have done a lot of research on this.', explanation: l('research is uncountable: a lot of research, some research.', 'research uncountable: a lot of research, some research।') }),
        choice('ar-6-p5', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Task 1: choose the correct word.', 'Task 1: সঠিক word বাছো।'), sentence: 'Coal accounted for ___ highest share of electricity in 2000.', options: ['the', 'a', NO_ARTICLE], answer: 'the', explanation: l('Superlative → the highest.', 'Superlative → the highest।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        correct('ar-6-r1', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Fix the article mistakes.', 'Article-এর ভুলগুলো ঠিক করো।'), sentence: 'My brother is engineer in a big company.', accepted: ['My brother is an engineer in a big company.'], explanation: l('A job, vowel sound → an engineer.', 'পেশা, vowel sound → an engineer।') }),
        correct('ar-6-r2', 'article-a', { ...A, pattern: 'noun-count', prompt: l('Fix the article mistake.', 'Article-এর ভুলটা ঠিক করো।'), sentence: 'My teacher gave me an advice about the exam.', accepted: ['My teacher gave me some advice about the exam.', 'My teacher gave me advice about the exam.', 'My teacher gave me a piece of advice about the exam.'], explanation: l('advice is uncountable.', 'advice uncountable।') }),
        correct('ar-6-r3', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Fix the article mistake.', 'Article-এর ভুলটা ঠিক করো।'), sentence: 'The English is important for the career.', accepted: ['English is important for a career.', 'English is important for your career.', 'English is important for careers.', 'English is important for my career.'], explanation: l('English (a language) · a career / your career.', 'English (ভাষা) · a career / your career।') }),
        gap('ar-6-r4', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Write a or an.', 'a বা an লেখো।'), sentence: 'He is studying at ___ university in Japan.', accepted: ['a'], explanation: l('"yoo-niversity" → a.', '"ইউ-নিভার্সিটি" → a।'), why: { an: l('Say it: "university" starts with a "yoo" sound.', 'বলে দেখো: "university" "ইউ" sound দিয়ে শুরু।') } }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        spot('ar-6-c1', 'article-a', { ...A, pattern: 'noun-count', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করো।'), sentence: 'The website has a useful information about visas.', wrong: 'a', accepted: ['some'], fixOptions: ['some', 'an', 'one'], explanation: l('information is uncountable → some information.', 'information uncountable → some information।') }),
        choice('ar-6-c2', 'article-zero', { ...A, prompt: l('Which rule is the "the" in "The Dhaka is a crowded city" breaking?', '"The Dhaka is a crowded city"-এর "the" কোন নিয়ম ভাঙছে?'), options: ['Most city names have no article', 'Superlatives need "the"', 'Second mention needs "the"'], answer: 'Most city names have no article', explanation: l('Dhaka, Sylhet, London: no article.', 'Dhaka, Sylhet, London: article না।') }),
        correct('ar-6-c3', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Fix the Task 2 sentence.', 'Task 2 sentence-টা ঠিক করো।'), sentence: 'The traffic is a big problem in the most cities.', accepted: ['Traffic is a big problem in most cities.'], explanation: l('traffic (general, uncountable) · most cities (no "the" before "most + plural").', 'traffic (সাধারণ, uncountable) · most cities ("most + plural"-এর আগে "the" না)।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: fix your own paragraph', 'এবার তোমার পালা: নিজের paragraph ঠিক করো'),
      exercises: [
        write('ar-6-y1', 'article-zero', {
          ...A,
          prompt: l('Write 3 sentences about why English is useful for your future. Use at least two of: English, advice, information, research, career, university.', 'তোমার ভবিষ্যতের জন্য English কেন দরকারি, ৩টা sentence লেখো। অন্তত দুটো ব্যবহার করো: English, advice, information, research, career, university।'),
          model: 'English is useful for my future because I want to study at a university abroad. Most research is published in English. My teacher gave me some advice: read English news every day.',
          checklist: [l('English with no article', 'English-এ article না'), l('advice / information / research with no a / an', 'advice / information / research-এ a / an না'), l('a / an before one countable thing (a university, a career)', 'গোনা যায় এমন একটার আগে a / an (a university, a career)')],
          explanation: l('Check each noun with the five fixes.', 'পাঁচটা সমাধান দিয়ে প্রতিটা noun যাচাই করো।'),
          task: 'The student writes 3 sentences about why English is useful for their future, using words like English, advice, information, research, career, university. Check the five Bangla-speaker article habits: (1) a single countable noun with nothing before it ("I want career" → "a career"); (2) "the" before general ideas or languages ("the English", "the education"); (3) a/an with uncountable nouns ("an advice", "a research", "an information"); (4) a vs an by sound ("a university"); (5) missing "the" with superlatives. Name the noun for each error and say which habit it comes from. Keep article errors separate from other errors.',
          target: l('No Bangla article habits', 'বাংলার article-অভ্যাস না'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('One countable thing never stands alone: a doctor, an engineer.', 'গোনা যায় এমন একটা জিনিস একা দাঁড়ায় না: a doctor, an engineer।'),
        l('No "the" for general ideas, languages or most names: Pollution, English, Dhaka.', 'সাধারণ ধারণা, ভাষা বা বেশিরভাগ নামে "the" না: Pollution, English, Dhaka।'),
        l('No a / an with advice, information, news, furniture, research, traffic.', 'advice, information, news, furniture, research, traffic-এ a / an না।'),
      ],
    },
  ],
};

// ======================================================================= ar-7
export const articlesInIelts: Lesson = {
  id: 'ar-7',
  format: 'v2',
  title: l('Articles in IELTS Writing and Speaking', 'IELTS Writing আর Speaking-এ article'),
  why: l('Task 1, Task 2 and Speaking each have their own article habits. Learn the three patterns and use them every time.', 'Task 1, Task 2 আর Speaking — প্রতিটার নিজস্ব article-অভ্যাস আছে। তিনটা pattern শিখে প্রতিবার ব্যবহার করো।'),
  minutes: 12,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('Two tasks, two habits', 'দুটো task, দুটো অভ্যাস'),
      situation: l('Task 1 describes a chart; Task 2 discusses an issue in general.', 'Task 1 একটা chart বর্ণনা করে; Task 2 সাধারণভাবে একটা বিষয় আলোচনা করে।'),
      question: l('Which pair is right?', 'কোন জোড়াটা ঠিক?'),
      options: ['Task 1: "The number of cars rose." · Task 2: "Cars pollute the air."', 'Task 1: "Number of cars rose." · Task 2: "The cars pollute the air."', 'Task 1: "A number of cars rose." · Task 2: "The cars pollute an air."'],
      answer: 'Task 1: "The number of cars rose." · Task 2: "Cars pollute the air."',
      diagnose: {
        'Task 1: "The number of cars rose." · Task 2: "Cars pollute the air."': l('Right. Task 1 talks about the exact figures in the chart (the); Task 2 talks about cars in general (no article). "the air" = the air around us, only one.', 'ঠিক। Task 1 chart-এর নির্দিষ্ট সংখ্যা নিয়ে (the); Task 2 সাধারণভাবে গাড়ি নিয়ে (article না)। "the air" = আমাদের চারপাশের বাতাস, একটাই।'),
        'Task 1: "Number of cars rose." · Task 2: "The cars pollute the air."': l('The two habits are swapped: Task 1 needs "The number of", and Task 2 talks about cars in general (no article).', 'দুটো অভ্যাস উল্টে গেছে: Task 1-এ "The number of" লাগে, আর Task 2-এ সাধারণভাবে গাড়ি (article না)।'),
        'Task 1: "A number of cars rose." · Task 2: "The cars pollute an air."': l('"A number of" means "several", not the figure in the chart. "air" is uncountable: no "an".', '"A number of" মানে "কয়েকটা", chart-এর সংখ্যা না। "air" uncountable: "an" না।'),
      },
    },
    {
      kind: 'discover',
      title: l('Three patterns', 'তিনটা pattern'),
      items: [
        { en: 'The graph shows the proportion of people who cycle to work.', note: l('Task 1 opening: the + chart, the + of', 'Task 1-এর শুরু: the + chart, the + of') },
        { en: 'There was a sharp rise in 2015, and the figure reached a peak of 60%.', note: l('Task 1 trends: a rise, a peak (one of many); the figure (known)', 'Task 1 trend: a rise, a peak (অনেকের একটা); the figure (চেনা)') },
        { en: 'Public transport reduces traffic.', note: l('Task 2 ideas: general, no article', 'Task 2-এর ধারণা: সাধারণ, article না') },
        { en: 'I’m a student, and the best thing about my city is the food.', note: l('Speaking: a (me), the best (superlative), the food (of my city)', 'Speaking: a (আমি), the best (superlative), the food (আমার শহরের)') },
      ],
      question: l('Which summary is right?', 'কোন সারাংশটা ঠিক?'),
      options: [
        l('Task 1: the + figures, a + trend nouns; Task 2: general nouns with no article; Speaking: a for you, the for the best / known', 'Task 1: the + সংখ্যা, a + trend noun; Task 2: article ছাড়া সাধারণ noun; Speaking: নিজের জন্য a, সেরা / চেনার জন্য the'),
        l('Use "the" everywhere in writing to sound academic', 'Writing-এ academic শোনাতে সব জায়গায় "the"'),
        l('Articles don’t matter in Speaking', 'Speaking-এ article-এর দরকার নেই'),
      ],
      answer: 0,
      pattern: l('Task 1: The chart shows the number of… · there was a rise / a peak. Task 2: general nouns, no article. Speaking: I’m a…, the best…, the one we both know.', 'Task 1: The chart shows the number of… · there was a rise / a peak। Task 2: সাধারণ noun, article না। Speaking: I’m a…, the best…, দুজনের চেনাটা।'),
    },
    {
      kind: 'concept',
      title: l('Your IELTS article checklist', 'তোমার IELTS article checklist'),
      body: l(
        'Task 1 describes exact figures: they are known, so "the" (the number of, the percentage of, the highest). Trend nouns are one of many: a rise, a fall, a peak, a slight increase. Task 2 argues about things in general: no article with plurals and uncountables. In Speaking, you are a student / an engineer, and superlatives take "the".',
        'Task 1 নির্দিষ্ট সংখ্যা বর্ণনা করে: সেগুলো চেনা, তাই "the" (the number of, the percentage of, the highest)। Trend noun অনেকের একটা: a rise, a fall, a peak, a slight increase। Task 2 সাধারণভাবে যুক্তি দেয়: plural আর uncountable-এ article না। Speaking-এ তুমি a student / an engineer, আর superlative-এ "the"।',
      ),
      points: [
        l('Task 1: The graph / chart / table shows the number / percentage / proportion of…', 'Task 1: The graph / chart / table shows the number / percentage / proportion of…'),
        l('Task 1 trends: a sharp rise, a slight fall, an 8% increase, a peak of…', 'Task 1 trend: a sharp rise, a slight fall, an 8% increase, a peak of…'),
        l('Task 2: Technology / Education / Children / Governments … (general, no article).', 'Task 2: Technology / Education / Children / Governments … (সাধারণ, article না)।'),
        l('Speaking: I’m a… · the best / the most… · a place I love → the place.', 'Speaking: I’m a… · the best / the most… · a place I love → the place।'),
        l('NOT: "In the conclusion" when you mean in general (In conclusion); "the most of people" (most people).', 'না: সাধারণভাবে বোঝাতে "In the conclusion" (In conclusion); "the most of people" (most people)।'),
        l('Why Bangla speakers slip: in exam stress we write fast and translate from Bangla, where none of these words exist. A 1-minute article check at the end catches them.', 'বাংলাভাষীরা কেন ভুল করে: exam-এর চাপে দ্রুত লিখি আর বাংলা থেকে অনুবাদ করি, যেখানে এই word-গুলোই নেই। শেষে ১ মিনিটের article check এগুলো ধরে ফেলে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Band 7 sentences', 'Band 7-এর sentence'),
      items: [
        { en: 'The table shows the percentage of households with a car in four countries.', note: l('the table · the percentage of · a car (one each).', 'the table · the percentage of · a car (প্রতিটায় একটা)।') },
        { en: 'There was a slight decline in 2012, followed by a steady increase.', note: l('Trend nouns: a decline, an increase.', 'Trend noun: a decline, an increase।') },
        { en: 'In conclusion, governments should make public transport cheaper.', note: l('In conclusion (fixed) · governments, public transport (general).', 'In conclusion (fixed) · governments, public transport (সাধারণ)।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('All four skills', 'চারটা skill-ই'),
      uses: [
        { skill: 'writing', example: 'The chart illustrates the amount of water used in three sectors.', note: l('Task 1 opening sentence: the chart, the amount of.', 'Task 1-এর প্রথম sentence: the chart, the amount of।') },
        { skill: 'speaking', example: 'The most memorable day of my life was when I graduated.', note: l('Part 2: superlative → the most memorable.', 'Part 2: superlative → the most memorable।') },
        { skill: 'reading', example: 'The majority of respondents supported the plan.', note: l('"the majority of" = most of a known group; watch it in True/False/Not Given.', '"the majority of" = চেনা দলের বেশিরভাগ; True/False/Not Given-এ খেয়াল রাখো।') },
        { skill: 'listening', example: 'The lecture focuses on the effects of noise on sleep.', note: l('Part 4 openings: "the effects of…" introduces the key topic.', 'Part 4-এর শুরু: "the effects of…" মূল topic জানায়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Graph shows number of people who cycle.', right: 'The graph shows the number of people who cycle.', why: l('Task 1: the graph, the number of.', 'Task 1: the graph, the number of।') },
        { wrong: 'There was sharp rise in 2015.', right: 'There was a sharp rise in 2015.', why: l('A trend noun is one countable thing → a.', 'Trend noun গোনা যায় এমন একটা → a।') },
        { wrong: 'The most of people prefer online shopping.', right: 'Most people prefer online shopping.', why: l('"most + plural" has no "the".', '"most + plural"-এ "the" না।') },
        { wrong: 'In the conclusion, I believe…', right: 'In conclusion, I believe…', why: l('Fixed phrase: In conclusion.', 'Fixed phrase: In conclusion।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('ar-7-p1', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Task 1: choose the correct opening.', 'Task 1: সঠিক শুরু বাছো।'), options: ['The pie chart shows the proportion of energy from each source.', 'Pie chart shows proportion of energy from each source.', 'A pie chart shows a proportion of energy from each source.'], answer: 'The pie chart shows the proportion of energy from each source.', explanation: l('The chart in front of you · the proportion of (exact).', 'সামনের chart · the proportion of (নির্দিষ্ট)।') }),
        choice('ar-7-p2', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Task 1: choose the correct word.', 'Task 1: সঠিক word বাছো।'), sentence: 'There was ___ slight fall in sales in March.', options: ['a', 'the', NO_ARTICLE], answer: 'a', explanation: l('A trend noun, one of many → a slight fall.', 'Trend noun, অনেকের একটা → a slight fall।') }),
        choice('ar-7-p3', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Task 2: choose the correct word.', 'Task 2: সঠিক word বাছো।'), sentence: 'Most people believe that ___ public transport should be free.', options: [NO_ARTICLE, 'the', 'a'], answer: NO_ARTICLE, explanation: l('Public transport in general → no article.', 'সাধারণভাবে public transport → article না।') }),
        choice('ar-7-p4', 'article-zero', { ...A, prompt: l('Task 2: choose the correct phrase.', 'Task 2: সঠিক phrase বাছো।'), sentence: '___ prefer to work from home.', options: ['Most people', 'The most of people', 'The most people'], answer: 'Most people', explanation: l('"most + plural": no "the", no "of".', '"most + plural": "the" না, "of" না।') }),
        choice('ar-7-p5', 'article-the', { ...A, prompt: l('Speaking Part 2: choose the correct word.', 'Speaking Part 2: সঠিক word বাছো।'), sentence: 'It was ___ most beautiful place I have ever visited.', options: ['the', 'a', NO_ARTICLE], answer: 'the', explanation: l('Superlative → the most beautiful.', 'Superlative → the most beautiful।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        correct('ar-7-r1', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Fix the Task 1 sentence.', 'Task 1 sentence-টা ঠিক করো।'), sentence: 'Graph shows number of people who cycle to work.', accepted: ['The graph shows the number of people who cycle to work.'], explanation: l('The graph · the number of.', 'The graph · the number of।') }),
        gap('ar-7-r2', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Write a, an or the.', 'a, an বা the লেখো।'), sentence: 'In 2015, sales reached ___ peak of 2 million.', accepted: ['a'], explanation: l('a peak of (one of many possible peaks).', 'a peak of (অনেক সম্ভাব্য peak-এর একটা)।') }),
        correct('ar-7-r3', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Fix the Task 2 conclusion.', 'Task 2 conclusion-টা ঠিক করো।'), sentence: 'In the conclusion, the governments should invest in the education.', accepted: ['In conclusion, governments should invest in education.'], explanation: l('In conclusion · governments, education (general).', 'In conclusion · governments, education (সাধারণ)।') }),
        gap('ar-7-r4', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Write a or an.', 'a বা an লেখো।'), sentence: 'There was ___ 18% increase in exports.', accepted: ['an'], explanation: l('"eighteen" starts with a vowel sound → an.', '"eighteen" vowel sound দিয়ে শুরু → an।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        order('ar-7-c1', 'article-the', { ...A, prompt: l('Build the Task 1 opening.', 'Task 1-এর শুরুর sentence সাজাও।'), answer: 'The chart shows the number of international students.', explanation: l('The chart · the number of.', 'The chart · the number of।') }),
        choice('ar-7-c2', 'article-the', { ...A, prompt: l('Reading: "The majority of respondents supported the plan." True, False or Not Given: "Most of the people asked were in favour."', 'Reading: "The majority of respondents supported the plan." True, False না Not Given: "Most of the people asked were in favour."'), options: ['True', 'False', 'Not Given'], answer: 'True', explanation: l('the majority of respondents = most of the people asked.', 'the majority of respondents = প্রশ্ন করা মানুষের বেশিরভাগ।') }),
        spot('ar-7-c3', 'article-the', { ...A, prompt: l('One word breaks this Speaking answer. Tap it, then fix it.', 'একটা word Speaking answer-টা ভাঙছে। Tap করে ঠিক করো।'), sentence: 'A best thing about my city is the street food.', wrong: 'A', accepted: ['The'], fixOptions: ['The', 'An', 'One'], explanation: l('Superlative → The best thing.', 'Superlative → The best thing।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 1 overview', 'এবার তোমার পালা: একটা Task 1 overview'),
      exercises: [
        write('ar-7-y1', 'article-the', {
          ...A,
          prompt: l('A chart shows the number of students at a college: 800 in 2010, 1,500 in 2020. Write an opening sentence and one trend sentence.', 'একটা chart-এ একটা college-এর student সংখ্যা: 2010-এ 800, 2020-এ 1,500। একটা শুরুর sentence আর একটা trend sentence লেখো।'),
          model: 'The chart shows the number of students at a college between 2010 and 2020. There was a significant increase, and the figure almost doubled to 1,500.',
          checklist: [l('The chart shows the number of…', 'The chart shows the number of…'), l('a + trend noun (a rise, an increase)', 'a + trend noun (a rise, an increase)'), l('the figure / the highest for known numbers', 'চেনা সংখ্যায় the figure / the highest')],
          explanation: l('Task 1: the for the figures, a for the trend nouns.', 'Task 1: সংখ্যায় the, trend noun-এ a।'),
          task: 'The student writes an IELTS Task 1 opening sentence and one trend sentence about a chart showing student numbers (800 in 2010, 1,500 in 2020). Check articles: "The chart/graph shows the number of…" (both "the"; "a number of" means "several"); trend nouns take a/an (a rise, a significant increase, an 87% increase — by sound); known figures take "the" (the figure, the highest point); plural/uncountable nouns in general take no article. Name each noun with an article error and explain the Task 1 habit. Keep article errors separate from other errors (tense, word choice).',
          target: l('Task 1 articles: the figures, a trend', 'Task 1 article: the সংখ্যা, a trend'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Task 1: The chart shows the number of… · a rise · a peak · the highest.', 'Task 1: The chart shows the number of… · a rise · a peak · the highest।'),
        l('Task 2: general nouns, no article · In conclusion · most people.', 'Task 2: সাধারণ noun, article না · In conclusion · most people।'),
        l('Speaking: I’m a… · the best… · a → the as the story goes on.', 'Speaking: I’m a… · the best… · গল্প এগোলে a → the।'),
      ],
    },
  ],
};

// ======================================================================= ar-8
export const articlesMixed: Lesson = {
  id: 'ar-8',
  format: 'v2',
  title: l('Mixed practice: no hints', 'Mixed practice: কোনো hint নেই'),
  why: l('In the exam nobody tells you which rule you need. Here you decide every article yourself.', 'Exam-এ কেউ বলে দেবে না কোন নিয়ম লাগবে। এখানে প্রতিটা article তুমি নিজেই ঠিক করবে।'),
  minutes: 12,
  difficulty: 'hard',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('One short email', 'একটা ছোট email'),
      situation: l('"Dear Sir, I am ___ student at ___ Dhaka University. I would like ___ information about ___ scholarship you offer."', '"Dear Sir, I am ___ student at ___ Dhaka University. I would like ___ information about ___ scholarship you offer."'),
      question: l('Which set is right?', 'কোন set-টা ঠিক?'),
      options: ['a · (no article) · some · the', 'the · the · an · a', 'a · the · an · the'],
      answer: 'a · (no article) · some · the',
      diagnose: {
        'a · (no article) · some · the': l('Right: a student (one of many) · Dhaka University (a name) · some information (uncountable) · the scholarship you offer (they know which).', 'ঠিক: a student (অনেকের একজন) · Dhaka University (নাম) · some information (uncountable) · the scholarship you offer (তারা জানে কোনটা)।'),
        'the · the · an · a': l('"the student" means one they already know; names like Dhaka University take no article; information is uncountable; "you offer" makes the scholarship known → the.', '"the student" মানে তাদের আগে থেকে চেনা কেউ; Dhaka University-এর মতো নামে article না; information uncountable; "you offer" scholarship-টাকে চেনা বানায় → the।'),
        'a · the · an · the': l('"a student" and "the scholarship" are right. But a university name has no article here, and "information" can’t take an.', '"a student" আর "the scholarship" ঠিক। কিন্তু এখানে university-র নামে article না, আর "information"-এ an বসে না।'),
      },
    },
    {
      kind: 'discover',
      title: l('Decide, then check', 'ঠিক করো, তারপর যাচাই করো'),
      items: [
        { en: 'I bought a ticket for the 9 a.m. bus.', note: l('a ticket (new) · the 9 a.m. bus (exact one)', 'a ticket (নতুন) · the 9 a.m. bus (নির্দিষ্টটা)') },
        { en: 'Tickets are cheaper online.', note: l('general', 'সাধারণ') },
        { en: 'The ticket I bought was an e-ticket.', note: l('known · an + vowel sound', 'চেনা · an + vowel sound') },
      ],
      question: l('What is the best way to choose an article?', 'Article বাছার সবচেয়ে ভালো উপায় কী?'),
      options: [
        l('Ask the three questions for each noun: known? one countable? general?', 'প্রতিটা noun-এর জন্য তিনটা প্রশ্ন: চেনা? গোনা যায় এমন একটা? সাধারণ?'),
        l('Remember which article goes with each noun', 'কোন noun-এর সাথে কোন article মনে রাখা'),
        l('Use "the" when unsure', 'নিশ্চিত না হলে "the"'),
      ],
      answer: 0,
      pattern: l('No noun has a fixed article. For each one ask: known → the; one countable → a / an (by sound); plural / uncountable and general → nothing.', 'কোনো noun-এর নির্দিষ্ট article নেই। প্রতিটার জন্য জিজ্ঞেস করো: চেনা → the; গোনা যায় এমন একটা → a / an (sound দেখে); সাধারণ plural / uncountable → কিছু না।'),
    },
    {
      kind: 'concept',
      title: l('How to practise without hints', 'Hint ছাড়া কীভাবে practice করবে'),
      body: l(
        'The questions in this lesson don’t say which rule they test. Read the whole sentence first — the meaning is often in the words after the noun (the one I bought, of rice, in my class).',
        'এই lesson-এর প্রশ্নগুলো বলে না কোন নিয়ম লাগবে। আগে পুরো sentence পড়ো — অর্থ প্রায়ই noun-এর পরের word-গুলোতে থাকে (the one I bought, of rice, in my class)।',
      ),
      points: [
        l('Look after the noun: "of…", "that…", "in my…" usually mean "the".', 'Noun-এর পরে দেখো: "of…", "that…", "in my…" সাধারণত "the" বোঝায়।'),
        l('Look at the verb: "are / cause / need" with a plural often means a general statement.', 'Verb দেখো: plural-এর সাথে "are / cause / need" প্রায়ই সাধারণ বক্তব্য।'),
        l('Say a / an out loud before choosing.', 'বাছার আগে a / an জোরে বলো।'),
        l('NOT: don’t guess "the" when unsure — it is the most common wrong choice.', 'না: নিশ্চিত না হলে "the" আন্দাজ কোরো না — এটাই সবচেয়ে common ভুল বাছাই।'),
        l('Why Bangla speakers slip: without a hint we fall back on Bangla, where there is no article at all. Slow down for one second at each noun.', 'বাংলাভাষীরা কেন ভুল করে: hint না থাকলে আমরা বাংলায় ফিরে যাই, যেখানে article-ই নেই। প্রতিটা noun-এ এক সেকেন্ড থামো।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Read to the end', 'শেষ পর্যন্ত পড়ো'),
      items: [
        { en: 'The rice we grow in Bangladesh is exported to many countries.', note: l('"we grow in Bangladesh" makes the rice known → the.', '"we grow in Bangladesh" চালটাকে চেনা বানায় → the।') },
        { en: 'Rice is the main food in Asia.', note: l('rice in general → no article; the main food (only one).', 'সাধারণভাবে চাল → article না; the main food (একটাই)।') },
        { en: 'She has an idea for a new app.', note: l('two first mentions: an idea, a new app.', 'দুটো প্রথম উল্লেখ: an idea, a new app।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'The rice produced in Asia feeds more than half of the world.', note: l('Task 2 detail: "produced in Asia" makes it known → the.', 'Task 2-এর বিস্তারিত: "produced in Asia" চেনা বানায় → the।') },
        { skill: 'speaking', example: 'I usually have lunch with the people I work with.', note: l('Part 1: have lunch (no article) · the people I work with (known).', 'Part 1: have lunch (article না) · the people I work with (চেনা)।') },
        { skill: 'reading', example: 'Farmers grew rice. The rice they grew was sold abroad.', note: l('General farmers vs the rice they grew: follow the reference.', 'সাধারণ কৃষক বনাম তাদের ফলানো চাল: reference অনুসরণ করো।') },
        { skill: 'listening', example: 'Please bring a pen and the form we sent you.', note: l('a pen (any) · the form (a particular one): note the one you must bring.', 'a pen (যেকোনো) · the form (নির্দিষ্টটা): যেটা আনতে হবে সেটা note করো।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I would like an information about the course.', right: 'I would like some information about the course.', why: l('information is uncountable.', 'information uncountable।') },
        { wrong: 'The rice is the main food in Asia.', right: 'Rice is the main food in Asia.', why: l('Rice in general → no article.', 'সাধারণভাবে চাল → article না।') },
        { wrong: 'I study at the Dhaka University.', right: 'I study at Dhaka University.', why: l('University names like "Dhaka University" take no article (but "the University of Dhaka").', '"Dhaka University"-এর মতো নামে article না (কিন্তু "the University of Dhaka")।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Mixed: easy → harder', 'Mixed: সহজ → কঠিন'),
      exercises: [
        choice('ar-8-p1', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: '___ rice is the main food in Bangladesh.', options: [NO_ARTICLE, 'The', 'A'], answer: NO_ARTICLE, explanation: l('Rice in general → no article.', 'সাধারণভাবে চাল → article না।') }),
        choice('ar-8-p2', 'article-the', { ...A, prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: '___ rice we bought yesterday was very good.', options: ['The', NO_ARTICLE, 'A'], answer: 'The', explanation: l('"we bought yesterday" makes it known → The.', '"we bought yesterday" চেনা বানায় → The।') }),
        choice('ar-8-p3', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'He works as ___ unpaid volunteer.', options: ['an', 'a', 'the'], answer: 'an', explanation: l('A job-like role + vowel sound → an.', 'পেশার মতো ভূমিকা + vowel sound → an।') }),
        choice('ar-8-p4', 'article-a', { ...A, pattern: 'noun-count', prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'I would like ___ information about the course.', options: ['some', 'an', 'the'], answer: 'some', explanation: l('information is uncountable; "some" because it is not yet specific.', 'information uncountable; এখনো নির্দিষ্ট না বলে "some"।') }),
        choice('ar-8-p5', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'Please send me ___ form you mentioned on the phone.', options: ['the', 'a', NO_ARTICLE], answer: 'the', explanation: l('"you mentioned" → a known form → the.', '"you mentioned" → চেনা form → the।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options, no hints', 'Active recall: option নেই, hint নেই'),
      exercises: [
        gap('ar-8-r1', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Write a, an or the — or type - if no article is needed.', 'a, an বা the লেখো — article না লাগলে - লেখো।'), sentence: 'My father is ___ farmer in Rangpur.', accepted: ['a'], explanation: l('A job → a farmer.', 'পেশা → a farmer।') }),
        gap('ar-8-r2', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Write a, an or the — or type - if no article is needed.', 'a, an বা the লেখো — article না লাগলে - লেখো।'), sentence: 'In my opinion, ___ children should learn to swim.', accepted: NO_ARTICLE_TYPED, explanation: l('Children in general → no article.', 'সাধারণভাবে শিশুরা → article না।'), why: { the: l('You mean all children, not a particular group.', 'তুমি সব শিশু বোঝাচ্ছো, নির্দিষ্ট দল না।') } }),
        gap('ar-8-r3', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Write a, an or the — or type - if no article is needed.', 'a, an বা the লেখো — article না লাগলে - লেখো।'), sentence: 'This is ___ first time I have taken the IELTS test.', accepted: ['the'], explanation: l('Order word (first) → the.', 'ক্রম (first) → the।') }),
        correct('ar-8-r4', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Correct the email sentence.', 'Email-এর sentence-টা ঠিক করো।'), sentence: 'I am a student at the Dhaka University.', accepted: ['I am a student at Dhaka University.'], explanation: l('A university name like Dhaka University → no article.', 'Dhaka University-এর মতো নাম → article না।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        spot('ar-8-c1', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করো।'), sentence: 'She wrote an useful report on the project.', wrong: 'an', accepted: ['a'], fixOptions: ['a', 'the', 'one'], explanation: l('"useful" = "yoos-": consonant sound → a.', '"useful" = "ইউজ-": consonant sound → a।') }),
        correct('ar-8-c2', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Fix the Task 1 sentence (two articles are missing).', 'Task 1 sentence-টা ঠিক করো (দুটো article বাদ পড়েছে)।'), sentence: 'Percentage of people who own a car reached highest point in 2019.', accepted: ['The percentage of people who own a car reached the highest point in 2019.', 'The percentage of people who own a car reached its highest point in 2019.'], explanation: l('The percentage of · the highest point.', 'The percentage of · the highest point।') }),
        choice('ar-8-c3', 'article-zero', { ...A, prompt: l('Which sentence has NO article mistakes?', 'কোন sentence-এ কোনো article-এর ভুল নেই?'), options: ['Tourism brings money to the coastal towns of Bangladesh.', 'The tourism brings the money to coastal towns of the Bangladesh.', 'A tourism brings a money to the coastal towns.'], answer: 'Tourism brings money to the coastal towns of Bangladesh.', explanation: l('tourism, money (general) · the coastal towns of Bangladesh (known) · Bangladesh (name).', 'tourism, money (সাধারণ) · the coastal towns of Bangladesh (চেনা) · Bangladesh (নাম)।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a short email', 'এবার তোমার পালা: একটা ছোট email'),
      exercises: [
        write('ar-8-y1', 'article-a', {
          ...A,
          prompt: l('Write 3 sentences of an email to a university asking about a course: who you are, what you want to study, and what information you need.', 'একটা university-কে একটা course নিয়ে জানতে ৩ sentence-এর email লেখো: তুমি কে, কী পড়তে চাও, আর কী তথ্য দরকার।'),
          model: 'I am a student at a college in Khulna. I am interested in the Master’s course in Public Health that you offer. Could you send me some information about the fees and the application deadline?',
          checklist: [l('a / an for who you are', 'তুমি কে — a / an'), l('the for the course they offer', 'তাদের দেওয়া course-এ the'), l('some information (no an)', 'some information (an না)')],
          explanation: l('Every noun: known? one countable? general?', 'প্রতিটা noun: চেনা? গোনা যায় এমন একটা? সাধারণ?'),
          task: 'The student writes 3 sentences of a formal email to a university asking about a course. Check every article with no hints: a/an for a single countable noun first mentioned or a job (a student, an engineer — by sound); "the" for things the reader knows (the course you offer, the deadline, the fees for that course); no article for names (Dhaka University, Khulna) and general plurals/uncountables; no a/an with uncountable nouns (information, advice). For each error name the noun, the question that decides it (known? one countable? general?) and the fix. Keep article errors separate from other errors.',
          target: l('Every article, no hints', 'প্রতিটা article, কোনো hint ছাড়া'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Read to the end of the noun phrase: "the rice we bought".', 'Noun phrase-এর শেষ পর্যন্ত পড়ো: "the rice we bought"।'),
        l('Known → the · one countable → a / an · general plural / uncountable → nothing.', 'চেনা → the · গোনা যায় এমন একটা → a / an · সাধারণ plural / uncountable → কিছু না।'),
        l('When unsure, don’t guess "the": ask the three questions.', 'নিশ্চিত না হলে "the" আন্দাজ কোরো না: তিনটা প্রশ্ন করো।'),
      ],
    },
  ],
};

// ======================================================================= ar-9
export const articlesReview: Lesson = {
  id: 'ar-9',
  kind: 'test',
  title: l('Articles review test', 'Articles review test'),
  why: l('Check what you have learned. Your mistakes here decide what Mino suggests you review.', 'কী শিখলে যাচাই করো। এখানের ভুল দেখেই Mino ঠিক করবে কী review করতে বলবে।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'concept',
      title: l('How this test works', 'এই test কীভাবে চলবে'),
      body: l(
        '12 questions from every lesson in this module. You see the answer after each question. Score 80% or more to complete the module; if you score less, Mino will suggest short reviews for the articles you missed.',
        'এই module-এর সব lesson থেকে ১২টা প্রশ্ন। প্রতিটা প্রশ্নের পরে answer দেখবে। ৮০% বা বেশি পেলে module শেষ; কম পেলে যেগুলো ভুল হয়েছে, Mino সেগুলোর ছোট review suggest করবে।',
      ),
    },
    {
      kind: 'practice',
      title: l('Part 1: choose', 'Part 1: বাছো'),
      exercises: [
        choice('ar-9-e1', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Choose a or an.', 'a নাকি an বাছো।'), sentence: 'I waited for ___ hour at the bus stop.', options: ['an', 'a'], answer: 'an', explanation: l('Silent h → an hour.', 'h নীরব → an hour।') }),
        choice('ar-9-e2', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['My sister is a lawyer.', 'My sister is lawyer.', 'My sister is the lawyer.'], answer: 'My sister is a lawyer.', explanation: l('A job → a lawyer.', 'পেশা → a lawyer।') }),
        choice('ar-9-e3', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Task 1: choose the correct word.', 'Task 1: সঠিক word বাছো।'), sentence: '___ percentage of women in work rose to 40%.', options: ['The', 'A', NO_ARTICLE], answer: 'The', explanation: l('The exact figure → The percentage of.', 'নির্দিষ্ট সংখ্যা → The percentage of।') }),
        choice('ar-9-e4', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Task 2: choose the correct word.', 'Task 2: সঠিক word বাছো।'), sentence: '___ health is more important than wealth.', options: [NO_ARTICLE, 'The', 'A'], answer: NO_ARTICLE, explanation: l('Health in general → no article.', 'সাধারণভাবে স্বাস্থ্য → article না।') }),
        choice('ar-9-e5', 'article-a', { ...A, pattern: 'noun-count', prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'That is ___ good news for everyone.', options: [NO_ARTICLE, 'a', 'an'], answer: NO_ARTICLE, explanation: l('news is uncountable → no a.', 'news uncountable → a না।') }),
        choice('ar-9-e6', 'article-the', { ...A, prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'I bought a shirt and a tie. ___ tie was blue.', options: ['The', 'A', NO_ARTICLE], answer: 'The', explanation: l('Second mention → The tie.', 'দ্বিতীয়বার → The tie।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Part 2: write and fix', 'Part 2: লেখো আর ঠিক করো'),
      exercises: [
        gap('ar-9-e7', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Write a or an.', 'a বা an লেখো।'), sentence: 'She is studying for ___ MBA.', accepted: ['an'], explanation: l('MBA = "em-bee-ay" → an.', 'MBA = "এম-বি-এ" → an।') }),
        gap('ar-9-e8', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Write the missing word.', 'বাদ পড়া word-টা লেখো।'), sentence: 'Sylhet has ___ highest rainfall in Bangladesh.', accepted: ['the'], explanation: l('Superlative → the highest.', 'Superlative → the highest।') }),
        correct('ar-9-e9', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'), sentence: 'The unemployment is rising in the many countries.', accepted: ['Unemployment is rising in many countries.'], explanation: l('General idea → no article; "many countries" has no "the".', 'সাধারণ ধারণা → article না; "many countries"-এ "the" না।') }),
        correct('ar-9-e10', 'article-a', { ...A, pattern: 'noun-count', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'), sentence: 'Can you give me an advice?', accepted: ['Can you give me some advice?', 'Can you give me a piece of advice?', 'Can you give me advice?'], explanation: l('advice is uncountable.', 'advice uncountable।') }),
        spot('ar-9-e11', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Something is missing before one word. Tap that word and write it with what is missing.', 'একটা word-এর আগে কিছু বাদ পড়েছে। সেই word-এ tap করে যা বাদ পড়েছে সেটা সহ লেখো।'), sentence: 'I am student at a college in Barishal.', wrong: 'student', accepted: ['a student'], explanation: l('One countable thing → a student.', 'গোনা যায় এমন একটা → a student।') }),
        correct('ar-9-e12', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Fix the Task 1 sentence.', 'Task 1 sentence-টা ঠিক করো।'), sentence: 'Table shows number of tourists in 2020.', accepted: ['The table shows the number of tourists in 2020.'], explanation: l('The table · the number of.', 'The table · the number of।') }),
      ],
    },
    {
      kind: 'ielts',
      title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'The chart shows the number of students. Technology helps students learn.', note: l('Task 1: the; Task 2 general: no article.', 'Task 1: the; Task 2 সাধারণ: article না।') },
        { skill: 'speaking', example: 'I’m a student, and the best part of my day is lunch.', note: l('a for you, the for the best.', 'নিজের জন্য a, সেরার জন্য the।') },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('a / an by sound · one countable thing never stands alone.', 'Sound দেখে a / an · গোনা যায় এমন একটা একা দাঁড়ায় না।'),
        l('the = the reader knows which one.', 'the = পাঠক জানে কোনটা।'),
        l('General plural / uncountable → no article.', 'সাধারণ plural / uncountable → article না।'),
      ],
    },
  ],
};

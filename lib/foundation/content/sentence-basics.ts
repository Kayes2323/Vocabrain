import type { Lesson } from '../model';

/**
 * Module 1 — Sentence Basics. Original Vocab Brain lessons. Every lesson says
 * what the idea is, why it matters in IELTS, where it appears, how to use it,
 * and ends with practice the student does themselves.
 */
export const sentenceBasicsLessons: Lesson[] = [
  // ------------------------------------------------------------------ 1
  {
    id: 'sb-1',
    title: { en: 'What is a sentence?', bn: 'Sentence আসলে কী?' },
    why: {
      en: 'Examiners read your Writing sentence by sentence. Complete sentences are the base of Grammatical Range and Accuracy.',
      bn: 'Examiner তোমার Writing sentence ধরে ধরে পড়েন। Complete sentence হলো Grammatical Range & Accuracy-র ভিত্তি।',
    },
    minutes: 6,
    difficulty: 'easy',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'A complete idea', bn: 'একটা সম্পূর্ণ idea' },
        body: {
          en: 'A sentence is a group of words that gives one complete idea. In English, a complete sentence needs at least a subject (who or what) and a verb (the action or state).',
          bn: 'Sentence হলো কিছু শব্দ, যেগুলো মিলে একটা সম্পূর্ণ idea দেয়। English-এ একটা complete sentence-এ কমপক্ষে একটা subject (কে বা কী) আর একটা verb (কাজ বা অবস্থা) লাগে।',
        },
        points: [
          { en: 'It starts with a capital letter.', bn: 'শুরু হয় capital letter দিয়ে।' },
          { en: 'It ends with a full stop (.), question mark (?) or exclamation mark (!).', bn: 'শেষ হয় full stop (.), question mark (?) বা exclamation mark (!) দিয়ে।' },
          { en: 'It makes sense on its own.', bn: 'একা পড়লেও পুরো অর্থ বোঝা যায়।' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Sentence or not?', bn: 'Sentence নাকি না?' },
        items: [
          { en: 'The population grew.', note: { en: 'Complete: subject "The population" + verb "grew".', bn: 'Complete: subject "The population" + verb "grew"।' } },
          { en: 'Because the city is crowded.', note: { en: 'Not complete: "because…" leaves us waiting. What happened because the city is crowded?', bn: 'Complete না: "because…" শুনে মনে হয় কথা শেষ হয়নি। শহর ভিড় বলে কী হলো?' } },
          { en: 'Many students in Dhaka.', note: { en: 'Not complete: there is no verb.', bn: 'Complete না: কোনো verb নেই।' } },
          { en: 'Many students in Dhaka study online.', note: { en: 'Complete: the verb "study" finishes the idea.', bn: 'Complete: verb "study" idea-টা শেষ করেছে।' } },
        ],
      },
      {
        kind: 'ielts',
        title: { en: 'Where you need this in IELTS', bn: 'IELTS-এ কোথায় লাগবে' },
        uses: [
          { skill: 'writing', example: 'The number of visitors rose sharply after 2015.', note: { en: 'Task 1 and Task 2: a missing verb or a half sentence ("Because it is cheaper.") is a clear grammar error.', bn: 'Task 1 আর Task 2: verb বাদ পড়া বা অর্ধেক sentence ("Because it is cheaper.") সরাসরি grammar mistake।' } },
          { skill: 'speaking', example: 'I live in Sylhet. It is a green, quiet city.', note: { en: 'In speaking, short complete sentences sound clearer than long broken ones.', bn: 'Speaking-এ ছোট কিন্তু complete sentence ভাঙা লম্বা sentence-এর চেয়ে পরিষ্কার শোনায়।' } },
          { skill: 'reading', example: 'Although the project was expensive, it was completed on time.', note: { en: 'Finding the main subject and verb helps you understand long Reading sentences.', bn: 'Main subject আর verb খুঁজে পেলে Reading-এর লম্বা sentence সহজে বোঝা যায়।' } },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-1-e1',
            type: 'choice',
            prompt: { en: 'Which one is a complete sentence?', bn: 'কোনটা complete sentence?' },
            options: ['The price of rice in 2020.', 'The price of rice increased in 2020.', 'Because the price of rice increased.'],
            answer: 'The price of rice increased in 2020.',
            explanation: { en: 'It has a subject ("The price of rice") and a verb ("increased") and gives a complete idea.', bn: 'এখানে subject ("The price of rice") আর verb ("increased") দুটোই আছে, idea-ও সম্পূর্ণ।' },
            tag: 'sentence-structure',
          },
          {
            id: 'sb-1-e2',
            type: 'choice',
            prompt: { en: 'What is missing?', bn: 'কী বাদ পড়েছে?' },
            sentence: 'Most people in my village farmers.',
            options: ['a subject', 'a verb', 'nothing, it is correct'],
            answer: 'a verb',
            explanation: { en: 'We need a verb: "Most people in my village are farmers."', bn: 'একটা verb লাগবে: "Most people in my village are farmers."' },
            tag: 'verb',
          },
          {
            id: 'sb-1-e3',
            type: 'correct',
            prompt: { en: 'Make it a complete sentence by adding one word.', bn: 'একটা শব্দ যোগ করে complete sentence বানাও।' },
            sentence: 'Public transport very cheap in Dhaka.',
            accepted: ['Public transport is very cheap in Dhaka.'],
            explanation: { en: 'Add the verb "is": "Public transport is very cheap in Dhaka."', bn: 'Verb "is" যোগ করো: "Public transport is very cheap in Dhaka."' },
            tag: 'verb',
          },
          {
            id: 'sb-1-e4',
            type: 'choice',
            prompt: { en: 'Is this a complete sentence?', bn: 'এটা কি complete sentence?' },
            sentence: 'Because many young people want to study abroad.',
            options: ['Yes', 'No'],
            answer: 'No',
            explanation: { en: '"Because…" needs a main idea: "Many young people learn English because they want to study abroad."', bn: '"Because…"-এর সাথে একটা main idea লাগে: "Many young people learn English because they want to study abroad."' },
            tag: 'sentence-structure',
          },
          {
            id: 'sb-1-e5',
            type: 'write',
            prompt: { en: 'Write one complete sentence about your city.', bn: 'তোমার শহর নিয়ে একটা complete sentence লেখো।' },
            model: 'Chattogram is a busy port city.',
            checklist: [
              { en: 'Starts with a capital letter', bn: 'Capital letter দিয়ে শুরু' },
              { en: 'Has a subject and a verb', bn: 'Subject আর verb আছে' },
              { en: 'Ends with a full stop', bn: 'Full stop দিয়ে শেষ' },
            ],
            explanation: { en: 'Short and complete is better than long and broken.', bn: 'লম্বা ভাঙা sentence-এর চেয়ে ছোট complete sentence ভালো।' },
            tag: 'sentence-structure',
          },
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখো' },
        points: [
          { en: 'Sentence = subject + verb + a complete idea.', bn: 'Sentence = subject + verb + সম্পূর্ণ idea।' },
          { en: '"Because…", "Although…" alone are not sentences.', bn: 'শুধু "Because…", "Although…" দিয়ে sentence হয় না।' },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 2
  {
    id: 'sb-2',
    title: { en: 'The subject', bn: 'Subject' },
    why: {
      en: 'The subject decides the verb form (is/are, has/have). Many Writing errors start with a wrong or missing subject.',
      bn: 'Subject ঠিক করে verb কোন form-এ হবে (is/are, has/have)। Writing-এর অনেক ভুল শুরু হয় ভুল বা বাদ পড়া subject থেকে।',
    },
    minutes: 7,
    difficulty: 'easy',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'Who or what the sentence is about', bn: 'Sentence কাকে বা কী নিয়ে' },
        body: {
          en: 'The subject is the person, thing or idea that does the action or is described. It usually comes before the verb. A subject can be one word ("Prices") or a long phrase ("The number of students who study abroad").',
          bn: 'Subject হলো সেই মানুষ, জিনিস বা idea, যে কাজটা করছে বা যার কথা বলা হচ্ছে। সাধারণত verb-এর আগে বসে। Subject এক শব্দেরও হতে পারে ("Prices"), আবার লম্বা phrase-ও হতে পারে ("The number of students who study abroad")।',
        },
        points: [
          { en: 'Ask "Who?" or "What?" before the verb.', bn: 'Verb-এর আগে "কে?" বা "কী?" জিজ্ঞেস করো।' },
          { en: 'English almost always needs a subject. Bangla can drop it ("যাচ্ছি"), English cannot ("I am going").', bn: 'English-এ প্রায় সবসময় subject লাগে। বাংলায় বাদ দেওয়া যায় ("যাচ্ছি"), English-এ যায় না ("I am going")।' },
          { en: 'Use "It" or "There" when there is no real subject: "It is raining." "There are many parks."', bn: 'আসল subject না থাকলে "It" বা "There" লাগে: "It is raining." "There are many parks."' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Find the subject', bn: 'Subject খুঁজে বের করো' },
        items: [
          { en: 'Online shopping has become popular.', note: { en: 'Subject: "Online shopping".', bn: 'Subject: "Online shopping"।' } },
          { en: 'The number of cars in the city doubled.', note: { en: 'Subject: "The number of cars in the city" (the head word is "number").', bn: 'Subject: "The number of cars in the city" (মূল শব্দ "number")।' } },
          { en: 'There are three main reasons for this.', note: { en: '"There" fills the subject place; the real idea is "three main reasons".', bn: '"There" subject-এর জায়গা নেয়; আসল কথা "three main reasons"।' } },
        ],
      },
      {
        kind: 'ielts',
        title: { en: 'Where you need this in IELTS', bn: 'IELTS-এ কোথায় লাগবে' },
        uses: [
          { skill: 'writing', example: 'The proportion of households with internet access rose.', note: { en: 'Task 1 subjects are often long. Find the head word ("proportion") to choose the verb.', bn: 'Task 1-এ subject প্রায়ই লম্বা হয়। Verb বাছতে মূল শব্দটা ("proportion") ধরো।' } },
          { skill: 'speaking', example: 'It is really important to me.', note: { en: 'Don’t drop the subject: say "It is important", not "Is important".', bn: 'Subject বাদ দিও না: "It is important" বলো, "Is important" না।' } },
          { skill: 'reading', example: 'Researchers at the university found that…', note: { en: 'Who did what? Matching Features questions often test exactly this.', bn: 'কে কী করেছে? Matching Features প্রশ্ন ঠিক এটাই যাচাই করে।' } },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-2-e1',
            type: 'choice',
            prompt: { en: 'What is the subject?', bn: 'Subject কোনটা?' },
            sentence: 'The cost of living in big cities is rising.',
            options: ['The cost of living in big cities', 'big cities', 'is rising'],
            answer: 'The cost of living in big cities',
            explanation: { en: 'What is rising? "The cost of living in big cities".', bn: 'কী বাড়ছে? "The cost of living in big cities"।' },
            tag: 'subject',
          },
          {
            id: 'sb-2-e2',
            type: 'gap',
            prompt: { en: 'Add the missing subject.', bn: 'বাদ পড়া subject বসাও।' },
            sentence: '___ is very hot in Bangladesh in April.',
            accepted: ['It'],
            explanation: { en: 'Weather needs "It": "It is very hot…"', bn: 'আবহাওয়ার কথা বলতে "It" লাগে: "It is very hot…"' },
            tag: 'subject',
          },
          {
            id: 'sb-2-e3',
            type: 'correct',
            prompt: { en: 'Correct the sentence.', bn: 'Sentence-টা ঠিক করো।' },
            sentence: 'Is important to learn English.',
            accepted: ['It is important to learn English.'],
            explanation: { en: 'English needs a subject: "It is important to learn English."', bn: 'English-এ subject লাগে: "It is important to learn English."' },
            tag: 'subject',
          },
          {
            id: 'sb-2-e4',
            type: 'gap',
            prompt: { en: 'Fill the gap with "There" or "It".', bn: 'Gap-এ "There" বা "It" বসাও।' },
            sentence: '___ are many reasons why people move to cities.',
            accepted: ['There'],
            explanation: { en: '"There are + plural noun" says that something exists.', bn: 'কিছু আছে বোঝাতে "There are + plural noun"।' },
            tag: 'subject',
          },
          {
            id: 'sb-2-e5',
            type: 'choice',
            prompt: { en: 'Which head word decides the verb?', bn: 'কোন মূল শব্দ verb ঠিক করে?' },
            sentence: 'The number of students in these schools ___ increased.',
            options: ['number', 'students', 'schools'],
            answer: 'number',
            explanation: { en: '"The number … has increased" — the head word is "number" (singular).', bn: '"The number … has increased" — মূল শব্দ "number" (singular)।' },
            tag: 'agreement',
          },
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখো' },
        points: [
          { en: 'Ask "Who/What?" before the verb to find the subject.', bn: 'Subject পেতে verb-এর আগে "কে/কী?" জিজ্ঞেস করো।' },
          { en: 'Never drop the subject in English: use "It" or "There" if needed.', bn: 'English-এ subject বাদ দিও না: দরকার হলে "It" বা "There"।' },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 3
  {
    id: 'sb-3',
    title: { en: 'The verb', bn: 'Verb' },
    why: {
      en: 'The verb carries tense and agreement — the two areas where most IELTS grammar marks are lost.',
      bn: 'Verb-এর মধ্যেই থাকে tense আর agreement — IELTS grammar-এ সবচেয়ে বেশি নম্বর কাটে এই দুই জায়গায়।',
    },
    minutes: 8,
    difficulty: 'easy',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'Action or state', bn: 'কাজ বা অবস্থা' },
        body: {
          en: 'The verb tells us what the subject does (action: rise, study, travel) or what it is (state: be, seem, have). Every sentence needs a main verb, and its form shows time (tense) and number (singular/plural).',
          bn: 'Verb বলে subject কী করে (action: rise, study, travel) বা কেমন আছে (state: be, seem, have)। প্রতিটা sentence-এ একটা main verb লাগে, আর তার form দেখায় সময় (tense) আর সংখ্যা (singular/plural)।',
        },
        points: [
          { en: '"be" verbs: am, is, are, was, were.', bn: '"be" verb: am, is, are, was, were।' },
          { en: 'Helping verbs (has, will, can, is) + main verb: "has increased", "will change", "can help".', bn: 'Helping verb (has, will, can, is) + main verb: "has increased", "will change", "can help"।' },
          { en: 'An -ing word alone is not a full verb: "Prices rising" ✗ → "Prices are rising" ✓.', bn: 'শুধু -ing দিয়ে full verb হয় না: "Prices rising" ✗ → "Prices are rising" ✓।' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Verbs in IELTS sentences', bn: 'IELTS sentence-এ verb' },
        items: [
          { en: 'Car ownership doubled between 2000 and 2010.', note: { en: 'Action verb in the past: "doubled".', bn: 'Past-এর action verb: "doubled"।' } },
          { en: 'This option seems more practical.', note: { en: 'State verb: "seems".', bn: 'State verb: "seems"।' } },
          { en: 'Governments should invest in public transport.', note: { en: 'Helping verb "should" + main verb "invest".', bn: 'Helping verb "should" + main verb "invest"।' } },
        ],
      },
      {
        kind: 'ielts',
        title: { en: 'Where you need this in IELTS', bn: 'IELTS-এ কোথায় লাগবে' },
        uses: [
          { skill: 'writing', example: 'Sales rose steadily, while costs remained stable.', note: { en: 'Task 1 is built on trend verbs: rise, fall, remain, fluctuate, peak.', bn: 'Task 1 দাঁড়িয়ে আছে trend verb-এর উপর: rise, fall, remain, fluctuate, peak।' } },
          { skill: 'listening', example: 'The course was moved to Wednesday.', note: { en: 'Verbs like "moved", "cancelled", "changed" often signal that the answer is the NEW information.', bn: '"moved", "cancelled", "changed" ধরনের verb প্রায়ই বোঝায় যে answer হলো নতুন তথ্যটা।' } },
          { skill: 'speaking', example: 'I usually cycle to work, but yesterday I took a bus.', note: { en: 'Changing verb forms correctly shows grammatical range.', bn: 'ঠিকভাবে verb form বদলানো grammatical range দেখায়।' } },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-3-e1',
            type: 'choice',
            prompt: { en: 'What is the main verb?', bn: 'Main verb কোনটা?' },
            sentence: 'The number of tourists fell after 2019.',
            options: ['number', 'tourists', 'fell', 'after'],
            answer: 'fell',
            explanation: { en: '"fell" (past of "fall") is the action.', bn: '"fell" ("fall"-এর past) হলো কাজটা।' },
            tag: 'verb',
          },
          {
            id: 'sb-3-e2',
            type: 'correct',
            prompt: { en: 'Correct the sentence.', bn: 'Sentence-টা ঠিক করো।' },
            sentence: 'House prices rising every year.',
            accepted: ['House prices are rising every year.', 'House prices rise every year.'],
            explanation: { en: '"rising" needs a helping verb: "are rising". Or use "rise".', bn: '"rising"-এর সাথে helping verb লাগে: "are rising"। অথবা "rise"।' },
            tag: 'verb',
          },
          {
            id: 'sb-3-e3',
            type: 'gap',
            prompt: { en: 'Complete with a "be" verb.', bn: 'একটা "be" verb বসাও।' },
            sentence: 'My parents ___ both teachers.',
            accepted: ['are', 'were'],
            explanation: { en: 'Plural subject "My parents" → "are" (or "were" for the past).', bn: 'Plural subject "My parents" → "are" (past হলে "were")।' },
            tag: 'agreement',
          },
          {
            id: 'sb-3-e4',
            type: 'choice',
            prompt: { en: 'Choose the correct sentence.', bn: 'সঠিক sentence বাছো।' },
            options: ['The graph show the sales.', 'The graph shows the sales.', 'The graph showing the sales.'],
            answer: 'The graph shows the sales.',
            explanation: { en: 'Singular subject "The graph" → "shows".', bn: 'Singular subject "The graph" → "shows"।' },
            tag: 'agreement',
          },
          {
            id: 'sb-3-e5',
            type: 'write',
            prompt: { en: 'Write one sentence about a change in your area. Use a trend verb (rise, fall, increase, decrease).', bn: 'তোমার এলাকার একটা পরিবর্তন নিয়ে এক sentence লেখো। একটা trend verb ব্যবহার করো (rise, fall, increase, decrease)।' },
            model: 'The number of shopping malls in my area has increased.',
            checklist: [
              { en: 'Has a clear subject', bn: 'Subject পরিষ্কার' },
              { en: 'Has a full verb (not only -ing)', bn: 'Full verb আছে (শুধু -ing না)' },
              { en: 'Verb matches the subject', bn: 'Verb subject-এর সাথে মেলে' },
            ],
            explanation: { en: 'This is exactly the kind of sentence you write in Task 1.', bn: 'Task 1-এ ঠিক এ ধরনের sentence লিখতে হয়।' },
            tag: 'verb',
          },
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখো' },
        points: [
          { en: 'Every sentence needs a full main verb.', bn: 'প্রতিটা sentence-এ একটা full main verb লাগে।' },
          { en: '-ing needs am/is/are/was/were before it.', bn: '-ing-এর আগে am/is/are/was/were লাগে।' },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 4
  {
    id: 'sb-4',
    title: { en: 'The object', bn: 'Object' },
    why: {
      en: 'Objects complete many verbs ("affect people", "provide jobs"). Missing or doubled objects make Writing sound unnatural.',
      bn: 'অনেক verb object ছাড়া অসম্পূর্ণ ("affect people", "provide jobs")। Object বাদ পড়লে বা দুবার বসলে Writing অস্বাভাবিক শোনায়।',
    },
    minutes: 7,
    difficulty: 'easy',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'Who or what receives the action', bn: 'কাজটা কার উপর হচ্ছে' },
        body: {
          en: 'The object receives the action of the verb. It usually comes straight after the verb: "Technology changes our lives." Ask "What?" or "Whom?" after the verb.',
          bn: 'Object হলো যার উপর verb-এর কাজটা হয়। সাধারণত verb-এর ঠিক পরে বসে: "Technology changes our lives." Verb-এর পরে "কী?" বা "কাকে?" জিজ্ঞেস করো।',
        },
        points: [
          { en: 'Some verbs need an object: affect, provide, reduce, improve, discuss.', bn: 'কিছু verb-এর object লাগবেই: affect, provide, reduce, improve, discuss।' },
          { en: 'Some verbs never take one: arrive, happen, rise, fall.', bn: 'কিছু verb কখনো object নেয় না: arrive, happen, rise, fall।' },
          { en: 'Object pronouns: me, him, her, us, them, it.', bn: 'Object pronoun: me, him, her, us, them, it।' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Subject + verb + object', bn: 'Subject + verb + object' },
        items: [
          { en: 'The government reduced taxes.', note: { en: 'Reduced what? "taxes".', bn: 'কী কমিয়েছে? "taxes"।' } },
          { en: 'Social media affects young people.', note: { en: '"affect" + object, no preposition: not "affects on young people".', bn: '"affect" + object, মাঝে preposition নেই: "affects on young people" না।' } },
          { en: 'The price rose.', note: { en: '"rise" has no object: not "The company rose the price" → "raised the price".', bn: '"rise"-এর object নেই: "The company rose the price" না → "raised the price"।' } },
        ],
      },
      {
        kind: 'ielts',
        title: { en: 'Where you need this in IELTS', bn: 'IELTS-এ কোথায় লাগবে' },
        uses: [
          { skill: 'writing', example: 'Working from home saves time and money.', note: { en: 'Task 2 arguments often follow subject + verb + object.', bn: 'Task 2-এর argument প্রায়ই subject + verb + object ধরে চলে।' } },
          { skill: 'writing', example: 'The company raised prices, and sales fell.', note: { en: 'Task 1: "raise" takes an object, "rise" does not — a classic error.', bn: 'Task 1: "raise"-এর object লাগে, "rise"-এর না — খুব common ভুল।' } },
          { skill: 'speaking', example: 'I really enjoy it.', note: { en: '"enjoy" needs an object: say "I enjoy it", not just "I enjoy".', bn: '"enjoy"-এর object লাগে: শুধু "I enjoy" না, "I enjoy it" বলো।' } },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-4-e1',
            type: 'choice',
            prompt: { en: 'What is the object?', bn: 'Object কোনটা?' },
            sentence: 'Many companies provide free training.',
            options: ['Many companies', 'provide', 'free training'],
            answer: 'free training',
            explanation: { en: 'Provide what? "free training".', bn: 'কী দেয়? "free training"।' },
            tag: 'object',
          },
          {
            id: 'sb-4-e2',
            type: 'correct',
            prompt: { en: 'Correct the sentence.', bn: 'Sentence-টা ঠিক করো।' },
            sentence: 'Pollution affects on our health.',
            accepted: ['Pollution affects our health.'],
            explanation: { en: '"affect" takes the object directly: "affects our health".', bn: '"affect"-এর পরে সরাসরি object: "affects our health"।' },
            tag: 'preposition',
          },
          {
            id: 'sb-4-e3',
            type: 'choice',
            prompt: { en: 'Choose the correct verb.', bn: 'সঠিক verb বাছো।' },
            sentence: 'The shop ___ its prices last month.',
            options: ['rose', 'raised'],
            answer: 'raised',
            explanation: { en: '"raise" + object (its prices). "rise" has no object.', bn: '"raise" + object (its prices)। "rise"-এর object হয় না।' },
            tag: 'object',
          },
          {
            id: 'sb-4-e4',
            type: 'choice',
            prompt: { en: 'Speaking Part 1: "Do you like cooking?" Which answer is correct?', bn: 'Speaking Part 1: "Do you like cooking?" কোন answer সঠিক?' },
            options: ['Yes, I really enjoy.', 'Yes, I really enjoy it.', 'Yes, I really enjoy to it.'],
            answer: 'Yes, I really enjoy it.',
            explanation: { en: '"enjoy" always needs an object: "enjoy it", "enjoy cooking".', bn: '"enjoy"-এর পরে সবসময় object লাগে: "enjoy it", "enjoy cooking"।' },
            tag: 'object',
          },
          {
            id: 'sb-4-e5',
            type: 'order',
            prompt: { en: 'Put the words in order.', bn: 'শব্দগুলো সাজাও।' },
            answer: 'Technology has changed our lives.',
            explanation: { en: 'Subject (Technology) + verb (has changed) + object (our lives).', bn: 'Subject (Technology) + verb (has changed) + object (our lives)।' },
            tag: 'sentence-structure',
          },
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখো' },
        points: [
          { en: 'Object = what/whom after the verb.', bn: 'Object = verb-এর পরে কী/কাকে।' },
          { en: 'affect / discuss / enter + object directly (no "on", "about", "into").', bn: 'affect / discuss / enter-এর পরে সরাসরি object ("on", "about", "into" নয়)।' },
          { en: 'raise something ✓ · rise (no object) ✓', bn: 'raise something ✓ · rise (object ছাড়া) ✓' },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 5
  {
    id: 'sb-5',
    title: { en: 'Basic sentence structure', bn: 'Basic sentence structure' },
    why: {
      en: 'English word order is fixed. Bangla puts the verb at the end ("আমি ভাত খাই"); English puts it in the middle ("I eat rice").',
      bn: 'English-এ word order নির্দিষ্ট। বাংলায় verb শেষে বসে ("আমি ভাত খাই"); English-এ মাঝখানে ("I eat rice")।',
    },
    minutes: 8,
    difficulty: 'easy',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'Subject → Verb → Object → Place → Time', bn: 'Subject → Verb → Object → Place → Time' },
        body: {
          en: 'The usual English order is: Subject + Verb + Object/Complement, then extra information about place and time. Time can also go at the start for emphasis.',
          bn: 'English-এর সাধারণ order: Subject + Verb + Object/Complement, তারপর জায়গা আর সময়ের তথ্য। জোর দিতে চাইলে সময় শুরুতেও বসানো যায়।',
        },
        points: [
          { en: 'S + V + O: "Students use smartphones."', bn: 'S + V + O: "Students use smartphones."' },
          { en: 'S + be + complement: "The city is crowded."', bn: 'S + be + complement: "The city is crowded."' },
          { en: 'Place before time: "…in Dhaka in 2020."', bn: 'Place আগে, time পরে: "…in Dhaka in 2020."' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Building a sentence', bn: 'Sentence তৈরি' },
        items: [
          { en: 'Farmers grow rice in the north every year.', note: { en: 'S (Farmers) + V (grow) + O (rice) + place + time.', bn: 'S (Farmers) + V (grow) + O (rice) + place + time।' } },
          { en: 'In 2010, the factory produced 5,000 cars.', note: { en: 'Time moved to the front, followed by a comma.', bn: 'Time সামনে আনা হয়েছে, পরে comma।' } },
          { en: 'The results were surprising.', note: { en: 'S + be + complement (an adjective).', bn: 'S + be + complement (একটা adjective)।' } },
        ],
      },
      {
        kind: 'ielts',
        title: { en: 'Where you need this in IELTS', bn: 'IELTS-এ কোথায় লাগবে' },
        uses: [
          { skill: 'writing', example: 'In 1990, men spent more time on sport than women.', note: { en: 'Task 1: a time phrase at the start is a clean way to organise data.', bn: 'Task 1: শুরুতে time phrase দিলে data গুছিয়ে লেখা যায়।' } },
          { skill: 'speaking', example: 'I usually study in the library in the evening.', note: { en: 'Part 1 answers sound natural with S + V + place + time.', bn: 'Part 1-এর answer S + V + place + time-এ স্বাভাবিক শোনায়।' } },
          { skill: 'reading', example: 'Rarely do scientists agree so quickly.', note: { en: 'Knowing normal order helps you notice unusual order in Reading passages.', bn: 'স্বাভাবিক order জানলে Reading passage-এর অস্বাভাবিক order চোখে পড়ে।' } },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-5-e1',
            type: 'order',
            prompt: { en: 'Put the words in order.', bn: 'শব্দগুলো সাজাও।' },
            answer: 'My brother works in a bank.',
            explanation: { en: 'S (My brother) + V (works) + place (in a bank).', bn: 'S (My brother) + V (works) + place (in a bank)।' },
            tag: 'sentence-structure',
          },
          {
            id: 'sb-5-e2',
            type: 'order',
            prompt: { en: 'Put the words in order.', bn: 'শব্দগুলো সাজাও।' },
            answer: 'Many people visit Cox’s Bazar in winter.',
            explanation: { en: 'S + V + O (Cox’s Bazar) + time (in winter).', bn: 'S + V + O (Cox’s Bazar) + time (in winter)।' },
            tag: 'sentence-structure',
          },
          {
            id: 'sb-5-e3',
            type: 'choice',
            prompt: { en: 'Choose the natural English order.', bn: 'স্বাভাবিক English order কোনটা?' },
            options: ['I every day English practise.', 'I practise English every day.', 'Every day I English practise.'],
            answer: 'I practise English every day.',
            explanation: { en: 'S (I) + V (practise) + O (English) + time (every day).', bn: 'S (I) + V (practise) + O (English) + time (every day)।' },
            tag: 'sentence-structure',
          },
          {
            id: 'sb-5-e4',
            type: 'correct',
            prompt: { en: 'Correct the word order.', bn: 'Word order ঠিক করো।' },
            sentence: 'In 2020 the company 200 workers employed.',
            accepted: ['In 2020, the company employed 200 workers.', 'In 2020 the company employed 200 workers.', 'The company employed 200 workers in 2020.'],
            explanation: { en: 'The verb goes before the object: "the company employed 200 workers".', bn: 'Verb object-এর আগে: "the company employed 200 workers"।' },
            tag: 'sentence-structure',
          },
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখো' },
        points: [
          { en: 'S + V + O, then place, then time.', bn: 'S + V + O, তারপর place, তারপর time।' },
          { en: 'The verb comes early in English, not at the end.', bn: 'English-এ verb আগে আসে, শেষে না।' },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 6
  {
    id: 'sb-6',
    title: { en: 'Simple sentences', bn: 'Simple sentence' },
    why: {
      en: 'Clear simple sentences are the safest way to make your main point in Writing and Speaking.',
      bn: 'Writing আর Speaking-এ main point পরিষ্কার করে বলার সবচেয়ে নিরাপদ উপায় হলো clear simple sentence।',
    },
    minutes: 6,
    difficulty: 'easy',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'One subject–verb unit', bn: 'একটা subject–verb unit' },
        body: {
          en: 'A simple sentence has one main clause: one subject–verb unit. It can still be long if it has extra phrases: "In most developed countries, the number of elderly people is growing rapidly."',
          bn: 'Simple sentence-এ একটাই main clause থাকে: একটা subject–verb unit। অতিরিক্ত phrase থাকলে এটা লম্বাও হতে পারে: "In most developed countries, the number of elderly people is growing rapidly."',
        },
        points: [
          { en: 'Simple ≠ childish. A simple sentence can be precise and advanced.', bn: 'Simple মানে ছোটদের মতো না। Simple sentence-ও precise আর advanced হতে পারে।' },
          { en: 'Use them for your main idea, then add detail.', bn: 'Main idea বলতে ব্যবহার করো, তারপর detail যোগ করো।' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Simple but strong', bn: 'Simple কিন্তু জোরালো' },
        items: [
          { en: 'Education is the key to development.', note: { en: 'Clear topic sentence for a Task 2 paragraph.', bn: 'Task 2 paragraph-এর জন্য পরিষ্কার topic sentence।' } },
          { en: 'Overall, spending on housing rose over the period.', note: { en: 'A one-sentence Task 1 overview.', bn: 'এক sentence-এর Task 1 overview।' } },
        ],
      },
      {
        kind: 'ielts',
        title: { en: 'Where you need this in IELTS', bn: 'IELTS-এ কোথায় লাগবে' },
        uses: [
          { skill: 'writing', example: 'Overall, the use of mobile phones increased dramatically.', note: { en: 'Task 1 overview: one clear simple sentence is often enough.', bn: 'Task 1 overview: প্রায়ই একটা clear simple sentence-ই যথেষ্ট।' } },
          { skill: 'speaking', example: 'My favourite season is winter.', note: { en: 'Part 1: answer directly first, then extend.', bn: 'Part 1: আগে সরাসরি answer, তারপর বাড়াও।' } },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-6-e1',
            type: 'choice',
            prompt: { en: 'Which is a simple sentence (one subject–verb unit)?', bn: 'কোনটা simple sentence (একটা subject–verb unit)?' },
            options: [
              'In recent years, online learning has become very popular.',
              'Online learning is popular, but many students prefer classrooms.',
              'Online learning is popular because it is flexible.',
            ],
            answer: 'In recent years, online learning has become very popular.',
            explanation: { en: 'Only one verb unit: "has become". The others join two clauses.', bn: 'একটাই verb unit: "has become"। বাকিগুলোতে দুইটা clause জোড়া।' },
            tag: 'sentence-structure',
          },
          {
            id: 'sb-6-e2',
            type: 'order',
            prompt: { en: 'Build a Task 1 overview sentence.', bn: 'একটা Task 1 overview sentence বানাও।' },
            answer: 'Overall, car sales increased over the period.',
            explanation: { en: '"Overall," + S + V + time.', bn: '"Overall," + S + V + time।' },
            tag: 'sentence-structure',
          },
          {
            id: 'sb-6-e3',
            type: 'write',
            prompt: { en: 'IELTS Speaking Part 1: "Do you like reading?" Answer with one clear simple sentence.', bn: 'IELTS Speaking Part 1: "Do you like reading?" একটা clear simple sentence-এ answer দাও।' },
            model: 'Yes, I really enjoy reading novels in my free time.',
            checklist: [
              { en: 'Answers the question directly', bn: 'সরাসরি প্রশ্নের answer' },
              { en: 'One subject and one main verb', bn: 'একটা subject আর একটা main verb' },
            ],
            explanation: { en: 'Start with a direct answer. You will learn to extend it in the next lessons.', bn: 'আগে সরাসরি answer। কীভাবে বাড়াবে সেটা পরের lesson-এ শিখবে।' },
            tag: 'sentence-structure',
          },
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখো' },
        points: [{ en: 'One clause = simple sentence. Use it for main points and overviews.', bn: 'একটা clause = simple sentence। Main point আর overview-তে ব্যবহার করো।' }],
      },
    ],
  },

  // ------------------------------------------------------------------ 7
  {
    id: 'sb-7',
    title: { en: 'Compound sentences', bn: 'Compound sentence' },
    why: {
      en: 'Joining two ideas with "and", "but", "so" and "or" makes your Writing and Speaking flow — a first step towards Coherence & Cohesion.',
      bn: '"and", "but", "so", "or" দিয়ে দুইটা idea জুড়লে Writing আর Speaking সাবলীল হয় — Coherence & Cohesion-এর প্রথম ধাপ।',
    },
    minutes: 8,
    difficulty: 'medium',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'Two complete ideas, one sentence', bn: 'দুইটা সম্পূর্ণ idea, এক sentence' },
        body: {
          en: 'A compound sentence joins two complete sentences with a joining word (coordinator). Put a comma before the joining word when both parts are long.',
          bn: 'Compound sentence দুইটা complete sentence-কে একটা joining word (coordinator) দিয়ে জোড়ে। দুই অংশ লম্বা হলে joining word-এর আগে comma দাও।',
        },
        points: [
          { en: 'and = add: "Prices rose, and demand fell."', bn: 'and = যোগ: "Prices rose, and demand fell."' },
          { en: 'but = contrast: "It is cheap, but it is slow."', bn: 'but = বিপরীত: "It is cheap, but it is slow."' },
          { en: 'so = result: "The bus was late, so I walked."', bn: 'so = ফলাফল: "The bus was late, so I walked."' },
          { en: 'or = choice: "We can study online, or we can join a class."', bn: 'or = বিকল্প: "We can study online, or we can join a class."' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Two ideas → one sentence', bn: 'দুই idea → এক sentence' },
        items: [
          { en: 'Rent is high in Dhaka, so many students share flats.', note: { en: '"so" shows the result.', bn: '"so" ফলাফল দেখায়।' } },
          { en: 'Coal use fell, but gas use increased.', note: { en: '"but" contrasts two trends — very useful in Task 1.', bn: '"but" দুইটা trend-এর তুলনা করে — Task 1-এ খুব কাজের।' } },
        ],
      },
      {
        kind: 'ielts',
        title: { en: 'Where you need this in IELTS', bn: 'IELTS-এ কোথায় লাগবে' },
        uses: [
          { skill: 'writing', example: 'Exports to Asia doubled, but exports to Europe remained stable.', note: { en: 'Task 1 comparisons.', bn: 'Task 1-এর তুলনা।' } },
          { skill: 'speaking', example: 'I like my job, but the commute is quite tiring.', note: { en: 'Extends a Part 1 answer naturally.', bn: 'Part 1-এর answer স্বাভাবিকভাবে বাড়ায়।' } },
          { skill: 'listening', example: 'It was going to be on Tuesday, but it has been moved to Wednesday.', note: { en: '"but" often comes just before the correct answer.', bn: '"but"-এর ঠিক পরেই প্রায়ই সঠিক answer আসে।' } },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-7-e1',
            type: 'choice',
            prompt: { en: 'Choose the best joining word.', bn: 'সবচেয়ে ভালো joining word বাছো।' },
            sentence: 'The traffic was terrible, ___ I arrived late.',
            options: ['but', 'so', 'or'],
            answer: 'so',
            explanation: { en: 'Arriving late is the result → "so".', bn: 'দেরিতে পৌঁছানো ফলাফল → "so"।' },
            tag: 'connector',
          },
          {
            id: 'sb-7-e2',
            type: 'choice',
            prompt: { en: 'Choose the best joining word.', bn: 'সবচেয়ে ভালো joining word বাছো।' },
            sentence: 'Sales of laptops rose, ___ sales of desktop computers fell.',
            options: ['and', 'but', 'so'],
            answer: 'but',
            explanation: { en: 'Two opposite trends → "but".', bn: 'দুইটা বিপরীত trend → "but"।' },
            tag: 'connector',
          },
          {
            id: 'sb-7-e3',
            type: 'correct',
            prompt: { en: 'Join the two sentences with "but".', bn: '"but" দিয়ে দুইটা sentence জোড়ো।' },
            sentence: 'Online classes are flexible. They can be lonely.',
            accepted: ['Online classes are flexible, but they can be lonely.', 'Online classes are flexible but they can be lonely.'],
            explanation: { en: 'Comma + "but" + second clause (with a small "t" in "they").', bn: 'Comma + "but" + দ্বিতীয় clause ("they"-র t ছোট হাতের)।' },
            tag: 'connector',
          },
          {
            id: 'sb-7-e4',
            type: 'write',
            prompt: { en: 'Speaking Part 1: "Do you like your hometown?" Answer with a compound sentence using "but" or "so".', bn: 'Speaking Part 1: "Do you like your hometown?" "but" বা "so" দিয়ে compound sentence-এ answer দাও।' },
            model: 'Yes, I love my hometown, but it has become very crowded recently.',
            checklist: [
              { en: 'Two complete ideas', bn: 'দুইটা complete idea' },
              { en: 'Joined with "but" or "so"', bn: '"but" বা "so" দিয়ে জোড়া' },
            ],
            explanation: { en: 'Two linked ideas make a Part 1 answer longer and more natural.', bn: 'দুইটা যুক্ত idea Part 1-এর answer-কে লম্বা আর স্বাভাবিক করে।' },
            tag: 'connector',
          },
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখো' },
        points: [
          { en: 'and (add) · but (contrast) · so (result) · or (choice)', bn: 'and (যোগ) · but (বিপরীত) · so (ফল) · or (বিকল্প)' },
          { en: 'Both sides must be complete sentences.', bn: 'দুই পাশেই complete sentence হতে হবে।' },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 8
  {
    id: 'sb-8',
    title: { en: 'Complex sentences: a first look', bn: 'Complex sentence: প্রথম পরিচয়' },
    why: {
      en: 'A mix of simple and complex sentences shows grammatical range — but only when the sentences are accurate.',
      bn: 'Simple আর complex sentence-এর মিশ্রণ grammatical range দেখায় — কিন্তু শুধু তখনই, যখন sentence-গুলো ভুল ছাড়া হয়।',
    },
    minutes: 9,
    difficulty: 'medium',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'Main idea + supporting idea', bn: 'Main idea + supporting idea' },
        body: {
          en: 'A complex sentence has a main clause (it can stand alone) and a dependent clause (it cannot). The dependent clause starts with a word like because, although, when, if or which. You will study these fully in Module 8; here you learn to recognise and build simple ones.',
          bn: 'Complex sentence-এ থাকে একটা main clause (একা দাঁড়াতে পারে) আর একটা dependent clause (একা পারে না)। Dependent clause শুরু হয় because, although, when, if বা which ধরনের শব্দ দিয়ে। Module 8-এ এগুলো বিস্তারিত পড়বে; এখানে চিনতে আর সহজ কয়েকটা বানাতে শিখবে।',
        },
        points: [
          { en: 'because = reason · although = contrast · when = time · if = condition', bn: 'because = কারণ · although = বিপরীত · when = সময় · if = শর্ত' },
          { en: 'If the dependent clause comes first, add a comma: "Although it was expensive, it sold well."', bn: 'Dependent clause আগে এলে comma দাও: "Although it was expensive, it sold well."' },
          { en: 'Accuracy first: one correct complex sentence beats three broken ones.', bn: 'আগে accuracy: তিনটা ভাঙা complex sentence-এর চেয়ে একটা সঠিক ভালো।' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Simple → complex', bn: 'Simple → complex' },
        items: [
          { en: 'Many people cycle to work because it is cheap.', note: { en: 'Main idea + reason.', bn: 'Main idea + কারণ।' } },
          { en: 'Although the course was difficult, most students passed.', note: { en: 'Contrast clause first, then a comma.', bn: 'আগে contrast clause, তারপর comma।' } },
          { en: 'When prices fall, demand usually rises.', note: { en: 'Time/condition clause first.', bn: 'আগে সময়/শর্তের clause।' } },
        ],
      },
      {
        kind: 'ielts',
        title: { en: 'Where you need this in IELTS', bn: 'IELTS-এ কোথায় লাগবে' },
        uses: [
          { skill: 'writing', example: 'Although technology saves time, it can also isolate people.', note: { en: 'Task 2: presents both sides in one accurate sentence.', bn: 'Task 2: এক সঠিক sentence-এ দুই দিক তুলে ধরে।' } },
          { skill: 'speaking', example: 'I prefer mornings because I can concentrate better.', note: { en: '"because" is the easiest way to extend any answer.', bn: 'যেকোনো answer বাড়ানোর সবচেয়ে সহজ উপায় "because"।' } },
          { skill: 'reading', example: 'Although the drug was effective, it was never approved.', note: { en: 'TRUE/FALSE/NOT GIVEN often depends on the "although" part.', bn: 'TRUE/FALSE/NOT GIVEN প্রায়ই "although" অংশের উপর নির্ভর করে।' } },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-8-e1',
            type: 'choice',
            prompt: { en: 'Choose the best word.', bn: 'সবচেয়ে ভালো শব্দ বাছো।' },
            sentence: '___ it was raining, the match continued.',
            options: ['Because', 'Although', 'If'],
            answer: 'Although',
            explanation: { en: 'Rain + the match continued = contrast → "Although".', bn: 'বৃষ্টি + তবু খেলা চলল = বিপরীত → "Although"।' },
            tag: 'complex-sentence',
          },
          {
            id: 'sb-8-e2',
            type: 'choice',
            prompt: { en: 'Which sentence is correct?', bn: 'কোন sentence সঠিক?' },
            options: [
              'Although it is expensive, but many people buy it.',
              'Although it is expensive, many people buy it.',
              'Although it is expensive. Many people buy it.',
            ],
            answer: 'Although it is expensive, many people buy it.',
            explanation: { en: 'Use "although" OR "but", never both. And "Although…" cannot stand alone.', bn: '"although" অথবা "but" — দুটো একসাথে না। আর "Although…" একা দাঁড়াতে পারে না।' },
            tag: 'complex-sentence',
          },
          {
            id: 'sb-8-e3',
            type: 'correct',
            prompt: { en: 'Join with "because".', bn: '"because" দিয়ে জোড়ো।' },
            sentence: 'I want to study abroad. I want better job opportunities.',
            accepted: ['I want to study abroad because I want better job opportunities.'],
            explanation: { en: 'Main idea + "because" + reason.', bn: 'Main idea + "because" + কারণ।' },
            tag: 'complex-sentence',
          },
          {
            id: 'sb-8-e4',
            type: 'write',
            prompt: { en: 'Speaking Part 1: "Do you prefer studying in the morning or at night?" Answer with "because".', bn: 'Speaking Part 1: "Do you prefer studying in the morning or at night?" "because" দিয়ে answer দাও।' },
            model: 'I prefer studying at night because the house is much quieter.',
            checklist: [
              { en: 'Direct answer first', bn: 'আগে সরাসরি answer' },
              { en: '"because" + a full clause (subject + verb)', bn: '"because" + পূর্ণ clause (subject + verb)' },
            ],
            explanation: { en: 'Answer + reason is the simplest way to reach a natural length in Part 1.', bn: 'Answer + কারণ — Part 1-এ স্বাভাবিক দৈর্ঘ্যে পৌঁছানোর সবচেয়ে সহজ উপায়।' },
            tag: 'complex-sentence',
          },
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখো' },
        points: [
          { en: 'Although + clause, main clause. (No "but".)', bn: 'Although + clause, main clause। ("but" না।)' },
          { en: 'Accuracy first, then variety.', bn: 'আগে accuracy, তারপর variety।' },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 9
  {
    id: 'sb-9',
    title: { en: 'Sentence practice: IELTS mix', bn: 'Sentence practice: IELTS mix' },
    why: {
      en: 'Put everything together on real IELTS-style sentences before moving on to Tenses.',
      bn: 'Tenses-এ যাওয়ার আগে IELTS ধাঁচের sentence-এ সবকিছু একসাথে ঝালিয়ে নাও।',
    },
    minutes: 10,
    difficulty: 'medium',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'Your checklist for every sentence', bn: 'প্রতিটা sentence-এর checklist' },
        body: {
          en: 'Before you finish a sentence in Writing, check three things: Is there a subject? Is there a full verb that matches it? Is the idea complete? Then choose: simple, compound (and/but/so) or complex (because/although/when).',
          bn: 'Writing-এ sentence শেষ করার আগে তিনটা জিনিস দেখো: subject আছে? subject-এর সাথে মেলে এমন full verb আছে? Idea সম্পূর্ণ? তারপর ঠিক করো: simple, compound (and/but/so) নাকি complex (because/although/when)।',
        },
      },
      {
        kind: 'ielts',
        title: { en: 'Where you need this in IELTS', bn: 'IELTS-এ কোথায় লাগবে' },
        uses: [
          { skill: 'writing', example: 'Although car sales fell in 2020, they recovered quickly and reached a peak in 2023.', note: { en: 'Task 1: one accurate complex sentence with two trends.', bn: 'Task 1: দুইটা trend নিয়ে একটা সঠিক complex sentence।' } },
          { skill: 'speaking', example: 'I live in a small town near Rajshahi, and I really like it because it is peaceful.', note: { en: 'Part 1: simple → compound → complex in one natural answer.', bn: 'Part 1: এক স্বাভাবিক answer-এ simple → compound → complex।' } },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Mixed practice', bn: 'Mixed practice' },
        exercises: [
          {
            id: 'sb-9-e1',
            type: 'correct',
            prompt: { en: 'Correct the sentence.', bn: 'Sentence-টা ঠিক করো।' },
            sentence: 'The number of students increasing every year.',
            accepted: ['The number of students is increasing every year.', 'The number of students increases every year.'],
            explanation: { en: 'Add a helping verb: "is increasing" (singular, because the head word is "number").', bn: 'Helping verb লাগবে: "is increasing" (singular, কারণ মূল শব্দ "number")।' },
            tag: 'verb',
          },
          {
            id: 'sb-9-e2',
            type: 'correct',
            prompt: { en: 'Correct the sentence.', bn: 'Sentence-টা ঠিক করো।' },
            sentence: 'Is difficult to find a good job without experience.',
            accepted: ['It is difficult to find a good job without experience.'],
            explanation: { en: 'Missing subject "It".', bn: 'Subject "It" বাদ পড়েছে।' },
            tag: 'subject',
          },
          {
            id: 'sb-9-e3',
            type: 'order',
            prompt: { en: 'Put the words in order.', bn: 'শব্দগুলো সাজাও।' },
            answer: 'Although the rent is high, many students live in the city.',
            explanation: { en: '"Although" clause + comma + main clause.', bn: '"Although" clause + comma + main clause।' },
            tag: 'complex-sentence',
          },
          {
            id: 'sb-9-e4',
            type: 'choice',
            prompt: { en: 'Which sentence is best for a Task 1 overview?', bn: 'Task 1 overview-এর জন্য কোন sentence সবচেয়ে ভালো?' },
            options: [
              'Overall, the use of public transport increased, while car use declined.',
              'Overall public transport increasing and car decline.',
              'Overall, because public transport increased.',
            ],
            answer: 'Overall, the use of public transport increased, while car use declined.',
            explanation: { en: 'Complete, accurate, and it shows the two main trends.', bn: 'সম্পূর্ণ, সঠিক, আর দুইটা main trend দেখায়।' },
            tag: 'sentence-structure',
          },
          {
            id: 'sb-9-e5',
            type: 'choice',
            prompt: { en: 'Choose the correct verb.', bn: 'সঠিক verb বাছো।' },
            sentence: 'Unemployment ___ sharply in 2009.',
            options: ['rose', 'raised', 'rised'],
            answer: 'rose',
            explanation: { en: '"rise – rose – risen" has no object. "raised" needs an object; "rised" does not exist.', bn: '"rise – rose – risen"-এর object নেই। "raised"-এর object লাগে; "rised" বলে কোনো শব্দ নেই।' },
            tag: 'verb',
          },
          {
            id: 'sb-9-e6',
            type: 'write',
            prompt: { en: 'Task 2 practice: "Some people think university should be free." Write one sentence with your opinion and a reason.', bn: 'Task 2 practice: "Some people think university should be free." তোমার মত আর একটা কারণ দিয়ে এক sentence লেখো।' },
            model: 'I believe university should be free because education benefits the whole society.',
            checklist: [
              { en: 'Clear opinion', bn: 'পরিষ্কার মত' },
              { en: 'Reason with "because" + subject + verb', bn: '"because" + subject + verb দিয়ে কারণ' },
              { en: 'Capital letter and full stop', bn: 'Capital letter আর full stop' },
            ],
            explanation: { en: 'This is how every Task 2 body paragraph begins: a clear idea and a reason.', bn: 'Task 2-এর প্রতিটা body paragraph এভাবেই শুরু হয়: পরিষ্কার idea আর একটা কারণ।' },
            tag: 'complex-sentence',
          },
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Module summary', bn: 'Module summary' },
        points: [
          { en: 'Subject + full verb + complete idea.', bn: 'Subject + full verb + সম্পূর্ণ idea।' },
          { en: 'Simple for main points, compound for linking, complex for reasons and contrasts.', bn: 'Main point-এ simple, জোড়ার জন্য compound, কারণ আর বিপরীতের জন্য complex।' },
          { en: 'Next: Tenses — how verbs show time in IELTS.', bn: 'পরের module: Tenses — IELTS-এ verb কীভাবে সময় দেখায়।' },
        ],
      },
    ],
  },
];

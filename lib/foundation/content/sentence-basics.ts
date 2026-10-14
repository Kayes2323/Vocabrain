import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, spot, write } from './pos-kit';

/**
 * Module 1 — Sentence Basics. Original Mino lessons. Every lesson says
 * what the idea is, why it matters in IELTS, where it appears, how to use it,
 * and ends with practice the student does themselves.
 *
 * Problem-first format (v2): hook → rule → worked examples → mistake lab →
 * practice → recall without options → personal use (checked by Mino). The
 * teaching follows docs/FOUNDATION_REWRITE_BATCH_01/02 (mapped by topic, not by
 * number). Original exercise IDs (sb-N-eN) are kept as they were; new ones are
 * sb-N-pN (practice), sb-N-rN (recall) and sb-N-y1 (personal).
 */

export const SENTENCE_BASICS_CONCEPTS: Concept[] = [
  { id: 'sb-complete', title: l('Complete sentences', 'Complete sentence'), lessonId: 'sb-1', tag: 'sentence-structure' },
  { id: 'sb-subject', title: l('Finding the subject', 'Subject খোঁজা'), lessonId: 'sb-2', tag: 'subject' },
  { id: 'sb-verb', title: l('Full main verbs', 'Full main verb'), lessonId: 'sb-3', tag: 'verb' },
  { id: 'sb-object', title: l('Objects and complements', 'Object আর complement'), lessonId: 'sb-4', tag: 'object' },
  { id: 'sb-order', title: l('English word order', 'English word order'), lessonId: 'sb-5', tag: 'sentence-structure' },
  { id: 'sb-simple', title: l('Simple sentences, phrases and clauses', 'Simple sentence, phrase আর clause'), lessonId: 'sb-6', tag: 'sentence-structure' },
  { id: 'sb-compound', title: l('Compound sentences and comma splices', 'Compound sentence আর comma splice'), lessonId: 'sb-7', tag: 'sentence-structure' },
  { id: 'sb-complex-intro', title: l('Complex sentences: a first look', 'Complex sentence: প্রথম পরিচয়'), lessonId: 'sb-8', tag: 'sentence-structure' },
];

const C1 = 'sb-complete';
const P1 = { tag: 'sentence-structure' as const };
const C2 = 'sb-subject';
const P2 = { tag: 'subject' as const };
const C3 = 'sb-verb';
const P3 = { tag: 'verb' as const };
const C4 = 'sb-object';
const P4 = { tag: 'object' as const };
const C5 = 'sb-order';
const P5 = { tag: 'sentence-structure' as const };
const C6 = 'sb-simple';
const P6 = { tag: 'sentence-structure' as const };
const C7 = 'sb-compound';
const P7 = { tag: 'connector' as const };
const C8 = 'sb-complex-intro';
const P8 = { tag: 'complex-sentence' as const };
export const sentenceBasicsLessons: Lesson[] = [
  // ------------------------------------------------------------------ 1
  {
    id: 'sb-1',
    format: 'v2',
    concept: C1,
    title: { en: 'What is a sentence?', bn: 'Sentence আসলে কী?' },
    why: {
      en: 'Examiners and readers need finished sentences. A missing verb, or a "because…" clause left on its own, is a clear grammar error in Writing — and finding the complete main idea makes long Reading sentences easier.',
      bn: 'Examiner আর পাঠক সম্পূর্ণ sentence চান। Verb বাদ পড়া, বা একা পড়ে থাকা "because…" clause Writing-এ স্পষ্ট grammar ভুল — আর পুরো main idea খুঁজে পেলে Reading-এর লম্বা sentence সহজ হয়।',
    },
    minutes: 9,
    difficulty: 'easy',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'A complete idea', bn: 'একটা সম্পূর্ণ idea' },
        body: {
          en: 'A sentence gives the reader one finished message. Usually it has a subject (who or what it is about) and a main verb (what happens or what is true).',
          bn: 'Sentence পাঠককে একটা শেষ হওয়া বার্তা দেয়। সাধারণত এতে একটা subject (কাকে বা কী নিয়ে) আর একটা main verb (কী ঘটে বা কী সত্য) থাকে।',
        },
        points: [
          { en: 'Commands are complete too: "Please wait here." The subject "you" is understood, so it is not written.', bn: 'Command-ও complete: "Please wait here." Subject "you" বোঝা যায়, তাই লেখা হয় না।' },
          { en: 'A clause that starts with because, although, when or if usually needs a main clause: "Because the bus was late" is not finished.', bn: 'because, although, when বা if দিয়ে শুরু হওয়া clause-এর সাধারণত একটা main clause লাগে: "Because the bus was late" শেষ হয়নি।' },
          { en: 'A capital letter and a full stop show where a sentence ends. They cannot add a missing verb or a missing main clause.', bn: 'Capital letter আর full stop দেখায় sentence কোথায় শেষ। কিন্তু এরা বাদ পড়া verb বা main clause যোগ করতে পারে না।' },
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
          { en: 'Please wait here.', note: { en: 'Complete command: the subject "you" is understood.', bn: 'Complete command: subject "you" বোঝা যায়।' } },
          { en: 'The people who live near the station can walk to work.', note: { en: '"who live near the station" describes the people; "can walk" finishes the main idea.', bn: '"who live near the station" মানুষগুলোর বর্ণনা; "can walk" main idea শেষ করে।' } },
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
        kind: 'hook',
        title: l('Three messages', 'তিনটা message'),
        situation: l('You send a friend three messages: (1) "The bus was late." (2) "Because the bus was late." (3) "The bus late."', 'আপনি এক বন্ধুকে তিনটা message পাঠালেন: (1) "The bus was late." (2) "Because the bus was late." (3) "The bus late."'),
        question: l('Which message is a complete sentence?', 'কোন message-টা complete sentence?'),
        options: ['The bus was late.', 'Because the bus was late.', 'The bus late.'],
        answer: 'The bus was late.',
        diagnose: {
          'The bus was late.': l('Right. It has a subject ("The bus"), a verb ("was") and a finished message.', 'ঠিক। এতে subject ("The bus"), verb ("was") আর শেষ হওয়া বার্তা আছে।'),
          'Because the bus was late.': l('"Because" makes the reader wait for the result: what happened because the bus was late? It is a fragment.', '"Because" পাঠককে ফলাফলের জন্য অপেক্ষা করায়: bus দেরি করায় কী হলো? এটা একটা fragment।'),
          'The bus late.': l('There is no verb. Add "was": "The bus was late."', 'কোনো verb নেই। "was" যোগ করুন: "The bus was late."'),
        },
      },
      {
        kind: 'mistakes',
        title: l('Mistake lab: fragments', 'Mistake lab: fragment'),
        items: [
          { wrong: 'Because public transport is cheap.', right: 'Many students use public transport because it is cheap.', why: l('"Because" gives a reason; the sentence still needs the main message.', '"Because" কারণ দেয়; sentence-এ main বার্তাটা এখনো লাগবে।') },
          { wrong: 'The people who live near the station.', right: 'The people who live near the station can walk to work.', why: l('The who-clause describes the people, but the sentence never says anything about them.', 'who-clause মানুষগুলোর বর্ণনা দেয়, কিন্তু sentence তাদের সম্পর্কে কিছুই বলে না।') },
          { wrong: 'My younger brother a university student.', right: 'My younger brother is a university student.', why: l('The subject is there; the linking verb "is" is missing.', 'Subject আছে; linking verb "is" বাদ পড়েছে।') },
          { wrong: 'More people use buses. Because fuel is expensive.', right: 'More people use buses because fuel is expensive.', why: l('A full stop cut the reason off from its main clause. Join them.', 'Full stop কারণটাকে main clause থেকে আলাদা করে দিয়েছে। দুটো জুড়ে দিন।') },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-1-e1',
            type: 'choice',
            concept: C1,
            prompt: { en: 'Which one is a complete sentence?', bn: 'কোনটা complete sentence?' },
            options: ['The price of rice in 2020.', 'The price of rice increased in 2020.', 'Because the price of rice increased.'],
            answer: 'The price of rice increased in 2020.',
            explanation: { en: 'It has a subject ("The price of rice") and a verb ("increased") and gives a complete idea.', bn: 'এখানে subject ("The price of rice") আর verb ("increased") দুটোই আছে, idea-ও সম্পূর্ণ।' },
            tag: 'sentence-structure',
          },
          {
            id: 'sb-1-e2',
            type: 'choice',
            concept: C1,
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
            concept: C1,
            prompt: { en: 'Make it a complete sentence by adding one word.', bn: 'একটা শব্দ যোগ করে complete sentence বানান।' },
            sentence: 'Public transport very cheap in Dhaka.',
            accepted: ['Public transport is very cheap in Dhaka.'],
            explanation: { en: 'Add the verb "is": "Public transport is very cheap in Dhaka."', bn: 'Verb "is" যোগ করুন: "Public transport is very cheap in Dhaka."' },
            tag: 'verb',
          },
          {
            id: 'sb-1-e4',
            type: 'choice',
            concept: C1,
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
            concept: C1,
            prompt: { en: 'Write one complete sentence about your city.', bn: 'আপনার শহর নিয়ে একটা complete sentence লিখুন।' },
            model: 'Chattogram is a busy port city.',
            checklist: [
              { en: 'Starts with a capital letter', bn: 'Capital letter দিয়ে শুরু' },
              { en: 'Has a subject and a verb', bn: 'Subject আর verb আছে' },
              { en: 'Ends with a full stop', bn: 'Full stop দিয়ে শেষ' },
            ],
            explanation: { en: 'Short and complete is better than long and broken.', bn: 'লম্বা ভাঙা sentence-এর চেয়ে ছোট complete sentence ভালো।' },
            tag: 'sentence-structure',
          },
          choice('sb-1-p1', C1, { ...P1, prompt: l('Which one is a complete command?', 'কোনটা complete command?'), options: ['Please close the door.', 'Closing the door.', 'When you close the door.'], answer: 'Please close the door.', explanation: l('A command is complete: the subject "you" is understood.', 'Command complete: subject "you" বোঝা যায়।'), why: { 'Closing the door.': l('An -ing word alone is not a full verb.', 'শুধু -ing word দিয়ে full verb হয় না।'), 'When you close the door.': l('"When…" waits for a main clause: "When you close the door, turn off the light."', '"When…" একটা main clause-এর অপেক্ষায় থাকে: "When you close the door, turn off the light."') } }),
          choice('sb-1-p2', C1, { ...P1, prompt: l('What does this fragment need?', 'এই fragment-এর কী লাগবে?'), sentence: 'Although the course was expensive.', options: ['a main clause, e.g. "…, many students joined it."', 'only a full stop', 'only a capital letter'], answer: 'a main clause, e.g. "…, many students joined it."', explanation: l('"Although" sets up a contrast; the main clause completes it.', '"Although" একটা বিপরীত কথা শুরু করে; main clause সেটা শেষ করে।'), why: { 'only a full stop': l('It already has a full stop — punctuation cannot finish the idea.', 'Full stop তো আছেই — punctuation idea শেষ করতে পারে না।'), 'only a capital letter': l('It already starts with a capital letter.', 'এটা তো capital letter দিয়েই শুরু।') } }),
        ],
      },
      {
        kind: 'practice',
        mode: 'recall',
        title: l('Now without options', 'এবার option ছাড়া'),
        exercises: [
          gap('sb-1-r1', C1, { ...P1, tag: 'verb', prompt: l('Add the missing verb.', 'বাদ পড়া verb বসান।'), sentence: 'My younger brother ___ a university student.', accepted: ['is', 'was'], explanation: l('The linking verb "is" (or "was") connects the subject to the description.', 'Linking verb "is" (বা "was") subject-কে বর্ণনার সাথে জোড়ে।') }),
          correct('sb-1-r2', C1, { ...P1, prompt: l('Make it one complete sentence.', 'একটা complete sentence বানান।'), sentence: 'More people use buses. Because fuel is expensive.', accepted: ['More people use buses because fuel is expensive.', 'Because fuel is expensive, more people use buses.', 'Fuel is expensive, so more people use buses.'], explanation: l('Join the reason to its main clause: "…buses because fuel is expensive."', 'কারণটাকে main clause-এর সাথে জুড়ুন: "…buses because fuel is expensive."') }),
          correct('sb-1-r3', C1, { ...P1, tag: 'verb', prompt: l('Add the missing verb.', 'বাদ পড়া verb যোগ করুন।'), sentence: 'The streets very busy in the evening.', accepted: ['The streets are very busy in the evening.', 'The streets were very busy in the evening.'], explanation: l('Plural subject "The streets" → "are" (or "were").', 'Plural subject "The streets" → "are" (বা "were")।') }),
        ],
      },
      {
        kind: 'practice',
        mode: 'personal',
        title: l('Use it yourself', 'নিজে ব্যবহার করুন'),
        exercises: [
          write('sb-1-y1', C1, {
            ...P1,
            prompt: l('Write two complete sentences about your mornings. Start one of them with "Because" or "Although" — and finish it.', 'আপনার সকাল নিয়ে দুটো complete sentence লিখুন। একটা "Because" বা "Although" দিয়ে শুরু করুন — আর শেষ করুন।'),
            model: 'I usually wake up at six. Although I am often tired, I go for a short walk before breakfast.',
            task: 'The student writes two sentences about their mornings, one starting with "Because" or "Although". Check that every sentence is complete: a subject and a full main verb, and that a because/although clause is attached to a main clause (no fragments, no "Although…, but…"). Point out one fragment or missing verb if there is one.',
            target: l('Complete sentences, no fragments', 'Complete sentence, কোনো fragment নয়'),
            checklist: [l('Each sentence has a subject and a main verb', 'প্রতিটা sentence-এ subject আর main verb আছে'), l('The "Because/Although" clause has a main clause', '"Because/Although" clause-এর সাথে main clause আছে'), l('Capital letter and full stop', 'Capital letter আর full stop')],
            explanation: l('Although I am often tired, I go for a short walk.', 'Although I am often tired, I go for a short walk.'),
          }),
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখুন' },
        points: [
          { en: 'Sentence = subject + verb + a complete idea.', bn: 'Sentence = subject + verb + সম্পূর্ণ idea।' },
          { en: '"Because…", "Although…" alone are not sentences.', bn: 'শুধু "Because…", "Although…" দিয়ে sentence হয় না।' },
          { en: 'Commands are complete: "Wait here." ("you" is understood).', bn: 'Command complete: "Wait here." ("you" বোঝা যায়)।' },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 2
  {
    id: 'sb-2',
    format: 'v2',
    concept: C2,
    title: { en: 'The subject', bn: 'Subject' },
    why: {
      en: 'The subject decides the verb form (is/are, has/have). Many Writing errors start with a wrong or missing subject.',
      bn: 'Subject ঠিক করে verb কোন form-এ হবে (is/are, has/have)। Writing-এর অনেক ভুল শুরু হয় ভুল বা বাদ পড়া subject থেকে।',
    },
    minutes: 9,
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
          { en: 'Ask "Who?" or "What?" before the verb.', bn: 'Verb-এর আগে "কে?" বা "কী?" জিজ্ঞেস করুন।' },
          { en: 'English almost always needs a subject. Bangla can drop it ("যাচ্ছি"), English cannot ("I am going").', bn: 'English-এ প্রায় সবসময় subject লাগে। বাংলায় বাদ দেওয়া যায় ("যাচ্ছি"), English-এ যায় না ("I am going")।' },
          { en: 'Use "It" or "There" when there is no real subject: "It is raining." "There are many parks."', bn: 'আসল subject না থাকলে "It" বা "There" লাগে: "It is raining." "There are many parks."' },
          { en: 'In a long subject, find the head word. Phrases with of, in or who… only add detail: "The quality of the roads has improved."', bn: 'লম্বা subject-এ মূল শব্দটা (head word) খুঁজুন। of, in বা who… দিয়ে phrase শুধু detail যোগ করে: "The quality of the roads has improved."' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Find the subject', bn: 'Subject খুঁজে বের করুন' },
        items: [
          { en: 'Online shopping has become popular.', note: { en: 'Subject: "Online shopping".', bn: 'Subject: "Online shopping"।' } },
          { en: 'The number of cars in the city doubled.', note: { en: 'Subject: "The number of cars in the city" (the head word is "number").', bn: 'Subject: "The number of cars in the city" (মূল শব্দ "number")।' } },
          { en: 'There are three main reasons for this.', note: { en: '"There" fills the subject place; the real idea is "three main reasons".', bn: '"There" subject-এর জায়গা নেয়; আসল কথা "three main reasons"।' } },
          { en: 'The students in the library are preparing for IELTS.', note: { en: 'Subject: "The students". "in the library" only says where.', bn: 'Subject: "The students"। "in the library" শুধু জায়গা বলে।' } },
          { en: 'A list of recommended books is available online.', note: { en: 'Head word "list" is singular → "is", even though "books" is plural.', bn: 'মূল শব্দ "list" singular → "is", যদিও "books" plural।' } },
        ],
      },
      {
        kind: 'ielts',
        title: { en: 'Where you need this in IELTS', bn: 'IELTS-এ কোথায় লাগবে' },
        uses: [
          { skill: 'writing', example: 'The proportion of households with internet access rose.', note: { en: 'Task 1 subjects are often long. Find the head word ("proportion") to choose the verb.', bn: 'Task 1-এ subject প্রায়ই লম্বা হয়। Verb বাছতে মূল শব্দটা ("proportion") ধরুন।' } },
          { skill: 'speaking', example: 'It is really important to me.', note: { en: 'Don’t drop the subject: say "It is important", not "Is important".', bn: 'Subject বাদ দেবেন না: "It is important" বলুন, "Is important" না।' } },
          { skill: 'reading', example: 'Researchers at the university found that…', note: { en: 'Who did what? Matching Features questions often test exactly this.', bn: 'কে কী করেছে? Matching Features প্রশ্ন ঠিক এটাই যাচাই করে।' } },
        ],
      },
      {
        kind: 'hook',
        title: l('The nearest noun trap', 'কাছের noun-এর ফাঁদ'),
        situation: l('"The number of students in the evening classes ___ increased."', '"The number of students in the evening classes ___ increased."'),
        question: l('Which verb is correct?', 'কোন verb ঠিক?'),
        options: ['has', 'have'],
        answer: 'has',
        diagnose: {
          has: l('Right. The subject is "The number" (singular). "of students in the evening classes" only adds detail.', 'ঠিক। Subject হলো "The number" (singular)। "of students in the evening classes" শুধু detail দেয়।'),
          have: l('You matched "classes", the noun nearest the verb. Ask: what has increased? The number.', 'আপনি verb-এর সবচেয়ে কাছের noun "classes" দেখে মিলিয়েছেন। জিজ্ঞেস করুন: কী বেড়েছে? The number।'),
        },
      },
      {
        kind: 'mistakes',
        title: l('Mistake lab: subjects', 'Mistake lab: subject'),
        items: [
          { wrong: 'The quality of the roads have improved.', right: 'The quality of the roads has improved.', why: l('Head word "quality" is singular; "of the roads" is extra detail.', 'মূল শব্দ "quality" singular; "of the roads" বাড়তি detail।') },
          { wrong: 'Is very hot today.', right: 'It is very hot today.', why: l('English needs a subject here: weather and time use "It".', 'এখানে English-এ subject লাগবে: আবহাওয়া আর সময়ের জন্য "It"।') },
          { wrong: 'My brother he works in Dubai.', right: 'My brother works in Dubai.', why: l('One subject is enough: "My brother" already is the subject.', 'একটা subject-ই যথেষ্ট: "My brother"-ই subject।') },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-2-e1',
            type: 'choice',
            concept: C2,
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
            concept: C2,
            prompt: { en: 'Add the missing subject.', bn: 'বাদ পড়া subject বসান।' },
            sentence: '___ is very hot in Bangladesh in April.',
            accepted: ['It'],
            explanation: { en: 'Weather needs "It": "It is very hot…"', bn: 'আবহাওয়ার কথা বলতে "It" লাগে: "It is very hot…"' },
            tag: 'subject',
          },
          {
            id: 'sb-2-e3',
            type: 'correct',
            concept: C2,
            prompt: { en: 'Correct the sentence.', bn: 'Sentence-টা ঠিক করুন।' },
            sentence: 'Is important to learn English.',
            accepted: ['It is important to learn English.'],
            explanation: { en: 'English needs a subject: "It is important to learn English."', bn: 'English-এ subject লাগে: "It is important to learn English."' },
            tag: 'subject',
          },
          {
            id: 'sb-2-e4',
            type: 'gap',
            concept: C2,
            prompt: { en: 'Fill the gap with "There" or "It".', bn: 'Gap-এ "There" বা "It" বসান।' },
            sentence: '___ are many reasons why people move to cities.',
            accepted: ['There'],
            explanation: { en: '"There are + plural noun" says that something exists.', bn: 'কিছু আছে বোঝাতে "There are + plural noun"।' },
            tag: 'subject',
          },
          {
            id: 'sb-2-e5',
            type: 'choice',
            concept: C2,
            prompt: { en: 'Which head word decides the verb?', bn: 'কোন মূল শব্দ verb ঠিক করে?' },
            sentence: 'The number of students in these schools ___ increased.',
            options: ['number', 'students', 'schools'],
            answer: 'number',
            explanation: { en: '"The number … has increased" — the head word is "number" (singular).', bn: '"The number … has increased" — মূল শব্দ "number" (singular)।' },
            tag: 'agreement',
          },
          choice('sb-2-p1', C2, { ...P2, prompt: l('What is the subject?', 'Subject কোনটা?'), sentence: 'Researchers at the university found a new method.', options: ['Researchers at the university', 'the university', 'a new method'], answer: 'Researchers at the university', explanation: l('Who found it? Researchers (at the university).', 'কে খুঁজে পেয়েছে? Researchers (at the university)।'), why: { 'the university': l('"at the university" says where the researchers work.', '"at the university" বলে researcher-রা কোথায় কাজ করেন।'), 'a new method': l('That is what they found — the object.', 'ওটা তাঁরা কী খুঁজে পেয়েছেন — object।') } }),
        ],
      },
      {
        kind: 'practice',
        mode: 'recall',
        title: l('Now without options', 'এবার option ছাড়া'),
        exercises: [
          gap('sb-2-r1', C2, { ...P2, prompt: l('Write the head word of the subject.', 'Subject-এর মূল শব্দটা লিখুন।'), sentence: '"The quality of the roads in my area has improved." Head word: ___', accepted: ['quality'], explanation: l('What has improved? The quality.', 'কী উন্নত হয়েছে? The quality।') }),
          correct('sb-2-r2', C2, { ...P2, prompt: l('Add the missing subject.', 'বাদ পড়া subject যোগ করুন।'), sentence: 'Is raining heavily in Sylhet.', accepted: ['It is raining heavily in Sylhet.'], explanation: l('Weather needs "It": "It is raining…"', 'আবহাওয়ার কথায় "It" লাগে: "It is raining…"') }),
          spot('sb-2-r3', C2, { ...P2, tag: 'agreement', sentence: 'A list of recommended books are available online.', wrong: 'are', accepted: ['is'], explanation: l('Head word "list" is singular → is.', 'মূল শব্দ "list" singular → is।') }),
        ],
      },
      {
        kind: 'practice',
        mode: 'personal',
        title: l('Use it yourself', 'নিজে ব্যবহার করুন'),
        exercises: [
          write('sb-2-y1', C2, {
            ...P2,
            prompt: l('Write two sentences about your town: one with "There is" or "There are", and one with a long subject (for example "The number of …").', 'আপনার শহর নিয়ে দুটো sentence লিখুন: একটা "There is" বা "There are" দিয়ে, আর একটা লম্বা subject দিয়ে (যেমন "The number of …")।'),
            model: 'There are two big markets in my town. The number of cafés near the university has grown quickly.',
            task: 'The student writes two sentences about their town: one with There is/There are and one with a long subject. Check that each sentence has a subject (no dropped "It"), that There is/are agrees with the noun after it, and that the verb agrees with the head word of the long subject (e.g. "The number of cafés has…").',
            target: l('Clear subjects and the head word', 'পরিষ্কার subject আর মূল শব্দ'),
            checklist: [l('Every sentence has a subject', 'প্রতিটা sentence-এ subject আছে'), l('The verb matches the head word', 'Verb মূল শব্দের সাথে মেলে'), l('There is + singular / There are + plural', 'There is + singular / There are + plural')],
            explanation: l('The number of cafés … has grown.', 'The number of cafés … has grown.'),
          }),
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখুন' },
        points: [
          { en: 'Ask "Who/What?" before the verb to find the subject.', bn: 'Subject পেতে verb-এর আগে "কে/কী?" জিজ্ঞেস করুন।' },
          { en: 'Do not drop the subject of a statement: use "It" or "There" if needed. (Commands are the exception: "Wait here.")', bn: 'Statement-এর subject বাদ দেবেন না: দরকার হলে "It" বা "There"। (Command ব্যতিক্রম: "Wait here.")' },
          { en: 'Long subject? Find the head word: "The quality of the roads has…"', bn: 'লম্বা subject? মূল শব্দ খুঁজুন: "The quality of the roads has…"' },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 3
  {
    id: 'sb-3',
    format: 'v2',
    concept: C3,
    title: { en: 'The verb', bn: 'Verb' },
    why: {
      en: 'The verb carries tense and agreement — the two areas where most IELTS grammar marks are lost.',
      bn: 'Verb-এর মধ্যেই থাকে tense আর agreement — IELTS grammar-এ সবচেয়ে বেশি নম্বর কাটে এই দুই জায়গায়।',
    },
    minutes: 9,
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
          { en: 'After a modal (can, should, will, must) use the base verb: "She can speak", not "can speaks".', bn: 'Modal-এর (can, should, will, must) পরে মূল verb: "She can speak", "can speaks" না।' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Verbs in IELTS sentences', bn: 'IELTS sentence-এ verb' },
        items: [
          { en: 'Car ownership doubled between 2000 and 2010.', note: { en: 'Action verb in the past: "doubled".', bn: 'Past-এর action verb: "doubled"।' } },
          { en: 'This option seems more practical.', note: { en: 'State verb: "seems".', bn: 'State verb: "seems"।' } },
          { en: 'Governments should invest in public transport.', note: { en: 'Helping verb "should" + main verb "invest".', bn: 'Helping verb "should" + main verb "invest"।' } },
          { en: 'Prices are rising.', note: { en: '"are" + "rising" together make the full verb.', bn: '"are" + "rising" মিলে full verb।' } },
          { en: 'The test seems difficult.', note: { en: '"seems" links the subject to a description.', bn: '"seems" subject-কে বর্ণনার সাথে জোড়ে।' } },
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
        kind: 'hook',
        title: l('A Task 1 sentence', 'একটা Task 1 sentence'),
        situation: l('A student writes in Task 1: "House prices rising every year."', 'একজন student Task 1-এ লিখল: "House prices rising every year."'),
        question: l('What is wrong?', 'ভুলটা কী?'),
        options: ['The verb is not complete', 'The subject is missing', 'Nothing is wrong'],
        answer: 'The verb is not complete',
        diagnose: {
          'The verb is not complete': l('Right. "rising" needs a helping verb: "are rising" — or use "rise".', 'ঠিক। "rising"-এর আগে helping verb লাগে: "are rising" — অথবা "rise"।'),
          'The subject is missing': l('The subject is there: "House prices". The problem is the verb.', 'Subject আছে: "House prices"। সমস্যা verb-এ।'),
          'Nothing is wrong': l('An -ing word alone is not a full verb, so this is not a complete sentence.', 'শুধু -ing word full verb নয়, তাই এটা complete sentence না।'),
        },
      },
      {
        kind: 'mistakes',
        title: l('Mistake lab: verbs', 'Mistake lab: verb'),
        items: [
          { wrong: 'Prices rising.', right: 'Prices are rising.', why: l('-ing needs am / is / are / was / were.', '-ing-এর আগে am / is / are / was / were লাগে।') },
          { wrong: 'The graph show the sales.', right: 'The graph shows the sales.', why: l('Singular subject in the present → verb + -s.', 'Present-এ singular subject → verb + -s।') },
          { wrong: 'He can speaks English.', right: 'He can speak English.', why: l('After a modal, use the base verb.', 'Modal-এর পরে মূল verb।') },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-3-e1',
            type: 'choice',
            concept: C3,
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
            concept: C3,
            prompt: { en: 'Correct the sentence.', bn: 'Sentence-টা ঠিক করুন।' },
            sentence: 'House prices rising every year.',
            accepted: ['House prices are rising every year.', 'House prices rise every year.'],
            explanation: { en: '"rising" needs a helping verb: "are rising". Or use "rise".', bn: '"rising"-এর সাথে helping verb লাগে: "are rising"। অথবা "rise"।' },
            tag: 'verb',
          },
          {
            id: 'sb-3-e3',
            type: 'gap',
            concept: C3,
            prompt: { en: 'Complete with a "be" verb.', bn: 'একটা "be" verb বসান।' },
            sentence: 'My parents ___ both teachers.',
            accepted: ['are', 'were'],
            explanation: { en: 'Plural subject "My parents" → "are" (or "were" for the past).', bn: 'Plural subject "My parents" → "are" (past হলে "were")।' },
            tag: 'agreement',
          },
          {
            id: 'sb-3-e4',
            type: 'choice',
            concept: C3,
            prompt: { en: 'Choose the correct sentence.', bn: 'সঠিক sentence বেছে নিন।' },
            options: ['The graph show the sales.', 'The graph shows the sales.', 'The graph showing the sales.'],
            answer: 'The graph shows the sales.',
            explanation: { en: 'Singular subject "The graph" → "shows".', bn: 'Singular subject "The graph" → "shows"।' },
            tag: 'agreement',
          },
          {
            id: 'sb-3-e5',
            type: 'write',
            concept: C3,
            prompt: { en: 'Write one sentence about a change in your area. Use a trend verb (rise, fall, increase, decrease).', bn: 'আপনার এলাকার একটা পরিবর্তন নিয়ে এক sentence লিখুন। একটা trend verb ব্যবহার করুন (rise, fall, increase, decrease)।' },
            model: 'The number of shopping malls in my area has increased.',
            checklist: [
              { en: 'Has a clear subject', bn: 'Subject পরিষ্কার' },
              { en: 'Has a full verb (not only -ing)', bn: 'Full verb আছে (শুধু -ing না)' },
              { en: 'Verb matches the subject', bn: 'Verb subject-এর সাথে মেলে' },
            ],
            explanation: { en: 'This is exactly the kind of sentence you write in Task 1.', bn: 'Task 1-এ ঠিক এ ধরনের sentence লিখতে হয়।' },
            tag: 'verb',
          },
          choice('sb-3-p1', C3, { ...P3, prompt: l('Which sentence has a complete, correct verb?', 'কোন sentence-এ verb সম্পূর্ণ আর সঠিক?'), options: ['The economy growing fast.', 'The economy is growing fast.', 'The economy grow fast.'], answer: 'The economy is growing fast.', explanation: l('"is growing" = helping verb + -ing, matching the singular subject.', '"is growing" = helping verb + -ing, singular subject-এর সাথে মেলে।'), why: { 'The economy growing fast.': l('-ing alone is not a full verb.', 'শুধু -ing full verb না।'), 'The economy grow fast.': l('Singular subject → "grows" (or "is growing").', 'Singular subject → "grows" (বা "is growing")।') } }),
        ],
      },
      {
        kind: 'practice',
        mode: 'recall',
        title: l('Now without options', 'এবার option ছাড়া'),
        exercises: [
          gap('sb-3-r1', C3, { ...P3, prompt: l('Write the helping verb.', 'Helping verb লিখুন।'), sentence: 'The number of tourists ___ increasing.', accepted: ['is'], explanation: l('Head word "number" is singular → is increasing.', 'মূল শব্দ "number" singular → is increasing।') }),
          spot('sb-3-r2', C3, { ...P3, sentence: 'He can speaks three languages.', wrong: 'speaks', accepted: ['speak'], explanation: l('can + base verb: speak.', 'can + মূল verb: speak।') }),
          correct('sb-3-r3', C3, { ...P3, prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'The cost of living rising quickly.', accepted: ['The cost of living is rising quickly.', 'The cost of living rises quickly.', 'The cost of living was rising quickly.'], explanation: l('Give "rising" its helping verb: "is rising" (or use "rises").', '"rising"-কে helping verb দিন: "is rising" (বা "rises")।') }),
        ],
      },
      {
        kind: 'practice',
        mode: 'personal',
        title: l('Use it yourself', 'নিজে ব্যবহার করুন'),
        exercises: [
          write('sb-3-y1', C3, {
            ...P3,
            prompt: l('Write two sentences about how your area is changing: one with "is/are + -ing" and one with a modal (can, should, will).', 'আপনার এলাকা কীভাবে বদলাচ্ছে তা নিয়ে দুটো sentence লিখুন: একটা "is/are + -ing" দিয়ে, আর একটা modal (can, should, will) দিয়ে।'),
            model: 'More people are moving to my town. The council should build more schools.',
            task: 'The student writes two sentences about changes in their area: one with is/are + -ing and one with a modal. Check that every sentence has a full main verb (no -ing on its own), that be agrees with the subject, and that the verb after a modal is the base form (no -s, no "to").',
            target: l('Full verbs: be + -ing and modal + base verb', 'Full verb: be + -ing আর modal + মূল verb'),
            checklist: [l('No -ing word on its own', 'কোনো -ing word একা নেই'), l('is/are matches the subject', 'is/are subject-এর সাথে মেলে'), l('Modal + base verb', 'Modal + মূল verb')],
            explanation: l('More people are moving … The council should build …', 'More people are moving … The council should build …'),
          }),
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখুন' },
        points: [
          { en: 'Every sentence needs a full main verb.', bn: 'প্রতিটা sentence-এ একটা full main verb লাগে।' },
          { en: '-ing needs am/is/are/was/were before it.', bn: '-ing-এর আগে am/is/are/was/were লাগে।' },
          { en: 'Modal + base verb: can speak, should build.', bn: 'Modal + মূল verb: can speak, should build।' },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 4
  {
    id: 'sb-4',
    format: 'v2',
    concept: C4,
    title: { en: 'The object', bn: 'Object' },
    why: {
      en: 'Objects complete many verbs ("affect people", "provide jobs"). Missing or doubled objects make Writing sound unnatural.',
      bn: 'অনেক verb object ছাড়া অসম্পূর্ণ ("affect people", "provide jobs")। Object বাদ পড়লে বা দুবার বসলে Writing অস্বাভাবিক শোনায়।',
    },
    minutes: 9,
    difficulty: 'easy',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'Who or what receives the action', bn: 'কাজটা কার উপর হচ্ছে' },
        body: {
          en: 'The object receives the action of the verb. It usually comes straight after the verb: "Technology changes our lives." Ask "What?" or "Whom?" after the verb.',
          bn: 'Object হলো যার উপর verb-এর কাজটা হয়। সাধারণত verb-এর ঠিক পরে বসে: "Technology changes our lives." Verb-এর পরে "কী?" বা "কাকে?" জিজ্ঞেস করুন।',
        },
        points: [
          { en: 'Some verbs need an object: affect, provide, reduce, improve, discuss.', bn: 'কিছু verb-এর object লাগবেই: affect, provide, reduce, improve, discuss।' },
          { en: 'Some verbs never take one: arrive, happen, rise, fall.', bn: 'কিছু verb কখনো object নেয় না: arrive, happen, rise, fall।' },
          { en: 'Object pronouns: me, him, her, us, them, it.', bn: 'Object pronoun: me, him, her, us, them, it।' },
          { en: 'After be, seem or become, a word that describes the subject is a complement, not an object: "The buses are crowded."', bn: 'be, seem বা become-এর পরে subject-এর বর্ণনা দেওয়া word হলো complement, object না: "The buses are crowded."' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Subject + verb + object', bn: 'Subject + verb + object' },
        items: [
          { en: 'The government reduced taxes.', note: { en: 'Reduced what? "taxes".', bn: 'কী কমিয়েছে? "taxes"।' } },
          { en: 'Social media affects young people.', note: { en: '"affect" + object, no preposition: not "affects on young people".', bn: '"affect" + object, মাঝে preposition নেই: "affects on young people" না।' } },
          { en: 'The price rose.', note: { en: '"rise" has no object: not "The company rose the price" → "raised the price".', bn: '"rise"-এর object নেই: "The company rose the price" না → "raised the price"।' } },
          { en: 'Mina gave her friend a notebook.', note: { en: 'Two objects: gave whom? "her friend"; gave what? "a notebook".', bn: 'দুটো object: কাকে দিল? "her friend"; কী দিল? "a notebook"।' } },
          { en: 'The researcher analysed the results.', note: { en: 'Swap subject and object and the meaning changes: "The results analysed the researcher" makes no sense.', bn: 'Subject আর object বদলালে অর্থ বদলে যায়: "The results analysed the researcher" অর্থহীন।' } },
        ],
      },
      {
        kind: 'ielts',
        title: { en: 'Where you need this in IELTS', bn: 'IELTS-এ কোথায় লাগবে' },
        uses: [
          { skill: 'writing', example: 'Working from home saves time and money.', note: { en: 'Task 2 arguments often follow subject + verb + object.', bn: 'Task 2-এর argument প্রায়ই subject + verb + object ধরে চলে।' } },
          { skill: 'writing', example: 'The company raised prices, and sales fell.', note: { en: 'Task 1: "raise" takes an object, "rise" does not — a classic error.', bn: 'Task 1: "raise"-এর object লাগে, "rise"-এর না — খুব common ভুল।' } },
          { skill: 'speaking', example: 'I really enjoy it.', note: { en: '"enjoy" needs an object: say "I enjoy it", not just "I enjoy".', bn: '"enjoy"-এর object লাগে: শুধু "I enjoy" না, "I enjoy it" বলুন।' } },
        ],
      },
      {
        kind: 'hook',
        title: l('Who did what?', 'কে কী করল?'),
        situation: l('Compare: "The researcher analysed the results." and "The results analysed the researcher."', 'তুলনা করুন: "The researcher analysed the results." আর "The results analysed the researcher."'),
        question: l('Why is the second sentence strange?', 'দ্বিতীয় sentence-টা অদ্ভুত কেন?'),
        options: ['The subject and object have swapped', 'The verb is in the wrong tense', 'It needs an article'],
        answer: 'The subject and object have swapped',
        diagnose: {
          'The subject and object have swapped': l('Right. In English, position shows the roles: the doer before the verb, the thing affected after it.', 'ঠিক। English-এ অবস্থান দেখায় কে কী: কাজ যে করে সে verb-এর আগে, যার উপর কাজ হয় সে পরে।'),
          'The verb is in the wrong tense': l('Both use "analysed" — the tense is the same. The roles changed.', 'দুটোতেই "analysed" — tense একই। বদলেছে ভূমিকা।'),
          'It needs an article': l('Both already have "the". The words are the same; their places changed.', 'দুটোতেই "the" আছে। শব্দ একই; জায়গা বদলেছে।'),
        },
      },
      {
        kind: 'mistakes',
        title: l('Mistake lab: objects', 'Mistake lab: object'),
        items: [
          { wrong: 'Pollution affects on our health.', right: 'Pollution affects our health.', why: l('"affect" takes its object directly.', '"affect"-এর পরে সরাসরি object।') },
          { wrong: 'We discussed about the plan.', right: 'We discussed the plan.', why: l('"discuss" takes its object directly (but: "a discussion about").', '"discuss"-এর পরে সরাসরি object (কিন্তু: "a discussion about")।') },
          { wrong: 'The company rose the price.', right: 'The company raised the price.', why: l('"raise" + object; "rise" has no object.', '"raise" + object; "rise"-এর object নেই।') },
          { wrong: 'Yes, I really enjoy.', right: 'Yes, I really enjoy it.', why: l('"enjoy" needs an object: it, cooking, my job.', '"enjoy"-এর object লাগে: it, cooking, my job।') },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-4-e1',
            type: 'choice',
            concept: C4,
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
            concept: C4,
            prompt: { en: 'Correct the sentence.', bn: 'Sentence-টা ঠিক করুন।' },
            sentence: 'Pollution affects on our health.',
            accepted: ['Pollution affects our health.'],
            explanation: { en: '"affect" takes the object directly: "affects our health".', bn: '"affect"-এর পরে সরাসরি object: "affects our health"।' },
            tag: 'preposition',
          },
          {
            id: 'sb-4-e3',
            type: 'choice',
            concept: C4,
            prompt: { en: 'Choose the correct verb.', bn: 'সঠিক verb বেছে নিন।' },
            sentence: 'The shop ___ its prices last month.',
            options: ['rose', 'raised'],
            answer: 'raised',
            explanation: { en: '"raise" + object (its prices). "rise" has no object.', bn: '"raise" + object (its prices)। "rise"-এর object হয় না।' },
            tag: 'object',
          },
          {
            id: 'sb-4-e4',
            type: 'choice',
            concept: C4,
            prompt: { en: 'Speaking Part 1: "Do you like cooking?" Which answer is correct?', bn: 'Speaking Part 1: "Do you like cooking?" কোন answer সঠিক?' },
            options: ['Yes, I really enjoy.', 'Yes, I really enjoy it.', 'Yes, I really enjoy to it.'],
            answer: 'Yes, I really enjoy it.',
            explanation: { en: '"enjoy" always needs an object: "enjoy it", "enjoy cooking".', bn: '"enjoy"-এর পরে সবসময় object লাগে: "enjoy it", "enjoy cooking"।' },
            tag: 'object',
          },
          {
            id: 'sb-4-e5',
            type: 'order',
            concept: C4,
            prompt: { en: 'Put the words in order.', bn: 'শব্দগুলো সাজান।' },
            answer: 'Technology has changed our lives.',
            explanation: { en: 'Subject (Technology) + verb (has changed) + object (our lives).', bn: 'Subject (Technology) + verb (has changed) + object (our lives)।' },
            tag: 'sentence-structure',
          },
        ],
      },
      {
        kind: 'practice',
        mode: 'recall',
        title: l('Now without options', 'এবার option ছাড়া'),
        exercises: [
          correct('sb-4-r1', C4, { ...P4, tag: 'preposition', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'We discussed about the problem.', accepted: ['We discussed the problem.'], explanation: l('"discuss" + object, no "about".', '"discuss" + object, "about" না।') }),
          gap('sb-4-r2', C4, { ...P4, prompt: l('Write the past form of "raise" or "rise".', '"raise" বা "rise"-এর past form লিখুন।'), sentence: 'The council ___ bus fares last year.', accepted: ['raised'], explanation: l('There is an object (bus fares) → raised.', 'Object আছে (bus fares) → raised।'), why: { rose: l('"rose" has no object; here the council did something to the fares → raised.', '"rose"-এর object নেই; এখানে council ভাড়ার উপর কিছু করেছে → raised।') } }),
          correct('sb-4-r3', C4, { ...P4, prompt: l('Add the missing object.', 'বাদ পড়া object যোগ করুন।'), sentence: 'I really enjoyed.', accepted: ['I really enjoyed it.'], explanation: l('"enjoy" needs an object: "I really enjoyed it."', '"enjoy"-এর object লাগে: "I really enjoyed it."') }),
        ],
      },
      {
        kind: 'practice',
        mode: 'personal',
        title: l('Use it yourself', 'নিজে ব্যবহার করুন'),
        exercises: [
          write('sb-4-y1', C4, {
            ...P4,
            prompt: l('Write two sentences about a change at your school, college or work. Use one of these verbs with an object: improve, reduce, provide, affect.', 'আপনার school, college বা কর্মস্থলের একটা পরিবর্তন নিয়ে দুটো sentence লিখুন। এই verb-গুলোর একটা object সহ ব্যবহার করুন: improve, reduce, provide, affect।'),
            model: 'Our college provides free Wi-Fi now. It has improved our online classes.',
            task: 'The student writes two sentences with improve, reduce, provide or affect. Check that these verbs take a direct object (no "affect on", "discuss about"), that raise/rise and enjoy are used correctly if they appear, and that the order is subject + verb + object.',
            target: l('Verbs with a direct object', 'সরাসরি object নেওয়া verb'),
            checklist: [l('Subject + verb + object', 'Subject + verb + object'), l('No preposition after affect / discuss', 'affect / discuss-এর পরে preposition নেই'), l('The object answers "what?" or "whom?"', 'Object "কী?" বা "কাকে?"-র উত্তর দেয়')],
            explanation: l('Our college provides free Wi-Fi now.', 'Our college provides free Wi-Fi now.'),
          }),
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখুন' },
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
    format: 'v2',
    concept: C5,
    title: { en: 'Basic sentence structure', bn: 'Basic sentence structure' },
    why: {
      en: 'English uses word order to show who did what. Bangla often puts the verb at the end ("আমি ভাত খাই"); English normally puts it straight after the subject ("I eat rice").',
      bn: 'English-এ word order দেখায় কে কী করল। বাংলায় verb প্রায়ই শেষে বসে ("আমি ভাত খাই"); English-এ সাধারণত subject-এর ঠিক পরে ("I eat rice")।',
    },
    minutes: 9,
    difficulty: 'easy',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'Subject → Verb → Object → Place → Time', bn: 'Subject → Verb → Object → Place → Time' },
        body: {
          en: 'A common neutral English order is Subject + Verb + Object/Complement, then extra information such as place and time. It is a useful starting pattern, not a rule for every sentence: a time phrase can also move to the front.',
          bn: 'English-এর একটা সাধারণ order হলো Subject + Verb + Object/Complement, তারপর জায়গা আর সময়ের মতো বাড়তি তথ্য। এটা শুরু করার একটা কাজের pattern, সব sentence-এর বাঁধা নিয়ম না: time phrase সামনেও আসতে পারে।',
        },
        points: [
          { en: 'S + V + O: "Students use smartphones."', bn: 'S + V + O: "Students use smartphones."' },
          { en: 'S + be + complement: "The city is crowded."', bn: 'S + be + complement: "The city is crowded."' },
          { en: 'Place usually before time: "…in Dhaka in 2020."', bn: 'সাধারণত place আগে, time পরে: "…in Dhaka in 2020."' },
          { en: 'Build the English clause first; do not keep the Bangla word order.', bn: 'আগে English clause তৈরি করুন; বাংলার word order রাখবেন না।' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Building a sentence', bn: 'Sentence তৈরি' },
        items: [
          { en: 'Farmers grow rice in the north every year.', note: { en: 'S (Farmers) + V (grow) + O (rice) + place + time.', bn: 'S (Farmers) + V (grow) + O (rice) + place + time।' } },
          { en: 'In 2010, the factory produced 5,000 cars.', note: { en: 'Time moved to the front, followed by a comma.', bn: 'Time সামনে আনা হয়েছে, পরে comma।' } },
          { en: 'The results were surprising.', note: { en: 'S + be + complement (an adjective).', bn: 'S + be + complement (একটা adjective)।' } },
          { en: 'Yesterday, the teacher explained the rule.', note: { en: 'The time phrase moved to the front; the clause is still S + V + O.', bn: 'Time phrase সামনে এসেছে; clause এখনো S + V + O।' } },
          { en: 'She gave her brother a map.', note: { en: 'Both "her brother" and "a map" come after the verb.', bn: '"her brother" আর "a map" দুটোই verb-এর পরে।' } },
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
        kind: 'hook',
        title: l('Word by word', 'শব্দে শব্দে'),
        situation: l('A student translates "আমি প্রতিদিন English practice করি" word by word: "I every day English practise."', 'একজন student "আমি প্রতিদিন English practice করি" শব্দে শব্দে অনুবাদ করল: "I every day English practise."'),
        question: l('What is the natural English order?', 'স্বাভাবিক English order কোনটা?'),
        options: ['I practise English every day.', 'I every day English practise.', 'Every day English I practise.'],
        answer: 'I practise English every day.',
        diagnose: {
          'I practise English every day.': l('Right: Subject + Verb + Object + time.', 'ঠিক: Subject + Verb + Object + time।'),
          'I every day English practise.': l('This keeps the Bangla order: the verb has gone to the end.', 'এখানে বাংলার order রয়ে গেছে: verb শেষে চলে গেছে।'),
          'Every day English I practise.': l('A time phrase can come first, but then: "Every day, I practise English."', 'Time phrase আগে আসতে পারে, কিন্তু তখন: "Every day, I practise English."'),
        },
      },
      {
        kind: 'mistakes',
        title: l('Mistake lab: word order', 'Mistake lab: word order'),
        items: [
          { wrong: 'My father in a bank works.', right: 'My father works in a bank.', why: l('The verb comes after the subject, before the place.', 'Verb বসে subject-এর পরে, জায়গার আগে।') },
          { wrong: 'Explained the teacher the rule.', right: 'The teacher explained the rule.', why: l('In a statement the subject comes before the verb.', 'Statement-এ subject বসে verb-এর আগে।') },
          { wrong: 'She speaks very well English.', right: 'She speaks English very well.', why: l('Keep the verb and its object together; "very well" comes after.', 'Verb আর তার object একসাথে রাখুন; "very well" পরে।') },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-5-e1',
            type: 'order',
            concept: C5,
            prompt: { en: 'Put the words in order.', bn: 'শব্দগুলো সাজান।' },
            answer: 'My brother works in a bank.',
            explanation: { en: 'S (My brother) + V (works) + place (in a bank).', bn: 'S (My brother) + V (works) + place (in a bank)।' },
            tag: 'sentence-structure',
          },
          {
            id: 'sb-5-e2',
            type: 'order',
            concept: C5,
            prompt: { en: 'Put the words in order.', bn: 'শব্দগুলো সাজান।' },
            answer: 'Many people visit Cox’s Bazar in winter.',
            explanation: { en: 'S + V + O (Cox’s Bazar) + time (in winter).', bn: 'S + V + O (Cox’s Bazar) + time (in winter)।' },
            tag: 'sentence-structure',
          },
          {
            id: 'sb-5-e3',
            type: 'choice',
            concept: C5,
            prompt: { en: 'Choose the natural English order.', bn: 'স্বাভাবিক English order কোনটা?' },
            options: ['I every day English practise.', 'I practise English every day.', 'Every day I English practise.'],
            answer: 'I practise English every day.',
            explanation: { en: 'S (I) + V (practise) + O (English) + time (every day).', bn: 'S (I) + V (practise) + O (English) + time (every day)।' },
            tag: 'sentence-structure',
          },
          {
            id: 'sb-5-e4',
            type: 'correct',
            concept: C5,
            prompt: { en: 'Correct the word order.', bn: 'Word order ঠিক করুন।' },
            sentence: 'In 2020 the company 200 workers employed.',
            accepted: ['In 2020, the company employed 200 workers.', 'In 2020 the company employed 200 workers.', 'The company employed 200 workers in 2020.'],
            explanation: { en: 'The verb goes before the object: "the company employed 200 workers".', bn: 'Verb object-এর আগে: "the company employed 200 workers"।' },
            tag: 'sentence-structure',
          },
        ],
      },
      {
        kind: 'practice',
        mode: 'recall',
        title: l('Now without options', 'এবার option ছাড়া'),
        exercises: [
          correct('sb-5-r1', C5, { ...P5, prompt: l('Correct the word order.', 'Word order ঠিক করুন।'), sentence: 'The volunteers the beach clean every weekend.', accepted: ['The volunteers clean the beach every weekend.', 'Every weekend, the volunteers clean the beach.', 'Every weekend the volunteers clean the beach.'], explanation: l('S (The volunteers) + V (clean) + O (the beach) + time.', 'S (The volunteers) + V (clean) + O (the beach) + time।') }),
          correct('sb-5-r2', C5, { ...P5, prompt: l('Correct the word order.', 'Word order ঠিক করুন।'), sentence: 'She speaks very well English.', accepted: ['She speaks English very well.'], explanation: l('Verb + object together, then "very well".', 'Verb + object একসাথে, তারপর "very well"।') }),
          correct('sb-5-r3', C5, { ...P5, prompt: l('Correct the word order.', 'Word order ঠিক করুন।'), sentence: 'We in Chattogram in 2019 lived.', accepted: ['We lived in Chattogram in 2019.', 'In 2019, we lived in Chattogram.', 'In 2019 we lived in Chattogram.'], explanation: l('S + V + place + time: "We lived in Chattogram in 2019."', 'S + V + place + time: "We lived in Chattogram in 2019."') }),
        ],
      },
      {
        kind: 'practice',
        mode: 'personal',
        title: l('Use it yourself', 'নিজে ব্যবহার করুন'),
        exercises: [
          write('sb-5-y1', C5, {
            ...P5,
            prompt: l('Write two sentences about where and when you study or work. Use Subject + Verb + Object/place + time.', 'আপনি কোথায় আর কখন পড়েন বা কাজ করেন তা নিয়ে দুটো sentence লিখুন। Subject + Verb + Object/place + time ব্যবহার করুন।'),
            model: 'I study English at a coaching centre in the evening. On Fridays, I review my notes at home.',
            task: 'The student writes two sentences about where and when they study or work. Check English word order: subject before the verb, the verb before its object, place usually before time, and a comma after a fronted time phrase if they use one. Point out any Bangla-style order (verb at the end).',
            target: l('Subject + Verb + Object + place + time', 'Subject + Verb + Object + place + time'),
            checklist: [l('The verb comes right after the subject', 'Verb subject-এর ঠিক পরে'), l('Object straight after the verb', 'Object verb-এর ঠিক পরে'), l('Place, then time', 'আগে place, পরে time')],
            explanation: l('I study English at a coaching centre in the evening.', 'I study English at a coaching centre in the evening.'),
          }),
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখুন' },
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
    format: 'v2',
    concept: C6,
    title: { en: 'Simple sentences', bn: 'Simple sentence' },
    why: {
      en: 'Clear simple sentences are the safest way to make your main point in Writing and Speaking.',
      bn: 'Writing আর Speaking-এ main point পরিষ্কার করে বলার সবচেয়ে নিরাপদ উপায় হলো clear simple sentence।',
    },
    minutes: 8,
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
          { en: 'Use them for your main idea, then add detail.', bn: 'Main idea বলতে ব্যবহার করুন, তারপর detail যোগ করুন।' },
          { en: 'A phrase ("after the class") has no subject–verb pair. A clause ("the class ended") has one.', bn: 'Phrase-এ ("after the class") subject–verb জোড়া নেই। Clause-এ ("the class ended") আছে।' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Simple but strong', bn: 'Simple কিন্তু জোরালো' },
        items: [
          { en: 'Education is the key to development.', note: { en: 'Clear topic sentence for a Task 2 paragraph.', bn: 'Task 2 paragraph-এর জন্য পরিষ্কার topic sentence।' } },
          { en: 'Overall, spending on housing rose over the period.', note: { en: 'A one-sentence Task 1 overview.', bn: 'এক sentence-এর Task 1 overview।' } },
          { en: 'During the exam', note: { en: 'A phrase: no subject and verb. Not a sentence.', bn: 'একটা phrase: subject আর verb নেই। Sentence না।' } },
          { en: 'The exam ended.', note: { en: 'One clause that stands alone: a simple sentence.', bn: 'একা দাঁড়াতে পারা একটা clause: simple sentence।' } },
          { en: 'When the exam ended', note: { en: 'It has a subject and a verb, but "When" makes it depend on a main clause.', bn: 'Subject আর verb আছে, কিন্তু "When" এটাকে main clause-এর উপর নির্ভরশীল করে।' } },
        ],
      },
      {
        kind: 'ielts',
        title: { en: 'Where you need this in IELTS', bn: 'IELTS-এ কোথায় লাগবে' },
        uses: [
          { skill: 'writing', example: 'Overall, the use of mobile phones increased dramatically.', note: { en: 'Task 1 overview: one clear simple sentence is often enough.', bn: 'Task 1 overview: প্রায়ই একটা clear simple sentence-ই যথেষ্ট।' } },
          { skill: 'speaking', example: 'My favourite season is winter.', note: { en: 'Part 1: answer directly first, then extend.', bn: 'Part 1: আগে সরাসরি answer, তারপর বাড়ান।' } },
        ],
      },
      {
        kind: 'hook',
        title: l('Which one stands alone?', 'কোনটা একা দাঁড়ায়?'),
        situation: l('Three groups of words: "after the class", "the class ended", "after the class ended".', 'তিনটা শব্দগুচ্ছ: "after the class", "the class ended", "after the class ended"।'),
        question: l('Which one is a complete simple sentence?', 'কোনটা complete simple sentence?'),
        options: ['The class ended.', 'After the class.', 'After the class ended.'],
        answer: 'The class ended.',
        diagnose: {
          'The class ended.': l('Right: one subject ("The class") and one verb ("ended"), standing alone.', 'ঠিক: একটা subject ("The class") আর একটা verb ("ended"), একা দাঁড়িয়ে।'),
          'After the class.': l('A phrase: there is no verb.', 'এটা phrase: কোনো verb নেই।'),
          'After the class ended.': l('It has a subject and verb, but "After" makes the reader wait: what happened after the class ended?', 'Subject আর verb আছে, কিন্তু "After" পাঠককে অপেক্ষা করায়: class শেষ হওয়ার পরে কী হলো?'),
        },
      },
      {
        kind: 'mistakes',
        title: l('Mistake lab: phrases that look like sentences', 'Mistake lab: sentence-এর মতো দেখতে phrase'),
        items: [
          { wrong: 'The students waiting outside.', right: 'The students are waiting outside.', why: l('"waiting" alone is not a full verb; add "are".', 'শুধু "waiting" full verb না; "are" যোগ করুন।') },
          { wrong: 'Online shopping, which is very popular.', right: 'Online shopping is very popular.', why: l('The which-clause only describes; the sentence needs its own main verb.', 'which-clause শুধু বর্ণনা দেয়; sentence-এর নিজের main verb লাগে।') },
          { wrong: 'In most developed countries.', right: 'In most developed countries, the population is ageing.', why: l('A place phrase needs a clause to attach to.', 'জায়গার phrase-কে একটা clause-এর সাথে জুড়তে হয়।') },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-6-e1',
            type: 'choice',
            concept: C6,
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
            concept: C6,
            prompt: { en: 'Build a Task 1 overview sentence.', bn: 'একটা Task 1 overview sentence বানান।' },
            answer: 'Overall, car sales increased over the period.',
            explanation: { en: '"Overall," + S + V + time.', bn: '"Overall," + S + V + time।' },
            tag: 'sentence-structure',
          },
          {
            id: 'sb-6-e3',
            type: 'write',
            concept: C6,
            prompt: { en: 'IELTS Speaking Part 1: "Do you like reading?" Answer with one clear simple sentence.', bn: 'IELTS Speaking Part 1: "Do you like reading?" একটা clear simple sentence-এ answer দিন।' },
            model: 'Yes, I really enjoy reading novels in my free time.',
            checklist: [
              { en: 'Answers the question directly', bn: 'সরাসরি প্রশ্নের answer' },
              { en: 'One subject and one main verb', bn: 'একটা subject আর একটা main verb' },
            ],
            explanation: { en: 'Start with a direct answer. You will learn to extend it in the next lessons.', bn: 'আগে সরাসরি answer। কীভাবে বাড়াবেন সেটা পরের lesson-এ শিখবেন।' },
            tag: 'sentence-structure',
          },
          choice('sb-6-p1', C6, { ...P6, prompt: l('Is this a phrase or a complete sentence?', 'এটা phrase নাকি complete sentence?'), sentence: 'Near the main entrance.', options: ['a phrase', 'a complete sentence'], answer: 'a phrase', explanation: l('No subject, no verb — it only says where.', 'Subject নেই, verb নেই — শুধু জায়গা বলে।'), why: { 'a complete sentence': l('A capital and a full stop are not enough; there is no verb.', 'Capital আর full stop যথেষ্ট না; কোনো verb নেই।') } }),
          choice('sb-6-p2', C6, { ...P6, prompt: l('Which is a simple sentence?', 'কোনটা simple sentence?'), options: ['My favourite season is winter.', 'I like winter because it is cool.', 'I like winter, but my sister prefers summer.'], answer: 'My favourite season is winter.', explanation: l('One clause only: "My favourite season is winter."', 'একটাই clause: "My favourite season is winter."'), why: { 'I like winter because it is cool.': l('Two clauses joined with "because" — complex.', '"because" দিয়ে দুটো clause জোড়া — complex।'), 'I like winter, but my sister prefers summer.': l('Two clauses joined with "but" — compound.', '"but" দিয়ে দুটো clause জোড়া — compound।') } }),
        ],
      },
      {
        kind: 'practice',
        mode: 'recall',
        title: l('Now without options', 'এবার option ছাড়া'),
        exercises: [
          correct('sb-6-r1', C6, { ...P6, tag: 'verb', prompt: l('Make it a complete simple sentence.', 'Complete simple sentence বানান।'), sentence: 'The students waiting outside.', accepted: ['The students are waiting outside.', 'The students were waiting outside.'], explanation: l('Add "are" (or "were") before "waiting".', '"waiting"-এর আগে "are" (বা "were") দিন।') }),
          gap('sb-6-r2', C6, { ...P6, tag: 'verb', prompt: l('Add one past-tense verb that describes a change.', 'পরিবর্তন বোঝায় এমন একটা past-tense verb বসান।'), sentence: 'Overall, spending on housing ___ over the period.', accepted: ['rose', 'increased', 'grew', 'fell', 'decreased', 'declined', 'dropped'], explanation: l('Any trend verb in the past completes the overview: "rose", "fell", "increased"…', 'Past-এর যেকোনো trend verb overview সম্পূর্ণ করে: "rose", "fell", "increased"…') }),
          correct('sb-6-r3', C6, { ...P6, prompt: l('Make it a complete simple sentence.', 'Complete simple sentence বানান।'), sentence: 'Online shopping, which is very popular.', accepted: ['Online shopping is very popular.'], explanation: l('Give "Online shopping" its own main verb: "is very popular".', '"Online shopping"-কে নিজের main verb দিন: "is very popular"।') }),
        ],
      },
      {
        kind: 'practice',
        mode: 'personal',
        title: l('Use it yourself', 'নিজে ব্যবহার করুন'),
        exercises: [
          write('sb-6-y1', C6, {
            ...P6,
            prompt: l('Speaking Part 1: "What do you do in your free time?" Answer with two simple sentences: a direct answer, then one detail.', 'Speaking Part 1: "What do you do in your free time?" দুটো simple sentence-এ উত্তর দিন: আগে সরাসরি উত্তর, তারপর একটা detail।'),
            model: 'I usually play football with my cousins. We play in the field behind our school.',
            task: 'The student answers "What do you do in your free time?" with two simple sentences. Check that each sentence is one complete clause with a subject and a full verb, that there are no fragments (a phrase or an -ing word on its own), and that the first sentence answers the question directly.',
            target: l('Clear simple sentences', 'পরিষ্কার simple sentence'),
            checklist: [l('First sentence answers the question', 'প্রথম sentence প্রশ্নের উত্তর দেয়'), l('Each sentence: one subject + one full verb', 'প্রতিটা sentence: একটা subject + একটা full verb'), l('No phrase left on its own', 'কোনো phrase একা নেই')],
            explanation: l('I usually play football with my cousins.', 'I usually play football with my cousins.'),
          }),
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখুন' },
        points: [
          { en: 'One clause = simple sentence. Use it for main points and overviews.', bn: 'একটা clause = simple sentence। Main point আর overview-তে ব্যবহার করুন।' },
          { en: 'Phrase = no subject–verb pair. Clause = subject + verb.', bn: 'Phrase = subject–verb জোড়া নেই। Clause = subject + verb।' },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 7
  {
    id: 'sb-7',
    format: 'v2',
    concept: C7,
    title: { en: 'Compound sentences', bn: 'Compound sentence' },
    why: {
      en: 'Joining two ideas with "and", "but", "so" and "or" makes your Writing and Speaking flow — a first step towards Coherence & Cohesion.',
      bn: '"and", "but", "so", "or" দিয়ে দুইটা idea জুড়লে Writing আর Speaking সাবলীল হয় — Coherence & Cohesion-এর প্রথম ধাপ।',
    },
    minutes: 10,
    difficulty: 'medium',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'Two complete ideas, one sentence', bn: 'দুইটা সম্পূর্ণ idea, এক sentence' },
        body: {
          en: 'A compound sentence joins two complete sentences with a joining word (coordinator). Put a comma before the joining word when both parts are long.',
          bn: 'Compound sentence দুইটা complete sentence-কে একটা joining word (coordinator) দিয়ে জোড়ে। দুই অংশ লম্বা হলে joining word-এর আগে comma দিন।',
        },
        points: [
          { en: 'and = add: "Prices rose, and demand fell."', bn: 'and = যোগ: "Prices rose, and demand fell."' },
          { en: 'but = contrast: "It is cheap, but it is slow."', bn: 'but = বিপরীত: "It is cheap, but it is slow."' },
          { en: 'so = result: "The bus was late, so I walked."', bn: 'so = ফলাফল: "The bus was late, so I walked."' },
          { en: 'or = choice: "We can study online, or we can join a class."', bn: 'or = বিকল্প: "We can study online, or we can join a class."' },
          { en: 'A comma alone cannot join two complete sentences: "The road was flooded, the match was delayed." ✗ Use a full stop, a comma + joining word, or a semicolon.', bn: 'শুধু comma দিয়ে দুটো complete sentence জোড়া যায় না: "The road was flooded, the match was delayed." ✗ Full stop, comma + joining word, বা semicolon ব্যবহার করুন।' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Two ideas → one sentence', bn: 'দুই idea → এক sentence' },
        items: [
          { en: 'Rent is high in Dhaka, so many students share flats.', note: { en: '"so" shows the result.', bn: '"so" ফলাফল দেখায়।' } },
          { en: 'Coal use fell, but gas use increased.', note: { en: '"but" contrasts two trends — very useful in Task 1.', bn: '"but" দুইটা trend-এর তুলনা করে — Task 1-এ খুব কাজের।' } },
          { en: 'The road was flooded, but the match continued.', note: { en: 'Comma + "but" joins two complete ideas that contrast.', bn: 'Comma + "but" দুটো বিপরীত complete idea জোড়ে।' } },
          { en: 'The road was flooded; the match was delayed.', note: { en: 'A semicolon can join two closely related complete sentences.', bn: 'Semicolon ঘনিষ্ঠভাবে সম্পর্কিত দুটো complete sentence জুড়তে পারে।' } },
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
        kind: 'hook',
        title: l('Two facts, one sentence', 'দুটো তথ্য, এক sentence'),
        situation: l('Two facts: "The road was flooded." "The match was delayed."', 'দুটো তথ্য: "The road was flooded." "The match was delayed."'),
        question: l('Which sentence joins them correctly?', 'কোন sentence এদের ঠিকভাবে জোড়ে?'),
        options: ['The road was flooded, so the match was delayed.', 'The road was flooded, the match was delayed.', 'The road was flooded the match was delayed.'],
        answer: 'The road was flooded, so the match was delayed.',
        diagnose: {
          'The road was flooded, so the match was delayed.': l('Right: comma + "so" shows the result.', 'ঠিক: comma + "so" ফলাফল দেখায়।'),
          'The road was flooded, the match was delayed.': l('This is a comma splice: a comma alone cannot join two complete sentences.', 'এটা comma splice: শুধু comma দুটো complete sentence জুড়তে পারে না।'),
          'The road was flooded the match was delayed.': l('This is a run-on: there is nothing between the two sentences.', 'এটা run-on: দুই sentence-এর মাঝে কিছুই নেই।'),
        },
      },
      {
        kind: 'mistakes',
        title: l('Mistake lab: joining ideas', 'Mistake lab: idea জোড়া'),
        items: [
          { wrong: 'Prices rose, people bought less.', right: 'Prices rose, so people bought less.', why: l('Comma splice. Add a joining word (so) or use a full stop.', 'Comma splice। একটা joining word (so) দিন বা full stop দিন।') },
          { wrong: 'I like my job, so the pay is low.', right: 'I like my job, but the pay is low.', why: l('Low pay is a contrast, not a result → "but".', 'কম বেতন বিপরীত কথা, ফলাফল না → "but"।') },
          { wrong: 'Although it rained, but we played.', right: 'Although it rained, we played. / It rained, but we played.', why: l('Use one joining word, not two.', 'একটা joining word ব্যবহার করুন, দুটো না।') },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-7-e1',
            type: 'choice',
            concept: C7,
            prompt: { en: 'Choose the best joining word.', bn: 'সবচেয়ে ভালো joining word বেছে নিন।' },
            sentence: 'The traffic was terrible, ___ I arrived late.',
            options: ['but', 'so', 'or'],
            answer: 'so',
            explanation: { en: 'Arriving late is the result → "so".', bn: 'দেরিতে পৌঁছানো ফলাফল → "so"।' },
            tag: 'connector',
          },
          {
            id: 'sb-7-e2',
            type: 'choice',
            concept: C7,
            prompt: { en: 'Choose the best joining word.', bn: 'সবচেয়ে ভালো joining word বেছে নিন।' },
            sentence: 'Sales of laptops rose, ___ sales of desktop computers fell.',
            options: ['and', 'but', 'so'],
            answer: 'but',
            explanation: { en: 'Two opposite trends → "but".', bn: 'দুইটা বিপরীত trend → "but"।' },
            tag: 'connector',
          },
          {
            id: 'sb-7-e3',
            type: 'correct',
            concept: C7,
            prompt: { en: 'Join the two sentences with "but".', bn: '"but" দিয়ে দুইটা sentence জুড়ুন।' },
            sentence: 'Online classes are flexible. They can be lonely.',
            accepted: ['Online classes are flexible, but they can be lonely.', 'Online classes are flexible but they can be lonely.'],
            explanation: { en: 'Comma + "but" + second clause (with a small "t" in "they").', bn: 'Comma + "but" + দ্বিতীয় clause ("they"-র t ছোট হাতের)।' },
            tag: 'connector',
          },
          {
            id: 'sb-7-e4',
            type: 'write',
            concept: C7,
            prompt: { en: 'Speaking Part 1: "Do you like your hometown?" Answer with a compound sentence using "but" or "so".', bn: 'Speaking Part 1: "Do you like your hometown?" "but" বা "so" দিয়ে compound sentence-এ answer দিন।' },
            model: 'Yes, I love my hometown, but it has become very crowded recently.',
            checklist: [
              { en: 'Two complete ideas', bn: 'দুইটা complete idea' },
              { en: 'Joined with "but" or "so"', bn: '"but" বা "so" দিয়ে জোড়া' },
            ],
            explanation: { en: 'Two linked ideas make a Part 1 answer longer and more natural.', bn: 'দুইটা যুক্ত idea Part 1-এর answer-কে লম্বা আর স্বাভাবিক করে।' },
            tag: 'connector',
          },
          choice('sb-7-p1', C7, { ...P7, prompt: l('Which sentence is a comma splice?', 'কোন sentence-টা comma splice?'), options: ['The library was closed, we studied at home.', 'The library was closed, so we studied at home.', 'The library was closed. We studied at home.'], answer: 'The library was closed, we studied at home.', explanation: l('Two complete sentences joined only by a comma.', 'দুটো complete sentence শুধু comma দিয়ে জোড়া।'), why: { 'The library was closed, so we studied at home.': l('Correct: comma + "so".', 'সঠিক: comma + "so"।'), 'The library was closed. We studied at home.': l('Correct: two separate sentences.', 'সঠিক: দুটো আলাদা sentence।') } }),
        ],
      },
      {
        kind: 'practice',
        mode: 'recall',
        title: l('Now without options', 'এবার option ছাড়া'),
        exercises: [
          correct('sb-7-r1', C7, { ...P7, prompt: l('Fix the comma splice with "so".', '"so" দিয়ে comma splice ঠিক করুন।'), sentence: 'The cost increased, people bought less.', accepted: ['The cost increased, so people bought less.', 'The cost increased so people bought less.'], explanation: l('Comma + "so" + the result.', 'Comma + "so" + ফলাফল।') }),
          gap('sb-7-r2', C7, { ...P7, prompt: l('Write the joining word.', 'Joining word-টা লিখুন।'), sentence: 'I wanted to go out, ___ it was raining heavily.', accepted: ['but'], explanation: l('Wanting to go out vs. heavy rain = contrast → but.', 'বাইরে যেতে চাওয়া বনাম ভারী বৃষ্টি = বিপরীত → but।'), why: { so: l('"so" would mean the rain was the result of wanting to go out.', '"so" মানে হবে বাইরে যেতে চাওয়ার ফলে বৃষ্টি হয়েছে।') } }),
          correct('sb-7-r3', C7, { ...P7, prompt: l('Join the two sentences with "and".', '"and" দিয়ে দুটো sentence জুড়ুন।'), sentence: 'Rent is high. Food is expensive.', accepted: ['Rent is high, and food is expensive.', 'Rent is high and food is expensive.'], explanation: l('Two complete ideas + "and" (small "f" in "food").', 'দুটো complete idea + "and" ("food"-এর f ছোট হাতের)।') }),
        ],
      },
      {
        kind: 'practice',
        mode: 'personal',
        title: l('Use it yourself', 'নিজে ব্যবহার করুন'),
        exercises: [
          write('sb-7-y1', C7, {
            ...P7,
            prompt: l('Speaking Part 1: "Do you like your hometown?" Answer in two compound sentences: one with "but" and one with "so".', 'Speaking Part 1: "Do you like your hometown?" দুটো compound sentence-এ উত্তর দিন: একটা "but" দিয়ে, একটা "so" দিয়ে।'),
            model: 'Yes, I love my hometown, but it has become very crowded. The traffic is bad in the evening, so I usually walk to the market.',
            task: 'The student answers "Do you like your hometown?" with two compound sentences using "but" and "so". Check that both sides of each joining word are complete clauses, that "but" shows contrast and "so" shows a result, and that there is no comma splice or run-on.',
            target: l('Compound sentences with but and so', 'but আর so দিয়ে compound sentence'),
            checklist: [l('Both sides are complete sentences', 'দুই পাশেই complete sentence'), l('"but" = contrast, "so" = result', '"but" = বিপরীত, "so" = ফলাফল'), l('No comma splice', 'কোনো comma splice নেই')],
            explanation: l('…, but it has become very crowded … , so I usually walk.', '…, but it has become very crowded … , so I usually walk.'),
          }),
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখুন' },
        points: [
          { en: 'and (add) · but (contrast) · so (result) · or (choice)', bn: 'and (যোগ) · but (বিপরীত) · so (ফল) · or (বিকল্প)' },
          { en: 'Both sides must be complete sentences.', bn: 'দুই পাশেই complete sentence হতে হবে।' },
          { en: 'A comma alone cannot join two sentences — add and / but / so, or use a full stop.', bn: 'শুধু comma দিয়ে দুটো sentence জোড়া যায় না — and / but / so দিন, বা full stop।' },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 8
  {
    id: 'sb-8',
    format: 'v2',
    concept: C8,
    title: { en: 'Complex sentences: a first look', bn: 'Complex sentence: প্রথম পরিচয়' },
    why: {
      en: 'A mix of simple and complex sentences shows grammatical range — but only when the sentences are accurate.',
      bn: 'Simple আর complex sentence-এর মিশ্রণ grammatical range দেখায় — কিন্তু শুধু তখনই, যখন sentence-গুলো ভুল ছাড়া হয়।',
    },
    minutes: 10,
    difficulty: 'medium',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'Main idea + supporting idea', bn: 'Main idea + supporting idea' },
        body: {
          en: 'A complex sentence has a main clause (it can stand alone) and a dependent clause (it cannot). The dependent clause starts with a word like because, although, when, if or which. You will study these fully in Module 8; here you learn to recognise and build simple ones.',
          bn: 'Complex sentence-এ থাকে একটা main clause (একা দাঁড়াতে পারে) আর একটা dependent clause (একা পারে না)। Dependent clause শুরু হয় because, although, when, if বা which ধরনের শব্দ দিয়ে। Module 8-এ এগুলো বিস্তারিত পড়বেন; এখানে চিনতে আর সহজ কয়েকটা বানাতে শিখবেন।',
        },
        points: [
          { en: 'because = reason · although = contrast · when = time · if = condition', bn: 'because = কারণ · although = বিপরীত · when = সময় · if = শর্ত' },
          { en: 'If the dependent clause comes first, add a comma: "Although it was expensive, it sold well."', bn: 'Dependent clause আগে এলে comma দিন: "Although it was expensive, it sold well."' },
          { en: 'Accuracy first: one correct complex sentence beats three broken ones.', bn: 'আগে accuracy: তিনটা ভাঙা complex sentence-এর চেয়ে একটা সঠিক ভালো।' },
          { en: 'A dependent clause has a subject and a verb but cannot stand alone: "When the exam ended" needs a main clause, e.g. "…, the students left."', bn: 'Dependent clause-এ subject আর verb থাকে, কিন্তু একা দাঁড়াতে পারে না: "When the exam ended"-এর সাথে main clause লাগে, যেমন "…, the students left."' },
        ],
      },
      {
        kind: 'examples',
        title: { en: 'Simple → complex', bn: 'Simple → complex' },
        items: [
          { en: 'Many people cycle to work because it is cheap.', note: { en: 'Main idea + reason.', bn: 'Main idea + কারণ।' } },
          { en: 'Although the course was difficult, most students passed.', note: { en: 'Contrast clause first, then a comma.', bn: 'আগে contrast clause, তারপর comma।' } },
          { en: 'When prices fall, demand usually rises.', note: { en: 'Time/condition clause first.', bn: 'আগে সময়/শর্তের clause।' } },
          { en: 'When the exam ended, the students left.', note: { en: 'Dependent clause + comma + main clause.', bn: 'Dependent clause + comma + main clause।' } },
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
        kind: 'hook',
        title: l('One joining word or two?', 'একটা joining word নাকি দুটো?'),
        situation: l('A student writes: "Although it is expensive, but many people buy it."', 'একজন student লিখল: "Although it is expensive, but many people buy it."'),
        question: l('How many joining words should this sentence have?', 'এই sentence-এ কয়টা joining word থাকা উচিত?'),
        options: ['One: although OR but', 'Two: although AND but', 'None'],
        answer: 'One: although OR but',
        diagnose: {
          'One: although OR but': l('Right: "Although it is expensive, many people buy it." or "It is expensive, but many people buy it."', 'ঠিক: "Although it is expensive, many people buy it." অথবা "It is expensive, but many people buy it."'),
          'Two: although AND but': l('Bangla often uses both (যদিও… কিন্তু), but English uses only one.', 'বাংলায় প্রায়ই দুটোই বসে (যদিও… কিন্তু), কিন্তু English-এ একটাই।'),
          None: l('Without a joining word, you would need two separate sentences.', 'Joining word ছাড়া দুটো আলাদা sentence লাগবে।'),
        },
      },
      {
        kind: 'mistakes',
        title: l('Mistake lab: complex sentences', 'Mistake lab: complex sentence'),
        items: [
          { wrong: 'Although it rained, but we played.', right: 'Although it rained, we played.', why: l('"although" already shows the contrast; remove "but".', '"although" বিপরীতটা দেখায়; "but" বাদ দিন।') },
          { wrong: 'Because I was busy.', right: 'I missed the call because I was busy.', why: l('A because-clause alone is a fragment.', 'একা because-clause একটা fragment।') },
          { wrong: 'Because it was late, so we took a taxi.', right: 'Because it was late, we took a taxi.', why: l('"because" and "so" both mark the link; use one.', '"because" আর "so" দুটোই সম্পর্ক বোঝায়; একটা রাখুন।') },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Practice', bn: 'Practice' },
        exercises: [
          {
            id: 'sb-8-e1',
            type: 'choice',
            concept: C8,
            prompt: { en: 'Choose the best word.', bn: 'সবচেয়ে ভালো শব্দ বেছে নিন।' },
            sentence: '___ it was raining, the match continued.',
            options: ['Because', 'Although', 'If'],
            answer: 'Although',
            explanation: { en: 'Rain + the match continued = contrast → "Although".', bn: 'বৃষ্টি + তবু খেলা চলল = বিপরীত → "Although"।' },
            tag: 'complex-sentence',
          },
          {
            id: 'sb-8-e2',
            type: 'choice',
            concept: C8,
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
            concept: C8,
            prompt: { en: 'Join with "because".', bn: '"because" দিয়ে জুড়ুন।' },
            sentence: 'I want to study abroad. I want better job opportunities.',
            accepted: ['I want to study abroad because I want better job opportunities.', 'Because I want better job opportunities, I want to study abroad.'],
            explanation: { en: 'Main idea + "because" + reason.', bn: 'Main idea + "because" + কারণ।' },
            tag: 'complex-sentence',
          },
          {
            id: 'sb-8-e4',
            type: 'write',
            concept: C8,
            prompt: { en: 'Speaking Part 1: "Do you prefer studying in the morning or at night?" Answer with "because".', bn: 'Speaking Part 1: "Do you prefer studying in the morning or at night?" "because" দিয়ে answer দিন।' },
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
        kind: 'practice',
        mode: 'recall',
        title: l('Now without options', 'এবার option ছাড়া'),
        exercises: [
          correct('sb-8-r1', C8, { ...P8, prompt: l('Join the sentences with "although".', '"although" দিয়ে sentence দুটো জুড়ুন।'), sentence: 'The course was difficult. Most students passed.', accepted: ['Although the course was difficult, most students passed.', 'Most students passed although the course was difficult.', 'Although the course was difficult most students passed.'], explanation: l('Although + clause, main clause.', 'Although + clause, main clause।') }),
          gap('sb-8-r2', C8, { ...P8, prompt: l('Write the joining word for a condition.', 'শর্ত বোঝানোর joining word লিখুন।'), sentence: '___ it rains tomorrow, the trip will be cancelled.', accepted: ['If'], explanation: l('A condition → If.', 'শর্ত → If।'), why: { because: l('"because" gives a reason, not a condition.', '"because" কারণ দেয়, শর্ত না।'), although: l('"although" shows contrast, not a condition.', '"although" বিপরীত বোঝায়, শর্ত না।') } }),
          correct('sb-8-r3', C8, { ...P8, prompt: l('Remove the extra joining word.', 'বাড়তি joining word বাদ দিন।'), sentence: 'Because it was late, so we took a taxi.', accepted: ['Because it was late, we took a taxi.', 'It was late, so we took a taxi.', 'Because it was late we took a taxi.'], explanation: l('Keep "because" OR "so", not both.', '"because" অথবা "so" রাখুন, দুটো না।') }),
        ],
      },
      {
        kind: 'practice',
        mode: 'personal',
        title: l('Use it yourself', 'নিজে ব্যবহার করুন'),
        exercises: [
          write('sb-8-y1', C8, {
            ...P8,
            prompt: l('Write two sentences about how you study: one with "because" and one that starts with "Although".', 'আপনি কীভাবে পড়েন তা নিয়ে দুটো sentence লিখুন: একটা "because" দিয়ে, আর একটা "Although" দিয়ে শুরু।'),
            model: 'I study in the library because my house is noisy. Although I am busy at work, I practise English for twenty minutes every night.',
            task: 'The student writes two complex sentences about how they study: one with because and one starting with Although. Check that each dependent clause has a subject and verb and is attached to a main clause, that "Although" is not followed by "but" and "because" is not paired with "so", and that there is a comma after a fronted Although-clause.',
            target: l('Main clause + because / although clause', 'Main clause + because / although clause'),
            checklist: [l('"because" + subject + verb', '"because" + subject + verb'), l('Although-clause, comma, main clause', 'Although-clause, comma, main clause'), l('No "although … but" / "because … so"', '"although … but" / "because … so" নেই')],
            explanation: l('Although I am busy at work, I practise English every night.', 'Although I am busy at work, I practise English every night.'),
          }),
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Remember', bn: 'মনে রাখুন' },
        points: [
          { en: 'Although + clause, main clause. (No "but".)', bn: 'Although + clause, main clause। ("but" না।)' },
          { en: 'Accuracy first, then variety.', bn: 'আগে accuracy, তারপর variety।' },
          { en: 'Dependent clause (because / when / if…) + main clause = complex sentence.', bn: 'Dependent clause (because / when / if…) + main clause = complex sentence।' },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 9
  {
    id: 'sb-9',
    format: 'v2',
    title: { en: 'Sentence practice: IELTS mix', bn: 'Sentence practice: IELTS mix' },
    why: {
      en: 'Put everything together on real IELTS-style sentences before moving on to Tenses.',
      bn: 'Tenses-এ যাওয়ার আগে IELTS ধাঁচের sentence-এ সবকিছু একসাথে ঝালিয়ে নিন।',
    },
    minutes: 12,
    difficulty: 'medium',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: { en: 'The five-check routine', bn: 'পাঁচ ধাপের check' },
        body: {
          en: 'Before you finish a sentence, check it in a fixed order. Fix the grammar of the clause first; punctuation comes last. There is often more than one correct way to repair a sentence.',
          bn: 'Sentence শেষ করার আগে একটা নির্দিষ্ট ক্রমে check করুন। আগে clause-এর grammar ঠিক করুন; punctuation সবার শেষে। একটা sentence ঠিক করার প্রায়ই একাধিক সঠিক উপায় থাকে।',
        },
        points: [
          { en: '1 Message: what do I want to say?', bn: '১ Message: আমি কী বলতে চাই?' },
          { en: '2 Core: is there a subject and a full main verb that matches it?', bn: '২ Core: subject আর তার সাথে মেলে এমন full main verb আছে?' },
          { en: '3 Complete: is any because / although / when clause left on its own?', bn: '৩ Complete: কোনো because / although / when clause একা পড়ে আছে?' },
          { en: '4 Joins: is the joining word right, and is there no comma splice?', bn: '৪ Joins: joining word ঠিক তো, কোনো comma splice নেই তো?' },
          { en: '5 Read it back: once for meaning, once for grammar.', bn: '৫ আবার পড়ুন: একবার অর্থের জন্য, একবার grammar-এর জন্য।' },
        ],
      },
      {
        kind: 'examples',
        title: l('A worked repair', 'ধাপে ধাপে ঠিক করা'),
        items: [
          { en: 'Although many students wants to study abroad, they cannot afford it, they search for scholarships.', note: { en: 'Draft with three problems. Check 2: "students" is plural → "want".', bn: 'তিনটা সমস্যাসহ draft। Check ২: "students" plural → "want"।' } },
          { en: 'Although many students want to study abroad, they cannot afford it, so they search for scholarships.', note: { en: 'Checks 3 and 4: the Although-clause has a main clause; "so" fixes the comma splice.', bn: 'Check ৩ আর ৪: Although-clause-এর main clause আছে; "so" comma splice ঠিক করে।' } },
          { en: 'Many students want to study abroad but cannot afford it, so they search for scholarships.', note: { en: 'Another correct repair. Choose the one that says what you mean.', bn: 'আরেকটা সঠিক রূপ। যেটা আপনার কথাটা বোঝায়, সেটা বেছে নিন।' } },
        ],
      },
      {
        kind: 'ielts',
        title: { en: 'Where you need this in IELTS', bn: 'IELTS-এ কোথায় লাগবে' },
        uses: [
          { skill: 'writing', example: 'Although car sales fell in 2020, they recovered quickly and reached a peak in 2023.', note: { en: 'Task 1: one accurate complex sentence with two trends.', bn: 'Task 1: দুইটা trend নিয়ে একটা সঠিক complex sentence।' } },
          { skill: 'speaking', example: 'I live in a small town near Rajshahi, and I really like it because it is peaceful.', note: { en: 'Part 1: simple → compound → complex in one natural answer.', bn: 'Part 1: এক স্বাভাবিক answer-এ simple → compound → complex।' } },
          { skill: 'reading', example: 'Although the journey took longer than expected, the students arrived before the interview began.', note: l('Reverse the routine: find the main clause first ("the students arrived"), then add the contrast and the time.', 'Routine উল্টো করুন: আগে main clause খুঁজুন ("the students arrived"), তারপর বিপরীত কথা আর সময় যোগ করুন।') },
        ],
      },
      {
        kind: 'hook',
        title: l('What do you fix first?', 'আগে কোনটা ঠিক করবেন?'),
        situation: l('Draft: "Although many students wants to study abroad, they cannot afford it, they search for scholarships."', 'Draft: "Although many students wants to study abroad, they cannot afford it, they search for scholarships."'),
        question: l('What should you fix FIRST?', 'সবার আগে কী ঠিক করবেন?'),
        options: ['wants → want (subject and verb)', 'Add more commas', 'Make the sentence longer'],
        answer: 'wants → want (subject and verb)',
        diagnose: {
          'wants → want (subject and verb)': l('Right. Fix the core (subject + verb) first, then the joins and punctuation.', 'ঠিক। আগে core (subject + verb) ঠিক করুন, তারপর joins আর punctuation।'),
          'Add more commas': l('Commas come last — and this sentence already has one comma too many (a comma splice).', 'Comma সবার শেষে — আর এই sentence-এ তো একটা comma বেশিই আছে (comma splice)।'),
          'Make the sentence longer': l('Longer is not better. Make the relationship between the ideas clear first.', 'লম্বা মানেই ভালো না। আগে idea-গুলোর সম্পর্ক পরিষ্কার করুন।'),
        },
      },
      {
        kind: 'mistakes',
        title: l('Mistake lab: the whole module', 'Mistake lab: পুরো module'),
        items: [
          { wrong: 'The number of students increasing every year.', right: 'The number of students is increasing every year.', why: l('Check 2: -ing needs "is".', 'Check ২: -ing-এর আগে "is" লাগে।') },
          { wrong: 'Because the rent is high.', right: 'Because the rent is high, many students share flats.', why: l('Check 3: a because-clause needs a main clause.', 'Check ৩: because-clause-এর main clause লাগে।') },
          { wrong: 'Prices rose, people bought less.', right: 'Prices rose, so people bought less.', why: l('Check 4: a comma alone cannot join two sentences.', 'Check ৪: শুধু comma দুটো sentence জুড়তে পারে না।') },
        ],
      },
      {
        kind: 'practice',
        title: { en: 'Mixed practice', bn: 'Mixed practice' },
        exercises: [
          {
            id: 'sb-9-e1',
            type: 'correct',
            concept: 'sb-verb',
            prompt: { en: 'Correct the sentence.', bn: 'Sentence-টা ঠিক করুন।' },
            sentence: 'The number of students increasing every year.',
            accepted: ['The number of students is increasing every year.', 'The number of students increases every year.'],
            explanation: { en: 'Add a helping verb: "is increasing" (singular, because the head word is "number").', bn: 'Helping verb লাগবে: "is increasing" (singular, কারণ মূল শব্দ "number")।' },
            tag: 'verb',
          },
          {
            id: 'sb-9-e2',
            type: 'correct',
            concept: 'sb-subject',
            prompt: { en: 'Correct the sentence.', bn: 'Sentence-টা ঠিক করুন।' },
            sentence: 'Is difficult to find a good job without experience.',
            accepted: ['It is difficult to find a good job without experience.'],
            explanation: { en: 'Missing subject "It".', bn: 'Subject "It" বাদ পড়েছে।' },
            tag: 'subject',
          },
          {
            id: 'sb-9-e3',
            type: 'order',
            concept: 'sb-complex-intro',
            prompt: { en: 'Put the words in order.', bn: 'শব্দগুলো সাজান।' },
            answer: 'Although the rent is high, many students live in the city.',
            explanation: { en: '"Although" clause + comma + main clause.', bn: '"Although" clause + comma + main clause।' },
            tag: 'complex-sentence',
          },
          {
            id: 'sb-9-e4',
            type: 'choice',
            concept: 'sb-complete',
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
            concept: 'sb-verb',
            prompt: { en: 'Choose the correct verb.', bn: 'সঠিক verb বেছে নিন।' },
            sentence: 'Unemployment ___ sharply in 2009.',
            options: ['rose', 'raised', 'rised'],
            answer: 'rose',
            explanation: { en: '"rise – rose – risen" has no object. "raised" needs an object; "rised" does not exist.', bn: '"rise – rose – risen"-এর object নেই। "raised"-এর object লাগে; "rised" বলে কোনো শব্দ নেই।' },
            tag: 'verb',
          },
          {
            id: 'sb-9-e6',
            type: 'write',
            prompt: { en: 'Task 2 practice: "Some people think university should be free." Write one sentence with your opinion and a reason.', bn: 'Task 2 practice: "Some people think university should be free." আপনার মত আর একটা কারণ দিয়ে এক sentence লিখুন।' },
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
        kind: 'practice',
        mode: 'recall',
        title: l('Now without options', 'এবার option ছাড়া'),
        exercises: [
          correct('sb-9-r1', 'sb-subject', { tag: 'agreement', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'Many students wants to study abroad.', accepted: ['Many students want to study abroad.'], explanation: l('Plural subject "Many students" → want.', 'Plural subject "Many students" → want।') }),
          correct('sb-9-r2', 'sb-compound', { tag: 'connector', prompt: l('Fix the comma splice.', 'Comma splice ঠিক করুন।'), sentence: 'The rent is high, many students share flats.', accepted: ['The rent is high, so many students share flats.', 'The rent is high so many students share flats.', 'The rent is high. Many students share flats.', 'Because the rent is high, many students share flats.', 'The rent is high; many students share flats.', 'Many students share flats because the rent is high.'], explanation: l('Add "so", use a full stop, or make one part a because-clause.', '"so" দিন, full stop দিন, বা একটা অংশকে because-clause বানান।') }),
          gap('sb-9-r3', 'sb-verb', { tag: 'verb', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'Unemployment has ___ steadily since 2015.', base: 'rise', accepted: ['risen'], explanation: l('has + past participle: rise – rose – risen.', 'has + past participle: rise – rose – risen।'), why: { rose: l('After "has" use the past participle: risen.', '"has"-এর পরে past participle: risen।'), raised: l('"raise" needs an object; unemployment rises by itself.', '"raise"-এর object লাগে; unemployment নিজে বাড়ে।') } }),
        ],
      },
      {
        kind: 'practice',
        mode: 'personal',
        title: l('Use it yourself', 'নিজে ব্যবহার করুন'),
        exercises: [
          write('sb-9-y1', '', {
            tag: 'sentence-structure',
            prompt: l('Write two sentences: one about a problem in your community and one about a possible solution. Then check both with the five steps.', 'দুটো sentence লিখুন: একটা আপনার এলাকার কোনো সমস্যা নিয়ে, আর একটা সম্ভাব্য সমাধান নিয়ে। তারপর পাঁচ ধাপে দুটোই check করুন।'),
            model: 'Many roads in my area flood during the monsoon because the drains are blocked. The city council should clean the drains before the rainy season starts.',
            task: 'The student writes one sentence about a problem in their community and one about a solution. Check the five steps: a clear message; a subject and a full main verb that agree; no because/although/when clause left alone; correct joining words with no comma splice or run-on; capital letters and full stops. Name the most important fix first.',
            target: l('Complete, well-joined sentences', 'সম্পূর্ণ, ঠিকভাবে জোড়া sentence'),
            checklist: [l('Subject + full verb that agree', 'Subject + মিলে যাওয়া full verb'), l('No fragment, no comma splice', 'কোনো fragment বা comma splice নেই'), l('The joining word fits the meaning', 'Joining word অর্থের সাথে মেলে')],
            explanation: l('Many roads flood … because the drains are blocked.', 'Many roads flood … because the drains are blocked.'),
          }),
        ],
      },
      {
        kind: 'recall',
        title: { en: 'Module summary', bn: 'Module summary' },
        points: [
          { en: 'Subject + full verb + complete idea.', bn: 'Subject + full verb + সম্পূর্ণ idea।' },
          { en: 'Simple for main points, compound for linking, complex for reasons and contrasts.', bn: 'Main point-এ simple, জোড়ার জন্য compound, কারণ আর বিপরীতের জন্য complex।' },
          { en: 'Next: Tenses — how verbs show time in IELTS.', bn: 'পরের module: Tenses — IELTS-এ verb কীভাবে সময় দেখায়।' },
          { en: 'Check: message → subject + verb → complete → joins → read back.', bn: 'Check: message → subject + verb → complete → joins → আবার পড়া।' },
        ],
      },
    ],
  },
];

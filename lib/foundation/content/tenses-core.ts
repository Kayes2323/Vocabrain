import type { Exercise, Lesson } from '../model';
import { l } from './pos-kit';

/**
 * Tenses for IELTS, core tenses in the v2 (problem-first) format: t-3 Present
 * Continuous … t-8 Future forms. The exercises of the old v1 lessons keep their
 * ids (students’ history stays linked); new ones are added around them.
 * Every lesson ends with a personal sentence that Mino checks, so its concept
 * can reach mastery. Original Vocab Brain content.
 */

// ======================================================================= 3
const pcPractice: Exercise[] = [
  {
    id: 't-3-e1', type: 'choice', tag: 'tense', concept: 'present-continuous', pattern: 'simple-vs-continuous',
    prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
    sentence: 'Look! It ___ outside.',
    options: ['rains', 'is raining', 'rained'], answer: 'is raining',
    explanation: l('"Look!" = happening right now → present continuous.', '"Look!" = এই মুহূর্তে হচ্ছে → present continuous।'),
    why: { rains: l('Present simple is for habits ("It rains a lot in July").', 'Present simple অভ্যাসের জন্য ("It rains a lot in July")।'), rained: l('Past, but "Look!" means now.', 'Past, কিন্তু "Look!" মানে এখন।') },
  },
  {
    id: 't-3-p1', type: 'choice', tag: 'tense', concept: 'present-continuous', pattern: 'simple-vs-continuous',
    prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
    sentence: 'These days, food prices ___ every month.',
    options: ['rise', 'are rising', 'rose'], answer: 'are rising',
    explanation: l('"These days" + a change that is still happening → are rising.', '"These days" + এখনো চলতে থাকা পরিবর্তন → are rising।'),
    why: { rise: l('Present simple sounds like a permanent rule. "These days" points to a trend happening now.', 'Present simple শুনলে স্থায়ী নিয়ম মনে হয়। "These days" এখন চলা একটা trend বোঝায়।'), rose: l('"rose" is finished past, but "these days" is now.', '"rose" শেষ হওয়া অতীত, কিন্তু "these days" মানে এখন।') },
  },
  {
    id: 't-3-e3', type: 'choice', tag: 'tense', concept: 'present-continuous', pattern: 'simple-vs-continuous',
    prompt: l('Choose the correct sentence.', 'সঠিক sentence বাছো।'),
    options: ['I am knowing many people in Sylhet.', 'I know many people in Sylhet.'], answer: 'I know many people in Sylhet.',
    explanation: l('"know" is a state verb: no -ing.', '"know" state verb: -ing হয় না।'),
    why: { 'I am knowing many people in Sylhet.': l('State verbs (know, believe, own) are not used in the continuous.', 'State verb (know, believe, own) continuous-এ ব্যবহার হয় না।') },
  },
  {
    id: 't-3-p2', type: 'choice', tag: 'tense', concept: 'present-continuous', pattern: 'simple-vs-continuous',
    prompt: l('Which one fits? (Her job is permanent.)', 'কোনটা বসবে? (তার চাকরি স্থায়ী।)'),
    sentence: 'My cousin ___ in Chattogram. She moved there ten years ago.',
    options: ['lives', 'is living'], answer: 'lives',
    explanation: l('A permanent situation → present simple. The continuous would mean "just for now".', 'স্থায়ী অবস্থা → present simple। Continuous বললে বোঝায় "শুধু এখনকার জন্য"।'),
    why: { 'is living': l('"is living" sounds temporary, like "for a few months". Ten years in the same city is permanent.', '"is living" সাময়িক শোনায়, যেন "কয়েক মাসের জন্য"। দশ বছর এক শহরে থাকা স্থায়ী।') },
  },
  {
    id: 't-3-p3', type: 'choice', tag: 'tense', concept: 'present-continuous',
    prompt: l('Listening Part 1: the receptionist says…', 'Listening Part 1: receptionist বলছেন…'),
    sentence: 'Sorry, the manager ___ a meeting at the moment. Can I take a message?',
    options: ['has', 'is having', 'had'], answer: 'is having',
    explanation: l('"at the moment" → something in progress now → is having (a meeting).', '"at the moment" → এখন চলছে → is having (a meeting)।'),
    why: { has: l('"has a meeting" sounds like a fact or schedule, not what is happening now.', '"has a meeting" শুনলে সত্য বা schedule মনে হয়, এখন চলছে এমন না।'), had: l('Past, but "at the moment" is now.', 'Past, কিন্তু "at the moment" মানে এখন।') },
  },
];

const pcRecall: Exercise[] = [
  {
    id: 't-3-e2', type: 'correct', tag: 'tense', concept: 'present-continuous', pattern: 'verb-form',
    prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'Nowadays more students studying online.',
    accepted: ['Nowadays more students are studying online.', 'Nowadays, more students are studying online.'],
    explanation: l('Add "are": subject + are + verb-ing.', '"are" যোগ করো: subject + are + verb-ing।'),
  },
  {
    id: 't-3-e4', type: 'gap', tag: 'tense', concept: 'present-continuous', pattern: 'simple-vs-continuous',
    prompt: l('Complete with the present continuous of "increase".', '"increase"-এর present continuous বসাও।'),
    sentence: 'The cost of living ___ in many cities this year.',
    accepted: ['is increasing', "'s increasing"],
    explanation: l('A trend around now → "is increasing".', 'এখনকার trend → "is increasing"।'),
    why: { increasing: l('"-ing" needs "is" before it.', '"-ing"-এর আগে "is" লাগে।'), increases: l('Present simple is for general facts, not a trend "this year".', 'Present simple সাধারণ সত্যের জন্য, "this year"-এর trend-এর জন্য না।') },
  },
  {
    id: 't-3-r1', type: 'gap', tag: 'tense', concept: 'present-continuous',
    prompt: l('Write the verb (wait). No options!', 'Verb লেখো (wait)। কোনো option নেই!'),
    sentence: 'Please hurry — the taxi ___ outside right now.',
    accepted: ['is waiting', "'s waiting"],
    explanation: l('"right now" → is waiting.', '"right now" → is waiting।'),
    why: { waits: l('"right now" needs the continuous: is waiting.', '"right now"-এ continuous লাগে: is waiting।'), waiting: l('-ing needs "is" before it.', '-ing-এর আগে "is" লাগে।') },
  },
  {
    id: 't-3-r2', type: 'correct', tag: 'tense', concept: 'present-continuous', pattern: 'simple-vs-continuous',
    prompt: l('Fix the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'I am understanding the problem now.',
    accepted: ['I understand the problem now.'],
    explanation: l('"understand" is a state verb: I understand (even "now").', '"understand" state verb: I understand ("now" থাকলেও)।'),
  },
];

const pcChallenge: Exercise[] = [
  {
    id: 't-3-c1', type: 'choice', tag: 'tense', concept: 'present-continuous', pattern: 'simple-vs-continuous',
    prompt: l('Why is "I am working in a bank" a strange answer if it is your permanent job?', 'স্থায়ী চাকরি হলে "I am working in a bank" কেন অদ্ভুত শোনায়?'),
    options: ['The continuous suggests it is only temporary', 'It is a grammar error: -ing is never correct for jobs', 'It sounds too formal'],
    answer: 'The continuous suggests it is only temporary',
    explanation: l('Grammar is fine; the meaning changes. "I’m working in a bank this summer" = temporary. Permanent job → I work in a bank.', 'Grammar ঠিক, অর্থ বদলায়। "I’m working in a bank this summer" = সাময়িক। স্থায়ী চাকরি → I work in a bank।'),
  },
  {
    id: 't-3-c2', type: 'spot', tag: 'tense', concept: 'present-continuous', pattern: 'verb-form',
    prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। সেটায় tap করো, তারপর ঠিক করো।'),
    words: ['At', 'the', 'moment,', 'my', 'brother', 'work', 'in', 'Dubai.'], wrong: 5,
    accepted: ['is working'], fixOptions: ['is working', 'working', 'works'],
    explanation: l('"At the moment" → is working.', '"At the moment" → is working।'),
  },
  {
    id: 't-3-c3', type: 'choice', tag: 'tense', concept: 'present-continuous',
    prompt: l('Reading. Passage: "Engineers are currently testing the new bridge." Statement: "Testing of the bridge has finished."', 'Reading. Passage: "Engineers are currently testing the new bridge." Statement: "Testing of the bridge has finished."'),
    options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE',
    explanation: l('"are currently testing" = still in progress, so it has NOT finished.', '"are currently testing" = এখনো চলছে, তাই শেষ হয়নি।'),
  },
];

export const presentContinuousV2: Lesson = {
  id: 't-3',
  format: 'v2',
  concept: 'present-continuous',
  title: l('Present Continuous', 'Present Continuous'),
  why: l('Actions happening now and changing trends — useful in Speaking and for describing current changes.', 'এই মুহূর্তের কাজ আর চলমান পরিবর্তন — Speaking-এ আর এখনকার পরিবর্তন বোঝাতে কাজের।'),
  minutes: 12,
  difficulty: 'easy',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('A phone call', 'একটা ফোন কল'),
      situation: l('Your friend calls while you are in the kitchen, cooking. She asks: "What are you doing?"', 'তুমি রান্নাঘরে রান্না করছো, এমন সময় বন্ধু ফোন করে জিজ্ঞেস করলো: "What are you doing?"'),
      question: l('What do you say?', 'তুমি কী বলবে?'),
      options: ['I cook dinner.', 'I am cooking dinner.', 'I cooking dinner.'],
      answer: 'I am cooking dinner.',
      diagnose: {
        'I cook dinner.': l('"I cook dinner" sounds like a habit ("I cook dinner every night"). Your friend asked about this moment.', '"I cook dinner" শুনলে অভ্যাস মনে হয় ("I cook dinner every night")। বন্ধু জানতে চেয়েছে এই মুহূর্তের কথা।'),
        'I cooking dinner.': l('Very close! -ing cannot stand alone in English. It needs am / is / are: I am cooking.', 'খুব কাছে! English-এ -ing একা দাঁড়াতে পারে না। am / is / are লাগে: I am cooking।'),
        'I am cooking dinner.': l('Right. Something happening right now → am / is / are + verb-ing.', 'ঠিক। এই মুহূর্তে হচ্ছে → am / is / are + verb-ing।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করো'),
      items: [
        { en: 'I am cooking dinner right now.', note: l('right now', 'এই মুহূর্তে') },
        { en: 'My sister is staying with our aunt this month.', note: l('only for a while', 'কিছুদিনের জন্য') },
        { en: 'More people are working from home these days.', note: l('a changing trend', 'বদলাতে থাকা trend') },
        { en: 'The river is rising because of the heavy rain.', note: l('a change in progress', 'চলমান পরিবর্তন') },
      ],
      question: l('What do these four sentences have in common?', 'এই চারটা sentence-এর মিল কোথায়?'),
      options: [
        l('They are happening now, or only for a while, or still changing', 'এগুলো এখন হচ্ছে, বা কিছুদিনের জন্য, বা এখনো বদলাচ্ছে'),
        l('They are habits that happen every day', 'এগুলো প্রতিদিনের অভ্যাস'),
        l('They finished in the past', 'এগুলো অতীতে শেষ হয়ে গেছে'),
      ],
      answer: 0,
      pattern: l(
        'Present continuous = now, temporary, or changing. Look at the form: am / is / are + verb-ing. Both parts are always there.',
        'Present continuous = এখন, সাময়িক, বা বদলাচ্ছে। Form দেখো: am / is / are + verb-ing। দুটো অংশই সবসময় থাকে।',
      ),
    },
    {
      kind: 'concept',
      title: l('When to use it — and when not to', 'কখন ব্যবহার করবে — আর কখন না'),
      body: l(
        'Use am / is / are + verb-ing for actions happening now or around now, temporary situations, and trends that are changing.',
        'এখন বা এই সময়ে চলছে এমন কাজ, সাময়িক অবস্থা আর বদলাতে থাকা trend-এর জন্য am / is / are + verb-ing।',
      ),
      points: [
        l('I am studying · She is working · They are living…', 'I am studying · She is working · They are living…'),
        l('Signal words: now, at the moment, currently, these days, this year.', 'Signal word: now, at the moment, currently, these days, this year।'),
        l('NOT for routines or permanent facts: I work in a bank (my job), not "I am working in a bank".', 'রুটিন বা স্থায়ী সত্যের জন্য না: I work in a bank (আমার চাকরি), "I am working in a bank" না।'),
        l('NOT with state verbs: know, believe, want, own, understand ("I know", not "I am knowing").', 'State verb-এর সাথে না: know, believe, want, own, understand ("I know", "I am knowing" না)।'),
        l('Why Bangla speakers slip: "করছি" covers both "I work" and "I am working", so -ing feels right everywhere.', 'বাংলাভাষীরা কেন ভুল করে: "করছি" দিয়ে "I work" আর "I am working" দুটোই বোঝায়, তাই -ing সব জায়গায় ঠিক মনে হয়।'),
      ],
      timeline: [
        { sentence: 'I am cooking dinner.', picture: 'now', label: l('Now', 'এখন') },
        { sentence: 'I cook dinner every night.', picture: 'habit', label: l('Habit → simple', 'অভ্যাস → simple') },
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'I am preparing for IELTS at the moment.', note: l('Around now, temporary.', 'এই সময়ে, সাময়িক।') },
        { en: 'More people are working from home these days.', note: l('A changing trend.', 'বদলাতে থাকা trend।') },
        { en: 'I know the answer.', note: l('"know" is a state verb → present simple, not continuous.', '"know" state verb → present simple, continuous না।') },
        { en: 'My father is repairing the roof this week.', note: l('A temporary job, just this week.', 'সাময়িক কাজ, শুধু এই সপ্তাহে।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'At the moment I’m studying accounting at a university in Dhaka.', note: l('Part 1 "Do you work or study?" — current situation.', 'Part 1 "Do you work or study?" — এখনকার অবস্থা।') },
        { skill: 'writing', example: 'Cities are becoming more crowded, and governments are struggling to provide housing.', note: l('Task 2 introductions often describe current trends.', 'Task 2-এর introduction প্রায়ই চলমান trend বর্ণনা করে।') },
        { skill: 'reading', example: 'Scientists are now testing the vaccine on volunteers.', note: l('"are now testing" = not finished yet. A statement saying it is finished would be FALSE.', '"are now testing" = এখনো শেষ হয়নি। শেষ হয়েছে বললে statement FALSE।') },
        { skill: 'listening', example: 'We’re currently looking for volunteers for the weekend.', note: l('Part 2 announcements use "currently", "now".', 'Part 2-এর ঘোষণায় "currently", "now" থাকে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Nowadays more students studying online.', right: 'Nowadays more students are studying online.', why: l('-ing always needs am / is / are.', '-ing-এর সাথে সবসময় am / is / are লাগে।') },
        { wrong: 'I am knowing many people here.', right: 'I know many people here.', why: l('State verbs (know, want, believe) stay simple.', 'State verb (know, want, believe) simple থাকে।') },
        { wrong: 'I am working in a bank. (my permanent job)', right: 'I work in a bank.', why: l('Permanent job → present simple.', 'স্থায়ী চাকরি → present simple।') },
        { wrong: 'Look! It rains.', right: 'Look! It is raining.', why: l('"Look!" = right now → continuous.', '"Look!" = এই মুহূর্তে → continuous।') },
      ],
    },
    { kind: 'practice', mode: 'practice', title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'), exercises: pcPractice },
    { kind: 'practice', mode: 'recall', title: l('Active recall: no options', 'Active recall: কোনো option নেই'), exercises: pcRecall },
    { kind: 'practice', title: l('Mini challenge', 'Mini challenge'), exercises: pcChallenge },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: what you are doing these days', 'এবার তোমার পালা: আজকাল তুমি কী করছো'),
      exercises: [
        {
          id: 't-3-e5', type: 'write', tag: 'tense', concept: 'present-continuous',
          prompt: l('Speaking Part 1: "What are you doing these days, apart from studying or work?" Write 2–3 sentences. Use the present continuous for what is happening these days, and one present simple sentence for a habit.', 'Speaking Part 1: "What are you doing these days, apart from studying or work?" ২–৩টা sentence লেখো। আজকাল যা চলছে তার জন্য present continuous, আর একটা অভ্যাসের জন্য present simple।'),
          model: 'These days I’m learning to cook, because I’m living alone this year. I usually cook rice and dal on weekdays.',
          checklist: [l('am / is / are + verb-ing', 'am / is / are + verb-ing'), l('A time phrase (these days, at the moment, this year)', 'একটা সময়ের phrase (these days, at the moment, this year)'), l('One habit in the present simple', 'একটা অভ্যাস present simple-এ')],
          explanation: l('Current, temporary situations → present continuous; habits → present simple.', 'এখনকার সাময়িক অবস্থা → present continuous; অভ্যাস → present simple।'),
          mino: {
            task: 'The student describes what they are doing these days (Speaking Part 1). Check the present continuous: am/is/are + verb-ing for current or temporary actions (no missing am/is/are, correct -ing spelling), no continuous with state verbs (know, want, understand, believe), and present simple for the habit sentence. When a tense is wrong, name the time word or meaning that decides it (e.g. "these days" = temporary → continuous; "usually" = habit → simple).',
            target: l('am / is / are + verb-ing for now · present simple for a habit', 'এখনের জন্য am / is / are + verb-ing · অভ্যাসের জন্য present simple'),
          },
        },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('am / is / are + verb-ing = now / these days / changing trends.', 'am / is / are + verb-ing = এখন / আজকাল / বদলাতে থাকা trend।'),
        l('No -ing with know, believe, want, own, understand.', 'know, believe, want, own, understand-এ -ing না।'),
        l('Permanent job or home → present simple (I work, I live).', 'স্থায়ী চাকরি বা বাসা → present simple (I work, I live)।'),
      ],
    },
  ],
};

// ======================================================================= 4
const psPractice: Exercise[] = [
  {
    id: 't-4-e1', type: 'choice', tag: 'tense', concept: 'past-simple', pattern: 'past-vs-perfect',
    prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
    sentence: 'Unemployment ___ sharply in 2009.',
    options: ['rises', 'rose', 'has risen'], answer: 'rose',
    explanation: l('2009 is finished → past simple; "rise" is irregular → "rose".', '2009 শেষ → past simple; "rise" irregular → "rose"।'),
    why: { rises: l('Present simple, but 2009 is in the past.', 'Present simple, কিন্তু 2009 অতীতে।'), 'has risen': l('Present perfect cannot be used with a finished time like "in 2009".', '"in 2009"-এর মতো শেষ হওয়া সময়ের সাথে present perfect হয় না।') },
  },
  {
    id: 't-4-e4', type: 'choice', tag: 'tense', concept: 'past-simple', pattern: 'verb-form',
    prompt: l('Choose the correct sentence.', 'সঠিক sentence বাছো।'),
    options: ['I didn’t went to class yesterday.', 'I didn’t go to class yesterday.', 'I not went to class yesterday.'], answer: 'I didn’t go to class yesterday.',
    explanation: l('didn’t + base verb (go).', 'didn’t + base verb (go)।'),
    why: { 'I didn’t went to class yesterday.': l('"did" already shows the past; the verb stays "go".', '"did"-ই past দেখায়; verb "go" থাকে।'), 'I not went to class yesterday.': l('English needs "did not / didn’t" for past negatives.', 'Past negative-এ "did not / didn’t" লাগে।') },
  },
  {
    id: 't-4-p1', type: 'choice', tag: 'tense', concept: 'past-simple', pattern: 'verb-form',
    prompt: l('Choose the correct question.', 'সঠিক প্রশ্ন বাছো।'),
    options: ['Did you visited your grandparents?', 'Did you visit your grandparents?', 'Do you visited your grandparents?'], answer: 'Did you visit your grandparents?',
    explanation: l('Did + subject + base verb. The past is already in "did".', 'Did + subject + base verb। Past আগেই "did"-এ আছে।'),
    why: { 'Did you visited your grandparents?': l('Only one past marker: "did". The verb stays "visit".', 'Past-এর চিহ্ন একটাই: "did"। Verb "visit" থাকে।'), 'Do you visited your grandparents?': l('"Do" is present; a past question needs "Did".', '"Do" present; অতীতের প্রশ্নে "Did" লাগে।') },
  },
  {
    id: 't-4-p2', type: 'choice', tag: 'tense', concept: 'past-simple', pattern: 'tense-time',
    prompt: l('Speaking Part 2: choose the best sentence for your story.', 'Speaking Part 2: গল্পের জন্য সবচেয়ে ভালো sentence বাছো।'),
    options: ['Two years ago, my family and I go to Sajek.', 'Two years ago, my family and I went to Sajek.', 'Two years ago, my family and I have gone to Sajek.'],
    answer: 'Two years ago, my family and I went to Sajek.',
    explanation: l('"ago" = a finished past time → went.', '"ago" = শেষ হওয়া অতীত → went।'),
    why: { 'Two years ago, my family and I go to Sajek.': l('The time word is past; the verb must be past too.', 'Time word অতীতের; verb-ও past হতে হবে।'), 'Two years ago, my family and I have gone to Sajek.': l('"ago" is a finished time → not present perfect.', '"ago" শেষ হওয়া সময় → present perfect না।') },
  },
];

const psRecall: Exercise[] = [
  {
    id: 't-4-e2', type: 'gap', tag: 'tense', concept: 'past-simple', pattern: 'verb-form',
    prompt: l('Write the past simple of "fall".', '"fall"-এর past simple লেখো।'),
    sentence: 'Coal consumption ___ to its lowest point in 2020.',
    accepted: ['fell'],
    explanation: l('fall → fell (irregular).', 'fall → fell (irregular)।'),
    why: { falled: l('"fall" is irregular: fell, not falled.', '"fall" irregular: fell, falled না।'), fallen: l('"fallen" is the past participle (has fallen).', '"fallen" past participle (has fallen)।') },
  },
  {
    id: 't-4-e3', type: 'correct', tag: 'tense', concept: 'past-simple', pattern: 'tense-time',
    prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'Last year I go to Cox’s Bazar with my family.',
    accepted: ["Last year I went to Cox's Bazar with my family.", "Last year, I went to Cox's Bazar with my family."],
    explanation: l('"Last year" → past simple: go → went.', '"Last year" → past simple: go → went।'),
  },
  {
    id: 't-4-e5', type: 'gap', tag: 'tense', concept: 'past-simple',
    prompt: l('Complete with the past simple of "remain".', '"remain"-এর past simple বসাও।'),
    sentence: 'Between 1995 and 2000, the figure ___ stable at around 40%.',
    accepted: ['remained'],
    explanation: l('Finished period → "remained".', 'শেষ হওয়া সময় → "remained"।'),
  },
  {
    id: 't-4-r1', type: 'correct', tag: 'tense', concept: 'past-simple', pattern: 'past-vs-perfect',
    prompt: l('Fix the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'I have went to Dhaka yesterday.',
    accepted: ['I went to Dhaka yesterday.'],
    explanation: l('"yesterday" is finished → past simple "went". ("have went" is also a wrong form: it would be "have gone".)', '"yesterday" শেষ → past simple "went"। ("have went" form-ও ভুল: হতো "have gone"।)'),
  },
];

const psChallenge: Exercise[] = [
  {
    id: 't-4-c1', type: 'choice', tag: 'tense', concept: 'past-simple', pattern: 'past-vs-perfect',
    prompt: l('Why is "Sales have increased in 2015" wrong?', '"Sales have increased in 2015" কেন ভুল?'),
    options: ['"in 2015" is a finished time, so it needs the past simple', '"Sales" must be singular', '"increased" is an irregular verb'],
    answer: '"in 2015" is a finished time, so it needs the past simple',
    explanation: l('Finished time → past simple: Sales increased in 2015.', 'শেষ হওয়া সময় → past simple: Sales increased in 2015।'),
  },
  {
    id: 't-4-c2', type: 'spot', tag: 'tense', concept: 'past-simple', pattern: 'verb-form',
    prompt: l('One word breaks this Task 1 sentence. Tap it, then fix it.', 'একটা word Task 1 sentence-টা ভাঙছে। Tap করে ঠিক করো।'),
    words: ['The', 'number', 'of', 'visitors', 'rised', 'to', '5,000', 'in', '2018.'], wrong: 4,
    accepted: ['rose'], fixOptions: ['rose', 'risen', 'raised'],
    explanation: l('rise → rose (irregular). "raised" needs an object (raise prices).', 'rise → rose (irregular)। "raised"-এর object লাগে (raise prices)।'),
  },
  {
    id: 't-4-c3', type: 'choice', tag: 'tense', concept: 'past-simple',
    prompt: l('Listening: "I booked the room on Monday, but I changed it to Wednesday yesterday." When is the booking now?', 'Listening: "I booked the room on Monday, but I changed it to Wednesday yesterday." এখন booking কবে?'),
    options: ['Wednesday', 'Monday', 'Yesterday'], answer: 'Wednesday',
    explanation: l('Two past actions: booked (Monday), then changed (to Wednesday). The later change wins.', 'অতীতের দুটো কাজ: booked (Monday), তারপর changed (Wednesday)। পরের পরিবর্তনটাই শেষ কথা।'),
  },
];

export const pastSimpleV2: Lesson = {
  id: 't-4',
  format: 'v2',
  concept: 'past-simple',
  title: l('Past Simple', 'Past Simple'),
  why: l('Finished time: the tense of most Task 1 graphs and Part 2 stories.', 'শেষ হয়ে যাওয়া সময়: বেশিরভাগ Task 1 graph আর Part 2-এর গল্পের tense।'),
  minutes: 12,
  difficulty: 'easy',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 1 graph', 'একটা Task 1 graph'),
      situation: l('A graph shows car sales in Bangladesh: 20,000 in 2010 and 45,000 in 2015.', 'একটা graph-এ Bangladesh-এর গাড়ি বিক্রি: 2010-এ 20,000 আর 2015-এ 45,000।'),
      question: l('Which sentence would you write?', 'কোন sentence-টা লিখবে?'),
      options: ['Car sales increase from 20,000 in 2010 to 45,000 in 2015.', 'Car sales have increased from 20,000 in 2010 to 45,000 in 2015.', 'Car sales increased from 20,000 in 2010 to 45,000 in 2015.'],
      answer: 'Car sales increased from 20,000 in 2010 to 45,000 in 2015.',
      diagnose: {
        'Car sales increase from 20,000 in 2010 to 45,000 in 2015.': l('Present simple is for things true now or always. 2010–2015 is over.', 'Present simple এখনকার বা সবসময়ের সত্যের জন্য। 2010–2015 শেষ হয়ে গেছে।'),
        'Car sales have increased from 20,000 in 2010 to 45,000 in 2015.': l('Very common! "have increased" feels like Bangla "বেড়েছে". But with finished years, English uses the past simple.', 'খুব common! "have increased" বাংলার "বেড়েছে"-এর মতো লাগে। কিন্তু শেষ হওয়া বছরের সাথে English-এ past simple।'),
        'Car sales increased from 20,000 in 2010 to 45,000 in 2015.': l('Right. The years are finished → past simple.', 'ঠিক। বছরগুলো শেষ → past simple।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করো'),
      items: [
        { en: 'I visited Sylhet last year.', note: l('last year', 'last year') },
        { en: 'The bridge opened in 1998.', note: l('in 1998', 'in 1998') },
        { en: 'She moved to Dhaka three years ago.', note: l('three years ago', 'three years ago') },
        { en: 'When I was a child, I lived in a village.', note: l('when I was a child', 'when I was a child') },
      ],
      question: l('What do all four sentences have?', 'চারটা sentence-এরই কী আছে?'),
      options: [
        l('A finished time in the past, and a past verb', 'অতীতের একটা শেষ হওয়া সময়, আর past verb'),
        l('A time that continues until now', 'এখন পর্যন্ত চলতে থাকা সময়'),
        l('No time word at all', 'কোনো time word নেই'),
      ],
      answer: 0,
      pattern: l(
        'A finished time (last year, in 1998, ago, when I was…) + past simple. The time is over, so the verb is past: visited, opened, moved, lived.',
        'শেষ হওয়া সময় (last year, in 1998, ago, when I was…) + past simple। সময়টা শেষ, তাই verb-ও past: visited, opened, moved, lived।',
      ),
    },
    {
      kind: 'concept',
      title: l('When to use it — and when not to', 'কখন ব্যবহার করবে — আর কখন না'),
      body: l(
        'Use the past simple for actions and situations that finished in the past, especially with a finished time (in 2010, last year, when I was a child). Regular verbs add -ed; many common verbs are irregular.',
        'অতীতে শেষ হয়ে যাওয়া কাজ বা অবস্থার জন্য past simple, বিশেষ করে শেষ হয়ে যাওয়া সময়ের সাথে (in 2010, last year, when I was a child)। Regular verb-এ -ed যোগ হয়; অনেক common verb irregular।',
      ),
      points: [
        l('Regular: increase → increased, decline → declined, stay → stayed.', 'Regular: increase → increased, decline → declined, stay → stayed।'),
        l('Irregular: rise → rose, fall → fell, grow → grew, go → went.', 'Irregular: rise → rose, fall → fell, grow → grew, go → went।'),
        l('Negative / question: did not + base verb; Did + subject + base verb?', 'Negative / question: did not + base verb; Did + subject + base verb?'),
        l('NOT when the time continues until now (since 2019, so far): use the present perfect.', 'সময় এখন পর্যন্ত চললে না (since 2019, so far): তখন present perfect।'),
        l('Why Bangla speakers slip: "গিয়েছি" feels like "have gone", so "I have gone yesterday" appears. With "yesterday", English only accepts "I went".', 'বাংলাভাষীরা কেন ভুল করে: "গিয়েছি" শুনে "have gone" মনে হয়, তাই "I have gone yesterday" চলে আসে। "yesterday"-এর সাথে English শুধু "I went" মানে।'),
      ],
      timeline: [
        { sentence: 'Sales rose in 2015.', picture: 'finished', label: l('Finished time', 'শেষ হওয়া সময়') },
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'Population increased significantly between 2000 and 2010.', note: l('Why "increased"? Because the time period (2000–2010) is finished.', 'কেন "increased"? কারণ সময়টা (2000–2010) শেষ হয়ে গেছে।') },
        { en: 'Sales fell to 200 units in 2015.', note: l('Irregular: fall → fell.', 'Irregular: fall → fell।') },
        { en: 'I didn’t enjoy school when I was younger.', note: l('did not + base verb (enjoy).', 'did not + base verb (enjoy)।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'The number of cars rose from 2 million in 1990 to 5 million in 2010.', note: l('Task 1 with past years: past simple for every trend.', 'Task 1-এ অতীতের বছর: প্রতিটা trend-এ past simple।') },
        { skill: 'speaking', example: 'I met my best friend when I was in class six.', note: l('Part 2 "Describe a time when…" is a past story.', 'Part 2 "Describe a time when…" একটা অতীতের গল্প।') },
        { skill: 'reading', example: 'The bridge was completed in 1932.', note: l('History passages: dates + past simple. Scan for the year.', 'ইতিহাসের passage: তারিখ + past simple। বছরটা scan করো।') },
        { skill: 'listening', example: 'I booked it last week, but I changed the date yesterday.', note: l('Past actions in Part 1 conversations; the later change is the answer.', 'Part 1-এর কথোপকথনে অতীতের কাজ; পরের পরিবর্তনটাই উত্তর।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I have went to Dhaka yesterday.', right: 'I went to Dhaka yesterday.', why: l('"yesterday" is finished → past simple. ("have went" is also a wrong form.)', '"yesterday" শেষ → past simple। ("have went" form-ও ভুল।)') },
        { wrong: 'I didn’t went to class.', right: 'I didn’t go to class.', why: l('didn’t + base verb.', 'didn’t + base verb।') },
        { wrong: 'Sales rised in 2018.', right: 'Sales rose in 2018.', why: l('rise → rose (irregular).', 'rise → rose (irregular)।') },
        { wrong: 'Last year I go to Sylhet.', right: 'Last year I went to Sylhet.', why: l('The time word is past → the verb is past.', 'Time word অতীতের → verb-ও past।') },
      ],
    },
    { kind: 'practice', mode: 'practice', title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'), exercises: psPractice },
    { kind: 'practice', mode: 'recall', title: l('Active recall: no options', 'Active recall: কোনো option নেই'), exercises: psRecall },
    { kind: 'practice', title: l('Mini challenge', 'Mini challenge'), exercises: psChallenge },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 1 sentence and a memory', 'এবার তোমার পালা: একটা Task 1 sentence আর একটা স্মৃতি'),
      exercises: [
        {
          id: 't-4-e6', type: 'write', tag: 'tense', concept: 'past-simple',
          prompt: l('In 2000, 30% of students used the library; in 2010 it was 50%. Write one Task 1 sentence. Then add one sentence about something you did last weekend.', '2000-এ 30% student library ব্যবহার করত; 2010-এ 50%। একটা Task 1 sentence লেখো। তারপর গত weekend-এ তুমি কী করেছিলে তা নিয়ে এক sentence।'),
          model: 'The percentage of students who used the library rose from 30% in 2000 to 50% in 2010. Last weekend, I visited my grandparents in Cumilla.',
          checklist: [l('Past simple trend verb (rose, increased)', 'Past simple trend verb (rose, increased)'), l('from … to … with the years', 'বছর সহ from … to …'), l('A past time word in your own sentence', 'নিজের sentence-এ অতীতের time word')],
          explanation: l('Finished time → past simple, in writing and in speaking.', 'শেষ হওয়া সময় → past simple, লেখায় আর কথায় দুই জায়গাতেই।'),
          mino: {
            task: 'The student writes one IELTS Task 1 sentence about data from 2000 and 2010, and one sentence about last weekend. Check the past simple: finished times (in 2000, last weekend, ago) need past simple, never present perfect ("have increased in 2010" is wrong); irregular forms (rose, fell, grew, went); did + base verb in negatives and questions. If the student uses "have/has" with a finished time, explain that the time word is finished so Past Simple is needed, and separately point out any wrong verb form (e.g. "have went" → "went" / "have gone").',
            target: l('Past simple with a finished time', 'শেষ হওয়া সময়ের সাথে Past simple'),
          },
        },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('Finished time (in 2009, last year, ago) → past simple.', 'শেষ হওয়া সময় (in 2009, last year, ago) → past simple।'),
        l('rise → rose · fall → fell · grow → grew · go → went', 'rise → rose · fall → fell · grow → grew · go → went'),
        l('didn’t / Did + base verb.', 'didn’t / Did + base verb।'),
      ],
    },
  ],
};

// ======================================================================= 5
const pcoPractice: Exercise[] = [
  {
    id: 't-5-e1', type: 'choice', tag: 'tense', concept: 'past-continuous',
    prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
    sentence: 'I ___ dinner when the phone rang.',
    options: ['cooked', 'was cooking', 'am cooking'], answer: 'was cooking',
    explanation: l('Cooking was in progress when the phone rang → past continuous.', 'Phone বাজার সময় রান্না চলছিল → past continuous।'),
    why: { cooked: l('Past simple suggests I cooked after the phone rang — a different meaning.', 'Past simple বোঝায় phone বাজার পরে রান্না করেছি — অর্থ বদলে যায়।'), 'am cooking': l('Present, but the phone rang in the past.', 'Present, কিন্তু phone বেজেছিল অতীতে।') },
  },
  {
    id: 't-5-e4', type: 'choice', tag: 'tense', concept: 'past-continuous',
    prompt: l('"What were you doing at 9 p.m. yesterday?" Choose the answer.', '"What were you doing at 9 p.m. yesterday?" answer বাছো।'),
    sentence: 'At 9 p.m. yesterday, I ___ a documentary.',
    options: ['watched', 'was watching', 'am watching'], answer: 'was watching',
    explanation: l('An action in progress at a moment in the past → was + verb-ing.', 'অতীতের একটা মুহূর্তে চলছিল → was + verb-ing।'),
    why: { watched: l('Past simple is a complete action; "at 9 p.m." asks what was in progress.', 'Past simple সম্পূর্ণ কাজ; "at 9 p.m." জানতে চায় তখন কী চলছিল।'), 'am watching': l('Present, but the question is about yesterday.', 'Present, কিন্তু প্রশ্ন গতকাল নিয়ে।') },
  },
  {
    id: 't-5-p1', type: 'choice', tag: 'tense', concept: 'past-continuous',
    prompt: l('Which one shows the background of a story?', 'কোনটা গল্পের পটভূমি দেখায়?'),
    options: ['It was raining and people were running for shelter.', 'It rained and people ran for shelter.'],
    answer: 'It was raining and people were running for shelter.',
    explanation: l('The past continuous paints the scene (what was going on); the past simple moves the story forward.', 'Past continuous দৃশ্যটা আঁকে (তখন কী চলছিল); past simple গল্পকে সামনে এগিয়ে নেয়।'),
  },
  {
    id: 't-5-p2', type: 'choice', tag: 'tense', concept: 'past-continuous', pattern: 'verb-form',
    prompt: l('Choose the correct sentence.', 'সঠিক sentence বাছো।'),
    options: ['While we waiting for the bus, it started to rain.', 'While we were waiting for the bus, it started to rain.', 'While we were wait for the bus, it started to rain.'],
    answer: 'While we were waiting for the bus, it started to rain.',
    explanation: l('were + verb-ing: both parts are needed.', 'were + verb-ing: দুটো অংশই লাগে।'),
    why: { 'While we waiting for the bus, it started to rain.': l('"waiting" needs "were" before it.', '"waiting"-এর আগে "were" লাগে।'), 'While we were wait for the bus, it started to rain.': l('After "were" in this tense, use -ing: were waiting.', 'এই tense-এ "were"-এর পরে -ing: were waiting।') },
  },
];

const pcoRecall: Exercise[] = [
  {
    id: 't-5-e2', type: 'gap', tag: 'agreement', concept: 'past-continuous', pattern: 'sv-agreement',
    prompt: l('Complete with was or were.', 'was বা were বসাও।'),
    sentence: 'My friends ___ playing cricket when the storm started.',
    accepted: ['were'],
    explanation: l('Plural subject → "were".', 'Plural subject → "were"।'),
    why: { was: l('"was" is for I / he / she / it; "my friends" is plural.', '"was" I / he / she / it-এর জন্য; "my friends" plural।') },
  },
  {
    id: 't-5-e3', type: 'correct', tag: 'tense', concept: 'past-continuous',
    prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'While I studied, the lights went out.',
    accepted: ['While I was studying, the lights went out.'],
    explanation: l('"While" + an action in progress → "was studying".', '"While" + চলমান কাজ → "was studying"।'),
  },
  {
    id: 't-5-r1', type: 'gap', tag: 'tense', concept: 'past-continuous',
    prompt: l('Write the past continuous of "sleep".', '"sleep"-এর past continuous লেখো।'),
    sentence: 'When the earthquake happened, most people ___.',
    accepted: ['were sleeping'],
    explanation: l('Sleeping was in progress when the earthquake happened → were sleeping.', 'ভূমিকম্পের সময় ঘুম চলছিল → were sleeping।'),
    why: { slept: l('"slept" suggests they went to sleep after the earthquake.', '"slept" বোঝায় ভূমিকম্পের পরে ঘুমিয়েছে।'), 'was sleeping': l('"most people" is plural → were.', '"most people" plural → were।') },
  },
];

const pcoChallenge: Exercise[] = [
  {
    id: 't-5-c1', type: 'choice', tag: 'tense', concept: 'past-continuous',
    prompt: l('"When the teacher came in, we were talking." vs "When the teacher came in, we talked." What is the difference?', '"When the teacher came in, we were talking." আর "When the teacher came in, we talked."-এর পার্থক্য কী?'),
    options: ['First: talking had already started. Second: we started talking after she came in.', 'There is no difference', 'The second one is more formal'],
    answer: 'First: talking had already started. Second: we started talking after she came in.',
    explanation: l('Past continuous = already in progress; past simple = the next event.', 'Past continuous = আগে থেকেই চলছিল; past simple = পরের ঘটনা।'),
  },
  {
    id: 't-5-c2', type: 'spot', tag: 'tense', concept: 'past-continuous', pattern: 'sv-agreement',
    prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করো।'),
    words: ['The', 'children', 'was', 'playing', 'outside', 'when', 'it', 'got', 'dark.'], wrong: 2,
    accepted: ['were'], fixOptions: ['were', 'is', 'are'],
    explanation: l('"The children" is plural → were playing.', '"The children" plural → were playing।'),
  },
  {
    id: 't-5-c3', type: 'choice', tag: 'tense', concept: 'past-continuous',
    prompt: l('Reading: "While Fleming was studying bacteria, he noticed an unusual mould." Which happened first?', 'Reading: "While Fleming was studying bacteria, he noticed an unusual mould." কোনটা আগে থেকে চলছিল?'),
    options: ['He was already studying bacteria', 'He noticed the mould first', 'Both started at the same moment'],
    answer: 'He was already studying bacteria',
    explanation: l('The past continuous (was studying) is the background already in progress.', 'Past continuous (was studying) আগে থেকে চলা পটভূমি।'),
  },
];

export const pastContinuousV2: Lesson = {
  id: 't-5',
  format: 'v2',
  concept: 'past-continuous',
  title: l('Past Continuous', 'Past Continuous'),
  why: l('Background actions in stories — makes Speaking Part 2 answers vivid and well organised.', 'গল্পের পটভূমির কাজ — Speaking Part 2-এর answer জীবন্ত আর গোছানো করে।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('A Part 2 story', 'Part 2-এর একটা গল্প'),
      situation: l('You start your Part 2 story: you were on a rickshaw, it was going along the road, and suddenly it started to rain.', 'তুমি Part 2-এর গল্প শুরু করছো: তুমি rickshaw-তে ছিলে, সেটা রাস্তা দিয়ে যাচ্ছিল, হঠাৎ বৃষ্টি শুরু হলো।'),
      question: l('Which sentence sets the scene best?', 'কোন sentence-টা দৃশ্যটা সবচেয়ে ভালো আঁকে?'),
      options: ['I went home by rickshaw when it started to rain.', 'I was going home by rickshaw when it started to rain.', 'I am going home by rickshaw when it started to rain.'],
      answer: 'I was going home by rickshaw when it started to rain.',
      diagnose: {
        'I went home by rickshaw when it started to rain.': l('This sounds like two quick events one after the other. The ride was already happening, so it needs the past continuous.', 'এটা শুনলে পরপর দুটো ঘটনা মনে হয়। Rickshaw-তে যাওয়া আগে থেকেই চলছিল, তাই past continuous লাগে।'),
        'I was going home by rickshaw when it started to rain.': l('Right. The long action (was going) was in progress; the short one (started) interrupted it.', 'ঠিক। লম্বা কাজ (was going) চলছিল; ছোট কাজ (started) তাতে বাধা দিলো।'),
        'I am going home by rickshaw when it started to rain.': l('"am going" is present, but the story is in the past.', '"am going" present, কিন্তু গল্পটা অতীতের।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করো'),
      items: [
        { en: 'I was walking home when it started to rain.', note: l('walking = long; started = short', 'walking = লম্বা; started = ছোট') },
        { en: 'While we were waiting for the bus, we met our old teacher.', note: l('while + long action', 'while + লম্বা কাজ') },
        { en: 'At 10 p.m., my brother was still studying.', note: l('a moment in the past', 'অতীতের একটা মুহূর্ত') },
        { en: 'The sun was shining and birds were singing.', note: l('the scene of a story', 'গল্পের দৃশ্য') },
      ],
      question: l('What does was / were + verb-ing show in these sentences?', 'এই sentence-গুলোতে was / were + verb-ing কী দেখায়?'),
      options: [
        l('An action that was already in progress at a past moment', 'অতীতের একটা মুহূর্তে আগে থেকেই চলতে থাকা কাজ'),
        l('A finished action that happened quickly', 'দ্রুত ঘটে শেষ হয়ে যাওয়া কাজ'),
        l('A future plan', 'ভবিষ্যতের পরিকল্পনা'),
      ],
      answer: 0,
      pattern: l(
        'was / were + verb-ing = in progress at a past moment. Often a short past simple action (when it started) interrupts it.',
        'was / were + verb-ing = অতীতের একটা মুহূর্তে চলছিল। প্রায়ই একটা ছোট past simple কাজ (when it started) তাতে বাধা দেয়।',
      ),
    },
    {
      kind: 'concept',
      title: l('When to use it — and when not to', 'কখন ব্যবহার করবে — আর কখন না'),
      body: l(
        'Use was / were + verb-ing for an action that was in progress at a moment in the past, often interrupted by a shorter action in the past simple.',
        'অতীতের কোনো মুহূর্তে চলছিল এমন কাজের জন্য was / were + verb-ing, প্রায়ই past simple-এর একটা ছোট কাজ দিয়ে বাধা পায়।',
      ),
      points: [
        l('I / he / she / it was working · you / we / they were working', 'I / he / she / it was working · you / we / they were working'),
        l('Long action (past continuous) + "when" + short action (past simple).', 'লম্বা কাজ (past continuous) + "when" + ছোট কাজ (past simple)।'),
        l('"while" + long action: While I was studying, the power went out.', '"while" + লম্বা কাজ: While I was studying, the power went out।'),
        l('NOT for a list of finished events: "I woke up, had breakfast and left" (all past simple).', 'পরপর শেষ হওয়া ঘটনার তালিকায় না: "I woke up, had breakfast and left" (সব past simple)।'),
        l('NOT with state verbs: "I knew him", not "I was knowing him".', 'State verb-এর সাথে না: "I knew him", "I was knowing him" না।'),
      ],
      timeline: [
        { sentence: 'I was walking home when it started to rain.', picture: 'finished', label: l('Long action + interruption', 'লম্বা কাজ + বাধা') },
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'I was walking home when it started to rain.', note: l('Walking = background; started = the interruption.', 'Walking = পটভূমি; started = বাধা।') },
        { en: 'While we were waiting for the bus, we met our old teacher.', note: l('"while" + past continuous.', '"while" + past continuous।') },
        { en: 'At midnight the whole family was sleeping, so nobody heard the thief.', note: l('A past moment + what was in progress.', 'অতীতের একটা মুহূর্ত + তখন কী চলছিল।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'I was travelling to Sylhet by train when I first saw the tea gardens.', note: l('Part 2 stories: set the scene, then the event.', 'Part 2-এর গল্প: আগে দৃশ্য, তারপর ঘটনা।') },
        { skill: 'writing', example: 'While the population was growing, the number of hospitals remained the same.', note: l('Task 1 or 2: two things happening over the same past period.', 'Task 1 বা 2: একই অতীত সময়ে দুটো জিনিস চলছিল।') },
        { skill: 'reading', example: 'While he was studying moulds, Fleming noticed something unusual.', note: l('Science history: what they were doing when they discovered something.', 'বিজ্ঞানের ইতিহাস: আবিষ্কারের সময় তাঁরা কী করছিলেন।') },
        { skill: 'listening', example: 'I was waiting at the station when they announced the delay.', note: l('Part 3 and 4 speakers describe past situations this way.', 'Part 3 আর 4-এর বক্তারা এভাবে অতীতের অবস্থা বর্ণনা করেন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'While I studied, the lights went out.', right: 'While I was studying, the lights went out.', why: l('"while" + an action in progress.', '"while" + চলমান কাজ।') },
        { wrong: 'My friends was playing cricket.', right: 'My friends were playing cricket.', why: l('Plural → were.', 'Plural → were।') },
        { wrong: 'We waiting for the bus when it rained.', right: 'We were waiting for the bus when it rained.', why: l('-ing needs was / were.', '-ing-এর সাথে was / were লাগে।') },
      ],
    },
    { kind: 'practice', mode: 'practice', title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'), exercises: pcoPractice },
    { kind: 'practice', mode: 'recall', title: l('Active recall: no options', 'Active recall: কোনো option নেই'), exercises: pcoRecall },
    { kind: 'practice', title: l('Mini challenge', 'Mini challenge'), exercises: pcoChallenge },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: open a Part 2 story', 'এবার তোমার পালা: Part 2-এর গল্প শুরু করো'),
      exercises: [
        {
          id: 't-5-e5', type: 'write', tag: 'tense', concept: 'past-continuous',
          prompt: l('Speaking Part 2: "Describe a time when you were surprised." Write the first 2 sentences: start with "I was … when …".', 'Speaking Part 2: "Describe a time when you were surprised." প্রথম ২টা sentence লেখো: "I was … when …" দিয়ে শুরু করো।'),
          model: 'I was studying for my HSC exams when my uncle called with some great news. While we were talking, my mother came in with a cake.',
          checklist: [l('was/were + verb-ing for the background', 'পটভূমির জন্য was/were + verb-ing'), l('"when" + past simple for the event', 'ঘটনার জন্য "when" + past simple')],
          explanation: l('A strong way to open a Part 2 story.', 'Part 2-এর গল্প শুরু করার একটা ভালো উপায়।'),
          mino: {
            task: 'The student opens a Speaking Part 2 story with "I was … when …". Check the past continuous (was/were + verb-ing, was vs were with the subject) for the background action and the past simple for the interrupting event after "when"; "while" + past continuous. If the student uses the past simple for the background or the continuous for the short event, explain the difference in meaning using their own sentence.',
            target: l('was / were + verb-ing … when + past simple', 'was / were + verb-ing … when + past simple'),
          },
        },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('was/were + verb-ing = in progress in the past.', 'was/were + verb-ing = অতীতে চলছিল।'),
        l('Long action (was doing) + when + short action (did).', 'লম্বা কাজ (was doing) + when + ছোট কাজ (did)।'),
        l('Plural or you → were; I / he / she / it → was.', 'Plural বা you → were; I / he / she / it → was।'),
      ],
    },
  ],
};

// ======================================================================= 6
const ppPractice: Exercise[] = [
  {
    id: 't-6-e1', type: 'choice', tag: 'tense', concept: 'present-perfect', pattern: 'past-vs-perfect',
    prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
    sentence: 'I ___ in Dhaka since 2019.',
    options: ['live', 'lived', 'have lived'], answer: 'have lived',
    explanation: l('"since 2019" = from 2019 until now → present perfect.', '"since 2019" = 2019 থেকে এখন পর্যন্ত → present perfect।'),
    why: { live: l('Present simple does not show the time from 2019 until now.', 'Present simple 2019 থেকে এখন পর্যন্ত সময়টা দেখায় না।'), lived: l('Past simple means it is finished — but you still live there.', 'Past simple মানে শেষ হয়ে গেছে — কিন্তু তুমি এখনো সেখানে থাকো।') },
  },
  {
    id: 't-6-e2', type: 'choice', tag: 'tense', concept: 'present-perfect',
    prompt: l('since or for?', 'since নাকি for?'),
    sentence: 'She has worked here ___ five years.',
    options: ['since', 'for'], answer: 'for',
    explanation: l('"five years" is a period → "for".', '"five years" একটা সময়ের দৈর্ঘ্য → "for"।'),
    why: { since: l('"since" needs a starting point (since 2020), not a length of time.', '"since"-এর সাথে শুরুর বিন্দু লাগে (since 2020), সময়ের দৈর্ঘ্য না।') },
  },
  {
    id: 't-6-e5', type: 'choice', tag: 'tense', concept: 'present-perfect', pattern: 'verb-form',
    prompt: l('Choose the correct sentence for a Task 2 introduction.', 'Task 2 introduction-এর জন্য সঠিক sentence বাছো।'),
    options: ['In recent years, social media has changed the way people communicate.', 'In recent years, social media changed the way people communicate yesterday.', 'In recent years, social media has change the way people communicate.'],
    answer: 'In recent years, social media has changed the way people communicate.',
    explanation: l('"In recent years" + has + past participle (changed).', '"In recent years" + has + past participle (changed)।'),
    why: { 'In recent years, social media has change the way people communicate.': l('After has/have use the past participle: changed.', 'has/have-এর পরে past participle: changed।'), 'In recent years, social media changed the way people communicate yesterday.': l('"In recent years" and "yesterday" cannot go together.', '"In recent years" আর "yesterday" একসাথে যায় না।') },
  },
  {
    id: 't-6-p1', type: 'choice', tag: 'tense', concept: 'present-perfect', pattern: 'past-vs-perfect',
    prompt: l('Examiner: "Have you ever been to a foreign country?"', 'Examiner: "Have you ever been to a foreign country?"'),
    options: ['Yes, I have been to India twice.', 'Yes, I have been to India last year.', 'Yes, I go to India twice.'],
    answer: 'Yes, I have been to India twice.',
    explanation: l('Experience with no finished time → present perfect.', 'শেষ হওয়া সময় ছাড়া অভিজ্ঞতা → present perfect।'),
    why: { 'Yes, I have been to India last year.': l('"last year" is finished → "I went to India last year".', '"last year" শেষ → "I went to India last year"।'), 'Yes, I go to India twice.': l('Present simple is for routines; "twice" in your life is an experience.', 'Present simple রুটিনের জন্য; জীবনে "twice" একটা অভিজ্ঞতা।') },
  },
];

const ppRecall: Exercise[] = [
  {
    id: 't-6-e3', type: 'correct', tag: 'tense', concept: 'present-perfect', pattern: 'past-vs-perfect',
    prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'I have visited Cox’s Bazar last year.',
    accepted: ["I visited Cox's Bazar last year."],
    explanation: l('"last year" is a finished time → past simple "visited".', '"last year" শেষ হওয়া সময় → past simple "visited"।'),
  },
  {
    id: 't-6-e4', type: 'gap', tag: 'agreement', concept: 'present-perfect', pattern: 'sv-agreement',
    prompt: l('Complete with have or has.', 'have বা has বসাও।'),
    sentence: 'The number of cars ___ doubled since 2000.',
    accepted: ['has'],
    explanation: l('"The number" is singular → "has".', '"The number" singular → "has"।'),
    why: { have: l('The head word is "number" (singular), not "cars".', 'মূল শব্দ "number" (singular), "cars" না।') },
  },
  {
    id: 't-6-r1', type: 'gap', tag: 'tense', concept: 'present-perfect', pattern: 'verb-form',
    prompt: l('Write the present perfect of "grow". No options!', '"grow"-এর present perfect লেখো। কোনো option নেই!'),
    sentence: 'Online shopping ___ rapidly since 2015.',
    accepted: ['has grown'],
    explanation: l('since 2015 → has + past participle: grown.', 'since 2015 → has + past participle: grown।'),
    why: { 'has grew': l('After has, use the participle: grown (not grew).', 'has-এর পরে participle: grown (grew না)।'), grew: l('"since 2015" connects to now → has grown.', '"since 2015" এখনের সাথে যুক্ত → has grown।'), 'have grown': l('"Online shopping" is singular → has.', '"Online shopping" singular → has।') },
  },
  {
    id: 't-6-r2', type: 'correct', tag: 'tense', concept: 'present-perfect', pattern: 'past-vs-perfect',
    prompt: l('Fix the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'I know him since 2018.',
    accepted: ['I have known him since 2018.'],
    explanation: l('"since 2018" → from then until now → have known.', '"since 2018" → তখন থেকে এখন → have known।'),
  },
];

const ppChallenge: Exercise[] = [
  {
    id: 't-6-c1', type: 'choice', tag: 'tense', concept: 'present-perfect', pattern: 'past-vs-perfect',
    prompt: l('"I have lived in Khulna for 5 years" vs "I lived in Khulna for 5 years". What is the difference?', '"I have lived in Khulna for 5 years" আর "I lived in Khulna for 5 years"-এর পার্থক্য কী?'),
    options: ['First: I still live there. Second: I don’t live there any more.', 'No difference', 'The second one is wrong grammar'],
    answer: 'First: I still live there. Second: I don’t live there any more.',
    explanation: l('Present perfect connects to now; past simple is finished.', 'Present perfect এখনের সাথে যুক্ত; past simple শেষ।'),
  },
  {
    id: 't-6-c2', type: 'spot', tag: 'tense', concept: 'present-perfect', pattern: 'verb-form',
    prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করো।'),
    words: ['Prices', 'have', 'rose', 'every', 'year', 'since', '2020.'], wrong: 2,
    accepted: ['risen'], fixOptions: ['risen', 'raised', 'rise'],
    explanation: l('have + past participle: risen.', 'have + past participle: risen।'),
  },
  {
    id: 't-6-c3', type: 'choice', tag: 'tense', concept: 'present-perfect',
    prompt: l('Reading: "Scientists have not yet found a cure." Statement: "A cure has been found." ', 'Reading: "Scientists have not yet found a cure." Statement: "A cure has been found."'),
    options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE',
    explanation: l('"have not yet found" = still not found now → FALSE.', '"have not yet found" = এখনো পাওয়া যায়নি → FALSE।'),
  },
];

export const presentPerfectV2: Lesson = {
  id: 't-6',
  format: 'v2',
  concept: 'present-perfect',
  title: l('Present Perfect', 'Present Perfect'),
  why: l('Connects the past to now — essential for trends "since 2010" and for talking about experience.', 'অতীতকে এখনের সাথে যুক্ত করে — "since 2010" ধরনের trend আর অভিজ্ঞতার কথা বলতে অপরিহার্য।'),
  minutes: 13,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('A Part 1 question', 'Part 1-এর একটা প্রশ্ন'),
      situation: l('Examiner: "How long have you lived in your hometown?" You moved there in 2015 and still live there.', 'Examiner: "How long have you lived in your hometown?" তুমি 2015-এ সেখানে গিয়েছো, এখনো সেখানেই থাকো।'),
      question: l('What do you answer?', 'তুমি কী উত্তর দেবে?'),
      options: ['I live there since 2015.', 'I lived there since 2015.', 'I have lived there since 2015.'],
      answer: 'I have lived there since 2015.',
      diagnose: {
        'I live there since 2015.': l('Natural in Bangla ("২০১৫ থেকে থাকি"), but English needs a tense that joins the past to now: have lived.', 'বাংলায় স্বাভাবিক ("২০১৫ থেকে থাকি"), কিন্তু English-এ অতীত আর এখনকে জোড়ার tense লাগে: have lived।'),
        'I lived there since 2015.': l('"lived" means it is over — but you still live there.', '"lived" মানে শেষ হয়ে গেছে — কিন্তু তুমি এখনো সেখানেই থাকো।'),
        'I have lived there since 2015.': l('Right. From 2015 until now → have + past participle.', 'ঠিক। 2015 থেকে এখন পর্যন্ত → have + past participle।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করো'),
      items: [
        { en: 'I have lived in Dhaka since 2019.', note: l('started in the past, still true', 'অতীতে শুরু, এখনো সত্য') },
        { en: 'She has visited Sylhet three times.', note: l('experience, no exact time', 'অভিজ্ঞতা, নির্দিষ্ট সময় নেই') },
        { en: 'Online shopping has become very popular in recent years.', note: l('a change that matters now', 'এখনো প্রাসঙ্গিক পরিবর্তন') },
        { en: 'I have just finished my assignment.', note: l('a recent action, result now', 'সাম্প্রতিক কাজ, ফল এখন') },
      ],
      question: l('What links all four sentences?', 'চারটা sentence-কে কী যুক্ত করে?'),
      options: [
        l('The past is connected to now, and no finished time is given', 'অতীত এখনের সাথে যুক্ত, আর কোনো শেষ হওয়া সময় দেওয়া নেই'),
        l('They all happened at a clear finished time', 'সবগুলো একটা পরিষ্কার শেষ হওয়া সময়ে ঘটেছে'),
        l('They are all future plans', 'সবগুলো ভবিষ্যতের পরিকল্পনা'),
      ],
      answer: 0,
      pattern: l(
        'have / has + past participle joins the past to now. Notice what is missing: no "yesterday", "last year" or "in 2010".',
        'have / has + past participle অতীতকে এখনের সাথে জোড়ে। কী নেই খেয়াল করো: "yesterday", "last year" বা "in 2010" নেই।',
      ),
    },
    {
      kind: 'concept',
      title: l('When to use it — and when not to', 'কখন ব্যবহার করবে — আর কখন না'),
      body: l(
        'Use have / has + past participle for (1) situations from the past until now (with since / for), (2) experiences at an unknown time ("I have visited Sylhet"), and (3) recent changes that matter now.',
        'have / has + past participle ব্যবহার হয় (১) অতীত থেকে এখন পর্যন্ত চলা অবস্থায় (since / for সহ), (২) অজানা সময়ের অভিজ্ঞতায় ("I have visited Sylhet"), আর (৩) সাম্প্রতিক পরিবর্তন যা এখন গুরুত্বপূর্ণ।',
      ),
      points: [
        l('I / you / we / they have worked · he / she / it has worked', 'I / you / we / they have worked · he / she / it has worked'),
        l('since + a point in time (since 2015) · for + a period (for five years)', 'since + সময়ের একটা বিন্দু (since 2015) · for + সময়ের দৈর্ঘ্য (for five years)'),
        l('Irregular participles: risen, fallen, grown, been, done, seen, gone.', 'Irregular participle: risen, fallen, grown, been, done, seen, gone।'),
        l('NOT with a finished time: yesterday, last year, in 2010, ago → past simple.', 'শেষ হওয়া সময়ের সাথে না: yesterday, last year, in 2010, ago → past simple।'),
        l('Why Bangla speakers slip: "২০১৫ থেকে থাকি" uses the present, so "I live here since 2015" feels right. English needs "have lived".', 'বাংলাভাষীরা কেন ভুল করে: "২০১৫ থেকে থাকি"-তে present, তাই "I live here since 2015" ঠিক মনে হয়। English-এ "have lived" লাগে।'),
      ],
      timeline: [
        { sentence: 'I have lived in Dhaka since 2019.', picture: 'past-to-now', label: l('Past → now', 'অতীত → এখন') },
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'I have lived in Dhaka since 2019.', note: l('Started in 2019, still true now.', '2019-এ শুরু, এখনো সত্য।') },
        { en: 'Online shopping has become very popular in recent years.', note: l('Recent change that matters now.', 'সাম্প্রতিক পরিবর্তন, এখনো প্রাসঙ্গিক।') },
        { en: 'I visited Sylhet last year.', note: l('"last year" is finished → past simple, not present perfect.', '"last year" শেষ → past simple, present perfect না।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'In recent decades, the number of international students has grown rapidly.', note: l('Task 2 background sentences: "in recent years", "has grown".', 'Task 2-এর background sentence: "in recent years", "has grown"।') },
        { skill: 'speaking', example: 'I’ve been interested in photography since I was a teenager.', note: l('Part 1 and 3: connecting your past to now.', 'Part 1 আর 3: তোমার অতীতকে এখনের সাথে যুক্ত করা।') },
        { skill: 'reading', example: 'Researchers have not yet found a cure.', note: l('"have not yet" = still not true now → important for TRUE/FALSE/NOT GIVEN.', '"have not yet" = এখনো সত্য না → TRUE/FALSE/NOT GIVEN-এ গুরুত্বপূর্ণ।') },
        { skill: 'listening', example: 'I’ve already paid the deposit.', note: l('Part 1: "already", "just", "yet" tell you what is done.', 'Part 1: "already", "just", "yet" বলে দেয় কী হয়ে গেছে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I have visited Cox’s Bazar last year.', right: 'I visited Cox’s Bazar last year.', why: l('Finished time → past simple.', 'শেষ হওয়া সময় → past simple।') },
        { wrong: 'I live here since 2015.', right: 'I have lived here since 2015.', why: l('since + until now → present perfect.', 'since + এখন পর্যন্ত → present perfect।') },
        { wrong: 'Prices have rose.', right: 'Prices have risen.', why: l('have + past participle (risen).', 'have + past participle (risen)।') },
        { wrong: 'She has worked here since five years.', right: 'She has worked here for five years.', why: l('A length of time → for.', 'সময়ের দৈর্ঘ্য → for।') },
      ],
    },
    { kind: 'practice', mode: 'practice', title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'), exercises: ppPractice },
    { kind: 'practice', mode: 'recall', title: l('Active recall: no options', 'Active recall: কোনো option নেই'), exercises: ppRecall },
    { kind: 'practice', title: l('Mini challenge', 'Mini challenge'), exercises: ppChallenge },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: how long, and what changed', 'এবার তোমার পালা: কতদিন ধরে, আর কী বদলেছে'),
      exercises: [
        {
          id: 't-6-e6', type: 'write', tag: 'tense', concept: 'present-perfect',
          prompt: l('Speaking Part 1: "How long have you lived in your hometown? How has it changed?" Answer in 2 sentences.', 'Speaking Part 1: "How long have you lived in your hometown? How has it changed?" ২টা sentence-এ উত্তর দাও।'),
          model: 'I’ve lived in Rangpur since I was born, so about twenty years. It has changed a lot — the roads have become much wider.',
          checklist: [l('have/has + past participle', 'have/has + past participle'), l('since or for used correctly', 'since বা for ঠিকভাবে'), l('No finished time with the present perfect', 'Present perfect-এর সাথে শেষ হওয়া সময় নেই')],
          explanation: l('Answer "How long…?" with the present perfect + since/for.', '"How long…?"-এর answer: present perfect + since/for।'),
          mino: {
            task: 'The student answers "How long have you lived in your hometown? How has it changed?". Check the present perfect: have/has + past participle (correct irregular participles: grown, become, risen), since + a point in time vs for + a period, has with singular subjects, and NO finished time words (last year, in 2010, ago) with the present perfect. If the student mixes Past Simple and Present Perfect, point to the time word in their sentence that decides the tense.',
            target: l('have / has + past participle · since / for', 'have / has + past participle · since / for'),
          },
        },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('have/has + past participle = past → now.', 'have/has + past participle = অতীত → এখন।'),
        l('since 2015 · for five years', 'since 2015 · for five years'),
        l('Never with yesterday, last year, in 2010.', 'yesterday, last year, in 2010-এর সাথে কখনো না।'),
      ],
    },
  ],
};

// ======================================================================= 7
const pfPractice: Exercise[] = [
  {
    id: 't-7-e1', type: 'choice', tag: 'tense', concept: 'past-perfect',
    prompt: l('Choose the correct form.', 'সঠিক form বাছো।'),
    sentence: 'When we reached the station, the train ___.',
    options: ['left', 'had left', 'has left'], answer: 'had left',
    explanation: l('The train left before we reached the station → past perfect.', 'আমরা পৌঁছানোর আগেই train চলে গিয়েছিল → past perfect।'),
    why: { left: l('"left" suggests it left when we arrived — the order is unclear.', '"left" বোঝায় আমরা পৌঁছানোর সময় গেছে — ক্রম পরিষ্কার না।'), 'has left': l('Present perfect connects to now, not to a past moment.', 'Present perfect এখনের সাথে যুক্ত, অতীতের মুহূর্তের সাথে না।') },
  },
  {
    id: 't-7-e4', type: 'choice', tag: 'tense', concept: 'past-perfect',
    prompt: l('Which happened first?', 'কোনটা আগে ঘটেছিল?'),
    sentence: 'When the manager arrived, the staff had finished the report.',
    options: ['The manager arrived.', 'The staff finished the report.'], answer: 'The staff finished the report.',
    explanation: l('"had finished" = the earlier action.', '"had finished" = আগের কাজ।'),
  },
  {
    id: 't-7-p1', type: 'choice', tag: 'tense', concept: 'past-perfect', pattern: 'tense-time',
    prompt: l('Task 1: choose the best sentence.', 'Task 1: সবচেয়ে ভালো sentence বাছো।'),
    sentence: 'Data: 60 cinemas in 1990 → 20 in 2000.',
    options: ['By 2000, the number of cinemas had fallen to 20.', 'By 2000, the number of cinemas has fallen to 20.', 'By 2000, the number of cinemas falls to 20.'],
    answer: 'By 2000, the number of cinemas had fallen to 20.',
    explanation: l('"By + a past year" = before that point → had + past participle.', '"By + অতীতের বছর" = ওই বিন্দুর আগে → had + past participle।'),
    why: { 'By 2000, the number of cinemas has fallen to 20.': l('"has fallen" connects to now, but 2000 is in the past.', '"has fallen" এখনের সাথে যুক্ত, কিন্তু 2000 অতীতে।'), 'By 2000, the number of cinemas falls to 20.': l('Present simple does not fit a past year.', 'অতীতের বছরে present simple মেলে না।') },
  },
  {
    id: 't-7-p2', type: 'choice', tag: 'tense', concept: 'past-perfect',
    prompt: l('Do you need the past perfect here?', 'এখানে কি past perfect লাগবে?'),
    sentence: 'I woke up, had a shower and ___ for university.',
    options: ['left', 'had left'], answer: 'left',
    explanation: l('Events told in order → past simple is enough. Use the past perfect only when you go back to an earlier time.', 'ক্রম অনুযায়ী বলা ঘটনা → past simple-ই যথেষ্ট। Past perfect শুধু যখন আরও আগের সময়ে ফিরে যাও।'),
    why: { 'had left': l('Nothing is out of order here, so the past perfect is not needed.', 'এখানে কোনো কিছু ক্রমের বাইরে নেই, তাই past perfect লাগে না।') },
  },
];

const pfRecall: Exercise[] = [
  {
    id: 't-7-e2', type: 'gap', tag: 'tense', concept: 'past-perfect', pattern: 'verb-form',
    prompt: l('Complete with the past perfect of "rise".', '"rise"-এর past perfect বসাও।'),
    sentence: 'By 2015, the price of petrol ___ to over 100 taka.',
    accepted: ['had risen'],
    explanation: l('"By 2015" → had + past participle (risen).', '"By 2015" → had + past participle (risen)।'),
    why: { 'had rose': l('"rose" is past simple; after "had" use the participle "risen".', '"rose" past simple; "had"-এর পরে participle "risen"।'), rose: l('With "by 2015" we need "had risen".', '"by 2015"-এর সাথে "had risen" লাগে।') },
  },
  {
    id: 't-7-e3', type: 'correct', tag: 'tense', concept: 'past-perfect', pattern: 'verb-form',
    prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'I had went to the market before it rained.',
    accepted: ['I had gone to the market before it rained.', 'I went to the market before it rained.'],
    explanation: l('had + past participle: gone (not went).', 'had + past participle: gone (went না)।'),
  },
  {
    id: 't-7-r1', type: 'gap', tag: 'tense', concept: 'past-perfect',
    prompt: l('Write the past perfect of "never / see". No options!', '"never / see"-এর past perfect লেখো। কোনো option নেই!'),
    sentence: 'Before I went to Nepal, I ___ snow.',
    accepted: ['had never seen'],
    explanation: l('Experience before another past event → had never seen.', 'অতীতের আরেক ঘটনার আগের অভিজ্ঞতা → had never seen।'),
    why: { 'never saw': l('Correct in casual speech, but here we want the earlier past: had never seen.', 'সাধারণ কথায় চলে, কিন্তু এখানে আরও আগের অতীত: had never seen।'), 'had never saw': l('After had, use the participle: seen.', 'had-এর পরে participle: seen।') },
  },
];

const pfChallenge: Exercise[] = [
  {
    id: 't-7-c1', type: 'choice', tag: 'tense', concept: 'past-perfect',
    prompt: l('"When I arrived, the film started." vs "When I arrived, the film had started." In which one did you miss the beginning?', '"When I arrived, the film started." আর "When I arrived, the film had started." কোনটায় তুমি শুরু মিস করেছো?'),
    options: ['"had started"', '"started"', 'Both'], answer: '"had started"',
    explanation: l('"had started" = it began before you arrived. "started" = it began as you arrived.', '"had started" = তুমি পৌঁছানোর আগেই শুরু। "started" = তুমি পৌঁছাতেই শুরু।'),
  },
  {
    id: 't-7-c2', type: 'spot', tag: 'tense', concept: 'past-perfect', pattern: 'verb-form',
    prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করো।'),
    words: ['By', '2010,', 'sales', 'had', 'grew', 'to', '5,000', 'units.'], wrong: 4,
    accepted: ['grown'], fixOptions: ['grown', 'grow', 'growing'],
    explanation: l('had + past participle: grown.', 'had + past participle: grown।'),
  },
  {
    id: 't-7-c3', type: 'choice', tag: 'tense', concept: 'past-perfect',
    prompt: l('Reading: "Before the railway was built, the town had depended on the river for trade." Statement: "The river was important for trade after the railway opened."', 'Reading: "Before the railway was built, the town had depended on the river for trade." Statement: "The river was important for trade after the railway opened."'),
    options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'NOT GIVEN',
    explanation: l('The passage only tells us about the time BEFORE the railway. After is not mentioned.', 'Passage শুধু railway-র আগের সময়ের কথা বলে। পরের কথা নেই।'),
  },
];

export const pastPerfectV2: Lesson = {
  id: 't-7',
  format: 'v2',
  concept: 'past-perfect',
  title: l('Past Perfect', 'Past Perfect'),
  why: l('Shows which past event happened first — useful for Task 1 comparisons and Reading timelines.', 'অতীতের কোন ঘটনা আগে ঘটেছিল দেখায় — Task 1-এর তুলনা আর Reading-এর timeline-এ কাজের।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('A late arrival', 'দেরিতে পৌঁছানো'),
      situation: l('You arrived at the exam hall at 10:05. The exam started at 10:00. You are telling a friend about it.', 'তুমি exam hall-এ পৌঁছেছো 10:05-এ। Exam শুরু হয়েছিল 10:00-এ। বন্ধুকে বলছো।'),
      question: l('Which sentence shows clearly that the exam started first?', 'কোন sentence পরিষ্কার দেখায় যে exam আগে শুরু হয়েছিল?'),
      options: ['When I arrived, the exam started.', 'When I arrived, the exam had started.', 'When I arrived, the exam has started.'],
      answer: 'When I arrived, the exam had started.',
      diagnose: {
        'When I arrived, the exam started.': l('This sounds like the exam started at the moment you walked in.', 'এটা শুনলে মনে হয় তুমি ঢোকার মুহূর্তেই exam শুরু হলো।'),
        'When I arrived, the exam had started.': l('Right. "had started" = earlier than your arrival.', 'ঠিক। "had started" = তোমার পৌঁছানোর আগে।'),
        'When I arrived, the exam has started.': l('"has started" connects to now, but the story is in the past.', '"has started" এখনের সাথে যুক্ত, কিন্তু গল্পটা অতীতের।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করো'),
      items: [
        { en: 'When I arrived, the class had already started.', note: l('class first, then I arrived', 'আগে class, তারপর আমি') },
        { en: 'By 2010, sales had doubled.', note: l('before a past year', 'অতীতের একটা বছরের আগে') },
        { en: 'She had never flown before she went to Dubai.', note: l('experience before another past event', 'আরেক অতীত ঘটনার আগের অভিজ্ঞতা') },
        { en: 'After he had finished the report, he went home.', note: l('first finished, then went', 'আগে শেষ, তারপর গেল') },
      ],
      question: l('What does had + past participle show?', 'had + past participle কী দেখায়?'),
      options: [
        l('The earlier of two past times', 'অতীতের দুটো সময়ের মধ্যে আগেরটা'),
        l('Something happening now', 'এখন ঘটছে এমন কিছু'),
        l('A future plan', 'ভবিষ্যতের পরিকল্পনা'),
      ],
      answer: 0,
      pattern: l(
        'had + past participle = the "earlier past". You need a second past point (when I arrived, by 2010) to measure it against.',
        'had + past participle = "আরও আগের অতীত"। তুলনার জন্য অতীতের আরেকটা বিন্দু লাগে (when I arrived, by 2010)।',
      ),
    },
    {
      kind: 'concept',
      title: l('When to use it — and when not to', 'কখন ব্যবহার করবে — আর কখন না'),
      body: l(
        'Use had + past participle for an action that happened before another past action or before a past time ("by 2010"). It is the "earlier past".',
        'অতীতের আরেকটা কাজের আগে বা অতীতের কোনো সময়ের আগে ("by 2010") ঘটে যাওয়া কাজের জন্য had + past participle। এটা "আরও আগের অতীত"।',
      ),
      points: [
        l('had + past participle for every subject: I had finished, she had left.', 'সব subject-এর জন্য had + past participle: I had finished, she had left।'),
        l('Signals: before, after, by (1990), already, when.', 'Signal: before, after, by (1990), already, when।'),
        l('NOT for events told in order: "I woke up, had breakfast and left" needs only the past simple.', 'ক্রম অনুযায়ী বলা ঘটনায় না: "I woke up, had breakfast and left"-এ শুধু past simple লাগে।'),
        l('NOT without a second past point: use it only when the order matters.', 'অতীতের দ্বিতীয় বিন্দু ছাড়া না: শুধু যখন ক্রমটা গুরুত্বপূর্ণ।'),
      ],
      timeline: [
        { sentence: 'When I arrived, the exam had started.', picture: 'earlier-past', label: l('Earlier past', 'আরও আগের অতীত') },
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'When I arrived, the class had already started.', note: l('The class started first, then I arrived.', 'আগে class শুরু, তারপর আমি পৌঁছেছি।') },
        { en: 'By 2010, sales had doubled.', note: l('"By 2010" = before that point in the past.', '"By 2010" = অতীতের ওই বিন্দুর আগে।') },
        { en: 'I had never seen the sea before I visited Cox’s Bazar.', note: l('An experience before another past event.', 'অতীতের আরেক ঘটনার আগের অভিজ্ঞতা।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'By 2000, the number of cinemas had fallen to just 20.', note: l('Task 1: "by + past year" → past perfect.', 'Task 1: "by + অতীতের বছর" → past perfect।') },
        { skill: 'reading', example: 'Before the railway was built, the town had depended on the river for trade.', note: l('Reading timelines: which came first?', 'Reading-এর timeline: কোনটা আগে?') },
        { skill: 'speaking', example: 'I had never seen snow before I went to Nepal.', note: l('Part 2 stories: an experience before another event.', 'Part 2-এর গল্প: আরেকটা ঘটনার আগের অভিজ্ঞতা।') },
        { skill: 'listening', example: 'By the time we got there, they had sold all the tickets.', note: l('Part 1–2: something already done before the speaker arrived.', 'Part 1–2: বক্তা পৌঁছানোর আগেই কিছু হয়ে গিয়েছিল।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'I had went to the market.', right: 'I had gone to the market.', why: l('had + past participle (gone).', 'had + past participle (gone)।') },
        { wrong: 'By 2015, prices have risen.', right: 'By 2015, prices had risen.', why: l('By + a past year → had.', 'By + অতীতের বছর → had।') },
        { wrong: 'I had woken up, had had breakfast and had left.', right: 'I woke up, had breakfast and left.', why: l('Events in order → past simple only.', 'ক্রম অনুযায়ী ঘটনা → শুধু past simple।') },
      ],
    },
    { kind: 'practice', mode: 'practice', title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'), exercises: pfPractice },
    { kind: 'practice', mode: 'recall', title: l('Active recall: no options', 'Active recall: কোনো option নেই'), exercises: pfRecall },
    { kind: 'practice', title: l('Mini challenge', 'Mini challenge'), exercises: pfChallenge },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: Task 1 and a first time', 'এবার তোমার পালা: Task 1 আর প্রথমবারের অভিজ্ঞতা'),
      exercises: [
        {
          id: 't-7-e5', type: 'write', tag: 'tense', concept: 'past-perfect',
          prompt: l('Task 1: cinemas fell from 80 (1990) to 20 (2000). Write one sentence with "By 2000". Then write one sentence about something you had never done before a trip or event.', 'Task 1: cinema 80 (1990) থেকে 20 (2000)-এ নেমেছে। "By 2000" দিয়ে এক sentence লেখো। তারপর কোনো ভ্রমণ বা ঘটনার আগে তুমি কী কখনো করোনি তা নিয়ে এক sentence।'),
          model: 'By 2000, the number of cinemas had fallen to just 20. I had never travelled by plane before I went to Chattogram last year.',
          checklist: [l('"By 2000" + had + past participle', '"By 2000" + had + past participle'), l('Correct participle (fallen, decreased, seen, been)', 'সঠিক participle (fallen, decreased, seen, been)'), l('A second past event to compare with', 'তুলনার জন্য অতীতের আরেকটা ঘটনা')],
          explanation: l('A precise way to show what happened first.', 'কোনটা আগে ঘটেছে দেখানোর নির্ভুল উপায়।'),
          mino: {
            task: 'The student writes a Task 1 sentence with "By 2000" and one sentence about something they had never done before a past event. Check the past perfect: had + past participle (gone not went, fallen not fell, seen not saw), used only where one past event is earlier than another past point, and the past simple for the later event. If the student uses has/have with a past year, explain that "by + past year" needs "had".',
            target: l('had + past participle for the earlier past', 'আগের অতীতের জন্য had + past participle'),
          },
        },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('had + past participle = the earlier past.', 'had + past participle = আরও আগের অতীত।'),
        l('"By 2010, … had …" is useful in Task 1.', '"By 2010, … had …" Task 1-এ কাজের।'),
        l('Events in order → past simple is enough.', 'ক্রম অনুযায়ী ঘটনা → past simple-ই যথেষ্ট।'),
      ],
    },
  ],
};

// ======================================================================= 8
const fuPractice: Exercise[] = [
  {
    id: 't-8-e1', type: 'choice', tag: 'tense', concept: 'future', pattern: 'verb-form',
    prompt: l('Choose the best form for a Task 1 projection.', 'Task 1 projection-এর জন্য সবচেয়ে ভালো form বাছো।'),
    sentence: 'The number of electric cars ___ to 30 million by 2030.',
    options: ['is expected to rise', 'will be rise', 'rises expected'], answer: 'is expected to rise',
    explanation: l('"is expected to + base verb" is the natural form for projected data.', 'Projected data-র জন্য স্বাভাবিক form "is expected to + base verb"।'),
    why: { 'will be rise': l('After "will be" we cannot use the base verb "rise". Use "will rise".', '"will be"-এর পরে base verb "rise" বসে না। "will rise" লেখো।'), 'rises expected': l('Word order is wrong.', 'Word order ভুল।') },
  },
  {
    id: 't-8-e3', type: 'choice', tag: 'tense', concept: 'future',
    prompt: l('Which is best for a plan you have already decided?', 'আগেই ঠিক করা পরিকল্পনার জন্য কোনটা সবচেয়ে ভালো?'),
    options: ['I will take IELTS in June — I just decided now!', 'I’m going to take IELTS in June.'], answer: 'I’m going to take IELTS in June.',
    explanation: l('Decided plan → "be going to".', 'আগে ঠিক করা পরিকল্পনা → "be going to"।'),
  },
  {
    id: 't-8-p1', type: 'choice', tag: 'tense', concept: 'future',
    prompt: l('Your friend: "It’s so hot in here." You decide right now to help.', 'বন্ধু: "It’s so hot in here." তুমি এই মুহূর্তে সাহায্য করার সিদ্ধান্ত নিলে।'),
    options: ['I’ll open the window.', 'I’m going to open the window.', 'I open the window.'], answer: 'I’ll open the window.',
    explanation: l('A decision made at the moment of speaking → will.', 'কথা বলার মুহূর্তেই নেওয়া সিদ্ধান্ত → will।'),
    why: { 'I’m going to open the window.': l('"going to" is for plans decided before now.', '"going to" আগে থেকে ঠিক করা পরিকল্পনার জন্য।'), 'I open the window.': l('Present simple does not make an offer or promise.', 'Present simple দিয়ে প্রস্তাব বা প্রতিশ্রুতি হয় না।') },
  },
  {
    id: 't-8-p2', type: 'choice', tag: 'tense', concept: 'future',
    prompt: l('An arrangement with a time and place already fixed:', 'সময় আর জায়গা ঠিক হয়ে যাওয়া arrangement:'),
    options: ['I’m meeting my advisor at 3 p.m. tomorrow.', 'I meet my advisor at 3 p.m. tomorrow maybe.', 'I will meeting my advisor at 3 p.m. tomorrow.'], answer: 'I’m meeting my advisor at 3 p.m. tomorrow.',
    explanation: l('Fixed personal arrangements → present continuous with a future time.', 'ঠিক হয়ে যাওয়া ব্যক্তিগত arrangement → ভবিষ্যতের সময় সহ present continuous।'),
    why: { 'I will meeting my advisor at 3 p.m. tomorrow.': l('After will, the base verb: will meet.', 'will-এর পরে base verb: will meet।') },
  },
];

const fuRecall: Exercise[] = [
  {
    id: 't-8-e2', type: 'correct', tag: 'tense', concept: 'future', pattern: 'tense-time',
    prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'When I will finish my degree, I will apply for a master’s.',
    accepted: ["When I finish my degree, I will apply for a master's."],
    explanation: l('After "when" talking about the future, use the present: "When I finish".', 'ভবিষ্যৎ নিয়ে "when"-এর পরে present: "When I finish"।'),
  },
  {
    id: 't-8-e4', type: 'gap', tag: 'tense', concept: 'future', pattern: 'verb-form',
    prompt: l('Complete with "will" + verb.', '"will" + verb বসাও।'),
    sentence: 'I think robots ___ (do) many household jobs in the future.',
    accepted: ['will do'],
    explanation: l('Opinion about the future → "I think … will …".', 'ভবিষ্যৎ নিয়ে মতামত → "I think … will …"।'),
    why: { 'will doing': l('After "will" use the base verb: will do.', '"will"-এর পরে base verb: will do।'), 'will does': l('After "will" the verb never takes -s.', '"will"-এর পরে verb-এ কখনো -s হয় না।') },
  },
  {
    id: 't-8-r1', type: 'correct', tag: 'tense', concept: 'future', pattern: 'tense-time',
    prompt: l('Fix the sentence.', 'Sentence-টা ঠিক করো।'),
    sentence: 'If it will rain tomorrow, we will stay at home.',
    accepted: ['If it rains tomorrow, we will stay at home.', "If it rains tomorrow, we'll stay at home."],
    explanation: l('"If" + present for the future: If it rains.', 'ভবিষ্যৎ বোঝাতে "If" + present: If it rains।'),
  },
];

const fuChallenge: Exercise[] = [
  {
    id: 't-8-c1', type: 'choice', tag: 'tense', concept: 'future',
    prompt: l('Task 1 has years 2020–2040 (2025 onwards is projected). Where do you change tense?', 'Task 1-এ 2020–2040 (2025 থেকে projected)। কোথায় tense বদলাবে?'),
    options: ['At 2025: past for 2020–2025, "is expected to" after that', 'Nowhere: use "will" for every year', 'Nowhere: use the past for every year'],
    answer: 'At 2025: past for 2020–2025, "is expected to" after that',
    explanation: l('Change the tense exactly where the data changes from real to projected.', 'Data যেখানে বাস্তব থেকে projected হয়, ঠিক সেখানেই tense বদলাও।'),
  },
  {
    id: 't-8-c2', type: 'spot', tag: 'tense', concept: 'future', pattern: 'verb-form',
    prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করো।'),
    words: ['The', 'population', 'will', 'reaches', '200', 'million', 'by', '2050.'], wrong: 3,
    accepted: ['reach'], fixOptions: ['reach', 'reaching', 'reached'],
    explanation: l('will + base verb: will reach.', 'will + base verb: will reach।'),
  },
  {
    id: 't-8-c3', type: 'choice', tag: 'tense', concept: 'future',
    prompt: l('Listening: "The library was going to open in March, but now it will open in May." When will it open?', 'Listening: "The library was going to open in March, but now it will open in May." কবে খুলবে?'),
    options: ['May', 'March', 'It will not open'], answer: 'May',
    explanation: l('"was going to" = an old plan that changed. The answer is the new plan: May.', '"was going to" = পুরনো পরিকল্পনা যা বদলে গেছে। উত্তর নতুনটা: May।'),
  },
];

export const futureFormsV2: Lesson = {
  id: 't-8',
  format: 'v2',
  concept: 'future',
  title: l('Future forms', 'Future forms'),
  why: l('Predictions in Task 1 (projected data), plans in Speaking Part 1, and ideas about the future in Part 3.', 'Task 1-এ ভবিষ্যদ্বাণী (projected data), Speaking Part 1-এ পরিকল্পনা আর Part 3-এ ভবিষ্যৎ নিয়ে ভাবনা।'),
  minutes: 12,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'hook',
      title: l('A plan you already made', 'আগেই ঠিক করা পরিকল্পনা'),
      situation: l('Examiner (Part 1): "What are your plans after university?" You decided last year to study in Canada.', 'Examiner (Part 1): "What are your plans after university?" তুমি গত বছরই ঠিক করেছো Canada-য় পড়তে যাবে।'),
      question: l('What is the most natural answer?', 'সবচেয়ে স্বাভাবিক উত্তর কী?'),
      options: ['I will to study in Canada.', 'I’m going to study in Canada.', 'I study in Canada.'],
      answer: 'I’m going to study in Canada.',
      diagnose: {
        'I will to study in Canada.': l('After "will" comes the base verb without "to": will study. And for a plan decided earlier, "going to" is more natural.', '"will"-এর পরে "to" ছাড়া base verb: will study। আর আগে ঠিক করা পরিকল্পনায় "going to" বেশি স্বাভাবিক।'),
        'I’m going to study in Canada.': l('Right. A plan decided before now → be going to.', 'ঠিক। আগে থেকে ঠিক করা পরিকল্পনা → be going to।'),
        'I study in Canada.': l('This sounds like you study there now, every day.', 'এটা শুনলে মনে হয় তুমি এখন প্রতিদিন সেখানে পড়ো।'),
      },
    },
    {
      kind: 'discover',
      title: l('Notice the pattern', 'Pattern-টা খেয়াল করো'),
      items: [
        { en: 'I think more people will work from home.', note: l('opinion / prediction → will', 'মতামত / ভবিষ্যদ্বাণী → will') },
        { en: 'I’m going to apply for a scholarship next year.', note: l('a plan → going to', 'পরিকল্পনা → going to') },
        { en: 'I’m meeting my advisor at 3 tomorrow.', note: l('a fixed arrangement → -ing', 'ঠিক হওয়া arrangement → -ing') },
        { en: 'The figure is expected to reach 50% by 2030.', note: l('projected data → is expected to', 'projected data → is expected to') },
      ],
      question: l('What decides which future form to use?', 'কোন future form ব্যবহার হবে তা কী ঠিক করে?'),
      options: [
        l('The meaning: prediction, plan, arrangement or projected data', 'অর্থ: ভবিষ্যদ্বাণী, পরিকল্পনা, arrangement নাকি projected data'),
        l('Nothing: they are all the same', 'কিছুই না: সব একই'),
        l('Only how far away the time is', 'শুধু সময়টা কত দূরে'),
      ],
      answer: 0,
      pattern: l(
        'English picks the future form by meaning. will = prediction or a decision now; going to = a plan; present continuous = a fixed arrangement; is expected to = projected data.',
        'English অর্থ দেখে future form বাছে। will = ভবিষ্যদ্বাণী বা এখনই নেওয়া সিদ্ধান্ত; going to = পরিকল্পনা; present continuous = ঠিক হওয়া arrangement; is expected to = projected data।',
      ),
    },
    {
      kind: 'concept',
      title: l('When to use each — and when not to', 'কোনটা কখন — আর কখন না'),
      body: l(
        'English has several future forms. "will" for predictions and quick decisions; "be going to" for plans and predictions from evidence; present continuous for fixed arrangements. For graphs with future years, use "is expected to / is predicted to / will".',
        'English-এ কয়েকটা future form আছে। ভবিষ্যদ্বাণী আর তাৎক্ষণিক সিদ্ধান্তে "will"; পরিকল্পনা আর প্রমাণ দেখে ভবিষ্যদ্বাণীতে "be going to"; ঠিক হয়ে যাওয়া arrangement-এ present continuous। ভবিষ্যতের বছরের graph-এ "is expected to / is predicted to / will"।',
      ),
      points: [
        l('will + base verb: Prices will rise. (never "will rises", "will to rise")', 'will + base verb: Prices will rise। ("will rises", "will to rise" কখনো না)'),
        l('am/is/are going to + base verb: I’m going to apply next year.', 'am/is/are going to + base verb: I’m going to apply next year।'),
        l('Task 1: The figure is expected to reach 50% by 2030.', 'Task 1: The figure is expected to reach 50% by 2030।'),
        l('NOT "will" after if / when about the future: "When I finish, I will call you."', 'ভবিষ্যৎ নিয়ে if / when-এর পরে "will" না: "When I finish, I will call you."'),
        l('Why Bangla speakers slip: "করব" can be a plan or a prediction, so "will" gets used for everything.', 'বাংলাভাষীরা কেন ভুল করে: "করব" পরিকল্পনাও হতে পারে, ভবিষ্যদ্বাণীও, তাই সব জায়গায় "will" বসে যায়।'),
      ],
      timeline: [
        { sentence: 'The figure is expected to reach 50% by 2030.', picture: 'future', label: l('Future', 'ভবিষ্যৎ') },
      ],
    },
    {
      kind: 'examples',
      title: l('In real life', 'বাস্তব জীবনে'),
      items: [
        { en: 'The population is projected to reach 200 million by 2050.', note: l('Projected data in Task 1.', 'Task 1-এর projected data।') },
        { en: 'I’m going to study in Canada after my bachelor’s.', note: l('A plan.', 'একটা পরিকল্পনা।') },
        { en: 'If the government invests more, the problem will improve.', note: l('"If" + present, then "will".', '"If" + present, তারপর "will"।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Solar energy is expected to overtake coal by 2035.', note: l('Task 1 with future years: avoid "will be increased"; use "is expected to increase".', 'ভবিষ্যতের বছরের Task 1: "will be increased" না; "is expected to increase"।') },
        { skill: 'speaking', example: 'In the future, I think more people will work from home.', note: l('Part 3 predictions: "I think … will …".', 'Part 3-এর ভবিষ্যদ্বাণী: "I think … will …"।') },
        { skill: 'listening', example: 'The new library is going to open in March.', note: l('Plans and dates in Part 2 talks; watch for changed plans.', 'Part 2-এর আলোচনায় পরিকল্পনা আর তারিখ; পরিকল্পনা বদলালে খেয়াল রাখো।') },
        { skill: 'reading', example: 'Sea levels are likely to rise by up to one metre.', note: l('"likely to", "may", "is expected to" = a prediction, not a fact yet.', '"likely to", "may", "is expected to" = ভবিষ্যদ্বাণী, এখনো সত্য না।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'When I will finish my degree, …', right: 'When I finish my degree, …', why: l('when / if + present for the future.', 'ভবিষ্যৎ বোঝাতে when / if + present।') },
        { wrong: 'The figure will be increase.', right: 'The figure will increase. / is expected to increase.', why: l('will + base verb (no "be").', 'will + base verb ("be" না)।') },
        { wrong: 'I will to study abroad.', right: 'I will study abroad. / I’m going to study abroad.', why: l('No "to" after will.', 'will-এর পরে "to" না।') },
      ],
    },
    { kind: 'practice', mode: 'practice', title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'), exercises: fuPractice },
    { kind: 'practice', mode: 'recall', title: l('Active recall: no options', 'Active recall: কোনো option নেই'), exercises: fuRecall },
    { kind: 'practice', title: l('Mini challenge', 'Mini challenge'), exercises: fuChallenge },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a prediction and a plan', 'এবার তোমার পালা: একটা ভবিষ্যদ্বাণী আর একটা পরিকল্পনা'),
      exercises: [
        {
          id: 't-8-e5', type: 'write', tag: 'tense', concept: 'future',
          prompt: l('Speaking Part 3: "How will transport change in the future?" Give one prediction. Then add one plan of your own for next year.', 'Speaking Part 3: "How will transport change in the future?" একটা ভবিষ্যদ্বাণী দাও। তারপর আগামী বছরের তোমার একটা পরিকল্পনা যোগ করো।'),
          model: 'I think more people will use electric buses, and cities are likely to build more metro lines. Personally, I’m going to buy a bicycle next year.',
          checklist: [l('will / is likely to + base verb for the prediction', 'ভবিষ্যদ্বাণীর জন্য will / is likely to + base verb'), l('going to for your plan', 'পরিকল্পনার জন্য going to'), l('An opinion phrase (I think, probably)', 'মতামতের phrase (I think, probably)')],
          explanation: l('Hedge predictions with "I think", "probably", "is likely to".', '"I think", "probably", "is likely to" দিয়ে ভবিষ্যদ্বাণী নরম করো।'),
          mino: {
            task: 'The student gives a prediction about transport and a personal plan. Check future forms: will + base verb (no "will to", "will goes", "will be increase"), be going to + base verb for a decided plan, present continuous for fixed arrangements, and present tense after if/when about the future. Explain choices by meaning (prediction vs plan), using the student’s own sentence.',
            target: l('will for a prediction · going to for a plan', 'ভবিষ্যদ্বাণীতে will · পরিকল্পনায় going to'),
          },
        },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখো'),
      points: [
        l('will + base verb (never "will goes").', 'will + base verb ("will goes" কখনো না)।'),
        l('Plan → going to · arrangement → -ing · projection → is expected to.', 'পরিকল্পনা → going to · arrangement → -ing · projection → is expected to।'),
        l('when / if + present for the future.', 'ভবিষ্যৎ বোঝাতে when / if + present।'),
      ],
    },
  ],
};


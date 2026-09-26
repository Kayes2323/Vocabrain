import type { ErrorTag, Exercise, L, Lesson, LessonStep, Pos } from '../model';
import { choice, correct, gap, l, spot } from './pos-kit';

/**
 * Common Mistakes Lab: 8 repair stations. Each repair: tap the word that breaks
 * the sentence → type the fix → say why → explanation. Wrong answers store the
 * pattern (a job pair or a named pattern), which opens a 5-question fix.
 * Original Vocab Brain content.
 */
const C = 'pos-lab';

interface Repair {
  sentence: string;
  wrong: string;
  accepted: string[];
  explanation: L;
  pos?: Pos;
  wrongPos?: Record<string, Pos>;
  family?: string;
  why: { prompt: L; options: string[]; answer: string; explanation: L };
}

function station(o: {
  n: number;
  title: L;
  why: L;
  skill?: Lesson['skill'];
  tag: ErrorTag;
  pattern?: string;
  hook: Extract<LessonStep, { kind: 'hook' }>;
  repairs: Repair[];
  mistakes: { wrong: string; right: string; why: L }[];
  practice: Exercise[];
  points: L[];
}): Lesson {
  const id = `pl-${o.n}`;
  const repairs = o.repairs.flatMap((r, i): Exercise[] => [
    spot(`${id}-s${i + 1}`, C, {
      prompt: l('Find the problem: tap the word, then type the fix.', 'সমস্যা খোঁজো: word-এ tap করো, তারপর ঠিক word-টা লেখো।'),
      sentence: r.sentence, wrong: r.wrong, accepted: r.accepted, explanation: r.explanation,
      tag: o.tag, pattern: o.pattern, pos: r.pos, wrongPos: r.wrongPos, family: r.family,
    }),
    choice(`${id}-y${i + 1}`, C, { prompt: r.why.prompt, options: r.why.options, answer: r.why.answer, explanation: r.why.explanation, tag: o.tag }),
  ]);
  return {
    id, unit: 'lab', format: 'lab', concept: C, minutes: 6, difficulty: 'medium', skill: o.skill ?? 'writing',
    title: o.title, why: o.why,
    steps: [
      o.hook,
      { kind: 'practice', title: l('Repair station', 'Repair station'), exercises: repairs },
      { kind: 'mistakes', title: l('What you repaired', 'যা ঠিক করলে'), items: o.mistakes },
      { kind: 'practice', mode: 'recall', title: l('Targeted practice', 'Targeted practice'), exercises: o.practice },
      { kind: 'recall', title: l('Remember', 'মনে রাখো'), points: o.points },
    ],
  };
}

const whyJob = l('Why is it wrong?', 'কেন ভুল?');

const noun = station({
  n: 1, tag: 'countable', pattern: 'noun-count',
  title: l('Noun mistakes', 'Noun-এর ভুল'),
  why: l('"informations" and "many peoples" are among the most common errors examiners see.', '"informations" আর "many peoples" examiner-দের সবচেয়ে বেশি দেখা ভুলগুলোর মধ্যে।'),
  hook: {
    kind: 'hook', title: l('A student paragraph', 'একজন student-এর paragraph'),
    situation: l('"The internet gives us many informations, and many peoples use it for advices."', '"The internet gives us many informations, and many peoples use it for advices."'),
    question: l('What do the problems have in common?', 'সমস্যাগুলোর মধ্যে মিল কী?'),
    options: ['Nouns in the wrong form (count / plural)', 'The verbs are in the wrong tense', 'There are too many adjectives'],
    answer: 'Nouns in the wrong form (count / plural)',
    diagnose: {
      'Nouns in the wrong form (count / plural)': l('Yes. information and advice are uncountable; people is already plural.', 'হ্যাঁ। information আর advice uncountable; people নিজেই plural।'),
      'The verbs are in the wrong tense': l('"gives" and "use" are fine. Look at the nouns: informations, peoples, advices.', '"gives" আর "use" ঠিক আছে। noun-গুলো দেখো: informations, peoples, advices।'),
      'There are too many adjectives': l('There is only "many". The problem is the nouns after it.', 'শুধু "many" আছে। সমস্যা তার পরের noun-গুলোতে।'),
    },
  },
  repairs: [
    { sentence: 'The website gives useful informations about visas.', wrong: 'informations', accepted: ['information'], explanation: l('information is uncountable: no -s.', 'information uncountable: -s হয় না।'), why: { prompt: whyJob, options: ['"information" is uncountable', '"information" must be a verb', '"useful" should be "usefully"'], answer: '"information" is uncountable', explanation: l('Uncountable nouns have no plural.', 'Uncountable noun-এর plural নেই।') } },
    { sentence: 'Many peoples in Dhaka travel by bus.', wrong: 'peoples', accepted: ['people'], explanation: l('people is already plural (one person, many people).', 'people নিজেই plural (one person, many people)।'), why: { prompt: whyJob, options: ['"people" is already plural', '"many" needs a singular noun', '"Dhaka" needs "the"'], answer: '"people" is already plural', explanation: l('person → people.', 'person → people।') } },
    { sentence: 'She gave me some good advices about the interview.', wrong: 'advices', accepted: ['advice'], explanation: l('advice is uncountable: some advice, a piece of advice.', 'advice uncountable: some advice, a piece of advice।'), why: { prompt: whyJob, options: ['"advice" is uncountable', '"advice" is a verb here', '"good" must come after "advices"'], answer: '"advice" is uncountable', explanation: l('The verb is "advise"; the noun "advice" has no plural.', 'Verb হলো "advise"; noun "advice"-এর plural নেই।') } },
  ],
  mistakes: [
    { wrong: 'many informations', right: 'a lot of information', why: l('Uncountable.', 'Uncountable।') },
    { wrong: 'many peoples', right: 'many people', why: l('Already plural.', 'নিজেই plural।') },
    { wrong: 'advices', right: 'advice / pieces of advice', why: l('Uncountable.', 'Uncountable।') },
  ],
  practice: [
    gap('pl-1-r1', C, { prompt: l('Write the correct word.', 'সঠিক word লেখো।'), sentence: 'Hospitals need more modern ______ (equipment).', accepted: ['equipment'], tag: 'countable', pattern: 'noun-count', explanation: l('equipment is uncountable.', 'equipment uncountable।') }),
    gap('pl-1-r2', C, { prompt: l('much or many?', 'much না many?'), sentence: 'There is too ______ traffic in the city centre.', accepted: ['much'], tag: 'countable', pattern: 'noun-count', explanation: l('traffic is uncountable → much.', 'traffic uncountable → much।') }),
    correct('pl-1-r3', C, { prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে লেখো।'), sentence: 'Scientists have done many researches on this topic.', accepted: ['Scientists have done a lot of research on this topic.', 'Scientists have done much research on this topic.', 'Scientists have done lots of research on this topic.'], tag: 'countable', pattern: 'noun-count', explanation: l('research is uncountable: a lot of research.', 'research uncountable: a lot of research।') }),
  ],
  points: [l('information, advice, research, equipment, traffic: no -s, use much / a lot of.', 'information, advice, research, equipment, traffic: -s না, much / a lot of ব্যবহার করো।'), l('people = plural of person.', 'people = person-এর plural।')],
});

const verb = station({
  n: 2, tag: 'verb', pattern: 'verb-form',
  title: l('Verb mistakes', 'Verb-এর ভুল'),
  why: l('After can, should, does and "is", the next verb has a fixed form. Getting it wrong is very visible.', 'can, should, does আর "is"-এর পরে পরের verb-এর form নির্দিষ্ট। ভুল হলে খুব চোখে পড়ে।'),
  hook: {
    kind: 'hook', title: l('A student answer', 'একজন student-এর উত্তর'),
    situation: l('"My sister can speaks French. Does she lives in Paris? No, but the number of tourists is increase there."', '"My sister can speaks French. Does she lives in Paris? No, but the number of tourists is increase there."'),
    question: l('What is the common problem?', 'সাধারণ সমস্যাটা কী?'),
    options: ['The second verb has the wrong form', 'The nouns are wrong', 'The sentences are too short'],
    answer: 'The second verb has the wrong form',
    diagnose: {
      'The second verb has the wrong form': l('Yes: can speak, does she live, is increasing.', 'হ্যাঁ: can speak, does she live, is increasing।'),
      'The nouns are wrong': l('sister, French, tourists are fine. Look at the verb after can / does / is.', 'sister, French, tourists ঠিক। can / does / is-এর পরের verb দেখো।'),
      'The sentences are too short': l('Short is fine. The verbs after the helping verbs are the problem.', 'ছোট হলেও চলে। Helping verb-এর পরের verb-গুলোই সমস্যা।'),
    },
  },
  repairs: [
    { sentence: 'My sister can speaks three languages.', wrong: 'speaks', accepted: ['speak'], pos: 'verb', explanation: l('can + base verb: can speak.', 'can + base verb: can speak।'), why: { prompt: whyJob, options: ['After "can", use the base verb', 'After "sister", always add -s twice', '"languages" must be singular'], answer: 'After "can", use the base verb', explanation: l('Modals take the base verb.', 'Modal-এর পরে base verb।') } },
    { sentence: 'Does your brother works on Saturdays?', wrong: 'works', accepted: ['work'], pos: 'verb', explanation: l('does + base verb: does he work.', 'does + base verb: does he work।'), why: { prompt: whyJob, options: ['"does" already carries the -s', '"Saturdays" must be singular', '"brother" must be plural'], answer: '"does" already carries the -s', explanation: l('The -s is on "does", so "work" stays base.', '-s "does"-এ আছে, তাই "work" base থাকে।') } },
    { sentence: 'The price of rice is increase every month.', wrong: 'increase', accepted: ['increasing'], pos: 'verb', explanation: l('is + -ing for an ongoing change: is increasing (or: The price increases).', 'চলমান পরিবর্তনে is + -ing: is increasing (বা: The price increases)।'), why: { prompt: whyJob, options: ['"is" cannot be followed by a base verb', '"rice" must be plural', '"every month" is wrong'], answer: '"is" cannot be followed by a base verb', explanation: l('be + -ing or be + past participle, never be + base verb.', 'be + -ing বা be + past participle, কখনো be + base verb না।') } },
  ],
  mistakes: [
    { wrong: 'can speaks', right: 'can speak', why: l('modal + base verb', 'modal + base verb') },
    { wrong: 'Does she lives…?', right: 'Does she live…?', why: l('does + base verb', 'does + base verb') },
    { wrong: 'is increase', right: 'is increasing / increases', why: l('be + -ing', 'be + -ing') },
  ],
  practice: [
    gap('pl-2-r1', C, { prompt: l('Write the correct form of "go".', '"go"-এর সঠিক form লেখো।'), sentence: 'Students should ______ to bed before midnight.', base: 'go', accepted: ['go'], tag: 'verb', pattern: 'verb-form', explanation: l('should + base verb.', 'should + base verb।') }),
    gap('pl-2-r2', C, { prompt: l('Write the correct form of "grow".', '"grow"-এর সঠিক form লেখো।'), sentence: 'Online shopping is ______ quickly in Bangladesh.', base: 'grow', accepted: ['growing'], tag: 'verb', pattern: 'verb-form', explanation: l('is + -ing: is growing.', 'is + -ing: is growing।') }),
    correct('pl-2-r3', C, { prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে লেখো।'), sentence: 'Did you finished your essay?', accepted: ['Did you finish your essay?'], tag: 'verb', pattern: 'verb-form', explanation: l('did + base verb: did you finish.', 'did + base verb: did you finish।') }),
  ],
  points: [l('can / should / will / do / does / did + base verb.', 'can / should / will / do / does / did + base verb।'), l('is / are / was + -ing (or past participle), never + base verb.', 'is / are / was + -ing (বা past participle), কখনো + base verb না।')],
});

const pronoun = station({
  n: 3, tag: 'part-of-speech', pattern: 'pronoun-form',
  title: l('Pronoun mistakes', 'Pronoun-এর ভুল'),
  why: l('he/she, its/it’s and their/there look small, but they change who or what you mean.', 'he/she, its/it’s আর their/there ছোট দেখায়, কিন্তু কাকে বা কী বোঝাচ্ছো তা বদলে দেয়।'),
  hook: {
    kind: 'hook', title: l('A Speaking answer (written down)', 'একটা Speaking উত্তর (লিখে রাখা)'),
    situation: l('"My mother is a teacher and he loves it’s job. Their are 40 students in her class."', '"My mother is a teacher and he loves it’s job. Their are 40 students in her class."'),
    question: l('What kind of words are the problems?', 'সমস্যার word-গুলো কী ধরনের?'),
    options: ['Pronouns and possessives', 'Numbers', 'Verbs'],
    answer: 'Pronouns and possessives',
    diagnose: {
      'Pronouns and possessives': l('Yes: he → she, it’s → her, Their → There.', 'হ্যাঁ: he → she, it’s → her, Their → There।'),
      Numbers: l('"40" is fine. Look at he, it’s and Their.', '"40" ঠিক আছে। he, it’s আর Their দেখো।'),
      Verbs: l('loves, are are correct. The small words before them are the problem.', 'loves, are ঠিক। তাদের আগের ছোট word-গুলোই সমস্যা।'),
    },
  },
  repairs: [
    { sentence: 'My mother is a nurse and he works at night.', wrong: 'he', accepted: ['she'], pos: 'pronoun', explanation: l('mother → she. Bangla "সে" is both he and she.', 'mother → she। বাংলায় "সে" মানে he আর she দুটোই।'), why: { prompt: whyJob, options: ['The pronoun must match "mother" (she)', '"works" must be "work"', '"nurse" needs "the"'], answer: 'The pronoun must match "mother" (she)', explanation: l('A pronoun matches the noun it replaces.', 'Pronoun যে noun-এর জায়গায় বসে তার সাথে মেলে।') } },
    { sentence: 'The company changed it’s logo last year.', wrong: 'it’s', accepted: ['its'], pos: 'pronoun', explanation: l('its = belonging to it; it’s = it is.', 'its = এটার; it’s = it is।'), why: { prompt: whyJob, options: ['"it’s" means "it is"', '"company" needs a plural pronoun', '"logo" must be plural'], answer: '"it’s" means "it is"', explanation: l('"changed it is logo" makes no sense → its.', '"changed it is logo" অর্থহীন → its।') } },
    { sentence: 'Many parents worry about there children’s screen time.', wrong: 'there', accepted: ['their'], pos: 'pronoun', explanation: l('their = belonging to them.', 'their = তাদের।'), why: { prompt: whyJob, options: ['"there" is a place; "their" shows ownership', '"parents" must be singular', '"worry" must be "worries"'], answer: '"there" is a place; "their" shows ownership', explanation: l('The children belong to the parents → their.', 'Children parents-দের → their।') } },
  ],
  mistakes: [
    { wrong: 'My mother… he', right: 'My mother… she', why: l('Match the noun.', 'Noun-এর সাথে মেলাও।') },
    { wrong: 'it’s logo', right: 'its logo', why: l('its = belonging to it.', 'its = এটার।') },
    { wrong: 'there children', right: 'their children', why: l('their = belonging to them.', 'their = তাদের।') },
  ],
  practice: [
    gap('pl-3-r1', C, { prompt: l('Write its or it’s.', 'its বা it’s লেখো।'), sentence: 'Every city has ______ own problems.', accepted: ['its'], pattern: 'pronoun-form', pos: 'pronoun', explanation: l('belonging to the city → its.', 'city-র → its।') }),
    gap('pl-3-r2', C, { prompt: l('Write the correct pronoun.', 'সঠিক pronoun লেখো।'), sentence: 'The teacher gave my friend and ______ extra homework.', accepted: ['me'], pattern: 'pronoun-form', pos: 'pronoun', explanation: l('Object position → me.', 'Object-এর জায়গা → me।') }),
    spot('pl-3-r3', C, { sentence: 'My father says his going to retire next year.', wrong: 'his', accepted: ['he’s', "he's"], pattern: 'pronoun-form', explanation: l('he’s = he is: he’s going to retire.', 'he’s = he is: he’s going to retire।') }),
  ],
  points: [l('Match the pronoun to the noun (mother → she).', 'Pronoun noun-এর সাথে মেলাও (mother → she)।'), l('Test with the long form: it is / they are.', 'লম্বা form দিয়ে পরীক্ষা করো: it is / they are।')],
});

const adjAdv = station({
  n: 4, tag: 'part-of-speech',
  title: l('Adjective or adverb?', 'Adjective নাকি adverb?'),
  why: l('The most common Parts of Speech error in Task 1 and Task 2: "a significantly increase", "rose sharp".', 'Task 1 আর Task 2-এর সবচেয়ে common Parts of Speech ভুল: "a significantly increase", "rose sharp"।'),
  hook: {
    kind: 'hook', title: l('A Task 1 paragraph', 'একটা Task 1 paragraph'),
    situation: l('"There was a significantly increase in sales, and prices rose sharp in June."', '"There was a significantly increase in sales, and prices rose sharp in June."'),
    question: l('What is the rule that fixes both?', 'কোন নিয়ম দুটোই ঠিক করে?'),
    options: ['Noun ← adjective; verb ← adverb', 'Always add -ly in Task 1', 'Never use -ly in Task 1'],
    answer: 'Noun ← adjective; verb ← adverb',
    diagnose: {
      'Noun ← adjective; verb ← adverb': l('Yes: a significant increase; rose sharply.', 'হ্যাঁ: a significant increase; rose sharply।'),
      'Always add -ly in Task 1': l('Before a noun (increase) you need an adjective without -ly.', 'Noun (increase)-এর আগে -ly ছাড়া adjective লাগে।'),
      'Never use -ly in Task 1': l('After a verb (rose) you need -ly: rose sharply.', 'Verb (rose)-এর পরে -ly লাগে: rose sharply।'),
    },
  },
  repairs: [
    { sentence: 'There was a significantly increase in sales.', wrong: 'significantly', accepted: ['significant'], pos: 'adjective', wrongPos: { significantly: 'adverb' }, explanation: l('a ___ increase (noun) → adjective.', 'a ___ increase (noun) → adjective।'), why: { prompt: whyJob, options: ['"increase" is a noun here, so it needs an adjective', '"increase" is a verb here', '"sales" is an adjective'], answer: '"increase" is a noun here, so it needs an adjective', explanation: l('a + adjective + noun.', 'a + adjective + noun।') } },
    { sentence: 'Prices rose sharp in June.', wrong: 'sharp', accepted: ['sharply'], pos: 'adverb', wrongPos: { sharp: 'adjective' }, explanation: l('rose (verb) + how → adverb.', 'rose (verb) + কীভাবে → adverb।'), why: { prompt: whyJob, options: ['It describes how prices rose (a verb)', 'It describes "June"', 'It describes "prices"'], answer: 'It describes how prices rose (a verb)', explanation: l('verb ← adverb.', 'verb ← adverb।') } },
    { sentence: 'The new rules were extreme effective.', wrong: 'extreme', accepted: ['extremely'], pos: 'adverb', wrongPos: { extreme: 'adjective' }, explanation: l('It describes an adjective (effective) → adverb.', 'এটা একটা adjective (effective)-কে describe করছে → adverb।'), why: { prompt: whyJob, options: ['Words that describe adjectives are adverbs', '"rules" needs an adjective here', '"were" needs an adverb after it'], answer: 'Words that describe adjectives are adverbs', explanation: l('extremely effective, highly successful.', 'extremely effective, highly successful।') } },
  ],
  mistakes: [
    { wrong: 'a significantly increase', right: 'a significant increase', why: l('noun ← adjective', 'noun ← adjective') },
    { wrong: 'rose sharp', right: 'rose sharply', why: l('verb ← adverb', 'verb ← adverb') },
    { wrong: 'extreme effective', right: 'extremely effective', why: l('adjective ← adverb', 'adjective ← adverb') },
  ],
  practice: [
    gap('pl-4-r1', C, { prompt: l('Write the correct form of "steady".', '"steady"-এর সঠিক form লেখো।'), sentence: 'Exports grew ______ throughout the decade.', base: 'steady', accepted: ['steadily'], pos: 'adverb', wrongPos: { steady: 'adjective' }, explanation: l('grew + adverb.', 'grew + adverb।') }),
    gap('pl-4-r2', C, { prompt: l('Write the correct form of "slight".', '"slight"-এর সঠিক form লেখো।'), sentence: 'There was a ______ drop in unemployment.', base: 'slight', accepted: ['slight'], pos: 'adjective', wrongPos: { slightly: 'adverb' }, explanation: l('a ___ drop → adjective.', 'a ___ drop → adjective।') }),
    spot('pl-4-r3', C, { sentence: 'Children who read regular do better at school.', wrong: 'regular', accepted: ['regularly'], pos: 'adverb', wrongPos: { regular: 'adjective' }, explanation: l('read + how often → adverb.', 'read + কতবার → adverb।') }),
  ],
  points: [l('Describing a noun → adjective (a sharp rise).', 'Noun describe করলে → adjective (a sharp rise)।'), l('Describing a verb or adjective → adverb (rose sharply, highly effective).', 'Verb বা adjective describe করলে → adverb (rose sharply, highly effective)।')],
});

const prep = station({
  n: 5, tag: 'preposition', pattern: 'prep-choice',
  title: l('Preposition mistakes', 'Preposition-এর ভুল'),
  why: l('Prepositions rarely translate directly from Bangla; the partner word decides.', 'Preposition বাংলা থেকে সরাসরি অনুবাদ হয় না; সঙ্গী word-ই ঠিক করে।'),
  hook: {
    kind: 'hook', title: l('A student sentence', 'একজন student-এর sentence'),
    situation: l('"Success depends of hard work. I was born in 5 May, and sales rose with 10%."', '"Success depends of hard work. I was born in 5 May, and sales rose with 10%."'),
    question: l('What decides the right preposition?', 'সঠিক preposition কী ঠিক করে?'),
    options: ['The word before or after it (depend, a date, a change)', 'Translation from Bangla', 'It is random'],
    answer: 'The word before or after it (depend, a date, a change)',
    diagnose: {
      'The word before or after it (depend, a date, a change)': l('Yes: depend on, on 5 May, rose by 10%.', 'হ্যাঁ: depend on, on 5 May, rose by 10%।'),
      'Translation from Bangla': l('"এর উপর নির্ভর" suggests "of" or "on"… English simply uses "depend on". Learn the partner.', '"এর উপর নির্ভর" থেকে "of" বা "on" মনে হতে পারে… English-এ শুধু "depend on"। সঙ্গী শেখো।'),
      'It is random': l('It isn’t random: there are patterns (on + dates, by + change). Learn them as chunks.', 'এটা এলোমেলো না: pattern আছে (on + তারিখ, by + পরিবর্তন)। chunk হিসেবে শেখো।'),
    },
  },
  repairs: [
    { sentence: 'Success depends of hard work.', wrong: 'of', accepted: ['on'], explanation: l('depend on.', 'depend on।'), why: { prompt: whyJob, options: ['"depend" always takes "on"', '"hard work" is a time', '"of" is only for places'], answer: '"depend" always takes "on"', explanation: l('A dependent preposition: learn depend on as one chunk.', 'Dependent preposition: depend on একটা chunk হিসেবে শেখো।') } },
    { sentence: 'I was born in 5 May 2004.', wrong: 'in', accepted: ['on'], explanation: l('on + a date.', 'on + তারিখ।'), why: { prompt: whyJob, options: ['Dates take "on"', 'Years always take "on"', '"born" takes "at"'], answer: 'Dates take "on"', explanation: l('in May, in 2004, but on 5 May.', 'in May, in 2004, কিন্তু on 5 May।') } },
    { sentence: 'Sales rose with 10% last year.', wrong: 'with', accepted: ['by'], explanation: l('rose by + the amount of change.', 'rose by + পরিবর্তনের পরিমাণ।'), why: { prompt: whyJob, options: ['The amount of change takes "by"', '"with" is for years', '"rose" takes no preposition'], answer: 'The amount of change takes "by"', explanation: l('rose by 10% (change); rose to 50% (new level).', 'rose by 10% (পরিবর্তন); rose to 50% (নতুন মান)।') } },
  ],
  mistakes: [
    { wrong: 'depend of', right: 'depend on', why: l('Partner preposition.', 'সঙ্গী preposition।') },
    { wrong: 'in 5 May', right: 'on 5 May', why: l('on + date.', 'on + তারিখ।') },
    { wrong: 'rose with 10%', right: 'rose by 10%', why: l('by + change.', 'by + পরিবর্তন।') },
  ],
  practice: [
    gap('pl-5-r1', C, { prompt: l('Write the preposition.', 'Preposition লেখো।'), sentence: 'The meeting starts ______ 9 a.m.', accepted: ['at'], tag: 'preposition', pattern: 'prep-choice', explanation: l('at + clock time.', 'at + ঘড়ির সময়।') }),
    gap('pl-5-r2', C, { prompt: l('Write the preposition.', 'Preposition লেখো।'), sentence: 'Unemployment fell ______ 8% in 2019 (the new level).', accepted: ['to'], tag: 'preposition', pattern: 'prep-choice', explanation: l('fell to + the new level.', 'fell to + নতুন মান।') }),
    spot('pl-5-r3', C, { sentence: 'Students should focus in their weakest skill.', wrong: 'in', accepted: ['on'], tag: 'preposition', pattern: 'prep-choice', explanation: l('focus on.', 'focus on।') }),
  ],
  points: [l('in (month, year) · on (day, date) · at (time).', 'in (মাস, বছর) · on (দিন, তারিখ) · at (সময়)।'), l('depend on · focus on · rose by (change) · rose to (level).', 'depend on · focus on · rose by (পরিবর্তন) · rose to (মান)।')],
});

const conj = station({
  n: 6, tag: 'connector', pattern: 'conj-logic',
  title: l('Conjunction mistakes', 'Conjunction-এর ভুল'),
  why: l('The wrong linking word says the wrong thing: reason instead of result, contrast instead of addition.', 'ভুল linking word ভুল কথা বলে: ফলাফলের জায়গায় কারণ, যোগের জায়গায় বিপরীত।'),
  hook: {
    kind: 'hook', title: l('A Task 2 sentence', 'একটা Task 2 sentence'),
    situation: l('"Public transport is cheap, so many people still drive. Although it is slow, but it is safe."', '"Public transport is cheap, so many people still drive. Although it is slow, but it is safe."'),
    question: l('What is wrong with the linking words?', 'Linking word-গুলোতে সমস্যা কী?'),
    options: ['They show the wrong relation or are doubled', 'They are too formal', 'Nothing is wrong'],
    answer: 'They show the wrong relation or are doubled',
    diagnose: {
      'They show the wrong relation or are doubled': l('Yes: cheap BUT many still drive (contrast); "Although … but" uses two linkers for one contrast.', 'হ্যাঁ: cheap BUT many still drive (বিপরীত); "Although … but"-এ এক বিপরীতের জন্য দুটো linker।'),
      'They are too formal': l('so, although, but are normal words. The problem is their meaning and the doubling.', 'so, although, but সাধারণ word। সমস্যা অর্থে আর দুবার ব্যবহারে।'),
      'Nothing is wrong': l('"cheap, so people drive" is illogical: cheap transport is a reason to use it, not to drive.', '"cheap, so people drive" অযৌক্তিক: সস্তা transport ব্যবহারের কারণ, গাড়ি চালানোর না।'),
    },
  },
  repairs: [
    { sentence: 'Public transport is cheap, so many people still drive.', wrong: 'so', accepted: ['but', 'yet'], explanation: l('Cheap transport, yet people drive → contrast: but.', 'সস্তা transport, তবুও মানুষ গাড়ি চালায় → বিপরীত: but।'), why: { prompt: whyJob, options: ['The relation is contrast, not result', '"so" cannot follow a comma', '"still" must be removed'], answer: 'The relation is contrast, not result', explanation: l('so = result; but = contrast.', 'so = ফলাফল; but = বিপরীত।') } },
    { sentence: 'I was very hungry, because I ate a big lunch.', wrong: 'because', accepted: ['so'], explanation: l('Hunger → eating a big lunch: the second idea is the result → so.', 'খিদে → বড় lunch খাওয়া: দ্বিতীয় idea-টা ফলাফল → so।'), why: { prompt: whyJob, options: ['The second idea is a result, not a reason', '"hungry" must be "hunger"', '"big" must be "bigger"'], answer: 'The second idea is a result, not a reason', explanation: l('because = reason; so = result.', 'because = কারণ; so = ফলাফল।') } },
    { sentence: 'Despite it was raining, the match continued.', wrong: 'Despite', accepted: ['Although', 'Though', 'Even though'], explanation: l('despite + noun/-ing; although + subject + verb (it was raining).', 'despite + noun/-ing; although + subject + verb (it was raining)।'), why: { prompt: whyJob, options: ['"despite" cannot be followed by subject + verb', '"match" must be plural', '"continued" must be present'], answer: '"despite" cannot be followed by subject + verb', explanation: l('Despite the rain / Although it was raining.', 'Despite the rain / Although it was raining।') } },
  ],
  mistakes: [
    { wrong: 'cheap, so people drive', right: 'cheap, but people drive', why: l('Contrast.', 'বিপরীত।') },
    { wrong: 'hungry, because I ate', right: 'hungry, so I ate', why: l('Result.', 'ফলাফল।') },
    { wrong: 'Despite it was raining', right: 'Although it was raining', why: l('although + clause.', 'although + clause।') },
  ],
  practice: [
    gap('pl-6-r1', C, { prompt: l('Write a linking word showing result.', 'ফলাফল বোঝায় এমন linking word লেখো।'), sentence: 'The bus was late, ______ I missed the exam.', accepted: ['so'], tag: 'connector', pattern: 'conj-logic', explanation: l('Result → so.', 'ফলাফল → so।') }),
    gap('pl-6-r2', C, { prompt: l('Write one word to start the second sentence (contrast).', 'দ্বিতীয় sentence শুরু করতে একটা word লেখো (বিপরীত)।'), sentence: 'Cars are convenient. ______, they cause pollution.', accepted: ['however', 'nevertheless', 'nonetheless'], tag: 'connector', pattern: 'conj-logic', explanation: l('New sentence + contrast → However,', 'নতুন sentence + বিপরীত → However,') }),
    correct('pl-6-r3', C, { prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে লেখো।'), sentence: 'Although the flat is small, but it is comfortable.', accepted: ['Although the flat is small, it is comfortable.', 'The flat is small, but it is comfortable.'], tag: 'connector', pattern: 'conj-logic', explanation: l('One linker for one contrast.', 'এক বিপরীতের জন্য একটা linker।') }),
  ],
  points: [l('Choose the relation first: reason (because), result (so), contrast (but, although).', 'আগে সম্পর্ক ঠিক করো: কারণ (because), ফলাফল (so), বিপরীত (but, although)।'), l('Never "although … but". despite + noun, although + clause.', 'কখনো "although … but" না। despite + noun, although + clause।')],
});

const forms = station({
  n: 7, tag: 'word-form',
  title: l('Word-form mistakes', 'Word-form-এর ভুল'),
  why: l('Right word, wrong form: the most common Lexical Resource slip in IELTS Writing.', 'ঠিক word, ভুল form: IELTS Writing-এর সবচেয়ে common Lexical Resource ভুল।'),
  hook: {
    kind: 'hook', title: l('A Task 2 sentence', 'একটা Task 2 sentence'),
    situation: l('"The develop of technology has made communication more easy and more effectively."', '"The develop of technology has made communication more easy and more effectively."'),
    question: l('What would you check first?', 'প্রথমে কী পরীক্ষা করবে?'),
    options: ['Which job each word does after its neighbours', 'The spelling of "technology"', 'The length of the sentence'],
    answer: 'Which job each word does after its neighbours',
    diagnose: {
      'Which job each word does after its neighbours': l('Yes: The ___ of → development; more ___ (after "made communication") → effective; "more easy" → easier.', 'হ্যাঁ: The ___ of → development; more ___ ("made communication"-এর পরে) → effective; "more easy" → easier।'),
      'The spelling of "technology"': l('It is spelled correctly. The forms of develop and effective are the problem.', 'বানান ঠিক আছে। develop আর effective-এর form সমস্যা।'),
      'The length of the sentence': l('Length is fine. Check each word’s job.', 'দৈর্ঘ্য ঠিক আছে। প্রতিটা word-এর কাজ দেখো।'),
    },
  },
  repairs: [
    { sentence: 'The develop of technology has changed our lives.', wrong: 'develop', accepted: ['development'], pos: 'noun', wrongPos: { develop: 'verb' }, family: 'develop', explanation: l('The ___ of → noun.', 'The ___ of → noun।'), why: { prompt: whyJob, options: ['After "The" and before "of", you need a noun', '"technology" must be a verb', '"changed" must be a noun'], answer: 'After "The" and before "of", you need a noun', explanation: l('the development of.', 'the development of।') } },
    { sentence: 'Many people want to live a health life.', wrong: 'health', accepted: ['healthy'], pos: 'adjective', wrongPos: { health: 'noun' }, family: 'health', explanation: l('a ___ life → adjective.', 'a ___ life → adjective।'), why: { prompt: whyJob, options: ['It describes "life", so it must be an adjective', '"life" must be a verb', '"want" must be "wants"'], answer: 'It describes "life", so it must be an adjective', explanation: l('health (noun) → healthy (adjective).', 'health (noun) → healthy (adjective)।') } },
    { sentence: 'Governments should protection the environment.', wrong: 'protection', accepted: ['protect'], pos: 'verb', wrongPos: { protection: 'noun' }, family: 'protect', explanation: l('should + verb.', 'should + verb।'), why: { prompt: whyJob, options: ['After "should", you need a verb', '"environment" must be an adjective', '"Governments" must be singular'], answer: 'After "should", you need a verb', explanation: l('should protect.', 'should protect।') } },
  ],
  mistakes: [
    { wrong: 'The develop of', right: 'The development of', why: l('noun', 'noun') },
    { wrong: 'a health life', right: 'a healthy life', why: l('adjective', 'adjective') },
    { wrong: 'should protection', right: 'should protect', why: l('verb', 'verb') },
  ],
  practice: [
    gap('pl-7-r1', C, { prompt: l('Write the correct form of "decide".', '"decide"-এর সঠিক form লেখো।'), sentence: 'It was a difficult ______ for the family.', base: 'decide', accepted: ['decision'], pos: 'noun', wrongPos: { decide: 'verb' }, family: 'decide', explanation: l('a difficult ___ → noun.', 'a difficult ___ → noun।') }),
    gap('pl-7-r2', C, { prompt: l('Write the correct form of "beauty".', '"beauty"-এর সঠিক form লেখো।'), sentence: 'Sylhet is famous for its ______ tea gardens.', base: 'beauty', accepted: ['beautiful'], pos: 'adjective', wrongPos: { beauty: 'noun' }, family: 'beauty', explanation: l('its ___ gardens → adjective.', 'its ___ gardens → adjective।') }),
    spot('pl-7-r3', C, { sentence: 'We need to improvement our public schools.', wrong: 'improvement', accepted: ['improve'], pos: 'verb', wrongPos: { improvement: 'noun' }, family: 'improve', explanation: l('to + verb.', 'to + verb।') }),
  ],
  points: [l('Neighbours decide the form: the ___ of → noun; a ___ + noun → adjective; should/to ___ → verb.', 'আশেপাশের word form ঠিক করে: the ___ of → noun; a ___ + noun → adjective; should/to ___ → verb।')],
});

const sv = station({
  n: 8, tag: 'agreement', pattern: 'sv-agreement',
  title: l('Subject–verb mistakes', 'Subject–verb-এর ভুল'),
  why: l('"He go", "The number of students are": examiners notice these at once, in Writing and Speaking.', '"He go", "The number of students are": examiner Writing আর Speaking-এ এগুলো সাথে সাথে ধরে।'),
  skill: 'grammar',
  hook: {
    kind: 'hook', title: l('A Speaking answer', 'একটা Speaking উত্তর'),
    situation: l('"My brother go to university every day. The number of students in his class are very high."', '"My brother go to university every day. The number of students in his class are very high."'),
    question: l('What do both problems have in common?', 'দুটো সমস্যার মধ্যে মিল কী?'),
    options: ['The verb does not match its subject', 'The nouns are uncountable', 'The tense should be past'],
    answer: 'The verb does not match its subject',
    diagnose: {
      'The verb does not match its subject': l('Yes: my brother goes; the number … is.', 'হ্যাঁ: my brother goes; the number … is।'),
      'The nouns are uncountable': l('brother, students are countable. The verbs are the problem.', 'brother, students countable। verb-গুলোই সমস্যা।'),
      'The tense should be past': l('"every day" is a habit: present simple is right. The verb form is wrong.', '"every day" অভ্যাস: present simple ঠিক। verb form ভুল।'),
    },
  },
  repairs: [
    { sentence: 'My brother go to university every day.', wrong: 'go', accepted: ['goes'], pos: 'verb', explanation: l('he/she/it (my brother) + verb-s: goes.', 'he/she/it (my brother) + verb-s: goes।'), why: { prompt: whyJob, options: ['"My brother" is he, so the verb needs -s', '"university" needs "the"', '"every day" needs past tense'], answer: '"My brother" is he, so the verb needs -s', explanation: l('Present simple: he goes, she works, it costs.', 'Present simple: he goes, she works, it costs।') } },
    { sentence: 'The number of cars on the roads are rising.', wrong: 'are', accepted: ['is'], pos: 'verb', explanation: l('The subject is "the number" (singular).', 'Subject হলো "the number" (singular)।'), why: { prompt: whyJob, options: ['The subject is "the number", not "cars"', '"roads" must be singular', '"rising" must be "rise"'], answer: 'The subject is "the number", not "cars"', explanation: l('Cover "of cars on the roads": the number is rising.', '"of cars on the roads" ঢেকে দাও: the number is rising।') } },
    { sentence: 'Everyone in my family enjoy cricket.', wrong: 'enjoy', accepted: ['enjoys'], pos: 'verb', explanation: l('everyone is singular → enjoys.', 'everyone singular → enjoys।'), why: { prompt: whyJob, options: ['"Everyone" is singular', '"family" must be plural', '"cricket" must be plural'], answer: '"Everyone" is singular', explanation: l('everyone, everybody, each → singular verb.', 'everyone, everybody, each → singular verb।') } },
  ],
  mistakes: [
    { wrong: 'My brother go', right: 'My brother goes', why: l('he + verb-s', 'he + verb-s') },
    { wrong: 'The number of cars are', right: 'The number of cars is', why: l('the number = singular', 'the number = singular') },
    { wrong: 'Everyone enjoy', right: 'Everyone enjoys', why: l('everyone = singular', 'everyone = singular') },
  ],
  practice: [
    gap('pl-8-r1', C, { prompt: l('Write the correct form of "cost".', '"cost"-এর সঠিক form লেখো।'), sentence: 'A metro ticket ______ 60 taka.', base: 'cost', accepted: ['costs'], tag: 'agreement', pattern: 'sv-agreement', explanation: l('a ticket (it) + costs.', 'a ticket (it) + costs।') }),
    gap('pl-8-r2', C, { prompt: l('Write is or are.', 'is বা are লেখো।'), sentence: 'A number of students ______ taking the test again.', accepted: ['are'], tag: 'agreement', pattern: 'sv-agreement', explanation: l('"a number of" = many → plural: are.', '"a number of" = অনেক → plural: are।') }),
    correct('pl-8-r3', C, { prompt: l('Rewrite the sentence correctly.', 'Sentence-টা ঠিক করে লেখো।'), sentence: 'He don’t like crowded places.', accepted: ['He doesn’t like crowded places.', "He doesn't like crowded places.", 'He does not like crowded places.'], tag: 'agreement', pattern: 'sv-agreement', explanation: l('he + doesn’t.', 'he + doesn’t।') }),
  ],
  points: [l('Find the real subject (cover "of …"), then match the verb.', 'আসল subject খোঁজো ("of …" ঢেকে দাও), তারপর verb মেলাও।'), l('he/she/it/everyone + verb-s; the number of = singular; a number of = plural.', 'he/she/it/everyone + verb-s; the number of = singular; a number of = plural।')],
});

export const posLabLessons: Lesson[] = [noun, verb, pronoun, adjAdv, prep, conj, forms, sv];

/** Station categories for the lab page, in order. */
export const LAB_CATEGORIES: { lessonId: string; pattern?: string; pairs?: string[] }[] = [
  { lessonId: 'pl-1', pattern: 'noun-count' },
  { lessonId: 'pl-2', pattern: 'verb-form' },
  { lessonId: 'pl-3', pattern: 'pronoun-form' },
  { lessonId: 'pl-4', pairs: ['adjective>adverb', 'adverb>adjective'] },
  { lessonId: 'pl-5', pattern: 'prep-choice' },
  { lessonId: 'pl-6', pattern: 'conj-logic' },
  { lessonId: 'pl-7', pairs: ['noun>verb', 'verb>noun', 'adjective>noun', 'noun>adjective'] },
  { lessonId: 'pl-8', pattern: 'sv-agreement' },
];

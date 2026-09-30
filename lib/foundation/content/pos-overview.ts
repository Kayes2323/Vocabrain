import type { Lesson } from '../model';
import { choice, identify, l } from './pos-kit';

/**
 * Parts of Speech · Overview: the opening lesson. What a "part of speech" is,
 * why it matters, and the eight jobs in one picture — before each job gets
 * its own unit. Original Mino content.
 */
const C = 'pos-overview';

const overview: Lesson = {
  id: 'po-1', unit: 'overview', concept: C, minutes: 6, difficulty: 'easy', skill: 'grammar',
  title: l('What are Parts of Speech?', 'Parts of Speech কী?'),
  why: l('Every word in a sentence has a job. Know the job, and you know which form of the word to use.', 'Sentence-এর প্রতিটা word-এর একটা কাজ আছে। কাজটা জানলে বুঝবেন word-এর কোন form বসবে।'),
  steps: [
    {
      kind: 'concept',
      title: l('A word has a job', 'প্রতিটা word-এর একটা কাজ'),
      body: l(
        'A "part of speech" is the job a word does in a sentence. Some words name things. Some show an action. Some describe. English has eight main jobs.',
        '"Part of speech" মানে sentence-এ একটা word কী কাজ করছে। কোনো word নাম বোঝায়, কোনোটা কাজ বোঝায়, কোনোটা বর্ণনা করে। English-এ মূল কাজ আটটা।',
      ),
    },
    {
      kind: 'concept',
      title: l('The eight jobs', 'আটটা কাজ'),
      body: l('Here is each job in one line. Each one has its own unit later.', 'প্রতিটা কাজ এক লাইনে। পরে প্রতিটার আলাদা unit আছে।'),
      points: [
        l('Noun: names a person, place, thing or idea — student, Dhaka, book, education.', 'Noun: মানুষ, জায়গা, জিনিস বা idea-র নাম — student, Dhaka, book, education।'),
        l('Pronoun: stands in for a noun — he, she, it, they, this.', 'Pronoun: noun-এর জায়গায় বসে — he, she, it, they, this।'),
        l('Verb: shows an action or a state — study, go, is, have.', 'Verb: কাজ বা অবস্থা বোঝায় — study, go, is, have।'),
        l('Adjective: describes a noun — big, useful, expensive.', 'Adjective: noun-কে বর্ণনা করে — big, useful, expensive।'),
        l('Adverb: tells how, when or how much — quickly, often, very.', 'Adverb: কীভাবে, কখন বা কতটা — quickly, often, very।'),
        l('Preposition: shows place, time or relation — in, on, at, from.', 'Preposition: জায়গা, সময় বা সম্পর্ক দেখায় — in, on, at, from।'),
        l('Conjunction: joins words or ideas — and, but, because.', 'Conjunction: word বা idea জোড়া দেয় — and, but, because।'),
        l('Interjection: shows a quick feeling — oh, wow, well.', 'Interjection: হঠাৎ অনুভূতি দেখায় — oh, wow, well।'),
      ],
    },
    {
      kind: 'concept',
      title: l('One idea, different jobs', 'এক idea, আলাদা কাজ'),
      body: l(
        'One idea can have several forms: success (noun), succeed (verb), successful (adjective), successfully (adverb). The job of the gap tells you which form to use.',
        'এক idea-র কয়েকটা form হতে পারে: success (noun), succeed (verb), successful (adjective), successfully (adverb)। Gap-এ কোন কাজ দরকার, সেটা দেখেই বুঝবেন কোন form বসবে।',
      ),
    },
    {
      kind: 'examples',
      title: l('One sentence, many jobs', 'এক sentence, অনেক কাজ'),
      items: [
        { en: 'My brother studies hard.', note: l('brother = noun · studies = verb · hard = adverb (how he studies).', 'brother = noun · studies = verb · hard = adverb (কীভাবে পড়ে)।') },
        { en: 'The new library is near the station.', note: l('new = adjective (describes library) · near = preposition (place).', 'new = adjective (library-কে বর্ণনা করে) · near = preposition (জায়গা)।') },
        { en: 'She was tired, but she finished the essay.', note: l('she = pronoun · but = conjunction (joins two ideas).', 'she = pronoun · but = conjunction (দুটো idea জোড়ে)।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Same idea, wrong job', 'একই idea, ভুল কাজ'),
      items: [
        { wrong: 'She is very success.', right: 'She is very successful.', why: l('After "is very" you describe her: you need an adjective.', '"is very"-র পরে তাকে বর্ণনা করছেন: adjective লাগবে।') },
        { wrong: 'He speaks English fluent.', right: 'He speaks English fluently.', why: l('It tells HOW he speaks: you need an adverb.', 'কীভাবে বলে, সেটা বলছে: adverb লাগবে।') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'reading', example: 'The ___ of the new policy was clear.', note: l('Completion tasks: "The ___ of" needs a noun (effect, success), not an adjective.', 'Completion task: "The ___ of"-এ noun লাগে (effect, success), adjective না।') },
        { skill: 'writing', example: 'Online learning has grown rapidly.', note: l('Task 1 and 2: "grown rapidly" (verb + adverb), not "grown rapid".', 'Task 1 আর 2: "grown rapidly" (verb + adverb), "grown rapid" না।') },
      ],
    },
    identify({
      sentence: 'Many/adjective students/noun work/verb quietly/adverb in/preposition the library.',
      choices: ['noun', 'verb', 'adjective', 'adverb', 'preposition'],
      pattern: l('students names people (noun), work is the action (verb), many describes students (adjective), quietly tells how (adverb), in shows place (preposition).', 'students মানুষের নাম (noun), work কাজ (verb), many students-কে বর্ণনা করে (adjective), quietly কীভাবে (adverb), in জায়গা দেখায় (preposition)।'),
    }),
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('po-1-p1', C, { prompt: l('What job does "book" do here?', 'এখানে "book" কী কাজ করছে?'), sentence: 'I bought a book.', options: ['noun', 'verb', 'adjective'], answer: 'noun', pos: 'noun', wrongPos: { verb: 'verb', adjective: 'adjective' }, explanation: l('"a book" names a thing: noun.', '"a book" একটা জিনিসের নাম: noun।'), why: { verb: l('Here nothing is being done by "book". It is the thing you bought.', 'এখানে "book" কোনো কাজ না। এটা কেনা জিনিসটা।') } }),
        choice('po-1-p2', C, { prompt: l('What job does "quickly" do?', '"quickly" কী কাজ করছে?'), sentence: 'The bus left quickly.', options: ['adverb', 'adjective', 'verb'], answer: 'adverb', pos: 'adverb', wrongPos: { adjective: 'adjective', verb: 'verb' }, explanation: l('It tells HOW the bus left: adverb.', 'Bus কীভাবে গেল, সেটা বলে: adverb।'), why: { adjective: l('An adjective describes a noun. "quickly" describes the action "left".', 'Adjective noun-কে বর্ণনা করে। "quickly" বর্ণনা করছে কাজ "left"-কে।') } }),
        choice('po-1-p3', C, { prompt: l('Which word is a conjunction?', 'কোন word-টা conjunction?'), sentence: 'I was hungry, so I cooked rice.', options: ['so', 'hungry', 'rice'], answer: 'so', pos: 'conjunction', wrongPos: { hungry: 'adjective', rice: 'noun' }, explanation: l('"so" joins two ideas: conjunction.', '"so" দুটো idea জোড়ে: conjunction।') }),
        choice('po-1-p4', C, { prompt: l('The gap needs an adjective. Choose it.', 'Gap-এ adjective লাগবে। বেছে নিন।'), sentence: 'Online courses are very ___ for working people.', options: ['useful', 'use', 'usefully'], answer: 'useful', pos: 'adjective', wrongPos: { use: 'noun', usefully: 'adverb' }, explanation: l('After "are very" we describe the courses: useful.', '"are very"-র পরে courses-কে বর্ণনা করছি: useful।'), why: { usefully: l('"usefully" is an adverb. It describes an action, not "courses".', '"usefully" adverb। এটা কাজকে বর্ণনা করে, "courses"-কে না।') } }),
        choice('po-1-p5', C, { prompt: l('Task 2: choose the right form.', 'Task 2: ঠিক form বেছে নিন।'), sentence: 'Technology has changed education ___.', options: ['significantly', 'significant', 'significance'], answer: 'significantly', pos: 'adverb', wrongPos: { significant: 'adjective', significance: 'noun' }, explanation: l('It tells HOW MUCH education changed: adverb, significantly.', 'Education কতটা বদলেছে, সেটা বলে: adverb, significantly।'), why: { significant: l('"significant" describes a noun ("a significant change"). Here we describe the verb "changed".', '"significant" noun-কে বর্ণনা করে ("a significant change")। এখানে verb "changed"-কে বর্ণনা করছি।') } }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('A part of speech is the job a word does in a sentence.', 'Part of speech মানে sentence-এ word-টা কী কাজ করছে।'),
        l('Eight jobs: noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection.', 'আটটা কাজ: noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection।'),
        l('The job of the gap tells you the form: successful (adjective) or successfully (adverb).', 'Gap-এর কাজ দেখে form ঠিক করুন: successful (adjective) নাকি successfully (adverb)।'),
      ],
    },
  ],
};

export const posOverviewLessons: Lesson[] = [overview];

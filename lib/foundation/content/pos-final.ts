import type { Exercise, L } from '../model';
import { choice, correct, gap, l, order, spot, tagWords } from './pos-kit';

/**
 * Parts of Speech · Final Mastery Challenge. Ten parts (A–J); each has 4 items at
 * levels 1 (easy) – 3 (hard). The challenge serves 3 per part, adaptively: a right
 * answer moves the level up, a wrong one moves it down. Many items are free recall.
 * Items are new (not copied from lessons). Original Vocab Brain content.
 */
export type FinalItem = Exercise & { level: 1 | 2 | 3 };
export interface FinalPart {
  id: string;
  title: L;
  intro: L;
  items: FinalItem[];
}

const at = <T extends Exercise>(level: 1 | 2 | 3, e: T): T & { level: 1 | 2 | 3 } => ({ ...e, level });

export const FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('Identify', 'চিহ্নিত করো'), intro: l('Tag each marked word with its job.', 'চিহ্ন দেওয়া প্রতিটা word-এর কাজ বাছো।'),
    items: [
      at(1, tagWords('pfin-a1', 'pos-noun', { sentence: 'My/pronoun brother/noun cooks/verb delicious/adjective food./noun', choices: ['noun', 'pronoun', 'verb', 'adjective'], explanation: l('My (pronoun) brother (noun) cooks (verb) delicious (adjective) food (noun).', 'My (pronoun) brother (noun) cooks (verb) delicious (adjective) food (noun)।') })),
      at(2, tagWords('pfin-a2', 'pos-adverb', { sentence: 'Prices/noun increased/verb slightly/adverb after/preposition the long/adjective strike./noun', choices: ['noun', 'verb', 'adjective', 'adverb', 'preposition'], explanation: l('increased slightly (verb + adverb); after (preposition); the long strike (adjective + noun).', 'increased slightly (verb + adverb); after (preposition); the long strike (adjective + noun)।') })),
      at(2, tagWords('pfin-a3', 'pos-conjunction', { sentence: 'Although/conjunction the flat/noun is/verb small,/adjective it/pronoun feels/verb bright./adjective', choices: ['noun', 'pronoun', 'verb', 'adjective', 'conjunction'], explanation: l('After is / feels → adjectives (small, bright). Although joins the ideas.', 'is / feels-এর পরে → adjective (small, bright)। Although idea জোড়ে।') })),
      at(3, tagWords('pfin-a4', 'pos-forms', { sentence: 'The rapid/adjective growth/noun of cities/noun has seriously/adverb affected/verb local/adjective wildlife./noun', choices: ['noun', 'verb', 'adjective', 'adverb'], explanation: l('rapid growth (adj + noun); seriously affected (adverb + verb); local wildlife (adj + noun).', 'rapid growth (adj + noun); seriously affected (adverb + verb); local wildlife (adj + noun)।') })),
    ],
  },
  {
    id: 'B', title: l('Correct', 'ঠিক করো'), intro: l('Tap the word that breaks the sentence and type the fix.', 'যে word sentence ভাঙছে তাতে tap করো আর ঠিক word লেখো।'),
    items: [
      at(1, spot('pfin-b1', 'pos-adjective', { sentence: 'She is a very kindly person.', wrong: 'kindly', accepted: ['kind'], pos: 'adjective', wrongPos: { kindly: 'adverb' }, explanation: l('a very ___ person → adjective: kind.', 'a very ___ person → adjective: kind।') })),
      at(2, spot('pfin-b2', 'pos-verb', { sentence: 'The children was playing in the park.', wrong: 'was', accepted: ['were'], pattern: 'sv-agreement', tag: 'agreement', explanation: l('children (plural) → were.', 'children (plural) → were।') })),
      at(2, spot('pfin-b3', 'pos-preposition', { sentence: 'The results depend of the weather.', wrong: 'of', accepted: ['on'], pattern: 'prep-choice', tag: 'preposition', explanation: l('depend on.', 'depend on।') })),
      at(3, spot('pfin-b4', 'pos-forms', { sentence: 'The lack of affordable house is a serious problem.', wrong: 'house', accepted: ['housing', 'houses', 'homes'], pos: 'noun', family: 'house', explanation: l('After "affordable", the general idea is uncountable "housing" (or plural houses).', '"affordable"-এর পরে সাধারণ idea: uncountable "housing" (বা plural houses)।') })),
    ],
  },
  {
    id: 'C', title: l('Explain', 'ব্যাখ্যা করো'), intro: l('Choose the real reason.', 'আসল কারণটা বাছো।'),
    items: [
      at(1, choice('pfin-c1', 'pos-adverb', { prompt: l('Why is "She sings beautiful" wrong?', '"She sings beautiful" কেন ভুল?'), options: ['"sings" is a verb, so it needs an adverb', '"She" must be "Her"', '"beautiful" must be plural'], answer: '"sings" is a verb, so it needs an adverb', explanation: l('sings beautifully.', 'sings beautifully।') })),
      at(2, choice('pfin-c2', 'pos-pronoun', { prompt: l('Why is "The tree lost it’s leaves" wrong?', '"The tree lost it’s leaves" কেন ভুল?'), options: ['"it’s" means "it is"; the possessive is "its"', '"leaves" must be "leafs"', '"lost" must be "loses"'], answer: '"it’s" means "it is"; the possessive is "its"', explanation: l('its = belonging to it.', 'its = এটার।') })),
      at(2, choice('pfin-c3', 'pos-verb', { prompt: l('Why is "The number of accidents are falling" wrong?', '"The number of accidents are falling" কেন ভুল?'), options: ['The subject is "the number" (singular)', '"accidents" must be singular', '"falling" must be "fall"'], answer: 'The subject is "the number" (singular)', explanation: l('The number … is falling.', 'The number … is falling।') })),
      at(3, choice('pfin-c4', 'pos-conjunction', { prompt: l('Why is "Despite the bus was late, we arrived on time" wrong?', '"Despite the bus was late, we arrived on time" কেন ভুল?'), options: ['"despite" needs a noun or -ing, not subject + verb', '"on time" must be "in time"', '"arrived" must be present'], answer: '"despite" needs a noun or -ing, not subject + verb', explanation: l('Despite the late bus / Although the bus was late.', 'Despite the late bus / Although the bus was late।') })),
    ],
  },
  {
    id: 'D', title: l('Reading application', 'Reading-এ প্রয়োগ'), intro: l('Use the job of a word to read smarter.', 'Word-এর কাজ দিয়ে আরো ভালোভাবে পড়ো।'),
    items: [
      at(1, choice('pfin-d1', 'pos-ielts', { prompt: l('What job is "drought" doing?', '"drought" কী কাজ করছে?'), sentence: 'A long drought destroyed most of the crops.', options: ['noun', 'verb', 'adjective'], answer: 'noun', pos: 'noun', wrongPos: { verb: 'verb', adjective: 'adjective' }, explanation: l('A long ___ + verb → noun (the subject).', 'A long ___ + verb → noun (subject)।') })),
      at(2, choice('pfin-d2', 'pos-ielts', { prompt: l('Which phrase paraphrases "Crime fell sharply"?', '"Crime fell sharply"-এর paraphrase কোনটা?'), options: ['a sharp fall in crime', 'a sharply crime', 'crime is sharp'], answer: 'a sharp fall in crime', explanation: l('fell sharply (verb + adverb) = a sharp fall (adjective + noun).', 'fell sharply (verb + adverb) = a sharp fall (adjective + noun)।') })),
      at(2, gap('pfin-d3', 'pos-ielts', { prompt: l('Write the job of "deteriorated".', '"deteriorated"-এর কাজ লেখো।'), sentence: 'Air quality deteriorated after the factory opened. → ___', accepted: ['verb'], pos: 'verb', wrongPos: { noun: 'noun', adjective: 'adjective', adverb: 'adverb' }, explanation: l('Air quality (subject) + ___ → verb (it got worse).', 'Air quality (subject) + ___ → verb (খারাপ হলো)।') })),
      at(3, choice('pfin-d4', 'pos-ielts', { prompt: l('"The scheme proved remarkably durable." What does the job of "durable" tell you?', '"The scheme proved remarkably durable."-এ "durable"-এর কাজ কী বলে?'), options: ['It is an adjective describing the scheme (after "proved")', 'It is an action the scheme did', 'It is a thing, the object of "proved"'], answer: 'It is an adjective describing the scheme (after "proved")', explanation: l('proved + adverb + adjective: the scheme was long-lasting.', 'proved + adverb + adjective: scheme-টা টেকসই ছিল।') })),
    ],
  },
  {
    id: 'E', title: l('Listening-style prediction', 'Listening-এর মতো আন্দাজ'), intro: l('Predict the answer before you "hear" it.', '"শোনার" আগে উত্তর আন্দাজ করো।'),
    items: [
      at(1, choice('pfin-e1', 'pos-ielts', { prompt: l('Predict the answer type.', 'উত্তরের ধরন আন্দাজ করো।'), sentence: 'Class size: maximum ______ students', options: ['a number', 'an adjective', 'a place'], answer: 'a number', explanation: l('maximum ___ students → a number.', 'maximum ___ students → সংখ্যা।') })),
      at(2, gap('pfin-e2', 'pos-ielts', { prompt: l('Which job does the gap need?', 'Gap-এ কোন কাজের word লাগবে?'), sentence: 'Visitors should wear ______ clothing. → ___', accepted: ['adjective'], pos: 'adjective', wrongPos: { noun: 'noun', verb: 'verb', adverb: 'adverb' }, explanation: l('___ clothing → adjective (warm, light).', '___ clothing → adjective (warm, light)।') })),
      at(2, gap('pfin-e3', 'pos-ielts', { prompt: l('You hear: "We’ll need three volunteers." Complete: "Number needed: three ______."', 'তুমি শুনলে: "We’ll need three volunteers." লেখো: "Number needed: three ______."'), sentence: 'Number needed: three ______', accepted: ['volunteers'], pattern: 'noun-count', explanation: l('three + plural: volunteers.', 'three + plural: volunteers।') })),
      at(3, gap('pfin-e4', 'pos-ielts', { prompt: l('You hear: "It was on Monday… sorry, the talk has moved to the following day." Talk day: ______', 'তুমি শুনলে: "It was on Monday… sorry, the talk has moved to the following day." Talk day: ______'), sentence: 'Talk day: ______', accepted: ['tuesday'], explanation: l('The day after Monday: Tuesday. Speakers correct themselves.', 'Monday-এর পরের দিন: Tuesday। বক্তা নিজেকে শুধরে নেয়।') })),
    ],
  },
  {
    id: 'F', title: l('Writing correction', 'Writing সংশোধন'), intro: l('Rewrite the sentence without its mistake.', 'ভুল ছাড়া sentence-টা আবার লেখো।'),
    items: [
      at(1, correct('pfin-f1', 'pos-verb', { prompt: l('Rewrite correctly.', 'ঠিক করে লেখো।'), sentence: 'Governments should investment in clean energy.', accepted: ['Governments should invest in clean energy.'], pos: 'verb', explanation: l('should + verb: invest.', 'should + verb: invest।') })),
      at(2, correct('pfin-f2', 'pos-adjective', { prompt: l('Rewrite correctly.', 'ঠিক করে লেখো।'), sentence: 'This had a hugely impact on small businesses.', accepted: ['This had a huge impact on small businesses.'], pos: 'adjective', explanation: l('a + adjective + noun: a huge impact.', 'a + adjective + noun: a huge impact।') })),
      at(2, correct('pfin-f3', 'pos-lab', { prompt: l('Rewrite correctly.', 'ঠিক করে লেখো।'), sentence: 'Young people are increasing use of social media.', accepted: ['Young people are increasingly using social media.', 'Young people are using social media increasingly.', 'Young people are increasing their use of social media.'], explanation: l('increasingly (adverb) + are using.', 'increasingly (adverb) + are using।') })),
      at(3, correct('pfin-f4', 'pos-lab', { prompt: l('Rewrite correctly (two mistakes).', 'ঠিক করে লেখো (দুটো ভুল)।'), sentence: 'The number of tourist have risen dramatic.', accepted: ['The number of tourists has risen dramatically.'], pattern: 'sv-agreement', tag: 'agreement', explanation: l('tourists (plural after "number of"), has (the number), dramatically (adverb).', 'tourists ("number of"-এর পরে plural), has (the number), dramatically (adverb)।') })),
    ],
  },
  {
    id: 'G', title: l('Speaking application', 'Speaking-এ প্রয়োগ'), intro: l('Accurate and natural spoken English.', 'সঠিক আর স্বাভাবিক কথ্য English।'),
    items: [
      at(1, choice('pfin-g1', 'pos-adverb', { prompt: l('Choose the correct answer.', 'সঠিক উত্তর বাছো।'), sentence: 'Examiner: Can you swim? You: Yes, I can swim quite ______.', options: ['well', 'good', 'goodly'], answer: 'well', pos: 'adverb', wrongPos: { good: 'adjective' }, explanation: l('swim + adverb: well.', 'swim + adverb: well।') })),
      at(2, choice('pfin-g2', 'pos-ielts', { prompt: l('Which answer is accurate AND natural?', 'কোন উত্তর সঠিক আর স্বাভাবিক?'), options: ['Honestly, I find it pretty relaxing.', 'Honestly, I find it pretty relax.', 'In my honest opinion, the aforementioned activity is relaxation.'], answer: 'Honestly, I find it pretty relaxing.', explanation: l('find it + adjective; natural spoken tone.', 'find it + adjective; স্বাভাবিক কথ্য সুর।') })),
      at(2, gap('pfin-g3', 'pos-ielts', { prompt: l('Upgrade "very bad" with one precise adjective.', 'একটা নির্দিষ্ট adjective দিয়ে "very bad" উন্নত করো।'), sentence: 'The traffic this morning was very bad. → The traffic was ______.', accepted: ['terrible', 'awful', 'horrible', 'dreadful', 'unbearable', 'horrendous', 'chaotic', 'appalling'], pos: 'adjective', explanation: l('was + adjective: terrible, awful, unbearable…', 'was + adjective: terrible, awful, unbearable…') })),
      at(3, spot('pfin-g4', 'pos-adjective', { sentence: 'I was really boring during the long flight.', wrong: 'boring', accepted: ['bored'], pos: 'adjective', explanation: l('A person feels → -ed: bored. The flight was boring.', 'মানুষ অনুভব করে → -ed: bored। Flight-টা boring ছিল।') })),
    ],
  },
  {
    id: 'H', title: l('Word-form challenge', 'Word-form challenge'), intro: l('Write the right form of the word in brackets.', 'বন্ধনীর word-এর সঠিক form লেখো।'),
    items: [
      at(1, gap('pfin-h1', 'pos-forms', { prompt: l('Write the correct form of "happy".', '"happy"-এর সঠিক form লেখো।'), sentence: 'Money does not always bring ______.', base: 'happy', accepted: ['happiness'], pos: 'noun', wrongPos: { happy: 'adjective', happily: 'adverb' }, family: 'happy', explanation: l('bring + noun: happiness.', 'bring + noun: happiness।') })),
      at(2, gap('pfin-h2', 'pos-forms', { prompt: l('Write the correct form of "environment".', '"environment"-এর সঠিক form লেখো।'), sentence: 'Plastic causes serious ______ damage.', base: 'environment', accepted: ['environmental'], pos: 'adjective', wrongPos: { environment: 'noun' }, family: 'environment', explanation: l('___ damage → adjective.', '___ damage → adjective।') })),
      at(2, gap('pfin-h3', 'pos-forms', { prompt: l('Write the correct form of "rely".', '"rely"-এর সঠিক form লেখো।'), sentence: 'The trains in Japan are very ______.', base: 'rely', accepted: ['reliable'], pos: 'adjective', wrongPos: { rely: 'verb', reliability: 'noun' }, family: 'rely', explanation: l('very + adjective: reliable.', 'very + adjective: reliable।') })),
      at(3, gap('pfin-h4', 'pos-forms', { prompt: l('Write the correct form of "able" (opposite meaning).', '"able"-এর সঠিক form লেখো (বিপরীত অর্থ)।'), sentence: 'His ______ to find a job made him anxious.', base: 'able', accepted: ['inability'], pos: 'noun', family: 'able', explanation: l('His ___ to → noun, negative: inability.', 'His ___ to → noun, negative: inability।') })),
    ],
  },
  {
    id: 'I', title: l('Sentence building', 'Sentence বানানো'), intro: l('Put the words in order.', 'Word-গুলো সাজাও।'),
    items: [
      at(1, order('pfin-i1', 'pos-ielts', { prompt: l('Build the sentence.', 'Sentence-টা বানাও।'), answer: 'My sister works in a large hospital.', explanation: l('subject + verb + place (a + adjective + noun).', 'subject + verb + জায়গা (a + adjective + noun)।') })),
      at(2, order('pfin-i2', 'pos-ielts', { prompt: l('Build the sentence.', 'Sentence-টা বানাও।'), answer: 'Car sales fell slightly in the first quarter.', explanation: l('noun + verb + adverb + time.', 'noun + verb + adverb + সময়।') })),
      at(2, order('pfin-i3', 'pos-ielts', { prompt: l('Build the sentence.', 'Sentence-টা বানাও।'), answer: 'Schools should teach practical skills to young people.', explanation: l('WHO + should + verb + adjective + noun + to whom.', 'কে + should + verb + adjective + noun + কাকে।') })),
      at(3, order('pfin-i4', 'pos-ielts', { prompt: l('Build the sentence.', 'Sentence-টা বানাও।'), answer: 'Although public transport is cheap, many people still prefer cars.', explanation: l('Although + clause, main clause.', 'Although + clause, main clause।') })),
    ],
  },
  {
    id: 'J', title: l('Final mixed challenge', 'শেষ মিশ্র challenge'), intro: l('Everything together.', 'সব একসাথে।'),
    items: [
      at(1, choice('pfin-j1', 'pos-pronoun', { prompt: l('Choose the correct word.', 'সঠিক word বাছো।'), sentence: 'The students forgot ______ books.', options: ['their', 'there', 'they’re'], answer: 'their', pattern: 'pronoun-form', explanation: l('Belonging to them → their.', 'তাদের → their।') })),
      at(2, gap('pfin-j2', 'pos-preposition', { prompt: l('Write the preposition.', 'Preposition লেখো।'), sentence: 'Profits rose ______ 12% in 2023 (the amount of change).', accepted: ['by'], tag: 'preposition', pattern: 'prep-choice', explanation: l('rose by + the change.', 'rose by + পরিবর্তন।') })),
      at(2, spot('pfin-j3', 'pos-conjunction', { sentence: 'It was raining heavily, because the match was cancelled.', wrong: 'because', accepted: ['so'], tag: 'connector', pattern: 'conj-logic', explanation: l('Rain → cancelled: result → so.', 'বৃষ্টি → বাতিল: ফলাফল → so।') })),
      at(3, correct('pfin-j4', 'pos-lab', { prompt: l('Rewrite correctly (two mistakes).', 'ঠিক করে লেখো (দুটো ভুল)।'), sentence: 'Everyone need more informations about healthy diets.', accepted: ['Everyone needs more information about healthy diets.'], pattern: 'sv-agreement', tag: 'agreement', explanation: l('Everyone needs (singular); information (uncountable).', 'Everyone needs (singular); information (uncountable)।') })),
    ],
  },
];

import type { Concept, L, Lesson, Unit } from '../model';
import { l } from './pos-kit';
import { posAdjectiveLessons } from './pos-adjective';
import { posAdverbLessons } from './pos-adverb';
import { posFormsLessons } from './pos-forms';
import { posNounLessons } from './pos-noun';

/**
 * Parts of Speech: 12 units in the recommended order. Units without written
 * lessons show their planned lessons as "coming soon" and still open.
 */
export const POS_UNITS: Unit[] = [
  { id: 'noun', mark: 'N', group: 'jobs', pos: 'noun', concept: 'pos-noun', minutes: 22, title: l('Noun', 'Noun'), tagline: l('Names people, places, things and ideas', 'মানুষ, জায়গা, জিনিস আর idea-র নাম') },
  {
    id: 'verb', mark: 'V', group: 'jobs', pos: 'verb', minutes: 22, title: l('Verb', 'Verb'), tagline: l('Shows an action or a state', 'কাজ বা অবস্থা বোঝায়'),
    planned: [l('What is a verb?', 'Verb কী?'), l('Main and helping verbs', 'Main আর helping verb'), l('Verb forms', 'Verb form'), l('Common verb mistakes', 'Common verb ভুল'), l('Verbs in IELTS', 'IELTS-এ verb')],
    continues: { moduleId: 'tenses', text: l('Tenses are taught in the Tenses module.', 'Tense শেখানো হয় Tenses module-এ।') },
  },
  { id: 'adjective', mark: 'Aj', group: 'jobs', pos: 'adjective', concept: 'pos-adjective', minutes: 22, title: l('Adjective', 'Adjective'), tagline: l('Describes a noun', 'Noun সম্পর্কে বাড়তি তথ্য দেয়') },
  { id: 'adverb', mark: 'Av', group: 'jobs', pos: 'adverb', concept: 'pos-adverb', minutes: 22, title: l('Adverb', 'Adverb'), tagline: l('Tells how, when or how much', 'কীভাবে, কখন, কতটা — বলে দেয়') },
  {
    id: 'forms', mark: 'Wf', group: 'skills', concept: 'pos-forms', minutes: 30, title: l('Word Forms & Families', 'Word Forms ও Families'), tagline: l('One idea, many forms', 'এক idea, অনেক form'),
    planned: [l('Word families', 'Word family'), l('Opposites with prefixes', 'Prefix দিয়ে বিপরীত'), l('Word forms in IELTS', 'IELTS-এ word form')],
  },
  {
    id: 'pronoun', mark: 'Pr', group: 'jobs', pos: 'pronoun', minutes: 12, title: l('Pronoun', 'Pronoun'), tagline: l('Stands in for a noun', 'Noun-এর জায়গায় বসে'),
    planned: [l('What pronouns do', 'Pronoun কী করে'), l('Possessives and -self', 'Possessive আর -self'), l('What does "it" refer to?', '"it" কাকে বোঝায়?')],
  },
  {
    id: 'preposition', mark: 'Pp', group: 'jobs', pos: 'preposition', minutes: 12, title: l('Preposition', 'Preposition'), tagline: l('Shows place, time and relation', 'জায়গা, সময় আর সম্পর্ক দেখায়'),
    planned: [l('What prepositions do', 'Preposition কী করে'), l('Words that need a partner', 'যে word-এর সাথী লাগে'), l('Prepositions for data', 'Data-র preposition')],
    continues: { moduleId: 'prepositions', text: l('Continues in the Prepositions module.', 'বিস্তারিত Prepositions module-এ।') },
  },
  {
    id: 'conjunction', mark: 'Cj', group: 'jobs', pos: 'conjunction', minutes: 12, title: l('Conjunction', 'Conjunction'), tagline: l('Joins words and ideas', 'Word আর idea জোড়া দেয়'),
    planned: [l('Joining words', 'জোড়া দেওয়ার word'), l('because, although, while, if', 'because, although, while, if'), l('although, however, despite', 'although, however, despite')],
    continues: { moduleId: 'connectors', text: l('Continues in Connectors and Complex Sentences.', 'বিস্তারিত Connectors আর Complex Sentences-এ।') },
  },
  {
    id: 'interjection', mark: '!', group: 'jobs', pos: 'interjection', minutes: 5, title: l('Interjection', 'Interjection'), tagline: l('Shows a quick feeling', 'হঠাৎ অনুভূতি প্রকাশ করে'),
    planned: [l('Oh, well, wow', 'Oh, well, wow')],
  },
  {
    id: 'ielts', mark: 'IE', group: 'skills', minutes: 20, title: l('Parts of Speech in IELTS', 'IELTS-এ Parts of Speech'), tagline: l('Grammar knowledge into IELTS skill', 'Grammar জ্ঞান থেকে IELTS skill'),
    planned: [l('Reading: predict the gap', 'Reading: gap আন্দাজ করা'), l('Listening: form and note completion', 'Listening: form আর note completion'), l('Writing: find the problem word', 'Writing: সমস্যার word খোঁজা'), l('Speaking: upgrade your answer', 'Speaking: উত্তর আরো ভালো করা')],
  },
  {
    id: 'lab', mark: 'Lb', group: 'together', minutes: 15, title: l('Common Mistakes Lab', 'Common Mistakes Lab'), tagline: l('Repair real sentences', 'আসল sentence ঠিক করো'),
    planned: [l('Repair stations', 'Repair station'), l('Your own mistakes first', 'আগে তোমার নিজের ভুল')],
  },
  {
    id: 'final', mark: '★', group: 'together', minutes: 20, title: l('Final Mastery Challenge', 'Final Mastery Challenge'), tagline: l('30 items, one report', '৩০টা item, একটা report'),
    planned: [l('Mastery test', 'Mastery test')],
  },
];

/** Lessons in the recommended order of the units that have them. */
export const POS_LESSONS: Lesson[] = [...posNounLessons, ...posAdjectiveLessons, ...posAdverbLessons, ...posFormsLessons];

export const POS_CONCEPTS: Concept[] = [
  { id: 'pos-noun', title: l('Nouns', 'Noun'), lessonId: 'pn-1', tag: 'part-of-speech' },
  { id: 'pos-adjective', title: l('Adjectives', 'Adjective'), lessonId: 'pa-1', tag: 'part-of-speech' },
  { id: 'pos-adverb', title: l('Adverbs', 'Adverb'), lessonId: 'pv-1', tag: 'part-of-speech' },
  { id: 'pos-forms', title: l('Word forms', 'Word form'), lessonId: 'pf-1', tag: 'word-form' },
];

/** All planned lessons, so module totals count the whole course. */
export const POS_PLANNED: L[] = POS_UNITS.flatMap((u) => u.planned ?? []);

/** The short rule shown before a targeted fix, by "expected>chosen" pair. */
export const POS_PAIR_RULES: Record<string, L> = {
  'adjective>adverb': l(
    'Is it describing a noun? Then use an adjective: effective measures, a sharp rise. After be / feel / seem / look, use an adjective too: I feel bad, the results were surprising.',
    'Word-টা কি একটা noun-কে describe করছে? তাহলে adjective: effective measures, a sharp rise। be / feel / seem / look-এর পরেও adjective: I feel bad, the results were surprising।',
  ),
  'adverb>adjective': l(
    'Is it describing a verb (how, how much)? Then use an adverb: rose sharply, work effectively, increased significantly. Adverbs also describe adjectives: extremely important.',
    'Word-টা কি একটা verb-কে describe করছে (কীভাবে, কতটা)? তাহলে adverb: rose sharply, work effectively, increased significantly। Adverb adjective-কেও describe করে: extremely important।',
  ),
  'noun>verb': l(
    'After a / the / my / this, and between "the" and "of", you need a noun: the development of, a decision, my improvement.',
    'a / the / my / this-এর পরে, আর "the" ও "of"-এর মাঝে noun লাগে: the development of, a decision, my improvement।',
  ),
  'verb>noun': l(
    'After to / can / should / must / will, you need a verb: we should protect, to improve, can succeed.',
    'to / can / should / must / will-এর পরে verb লাগে: we should protect, to improve, can succeed।',
  ),
  'noun>adjective': l(
    'The name of a thing or idea is a noun: the beauty of the city, economic growth → the economy. Adjectives describe; nouns name.',
    'কোনো জিনিস বা idea-র নাম হলো noun: the beauty of the city, economic growth → the economy। Adjective describe করে; noun নাম দেয়।',
  ),
  'adjective>noun': l(
    'To describe a noun, use the adjective form: a beautiful city, economic benefits, a successful business.',
    'Noun-কে describe করতে adjective form লাগে: a beautiful city, economic benefits, a successful business।',
  ),
};

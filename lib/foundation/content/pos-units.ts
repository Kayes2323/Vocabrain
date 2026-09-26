import type { Concept, L, Lesson, Unit } from '../model';
import { l } from './pos-kit';
import { posAdjectiveLessons } from './pos-adjective';
import { posAdverbLessons } from './pos-adverb';
import { posFormsLessons } from './pos-forms';
import { posNounLessons } from './pos-noun';
import { posVerbLessons } from './pos-verb';
import { posPronounLessons } from './pos-pronoun';
import { posPrepositionLessons } from './pos-preposition';
import { posConjunctionLessons } from './pos-conjunction';
import { posInterjectionLessons } from './pos-interjection';
import { posIeltsLessonsA } from './pos-ielts-a';
import { posIeltsLessonsB } from './pos-ielts-b';
import { posLabLessons } from './pos-lab';

/**
 * Parts of Speech: 12 units in the recommended order. Word jobs and word forms
 * teach; IELTS applies them; the Lab repairs; the Final challenge checks mastery.
 */
export const POS_UNITS: Unit[] = [
  { id: 'noun', mark: 'N', group: 'jobs', pos: 'noun', concept: 'pos-noun', minutes: 22, title: l('Noun', 'Noun'), tagline: l('Names people, places, things and ideas', 'মানুষ, জায়গা, জিনিস আর idea-র নাম') },
  {
    id: 'verb', mark: 'V', group: 'jobs', pos: 'verb', concept: 'pos-verb', minutes: 27, title: l('Verb', 'Verb'), tagline: l('Shows an action or a state', 'কাজ বা অবস্থা বোঝায়'),
    continues: { moduleId: 'tenses', text: l('Tenses are taught in the Tenses module.', 'Tense শেখানো হয় Tenses module-এ।') },
  },
  { id: 'adjective', mark: 'Aj', group: 'jobs', pos: 'adjective', concept: 'pos-adjective', minutes: 22, title: l('Adjective', 'Adjective'), tagline: l('Describes a noun', 'Noun সম্পর্কে বাড়তি তথ্য দেয়') },
  { id: 'adverb', mark: 'Av', group: 'jobs', pos: 'adverb', concept: 'pos-adverb', minutes: 22, title: l('Adverb', 'Adverb'), tagline: l('Tells how, when or how much', 'কীভাবে, কখন, কতটা — বলে দেয়') },
  {
    id: 'forms', mark: 'Wf', group: 'skills', concept: 'pos-forms', minutes: 29, title: l('Word Forms & Families', 'Word Forms ও Families'), tagline: l('One idea, many forms', 'এক idea, অনেক form'),
  },
  {
    id: 'pronoun', mark: 'Pr', group: 'jobs', pos: 'pronoun', concept: 'pos-pronoun', minutes: 16, title: l('Pronoun', 'Pronoun'), tagline: l('Stands in for a noun', 'Noun-এর জায়গায় বসে'),
  },
  {
    id: 'preposition', mark: 'Pp', group: 'jobs', pos: 'preposition', concept: 'pos-preposition', minutes: 16, title: l('Preposition', 'Preposition'), tagline: l('Shows place, time and relation', 'জায়গা, সময় আর সম্পর্ক দেখায়'),
    continues: { moduleId: 'prepositions', text: l('Continues in the Prepositions module.', 'বিস্তারিত Prepositions module-এ।') },
  },
  {
    id: 'conjunction', mark: 'Cj', group: 'jobs', pos: 'conjunction', concept: 'pos-conjunction', minutes: 16, title: l('Conjunction', 'Conjunction'), tagline: l('Joins words and ideas', 'Word আর idea জোড়া দেয়'),
    continues: { moduleId: 'connectors', text: l('Continues in Connectors and Complex Sentences.', 'বিস্তারিত Connectors আর Complex Sentences-এ।') },
  },
  {
    id: 'interjection', mark: '!', group: 'jobs', pos: 'interjection', concept: 'pos-interjection', minutes: 5, title: l('Interjection', 'Interjection'), tagline: l('Shows a quick feeling', 'হঠাৎ অনুভূতি প্রকাশ করে'),
  },
  {
    id: 'ielts', mark: 'IE', group: 'skills', concept: 'pos-ielts', minutes: 64, title: l('Parts of Speech in IELTS', 'IELTS-এ Parts of Speech'), tagline: l('Grammar knowledge into IELTS skill', 'Grammar জ্ঞান থেকে IELTS skill'),
  },
  {
    id: 'lab', mark: 'Lb', group: 'together', concept: 'pos-lab', minutes: 48, title: l('Common Mistakes Lab', 'Common Mistakes Lab'), tagline: l('Repair real sentences', 'আসল sentence ঠিক করো'),
  },
  {
    id: 'final', mark: '★', group: 'together', challenge: true, minutes: 25, title: l('Final Mastery Challenge', 'Final Mastery Challenge'), tagline: l('30 items, one report', '৩০টা item, একটা report'),
  },
];

/** Lessons in the recommended order of the units that have them. */
export const POS_LESSONS: Lesson[] = [
  ...posNounLessons,
  ...posVerbLessons,
  ...posAdjectiveLessons,
  ...posAdverbLessons,
  ...posFormsLessons,
  ...posPronounLessons,
  ...posPrepositionLessons,
  ...posConjunctionLessons,
  ...posInterjectionLessons,
  ...posIeltsLessonsA,
  ...posIeltsLessonsB,
  ...posLabLessons,
];

export const POS_CONCEPTS: Concept[] = [
  { id: 'pos-noun', title: l('Nouns', 'Noun'), lessonId: 'pn-1', tag: 'part-of-speech' },
  { id: 'pos-adjective', title: l('Adjectives', 'Adjective'), lessonId: 'pa-1', tag: 'part-of-speech' },
  { id: 'pos-adverb', title: l('Adverbs', 'Adverb'), lessonId: 'pv-1', tag: 'part-of-speech' },
  { id: 'pos-forms', title: l('Word forms', 'Word form'), lessonId: 'pf-1', tag: 'word-form' },
  { id: 'pos-verb', title: l('Verbs', 'Verb'), lessonId: 'pvb-1', tag: 'part-of-speech' },
  { id: 'pos-pronoun', title: l('Pronouns', 'Pronoun'), lessonId: 'ppr-1', tag: 'part-of-speech' },
  { id: 'pos-preposition', title: l('Prepositions', 'Preposition'), lessonId: 'ppp-1', tag: 'preposition' },
  { id: 'pos-conjunction', title: l('Conjunctions', 'Conjunction'), lessonId: 'pcj-1', tag: 'connector' },
  { id: 'pos-interjection', title: l('Interjections', 'Interjection'), lessonId: 'pij-1', tag: 'part-of-speech' },
  { id: 'pos-ielts', title: l('Parts of Speech in IELTS', 'IELTS-এ Parts of Speech'), lessonId: 'pie-1', tag: 'part-of-speech' },
  { id: 'pos-lab', title: l('Common mistakes', 'Common ভুল'), lessonId: 'pl-1', tag: 'part-of-speech' },
];

/** All planned lessons, so module totals count the whole course. */
export const POS_PLANNED: L[] = POS_UNITS.flatMap((u) => u.planned ?? []);


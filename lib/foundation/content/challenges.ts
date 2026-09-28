import type { L } from '../model';
import { l } from './pos-kit';
import { FINAL_PARTS, type FinalPart } from './pos-final';
import { TENSE_FINAL_PARTS } from './tenses-final';
import { AGREEMENT_FINAL_PARTS } from './agreement-final';
import { ARTICLE_FINAL_PARTS } from './articles-final';
import { COMPLEX_FINAL_PARTS } from './complex-final';
import { CONNECTOR_FINAL_PARTS } from './connectors-final';
import { PUNCTUATION_FINAL_PARTS } from './punctuation-final';
import { PREPOSITION_FINAL_PARTS } from './prepositions-final';
import { COMMON_ERRORS_FINAL_PARTS } from './common-errors-final';
import { VOCABULARY_FINAL_PARTS } from './vocabulary-final';
import { IELTS_INTRO_FINAL_PARTS } from './ielts-intro-final';
import { LISTENING_FINAL_PARTS } from './listening-final';
import { READING_FINAL_PARTS } from './reading-final';
import { WRITING_FINAL_PARTS } from './writing-final';

/**
 * Final Mastery Challenges, one per module that has one. They share one engine
 * (adaptive picking, report, persistence): Parts of Speech stores its result in
 * `posFinal` (unchanged), every other challenge in `finals[id]`.
 */
export interface ChallengeDef {
  id: string;
  moduleId: string;
  title: L;
  /** Short topic name for "Ask Mino about my {name} report". */
  name: L;
  tagline: L;
  mark: string;
  minutes: number;
  parts: FinalPart[];
  /** Concepts the challenge covers: its starting level comes from them. */
  concepts: string[];
  /** How the report groups results: by the word job (Parts of Speech) or by concept (tense by tense, article by article). */
  areas: 'pos' | 'concept';
}

export const CHALLENGES: ChallengeDef[] = [
  {
    id: 'pos', moduleId: 'parts-of-speech', mark: '★', minutes: 25, areas: 'pos',
    title: l('Final Mastery Challenge', 'Final Mastery Challenge'), name: l('Parts of Speech', 'Parts of Speech'), tagline: l('30 items, one report', '৩০টা item, একটা report'),
    parts: FINAL_PARTS,
    concepts: ['pos-noun', 'pos-verb', 'pos-adjective', 'pos-adverb', 'pos-forms', 'pos-pronoun', 'pos-preposition', 'pos-conjunction', 'pos-interjection', 'pos-ielts', 'pos-lab'],
  },
  {
    id: 'tenses', moduleId: 'tenses', mark: 'T★', minutes: 20, areas: 'concept',
    title: l('Tenses Final Mastery Challenge', 'Tenses Final Mastery Challenge'), name: l('Tenses', 'Tenses'), tagline: l('24 adaptive questions, a tense-by-tense report', '২৪টা adaptive প্রশ্ন, tense ধরে ধরে report'),
    parts: TENSE_FINAL_PARTS,
    concepts: ['present-simple', 'present-continuous', 'past-simple', 'past-continuous', 'present-perfect', 'present-perfect-continuous', 'past-perfect', 'future'],
  },
  {
    id: 'articles', moduleId: 'articles', mark: 'A★', minutes: 15, areas: 'concept',
    title: l('Articles Final Mastery Challenge', 'Articles Final Mastery Challenge'), name: l('Articles', 'Articles'), tagline: l('18 adaptive questions, a report topic by topic', '১৮টা adaptive প্রশ্ন, topic ধরে ধরে report'),
    parts: ARTICLE_FINAL_PARTS,
    concepts: ['article-a-an', 'article-a', 'article-the', 'article-zero'],
  },
  {
    id: 'agreement', moduleId: 'agreement', mark: 'S★', minutes: 15, areas: 'concept',
    title: l('Subject–Verb Agreement Final Mastery Challenge', 'Subject–Verb Agreement Final Mastery Challenge'), name: l('Subject–Verb Agreement', 'Subject–Verb Agreement'), tagline: l('18 adaptive questions, a report rule by rule', '১৮টা adaptive প্রশ্ন, নিয়ম ধরে ধরে report'),
    parts: AGREEMENT_FINAL_PARTS,
    concepts: ['sva-basic', 'sva-compound', 'sva-indefinite', 'sva-long', 'sva-quantity'],
  },
  {
    id: 'prepositions', moduleId: 'prepositions', mark: 'P★', minutes: 15, areas: 'concept',
    title: l('Prepositions Final Mastery Challenge', 'Prepositions Final Mastery Challenge'), name: l('Prepositions', 'Prepositions'), tagline: l('18 adaptive questions, a report topic by topic', '১৮টা adaptive প্রশ্ন, topic ধরে ধরে report'),
    parts: PREPOSITION_FINAL_PARTS,
    concepts: ['prep-time', 'prep-duration', 'prep-place', 'prep-movement', 'prep-partner', 'prep-data'],
  },
  {
    id: 'connectors', moduleId: 'connectors', mark: 'C★', minutes: 15, areas: 'concept',
    title: l('Connectors Final Mastery Challenge', 'Connectors Final Mastery Challenge'), name: l('Connectors', 'Connectors'), tagline: l('18 adaptive questions, a report topic by topic', '১৮টা adaptive প্রশ্ন, topic ধরে ধরে report'),
    parts: CONNECTOR_FINAL_PARTS,
    concepts: ['conn-add', 'conn-contrast', 'conn-cause', 'conn-example', 'conn-grammar', 'conn-cohesion'],
  },
  {
    id: 'complex-sentences', moduleId: 'complex-sentences', mark: 'X★', minutes: 15, areas: 'concept',
    title: l('Complex Sentences Final Mastery Challenge', 'Complex Sentences Final Mastery Challenge'), name: l('Complex Sentences', 'Complex Sentences'), tagline: l('18 adaptive questions, a report topic by topic', '১৮টা adaptive প্রশ্ন, topic ধরে ধরে report'),
    parts: COMPLEX_FINAL_PARTS,
    concepts: ['cx-clause', 'cx-adverbial', 'cx-time-if', 'cx-relative', 'cx-relative-comma', 'cx-noun-clause'],
  },
  {
    id: 'punctuation', moduleId: 'punctuation', mark: '¶★', minutes: 15, areas: 'concept',
    title: l('Punctuation Final Mastery Challenge', 'Punctuation Final Mastery Challenge'), name: l('Punctuation', 'Punctuation'), tagline: l('18 adaptive questions, a report topic by topic', '১৮টা adaptive প্রশ্ন, topic ধরে ধরে report'),
    parts: PUNCTUATION_FINAL_PARTS,
    concepts: ['pn-capital', 'pn-end', 'pn-comma', 'pn-comma-error', 'pn-apostrophe', 'pn-colon'],
  },
  {
    id: 'common-errors', moduleId: 'common-errors', mark: 'E★', minutes: 15, areas: 'concept',
    title: l('Common Errors Final Mastery Challenge', 'Common Errors Final Mastery Challenge'), name: l('Common Errors', 'Common Errors'), tagline: l('18 adaptive questions, a report topic by topic', '১৮টা adaptive প্রশ্ন, topic ধরে ধরে report'),
    parts: COMMON_ERRORS_FINAL_PARTS,
    concepts: ['ce-translation', 'ce-countable', 'ce-plural', 'ce-collocation', 'ce-word-pair', 'ce-natural'],
  },
  {
    id: 'vocabulary-foundation', moduleId: 'vocabulary-foundation', mark: 'V★', minutes: 15, areas: 'concept',
    title: l('Vocabulary Final Mastery Challenge', 'Vocabulary Final Mastery Challenge'), name: l('Vocabulary', 'Vocabulary'), tagline: l('18 adaptive questions, a report topic by topic', '১৮টা adaptive প্রশ্ন, topic ধরে ধরে report'),
    parts: VOCABULARY_FINAL_PARTS,
    concepts: ['voc-learn', 'voc-context', 'voc-paraphrase', 'voc-register', 'voc-precise', 'voc-use'],
  },
  {
    id: 'ielts-intro', moduleId: 'ielts-intro', mark: 'I★', minutes: 15, areas: 'concept',
    title: l('What is IELTS? Final Mastery Challenge', 'IELTS কী? Final Mastery Challenge'), name: l('What is IELTS?', 'IELTS কী?'), tagline: l('18 adaptive questions, a report topic by topic', '১৮টা adaptive প্রশ্ন, topic ধরে ধরে report'),
    parts: IELTS_INTRO_FINAL_PARTS,
    concepts: ['ib-versions', 'ib-format', 'ib-delivery', 'ib-bands', 'ib-marking', 'ib-plan'],
  },
  {
    id: 'listening-foundation', moduleId: 'listening-foundation', mark: 'L★', minutes: 15, areas: 'concept',
    title: l('Listening Final Mastery Challenge', 'Listening Final Mastery Challenge'), name: l('Listening', 'Listening'), tagline: l('18 adaptive questions, a report topic by topic', '১৮টা adaptive প্রশ্ন, topic ধরে ধরে report'),
    parts: LISTENING_FINAL_PARTS,
    concepts: ['ls-format', 'ls-part1', 'ls-part2', 'ls-part3', 'ls-part4', 'ls-rules'],
  },
  {
    id: 'reading-foundation', moduleId: 'reading-foundation', mark: 'R★', minutes: 15, areas: 'concept',
    title: l('Reading Final Mastery Challenge', 'Reading Final Mastery Challenge'), name: l('Reading', 'Reading'), tagline: l('18 adaptive questions, a report topic by topic', '১৮টা adaptive প্রশ্ন, topic ধরে ধরে report'),
    parts: READING_FINAL_PARTS,
    concepts: ['rd-skim', 'rd-paraphrase', 'rd-tfng', 'rd-headings', 'rd-choice', 'rd-completion'],
  },
  {
    id: 'writing-foundation', moduleId: 'writing-foundation', mark: 'W★', minutes: 15, areas: 'concept',
    title: l('Writing Final Mastery Challenge', 'Writing Final Mastery Challenge'), name: l('Writing', 'Writing'), tagline: l('18 adaptive questions, a report topic by topic', '১৮টা adaptive প্রশ্ন, topic ধরে ধরে report'),
    parts: WRITING_FINAL_PARTS,
    concepts: ['wr-format', 'wr-task1', 'wr-data', 'wr-task2', 'wr-paragraph', 'wr-cohesion'],
  },
];

export const getChallenge = (id: string) => CHALLENGES.find((c) => c.id === id);
export const challengeForModule = (moduleId: string) => CHALLENGES.find((c) => c.moduleId === moduleId);

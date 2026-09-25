import type { BrainWord } from '@/lib/models';
import { containsWord, normalize } from './recall';

/**
 * Quick, rule-based check of a sentence the student wrote with a target word.
 * It is deliberately gentle: it catches the essentials (word used, a real
 * sentence) and praises natural collocations. Mino's AI review replaces this
 * when an AI provider is connected.
 */
export interface UsageCheck {
  /** The word was used in a real sentence. */
  correct: boolean;
  /** i18n keys under `practice.feedback`, most important first. */
  feedback: string[];
  /** A collocation the student used, or one to suggest. */
  collocation?: string;
  usedCollocation: boolean;
}

export function checkSentence(word: BrainWord, text: string): UsageCheck {
  const sentence = text.trim();
  const words = normalize(sentence).split(' ').filter(Boolean);
  const feedback: string[] = [];

  if (!containsWord(sentence, word.lemma)) {
    return { correct: false, feedback: ['practice.feedback.missingWord'], usedCollocation: false, collocation: word.collocations[0] };
  }
  if (words.length < 6) {
    return { correct: false, feedback: ['practice.feedback.tooShort'], usedCollocation: false, collocation: word.collocations[0] };
  }

  const used = word.collocations.find((c) => normalize(sentence).includes(normalize(c)));
  if (used) feedback.push('practice.feedback.greatCollocation');
  else feedback.push('practice.feedback.good');
  if (!/^[A-Z"“]/.test(sentence) || !/[.!?]["”]?$/.test(sentence)) feedback.push('practice.feedback.punctuation');
  if (!used && word.collocations.length > 0) feedback.push('practice.feedback.tryCollocation');

  return { correct: true, feedback, usedCollocation: Boolean(used), collocation: used ?? word.collocations[0] };
}

/**
 * IELTS Speaking-style prompt that invites the target word naturally.
 * Returns an i18n key and variables.
 */
export function speakingPrompt(word: BrainWord, seed = 0): { key: string; vars: Record<string, string> } {
  const pos = (word.partOfSpeech ?? '').toLowerCase();
  const kind = pos.startsWith('verb') ? 'verb' : pos.startsWith('adj') ? 'adjective' : pos.startsWith('adv') ? 'adverb' : 'noun';
  const variant = seed % 2;
  return { key: `practice.speakingPrompts.${kind}.${variant}`, vars: { word: word.word.toLowerCase() } };
}

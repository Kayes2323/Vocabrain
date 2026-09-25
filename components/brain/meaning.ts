import type { Locale } from '@/lib/models';

/** The meaning to show first for the student's language, and the other one. */
export function meanings(word: { meaning: string; meaningBn?: string }, locale: Locale) {
  const primary = locale === 'bn' ? word.meaningBn || word.meaning : word.meaning || word.meaningBn || '';
  const secondary = locale === 'bn' ? (word.meaningBn && word.meaning ? word.meaning : undefined) : word.meaning && word.meaningBn ? word.meaningBn : undefined;
  return { primary, secondary };
}

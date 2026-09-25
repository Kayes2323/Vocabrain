import type { Locale } from '@/lib/models';
import { bn } from './locales/bn';
import { en } from './locales/en';
import { createTranslator, type Dictionary } from './translate';

export const LOCALES: Locale[] = ['bn', 'en'];
export const DEFAULT_LOCALE: Locale = 'en';

const DICTIONARIES: Record<Locale, Dictionary> = { en, bn };

export function getTranslator(locale: Locale) {
  return createTranslator(DICTIONARIES[locale], DICTIONARIES.en, locale);
}

export type Translator = ReturnType<typeof getTranslator>;
export { formatNumber } from './translate';
export { msg, type Message, type MessageVars } from './message';

import type { Locale } from '@/lib/models';
import type { MessageVars } from './message';

/** A dictionary is a nested object of strings and string lists. */
export interface Dictionary {
  [key: string]: string | readonly string[] | Dictionary;
}

function lookup(dict: Dictionary, key: string): string | readonly string[] | undefined {
  let node: string | readonly string[] | Dictionary | undefined = dict;
  for (const part of key.split('.')) {
    if (node === undefined || typeof node === 'string' || Array.isArray(node)) return undefined;
    node = (node as Dictionary)[part];
  }
  return typeof node === 'string' || Array.isArray(node) ? (node as string | readonly string[]) : undefined;
}

export function formatNumber(n: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'bn' ? 'bn-BD' : 'en-US').format(n);
}

function interpolate(text: string, vars: MessageVars | undefined, locale: Locale): string {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = vars[name];
    if (value === undefined) return match;
    // Numbers are localised (৩ in Bangla); pre-formatted strings such as band
    // scores ("7.0") are passed as strings and kept as they are.
    return typeof value === 'number' ? formatNumber(value, locale) : value;
  });
}

export function createTranslator(dict: Dictionary, fallback: Dictionary, locale: Locale) {
  function t(key: string, vars?: MessageVars): string {
    const value = lookup(dict, key) ?? lookup(fallback, key);
    if (typeof value !== 'string') {
      if (process.env.NODE_ENV !== 'production') console.warn(`[i18n] Missing key: ${key}`);
      return key;
    }
    return interpolate(value, vars, locale);
  }
  function list(key: string): string[] {
    const value = lookup(dict, key) ?? lookup(fallback, key);
    return Array.isArray(value) ? [...value] : [];
  }
  return { t, list };
}

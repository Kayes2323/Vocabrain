'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LOCALE, formatNumber, getTranslator, type Message, type Translator } from '@/lib/i18n';
import type { Locale } from '@/lib/models';

interface LocaleState extends Translator {
  locale: Locale;
  /** Changes the UI language and remembers it on this device. */
  setLocale: (locale: Locale) => void;
  /** Renders a Message produced by business logic. */
  m: (message: Message) => string;
  /** Formats a count in the active locale (৩ in Bangla). */
  n: (value: number) => string;
  /** True once the student has picked a language on this device. */
  hasChosen: boolean;
}

const LocaleContext = createContext<LocaleState | null>(null);
const STORAGE_KEY = 'vocabbrain:locale';

function readStored(): Locale | undefined {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'bn' || v === 'en' ? v : undefined;
  } catch {
    return undefined;
  }
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setLocaleState(stored);
      setHasChosen(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setHasChosen(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Non-fatal: the profile still stores the choice.
    }
  }, []);

  const value = useMemo<LocaleState>(() => {
    const translator = getTranslator(locale);
    return {
      ...translator,
      locale,
      setLocale,
      hasChosen,
      m: (message: Message) => translator.t(message.key, message.vars),
      n: (value: number) => formatNumber(value, locale),
    };
  }, [locale, setLocale, hasChosen]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleState {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>');
  return ctx;
}

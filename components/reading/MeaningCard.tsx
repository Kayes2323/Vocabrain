'use client';

import Link from 'next/link';
import { BookmarkCheck, BrainCircuit, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MinoMark } from '@/components/shell/MinoMark';
import { useLocale } from '@/components/providers/LocaleProvider';
import { CardFrame } from './CardFrame';
import { canSpeak, speakWord } from './speak';
import type { MeaningResult } from './word-meaning';

/** Mino's small "finding the meaning" state, inside the card only (never full screen). */
export function MinoLoading({ word }: { word: string }) {
  const { t } = useLocale();
  return (
    <div className="flex min-h-24 items-center gap-3 py-2" role="status" data-testid="mino-word-loading">
      <MinoMark size="sm" thinking />
      <span className="text-sm text-muted-foreground">{t('reading.meaning.loading', { word })}</span>
    </div>
  );
}

function Row({ label, children, testId, lang }: { label: string; children: React.ReactNode; testId?: string; lang?: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <p className="text-[15px]" data-testid={testId} lang={lang}>
        {children}
      </p>
    </div>
  );
}

interface MeaningCardProps {
  token: string;
  /** undefined while Mino is working. */
  result: MeaningResult | undefined;
  savedId?: string;
  saving: boolean;
  onSave: () => void;
  onDismiss: () => void;
  extra?: React.ReactNode;
}

/**
 * The meaning of any word in the passage, written by Mino for this sentence:
 * Bangla meaning, simple English meaning, part of speech, the meaning here and
 * a short example. Concise, with one action: Save to Brain.
 */
export function MeaningCard({ token, result, savedId, saving, onSave, onDismiss, extra }: MeaningCardProps) {
  const { t, locale } = useLocale();
  const m = result?.kind === 'mino' ? result.meaning : undefined;
  const dict = result?.kind === 'dictionary' ? result.info : undefined;
  const headword = m?.word ?? dict?.word ?? token;

  return (
    <CardFrame label={token} testId="meaning-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <p className="text-xl font-semibold tracking-tight break-words" lang="en" data-testid="meaning-word">
            {headword}
          </p>
          {canSpeak() && (
            <Button variant="ghost" size="icon-sm" aria-label={t('reading.listen')} onClick={() => speakWord(headword)}>
              <Volume2 />
            </Button>
          )}
        </div>
        <Button variant="ghost" size="icon-sm" aria-label={t('common.close')} onClick={onDismiss} data-testid="meaning-close">
          <X />
        </Button>
      </div>

      <div className="mt-2 space-y-3" aria-live="polite">
        {!result ? (
          <MinoLoading word={token} />
        ) : m ? (
          <>
            <Row label={t('reading.meaning.bn')} testId="meaning-bn" lang="bn">
              <span className="font-medium">{m.bn}</span>
            </Row>
            <Row label={t('reading.meaning.en')} testId="meaning-en" lang="en">
              {m.en}
            </Row>
            <Row label={t('reading.meaning.pos')} testId="meaning-pos">
              {m.partOfSpeech}
            </Row>
            <div className="rounded-xl border border-brand/15 bg-brand-soft/60 px-3 py-2" data-testid="meaning-context">
              <p className="text-xs font-semibold text-brand">{t('reading.meaning.context')}</p>
              <p className="text-sm" lang={locale === 'bn' ? 'bn' : 'en'}>
                {locale === 'bn' ? m.contextBn : m.contextEn}
              </p>
            </div>
            {m.example && (
              <div className="space-y-0.5 text-sm">
                <p className="text-xs font-semibold text-muted-foreground">{t('reading.lib.example')}</p>
                <p lang="en">{m.example}</p>
                {m.exampleBn && (
                  <p className="text-muted-foreground" lang="bn">
                    {m.exampleBn}
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-2" data-testid="meaning-fallback">
            {dict?.meaningBn && (
              <Row label={t('reading.meaning.bn')} lang="bn">
                {dict.meaningBn}
              </Row>
            )}
            {dict?.meaning ? (
              <Row label={t('reading.meaning.en')} lang="en">
                {dict.meaning}
              </Row>
            ) : (
              <p className="text-sm text-muted-foreground">{t('reading.noDefinition')}</p>
            )}
            {dict?.partOfSpeech && <Row label={t('reading.meaning.pos')}>{dict.partOfSpeech}</Row>}
            <p className="text-xs text-muted-foreground">{t('reading.meaning.unavailable')}</p>
          </div>
        )}
      </div>

      {result && (m || dict) && (
        <div className="mt-3 flex gap-2">
          {savedId ? (
            <Button asChild variant="secondary" className="flex-1">
              <Link href={`/ielts/vocabulary/notebook/${savedId}`}>
                <BookmarkCheck className="text-brand" /> {t('reading.savedOpen')}
              </Link>
            </Button>
          ) : (
            <Button className="flex-1" onClick={onSave} disabled={saving}>
              <BrainCircuit /> {t('reading.save')}
            </Button>
          )}
          <Button variant="ghost" onClick={onDismiss}>
            {t('reading.dismiss')}
          </Button>
        </div>
      )}
      {extra}
    </CardFrame>
  );
}

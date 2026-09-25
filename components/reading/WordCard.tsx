'use client';

import Link from 'next/link';
import { BookmarkCheck, BrainCircuit, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { WordInfo } from '@/lib/models';
import { cn } from '@/lib/utils';
import { canSpeak, speakWord } from './speak';

export interface WordCardProps {
  token: string;
  sentence: string;
  info: WordInfo | undefined;
  loading: boolean;
  savedId?: string;
  saving: boolean;
  onSave: () => void;
  onDismiss: () => void;
}

function Highlighted({ sentence, token }: { sentence: string; token: string }) {
  const i = sentence.toLowerCase().indexOf(token.toLowerCase());
  if (i < 0) return <>{sentence}</>;
  return (
    <>
      {sentence.slice(0, i)}
      <strong className="font-semibold text-foreground">{sentence.slice(i, i + token.length)}</strong>
      {sentence.slice(i + token.length)}
    </>
  );
}

/**
 * Compact word card anchored to the bottom of the screen so the passage stays
 * readable. One primary action: Save to Brain.
 */
export function WordCard({ token, sentence, info, loading, savedId, saving, onSave, onDismiss }: WordCardProps) {
  const { t, locale } = useLocale();
  const primaryMeaning = locale === 'bn' ? info?.meaningBn || info?.meaning : info?.meaning || info?.meaningBn;
  const secondaryMeaning = locale === 'bn' ? (info?.meaningBn ? info?.meaning : undefined) : info?.meaning ? info?.meaningBn : undefined;

  return (
    <div
      role="dialog"
      aria-label={token}
      className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-50 px-3 pb-3 md:bottom-6 md:left-60"
    >
      <div className="mx-auto max-w-lg animate-in slide-in-from-bottom-4 fade-in rounded-2xl border bg-card p-4 shadow-lg duration-200">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-xl font-semibold tracking-tight">{info?.word ?? token.toLowerCase()}</p>
              {canSpeak() && (
                <Button variant="ghost" size="icon-sm" aria-label={t('reading.listen')} onClick={() => speakWord(info?.word ?? token)}>
                  <Volume2 />
                </Button>
              )}
            </div>
            {info?.partOfSpeech && <p className="text-xs text-muted-foreground">{info.partOfSpeech}</p>}
          </div>
          <Button variant="ghost" size="icon-sm" aria-label={t('common.close')} onClick={onDismiss}>
            <X />
          </Button>
        </div>

        <div className="mt-2 space-y-2 text-[15px]" aria-live="polite">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : primaryMeaning ? (
            <>
              <p>{primaryMeaning}</p>
              {secondaryMeaning && <p className="text-sm text-muted-foreground">{secondaryMeaning}</p>}
              {info && info.synonyms.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{t('reading.synonyms')}:</span> {info.synonyms.slice(0, 3).join(', ')}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">{t('reading.noDefinition')}</p>
          )}
          <p className="rounded-lg bg-muted/70 px-3 py-2 text-sm text-muted-foreground">
            <Highlighted sentence={sentence} token={token} />
          </p>
        </div>

        <div className="mt-3 flex gap-2">
          {savedId ? (
            <Button asChild variant="secondary" className="flex-1">
              <Link href={`/ielts/vocabulary/notebook/${savedId}`}>
                <BookmarkCheck className="text-brand" /> {t('reading.savedOpen')}
              </Link>
            </Button>
          ) : (
            <Button className={cn('flex-1')} onClick={onSave} disabled={loading || saving}>
              <BrainCircuit /> {t('reading.save')}
            </Button>
          )}
          <Button variant="ghost" onClick={onDismiss}>
            {t('reading.dismiss')}
          </Button>
        </div>
      </div>
    </div>
  );
}

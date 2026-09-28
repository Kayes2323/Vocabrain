'use client';

import Link from 'next/link';
import { BookmarkCheck, BrainCircuit, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { VocabView } from '@/lib/content/reading-library';
import { canSpeak, speakWord } from '../speak';
import { CardFrame } from '../CardFrame';
import { MinoLoading } from '../MeaningCard';


interface VocabCardProps {
  view: VocabView;
  /** The words as they appear in the passage ("were presumed"). */
  surface: string;
  sentence: string;
  savedId?: string;
  saving: boolean;
  onSave: () => void;
  onDismiss: () => void;
  extra?: React.ReactNode;
  /** Mino's short loading before the card fills in. */
  loading?: boolean;
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
 * The vocabulary card for a library word: its meaning in this passage (Bangla
 * and English), an example with its Bangla, and Save to Brain. It sits at the
 * bottom of the screen and scrolls inside itself, so it never leaves the
 * viewport or covers the whole passage.
 */
export function VocabCard({ view, surface, sentence, savedId, saving, onSave, onDismiss, extra, loading }: VocabCardProps) {
  const { t, locale } = useLocale();
  const bnFirst = locale === 'bn';
  const tierTone = view.tier === 'core' ? 'success' : view.tier === 'useful' ? 'brand' : 'warning';

  return (
    <CardFrame label={view.lemma} testId="vocab-card">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xl font-semibold tracking-tight break-words" lang="en">
                {view.lemma}
              </p>
              {canSpeak() && (
                <Button variant="ghost" size="icon-sm" aria-label={t('reading.listen')} onClick={() => speakWord(view.lemma)}>
                  <Volume2 />
                </Button>
              )}
            </div>
            <div className="mt-0.5 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">{view.pos}</span>
              <StatusChip tone={tierTone}>{t(`reading.lib.tiers.${view.tier}`)}</StatusChip>
            </div>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label={t('common.close')} onClick={onDismiss}>
            <X />
          </Button>
        </div>

        {loading ? (
          <MinoLoading word={surface} />
        ) : (
        <>
        <div className="mt-3 space-y-3 text-[15px]">
          <div className="space-y-0.5">
            <p className="font-medium" data-testid="vocab-primary" lang={bnFirst ? 'bn' : 'en'}>
              {bnFirst ? view.bn : view.en}
            </p>
            <p className="text-sm text-muted-foreground" data-testid="vocab-secondary" lang={bnFirst ? 'en' : 'bn'}>
              {bnFirst ? view.en : view.bn}
            </p>
          </div>

          <div className="rounded-xl border border-brand/15 bg-brand-soft/60 px-3 py-2" data-testid="vocab-context">
            <p className="text-xs font-semibold text-brand">{t('reading.lib.contextMeaning')}</p>
            <p className="text-sm" lang="bn">
              {view.ctx.bn}
            </p>
            <p className="text-sm text-muted-foreground" lang="en">
              {view.ctx.en}
            </p>
          </div>

          <p className="rounded-lg bg-muted/70 px-3 py-2 text-sm text-muted-foreground" lang="en">
            <Highlighted sentence={sentence} token={surface} />
          </p>

          <div className="space-y-0.5 text-sm">
            <p className="text-xs font-semibold text-muted-foreground">{t('reading.lib.example')}</p>
            <p lang="en">{view.example}</p>
            <p className="text-muted-foreground" lang="bn">
              {view.exampleBn}
            </p>
          </div>

          {view.synonyms.length > 0 && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{t('reading.synonyms')}:</span> {view.synonyms.slice(0, 3).join(', ')}
            </p>
          )}
        </div>

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
        {extra}
        </>
        )}
    </CardFrame>
  );
}

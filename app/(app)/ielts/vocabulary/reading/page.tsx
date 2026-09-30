'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpenText, BookText, Check, ChevronRight, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { EmptyState, PageHeader, ScreenSkeleton } from '@/components/ds';
import { WordStatusChip } from '@/components/brain/WordStatusChip';
import { meanings } from '@/components/brain/meaning';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { vocabWordInfo } from '@/lib/content/reading-library';
import { readingVocabulary, type ReadingWord } from '@/lib/content/reading-library/vocab-list';

/**
 * Reading Vocabulary: the key words of the passages the student opened. New
 * words save to My Brain in one tap; saved words point to the same Brain entry.
 */
export default function ReadingVocabularyPage() {
  const { t, locale, n } = useLocale();
  const brain = useBrain();
  const { profile } = useProfile();
  const [saving, setSaving] = useState<string | null>(null);

  if (brain.loading || !profile) return <ScreenSkeleton />;
  const { fresh, saved } = readingVocabulary(profile.study.readingLibrary, brain.words);

  const save = async (w: ReadingWord) => {
    setSaving(w.id);
    try {
      const word = await brain.save(vocabWordInfo(w.view), { type: 'reading-passage', title: w.passage.title, passageId: w.passage.id, licenseStatus: 'original' }, w.sentence);
      toast.success(t('reading.savedToast', { word: word.word }));
    } catch {
      toast.error(t('reading.saveError'));
    } finally {
      setSaving(null);
    }
  };

  const empty = fresh.length === 0 && saved.length === 0;

  return (
    <div className="max-w-2xl space-y-8" data-testid="reading-vocab">
      <PageHeader title={t('readingVocab.title')} subtitle={t('readingVocab.subtitle')} backHref="/ielts/vocabulary/notebook" backLabel={t('brain.title')} />

      {empty ? (
        <EmptyState
          icon={BookOpenText}
          title={t('readingVocab.emptyTitle')}
          description={t('readingVocab.emptyBody')}
          action={
            <Button asChild>
              <Link href="/ielts/reading">
                <BookText /> {t('readingVocab.emptyCta')}
              </Link>
            </Button>
          }
        />
      ) : (
        <>
          <section className="space-y-3" aria-labelledby="fresh-title" data-testid="reading-fresh">
            <div className="space-y-0.5">
              <h2 id="fresh-title" className="text-lg font-semibold">
                {t('readingVocab.fresh')} <span className="text-muted-foreground tabular-nums">{n(fresh.length)}</span>
              </h2>
              <p className="text-sm text-muted-foreground">{fresh.length ? t('readingVocab.freshBody') : t('readingVocab.freshNone')}</p>
            </div>
            <ul className="space-y-2">
              {fresh.map((w) => {
                const meaning = locale === 'bn' ? w.view.bn || w.view.en : w.view.en || w.view.bn;
                return (
                  <li key={w.id} className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3" data-fresh-word={w.id}>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-[17px] font-semibold" lang="en">
                          {w.view.lemma}
                        </span>
                        <span className="text-xs text-muted-foreground italic">{w.view.pos}</span>
                      </p>
                      <p className="text-[15px] text-foreground/85">{meaning}</p>
                      <Link href={`/ielts/reading/${w.passage.id}`} className="flex items-center gap-1 truncate text-xs text-muted-foreground hover:text-brand">
                        <BookOpenText className="size-3.5 shrink-0" aria-hidden /> <span className="truncate">{w.passage.title}</span>
                      </Link>
                    </div>
                    <Button size="sm" className="h-10 shrink-0" disabled={saving === w.id} onClick={() => void save(w)} data-save={w.id} aria-label={t('readingVocab.save')}>
                      <Plus /> <span className="sm:hidden">{t('readingVocab.saveShort')}</span>
                      <span className="hidden sm:inline">{t('readingVocab.save')}</span>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </section>

          {saved.length > 0 && (
            <section className="space-y-3" aria-labelledby="saved-title" data-testid="reading-saved">
              <h2 id="saved-title" className="text-lg font-semibold">
                {t('readingVocab.saved')} <span className="text-muted-foreground tabular-nums">{n(saved.length)}</span>
              </h2>
              <ul className="space-y-2">
                {saved.map((w) => {
                  const { primary } = meanings(w, locale);
                  return (
                    <li key={w.id}>
                      <Link href={`/ielts/vocabulary/notebook/${w.id}`} className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 hover:bg-muted/50" data-saved-word={w.id}>
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <p className="flex flex-wrap items-baseline gap-x-2">
                            <span className="text-[17px] font-semibold" lang="en">
                              {w.word}
                            </span>
                            {w.partOfSpeech && <span className="text-xs text-muted-foreground italic">{w.partOfSpeech}</span>}
                          </p>
                          {primary && <p className="line-clamp-1 text-[15px] text-foreground/85">{primary}</p>}
                          <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                            <BookOpenText className="size-3.5 shrink-0" aria-hidden /> <span className="truncate">{w.source.title}</span>
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
                            <Check className="size-3.5" aria-hidden /> {t('readingVocab.inBrain')}
                          </span>
                          <WordStatusChip status={w.status} />
                        </div>
                        <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}

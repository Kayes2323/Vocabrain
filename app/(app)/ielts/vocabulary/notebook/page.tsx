'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpenText, BookText, BrainCircuit, CheckCircle2, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmptyState, PageHeader, Panel, ScreenSkeleton } from '@/components/ds';
import { WordStatusChip } from '@/components/brain/WordStatusChip';
import { meanings } from '@/components/brain/meaning';
import { useWhen } from '@/components/brain/useWhen';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { brainGroup, brainSummary, isDue } from '@/lib/engine';
import type { BrainWord } from '@/lib/models';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'learning' | 'review' | 'mastered';
const FILTERS: Filter[] = ['all', 'learning', 'review', 'mastered'];

function matches(w: BrainWord, filter: Filter) {
  if (filter === 'review') return isDue(w);
  if (filter === 'learning') return brainGroup(w) !== 'mastered';
  if (filter === 'mastered') return brainGroup(w) === 'mastered';
  return true;
}

/**
 * My Brain: the student's own vocabulary. Two clear parts — Today's Recall
 * (train memory) comes first, then My Vocabulary (the collected words).
 */
export default function NotebookPage() {
  const { t, locale, n } = useLocale();
  const brain = useBrain();
  const when = useWhen();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const summary = brainSummary(brain.words);
  const counts = useMemo(() => Object.fromEntries(FILTERS.map((f) => [f, brain.words.filter((w) => matches(w, f)).length])) as Record<Filter, number>, [brain.words]);
  const list = brain.words
    .filter((w) => matches(w, filter))
    .filter((w) => !query.trim() || w.word.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const onlyNewDue = summary.due > 0 && brain.words.filter((w) => isDue(w)).every((w) => w.recallCount === 0);

  if (brain.loading) return <ScreenSkeleton />;

  const stats: [string, number, string][] = [
    ['words', summary.total, 'stat-words'],
    ['due', summary.due, 'stat-due'],
    ['learning', summary.learning, 'stat-learning'],
    ['mastered', summary.mastered, 'stat-mastered'],
  ];

  return (
    <div className="max-w-2xl space-y-6" data-testid="my-brain">
      <PageHeader title={t('brain.title')} subtitle={t('brain.page.subtitle')} backHref="/ielts/vocabulary" backLabel={t('skills.vocabulary')} />

      <dl className="grid grid-cols-4 gap-2" data-testid="brain-stats">
        {stats.map(([key, value, id]) => (
          <div key={key} className="rounded-2xl border bg-card px-2 py-3 text-center" data-testid={id}>
            <dd className="text-xl font-semibold tabular-nums">{n(value)}</dd>
            <dt className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{t(`brain.page.stats.${key}`)}</dt>
          </div>
        ))}
      </dl>

      {brain.words.length === 0 ? (
        <EmptyState
          icon={BrainCircuit}
          title={t('brain.page.emptyTitle')}
          description={t('brain.page.emptyBody')}
          action={
            <Button asChild>
              <Link href="/ielts/reading">
                <BookText /> {t('brain.page.emptyCta')}
              </Link>
            </Button>
          }
        />
      ) : (
        <>
          {/* Today's Recall: memory training, before the list. */}
          <Panel variant="brand" className="space-y-3" data-testid="today-recall">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">{t('brain.page.recallTitle')}</h2>
              <p className="text-[15px] text-foreground/80">{t('brain.page.recallBody')}</p>
            </div>
            {summary.due > 0 ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-medium tabular-nums" data-testid="recall-ready">
                  {t('brain.page.recallReady', { n: n(summary.due) })}
                  {onlyNewDue && <span className="block text-sm font-normal text-muted-foreground">{t('brain.page.recallNew')}</span>}
                </p>
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/review" data-testid="start-recall">
                    {t('brain.page.recallStart')} <ArrowRight />
                  </Link>
                </Button>
              </div>
            ) : (
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-medium" data-testid="recall-done">
                <CheckCircle2 className="size-5 text-success" aria-hidden /> {t('brain.page.recallDone')}
                {summary.nextDueAt && <span className="text-sm font-normal text-muted-foreground">{t('brain.page.recallNext', { when: when(summary.nextDueAt) })}</span>}
              </p>
            )}
          </Panel>

          <section className="space-y-3" aria-labelledby="notebook-title" data-testid="notebook">
            <div className="flex items-center justify-between gap-3">
              <h2 id="notebook-title" className="text-lg font-semibold">
                {t('brain.page.notebook')}
              </h2>
              <Link href="/ielts/vocabulary/reading" className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                <BookOpenText className="size-4" aria-hidden /> {t('brain.page.readingLink')}
              </Link>
            </div>

            <div role="tablist" aria-label={t('brain.page.notebook')} className="grid grid-cols-4 gap-1 rounded-xl bg-muted p-1">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  type="button"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  data-filter={f}
                  className={cn(
                    'h-10 rounded-lg px-1 text-[13px] font-medium whitespace-nowrap transition-colors',
                    filter === f ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t(`brain.page.filters.${f}`)} <span className="tabular-nums opacity-70">{n(counts[f])}</span>
                </button>
              ))}
            </div>

            {brain.words.length > 8 && (
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <Input type="search" aria-label={t('brain.search')} placeholder={t('brain.search')} value={query} onChange={(e) => setQuery(e.target.value)} className="h-11 rounded-xl bg-card pl-10" />
              </div>
            )}

            {list.length === 0 ? (
              <p className="px-1 py-4 text-[15px] text-muted-foreground" data-testid="filter-empty">
                {t(`brain.page.filterEmpty.${filter}`)}
              </p>
            ) : (
              <ul className="space-y-2">
                {list.map((w) => {
                  const { primary } = meanings(w, locale);
                  return (
                    <li key={w.id}>
                      <Link
                        href={`/ielts/vocabulary/notebook/${w.id}`}
                        className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 transition-colors hover:bg-muted/50"
                        data-word={w.id}
                      >
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <p className="flex flex-wrap items-baseline gap-x-2">
                            <span className="text-[17px] font-semibold" lang="en">
                              {w.word}
                            </span>
                            {w.partOfSpeech && <span className="text-xs text-muted-foreground italic">{w.partOfSpeech}</span>}
                          </p>
                          {primary && <p className="line-clamp-1 text-[15px] text-foreground/85">{primary}</p>}
                          <p className="flex items-center gap-1 truncate text-xs text-muted-foreground" data-source={w.source.type}>
                            {w.source.type === 'reading-passage' ? <BookOpenText className="size-3.5 shrink-0" aria-hidden /> : null}
                            <span className="truncate">{w.source.type === 'reading-passage' ? w.source.title : t(`brain.page.source.${w.source.type}`)}</span>
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                          <WordStatusChip status={w.status} />
                          <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { JourneyStageStatus, JourneyStepStatus } from '@/lib/engine';
import { findLesson, topicHref } from '@/lib/foundation';
import { cn } from '@/lib/utils';
import { useText } from './useFoundation';

/** Card surface shared by topic cards and lesson cards. */
export const CARD =
  'block rounded-2xl border bg-card shadow-[0_1px_2px_rgb(15_23_42/0.04),0_4px_14px_-8px_rgb(15_23_42/0.10)] transition-[border-color,box-shadow,transform] duration-150 hover:border-brand/30 hover:shadow-[0_2px_4px_rgb(15_23_42/0.05),0_10px_24px_-12px_rgb(15_23_42/0.18)] active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100 outline-none focus-visible:ring-2 focus-visible:ring-brand/40';

/** One topic: the whole card is a link to the topic page. */
function TopicCard({ s, index }: { s: JourneyStepStatus; index: number }) {
  const { t, n } = useLocale();
  const text = useText();
  const pct = Math.round(s.progress * 100);
  const done = s.state === 'done';
  const current = s.state === 'current';
  const started = s.lessonsDone > 0;
  const lessons = s.step.lessons ?? [];

  return (
    <li>
      <Link
        href={topicHref(s.step)}
        className={cn(CARD, 'p-4', current && 'border-brand/35 ring-1 ring-brand/10')}
        data-topic={s.step.id}
        data-state={s.state}
        data-topic-modules={[...new Set(lessons.map((id) => findLesson(id)?.module.id))].join(' ')}
        aria-current={current ? 'step' : undefined}
      >
        <span className="flex items-start justify-between gap-3">
          <span
            aria-hidden
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums',
              done ? 'bg-success-soft text-success' : current || started ? 'bg-brand-soft text-brand' : 'bg-muted text-muted-foreground',
            )}
          >
            {done ? <Check className="size-4.5" /> : s.step.parallel ? '+' : n(index + 1)}
          </span>
          <span className="flex items-center gap-2">
            {current && <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand">{started ? t('foundation.topicCards.continue') : t('foundation.topicCards.start')}</span>}
            <ArrowRight aria-hidden className="size-5 text-muted-foreground" />
          </span>
        </span>
        <span className="mt-2.5 block">
          <span className={cn('block text-[16px] leading-snug font-semibold', done && 'text-foreground/80')}>{text(s.step.title)}</span>
          <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">{text(s.step.why)}</span>
        </span>
        <span className="mt-3 block space-y-1.5">
          <span className="flex items-center justify-between gap-2 text-xs tabular-nums">
            <span className="text-muted-foreground">
              {started ? t('foundation.topicCards.lessons', { done: n(s.lessonsDone), total: n(s.lessonsTotal) }) : t('foundation.topicCards.lessonsN', { n: n(s.lessonsTotal) })}
            </span>
            {done ? (
              <span className="font-medium text-success">{t('foundation.topicCards.completed')}</span>
            ) : started ? (
              <span className="font-semibold text-foreground">{n(pct)}%</span>
            ) : s.step.parallel ? (
              <span className="text-muted-foreground">{t('foundation.topicCards.alongside')}</span>
            ) : null}
          </span>
          <span className="block h-1.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={text(s.step.title)}>
            <span className={cn('block h-full rounded-full', done ? 'bg-success/35' : 'bg-brand')} style={{ width: `${pct}%` }} />
          </span>
        </span>
      </Link>
    </li>
  );
}

/** English Foundation as ordered topic cards. One tap opens the topic page. */
export function TopicCards({ stage, className }: { stage: JourneyStageStatus; className?: string }) {
  const main = stage.steps.filter((s) => !s.step.parallel);
  const parallel = stage.steps.filter((s) => s.step.parallel);
  return (
    <div className={cn('space-y-3', className)} data-testid="topic-cards">
      <ol className="space-y-3">{main.map((s, i) => <TopicCard key={s.step.id} s={s} index={i} />)}</ol>
      {parallel.length > 0 && <ol className="space-y-3">{parallel.map((s) => <TopicCard key={s.step.id} s={s} index={main.length} />)}</ol>}
    </div>
  );
}

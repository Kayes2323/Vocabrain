'use client';

import Link from 'next/link';
import { Check, ChevronRight } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { JourneyStageStatus, JourneyStepStatus } from '@/lib/engine';
import { findLesson, topicHref } from '@/lib/foundation';
import { cn } from '@/lib/utils';
import { useText } from './useFoundation';

/** Card surface shared by topic cards and lesson cards. */
export const CARD =
  'block rounded-2xl border bg-card shadow-[0_1px_2px_rgb(15_23_42/0.04),0_4px_14px_-8px_rgb(15_23_42/0.10)] transition-[border-color,box-shadow,transform] duration-150 hover:border-brand/30 hover:shadow-[0_2px_4px_rgb(15_23_42/0.05),0_10px_24px_-12px_rgb(15_23_42/0.18)] active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100 outline-none focus-visible:ring-2 focus-visible:ring-brand/40';

/** One topic as a compact card: number, title, lessons and progress. The whole card opens the topic page. */
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
        className={cn(CARD, 'px-3.5 py-3', current && 'border-brand/35 ring-1 ring-brand/10')}
        data-topic={s.step.id}
        data-state={s.state}
        data-topic-modules={[...new Set(lessons.map((id) => findLesson(id)?.module.id))].join(' ')}
        aria-current={current ? 'step' : undefined}
      >
        <span className="flex items-center gap-3">
          <span
            aria-hidden
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold tabular-nums',
              done ? 'bg-success-soft text-success' : current || started ? 'bg-brand-soft text-brand' : 'bg-muted text-muted-foreground',
            )}
          >
            {done ? <Check className="size-4" /> : s.step.parallel ? '+' : n(index + 1)}
          </span>
          <span className="min-w-0 flex-1">
            <span className={cn('block truncate text-[15px] leading-snug font-semibold', done && 'text-foreground/80')}>{text(s.step.title)}</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground tabular-nums">
              <span>{started ? t('foundation.topicCards.lessons', { done: n(s.lessonsDone), total: n(s.lessonsTotal) }) : t('foundation.topicCards.lessonsN', { n: n(s.lessonsTotal) })}</span>
              {done ? (
                <span className="font-medium text-success">· {t('foundation.topicCards.completed')}</span>
              ) : started ? (
                <span className="font-semibold text-foreground">· {n(pct)}%</span>
              ) : s.step.parallel ? (
                <span>· {t('foundation.topicCards.alongside')}</span>
              ) : null}
            </span>
          </span>
          {current && <span className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">{started ? t('foundation.topicCards.continue') : t('foundation.topicCards.start')}</span>}
          <ChevronRight aria-hidden className="size-5 shrink-0 text-muted-foreground" />
        </span>
        {(started || current) && (
          <span className="mt-2.5 ml-11 block h-1 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={text(s.step.title)}>
            <span className={cn('block h-full rounded-full', done ? 'bg-success/35' : 'bg-brand')} style={{ width: `${pct}%` }} />
          </span>
        )}
      </Link>
    </li>
  );
}

/** A stage's topics as ordered compact cards. One tap opens the topic page. */
export function TopicCards({ stage, className, testId = 'topic-cards' }: { stage: JourneyStageStatus; className?: string; testId?: string }) {
  // Only topics with lessons are cards (the optional English check is a separate reminder).
  const topics = stage.steps.filter((s) => s.step.lessons?.length);
  const main = topics.filter((s) => !s.step.parallel);
  const parallel = topics.filter((s) => s.step.parallel);
  return (
    <div className={cn('space-y-3', className)} data-testid={testId}>
      <ol className="space-y-2">{main.map((s, i) => <TopicCard key={s.step.id} s={s} index={i} />)}</ol>
      {parallel.length > 0 && <ol className="space-y-2">{parallel.map((s) => <TopicCard key={s.step.id} s={s} index={main.length} />)}</ol>}
    </div>
  );
}

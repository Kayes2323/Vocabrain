'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronRight, Lock } from 'lucide-react';
import { useGuideReminder } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { JourneyStageStatus, JourneyStepStatus } from '@/lib/engine';
import { findLesson, lessonState, nextLesson, stepBeforeLesson } from '@/lib/foundation';
import type { FoundationProgress } from '@/lib/models';
import { cn } from '@/lib/utils';
import { useText } from './useFoundation';

const lessonHref = (id: string) => `/ielts/foundation/lesson/${id}`;

/** Where the extra practice for a topic lives (module page, or the Parts of Speech unit). */
function practiceLinks(lessonIds: string[]) {
  const seen = new Map<string, { href: string; moduleId: string; title: ReturnType<typeof findLesson> }>();
  for (const id of lessonIds) {
    const found = findLesson(id);
    if (!found) continue;
    const { module, lesson } = found;
    const href = lesson.unit && module.units ? `/ielts/foundation/${module.id}/${lesson.unit}` : `/ielts/foundation/${module.id}`;
    if (!seen.has(href)) seen.set(href, { href, moduleId: module.id, title: found });
  }
  return [...seen.values()];
}

function LessonRow({ id, fp, nextId, onGuide }: { id: string; fp: FoundationProgress; nextId?: string; onGuide: (e: React.MouseEvent, id: string) => void }) {
  const { t } = useLocale();
  const text = useText();
  const { module, lesson } = findLesson(id)!;
  const state = lessonState(module, lesson, fp);
  const isNext = id === nextId;
  return (
    <li>
      <Link
        href={lessonHref(id)}
        onClick={(e) => onGuide(e, id)}
        className={cn('flex min-h-12 items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-muted/70', isNext && 'bg-brand-soft/70')}
        data-lesson={id}
        data-state={isNext ? 'current' : state}
      >
        <span
          aria-hidden
          className={cn(
            'flex size-5 shrink-0 items-center justify-center rounded-full',
            state === 'done' && 'bg-success text-white',
            state === 'skipped' && 'bg-muted text-muted-foreground',
            state !== 'done' && state !== 'skipped' && (isNext ? 'border-2 border-brand' : 'border-2 border-border'),
          )}
        >
          {(state === 'done' || state === 'skipped') && <Check className="size-3" />}
          {isNext && state !== 'done' && <span className="size-1.5 rounded-full bg-brand" />}
        </span>
        <span
          className={cn(
            'min-w-0 flex-1 text-[15px] leading-snug',
            state === 'done' || state === 'skipped' ? 'text-muted-foreground' : isNext ? 'font-semibold' : 'text-foreground',
          )}
        >
          {text(lesson.title)}
        </span>
        <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground tabular-nums">
          {state === 'locked' && !isNext && <Lock className="size-3" aria-label={t('foundation.topicCards.later')} />}
          {state === 'skipped' ? t('foundation.topicCards.skipped') : lesson.kind === 'test' ? t('foundation.topicCards.test') : t('common.minutes', { n: lesson.minutes })}
        </span>
      </Link>
    </li>
  );
}

function TopicCard({
  s,
  index,
  fp,
  open,
  onToggle,
  nextId,
  onGuide,
}: {
  s: JourneyStepStatus;
  index: number;
  fp: FoundationProgress;
  open: boolean;
  onToggle: () => void;
  nextId?: string;
  onGuide: (e: React.MouseEvent, id: string) => void;
}) {
  const { t, n } = useLocale();
  const text = useText();
  const ref = useRef<HTMLLIElement>(null);
  const lessons = s.step.lessons ?? [];
  const pct = Math.round(s.progress * 100);
  const done = s.state === 'done';
  const current = s.state === 'current';
  const started = s.lessonsDone > 0;
  const resume = current ? (lessons.includes(nextId ?? '') ? nextId : lessons.find((id) => !fp.lessons[id])) : undefined;
  const bodyId = `topic-${s.step.id}`;

  // Keep the opened card in view when the one above it closes.
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      const r = ref.current?.getBoundingClientRect();
      if (r && (r.top < 0 || r.top > window.innerHeight * 0.7)) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        ref.current!.scrollIntoView({
          block: 'start',
          behavior: reduce ? 'auto' : 'smooth',
        });
      }
    }, 280);
    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <li
      ref={ref}
      className={cn(
        'scroll-mt-20 rounded-2xl border bg-card shadow-[0_1px_2px_rgb(15_23_42/0.04),0_4px_14px_-8px_rgb(15_23_42/0.10)] transition-[border-color,box-shadow] duration-200',
        current && 'border-brand/35 ring-1 ring-brand/10',
        open && 'shadow-[0_2px_4px_rgb(15_23_42/0.05),0_10px_24px_-12px_rgb(15_23_42/0.18)]',
      )}
      data-topic={s.step.id}
      data-state={s.state}
      data-topic-modules={[...new Set(lessons.map((id) => findLesson(id)?.module.id))].join(' ')}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={bodyId}
        className="flex w-full items-start gap-3.5 rounded-2xl p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        data-testid={`topic-toggle-${s.step.id}`}
      >
        <span
          aria-hidden
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums',
            done ? 'bg-success-soft text-success' : current || started ? 'bg-brand-soft text-brand' : 'bg-muted text-muted-foreground',
          )}
        >
          {done ? <Check className="size-4.5" /> : s.step.parallel ? '+' : n(index + 1)}
        </span>
        <span className="min-w-0 flex-1 space-y-2">
          <span className="block">
            <span className="flex items-start justify-between gap-2">
              <span className={cn('text-[16px] leading-snug font-semibold', done && 'text-foreground/80')}>{text(s.step.title)}</span>
              <ChevronRight
                aria-hidden
                className={cn('mt-0.5 size-5 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none', open && 'rotate-90')}
              />
            </span>
            <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">{text(s.step.why)}</span>
          </span>
          <span className="block space-y-1.5">
            <span className="flex items-center justify-between gap-2 text-xs tabular-nums">
              <span className="text-muted-foreground">
                {started
                  ? t('foundation.topicCards.lessons', {
                      done: n(s.lessonsDone),
                      total: n(s.lessonsTotal),
                    })
                  : t('foundation.topicCards.lessonsN', {
                      n: n(s.lessonsTotal),
                    })}
              </span>
              {done ? (
                <span className="font-medium text-success">{t('foundation.topicCards.completed')}</span>
              ) : started ? (
                <span className="font-semibold text-foreground">{n(pct)}%</span>
              ) : s.step.parallel ? (
                <span className="text-muted-foreground">{t('foundation.topicCards.alongside')}</span>
              ) : null}
            </span>
            <span
              className="block h-1.5 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={text(s.step.title)}
            >
              <span className={cn('block h-full rounded-full transition-[width] duration-300', done ? 'bg-success/35' : 'bg-brand')} style={{ width: `${pct}%` }} />
            </span>
          </span>
        </span>
      </button>

      {resume && !open && (
        <div className="-mt-1 flex justify-end px-4 pb-3.5">
          <Link
            href={lessonHref(resume)}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-brand px-4 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
            data-testid="topic-continue"
          >
            {started ? t('foundation.topicCards.continue') : t('foundation.topicCards.start')} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      )}

      {/* Smooth height animation without measuring: 0fr ↔ 1fr. */}
      <div
        id={bodyId}
        className="grid transition-[grid-template-rows] duration-[250ms] ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
        data-testid={`topic-body-${s.step.id}`}
        data-open={open}
      >
        <div className="min-h-0 overflow-hidden" inert={!open}>
          <div className="border-t px-2.5 pt-2 pb-3">
            <ol className="space-y-0.5">
              {lessons.map((id) => (
                <LessonRow key={id} id={id} fp={fp} nextId={nextId} onGuide={onGuide} />
              ))}
            </ol>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 px-2.5">
              {practiceLinks(lessons).map((m) => (
                <Link key={m.href} href={m.href} className="inline-flex h-9 items-center gap-1 text-sm font-medium text-brand" data-module-link={m.moduleId}>
                  {t('foundation.topicCards.more', {
                    module: text(m.title!.module.short ?? m.title!.module.title),
                  })}{' '}
                  <ChevronRight className="size-3.5" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

/**
 * English Foundation as ordered topic cards. Tapping a card opens its lessons
 * in place (one card open at a time); the current topic carries Continue.
 */
export function TopicCards({ stage, fp, className }: { stage: JourneyStageStatus; fp: FoundationProgress; className?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const { intercept, dialog } = useGuideReminder();
  const next = nextLesson(fp);
  const nextId = next?.lesson.id;
  const main = stage.steps.filter((s) => !s.step.parallel);
  const parallel = stage.steps.filter((s) => s.step.parallel);

  // Guide, don't block: a lesson ahead of its prerequisite offers the earlier one first.
  const onGuide = (e: React.MouseEvent, id: string) => {
    const { module, lesson } = findLesson(id)!;
    const before = stepBeforeLesson(module, lesson, fp);
    if (intercept(lessonHref(id), before && lessonHref(before.id), `lesson:${id}`)) e.preventDefault();
  };
  const card = (s: JourneyStepStatus, i: number) => (
    <TopicCard
      key={s.step.id}
      s={s}
      index={i}
      fp={fp}
      open={openId === s.step.id}
      onToggle={() => setOpenId((o) => (o === s.step.id ? null : s.step.id))}
      nextId={nextId}
      onGuide={onGuide}
    />
  );

  return (
    <div className={cn('space-y-3', className)} data-testid="topic-cards">
      <ol className="space-y-3">{main.map(card)}</ol>
      {parallel.length > 0 && <ol className="space-y-3">{parallel.map((s) => card(s, main.length))}</ol>}
      {dialog}
    </div>
  );
}

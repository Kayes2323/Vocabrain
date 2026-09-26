'use client';

import { useState } from 'react';
import { Check, Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { LessonStep, TimePicture } from '@/lib/foundation';
import { cn } from '@/lib/utils';
import { useText } from './useFoundation';

type Step<K extends LessonStep['kind']> = Extract<LessonStep, { kind: K }>;

const optionClass = (selected: boolean, right: boolean, wrong: boolean, locked: boolean) =>
  cn(
    'flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border bg-card px-4 py-2.5 text-left transition-colors',
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
    selected && !locked && 'border-brand ring-1 ring-brand',
    right && 'border-success bg-success/10',
    wrong && 'border-amber-500 bg-amber-500/10',
    !locked && !selected && 'hover:border-foreground/20',
  );

/** Hook + Diagnose: the student answers first; then we explain their choice. */
export function HookStep({ step, picked, onPick }: { step: Step<'hook'>; picked?: string; onPick: (o: string) => void }) {
  const { t } = useLocale();
  const text = useText();
  const locked = picked !== undefined;
  return (
    <div className="space-y-4">
      <Panel variant="muted" className="text-[17px] leading-7">
        {text(step.situation)}
      </Panel>
      <p className="font-medium">{text(step.question)}</p>
      <div role="radiogroup" className="grid gap-2">
        {step.options.map((o) => {
          const selected = picked === o;
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={locked}
              onClick={() => onPick(o)}
              lang="en"
              className={optionClass(selected, locked && o === step.answer, selected && o !== step.answer, locked)}
            >
              <span>{o}</span>
              {locked && o === step.answer && <Check className="size-4 text-success" aria-hidden />}
            </button>
          );
        })}
      </div>
      {locked && (
        <div role="status" className={cn('space-y-1.5 rounded-xl p-4 text-[15px]', picked === step.answer ? 'bg-success/10' : 'bg-amber-500/10')}>
          <p className="font-semibold">{picked === step.answer ? t('foundation.lesson.hookRight') : t('foundation.lesson.hookAlmost')}</p>
          <p>{text(step.diagnose[picked])}</p>
          {picked !== step.answer && <p className="text-sm text-muted-foreground">{t('foundation.lesson.hookNoWorry')}</p>}
        </div>
      )}
    </div>
  );
}

/** Discover: examples first; the student names the pattern; then notes and the pattern appear. */
export function DiscoverStep({ step, picked, onPick }: { step: Step<'discover'>; picked?: number; onPick: (i: number) => void }) {
  const { t } = useLocale();
  const text = useText();
  const locked = picked !== undefined;
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {step.items.map((item, i) => (
          <Panel key={i} className="space-y-1 p-4">
            <p className="text-[17px]" lang="en">{item.en}</p>
            {locked && <p className="text-sm text-brand">{text(item.note)}</p>}
          </Panel>
        ))}
      </div>
      <p className="font-medium">{text(step.question)}</p>
      <div role="radiogroup" className="grid gap-2">
        {step.options.map((o, i) => {
          const selected = picked === i;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={locked}
              onClick={() => onPick(i)}
              className={optionClass(selected, locked && i === step.answer, selected && i !== step.answer, locked)}
            >
              <span>{text(o)}</span>
            </button>
          );
        })}
      </div>
      {locked && (
        <div role="status" className="flex gap-2.5 rounded-xl bg-brand-soft p-4 text-[15px]">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
          <p>
            <span className="font-semibold">{t('foundation.lesson.pattern')}: </span>
            {text(step.pattern)}
          </p>
        </div>
      )}
    </div>
  );
}

/** Common Mistake Lab: spot the problem, then tap to see why and the fix. */
export function MistakeLab({ step }: { step: Step<'mistakes'> }) {
  const { t } = useLocale();
  const text = useText();
  const [open, setOpen] = useState<Set<number>>(new Set());
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{t('foundation.lesson.mistakeIntro')}</p>
      {step.items.map((m, i) => (
        <Panel key={i} className="space-y-2 p-4">
          <p className="flex items-start gap-2 text-[17px]" lang="en">
            <X className="mt-1 size-4 shrink-0 text-destructive" aria-hidden />
            <span className={cn(open.has(i) && 'text-muted-foreground line-through decoration-destructive/50')}>{m.wrong}</span>
          </p>
          {open.has(i) ? (
            <>
              <p className="flex items-start gap-2 text-[17px] font-medium" lang="en">
                <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden />
                {m.right}
              </p>
              <p className="text-sm text-foreground/80">{text(m.why)}</p>
            </>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setOpen((s) => new Set(s).add(i))}>
              {t('foundation.lesson.revealWhy')}
            </Button>
          )}
        </Panel>
      ))}
    </div>
  );
}

/** A tiny past — now — future line showing a sentence's time picture. */
export function TimeLine({ picture }: { picture: TimePicture }) {
  const dot = (left: string, hollow = false) => (
    <span className={cn('absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand', hollow ? 'bg-background' : 'bg-brand')} style={{ left }} />
  );
  return (
    <div className="relative h-5 w-full" aria-hidden>
      <span className="absolute top-1/2 right-0 left-0 h-px bg-border" />
      <span className="absolute top-1/2 left-1/2 h-3 w-px -translate-y-1/2 bg-foreground/50" />
      {picture === 'finished' && dot('25%')}
      {picture === 'earlier-past' && (
        <>
          {dot('15%')}
          {dot('32%', true)}
        </>
      )}
      {picture === 'now' && dot('50%')}
      {picture === 'future' && dot('78%')}
      {picture === 'habit' && ['15%', '32%', '50%', '68%', '85%'].map((x) => <span key={x}>{dot(x)}</span>)}
      {picture === 'past-to-now' && (
        <>
          <span className="absolute top-1/2 left-[20%] h-1 w-[30%] -translate-y-1/2 rounded bg-brand" />
          {dot('20%')}
        </>
      )}
    </div>
  );
}

export function TimelineCards({ items }: { items: NonNullable<Step<'concept'>['timeline']> }) {
  const { t } = useLocale();
  const text = useText();
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((it, i) => (
        <Panel key={i} className="space-y-2 p-3.5">
          <p className="text-xs font-semibold text-brand">{text(it.label)}</p>
          <p className="text-[15px]" lang="en">{it.sentence}</p>
          <TimeLine picture={it.picture} />
          <div className="flex justify-between text-[10px] tracking-wide text-muted-foreground uppercase">
            <span>{t('foundation.lesson.timelinePast')}</span>
            <span>{t('foundation.lesson.timelineNow')}</span>
            <span>{t('foundation.lesson.timelineFuture')}</span>
          </div>
        </Panel>
      ))}
    </div>
  );
}

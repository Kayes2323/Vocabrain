'use client';

import { Check, Lightbulb } from 'lucide-react';
import { Panel } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { FlowStep, L, LessonPhase } from '@/lib/foundation';
import { cn } from '@/lib/utils';
import { TimelineCards } from './LessonSteps';
import { useText } from './useFoundation';

/**
 * Reusable teaching blocks for every Foundation lesson:
 * LessonIntro (what you'll learn) · RuleBlock (one small piece of theory) ·
 * ExampleBlock (sentence + why) · TeacherTip · PhaseBar (where am I) · LessonSummary.
 */

/** Where the student is: Learn · Examples · Try · Practice · Review. */
export function PhaseBar({ phases, current }: { phases: LessonPhase[]; current: LessonPhase | 'intro' }) {
  const { t } = useLocale();
  const at = current === 'intro' ? -1 : phases.indexOf(current);
  return (
    <ol className="flex items-center gap-1 text-xs" data-testid="lesson-phases" aria-label={t('foundation.teach.phasesLabel')}>
      {phases.map((p, i) => (
        <li
          key={p}
          className={cn(
            'flex h-7 min-w-0 flex-1 items-center justify-center rounded-full px-1.5 font-medium',
            i === at ? 'bg-brand text-brand-foreground' : i < at ? 'bg-brand-soft text-brand' : 'bg-muted text-muted-foreground',
          )}
          aria-current={i === at ? 'step' : undefined}
          data-phase={p}
        >
          <span className="truncate">{t(`foundation.teach.phase.${p}`)}</span>
        </li>
      ))}
    </ol>
  );
}

/** First screen: one line on why it matters, then the short list of what comes. */
export function LessonIntro({ step }: { step: Extract<FlowStep, { kind: 'intro' }> }) {
  const { t } = useLocale();
  const text = useText();
  return (
    <div className="space-y-5" data-testid="lesson-intro">
      <h1 className="text-2xl font-semibold tracking-tight">{text(step.title)}</h1>
      <p className="text-[17px] leading-7 text-foreground/85">{text(step.why)}</p>
      {step.topics.length > 0 && (
        <Panel className="space-y-2.5">
          <p className="text-sm font-semibold text-muted-foreground">{t('foundation.teach.youWillLearn')}</p>
          <ul className="space-y-2">
            {step.topics.map((topic, i) => (
              <li key={i} className="flex gap-2.5 text-[16px]">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                {text(topic)}
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}

/** One piece of the rule: a short explanation or up to two points. */
export function RuleBlock({ step }: { step: Extract<FlowStep, { kind: 'rule' }> }) {
  const text = useText();
  return (
    <div className="space-y-3" data-testid="rule-block" data-rule-part={`${step.part}/${step.parts}`}>
      {step.body && <p className="text-[17px] leading-8">{text(step.body)}</p>}
      {step.points && (
        <ul className="space-y-3">
          {step.points.map((p, i) => (
            <li key={i} className="rounded-xl border-l-[3px] border-brand/60 bg-card py-2.5 pr-3 pl-4 text-[16px] leading-7">
              {text(p)}
            </li>
          ))}
        </ul>
      )}
      {step.timeline && <TimelineCards items={step.timeline} />}
    </div>
  );
}

/** Example sentences with the reason under each; nothing to guess. */
export function ExampleBlock({ items }: { items: { en: string; note: L }[] }) {
  const text = useText();
  return (
    <div className="space-y-2.5" data-testid="example-block">
      {items.map((item, i) => (
        <Panel key={i} className="space-y-1.5 p-4">
          <p className="text-[17px]" lang="en">
            {item.en}
          </p>
          <p className="text-sm text-muted-foreground">{text(item.note)}</p>
        </Panel>
      ))}
    </div>
  );
}

/** A short teacher's note ("Remember: …"). */
export function TeacherTip({ children, label }: { children: React.ReactNode; label?: string }) {
  const { t } = useLocale();
  return (
    <div className="flex gap-2.5 rounded-xl bg-brand-soft p-4 text-[15px] leading-7" data-testid="teacher-tip">
      <Lightbulb className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
      <p>
        <span className="font-semibold">{label ?? t('foundation.teach.remember')}: </span>
        {children}
      </p>
    </div>
  );
}

/** Last screen: what the student learned. */
export function LessonSummary({ points }: { points: L[] }) {
  const text = useText();
  return (
    <Panel variant="brand" className="space-y-2.5" data-testid="lesson-summary">
      {points.map((p, i) => (
        <p key={i} className="flex gap-2.5 leading-7">
          <Check className="mt-1.5 size-4 shrink-0 text-brand" aria-hidden /> {text(p)}
        </p>
      ))}
    </Panel>
  );
}

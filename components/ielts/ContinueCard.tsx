'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel } from '@/components/ds';
import { useText } from '@/components/foundation/useFoundation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { continueLearning, type IELTSJourney } from '@/lib/engine';
import { findLesson, getStage } from '@/lib/foundation';
import type { UserProfile } from '@/lib/models';
import { cn } from '@/lib/utils';

export interface ContinueView {
  kind: string;
  label: string;
  title: string;
  why?: string;
  href: string;
  cta: string;
  skip?: { href: string; label: string };
}

/** The next step on the curriculum path, ready to render. */
export function useContinue(profile: UserProfile, journey?: IELTSJourney): ContinueView {
  const { t } = useLocale();
  const text = useText();
  const next = continueLearning(profile, journey);
  const lessonHref = (id: string) => `/ielts/foundation/lesson/${id}`;
  const stageLabel = (id: Parameters<typeof getStage>[0]) => t('ielts.continue.step', { stage: t(`journey.stages.${id}`) });
  switch (next.kind) {
    case 'resume': {
      const lesson = findLesson(next.lessonId)!.lesson;
      return { kind: next.kind, label: t('ielts.continue.resume'), title: text(lesson.title), why: text(lesson.why), href: lessonHref(lesson.id), cta: t('ielts.continue.cta') };
    }
    case 'check':
      return {
        kind: next.kind,
        label: stageLabel('start-here'),
        title: t('ielts.continue.check'),
        why: t('ielts.continue.checkWhy'),
        href: '/ielts/foundation/diagnostic',
        cta: t('ielts.continue.checkCta'),
        ...(next.skipLessonId ? { skip: { href: lessonHref(next.skipLessonId), label: t('ielts.continue.skipCheck') } } : {}),
      };
    case 'foundation-start':
      return {
        kind: next.kind,
        label: t(`journey.stages.english-foundation`),
        title: t('ielts.continue.foundationTitle'),
        why: t('ielts.continue.foundationWhy'),
        href: lessonHref(next.lessonId),
        cta: t('ielts.continue.foundationCta'),
      };
    case 'lesson': {
      const lesson = findLesson(next.lessonId)!.lesson;
      return { kind: next.kind, label: stageLabel(next.stage), title: text(lesson.title), why: text(lesson.why), href: lessonHref(lesson.id), cta: t('ielts.continue.start') };
    }
    case 'step':
      return { kind: next.kind, label: stageLabel(next.stage), title: text(next.step.title), why: text(next.step.why), href: next.step.href!, cta: t('ielts.continue.cta') };
    case 'done':
      return { kind: next.kind, label: t('journey.stages.target-ready'), title: t('ielts.continue.doneTitle'), why: t('ielts.continue.doneWhy'), href: '/ielts/tests', cta: t('ielts.continue.cta') };
  }
}

/** "Continue Learning": the primary action on the IELTS page (and a compact version on Home). */
export function ContinueCard({ profile, journey, compact = false, className }: { profile: UserProfile; journey?: IELTSJourney; compact?: boolean; className?: string }) {
  const { t } = useLocale();
  const view = useContinue(profile, journey);
  return (
    <Panel variant="brand" className={cn('space-y-3', className)} data-testid="continue-learning" data-kind={view.kind}>
      <div className="min-w-0 space-y-1">
        <p className="text-xs font-semibold tracking-wider text-brand uppercase">
          {t('ielts.continue.label')} · <span data-testid="continue-stage">{view.label}</span>
        </p>
        <p className={cn('font-semibold tracking-tight text-balance', compact ? 'text-base' : 'text-lg')} data-testid="continue-title">
          {view.title}
        </p>
        {view.why && !compact && <p className="line-clamp-2 text-[15px] text-foreground/80">{view.why}</p>}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button asChild size="lg" className="h-12 w-full sm:w-auto">
          <Link href={view.href} data-testid="continue-cta">
            {view.cta} <ArrowRight />
          </Link>
        </Button>
        {view.skip && (
          <Button asChild variant="ghost" className="h-11 w-full text-muted-foreground sm:w-auto">
            <Link href={view.skip.href} data-testid="continue-skip">
              {view.skip.label}
            </Link>
          </Button>
        )}
      </div>
    </Panel>
  );
}

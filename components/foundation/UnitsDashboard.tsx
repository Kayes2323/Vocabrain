'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, Panel, ProgressBar, ScreenSkeleton, Section, StatusChip, type Tone } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  FINAL_PARTS, FINAL_PER_PART, moduleProgress, patternsFor, POS_NAMED_PATTERNS, unitLessonsDone, unitLessonTotal, unitNextLesson, unitProgress, unitStatus, type Module, type PosPattern, type Unit, type UnitStatus,
} from '@/lib/foundation';
import type { FoundationProgress } from '@/lib/models';
import { cn } from '@/lib/utils';
import { useFoundation, useText } from './useFoundation';

export const STATUS_TONE: Record<UnitStatus, Tone> = { new: 'neutral', learning: 'brand', practising: 'brand', review: 'warning', mastered: 'success' };
const GROUP_TINT: Record<Unit['group'], string> = {
  jobs: 'bg-tint-lavender text-tint-lavender-fg',
  skills: 'bg-tint-green text-tint-green-fg',
  together: 'bg-tint-yellow text-tint-yellow-fg',
};

export function UnitMark({ unit, className }: { unit: Unit; className?: string }) {
  return (
    <span aria-hidden className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold', GROUP_TINT[unit.group], className)}>
      {unit.mark}
    </span>
  );
}

/** The open pattern that belongs to a unit (its job was expected or chosen, or a named pattern it teaches). */
export const unitPattern = (unit: Unit, patterns: PosPattern[]) =>
  patterns.find((p) => (unit.pos && (p.expected === unit.pos || p.chosen === unit.pos)) || p.unit === unit.id);

/** "Adverb used where Adjective is needed ×3" or "Subject–verb agreement ×3". */
export function usePatternLabel() {
  const { t } = useLocale();
  const text = useText();
  return (p: PosPattern) =>
    p.expected && p.chosen
      ? t('foundation.units.pattern', { chosen: t(`foundation.pos.${p.chosen}`), expected: t(`foundation.pos.${p.expected}`), n: p.count })
      : t('foundation.units.patternNamed', { name: text(POS_NAMED_PATTERNS[p.pair].title), n: p.count });
}

function UnitCard({ module, unit, fp, patterns }: { module: Module; unit: Unit; fp: FoundationProgress; patterns: PosPattern[] }) {
  const { t } = useLocale();
  const text = useText();
  const status = unitStatus(module, unit, fp);
  const total = unitLessonTotal(module, unit);
  const written = unit.challenge ? 1 : total - (unit.planned?.length ?? 0);
  const pct = unitProgress(module, unit, fp);
  const pattern = unitPattern(unit, patterns);
  const cta =
    written === 0 ? t('foundation.units.soon') : unit.challenge ? (fp.posFinal ? t('foundation.final.retry') : t('foundation.units.start')) : pattern ? t('foundation.units.fix') : status === 'review' || status === 'mastered' ? t('foundation.units.review') : pct > 0 ? t('foundation.units.continue') : t('foundation.units.start');
  return (
    <Link
      href={`/ielts/foundation/${module.id}/${unit.id}`}
      data-card
      className="group flex flex-col gap-2.5 rounded-2xl border bg-card p-4 transition-colors hover:border-foreground/15 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <span className="flex items-start gap-3">
        <UnitMark unit={unit} />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-semibold">{text(unit.title)}</span>
            {status !== 'new' && <StatusChip tone={STATUS_TONE[status]}>{t(`foundation.units.status.${status}`)}</StatusChip>}
          </span>
          <span className="mt-0.5 block text-sm text-muted-foreground">{text(unit.tagline)}</span>
        </span>
      </span>
      {written > 0 && <ProgressBar value={pct} label={text(unit.title)} size="sm" tone={status === 'mastered' ? 'success' : 'brand'} />}
      <span className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1 tabular-nums">
          <Clock className="size-3.5" aria-hidden />
          {unit.challenge
            ? t('foundation.units.challengeMeta', { n: FINAL_PARTS.length * FINAL_PER_PART, m: unit.minutes })
            : written > 0
              ? t('foundation.units.lessons', { n: total, m: unit.minutes })
              : t('foundation.units.planned')}
        </span>
        <span className={cn('flex items-center gap-0.5 text-sm font-semibold', written > 0 ? 'text-brand' : 'text-muted-foreground')}>
          {cta} <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </span>
    </Link>
  );
}

/** A module organised in units (Parts of Speech): next step, then unit cards by group. */
export function UnitsDashboard({ module }: { module: Module }) {
  const { t } = useLocale();
  const text = useText();
  const { fp } = useFoundation();
  const patternLabel = usePatternLabel();
  if (!fp || !module.units) return <ScreenSkeleton />;

  const units = module.units;
  const statuses = units.map((u) => unitStatus(module, u, fp));
  const started = statuses.filter((s) => s !== 'new').length;
  const mastered = statuses.filter((s) => s === 'mastered').length;
  const patterns = patternsFor(fp, module.id);
  const top = patterns[0];
  // Recommended next lesson: first unit (in order) with a lesson still to do.
  const nextUnit = units.find((u) => unitNextLesson(module, u, fp));
  const next = nextUnit ? unitNextLesson(module, nextUnit, fp) : undefined;
  const groups: Unit['group'][] = ['jobs', 'skills', 'together'];

  return (
    <div className="space-y-8">
      <PageHeader title={text(module.title)} subtitle={text(module.description)} backHref="/ielts/foundation" backLabel={t('foundation.title')} />

      <div className="-mt-2 space-y-2">
        <ProgressBar value={moduleProgress(module, fp)} label={text(module.title)} size="sm" />
        <p className="text-sm text-muted-foreground tabular-nums">{t('foundation.units.progress', { started, total: units.length, mastered })}</p>
      </div>

      {top ? (
        <Panel className="flex flex-col gap-4 border-warning/30 bg-warning-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 space-y-1">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-warning uppercase">
              <Sparkles className="size-3.5" aria-hidden /> {t('foundation.patternTitle')}
            </p>
            <p className="font-semibold">
              {patternLabel(top)}
            </p>
            <p className="text-sm text-muted-foreground" lang="en">
              {top.latest.prompt} · <span className="line-through decoration-destructive/60">{top.latest.answer}</span> → <span className="font-medium text-foreground">{top.latest.correctAnswer}</span>
            </p>
          </div>
          <Button asChild size="lg" className="h-12 shrink-0">
            <Link href={`/ielts/foundation/fix/${top.pair}`}>
              {t('foundation.units.fixCta')} <ArrowRight />
            </Link>
          </Button>
        </Panel>
      ) : (
        <Panel variant="brand" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 space-y-1">
            <p className="text-xs font-semibold tracking-wider text-brand uppercase">{t('foundation.units.nextStep')}</p>
            <p className="text-lg font-semibold tracking-tight">{next && nextUnit ? `${text(nextUnit.title)} · ${text(next.title)}` : t('foundation.units.allDone')}</p>
            {next && <p className="text-sm text-muted-foreground">{t('foundation.lesson.minutes', { n: next.minutes })}</p>}
          </div>
          {next && (
            <Button asChild size="lg" className="h-12 shrink-0">
              <Link href={`/ielts/foundation/lesson/${next.id}`}>
                {fp.inProgress?.lessonId === next.id || unitLessonsDone(module, nextUnit!, fp) > 0 ? t('foundation.units.continue') : t('foundation.units.start')} <ArrowRight />
              </Link>
            </Button>
          )}
        </Panel>
      )}

      {groups.map((g) => (
        <Section key={g} title={t(`foundation.units.groups.${g}`)} variant="label">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
            {units
              .filter((u) => u.group === g)
              .map((u) => (
                <UnitCard key={u.id} module={module} unit={u} fp={fp} patterns={patterns} />
              ))}
          </div>
        </Section>
      ))}
    </div>
  );
}

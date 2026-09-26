'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Circle, CircleDashed, Clock, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, ListRow, PageHeader, Panel, ProgressBar, RowGroup, ScreenSkeleton, Section, StatusChip, useGuideReminder } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  getModule, lessonOutcome, posPatterns, stepBeforeLesson, unitLessons, unitLessonsDone, unitLessonTotal, unitNextLesson, unitProgress, unitStatus, type Module, type Unit,
} from '@/lib/foundation';
import { STATUS_TONE, UnitMark, unitPattern } from './UnitsDashboard';
import { useFoundation, useText } from './useFoundation';

/** One unit: status and why, the fix when a pattern is open, lessons in order, what is coming. */
export function UnitView({ module, unit }: { module: Module; unit: Unit }) {
  const { t } = useLocale();
  const text = useText();
  const { fp } = useFoundation();
  const { intercept, dialog } = useGuideReminder();
  if (!fp) return <ScreenSkeleton />;

  const status = unitStatus(module, unit, fp);
  const lessons = unitLessons(module, unit);
  const next = unitNextLesson(module, unit, fp);
  const pattern = unitPattern(unit, posPatterns(fp));
  const continues = unit.continues ? getModule(unit.continues.moduleId) : undefined;
  const conceptReview = status === 'review' && !pattern && unit.concept;

  return (
    <div className="space-y-8">
      <PageHeader title={text(unit.title)} subtitle={text(unit.tagline)} backHref={`/ielts/foundation/${module.id}`} backLabel={text(module.title)} action={<UnitMark unit={unit} className="size-12 text-base" />} />

      <div className="-mt-2 space-y-2">
        <div className="flex items-center gap-3">
          <StatusChip tone={STATUS_TONE[status]}>{t(`foundation.units.status.${status}`)}</StatusChip>
          <ProgressBar value={unitProgress(module, unit, fp)} label={text(unit.title)} size="sm" className="flex-1" />
          <span className="text-sm text-muted-foreground tabular-nums">{t('foundation.units.lessonsDone', { done: unitLessonsDone(module, unit, fp), total: unitLessonTotal(module, unit) })}</span>
        </div>
        <p className="text-sm text-muted-foreground">{t(`foundation.units.statusWhy.${status}`)}</p>
      </div>

      {pattern ? (
        <Panel className="flex flex-col gap-4 border-warning/30 bg-warning-soft sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px]">{t('foundation.units.patternHere', { chosen: t(`foundation.pos.${pattern.chosen}`), expected: t(`foundation.pos.${pattern.expected}`), n: pattern.count })}</p>
          <Button asChild size="lg" className="h-12 shrink-0">
            <Link href={`/ielts/foundation/fix/${pattern.pair}`}>
              {t('foundation.units.fixCta')} <ArrowRight />
            </Link>
          </Button>
        </Panel>
      ) : conceptReview ? (
        <Button asChild size="lg" variant="outline" className="h-12">
          <Link href={`/ielts/foundation/review/${unit.concept}`}>
            <RotateCcw /> {t('foundation.units.review')}
          </Link>
        </Button>
      ) : null}

      <Section title={t('foundation.units.unitLessons')} variant="label">
        <RowGroup>
          {lessons.map((l, i) => {
            const done = fp.lessons[l.id];
            const href = `/ielts/foundation/lesson/${l.id}`;
            const before = stepBeforeLesson(module, l, fp);
            const practise = done && lessonOutcome(done.best) === 'practice';
            return (
              <ListRow
                key={l.id}
                href={href}
                onNavigate={(e) => intercept(href, before && `/ielts/foundation/lesson/${before.id}`, `lesson:${l.id}`) && e.preventDefault()}
                icon={done ? CheckCircle2 : Circle}
                iconTone={done ? (practise ? 'warning' : 'success') : l.id === next?.id ? 'brand' : 'neutral'}
                title={`${i + 1}. ${text(l.title)}`}
                description={
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" /> {t('foundation.lesson.minutes', { n: l.minutes })} · {text(l.why)}
                  </span>
                }
                trailing={
                  done ? (
                    <StatusChip tone={practise ? 'warning' : 'success'}>{done.best}%</StatusChip>
                  ) : l.id === next?.id ? (
                    <StatusChip tone="brand">{fp.inProgress?.lessonId === l.id ? t('foundation.units.continue') : t('foundation.units.start')}</StatusChip>
                  ) : undefined
                }
              />
            );
          })}
          {(unit.planned ?? []).map((p, i) => (
            <ListRow key={`p-${i}`} icon={CircleDashed} title={`${lessons.length + i + 1}. ${text(p)}`} trailing={<StatusChip>{t('foundation.units.soon')}</StatusChip>} />
          ))}
        </RowGroup>
      </Section>

      {continues && unit.continues && (
        <Callout>
          {text(unit.continues.text)}{' '}
          <Link href={`/ielts/foundation/${continues.id}`} className="font-medium underline underline-offset-4">
            {text(continues.short ?? continues.title)}
          </Link>
        </Callout>
      )}
      {dialog}
    </div>
  );
}

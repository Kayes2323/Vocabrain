'use client';

import Link from 'next/link';
import { CheckCircle2, Circle, ClipboardCheck, Clock, Lock, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, ListRow, PageHeader, ProgressBar, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { canQuiz, lessonOutcome, lessonState, moduleProgress, nextLesson, type Module } from '@/lib/foundation';
import { useFoundation, useText } from './useFoundation';

export function ModuleView({ module }: { module: Module }) {
  const { t } = useLocale();
  const text = useText();
  const { fp } = useFoundation();
  if (!fp) return <ScreenSkeleton />;

  const pct = moduleProgress(module, fp);
  const next = nextLesson(fp);
  const nextHere = next?.module.id === module.id ? next.lesson.id : module.lessons.find((l) => lessonState(module, l, fp) === 'available')?.id;

  return (
    <div className="space-y-8">
      <PageHeader title={`${module.number}. ${text(module.title)}`} subtitle={text(module.description)} backHref="/ielts/foundation" backLabel={t('foundation.title')} />

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{t('foundation.lessonsCount', { done: module.lessons.filter((l) => fp.lessons[l.id]).length, total: module.lessons.length + (module.planned?.length ?? 0) })}</span>
          <span className="tabular-nums">{pct}%</span>
        </div>
        <ProgressBar value={pct} label={text(module.title)} />
      </div>

      <Callout tone="brand" title={t('foundation.module.ieltsLink')}>
        {text(module.ieltsLink)}
      </Callout>

      <Section
        title={t('foundation.module.lessons')}
        action={
          canQuiz(fp, module) ? (
            <Button asChild size="sm" variant="outline">
              <Link href={`/ielts/foundation/quiz/${module.id}`}>{t('foundation.action.takeQuiz')}</Link>
            </Button>
          ) : undefined
        }
      >
        <RowGroup>
          {module.lessons.map((l, i) => {
            const state = lessonState(module, l, fp);
            const done = fp.lessons[l.id];
            const needsPractice = done && lessonOutcome(done.best) === 'practice';
            const locked = state === 'locked';
            return (
              <ListRow
                key={l.id}
                href={locked ? undefined : `/ielts/foundation/lesson/${l.id}`}
                muted={locked}
                icon={locked ? Lock : state === 'done' ? CheckCircle2 : state === 'skipped' ? SkipForward : l.kind === 'test' ? ClipboardCheck : Circle}
                iconTone={state === 'done' ? (needsPractice ? 'warning' : 'success') : l.id === nextHere ? 'brand' : 'neutral'}
                title={`${i + 1}. ${text(l.title)}`}
                description={
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" /> {t('foundation.lesson.minutes', { n: l.minutes })}
                    {l.kind === 'test' ? ` · ${t('foundation.lesson.test')}` : ` · ${t(`foundation.lesson.difficulty.${l.difficulty}`)}`}
                  </span>
                }
                trailing={
                  done ? (
                    needsPractice ? (
                      <StatusChip tone="warning">{t('foundation.module.practiceMore')}</StatusChip>
                    ) : (
                      <StatusChip tone="success">{t('foundation.module.done', { score: done.best })}</StatusChip>
                    )
                  ) : state === 'skipped' ? (
                    <StatusChip>{t('foundation.lesson.skipped')}</StatusChip>
                  ) : l.id === nextHere ? (
                    <StatusChip tone="brand">{fp.inProgress?.lessonId === l.id ? t('foundation.action.continueLesson') : t('foundation.startHere')}</StatusChip>
                  ) : undefined
                }
              />
            );
          })}
          {(module.planned ?? []).map((p, i) => (
            <ListRow key={`p-${i}`} muted icon={Lock} title={`${module.lessons.length + i + 1}. ${text(p)}`} trailing={<StatusChip>{t('foundation.soon')}</StatusChip>} />
          ))}
        </RowGroup>
      </Section>

      {module.lessons.length === 0 && <Callout>{t('foundation.module.comingSoon')}</Callout>}
    </div>
  );
}

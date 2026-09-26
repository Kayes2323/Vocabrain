'use client';

import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { Callout, ListRow, PageHeader, ProgressBar, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { lessonOutcome, moduleProgress, nextLesson, type Module } from '@/lib/foundation';
import { useFoundation, useText } from './useFoundation';

export function ModuleView({ module }: { module: Module }) {
  const { t } = useLocale();
  const text = useText();
  const { fp } = useFoundation();
  if (!fp) return <ScreenSkeleton />;

  const pct = moduleProgress(module, fp);
  const next = module.lessons.find((l) => !fp.lessons[l.id]) ?? (nextLesson(fp)?.module.id === module.id ? nextLesson(fp)?.lesson : undefined);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${module.number}. ${text(module.title)}`}
        subtitle={text(module.description)}
        backHref="/ielts/foundation"
        backLabel={t('foundation.title')}
      />

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

      <Section title={t('foundation.module.lessons')}>
        <RowGroup>
          {module.lessons.map((l, i) => {
            const done = fp.lessons[l.id];
            const needsPractice = done && lessonOutcome(done.best) === 'practice';
            return (
              <ListRow
                key={l.id}
                href={`/ielts/foundation/lesson/${l.id}`}
                icon={done ? CheckCircle2 : Circle}
                iconTone={done ? (needsPractice ? 'warning' : 'success') : l.id === next?.id ? 'brand' : 'neutral'}
                title={`${i + 1}. ${text(l.title)}`}
                description={
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" /> {t('foundation.lesson.minutes', { n: l.minutes })} · {t(`foundation.lesson.difficulty.${l.difficulty}`)}
                  </span>
                }
                trailing={
                  done ? (
                    needsPractice ? (
                      <StatusChip tone="warning">{t('foundation.module.practiceMore')}</StatusChip>
                    ) : (
                      <StatusChip tone="success">{t('foundation.module.done', { score: done.best })}</StatusChip>
                    )
                  ) : l.id === next?.id ? (
                    <StatusChip tone="brand">{t('foundation.startHere')}</StatusChip>
                  ) : undefined
                }
              />
            );
          })}
          {(module.planned ?? []).map((p, i) => (
            <ListRow key={`p-${i}`} muted icon={Circle} title={`${module.lessons.length + i + 1}. ${text(p)}`} trailing={<StatusChip>{t('foundation.soon')}</StatusChip>} />
          ))}
        </RowGroup>
      </Section>

      {module.lessons.length === 0 && <Callout>{t('foundation.module.comingSoon')}</Callout>}
    </div>
  );
}

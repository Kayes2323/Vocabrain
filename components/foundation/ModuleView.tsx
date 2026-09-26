'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Circle, CircleDashed, ClipboardCheck, Clock, SkipForward, Sparkles, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, ListRow, PageHeader, Panel, ProgressBar, RowGroup, ScreenSkeleton, Section, StatusChip, useGuideReminder } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  canQuiz, challengeForModule, finalRecord, lessonOutcome, lessonState, moduleProgress, nextLesson, patternsFor, stepBeforeLesson, type Module,
} from '@/lib/foundation';
import { UnitsDashboard, usePatternLabel } from './UnitsDashboard';
import { useFoundation, useText } from './useFoundation';

export function ModuleView({ module }: { module: Module }) {
  if (module.units) return <UnitsDashboard module={module} />;
  return <LessonsView module={module} />;
}

function LessonsView({ module }: { module: Module }) {
  const { t } = useLocale();
  const text = useText();
  const { fp } = useFoundation();
  const { intercept, dialog } = useGuideReminder();
  const patternLabel = usePatternLabel();
  if (!fp) return <ScreenSkeleton />;

  const pct = moduleProgress(module, fp);
  const pattern = patternsFor(fp, module.id)[0];
  const challenge = challengeForModule(module.id);
  const final = challenge ? finalRecord(fp, challenge.id) : undefined;
  const next = nextLesson(fp);
  const nextHere = next?.module.id === module.id ? next.lesson.id : module.lessons.find((l) => lessonState(module, l, fp) === 'available')?.id;

  return (
    <div className="space-y-8">
      <PageHeader title={text(module.title)} subtitle={text(module.description)} backHref="/ielts/foundation" backLabel={t('foundation.title')} />

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{t('foundation.lessonsCount', { done: module.lessons.filter((l) => fp.lessons[l.id]).length, total: module.lessons.length + (module.planned?.length ?? 0) })}</span>
          <span className="tabular-nums">{pct}%</span>
        </div>
        <ProgressBar value={pct} label={text(module.title)} />
      </div>

      {pattern && (
        <Panel className="flex flex-col gap-4 border-warning/30 bg-warning-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 space-y-1">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-warning uppercase">
              <Sparkles className="size-3.5" aria-hidden /> {t('foundation.patternTitle')}
            </p>
            <p className="font-semibold">{patternLabel(pattern)}</p>
            <p className="text-sm text-muted-foreground" lang="en">
              {pattern.latest.prompt} · <span className="line-through decoration-destructive/60">{pattern.latest.answer}</span> → <span className="font-medium text-foreground">{pattern.latest.correctAnswer}</span>
            </p>
          </div>
          <Button asChild size="lg" className="h-12 shrink-0">
            <Link href={`/ielts/foundation/fix/${pattern.pair}`}>
              {t('foundation.units.fixCta')} <ArrowRight />
            </Link>
          </Button>
        </Panel>
      )}

      <Callout tone="brand" title={t('foundation.module.ieltsLink')}>
        {text(module.ieltsLink)}
      </Callout>

      <Section
        title={t('foundation.module.lessons')}
        variant="label"
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
            const href = `/ielts/foundation/lesson/${l.id}`;
            const before = stepBeforeLesson(module, l, fp);
            return (
              <ListRow
                key={l.id}
                href={href}
                onNavigate={(e) => intercept(href, before && `/ielts/foundation/lesson/${before.id}`, `lesson:${l.id}`) && e.preventDefault()}
                icon={state === 'done' ? CheckCircle2 : state === 'skipped' ? SkipForward : l.kind === 'test' ? ClipboardCheck : Circle}
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
            <ListRow key={`p-${i}`} icon={CircleDashed} title={`${module.lessons.length + i + 1}. ${text(p)}`} trailing={<StatusChip>{t('foundation.soon')}</StatusChip>} />
          ))}
        </RowGroup>
      </Section>

      {challenge && (
        <RowGroup>
          <ListRow
            href={`/ielts/foundation/challenge/${challenge.id}`}
            icon={Trophy}
            iconTone={final && final.best >= 80 ? 'success' : 'brand'}
            title={text(challenge.title)}
            description={text(challenge.tagline)}
            trailing={final ? <StatusChip tone={final.best >= 80 ? 'success' : 'warning'}>{t('foundation.final.bestShort', { best: final.best })}</StatusChip> : undefined}
          />
        </RowGroup>
      )}

      {module.lessons.length === 0 && <Callout>{t('foundation.module.comingSoon')}</Callout>}
      {dialog}
    </div>
  );
}

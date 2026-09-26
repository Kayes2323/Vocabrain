'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Compass, GraduationCap, Headphones, Layers, Mic, PenLine, Sparkles, Target, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, ListRow, PageHeader, Panel, ProgressBar, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  DIAGNOSTIC_AREAS, isComingSoon, LEVELS, lessonsDone, lessonTotal, levelProgress, modulesForLevel, modulesForTag, moduleProgress,
  nextLesson, recommendedModule, skillProgress, testedOutOfFoundation, topErrors,
} from '@/lib/foundation';
import { cn } from '@/lib/utils';
import { useFoundation, useText } from './useFoundation';

const JOURNEY = ['foundation', 'basics', 'listening', 'reading', 'writing', 'speaking', 'practice', 'mock', 'target'] as const;
const LEVEL_ICON = { 1: Layers, 2: GraduationCap, 3: Target, 4: Timer, 5: Headphones } as const;
const SKILL_ICON = { grammar: Layers, vocabulary: BookOpen, listening: Headphones, reading: BookOpen, writing: PenLine, speaking: Mic } as const;

/** Where the student is on the big journey: Foundation → … → Target Band. */
function journeyIndex(fp: Parameters<typeof levelProgress>[1]): number {
  if (testedOutOfFoundation(fp) || levelProgress(1, fp) >= 100) return 1;
  return 0;
}

export function FoundationDashboard() {
  const { t } = useLocale();
  const text = useText();
  const { fp, update } = useFoundation();
  if (!fp) return <ScreenSkeleton />;

  const diag = fp.diagnostic;
  const rec = recommendedModule(fp);
  const next = nextLesson(fp);
  const pattern = topErrors(fp, 1)[0];
  const patternModule = pattern ? modulesForTag(pattern.tag).find((m) => !isComingSoon(m)) : undefined;
  const at = journeyIndex(fp);

  return (
    <div className="space-y-8">
      <PageHeader title={t('foundation.title')} subtitle={t('foundation.subtitle')} backHref="/ielts" backLabel="IELTS" />

      {/* Mino introduces the course once */}
      {!fp.introSeenAt && (
        <Panel variant="brand" className="space-y-3">
          <p className="flex items-center gap-2 font-semibold">
            <Sparkles className="size-5 text-brand" /> {t('foundation.introTitle')}
          </p>
          <p className="leading-7">{t('foundation.introBody')}</p>
          <Button onClick={() => update((p) => ({ ...p, introSeenAt: new Date().toISOString() }))}>{t('foundation.introCta')}</Button>
        </Panel>
      )}

      <Section title={t('foundation.journeyTitle')}>
        <ol className="flex gap-1.5 overflow-x-auto pb-1" aria-label={t('foundation.journeyTitle')}>
          {JOURNEY.map((id, i) => (
            <li
              key={id}
              aria-current={i === at ? 'step' : undefined}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm',
                i < at && 'border-success/40 bg-success/10',
                i === at && 'border-brand bg-brand-soft font-semibold',
                i > at && 'text-muted-foreground',
              )}
            >
              {t(`foundation.journey.${id}`)}
              {i < JOURNEY.length - 1 && <span className="text-muted-foreground" aria-hidden>→</span>}
            </li>
          ))}
        </ol>
      </Section>

      <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
        {/* Diagnostic */}
        {diag ? (
          <Panel className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">{t('foundation.diagnosticDone')}</p>
                <p className="text-xl font-semibold">{t(`foundation.level.${diag.level}`)}</p>
              </div>
              <StatusChip tone={diag.level === 'strong' ? 'success' : diag.level === 'developing' ? 'brand' : 'warning'}>{diag.percent}%</StatusChip>
            </div>
            <p className="text-sm text-muted-foreground">{t(`foundation.levelBody.${diag.level}`)}</p>
            <div className="grid grid-cols-5 gap-2">
              {DIAGNOSTIC_AREAS.map((a) => (
                <div key={a} className="space-y-1">
                  <ProgressBar value={diag.areas[a]} label={t(`foundation.areas.${a}`)} size="sm" tone={diag.areas[a] < 50 ? 'warning' : 'brand'} />
                  <p className="truncate text-[11px] text-muted-foreground" title={t(`foundation.areas.${a}`)}>{t(`foundation.areas.${a}`)}</p>
                </div>
              ))}
            </div>
            <Button asChild variant="ghost" size="sm" className="-ml-2">
              <Link href="/ielts/foundation/diagnostic">{t('foundation.diagnosticRetake')}</Link>
            </Button>
          </Panel>
        ) : (
          <Panel variant="muted" className="space-y-3">
            <p className="flex items-center gap-2 font-semibold">
              <Compass className="size-5 text-brand" /> {t('foundation.diagnosticTitle')}
            </p>
            <p className="text-sm text-muted-foreground">{t('foundation.diagnosticBody')}</p>
            <Button asChild>
              <Link href="/ielts/foundation/diagnostic">
                {t('foundation.diagnosticCta')} <ArrowRight />
              </Link>
            </Button>
          </Panel>
        )}

        {/* Continue */}
        <Panel className="space-y-3">
          <p className="text-sm text-muted-foreground">{t('foundation.continueTitle')}</p>
          {next ? (
            <>
              <div>
                <p className="text-lg font-semibold">{text(next.lesson.title)}</p>
                <p className="text-sm text-muted-foreground">
                  {text(next.module.title)} · {t('foundation.lesson.minutes', { n: next.lesson.minutes })}
                </p>
              </div>
              <p className="text-sm">{text(next.lesson.why)}</p>
              <Button asChild className="w-full sm:w-auto">
                <Link href={`/ielts/foundation/lesson/${next.lesson.id}`}>
                  {t('foundation.continueCta')} <ArrowRight />
                </Link>
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm">{t('foundation.allDoneWritten')}</p>
              <Button asChild variant="outline">
                <Link href="/ielts/tests">{t('tests.libraryTitle')}</Link>
              </Button>
            </>
          )}
        </Panel>
      </div>

      {/* Mino pattern spotting from real answers */}
      {pattern && pattern.count >= 2 && (
        <Callout tone="brand" icon={Sparkles} title={t('foundation.patternTitle')}>
          <p>
            {patternModule
              ? t('foundation.patternBody', { count: pattern.count, tag: t(`foundation.tags.${pattern.tag}`), module: text(patternModule.title) })
              : t('foundation.patternBodyNoModule', { count: pattern.count, tag: t(`foundation.tags.${pattern.tag}`) })}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {patternModule && (
              <Button asChild size="sm">
                <Link href={`/ielts/foundation/${patternModule.id}`}>{t('foundation.patternCta')}</Link>
              </Button>
            )}
            <Button asChild size="sm" variant="outline">
              <Link href={`/mino?${new URLSearchParams({ ask: 'foundation', tag: pattern.tag })}`}>{t('foundation.askMinoCta')}</Link>
            </Button>
          </div>
        </Callout>
      )}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="space-y-8">
          {([1, 2] as const).map((level) => (
            <Section key={level} title={t('foundation.modulesTitle', { n: level })}>
              <RowGroup>
                {modulesForLevel(level).map((m) => {
                  const soon = isComingSoon(m);
                  const pct = moduleProgress(m, fp);
                  return (
                    <ListRow
                      key={m.id}
                      href={`/ielts/foundation/${m.id}`}
                      icon={SKILL_ICON[m.skill]}
                      iconTone={soon ? 'neutral' : 'brand'}
                      muted={soon}
                      title={`${m.number}. ${text(m.title)}`}
                      description={text(m.description)}
                      trailing={
                        soon ? (
                          <StatusChip>{t('foundation.soon')}</StatusChip>
                        ) : m.id === rec?.id && pct < 100 ? (
                          <StatusChip tone="brand">{t('foundation.recommended')}</StatusChip>
                        ) : (
                          <StatusChip tone={pct >= 100 ? 'success' : 'neutral'}>{t('foundation.lessonsCount', { done: lessonsDone(m, fp), total: lessonTotal(m) })}</StatusChip>
                        )
                      }
                    />
                  );
                })}
              </RowGroup>
            </Section>
          ))}
        </div>

        <div className="space-y-8">
          <Section title={t('foundation.levelsTitle')}>
            <RowGroup>
              {LEVELS.map((level) => {
                const Icon = LEVEL_ICON[level.id];
                const pct = level.id <= 2 ? levelProgress(level.id, fp) : undefined;
                return (
                  <ListRow
                    key={level.id}
                    href={level.href}
                    icon={Icon}
                    iconTone={level.id === 1 ? 'brand' : 'neutral'}
                    title={`${t('foundation.levelN', { n: level.id })} · ${text(level.title)}`}
                    description={text(level.description)}
                    trailing={
                      level.id === 1 && testedOutOfFoundation(fp) ? (
                        <StatusChip tone="success">{t('foundation.testedOut')}</StatusChip>
                      ) : pct !== undefined ? (
                        <div className="w-16 space-y-1 text-right">
                          <span className="text-xs font-semibold tabular-nums">{pct}%</span>
                          <ProgressBar value={pct} label={text(level.title)} size="sm" />
                        </div>
                      ) : undefined
                    }
                  />
                );
              })}
            </RowGroup>
          </Section>

          <Section title={t('foundation.skillsTitle')}>
            <Panel className="space-y-3">
              {skillProgress(fp).map((s) => (
                <div key={s.skill} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{t(`foundation.skills.${s.skill}`)}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">{s.percent === null ? t('foundation.soon') : `${s.percent}%`}</span>
                  </div>
                  <ProgressBar value={s.percent ?? 0} label={t(`foundation.skills.${s.skill}`)} size="sm" tone={s.percent === null ? 'neutral' : 'brand'} />
                </div>
              ))}
            </Panel>
          </Section>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{t('foundation.honesty')}</p>
    </div>
  );
}

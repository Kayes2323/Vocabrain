'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Play, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, Panel, ProgressBar, ScreenSkeleton, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  DIAGNOSTIC_AREAS, DIAGNOSTIC_ITEMS, DIAGNOSTIC_READING, diagnosticAreas, findLesson, getModule, gradeExercise, recordAnswer, scoreDiagnostic,
} from '@/lib/foundation';
import type { FoundationDiagnosticRecord, FoundationProgress } from '@/lib/models';
import { ExerciseView } from './ExerciseView';
import { canSpeak, speak } from './speak';
import { useFoundation, useText } from './useFoundation';

const MAX_PLAYS = 2;

function AudioButton({ text }: { text: string }) {
  const { t } = useLocale();
  const [plays, setPlays] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);
  useEffect(() => setSupported(canSpeak()), []);
  if (!supported) return <Callout tone="warning">{t('foundation.diag.noAudio')}</Callout>;
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="brand"
        disabled={playing || plays >= MAX_PLAYS}
        onClick={async () => {
          setPlaying(true);
          setPlays((p) => p + 1);
          await speak(text);
          setPlaying(false);
        }}
      >
        <Play /> {plays === 0 ? t('foundation.diag.play') : t('foundation.diag.playAgain')}
      </Button>
      <span className="text-sm text-muted-foreground">{t('foundation.diag.playsLeft', { n: MAX_PLAYS - plays })}</span>
    </div>
  );
}

export function FoundationDiagnostic() {
  const { t, list } = useLocale();
  const text = useText();
  const { fp, update } = useFoundation();
  const [phase, setPhase] = useState<'intro' | 'questions' | 'result'>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<FoundationDiagnosticRecord | null>(null);

  if (!fp) return <ScreenSkeleton />;

  if (phase === 'intro') {
    return (
      <div className="mx-auto w-full max-w-lg space-y-6 py-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/ielts/foundation">{t('foundation.diag.goToDashboard')}</Link>
        </Button>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">{t('foundation.diag.introTitle')}</h1>
          <p className="text-muted-foreground">{t('foundation.diag.introBody')}</p>
        </div>
        <Panel className="space-y-2">
          {list('foundation.diag.introPoints').map((p) => (
            <p key={p} className="flex gap-2">
              <Check className="mt-1 size-4 shrink-0 text-brand" /> {p}
            </p>
          ))}
        </Panel>
        <Callout>{t('foundation.diag.estimateNote')}</Callout>
        <Button size="lg" className="w-full" onClick={() => setPhase('questions')}>
          {t('foundation.diag.start')}
        </Button>
      </div>
    );
  }

  if (phase === 'questions') {
    const item = DIAGNOSTIC_ITEMS[index];
    const last = index === DIAGNOSTIC_ITEMS.length - 1;
    return (
      <div className="mx-auto w-full max-w-2xl space-y-5 py-2">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" aria-label={t('foundation.diag.goToDashboard')}>
            <Link href="/ielts/foundation">
              <X />
            </Link>
          </Button>
          <div className="flex-1 space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{t(`foundation.areas.${item.area}`)}</span>
              <span className="tabular-nums">{t('foundation.diag.questionOf', { n: index + 1, total: DIAGNOSTIC_ITEMS.length })}</span>
            </div>
            <ProgressBar value={((index + 1) / DIAGNOSTIC_ITEMS.length) * 100} label={t('foundation.diag.introTitle')} size="sm" />
          </div>
        </div>

        {item.area === 'reading' && (
          <Panel variant="muted" className="space-y-2">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{t('foundation.diag.readText')}</p>
            <p className="font-semibold" lang="en">{DIAGNOSTIC_READING.title}</p>
            <p className="leading-7" lang="en">{DIAGNOSTIC_READING.text}</p>
          </Panel>
        )}
        {item.audio && <AudioButton key={item.id} text={item.audio} />}

        <Panel>
          <ExerciseView
            key={item.id}
            exercise={item}
            feedback={false}
            doneLabel={last ? t('foundation.diag.finish') : t('foundation.diag.next')}
            onDone={({ answer }) => {
              const all = { ...answers, [item.id]: answer };
              setAnswers(all);
              window.speechSynthesis?.cancel?.();
              if (!last) {
                setIndex((i) => i + 1);
                return;
              }
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { wrongTags, ...record } = scoreDiagnostic(all);
              update((p) => {
                // Every answer is recorded (wrong ones become mistakes with their concept) like any practice.
                let next: FoundationProgress = { ...p, diagnostic: record, introSeenAt: p.introSeenAt ?? record.completedAt };
                for (const it of DIAGNOSTIC_ITEMS) {
                  next = recordAnswer(next, { source: 'diagnostic', exercise: it, answer: all[it.id] ?? '', correct: Boolean(gradeExercise(it, all[it.id])), attempt: 1 });
                }
                return next;
              });
              setResult(record);
              setPhase('result');
              window.scrollTo({ top: 0 });
            }}
          />
        </Panel>
      </div>
    );
  }

  const record = result!;
  const { strong, weak } = diagnosticAreas(record);
  const skipped = new Set(record.skippedLessons ?? []);
  const start = record.startLessonId ? findLesson(record.startLessonId) : undefined;
  // The first lessons on the adaptive path.
  const path = start
    ? [...start.module.lessons.slice(start.index), ...(getModule('tenses')!.id !== start.module.id ? getModule('tenses')!.lessons : [])].filter((l) => !skipped.has(l.id)).slice(0, 3)
    : [];
  const focus = record.focusModules.map(getModule).filter((m) => m && m.level === 1 && m.lessons.length > 0).slice(0, 2);
  const weakNames = [...focus.map((m) => text(m!.title)), ...weak.map((a) => t(`foundation.areas.${a}`))].slice(0, 3);
  const strongNames = strong.map((a) => t(`foundation.areas.${a}`)).slice(0, 2);
  const and = t('foundation.mino.and');
  const minoText =
    record.level === 'strong' && start
      ? t('foundation.diag.minoStrong', { lesson: text(start.lesson.title) })
      : strongNames.length && weakNames.length
        ? t('foundation.diag.minoMixed', { strong: strongNames.join(and), weak: weakNames.join(and) })
        : t('foundation.diag.minoNeeds', { lesson: start ? text(start.lesson.title) : '' });

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 py-2">
      <Panel variant="brand" className="space-y-2 text-center">
        <p className="text-sm text-muted-foreground">{t('foundation.diag.resultTitle')}</p>
        <h1 className="text-2xl font-semibold">{t(`foundation.level.${record.level}`)}</h1>
        <p className="text-sm font-medium tabular-nums">{t('foundation.diag.percent', { n: record.percent })}</p>
      </Panel>

      <Panel className="space-y-4">
        {DIAGNOSTIC_AREAS.map((a) => (
          <div key={a} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>{t(`foundation.areas.${a}`)}</span>
              <span className="font-semibold tabular-nums">{record.areas[a]}%</span>
            </div>
            <ProgressBar value={record.areas[a]} label={t(`foundation.areas.${a}`)} tone={record.areas[a] < 50 ? 'warning' : 'brand'} size="sm" />
          </div>
        ))}
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2">
        <Panel className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">{t('foundation.diag.strongTitle')}</p>
          <div className="flex flex-wrap gap-2">
            {strongNames.length ? strongNames.map((n) => <StatusChip key={n} tone="success">{n}</StatusChip>) : <span className="text-sm text-muted-foreground">—</span>}
          </div>
        </Panel>
        <Panel className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">{t('foundation.diag.weakTitle')}</p>
          <div className="flex flex-wrap gap-2">
            {weakNames.length ? weakNames.map((n) => <StatusChip key={n} tone="warning">{n}</StatusChip>) : <span className="text-sm text-muted-foreground">—</span>}
          </div>
        </Panel>
      </div>

      <Panel variant="brand" className="flex gap-2.5">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
        <p>
          <span className="font-semibold">{t('foundation.diag.minoTitle')}: </span>
          {minoText}
        </p>
      </Panel>

      {path.length > 0 && (
        <div className="space-y-2">
          <p className="px-1 text-[15px] font-semibold text-muted-foreground">{t('foundation.diag.recommendedLessons')}</p>
          <ol className="divide-y rounded-2xl border bg-card">
            {path.map((l, i) => (
              <li key={l.id} className="flex items-center gap-3 px-4 py-3 text-[15px]">
                <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-semibold tabular-nums">{i + 1}</span>
                {text(l.title)}
              </li>
            ))}
          </ol>
          {skipped.size > 0 && <p className="px-1 text-sm text-muted-foreground">{t('foundation.diag.skippedNote', { n: skipped.size })}</p>}
        </div>
      )}

      <Callout>{t('foundation.diag.estimateNote')}</Callout>

      <div className="flex flex-col gap-2 sm:flex-row">
        {start && (
          <Button asChild size="lg" className="flex-1">
            <Link href={`/ielts/foundation/lesson/${start.lesson.id}`}>
              {t('foundation.diag.startLesson', { lesson: text(start.lesson.title) })} <ArrowRight />
            </Link>
          </Button>
        )}
        <Button asChild size="lg" variant="outline" className="flex-1">
          <Link href="/ielts/foundation">{t('foundation.diag.goToDashboard')}</Link>
        </Button>
      </div>
    </div>
  );
}

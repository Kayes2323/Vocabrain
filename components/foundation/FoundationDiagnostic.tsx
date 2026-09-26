'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, Panel, ProgressBar, ScreenSkeleton, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  addErrors, DIAGNOSTIC_AREAS, DIAGNOSTIC_ITEMS, DIAGNOSTIC_READING, getModule, recommendedModule, scoreDiagnostic,
} from '@/lib/foundation';
import type { FoundationDiagnosticRecord } from '@/lib/models';
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
              const { wrongTags, ...record } = scoreDiagnostic(all);
              update((p) => ({ ...p, diagnostic: record, introSeenAt: p.introSeenAt ?? record.completedAt, errors: addErrors(p.errors, wrongTags, record.completedAt) }));
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
  const rec = recommendedModule({ ...fp, diagnostic: record });
  const focus = record.focusModules.map(getModule).filter((m) => m && m.level === 1).slice(0, 4);
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 py-2">
      <Panel variant="brand" className="space-y-2 text-center">
        <p className="text-sm text-muted-foreground">{t('foundation.diag.resultTitle')}</p>
        <h1 className="text-2xl font-semibold">{t(`foundation.level.${record.level}`)}</h1>
        <p className="text-sm font-medium tabular-nums">{t('foundation.diag.percent', { n: record.percent })}</p>
        <p className="text-sm text-muted-foreground">{t(`foundation.levelBody.${record.level}`)}</p>
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

      {focus.length > 0 && (
        <div className="space-y-2">
          <p className="px-1 text-[15px] font-semibold text-muted-foreground">{t('foundation.focusTitle')}</p>
          <div className="flex flex-wrap gap-2">
            {focus.map((m) => (
              <StatusChip key={m!.id} tone="warning">{text(m!.title)}</StatusChip>
            ))}
          </div>
        </div>
      )}

      <Callout>{t('foundation.diag.estimateNote')}</Callout>

      <div className="flex flex-col gap-2 sm:flex-row">
        {rec && (
          <Button asChild size="lg" className="flex-1">
            <Link href={`/ielts/foundation/${rec.id}`}>
              {t('foundation.diag.startModule', { module: text(rec.title) })} <ArrowRight />
            </Link>
          </Button>
        )}
        {record.level === 'strong' && !rec && (
          <Button asChild size="lg" className="flex-1">
            <Link href="/ielts/tests">
              {t('tests.libraryTitle')} <ArrowRight />
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

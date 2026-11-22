'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Clock, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Callout, Panel, Section, StatusChip } from '@/components/ds';
import { cn } from '@/lib/utils';
import { EXAM_CONTENT } from '@/lib/writing-studio/content';
import { checkEssay, type EssayFeedback } from '@/lib/writing-studio/feedback';
import type { ExamMode } from '@/lib/writing-studio/types';
import { FeedbackPanel } from './FeedbackPanel';
import { WSChart } from './WSChart';
import { CHART_DATASETS } from '@/lib/writing-studio/charts';

function formatClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * Exam Simulation Mode (spec §10): a separate, full-screen, distraction-free
 * layout. No trainer messages or hints while the clock is running — exactly
 * the discipline of the real test — then a structured evaluation report
 * once time is up or the student submits.
 */
export function ExamShell({ mode }: { mode: ExamMode }) {
  const tasks = mode === 'full' ? [EXAM_CONTENT.task1, EXAM_CONTENT.task2] : [EXAM_CONTENT[mode]];
  const totalMinutes = tasks.reduce((n, t) => n + t.minutes, 0);
  const [taskIndex, setTaskIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(Object.fromEntries(tasks.map((t) => [t.task, ''])));
  const [remaining, setRemaining] = useState(totalMinutes * 60);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, EssayFeedback> | null>(null);
  const latest = useRef(answers);
  latest.current = answers;

  const finish = () => {
    const out: Record<string, EssayFeedback> = {};
    tasks.forEach((t) => { out[t.task] = checkEssay(latest.current[t.task] ?? '', t.minWords, t.task, 'full'); });
    setResults(out);
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) return;
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(id);
          finish();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  if (submitted && results) {
    const overall = tasks.length > 1 ? (results[tasks[0].task].indicativeBand + results[tasks[1].task].indicativeBand) / 2 : results[tasks[0].task].indicativeBand;
    return (
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
        <header className="space-y-1.5 text-center">
          <p className="text-sm text-muted-foreground">Exam Simulation · {mode === 'full' ? 'Full Writing test (60 min)' : tasks[0].title}</p>
          <h1 className="text-3xl font-semibold">Indicative estimate: {Math.round(overall * 2) / 2}</h1>
          <p className="text-sm text-muted-foreground">Unofficial and indicative — a practice tool, not a real examiner's score.</p>
        </header>
        {tasks.map((t) => (
          <Section key={t.task} title={t.title} variant="label">
            <FeedbackPanel feedback={results[t.task]} onRetry={() => { setSubmitted(false); setRemaining(totalMinutes * 60); }} />
          </Section>
        ))}
        <Button asChild variant="outline" className="w-full">
          <Link href="/ielts/writing-studio">
            <RotateCcw /> Back to the Writing Studio
          </Link>
        </Button>
      </div>
    );
  }

  const task = tasks[taskIndex];
  const chart = task.chartId ? CHART_DATASETS[task.chartId] : undefined;
  const words = (answers[task.task] ?? '').trim().match(/\S+/g)?.length ?? 0;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3 sm:px-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Exam Simulation · {task.title}</p>
          <p className="truncate text-xs text-muted-foreground">Prototype mock — not an official IELTS test.</p>
        </div>
        <div
          role="timer"
          aria-label="Time remaining"
          className={cn(
            'flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold tabular-nums',
            remaining < 120 && 'border-destructive text-destructive',
          )}
        >
          <Clock className="size-4" /> {formatClock(remaining)}
        </div>
        <Button size="sm" onClick={finish}>Submit</Button>
      </header>

      {tasks.length > 1 && (
        <div className="flex shrink-0 gap-1 border-b p-1.5">
          {tasks.map((t, i) => (
            <button
              key={t.task}
              onClick={() => setTaskIndex(i)}
              className={cn('flex-1 rounded-md py-1.5 text-sm font-medium', taskIndex === i ? 'bg-muted' : 'text-muted-foreground')}
            >
              {t.title}
            </button>
          ))}
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto lg:grid lg:grid-cols-2 lg:divide-x lg:overflow-hidden">
        <article className="space-y-4 px-4 py-6 sm:px-8 lg:overflow-y-auto">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{task.title} · {task.minutes} minutes</p>
          <p className="leading-7 whitespace-pre-line" lang="en">{task.instructions}</p>
          <p className="leading-7 whitespace-pre-line" lang="en">{task.prompt}</p>
          {chart && (
            <Panel className="space-y-2">
              <p className="text-sm font-medium">{chart.title}</p>
              <WSChart dataset={chart} height={220} />
            </Panel>
          )}
          <StatusChip>Minimum {task.minWords} words</StatusChip>
        </article>
        <div className="flex min-h-[60vh] flex-col px-4 pb-4 sm:px-8 lg:min-h-0 lg:py-6">
          <label htmlFor="exam-answer" className="sr-only">Your answer</label>
          <div className="mb-2 flex justify-end">
            <StatusChip tone={words >= task.minWords ? 'success' : 'neutral'}>{words} words</StatusChip>
          </div>
          <Textarea
            id="exam-answer"
            lang="en"
            spellCheck={false}
            value={answers[task.task] ?? ''}
            onChange={(e) => setAnswers((a) => ({ ...a, [task.task]: e.target.value }))}
            placeholder="Write your answer here…"
            className="min-h-0 flex-1 resize-none rounded-xl border bg-card p-4 text-[15px] leading-7"
          />
        </div>
      </div>

      <Callout tone="neutral" icon={Sparkles} className="m-3 shrink-0 rounded-xl">
        Exam mode gives no hints or live correction, exactly like the real test. Your report appears once you submit or time runs out.
      </Callout>
    </div>
  );
}

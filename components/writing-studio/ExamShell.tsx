'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Clock, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Callout, Panel, Section, StatusChip } from '@/components/ds';
import { MinoMark } from '@/components/shell/MinoMark';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { writingStudioFeedback } from '@/lib/ai/client';
import { writingOverall } from '@/lib/ielts';
import { cn } from '@/lib/utils';
import { CHART_DATASETS, chartToTable } from '@/lib/writing-studio/charts';
import { EXAM_CONTENT } from '@/lib/writing-studio/content';
import { checkEssay, fromAI, fromLocal, type UnifiedFeedback } from '@/lib/writing-studio/feedback';
import { recordExam, recordMistakes } from '@/lib/writing-studio/progress';
import type { ExamMode } from '@/lib/writing-studio/types';
import { FeedbackPanel } from './FeedbackPanel';
import { WSChart } from './WSChart';

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
  const { locale } = useLocale();
  const { updateProfile } = useProfile();
  const tasks = mode === 'full' ? [EXAM_CONTENT.task1, EXAM_CONTENT.task2] : [EXAM_CONTENT[mode]];
  const totalMinutes = tasks.reduce((n, t) => n + t.minutes, 0);
  const [taskIndex, setTaskIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(Object.fromEntries(tasks.map((t) => [t.task, ''])));
  const [remaining, setRemaining] = useState(totalMinutes * 60);
  const [assessing, setAssessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, UnifiedFeedback> | null>(null);
  const latest = useRef(answers);
  latest.current = answers;
  const finishing = useRef(false);

  const finish = async () => {
    if (finishing.current) return;
    finishing.current = true;
    setAssessing(true);
    const out: Record<string, UnifiedFeedback> = {};
    await Promise.all(
      tasks.map(async (t) => {
        const text = latest.current[t.task] ?? '';
        const local = checkEssay(text, t.minWords, t.task, 'full');
        const taskNum: 1 | 2 = t.task === 'task1' ? 1 : 2;
        const chart = t.chartId ? CHART_DATASETS[t.chartId] : undefined;
        const res = await writingStudioFeedback(
          { task: taskNum, prompt: `${t.instructions} ${t.prompt}`, minWords: t.minWords, chart: chart ? chartToTable(chart) : undefined },
          text,
          locale === 'bn' ? 'bn' : 'en',
        );
        out[t.task] = res.ok ? fromAI(res.feedback, local.wordCount, t.minWords) : fromLocal(local, res.error);
      }),
    );
    setResults(out);
    setAssessing(false);
    setSubmitted(true);

    const t1 = mode !== 'task2' ? out[EXAM_CONTENT.task1.task]?.band ?? null : null;
    const t2 = mode !== 'task1' ? out[EXAM_CONTENT.task2.task]?.band ?? null : null;
    const overall = mode === 'full' ? writingOverall(t1, t2) : (t1 ?? t2);
    updateProfile((p) => {
      let next = recordExam(p.writingStudio, mode, t1, t2, overall ?? null);
      tasks.forEach((t) => {
        const taskNum: 1 | 2 = t.task === 'task1' ? 1 : 2;
        const r = out[t.task];
        const weakest = r.criteria?.slice().sort((a, b) => (a.band ?? 9) - (b.band ?? 9))[0]?.criterion;
        next = recordMistakes(
          next,
          taskNum,
          r.source,
          r.mistakes.map((m) => ({ category: m.category ?? weakest ?? 'General', quote: m.quote, fix: m.fix, why: m.why })),
        );
      });
      return { ...p, writingStudio: next };
    });
  };

  useEffect(() => {
    if (submitted || assessing) return;
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(id);
          void finish();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, assessing]);

  if (assessing) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-24 text-center">
        <MinoMark size="xl" thinking />
        <p className="font-medium">Mino is assessing your {tasks.length > 1 ? 'answers' : 'answer'}…</p>
        <p className="text-sm text-muted-foreground">This usually takes under a minute.</p>
      </div>
    );
  }

  if (submitted && results) {
    const t1 = mode !== 'task2' ? results[EXAM_CONTENT.task1.task]?.band ?? null : null;
    const t2 = mode !== 'task1' ? results[EXAM_CONTENT.task2.task]?.band ?? null : null;
    const overall = mode === 'full' ? writingOverall(t1, t2) : (t1 ?? t2);
    return (
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
        <header className="space-y-1.5 text-center">
          <p className="text-sm text-muted-foreground">Exam Simulation · {mode === 'full' ? 'Full Writing test (60 min)' : tasks[0].title}</p>
          <h1 className="text-3xl font-semibold">Indicative estimate: {overall !== null ? overall.toFixed(1) : '—'}</h1>
          <p className="text-sm text-muted-foreground">Unofficial and indicative — a practice tool, not a real examiner's score.</p>
        </header>
        {tasks.map((t) => (
          <Section key={t.task} title={t.title} variant="label">
            <FeedbackPanel
              feedback={results[t.task]}
              onRetry={() => {
                setSubmitted(false);
                setRemaining(totalMinutes * 60);
                finishing.current = false;
              }}
            />
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

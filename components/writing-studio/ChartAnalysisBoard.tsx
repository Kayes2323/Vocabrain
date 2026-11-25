'use client';

import { useRef, useState } from 'react';
import { Check, ChevronRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Panel, StatusChip } from '@/components/ds';
import { cn } from '@/lib/utils';
import { revealTask } from '@/lib/writing-studio/chart-board';
import { localize, type ChartBoardTask, type ChartDataset } from '@/lib/writing-studio/types';
import { WSChart } from './WSChart';

const CHROME = {
  en: {
    answerPlaceholder: 'Answer in your own words…',
    checkMyAnswer: 'Check my answer',
    modelAnswer: 'Model answer:',
    belongsIn: (part: React.ReactNode) => (
      <>
        This belongs in the <span>{part}</span>, not the other way round.
      </>
    ),
    introduction: 'introduction',
    overview: 'overview',
    body: 'body paragraphs',
    done: "You've read the chart properly. Time to turn this into English.",
  },
  bn: {
    answerPlaceholder: 'নিজের ভাষায় উত্তর দাও…',
    checkMyAnswer: 'আমার উত্তর চেক করো',
    modelAnswer: 'Model answer:',
    belongsIn: (part: React.ReactNode) => (
      <>
        এটা <span>{part}</span>-এ থাকা উচিত, উল্টোটা না।
      </>
    ),
    introduction: 'introduction',
    overview: 'overview',
    body: 'body paragraph',
    done: 'তুমি chart-টা ঠিকভাবে পড়ে ফেলেছ। এবার এটাকে English-এ রূপান্তর করার পালা।',
  },
} as const;

/**
 * Task 1's flagship interactive feature (spec §6, "Visual Analysis Board").
 * The student answers a sequence of chart-reading questions in their own
 * words, checks each one against a model answer, and tags whether the
 * feature belongs in the overview or a body paragraph — before writing a
 * single sentence of the response itself.
 */
export function ChartAnalysisBoard({
  dataset,
  tasks,
  locale = 'en',
  onComplete,
  compact,
}: {
  dataset: ChartDataset;
  tasks: ChartBoardTask[];
  locale?: 'en' | 'bn';
  /** Called exactly once, when the last previously-unchecked task is revealed. */
  onComplete?: () => void;
  /** Used when embedded inside a lesson step, to keep the board shorter. */
  compact?: boolean;
}) {
  const c = CHROME[locale];
  const ordered = [...tasks].sort((a, b) => a.order - b.order);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const checkedCount = Object.keys(revealed).length;
  const allDone = checkedCount >= ordered.length;

  // Mirrors `revealed` synchronously so a fast double-click on the last task cannot
  // read stale state and report completion twice.
  const revealedRef = useRef<Record<string, boolean>>({});

  const reveal = (id: string) => {
    // onComplete sets state in the parent (LessonRunner), so it must run in the event
    // handler, not inside a setState updater — React warns about updating another
    // component while rendering, and (in StrictMode) the updater can run twice.
    const { next, completedNow } = revealTask(revealedRef.current, id, ordered.length);
    if (next === revealedRef.current) return;
    revealedRef.current = next;
    setRevealed(next);
    if (completedNow) onComplete?.();
  };

  return (
    <div className="space-y-4">
      <Panel className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold">{dataset.title}</p>
            <p className="text-xs text-muted-foreground">{dataset.unit}</p>
          </div>
          <StatusChip tone={allDone ? 'success' : 'neutral'}>
            {checkedCount}/{ordered.length} checked
          </StatusChip>
        </div>
        <WSChart dataset={dataset} height={compact ? 200 : 260} />
        {dataset.note && <p className="text-xs text-muted-foreground">{dataset.note}</p>}
      </Panel>

      <div className="space-y-3">
        {ordered.map((task, i) => {
          const isRevealed = !!revealed[task.id];
          const value = answers[task.id] ?? '';
          const prevRevealed = i === 0 || !!revealed[ordered[i - 1].id];
          return (
            <Panel key={task.id} className={cn('space-y-2.5', !prevRevealed && 'opacity-50')}>
              <div className="flex items-center gap-2">
                <span className={cn('flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold', isRevealed ? 'bg-success-soft text-success' : 'bg-muted text-muted-foreground')}>
                  {isRevealed ? <Check className="size-3.5" /> : i + 1}
                </span>
                <p className="text-sm font-medium">{localize(locale, task.prompt)}</p>
              </div>
              {prevRevealed && (
                <>
                  <Textarea
                    rows={2}
                    value={value}
                    disabled={isRevealed}
                    onChange={(e) => setAnswers((a) => ({ ...a, [task.id]: e.target.value }))}
                    placeholder={c.answerPlaceholder}
                    className="rounded-lg bg-card text-sm"
                    lang="en"
                  />
                  {!isRevealed ? (
                    <Button size="sm" variant="outline" onClick={() => reveal(task.id)} disabled={value.trim().length < 2}>
                      <Eye /> {c.checkMyAnswer}
                    </Button>
                  ) : (
                    <div className="space-y-1.5 rounded-lg bg-muted/50 p-3 text-sm">
                      <p>
                        <span className="font-medium">{c.modelAnswer}</span> <span lang="en">{task.modelAnswer}</span>
                      </p>
                      <p className="text-muted-foreground">
                        {c.belongsIn(
                          <span className={cn('font-medium', task.belongsIn === 'body' ? 'text-tint-green-fg' : 'text-brand')}>
                            {task.belongsIn === 'introduction' ? c.introduction : task.belongsIn === 'overview' ? c.overview : c.body}
                          </span>,
                        )}
                      </p>
                    </div>
                  )}
                </>
              )}
            </Panel>
          );
        })}
      </div>

      {allDone && (
        <Panel variant="brand" className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium">{c.done}</p>
          <ChevronRight className="size-4 shrink-0 text-brand" aria-hidden />
        </Panel>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Check, ChevronRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Panel, StatusChip } from '@/components/ds';
import { cn } from '@/lib/utils';
import type { ChartBoardTask, ChartDataset } from '@/lib/writing-studio/types';
import { WSChart } from './WSChart';

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
  onComplete,
  compact,
}: {
  dataset: ChartDataset;
  tasks: ChartBoardTask[];
  /** Called once every task has been checked at least once. */
  onComplete?: () => void;
  /** Used when embedded inside a lesson step, to keep the board shorter. */
  compact?: boolean;
}) {
  const ordered = [...tasks].sort((a, b) => a.order - b.order);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const checkedCount = Object.keys(revealed).length;
  const allDone = checkedCount >= ordered.length;

  const reveal = (id: string) => {
    // onComplete sets state in the parent (LessonRunner), so it must run in the event
    // handler, not inside a setState updater — React warns about updating another
    // component while rendering, and (in StrictMode) the updater can run twice.
    const next = { ...revealed, [id]: true };
    setRevealed(next);
    if (Object.keys(next).length >= ordered.length) onComplete?.();
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
                <p className="text-sm font-medium">{task.prompt}</p>
              </div>
              {prevRevealed && (
                <>
                  <Textarea
                    rows={2}
                    value={value}
                    disabled={isRevealed}
                    onChange={(e) => setAnswers((a) => ({ ...a, [task.id]: e.target.value }))}
                    placeholder="Answer in your own words…"
                    className="rounded-lg bg-card text-sm"
                    lang="en"
                  />
                  {!isRevealed ? (
                    <Button size="sm" variant="outline" onClick={() => reveal(task.id)} disabled={value.trim().length < 2}>
                      <Eye /> Check my answer
                    </Button>
                  ) : (
                    <div className="space-y-1.5 rounded-lg bg-muted/50 p-3 text-sm">
                      <p>
                        <span className="font-medium">Model answer:</span> <span lang="en">{task.modelAnswer}</span>
                      </p>
                      <p className="text-muted-foreground">
                        This belongs in the{' '}
                        <span className={cn('font-medium', task.belongsIn === 'overview' ? 'text-brand' : 'text-tint-green-fg')}>
                          {task.belongsIn === 'overview' ? 'overview' : 'body paragraphs'}
                        </span>
                        , not the other way round.
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
          <p className="text-sm font-medium">You've read the chart properly. Time to turn this into English.</p>
          <ChevronRight className="size-4 shrink-0 text-brand" aria-hidden />
        </Panel>
      )}
    </div>
  );
}

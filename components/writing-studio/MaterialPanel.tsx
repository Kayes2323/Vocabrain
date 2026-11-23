import { Check, X } from 'lucide-react';
import { Panel, Section } from '@/components/ds';
import type { MaterialBlock } from '@/lib/writing-studio/types';
import { ChartAnalysisBoard } from './ChartAnalysisBoard';
import { EvaluatedWriteBoard } from './EvaluatedWriteBoard';
import { IdeaDevelopmentBoard } from './IdeaDevelopmentBoard';

/**
 * Zone B — the Learning Material Zone. Picks the right presentation for the
 * current step's content rather than forcing everything into one layout
 * (spec §5B).
 */
export function MaterialPanel({
  block,
  onBoardComplete,
  lessonId,
  objective,
}: {
  block: MaterialBlock;
  onBoardComplete?: () => void;
  /** Lesson context passed to Mino when it evaluates the learner's writing. */
  lessonId?: string;
  objective?: string;
}) {
  switch (block.type) {
    case 'text':
      return (
        <div className="space-y-3">
          {block.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-foreground/90">
              {p}
            </p>
          ))}
        </div>
      );

    case 'examples':
      return (
        <div className="space-y-3">
          <Panel className="space-y-2 border-success/30 bg-success-soft/50 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-success uppercase">
              <Check className="size-3.5" /> Good example
            </p>
            <p className="text-[15px] leading-relaxed" lang="en">{block.good}</p>
          </Panel>
          <Panel className="space-y-2 border-destructive/30 bg-destructive-soft/50 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-destructive uppercase">
              <X className="size-3.5" /> Weak example
            </p>
            <p className="text-[15px] leading-relaxed" lang="en">{block.weak}</p>
          </Panel>
          {block.note && <p className="text-sm text-muted-foreground">{block.note}</p>}
        </div>
      );

    case 'vocab':
      return (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {block.items.map((item) => (
            <Panel key={item.phrase} className="space-y-1 p-3.5">
              <p className="font-medium" lang="en">{item.phrase}</p>
              <p className="text-sm text-muted-foreground">{item.use}</p>
            </Panel>
          ))}
        </div>
      );

    case 'chart-board':
      return (
        <Section title="Visual Analysis Board" variant="label">
          <ChartAnalysisBoard dataset={block.dataset} tasks={block.tasks} onComplete={onBoardComplete} compact />
        </Section>
      );

    case 'idea-board':
      return (
        <Section title="Idea Development Trainer" variant="label">
          <IdeaDevelopmentBoard question={block.question} onComplete={onBoardComplete} lessonId={lessonId} objective={objective} />
        </Section>
      );

    case 'write-evaluate':
      return (
        <Section title="Write it — Mino checks it" variant="label">
          <EvaluatedWriteBoard block={block} lessonId={lessonId} objective={objective} onEvaluated={onBoardComplete} />
        </Section>
      );
  }
}

'use client';

import { Callout, PageHeader } from '@/components/ds';
import { ChartAnalysisBoard } from '@/components/writing-studio/ChartAnalysisBoard';
import { useProfile } from '@/components/providers/ProfileProvider';
import { CHART_DATASETS } from '@/lib/writing-studio/charts';
import { overviewWritingLesson } from '@/lib/writing-studio/lessons/overview-writing';
import { recordPractice } from '@/lib/writing-studio/progress';

const material = overviewWritingLesson.steps.find((s) => s.material?.type === 'chart-board')!.material!;
const board = material.type === 'chart-board' ? material : undefined;

/**
 * Task 1's Visual Analysis Board as its own screen (spec §18 item 5),
 * reachable directly from Practice Mode or the Visual-Specific Training
 * grid, and reusing the exact same component the Overview lesson embeds.
 * Completing it records a real practice session on the student's profile.
 */
export default function ChartAnalysisBoardPage() {
  const { updateProfile } = useProfile();
  const onComplete = () => updateProfile((p) => ({ ...p, writingStudio: recordPractice(p.writingStudio, 1, 'chart-board') }));
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="Visual Analysis Board"
        subtitle="Understand the chart before you write a single sentence."
        backHref="/ielts/writing-studio/task1"
        backLabel="Task 1"
      />
      <Callout tone="neutral">
        Work through each question in your own words, then check it against the model answer. Each one is tagged for
        whether it belongs in your overview or in a body paragraph.
      </Callout>
      {board ? (
        <ChartAnalysisBoard dataset={board.dataset} tasks={board.tasks} onComplete={onComplete} />
      ) : (
        <ChartAnalysisBoard dataset={CHART_DATASETS['renewable-electricity']} tasks={[]} onComplete={onComplete} />
      )}
    </div>
  );
}

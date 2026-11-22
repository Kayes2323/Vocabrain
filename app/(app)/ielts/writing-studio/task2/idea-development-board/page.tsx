import { Callout, PageHeader } from '@/components/ds';
import { IdeaDevelopmentBoard } from '@/components/writing-studio/IdeaDevelopmentBoard';
import { ideaDevelopmentLesson } from '@/lib/writing-studio/lessons/idea-development';

const material = ideaDevelopmentLesson.steps.find((s) => s.material?.type === 'idea-board')!.material!;
const question = material.type === 'idea-board' ? material.question : undefined;

/**
 * Task 2's Idea Development Trainer as its own screen (spec §18 item 7),
 * reusing the exact same component the lesson embeds.
 */
export default function IdeaDevelopmentBoardPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="Idea Development Trainer"
        subtitle="Build one argument fully, one question at a time."
        backHref="/ielts/writing-studio/task2"
        backLabel="Task 2 Academy"
      />
      <Callout tone="neutral">
        Mino never writes the paragraph for you — only the next question. If an answer repeats the one before it, you'll
        be asked to go deeper instead.
      </Callout>
      {question && <IdeaDevelopmentBoard question={question} />}
    </div>
  );
}

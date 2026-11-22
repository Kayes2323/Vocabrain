import { BadgeCheck, FileText, Layers } from 'lucide-react';
import { Callout, ListRow, PageHeader, RowGroup, Section } from '@/components/ds';

/** Exam Simulation Mode picker (spec §9 Mode 3, §10). */
export default function ExamPickerPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 pt-safe-top pb-10 md:px-8 md:pt-10">
      <PageHeader title="Exam Simulation" subtitle="A distraction-free, timed Writing test." backHref="/ielts/writing-studio" backLabel="Writing Studio" />
      <Callout tone="neutral">
        No hints, no trainer messages and no live correction while the clock runs — exactly like the real test. You'll get
        a structured, indicative report once you submit.
      </Callout>
      <Section title="Choose a mode" variant="label">
        <RowGroup>
          <ListRow href="/ielts/writing-studio/exam/task1" icon={FileText} iconTone="brand" title="Task 1 only" description="20 minutes · at least 150 words" />
          <ListRow href="/ielts/writing-studio/exam/task2" icon={Layers} iconTone="brand" title="Task 2 only" description="40 minutes · at least 250 words" />
          <ListRow href="/ielts/writing-studio/exam/full" icon={BadgeCheck} iconTone="brand" title="Full Writing test" description="60 minutes · both tasks, switch freely" />
        </RowGroup>
      </Section>
    </div>
  );
}

import Link from 'next/link';
import { ArrowRight, ClipboardList, GraduationCap, RotateCcw, Sparkles, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardGrid, ModuleCard, PageHeader, Panel, ProgressBar, Section, StatusChip } from '@/components/ds';
import { MinoMark } from '@/components/shell/MinoMark';
import { ACADEMY_STATS, MISTAKE_CATEGORIES, TASK1_MODULES, TASK2_MODULES } from '@/lib/writing-studio/content';
import { getLesson } from '@/lib/writing-studio/lessons';
import { LevelBadge } from '@/components/writing-studio/LevelBadge';

/** Mino Writing Studio — Dashboard (spec §4). A proper home screen, not a chat window. */
export default function WritingStudioDashboard() {
  const task1 = ACADEMY_STATS.task1;
  const task2 = ACADEMY_STATS.task2;
  const totalLessons = task1.lessonsCompleted + task2.lessonsCompleted;
  const totalPractice = task1.practiceSessions + task2.practiceSessions;
  const topMistakes = [...MISTAKE_CATEGORIES].sort((a, b) => b.occurrences - a.occurrences).slice(0, 3);

  const lastLesson = getLesson('overview-writing')!;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader title="Mino Writing Studio" subtitle="Learn to Write. Don't Just Get Corrected." backHref="/ielts" backLabel="IELTS" />

      <Panel variant="brand" className="space-y-3">
        <div className="flex items-start gap-3">
          <MinoMark size="lg" alive />
          <div className="space-y-1">
            <p className="font-semibold">Welcome back</p>
            <p className="text-[15px] text-foreground/90">
              You're building steady habits in both tasks. Today, let's keep working on turning a chart into a focused
              overview — it's the single biggest Task 1 score-changer for where you are now.
            </p>
          </div>
        </div>
      </Panel>

      <Section title="Continue learning" variant="label">
        <Panel className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Task 1 Academy · Overview Mastery</p>
            <p className="font-semibold">{lastLesson.title}</p>
            <ProgressBar value={20} label="Overview Mastery module progress" size="sm" className="mt-1 max-w-56" />
          </div>
          <Button asChild className="shrink-0">
            <Link href="/ielts/writing-studio/task1/lesson/overview-writing">
              Continue lesson <ArrowRight />
            </Link>
          </Button>
        </Panel>
      </Section>

      <Section title="Choose your Academy" variant="label">
        <div className="grid gap-3 sm:grid-cols-2">
          <Panel className="space-y-3">
            <div>
              <p className="font-semibold">Writing Task 1</p>
              <p className="text-sm text-muted-foreground">Learn to analyse and describe visual information.</p>
            </div>
            <ProgressBar value={(task1.lessonsCompleted / task1.lessonsTotal) * 100} label="Task 1 progress" size="sm" />
            <p className="text-xs text-muted-foreground">{task1.lessonsCompleted}/{task1.lessonsTotal} lessons · {TASK1_MODULES.length} modules</p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/ielts/writing-studio/task1">Open Task 1 Academy</Link>
            </Button>
          </Panel>
          <Panel className="space-y-3">
            <div>
              <p className="font-semibold">Writing Task 2</p>
              <p className="text-sm text-muted-foreground">Learn to develop ideas, construct arguments, and write essays.</p>
            </div>
            <ProgressBar value={(task2.lessonsCompleted / task2.lessonsTotal) * 100} label="Task 2 progress" size="sm" />
            <p className="text-xs text-muted-foreground">{task2.lessonsCompleted}/{task2.lessonsTotal} lessons · {TASK2_MODULES.length} modules</p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/ielts/writing-studio/task2">Open Task 2 Academy</Link>
            </Button>
          </Panel>
        </div>
      </Section>

      <Section title="Training modes" variant="label">
        <CardGrid>
          <ModuleCard href="/ielts/writing-studio/task1/lesson/overview-writing" icon={GraduationCap} tint="lavender" title="Learn Mode" subtitle="Step-by-step teaching from Mino." wrapSubtitle />
          <ModuleCard href="/ielts/writing-studio/task1/chart-analysis-board" icon={ClipboardList} tint="green" title="Practice Mode" subtitle="Answer, get feedback, retry." wrapSubtitle />
          <ModuleCard href="/ielts/writing-studio/exam" icon={Timer} tint="yellow" title="Exam Simulation" subtitle="Timed, distraction-free practice." wrapSubtitle />
          <ModuleCard href="/ielts/writing-studio/progress" icon={RotateCcw} tint="neutral" title="Mistake Revision" subtitle="Practice built from your errors." wrapSubtitle />
        </CardGrid>
      </Section>

      <Section title="Your progress" variant="label" action={<Link href="/ielts/writing-studio/progress" className="text-sm font-medium text-brand">See all</Link>}>
        <Panel className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-semibold tabular-nums">{totalLessons}</p>
              <p className="text-xs text-muted-foreground">Lessons done</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums">{totalPractice}</p>
              <p className="text-xs text-muted-foreground">Practice sessions</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums">{task1.mockTestsTaken + task2.mockTestsTaken}</p>
              <p className="text-xs text-muted-foreground">Mock tests taken</p>
            </div>
          </div>
          <div className="space-y-1.5 border-t pt-3">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Recurring mistakes to watch</p>
            <div className="flex flex-wrap gap-1.5">
              {topMistakes.map((m) => (
                <StatusChip key={m.id} tone="warning">{m.label} · {m.occurrences}×</StatusChip>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between border-t pt-3">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Independence level</p>
            <LevelBadge level={task1.currentLevel} />
          </div>
        </Panel>
      </Section>

      <Panel className="flex items-start gap-2.5 text-sm text-muted-foreground">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-brand" />
        <p>
          This Studio is a prototype under review. Stats and some content here use realistic sample data rather than your
          real history, and feedback is a local practice check, not an official IELTS assessment.
        </p>
      </Panel>
    </div>
  );
}

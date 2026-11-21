import Link from 'next/link';
import { ArrowLeft, ArrowRight, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, PageHeader, Panel } from '@/components/ds';
import { MinoMark } from '@/components/shell/MinoMark';

/**
 * Shown for a module/lesson listed in the curriculum that has not been
 * fully authored for this prototype yet. It is a real, working screen (not
 * a dead link): it explains what the finished lesson will cover and sends
 * the reviewer to the one lesson per Academy that is fully built, so every
 * control still does something meaningful (spec §17).
 */
export function LessonPreview({
  title,
  objective,
  academyHref,
  academyLabel,
  builtLessonHref,
  builtLessonLabel,
}: {
  title: string;
  objective: string;
  academyHref: string;
  academyLabel: string;
  builtLessonHref: string;
  builtLessonLabel: string;
}) {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <PageHeader title={title} backHref={academyHref} backLabel={academyLabel} />
      <Panel className="space-y-3">
        <div className="flex items-center gap-2.5">
          <MinoMark size="sm" />
          <p className="text-sm font-medium text-muted-foreground">What this lesson will teach</p>
        </div>
        <p className="text-[15px] leading-relaxed">{objective}</p>
      </Panel>
      <Callout tone="neutral" icon={Construction} title="Content preview — not fully built yet">
        This lesson is a placeholder for the prototype review. In the finished Studio it will follow the same
        Learn → Practice → Feedback flow as the lesson below, with its own material and exercises.
      </Callout>
      <Button asChild className="w-full">
        <Link href={builtLessonHref}>
          Try the full lesson flow: {builtLessonLabel} <ArrowRight />
        </Link>
      </Button>
      <Button asChild variant="ghost" className="w-full">
        <Link href={academyHref}>
          <ArrowLeft /> Back to the Academy
        </Link>
      </Button>
    </div>
  );
}

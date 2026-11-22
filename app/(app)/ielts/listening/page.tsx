'use client';

import Link from 'next/link';
import { Headphones, PlayCircle } from 'lucide-react';
import { CardGrid, Callout, ListRow, ModuleCard, PageHeader, Panel, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { Button } from '@/components/ui/button';
import { LISTENING_MODULES, MASTERY_CRITERIA, findErrorTag } from '@/lib/listening';
import { useListening } from '@/components/listening/useListening';

const MASTERY_LABEL: Record<string, string> = {
  foundation: 'Foundation',
  recognition: 'Recognition',
  comprehension: 'Comprehension',
  'complex-listening': 'Complex Listening',
  'ielts-performance': 'IELTS Performance',
};

/**
 * Mino Listening home — the Personal Trainer dashboard (brief §10). Answers
 * the six questions directly, every number read from real `profile.listening`
 * data. A first-time learner with no history gets the sensible default
 * (start Sound Gym's first lesson), never a fabricated "personalised" pick.
 */
export default function ListeningHome() {
  const { recommended, resume, weak, errors, mastery, lessonsDone, minutesPracticed, progress } = useListening();
  if (!progress) return <ScreenSkeleton />;

  const resumeLesson = resume ? LISTENING_MODULES.flatMap((m) => m.lessons).find((l) => l.id === resume.lessonId) : undefined;

  return (
    <div className="space-y-8">
      <PageHeader title="Mino Listening" subtitle="Your personal listening trainer. Diagnose, train, practise, transfer to IELTS." backHref="/ielts" backLabel="IELTS" />

      {resumeLesson && resume && (
        <Panel variant="brand" className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">Continue learning</p>
            <p className="mt-1 font-medium">{resumeLesson.code} · {resumeLesson.title.en}</p>
          </div>
          <Button asChild variant="brand">
            <Link href={`/ielts/listening/lesson/${resumeLesson.id}`}>
              <PlayCircle className="size-4" aria-hidden /> Resume
            </Link>
          </Button>
        </Panel>
      )}

      {!resumeLesson && (
        <Panel variant="brand" className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">Recommended next</p>
            <p className="mt-1 font-medium">
              {recommended?.lesson ? `${recommended.lesson.code} · ${recommended.lesson.title.en}` : `${recommended?.module.title.en} (content in development)`}
            </p>
          </div>
          {recommended?.lesson && (
            <Button asChild variant="brand">
              <Link href={`/ielts/listening/lesson/${recommended.lesson.id}`}>
                <PlayCircle className="size-4" aria-hidden /> Start
              </Link>
            </Button>
          )}
        </Panel>
      )}

      <Section title="Your level" variant="label">
        <Panel>
          <div className="flex items-center justify-between">
            <StatusChip tone="brand">{MASTERY_LABEL[mastery ?? 'foundation']}</StatusChip>
            <span className="text-sm text-muted-foreground">
              {lessonsDone ?? 0} lesson{(lessonsDone ?? 0) === 1 ? '' : 's'} completed · {minutesPracticed ?? 0} min practised
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{MASTERY_CRITERIA[mastery ?? 'foundation']}</p>
        </Panel>
      </Section>

      <Section title="Skills to revisit" variant="label">
        {weak && weak.length > 0 ? (
          <RowGroup>
            {weak.map((w) => (
              <ListRow key={w.skillTag} title={w.skillTag} description={`${Math.round(w.accuracy * 100)}% accuracy over ${w.attempts} attempts`} iconTone="warning" icon={Headphones} />
            ))}
          </RowGroup>
        ) : (
          <Callout>No weak skills recorded yet — this needs a few attempts on real exercises first.</Callout>
        )}
      </Section>

      <Section title="Recurring mistakes" variant="label">
        {errors && errors.length > 0 ? (
          <RowGroup>
            {errors.map((e) => (
              <ListRow key={e.code} title={`${e.code} — ${findErrorTag(e.code)?.description ?? ''}`} description={`${e.count} time${e.count === 1 ? '' : 's'}`} muted />
            ))}
          </RowGroup>
        ) : (
          <Callout>No recurring mistakes yet.</Callout>
        )}
      </Section>

      <Section title="Modules" variant="label">
        <CardGrid className="xl:grid-cols-2">
          {LISTENING_MODULES.map((m) => (
            <ModuleCard
              key={m.id}
              href={`/ielts/listening/module/${m.id}`}
              icon={Headphones}
              tint={m.id === 'sound-gym' ? 'brand' : 'lavender'}
              title={`${m.number}. ${m.title.en}`}
              subtitle={m.purpose.en}
              wrapSubtitle
              trailing={<StatusChip tone={m.status === 'in-development' ? 'neutral' : 'brand'}>{m.status === 'in-development' ? 'In development' : `${m.lessons.length} lessons`}</StatusChip>}
            />
          ))}
        </CardGrid>
      </Section>

      <Callout>
        <Link href="/ielts/listening/practice" className="underline">
          Open the Practice Library
        </Link>
      </Callout>
    </div>
  );
}

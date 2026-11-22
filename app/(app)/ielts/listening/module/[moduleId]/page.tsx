'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Headphones } from 'lucide-react';
import { Callout, ListRow, PageHeader, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { Button } from '@/components/ui/button';
import { findModule, isLessonComplete } from '@/lib/listening';
import { useListening } from '@/components/listening/useListening';

export default function ListeningModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { progress } = useListening();
  if (!moduleId || !progress) return <ScreenSkeleton />;
  const module = findModule(moduleId);
  if (!module) notFound();

  return (
    <div className="space-y-8">
      <PageHeader title={`${module.number}. ${module.title.en}`} subtitle={module.purpose.en} backHref="/ielts/listening" backLabel="Mino Listening" />

      {module.lessons.length > 0 ? (
        <Section title="Lessons" variant="label">
          <RowGroup>
            {module.lessons.map((lesson) => {
              const done = isLessonComplete(lesson, progress.lessons[lesson.id]);
              return (
                <ListRow
                  key={lesson.id}
                  href={`/ielts/listening/lesson/${lesson.id}`}
                  icon={Headphones}
                  iconTone={done ? 'success' : 'neutral'}
                  title={`${lesson.code} · ${lesson.title.en}`}
                  description={lesson.skill.en}
                  trailing={<StatusChip tone={done ? 'success' : 'neutral'}>{done ? 'Completed' : `${lesson.estimatedMinutes} min`}</StatusChip>}
                />
              );
            })}
          </RowGroup>
        </Section>
      ) : (
        <Callout>Content in development. This module's lessons will appear here once the learning materials are supplied.</Callout>
      )}

      <Section title="Future learning areas" variant="label">
        <div className="flex flex-wrap gap-2">
          {module.learningAreas.map((area, i) => (
            <StatusChip key={i}>{area.en}</StatusChip>
          ))}
        </div>
      </Section>

      <Button asChild variant="outline">
        <Link href="/ielts/listening">Back to Mino Listening</Link>
      </Button>
    </div>
  );
}

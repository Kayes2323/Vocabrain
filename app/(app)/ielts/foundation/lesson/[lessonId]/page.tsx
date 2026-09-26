'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Callout, ScreenSkeleton } from '@/components/ds';
import { LessonPlayer } from '@/components/foundation/LessonPlayer';
import { useFoundation, useText } from '@/components/foundation/useFoundation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { findLesson, lessonState, nextLesson } from '@/lib/foundation';

export default function FoundationLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { t } = useLocale();
  const text = useText();
  const { fp } = useFoundation();
  const found = findLesson(lessonId);
  if (!found) notFound();
  if (!fp) return <ScreenSkeleton />;

  // The path is guided: a locked lesson points to the lesson to do first.
  if (lessonState(found.module, found.lesson, fp) === 'locked') {
    const next = nextLesson(fp);
    return (
      <div className="mx-auto max-w-lg space-y-4 py-6">
        <Callout title={text(found.lesson.title)}>{t('foundation.lesson.locked')}</Callout>
        {next && (
          <Button asChild size="lg" className="w-full">
            <Link href={`/ielts/foundation/lesson/${next.lesson.id}`}>{t('foundation.lesson.lockedCta', { lesson: text(next.lesson.title) })}</Link>
          </Button>
        )}
      </div>
    );
  }
  return <LessonPlayer key={lessonId} module={found.module} lesson={found.lesson} />;
}

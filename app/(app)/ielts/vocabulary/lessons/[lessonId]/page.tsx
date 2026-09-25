'use client';

import { useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/AuthProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useUpgrade } from '@/components/providers/UpgradeProvider';
import { EmptyState, PageHeader } from '@/components/ds';
import { LessonStudy } from '@/components/vocabulary/LessonStudy';
import { getLesson } from '@/lib/vocabulary';

export default function LessonPage() {
  const params = useParams<{ lessonId: string }>();
  const lessonId = Number(params.lessonId);
  const lesson = getLesson(lessonId);
  const { maxLessonAccess } = useAuth();
  const { profile, updateProfile } = useProfile();
  const profileReady = profile !== null;
  const { openUpgrade } = useUpgrade();
  const locked = lessonId > maxLessonAccess;

  useEffect(() => {
    // Wait for the profile so the update isn't dropped.
    if (!lesson || locked || !profileReady) return;
    updateProfile((p) => ({ ...p, vocabulary: { ...p.vocabulary, lastLessonId: lessonId } }));
  }, [lesson, locked, lessonId, profileReady, updateProfile]);

  if (!lesson) notFound();

  const next = getLesson(lessonId + 1);
  const nextLessonId = next && next.lessonId <= maxLessonAccess ? next.lessonId : undefined;

  return (
    <div>
      <PageHeader title={`Lesson ${lesson.lessonId}`} subtitle={lesson.topic} backHref="/ielts/vocabulary" backLabel="Vocabulary" />
      {locked ? (
        <EmptyState
          icon={Lock}
          title="This lesson is part of Premium"
          description="Upgrade to open every topic lesson and the full word bank."
          action={<Button onClick={openUpgrade}>See Premium</Button>}
        />
      ) : (
        <LessonStudy key={lesson.lessonId} lesson={lesson} nextLessonId={nextLessonId} />
      )}
    </div>
  );
}

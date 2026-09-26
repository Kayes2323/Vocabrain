'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Callout, ScreenSkeleton } from '@/components/ds';
import { PracticeSession } from '@/components/foundation/PracticeSession';
import { useFoundation } from '@/components/foundation/useFoundation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { canQuiz, getModule } from '@/lib/foundation';

export default function FoundationQuizPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { t } = useLocale();
  const { fp } = useFoundation();
  const module = getModule(moduleId);
  if (!module) notFound();
  if (!fp) return <ScreenSkeleton />;
  if (!canQuiz(fp, module)) {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <Callout>{t('foundation.quiz.locked')}</Callout>
        <Button asChild>
          <Link href={`/ielts/foundation/${module.id}`}>{t('foundation.lesson.exit')}</Link>
        </Button>
      </div>
    );
  }
  return <PracticeSession key={moduleId} mode={{ kind: 'quiz', module }} fp={fp} />;
}

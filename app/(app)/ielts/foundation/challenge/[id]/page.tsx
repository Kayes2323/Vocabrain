'use client';

import { notFound, useParams } from 'next/navigation';
import { ScreenSkeleton } from '@/components/ds';
import { MasteryChallenge } from '@/components/foundation/MasteryChallenge';
import { useFoundation } from '@/components/foundation/useFoundation';
import { getChallenge, getModule } from '@/lib/foundation';

/** A module's Final Mastery Challenge (Parts of Speech has its own unit page). */
export default function FoundationChallengePage() {
  const { id } = useParams<{ id: string }>();
  const { fp } = useFoundation();
  const challenge = getChallenge(id);
  const module = challenge ? getModule(challenge.moduleId) : undefined;
  if (!challenge || !module) notFound();
  if (!fp) return <ScreenSkeleton />;
  return <MasteryChallenge key={challenge.id} module={module} fp={fp} challenge={challenge} />;
}

import { notFound } from 'next/navigation';
import { minoReviewEnabled } from '@/lib/mino/review-gate';
import { Task1WelcomeClient } from './client';

/**
 * Development-only, isolated placement preview of the new Mino rig in the Writing Task 1 welcome slot.
 * 404 on a Production deployment (same guard as /dev/mino-coach-preview). Uses the central MinoCoachMascot, like the real welcome.
 */
export const dynamic = 'force-dynamic';

export default function Task1WelcomePreviewPage() {
  if (!minoReviewEnabled()) notFound();
  return <Task1WelcomeClient />;
}

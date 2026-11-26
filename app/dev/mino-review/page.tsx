import { notFound } from 'next/navigation';
import { minoReviewEnabled } from '@/lib/mino/review-gate';
import { MinoReviewClient } from './client';

/**
 * Mino animation REVIEW page: the opening sequence, every state, and the real in-app placements, all driven through the
 * central MinoCoachMascot. Available in local development and on Vercel *Preview* deployments (so it can be opened on a
 * phone); answers 404 on a Production deployment, so ordinary learners never see these controls.
 */
export const dynamic = 'force-dynamic';

export const metadata = { title: 'Mino animation review', robots: { index: false, follow: false } };

export default function MinoReviewPage() {
  if (!minoReviewEnabled()) notFound();
  return <MinoReviewClient />;
}

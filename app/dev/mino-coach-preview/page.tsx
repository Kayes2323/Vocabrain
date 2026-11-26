import { notFound } from 'next/navigation';
import { minoReviewEnabled } from '@/lib/mino/review-gate';
import { MinoCoachPreviewClient } from './preview-client';

/**
 * Review-only visual QA route (development + Vercel Preview) for the Mino Coach animation architecture
 * (see docs/MINO_COACH_CHARACTER_SPEC.md). Renders the real layered rig directly with per-layer tooling (pivots, slow
 * motion, hold). Answers 404 on a Production deployment: real learners can never see this page.
 */
export const dynamic = 'force-dynamic';

export default function MinoCoachPreviewPage() {
  if (!minoReviewEnabled()) notFound();
  return <MinoCoachPreviewClient />;
}

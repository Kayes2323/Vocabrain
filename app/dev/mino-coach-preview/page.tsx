import { notFound } from 'next/navigation';
import { MinoCoachPreviewClient } from './preview-client';

/**
 * Development-only visual QA route for the Mino Coach animation architecture
 * (see docs/MINO_COACH_CHARACTER_SPEC.md). Renders placeholder artwork only
 * — never the approved mascot used in Task 1/Task 2/My Brain, and never
 * reachable in a production build: real learners can never see this page.
 */
export default function MinoCoachPreviewPage() {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <MinoCoachPreviewClient />;
}

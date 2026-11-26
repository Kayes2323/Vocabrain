import { notFound } from 'next/navigation';
import { Task1WelcomeClient } from './client';

/**
 * Development-only, isolated placement preview of the new Mino rig in the Writing Task 1 welcome slot.
 * Never reachable in a production build (same guard as /dev/mino-coach-preview); production Task 1 still renders
 * the shipped SVG mascot through components/mino/MinoCoachWelcome.tsx, which this route does not import or modify.
 */
export default function Task1WelcomePreviewPage() {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <Task1WelcomeClient />;
}

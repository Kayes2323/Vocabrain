'use client';

import { notFound, useParams } from 'next/navigation';
import { ModuleView } from '@/components/foundation/ModuleView';
import { TopicView } from '@/components/foundation/TopicView';
import { getModule, getTopic } from '@/lib/foundation';

/** An English Foundation topic page, or (for the other modules) the module page. */
export default function FoundationModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const topic = getTopic(moduleId);
  if (topic) return <TopicView topic={topic} />;
  const module = getModule(moduleId);
  if (!module) notFound();
  return <ModuleView module={module} />;
}

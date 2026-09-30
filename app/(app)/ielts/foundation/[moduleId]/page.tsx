'use client';

import { useEffect } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { ScreenSkeleton } from '@/components/ds';
import { ModuleView } from '@/components/foundation/ModuleView';
import { TopicView } from '@/components/foundation/TopicView';
import { getModule, getTopic, LEGACY_TOPICS } from '@/lib/foundation';

/** A Start Here / English Foundation topic page, or (for the other modules) the module page. */
export default function FoundationModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const router = useRouter();
  const legacy = LEGACY_TOPICS[moduleId];
  useEffect(() => {
    if (legacy) router.replace(`/ielts/foundation/${legacy}`);
  }, [legacy, router]);
  const topic = getTopic(moduleId);
  if (topic) return <TopicView topic={topic} />;
  if (legacy) return <ScreenSkeleton />;
  const module = getModule(moduleId);
  if (!module) notFound();
  return <ModuleView module={module} />;
}

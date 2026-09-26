'use client';

import { notFound, useParams } from 'next/navigation';
import { ModuleView } from '@/components/foundation/ModuleView';
import { getModule } from '@/lib/foundation';

export default function FoundationModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const module = getModule(moduleId);
  if (!module) notFound();
  return <ModuleView module={module} />;
}

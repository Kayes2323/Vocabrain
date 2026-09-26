'use client';

import { notFound, useParams } from 'next/navigation';
import { UnitView } from '@/components/foundation/UnitView';
import { getModule } from '@/lib/foundation';

export default function FoundationUnitPage() {
  const { moduleId, unitId } = useParams<{ moduleId: string; unitId: string }>();
  const module = getModule(moduleId);
  const unit = module?.units?.find((u) => u.id === unitId);
  if (!module || !unit) notFound();
  return <UnitView module={module} unit={unit} />;
}

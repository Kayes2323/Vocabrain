'use client';

import { notFound, redirect, useParams } from 'next/navigation';
import { ScreenSkeleton } from '@/components/ds';
import { PracticeSession } from '@/components/foundation/PracticeSession';
import { useFoundation } from '@/components/foundation/useFoundation';
import { canUnitCheck, getModule } from '@/lib/foundation';

export default function FoundationUnitCheckPage() {
  const { moduleId, unitId } = useParams<{ moduleId: string; unitId: string }>();
  const { fp } = useFoundation();
  const module = getModule(moduleId);
  const unit = module?.units?.find((u) => u.id === unitId);
  if (!module || !unit) notFound();
  if (!fp) return <ScreenSkeleton />;
  // Not enough finished lessons yet: the unit page shows what to do first.
  if (!canUnitCheck(fp, module, unit)) redirect(`/ielts/foundation/${module.id}/${unit.id}`);
  return <PracticeSession key={unit.id} mode={{ kind: 'unit', module, unit }} fp={fp} />;
}

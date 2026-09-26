'use client';

import { notFound, useParams } from 'next/navigation';
import { ScreenSkeleton } from '@/components/ds';
import { PracticeSession } from '@/components/foundation/PracticeSession';
import { useFoundation } from '@/components/foundation/useFoundation';
import { isNamedPattern, POS } from '@/lib/foundation';

export default function FoundationFixPage() {
  const { pair } = useParams<{ pair: string }>();
  const { fp } = useFoundation();
  const decoded = decodeURIComponent(pair);
  const [expected, chosen] = decoded.split('>');
  const validPair = POS.includes(expected as never) && POS.includes(chosen as never) && expected !== chosen;
  if (!validPair && !isNamedPattern(decoded)) notFound();
  if (!fp) return <ScreenSkeleton />;
  return <PracticeSession key={decoded} mode={{ kind: 'fix', pair: decoded }} fp={fp} />;
}

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Panel } from '@/components/ds';
import { MinoMark } from '@/components/shell/MinoMark';
import { MINO } from '@/lib/constants';
import { getMinoInsight } from '@/lib/engine';
import type { UserProfile } from '@/lib/models';

export function MinoInsightCard({ profile }: { profile: UserProfile }) {
  return (
    <Link href="/mino" className="block rounded-2xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40">
      <Panel variant="brand" className="flex items-start gap-3.5 transition-colors hover:bg-brand-soft/70">
        <MinoMark />
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-semibold text-brand">{MINO.name} insight</p>
          <p className="text-[15px] text-foreground/90 text-pretty">{getMinoInsight(profile)}</p>
        </div>
        <ChevronRight className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
      </Panel>
    </Link>
  );
}

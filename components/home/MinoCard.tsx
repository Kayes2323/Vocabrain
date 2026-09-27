'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Panel } from '@/components/ds';
import { MinoMark } from '@/components/shell/MinoMark';
import { minoReact } from '@/components/mino/Mino';
import { useBrainContext } from '@/components/brain/useBrainContext';
import { useLocale } from '@/components/providers/LocaleProvider';
import { buildDailyPlan, getMinoInsight, nextProfileGap } from '@/lib/engine';
import type { UserProfile } from '@/lib/models';

/**
 * Mino on Home only when it helps: a reminder, a personal recommendation, or
 * something the student needs to do. When today's plan is done and nothing
 * is missing, Mino stays in its own tab instead.
 */
export function MinoCard({ profile }: { profile: UserProfile }) {
  const { t, m } = useLocale();
  const gap = nextProfileGap(profile);
  const brain = useBrainContext();
  const name = profile.displayName;
  const dayDone = buildDailyPlan(profile, brain).tasks.every((task) => task.done);
  if (!gap && dayDone) return null;

  return (
    // Hover / tap → Mino blinks; an open profile gap gets one soft attention pulse.
    <Panel variant="brand" className="space-y-3" onPointerEnter={() => minoReact('blink')} data-testid="mino-card">
      <div className="flex items-start gap-3">
        <MinoMark mode={gap ? 'attention' : 'idle'} />
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-semibold text-brand">{t('mino.insightLabel')}</p>
          <p className="text-[15px] text-foreground/90 text-pretty">“{name ? `${name}, ` : ''}{m(getMinoInsight(profile, brain))}”</p>
        </div>
      </div>

      {gap && (
        <Link
          href={gap.href}
          className="flex items-center justify-between gap-3 rounded-xl bg-card px-4 py-3 text-sm transition-colors hover:bg-card/80"
        >
          <span>
            <span className="block text-xs text-muted-foreground">{t('home.completeProfile')}</span>
            <span className="font-medium">{t(`gaps.${gap.id}.title`)}</span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-brand" aria-hidden />
        </Link>
      )}

    </Panel>
  );
}

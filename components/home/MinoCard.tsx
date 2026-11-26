'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Panel } from '@/components/ds';
import { MinoCoachMascot } from '@/components/mino/MinoCoachMascot';
import { useMinoRigAllowed } from '@/components/mino/MinoLivingMascot';
import { homeCardPose } from '@/lib/mino/living';
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
  // Home's welcome card owns the onboarding invitation, so Mino never repeats it.
  const next = nextProfileGap(profile);
  const gap = next?.id === 'onboarding' ? undefined : next;
  const brain = useBrainContext();
  const name = profile.displayName;
  const dayDone = buildDailyPlan(profile, brain).tasks.every((task) => task.done);
  const rigAllowed = useMinoRigAllowed();
  if (!gap && dayDone) return null;
  const insight = getMinoInsight(profile, brain);

  return (
    // Hover / tap → Mino blinks; an open profile gap gets one soft attention pulse.
    <Panel variant="brand" className="space-y-3" onPointerEnter={() => minoReact('blink')} data-testid="mino-card">
      <div className="flex items-start gap-3">
        {/* The approved full-body Mino in the shared violet aura: one welcoming / encouraging beat for this message, then calm. */}
        <span className="mino-aura mino-aura--in shrink-0" data-testid="mino-card-avatar">
          <MinoCoachMascot px={84} pose={homeCardPose(insight.key)} live={rigAllowed} decorative />
        </span>
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-semibold text-brand">{t('mino.insightLabel')}</p>
          <p className="text-[15px] text-foreground/90 text-pretty">“{name ? `${name}, ` : ''}{m(insight)}”</p>
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

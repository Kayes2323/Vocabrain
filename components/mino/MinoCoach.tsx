'use client';

import { useState } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { cn } from '@/lib/utils';
import { poseForEvent, type MinoCoachArea, type MinoCoachEvent, type MinoCoachPose } from '@/lib/mino/coach';
import { coachLineFor, coachText, COACH_ROLE } from '@/lib/mino/coach-messages';
import { MinoCoachMascot, type MinoCoachSize } from './MinoCoachMascot';

/**
 * Drives the shared mascot for one learning area: turns a reported event
 * ('enter' | 'speaking' | 'explaining' | 'thinking' | 'success' | 'struggle')
 * into a pose and an optional short, deterministic line. Priority is always:
 * an explicit event the caller just reported beats idle — callers are
 * expected to report 'idle' once their moment has passed, same as any other
 * event, so this hook never has to guess when to stop talking.
 */
export function useMinoCoach(area: MinoCoachArea, event: MinoCoachEvent = 'idle') {
  const { locale } = useLocale();
  const [settledPose, setSettledPose] = useState<MinoCoachPose | null>(null);
  const pose = settledPose ?? poseForEvent(event);
  const line = coachLineFor(area, event);
  return {
    pose,
    role: coachText(locale, COACH_ROLE[area]),
    line: line ? coachText(locale, line) : undefined,
    /** Pass to <MinoCoachMascot onPoseSettle>: lets a one-shot pose (e.g. 'success') return to idle on its own. */
    onPoseSettle: () => setSettledPose('idle'),
    /** Call when the caller's event changes, so a new one-shot pose can play again. */
    resetSettle: () => setSettledPose(null),
  };
}

/**
 * A compact, reusable coach presence: the mascot plus its role and current
 * line, sized to sit beside content rather than interrupt it. Used after the
 * one-time welcome, in every learning area, instead of a modal per screen.
 */
export function MinoCoach({
  area,
  event = 'idle',
  size = 'sm',
  className,
}: {
  area: MinoCoachArea;
  event?: MinoCoachEvent;
  size?: MinoCoachSize;
  className?: string;
}) {
  const { pose, role, line, onPoseSettle } = useMinoCoach(area, event);
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <MinoCoachMascot pose={pose} size={size} onPoseSettle={onPoseSettle} className="shrink-0" />
      <div className="min-w-0 space-y-0.5 pt-1">
        <p className="text-xs font-semibold tracking-wide text-brand uppercase">{role}</p>
        {line && <p className="text-sm text-foreground/90">{line}</p>}
      </div>
    </div>
  );
}

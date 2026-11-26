import { Mic } from 'lucide-react';
import { useMinoCoach } from '@/components/mino/MinoCoach';
import { MinoCoachMascot } from '@/components/mino/MinoCoachMascot';
import { Panel } from '@/components/ds';
import type { MinoCoachArea } from '@/lib/mino/coach';
import { cn } from '@/lib/utils';

/**
 * Zone A — the Trainer Zone. The shared Mino Coach mascot (same character as
 * the Academy welcome, in its 'speaking' pose), the lesson title and a short
 * instructional message. Voice entry is a prototype affordance only (no
 * audio is recorded); clicking it says so rather than pretending to listen.
 */
export function TrainerPanel({
  area,
  lessonTitle,
  stepTitle,
  message,
  hint,
  onVoiceTap,
  className,
}: {
  area: MinoCoachArea;
  lessonTitle: string;
  stepTitle: string;
  message: string;
  hint?: string;
  onVoiceTap?: () => void;
  className?: string;
}) {
  const { pose, role, onPoseSettle } = useMinoCoach(area, 'speaking');
  return (
    <Panel variant="brand" className={cn('space-y-3', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <MinoCoachMascot pose={pose} size="sm" onPoseSettle={onPoseSettle} />
          <div>
            <p className="text-xs font-semibold tracking-wide text-brand uppercase">{role}</p>
            <p className="text-sm font-medium text-muted-foreground">{lessonTitle}</p>
          </div>
        </div>
        {onVoiceTap && (
          <button
            type="button"
            onClick={onVoiceTap}
            aria-label="Hear this from Mino (prototype)"
            title="Voice is a prototype placeholder — no audio is recorded here."
            className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-card text-muted-foreground hover:text-brand"
          >
            <Mic className="size-4" />
          </button>
        )}
      </div>
      <div className="space-y-1.5">
        <p className="text-sm font-semibold text-foreground">{stepTitle}</p>
        <p className="text-[15px] leading-relaxed text-foreground/90 text-pretty">{message}</p>
        {hint && <p className="text-sm text-muted-foreground italic">Hint: {hint}</p>}
      </div>
    </Panel>
  );
}

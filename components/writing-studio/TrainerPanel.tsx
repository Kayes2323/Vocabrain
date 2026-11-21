import { Mic } from 'lucide-react';
import { MinoMark } from '@/components/shell/MinoMark';
import { Panel } from '@/components/ds';
import { cn } from '@/lib/utils';

/**
 * Zone A — the Trainer Zone. Mino's identity, the lesson title and a short
 * instructional message. Voice entry is a prototype affordance only (no
 * audio is recorded); clicking it says so rather than pretending to listen.
 */
export function TrainerPanel({
  lessonTitle,
  stepTitle,
  message,
  hint,
  onVoiceTap,
  className,
}: {
  lessonTitle: string;
  stepTitle: string;
  message: string;
  hint?: string;
  onVoiceTap?: () => void;
  className?: string;
}) {
  return (
    <Panel variant="brand" className={cn('space-y-3', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <MinoMark size="md" alive />
          <div>
            <p className="text-xs font-semibold tracking-wide text-brand uppercase">Mino · Writing Trainer</p>
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

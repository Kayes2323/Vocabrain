import { Mino, type MinoMode, type MinoSize } from '@/components/mino/Mino';

/**
 * Mino's mark, "Companion" (the canonical logo). A thin wrapper over <Mino>:
 * `alive` = idle life (organic blinks, a rare sparkle), `thinking` = Mino is
 * thinking; otherwise static. Pass `mode` for any other state.
 */
export function MinoMark({
  size = 'md',
  thinking = false,
  alive = false,
  mode,
  className,
}: {
  size?: MinoSize;
  thinking?: boolean;
  alive?: boolean;
  mode?: MinoMode;
  className?: string;
}) {
  return <Mino size={size} mode={mode ?? (thinking ? 'thinking' : alive ? 'idle' : 'static')} className={className} />;
}

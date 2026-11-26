import { MinoLogo, type MinoLogoSize } from '@/components/brand/MinoLogo';
import type { MinoMode } from '@/lib/mino/motion';

/**
 * Mino's compact mark = the approved Mino logo artwork. Kept as the single entry point every screen already uses
 * (navigation, login, chat, cards): `alive` = idle life, `thinking` = Mino is working on something, otherwise static.
 * Pass `mode` for any other state ('attention', 'success', …). Motion is a CSS glow only (no redrawing of the logo).
 */
export function MinoMark({
  size = 'md',
  thinking = false,
  alive = false,
  mode,
  className,
}: {
  size?: MinoLogoSize;
  thinking?: boolean;
  alive?: boolean;
  mode?: MinoMode;
  className?: string;
}) {
  const m = mode ?? (thinking ? 'thinking' : alive ? 'idle' : 'static');
  const logoMode = m === 'thinking' ? 'thinking' : m === 'attention' ? 'attention' : m === 'success' || m === 'celebrate' ? 'success' : m === 'idle' ? 'idle' : 'static';
  return <MinoLogo size={size} mode={logoMode} className={className} />;
}

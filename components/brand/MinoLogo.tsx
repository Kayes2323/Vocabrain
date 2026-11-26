import { cn } from '@/lib/utils';

/** Pixel sizes of the compact logo (same scale the old small mark used, so every placement keeps its footprint). */
export const MINO_LOGO_PX = { xs: 20, sm: 28, md: 36, lg: 56, xl: 72, '2xl': 96 } as const;
export type MinoLogoSize = keyof typeof MINO_LOGO_PX;

/**
 * The approved Mino logo (assets/brand/mino-logo-approved.png), compact form — used wherever a small brand mark is
 * needed (navigation, login, chat avatar, cards). Never redrawn: only resized (see scripts/brand/gen-mino-logo.mjs).
 * The full-body mascot (components/mino/MinoCoachMascot.tsx) is for larger experiences.
 *
 * `mode` adds a little life with CSS only: thinking = slow violet glow pulse, attention = a soft ring, success = one
 * glow flash. All motion stops under prefers-reduced-motion.
 */
export function MinoLogo({
  size = 'md',
  mode = 'static',
  className,
}: {
  size?: MinoLogoSize;
  mode?: 'static' | 'idle' | 'thinking' | 'attention' | 'success';
  className?: string;
}) {
  const px = MINO_LOGO_PX[size];
  return (
    <span
      className={cn('mino-logo relative inline-block shrink-0 align-middle', className)}
      data-mino-logo={size}
      data-mode={mode}
      style={{ width: px, height: px }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/mino-logo-128.webp"
        srcSet="/brand/mino-logo-64.webp 64w, /brand/mino-logo-128.webp 128w, /brand/mino-logo-256.webp 256w, /brand/mino-logo-512.webp 512w"
        sizes={`${px}px`}
        width={px}
        height={px}
        alt=""
        draggable={false}
        decoding="async"
        className="relative block size-full select-none"
      />
    </span>
  );
}

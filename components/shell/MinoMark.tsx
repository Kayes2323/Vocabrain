import { cn } from '@/lib/utils';

const SIZE = { xs: 20, sm: 28, md: 36, lg: 56, xl: 72 } as const;

/**
 * Mino's mark, "Companion": a soft square with two eyes and a spark of insight.
 * `alive` adds an occasional blink; `thinking` makes Mino glance around and
 * breathe (the "Mino is thinking" moment). Both stop for reduced motion.
 */
export function MinoMark({
  size = 'md',
  thinking = false,
  alive = false,
  className,
}: {
  size?: keyof typeof SIZE;
  thinking?: boolean;
  alive?: boolean;
  className?: string;
}) {
  const px = SIZE[size];
  return (
    <svg
      viewBox="0 0 48 48"
      width={px}
      height={px}
      aria-hidden
      className={cn('mino-mark shrink-0', alive && 'mino-alive', thinking && 'mino-thinking', className)}
    >
      <g className="mino-body">
        <rect x="2" y="2" width="44" height="44" rx="15" className="fill-brand" />
      </g>
      <g className="mino-eyes">
        <rect className="mino-eye fill-brand-foreground" x="15" y="18" width="5" height="10" rx="2.5" />
        <rect className="mino-eye fill-brand-foreground" x="28" y="18" width="5" height="10" rx="2.5" />
      </g>
      {px >= 28 && (
        <path
          className="mino-glint fill-brand-foreground"
          opacity={0.9}
          d="M36 8.5l1.1 2.9 2.9 1.1-2.9 1.1L36 16.5l-1.1-2.9L32 12.5l2.9-1.1z"
        />
      )}
    </svg>
  );
}

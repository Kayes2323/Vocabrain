import { cn } from '@/lib/utils';

type PanelProps = React.ComponentProps<'div'> & {
  /** Subtle brand-tinted surface, used for Mino. */
  variant?: 'default' | 'brand' | 'muted';
};

/** The standard content surface: one rounded, bordered card. */
export function Panel({ className, variant = 'default', ...props }: PanelProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-5',
        variant === 'default' && 'bg-card shadow-[0_1px_2px_rgb(15_23_42/0.04)]',
        variant === 'brand' && 'border-brand/15 bg-brand-soft',
        variant === 'muted' && 'bg-muted/60',
        className,
      )}
      {...props}
    />
  );
}

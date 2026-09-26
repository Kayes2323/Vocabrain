import { cn } from '@/lib/utils';

interface SectionProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  /** "label": a small uppercase heading for grouped navigation (LEARN, PRACTICE…). */
  variant?: 'default' | 'label';
  children: React.ReactNode;
}

export function Section({ title, description, action, className, variant = 'default', children }: SectionProps) {
  return (
    <section className={cn('space-y-3', className)}>
      {(title || action) && (
        <div className="flex items-end justify-between gap-4 px-1">
          <div>
            {title && (
              <h2 className={variant === 'label' ? 'text-xs font-semibold tracking-wider text-muted-foreground uppercase' : 'text-[15px] font-semibold text-muted-foreground'}>
                {title}
              </h2>
            )}
            {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

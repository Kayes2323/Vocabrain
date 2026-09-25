import { MinoMark } from '@/components/shell/MinoMark';
import { cn } from '@/lib/utils';

/** A short line from Mino, shown as a chat bubble. */
export function MinoSays({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-start gap-2.5', className)}>
      <MinoMark size="sm" className="mt-0.5" />
      <p className="rounded-2xl rounded-tl-md bg-brand-soft px-4 py-2.5 text-[15px] text-foreground/90 text-pretty">
        {children}
      </p>
    </div>
  );
}

import { Brain } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function BrandMark({ className, showName = true }: { className?: string; showName?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="inline-flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Brain className="size-[18px]" aria-hidden />
      </span>
      {showName && <span className="text-[17px] font-semibold tracking-tight">{APP_NAME}</span>}
    </span>
  );
}

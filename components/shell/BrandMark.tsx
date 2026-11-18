import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MinoMark } from './MinoMark';

/** Mino's logo (the soft square with two eyes and the star) next to the name. */
export function BrandMark({ className, showName = true }: { className?: string; showName?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <MinoMark size="md" />
      {showName && <span className="text-[17px] font-semibold tracking-tight">{APP_NAME}</span>}
    </span>
  );
}

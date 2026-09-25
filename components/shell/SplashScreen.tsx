import { Spinner } from '@/components/ui/spinner';
import { BrandMark } from './BrandMark';

export function SplashScreen() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background">
      <BrandMark />
      <Spinner className="size-5 text-muted-foreground" />
    </div>
  );
}

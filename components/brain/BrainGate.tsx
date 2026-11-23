'use client';

import type { ReactNode } from 'react';
import { CloudOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState, ScreenSkeleton } from '@/components/ds';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';

/** A failed or unconfirmed load. It never looks like an empty notebook, and it says the words are safe. */
export function BrainLoadError({ kind }: { kind: 'error' | 'unconfirmed' }) {
  const { t } = useLocale();
  const brain = useBrain();
  return (
    <div className="mx-auto max-w-lg px-4 py-10" role="alert" data-testid="brain-load-error" data-kind={kind}>
      <EmptyState
        icon={CloudOff}
        title={t(kind === 'error' ? 'brain.state.errorTitle' : 'brain.state.unconfirmedTitle')}
        description={t(kind === 'error' ? 'brain.state.errorBody' : 'brain.state.unconfirmedBody')}
        action={
          <Button onClick={brain.retry} data-testid="brain-retry">
            <RefreshCw /> {t('brain.state.retry')}
          </Button>
        }
      />
    </div>
  );
}

/**
 * What to render instead of a Brain screen while its words are not available:
 * a skeleton while loading, a clear error (with Retry) when loading failed or
 * cannot be confirmed. Returns null once the words are available — including a
 * genuinely empty notebook, which each screen shows in its own way.
 */
export function useBrainGate(): ReactNode | null {
  const { view } = useBrain();
  if (view === 'loading') return <ScreenSkeleton />;
  if (view === 'error' || view === 'unconfirmed') return <BrainLoadError kind={view} />;
  return null;
}

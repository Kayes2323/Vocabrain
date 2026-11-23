'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';

/** Shown on every screen while something the learner did has not reached the server, or the last refresh failed. */
export function BrainSyncNotice() {
  const { t } = useLocale();
  const brain = useBrain();
  const [busy, setBusy] = useState(false);
  const [still, setStill] = useState(false);
  const refreshFailed = brain.error && brain.words.length > 0;
  if (brain.unsavedCount === 0 && !refreshFailed) return null;
  const retry = async () => {
    setBusy(true);
    setStill(false);
    if (refreshFailed) brain.retry();
    const left = brain.unsavedCount > 0 ? await brain.retryUnsaved() : 0;
    setStill(left > 0);
    setBusy(false);
  };
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-2" role="alert" data-testid="brain-sync-notice">
      <div className="flex max-w-lg flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-warning/50 bg-card px-3 py-2 text-sm shadow-lg">
        <AlertTriangle className="size-4 shrink-0 text-warning" aria-hidden />
        <span>{brain.unsavedCount > 0 ? (still ? t('brain.sync.stillUnsaved') : t('brain.sync.unsaved')) : t('brain.state.refreshFailed')}</span>
        <Button size="sm" variant="outline" onClick={retry} disabled={busy} data-testid="brain-sync-retry">
          {busy ? t('brain.sync.retrying') : brain.unsavedCount > 0 ? t('brain.sync.retry') : t('brain.state.retry')}
        </Button>
      </div>
    </div>
  );
}

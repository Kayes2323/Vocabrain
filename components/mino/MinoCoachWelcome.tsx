'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Panel } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { welcomeStorageKey, type MinoCoachArea } from '@/lib/mino/coach';
import { coachText, COACH_ROLE, COACH_WELCOME } from '@/lib/mino/coach-messages';
import { MinoCoachMascot } from './MinoCoachMascot';

/**
 * A learning area's one-time, first-entry welcome: the full-body mascot,
 * its approved welcome dialogue, and Start / Replay / Skip. Remembered per
 * device (localStorage, mirroring LocaleProvider's own convention) so a
 * returning learner is never interrupted by it again. Renders nothing while
 * that check is pending (avoids a flash) and nothing once dismissed.
 */
export function MinoCoachWelcome({ area, onDismiss }: { area: MinoCoachArea; onDismiss?: () => void }) {
  const { locale } = useLocale();
  const [open, setOpen] = useState<boolean | null>(null);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    try {
      setOpen(window.localStorage.getItem(welcomeStorageKey(area)) !== '1');
    } catch {
      setOpen(true);
    }
  }, [area]);

  if (open !== true) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(welcomeStorageKey(area), '1');
    } catch {
      // Non-fatal: it just reappears next visit on this device.
    }
    setOpen(false);
    onDismiss?.();
  };

  const role = coachText(locale, COACH_ROLE[area]);
  const welcome = coachText(locale, COACH_WELCOME[area]);

  return (
    <Panel variant="brand" className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">
      <MinoCoachMascot key={replayKey} pose="welcome" size="xl" className="shrink-0" />
      <div className="min-w-0 flex-1 space-y-3">
        <p className="text-xs font-semibold tracking-wide text-brand uppercase">{role}</p>
        <p className="text-[15px] leading-relaxed text-foreground/90 text-pretty">{welcome}</p>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <Button onClick={dismiss}>{locale === 'bn' ? 'চলুন, শুরু করি' : 'Start learning'}</Button>
          <Button variant="outline" onClick={() => setReplayKey((k) => k + 1)}>
            {locale === 'bn' ? 'আবার শুনি' : 'Replay welcome'}
          </Button>
          <button type="button" className="text-sm text-muted-foreground underline-offset-2 hover:underline" onClick={dismiss}>
            {locale === 'bn' ? 'এড়িয়ে যান' : 'Skip'}
          </button>
        </div>
      </div>
    </Panel>
  );
}

'use client';

import { useCallback, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Panel, PageHeader } from '@/components/ds';
import { coachText, COACH_ROLE, COACH_WELCOME } from '@/lib/mino/coach-messages';
import { MinoCoachMascot } from '@/components/mino/MinoCoachMascot';
import { MinoCoachMascotLegacy } from '@/components/mino/MinoCoachMascotLegacy';
import type { MinoRigController } from '../rig/coach-rig-controller';
import { WELCOME_SEQUENCE } from '../rig/coach-preview-state';

/**
 * ISOLATED PREVIEW of the real Writing Task 1 welcome (components/mino/MinoCoachWelcome.tsx, rendered by
 * components/writing-studio/AcademyOverview.tsx inside `mx-auto max-w-3xl`). Same Panel/text/buttons/layout and the
 * exact approved copy from lib/mino/coach-messages.ts; only the character cell differs (new rig instead of the SVG
 * mascot). Unlike the production component it never writes the "welcome seen" localStorage flag, so reviewing it
 * cannot change any learner state.
 */
export function Task1WelcomePreview({ locale, onController }: { locale: 'en' | 'bn'; onController?: (c: MinoRigController) => void }) {
  const [dismissed, setDismissed] = useState(false);
  const ctrl = useRef<MinoRigController | null>(null);

  const runWelcome = useCallback(() => {
    ctrl.current?.playSequence(WELCOME_SEQUENCE);
  }, []);

  const role = coachText(locale, COACH_ROLE.task1);
  const welcome = coachText(locale, COACH_WELCOME.task1);

  return (
    <div className="mx-auto max-w-3xl space-y-8" data-testid="task1-welcome-preview">
      <PageHeader title="Writing Task 1" subtitle="Charts, graphs and reports — step by step." backHref="#" backLabel="Writing Studio" />
      {dismissed ? (
        <Panel variant="muted" className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">Welcome dismissed (preview only — nothing was saved).</p>
          <Button size="sm" variant="outline" onClick={() => { setDismissed(false); }}>Reset preview</Button>
        </Panel>
      ) : (
        <Panel variant="brand" className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left" data-testid="task1-welcome-panel">
          <div className="w-[min(100%,300px)] shrink-0 sm:w-[320px]" data-testid="task1-welcome-mino">
            {/* the central component: its own opening plays on mount; Replay re-runs the same choreography */}
            <MinoCoachMascot
              pose="welcome"
              size="xl"
              className="w-full"
              onController={(c) => {
                ctrl.current = c;
                if (c) onController?.(c);
              }}
            />
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <p className="text-xs font-semibold tracking-wide text-brand uppercase">{role}</p>
            <p className="text-[15px] leading-relaxed text-foreground/90 text-pretty">{welcome}</p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <Button onClick={() => setDismissed(true)}>{locale === 'bn' ? 'চলুন, শুরু করি' : 'Start learning'}</Button>
              <Button variant="outline" onClick={runWelcome}>
                {locale === 'bn' ? 'আবার শুনি' : 'Replay welcome'}
              </Button>
              <button type="button" className="text-sm text-muted-foreground underline-offset-2 hover:underline" onClick={() => setDismissed(true)}>
                {locale === 'bn' ? 'এড়িয়ে যান' : 'Skip'}
              </button>
            </div>
          </div>
        </Panel>
      )}
      <section className="space-y-2" data-testid="task1-welcome-production-compare">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">For comparison: the previous SVG mascot (kept as the fallback)</p>
        <Panel variant="brand" className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">
          <MinoCoachMascotLegacy pose="welcome" size="xl" className="shrink-0" />
          <div className="min-w-0 flex-1 space-y-3">
            <p className="text-xs font-semibold tracking-wide text-brand uppercase">{role}</p>
            <p className="text-[15px] leading-relaxed text-foreground/90 text-pretty">{welcome}</p>
          </div>
        </Panel>
      </section>
    </div>
  );
}

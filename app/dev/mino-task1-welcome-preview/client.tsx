'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Task1WelcomePreview } from '@/components/mino/dev/Task1WelcomePreview';
import { RigStateControls } from '@/components/mino/dev/RigStateControls';
import type { MinoRigController } from '@/components/mino/rig/coach-rig-controller';
import type { CoachRigState, RigPointDirection } from '@/components/mino/rig/coach-preview-state';

export function Task1WelcomeClient() {
  const [ctrl, setCtrl] = useState<MinoRigController | null>(null);
  const [locale, setLocale] = useState<'en' | 'bn'>('en');
  const [point, setPoint] = useState<RigPointDirection>('right');
  const [active] = useState<CoachRigState>('idle');
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="inline-block rounded bg-amber-100 px-2 py-1 text-xs font-semibold tracking-wide text-amber-800 uppercase">Dev-only — isolated Task 1 welcome preview</p>
        <div className="flex items-center gap-2 text-sm">
          <Link className="underline" href="/dev/mino-coach-preview">← Rig state preview</Link>
          <button type="button" data-testid="locale-en" className={`rounded-full border px-3 py-1 ${locale === 'en' ? 'bg-foreground text-background' : ''}`} onClick={() => setLocale('en')}>EN</button>
          <button type="button" data-testid="locale-bn" className={`rounded-full border px-3 py-1 ${locale === 'bn' ? 'bg-foreground text-background' : ''}`} onClick={() => setLocale('bn')}>বাংলা</button>
        </div>
      </div>
      <Task1WelcomePreview locale={locale} onController={setCtrl} />
      <details className="rounded-lg border p-3" open>
        <summary className="cursor-pointer text-sm font-medium">Animation controls (preview only)</summary>
        <div className="pt-3">
          <RigStateControls controller={ctrl} active={active} point={point} onPoint={setPoint} onWelcome={() => ctrl?.playSequence(['entrance', 'landing', 'greeting', 'speaking'])} />
        </div>
      </details>
    </main>
  );
}

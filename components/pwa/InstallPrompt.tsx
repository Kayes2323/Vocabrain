'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mino } from '@/components/mino/Mino';
import { useLocale } from '@/components/providers/LocaleProvider';
import { afterChoice, afterDismiss, installDelay, INSTALL_DELAY_KEY, isIOS, shouldOfferInstall } from '@/lib/pwa/install';
import {
  consumeNativeInstallEvent,
  nativeInstallEvent,
  onInstallChange,
  readInstallState,
  runningStandalone,
  writeInstallState,
} from '@/lib/pwa/native';

/**
 * "Install Mino": a small, non-blocking card shown after the student has used
 * the app for a while — only when the browser really offers installation
 * (beforeinstallprompt), never when already installed or running as the app,
 * and not again soon after "Not now". "Install" opens the browser's own prompt.
 */
export function InstallPrompt() {
  const { t } = useLocale();
  const [ready, setReady] = useState(false);
  const [tick, setTick] = useState(0);
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState(true);

  // Let the student use the app first.
  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = localStorage.getItem(INSTALL_DELAY_KEY);
    } catch {
      // ignore
    }
    const id = setTimeout(() => setReady(true), installDelay(raw));
    setPhone(window.matchMedia?.('(pointer: coarse)').matches ?? true);
    return () => clearTimeout(id);
  }, []);

  // The native event can arrive (or the app be installed) at any time.
  useEffect(() => onInstallChange(() => setTick((n) => n + 1)), []);

  useEffect(() => {
    if (!ready) return;
    setOpen(
      shouldOfferInstall({ state: readInstallState(), standalone: runningStandalone(), nativeAvailable: Boolean(nativeInstallEvent()) && !isIOS(navigator.userAgent, navigator.maxTouchPoints), now: Date.now() }),
    );
  }, [ready, tick]);

  if (!open) return null;

  const notNow = () => {
    writeInstallState(afterDismiss(readInstallState(), Date.now()));
    setOpen(false);
  };
  const install = async () => {
    const ev = nativeInstallEvent();
    setOpen(false);
    if (!ev) return;
    try {
      await ev.prompt();
      const { outcome } = await ev.userChoice;
      writeInstallState(afterChoice(readInstallState(), outcome, Date.now()));
    } catch {
      // The browser refused (e.g. prompt already used): try again another time.
      writeInstallState(afterDismiss(readInstallState(), Date.now()));
    } finally {
      consumeNativeInstallEvent();
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="install-mino-title"
      aria-describedby="install-mino-body"
      data-testid="install-prompt"
      className="fixed inset-x-4 bottom-[calc(6.25rem+env(safe-area-inset-bottom))] z-40 rounded-2xl border bg-card p-4 shadow-[0_8px_30px_rgb(15_23_42/0.12)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300 md:inset-x-auto md:right-6 md:bottom-6 md:w-[360px]"
    >
      <div className="flex items-start gap-3">
        {/* Arrives with a small blink + sparkle, nothing bigger. */}
        <Mino mode="success" size="sm" />
        <div className="min-w-0 flex-1 space-y-1">
          <p id="install-mino-title" className="font-semibold">
            {phone ? t('pwa.titlePhone') : t('pwa.titleDesktop')}
          </p>
          <p id="install-mino-body" className="text-sm text-muted-foreground">
            {phone ? t('pwa.body') : t('pwa.bodyDesktop')}
          </p>
        </div>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <Button type="button" variant="ghost" size="sm" className="h-10" onClick={notNow}>
          {t('pwa.notNow')}
        </Button>
        <Button type="button" variant="brand" size="sm" className="h-10" onClick={install}>
          {t('pwa.install')}
        </Button>
      </div>
    </div>
  );
}

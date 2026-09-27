'use client';

import { afterInstalled, INSTALL_STORAGE_KEY, parseInstallState, type InstallState } from './install';

/** Chromium's install event (not in the DOM typings). */
export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform?: string }>;
}

let deferred: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((f) => f());

export function readInstallState(): InstallState {
  try {
    return parseInstallState(localStorage.getItem(INSTALL_STORAGE_KEY));
  } catch {
    return {};
  }
}

export function writeInstallState(state: InstallState) {
  try {
    localStorage.setItem(INSTALL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage blocked: the prompt simply may show again later.
  }
}

// Captured as soon as this module loads (the event can fire before sign-in finishes).
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Keep the browser's own prompt for our "Install" button instead of the mini-infobar.
    e.preventDefault();
    deferred = e as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener('appinstalled', () => {
    writeInstallState(afterInstalled(readInstallState(), Date.now()));
    deferred = null;
    notify();
  });
}

/** The saved native prompt, if the browser offered one (usable once). */
export function nativeInstallEvent(): BeforeInstallPromptEvent | null {
  return deferred;
}

export function consumeNativeInstallEvent() {
  deferred = null;
  notify();
}

export function onInstallChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Running as an installed app right now. */
export function runningStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  const dm = window.matchMedia?.('(display-mode: standalone)').matches || window.matchMedia?.('(display-mode: minimal-ui)').matches;
  return Boolean(dm) || (navigator as Navigator & { standalone?: boolean }).standalone === true;
}

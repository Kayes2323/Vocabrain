/**
 * When to offer "Install Mino". Pure, so every rule is testable without a browser.
 * The UI only triggers the browser's own install prompt (beforeinstallprompt);
 * where that API does not exist (e.g. iOS Safari) nothing is offered.
 */

export const INSTALL_STORAGE_KEY = 'mino.install';
/** Optional override of the delay (ms), e.g. for tests. */
export const INSTALL_DELAY_KEY = 'mino.installDelayMs';

export const INSTALL_DEFAULTS = {
  /** Let the student use the app for a while first. */
  delayMs: 45_000,
  /** "Not now" → wait this long; each further "not now" waits longer (×2, ×3…). */
  cooldownDays: 14,
} as const;

const DAY = 24 * 60 * 60 * 1000;

export interface InstallState {
  /** Installed (accepted the native prompt, or the browser reported appinstalled): never ask again. */
  installedAt?: number;
  /** Last "Not now" (ours or the native dialog's). */
  dismissedAt?: number;
  dismissCount?: number;
}

/** Reads the stored state; anything malformed counts as a fresh start (never crashes). */
export function parseInstallState(raw: string | null | undefined): InstallState {
  if (!raw) return {};
  try {
    const v = JSON.parse(raw) as Record<string, unknown>;
    const num = (x: unknown) => (typeof x === 'number' && Number.isFinite(x) ? x : undefined);
    const out: InstallState = {};
    if (num(v.installedAt) !== undefined) out.installedAt = num(v.installedAt);
    if (num(v.dismissedAt) !== undefined) out.dismissedAt = num(v.dismissedAt);
    if (num(v.dismissCount) !== undefined) out.dismissCount = num(v.dismissCount);
    return out;
  } catch {
    return {};
  }
}

/** Running as an installed app (Android/desktop display-mode, or iOS home-screen). */
export function isStandalone(env: { displayModeStandalone: boolean; navigatorStandalone?: boolean }): boolean {
  return env.displayModeStandalone || env.navigatorStandalone === true;
}

/** iOS / iPadOS (incl. iPad reporting as Mac): no install API, so no Install button. */
export function isIOS(userAgent: string, maxTouchPoints = 0): boolean {
  return /iPhone|iPad|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && maxTouchPoints > 1);
}

/** The cooldown after the n-th "not now" (grows each time). */
export function cooldownMs(state: InstallState, cooldownDays: number = INSTALL_DEFAULTS.cooldownDays): number {
  return cooldownDays * DAY * Math.max(1, state.dismissCount ?? 1);
}

export function shouldOfferInstall(input: {
  state: InstallState;
  standalone: boolean;
  /** The browser gave us a beforeinstallprompt event (install is actually possible). */
  nativeAvailable: boolean;
  now: number;
  cooldownDays?: number;
}): boolean {
  const { state, standalone, nativeAvailable, now } = input;
  if (state.installedAt) return false;
  if (standalone) return false;
  if (!nativeAvailable) return false;
  if (state.dismissedAt !== undefined && now - state.dismissedAt < cooldownMs(state, input.cooldownDays)) return false;
  return true;
}

/** "Not now" in our card. */
export function afterDismiss(state: InstallState, now: number): InstallState {
  return { ...state, dismissedAt: now, dismissCount: (state.dismissCount ?? 0) + 1 };
}

/** The native dialog's answer. */
export function afterChoice(state: InstallState, outcome: 'accepted' | 'dismissed', now: number): InstallState {
  return outcome === 'accepted' ? { ...state, installedAt: now } : afterDismiss(state, now);
}

/** The browser reported the app was installed (appinstalled). */
export function afterInstalled(state: InstallState, now: number): InstallState {
  return { ...state, installedAt: state.installedAt ?? now };
}

/** The delay to use: the stored override if it is a sane number, else the default. */
export function installDelay(raw: string | null | undefined): number {
  const n = Number(raw);
  return raw != null && raw !== '' && Number.isFinite(n) && n >= 0 && n <= 10 * 60_000 ? n : INSTALL_DEFAULTS.delayMs;
}

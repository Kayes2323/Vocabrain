// Safe JSON wrapper around localStorage. Storage can be unavailable (private
// mode, blocked site data), so every access is guarded and failures fall back.

export function readJSON<T>(key: string): T | undefined {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : undefined;
  } catch {
    return undefined;
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Non-fatal: progress stays in memory for this session.
  }
}

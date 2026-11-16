import { frameRms, type ClipIndex } from '@/lib/ielts';
import { speechRecognitionSupported } from '@/components/practice/useSpeechRecognition';

/** The examiner needs a voice, a microphone and speech-to-text. Without all three the tap-through mode is used. */
export function examinerSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window && Boolean(navigator.mediaDevices?.getUserMedia) && speechRecognitionSupported();
}

export const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

// ---------------------------------------------------------------- examiner's voice

/** A calm British voice when the device has one; the best English voice otherwise. */
function pickVoice(): SpeechSynthesisVoice | undefined {
  const rank = (v: SpeechSynthesisVoice) =>
    (/^en[-_]GB/i.test(v.lang) ? 4 : /^en[-_](AU|IE|NZ|US)/i.test(v.lang) ? 2 : 0) + (/natural|neural|online|premium|enhanced|google/i.test(v.name) ? 3 : 0);
  return window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.toLowerCase().startsWith('en'))
    .sort((a, b) => rank(b) - rank(a))[0];
}

/** Voices load a moment after the page does; wait briefly so the first line is not read in the wrong one. */
export async function voicesReady(maxMs = 1500): Promise<void> {
  const synth = window.speechSynthesis;
  const started = Date.now();
  while (synth.getVoices().length === 0 && Date.now() - started < maxMs) await sleep(100);
}

const sentences = (text: string) => text.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean) ?? [text];

function speakOne(text: string): Promise<void> {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voice = pickVoice();
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? 'en-GB';
    u.rate = 0.95;
    // Some browsers never fire `end`; do not let the whole test hang on it.
    const guard = window.setTimeout(resolve, 3000 + text.length * 120);
    u.onend = u.onerror = () => {
      window.clearTimeout(guard);
      resolve();
    };
    synth.speak(u);
  });
}

// ---------------------------------------------------------------- recorded examiner clips

let manifest: Promise<ClipIndex> | null = null;

/** The list of recorded clips. Without it (offline, not deployed) the browser voice is used. */
export function loadClipIndex(): Promise<ClipIndex> {
  manifest ??= fetch('/examiner/manifest.json')
    .then((r) => (r.ok ? (r.json() as Promise<{ voices?: ClipIndex }>) : { voices: {} }))
    .then((m) => m.voices ?? {})
    .catch(() => ({}) as ClipIndex);
  return manifest;
}

const clipUrls = new Map<string, string>();
let player: HTMLAudioElement | null = null;
// A silent, valid WAV used to unlock audio inside the student's tap (iOS and Safari need that).
const SILENCE = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';

/** Call this synchronously from the student's tap, before any await, so later clips may play on their own. */
export function unlockAudio() {
  player ??= new Audio();
  player.src = SILENCE;
  void player.play().catch(() => undefined);
}

/** Downloads clips ahead of time so each line starts the moment the examiner reaches it. */
export async function preloadClips(paths: string[]): Promise<void> {
  await Promise.all(
    paths.map(async (path) => {
      if (clipUrls.has(path)) return;
      try {
        const res = await fetch(`/examiner/${path}`);
        if (res.ok) clipUrls.set(path, URL.createObjectURL(await res.blob()));
      } catch {
        // Not cached: it is fetched when played, or the browser voice covers it.
      }
    }),
  );
}

/** Bumped by stopSpeaking(); a line that was cut off must not be read again in the browser voice. */
let epoch = 0;
let release: (() => void) | null = null;

/** Plays one recorded clip to the end. Resolves false if it could not be played to the end. */
function playClip(path: string): Promise<boolean> {
  release?.();
  return new Promise((resolve) => {
    const audio = (player ??= new Audio());
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(guard);
      if (release === stop) release = null;
      resolve(ok);
    };
    const stop = () => finish(false);
    release = stop;
    const guard = window.setTimeout(() => finish(false), 60_000);
    audio.onended = () => finish(true);
    audio.onerror = () => finish(false);
    // A clip that reaches its end fires `pause` just before `ended`; only an early pause is a cut-off.
    audio.onpause = () => !audio.ended && finish(false);
    audio.src = clipUrls.get(path) ?? `/examiner/${path}`;
    audio.play().catch(() => finish(false));
  });
}

/**
 * The examiner says one line. A recorded clip is used when there is one;
 * otherwise (or if it cannot play) the browser's own voice reads it. A line
 * that was stopped on purpose is never read again by the fallback.
 */
export async function sayLine(text: string, isCancelled: () => boolean, clip?: string): Promise<void> {
  const started = epoch;
  if (clip && (await playClip(clip))) return;
  if (epoch !== started || isCancelled()) return;
  for (const part of sentences(text)) {
    if (epoch !== started || isCancelled()) return;
    await speakOne(part);
    await sleep(180);
  }
}

export const stopSpeaking = () => {
  epoch++;
  player?.pause();
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
};

// ---------------------------------------------------------------- the student's microphone

export interface Mic {
  /** Current loudness, 0–1. */
  level: () => number;
  close: () => void;
}

/** Opens the microphone once for the whole test. Audio is only measured here; nothing is recorded or sent. */
export async function openMic(): Promise<Mic> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 1024;
  ctx.createMediaStreamSource(stream).connect(analyser);
  const buffer = new Float32Array(analyser.fftSize);
  return {
    level: () => {
      analyser.getFloatTimeDomainData(buffer);
      return frameRms(buffer);
    },
    close: () => {
      stream.getTracks().forEach((track) => track.stop());
      void ctx.close().catch(() => undefined);
    },
  };
}

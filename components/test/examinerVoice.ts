import { frameRms } from '@/lib/ielts';
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

/** Reads one line aloud, a sentence at a time (long utterances are cut short by some browsers). */
export async function sayLine(text: string, isCancelled: () => boolean): Promise<void> {
  for (const part of sentences(text)) {
    if (isCancelled()) return;
    await speakOne(part);
    await sleep(180);
  }
}

export const stopSpeaking = () => {
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

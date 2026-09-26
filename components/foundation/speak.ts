/** Reads English text aloud with the browser voice. Resolves when finished (or at once if unsupported). */
export function speak(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return resolve();
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voice = synth.getVoices().find((v) => v.lang.replace('_', '-') === 'en-GB') ?? synth.getVoices().find((v) => v.lang.startsWith('en'));
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? 'en-GB';
    u.rate = 0.92;
    const guard = window.setTimeout(resolve, 3000 + text.length * 120);
    u.onend = u.onerror = () => {
      window.clearTimeout(guard);
      resolve();
    };
    synth.speak(u);
  });
}

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Minimal typing for the Web Speech API (Chrome, Edge, Android, recent Safari).
interface RecognitionResultEvent {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
}
interface Recognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}

function getRecognitionCtor(): (new () => Recognition) | undefined {
  if (typeof window === 'undefined') return undefined;
  const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export const speechRecognitionSupported = () => Boolean(getRecognitionCtor());

/** Phones share one microphone between apps and the speech service, so a second capture can silence the first. */
export const isMobileDevice = () => typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

/** What went wrong, in terms a student can act on. */
export type SpeechError = 'permission' | 'mic' | 'network' | 'failed';

/**
 * Speech-to-text for Speaking practice. Audio is processed by the browser's
 * speech service; nothing is recorded or uploaded by Mino.
 */
export function useSpeechRecognition(lang = 'en-US', { keepAlive = false }: { keepAlive?: boolean } = {}) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<SpeechError | null>(null);
  const recognition = useRef<Recognition | null>(null);
  const finalText = useRef('');
  // Browsers end recognition after a pause; for long answers keep it going until stop().
  const wanted = useRef(false);
  // A blocked or missing microphone will not fix itself on restart; do not loop on it.
  const fatal = useRef(false);

  useEffect(() => setSupported(Boolean(getRecognitionCtor())), []);

  const start = useCallback(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) return;
    setError(null);
    fatal.current = false;
    finalText.current = '';
    setTranscript('');
    const r = new Ctor();
    r.lang = lang;
    r.continuous = true;
    r.interimResults = true;
    r.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finalText.current += `${res[0].transcript} `;
        else interim += res[0].transcript;
      }
      setTranscript(`${finalText.current}${interim}`.trim());
    };
    r.onerror = (e) => {
      // Silence and a deliberate stop are normal, not failures.
      if (e.error === 'no-speech' || e.error === 'aborted') return;
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed' || e.error === 'audio-capture') fatal.current = true;
      setError(e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'permission' : e.error === 'audio-capture' ? 'mic' : e.error === 'network' ? 'network' : 'failed');
    };
    r.onend = () => {
      if (keepAlive && wanted.current && !fatal.current) {
        try {
          r.start();
          return;
        } catch {
          // fall through: could not restart
        }
      }
      setListening(false);
    };
    recognition.current = r;
    wanted.current = true;
    try {
      r.start();
      setListening(true);
    } catch {
      wanted.current = false;
      setError('failed');
    }
  }, [lang, keepAlive]);

  const stop = useCallback(() => {
    wanted.current = false;
    recognition.current?.stop();
    setListening(false);
  }, []);

  useEffect(
    () => () => {
      wanted.current = false;
      recognition.current?.stop();
    },
    [],
  );

  return { supported, listening, transcript, setTranscript, error, start, stop };
}

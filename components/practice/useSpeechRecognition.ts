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

/**
 * Speech-to-text for Speaking practice. Audio is processed by the browser's
 * speech service; nothing is recorded or uploaded by Vocab Brain.
 */
export function useSpeechRecognition(lang = 'en-US', { keepAlive = false }: { keepAlive?: boolean } = {}) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognition = useRef<Recognition | null>(null);
  const finalText = useRef('');
  // Browsers end recognition after a pause; for long answers keep it going until stop().
  const wanted = useRef(false);

  useEffect(() => setSupported(Boolean(getRecognitionCtor())), []);

  const start = useCallback(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) return;
    setError(null);
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
    r.onerror = (e) => setError(e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'permission' : 'failed');
    r.onend = () => {
      if (keepAlive && wanted.current) {
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
    r.start();
    setListening(true);
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

'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { completeVoices, DEFAULT_EXAMINER_VOICE, EXAMINER_ACCENTS, lineKey, type ExaminerAccent, type ExaminerVoice } from '@/lib/ielts';
import { cn } from '@/lib/utils';
import { loadClipIndex, preloadClips, sayLine, stopSpeaking, unlockAudio } from './examinerVoice';

const VOICE_KEY = 'vocabbrain:examinerVoice';

/**
 * The recorded voices that can say every line of this test, and which one the
 * student has chosen. A voice is chosen once and used for the whole test.
 */
export function useExaminerVoices(lines: string[]) {
  const [available, setAvailable] = useState<ExaminerVoice[]>([]);
  const [saved, setSaved] = useState<string | undefined>(undefined);
  const [index, setIndex] = useState<Record<string, Record<string, string>>>({});
  const keys = useMemo(() => lines.map(lineKey), [lines]);

  useEffect(() => {
    let cancelled = false;
    void loadClipIndex().then((clips) => {
      if (cancelled) return;
      setIndex(clips);
      setAvailable(completeVoices(clips, keys));
    });
    try {
      setSaved(window.localStorage.getItem(VOICE_KEY) ?? undefined);
    } catch {
      // Storage blocked: the default applies.
    }
    return () => {
      cancelled = true;
    };
  }, [keys]);

  const voice = available.find((v) => v.id === saved) ?? available.find((v) => v.id === DEFAULT_EXAMINER_VOICE) ?? available[0];
  const choose = (id: string) => {
    setSaved(id);
    try {
      window.localStorage.setItem(VOICE_KEY, id);
    } catch {
      // Not remembered; it still applies for this visit.
    }
  };
  /** The recorded clip for a line in the chosen voice, if there is one. */
  const voiceId = voice?.id;
  const clipFor = useCallback((line: string) => (voiceId ? index[voiceId]?.[lineKey(line)] : undefined), [voiceId, index]);
  return { available, voice, choose, clipFor };
}

/** Accent first, then the voices of that accent. Choosing a voice lets the student hear it. */
export function ExaminerVoicePicker({ voices, voice, sample, onChoose }: { voices: ExaminerVoice[]; voice: ExaminerVoice | undefined; sample: string; onChoose: (id: string) => void }) {
  const { t } = useLocale();
  const accents = EXAMINER_ACCENTS.filter((a) => voices.some((v) => v.accent === a));
  const [accent, setAccent] = useState<ExaminerAccent | undefined>(undefined);
  const active = accent ?? voice?.accent ?? accents[0];
  if (!voices.length || !active) return null;

  const hear = async (v: ExaminerVoice) => {
    // Inside the tap, so the browser lets the clip play.
    unlockAudio();
    stopSpeaking();
    const clips = await loadClipIndex();
    const path = clips[v.id]?.[lineKey(sample)];
    if (!path) return;
    await preloadClips([path]);
    await sayLine(sample, () => false, path);
  };

  const pick = (v: ExaminerVoice) => {
    onChoose(v.id);
    void hear(v);
  };

  return (
    <div className="space-y-2" data-testid="examiner-voice">
      <p className="px-1 text-sm font-medium">{t('tests.speaking.examiner.voiceLabel')}</p>
      <div role="radiogroup" aria-label={t('tests.speaking.examiner.accentLabel')} className="grid gap-1 rounded-xl bg-muted p-1" style={{ gridTemplateColumns: `repeat(${accents.length}, minmax(0, 1fr))` }}>
        {accents.map((a) => (
          <button
            key={a}
            type="button"
            role="radio"
            aria-checked={active === a}
            data-accent={a}
            onClick={() => {
              setAccent(a);
              const first = voices.find((v) => v.accent === a);
              if (first && voice?.accent !== a) pick(first);
            }}
            className={cn('h-10 rounded-lg px-2 text-[13px] font-medium transition-colors', active === a ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
          >
            {t(`tests.speaking.examiner.accent.${a}`)}
          </button>
        ))}
      </div>
      <div role="radiogroup" aria-label={t('tests.speaking.examiner.voiceLabel')} className="flex flex-wrap gap-2">
        {voices
          .filter((v) => v.accent === active)
          .map((v) => (
            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={voice?.id === v.id}
              data-voice={v.id}
              onClick={() => pick(v)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                voice?.id === v.id ? 'border-brand bg-brand-soft font-medium text-brand' : 'bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {v.name} <span className="text-xs opacity-70">· {t(`tests.speaking.examiner.gender.${v.gender}`)}</span>
            </button>
          ))}
      </div>
      <p className="px-1 text-xs text-muted-foreground">{t('tests.speaking.examiner.voiceHint')}</p>
    </div>
  );
}


'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Callout, Panel, StatusChip } from '@/components/ds';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { lookupWord, unknownWordInfo } from '@/lib/content/dictionary';
import type { Passage } from '@/lib/content/passages';
import { lemmaCandidates } from '@/lib/content/dictionary';
import { wordId } from '@/lib/engine';
import type { WordInfo } from '@/lib/models';
import { cn } from '@/lib/utils';
import { sentenceAt, tokenize } from './tokenize';
import { WordCard } from './WordCard';

interface Selection {
  key: string;
  token: string;
  sentence: string;
}

export function PassageReader({ passage, onFinish }: { passage: Passage; onFinish: (saved: number) => void }) {
  const { t } = useLocale();
  const brain = useBrain();
  const [selection, setSelection] = useState<Selection | null>(null);
  const [info, setInfo] = useState<WordInfo | undefined>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedHere, setSavedHere] = useState<string[]>([]);
  const requestId = useRef(0);

  const savedLemmas = new Set(brain.words.map((w) => w.lemma));
  const isSaved = (token: string) => lemmaCandidates(token).some((c) => savedLemmas.has(c));

  const select = useCallback(
    async (key: string, token: string, sentence: string) => {
      setSelection({ key, token, sentence });
      setInfo(undefined);
      setLoading(true);
      const id = ++requestId.current;
      const result = await lookupWord(token, passage.glossary);
      if (id !== requestId.current) return;
      setInfo(result);
      setLoading(false);
    },
    [passage.glossary],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelection(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const save = async () => {
    if (!selection) return;
    setSaving(true);
    try {
      const word = await brain.save(
        info ?? unknownWordInfo(selection.token),
        { type: 'reading-passage', title: passage.title, passageId: passage.id, licenseStatus: passage.licenseStatus },
        selection.sentence,
      );
      setSavedHere((prev) => (prev.includes(word.id) ? prev : [...prev, word.id]));
      toast.success(t('reading.savedToast', { word: word.word }));
    } catch {
      toast.error(t('reading.saveError'));
    } finally {
      setSaving(false);
    }
  };

  const selectedSavedId = selection
    ? brain.words.find((w) => lemmaCandidates(selection.token).includes(w.lemma) || (info && w.id === wordId(info.lemma)))?.id
    : undefined;

  return (
    <div className="pb-40">
      <Callout tone="brand" icon={Sparkles} className="mb-6">
        {t('reading.hint')}
      </Callout>

      <article className="max-w-[68ch] space-y-5 text-[17px] leading-[1.8] text-foreground/90" lang="en">
        {passage.paragraphs.map((paragraph, pi) => (
          <p key={pi}>
            {tokenize(paragraph).map((tok, ti) => {
              if (!tok.isWord) return <span key={ti}>{tok.text}</span>;
              const key = `${pi}:${ti}`;
              const active = selection?.key === key;
              const saved = isSaved(tok.text);
              return (
                <button
                  key={ti}
                  type="button"
                  onClick={() => select(key, tok.text, sentenceAt(paragraph, tok.start))}
                  className={cn(
                    'rounded-[3px] px-[1px] text-left transition-colors hover:bg-brand-soft focus-visible:bg-brand-soft focus-visible:outline-none',
                    saved && 'underline decoration-brand decoration-2 underline-offset-4',
                    active && 'bg-brand-soft text-brand',
                  )}
                >
                  {tok.text}
                </button>
              );
            })}
          </p>
        ))}
      </article>

      <Panel className="mt-10 flex max-w-[68ch] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <StatusChip tone="brand">{t('reading.savedCount', { n: savedHere.length })}</StatusChip>
        </div>
        <Button onClick={() => onFinish(savedHere.length)}>
          <CheckCircle2 /> {t('reading.finish')}
        </Button>
      </Panel>
      <p className="mt-3 max-w-[68ch] text-xs text-muted-foreground">
        {t('reading.provenance', { source: passage.source })}{' '}
        <Link href="/ielts/vocabulary/notebook" className="underline underline-offset-4">
          {t('reading.openNotebook')}
        </Link>
      </p>

      {selection && (
        <WordCard
          token={selection.token}
          sentence={selection.sentence}
          info={info}
          loading={loading}
          savedId={selectedSavedId}
          saving={saving}
          onSave={save}
          onDismiss={() => setSelection(null)}
        />
      )}
    </div>
  );
}

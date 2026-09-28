'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Callout, Panel, StatusChip } from '@/components/ds';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { unknownWordInfo } from '@/lib/content/dictionary';
import type { Passage } from '@/lib/content/passages';
import { lemmaCandidates } from '@/lib/content/dictionary';
import { wordId } from '@/lib/engine';
import { cn } from '@/lib/utils';
import { keepWordVisible } from './CardFrame';
import { sentenceAt, tokenize } from './tokenize';
import { MeaningCard } from './MeaningCard';
import { meaningWordInfo, resultLemma, useMeaningLookup } from './word-meaning';

interface Selection {
  key: string;
  token: string;
  sentence: string;
}

export function PassageReader({ passage, onFinish }: { passage: Passage; onFinish: (saved: number) => void }) {
  const { t } = useLocale();
  const brain = useBrain();
  const [selection, setSelection] = useState<Selection | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedHere, setSavedHere] = useState<string[]>([]);
  const meaning = useMeaningLookup(passage.id);

  const savedLemmas = new Set(brain.words.map((w) => w.lemma));
  const isSaved = (token: string) => lemmaCandidates(token).some((c) => savedLemmas.has(c));

  // Any word: Mino explains it in this sentence (cached per word for this passage).
  const select = useCallback(
    (key: string, token: string, sentence: string) => {
      setSelection({ key, token, sentence });
      void meaning.lookup(token, sentence);
    },
    [meaning],
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
      const r = meaning.result;
      const word = await brain.save(
        r?.kind === 'mino' ? meaningWordInfo(r.meaning) : (r?.info ?? unknownWordInfo(selection.token)),
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
    ? brain.words.find((w) => lemmaCandidates(selection.token).includes(w.lemma) || (resultLemma(meaning.result) && w.id === wordId(resultLemma(meaning.result)!)))?.id
    : undefined;

  return (
    <div className={cn('pb-40', selection && 'pb-[60dvh]')}>
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
                  onClick={(e) => { keepWordVisible(e.currentTarget); select(key, tok.text, sentenceAt(paragraph, tok.start)); }}
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
        <MeaningCard
          token={selection.token}
          result={meaning.result}
          savedId={selectedSavedId}
          saving={saving}
          onSave={save}
          onDismiss={() => setSelection(null)}
        />
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Panel } from '@/components/ds';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { BrainWord } from '@/lib/models';

/**
 * Shown in place of a Writing/Speaking prompt (or on the word page) when a
 * saved word has no meaning. Mino does not invent one: the learner writes their
 * own, which is saved on the word and nothing else.
 */
export function MeaningEditor({ word, onSkip }: { word: BrainWord; onSkip?: () => void }) {
  const { t } = useLocale();
  const brain = useBrain();
  const [en, setEn] = useState('');
  const [bn, setBn] = useState('');
  const [state, setState] = useState<'idle' | 'saving' | 'error' | 'short'>('idle');

  const save = async () => {
    if (en.trim().length < 2 && bn.trim().length < 2) {
      setState('short');
      return;
    }
    setState('saving');
    try {
      await brain.completeMeaning(word.id, { meaning: en.trim().length >= 2 ? en : undefined, meaningBn: bn.trim().length >= 2 ? bn : undefined });
      setState('idle');
    } catch {
      setState('error');
    }
  };

  return (
    <Panel className="space-y-4" data-testid="meaning-editor">
      <div className="space-y-1">
        <p className="flex items-center gap-2 text-lg font-semibold">
          <PencilLine className="size-5 text-brand" aria-hidden /> {t('brain.meaningEditor.title', { word: word.word })}
        </p>
        <p className="text-[15px] text-muted-foreground">{t('brain.meaningEditor.body')}</p>
        {word.originalSentence && (
          <p className="rounded-xl bg-muted/60 px-3 py-2 text-[15px]" lang="en">
            “{word.originalSentence}”
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="meaning-en" className="text-sm font-medium">
          {t('brain.meaningEditor.en')}
        </label>
        <Textarea id="meaning-en" rows={2} lang="en" value={en} onChange={(e) => setEn(e.target.value)} className="rounded-xl bg-card text-base" maxLength={300} />
        <label htmlFor="meaning-bn" className="text-sm font-medium">
          {t('brain.meaningEditor.bn')}
        </label>
        <Textarea id="meaning-bn" rows={2} value={bn} onChange={(e) => setBn(e.target.value)} className="rounded-xl bg-card text-base" maxLength={300} />
      </div>
      {state === 'short' && (
        <p className="text-sm text-warning" role="status">
          {t('brain.meaningEditor.tooShort')}
        </p>
      )}
      {state === 'error' && (
        <p className="text-sm text-destructive" role="alert">
          {t('brain.meaningEditor.error')}
        </p>
      )}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button onClick={save} disabled={state === 'saving'} data-testid="meaning-save">
          {state === 'saving' ? t('brain.meaningEditor.saving') : t('brain.meaningEditor.save')}
        </Button>
        {onSkip && (
          <Button variant="ghost" onClick={onSkip}>
            {t('brain.meaningEditor.other')}
          </Button>
        )}
      </div>
    </Panel>
  );
}

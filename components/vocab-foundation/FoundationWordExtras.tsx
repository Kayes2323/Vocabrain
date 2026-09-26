'use client';

import { Panel, ProgressBar, Section } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useText } from '@/components/foundation/useFoundation';
import type { BrainWord } from '@/lib/models';
import { getFoundationWord } from '@/lib/vocab-foundation';

/** Extra teaching data for course words on the Word Detail page: pronunciation, family, IELTS use, the student's sentence. */
export function FoundationWordExtras({ word }: { word: BrainWord }) {
  const { t } = useLocale();
  const text = useText();
  const fw = getFoundationWord(word.id);
  const lastUse = [...word.usageHistory].reverse()[0];
  return (
    <>
      {fw && (
        <Section title={t('vocabFoundation.word.whyWord')}>
          <Panel className="space-y-3">
            <p className="text-sm">
              <span className="font-semibold">{t('vocabFoundation.word.pronunciation')}: </span>
              <span lang="en">{fw.ipa}</span> · <span className="text-muted-foreground">{fw.partOfSpeech}</span>
            </p>
            <p className="text-sm">{text(fw.why)}</p>
            {fw.synonymNote && (
              <p className="rounded-lg bg-amber-500/10 p-3 text-sm">
                <span className="font-semibold">{t('vocabFoundation.word.synonymNote')}: </span>
                {text(fw.synonymNote)}
              </p>
            )}
            {fw.family?.length ? (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground">{t('vocabFoundation.session.family')}</p>
                {fw.family.map((f) => (
                  <p key={f.word} className="text-sm" lang="en">
                    <span className="font-semibold">{f.word}</span> <span className="text-muted-foreground">({f.pos})</span> — {f.example}
                  </p>
                ))}
              </div>
            ) : null}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">{t('vocabFoundation.word.ielts')}</p>
              {fw.ielts.map((u) => (
                <div key={u.skill} className="text-sm">
                  <span className="font-semibold text-brand">{t(`vocabFoundation.word.skill.${u.skill}`)}: </span>
                  <span lang="en">“{u.example}”</span> <span className="text-muted-foreground">— {text(u.note)}</span>
                </div>
              ))}
            </div>
          </Panel>
        </Section>
      )}
      {(lastUse || word.recallCount > 0) && (
        <Panel className="space-y-3">
          {word.recallCount > 0 && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>{t('vocabFoundation.word.confidence')}</span>
                <span className="tabular-nums text-muted-foreground">{word.confidence ?? 0}%</span>
              </div>
              <ProgressBar value={word.confidence ?? 0} label={t('vocabFoundation.word.confidence')} size="sm" />
            </div>
          )}
          {lastUse && (
            <p className="text-sm">
              <span className="font-semibold">{t('vocabFoundation.word.yourSentence')}: </span>
              <span lang="en">“{lastUse.text}”</span> {lastUse.correct ? '✓' : ''}
            </p>
          )}
        </Panel>
      )}
    </>
  );
}

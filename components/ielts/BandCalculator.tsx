'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Callout, Panel } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { IELTS_SKILLS, type IELTSSkill } from '@/lib/constants';
import { formatBand, overallBand } from '@/lib/engine';

type Scores = Record<IELTSSkill, number>;

export function BandCalculator() {
  const { t } = useLocale();
  const { profile, updateProfile } = useProfile();
  const [scores, setScores] = useState<Scores>(() => ({
    listening: profile?.ielts.currentBands.listening ?? 6,
    reading: profile?.ielts.currentBands.reading ?? 6,
    writing: profile?.ielts.currentBands.writing ?? 6,
    speaking: profile?.ielts.currentBands.speaking ?? 6,
  }));
  const [saved, setSaved] = useState(false);

  const overall = overallBand(scores);

  const save = () => {
    updateProfile((p) => ({ ...p, ielts: { ...p.ielts, currentBands: { ...scores } } }));
    setSaved(true);
  };

  return (
    <div className="max-w-xl space-y-5">
      <Panel className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{t('calculator.overall')}</p>
          <p className="text-4xl font-semibold tabular-nums" aria-live="polite">
            {formatBand(overall)}
          </p>
        </div>
        <p className="max-w-[12rem] text-right text-sm text-muted-foreground">
          {t('calculator.rule')}
        </p>
      </Panel>

      <Panel className="space-y-6">
        {IELTS_SKILLS.map((skill) => (
          <div key={skill} className="space-y-3">
            <div className="flex items-center justify-between">
              <label id={`${skill}-label`} className="font-medium">
                {t(`skills.${skill}`)}
              </label>
              <span className="text-lg font-semibold tabular-nums">{formatBand(scores[skill])}</span>
            </div>
            <Slider
              aria-labelledby={`${skill}-label`}
              min={1}
              max={9}
              step={0.5}
              value={[scores[skill]]}
              onValueChange={([v]) => {
                setScores((s) => ({ ...s, [skill]: v }));
                setSaved(false);
              }}
            />
          </div>
        ))}
      </Panel>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button size="lg" onClick={save} disabled={saved}>
          {saved ? (
            <>
              <Check /> {t('calculator.saved')}
            </>
          ) : (
            t('calculator.use')
          )}
        </Button>
        <p className="text-sm text-muted-foreground">{t('calculator.useNote')}</p>
      </div>

      <Callout>
        {t('calculator.disclaimer')}
      </Callout>
    </div>
  );
}

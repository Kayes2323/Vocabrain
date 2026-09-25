'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Callout, Panel } from '@/components/ds';
import { useProfile } from '@/components/providers/ProfileProvider';
import { IELTS_SKILLS, IELTS_SKILL_LABELS, type IELTSSkill } from '@/lib/constants';
import { formatBand, overallBand } from '@/lib/engine';

type Scores = Record<IELTSSkill, number>;

export function BandCalculator() {
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
    <div className="space-y-5">
      <Panel className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Overall band</p>
          <p className="text-4xl font-semibold tabular-nums" aria-live="polite">
            {formatBand(overall)}
          </p>
        </div>
        <p className="max-w-[12rem] text-right text-sm text-muted-foreground">
          Average of four skills, rounded to the nearest half band.
        </p>
      </Panel>

      <Panel className="space-y-6">
        {IELTS_SKILLS.map((skill) => (
          <div key={skill} className="space-y-3">
            <div className="flex items-center justify-between">
              <label id={`${skill}-label`} className="font-medium">
                {IELTS_SKILL_LABELS[skill]}
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
              <Check /> Saved to your profile
            </>
          ) : (
            'Use as my current scores'
          )}
        </Button>
        <p className="text-sm text-muted-foreground">Your plan and Mino use these to decide where to focus.</p>
      </div>

      <Callout>
        This is an estimate. Official scores come only from an IELTS test.
      </Callout>
    </div>
  );
}

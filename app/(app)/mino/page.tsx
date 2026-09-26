'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { ScreenSkeleton, Section } from '@/components/ds';
import { MinoChat } from '@/components/mino/MinoChat';
import { MinoContextSummary } from '@/components/mino/MinoContextSummary';
import { MinoMemoryList } from '@/components/mino/MinoMemoryList';
import { NextActionList } from '@/components/mino/NextActionList';
import { MinoMark } from '@/components/shell/MinoMark';
import { useBrainContext } from '@/components/brain/useBrainContext';
import { buildMinoContext } from '@/lib/ai/context';
import { MINO } from '@/lib/constants';
import { getMinoInsight, getNextActions } from '@/lib/engine';

export default function MinoPage() {
  const { t, m } = useLocale();
  const { profile } = useProfile();
  const brain = useBrainContext();
  if (!profile || brain.loading) return <ScreenSkeleton />;

  const context = buildMinoContext(profile, brain);

  return (
    <div className="space-y-8">
      <header className="flex items-start gap-4">
        <MinoMark size="lg" />
        <div className="space-y-1 pt-1">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{MINO.name}</h1>
          <p className="text-[15px] text-muted-foreground">{t('mino.role')}</p>
        </div>
      </header>

      <p className="max-w-2xl text-lg text-pretty">{profile.displayName ? `${profile.displayName}, ` : ''}
        {m(getMinoInsight(profile, brain))}</p>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="space-y-8">
          <Section title={t('mino.nextSteps')}>
            <NextActionList actions={getNextActions(profile, brain)} />
          </Section>
          <Section title={t('mino.ask')}>
            <MinoChat context={context} />
          </Section>
        </div>
        <Section title={t('mino.knows')}>
          <div className="space-y-6">
            <MinoContextSummary context={context} />
            <MinoMemoryList />
          </div>
        </Section>
      </div>
    </div>
  );
}

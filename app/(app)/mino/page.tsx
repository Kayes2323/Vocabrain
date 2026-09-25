'use client';

import { useProfile } from '@/components/providers/ProfileProvider';
import { ScreenSkeleton, Section } from '@/components/ds';
import { MinoChat } from '@/components/mino/MinoChat';
import { MinoContextSummary } from '@/components/mino/MinoContextSummary';
import { NextActionList } from '@/components/mino/NextActionList';
import { MinoMark } from '@/components/shell/MinoMark';
import { buildMinoContext } from '@/lib/ai/context';
import { MINO } from '@/lib/constants';
import { getMinoInsight, getNextActions } from '@/lib/engine';

export default function MinoPage() {
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;

  const actions = getNextActions(profile);
  const context = buildMinoContext(profile);

  return (
    <div className="space-y-8">
      <header className="flex items-start gap-4">
        <MinoMark size="lg" />
        <div className="space-y-1 pt-1">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{MINO.name}</h1>
          <p className="text-[15px] text-muted-foreground">{MINO.role}</p>
        </div>
      </header>

      <p className="text-lg text-pretty">{getMinoInsight(profile)}</p>

      <Section title="Your next 3 actions">
        <NextActionList actions={actions} />
      </Section>

      <Section title={`Ask ${MINO.name}`}>
        <MinoChat context={context} />
      </Section>

      <Section title={`What ${MINO.name} knows about you`}>
        <MinoContextSummary context={context} />
      </Section>
    </div>
  );
}

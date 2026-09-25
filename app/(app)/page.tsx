'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { Callout, ScreenSkeleton } from '@/components/ds';
import { AbroadProgressCard } from '@/components/home/AbroadProgressCard';
import { IELTSJourneyCard } from '@/components/home/IELTSJourneyCard';
import { MinoInsightCard } from '@/components/home/MinoInsightCard';
import { TodayPlanCard } from '@/components/home/TodayPlanCard';

function greeting(date = new Date()): string {
  const h = date.getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function firstName(name: string | null | undefined, email: string | null | undefined): string | undefined {
  const source = name || email?.split('@')[0];
  if (!source) return undefined;
  const first = source.split(/[\s._-]/)[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export default function HomePage() {
  const { user, isDemo } = useAuth();
  const { profile } = useProfile();

  if (!profile) return <ScreenSkeleton />;

  const name = isDemo ? undefined : firstName(profile.displayName ?? user?.displayName, user?.email);

  return (
    <div className="space-y-5">
      <header className="space-y-1 pb-1">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {greeting()}
          {name ? `, ${name}` : ''} 👋
        </h1>
        <p className="text-[15px] text-muted-foreground">Here&apos;s what to do today.</p>
      </header>

      {isDemo && (
        <Callout tone="warning" title="Guest preview">
          You&apos;re exploring without an account. Progress is saved on this device only.
        </Callout>
      )}

      <IELTSJourneyCard profile={profile} />
      <TodayPlanCard profile={profile} />
      <MinoInsightCard profile={profile} />
      <AbroadProgressCard profile={profile} />
    </div>
  );
}

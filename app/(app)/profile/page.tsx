'use client';

import { Calculator, Crown, GraduationCap, LogOut, Plane } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useUpgrade } from '@/components/providers/UpgradeProvider';
import { Callout, ListRow, PageHeader, Panel, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { DEGREE_LEVELS } from '@/lib/constants';
import { formatBand, formatIntake } from '@/lib/engine';

export default function ProfilePage() {
  const { user, isDemo, isPremium, subscription, signOut } = useAuth();
  const { profile } = useProfile();
  const { openUpgrade } = useUpgrade();

  if (!profile || !user) return <ScreenSkeleton />;

  const name = user.displayName || user.email?.split('@')[0] || 'Guest';
  const { ielts, abroad } = profile;
  const degree = DEGREE_LEVELS.find((d) => d.id === abroad.degreeLevel)?.label;

  return (
    <div className="space-y-8">
      <PageHeader title="Profile" />

      <Panel className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
          {name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold">{name}</p>
          <p className="truncate text-sm text-muted-foreground">{user.email ?? 'Guest session on this device'}</p>
        </div>
        <StatusChip tone={isPremium ? 'brand' : 'neutral'}>
          {isPremium ? (subscription?.isAdmin ? 'Admin' : 'Premium') : 'Free'}
        </StatusChip>
      </Panel>

      {isDemo && (
        <Callout tone="warning" title="Guest preview">
          Sign-in is disabled because Firebase isn&apos;t configured. Your goals are stored on this device only.
        </Callout>
      )}

      <Section title="My goals" description="Mino and your plan use these to personalise everything.">
        <RowGroup>
          <ListRow
            href="/setup/ielts"
            icon={GraduationCap}
            iconTone="brand"
            title="IELTS goal"
            description={
              ielts.targetBand !== undefined
                ? `Target ${formatBand(ielts.targetBand)}${ielts.testDate ? ` · Test ${new Date(`${ielts.testDate.slice(0, 10)}T00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}`
                : 'Not set yet'
            }
          />
          <ListRow
            href="/setup/abroad"
            icon={Plane}
            iconTone="brand"
            title="Study abroad goal"
            description={[degree, abroad.subject, formatIntake(abroad)].filter(Boolean).join(' · ') || 'Not set yet'}
          />
        </RowGroup>
      </Section>

      <Section title="Membership">
        <RowGroup>
          {isPremium ? (
            <ListRow icon={Crown} iconTone="brand" title="Premium is active" description="All lessons and word-bank bands are unlocked." />
          ) : (
            <ListRow
              onClick={openUpgrade}
              icon={Crown}
              iconTone="warning"
              title="Upgrade to Premium"
              description="Every topic lesson and Bands 7–9."
            />
          )}
        </RowGroup>
      </Section>

      <Section title="Tools">
        <RowGroup>
          <ListRow href="/ielts/band-calculator" icon={Calculator} title="Band score calculator" />
        </RowGroup>
      </Section>

      {!isDemo && (
        <RowGroup>
          <ListRow onClick={signOut} icon={LogOut} iconTone="danger" title="Sign out" />
        </RowGroup>
      )}
    </div>
  );
}

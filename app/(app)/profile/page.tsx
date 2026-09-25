'use client';

import { useState } from 'react';
import { Calculator, Compass, Crown, GraduationCap, LogIn, LogOut, Plane } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/providers/AuthProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useSetLanguage } from '@/components/providers/useSetLanguage';
import { useUpgrade } from '@/components/providers/UpgradeProvider';
import { Callout, ChoiceGrid, ListRow, PageHeader, Panel, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { formatBand, formatIntake, overallBand } from '@/lib/engine';

export default function ProfilePage() {
  const { t, locale } = useLocale();
  const { user, isGuest, canSignIn, isPremium, subscription, signOut } = useAuth();
  const { profile, updateProfile } = useProfile();
  const { openUpgrade } = useUpgrade();
  const setLanguage = useSetLanguage();
  const [name, setName] = useState<string | null>(null);

  if (!profile || !user) return <ScreenSkeleton />;

  const displayName = profile.displayName || user.displayName || user.email?.split('@')[0] || 'Guest';
  const { ielts, abroad } = profile;
  const testDate = ielts.testDate
    ? new Date(`${ielts.testDate.slice(0, 10)}T00:00`).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : undefined;
  const ieltsSummary =
    ielts.targetBand !== undefined
      ? [t('profile.ieltsGoalValue', { band: formatBand(ielts.targetBand) }), testDate && t('profile.testOn', { date: testDate })]
          .filter(Boolean)
          .join(' · ')
      : t('common.notSetYet');
  const abroadSummary =
    [abroad.degreeLevel ? t(`degree.${abroad.degreeLevel}`) : undefined, abroad.subject, formatIntake(abroad)]
      .filter(Boolean)
      .join(' · ') || t('common.notSetYet');
  const estimate = overallBand(ielts.currentBands);
  const planLabel = isPremium ? (subscription?.isAdmin ? t('profile.plan.admin') : t('profile.plan.premium')) : t('profile.plan.free');

  const saveName = () => {
    if (name === null) return;
    const trimmed = name.trim();
    updateProfile((p) => ({ ...p, displayName: trimmed || undefined }));
    setName(null);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <PageHeader title={t('profile.title')} />

      <Panel className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
          {displayName.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold">{displayName}</p>
          <p className="truncate text-sm text-muted-foreground">{user.email ?? t('profile.guestTitle')}</p>
        </div>
        <StatusChip tone={isPremium ? 'brand' : 'neutral'}>{planLabel}</StatusChip>
      </Panel>

      {isGuest && (
        <Callout tone="warning" title={t('profile.guestTitle')}>
          {t('profile.guestBody')}
        </Callout>
      )}

      <Section title={t('profile.settings')}>
        <Panel className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-medium">{t('profile.language')}</p>
            <ChoiceGrid
              label={t('profile.language')}
              columns={2}
              value={locale}
              onChange={setLanguage}
              options={[
                { value: 'bn', label: 'বাংলা' },
                { value: 'en', label: 'English' },
              ]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="display-name">{t('profile.name')}</Label>
            <Input
              id="display-name"
              className="h-11"
              placeholder={t('profile.namePlaceholder')}
              value={name ?? profile.displayName ?? ''}
              onChange={(e) => setName(e.target.value)}
              onBlur={saveName}
              onKeyDown={(e) => e.key === 'Enter' && saveName()}
              autoComplete="given-name"
            />
          </div>
        </Panel>
      </Section>

      <Section title={t('profile.goals')} description={t('profile.goalsDesc')}>
        <RowGroup>
          <ListRow href="/setup/ielts" icon={GraduationCap} iconTone="brand" title={t('profile.ieltsGoal')} description={ieltsSummary} />
          <ListRow
            href="/ielts/diagnostic"
            icon={Compass}
            iconTone="brand"
            title={t('profile.startingPoint')}
            description={estimate !== undefined ? t('profile.startingPointValue', { band: formatBand(estimate) }) : t('common.notSetYet')}
          />
          <ListRow href="/setup/abroad" icon={Plane} iconTone="brand" title={t('profile.abroadGoal')} description={abroadSummary} />
        </RowGroup>
      </Section>

      <Section title={t('profile.membership')}>
        <RowGroup>
          {isPremium ? (
            <ListRow icon={Crown} iconTone="brand" title={t('profile.premiumActive')} description={t('profile.premiumActiveDesc')} />
          ) : (
            <ListRow onClick={openUpgrade} icon={Crown} iconTone="warning" title={t('profile.upgrade')} description={t('profile.upgradeDesc')} />
          )}
        </RowGroup>
      </Section>

      <Section title={t('profile.tools')}>
        <RowGroup>
          <ListRow href="/ielts/band-calculator" icon={Calculator} title={t('sections.band-calculator.title')} />
        </RowGroup>
      </Section>

      {canSignIn && (
        <RowGroup>
          {isGuest ? (
            <ListRow onClick={signOut} icon={LogIn} iconTone="brand" title={t('profile.signIn')} description={t('profile.signInDesc')} />
          ) : (
            <ListRow onClick={signOut} icon={LogOut} iconTone="danger" title={t('profile.signOut')} />
          )}
        </RowGroup>
      )}
    </div>
  );
}

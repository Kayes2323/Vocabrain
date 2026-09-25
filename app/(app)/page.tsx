'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { Callout, ScreenSkeleton } from '@/components/ds';
import { JourneyCard } from '@/components/home/JourneyCard';
import { MinoCard } from '@/components/home/MinoCard';
import { TodayCard } from '@/components/home/TodayCard';

function greetingKey(date = new Date()): string {
  const h = date.getHours();
  if (h < 12) return 'greeting.morning';
  if (h < 18) return 'greeting.afternoon';
  return 'greeting.evening';
}

function firstName(name: string | null | undefined, email: string | null | undefined): string | undefined {
  const source = name || email?.split('@')[0];
  if (!source) return undefined;
  const first = source.split(/[\s._-]/)[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
}

/**
 * Home answers three questions: where am I, where am I going, what do I do
 * today. Everything else lives in its own section.
 */
export default function HomePage() {
  const { user, isGuest } = useAuth();
  const { t } = useLocale();
  const { profile } = useProfile();

  if (!profile) return <ScreenSkeleton />;

  const name = profile.displayName || (isGuest ? undefined : firstName(user?.displayName, user?.email));

  return (
    <div className="space-y-5">
      <h1 className="pb-1 text-2xl font-semibold tracking-tight md:text-3xl">
        {t(greetingKey())}
        {name ? `, ${name}` : ''} 👋
      </h1>

      {isGuest && (
        <Callout tone="warning" title={t('guest.bannerTitle')}>
          {t('guest.bannerBody')}
        </Callout>
      )}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
        <div className="space-y-5">
          <JourneyCard profile={profile} />
          <TodayCard profile={profile} />
        </div>
        <div className="lg:sticky lg:top-10">
          <MinoCard profile={profile} />
        </div>
      </div>
    </div>
  );
}

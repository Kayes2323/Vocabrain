'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { ScreenSkeleton } from '@/components/ds';
import { MinoChat } from '@/components/mino/MinoChat';
import { useBrainContext } from '@/components/brain/useBrainContext';
import { buildMinoContext } from '@/lib/ai/context';
import { getMinoInsight, getNextActions } from '@/lib/engine';

const partOfDay = (h: number) => (h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening');

export default function MinoPage() {
  const { t, m, locale } = useLocale();
  const { profile } = useProfile();
  const brain = useBrainContext();
  if (!profile || brain.loading) return <ScreenSkeleton />;

  const insight = m(getMinoInsight(profile, brain));
  const hello = `${t(`mino.greeting.${partOfDay(new Date().getHours())}`)}${profile.displayName ? `, ${profile.displayName}` : ''}${locale === 'bn' ? '।' : '.'}`;
  const greeting = `${hello} ${insight.charAt(0).toUpperCase()}${insight.slice(1)}`;

  return <MinoChat context={buildMinoContext(profile, brain)} actions={getNextActions(profile, brain)} greeting={greeting} />;
}

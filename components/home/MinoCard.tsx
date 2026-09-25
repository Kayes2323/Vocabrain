'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel } from '@/components/ds';
import { MinoMark } from '@/components/shell/MinoMark';
import { useBrainContext } from '@/components/brain/useBrainContext';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getMinoInsight, nextProfileGap } from '@/lib/engine';
import type { UserProfile } from '@/lib/models';

/** Mino's one-line guidance, plus the single next missing piece of profile. */
export function MinoCard({ profile }: { profile: UserProfile }) {
  const { t, m } = useLocale();
  const gap = nextProfileGap(profile);
  const brain = useBrainContext();
  const name = profile.displayName;

  return (
    <Panel variant="brand" className="space-y-4">
      <div className="flex items-start gap-3">
        <MinoMark />
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-semibold text-brand">{t('mino.insightLabel')}</p>
          <p className="text-[15px] text-foreground/90 text-pretty">“{name ? `${name}, ` : ''}{m(getMinoInsight(profile, brain))}”</p>
        </div>
      </div>

      {gap && (
        <Link
          href={gap.href}
          className="flex items-center justify-between gap-3 rounded-xl bg-card px-4 py-3 text-sm transition-colors hover:bg-card/80"
        >
          <span>
            <span className="block text-xs text-muted-foreground">{t('home.completeProfile')}</span>
            <span className="font-medium">{t(`gaps.${gap.id}.title`)}</span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-brand" aria-hidden />
        </Link>
      )}

      <Button asChild variant="brand" className="w-full sm:w-auto">
        <Link href="/mino">{t('home.askMino')}</Link>
      </Button>
    </Panel>
  );
}

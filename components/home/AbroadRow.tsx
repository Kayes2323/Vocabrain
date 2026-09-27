'use client';

import Link from 'next/link';
import { ChevronRight, Plane } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

/** Study Abroad on Home: one quiet row at the bottom, secondary to IELTS. */
export function AbroadRow() {
  const { t } = useLocale();
  return (
    <Link
      href="/abroad"
      data-testid="home-abroad"
      className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 transition-colors hover:bg-muted/60"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-tint-yellow text-tint-yellow-fg" aria-hidden>
        <Plane className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{t('home.abroadTitle')}</span>
        <span className="block text-xs text-muted-foreground">{t('home.abroadBody')}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
    </Link>
  );
}

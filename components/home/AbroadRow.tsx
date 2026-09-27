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
      className="flex items-center gap-3 rounded-2xl border border-dashed bg-background px-4 py-3 text-sm transition-colors hover:bg-muted/60"
    >
      <Plane className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="font-medium">{t('home.abroadTitle')}</span>
        <span className="text-muted-foreground"> · {t('home.abroadBody')}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
    </Link>
  );
}

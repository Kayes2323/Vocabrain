'use client';

import Link from 'next/link';
import { useLocale } from '@/components/providers/LocaleProvider';
import { HOME_QUICK_ACCESS } from '@/lib/navigation';
import { cn } from '@/lib/utils';

/**
 * A small shortcut layer under today's learning: the three IELTS things a
 * student starts most, not a list of features and not a second menu.
 */
export function QuickAccess() {
  const { t } = useLocale();
  return (
    <section aria-labelledby="quick-access-title" className="space-y-2.5" data-testid="quick-access">
      <h2 id="quick-access-title" className="px-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {t('home.quickAccess')}
      </h2>
      <ul className="grid grid-cols-3 gap-2.5">
        {HOME_QUICK_ACCESS.map(({ id, href, icon: Icon, tint }) => (
          <li key={id}>
            <Link
              href={href}
              data-quick={id}
              className="flex h-full min-h-[5.5rem] flex-col items-center justify-center gap-2 rounded-2xl border bg-card px-2 py-3 text-center transition-colors hover:bg-muted/60 active:scale-[0.98] sm:flex-row sm:justify-start sm:gap-3 sm:px-3.5 sm:text-left"
            >
              <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl', tint)} aria-hidden>
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] leading-tight font-semibold sm:text-sm">{t(`home.quick.${id}.title`)}</span>
                <span className="mt-0.5 hidden text-xs text-muted-foreground sm:block">{t(`home.quick.${id}.body`)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

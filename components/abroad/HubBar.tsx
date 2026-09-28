'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { cn } from '@/lib/utils';

/**
 * Study Abroad's primary navigation: four hubs. Home holds the journey and the
 * destinations (and everything reached from a country); the rest are the
 * money, application and visa areas.
 */
export const ABROAD_HUBS = [
  {
    id: 'home',
    href: '/abroad',
    match: (p: string) => p === '/abroad' || /^\/abroad\/(journey|roadmap|countries|compare|country-match|match|universities|profile)/.test(p),
  },
  { id: 'money', href: '/abroad/scholarships', match: (p: string) => /^\/abroad\/(scholarships|cost)/.test(p) },
  { id: 'apply', href: '/abroad/documents', match: (p: string) => /^\/abroad\/(documents|deadlines|applications)/.test(p) },
  { id: 'visa', href: '/abroad/visa', match: (p: string) => /^\/abroad\/(visa|pre-departure)/.test(p) },
] as const;

/**
 * Study Abroad's own navigation: one row, four hubs. Scrolls sideways on small
 * screens instead of wrapping, so it never pushes the page content down.
 */
export function HubBar({ className }: { className?: string }) {
  const { t } = useLocale();
  const path = usePathname() ?? '/abroad';
  return (
    <nav aria-label={t('sa.hubs.label')} className={cn('-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0', className)}>
      <ul className="flex w-max gap-1.5 sm:w-auto">
        {ABROAD_HUBS.map((hub) => {
          const active = hub.match(path);
          return (
            <li key={hub.id}>
              <Link
                href={hub.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'inline-flex h-9 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors',
                  active ? 'bg-foreground text-background' : 'bg-muted text-foreground/80 hover:bg-muted/70 hover:text-foreground',
                )}
              >
                {t(`sa.hubs.${hub.id}`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

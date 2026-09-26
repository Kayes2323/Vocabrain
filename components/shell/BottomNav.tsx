'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { PRIMARY_NAV, isNavActive } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { MinoMark } from './MinoMark';

/** Mobile primary navigation. Hidden from md upwards, where SideNav takes over. */
export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLocale();
  return (
    <nav
      aria-label={t('nav.primary')}
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/90 pb-safe backdrop-blur-lg md:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-lg grid-cols-5">
        {PRIMARY_NAV.map(({ href, labelKey, icon: Icon, featured }) => {
          const active = isNavActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex h-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors active:scale-95',
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {featured ? (
                  <span
                    className={cn(
                      'flex h-7 w-11 items-center justify-center rounded-full transition-colors',
                      active && 'bg-brand-soft',
                    )}
                  >
                    <MinoMark size="xs" alive={active} />
                  </span>
                ) : (
                  <span
                    className={cn(
                      'flex h-7 w-11 items-center justify-center rounded-full transition-colors',
                      active && 'bg-accent text-accent-foreground',
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                )}
                <span className={cn(featured && 'text-brand', active && 'font-semibold')}>{t(labelKey)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

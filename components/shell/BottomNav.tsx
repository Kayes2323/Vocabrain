'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { PRIMARY_NAV, isNavActive } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { MinoMark } from './MinoMark';

/**
 * Mobile primary navigation. Hidden from md upwards, where SideNav takes over.
 * Each tab has its own soft color when active; Mino sits raised in the middle
 * and is always alive (it blinks now and then; motion pauses when the bar is
 * hidden or the tab is in the background, and stops for reduced motion).
 */
export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLocale();
  return (
    <nav
      aria-label={t('nav.primary')}
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card pb-safe shadow-[0_-6px_24px_rgb(15_23_42/0.08)] md:hidden"
      data-testid="bottom-nav"
    >
      <ul className="mx-auto grid h-[4.5rem] max-w-lg grid-cols-5 px-1">
        {PRIMARY_NAV.map(({ href, labelKey, icon: Icon, featured, tint }) => {
          const active = isNavActive(pathname, href);
          return (
            <li key={href} className="relative">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                data-nav={labelKey.replace('nav.', '')}
                className={cn(
                  'flex h-full flex-col items-center justify-center gap-1 text-xs font-medium transition-colors active:scale-95',
                  active ? 'text-foreground' : 'text-foreground/70 hover:text-foreground',
                )}
              >
                {featured ? (
                  // Mino: raised, larger and in its own color; the bar keeps its height.
                  <span
                    className={cn(
                      '-mt-7 flex size-14 items-center justify-center rounded-full bg-card shadow-[0_4px_14px_rgb(79_70_229/0.28)] ring-4 transition-transform',
                      active ? 'ring-brand-soft scale-105' : 'ring-card',
                    )}
                    data-testid="nav-mino"
                  >
                    <MinoMark size="md" alive />
                  </span>
                ) : (
                  <span
                    className={cn('flex h-8 w-14 items-center justify-center rounded-full transition-colors', active && tint)}
                  >
                    <Icon className="size-6" strokeWidth={active ? 2.25 : 1.9} aria-hidden />
                  </span>
                )}
                <span className={cn('leading-none', featured && 'font-semibold text-brand', active && 'font-semibold')}>{t(labelKey)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

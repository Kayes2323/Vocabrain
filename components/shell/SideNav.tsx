'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRIMARY_NAV, isNavActive } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { BrandMark } from './BrandMark';

/** Tablet/desktop navigation rail, same destinations as BottomNav. */
export function SideNav() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r bg-sidebar px-3 py-5 md:flex">
      <Link href="/" className="mb-8 px-3">
        <BrandMark />
      </Link>
      <nav aria-label="Primary">
        <ul className="space-y-1">
          {PRIMARY_NAV.map(({ href, label, icon: Icon, featured }) => {
            const active = isNavActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex h-11 items-center gap-3 rounded-xl px-3 text-[15px] font-medium transition-colors',
                    active
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <Icon className={cn('size-5', featured && !active && 'text-brand')} aria-hidden />
                  {label}
                  {featured && (
                    <span className="ml-auto rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">
                      AI
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

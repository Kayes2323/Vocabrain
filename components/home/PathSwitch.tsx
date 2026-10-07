'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { LEARNING_PATHS, type UserProfile } from '@/lib/models';
import { LEARNING_NAV, activePathOf } from '@/lib/navigation';
import { cn } from '@/lib/utils';

/**
 * Home's two learning worlds, side by side: IELTS Academic and Academic. The
 * active one is raised; choosing the other switches Home and the learning tab
 * (saved to the profile, so it holds on every device).
 */
export function PathSwitch({ profile }: { profile: UserProfile }) {
  const { t } = useLocale();
  const { updateProfile } = useProfile();
  const active = activePathOf(profile);
  return (
    <section aria-labelledby="path-switch-title" className="space-y-2" data-testid="path-switch">
      <h2 id="path-switch-title" className="px-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {t('paths.label')}
      </h2>
      <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-muted p-1.5">
        {LEARNING_PATHS.map((path) => {
          const on = path === active;
          const { icon: Icon, tint } = LEARNING_NAV[path];
          return (
            <button
              key={path}
              type="button"
              aria-pressed={on}
              data-path={path}
              onClick={() => !on && updateProfile((p) => ({ ...p, activePath: path }))}
              className={cn(
                'flex min-h-14 min-w-0 items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-all active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
                on ? 'bg-card shadow-sm ring-1 ring-border' : 'text-foreground/70 hover:bg-card/60 hover:text-foreground',
              )}
            >
              {/* The name always fits: on the narrowest phones the icon gives way. */}
              <span className={cn('hidden size-9 shrink-0 items-center justify-center rounded-lg min-[400px]:flex', on ? tint : 'bg-card/70')} aria-hidden>
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className={cn('block truncate text-sm', on ? 'font-semibold' : 'font-medium')}>{t(`paths.${path}.name`)}</span>
                <span className="block truncate text-xs text-muted-foreground">{t(`paths.${path}.sub`)}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

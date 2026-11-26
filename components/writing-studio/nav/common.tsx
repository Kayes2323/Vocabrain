'use client';

import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { cn } from '@/lib/utils';
import type { WritingStudioProgress } from '@/lib/models';
import { wsText, type WsCopyKey } from '@/lib/writing-studio/nav-copy';
import type { ModuleStatus } from '@/lib/writing-studio/navigation';
import { localize, type L10n, type TaskId } from '@/lib/writing-studio/types';

export const EMPTY_WS_PROGRESS: WritingStudioProgress = { lessons: {}, practice: [], mistakes: [], exams: [] };

/** The learner's real Writing Studio progress (never sample data). */
export function useWsProgress(): WritingStudioProgress {
  const { profile } = useProfile();
  return profile?.writingStudio ?? EMPTY_WS_PROGRESS;
}

/**
 * The language of a Writing Studio screen. Task 1's curriculum defaults to Bangla until a student has chosen a UI
 * language on this device (existing behaviour); Task 2 and the Studio home follow the normal locale choice.
 */
export function useWsLocale(task?: TaskId): { locale: 'en' | 'bn'; text: (key: WsCopyKey, vars?: Record<string, string | number>) => string; l: (v: L10n) => string } {
  const { locale, hasChosen } = useLocale();
  const effective: 'en' | 'bn' = task === 'task1' && !hasChosen ? 'bn' : locale;
  return { locale: effective, text: (key, vars) => wsText(effective, key, vars), l: (v) => localize(effective, v) };
}

/**
 * Header of every Writing Studio screen below the home: a clear tap-sized Back link to the PARENT screen, then a quiet
 * context line (where you are) and the title. One back target per screen, so the hierarchy is always obvious.
 */
export function WsHeader({ title, subtitle, context, backHref, backLabel }: { title: string; subtitle?: string; context?: string; backHref: string; backLabel: string }) {
  return (
    <header className="space-y-2" data-testid="ws-header">
      <Link
        href={backHref}
        data-testid="ws-back"
        className="-ml-2 inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden />
        {backLabel}
      </Link>
      <div className="space-y-1">
        {context && <p className="text-xs font-semibold tracking-wide text-brand uppercase">{context}</p>}
        <h1 className="text-2xl font-semibold tracking-tight text-balance">{title}</h1>
        {subtitle && <p className="text-[15px] text-muted-foreground text-pretty">{subtitle}</p>}
      </div>
    </header>
  );
}

const STATUS_COPY: Record<ModuleStatus, WsCopyKey> = { 'not-started': 'statusNotStarted', 'in-progress': 'statusInProgress', completed: 'statusCompleted' };
const ACTION_COPY: Record<ModuleStatus, WsCopyKey> = { 'not-started': 'actionStart', 'in-progress': 'actionContinue', completed: 'actionRevisit' };
export const statusKey = (s: ModuleStatus) => STATUS_COPY[s];
export const actionKey = (s: ModuleStatus) => ACTION_COPY[s];

/** A numbered lesson-style card: opens a screen (chevron), shows its own status. Used by Learn Mode and the Visual Information hub. */
export function LessonCard({
  href,
  number,
  title,
  description,
  status,
  statusLabel,
  actionLabel,
  testId,
  dataId,
}: {
  href: string;
  number: number | string;
  title: string;
  description: string;
  status: ModuleStatus;
  statusLabel: string;
  /** The verb the card offers: Start / Continue / Revisit. */
  actionLabel: string;
  testId?: string;
  dataId?: string;
}) {
  const done = status === 'completed';
  return (
    <Link
      href={href}
      data-testid={testId}
      data-module-id={dataId}
      data-status={status}
      className="flex min-h-[4.5rem] items-center gap-3.5 rounded-2xl border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-muted/50 active:scale-[0.99]"
    >
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
          done ? 'bg-success-soft text-success' : status === 'in-progress' ? 'bg-brand-soft text-brand' : 'bg-muted text-muted-foreground',
        )}
        aria-hidden
      >
        {done ? <Check className="size-5" /> : number}
      </span>
      <span className="min-w-0 flex-1">
        <span data-testid="ws-card-title" className="text-[15px] leading-snug font-semibold text-balance line-clamp-2">{title}</span>
        <span className="mt-0.5 text-sm leading-snug text-muted-foreground line-clamp-2">{description}</span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-0.5 text-right">
        <span className={cn('text-xs font-medium whitespace-nowrap', done ? 'text-success' : status === 'in-progress' ? 'text-brand' : 'text-muted-foreground')}>{statusLabel}</span>
        <span className="inline-flex items-center gap-0.5 text-xs font-semibold whitespace-nowrap text-foreground/80" data-testid="ws-card-action">
          {actionLabel}
          <ChevronRight className="size-3.5 text-muted-foreground/70" aria-hidden />
        </span>
      </span>
    </Link>
  );
}

/** A slim Back link for screens that own their own header (the lesson runner). Same tap size and target logic as WsHeader. */
export function WsBackBar({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} data-testid="ws-back" className="-ml-2 inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-sm font-medium text-muted-foreground hover:text-foreground">
      <ChevronLeft className="size-4" aria-hidden />
      {label}
    </Link>
  );
}

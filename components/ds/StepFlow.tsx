'use client';

import { ChevronLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from './ProgressBar';

interface StepFlowProps {
  step: number;
  totalSteps: number;
  title: string;
  description?: string;
  onBack?: () => void;
  onClose: () => void;
  primaryLabel: string;
  onPrimary: () => void;
  primaryDisabled?: boolean;
  secondaryLabel?: string;
  onSecondary?: () => void;
  children: React.ReactNode;
}

/**
 * Full-screen flow for one decision per screen: progress, back, a single
 * question and one primary action pinned to the bottom.
 */
export function StepFlow({
  step,
  totalSteps,
  title,
  description,
  onBack,
  onClose,
  primaryLabel,
  onPrimary,
  primaryDisabled,
  secondaryLabel,
  onSecondary,
  children,
}: StepFlowProps) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4">
      <div className="flex h-14 items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack} disabled={!onBack} aria-label="Previous step">
          <ChevronLeft />
        </Button>
        <ProgressBar value={(step / totalSteps) * 100} label={`Step ${step} of ${totalSteps}`} size="sm" className="flex-1" />
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
          <X />
        </Button>
      </div>

      <div className="flex-1 space-y-6 pt-6 pb-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-brand">
            Step {step} of {totalSteps}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-balance">{title}</h1>
          {description && <p className="text-[15px] text-muted-foreground">{description}</p>}
        </div>
        {children}
      </div>

      <div className="sticky bottom-0 -mx-4 space-y-2 border-t bg-background/95 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur">
        <Button size="lg" className="w-full" onClick={onPrimary} disabled={primaryDisabled}>
          {primaryLabel}
        </Button>
        {secondaryLabel && onSecondary && (
          <Button variant="ghost" className="w-full text-muted-foreground" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

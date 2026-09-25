'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ds';

export function StudyProgress({ index, total, label }: { index: number; total: number; label: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="tabular-nums text-muted-foreground">
          {index + 1} / {total}
        </span>
      </div>
      <ProgressBar value={((index + 1) / total) * 100} label={`${label} progress`} size="sm" />
    </div>
  );
}

export function StudyNav({
  index,
  total,
  onPrev,
  onNext,
  onFinish,
  finishLabel = 'Finish',
}: {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onFinish?: () => void;
  finishLabel?: string;
}) {
  const last = index === total - 1;
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" size="lg" onClick={onPrev} disabled={index === 0}>
        <ChevronLeft /> Previous
      </Button>
      {last && onFinish ? (
        <Button size="lg" onClick={onFinish}>
          {finishLabel}
        </Button>
      ) : (
        <Button size="lg" onClick={onNext} disabled={last}>
          Next <ChevronRight />
        </Button>
      )}
    </div>
  );
}

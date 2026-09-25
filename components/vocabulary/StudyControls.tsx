'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';

export function StudyProgress({ index, total, label }: { index: number; total: number; label: string }) {
  const { n } = useLocale();
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="tabular-nums text-muted-foreground">
          {n(index + 1)} / {n(total)}
        </span>
      </div>
      <ProgressBar value={((index + 1) / total) * 100} label={label} size="sm" />
    </div>
  );
}

/** "I knew it" / "Not yet": the student's own recall judgement, shown after revealing. */
export function RecallButtons({ onAnswer }: { onAnswer: (recalled: boolean) => void }) {
  const { t } = useLocale();
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" size="lg" onClick={() => onAnswer(false)}>
        {t('vocabulary.lesson.notYet')}
      </Button>
      <Button size="lg" onClick={() => onAnswer(true)}>
        {t('vocabulary.lesson.knewIt')}
      </Button>
    </div>
  );
}

export function StudyNav({
  index,
  total,
  onPrev,
  onNext,
}: {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { t } = useLocale();
  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" onClick={onPrev} disabled={index === 0}>
        <ChevronLeft /> {t('vocabulary.lesson.previous')}
      </Button>
      <Button variant="ghost" onClick={onNext} disabled={index === total - 1}>
        {t('vocabulary.lesson.next')} <ChevronRight />
      </Button>
    </div>
  );
}

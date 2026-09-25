import Link from 'next/link';
import type { MinoContext } from '@/lib/ai/types';
import { formatBand } from '@/lib/engine';
import { RowGroup } from '@/components/ds';

function Fact({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={value ? 'font-medium' : 'text-muted-foreground'}>{value ?? 'Not set'}</span>
    </div>
  );
}

/** Transparency: shows exactly what Mino uses to personalise advice. */
export function MinoContextSummary({ context }: { context: MinoContext }) {
  const { ielts, abroad, vocabulary } = context;
  return (
    <div className="space-y-2">
      <RowGroup>
        <Fact label="IELTS target" value={ielts.targetBand !== undefined ? formatBand(ielts.targetBand) : undefined} />
        <Fact label="Estimated band" value={ielts.estimatedOverall !== undefined ? formatBand(ielts.estimatedOverall) : undefined} />
        <Fact label="Test in" value={ielts.weeksUntilTest !== undefined ? `${ielts.weeksUntilTest} weeks` : undefined} />
        <Fact label="Saved words" value={String(vocabulary.savedWordCount)} />
        <Fact label="Degree" value={abroad.degreeLevel} />
        <Fact label="Target intake" value={abroad.targetIntake} />
      </RowGroup>
      <p className="px-1 text-sm text-muted-foreground">
        Something wrong?{' '}
        <Link href="/profile" className="font-medium text-foreground underline underline-offset-4">
          Update your goals
        </Link>
      </p>
    </div>
  );
}

import { StatusChip, type Tone } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { DevelopmentStatus } from '@/lib/listening-lab';

const TONE: Record<DevelopmentStatus, Tone> = { planned: 'neutral', 'in-development': 'warning', available: 'success' };

/** Honest status chip: a module/skill/part never claims to be further along than it is (docs/DESIGN_SYSTEM.md "Honest states"). */
export function StatusBadge({ status }: { status: DevelopmentStatus }) {
  const { t } = useLocale();
  return <StatusChip tone={TONE[status]}>{t(`listeningLab.status.${status}`)}</StatusChip>;
}

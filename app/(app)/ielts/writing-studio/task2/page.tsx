import { AcademyOverview } from '@/components/writing-studio/AcademyOverview';
import { ACADEMY_STATS, TASK2_MODULES } from '@/lib/writing-studio/content';

export default function Task2AcademyPage() {
  return <AcademyOverview task="task2" modules={TASK2_MODULES} stats={ACADEMY_STATS.task2} />;
}

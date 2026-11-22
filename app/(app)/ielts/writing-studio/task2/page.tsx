import { AcademyOverview } from '@/components/writing-studio/AcademyOverview';
import { TASK2_MODULES } from '@/lib/writing-studio/content';

export default function Task2AcademyPage() {
  return <AcademyOverview task="task2" modules={TASK2_MODULES} />;
}

import { AcademyOverview } from '@/components/writing-studio/AcademyOverview';
import { TASK1_MODULES, TASK1_VISUALS } from '@/lib/writing-studio/content';

export default function Task1AcademyPage() {
  return <AcademyOverview task="task1" modules={TASK1_MODULES} visuals={TASK1_VISUALS} />;
}

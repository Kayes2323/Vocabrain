import { ChartTypeScreen } from '@/components/writing-studio/nav/VisualInformation';
import { TASK1_VISUALS } from '@/lib/writing-studio/content';

/** Only the registry's chart types exist; anything else is a 404 (no generic fallback content). */
export const dynamicParams = false;
export const generateStaticParams = () => TASK1_VISUALS.map((v) => ({ chartType: v.id }));

export default async function ChartTypePage({ params }: { params: Promise<{ chartType: string }> }) {
  const { chartType } = await params;
  return <ChartTypeScreen chartTypeId={chartType} />;
}

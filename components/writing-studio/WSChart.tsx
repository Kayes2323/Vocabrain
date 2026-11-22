'use client';

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import type { ChartDataset } from '@/lib/writing-studio/types';

/** Renders a Task 1 chart dataset as a line or bar chart, for the Chart Analysis Board and the exam/material panels. */
export function WSChart({ dataset, height = 260 }: { dataset: ChartDataset; height?: number }) {
  const rows = dataset.categories.map((cat, i) => {
    const row: Record<string, string | number> = { category: cat };
    dataset.series.forEach((s) => { row[s.name] = s.values[i]; });
    return row;
  });
  const config: ChartConfig = Object.fromEntries(dataset.series.map((s) => [s.name, { label: s.name, color: s.color }]));

  return (
    <ChartContainer config={config} className="w-full" style={{ height }}>
      {dataset.kind === 'line' ? (
        <LineChart data={rows} margin={{ left: 4, right: 12, top: 8, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="category" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} unit={dataset.unit.includes('%') ? '%' : undefined} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {dataset.series.map((s) => (
            <Line key={s.name} type="monotone" dataKey={s.name} stroke={s.color} strokeWidth={2.5} dot={{ r: 3, fill: s.color }} />
          ))}
        </LineChart>
      ) : (
        <BarChart data={rows} margin={{ left: 4, right: 12, top: 8, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="category" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {dataset.series.map((s) => (
            <Bar key={s.name} dataKey={s.name} fill={s.color} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      )}
    </ChartContainer>
  );
}

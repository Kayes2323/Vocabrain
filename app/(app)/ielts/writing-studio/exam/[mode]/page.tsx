'use client';

import { notFound, useParams } from 'next/navigation';
import { ExamShell } from '@/components/writing-studio/ExamShell';
import type { ExamMode } from '@/lib/writing-studio/types';

const MODES: ExamMode[] = ['task1', 'task2', 'full'];

export default function ExamModePage() {
  const { mode } = useParams<{ mode: string }>();
  if (!MODES.includes(mode as ExamMode)) notFound();
  return <ExamShell mode={mode as ExamMode} />;
}

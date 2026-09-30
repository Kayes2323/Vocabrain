'use client';

import { useParams } from 'next/navigation';
import { PlanDayScreen } from '@/components/plan/PlanDay';

/** One day of My IELTS Plan: its tasks, their status and (today) skip. */
export default function PlanDayPage() {
  const { date } = useParams<{ date: string }>();
  return <PlanDayScreen date={date} />;
}

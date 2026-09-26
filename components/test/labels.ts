export { QUESTION_TYPE_LABELS } from '@/lib/ielts';

export const formatClock = (seconds: number) => {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

export const questionRange = (numbers: number[]) =>
  numbers.length > 1 ? `${numbers[0]}–${numbers[numbers.length - 1]}` : String(numbers[0]);

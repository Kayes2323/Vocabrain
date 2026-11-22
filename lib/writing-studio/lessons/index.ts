import type { Lesson } from '../types';
import { overviewWritingLesson } from './overview-writing';
import { ideaDevelopmentLesson } from './idea-development';

export const LESSONS: Record<string, Lesson> = {
  [overviewWritingLesson.id]: overviewWritingLesson,
  [ideaDevelopmentLesson.id]: ideaDevelopmentLesson,
};

export function getLesson(id: string): Lesson | undefined {
  return LESSONS[id];
}

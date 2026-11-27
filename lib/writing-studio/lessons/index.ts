import type { Lesson } from '../types';
import { overviewWritingLesson } from './overview-writing';
import { ideaDevelopmentLesson } from './idea-development';
import { task1UnderstandingLesson } from './task1-understanding';
import { visualInformationLesson } from './visual-information';
import { task1IntroductionLesson } from './task1-introduction';
import { bodyParagraphsLesson } from './body-paragraphs';
import { task1VocabGrammarLesson } from './task1-vocab-grammar';
import { task1FullPracticeLesson } from './task1-full-practice';
import { task1CompleteWritingLesson } from './task1-complete-writing';
import { task2UnderstandingLesson } from './task2-understanding';
import { questionTypesLesson } from './question-types';
import { questionAnalysisLesson } from './question-analysis';
import { ideaGenerationLesson } from './idea-generation';
import { introConclusionLesson } from './intro-conclusion';
import { task2VocabGrammarLesson } from './task2-vocab-grammar';
import { task2FullPracticeLesson } from './task2-full-practice';
import { highLevelWritingLesson } from './high-level-writing';
import { lineGraphMasteryLesson } from './line-graph-mastery';
import { barChartMasteryLesson } from './bar-chart-mastery';

export const LESSONS: Record<string, Lesson> = {
  [overviewWritingLesson.id]: overviewWritingLesson,
  [ideaDevelopmentLesson.id]: ideaDevelopmentLesson,
  [task1UnderstandingLesson.id]: task1UnderstandingLesson,
  [visualInformationLesson.id]: visualInformationLesson,
  [task1IntroductionLesson.id]: task1IntroductionLesson,
  [bodyParagraphsLesson.id]: bodyParagraphsLesson,
  [task1VocabGrammarLesson.id]: task1VocabGrammarLesson,
  [task1FullPracticeLesson.id]: task1FullPracticeLesson,
  [task1CompleteWritingLesson.id]: task1CompleteWritingLesson,
  [task2UnderstandingLesson.id]: task2UnderstandingLesson,
  [questionTypesLesson.id]: questionTypesLesson,
  [questionAnalysisLesson.id]: questionAnalysisLesson,
  [ideaGenerationLesson.id]: ideaGenerationLesson,
  [introConclusionLesson.id]: introConclusionLesson,
  [task2VocabGrammarLesson.id]: task2VocabGrammarLesson,
  [task2FullPracticeLesson.id]: task2FullPracticeLesson,
  [highLevelWritingLesson.id]: highLevelWritingLesson,
  [lineGraphMasteryLesson.id]: lineGraphMasteryLesson,
  [barChartMasteryLesson.id]: barChartMasteryLesson,
};

export function getLesson(id: string): Lesson | undefined {
  return LESSONS[id];
}

// Mino Writing Studio — prototype data model.
//
// Everything here is content/state shape only; no network calls, no
// Firestore. The Studio runs entirely on mock data and local component
// state, per the prototype brief. Scores produced anywhere in this feature
// are indicative estimates for practice, never an official IELTS result.

export type TaskId = 'task1' | 'task2';

/** The four levels of the gradual-independence system (spec §13). */
export type IndependenceLevel = 1 | 2 | 3 | 4;

export const INDEPENDENCE_LABEL: Record<IndependenceLevel, string> = {
  1: 'Mino demonstrates',
  2: 'Mino guides',
  3: 'You write',
  4: 'Independent',
};

/** One row in a Task's module list (Dashboard/Academy overview). Static curriculum metadata only — a student's real completion is looked up separately from their profile. */
export interface ModuleSummary {
  id: string;
  number: number;
  title: string;
  description: string;
  /** If set, "Open" routes to this fully built lesson. Otherwise it opens a labelled content preview. */
  builtLessonId?: string;
}

/** One of the seven Task 1 visual-specific training areas (spec Module 7). */
export interface VisualTrainingArea {
  id: string;
  title: string;
  description: string;
  builtLessonId?: string;
}

export interface AcademyStats {
  task: TaskId;
  modulesTotal: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  practiceSessions: number;
  mockTestsTaken: number;
  currentLevel: IndependenceLevel;
  focusAreas: string[];
}

// ---------------------------------------------------------------- Charts

export interface ChartSeries {
  name: string;
  color: string;
  values: number[];
}

export interface ChartDataset {
  id: string;
  kind: 'line' | 'bar';
  title: string;
  unit: string;
  categories: string[];
  series: ChartSeries[];
  /** One honest line of context a student would be given with the real chart. */
  note?: string;
}

export interface ChartBoardTask {
  id: string;
  order: number;
  prompt: string;
  /** Shown once the student checks their answer. */
  modelAnswer: string;
  /** Which part of a Task 1 response this feature belongs in. */
  belongsIn: 'overview' | 'body';
}

// ---------------------------------------------------------------- Idea board

export interface IdeaRung {
  id: string;
  order: number;
  prompt: string;
  hint: string;
  placeholder: string;
}

export interface IdeaBoardQuestion {
  id: string;
  prompt: string;
  questionType: 'agree-disagree' | 'discuss-both' | 'advantages-disadvantages' | 'problem-solution';
  ladder: IdeaRung[];
}

// ---------------------------------------------------------------- Lessons

export type MaterialBlock =
  | { type: 'text'; paragraphs: string[] }
  | { type: 'examples'; good: string; weak: string; note: string }
  | { type: 'vocab'; items: { phrase: string; use: string }[] }
  | { type: 'chart-board'; dataset: ChartDataset; tasks: ChartBoardTask[] }
  | { type: 'idea-board'; question: IdeaBoardQuestion };

export type StepKind = 'intro' | 'explain' | 'demonstrate' | 'check' | 'guided' | 'independent' | 'review';

export interface CheckQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explain: string;
}

export interface LessonStep {
  id: string;
  kind: StepKind;
  title: string;
  /** What Mino says for this step (Trainer Zone). */
  trainerMessage: string;
  hint?: string;
  material?: MaterialBlock;
  check?: CheckQuestion;
}

export interface FinalPrompt {
  title: string;
  instructions: string;
  minWords: number;
  /** Reference chart id, when the final task needs one rendered alongside the editor. */
  chartId?: string;
}

export interface Lesson {
  id: string;
  task: TaskId;
  moduleId: string;
  title: string;
  objective: string;
  estMinutes: number;
  steps: LessonStep[];
  finalPrompt: FinalPrompt;
}

// ---------------------------------------------------------------- Mistakes / progress

export interface MistakeCategory {
  id: string;
  label: string;
  occurrences: number;
  trend: 'up' | 'down' | 'flat';
  example: { quote: string; fix: string; why: string };
  relatedLessonId?: string;
}

export interface ProgressPoint {
  label: string;
  band: number;
}

// ---------------------------------------------------------------- Exam

export type ExamMode = 'task1' | 'task2' | 'full';

export interface ExamTaskContent {
  task: TaskId;
  title: string;
  instructions: string;
  prompt: string;
  minWords: number;
  minutes: number;
  chartId?: string;
}

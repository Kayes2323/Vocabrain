// Mino Writing Studio — prototype data model.
//
// Everything here is content/state shape only; no network calls, no
// Firestore. The Studio runs entirely on mock data and local component
// state, per the prototype brief. Scores produced anywhere in this feature
// are indicative estimates for practice, never an official IELTS result.

export type TaskId = 'task1' | 'task2';

/**
 * Learner-facing text that may need a Bangla counterpart. A plain string
 * renders the same in every language — used for English sample sentences,
 * target vocabulary/phrases, IELTS prompts and quoted text that must never be
 * translated. Existing lesson content (a plain string) is still a valid
 * `L10n`, so nothing elsewhere has to change for this type to be introduced.
 */
export type L10n = string | { en: string; bn: string };

/** Resolves an `L10n` value for the given locale. A plain string is returned as-is for every locale. */
export function localize(locale: 'en' | 'bn', value: L10n): string {
  return typeof value === 'string' ? value : value[locale];
}

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
  title: L10n;
  description: L10n;
  /** If set, "Open" routes to this fully built lesson. Otherwise it opens a labelled content preview. */
  builtLessonId?: string;
}

/** One of the seven Task 1 visual-specific training areas (spec Module 7). */
export interface VisualTrainingArea {
  id: string;
  title: L10n;
  description: L10n;
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
  prompt: L10n;
  /** Shown once the student checks their answer. Always the English model sentence being taught — never translated. */
  modelAnswer: string;
  /** Which part of a Task 1 response this feature belongs in. */
  belongsIn: 'introduction' | 'overview' | 'body';
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
  /** `paragraphs` is teaching prose — translatable. */
  | { type: 'text'; paragraphs: L10n[] }
  /** `good`/`weak` are the literal English sample sentences being taught and are never translated; `note` is the surrounding explanation. */
  | { type: 'examples'; good: string; weak: string; note: L10n }
  /** `phrase` is the target English vocabulary/collocation (never translated); `use` explains it. */
  | { type: 'vocab'; items: { phrase: string; use: L10n }[] }
  | { type: 'chart-board'; dataset: ChartDataset; tasks: ChartBoardTask[] }
  | { type: 'idea-board'; question: IdeaBoardQuestion };

export type StepKind = 'intro' | 'explain' | 'demonstrate' | 'check' | 'guided' | 'independent' | 'review';

export interface CheckQuestion {
  prompt: L10n;
  /** The candidate answers. Left untranslated by default: most Task 1 checks test recognising/choosing correct IELTS English, so the options are the literal English skill being tested. */
  options: string[];
  correctIndex: number;
  explain: L10n;
}

export interface LessonStep {
  id: string;
  kind: StepKind;
  title: L10n;
  /** What Mino says for this step (Trainer Zone). */
  trainerMessage: L10n;
  hint?: L10n;
  material?: MaterialBlock;
  check?: CheckQuestion;
}

export interface FinalPrompt {
  title: L10n;
  instructions: L10n;
  minWords: number;
  /** Reference chart id, when the final task needs one rendered alongside the editor. */
  chartId?: string;
  /**
   * Set when this final task is a short, targeted skill drill (e.g. "Paraphrasing
   * accuracy for a Task 1 introduction") rather than a full Task 1/2 response.
   * When set, the Feedback Zone evaluates this named skill and avoids presenting
   * a number that looks like a full-task IELTS band.
   */
  skillFocus?: string;
  /**
   * Overrides deriveScope()'s word-count guess for which local checks apply,
   * for a final task that guess would misjudge (e.g. an introduction-only
   * task, which must not be checked for an overview sentence or figures —
   * those belong in later parts of a response). Leave unset for a normal
   * full/overview/paragraph task; deriveScope() infers it from minWords.
   */
  checkScope?: 'full' | 'overview-only' | 'paragraph-only' | 'introduction-only';
}

export interface Lesson {
  id: string;
  task: TaskId;
  moduleId: string;
  title: L10n;
  objective: L10n;
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

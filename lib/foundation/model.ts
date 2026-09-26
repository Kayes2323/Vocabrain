// IELTS Foundation content model. Lessons are data: the lesson player renders
// any lesson that fits these types, so new modules need no UI changes.
//   Course → Level → Module → Lesson → Step (concept / examples / IELTS use / practice / recall) → Exercise
//
// Explanations are bilingual (L). English sentences that students study or
// type (examples, exercises, answers) stay in English.

/** Bilingual text. Bangla keeps IELTS terms (Task 1, Band Score...) in English. */
export interface L {
  en: string;
  bn: string;
}

export type FoundationSkill = 'grammar' | 'vocabulary' | 'listening' | 'reading' | 'writing' | 'speaking';

/** Error categories tracked from exercises; Mino uses them to spot patterns. */
export type ErrorTag =
  | 'sentence-structure'
  | 'subject'
  | 'verb'
  | 'object'
  | 'tense'
  | 'word-form'
  | 'article'
  | 'agreement'
  | 'preposition'
  | 'connector'
  | 'complex-sentence'
  | 'punctuation'
  | 'plural'
  | 'vocabulary'
  | 'collocation'
  | 'reading'
  | 'listening';

export type Difficulty = 'easy' | 'medium' | 'hard';

interface ExerciseBase {
  id: string;
  /** Instruction or question. English is fine (it is test language); may be bilingual. */
  prompt: L;
  /** English sentence the exercise is about, shown large ("___" marks a gap). */
  sentence?: string;
  explanation: L;
  /** What a wrong answer says about the student. */
  tag: ErrorTag;
  /** Finer concept this question checks (e.g. "present-perfect"); feeds review. */
  concept?: string;
}

/** Pick one option. Answers are option texts. */
export interface ChoiceExercise extends ExerciseBase {
  type: 'choice';
  options: string[];
  answer: string;
  /** Why a specific wrong option is wrong (shown when the student picks it). */
  why?: Record<string, L>;
}

/** Type a word or phrase into the gap. Case/space-insensitive. */
export interface GapExercise extends ExerciseBase {
  type: 'gap';
  accepted: string[];
  /** Why a common wrong answer is wrong, keyed by that answer (normalised). */
  why?: Record<string, L>;
}

/** Tap words into the right order. */
export interface OrderExercise extends ExerciseBase {
  type: 'order';
  /** The correct sentence; its words are shuffled for the student. */
  answer: string;
  /** Other correct orders, if any. */
  alsoAccepted?: string[];
}

/** Rewrite a sentence without its mistake. */
export interface CorrectExercise extends ExerciseBase {
  type: 'correct';
  accepted: string[];
  why?: Record<string, L>;
}

/** Free production: the student writes their own sentence and compares with a model. Not auto-graded. */
export interface WriteExercise extends ExerciseBase {
  type: 'write';
  model: string;
  /** Simple checklist the student ticks against their own answer. */
  checklist: L[];
}

export type Exercise = ChoiceExercise | GapExercise | OrderExercise | CorrectExercise | WriteExercise;

export type LessonStep =
  /** What is this? */
  | { kind: 'concept'; title: L; body: L; points?: L[] }
  /** How do I use it? */
  | { kind: 'examples'; title: L; items: { en: string; note: L }[] }
  /** Why and where in IELTS? At least one skill per lesson. */
  | { kind: 'ielts'; title: L; uses: { skill: Exclude<FoundationSkill, 'grammar' | 'vocabulary'>; example: string; note: L }[] }
  /** Can I use it myself? */
  | { kind: 'practice'; title: L; exercises: Exercise[] }
  /** Remember it. */
  | { kind: 'recall'; title: L; points: L[] };

export interface Lesson {
  id: string;
  title: L;
  /** One line: why this matters for IELTS. */
  why: L;
  minutes: number;
  difficulty: Difficulty;
  skill: FoundationSkill;
  /** 'test' lessons are practice-only (module review tests). Default 'lesson'. */
  kind?: 'lesson' | 'test';
  /** The concept this lesson teaches; its concept step is reused for review. */
  concept?: string;
  /** Lessons that should come first (defaults to the previous lesson in the module). */
  prerequisites?: string[];
  steps: LessonStep[];
}

/** A reviewable concept: its name and the lesson that teaches it. */
export interface Concept {
  id: string;
  title: L;
  lessonId: string;
  tag: ErrorTag;
}

export interface Module {
  id: string;
  /** Course level 1–5 (see LEVELS). */
  level: 1 | 2 | 3 | 4 | 5;
  number: number;
  title: L;
  description: L;
  /** Where this module shows up in IELTS. */
  ieltsLink: L;
  skill: FoundationSkill;
  /** Error tags this module practises; the diagnostic uses them to recommend a start. */
  tags: ErrorTag[];
  lessons: Lesson[];
  /** Lessons not written yet: shown as "coming soon" and counted in progress totals. */
  planned?: L[];
}

export interface Level {
  id: 1 | 2 | 3 | 4 | 5;
  title: L;
  description: L;
  /** Levels 3–5 use existing features (practice, tests, mock tests). */
  href?: string;
}

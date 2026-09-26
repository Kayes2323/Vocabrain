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
  /** Ask Mino to check the student's own sentences (personal use). */
  mino?: {
    /** What Mino checks, in English (sent to the model). */
    task: string;
    /** The target structure, shown to the student. */
    target: L;
  };
  /** Simple checklist the student ticks against their own answer. */
  checklist: L[];
}

export type Exercise = ChoiceExercise | GapExercise | OrderExercise | CorrectExercise | WriteExercise;

/** The time picture a sentence has; drawn as a small timeline. */
export type TimePicture = 'finished' | 'now' | 'habit' | 'past-to-now' | 'future' | 'earlier-past';

export type LessonStep =
  /** 1. Hook: a real situation; the student answers BEFORE any teaching. Not graded. */
  | {
      kind: 'hook';
      title: L;
      situation: L;
      question: L;
      options: string[];
      answer: string;
      /** 2. Diagnose: "If you chose X, here's why you may be confused." One per option. */
      diagnose: Record<string, L>;
    }
  /** 3. Discover: examples first; the student notices the pattern, then it is revealed. */
  | {
      kind: 'discover';
      title: L;
      items: { en: string; note: L }[];
      question: L;
      options: L[];
      /** Index of the option that states the pattern. */
      answer: number;
      pattern: L;
    }
  /** 4. Explain (what is it?). Optional timeline cards make time visible. */
  | { kind: 'concept'; title: L; body: L; points?: L[]; timeline?: { sentence: string; picture: TimePicture; label: L }[] }
  /** 5. Real life / examples (how do I use it?). */
  | { kind: 'examples'; title: L; items: { en: string; note: L }[] }
  /** 6. IELTS connection (only skills where it naturally applies). */
  | { kind: 'ielts'; title: L; uses: { skill: Exclude<FoundationSkill, 'grammar' | 'vocabulary'>; example: string; note: L }[] }
  /** 7. Common Mistake Lab: wrong → why → right, tap to reveal. */
  | { kind: 'mistakes'; title: L; items: { wrong: string; right: string; why: L }[] }
  /** 8–10. Practice (easy → hard), active recall (no options) or personal use (Mino feedback). */
  | { kind: 'practice'; title: L; mode?: 'practice' | 'recall' | 'personal'; exercises: Exercise[] }
  /** Remember: the key points to keep. */
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
  /** 'v2' = problem-first format (hook → diagnose → discover → … → personal use). */
  format?: 'v2';
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

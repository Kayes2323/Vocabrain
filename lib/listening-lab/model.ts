/**
 * The IELTS Listening Trainer ("Listening Lab"): data model only.
 *
 * This file defines the shape of the 8-module curriculum, the 4 part-specific
 * dashboards, the error-classification taxonomy and the audio production
 * manifest. It intentionally reuses the app's existing IELTS engine instead of
 * duplicating it:
 *
 *   - `ObjectivePart` / `QuestionGroup` / `Question` (lib/ielts/model.ts) stay
 *     the one representation of an audio section and its questions. A lesson
 *     here can carry zero, one or several of them as its exercises.
 *   - `ScriptLine` / `ListeningAudio` (lib/ielts/model.ts) and `ListeningVoice`
 *     / `LISTENING_CAST` (lib/ielts/listening-audio.ts) stay the one audio
 *     production pipeline (multi-provider TTS, ffmpeg stitching, a committed
 *     manifest). `AudioAsset` below is a production-tracking record for that
 *     pipeline, not a second one: see docs/LISTENING_TRAINER_ARCHITECTURE.md §7.
 *   - `QuestionType` / `QUESTION_TYPES` (lib/ielts/question-types.ts) stay the
 *     one list of the 13 IELTS question types; Module 03 trains against them.
 *   - The Foundation lesson engine's step/exercise shapes
 *     (lib/foundation/model.ts) are the pattern a written Listening Lab lesson
 *     should follow once content is authored (Phase 2), so the loop in the
 *     product brief (hook → concept → demonstrate → practise → correct →
 *     reinforce → master) has one implementation, not two.
 *
 * Phase 1 ships this model, the module/part tree as DATA (every item's real
 * status — almost all `'planned'`, honestly, per docs/DESIGN_SYSTEM.md's
 * "Honest states" principle) and the dashboards that render it. No lesson
 * content, no audio script and no exercise are invented here.
 */
import type { ObjectivePart } from '@/lib/ielts/model';
import type { QuestionType } from '@/lib/ielts/model';

/** How far a piece of the curriculum actually is. Never upgraded without real content behind it. */
export type DevelopmentStatus = 'planned' | 'in-development' | 'available';

export type IELTSListeningPart = 1 | 2 | 3 | 4;

/** The 8 learning areas from the product brief. */
export type ModuleId =
  | 'sound-recognition'
  | 'paraphrase-vocabulary'
  | 'question-type-mastery'
  | 'part3-conversation'
  | 'part4-lecture'
  | 'accent-speed'
  | 'spelling-accuracy'
  | 'exam-simulation';

export interface Bilingual {
  en: string;
  /** Bangla, with technical/IELTS terms left in English (house style; see docs/FOUNDATION.md). */
  bn: string;
}

/** One trainable skill inside a module (the brief's "submodules", A/B/C…). */
export interface Skill {
  id: string;
  title: Bilingual;
  /** One sentence: what the learner can do after this skill, not what it covers. */
  outcome: Bilingual;
  status: DevelopmentStatus;
  /** Question types this skill specifically trains, when it names one (Module 03). */
  questionTypes?: QuestionType[];
  /** IELTS Listening parts this skill is most relevant to. */
  parts?: IELTSListeningPart[];
  /** Lesson ids once Phase 2 writes them (lib/foundation-style `Lesson.id`s, kept separate per module). */
  lessonIds?: string[];
}

export interface Module {
  id: ModuleId;
  number: number;
  title: Bilingual;
  /** Why this module exists, for the module dashboard header. */
  purpose: Bilingual;
  status: DevelopmentStatus;
  skills: Skill[];
}

/** One trap or teaching point in the Part 3 Trap Library (brief §"MODULE 04", "Build a dedicated PART 3 TRAP LIBRARY"). */
export interface ConversationTrap {
  id: string;
  title: Bilingual;
  explanation: Bilingual;
  status: DevelopmentStatus;
}

/** A part-specific dashboard (Part 1–4). Distinct from the 8 cross-cutting modules: this groups by WHERE a skill is tested. */
export interface PartDashboard {
  part: IELTSListeningPart;
  title: Bilingual;
  /** Question types that actually appear in this part (drives "Question types" on the dashboard). */
  questionTypes: QuestionType[];
  /** Skills to master, referenced by `${moduleId}:${skillId}` so each line stays a single source of truth. */
  skillRefs: string[];
  commonTraps: Bilingual[];
  status: DevelopmentStatus;
}

/** DIAGNOSE step of the teaching cycle: why this exact answer was missed. Never inferred from the wrong option alone. */
export type ListeningErrorCode = 'DEC' | 'PAR' | 'TRP' | 'SPK' | 'TIM' | 'ATT' | 'SPE' | 'GRM' | 'MAP' | 'PRD';

export interface ErrorCodeDefinition {
  code: ListeningErrorCode;
  name: Bilingual;
  /** What evidence justifies this code (used by the classifier, never assumed from the wrong option alone). */
  detectedFrom: Bilingual;
  /** What the learner should practise next when this code is frequent. */
  nextStep: Bilingual;
}

/** One recorded mistake in a learner's Error Notebook (brief §6). Written once an exercise exists; the shape is fixed now so it does not change under saved data later. */
export interface ListeningMistake {
  id: string;
  at: string; // ISO date
  moduleId: ModuleId;
  skillId: string;
  questionType?: QuestionType;
  errorCode: ListeningErrorCode;
  /** The student's answer and the correct one, for review — never shown without both. */
  given: string;
  expected: string;
}

/** A lesson's declared connection to a real test section, when it has one (Phase 2+). */
export interface LessonAudioRef {
  objectivePartId: ObjectivePart['id'];
}

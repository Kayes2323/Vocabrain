/**
 * Mino Listening — shared data model for all six modules.
 *
 * One lesson engine, one audio player, one content schema, one progress
 * engine. A module's landing page, a lesson's stages, the Practice Library
 * and the Personal Trainer dashboard all read from these same records —
 * never from a second, duplicated source.
 *
 * Content is kept separate from UI components (brief §8, §13): nothing in
 * `components/listening` imports a specific module's data file directly:
 * every screen takes `Module`/`Lesson`/`Stage`/`AudioAsset` as props, found
 * through `lib/listening/modules.ts`'s lookup functions. Adding a new
 * lesson is a data change, not a UI change.
 */

export type ModuleId = 'sound-gym' | 'speech-decoder' | 'conversation-intelligence' | 'academic-mind' | 'accent-world' | 'ielts-transfer-zone';

/**
 * What a module/lesson/stage honestly is right now. Never set ahead of real
 * content (docs/DESIGN_SYSTEM.md "Honest states").
 *   in-development  — no lesson exists yet
 *   audio-pending    — the lesson/stage structure exists; its audio file has not been delivered
 *   audio-delivered  — a real, playable audio file exists, but the script/questions/answer key
 *                       have not been delivered, and/or the audio itself still needs a human
 *                       aural QA check (see AudioAsset.productionQA)
 *   content-ready    — the real script/questions/answer key have been written in
 *   complete         — audio delivered AND aurally confirmed AND teaching content written in
 */
export type ContentStatus = 'in-development' | 'audio-pending' | 'audio-delivered' | 'content-ready' | 'complete';

export interface Bilingual {
  en: string;
  bn: string;
}

/**
 * The six possible stages a lesson can use (brief §8's shared framework).
 * Sound Gym's own six-stage mapping is a named subset of this set, kept
 * stable rather than renamed, per the brief's explicit instruction.
 */
export type StageKind = 'diagnostic' | 'understand' | 'guided-practice' | 'context-practice' | 'challenge' | 'transfer-test';

export const STAGE_LABELS: Record<StageKind, Bilingual> = {
  diagnostic: { en: 'Diagnostic Listening', bn: 'Diagnostic Listening' },
  understand: { en: 'Understand the Skill', bn: 'Understand the Skill' },
  'guided-practice': { en: 'Guided Listening Lab', bn: 'Guided Listening Lab' },
  'context-practice': { en: 'Context / Recognition Practice', bn: 'Context / Recognition Practice' },
  challenge: { en: 'Independent Challenge', bn: 'Independent Challenge' },
  'transfer-test': { en: 'IELTS Transfer Test', bn: 'IELTS Transfer Test' },
};

/** Sound Gym's six stages, in order, the exact mapping given in the brief. */
export const SOUND_GYM_STAGE_ORDER: StageKind[] = ['diagnostic', 'understand', 'guided-practice', 'context-practice', 'challenge', 'transfer-test'];

export type ExerciseKind = 'multiple-choice' | 'gap-fill' | 'short-answer' | 'spelling' | 'ordering';

export interface AnswerOption {
  id: string;
  text: string;
}

/**
 * One question inside a stage. `distractorExplanation` is required whenever
 * `options` is set: every wrong option must have a stated reason, not just
 * the right one (brief §8's "Distractor explanation").
 */
export interface Question {
  id: string;
  prompt: string;
  kind: ExerciseKind;
  options?: AnswerOption[];
  correctAnswer: string;
  explanation: string;
  distractorExplanation?: Record<string, string>;
  /** Codes from `lib/listening/error-tags.ts`; a wrong answer here is tagged with these, never inferred from the pick alone. */
  errorTags: string[];
}

/**
 * A stage's actual teaching content. Deliberately ALL OPTIONAL: a stage
 * that exists structurally (so its audio asset and position are real) can
 * still have no content yet — rendered as "Content in development", never
 * filled with an invented script or question (brief §1 Sound Gym rule, §13).
 */
export interface StageContent {
  instructions?: string;
  transcript?: string;
  questions?: Question[];
  /** What this stage trains, shown while teaching (not the diagnostic score). */
  skillNote?: string;
}

export interface Stage {
  id: string;
  kind: StageKind;
  /** The one audio asset this stage plays, when it has one. */
  audioAssetId?: string;
  content?: StageContent;
  /** True once `content` is the real, delivered package — never set from invented content. */
  contentStatus: ContentStatus;
}

export interface Lesson {
  id: string;
  moduleId: ModuleId;
  number: number;
  code: string; // "SG-01"
  title: Bilingual;
  /** What the learner will be able to do (brief's own framing: outcome, not topic list). */
  skill: Bilingual;
  objective: Bilingual;
  estimatedMinutes: number;
  difficulty: 1 | 2 | 3;
  skillTags: string[];
  stages: Stage[];
  status: ContentStatus;
}

export interface Module {
  id: ModuleId;
  number: number;
  title: Bilingual;
  purpose: Bilingual;
  /** The future learning areas named in the brief, shown on the landing page even before lessons exist. */
  learningAreas: Bilingual[];
  status: ContentStatus;
  lessons: Lesson[];
}

/**
 * Supported accents, used by Accent World and recorded against any asset
 * (brief §5, §9's "performance across different accents").
 */
export type Accent = 'en-GB' | 'en-US' | 'en-AU' | 'en-NZ' | 'other';

export interface AudioAssetSpeaker {
  /** The real voice name from the delivery report's cast list, e.g. "Isabella". */
  identity: string;
  accent: Accent;
  voice: 'female' | 'male';
  /** The in-dialogue role this speaker plays in this specific asset, e.g. "Student", "Administrator" — not every asset has one. */
  role?: string;
}

/** Audio-production QA, exactly as the delivery report states it. Never upgraded to 'passed' on this codebase's own judgement — only when the report itself says so. */
export type ProductionQA = 'review' | 'passed';

/**
 * One of the 36 Sound Gym assets (or any future asset). `path` is the exact,
 * stable location the brief specifies; file presence is never asserted here
 * — it is checked against disk in `scripts/test-listening.ts`, so a missing
 * file can never be reported as present.
 */
export interface AudioAsset {
  assetId: string; // "SG01-A01"
  moduleId: ModuleId;
  lessonId: string;
  stageId: string;
  path: string; // "/audio/mino/listening/sound-gym/SG01/SG01-A01.mp3"
  /** Unset until the delivery report names who is speaking and in what accent — never guessed. */
  speakers?: AudioAssetSpeaker[];
  /** Reference to the delivered production report document, once one exists. This describes the asset's structure, not a verbatim transcript. */
  scriptRef?: string;
  durationSeconds?: number;
  /** TTS speed setting used, where the report states it (82/85/92 etc.). */
  speed?: number;
  /** The delivery report's own QA verdict for this asset — see `ProductionQA`. */
  productionQA?: ProductionQA;
  /** The delivery report's own note/caveat for this asset, verbatim or close to it — never paraphrased into something more reassuring. */
  qaNote?: string;
}

/** A content manifest row: the join of everything the brief's §2 "central content manifest" asks for, derived (never duplicated) from Module/Lesson/Stage/AudioAsset. */
export interface ManifestRow {
  moduleId: ModuleId;
  lessonId: string;
  stageId: string;
  audioAssetId?: string;
  audioPath?: string;
  scriptRef?: string;
  questionIds: string[];
  errorTags: string[];
  contentStatus: ContentStatus;
}

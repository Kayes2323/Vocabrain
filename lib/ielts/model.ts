// IELTS practice content model. Content is data: the test engine renders any
// test that fits these types, so licensed books can be added later without
// changing UI code. Hierarchy:
//   Book → Test → Skill section → Part (passage / recording) → Question group → Question → Answer + Explanation
import type { ContentProvenance, ID } from '@/lib/models/common';

export type IELTSSkillId = 'listening' | 'reading' | 'writing' | 'speaking';
export type ObjectiveSkill = 'listening' | 'reading';
export type IELTSModule = 'academic' | 'general';

/** Every question type the engine understands. Content picks the type; no test needs all of them. */
export type QuestionType =
  // shared
  | 'multiple-choice'
  | 'multiple-choice-multi'
  | 'matching'
  | 'sentence-completion'
  | 'summary-completion'
  | 'note-completion'
  | 'table-completion'
  | 'flow-chart-completion'
  | 'short-answer'
  // listening
  | 'form-completion'
  | 'plan-map-diagram-labelling'
  // reading
  | 'true-false-not-given'
  | 'yes-no-not-given'
  | 'matching-headings'
  | 'matching-information'
  | 'matching-features'
  | 'matching-sentence-endings'
  | 'diagram-label-completion';

export interface Option {
  /** Letter or numeral shown to the student and stored as the answer: "A", "iv". */
  id: string;
  text: string;
}

/** "NO MORE THAN TWO WORDS AND/OR A NUMBER" → { words: 2, number: true }. */
export interface WordLimit {
  words: number;
  number?: boolean;
}

export interface AnswerKey {
  /**
   * Accepted answers. Matching is case- and space-insensitive. Optional words go
   * in brackets: "(the) library" accepts "library" and "the library".
   * Choice answers are option ids ("B", "TRUE", "iv").
   */
  accepted: string[];
}

/** Why an answer is right, shown after submission. */
export interface Explanation {
  /** Short reasoning in English (the language of the test). */
  text: string;
  /** Where the answer is found. */
  evidence?: { paragraphId?: string; quote: string };
  /** Why tempting wrong options are wrong, keyed by option id. */
  distractors?: Record<string, string>;
}

export interface Question {
  id: ID;
  /** Number shown on screen, unique within the section (1–40). */
  number: number;
  /** The statement / question / sentence. Completion prompts mark the gap with "___". */
  prompt?: string;
  /** Options for this question only (multiple choice). */
  options?: Option[];
  answer: AnswerKey;
  explanation?: Explanation;
}

export interface QuestionGroup {
  id: ID;
  type: QuestionType;
  /** Instructions exactly as the student sees them. */
  instructions: string;
  wordLimit?: WordLimit;
  /** Options shared by the group (headings, features, endings, TFNG...). */
  options?: Option[];
  /** Short title for a shared option list, e.g. "List of Headings". */
  optionsTitle?: string;
  /** multiple-choice-multi: how many letters to choose (one question per letter). */
  choose?: number;
  /** Shared stem for multiple-choice-multi. */
  stem?: string;
  /** Completion text with gaps written as {{questionNumber}}. Lines split on "\n". */
  template?: string;
  /** Completion table; cells may contain {{questionNumber}}. */
  table?: { headers: string[]; rows: string[][] };
  /** Diagram / map image for labelling tasks. */
  image?: { src: string; alt: string };
  questions: Question[];
}

export interface Paragraph {
  /** "A", "B"... when questions refer to paragraphs; otherwise "1", "2"... */
  id: string;
  text: string;
  /** Show the id as a paragraph label (needed for matching headings/information). */
  labelled?: boolean;
}

/** One spoken line in a Listening script. */
export interface ScriptLine {
  speaker: string;
  voice: 'female' | 'male';
  accent?: 'en-GB' | 'en-US' | 'en-AU';
  text: string;
}

export interface ListeningAudio {
  /** Recorded audio (preferred). */
  src?: string;
  /** Spoken script: used when there is no recording, and shown as the transcript after the test. */
  script?: ScriptLine[];
  /** Short context the narrator reads first ("You will hear a phone call…"). */
  intro?: string;
}

export interface ObjectivePart {
  id: ID;
  /** Listening Part 1–4, Reading Passage 1–3. */
  number: number;
  title?: string;
  /** Reading only. */
  passage?: { title: string; subtitle?: string; paragraphs: Paragraph[] };
  /** Listening only: a recorded file, or a script the browser reads aloud. */
  audio?: ListeningAudio;
  groups: QuestionGroup[];
}

export interface ObjectiveSection {
  skill: ObjectiveSkill;
  timeLimitMinutes: number;
  parts: ObjectivePart[];
}

export interface WritingTask {
  id: ID;
  task: 1 | 2;
  prompt: string;
  image?: { src: string; alt: string };
  /** Task 1 data shown as a table (charts can be added as `image`). */
  data?: { caption: string; headers: string[]; rows: string[][]; note?: string };
  minWords: number;
  suggestedMinutes: number;
}

export interface WritingSection {
  skill: 'writing';
  timeLimitMinutes: number;
  tasks: WritingTask[];
}

export interface SpeakingPart {
  id: ID;
  part: 1 | 2 | 3;
  topic: string;
  questions: string[];
  /** Part 2 cue card. */
  cueCard?: { task: string; points: string[]; closing?: string };
  prepSeconds?: number;
  speakSeconds?: number;
}

export interface SpeakingSection {
  skill: 'speaking';
  parts: SpeakingPart[];
}

export interface PracticeTest extends ContentProvenance {
  id: ID;
  bookId: ID;
  /** Position in the book (Test 1–4). */
  number: number;
  title: string;
  module: IELTSModule;
  sections: {
    listening?: ObjectiveSection;
    reading?: ObjectiveSection;
    writing?: WritingSection;
    speaking?: SpeakingSection;
  };
}

export type BookSeries = 'vocab-brain' | 'cambridge' | 'official-sample';

export interface TestBook extends ContentProvenance {
  id: ID;
  series: BookSeries;
  title: string;
  /** Cambridge IELTS 21 → 21. */
  edition?: number;
  /** Display order, highest first. */
  order: number;
  tests: PracticeTest[];
}

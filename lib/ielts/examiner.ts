import type { SpeakingSection } from './model';

/**
 * The voice examiner for the Speaking mock test. Pure logic only: what the
 * examiner says and when an answer is over. The browser side (speech, mic)
 * lives in components/test/ExaminerSpeaking.tsx.
 *
 * The wording is Mino's own procedural phrasing in the style of a speaking
 * test; it is not taken from any published test.
 */

/** One answer slot. `key` matches the tap-through runner so feedback is identical in both modes. */
export interface ExaminerTurn {
  key: string;
  part: 1 | 2 | 3;
  topic: string;
  /** What the examiner says, in order, before the candidate answers (ends with the question in Parts 1 and 3). */
  lead: string[];
  /** Part 2: the printed card, shown on screen and never read out. */
  cueCard?: { task: string; points: string[]; closing?: string };
  prepSeconds: number;
  /** Part 2: said when preparation ends, just before the candidate speaks. */
  afterPrep: string[];
  /** Hard limit for the answer. */
  limitSeconds: number;
}

export interface ExaminerScript {
  opening: string[];
  turns: ExaminerTurn[];
  closing: string[];
}

export const SPEAKING_LIMITS = { 1: 60, 2: 120, 3: 90 } as const;

const OPENING = [
  'Good day, and welcome to the speaking test.',
  'I am going to ask you some questions, in three parts.',
  'Please answer in your own words. I will not comment on your answers, and I may move on while you are still thinking.',
  "Let's begin.",
];

const PART1 = 'In this first part, I would like to ask you some questions about yourself.';

const PART2 = [
  'Now, I am going to give you a topic, and I would like you to talk about it for one to two minutes.',
  'Before you talk, you will have one minute to think about what you are going to say. You can make notes if you wish.',
  'Here is your topic.',
];

const AFTER_PREP = [
  'All right? Remember, you have one to two minutes for this, so do not worry if I stop you. I will tell you when the time is up.',
  'Can you start speaking now, please?',
];

const CLOSING = ['Thank you.', 'That is the end of the speaking test.'];

/** Said when a student comes back to a test that was left part-way. */
export const RESUME_LINE = "Let's carry on.";

/**
 * Stable name for a spoken line. The recorded examiner clips are filed under
 * it, so the same wording always finds the same clip (FNV-1a plus the length).
 */
export function lineKey(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return `${(h >>> 0).toString(16).padStart(8, '0')}-${text.length}`;
}

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

const part3Lead = (topic: string | undefined) => [
  'Thank you.',
  topic
    ? `We have been talking about ${lowerFirst(topic)}, and now I would like to discuss with you one or two more general questions related to this.`
    : 'Now I would like to discuss with you one or two more general questions.',
];

/** Turns the test's speaking section into what the examiner says and asks, in order. */
export function examinerScript(section: SpeakingSection): ExaminerScript {
  const turns: ExaminerTurn[] = [];
  let part2Topic: string | undefined;

  for (const p of section.parts) {
    if (p.cueCard) {
      part2Topic = p.topic;
      turns.push({
        key: `${p.id}-0`,
        part: p.part,
        topic: p.topic,
        lead: PART2,
        cueCard: p.cueCard,
        prepSeconds: p.prepSeconds ?? 60,
        afterPrep: AFTER_PREP,
        limitSeconds: p.speakSeconds ?? SPEAKING_LIMITS[2],
      });
      continue;
    }
    p.questions.forEach((q, i) => {
      const first = i === 0;
      const intro = !first ? [] : p.part === 1 ? [PART1] : p.part === 3 ? part3Lead(part2Topic) : [];
      turns.push({ key: `${p.id}-${i}`, part: p.part, topic: p.topic, lead: [...intro, q], prepSeconds: 0, afterPrep: [], limitSeconds: SPEAKING_LIMITS[p.part] });
    });
  }
  return { opening: OPENING, turns, closing: CLOSING };
}

/** How long the candidate may go quiet, after speaking, before the examiner moves on. */
export const SILENCE_MS = { 1: 2800, 2: 8000, 3: 3800 } as const;
/** How long the examiner waits for any speech at all before moving on. */
export const NO_SPEECH_MS = { 1: 10_000, 2: 15_000, 3: 12_000 } as const;

export type AnswerEnd = 'continue' | 'silence' | 'limit' | 'no-speech';

/** Decides whether the current answer is over. Checked every ~200 ms while the microphone is open. */
export function answerStatus(input: { part: 1 | 2 | 3; limitSeconds: number; elapsedMs: number; spoke: boolean; silenceMs: number }): AnswerEnd {
  const { part, limitSeconds, elapsedMs, spoke, silenceMs } = input;
  if (elapsedMs >= limitSeconds * 1000) return 'limit';
  if (!spoke) return elapsedMs >= NO_SPEECH_MS[part] ? 'no-speech' : 'continue';
  return silenceMs >= SILENCE_MS[part] ? 'silence' : 'continue';
}

/** Loudness (RMS, 0–1) that counts as speech: clearly above the room's own background level. */
export const MIN_SPEECH_RMS = 0.02;
export const speechThreshold = (noiseFloor: number) => Math.max(MIN_SPEECH_RMS, noiseFloor * 2.5);
export const isSpeechLevel = (rms: number, noiseFloor: number) => rms > speechThreshold(noiseFloor);

/** Slowly follows quiet moments so a noisy room does not read as speech; never rises on loud frames. */
export const nextNoiseFloor = (floor: number, rms: number) => (rms < speechThreshold(floor) ? floor * 0.95 + rms * 0.05 : floor);

/** Root-mean-square level of one audio frame (samples in -1..1). */
export function frameRms(samples: ArrayLike<number>): number {
  if (samples.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < samples.length; i++) sum += samples[i] * samples[i];
  return Math.sqrt(sum / samples.length);
}

/** Every distinct line the examiner can say for this test, in the order it is first said. */
export function examinerLines(script: ExaminerScript): string[] {
  const all = [...script.opening, RESUME_LINE, ...script.turns.flatMap((t) => [...t.lead, ...t.afterPrep]), ...script.closing];
  return [...new Set(all)];
}

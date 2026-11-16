/**
 * The examiner's recorded voices, grouped by accent. A voice is recorded once
 * per line and used for the whole test, so the examiner never changes voice
 * part-way. Clips live in public/examiner/<id>/<line key>.mp3.
 */
export type ExaminerAccent = 'british' | 'indian' | 'australian';

export interface ExaminerVoice {
  /** Folder name under public/examiner and the id stored in the student's choice. */
  id: string;
  accent: ExaminerAccent;
  name: string;
  gender: 'male' | 'female';
  /** How the clips were made (Speko text-to-speech). Kept so a new line can be recorded in the same voice. */
  synth: { provider: string; model: string; voice: string; language: string; speed?: number };
}

export const EXAMINER_ACCENTS: ExaminerAccent[] = ['british', 'indian', 'australian'];

export const EXAMINER_VOICES: ExaminerVoice[] = [
  { id: 'british-archie', accent: 'british', name: 'Archie', gender: 'male', synth: { provider: 'cartesia', model: 'sonic-3.5', voice: 'ef191366-f52f-447a-a398-ed8c0f2943a1', language: 'en-GB', speed: 0.92 } },
  { id: 'british-gemma', accent: 'british', name: 'Gemma', gender: 'female', synth: { provider: 'cartesia', model: 'sonic-3.5', voice: '62ae83ad-4f6a-430b-af41-a9bede9286ca', language: 'en-GB', speed: 0.92 } },
  { id: 'british-freddie', accent: 'british', name: 'Freddie', gender: 'male', synth: { provider: 'gradium', model: 'default', voice: 's_k3kLBbgeK9-xUg', language: 'en-GB' } },
  { id: 'british-maeve', accent: 'british', name: 'Maeve', gender: 'female', synth: { provider: 'gradium', model: 'default', voice: '6PWnV0Nq4wu7RVBT', language: 'en-GB' } },
  { id: 'indian-dhruv', accent: 'indian', name: 'Dhruv', gender: 'male', synth: { provider: 'azure', model: 'MAI-Voice-2.1', voice: 'en-IN-Dhruv:MAI-Voice-2.1', language: 'en-IN' } },
  { id: 'indian-priya', accent: 'indian', name: 'Priya', gender: 'female', synth: { provider: 'azure', model: 'MAI-Voice-2.1', voice: 'en-IN-Priya:MAI-Voice-2.1', language: 'en-IN' } },
  { id: 'australian-robyn', accent: 'australian', name: 'Robyn', gender: 'female', synth: { provider: 'cartesia', model: 'sonic-3', voice: 'f31cc6a7-c1e8-4764-980c-60a361443dd1', language: 'en-AU', speed: 0.92 } },
  { id: 'australian-isla', accent: 'australian', name: 'Isla', gender: 'female', synth: { provider: 'azure', model: 'MAI-Voice-2.1', voice: 'en-AU-Isla:MAI-Voice-2.1', language: 'en-AU' } },
];

export const DEFAULT_EXAMINER_VOICE = 'british-archie';

export const getExaminerVoice = (id: string | undefined) => EXAMINER_VOICES.find((v) => v.id === id);

/** The request body for Speko's synthesize call that records `text` in this voice. */
export function synthBody(voice: ExaminerVoice, text: string) {
  const { provider, model, voice: voiceId, language, speed } = voice.synth;
  return { text, intent: { language }, voice: voiceId, model, ...(speed ? { speed } : {}), constraints: { allowedProviders: { tts: [provider] } } };
}

/** Clip paths per voice, as listed in public/examiner/manifest.json: { voiceId: { lineKey: "voiceId/lineKey.mp3" } }. */
export type ClipIndex = Record<string, Record<string, string>>;

/**
 * Voices that can say every one of these lines. A voice with gaps is not
 * offered, so the examiner never swaps to a different voice mid-test.
 */
export const completeVoices = (index: ClipIndex, lineKeys: string[]): ExaminerVoice[] =>
  EXAMINER_VOICES.filter((v) => lineKeys.every((k) => Boolean(index[v.id]?.[k])));

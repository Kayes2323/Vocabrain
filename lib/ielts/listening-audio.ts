import type { ListeningAudio } from './model';
import { lineKey } from './examiner';

/**
 * Recorded Listening parts, the way the real test sounds: a studio narrator
 * announces each part and each set of questions, the speakers have their own
 * voices, and silence is left for reading and checking. This file only plans
 * the recording (what is said, by whom, with what gaps); scripts/listening-audio.ts
 * records and stitches it.
 *
 * The narration is Mino's own procedural wording, not taken from any published test.
 */

export interface ListeningVoice {
  name: string;
  synth: { provider: string; model: string; voice: string; language: string; speed?: number };
}

export const NARRATOR = 'narrator';

/** Voices used in Listening recordings. Speakers are cast from these per part. */
export const LISTENING_VOICES: Record<string, ListeningVoice> = {
  [NARRATOR]: { name: 'Draco', synth: { provider: 'deepgram', model: 'aura-2', voice: 'aura-2-draco-en', language: 'en-GB' } },
  'british-archie': { name: 'Archie', synth: { provider: 'cartesia', model: 'sonic-3.5', voice: 'ef191366-f52f-447a-a398-ed8c0f2943a1', language: 'en-GB', speed: 0.95 } },
  'british-gemma': { name: 'Gemma', synth: { provider: 'cartesia', model: 'sonic-3.5', voice: '62ae83ad-4f6a-430b-af41-a9bede9286ca', language: 'en-GB', speed: 0.95 } },
  'british-freddie': { name: 'Freddie', synth: { provider: 'gradium', model: 'default', voice: 's_k3kLBbgeK9-xUg', language: 'en-GB' } },
  'australian-isla': { name: 'Isla', synth: { provider: 'azure', model: 'MAI-Voice-2.1', voice: 'en-AU-Isla:MAI-Voice-2.1', language: 'en-AU' } },
  'british-maeve': { name: 'Maeve', synth: { provider: 'gradium', model: 'default', voice: '6PWnV0Nq4wu7RVBT', language: 'en-GB' } },
};

/** Who speaks as whom, per part (`<test id>:<part id>`). A speaker keeps one voice for the whole part. */
export const LISTENING_CAST: Record<string, Record<string, string>> = {
  'vb-mock-1:l1': { Helen: 'british-maeve', Emma: 'british-gemma' },
  'vb-mock-1:l2': { Guide: 'british-maeve' },
  'vb-mock-1:l3': { Nina: 'british-gemma', Leo: 'british-freddie' },
  'vb-mock-1:l4': { Lecturer: 'british-archie' },
  'vb-mock-2:l1': { Priya: 'british-maeve', Mark: 'british-archie' },
  'vb-mock-2:l2': { Sarah: 'british-gemma' },
  'vb-mock-2:l3': { Maya: 'british-gemma', Daniel: 'british-freddie' },
  'vb-mock-2:l4': { 'Dr. Lewis': 'british-archie' },
  'vb-mock-3:l1': { Helen: 'british-maeve', Daniel: 'british-archie' },
  'vb-mock-3:l2': { Rachel: 'british-gemma' },
  'vb-mock-3:l3': { Maya: 'british-gemma', Daniel: 'british-freddie' },
  'vb-mock-3:l4': { 'Professor Adams': 'british-archie' },
  'vb-mock-4:l1': { Rachel: 'british-maeve', Emma: 'british-gemma' },
  'vb-mock-4:l2': { Daniel: 'british-archie' },
  'vb-mock-4:l3': { Nora: 'british-gemma', Ethan: 'british-freddie' },
  'vb-mock-4:l4': { 'Professor Helen Morris': 'british-maeve' },
  'vb-mock-5:l1': { Helen: 'british-maeve', David: 'british-archie' },
  'vb-mock-5:l2': { Martin: 'british-freddie' },
  'vb-mock-5:l3': { Leah: 'british-gemma', Omar: 'british-freddie' },
  'vb-mock-5:l4': { 'Dr Amelia Carter': 'british-gemma' },
  'vb-mock-6:l1': { Receptionist: 'british-maeve', Alex: 'british-archie' },
  'vb-mock-6:l2': { Presenter: 'australian-isla' },
  'vb-mock-6:l3': { Sophie: 'british-gemma', Ben: 'british-freddie' },
  'vb-mock-6:l4': { Lecturer: 'british-archie' },
  'vb-mock-7:l1': { Receptionist: 'british-maeve', Customer: 'british-gemma' },
  'vb-mock-7:l2': { Guide: 'british-archie' },
  'vb-mock-7:l3': { Maya: 'british-gemma', Daniel: 'british-freddie' },
  'vb-mock-7:l4': { Lecturer: 'british-maeve' },
  'vb-mock-9:l1': { Advisor: 'british-maeve', David: 'british-archie' },
  'vb-mock-9:l2': { Ranger: 'australian-isla' },
  'vb-mock-9:l3': { Chloe: 'british-gemma', Noah: 'british-freddie' },
  'vb-mock-9:l4': { Lecturer: 'british-archie' },
  'vb-mock-10:l1': { Operator: 'british-maeve', 'Mr Foster': 'british-archie' },
  'vb-mock-10:l2': { Guide: 'australian-isla' },
  'vb-mock-10:l3': { Sara: 'british-gemma', Alex: 'british-freddie' },
  'vb-mock-10:l4': { Lecturer: 'british-archie' },
  'vb-mock-11:l1': { Agent: 'british-maeve', 'Mr Bennett': 'british-archie' },
  'vb-mock-11:l2': { Guide: 'australian-isla' },
  'vb-mock-11:l3': { Emma: 'british-gemma', Liam: 'british-freddie' },
  'vb-mock-11:l4': { Lecturer: 'british-archie' },
  'vb-mock-12:l1': { Receptionist: 'british-maeve', 'Mr Carter': 'british-archie' },
  'vb-mock-12:l2': { Organiser: 'australian-isla' },
  'vb-mock-12:l3': { Sophie: 'british-gemma', Ben: 'british-freddie' },
  'vb-mock-12:l4': { Lecturer: 'british-archie' },
  'vb-mock-13:l1': { Agent: 'british-maeve', 'Mr Evans': 'british-archie' },
  'vb-mock-13:l2': { Guide: 'australian-isla' },
  'vb-mock-13:l3': { Anna: 'british-gemma', Tom: 'british-freddie' },
  'vb-mock-13:l4': { Lecturer: 'british-archie' },
  'vb-mock-14:l1': { Officer: 'british-maeve', 'Mr Thompson': 'british-archie' },
  'vb-mock-14:l2': { Chef: 'australian-isla' },
  'vb-mock-14:l3': { Emma: 'british-gemma', Jack: 'british-freddie' },
  'vb-mock-14:l4': { Lecturer: 'british-archie' },
  'vb-mock-15:l1': { Instructor: 'british-maeve', 'Mr Patel': 'british-archie' },
  'vb-mock-15:l2': { Organiser: 'australian-isla' },
  'vb-mock-15:l3': { Emma: 'british-gemma', Lucas: 'british-freddie' },
  'vb-mock-15:l4': { Lecturer: 'british-archie' },
  'vb-mock-16:l1': { Advisor: 'british-maeve', 'Mr Hughes': 'british-archie' },
  'vb-mock-16:l2': { Presenter: 'australian-isla' },
  'vb-mock-16:l3': { Sophie: 'british-gemma', Ben: 'british-freddie' },
  'vb-mock-16:l4': { Lecturer: 'british-archie' },
  'vb-mock-17:l1': { Receptionist: 'british-maeve', 'Mr Walsh': 'british-archie' },
  'vb-mock-17:l2': { Ranger: 'australian-isla' },
  'vb-mock-17:l3': { Emma: 'british-gemma', Liam: 'british-freddie' },
  'vb-mock-17:l4': { Lecturer: 'british-archie' },
  'vb-mock-18:l1': { Receptionist: 'british-maeve', 'Mr Davies': 'british-archie' },
  'vb-mock-18:l2': { Organiser: 'australian-isla' },
  'vb-mock-18:l3': { Emma: 'british-gemma', Liam: 'british-freddie' },
  'vb-mock-18:l4': { Lecturer: 'british-archie' },
  'vb-mock-19:l1': { 'Mrs Patel': 'british-maeve', 'Mr Reed': 'british-archie' },
  'vb-mock-19:l2': { Guide: 'australian-isla' },
  'vb-mock-19:l3': { Sophie: 'british-gemma', Ben: 'british-freddie' },
  'vb-mock-19:l4': { Lecturer: 'british-archie' },
  'vb-mock-20:l1': { 'Mrs Thompson': 'british-maeve', 'Mr Hall': 'british-archie' },
  'vb-mock-20:l2': { Organiser: 'australian-isla' },
  'vb-mock-20:l3': { Emma: 'british-gemma', Jack: 'british-freddie' },
  'vb-mock-20:l4': { Lecturer: 'british-archie' },
  'vb-mock-21:l1': { 'Mrs Bailey': 'british-maeve', 'Mr Parker': 'british-archie' },
  'vb-mock-21:l2': { Guide: 'australian-isla' },
  'vb-mock-21:l3': { Lily: 'british-gemma', Oscar: 'british-freddie' },
  'vb-mock-21:l4': { Lecturer: 'australian-isla' },
  'vb-mock-22:l1': { 'Mrs Hughes': 'british-maeve', 'Mr Doyle': 'british-archie' },
  'vb-mock-22:l2': { Guide: 'australian-isla' },
  'vb-mock-22:l3': { Hannah: 'british-gemma', Leo: 'british-freddie' },
  'vb-mock-22:l4': { Lecturer: 'australian-isla' },
};

/** Silence left for reading each set of questions and for checking answers at the end. */
export const READ_SECONDS = 30;
export const CHECK_SECONDS = 30;

export type Cue = { at: number; kind: 'read' | 'listen' | 'check' };

export type Track =
  | { kind: 'say'; voice: string; text: string; speaker?: string; gapAfterMs: number }
  | { kind: 'silence'; seconds: number; cue: Cue['kind'] }
  | { kind: 'mark'; cue: Cue['kind'] };

const sentences = (text: string) => (text.match(/[^.!?]+[.!?]*/g) ?? []).map((s) => s.trim()).filter(Boolean);

/** Gap after a spoken line: a breath between speakers, a shorter one when the same person carries on. */
const gapAfter = (speaker: string, next: string | undefined) => (next === undefined ? 1200 : next === speaker ? 300 : 450);

export interface PartInfo {
  testId: string;
  partId: string;
  /** Part number as announced ("Part 1"). */
  number: number;
  /** Position in the test, for the welcome and the closing words. */
  index: number;
  count: number;
}

/** Everything the recording of one part contains, in order. */
export function listeningTracks(audio: ListeningAudio, part: PartInfo): Track[] {
  const cast = LISTENING_CAST[`${part.testId}:${part.partId}`];
  if (!cast) throw new Error(`No voices cast for ${part.testId}:${part.partId}`);
  const script = audio.script ?? [];
  const sets = audio.sets?.length ? audio.sets : [{ questions: '', fromLine: 0 }];
  const noun = audio.noun ?? 'recording';
  const say = (text: string): Track => ({ kind: 'say', voice: NARRATOR, text, gapAfterMs: 350 });
  const tracks: Track[] = [];

  if (part.index === 0) {
    for (const s of ['Welcome to the Listening test.', 'You will hear four recordings, and you will hear each one only once.', 'Answer the questions as you listen.']) tracks.push(say(s));
  }

  // "Part 1. You will hear …" without the final "First, you have some time…" sentence, which is set-specific.
  const intro = sentences(audio.intro ?? `Part ${part.number}.`).filter((s) => !/^First, you have some time/i.test(s));
  for (const s of intro) tracks.push(say(s));

  sets.forEach((set, i) => {
    tracks.push(say(i === 0 ? `First, you have some time to look at questions ${set.questions}.` : `Before you hear the rest of the ${noun}, you have some time to look at questions ${set.questions}.`));
    tracks.push({ kind: 'silence', seconds: READ_SECONDS, cue: 'read' });
    tracks.push(say(i === 0 ? `Now listen carefully, and answer questions ${set.questions}.` : `Now listen, and answer questions ${set.questions}.`));
    tracks.push({ kind: 'mark', cue: 'listen' });
    const end = sets[i + 1]?.fromLine ?? script.length;
    script.slice(set.fromLine, end).forEach((line, k, all) => {
      const next = k + 1 < all.length ? all[k + 1].speaker : undefined;
      const voice = cast[line.speaker];
      if (!voice) throw new Error(`${part.partId}: no voice for speaker "${line.speaker}"`);
      tracks.push({ kind: 'say', voice, speaker: line.speaker, text: line.text, gapAfterMs: gapAfter(line.speaker, next) });
    });
  });

  const last = part.index === part.count - 1;
  tracks.push(say(`That is the end of Part ${part.number}.`));
  tracks.push(say(last ? 'That is the end of the Listening test. You now have half a minute to check your answers.' : 'You now have half a minute to check your answers.'));
  tracks.push({ kind: 'silence', seconds: CHECK_SECONDS, cue: 'check' });
  return tracks;
}

/** The request for Speko's synthesize tool that records `text` in a voice. */
export function listeningBody(voiceId: string, text: string) {
  const v = LISTENING_VOICES[voiceId];
  if (!v) throw new Error(`Unknown listening voice ${voiceId}`);
  const { provider, model, voice, language, speed } = v.synth;
  return { text, intent: { language }, voice, model, ...(speed ? { speed } : {}), constraints: { allowedProviders: { tts: [provider] } } };
}

/** Where a recorded line lives (relative to the working folder) and what it is called. */
export const listeningClipKey = (text: string) => lineKey(text);
export const listeningClipPath = (voiceId: string, text: string) => `${voiceId}/${listeningClipKey(text)}.mp3`;

/** Every distinct line to record for a set of tracks. */
export function listeningJobs(tracks: Track[]) {
  const seen = new Map<string, { voice: string; text: string; key: string; path: string }>();
  for (const t of tracks) {
    if (t.kind !== 'say') continue;
    const path = listeningClipPath(t.voice, t.text);
    if (!seen.has(path)) seen.set(path, { voice: t.voice, text: t.text, key: listeningClipKey(t.text), path });
  }
  return [...seen.values()];
}

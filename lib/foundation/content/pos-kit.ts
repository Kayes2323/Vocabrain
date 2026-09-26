// Small builders for Parts of Speech content: every exercise keeps the job the
// answer needs (pos) and the job each wrong answer does (wrongPos), so mistakes
// become "expected → chosen" pairs.
import type {
  ChoiceExercise, CorrectExercise, ErrorTag, GapExercise, L, LessonStep, OrderExercise, Pos, SpotExercise, TagExercise, WriteExercise,
} from '../model';

export const l = (en: string, bn: string): L => ({ en, bn });

type Common = { explanation: L; tag?: ErrorTag; pos?: Pos; wrongPos?: Record<string, Pos>; family?: string; pattern?: string };

export const choice = (id: string, concept: string, o: Common & { prompt: L; sentence?: string; options: string[]; answer: string; why?: Record<string, L> }): ChoiceExercise => ({
  id, type: 'choice', concept, tag: o.tag ?? 'part-of-speech', ...o,
});

export const gap = (id: string, concept: string, o: Common & { prompt: L; sentence: string; accepted: string[]; base?: string; why?: Record<string, L> }): GapExercise => ({
  id, type: 'gap', concept, tag: o.tag ?? 'part-of-speech', ...o,
});

export const correct = (id: string, concept: string, o: Common & { prompt: L; sentence: string; accepted: string[]; why?: Record<string, L> }): CorrectExercise => ({
  id, type: 'correct', concept, tag: o.tag ?? 'part-of-speech', ...o,
});

/** Spot and fix. `sentence` is split on spaces; `wrong` is the word to tap. */
export const spot = (id: string, concept: string, o: Common & { prompt?: L; sentence: string; wrong: string; accepted: string[]; fixOptions?: string[] }): SpotExercise => {
  const words = o.sentence.split(/\s+/);
  const index = words.findIndex((w) => w.replace(/[.,;:!?]+$/, '') === o.wrong);
  if (index < 0) throw new Error(`${id}: "${o.wrong}" not in sentence`);
  const { sentence, wrong, prompt, ...rest } = o;
  return {
    id, type: 'spot', concept, tag: o.tag ?? 'part-of-speech', words, wrong: index,
    prompt: prompt ?? l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। সেটায় tap করো, তারপর ঠিক করো।'),
    ...rest,
  };
};

/** Tag the words. Write the sentence with the job after words to tag: "The young/adjective student/noun". */
export const tagWords = (id: string, concept: string, o: { sentence: string; choices: Pos[]; explanation: L; prompt?: L; tag?: ErrorTag }): TagExercise => ({
  id, type: 'tag', concept, tag: o.tag ?? 'part-of-speech', choices: o.choices, explanation: o.explanation,
  prompt: o.prompt ?? l('Tap each marked word and choose its job.', 'চিহ্ন দেওয়া প্রতিটা word-এ tap করে তার কাজ বাছো।'),
  tokens: tokens(o.sentence),
});

export function tokens(sentence: string): { w: string; pos?: Pos }[] {
  return sentence.split(/\s+/).map((part) => {
    const [w, pos] = part.split('/');
    return pos ? { w: w + (pos.match(/[.,;:!?]+$/)?.[0] ?? ''), pos: pos.replace(/[.,;:!?]+$/, '') as Pos } : { w };
  });
}

export const identify = (o: { sentence: string; choices: Pos[]; pattern: L }): LessonStep => ({
  kind: 'identify',
  title: l('What job is each word doing?', 'প্রতিটা word কী কাজ করছে?'),
  question: l('Tap a marked word, then choose its job. No rules yet: just think.', 'চিহ্ন দেওয়া word-এ tap করো, তারপর কাজটা বাছো। এখনো কোনো নিয়ম না, শুধু ভাবো।'),
  tokens: tokens(o.sentence),
  choices: o.choices,
  pattern: o.pattern,
});

export const write = (id: string, concept: string, o: { prompt: L; model: string; task: string; target: L; checklist: L[]; explanation: L; tag?: ErrorTag }): WriteExercise => ({
  id, type: 'write', concept, tag: o.tag ?? 'part-of-speech', prompt: o.prompt, model: o.model, checklist: o.checklist, explanation: o.explanation,
  mino: { task: o.task, target: o.target },
});

/** Put the words in order (sentence building). */
export const order = (id: string, concept: string, o: Common & { prompt: L; answer: string; alsoAccepted?: string[] }): OrderExercise => ({
  id, type: 'order', concept, tag: o.tag ?? 'sentence-structure', ...o,
});

export const JOBS4: Pos[] = ['noun', 'verb', 'adjective', 'adverb'];
export const JOBS3: Pos[] = ['noun', 'verb', 'adjective'];

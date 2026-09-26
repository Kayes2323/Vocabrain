// Foundation diagnostic: a short check (not an IELTS test) of the English an
// IELTS student needs. It finds the starting level and which modules to focus
// on, so nobody is forced through lessons they already know.
import type { FoundationArea, FoundationDiagnosticRecord, FoundationLevel } from '@/lib/models';
import { MODULES } from './content';
import { gradeExercise } from './grade';
import { adaptiveStart } from './progress';
import type { ChoiceExercise, ErrorTag, GapExercise, L, OrderExercise } from './model';

export type DiagnosticItem = (ChoiceExercise | GapExercise | OrderExercise) & {
  area: FoundationArea;
  /** Listening: text the browser reads aloud (the student cannot see it). */
  audio?: string;
};

export const DIAGNOSTIC_AREAS: FoundationArea[] = ['grammar', 'vocabulary', 'sentence', 'reading', 'listening'];

/** Short text for the reading items. Original, written for Vocab Brain. */
export const DIAGNOSTIC_READING = {
  title: 'Living with rivers',
  text: 'Bangladesh has one of the largest river systems in the world. Every year, heavy monsoon rain causes the rivers to rise, and in some years large areas are flooded. Floods damage homes and crops, but they also bring fresh soil that makes farmland more productive. In recent decades, the government has built shelters and early-warning systems, and the number of deaths caused by floods has fallen sharply. However, experts warn that rising sea levels may make flooding more frequent in the future.',
};

const q = (en: string, bn: string): L => ({ en, bn });
const noExplain = q('', '');

export const DIAGNOSTIC_ITEMS: DiagnosticItem[] = [
  // Grammar
  { id: 'd-g1', area: 'grammar', type: 'choice', tag: 'tense', concept: 'past-simple', prompt: q('Choose the correct word.', 'সঠিক শব্দ বাছো।'), sentence: 'Last year, the company ___ 500 new workers.', options: ['hires', 'hired', 'has hired'], answer: 'hired', explanation: q('"Last year" is finished time → Past Simple.', '"Last year" শেষ হয়ে যাওয়া সময় → Past Simple।') },
  { id: 'd-g2', area: 'grammar', type: 'choice', tag: 'article', prompt: q('Choose the correct word.', 'সঠিক শব্দ বাছো।'), sentence: 'My sister is ___ university student.', options: ['a', 'an', 'the'], answer: 'a', explanation: q('"university" starts with a "yoo" sound → "a".', '"university" "ইউ" শব্দে শুরু → "a"।') },
  { id: 'd-g3', area: 'grammar', type: 'choice', tag: 'agreement', concept: 'present-simple', prompt: q('Choose the correct word.', 'সঠিক শব্দ বাছো।'), sentence: 'She ___ to university every day.', options: ['go', 'goes', 'going'], answer: 'goes', explanation: q('"She" + a habit → "goes".', '"She" + অভ্যাস → "goes"।') },
  { id: 'd-g4', area: 'grammar', type: 'choice', tag: 'preposition', prompt: q('Choose the correct word.', 'সঠিক শব্দ বাছো।'), sentence: 'Sales increased ___ 20% in 2021.', options: ['by', 'with', 'on'], answer: 'by', explanation: q('The size of a change: "increased by 20%".', 'পরিবর্তনের পরিমাণ: "increased by 20%"।') },
  { id: 'd-g5', area: 'grammar', type: 'choice', tag: 'word-form', prompt: q('Choose the correct word.', 'সঠিক শব্দ বাছো।'), sentence: 'There was a ___ increase in prices.', options: ['significant', 'significantly', 'significance'], answer: 'significant', explanation: q('Before a noun ("increase") we need an adjective.', 'Noun ("increase")-এর আগে adjective লাগে।') },
  { id: 'd-g6', area: 'grammar', type: 'choice', tag: 'tense', concept: 'present-perfect', prompt: q('Choose the correct words.', 'সঠিক শব্দ বাছো।'), sentence: 'I ___ in Dhaka since 2019.', options: ['live', 'have lived', 'am living'], answer: 'have lived', explanation: q('"since 2019" up to now → Present Perfect.', '"since 2019" থেকে এখন পর্যন্ত → Present Perfect।') },
  // Vocabulary
  { id: 'd-v1', area: 'vocabulary', type: 'choice', tag: 'vocabulary', prompt: q('What does "reduce" mean here?', 'এখানে "reduce" মানে কী?'), sentence: 'The government plans to reduce air pollution.', options: ['make smaller', 'make bigger', 'measure'], answer: 'make smaller', explanation: noExplain },
  { id: 'd-v2', area: 'vocabulary', type: 'choice', tag: 'vocabulary', prompt: q('Which word is closest in meaning to "similar"?', '"similar"-এর সবচেয়ে কাছাকাছি অর্থের শব্দ কোনটা?'), sentence: 'The two results were similar.', options: ['alike', 'different', 'surprising'], answer: 'alike', explanation: noExplain },
  { id: 'd-v3', area: 'vocabulary', type: 'choice', tag: 'collocation', prompt: q('Choose the word that goes naturally with "progress".', '"progress"-এর সাথে স্বাভাবিকভাবে কোন শব্দ বসে?'), sentence: 'Students who practise every day ___ faster progress.', options: ['make', 'do', 'give'], answer: 'make', explanation: noExplain },
  { id: 'd-v4', area: 'vocabulary', type: 'choice', tag: 'vocabulary', prompt: q('A "decline" in sales means that sales…', 'Sales-এ "decline" মানে sales…'), options: ['went down', 'went up', 'stayed the same'], answer: 'went down', explanation: noExplain },
  // Sentence construction
  { id: 'd-s1', area: 'sentence', type: 'order', tag: 'sentence-structure', prompt: q('Put the words in order.', 'শব্দগুলো সাজাও।'), answer: 'Many students study English online.', explanation: noExplain },
  { id: 'd-s2', area: 'sentence', type: 'choice', tag: 'subject', prompt: q('Which sentence is correct?', 'কোন sentence সঠিক?'), options: ['Is important to save money.', 'It is important to save money.', 'Important to save money is.'], answer: 'It is important to save money.', explanation: noExplain },
  { id: 'd-s3', area: 'sentence', type: 'choice', tag: 'complex-sentence', prompt: q('Which sentence joins the ideas correctly?', 'কোন sentence idea দুটো সঠিকভাবে জোড়ে?'), sentence: 'It was raining. We went out.', options: ['Although it was raining, we went out.', 'Although it was raining, but we went out.', 'Because it was raining, we went out.'], answer: 'Although it was raining, we went out.', explanation: noExplain },
  { id: 'd-s4', area: 'sentence', type: 'choice', tag: 'verb', prompt: q('What is missing?', 'কী বাদ পড়েছে?'), sentence: 'My brother a doctor in Khulna.', options: ['a subject', 'a verb', 'an object'], answer: 'a verb', explanation: noExplain },
  // Reading (uses DIAGNOSTIC_READING)
  { id: 'd-r1', area: 'reading', type: 'choice', tag: 'reading', prompt: q('According to the text, floods can be useful because they…', 'Text অনুযায়ী বন্যা উপকারীও হতে পারে, কারণ…'), options: ['bring fresh soil to farmland', 'provide drinking water', 'create new jobs'], answer: 'bring fresh soil to farmland', explanation: noExplain },
  { id: 'd-r2', area: 'reading', type: 'choice', tag: 'reading', prompt: q('What has happened to the number of flood deaths?', 'বন্যায় মৃত্যুর সংখ্যার কী হয়েছে?'), options: ['It has fallen sharply.', 'It has stayed the same.', 'It has increased.'], answer: 'It has fallen sharply.', explanation: noExplain },
  { id: 'd-r3', area: 'reading', type: 'choice', tag: 'reading', prompt: q('TRUE, FALSE or NOT GIVEN?', 'TRUE, FALSE নাকি NOT GIVEN?'), sentence: 'Experts are certain that flooding will become more frequent.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: noExplain },
  // Listening (read aloud by the browser)
  { id: 'd-l1', area: 'listening', type: 'gap', tag: 'listening', audio: "My name is Sarah Collins. That's C, O, double L, I, N, S.", prompt: q('Listen and write the surname.', 'শুনে surname লেখো।'), sentence: 'Surname: ___', accepted: ['Collins'], explanation: noExplain },
  { id: 'd-l2', area: 'listening', type: 'choice', tag: 'listening', audio: "The meeting was planned for Monday, but we've moved it to Thursday.", prompt: q('Listen. When is the meeting now?', 'শোনো। Meeting এখন কবে?'), options: ['Monday', 'Tuesday', 'Thursday'], answer: 'Thursday', explanation: noExplain },
  { id: 'd-l3', area: 'listening', type: 'choice', tag: 'listening', audio: "Hello, I'd like to book a table for four people at half past seven this evening, please.", prompt: q('Listen. What time is the booking?', 'শোনো। Booking কয়টায়?'), options: ['4:30', '7:15', '7:30'], answer: '7:30', explanation: noExplain },
];

export const levelFor = (percent: number): FoundationLevel => (percent >= 80 ? 'strong' : percent >= 50 ? 'developing' : 'needs');

/** Scores answers into a level, per-area percentages and the modules to focus on. */
export function scoreDiagnostic(answers: Record<string, string>, now = new Date()): FoundationDiagnosticRecord & { wrongTags: ErrorTag[] } {
  const areas = {} as Record<FoundationArea, number>;
  const wrongTags: ErrorTag[] = [];
  const concepts: Record<string, boolean> = {};
  for (const area of DIAGNOSTIC_AREAS) {
    const items = DIAGNOSTIC_ITEMS.filter((i) => i.area === area);
    let right = 0;
    for (const item of items) {
      const ok = Boolean(gradeExercise(item, answers[item.id]));
      if (item.concept) concepts[item.concept] = ok;
      if (ok) right++;
      else wrongTags.push(item.tag);
    }
    areas[area] = Math.round((right / items.length) * 100);
  }
  const percent = Math.round(DIAGNOSTIC_AREAS.reduce((s, a) => s + areas[a], 0) / DIAGNOSTIC_AREAS.length);

  // Modules that practise the tags the student got wrong, most-needed first.
  const counts = new Map<string, number>();
  for (const tag of wrongTags) {
    for (const m of MODULES) if (m.tags.includes(tag)) counts.set(m.id, (counts.get(m.id) ?? 0) + 1);
  }
  const order = (id: string) => MODULES.findIndex((m) => m.id === id);
  const focusModules = [...counts.entries()].sort((a, b) => b[1] - a[1] || order(a[0]) - order(b[0])).map(([id]) => id);

  const level = levelFor(percent);
  return { completedAt: now.toISOString(), level, percent, areas, focusModules, concepts, ...adaptiveStart({ level, areas, concepts }), wrongTags };
}

/** Strong and weak areas for the result screen (≥75% strong, <50% needs work). */
export function diagnosticAreas(record: Pick<FoundationDiagnosticRecord, 'areas'>) {
  const entries = DIAGNOSTIC_AREAS.map((a) => [a, record.areas[a]] as const);
  return {
    strong: entries.filter(([, p]) => p >= 75).map(([a]) => a),
    weak: entries.filter(([, p]) => p < 50).map(([a]) => a),
  };
}

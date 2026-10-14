// Foundation content integrity: the active catalogue, ID stability for saved
// progress, bilingual completeness and answer-key shape.
//   npx -y tsx scripts/test-foundation-integrity.ts
import fs from 'node:fs';
import { MODULES } from '../lib/foundation/content';
import { CHALLENGES } from '../lib/foundation/content/challenges';
import { answerKey, canonicalAnswer, gradeExercise, orderWords } from '../lib/foundation/grade';
import { lessonPages } from '../lib/foundation/flow';
import type { Exercise, L, Lesson } from '../lib/foundation/model';
import { validateFoundation } from '../lib/foundation/validate';

let failed = 0;
function check(name: string, ok: boolean, detail: unknown = '') {
  if (!ok) failed++;
  console.log(ok ? '  PASS' : '  FAIL', name, ok ? '' : typeof detail === 'string' ? detail.slice(0, 1500) : JSON.stringify(detail).slice(0, 1500));
}

const EXPECTED_MODULES = [
  'sentence-basics', 'tenses', 'parts-of-speech', 'articles', 'agreement', 'prepositions', 'connectors', 'complex-sentences',
  'punctuation', 'common-errors', 'vocabulary-foundation', 'ielts-intro', 'listening-foundation', 'reading-foundation',
  'writing-foundation', 'speaking-foundation',
];
const STEP_KINDS = new Set(['hook', 'discover', 'identify', 'concept', 'examples', 'ielts', 'mistakes', 'practice', 'recall']);
const BENGALI = /[ঀ-৿]/;

const lessons = MODULES.flatMap((m) => m.lessons.map((l) => ({ m, l })));
const exercisesOf = (l: Lesson): Exercise[] => l.steps.flatMap((s) => (s.kind === 'practice' ? s.exercises : []));

// ---------------------------------------------------------------- catalogue
check('the active catalogue has exactly the 16 Foundation modules, in order', MODULES.map((m) => m.id).join(',') === EXPECTED_MODULES.join(','), MODULES.map((m) => m.id));
check('every module has lessons', MODULES.every((m) => m.lessons.length > 0));
const validation = validateFoundation();
check('content validator: no errors', validation.length === 0, validation.join('\n'));

// ---------------------------------------------------------------- ID stability (saved progress)
const lock = JSON.parse(fs.readFileSync('scripts/fixtures/foundation-ids.json', 'utf8')) as {
  modules: { id: string; lessons: { id: string; exercises: string[] }[] }[];
  challenges: { id: string; items: string[] }[];
};
const missingLessons: string[] = [];
const movedLessons: string[] = [];
const missingExercises: string[] = [];
const orderBroken: string[] = [];
for (const lm of lock.modules) {
  const m = MODULES.find((x) => x.id === lm.id);
  if (!m) { missingLessons.push(`module ${lm.id}`); continue; }
  const now = m.lessons.map((l) => l.id);
  let last = -1;
  for (const ll of lm.lessons) {
    const idx = now.indexOf(ll.id);
    if (idx < 0) {
      if (lessons.some((x) => x.l.id === ll.id)) movedLessons.push(ll.id);
      else missingLessons.push(ll.id);
      continue;
    }
    if (idx < last) orderBroken.push(ll.id);
    last = idx;
    const ex = new Set(exercisesOf(m.lessons[idx]).map((e) => e.id));
    for (const id of ll.exercises) if (!ex.has(id)) missingExercises.push(`${ll.id}/${id}`);
  }
}
check('no active lesson disappeared from the catalogue', missingLessons.length === 0, missingLessons);
check('no lesson moved to another module', movedLessons.length === 0, movedLessons);
check('lesson order inside each module is unchanged', orderBroken.length === 0, orderBroken);
check('every saved-progress exercise ID is still in its lesson', missingExercises.length === 0, missingExercises);
const missingItems = lock.challenges.flatMap((c) => {
  const ch = CHALLENGES.find((x) => x.id === c.id);
  const now = new Set(ch?.parts.flatMap((p) => p.items.map((i) => i.id)) ?? []);
  return c.items.filter((i) => !now.has(i)).map((i) => `${c.id}/${i}`);
});
check('every Final Mastery Challenge item ID is still present', missingItems.length === 0, missingItems);

const allIds = [...lessons.map((x) => x.l.id), ...lessons.flatMap((x) => exercisesOf(x.l).map((e) => e.id))];
check('lesson and exercise IDs are unique across the Foundation', new Set(allIds).size === allIds.length, allIds.filter((id, i) => allIds.indexOf(id) !== i));
check('IDs are lowercase slugs', allIds.every((id) => /^[a-z0-9][a-z0-9-]*$/.test(id)), allIds.filter((id) => !/^[a-z0-9][a-z0-9-]*$/.test(id)));

// ---------------------------------------------------------------- structure
const badKinds = lessons.flatMap(({ l }) => l.steps.filter((s) => !STEP_KINDS.has(s.kind)).map((s) => `${l.id}:${s.kind}`));
check('every step kind is one the lesson player renders', badKinds.length === 0, badKinds);
const unreachable = lessons.filter(({ l }) => lessonPages(l).length === 0).map(({ l }) => l.id);
check('every lesson renders at least one screen', unreachable.length === 0, unreachable);
const prereq = lessons.flatMap(({ l }) => (l.prerequisites ?? []).filter((p) => !lessons.some((x) => x.l.id === p)).map((p) => `${l.id}→${p}`));
check('lesson prerequisites point to active lessons', prereq.length === 0, prereq);

// ---------------------------------------------------------------- bilingual completeness
function walkL(value: unknown, path: string, out: { path: string; l: L }[]) {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value)) { value.forEach((v, i) => walkL(v, `${path}[${i}]`, out)); return; }
  const o = value as Record<string, unknown>;
  if (typeof o.en === 'string' && typeof o.bn === 'string' && Object.keys(o).every((k) => k === 'en' || k === 'bn')) {
    out.push({ path, l: o as unknown as L });
    return;
  }
  for (const [k, v] of Object.entries(o)) walkL(v, `${path}.${k}`, out);
}
const texts: { path: string; l: L }[] = [];
for (const { l } of lessons) walkL(l, l.id, texts);
// A writing task's "explanation" is its model answer in English (shown in both languages).
const modelAnswers = new Set(lessons.flatMap(({ l }) => exercisesOf(l).filter((e) => e.type === 'write').map((e) => e.explanation)));
const empty = texts.filter((t) => !t.l.en.trim() || !t.l.bn.trim()).map((t) => t.path);
check(`every bilingual text has English and Bangla (${texts.length} texts)`, empty.length === 0, empty);
// Quoted text is study material (an English sentence, or a Bangla sentence shown for contrast).
const unquoted = (s: string) => s.replace(/"[^"]*"|“[^”]*”|‘[^’]*’|'[^']*'|\([^)]*\)/g, ' ');
const proseWords = (s: string) => unquoted(s).split(/[^A-Za-z]+/).filter((w) => w.length > 2).length;
// Explanations must really be in Bangla: a Bangla field that only repeats an English explanation
// (not a formula, word list or quoted study sentence) was never translated.
const untranslated = texts.filter((t) => !modelAnswers.has(t.l) && t.l.bn === t.l.en && !BENGALI.test(t.l.bn) && proseWords(t.l.bn) >= 7 && !/→|\+|=|·|\//.test(t.l.bn)).map((t) => t.path);
check('Bangla explanations are written in Bangla (not a copy of the English)', untranslated.length === 0, untranslated);
// (English explanations may show a Bangla sentence for contrast, e.g. "সে ডাক্তার → He is a doctor.", so
// Bangla script in an English explanation is allowed. What the student must type or pick stays English.)
const bnInEnglish: string[] = [];
for (const { l } of lessons) {
  for (const e of exercisesOf(l)) {
    const answers = [e.sentence ?? '', ...('accepted' in e ? e.accepted : []), ...(e.type === 'order' || e.type === 'choice' ? [e.answer] : [])];
    if (answers.some((a) => BENGALI.test(a))) bnInEnglish.push(e.id);
  }
}
check('exercise sentences and correct answers are in English', bnInEnglish.length === 0, bnInEnglish);

// ---------------------------------------------------------------- answer keys
const keyProblems: string[] = [];
for (const { l } of lessons) {
  for (const e of exercisesOf(l)) {
    if (e.type === 'choice') {
      if (new Set(e.options).size !== e.options.length) keyProblems.push(`${e.id}: duplicate options`);
      if (e.options.length < 2) keyProblems.push(`${e.id}: needs 2+ options`);
    }
    if (e.type === 'gap' || e.type === 'correct' || e.type === 'spot') {
      if (!Array.isArray(e.accepted) || e.accepted.length === 0 || e.accepted.some((a) => !a.trim())) keyProblems.push(`${e.id}: accepted answers must be a non-empty list`);
      // ’ and ' versions are both listed on purpose (phones type either); any other pair that grades
      // the same is a redundant slip.
      const groups = new Map<string, Set<string>>();
      for (const a of e.accepted) groups.set(answerKey(e, a), (groups.get(answerKey(e, a)) ?? new Set()).add(a.replace(/[’‘]/g, "'")));
      for (const [key, raw] of groups) if (raw.size > 1) keyProblems.push(`${e.id}: accepted answers repeat "${key}"`);
      for (const a of e.accepted) if (gradeExercise(e, e.type === 'spot' ? `${e.wrong}:${a}` : a) !== true) keyProblems.push(`${e.id}: accepted "${a}" does not grade as correct`);
    }
    if (e.type === 'correct' && e.sentence && e.accepted.some((a) => answerKey(e, a) === answerKey(e, e.sentence!))) keyProblems.push(`${e.id}: the "fix" equals the original sentence`);
    if (e.type === 'order') {
      const words = (s: string) => orderWords(s).map((w) => w.toLowerCase()).sort().join(' ');
      for (const alt of e.alsoAccepted ?? []) if (words(alt) !== words(e.answer)) keyProblems.push(`${e.id}: alternative "${alt}" uses different words`);
    }
    if (e.type === 'tag' && !/^(\d+=[a-z]+)(\|\d+=[a-z]+)*$/.test(canonicalAnswer(e))) keyProblems.push(`${e.id}: tag answer format`);
    if (e.type === 'spot' && !/^\d+:/.test(canonicalAnswer(e))) keyProblems.push(`${e.id}: spot answer format`);
    if (e.type !== 'write' && !(e.explanation.en.trim() && e.explanation.bn.trim())) keyProblems.push(`${e.id}: feedback explanation missing`);
  }
}
check('answer keys: options, accepted lists, orders, tags and spots are well-formed', keyProblems.length === 0, keyProblems);

// ---------------------------------------------------------------- IELTS facts (checked 2026-10-14, see docs/FOUNDATION_INTEGRATION_INVENTORY.md)
const exById = (id: string) => lessons.flatMap(({ l }) => exercisesOf(l)).find((e) => e.id === id)!;
const grades = (id: string, answer: string) => gradeExercise(exById(id), answer);
// Paper-based IELTS ends from mid-2026 and is no longer offered in Bangladesh (IDP, after 31 Jan 2026):
// computer Listening gives 2 minutes to check, with no transfer time.
check('computer Listening: 2 minutes to check (ib-3-r1, ib-3-c2, ib-9-e10, ls-8-p5)',
  grades('ib-3-r1', '2') === true && grades('ib-3-c2', `${(exById('ib-3-c2') as { wrong: number }).wrong}:2`) === true
  && grades('ib-9-e10', 'Computer-delivered Listening gives 2 minutes to check answers.') === true && grades('ls-8-p5', '2 minutes') === true && grades('ls-8-p5', '10 minutes') === false);
const deliveryText = JSON.stringify(lessons.filter(({ m }) => m.id === 'ielts-intro' || m.id === 'listening-foundation' || m.id === 'reading-foundation').map(({ l }) => l));
check('no lesson presents a paper test as a current choice', !/choose the paper-based test|Paper-based Listening gives 10 minutes|In paper-based Listening you get/i.test(deliveryText));
check('ib-3 teaches the current delivery facts', /mid-2026/.test(JSON.stringify(lessons.find(({ l }) => l.id === 'ib-3')!.l)) && /Writing on Paper/.test(JSON.stringify(lessons.find(({ l }) => l.id === 'ib-3')!.l)));
// Letter case does not change a Listening mark; spelling does.
check('Listening does not teach that a lowercase name is marked wrong', !/Names need a capital|names take capitals/i.test(deliveryText));

console.log(failed ? `\n${failed} check(s) failed` : `\nAll integrity checks passed (${lessons.length} lessons)`);
process.exit(failed ? 1 : 0);

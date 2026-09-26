import { CONCEPTS, MODULES } from './content';
import { FINAL_PARTS } from './content/pos-final';
import { POS_NAMED_PATTERNS } from './content/pos-patterns';
import { DIAGNOSTIC_ITEMS } from './diagnostic';
import { canonicalAnswer, gradeExercise, normaliseAnswer, spotCorrected } from './grade';
import type { Exercise, L, Lesson } from './model';

const filled = (l: L | undefined) => Boolean(l && l.en.trim() && l.bn.trim());

function checkExercise(ex: Exercise, where: string, errors: string[]) {
  const at = `${where} ${ex.id}`;
  if (!filled(ex.prompt)) errors.push(`${at}: prompt needs en and bn`);
  if (ex.type === 'choice' && !ex.options.includes(ex.answer)) errors.push(`${at}: answer is not an option`);
  if (ex.type === 'gap' && !ex.sentence?.includes('___')) errors.push(`${at}: gap sentence needs ___`);
  if (ex.type === 'order' && ex.answer.split(/\s+/).length < 3) errors.push(`${at}: order needs 3+ words`);
  if (ex.type === 'write' && ex.checklist.length === 0) errors.push(`${at}: write needs a checklist`);
  if (ex.type !== 'write' && gradeExercise(ex, canonicalAnswer(ex)) !== true) errors.push(`${at}: its own answer does not grade as correct`);
  if (ex.type === 'tag') {
    if (!ex.tokens.some((t) => t.pos)) errors.push(`${at}: tag needs at least one word to tag`);
    for (const t of ex.tokens) if (t.pos && !ex.choices.includes(t.pos)) errors.push(`${at}: "${t.w}" job ${t.pos} is not a choice`);
  }
  if (ex.type === 'spot') {
    if (!ex.words[ex.wrong]) errors.push(`${at}: spot wrong index out of range`);
    if (ex.fixOptions && !ex.fixOptions.includes(ex.accepted[0])) errors.push(`${at}: spot fix options must include the answer`);
    if (ex.accepted.some((a) => normaliseAnswer(a) === normaliseAnswer(ex.words[ex.wrong]))) errors.push(`${at}: spot fix equals the wrong word`);
    for (const fix of ex.accepted) {
      const words = spotCorrected(ex, fix).toLowerCase().replace(/[.,;:!?()"]/g, '').split(/\s+/);
      if (words.some((w, i) => i > 0 && w === words[i - 1])) errors.push(`${at}: spot fix "${fix}" repeats a word (the fix may need a deletion)`);
    }
  }
  if (ex.wrongPos) {
    if (!ex.pos) errors.push(`${at}: wrongPos needs pos`);
    for (const [k, p] of Object.entries(ex.wrongPos)) {
      if (p === ex.pos) errors.push(`${at}: wrongPos "${k}" has the same job as the answer`);
      if (ex.type === 'choice' && (!ex.options.includes(k) || k === ex.answer)) errors.push(`${at}: wrongPos key "${k}" is not a wrong option`);
      if (ex.type === 'spot' && ex.fixOptions && !ex.fixOptions.includes(k)) errors.push(`${at}: wrongPos key "${k}" is not a fix option`);
      if ((ex.type === 'gap' || ex.type === 'correct') && normaliseAnswer(k) !== k.toLowerCase().trim()) errors.push(`${at}: wrongPos key "${k}" must be normalised`);
    }
  }
  if (ex.concept && !CONCEPTS.some((c) => c.id === ex.concept)) errors.push(`${at}: unknown concept ${ex.concept}`);
  if ((ex.type === 'choice' || ex.type === 'gap' || ex.type === 'correct') && ex.why) {
    for (const [wrong, reason] of Object.entries(ex.why)) {
      if (!filled(reason)) errors.push(`${at}: why "${wrong}" needs en and bn`);
      if (ex.type === 'choice' && (!ex.options.includes(wrong) || wrong === ex.answer)) errors.push(`${at}: why key "${wrong}" is not a wrong option`);
      if (ex.type !== 'choice' && (gradeExercise(ex, wrong) !== false || normaliseAnswer(wrong) !== wrong.toLowerCase().trim())) errors.push(`${at}: why key "${wrong}" must be a normalised wrong answer`);
    }
  }
}

/** Every lesson answers: what (concept), why/where (IELTS use), how (examples/practice), can I (practice). */
export function validateLesson(lesson: Lesson, errors: string[]) {
  const kinds = lesson.steps.map((s) => s.kind);
  const required = lesson.kind === 'test' ? (['practice'] as const) : lesson.format === 'lab' ? (['hook', 'mistakes', 'practice', 'recall'] as const) : (['concept', 'ielts', 'practice', 'recall'] as const);
  for (const k of required) if (!kinds.includes(k)) errors.push(`${lesson.id}: missing ${k} step`);
  if (lesson.concept && !CONCEPTS.some((c) => c.id === lesson.concept)) errors.push(`${lesson.id}: unknown concept ${lesson.concept}`);
  if (!filled(lesson.title) || !filled(lesson.why)) errors.push(`${lesson.id}: title/why need en and bn`);
  if (lesson.minutes < 3 || lesson.minutes > 15) errors.push(`${lesson.id}: lessons are 3–15 minutes`);
  if (lesson.format === 'v2') validateV2(lesson, errors);
  if (lesson.format === 'lab') validateLab(lesson, errors);
  for (const step of lesson.steps) {
    if (!filled(step.title)) errors.push(`${lesson.id}: step title needs en and bn`);
    if (step.kind === 'ielts' && step.uses.length === 0) errors.push(`${lesson.id}: needs at least one IELTS use`);
    if (step.kind === 'practice') {
      if (step.mode !== 'personal' && step.exercises.length < 3) errors.push(`${lesson.id}: practice needs 3+ exercises`);
      for (const ex of step.exercises) checkExercise(ex, lesson.id, errors);
    }
  }
}

/** A repair station: spot-and-fix items each followed by a "why", then targeted practice without options. */
function validateLab(lesson: Lesson, errors: string[]) {
  const at = (m: string) => errors.push(`${lesson.id} (lab): ${m}`);
  if (lesson.steps[0]?.kind !== 'hook') at('must start with the hook');
  const practice = lesson.steps.filter((s): s is Extract<Lesson['steps'][number], { kind: 'practice' }> => s.kind === 'practice');
  const repair = practice.filter((s) => (s.mode ?? 'practice') === 'practice').flatMap((s) => s.exercises);
  const spots = repair.filter((e) => e.type === 'spot');
  if (spots.length < 3) at('needs 3+ spot-and-fix repairs');
  repair.forEach((e, i) => {
    if (e.type === 'spot' && repair[i + 1]?.type !== 'choice') at(`${e.id}: every repair is followed by a "why" question`);
    if (e.type === 'spot' && e.fixOptions) at(`${e.id}: the fix is typed (free recall)`);
  });
  const recall = practice.filter((s) => s.mode === 'recall').flatMap((s) => s.exercises);
  if (recall.length < 3) at('needs 3+ targeted practice questions');
  if (recall.some((e) => e.type === 'choice' || e.type === 'order' || e.type === 'tag' || (e.type === 'spot' && e.fixOptions))) at('targeted practice has no options');
}

/** The problem-first format: every stage must be present and well-formed. */
function validateV2(lesson: Lesson, errors: string[]) {
  const at = (m: string) => errors.push(`${lesson.id} (v2): ${m}`);
  const kinds = lesson.steps.map((s) => s.kind);
  for (const k of ['hook', 'concept', 'examples', 'ielts', 'mistakes', 'practice', 'recall'] as const) if (!kinds.includes(k)) at(`missing ${k}`);
  if (!kinds.includes('discover') && !kinds.includes('identify')) at('missing discover (or identify)');
  if (kinds[0] !== 'hook') at('must start with the hook (student answers first)');
  for (const step of lesson.steps) {
    if (step.kind === 'hook') {
      if (!step.options.includes(step.answer)) at('hook answer is not an option');
      if (!filled(step.situation) || !filled(step.question)) at('hook text needs en and bn');
      for (const o of step.options) if (!filled(step.diagnose[o])) at(`hook needs a diagnosis for "${o}"`);
    }
    if (step.kind === 'discover') {
      if (step.items.length < 3) at('discover needs 3+ examples');
      if (!step.options[step.answer] || !filled(step.pattern)) at('discover needs a valid answer and a pattern');
    }
    if (step.kind === 'mistakes' && step.items.length < 3) at('mistake lab needs 3+ items');
    if (step.kind === 'identify') {
      if (step.tokens.filter((t) => t.pos).length < 3) at('identify needs 3+ words to tag');
      for (const t of step.tokens) if (t.pos && !step.choices.includes(t.pos)) at(`identify: ${t.w} job not a choice`);
      if (!filled(step.question) || !filled(step.pattern)) at('identify needs a question and a pattern');
    }
  }
  const practice = lesson.steps.filter((s): s is Extract<Lesson['steps'][number], { kind: 'practice' }> => s.kind === 'practice');
  const byMode = (m: string) => practice.filter((s) => (s.mode ?? 'practice') === m).flatMap((s) => s.exercises);
  if (byMode('practice').length < 4) at('needs 4+ practice questions');
  const recall = byMode('recall');
  if (recall.length < 3) at('needs 3+ active recall questions');
  if (recall.some((e) => e.type === 'choice' || e.type === 'order' || e.type === 'tag' || (e.type === 'spot' && e.fixOptions))) at('active recall must have no options');
  const personal = byMode('personal');
  if (!personal.some((e) => e.type === 'write' && e.mino)) at('needs a personal-use task with Mino feedback');
  if (lesson.concept && [...byMode('practice'), ...recall].some((e) => e.concept && e.concept !== lesson.concept && e.tag === 'tense' && lesson.concept !== 'time')) at('practice should stay on the lesson concept');
}

export function validateFoundation(): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const seen = (id: string) => (ids.has(id) ? errors.push(`duplicate id ${id}`) : ids.add(id));
  for (const m of MODULES) {
    seen(m.id);
    if (!filled(m.title) || !filled(m.description) || !filled(m.ieltsLink)) errors.push(`${m.id}: module text needs en and bn`);
    if (m.lessons.length === 0 && !m.planned?.length) errors.push(`${m.id}: no lessons`);
    for (const l of m.lessons) {
      seen(l.id);
      validateLesson(l, errors);
      for (const s of l.steps) if (s.kind === 'practice') s.exercises.forEach((e) => seen(e.id));
    }
  }
  for (const c of CONCEPTS) {
    const lesson = MODULES.flatMap((m) => m.lessons).find((x) => x.id === c.lessonId);
    if (!lesson || lesson.concept !== c.id) errors.push(`concept ${c.id}: lesson ${c.lessonId} must teach it`);
    const pool = MODULES.flatMap((m) => m.lessons.flatMap((x) => x.steps.flatMap((st) => (st.kind === 'practice' ? st.exercises : []))));
    if (pool.filter((e) => e.concept === c.id && e.type !== 'write').length < 5) errors.push(`concept ${c.id}: needs 5+ auto-graded questions for review`);
  }
  for (const part of FINAL_PARTS) {
    if (!filled(part.title) || !filled(part.intro)) errors.push(`final ${part.id}: title/intro need en and bn`);
    if (part.items.length < 4) errors.push(`final ${part.id}: needs 4+ items (3 are served adaptively)`);
    for (const lv of [1, 2, 3]) if (!part.items.some((i) => i.level === lv)) errors.push(`final ${part.id}: needs a level ${lv} item`);
    for (const item of part.items) {
      seen(item.id);
      checkExercise(item, `final ${part.id}`, errors);
      if (item.type === 'write') errors.push(`final ${item.id}: must be auto-graded`);
    }
  }
  const finalAll = FINAL_PARTS.flatMap((p) => p.items);
  if (finalAll.filter((e) => e.type === 'gap' || e.type === 'correct' || (e.type === 'spot' && !e.fixOptions)).length < 12) errors.push('final: needs 12+ free-recall items');
  const allExercises = [...MODULES.flatMap((m) => m.lessons.flatMap((x) => x.steps.flatMap((st) => (st.kind === 'practice' ? st.exercises : [])))), ...finalAll];
  for (const e of allExercises) if (e.pattern && !(e.pattern in POS_NAMED_PATTERNS)) errors.push(`${e.id}: unknown pattern ${e.pattern}`);
  for (const item of DIAGNOSTIC_ITEMS) {
    seen(item.id);
    checkExercise(item, 'diagnostic', errors);
  }
  return errors;
}

import { MODULES } from './content';
import { DIAGNOSTIC_ITEMS } from './diagnostic';
import { gradeExercise, expectedAnswer } from './grade';
import type { Exercise, L, Lesson } from './model';

const filled = (l: L | undefined) => Boolean(l && l.en.trim() && l.bn.trim());

function checkExercise(ex: Exercise, where: string, errors: string[]) {
  const at = `${where} ${ex.id}`;
  if (!filled(ex.prompt)) errors.push(`${at}: prompt needs en and bn`);
  if (ex.type === 'choice' && !ex.options.includes(ex.answer)) errors.push(`${at}: answer is not an option`);
  if (ex.type === 'gap' && !ex.sentence?.includes('___')) errors.push(`${at}: gap sentence needs ___`);
  if (ex.type === 'order' && ex.answer.split(/\s+/).length < 3) errors.push(`${at}: order needs 3+ words`);
  if (ex.type === 'write' && ex.checklist.length === 0) errors.push(`${at}: write needs a checklist`);
  if (ex.type !== 'write' && gradeExercise(ex, expectedAnswer(ex)) !== true) errors.push(`${at}: its own answer does not grade as correct`);
}

/** Every lesson answers: what (concept), why/where (IELTS use), how (examples/practice), can I (practice). */
export function validateLesson(lesson: Lesson, errors: string[]) {
  const kinds = lesson.steps.map((s) => s.kind);
  for (const k of ['concept', 'ielts', 'practice', 'recall'] as const) if (!kinds.includes(k)) errors.push(`${lesson.id}: missing ${k} step`);
  if (!filled(lesson.title) || !filled(lesson.why)) errors.push(`${lesson.id}: title/why need en and bn`);
  if (lesson.minutes < 3 || lesson.minutes > 15) errors.push(`${lesson.id}: lessons are 3–15 minutes`);
  for (const step of lesson.steps) {
    if (!filled(step.title)) errors.push(`${lesson.id}: step title needs en and bn`);
    if (step.kind === 'ielts' && step.uses.length === 0) errors.push(`${lesson.id}: needs at least one IELTS use`);
    if (step.kind === 'practice') {
      if (step.exercises.length < 3) errors.push(`${lesson.id}: practice needs 3+ exercises`);
      for (const ex of step.exercises) checkExercise(ex, lesson.id, errors);
    }
  }
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
  for (const item of DIAGNOSTIC_ITEMS) {
    seen(item.id);
    checkExercise(item, 'diagnostic', errors);
  }
  return errors;
}

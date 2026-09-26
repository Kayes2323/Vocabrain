// Content checks run in tests (and can run before publishing a new book), so a
// typo in content fails loudly instead of mis-scoring students.
import type { ObjectiveSection, PracticeTest, TestBook } from './model';
import { answerMode, optionsFor, QUESTION_TYPES } from './question-types';
import { expandAccepted, normalise } from './scoring';

/** Content from a publisher (e.g. Cambridge) may only ship when licensed. */
export function isPublishable(item: { sourceType: string; licenseStatus: string }): boolean {
  if (item.licenseStatus === 'pending-review') return false;
  if (item.sourceType === 'licensed-publisher') return item.licenseStatus === 'licensed';
  return true;
}

function checkSection(section: ObjectiveSection, where: string, errors: string[]) {
  const numbers: number[] = [];
  const ids = new Set<string>();
  const unique = (id: string, label: string) => {
    if (ids.has(id)) errors.push(`${where}: duplicate id ${label} "${id}"`);
    ids.add(id);
  };

  for (const part of section.parts) {
    unique(part.id, 'part');
    const at = `${where} part ${part.number}`;
    if (section.skill === 'reading' && !part.passage) errors.push(`${at}: reading part needs a passage`);
    if (section.skill === 'listening' && !part.audio?.src && !part.audio?.script?.length) errors.push(`${at}: listening part needs audio or a script`);
    const paragraphIds = new Set(part.passage?.paragraphs.map((p) => p.id));

    for (const group of part.groups) {
      unique(group.id, 'group');
      const g = `${at} group ${group.id}`;
      if (!QUESTION_TYPES[group.type].skills.includes(section.skill)) errors.push(`${g}: ${group.type} is not a ${section.skill} type`);
      if (group.questions.length === 0) errors.push(`${g}: no questions`);
      const mode = answerMode(group);
      if (mode === 'multi-choice' && group.choose !== group.questions.length) errors.push(`${g}: choose must equal the number of questions`);

      const gaps = [...(group.template ?? '').matchAll(/\{\{(\d+)\}\}/g), ...(group.table?.rows.flat().join(' ') ?? '').matchAll(/\{\{(\d+)\}\}/g)].map((m) => Number(m[1]));
      if ((group.template || group.table) && gaps.sort((a, b) => a - b).join() !== group.questions.map((q) => q.number).join()) {
        errors.push(`${g}: gaps {{n}} must match question numbers`);
      }

      group.questions.forEach((q, i) => {
        unique(q.id, 'question');
        numbers.push(q.number);
        const qa = `${g} Q${q.number}`;
        if (q.answer.accepted.length === 0) errors.push(`${qa}: no accepted answer`);
        if (mode !== 'text') {
          const valid = new Set(optionsFor(group, i).map((o) => o.id.toUpperCase()));
          for (const a of q.answer.accepted) if (!valid.has(a.toUpperCase())) errors.push(`${qa}: answer "${a}" is not an option`);
        }
        if (mode === 'text' && !group.template && !group.table && !q.prompt?.includes('___')) errors.push(`${qa}: completion prompt needs a ___ gap`);
        // "…from the passage": the main answer must appear word for word in the passage
        // (other accepted forms may be spelling variants).
        if (mode === 'text' && part.passage && /from the passage/i.test(group.instructions)) {
          const passageText = ` ${normalise(part.passage.paragraphs.map((p) => p.text).join(' ')).replace(/[^a-z0-9' -]/g, ' ').replace(/\s+/g, ' ')} `;
          const forms = expandAccepted(q.answer.accepted[0] ?? '');
          if (!forms.some((a) => passageText.includes(` ${a} `))) errors.push(`${qa}: answer "${q.answer.accepted[0]}" is not in the passage`);
        }
        const ref = q.explanation?.evidence?.paragraphId;
        if (ref && !paragraphIds.has(ref)) errors.push(`${qa}: evidence paragraph "${ref}" not in passage`);
      });
    }
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  if (sorted.some((n, i) => n !== i + 1)) errors.push(`${where}: question numbers must run 1..${numbers.length} without gaps or repeats`);
}

export function validateTest(test: PracticeTest): string[] {
  const errors: string[] = [];
  const where = `test ${test.id}`;
  if (!isPublishable(test)) errors.push(`${where}: not publishable (licence ${test.licenseStatus})`);
  const { listening, reading, writing, speaking } = test.sections;
  if (listening) checkSection(listening, `${where} listening`, errors);
  if (reading) checkSection(reading, `${where} reading`, errors);
  for (const task of writing?.tasks ?? []) if (task.minWords < 1) errors.push(`${where} writing: task ${task.task} needs minWords`);
  if (speaking && speaking.parts.some((p) => p.part === 2 && !p.cueCard)) errors.push(`${where} speaking: part 2 needs a cue card`);
  return errors;
}

export function validateBook(book: TestBook): string[] {
  const errors = book.tests.flatMap(validateTest);
  if (!isPublishable(book)) errors.push(`book ${book.id}: not publishable (licence ${book.licenseStatus})`);
  if (book.tests.some((t) => t.bookId !== book.id)) errors.push(`book ${book.id}: test with wrong bookId`);
  return errors;
}
